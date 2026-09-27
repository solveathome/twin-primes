// import-interp-01-bgt-defect.js
//
// FOREIGN IMPORT ROW 9 (Bayati-Gamarnik-Tetali, the interpolation method),
// stage 1: DOES THE MACHINE REACH THE OBJECT, AND WHAT IS THE DEFECT?
//
// THE QUESTION. TODO 1d wants LIMIT EXISTENCE for the exponent of G2(x#) with
// no numerical value, because a value is too strong. import-maxplus.md 4 left a
// CANDIDATE: G2hat(st) <= C * G2hat(s) * G2hat(t), which by Fekete would give
// beta = lim ln G2hat(e^u)/u. Row 9 asks whether BGT's interpolation method --
// the canonical machine for "the limit exists, and here is no formula for it"
// -- reaches this object, and if determinism kills it, whether the
// DETERMINISTIC near-Fekete toolbox (de Bruijn-Erdos 1952; BGT's own
// Proposition 5) does better.
//
// SOURCES, verified before this file was written (import-interp-prereg.md 1):
// BGT, Ann. Probab. 41 (2013) 4080-4115 = arXiv:0912.2444v3, Appendix B read as
// page images. Proposition 5 verbatim: "Given alpha in (0,1), suppose a
// nonnegative sequence a_N, N >= 1 satisfies  a_N >= a_{N1} + a_{N2} - O(N^a)
// for every N1, N2 s.t. N = N1 + N2. Then the limit lim a_N/N exists." BGT
// attribute it to de Bruijn and Erdos, Theorem 22 p. 161 of Indag. Math. 14
// (1952) 152-163, "which uses a weaker assumption on the additive term".
//
// FIVE HYPOTHESES OF THE INTERPOLATION MACHINE, as read off the construction:
//   H1 additive ground set   [N] = [N1] + [N2] disjoint, model restricts
//   H2 exchangeable hyperedges drawn u.a.r. and independently (the r-parameter
//      interpolates DISTRIBUTIONS, not objects)
//   H3 local objective over a fixed alphabet [q]
//   H4 bounded differences in one hyperedge
//   H5 fixed density: edges = floor(cN), so both halves sit in the SAME
//      sequence at the SAME c
// Proposition 5 alone needs only a_N >= 0, alpha in (0,1), and (24) at EVERY
// split. Sign conversion for a SUB-additive b_N: a_N = C*N - b_N, admissible
// because the proven sifting exponent beta_2 = 4.26645028414864191641 gives the
// a priori linear bound (dhr-verification.md row 1a).
//
// WHAT THIS SCRIPT MEASURES. Everything in import-interp-prereg.md 4, P1-P5:
//   (a) H1 in coordinate A (u = ln x): the constraint-set defect
//       dpi(s,t) = pi(st) - pi(s) - pi(t). H1 needs it ZERO.
//   (b) coordinate B (n = pi(x)): the one coordinate where the disjoint-union
//       structure is real, and what Fekete delivers there.
//   (c) the identity D(s,t) = ln Ghat(st) - ln Ghat(s) - ln Ghat(t)
//                          = S(s) + S(t) - S(st),  S(x) = ln(x^2/Ghat(x)),
//       derived in the prereg before any code: the submultiplicativity defect
//       IS the Overshoot slack's superadditivity defect, and the LINEAR part of
//       S cancels identically.
//   (d) the defect, integer form (custody against import-maxplus-02:
//       sup R = 2.9333) and REAL-VARIABLE form (new), stratified by the domain
//       floor s0, since the candidate is STATED for all real s, t >= 2.
//   (e) the TPC threshold, which the identity in (c) turns into a column the
//       corpus already carries:  the candidate with explicit C implies beta < 2
//       at base x  IFF  ln C < ln(x_next^2 / Ghat(x)).
//
// LADDER PROVENANCE. G2 = A144311 + 1. Terms 1-14 (x = 2..43) corpus-exact
// (G2-STATE.md 2); terms 15-22 (x = 47..79) OEIS A144311 (Andrew Carter, 2008),
// recorded in G2-STATE.md 8 as "ours to verify, not to claim".
//
// usage: node research/import-interp-01-bgt-defect.js

'use strict';

const T0 = Date.now();
const F = (v, d = 4) => (Number.isFinite(v) ? v.toFixed(d) : ' n/a');
const pad = (s, n) => String(s).padStart(n);
let FAILS = 0;
function check(label, ok, detail) {
  if (!ok) { FAILS++; console.log('  FAIL  ' + label + (detail ? '   ' + detail : '')); }
  else console.log('  ok    ' + label + (detail ? '   ' + detail : ''));
}

// ------------------------------------------------------------------ the ladder
const A144311 = [1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545, 617,
  707, 869, 965, 1079, 1283, 1397, 1529, 1709];
const PR = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];
const G2 = A144311.map((v) => v + 1);
const EXACT_N = 14;
const src = (n) => (n <= EXACT_N ? 'corpus-exact' : 'A144311');
const PNEXT = 83;                     // first prime past the ladder; Ghat known on [2, 83)

function primesTo(N) { const s = new Uint8Array(N + 1), P = []; for (let i = 2; i <= N; i++) { if (!s[i]) { P.push(i); for (let j = i * i; j <= N; j += i) s[j] = 1; } } return P; }
const ALLP = primesTo(200);
const pi = (t) => { let c = 0; for (const p of ALLP) if (p <= t) c++; return c; };

// index of the largest prime <= t, in PR; -1 if none
function idxAtMost(t) { let k = -1; for (let i = 0; i < PR.length; i++) if (PR[i] <= t) k = i; return k; }
function Ghat(t) { const k = idxAtMost(t); return k < 0 ? null : G2[k]; }
// Ghat at the supremum of an open interval: the largest prime STRICTLY below y
function GhatBelow(y) { let k = -1; for (let i = 0; i < PR.length; i++) if (PR[i] < y) k = i; return k < 0 ? null : G2[k]; }
const S = (x) => Math.log(x * x / Ghat(x));

function ols(xs, ys) {
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0;
  for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
  const b = sxy / sxx, a = my - b * mx;
  let ss = 0; for (let i = 0; i < n; i++) ss += (ys[i] - a - b * xs[i]) ** 2;
  return { a, b, se: Math.sqrt((ss / (n - 2)) / sxx) };
}

// ================================================================== the run
console.log('='.repeat(78));
console.log('IMPORT ROW 9 (BGT INTERPOLATION) -- STAGE 1: REACH, AND THE DEFECT');
console.log('='.repeat(78));
console.log('');
console.log('-'.repeat(78));
console.log('SELF-TESTS');
console.log('-'.repeat(78));
check('A144311 has 22 terms', A144311.length === 22, 'n = ' + A144311.length);
check('one prime per term', PR.length === G2.length, PR.length + ' primes');
check('G2 = A144311 + 1 at the 14 corpus-exact terms',
  JSON.stringify(G2.slice(0, 14)) === JSON.stringify([2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528, 546, 618]),
  G2.slice(0, 14).join(','));
check('ladder strictly increasing', G2.every((v, i) => i === 0 || v > G2[i - 1]));
// custody: import-maxplus-02's integer-pair constant, recomputed here
{
  let maxR = 0, at = null, npairs = 0;
  for (let s = 2; s <= 79; s++) for (let t = s; t <= 79; t++) { const st = s * t; if (st > 79) continue; npairs++; const R = Ghat(st) / (Ghat(s) * Ghat(t)); if (R > maxR) { maxR = R; at = [s, t]; } }
  check('import-maxplus-02: 104 integer pairs, sup R = 2.9333 at (4,10)',
    npairs === 104 && Math.abs(maxR - 2.9333) < 5e-5 && at[0] === 4 && at[1] === 10,
    npairs + ' pairs, sup R = ' + F(maxR) + ' at (' + at.join(',') + ')');
}
// custody: gate-multiplies.md 5 slack row
{
  const v = []; for (let n = 5; n <= 12; n++) v.push(Number(S(PR[n - 1]).toFixed(3)));
  const claimed = [1.058, 0.940, 0.984, 0.878, 0.953, 1.182, 1.016, 0.953];
  let ok = true; for (let i = 0; i < 8; i++) if (Math.abs(v[i] - claimed[i]) > 0.0011) ok = false;
  check('gate-multiplies.md 5 slack row reproduced at x = 11..37', ok, v.join(', '));
}
// P2: the prereg's identity
{
  let worst = 0;
  for (let s = 2; s <= 79; s++) for (let t = s; t <= 79; t++) { const st = s * t; if (st > 79) continue;
    const D = Math.log(Ghat(st)) - Math.log(Ghat(s)) - Math.log(Ghat(t));
    const E = S(s) + S(t) - S(st);
    worst = Math.max(worst, Math.abs(D - E)); }
  check('P2  identity D(s,t) = S(s) + S(t) - S(st) at all 104 pairs', worst < 1e-12, 'max |D - E| = ' + worst.toExponential(2));
}
console.log('');

// ------------------------------------------------------------------ (a) H1
console.log('-'.repeat(78));
console.log('(a) BGT HYPOTHESIS H1 IN COORDINATE A: DOES THE CONSTRAINT SET SPLIT?   [P1]');
console.log('-'.repeat(78));
console.log('');
console.log('  H1 requires a ground set that splits as a DISJOINT UNION, so that the two');
console.log('  halves are members of the same sequence. In coordinate A the size is');
console.log('  u = ln x and additivity u1 + u2 is x = s*t. The model at x is the set of');
console.log('  primes <= x, one constraint each. So H1 asks for pi(st) = pi(s) + pi(t).');
console.log('');
console.log('  dpi(s,t) = pi(st) - pi(s) - pi(t)  is the number of constraints an');
console.log('  interpolation path would have to CREATE out of nothing:');
console.log('');
console.log('    s    t     st   pi(s)  pi(t)  pi(st)   dpi');
{
  let maxD = -1e9, atD = null, minD = 1e9, nzero = 0, nneg = 0, tot = 0;
  const rows = [];
  for (let s = 2; s <= 79; s++) for (let t = s; t <= 79; t++) { const st = s * t; if (st > 79) continue;
    const d = pi(st) - pi(s) - pi(t); tot++;
    if (st >= 25 && d === 0) nzero++;
    if (d < 0) nneg++;
    if (d > maxD) { maxD = d; atD = [s, t]; }
    if (st >= 25 && d < minD) minD = d;
    rows.push([s, t, st, pi(s), pi(t), pi(st), d]); }
  for (const r of [[2, 2], [3, 5], [4, 10], [5, 11], [7, 11], [8, 9], [4, 19], [2, 39]]) {
    const row = rows.find((q) => q[0] === r[0] && q[1] === r[1]);
    if (row) console.log('  ' + pad(row[0], 3) + pad(row[1], 5) + pad(row[2], 7) + pad(row[3], 7) + pad(row[4], 7) + pad(row[5], 8) + pad(row[6], 6));
  }
  console.log('');
  console.log('  pairs tested                 ' + tot);
  console.log('  dpi = 0 at a pair with st >= 25   ' + nzero);
  console.log('  dpi < 0 anywhere                  ' + nneg);
  console.log('  min dpi over st >= 25             ' + minD);
  console.log('  max dpi                           ' + maxD + '   at (s,t) = (' + atD.join(', ') + ')');
  console.log('');
  console.log('  P1 predicted dpi > 0 at every pair with st >= 25 and max dpi in [10, 18].');
  console.log('  P1 SCORE: ' + ((nzero === 0 && maxD >= 10 && maxD <= 18) ? 'HIT' : 'MISS'));
}
console.log('');

// ------------------------------------------------------------------ (b) coord B
console.log('-'.repeat(78));
console.log('(b) COORDINATE B (n = pi(x)): THE ONE COORDINATE THAT DOES SPLIT          [P3]');
console.log('-'.repeat(78));
console.log('');
console.log('  Disjoint prime sets DO compose, and L is superadditive on them (PROVEN,');
console.log('  attack-L-subadditivity.md 1). L = (G2 - 6)/6 in the T_3 coordinate');
console.log('  (attack-L-law.md 1). n counts the primes in [5, x]. So Fekete applies with');
console.log('  NO error term at all -- and here is what it delivers:');
console.log('');
console.log('    x     n      L      L/n');
{
  const xs = [], ys = [];
  for (let i = 2; i < PR.length; i++) {                 // primes from 5 up
    const x = PR[i], n = i - 1, L = (G2[i] - 6) / 6;
    xs.push(n); ys.push(L / n);
    if (n <= 3 || n % 4 === 0 || i === PR.length - 1)
      console.log('  ' + pad(x, 4) + pad(n, 6) + pad(L, 8) + pad(F(L / n, 4), 9) + '   ' + src(i + 1));
  }
  let mono = true, nondec = true;
  for (let k = 1; k < ys.length; k++) { if (ys[k] <= ys[k - 1]) mono = false; if (ys[k] < ys[k - 1]) nondec = false; }
  console.log('');
  console.log('  L/n strictly increasing over the ladder   ' + (mono ? 'YES' : 'no'));
  console.log('  L/n non-decreasing over the ladder        ' + (nondec ? 'YES' : 'no'));
  console.log('  L/n at n = 20                             ' + F(ys[ys.length - 1], 4));
  console.log('');
  console.log('  Fekete gives lim L_n/n = sup L_n/n, and with L ~ x^beta/6 and n ~ x/ln x');
  console.log('  that supremum is +infinity for every beta > 1. The composition law exists');
  console.log('  in coordinate B and the normalisation there is worthless: pi(x) is not');
  console.log('  linear in ln x, so the coordinate that composes and the coordinate the');
  console.log('  exponent lives in are separated by an exponential. That is one obstruction');
  console.log('  seen twice, in (a) and here.');
  console.log('');
  console.log('  P3 predicted L/n increasing without bound and above 14 at n = 20.');
  console.log('  P3 SCORE: ' + ((mono && ys[ys.length - 1] > 14) ? 'HIT' : 'MISS')
    + '   (the 14.2 lands; "increasing" does not -- L/n is flat at 2.0000 across');
  console.log('  n = 2 and n = 3, so the prediction as written is a MISS on its own wording');
  console.log('  and a hit on its substance: Fekete\'s sup is unbounded either way.)');
}
console.log('');

// ------------------------------------------------------------------ (c)(d) defect
console.log('-'.repeat(78));
console.log('(d) THE DEFECT, INTEGER FORM VS THE STATED REAL FORM, BY DOMAIN FLOOR    [P4]');
console.log('-'.repeat(78));
console.log('');
console.log('  import-maxplus.md 4 states the candidate "for all real s, t >= 2" and');
console.log('  evidences it on INTEGER pairs. Ghat is constant on [p, p_next), so the real');
console.log('  form admits s -> p_next^- and its supremum can only be larger. Both forms');
console.log('  below, stratified by the domain floor s0 (a proof would carry one).');
console.log('  Reachability: Ghat is known on [2, 83), so a real pair is evaluable iff');
console.log('  its product interval meets [2, 83).');
console.log('');
console.log('  INTEGER FORM (custody; import-maxplus.md 4 stratification table):');
console.log('');
console.log('    s0   pairs   sup R    ln sup R   at (s,t) -> st');
const INTFLOORS = [2, 4, 5, 7, 8];
for (const s0 of INTFLOORS) {
  let maxR = 0, at = null, np = 0;
  for (let s = s0; s <= 79; s++) for (let t = s; t <= 79; t++) { const st = s * t; if (st > 79) continue; np++;
    const R = Ghat(st) / (Ghat(s) * Ghat(t)); if (R > maxR) { maxR = R; at = [s, t, st]; } }
  console.log('  ' + pad(s0, 4) + pad(np, 8) + pad(F(maxR, 4), 8) + pad(F(Math.log(maxR), 4), 11) + '   (' + at[0] + ', ' + at[1] + ') -> ' + at[2]);
}
console.log('');
console.log('  REAL FORM (new here). s in [p_i, p_{i+1}), t in [p_j, p_{j+1}); the product');
console.log('  ranges over [p_i p_j, p_{i+1} p_{j+1}) and Ghat(st) is maximised by pushing');
console.log('  st to min(p_{i+1} p_{j+1}, 83)^-:');
console.log('');
console.log('    s0   pairs   sup R    ln sup R   witness  s in [.,.)  t in [.,.)  st ->');
const REALFLOORS = [2, 3, 5, 7, 11];
const REALSUP = {};
for (const s0 of REALFLOORS) {
  let maxR = 0, at = null, np = 0;
  for (let i = 0; i < PR.length; i++) {
    if (PR[i] < s0) continue;
    const si = PR[i], sn = (i + 1 < PR.length ? PR[i + 1] : PNEXT);
    for (let j = i; j < PR.length; j++) {
      if (PR[j] < s0) continue;
      const tj = PR[j], tn = (j + 1 < PR.length ? PR[j + 1] : PNEXT);
      if (si * tj >= PNEXT) continue;                       // product interval misses the known range
      np++;
      const cap = Math.min(sn * tn, PNEXT);
      const Gst = GhatBelow(cap);
      const R = Gst / (G2[i] * G2[j]);
      if (R > maxR) { maxR = R; at = [si, sn, tj, tn, cap]; }
    }
  }
  REALSUP[s0] = { R: maxR, at, np };
  if (np === 0) { console.log('  ' + pad(s0, 4) + pad(0, 8) + '      no evaluable pair: p_i p_j >= 83 for every i, j >= this floor'); continue; }
  console.log('  ' + pad(s0, 4) + pad(np, 8) + pad(F(maxR, 4), 8) + pad(F(Math.log(maxR), 4), 11) + '        [' + at[0] + ',' + at[1] + ')      [' + at[2] + ',' + at[3] + ')      ' + at[4] + '^-');
}
console.log('');
{
  const r2 = REALSUP[2].R, r7 = REALSUP[7].R;
  console.log('  P4 predicted real sup R = 7.5 at floor 2 and 1.9 at floor 7, and that the');
  console.log('  integer 2.9333 does NOT bound the stated real candidate.');
  console.log('  P4 SCORE: ' + ((Math.abs(r2 - 7.5) < 1e-9 && Math.abs(r7 - 1.9) < 1e-9 && r2 > 2.9333) ? 'HIT' : 'MISS')
    + '   (floor 2: ' + F(r2, 4) + ', floor 7: ' + F(r7, 4) + ')');
  console.log('  P4 sub-prediction at floor 5 was "expect <= 2.6". Measured ' + F(REALSUP[5].R, 4) + '.');
  console.log('  Sub-prediction SCORE: ' + (REALSUP[5].R <= 2.6 ? 'HIT' : 'MISS') + '.');
}
console.log('');

// ------------------------------------------------------------------ (c) identity
console.log('-'.repeat(78));
console.log('(c) THE IDENTITY, AND WHY IT IS THE WHOLE STORY');
console.log('-'.repeat(78));
console.log('');
console.log('  D(s,t) = ln Ghat(st) - ln Ghat(s) - ln Ghat(t) = S(s) + S(t) - S(st),');
console.log('  S(x) = ln(x^2/Ghat(x)), verified above to 1e-12 at all 104 integer pairs.');
console.log('  Writing S(u) = (2 - beta)u + s(u) with u = ln x, the LINEAR part cancels');
console.log('  identically and D depends only on the SUBLINEAR part s. Under any law');
console.log('  Ghat ~ c x^beta (ln x)^delta this is D = -delta ln(u1 u2/(u1+u2)) - ln c,');
console.log('  bounded above for every delta >= 0 and tending to -infinity along the');
console.log('  diagonal when delta > 0. The candidate is therefore true for cheap reasons');
console.log('  under every growth law this corpus entertains; its truth is not the hard');
console.log('  part, and its constant is set by the SMALLEST arguments.');
console.log('');
console.log('  One consequence worth stating: S(x) > 0 for all x IS the Zone Postulate,');
console.log('  so the slack column whose superadditivity the candidate asserts is itself');
console.log('  an open object (ZONE-POSTULATE.md 3).');
console.log('');

// ------------------------------------------------------------------ (e) threshold
console.log('-'.repeat(78));
console.log('(e) THE TPC THRESHOLD IS THE SLACK COLUMN, TERM BY TERM                 [P5]');
console.log('-'.repeat(78));
console.log('');
console.log('  Iterating Ghat(st) <= C Ghat(s) Ghat(t) sequentially from a base x gives');
console.log('  beta <= (ln C + ln Ghat(x))/ln x, so beta < 2 at base x IFF');
console.log('  ln C < ln(x^2/Ghat(x)) = S(x). For a REAL base pushed to p_next^- the same');
console.log('  line reads ln C < ln(p_next^2 / Ghat(p)). Both columns, all 22 terms:');
console.log('');
console.log('    n    x    Ghat      S(x)     S_next(x)   source');
let bestThresh = -1, bestThreshAt = null;
for (let n = 1; n <= 22; n++) {
  const x = PR[n - 1], G = G2[n - 1], xn = (n < 22 ? PR[n] : PNEXT);
  const sn = Math.log(xn * xn / G);
  if (sn > bestThresh) { bestThresh = sn; bestThreshAt = [x, xn]; }
  console.log('  ' + pad(n, 3) + pad(x, 5) + pad(G, 7) + pad(F(Math.log(x * x / G), 4), 10) + pad(F(sn, 4), 12) + '   ' + src(n));
}
console.log('');
console.log('  best REAL-base threshold on the ladder: ln C < ' + F(bestThresh, 4) + '  (base just below ' + bestThreshAt[1] + ')');
let bestIntThresh = -1, bestIntAt = null;
for (let b = 2; b < PNEXT; b++) { const v = Math.log(b * b / Ghat(b)); if (v > bestIntThresh) { bestIntThresh = v; bestIntAt = b; } }
console.log('  best INTEGER-base threshold:            ln C < ' + F(bestIntThresh, 4) + '  (base b = ' + bestIntAt + ')');
console.log('  and the integer form\'s measured ln C at floor 2 is 1.0761, which clears it.');
console.log('');
console.log('  So the candidate WITH AN EXPLICIT C is TPC-implying exactly when its');
console.log('  constant clears that column. Two directions, and only one of them is sound.');
console.log('  Every sup R below is taken over the REACHABLE range, so it is a LOWER bound');
console.log('  for the true C. A ceiling computed from it is therefore a lower bound for the');
console.log('  true ceiling: "ceiling >= 2" is a SOUND conclusion (the true C is at least');
console.log('  this large, so the true ceiling is at least this high), while "ceiling < 2"');
console.log('  is the optimistic reading and is NOT established. Per domain floor, in the');
console.log('  coordinate the candidate is actually stated in (real):');
console.log('');
console.log('    s0   ln C(real)   best base   beta <=    below 2?   TPC-implying?');
for (const s0 of REALFLOORS) {
  const rec = REALSUP[s0];
  if (!rec || rec.np === 0) { console.log('  ' + pad(s0, 4) + '   no evaluable pair'); continue; }
  const lnC = Math.log(rec.R);
  let best = Infinity, bestAt = null;
  for (let n = 1; n <= 22; n++) {
    const G = G2[n - 1], xn = (n < 22 ? PR[n] : PNEXT);
    if (xn < s0 * s0) continue;                 // halving needs base >= s0^2; sequential needs base >= s0
    const b = (lnC + Math.log(G)) / Math.log(xn);
    if (b < best) { best = b; bestAt = xn; }
  }
  console.log('  ' + pad(s0, 4) + pad(F(lnC, 4), 13) + pad(bestAt + '^-', 12) + pad(F(best, 4), 10) + pad(best < 2 ? 'YES' : 'no', 11) + pad(best < 2 ? 'YES' : 'no', 15));
}
console.log('');
console.log('  and the same for the INTEGER-restricted candidate, which is the statement');
console.log('  import-maxplus.md 4 actually evidenced, and which is enough for the payoff:');
console.log('  Ghat is a step function, so limit existence along the integers gives it');
console.log('  along the reals.');
console.log('');
console.log('  The base must be an INTEGER for the integer-restricted statement, since the');
console.log('  iteration is b, b^2, b^3, ... A real base is licensed only by the real form,');
console.log('  and mixing the two is what this section exists to separate.');
console.log('');
console.log('    s0   ln C(int)   best int base   beta <=    below 2?   beta <= at b = 79');
for (const s0 of INTFLOORS) {
  let maxR = 0;
  for (let s = s0; s <= 79; s++) for (let t = s; t <= 79; t++) { const st = s * t; if (st > 79) continue; const R = Ghat(st) / (Ghat(s) * Ghat(t)); if (R > maxR) maxR = R; }
  const lnC = Math.log(maxR);
  let best = Infinity, bestAt = null;
  for (let b = Math.max(s0, 2); b < PNEXT; b++) {
    const v = (lnC + Math.log(Ghat(b))) / Math.log(b);
    if (v < best) { best = v; bestAt = b; }
  }
  const at79 = (lnC + Math.log(Ghat(79))) / Math.log(79);
  console.log('  ' + pad(s0, 4) + pad(F(lnC, 4), 12) + pad(bestAt, 15) + pad(F(best, 4), 10) + pad(best < 2 ? 'YES' : 'no', 11) + pad(F(at79, 4), 19));
}
console.log('');
console.log('  A CORRECTION TO THIS SCRIPT\'S OWN SUSPICION, recorded because it was written');
console.log('  down before the number came back. import-maxplus.md 4 reports beta <= 1.9500');
console.log('  at base 79 and "1.8992 at the best base of any kind", and the prereg guessed');
console.log('  the second figure took its base from the real form and its constant from the');
console.log('  integer form. It does not: the best INTEGER base is b = 16, and it gives');
console.log('  1.8992 to four places. The record is internally consistent and its');
console.log('  parenthetical ("a base just below a prime is sharpest") is exactly why 16');
console.log('  wins. The suspicion was wrong and the record needs no repair on that line.');
console.log('');
console.log('  What DOES need repair is one sentence: the candidate is stated for all real');
console.log('  s, t >= 2 and evidenced on integer pairs, and the real form at that floor has');
console.log('  ln C >= 2.0149, above every threshold this ladder can offer. The statement');
console.log('  that carries the payoff is the INTEGER one, and it should say so, because');
console.log('  limit existence along the integers already gives it along the reals.');
console.log('');
{
  const rec = REALSUP[7];
  const lnC7 = Math.log(rec.R);
  let best = Infinity, bestAt = null;
  for (let n = 1; n <= 22; n++) { const G = G2[n - 1], xn = (n < 22 ? PR[n] : PNEXT); if (xn < 49) continue;
    const b = (lnC7 + Math.log(G)) / Math.log(xn); if (b < best) { best = b; bestAt = xn; } }
  console.log('  P5 predicted every floor s0 >= 5 TPC-implying at base 79, the escape only at');
  console.log('  floors below 5, and beta <= 1.8506 at floor 7 (using base 79).');
  console.log('  Measured at floor 7, best base ' + bestAt + '^-: beta <= ' + F(best, 4) + '.');
  console.log('  The floor-7 real constant is 1.9 and comes from ONE pair of intervals, the');
  console.log('  only two the range admits, so it carries no power at all about the true C.');
  const f5 = Math.log(REALSUP[5].R);
  let b5 = Infinity; for (let n = 1; n <= 22; n++) { const G = G2[n - 1], xn = (n < 22 ? PR[n] : PNEXT); if (xn < 25) continue; const b = (f5 + Math.log(G)) / Math.log(xn); if (b < b5) b5 = b; }
  console.log('  Measured at floor 5: beta <= ' + F(b5, 4) + '.');
  console.log('  P5 SCORE: ' + ((best < 2 && b5 >= 2) ? 'MISS -- floor 5 does NOT clear' : (best < 2 && b5 < 2) ? 'HIT' : 'MISS'));
  console.log('');
  console.log('  What is SOUND, in the direction the lower bound runs: at floors 2, 3 and 5');
  console.log('  the real form is NOT TPC-implying from any base this ladder knows, because');
  console.log('  its constant is already too large before the true C is even reached. At');
  console.log('  floor 7 the reachable constant would be TPC-implying, but two interval');
  console.log('  pairs cannot bound C. So "with any explicit constant the candidate is');
  console.log('  TPC-implying" is not right as written: the correct statement is');
  console.log('  TPC-implying IFF ln C < ln(x_next^2/Ghat(x)) at some x the ladder knows,');
  console.log('  a threshold that currently tops out at ' + F(bestIntThresh, 4) + ' on integer bases and');
  console.log('  ' + F(bestThresh, 4) + ' on real ones, and RISES as the ladder');
  console.log('  grows. The constant-free requirement is a statement about where the ladder');
  console.log('  stops, not a permanent barrier.');
}
console.log('');
console.log('='.repeat(78));
console.log(FAILS === 0 ? 'SELF-TESTS: all passed.' : 'SELF-TESTS: ' + FAILS + ' FAILURES');
console.log('elapsed ' + ((Date.now() - T0) / 1000).toFixed(1) + ' s');
console.log('='.repeat(78));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/import-interp-01-bgt-defect.js
//   invocation:  node research/import-interp-01-bgt-defect.js
//   code-sha256: 6a8cd602dbd223b374cb7e1cb2c938207dc76d2043b07a32a711f4d77206b75f
//   out-sha256:  7f798666c9c43508482f831d54cef33a6e893103396a2ed92c79f6cfa04155de
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.1 s
// ============================================================================
// ==============================================================================
// IMPORT ROW 9 (BGT INTERPOLATION) -- STAGE 1: REACH, AND THE DEFECT
// ==============================================================================
//
// ------------------------------------------------------------------------------
// SELF-TESTS
// ------------------------------------------------------------------------------
//   ok    A144311 has 22 terms   n = 22
//   ok    one prime per term   22 primes
//   ok    G2 = A144311 + 1 at the 14 corpus-exact terms   2,6,12,30,42,66,108,150,204,258,348,528,546,618
//   ok    ladder strictly increasing
//   ok    import-maxplus-02: 104 integer pairs, sup R = 2.9333 at (4,10)   104 pairs, sup R = 2.9333 at (4,10)
//   ok    gate-multiplies.md 5 slack row reproduced at x = 11..37   1.058, 0.94, 0.984, 0.878, 0.953, 1.182, 1.016, 0.953
//   ok    P2  identity D(s,t) = S(s) + S(t) - S(st) at all 104 pairs   max |D - E| = 8.88e-16
//
// ------------------------------------------------------------------------------
// (a) BGT HYPOTHESIS H1 IN COORDINATE A: DOES THE CONSTRAINT SET SPLIT?   [P1]
// ------------------------------------------------------------------------------
//
//   H1 requires a ground set that splits as a DISJOINT UNION, so that the two
//   halves are members of the same sequence. In coordinate A the size is
//   u = ln x and additivity u1 + u2 is x = s*t. The model at x is the set of
//   primes <= x, one constraint each. So H1 asks for pi(st) = pi(s) + pi(t).
//
//   dpi(s,t) = pi(st) - pi(s) - pi(t)  is the number of constraints an
//   interpolation path would have to CREATE out of nothing:
//
//     s    t     st   pi(s)  pi(t)  pi(st)   dpi
//     2    2      4      1      1       2     0
//     3    5     15      2      3       6     1
//     4   10     40      2      4      12     6
//     5   11     55      3      5      16     8
//     7   11     77      4      5      21    12
//     8    9     72      4      4      20    12
//     4   19     76      2      8      21    11
//     2   39     78      1     12      21     8
//
//   pairs tested                 104
//   dpi = 0 at a pair with st >= 25   0
//   dpi < 0 anywhere                  0
//   min dpi over st >= 25             2
//   max dpi                           12   at (s,t) = (5, 15)
//
//   P1 predicted dpi > 0 at every pair with st >= 25 and max dpi in [10, 18].
//   P1 SCORE: HIT
//
// ------------------------------------------------------------------------------
// (b) COORDINATE B (n = pi(x)): THE ONE COORDINATE THAT DOES SPLIT          [P3]
// ------------------------------------------------------------------------------
//
//   Disjoint prime sets DO compose, and L is superadditive on them (PROVEN,
//   attack-L-subadditivity.md 1). L = (G2 - 6)/6 in the T_3 coordinate
//   (attack-L-law.md 1). n counts the primes in [5, x]. So Fekete applies with
//   NO error term at all -- and here is what it delivers:
//
//     x     n      L      L/n
//      5     1       1   1.0000   corpus-exact
//      7     2       4   2.0000   corpus-exact
//     11     3       6   2.0000   corpus-exact
//     13     4      10   2.5000   corpus-exact
//     29     8      42   5.2500   corpus-exact
//     43    12     102   8.5000   corpus-exact
//     61    16     179  11.1875   A144311
//     79    20     284  14.2000   A144311
//
//   L/n strictly increasing over the ladder   no
//   L/n non-decreasing over the ladder        no
//   L/n at n = 20                             14.2000
//
//   Fekete gives lim L_n/n = sup L_n/n, and with L ~ x^beta/6 and n ~ x/ln x
//   that supremum is +infinity for every beta > 1. The composition law exists
//   in coordinate B and the normalisation there is worthless: pi(x) is not
//   linear in ln x, so the coordinate that composes and the coordinate the
//   exponent lives in are separated by an exponential. That is one obstruction
//   seen twice, in (a) and here.
//
//   P3 predicted L/n increasing without bound and above 14 at n = 20.
//   P3 SCORE: MISS   (the 14.2 lands; "increasing" does not -- L/n is flat at 2.0000 across
//   n = 2 and n = 3, so the prediction as written is a MISS on its own wording
//   and a hit on its substance: Fekete's sup is unbounded either way.)
//
// ------------------------------------------------------------------------------
// (d) THE DEFECT, INTEGER FORM VS THE STATED REAL FORM, BY DOMAIN FLOOR    [P4]
// ------------------------------------------------------------------------------
//
//   import-maxplus.md 4 states the candidate "for all real s, t >= 2" and
//   evidences it on INTEGER pairs. Ghat is constant on [p, p_next), so the real
//   form admits s -> p_next^- and its supremum can only be larger. Both forms
//   below, stratified by the domain floor s0 (a proof would carry one).
//   Reachability: Ghat is known on [2, 83), so a real pair is evaluable iff
//   its product interval meets [2, 83).
//
//   INTEGER FORM (custody; import-maxplus.md 4 stratification table):
//
//     s0   pairs   sup R    ln sup R   at (s,t) -> st
//      2     104  2.9333     1.0761   (4, 10) -> 40
//      4      42  2.9333     1.0761   (4, 10) -> 40
//      5      26  2.7738     1.0202   (6, 12) -> 72
//      7       7  1.5533     0.4404   (8, 9) -> 72
//      8       2  1.5533     0.4404   (8, 9) -> 72
//
//   REAL FORM (new here). s in [p_i, p_{i+1}), t in [p_j, p_{j+1}); the product
//   ranges over [p_i p_j, p_{i+1} p_{j+1}) and Ghat(st) is maximised by pushing
//   st to min(p_{i+1} p_{j+1}, 83)^-:
//
//     s0   pairs   sup R    ln sup R   witness  s in [.,.)  t in [.,.)  st ->
//      2      27  7.5000     2.0149        [2,3)      [2,3)      9^-
//      3      14  5.6667     1.7346        [3,5)      [3,5)      25^-
//      5       6  4.9167     1.5926        [5,7)      [5,7)      49^-
//      7       2  1.9000     0.6419        [7,11)      [7,11)      83^-
//     11       0      no evaluable pair: p_i p_j >= 83 for every i, j >= this floor
//
//   P4 predicted real sup R = 7.5 at floor 2 and 1.9 at floor 7, and that the
//   integer 2.9333 does NOT bound the stated real candidate.
//   P4 SCORE: HIT   (floor 2: 7.5000, floor 7: 1.9000)
//   P4 sub-prediction at floor 5 was "expect <= 2.6". Measured 4.9167.
//   Sub-prediction SCORE: MISS.
//
// ------------------------------------------------------------------------------
// (c) THE IDENTITY, AND WHY IT IS THE WHOLE STORY
// ------------------------------------------------------------------------------
//
//   D(s,t) = ln Ghat(st) - ln Ghat(s) - ln Ghat(t) = S(s) + S(t) - S(st),
//   S(x) = ln(x^2/Ghat(x)), verified above to 1e-12 at all 104 integer pairs.
//   Writing S(u) = (2 - beta)u + s(u) with u = ln x, the LINEAR part cancels
//   identically and D depends only on the SUBLINEAR part s. Under any law
//   Ghat ~ c x^beta (ln x)^delta this is D = -delta ln(u1 u2/(u1+u2)) - ln c,
//   bounded above for every delta >= 0 and tending to -infinity along the
//   diagonal when delta > 0. The candidate is therefore true for cheap reasons
//   under every growth law this corpus entertains; its truth is not the hard
//   part, and its constant is set by the SMALLEST arguments.
//
//   One consequence worth stating: S(x) > 0 for all x IS the Zone Postulate,
//   so the slack column whose superadditivity the candidate asserts is itself
//   an open object (ZONE-POSTULATE.md 3).
//
// ------------------------------------------------------------------------------
// (e) THE TPC THRESHOLD IS THE SLACK COLUMN, TERM BY TERM                 [P5]
// ------------------------------------------------------------------------------
//
//   Iterating Ghat(st) <= C Ghat(s) Ghat(t) sequentially from a base x gives
//   beta <= (ln C + ln Ghat(x))/ln x, so beta < 2 at base x IFF
//   ln C < ln(x^2/Ghat(x)) = S(x). For a REAL base pushed to p_next^- the same
//   line reads ln C < ln(p_next^2 / Ghat(p)). Both columns, all 22 terms:
//
//     n    x    Ghat      S(x)     S_next(x)   source
//     1    2      2    0.6931      1.5041   corpus-exact
//     2    3      6    0.4055      1.4271   corpus-exact
//     3    5     12    0.7340      1.4069   corpus-exact
//     4    7     30    0.4906      1.3946   corpus-exact
//     5   11     42    1.0581      1.3922   corpus-exact
//     6   13     66    0.9402      1.4768   corpus-exact
//     7   17    108    0.9843      1.2067   corpus-exact
//     8   19    150    0.8782      1.2604   corpus-exact
//     9   23    204    0.9529      1.4165   corpus-exact
//    10   29    258    1.1816      1.3150   corpus-exact
//    11   31    348    1.0158      1.3696   corpus-exact
//    12   37    528    0.9527      1.1580   corpus-exact
//    13   41    546    1.1245      1.2198   corpus-exact
//    14   43    618    1.0959      1.2738   corpus-exact
//    15   47    708    1.1379      1.3781   A144311
//    16   53    870    1.1721      1.3866   A144311
//    17   59    966    1.2819      1.3486   A144311
//    18   61   1080    1.2370      1.4247   A144311
//    19   67   1284    1.2516      1.3676   A144311
//    20   71   1398    1.2826      1.3381   A144311
//    21   73   1530    1.2479      1.4059   A144311
//    22   79   1710    1.2946      1.3934   A144311
//
//   best REAL-base threshold on the ladder: ln C < 1.5041  (base just below 3)
//   best INTEGER-base threshold:            ln C < 1.3946  (base b = 66)
//   and the integer form's measured ln C at floor 2 is 1.0761, which clears it.
//
//   So the candidate WITH AN EXPLICIT C is TPC-implying exactly when its
//   constant clears that column. Two directions, and only one of them is sound.
//   Every sup R below is taken over the REACHABLE range, so it is a LOWER bound
//   for the true C. A ceiling computed from it is therefore a lower bound for the
//   true ceiling: "ceiling >= 2" is a SOUND conclusion (the true C is at least
//   this large, so the true ceiling is at least this high), while "ceiling < 2"
//   is the optimistic reading and is NOT established. Per domain floor, in the
//   coordinate the candidate is actually stated in (real):
//
//     s0   ln C(real)   best base   beta <=    below 2?   TPC-implying?
//      2       2.0149        79^-    2.1394         no             no
//      3       1.7346        67^-    2.0737         no             no
//      5       1.5926        67^-    2.0399         no             no
//      7       0.6419        67^-    1.8138        YES            YES
//     11   no evaluable pair
//
//   and the same for the INTEGER-restricted candidate, which is the statement
//   import-maxplus.md 4 actually evidenced, and which is enough for the payoff:
//   Ghat is a step function, so limit existence along the integers gives it
//   along the reals.
//
//   The base must be an INTEGER for the integer-restricted statement, since the
//   iteration is b, b^2, b^3, ... A real base is licensed only by the real form,
//   and mixing the two is what this section exists to separate.
//
//     s0   ln C(int)   best int base   beta <=    below 2?   beta <= at b = 79
//      2      1.0761             16    1.8992        YES             1.9500
//      4      1.0761             16    1.8992        YES             1.9500
//      5      1.0202             16    1.8791        YES             1.9372
//      7      0.4404             10    1.6684        YES             1.8045
//      8      0.4404             10    1.6684        YES             1.8045
//
//   A CORRECTION TO THIS SCRIPT'S OWN SUSPICION, recorded because it was written
//   down before the number came back. import-maxplus.md 4 reports beta <= 1.9500
//   at base 79 and "1.8992 at the best base of any kind", and the prereg guessed
//   the second figure took its base from the real form and its constant from the
//   integer form. It does not: the best INTEGER base is b = 16, and it gives
//   1.8992 to four places. The record is internally consistent and its
//   parenthetical ("a base just below a prime is sharpest") is exactly why 16
//   wins. The suspicion was wrong and the record needs no repair on that line.
//
//   What DOES need repair is one sentence: the candidate is stated for all real
//   s, t >= 2 and evidenced on integer pairs, and the real form at that floor has
//   ln C >= 2.0149, above every threshold this ladder can offer. The statement
//   that carries the payoff is the INTEGER one, and it should say so, because
//   limit existence along the integers already gives it along the reals.
//
//   P5 predicted every floor s0 >= 5 TPC-implying at base 79, the escape only at
//   floors below 5, and beta <= 1.8506 at floor 7 (using base 79).
//   Measured at floor 7, best base 67^-: beta <= 1.8138.
//   The floor-7 real constant is 1.9 and comes from ONE pair of intervals, the
//   only two the range admits, so it carries no power at all about the true C.
//   Measured at floor 5: beta <= 2.0399.
//   P5 SCORE: MISS -- floor 5 does NOT clear
//
//   What is SOUND, in the direction the lower bound runs: at floors 2, 3 and 5
//   the real form is NOT TPC-implying from any base this ladder knows, because
//   its constant is already too large before the true C is even reached. At
//   floor 7 the reachable constant would be TPC-implying, but two interval
//   pairs cannot bound C. So "with any explicit constant the candidate is
//   TPC-implying" is not right as written: the correct statement is
//   TPC-implying IFF ln C < ln(x_next^2/Ghat(x)) at some x the ladder knows,
//   a threshold that currently tops out at 1.3946 on integer bases and
//   1.5041 on real ones, and RISES as the ladder
//   grows. The constant-free requirement is a statement about where the ladder
//   stops, not a permanent barrier.
//
// ==============================================================================
// SELF-TESTS: all passed.
// elapsed 0.0 s
// ==============================================================================
// ============================================================================
// READINGS
// ============================================================================

// 1. BGT's hypothesis H1 FAILS in the coordinate the exponent lives in, and the
//    failure is countable. Under x = s*t the constraint set is the primes <= st,
//    and dpi = pi(st) - pi(s) - pi(t) is 0 at no pair with st >= 25, is never
//    negative, has minimum 2 over that range and maximum 12 at (5, 15). An
//    interpolation path from the split pair to the joint object would have to
//    CREATE up to twelve constraints out of nothing, which is not an
//    interpolation but a different model. P1: HIT.
//
// 2. The one coordinate that DOES split is worthless, and that is the same
//    obstruction seen a second time. On disjoint prime sets L is superadditive
//    (PROVEN elsewhere), so in n = pi(x) Fekete needs no error term at all --
//    and its limit is sup L_n/n, which the ladder carries to 14.2000 at n = 20
//    and which is +infinity for every beta > 1. pi(x) is not linear in ln x, so
//    the coordinate that composes and the coordinate the exponent lives in are
//    separated by an exponential. P3 as WORDED: MISS -- L/n is not even
//    non-decreasing, it falls at the x = 41 flat spot. P3 in substance: the 14.2
//    lands and the limit is unbounded either way.
//
// 3. The submultiplicativity defect IS the Overshoot slack's superadditivity
//    defect: D(s,t) = S(s) + S(t) - S(st) to 8.88e-16 at all 104 pairs. This is
//    an identity, not a fit, and it has one consequence that reframes the whole
//    route: the LINEAR part of S cancels, so the candidate is a statement about
//    the SUBLINEAR part of ln G2 and about nothing else. P2: HIT.
//
// 4. The candidate is stated for reals and evidenced on integers, and the two
//    are not the same statement. Ghat is constant on [p, p_next), so the real
//    form admits s -> p_next^-, and its reachable sup R is 7.5000 at floor 2,
//    5.6667 at floor 3, 4.9167 at floor 5 and 1.9000 at floor 7 -- against the
//    integer form's 2.9333, 2.9333, 2.7738, 1.5533. P4: HIT at floors 2 and 7,
//    MISS on the floor-5 sub-prediction, which guessed 2.6 and measured 4.9167.
//
// 5. TPC-implication is not a property of "having a constant". It is the single
//    inequality ln C < ln(x_next^2/Ghat(x)) against a column the corpus already
//    keeps, and that column tops out at 1.3946 on integer bases (b = 66) and
//    1.5041 on real ones. The integer form's 1.0761 clears it; the real form's
//    2.0149 at floor 2 does not, and neither does 1.7346 at floor 3 or 1.5926 at
//    floor 5. P5: MISS -- the prediction said every floor >= 5 clears, and floor
//    5 gives 2.0399.
//
// 6. Only one direction of that table is sound, and it is worth stating twice.
//    Every sup R is taken over the reachable range, so it is a LOWER bound for
//    the true C; a ceiling built from it is a lower bound for the true ceiling.
//    "Ceiling >= 2" is therefore a conclusion (floors 2, 3, 5 in the real form
//    are NOT TPC-implying from any base this ladder knows). "Ceiling < 2" is
//    only the optimistic reading, and at floor 7 it rests on the two interval
//    pairs the range admits.
//
// 7. This script's own suspicion about the max-plus record was WRONG and is
//    recorded as wrong. The prereg guessed that "1.8992 at the best base of any
//    kind" mixed a real base with an integer constant. It does not: the best
//    INTEGER base is b = 16 and it gives 1.8992. The record is internally
//    consistent. What does need one sentence of repair is the domain: the
//    candidate should be stated for integers, which is the statement its
//    evidence covers and which already carries the payoff, because Ghat is a
//    step function and limit existence along the integers gives it along the
//    reals.
//
// 8. The threshold RISES. The S_next column runs 1.3922 at x = 11 to 1.3934 at
//    x = 79 with 1.2067 in between, and the slack S(x) itself runs 1.0581 to
//    1.2946 over the same span. So "the candidate must be proved constant-free
//    or not at all" is a statement about where the ladder stops, not a permanent
//    barrier: a constant just above today's threshold becomes TPC-implying as
//    soon as the ladder reaches a base whose column entry exceeds it.
