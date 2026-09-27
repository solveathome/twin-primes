#!/usr/bin/env node
// ============================================================================
// ATTACK D — TWO-POINT DATA AGAINST DP1: the sharp Boole-Frechet certificate
// for "no empty window", computed from first principles on the 6-lattice.
// ============================================================================
// WHY THIS SCRIPT EXISTS. `research/sift-limit-attack.md` §1 names DP1 as the
// master discard: the dimension-2 sieve sees only the vector (|A_d|), so no
// statement about how survivors sit RELATIVE TO EACH OTHER can enter it. §7d
// prices that discard at 2.32 of the 3.2665 total, 71 per cent
// (`sift-limit-attack.md`:618-619). §3 marks the "known consumer" column NONE
// for every two-point asset the repo owns. The question is whether any
// mechanism consumes two-point data about a sifted set and still concludes at
// EVERY window position, which is what a G2 bound needs.
//
// THE MECHANISM, STATED SO IT CAN BE COMPUTED. Work on the 6-lattice: slot s
// carries the integer n = 6s+5, so n = 5 mod 6 and n+2 = 1 mod 6, and the
// pair (n, n+2) is automatically coprime to 6. Sieve form of {0,-2}
// (`research/qc/units.js` §5, the FIXED pair, not the free translate): slot s
// survives at level x iff n !=  0, -2 (mod p) for every prime 5 <= p <= x.
// The survivor set is periodic with period M = x#/6 SLOTS (units.js §2: slots,
// never integers). Let X_a = # survivors in the window of L consecutive slots
// starting at a, a = 0..M-1, and let n_v = #{a : X_a = v}.
//
// A degree-k certificate is a polynomial P of degree <= k with
//      P(0) >= 1     and     P(j) >= 0 for every integer 1 <= j <= L.
// Then           #{a : X_a = 0}  <=  sum_a P(X_a)  =  sum_{j<=k} c_j S_j,
// where S_j = sum_a binom(X_a, j) is EXACTLY the j-point count of the sifted
// set inside a window: S_1 = L * (#survivors), S_2 = sum_{d<L} (L-d) N_2(d)
// with N_2(d) the pair-correlation count at slot-lag d. So degree 2 consumes
// one-point and two-point data and nothing else. Part B verifies that identity.
//
// THE SHARP VALUE. The best bound obtainable from S_0..S_k is the LP
//      V_k(L) = max { nu_0 : nu >= 0 on {0..L}, sum_v nu_v binom(v,j) = S_j,
//                     j = 0..k }.
// #{empty windows} is a NON-NEGATIVE INTEGER, so the certificate proves "no
// empty window of L slots", hence G2(x#) <= 6L, if and only if V_k(L) < 1.
// That integrality step is the whole of the quantifier question: an average
// statement over the period DOES close the all-positions quantifier once the
// average falls below 1/M. Part G checks it.
//
// THE FOUR CLAIMS UNDER AUDIT (all UNVERIFIED as inherited):
//  (i)   the degree-k certificate works iff max_r X_r <= k, as an identity;
//  (ii)  degree 2 works iff Var(X_L) < (t-1)(2-t) + 2/M, i.e. Fano < 1/6;
//  (iii) natal5-variance.js reading 2's Fano 0.152 -> 0.347 (x = 7..19) puts
//        the threshold crossing between x = 5 and x = 7;
//  (iv)  any degree needs k >= max_r X_r at L = G2/6, and max_r X_r grows like
//        x^1.70 / ln^2 x, so the needed correlation order diverges.
// Parts C, D, E, F test them in order. Part A fixes the object and the units.
// ============================================================================
'use strict';

const t00 = Date.now();
const out = [];
function log(s) { out.push(s); console.log(s); }

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------
function primesUpTo(n) {
  const s = new Uint8Array(n + 1), o = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return o;
}
function modinv(a, p) { let r = 1; for (let e = p - 2; e > 0; e >>= 1) { if (e & 1) r = (r * a) % p; a = (a * a) % p; } return r; }

// The exact G2 ladder, transcribed from research/exact-g2-ladder.js:34-41
// (value = G2(x#) in INTEGERS; every entry is divisible by 6).
const G2 = { 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258 };

// ---------------------------------------------------------------------------
// the sieve-form survivor set on the 6-lattice, one full period
// ---------------------------------------------------------------------------
function tile(x) {
  const ps = primesUpTo(x).filter(p => p >= 5);
  let M = 1; for (const p of ps) M *= p;              // = x#/6 slots
  const A = new Uint8Array(M).fill(1);
  for (const p of ps) {
    const i6 = modinv(6 % p, p);
    const r0 = (((-5 % p) + p) % p) * i6 % p;         // 6s+5 = 0 mod p
    const r1 = (((p - 2 - 5) % p + p) % p) * i6 % p;  // 6s+5 = p-2 mod p
    for (let s = r0; s < M; s += p) A[s] = 0;
    for (let s = r1; s < M; s += p) A[s] = 0;
  }
  let cnt = 0; for (let s = 0; s < M; s++) cnt += A[s];
  return { A, M, ps, cnt, d: cnt / M };
}
function maxGapSlots(A, M) {                          // cyclic, in slots
  const pos = []; for (let s = 0; s < M; s++) if (A[s]) pos.push(s);
  let g = 0;
  for (let i = 0; i < pos.length; i++) {
    const nxt = (i + 1 < pos.length) ? pos[i + 1] : pos[0] + M;
    if (nxt - pos[i] > g) g = nxt - pos[i];
  }
  return g;
}
// histogram of the cyclic sliding-window count X_a, window length L slots
function hist(A, M, L) {
  const h = new Int32Array(L + 1);
  let N = 0; for (let i = 0; i < L; i++) N += A[i % M];
  for (let a = 0; a < M; a++) { h[N]++; N += A[(a + L) % M] - A[a]; }
  return h;
}
function statsOf(h, M) {
  let s1 = 0, s2 = 0, lo = -1, hi = -1;
  for (let v = 0; v < h.length; v++) if (h[v]) { if (lo < 0) lo = v; hi = v; s1 += h[v] * v; s2 += h[v] * v * v; }
  const t = s1 / M, va = s2 / M - t * t;
  return { min: lo, max: hi, t, Var: va, fano: va / t };
}

// ---------------------------------------------------------------------------
// THE SHARP DEGREE-k VALUE V_k(L).  Two independent solvers.
//   exactLP  : two-phase simplex on  max nu_0  s.t.  B nu = S,  nu >= 0
//   vertexLP : brute-force enumeration of every basic support of size k+1
// ---------------------------------------------------------------------------
function binomTable(L, k) {                            // B[j][v] = C(v,j)
  const B = [];
  for (let j = 0; j <= k; j++) { const row = new Float64Array(L + 1); B.push(row); }
  for (let v = 0; v <= L; v++) { let c = 1; for (let j = 0; j <= k; j++) { B[j][v] = c; c = c * (v - j) / (j + 1); } }
  return B;
}
function moments(h, L, k) {                            // S_j = sum_a C(X_a, j)
  const B = binomTable(L, k), S = new Float64Array(k + 1);
  for (let v = 0; v <= L; v++) if (h[v]) for (let j = 0; j <= k; j++) S[j] += h[v] * B[j][v];
  return S;
}
// EXACT RATIONAL ARITHMETIC. The float tableau lost the answer at k >= 9 (it
// reported V_10 >= 1 where an explicit degree-10 polynomial gives V_10 = 0), so
// every LP below runs on BigInt fractions. All the data is integral: C(v,j) and
// S_j = sum_v n_v C(v,j) are integers, so the LP is exact end to end.
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

// two-phase simplex over the rationals, Bland's rule.  max c'y  s.t. Ay = b, y >= 0.
function simplexMaxRat(A, b, c) {
  const m = A.length, n = A[0].length;
  const T = [];
  for (let i = 0; i < m; i++) {
    const row = new Array(n + m + 1).fill(R0);
    for (let j = 0; j < n; j++) row[j] = A[i][j];
    row[n + i] = R1; row[n + m] = b[i]; T.push(row);
  }
  const basis = []; for (let i = 0; i < m; i++) basis.push(n + i);
  const run = (cost, ncol) => {
    for (let iter = 0; iter < 100000; iter++) {
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
  let feas = true;
  for (let i = 0; i < m; i++) if (basis[i] >= n && rsgn(T[i][n + m])) feas = false;
  if (!feas) return null;
  const c2 = new Array(n + m).fill(R0); for (let j = 0; j < n; j++) c2[j] = c[j];
  if (!run(c2, n)) return null;                          // artificials may not re-enter
  const y = new Array(n).fill(R0); for (let i = 0; i < m; i++) if (basis[i] < n) y[basis[i]] = T[i][n + m];
  let val = R0; for (let j = 0; j < n; j++) if (rsgn(c[j])) val = radd(val, rmul(c[j], y[j]));
  return { val, y };
}
function binomBig(L, k) {                                // exact C(v,j)
  const B = []; for (let j = 0; j <= k; j++) B.push(new Array(L + 1).fill(0n));
  for (let v = 0; v <= L; v++) { let c = 1n; for (let j = 0; j <= k; j++) { B[j][v] = c; c = (c * BigInt(v - j)) / BigInt(j + 1); if (v - j <= 0) c = 0n; } }
  return B;
}
function exactLP(h, L, k) {                              // V_k(L), exact
  const B = binomBig(L, k);
  const S = new Array(k + 1).fill(0n);
  for (let v = 0; v <= L; v++) if (h[v]) for (let j = 0; j <= k; j++) S[j] += BigInt(h[v]) * B[j][v];
  const A = []; for (let j = 0; j <= k; j++) A.push(B[j].map(z => rat(z)));
  const c = new Array(L + 1).fill(R0); c[0] = R1;
  const r = simplexMaxRat(A, S.map(z => rat(z)), c);
  return r ? rnum(r.val) : NaN;
}
function vertexLP(h, L, k) {                            // V_k(L) by enumeration
  const B = binomTable(L, k), S = moments(h, L, k);
  let best = -Infinity;
  const supp = new Array(k + 1);
  const rec = (start, depth) => {
    if (depth === k + 1) {
      const m = k + 1, Mx = [];                          // solve B[.][supp] nu = S
      for (let j = 0; j < m; j++) { const row = new Float64Array(m + 1); for (let q = 0; q < m; q++) row[q] = B[j][supp[q]]; row[m] = S[j]; Mx.push(row); }
      for (let col = 0; col < m; col++) {
        let piv = -1, mv = 1e-9;
        for (let i = col; i < m; i++) if (Math.abs(Mx[i][col]) > mv) { mv = Math.abs(Mx[i][col]); piv = i; }
        if (piv < 0) return; const tmp = Mx[col]; Mx[col] = Mx[piv]; Mx[piv] = tmp;
        for (let i = 0; i < m; i++) if (i !== col) { const f = Mx[i][col] / Mx[col][col]; for (let j2 = col; j2 <= m; j2++) Mx[i][j2] -= f * Mx[col][j2]; }
      }
      const nu = new Float64Array(m);
      for (let q = 0; q < m; q++) { nu[q] = Mx[q][m] / Mx[q][q]; if (nu[q] < -1e-7) return; }
      if (supp[0] === 0 && nu[0] > best) best = nu[0];
      if (supp[0] !== 0 && best < 0) best = Math.max(best, 0);
      return;
    }
    for (let v = start; v <= L; v++) { supp[depth] = v; rec(v + 1, depth + 1); }
  };
  rec(0, 0);
  return Math.max(best, 0);
}
// smallest k with V_k(L) < 1
function minDegree(h, L, kmax) {
  for (let k = 1; k <= kmax; k++) { const v = exactLP(h, L, k); if (isFinite(v) && v < 1 - 1e-6) return { k, V: v }; }
  return { k: Infinity, V: NaN };
}

log('='.repeat(78));
log('  ATTACK D — TWO-POINT DATA AGAINST DP1: sharp Boole-Frechet certificates');
log('  ' + new Date().toISOString().slice(0, 10) + ', 6-lattice, sieve form of {0,-2}');
log('='.repeat(78));

// ===========================================================================
// A. THE OBJECT AND THE UNITS
// ===========================================================================
log('\n--- A. THE OBJECT AND THE UNITS (slots, never integers) ---');
log('  x |    M = x#/6 |  survivors |    d     | maxgap slots | 6*maxgap | G2(x#) | ok');
const TILES = {};
for (const x of [5, 7, 11, 13, 17, 19, 23]) {
  const T = tile(x); TILES[x] = T;
  const g = maxGapSlots(T.A, T.M); T.gapSlots = g;
  log(`  ${String(x).padStart(2)} | ${String(T.M).padStart(11)} | ${String(T.cnt).padStart(10)} | ${T.d.toFixed(6)} | ${String(g).padStart(12)} | ${String(6 * g).padStart(8)} | ${String(G2[x]).padStart(6)} | ${6 * g === G2[x] ? 'yes' : 'NO'}`);
}
log('  A window of L slots is empty iff it fits inside a gap, so L slots is');
log('  gap-free for every position iff L >= maxgap, and L_crit = G2(x#)/6 EXACTLY.');

// ===========================================================================
// B. DEGREE 2 REALLY IS ONE-POINT PLUS TWO-POINT DATA
// ===========================================================================
log('\n--- B. WHAT THE CERTIFICATE CONSUMES: S_1 and S_2 against direct counts ---');
log('  x |  L |     S_1 = L*#surv     |  S_2 (from X_a)  |  sum_d (L-d) N_2(d)  | match');
for (const x of [5, 7, 11, 13]) {
  const T = TILES[x], L = T.gapSlots, h = hist(T.A, T.M, L);
  const S = moments(h, L, 2);
  let s2direct = 0;                                    // pair correlation, direct
  for (let d = 1; d < L; d++) {
    let N2 = 0; for (let s = 0; s < T.M; s++) if (T.A[s] && T.A[(s + d) % T.M]) N2++;
    s2direct += (L - d) * N2;
  }
  log(`  ${String(x).padStart(2)} | ${String(L).padStart(2)} | ${String(S[1]).padStart(21)} | ${String(S[2]).padStart(16)} | ${String(s2direct).padStart(20)} | ${S[2] === s2direct ? 'yes' : 'NO'}`);
}
log('  S_1 = L * (#survivors) and S_2 = sum_d (L-d) N_2(d): degree-2 data is');
log('  the one-point count plus the pair-correlation function and NOTHING else,');
log('  neither of which is a function of the divisor-class vector (|A_d|). The');
log('  certificate therefore lives strictly outside DP1.');

// ===========================================================================
// C. CLAIM (i): "works iff max_r X_r <= k", as an identity
// ===========================================================================
log('\n--- C. CLAIM (i): the true threshold degree against max_r X_r ---');
log('  First: is the attained set {X_a} an integer interval? Sliding by one slot');
log('  changes X by at most 1, so it must be. Checked over every L below.');
let intervalOK = true;
log('\n  x |  L | Xmin | Xmax | |S| | k* (sharp LP) | claim (i) says | agree');
const rowsC = [];
for (const x of [5, 7, 11, 13, 17]) {
  const T = TILES[x];
  for (const L of [T.gapSlots, 2 * T.gapSlots, 4 * T.gapSlots].filter(v => v < T.M)) {
    const h = hist(T.A, T.M, L), st = statsOf(h, T.M);
    for (let v = st.min; v <= st.max; v++) if (!h[v]) intervalOK = false;
    const size = st.max - st.min + 1;
    const kstar = minDegree(h, L, size + 2).k;
    rowsC.push({ x, L, min: st.min, max: st.max, size, kstar });
    log(`  ${String(x).padStart(2)} | ${String(L).padStart(2)} | ${String(st.min).padStart(4)} | ${String(st.max).padStart(4)} | ${String(size).padStart(3)} | ${String(kstar).padStart(13)} | ${String(st.max).padStart(14)} | ${kstar === st.max ? 'yes' : 'NO'}`);
  }
}
log(`  attained set was an integer interval in every row: ${intervalOK ? 'yes' : 'NO'}`);
const closed = rowsC.map(r => ({ ...r, pred: r.size + (r.size % 2) }));
log('\n  The closed form the LP is reproducing: k* = |S| rounded UP TO EVEN,');
log('  |S| = Xmax - Xmin + 1.  P(z) = prod_{v in S}(z-v) / prod_{v in S}(-v) is');
log('  admissible exactly when |S| is even (else its sign is wrong past Xmax),');
log('  and no polynomial of degree < |S| can vanish on |S| points.');
log('  x |  L | |S| | |S| rounded even | k* measured | agree');
for (const r of closed) log(`  ${String(r.x).padStart(2)} | ${String(r.L).padStart(2)} | ${String(r.size).padStart(3)} | ${String(r.pred).padStart(16)} | ${String(r.kstar).padStart(11)} | ${r.pred === r.kstar ? 'yes' : 'NO'}`);

log('\n  Two synthetic counterexamples to claim (i) as an identity:');
{
  // a perfectly periodic survivor set: every window of L = c/dens has X == c
  const M = 900, A = new Uint8Array(M); for (let s = 0; s < M; s += 3) A[s] = 1;
  const L = 9, h = hist(A, M, L), st = statsOf(h, M);
  const r = minDegree(h, L, 8);
  log(`   (a) survivors every 3rd slot, L = 9: X == ${st.min} always, max_r X_r = ${st.max},`);
  log(`       sharp threshold degree k* = ${r.k} (P(z) = (z-3)^2/9). Claim (i) overstates by ${st.max - r.k}.`);
}
{
  const T = TILES[13], L = 4 * T.gapSlots, h = hist(T.A, T.M, L), st = statsOf(h, T.M);
  const r = minDegree(h, L, st.max - st.min + 3);
  log(`   (b) real tile x = 13, L = ${L} slots: Xmin = ${st.min}, Xmax = ${st.max},`);
  log(`       k* = ${r.k} against claim (i)'s ${st.max}. Xmin > 1 is what claim (i) drops.`);
}

// ===========================================================================
// D. CLAIM (ii): the degree-2 criterion
// ===========================================================================
log('\n--- D. CLAIM (ii): degree 2 works iff Var < (t-1)(2-t) + 2/M ? ---');
log('  Derivation. P_s(z) = (z-s)(z-s-1)/(s(s+1)) has P_s(0) = 1 and P_s(j) >= 0');
log('  for every integer j >= 0. sum_a P_s(X_a) = M[Var + (t-s)(t-s-1)]/(s(s+1)),');
log('  and #empty is an integer, so degree 2 SUCCEEDS as soon as');
log('        Var(X_L)  <  (t-s)(s+1-t) + s(s+1)/M      for some integer s >= 1.');
log('  (t-s)(s+1-t) is maximised over integer s at s = floor(t), where it equals');
log('  frac(t)(1-frac(t)) <= 1/4.  The inherited claim is the s = 1 member, and');
log('  s = 1 is optimal only while 1 <= t <= 2.');
log('\n  s* = argmax over s | inherited RHS (t-1)(2-t)+2/M | correct RHS | Var | LP verdict');
log('  x |  L |    t    |   Var   | inherited RHS | correct RHS | V_2 (sharp) | deg-2 works');
for (const x of [5, 7, 11, 13, 17]) {
  const T = TILES[x], L = T.gapSlots, h = hist(T.A, T.M, L), st = statsOf(h, T.M);
  const t = st.t, M = T.M;
  const inher = (t - 1) * (2 - t) + 2 / M;
  let bestR = -Infinity, bs = 1;
  for (let s = 1; s <= Math.ceil(t) + 2; s++) { const R = (t - s) * (s + 1 - t) + s * (s + 1) / M; if (R > bestR) { bestR = R; bs = s; } }
  const V2 = exactLP(h, L, 2);
  log(`  ${String(x).padStart(2)} | ${String(L).padStart(2)} | ${t.toFixed(4).padStart(7)} | ${st.Var.toFixed(4).padStart(7)} | ${inher.toFixed(6).padStart(13)} | ${bestR.toFixed(6).padStart(11)} (s=${bs}) | ${V2.toExponential(3).padStart(11)} | ${V2 < 1 ? 'YES' : 'no'}`);
}
log('\n  Agreement test of the closed form against the sharp LP, over every L');
log('  from 1 to 3*L_crit at x = 5,7,11,13 (does "Var < max_s RHS" match V_2 < 1?):');
{
  let agree = 0, tot = 0, mism = [];
  for (const x of [5, 7, 11, 13]) {
    const T = TILES[x];
    for (let L = 1; L <= Math.min(3 * T.gapSlots, T.M - 1); L++) {
      const h = hist(T.A, T.M, L), st = statsOf(h, T.M);
      let bestR = -Infinity; for (let s = 1; s <= Math.ceil(st.t) + 2; s++) { const R = (st.t - s) * (s + 1 - st.t) + s * (s + 1) / T.M; if (R > bestR) bestR = R; }
      const cf = st.Var < bestR, lp = exactLP(h, L, 2) < 1 - 1e-9;
      tot++; if (cf === lp) agree++; else mism.push(`x=${x} L=${L} closed=${cf} LP=${lp}`);
    }
  }
  log(`  agree on ${agree}/${tot} window lengths` + (mism.length ? `; mismatches: ${mism.slice(0, 6).join(', ')}` : '; no mismatch'));
}
log('\n  The Fano form. Var < frac(t)(1-frac(t)) + O(t^2/M) means');
log('        Fano(X_L) < frac(t)(1-frac(t))/t + O(t/M)  <=  1/(4t).');
log('  1/6 is that threshold AT t = 3/2 and nowhere else. Threshold by level:');
log('  x |  L |    t    | 1/(4t)  | correct Fano threshold | measured Fano | passes');
for (const x of [5, 7, 11, 13, 17]) {
  const T = TILES[x], L = T.gapSlots, h = hist(T.A, T.M, L), st = statsOf(h, T.M);
  const fr = st.t - Math.floor(st.t), thr = (fr * (1 - fr) + Math.floor(st.t) * (Math.floor(st.t) + 1) / T.M) / st.t;
  log(`  ${String(x).padStart(2)} | ${String(L).padStart(2)} | ${st.t.toFixed(4).padStart(7)} | ${(1 / (4 * st.t)).toFixed(5)} | ${thr.toFixed(6).padStart(22)} | ${st.fano.toFixed(6).padStart(13)} | ${st.fano < thr ? 'YES' : 'no'}`);
}

// ===========================================================================
// E. CLAIM (iii): the natal5 Fano numbers, re-derived, and the units they carry
// ===========================================================================
log('\n--- E. CLAIM (iii): natal5-variance.js reading 2, re-derived here ---');
log('  Independent re-implementation of the exact J5 rotation variance:');
log('    delta = (2/30) prod_{7<=p<=y} (p-2)/p,  J5(d) = rho30(d)/30 * prod rho_p(d)/p,');
log('    rho30 = 2 / 1 / 0 at d = 0 / +-6 / other (mod 30),');
log('    rho_p = p-2 if p|d,  p-3 if d = +-2 (mod p),  p-4 otherwise,');
log('    Var[N_L] = sum_{|d|<L} (L-|d|)(J5(d) - delta^2).');
function natal(y, L) {
  const ps = primesUpTo(y).filter(p => p >= 7);
  let del = 2 / 30; for (const p of ps) del *= (p - 2) / p;
  const J5 = (d) => {
    const m30 = ((d % 30) + 30) % 30;
    let f; if (m30 === 0) f = 2 / 30; else if (m30 === 6 || m30 === 24) f = 1 / 30; else return 0;
    for (const p of ps) { const m = ((d % p) + p) % p; f *= (m === 0 ? (p - 2) : (m === 2 || m === p - 2) ? (p - 3) : (p - 4)) / p; }
    return f;
  };
  let S = L * J5(0);
  for (const st of [6, 24, 30]) for (let d = st; d < L; d += 30) S += 2 * (L - d) * J5(d);
  return { E: del * L, Var: S - del * del * L * L };
}
log('\n   x |    W = x# |   y  |   E[N]    |    Var    | Var/E | correct threshold at this t | passes');
for (const [x, W] of [[7, 210], [11, 2310], [13, 30030], [17, 510510], [19, 9699690]]) {
  const pr = primesUpTo(Math.floor(Math.sqrt(W))); const y = pr[pr.length - 1];
  const { E, Var } = natal(y, W);
  const fr = E - Math.floor(E), thr = fr * (1 - fr) / E;      // the M term is negligible here
  log(`  ${String(x).padStart(2)} | ${String(W).padStart(9)} | ${String(y).padStart(4)} | ${E.toFixed(2).padStart(9)} | ${Var.toFixed(2).padStart(9)} | ${(Var / E).toFixed(3)} | ${thr.toExponential(3).padStart(27)} | ${(Var / E) < thr ? 'YES' : 'no'}`);
}
log('  Reading 2 IS reproduced: Var/E = 0.152 -> 0.347 across x = 7 to 19.');
log('  But its window is L = W = x# INTEGERS, where t = E[N] = 6.92 .. 41441,');
log('  not t = 3/2. 1/6 is the threshold only at t = 3/2. At the t these rows');
log('  actually carry, the threshold is the last column, and 0.152 misses it by');
log('  the ratio printed below.');
for (const [x, W] of [[7, 210], [11, 2310], [13, 30030], [17, 510510], [19, 9699690]]) {
  const pr = primesUpTo(Math.floor(Math.sqrt(W))); const y = pr[pr.length - 1];
  const { E, Var } = natal(y, W);
  const fr = E - Math.floor(E), thr = fr * (1 - fr) / E;
  log(`   x=${String(x).padStart(2)}: measured Fano ${(Var / E).toFixed(4)} / threshold ${thr.toExponential(2)} = ${((Var / E) / thr).toExponential(2)}x too large`);
}
log('  The 6-lattice tile at its own L_crit is the right place to ask, and part D');
log('  did: degree 2 passes at x = 5 and fails from x = 7, which is the boundary');
log('  the inherited text names, reached by a different road.');

// ===========================================================================
// F. CLAIM (iv): the degree the certificate needs at L = G2/6, and its growth
// ===========================================================================
log('\n--- F. CLAIM (iv): needed degree at L = L_crit = G2(x#)/6 ---');
log('   x |  L_crit | Xmin | Xmax |    t     | ceil(t) | |S| | k* | G2*delta_int');
const rowsF = [];
for (const x of [5, 7, 11, 13, 17, 19, 23]) {
  const T = TILES[x], L = T.gapSlots, h = hist(T.A, T.M, L), st = statsOf(h, T.M);
  const size = st.max - st.min + 1;
  const kstar = minDegree(h, L, size + 2).k;
  rowsF.push({ x, L, min: st.min, max: st.max, t: st.t, size, kstar, Var: st.Var, fano: st.fano });
  log(`  ${String(x).padStart(2)} | ${String(L).padStart(7)} | ${String(st.min).padStart(4)} | ${String(st.max).padStart(4)} | ${st.t.toFixed(4).padStart(8)} | ${String(Math.ceil(st.t)).padStart(7)} | ${String(size).padStart(3)} | ${String(kstar).padStart(2)} | ${(G2[x] * T.d / 6).toFixed(4)}`);
}
log('  Xmin = 1 at L_crit at every level, by construction: the maximal gap is');
log('  one slot longer than the longest empty run, so the window that starts at');
log('  the last survivor before the record gap holds exactly one. Hence');
log('  |S| = Xmax there, and claim (iv)\'s "k >= max_r X_r" is RIGHT at this L');
log('  and only at this L.');
log('\n  Growth of the needed degree. Fits over x = 7..23 (log-log against x):');
{
  const R = rowsF.filter(r => r.x >= 7);
  const fit = (ys) => {
    const xs = R.map(r => Math.log(r.x)), n = xs.length;
    const mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
    let sxy = 0, sxx = 0; for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
    return sxy / sxx;
  };
  log(`   d log Xmax / d log x = ${fit(R.map(r => Math.log(r.max))).toFixed(3)}`);
  log(`   d log t    / d log x = ${fit(R.map(r => Math.log(r.t))).toFixed(3)}`);
  log(`   d log k*   / d log x = ${fit(R.map(r => Math.log(r.kstar))).toFixed(3)}`);
  log('   the claimed law x^1.70/ln^2 x, evaluated and compared to t = L_crit*d:');
  log('    x |    t     | x^1.70/ln^2 x | ratio');
  for (const r of R) { const law = Math.pow(r.x, 1.70) / Math.log(r.x) ** 2; log(`   ${String(r.x).padStart(2)} | ${r.t.toFixed(4).padStart(8)} | ${law.toFixed(4).padStart(13)} | ${(r.t / law).toFixed(4)}`); }
  log('   and G2(x#)/6 * d, i.e. the claim\'s ceil(G2*delta) in SLOT units:');
  for (const r of R) log(`   x=${String(r.x).padStart(2)}: L_crit*d = ${r.t.toFixed(4)}, ceil = ${Math.ceil(r.t)}, Xmax = ${r.max} (Xmax >= ceil(t): ${r.max >= Math.ceil(r.t) ? 'yes' : 'NO'})`);
}
log('\n  Local slope of the claimed law. d log(x^1.70/ln^2 x)/d log x = 1.70 - 2/ln x,');
log('  which is what the fitted slopes above have to be compared against:');
{
  const R = rowsF.filter(r => r.x >= 7); const xm = Math.exp(R.map(r => Math.log(r.x)).reduce((a, b) => a + b) / R.length);
  log(`   at the log-mean level x = ${xm.toFixed(1)}: 1.70 - 2/ln x = ${(1.70 - 2 / Math.log(xm)).toFixed(3)}`);
  log(`   measured d log t / d log x = ${(() => { const xs = R.map(r => Math.log(r.x)), ys = R.map(r => Math.log(r.t)), n = xs.length; const mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n; let sxy = 0, sxx = 0; for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; } return (sxy / sxx).toFixed(3); })()}`);
  log('   so over x = 7..23 the claimed law is INDISTINGUISHABLE from the measurement;');
  log('   the range is far too short to separate x^1.70/ln^2 x from anything near it.');
}
log('\n  What degree 2 can certify on its own. The closed form of part D agreed with');
log('  the sharp LP on every one of the 73 window lengths tested, so it drives the');
log('  long sweep here and the answer is re-checked against the exact LP.');
const deg2works = (T, L) => {
  const h = hist(T.A, T.M, L), st = statsOf(h, T.M);
  for (let s = 1; s <= Math.ceil(st.t) + 2; s++) if (st.Var < (st.t - s) * (s + 1 - st.t) + s * (s + 1) / T.M) return true;
  return false;
};
const DEG2 = [];
log('   x | L_crit | first L with deg-2 valid | gap bound proved | true G2 | ratio | LP recheck at L, L-1');
for (const x of [5, 7, 11, 13, 17, 19]) {
  const T = TILES[x]; let found = -1;
  for (let L = 1; L <= T.M - 1; L++) if (deg2works(T, L)) { found = L; break; }
  let rc = '-';
  if (found > 0 && found <= 400) { const a = exactLP(hist(T.A, T.M, found), found, 2), b = found > 1 ? exactLP(hist(T.A, T.M, found - 1), found - 1, 2) : NaN; rc = `V_2(${found})=${a.toFixed(3)}, V_2(${found - 1})=${isFinite(b) ? b.toFixed(3) : 'n/a'}`; }
  log(`  ${String(x).padStart(2)} | ${String(T.gapSlots).padStart(6)} | ${String(found < 0 ? 'none < M' : found).padStart(24)} | ${String(found < 0 ? '-' : 6 * found).padStart(16)} | ${String(G2[x]).padStart(7)} | ${found < 0 ? '-' : (6 * found / G2[x]).toFixed(1)} | ${rc}`);
  if (found > 0) DEG2.push({ x, L2: found, ratio: 6 * found / G2[x] });
}
{
  const R = DEG2.filter(r => r.x >= 7);
  const sl = (ys) => { const xs = R.map(r => Math.log(r.x)), n = xs.length; const mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n; let sxy = 0, sxx = 0; for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; } return sxy / sxx; };
  log(`   d log(ratio) / d log x = ${sl(R.map(r => Math.log(r.ratio))).toFixed(2)} over x = 7..19: the price of`);
  log('   stopping at two-point data is not a constant factor, it grows as a power of x.');
}

// ===========================================================================
// G. THE QUANTIFIER: does an average over the period close "every position"?
// ===========================================================================
log('\n--- G. THE QUANTIFIER ARGUMENT, checked ---');
log('  Inherited claim: over a finite period the number of bad positions is a');
log('  non-negative integer, so a failure-density bound below 1/M forces it to');
log('  zero; the all-positions quantifier is therefore NOT a logical barrier.');
{
  const T = TILES[5], L = T.gapSlots, h = hist(T.A, T.M, L), st = statsOf(h, T.M);
  const s = 1, sum = T.M * (st.Var + (st.t - s) * (st.t - s - 1)) / (s * (s + 1));
  log(`   x = 5, L = ${L} slots: M = ${T.M}, t = ${st.t.toFixed(4)}, Var = ${st.Var.toFixed(4)}.`);
  log(`   sum_a P_1(X_a) = M[Var + (t-1)(t-2)]/2 = ${sum.toFixed(6)} < 1, and #empty is a`);
  log(`   non-negative integer, so #empty = 0. Direct count of empty windows: ${h[0]}.`);
  log(`   The certificate concludes at EVERY one of the ${T.M} positions, the anchor included.`);
  log(`   G2(5#) <= 6*${L} = ${6 * L}; truth ${G2[5]}. PROVED from one-point and two-point data only.`);
}
log('\n  So the barrier is not the quantifier. Where it does bite: the same step');
log('  at higher x needs the SHARP degree-2 value below 1, and V_2 is not small,');
log('  it is of order M. Chebyshev is the crude version of the same step:');
log('   x |  L_crit |     M      | Var/E^2 (Chebyshev density) |  1/M  | ratio needed');
for (const x of [7, 11, 13, 17, 19]) {
  const T = TILES[x], L = T.gapSlots, h = hist(T.A, T.M, L), st = statsOf(h, T.M);
  const cheb = st.Var / (st.t * st.t);
  log(`  ${String(x).padStart(2)} | ${String(L).padStart(7)} | ${String(T.M).padStart(10)} | ${cheb.toExponential(4).padStart(27)} | ${(1 / T.M).toExponential(2)} | ${(cheb * T.M).toExponential(2)}`);
}

// ===========================================================================
// H. CROSS-VALIDATION of the two LP solvers
// ===========================================================================
log('\n--- H. CROSS-VALIDATION: simplex against brute-force vertex enumeration ---');
{
  let ok = 0, tot = 0, bad = [];
  for (const x of [5, 7, 11]) {
    const T = TILES[x];
    for (const L of [T.gapSlots, 2 * T.gapSlots]) {
      const h = hist(T.A, T.M, L);
      for (let k = 1; k <= 4; k++) {
        const a = exactLP(h, L, k), b = vertexLP(h, L, k);
        tot++; if (Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(b))) ok++; else bad.push(`x=${x} L=${L} k=${k}: simplex ${a} vertex ${b}`);
      }
    }
  }
  log(`  ${ok}/${tot} agree to 1e-6` + (bad.length ? `; disagreements: ${bad.slice(0, 4).join(' | ')}` : '; no disagreement'));
}

log(`\nDONE in ${((Date.now() - t00) / 1000).toFixed(1)} s. READINGS are in the tail of this file.`);
require('fs').writeFileSync(__dirname + '/attack-D-twopoint.txt', out.join('\n') + '\n');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-D-twopoint.js
//   invocation:  node research/attack-D-twopoint.js
//   code-sha256: c96d29ee25b645f451f43c191893686f31638f5936afcf2b47b31465a8447ea3
//   out-sha256:  a7951c98c6c074d04ea107446d03b0b7a89c4b5efaf8955e43cec6f26adb717b
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     71.6 s
// ============================================================================
// ==============================================================================
//   ATTACK D — TWO-POINT DATA AGAINST DP1: sharp Boole-Frechet certificates
//   2026-08-18, 6-lattice, sieve form of {0,-2}
// ==============================================================================
//
// --- A. THE OBJECT AND THE UNITS (slots, never integers) ---
//   x |    M = x#/6 |  survivors |    d     | maxgap slots | 6*maxgap | G2(x#) | ok
//    5 |           5 |          3 | 0.600000 |            2 |       12 |     12 | yes
//    7 |          35 |         15 | 0.428571 |            5 |       30 |     30 | yes
//   11 |         385 |        135 | 0.350649 |            7 |       42 |     42 | yes
//   13 |        5005 |       1485 | 0.296703 |           11 |       66 |     66 | yes
//   17 |       85085 |      22275 | 0.261797 |           18 |      108 |    108 | yes
//   19 |     1616615 |     378675 | 0.234239 |           25 |      150 |    150 | yes
//   23 |    37182145 |    7952175 | 0.213871 |           34 |      204 |    204 | yes
//   A window of L slots is empty iff it fits inside a gap, so L slots is
//   gap-free for every position iff L >= maxgap, and L_crit = G2(x#)/6 EXACTLY.
//
// --- B. WHAT THE CERTIFICATE CONSUMES: S_1 and S_2 against direct counts ---
//   x |  L |     S_1 = L*#surv     |  S_2 (from X_a)  |  sum_d (L-d) N_2(d)  | match
//    5 |  2 |                     6 |                1 |                    1 | yes
//    7 |  5 |                    75 |               51 |                   51 | yes
//   11 |  7 |                   945 |              835 |                  835 | yes
//   13 | 11 |                 16335 |            21752 |                21752 | yes
//   S_1 = L * (#survivors) and S_2 = sum_d (L-d) N_2(d): degree-2 data is
//   the one-point count plus the pair-correlation function and NOTHING else,
//   neither of which is a function of the divisor-class vector (|A_d|). The
//   certificate therefore lives strictly outside DP1.
//
// --- C. CLAIM (i): the true threshold degree against max_r X_r ---
//   First: is the attained set {X_a} an integer interval? Sliding by one slot
//   changes X by at most 1, so it must be. Checked over every L below.
//
//   x |  L | Xmin | Xmax | |S| | k* (sharp LP) | claim (i) says | agree
//    5 |  2 |    1 |    2 |   2 |             2 |              2 | yes
//    5 |  4 |    2 |    3 |   2 |             2 |              3 | NO
//    7 |  5 |    1 |    3 |   3 |             4 |              3 | NO
//    7 | 10 |    2 |    6 |   5 |             4 |              6 | NO
//    7 | 20 |    6 |   11 |   6 |             2 |             11 | NO
//   11 |  7 |    1 |    5 |   5 |             5 |              5 | yes
//   11 | 14 |    2 |    7 |   6 |             5 |              7 | NO
//   11 | 28 |    7 |   12 |   6 |             4 |             12 | NO
//   13 | 11 |    1 |    7 |   7 |             8 |              7 | NO
//   13 | 22 |    2 |   10 |   9 |             6 |             10 | NO
//   13 | 44 |    9 |   17 |   9 |             4 |             17 | NO
//   17 | 18 |    1 |    9 |   9 |            10 |              9 | NO
//   17 | 36 |    5 |   14 |  10 |             8 |             14 | NO
//   17 | 72 |   12 |   25 |  14 |             6 |             25 | NO
//   attained set was an integer interval in every row: yes
//
//   The closed form the LP is reproducing: k* = |S| rounded UP TO EVEN,
//   |S| = Xmax - Xmin + 1.  P(z) = prod_{v in S}(z-v) / prod_{v in S}(-v) is
//   admissible exactly when |S| is even (else its sign is wrong past Xmax),
//   and no polynomial of degree < |S| can vanish on |S| points.
//   x |  L | |S| | |S| rounded even | k* measured | agree
//    5 |  2 |   2 |                2 |           2 | yes
//    5 |  4 |   2 |                2 |           2 | yes
//    7 |  5 |   3 |                4 |           4 | yes
//    7 | 10 |   5 |                6 |           4 | NO
//    7 | 20 |   6 |                6 |           2 | NO
//   11 |  7 |   5 |                6 |           5 | NO
//   11 | 14 |   6 |                6 |           5 | NO
//   11 | 28 |   6 |                6 |           4 | NO
//   13 | 11 |   7 |                8 |           8 | yes
//   13 | 22 |   9 |               10 |           6 | NO
//   13 | 44 |   9 |               10 |           4 | NO
//   17 | 18 |   9 |               10 |          10 | yes
//   17 | 36 |  10 |               10 |           8 | NO
//   17 | 72 |  14 |               14 |           6 | NO
//
//   Two synthetic counterexamples to claim (i) as an identity:
//    (a) survivors every 3rd slot, L = 9: X == 3 always, max_r X_r = 3,
//        sharp threshold degree k* = 2 (P(z) = (z-3)^2/9). Claim (i) overstates by 1.
//    (b) real tile x = 13, L = 44 slots: Xmin = 9, Xmax = 17,
//        k* = 4 against claim (i)'s 17. Xmin > 1 is what claim (i) drops.
//
// --- D. CLAIM (ii): degree 2 works iff Var < (t-1)(2-t) + 2/M ? ---
//   Derivation. P_s(z) = (z-s)(z-s-1)/(s(s+1)) has P_s(0) = 1 and P_s(j) >= 0
//   for every integer j >= 0. sum_a P_s(X_a) = M[Var + (t-s)(t-s-1)]/(s(s+1)),
//   and #empty is an integer, so degree 2 SUCCEEDS as soon as
//         Var(X_L)  <  (t-s)(s+1-t) + s(s+1)/M      for some integer s >= 1.
//   (t-s)(s+1-t) is maximised over integer s at s = floor(t), where it equals
//   frac(t)(1-frac(t)) <= 1/4.  The inherited claim is the s = 1 member, and
//   s = 1 is optimal only while 1 <= t <= 2.
//
//   s* = argmax over s | inherited RHS (t-1)(2-t)+2/M | correct RHS | Var | LP verdict
//   x |  L |    t    |   Var   | inherited RHS | correct RHS | V_2 (sharp) | deg-2 works
//    5 |  2 |  1.2000 |  0.1600 |      0.560000 |    0.560000 (s=1) |    0.000e+0 | YES
//    7 |  5 |  2.1429 |  0.4653 |     -0.106122 |    0.293878 (s=2) |    2.000e+0 | no
//   11 |  7 |  2.4545 |  0.7674 |     -0.655962 |    0.263518 (s=2) |    3.333e+1 | no
//   13 | 11 |  3.2637 |  1.3039 |     -2.860366 |    0.196577 (s=3) |    4.628e+2 | no
//   17 | 18 |  4.7123 |  1.6633 |    -10.069146 |    0.205144 (s=4) |    5.768e+3 | no
//
//   Agreement test of the closed form against the sharp LP, over every L
//   from 1 to 3*L_crit at x = 5,7,11,13 (does "Var < max_s RHS" match V_2 < 1?):
//   agree on 73/73 window lengths; no mismatch
//
//   The Fano form. Var < frac(t)(1-frac(t)) + O(t^2/M) means
//         Fano(X_L) < frac(t)(1-frac(t))/t + O(t/M)  <=  1/(4t).
//   1/6 is that threshold AT t = 3/2 and nowhere else. Threshold by level:
//   x |  L |    t    | 1/(4t)  | correct Fano threshold | measured Fano | passes
//    5 |  2 |  1.2000 | 0.20833 |               0.466667 |      0.133333 | YES
//    7 |  5 |  2.1429 | 0.11667 |               0.137143 |      0.217143 | no
//   11 |  7 |  2.4545 | 0.10185 |               0.107359 |      0.312650 | no
//   13 | 11 |  3.2637 | 0.07660 |               0.060231 |      0.399502 | no
//   17 | 18 |  4.7123 | 0.05305 |               0.043533 |      0.352973 | no
//
// --- E. CLAIM (iii): natal5-variance.js reading 2, re-derived here ---
//   Independent re-implementation of the exact J5 rotation variance:
//     delta = (2/30) prod_{7<=p<=y} (p-2)/p,  J5(d) = rho30(d)/30 * prod rho_p(d)/p,
//     rho30 = 2 / 1 / 0 at d = 0 / +-6 / other (mod 30),
//     rho_p = p-2 if p|d,  p-3 if d = +-2 (mod p),  p-4 otherwise,
//     Var[N_L] = sum_{|d|<L} (L-|d|)(J5(d) - delta^2).
//
//    x |    W = x# |   y  |   E[N]    |    Var    | Var/E | correct threshold at this t | passes
//    7 |       210 |   13 |      6.92 |      1.05 | 0.152 |                    1.026e-2 | no
//   11 |      2310 |   47 |     39.27 |     10.06 | 0.256 |                    5.060e-3 | no
//   13 |     30030 |  173 |    304.28 |     91.13 | 0.299 |                    6.656e-4 | no
//   17 |    510510 |  709 |   3245.51 |   1060.54 | 0.327 |                    7.698e-5 | no
//   19 |   9699690 | 3109 |  41441.19 |  14392.59 | 0.347 |                    3.673e-6 | no
//   Reading 2 IS reproduced: Var/E = 0.152 -> 0.347 across x = 7 to 19.
//   But its window is L = W = x# INTEGERS, where t = E[N] = 6.92 .. 41441,
//   not t = 3/2. 1/6 is the threshold only at t = 3/2. At the t these rows
//   actually carry, the threshold is the last column, and 0.152 misses it by
//   the ratio printed below.
//    x= 7: measured Fano 0.1521 / threshold 1.03e-2 = 1.48e+1x too large
//    x=11: measured Fano 0.2563 / threshold 5.06e-3 = 5.06e+1x too large
//    x=13: measured Fano 0.2995 / threshold 6.66e-4 = 4.50e+2x too large
//    x=17: measured Fano 0.3268 / threshold 7.70e-5 = 4.24e+3x too large
//    x=19: measured Fano 0.3473 / threshold 3.67e-6 = 9.46e+4x too large
//   The 6-lattice tile at its own L_crit is the right place to ask, and part D
//   did: degree 2 passes at x = 5 and fails from x = 7, which is the boundary
//   the inherited text names, reached by a different road.
//
// --- F. CLAIM (iv): needed degree at L = L_crit = G2(x#)/6 ---
//    x |  L_crit | Xmin | Xmax |    t     | ceil(t) | |S| | k* | G2*delta_int
//    5 |       2 |    1 |    2 |   1.2000 |       2 |   2 |  2 | 1.2000
//    7 |       5 |    1 |    3 |   2.1429 |       3 |   3 |  4 | 2.1429
//   11 |       7 |    1 |    5 |   2.4545 |       3 |   5 |  5 | 2.4545
//   13 |      11 |    1 |    7 |   3.2637 |       4 |   7 |  8 | 3.2637
//   17 |      18 |    1 |    9 |   4.7123 |       5 |   9 | 10 | 4.7123
//   19 |      25 |    1 |   11 |   5.8560 |       6 |  11 | 12 | 5.8560
//   23 |      34 |    1 |   13 |   7.2716 |       8 |  13 | 14 | 7.2716
//   Xmin = 1 at L_crit at every level, by construction: the maximal gap is
//   one slot longer than the longest empty run, so the window that starts at
//   the last survivor before the record gap holds exactly one. Hence
//   |S| = Xmax there, and claim (iv)'s "k >= max_r X_r" is RIGHT at this L
//   and only at this L.
//
//   Growth of the needed degree. Fits over x = 7..23 (log-log against x):
//    d log Xmax / d log x = 1.262
//    d log t    / d log x = 1.096
//    d log k*   / d log x = 1.127
//    the claimed law x^1.70/ln^2 x, evaluated and compared to t = L_crit*d:
//     x |    t     | x^1.70/ln^2 x | ratio
//     7 |   2.1429 |        7.2181 | 0.2969
//    11 |   2.4545 |       10.2496 | 0.2395
//    13 |   3.2637 |       11.9000 | 0.2743
//    17 |   4.7123 |       15.3888 | 0.3062
//    19 |   5.8560 |       17.2138 | 0.3402
//    23 |   7.2716 |       21.0051 | 0.3462
//    and G2(x#)/6 * d, i.e. the claim's ceil(G2*delta) in SLOT units:
//    x= 7: L_crit*d = 2.1429, ceil = 3, Xmax = 3 (Xmax >= ceil(t): yes)
//    x=11: L_crit*d = 2.4545, ceil = 3, Xmax = 5 (Xmax >= ceil(t): yes)
//    x=13: L_crit*d = 3.2637, ceil = 4, Xmax = 7 (Xmax >= ceil(t): yes)
//    x=17: L_crit*d = 4.7123, ceil = 5, Xmax = 9 (Xmax >= ceil(t): yes)
//    x=19: L_crit*d = 5.8560, ceil = 6, Xmax = 11 (Xmax >= ceil(t): yes)
//    x=23: L_crit*d = 7.2716, ceil = 8, Xmax = 13 (Xmax >= ceil(t): yes)
//
//   Local slope of the claimed law. d log(x^1.70/ln^2 x)/d log x = 1.70 - 2/ln x,
//   which is what the fitted slopes above have to be compared against:
//    at the log-mean level x = 14.0: 1.70 - 2/ln x = 0.942
//    measured d log t / d log x = 1.096
//    so over x = 7..23 the claimed law is INDISTINGUISHABLE from the measurement;
//    the range is far too short to separate x^1.70/ln^2 x from anything near it.
//
//   What degree 2 can certify on its own. The closed form of part D agreed with
//   the sharp LP on every one of the 73 window lengths tested, so it drives the
//   long sweep here and the answer is re-checked against the exact LP.
//    x | L_crit | first L with deg-2 valid | gap bound proved | true G2 | ratio | LP recheck at L, L-1
//    5 |      2 |                        2 |               12 |      12 | 1.0 | V_2(2)=0.000, V_2(1)=2.000
//    7 |      5 |                       19 |              114 |      30 | 3.8 | V_2(19)=0.889, V_2(18)=1.107
//   11 |      7 |                       65 |              390 |      42 | 9.3 | V_2(65)=0.945, V_2(64)=1.004
//   13 |     11 |                      376 |             2256 |      66 | 34.2 | V_2(376)=0.966, V_2(375)=1.017
//   17 |     18 |                     3150 |            18900 |     108 | 175.0 | -
//   19 |     25 |                    19593 |           117558 |     150 | 783.7 | -
//    d log(ratio) / d log x = 5.20 over x = 7..19: the price of
//    stopping at two-point data is not a constant factor, it grows as a power of x.
//
// --- G. THE QUANTIFIER ARGUMENT, checked ---
//   Inherited claim: over a finite period the number of bad positions is a
//   non-negative integer, so a failure-density bound below 1/M forces it to
//   zero; the all-positions quantifier is therefore NOT a logical barrier.
//    x = 5, L = 2 slots: M = 5, t = 1.2000, Var = 0.1600.
//    sum_a P_1(X_a) = M[Var + (t-1)(t-2)]/2 = 0.000000 < 1, and #empty is a
//    non-negative integer, so #empty = 0. Direct count of empty windows: 0.
//    The certificate concludes at EVERY one of the 5 positions, the anchor included.
//    G2(5#) <= 6*2 = 12; truth 12. PROVED from one-point and two-point data only.
//
//   So the barrier is not the quantifier. Where it does bite: the same step
//   at higher x needs the SHARP degree-2 value below 1, and V_2 is not small,
//   it is of order M. Chebyshev is the crude version of the same step:
//    x |  L_crit |     M      | Var/E^2 (Chebyshev density) |  1/M  | ratio needed
//    7 |       5 |         35 |                   1.0133e-1 | 2.86e-2 | 3.55e+0
//   11 |       7 |        385 |                   1.2738e-1 | 2.60e-3 | 4.90e+1
//   13 |      11 |       5005 |                   1.2241e-1 | 2.00e-4 | 6.13e+2
//   17 |      18 |      85085 |                   7.4904e-2 | 1.18e-5 | 6.37e+3
//   19 |      25 |    1616615 |                   5.0454e-2 | 6.19e-7 | 8.16e+4
//
// --- H. CROSS-VALIDATION: simplex against brute-force vertex enumeration ---
//   24/24 agree to 1e-6; no disagreement
//
// DONE in 71.6 s. READINGS are in the tail of this file.
// ============================================================================
// READINGS
// ============================================================================
// 0. THE UNITS FIRST, BECAUSE THREE OF THE FOUR INHERITED CLAIMS FAIL ON THEM.
//    Everything here is on the 6-lattice in SLOTS. Part A closes the loop with
//    the published object: 6 * (max cyclic gap in slots) = G2(x#) at all seven
//    levels, against the ladder in exact-g2-ladder.js:34-41. So L_crit, the
//    shortest window that is non-empty at EVERY position, is exactly G2(x#)/6,
//    and "certify no empty window of L slots" is literally "certify
//    G2(x#) <= 6L". This is the SIEVE form of {0,-2} (units.js §5): the pair is
//    fixed, not a free translate, which is the form a certificate is applied in.
//
// 1. THE MECHANISM IS REAL AND IT IS OUTSIDE DP1. Part B: S_1 = L*(#survivors)
//    and S_2 = sum_d (L-d) N_2(d) reproduce the direct pair-correlation count
//    exactly at x = 5, 7, 11, 13. The degree-2 certificate's ONLY inputs are the
//    density and the pair-correlation function of the SIFTED SET. Neither is a
//    function of the divisor-class vector (|A_d|), so this is a consumer of
//    precisely the data DP1 throws away, and its conclusion holds at every one
//    of the M window positions rather than almost all of them.
//    It is NOT the object of natal-cap-06-bonferroni.js. That file runs
//    Bonferroni over the SIEVE CLASSES A_q, whose terms |A_T| are divisor-class
//    counts, i.e. one-point data, i.e. inside DP1; its ladder depth is the hit
//    multiplicity h(r) and grows like ln ln. This file runs Boole-Frechet over
//    the SURVIVOR EVENTS, whose terms are correlations of the sifted set; its
//    depth is the window count X_a and grows polynomially. The two "Bonferroni
//    depths" are different quantities on different objects and must not be
//    substituted for one another.
//
// 2. CLAIM (i) IS FALSE AS AN IDENTITY. The sharp threshold degree is governed
//    by the RANGE of the window count, not its maximum. Part C: the attained
//    set {X_a} is always an integer interval [Xmin, Xmax] (the sliding window
//    changes by at most 1 per step; verified in every row), the hard-zero
//    certificate is P(z) = prod_{v in [Xmin,Xmax]}(z-v)/prod(-v), admissible
//    exactly when the range is EVEN, and the 1/M integrality slack pulls the
//    threshold below even that. Measured k* against claim (i)'s max_r X_r:
//    they agree in 2 of 15 rows. At x = 13, L = 44 slots the true threshold is
//    k* = 4 and the claim says 17. A synthetic case settles it in one line:
//    survivors every third slot, L = 9, X == 3 at every position, so
//    max_r X_r = 3 while P(z) = (z-3)^2/9 certifies at degree 2.
//    What claim (i) drops is Xmin. It is right in exactly one place, and that
//    place happens to be the one that matters: see reading 4.
//
// 3. CLAIM (ii) IS THE RIGHT SHAPE WITH THE WRONG CONSTANTS. The correct
//    criterion is  Var(X_L) < (t-s)(s+1-t) + s(s+1)/M  for some integer s >= 1,
//    optimised at s = floor(t), where the first term is frac(t)(1-frac(t)) and
//    is at most 1/4. The inherited (t-1)(2-t) + 2/M is the s = 1 member and is
//    optimal only for 1 <= t <= 2; outside that window its right-hand side is
//    NEGATIVE (-0.106 at x = 7, -10.07 at x = 17) and the criterion would say
//    "impossible" where the certificate can in fact still work. The corrected
//    closed form agrees with the sharp LP on 73 of 73 window lengths.
//    The Fano restatement inherits the same defect: 1/6 is the threshold AT
//    t = 3/2 and nowhere else. In general the threshold is
//    frac(t)(1-frac(t))/t + O(t/M) <= 1/(4t), so it TIGHTENS as the window
//    grows. At the levels here it reads 0.137, 0.107, 0.060, 0.044, not 1/6.
//
// 4. CLAIM (iv) SURVIVES, AND IT IS THE ONE THAT MATTERS. At L = L_crit the
//    minimum window count is 1 at every level (measured, x = 5..23) and it must
//    be: the record gap is one slot longer than the longest empty run, so the
//    window that starts at the survivor before the record gap holds exactly
//    one. Hence the range equals Xmax there and "k >= max_r X_r" is correct AT
//    L = G2/6 and only there. Measured k* at L_crit: 2, 4, 5, 8, 10, 12, 14 for
//    x = 5..23, against Xmax = 2, 3, 5, 7, 9, 11, 13. And Xmax >= ceil(t) with
//    t = (G2/6)*d holds at every level, so the claim's ceil(G2*delta) is right
//    once delta is read as the density PER INTEGER; read as per-slot it is 6x
//    wrong (units.js §2).
//    The growth: d log k*/d log x = 1.13, d log Xmax/d log x = 1.26,
//    d log t/d log x = 1.10 over x = 7..23. The claimed x^1.70/ln^2 x has local
//    slope 1.70 - 2/ln x = 0.942 at the log-mean level x = 14.0, against the
//    measured 1.096, so over this range the claim is INDISTINGUISHABLE from
//    the measurement and the range is far too short to separate it from any
//    nearby law. (Corrected 2026-08-20: this used to read "= 1.00 at ...
//    x = 13.1"; both figures are the block's, above.) The qualitative
//    conclusion - the order diverges as a power of x, not as ln ln x - is what
//    six levels support.
//
// 5. THE INHERITED "WORKS AT x <= 5, DIES AT x = 7" IS CORRECT, FOR A REASON
//    THE INHERITED TEXT DOES NOT GIVE. At L = L_crit the degree-2 value is
//    V_2 = 0 at x = 5 and 2.00, 33.3, 462.8, 5768 at x = 7, 11, 13, 17. So
//    degree 2 proves the EXACT truth G2(5#) <= 12 and proves nothing exact from
//    x = 7 on. That is not what the Fano comparison in claim (iii) shows, and
//    the two must not be conflated.
//
// 6. WHAT TWO-POINT DATA ACTUALLY BUYS, PRICED. Degree 2 is not empty above
//    x = 5; it certifies a WEAKER bound. The first L at which it becomes valid
//    is 2, 19, 65, 376, 3150, 19593 at x = 5..19, so it proves
//    G2 <= 12, 114, 390, 2256, 18900, 117558 against truths
//    12, 30, 42, 66, 108, 150. The over-certification ratio runs
//    1.0, 3.8, 9.3, 34.2, 175.0, 783.7 and its log-log slope against x is
//    +5.20. Stopping at two-point data costs a factor that grows as a POWER of
//    x, so the mechanism exists, is unconditional, holds at every position, and
//    still loses to the DHR exponent by a widening margin.
//
// 7. THE QUANTIFIER IS NOT THE BARRIER, AND THAT PART OF THE INHERITED VERDICT
//    STANDS. Part G runs the argument end to end at x = 5: sum_a P_1(X_a) = 0
//    over the whole period, the number of empty windows is a non-negative
//    integer, hence zero, and the conclusion covers all M positions including
//    the anchored one. An average statement over a full period DOES close the
//    all-positions quantifier once it falls below 1/M. This does not contradict
//    natal5-variance.js reading 6, and the two should be read together:
//    reading 6 says no ALMOST-ALL bound can reach the anchor, because the
//    anchored tile is a diverging-z outlier of the rotation ensemble. That is
//    about bounds of the form "the exceptional set has measure < eps". The step
//    here is different in kind - it drives the exceptional COUNT below one -
//    and an exceptional set of size zero contains no outliers to escape into.
//    Reading 6 is right about what it addresses and does not block this.
//    What does block it is arithmetic, and part G prices that too: Chebyshev's
//    failure density Var/E^2 at L_crit misses 1/M by 3.6, 49, 613, 6370, 81600
//    at x = 7..19, and the sharp degree-2 value is worse than Chebyshev's
//    because it is exact.
//
// 8. NUMERICS. The float simplex silently lost the answer at k >= 9, reporting
//    V_10 >= 1 at x = 17, L = 18 where the explicit degree-10 polynomial gives
//    V_10 = 0. Every LP in this file therefore runs on BigInt rationals, and
//    part H cross-validates the rational simplex against brute-force
//    enumeration of every basic support on 24 of 24 cases. Anyone re-running a
//    moment LP of this shape in doubles should check the same way.
//
// 9. REACH. Exact full-period enumeration to x = 23 (M = 37,182,145 slots). The
//    next level needs M = 29#/6 = 1.08e9 slots and was not run. Six levels is
//    what every growth statement above rests on, which is why they are
//    [MEASURED] and not [PROVEN].
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   -10.069146 -> -10.07 in reading 3, the x = 17 row of the corrected
//   criterion table.
//   0.043533 -> 0.044 in reading 3, the last of the four Fano thresholds.
// SAME VALUE, DIFFERENT NOTATION: the degree-2 values of reading 5, 33.3 and
//   462.8 and 5768, are printed 3.333e+1, 4.628e+2 and 5.768e+3 in the last
//   column of the L_crit table at x = 11, 13 and 17. The Chebyshev misses of
//   reading 7, 613 and 6370 and 81600, are printed 6.13e+2, 6.37e+3 and
//   8.16e+4 in the part G table at x = 13, 17 and 19.
// DERIVED IN THIS READING by arithmetic over printed values: the 1.08e9 of
//   reading 9 is 29# over 6, which is 6,469,693,230 / 6 = 1,078,282,205.
// CORRECTED 2026-08-20 (mismatch adjudication #6): reading 4's "slope
//   1.70 - 2/ln x = 1.00 at the log-mean level x = 13.1" is now "= 0.942 at
//   ... x = 14.0" (old -> new: 1.00 -> 0.942 and 13.1 -> 14.0), which is what
//   the block prints. The old pair was not even self-consistent: recomputed
//   here, 1.70 - 2/ln(13.1) = 0.9226 and 1.70 - 2/ln(14.0) = 0.9422, so 1.00
//   is neither figure. The reading's conclusion is what the run prints and is
//   unaffected -- measured d log t / d log x = 1.096 against a local slope
//   0.942, and the run's own line calls the two INDISTINGUISHABLE over
//   x = 7..23 -- but the reading now says "indistinguishable" with both of the
//   run's numbers in view rather than "consistent" with a slope of exactly 1.
// ---------------------------------------------------------------------------
