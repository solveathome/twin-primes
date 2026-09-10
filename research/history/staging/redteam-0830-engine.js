'use strict';
// ============================================================================
// RED TEAM 0830 ENGINE — AN INDEPENDENT RE-DERIVATION OF THE THREE NOTES
// attack-0830-buchstab-deep.md, attack-0830-comb-tail.md,
// attack-0830-anchored-ladder-17.md, WRITTEN WITHOUT REUSING THEIR CODE
// ============================================================================
// QUESTION (red team, 2026-08-30). Do the three notes' headline numbers, and
// the derivations they call DERIVED, survive an independent re-computation?
//
// WHAT IS INDEPENDENT HERE. Nothing below is copied from the three producers.
//   SEC 0  The Diamond-Halberstam-Richert kappa = 2 functions are obtained
//          three ways that do NOT share the notes' uniform-trapezoid march:
//          (i) the adjoint sigma_2 in CLOSED FORM on (0, 4] by integrating
//              (u^-2 sigma)' = -2 u^-3 sigma(u-2) by hand, then composite
//              Gauss-Legendre on (4, 6]; F2 = 1/sigma_2 up to alpha2, f2 and
//              F2 past their sifting limits by Gauss quadrature of the
//              integrated DDE;
//          (ii) an Adams-Bashforth-2 / Adams-Moulton-3 predictor-corrector
//              march (3rd order, not trapezoid) at two step sizes;
//          (iii) beta2 re-pinned by shooting: only at beta2 do F2 and f2
//              converge to 1.
//          Plus the kappa = 1 closed forms F1 = 2e^g/u on [1,3] and
//          f1 = (2e^g/u) ln(u-1) on [2,4] at four and three points.
//   SEC 1  Every tile quantity is rebuilt from the definition of the comb:
//          the Natal@5 tile, the anchored march, the cofactor candidates,
//          the first-killer histograms, the greedy and sole-killer pools,
//          the per-prime cap_K ladder, the tail prime counts and the full
//          Legendre decomposition over the mids. Anchors from the three
//          notes are printed BESIDE the recomputed value, never asserted
//          into it, so a mismatch prints rather than aborts.
//
// DIRECTION AND SCOPE. Every number below is a finite per-level count or a
// limit-form sieve value at a fixed sigma. Nothing here is a statement in x.
// The certificate's legal direction is an UPPER bound on cap_K(q); lower
// sides are printed only because "proving the transfer" needs both.
//
//   node research/history/staging/redteam-0830-engine.js
// ============================================================================
const EG = 0.57721566490153286061, E2G = 2 * Math.exp(EG);
const BETA2 = 4.26645028414864191641, ALPHA2 = 5.35772744559446184227;
let nchk = 0, nbad = 0;
const R = (a, b, tol) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
function agree(name, got, ref, tol) {
  nchk++; const ok = (typeof got === 'number' && typeof ref === 'number') ? R(got, ref, tol) : String(got) === String(ref); if (!ok) nbad++;
  console.log(`  ${ok ? 'AGREES  ' : 'DIFFERS '} ${name}: ours ${typeof got === 'number' ? got : got}, note ${ref}`);
  return ok;
}
const fmt = (v, d = 4) => (Number.isFinite(v) ? v.toFixed(d) : String(v));
function primesUpTo(n) { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } } return o; }
function inv(a, m) { let t = 0, nt = 1, r = m, nr = ((a % m) + m) % m; while (nr) { const q = Math.floor(r / nr); [t, nt] = [nt, t - q * nt]; [r, nr] = [nr, r - q * nr]; } return ((t % m) + m) % m; }

// ============================ SEC 0: the sieve functions, three independent ways
console.log('SEC 0 - THE DHR kappa=2 FUNCTIONS, RE-DERIVED WITHOUT THE NOTES\' MARCH');
function gl(f, a, b, n) { // composite 5-point Gauss-Legendre
  if (b <= a) return 0;
  const x = [-0.9061798459386640, -0.5384693101056831, 0, 0.5384693101056831, 0.9061798459386640];
  const w = [0.2369268850561891, 0.4786286704993665, 0.5688888888888889, 0.4786286704993665, 0.2369268850561891];
  let s = 0; const h = (b - a) / n;
  for (let k = 0; k < n; k++) { const c = a + h * (k + 0.5); for (let i = 0; i < 5; i++) s += w[i] * f(c + h * x[i] / 2); }
  return s * h / 2;
}
// sigma_2(u) = A u^2 on (0,2]; on (2,4] integrate (u^-2 sigma)' = -2u^-3 sigma(u-2) in closed form:
//   int_2^u (t-2)^2/t^3 dt = ln(u/2) + 4/u - 2/u^2 - 3/2
const A2 = 1 / (2 * E2G * E2G);
const g24 = u => A2 * (1 - 2 * (Math.log(u / 2) + 4 / u - 2 / (u * u) - 1.5));
const g46 = u => g24(4) - 2 * gl(t => Math.pow(t, -3) * (t - 2) * (t - 2) * g24(t - 2), 4, u, 300);
const sig2 = u => u <= 2 ? A2 * u * u : (u <= 4 ? u * u * g24(u) : u * u * g46(u));   // exact on (0,6]
const f2q = u => u <= BETA2 ? 0 : 2 / (u * u) * gl(t => t * (1 / sig2(t - 1)), BETA2, u, 600);      // u <= alpha2+1
const F2q = u => u <= ALPHA2 ? 1 / sig2(u) : (ALPHA2 * ALPHA2 / sig2(ALPHA2) + 2 * gl(t => t * f2q(t - 1), ALPHA2, u, 400)) / (u * u); // u <= beta2+2
function march(kappa, alpha, beta, UM, h) {   // AB2/AM3 predictor-corrector, 3rd order
  const N = Math.round(UM / h) + 1, i1 = Math.round(1 / h), i2 = Math.round(2 / h);
  const A = Math.pow(E2G, -kappa) / (kappa === 1 ? 1 : 2);
  const g = new Float64Array(N), F = new Float64Array(N), f = new Float64Array(N);
  for (let i = 0; i <= i2 && i < N; i++) g[i] = A;
  const dg = i => { const u = i * h; return u <= 2 ? 0 : -kappa * Math.pow(u, -kappa - 1) * Math.pow(u - 2, kappa) * g[i - i2]; };
  for (let i = i2 + 1; i < N; i++) { g[i] = g[i - 1] + h * (1.5 * dg(i - 1) - 0.5 * dg(i - 2)); g[i] = g[i - 1] + h * (5 * dg(i) + 8 * dg(i - 1) - dg(i - 2)) / 12; }
  const sg = i => Math.pow(i * h, kappa) * g[i];
  const ia = Math.round(alpha / h), ib = Math.round(beta / h);
  for (let i = 1; i <= ia && i < N; i++) F[i] = 1 / sg(i);
  const PH = i => kappa * Math.pow(i * h, kappa - 1);
  let PF = Math.pow(ia * h, kappa) * F[ia], Pf = 0;
  for (let i = Math.min(ia, ib) + 1; i < N; i++) {
    if (i > ib) { Pf += h * (5 * PH(i) * F[i - i1] + 8 * PH(i - 1) * F[i - 1 - i1] - PH(i - 2) * F[i - 2 - i1]) / 12; f[i] = Pf / Math.pow(i * h, kappa); }
    if (i > ia) { PF += h * (5 * PH(i) * f[i - i1] + 8 * PH(i - 1) * f[i - 1 - i1] - PH(i - 2) * f[i - 2 - i1]) / 12; F[i] = PF / Math.pow(i * h, kappa); }
  }
  const at = (a, u) => { const t = u / h, i = Math.floor(t), w = t - i; return a[i] * (1 - w) + a[i + 1] * w; };
  return { F: u => at(F, u), f: u => at(f, u) };
}
const M2 = march(2, ALPHA2, BETA2, 26, 2e-5), M1 = march(1, 2, 2, 20, 2e-5);
console.log('  route (i) closed-form sigma_2 + Gauss quadrature vs route (ii) AB2/AM3 march at h = 2e-5:');
for (const u of [1, 2, 2.6390, 3.4637, 4.1308, 4.7088, 5.5785]) {
  console.log(`    u = ${fmt(u, 4)}   F2 quad ${fmt(F2q(u), 6)}  march ${fmt(M2.F(u), 6)}   f2 quad ${fmt(f2q(u), 6)}  march ${fmt(M2.f(u), 6)}`);
}
console.log('  kappa = 1 closed forms (exact on the stated ranges), march minus closed form:');
{ let w = 0; for (const u of [1.2, 1.7, 2.5, 2.9]) w = Math.max(w, Math.abs(M1.F(u) - E2G / u));
  for (const u of [2.3, 3.0, 3.7]) w = Math.max(w, Math.abs(M1.f(u) - E2G / u * Math.log(u - 1)));
  console.log(`    worst |march - closed form| over 7 points = ${w.toExponential(2)}`); }
console.log('  beta2 re-pinned by shooting (F2 and f2 must both tend to 1):');
for (const db of [-0.02, -0.005, 0, 0.005, 0.02]) { const S = march(2, ALPHA2, BETA2 + db, 26, 5e-5); console.log(`    beta2 ${db >= 0 ? '+' : ''}${db}: F2(25) = ${fmt(S.F(25), 6)}, f2(25) = ${fmt(S.f(25), 6)}`); }
console.log('  the note\'s SEC 2 figures at the @23 head sigma = 4.7088, and its two exact anchors:');
agree('F2(1) = 2(2e^g)^2 exactly', Number(F2q(1).toFixed(4)), 25.3778, 1e-9);
agree('F2(2) = 1/sigma_2(2) exactly', Number(F2q(2).toFixed(4)), 6.3444, 1e-9);
agree('F2(4.7088)', Number(F2q(4.7088).toFixed(5)), 1.48779, 2e-5);
agree('f2(4.7088)', Number(f2q(4.7088).toFixed(5)), 0.40557, 2e-4);
agree('F2/f2 at sigma = 4.7088', Number((F2q(4.7088) / f2q(4.7088)).toFixed(4)), 3.6684, 2e-4);

// ============================ SEC 1: the sifting parameter each level has
console.log('\nSEC 1 - sigma AT EACH LEVEL\'S HEAD PRIME, AND WHERE THE WIDTH F2/f2 ACTUALLY IS');
console.log('  sigma(q) = ln(floor((W+1)/q))/ln q. Head = the shallowest scour prime. Width = F2/f2, infinite where f2 = 0.');
console.log('   x    lnW      q0    sigma(q0)   F2         f2         F2/f2       note SEC 2 F2/f2');
const NOTE_W = { 13: Infinity, 17: Infinity, 19: Infinity, 23: 3.6684, 29: 1.5325, 31: 1.1811, 37: 1.0432, 41: 1.0071, 53: 1.0000, 97: 1.0000 };
const HEAD = {};
for (const x of [13, 17, 19, 23, 29, 31, 37, 41, 53, 97]) {
  const wheel = primesUpTo(x); let lnW = 0; for (const p of wheel) lnW += Math.log(p);
  const q0 = primesUpTo(x + 40).find(p => p > x);
  const s = (lnW - Math.log(q0)) / Math.log(q0);
  const F = s <= BETA2 + 2 ? F2q(s) : M2.F(s), f = s <= ALPHA2 + 1 ? f2q(s) : M2.f(s);
  HEAD[x] = { lnW, q0, s, F, f };
  console.log(`   ${String(x).padEnd(4)} ${fmt(lnW, 3).padEnd(8)} ${String(q0).padEnd(5)} ${fmt(s, 4).padEnd(11)} ${fmt(F, 5).padEnd(10)} ${fmt(f, 5).padEnd(10)} ${(f > 1e-9 ? fmt(F / f, 4) : 'infinite').padEnd(11)} ${NOTE_W[x]}`);
}
agree('sigma(q0) at @23', Number(HEAD[23].s.toFixed(4)), 4.7088, 1e-6);
agree('sigma(q0) at @97', Number(HEAD[97].s.toFixed(4)), 17.1422, 1e-6);
console.log(`  TEST of the REFUTED row 97 clause "the best sigma any level has (4.7088, @23 head)":`);
{ let best = 0, bx = 0; for (const x of Object.keys(HEAD)) if (HEAD[x].s > best) { best = HEAD[x].s; bx = x; }
  console.log(`    largest head sigma over the levels tabled = ${fmt(best, 4)} at @${bx}, with F2/f2 = ${fmt(HEAD[bx].F / HEAD[bx].f, 4)}`);
  console.log(`    @29 (a level with an embedded march, research/natal-cap-18-at29.js): sigma = ${fmt(HEAD[29].s, 4)}, F2/f2 = ${fmt(HEAD[29].F / HEAD[29].f, 4)}`);
  console.log(`    so 4.7088 is the largest head sigma only among levels whose per-q ladder is enumerated here; @29 and above are strictly larger and strictly narrower.`); }

// ============================ SEC 2: the tile engine, rebuilt from the definition
function analyse(x, opts) {
  const KEEPPOOL = true;
  const wheelAll = primesUpTo(x), mids = wheelAll.filter(p => p >= 7), k = mids.length;
  let W = 1; for (const p of wheelAll) W *= p;
  const scour = primesUpTo(Math.floor(Math.sqrt(W)) + 2).filter(q => q > x && q * q <= W);
  const n = scour.length;
  // the Natal@5 comb: r in {11,17} mod 30 with r != 0, p-2 (mod p) for every mid
  const tile = new Uint8Array(W); let N = 0;
  for (const h of [11, 17]) for (let r = h; r < W; r += 30) { let ok = 1; for (const p of mids) { const t = r % p; if (t === 0 || t === p - 2) { ok = 0; break; } } if (ok) { tile[r] = 1; N++; } }
  // the anchored march
  const fresh = new Int32Array(n); let truth = N;
  for (let i = 0; i < n; i++) { const q = scour[i]; let c = 0; for (let r = 0; r < W; r += q) if (tile[r]) { tile[r] = 0; c++; } for (let r = q - 2; r < W; r += q) if (tile[r]) { tile[r] = 0; c++; } fresh[i] = c; truth -= c; }
  const sOf = q => { const m = q % 30; return (m === 11 || m === 13 || m === 17 || m === 19) ? 1 : 0; };
  // cofactor candidates, first-killer depth histograms, killer incidence lists
  const LIM = Math.floor((W + 1) / scour[0]);
  const spf = new Int32Array(LIM + 1);
  for (let i = 2; i <= LIM; i++) if (spf[i] === 0) for (let j = i; j <= LIM; j += i) if (spf[j] === 0) spf[j] = i;
  const histU = [], histC = [], infU = new Int32Array(n), infC = new Int32Array(n), cap2 = new Int32Array(n), m1depth = new Int32Array(n).fill(-1);
  for (let i = 0; i < n; i++) { histU.push(new Int32Array(i + 2)); histC.push(new Int32Array(i + 2)); }
  const soleOf = new Int32Array(n), degOf = new Int32Array(n);
  // flat CSR store: candidate c owns killList[killStart[c] .. killStart[c+1])
  let cap = 1 << 16, kcap = 1 << 16;
  let candQ = new Int32Array(cap), killStart = new Int32Array(cap + 1), killList = new Int32Array(kcap);
  let C = 0, incid = 0, sumCap1 = 0;
  const growC = () => { cap *= 2; const a = new Int32Array(cap); a.set(candQ); candQ = a; const b = new Int32Array(cap + 1); b.set(killStart); killStart = b; };
  const growK = () => { kcap *= 2; const a = new Int32Array(kcap); a.set(killList); killList = a; };
  for (let i = 0; i < n; i++) {
    const q = scour[i];
    for (let side = 0; side < 2; side++) {
      const T = Math.floor((W + (side === 0 ? -1 : 1)) / q);
      const h1 = side === 0 ? 11 : 13, h2 = side === 0 ? 17 : 19;
      for (let m = 1; m <= T; m++) {
        if (!(m === 1 || spf[m] >= q)) continue;
        if (m >= 2) sumCap1++;
        const v = q * m, v30 = v % 30;
        if (v30 !== h1 && v30 !== h2) continue;
        let ok = 1; for (const p of mids) { const b = side === 0 ? p - 2 : 2; if (v % p === b) { ok = 0; break; } }
        if (!ok) continue;
        if (C === cap) growC();
        const st = incid; let first = -1;
        for (let j = 0; j < i; j++) { const q2 = scour[j], r2 = v % q2, b2 = side === 0 ? q2 - 2 : 2;
          if (r2 === 0 || r2 === b2) { if (first < 0) first = j; if (incid === kcap) growK(); killList[incid++] = j; degOf[j]++; } }
        candQ[C] = i; killStart[C] = st; killStart[C + 1] = incid; C++;
        if (incid - st === 1) soleOf[killList[st]]++;
        const d = first < 0 ? 0 : first + 1;
        if (d === 0) { infU[i]++; if (m >= 2) infC[i]++; } else { histU[i][d]++; if (m >= 2) histC[i][d]++; }
        if (m === 1) m1depth[i] = d;
      }
    }
    sumCap1 += sOf(q);
    let h = 0; for (let d = 1; d <= i + 1; d++) h += histC[i][d];
    cap2[i] = sOf(q) + infC[i] + h;
  }
  // K-curves, hard-cap chain and the margin identity
  const capUK = new Float64Array(n + 1), capCK = new Float64Array(n + 1);
  let viol = 0, marginBad = 0, deg = true;
  for (let i = 0; i < n; i++) {
    const s = sOf(scour[i]); const tU = new Int32Array(i + 3), tC = new Int32Array(i + 3);
    for (let d = i; d >= 1; d--) { tU[d] = tU[d + 1] + histU[i][d]; tC[d] = tC[d + 1] + histC[i][d]; }
    for (let K = 0; K <= n; K++) { const e = Math.min(K, i); const cu = infU[i] + tU[e + 1], cc = infC[i] + tC[e + 1] + s;
      capUK[K] += cu; capCK[K] += cc;
      if (!(fresh[i] <= cu && cu <= cc)) viol++;
      const alive1 = (m1depth[i] !== -1 && (m1depth[i] === 0 || m1depth[i] > e)) ? 1 : 0;
      if (cc - cu !== s - alive1) marginBad++; }
    if (infU[i] !== fresh[i]) deg = false;
  }
  const floorU = K => N - capUK[K], floorC = K => N - capCK[K];
  const firstK = p => { for (let K = 0; K <= n; K++) if (p(K)) return K; return -1; };
  const KstarC = firstK(K => capCK[K] < N), KstarU = firstK(K => capUK[K] < N), plateau = floorC(n);
  // waste split
  let WE = 0, SH = 0, FR = 0; for (let i = 0; i < n; i++) if (sOf(scour[i]) === 1) { if (m1depth[i] === -1) WE++; else if (m1depth[i] === 0) FR++; else SH++; }
  // greedy spend over the killer pool
  let killers = 0, dead = 0, soleN = 0, lastKiller = -1, greedyTruth = -1, greedyPlat = -1, greedyCert = -1;
  if (KEEPPOOL) {
    for (let j = 0; j < n; j++) { if (degOf[j] > 0) { killers++; lastKiller = j; } else dead++; if (soleOf[j] > 0) soleN++; }
    const off = new Int32Array(n + 1); for (let j = 0; j < n; j++) off[j + 1] = off[j] + degOf[j];
    const byPool = new Int32Array(off[n]), fill = Int32Array.from(off.subarray(0, n));
    for (let c = 0; c < C; c++) for (let t = killStart[c]; t < killStart[c + 1]; t++) byPool[fill[killList[t]]++] = c;
    const G = Int32Array.from(degOf), aliveC = new Uint8Array(C).fill(1), used = new Uint8Array(n);
    let fl = N - C; const certF = floorC(KstarC);
    for (let step = 1; step <= n; step++) {
      let j = -1, best = 0; for (let t = 0; t < n; t++) if (!used[t] && G[t] > best) { best = G[t]; j = t; }
      if (j < 0) break; used[j] = 1;
      for (let t = off[j]; t < off[j + 1]; t++) { const c = byPool[t]; if (!aliveC[c]) continue; aliveC[c] = 0; fl++;
        for (let u = killStart[c]; u < killStart[c + 1]; u++) G[killList[u]]--; }
      if (greedyCert < 0 && fl > certF) greedyCert = step;
      if (greedyPlat < 0 && fl > plateau) greedyPlat = step;
      if (greedyTruth < 0 && fl === truth) greedyTruth = step;
    }
  }
  return { x, W, mids, k, scour, n, N, truth, fresh, sOf, cap2, histC, infC, capUK, capCK, floorU, floorC,
    plateau, KstarC, KstarU, viol, marginBad, deg, WE, SH, FR, sumCap1, C, incid,
    killers, dead, soleN, lastKiller, greedyTruth, greedyPlat, greedyCert,
    ascPlat: firstK(K => floorU(K) > plateau), ascTruth: firstK(K => floorU(K) === truth) };
}

// ============================ SEC 2: the anchored ladder, rebuilt (target c)
console.log('\nSEC 2 - THE UNIFIED ANCHORED LADDER, REBUILT FROM THE COMB DEFINITION (target c)');
console.log('  Every column is an exact finite count at the named level. No law in x is stated or implied.');
const LV = {};
const LEVELS = (process.env.RT_LEVELS || '11,13,17,19,23').split(',').map(Number);
for (const x of LEVELS) LV[x] = analyse(x, {});
const NOTE_LADDER = {   // attack-0830-anchored-ladder-17.md section 4 table + section 3 table
  11: { n: 10, Kstar: 0, fC: 34, fU: 36, marg: 2, truth: 45, minimal: 4, greedyPlat: 2, dead: 6, ascTruth: 8, red: 0 },
  13: { n: 34, Kstar: 0, fC: 110, fU: 115, marg: 5, truth: 307, minimal: 21, greedyPlat: 14, dead: 13, ascTruth: 28, red: 0 },
  17: { n: 120, Kstar: 2, fC: 82, fU: 108, marg: 26, truth: 3099, minimal: 88, greedyPlat: 64, dead: 30, ascTruth: 109, red: 2 },
  19: { n: 435, Kstar: 10, fC: 1877, fU: 1987, marg: 110, truth: 38380, minimal: 350, greedyPlat: 273, dead: 71, ascTruth: 410, red: 14 },
  23: { n: 1739, Kstar: 27, fC: 4841, fU: 5364, marg: 523, truth: 597475, minimal: 1543, greedyPlat: 1227, dead: 159, ascTruth: 1732, red: 37 },
};
console.log('   level scour | K* K_pos | floorC(K*) floorU(K*) margin | truth | plateau greedy | truth asc  minimal | killers dead sole redundant | hard-cap viol  margin-id viol');
for (const x of LEVELS) { const r = LV[x];
  console.log(`   @${String(x).padEnd(3)} ${String(r.n).padStart(5)} | ${String(r.KstarC).padStart(2)} ${String(r.KstarU).padStart(5)} | ${String(r.floorC(r.KstarC)).padStart(10)} ${String(r.floorU(r.KstarU)).padStart(10)} ${String(r.floorU(r.KstarU) - r.floorC(r.KstarC)).padStart(6)} | ${String(r.truth).padStart(7)} | ${String(r.plateau).padStart(7)} ${String(r.greedyPlat).padStart(6)} | ${String(r.ascTruth).padStart(9)} ${String(r.greedyTruth).padStart(8)} | ${String(r.killers).padStart(7)} ${String(r.dead).padStart(4)} ${String(r.soleN).padStart(4)} ${String(r.killers - r.soleN).padStart(9)} | ${r.viol} ${r.marginBad}`);
}
for (const x of LEVELS) { const r = LV[x], N0 = NOTE_LADDER[x];
  agree(`@${x} scour / K* / floorC(K*) / floorU(K*) / margin`, `${r.n}/${r.KstarC}/${r.floorC(r.KstarC)}/${r.floorU(r.KstarU)}/${r.floorU(r.KstarU) - r.floorC(r.KstarC)}`, `${N0.n}/${N0.Kstar}/${N0.fC}/${N0.fU}/${N0.marg}`, 0);
  agree(`@${x} truth / minimal pool (= sole killers) / greedy plateau / dead / ascending truth / redundant`, `${r.truth}/${r.greedyTruth}=${r.soleN}/${r.greedyPlat}/${r.dead}/${r.ascTruth}/${r.killers - r.soleN}`, `${N0.truth}/${N0.minimal}=${N0.minimal}/${N0.greedyPlat}/${N0.dead}/${N0.ascTruth}/${N0.red}`, 0);
}
for (const x of LEVELS) { const r = LV[x];
  const waste = r.WE + r.SH + r.FR;
  console.log(`   @${x} allowances ${waste} = WE ${r.WE} + shadows ${r.SH} + fresh-self ${r.FR}; sum s = ${r.scour.filter(q => r.sOf(q) === 1).length}; sum cap1 ${r.sumCap1}; sum cap2 ${r.capCK[0]}; candidates ${r.C}; incidences ${r.incid}; K_pos == K* ${r.KstarU === r.KstarC}`);
}
console.log('  the largest killer prime, and whether it is a twin\'s LOWER member inside the scour:');
for (const x of LEVELS) { const r = LV[x], q = r.scour[r.lastKiller], S = new Set(r.scour);
  console.log(`   @${x}: last killer q = ${q} (scour index ${r.lastKiller + 1} of ${r.n}); q+2 in scour: ${S.has(q + 2) ? 'yes' : 'no'}; q-2 in scour: ${S.has(q - 2) ? 'yes' : 'no'}`); }
console.log('  the minimal pool is PROVEN exact where the sole-killer lower bound meets the greedy upper bound:');
for (const x of LEVELS) console.log(`   @${x}: sole killers ${LV[x].soleN} (lower bound, every sole killer is forced) vs greedy pool reaching truth ${LV[x].greedyTruth} (upper bound) -> ${LV[x].soleN === LV[x].greedyTruth ? 'EQUAL, minimum proven' : 'GAP, minimum only bracketed'}`);
{ const r = LV[23];
  if (r) { console.log(`  @23 sealed-forecast quantities, recomputed: WE ${r.WE} (band [280,420]), floorU(K*) ${r.floorU(r.KstarU)} (band [5240,5490]), margin ${r.floorU(r.KstarU) - r.floorC(r.KstarC)} (band [400,650]), asc plateau ${r.ascPlat} (band [1130,1390]), greedy plateau ${r.greedyPlat} (band [1100,1390]), asc truth ${r.ascTruth} (band [1600,1739]), minimal ${r.soleN} (band [1390,1600]), dead ${r.dead} (band [120,260]), redundant ${r.killers - r.soleN} (band [20,200])`);
    console.log(`  @23 classic sums at K = 26 and 27: ${r.capCK[26]} and ${r.capCK[27]} against N = ${r.N} (the D3 argument's inputs)`);
    console.log(`  scour size at @23 recomputed = ${r.n} (attack-anchored-02.md line 164 says the @23 march is "5.3M slots x 1863 primes"); pi(sqrt W) - pi(23) = ${r.n}`); } }

// ============================ SEC 3: the tail defect and the Legendre anatomy (target b)
console.log('\nSEC 3 - THE TAIL DEFECT AND THE PRIME-COMB LEGENDRE DECOMPOSITION, REBUILT (target b)');
console.log('  Tail = scour primes with q^3 > W + 1, where every admissible cofactor of a fresh victim is prime.');
console.log('  main(q) = dP (pi(A) + pi(B) - 2 pi(q-1)), dP = (1/4) prod_mids (1 - 1/(p-1)); E(q) = (cap2 - s) - main(q).');
function tailWork(r) {
  const { W, mids, k, scour, n, cap2, sOf } = r;
  const tailIdx = []; for (let i = 0; i < n; i++) if (scour[i] ** 3 > W + 1) tailIdx.push(i);
  const TMAX = Math.floor((W + 1) / scour[tailIdx[0]]);
  const pr = primesUpTo(TMAX + 2);
  const pi = new Int32Array(TMAX + 3); { let c = 0, j = 0; for (let v = 0; v <= TMAX + 2; v++) { while (j < pr.length && pr[j] === v) { c++; j++; } pi[v] = c; } }
  let dP = 0.25; for (const p of mids) dP *= (1 - 1 / (p - 1));
  const NM = 1 << k;
  let sumMain = 0, sumE = 0, sumAbsE = 0, sumCap2t = 0, pos = 0, neg = 0, maxRel = 0, maxRelQ = 0;
  let L1 = 0, L1bv = 0, L1eh = 0, L1sh = 0, sgBV = 0, sgEH = 0, sgSH = 0, nShort = 0, nTerms = 0, worstShort = 0, legBad = 0, nShortBad = 0;
  const phi30d = new Float64Array(NM); const mod30d = new Float64Array(NM); const par = new Int8Array(NM);
  for (let d = 0; d < NM; d++) { let f = 8, mm = 30, b = 0; for (let t = 0; t < k; t++) if (d >> t & 1) { f *= mids[t] - 1; mm *= mids[t]; b++; } phi30d[d] = f; mod30d[d] = mm; par[d] = (b & 1) ? -1 : 1; }
  for (const i of tailIdx) {
    const q = scour[i], A = Math.floor((W - 1) / q), B = Math.floor((W + 1) / q), s = sOf(q);
    const main = dP * (pi[A] + pi[B] - 2 * pi[q - 1]);
    const E = (cap2[i] - s) - main;
    sumMain += main; sumE += E; sumAbsE += Math.abs(E); sumCap2t += cap2[i];
    if (E > 0) pos++; else neg++;
    if (cap2[i] >= 20) { const rel = Math.abs(E) / cap2[i]; if (rel > maxRel) { maxRel = rel; maxRelQ = q; } }
    // Legendre over the mids, per side and per allowed class mod 30
    const iq30 = inv(q, 30), iqp = mids.map(p => inv(q, p));
    for (let side = 0; side < 2; side++) {
      const T = side === 0 ? A : B, bad = side === 0 ? -2 : 2;
      const wp = mids.map((p, t) => (((bad * iqp[t]) % p) + p) % p);
      const cls = (side === 0 ? [11, 17] : [13, 19]).map(h => (h * iq30) % 30);
      const cnt = [new Float64Array(NM), new Float64Array(NM)];
      const lo = pi[q - 1], hi = pi[T], tot = hi - lo;
      for (let j = lo; j < hi; j++) { const m = pr[j], c30 = m % 30; const ci = c30 === cls[0] ? 0 : (c30 === cls[1] ? 1 : -1); if (ci < 0) continue;
        let msk = 0; for (let t = 0; t < k; t++) if (m % mids[t] === wp[t]) msk |= 1 << t;
        cnt[ci][msk]++; }
      for (const ca of cnt) for (let t = 0; t < k; t++) for (let d = 0; d < NM; d++) if (!(d >> t & 1)) ca[d] += ca[d | 1 << t];  // superset sum
      const sqT = Math.sqrt(T), cutShort = T - q + 1;
      let sgn = 0;
      for (let ci = 0; ci < 2; ci++) for (let d = 0; d < NM; d++) {
        const del = cnt[ci][d] - tot / phi30d[d]; nTerms++;
        L1 += Math.abs(del); sgn += par[d] * cnt[ci][d];
        if (mod30d[d] >= cutShort) { nShort++; L1sh += Math.abs(del); sgSH += par[d] * del; if (Math.abs(del) > worstShort) worstShort = Math.abs(del); if (Math.abs(del) >= 1) nShortBad++; }
        else if (mod30d[d] <= sqT) { L1bv += Math.abs(del); sgBV += par[d] * del; }
        else { L1eh += Math.abs(del); sgEH += par[d] * del; }
      }
      // the signed term sum must be the exact sifted prime count for this side
      let direct = 0; for (let j = lo; j < hi; j++) { const m = pr[j], c30 = m % 30; if (c30 !== cls[0] && c30 !== cls[1]) continue; let ok = 1; for (let t = 0; t < k; t++) if (m % mids[t] === wp[t]) { ok = 0; break; } if (ok) direct++; }
      if (Math.abs(sgn - direct) > 1e-6) legBad++;
    }
  }
  return { tailIdx, dP, sumMain, sumE, sumAbsE, sumCap2t, pos, neg, maxRel, maxRelQ, L1, L1bv, L1eh, L1sh, sgBV, sgEH, sgSH, nShort, nTerms, worstShort, nShortBad, legBad, pi, pr };
}
const NOTE_TAIL = { 11: [9, -6.03, 14.92], 13: [29, 1.09, 6.50], 17: [105, 0.50, 2.85], 19: [396, -0.01, 1.42], 23: [1638, -0.01, 0.60] };
const TW = {};
console.log('   level | tail n | tail sum cap2 | E signed % of main | sum|E| % of main | max |E|/cap2 (cap2>=20) | sign split +/- | note (n, signed, unsigned)');
for (const x of LEVELS) { const r = LV[x], t = tailWork(r); TW[x] = t;
  const nt = NOTE_TAIL[x];
  console.log(`   @${String(x).padEnd(3)} | ${String(t.tailIdx.length).padStart(6)} | ${String(t.sumCap2t).padStart(13)} | ${fmt(100 * t.sumE / t.sumMain, 2).padStart(18)} | ${fmt(100 * t.sumAbsE / t.sumMain, 2).padStart(16)} | ${fmt(100 * t.maxRel, 2).padStart(10)}% at q = ${String(t.maxRelQ || 'none').padEnd(8)} | ${t.pos}/${t.neg} | ${nt ? nt.join(', ') : '-'}`);
}
for (const x of LEVELS) { const t = TW[x], nt = NOTE_TAIL[x]; if (!nt) continue;
  agree(`@${x} tail n / signed % / unsigned %`, `${t.tailIdx.length}/${fmt(100 * t.sumE / t.sumMain, 2)}/${fmt(100 * t.sumAbsE / t.sumMain, 2)}`, `${nt[0]}/${nt[1].toFixed(2)}/${nt[2].toFixed(2)}`, 0); }
console.log('  the Legendre decomposition: 2^(k+2) terms per tail prime, split by modulus range (share of the tail main term)');
console.log('   level | terms/q | L1 total % | BV % | EH % | short % | signed by range BV / EH / short | short terms with |delta| >= 1 | exactness failures');
for (const x of LEVELS) { const t = TW[x];
  console.log(`   @${String(x).padEnd(3)} | ${String(t.nTerms / t.tailIdx.length).padStart(7)} | ${fmt(100 * t.L1 / t.sumMain, 2).padStart(10)} | ${fmt(100 * t.L1bv / t.sumMain, 2).padStart(4)} | ${fmt(100 * t.L1eh / t.sumMain, 2).padStart(4)} | ${fmt(100 * t.L1sh / t.sumMain, 2).padStart(7)} | ${fmt(t.sgBV, 1)} / ${fmt(t.sgEH, 1)} / ${fmt(t.sgSH, 1)} | ${t.nShortBad} (worst |delta| among short terms ${fmt(t.worstShort, 9)}) | ${t.legBad}`);
  console.log(`         short terms ${t.nShort} of ${t.nTerms}; L1 / sum|E| = ${fmt(t.L1 / t.sumAbsE, 1)}x`); }
console.log('  the Comb Discrepancy Lemma\'s own main term in the tail: (mP - s)/(mainC - s), exact and asymptotic');
for (const x of LEVELS) { const r = LV[x], t = TW[x];
  let mp = 0, mc = 0, asy = 0, wsum = 0, per = [];
  let densN = r.N / r.W;
  for (const i of t.tailIdx) { const q = r.scour[i], A = Math.floor((r.W - 1) / q), B = Math.floor((r.W + 1) / q);
    let prod = 1; for (let j = 0; j < i; j++) prod *= (1 - 1 / r.scour[j]);
    const mpi = t.dP * (t.pi[A] + t.pi[B] - 2 * t.pi[q - 1]), mci = (A + B) * densN * prod;
    mp += mpi; mc += mci;
    const u = Math.log(B) / Math.log(q); const f = Math.exp(EG) * (1 / u - Math.pow(q, 1 - u));
    asy += f * mci; wsum += mci; per.push([q, mpi / mci, u]); }
  const lo = per[0], hi = per[per.length - 1];
  console.log(`   @${x}: exact ratio ${fmt(mp / mc, 4)}; asymptotic e^g(1/u - q^(1-u)) weighted the same ${fmt(asy / wsum, 4)}; per prime ${fmt(lo[1], 4)} at q = ${lo[0]} (u = ${fmt(lo[2], 3)}) down to ${fmt(hi[1], 4)} at q = ${hi[0]} (u = ${fmt(hi[2], 3)})`); }
{ const r = LV[23]; if (r) { const k = r.k; let head = 0; const t = TW[23];
  const nHead = r.n - t.tailIdx.length;
  for (let j = 0; j < nHead; j++) head += Math.pow(2, j + 1) * (2 * Math.pow(3, k) + 1);
  const headMain = r.capCK[0] - t.sumCap2t;
  console.log(`   @23 Comb Discrepancy Lemma bound 2^(j+1)(2*3^k + 1) summed over the ${nHead} head primes = ${head.toExponential(2)}; head sum cap2 = ${headMain}; ratio = ${(head / headMain).toExponential(2)}`);
  console.log(`   @23 tail share of sum cap2 = ${fmt(100 * t.sumCap2t / r.capCK[0], 2)}%; floor at K* = ${r.floorC(r.KstarC)}; tail sum (cap_K* - s) budget = ${fmt(100 * r.floorC(r.KstarC) / (r.capCK[0] - t.sumCap2t > 0 ? 1 : 1), 4)} (see note section 1)`); } }
console.log('  the sifting parameter part (b) would need, from rho = ln y*/ln T (arithmetic only):');
for (const [x, rho1, rho2] of [[97, 0.422, 0.562], [29, 0.399, 0.532]]) {
  console.log(`   @${x}: s_BV = 0.5/rho = ${fmt(0.5 / rho1, 3)} -> ${fmt(0.5 / rho2, 3)}; s_EH = 1/rho = ${fmt(1 / rho1, 3)} -> ${fmt(1 / rho2, 3)}; F1(s) = 2e^g/s on [1,3] = ${fmt(E2G / (1 / rho1), 3)} -> ${fmt(E2G / (1 / rho2), 3)}; f1 > 0 needs s > 2`);
}

// ============================ SEC 4: the transfer's correction and the sharp bound (target a)
console.log('\nSEC 4 - THE DEPTH-K TRANSFER AT @23: TRUE B, MODEL B, AND WHETHER THE SHARP UPPER BOUND EVER BEATS THE TRIVIAL ONE');
// Buchstab omega on its own grid, Simpson-corrected trapezoid, independent of the engine's
const OH = 1 / 8192, OU = 26, ON = Math.round((OU - 1) / OH), OM = new Float64Array(ON + 1);
{ for (let i = 0; i <= ON; i++) { const u = 1 + i * OH; OM[i] = u <= 2 ? 1 / u : 0; }
  const i2 = Math.round(1 / OH); let g = 2 * OM[i2];
  for (let i = i2 + 1; i <= ON; i++) { g += OH * (OM[i - 1 - i2] + OM[i - i2]) / 2; OM[i] = g / (1 + i * OH); } }
const omega = u => { if (u <= 1) return 0; if (u >= OU) return Math.exp(-EG); const t = (u - 1) / OH, i = Math.floor(t), f = t - i; return OM[i] * (1 - f) + OM[i + 1] * f; };
agree('e^g omega(2) = e^g/2 exactly', Number((Math.exp(EG) * omega(2)).toFixed(6)), 0.890536, 1e-6);
console.log('  where |e^g omega(u) - 1| >= c, and the sigma the note\'s implication then allows (sigma < u_c - 1):');
const UC = {};
for (const c of [0.10, 0.05, 0.02, 0.01, 0.001, 1e-5]) { let uc = 1; for (let u = 12; u > 1; u -= 1e-4) if (Math.abs(Math.exp(EG) * omega(u) - 1) >= c) { uc = u; break; }
  UC[c] = uc; const s = uc - 1; console.log(`    c = ${String(c).padEnd(8)} u_c = ${fmt(uc, 3)}  sigma < ${fmt(s, 3)}  F2 there = ${fmt(F2q(Math.max(0.01, s)), 3)}  f2 there = ${fmt(f2q(s), 3)}`); }
agree('the c = 0.01 row: sigma < u_c - 1', Number((UC[0.01] - 1).toFixed(3)), 1.798, 1e-3);
{ const r = LV[23];
  if (r) {
    const { W, n, scour, mids, sOf, histC, infC, cap2 } = r;
    const lnQ = Float64Array.from(scour, q => Math.log(q));
    const P = new Float64Array(n + 1); P[0] = 1; for (let j = 0; j < n; j++) P[j + 1] = P[j] * (1 - 1 / (scour[j] - 1));
    let V2x = 1; for (const p of mids) V2x *= (1 - 2 / p);
    const V0 = new Float64Array(n); { let v = V2x; for (let i = 0; i < n; i++) { V0[i] = v; v *= (1 - 1 / scour[i]); } }
    const RP = new Float64Array(n + 1); RP[0] = 1; for (let j = 0; j < n; j++) RP[j + 1] = RP[j] * (1 - 2 / scour[j]) / (1 - 1 / scour[j]);
    const Vk = (idx, K) => V0[idx] * RP[K];
    // ambient X per q: m in [2, A] with qm = 11,17 (30) plus m in [2, B] with qm = 13,19 (30)
    const Xof = new Float64Array(n), SIG = new Float64Array(n), F2v = new Float64Array(n), f2v = new Float64Array(n);
    for (let i = 0; i < n; i++) { const q = scour[i], A = Math.floor((W - 1) / q), B = Math.floor((W + 1) / q);
      const iq = inv(q % 30, 30);
      const cntc = (c, lo, hi) => Math.floor((hi - c) / 30) - Math.floor((lo - 1 - c) / 30);
      let XA = 0, XB = 0;
      for (const h of [11, 17]) XA += cntc((h * iq) % 30, 2, A);
      for (const h of [13, 19]) XB += cntc((h * iq) % 30, 2, B);
      Xof[i] = XA + XB; SIG[i] = Math.log(B) / lnQ[i];
      F2v[i] = SIG[i] <= BETA2 + 2 ? F2q(SIG[i]) : M2.F(SIG[i]); f2v[i] = SIG[i] <= ALPHA2 + 1 ? f2q(SIG[i]) : M2.f(SIG[i]); }
    // per-q cumulative survivor counts
    const cum = []; for (let i = 0; i < n; i++) { const a = new Int32Array(i + 2); let acc = infC[i]; a[i + 1] = acc; for (let d = i + 1; d >= 1; d--) { acc += histC[i][d]; a[d - 1] = acc; } cum.push(a); }
    // 1. does the sharp upper bound X V_K F2 ever beat the trivial #A_K <= #A_0 ?
    let below = 0, pairs = 0, minR = Infinity, minQ = 0, belowOwn = 0;
    for (let i = 0; i < n; i++) for (let K = 0; K <= i; K++) { pairs++; const up = Xof[i] * Vk(i, K) * F2v[i];
      if (up < cum[i][0]) below++; if (up < cum[i][Math.min(K, i)]) belowOwn++;
      if (K === i && cum[i][0] > 0) { const rr = up / cum[i][0]; if (rr < minR) { minR = rr; minQ = scour[i]; } } }
    console.log(`  (q, K) pairs at @23: ${pairs} (= sum over q of idx+1 = n(n+1)/2 = ${n * (n + 1) / 2})`);
    console.log(`  pairs where X V_K F2(sigma(q)) < #A_0 (the trivial cap_K <= cap_2): ${below}; where it is below #A_K itself: ${belowOwn}; least (X V_full F2)/#A_0 = ${fmt(minR, 3)} at q = ${minQ}`);
    agree('the "0 of 1,512,930" pair count', `${below} of ${pairs}`, `0 of 1512930`, 0);
    agree('the least ratio and its q', `${fmt(minR, 3)} at ${minQ}`, `1.475 at 31`, 0);
    // 2. the sharp floor at every K
    const KL = [0, 27, 60, 100, 150, 250, 500, 1000, 1739];
    console.log('   K      floor_true   sharp-sieve floor (F2, limit form, remainder 0)');
    for (const K of KL) { let ftr = 0, fsh = 0;
      for (let i = 0; i < n; i++) { const e = Math.min(K, i), s = sOf(scour[i]); ftr += s + cum[i][e]; fsh += s + Math.min(cum[i][0], Xof[i] * Vk(i, e) * F2v[i]); }
      console.log(`   ${String(K).padEnd(6)} ${String(r.N - ftr).padStart(11)}   ${(r.N - fsh).toFixed(0).padStart(12)}`); }
    // 3. per-q true B, and the exhaustive test of the note's implication
    console.log('  per-q B_true = (cap_K - s)/((cap2 - s) prod), against the engine\'s omega-ratio model B (24 bins, weight 1/(ln n - ln q)):');
    const NB = 24, lnx = Math.log(23);
    const Bmodel = (i, K) => { const q = scour[i], lo = q * q, span = W - lo; let num = 0, den = 0, ws = 0;
      for (let b = 0; b < NB; b++) { const nn = lo + span * (b + 0.5) / NB, ln = Math.log(nn), w = 1 / Math.max(0.5, ln - lnQ[i]);
        num += w * omega(ln / lnQ[K - 1]); den += w * omega(ln / lnx); ws += w; }
      return num / den; };
    console.log('    q      sigma    F2      f2      K      cap_K    B_true    B_model   note B_true / B_model');
    const NOTE_B = { '31|1': [1.0000, 1.0000], '401|69': [0.9958, 1.0036], '2003|294': [0.9780, 0.9881], '4001|541': [0.9044, 0.9586], '8009|998': [0.9697, 0.9222] };
    for (const [q0, Kq] of [[31, 1], [401, 69], [2003, 294], [4001, 541], [8009, 998]]) {
      const i = scour.indexOf(q0); if (i < 0) continue; const K = Math.min(Kq, i);
      const Bt = cum[i][K] / (cum[i][0] * P[K]), Bm = Bmodel(i, K), nb = NOTE_B[`${q0}|${Kq}`];
      console.log(`    ${String(q0).padEnd(6)} ${fmt(SIG[i], 3).padEnd(8)} ${fmt(F2v[i], 3).padEnd(7)} ${fmt(f2v[i], 3).padEnd(7)} ${String(K).padEnd(6)} ${String(sOf(q0) + cum[i][K]).padStart(7)}  ${fmt(Bt, 4)}    ${fmt(Bm, 4)}    ${nb ? nb.join(' / ') : '-'}`); }
    console.log('  EXHAUSTIVE TEST of "|B - 1| >= c forces sigma(q) < u_c - 1", over all 1,512,930 (q, K) pairs at @23:');
    console.log('    c        u_c - 1   worst sigma(q) among pairs with |B_true - 1| >= c   (q, K) there     verdict');
    for (const c of [0.10, 0.05, 0.02, 0.01]) { let ws = -1, wq = 0, wK = 0, cnt = 0;
      for (let i = 0; i < n; i++) for (let K = 0; K <= i; K++) { if (cum[i][0] === 0) continue; const B = cum[i][K] / (cum[i][0] * P[K]);
        if (Math.abs(B - 1) >= c) { cnt++; if (SIG[i] > ws) { ws = SIG[i]; wq = scour[i]; wK = K; } } }
      const lim = UC[c] - 1;
      console.log(`    ${String(c).padEnd(8)} ${fmt(lim, 3).padEnd(9)} ${cnt === 0 ? 'no pair reaches this c' : fmt(ws, 3)}${cnt ? `  (${cnt} pairs)` : ''}          ${cnt ? `q = ${wq}, K = ${wK}` : '-'}       ${cnt === 0 ? 'vacuous' : (ws < lim ? 'HOLDS' : 'FAILS: sigma exceeds the allowed bound')}`); }
  } }

// ============================ SEC 5: the remaining derived clauses, one by one
console.log('\nSEC 5 - THE REMAINING DERIVED CLAUSES OF THE THREE NOTES');
{ const r = LV[23];
  if (r) {
    const { n, scour, W, sOf, histC, infC, cap2 } = r;
    const lnQ = Float64Array.from(scour, q => Math.log(q));
    const P = new Float64Array(n + 1); P[0] = 1; for (let j = 0; j < n; j++) P[j + 1] = P[j] * (1 - 1 / (scour[j] - 1));
    const cum = []; for (let i = 0; i < n; i++) { const a = new Int32Array(i + 2); let acc = infC[i]; a[i + 1] = acc; for (let d = i + 1; d >= 1; d--) { acc += histC[i][d]; a[d - 1] = acc; } cum.push(a); }
    const SIG = Float64Array.from(scour, (q, i) => Math.log(Math.floor((W + 1) / q)) / lnQ[i]);
    // 5a. the same implication tested against the MODEL B (the object the note's B actually names), and against B_true at a count floor
    const OMG = new Float64Array(n + 1);
    const NB = 24, lnx = Math.log(23);
    console.log('  5a. the implication "|B - 1| >= c forces sigma < u_c - 1" tested three ways at @23 (all 1,512,930 pairs):');
    console.log('      c       u_c-1    model B: worst sigma / pairs        true B, cap_K >= 100: worst sigma / pairs     true B, cap_K >= 1000: worst sigma / pairs');
    const Bmodel = (i, K) => { const q = scour[i], lo = q * q, span = W - lo; let num = 0, den = 0;
      for (let b = 0; b < NB; b++) { const nn = lo + span * (b + 0.5) / NB, ln = Math.log(nn), w = 1 / Math.max(0.5, ln - lnQ[i]);
        num += w * omega(ln / lnQ[K - 1]); den += w * omega(ln / lnx); }
      return num / den; };
    for (const c of [0.10, 0.05, 0.02, 0.01]) {
      let mw = -1, mc = 0, tw100 = -1, tc100 = 0, tw1000 = -1, tc1000 = 0;
      for (let i = 0; i < n; i++) for (let K = 1; K <= i; K++) {
        if (cum[i][0] === 0) continue;
        const Bt = cum[i][K] / (cum[i][0] * P[K]);
        if (Math.abs(Bt - 1) >= c) { if (cum[i][K] >= 100) { tc100++; if (SIG[i] > tw100) tw100 = SIG[i]; } if (cum[i][K] >= 1000) { tc1000++; if (SIG[i] > tw1000) tw1000 = SIG[i]; } }
        const Bm = Bmodel(i, K);
        if (Math.abs(Bm - 1) >= c) { mc++; if (SIG[i] > mw) mw = SIG[i]; }
      }
      const lim = UC[c] - 1;
      const v = (w, cn) => cn === 0 ? 'vacuous' : `${fmt(w, 3)} / ${cn} ${w < lim ? 'HOLDS' : 'FAILS'}`;
      console.log(`      ${String(c).padEnd(7)} ${fmt(lim, 3).padEnd(8)} ${v(mw, mc).padEnd(34)} ${v(tw100, tc100).padEnd(44)} ${v(tw1000, tc1000)}`);
    }
    // 5b. Route B, the Bonferroni-1 lower bound on B, recomputed from the note's own formula
    console.log('  5b. Route B (Buchstab identity truncated after the first sum, F2 on the subtracted terms), LIMIT-FORM lower side on B:');
    console.log('      B >= (1 - sum_{i<=K} F2(sigma_i)/((q_i - 1) f2(sigma))) / prod,  sigma_i = ln(T/q_i)/ln q');
    for (const [q0, Ks] of [[31, [1]], [37, [1, 2]], [41, [1]]]) {
      const i = scour.indexOf(q0); if (i < 0) continue; const T = Math.floor((W + 1) / q0);
      const fs = SIG[i] <= ALPHA2 + 1 ? f2q(SIG[i]) : M2.f(SIG[i]);
      for (const K of Ks) { if (K > i) continue;
        if (fs <= 0) { console.log(`      q = ${q0}, K = ${K}: f2(sigma) = 0, no lower side at all`); continue; }
        let sum = 0; for (let j = 0; j < K; j++) { const si = (Math.log(T) - lnQ[j]) / lnQ[i]; sum += (si <= BETA2 + 2 ? F2q(si) : M2.F(si)) / ((scour[j] - 1) * fs); }
        console.log(`      q = ${q0}, K = ${K}: sigma = ${fmt(SIG[i], 3)}, f2 = ${fmt(fs, 4)}, bound = ${fmt((1 - sum) / P[K], 3)}   (note: ${q0 === 31 ? '0.792' : q0 === 37 ? (K === 1 ? '-0.308' : '-1.628') : 'n/a'})`); }
    }
    // 5c. the tail at the certificate's depth K*
    const Ks = r.KstarC, t = TW[23];
    let capKS = 0, prodKS = 0, tailKS = 0;
    for (const i of t.tailIdx) { const K = Math.min(Ks, i); capKS += cum[i][K]; prodKS += cum[i][0] * P[K]; tailKS += sOf(scour[i]) + cum[i][K]; }
    console.log(`  5c. @23 at K* = ${Ks}: tail sum (cap_K* - s) = ${capKS}; engine product (cap2 - s) prod = ${fmt(prodKS, 1)}; B_tail = ${fmt(capKS / prodKS, 4)}; tail share of sum cap_K* = ${fmt(100 * tailKS / r.capCK[Ks], 2)}%`);
    console.log(`      budget floor(K*)/tail sum (cap_K* - s) = ${r.floorC(Ks)}/${capKS} = ${fmt(100 * r.floorC(Ks) / capKS, 2)}%; certified head share 22.93% + tail share ${fmt(100 * t.sumCap2t / r.capCK[0], 2)}% = ${fmt(22.93 + 100 * t.sumCap2t / r.capCK[0], 2)}%`);
    // 5d. which scour prime is q_{K*}
    console.log(`  5d. the K* = ${Ks} scour prime is q_${Ks} = ${scour[Ks - 1]} (1-indexed) / ${scour[Ks]} (0-indexed); attack-0830-comb-tail.md section 3 writes "ln q_{27}/ln T = ln 131/ln T", and 131 = q_${scour.indexOf(131) + 1}`);
    // 5e. the certificate's own direction: Bonferroni-2 needs a LOWER bound f2 on every subtracted term
    let withLower = 0, pairsI = 0, anyI = 0;
    for (let i = 0; i < n; i++) { const T = Math.floor((W + 1) / scour[i]); let loc = 0;
      for (let j = 0; j < i; j++) { pairsI++; const si = (Math.log(T) - lnQ[j]) / lnQ[i]; if (si > BETA2) { withLower++; loc++; } }
      if (loc) anyI++; }
    console.log(`  5e. the certificate needs an UPPER bound on #A_K, so Bonferroni must LOWER-bound every subtracted sieve S(A^(i)); that needs f2(sigma_i) > 0.`);
    console.log(`      at @23, sigma_i = ln(T/q_i)/ln q exceeds beta2 = ${fmt(BETA2, 5)} at ${withLower} of ${pairsI} (q, i) pairs, on ${anyI} scour primes: the legal Bonferroni side is the trivial #A_K <= #A_0 at every q.`);
    console.log(`  5f. greedy pool first beats the classic certified floor ${r.floorC(Ks)} at step ${r.greedyCert}; ascending plateau crossing at K = ${r.ascPlat}.`);
    const t1 = Math.floor((W + 1) / scour[t.tailIdx[0]]), t2 = Math.floor((W + 1) / scour[t.tailIdx[t.tailIdx.length - 1]]);
    console.log(`      across the @23 tail ln y/ln T runs ${fmt(Math.log(131) / Math.log(t1), 3)} to ${fmt(Math.log(131) / Math.log(t2), 3)} with y = 131, and ${fmt(Math.log(scour[Ks - 1]) / Math.log(t1), 3)} to ${fmt(Math.log(scour[Ks - 1]) / Math.log(t2), 3)} with y = q_${Ks} = ${scour[Ks - 1]}`);
  } }
console.log(`\nchecks compared: ${nchk}, disagreements: ${nbad}`);


// ============================ SEC 6: which Legendre product is the head theorem's main term
console.log('\nSEC 6 - THE CERTIFIED-HEAD MAIN TERM: prod (1 - 1/q_i) AGAINST prod (1 - 1/(q_i - 1))');
console.log('  research/certificate-engine.md section 1 and research/natal-cap-28-analytic-certificate.js line 20 both state');
console.log('    main = s + (A+B)(N/W) prod_{i<j} (1 - 1/q_i) - [1 in comb_A] - [1 in comb_B].');
console.log('  research/natal-cap-28-analytic-certificate.js line 283 and research/history/staging/attack-0830-comb-tail.js line 92 both compute Pj *= (1 - 1/(q-1)).');
console.log('  Re-derivation of the stated theorem: the Legendre term for d | q_1...q_j counts m <= T with q m in the comb and d | m;');
console.log('  writing m = d m2 that count is (A+B)(N/W)/d plus a comb discrepancy, so the signed sum is (A+B)(N/W) prod (1 - 1/q_i).');
console.log('  The two forms are evaluated below on the same rebuilt tile.');
console.log('   level | head n | head sum|cap2 - s - (mainC - s)|: (1-1/q_i) | (1-1/(q_i-1)) | tail (mP-s)/(mainC-s): (1-1/q_i) | (1-1/(q_i-1)) | note quotes');
{
  const NOTE_MR = { 11: 0.9585, 13: 1.0254, 17: 1.0824, 19: 1.1202, 23: 1.1443 };
  for (const x of LEVELS) { const r = LV[x], t = TW[x];
    const NW = r.N / r.W; let PA = 1, PB = 1, hA = 0, hB = 0, mpS = 0, mcA = 0, mcB = 0, nHead = 0;
    const tailSet = new Set(t.tailIdx);
    for (let i = 0; i < r.n; i++) { const q = r.scour[i], A = Math.floor((r.W - 1) / q), B = Math.floor((r.W + 1) / q), s = r.sOf(q);
      let i1A = (q % 30 === 11 || q % 30 === 17) ? 1 : 0; if (i1A) for (const p of r.mids) if (q % p === p - 2) { i1A = 0; break; }
      let i1B = (q % 30 === 13 || q % 30 === 19) ? 1 : 0; if (i1B) for (const p of r.mids) if (q % p === 2) { i1B = 0; break; }
      const mA = (A + B) * NW * PA - i1A - i1B, mB = (A + B) * NW * PB - i1A - i1B;
      const c2 = r.cap2[i] - s;
      if (!tailSet.has(i)) { nHead++; hA += Math.abs(c2 - mA); hB += Math.abs(c2 - mB); }
      else { mpS += t.dP * (t.pi[A] + t.pi[B] - 2 * t.pi[q - 1]); mcA += mA; mcB += mB; }
      PA *= (1 - 1 / q); PB *= (1 - 1 / (q - 1)); }
    console.log(`   @${String(x).padEnd(3)} | ${String(nHead).padStart(6)} | ${fmt(hA, 1).padStart(38)} | ${fmt(hB, 1).padStart(13)} | ${fmt(mpS / mcA, 4).padStart(32)} | ${fmt(mpS / mcB, 4).padStart(13)} | ${NOTE_MR[x]}`); }
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0830-engine.js
//   invocation:  node research/history/staging/redteam-0830-engine.js
//   code-sha256: 4eca6e6d8ef0ed33b7063c67b2dd6da80f536cbf9f73f6ed5cc74bfef79fe6fa
//   out-sha256:  15b47182514b01b0d35208ac04612599d1875273edf762a31891435481a222e1
//   body-lines:  195
//   forced:      2026-08-30, 0 of 389 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     31.8 s
// ============================================================================
// SEC 0 - THE DHR kappa=2 FUNCTIONS, RE-DERIVED WITHOUT THE NOTES' MARCH
//   route (i) closed-form sigma_2 + Gauss quadrature vs route (ii) AB2/AM3 march at h = 2e-5:
//     u = 1.0000   F2 quad 25.377752  march 25.377752   f2 quad 0.000000  march 0.000000
//     u = 2.0000   F2 quad 6.344438  march 6.344438   f2 quad 0.000000  march 0.000000
//     u = 2.6390   F2 quad 3.686736  march 3.686736   f2 quad 0.000000  march 0.000000
//     u = 3.4637   F2 quad 2.285921  march 2.285921   f2 quad 0.000000  march 0.000000
//     u = 4.1308   F2 quad 1.755698  march 1.755698   f2 quad 0.000000  march 0.000000
//     u = 4.7088   F2 quad 1.487777  march 1.487777   f2 quad 0.405591  march 0.405581
//     u = 5.5785   F2 quad 1.216801  march 1.216799   f2 quad 0.794021  march 0.794015
//   kappa = 1 closed forms (exact on the stated ranges), march minus closed form:
//     worst |march - closed form| over 7 points = 2.00e-15
//   beta2 re-pinned by shooting (F2 and f2 must both tend to 1):
//     beta2 -0.02: F2(25) = 1.007963, f2(25) = 1.007965
//     beta2 -0.005: F2(25) = 1.001988, f2(25) = 1.001989
//     beta2 +0: F2(25) = 1.000002, f2(25) = 1.000002
//     beta2 +0.005: F2(25) = 0.998019, f2(25) = 0.998018
//     beta2 +0.02: F2(25) = 0.992085, f2(25) = 0.992083
//   the note's SEC 2 figures at the @23 head sigma = 4.7088, and its two exact anchors:
//   AGREES   F2(1) = 2(2e^g)^2 exactly: ours 25.3778, note 25.3778
//   AGREES   F2(2) = 1/sigma_2(2) exactly: ours 6.3444, note 6.3444
//   AGREES   F2(4.7088): ours 1.48778, note 1.48779
//   AGREES   f2(4.7088): ours 0.40559, note 0.40557
//   AGREES   F2/f2 at sigma = 4.7088: ours 3.6682, note 3.6684
//
// SEC 1 - sigma AT EACH LEVEL'S HEAD PRIME, AND WHERE THE WIDTH F2/f2 ACTUALLY IS
//   sigma(q) = ln(floor((W+1)/q))/ln q. Head = the shallowest scour prime. Width = F2/f2, infinite where f2 = 0.
//    x    lnW      q0    sigma(q0)   F2         f2         F2/f2       note SEC 2 F2/f2
//    13   10.310   17    2.6390      3.68684    0.00000    infinite    Infinity
//    17   13.143   19    3.4637      2.28589    0.00000    infinite    Infinity
//    19   16.088   23    4.1308      1.75570    0.00000    infinite    Infinity
//    23   19.223   29    4.7088      1.48779    0.40557    3.6684      3.6684
//    29   22.590   31    5.5785      1.21681    0.79401    1.5325      1.5325
//    31   26.024   37    6.2071      1.08171    0.91585    1.1811      1.1811
//    37   29.635   41    6.9803      1.02128    0.97896    1.0432      1.0432
//    41   33.349   43    7.8666      1.00354    0.99644    1.0071      1.0071
//    53   44.931   59    10.0190     1.00002    0.99997    1.0000      1
//    97   83.728   101   17.1422     1.00000    1.00000    1.0000      1
//   AGREES   sigma(q0) at @23: ours 4.7088, note 4.7088
//   AGREES   sigma(q0) at @97: ours 17.1422, note 17.1422
//   TEST of the REFUTED row 97 clause "the best sigma any level has (4.7088, @23 head)":
//     largest head sigma over the levels tabled = 17.1422 at @97, with F2/f2 = 1.0000
//     @29 (a level with an embedded march, research/natal-cap-18-at29.js): sigma = 5.5785, F2/f2 = 1.5325
//     so 4.7088 is the largest head sigma only among levels whose per-q ladder is enumerated here; @29 and above are strictly larger and strictly narrower.
//
// SEC 2 - THE UNIFIED ANCHORED LADDER, REBUILT FROM THE COMB DEFINITION (target c)
//   Every column is an exact finite count at the named level. No law in x is stated or implied.
//    level scour | K* K_pos | floorC(K*) floorU(K*) margin | truth | plateau greedy | truth asc  minimal | killers dead sole redundant | hard-cap viol  margin-id viol
//    @11     10 |  0     0 |         34         36      2 |      45 |      41      2 |         8        4 |       4    6    4         0 | 0 0
//    @13     34 |  0     0 |        110        115      5 |     307 |     296     14 |        28       21 |      21   13   21         0 | 0 0
//    @17    120 |  2     2 |         82        108     26 |    3099 |    3057     64 |       109       88 |      90   30   88         2 | 0 0
//    @19    435 | 10    10 |       1877       1987    110 |   38380 |   38219    273 |       410      350 |     364   71  350        14 | 0 0
//    @23   1739 | 27    27 |       4841       5364    523 |  597475 |  596782   1227 |      1732     1543 |    1580  159 1543        37 | 0 0
//   AGREES   @11 scour / K* / floorC(K*) / floorU(K*) / margin: ours 10/0/34/36/2, note 10/0/34/36/2
//   AGREES   @11 truth / minimal pool (= sole killers) / greedy plateau / dead / ascending truth / redundant: ours 45/4=4/2/6/8/0, note 45/4=4/2/6/8/0
//   AGREES   @13 scour / K* / floorC(K*) / floorU(K*) / margin: ours 34/0/110/115/5, note 34/0/110/115/5
//   AGREES   @13 truth / minimal pool (= sole killers) / greedy plateau / dead / ascending truth / redundant: ours 307/21=21/14/13/28/0, note 307/21=21/14/13/28/0
//   AGREES   @17 scour / K* / floorC(K*) / floorU(K*) / margin: ours 120/2/82/108/26, note 120/2/82/108/26
//   AGREES   @17 truth / minimal pool (= sole killers) / greedy plateau / dead / ascending truth / redundant: ours 3099/88=88/64/30/109/2, note 3099/88=88/64/30/109/2
//   AGREES   @19 scour / K* / floorC(K*) / floorU(K*) / margin: ours 435/10/1877/1987/110, note 435/10/1877/1987/110
//   AGREES   @19 truth / minimal pool (= sole killers) / greedy plateau / dead / ascending truth / redundant: ours 38380/350=350/273/71/410/14, note 38380/350=350/273/71/410/14
//   AGREES   @23 scour / K* / floorC(K*) / floorU(K*) / margin: ours 1739/27/4841/5364/523, note 1739/27/4841/5364/523
//   AGREES   @23 truth / minimal pool (= sole killers) / greedy plateau / dead / ascending truth / redundant: ours 597475/1543=1543/1227/159/1732/37, note 597475/1543=1543/1227/159/1732/37
//    @11 allowances 6 = WE 2 + shadows 2 + fresh-self 2; sum s = 6; sum cap1 288; sum cap2 56; candidates 54; incidences 9; K_pos == K* true
//    @13 allowances 17 = WE 5 + shadows 6 + fresh-self 6; sum s = 17; sum cap1 5052; sum cap2 880; candidates 875; incidences 205; K_pos == K* true
//    @17 allowances 58 = WE 23 + shadows 19 + fresh-self 16; sum s = 58; sum cap1 99729; sum cap2 16135; candidates 16112; incidences 5235; K_pos == K* true
//    @19 allowances 213 = WE 86 + shadows 75 + fresh-self 52; sum s = 213; sum cap1 2025930; sum cap2 308401; candidates 308315; incidences 119912; K_pos == K* true
//    @23 allowances 868 = WE 372 + shadows 321 + fresh-self 175; sum s = 868; sum cap1 48424543; sum cap2 7034588; candidates 7034216; incidences 3082915; K_pos == K* true
//   the largest killer prime, and whether it is a twin's LOWER member inside the scour:
//    @11: last killer q = 41 (scour index 8 of 10); q+2 in scour: yes; q-2 in scour: no
//    @13: last killer q = 139 (scour index 28 of 34); q+2 in scour: no; q-2 in scour: yes
//    @17: last killer q = 641 (scour index 109 of 120); q+2 in scour: yes; q-2 in scour: no
//    @19: last killer q = 2887 (scour index 410 of 435); q+2 in scour: no; q-2 in scour: no
//    @23: last killer q = 14867 (scour index 1732 of 1739); q+2 in scour: yes; q-2 in scour: no
//   the minimal pool is PROVEN exact where the sole-killer lower bound meets the greedy upper bound:
//    @11: sole killers 4 (lower bound, every sole killer is forced) vs greedy pool reaching truth 4 (upper bound) -> EQUAL, minimum proven
//    @13: sole killers 21 (lower bound, every sole killer is forced) vs greedy pool reaching truth 21 (upper bound) -> EQUAL, minimum proven
//    @17: sole killers 88 (lower bound, every sole killer is forced) vs greedy pool reaching truth 88 (upper bound) -> EQUAL, minimum proven
//    @19: sole killers 350 (lower bound, every sole killer is forced) vs greedy pool reaching truth 350 (upper bound) -> EQUAL, minimum proven
//    @23: sole killers 1543 (lower bound, every sole killer is forced) vs greedy pool reaching truth 1543 (upper bound) -> EQUAL, minimum proven
//   @23 sealed-forecast quantities, recomputed: WE 372 (band [280,420]), floorU(K*) 5364 (band [5240,5490]), margin 523 (band [400,650]), asc plateau 1242 (band [1130,1390]), greedy plateau 1227 (band [1100,1390]), asc truth 1732 (band [1600,1739]), minimal 1543 (band [1390,1600]), dead 159 (band [120,260]), redundant 37 (band [20,200])
//   @23 classic sums at K = 26 and 27: 5312453 and 5296609 against N = 5301450 (the D3 argument's inputs)
//   scour size at @23 recomputed = 1739 (attack-anchored-02.md line 164 says the @23 march is "5.3M slots x 1863 primes"); pi(sqrt W) - pi(23) = 1739
//
// SEC 3 - THE TAIL DEFECT AND THE PRIME-COMB LEGENDRE DECOMPOSITION, REBUILT (target b)
//   Tail = scour primes with q^3 > W + 1, where every admissible cofactor of a fresh victim is prime.
//   main(q) = dP (pi(A) + pi(B) - 2 pi(q-1)), dP = (1/4) prod_mids (1 - 1/(p-1)); E(q) = (cap2 - s) - main(q).
//    level | tail n | tail sum cap2 | E signed % of main | sum|E| % of main | max |E|/cap2 (cap2>=20) | sign split +/- | note (n, signed, unsigned)
//    @11  |      9 |            42 |              -6.03 |            14.92 |       0.00% at q = none     | 4/5 | 9, -6.03, 14.92
//    @13  |     29 |           485 |               1.09 |             6.50 |       8.33% at q = 53       | 16/13 | 29, 1.09, 6.5
//    @17  |    105 |          6989 |               0.50 |             2.85 |      15.26% at q = 383      | 54/51 | 105, 0.5, 2.85
//    @19  |    396 |        110439 |              -0.01 |             1.42 |      26.31% at q = 2789     | 183/213 | 396, -0.01, 1.42
//    @23  |   1638 |       2121291 |              -0.01 |             0.60 |      26.59% at q = 14401    | 813/825 | 1638, -0.01, 0.6
//   AGREES   @11 tail n / signed % / unsigned %: ours 9/-6.03/14.92, note 9/-6.03/14.92
//   AGREES   @13 tail n / signed % / unsigned %: ours 29/1.09/6.50, note 29/1.09/6.50
//   AGREES   @17 tail n / signed % / unsigned %: ours 105/0.50/2.85, note 105/0.50/2.85
//   AGREES   @19 tail n / signed % / unsigned %: ours 396/-0.01/1.42, note 396/-0.01/1.42
//   AGREES   @23 tail n / signed % / unsigned %: ours 1638/-0.01/0.60, note 1638/-0.01/0.60
//   the Legendre decomposition: 2^(k+2) terms per tail prime, split by modulus range (share of the tail main term)
//    level | terms/q | L1 total % | BV % | EH % | short % | signed by range BV / EH / short | short terms with |delta| >= 1 | exactness failures
//    @11  |      16 |     103.59 | 0.00 | 31.11 |   72.48 | 0.0 / -2.0 / -0.4 | 0 (worst |delta| among short terms 0.964583333) | 0
//          short terms 124 of 144; L1 / sum|E| = 6.9x
//    @13  |      32 |      57.86 | 0.00 | 30.10 |   27.76 | 0.0 / 4.8 / 0.2 | 0 (worst |delta| among short terms 0.987500000) | 0
//          short terms 700 of 928; L1 / sum|E| = 8.9x
//    @17  |      64 |      34.74 | 5.70 | 17.38 |   11.67 | 21.0 / 10.1 / 3.3 | 0 (worst |delta| among short terms 0.997504340) | 0
//          short terms 4760 of 6720; L1 / sum|E| = 12.2x
//    @19  |     128 |      20.39 | 3.07 | 13.03 |    4.28 | 3.3 / 13.1 / -30.0 | 0 (worst |delta| among short terms 0.999884259) | 0
//          short terms 33748 of 50688; L1 / sum|E| = 14.3x
//    @23  |     256 |      11.20 | 1.97 | 7.72 |    1.51 | -1.3 / -305.4 / 109.0 | 0 (worst |delta| among short terms 0.999905084) | 0
//          short terms 269504 of 419328; L1 / sum|E| = 18.6x
//   the Comb Discrepancy Lemma's own main term in the tail: (mP - s)/(mainC - s), exact and asymptotic
//    @11: exact ratio 0.8614; asymptotic e^g(1/u - q^(1-u)) weighted the same 0.6504; per prime 1.0041 at q = 17 (u = 1.731) down to 0.1440 at q = 47 (u = 1.011)
//    @13: exact ratio 0.9887; asymptotic e^g(1/u - q^(1-u)) weighted the same 0.8177; per prime 1.0487 at q = 37 (u = 1.855) down to 0.0536 at q = 173 (u = 1.000)
//    @17: exact ratio 1.0633; asymptotic e^g(1/u - q^(1-u)) weighted the same 0.9167; per prime 1.0178 at q = 83 (u = 1.974) down to 0.0326 at q = 709 (u = 1.002)
//    @19: exact ratio 1.1072; asymptotic e^g(1/u - q^(1-u)) weighted the same 0.9820; per prime 0.9974 at q = 223 (u = 1.975) down to 0.0092 at q = 3109 (u = 1.000)
//    @23: exact ratio 1.1341; asymptotic e^g(1/u - q^(1-u)) weighted the same 1.0262; per prime 0.9743 at q = 607 (u = 2.000) down to 0.0023 at q = 14929 (u = 1.000)
//    @23 Comb Discrepancy Lemma bound 2^(j+1)(2*3^k + 1) summed over the 101 head primes = 7.40e+33; head sum cap2 = 4913297; ratio = 1.51e+27
//    @23 tail share of sum cap2 = 30.16%; floor at K* = 4841; tail sum (cap_K* - s) budget = 484100.0000 (see note section 1)
//   the sifting parameter part (b) would need, from rho = ln y*/ln T (arithmetic only):
//    @97: s_BV = 0.5/rho = 1.185 -> 0.890; s_EH = 1/rho = 2.370 -> 1.779; F1(s) = 2e^g/s on [1,3] = 1.503 -> 2.002; f1 > 0 needs s > 2
//    @29: s_BV = 0.5/rho = 1.253 -> 0.940; s_EH = 1/rho = 2.506 -> 1.880; F1(s) = 2e^g/s on [1,3] = 1.421 -> 1.895; f1 > 0 needs s > 2
//
// SEC 4 - THE DEPTH-K TRANSFER AT @23: TRUE B, MODEL B, AND WHETHER THE SHARP UPPER BOUND EVER BEATS THE TRIVIAL ONE
//   AGREES   e^g omega(2) = e^g/2 exactly: ours 0.890536, note 0.890536
//   where |e^g omega(u) - 1| >= c, and the sigma the note's implication then allows (sigma < u_c - 1):
//     c = 0.1      u_c = 2.022  sigma < 1.022  F2 there = 24.302  f2 there = 0.000
//     c = 0.05     u_c = 2.171  sigma < 1.171  F2 there = 18.498  f2 there = 0.000
//     c = 0.02     u_c = 2.315  sigma < 1.315  F2 there = 14.682  f2 there = 0.000
//     c = 0.01     u_c = 2.798  sigma < 1.798  F2 there = 7.849  f2 there = 0.000
//     c = 0.001    u_c = 3.586  sigma < 2.586  F2 there = 3.832  f2 there = 0.000
//     c = 0.00001  u_c = 4.705  sigma < 3.705  F2 there = 2.056  f2 there = 0.000
//   AGREES   the c = 0.01 row: sigma < u_c - 1: ours 1.798, note 1.798
//   (q, K) pairs at @23: 1512930 (= sum over q of idx+1 = n(n+1)/2 = 1512930)
//   pairs where X V_K F2(sigma(q)) < #A_0 (the trivial cap_K <= cap_2): 0; where it is below #A_K itself: 0; least (X V_full F2)/#A_0 = 1.475 at q = 31
//   AGREES   the "0 of 1,512,930" pair count: ours 0 of 1512930, note 0 of 1512930
//   AGREES   the least ratio and its q: ours 1.475 at 31, note 1.475 at 31
//    K      floor_true   sharp-sieve floor (F2, limit form, remainder 0)
//    0         -1733138       -1733138
//    27            4841       -1733138
//    60          272732       -1733138
//    100         381799       -1733138
//    150         449292       -1733138
//    250         514452       -1733138
//    500         570772       -1733138
//    1000        593943       -1733138
//    1739        596782       -1733138
//   per-q B_true = (cap_K - s)/((cap2 - s) prod), against the engine's omega-ratio model B (24 bins, weight 1/(ln n - ln q)):
//     q      sigma    F2      f2      K      cap_K    B_true    B_model   note B_true / B_model
//     31     4.598    1.530   0.323   1       318450  1.0000    1.0000    1 / 1
//     401    2.207    5.213   0.000   69        8044  0.9958    1.0036    0.9958 / 1.0036
//     2003   1.529    10.862  0.000   294       1305  0.9780    0.9881    0.978 / 0.9881
//     4001   1.318    14.617  0.000   541        557  0.9044    0.9586    0.9044 / 0.9586
//     8009   1.139    19.573  0.000   998        216  0.9697    0.9222    0.9697 / 0.9222
//   EXHAUSTIVE TEST of "|B - 1| >= c forces sigma(q) < u_c - 1", over all 1,512,930 (q, K) pairs at @23:
//     c        u_c - 1   worst sigma(q) among pairs with |B_true - 1| >= c   (q, K) there     verdict
//     0.1      1.022     1.307  (352313 pairs)          q = 4157, K = 562       FAILS: sigma exceeds the allowed bound
//     0.05     1.171     1.468  (698543 pairs)          q = 2417, K = 330       FAILS: sigma exceeds the allowed bound
//     0.02     1.315     1.960  (1081495 pairs)          q = 661, K = 97       FAILS: sigma exceeds the allowed bound
//     0.01     1.798     2.159  (1271388 pairs)          q = 439, K = 44       FAILS: sigma exceeds the allowed bound
//
// SEC 5 - THE REMAINING DERIVED CLAUSES OF THE THREE NOTES
//   5a. the implication "|B - 1| >= c forces sigma < u_c - 1" tested three ways at @23 (all 1,512,930 pairs):
//       c       u_c-1    model B: worst sigma / pairs        true B, cap_K >= 100: worst sigma / pairs     true B, cap_K >= 1000: worst sigma / pairs
//       0.1     1.022    1.042 / 21134 FAILS                1.307 / 60173 FAILS                          vacuous
//       0.05    1.171    1.270 / 471679 FAILS               1.468 / 264359 FAILS                         1.468 / 148 FAILS
//       0.02    1.315    1.454 / 821675 FAILS               1.960 / 557864 FAILS                         1.960 / 11272 FAILS
//       0.01    1.798    1.545 / 954044 HOLDS               2.159 / 715892 FAILS                         2.159 / 33875 FAILS
//   5b. Route B (Buchstab identity truncated after the first sum, F2 on the subtracted terms), LIMIT-FORM lower side on B:
//       B >= (1 - sum_{i<=K} F2(sigma_i)/((q_i - 1) f2(sigma))) / prod,  sigma_i = ln(T/q_i)/ln q
//       q = 31, K = 1: sigma = 4.598, f2 = 0.3228, bound = 0.792   (note: 0.792)
//       q = 37, K = 1: sigma = 4.324, f2 = 0.0652, bound = -0.308   (note: -0.308)
//       q = 37, K = 2: sigma = 4.324, f2 = 0.0652, bound = -1.628   (note: -1.628)
//       q = 41, K = 1: f2(sigma) = 0, no lower side at all
//   5c. @23 at K* = 27: tail sum (cap_K* - s) = 1413605; engine product (cap2 - s) prod = 1413411.6; B_tail = 1.0001; tail share of sum cap_K* = 26.70%
//       budget floor(K*)/tail sum (cap_K* - s) = 4841/1413605 = 0.34%; certified head share 22.93% + tail share 30.16% = 53.09%
//   5d. the K* = 27 scour prime is q_27 = 151 (1-indexed) / 157 (0-indexed); attack-0830-comb-tail.md section 3 writes "ln q_{27}/ln T = ln 131/ln T", and 131 = q_23
//   5e. the certificate needs an UPPER bound on #A_K, so Bonferroni must LOWER-bound every subtracted sieve S(A^(i)); that needs f2(sigma_i) > 0.
//       at @23, sigma_i = ln(T/q_i)/ln q exceeds beta2 = 4.26645 at 0 of 1511191 (q, i) pairs, on 0 scour primes: the legal Bonferroni side is the trivial #A_K <= #A_0 at every q.
//   5f. greedy pool first beats the classic certified floor 4841 at step 27; ascending plateau crossing at K = 1242.
//       across the @23 tail ln y/ln T runs 0.380 to 0.507 with y = 131, and 0.392 to 0.522 with y = q_27 = 151
//
// checks compared: 26, disagreements: 0
//
// SEC 6 - THE CERTIFIED-HEAD MAIN TERM: prod (1 - 1/q_i) AGAINST prod (1 - 1/(q_i - 1))
//   research/certificate-engine.md section 1 and research/natal-cap-28-analytic-certificate.js line 20 both state
//     main = s + (A+B)(N/W) prod_{i<j} (1 - 1/q_i) - [1 in comb_A] - [1 in comb_B].
//   research/natal-cap-28-analytic-certificate.js line 283 and research/history/staging/attack-0830-comb-tail.js line 92 both compute Pj *= (1 - 1/(q-1)).
//   Re-derivation of the stated theorem: the Legendre term for d | q_1...q_j counts m <= T with q m in the comb and d | m;
//   writing m = d m2 that count is (A+B)(N/W)/d plus a comb discrepancy, so the signed sum is (A+B)(N/W) prod (1 - 1/q_i).
//   The two forms are evaluated below on the same rebuilt tile.
//    level | head n | head sum|cap2 - s - (mainC - s)|: (1-1/q_i) | (1-1/(q_i-1)) | tail (mP-s)/(mainC-s): (1-1/q_i) | (1-1/(q_i-1)) | note quotes
//    @11  |      1 |                                    0.8 |           0.8 |                           0.9440 |        0.9585 | 0.9585
//    @13  |      5 |                                    7.0 |           5.0 |                           1.0102 |        1.0254 | 1.0254
//    @17  |     15 |                                   92.3 |          63.6 |                           1.0684 |        1.0824 | 1.0824
//    @19  |     39 |                                 1855.0 |        1807.5 |                           1.1084 |        1.1202 | 1.1202
//    @23  |    101 |                                42369.8 |       49186.0 |                           1.1343 |        1.1443 | 1.1443
// ============================================================================
// READINGS
// ============================================================
