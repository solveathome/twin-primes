'use strict';
// ============================================================================
// SHADOW-BUCHSTAB 01 — THE BAND-AVERAGED PAIR-BUCHSTAB CANDIDATE
// (2026-08-19, TODO item 5. Pure computation: no measurement in this file.)
// ============================================================================
// QUESTION. `research/anchored-windows.md` §5 records a "kill shadow": the
// window immediately past a level's crystallization edge is depleted to ~0.85
// of the tile's fair twin-slot share, at every level measured. The POINT
// constant at the edge itself is resolved — the pair-survival ratio has its
// minimum e^{2gamma}/4 = 0.79305 there. The standing CANDIDATE explanation
// (attack2-05-07-integral-ladder.js reading A5-2, asserted but never computed)
// is that 0.85 is simply the AVERAGE of the survival curve over the octave
// past the edge.
//
// THE CURVE. `attack2-05-07-integral-ladder.js` establishes, and measures to
// ~1%, the Unification Law for the local pair-survival ratio
//   rho(x, y) = (density near x of pairs (r, r+2) both free of primes <= y)
//               / delta(y),        delta(y) = (1/2) prod_{2<p<=y} (1 - 2/p),
// as a function of u = ln x / ln y alone:
//   rho(u) = e^{2gamma} / u^2                  on 1 <= u <= 2   (exact, HL)
//   rho(u) = (e^{gamma} omega(u))^2            on 2 <= u <= 3   (conjecture:
//            omega = Buchstab, omega(u) = (1 + ln(u-1))/u        independence
//                                                                of the two
//                                                                coordinates)
// Both branches agree at u = 2 at the trough value e^{2gamma}/4.
//
// THE BAND. The ignition band [y^2, 2y^2] is exactly u in [2, 2 + ln2/ln y].
// The band is NOT of fixed width in u: it narrows like 1/ln y, so any average
// over it must approach the trough value 0.79305 from above as y grows. That
// monotone decrease is a hard prediction of the candidate, independent of the
// constants, and is scored separately from the magnitude below.
//
// WHICH AVERAGE. The measurement counts slots per unit LENGTH, so the physical
// band average is the x-weighted one,
//   B_x(y) = (1/y^2) * int_{y^2}^{2y^2} rho(ln t / ln y) dt,
// which by t = y^u is  int_0^1 rho(2 + w s) * ln2 * 2^s ds  with w = ln2/ln y.
// The unweighted average in u,
//   B_u(y) = (1/w) * int_2^{2+w} rho(u) du,
// is reported alongside because it is the naive reading of "average over the
// band" and differs by a known factor; B_x is the one that can be measured.
//
// FIRST-ORDER FORM (derived here, checked numerically below). Near the trough
//   rho(2 + e) = e^{2gamma}/4 * (1 + e + O(e^2)),
// since d/de[(1 + ln(1+e))/(2+e)] = 1/4 at e = 0. Hence
//   B_x(y) = 0.79305 * (1 + 0.55730 w + O(w^2)),   0.55730 = ln2*(2/ln2 - 1/ln^2 2)
//   B_u(y) = 0.79305 * (1 + 0.5 w + O(w^2)).
//
// THE COMPARATOR the anchored-windows table actually used is slightly
// different: its band sits at the NEXT prime's square, [p'^2, 2p'^2], while
// the sieve level (and delta) is p. That shifts the band to
//   u in [2 ln p' / ln p, 2 ln p' / ln p + ln2/ln p],
// which is the ">= 2" side of the same curve, so both variants are printed.
// ============================================================================

const GAMMA = 0.5772156649015329;
const E2G = Math.exp(2 * GAMMA);
const omega = (u) => (1 + Math.log(u - 1)) / u;        // Buchstab on [2,3]
const rho = (u) => (u <= 2 ? E2G / (u * u) : Math.pow(Math.exp(GAMMA) * omega(u), 2));

// Simpson on [a,b] in n (even) panels — the integrands are smooth and analytic
// on the closed band, so this is exact to well past printed precision.
function simpson(f, a, b, n) {
  if (n % 2) n++;
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return s * h / 3;
}

// x-weighted band average over [y^{u0}, y^{u0} * 2]:  int_0^1 rho(u0+ws) ln2 2^s ds
function bandX(y, u0) {
  const w = Math.LN2 / Math.log(y);
  return simpson((s) => rho(u0 + w * s) * Math.LN2 * Math.pow(2, s), 0, 1, 2000);
}
// unweighted-in-u band average over u in [u0, u0+w]
function bandU(y, u0) {
  const w = Math.LN2 / Math.log(y);
  return simpson((u) => rho(u), u0, u0 + w, 2000) / w;
}

function nextPrime(n) {
  const isP = (m) => { if (m < 2) return false; for (let d = 2; d * d <= m; d++) if (m % d === 0) return false; return true; };
  let m = n + 1; while (!isP(m)) m++; return m;
}

console.log('=== the curve at and just past the trough ===');
console.log('e^{2gamma}     = ' + E2G.toFixed(6));
console.log('rho(2)         = ' + rho(2).toFixed(6) + '   (= e^{2gamma}/4, the point trough)');
for (const u of [2.00, 2.02, 2.05, 2.10, 2.15, 2.22, 2.37])
  console.log(`rho(${u.toFixed(2)})      = ` + rho(u).toFixed(6) + `   slope from trough: ${((rho(u)/rho(2) - 1)/(u - 2) || 1).toFixed(5)}`);

console.log('\n=== CANDIDATE: band average of rho over the ignition band ===');
console.log('band anchored at the level\'s own square, [y^2, 2y^2], u in [2, 2+ln2/ln y]');
console.log('  y        w=ln2/lny   B_x (x-weighted)   B_u (flat in u)   1st-order B_x');
const LEVELS = [23, 97, 401, 997, 2999, 10007, 1e5, 1e6, 1e9, 1e15];
for (const y of LEVELS) {
  const w = Math.LN2 / Math.log(y);
  const fo = rho(2) * (1 + 0.5573013 * w);
  console.log(`  ${String(y).padEnd(9)}${w.toFixed(6).padStart(9)}   ${bandX(y, 2).toFixed(6).padStart(10)}        ${bandU(y, 2).toFixed(6).padStart(10)}      ${fo.toFixed(6)}`);
}
console.log('  limit y->inf                 ' + rho(2).toFixed(6) + '          ' + rho(2).toFixed(6));

console.log('\n=== same, for the anchored-windows comparator (band at the NEXT prime\'s square) ===');
console.log('  p        p\'      u0=2lnp\'/lnp   B_x        B_u');
for (const p of [23, 97, 401, 997, 2999, 10007]) {
  const q = nextPrime(p);
  const u0 = 2 * Math.log(q) / Math.log(p);
  console.log(`  ${String(p).padEnd(9)}${String(q).padEnd(8)}${u0.toFixed(6).padStart(10)}   ${bandX(p, u0).toFixed(6)}   ${bandU(p, u0).toFixed(6)}`);
}

console.log('\n=== the shape the band predicts: octile profile inside [y^2, 2y^2] ===');
console.log('(each octile is a factor 2^{1/8} in x; value = x-weighted mean of rho there,');
console.log(' normalised to the band mean, so the finite-size factor common to a level cancels)');
for (const y of [997, 10007]) {
  const w = Math.LN2 / Math.log(y);
  const B = bandX(y, 2);
  const row = [];
  for (let k = 0; k < 8; k++) {
    const a = k / 8, b = (k + 1) / 8;
    const num = simpson((s) => rho(2 + w * s) * Math.LN2 * Math.pow(2, s), a, b, 400);
    const mass = Math.pow(2, b) - Math.pow(2, a);   // the x-mass of the octile, in units of y^2
    row.push((num / mass / B).toFixed(4));
  }
  console.log(`  y=${String(y).padEnd(7)} band mean ${B.toFixed(4)}   octiles/mean: ` + row.join(' '));
  console.log(`  y=${String(y).padEnd(7)} rise across the band (last octile / first) = ${(Number(row[7]) / Number(row[0])).toFixed(4)}  (predicted ~ 1 + 7w/8 = ${(1 + 7 * w / 8).toFixed(4)})`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/shadow-buchstab-01-candidate.js
//   invocation:  node research/shadow-buchstab-01-candidate.js
//   code-sha256: 4a3ecdf571f90a658c1ec05912eaf568a09e757d9ecf369a0d387c4066c73b88
//   out-sha256:  9159a895960ad9e80bc7ba42d061eaa092d5338a308274984a77bf3bf5030f54
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.1 s
// ============================================================================
// === the curve at and just past the trough ===
// e^{2gamma}     = 3.172219
// rho(2)         = 0.793055   (= e^{2gamma}/4, the point trough)
// rho(2.00)      = 0.793055   slope from trough: 1.00000
// rho(2.02)      = 0.808524   slope from trough: 0.97527
// rho(2.05)      = 0.830295   slope from trough: 0.93917
// rho(2.10)      = 0.862976   slope from trough: 0.88167
// rho(2.15)      = 0.891486   slope from trough: 0.82744
// rho(2.22)      = 0.925098   slope from trough: 0.75681
// rho(2.37)      = 0.976322   slope from trough: 0.62457
//
// === CANDIDATE: band average of rho over the ignition band ===
// band anchored at the level's own square, [y^2, 2y^2], u in [2, 2+ln2/ln y]
//   y        w=ln2/lny   B_x (x-weighted)   B_u (flat in u)   1st-order B_x
//   23        0.221065     0.873491          0.865981      0.890759
//   97        0.151517     0.851659          0.846009      0.860021
//   401       0.115641     0.839217          0.834695      0.844165
//   997       0.100387     0.833670          0.829665      0.837423
//   2999      0.086578     0.828512          0.824994      0.831320
//   10007     0.075252     0.824182          0.821079      0.826314
//   100000    0.060206     0.818291          0.815759      0.819664
//   1000000   0.050172     0.814272          0.812134      0.815229
//   1000000000 0.033448     0.807409          0.805953      0.807838
//   1000000000000000 0.020069     0.801769          0.800880      0.801924
//   limit y->inf                 0.793055          0.793055
//
// === same, for the anchored-windows comparator (band at the NEXT prime's square) ===
//   p        p'      u0=2lnp'/lnp   B_x        B_u
//   23       29        2.147857   0.943056   0.938210
//   97       101       2.017666   0.862697   0.857310
//   401      409       2.006591   0.843619   0.839174
//   997      1009      2.003466   0.836045   0.832076
//   2999     3001      2.000167   0.828629   0.825113
//   10007    10009     2.000043   0.824213   0.821111
//
// === the shape the band predicts: octile profile inside [y^2, 2y^2] ===
// (each octile is a factor 2^{1/8} in x; value = x-weighted mean of rho there,
//  normalised to the band mean, so the finite-size factor common to a level cancels)
//   y=997     band mean 0.8337   octiles/mean: 0.9573 0.9688 0.9800 0.9909 1.0014 1.0115 1.0214 1.0309
//   y=997     rise across the band (last octile / first) = 1.0769  (predicted ~ 1 + 7w/8 = 1.0878)
//   y=10007   band mean 0.8242   octiles/mean: 0.9668 0.9756 0.9843 0.9927 1.0009 1.0089 1.0168 1.0244
//   y=10007   rise across the band (last octile / first) = 1.0596  (predicted ~ 1 + 7w/8 = 1.0658)
// ============================================================================
// READINGS
// S1-1. THE CANDIDATE IS NOT A CONSTANT, and that is its sharpest content. The
//   band average B_x falls monotonically with the level — 0.873491 at y = 23,
//   0.851659 at 97, 0.839217 at 401, 0.833670 at 997, 0.824182 at 10007,
//   0.807409 at 1e9 — because the band [y^2, 2y^2] is a FIXED FACTOR in x and
//   therefore a SHRINKING interval in u, of width w = ln2/ln y. Its limit is
//   the point trough 0.793055 itself. So "the kill shadow is 0.85 at every
//   level" and "the kill shadow is the band-averaged pair-Buchstab integral"
//   cannot both be true: if the second holds, the shadow must drift down, and
//   0.85 is only the value it takes near y ~ 100..1000. That drift is what
//   research/shadow-buchstab-02-instrument.js goes and measures. CALIBRATION:
//   MEASURED-FREE — this file computes an integral, it tests nothing.
// S1-2. The first-order form printed in the last column, derived in the header
//   from rho(2+e) = (e^{2gamma}/4)(1 + e + O(e^2)), tracks the exact integral
//   closely and converges onto it: 0.837423 against 0.833670 at y = 997, and
//   0.801924 against 0.801769 at y = 1000000000000000. The whole effect is the
//   slope of the survival curve at its minimum, integrated over one octave, and
//   the octave is worth more than half of w because the count is weighted by x,
//   not by u — the flat average B_u is smaller (0.829665 against 0.833670 at
//   y = 997).
// S1-3. THE FALSIFIABLE PART IS THE SHAPE, not the level. Inside the band the
//   predicted profile rises monotonically, 0.9573 -> 1.0309 of the band mean
//   in eighths at y = 997, last/first = 1.0769 (1.0596 at y = 10007). That
//   ratio divides out every level-wide normalisation, including whatever
//   finite-size factor separates a measured trough from e^{2gamma}/4, so it
//   tests the CURVE rather than the constants around it.
// S1-4. THE §5 COMPARATOR IS A DIFFERENT OBJECT AT SMALL LEVELS. Putting the
//   band at the NEXT prime's square while sieving to p moves its left edge to
//   u0 = 2 ln p'/ln p, which is 2.147857 at p = 23 and only 2.000043 at
//   p = 10007. At p = 23 that alone lifts the prediction from 0.873491 to
//   0.943056 — a 0.07 shift caused by the prime gap 23 -> 29, not by any
//   property of the shadow. Any comparison at p = 23 is a comparison with the
//   gap structure of the small primes.
// ============================================================================
