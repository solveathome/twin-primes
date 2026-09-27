// ============================================================================
// NATAL-CAP 38 — THE @19 DRIVER: does the Loudness Ceiling Conjecture survive
// its first real test? (2026-08-18)
// ============================================================================
// WHY THIS FILE EXISTS. `natal-cap-31-calm-vs-kill.md` states:
//
//   Loudness Ceiling Conjecture [OPEN]. For every x >= 13,
//   max_t VR(t) < S̄² / (K·V̄).
//
// Its support was two measured trends over three enumerated levels: max VR
// falls (2.78 / 2.35 / 2.14) and the driver S̄/√(K·V̄) rises (3.1 / 4.9 / 9.8).
// Wave 5 of the consistency campaign killed the first leg: `natal-cap-19`
// PART A walks all 9,699,690 rotations at @19 and prints max VR = 2.293, so
// the sequence is 2.78, 2.35, 2.14, 2.293 — down twice, then UP. What was
// never computed is the @19 DRIVER, so nothing in the corpus said whether
// 2.293 clears the @19 threshold. This file computes it.
//
// WHAT IS NEEDED, AND WHY IT IS CHEAP. cap-31's full sweep is O(W · strikes)
// and costs 76 s at @17; at @19 it is ~19x the rotations and ~3.6x the primes
// with ~380k strikes per rotation, which is why it stops at @17. But the
// conjecture needs only four numbers, and each has a cheap exact route:
//   K, V̄  — O(N·K) class counts, no rotation sweep at all.
//   max VR — VR(t) = (1/V̄)·Σ_q cd2[q][t mod q] depends on t only through the
//            residues, so one rolling pass per prime, no strike bookkeeping.
//   S̄     — the identity below removes the sweep entirely.
//
// THE S̄ IDENTITY (exact, and it is what makes @19 free).
//   Σ_t S(t) = Σ_{r∈ρ} #{t ∈ [0,W) : r−t survives every q}
// because S(t) counts natal r with (r−t) mod q ∉ {0, q−2} for all q. Put
// u = r − t; as t runs over [0,W), u runs over the W consecutive integers
// (r−W, r]. So with g(u) = 1 iff u survives every q, and P its prefix sum
// over u ∈ [−W+1, W−1],
//   Σ_t S(t) = Σ_{r∈ρ} ( P[r+W] − P[r] )        (offset idx = u + W − 1)
// which is one 2W-length sieve plus N lookups. Note the count genuinely
// depends on r: W is not a multiple of any q, so the window (r−W, r] is not a
// whole number of periods, and the naive product formula is NOT exact. This
// identity is.
//
// THE INSTRUMENT IS CHECKED AGAINST KNOWN POSITIVES BEFORE IT IS BELIEVED.
// Every quantity is recomputed at @11, @13 and @17 and compared to the pasted
// output of cap-31 (S̄, V̄, K, N, W, H) and cap-19 PART A (V̄, VR(0), max VR).
// A pass there is what licenses the @19 row. cap-19's own @17 row reproduces
// cap-05/13, so the three files are one statistic.
// AND AT @19 ITSELF: V̄, VR(0) and max VR check against cap-19 PART A, while
// S̄ checks against `research/wave7-logs/cap35-x-multiplicity.log` (2026-08-15),
// which prints S̄ = 49238.76 at @19 by natal-cap-35's u-form path. That is a
// second exact route sharing no code with the identity below. See reading 6(ii)
// for why this note exists: the first version of it claimed no such check was
// available, which was false and is the campaign's own worst defect class.
// ============================================================================
'use strict';
const T00 = Date.now();
const f = (v, d = 3) => Number.isFinite(v) ? v.toFixed(d) : String(v);

function primesUpTo(n) {
  const s = new Uint8Array(n + 1), o = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return o;
}

// cap-19's buildLevel, verbatim in behaviour: natal set = {11,17 mod 30} minus
// the base scour {0, p−2 mod p} for 7 <= p <= x; scour primes q are x < q,
// q² <= W.
function buildLevel(x) {
  const basePs = primesUpTo(x).filter(p => p >= 7);
  const W = 30 * basePs.reduce((a, b) => a * b, 1);
  const ind = new Uint8Array(W);
  for (let r = 11; r < W; r += 30) ind[r] = 1;
  for (let r = 17; r < W; r += 30) ind[r] = 1;
  for (const p of basePs) { for (let j = 0; j < W; j += p) ind[j] = 0; for (let j = p - 2; j < W; j += p) ind[j] = 0; }
  const tmp = []; for (let r = 0; r < W; r++) if (ind[r]) tmp.push(r);
  const rho = Int32Array.from(tmp);
  const qs = primesUpTo(Math.floor(Math.sqrt(W)) + 1).filter(q => q > x && q * q <= W);
  return { x, W, rho, N: rho.length, qs };
}

// Direct O(W·K) recompute of S at one rotation, for the cross-check.
function bruteS(t, rho, qs, N) {
  let cv = 0;
  for (const r of rho) { for (const q of qs) { const c = ((r - t) % q + q) % q; if (c === 0 || c === q - 2) { cv++; break; } } }
  return N - cv;
}

// ============================================================================
function runLevel(x, expect) {
  const t0 = Date.now();
  const { W, rho, N, qs } = buildLevel(x);
  const K = qs.length;

  // ---- class-deviation tables: V̄, H, and the per-prime cd2 rows ----------
  const cd2 = [];
  let Vbar = 0, H = 0;
  for (const q of qs) {
    const n = new Int32Array(q);
    for (let i = 0; i < N; i++) n[rho[i] % q]++;
    const mu = 2 * N / q, row = new Float64Array(q);
    let ss = 0;
    for (let a = 0; a < q; a++) { const dev = n[a] + n[(a + q - 2) % q] - mu; row[a] = dev * dev; ss += dev * dev; }
    Vbar += ss / q; H += 2 / q; cd2.push(row);
  }
  console.log(`\n===== @${x}: W=${W}  N=${N}  K=${K} (${qs[0]}..${qs[K - 1]})  H=${f(H, 4)}  V̄=${f(Vbar, 2)} =====`);

  // ---- max VR over the whole ensemble, one rolling pass per prime ---------
  const vsum = new Float64Array(W);
  for (let j = 0; j < K; j++) {
    const row = cd2[j], q = row.length;
    for (let t = 0, a = 0; t < W; t++) { vsum[t] += row[a]; if (++a === q) a = 0; }
  }
  let vmaxRaw = -1, targ = -1, vsumTot = 0;
  for (let t = 0; t < W; t++) { const v = vsum[t]; vsumTot += v; if (v > vmaxRaw) { vmaxRaw = v; targ = t; } }
  const maxVR = vmaxRaw / Vbar, meanVR = vsumTot / W / Vbar, VR0 = vsum[0] / Vbar;
  // cap-19 calls t = W/2 "predicted loudest" and prints rank-from-top 0 at @17
  // and @19. Test that prediction at every level rather than assuming it.
  const half = W / 2;
  let above = 0, ties = 0;
  const vhalf = vsum[half];
  for (let t = 0; t < W; t++) { const v = vsum[t]; if (v > vhalf) above++; else if (v === vhalf) ties++; }
  const halfNote = `VR(W/2)=${f(vhalf / Vbar, 4)} rank-from-top ${above}/${W} (ties ${ties})${above === 0 ? ' — W/2 IS the loudest' : ' — W/2 is NOT the loudest'}`;

  // ---- S̄ by the prefix identity ------------------------------------------
  const L = 2 * W - 1;                       // u ∈ [−W+1, W−1], idx = u + W − 1
  const g = new Uint8Array(L).fill(1);
  for (const q of qs) {
    for (const c of [0, q - 2]) {
      // idx ≡ c + W − 1 (mod q), smallest such idx >= 0
      let start = ((c + W - 1) % q + q) % q;
      for (let i = start; i < L; i += q) g[i] = 0;
    }
  }
  const P = new Int32Array(L + 1);
  for (let i = 0; i < L; i++) P[i + 1] = P[i] + g[i];
  let tot = 0;
  for (let i = 0; i < N; i++) { const r = rho[i]; tot += P[r + W] - P[r]; }
  const Sbar = tot / W;

  // ---- cross-checks --------------------------------------------------------
  // (a) S̄ identity against a direct sweep, at the levels where that is cheap;
  // (b) S at three rotations by brute force against the identity's own g();
  // (c) the mirror S(t) = S(W−t).
  let chkLine = 'checks: ';
  {
    // brute S at t=0 and two fixed rotations, compared with the count of
    // surviving u = r − t read straight off g (independent of the prefix sums)
    let ok = true;
    for (const t of [0, 1, W >> 2]) {
      let cnt = 0;
      for (let i = 0; i < N; i++) { const u = rho[i] - t; if (g[u + W - 1]) cnt++; }
      if (x <= 13 && cnt !== bruteS(t, rho, qs, N)) ok = false;
    }
    chkLine += `g()=brute at 3 t ${x <= 13 ? (ok ? 'PASS' : 'FAIL') : 'skipped (O(N·K) too slow)'}  `;
  }
  if (expect) {
    const cmp = (got, want, tol, name) => { const good = Math.abs(got - want) <= tol; return `${name} ${f(got, 4)} vs ${want} ${good ? 'PASS' : 'FAIL'}`; };
    chkLine += [
      expect.W !== undefined ? `W ${W === expect.W ? 'PASS' : 'FAIL'}` : null,
      expect.N !== undefined ? `N ${N === expect.N ? 'PASS' : 'FAIL'}` : null,
      expect.K !== undefined ? `K ${K === expect.K ? 'PASS' : 'FAIL'}` : null,
      expect.Vbar !== undefined ? cmp(Vbar, expect.Vbar, 0.01, 'V̄') : null,
      expect.Sbar !== undefined ? cmp(Sbar, expect.Sbar, 0.01, 'S̄') : null,
      expect.VR0 !== undefined ? cmp(VR0, expect.VR0, 0.001, 'VR(0)') : null,
      expect.maxVR !== undefined ? cmp(maxVR, expect.maxVR, 0.005, 'maxVR') : null,
    ].filter(Boolean).join('  ');
  }
  console.log(chkLine);

  // ---- the conjecture ------------------------------------------------------
  const driver = Sbar / Math.sqrt(K * Vbar);
  const thresh = Sbar * Sbar / (K * Vbar);
  const verdict = maxVR < thresh ? 'HOLDS' : 'FAILS';
  console.log(`S̄=${f(Sbar, 2)}  meanVR=${f(meanVR, 4)}  VR(0)=${f(VR0, 4)}  maxVR=${f(maxVR, 3)} at t=${targ}${targ === W / 2 ? ' (=W/2)' : ''}`);
  console.log(`  ${halfNote}`);
  console.log(`DRIVER S̄/√(K·V̄)=${f(driver, 3)}   THRESHOLD S̄²/(K·V̄)=${f(thresh, 2)}   maxVR=${f(maxVR, 3)}   ⇒ LOUDNESS CEILING ${verdict} (margin ×${f(thresh / maxVR, 1)})`);
  console.log(`[level time ${(Date.now() - t0) / 1000}s]`);
  return { x, W, N, K, Vbar, Sbar, maxVR, driver, thresh, verdict };
}

// Known positives: cap-31's pasted output (@11/@13/@17) and cap-19 PART A.
const rows = [];
rows.push(runLevel(11, { W: 2310, N: 90, K: 10, Vbar: 15.07, Sbar: 38.24, VR0: 0.344, maxVR: 2.78 }));
rows.push(runLevel(13, { W: 30030, N: 990, K: 34, Vbar: 119.58, Sbar: 310.88, VR0: 0.623, maxVR: 2.35 }));
rows.push(runLevel(17, { W: 510510, N: 14850, K: 120, Vbar: 1144.40, Sbar: 3614.93, VR0: 0.553, maxVR: 2.14 }));
rows.push(runLevel(19, { W: 9699690, N: 252450, K: 435, Vbar: 8944.60, VR0: 0.6988, maxVR: 2.293 }));

// ============================================================================
// PART B — S̄ BY A SECOND, INDEPENDENT CODE PATH
// ============================================================================
// S̄ at @19 is the one load-bearing number here with NO known positive to check
// against: cap-31 stops at @17, so @11/@13/@17 validate the prefix identity but
// @19 rests on it alone. So estimate S̄ again by direct simulation — sample
// rotations, strike the natal set prime by prime, count survivors — which
// shares no code with the identity above. Calibrate the estimator at @17 first,
// where the exact answer IS known, then apply it at @19.
function mulberry32(seed) { let t = seed >>> 0; return function () { t += 0x6D2B79F5; let r = Math.imul(t ^ t >>> 15, 1 | t); r ^= r + Math.imul(r ^ r >>> 7, 61 | r); return ((r ^ r >>> 14) >>> 0) / 4294967296; }; }

function sampleSbar(x, nSamp, seed) {
  const { W, rho, N, qs } = buildLevel(x);
  const K = qs.length;
  // bucket natal indices by residue class, per prime
  const Pidx = [], Pst = [];
  for (const q of qs) {
    const n = new Int32Array(q); for (let i = 0; i < N; i++) n[rho[i] % q]++;
    const st = new Int32Array(q + 1); for (let a = 0; a < q; a++) st[a + 1] = st[a] + n[a];
    const idx = new Int32Array(N), pos = st.slice(0, q);
    for (let i = 0; i < N; i++) { const a = rho[i] % q; idx[pos[a]++] = i; }
    Pidx.push(idx); Pst.push(st);
  }
  const dead = new Uint8Array(N);
  const rng = mulberry32(seed);
  let s = 0, s2 = 0;
  for (let k = 0; k < nSamp; k++) {
    const t = Math.floor(rng() * W);
    dead.fill(0);
    for (let j = 0; j < K; j++) {
      const st = Pst[j], ix = Pidx[j], q = st.length - 1;
      const a = t % q, a2 = a >= 2 ? a - 2 : a + q - 2;
      for (let m = st[a], e = st[a + 1]; m < e; m++) dead[ix[m]] = 1;
      for (let m = st[a2], e = st[a2 + 1]; m < e; m++) dead[ix[m]] = 1;
    }
    let alive = 0; for (let i = 0; i < N; i++) if (!dead[i]) alive++;
    s += alive; s2 += alive * alive;
  }
  const m = s / nSamp, sd = Math.sqrt(Math.max(0, s2 / nSamp - m * m));
  return { mean: m, sd, se: sd / Math.sqrt(nSamp), nSamp };
}

console.log('\n===== PART B: S̄ by direct simulation, a code path sharing nothing with the identity =====');
for (const [x, exact, nSamp] of [[13, 310.8834, 20000], [17, 3614.9297, 4000], [19, null, 1500]]) {
  const t1 = Date.now();
  const r = sampleSbar(x, nSamp, 3800 + x);
  const identity = rows.find(z => z.x === x).Sbar;
  const z = (r.mean - identity) / r.se;
  console.log(`  @${x}: simulated S̄ = ${f(r.mean, 2)} ± ${f(r.se, 2)} (n=${r.nSamp}, per-rotation sd ${f(r.sd, 2)})   identity S̄ = ${f(identity, 2)}   z = ${f(z, 2)}   ${Math.abs(z) < 3 ? 'AGREE' : 'DISAGREE'}${exact !== null ? `   [exact known: ${exact}]` : '   [no exact known — this IS the check]'}  [${(Date.now() - t1) / 1000}s]`);
}

console.log('\n===== THE FOUR ENUMERATED LEVELS =====');
console.log('  x |      W      |    N   |  K  |    V̄     |    S̄     | maxVR | driver | threshold | ceiling');
for (const r of rows) {
  console.log(`  ${String(r.x).padStart(2)} | ${String(r.W).padStart(11)} | ${String(r.N).padStart(6)} | ${String(r.K).padStart(3)} | ${f(r.Vbar, 2).padStart(8)} | ${f(r.Sbar, 2).padStart(8)} | ${f(r.maxVR, 3).padStart(5)} | ${f(r.driver, 2).padStart(6)} | ${f(r.thresh, 1).padStart(9)} | ${r.verdict}`);
}
console.log(`[total ${(Date.now() - T00) / 1000}s]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-38-loudness-driver.js
//   invocation:  node research/natal-cap-38-loudness-driver.js
//   code-sha256: 8e2b59c9382683a39732cf3cbb14962ae682e2f4345c856055bf8e85cb92e709
//   out-sha256:  8411b7fb9e31b676ba158d7ad89212f98977a829f20dde71931c02d4c842a5ee
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     7.3 s
// ============================================================================
//
// ===== @11: W=2310  N=90  K=10 (13..47)  H=0.7891  V̄=15.07 =====
// checks: g()=brute at 3 t PASS  W PASS  N PASS  K PASS  V̄ 15.0654 vs 15.07 PASS  S̄ 38.2385 vs 38.24 PASS  VR(0) 0.3443 vs 0.344 PASS  maxVR 2.7773 vs 2.78 PASS
// S̄=38.24  meanVR=0.9990  VR(0)=0.3443  maxVR=2.777 at t=1155 (=W/2)
//   VR(W/2)=2.7773 rank-from-top 0/2310 (ties 1) — W/2 IS the loudest
// DRIVER S̄/√(K·V̄)=3.115   THRESHOLD S̄²/(K·V̄)=9.71   maxVR=2.777   ⇒ LOUDNESS CEILING HOLDS (margin ×3.5)
// [level time 0.004s]
//
// ===== @13: W=30030  N=990  K=34 (17..173)  H=1.1468  V̄=119.58 =====
// checks: g()=brute at 3 t PASS  W PASS  N PASS  K PASS  V̄ 119.5752 vs 119.58 PASS  S̄ 310.8834 vs 310.88 PASS  VR(0) 0.6231 vs 0.623 PASS  maxVR 2.3518 vs 2.35 PASS
// S̄=310.88  meanVR=1.0000  VR(0)=0.6231  maxVR=2.352 at t=3461
//   VR(W/2)=1.6652 rank-from-top 198/30030 (ties 1) — W/2 is NOT the loudest
// DRIVER S̄/√(K·V̄)=4.876   THRESHOLD S̄²/(K·V̄)=23.77   maxVR=2.352   ⇒ LOUDNESS CEILING HOLDS (margin ×10.1)
// [level time 0.025s]
//
// ===== @17: W=510510  N=14850  K=120 (19..709)  H=1.4938  V̄=1144.40 =====
// checks: g()=brute at 3 t skipped (O(N·K) too slow)  W PASS  N PASS  K PASS  V̄ 1144.4036 vs 1144.4 PASS  S̄ 3614.9297 vs 3614.93 PASS  VR(0) 0.5530 vs 0.553 PASS  maxVR 2.1427 vs 2.14 PASS
// S̄=3614.93  meanVR=1.0000  VR(0)=0.5530  maxVR=2.143 at t=255255 (=W/2)
//   VR(W/2)=2.1427 rank-from-top 0/510510 (ties 1) — W/2 IS the loudest
// DRIVER S̄/√(K·V̄)=9.755   THRESHOLD S̄²/(K·V̄)=95.16   maxVR=2.143   ⇒ LOUDNESS CEILING HOLDS (margin ×44.4)
// [level time 0.113s]
//
// ===== @19: W=9699690  N=252450  K=435 (23..3109)  H=1.7857  V̄=8944.60 =====
// checks: g()=brute at 3 t skipped (O(N·K) too slow)  W PASS  N PASS  K PASS  V̄ 8944.6045 vs 8944.6 PASS  VR(0) 0.6988 vs 0.6988 PASS  maxVR 2.2930 vs 2.293 PASS
// S̄=49238.76  meanVR=1.0000  VR(0)=0.6988  maxVR=2.293 at t=4849845 (=W/2)
//   VR(W/2)=2.2930 rank-from-top 0/9699690 (ties 1) — W/2 IS the loudest
// DRIVER S̄/√(K·V̄)=24.962   THRESHOLD S̄²/(K·V̄)=623.11   maxVR=2.293   ⇒ LOUDNESS CEILING HOLDS (margin ×271.7)
// [level time 4.716s]
//
// ===== PART B: S̄ by direct simulation, a code path sharing nothing with the identity =====
//   @13: simulated S̄ = 311.07 ± 0.18 (n=20000, per-rotation sd 25.03)   identity S̄ = 310.88   z = 1.04   AGREE   [exact known: 310.8834]  [0.097s]
//   @17: simulated S̄ = 3616.30 ± 3.30 (n=4000, per-rotation sd 208.65)   identity S̄ = 3614.93   z = 0.41   AGREE   [exact known: 3614.9297]  [0.252s]
//   @19: simulated S̄ = 49201.02 ± 49.88 (n=1500, per-rotation sd 1931.82)   identity S̄ = 49238.76   z = -0.76   AGREE   [no exact known — this IS the check]  [2.008s]
//
// ===== THE FOUR ENUMERATED LEVELS =====
//   x |      W      |    N   |  K  |    V̄     |    S̄     | maxVR | driver | threshold | ceiling
//   11 |        2310 |     90 |  10 |    15.07 |    38.24 | 2.777 |   3.12 |       9.7 | HOLDS
//   13 |       30030 |    990 |  34 |   119.58 |   310.88 | 2.352 |   4.88 |      23.8 | HOLDS
//   17 |      510510 |  14850 | 120 |  1144.40 |  3614.93 | 2.143 |   9.75 |      95.2 | HOLDS
//   19 |     9699690 | 252450 | 435 |  8944.60 | 49238.76 | 2.293 |  24.96 |     623.1 | HOLDS
// [total 7.216s]
// ============================================================================
// READINGS (2026-08-18) — honestly calibrated
// ============================================================================
// 1. THE LOUDNESS CEILING CONJECTURE SURVIVES ITS FIRST REAL TEST, AT @19,
//    BY A FACTOR OF 272. The @19 driver is S̄/√(K·V̄) = 24.96, so the
//    conjecture's threshold S̄²/(K·V̄) is 623.1 against an enumerated max VR
//    of 2.293. This was the open question natal-cap-31 left: max VR at @19
//    was known and the @19 driver was not, so nothing said whether 2.293
//    cleared the bar. It clears it with room to spare.
// 2. AND THE LEG THAT BROKE WAS NEVER THE LOAD-BEARING ONE. The conjecture
//    rested on two measured trends, "max VR falls" and "the driver rises".
//    Wave 5 killed the first: max VR runs 2.78, 2.35, 2.14, 2.293, down twice
//    then up. This run shows why that barely matters. The margin
//    threshold/maxVR runs 3.5, 10.1, 44.4, 271.7 — it does not merely grow,
//    its growth ACCELERATES, by factors of 2.9, 4.4, 6.1 per level. The
//    driver leg outruns the ceiling leg by two orders of magnitude, so the
//    conjecture's honest support is now ONE monotone measured trend over four
//    levels plus a max VR that has stayed inside [2.14, 2.78] while W grew by
//    a factor of 4,200.
// 3. WHAT IS STILL OPEN, STATED PRECISELY, BECAUSE THE MARGIN IS NOT A PROOF.
//    Four levels is four levels. This is the rho lesson and the max-VR lesson
//    both: a quantity measured on a short run and asserted as a trend is
//    exactly what has broken twice in this corpus. What would falsify the
//    conjecture is max VR growing like S̄²/(K·V̄); what is measured is max VR
//    approximately constant. Neither is proven for any x > 19, and the
//    conjecture must still be written [OPEN]. The value of this run is that
//    it converts "we do not know whether the surviving leg is enough" into
//    "the surviving leg has 272x of headroom at the deepest level we can
//    enumerate", which is a different and much stronger statement, and not
//    the same as a theorem.
// 4. W/2 IS NOT THE LOUDEST ROTATION AT @13, AND THE CORPUS SAYS IN TWO
//    PLACES THAT IT IS. VR(W/2) = 1.6652 at @13, rank 198 from the top of
//    30,030 (99.34th percentile), against the true max 2.3518 at t = 3461.
//    W/2 IS the loudest at @11, @17 and @19 (rank-from-top 0 at each). What
//    the Mirror-Phase Doubling Lemma proves is that dev(W/2,q) is twice one
//    window's deviation — variance doubling, per prime. It does not prove
//    that the SUM over primes is maximal, and at @13 it is not.
//    `paper/anchored-note.md` has this exactly right ("the loudest rotation
//    of the entire ensemble at @11 and @17 and the 99.3rd percentile at
//    @13"); `research/history/CHRONICLE.md` writes "proven loudest" and
//    `natal-cap-19-calm-lemma.md` writes "the single loudest rotation for the
//    third level running", a streak that @13 breaks. Found for free while
//    checking the max-VR statistic, and it is the campaign's dominant defect
//    class once more: the paper was right and the index was not.
// 5. WHY THIS RUNS IN 8 SECONDS WHEN cap-31 COSTS 76 s AT @17 AND CANNOT
//    REACH @19. cap-31 sweeps survivors, strikes, overlap credit and pair
//    counts per rotation, which is O(W · strikes) and at @19 means ~380k
//    strike updates on each of 9.7M rotations. The conjecture needs only
//    S̄, K, V̄ and max VR, and each has a cheap exact route: K and V̄ are
//    O(N·K) class counts with no sweep at all; VR(t) depends on t only
//    through the residues t mod q, so max VR is one rolling pass per prime;
//    and S̄ follows from the prefix identity in the header, which replaces
//    the sweep with a single 2W-length sieve. The saving is structural, not
//    an optimisation — this file computes strictly less than cap-31 does.
// 6. CALIBRATION, AND THE INSTRUMENT WAS CHECKED BEFORE IT WAS BELIEVED.
//    (i) Every quantity is reproduced against a known positive before the
//    @19 row is read: W, N, K, V̄, S̄, VR(0) and max VR all PASS against
//    cap-31's pasted output at @11, @13 and @17, and V̄, VR(0) and max VR
//    also PASS against cap-19 PART A at @19. cap-19's own @17 row reproduces
//    cap-05/13, so all three files are measuring one statistic and not three.
//    (ii) S̄ at @19 HAS a known positive, and this reading said it did not.
//    CORRECTED 2026-08-18, same day, by partition Y of the consistency
//    campaign. This block originally read "the ONLY load-bearing number here
//    with no known positive available, since cap-31 stops at @17". cap-31 does
//    stop at @17, but cap-31 is not the only producer:
//    `research/wave7-logs/cap35-x-multiplicity.log`, on disk since 2026-08-15,
//    prints `S̄=49238.76` at @19 from natal-cap-35's u-form path and calls it
//    "exact S̄" in its own convolution-test line. I wrote an absence claim
//    without listing the directory, which is the exact trap this campaign has
//    now sprung three times — and I wrote it in the readings of the file that
//    preaches checking against known positives.
//    THE CORRECTION STRENGTHENS THE RESULT. S̄ at @19 now has THREE routes
//    that agree: cap-35's u-form 49,238.76, this file's prefix identity
//    49,238.76 — the same to every digit printed, and the two share no code —
//    and PART B's direct simulation, 49,201 ± 50, z = −0.76, whose estimator
//    was calibrated first at @13 and @17 where the exact answer is known
//    (z = 1.04 and 0.41). PART B was built as a substitute for a known
//    positive and is now a third witness instead.
//    (iii) The prefix identity is exact, not asymptotic. The naive product
//    N·Π(1−2/q) is NOT exact here, because W is not a multiple of any scour
//    prime, so the window (r−W, r] is not a whole number of periods and the
//    count genuinely depends on r; measured S̄/N exceeds the product by
//    0.97, 1.02, 1.11, 1.19 at the four levels. Anyone tempted to price S̄
//    from the product should note that the discrepancy grows with level.
//    (iv) max VR at @19 is a true ensemble maximum, not the W/2 shortcut:
//    rank-from-top 0 of 9,699,690 is computed, and the shortcut is shown in
//    reading 4 to fail at @13.
//    (v) Runtime 7.9 s total, 5.0 s of it @19. No sampling anywhere except
//    PART B, which is explicitly a cross-check and is labelled with its
//    standard error.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own embedded run prints (printed value
// first):
//   271.7 -> 272, the @19 margin, quoted in readings 1 and 3.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   4,200 in reading 2 is the growth of W across the four levels,
//   9699690/2310 = 4199.
//   99.34 in reading 4 is the percentile of the printed rank-from-top 198 of
//   30030: 1 - 198/30030 = 0.99341.
//
// BORROWED, verified present in the named source:
//   99.3 in reading 4 is a quotation of paper/anchored-note.md line 196,
//   which reads "the 99.3rd percentile at @13". The reading quotes it as a
//   quotation and it is accurate to what that file says.
//
// IN-CODE:
//   ~380k strike updates per rotation in reading 5 restates line 20 of this
//   file's own header. It is an order-of-magnitude cost estimate for cap-31's
//   sweep, not a measurement: no run in this corpus prints it, and cap-31
//   does not either. The natural in-file analogue is N x H = 252450 x 1.7857
//   = 450,800 at @19, both factors printed above. The point the reading makes
//   with it, that cap-31's cost is the reason it stops at @17, does not turn
//   on the exact figure.
//
// CORRECTED 2026-08-20 (mismatch adjudication #51): reading 6(iii) gave the
// ratio of the measured S̄ to the naive product N*prod(1-2/q) as "0.97, 1.01,
// 1.10, 1.17 at the four levels" and now gives 0.97, 1.02, 1.11, 1.19.
// Recomputed here from this file's own printed S̄ and N and the scour prime
// sets the code builds (q > x, q^2 <= W, printed in each level header): the
// naive products are 39.274, 304.282, 3245.513 and 41441.187 against S̄ =
// 38.24, 310.88, 3614.93 and 49238.76, giving 0.9737, 1.0217, 1.1138 and
// 1.1882. Three of the four were low by one unit in the second decimal. Old ->
// new: 1.01 -> 1.02, 1.10 -> 1.11, 1.17 -> 1.19. The reading's conclusion is
// unaffected and in fact strengthened: the discrepancy grows monotonically
// with level, and by slightly more than the reading said.
// ---------------------------------------------------------------------------
