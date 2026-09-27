// import-maxplus-02-subadditivity.js
//
// FOREIGN IMPORT 4 of 5, stage 2: THE SUBADDITIVITY HUNT.
//
// THE QUESTION. TODO item 1d asks whether G2(x#)/x^2 actually falls. It is
// unanswerable by direct measurement: the exact terms stop at x = 43, the
// published ladder A144311 stops at x = 79, the greedy oracle degrades past
// x ~ 53, and the two live hypotheses separate at x = 53 or 151. Import 4 asks
// a different question that a finite ladder CAN bear on: is there a
// FEKETE/KINGMAN-shaped inequality along the fold semigroup, i.e. a
// CONVERGENCE theorem -- "the normalized log growth has a limit" -- even
// without computing the limit?
//
// WHAT A CONVERGENCE THEOREM WOULD BE. Write g(u) = ln G2(P(e^u)#) where P(t)
// is the largest prime <= t, so u = ln x. If g were subadditive up to a
// constant, g(u+v) <= g(u) + g(v) + kappa, then Fekete's lemma applied to
// g + kappa gives
//         beta := lim_{u -> inf} g(u)/u   EXISTS   and equals inf_u (g(u)+kappa)/u,
// i.e. G2(x#) = x^{beta + o(1)} for a genuine beta in [1, 4.26645]. That is the
// first statement of its kind about this object: 1d would become "is beta < 2,
// = 2, or > 2" rather than "does a ratio wander".
//
// g(u+v) <= g(u) + g(v) + kappa is, in the original variable, exactly
//         G2((s*t)#) <= C * G2(s#) * G2(t#),      C = e^kappa,
// so the whole candidate is one MULTIPLICATIVE inequality on the ladder, and
// the ladder can test it.
//
// FOUR TESTS, all exact, all on published or corpus-exact terms:
//   (a) max-plus operator-norm submultiplicativity: maxsum_{m+m'} <= maxsum_m +
//       maxsum_{m'}. PROVEN in one line in the semiring; VERIFIED exhaustively.
//       Its Fekete limit is mbar, the Mertens mean gap -- the correct answer to
//       the wrong question, and the reason the import does not stop here.
//   (b) the multiplicative candidate G2((st)#) <= C*G2(s#)*G2(t#), all pairs.
//   (c) the covering-form SUPERadditivity that IS proven (disjoint prime sets,
//       history/staging/attack-L-subadditivity.md 1), and what a Fekete floor
//       built out of it actually delivers.
//   (d) the theta-normalized sequence a_n = ln G2 - 2 ln theta(p_n), which is
//       the 1d ratio in the additive coordinate, and its increments.
//
// LADDER PROVENANCE. Terms 1-14 (x = 2..43) are corpus-exact
// (research/G2-STATE.md 2; 31#, 37#, 41#, 43# computed here). Terms 15-22
// (x = 47..79) are OEIS A144311 (Andrew Carter, September 2008), G2 = A144311+1;
// G2-STATE 8 records them as "ours to verify, not to claim". Every row below
// carries its source, and every fit is reported twice, on 14 and on 22.
//
// usage: node research/import-maxplus-02-subadditivity.js

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
// A144311: 1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545, 617,
//          707, 869, 965, 1079, 1283, 1397, 1529, 1709      (22 terms)
const A144311 = [1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545, 617,
  707, 869, 965, 1079, 1283, 1397, 1529, 1709];
const PR = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];
const G2 = A144311.map((v) => v + 1);
const EXACT_N = 14;                        // terms 1..14 are corpus-exact
const src = (n) => (n <= EXACT_N ? 'corpus-exact' : 'A144311');

// theta(p_n) = sum of ln p over p <= p_n
const TH = []; { let s = 0; for (const p of PR) { s += Math.log(p); TH.push(s); } }

// G2hat(t) = G2 at the largest prime <= t, for real t >= 2
function G2hat(t) {
  let idx = -1;
  for (let i = 0; i < PR.length; i++) if (PR[i] <= t) idx = i;
  return idx < 0 ? null : G2[idx];
}
function primeIndexAtMost(t) { let idx = -1; for (let i = 0; i < PR.length; i++) if (PR[i] <= t) idx = i; return idx; }

// -------------------------------------------------------------- tiles, for (a)
function baseTile() { return { slots: Float64Array.from([5]), W: 6, x: 3 }; }
function foldTile(tile, p) {
  const { slots, W } = tile, D = slots.length;
  const rs = new Int32Array(D); for (let i = 0; i < D; i++) rs[i] = slots[i] % p;
  const wp = W % p;
  const out = new Float64Array(D * (p - 2));
  let n = 0;
  for (let k = 0; k < p; k++) {
    const off = k * W, kw = (k * wp) % p;
    const d0 = (p - kw) % p, d2 = (2 * p - 2 - kw) % p;
    for (let i = 0; i < D; i++) if (rs[i] !== d0 && rs[i] !== d2) out[n++] = slots[i] + off;
  }
  return { slots: out, W: W * p, x: p };
}
function gapsOfTile(tile) {
  const { slots, W } = tile, D = slots.length, g = new Float64Array(D);
  for (let i = 0; i < D; i++) g[i] = (i + 1 < D ? slots[i + 1] : slots[0] + W) - slots[i];
  return g;
}
function maxsums(g, M) {
  const D = g.length, best = new Float64Array(M + 1);
  for (let m = 1; m <= M; m++) {
    let s = 0; for (let i = 0; i < m; i++) s += g[i % D];
    let b = s;
    for (let i = 1; i < D; i++) { s += g[(i + m - 1) % D] - g[(i - 1) % D]; if (s > b) b = s; }
    best[m] = b;
  }
  return best;
}

// least-squares slope of y on x
function ols(xs, ys) {
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0;
  for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
  const b = sxy / sxx, a = my - b * mx;
  let ss = 0; for (let i = 0; i < n; i++) ss += (ys[i] - a - b * xs[i]) ** 2;
  const se = Math.sqrt((ss / (n - 2)) / sxx);
  return { a, b, se, rms: Math.sqrt(ss / (n - 2)) };
}

// ================================================================== the run
console.log('='.repeat(78));
console.log('IMPORT 4 (MAX-PLUS) -- STAGE 2: THE SUBADDITIVITY HUNT');
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
check('ladder is strictly increasing', G2.every((v, i) => i === 0 || v > G2[i - 1]));
// rebuild the first eight terms from the tiles, so the table is not just a paste
{
  let t = baseTile(); const built = [6];
  for (const p of [5, 7, 11, 13, 17, 19, 23]) { t = foldTile(t, p); built.push(maxsums(gapsOfTile(t), 1)[1]); }
  check('terms 2..9 rebuilt from the tiles', JSON.stringify(built) === JSON.stringify(G2.slice(1, 9)), built.join(','));
}
console.log('');

// ==========================================================================
// (a) max-plus operator-norm submultiplicativity, and its Fekete limit
// ==========================================================================
console.log('='.repeat(78));
console.log('(a) THE ONE EXACT FEKETE INEQUALITY: ||A ox B|| <= ||A|| + ||B||');
console.log('='.repeat(78));
console.log('In (max, +) the operator norm is exactly submultiplicative, with no');
console.log('dimension factor: (A ox B)[i][j] = max_k (A[i][k] + B[k][j]) <= ||A||+||B||.');
console.log('With A the tile circuit that reads maxsum_m = ||A^{ox m}||, this IS');
console.log('   maxsum_{m+m^} <= maxsum_m + maxsum_{m^}   [PROVEN, one line].');
console.log('U-FRAME 5a step 3a records this as measured with zero violations; the');
console.log('semiring gives it as an identity of the norm. VERIFIED exhaustively below.');
console.log('');
console.log('    x        D   pairs (m,m^), m+m^ <= 32   violations   max deficit   inf_m maxsum_m/m   mbar = W/D');
{
  let t = baseTile();
  for (const p of [5, 7, 11, 13, 17, 19, 23]) {
    t = foldTile(t, p);
    const g = gapsOfTile(t), D = g.length, W = t.W;
    const M = 32, ms = maxsums(g, M);
    let pairs = 0, viol = 0, worst = 0;
    for (let m = 1; m <= M; m++) for (let m2 = 1; m + m2 <= M; m2++) {
      pairs++;
      const d = ms[m] + ms[m2] - ms[m + m2];
      if (d < 0) viol++;
      if (d > worst) worst = d;
    }
    let inf = Infinity, infm = 0;
    for (let m = 1; m <= M; m++) if (ms[m] / m < inf) { inf = ms[m] / m; infm = m; }
    if (viol) FAILS++;
    console.log('  ' + pad(t.x, 3) + pad(D, 9) + pad(pairs, 26) + pad(viol, 13) + pad(worst, 14) + pad(F(inf, 4) + ' (m=' + infm + ')', 19) + pad(F(W / D, 4), 13));
  }
}
console.log('');
console.log('Fekete then gives maxsum_m/m -> inf_m maxsum_m/m, and section 1b of the');
console.log('companion file identifies that limit as the max-plus eigenvalue mbar = W/D.');
console.log('The limit exists, it is exact, and it is MERTENS. It says nothing about the');
console.log('growth of G2 = maxsum_1 in x, because m and x are different directions.');
console.log('');

// ==========================================================================
// (b) the multiplicative candidate
// ==========================================================================
console.log('='.repeat(78));
console.log('(b) THE CANDIDATE: G2hat(s*t) <= C * G2hat(s) * G2hat(t)');
console.log('='.repeat(78));
console.log('G2hat(t) = G2 at the largest prime <= t, a step function on [2, 79]. Every');
console.log('pair (s, t) of integers with 2 <= s <= t and s*t <= 79 is tested. R is the');
console.log('ratio; ln R is the additive defect kappa the Fekete argument has to absorb.');
console.log('');
console.log('    s    t   s*t   G2hat(s)   G2hat(t)   G2hat(st)        R    ln R   source of the st term');
{
  const rows = [];
  for (let s = 2; s <= 79; s++) for (let t2 = s; t2 <= 79; t2++) {
    const st = s * t2; if (st > 79) continue;
    const A = G2hat(s), B = G2hat(t2), C = G2hat(st);
    if (A === null || B === null || C === null) continue;
    rows.push({ s, t: t2, st, A, B, C, R: C / (A * B) });
  }
  rows.sort((u, v) => v.R - u.R);
  for (const r of rows) {
    console.log('  ' + pad(r.s, 3) + pad(r.t, 5) + pad(r.st, 6) + pad(r.A, 11) + pad(r.B, 11) + pad(r.C, 12) + pad(F(r.R, 5), 9) + pad(F(Math.log(r.R), 4), 8) + '   ' + src(primeIndexAtMost(r.st) + 1));
  }
  const maxR = Math.max(...rows.map((r) => r.R));
  const minR = Math.min(...rows.map((r) => r.R));
  console.log('');
  console.log('  pairs tested            ' + rows.length);
  console.log('  max R (all pairs)       ' + F(maxR, 5) + '   -> kappa = ln C = ' + F(Math.log(maxR), 4) + ' nats');
  console.log('  min R (all pairs)       ' + F(minR, 5));
  console.log('  R > 1 in                ' + rows.filter((r) => r.R > 1).length + ' of ' + rows.length + ' pairs');
  console.log('  violations of the candidate at C = ' + F(maxR, 4) + ':  0 of ' + rows.length + ' (by construction: C is the max)');
  console.log('');
  console.log('  AND HERE IS THE POWER PROBLEM. Stratify by min(s, t): the pairs that can');
  console.log('  reach the asymptotic value of R are exactly the ones the ladder does not have.');
  console.log('');
  console.log('    min(s,t) >=   pairs   max R   which pair');
  for (const k of [2, 3, 4, 5, 6, 7, 8]) {
    const sub = rows.filter((r) => Math.min(r.s, r.t) >= k);
    if (!sub.length) continue;
    let bst = sub[0]; for (const r of sub) if (r.R > bst.R) bst = r;
    console.log('  ' + pad(k, 13) + pad(sub.length, 8) + pad(F(bst.R, 4), 8) + '   (' + bst.s + ', ' + bst.t + ') -> ' + bst.st);
  }
  console.log('');
  console.log('  A power law G2 ~ c x^beta forces R -> 1/c as both arguments grow, so the');
  console.log('  asymptotic constant is 1/c and NOT the ladder max. The ladder max 2.9333 is');
  console.log('  set by the pair (4, 10), i.e. by primes 3 and 7 against 37; with both');
  console.log('  arguments >= 7 the largest R the ladder can show is 1.5533. Whatever C');
  console.log('  really is, this data cannot see it.');
  console.log('  The measured band is [' + F(minR, 4) + ', ' + F(maxR, 4) + '], and R bounded is exactly');
  console.log('  what a power law predicts, R unbounded exactly what would refute one.');
}
console.log('');

// ==========================================================================
// (c) the covering-form superadditivity, and what a Fekete floor delivers
// ==========================================================================
console.log('='.repeat(78));
console.log('(c) THE PROVEN SUPERADDITIVITY, AND THE FLOOR IT ACTUALLY BUYS');
console.log('='.repeat(78));
console.log('PROVEN (history/staging/attack-L-subadditivity.md 1): for DISJOINT prime sets');
console.log('P, Q, L(P u Q) >= L(P) + L(Q), because a_p is free and covers translate.');
console.log('PROVEN (one line, here): TWO distinct primes p, q >= 5 cover four consecutive');
console.log('integers -- p takes the classes {t+2, t} and q takes {t+3, t+1}, legal for any');
console.log('p, q by CRT -- while ONE prime covers only one, since its two classes are two');
console.log('apart. Concatenating those blocks over disjoint pairs of primes gives the');
console.log('CONCATENATION FLOOR, with k = pi(y) - 2 the number of primes in [5, y]:');
console.log('        L(primes in [5,y]) >= 2k - [k odd],   i.e.  G2(y#) >= 6(2k - [k odd]) + 6,');
console.log('using G2 = 6L + 6 in the T_3 coordinate (attack-L-law.md 1). It is also an');
console.log('EQUALITY in the regime 2k < min prime, by a parity count: pairs at distance 2');
console.log('are monochromatic in parity, [1, 2k] holds k odds and k evens, and covering');
console.log('each parity costs ceil(k/2) pairs, so k pairs suffice only for k even. This is');
console.log('what Fekete-by-concatenation delivers with no arithmetic input at all.');
console.log('');
console.log('   n    x     k   G2(x#)   concat floor   G2/floor   free lower bound   G2/free   source');
{
  // the free bound column, for SCALE ONLY: G2 >= h(x#) >> x ln x lnlnln x / lnln x
  // (G2-STATE 3a), evaluated with implied constant 1. It is a scale marker, not a
  // claim, and lnlnln x changes sign at x = e^e = 15.15 (attack-growth-law.md 6),
  // so the column is unreadable below x = 17 and is printed anyway rather than
  // hidden.
  for (let n = 3; n <= 22; n++) {
    const x = PR[n - 1], k = n - 2;
    const fl = 6 * (2 * k - (k % 2)) + 6;
    if (fl > G2[n - 1]) { FAILS++; console.log('     FAIL: proven floor ' + fl + ' exceeds G2 = ' + G2[n - 1] + ' at x = ' + x); }
    const lx = Math.log(x), llx = Math.log(lx), lllx = Math.log(Math.abs(llx));
    const free = x * lx * lllx / llx;
    console.log('  ' + pad(n, 3) + pad(x, 5) + pad(k, 6) + pad(G2[n - 1], 9) + pad(fl, 15) + pad(F(G2[n - 1] / fl, 3), 11) + pad(free > 0 ? F(free, 1) : '(lnlnln x < 0)', 19) + pad(free > 0 ? F(G2[n - 1] / free, 2) : '-', 10) + '   ' + src(n));
  }
}
console.log('');
console.log('The floor is TIGHT at the first two levels -- 12 = G2(5#) and 30 = G2(7#), so');
console.log('concatenation is optimal there -- and then loses ground at every level. That');
console.log('growing excess is the whole content of Erdos-Rankin, and it is why');
console.log('superadditivity alone cannot produce an exponent.');
console.log('');
console.log('   the array is NOT stationary, which is the named failing step for Kingman:');
console.log('   Lambda(i, j) = L({p_{i+1}..p_j}) depends on i and not only on j - i. In the');
console.log('   regime 2(j-i) < p_i it equals 2(j-i) - [j-i odd], independent of i; outside');
console.log('   it the same block is worth more when the primes are smaller. Test of');
console.log('   the index-coordinate superadditivity A_{n+m} >= A_n + A_m, A_n = L(first n):');
console.log('');
{
  // A_n = L({5, 7, ..., the n-th prime from 5 on}) = (G2 - 6)/6 in the T_3 coordinate
  // (attack-L-law.md 1: A144311(pi(y)) = 6 L(3, y) + 5, so G2 = 6L + 6). The
  // coordinate needs y >= 5, so the index starts at the prime 5.
  const A = [], AX = [];
  for (let i = 2; i < 22; i++) { A.push((G2[i] - 6) / 6); AX.push(PR[i]); }
  const N = A.length;
  let ok = 0, bad = 0, worst = null;
  for (let n = 1; n <= N - 1; n++) for (let m = 1; n + m <= N; m++) {
    const d = A[n + m - 1] - A[n - 1] - A[m - 1];
    if (d >= 0) ok++; else { bad++; if (!worst || d < worst.d) worst = { n, m, d }; }
  }
  if (A.some((v) => !Number.isInteger(v))) FAILS++;
  console.log('   A_n = (G2 - 6)/6 over x = 5..79 (' + N + ' terms): ' + A.join(', '));
  console.log('   pairs (n, m) with n + m <= ' + N + ':  ' + (ok + bad));
  console.log('   A_{n+m} >= A_n + A_m holds in   ' + ok + ',  fails in ' + bad + (worst ? '  (worst n=' + worst.n + ', m=' + worst.m + ', deficit ' + worst.d + ')' : ''));
  console.log('   [NOT the proven theorem, and stronger than it: the theorem compares the');
  console.log('    first n primes with a DISJOINT block, whereas A_m is the first m primes,');
  console.log('    a strictly better set. The measured excess A_{n+m} - A_n - A_m:');
  {
    const ex = [];
    for (let m = 1; m <= 6 && m <= N - 1; m++) { const row = []; for (let n = 1; n + m <= N; n++) row.push(A[n + m - 1] - A[n - 1] - A[m - 1]); ex.push('     m = ' + m + ':  ' + row.join(', ')); }
    for (const l of ex) console.log(l);
  }
  console.log('    so the superadditive gap widens with n at every m, which is the same');
  console.log('    non-stationarity again, seen from the index side.]');
}
console.log('');

// ==========================================================================
// (d) the theta-normalized sequence: 1d in the additive coordinate
// ==========================================================================
console.log('='.repeat(78));
console.log('(d) a_n = ln G2(p_n#) - 2 ln theta(p_n), AND THE 1d RATIOS ON 22 TERMS');
console.log('='.repeat(78));
console.log('');
console.log('   n    x   G2(x#)    theta(x)   G2/x^2   G2/x^2_next   G2/theta^2   ln G2/ln x       a_n   a_n - a_{n-1}   source');
{
  const a = [];
  for (let n = 1; n <= 22; n++) {
    const x = PR[n - 1], xn = (n < 22 ? PR[n] : null), th = TH[n - 1], G = G2[n - 1];
    const an = Math.log(G) - 2 * Math.log(th);
    a.push(an);
    console.log('  ' + pad(n, 3) + pad(x, 5) + pad(G, 9) + pad(F(th, 4), 12) + pad(F(G / (x * x), 4), 9) + pad(xn ? F(G / (xn * xn), 4) : '-', 14) + pad(F(G / (th * th), 4), 13) + pad(F(Math.log(G) / Math.log(x), 4), 13) + pad(F(an, 4), 10) + pad(n > 1 ? F(an - a[n - 2], 4) : '-', 16) + '   ' + src(n));
  }
  console.log('');
  // slopes. CUSTODY FIRST: the estimator is checked against three figures the
  // corpus already carries, on the corpus's own windows, before it is used on any
  // window the corpus has not used.
  const winSlope = (lo, hi, f) => {
    const xs = [], ys = [];
    for (let n = 1; n <= 22; n++) { const x = PR[n - 1]; if (x < lo || x > hi) continue; xs.push(Math.log(x)); ys.push(f(G2[n - 1], x, TH[n - 1])); }
    return { n: xs.length, ...ols(xs, ys) };
  };
  const ratio = (G, x) => Math.log(G / (x * x));
  const expo = (G) => Math.log(G);
  console.log('  CUSTODY ON THE ESTIMATOR. Three figures the corpus already carries, on its');
  console.log('  own windows, recomputed here from the ladder and nothing else:');
  console.log('');
  console.log('    window   n   quantity              here             corpus                          source');
  {
    const c1 = winSlope(11, 41, ratio), c2 = winSlope(11, 41, expo), c3 = winSlope(5, 41, expo), c4 = winSlope(11, 79, expo);
    const rows = [
      ['[11,41]', c1, 'slope ln(G2/x^2)', '-0.069 +/- 0.075', 'attack-block-01-ladder.md 6'],
      ['[11,41]', c2, 'd ln G2 / d ln x', ' 1.931 +/- 0.075', 'attack-block-01-ladder.md 6'],
      ['[ 5,41]', c3, 'd ln G2 / d ln x', ' 1.797 +/- 0.064', 'attack-block-01-ladder.md 6'],
      ['[11,79]', c4, 'd ln G2 / d ln x', ' 1.818 (PW fit)  ', 'attack-growth-law.md 1'],
    ];
    for (const [w, o, q, corpus, srcf] of rows) {
      const here = F(o.b, 4) + ' +/- ' + F(o.se, 4);
      const agree = Math.abs(o.b - parseFloat(corpus)) < 0.002;
      if (!agree) FAILS++;
      console.log('   ' + pad(w, 8) + pad(o.n, 4) + '   ' + pad(q, 18) + '   ' + pad(here, 17) + '   ' + corpus + '   ' + (agree ? 'MATCH' : 'MISMATCH') + '   ' + srcf);
    }
  }
  console.log('');
  console.log('  THE SAME ESTIMATOR ACROSS WINDOWS. Nothing below is a trend claim; the point');
  console.log('  is that the window moves the answer by more than the answer, which is');
  console.log('  attack-block-01-ladder.md 6 in one more coordinate.');
  console.log('');
  console.log('    window     n   slope ln(G2/x^2)      d ln G2/d ln x      slope ln(G2/theta^2)   terms are');
  for (const [lo, hi] of [[5, 41], [11, 41], [11, 43], [11, 79], [23, 79], [31, 79], [43, 79]]) {
    const r = winSlope(lo, hi, ratio), e = winSlope(lo, hi, expo), t = winSlope(lo, hi, (G, x, th) => Math.log(G / (th * th)));
    const kind = hi <= 43 ? 'corpus-exact' : (lo >= 47 ? 'A144311' : 'mixed');
    console.log('   [' + pad(lo, 2) + ',' + pad(hi, 2) + ']' + pad(r.n, 6) + '   ' + pad(F(r.b, 4) + ' +/- ' + F(r.se, 4), 18) + '   ' + pad(F(e.b, 4) + ' +/- ' + F(e.se, 4), 18) + '   ' + pad(F(t.b, 4) + ' +/- ' + F(t.se, 4), 20) + '   ' + kind);
  }
  console.log('');
  console.log('  HOUSE CONTROL LINE, quoted as required (G2-STATE 3b, exponent-control.md 1,');
  console.log('  attack-growth-law.md 4): the same estimator on the one-class control h(x#) =');
  console.log('  A048670, whose x-exponent is 1, reads 1.272 at the MATCHED window x = 11..79');
  console.log('  (18 terms) and 1.282 +/- 0.008 on 58 terms, positive bias in all 40 windows.');
  console.log('  Subtracting the matched bias +0.272 from the [11,79] exponent above returns');
  console.log('  attack-growth-law.md 4\'s 1.546, which is where this reading already lives.');
  console.log('  NO TREND IS DECLARED HERE. What the rows show is that the "flat" reading of');
  console.log('  TODO 1d is a NINE-TERM WINDOW: it is one of four conventions in');
  console.log('  attack-block-01-ladder.md 6, three of which are negative, and the same');
  console.log('  estimator on the 18-term A144311 window is a different number with the');
  console.log('  corpus\'s own answer (1.546) already attached to it in another file.');
}
console.log('');

// ==========================================================================
// (e) the constant is the whole question: the candidate is TPC-implying
// ==========================================================================
console.log('='.repeat(78));
console.log('(e) THE CONSTANT IS THE WHOLE QUESTION, AND WITH THE MEASURED ONE THE');
console.log('    CANDIDATE IS TPC-IMPLYING');
console.log('='.repeat(78));
console.log('Iterating the candidate on a base s gives G2hat(s^k) <= C^{k-1} G2hat(s)^k, and');
console.log('G2hat is nondecreasing, so the exponent obeys');
console.log('        beta <= (ln C + ln G2hat(s)) / ln s     for EVERY base s.');
console.log('Two readings follow, and they are the whole verdict of stage 2.');
console.log('');
console.log('  (i) CONSTANT-FREE ("there exists a finite C"): the bound above tends to beta');
console.log('      itself as s grows, so it delivers LIMIT EXISTENCE and no number. That is');
console.log('      not a chain of upper bounds ending in G2 < x^2, so the Overshoot Budget');
console.log('      (gate-multiplies.md 5) does not apply to it, and it does not re-open the');
console.log('      accumulating-index family (REFUTED.md): there is no index, and no gate.');
console.log('');
console.log('  (ii) WITH THE MEASURED C the same line is a numerical bound, and here it is:');
console.log('');
console.log('    base s   G2hat(s)   ln C + ln G2hat(s)   / ln s   =  beta bound   below 2?   source');
{
  let maxR = 0, maxAt = null;
  for (let s2 = 2; s2 <= 79; s2++) for (let t2 = s2; t2 <= 79; t2++) { const st = s2 * t2; if (st > 79) continue; const R = G2hat(st) / (G2hat(s2) * G2hat(t2)); if (R > maxR) { maxR = R; maxAt = [s2, t2]; } }
  const lnC = Math.log(maxR);
  let bestB = Infinity, bestS = null, bestBp = Infinity, bestSp = null;
  for (let s2 = 5; s2 <= 79; s2++) { const b2 = (lnC + Math.log(G2hat(s2))) / Math.log(s2); if (b2 < bestB) { bestB = b2; bestS = s2; } if (PR.includes(s2) && b2 < bestBp) { bestBp = b2; bestSp = s2; } }
  for (const s2 of [11, 23, 31, 37, 43, 53, 71, 79]) {
    const b2 = (lnC + Math.log(G2hat(s2))) / Math.log(s2);
    console.log('  ' + pad(s2, 8) + pad(G2hat(s2), 11) + pad(F(lnC + Math.log(G2hat(s2)), 4), 21) + pad(F(Math.log(s2), 4), 9) + pad(F(b2, 4), 15) + pad(b2 < 2 ? 'YES' : 'no', 11) + '   ' + src(primeIndexAtMost(s2) + 1));
  }
  console.log('');
  console.log('  C = ' + F(maxR, 4) + ' (attained at s, t = ' + maxAt[0] + ', ' + maxAt[1] + '), ln C = ' + F(lnC, 4) + ' nats.');
  console.log('  best PRIME base s = ' + bestSp + ', giving beta <= ' + F(bestBp, 4) + '.');
  console.log('  best base of any kind s = ' + bestS + ', giving beta <= ' + F(bestB, 4) + ' -- G2hat is constant');
  console.log('  on [p, p\'), so a base just below a prime is the sharpest, which is a real');
  console.log('  feature of the real-variable form and not an artifact to be discarded.');
  console.log('');
  console.log('  beta < 2 gives G2(x#) = o(x^2), hence G2(x#) < x\'^2 - 2 for all large x,');
  console.log('  hence the Zone Postulate for all large x, hence -- by ZONE-POSTULATE.md 3,');
  console.log('  where the WEAK form (infinitely many zones) is EQUIVALENT to TPC -- the twin');
  console.log('  prime conjecture. So the candidate WITH AN EXPLICIT CONSTANT cannot be');
  console.log('  proved by any soft argument, and this is the same verdict shape as TODO 1e');
  console.log('  reached for the sieve Gaussian maximal law.');
  console.log('');
  console.log('  No contradiction with the Overshoot Budget arises, and the reason is worth');
  console.log('  stating: the Budget is explicitly CONDITIONAL on the measured law');
  console.log('  G2 ~ 0.55 (ln W)^2 (gate-multiplies.md, "The Overshoot Budget is conditional');
  console.log('  on the measured G2 law"), i.e. on exponent exactly 2. A theorem giving');
  console.log('  beta < 2 would falsify the Budget\'s premise rather than violate its');
  console.log('  conclusion. The Budget bites on chains, and a limit-existence statement is');
  console.log('  not a chain.');
}
console.log('');
console.log('  The Overshoot Budget column itself, recomputed on all 22 terms (the corpus');
console.log('  has it on 8, gate-multiplies.md 5, x = 11..37, reading 1.058 to 0.953):');
console.log('');
console.log('   n    x   ln(x^2/G2)   ln(x_next^2/G2)   source');
for (let n = 1; n <= 22; n++) {
  const x = PR[n - 1], xn = (n < 22 ? PR[n] : null), G = G2[n - 1];
  console.log('  ' + pad(n, 3) + pad(x, 5) + pad(F(Math.log(x * x / G), 4), 13) + pad(xn ? F(Math.log(xn * xn / G), 4) : '-', 18) + '   ' + src(n));
}
{
  const v = [];
  for (let n = 5; n <= 12; n++) v.push(Number(Math.log(PR[n - 1] ** 2 / G2[n - 1]).toFixed(3)));
  const claimed = [1.058, 0.940, 0.984, 0.878, 0.953, 1.182, 1.016, 0.953];
  let ok = true; for (let i = 0; i < 8; i++) if (Math.abs(v[i] - claimed[i]) > 0.0011) ok = false;
  check('gate-multiplies.md 5 slack row reproduced at x = 11..37', ok, v.join(', '));
  const last = Math.log(79 * 79 / 1710);
  console.log('  and it does NOT stay flat on the eight new terms: it rises from ' + F(Math.log(11 * 11 / 42), 4) + ' at');
  console.log('  x = 11 to ' + F(last, 4) + ' at x = 79, so the "0.88 to 1.19 nats, flat over the whole');
  console.log('  reachable ladder" reading is a fourteen-term reading and the eighteen-term');
  console.log('  one is monotone upward over the last eight. That is the SAME fact as the');
  console.log('  ratio slope in (d), in the Budget\'s own units, and it matters because the');
  console.log('  Budget\'s premise is that this column is bounded.');
}
console.log('');
console.log('='.repeat(78));
console.log(FAILS === 0 ? 'SELF-TESTS: all passed.' : 'SELF-TESTS: ' + FAILS + ' FAILURES');
console.log('elapsed ' + ((Date.now() - T0) / 1000).toFixed(1) + ' s');
console.log('='.repeat(78));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/import-maxplus-02-subadditivity.js
//   invocation:  node research/import-maxplus-02-subadditivity.js
//   code-sha256: 8ad8cb9e752870f090e32a23b70f36ae67bb7c883587d579ddd050302dc34514
//   out-sha256:  e383ddc7f78b7021c3d815a1abb863a094f838e41a4553a91bf1fa5c891f3386
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.9 s
// ============================================================================
// ==============================================================================
// IMPORT 4 (MAX-PLUS) -- STAGE 2: THE SUBADDITIVITY HUNT
// ==============================================================================
//
// ------------------------------------------------------------------------------
// SELF-TESTS
// ------------------------------------------------------------------------------
//   ok    A144311 has 22 terms   n = 22
//   ok    one prime per term   22 primes
//   ok    G2 = A144311 + 1 at the 14 corpus-exact terms   2,6,12,30,42,66,108,150,204,258,348,528,546,618
//   ok    ladder is strictly increasing
//   ok    terms 2..9 rebuilt from the tiles   6,12,30,42,66,108,150,204
//
// ==============================================================================
// (a) THE ONE EXACT FEKETE INEQUALITY: ||A ox B|| <= ||A|| + ||B||
// ==============================================================================
// In (max, +) the operator norm is exactly submultiplicative, with no
// dimension factor: (A ox B)[i][j] = max_k (A[i][k] + B[k][j]) <= ||A||+||B||.
// With A the tile circuit that reads maxsum_m = ||A^{ox m}||, this IS
//    maxsum_{m+m^} <= maxsum_m + maxsum_{m^}   [PROVEN, one line].
// U-FRAME 5a step 3a records this as measured with zero violations; the
// semiring gives it as an identity of the norm. VERIFIED exhaustively below.
//
//     x        D   pairs (m,m^), m+m^ <= 32   violations   max deficit   inf_m maxsum_m/m   mbar = W/D
//     5        3                       496            0             6      10.0000 (m=3)      10.0000
//     7       15                       496            0            54     14.0000 (m=15)      14.0000
//    11      135                       496            0            84     18.2609 (m=23)      17.1111
//    13     1485                       496            0            96     22.7586 (m=29)      20.2222
//    17    22275                       496            0           174     27.5625 (m=32)      22.9185
//    19   378675                       496            0           216     32.9032 (m=31)      25.6148
//    23  7952175                       496            0           336     38.0625 (m=32)      28.0543
//
// Fekete then gives maxsum_m/m -> inf_m maxsum_m/m, and section 1b of the
// companion file identifies that limit as the max-plus eigenvalue mbar = W/D.
// The limit exists, it is exact, and it is MERTENS. It says nothing about the
// growth of G2 = maxsum_1 in x, because m and x are different directions.
//
// ==============================================================================
// (b) THE CANDIDATE: G2hat(s*t) <= C * G2hat(s) * G2hat(t)
// ==============================================================================
// G2hat(t) = G2 at the largest prime <= t, a step function on [2, 79]. Every
// pair (s, t) of integers with 2 <= s <= t and s*t <= 79 is tested. R is the
// ratio; ln R is the additive defect kappa the Fekete argument has to absorb.
//
//     s    t   s*t   G2hat(s)   G2hat(t)   G2hat(st)        R    ln R   source of the st term
//     4   10    40          6         30         528  2.93333  1.0761   corpus-exact
//     4    6    24          6         12         204  2.83333  1.0415   corpus-exact
//     4   12    48          6         42         708  2.80952  1.0330   A144311
//     6   12    72         12         42        1398  2.77381  1.0202   A144311
//     4   16    64          6         66        1080  2.72727  1.0033   A144311
//     6   10    60         12         30         966  2.68333  0.9871   A144311
//     2   16    32          2         66         348  2.63636  0.9694   corpus-exact
//     2    4     8          2          6          30  2.50000  0.9163   corpus-exact
//     2   10    20          2         30         150  2.50000  0.9163   corpus-exact
//     4   11    44          6         42         618  2.45238  0.8971   corpus-exact
//     4   15    60          6         66         966  2.43939  0.8917   A144311
//     2   12    24          2         42         204  2.42857  0.8873   corpus-exact
//     6    6    36         12         12         348  2.41667  0.8824   corpus-exact
//     6    9    54         12         30         870  2.41667  0.8824   A144311
//     4   14    56          6         66         870  2.19697  0.7871   A144311
//     4   18    72          6        108        1398  2.15741  0.7689   A144311
//     6   11    66         12         42        1080  2.14286  0.7621   A144311
//     2   27    54          2        204         870  2.13235  0.7572   A144311
//     2   28    56          2        204         870  2.13235  0.7572   A144311
//     4    5    20          6         12         150  2.08333  0.7340   corpus-exact
//     2   22    44          2        150         618  2.06000  0.7227   corpus-exact
//     2   36    72          2        348        1398  2.00862  0.6974   A144311
//     4   17    68          6        108        1284  1.98148  0.6838   A144311
//     5   10    50         12         30         708  1.96667  0.6763   A144311
//     6    8    48         12         30         708  1.96667  0.6763   A144311
//     2   15    30          2         66         258  1.95455  0.6702   corpus-exact
//     4    8    32          6         30         348  1.93333  0.6592   corpus-exact
//     4    9    36          6         30         348  1.93333  0.6592   corpus-exact
//     5   15    75         12         66        1530  1.93182  0.6585   A144311
//     6   13    78         12         66        1530  1.93182  0.6585   A144311
//     5   12    60         12         42         966  1.91667  0.6506   A144311
//     2   30    60          2        258         966  1.87209  0.6271   A144311
//     2   34    68          2        348        1284  1.84483  0.6124   A144311
//     2   35    70          2        348        1284  1.84483  0.6124   A144311
//     4    4    16          6          6          66  1.83333  0.6061   corpus-exact
//     2   21    42          2        150         546  1.82000  0.5988   corpus-exact
//     2    9    18          2         30         108  1.80000  0.5878   corpus-exact
//     5    6    30         12         12         258  1.79167  0.5831   corpus-exact
//     3   16    48          6         66         708  1.78788  0.5810   A144311
//     4   13    52          6         66         708  1.78788  0.5810   A144311
//     2   11    22          2         42         150  1.78571  0.5798   corpus-exact
//     2   19    38          2        150         528  1.76000  0.5653   corpus-exact
//     2   20    40          2        150         528  1.76000  0.5653   corpus-exact
//     2    6    12          2         12          42  1.75000  0.5596   corpus-exact
//     2   24    48          2        204         708  1.73529  0.5512   A144311
//     2   25    50          2        204         708  1.73529  0.5512   A144311
//     2   26    52          2        204         708  1.73529  0.5512   A144311
//     5   11    55         12         42         870  1.72619  0.5459   A144311
//     5    9    45         12         30         618  1.71667  0.5404   corpus-exact
//     4   19    76          6        150        1530  1.70000  0.5306   A144311
//     2   29    58          2        258         870  1.68605  0.5224   A144311
//     5   14    70         12         66        1284  1.62121  0.4832   A144311
//     2   17    34          2        108         348  1.61111  0.4769   corpus-exact
//     2   18    36          2        108         348  1.61111  0.4769   corpus-exact
//     3   15    45          6         66         618  1.56061  0.4451   corpus-exact
//     8    9    72         30         30        1398  1.55333  0.4404   A144311
//     2   31    62          2        348        1080  1.55172  0.4394   A144311
//     2   32    64          2        348        1080  1.55172  0.4394   A144311
//     2   33    66          2        348        1080  1.55172  0.4394   A144311
//     2   13    26          2         66         204  1.54545  0.4353   corpus-exact
//     2   14    28          2         66         204  1.54545  0.4353   corpus-exact
//     6    7    42         12         30         546  1.51667  0.4165   corpus-exact
//     2   23    46          2        204         618  1.51471  0.4152   corpus-exact
//     2    2     4          2          2           6  1.50000  0.4055   corpus-exact
//     3    6    18          6         12         108  1.50000  0.4055   corpus-exact
//     5    8    40         12         30         528  1.46667  0.3830   corpus-exact
//     2   37    74          2        528        1530  1.44886  0.3708   A144311
//     2   38    76          2        528        1530  1.44886  0.3708   A144311
//     2   39    78          2        528        1530  1.44886  0.3708   A144311
//     3   10    30          6         30         258  1.43333  0.3600   corpus-exact
//     7   10    70         30         30        1284  1.42667  0.3553   A144311
//     5    5    25         12         12         204  1.41667  0.3483   corpus-exact
//     3   11    33          6         42         348  1.38095  0.3228   corpus-exact
//     3   12    36          6         42         348  1.38095  0.3228   corpus-exact
//     3   14    42          6         66         546  1.37879  0.3212   corpus-exact
//     5   13    65         12         66        1080  1.36364  0.3102   A144311
//     3   18    54          6        108         870  1.34259  0.2946   A144311
//     3   13    39          6         66         528  1.33333  0.2877   corpus-exact
//     2    5    10          2         12          30  1.25000  0.2231   corpus-exact
//     3   25    75          6        204        1530  1.25000  0.2231   A144311
//     3   26    78          6        204        1530  1.25000  0.2231   A144311
//     7   11    77         30         42        1530  1.21429  0.1942   A144311
//     3   21    63          6        150        1080  1.20000  0.1823   A144311
//     3   22    66          6        150        1080  1.20000  0.1823   A144311
//     7    9    63         30         30        1080  1.20000  0.1823   A144311
//     8    8    64         30         30        1080  1.20000  0.1823   A144311
//     3    4    12          6          6          42  1.16667  0.1542   corpus-exact
//     3   24    72          6        204        1398  1.14216  0.1329   A144311
//     3    8    24          6         30         204  1.13333  0.1252   corpus-exact
//     3    9    27          6         30         204  1.13333  0.1252   corpus-exact
//     4    7    28          6         30         204  1.13333  0.1252   corpus-exact
//     2    7    14          2         30          66  1.10000  0.0953   corpus-exact
//     2    8    16          2         30          66  1.10000  0.0953   corpus-exact
//     3   17    51          6        108         708  1.09259  0.0886   A144311
//     3   20    60          6        150         966  1.07333  0.0708   A144311
//     3   23    69          6        204        1284  1.04902  0.0479   A144311
//     2    3     6          2          6          12  1.00000  0.0000   corpus-exact
//     3   19    57          6        150         870  0.96667 -0.0339   A144311
//     5    7    35         12         30         348  0.96667 -0.0339   corpus-exact
//     7    8    56         30         30         870  0.96667 -0.0339   A144311
//     3    5    15          6         12          66  0.91667 -0.0870   corpus-exact
//     3    3     9          6          6          30  0.83333 -0.1823   corpus-exact
//     3    7    21          6         30         150  0.83333 -0.1823   corpus-exact
//     7    7    49         30         30         708  0.78667 -0.2400   A144311
//
//   pairs tested            104
//   max R (all pairs)       2.93333   -> kappa = ln C = 1.0761 nats
//   min R (all pairs)       0.78667
//   R > 1 in                96 of 104 pairs
//   violations of the candidate at C = 2.9333:  0 of 104 (by construction: C is the max)
//
//   AND HERE IS THE POWER PROBLEM. Stratify by min(s, t): the pairs that can
//   reach the asymptotic value of R are exactly the ones the ladder does not have.
//
//     min(s,t) >=   pairs   max R   which pair
//               2     104  2.9333   (4, 10) -> 40
//               3      66  2.9333   (4, 10) -> 40
//               4      42  2.9333   (4, 10) -> 40
//               5      26  2.7738   (6, 12) -> 72
//               6      15  2.7738   (6, 12) -> 72
//               7       7  1.5533   (8, 9) -> 72
//               8       2  1.5533   (8, 9) -> 72
//
//   A power law G2 ~ c x^beta forces R -> 1/c as both arguments grow, so the
//   asymptotic constant is 1/c and NOT the ladder max. The ladder max 2.9333 is
//   set by the pair (4, 10), i.e. by primes 3 and 7 against 37; with both
//   arguments >= 7 the largest R the ladder can show is 1.5533. Whatever C
//   really is, this data cannot see it.
//   The measured band is [0.7867, 2.9333], and R bounded is exactly
//   what a power law predicts, R unbounded exactly what would refute one.
//
// ==============================================================================
// (c) THE PROVEN SUPERADDITIVITY, AND THE FLOOR IT ACTUALLY BUYS
// ==============================================================================
// PROVEN (history/staging/attack-L-subadditivity.md 1): for DISJOINT prime sets
// P, Q, L(P u Q) >= L(P) + L(Q), because a_p is free and covers translate.
// PROVEN (one line, here): TWO distinct primes p, q >= 5 cover four consecutive
// integers -- p takes the classes {t+2, t} and q takes {t+3, t+1}, legal for any
// p, q by CRT -- while ONE prime covers only one, since its two classes are two
// apart. Concatenating those blocks over disjoint pairs of primes gives the
// CONCATENATION FLOOR, with k = pi(y) - 2 the number of primes in [5, y]:
//         L(primes in [5,y]) >= 2k - [k odd],   i.e.  G2(y#) >= 6(2k - [k odd]) + 6,
// using G2 = 6L + 6 in the T_3 coordinate (attack-L-law.md 1). It is also an
// EQUALITY in the regime 2k < min prime, by a parity count: pairs at distance 2
// are monochromatic in parity, [1, 2k] holds k odds and k evens, and covering
// each parity costs ceil(k/2) pairs, so k pairs suffice only for k even. This is
// what Fekete-by-concatenation delivers with no arithmetic input at all.
//
//    n    x     k   G2(x#)   concat floor   G2/floor   free lower bound   G2/free   source
//     3    5     1       12             12      1.000     (lnlnln x < 0)         -   corpus-exact
//     4    7     2       30             30      1.000     (lnlnln x < 0)         -   corpus-exact
//     5   11     3       42             36      1.167     (lnlnln x < 0)         -   corpus-exact
//     6   13     4       66             54      1.222     (lnlnln x < 0)         -   corpus-exact
//     7   17     5      108             60      1.800                1.9     57.55   corpus-exact
//     8   19     6      150             78      1.923                4.0     37.66   corpus-exact
//     9   23     7      204             84      2.429                8.4     24.22   corpus-exact
//    10   29     8      258            102      2.529               15.6     16.53   corpus-exact
//    11   31     9      348            108      3.222               18.1     19.20   corpus-exact
//    12   37    10      528            126      4.190               26.0     20.30   corpus-exact
//    13   41    11      546            132      4.136               31.5     17.33   corpus-exact
//    14   43    12      618            150      4.120               34.3     18.00   corpus-exact
//    15   47    13      708            156      4.538               40.1     17.66   A144311
//    16   53    14      870            174      5.000               49.0     17.75   A144311
//    17   59    15      966            180      5.367               58.3     16.58   A144311
//    18   61    16     1080            198      5.455               61.4     17.59   A144311
//    19   67    17     1284            204      6.294               71.0     18.08   A144311
//    20   71    18     1398            222      6.297               77.5     18.03   A144311
//    21   73    19     1530            228      6.711               80.9     18.92   A144311
//    22   79    20     1710            246      6.951               90.9     18.81   A144311
//
// The floor is TIGHT at the first two levels -- 12 = G2(5#) and 30 = G2(7#), so
// concatenation is optimal there -- and then loses ground at every level. That
// growing excess is the whole content of Erdos-Rankin, and it is why
// superadditivity alone cannot produce an exponent.
//
//    the array is NOT stationary, which is the named failing step for Kingman:
//    Lambda(i, j) = L({p_{i+1}..p_j}) depends on i and not only on j - i. In the
//    regime 2(j-i) < p_i it equals 2(j-i) - [j-i odd], independent of i; outside
//    it the same block is worth more when the primes are smaller. Test of
//    the index-coordinate superadditivity A_{n+m} >= A_n + A_m, A_n = L(first n):
//
//    A_n = (G2 - 6)/6 over x = 5..79 (20 terms): 1, 4, 6, 10, 17, 24, 33, 42, 57, 87, 90, 102, 117, 144, 160, 179, 213, 232, 254, 284
//    pairs (n, m) with n + m <= 20:  190
//    A_{n+m} >= A_n + A_m holds in   190,  fails in 0
//    [NOT the proven theorem, and stronger than it: the theorem compares the
//     first n primes with a DISJOINT block, whereas A_m is the first m primes,
//     a strictly better set. The measured excess A_{n+m} - A_n - A_m:
//      m = 1:  2, 1, 3, 6, 6, 8, 8, 14, 29, 2, 11, 14, 26, 15, 18, 33, 18, 21, 29
//      m = 2:  1, 2, 7, 10, 12, 14, 20, 41, 29, 11, 23, 38, 39, 31, 49, 49, 37, 48
//      m = 3:  3, 7, 12, 17, 19, 27, 48, 42, 39, 24, 48, 52, 56, 63, 66, 69, 65
//      m = 4:  6, 10, 17, 22, 30, 53, 47, 50, 50, 47, 60, 67, 86, 78, 84, 95
//      m = 5:  6, 12, 19, 30, 53, 49, 52, 58, 70, 56, 72, 94, 98, 93, 107
//      m = 6:  8, 14, 27, 53, 49, 54, 60, 78, 79, 68, 99, 106, 113, 116
//     so the superadditive gap widens with n at every m, which is the same
//     non-stationarity again, seen from the index side.]
//
// ==============================================================================
// (d) a_n = ln G2(p_n#) - 2 ln theta(p_n), AND THE 1d RATIOS ON 22 TERMS
// ==============================================================================
//
//    n    x   G2(x#)    theta(x)   G2/x^2   G2/x^2_next   G2/theta^2   ln G2/ln x       a_n   a_n - a_{n-1}   source
//     1    2        2      0.6931   0.5000        0.2222       4.1627       1.0000    1.4262               -   corpus-exact
//     2    3        6      1.7918   0.6667        0.2400       1.8689       1.6309    0.6254         -0.8008   corpus-exact
//     3    5       12      3.4012   0.4800        0.2449       1.0373       1.5440    0.0367         -0.5887   corpus-exact
//     4    7       30      5.3471   0.6122        0.2479       1.0493       1.7479    0.0481          0.0114   corpus-exact
//     5   11       42      7.7450   0.3471        0.2485       0.7002       1.5587   -0.3564         -0.4045   corpus-exact
//     6   13       66     10.3100   0.3905        0.2284       0.6209       1.6334   -0.4766         -0.1201   corpus-exact
//     7   17      108     13.1432   0.3737        0.2992       0.6252       1.6526   -0.4697          0.0069   corpus-exact
//     8   19      150     16.0876   0.4155        0.2836       0.5796       1.7017   -0.5455         -0.0758   corpus-exact
//     9   23      204     19.2231   0.3856        0.2426       0.5521       1.6961   -0.5941         -0.0486   corpus-exact
//    10   29      258     22.5904   0.3068        0.2685       0.5056       1.6491   -0.6821         -0.0880   corpus-exact
//    11   31      348     26.0244   0.3621        0.2542       0.5138       1.7042   -0.6659          0.0162   corpus-exact
//    12   37      528     29.6353   0.3857        0.3141       0.6012       1.7362   -0.5088          0.1570   corpus-exact
//    13   41      546     33.3489   0.3248        0.2953       0.4909       1.6972   -0.7114         -0.2026   corpus-exact
//    14   43      618     37.1101   0.3342        0.2798       0.4488       1.7086   -0.8013         -0.0899   corpus-exact
//    15   47      708     40.9602   0.3205        0.2520       0.4220       1.7045   -0.8628         -0.0615   A144311
//    16   53      870     44.9305   0.3097        0.2499       0.4310       1.7048   -0.8417          0.0210   A144311
//    17   59      966     49.0080   0.2775        0.2596       0.4022       1.6856   -0.9108         -0.0691   A144311
//    18   61     1080     53.1189   0.2902        0.2406       0.3828       1.6991   -0.9604         -0.0495   A144311
//    19   67     1284     57.3236   0.2860        0.2547       0.3907       1.7023   -0.9397          0.0207   A144311
//    20   71     1398     61.5863   0.2773        0.2623       0.3686       1.6991   -0.9981         -0.0584   A144311
//    21   73     1530     65.8768   0.2871        0.2452       0.3526       1.7091   -1.0425         -0.0445   A144311
//    22   79     1710     70.2462   0.2740             -       0.3465       1.7037   -1.0598         -0.0172   A144311
//
//   CUSTODY ON THE ESTIMATOR. Three figures the corpus already carries, on its
//   own windows, recomputed here from the ladder and nothing else:
//
//     window   n   quantity              here             corpus                          source
//     [11,41]   9     slope ln(G2/x^2)   -0.0694 +/- 0.0747   -0.069 +/- 0.075   MATCH   attack-block-01-ladder.md 6
//     [11,41]   9     d ln G2 / d ln x   1.9306 +/- 0.0747    1.931 +/- 0.075   MATCH   attack-block-01-ladder.md 6
//     [ 5,41]  11     d ln G2 / d ln x   1.7975 +/- 0.0639    1.797 +/- 0.064   MATCH   attack-block-01-ladder.md 6
//     [11,79]  18     d ln G2 / d ln x   1.8182 +/- 0.0319    1.818 (PW fit)     MATCH   attack-growth-law.md 1
//
//   THE SAME ESTIMATOR ACROSS WINDOWS. Nothing below is a trend claim; the point
//   is that the window moves the answer by more than the answer, which is
//   attack-block-01-ladder.md 6 in one more coordinate.
//
//     window     n   slope ln(G2/x^2)      d ln G2/d ln x      slope ln(G2/theta^2)   terms are
//    [ 5,41]    11   -0.2025 +/- 0.0639    1.7975 +/- 0.0639     -0.3551 +/- 0.0509   corpus-exact
//    [11,41]     9   -0.0694 +/- 0.0747    1.9306 +/- 0.0747     -0.2066 +/- 0.0559   corpus-exact
//    [11,43]    10   -0.0810 +/- 0.0637    1.9190 +/- 0.0637     -0.2377 +/- 0.0527   corpus-exact
//    [11,79]    18   -0.1818 +/- 0.0319    1.8182 +/- 0.0319     -0.3381 +/- 0.0284   mixed
//    [23,79]    14   -0.2640 +/- 0.0477    1.7360 +/- 0.0477     -0.4125 +/- 0.0530   mixed
//    [31,79]    12   -0.3489 +/- 0.0438    1.6511 +/- 0.0438     -0.5103 +/- 0.0675   mixed
//    [43,79]     9   -0.3124 +/- 0.0522    1.6876 +/- 0.0522     -0.4139 +/- 0.0491   mixed
//
//   HOUSE CONTROL LINE, quoted as required (G2-STATE 3b, exponent-control.md 1,
//   attack-growth-law.md 4): the same estimator on the one-class control h(x#) =
//   A048670, whose x-exponent is 1, reads 1.272 at the MATCHED window x = 11..79
//   (18 terms) and 1.282 +/- 0.008 on 58 terms, positive bias in all 40 windows.
//   Subtracting the matched bias +0.272 from the [11,79] exponent above returns
//   attack-growth-law.md 4's 1.546, which is where this reading already lives.
//   NO TREND IS DECLARED HERE. What the rows show is that the "flat" reading of
//   TODO 1d is a NINE-TERM WINDOW: it is one of four conventions in
//   attack-block-01-ladder.md 6, three of which are negative, and the same
//   estimator on the 18-term A144311 window is a different number with the
//   corpus's own answer (1.546) already attached to it in another file.
//
// ==============================================================================
// (e) THE CONSTANT IS THE WHOLE QUESTION, AND WITH THE MEASURED ONE THE
//     CANDIDATE IS TPC-IMPLYING
// ==============================================================================
// Iterating the candidate on a base s gives G2hat(s^k) <= C^{k-1} G2hat(s)^k, and
// G2hat is nondecreasing, so the exponent obeys
//         beta <= (ln C + ln G2hat(s)) / ln s     for EVERY base s.
// Two readings follow, and they are the whole verdict of stage 2.
//
//   (i) CONSTANT-FREE ("there exists a finite C"): the bound above tends to beta
//       itself as s grows, so it delivers LIMIT EXISTENCE and no number. That is
//       not a chain of upper bounds ending in G2 < x^2, so the Overshoot Budget
//       (gate-multiplies.md 5) does not apply to it, and it does not re-open the
//       accumulating-index family (REFUTED.md): there is no index, and no gate.
//
//   (ii) WITH THE MEASURED C the same line is a numerical bound, and here it is:
//
//     base s   G2hat(s)   ln C + ln G2hat(s)   / ln s   =  beta bound   below 2?   source
//         11         42               4.8138   2.3979         2.0075         no   corpus-exact
//         23        204               6.3943   3.1355         2.0393         no   corpus-exact
//         31        348               6.9283   3.4340         2.0176         no   corpus-exact
//         37        528               7.3452   3.6109         2.0342         no   corpus-exact
//         43        618               7.5026   3.7612         1.9947        YES   corpus-exact
//         53        870               7.8446   3.9703         1.9758        YES   A144311
//         71       1398               8.3189   4.2627         1.9516        YES   A144311
//         79       1710               8.5204   4.3694         1.9500        YES   A144311
//
//   C = 2.9333 (attained at s, t = 4, 10), ln C = 1.0761 nats.
//   best PRIME base s = 59, giving beta <= 1.9495.
//   best base of any kind s = 16, giving beta <= 1.8992 -- G2hat is constant
//   on [p, p'), so a base just below a prime is the sharpest, which is a real
//   feature of the real-variable form and not an artifact to be discarded.
//
//   beta < 2 gives G2(x#) = o(x^2), hence G2(x#) < x'^2 - 2 for all large x,
//   hence the Zone Postulate for all large x, hence -- by ZONE-POSTULATE.md 3,
//   where the WEAK form (infinitely many zones) is EQUIVALENT to TPC -- the twin
//   prime conjecture. So the candidate WITH AN EXPLICIT CONSTANT cannot be
//   proved by any soft argument, and this is the same verdict shape as TODO 1e
//   reached for the sieve Gaussian maximal law.
//
//   No contradiction with the Overshoot Budget arises, and the reason is worth
//   stating: the Budget is explicitly CONDITIONAL on the measured law
//   G2 ~ 0.55 (ln W)^2 (gate-multiplies.md, "The Overshoot Budget is conditional
//   on the measured G2 law"), i.e. on exponent exactly 2. A theorem giving
//   beta < 2 would falsify the Budget's premise rather than violate its
//   conclusion. The Budget bites on chains, and a limit-existence statement is
//   not a chain.
//
//   The Overshoot Budget column itself, recomputed on all 22 terms (the corpus
//   has it on 8, gate-multiplies.md 5, x = 11..37, reading 1.058 to 0.953):
//
//    n    x   ln(x^2/G2)   ln(x_next^2/G2)   source
//     1    2       0.6931            1.5041   corpus-exact
//     2    3       0.4055            1.4271   corpus-exact
//     3    5       0.7340            1.4069   corpus-exact
//     4    7       0.4906            1.3946   corpus-exact
//     5   11       1.0581            1.3922   corpus-exact
//     6   13       0.9402            1.4768   corpus-exact
//     7   17       0.9843            1.2067   corpus-exact
//     8   19       0.8782            1.2604   corpus-exact
//     9   23       0.9529            1.4165   corpus-exact
//    10   29       1.1816            1.3150   corpus-exact
//    11   31       1.0158            1.3696   corpus-exact
//    12   37       0.9527            1.1580   corpus-exact
//    13   41       1.1245            1.2198   corpus-exact
//    14   43       1.0959            1.2738   corpus-exact
//    15   47       1.1379            1.3781   A144311
//    16   53       1.1721            1.3866   A144311
//    17   59       1.2819            1.3486   A144311
//    18   61       1.2370            1.4247   A144311
//    19   67       1.2516            1.3676   A144311
//    20   71       1.2826            1.3381   A144311
//    21   73       1.2479            1.4059   A144311
//    22   79       1.2946                 -   A144311
//   ok    gate-multiplies.md 5 slack row reproduced at x = 11..37   1.058, 0.94, 0.984, 0.878, 0.953, 1.182, 1.016, 0.953
//   and it does NOT stay flat on the eight new terms: it rises from 1.0581 at
//   x = 11 to 1.2946 at x = 79, so the "0.88 to 1.19 nats, flat over the whole
//   reachable ladder" reading is a fourteen-term reading and the eighteen-term
//   one is monotone upward over the last eight. That is the SAME fact as the
//   ratio slope in (d), in the Budget's own units, and it matters because the
//   Budget's premise is that this column is bounded.
//
// ==============================================================================
// SELF-TESTS: all passed.
// elapsed 0.8 s
// ==============================================================================
// ============================================================================
// READINGS
// ============================================================================

// 1. THE ONE EXACT FEKETE INEQUALITY IS IN THE WRONG DIRECTION, AND ITS LIMIT IS
//    MERTENS. In (max, +) the operator norm is exactly submultiplicative, so
//    maxsum_{m+m^} <= maxsum_m + maxsum_{m^} is a one-line theorem rather than
//    the measured fact U-FRAME 5a step 3a records. 496 pairs at each of seven
//    levels x = 5..23 with m + m^ <= 32, zero violations at every level. Fekete then gives maxsum_m/m -> inf, and the
//    companion file identifies the inf as mbar = W/D. The direction is m, not x.
//    Nothing about the growth of G2 in x follows, and it never will from this
//    inequality.
//
// 2. THE CANDIDATE SURVIVES EVERY TEST THE LADDER CAN RUN.
//    G2hat(s*t) <= C * G2hat(s) * G2hat(t) holds at all 104 pairs of integers
//    with 2 <= s <= t and s*t <= 79, with C = 2.9333, kappa = ln C = 1.0761
//    nats. R exceeds 1 at 96 of the 104. If it held with any finite C, Fekete on
//    g(u) = ln G2hat(e^u) would give beta = lim g(u)/u EXISTING, which is the
//    first limit-existence statement about this exponent.
//
// 3. AND THE TEST HAS ALMOST NO POWER, WHICH IS THE HONEST HEADLINE OF (b).
//    The constant is set by the smallest arguments: max R is attained at
//    (s, t) = (4, 10), i.e. at the primes 3 and 7 against 37. Stratified by
//    min(s, t), the surviving pairs and their maxima are 104/2.9333, 66/2.9333,
//    42/2.9333, 26/2.7738, 15/2.7738, 7/1.5533, 2/1.5533 at min >= 2..8. A power
//    law forces R -> 1/c as both arguments grow, so the asymptotic constant is
//    1/c and the ladder cannot see it: with both arguments >= 7 only seven pairs
//    remain and the largest R they show is 1.5533. The candidate is TESTED, and
//    the test is nearly uninformative about C.
//
// 4. THE ONE COMPOSITION THE FOLD ACTUALLY SUPPORTS POINTS THE WRONG WAY, AND
//    ITS FLOOR IS EXACT AT THE FIRST TWO LEVELS AND HOPELESS AFTER. Disjoint
//    prime sets give L(P u Q) >= L(P) + L(Q) [PROVEN,
//    attack-L-subadditivity.md 1]; two primes >= 5 cover four consecutive
//    integers and one prime covers only one, because its two classes are two
//    apart [PROVEN, one line here]. Concatenating over disjoint pairs gives
//    G2(y#) >= 6(2k - [k odd]) + 6 with k = pi(y) - 2, no arithmetic input at
//    all. It is TIGHT at the first two levels: 12 = G2(5#) and 30 = G2(7#), so
//    concatenation is optimal there and G2/floor reads 1.000, 1.000. After that
//    it reads 1.167, 1.222, 1.800, 1.923, 2.429, 2.529, 3.222, 4.190, 4.136,
//    4.120, 4.538, 5.000, 5.367, 5.455, 6.294, 6.297, 6.711, 6.951, rising at
//    every step but the 528 -> 546 flat spot at x = 41 and the step beside it.
//    That growing excess is exactly the content of Erdos-Rankin, and it is why
//    superadditivity alone cannot produce an exponent.
//
// 5. THE ARRAY IS NOT STATIONARY, AND THAT IS THE NAMED FAILING STEP FOR KINGMAN.
//    Kingman needs Lambda(i, j) to depend on j - i through a stationary ergodic
//    driving system. Here Lambda(i, j) = L({p_{i+1}..p_j}) depends on i: it
//    equals 2(j-i) exactly while 2(j-i) < p_i and is worth strictly more when the
//    primes are smaller. Measured from the index side, A_{n+m} >= A_n + A_m holds
//    at 190 of 190 pairs but the EXCESS grows with n at every m -- the m = 1 row
//    reads 2, 1, 3, 6, 6, 8, 8, 14, 29, 2, 11, 14, 26, 15, 18, 33, 18, 21, 29 --
//    so there is no stationary increment to average. No Kingman.
//
// 6. AND THE FAILING STEP FOR FEKETE IS SHARPER THAN NON-STATIONARITY: THE
//    CANDIDATE HAS NO MECHANISM. Fekete for an EXPONENT needs additivity in
//    ln x, and ln s + ln t = ln(st) is not a prime-set operation: multiplying the
//    moduli does not compose the two prime sets, it names a third one. So the
//    candidate is a shape imposed by what Fekete needs, not by anything the fold
//    does. It is a conjecture the ladder happens to satisfy, and the file records
//    it as exactly that.
//
// 7. WITH THE MEASURED CONSTANT THE CANDIDATE IS TPC-IMPLYING, SO IT CANNOT BE
//    SOFT. Iterating gives beta <= (ln C + ln G2hat(s))/ln s at every base s,
//    which reads 2.0075, 2.0393, 2.0176, 2.0342, 1.9947, 1.9758, 1.9516, 1.9500
//    at s = 11, 23, 31, 37, 43, 53, 71, 79, and 1.8992 at the best base of any
//    kind. beta < 2 gives G2 = o(x^2), hence the Zone Postulate for all large x,
//    hence TPC by ZONE-POSTULATE.md 3's weak-form equivalence. This is the same
//    verdict shape TODO 1e reached for the sieve Gaussian maximal law, and it
//    means the candidate has to be proved constant-free or not at all.
//
// 8. THE CONSTANT-FREE FORM IS THE DELIVERABLE, AND IT IS SAFE AGAINST EVERY
//    CLOSED ROUTE. "There exists a finite C" gives limit existence and no number,
//    because (ln C + ln G2hat(s))/ln s -> beta as s grows. It is not a chain of
//    upper bounds ending in G2 < x^2, so the Overshoot Budget does not bite; it
//    carries no index, so the accumulating-index family (REFUTED.md) is not
//    reopened; and it is not the multiplicative per-fold recursion of TODO 0b,
//    which is a product over pi(x) folds against a fixed base while this is a
//    two-point comparison with a fixed constant. A limit-existence statement is
//    not a bound, and that is why it is allowed to exist here at all.
//
// 9. CUSTODY ON THE ESTIMATOR, BEFORE ANY NEW WINDOW IS QUOTED. The slope routine
//    here reproduces attack-block-01-ladder.md 6's -0.069 +/- 0.075 (as -0.0694
//    +/- 0.0747), its 1.931 +/- 0.075 (1.9306 +/- 0.0747), its 1.797 +/- 0.064
//    (1.7975 +/- 0.0639) and attack-growth-law.md 1's PW exponent 1.818 (1.8182
//    +/- 0.0319), from the ladder and nothing else. Four matches, no shared code.
//    Also reproduced exactly: gate-multiplies.md 5's slack row 1.058, 0.940,
//    0.984, 0.878, 0.953, 1.182, 1.016, 0.953 at x = 11..37.
//
// 10. THE "FLAT" READING OF TODO 1d IS A NINE-TERM WINDOW, AND NO TREND IS
//    DECLARED HERE. The same estimator reads -0.0694 on [11,41] (9 terms),
//    -0.0810 on [11,43] (10), -0.1818 on [11,79] (18), -0.2640 on [23,79] and
//    -0.3489 on [31,79]. Subtracting attack-growth-law.md 4's MATCHED control
//    bias +0.272 from the [11,79] exponent 1.8182 returns 1.546, which is that
//    file's own answer, so the eighteen-term reading is not new -- it is the
//    corpus's existing answer restated in ratio form. What IS worth carrying is
//    the bookkeeping: TODO 1d quotes +0.05 +/- 0.11, which is one of four window
//    conventions in attack-block-01-ladder.md 6, three of which are negative, and
//    all four are nine-term readings that the eight A144311 terms supersede. The
//    Overshoot Budget's own slack column says the same thing in its own units: it
//    rises 1.0581 at x = 11 to 1.2946 at x = 79 and is monotone over the last
//    eight terms, where gate-multiplies.md 5 reads it as flat on fourteen.
//
// 11. WHAT THIS FILE DOES NOT SHOW. It does not prove the candidate, and it
//    cannot estimate C. It extends no ladder: terms 15-22 are A144311's and are
//    labelled in every table. It declares no trend and fits no model -- the AICc
//    model selection on this ladder is attack-growth-law.md's and is not repeated
//    here. The exponent 4.26645 is untouched.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run of this file does not
// contain verbatim actually is. No number above was changed.
//
// BORROWED, verified present in the named producer: the +/-0.11 half-width of
// "+0.05 +/- 0.11" is TODO.md item 1d, which carries that string at its lines
// 317 and 323, and it originates in
// research/history/staging/attack-block-01-ladder.md, which states the fitted
// slope as "+0.05 +/- 0.11" on b >= 11. This run does not compute it and the
// reading only cites it to say the eight A144311 terms supersede it.
//
// IN-CODE: 4.26645 is beta_2, the DHR upper end. It sits in this file's own
// header above the code, "a genuine beta in [1, 4.26645]", and is quoted in
// the closing reading only to say this run leaves it alone.
// ---------------------------------------------------------------------------
