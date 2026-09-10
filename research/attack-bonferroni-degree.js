#!/usr/bin/env node
// ============================================================================
// ATTACK: WHAT DEGREE DOES THE BOOLE-FRECHET CERTIFICATE NEED?
// Finishing the verdict that `research/history/staging/attack-DP1-mechanism.md`
// half-reached: is DP1's only known consumer provably dead, or merely weak?
// ============================================================================
// THE INHERITED POSITION. attack-D found and priced one mechanism that eats the
// data DP1 discards. On the 6-lattice (slot s carries n = 6s+5, sieve form of
// {0,-2}, `research/qc/units.js` sections 2 and 5) let X_a be the number of
// survivors in a window of L consecutive SLOTS at position a, over the full
// period M = x#/6 slots, and let n_v = #{a : X_a = v}. A degree-k certificate
// is a polynomial P, deg P <= k, with
//        P(0) >= 1     and     P(v) >= 0 for every integer 1 <= v <= L.
// Then #{a : X_a = 0} <= sum_a P(X_a) = sum_v n_v P(v) = sum_{j<=k} c_j S_j
// with S_j = sum_a binom(X_a, j) the j-point count of the SIFTED SET in a
// window. #empty is a non-negative integer, so the certificate proves
// G2(x#) <= 6L iff the sharp value
//        V_k(L) = min { sum_v n_v P(v) : P admissible of degree <= k }
// is < 1.  attack-D measured degree 2: it certifies G2 <= 12, 114, 390, 2256,
// 18900, 117558 at x = 5..19 against truths 12, 30, 42, 66, 108, 150, an
// over-certification ratio 1.0 -> 783.7 with log-log slope +5.20 against x.
// DEGREE 2 LOSES, AND LOSES BY A POWER OF x. THE OPEN QUESTION IS WHAT DEGREE
// DOES. That is what this script answers.
//
// WHAT IS NEW HERE.
//  (B) THEOREM V, a complete classification of the LP vertices, proved in the
//      comment below and then verified against attack-D's exact rational
//      simplex. It turns V_k(L) from an (L+1)-variable LP into a minimisation
//      over floor(k/2) integers, which is what makes degrees 3..6 and window
//      lengths in the tens of thousands computable at all.
//  (C) the first valid L, the certified bound and the over-certification ratio
//      at degrees 2, 3, 4, 5, 6, with the log-log slope of each. [TASK 1]
//  (D) the needed degree k* at L = L_crit, at EIGHT levels, x = 5..29. The
//      inherited growth reading had six. [TASK 2]
//  (E) THEOREM A, a rigorous necessary condition for a degree-k certificate,
//      and the divergence corollary it yields. [TASK 2]
//  (F) the input cost: which k-point correlations our proven structure supplies
//      and what it costs to assemble S_k from them. [TASK 3]
//
// THEOREM V (the vertex classification). Fix L and k <= L. Every vertex of the
// feasible set {P : deg P <= k, P(0) >= 1, P(v) >= 0 for v = 1..L} is
//      k = 2m even:   P(z) = prod_{i=1..m} (z-s_i)(z-s_i-1) / prod s_i(s_i+1)
//      k = 2m+1 odd:  P(z) = (L-z)/L * prod_{i=1..m} (z-s_i)(z-s_i-1)
//                                                      / prod s_i(s_i+1)
// with integers s_i >= 1 and s_i + 1 <= L.
// PROOF. The feasible set is pointed: if Q and -Q are both recession
// directions then Q vanishes at 0..L, and deg Q <= k <= L forces Q = 0. The
// objective sum_v n_v P(v) is >= 0 on the feasible set, so the minimum is
// attained at a vertex. A vertex has k+1 active constraints with independent
// gradients; the gradient of "P(v) >= 0" is the Vandermonde row (1,v,..,v^k),
// so the k+1 active constraints sit at k+1 DISTINCT points. If P(0) >= 1 were
// slack, P would vanish at k+1 distinct points with deg P <= k, so P = 0,
// contradicting P(0) >= 1. So P(0) = 1 and P has k distinct simple roots
// v_1 < ... < v_k in {1..L}, hence P = a * prod (z - v_i). On (v_j, v_{j+1})
// the sign of prod is (-1)^{k-j}. Non-negativity at every integer of [1,L]
// forbids an integer inside any interval on which P < 0.
//   k even, a > 0: sign below v_1 is +, above v_k is +, and the negative
// intervals are (v_1,v_2), (v_3,v_4), ..., (v_{k-1},v_k); each must contain no
// integer, so v_2 = v_1+1, ..., v_k = v_{k-1}+1: m consecutive pairs. P(0) =
// a * prod v_i > 0, normalise to 1. This is the stated form.
//   k even, a < 0: P(0) = a * prod v_i < 0, excluded.
//   k odd, a > 0: P(0) = -a * prod v_i < 0, excluded.
//   k odd, a < 0: the negative intervals are (v_k, inf), (v_{k-2},v_{k-1}),
// ..., (v_1,v_2), so v_k >= L hence v_k = L, and v_2 = v_1+1, ...,
// v_{k-1} = v_{k-2}+1: m pairs plus a root at L. P(0) = -a * prod v_i > 0.
// This is the stated form. QED.
// Part B checks the theorem against the exact simplex on every row it can afford.
//
// UNITS. Everything is in SLOTS on the 6-lattice unless a column says
// otherwise (`units.js` section 2). L_crit = G2(x#)/6 exactly, and "no empty
// window of L slots" is literally "G2(x#) <= 6L". t = L * d is the mean window
// count in SLOT density d = survivors/M, NOT the per-integer density d/6.
// ============================================================================
'use strict';

const t00 = Date.now();
const out = [];
function log(s) { out.push(s); console.log(s); }
const pad = (v, n) => String(v).padStart(n);

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------
function primesUpTo(n) {
  const s = new Uint8Array(n + 1), o = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return o;
}
function modinv(a, p) { let r = 1; for (let e = p - 2; e > 0; e >>= 1) { if (e & 1) r = (r * a) % p; a = (a * a) % p; } return r; }

// exact G2 ladder in INTEGERS, from research/exact-g2-ladder.js:34-41
const G2 = { 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258 };
const LEVELS = [5, 7, 11, 13, 17, 19, 23, 29];

function tile(x) {
  const ps = primesUpTo(x).filter(p => p >= 5);
  let M = 1; for (const p of ps) M *= p;                 // = x#/6 slots
  const A = new Uint8Array(M).fill(1);
  for (const p of ps) {
    const i6 = modinv(6 % p, p);
    const r0 = (((-5 % p) + p) % p) * i6 % p;            // 6s+5 = 0 mod p
    const r1 = (((p - 2 - 5) % p + p) % p) * i6 % p;     // 6s+5 = p-2 mod p
    for (let s = r0; s < M; s += p) A[s] = 0;
    for (let s = r1; s < M; s += p) A[s] = 0;
  }
  let cnt = 0; for (let s = 0; s < M; s++) cnt += A[s];
  return { x, A, M, ps, cnt, d: cnt / M };
}
function maxGapSlots(A, M) {                              // cyclic, streaming
  let first = -1, last = -1, g = 0;
  for (let s = 0; s < M; s++) if (A[s]) { if (first < 0) first = s; else if (s - last > g) g = s - last; last = s; }
  if (first + M - last > g) g = first + M - last;
  return g;
}
// cyclic sliding-window histogram, no modulo in the hot loop
function hist(A, M, L) {
  const h = new Int32Array(L + 1);
  let N = 0; for (let i = 0; i < L; i++) N += A[i % M];
  const lim = M - L;
  let a = 0;
  for (; a < lim; a++) { h[N]++; N += A[a + L] - A[a]; }
  for (; a < M; a++) { h[N]++; N += A[a + L - M] - A[a]; }
  return h;
}
function statsOf(h, M) {
  let s1 = 0, s2 = 0, lo = -1, hi = -1;
  for (let v = 0; v < h.length; v++) if (h[v]) { if (lo < 0) lo = v; hi = v; s1 += h[v] * v; s2 += h[v] * v * v; }
  const t = s1 / M, va = s2 / M - t * t;
  return { min: lo, max: hi, t, Var: va, fano: va / t };
}
// exact power moments m_j = sum_v n_v v^j, j = 0..K, over the support only
function powerMoments(h, K) {
  const m = new Array(K + 1).fill(0n);
  for (let v = 0; v < h.length; v++) if (h[v]) {
    const nv = BigInt(h[v]); let p = 1n; const V = BigInt(v);
    for (let j = 0; j <= K; j++) { m[j] += nv * p; p *= V; }
  }
  return m;
}

// ---------------------------------------------------------------------------
// THEOREM V made computational.  Value of the vertex with pairs s_1..s_m:
//   even k = 2m : N / D      with N = sum_j c_j m_j,  D = prod s_i(s_i+1)
//   odd  k = 2m+1: N' / (D*L) with N' = L*N - sum_j c_j m_{j+1}
// where c = coefficients of prod_i (z-s_i)(z-s_i-1).  All BigInt, all exact.
// ---------------------------------------------------------------------------
function pairPolyCoeffs(ss) {                             // prod (z-s)(z-s-1)
  let c = [1n];
  for (const s of ss) {
    const S = BigInt(s), q = [S * (S + 1n), -(2n * S + 1n), 1n];  // (z-s)(z-s-1)
    const r = new Array(c.length + 2).fill(0n);
    for (let i = 0; i < c.length; i++) for (let j = 0; j < 3; j++) r[i + j] += c[i] * q[j];
    c = r;
  }
  return c;
}
// returns {num, den} with value = num/den, exact
function vertexValue(ss, m, L, odd) {
  const c = pairPolyCoeffs(ss);
  let D = 1n; for (const s of ss) D *= BigInt(s) * BigInt(s + 1);
  let N = 0n; for (let j = 0; j < c.length; j++) if (c[j] !== 0n) N += c[j] * m[j];
  if (!odd) return { num: N, den: D };
  let N1 = 0n; for (let j = 0; j < c.length; j++) if (c[j] !== 0n) N1 += c[j] * m[j + 1];
  return { num: BigInt(L) * N - N1, den: D * BigInt(L) };
}
// V_k(L) < 1 ?  minimise over the vertex family of THEOREM V.
// Search in doubles over the multisets {s_1<=..<=s_m}, then re-evaluate the
// best few candidates in exact BigInt and decide num < den exactly. The
// candidate list is the support widened by 2 on each side, plus a coarse grid
// over the whole of [1,L-1] so a far-away optimum cannot hide; part B checks
// the whole procedure against attack-D's exact simplex on the full LP.
function bestVertex(h, M, L, k, KEEP) {
  const m = Math.floor(k / 2), odd = (k % 2) === 1;
  const mom = powerMoments(h, k + 1);
  if (m === 0) {
    if (!odd) return { ok: mom[0] < 1n, ss: [], val: Number(mom[0]) };
    const num = BigInt(L) * mom[0] - mom[1], den = BigInt(L);
    return { ok: num < den, ss: [], val: Number(num) / Number(den) };
  }
  const vs = [], ws = [];
  for (let v = 0; v < h.length; v++) if (h[v]) { vs.push(v); ws.push(h[v] * (odd ? (L - v) / L : 1)); }
  const R = vs.length, vmin = vs[0], vmax = vs[R - 1];
  const cset = new Set();
  for (let s = Math.max(1, vmin - 2); s <= Math.min(L - 1, vmax + 2); s++) cset.add(s);
  // widen with a coarse global grid only while the multiset enumeration stays
  // affordable; part B checks that the core window alone already finds the min
  const nodes = (c) => { let r = 1; for (let i = 0; i < m; i++) r = r * (c + i) / (i + 1); return r; };
  const extra = [];
  const stride = Math.max(1, Math.floor((L - 1) / 40));
  for (let s = 1; s <= L - 1; s += stride) if (!cset.has(s)) extra.push(s);
  for (const s of extra) { if (nodes(cset.size + 1) > 3e6) break; cset.add(s); }
  const cand = [...cset].sort((a, b) => a - b), C = cand.length;
  const G = [];                                  // G[i][j] = (v_j - s_i)(v_j - s_i - 1)
  for (let i = 0; i < C; i++) { const s = cand[i], row = new Float64Array(R); for (let j = 0; j < R; j++) row[j] = (vs[j] - s) * (vs[j] - s - 1); G.push(row); }
  const top = [];                                // KEEP best (val, ss)
  const layers = []; for (let i = 0; i <= m; i++) layers.push(new Float64Array(R));
  layers[0].fill(1);
  const ss = new Array(m);
  const rec = (start, depth, den) => {
    if (depth === m) {
      const arr = layers[m]; let sum = 0;
      for (let j = 0; j < R; j++) sum += ws[j] * arr[j];
      const val = sum / den;
      if (top.length < KEEP || val < top[top.length - 1].val) {
        top.push({ val, ss: ss.slice() });
        top.sort((a, b) => a.val - b.val);
        if (top.length > KEEP) top.pop();
      }
      return;
    }
    for (let i = start; i < C; i++) {
      const s = cand[i], src = layers[depth], dst = layers[depth + 1], g = G[i];
      for (let j = 0; j < R; j++) dst[j] = src[j] * g[j];
      ss[depth] = s;
      rec(i, depth + 1, den * s * (s + 1));
    }
  };
  rec(0, 0, 1);
  let bn = null, bd = null, bss = null;
  for (const c of top) {
    const r = vertexValue(c.ss, mom, L, odd);
    if (bn === null || r.num * bd < bn * r.den) { bn = r.num; bd = r.den; bss = c.ss; }
  }
  return { ok: bn < bd, ss: bss, val: Number(bn) / Number(bd) };
}
// exhaustive over ALL s in [1, L-1], no candidate restriction — validation only
function bestVertexFull(h, M, L, k) {
  const m = Math.floor(k / 2), odd = (k % 2) === 1;
  const mom = powerMoments(h, k + 1);
  if (m === 0) return bestVertex(h, M, L, k, 4);
  let bn = null, bd = null, bss = null; const ss = new Array(m);
  const rec = (start, depth) => {
    if (depth === m) {
      const r = vertexValue(ss, mom, L, odd);
      if (bn === null || r.num * bd < bn * r.den) { bn = r.num; bd = r.den; bss = ss.slice(); }
      return;
    }
    for (let s = start; s <= L - 1; s++) { ss[depth] = s; rec(s, depth + 1); }
  };
  rec(1, 0);
  return { ok: bn < bd, ss: bss, val: Number(bn) / Number(bd) };
}

// ---------------------------------------------------------------------------
// attack-D's exact rational simplex, transcribed from
// research/attack-D-twopoint.js:129-196, used here ONLY as the independent
// check on THEOREM V.  Float tableaux lose this LP at k >= 9 (attack-D
// section 9), so it runs on BigInt fractions.
// ---------------------------------------------------------------------------
function bgcd(a, b) { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) { const t = a % b; a = b; b = t; } return a; }
function rat(n, d = 1n) { if (d < 0n) { n = -n; d = -d; } const g = bgcd(n, d) || 1n; return { n: n / g, d: d / g }; }
const R0 = rat(0n), R1 = rat(1n);
const radd = (a, b) => rat(a.n * b.d + b.n * a.d, a.d * b.d);
const rsub = (a, b) => rat(a.n * b.d - b.n * a.d, a.d * b.d);
const rmul = (a, b) => rat(a.n * b.n, a.d * b.d);
const rdiv = (a, b) => rat(a.n * b.d, a.d * b.n);
const rsgn = (a) => (a.n > 0n ? 1 : a.n < 0n ? -1 : 0);
const rcmp = (a, b) => { const x = a.n * b.d - b.n * a.d; return x > 0n ? 1 : x < 0n ? -1 : 0; };
const rnum = (a) => Number(a.n) / Number(a.d);
function simplexMaxRat(A, b, c) {
  const m = A.length, n = A[0].length, T = [];
  for (let i = 0; i < m; i++) {
    const row = new Array(n + m + 1).fill(R0);
    for (let j = 0; j < n; j++) row[j] = A[i][j];
    row[n + i] = R1; row[n + m] = b[i]; T.push(row);
  }
  const basis = []; for (let i = 0; i < m; i++) basis.push(n + i);
  const run = (cost, ncol) => {
    for (let iter = 0; iter < 200000; iter++) {
      const z = new Array(ncol).fill(R0);
      for (let i = 0; i < m; i++) { const cb = cost[basis[i]]; if (rsgn(cb)) for (let j = 0; j < ncol; j++) if (rsgn(T[i][j])) z[j] = radd(z[j], rmul(cb, T[i][j])); }
      let e = -1;
      for (let j = 0; j < ncol; j++) if (rcmp(rsub(z[j], cost[j]), R0) < 0) { e = j; break; }
      if (e < 0) return true;
      let lv = -1, best = null;
      for (let i = 0; i < m; i++) if (rsgn(T[i][e]) > 0) {
        const r = rdiv(T[i][n + m], T[i][e]);
        if (best === null || rcmp(r, best) < 0 || (rcmp(r, best) === 0 && basis[i] < basis[lv])) { best = r; lv = i; }
      }
      if (lv < 0) return false;
      const pv = T[lv][e];
      for (let j = 0; j <= n + m; j++) if (rsgn(T[lv][j])) T[lv][j] = rdiv(T[lv][j], pv);
      for (let i = 0; i < m; i++) if (i !== lv && rsgn(T[i][e])) { const f = T[i][e]; for (let j = 0; j <= n + m; j++) if (rsgn(T[lv][j])) T[i][j] = rsub(T[i][j], rmul(f, T[lv][j])); }
      basis[lv] = e;
    }
    throw new Error('simplex iteration cap');
  };
  const c1 = new Array(n + m).fill(R0); for (let i = 0; i < m; i++) c1[n + i] = rat(-1n);
  if (!run(c1, n + m)) return null;
  for (let i = 0; i < m; i++) if (basis[i] >= n && rsgn(T[i][n + m])) return null;
  const c2 = new Array(n + m).fill(R0); for (let j = 0; j < n; j++) c2[j] = c[j];
  if (!run(c2, n)) return null;
  const y = new Array(n).fill(R0); for (let i = 0; i < m; i++) if (basis[i] < n) y[basis[i]] = T[i][n + m];
  let val = R0; for (let j = 0; j < n; j++) if (rsgn(c[j])) val = radd(val, rmul(c[j], y[j]));
  return { val, y };
}
function binomBig(L, k) {
  const B = []; for (let j = 0; j <= k; j++) B.push(new Array(L + 1).fill(0n));
  for (let v = 0; v <= L; v++) { let c = 1n; for (let j = 0; j <= k; j++) { B[j][v] = c; c = (c * BigInt(v - j)) / BigInt(j + 1); if (v - j <= 0) c = 0n; } }
  return B;
}
function exactLP(h, L, k) {                                // V_k(L), sharp
  const B = binomBig(L, k), S = new Array(k + 1).fill(0n);
  for (let v = 0; v <= L; v++) if (h[v]) for (let j = 0; j <= k; j++) S[j] += BigInt(h[v]) * B[j][v];
  const A = []; for (let j = 0; j <= k; j++) A.push(B[j].map(z => rat(z)));
  const c = new Array(L + 1).fill(R0); c[0] = R1;
  const r = simplexMaxRat(A, S.map(z => rat(z)), c);
  return r ? rnum(r.val) : NaN;
}

function slope(xs, ys) {                                   // log-log OLS slope
  const n = xs.length, lx = xs.map(Math.log), ly = ys.map(Math.log);
  const mx = lx.reduce((a, b) => a + b) / n, my = ly.reduce((a, b) => a + b) / n;
  let sxy = 0, sxx = 0; for (let i = 0; i < n; i++) { sxy += (lx[i] - mx) * (ly[i] - my); sxx += (lx[i] - mx) ** 2; }
  const b = sxy / sxx;
  let ss = 0; for (let i = 0; i < n; i++) { const r = (ly[i] - my) - b * (lx[i] - mx); ss += r * r; }
  const se = n > 2 ? Math.sqrt(ss / (n - 2) / sxx) : NaN;
  return { b, se };
}

log('='.repeat(78));
log('  WHAT DEGREE DOES THE BOOLE-FRECHET CERTIFICATE NEED?');
log('  ' + new Date().toISOString().slice(0, 10) + ', 6-lattice, sieve form of {0,-2}, SLOTS throughout');
log('='.repeat(78));

// ===========================================================================
// A. THE OBJECT.  Rebuilt independently, and extended one level past attack-D.
// ===========================================================================
log('\n--- A. THE TILE, ONE LEVEL FURTHER THAN THE INHERITED READING ---');
log('   x |      M = x#/6 |    survivors |     d    | L_crit slots | 6*L_crit | G2(x#) | ok');
const TILES = {};
for (const x of LEVELS) {
  const T = tile(x); TILES[x] = T;
  T.L = maxGapSlots(T.A, T.M);
  log(`  ${pad(x, 2)} | ${pad(T.M, 13)} | ${pad(T.cnt, 12)} | ${T.d.toFixed(6)} | ${pad(T.L, 12)} | ${pad(6 * T.L, 8)} | ${pad(G2[x], 6)} | ${6 * T.L === G2[x] ? 'yes' : 'NO'}`);
}
log('  x = 29 is new: M = 29#/6 = 1,078,282,205 slots, enumerated in full. It');
log('  confirms G2(29#) = 258 by exhaustive cyclic maximal-gap search, and it is');
log('  the EIGHTH level of every growth reading below. attack-D had six.');

// ===========================================================================
// B. THEOREM V AGAINST THE SHARP LP
// ===========================================================================
log('\n--- B. THEOREM V (vertex classification) CHECKED AGAINST THE EXACT LP ---');
log('  min over the vertex family, exact BigInt, against attack-D\'s exact');
log('  rational simplex on the full (L+1)-variable LP. Both give V_k(L).');
log('   x |   L | k | family min V_k(L) | simplex V_k(L) | agree | full-s search agrees');
{
  let agree = 0, tot = 0, fullOK = 0, fullTot = 0, bad = [];
  for (const x of [5, 7, 11, 13]) {
    const T = TILES[x];
    for (const L of [T.L, 2 * T.L, 3 * T.L].filter(v => v < T.M && v <= 40)) {
      const h = hist(T.A, T.M, L);
      for (let k = 1; k <= 6; k++) {
        if (k > L) continue;
        const bv = bestVertex(h, T.M, L, k, 6);
        const lp = exactLP(h, L, k);
        const ok = Math.abs(bv.val - lp) <= 1e-9 * Math.max(1, Math.abs(lp));
        tot++; if (ok) agree++; else bad.push(`x=${x} L=${L} k=${k}: family ${bv.val} simplex ${lp}`);
        const fv = bestVertexFull(h, T.M, L, k);
        fullTot++; if (Math.abs(fv.val - bv.val) <= 1e-9 * Math.max(1, Math.abs(bv.val))) fullOK++;
        if (tot <= 24)
          log(`  ${pad(x, 2)} | ${pad(L, 3)} | ${k} | ${pad(bv.val.toExponential(6), 17)} | ${pad(lp.toExponential(6), 14)} | ${ok ? 'yes' : 'NO'}   | ${Math.abs(fv.val - bv.val) < 1e-9 * Math.max(1, bv.val) ? 'yes' : 'NO'}`);
      }
    }
  }
  log(`  THEOREM V vs sharp LP: ${agree}/${tot} rows agree to 1e-9` + (bad.length ? `; mismatches: ${bad.slice(0, 4).join(' | ')}` : '; no mismatch'));
  log(`  restricted s-search vs exhaustive s-search: ${fullOK}/${fullTot} rows agree`);
}

// ===========================================================================
// C. TASK 1: THE FIRST VALID L AT DEGREES 2..6, AND THE SLOPE OF THE PRICE
// ===========================================================================
log('\n--- C. TASK 1: HOW MUCH DOES RAISING THE DEGREE BUY? ---');
log('  NON-MONOTONICITY FIRST, because it dictates the method. Validity of the');
log('  degree-k certificate is NOT upward closed in L. At x = 17, degree 2, the');
log('  sharp value is 1.000818 at L = 3149, 0.987479 at L = 3150 and 1.020035 at');
log('  L = 3151. The criterion carries the term frac(t)(1-frac(t)) with t = L*d,');
log('  which oscillates with L, so the value straddles 1 for a long stretch and');
log('  dips below it at isolated L. A geometric ladder plus bisection therefore');
log('  OVERSHOOTS the first valid L (it returned 3386 here). Every number below');
log('  comes from an exhaustive scan of consecutive L, never from a ladder.');

const DEG = [2, 3, 4, 5, 6];
const firstValid = {}; for (const k of DEG) firstValid[k] = {};

// --- C1. degree 2 exactly, at every level, by the closed pair-correlation form.
// N2(d) = #{s : A[s] = A[s+d] = 1} = prod_{5<=p<=x} rho_p(d), an exact integer,
// with rho_p(d) = p - |{r0, r1, r0-d, r1-d} mod p| and r0, r1 the two killed
// slot classes. m_2(L) = sum_{|d|<L} (L-|d|) N2(d) then updates in O(1) per L,
// so the scan is over CONSECUTIVE L all the way out, with no ladder anywhere.
log('\n  C1. Degree 2, exhaustive consecutive-L scan at all eight levels.');
log('  The certificate at pair s is  m_2 - (2s+1) m_1 + s(s+1) M  <  s(s+1),');
log('  all BigInt; m_1 = L * (#survivors) and m_0 = M are exact by definition.');
{
  // rho_p(d) = p - |{r0, r1, r0-d, r1-d} mod p|, precomputed classes per prime
  const classesOf = (T) => T.ps.map(p => {
    const i6 = modinv(6 % p, p);
    return { p, r0: (((-5 % p) + p) % p) * i6 % p, r1: (((p - 2 - 5) % p + p) % p) * i6 % p };
  });
  const N2of = (cls, d) => {
    let prod = 1n;
    for (const { p, r0, r1 } of cls) {
      const a = ((r0 - d) % p + p) % p, b = ((r1 - d) % p + p) % p;
      let n = 2; if (a !== r0 && a !== r1) n++; if (b !== r0 && b !== r1 && b !== a) n++;
      prod *= BigInt(p - n);
    }
    return prod;
  };
  log('  The pair s is taken at floor(t) only, with floor(t) +- 1 also tested.');
  log('  Justification, and it is exact: writing j = s - floor(t) and f = frac(t),');
  log('  the criterion Var < (t-s)(s+1-t) + s(s+1)/M has first term f(1-f) >= 0 at');
  log('  j = 0 and strictly negative at every j != 0, while the second term gains');
  log('  only about 2tj/M. Since t = L*d and L stays far below M at every level');
  log('  scanned, j = 0 wins. The wide-s check below confirms it.');
  log('\n   Validation of the O(1) recursion against the direct histogram, which is');
  log('   what caught an off-by-one in the prefix sum on the first run of this');
  log('   script (it returned first-valid-L = 6 at x = 7 instead of 19):');
  log('    x |   L | m_2 from recursion | m_2 from histogram | m_1 rec | m_1 hist | agree');
  for (const x of [7, 11, 13, 17]) {
    const T = TILES[x], cls = classesOf(T), n0 = N2of(cls, 0);
    for (const Lt of [T.L, T.L + 7, 3 * T.L, 5 * T.L]) {
      let P = 0n, Q = 0n;
      for (let d = 1; d < T.L; d++) { const n = N2of(cls, d); P += n; Q += BigInt(T.L - d) * n; }
      let m2 = BigInt(T.L) * n0 + 2n * Q;
      for (let L = T.L; L < Lt; L++) { P += N2of(cls, L); m2 = m2 + n0 + 2n * P; }
      const h = hist(T.A, T.M, Lt);
      let d2 = 0n, d1 = 0n;
      for (let v = 0; v < h.length; v++) if (h[v]) { d2 += BigInt(h[v]) * BigInt(v) * BigInt(v); d1 += BigInt(h[v]) * BigInt(v); }
      const m1 = BigInt(Lt) * BigInt(T.cnt);
      log(`   ${pad(x, 2)} | ${pad(Lt, 3)} | ${pad(m2.toString(), 18)} | ${pad(d2.toString(), 18)} | ${pad(m1.toString(), 7)} | ${pad(d1.toString(), 8)} | ${m2 === d2 && m1 === d1 ? 'yes' : 'NO'}`);
    }
  }
  log('   x |  L_crit | first valid L (deg 2) | bound 6L | true G2 |   ratio   | attack-D');
  const AD = { 5: 2, 7: 19, 11: 65, 13: 376, 17: 3150, 19: 19593 };
  const WIDE = [];
  for (const x of LEVELS) {
    const T = TILES[x], M = BigInt(T.M), cnt = BigInt(T.cnt), cls = classesOf(T);
    const CAP = x >= 29 ? 2500000 : 600000;
    const n0 = N2of(cls, 0);
    let P = 0n, Q = 0n;
    for (let d = 1; d < T.L; d++) { const n = N2of(cls, d); P += n; Q += BigInt(T.L - d) * n; }
    let m2 = BigInt(T.L) * n0 + 2n * Q;
    let found = -1;
    for (let L = T.L; L <= CAP; L++) {
      const m1 = BigInt(L) * cnt, t = L * T.d, fl = Math.floor(t);
      for (let s = Math.max(1, fl - 1); s <= fl + 1; s++) {
        const S = BigInt(s), D = S * (S + 1n);
        if (m2 - (2n * S + 1n) * m1 + D * M < D) { found = L; break; }
      }
      if (found > 0) {
        // wide-s audit at the winning L: is floor(t) really optimal?
        let bestS = -1, bestNum = null;
        const wset = new Set();
        for (let s = 1; s <= Math.min(60, L - 1); s++) wset.add(s);
        for (let s = Math.max(1, fl - 60); s <= Math.min(fl + 60, L - 1); s++) wset.add(s);
        for (let s = 1; s <= L - 1; s += Math.max(1, Math.floor((L - 1) / 200))) wset.add(s);
        for (const s of wset) {
          const S = BigInt(s), D = S * (S + 1n);
          const num = m2 - (2n * S + 1n) * m1 + D * M;
          if (bestNum === null || num * (BigInt(bestS) * BigInt(bestS + 1)) < bestNum * D) { bestNum = num; bestS = s; }
        }
        WIDE.push({ x, L: found, fl, bestS });
        break;
      }
      P += N2of(cls, L);                                   // P(L) = sum_{d=1}^{L} N2(d)
      m2 = m2 + n0 + 2n * P;                               // m_2(L+1) = m_2(L) + N2(0) + 2 P(L)
    }
    if (found > 0) firstValid[2][x] = found;
    log(`  ${pad(x, 2)} | ${pad(T.L, 7)} | ${pad(found > 0 ? found : '> ' + CAP, 21)} | ${pad(found > 0 ? 6 * found : '-', 8)} | ${pad(G2[x], 7)} | ${pad(found > 0 ? (6 * found / G2[x]).toFixed(1) : '-', 9)} | ${AD[x] !== undefined ? (AD[x] === found ? 'agrees (' + AD[x] + ')' : 'DIFFERS: ' + AD[x]) : 'new level'}`);
  }
  log('   wide-s audit at each winning L: x | floor(t) | argmin s over a wide scan');
  for (const w of WIDE) log(`     ${pad(w.x, 2)} | ${pad(w.fl, 8)} | ${pad(w.bestS, 24)} | ${w.fl === w.bestS ? 'floor(t) optimal' : 'DIFFERS'}`);
}

// --- C2. degrees 3..6 by exhaustive consecutive-L scan on the histogram.
log('\n  C2. Degrees 3, 4, 5, 6 by exhaustive consecutive-L scan on the exact');
log('  window histogram. Each level carries a wall-clock budget; a degree not');
log('  reached inside it is reported as such rather than guessed.');
log('   x | k | first valid L | bound 6L | true G2 | ratio | scan reached L');
{
  // Fixed L caps, not wall-clock budgets: the output of this script has to be
  // byte-reproducible for research/qc/tails.js to re-run and compare it.
  const CAP2 = { 5: 40, 7: 40, 11: 80, 13: 400, 17: 3000, 19: 17400, 23: 1900 };
  for (const x of [5, 7, 11, 13, 17, 19, 23]) {
    const T = TILES[x], pending = new Set([3, 4, 5, 6]);
    let L = T.L, reached = T.L;
    while (pending.size && L < T.M && L <= CAP2[x]) {
      const h = hist(T.A, T.M, L);
      for (const k of [...pending]) if (bestVertex(h, T.M, L, k, 4).ok) { firstValid[k][x] = L; pending.delete(k); }
      reached = L; L++;
    }
    for (const k of [3, 4, 5, 6]) {
      const f = firstValid[k][x];
      if (f) log(`  ${pad(x, 2)} | ${k} | ${pad(f, 13)} | ${pad(6 * f, 8)} | ${pad(G2[x], 7)} | ${pad((6 * f / G2[x]).toFixed(1), 5)} | ${pad(reached, 14)}`);
      else log(`  ${pad(x, 2)} | ${k} | ${pad('not reached', 13)} | ${pad('-', 8)} | ${pad(G2[x], 7)} | ${pad('-', 5)} | ${pad(reached, 14)}`);
    }
  }
}

// --- C3. the law.
log('\n  C3. THE HEADLINE OF TASK 1. The right independent variable is not x but');
log('  theta(x) = log(x#). The certified bound at degree k tracks exp(theta(x)/k):');
log('  the certificate needs the window count concentrated to relative width');
log('  (t/sigma)^k > M, i.e. L > (sigma/d) * M^(1/k), and log M = theta(x)-log 6.');
log('   k |  x |  ratio 6L/G2 | ln(ratio) | theta(x)/k | ln(ratio) - theta(x)/k');
for (const k of DEG) for (const x of LEVELS) {
  const f = firstValid[k][x]; if (!f) continue;
  const th = Math.log(TILES[x].M) + Math.log(6), r = 6 * f / G2[x];
  log(`   ${k} | ${pad(x, 2)} | ${pad(r.toFixed(1), 12)} | ${pad(Math.log(r).toFixed(4), 9)} | ${pad((th / k).toFixed(4), 10)} | ${pad((Math.log(r) - th / k).toFixed(4), 22)}`);
}
log('\n  The prediction is NOT 1/k. THEOREM V says the odd-degree vertex is the');
log('  even-degree vertex of the SAME m = floor(k/2) pairs multiplied by');
log('  (L-z)/L, a factor lying in [1 - X_max/L, 1] = [1 - d + o(1), 1]. One extra');
log('  odd degree is therefore worth a bounded factor and nothing more, and the');
log('  exponent is set by the number of PAIRS: predicted 1/(2*floor(k/2)).');
log('\n   k | levels | d ln(ratio)/d theta(x) | 1/(2*floor(k/2)) | 1/k    | log-log slope vs x');
for (const k of DEG) {
  const R = LEVELS.filter(x => x >= 7 && firstValid[k][x]);
  if (R.length < 3) { log(`   ${k} | ${pad(R.length, 6)} | too few levels`); continue; }
  const th = R.map(x => Math.log(TILES[x].M) + Math.log(6));
  const ly = R.map(x => Math.log(6 * firstValid[k][x] / G2[x]));
  const n = R.length, mx = th.reduce((a, b) => a + b) / n, my = ly.reduce((a, b) => a + b) / n;
  let sxy = 0, sxx = 0; for (let i = 0; i < n; i++) { sxy += (th[i] - mx) * (ly[i] - my); sxx += (th[i] - mx) ** 2; }
  const b = sxy / sxx;
  let ss = 0; for (let i = 0; i < n; i++) { const rr = (ly[i] - my) - b * (th[i] - mx); ss += rr * rr; }
  const se = n > 2 ? Math.sqrt(ss / (n - 2) / sxx) : NaN;
  const ll = slope(R, R.map(x => 6 * firstValid[k][x] / G2[x]));
  log(`   ${k} | ${pad(R.length, 6)} | ${pad(b.toFixed(4) + ' +- ' + se.toFixed(4), 22)} | ${pad((1 / (2 * Math.floor(k / 2))).toFixed(4), 16)} | ${pad((1 / k).toFixed(4), 6)} | ${ll.b.toFixed(2)} +- ${ll.se.toFixed(2)}`);
}
log('\n  Read this way the verdict is not a slope at all. ln(ratio) is LINEAR in');
log('  theta(x) ~ x with coefficient 1/k, so the over-certification factor grows');
log('  like (x#)^(1/k): EXPONENTIALLY in x at every FIXED degree. attack-D\'s');
log('  "+5.20 log-log slope against x" is that exponential seen through a log-log');
log('  window six levels wide; it is a real measurement of a fit, not of a power.');
log('  Raising the degree divides the exponent by k. It never removes it.');

// ===========================================================================
// D. TASK 2: THE DEGREE THE CERTIFICATE NEEDS AT L = L_crit, EIGHT LEVELS
// ===========================================================================
log('\n--- D. TASK 2: k* = min{k : V_k(L_crit) < 1}, at eight levels ---');
log('  L_crit = G2(x#)/6, where X_min = 1 is forced (the window starting at the');
log('  survivor before the record gap holds exactly one), so the attained set is');
log('  [1, X_max] and the range equals X_max.');
log('   x | L_crit |      M       | Xmin | Xmax |     t     |   Var    | k* | k* - Xmax');
const ROWS = [];
for (const x of LEVELS) {
  const T = TILES[x], L = T.L, h = hist(T.A, T.M, L), st = statsOf(h, T.M);
  let ks = Infinity;
  for (let k = 1; k <= st.max + 4; k++) { if (bestVertex(h, T.M, L, k, 6).ok) { ks = k; break; } }
  ROWS.push({ x, L, M: T.M, min: st.min, max: st.max, t: st.t, Var: st.Var, k: ks, h });
  log(`  ${pad(x, 2)} | ${pad(L, 6)} | ${pad(T.M, 12)} | ${pad(st.min, 4)} | ${pad(st.max, 4)} | ${pad(st.t.toFixed(4), 9)} | ${pad(st.Var.toFixed(4), 8)} | ${pad(ks, 2)} | ${pad(ks - st.max, 9)}`);
}
{
  const R = ROWS.filter(r => r.x >= 7);
  const R6 = R.filter(r => r.x <= 23);
  log('\n  log-log slopes against x. The inherited reading had x = 7..23 only.');
  const f = (sel, key, lab) => {
    const s = slope(sel.map(r => r.x), sel.map(r => r[key]));
    log(`   d log ${lab} / d log x = ${s.b.toFixed(3)} +- ${s.se.toFixed(3)}   (x = ${sel[0].x}..${sel[sel.length - 1].x}, ${sel.length} levels)`);
  };
  f(R6, 'k', 'k*   '); f(R, 'k', 'k*   ');
  f(R6, 'max', 'X_max'); f(R, 'max', 'X_max');
  f(R6, 't', 't    '); f(R, 't', 't    ');
  log('\n  Against the inherited candidate law x^1.70 / ln^2 x, local slope 1.70 - 2/ln x:');
  log('    x |    t     | x^1.70/ln^2 x | t / law | local slope of the law');
  for (const r of R) {
    const law = Math.pow(r.x, 1.70) / Math.log(r.x) ** 2;
    log(`   ${pad(r.x, 2)} | ${pad(r.t.toFixed(4), 8)} | ${pad(law.toFixed(4), 13)} | ${pad((r.t / law).toFixed(4), 7)} | ${(1.70 - 2 / Math.log(r.x)).toFixed(3)}`);
  }
  const xm = Math.exp(R.map(r => Math.log(r.x)).reduce((a, b) => a + b) / R.length);
  log(`   log-mean level x = ${xm.toFixed(1)}, local slope of the law there = ${(1.70 - 2 / Math.log(xm)).toFixed(3)}`);
  log('\n  A law with no free exponent, forced by the definition of t:');
  log('    t = L_crit * d = (G2(x#)/6) * d, and d = prod_{5<=p<=x} (p-2)/p exactly.');
  log('    x | (G2/6)*d, from the ladder | t measured | equal');
  for (const r of ROWS) {
    const T = TILES[r.x]; let dd = 1; for (const p of T.ps) dd *= (p - 2) / p;
    log(`   ${pad(r.x, 2)} | ${pad(((G2[r.x] / 6) * dd).toFixed(6), 25)} | ${pad(r.t.toFixed(6), 10)} | ${Math.abs((G2[r.x] / 6) * dd - r.t) < 1e-9 ? 'yes' : 'NO'}`);
  }
}

// ===========================================================================
// E. TASK 2, THE PROOF SIDE.  THEOREM A and the divergence corollary.
// ===========================================================================
log('\n--- E. THEOREM A: a rigorous necessary condition on the degree ---');
log('  THEOREM A. Let m = floor(k/2) and suppose a degree-k certificate succeeds');
log('  at window length L. By THEOREM V the optimal P is');
log('     P(z) = [ (L-z)/L ]^(k odd) * prod_{i=1..m} (z-s_i)(z-s_i-1)/(s_i(s_i+1)).');
log('  For any integer v >= 0 and any integer s >= 1 with s not in {v-1, v},');
log('  (v-s)(v-s-1) is a product of two integers of the same sign differing by 1,');
log('  so (v-s)(v-s-1) >= 2, and');
log('     (v-s)(v-s-1)/(s(s+1)) >= 2/((v+1)(v+2))      [minimised at s = v+1].');
log('  Let U = union_i {s_i, s_i+1}, so |U| <= k. Then for every v in the support');
log('  outside U,  P(v) >= r^m * (L-X_max)/L  with r = 2/((X_max+1)(X_max+2)).');
log('  Since sum_v n_v P(v) < 1,');
log('     M - kappa_k  <  ( (X_max+1)(X_max+2)/2 )^m * L/(L-X_max)          (A)');
log('  where kappa_k = max total mass of any k values of the histogram. QED.');
log('  COROLLARY.  k >= 2 * [ log(M - kappa_k) - log(L/(L-X_max)) ] / log((X_max+1)(X_max+2)/2).');
log('  The (L-X_max)/L factor applies only when k is ODD; for even k it is 1.');
log('  At k = k* the m pairs already cover the whole support, so kappa_k = M and');
log('  (A) is vacuous — that is the theorem working, not failing. The bite is one');
log('  degree lower, so the table reports k_low, the smallest k for which (A) can');
log('  hold at all: every k below k_low is PROVED unable to certify at L_crit.');
log('\n   x | L_crit | Xmax |  k_low | kappa at k_low-1 / M | M - kappa | RHS of (A) at k_low-1 | violated | k*');
{
  const KLOW = {};
  const rhsOf = (r, kk) => {
    const m = Math.floor(kk / 2), base = (r.max + 1) * (r.max + 2) / 2;
    const corr = (kk % 2 === 1) ? (r.L > r.max ? r.L / (r.L - r.max) : Infinity) : 1;
    return Math.pow(base, m) * corr;
  };
  for (const r of ROWS) {
    const vals = []; for (let v = 0; v < r.h.length; v++) if (r.h[v]) vals.push(r.h[v]);
    vals.sort((a, b) => b - a);
    const kap = (kk) => { let a = 0; for (let i = 0; i < Math.min(kk, vals.length); i++) a += vals[i]; return a; };
    let klow = 0; while (klow <= r.max + 4 && !(r.M - kap(klow) < rhsOf(r, klow))) klow++;
    KLOW[r.x] = klow;
    const kf = Math.max(0, klow - 1);
    log(`  ${pad(r.x, 2)} | ${pad(r.L, 6)} | ${pad(r.max, 4)} | ${pad(klow, 6)} | ${pad((kap(kf) / r.M).toExponential(3), 20)} | ${pad((r.M - kap(kf)).toExponential(4), 9)} | ${pad(rhsOf(r, kf).toExponential(4), 21)} | ${(r.M - kap(kf)) >= rhsOf(r, kf) ? 'yes' : 'NO'}      | ${r.k}`);
  }
  log('\n  The corollary column is an UNCONDITIONAL lower bound on k*: any k below');
  log('  it violates (A) and therefore cannot certify at L_crit. Its growth:');
  const R = ROWS.filter(r => r.x >= 7);
  const s = slope(R.map(r => r.x), R.map(r => KLOW[r.x]));
  log(`   k_low = ${R.map(r => KLOW[r.x]).join(', ')} at x = ${R.map(r => r.x).join(', ')}`);
  log(`   d log k_low / d log x = ${s.b.toFixed(3)} +- ${s.se.toFixed(3)} over x = 7..29`);
  log('\n  THE DIVERGENCE ARGUMENT, in closed form. Drop kappa_k entirely by using');
  log('  the trivial kappa_k <= k * n_max <= k * M * pmax, pmax = max_v n_v / M:');
  log('   x |  pmax   | k*pmax at k=k* | log(M) = theta(x)-log6 | log((Xmax+1)(Xmax+2)/2) | 2logM/log(base)');
  for (const r of ROWS) {
    const h = r.h; let nmax = 0; for (let v = 0; v < h.length; v++) if (h[v] > nmax) nmax = h[v];
    const pmax = nmax / r.M, base = (r.max + 1) * (r.max + 2) / 2;
    log(`  ${pad(r.x, 2)} | ${pad(pmax.toFixed(5), 7)} | ${pad((r.k * pmax).toFixed(4), 14)} | ${pad(Math.log(r.M).toFixed(4), 22)} | ${pad(Math.log(base).toFixed(4), 23)} | ${(2 * Math.log(r.M) / Math.log(base)).toFixed(3)}`);
  }
  log('  Whenever k*pmax <= 1/2 the corollary reads k >= 2 log(M/2)/log((Xmax+1)(Xmax+2)/2).');
  log('  log M = theta(x) - log 6 ~ x by the PNT, and X_max <= L_crit = G2(x#)/6, so');
  log('  the denominator is at most 2 log G2(x#) + O(1). Hence');
  log('        k*  >=  ( theta(x) - O(1) ) / ( log G2(x#) + O(1) ).');
  log('  Any polynomial upper bound G2(x#) = O(x^B) — and 4.2665 is one — turns');
  log('  this into k* >= (1 + o(1)) * x / (B log x), which DIVERGES, and diverges');
  log('  faster than any power of log x. The bound is self-defeating: the better');
  log('  the G2 bound you assume, the higher the degree the certificate needs.');
  log('\n  AGAINST THE CORPUS ESTIMATE ALREADY ON RECORD. research/sift-limit-attack.md');
  log('  line 186 states, as an unproved piece of moment arithmetic, that upgrading');
  log('  almost-all to all positions by moments alone "needs the k-th moment at');
  log('  k >~ 2 ln W / ln(delta l)". Here W = x# INTEGERS and delta*l = t, the mean');
  log('  window count. THEOREM A is the proof of that estimate up to a factor, and');
  log('  the two brackets straddle the measured k* at every level:');
  log('   x | THEOREM A lower bound | k* measured | corpus estimate 2 lnW/ln t | k*/bound | k*/estimate');
  for (const r of ROWS) {
    if (r.x < 7) continue;
    const base = (r.max + 1) * (r.max + 2) / 2;
    const lo = 2 * Math.log(r.M) / Math.log(base);
    const est = 2 * Math.log(6 * r.M) / Math.log(r.t);
    log(`  ${pad(r.x, 2)} | ${pad(lo.toFixed(3), 21)} | ${pad(r.k, 11)} | ${pad(est.toFixed(3), 26)} | ${pad((r.k / lo).toFixed(3), 8)} | ${(r.k / est).toFixed(3)}`);
  }
  log('  The proven bound sits below k* and the corpus estimate above it, and the');
  log('  ratio k*/bound climbs across the range. Both have the same shape,');
  log('  theta(x) over a log of the window count, and that shape is now PROVED to');
  log('  be a lower bound rather than assumed.');
}

// ===========================================================================
// F. TASK 3: WHAT THE INPUT COSTS, AND WHERE IT RUNS OUT
// ===========================================================================
log('\n--- F. TASK 3: CAN OUR PROVEN STRUCTURE SUPPLY THE k-POINT INPUT? ---');
log('  S_k = sum_a binom(X_a,k) = M * sum over k-subsets {0<=i_1<..<i_k<L} of');
log('  the k-point correlation N_k(i_2-i_1, .., i_k-i_1). So degree k needs the');
log('  k-POINT correlation of the sifted set at every lag vector inside a window.');
log('  Our proven asset is the exact PAIR correlation J_5 (paper/variance-note.md');
log('  Theorem 1) plus the mod-30 five-lag rigidity. The question is whether the');
log('  k-point analogue exists for k >= 3.');
log('\n  IT DOES, and by the same one-line CRT argument. The survivor set is cut');
log('  out by independent local conditions, one per prime, so for any slot-lag');
log('  vector (d_1..d_{k-1}) the k-point count over the period is the exact');
log('  integer  N_k = prod_{5<=p<=x} rho_p(d),  rho_p(d) = p - |R u (R-d_1) u ..|');
log('  with R = {r0, r1} the two killed SLOT classes mod p (units.js section 2:');
log('  the lattice is slots, and the first draft of this table used the INTEGER');
log('  classes {0,-2} instead, which broke the identity at x = 11 and 13 while');
log('  passing at x = 7 by coincidence). Verified against direct enumeration:');
log('   x | k | lag vectors tested | product formula = direct count');
for (const x of [7, 11, 13]) {
  const T = TILES[x];
  const cls = T.ps.map(p => { const i6 = modinv(6 % p, p); return { p, r0: (((-5 % p) + p) % p) * i6 % p, r1: (((p - 2 - 5) % p + p) % p) * i6 % p }; });
  for (const k of [2, 3, 4, 5]) {
    const lags = [];
    const mk = (pre) => { if (pre.length === k - 1) { lags.push(pre.slice()); return; } for (let d = (pre.length ? pre[pre.length - 1] + 1 : 1); d <= 12; d++) { pre.push(d); mk(pre); pre.pop(); } };
    mk([]);
    let tested = 0, ok = 0;
    for (const dv of lags.slice(0, 40)) {
      let direct = 0;
      for (let sl = 0; sl < T.M; sl++) { if (!T.A[sl]) continue; let good = 1; for (const d of dv) if (!T.A[(sl + d) % T.M]) { good = 0; break; } direct += good; }
      let prod = 1;
      for (const { p, r0, r1 } of cls) {
        const S = new Set([r0, r1]);
        for (const d of dv) { S.add(((r0 - d) % p + p) % p); S.add(((r1 - d) % p + p) % p); }
        prod *= (p - S.size);
      }
      tested++; if (prod === direct) ok++;
    }
    log(`  ${pad(x, 2)} | ${k} | ${pad(tested, 18)} | ${ok}/${tested} exact`);
  }
}
log('\n  So the input does NOT run out: every k-point correlation of the sifted');
log('  set on the tile is a finite Euler product, exact, for every k. What runs');
log('  out is the ASSEMBLY. To form S_k the certificate must sum the k-point');
log('  correlation over every lag vector inside the window:');
log('   x | L_crit | k* | distinct lag vectors C(L_crit-1, k*-1) needed for S_{k*}');
for (const r of ROWS) {
  let c = 1; for (let i = 0; i < r.k - 1; i++) c = c * (r.L - 1 - i) / (i + 1);
  log(`  ${pad(r.x, 2)} | ${pad(r.L, 6)} | ${pad(r.k, 2)} | ${c.toExponential(4)}`);
}
log('  and each of those is a product over pi(x) primes whose local factor is');
log('  p - 2k + (collisions), which is ZERO once 2k > p for a sifting prime, i.e.');
log('  the k-point correlation vanishes identically for k > (x+1)/2 unless the');
log('  lag vector is admissible at every small prime. Cross-check of that edge:');
log('   x | smallest k at which the consecutive lag vector 1,2,..,k-1 is inadmissible');
for (const x of [7, 11, 13, 17, 19, 23, 29]) {
  const T = TILES[x];
  const cls = T.ps.map(p => { const i6 = modinv(6 % p, p); return { p, r0: (((-5 % p) + p) % p) * i6 % p, r1: (((p - 2 - 5) % p + p) % p) * i6 % p }; });
  let kk = 0;
  for (let k = 2; k <= 60; k++) {
    let zero = false;
    for (const { p, r0, r1 } of cls) {
      const S = new Set([r0, r1]);
      for (let d = 1; d < k; d++) { S.add(((r0 - d) % p + p) % p); S.add(((r1 - d) % p + p) % p); }
      if (S.size >= p) { zero = true; break; }
    }
    if (zero) { kk = k; break; }
  }
  log(`  ${pad(x, 2)} | ${kk}`);
}
log('  Saturation at the smallest sifting prime happens almost at once, and it');
log('  is NOT a limit on the certificate: S_k sums the k-point count over all');
log('  k-subsets of the window, and the inadmissible subsets contribute zero,');
log('  correctly. The input is exact for every k.');
log('  TASK 3 VERDICT: the certificate does NOT die of missing input. Its only');
log('  cause of death is the degree, and that is one reason, not two.');

// ===========================================================================
// G. THE ONE THING THAT MUST NOT BE CONFLATED
// ===========================================================================
log('\n--- G. NOT natal-cap-06\'s BONFERRONI ---');
log('  research/natal-cap-06-bonferroni.js runs Bonferroni over the SIEVE CLASSES');
log('  A_q; its terms |A_T| are divisor-class counts, which is one-point data and');
log('  therefore INSIDE DP1, and its depth is the hit multiplicity h(r), measured');
log('  growing like ln ln W (natal-cap-06-bonferroni.js:316). Everything above');
log('  runs Boole-Frechet over the SURVIVOR EVENTS; its terms are correlations of');
log('  the sifted set, which is OUTSIDE DP1, and its depth is the window count.');
log('  Two different quantities on two different objects (attack-D section 4).');
log('  The measured depths here and there are printed side by side so the');
log('  substitution cannot be made by accident:');
log('  natal-cap-06 reading 5 begins at research/natal-cap-06-bonferroni.js:316;');
  log('  the sentence quoted next is at lines 319-320 of that file:');
log('  "needed depth marches 1,3,3,5,5,7,...,15 by @127. The depth itself grows');
log('  only like ln ln W". That depth is the hit multiplicity h(r) over sieve');
log('  classes. The depth measured here is the window survivor count. Side by');
log('  side, with the warning that these are NOT the same quantity:');
log('  natal-cap-06 states its own level anchors and this file does not invent');
log('  more: depth 1 dies after @11, depth 3 between @17 and @19, depth 5 by @29,');
log('  and the march reaches 15 by @127. No per-level alignment beyond those');
log('  anchors is asserted. Against that, the depth measured here:');
log('   x | k* at L_crit (window survivor count, OUTSIDE DP1)');
for (const r of ROWS) log(`  ${pad(r.x, 2)} | ${r.k}`);
log('  k* grows as a power of x here; the natal-cap-06 depth grows like ln ln W.');
log('  Substituting one for the other is the error attack-D section 4 names.');

log(`\nDONE in ${((Date.now() - t00) / 1000).toFixed(1)} s.`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-bonferroni-degree.js
//   invocation:  node research/attack-bonferroni-degree.js
//   code-sha256: 297bf8ba68151c6d4f59e463bb9d830b678f226eec07fcfa0fdc8b6e65d1e933
//   out-sha256:  f401f33c56637b77149fe2b45dc159de1c877b26c291c76c0bb0d1fc47e47942
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     236.4 s
// ============================================================================
// ==============================================================================
//   WHAT DEGREE DOES THE BOOLE-FRECHET CERTIFICATE NEED?
//   2026-08-18, 6-lattice, sieve form of {0,-2}, SLOTS throughout
// ==============================================================================
//
// --- A. THE TILE, ONE LEVEL FURTHER THAN THE INHERITED READING ---
//    x |      M = x#/6 |    survivors |     d    | L_crit slots | 6*L_crit | G2(x#) | ok
//    5 |             5 |            3 | 0.600000 |            2 |       12 |     12 | yes
//    7 |            35 |           15 | 0.428571 |            5 |       30 |     30 | yes
//   11 |           385 |          135 | 0.350649 |            7 |       42 |     42 | yes
//   13 |          5005 |         1485 | 0.296703 |           11 |       66 |     66 | yes
//   17 |         85085 |        22275 | 0.261797 |           18 |      108 |    108 | yes
//   19 |       1616615 |       378675 | 0.234239 |           25 |      150 |    150 | yes
//   23 |      37182145 |      7952175 | 0.213871 |           34 |      204 |    204 | yes
//   29 |    1078282205 |    214708725 | 0.199121 |           43 |      258 |    258 | yes
//   x = 29 is new: M = 29#/6 = 1,078,282,205 slots, enumerated in full. It
//   confirms G2(29#) = 258 by exhaustive cyclic maximal-gap search, and it is
//   the EIGHTH level of every growth reading below. attack-D had six.
//
// --- B. THEOREM V (vertex classification) CHECKED AGAINST THE EXACT LP ---
//   min over the vertex family, exact BigInt, against attack-D's exact
//   rational simplex on the full (L+1)-variable LP. Both give V_k(L).
//    x |   L | k | family min V_k(L) | simplex V_k(L) | agree | full-s search agrees
//    5 |   2 | 1 |       2.000000e+0 |    2.000000e+0 | yes   | yes
//    5 |   2 | 2 |       0.000000e+0 |    0.000000e+0 | yes   | yes
//    5 |   4 | 1 |       2.000000e+0 |    2.000000e+0 | yes   | yes
//    5 |   4 | 2 |       0.000000e+0 |    0.000000e+0 | yes   | yes
//    5 |   4 | 3 |       0.000000e+0 |    0.000000e+0 | yes   | yes
//    5 |   4 | 4 |       0.000000e+0 |    0.000000e+0 | yes   | yes
//    7 |   5 | 1 |       2.000000e+1 |    2.000000e+1 | yes   | yes
//    7 |   5 | 2 |       2.000000e+0 |    2.000000e+0 | yes   | yes
//    7 |   5 | 3 |       1.600000e+0 |    1.600000e+0 | yes   | yes
//    7 |   5 | 4 |       0.000000e+0 |    0.000000e+0 | yes   | yes
//    7 |   5 | 5 |       0.000000e+0 |    0.000000e+0 | yes   | yes
//    7 |  10 | 1 |       2.000000e+1 |    2.000000e+1 | yes   | yes
//    7 |  10 | 2 |       1.900000e+0 |    1.900000e+0 | yes   | yes
//    7 |  10 | 3 |       1.180000e+0 |    1.180000e+0 | yes   | yes
//    7 |  10 | 4 |       6.666667e-2 |    6.666667e-2 | yes   | yes
//    7 |  10 | 5 |       5.333333e-2 |    5.333333e-2 | yes   | yes
//    7 |  10 | 6 |       0.000000e+0 |    0.000000e+0 | yes   | yes
//    7 |  15 | 1 |       2.000000e+1 |    2.000000e+1 | yes   | yes
//    7 |  15 | 2 |       1.285714e+0 |    1.285714e+0 | yes   | yes
//    7 |  15 | 3 |       7.428571e-1 |    7.428571e-1 | yes   | yes
//    7 |  15 | 4 |       4.285714e-2 |    4.285714e-2 | yes   | yes
//    7 |  15 | 5 |       2.666667e-2 |    2.666667e-2 | yes   | yes
//    7 |  15 | 6 |       0.000000e+0 |    0.000000e+0 | yes   | yes
//   11 |   7 | 1 |       2.500000e+2 |    2.500000e+2 | yes   | yes
//   THEOREM V vs sharp LP: 59/59 rows agree to 1e-9; no mismatch
//   restricted s-search vs exhaustive s-search: 59/59 rows agree
//
// --- C. TASK 1: HOW MUCH DOES RAISING THE DEGREE BUY? ---
//   NON-MONOTONICITY FIRST, because it dictates the method. Validity of the
//   degree-k certificate is NOT upward closed in L. At x = 17, degree 2, the
//   sharp value is 1.000818 at L = 3149, 0.987479 at L = 3150 and 1.020035 at
//   L = 3151. The criterion carries the term frac(t)(1-frac(t)) with t = L*d,
//   which oscillates with L, so the value straddles 1 for a long stretch and
//   dips below it at isolated L. A geometric ladder plus bisection therefore
//   OVERSHOOTS the first valid L (it returned 3386 here). Every number below
//   comes from an exhaustive scan of consecutive L, never from a ladder.
//
//   C1. Degree 2, exhaustive consecutive-L scan at all eight levels.
//   The certificate at pair s is  m_2 - (2s+1) m_1 + s(s+1) M  <  s(s+1),
//   all BigInt; m_1 = L * (#survivors) and m_0 = M are exact by definition.
//   The pair s is taken at floor(t) only, with floor(t) +- 1 also tested.
//   Justification, and it is exact: writing j = s - floor(t) and f = frac(t),
//   the criterion Var < (t-s)(s+1-t) + s(s+1)/M has first term f(1-f) >= 0 at
//   j = 0 and strictly negative at every j != 0, while the second term gains
//   only about 2tj/M. Since t = L*d and L stays far below M at every level
//   scanned, j = 0 wins. The wide-s check below confirms it.
//
//    Validation of the O(1) recursion against the direct histogram, which is
//    what caught an off-by-one in the prefix sum on the first run of this
//    script (it returned first-valid-L = 6 at x = 7 instead of 19):
//     x |   L | m_2 from recursion | m_2 from histogram | m_1 rec | m_1 hist | agree
//     7 |   5 |                177 |                177 |      75 |       75 | yes
//     7 |  12 |                980 |                980 |     180 |      180 | yes
//     7 |  15 |               1509 |               1509 |     225 |      225 | yes
//     7 |  25 |               4063 |               4063 |     375 |      375 | yes
//    11 |   7 |               2615 |               2615 |     945 |      945 | yes
//    11 |  14 |               9910 |               9910 |    1890 |     1890 | yes
//    11 |  21 |              21555 |              21555 |    2835 |     2835 | yes
//    11 |  35 |              58257 |              58257 |    4725 |     4725 | yes
//    13 |  11 |              59839 |              59839 |   16335 |    16335 | yes
//    13 |  18 |             151374 |             151374 |   26730 |    26730 | yes
//    13 |  33 |             485795 |             485795 |   49005 |    49005 | yes
//    13 |  55 |            1345281 |            1345281 |   81675 |    81675 | yes
//    17 |  18 |            2030940 |            2030940 |  400950 |   400950 | yes
//    17 |  25 |            3786527 |            3786527 |  556875 |   556875 | yes
//    17 |  54 |           17247728 |           17247728 | 1202850 |  1202850 | yes
//    17 |  90 |           47554638 |           47554638 | 2004750 |  2004750 | yes
//    x |  L_crit | first valid L (deg 2) | bound 6L | true G2 |   ratio   | attack-D
//    5 |       2 |                     2 |       12 |      12 |       1.0 | agrees (2)
//    7 |       5 |                    19 |      114 |      30 |       3.8 | agrees (19)
//   11 |       7 |                    65 |      390 |      42 |       9.3 | agrees (65)
//   13 |      11 |                   376 |     2256 |      66 |      34.2 | agrees (376)
//   17 |      18 |                  3150 |    18900 |     108 |     175.0 | agrees (3150)
//   19 |      25 |                 19593 |   117558 |     150 |     783.7 | agrees (19593)
//   23 |      34 |                202891 |  1217346 |     204 |    5967.4 | new level
//   29 |      43 |               1614994 |  9689964 |     258 |   37558.0 | new level
//    wide-s audit at each winning L: x | floor(t) | argmin s over a wide scan
//       5 |        1 |                        1 | floor(t) optimal
//       7 |        8 |                        8 | floor(t) optimal
//      11 |       22 |                       22 | floor(t) optimal
//      13 |      111 |                      111 | floor(t) optimal
//      17 |      824 |                      824 | floor(t) optimal
//      19 |     4589 |                     4589 | floor(t) optimal
//      23 |    43392 |                    43392 | floor(t) optimal
//      29 |   321579 |                   321579 | floor(t) optimal
//
//   C2. Degrees 3, 4, 5, 6 by exhaustive consecutive-L scan on the exact
//   window histogram. Each level carries a wall-clock budget; a degree not
//   reached inside it is reported as such rather than guessed.
//    x | k | first valid L | bound 6L | true G2 | ratio | scan reached L
//    5 | 3 |             2 |       12 |      12 |   1.0 |              2
//    5 | 4 |             2 |       12 |      12 |   1.0 |              2
//    5 | 5 |             2 |       12 |      12 |   1.0 |              2
//    5 | 6 |             2 |       12 |      12 |   1.0 |              2
//    7 | 3 |            13 |       78 |      30 |   2.6 |             13
//    7 | 4 |             5 |       30 |      30 |   1.0 |             13
//    7 | 5 |             5 |       30 |      30 |   1.0 |             13
//    7 | 6 |             5 |       30 |      30 |   1.0 |             13
//   11 | 3 |            35 |      210 |      42 |   5.0 |             35
//   11 | 4 |            17 |      102 |      42 |   2.4 |             35
//   11 | 5 |             7 |       42 |      42 |   1.0 |             35
//   11 | 6 |             7 |       42 |      42 |   1.0 |             35
//   13 | 3 |           315 |     1890 |      66 |  28.6 |            315
//   13 | 4 |            35 |      210 |      66 |   3.2 |            315
//   13 | 5 |            33 |      198 |      66 |   3.0 |            315
//   13 | 6 |            22 |      132 |      66 |   2.0 |            315
//   17 | 3 |          2660 |    15960 |     108 | 147.8 |           2660
//   17 | 4 |           162 |      972 |     108 |   9.0 |           2660
//   17 | 5 |           139 |      834 |     108 |   7.7 |           2660
//   17 | 6 |            49 |      294 |     108 |   2.7 |           2660
//   19 | 3 |         17250 |   103500 |     150 | 690.0 |          17250
//   19 | 4 |           518 |     3108 |     150 |  20.7 |          17250
//   19 | 5 |           418 |     2508 |     150 |  16.7 |          17250
//   19 | 6 |           133 |      798 |     150 |   5.3 |          17250
//   23 | 3 |   not reached |        - |     204 |     - |           1900
//   23 | 4 |          1805 |    10830 |     204 |  53.1 |           1900
//   23 | 5 |          1540 |     9240 |     204 |  45.3 |           1900
//   23 | 6 |           312 |     1872 |     204 |   9.2 |           1900
//
//   C3. THE HEADLINE OF TASK 1. The right independent variable is not x but
//   theta(x) = log(x#). The certified bound at degree k tracks exp(theta(x)/k):
//   the certificate needs the window count concentrated to relative width
//   (t/sigma)^k > M, i.e. L > (sigma/d) * M^(1/k), and log M = theta(x)-log 6.
//    k |  x |  ratio 6L/G2 | ln(ratio) | theta(x)/k | ln(ratio) - theta(x)/k
//    2 |  5 |          1.0 |    0.0000 |     1.7006 |                -1.7006
//    2 |  7 |          3.8 |    1.3350 |     2.6736 |                -1.3386
//    2 | 11 |          9.3 |    2.2285 |     3.8725 |                -1.6440
//    2 | 13 |         34.2 |    3.5317 |     5.1550 |                -1.6233
//    2 | 17 |        175.0 |    5.1648 |     6.5716 |                -1.4068
//    2 | 19 |        783.7 |    6.6641 |     8.0438 |                -1.3798
//    2 | 23 |       5967.4 |    8.6941 |     9.6115 |                -0.9175
//    2 | 29 |      37558.0 |   10.5336 |    11.2952 |                -0.7616
//    3 |  5 |          1.0 |    0.0000 |     1.1337 |                -1.1337
//    3 |  7 |          2.6 |    0.9555 |     1.7824 |                -0.8269
//    3 | 11 |          5.0 |    1.6094 |     2.5817 |                -0.9722
//    3 | 13 |         28.6 |    3.3547 |     3.4367 |                -0.0820
//    3 | 17 |        147.8 |    4.9957 |     4.3811 |                 0.6147
//    3 | 19 |        690.0 |    6.5367 |     5.3625 |                 1.1742
//    4 |  5 |          1.0 |    0.0000 |     0.8503 |                -0.8503
//    4 |  7 |          1.0 |    0.0000 |     1.3368 |                -1.3368
//    4 | 11 |          2.4 |    0.8873 |     1.9363 |                -1.0489
//    4 | 13 |          3.2 |    1.1575 |     2.5775 |                -1.4200
//    4 | 17 |          9.0 |    2.1972 |     3.2858 |                -1.0886
//    4 | 19 |         20.7 |    3.0311 |     4.0219 |                -0.9908
//    4 | 23 |         53.1 |    3.9720 |     4.8058 |                -0.8338
//    5 |  5 |          1.0 |    0.0000 |     0.6802 |                -0.6802
//    5 |  7 |          1.0 |    0.0000 |     1.0694 |                -1.0694
//    5 | 11 |          1.0 |    0.0000 |     1.5490 |                -1.5490
//    5 | 13 |          3.0 |    1.0986 |     2.0620 |                -0.9634
//    5 | 17 |          7.7 |    2.0441 |     2.6286 |                -0.5845
//    5 | 19 |         16.7 |    2.8166 |     3.2175 |                -0.4009
//    5 | 23 |         45.3 |    3.8132 |     3.8446 |                -0.0314
//    6 |  5 |          1.0 |    0.0000 |     0.5669 |                -0.5669
//    6 |  7 |          1.0 |    0.0000 |     0.8912 |                -0.8912
//    6 | 11 |          1.0 |    0.0000 |     1.2908 |                -1.2908
//    6 | 13 |          2.0 |    0.6931 |     1.7183 |                -1.0252
//    6 | 17 |          2.7 |    1.0014 |     2.1905 |                -1.1891
//    6 | 19 |          5.3 |    1.6715 |     2.6813 |                -1.0098
//    6 | 23 |          9.2 |    2.2166 |     3.2038 |                -0.9872
//
//   The prediction is NOT 1/k. THEOREM V says the odd-degree vertex is the
//   even-degree vertex of the SAME m = floor(k/2) pairs multiplied by
//   (L-z)/L, a factor lying in [1 - X_max/L, 1] = [1 - d + o(1), 1]. One extra
//   odd degree is therefore worth a bounded factor and nothing more, and the
//   exponent is set by the number of PAIRS: predicted 1/(2*floor(k/2)).
//
//    k | levels | d ln(ratio)/d theta(x) | 1/(2*floor(k/2)) | 1/k    | log-log slope vs x
//    2 |      7 |       0.5441 +- 0.0140 |           0.5000 | 0.5000 | 6.82 +- 0.84
//    3 |      5 |       0.5425 +- 0.0320 |           0.5000 | 0.3333 | 5.52 +- 1.16
//    4 |      6 |       0.2816 +- 0.0140 |           0.2500 | 0.2500 | 3.31 +- 0.46
//    5 |      6 |       0.2937 +- 0.0219 |           0.2500 | 0.2000 | 3.35 +- 0.66
//    6 |      6 |       0.1695 +- 0.0140 |           0.1667 | 0.1667 | 1.92 +- 0.41
//
//   Read this way the verdict is not a slope at all. ln(ratio) is LINEAR in
//   theta(x) ~ x with coefficient 1/k, so the over-certification factor grows
//   like (x#)^(1/k): EXPONENTIALLY in x at every FIXED degree. attack-D's
//   "+5.20 log-log slope against x" is that exponential seen through a log-log
//   window six levels wide; it is a real measurement of a fit, not of a power.
//   Raising the degree divides the exponent by k. It never removes it.
//
// --- D. TASK 2: k* = min{k : V_k(L_crit) < 1}, at eight levels ---
//   L_crit = G2(x#)/6, where X_min = 1 is forced (the window starting at the
//   survivor before the record gap holds exactly one), so the attained set is
//   [1, X_max] and the range equals X_max.
//    x | L_crit |      M       | Xmin | Xmax |     t     |   Var    | k* | k* - Xmax
//    5 |      2 |            5 |    1 |    2 |    1.2000 |   0.1600 |  2 |         0
//    7 |      5 |           35 |    1 |    3 |    2.1429 |   0.4653 |  4 |         1
//   11 |      7 |          385 |    1 |    5 |    2.4545 |   0.7674 |  5 |         0
//   13 |     11 |         5005 |    1 |    7 |    3.2637 |   1.3039 |  8 |         1
//   17 |     18 |        85085 |    1 |    9 |    4.7123 |   1.6633 | 10 |         1
//   19 |     25 |      1616615 |    1 |   11 |    5.8560 |   1.7302 | 12 |         1
//   23 |     34 |     37182145 |    1 |   13 |    7.2716 |   1.9925 | 14 |         1
//   29 |     43 |   1078282205 |    1 |   16 |    8.5622 |   2.7099 | 16 |         0
//
//   log-log slopes against x. The inherited reading had x = 7..23 only.
//    d log k*    / d log x = 1.127 +- 0.125   (x = 7..23, 6 levels)
//    d log k*    / d log x = 1.066 +- 0.099   (x = 7..29, 7 levels)
//    d log X_max / d log x = 1.262 +- 0.055   (x = 7..23, 6 levels)
//    d log X_max / d log x = 1.208 +- 0.053   (x = 7..29, 7 levels)
//    d log t     / d log x = 1.096 +- 0.153   (x = 7..23, 6 levels)
//    d log t     / d log x = 1.091 +- 0.112   (x = 7..29, 7 levels)
//
//   Against the inherited candidate law x^1.70 / ln^2 x, local slope 1.70 - 2/ln x:
//     x |    t     | x^1.70/ln^2 x | t / law | local slope of the law
//     7 |   2.1429 |        7.2181 |  0.2969 | 0.672
//    11 |   2.4545 |       10.2496 |  0.2395 | 0.866
//    13 |   3.2637 |       11.9000 |  0.2743 | 0.920
//    17 |   4.7123 |       15.3888 |  0.3062 | 0.994
//    19 |   5.8560 |       17.2138 |  0.3402 | 1.021
//    23 |   7.2716 |       21.0051 |  0.3462 | 1.062
//    29 |   8.5622 |       27.0093 |  0.3170 | 1.106
//    log-mean level x = 15.5, local slope of the law there = 0.970
//
//   A law with no free exponent, forced by the definition of t:
//     t = L_crit * d = (G2(x#)/6) * d, and d = prod_{5<=p<=x} (p-2)/p exactly.
//     x | (G2/6)*d, from the ladder | t measured | equal
//     5 |                  1.200000 |   1.200000 | yes
//     7 |                  2.142857 |   2.142857 | yes
//    11 |                  2.454545 |   2.454545 | yes
//    13 |                  3.263736 |   3.263736 | yes
//    17 |                  4.712346 |   4.712346 | yes
//    19 |                  5.855986 |   5.855986 | yes
//    23 |                  7.271607 |   7.271607 | yes
//    29 |                  8.562207 |   8.562207 | yes
//
// --- E. THEOREM A: a rigorous necessary condition on the degree ---
//   THEOREM A. Let m = floor(k/2) and suppose a degree-k certificate succeeds
//   at window length L. By THEOREM V the optimal P is
//      P(z) = [ (L-z)/L ]^(k odd) * prod_{i=1..m} (z-s_i)(z-s_i-1)/(s_i(s_i+1)).
//   For any integer v >= 0 and any integer s >= 1 with s not in {v-1, v},
//   (v-s)(v-s-1) is a product of two integers of the same sign differing by 1,
//   so (v-s)(v-s-1) >= 2, and
//      (v-s)(v-s-1)/(s(s+1)) >= 2/((v+1)(v+2))      [minimised at s = v+1].
//   Let U = union_i {s_i, s_i+1}, so |U| <= k. Then for every v in the support
//   outside U,  P(v) >= r^m * (L-X_max)/L  with r = 2/((X_max+1)(X_max+2)).
//   Since sum_v n_v P(v) < 1,
//      M - kappa_k  <  ( (X_max+1)(X_max+2)/2 )^m * L/(L-X_max)          (A)
//   where kappa_k = max total mass of any k values of the histogram. QED.
//   COROLLARY.  k >= 2 * [ log(M - kappa_k) - log(L/(L-X_max)) ] / log((X_max+1)(X_max+2)/2).
//   The (L-X_max)/L factor applies only when k is ODD; for even k it is 1.
//   At k = k* the m pairs already cover the whole support, so kappa_k = M and
//   (A) is vacuous — that is the theorem working, not failing. The bite is one
//   degree lower, so the table reports k_low, the smallest k for which (A) can
//   hold at all: every k below k_low is PROVED unable to certify at L_crit.
//
//    x | L_crit | Xmax |  k_low | kappa at k_low-1 / M | M - kappa | RHS of (A) at k_low-1 | violated | k*
//    5 |      2 |    2 |      1 |             0.000e+0 | 5.0000e+0 |             1.0000e+0 | yes      | 2
//    7 |      5 |    3 |      2 |             5.143e-1 | 1.7000e+1 |             2.5000e+0 | yes      | 4
//   11 |      7 |    5 |      3 |             7.506e-1 | 9.6000e+1 |             2.1000e+1 | yes      | 5
//   13 |     11 |    7 |      4 |             8.092e-1 | 9.5500e+2 |             9.9000e+1 | yes      | 8
//   17 |     18 |    9 |      5 |             8.850e-1 | 9.7870e+3 |             3.0250e+3 | yes      | 10
//   19 |     25 |   11 |      6 |             9.462e-1 | 8.7049e+4 |             1.0864e+4 | yes      | 12
//   23 |     34 |   13 |      7 |             9.679e-1 | 1.1938e+6 |             1.1576e+6 | yes      | 14
//   29 |     43 |   16 |      8 |             9.645e-1 | 3.8268e+7 |             5.7040e+6 | yes      | 16
//
//   The corollary column is an UNCONDITIONAL lower bound on k*: any k below
//   it violates (A) and therefore cannot certify at L_crit. Its growth:
//    k_low = 2, 3, 4, 5, 6, 7, 8 at x = 7, 11, 13, 17, 19, 23, 29
//    d log k_low / d log x = 1.021 +- 0.051 over x = 7..29
//
//   THE DIVERGENCE ARGUMENT, in closed form. Drop kappa_k entirely by using
//   the trivial kappa_k <= k * n_max <= k * M * pmax, pmax = max_v n_v / M:
//    x |  pmax   | k*pmax at k=k* | log(M) = theta(x)-log6 | log((Xmax+1)(Xmax+2)/2) | 2logM/log(base)
//    5 | 0.80000 |         1.6000 |                 1.6094 |                  1.7918 | 1.796
//    7 | 0.51429 |         2.0571 |                 3.5553 |                  2.3026 | 3.088
//   11 | 0.41039 |         2.0519 |                 5.9532 |                  3.0445 | 3.911
//   13 | 0.33247 |         2.6597 |                 8.5182 |                  3.5835 | 4.754
//   17 | 0.29429 |         2.9429 |                11.3514 |                  4.0073 | 5.665
//   19 | 0.30384 |         3.6461 |                14.2958 |                  4.3567 | 6.563
//   23 | 0.27734 |         3.8828 |                17.4313 |                  4.6540 | 7.491
//   29 | 0.23031 |         3.6849 |                20.7986 |                  5.0304 | 8.269
//   Whenever k*pmax <= 1/2 the corollary reads k >= 2 log(M/2)/log((Xmax+1)(Xmax+2)/2).
//   log M = theta(x) - log 6 ~ x by the PNT, and X_max <= L_crit = G2(x#)/6, so
//   the denominator is at most 2 log G2(x#) + O(1). Hence
//         k*  >=  ( theta(x) - O(1) ) / ( log G2(x#) + O(1) ).
//   Any polynomial upper bound G2(x#) = O(x^B) — and 4.2665 is one — turns
//   this into k* >= (1 + o(1)) * x / (B log x), which DIVERGES, and diverges
//   faster than any power of log x. The bound is self-defeating: the better
//   the G2 bound you assume, the higher the degree the certificate needs.
//
//   AGAINST THE CORPUS ESTIMATE ALREADY ON RECORD. research/sift-limit-attack.md
//   line 186 states, as an unproved piece of moment arithmetic, that upgrading
//   almost-all to all positions by moments alone "needs the k-th moment at
//   k >~ 2 ln W / ln(delta l)". Here W = x# INTEGERS and delta*l = t, the mean
//   window count. THEOREM A is the proof of that estimate up to a factor, and
//   the two brackets straddle the measured k* at every level:
//    x | THEOREM A lower bound | k* measured | corpus estimate 2 lnW/ln t | k*/bound | k*/estimate
//    7 |                 3.088 |           4 |                     14.032 |    1.295 | 0.285
//   11 |                 3.911 |           5 |                     17.251 |    1.279 | 0.290
//   13 |                 4.754 |           8 |                     17.432 |    1.683 | 0.459
//   17 |                 5.665 |          10 |                     16.957 |    1.765 | 0.590
//   19 |                 6.563 |          12 |                     18.204 |    1.829 | 0.659
//   23 |                 7.491 |          14 |                     19.378 |    1.869 | 0.722
//   29 |                 8.269 |          16 |                     21.040 |    1.935 | 0.760
//   The proven bound sits below k* and the corpus estimate above it, and the
//   ratio k*/bound climbs across the range. Both have the same shape,
//   theta(x) over a log of the window count, and that shape is now PROVED to
//   be a lower bound rather than assumed.
//
// --- F. TASK 3: CAN OUR PROVEN STRUCTURE SUPPLY THE k-POINT INPUT? ---
//   S_k = sum_a binom(X_a,k) = M * sum over k-subsets {0<=i_1<..<i_k<L} of
//   the k-point correlation N_k(i_2-i_1, .., i_k-i_1). So degree k needs the
//   k-POINT correlation of the sifted set at every lag vector inside a window.
//   Our proven asset is the exact PAIR correlation J_5 (paper/variance-note.md
//   Theorem 1) plus the mod-30 five-lag rigidity. The question is whether the
//   k-point analogue exists for k >= 3.
//
//   IT DOES, and by the same one-line CRT argument. The survivor set is cut
//   out by independent local conditions, one per prime, so for any slot-lag
//   vector (d_1..d_{k-1}) the k-point count over the period is the exact
//   integer  N_k = prod_{5<=p<=x} rho_p(d),  rho_p(d) = p - |R u (R-d_1) u ..|
//   with R = {r0, r1} the two killed SLOT classes mod p (units.js section 2:
//   the lattice is slots, and the first draft of this table used the INTEGER
//   classes {0,-2} instead, which broke the identity at x = 11 and 13 while
//   passing at x = 7 by coincidence). Verified against direct enumeration:
//    x | k | lag vectors tested | product formula = direct count
//    7 | 2 |                 12 | 12/12 exact
//    7 | 3 |                 40 | 40/40 exact
//    7 | 4 |                 40 | 40/40 exact
//    7 | 5 |                 40 | 40/40 exact
//   11 | 2 |                 12 | 12/12 exact
//   11 | 3 |                 40 | 40/40 exact
//   11 | 4 |                 40 | 40/40 exact
//   11 | 5 |                 40 | 40/40 exact
//   13 | 2 |                 12 | 12/12 exact
//   13 | 3 |                 40 | 40/40 exact
//   13 | 4 |                 40 | 40/40 exact
//   13 | 5 |                 40 | 40/40 exact
//
//   So the input does NOT run out: every k-point correlation of the sifted
//   set on the tile is a finite Euler product, exact, for every k. What runs
//   out is the ASSEMBLY. To form S_k the certificate must sum the k-point
//   correlation over every lag vector inside the window:
//    x | L_crit | k* | distinct lag vectors C(L_crit-1, k*-1) needed for S_{k*}
//    5 |      2 |  2 | 1.0000e+0
//    7 |      5 |  4 | 4.0000e+0
//   11 |      7 |  5 | 1.5000e+1
//   13 |     11 |  8 | 1.2000e+2
//   17 |     18 | 10 | 2.4310e+4
//   19 |     25 | 12 | 2.4961e+6
//   23 |     34 | 14 | 5.7317e+8
//   29 |     43 | 16 | 9.8672e+10
//   and each of those is a product over pi(x) primes whose local factor is
//   p - 2k + (collisions), which is ZERO once 2k > p for a sifting prime, i.e.
//   the k-point correlation vanishes identically for k > (x+1)/2 unless the
//   lag vector is admissible at every small prime. Cross-check of that edge:
//    x | smallest k at which the consecutive lag vector 1,2,..,k-1 is inadmissible
//    7 | 3
//   11 | 3
//   13 | 3
//   17 | 3
//   19 | 3
//   23 | 3
//   29 | 3
//   Saturation at the smallest sifting prime happens almost at once, and it
//   is NOT a limit on the certificate: S_k sums the k-point count over all
//   k-subsets of the window, and the inadmissible subsets contribute zero,
//   correctly. The input is exact for every k.
//   TASK 3 VERDICT: the certificate does NOT die of missing input. Its only
//   cause of death is the degree, and that is one reason, not two.
//
// --- G. NOT natal-cap-06's BONFERRONI ---
//   research/natal-cap-06-bonferroni.js runs Bonferroni over the SIEVE CLASSES
//   A_q; its terms |A_T| are divisor-class counts, which is one-point data and
//   therefore INSIDE DP1, and its depth is the hit multiplicity h(r), measured
//   growing like ln ln W (natal-cap-06-bonferroni.js:316). Everything above
//   runs Boole-Frechet over the SURVIVOR EVENTS; its terms are correlations of
//   the sifted set, which is OUTSIDE DP1, and its depth is the window count.
//   Two different quantities on two different objects (attack-D section 4).
//   The measured depths here and there are printed side by side so the
//   substitution cannot be made by accident:
//   natal-cap-06 reading 5 begins at research/natal-cap-06-bonferroni.js:316;
//   the sentence quoted next is at lines 319-320 of that file:
//   "needed depth marches 1,3,3,5,5,7,...,15 by @127. The depth itself grows
//   only like ln ln W". That depth is the hit multiplicity h(r) over sieve
//   classes. The depth measured here is the window survivor count. Side by
//   side, with the warning that these are NOT the same quantity:
//   natal-cap-06 states its own level anchors and this file does not invent
//   more: depth 1 dies after @11, depth 3 between @17 and @19, depth 5 by @29,
//   and the march reaches 15 by @127. No per-level alignment beyond those
//   anchors is asserted. Against that, the depth measured here:
//    x | k* at L_crit (window survivor count, OUTSIDE DP1)
//    5 | 2
//    7 | 4
//   11 | 5
//   13 | 8
//   17 | 10
//   19 | 12
//   23 | 14
//   29 | 16
//   k* grows as a power of x here; the natal-cap-06 depth grows like ln ln W.
//   Substituting one for the other is the error attack-D section 4 names.
//
// DONE in 236.2 s.
// ============================================================================
// READINGS
//
// 1. THEOREM V IS THE RIGHT CLASSIFICATION, AND IT IS WHAT MAKES THE REST
//    COMPUTABLE AT ALL. The minimum over the vertex family agrees with the
//    exact BigInt-rational simplex on the full (L+1)-variable LP on 59/59 rows
//    to 1e-9, and the restricted s-search agrees with an exhaustive s-search on
//    59/59. So V_k(L) is a minimisation over floor(k/2) integers, not an LP in
//    L+1 variables, and window lengths past 10^6 become reachable.
//
// 2. VALIDITY IS NOT MONOTONE IN L, SO A LADDER IS ILLEGAL. At x = 17,
//    degree 2, the sharp value is 1.000818 at L = 3149, 0.987479 at L = 3150
//    and 1.020035 at L = 3151. The criterion carries frac(t)(1-frac(t)) with
//    t = L*d, which oscillates, so the value straddles 1 over a long stretch
//    and dips below at isolated L. A geometric ladder with bisection was tried
//    first here and returned 3386 instead of 3150. Every first-valid-L in this
//    file is from a scan of consecutive L. Anyone re-deriving a threshold of
//    this shape should check monotonicity before bisecting.
//
// 3. DEGREE 2 REPRODUCES THE INHERITED ROW DIGIT FOR DIGIT AND EXTENDS IT TWO
//    LEVELS. First valid L = 2, 19, 65, 376, 3150, 19593, 202891, 1614994 at
//    x = 5..29, certifying G2 <= 12, 114, 390, 2256, 18900, 117558, 1217346,
//    9689964 against truths 12, 30, 42, 66, 108, 150, 204, 258. The
//    over-certification ratio runs 1.0 to 37558.0. The optimal pair is s =
//    floor(t) at every winning L, checked against a wide s scan.
//
// 4. THE PRICE OF A FIXED DEGREE IS EXPONENTIAL IN x, AND RAISING THE DEGREE
//    ONLY DIVIDES THE EXPONENT. Against theta(x) = log(x#) rather than against
//    x, ln(ratio) is linear, with slope 0.5441, 0.5425, 0.2816, 0.2937, 0.1695
//    at k = 2, 3, 4, 5, 6 against the predicted 1/(2*floor(k/2)) = 0.5000,
//    0.5000, 0.2500, 0.2500, 0.1667. The certified bound at fixed degree is
//    therefore about (x#)^(1/(2*floor(k/2))). The log-log slope against x does
//    fall, 6.82 to 1.92 over k = 2..6, and that number is a fit statistic for
//    an exponential seen through a short window, not a growth exponent.
//
// 5. AN ODD DEGREE IS NEARLY WORTHLESS, AND THEOREM V SAYS WHY. The odd vertex
//    is the even vertex of the same floor(k/2) pairs times (L-z)/L, a factor in
//    [1 - X_max/L, 1] which tends to 1 as the density falls. Measured: k = 3
//    tracks k = 2 (0.5425 against 0.5441) and k = 5 tracks k = 4 (0.2937
//    against 0.2816). The exponent is set by the number of PAIRS.
//
// 6. EIGHT LEVELS FOR THE NEEDED DEGREE, AND x = 29 IS NEW. Full enumeration of
//    M = 1078282205 slots confirms G2(29#) = 258 and gives k* = 16 there;
//    k* = 2, 4, 5, 8, 10, 12, 14, 16 at x = 5..29 with
//    d log k*/d log x = 1.066 +- 0.099 over seven levels, against 1.127 +-
//    0.125 over the six the inherited reading had. X_min = 1 is forced at
//    L_crit, so the attained set is the interval [1, X_max] and k* sits within
//    one of X_max at every level.
//
// 7. THEOREM A CLOSES THE ROUTE, AND IT CLOSES IT WITH A REASON. Every k below
//    k_low = 1, 2, 3, 4, 5, 6, 7, 8 (x = 5..29) is PROVED unable to certify at
//    L_crit, and d log k_low/d log x = 1.021 +- 0.051. Asymptotically the same
//    inequality reads k* >= (theta(x) - O(1))/(log G2(x#) + O(1)), so any
//    polynomial bound G2 = O(x^B) forces k* >= (1+o(1))x/(B log x). The bound
//    is self-defeating: the better the G2 bound assumed, the higher the degree
//    needed to reproduce it. Nothing in the argument uses our particular tile
//    beyond X_max <= L and log M ~ x.
//
// 8. THEOREM A PROVES A LINE THE CORPUS ALREADY CARRIED AS AN ASSUMPTION.
//    sift-limit-attack.md line 186 estimates the needed moment order at
//    2 ln W / ln(delta l). Measured k* sits between the proved floor and that
//    estimate at all seven levels, with k*/floor climbing 1.295 to 1.935 and
//    k*/estimate climbing 0.285 to 0.760. Same shape, now proved on one side
//    and converging on the other.
//
// 9. THE GROWTH LAW QUESTION IS DISSOLVED RATHER THAN ANSWERED. t = (G2/6)*d
//    exactly, verified to six decimals at all eight levels, so fitting an
//    exponent to t is fitting one to G2 and there is no free parameter. The
//    inherited x^1.70/ln^2 x candidate overshoots t by a factor running 0.2969
//    to 0.3170 with no trend. It should be dropped, not refined.
//
// 10. THE INPUT DOES NOT RUN OUT, SO THERE IS ONE CAUSE OF DEATH AND NOT TWO.
//     Every k-point correlation of the sifted set on the tile is an exact Euler
//     product N_k = prod_p rho_p(d) over the SLOT classes, matching direct
//     full-period enumeration 12/12 at k = 2 and 40/40 at k = 3, 4, 5, at
//     x = 7, 11, 13. What is expensive is the assembly: S_{k*} at L_crit needs
//     9.8672e+10 distinct lag vectors at x = 29. That is a cost, not a barrier,
//     and it is dwarfed by reading 7.
//
// 11. A UNITS TRAP WORTH RECORDING. The first draft of reading 10's table used
//     the INTEGER classes {0, -2} on the SLOT lattice. It passed at x = 7 by
//     coincidence and failed several rows at x = 11 and 13. The wrong lattice made
//     a plausible partial agreement, not an obvious failure, which is the
//     failure mode qc/units.js section 2 exists for.
//
// 12. REACH. Exact full-period enumeration to x = 29, M = 1078282205 slots;
//     x = 31 needs thirty-one times that and was not attempted. Degree 3 at
//     x = 23 and every degree above 2 at x = 29 were not reached inside their
//     scan caps and say so. The two theorems are not range-limited; every
//     growth reading is.
// ==========================================================================
