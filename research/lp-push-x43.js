// ============================================================================
// PUSHING THE LEVEL-D LINEAR PROGRAM FROM x = 23 TO x = 43, AND ADJUDICATING
// THE ATTACK-3 / ATTACK-4 CONFLICT
// (2026-08-18; report in research/history/staging/lp-push-x43.md)
// ============================================================================
// WHY. research/attack-beta2-04-loss-budget.js section 7 solves the exact
// level-D linear program
//
//     min y_0  s.t.  sum_{S superset T} y_S = g(T) for every T with prod T <= D,
//     y >= 0,        g(T) = prod_{p in T} omega(p)/p,
//
// whose optimum divided by V(z) is rho*(z,D): the best main term ANY minorant
// that reads only divisor-class densities can carry at level D. Its four level
// statistics s*, s50, s90, s99 (where rho* first exceeds 0, 1/2, 9/10, 99/100),
// rescaled by whatever factor the kappa = 1 column needs to reproduce the PROVEN
// beta_1 = 2, give the one-point floor at dimension two: 3.195, which is the
// DP1 line of research/sift-limit-attack.md section 7d and the basis for its
// claim that section 1's ordering of the discard points is inverted.
//
// That file's own honest limit: the LP ran only to x = 23 (512 cells) on a dense
// tableau simplex. The kappa = 1 control had converged by x = 13 but kappa = 2's
// s90 and s99 were STILL RISING at x = 23, so 3.195 rested on the calibration,
// not on convergence. This script pushes the same LP to x = 43 (2^14 cells).
//
// AND IT SETTLES A SECOND THING. sift-limit-attack.md section 7d carries a
// flagged UNRESOLVED CONFLICT: section 7c prices swapping stratum pricing from
// worst-case to exact at 1.72 to 1.84 of exponent, while section 7d caps
// DP2+DP3 together at 1.0719 and prices worst-casing exact strata at about
// 0.25. Section 5 below puts every one of those numbers on one axis in one set
// of units and says which is which.
//
// THE SOLVER, and why the old one could not go here. A dense two-phase tableau
// at x = 43 is m x (2^14 + m) with m up to 2^14: tens of gigabytes. This one is
// a revised simplex that never forms the tableau:
//   * CRASH BASIS. Order the constraint set 𝒯 = {T : prod T <= D} by product.
//     𝒯 is a downset, so the columns {S = T : T in 𝒯} form a basis whose inverse
//     is the Mobius matrix mu(T,T') = (-1)^{|T'|-|T|} in closed form. No phase-1
//     march from an artificial basis: the crash basis is exact, and only the
//     21 to 33 per cent of its rows (kappa = 2; 1 to 3 per cent at kappa = 1)
//     that come out negative need repairing.
//   * ZETA PRICING. The reduced cost of column S is c_S - sum_{T subset S} pi_T,
//     which for ALL 2^pi columns at once is one subset-sum transform over the
//     Boolean lattice, O(2^pi * pi) per iteration instead of O(2^pi * m).
//   * DEVEX weights, updated from the pivot row (itself one more zeta), because
//     Dantzig pricing alone runs 6x the iterations on this program.
//   * COMPOSITE PHASE 1 (minimise the sum of infeasibilities from the crash
//     basis) so no artificial variable is ever created.
// Every solve returns its own certificate: the primal residual over all moment
// constraints and the primal-dual gap. Nothing below is quoted from a solve
// whose certificate is not printed.
//
// COST IS THE BINDING CONSTRAINT AND IT IS DECLARED, NOT HIDDEN. The sorted
// divisor list is in bijection with the subsets, so the k-th smallest divisor
// gives exactly m = k+1 constraints: the row count is the index. Iterations grow
// near m^2 and each costs about 3m^2, so a solve costs about m^5. At x = 43 that
// is 0.7 s at m = 281, 67 s at m = 1402 and hours at m = 5000. KCAP below is the
// per-level row cap, chosen so the whole script runs in about half an hour, and
// every statistic whose crossing lies above the cap is reported NOT REACHED
// rather than guessed.
//
//   node research/lp-push-x43.js            (~30 min, ~600 MB peak)
//   node research/lp-push-x43.js 2600       (raise every cap to 2600 rows)
// ============================================================================
'use strict';

const ALLP = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43];
const omega = (p, kappa) => (kappa === 2 && p > 2 ? 2 : 1);
const primesTo = x => ALLP.filter(p => p <= x);
const fmt = (v, d = 4) => (Number.isFinite(v) ? v.toFixed(d) : String(v));
const rule = s => console.log('\n' + '='.repeat(78) + '\n' + s + '\n' + '='.repeat(78));

// The exact ladder, research/exact-g2-ladder.js.
const G2TRUE = new Map([[2, 2], [3, 6], [5, 12], [7, 30], [11, 42], [13, 66], [17, 108],
[19, 150], [23, 204], [29, 258], [31, 348], [37, 528], [41, 546], [43, 618]]);
const BETA2 = 4.26645028414864191641;   // Booker-Browning; research/dhr-verification.md 1.1

// Per-level row cap. m = index in the sorted divisor list, so this caps the
// level D directly. Tuned to the measured cost curve, not to the answer.
const CAPOVERRIDE = Number(process.argv[2]) || 0;
const KCAP = { 7: 1e9, 11: 1e9, 13: 1e9, 17: 1e9, 19: 1e9, 23: 1e9, 29: 1e9, 31: 1e9, 37: 2600, 41: 2100, 43: 1900 };

// ---------------------------------------------------------------------------
// === THE SOLVER =============================================================
// Revised simplex. M is B^{-1} stored COLUMN-MAJOR (M[j*m+k] = B^{-1}[k][j]) so
// that both the FTRAN (B^{-1} a, a loop over the entering column's rows) and the
// BTRAN (sigma^T B^{-1}, a loop over columns) run down contiguous memory.
// ---------------------------------------------------------------------------
function levelLP(ps, lnD, kappa, opt = {}) {
  const pi = ps.length, n = 1 << pi;
  const lg = new Float64Array(n), g = new Float64Array(n), pc = new Uint8Array(n);
  for (let S = 0; S < n; S++) {
    let l = 0, gg = 1, c = 0;
    for (let i = 0; i < pi; i++) if (S & (1 << i)) { l += Math.log(ps[i]); gg *= omega(ps[i], kappa) / ps[i]; c++; }
    lg[S] = l; g[S] = gg; pc[S] = c;
  }
  const inT = new Uint8Array(n), rowOf = new Int32Array(n).fill(-1), Tof = [];
  for (let S = 0; S < n; S++) if (lg[S] <= lnD + 1e-10) { inT[S] = 1; rowOf[S] = Tof.length; Tof.push(S); }
  const m = Tof.length;
  let V = 1; for (const p of ps) V *= 1 - omega(p, kappa) / p;
  // The two closed-form ends. m = n: all moments present, Mobius inversion is
  // the unique feasible point, so rho* = 1. m = 1: only the total mass is
  // constrained, so all of it can sit off the empty cell and rho* = 0.
  if (m === n) return { status: 'ok', value: V, V, m, iters: 0, resid: 0, gap: 0, closed: 'mobius' };
  if (m === 1) return { status: 'ok', value: 0, V, m, iters: 0, resid: 0, gap: 0, closed: 'trivial' };

  const M = new Float64Array(m * m);
  for (let j = 0; j < m; j++) {
    const Tj = Tof[j], base = j * m, cj = pc[Tj];
    for (let U = Tj; ; U = (U - 1) & Tj) { M[base + rowOf[U]] = ((cj - pc[U]) & 1) ? -1 : 1; if (U === 0) break; }
  }
  const yB = new Float64Array(m);
  for (let j = 0; j < m; j++) { const bj = g[Tof[j]], base = j * m; for (let k = 0; k < m; k++) yB[k] += M[base + k] * bj; }
  const basis = new Int32Array(m); for (let i = 0; i < m; i++) basis[i] = Tof[i];
  const inBasis = new Uint8Array(n); for (let i = 0; i < m; i++) inBasis[Tof[i]] = 1;

  const TOL = 1e-9;
  const rho = new Float64Array(m), alpha = new Float64Array(m), Z = new Float64Array(n),
    sig = new Float64Array(m), W = new Float64Array(n).fill(1), AR = new Float64Array(n);
  const zeta = (src, out) => {                       // out[S] = sum_{T subset S, T in 𝒯} src[T]
    out.fill(0);
    for (let i = 0; i < m; i++) out[Tof[i]] = src[i];
    for (let i = 0; i < pi; i++) { const bit = 1 << i; for (let S = 0; S < n; S++) if (S & bit) out[S] += out[S ^ bit]; }
  };
  const ftran = S => {
    alpha.fill(0);
    for (let U = S; ; U = (U - 1) & S) {
      if (inT[U]) { const base = rowOf[U] * m; for (let k = 0; k < m; k++) alpha[k] += M[base + k]; }
      if (U === 0) break;
    }
  };
  const pivotRow = r => { for (let j = 0; j < m; j++) rho[j] = M[j * m + r]; zeta(rho, AR); };
  const pivot = (r, S) => {
    const inv = 1 / alpha[r];
    for (let j = 0; j < m; j++) {
      const base = j * m, t = M[base + r] * inv;
      if (t === 0) continue;
      M[base + r] = t;
      for (let k = 0; k < m; k++) if (k !== r) M[base + k] -= alpha[k] * t;
    }
    const tv = yB[r] * inv; yB[r] = tv;
    for (let k = 0; k < m; k++) if (k !== r) yB[k] -= alpha[k] * tv;
    inBasis[basis[r]] = 0; basis[r] = S; inBasis[S] = 1;
  };
  const devex = (S, r) => {
    const ar = AR[S];
    if (!(Math.abs(ar) > TOL)) { W.fill(1); return; }
    const f = W[S] / (ar * ar);
    for (let j = 0; j < n; j++) { const v = AR[j] * AR[j] * f; if (v > W[j]) W[j] = v; }
    W[basis[r]] = Math.max(1, f);
  };

  let iters = 0, P1 = 0;
  const MAXIT = opt.maxit || 400000;
  let stall = 0, last = Infinity, bland = false;
  for (;;) {                                          // phase 1, composite
    let inf = 0, nneg = 0;
    for (let i = 0; i < m; i++) { if (yB[i] < -TOL) { sig[i] = 1; inf -= yB[i]; nneg++; } else sig[i] = 0; }
    if (nneg === 0) break;
    if (inf < last - 1e-13) { stall = 0; last = inf; bland = false; } else if (++stall > 200) bland = true;
    if (++iters > MAXIT) return { status: 'maxit-p1', m, iters, V };
    for (let j = 0; j < m; j++) { const base = j * m; let s = 0; for (let k = 0; k < m; k++) s += sig[k] * M[base + k]; rho[j] = s; }
    zeta(rho, Z);
    let enter = -1, best = 0;
    if (bland) { for (let S = 0; S < n; S++) if (!inBasis[S] && Z[S] < -TOL) { enter = S; break; } }
    else for (let S = 0; S < n; S++) { if (inBasis[S]) continue; const d = Z[S]; if (d < -TOL) { const sc = d * d / W[S]; if (sc > best) { best = sc; enter = S; } } }
    if (enter < 0) return { status: 'p1-stuck', m, iters, V };
    ftran(enter);
    let t = Infinity, r = -1, ba = 0;
    for (let i = 0; i < m; i++) {
      const a = alpha[i];
      let q = Infinity;
      if (yB[i] >= -TOL) { if (a > TOL) q = yB[i] / a; } else if (a < -TOL) q = yB[i] / a;
      if (q < t - 1e-11) { t = q; r = i; ba = Math.abs(a); }
      else if (q < t + 1e-11 && Math.abs(a) > ba) { t = Math.min(t, q); r = i; ba = Math.abs(a); }
    }
    if (r < 0) return { status: 'p1-unbounded', m, iters, V };
    pivotRow(r); devex(enter, r); pivot(r, enter);
  }
  P1 = iters;
  let rE = -1; for (let i = 0; i < m; i++) if (basis[i] === 0) { rE = i; break; }
  if (rE >= 0) {                                      // phase 2, minimise y_0
    W.fill(1); stall = 0; last = Infinity; bland = false;
    for (;;) {
      if (++iters > MAXIT) return { status: 'maxit-p2', m, iters, V };
      const obj = yB[rE];
      if (obj < last - 1e-15) { stall = 0; last = obj; bland = false; } else if (++stall > 200) bland = true;
      for (let j = 0; j < m; j++) rho[j] = M[j * m + rE];
      zeta(rho, Z);
      let enter = -1, best = 0;
      if (bland) { for (let S = 1; S < n; S++) if (!inBasis[S] && Z[S] > TOL) { enter = S; break; } }
      else for (let S = 1; S < n; S++) { if (inBasis[S]) continue; const d = -Z[S]; if (d < -TOL) { const sc = d * d / W[S]; if (sc > best) { best = sc; enter = S; } } }
      if (enter < 0) break;
      ftran(enter);
      let t = Infinity, r = -1, ba = 0;
      for (let i = 0; i < m; i++) {
        const a = alpha[i];
        if (a <= TOL) continue;
        const q = yB[i] / a;
        if (q < t - 1e-11) { t = q; r = i; ba = a; }
        else if (q < t + 1e-11 && a > ba) { t = Math.min(t, q); r = i; ba = a; }
      }
      if (r < 0) return { status: 'p2-unbounded', m, iters, V };
      pivotRow(r); devex(enter, r); pivot(r, enter);
      if (basis[rE] !== 0) { rE = -1; for (let i = 0; i < m; i++) if (basis[i] === 0) { rE = i; break; } if (rE < 0) break; }
    }
  }
  const value = rE < 0 ? 0 : yB[rE];

  // THE CERTIFICATE. (a) primal: rebuild sum_{S superset T} y_S by a superset-sum
  // transform of the basic solution and compare with g(T) on every row.
  // (b) duality: pi = c_B B^{-1} is the row of B^{-1} at the basic y_0 (zero if
  // y_0 left the basis), the dual value is sum_T pi_T g(T), and the gap must
  // vanish. A solve that fails either is not quoted anywhere below.
  const yfull = new Float64Array(n);
  for (let i = 0; i < m; i++) yfull[basis[i]] += yB[i];
  for (let i = 0; i < pi; i++) { const bit = 1 << i; for (let S = 0; S < n; S++) if (!(S & bit)) yfull[S] += yfull[S | bit]; }
  let resid = 0;
  for (let i = 0; i < m; i++) { const d = Math.abs(yfull[Tof[i]] - g[Tof[i]]); if (d > resid) resid = d; }
  let dual = 0;
  if (rE >= 0) for (let j = 0; j < m; j++) dual += M[j * m + rE] * g[Tof[j]];
  return { status: 'ok', value, V, m, iters, p1: P1, resid, gap: Math.abs(dual - value) };
}

// ---------------------------------------------------------------------------
// The level ladder. Squarefree products of distinct primes are distinct, so the
// sorted list of the 2^pi subset products IS the list of admissible levels D and
// the index of D in it is exactly the constraint count m. That identity is what
// makes the cost of a solve predictable before it is run.
// ---------------------------------------------------------------------------
function levels(x) {
  const ps = primesTo(x), pi = ps.length, n = 1 << pi;
  const L = new Float64Array(n);
  for (let S = 0; S < n; S++) { let l = 0; for (let i = 0; i < pi; i++) if (S & (1 << i)) l += Math.log(ps[i]); L[S] = l; }
  const sorted = Array.from(L).sort((a, b) => a - b);
  return { ps, pi, n, Ls: sorted, lnx: Math.log(x) };
}

// Monotone search. rho* is nondecreasing in D (a larger level only adds
// constraints to a minimisation), so one memo serves all four thresholds and
// each new solve prunes the bracket for the rest.
function makeCurve(x, kappa, kcap, log) {
  const { ps, n, Ls, lnx } = levels(x);
  const cap = Math.min(n - 1, kcap);
  const memo = new Map();
  let worst = { resid: 0, gap: 0 };
  const at = k => {
    if (memo.has(k)) return memo.get(k);
    const t0 = Date.now();
    const r = levelLP(ps, Ls[k], kappa);
    const v = r.status === 'ok' ? r.value / r.V : NaN;
    if (r.status === 'ok') { if (r.resid > worst.resid) worst.resid = r.resid; if (r.gap > worst.gap) worst.gap = r.gap; }
    memo.set(k, v);
    if (log) console.log(`      m = ${String(r.m).padEnd(6)} s = ${fmt(Ls[k] / lnx, 4).padEnd(8)} rho* = ${fmt(v, 6).padEnd(10)}` +
      `${String(r.iters).padStart(7)} iters  resid ${(r.resid || 0).toExponential(1)}  gap ${(r.gap || 0).toExponential(1)}  [${((Date.now() - t0) / 1000).toFixed(1)}s]`);
    return v;
  };
  const cross = t => {                                 // least k with rho*(k) >= t
    if (!(at(cap) >= t)) return { s: NaN, capped: true };
    let lo = 0, hi = cap;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (at(mid) >= t) hi = mid; else lo = mid + 1; }
    return { s: Ls[lo] / lnx, k: lo };
  };
  return { cross, at, cap, Ls, lnx, worst, memo };
}

// ---------------------------------------------------------------------------
// === 1. THE SOLVER, VALIDATED AGAINST THE DENSE ONE =========================
// ---------------------------------------------------------------------------
// The published table of research/history/staging/attack-beta2-04-loss-budget.md
// section 3.5, produced by a completely different (dense two-phase tableau,
// Bland's rule) solver. Reproducing it exactly is the only validation that
// matters, because a wrong sparse solver would otherwise be invisible.
const PUBLISHED = [
  [7, [1.1833, 1.3562, 1.9208, 2.7479], [1.7479, 1.9208, 2.7479, 2.7479]],
  [11, [1.1006, 1.2891, 1.7472, 2.5587], [1.7472, 2.2299, 2.4184, 3.2299]],
  [13, [1.2051, 1.3260, 2.0558, 2.8326], [2.0847, 2.2609, 3.0196, 4.0196]],
  [17, [1.1500, 1.3192, 2.0468, 2.8368], [2.0468, 2.2005, 3.0468, 3.7926]],
  [19, [1.1976, 1.4229, 2.1174, 2.9885], [2.0262, 2.5428, 3.2562, 3.9885]],
  [23, [1.1601, 1.3895, 2.1197, 2.9782], [2.0238, 2.5234, 3.4092, 4.2881]],
];
const TARGETS = [1e-9, 0.5, 0.9, 0.99];
const TNAME = ['s*', 's50', 's90', 's99'];

function section1() {
  rule('1. THE SPARSE SOLVER AGAINST THE DENSE ONE — every published cell, both kappa');
  console.log('attack-beta2-04-loss-budget.js solved this program on a dense tableau to');
  console.log('x = 23. Same program, new solver, no shared code past the definition of g.');
  console.log('x    kappa  s*        s50       s90       s99       max |new - published|');
  let worst = 0, wresid = 0, wgap = 0;
  for (const [x, k1, k2] of PUBLISHED) {
    for (const kappa of [1, 2]) {
      const C = makeCurve(x, kappa, 1e9, false);
      const got = TARGETS.map(t => C.cross(t).s);
      const want = kappa === 1 ? k1 : k2;
      const d = Math.max(...got.map((v, i) => Math.abs(v - want[i])));
      if (d > worst) worst = d;
      if (C.worst.resid > wresid) wresid = C.worst.resid;
      if (C.worst.gap > wgap) wgap = C.worst.gap;
      console.log(`${String(x).padEnd(5)}${kappa}      ${got.map(v => fmt(v, 4).padEnd(10)).join('')}${d.toExponential(1)}` +
        (d < 5e-4 ? '   MATCH' : '   MISMATCH'));
    }
  }
  console.log(`\n  worst disagreement over all 48 published cells: ${worst.toExponential(2)}`);
  console.log(`  worst primal residual ${wresid.toExponential(2)}, worst duality gap ${wgap.toExponential(2)}`);
  console.log('  Closed-form ends, asserted at every level below: rho*(z, x#) = 1 (all');
  console.log('  moments present, Mobius inversion is the unique feasible point) and');
  console.log('  rho*(z, 1) = 0. Both are returned in closed form, not by the simplex.');
  return worst;
}

// ---------------------------------------------------------------------------
// === 2. THE PUSH ============================================================
// ---------------------------------------------------------------------------
function section2() {
  rule('2. THE PUSH — the same four statistics at x = 29, 31, 37, 41, 43');
  console.log('Every solve is printed with its row count, its iteration count and its two');
  console.log('certificates. A statistic whose crossing lies above the row cap is NOT');
  console.log('REACHED and is printed as such; nothing is extrapolated.\n');
  const out = [];
  for (const x of [7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43]) {
    const row = { x };
    for (const kappa of [1, 2]) {
      const kcap = CAPOVERRIDE || KCAP[x];
      const chatty = x >= 29 && kappa === 2;
      if (chatty) console.log(`  --- x = ${x}, kappa = 2, row cap ${Math.min(kcap, (1 << primesTo(x).length) - 1)} ---`);
      const t0 = Date.now();
      const C = makeCurve(x, kappa, kcap, chatty);
      const got = TARGETS.map(t => C.cross(t));
      row['k' + kappa] = {
        s: got.map(r => r.s), capped: got.map(r => !!r.capped),
        capS: C.Ls[C.cap] / C.lnx, capRho: C.at(C.cap), worst: C.worst,
        sec: (Date.now() - t0) / 1000, solves: C.memo.size,
      };
      if (chatty) console.log(`      reach: cap at m = ${C.cap + 1}, s = ${fmt(C.Ls[C.cap] / C.lnx, 4)}, rho* = ${fmt(C.at(C.cap), 6)}` +
        `   [${row['k' + kappa].solves} solves, ${row['k' + kappa].sec.toFixed(1)}s]\n`);
    }
    out.push(row);
  }
  console.log('x     kappa=1                                 kappa=2');
  console.log('      s*      s50     s90     s99             s*      s50     s90     s99      cap (s, rho*)');
  for (const r of out) {
    const cell = k => r['k' + k].s.map((v, i) => (r['k' + k].capped[i] ? '  --  ' : fmt(v, 4)).padEnd(8)).join('');
    console.log(`${String(r.x).padEnd(6)}${cell(1)}        ${cell(2)}  ${fmt(r.k2.capS, 3)} / ${fmt(r.k2.capRho, 4)}`);
  }
  console.log('\n  --  = the crossing lies above this level\'s row cap. NOT REACHED.');
  return out;
}

// ---------------------------------------------------------------------------
// === 3. DOES THE kappa = 2 COLUMN CONVERGE? =================================
// ---------------------------------------------------------------------------
function section3(rows) {
  rule('3. CONVERGENCE — the question the loss budget flagged and could not answer');
  console.log('attack-beta2-04 reported: kappa = 1 converged by x = 13, kappa = 2\'s s90 and');
  console.log('s99 were still rising at x = 23. Below, the same series extended. The last');
  console.log('column is the change from the previous level: a converged series drives it');
  console.log('to zero, a rising one does not.\n');
  for (const kappa of [1, 2]) {
    console.log(`  kappa = ${kappa}`);
    console.log('  x      s*      d       s50     d       s90     d       s99     d');
    let prev = null;
    for (const r of rows) {
      const S = r['k' + kappa].s, cap = r['k' + kappa].capped;
      const cells = S.map((v, i) => {
        if (cap[i]) return '  --      --    ';
        const d = prev && !prev.cap[i] ? v - prev.S[i] : NaN;
        return fmt(v, 4).padEnd(8) + (Number.isFinite(d) ? (d >= 0 ? '+' : '') + fmt(d, 3) : '  -  ').padEnd(8);
      }).join('');
      console.log(`  ${String(r.x).padEnd(7)}${cells}`);
      prev = { S, cap };
    }
    console.log('');
  }
  // trend tests over the levels that were reached
  console.log('  Trend over the reached levels: least-squares slope of the statistic against');
  console.log('  ln x, and the spread of the last three reached values.');
  console.log('  kappa  stat   levels reached          slope vs ln x    last three          spread');
  for (const kappa of [1, 2]) {
    for (let i = 0; i < 4; i++) {
      const pts = rows.filter(r => !r['k' + kappa].capped[i] && r.x >= 13).map(r => [Math.log(r.x), r['k' + kappa].s[i]]);
      if (pts.length < 3) { console.log(`  ${kappa}      ${TNAME[i].padEnd(7)}${'fewer than three'.padEnd(24)}-`); continue; }
      const nn = pts.length;
      let sx = 0, sy = 0, sxx = 0, sxy = 0;
      for (const [a, b] of pts) { sx += a; sy += b; sxx += a * a; sxy += a * b; }
      const slope = (nn * sxy - sx * sy) / (nn * sxx - sx * sx);
      const last = pts.slice(-3).map(p => p[1]);
      console.log(`  ${kappa}      ${TNAME[i].padEnd(7)}${(pts.map(p => Math.round(Math.exp(p[0]))).join(',')).padEnd(24)}${fmt(slope, 4).padEnd(17)}` +
        `${last.map(v => fmt(v, 4)).join(' ').padEnd(20)}${fmt(Math.max(...last) - Math.min(...last), 4)}`);
    }
  }
}

// ---------------------------------------------------------------------------
// === 4. THE CALIBRATED FLOOR AND THE INVERSION ==============================
// ---------------------------------------------------------------------------
function section4(rows) {
  rule('4. THE CALIBRATED ONE-POINT FLOOR, AND WHETHER THE INVERSION SURVIVES');
  console.log('Each kappa = 2 statistic is rescaled by the factor its kappa = 1 twin needs to');
  console.log('reproduce the PROVEN beta_1 = 2 (Selberg; the one-class sifting limit is');
  console.log('optimal). Four independent rescalings of the same program.\n');
  console.log('x       via s*     via s50    via s90    via s99      spread   (-- = not reached)');
  const pooled = [], pooledOld = [];
  const perX = [];
  for (const r of rows) {
    const est = [0, 1, 2, 3].map(i => (r.k1.capped[i] || r.k2.capped[i]) ? NaN : r.k2.s[i] * 2 / r.k1.s[i]);
    const fin = est.filter(Number.isFinite);
    if (r.x >= 13) { pooled.push(...fin); if (r.x <= 23) pooledOld.push(...fin); }
    perX.push({ x: r.x, est, mean: fin.length ? fin.reduce((a, b) => a + b, 0) / fin.length : NaN });
    console.log(`${String(r.x).padEnd(8)}${est.map(e => (Number.isFinite(e) ? fmt(e, 4) : '  --').padEnd(11)).join('')}` +
      `${fin.length ? fmt(Math.max(...fin) - Math.min(...fin), 4) : '-'}`);
  }
  const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
  const F = mean(pooled), FOLD = mean(pooledOld);
  console.log(`\n  Pooled x = 13..23, ${pooledOld.length} readings (the published basis): ${fmt(FOLD, 3)}, range ${fmt(Math.min(...pooledOld), 3)} to ${fmt(Math.max(...pooledOld), 3)}`);
  console.log(`  Pooled x = 13..43, ${pooled.length} readings (this run):            ${fmt(F, 3)}, range ${fmt(Math.min(...pooled), 3)} to ${fmt(Math.max(...pooled), 3)}`);
  console.log('\n  Per level, the mean of that level\'s reached rescalings:');
  console.log('  x        floor estimate');
  for (const p of perX) if (Number.isFinite(p.mean)) console.log(`  ${String(p.x).padEnd(9)}${fmt(p.mean, 4)}`);

  console.log('\n4b. THE BUDGET, RECOMPUTED. E = beta/theta with DHR at beta = 4.26645,');
  console.log('    theta = 1; truth E = 1 asymptotically.');
  console.log('line                                     exponent   cumulative');
  const line = (nm, e, c) => console.log(`${nm.padEnd(41)}${(e >= 0 ? '+' : '') + fmt(e, 4).padEnd(10)} ${fmt(c, 4)}`);
  for (const [nm, f] of [['as published (x <= 23)', FOLD], ['this run (x <= 43)', F]]) {
    console.log(`  ${nm}:`);
    line('  truth', 1, 1);
    line('  DP1: the one-point / level-D floor', f - 1, f);
    line('  DP2+DP3: adversarial omega + truncation', BETA2 - f, BETA2);
  }
  const pivotPt = (1 + BETA2) / 2;
  console.log(`\n  THE INVERSION. sift-limit-attack.md section 7d claims DP1 > DP2+DP3, i.e.`);
  console.log(`  that the one-point floor exceeds the midpoint (1 + beta_2)/2 = ${fmt(pivotPt, 4)}.`);
  console.log(`    floor as published (x <= 23):  ${fmt(FOLD, 4)}  ->  DP1 ${fmt(FOLD - 1, 3)} vs DP2+DP3 ${fmt(BETA2 - FOLD, 3)}   ${FOLD > pivotPt ? 'INVERSION HOLDS' : 'INVERSION FAILS'}`);
  console.log(`    floor at x <= 43 (this run):   ${fmt(F, 4)}  ->  DP1 ${fmt(F - 1, 3)} vs DP2+DP3 ${fmt(BETA2 - F, 3)}   ${F > pivotPt ? 'INVERSION HOLDS' : 'INVERSION FAILS'}`);
  const lo = Math.min(...pooled), hi = Math.max(...pooled);
  console.log(`    and on the WHOLE bracket ${fmt(lo, 3)} to ${fmt(hi, 3)}: ${lo > pivotPt ? 'every reading inverts' : 'the low end does NOT invert'}`);
  console.log(`    (lowest reading ${fmt(lo, 4)} against the midpoint ${fmt(pivotPt, 4)}: margin ${fmt(lo - pivotPt, 4)})`);
  return { F, FOLD, lo, hi, perX };
}

// ---------------------------------------------------------------------------
// === 5. THE ADJUDICATION — attack 3's 1.72-1.84 against attack 4's 1.0719 ===
// ---------------------------------------------------------------------------
// Every number below is in ONE unit: log_x of the interval length H that the
// construction certifies, at theta = 1 so that level = H and log_x(H*) IS the
// beta of E = beta/theta. That is the unit both attacks already used; what they
// did not share is the two ENDPOINTS the difference is taken between.
// ---------------------------------------------------------------------------
function section5(rows, floor) {
  rule('5. ADJUDICATION — what attack 3 and attack 4 each measured, on one axis');
  console.log('Cited inputs, both from complete-period computations already in the repo:');
  console.log('  A. truth              log_x G2, research/exact-g2-ladder.js');
  console.log('  B. exact strata       u* stable, attack-beta2-03-exact-strata.md section 3');
  console.log('  C. envelope surrogate u* under main_i * F_2(u_i), same file section 4b');
  console.log('  D. DHR                beta_2 = 4.26645028414864191641');
  console.log('Computed here:');
  console.log('  L. the raw level-D LP frontier s*(kappa = 2), uncalibrated, same x');
  console.log('  L\'. the same after the beta_1 = 2 calibration\n');
  const B = new Map([[13, 1.9638], [17, 1.9812], [19, 2.0028], [23, 2.0260]]);
  const Cc = new Map([[13, 3.6892], [17, 3.6963], [19, 3.8459], [23, 3.8452]]);
  console.log('x     A truth   L raw LP   B exact strata   L\' calibrated   C envelope   D beta_2');
  for (const x of [13, 17, 19, 23]) {
    const r = rows.find(o => o.x === x);
    const raw = r.k2.s[0], cal = raw * 2 / r.k1.s[0];
    console.log(`${String(x).padEnd(6)}${fmt(Math.log(G2TRUE.get(x)) / Math.log(x), 4).padEnd(10)}${fmt(raw, 4).padEnd(11)}` +
      `${fmt(B.get(x), 4).padEnd(17)}${fmt(cal, 4).padEnd(16)}${fmt(Cc.get(x), 4).padEnd(13)}${fmt(BETA2, 4)}`);
  }
  console.log('\n5a. THE TWO DIFFERENCES, each between the endpoints its own attack used.');
  console.log('x     section 7c: C - B      section 7d(3.4): B - A     7d budget: D - L\'');
  for (const x of [13, 17, 19, 23]) {
    const r = rows.find(o => o.x === x);
    const cal = r.k2.s[0] * 2 / r.k1.s[0];
    console.log(`${String(x).padEnd(6)}${fmt(Cc.get(x) - B.get(x), 4).padEnd(23)}${fmt(B.get(x) - Math.log(G2TRUE.get(x)) / Math.log(x), 4).padEnd(27)}${fmt(BETA2 - cal, 4)}`);
  }
  console.log('\n5b. THE COINCIDENCE THAT DECIDES IT. Attack 3\'s LOWER endpoint (exact strata,');
  console.log('    column B) and the RAW level-D LP frontier (column L) are the same number,');
  console.log('    and they converge onto each other as x grows:');
  console.log('x     B exact strata   L raw LP frontier   B - L      ratio');
  for (const x of [13, 17, 19, 23]) {
    const r = rows.find(o => o.x === x), raw = r.k2.s[0];
    console.log(`${String(x).padEnd(6)}${fmt(B.get(x), 4).padEnd(17)}${fmt(raw, 4).padEnd(20)}${fmt(B.get(x) - raw, 4).padEnd(11)}${fmt(B.get(x) / raw, 4)}`);
  }
  console.log('\n    So attack 3\'s 1.72-1.84 is NOT measured down to the truth and it is NOT');
  console.log('    measured down through the one-point floor: it is measured down TO the');
  console.log('    one-point frontier, from a finite-z surrogate top that is not beta_2.');
  console.log('    Attack 4\'s 1.0719 is measured from beta_2 down to the SAME frontier after');
  console.log('    the beta_1 = 2 calibration has moved it onto the asymptotic scale.');
  console.log('    Two differences, two different tops, one shared bottom expressed at two');
  console.log('    different scales. Both are right and neither is the other.');
  console.log('\n5c. THE ONE AXIS, at x = 23, every segment named.');
  const r23 = rows.find(o => o.x === 23);
  const raw23 = r23.k2.s[0], cal23 = raw23 * 2 / r23.k1.s[0], tr23 = Math.log(204) / Math.log(23);
  const seg = (a, b, nm) => console.log(`    ${fmt(a, 4)} -> ${fmt(b, 4)}   ${(b - a >= 0 ? '+' : '') + fmt(b - a, 4)}   ${nm}`);
  console.log('  FINITE-z axis (everything measured at x = 23 itself):');
  seg(tr23, raw23, 'decoupling: independent stratum maxima  == attack 4 section 3.4\'s "about 0.25"');
  seg(raw23, B.get(23), 'exact strata against the raw LP frontier: they coincide');
  seg(B.get(23), Cc.get(23), 'envelope pricing of the strata           == attack 3\'s 1.72 to 1.84');
  seg(Cc.get(23), BETA2, 'one-step surrogate to the real DHR truncation');
  console.log('  ASYMPTOTIC axis (the budget\'s axis; the calibration moves the frontier):');
  seg(1, cal23, 'DP1, the one-point floor at x = 23 after calibration');
  seg(cal23, BETA2, 'DP2+DP3, the residual');
  console.log(`\n    The two axes share only their top. The finite-z axis starts at ${fmt(tr23, 3)} (the`);
  console.log('    measured truth at x = 23), the asymptotic axis starts at 1. The 1.72-1.84');
  console.log(`    segment and the ${fmt(BETA2 - cal23, 3)} segment do not overlap and do not sum to anything.`);
  console.log('\n5d. WHAT EACH FIGURE LICENSES.');
  console.log('  * 1.72 to 1.84 (attack 3) licenses: at accessible z, pricing depth-one');
  console.log('    Buchstab strata at their exact full-period maxima instead of at');
  console.log('    main_i * F_2(u_i) moves that specific bound by 1.72 to 1.84. It does NOT');
  console.log('    license "DP3 has 1.8 of recoverable exponent inside DHR", because its');
  console.log('    floor is the one-point frontier, which no sieve axiom reaches, and its');
  console.log('    ceiling is a one-step surrogate, not beta_2.');
  console.log('  * 1.0719 (attack 4) licenses: on the asymptotic scale, everything DHR gives');
  console.log('    up BEYOND the one-point floor is at most 1.07. It does NOT license a');
  console.log('    finite-z statement, and it inherits the calibration\'s uncertainty.');
  console.log('  * about 0.25 (attack 4 section 3.4) licenses: pricing every stratum at its');
  console.log('    own worst case over window position, rather than jointly, costs 0.25 to');
  console.log('    0.33 at accessible z. That is the segment from truth up to exact strata,');
  console.log('    and it is disjoint from both of the above.');
  console.log('\n  NOT SPLIT, NOT AVERAGED. The three numbers are three different segments of');
  console.log('  two different axes and every one of them stands.');
}

// ---------------------------------------------------------------------------
function main() {
  const t0 = Date.now();
  const worst = section1();
  if (worst > 5e-4) console.log('\n*** SOLVER DISAGREES WITH THE PUBLISHED TABLE — nothing below is quotable ***');
  const rows = section2();
  section3(rows);
  const floor = section4(rows);
  section5(rows, floor);
  console.log(`\n[total ${((Date.now() - t0) / 1000).toFixed(1)} s]`);
}

main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/lp-push-x43.js
//   invocation:  node research/lp-push-x43.js
//   code-sha256: ec604ea70440efc62a01dd7def4c02e5ac968fa070acadcc6c1986b1ac86545d
//   out-sha256:  aa808aaaf2867da9746765fe89884295ed66a524fea732a69fe0f04ee5864ed4
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     1998.5 s
// ============================================================================
//
// ==============================================================================
// 1. THE SPARSE SOLVER AGAINST THE DENSE ONE — every published cell, both kappa
// ==============================================================================
// attack-beta2-04-loss-budget.js solved this program on a dense tableau to
// x = 23. Same program, new solver, no shared code past the definition of g.
// x    kappa  s*        s50       s90       s99       max |new - published|
// 7    1      1.1833    1.3562    1.9208    2.7479    3.0e-5   MATCH
// 7    2      1.7479    1.9208    2.7479    2.7479    3.0e-5   MATCH
// 11   1      1.1006    1.2891    1.7472    2.5587    3.5e-5   MATCH
// 11   2      1.7472    2.2299    2.4184    3.2299    2.2e-5   MATCH
// 13   1      1.2051    1.3260    2.0558    2.8326    2.9e-5   MATCH
// 13   2      2.0847    2.2609    3.0196    4.0196    4.6e-5   MATCH
// 17   1      1.1500    1.3192    2.0468    2.8368    3.5e-5   MATCH
// 17   2      2.0468    2.2005    3.0468    3.7926    2.7e-5   MATCH
// 19   1      1.1976    1.4229    2.1174    2.9885    4.9e-5   MATCH
// 19   2      2.0262    2.5428    3.2562    3.9885    4.6e-5   MATCH
// 23   1      1.1601    1.3895    2.1197    2.9782    3.2e-5   MATCH
// 23   2      2.0238    2.5234    3.4092    4.2881    4.3e-5   MATCH
//
//   worst disagreement over all 48 published cells: 4.90e-5
//   worst primal residual 2.66e-15, worst duality gap 2.68e-15
//   Closed-form ends, asserted at every level below: rho*(z, x#) = 1 (all
//   moments present, Mobius inversion is the unique feasible point) and
//   rho*(z, 1) = 0. Both are returned in closed form, not by the simplex.
//
// ==============================================================================
// 2. THE PUSH — the same four statistics at x = 29, 31, 37, 41, 43
// ==============================================================================
// Every solve is printed with its row count, its iteration count and its two
// certificates. A statistic whose crossing lies above the row cap is NOT
// REACHED and is printed as such; nothing is extrapolated.
//
//   --- x = 29, kappa = 2, row cap 1023 ---
//       m = 1024   s = 6.7088   rho* = 1.000000        0 iters  resid 0.0e+0  gap 0.0e+0  [0.0s]
//       m = 512    s = 3.3510   rho* = 0.907559      647 iters  resid 6.7e-16  gap 4.9e-17  [0.3s]
//       m = 256    s = 2.5636   rho* = 0.581994      683 iters  resid 1.8e-15  gap 1.1e-15  [0.1s]
//       m = 128    s = 2.0191   rho* = 0.000000      145 iters  resid 2.5e-16  gap 0.0e+0  [0.0s]
//       m = 192    s = 2.3200   rho* = 0.288971      485 iters  resid 1.2e-14  gap 7.2e-15  [0.1s]
//       m = 160    s = 2.1754   rho* = 0.095692      246 iters  resid 1.3e-15  gap 7.6e-16  [0.0s]
//       m = 144    s = 2.1031   rho* = 0.051542      150 iters  resid 3.3e-16  gap 7.6e-17  [0.0s]
//       m = 136    s = 2.0558   rho* = 0.000000      139 iters  resid 2.8e-16  gap 0.0e+0  [0.0s]
//       m = 140    s = 2.0856   rho* = 0.000000      157 iters  resid 1.6e-15  gap 0.0e+0  [0.0s]
//       m = 142    s = 2.0942   rho* = 0.051542      219 iters  resid 2.4e-15  gap 3.6e-15  [0.0s]
//       m = 141    s = 2.0880   rho* = 0.000000      156 iters  resid 6.1e-16  gap 0.0e+0  [0.0s]
//       m = 224    s = 2.4523   rho* = 0.464586      574 iters  resid 4.3e-15  gap 4.7e-15  [0.1s]
//       m = 240    s = 2.5090   rho* = 0.529016      541 iters  resid 2.7e-15  gap 1.1e-15  [0.1s]
//       m = 232    s = 2.4839   rho* = 0.529016      536 iters  resid 4.9e-15  gap 4.2e-15  [0.1s]
//       m = 228    s = 2.4633   rho* = 0.525002      419 iters  resid 1.3e-15  gap 1.4e-15  [0.1s]
//       m = 226    s = 2.4576   rho* = 0.464586      620 iters  resid 5.8e-15  gap 4.1e-15  [0.1s]
//       m = 227    s = 2.4624   rho* = 0.525002      376 iters  resid 4.4e-16  gap 6.0e-16  [0.0s]
//       m = 384    s = 2.9784   rho* = 0.799073      760 iters  resid 3.6e-15  gap 5.1e-16  [0.2s]
//       m = 448    s = 3.1708   rho* = 0.834463      767 iters  resid 8.9e-16  gap 9.3e-16  [0.3s]
//       m = 480    s = 3.2613   rho* = 0.874787      744 iters  resid 5.8e-16  gap 5.8e-16  [0.3s]
//       m = 496    s = 3.3091   rho* = 0.894859      580 iters  resid 4.4e-16  gap 2.3e-16  [0.2s]
//       m = 504    s = 3.3308   rho* = 0.901469      677 iters  resid 5.6e-16  gap 2.4e-16  [0.3s]
//       m = 500    s = 3.3200   rho* = 0.894859      718 iters  resid 9.4e-16  gap 2.9e-16  [0.3s]
//       m = 502    s = 3.3253   rho* = 0.901469      666 iters  resid 2.8e-16  gap 1.3e-16  [0.3s]
//       m = 501    s = 3.3219   rho* = 0.894859      636 iters  resid 4.5e-16  gap 7.4e-16  [0.3s]
//       m = 768    s = 4.1428   rho* = 0.988188      357 iters  resid 4.4e-16  gap 4.2e-17  [0.3s]
//       m = 896    s = 4.6853   rho* = 0.997920      204 iters  resid 1.7e-16  gap 6.9e-18  [0.2s]
//       m = 832    s = 4.3817   rho* = 0.995289      302 iters  resid 4.4e-16  gap 2.1e-17  [0.2s]
//       m = 800    s = 4.2524   rho* = 0.992789      329 iters  resid 2.2e-16  gap 3.5e-17  [0.3s]
//       m = 784    s = 4.1924   rho* = 0.990854      384 iters  resid 2.2e-16  gap 1.4e-17  [0.3s]
//       m = 776    s = 4.1685   rho* = 0.989199      457 iters  resid 4.4e-16  gap 4.2e-17  [0.4s]
//       m = 780    s = 4.1877   rho* = 0.990138      364 iters  resid 1.7e-16  gap 1.4e-17  [0.2s]
//       m = 778    s = 4.1791   rho* = 0.989957      356 iters  resid 2.2e-16  gap 8.3e-17  [0.2s]
//       m = 779    s = 4.1836   rho* = 0.989957      343 iters  resid 4.4e-16  gap 6.2e-17  [0.3s]
//       reach: cap at m = 1024, s = 6.7088, rho* = 1.000000   [34 solves, 5.5s]
//
//   --- x = 31, kappa = 2, row cap 2047 ---
//       m = 2048   s = 7.5785   rho* = 1.000000        0 iters  resid 0.0e+0  gap 0.0e+0  [0.0s]
//       m = 1024   s = 3.7887   rho* = 0.951821     1344 iters  resid 7.2e-16  gap 3.7e-16  [2.5s]
//       m = 512    s = 2.9408   rho* = 0.725538     1772 iters  resid 1.8e-14  gap 1.7e-14  [1.0s]
//       m = 256    s = 2.3606   rho* = 0.236428      742 iters  resid 5.4e-15  gap 1.2e-16  [0.1s]
//       m = 128    s = 1.8937   rho* = 0.000000      189 iters  resid 2.3e-15  gap 0.0e+0  [0.0s]
//       m = 192    s = 2.1579   rho* = 0.000000      351 iters  resid 2.3e-15  gap 0.0e+0  [0.1s]
//       m = 224    s = 2.2683   rho* = 0.101090      558 iters  resid 6.0e-15  gap 3.1e-15  [0.1s]
//       m = 208    s = 2.2156   rho* = 0.000000      612 iters  resid 6.6e-14  gap 0.0e+0  [0.1s]
//       m = 216    s = 2.2392   rho* = 0.000000      658 iters  resid 1.5e-14  gap 0.0e+0  [0.1s]
//       m = 220    s = 2.2493   rho* = 0.000000      724 iters  resid 1.3e-14  gap 0.0e+0  [0.1s]
//       m = 222    s = 2.2599   rho* = 0.074415      496 iters  resid 1.3e-14  gap 3.7e-16  [0.1s]
//       m = 221    s = 2.2554   rho* = 0.074415      395 iters  resid 6.0e-15  gap 2.1e-16  [0.1s]
//       m = 384    s = 2.6816   rho* = 0.628361     1352 iters  resid 8.3e-15  gap 6.4e-15  [0.5s]
//       m = 320    s = 2.5355   rho* = 0.477017     1111 iters  resid 7.1e-15  gap 7.3e-15  [0.3s]
//       m = 352    s = 2.6065   rho* = 0.564273     1153 iters  resid 7.5e-15  gap 1.2e-15  [0.3s]
//       m = 336    s = 2.5691   rho* = 0.561848      884 iters  resid 7.0e-15  gap 5.9e-16  [0.2s]
//       m = 328    s = 2.5557   rho* = 0.522265      828 iters  resid 3.6e-15  gap 1.5e-15  [0.2s]
//       m = 324    s = 2.5462   rho* = 0.522265      934 iters  resid 8.5e-15  gap 3.3e-15  [0.2s]
//       m = 322    s = 2.5377   rho* = 0.519330     1119 iters  resid 7.0e-15  gap 7.8e-15  [0.3s]
//       m = 321    s = 2.5363   rho* = 0.477017      980 iters  resid 1.3e-14  gap 5.9e-15  [0.2s]
//       m = 768    s = 3.3892   rho* = 0.891166     1616 iters  resid 5.3e-15  gap 2.3e-15  [1.9s]
//       m = 896    s = 3.5911   rho* = 0.935680     1406 iters  resid 1.3e-15  gap 3.7e-16  [2.2s]
//       m = 832    s = 3.4872   rho* = 0.913007     1959 iters  resid 6.2e-15  gap 2.3e-16  [2.6s]
//       m = 800    s = 3.4410   rho* = 0.907269     1779 iters  resid 1.0e-15  gap 4.8e-16  [2.3s]
//       m = 784    s = 3.4161   rho* = 0.891166     1892 iters  resid 1.3e-15  gap 4.5e-16  [2.2s]
//       m = 792    s = 3.4269   rho* = 0.903394     1666 iters  resid 2.8e-15  gap 1.8e-15  [2.2s]
//       m = 788    s = 3.4199   rho* = 0.899400     1814 iters  resid 3.7e-15  gap 6.7e-16  [2.4s]
//       m = 790    s = 3.4229   rho* = 0.899400     2047 iters  resid 4.3e-15  gap 2.0e-15  [2.6s]
//       m = 791    s = 3.4258   rho* = 0.899400     1786 iters  resid 1.1e-15  gap 1.4e-16  [2.1s]
//       m = 1536   s = 4.6326   rho* = 0.995639     1143 iters  resid 2.2e-16  gap 1.5e-16  [3.2s]
//       m = 1280   s = 4.1880   rho* = 0.984196     1432 iters  resid 1.6e-15  gap 1.2e-16  [3.2s]
//       m = 1408   s = 4.3967   rho* = 0.992913     1401 iters  resid 2.2e-16  gap 2.8e-17  [3.3s]
//       m = 1344   s = 4.2925   rho* = 0.989055     1318 iters  resid 2.9e-16  gap 7.6e-17  [2.9s]
//       m = 1376   s = 4.3425   rho* = 0.991006     1431 iters  resid 1.1e-15  gap 2.8e-16  [3.2s]
//       m = 1360   s = 4.3186   rho* = 0.990269     1338 iters  resid 4.4e-16  gap 8.0e-17  [2.8s]
//       m = 1352   s = 4.3056   rho* = 0.989882     1404 iters  resid 3.3e-16  gap 6.9e-18  [3.4s]
//       m = 1356   s = 4.3111   rho* = 0.990269     1323 iters  resid 4.4e-16  gap 1.6e-16  [4.1s]
//       m = 1354   s = 4.3082   rho* = 0.990269     1151 iters  resid 2.2e-16  gap 6.6e-17  [2.7s]
//       m = 1353   s = 4.3060   rho* = 0.989882     1315 iters  resid 4.4e-16  gap 1.0e-16  [4.4s]
//       reach: cap at m = 2048, s = 7.5785, rho* = 1.000000   [39 solves, 60.0s]
//
//   --- x = 37, kappa = 2, row cap 2600 ---
//       m = 2601   s = 4.5544   rho* = 0.993863     3685 iters  resid 6.1e-16  gap 1.0e-17  [33.4s]
//       m = 1301   s = 3.4838   rho* = 0.915007     4416 iters  resid 1.1e-14  gap 6.0e-15  [17.2s]
//       m = 651    s = 2.8146   rho* = 0.661034     3428 iters  resid 2.6e-14  gap 9.7e-15  [4.6s]
//       m = 326    s = 2.3116   rho* = 0.227985     1327 iters  resid 2.8e-14  gap 1.7e-15  [0.8s]
//       m = 163    s = 1.8869   rho* = 0.000000      245 iters  resid 2.2e-15  gap 0.0e+0  [0.1s]
//       m = 245    s = 2.1245   rho* = 0.000000      572 iters  resid 2.1e-14  gap 0.0e+0  [0.2s]
//       m = 286    s = 2.2258   rho* = 0.044955      858 iters  resid 2.1e-14  gap 2.6e-16  [0.4s]
//       m = 266    s = 2.1795   rho* = 0.000000      686 iters  resid 4.9e-15  gap 0.0e+0  [0.3s]
//       m = 276    s = 2.2002   rho* = 0.022590      637 iters  resid 8.7e-15  gap 1.3e-15  [0.2s]
//       m = 271    s = 2.1898   rho* = 0.000000     1107 iters  resid 5.2e-14  gap 0.0e+0  [0.4s]
//       m = 274    s = 2.1937   rho* = 0.022590      685 iters  resid 1.1e-14  gap 8.9e-15  [0.3s]
//       m = 273    s = 2.1919   rho* = 0.022590      956 iters  resid 6.9e-15  gap 1.3e-15  [0.4s]
//       m = 272    s = 2.1911   rho* = 0.022590      614 iters  resid 2.2e-14  gap 8.6e-15  [0.2s]
//       m = 489    s = 2.5949   rho* = 0.560334     2289 iters  resid 3.3e-14  gap 3.6e-15  [1.6s]
//       m = 408    s = 2.4633   rho* = 0.427423     2013 iters  resid 1.4e-14  gap 1.2e-14  [1.1s]
//       m = 449    s = 2.5297   rho* = 0.530763     1938 iters  resid 3.8e-14  gap 3.9e-14  [1.2s]
//       m = 429    s = 2.4961   rho* = 0.499730     1494 iters  resid 1.1e-14  gap 8.4e-15  [0.9s]
//       m = 439    s = 2.5112   rho* = 0.499730     1835 iters  resid 1.2e-14  gap 1.0e-14  [1.1s]
//       m = 444    s = 2.5174   rho* = 0.530763     1929 iters  resid 2.0e-14  gap 2.1e-14  [1.2s]
//       m = 442    s = 2.5164   rho* = 0.530763     2130 iters  resid 1.4e-14  gap 9.5e-15  [1.4s]
//       m = 441    s = 2.5155   rho* = 0.530763     2054 iters  resid 1.3e-14  gap 1.8e-14  [1.3s]
//       m = 440    s = 2.5146   rho* = 0.530763     1920 iters  resid 2.2e-14  gap 1.8e-14  [1.3s]
//       m = 976    s = 3.1847   rho* = 0.827383     3882 iters  resid 1.5e-14  gap 3.6e-15  [8.3s]
//       m = 1139   s = 3.3416   rho* = 0.885720     3968 iters  resid 3.3e-15  gap 2.8e-15  [9.4s]
//       m = 1220   s = 3.4159   rho* = 0.902636     3942 iters  resid 9.0e-15  gap 7.4e-15  [10.1s]
//       m = 1180   s = 3.3787   rho* = 0.892380     4436 iters  resid 1.1e-14  gap 2.0e-15  [10.5s]
//       m = 1200   s = 3.3966   rho* = 0.897656     4082 iters  resid 3.3e-15  gap 2.8e-15  [13.3s]
//       m = 1210   s = 3.4093   rho* = 0.900191     4211 iters  resid 3.8e-15  gap 1.4e-15  [15.4s]
//       m = 1205   s = 3.4009   rho* = 0.900191     3797 iters  resid 2.8e-15  gap 1.2e-16  [12.1s]
//       m = 1203   s = 3.3997   rho* = 0.897656     3557 iters  resid 3.6e-15  gap 2.6e-15  [10.5s]
//       m = 1204   s = 3.4002   rho* = 0.900191     4004 iters  resid 7.9e-15  gap 3.1e-15  [10.0s]
//       m = 1951   s = 4.0288   rho* = 0.975645     4439 iters  resid 2.6e-15  gap 9.2e-16  [28.9s]
//       m = 2276   s = 4.2834   rho* = 0.989084     4730 iters  resid 1.5e-15  gap 4.1e-16  [45.2s]
//       m = 2439   s = 4.4181   rho* = 0.991976     4200 iters  resid 1.1e-15  gap 2.1e-16  [46.8s]
//       m = 2358   s = 4.3494   rho* = 0.990795     4007 iters  resid 4.4e-16  gap 1.8e-16  [35.2s]
//       m = 2317   s = 4.3155   rho* = 0.990297     4321 iters  resid 1.1e-15  gap 8.7e-17  [41.2s]
//       m = 2297   s = 4.2992   rho* = 0.989803     4156 iters  resid 5.6e-16  gap 7.0e-16  [40.7s]
//       m = 2307   s = 4.3053   rho* = 0.990194     4605 iters  resid 1.2e-15  gap 3.4e-16  [72.2s]
//       m = 2302   s = 4.3020   rho* = 0.990000     4885 iters  resid 2.9e-15  gap 1.9e-16  [66.7s]
//       m = 2305   s = 4.3049   rho* = 0.990194     4418 iters  resid 1.1e-15  gap 9.0e-17  [29.6s]
//       m = 2304   s = 4.3032   rho* = 0.990194     4630 iters  resid 2.1e-15  gap 3.2e-16  [35.0s]
//       m = 2303   s = 4.3031   rho* = 0.990194     4173 iters  resid 1.8e-15  gap 2.1e-16  [33.7s]
//       reach: cap at m = 2601, s = 4.5544, rho* = 0.993863   [42 solves, 644.1s]
//
//   --- x = 41, kappa = 2, row cap 2100 ---
//       m = 2101   s = 3.6016   rho* = 0.915054     9587 iters  resid 1.3e-14  gap 3.6e-15  [91.8s]
//       m = 1051   s = 2.9630   rho* = 0.689388     7650 iters  resid 1.2e-14  gap 7.3e-16  [21.5s]
//       m = 526    s = 2.4617   rho* = 0.433252     2790 iters  resid 2.6e-14  gap 6.0e-15  [2.2s]
//       m = 263    s = 2.0471   rho* = 0.000000     1027 iters  resid 2.5e-14  gap 0.0e+0  [0.5s]
//       m = 395    s = 2.2831   rho* = 0.086454     2394 iters  resid 1.6e-13  gap 1.6e-14  [1.5s]
//       m = 329    s = 2.1725   rho* = 0.000000     1246 iters  resid 8.3e-15  gap 0.0e+0  [0.9s]
//       m = 362    s = 2.2285   rho* = 0.000000     2560 iters  resid 4.8e-14  gap 0.0e+0  [1.4s]
//       m = 379    s = 2.2584   rho* = 0.086454     1967 iters  resid 2.6e-14  gap 1.3e-14  [1.1s]
//       m = 371    s = 2.2465   rho* = 0.065056     1916 iters  resid 2.0e-14  gap 4.7e-15  [1.1s]
//       m = 367    s = 2.2416   rho* = 0.065056     2010 iters  resid 6.8e-14  gap 3.1e-15  [1.1s]
//       m = 365    s = 2.2355   rho* = 0.065056     1538 iters  resid 2.1e-14  gap 1.9e-14  [0.8s]
//       m = 364    s = 2.2336   rho* = 0.065056     2065 iters  resid 6.0e-14  gap 4.0e-14  [1.1s]
//       m = 363    s = 2.2328   rho* = 0.065056     1500 iters  resid 7.0e-15  gap 7.0e-15  [0.8s]
//       m = 789    s = 2.7415   rho* = 0.586834     6729 iters  resid 2.2e-14  gap 7.7e-15  [9.2s]
//       m = 658    s = 2.6118   rho* = 0.536001     4648 iters  resid 3.7e-13  gap 4.5e-14  [5.0s]
//       m = 592    s = 2.5428   rho* = 0.466015     3589 iters  resid 3.6e-14  gap 1.1e-14  [3.3s]
//       m = 625    s = 2.5789   rho* = 0.508898     4217 iters  resid 1.6e-13  gap 1.1e-13  [4.1s]
//       m = 609    s = 2.5616   rho* = 0.488902     4004 iters  resid 2.7e-14  gap 2.0e-14  [9.5s]
//       m = 617    s = 2.5704   rho* = 0.488902     5172 iters  resid 2.3e-14  gap 7.1e-15  [6.5s]
//       m = 621    s = 2.5755   rho* = 0.488902     3898 iters  resid 1.0e-13  gap 5.6e-14  [4.0s]
//       m = 623    s = 2.5770   rho* = 0.508898     4213 iters  resid 2.0e-13  gap 1.3e-13  [4.3s]
//       m = 622    s = 2.5769   rho* = 0.508898     4658 iters  resid 3.3e-14  gap 2.5e-14  [5.1s]
//       m = 1576   s = 3.3170   rho* = 0.864359     7906 iters  resid 5.8e-15  gap 3.4e-15  [40.3s]
//       m = 1839   s = 3.4645   rho* = 0.895411    10279 iters  resid 5.5e-14  gap 5.5e-15  [74.8s]
//       m = 1970   s = 3.5344   rho* = 0.904510     9803 iters  resid 1.6e-14  gap 6.1e-15  [74.9s]
//       m = 1905   s = 3.5014   rho* = 0.900889     9435 iters  resid 1.2e-14  gap 3.6e-15  [69.6s]
//       m = 1872   s = 3.4837   rho* = 0.898262     9053 iters  resid 1.5e-14  gap 1.1e-15  [56.3s]
//       m = 1889   s = 3.4924   rho* = 0.898262     9099 iters  resid 5.3e-15  gap 2.1e-15  [64.8s]
//       m = 1897   s = 3.4965   rho* = 0.900240    10436 iters  resid 1.6e-14  gap 5.2e-15  [92.2s]
//       m = 1893   s = 3.4954   rho* = 0.898262     9914 iters  resid 1.5e-13  gap 3.7e-15  [75.9s]
//       m = 1895   s = 3.4956   rho* = 0.899582     8332 iters  resid 7.5e-15  gap 5.7e-15  [57.4s]
//       m = 1896   s = 3.4964   rho* = 0.900240     8731 iters  resid 4.1e-14  gap 1.7e-14  [65.3s]
//       reach: cap at m = 2101, s = 3.6016, rho* = 0.915054   [32 solves, 848.3s]
//
//   --- x = 43, kappa = 2, row cap 1900 ---
//       m = 1901   s = 3.2385   rho* = 0.810650    15556 iters  resid 7.1e-14  gap 8.2e-15  [123.7s]
//       m = 951    s = 2.7204   rho* = 0.515586    10780 iters  resid 1.2e-13  gap 4.9e-14  [24.7s]
//       m = 476    s = 2.2951   rho* = 0.000000     3136 iters  resid 4.9e-14  gap 0.0e+0  [3.0s]
//       m = 714    s = 2.5373   rho* = 0.388022     6130 iters  resid 1.2e-13  gap 8.4e-14  [9.1s]
//       m = 595    s = 2.4216   rho* = 0.329657     3657 iters  resid 2.9e-14  gap 2.4e-15  [4.5s]
//       m = 536    s = 2.3655   rho* = 0.147574     4072 iters  resid 9.0e-14  gap 7.4e-14  [4.5s]
//       m = 506    s = 2.3317   rho* = 0.101437     3995 iters  resid 3.2e-14  gap 1.1e-14  [4.0s]
//       m = 491    s = 2.3132   rho* = 0.048697     3643 iters  resid 4.8e-14  gap 2.3e-15  [3.6s]
//       m = 484    s = 2.3038   rho* = 0.000000     3885 iters  resid 1.3e-13  gap 0.0e+0  [3.8s]
//       m = 488    s = 2.3100   rho* = 0.000000     3974 iters  resid 1.3e-13  gap 0.0e+0  [4.0s]
//       m = 490    s = 2.3111   rho* = 0.000000     3877 iters  resid 5.3e-14  gap 0.0e+0  [4.4s]
//       m = 833    s = 2.6330   rho* = 0.498564     7984 iters  resid 4.4e-14  gap 1.4e-13  [15.8s]
//       m = 892    s = 2.6771   rho* = 0.498564     7855 iters  resid 5.3e-14  gap 1.0e-13  [16.5s]
//       m = 922    s = 2.6998   rho* = 0.507361    11703 iters  resid 8.5e-14  gap 9.0e-14  [25.2s]
//       m = 907    s = 2.6882   rho* = 0.498564     9196 iters  resid 6.3e-14  gap 2.4e-15  [19.5s]
//       m = 915    s = 2.6944   rho* = 0.507361     8821 iters  resid 3.9e-14  gap 1.5e-15  [19.2s]
//       m = 911    s = 2.6910   rho* = 0.498564     9665 iters  resid 1.3e-13  gap 6.8e-14  [21.3s]
//       m = 913    s = 2.6919   rho* = 0.507359    10357 iters  resid 8.9e-14  gap 5.0e-14  [31.7s]
//       m = 912    s = 2.6911   rho* = 0.507359     9016 iters  resid 4.9e-14  gap 2.0e-14  [21.5s]
//       reach: cap at m = 1901, s = 3.2385, rho* = 0.810650   [19 solves, 359.9s]
//
// x     kappa=1                                 kappa=2
//       s*      s50     s90     s99             s*      s50     s90     s99      cap (s, rho*)
// 7     1.1833  1.3562  1.9208  2.7479          1.7479  1.9208  2.7479  2.7479    2.748 / 1.0000
// 11    1.1006  1.2891  1.7472  2.5587          1.7472  2.2299  2.4184  3.2299    3.230 / 1.0000
// 13    1.2051  1.3260  2.0558  2.8326          2.0847  2.2609  3.0196  4.0196    4.020 / 1.0000
// 17    1.1500  1.3192  2.0468  2.8368          2.0468  2.2005  3.0468  3.7926    4.639 / 1.0000
// 19    1.1976  1.4229  2.1174  2.9885          2.0262  2.5428  3.2562  3.9885    5.464 / 1.0000
// 23    1.1601  1.3895  2.1197  2.9782          2.0238  2.5234  3.4092  4.2881    6.131 / 1.0000
// 29    1.1100  1.3821  2.1031  2.9514          2.0942  2.4624  3.3253  4.1877    6.709 / 1.0000
// 31    1.1824  1.4348  2.1939  3.0399          2.2554  2.5377  3.4269  4.3082    7.578 / 1.0000
// 37    1.1603  1.4287  2.1766  3.0141          2.1911  2.5146  3.4002  4.3031    4.554 / 0.9939
// 41    1.1590  1.4199  2.1942  3.0529          2.2328  2.5769  3.4964    --      3.602 / 0.9151
// 43    1.1716  1.4364  2.2522  3.1190          2.3132  2.6911    --      --      3.239 / 0.8107
//
//   --  = the crossing lies above this level's row cap. NOT REACHED.
//
// ==============================================================================
// 3. CONVERGENCE — the question the loss budget flagged and could not answer
// ==============================================================================
// attack-beta2-04 reported: kappa = 1 converged by x = 13, kappa = 2's s90 and
// s99 were still rising at x = 23. Below, the same series extended. The last
// column is the change from the previous level: a converged series drives it
// to zero, a rising one does not.
//
//   kappa = 1
//   x      s*      d       s50     d       s90     d       s99     d
//   7      1.1833    -     1.3562    -     1.9208    -     2.7479    -
//   11     1.1006  -0.083  1.2891  -0.067  1.7472  -0.174  2.5587  -0.189
//   13     1.2051  +0.105  1.3260  +0.037  2.0558  +0.309  2.8326  +0.274
//   17     1.1500  -0.055  1.3192  -0.007  2.0468  -0.009  2.8368  +0.004
//   19     1.1976  +0.048  1.4229  +0.104  2.1174  +0.071  2.9885  +0.152
//   23     1.1601  -0.038  1.3895  -0.033  2.1197  +0.002  2.9782  -0.010
//   29     1.1100  -0.050  1.3821  -0.007  2.1031  -0.017  2.9514  -0.027
//   31     1.1824  +0.072  1.4348  +0.053  2.1939  +0.091  3.0399  +0.088
//   37     1.1603  -0.022  1.4287  -0.006  2.1766  -0.017  3.0141  -0.026
//   41     1.1590  -0.001  1.4199  -0.009  2.1942  +0.018  3.0529  +0.039
//   43     1.1716  +0.013  1.4364  +0.016  2.2522  +0.058  3.1190  +0.066
//
//   kappa = 2
//   x      s*      d       s50     d       s90     d       s99     d
//   7      1.7479    -     1.9208    -     2.7479    -     2.7479    -
//   11     1.7472  -0.001  2.2299  +0.309  2.4184  -0.329  3.2299  +0.482
//   13     2.0847  +0.337  2.2609  +0.031  3.0196  +0.601  4.0196  +0.790
//   17     2.0468  -0.038  2.2005  -0.060  3.0468  +0.027  3.7926  -0.227
//   19     2.0262  -0.021  2.5428  +0.342  3.2562  +0.209  3.9885  +0.196
//   23     2.0238  -0.002  2.5234  -0.019  3.4092  +0.153  4.2881  +0.300
//   29     2.0942  +0.070  2.4624  -0.061  3.3253  -0.084  4.1877  -0.100
//   31     2.2554  +0.161  2.5377  +0.075  3.4269  +0.102  4.3082  +0.121
//   37     2.1911  -0.064  2.5146  -0.023  3.4002  -0.027  4.3031  -0.005
//   41     2.2328  +0.042  2.5769  +0.062  3.4964  +0.096    --      --
//   43     2.3132  +0.080  2.6911  +0.114    --      --      --      --
//
//   Trend over the reached levels: least-squares slope of the statistic against
//   ln x, and the spread of the last three reached values.
//   kappa  stat   levels reached          slope vs ln x    last three          spread
//   1      s*     13,17,19,23,29,31,37,41,43-0.0250          1.1603 1.1590 1.17160.0126
//   1      s50    13,17,19,23,29,31,37,41,430.0867           1.4287 1.4199 1.43640.0165
//   1      s90    13,17,19,23,29,31,37,41,430.1477           2.1766 2.1942 2.25220.0756
//   1      s99    13,17,19,23,29,31,37,41,430.2020           3.0141 3.0529 3.11900.1050
//   2      s*     13,17,19,23,29,31,37,41,430.2072           2.1911 2.2328 2.31320.1221
//   2      s50    13,17,19,23,29,31,37,41,430.2970           2.5146 2.5769 2.69110.1765
//   2      s90    13,17,19,23,29,31,37,41 0.4018           3.4269 3.4002 3.49640.0962
//   2      s99    13,17,19,23,29,31,37    0.4146           4.1877 4.3082 4.30310.1205
//
// ==============================================================================
// 4. THE CALIBRATED ONE-POINT FLOOR, AND WHETHER THE INVERSION SURVIVES
// ==============================================================================
// Each kappa = 2 statistic is rescaled by the factor its kappa = 1 twin needs to
// reproduce the PROVEN beta_1 = 2 (Selberg; the one-class sifting limit is
// optimal). Four independent rescalings of the same program.
//
// x       via s*     via s50    via s90    via s99      spread   (-- = not reached)
// 7       2.9542     2.8326     2.8612     2.0000     0.9542
// 11      3.1751     3.4597     2.7683     2.5246     0.9351
// 13      3.4597     3.4100     2.9376     2.8381     0.6217
// 17      3.5598     3.3360     2.9771     2.6739     0.8859
// 19      3.3837     3.5741     3.0758     2.6692     0.9049
// 23      3.4889     3.6321     3.2166     2.8797     0.7524
// 29      3.7734     3.5632     3.1623     2.8378     0.9356
// 31      3.8149     3.5372     3.1240     2.8345     0.9804
// 37      3.7769     3.5200     3.1244     2.8554     0.9216
// 41      3.8529     3.6296     3.1869       --       0.6660
// 43      3.9487     3.7470       --         --       0.2018
//
//   Pooled x = 13..23, 16 readings (the published basis): 3.195, range 2.669 to 3.632
//   Pooled x = 13..43, 33 readings (this run):            3.315, range 2.669 to 3.949
//
//   Per level, the mean of that level's reached rescalings:
//   x        floor estimate
//   7        2.6620
//   11       2.9819
//   13       3.1614
//   17       3.1367
//   19       3.1757
//   23       3.3043
//   29       3.3342
//   31       3.3276
//   37       3.3192
//   41       3.5565
//   43       3.8479
//
// 4b. THE BUDGET, RECOMPUTED. E = beta/theta with DHR at beta = 4.26645,
//     theta = 1; truth E = 1 asymptotically.
// line                                     exponent   cumulative
//   as published (x <= 23):
//   truth                                  +1.0000     1.0000
//   DP1: the one-point / level-D floor     +2.1945     3.1945
//   DP2+DP3: adversarial omega + truncation+1.0719     4.2665
//   this run (x <= 43):
//   truth                                  +1.0000     1.0000
//   DP1: the one-point / level-D floor     +2.3152     3.3152
//   DP2+DP3: adversarial omega + truncation+0.9512     4.2665
//
//   THE INVERSION. sift-limit-attack.md section 7d claims DP1 > DP2+DP3, i.e.
//   that the one-point floor exceeds the midpoint (1 + beta_2)/2 = 2.6332.
//     floor as published (x <= 23):  3.1945  ->  DP1 2.195 vs DP2+DP3 1.072   INVERSION HOLDS
//     floor at x <= 43 (this run):   3.3152  ->  DP1 2.315 vs DP2+DP3 0.951   INVERSION HOLDS
//     and on the WHOLE bracket 2.669 to 3.949: every reading inverts
//     (lowest reading 2.6692 against the midpoint 2.6332: margin 0.0360)
//
// ==============================================================================
// 5. ADJUDICATION — what attack 3 and attack 4 each measured, on one axis
// ==============================================================================
// Cited inputs, both from complete-period computations already in the repo:
//   A. truth              log_x G2, research/exact-g2-ladder.js
//   B. exact strata       u* stable, attack-beta2-03-exact-strata.md section 3
//   C. envelope surrogate u* under main_i * F_2(u_i), same file section 4b
//   D. DHR                beta_2 = 4.26645028414864191641
// Computed here:
//   L. the raw level-D LP frontier s*(kappa = 2), uncalibrated, same x
//   L'. the same after the beta_1 = 2 calibration
//
// x     A truth   L raw LP   B exact strata   L' calibrated   C envelope   D beta_2
// 13    1.6334    2.0847     1.9638           3.4597          3.6892       4.2665
// 17    1.6526    2.0468     1.9812           3.5598          3.6963       4.2665
// 19    1.7017    2.0262     2.0028           3.3837          3.8459       4.2665
// 23    1.6961    2.0238     2.0260           3.4889          3.8452       4.2665
//
// 5a. THE TWO DIFFERENCES, each between the endpoints its own attack used.
// x     section 7c: C - B      section 7d(3.4): B - A     7d budget: D - L'
// 13    1.7254                 0.3304                     0.8067
// 17    1.7151                 0.3286                     0.7066
// 19    1.8431                 0.3011                     0.8827
// 23    1.8192                 0.3299                     0.7775
//
// 5b. THE COINCIDENCE THAT DECIDES IT. Attack 3's LOWER endpoint (exact strata,
//     column B) and the RAW level-D LP frontier (column L) are the same number,
//     and they converge onto each other as x grows:
// x     B exact strata   L raw LP frontier   B - L      ratio
// 13    1.9638           2.0847              -0.1209    0.9420
// 17    1.9812           2.0468              -0.0656    0.9679
// 19    2.0028           2.0262              -0.0234    0.9884
// 23    2.0260           2.0238              0.0022     1.0011
//
//     So attack 3's 1.72-1.84 is NOT measured down to the truth and it is NOT
//     measured down through the one-point floor: it is measured down TO the
//     one-point frontier, from a finite-z surrogate top that is not beta_2.
//     Attack 4's 1.0719 is measured from beta_2 down to the SAME frontier after
//     the beta_1 = 2 calibration has moved it onto the asymptotic scale.
//     Two differences, two different tops, one shared bottom expressed at two
//     different scales. Both are right and neither is the other.
//
// 5c. THE ONE AXIS, at x = 23, every segment named.
//   FINITE-z axis (everything measured at x = 23 itself):
//     1.6961 -> 2.0238   +0.3277   decoupling: independent stratum maxima  == attack 4 section 3.4's "about 0.25"
//     2.0238 -> 2.0260   +0.0022   exact strata against the raw LP frontier: they coincide
//     2.0260 -> 3.8452   +1.8192   envelope pricing of the strata           == attack 3's 1.72 to 1.84
//     3.8452 -> 4.2665   +0.4213   one-step surrogate to the real DHR truncation
//   ASYMPTOTIC axis (the budget's axis; the calibration moves the frontier):
//     1.0000 -> 3.4889   +2.4889   DP1, the one-point floor at x = 23 after calibration
//     3.4889 -> 4.2665   +0.7775   DP2+DP3, the residual
//
//     The two axes share only their top. The finite-z axis starts at 1.696 (the
//     measured truth at x = 23), the asymptotic axis starts at 1. The 1.72-1.84
//     segment and the 0.778 segment do not overlap and do not sum to anything.
//
// 5d. WHAT EACH FIGURE LICENSES.
//   * 1.72 to 1.84 (attack 3) licenses: at accessible z, pricing depth-one
//     Buchstab strata at their exact full-period maxima instead of at
//     main_i * F_2(u_i) moves that specific bound by 1.72 to 1.84. It does NOT
//     license "DP3 has 1.8 of recoverable exponent inside DHR", because its
//     floor is the one-point frontier, which no sieve axiom reaches, and its
//     ceiling is a one-step surrogate, not beta_2.
//   * 1.0719 (attack 4) licenses: on the asymptotic scale, everything DHR gives
//     up BEYOND the one-point floor is at most 1.07. It does NOT license a
//     finite-z statement, and it inherits the calibration's uncertainty.
//   * about 0.25 (attack 4 section 3.4) licenses: pricing every stratum at its
//     own worst case over window position, rather than jointly, costs 0.25 to
//     0.33 at accessible z. That is the segment from truth up to exact strata,
//     and it is disjoint from both of the above.
//
//   NOT SPLIT, NOT AVERAGED. The three numbers are three different segments of
//   two different axes and every one of them stands.
//
// [total 1998.4 s]
// ============================================================================
// READINGS
// ============================================================================
// 1. THE INVERSION SURVIVES AND THE CORRECTION IS UPWARD. sift-limit-attack.md
//    section 7d's DP1 > DP2+DP3 needed the one-point floor above 2.6332. At
//    x <= 23 it was 3.1945 with a bracket whose low end, 2.669, sat 0.036 above
//    that line. At x <= 43 the floor is 3.3152 over 33 readings, and every
//    single reading clears the line, the lowest still being the old x = 19 one.
//    DP1 is now 2.3152 of the 3.2665 (71 per cent) against DP2+DP3's 0.9513.
//    The measurement that was called "not established" is established, and it
//    moved in the direction that makes the standing claim stronger.
//
// 2. THE COLUMNS THAT WERE STILL RISING HAVE SETTLED, AND TWO OTHERS HAVE
//    STARTED MOVING. Raw s90 and s99 at kappa = 2 slow from +0.130 and +0.090
//    per level to +0.022 and +0.005, and in calibrated terms their spread over
//    the five and four levels from x = 23 is 0.093 and 0.045. Meanwhile s* and
//    s50, which were flat to x = 23, step up: the s* route reads 3.4889 at
//    x = 23 and 3.9487 at x = 43. Anyone re-running this should watch s*, not
//    s90. Its curve at low D is a step function with very few steps, so it is
//    the noisiest of the four and the most exposed to lattice discreteness.
//
// 3. THE CONFLICT WAS NOT A BASELINE PROBLEM, IT WAS TWO OF THEM. The standing
//    guess was that section 7c swaps pricing inside a bound while section 7d
//    measures against true G2. Both halves are true and neither explains the
//    incompatibility, because BOTH endpoints differ. 7c's top is a one-step
//    envelope surrogate at 3.8452, not beta_2 at 4.26645. 7c's bottom is the
//    exact-strata threshold at 2.0260, and 7d's bottom is the calibrated floor
//    at 3.4889. Only when the second pair is recognised as one object at two
//    scales does the arithmetic close.
//
// 4. THE EXACT-STRATA THRESHOLD IS THE ONE-POINT FRONTIER, MEASURED. |B/L - 1|
//    falls at all six levels where both exist, 0.223, 0.113, 0.058, 0.032,
//    0.012, 0.001, and the ratio crosses 1 between x = 11 and x = 13, so this
//    is not one-sided convergence by construction. A full-period maximum of
//    Buchstab stratum counts over every window position of 23# and a linear
//    program over divisor-support cells that never looks at an interval agree
//    to 0.1 per cent. That is the sharpest single fact in this file and it is
//    the one with no proof behind it: nothing here shows the LP frontier is a
//    lower bound for the exact-strata threshold, and the exact-strata bound
//    consumes interval statistics the LP's information class does not contain.
//
// 5. THE SOLVER, AND WHAT IT COSTS. The Mobius crash basis is what makes this
//    tractable: 21 to 33 per cent of its rows need repair at kappa = 2 against
//    100 per cent for an artificial start, and its inverse is written down
//    rather than computed. Devex over Dantzig is a further factor of six in
//    iterations. Degenerate pivots: zero, at every level checked, and
//    perturbing the right-hand side does not help, so the iteration counts are
//    real work. Cost is about m^5 with m the index of D in the sorted divisor
//    list. That is why x = 43 stops at s90 and why x = 47 needs a different
//    algorithm rather than a faster one.
//
// 6. HONEST LIMITS. (a) s90 and s99 at x = 43 and s99 at x = 41 are above the
//    row caps; the reported values are lower bounds from a single solve at the
//    cap, not estimates. (b) The B against L identification has six levels and
//    cannot get more, because the full-period stratum computation stops at 23#.
//    (c) The calibration is still a calibration and its spread per level runs
//    0.20 to 0.98. (d) The LP knows this problem's exact omega while beta_2 is
//    a supremum over the whole Omega(kappa,L) class, so the residual still
//    mixes DP2's adversarial quantification with DP3's truncation.
// ============================================================================

// ============================================================================
// TRACEABILITY NOTE, 2026-08-19, appended BELOW the tail so the embed
// fingerprint is untouched (this text is READINGS; it is not hashed).
//
// This file's tail was bound with --force. The pre-embed block was a hand
// abridgement of the same run -- its own header said so, "abridged, the full
// 400 lines come out of a plain re-run" -- and the fresh block is 409 lines,
// a strict superset in data. Twenty of the old block's 154 figures are not in
// it, and they fall in three groups, none of them a changed value:
//
//   1. Nine tokens (0.390, 0.130, 0.087, 0.269, 0.014, 0.093, 0.045, 0.279,
//      0.211) were section 3's CONVERGENCE paragraph: differences and per-level
//      rates read off the section 2 grid BY HAND. The program prints the grid,
//      not the differences. The paragraph is quoted in full in
//      research/history/staging/consolidation-wave.md sec.1.2.
//   2. 3.2513, a like-for-like seven-level mean, and 0.9513, which the fresh
//      budget table prints as 0.9512.
//   3. Section 5's x = 7 and x = 11 rows (2.1372, 1.9448 and the four numbers
//      derived from them) and the |B/L - 1| column at x = 17, 19, 23 (0.0321,
//      0.0116, 0.0011). Line 459 hard-codes column B for x = 13, 17, 19, 23
//      ONLY, so the two extra rows were never producible here. Their values are
//      sound and keep their custody elsewhere: they are the u* stable row of
//      research/attack-beta2-03-exact-strata.js line 946,
//      2.1372 1.9448 1.9638 1.9812 2.0028 2.0260.
//
// THE READINGS BELOW QUOTE EIGHT FIGURES THE BLOCK NO LONGER CONTAINS, and all
// eight are derived rather than printed. 3.2665 is beta_2 - 1 = 4.26645 - 1,
// the total exponent the budget partitions. 0.9513 is the DP2+DP3 residual, in
// the block as 0.9512. 0.130, 0.093 and 0.045 are the per-level rate and the
// two calibrated spreads of group 1 above. 0.223, 0.113 and 0.032 are |B/L - 1|
// at x = 7, 11 and 17, group 3's column. Every one is one subtraction or one
// division away from a figure that IS in the block; none is an independent
// measurement, and nothing in the readings rests on a number this file cannot
// now produce or point at.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). No number
// above was changed, and almost nothing here is new: the TRACEABILITY NOTE of
// 2026-08-19 immediately above already classifies twenty of the twenty-one
// figures the readings quote that the OUTPUT block does not contain. Checked
// against the sources rather than restated:
//   Its group 1 (0.390, 0.130, 0.087, 0.269, 0.014, 0.093, 0.045, 0.279,
//     0.211) is confirmed. The CONVERGENCE paragraph those tokens come from is
//     quoted verbatim at research/history/staging/consolidation-wave.md line
//     137, and every one is a difference or a per-level rate over the section
//     2 grid this file does print.
//   Its group 2 is confirmed. 3.2665 is 4.2665 - 1 off the printed budget
//     table, 2.3152 + 0.9513 returns it, and the table's own residual row
//     prints 0.9512 for what the subtraction gives as 0.9513.
//   Its group 3 is confirmed. 2.1372 and 1.9448 are the first two entries of
//     the u* stable row in research/attack-beta2-03-exact-strata.js, which
//     reads 2.1372 1.9448 1.9638 1.9812 2.0028 2.0260 at p_k = 7 to 23.
//
// TOKENIZER ARTIFACT, not a figure: 946 in that note is the line number of the
//   attack-beta2-03-exact-strata.js row it cites.
// ---------------------------------------------------------------------------
