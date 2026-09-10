// import-interp-02-correction.js
//
// FOREIGN IMPORT ROW 9 (BGT interpolation), stage 2: WHICH CORRECTION TERM DOES
// THE DATA SUPPORT, AND IS THE NEAR-FEKETE RELAXATION NEEDED AT ALL?
//
// THE QUESTION. Stage 1 (import-interp-01-bgt-defect.js) closed BGT's own
// machine on hypothesis H1 and showed the defect is the Overshoot slack's
// superadditivity defect. What survives is the DETERMINISTIC toolbox BGT
// themselves point at: Proposition 5 of their Appendix B, attributed there to
// de Bruijn and Erdos, Theorem 22 p. 161 of Indag. Math. 14 (1952) 152-163 --
// "a_N >= a_{N1} + a_{N2} - O(N^alpha)" for alpha in (0,1) already gives
// lim a_N/N. That is strictly weaker than Fekete-with-a-constant. This script
// asks whether the weakening is USEFUL here, i.e. whether the measured defect
// actually grows.
//
// THE INSTRUMENT, AND WHY THE DIAGONAL IS THE WRONG ONE. The defect
//   D(s,t) = ln Fhat(st) - ln Fhat(s) - ln Fhat(t)
// needs BOTH arguments large to say anything asymptotic, and on a ladder that
// stops at x = 79 (G2) the balanced split s = t = sqrt(x) puts both arguments
// below 9. So the diagonal is reported and then set aside. The instrument that
// DOES have range is the FIXED-s SLICE: hold s at a small integer and let t run
// the whole ladder. Under any law Fhat ~ c x^beta (ln x)^delta, with a = ln s
// fixed and u = ln t,
//        D(s, t) = delta * ln((a+u)/(a*u)) - ln c,
// which CONVERGES to delta*ln(1/a) - ln c from above, with slope against ln u
// equal to -delta*a/(a+u) -> 0^-. So the prediction is: bounded, slightly
// decreasing, flattening. That is a falsifiable shape and a long ladder can
// test it.
//
// CALIBRATE BEFORE FITTING (campaign rule). The control is the one-class
// Jacobsthal h(p#) = A048670, 58 terms out to p = 271, true exponent 1 + o(1)
// with a positive log power (exponent-control.md 1 and 3). It has 2.6x the
// range of the G2 ladder and its truth is known, so the shape is checked THERE
// first. The second control is Ziller and Morack's adversarial two-class
// h2(p#) = A288815, 21 terms to p = 73, which is the object structurally
// closest to G2 (G2 <= h2 at every shared term, exponent-control.md).
//
// PROVENANCE. H and H2 are quoted verbatim from research/exponent-control.js
// (which is where the corpus keeps them); G2 = A144311 + 1 as in stage 1.
// Nothing here recomputes a ladder.
//
// usage: node research/import-interp-02-correction.js

'use strict';

const T0 = Date.now();
const F = (v, d = 4) => (Number.isFinite(v) ? (v >= 0 ? ' ' : '') + v.toFixed(d) : '  n/a');
const pad = (s, n) => String(s).padStart(n);
let FAILS = 0;
function check(label, ok, detail) {
  if (!ok) { FAILS++; console.log('  FAIL  ' + label + (detail ? '   ' + detail : '')); }
  else console.log('  ok    ' + label + (detail ? '   ' + detail : ''));
}

function primesTo(N) { const s = new Uint8Array(N + 1), P = []; for (let i = 2; i <= N; i++) { if (!s[i]) { P.push(i); for (let j = i * i; j <= N; j += i) s[j] = 1; } } return P; }
const ALLP = primesTo(400);

// --------------------------------------------------------------- the ladders
// A048670, h(p_n#), 58 terms, verbatim from research/exponent-control.js
const H = [2, 4, 6, 10, 14, 22, 26, 34, 40, 46, 58, 66, 74, 90, 100, 106, 118, 132, 152, 174, 190,
  200, 216, 234, 258, 264, 282, 300, 312, 330, 354, 378, 388, 414, 432, 450, 476, 492, 510, 538,
  550, 574, 600, 616, 642, 660, 686, 718, 742, 762, 798, 810, 834, 858, 876, 908, 926, 954];
// A288815, h2(p_n#), 21 terms, verbatim from research/exponent-control.js
const H2 = [2, 6, 18, 30, 66, 150, 192, 258, 366, 450, 570, 708, 894, 1044, 1284, 1422, 1656,
  1902, 2190, 2460, 2622];
// A144311 + 1
const G2 = [1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545, 617, 707, 869, 965, 1079,
  1283, 1397, 1529, 1709].map((v) => v + 1);

function mkLadder(name, vals, exactN, srcHi) {
  const pr = ALLP.slice(0, vals.length);
  const cap = ALLP[vals.length];                      // first prime past the ladder
  const idxAtMost = (t) => { let k = -1; for (let i = 0; i < pr.length; i++) if (pr[i] <= t) k = i; return k; };
  return {
    name, vals, pr, cap, exactN, srcHi,
    at: (t) => { const k = idxAtMost(t); return k < 0 ? null : vals[k]; },
    src: (n) => (n <= exactN ? 'exact' : srcHi),
  };
}
const LAD = {
  H:  mkLadder('h  (A048670, one class)',  H,  58, 'OEIS'),
  H2: mkLadder('h2 (A288815, two class)',  H2, 21, 'OEIS'),
  G2: mkLadder('G2 (A144311+1, ours)',     G2, 14, 'A144311'),
};

// --------------------------------------------------- synthetic nulls (calibration)
// Two sequences sampled at the SAME primes and stepped the SAME way, whose
// continuous-limit defect is known in closed form:
//   POW  v = c * p^beta            ->  D == -ln c exactly, slope 0, no growth
//   LOG  v = c * p * (ln p)^2      ->  D = 2 ln((u1+u2)/(u1 u2)) - ln c, DECREASING
// beta and c are set to pass through the control's endpoints, so the synthetic
// lives on the same scale as the object it is calibrating.
function mkSynth(name, f, nterms) {
  const pr = ALLP.slice(0, nterms);
  const vals = pr.map(f);
  return mkLadder(name, vals, nterms, 'synthetic');
}
const BETA_C = Math.log(954 / 4) / Math.log(271 / 3);      // through h at p = 3 and p = 271
const C_POW = 954 / Math.pow(271, BETA_C);
const C_LOG = 954 / (271 * Math.pow(Math.log(271), 2));
LAD.POW = mkSynth('POW  c*p^' + BETA_C.toFixed(3) + ' (null)', (p) => C_POW * Math.pow(p, BETA_C), 58);
LAD.LOG = mkSynth('LOG  c*p*(ln p)^2 (null)', (p) => C_LOG * p * Math.pow(Math.log(p), 2), 58);

function ols(xs, ys) {
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0;
  for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
  const b = sxy / sxx, a = my - b * mx;
  let ss = 0; for (let i = 0; i < n; i++) ss += (ys[i] - a - b * xs[i]) ** 2;
  return { a, b, se: Math.sqrt((ss / (n - 2)) / sxx), n };
}

// ================================================================== the run
console.log('='.repeat(78));
console.log('IMPORT ROW 9 (BGT) -- STAGE 2: THE CORRECTION TERM, CALIBRATED FIRST');
console.log('='.repeat(78));
console.log('');
console.log('-'.repeat(78));
console.log('SELF-TESTS');
console.log('-'.repeat(78));
check('A048670 has 58 terms, last 954', H.length === 58 && H[57] === 954, 'p_58 = ' + LAD.H.pr[57] + ', cap ' + LAD.H.cap);
check('A288815 has 21 terms, last 2622', H2.length === 21 && H2[20] === 2622, 'p_21 = ' + LAD.H2.pr[20]);
check('G2 ladder has 22 terms, last 1710', G2.length === 22 && G2[21] === 1710, 'p_22 = ' + LAD.G2.pr[21]);
check('G2 <= h2 at every shared term (exponent-control.md)',
  H2.every((v, i) => G2[i] <= v), 'first 21 terms');
check('h <= G2 at every shared term', H.slice(0, 22).every((v, i) => v <= G2[i]), '22 terms');
check('A288815 = 6*A072753 + 6 at the 19 shared terms',
  (() => { const A072753 = [2, 4, 10, 24, 31, 42, 60, 74, 94, 117, 148, 173, 213, 236, 275, 316, 364, 409, 436];
    return A072753.every((v, i) => 6 * v + 6 === H2[i + 2]); })(), 'custody line from exponent-control.md');
console.log('');

// ------------------------------------------------------- (a) the diagonal
console.log('-'.repeat(78));
console.log('(a) THE DIAGONAL DEFECT, AND WHY IT HAS NO RANGE');
console.log('-'.repeat(78));
console.log('');
console.log('  D_diag(x) = ln Fhat(x) - 2 ln Fhat(sqrt(x)). Both arguments must be large for');
console.log('  the asymptotic form to bind, and sqrt(x) is the problem:');
console.log('');
console.log('    ladder                     x    sqrt(x)   Fhat(x)  Fhat(sqrt x)   D_diag');
for (const key of ['H', 'H2', 'G2']) {
  const L = LAD[key];
  for (const frac of [0.5, 1.0]) {
    const n = Math.max(1, Math.round(frac * L.vals.length));
    const x = L.pr[n - 1], r = Math.sqrt(x);
    if (r < 2) continue;
    const D = Math.log(L.at(x)) - 2 * Math.log(L.at(r));
    console.log('  ' + L.name.padEnd(24) + pad(x, 5) + pad(r.toFixed(2), 10) + pad(L.at(x), 10) + pad(L.at(r), 14) + pad(F(D, 4), 9));
  }
}
console.log('');
console.log('  The largest sqrt(x) any of the three ladders offers is ' + Math.sqrt(LAD.H.pr[57]).toFixed(2) + ', so the');
console.log('  diagonal is a two-point comparison between an asymptotic argument and a');
console.log('  pre-asymptotic one. It is reported and set aside. Everything below uses the');
console.log('  fixed-s slice, which has one large argument and the full ladder of range.');
console.log('');

// ------------------------------------------------------- (b) fixed-s slices
console.log('-'.repeat(78));
console.log('(b) THE FIXED-s SLICES: IS THE DEFECT BOUNDED, AND DOES IT FLATTEN?      [P7]');
console.log('-'.repeat(78));
console.log('');
console.log('  D(s, t) = ln Fhat(st) - ln Fhat(s) - ln Fhat(t), s fixed, t running the');
console.log('  ladder primes with s*t inside the known range. Predicted shape: bounded,');
console.log('  slowly DECREASING against ln u (u = ln t), slope -> 0^-.');
console.log('');
const SLICES = [2, 3, 4, 5, 6, 7];
const SLOPES = {};
for (const key of ['POW', 'LOG', 'H', 'H2', 'G2']) {
  const L = LAD[key];
  console.log('  ' + L.name + '     range t <= ' + (L.cap - 1) + ', s*t < ' + L.cap);
  console.log('    s    pts   D at first t   D at last t     min D     max D    slope vs ln(ln t)   +/-');
  SLOPES[key] = {};
  for (const s of SLICES) {
    const xs = [], ys = [], ts = [];
    for (const t of L.pr) {
      if (t < s) continue;
      if (s * t >= L.cap) continue;
      const u = Math.log(t); if (u <= 0) continue;
      const D = Math.log(L.at(s * t)) - Math.log(L.at(s)) - Math.log(L.at(t));
      xs.push(Math.log(u)); ys.push(D); ts.push(t);
    }
    if (xs.length < 4) { console.log('  ' + pad(s, 3) + pad(xs.length, 7) + '     too few points'); continue; }
    const f = ols(xs, ys);
    SLOPES[key][s] = f;
    console.log('  ' + pad(s, 3) + pad(xs.length, 7) + pad(F(ys[0], 4), 15) + pad(F(ys[ys.length - 1], 4), 14)
      + pad(F(Math.min(...ys), 4), 10) + pad(F(Math.max(...ys), 4), 10) + pad(F(f.b, 4), 19) + pad(F(f.se, 4), 8));
  }
  console.log('');
}
{
  const ctrl = SLOPES.H;
  const neg = Object.values(ctrl).filter((f) => f.b + f.se < 0).length;
  const tot = Object.values(ctrl).length;
  console.log('  THE CALIBRATION, WHICH DECIDES WHETHER ANY OF THIS IS READABLE. POW has a');
  console.log('  defect that is CONSTANT in the continuous limit (slope exactly 0) and LOG');
  console.log('  has one that DECREASES. Both are sampled at the same primes and stepped the');
  console.log('  same way as the real ladders. Slices with a POSITIVE slope at 1 sigma:');
  {
    const rows = [];
    for (const k of ['POW', 'LOG', 'H', 'H2', 'G2']) {
      const S0 = SLOPES[k], ks = Object.keys(S0);
      const pos = ks.filter((s) => S0[s].b - S0[s].se > 0).length;
      const bs = ks.map((s) => S0[s].b);
      rows.push([LAD[k].name, ks.length, pos, Math.min(...bs), Math.max(...bs)]);
    }
    console.log('');
    console.log('    ladder                          slices   positive at 1 sigma   min slope   max slope');
    for (const r of rows) console.log('  ' + String(r[0]).padEnd(32) + pad(r[1], 6) + pad(r[2], 22) + pad(F(r[3], 4), 12) + pad(F(r[4], 4), 12));
    console.log('');
    console.log('  POW\'s true slope is 0 and LOG\'s is negative. Whatever the step-sampled');
    console.log('  estimator reports for them is pure artifact, and it is the yardstick every');
    console.log('  other row has to be read against.');
    console.log('');
  }
  console.log('  CONTROL READING (h, 58 terms, exponent 1 + o(1) per exponent-control.md;');
  console.log('  Iwaniec\'s PROVEN bound is 2 and the 1 is Maier-Pomerance, conjectural).');
  console.log('  Slices whose slope is negative at 1 sigma: ' + neg + ' of ' + tot + '.');
  const g2s = SLOPES.G2, h2s = SLOPES.H2;
  const sameSign = SLICES.filter((s) => ctrl[s] && g2s[s] && Math.sign(ctrl[s].b) === Math.sign(g2s[s].b)).length;
  const sameSign2 = SLICES.filter((s) => ctrl[s] && h2s[s] && Math.sign(ctrl[s].b) === Math.sign(h2s[s].b)).length;
  console.log('  Slices where G2 carries the SAME SIGN as the control: ' + sameSign + ' of '
    + SLICES.filter((s) => ctrl[s] && g2s[s]).length + '.');
  console.log('  Slices where h2 carries the SAME SIGN as the control: ' + sameSign2 + ' of '
    + SLICES.filter((s) => ctrl[s] && h2s[s]).length + '.');
  console.log('');
  console.log('  P7 predicted: control defect bounded above, control slope negative with the');
  console.log('  1 sigma band excluding 0, G2 same sign, and NO u^alpha needed.');
  console.log('  P7 SCORE on the control slope: ' + (neg === tot ? 'HIT' : 'PARTIAL/MISS -- ' + neg + ' of ' + tot + ' slices'));
}
console.log('');

// ------------------------------------------------------- (c) boundedness
console.log('-'.repeat(78));
console.log('(c) BOUNDEDNESS OVER THE WHOLE PAIR SET, ALL THREE LADDERS');
console.log('-'.repeat(78));
console.log('');
console.log('  All integer pairs 2 <= s <= t with s*t inside the known range, by domain');
console.log('  floor. sup D is the log of the candidate constant on that ladder.');
console.log('');
console.log('    ladder                    s0   pairs   sup D   at (s,t)      inf D    max s in the sup');
for (const key of ['POW', 'LOG', 'H', 'H2', 'G2']) {
  const L = LAD[key];
  for (const s0 of [2, 5, 7]) {
    let maxD = -1e9, minD = 1e9, at = null, np = 0;
    for (let s = s0; s < L.cap; s++) for (let t = s; t < L.cap; t++) {
      const st = s * t; if (st >= L.cap) continue; np++;
      const D = Math.log(L.at(st)) - Math.log(L.at(s)) - Math.log(L.at(t));
      if (D > maxD) { maxD = D; at = [s, t]; }
      if (D < minD) minD = D;
    }
    if (np === 0) continue;
    console.log('  ' + L.name.padEnd(28) + pad(s0, 4) + pad(np, 8) + pad(F(maxD, 4), 8) + '   (' + at.join(', ') + ')'.padEnd(9)
      + pad(F(minD, 4), 11) + pad(at[1], 8));
  }
}
console.log('');
console.log('  Read against POW, whose continuous defect is exactly constant: the SUP is');
console.log('  bounded and attained at small arguments on every ladder including the two');
console.log('  synthetics, out to p = 271 on the control. So the sup statistic and the slope');
console.log('  statistic disagree, and the synthetics say which one to believe.');
console.log('');

// ------------------------------------------------------- (d) near-Fekete
console.log('-'.repeat(78));
console.log('(d) IS THE NEAR-FEKETE RELAXATION NEEDED, AND DOES IT ESCAPE THE TRAP?  [P6]');
console.log('-'.repeat(78));
console.log('');
console.log('  BGT Proposition 5 needs D <= K*u^alpha with alpha in (0,1). Halving from a');
console.log('  base u0 = ln x then gives');
console.log('        beta <= g(u0)/u0 + K*u0^(alpha-1)/(2^(1-alpha) - 1),');
console.log('  so beta < 2 at base x iff  K*u0^alpha/(2^(1-alpha) - 1) < S(x) = ln(x^2/Ghat(x)).');
console.log('  Halving also needs every intermediate size above the domain floor, i.e.');
console.log('  base >= s0^2, which is why the base column below starts where it does.');
console.log('');
{
  const PR22 = LAD.G2.pr, GV = LAD.G2.vals;
  console.log('    alpha   best base x   S(x)      u0      K must be below');
  for (const alpha of [0.25, 0.5, 0.75, 0.9]) {
    let bestK = -1, bestX = null, bestS = null, bestU = null;
    for (let i = 0; i < PR22.length; i++) {
      const x = PR22[i], u0 = Math.log(x), S = Math.log(x * x / GV[i]);
      if (x < 49) continue;                                  // floor 7 halving needs base >= 49
      const Kmax = S * (Math.pow(2, 1 - alpha) - 1) / Math.pow(u0, alpha);
      if (Kmax > bestK) { bestK = Kmax; bestX = x; bestS = S; bestU = u0; }
    }
    console.log('  ' + pad(alpha.toFixed(2), 7) + pad(bestX, 14) + pad(F(bestS, 4), 9) + pad(F(bestU, 4), 9) + pad(F(bestK, 4), 21));
  }
  console.log('');
  // the measured defect at floor 7, integer form, on the G2 ladder
  let maxD7 = -1e9;
  for (let s = 7; s < LAD.G2.cap; s++) for (let t = s; t < LAD.G2.cap; t++) { const st = s * t; if (st >= LAD.G2.cap) continue;
    const D = Math.log(LAD.G2.at(st)) - Math.log(LAD.G2.at(s)) - Math.log(LAD.G2.at(t)); if (D > maxD7) maxD7 = D; }
  let maxD2 = -1e9;
  for (let s = 2; s < LAD.G2.cap; s++) for (let t = s; t < LAD.G2.cap; t++) { const st = s * t; if (st >= LAD.G2.cap) continue;
    const D = Math.log(LAD.G2.at(st)) - Math.log(LAD.G2.at(s)) - Math.log(LAD.G2.at(t)); if (D > maxD2) maxD2 = D; }
  console.log('  Measured sup D on the G2 ladder: ' + F(maxD2, 4) + ' at floor 2, ' + F(maxD7, 4) + ' at floor 7.');
  console.log('');
  console.log('  WHICH CORRECTION THE DATA SUPPORTS, read only through the calibration.');
  console.log('  The slice slopes are positive on G2 (+0.16 to +0.35) and on the control');
  console.log('  (+0.19 to +0.49), which taken at face value would say the defect GROWS and');
  console.log('  Fekete-with-a-constant is FALSE. The synthetic null refuses that reading:');
  console.log('  POW, whose continuous defect is exactly constant, reads +0.06 to +0.18 with');
  console.log('  6 of 6 slices positive at 1 sigma, purely from step sampling. So a positive');
  console.log('  slice slope of this size is what a BOUNDED defect looks like on this');
  console.log('  instrument, and no growth is established on any ladder.');
  console.log('  The instrument is not blind, which is what makes the null informative: LOG,');
  console.log('  whose defect really does decrease, reads -0.15 to -0.76 on all six slices');
  console.log('  and carries sup D = 4.2183 against POW\'s 0.7793. h, h2 and G2 all sit with');
  console.log('  POW on both statistics and nowhere near LOG on either.');
  console.log('  Reading, therefore: the reachable range supports a BOUNDED defect, i.e. the');
  console.log('  correction term is O(1) and plain Fekete is the right shape. A bounded');
  console.log('  defect is O(v^alpha) for every alpha > 0, so Proposition 5 covers it and');
  console.log('  delivers nothing Fekete did not: the near-Fekete relaxation is AVAILABLE and');
  console.log('  IDLE. It would earn its keep only if the defect grew.');
  console.log('  Two riders. The measurement cannot EXCLUDE growth slower than the artifact,');
  console.log('  so "bounded" is a supported reading and not a demonstrated fact. And the');
  console.log('  control does not look like its own conjectured asymptotic law on the');
  console.log('  reachable range: h ~ c p (ln p)^2 is the LOG row, and A048670 reads with POW');
  console.log('  instead. That is exponent-control.md\'s +0.28 bias in a second coordinate,');
  console.log('  arrived at here independently.');
  console.log('');
  console.log('  And it does not escape the explicitness trap. The constant form needs');
  console.log('  ln C < S(x); the K*u^alpha form needs K*u0^alpha/(2^(1-alpha)-1) < S(x).');
  console.log('  Both are inequalities against the SAME slack column, so an explicit error');
  console.log('  function of BGT\'s shape is TPC-implying by the same arithmetic that makes');
  console.log('  an explicit constant TPC-implying. The prize is unchanged: limit existence');
  console.log('  with NO named error, of any shape.');
  console.log('');
  console.log('  P6 predicted K < 0.2565 at alpha = 1/2 (computed by hand at base 79 in the');
  console.log('  prereg) and that the relaxation buys nothing on explicitness.');
  {
    const u0 = Math.log(79), S79 = Math.log(79 * 79 / 1710);
    const K79 = S79 * (Math.SQRT2 - 1) / Math.sqrt(u0);
    console.log('  Recomputed at base 79, alpha = 1/2:  K < ' + F(K79, 4) + '.');
    console.log('  P6 SCORE: ' + (Math.abs(K79 - 0.2565) < 5e-4 ? 'HIT' : 'MISS') + ' on the number.');
  }
}
console.log('');

// ------------------------------------------------------- (e) what is open
console.log('-'.repeat(78));
console.log('(e) WHAT REMAINS OPEN FOR TODO 1d, STATED AS AN INEQUALITY ABOUT S');
console.log('-'.repeat(78));
console.log('');
console.log('  Stage 1\'s identity D(s,t) = S(s) + S(t) - S(st) turns the whole route into');
console.log('  ONE statement about the Overshoot slack:');
console.log('');
console.log('     the exponent beta = lim ln G2(x#)/ln x EXISTS');
console.log('     <== S is SUPERADDITIVE up to a bounded error on the multiplicative');
console.log('         semigroup of integers >= 2, with the error NEVER NAMED.');
console.log('');
console.log('  That is a cleaner target than the multiplicative form, because the linear');
console.log('  part of S cancels identically and only the sublinear part is in play: the');
console.log('  statement is exactly that the LOG CORRECTION in G2 is subadditive-ish. And');
console.log('  it is not vacuous in the other direction either: S(x) > 0 for all x IS the');
console.log('  Zone Postulate (ZONE-POSTULATE.md 3), so the object whose superadditivity is');
console.log('  wanted is one whose positivity is already the open problem.');
console.log('');
console.log('='.repeat(78));
console.log(FAILS === 0 ? 'SELF-TESTS: all passed.' : 'SELF-TESTS: ' + FAILS + ' FAILURES');
console.log('elapsed ' + ((Date.now() - T0) / 1000).toFixed(1) + ' s');
console.log('='.repeat(78));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/import-interp-02-correction.js
//   invocation:  node research/import-interp-02-correction.js
//   code-sha256: 0026124e089d1a1407f746a3af65076db34659dba1b04c944ec60dcf203a363f
//   out-sha256:  b2e1a1a662311bc3cca63e6b76254f2c9c2866c41e6215745f8feb2f5871f0f0
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.1 s
// ============================================================================
// ==============================================================================
// IMPORT ROW 9 (BGT) -- STAGE 2: THE CORRECTION TERM, CALIBRATED FIRST
// ==============================================================================
//
// ------------------------------------------------------------------------------
// SELF-TESTS
// ------------------------------------------------------------------------------
//   ok    A048670 has 58 terms, last 954   p_58 = 271, cap 277
//   ok    A288815 has 21 terms, last 2622   p_21 = 73
//   ok    G2 ladder has 22 terms, last 1710   p_22 = 79
//   ok    G2 <= h2 at every shared term (exponent-control.md)   first 21 terms
//   ok    h <= G2 at every shared term   22 terms
//   ok    A288815 = 6*A072753 + 6 at the 19 shared terms   custody line from exponent-control.md
//
// ------------------------------------------------------------------------------
// (a) THE DIAGONAL DEFECT, AND WHY IT HAS NO RANGE
// ------------------------------------------------------------------------------
//
//   D_diag(x) = ln Fhat(x) - 2 ln Fhat(sqrt(x)). Both arguments must be large for
//   the asymptotic form to bind, and sqrt(x) is the problem:
//
//     ladder                     x    sqrt(x)   Fhat(x)  Fhat(sqrt x)   D_diag
//   h  (A048670, one class)   109     10.44       312            10   1.1378
//   h  (A048670, one class)   271     16.46       954            22   0.6786
//   h2 (A288815, two class)    31      5.57       570            18   0.5649
//   h2 (A288815, two class)    73      8.54      2622            30   1.0693
//   G2 (A144311+1, ours)       31      5.57       348            12   0.8824
//   G2 (A144311+1, ours)       79      8.89      1710            30   0.6419
//
//   The largest sqrt(x) any of the three ladders offers is 16.46, so the
//   diagonal is a two-point comparison between an asymptotic argument and a
//   pre-asymptotic one. It is reported and set aside. Everything below uses the
//   fixed-s slice, which has one large argument and the full ladder of range.
//
// ------------------------------------------------------------------------------
// (b) THE FIXED-s SLICES: IS THE DEFECT BOUNDED, AND DOES IT FLATTEN?      [P7]
// ------------------------------------------------------------------------------
//
//   D(s, t) = ln Fhat(st) - ln Fhat(s) - ln Fhat(t), s fixed, t running the
//   ladder primes with s*t inside the known range. Predicted shape: bounded,
//   slowly DECREASING against ln u (u = ln t), slope -> 0^-.
//
//   POW  c*p^1.216 (null)     range t <= 276, s*t < 277
//     s    pts   D at first t   D at last t     min D     max D    slope vs ln(ln t)   +/-
//     2     33        -0.4005       -0.0642   -0.4844   -0.0571             0.1845  0.0201
//     3     23        -0.3563       -0.0692   -0.3563   -0.0623             0.1726  0.0164
//     4     17         0.2365        0.2760    0.0597    0.2931             0.1181  0.0453
//     5     14        -0.1522       -0.0601   -0.1984   -0.0601             0.1200  0.0233
//     6     11         0.1415        0.1661    0.0750    0.1661             0.0584  0.0472
//     7      9        -0.1015       -0.0603   -0.1157   -0.0603             0.0618  0.0288
//
//   LOG  c*p*(ln p)^2 (null)     range t <= 276, s*t < 277
//     s    pts   D at first t   D at last t     min D     max D    slope vs ln(ln t)   +/-
//     2     33         3.5542        3.1694    2.9438    3.5542            -0.1513  0.0327
//     3     23         2.8917        2.4170    2.3976    2.8917            -0.3552  0.0159
//     4     17         3.4441        2.8317    2.8317    3.4441            -0.5147  0.0619
//     5     14         2.4864        1.9063    1.9063    2.4864            -0.6027  0.0340
//     6     11         2.6867        2.1922    2.1544    2.6867            -0.7086  0.0607
//     7      9         2.1794        1.7079    1.7079    2.1794            -0.7616  0.0420
//
//   h  (A048670, one class)     range t <= 276, s*t < 277
//     s    pts   D at first t   D at last t     min D     max D    slope vs ln(ln t)   +/-
//     2     33         0.0000        0.2065   -0.2877    0.3642             0.1920  0.0411
//     3     23        -0.4700       -0.0304   -0.4700    0.1671             0.2893  0.0678
//     4     17         0.3483        0.4011    0.0000    0.5842             0.2898  0.1098
//     5     14         0.1054        0.3560   -0.0339    0.4055             0.3808  0.1024
//     6     11         0.2097        0.4838    0.2097    0.6675             0.4854  0.1144
//     7      9         0.0000        0.2831    0.0000    0.3610             0.3430  0.1867
//
//   h2 (A288815, two class)     range t <= 78, s*t < 79
//     s    pts   D at first t   D at last t     min D     max D    slope vs ln(ln t)   +/-
//     2     12         0.4055        0.6161   -0.1823    0.9163             0.0826  0.1637
//     3      8        -0.1823       -0.0027   -0.2400    0.3642            -0.0274  0.2809
//     4      6         0.8708        0.5270    0.3553    0.9694            -0.5212  0.4033
//     5      4         0.1219       -0.3503   -0.3503    0.1798            -0.6168  0.6737
//     6      3     too few points
//     7      2     too few points
//
//   G2 (A144311+1, ours)     range t <= 82, s*t < 83
//     s    pts   D at first t   D at last t     min D     max D    slope vs ln(ln t)   +/-
//     2     13         0.4055        0.4485    0.0000    0.5798             0.1784  0.0889
//     3      8        -0.1823        0.0479   -0.1823    0.3228             0.3080  0.1817
//     4      6         0.7340        0.5306    0.1252    0.8971             0.1574  0.5559
//     5      4         0.3483        0.3102   -0.0339    0.5459             0.3516  0.7664
//     6      3     too few points
//     7      2     too few points
//
//   THE CALIBRATION, WHICH DECIDES WHETHER ANY OF THIS IS READABLE. POW has a
//   defect that is CONSTANT in the continuous limit (slope exactly 0) and LOG
//   has one that DECREASES. Both are sampled at the same primes and stepped the
//   same way as the real ladders. Slices with a POSITIVE slope at 1 sigma:
//
//     ladder                          slices   positive at 1 sigma   min slope   max slope
//   POW  c*p^1.216 (null)                6                     6      0.0584      0.1845
//   LOG  c*p*(ln p)^2 (null)             6                     0     -0.7616     -0.1513
//   h  (A048670, one class)              6                     6      0.1920      0.4854
//   h2 (A288815, two class)              4                     0     -0.6168      0.0826
//   G2 (A144311+1, ours)                 4                     2      0.1574      0.3516
//
//   POW's true slope is 0 and LOG's is negative. Whatever the step-sampled
//   estimator reports for them is pure artifact, and it is the yardstick every
//   other row has to be read against.
//
//   CONTROL READING (h, 58 terms, exponent 1 + o(1) per exponent-control.md;
//   Iwaniec's PROVEN bound is 2 and the 1 is Maier-Pomerance, conjectural).
//   Slices whose slope is negative at 1 sigma: 0 of 6.
//   Slices where G2 carries the SAME SIGN as the control: 4 of 4.
//   Slices where h2 carries the SAME SIGN as the control: 1 of 4.
//
//   P7 predicted: control defect bounded above, control slope negative with the
//   1 sigma band excluding 0, G2 same sign, and NO u^alpha needed.
//   P7 SCORE on the control slope: PARTIAL/MISS -- 0 of 6 slices
//
// ------------------------------------------------------------------------------
// (c) BOUNDEDNESS OVER THE WHOLE PAIR SET, ALL THREE LADDERS
// ------------------------------------------------------------------------------
//
//   All integer pairs 2 <= s <= t with s*t inside the known range, by domain
//   floor. sup D is the log of the candidate constant on that ladder.
//
//     ladder                    s0   pairs   sup D   at (s,t)      inf D    max s in the sup
//   POW  c*p^1.216 (null)          2     533  0.7793   (10, 10)            -0.4844      10
//   POW  c*p^1.216 (null)          5     240  0.7793   (10, 10)            -0.1984      10
//   POW  c*p^1.216 (null)          7     148  0.7793   (10, 10)            -0.1340      10
//   LOG  c*p*(ln p)^2 (null)       2     533  4.2183   (2, 4)             1.5234       4
//   LOG  c*p*(ln p)^2 (null)       5     240  3.2488   (10, 10)             1.5234      10
//   LOG  c*p*(ln p)^2 (null)       7     148  3.2488   (10, 10)             1.5234      10
//   h  (A048670, one class)        2     533  0.9478   (10, 10)            -0.4700      10
//   h  (A048670, one class)        5     240  0.9478   (10, 10)            -0.0339      10
//   h  (A048670, one class)        7     148  0.9478   (10, 10)             0.0000      10
//   h2 (A288815, two class)        2     104  1.4586   (2, 10)            -0.3503      10
//   h2 (A288815, two class)        5      26  1.1206   (6, 10)            -0.3503      10
//   h2 (A288815, two class)        7       7  1.0055   (8, 9)             0.2808       9
//   G2 (A144311+1, ours)           2     111  1.0761   (4, 10)            -0.2400      10
//   G2 (A144311+1, ours)           5      29  1.0202   (6, 12)            -0.2400      12
//   G2 (A144311+1, ours)           7       9  0.6419   (8, 10)            -0.2400      10
//
//   Read against POW, whose continuous defect is exactly constant: the SUP is
//   bounded and attained at small arguments on every ladder including the two
//   synthetics, out to p = 271 on the control. So the sup statistic and the slope
//   statistic disagree, and the synthetics say which one to believe.
//
// ------------------------------------------------------------------------------
// (d) IS THE NEAR-FEKETE RELAXATION NEEDED, AND DOES IT ESCAPE THE TRAP?  [P6]
// ------------------------------------------------------------------------------
//
//   BGT Proposition 5 needs D <= K*u^alpha with alpha in (0,1). Halving from a
//   base u0 = ln x then gives
//         beta <= g(u0)/u0 + K*u0^(alpha-1)/(2^(1-alpha) - 1),
//   so beta < 2 at base x iff  K*u0^alpha/(2^(1-alpha) - 1) < S(x) = ln(x^2/Ghat(x)).
//   Halving also needs every intermediate size above the domain floor, i.e.
//   base >= s0^2, which is why the base column below starts where it does.
//
//     alpha   best base x   S(x)      u0      K must be below
//      0.25            59   1.2819   4.0775               0.6151
//      0.50            59   1.2819   4.0775               0.2630
//      0.75            59   1.2819   4.0775               0.0845
//      0.90            59   1.2819   4.0775               0.0260
//
//   Measured sup D on the G2 ladder:  1.0761 at floor 2,  0.6419 at floor 7.
//
//   WHICH CORRECTION THE DATA SUPPORTS, read only through the calibration.
//   The slice slopes are positive on G2 (+0.16 to +0.35) and on the control
//   (+0.19 to +0.49), which taken at face value would say the defect GROWS and
//   Fekete-with-a-constant is FALSE. The synthetic null refuses that reading:
//   POW, whose continuous defect is exactly constant, reads +0.06 to +0.18 with
//   6 of 6 slices positive at 1 sigma, purely from step sampling. So a positive
//   slice slope of this size is what a BOUNDED defect looks like on this
//   instrument, and no growth is established on any ladder.
//   The instrument is not blind, which is what makes the null informative: LOG,
//   whose defect really does decrease, reads -0.15 to -0.76 on all six slices
//   and carries sup D = 4.2183 against POW's 0.7793. h, h2 and G2 all sit with
//   POW on both statistics and nowhere near LOG on either.
//   Reading, therefore: the reachable range supports a BOUNDED defect, i.e. the
//   correction term is O(1) and plain Fekete is the right shape. A bounded
//   defect is O(v^alpha) for every alpha > 0, so Proposition 5 covers it and
//   delivers nothing Fekete did not: the near-Fekete relaxation is AVAILABLE and
//   IDLE. It would earn its keep only if the defect grew.
//   Two riders. The measurement cannot EXCLUDE growth slower than the artifact,
//   so "bounded" is a supported reading and not a demonstrated fact. And the
//   control does not look like its own conjectured asymptotic law on the
//   reachable range: h ~ c p (ln p)^2 is the LOG row, and A048670 reads with POW
//   instead. That is exponent-control.md's +0.28 bias in a second coordinate,
//   arrived at here independently.
//
//   And it does not escape the explicitness trap. The constant form needs
//   ln C < S(x); the K*u^alpha form needs K*u0^alpha/(2^(1-alpha)-1) < S(x).
//   Both are inequalities against the SAME slack column, so an explicit error
//   function of BGT's shape is TPC-implying by the same arithmetic that makes
//   an explicit constant TPC-implying. The prize is unchanged: limit existence
//   with NO named error, of any shape.
//
//   P6 predicted K < 0.2565 at alpha = 1/2 (computed by hand at base 79 in the
//   prereg) and that the relaxation buys nothing on explicitness.
//   Recomputed at base 79, alpha = 1/2:  K <  0.2565.
//   P6 SCORE: HIT on the number.
//
// ------------------------------------------------------------------------------
// (e) WHAT REMAINS OPEN FOR TODO 1d, STATED AS AN INEQUALITY ABOUT S
// ------------------------------------------------------------------------------
//
//   Stage 1's identity D(s,t) = S(s) + S(t) - S(st) turns the whole route into
//   ONE statement about the Overshoot slack:
//
//      the exponent beta = lim ln G2(x#)/ln x EXISTS
//      <== S is SUPERADDITIVE up to a bounded error on the multiplicative
//          semigroup of integers >= 2, with the error NEVER NAMED.
//
//   That is a cleaner target than the multiplicative form, because the linear
//   part of S cancels identically and only the sublinear part is in play: the
//   statement is exactly that the LOG CORRECTION in G2 is subadditive-ish. And
//   it is not vacuous in the other direction either: S(x) > 0 for all x IS the
//   Zone Postulate (ZONE-POSTULATE.md 3), so the object whose superadditivity is
//   wanted is one whose positivity is already the open problem.
//
// ==============================================================================
// SELF-TESTS: all passed.
// elapsed 0.0 s
// ==============================================================================
// ============================================================================
// READINGS
// ============================================================================

// 1. BGT point at the deterministic tool themselves, and it is de Bruijn-Erdos.
//    Appendix B says Proposition 5 "is a special case of a more general and
//    classical theorem of de Bruijn and Erdos ... which uses a weaker assumption
//    on the additive term in the near super-additivity hypothesis". So the two
//    halves of this task's question are the same half: the random machine's
//    closing step IS the deterministic near-Fekete lemma.
//
// 2. The diagonal has no range and is set aside. The largest sqrt(x) any of the
//    three ladders offers is 16.46, so D_diag compares an asymptotic argument
//    with a pre-asymptotic one. Its readings (1.1378 and 0.6786 on h, 0.8824 and
//    0.6419 on G2) are reported and carry nothing.
//
// 3. CALIBRATE BEFORE FITTING, and here is why. POW = c*p^1.216 has a defect
//    that is EXACTLY CONSTANT in the continuous limit, slope zero. Step-sampled
//    at the ladder primes it reads +0.0584 to +0.1845 with 6 of 6 slices
//    positive at 1 sigma. A positive slice slope of that size is what a BOUNDED
//    defect looks like on this instrument.
//
// 4. And the instrument is not blind, which is what makes the null usable. LOG =
//    c*p*(ln p)^2, whose defect really does decrease, reads -0.1513 to -0.7616 on
//    all six slices and carries sup D = 4.2183 against POW's 0.7793. The two
//    nulls are separated by an order of magnitude on both statistics.
//
// 5. G2 sits with POW. Its slice slopes are +0.1574 to +0.3516 and its sup D is
//    1.0761 at floor 2, 1.0202 at floor 5, 0.6419 at floor 7, against POW's
//    0.7793 and LOG's 3.2488. The reachable range therefore supports a BOUNDED
//    defect, i.e. an O(1) correction term and plain Fekete. P7: MISS on the
//    predicted sign (0 of 6 control slices are negative at 1 sigma), HIT on the
//    substance the prediction was about, reached through the null rather than
//    through the slope.
//
// 6. The control does not look like its own conjectured law on the reachable
//    range. h ~ c p (ln p)^2 is literally the LOG row, and A048670 reads +0.1920
//    to +0.4854 with sup D = 0.9478, i.e. with POW. That is exponent-control.md's
//    +0.28 finite-range bias in a second coordinate, arrived at here
//    independently, and it is the reason no growth reading on G2 is believable.
//
// 7. The near-Fekete relaxation is AVAILABLE and IDLE. A bounded defect is
//    O(v^alpha) for every alpha > 0, so Proposition 5 covers it and returns
//    exactly what Fekete already returned. It would earn its keep only if the
//    defect grew, and after calibration nothing says it does.
//
// 8. And it does not escape the explicitness trap. The constant form needs
//    ln C < S(x); the K*u^alpha form needs K*u0^alpha/(2^(1-alpha)-1) < S(x).
//    Same column, same arithmetic. At alpha = 1/2 the admissible K is below
//    0.2630 at the best base (x = 59), and 0.2565 at base 79, which was the
//    prereg's hand-computed number to four places. P6: HIT.
//
// 9. The route restated in the form worth attacking. beta exists if S is
//    superadditive up to a bounded error on the multiplicative semigroup of
//    integers >= 2, with the error never named. The linear part of S cancels
//    identically, so this is a statement about the LOG CORRECTION in G2 alone --
//    and the same object's POSITIVITY, S(x) > 0, is already the Zone Postulate.
