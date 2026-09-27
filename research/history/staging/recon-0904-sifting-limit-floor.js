// ============================================================================
// THE LEVEL-D LINEAR PROGRAM ACROSS THE DIMENSION AXIS: IS THE ONE-POINT
// SIFTING THRESHOLD MONOTONE IN kappa, AND DOES ITS CALIBRATION SURVIVE BEING
// SCORED AGAINST THE PUBLISHED DHR VALUES AT kappa = 3 AND kappa = 4?
// (2026-09-04; report in research/history/staging/recon-0904-sifting-limit-floor.md)
// ============================================================================
// WHY. research/sift-limit-attack.md section 7d and research/lp-push-x43.js
// solve the level-D linear program
//
//     min y_empty   s.t.  sum_{S superset of T} y_S = g(T) for every T with
//                         prod T <= D,   y >= 0,   g(T) = prod_{p in T} w(p)/p
//
// whose optimum divided by V(z) = prod (1 - w(p)/p) is rho*(z, D). y_S is the
// density of elements whose prime support below z is exactly S, so a feasible y
// is exactly the "abstract extremal problem" of sieve theory: a non-negative
// assignment of mass to divisor patterns that satisfies every axiom the sieve
// can see at level D and need not be realised by any integer set. rho* = 0 at
// (z, D) therefore says: no argument reading only the divisor-class counts
// |A_d| for d <= D can prove a survivor exists. That is a rigorous barrier for
// that finite information class, and the LP dual of the same program is exactly
// the general lower-bound sieve weight sequence lambda_d supported on d <= D
// (the dual constraint sum_{d | n, d <= D} lambda_d <= [n = 1] is the minorant
// condition, the dual objective sum_d lambda_d w(d)/d is the main term), so
// strong duality says the barrier is tight: the best main term ANY level-D
// lower-bound sieve can carry equals the LP value.
//
// The corpus has run this program at kappa = 1 and kappa = 2 only, and turned
// the pair into a calibrated one-point floor of 3.3152 on the exponent by
// rescaling the kappa = 2 statistics by the factor the kappa = 1 statistics
// need to reproduce the proven beta_1 = 2. That calibration has never been
// scored against anything. This script scores it, on the one axis where an
// independent published answer exists: the DHR sifting limits at kappa = 3 and
// kappa = 4, which Booker and Browning give rigorously as 6.64085945080065843931
// and 9.07224868172113415960 (arXiv:1511.00601 ancillary dhr.html, fetched
// 2026-09-04). Since the DHR sieve itself reads only divisor-class counts, the
// calibrated LP reading at a given kappa MUST NOT EXCEED beta_kappa. That is a
// falsification test the corpus's floor has never had to pass.
//
// It also runs the axis the brief asks about directly: is the threshold
// non-decreasing in kappa? A yes is the LP-class analogue of "beta(kappa) is
// non-decreasing", which is not known in the literature for kappa > 1.
//
// SOLVER. Textbook dense two-phase simplex, deliberately NOT the corpus's
// revised-simplex-with-Mobius-crash-basis, so that the twelve published cells
// of lp-push-x43.js section 1 are a genuine independent control rather than a
// re-run. Bland's rule is switched on after a stall so the degenerate program
// cannot cycle. Every solve prints its primal residual.
//
// COST. About 6 minutes on this machine. n = 2^pi columns with pi = pi(x), so
// x = 23 is 512 columns and 512 rows at the top; nothing here goes above that.
//
//   node research/history/staging/recon-0904-sifting-limit-floor.js
// ============================================================================
'use strict';

const ALLP = [2, 3, 5, 7, 11, 13, 17, 19, 23];
const primesTo = x => ALLP.filter(p => p <= x);
const omega = (p, kappa) => Math.min(kappa, p - 1);
const fmt = (v, d = 4) => (Number.isFinite(v) ? v.toFixed(d) : String(v));
const rule = s => console.log('\n' + '='.repeat(78) + '\n' + s + '\n' + '='.repeat(78));

// Booker-Browning rigorous truncations, arXiv:1511.00601 ancillary dhr.html,
// text layer fetched with curl 2026-09-04. beta_1 = 2 is Selberg's, proven.
const DHR = { 1: 2, 2: 4.26645028414864191641, 3: 6.64085945080065843931, 4: 9.07224868172113415960 };

// The twelve published raw s* cells of research/lp-push-x43.js section 1.
const PUBLISHED = {
  '7|1': 1.1833, '7|2': 1.7479, '11|1': 1.1006, '11|2': 1.7472,
  '13|1': 1.2051, '13|2': 2.0847, '17|1': 1.1500, '17|2': 2.0468,
  '19|1': 1.1976, '19|2': 2.0262, '23|1': 1.1601, '23|2': 2.0238,
};

// ---------------------------------------------------------------------------
// The program's data: subsets of the sifting primes, ordered by product.
// ---------------------------------------------------------------------------
function build(ps, kappa) {
  const pi = ps.length, n = 1 << pi;
  const prod = new Float64Array(n), g = new Float64Array(n), pc = new Uint8Array(n);
  for (let S = 0; S < n; S++) {
    let pr = 1, gg = 1, c = 0;
    for (let i = 0; i < pi; i++) if (S & (1 << i)) { pr *= ps[i]; gg *= omega(ps[i], kappa) / ps[i]; c++; }
    prod[S] = pr; g[S] = gg; pc[S] = c;
  }
  const ord = Array.from({ length: n }, (_, S) => S).sort((a, b) => prod[a] - prod[b]);
  let V = 1; for (const p of ps) V *= 1 - omega(p, kappa) / p;
  return { pi, n, prod, g, pc, ord, V };
}

// ---------------------------------------------------------------------------
// Dense two-phase simplex on  min c.y  s.t.  Ay = b, y >= 0,
// A[i][S] = [T_i subset of S], b_i = g(T_i), c = e_empty.
// Returns { rho, value, resid, iters, y } with y the optimal primal point.
// ---------------------------------------------------------------------------
function levelLP(D, ctx, opt = {}) {
  const { n, prod, g, ord, V } = ctx;
  const Tof = [];
  for (const S of ord) if (prod[S] <= D + 1e-9) Tof.push(S);
  const m = Tof.length;
  // Two closed-form ends, asserted rather than solved.
  if (m === n) return { rho: 1, value: V, m, resid: 0, iters: 0, closed: 'mobius', y: null };
  if (m <= 1) return { rho: 0, value: 0, m, resid: 0, iters: 0, closed: 'trivial', y: null };

  const W = n + m;                    // structural columns then artificials
  const A = new Float64Array(m * (W + 1));
  const row = i => i * (W + 1);
  for (let i = 0; i < m; i++) {
    const T = Tof[i], base = row(i);
    for (let S = 0; S < n; S++) if ((S & T) === T) A[base + S] = 1;
    A[base + n + i] = 1;
    A[base + W] = g[T];
  }
  const basis = new Int32Array(m); for (let i = 0; i < m; i++) basis[i] = n + i;
  const obj = new Float64Array(W + 1);
  const TOL = 1e-10;
  let iters = 0, bland = !!opt.bland0;

  const pivot = (r, q) => {
    const base = row(r), piv = A[base + q];
    for (let j = 0; j <= W; j++) A[base + j] /= piv;
    for (let i = 0; i < m; i++) {
      if (i === r) continue;
      const bi = row(i), f = A[bi + q];
      if (f === 0) continue;
      for (let j = 0; j <= W; j++) A[bi + j] -= f * A[base + j];
    }
    const f = obj[q];
    if (f !== 0) for (let j = 0; j <= W; j++) obj[j] -= f * A[base + j];
    basis[r] = q;
  };

  const run = (cost, allow) => {
    obj.fill(0);
    // obj[j] = c_j - c_B^T B^{-1} A_j, computed from the current tableau.
    for (let j = 0; j <= W; j++) obj[j] = j < W ? cost(j) : 0;
    for (let i = 0; i < m; i++) {
      const cb = cost(basis[i]);
      if (cb === 0) continue;
      const bi = row(i);
      for (let j = 0; j <= W; j++) obj[j] -= cb * A[bi + j];
    }
    let stall = 0, lastVal = Infinity;
    for (; ;) {
      let q = -1, best = -TOL;
      for (let j = 0; j < W; j++) {
        if (!allow(j)) continue;
        if (obj[j] < best) { best = obj[j]; q = j; if (bland) break; }
      }
      if (q < 0) return true;
      let r = -1, bestR = Infinity;
      for (let i = 0; i < m; i++) {
        const a = A[row(i) + q];
        if (a > 1e-11) {
          const t = A[row(i) + W] / a;
          if (t < bestR - 1e-12 || (Math.abs(t - bestR) <= 1e-12 && r >= 0 && basis[i] < basis[r])) { bestR = t; r = i; }
        }
      }
      if (r < 0) return false;                       // unbounded: cannot happen here
      pivot(r, q);
      if (++iters > (opt.maxIters || 400000)) return false;
      const val = -obj[W];
      if (Math.abs(val - lastVal) < 1e-13) { if (++stall > 40) bland = true; } else { stall = 0; }
      lastVal = val;
    }
  };

  // Phase 1.
  const ok1 = run(j => (j >= n ? 1 : 0), () => true);
  const infeas = -obj[W];
  if (!ok1 || infeas > 1e-8) return { rho: NaN, value: NaN, m, resid: NaN, iters, fail: 'phase1 ' + infeas, y: null };
  // Drive any artificial still basic at zero out of the basis.
  for (let i = 0; i < m; i++) {
    if (basis[i] < n) continue;
    let q = -1;
    for (let j = 0; j < n; j++) if (Math.abs(A[row(i) + j]) > 1e-9) { q = j; break; }
    if (q >= 0) pivot(i, q); // redundant row otherwise; leaving it is harmless
  }
  // Phase 2.
  bland = !!opt.bland0;
  const ok2 = run(j => (j === 0 ? 1 : 0), j => j < n);
  const value = -obj[W];
  // Primal point and residual.
  const y = new Float64Array(n);
  for (let i = 0; i < m; i++) if (basis[i] < n) y[basis[i]] = A[row(i) + W];
  let resid = 0;
  for (let i = 0; i < m; i++) {
    const T = Tof[i]; let s = 0;
    for (let S = 0; S < n; S++) if ((S & T) === T) s += y[S];
    resid = Math.max(resid, Math.abs(s - g[T]));
  }
  return { rho: value / V, value, m, resid, iters, ok: ok2, y, Tof };
}

// ---------------------------------------------------------------------------
// Thresholds. rho* is non-decreasing in the row count m (more constraints, a
// smaller feasible set), so a binary search on m is valid. s = ln D / ln z with
// D the m-th smallest divisor and z = x, which is lp-push-x43.js's convention
// (checked against its x = 29, m = 1024, s = 6.7088 cell).
// ---------------------------------------------------------------------------
function thresholds(x, kappa, levels, cache) {
  const ps = primesTo(x), ctx = build(ps, kappa), lnz = Math.log(x);
  const rhoAt = m => {
    const key = x + '|' + kappa + '|' + m;
    if (cache.has(key)) return cache.get(key);
    let r = levelLP(ctx.prod[ctx.ord[m - 1]], ctx, {});
    if (!Number.isFinite(r.rho) || r.ok === false) {          // retry under Bland from the start
      r = levelLP(ctx.prod[ctx.ord[m - 1]], ctx, { bland0: true, maxIters: 800000 });
    }
    if (!Number.isFinite(r.rho) || r.ok === false) {
      FAILURES.push(`x=${x} kappa=${kappa} m=${m}: ${r.fail || 'phase2 stall'} (iters ${r.iters})`);
    }
    cache.set(key, r);
    return r;
  };
  const out = {};
  for (const lv of levels) {
    let lo = 1, hi = ctx.n;                     // rho(1) = 0, rho(n) = 1 > lv
    if (rhoAt(1).rho > lv) { out[lv] = 0; continue; }
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      const r = rhoAt(mid);
      if (!(r.rho > lv + 1e-9)) lo = mid; else hi = mid;
    }
    out[lv] = Math.log(ctx.prod[ctx.ord[hi - 1]]) / lnz;
  }
  out._ctx = ctx; out._rhoAt = rhoAt;
  return out;
}

// ============================================================================
const t0 = Date.now();
const CACHE = new Map();
const FAILURES = [];

rule('1. CONTROL: the independent solver against the twelve published raw s* cells');
console.log('research/lp-push-x43.js section 1, kappa = 1 and 2, x = 7..23. The two');
console.log('solvers share no code: that one is a revised simplex on a Mobius crash');
console.log('basis, this one a dense two-phase tableau from an artificial basis.');
console.log('');
console.log('  x   kappa   published s*   this script   |diff|');
let worst = 0;
for (const x of [7, 11, 13, 17, 19, 23]) {
  for (const k of [1, 2]) {
    const th = thresholds(x, k, [0], CACHE);
    const mine = th[0], pub = PUBLISHED[x + '|' + k], d = Math.abs(mine - pub);
    worst = Math.max(worst, d);
    console.log(`  ${String(x).padStart(2)}    ${k}      ${fmt(pub)}         ${fmt(mine)}      ${d.toExponential(1)}  ${d < 5e-4 ? 'MATCH' : 'MISS'}`);
  }
}
console.log(`\n  worst disagreement over the twelve cells: ${worst.toExponential(2)}`);

rule('2. THE DIMENSION AXIS: is the raw one-point threshold monotone in kappa?');
console.log('s*(x, kappa) = the smallest s = ln D / ln x at which the level-D LP value');
console.log('rises off zero, i.e. the smallest level at which a phantom measure with');
console.log('zero sifted mass stops existing. Below it, no argument reading only the');
console.log('divisor-class counts can prove a survivor. w(p) = min(kappa, p-1).');
console.log('');
const KAPPAS = [0.5, 1, 1.5, 2, 3, 4];
const XS = [11, 13, 17, 19, 23];
const S0 = {};
console.log('   x  ' + KAPPAS.map(k => ('k=' + k).padStart(9)).join(''));
for (const x of XS) {
  const rowv = [];
  for (const k of KAPPAS) rowv.push(thresholds(x, k, [0], CACHE)[0]);
  S0[x] = rowv;
  console.log('  ' + String(x).padStart(2) + '  ' + rowv.map(v => fmt(v).padStart(9)).join(''));
}
let inversions = 0, ties = 0;
for (const x of XS) for (let i = 1; i < KAPPAS.length; i++) {
  const d = S0[x][i] - S0[x][i - 1];
  if (d < -1e-9) { inversions++; console.log(`  INVERSION at x = ${x}: s*(${KAPPAS[i]}) - s*(${KAPPAS[i - 1]}) = ${fmt(d, 6)}`); }
  else if (Math.abs(d) <= 1e-9) { ties++; console.log(`  TIE at x = ${x}: s*(${KAPPAS[i]}) = s*(${KAPPAS[i - 1]}) = ${fmt(S0[x][i], 6)}`); }
}
console.log(`\n  strict increases ${XS.length * (KAPPAS.length - 1) - inversions - ties} of ${XS.length * (KAPPAS.length - 1)}; inversions ${inversions}; ties ${ties}`);

rule('3. THE CALIBRATION, SCORED AGAINST THE PUBLISHED DHR VALUES AT kappa = 3, 4');
console.log('The corpus turns the raw threshold into an exponent by rescaling so that');
console.log('the kappa = 1 column reproduces the proven beta_1 = 2. Applied at kappa,');
console.log('the reading is  2 * s*(x, kappa) / s*(x, 1). The DHR sieve reads only');
console.log('divisor-class counts, so it sits inside this LP information class, so the');
console.log('reading MUST NOT EXCEED beta_kappa. Booker-Browning, arXiv:1511.00601.');
console.log('');
console.log('   x   ' + [2, 3, 4].map(k => ('kappa=' + k).padStart(11)).join('') + '     verdicts');
const CAL = {};
for (const x of XS) {
  const one = S0[x][KAPPAS.indexOf(1)];
  const cells = [2, 3, 4].map(k => 2 * S0[x][KAPPAS.indexOf(k)] / one);
  CAL[x] = cells;
  const verd = [2, 3, 4].map((k, i) => (cells[i] <= DHR[k] + 1e-9 ? 'ok' : 'OVER')).join(' ');
  console.log('  ' + String(x).padStart(2) + '   ' + cells.map(v => fmt(v).padStart(11)).join('') + '     ' + verd);
}
console.log('  ' + '-'.repeat(60));
console.log('  DHR   ' + [2, 3, 4].map(k => fmt(DHR[k]).padStart(11)).join(''));
const over = [];
for (const x of XS) [2, 3, 4].forEach((k, i) => { if (CAL[x][i] > DHR[k] + 1e-9) over.push(`x=${x} kappa=${k}: ${fmt(CAL[x][i])} > ${fmt(DHR[k])}`); });
console.log(`\n  readings above their own DHR value: ${over.length} of ${XS.length * 3}`);
for (const o of over) console.log('    ' + o);
console.log('\n  ratio reading/DHR, the headroom the calibration claims:');
console.log('   x   ' + [2, 3, 4].map(k => ('kappa=' + k).padStart(11)).join(''));
for (const x of XS) console.log('  ' + String(x).padStart(2) + '   ' + [2, 3, 4].map((k, i) => fmt(CAL[x][i] / DHR[k]).padStart(11)).join(''));

rule('4. THE SAME CALIBRATION ON s50 AND s90, AND THE x = 23 REPRODUCTION');
console.log('lp-push-x43.md section 3 prints the calibrated kappa = 2 reading via s* at');
console.log('x = 23 as 3.4889. Same quantity, independent code.');
console.log('');
console.log('   x   route     kappa=2      kappa=3      kappa=4    over DHR?');
for (const x of [19, 23]) {
  for (const lv of [0, 0.5, 0.9]) {
    const name = lv === 0 ? 's*' : lv === 0.5 ? 's50' : 's90';
    const base = thresholds(x, 1, [lv], CACHE)[lv];
    const cells = [2, 3, 4].map(k => 2 * thresholds(x, k, [lv], CACHE)[lv] / base);
    const verd = [2, 3, 4].map((k, i) => (cells[i] <= DHR[k] + 1e-9 ? 'ok' : 'OVER')).join(' ');
    console.log('  ' + String(x).padStart(2) + '   ' + name.padEnd(6) + cells.map(v => fmt(v).padStart(12)).join('') + '    ' + verd);
  }
}

rule('5. ONE PHANTOM WRITTEN OUT: the abstract extremal problem at kappa = 2');
console.log('The barrier is not an abstraction. At x = 7, kappa = 2, below the threshold');
console.log('the LP returns an explicit non-negative measure on divisor patterns that');
console.log('matches every axiom the sieve can read at that level and carries ZERO mass');
console.log('on the empty pattern. No integer set need realise it; that is exactly the');
console.log('point, and it is why the LP bounds the METHOD and not the truth.');
console.log('');
{
  const ps = primesTo(7), ctx = build(ps, 2);
  const th = thresholds(7, 2, [0], CACHE);
  const mstar = ctx.ord.findIndex(S => Math.log(ctx.prod[S]) / Math.log(7) >= th[0] - 1e-12) + 1;
  const mbar = mstar - 1;
  const r = levelLP(ctx.prod[ctx.ord[mbar - 1]], ctx, {});
  console.log(`  sifting primes ${ps.join(', ')}, w = ${ps.map(p => omega(p, 2)).join(', ')}, V(z) = ${fmt(ctx.V, 6)}`);
  console.log(`  level D = ${ctx.prod[ctx.ord[mbar - 1]]}  (m = ${mbar} constraints), s = ${fmt(Math.log(ctx.prod[ctx.ord[mbar - 1]]) / Math.log(7))}`);
  console.log(`  LP value ${fmt(r.value, 12)}   rho* ${fmt(r.rho, 12)}   primal residual ${r.resid.toExponential(1)}`);
  console.log('  the phantom, as mass on the divisor pattern with that product:');
  const idx = Array.from({ length: ctx.n }, (_, S) => S).filter(S => r.y && r.y[S] > 1e-12).sort((a, b) => ctx.prod[a] - ctx.prod[b]);
  let tot = 0;
  for (const S of idx) { tot += r.y[S]; console.log(`      pattern ${String(ctx.prod[S]).padStart(4)}   mass ${fmt(r.y[S], 8)}`); }
  console.log(`  total mass ${fmt(tot, 10)} (must be 1), mass on the empty pattern ${fmt(r.y ? r.y[0] : NaN, 12)}`);
  console.log(`  the same LP one constraint higher (m = ${mstar}) has value ${fmt(levelLP(ctx.prod[ctx.ord[mstar - 1]], ctx, {}).value, 12)}`);
}

rule('6. REACH AND COST');
console.log(`  distinct LP solves: ${CACHE.size}`);
let worstResid = 0, worstIters = 0;
for (const r of CACHE.values()) { if (Number.isFinite(r.resid)) worstResid = Math.max(worstResid, r.resid); worstIters = Math.max(worstIters, r.iters); }
console.log(`  worst primal residual over all solves: ${worstResid.toExponential(2)}`);
console.log(`  worst iteration count: ${worstIters}`);
console.log(`  solves that failed to certify (reported, not silently read as zero): ${FAILURES.length}`);
for (const f of FAILURES) console.log('    ' + f);
console.log(`  elapsed: ${fmt((Date.now() - t0) / 1000, 1)} s`);
console.log('');
console.log('  NOT REACHED, stated: x stops at 23 (512 columns) because the dense');
console.log('  tableau is the price of independence from the corpus solver; the');
console.log('  corpus reaches 43. kappa is capped at 4 because beta_5 upward would');
console.log('  need larger x to have any room below the primorial. Non-integer kappa');
console.log('  has no integer set realising it and is a probe of the LP class only.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/recon-0904-sifting-limit-floor.js
//   invocation:  node research/history/staging/recon-0904-sifting-limit-floor.js
//   code-sha256: f54e09658c4da41a92af52c47d83f336dc2dca720eff33a59b8c58a08107244b
//   out-sha256:  397e70752c82afd24dc7aa5a41f36b2a669b73fcad43e90b2bb0fc16d49c75d2
//   body-lines:  123
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-04
//   elapsed:     458.4 s
// ============================================================================
//
// ==============================================================================
// 1. CONTROL: the independent solver against the twelve published raw s* cells
// ==============================================================================
// research/lp-push-x43.js section 1, kappa = 1 and 2, x = 7..23. The two
// solvers share no code: that one is a revised simplex on a Mobius crash
// basis, this one a dense two-phase tableau from an artificial basis.
//
//   x   kappa   published s*   this script   |diff|
//    7    1      1.1833         1.1833      5.3e-6  MATCH
//    7    2      1.7479         1.7479      3.0e-5  MATCH
//   11    1      1.1006         1.1006      2.8e-5  MATCH
//   11    2      1.7472         1.7472      2.2e-5  MATCH
//   13    1      1.2051         1.2051      8.6e-6  MATCH
//   13    2      2.0847         2.0847      1.7e-5  MATCH
//   17    1      1.1500         1.1500      3.5e-5  MATCH
//   17    2      2.0468         2.0468      2.5e-5  MATCH
//   19    1      1.1976         1.1976      3.4e-5  MATCH
//   19    2      2.0262         2.0262      4.2e-5  MATCH
//   23    1      1.1601         1.1601      3.2e-5  MATCH
//   23    2      2.0238         2.0238      7.4e-6  MATCH
//
//   worst disagreement over the twelve cells: 4.23e-5
//
// ==============================================================================
// 2. THE DIMENSION AXIS: is the raw one-point threshold monotone in kappa?
// ==============================================================================
// s*(x, kappa) = the smallest s = ln D / ln x at which the level-D LP value
// rises off zero, i.e. the smallest level at which a phantom measure with
// zero sifted mass stops existing. Below it, no argument reading only the
// divisor-class counts can prove a survivor. w(p) = min(kappa, p-1).
//
//    x      k=0.5      k=1    k=1.5      k=2      k=3      k=4
//   11     1.0000   1.1006   1.5587   1.7472   2.2299   2.4184
//   13     1.0000   1.2051   1.6334   2.0847   2.3260   3.0196
//   17     1.0000   1.1500   1.5377   2.0468   2.7336   2.8873
//   19     1.0000   1.1976   1.6085   2.0262   2.7782   3.5926
//   23     1.0000   1.1601   1.5714   2.0238   2.7053   3.4701
//
//   strict increases 25 of 25; inversions 0; ties 0
//
// ==============================================================================
// 3. THE CALIBRATION, SCORED AGAINST THE PUBLISHED DHR VALUES AT kappa = 3, 4
// ==============================================================================
// The corpus turns the raw threshold into an exponent by rescaling so that
// the kappa = 1 column reproduces the proven beta_1 = 2. Applied at kappa,
// the reading is  2 * s*(x, kappa) / s*(x, 1). The DHR sieve reads only
// divisor-class counts, so it sits inside this LP information class, so the
// reading MUST NOT EXCEED beta_kappa. Booker-Browning, arXiv:1511.00601.
//
//    x       kappa=2    kappa=3    kappa=4     verdicts
//   11        3.1751     4.0523     4.3948     ok ok ok
//   13        3.4597     3.8603     5.0113     ok ok ok
//   17        3.5598     4.7543     5.0215     ok ok ok
//   19        3.3837     4.6395     5.9995     ok ok ok
//   23        3.4889     4.6639     5.9823     ok ok ok
//   ------------------------------------------------------------
//   DHR        4.2665     6.6409     9.0722
//
//   readings above their own DHR value: 0 of 15
//
//   ratio reading/DHR, the headroom the calibration claims:
//    x       kappa=2    kappa=3    kappa=4
//   11        0.7442     0.6102     0.4844
//   13        0.8109     0.5813     0.5524
//   17        0.8344     0.7159     0.5535
//   19        0.7931     0.6986     0.6613
//   23        0.8178     0.7023     0.6594
//
// ==============================================================================
// 4. THE SAME CALIBRATION ON s50 AND s90, AND THE x = 23 REPRODUCTION
// ==============================================================================
// lp-push-x43.md section 3 prints the calibrated kappa = 2 reading via s* at
// x = 23 as 3.4889. Same quantity, independent code.
//
//    x   route     kappa=2      kappa=3      kappa=4    over DHR?
//   19   s*          3.3837      4.6395      5.9995    ok ok ok
//   19   s50         3.5741      4.7719      5.1028    ok ok ok
//   19   s90         3.0758      3.6278      4.2520    ok ok ok
//   23   s*          3.4889      4.6639      5.9823    ok ok ok
//   23   s50         3.6321      4.9071      6.0335    ok ok ok
//   23   s90         3.2166      4.0459      4.2911    ok ok ok
//
// ==============================================================================
// 5. ONE PHANTOM WRITTEN OUT: the abstract extremal problem at kappa = 2
// ==============================================================================
// The barrier is not an abstraction. At x = 7, kappa = 2, below the threshold
// the LP returns an explicit non-negative measure on divisor patterns that
// matches every axiom the sieve can read at that level and carries ZERO mass
// on the empty pattern. No integer set need realise it; that is exactly the
// point, and it is why the LP bounds the METHOD and not the truth.
//
//   sifting primes 2, 3, 5, 7, w = 1, 2, 2, 2, V(z) = 0.071429
//   level D = 21  (m = 10 constraints), s = 1.5646
//   LP value 0.000000000000   rho* 0.000000000000   primal residual 1.1e-16
//   the phantom, as mass on the divisor pattern with that product:
//       pattern    2   mass 0.10476190
//       pattern    3   mass 0.24523810
//       pattern    5   mass 0.11190476
//       pattern    6   mass 0.15476190
//       pattern    7   mass 0.05476190
//       pattern   10   mass 0.02142857
//       pattern   14   mass 0.04047619
//       pattern   30   mass 0.07619048
//       pattern  105   mass 0.08809524
//       pattern  210   mass 0.10238095
//   total mass 1.0000000000 (must be 1), mass on the empty pattern 0.000000000000
//   the same LP one constraint higher (m = 11) has value 0.004761904762
//
// ==============================================================================
// 6. REACH AND COST
// ==============================================================================
//   distinct LP solves: 343
//   worst primal residual over all solves: 1.51e-14
//   worst iteration count: 24010
//   solves that failed to certify (reported, not silently read as zero): 0
//   elapsed: 458.4 s
//
//   NOT REACHED, stated: x stops at 23 (512 columns) because the dense
//   tableau is the price of independence from the corpus solver; the
//   corpus reaches 43. kappa is capped at 4 because beta_5 upward would
//   need larger x to have any room below the primorial. Non-integer kappa
//   has no integer set realising it and is a probe of the LP class only.
// ============================================================================
// READINGS
// ============================================================
