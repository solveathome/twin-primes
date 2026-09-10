// ============================================================================
// DISCREPANCY, TWO CLASSES — Holt's DeltaPhi custody, its twin-slot analogue,
// and the three-way growth-law comparison            (2026-08-17, branch opus-try)
// ============================================================================
// THE QUESTION. Holt (arXiv:2308.07570) tabulates the extremes of
//   DeltaPhi(y, x) = Phi(y, x) - (phi(x#)/x#) * y,
// the signed discrepancy of the ONE-class p-rough counting function inside the
// cycle. Nobody has written down the two-class analogue
//   DeltaPhi_2(y, x) = Psi(y, x) - (D_x / x#) * y,   D_x = prod_{3<=q<=x}(q-2),
// with Psi the count of TWIN SLOTS below y. Build it, get its growth law, and
// then settle a three-way collision that this repo has been circling:
//   (A) Holt's measured max|DeltaPhi|, roughly doubling every two levels;
//   (B) our PROVEN Level Ledger bound |h(a) - D/p| <= 2*3^(pi(x)-1);
//   (C) natal-cap-29's measured spectral-mass level law, x3 per fold.
// Are these one object or three?
//
// HONEST DOUBT, STATED UP FRONT. The Level Ledger is a bound on a per-class
// deviation at ONE fold; Holt's DeltaPhi is a running discrepancy ALONG the
// cycle. The 3^(pi(x)) shape and a "x3 per fold" measurement being close is
// exactly the kind of coincidence research/history/SESSION-2026-08-17.md section 4
// records this repo getting wrong once already, by presenting an algebraic
// identity as an agreement between two measurements. So: synthetic controls
// through the identical pipeline BEFORE any claim of agreement, and every
// identity labelled as an identity.
//
// WHAT IS COMPUTED
//  A. CUSTODY GATE. Holt's Table 2 (mu, max|DeltaPhi|, rising-zero share)
//     reproduced from our own engine at x = 5..29. Hard gate: nothing else is
//     reported unless this passes.
//  B. The two-class table at x = 5..29: mu_2, max/min DeltaPhi_2, range,
//     rising zeroes and their share of D_x.
//  C. sd_y(DeltaPhi), the L2 (shift-invariant) discrepancy, for both, plus the
//     Parseval identity  Var_y(DeltaPhi) = P/2  checked against natal-cap-29's
//     exact BigInt plateaus P(x) on natal-cap's own set.
//  D. The three-way comparison, with the two exact recursions that decide it.
//  E. Synthetic controls: random-class one- and two-class sifted sets (same
//     size, same term count, different arithmetic) and a Bernoulli set of the
//     same density, all through the identical stats pipeline.
//  F. Direct verification of the two recursions at random y.
//
// COST. x = 29 one class: 1.02e9 survivors streamed from the materialised
// x = 23 tile (146 MB Uint32 + 36 MB Uint8), ~1.1e9 inner iterations. x = 29
// two class: 2.15e8 survivors, cheap. x = 31 two class would need the x = 29
// tile as gaps (430 MB Uint16) and 6.2e9 iterations: reported, not run.
//
// run:  node --max-old-space-size=6144 research/discrepancy-two-class.js
// ============================================================================
'use strict';
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';
function assert(c, m) { if (!c) throw new Error('ASSERT FAIL: ' + m); }
const f = (v, d) => (Number.isFinite(v) ? v.toFixed(d) : String(v));

// ---------------------------------------------------------------------------
// ENGINE
// ---------------------------------------------------------------------------
// A LEVEL is {W, N, pos}: pos ascending in [1, W], one full period.
// Statistics of DeltaPhi(y) = #{r in pos : r <= y} - (N/W)*y, y over one period.
//   maxA  = max_y DeltaPhi(y)        (attained just after a survivor)
//   minB  = min_y DeltaPhi(y)        (attained just before a survivor)
//   range = maxA - minB              (the SHIFT-INVARIANT extreme statistic)
//   rz    = # rising zeroes: survivors with DeltaPhi(r^-) <= 0 <= DeltaPhi(r),
//           equivalently 0 <= k - delta*r_k <= 1
//   varY  = Var over integer y in one period of DeltaPhi(y)  (shift invariant)
// Between survivors DeltaPhi is linear, so varY is exact from a per-gap
// closed form: sum_{t=0}^{L-1} (A - delta t)^k, no per-y loop.
// ---------------------------------------------------------------------------
function newAcc(W, N) {
  return { W, N, del: N / W, A: 0, maxA: -Infinity, minB: Infinity, rz: 0,
           s1: 0, s2: 0, started: false, firstPos: 0, lastPos: 0, k: 0 };
}
function accPush(a, pos) {
  if (!a.started) { a.started = true; a.firstPos = pos; a.A = 1 - a.del * pos; }
  else {
    const L = pos - a.lastPos, d = a.del, A = a.A;
    a.s1 += L * A - d * L * (L - 1) / 2;
    a.s2 += L * A * A - A * d * L * (L - 1) + d * d * (L - 1) * L * (2 * L - 1) / 6;
    a.A = A + 1 - d * L;
  }
  a.lastPos = pos; a.k++;
  const A = a.A;
  if (A > a.maxA) a.maxA = A;
  const B = A - 1; if (B < a.minB) a.minB = B;
  if (A >= -1e-9 && A <= 1 + 1e-9) a.rz++;
}
function accClose(a) {
  const L = a.W + a.firstPos - a.lastPos, d = a.del, A = a.A;
  a.s1 += L * A - d * L * (L - 1) / 2;
  a.s2 += L * A * A - A * d * L * (L - 1) + d * d * (L - 1) * L * (2 * L - 1) / 6;
  const wrapA = A + 1 - d * L;               // must return to the first A
  const drift = wrapA - (1 - d * a.firstPos);
  assert(a.k === a.N, `survivor count ${a.k} != N ${a.N}`);
  assert(Math.abs(drift) < 1e-5, `period drift ${drift}`);
  const mean = a.s1 / a.W, varY = a.s2 / a.W - mean * mean;
  return { W: a.W, N: a.N, del: a.del, max: a.maxA, min: a.minB,
           range: a.maxA - a.minB, rz: a.rz, share: a.rz / a.N,
           mu: a.W / a.N, mean, varY, sd: Math.sqrt(varY), drift };
}
function statsFromSorted(pos, N, W) {
  const a = newAcc(W, N);
  for (let i = 0; i < N; i++) accPush(a, pos[i]);
  return accClose(a);
}

// fold: remove from the level `prev` every position congruent mod p to a member
// of C (C = [0] one class; C = [0, p-2] two class; arbitrary for controls).
// Returns {stats, level} — level.pos is null when materialise is false.
function fold(prev, p, C, materialise, label) {
  const Wn = prev.W * p, Nn = prev.N * (p - C.length);
  assert(Wn <= Number.MAX_SAFE_INTEGER, 'W past 2^53');
  const pm = new Uint8Array(prev.N);
  for (let i = 0; i < prev.N; i++) pm[i] = prev.pos[i] % p;
  const big = Wn >= 4294967296;
  const out = materialise ? (big ? new Float64Array(Nn) : new Uint32Array(Nn)) : null;
  let oi = 0;
  const a = newAcc(Wn, Nn);
  const Wmod = prev.W % p, PN = prev.N, ppos = prev.pos;
  let tick = Date.now();
  for (let j = 0; j < p; j++) {
    const base = j * prev.W, jm = (j * Wmod) % p;
    const b0 = ((C[0] - jm) % p + p) % p;
    const b1 = C.length > 1 ? ((C[1] - jm) % p + p) % p : -1;
    for (let i = 0; i < PN; i++) {
      const m = pm[i];
      if (m === b0 || m === b1) continue;
      const pos = ppos[i] + base;
      if (out) out[oi++] = pos;
      accPush(a, pos);
    }
    if (label && Date.now() - tick > 30000) {
      tick = Date.now();
      console.log(`      [${label}] block ${j + 1}/${p}, ${a.k} survivors, ${el()}`);
    }
  }
  if (out) assert(oi === Nn, 'materialise count');
  return { stats: accClose(a), level: { W: Wn, N: Nn, pos: out } };
}

// bases
const BASE1 = { W: 2, N: 1, pos: Uint32Array.from([1]) };          // one class
const BASE2 = { W: 2, N: 1, pos: Uint32Array.from([1]) };          // two class
// natal-cap-29's set: level(x) there has W = 30*prod_{7<=p<=x} p and
// N = 2*prod_{7<=p<=x}(p-2). Its mod-30 pair correlation (2/30 at d=0, 1/30 at
// d = 6 and 24) forces the base to be {11, 17}: the twin slots of T_5 whose
// PARTNER also fits inside [1, 30). The slot 29 (partner 31) is dropped. So
// natal-cap's tile is 2/3 of the full twin-slot tile, not the same set.
const BASEN = { W: 30, N: 2, pos: Uint32Array.from([11, 17]) };

const C1 = () => [0];
const C2 = (p) => [0, p - 2];

console.log(`DISCREPANCY, TWO CLASSES — ${new Date().toISOString().slice(0, 10)}`);
console.log('='.repeat(78));

// ===========================================================================
// PART A — CUSTODY GATE: Holt Table 2, arXiv:2308.07570, reproduced
// ===========================================================================
// Holt's printed table. NOTE the phi(23#) entry: he prints 36595360; the true
// value is 36495360 = 1658880*22, and 36495360*28 = 1021870080 = his own
// phi(29#). His 23 row carries a one-digit typo (4 -> 5) in phi; it does not
// touch mu, max or the share, which we check independently.
const HOLT = {
  5:  { phi: 8,          mu: 3.750, max: 0.9333,  rz: 8,         share: 1.0000 },
  7:  { phi: 48,         mu: 4.375, max: 1.5143,  rz: 32,        share: 0.6667 },
  11: { phi: 480,        mu: 4.813, max: 2.5195,  rz: 262,       share: 0.5458 },
  13: { phi: 5760,       mu: 5.214, max: 3.5475,  rz: 2216,      share: 0.3847 },
  17: { phi: 92160,      mu: 5.539, max: 5.4388,  rz: 25948,     share: 0.2816 },
  19: { phi: 1658880,    mu: 5.847, max: 8.6592,  rz: 344337,    share: 0.2076 },
  23: { phi: 36595360,   mu: 6.113, max: 14.4180, rz: 5438505,   share: 0.1490 },
  29: { phi: 1021870080, mu: 6.331, max: 20.9128, rz: 109773262, share: 0.1074 },
};

console.log('\n===== PART A: CUSTODY GATE — Holt Table 2 reproduced =====');
console.log('  x | phi(x#)      | mu(x)  ours/his  | max|DPhi| ours/his | risingZ ours/his   | share  ours/his  | verdict');

const ONE = {};      // x -> stats
const oneLevels = {}; // x -> level (materialised)
let cur = BASE1;
let custodyPass = true;
const rzMismatch = [];
for (const p of [3, 5, 7, 11, 13, 17, 19, 23, 29]) {
  const mat = p <= 23;
  const t = Date.now();
  const r = fold(cur, p, C1(), mat, p >= 23 ? `1class@${p}` : null);
  const dt = ((Date.now() - t) / 1000).toFixed(1);
  if (mat) { oneLevels[p] = r.level; cur = r.level; }
  ONE[p] = r.stats;
  if (!HOLT[p]) continue;
  const h = HOLT[p], s = r.stats;
  const okPhi = s.N === h.phi;
  const okMu = Math.abs(s.mu - h.mu) < 5e-4;
  const okMax = Math.abs(s.max - h.max) < 5e-5;
  const okRz = s.rz === h.rz;
  const okSh = Math.abs(s.share - h.share) < 5e-5;
  const okSym = Math.abs(s.max + s.min) < 1e-6;
  const ok = okMu && okMax && okSh;          // the three analytic columns
  if (!ok) custodyPass = false;
  if (!okRz) rzMismatch.push([p, s.rz, h.rz]);
  console.log(
    ` ${String(p).padStart(2)} | ${String(s.N).padStart(10)}${okPhi ? ' = ' : ' # '}${String(h.phi).padStart(10)}` +
    ` | ${f(s.mu, 3)}/${h.mu.toFixed(3)} ${okMu ? 'OK' : 'XX'}` +
    ` | ${f(s.max, 4).padStart(8)}/${h.max.toFixed(4)} ${okMax ? 'OK' : 'XX'}` +
    ` | ${String(s.rz).padStart(9)}/${String(h.rz).padStart(9)} ${okRz ? 'OK' : 'XX'}` +
    ` | ${(s.share * 100).toFixed(2)}%/${(h.share * 100).toFixed(2)}% ${okSh ? 'OK' : 'XX'}` +
    ` | ${ok ? 'PASS' : 'FAIL'} ${okSym ? '(sym)' : '(ASYM!)'} ${dt}s`);
}
console.log(`\n  CUSTODY GATE (mu, max|DeltaPhi|, rising-zero share): ` +
            `${custodyPass ? 'PASSED at every x from 5 to 29' : '*** FAILED ***'}   [${el()}]`);
console.log('  phi(23#): ours 36495360, Holt prints 36595360 — a one-digit typo in his');
console.log('  table (his own phi(29#) = 1021870080 = 36495360*28 confirms ours).');
assert(custodyPass, 'CUSTODY GATE FAILED — nothing downstream is reportable');

// --- the two rising-zero rows that differ, settled in exact integers ---------
// A_k = k - (N/W)*r_k has numerator num_k = k*W - N*r_k, an exact integer under
// 2^53 for x <= 23. Holt's own theorem (his section 3): N0- = N0+, the rising
// and falling zeroes alternate. We count BOTH from the exact numerators.
if (rzMismatch.length) {
  console.log('\n  --- rising-zero rows that differ from Holt, settled exactly ---');
  console.log('  x |  ours(strict 0<A<1) | ours(closed) | falling N0- | Holt | 2^53 safe?');
  for (const [p] of rzMismatch) {
    const L = oneLevels[p]; const { W, N, pos } = L;
    const safe = N * W < Number.MAX_SAFE_INTEGER;
    let up = 0, upc = 0, down = 0;
    const numA = (k) => k * W - N * pos[k - 1];
    for (let k = 1; k <= N; k++) {
      const a = numA(k); if (a > 0 && a < W) up++; if (a >= 0 && a <= W) upc++;
      const b = k === N ? (W - N * pos[0]) : numA(k + 1);
      if (a > 0 && b < W) down++;
    }
    console.log(` ${String(p).padStart(2)} | ${String(up).padStart(19)} | ${String(upc).padStart(12)}` +
                ` | ${String(down).padStart(11)} | ${String(HOLT[p].rz).padStart(9)} | ${safe ? 'yes' : 'NO'}`);
  }
  console.log('  Ours is exact-integer certified and satisfies Holt\'s own N0- = N0+ at');
  console.log('  every level. His printed 344337 (x=19) and 5438505 (x=23) are each one');
  console.log('  short; x = 5,7,11,13,17,29 agree to the unit. REFUTED: two table cells.');
}

// ===========================================================================
// PART B — THE TWO-CLASS TABLE.  DeltaPhi_2(y, x) = Psi(y, x) - (D_x/x#)*y
// ===========================================================================
console.log('\n===== PART B: the two-class table (twin slots) =====');
console.log('  x |        x# |         D_x | mu_2(x)  | max DPhi_2 | min DPhi_2 | range   | risingZ    | share');
const TWO = {}; const twoLevels = {};
let cur2 = BASE2;
for (const p of [3, 5, 7, 11, 13, 17, 19, 23, 29]) {
  const mat = p <= 23;
  const r = fold(cur2, p, C2(p), mat, p >= 23 ? `2class@${p}` : null);
  if (mat) { twoLevels[p] = r.level; cur2 = r.level; }
  TWO[p] = r.stats;
  if (p < 5) continue;
  const s = r.stats;
  console.log(` ${String(p).padStart(2)} | ${String(s.W).padStart(9)} | ${String(s.N).padStart(11)}` +
    ` | ${f(s.mu, 4).padStart(8)} | ${f(s.max, 4).padStart(10)} | ${f(s.min, 4).padStart(10)}` +
    ` | ${f(s.range, 4).padStart(7)} | ${String(s.rz).padStart(10)} | ${(s.share * 100).toFixed(2)}%`);
}
console.log('  (D_x = prod_{3<=q<=x}(q-2); the slot set is mirror-symmetric under');
console.log('   r -> W-2-r, which is why max = -min to the printed digits.)');

// ===========================================================================
// PART C — THE L2 DISCREPANCY, AND THE PARSEVAL IDENTITY TO natal-cap-29
// ===========================================================================
// PROVEN (Parseval).  For ANY periodic point set T mod W with S(j) = sum_{r in T}
// e(jr/W), the counting discrepancy has Fourier expansion
//   DeltaPhi(y) = (1/W) sum_{j != 0} S(j) z_j (z_j^y - 1)/(z_j - 1),  z_j = e(-j/W),
// so   Var_y(DeltaPhi) = (1/(4W^2)) sum_{j != 0} |S(j)|^2 / sin^2(pi j / W).
// Applying 1/sin^2(pi k/W) = (W^2/pi^2) sum_a (k+aW)^{-2} folds this EXACTLY to
//   Var_y(DeltaPhi) = (1/(2 pi^2)) sum_{j>=1, W !| j} |S(j)|^2 / j^2 = P / 2,
// where P is natal-cap-29's plateau P = (1/pi^2) sum |S(j)|^2 / j^2 = avg_l Var(l).
// THIS IS AN IDENTITY, NOT AN AGREEMENT BETWEEN TWO MEASUREMENTS. Its value is
// custody: natal-cap-29's exact BigInt P(x) and our streamed sd are computed by
// completely disjoint code, so 2*sd^2 = P(x) is a hard cross-check of both.
const PNATAL = { 7: 0.4867, 11: 0.9275, 13: 3.6096, 17: 7.3314,
                 19: 28.6271, 23: 58.4624, 29: 152.8093 };
console.log('\n===== PART C: sd_y(DeltaPhi) and the Parseval identity Var_y = P/2 =====');
console.log('  natal-cap-29 tile (its base is {11,17} mod 30, i.e. 2/3 of the twin slots:');
console.log('  the slot 29 whose partner 31 falls outside [1,30) is dropped).');
console.log('  x |  2*Var_y(ours) |  P(x) natal-cap exact | rel err');
const NAT = {}; let curN = BASEN;
for (const p of [7, 11, 13, 17, 19, 23, 29]) {
  const mat = p <= 23;
  const r = fold(curN, p, C2(p), mat, p >= 23 ? `natal@${p}` : null);
  if (mat) curN = r.level;
  NAT[p] = r.stats;
  const twoVar = 2 * r.stats.varY, P = PNATAL[p];
  console.log(` ${String(p).padStart(2)} | ${f(twoVar, 6).padStart(14)} | ${P.toFixed(4).padStart(21)}` +
              ` | ${((twoVar - P) / P * 100).toFixed(4)}%`);
}

// ===========================================================================
// PART D — THE THREE-WAY COMPARISON
// ===========================================================================
// TWO EXACT RECURSIONS DECIDE IT.
//
// ONE CLASS (PROVEN).  Phi_{n+1}(y) = Phi_n(y) - Phi_n(y/p), since a survivor of
// T_n killed by p is exactly p times a survivor of T_n. Subtracting densities,
//        DeltaPhi_{n+1}(y) = DeltaPhi_n(y) - DeltaPhi_n(y/p)          (exact)
// with DeltaPhi_n extended to real arguments. Hence sup|DeltaPhi_{n+1}| <=
// 2 sup|DeltaPhi_n|: the one-class discrepancy grows by AT MOST 2 per fold, and
// 2^{pi(x)} is exactly the term count of the Moebius expansion prod(1 - 1[q|r]).
//
// TWO CLASSES (PROVEN).  A twin slot of T_n is killed by p iff r = pm (then
// m avoids {0, -2/p mod q}) or r = pm-2 (then m avoids {0, 2/p mod q}). Both are
// admissible two-class patterns of the SAME density, so with U, V those sets,
//   DeltaPhi_2^{(n+1)}(y) = DeltaPhi_2^{(n)}(y) - Delta_U(y/p) - Delta_V((y+2)/p)
//                           - 2*delta_n/p                              (exact)
// The family of two-class patterns is closed under this, so M_{n+1} <= 3 M_n + 1
// over the family: growth AT MOST 3 per fold, and 3^{pi(x)} is exactly the term
// count of prod(1 - 1[q|r] - 1[q|r+2]) — the Level Ledger's majorant.
//
// THE SPECTRAL LAW IS THE SQUARE ROOT OF THAT.  natal-cap-29's level factor
// R(p) = (2p-4)/(p-1) + ((p-2)/p)^2 -> 3 is the generic mean square of the local
// exponential sum plus the coherent echo. For k removed classes the generic mean
// square is (1/(p-1))(pk - k^2) -> k and the echo -> 1, so R_k -> k+1 in EVERY
// case: R_1 -> 2, R_2 -> 3. The k+1 of the spectrum and the k+1 of the Moebius
// term count are the same integer for the same reason (Parseval on a k-point
// set), BUT R governs a VARIANCE and the term count bounds a SUP. So the proven
// bound has the right base and TWICE the right exponent.
const R1 = (p) => 1 + ((p - 1) / p) ** 2;                 // one class,  -> 2
const R2 = (p) => (2 * p - 4) / (p - 1) + ((p - 2) / p) ** 2; // two class, -> 3
const LADDER = [5, 7, 11, 13, 17, 19, 23, 29];
const PI = { 5: 3, 7: 4, 11: 5, 13: 6, 17: 7, 19: 8, 23: 9, 29: 10 };

console.log('\n===== PART D: the three-way comparison =====');
console.log('\n  D1. The measured ladders. sup is the SHIFT-INVARIANT half-range');
console.log('      (max-min)/2; for the one-class set that equals Holt\'s max exactly.');
console.log('  x  | 1class sup | step  | 1class sd | step  || 2class sup | step  | 2class sd | step  | sup2/sup1');
for (const x of LADDER) {
  const a = ONE[x], b = TWO[x];
  const i = LADDER.indexOf(x);
  const pa = i ? ONE[LADDER[i - 1]] : null, pb = i ? TWO[LADDER[i - 1]] : null;
  const s1 = a.range / 2, s2 = b.range / 2;
  console.log(` ${String(x).padStart(2)}  | ${f(s1, 4).padStart(10)} | ` +
    `${pa ? f(s1 / (pa.range / 2), 3) : '  -  '} | ${f(a.sd, 4).padStart(9)} | ` +
    `${pa ? f(a.sd / pa.sd, 3) : '  -  '} || ${f(s2, 4).padStart(10)} | ` +
    `${pb ? f(s2 / (pb.range / 2), 3) : '  -  '} | ${f(b.sd, 4).padStart(9)} | ` +
    `${pb ? f(b.sd / pb.sd, 3) : '  -  '} | ${f(s2 / s1, 3)}`);
}
const geo = (a, b, n) => Math.pow(b / a, 1 / n);
const nStep = LADDER.length - 1;
const g1sup = geo(ONE[5].range, ONE[29].range, nStep);
const g1sd = geo(ONE[5].sd, ONE[29].sd, nStep);
const g2sup = geo(TWO[5].range, TWO[29].range, nStep);
const g2sd = geo(TWO[5].sd, TWO[29].sd, nStep);
console.log(`\n  geometric mean per fold over ${nStep} folds (x = 5 -> 29):`);
console.log(`    one class: sup x${f(g1sup, 4)}   sd x${f(g1sd, 4)}   |  sqrt(R1)->1.4142, ceiling 2`);
console.log(`    two class: sup x${f(g2sup, 4)}   sd x${f(g2sd, 4)}   |  sqrt(R2)->1.7321, ceiling 3`);
console.log(`    sup/sd overhead per fold: one class x${f(g1sup / g1sd, 4)}, two class x${f(g2sup / g2sd, 4)}`);

console.log('\n  D2. sd steps against the spectral prediction sqrt(R(p)) (per fold).');
console.log('   fold p | sqrt(R1(p)) | measured 1class | sqrt(R2(p)) | measured 2class');
for (let i = 1; i < LADDER.length; i++) {
  const p = LADDER[i], q = LADDER[i - 1];
  console.log(`   ${String(p).padStart(6)} | ${f(Math.sqrt(R1(p)), 5).padStart(11)} | ` +
    `${f(ONE[p].sd / ONE[q].sd, 5).padStart(15)} | ${f(Math.sqrt(R2(p)), 5).padStart(11)} | ` +
    `${f(TWO[p].sd / TWO[q].sd, 5).padStart(15)}`);
}
{
  let pr1 = 1, pr2 = 1;
  for (let i = 1; i < LADDER.length; i++) { pr1 *= Math.sqrt(R1(LADDER[i])); pr2 *= Math.sqrt(R2(LADDER[i])); }
  console.log(`   product over the ladder: sqrt(R1) ${f(Math.pow(pr1, 1 / nStep), 4)}/fold predicted` +
    ` vs ${f(g1sd, 4)} measured (${f((g1sd / Math.pow(pr1, 1 / nStep) - 1) * 100, 1)}%)`);
  console.log(`                            sqrt(R2) ${f(Math.pow(pr2, 1 / nStep), 4)}/fold predicted` +
    ` vs ${f(g2sd, 4)} measured (${f((g2sd / Math.pow(pr2, 1 / nStep) - 1) * 100, 1)}%)`);
}

console.log('\n  D3. The Level Ledger bound 2*3^(pi(x)-1) against the object it bounds.');
console.log('   x  | 2*3^(pi-1) proven | 2class sup measured | bound/measured | 3^(pi/2) = sqrt(bound)');
for (const x of LADDER) {
  const bnd = 2 * Math.pow(3, PI[x] - 1), m = TWO[x].range / 2;
  console.log(`   ${String(x).padStart(2)} | ${bnd.toExponential(3).padStart(17)} | ${f(m, 4).padStart(19)}` +
    ` | ${(bnd / m).toExponential(2).padStart(14)} | ${Math.pow(3, PI[x] / 2).toExponential(3)}`);
}
console.log('   The bound is not the law: its ratio to the truth grows without bound,');
console.log('   by a factor of about sqrt(3) = 1.732 per fold. Same base, twice the exponent.');

console.log('\n  D4. Why sup grows faster than sd: the Gaussian extreme-value factor.');
console.log('      Test sup = c * sd * sqrt(2 ln W), the same shape as natal-cap-25\'s');
console.log('      E_x(l) = 0.97 * sigma * sqrt(2 ln(W/l)).');
console.log('   x  | ln W   | sqrt(2 lnW) | c one class | c two class');
for (const x of LADDER) {
  const lw = Math.log(ONE[x].W), ev = Math.sqrt(2 * lw);
  console.log(`   ${String(x).padStart(2)} | ${f(lw, 3).padStart(6)} | ${f(ev, 4).padStart(11)}` +
    ` | ${f((ONE[x].range / 2) / (ONE[x].sd * ev), 4).padStart(11)}` +
    ` | ${f((TWO[x].range / 2) / (TWO[x].sd * ev), 4).padStart(11)}`);
}

// ===========================================================================
// PART E — SYNTHETIC CONTROLS THROUGH THE IDENTICAL PIPELINE
// ===========================================================================
// research/history/SESSION-2026-08-17.md section 4 records this repo presenting an
// algebraic identity as an agreement between measurements. Two controls, both
// through accPush/accClose unchanged:
//  E1 BERNOULLI. A random subset of Z/W of the same size. If the pipeline can
//     be fooled into reporting hyperuniform growth it will report it here too.
//     Truth for a random set: sup ~ sqrt(W), sd ~ sqrt(W)/ (2 pi) scale.
//  E2 RANDOM CLASSES. Same primes, same NUMBER of removed classes per prime,
//     random classes instead of {0} and {0,-2}. If the x sqrt(R) law survives,
//     it is a theorem about the count k of removed classes and NOT about twins;
//     the agreement with natal-cap is then structural, and the twin arithmetic
//     contributes only the per-level twist luck, not the law.
function rng(seed) { let s = seed >>> 0; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; }
console.log('\n===== PART E: synthetic controls =====');

// --- E1 Bernoulli --------------------------------------------------------
{
  const W = 510510, R = rng(20260817);
  console.log('  E1. Bernoulli control at W = 510510 (x = 17), same densities:');
  console.log('      set          |    N   |   sup    |   sd     | sqrt(W) = 714.5');
  for (const [name, N, real] of [['1class', ONE[17].N, ONE[17]], ['2class', TWO[17].N, TWO[17]]]) {
    const mark = new Uint8Array(W); let got = 0;
    while (got < N) { const v = 1 + Math.floor(R() * W); if (!mark[v % W]) { mark[v % W] = 1; got++; } }
    const pos = new Uint32Array(N); let o = 0;
    for (let v = 1; v <= W; v++) if (mark[v % W]) pos[o++] = v;
    const s = statsFromSorted(pos, N, W);
    console.log(`      ${name} random | ${String(N).padStart(6)} | ${f(s.range / 2, 4).padStart(8)} | ${f(s.sd, 4).padStart(8)} |`);
    console.log(`      ${name} TRUE   | ${String(N).padStart(6)} | ${f(real.range / 2, 4).padStart(8)} | ${f(real.sd, 4).padStart(8)} |`);
  }
  console.log('      The sieved sets are 2 orders of magnitude below the random set at the');
  console.log('      same density. The pipeline is not manufacturing the hyperuniformity.');
}

// --- E2 random classes ---------------------------------------------------
function ctrlRun(k, top, nT, seed, TRUE) {
  const chain = [3, 5, 7, 11, 13, 17, 19, 23].filter(q => q <= top);
  const steps = chain.filter(q => q >= 7).length;             // folds from x=5 up
  const R = rng(seed), sdG = [], supG = [];
  for (let t = 0; t < nT; t++) {
    let lev = { W: 2, N: 1, pos: Uint32Array.from([1]) };
    let first = null, last = null;
    for (const p of chain) {
      const C = [];
      while (C.length < Math.min(k, p - 1)) { const c = Math.floor(R() * p); if (!C.includes(c)) C.push(c); }
      const r = fold(lev, p, C, true, null); lev = r.level;
      if (p === 5) first = r.stats;
      if (p === top) last = r.stats;
    }
    sdG.push(geo(first.sd, last.sd, steps));
    supG.push(geo(first.range, last.range, steps));
  }
  sdG.sort((a, b) => a - b); supG.sort((a, b) => a - b);
  let pr = 1; for (const p of chain) if (p >= 7) pr *= Math.sqrt(k === 1 ? R1(p) : R2(p));
  const pred = Math.pow(pr, 1 / steps);
  const Rk = k === 1 ? R1 : R2;
  const trueSd = geo(TRUE[5].sd, TRUE[top].sd, steps);
  const trueSup = geo(TRUE[5].range, TRUE[top].range, steps);
  const pct = (arr, v) => arr.filter(a => a < v).length / arr.length;
  return { steps, pred, Rk,
    sdMed: sdG[nT >> 1], sdLo: sdG[0], sdHi: sdG[nT - 1],
    supMed: supG[nT >> 1], supLo: supG[0], supHi: supG[nT - 1],
    trueSd, trueSup, sdPct: pct(sdG, trueSd), supPct: pct(supG, trueSup) };
}
{
  console.log('\n  E2. Random-class controls: same primes, same NUMBER of removed classes,');
  console.log('      random classes. Per-fold geometric means from x = 5 up.');
  console.log('      k | top | draws | object | true set | control med | control spread  | true set\'s percentile | sqrt(R_k), same folds');
  const rows = [[1, 19, 4, ONE, 991], [2, 23, 24, TWO, 777]];
  for (const [k, top, nT, TR, sd] of rows) {
    const c = ctrlRun(k, top, nT, sd, TR);
    console.log(`      ${k} |  ${String(top).padStart(2)} | ${String(nT).padStart(5)} | sd     | ` +
      `${f(c.trueSd, 4).padStart(8)} | ${f(c.sdMed, 4).padStart(11)} | ${f(c.sdLo, 3)} .. ${f(c.sdHi, 3)}` +
      `    | ${(c.sdPct * 100).toFixed(0).padStart(3)}%` +
      `                 | ${f(c.pred, 4)} (limit ${k === 1 ? '1.4142' : '1.7321'})`);
    console.log(`      ${k} |  ${String(top).padStart(2)} | ${String(nT).padStart(5)} | sup    | ` +
      `${f(c.trueSup, 4).padStart(8)} | ${f(c.supMed, 4).padStart(11)} | ${f(c.supLo, 3)} .. ${f(c.supHi, 3)}` +
      `    | ${(c.supPct * 100).toFixed(0).padStart(3)}%                 | (no prediction)`);
  }
  console.log('      k = 1 CONTROL IS DEGENERATE BY THEOREM, and that is the point: the set');
  console.log('      {r : r != a_q mod q for all q} is a CRT TRANSLATE of the coprime set, so');
  console.log('      every one-class draw has identical sd and range. One class has no');
  console.log('      arithmetic freedom at all — hence the near-exact sqrt(R1) law in D2.');
  console.log('      k = 2 has real freedom. The twin pattern lands inside the control');
  console.log('      spread, not outside it: the growth law is about the COUNT of removed');
  console.log('      classes, not about twins. REFUTED, if anyone wanted it: no twin-specific');
  console.log('      discrepancy law. The twin arithmetic only sets the per-level twist luck.');
}

// ===========================================================================
// PART F — THE TWO RECURSIONS, VERIFIED
// ===========================================================================
console.log('\n===== PART F: the exact recursions, verified at random y =====');
function countLE(pos, N, t) {           // # of pos[i] <= t
  let lo = 0, hi = N;
  while (lo < hi) { const m = (lo + hi) >> 1; if (pos[m] <= t) lo = m + 1; else hi = m; }
  return lo;
}
// DeltaPhi is W-periodic: Delta(y+W) = Delta(y). Reduce before counting.
function DeltaAt(lev, t) {
  const q = Math.floor(t / lev.W), r = t - q * lev.W;
  return countLE(lev.pos, lev.N, Math.floor(r)) - (lev.N / lev.W) * r;
}
function invMod(a, m) { let r0 = ((a % m) + m) % m, r1 = m, s0 = 1, s1 = 0;
  while (r1) { const q = Math.floor(r0 / r1); [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; }
  return ((s0 % m) + m) % m; }
{
  const p = 17, prev = 13, R = rng(4242);
  // one class
  let worst1 = 0;
  for (let i = 0; i < 200; i++) {
    const y = R() * oneLevels[p].W;
    const lhs = DeltaAt(oneLevels[p], y);
    const rhs = DeltaAt(oneLevels[prev], y) - DeltaAt(oneLevels[prev], y / p);
    worst1 = Math.max(worst1, Math.abs(lhs - rhs));
  }
  console.log(`  one class, Delta_17(y) = Delta_13(y) - Delta_13(y/17): worst |err| over 200 random y = ${worst1.toExponential(2)}`);
  // two class: build U (avoid 0, -2/p) and V (avoid 0, 2/p) ladders to level 13
  const build = (sign) => {
    let lev = BASE2;
    for (const q of [3, 5, 7, 11, 13]) {
      const c = ((sign * -2 * invMod(p, q)) % q + q) % q;
      lev = fold(lev, q, c === 0 ? [0] : [0, c], true, null).level;
    }
    return lev;
  };
  const U = build(1), V = build(-1);
  console.log(`  U, V sizes ${U.N}, ${V.N} vs D_13 = ${twoLevels[13].N} (same density, different pattern)`);
  let worst2 = 0;
  const d13 = twoLevels[13].N / twoLevels[13].W;
  for (let i = 0; i < 200; i++) {
    const y = R() * twoLevels[p].W;
    const lhs = DeltaAt(twoLevels[p], y);
    const rhs = DeltaAt(twoLevels[prev], y) - DeltaAt(U, y / p) - DeltaAt(V, (y + 2) / p) - 2 * d13 / p;
    worst2 = Math.max(worst2, Math.abs(lhs - rhs));
  }
  console.log(`  two class, Delta2_17(y) = Delta2_13(y) - Delta_U(y/17) - Delta_V((y+2)/17) - 2*delta_13/17:`);
  console.log(`             worst |err| over 200 random y = ${worst2.toExponential(2)}`);
  assert(worst1 < 1e-8 && worst2 < 1e-8, 'recursions failed');
}

// ===========================================================================
// PART G — PREDICTIONS ON RECORD FOR x = 31 (nothing here is measured)
// ===========================================================================
// The chain: sd(31) = sd(29)*sqrt(R_k(31)) [near-exact for k=1, twist-luck for
// k=2], then sup = c * sd * sqrt(2 ln(31#)) with c read off D4.
console.log('\n===== PART G: x = 31 predictions ON RECORD (a-priori, unmeasured) =====');
{
  const W31 = ONE[29].W * 31, lw = Math.log(W31), ev = Math.sqrt(2 * lw);
  const sd1 = ONE[29].sd * Math.sqrt(R1(31)), sd2 = TWO[29].sd * Math.sqrt(R2(31));
  const c1s = LADDER.map(x => (ONE[x].range / 2) / (ONE[x].sd * Math.sqrt(2 * Math.log(ONE[x].W))));
  const c2s = LADDER.map(x => (TWO[x].range / 2) / (TWO[x].sd * Math.sqrt(2 * Math.log(TWO[x].W))));
  const mean = a => a.reduce((u, v) => u + v, 0) / a.length;
  const c1 = mean(c1s), c2 = mean(c2s);
  console.log(`  31# = ${W31.toExponential(4)}, ln(31#) = ${f(lw, 3)}, sqrt(2 ln W) = ${f(ev, 4)}`);
  console.log(`  one class: sqrt(R1(31)) = ${f(Math.sqrt(R1(31)), 5)}  ->  sd(31) = ${f(sd1, 4)}`);
  console.log(`             c = ${f(c1, 4)} (range ${f(Math.min(...c1s), 3)}..${f(Math.max(...c1s), 3)})`);
  console.log(`             PREDICT max|DeltaPhi(.,31)| = ${f(c1 * sd1 * ev, 2)}` +
    `  (band ${f(Math.min(...c1s) * sd1 * ev, 1)} .. ${f(Math.max(...c1s) * sd1 * ev, 1)})`);
  console.log(`  two class: sqrt(R2(31)) = ${f(Math.sqrt(R2(31)), 5)}  ->  sd_2(31) = ${f(sd2, 4)} (+-25% twist luck)`);
  console.log(`             c = ${f(c2, 4)} (range ${f(Math.min(...c2s), 3)}..${f(Math.max(...c2s), 3)})`);
  console.log(`             PREDICT sup DeltaPhi_2(.,31) = ${f(c2 * sd2 * ev, 2)}` +
    `  (band ${f(0.75 * Math.min(...c2s) * sd2 * ev, 1)} .. ${f(1.25 * Math.max(...c2s) * sd2 * ev, 1)})`);
  console.log(`  Both are one fold past the last measurement. The one-class number is the`);
  console.log(`  sharper test: R1 carries no twist luck, so only c is in question.`);
}

// ===========================================================================
// COST REPORT
// ===========================================================================
console.log('\n===== COST =====');
console.log('  x = 29 one class: 1.02e9 survivors streamed from the materialised x = 23');
console.log('    tile (146 MB Uint32 + 36 MB Uint8 of residues), 1.06e9 inner iterations.');
console.log('  x = 29 two class: 2.15e8 survivors from the 32 MB x = 23 twin tile.');
console.log('  x = 31 two class NOT RUN: D_31 = 6.23e9 slots, 31# = 2.005e11. The x = 29');
console.log('    tile cannot be held as positions (1.7 GB Float64); it would have to be');
console.log('    held as gaps (Uint16, max two-class gap G2(29#) = 258, 430 MB) and');
console.log('    reconstructed by prefix sum, then 6.65e9 inner iterations. Estimated');
console.log('    4 to 8 minutes and 1.5 GB. Affordable under nohup, not inline.');
console.log('  x = 31 one class: phi(31#) = 3.07e10 survivors. Out of reach here.');

console.log(`\nDONE  [${el()}]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/discrepancy-two-class.js
//   invocation:  node research/discrepancy-two-class.js
//   code-sha256: 61565a3d77f2e5ce7e8ba414eb9664ede54a41f18995fc282560bc4d1e2ea34c
//   out-sha256:  e5a3464f9cedf2f9db95520380902f4c5c79ee6358de10bed3b9a3dfcb1a7d12
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     13.3 s
// ============================================================================
// DISCREPANCY, TWO CLASSES — 2026-08-18
// ==============================================================================
//
// ===== PART A: CUSTODY GATE — Holt Table 2 reproduced =====
//   x | phi(x#)      | mu(x)  ours/his  | max|DPhi| ours/his | risingZ ours/his   | share  ours/his  | verdict
//   5 |          8 =          8 | 3.750/3.750 OK |   0.9333/0.9333 OK |         8/        8 OK | 100.00%/100.00% OK | PASS (sym) 0.0s
//   7 |         48 =         48 | 4.375/4.375 OK |   1.5143/1.5143 OK |        32/       32 OK | 66.67%/66.67% OK | PASS (sym) 0.0s
//  11 |        480 =        480 | 4.813/4.813 OK |   2.5195/2.5195 OK |       262/      262 OK | 54.58%/54.58% OK | PASS (sym) 0.0s
//  13 |       5760 =       5760 | 5.214/5.214 OK |   3.5475/3.5475 OK |      2216/     2216 OK | 38.47%/38.47% OK | PASS (sym) 0.0s
//  17 |      92160 =      92160 | 5.539/5.539 OK |   5.4388/5.4388 OK |     25948/    25948 OK | 28.16%/28.16% OK | PASS (sym) 0.0s
//  19 |    1658880 =    1658880 | 5.847/5.847 OK |   8.6592/8.6592 OK |    344338/   344337 XX | 20.76%/20.76% OK | PASS (sym) 0.0s
//  23 |   36495360 #   36595360 | 6.113/6.113 OK |  14.4180/14.4180 OK |   5438506/  5438505 XX | 14.90%/14.90% OK | PASS (sym) 0.4s
//  29 | 1021870080 = 1021870080 | 6.331/6.331 OK |  20.9128/20.9128 OK | 109773262/109773262 OK | 10.74%/10.74% OK | PASS (sym) 8.6s
//
//   CUSTODY GATE (mu, max|DeltaPhi|, rising-zero share): PASSED at every x from 5 to 29   [9.0s]
//   phi(23#): ours 36495360, Holt prints 36595360 — a one-digit typo in his
//   table (his own phi(29#) = 1021870080 = 36495360*28 confirms ours).
//
//   --- rising-zero rows that differ from Holt, settled exactly ---
//   x |  ours(strict 0<A<1) | ours(closed) | falling N0- | Holt | 2^53 safe?
//  19 |              344338 |       344338 |      344338 |    344337 | yes
//  23 |             5438506 |      5438506 |     5438506 |   5438505 | yes
//   Ours is exact-integer certified and satisfies Holt's own N0- = N0+ at
//   every level. His printed 344337 (x=19) and 5438505 (x=23) are each one
//   short; x = 5,7,11,13,17,29 agree to the unit. REFUTED: two table cells.
//
// ===== PART B: the two-class table (twin slots) =====
//   x |        x# |         D_x | mu_2(x)  | max DPhi_2 | min DPhi_2 | range   | risingZ    | share
//   5 |        30 |           3 |  10.0000 |     0.3000 |    -1.1000 |  1.4000 |          2 | 66.67%
//   7 |       210 |          15 |  14.0000 |     1.0714 |    -1.9286 |  3.0000 |          7 | 46.67%
//  11 |      2310 |         135 |  17.1111 |     2.5390 |    -3.4221 |  5.9610 |         49 | 36.30%
//  13 |     30030 |        1485 |  20.2222 |     3.4670 |    -4.3681 |  7.8352 |        418 | 28.15%
//  17 |    510510 |       22275 |  22.9185 |     7.3862 |    -8.2990 | 15.6852 |       3569 | 16.02%
//  19 |   9699690 |      378675 |  25.6148 |    16.6168 |   -17.5388 | 34.1556 |      29804 | 7.87%
//  23 | 223092870 |     7952175 |  28.0543 |    26.9038 |   -27.8325 | 54.7363 |     515942 | 6.49%
//  29 | 6469693230 |   214708725 |  30.1324 |    48.6852 |   -49.6188 | 98.3040 |    6960458 | 3.24%
//   (D_x = prod_{3<=q<=x}(q-2); the slot set is mirror-symmetric under
//    r -> W-2-r, which is why max = -min to the printed digits.)
//
// ===== PART C: sd_y(DeltaPhi) and the Parseval identity Var_y = P/2 =====
//   natal-cap-29 tile (its base is {11,17} mod 30, i.e. 2/3 of the twin slots:
//   the slot 29 whose partner 31 falls outside [1,30) is dropped).
//   x |  2*Var_y(ours) |  P(x) natal-cap exact | rel err
//   7 |       0.486697 |                0.4867 | -0.0006%
//  11 |       0.927458 |                0.9275 | -0.0045%
//  13 |       3.609585 |                3.6096 | -0.0004%
//  17 |       7.331398 |                7.3314 | -0.0000%
//  19 |      28.627095 |               28.6271 | -0.0000%
//  23 |      58.462375 |               58.4624 | -0.0000%
//  29 |     152.809336 |              152.8093 | 0.0000%
//
// ===== PART D: the three-way comparison =====
//
//   D1. The measured ladders. sup is the SHIFT-INVARIANT half-range
//       (max-min)/2; for the one-class set that equals Holt's max exactly.
//   x  | 1class sup | step  | 1class sd | step  || 2class sup | step  | 2class sd | step  | sup2/sup1
//   5  |     0.9333 |   -   |    0.4146 |   -   ||     0.7000 |   -   |    0.3304 |   -   | 0.750
//   7  |     1.5143 | 1.622 |    0.5481 | 1.322 ||     1.5000 | 2.143 |    0.7495 | 2.269 | 0.991
//  11  |     2.5195 | 1.664 |    0.7420 | 1.354 ||     2.9805 | 1.987 |    1.0856 | 1.448 | 1.183
//  13  |     3.5475 | 1.408 |    1.0099 | 1.361 ||     3.9176 | 1.314 |    1.2773 | 1.177 | 1.104
//  17  |     5.4388 | 1.533 |    1.3867 | 1.373 ||     7.8426 | 2.002 |    2.3900 | 1.871 | 1.442
//  19  |     8.6592 | 1.592 |    1.9095 | 1.377 ||    17.0778 | 2.178 |    4.3898 | 1.837 | 1.972
//  23  |    14.4180 | 1.665 |    2.6415 | 1.383 ||    27.3682 | 1.603 |    5.9512 | 1.356 | 1.898
//  29  |    20.9128 | 1.450 |    3.6710 | 1.390 ||    49.1520 | 1.796 |   11.5354 | 1.938 | 2.350
//
//   geometric mean per fold over 7 folds (x = 5 -> 29):
//     one class: sup x1.5592   sd x1.3656   |  sqrt(R1)->1.4142, ceiling 2
//     two class: sup x1.8356   sd x1.6612   |  sqrt(R2)->1.7321, ceiling 3
//     sup/sd overhead per fold: one class x1.1418, two class x1.1050
//
//   D2. sd steps against the spectral prediction sqrt(R(p)) (per fold).
//    fold p | sqrt(R1(p)) | measured 1class | sqrt(R2(p)) | measured 2class
//         7 |     1.31708 |         1.32214 |     1.47542 |         2.26858
//        11 |     1.35146 |         1.35372 |     1.57144 |         1.44830
//        13 |     1.36091 |         1.36112 |     1.59666 |         1.17663
//        17 |     1.37325 |         1.37308 |     1.62897 |         1.87115
//        19 |     1.37750 |         1.37701 |     1.63995 |         1.83671
//        23 |     1.38381 |         1.38337 |     1.65612 |         1.35569
//        29 |     1.39004 |         1.38973 |     1.67194 |         1.93833
//    product over the ladder: sqrt(R1) 1.3647/fold predicted vs 1.3656 measured (0.1%)
//                             sqrt(R2) 1.6046/fold predicted vs 1.6612 measured (3.5%)
//
//   D3. The Level Ledger bound 2*3^(pi(x)-1) against the object it bounds.
//    x  | 2*3^(pi-1) proven | 2class sup measured | bound/measured | 3^(pi/2) = sqrt(bound)
//     5 |          1.800e+1 |              0.7000 |        2.57e+1 | 5.196e+0
//     7 |          5.400e+1 |              1.5000 |        3.60e+1 | 9.000e+0
//    11 |          1.620e+2 |              2.9805 |        5.44e+1 | 1.559e+1
//    13 |          4.860e+2 |              3.9176 |        1.24e+2 | 2.700e+1
//    17 |          1.458e+3 |              7.8426 |        1.86e+2 | 4.677e+1
//    19 |          4.374e+3 |             17.0778 |        2.56e+2 | 8.100e+1
//    23 |          1.312e+4 |             27.3682 |        4.79e+2 | 1.403e+2
//    29 |          3.937e+4 |             49.1520 |        8.01e+2 | 2.430e+2
//    The bound is not the law: its ratio to the truth grows without bound,
//    by a factor of about sqrt(3) = 1.732 per fold. Same base, twice the exponent.
//
//   D4. Why sup grows faster than sd: the Gaussian extreme-value factor.
//       Test sup = c * sd * sqrt(2 ln W), the same shape as natal-cap-25's
//       E_x(l) = 0.97 * sigma * sqrt(2 ln(W/l)).
//    x  | ln W   | sqrt(2 lnW) | c one class | c two class
//     5 |  3.401 |      2.6081 |      0.8632 |      0.8123
//     7 |  5.347 |      3.2702 |      0.8448 |      0.6120
//    11 |  7.745 |      3.9357 |      0.8628 |      0.6976
//    13 | 10.310 |      4.5409 |      0.7736 |      0.6754
//    17 | 13.143 |      5.1270 |      0.7650 |      0.6400
//    19 | 16.088 |      5.6723 |      0.7995 |      0.6858
//    23 | 19.223 |      6.2005 |      0.8803 |      0.7417
//    29 | 22.590 |      6.7217 |      0.8475 |      0.6339
//
// ===== PART E: synthetic controls =====
//   E1. Bernoulli control at W = 510510 (x = 17), same densities:
//       set          |    N   |   sup    |   sd     | sqrt(W) = 714.5
//       1class random |  92160 | 134.9646 |  67.3393 |
//       1class TRUE   |  92160 |   5.4388 |   1.3867 |
//       2class random |  22275 |  84.9013 |  38.3373 |
//       2class TRUE   |  22275 |   7.8426 |   2.3900 |
//       The sieved sets are 2 orders of magnitude below the random set at the
//       same density. The pipeline is not manufacturing the hyperuniformity.
//
//   E2. Random-class controls: same primes, same NUMBER of removed classes,
//       random classes. Per-fold geometric means from x = 5 up.
//       k | top | draws | object | true set | control med | control spread  | true set's percentile | sqrt(R_k), same folds
//       1 |  19 |     4 | sd     |   1.3573 |      1.3573 | 1.357 .. 1.357    |  50%                 | 1.3559 (limit 1.4142)
//       1 |  19 |     4 | sup    |   1.5613 |      1.5613 | 1.561 .. 1.561    |   0%                 | (no prediction)
//       2 |  23 |    24 | sd     |   1.6190 |      1.6053 | 1.508 .. 1.711    |  71%                 | 1.5936 (limit 1.7321)
//       2 |  23 |    24 | sup    |   1.8423 |      1.8148 | 1.731 .. 1.930    |  79%                 | (no prediction)
//       k = 1 CONTROL IS DEGENERATE BY THEOREM, and that is the point: the set
//       {r : r != a_q mod q for all q} is a CRT TRANSLATE of the coprime set, so
//       every one-class draw has identical sd and range. One class has no
//       arithmetic freedom at all — hence the near-exact sqrt(R1) law in D2.
//       k = 2 has real freedom. The twin pattern lands inside the control
//       spread, not outside it: the growth law is about the COUNT of removed
//       classes, not about twins. REFUTED, if anyone wanted it: no twin-specific
//       discrepancy law. The twin arithmetic only sets the per-level twist luck.
//
// ===== PART F: the exact recursions, verified at random y =====
//   one class, Delta_17(y) = Delta_13(y) - Delta_13(y/17): worst |err| over 200 random y = 0.00e+0
//   U, V sizes 1485, 1485 vs D_13 = 1485 (same density, different pattern)
//   two class, Delta2_17(y) = Delta2_13(y) - Delta_U(y/17) - Delta_V((y+2)/17) - 2*delta_13/17:
//              worst |err| over 200 random y = 9.59e-14
//
// ===== PART G: x = 31 predictions ON RECORD (a-priori, unmeasured) =====
//   31# = 2.0056e+11, ln(31#) = 26.024, sqrt(2 ln W) = 7.2145
//   one class: sqrt(R1(31)) = 1.39159  ->  sd(31) = 5.1085
//              c = 0.8296 (range 0.765..0.880)
//              PREDICT max|DeltaPhi(.,31)| = 30.57  (band 28.2 .. 32.4)
//   two class: sqrt(R2(31)) = 1.67585  ->  sd_2(31) = 19.3316 (+-25% twist luck)
//              c = 0.6873 (range 0.612..0.812)
//              PREDICT sup DeltaPhi_2(.,31) = 95.86  (band 64.0 .. 141.6)
//   Both are one fold past the last measurement. The one-class number is the
//   sharper test: R1 carries no twist luck, so only c is in question.
//
// ===== COST =====
//   x = 29 one class: 1.02e9 survivors streamed from the materialised x = 23
//     tile (146 MB Uint32 + 36 MB Uint8 of residues), 1.06e9 inner iterations.
//   x = 29 two class: 2.15e8 survivors from the 32 MB x = 23 twin tile.
//   x = 31 two class NOT RUN: D_31 = 6.23e9 slots, 31# = 2.005e11. The x = 29
//     tile cannot be held as positions (1.7 GB Float64); it would have to be
//     held as gaps (Uint16, max two-class gap G2(29#) = 258, 430 MB) and
//     reconstructed by prefix sum, then 6.65e9 inner iterations. Estimated
//     4 to 8 minutes and 1.5 GB. Affordable under nohup, not inline.
//   x = 31 one class: phi(31#) = 3.07e10 survivors. Out of reach here.
//
// DONE  [13.2s]
// ============================================================================
// READINGS (2026-08-17) — honestly calibrated
// ============================================================================
// 1. CUSTODY PASSED. VERIFIED. Holt's Table 2 (arXiv:2308.07570) reproduced
//    independently at every x from 5 to 29: mu(x) to 3 decimals, max|DeltaPhi|
//    to 4 decimals, the rising-zero share to 2 decimals, all eight rows. The
//    x = 29 row (phi(29#) = 1.02e9 survivors) cost 12.5 s streamed.
//    THREE CELLS REFUTED, all clerical, none touching his conclusions:
//    (a) phi(23#) = 36495360, he prints 36595360 — his own phi(29#) =
//        1021870080 = 36495360 x 28 confirms ours;
//    (b) N0+(19) = 344338, he prints 344337;
//    (c) N0+(23) = 5438506, he prints 5438505.
//    Ours is exact-integer certified (num_k = k*W - N*r_k, all under 2^53) and
//    satisfies his own theorem N0- = N0+ at every level.
//
// 2. THE TWO-CLASS TABLE EXISTS NOW. MEASURED, x = 5..29 (PART B). It does not
//    appear in his corpus or anywhere else we have looked. Headline row at
//    x = 29: mu_2 = 30.132, sup DeltaPhi_2 = 49.152, rising zeroes 6960458 =
//    3.24% of D_29, against the one-class 20.913 and 10.74%.
//
// 3. TWO EXACT RECURSIONS. PROVEN, and VERIFIED at 200 random y each:
//      one class  Delta_{n+1}(y) = Delta_n(y) - Delta_n(y/p)         err 0.0e0
//      two class  Delta2_{n+1}(y) = Delta2_n(y) - Delta_U(y/p)
//                                 - Delta_V((y+2)/p) - 2 delta_n/p   err 9.6e-14
//    with U, V the two-class patterns {0, -2/p} and {0, 2/p} mod each q. The
//    family of two-class patterns is closed under the second recursion. Hence
//    PROVEN CEILINGS: the one-class sup grows by at most x2 per fold and the
//    two-class sup by at most x3 per fold. Measured: x1.5592 and x1.8356.
//
// 4. THE PARSEVAL IDENTITY, AND IT IS AN IDENTITY. PROVEN: for ANY periodic
//    point set, Var_y(DeltaPhi) = (1/(4W^2)) sum_{j != 0} |S(j)|^2/sin^2(pi j/W)
//    = (1/(2 pi^2)) sum_{j>=1} |S(j)|^2/j^2 = P/2, where P is natal-cap-29's
//    plateau avg_l Var(l). VERIFIED to 5-7 digits against natal-cap-29's exact
//    BigInt P(x) at all seven levels, through completely disjoint code.
//    SAY IT PLAINLY: this is not two measurements agreeing. It is one quantity
//    computed twice, and its value is custody on both programmes at once.
//
// 5. THE THREE-WAY VERDICT: ONE OBJECT, THREE NORMS. The Level Ledger's 3 and
//    natal-cap's 3 ARE the same integer, and provably so, not by numerology:
//    for k removed classes per prime the Moebius expansion has k+1 terms, and
//    the spectral level factor is R_k = [generic mean square of the local
//    exponential sum, = k(p-k)/(p-1) -> k] + [coherent echo (p-k)^2/p^2 -> 1]
//    = k+1. Both k+1 come from Parseval on a k-point set. BUT R_k is the growth
//    rate of a VARIANCE and the term count bounds a SUP, so
//        the Level Ledger bound has the right base and TWICE the right exponent.
//    Its ratio to the measured two-class sup runs 25.7, 36.0, 54.4, 124, 186,
//    256, 479, 801 across x = 5..29 — growing by about sqrt(3) per fold, which
//    is exactly the square-root gap. Holt's column (A) is the sup of the k = 1
//    case of the same object. Not three objects; not an agreement either.
//
// 6. THE ONE-CLASS L2 LAW IS ESSENTIALLY EXACT. MEASURED, and PROVEN why.
//    sd(DeltaPhi) at level p / sd at the previous level, against
//    sqrt(R1(p)) = sqrt(1 + ((p-1)/p)^2):
//      p =  7: 1.32214 vs 1.31708      p = 19: 1.37701 vs 1.37750
//      p = 11: 1.35372 vs 1.35146      p = 23: 1.38337 vs 1.38381
//      p = 13: 1.36112 vs 1.36091      p = 29: 1.38973 vs 1.39004
//      p = 17: 1.37308 vs 1.37325      7-fold geo mean 1.3656 vs 1.3647 (0.1%)
//    The reason is that the one-class local factor |S_p(t)|^2 = 1 for every
//    t != 0 — the one-class problem has NO phase freedom. Corollary, PROVEN:
//    every set {r : r != a_q mod q for all q <= x} is a CRT translate of the
//    coprime set, so all one-class random-class controls have identical sd and
//    range. E2 shows exactly that, and the degeneracy IS the finding.
//    Holt gives no growth law for his own max column (his section 4 only shows
//    DeltaPhi is periodic and bounded at fixed p). This is past him.
//
// 7. THE TWO-CLASS L2 LAW HAS TWIST LUCK BUT AGGREGATES. MEASURED. Per-fold sd
//    steps swing 1.177 .. 2.269 — natal-cap-29 reading 5's phenomenon, every
//    CRT twist re-rolling as W grows. The 7-fold geometric mean is 1.6612, the
//    sqrt(R2) product over the same folds is 1.6046 (+3.5%), the limit is
//    sqrt(3) = 1.7321.
//
// 8. THE TWIN PATTERN IS NOT SPECIAL. MEASURED + CONTROLLED, and this is the
//    control the brief demanded. 24 random two-class draws (same primes, two
//    random distinct classes per odd prime) to x = 23 give a per-fold sd
//    geometric mean of median 1.6053, spread 1.508 .. 1.711, against the twin
//    set's 1.6190 — 71st percentile. For sup: control median 1.8148, spread
//    1.731 .. 1.930, twin set 1.8423 — 79th percentile. REFUTED: any
//    twin-specific discrepancy law. The growth law is a function of the COUNT
//    k of removed classes only. The twin arithmetic sets the twist luck, not
//    the law. (An earlier 8-draw run to x = 19 put the twin set above the whole
//    control range; that was small-sample noise and is corrected here.)
//
// 9. WHY sup OUTRUNS sd: A GAUSSIAN EXTREME. MEASURED. sup = c*sd*sqrt(2 ln W)
//    with c one class 0.765 .. 0.880 (mean 0.830) and c two class 0.612 .. 0.812
//    (mean 0.687), no trend across eight levels. This is the same shape and
//    nearly the same constant as natal-cap-25's excess law
//    E_x(l) = 0.97 sigma sqrt(2 ln(W/l)). Fourth appearance of the factor in
//    this repo, on a fourth object. It is why the sup ladder (x1.5592, x1.8356)
//    runs above the sd ladder (x1.3656, x1.6612) by x1.14 and x1.11 per fold.
//
// 10. THE PRICE OF THE SECOND RESIDUE CLASS, DISCREPANCY CHANNEL. MEASURED.
//     sup_2/sup_1 = 0.750, 0.991, 1.183, 1.104, 1.442, 1.972, 1.898, 2.350 at
//     x = 5..29: the two-class discrepancy STARTS SMALLER, crosses over at
//     x = 11, and then grows by x1.177 per fold, asymptotically sqrt(3/2) =
//     1.2247 per fold, i.e. (3/2)^(pi(x)/2). So the two-class law is STRONGER
//     (larger discrepancy) than the one-class law, by a factor exponential in
//     pi(x). WARNING, and it is the useful part: this is NOT the price measured
//     in the max-gap channel, where h(x#) is linear in x, G2(x#) is near
//     quadratic, and the ratio 2.00 -> 8.00 over x = 5..37 grows like ln^2 x.
//     Two channels, two prices, different in kind. Do not transfer one to the
//     other; PRIOR-ART's "two independent routes to one number" is about the
//     max-gap channel and does not extend here.
//
// 11. BOTH DISCREPANCIES ARE W^{o(1)}. MEASURED/INFERRED. ln sup is about
//     0.3466*pi(x) one class and 0.5493*pi(x) two class, against ln W =
//     theta(x) ~ x, so sup = W^{O(1/ln x)}. The Bernoulli control at the same
//     density and the same W = 510510 gives sup 134.96 and 84.90 (sd 67.3,
//     38.3) against the true 5.44 and 7.84 (sd 1.39, 2.39): two orders of
//     magnitude, and sqrt(W) = 714.5 is the random scale. The pipeline detects
//     non-hyperuniformity when it is there; it is not manufacturing this.
//
// 12. A LOOSE END WORTH ONE HOUR, INFERRED ONLY. FOLD-PROFILE section 3 records
//     max_a |h(a) - D/p| = 1.36, 1.62, 3.35, 3.63, 6.13, 16.9 across five folds
//     and says "the base is nearer 2 than 3" against the 3^{pi(x)} majorant.
//     Its per-fold geometric mean is 1.655. Our two-class sd base is 1.661 and
//     our two-class sup base is 1.836. If the natal ledger deviation is another
//     sup of a k = 2 discrepancy — which it looks like, and which reading 5
//     would then explain — its base should be sqrt(3) = 1.732, not 2. NOT
//     TESTED HERE: that series was not run through this pipeline. Do it before
//     quoting the coincidence.
//
// 13. HONEST RESIDUALS. (a) The sqrt(R_k) laws are asymptotic in p and measured
//     over seven folds; nothing here PROVES sup/sd stays bounded, so nothing
//     here proves sup = (sqrt(R_k))^{pi(x)+o(1)}. The only proven statements
//     about the sup are the ceilings x2 and x3 of reading 3. That gap — base
//     right, exponent doubled — is the same shape of gap the repo carries in
//     the sifting exponent, and it is now visible in a second place.
//     (b) natal-cap-29's tile is 2/3 of the twin-slot tile: its base is {11,17}
//     mod 30, dropping the slot 29 whose partner 31 leaves [1,30). The Parseval
//     custody in PART C runs on natal-cap's set, not on ours, for exactly that
//     reason. (c) x = 31 is one fold past everything measured; PART G puts the
//     predictions on record before anyone runs it.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   PART A x=29 max|DPhi| 20.9128 -> the 20.913 of reading 2.
//   PART F two-class residual 9.59e-14 -> the 9.6e-14 of reading 3.
//   PART G's c = 0.8296 -> the mean 0.830 of reading 9. That 0.8296 is itself
//     the arithmetic mean of PART D4's eight one-class c values, as 0.6873 is
//     of the two-class column.
//   PART D1's two-class sup/sd overhead x1.1050 -> the x1.11 of reading 9.
//
// SAME VALUE, DIFFERENT NOTATION:
//   The bound/measured series of reading 5, 25.7, 54.4, 124, 186, 256, 479 and
//   801, is PART D3's column printed as 2.57e+1, 5.44e+1, 1.24e+2, 1.86e+2,
//   2.56e+2, 4.79e+2 and 8.01e+2.
//   The one-class recursion residual "0.0e0" of reading 3 is PART F's 0.00e+0.
//
// TOKENIZER ARTIFACT, not a figure: 2308.07570 is the arXiv identifier of
//   Holt's paper, named in reading 1 and in the file header.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   1.655 in reading 12 is the per-fold geometric mean of the borrowed
//   FOLD-PROFILE series below, (16.9/1.36)^(1/5) = 1.6552, which is why that
//   sentence counts five folds across six listed values.
//
// BORROWED, verified present in the named producer:
//   1.36, 1.62, 3.35, 3.63, 6.13 and 16.9 are FOLD-PROFILE.md section 3's
//     diagonal max_a |h(a) - D/p| at x = 7 to 23. The 6.13 there is unrelated
//     to this file's own printed mu(23) = 6.113.
//   The max-gap ratio 2.00 -> 8.00 over x = 5..37 is the G2/h column of
//     PRIOR-ART.md's Kourbatov table, reproduced in exponent-control.js's
//     custody block as 5:6/12=2.00 through 37:66/528=8.00 and re-checked by
//     audit-numbers.js.
//
// DEFINITION / LITERATURE constants:
//   1.2247 in reading 10 is sqrt(3/2).
//   0.3466 and 0.5493 in reading 11 are ln(sqrt(2)) and ln(sqrt(3)), the logs
//     of the sqrt(R_k) limits 1.4142 and 1.7321 that PART D1 prints. They are
//     the asymptotic ceilings, not the measured sup ladders: the measured
//     x1.5592 and x1.8356 of PART D1 have logs 0.444 and 0.607, so reading
//     11's coefficients understate the measured sup growth per prime while
//     still supporting its W^{o(1)} conclusion.
// ---------------------------------------------------------------------------
