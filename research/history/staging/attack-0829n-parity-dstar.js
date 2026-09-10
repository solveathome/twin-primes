// ============================================================================
// ATTACK 0829n PARITY D* — DOES THE KILLING LEVEL OF THE EXACT-DATA PARITY
// ADVERSARY HAVE A LAW IN Q?  A PRE-REGISTERED EXTENSION OF
// attack-parity-adversary-01.js PAST Q = 200, WITH THE INDEPENDENT-THINNING
// NULL OF measure-roughpair-null-0829.js AS THE CONTROL.
// ============================================================================
// THE OBJECT (unchanged from attack-parity-adversary-01.js SEC 2, restated so
// this file stands alone).  Anchor Q prime >= 7, Q' the next prime, stretch
// S_Q = [Q^2, Q'^2), channel positions a in S_Q with a = 11, 17, 29 (mod 30)
// and a + 2 < Q'^2.  C = #channel, T = #twins.  sig(a) = { p in [7, Q] :
// p | a(a+2) }; by finality sig(a) = {} iff a is a twin.  A level-D sieve
// reads |A_d| = #{ a : d | a(a+2) } for squarefree d | P(Q), d <= D.
//
// MODEL A, exact data: nu(a) >= 0 on channel positions with
//   sum_{a in A_d} nu(a) = |A_d| for every d with 1 < d <= D and |A_d| > 0,
//   sum_a nu(a) = C   (the census row).
//   m*(D) = min twin mass over that polytope = max(0, C - max sum_{non-twin} nu).
// By LP duality m*(D) is the best lower bound on T any level-D linear
// certificate can give, and m*(D) = 0 is exactly "a twin-free adversary
// matching the level-D data exists".  Twins all share one column (their only
// divisor is d = 1), so the LP runs over non-twin SIGNATURE CLASSES.
//
//   D*(Q) = the least d in the sorted list of moduli d (squarefree, d | P(Q),
//           |A_d| > 0, d <= Q^2) with m*(d) >= 1.
//
// That is the definition the 43 anchors Q <= 200 were read under, and SEC 1
// below must reproduce every one of those D* values, and the m* columns, digit
// for digit, before any new anchor prints.  The old engine was an exact
// rational simplex (BigInt, Bland).  This engine is a floating-point dense
// simplex with a presolve; it is NOT exact, which is why the custody gate is
// digit-exact on 43 anchors x 4 columns, and why the D* bisection reports the
// margin |m* - 1| at the two moduli that bracket D* (SEC 2), so a reader can see
// how far any reading sits from the threshold.
//
// THE QUESTION.  attack-parity-adversary.md read ln D*/ln Q = 1.181 as a MEAN
// over 43 anchors and refused to call it a law, because the ratio trends up
// across the range (0.812 at Q = 11, 1.414 at Q = 199).  This file asks whether
// D* ~ Q^c holds on the next decades with a stable c, and against what null.
// Pre-registration lives in the staging note of the same basename and was
// sealed there before SEC 2 existed in this file (the note quotes the SEC 1
// embed's out-sha256 as the seal).
//
// THE NULL (N-thin, measure-roughpair-null-0829.js SEC 2, restated): for each
// channel position a, independently, and for each active prime p in [7, Q]
// independently, p kills a with probability 1/p, kills a+2 with probability
// 1/p, kills neither with probability 1 - 2/p.  So p in sig_null(a) with
// probability exactly 2/p, all positions and all primes independent.  Same
// window, same channel ground set, same C; T_null is whatever the draw gives.
// Same xorshift32 generator as that producer (mkRng), seed printed.
//
// WHAT THIS IS NOT.  Nothing here is a proof ingredient; attack-parity-
// adversary.md section 7 shows m*(D) >= 1 uniformly in Q IS the Zone
// Postulate.  This is a measurement of a diagnostic's scale law.
// ============================================================================
'use strict';
const T0 = Date.now();
const ARGS = process.argv.slice(2);
const argOf = (n, d) => { const i = ARGS.indexOf('--' + n); return i === -1 ? d : ARGS[i + 1]; };
const STAGE = argOf('stage', 'all');           // 'A' = custody only (development), 'all' = everything
const SEED = 20260829;

let failures = 0;
function assertEq(tag, got, want) {
  if (got !== want) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; }
  return true;
}
const f2 = (x) => x.toFixed(2), f3 = (x) => x.toFixed(3), f4 = (x) => x.toFixed(4);
const log = (s) => console.log(s);
const progress = (s) => process.stderr.write(s + '\n');

// ---------------------------------------------------------------- primes ---
const PLIM = 21000;
const flag = new Uint8Array(PLIM + 1); flag[0] = flag[1] = 1;
for (let p = 2; p * p <= PLIM; p++) if (!flag[p]) for (let m = p * p; m <= PLIM; m += p) flag[m] = 1;
const PRIMES = []; for (let n = 2; n <= PLIM; n++) if (!flag[n]) PRIMES.push(n);
const ACT = PRIMES.filter(p => p >= 7);
const isOpen30 = (c) => c === 11 || c === 17 || c === 29;

// ---------------------------------------------------------------- rng ------
// xorshift32, identical to measure-roughpair-null-0829.js mkRng.
function mkRng(seed) { let s = seed >>> 0; if (s === 0) s = 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s + 0.5) / 4294967296; }; }

// ------------------------------------------------------- the stretch -------
// Returns the signature classes of one anchor.  mode 'true': p in sig(a) iff
// p | a(a+2), computed by striding multiples (exact integer arithmetic).
// mode 'null': N-thin, p in sig(a) with probability 2/p independently.
function buildAnchor(Qi, mode, seed) {
  const Q = ACT[Qi], Qp = ACT[Qi + 1], lo = Q * Q, hi = Qp * Qp, nR = Qi + 1;
  const pos = []; for (let a = lo; a + 2 < hi; a++) if (isOpen30(a % 30)) pos.push(a);
  const C = pos.length;
  const sigs = pos.map(() => []);
  if (mode === 'true') {
    const idx = new Map(); pos.forEach((a, k) => idx.set(a, k));
    for (let i = 0; i < nR; i++) {
      const p = ACT[i];
      for (let m = Math.ceil(lo / p) * p; m < hi; m += p) {
        const k1 = idx.get(m); if (k1 !== undefined) sigs[k1].push(p);
        const k2 = idx.get(m - 2); if (k2 !== undefined) { const s = sigs[k2]; if (s[s.length - 1] !== p) s.push(p); }
      }
    }
  } else {
    const rng = mkRng(seed);
    for (let k = 0; k < C; k++) for (let i = 0; i < nR; i++) { const p = ACT[i]; if (rng() < 2 / p) sigs[k].push(p); }
  }
  let T = 0; const byKey = new Map();
  for (let k = 0; k < C; k++) {
    const s = sigs[k];
    if (s.length === 0) { T++; continue; }
    const key = s.join(','); const e = byKey.get(key);
    if (e) e.n++; else byKey.set(key, { primes: s, n: 1 });
  }
  return { Q, Qp, lo, hi, width: hi - lo, C, T, cls: [...byKey.values()], nR };
}

// Divisor rows restricted to d <= Dmax (= Q^2): d -> { cols, rhs = |A_d| }.
// Every d <= Q^2 <= 4.4e8 is an exact double.
function divisorRows(B, Dmax) {
  const m = new Map();
  B.cls.forEach((c, ci) => {
    const pr = c.primes, K = pr.length;
    const rec = (j, d) => {
      if (j === K) { if (d > 1) { let e = m.get(d); if (!e) { e = { cols: [], rhs: 0 }; m.set(d, e); } e.cols.push(ci); e.rhs += c.n; } return; }
      rec(j + 1, d);
      const d2 = d * pr[j]; if (d2 <= Dmax) rec(j + 1, d2);
    };
    rec(0, 1);
  });
  return m;
}
function sortedModuli(rows) { return [...rows.keys()].sort((a, b) => a - b); }
// Rows with identical support impose identical constraints; keep one.
function activeRows(rows, D) {
  const out = [], seen = new Set();
  for (const [d, e] of rows) {
    if (d > D) continue;
    const k = e.cols.join(',');
    if (seen.has(k)) continue;
    seen.add(k); out.push({ cols: e.cols, rhs: e.rhs });
  }
  return out;
}

// ------------------------------------------- dense floating-point simplex ---
// maximise c.x  s.t.  A x = b (b >= 0), x >= 0.  Two-phase, dense tableau in
// one Float64Array, steepest-edge pricing (exact column norms, updated per
// pivot) with a Bland fallback after a run of degenerate pivots.
//
// DRIFT CONTROL.  A dense tableau accumulates rounding error pivot by pivot,
// and the first version of this engine returned m*(D) = 71.136 at a level
// where the exact value is below 1 (a non-monotone reading that the exact
// engine could never produce).  So the tableau is REBUILT from the original
// data and the current basis (fresh Gaussian elimination, partial pivoting)
// every REFAC pivots and at every claimed optimum; a claimed optimum counts
// only if, after the rebuild, every reduced cost is >= -1e-7 and every basic
// value is >= -1e-7.  Otherwise the phase continues from the rebuilt tableau.
//
// `target` (optional): in phase 2 the objective only rises, so once it passes
// `target` (checked on a REBUILT tableau, never on the drifted one) the
// caller's threshold question is answered and the run stops with 'above'.
// Returns { status, value }.
const EPS = 1e-9, OPT_TOL = 1e-7;
let REFAC = 600;
let SIMPLEX_ITERS = 0, SIMPLEX_REBUILDS = 0, DEADLINE = Infinity;
class CapError extends Error {}
function simplexF(A, b, c, m, n, target) {
  const W = n + m + 1;
  let Tb = new Float64Array(m * W);
  const basis = new Int32Array(m); for (let i = 0; i < m; i++) basis[i] = n + i;
  const z = new Float64Array(W);
  const gam = new Float64Array(W);
  const colOf = (j) => {                                  // original column j as a dense m-vector
    const v = new Float64Array(m);
    if (j < n) { for (let i = 0; i < m; i++) if (A[i].includes(j)) v[i] = 1; }
    else if (j < n + m) v[j - n] = 1;
    else for (let i = 0; i < m; i++) v[i] = b[i];
    return v;
  };
  // faster column membership: per-row sets
  const rowSets = A.map(r => new Set(r));
  const colOfFast = (j) => { const v = new Float64Array(m); if (j < n) { for (let i = 0; i < m; i++) if (rowSets[i].has(j)) v[i] = 1; } else if (j < n + m) v[j - n] = 1; else for (let i = 0; i < m; i++) v[i] = b[i]; return v; };
  void colOf;
  // Rebuild the tableau for the current basis: invert the basis matrix by
  // Gauss-Jordan with partial pivoting (O(m^3)), then T = B^-1 [A I b] using
  // the sparsity of A (a class column has one entry per level-D modulus
  // dividing its signature).
  const colRows = []; for (let j = 0; j < n; j++) colRows.push([]);
  for (let i = 0; i < m; i++) for (const j of A[i]) colRows[j].push(i);
  const rebuild = () => {
    SIMPLEX_REBUILDS++;
    const M = new Float64Array(m * 2 * m), M2 = 2 * m;
    for (let k = 0; k < m; k++) { const col = colOfFast(basis[k]); for (let i = 0; i < m; i++) M[i * M2 + k] = col[i]; M[k * M2 + m + k] = 1; }
    for (let k = 0; k < m; k++) {
      let piv = k, best = Math.abs(M[k * M2 + k]);
      for (let i = k + 1; i < m; i++) { const v = Math.abs(M[i * M2 + k]); if (v > best) { best = v; piv = i; } }
      if (best < 1e-12) return false;                     // singular basis: caller restarts
      if (piv !== k) { const ko = k * M2, po = piv * M2; for (let j = 0; j < M2; j++) { const t = M[ko + j]; M[ko + j] = M[po + j]; M[po + j] = t; } }
      const ko = k * M2, pv = M[ko + k];
      for (let j = 0; j < M2; j++) M[ko + j] /= pv;
      for (let i = 0; i < m; i++) {
        if (i === k) continue; const io = i * M2, f = M[io + k]; if (f === 0) continue;
        for (let j = k; j < M2; j++) M[io + j] -= f * M[ko + j];
      }
    }
    // Binv[i][l] = M[i*M2 + m + l]
    const Tn = new Float64Array(m * W);
    for (let i = 0; i < m; i++) {
      const io = i * W, bo = i * M2 + m;
      for (let l = 0; l < m; l++) { const v = M[bo + l]; if (v === 0) continue; Tn[io + n + l] = v; for (const j of A[l]) Tn[io + j] += v; Tn[io + W - 1] += v * b[l]; }
    }
    void colRows;
    Tb = Tn;
    for (let j = 0; j < W; j++) { let s = 1; for (let i = 0; i < m; i++) { const v = Tb[i * W + j]; s += v * v; } gam[j] = s; }
    return true;
  };
  const setCosts = (cost) => {                            // z_j = (c_B^T T_j) - c_j, entering when z_j < 0
    for (let j = 0; j < W; j++) z[j] = -(cost[j] || 0);
    for (let i = 0; i < m; i++) { const cb = cost[basis[i]] || 0; if (cb !== 0) { const io = i * W; for (let j = 0; j < W; j++) z[j] += cb * Tb[io + j]; } }
    for (let i = 0; i < m; i++) z[basis[i]] = 0;
  };
  const pivot = (r, cc) => {
    const ro = r * W, pv = Tb[ro + cc];
    const alpha = new Float64Array(W);
    for (let i = 0; i < m; i++) { const io = i * W, v = Tb[io + cc]; if (v === 0) continue; for (let j = 0; j < W; j++) alpha[j] += v * Tb[io + j]; }
    for (let j = 0; j < W; j++) Tb[ro + j] /= pv;
    Tb[ro + cc] = 1;
    const nz = []; for (let j = 0; j < W; j++) if (Tb[ro + j] !== 0) nz.push(j);
    for (let i = 0; i < m; i++) {
      if (i === r) continue; const io = i * W, f = Tb[io + cc]; if (f === 0) continue;
      for (const j of nz) Tb[io + j] -= f * Tb[ro + j];
      Tb[io + cc] = 0;
    }
    const f = z[cc]; if (f !== 0) { for (const j of nz) z[j] -= f * Tb[ro + j]; z[cc] = 0; }
    const ge = gam[cc];
    for (const j of nz) { if (j === cc) continue; const t = Tb[ro + j]; const g = gam[j] - 2 * t * alpha[j] / pv + t * t * ge / (pv * pv); gam[j] = Math.max(g, 1 + t * t); }
    gam[cc] = Math.max(ge / (pv * pv), 1);
    basis[r] = cc;
  };
  const objective = (cost) => { let v = 0; for (let i = 0; i < m; i++) { const cb = cost[basis[i]] || 0; if (cb !== 0) v += cb * Tb[i * W + W - 1]; } return v; };
  // One phase: returns 'opt' | 'unbounded' | 'above' | 'singular'
  const run = (cost, lim, phase2) => {
    let degen = 0, since = 0;
    setCosts(cost);
    while (true) {
      if (++SIMPLEX_ITERS > 50000000) throw new Error('simplex iteration cap');
      if ((SIMPLEX_ITERS & 63) === 0 && Date.now() > DEADLINE) throw new CapError();
      if (since >= REFAC) { if (!rebuild()) return 'singular'; setCosts(cost); since = 0; if (phase2 && target !== undefined && objective(cost) > target) return 'above'; }
      let e = -1;
      if (degen > 200) { for (let j = 0; j < lim; j++) if (z[j] < -EPS) { e = j; break; } }
      else { let best = 0; for (let j = 0; j < lim; j++) { const zj = z[j]; if (zj < -EPS) { const s = zj * zj / gam[j]; if (s > best) { best = s; e = j; } } } }
      if (e < 0) {
        // claimed optimum: verify on a rebuilt tableau
        if (!rebuild()) return 'singular';
        setCosts(cost); since = 0;
        let bad = false;
        for (let j = 0; j < lim; j++) if (z[j] < -OPT_TOL) { bad = true; break; }
        for (let i = 0; i < m && !bad; i++) if (Tb[i * W + W - 1] < -OPT_TOL) return 'infeasible-drift';
        if (!bad) return 'opt';
        continue;
      }
      let r = -1, best = Infinity;
      for (let i = 0; i < m; i++) {
        const a = Tb[i * W + e];
        if (a > 1e-7) { const rt = Tb[i * W + W - 1] / a; if (rt < best - 1e-12 || (Math.abs(rt - best) <= 1e-12 && basis[i] < basis[r])) { best = rt; r = i; } }
      }
      if (r < 0) { for (let i = 0; i < m; i++) if (Tb[i * W + e] > EPS) { r = i; break; } if (r < 0) return 'unbounded'; }
      if (best < 1e-12) degen++; else degen = 0;
      pivot(r, e); since++;
    }
  };
  // phase 1: minimise the artificials = maximise -(sum of artificials)
  const cost1 = new Float64Array(W); for (let j = n; j < n + m; j++) cost1[j] = -1;
  rebuild();
  let st = run(cost1, n + m, false);
  if (st !== 'opt') return { status: st };
  let art = 0; for (let i = 0; i < m; i++) if (basis[i] >= n) art += Tb[i * W + W - 1];
  if (art > 1e-7) return { status: 'infeasible' };
  for (let i = 0; i < m; i++) if (basis[i] >= n) { let e2 = -1; for (let j = 0; j < n; j++) if (Math.abs(Tb[i * W + j]) > 1e-7) { e2 = j; break; } if (e2 >= 0) pivot(i, e2); }
  const cost2 = new Float64Array(W); for (let j = 0; j < n; j++) cost2[j] = c[j];
  st = run(cost2, n, true);
  if (st === 'opt' || st === 'above') return { status: st, value: objective(cost2) };
  return { status: st };
}

// ---- MODEL A: max sum nu over non-twin classes, level-D rows + census ------
// Presolve: rows with one unknown fix it; rows with residual 0 fix all their
// unknowns at 0; repeated to a fixed point (the presolve of the old engine).
function maxMass(B, rows, D, target) {
  const nC = B.cls.length;
  const fixed = new Array(nC).fill(null);
  const act = activeRows(rows, D).map(r => ({ cols: r.cols, rhs: r.rhs, done: false }));
  let changed = true;
  while (changed) {
    changed = false;
    for (const r of act) {
      if (r.done) continue;
      const uc = []; let s = 0;
      for (const c of r.cols) { if (fixed[c] !== null) s += fixed[c]; else uc.push(c); }
      const res = r.rhs - s;
      if (uc.length === 0) { r.done = true; changed = true; if (res !== 0) return { status: 'inconsistent' }; continue; }
      if (res === 0) { for (const c of uc) fixed[c] = 0; r.done = true; changed = true; continue; }
      if (uc.length === 1) { fixed[uc[0]] = res; r.done = true; changed = true; continue; }
      r.uc = uc; r.res = res;
    }
  }
  let base = 0; for (let i = 0; i < nC; i++) if (fixed[i] !== null) base += fixed[i];
  const idx = new Int32Array(nC).fill(-1); let nf = 0;
  for (let i = 0; i < nC; i++) if (fixed[i] === null) idx[i] = nf++;
  const live = act.filter(r => !r.done);
  if (nf === 0) return { status: 'opt', value: base, m: 0, n: 0 };
  if (live.length === 0) return { status: 'unbounded', m: 0, n: nf };
  const A = live.map(r => r.uc.map(c => idx[c]));
  const b = live.map(r => r.res);
  const c = new Float64Array(nf).fill(1);
  let res = simplexF(A, b, c, live.length, nf, target === undefined ? undefined : target - base);
  if (res.status === 'infeasible-drift' || res.status === 'singular') { const keep = REFAC; REFAC = 100; res = simplexF(A, b, c, live.length, nf, target === undefined ? undefined : target - base); REFAC = keep; }
  if (res.status === 'infeasible-drift' || res.status === 'singular') throw new Error('simplex failed twice: ' + res.status);
  if (res.status === 'above') return { status: 'above', value: base + res.value, m: live.length, n: nf };
  if (res.status !== 'opt') return { status: res.status, m: live.length, n: nf };
  return { status: 'opt', value: base + res.value, m: live.length, n: nf };
}
function mStar(B, rows, D) { const r = maxMass(B, rows, D); if (r.status === 'inconsistent') throw new Error('inconsistent LP'); return r.status === 'unbounded' ? 0 : Math.max(0, B.C - r.value); }
// Threshold question only: is m*(D) >= 1 - 1e-6?  Stops the simplex as soon as
// the mass passes C - 1 + 1e-6 (then m* < 1).  Returns { dead, mstar } where
// mstar is exact when dead is true and an upper bound (< 1) otherwise.
function deadAt(B, rows, D) {
  const r = maxMass(B, rows, D, B.C - 1 + 1e-6);
  if (r.status === 'inconsistent') throw new Error('inconsistent LP');
  if (r.status === 'unbounded' || r.status === 'above') return { dead: false, mstar: r.status === 'above' ? Math.max(0, B.C - r.value) : 0 };
  const ms = Math.max(0, B.C - r.value);
  return { dead: ms >= 1 - 1e-6, mstar: ms };
}
// D*: least modulus with m* >= 1 (threshold 1 - 1e-6 for the float engine).
// Search: from the top of the list (D = Q^2, where the LP is small after the
// presolve) halve the level until the adversary is alive, then bisect on the
// index range.  Every level below D* is only asked the threshold question.
// Returns D*, m* at D*, and m* at the modulus just below it (the two margins).
function findDstar(B, rows, ds) {
  if (!ds.length) return { Dstar: null, mAt: 0, mBelow: null, lps: 0 };
  let lps = 0;
  const cache = new Map();
  const at = (i) => { if (!cache.has(i)) { cache.set(i, deadAt(B, rows, ds[i])); lps++; } return cache.get(i); };
  const lastIdx = ds.length - 1;
  if (!at(lastIdx).dead) return { Dstar: null, mAt: at(lastIdx).mstar, mBelow: null, lps };
  // index of the largest modulus <= x
  const idxLE = (x) => { let lo = 0, hi = lastIdx; while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (ds[mid] <= x) lo = mid; else hi = mid - 1; } return lo; };
  let hi = lastIdx, lo = -1, D = ds[lastIdx];
  while (true) {
    D = D / 2;
    if (D < ds[0]) { lo = -1; break; }
    const i = idxLE(D);
    if (i >= hi) { hi = i; continue; }
    if (at(i).dead) { hi = i; continue; }
    lo = i; break;
  }
  // invariant: at(lo) alive (or lo = -1), at(hi) dead
  while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (at(mid).dead) hi = mid; else lo = mid; }
  return { Dstar: ds[hi], mAt: at(hi).mstar, mBelow: lo >= 0 ? at(lo).mstar : null, lps };
}

// ---------------------------------------------------------------- stats ----
function mean(a) { return a.reduce((x, y) => x + y, 0) / a.length; }
// Ordinary least squares y = a + b x; returns b, a, and the standard error of b.
function ols(xs, ys) {
  const n = xs.length, mx = mean(xs), my = mean(ys);
  let sxx = 0, sxy = 0; for (let i = 0; i < n; i++) { sxx += (xs[i] - mx) ** 2; sxy += (xs[i] - mx) * (ys[i] - my); }
  const b = sxy / sxx, a = my - b * mx;
  let sse = 0; for (let i = 0; i < n; i++) sse += (ys[i] - a - b * xs[i]) ** 2;
  const se = Math.sqrt(sse / (n - 2) / sxx);
  return { b, a, se, n, rmse: Math.sqrt(sse / (n - 2)) };
}

// ============================================================================
log('SEC 1 — CUSTODY GATE: REPRODUCE attack-parity-adversary-01.js SEC 2 DIGIT FOR DIGIT');
// ============================================================================
// The 43 anchors Q <= 200: D*, m*(Q), m*(width), m*(Q^2) as that producer's
// embedded OUTPUT prints them, and its three summary lines.  The float engine
// must agree on every one before SEC 2 runs.  D* and m* are integers there at
// every anchor, so "digit for digit" is an integer comparison after rounding
// (the margin from an integer is also printed, as the engine's own honesty).
const OLD = [ // Q, m*(Q), m*(w), m*(Q^2), D*   — attack-parity-adversary-01.js OUTPUT SEC 2
  [7, 4, 4, 4, 7], [11, 2, 2, 2, 7], [13, 7, 7, 7, 13], [17, 1, 1, 2, 11], [19, 4, 4, 4, 19], [23, 3, 8, 8, 19],
  [29, 1, 1, 2, 23], [31, 0, 11, 11, 77], [37, 0, 7, 7, 91], [41, 0, 2, 3, 91], [43, 4, 11, 11, 31], [47, 0, 13, 13, 143],
  [53, 0, 10, 13, 203], [59, 3, 5, 5, 43], [61, 0, 17, 19, 209], [67, 0, 10, 11, 133], [71, 0, 2, 3, 91], [73, 0, 13, 15, 247],
  [79, 0, 11, 14, 161], [83, 0, 11, 14, 451], [89, 0, 17, 21, 517], [97, 0, 13, 15, 209], [101, 4, 7, 7, 77], [103, 0, 8, 10, 377],
  [107, 0, 6, 6, 203], [109, 0, 7, 11, 323], [113, 0, 40, 41, 899], [127, 0, 11, 12, 391], [131, 0, 18, 27, 611], [137, 0, 4, 6, 287],
  [139, 0, 41, 45, 901], [149, 4, 10, 10, 149], [151, 0, 13, 20, 1079], [157, 0, 12, 17, 1309], [163, 0, 20, 21, 427], [167, 0, 17, 23, 1189],
  [173, 0, 16, 25, 949], [179, 5, 13, 13, 179], [181, 0, 37, 49, 1261], [191, 0, 5, 7, 517], [193, 0, 16, 20, 629], [197, 0, 6, 8, 377],
  [199, 0, 41, 52, 1781]];
const custody = [];
{
  let maxDev = 0, nfig = 0;
  log('    Q  width     C    T | m*(Q) m*(w) m*(Q^2) |      D*   D*/w  lnD*/lnQ | max|m*-round|  LP m x n at D*');
  for (const row of OLD) {
    const Qi = ACT.indexOf(row[0]);
    const B = buildAnchor(Qi, 'true', 0);
    const rows = divisorRows(B, B.Q * B.Q), ds = sortedModuli(rows);
    const mQ = mStar(B, rows, B.Q), mW = mStar(B, rows, B.width), mQ2 = mStar(B, rows, B.Q * B.Q);
    const r = findDstar(B, rows, ds);
    const dev = Math.max(Math.abs(mQ - Math.round(mQ)), Math.abs(mW - Math.round(mW)), Math.abs(mQ2 - Math.round(mQ2)));
    maxDev = Math.max(maxDev, dev);
    nfig += 4;
    assertEq(`m*(Q) at Q=${B.Q}`, Math.round(mQ), row[1]);
    assertEq(`m*(w) at Q=${B.Q}`, Math.round(mW), row[2]);
    assertEq(`m*(Q^2) at Q=${B.Q}`, Math.round(mQ2), row[3]);
    assertEq(`D* at Q=${B.Q}`, r.Dstar, row[4]);
    const sz = maxMass(B, rows, r.Dstar);
    const sD = Math.log(r.Dstar) / Math.log(B.Q);
    custody.push({ Q: B.Q, C: B.C, T: B.T, width: B.width, Dstar: r.Dstar, sD });
    log(`  ${String(B.Q).padStart(4)} ${String(B.width).padStart(6)} ${String(B.C).padStart(5)} ${String(B.T).padStart(4)} | ` +
      `${String(Math.round(mQ)).padStart(5)} ${String(Math.round(mW)).padStart(5)} ${String(Math.round(mQ2)).padStart(7)} | ` +
      `${String(r.Dstar).padStart(7)} ${f2(r.Dstar / B.width).padStart(6)} ${f3(sD).padStart(8)} | ${dev.toExponential(1).padStart(12)}  ${String(sz.m).padStart(4)} x ${String(sz.n).padEnd(4)}`);
  }
  const sv = custody.map(r => r.sD);
  log(`  D* exponent ln D*/ln Q over ${sv.length} anchors: min ${f3(Math.min(...sv))}, mean ${f3(mean(sv))}, max ${f3(Math.max(...sv))}`);
  log(`  D*/width: mean ${f3(mean(custody.map(r => r.Dstar / r.width)))}`);
  assertEq('old summary: min 0.812', f3(Math.min(...sv)), '0.812');
  assertEq('old summary: mean 1.181', f3(mean(sv)), '1.181');
  assertEq('old summary: max 1.439', f3(Math.max(...sv)), '1.439');
  assertEq('old summary: D*/width mean 0.321', f3(mean(custody.map(r => r.Dstar / r.width))), '0.321');
  log(`  custody: ${nfig} integer figures compared against the old OUTPUT, ${failures} failures; largest float departure from an integer ${maxDev.toExponential(1)}`);
  // The two exponent estimators on the old range, for the pre-registration.
  const big = custody.filter(r => r.Q >= 31);
  const fitQ = ols(big.map(r => Math.log(r.Q)), big.map(r => Math.log(r.Dstar)));
  const fitT = ols(big.map(r => Math.log(r.T)), big.map(r => Math.log(r.Dstar)));
  const fitW = ols(big.map(r => Math.log(r.width)), big.map(r => Math.log(r.Dstar)));
  log(`  old range, Q >= 31 (n = ${big.length}): through-origin mean ln D*/ln Q = ${f3(mean(big.map(r => r.sD)))}`);
  log(`  old range, Q >= 31: OLS ln D* on ln Q     slope ${f3(fitQ.b)} +- ${f3(fitQ.se)}, intercept ${f3(fitQ.a)}, rmse ${f3(fitQ.rmse)}`);
  log(`  old range, Q >= 31: OLS ln D* on ln T     slope ${f3(fitT.b)} +- ${f3(fitT.se)}, intercept ${f3(fitT.a)}, rmse ${f3(fitT.rmse)}`);
  log(`  old range, Q >= 31: OLS ln D* on ln width slope ${f3(fitW.b)} +- ${f3(fitW.se)}, intercept ${f3(fitW.a)}, rmse ${f3(fitW.rmse)}`);
}
if (failures > 0) { log(`\nCUSTODY GATE FAILED: ${failures} figures disagree with attack-parity-adversary-01.js; nothing new is printed`); process.exitCode = 1; }
else if (STAGE === 'A') { log(`\ncustody only; done in ${((Date.now() - T0) / 1000).toFixed(1)}s`); }
else {

// ============================================================================
log('\nSEC 2 — THE NEW RANGE, TRUE ARITHMETIC AND THE N-THIN NULL (pre-registered in the note before this section existed)');
// ============================================================================
// Decade 1: every prime 200 < Q < 2000 whose stretch has C <= CMAX channel
// positions (the excluded anchors are listed).  Decade 2: 24 log-spaced
// targets t_k = 2000 * 10^(k/24), anchor = first prime >= t_k with C <= CMAX.
// CMAX = 6000 (the note's section 2 sealed 8000 for decade 2 and no cap for
// decade 1; the cap was lowered and extended to decade 1 for compute before
// the run, after the seal, and the note records it as a deviation).
// Null: N-thin at every 3rd decade-1 anchor and every decade-2 anchor, one
// draw, seed SEED + Q.  Per-anchor cap CAP_S seconds (CAP lines are excluded
// from every fit and counted).  --quick runs a thin subset for development.
const QUICK = ARGS.includes('--quick');
const CMAX = 6000, CAP_S = 900;
const SEEN = new Set([211, 401, 601, 809, 1009, 1499, 2003, 5003, 10007]);  // anchors seen while timing the engine, before the seal
const Cof = (Qi) => { let C = 0; for (let a = ACT[Qi] * ACT[Qi]; a + 2 < ACT[Qi + 1] * ACT[Qi + 1]; a++) if (isOpen30(a % 30)) C++; return C; };
const dec1 = [], dec1x = []; for (let Qi = 0; Qi < ACT.length; Qi++) { const Q = ACT[Qi]; if (Q > 200 && Q < 2000) { if (Cof(Qi) <= CMAX) dec1.push(Qi); else dec1x.push(Qi); } }
const dec2 = [];
for (let k = 0; k < 24; k++) {
  const t = 2000 * Math.pow(10, k / 24);
  for (let Qi = 0; Qi < ACT.length - 1; Qi++) {
    const Q = ACT[Qi]; if (Q < t) continue;
    if (Cof(Qi) <= CMAX) { dec2.push(Qi); break; }
  }
}
const run1 = QUICK ? dec1.filter((_, i) => i % 12 === 0) : dec1;
const run2 = QUICK ? dec2.filter((_, i) => i % 8 === 0) : dec2;
log(`  decade 1: ${dec1.length} anchors (Q = ${ACT[dec1[0]]} .. ${ACT[dec1[dec1.length - 1]]}); excluded by C > CMAX: ${dec1x.length} (Q = ${dec1x.map(i => ACT[i] + '(C=' + Cof(i) + ')').join(' ')})`);
log(`  decade 2: ${dec2.length} of 24 targets have an anchor with C <= CMAX; anchors Q = ${dec2.map(i => ACT[i]).join(' ')}`);
log(`  null at every 3rd decade-1 anchor (index 0 mod 3) and every decade-2 anchor; seed ${SEED} + Q; CMAX = ${CMAX}; cap ${CAP_S} s/anchor${QUICK ? '; QUICK subset' : ''}`);
const RES = [];       // { dec, mode, Q, ... }
function oneAnchor(dec, Qi, mode) {
  const t = Date.now();
  DEADLINE = t + CAP_S * 1000;
  const B = buildAnchor(Qi, mode, SEED + ACT[Qi]);
  const rows = divisorRows(B, B.Q * B.Q), ds = sortedModuli(rows);
  let r;
  try { r = findDstar(B, rows, ds); }
  catch (err) { if (err instanceof CapError) { DEADLINE = Infinity; RES.push({ dec, mode, Q: B.Q, cap: true }); log(`  ${mode === 'true' ? 'T' : 'N'}${dec} ${String(B.Q).padStart(6)} ${String(B.Qp - B.Q).padStart(4)} ${String(B.width).padStart(8)} ${String(B.C).padStart(6)} ${String(B.T).padStart(5)} | CAP after ${CAP_S} s`); return; } throw err; }
  DEADLINE = Infinity;
  const secs = (Date.now() - t) / 1000;
  const rec = { dec, mode, Q: B.Q, gap: B.Qp - B.Q, width: B.width, C: B.C, T: B.T, Dstar: r.Dstar, mAt: r.mAt, mBelow: r.mBelow, lps: r.lps, secs, cap: false };
  RES.push(rec);
  progress(`[${((Date.now() - T0) / 60000).toFixed(1)} min] ${mode}${dec} Q=${B.Q} C=${B.C} D*=${r.Dstar} ${secs.toFixed(1)}s`);
  log(`  ${mode === 'true' ? 'T' : 'N'}${dec} ${String(B.Q).padStart(6)} ${String(rec.gap).padStart(4)} ${String(B.width).padStart(8)} ${String(B.C).padStart(6)} ${String(B.T).padStart(5)} | ` +
    (r.Dstar === null ? `  m*(Q^2) = ${f3(r.mAt)} < 1: no D* <= Q^2` :
      `${String(r.Dstar).padStart(9)} ${f3(r.Dstar / B.width).padStart(7)} ${f3(Math.log(r.Dstar) / Math.log(B.Q)).padStart(7)} | ${f3(r.mAt).padStart(8)} ${(r.mBelow === null ? '-' : f3(r.mBelow)).padStart(8)} | ${String(r.lps).padStart(3)}`));
}
log('  tag      Q  gap    width      C     T |        D*   D*/w lnD*/lnQ |   m*(D*) m*(below) | LPs   (wall-clock per anchor goes to stderr: it is not reproducible and must not be in the block)');
run1.forEach((Qi, i) => { oneAnchor(1, Qi, 'true'); if (i % 3 === 0) oneAnchor(1, Qi, 'null'); });
run2.forEach((Qi) => { oneAnchor(2, Qi, 'true'); oneAnchor(2, Qi, 'null'); });
const nCap = RES.filter(r => r.cap).length, nNoD = RES.filter(r => !r.cap && r.Dstar === null).length;
log(`  anchors run: ${RES.length}; CAP: ${nCap}; no D* below Q^2: ${nNoD}`);

// ============================================================================
log('\nSEC 3 — THE ESTIMATORS ON EACH POPULATION, THE SCORE, THE CONTROL');
// ============================================================================
const ok = RES.filter(r => !r.cap && r.Dstar !== null);
const pop = (dec, mode, excludeSeen) => ok.filter(r => (dec === 0 || r.dec === dec) && r.mode === mode && (!excludeSeen || !SEEN.has(r.Q)));
function estimators(rs, field) {
  const val = (r) => field === 'Dstar' ? r.Dstar : field === 'Q2' ? r.Q * r.Q : field === 'width' ? r.width : Math.round(0.35 * r.width);
  const lx = rs.map(r => Math.log(r.Q)), ly = rs.map(r => Math.log(val(r)));
  const c0 = mean(rs.map(r => Math.log(val(r)) / Math.log(r.Q)));
  const fQ = ols(lx, ly), fW = ols(rs.map(r => Math.log(r.width)), ly), fT = ols(rs.map(r => Math.log(Math.max(1, r.T))), ly);
  const rw = rs.map(r => val(r) / r.width).sort((a, b) => a - b), rq = rs.map(r => val(r) / (r.Q * r.Q)).sort((a, b) => a - b);
  const med = (a) => a[Math.floor(a.length / 2)];
  return { n: rs.length, c0, fQ, fW, fT, rwMean: mean(rw), rwMed: med(rw), rqMean: mean(rq), rqMed: med(rq) };
}
function printEst(label, E) {
  if (E.n < 3) { log(`  ${label}: n = ${E.n}, not fitted`); return; }
  log(`  ${label}: n = ${E.n} | c0 = ${f3(E.c0)} | c1 = ${f3(E.fQ.b)} +- ${f3(E.fQ.se)} (icpt ${f3(E.fQ.a)}, rmse ${f3(E.fQ.rmse)}) | c_w = ${f3(E.fW.b)} +- ${f3(E.fW.se)} (rmse ${f3(E.fW.rmse)}) | c_T = ${f3(E.fT.b)} +- ${f3(E.fT.se)} (rmse ${f3(E.fT.rmse)}) | D*/w mean ${f3(E.rwMean)} med ${f3(E.rwMed)} | D*/Q^2 mean ${E.rqMean.toExponential(2)} med ${E.rqMed.toExponential(2)}`);
}
const E1 = estimators(pop(1, 'true', false), 'Dstar'), E1x = estimators(pop(1, 'true', true), 'Dstar');
const E2 = estimators(pop(2, 'true', false), 'Dstar'), E2x = estimators(pop(2, 'true', true), 'Dstar');
const EU = estimators(pop(0, 'true', false), 'Dstar');
const N1 = estimators(pop(1, 'null', false), 'Dstar'), N2 = estimators(pop(2, 'null', false), 'Dstar'), NU = estimators(pop(0, 'null', false), 'Dstar');
const Eold = estimators(custody.filter(r => r.Q >= 31).map(r => ({ Q: r.Q, width: r.width, T: r.T, Dstar: r.Dstar })), 'Dstar');
printEst('old range Q >= 31  true', Eold);
printEst('decade 1           true', E1);
printEst('decade 1 minus SEEN true', E1x);
printEst('decade 2           true', E2);
printEst('decade 2 minus SEEN true', E2x);
printEst('both decades       true', EU);
printEst('decade 1           null', N1);
printEst('decade 2           null', N2);
printEst('both decades       null', NU);
// matched true-vs-null on the anchors that have both
{
  const byQ = new Map(); for (const r of ok) { if (!byQ.has(r.Q)) byQ.set(r.Q, {}); byQ.get(r.Q)[r.mode] = r; }
  const pairs = [...byQ.values()].filter(o => o.true && o.null);
  const mt = estimators(pairs.map(o => o.true), 'Dstar'), mn = estimators(pairs.map(o => o.null), 'Dstar');
  const lower = pairs.filter(o => o.null.Dstar < o.true.Dstar).length, eq = pairs.filter(o => o.null.Dstar === o.true.Dstar).length;
  const lr = pairs.map(o => Math.log(o.null.Dstar / o.true.Dstar));
  log(`  matched anchors (both arms): n = ${pairs.length} | c1 true ${f3(mt.fQ.b)} +- ${f3(mt.fQ.se)}, null ${f3(mn.fQ.b)} +- ${f3(mn.fQ.se)}, |diff| ${f3(Math.abs(mt.fQ.b - mn.fQ.b))} | c0 true ${f3(mt.c0)}, null ${f3(mn.c0)} | D*/w mean true ${f3(mt.rwMean)}, null ${f3(mn.rwMean)}, ratio ${f3(mn.rwMean / mt.rwMean)}`);
  log(`  matched: D*(null) < D*(true) at ${lower} of ${pairs.length} (equal at ${eq}); mean ln(D*null/D*true) = ${f3(mean(lr))}; T_null/T mean ${f3(mean(pairs.map(o => o.null.T / o.true.T)))}`);
  log(`  matched, decade 1 only: n = ${pairs.filter(o => o.true.dec === 1).length}; decade 2 only: n = ${pairs.filter(o => o.true.dec === 2).length}`);
}
// the score
log('  --- score against the pre-registration (bands fixed in the note, section 2) ---');
const inBand = (x, lo, hi) => x >= lo && x <= hi;
const P1 = E1.n >= 10 ? ((E1.fQ.b + E1.fQ.se >= 1.20 && E1.fQ.b - E1.fQ.se <= 1.60) ? 'HIT' : 'MISS') : 'NOT SCORABLE';
log(`  P1 decade-1 c1 = ${f3(E1.fQ.b)} +- ${f3(E1.fQ.se)} vs band [1.20, 1.60] (overlap by 1 SE): ${P1}`);
const P2 = E1.n >= 10 ? ((inBand(E1.c0, 1.20, 1.38) && E1.c0 > 1.181) ? 'HIT' : 'MISS') : 'NOT SCORABLE';
log(`  P2 decade-1 c0 = ${f3(E1.c0)} vs band [1.20, 1.38] and > 1.181: ${P2}`);
const P3 = E1.n >= 10 ? ((inBand(E1.fW.b, 1.05, 1.35) && E1.fW.rmse < E1.fQ.rmse) ? 'HIT' : 'MISS') : 'NOT SCORABLE';
log(`  P3 decade-1 c_w = ${f3(E1.fW.b)} vs band [1.05, 1.35] and rmse(width) ${f3(E1.fW.rmse)} < rmse(Q) ${f3(E1.fQ.rmse)}: ${P3}`);
let P4 = 'NOT SCORABLE', P4diff = null, P4ratio = null;
{
  const byQ = new Map(); for (const r of ok.filter(r => r.dec === 1)) { if (!byQ.has(r.Q)) byQ.set(r.Q, {}); byQ.get(r.Q)[r.mode] = r; }
  const pairs = [...byQ.values()].filter(o => o.true && o.null);
  if (pairs.length >= 10) {
    const mt = estimators(pairs.map(o => o.true), 'Dstar'), mn = estimators(pairs.map(o => o.null), 'Dstar');
    P4diff = Math.abs(mt.fQ.b - mn.fQ.b); P4ratio = mn.rwMean / mt.rwMean;
    P4 = (P4diff <= 0.15 && P4ratio >= 1 / 1.5 && P4ratio <= 1.5) ? 'HIT' : 'MISS';
    log(`  P4 decade-1 matched |c1 null - c1 true| = ${f3(P4diff)} (<= 0.15) and D*/w ratio null/true = ${f3(P4ratio)} (within [0.667, 1.5]): ${P4}`);
  } else log(`  P4: fewer than 10 matched decade-1 pairs: NOT SCORABLE`);
}
const P5 = E2.n >= 10 ? ((inBand(E2.c0, 1.22, 1.45) && E2.c0 > E1.c0) ? 'HIT' : 'MISS') : 'NOT SCORABLE';
log(`  P5 decade-2 c0 = ${f3(E2.c0)} vs band [1.22, 1.45] and > decade-1 c0 ${f3(E1.c0)}: ${P5}`);
const moves = [Math.abs(E1.c0 - Eold.c0), E2.n >= 3 ? Math.abs(E2.c0 - E1.c0) : 0, E2.n >= 3 ? Math.abs(E2.fQ.b - E1.fQ.b) : 0];
const P6 = Math.max(...moves) > E1.fQ.se ? 'HIT' : 'MISS';
log(`  P6 c0 moves: old->dec1 ${f3(moves[0])}, dec1->dec2 ${f3(moves[1])}, c1 dec1->dec2 ${f3(moves[2])}; largest vs SE(c1 dec1) ${f3(E1.fQ.se)}: ${P6} (HIT = it moves)`);
// the kill rule
const killA = E2.n >= 10 && (Math.abs(E2.c0 - E1.c0) > 2 * E1.fQ.se || Math.abs(E2.fQ.b - E1.fQ.b) > 2 * E1.fQ.se);
const killB = P4 === 'HIT';
log(`  KILL (a) exponent moves between decades by > 2 SE(c1 dec1) = ${f3(2 * E1.fQ.se)}: ${E2.n >= 10 ? (killA ? 'FIRES' : 'does not fire') : 'not scorable'}`);
log(`  KILL (b) the null reproduces c within its bar (P4 HIT): ${killB ? 'FIRES' : 'does not fire'}`);
log(`  item status by the pre-registered rule: ${(killA || killB) ? 'CLOSED' : (E2.n >= 10 && P4 === 'MISS' ? 'PARTIAL' : 'OPEN (not scorable)')}`);
// the estimator control: quantities with a known exponent, same anchors
log('  --- estimator control on decade-1 anchors: known exponents ---');
const d1 = pop(1, 'true', false);
for (const [lab, fld] of [['X1 = Q^2 (exponent 2 exactly)', 'Q2'], ['X2 = width (exponent 1, times the gap)', 'width'], ['X3 = round(0.35 width)', 'w035']]) {
  const E = estimators(d1, fld);
  log(`  ${lab}: c0 = ${f3(E.c0)} | c1 = ${f3(E.fQ.b)} +- ${f3(E.fQ.se)} (icpt ${f3(E.fQ.a)}, rmse ${f3(E.fQ.rmse)})`);
}
{
  const Eo = estimators(custody.filter(r => r.Q >= 31).map(r => ({ Q: r.Q, width: r.width, T: r.T, Dstar: r.Dstar })), 'w035');
  log(`  X3 on the old range Q >= 31: c0 = ${f3(Eo.c0)} | c1 = ${f3(Eo.fQ.b)} +- ${f3(Eo.fQ.se)}`);
  if (E2.n >= 3) { const E2c = estimators(pop(2, 'true', false), 'w035'); log(`  X3 on decade 2: c0 = ${f3(E2c.c0)} | c1 = ${f3(E2c.fQ.b)} +- ${f3(E2c.fQ.se)}`); }
}
// the margins
{
  const mAts = ok.filter(r => r.mode === 'true' && r.dec >= 1).map(r => r.mAt), mBel = ok.filter(r => r.mode === 'true' && r.dec >= 1 && r.mBelow !== null).map(r => r.mBelow);
  log(`  float margins, true arithmetic, new range: min m*(D*) = ${f4(Math.min(...mAts))}; max m*(below D*) = ${f4(Math.max(...mBel))}; anchors with m*(D*) < 1.5: ${mAts.filter(x => x < 1.5).length} of ${mAts.length}`);
  const secs = RES.filter(r => !r.cap).map(r => r.secs);
  progress(`compute: total ${(secs.reduce((a, b) => a + b, 0) / 60).toFixed(1)} min, max ${Math.max(...secs).toFixed(0)} s per anchor`);
  log(`  compute: ${RES.length} anchor runs; simplex iterations ${SIMPLEX_ITERS}, tableau rebuilds ${SIMPLEX_REBUILDS} (deterministic; wall-clock on stderr)`);
}

log(`\ndone in ${((Date.now() - T0) / 1000).toFixed(1)}s; assertion failures: ${failures}`);
log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
}
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/attack-0829n-parity-dstar.js
//   invocation:  node research/history/staging/attack-0829n-parity-dstar.js
//   code-sha256: 9e46d4a3321a5d44007498153c36692da914b7d92a9136802361afe99dd14802
//   out-sha256:  21d244bc7179d434f2973d4e0a20d30b41c30a44abce809306b885e47ba4a1b0
//   body-lines:  470
//   forced:      2026-08-29, 37 of 1834 figures in the replaced block not reproduced (first: 20.0, 19.8, 22.5, 10.0)
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     1606.1 s
// ============================================================================
// SEC 1 — CUSTODY GATE: REPRODUCE attack-parity-adversary-01.js SEC 2 DIGIT FOR DIGIT
//     Q  width     C    T | m*(Q) m*(w) m*(Q^2) |      D*   D*/w  lnD*/lnQ | max|m*-round|  LP m x n at D*
//      7     72     6    4 |     4     4       4 |       7   0.10    1.000 |       0.0e+0     0 x 0
//     11     48     4    2 |     2     2       2 |       7   0.15    0.812 |       0.0e+0     0 x 0
//     13    120    11    7 |     7     7       7 |      13   0.11    1.000 |       0.0e+0     0 x 0
//     17     72     6    2 |     1     1       2 |      11   0.15    0.846 |       0.0e+0     2 x 4
//     19    168    16    4 |     4     4       4 |      19   0.11    1.000 |       0.0e+0     0 x 0
//     23    312    30    8 |     3     8       8 |      19   0.06    0.939 |       0.0e+0     4 x 8
//     29    120    11    2 |     1     1       2 |      23   0.19    0.931 |       0.0e+0     2 x 3
//     31    408    40   11 |     0    11      11 |      77   0.19    1.265 |       0.0e+0     8 x 17
//     37    312    30    7 |     0     7       7 |      91   0.29    1.249 |       0.0e+0     8 x 13
//     41    168    16    3 |     0     2       3 |      91   0.54    1.215 |       0.0e+0     3 x 5
//     43    360    35   11 |     4    11      11 |      31   0.09    0.913 |       0.0e+0     6 x 16
//     47    600    59   13 |     0    13      13 |     143   0.24    1.289 |       0.0e+0    15 x 27
//     53    672    66   13 |     0    10      13 |     203   0.30    1.338 |       0.0e+0    19 x 34
//     59    240    23    5 |     3     5       5 |      43   0.18    0.922 |       0.0e+0     4 x 8
//     61    768    76   19 |     0    17      19 |     209   0.27    1.300 |       0.0e+0    19 x 40
//     67    552    54   11 |     0    10      11 |     133   0.24    1.163 |       0.0e+0    16 x 28
//     71    288    28    3 |     0     2       3 |      91   0.32    1.058 |       0.0e+0     5 x 8
//     73    912    90   15 |     0    13      15 |     247   0.27    1.284 |       0.0e+0    25 x 42
//     79    648    64   14 |     0    11      14 |     161   0.25    1.163 |       0.0e+0    20 x 30
//     83   1032   102   14 |     0    11      14 |     451   0.44    1.383 |       0.0e+0    21 x 36
//     89   1488   148   21 |     0    17      21 |     517   0.35    1.392 |       0.0e+0    37 x 60
//     97    792    78   15 |     0    13      15 |     209   0.26    1.168 |       0.0e+0    28 x 43
//    101    408    40    7 |     4     7       7 |      77   0.19    0.941 |       0.0e+0    11 x 19
//    103    840    83   10 |     0     8      10 |     377   0.45    1.280 |       0.0e+0    22 x 34
//    107    432    42    6 |     0     6       6 |     203   0.47    1.137 |       0.0e+0     9 x 13
//    109    888    88   11 |     0     7      11 |     323   0.36    1.232 |       0.0e+0    22 x 34
//    113   3360   335   42 |     0    40      41 |     899   0.27    1.439 |       0.0e+0    70 x 125
//    127   1032   102   12 |     0    11      12 |     391   0.38    1.232 |       0.0e+0    27 x 42
//    131   1608   160   27 |     0    18      27 |     611   0.38    1.316 |       0.0e+0    47 x 73
//    137    552    54    6 |     0     4       6 |     287   0.52    1.150 |       0.0e+0    11 x 16
//    139   2880   287   45 |     0    41      45 |     901   0.31    1.379 |       0.0e+0    79 x 125
//    149    600    59   10 |     4    10      10 |     149   0.25    1.000 |       0.0e+0    17 x 23
//    151   1848   184   20 |     0    13      20 |    1079   0.58    1.392 |       0.0e+0    35 x 53
//    157   1920   191   17 |     0    12      17 |    1309   0.68    1.419 |       0.0e+0    33 x 47
//    163   1320   131   21 |     0    20      21 |     427   0.32    1.189 |       0.0e+0    41 x 61
//    167   2040   203   23 |     0    17      23 |    1189   0.58    1.384 |       0.0e+0    38 x 62
//    173   2112   210   25 |     0    16      25 |     949   0.45    1.330 |       0.0e+0    65 x 93
//    179    720    71   13 |     5    13      13 |     179   0.25    1.000 |       0.0e+0    22 x 30
//    181   3720   371   49 |     0    37      49 |    1261   0.34    1.373 |       0.0e+0   104 x 162
//    191    768    76    7 |     0     5       7 |     517   0.67    1.190 |       0.0e+0    18 x 24
//    193   1560   155   20 |     0    16      20 |     629   0.40    1.224 |       0.0e+0    51 x 73
//    197    792    78    8 |     0     6       8 |     377   0.48    1.123 |       0.0e+0    21 x 29
//    199   4920   491   52 |     0    41      52 |    1781   0.36    1.414 |       0.0e+0   126 x 188
//   D* exponent ln D*/ln Q over 43 anchors: min 0.812, mean 1.181, max 1.439
//   D*/width: mean 0.321
//   custody: 172 integer figures compared against the old OUTPUT, 0 failures; largest float departure from an integer 0.0e+0
//   old range, Q >= 31 (n = 36): through-origin mean ln D*/ln Q = 1.229
//   old range, Q >= 31: OLS ln D* on ln Q     slope 1.446 +- 0.214, intercept -0.989, rmse 0.679
//   old range, Q >= 31: OLS ln D* on ln T     slope 1.071 +- 0.172, intercept 2.904, rmse 0.709
//   old range, Q >= 31: OLS ln D* on ln width slope 1.182 +- 0.085, intercept -2.340, rmse 0.401
//
// SEC 2 — THE NEW RANGE, TRUE ARITHMETIC AND THE N-THIN NULL (pre-registered in the note before this section existed)
//   decade 1: 250 anchors (Q = 211 .. 1999); excluded by C > CMAX: 7 (Q = 1327(C=9138) 1637(C=6587) 1669(C=8068) 1759(C=6364) 1913(C=6918) 1933(C=6210) 1951(C=8632))
//   decade 2: 21 of 24 targets have an anchor with C <= CMAX; anchors Q = 2003 2203 2437 2671 2953 3251 3557 3917 4337 4783 5227 5779 6359 6967 7757 8537 9341 10271 11351 12539 13679
//   null at every 3rd decade-1 anchor (index 0 mod 3) and every decade-2 anchor; seed 20260829 + Q; CMAX = 6000; cap 900 s/anchor
//   tag      Q  gap    width      C     T |        D*   D*/w lnD*/lnQ |   m*(D*) m*(below) | LPs   (wall-clock per anchor goes to stderr: it is not reproducible and must not be in the block)
//   T1    211   12     5208    520    59 |      1921   0.369   1.413 |    2.000    0.000 |  13
//   N1    211   12     5208    520    77 |      1937   0.372   1.414 |    3.000    0.000 |  12
//   T1    223    4     1800    179    23 |       697   0.387   1.211 |    2.000    0.000 |  13
//   T1    227    2      912     90     9 |       209   0.229   0.985 |    1.000    0.000 |  13
//   T1    229    4     1848    184    16 |      1007   0.545   1.273 |    2.000    0.000 |  13
//   N1    229    4     1848    184    26 |       473   0.256   1.133 |    1.000    0.500 |  13
//   T1    233    6     2832    282    32 |      1079   0.381   1.281 |    1.000    0.000 |  13
//   T1    239    2      960     95     9 |       259   0.270   1.015 |    1.000    0.000 |  13
//   T1    241   10     4920    491    46 |      2041   0.415   1.390 |    3.500    0.000 |  13
//   N1    241   10     4920    491    73 |      1691   0.344   1.355 |    2.167    0.167 |  13
//   T1    251    6     3048    304    33 |      1529   0.502   1.327 |    1.000    0.000 |  13
//   T1    257    6     3120    311    27 |      1339   0.429   1.297 |    1.000    0.000 |  14
//   T1    263    6     3192    318    43 |      1469   0.460   1.309 |    1.500    0.500 |  13
//   N1    263    6     3192    318    29 |      1961   0.614   1.361 |    1.000    0.000 |  13
//   T1    269    2     1080    107     7 |       413   0.382   1.077 |    1.000    0.000 |  14
//   T1    271    6     3288    328    30 |      1841   0.560   1.342 |    1.000    0.000 |  14
//   T1    277    4     2232    222    20 |      1147   0.514   1.253 |    3.000    0.000 |  13
//   N1    277    4     2232    222    25 |       959   0.430   1.221 |    2.000    0.000 |  14
//   T1    281    2     1128    112    12 |       473   0.419   1.092 |    1.000    0.000 |  13
//   T1    283   10     5760    575    68 |      2077   0.361   1.353 |    2.750    0.750 |  14
//   T1    293   14     8400    839    88 |      3077   0.366   1.414 |    2.500    0.500 |  13
//   N1    293   14     8400    839   111 |      3281   0.391   1.425 |    1.879    0.879 |  13
//   T1    307    4     2472    246    22 |      1147   0.464   1.230 |    1.000    0.000 |  14
//   T1    311    2     1248    124    18 |       323   0.259   1.007 |    1.000    0.000 |  15
//   T1    313    4     2520    251    24 |      1169   0.464   1.229 |    1.000    0.500 |  14
//   N1    313    4     2520    251    28 |      1441   0.572   1.266 |    1.000    0.000 |  13
//   T1    317   14     9072    906    88 |      3653   0.403   1.424 |    1.500    0.500 |  14
//   T1    331    6     4008    400    41 |      1957   0.488   1.306 |    1.500    0.000 |  14
//   T1    337   10     6840    683    70 |      2669   0.390   1.356 |    1.000    0.000 |  14
//   N1    337   10     6840    683    74 |      2893   0.423   1.369 |    1.500    0.500 |  14
//   T1    347    2     1392    138    14 |       703   0.505   1.121 |    2.000    0.000 |  14
//   T1    349    4     2808    280    29 |      1147   0.408   1.203 |    1.000    0.000 |  14
//   T1    353    6     4272    426    35 |      2533   0.593   1.336 |    1.000    0.000 |  14
//   N1    353    6     4272    426    44 |      2431   0.569   1.329 |    5.000    0.000 |  13
//   T1    359    8     5808    580    56 |      2471   0.425   1.328 |    1.000    0.000 |  14
//   T1    367    6     4440    443    41 |      2183   0.492   1.302 |    1.000    0.000 |  14
//   T1    373    6     4512    450    39 |      2279   0.505   1.306 |    1.000    0.000 |  14
//   N1    373    6     4512    450    55 |      1853   0.411   1.271 |    2.000    0.000 |  15
//   T1    379    4     3048    304    26 |      1441   0.473   1.225 |    1.000    0.000 |  14
//   T1    383    6     4632    462    49 |      1771   0.382   1.257 |    1.500    0.500 |  15
//   T1    389    8     6288    628    66 |      2743   0.436   1.328 |    1.000    0.000 |  15
//   N1    389    8     6288    628    70 |      3799   0.604   1.382 |    2.500    0.500 |  14
//   T1    397    4     3192    318    29 |      1417   0.444   1.213 |    2.000    0.000 |  15
//   T1    401    8     6480    647    54 |      3151   0.486   1.344 |    1.000    0.000 |  15
//   T1    409   10     8280    827    60 |      3959   0.478   1.377 |    1.000    0.000 |  15
//   N1    409   10     8280    827    92 |      3569   0.431   1.360 |    4.000    0.000 |  15
//   T1    419    2     1680    167    24 |       419   0.249   1.000 |    8.000    0.000 |  15
//   T1    421   10     8520    851    90 |      3683   0.432   1.359 |    1.000    0.000 |  15
//   T1    431    2     1728    172    19 |       527   0.305   1.033 |    1.000    0.000 |  15
//   N1    431    2     1728    172    17 |       623   0.361   1.061 |    1.000    0.000 |  15
//   T1    433    6     5232    522    44 |      2627   0.502   1.297 |    1.000    0.000 |  15
//   T1    439    4     3528    352    23 |      2219   0.629   1.266 |    1.000    0.000 |  14
//   T1    443    6     5352    534    46 |      2429   0.454   1.279 |    1.000    0.000 |  16
//   N1    443    6     5352    534    54 |      2723   0.509   1.298 |    1.000    0.000 |  15
//   T1    449    8     7248    724    70 |      3619   0.499   1.342 |    1.000    0.000 |  15
//   T1    457    4     3672    366    33 |      1729   0.471   1.217 |    1.000    0.000 |  15
//   T1    461    2     1848    184    10 |      1273   0.689   1.166 |    2.000    0.000 |  14
//   N1    461    2     1848    184    22 |       629   0.340   1.051 |    2.500    0.500 |  16
//   T1    463    4     3720    371    30 |      1691   0.455   1.211 |    2.000    0.000 |  15
//   T1    467   12    11352   1134   100 |      4979   0.439   1.385 |    1.000    0.000 |  15
//   T1    479    8     7728    772    74 |      2983   0.386   1.296 |    1.000    0.000 |  16
//   N1    479    8     7728    772    73 |      3937   0.509   1.341 |    1.000    0.000 |  14
//   T1    487    4     3912    390    24 |      1939   0.496   1.223 |    1.000    0.000 |  15
//   T1    491    8     7920    791    70 |      4009   0.506   1.339 |    1.000    0.000 |  15
//   T1    499    4     4008    400    28 |      2291   0.572   1.245 |    2.000    0.000 |  15
//   N1    499    4     4008    400    33 |      1757   0.438   1.203 |    1.000    0.000 |  15
//   T1    503    6     6072    606    46 |      3053   0.503   1.290 |    1.000    0.000 |  16
//   T1    509   12    12360   1235   109 |      5863   0.474   1.392 |    1.000    0.000 |  15
//   T1    521    2     2088    208    21 |       713   0.341   1.050 |    1.500    0.500 |  15
//   N1    521    2     2088    208    21 |       767   0.367   1.062 |    1.000    0.000 |  15
//   T1    523   18    19152   1914   157 |      7859   0.410   1.433 |    1.000    0.000 |  15
//   T1    541    6     6528    652    45 |      3553   0.544   1.299 |    1.000    0.000 |  15
//   T1    547   10    11040   1103    99 |      5129   0.465   1.355 |    1.000    0.000 |  15
//   N1    547   10    11040   1103   123 |      6157   0.558   1.384 |    1.500    0.500 |  15
//   T1    557    6     6720    671    54 |      3497   0.520   1.291 |    1.000    0.000 |  16
//   T1    563    6     6792    678    71 |      3367   0.496   1.282 |    3.000    0.000 |  15
//   T1    569    2     2280    227    21 |       779   0.342   1.050 |    3.000    0.000 |  16
//   N1    569    2     2280    227    19 |      1133   0.497   1.109 |    1.000    0.000 |  15
//   T1    571    6     6888    688    67 |      3071   0.446   1.265 |    2.000    0.000 |  16
//   T1    577   10    11640   1163    82 |      5837   0.501   1.364 |    1.000    0.000 |  15
//   T1    587    6     7080    707    52 |      4069   0.575   1.304 |    1.000    0.000 |  16
//   N1    587    6     7080    707    75 |      2821   0.398   1.246 |    2.500    0.000 |  16
//   T1    593    6     7152    714    60 |      3487   0.488   1.277 |    1.000    0.000 |  16
//   T1    599    2     2400    239    20 |       979   0.408   1.077 |    1.000    0.000 |  16
//   T1    601    6     7248    724    52 |      3983   0.550   1.296 |    1.000    0.000 |  16
//   N1    601    6     7248    724    92 |      3007   0.415   1.252 |    2.000    0.000 |  15
//   T1    607    6     7320    731    52 |      3649   0.498   1.280 |    1.000    0.000 |  15
//   T1    613    4     4920    491    33 |      2759   0.561   1.234 |    2.000    0.000 |  16
//   T1    617    2     2472    246    20 |      1003   0.406   1.076 |    1.000    0.000 |  16
//   N1    617    2     2472    246    25 |      1337   0.541   1.120 |    4.000    0.000 |  15
//   T1    619   12    15000   1499   119 |      7049   0.470   1.378 |    1.333    0.333 |  16
//   T1    631   10    12720   1271   102 |      5911   0.465   1.347 |    2.000    0.000 |  16
//   T1    641    2     2568    256    19 |      1357   0.528   1.116 |    1.000    0.000 |  16
//   N1    641    2     2568    256    24 |       781   0.304   1.031 |    1.000    0.000 |  17
//   T1    643    4     5160    515    40 |      2567   0.497   1.214 |    2.000    0.000 |  16
//   T1    647    6     7800    779    64 |      3869   0.496   1.276 |    1.500    0.000 |  16
//   T1    653    6     7872    786    73 |      3553   0.451   1.261 |    1.000    0.000 |  16
//   N1    653    6     7872    786    81 |      3431   0.436   1.256 |    1.000    0.000 |  16
//   T1    659    2     2640    263    22 |      1147   0.434   1.085 |    3.500    0.500 |  16
//   T1    661   12    16008   1600   108 |      8257   0.516   1.389 |    2.000    0.000 |  15
//   T1    673    4     5400    539    42 |      2717   0.503   1.214 |    1.000    0.000 |  16
//   N1    673    4     5400    539    47 |      2821   0.522   1.220 |    1.000    0.000 |  17
//   T1    677    6     8160    815    59 |      4343   0.532   1.285 |    2.000    0.000 |  15
//   T1    683    8    10992   1098    80 |      5609   0.510   1.323 |    3.000    0.500 |  17
//   T1    691   10    13920   1391   105 |      6851   0.492   1.351 |    1.000    0.000 |  16
//   N1    691   10    13920   1391   137 |      6523   0.469   1.343 |    1.000    0.000 |  16
//   T1    701    8    11280   1127    79 |      7061   0.626   1.353 |    1.000    0.000 |  16
//   T1    709   10    14280   1427   101 |      7631   0.534   1.362 |    1.000    0.000 |  17
//   T1    719    8    11568   1156   105 |      4897   0.423   1.292 |    2.000    0.000 |  16
//   N1    719    8    11568   1156   104 |      6293   0.544   1.330 |    2.000    0.000 |  16
//   T1    727    6     8760    875    63 |      5251   0.599   1.300 |    2.000    0.000 |  16
//   T1    733    6     8832    882    71 |      3983   0.451   1.257 |    2.000    0.000 |  17
//   T1    739    4     5928    592    42 |      3397   0.573   1.231 |    1.000    0.000 |  17
//   N1    739    4     5928    592    47 |      2669   0.450   1.194 |    1.000    0.000 |  16
//   T1    743    8    11952   1194    83 |      7363   0.616   1.347 |    1.000    0.000 |  17
//   T1    751    6     9048    904    73 |      4681   0.517   1.276 |    6.000    0.000 |  16
//   T1    757    4     6072    606    48 |      2881   0.474   1.202 |    2.000    0.000 |  17
//   N1    757    4     6072    606    71 |      2743   0.452   1.194 |    2.000    0.000 |  16
//   T1    761    8    12240   1223    98 |      6313   0.516   1.319 |    1.000    0.000 |  16
//   T1    769    4     6168    616    50 |      3077   0.499   1.209 |    1.500    0.000 |  16
//   T1    773   14    21840   2183   160 |      9997   0.458   1.385 |    1.500    0.500 |  16
//   N1    773   14    21840   2183   226 |      9673   0.443   1.380 |    1.000    0.000 |  16
//   T1    787   10    15840   1583   118 |      7897   0.499   1.346 |    1.000    0.000 |  16
//   T1    797   12    19272   1926   150 |      9889   0.513   1.377 |    3.000    0.500 |  15
//   T1    809    2     3240    323    19 |      1727   0.533   1.113 |    1.000    0.000 |  16
//   N1    809    2     3240    323    24 |      2077   0.641   1.141 |    1.000    0.000 |  16
//   T1    811   10    16320   1631   124 |      8593   0.527   1.352 |    1.000    0.500 |  17
//   T1    821    2     3288    328    24 |      1403   0.427   1.080 |    1.000    0.000 |  16
//   T1    823    4     6600    659    49 |      3737   0.566   1.225 |    1.000    0.000 |  17
//   N1    823    4     6600    659    73 |      3569   0.541   1.219 |    1.000    0.000 |  16
//   T1    827    2     3312    330    24 |      1729   0.522   1.110 |    2.000    0.000 |  17
//   T1    829   10    16680   1667   108 |      9707   0.582   1.366 |    1.000    0.000 |  17
//   T1    839   14    23688   2368   165 |     12223   0.516   1.398 |    1.000    0.000 |  16
//   N1    839   14    23688   2368   244 |      9443   0.399   1.360 |    1.500    0.000 |  17
//   T1    853    4     6840    683    43 |      4387   0.641   1.243 |    2.000    0.000 |  17
//   T1    857    2     3432    342    27 |      1529   0.446   1.086 |    1.000    0.000 |  16
//   T1    859    4     6888    688    50 |      3353   0.487   1.202 |    1.000    0.000 |  17
//   N1    859    4     6888    688    57 |      4151   0.603   1.233 |    1.000    0.000 |  17
//   T1    863   14    24360   2435   157 |     12331   0.506   1.393 |    1.000    0.000 |  16
//   T1    877    4     7032    702    57 |      3317   0.472   1.196 |    2.000    0.000 |  17
//   T1    881    2     3528    352    25 |      1649   0.467   1.092 |    1.000    0.000 |  17
//   N1    881    2     3528    352    22 |      2257   0.640   1.139 |    1.000    0.000 |  16
//   T1    883    4     7080    707    56 |      3403   0.481   1.199 |    2.500    0.000 |  17
//   T1    887   20    35880   3587   245 |     17437   0.486   1.439 |    1.000    0.500 |  16
//   T1    907    4     7272    726    59 |      4403   0.605   1.232 |    1.000    0.000 |  17
//   N1    907    4     7272    726    66 |      3619   0.498   1.203 |    1.000    0.000 |  16
//   T1    911    8    14640   1463   108 |      7141   0.488   1.302 |    1.000    0.000 |  17
//   T1    919   10    18480   1847   119 |     10763   0.582   1.361 |    1.000    0.000 |  17
//   T1    929    8    14928   1492   112 |      8569   0.574   1.325 |    2.000    0.000 |  17
//   N1    929    8    14928   1492   143 |      7661   0.513   1.309 |    2.250    0.250 |  16
//   T1    937    4     7512    750    53 |      3649   0.486   1.199 |    1.000    0.000 |  17
//   T1    941    6    11328   1132    86 |      6431   0.568   1.281 |    3.000    0.000 |  18
//   T1    947    6    11400   1139    68 |      7067   0.620   1.293 |    3.000    0.000 |  17
//   N1    947    6    11400   1139   106 |      5719   0.502   1.262 |    1.000    0.000 |  17
//   T1    953   14    26880   2687   201 |     12869   0.479   1.379 |    1.500    0.750 |  17
//   T1    967    4     7752    774    48 |      5177   0.668   1.244 |    1.000    0.000 |  17
//   T1    971    6    11688   1168    81 |      6533   0.559   1.277 |    1.000    0.000 |  17
//   N1    971    6    11688   1168   106 |      6023   0.515   1.265 |    2.000    0.500 |  17
//   T1    977    6    11760   1175    90 |      5747   0.489   1.257 |    1.000    0.000 |  17
//   T1    983    8    15792   1578   109 |      7997   0.506   1.304 |    3.000    0.000 |  17
//   T1    991    6    11928   1192    71 |      7169   0.601   1.287 |    1.000    0.000 |  17
//   N1    991    6    11928   1192   101 |      6409   0.537   1.271 |    1.500    0.500 |  18
//   T1    997   12    24072   2406   191 |     11111   0.462   1.349 |    1.333    0.000 |  18
//   T1   1009    4     8088    808    54 |      4511   0.558   1.217 |    1.000    0.000 |  18
//   T1   1013    6    12192   1218    89 |      6059   0.497   1.258 |    2.000    0.000 |  17
//   N1   1013    6    12192   1218    99 |      7439   0.610   1.288 |    1.500    0.500 |  17
//   T1   1019    2     4080    407    30 |      1727   0.423   1.076 |    2.500    0.000 |  18
//   T1   1021   10    20520   2051   137 |     12701   0.619   1.364 |    1.000    0.000 |  17
//   T1   1031    2     4128    412    27 |      1943   0.471   1.091 |    1.000    0.000 |  18
//   N1   1031    2     4128    412    35 |      1891   0.458   1.087 |    1.875    0.875 |  17
//   T1   1033    6    12432   1242    92 |      5723   0.460   1.247 |    3.000    0.000 |  18
//   T1   1039   10    20880   2087   154 |     10217   0.489   1.329 |    2.000    0.000 |  18
//   T1   1049    2     4200    419    23 |      2491   0.593   1.124 |    2.000    0.000 |  17
//   N1   1049    2     4200    419    40 |      1729   0.412   1.072 |    1.000    0.000 |  17
//   T1   1051   10    21120   2111   148 |     10417   0.493   1.330 |    1.000    0.000 |  17
//   T1   1061    2     4248    424    34 |      1919   0.452   1.085 |    2.000    0.000 |  18
//   T1   1063    6    12792   1278    95 |      6557   0.513   1.261 |    3.000    0.000 |  18
//   N1   1063    6    12792   1278   106 |      7777   0.608   1.286 |    2.000    0.000 |  17
//   T1   1069   18    38808   3880   265 |     18221   0.470   1.407 |    2.000    0.000 |  17
//   T1   1087    4     8712    870    68 |      4147   0.476   1.192 |    1.000    0.000 |  18
//   T1   1091    2     4368    436    29 |      2167   0.496   1.098 |    2.000    0.000 |  17
//   N1   1091    2     4368    436    39 |      2227   0.510   1.102 |    1.000    0.000 |  17
//   T1   1093    4     8760    875    59 |      5363   0.612   1.227 |    4.000    0.000 |  18
//   T1   1097    6    13200   1319    76 |      7553   0.572   1.276 |    1.000    0.000 |  18
//   T1   1103    6    13272   1326    89 |      6751   0.509   1.259 |    3.000    0.000 |  18
//   N1   1103    6    13272   1326   110 |      6497   0.490   1.253 |    2.500    0.500 |  17
//   T1   1109    8    17808   1780   128 |      9847   0.553   1.311 |    1.000    0.000 |  17
//   T1   1117    6    13440   1343    91 |      8029   0.597   1.281 |    1.500    0.500 |  18
//   T1   1123    6    13512   1350    95 |      7081   0.524   1.262 |    1.000    0.000 |  18
//   N1   1123    6    13512   1350   113 |      7981   0.591   1.279 |    1.667    0.667 |  17
//   T1   1129   22    50160   5015   332 |     24521   0.489   1.438 |    1.000    0.000 |  17
//   T1   1151    2     4608    460    21 |      3713   0.806   1.166 |    2.000    0.000 |  17
//   T1   1153   10    23160   2315   178 |     11479   0.496   1.326 |    1.000    0.000 |  17
//   N1   1153   10    23160   2315   192 |     12367   0.534   1.337 |    1.000    0.000 |  17
//   T1   1163    8    18672   1866   130 |      9991   0.535   1.305 |    3.000    0.000 |  18
//   T1   1171   10    23520   2351   158 |     13561   0.577   1.347 |    1.000    0.000 |  17
//   T1   1181    6    14208   1420   102 |      7973   0.561   1.270 |    1.000    0.000 |  18
//   N1   1181    6    14208   1420   108 |      7661   0.539   1.264 |    3.000    0.000 |  18
//   T1   1187    6    14280   1427    82 |     10217   0.715   1.304 |    1.000    0.000 |  17
//   T1   1193    8    19152   1914   113 |     11537   0.602   1.320 |    1.000    0.000 |  18
//   T1   1201   12    28968   2896   194 |     15403   0.532   1.360 |    1.500    0.500 |  18
//   N1   1201   12    28968   2896   228 |     17347   0.599   1.377 |    1.500    0.000 |  17
//   T1   1213    4     9720    971    68 |      5891   0.606   1.223 |    1.000    0.000 |  17
//   T1   1217    6    14640   1463    98 |      8881   0.607   1.280 |    1.000    0.000 |  18
//   T1   1223    6    14712   1470   102 |      7519   0.511   1.255 |    2.500    0.500 |  18
//   N1   1223    6    14712   1470   114 |      8239   0.560   1.268 |    1.000    0.000 |  18
//   T1   1229    2     4920    491    35 |      2317   0.471   1.089 |    2.000    0.000 |  18
//   T1   1231    6    14808   1480   102 |      8371   0.565   1.269 |    1.000    0.000 |  17
//   T1   1237   12    29832   2982   192 |     15211   0.510   1.352 |    3.000    0.000 |  17
//   N1   1237   12    29832   2982   233 |     16999   0.570   1.368 |    3.000    0.000 |  18
//   T1   1249   10    25080   2507   171 |     13481   0.538   1.334 |    1.000    0.000 |  18
//   T1   1259   18    45648   4564   307 |     22919   0.502   1.407 |    2.500    0.000 |  18
//   T1   1277    2     5112    510    38 |      1969   0.385   1.061 |    3.000    0.000 |  18
//   N1   1277    2     5112    510    40 |      2449   0.479   1.091 |    1.000    0.000 |  18
//   T1   1279    4    10248   1024    59 |      7303   0.713   1.244 |    1.500    0.500 |  18
//   T1   1283    6    15432   1542    95 |      9211   0.597   1.275 |    2.500    0.500 |  18
//   T1   1289    2     5160    515    30 |      3131   0.607   1.124 |    3.000    0.000 |  18
//   N1   1289    2     5160    515    33 |      3053   0.592   1.120 |    2.000    0.000 |  18
//   T1   1291    6    15528   1552   112 |      7439   0.479   1.244 |    1.167    0.167 |  18
//   T1   1297    4    10392   1038    60 |      5989   0.576   1.213 |    2.500    0.500 |  18
//   T1   1301    2     5208    520    32 |      2623   0.504   1.098 |    1.000    0.000 |  18
//   N1   1301    2     5208    520    32 |      3101   0.595   1.121 |    3.000    0.000 |  18
//   T1   1303    4    10440   1043    82 |      4963   0.475   1.186 |    1.000    0.000 |  18
//   T1   1307   12    31512   3150   210 |     16037   0.509   1.349 |    1.500    0.000 |  18
//   T1   1319    2     5280    527    30 |      2881   0.546   1.109 |    1.000    0.000 |  18
//   N1   1319    2     5280    527    37 |      2863   0.542   1.108 |    1.000    0.000 |  18
//   T1   1321    6    15888   1588   102 |      8897   0.560   1.265 |    1.000    0.000 |  19
//   T1   1361    6    16368   1636   111 |      8471   0.518   1.253 |    1.500    0.500 |  18
//   T1   1367    6    16440   1643   106 |      9713   0.591   1.272 |    1.000    0.000 |  18
//   N1   1367    6    16440   1643   146 |      8473   0.515   1.253 |    1.000    0.000 |  18
//   T1   1373    8    22032   2202   127 |     14279   0.648   1.324 |    2.000    0.000 |  18
//   T1   1381   18    50040   5003   324 |     24397   0.488   1.397 |    1.000    0.000 |  18
//   T1   1399   10    28080   2807   174 |     14329   0.510   1.321 |    2.000    0.000 |  18
//   N1   1399   10    28080   2807   237 |     15589   0.555   1.333 |    1.500    0.000 |  18
//   T1   1409   14    39648   3964   265 |     20453   0.516   1.369 |    1.000    0.000 |  18
//   T1   1423    4    11400   1139    77 |      6739   0.591   1.214 |    2.000    0.000 |  19
//   T1   1427    2     5712    570    33 |      2921   0.511   1.099 |    1.000    0.000 |  18
//   N1   1427    2     5712    570    40 |      3589   0.628   1.127 |    1.000    0.000 |  18
//   T1   1429    4    11448   1144    71 |      6487   0.567   1.208 |    1.000    0.000 |  19
//   T1   1433    6    17232   1722   115 |      9271   0.538   1.257 |    1.000    0.000 |  18
//   T1   1439    8    23088   2308   147 |     12403   0.537   1.296 |    1.000    0.000 |  18
//   N1   1439    8    23088   2308   177 |     13561   0.587   1.308 |    1.000    0.000 |  18
//   T1   1447    4    11592   1158    56 |      8989   0.775   1.251 |    2.000    0.000 |  18
//   T1   1451    2     5808    580    36 |      2821   0.486   1.091 |    1.000    0.000 |  18
//   T1   1453    6    17472   1746   103 |     11033   0.631   1.278 |    1.000    0.000 |  19
//   N1   1453    6    17472   1746   138 |     10033   0.574   1.265 |    1.000    0.000 |  18
//   T1   1459   12    35160   3515   229 |     18569   0.528   1.349 |    1.000    0.000 |  18
//   T1   1471   10    29520   2951   174 |     17537   0.594   1.340 |    1.000    0.000 |  18
//   T1   1481    2     5928    592    33 |      4559   0.769   1.154 |    1.000    0.000 |  18
//   N1   1481    2     5928    592    46 |      2717   0.458   1.083 |    1.000    0.000 |  19
//   T1   1483    4    11880   1187    70 |      7663   0.645   1.225 |    1.000    0.000 |  19
//   T1   1487    2     5952    594    30 |      4399   0.739   1.148 |    1.000    0.000 |  18
//   T1   1489    4    11928   1192    81 |      6407   0.537   1.200 |    1.000    0.000 |  18
//   N1   1489    4    11928   1192    83 |      7049   0.591   1.213 |    1.000    0.000 |  19
//   T1   1493    6    17952   1794   126 |      9379   0.522   1.251 |    1.000    0.000 |  18
//   T1   1499   12    36120   3611   224 |     17171   0.475   1.333 |    1.000    0.000 |  19
//   T1   1511   12    36408   3640   217 |     23267   0.639   1.374 |    1.500    0.500 |  18
//   N1   1511   12    36408   3640   266 |     21337   0.586   1.362 |    1.500    0.500 |  18
//   T1   1523    8    24432   2442   153 |     13261   0.543   1.295 |    3.500    0.500 |  19
//   T1   1531   12    36888   3688   231 |     19807   0.537   1.349 |    1.500    0.500 |  18
//   T1   1543    6    18552   1854   109 |     11371   0.613   1.272 |    1.000    0.000 |  19
//   N1   1543    6    18552   1854   151 |      8651   0.466   1.235 |    1.000    0.500 |  19
//   T1   1549    4    12408   1240    73 |      7469   0.602   1.214 |    1.000    0.000 |  19
//   T1   1553    6    18672   1866   111 |     11089   0.594   1.268 |    2.000    0.000 |  19
//   T1   1559    8    25008   2500   139 |     15793   0.632   1.315 |    1.500    0.500 |  18
//   N1   1559    8    25008   2500   211 |     13849   0.554   1.297 |    1.000    0.000 |  19
//   T1   1567    4    12552   1254    76 |      7081   0.564   1.205 |    1.000    0.000 |  18
//   T1   1571    8    25200   2519   146 |     16501   0.655   1.320 |    1.000    0.000 |  19
//   T1   1579    4    12648   1264    72 |      7657   0.605   1.214 |    1.000    0.000 |  18
//   N1   1579    4    12648   1264    99 |      5767   0.456   1.176 |    1.000    0.000 |  18
//   T1   1583   14    44520   4451   260 |     24857   0.558   1.374 |    2.000    0.000 |  19
//   T1   1597    4    12792   1278    80 |      7169   0.560   1.204 |    1.000    0.000 |  19
//   T1   1601    6    19248   1924   122 |     10699   0.556   1.257 |    1.000    0.000 |  18
//   N1   1601    6    19248   1924   149 |     11183   0.581   1.263 |    1.000    0.000 |  18
//   T1   1607    2     6432    642    43 |      3247   0.505   1.095 |    1.000    0.000 |  18
//   T1   1609    4    12888   1288    75 |      7777   0.603   1.213 |    1.000    0.000 |  19
//   T1   1613    6    19392   1938   124 |     11671   0.602   1.268 |    3.000    0.000 |  18
//   N1   1613    6    19392   1938   157 |     11051   0.570   1.261 |    1.500    0.000 |  18
//   T1   1619    2     6480    647    33 |      4403   0.679   1.135 |    1.000    0.000 |  19
//   T1   1621    6    19488   1948   122 |     11021   0.566   1.259 |    1.500    0.000 |  19
//   T1   1627   10    32640   3263   205 |     17023   0.522   1.318 |    1.000    0.000 |  19
//   N1   1627   10    32640   3263   236 |     19633   0.602   1.337 |    1.000    0.000 |  19
//   T1   1657    6    19920   1991   120 |     12359   0.620   1.271 |    1.000    0.000 |  18
//   T1   1663    4    13320   1331    80 |      7147   0.537   1.197 |    1.000    0.000 |  19
//   T1   1667    2     6672    666    35 |      4613   0.691   1.137 |    1.000    0.000 |  18
//   N1   1667    2     6672    666    47 |      3131   0.469   1.085 |    2.000    0.000 |  19
//   T1   1693    4    13560   1355    69 |     10757   0.793   1.249 |    1.000    0.000 |  19
//   T1   1697    2     6792    678    35 |      4343   0.639   1.126 |    1.000    0.000 |  19
//   T1   1699   10    34080   3407   186 |     20267   0.595   1.333 |    1.000    0.000 |  19
//   N1   1699   10    34080   3407   227 |     21547   0.632   1.342 |    1.500    0.500 |  19
//   T1   1709   12    41160   4115   239 |     22523   0.547   1.346 |    2.500    0.500 |  19
//   T1   1721    2     6888    688    47 |      2639   0.383   1.057 |    3.500    0.500 |  20
//   T1   1723   10    34560   3455   220 |     18833   0.545   1.321 |    5.000    0.000 |  19
//   N1   1723   10    34560   3455   255 |     20293   0.587   1.331 |    1.000    0.000 |  19
//   T1   1733    8    27792   2778   160 |     16423   0.591   1.302 |    1.000    0.000 |  18
//   T1   1741    6    20928   2092   115 |     14329   0.685   1.282 |    1.000    0.000 |  18
//   T1   1747    6    21000   2099   136 |     11659   0.555   1.254 |    2.000    0.000 |  20
//   N1   1747    6    21000   2099   155 |     12709   0.605   1.266 |    1.000    0.000 |  19
//   T1   1753    6    21072   2106   154 |     10877   0.516   1.244 |    2.000    0.000 |  20
//   T1   1777    6    21360   2135   118 |     13973   0.654   1.276 |    1.000    0.000 |  18
//   T1   1783    4    14280   1427    93 |      7181   0.503   1.186 |    1.000    0.000 |  19
//   N1   1783    4    14280   1427   120 |      7483   0.524   1.192 |    1.000    0.000 |  18
//   T1   1787    2     7152    714    48 |      3473   0.486   1.089 |    1.000    0.000 |  18
//   T1   1789   12    43080   4307   276 |     22933   0.532   1.341 |    2.000    0.000 |  19
//   T1   1801   10    36120   3611   204 |     20989   0.581   1.328 |    1.000    0.000 |  19
//   N1   1801   10    36120   3611   276 |     19021   0.527   1.314 |    5.000    0.000 |  19
//   T1   1811   12    43608   4360   259 |     24521   0.562   1.347 |    2.000    0.000 |  19
//   T1   1823    8    29232   2922   166 |     17147   0.587   1.299 |    1.000    0.000 |  19
//   T1   1831   16    58848   5884   360 |     32053   0.545   1.381 |    1.500    0.500 |  19
//   N1   1831   16    58848   5884   441 |     33793   0.574   1.388 |    2.500    0.500 |  19
//   T1   1847   14    51912   5190   302 |     28589   0.551   1.364 |    2.000    0.000 |  19
//   T1   1861    6    22368   2236   119 |     15691   0.701   1.283 |    1.000    0.000 |  19
//   T1   1867    4    14952   1494    86 |      9071   0.607   1.210 |    1.000    0.000 |  19
//   N1   1867    4    14952   1494   100 |      8239   0.551   1.197 |    2.000    0.500 |  19
//   T1   1871    2     7488    748    42 |      3913   0.523   1.098 |    1.000    0.000 |  19
//   T1   1873    4    15000   1499    88 |     10117   0.674   1.224 |    1.000    0.000 |  19
//   T1   1877    2     7512    750    46 |      3619   0.482   1.087 |    1.000    0.000 |  19
//   N1   1877    2     7512    750    48 |      4633   0.617   1.120 |    3.000    0.000 |  19
//   T1   1879   10    37680   3767   227 |     20669   0.549   1.318 |    1.000    0.000 |  19
//   T1   1889   12    45480   4547   272 |     24553   0.540   1.340 |    1.000    0.000 |  19
//   T1   1901    6    22848   2284   151 |     12419   0.544   1.249 |    1.000    0.000 |  20
//   N1   1901    6    22848   2284   155 |     13493   0.591   1.260 |    2.000    0.000 |  19
//   T1   1907    6    22920   2291   135 |     13067   0.570   1.255 |    4.500    0.000 |  20
//   T1   1931    2     7728    772    43 |      6017   0.779   1.150 |    1.000    0.000 |  19
//   T1   1949    2     7800    779    43 |      4333   0.556   1.105 |    1.000    0.000 |  19
//   N1   1949    2     7800    779    60 |      4183   0.536   1.101 |    1.000    0.000 |  19
//   T1   1973    6    23712   2370   132 |     15707   0.662   1.273 |    3.000    0.000 |  19
//   T1   1979    8    31728   3172   208 |     16291   0.513   1.278 |    1.500    0.500 |  19
//   T1   1987    6    23880   2387   118 |     16211   0.679   1.276 |    1.000    0.000 |  19
//   N1   1987    6    23880   2387   183 |     15857   0.664   1.273 |    2.000    0.000 |  19
//   T1   1993    4    15960   1595    86 |     10403   0.652   1.218 |    1.000    0.000 |  19
//   T1   1997    2     7992    798    42 |      4823   0.603   1.116 |    1.000    0.000 |  19
//   T1   1999    4    16008   1600    93 |      9881   0.617   1.210 |    1.000    0.000 |  20
//   N1   1999    4    16008   1600   119 |      9089   0.568   1.199 |    1.500    0.750 |  19
//   T2   2003    8    32112   3210   205 |     17237   0.537   1.283 |    1.333    0.333 |  19
//   N2   2003    8    32112   3210   240 |     17879   0.557   1.288 |    2.000    0.000 |  18
//   T2   2203    4    17640   1763   101 |     11141   0.632   1.211 |    1.000    0.000 |  19
//   N2   2203    4    17640   1763   140 |      8879   0.503   1.181 |    1.500    0.500 |  20
//   T2   2437    4    19512   1950   104 |     13663   0.700   1.221 |    1.000    0.000 |  20
//   N2   2437    4    19512   1950   132 |     11269   0.578   1.196 |    2.500    0.000 |  20
//   T2   2671    6    32088   3208   177 |     19939   0.621   1.255 |    1.000    0.000 |  20
//   N2   2671    6    32088   3208   188 |     19351   0.603   1.251 |    2.000    0.000 |  20
//   T2   2953    4    23640   2363   112 |     18791   0.795   1.232 |    2.000    0.000 |  20
//   N2   2953    4    23640   2363   171 |     13571   0.574   1.191 |    2.500    0.500 |  21
//   T2   3251    2    13008   1300    62 |     10763   0.827   1.148 |    1.000    0.000 |  20
//   N2   3251    2    13008   1300    81 |      6557   0.504   1.087 |    1.000    0.000 |  21
//   T2   3557    2    14232   1422    55 |     11929   0.838   1.148 |    2.000    0.000 |  21
//   N2   3557    2    14232   1422    95 |      6943   0.488   1.082 |    1.000    0.000 |  21
//   T2   3917    2    15672   1566    81 |      9773   0.624   1.111 |    1.000    0.000 |  21
//   N2   3917    2    15672   1566    87 |      9943   0.634   1.113 |    1.000    0.000 |  21
//   T2   4337    2    17352   1734    82 |     10783   0.621   1.109 |    1.000    0.000 |  21
//   N2   4337    2    17352   1734   105 |      9313   0.537   1.091 |    2.000    0.000 |  21
//   T2   4783    4    38280   3827   185 |     25927   0.677   1.199 |    1.000    0.000 |  21
//   N2   4783    4    38280   3827   216 |     26989   0.705   1.204 |    1.000    0.000 |  22
//   T2   5227    4    41832   4182   179 |     30127   0.720   1.205 |    1.000    0.000 |  22
//   N2   5227    4    41832   4182   239 |     27151   0.649   1.192 |    2.000    0.000 |  22
//   T2   5779    4    46248   4624   191 |     38731   0.837   1.220 |    1.000    0.000 |  22
//   N2   5779    4    46248   4624   295 |     28373   0.613   1.184 |    2.000    0.000 |  23
//   T2   6359    2    25440   2543   104 |     16777   0.659   1.111 |    1.000    0.000 |  23
//   N2   6359    2    25440   2543   129 |     15983   0.628   1.105 |    2.000    0.000 |  23
//   T2   6967    4    55752   5574   227 |     45761   0.821   1.213 |    1.000    0.000 |  23
//   N2   6967    4    55752   5574   279 |     35147   0.630   1.183 |    1.000    0.000 |  23
//   T2   7757    2    31032   3102   129 |     20377   0.657   1.108 |    1.000    0.000 |  24
//   N2   7757    2    31032   3102   172 |     16813   0.542   1.086 |    1.000    0.500 |  23
//   T2   8537    2    34152   3414   143 |     23441   0.686   1.112 |    1.000    0.000 |  23
//   N2   8537    2    34152   3414   161 |     23263   0.681   1.111 |    3.000    0.000 |  23
//   T2   9341    2    37368   3736   144 |     26659   0.713   1.115 |    1.500    0.500 |  24
//   N2   9341    2    37368   3736   173 |     22903   0.613   1.098 |    1.000    0.000 |  23
//   T2  10271    2    41088   4108   158 |     28523   0.694   1.111 |    1.500    0.500 |  24
//   N2  10271    2    41088   4108   204 |     22759   0.554   1.086 |    1.500    0.500 |  24
//   T2  11351    2    45408   4540   178 |     29467   0.649   1.102 |    3.000    0.000 |  24
//   N2  11351    2    45408   4540   208 |     28421   0.626   1.098 |    2.000    0.500 |  25
//   T2  12539    2    50160   5015   199 |     34639   0.691   1.108 |    1.000    0.000 |  25
//   N2  12539    2    50160   5015   233 |     30811   0.614   1.095 |    1.000    0.000 |  25
//   T2  13679    2    54720   5471   199 |     45941   0.840   1.127 |    1.000    0.000 |  25
//   N2  13679    2    54720   5471   261 |     32873   0.601   1.092 |    2.500    0.500 |  25
//   anchors run: 376; CAP: 0; no D* below Q^2: 0
//
// SEC 3 — THE ESTIMATORS ON EACH POPULATION, THE SCORE, THE CONTROL
//   old range Q >= 31  true: n = 36 | c0 = 1.229 | c1 = 1.446 +- 0.214 (icpt -0.989, rmse 0.679) | c_w = 1.182 +- 0.085 (rmse 0.401) | c_T = 1.071 +- 0.172 (rmse 0.709) | D*/w mean 0.359 med 0.339 | D*/Q^2 mean 3.62e-2 med 3.55e-2
//   decade 1           true: n = 250 | c0 = 1.257 | c1 = 1.204 +- 0.069 (icpt 0.357, rmse 0.647) | c_w = 1.097 +- 0.012 (rmse 0.164) | c_T = 1.162 +- 0.028 (rmse 0.347) | D*/w mean 0.526 med 0.517 | D*/Q^2 mean 8.61e-3 med 6.44e-3
//   decade 1 minus SEEN true: n = 244 | c0 = 1.256 | c1 = 1.218 +- 0.070 (icpt 0.256, rmse 0.648) | c_w = 1.098 +- 0.012 (rmse 0.164) | c_T = 1.167 +- 0.029 (rmse 0.347) | D*/w mean 0.527 med 0.517 | D*/Q^2 mean 8.46e-3 med 6.43e-3
//   decade 2           true: n = 21 | c0 = 1.164 | c1 = 0.575 +- 0.134 (icpt 5.018, rmse 0.357) | c_w = 1.028 +- 0.061 (rmse 0.126) | c_T = 1.022 +- 0.138 (rmse 0.255) | D*/w mean 0.707 med 0.691 | D*/Q^2 mean 1.13e-3 med 9.43e-4
//   decade 2 minus SEEN true: n = 20 | c0 = 1.158 | c1 = 0.635 +- 0.143 (icpt 4.489, rmse 0.354) | c_w = 1.033 +- 0.054 (rmse 0.112) | c_T = 1.110 +- 0.117 (rmse 0.209) | D*/w mean 0.715 med 0.694 | D*/Q^2 mean 9.70e-4 med 9.43e-4
//   both decades       true: n = 271 | c0 = 1.250 | c1 = 1.017 +- 0.052 (icpt 1.598, rmse 0.650) | c_w = 1.115 +- 0.012 (rmse 0.169) | c_T = 1.211 +- 0.030 (rmse 0.383) | D*/w mean 0.540 med 0.528 | D*/Q^2 mean 8.03e-3 med 5.99e-3
//   decade 1           null: n = 84 | c0 = 1.242 | c1 = 1.088 +- 0.122 (icpt 1.039, rmse 0.672) | c_w = 1.107 +- 0.021 (rmse 0.163) | c_T = 1.129 +- 0.049 (rmse 0.343) | D*/w mean 0.514 med 0.536 | D*/Q^2 mean 8.37e-3 med 5.86e-3
//   decade 2           null: n = 21 | c0 = 1.144 | c1 = 0.590 +- 0.150 (icpt 4.722, rmse 0.402) | c_w = 1.132 +- 0.039 (rmse 0.080) | c_T = 1.244 +- 0.131 (rmse 0.226) | D*/w mean 0.592 med 0.603 | D*/Q^2 mean 9.80e-4 med 6.20e-4
//   both decades       null: n = 105 | c0 = 1.223 | c1 = 0.856 +- 0.068 (icpt 2.583, rmse 0.645) | c_w = 1.114 +- 0.016 (rmse 0.150) | c_T = 1.233 +- 0.046 (rmse 0.368) | D*/w mean 0.530 med 0.542 | D*/Q^2 mean 6.89e-3 med 4.46e-3
//   matched anchors (both arms): n = 105 | c1 true 0.896 +- 0.065, null 0.856 +- 0.068, |diff| 0.041 | c0 true 1.229, null 1.223 | D*/w mean true 0.561, null 0.530, ratio 0.945
//   matched: D*(null) < D*(true) at 61 of 105 (equal at 0); mean ln(D*null/D*true) = -0.052; T_null/T mean 1.259
//   matched, decade 1 only: n = 84; decade 2 only: n = 21
//   --- score against the pre-registration (bands fixed in the note, section 2) ---
//   P1 decade-1 c1 = 1.204 +- 0.069 vs band [1.20, 1.60] (overlap by 1 SE): HIT
//   P2 decade-1 c0 = 1.257 vs band [1.20, 1.38] and > 1.181: HIT
//   P3 decade-1 c_w = 1.097 vs band [1.05, 1.35] and rmse(width) 0.164 < rmse(Q) 0.647: HIT
//   P4 decade-1 matched |c1 null - c1 true| = 0.025 (<= 0.15) and D*/w ratio null/true = 0.981 (within [0.667, 1.5]): HIT
//   P5 decade-2 c0 = 1.164 vs band [1.22, 1.45] and > decade-1 c0 1.257: MISS
//   P6 c0 moves: old->dec1 0.028, dec1->dec2 0.093, c1 dec1->dec2 0.628; largest vs SE(c1 dec1) 0.069: HIT (HIT = it moves)
//   KILL (a) exponent moves between decades by > 2 SE(c1 dec1) = 0.138: FIRES
//   KILL (b) the null reproduces c within its bar (P4 HIT): FIRES
//   item status by the pre-registered rule: CLOSED
//   --- estimator control on decade-1 anchors: known exponents ---
//   X1 = Q^2 (exponent 2 exactly): c0 = 2.000 | c1 = 2.000 +- 0.000 (icpt 0.000, rmse 0.000)
//   X2 = width (exponent 1, times the gap): c0 = 1.356 | c1 = 1.017 +- 0.066 (icpt 2.281, rmse 0.621)
//   X3 = round(0.35 width): c0 = 1.200 | c1 = 1.017 +- 0.066 (icpt 1.232, rmse 0.621)
//   X3 on the old range Q >= 31: c0 = 1.247 | c1 = 1.020 +- 0.187
//   X3 on decade 2: c0 = 1.083 | c1 = 0.521 +- 0.130
//   float margins, true arithmetic, new range: min m*(D*) = 1.0000; max m*(below D*) = 0.7500; anchors with m*(D*) < 1.5: 170 of 271
//   compute: 376 anchor runs; simplex iterations 2285114, tableau rebuilds 18663 (deterministic; wall-clock on stderr)
//
// done in 1606.0s; assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================================
// (written after the run; every figure below appears in the OUTPUT block)
//
// 1. CUSTODY.  172 integer figures of attack-parity-adversary-01.js SEC 2
//    (m*(Q), m*(width), m*(Q^2), D* at 43 anchors) reproduced, 0 failures,
//    largest float departure from an integer 0.0e+0; summary lines min 0.812,
//    mean 1.181, max 1.439, D*/width mean 0.321 reproduced.  The float engine
//    is licensed by this gate and by the margin gap: min m*(D*) = 1.0000 and
//    max m*(below D*) = 0.7500 over the new range.
//
// 2. THE RUN.  Decade 1: 250 anchors Q = 211 .. 1999, 7 excluded by C > 6000.
//    Decade 2: 21 of 24 targets, Q = 2003 .. 13679.  376 anchor runs, 0 CAP,
//    0 without a D* below Q^2.
//
// 3. NO LAW IN Q [MEASURED].  c1 (OLS ln D* on ln Q) = 1.446 +- 0.214 on the
//    old range, 1.204 +- 0.069 on decade 1 (rmse 0.647), 0.575 +- 0.134 on
//    decade 2; c0 = 1.229, 1.257, 1.164.  Nothing stable in the Q coordinate.
//
// 4. A LAW IN THE INTERVAL LENGTH [MEASURED].  c_w (OLS ln D* on ln width)
//    = 1.097 +- 0.012 with rmse 0.164 on decade 1 (n = 250), 1.028 +- 0.061
//    on decade 2, 1.115 +- 0.012 on both (n = 271); D*/width mean 0.526,
//    median 0.517 on decade 1.  The T coordinate is second, c_T = 1.162 +-
//    0.028 with rmse 0.347.
//
// 5. THE NULL AGREES [MEASURED].  105 matched anchors: c1 true 0.896 +- 0.065
//    vs null 0.856 +- 0.068 (|diff| 0.041); decade-1 matched |diff| 0.025,
//    D*/w ratio null/true 0.981.  Post hoc, untested: D*(null) < D*(true) at
//    61 of 105, mean ln ratio -0.052; T_null/T mean 1.259 (the Mertens
//    discrepancy of the sieve main term, prior art).
//
// 6. SCORE.  P1 HIT (1.204 +- 0.069 vs [1.20, 1.60]), P2 HIT (1.257), P3 HIT
//    (1.097; 0.164 < 0.647), P4 HIT (0.025; 0.981), P5 MISS (1.164 vs
//    [1.22, 1.45]), P6 HIT.  KILL (a) fires (0.628 > 0.138), KILL (b) fires;
//    item CLOSED by the pre-registered rule.
//
// 7. THE CONTROL EXPLAINS (a) AND P5.  X1 = Q^2 returns c1 = 2.000 +- 0.000.
//    X3 = round(0.35 width) returns c0 = 1.200, c1 = 1.017 +- 0.066, rmse
//    0.621 on decade 1 and c1 = 0.521 +- 0.130 on decade 2: a constant
//    fraction of the interval length shows the same through-origin drift, the
//    same Q scatter and the same decade-2 collapse as D*.  Clause (a) fired on
//    the gap-selected sampler; the closure stands on clause (b).
//
// 8. WHAT IS NOT HERE.  One seed; decade 2 gap-selected and 21 anchors; the
//    seven widest decade-1 stretches missing; no exact re-run of any new
//    anchor; the stage-A block was replaced with --force (0 of 169 figures
//    lost), and that block was replaced with --force a second time after
//    --check showed it could not reproduce: per-anchor wall-clock seconds had
//    been printed to stdout.  They now go to stderr; the figures the second
//    force reports as not reproduced are those timings and nothing else.
