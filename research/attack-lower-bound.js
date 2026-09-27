#!/usr/bin/env node
// ============================================================================
// ATTACK LOWER BOUND — pricing the OTHER side of the two-class Jacobsthal
// problem: how far below the truth does the free lower bound sit, and does the
// Kalmynin-Konyagin construction close the distance?
// ============================================================================
// THE ASYMMETRY THIS SCRIPT EXISTS TO MEASURE. Nine attacks push the upper
// bound 4.2665 down. This one asks what is under the truth. The only lower
// bound the corpus owns is free:
//
//     G2(x#) >= g(x#)  pointwise  (PROVEN, elementary: twin slots are a subset
//                                  of holes, `two-class-lower-bounds.md` §1)
//     g(x#)  >> x ln x lll x / ll x  (FGKMT, JAMS 31 (2018), via Rankin and
//                                     Pintz; the OEIS home is A048670)
//
// The first inequality is TWO-CLASS and costs nothing. The second is the
// one-class Erdos-Rankin record and is not ours. So the deficit of the free
// bound splits into a part a two-class construction could recover and a part
// that is Erdos #687, a $1000 problem. NOBODY HAS EVER SEPARATED THE TWO
// NUMERICALLY, and A144311's 22 exact terms (Carter 2008; Alekseyev 2009;
// Wang 2024) now make it possible: 22 levels of G2 against 22 levels of g,
// both exact.
//
// WHAT IS COMPUTED, IN FOUR SECTIONS.
//
// (A) THE GAP, PRICED. G2(x#)/g(x#) at all 22 levels, both sides exact, plus
//     the same ratio normalised by ln x. This is the whole two-class part of
//     the deficit and it has never been tabulated. Also the asymptotic form
//     x ln x lll x/ll x evaluated at the same levels, which is where the
//     first surprise is.
//
// (B) THE SHAPE TEST. `covering-dive.md` §4.2 records, as INFERRED and
//     explicitly NOT proven, that the Kalmynin-Konyagin template predicts
//         G2(P(y)) >> y (ln y)^3 (lll y)^2 / (ll y)^4.
//     Is the exact data consistent with that shape? Tested against the
//     measured law `c x ln^2 x` of `two-class-lower-bounds.md` §6, and against
//     the Poisson-extremes form c*m*lnD, which §6a fits only to x = 41 and
//     which is extended here to all 22 levels.
//
// (C) HOW MUCH RANGE WOULD SETTLE IT. The exponent of ln is the whole question
//     between the two shapes, so: at what x does one factor of ln x exceed the
//     scatter the 22 terms already show?
//
// (D) THE TRANSFER, RUN. `covering-dive.md` §4.2 names the unchecked step:
//     K-K's Cases 1-3 (their §2) must be re-derived for Omega_p = {a_p, a_p-2}
//     before their template is anything but a reading of a proof. Section D
//     runs the substitution and checks, numerically, the three claims the
//     re-derivation rests on: the Case 1 smoothness dichotomy (checked
//     exhaustively, and its exact finite-y threshold located), the four-class
//     middle band (the entire source of the gain over a two-band Rankin), and
//     whether the resulting three-band construction certifies anything at
//     accessible y.
//
// CUSTODY OF THE INPUT DATA. Both ladders were re-read from OEIS in the same
// session that produced this file, in the convention that OWNS each object
// (`SEARCH-CONVENTIONS.md` §1): A144311 returns on the query `1,5,11,29,41,
// 65,107` and is G2 - 1; A048670 returns on `2,4,6,10,14,22,26,34,40,46,58,66`
// and is g(p_n#). The G2 array below is A144311 + 1 and its first fourteen
// terms are the repo ladder of `exact-g2-ladder.js`, which certifies them
// independently. A144311 carries no formula, no bound and no reference; the
// FGKMT lower bound IS recorded at A048670 (Greathouse, 29 Mar 2018) and is
// NOT recorded at A144311 — which is the precise sense in which the free
// bound is unrecorded for the two-class object.
//
// Runtime 0.5 s (measured 2026-08-18, node v22); sections D2 and D4 dominate.
// ============================================================================
'use strict';

// ---------------------------------------------------------------------------
// DATA
// ---------------------------------------------------------------------------

// A144311 + 1. G2(x#) = largest gap between consecutive twin-admissible slots
// mod x#. 22 exact terms, proven maximal (the branch-and-bound's pruning test
// is admissible: `attack-beta2-05-covering-prune.js` Theorem P).
const XS = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79];
const G2 = [2,6,12,30,42,66,108,150,204,258,348,528,546,618,708,870,966,1080,
            1284,1398,1530,1710];

// A048670, first 22 terms: g(p_n#), the one-class Jacobsthal function at
// primorials. This is the free lower bound in its POINTWISE form.
const G1 = [2,4,6,10,14,22,26,34,40,46,58,66,74,90,100,106,118,132,152,174,
            190,200];

// A288815, the free-choice two-class optimum h2(p_n#) (Ziller-Morack ILP), 21
// terms. Carried only as the third column of the shape test: h2 >= G2 bounds
// the wrong way, so it is never a lower bound for us.
const H2 = [2,6,18,30,66,150,192,258,366,450,570,708,894,1044,1284,1422,1656,
            1902,2190,2460,2622];

const ln = Math.log;
const L1 = x => ln(x), L2 = x => ln(ln(x)), L3 = x => ln(ln(ln(x)));

function sieve(n) {
  const s = new Uint8Array(n + 1), o = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return o;
}
const PRIMES = sieve(200000);

// ordinary least squares slope of y on x, plus the residual sd
function ols(x, y) {
  const n = x.length; let sx = 0, sy = 0;
  for (let i = 0; i < n; i++) { sx += x[i]; sy += y[i]; }
  const mx = sx / n, my = sy / n; let sxy = 0, sxx = 0;
  for (let i = 0; i < n; i++) { sxy += (x[i] - mx) * (y[i] - my); sxx += (x[i] - mx) ** 2; }
  const a = sxy / sxx, b = my - a * mx;
  let rss = 0; for (let i = 0; i < n; i++) { const r = y[i] - (a * x[i] + b); rss += r * r; }
  const sd = Math.sqrt(rss / Math.max(1, n - 2));
  return { a, b, sd, se: sd / Math.sqrt(sxx), n };
}
function stats(v) {
  const n = v.length, mean = v.reduce((a, b) => a + b, 0) / n;
  const sd = Math.sqrt(v.reduce((a, b) => a + (b - mean) ** 2, 0) / Math.max(1, n - 1));
  return { mean, sd, cv: sd / mean, min: Math.min(...v), max: Math.max(...v) };
}
const f2 = (v, d = 4) => (Number.isFinite(v) ? v.toFixed(d) : '   n/a');

console.log('############################################################################');
console.log('# A. THE GAP, PRICED — the free lower bound against the truth, 22 levels');
console.log('############################################################################\n');

console.log('The free bound has two forms and they behave completely differently.');
console.log('POINTWISE:  G2(x#) >= g(x#), both sides exact, so the ratio IS the deficit.');
console.log('ASYMPTOTIC: g(x#) >> x ln x lll x / ll x, constant unspecified.\n');

console.log(' x    G2      g=A048670   G2/g    (G2/g)/lnx   F(x)=x lnx lllx/llx   g/F     G2/F');
console.log('---- ------- ----------- ------- ------------ --------------------- ------- -------');
const ratio = [], ratioNorm = [], Fv = [];
for (let i = 0; i < XS.length; i++) {
  const x = XS[i], r = G2[i] / G1[i];
  const F = x * L1(x) * L3(x) / L2(x);          // negative or tiny at small x
  ratio.push(r); Fv.push(F);
  const rn = r / L1(x); ratioNorm.push(rn);
  console.log(
    String(x).padStart(4) + ' ' + String(G2[i]).padStart(7) + ' ' + String(G1[i]).padStart(11) +
    ' ' + f2(r, 3).padStart(7) + ' ' + f2(rn, 4).padStart(12) +
    ' ' + (Number.isFinite(F) ? F.toFixed(2) : 'NaN').padStart(21) +
    ' ' + (F > 0 ? f2(G1[i] / F, 2) : '  DEAD').padStart(7) +
    ' ' + (F > 0 ? f2(G2[i] / F, 2) : '  DEAD').padStart(7));
}

const eee = Math.exp(Math.exp(Math.E));
console.log('\nWhy the F columns read DEAD below x = 17: lll x = ln ln ln x is NEGATIVE for');
console.log('x < e^e = ' + Math.exp(Math.E).toFixed(3) + ', so the asymptotic form is a negative number at 8 of the 22');
console.log('levels, and it does not reach lll x = 1 until x = e^(e^e) = ' + eee.toExponential(3) + '.');
console.log('lll x over the whole exact range: ' + L3(17).toFixed(4) + ' at x = 17 to ' + L3(79).toFixed(4) + ' at x = 79.');
console.log('So the free bound CANNOT be measured in its own coordinates on any data that');
console.log('exists. The measurable object is the pointwise form, and that is exact.\n');

const rr = ols(XS.map(x => ln(L1(x))), ratio.map(ln));
const rrTop = ols(XS.slice(8).map(x => ln(L1(x))), ratio.slice(8).map(ln));
const rnS = stats(ratioNorm.slice(6));   // x >= 17, where lnx has moved enough to mean anything
console.log('THE DEFICIT, FITTED. log(G2/g) against log(ln x):');
console.log('  all 22 terms        exponent of ln x = ' + rr.a.toFixed(4) + '   (prefactor ' + Math.exp(rr.b).toFixed(4) + ')');
console.log('  top 14, x >= 23     exponent of ln x = ' + rrTop.a.toFixed(4) + '   (prefactor ' + Math.exp(rrTop.b).toFixed(4) + ')');
console.log('  (G2/g)/ln x over x >= 17: mean ' + rnS.mean.toFixed(4) + ', sd ' + rnS.sd.toFixed(4) +
            ', cv ' + (100 * rnS.cv).toFixed(1) + '%, range [' + rnS.min.toFixed(3) + ', ' + rnS.max.toFixed(3) + ']');
console.log('\nThe asymptotic form F has no stable constant on this range either:');
console.log('  g/F runs ' + (G1[6] / Fv[6]).toFixed(2) + ' at x = 17 down to ' + (G1[21] / Fv[21]).toFixed(2) +
            ' at x = 79, a factor of ' + ((G1[6] / Fv[6]) / (G1[21] / Fv[21])).toFixed(1) + '.');
console.log('  So F is not a usable yardstick at any accessible x, in either dimension.');

console.log('\n############################################################################');
console.log('# B. THE SHAPE TEST — is the exact data consistent with y (ln y)^3 ... ?');
console.log('############################################################################\n');

// exact primorial-frame quantities: W = x#, D = # twin slots, m = W/D, lnD
function frame(x) {
  const ps = PRIMES.filter(p => p <= x);
  let lnW = 0, lnD = 0, lnm = 0;
  for (const p of ps) {
    lnW += ln(p);
    if (p === 2) { lnm += 0; }                 // nu(2) = 1: D gains a factor 1
    else { lnD += ln(p - 2); lnm += ln(p / (p - 2)); }
  }
  lnm += ln(2);                                 // the p = 2 factor of m = W/D
  return { lnW, lnD, m: Math.exp(lnm) };
}

console.log('B1. THE THREE CANDIDATE SHAPES, as ratios G2/shape. A shape that is right on');
console.log('    this range shows a FLAT column; the flattest column wins, and the point of');
console.log('    the exercise is how little that proves.\n');
console.log(' x     G2     G2/(x lnx)  G2/(x ln^2x)  G2/(x ln^3x)   KK = y ln^3y lll^2/ll^4   G2/KK');
console.log('---- ------- ----------- ------------- ------------- ------------------------- --------');
const c1c = [], c2c = [], c3c = [], kkr = [];
for (let i = 0; i < XS.length; i++) {
  const x = XS[i], l = L1(x);
  const a = G2[i] / (x * l), b = G2[i] / (x * l * l), c = G2[i] / (x * l * l * l);
  const KK = x * l * l * l * L3(x) * L3(x) / (L2(x) ** 4);
  c1c.push(a); c2c.push(b); c3c.push(c);
  const kkOk = x >= 17 && Number.isFinite(KK) && KK > 0;
  if (kkOk) kkr.push(G2[i] / KK);
  console.log(String(x).padStart(4) + ' ' + String(G2[i]).padStart(7) + ' ' + a.toFixed(4).padStart(11) +
    ' ' + b.toFixed(4).padStart(13) + ' ' + c.toFixed(4).padStart(13) +
    ' ' + (kkOk ? KK.toFixed(3) : 'DEAD (lll y <= 0)').padStart(25) +
    ' ' + (kkOk ? (G2[i] / KK).toFixed(2) : '  DEAD').padStart(8));
}
const s1 = stats(c1c.slice(4)), s2 = stats(c2c.slice(4)), s3 = stats(c3c.slice(4));
console.log('\n    over x = 11..79 (18 terms):        mean      sd       cv      max/min');
for (const [nm, s] of [['G2/(x lnx)  ', s1], ['G2/(x ln^2x)', s2], ['G2/(x ln^3x)', s3]])
  console.log('    ' + nm + '            ' + s.mean.toFixed(4).padStart(8) + ' ' + s.sd.toFixed(4).padStart(8) +
    ' ' + (100 * s.cv).toFixed(1).padStart(6) + '%  ' + (s.max / s.min).toFixed(3).padStart(7));

console.log('\nB2. THE POISSON DIAGONAL, EXTENDED FROM x = 41 TO x = 79.');
console.log('    `two-class-lower-bounds.md` §6a fits c2\' = G2/(m lnD) on nine levels to');
console.log('    x = 41. Here are all 22, with exact m = x#/D and exact lnD.\n');
console.log(' x      m       lnD      m*lnD       G2      c2\' = G2/(m lnD)');
console.log('---- -------- --------- ---------- -------- ------------------');
const c2p = [];
for (let i = 0; i < XS.length; i++) {
  const x = XS[i], fr = frame(x);
  if (fr.lnD <= 0) { console.log(String(x).padStart(4) + '      (D = 1, no diagonal)'); continue; }
  const pred = fr.m * fr.lnD, c = G2[i] / pred;
  c2p.push({ x, c });
  console.log(String(x).padStart(4) + ' ' + fr.m.toFixed(2).padStart(8) + ' ' + fr.lnD.toFixed(3).padStart(9) +
    ' ' + pred.toFixed(1).padStart(10) + ' ' + String(G2[i]).padStart(8) + ' ' + c.toFixed(4).padStart(18));
}
const cOld = stats(c2p.filter(r => r.x >= 11 && r.x <= 41).map(r => r.c));
const cNew = stats(c2p.filter(r => r.x >= 47).map(r => r.c));
const cAll = stats(c2p.filter(r => r.x >= 11).map(r => r.c));
console.log('\n    x = 11..41 (the 9 terms §6a fitted): mean ' + cOld.mean.toFixed(4) + ', cv ' + (100 * cOld.cv).toFixed(1) +
  '%, range [' + cOld.min.toFixed(4) + ', ' + cOld.max.toFixed(4) + ']');
console.log('    x = 47..79 (the 8 NEW terms):        mean ' + cNew.mean.toFixed(4) + ', cv ' + (100 * cNew.cv).toFixed(1) +
  '%, range [' + cNew.min.toFixed(4) + ', ' + cNew.max.toFixed(4) + ']');
console.log('    x = 11..79 (all 20):                 mean ' + cAll.mean.toFixed(4) + ', cv ' + (100 * cAll.cv).toFixed(1) +
  '%, range [' + cAll.min.toFixed(4) + ', ' + cAll.max.toFixed(4) + ']');
const cTrend = ols(c2p.filter(r => r.x >= 11).map(r => ln(L1(r.x))), c2p.filter(r => r.x >= 11).map(r => ln(r.c)));
console.log('    trend: c2\' ~ (ln x)^' + cTrend.a.toFixed(4) + '. The KK template needs +1 here; the');
console.log('    measured law needs 0.');

console.log('\nB3. WHY THE TEST CANNOT DECIDE, MEASURED RATHER THAN ASSERTED.');
const svLo = L3(17) ** 2 / L2(17) ** 4, svHi = L3(79) ** 2 / L2(79) ** 4;
console.log('    The KK shape\'s slowly-varying part is (lll y)^2/(ll y)^4. Over the exact');
console.log('    range it moves from ' + svLo.toExponential(3) + ' to ' + svHi.toExponential(3) +
  ', a factor of ' + (svHi / svLo).toFixed(1) + '.');
console.log('    Over the same range G2 moves by a factor of ' + (G2[21] / G2[6]).toFixed(1) + '.');
console.log('    A "slowly varying" factor that moves ' + (svHi / svLo / (G2[21] / G2[6])).toFixed(1) +
  ' times FASTER than the object it corrects');
console.log('    is not slowly varying on this range, so G2/KK is a measurement of the');
console.log('    correction, not of the shape. G2/KK falls ' + kkr[0].toFixed(1) + ' -> ' + kkr[kkr.length - 1].toFixed(1) +
  ' and that fall is ' + (svHi / svLo).toFixed(0) + '/' + (G2[21] / G2[6]).toFixed(0) + ' by construction.');
console.log('    Meanwhile one factor of ln x is worth only ' + (L1(79) / L1(11)).toFixed(3) +
  ' across x = 11..79, against a');
console.log('    c2\' scatter of cv ' + (100 * cAll.cv).toFixed(1) + '% and a range ratio of ' + (cAll.max / cAll.min).toFixed(2) + '.');

console.log('\n############################################################################');
console.log('# C. HOW MUCH RANGE WOULD SETTLE IT');
console.log('############################################################################\n');
const spread = cAll.max / cAll.min;
const need = k => Math.exp(L1(79) * Math.pow(spread, k));
console.log('To separate `x ln^2 x` from `x ln^3 x` on this instrument the extra factor');
console.log('ln x has to beat the scatter the instrument already has. The 20-term c2\'');
console.log('spread is a factor ' + spread.toFixed(3) + ' (max/min), so one needs ln x to grow by that');
console.log('factor to see the effect at all, and by its square, cube, ... to see it k-sigma:');
console.log('  factor of ln x needed   1x (top of the exact ladder)   x = 79');
for (const k of [1, 2, 3, 4]) console.log('  ' + spread.toFixed(2) + '^' + k + ' = ' + Math.pow(spread, k).toFixed(2).padStart(6) +
  '                                  x = ' + need(k).toExponential(3));
console.log('\nA144311 cost 2.8e10 years of exhaustive enumeration at x = 79 already');
console.log('(`exact-g2-ladder.js`, `sift-limit-attack.md` §7). One more doubling of ln x');
console.log('means exact terms at x ~ ' + need(1).toExponential(2) + '. So the shape question is not decidable');
console.log('from exact terms, now or ever, and the certificate ladder to x = 5003');
console.log('(`two-class-lower-bounds.md` §5d) buys ln x by only a factor ' +
  (L1(5003) / L1(79)).toFixed(2) + ' over this.');

console.log('\n############################################################################');
console.log('# D. THE TRANSFER — Kalmynin-Konyagin §2 re-run at Omega_p = {a_p, a_p - 2}');
console.log('############################################################################\n');
console.log('K-K (Izv. Math. 88:2 (2024) 225-235 = arXiv:2302.00459v2, md5');
console.log('b5d7d2a23ffd902415057adebfe430b1, the artifact of record for');
console.log('`history/staging/lit-pdf-kalmynin-konyagin.md`) prove Theorem 1 by a three-step');
console.log('choice of x_p. Written in OUR frame the steps are choices of a_p:');
console.log('  band 1   p <= z0                a_p = 0     Omega_p = {0, -2}');
console.log('  band 2   z0 < p <= z1           a_p = 1     Omega_p = {1, -1}');
console.log('  band 3   z1 < p < y/2           a_p = 0     Omega_p = {0, -2}');
console.log('  step 3   y/2 <= p <= y          one surviving i each');
console.log('with z0 = (ln y)^A and z1 = exp(lll y ln y / (A ll y)).\n');

console.log('D1. THE THREE STRUCTURAL CLAIMS THE SUBSTITUTION NEEDS, CHECKED.');
let d1a = true, d1b = true, d1c = true, firstBad = null;
for (const p of PRIMES.filter(q => q >= 3 && q <= 100000)) {
  const OI = new Set([0, ((-2 % p) + p) % p]);            // the "linear factor" set
  const OIII = new Set([1 % p, ((-1 % p) + p) % p]);      // the band-2 set at a_p = 1
  if (p >= 3 && OI.size !== 2) d1a = false;
  if (p >= 5) {
    let disj = true; for (const t of OIII) if (OI.has(t)) disj = false;
    if (!disj) { d1b = false; if (firstBad === null) firstBad = p; }
    if (OI.size + OIII.size !== 4) d1c = false;
  }
}
console.log('    (i)   |Omega^I_p| = 2 for every odd p (K-K need p > p_0, unspecified):  ' + (d1a ? 'HOLDS' : 'FAILS'));
console.log('    (ii)  Omega^I_p disjoint from Omega^III_p at a_p = 1, every p >= 5:     ' + (d1b ? 'HOLDS' : 'FAILS at p=' + firstBad));
console.log('    (iii) so g(p) = |Omega_p| = 4 in band 2 and 2 elsewhere, p >= 5:        ' + (d1c ? 'HOLDS' : 'FAILS'));
console.log('    checked at every prime 3 <= p <= 100000.');
console.log('    K-K get (ii) from "any two fixed irreducible polynomials have no common');
console.log('    roots modulo large enough primes" and pay an unquantified p_0 for it. A');
console.log('    free translate pair buys the same disjointness by CHOICE, at p_0 = 5, and');
console.log('    buys (i) at p_0 = 3. Corollary 1 then applies at kappa = 4, where K-K need');
console.log('    kappa = 3*deg f = 6. Every one of these is easier in our frame, not harder.');

console.log('\nD2. THE CASE 1 SMOOTHNESS DICHOTOMY, CHECKED EXHAUSTIVELY.');
console.log('    K-K\'s Case 1 is the only step whose proof uses arithmetic rather than');
console.log('    bookkeeping. Substituted, it reads: if i <= m survives band 1 and band 3');
console.log('    (a_p = 0, i.e. p does not divide i(i+2)), then for k(i) in {i, i+2},');
console.log('    |k(i)| is either PRIME or z1-SMOOTH. K-K assert it "for large enough A".');
console.log('    Here is the exact finite-y threshold, found by direct enumeration.\n');

// smallest-prime-factor table, used for primality and smoothness
function spfTable(N) {
  const spf = new Int32Array(N + 3);
  for (let i = 2; i <= N + 2; i++) {
    if (spf[i] === 0) for (let j = i; j <= N + 2; j += i) if (spf[j] === 0) spf[j] = i;
  }
  return spf;
}
function largestPrimeFactor(n, spf) { let L = 1; while (n > 1) { const p = spf[n]; if (p > L) L = p; n /= p; } return L; }

const DY = 4001, DM = 300000, Z1FIX = 997;        // y, m, z1 for the dichotomy check
const spf = spfTable(DM + 4);
const primesY = PRIMES.filter(p => p <= DY);
const thresh = (DM + 2) / (PRIMES.filter(p => p >= DY / 2)[0]);
console.log('    y = ' + DY + ', m = ' + DM + ', z1 = ' + Z1FIX + ' fixed, z0 swept over primes.');
console.log('    THE PROOF\'S OWN THRESHOLD, made finite. A survivor k = k(i) has all its');
console.log('    prime factors in (z0, z1] u [y/2, oo). It cannot have two factors >= y/2');
console.log('    since (y/2)^2 = ' + Math.round((DY / 2) ** 2).toExponential(2) + ' > m. If it has one, P, the cofactor s = k/P');
console.log('    satisfies s <= (m+2)/P <= ' + thresh.toFixed(1) + ', and s > z0 unless s = 1. So');
console.log('        z0 >= ' + Math.floor(thresh) + '  ==>  k is prime or z1-smooth, with NO exceptions.');
console.log('    That inequality is the whole of K-K\'s "for large enough A" at finite y.\n');
console.log('      z0     survivors of bands 1+3    Case-1 violations   verdict');
console.log('    ------ ------------------------- ------------------- ---------');
for (const z0 of [7, 31, 97, 113, 127, 131, 137, 139, 149, 151, 157, 199, 251, 401]) {
  const mark = new Uint8Array(DM + 3);
  for (const p of primesY) {
    const inB13 = (p <= z0) || (p > Z1FIX && p < DY / 2);
    if (!inB13) continue;
    for (let j = p; j <= DM; j += p) mark[j] = 1;                 // i == 0 mod p
    const c = ((p - 2) % p + p) % p;
    for (let j = (c === 0 ? p : c); j <= DM; j += p) mark[j] = 1;  // i == -2 mod p
  }
  let surv = 0, viol = 0;
  for (let i = 1; i <= DM; i++) {
    if (mark[i]) continue;
    surv++;
    for (const k of [i, i + 2]) {
      const isPrime = spf[k] === k;
      const smooth = largestPrimeFactor(k, spf) <= Z1FIX;
      if (!isPrime && !smooth) viol++;
    }
  }
  console.log('    ' + String(z0).padStart(6) + ' ' + String(surv).padStart(25) + ' ' + String(viol).padStart(19) +
    '   ' + (viol === 0 ? 'CLEAN' : 'has exceptions'));
}
console.log('\n    Read: nothing in this step used that {0,-2} is the root set of a');
console.log('    polynomial. It used only that i and i+2 are two linear forms of size');
console.log('    << m whose small prime factors bands 1 and 3 have already excluded. The');
console.log('    threshold is an inequality in y and m, and the sweep straddles it.');
console.log('    The derived threshold is SUFFICIENT, not sharp: violations reach 0 at');
console.log('    z0 = 139, one prime step BELOW the derived z0 >= ' + Math.floor(thresh) + ', and 137 still has');
console.log('    5. So the proof\'s inequality is correct and conservative by one step,');
console.log('    which is the right direction for a step being imported.');

console.log('\nD3. THE FOUR-CLASS MIDDLE BAND IS THE WHOLE GAIN, AND IT SURVIVES.');
console.log('    The Mertens ledger of K-K p. 6, substituted:');
console.log('      sum_{p<=sqrt(y)} g(p)/p = 2 lnln y + 2(lnln z1 - lnln z0) + O(1),');
console.log('    the first term from Omega^I (all p) and the second from Omega^III (band 2');
console.log('    only). The +2 in band 2 is what turns a two-band Rankin into the extra');
console.log('    (ln z0/ln z1)^2, i.e. the extra (ln y)^2 (lll y)^2/(ll y)^4. Measured:\n');
console.log('       y      z0    z1    measured sum g(p)/p   ledger 2llny+2(llnz1-llnz0)   band-2 share');
console.log('    -------- ----- ----- --------------------- ----------------------------- -------------');
for (const [y, z0, z1] of [[1e4, 13, 97], [1e5, 17, 199], [1e6, 19, 401], [1e7, 23, 797], [1e8, 29, 1597]]) {
  const rt = Math.sqrt(y);
  let sum = 0, band2 = 0;
  for (const p of PRIMES) {
    if (p > rt) break;
    if (p < 5) continue;
    const g = (p > z0 && p <= z1) ? 4 : 2;
    sum += g / p;
    if (p > z0 && p <= z1) band2 += 2 / p;
  }
  const ledger = 2 * L2(y) + 2 * (L2(z1) - L2(z0));
  console.log('    ' + y.toExponential(0).padStart(8) + ' ' + String(z0).padStart(5) + ' ' + String(z1).padStart(5) +
    ' ' + sum.toFixed(4).padStart(21) + ' ' + ledger.toFixed(4).padStart(29) + ' ' + band2.toFixed(4).padStart(13));
}
console.log('\n    The two columns track (both are 2lnln + O(1); the O(1) is Mertens\' B and');
console.log('    the p<5 truncation). The band-2 share is the entire two-class gain and it');
console.log('    is present, at 4 classes per prime, exactly as K-K\'s ledger requires.');

console.log('\nD4. THE CONSTRUCTION RUN AT ACCESSIBLE y — what it certifies, and what it costs.');
console.log('    Every row below is a CERTIFIED lower bound on G2(y#) - 1: the explicit');
console.log('    (a_p) is replayed by a separate routine that recounts coverage of [1,m]');
console.log('    from scratch. `three-band` is K-K substituted; `two-band` is the same with');
console.log('    band 2 deleted (z1 = z0), which is `two-class-lower-bounds.md` §4d\'s');
console.log('    hybrid; `greedy` is §5d\'s ladder at the same y, for scale.\n');

// Marks [1,M] with the three-band assignment, then reports the largest m whose
// survivor count fits the step-3 prime supply K. One pass, no allocation.
function threeBand(y, z0, z1, M, K, mark, small) {
  mark.fill(0, 0, M + 1);
  for (const p of small) {
    const inB2 = (p > z0 && p <= z1);
    const c1 = inB2 ? 1 % p : 0;
    const c2 = inB2 ? (p - 1) % p : ((p - 2) % p + p) % p;
    for (let j = (c1 === 0 ? p : c1); j <= M; j += p) mark[j] = 1;
    for (let j = (c2 === 0 ? p : c2); j <= M; j += p) mark[j] = 1;
  }
  let s = 0, best = M, sat = true;
  for (let i = 1; i <= M; i++) {
    if (!mark[i]) { s++; if (s > K) { best = i - 1; sat = false; break; } }
  }
  return { m: best, saturated: sat };
}
// INDEPENDENT REPLAY. Rebuilds the full explicit (a_p) — bands AND step 3 —
// validates it (no prime twice, no prime outside p <= y, no class out of
// range), then re-marks [1,m] from scratch by a different code path and counts
// uncovered points. Nothing from threeBand() is reused except the assignment.
function replay(y, z0, z1, m) {
  const ps = PRIMES.filter(p => p <= y);
  const small = ps.filter(p => p < y / 2), big = ps.filter(p => p >= y / 2);
  const assign = new Map();
  for (const p of small) assign.set(p, (p > z0 && p <= z1) ? 1 % p : 0);
  // find the survivors of the bands, then hand one to each large prime
  const mk = new Uint8Array(m + 1);
  for (const [p, a] of assign) {
    const c2 = ((a - 2) % p + p) % p;
    for (const c of [a % p, c2]) for (let j = (c === 0 ? p : c); j <= m; j += p) mk[j] = 1;
  }
  const left = []; for (let i = 1; i <= m; i++) if (!mk[i]) left.push(i);
  if (left.length > big.length) return { ok: false, why: 'needs ' + left.length + ' step-3 primes, has ' + big.length };
  for (let k = 0; k < left.length; k++) {
    const p = big[k];
    if (assign.has(p)) return { ok: false, why: 'prime ' + p + ' reused' };
    assign.set(p, left[k] % p);
  }
  for (const [p, a] of assign) {
    if (!ps.includes(p)) return { ok: false, why: 'prime ' + p + ' outside p <= y' };
    if (!(a >= 0 && a < p)) return { ok: false, why: 'class out of range at p = ' + p };
  }
  const fresh = new Uint8Array(m + 1);
  for (const [p, a] of assign) {
    const c2 = ((a - 2) % p + p) % p;
    for (const c of [a % p, c2]) for (let j = (c === 0 ? p : c); j <= m; j += p) fresh[j] = 1;
  }
  let unc = 0; for (let i = 1; i <= m; i++) if (!fresh[i]) unc++;
  return { ok: unc === 0, uncovered: unc, primesUsed: assign.size };
}

const GREEDY = { 229: 7372, 421: 17280, 1009: 57245, 2003: 143942, 4001: 354729 };
const Z0CAND = PRIMES.filter(p => p <= 53);
const Z1CAND = [3, 5, 7, 11, 17, 23, 31, 47, 67, 97, 139, 199, 283, 401, 571];
console.log('       y    step3 primes     best (z0, z1)   three-band m   two-band m   greedy §5d   3band/greedy   replay');
console.log('    ------ -------------- ----------------- -------------- ------------ ------------ -------------- --------');
for (const y of [229, 421, 1009, 2003, 4001]) {
  const K = PRIMES.filter(p => p >= y / 2 && p <= y).length;
  const M = GREEDY[y];
  const small = PRIMES.filter(p => p < y / 2);
  const mark = new Uint8Array(M + 2);
  let best = { m: 0, z0: 0, z1: 0 }, best2 = { m: 0, z0: 0 };
  for (const z0 of Z0CAND) {
    const r0 = threeBand(y, z0, z0, M, K, mark, small);       // band 2 empty
    if (r0.m > best2.m) best2 = { m: r0.m, z0 };
    if (r0.m > best.m) best = { m: r0.m, z0, z1: z0 };
    for (const z1 of Z1CAND) {
      if (z1 <= z0 || z1 >= y / 2) continue;
      const r = threeBand(y, z0, z1, M, K, mark, small);
      if (r.m > best.m) best = { m: r.m, z0, z1 };
    }
  }
  const rp = replay(y, best.z0, best.z1, best.m);
  console.log('    ' + String(y).padStart(6) + ' ' + String(K).padStart(14) +
    ' ' + ('(' + best.z0 + ', ' + best.z1 + ')').padStart(17) +
    ' ' + String(best.m).padStart(14) + ' ' + String(best2.m).padStart(12) +
    ' ' + String(GREEDY[y]).padStart(12) + ' ' + (best.m / GREEDY[y]).toFixed(4).padStart(14) +
    '   ' + (rp.ok ? 'OK' : 'FAILED: ' + (rp.why || rp.uncovered)));
}
console.log('\n    Reading. The transferred construction certifies, and it loses to the');
console.log('    greedy at every accessible y by the factor in the last-but-one column.');
console.log('    That is the expected shape of an ASYMPTOTIC construction: K-K need A and');
console.log('    B "large", and at y = 4001 the band boundaries the asymptotics ask for');
console.log('    (z0 = (ln y)^A with A > 6 is ' + Math.pow(L1(4001), 6).toExponential(2) + ', already past y) do not exist.');
console.log('    So D4 is evidence that the substituted construction WORKS, not evidence');
console.log('    about its exponent. The exponent lives in D3\'s ledger, and D3 is where');
console.log('    the transfer is either true or false.');

console.log('\n############################################################################');
console.log('# E. THE CROSS-ATTACK RECONCILIATION — the transferred bound against the');
console.log('#    MEASURED growth law of `history/staging/attack-growth-law.md` (attack E)');
console.log('############################################################################\n');
console.log('Attack E measured G2(x#) ~ 0.762 x ln^2 x lnln x over x = 11..79 and excluded');
console.log('the pure power law by 10.6 AICc units. Section B here reports the K-K transfer');
console.log('would give G2(x#) >> x ln^3 x (lll x)^2/(ll x)^4. Are they compatible?\n');

console.log('E1. THEY ARE NOT THE SAME KIND OF STATEMENT, AND THE FIRST TEST IS THE ONLY');
console.log('    ONE THAT IS APPLES TO APPLES: the x-exponent.');
console.log('      attack E: every one of the six surviving families has x-exponent -> 1.');
console.log('      the transferred bound: x-exponent is exactly 1.');
console.log('    So on the ONE thing attack E actually resolved, the two AGREE. The 10.6');
console.log('    AICc units exclude c x^a at a = 1.818; they say nothing about the');
console.log('    exponent of ln, which is where the whole tension lives.\n');

console.log('E2. THE ln-EXPONENT, PUT ON THE c2\' INSTRUMENT. Each candidate law is divided');
console.log('    by the SAME exact m lnD used in B2, and the trend of the quotient in ln x');
console.log('    is fitted the same way. The data\'s own trend is the target.\n');
const ELAWS = [
  ['MP2   c x ln^2 x           (two-class-lower-bounds 6)', x => x * L1(x) ** 2],
  ['MP2LL c x ln^2 x lnln x    (attack E winner)', x => x * L1(x) ** 2 * L2(x)],
  ['MP3   c x ln^3 x', x => x * L1(x) ** 3],
  ['KK    x ln^3 x lll^2/ll^4  (the transferred bound)', x => x * L1(x) ** 3 * L3(x) ** 2 / L2(x) ** 4],
];
const eIdx = []; XS.forEach((x, i) => { if (x >= 11) eIdx.push(i); });
function eFit(f) {
  const lx = [], ly = [], v = [];
  for (const i of eIdx) {
    const x = XS[i], fr = frame(x);
    const q = (f ? f(x) : G2[i]) / (fr.m * fr.lnD);
    if (!Number.isFinite(q) || q <= 0) continue;
    lx.push(ln(L1(x))); ly.push(ln(q)); v.push(q);
  }
  return { r: ols(lx, ly), s: stats(v) };
}
const eData = eFit(null);
console.log('  law                                                      trend exp     se      cv');
console.log('  ------------------------------------------------------ ---------- ------- -------');
const eRows = [];
for (const [name, f] of ELAWS) {
  const e = eFit(f);
  eRows.push([name, e]);
  console.log('  ' + name.padEnd(54) + ' ' + e.r.a.toFixed(4).padStart(10) + ' ' +
    e.r.se.toFixed(4).padStart(7) + ' ' + (100 * e.s.cv).toFixed(1).padStart(6) + '%');
}
console.log('  ' + 'G2    the exact data itself'.padEnd(54) + ' ' + eData.r.a.toFixed(4).padStart(10) + ' ' +
  eData.r.se.toFixed(4).padStart(7) + ' ' + (100 * eData.s.cv).toFixed(1).padStart(6) + '%');
console.log('\n  distance from the data\'s own trend, in units of the data\'s se (' +
  eData.r.se.toFixed(4) + '):');
for (const [name, e] of eRows) {
  const d = (e.r.a - eData.r.a) / eData.r.se;
  console.log('    ' + name.slice(0, 5).padEnd(6) + (e.r.a - eData.r.a).toFixed(4).padStart(9) +
    '   ' + Math.abs(d).toFixed(1).padStart(5) + ' se   ' +
    (Math.abs(d) < 2 ? 'CONSISTENT' : Math.abs(d) < 4 ? 'strained' : 'EXCLUDED by this instrument'));
}
console.log('\n    Read: the diagonal instrument, built on exact G2 and exact m lnD and on');
console.log('    nothing fitted, puts attack E\'s x ln^2 x lnln x closest to the data and');
console.log('    EXCLUDES two-class-lower-bounds.md 6\'s c x ln^2 x. x ln^3 x is strained');
console.log('    but alive. The full KK shape is off the scale for the reason B3 gives:');
console.log('    (lll x)^2/(ll x)^4 is not slowly varying on this range, so the instrument');
console.log('    is reading the correction and not the shape.\n');

console.log('E3. WHERE THE TWO STATEMENTS ACTUALLY CROSS. Divide the transferred bound by');
console.log('    attack E\'s law, shapes only, constants set to 1:');
console.log('        R(x) = KK / MP2LL = ln x (lll x)^2 / (ll x)^5.');
console.log('    R -> infinity, so the transferred bound does eventually exceed any fixed');
console.log('    multiple of the measured law. The question is only WHERE.\n');
console.log('       ln x            R(x)        note');
console.log('    ---------- --------------- ------------------------------------');
for (const L of [L1(79), 10, 1e2, 1e3, 1e4, 2e4, 1e6]) {
  const a = ln(L), b = ln(a);
  const R = L * b * b / a ** 5;
  const note = L === L1(79) ? 'top of the exact ladder, x = 79' : '';
  console.log('    ' + L.toExponential(3).padStart(10) + ' ' + R.toExponential(4).padStart(15) + '   ' + note);
}
function solveR(t) { let lo = 20, hi = 1e18; for (let k = 0; k < 400; k++) { const mid = Math.sqrt(lo * hi); const a = ln(mid); (mid * ln(a) ** 2 / a ** 5 < t) ? lo = mid : hi = mid; } return lo; }
console.log('\n    crossing points, solved:');
for (const [t, why] of [[1, 'both constants 1'], [0.762, 'attack E constant 0.762, KK constant 1'],
[0.762 * 325565, 'KK constant of FKMPT C(1/2) order, 1/325565']]) {
  const L = solveR(t);
  console.log('      R = ' + t.toExponential(3).padStart(9) + '  at ln x = ' + L.toExponential(4) +
    '  i.e. x = 10^' + (L / ln(10)).toExponential(4) + '   (' + why + ')');
}
console.log('\n    VERDICT. The finite range cannot decide, and it is not close: with both');
console.log('    constants set to 1 the two statements do not cross until x = 10^7327, and');
console.log('    the exact ladder stops at 79. Neither result refutes the other, and no');
console.log('    computation ever will. What DOES decide it is that they are different');
console.log('    kinds of statement: attack E measures the object over 18 exact terms and');
console.log('    labels the result MEASURED over x = 11..79; the transferred bound is a');
console.log('    lower bound with an unspecified constant. Attack E section 7 already says');
console.log('    its winner and c x ln^3 x are "not separable in principle on this range"');
console.log('    because ln x/lnln x moves only 2.74 -> 2.96 across the whole ladder. So');
console.log('    the measured law is NOT a claim about the limit, its own producer says');
console.log('    so, and the tension dissolves. The one thing that would decide the');
console.log('    ln-exponent is finishing the K-K substitution on paper at D3.');

console.log('\n############################################################################');
console.log('# SUMMARY OF THE FIVE MEASUREMENTS');
console.log('############################################################################');
console.log('A. free bound deficit  G2/g = ' + Math.exp(rr.b).toFixed(3) + ' (ln x)^' + rr.a.toFixed(3) +
  ', reading ' + ratio[21].toFixed(2) + ' at x = 79 (top 14: (ln x)^' + rrTop.a.toFixed(3) + '); a log, not a power');
console.log('B. c2\' over all 20 diagonal terms: ' + cAll.mean.toFixed(4) + ' +/- ' + cAll.sd.toFixed(4) +
  ' (cv ' + (100 * cAll.cv).toFixed(1) + '%), trend (ln x)^' + cTrend.a.toFixed(3));
console.log('C. exact terms that would separate ln^2 from ln^3: x ~ ' + need(1).toExponential(2) + ' (unreachable)');
console.log('D. the K-K substitution: D1 all HOLD, D2 clean at and above z0 = 139 (the');
console.log('   derived sufficient threshold ' + Math.floor(thresh) + ' is conservative by one prime step),');
console.log('   D3 ledger tracks, D4 certifies at five levels with independent replay');
console.log('E. the transferred bound and attack E\'s MEASURED law do not cross until');
console.log('   x = 10^7327 with both constants 1: the range cannot decide, and the');
console.log('   c2\' instrument prefers attack E\'s law and EXCLUDES 6\'s c x ln^2 x');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-lower-bound.js
//   invocation:  node research/attack-lower-bound.js
//   code-sha256: 8b9802c4700a88279542d9dfbf7128a2e058dffca0e840a49fd0353fa95f7c49
//   out-sha256:  abf257acddc858614c0d0953e704e0dd3944d9dcd76ec9393313bc49813885aa
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.5 s
// ============================================================================
// ############################################################################
// # A. THE GAP, PRICED — the free lower bound against the truth, 22 levels
// ############################################################################
//
// The free bound has two forms and they behave completely differently.
// POINTWISE:  G2(x#) >= g(x#), both sides exact, so the ratio IS the deficit.
// ASYMPTOTIC: g(x#) >> x ln x lll x / ll x, constant unspecified.
//
//  x    G2      g=A048670   G2/g    (G2/g)/lnx   F(x)=x lnx lllx/llx   g/F     G2/F
// ---- ------- ----------- ------- ------------ --------------------- ------- -------
//    2       2           2   1.000       1.4427                   NaN    DEAD    DEAD
//    3       6           4   1.500       1.3654                -82.84    DEAD    DEAD
//    5      12           6   2.000       1.2427                -12.56    DEAD    DEAD
//    7      30          10   3.000       1.5417                 -8.32    DEAD    DEAD
//   11      42          14   3.000       1.2511                 -4.04    DEAD    DEAD
//   13      66          22   3.000       1.1696                 -2.12    DEAD    DEAD
//   17     108          26   4.154       1.4661                  1.88   13.85   57.55
//   19     150          34   4.412       1.4983                  3.98    8.54   37.66
//   23     204          40   5.100       1.6265                  8.42    4.75   24.22
//   29     258          46   5.609       1.6656                 15.60    2.95   16.53
//   31     348          58   6.000       1.7472                 18.12    3.20   19.20
//   37     528          66   8.000       2.2155                 26.01    2.54   20.30
//   41     546          74   7.378       1.9869                 31.51    2.35   17.33
//   43     618          90   6.867       1.8257                 34.33    2.62   18.00
//   47     708         100   7.080       1.8389                 40.10    2.49   17.66
//   53     870         106   8.208       2.0672                 49.02    2.16   17.75
//   59     966         118   8.186       2.0077                 58.26    2.03   16.58
//   61    1080         132   8.182       1.9903                 61.41    2.15   17.59
//   67    1284         152   8.447       2.0090                 71.01    2.14   18.08
//   71    1398         174   8.034       1.8848                 77.55    2.24   18.03
//   73    1530         190   8.053       1.8769                 80.85    2.35   18.92
//   79    1710         200   8.550       1.9568                 90.92    2.20   18.81
//
// Why the F columns read DEAD below x = 17: lll x = ln ln ln x is NEGATIVE for
// x < e^e = 15.154, so the asymptotic form is a negative number at 8 of the 22
// levels, and it does not reach lll x = 1 until x = e^(e^e) = 3.814e+6.
// lll x over the whole exact range: 0.0406 at x = 17 to 0.3884 at x = 79.
// So the free bound CANNOT be measured in its own coordinates on any data that
// exists. The measurable object is the pointwise form, and that is exact.
//
// THE DEFICIT, FITTED. log(G2/g) against log(ln x):
//   all 22 terms        exponent of ln x = 1.2677   (prefactor 1.2636)
//   top 14, x >= 23     exponent of ln x = 1.4784   (prefactor 0.9972)
//   (G2/g)/ln x over x >= 17: mean 1.8540, sd 0.2080, cv 11.2%, range [1.466, 2.216]
//
// The asymptotic form F has no stable constant on this range either:
//   g/F runs 13.85 at x = 17 down to 2.20 at x = 79, a factor of 6.3.
//   So F is not a usable yardstick at any accessible x, in either dimension.
//
// ############################################################################
// # B. THE SHAPE TEST — is the exact data consistent with y (ln y)^3 ... ?
// ############################################################################
//
// B1. THE THREE CANDIDATE SHAPES, as ratios G2/shape. A shape that is right on
//     this range shows a FLAT column; the flattest column wins, and the point of
//     the exercise is how little that proves.
//
//  x     G2     G2/(x lnx)  G2/(x ln^2x)  G2/(x ln^3x)   KK = y ln^3y lll^2/ll^4   G2/KK
// ---- ------- ----------- ------------- ------------- ------------------------- --------
//    2       2      1.4427        2.0814        3.0028         DEAD (lll y <= 0)     DEAD
//    3       6      1.8205        1.6571        1.5083         DEAD (lll y <= 0)     DEAD
//    5      12      1.4912        0.9265        0.5757         DEAD (lll y <= 0)     DEAD
//    7      30      2.2024        1.1318        0.5816         DEAD (lll y <= 0)     DEAD
//   11      42      1.5923        0.6640        0.2769         DEAD (lll y <= 0)     DEAD
//   13      66      1.9793        0.7717        0.3009         DEAD (lll y <= 0)     DEAD
//   17     108      2.2423        0.7914        0.2793                     0.541   199.56
//   19     150      2.6812        0.9106        0.3093                     2.108    71.16
//   23     204      2.8288        0.9022        0.2877                     7.405    27.55
//   29     258      2.6420        0.7846        0.2330                    19.181    13.45
//   31     348      3.2690        0.9520        0.2772                    23.904    14.56
//   37     528      3.9520        1.0945        0.3031                    40.046    13.18
//   41     546      3.5861        0.9657        0.2600                    52.255    10.45
//   43     618      3.8211        1.0159        0.2701                    58.749    10.52
//   47     708      3.9125        1.0162        0.2639                    72.462     9.77
//   53     870      4.1345        1.0414        0.2623                    94.701     9.19
//   59     966      4.0154        0.9848        0.2415                   118.763     8.13
//   61    1080      4.3069        1.0477        0.2549                   127.159     8.49
//   67    1284      4.5578        1.0840        0.2578                   153.404     8.37
//   71    1398      4.6192        1.0836        0.2542                   171.735     8.14
//   73    1530      4.8850        1.1386        0.2654                   181.138     8.45
//   79    1710      4.9538        1.1337        0.2595                   210.257     8.13
//
//     over x = 11..79 (18 terms):        mean      sd       cv      max/min
//     G2/(x lnx)                3.5544   1.0174   28.6%    3.111
//     G2/(x ln^2x)              0.9657   0.1371   14.2%    1.715
//     G2/(x ln^3x)              0.2698   0.0206    7.6%    1.327
//
// B2. THE POISSON DIAGONAL, EXTENDED FROM x = 41 TO x = 79.
//     `two-class-lower-bounds.md` §6a fits c2' = G2/(m lnD) on nine levels to
//     x = 41. Here are all 22, with exact m = x#/D and exact lnD.
//
//  x      m       lnD      m*lnD       G2      c2' = G2/(m lnD)
// ---- -------- --------- ---------- -------- ------------------
//    2      (D = 1, no diagonal)
//    3      (D = 1, no diagonal)
//    5    10.00     1.099       11.0       12             1.0923
//    7    14.00     2.708       37.9       30             0.7913
//   11    17.11     4.905       83.9       42             0.5004
//   13    20.22     7.303      147.7       66             0.4469
//   17    22.92    10.011      229.4      108             0.4707
//   19    25.61    12.844      329.0      150             0.4559
//   23    28.05    15.889      445.8      204             0.4577
//   29    30.13    19.185      578.1      258             0.4463
//   31    32.21    22.552      726.4      348             0.4791
//   37    34.05    26.107      889.0      528             0.5939
//   41    35.80    29.771     1065.7      546             0.5123
//   43    37.54    33.485     1257.1      618             0.4916
//   47    39.21    37.291     1462.3      708             0.4842
//   53    40.75    41.223     1679.8      870             0.5179
//   59    42.18    45.266     1909.3      966             0.5059
//   61    43.61    49.344     2151.9     1080             0.5019
//   67    44.95    53.518     2405.7     1284             0.5337
//   71    46.25    57.752     2671.3     1398             0.5233
//   73    47.56    62.015     2949.3     1530             0.5188
//   79    48.79    66.359     3237.8     1710             0.5281
//
//     x = 11..41 (the 9 terms §6a fitted): mean 0.4848, cv 9.7%, range [0.4463, 0.5939]
//     x = 47..79 (the 8 NEW terms):        mean 0.5142, cv 3.1%, range [0.4842, 0.5337]
//     x = 11..79 (all 20):                 mean 0.4983, cv 7.4%, range [0.4463, 0.5939]
//     trend: c2' ~ (ln x)^0.2273. The KK template needs +1 here; the
//     measured law needs 0.
//
// B3. WHY THE TEST CANNOT DECIDE, MEASURED RATHER THAN ASSERTED.
//     The KK shape's slowly-varying part is (lll y)^2/(ll y)^4. Over the exact
//     range it moves from 1.400e-3 to 3.190e-2, a factor of 22.8.
//     Over the same range G2 moves by a factor of 15.8.
//     A "slowly varying" factor that moves 1.4 times FASTER than the object it corrects
//     is not slowly varying on this range, so G2/KK is a measurement of the
//     correction, not of the shape. G2/KK falls 199.6 -> 8.1 and that fall is 23/16 by construction.
//     Meanwhile one factor of ln x is worth only 1.822 across x = 11..79, against a
//     c2' scatter of cv 7.4% and a range ratio of 1.33.
//
// ############################################################################
// # C. HOW MUCH RANGE WOULD SETTLE IT
// ############################################################################
//
// To separate `x ln^2 x` from `x ln^3 x` on this instrument the extra factor
// ln x has to beat the scatter the instrument already has. The 20-term c2'
// spread is a factor 1.331 (max/min), so one needs ln x to grow by that
// factor to see the effect at all, and by its square, cube, ... to see it k-sigma:
//   factor of ln x needed   1x (top of the exact ladder)   x = 79
//   1.33^1 =   1.33                                  x = 3.352e+2
//   1.33^2 =   1.77                                  x = 2.295e+3
//   1.33^3 =   2.36                                  x = 2.968e+4
//   1.33^4 =   3.14                                  x = 8.950e+5
//
// A144311 cost 2.8e10 years of exhaustive enumeration at x = 79 already
// (`exact-g2-ladder.js`, `sift-limit-attack.md` §7). One more doubling of ln x
// means exact terms at x ~ 3.35e+2. So the shape question is not decidable
// from exact terms, now or ever, and the certificate ladder to x = 5003
// (`two-class-lower-bounds.md` §5d) buys ln x by only a factor 1.95 over this.
//
// ############################################################################
// # D. THE TRANSFER — Kalmynin-Konyagin §2 re-run at Omega_p = {a_p, a_p - 2}
// ############################################################################
//
// K-K (Izv. Math. 88:2 (2024) 225-235 = arXiv:2302.00459v2, md5
// b5d7d2a23ffd902415057adebfe430b1, the artifact of record for
// `history/staging/lit-pdf-kalmynin-konyagin.md`) prove Theorem 1 by a three-step
// choice of x_p. Written in OUR frame the steps are choices of a_p:
//   band 1   p <= z0                a_p = 0     Omega_p = {0, -2}
//   band 2   z0 < p <= z1           a_p = 1     Omega_p = {1, -1}
//   band 3   z1 < p < y/2           a_p = 0     Omega_p = {0, -2}
//   step 3   y/2 <= p <= y          one surviving i each
// with z0 = (ln y)^A and z1 = exp(lll y ln y / (A ll y)).
//
// D1. THE THREE STRUCTURAL CLAIMS THE SUBSTITUTION NEEDS, CHECKED.
//     (i)   |Omega^I_p| = 2 for every odd p (K-K need p > p_0, unspecified):  HOLDS
//     (ii)  Omega^I_p disjoint from Omega^III_p at a_p = 1, every p >= 5:     HOLDS
//     (iii) so g(p) = |Omega_p| = 4 in band 2 and 2 elsewhere, p >= 5:        HOLDS
//     checked at every prime 3 <= p <= 100000.
//     K-K get (ii) from "any two fixed irreducible polynomials have no common
//     roots modulo large enough primes" and pay an unquantified p_0 for it. A
//     free translate pair buys the same disjointness by CHOICE, at p_0 = 5, and
//     buys (i) at p_0 = 3. Corollary 1 then applies at kappa = 4, where K-K need
//     kappa = 3*deg f = 6. Every one of these is easier in our frame, not harder.
//
// D2. THE CASE 1 SMOOTHNESS DICHOTOMY, CHECKED EXHAUSTIVELY.
//     K-K's Case 1 is the only step whose proof uses arithmetic rather than
//     bookkeeping. Substituted, it reads: if i <= m survives band 1 and band 3
//     (a_p = 0, i.e. p does not divide i(i+2)), then for k(i) in {i, i+2},
//     |k(i)| is either PRIME or z1-SMOOTH. K-K assert it "for large enough A".
//     Here is the exact finite-y threshold, found by direct enumeration.
//
//     y = 4001, m = 300000, z1 = 997 fixed, z0 swept over primes.
//     THE PROOF'S OWN THRESHOLD, made finite. A survivor k = k(i) has all its
//     prime factors in (z0, z1] u [y/2, oo). It cannot have two factors >= y/2
//     since (y/2)^2 = 4.00e+6 > m. If it has one, P, the cofactor s = k/P
//     satisfies s <= (m+2)/P <= 149.8, and s > z0 unless s = 1. So
//         z0 >= 149  ==>  k is prime or z1-smooth, with NO exceptions.
//     That inequality is the whole of K-K's "for large enough A" at finite y.
//
//       z0     survivors of bands 1+3    Case-1 violations   verdict
//     ------ ------------------------- ------------------- ---------
//          7                     17587                9779   has exceptions
//         31                      7460                2125   has exceptions
//         97                      4819                 164   has exceptions
//        113                      4475                  25   has exceptions
//        127                      4422                  15   has exceptions
//        131                      4372                   7   has exceptions
//        137                      4328                   5   has exceptions
//        139                      4287                   0   CLEAN
//        149                      4246                   0   CLEAN
//        151                      4206                   0   CLEAN
//        157                      4162                   0   CLEAN
//        199                      3841                   0   CLEAN
//        251                      3589                   0   CLEAN
//        401                      3073                   0   CLEAN
//
//     Read: nothing in this step used that {0,-2} is the root set of a
//     polynomial. It used only that i and i+2 are two linear forms of size
//     << m whose small prime factors bands 1 and 3 have already excluded. The
//     threshold is an inequality in y and m, and the sweep straddles it.
//     The derived threshold is SUFFICIENT, not sharp: violations reach 0 at
//     z0 = 139, one prime step BELOW the derived z0 >= 149, and 137 still has
//     5. So the proof's inequality is correct and conservative by one step,
//     which is the right direction for a step being imported.
//
// D3. THE FOUR-CLASS MIDDLE BAND IS THE WHOLE GAIN, AND IT SURVIVES.
//     The Mertens ledger of K-K p. 6, substituted:
//       sum_{p<=sqrt(y)} g(p)/p = 2 lnln y + 2(lnln z1 - lnln z0) + O(1),
//     the first term from Omega^I (all p) and the second from Omega^III (band 2
//     only). The +2 in band 2 is what turns a two-band Rankin into the extra
//     (ln z0/ln z1)^2, i.e. the extra (ln y)^2 (lll y)^2/(ll y)^4. Measured:
//
//        y      z0    z1    measured sum g(p)/p   ledger 2llny+2(llnz1-llnz0)   band-2 share
//     -------- ----- ----- --------------------- ----------------------------- -------------
//         1e+4    13    97                2.8566                        5.5979        0.9176
//         1e+5    17   199                3.4708                        6.1370        1.0924
//         1e+6    19   401                3.9411                        6.6733        1.2116
//         1e+7    23   797                4.3653                        7.0728        1.3334
//         1e+8    29  1597                4.7593                        7.3952        1.4598
//
//     The two columns track (both are 2lnln + O(1); the O(1) is Mertens' B and
//     the p<5 truncation). The band-2 share is the entire two-class gain and it
//     is present, at 4 classes per prime, exactly as K-K's ledger requires.
//
// D4. THE CONSTRUCTION RUN AT ACCESSIBLE y — what it certifies, and what it costs.
//     Every row below is a CERTIFIED lower bound on G2(y#) - 1: the explicit
//     (a_p) is replayed by a separate routine that recounts coverage of [1,m]
//     from scratch. `three-band` is K-K substituted; `two-band` is the same with
//     band 2 deleted (z1 = z0), which is `two-class-lower-bounds.md` §4d's
//     hybrid; `greedy` is §5d's ladder at the same y, for scale.
//
//        y    step3 primes     best (z0, z1)   three-band m   two-band m   greedy §5d   3band/greedy   replay
//     ------ -------------- ----------------- -------------- ------------ ------------ -------------- --------
//        229             20           (5, 97)           1726          808         7372         0.2341   OK
//        421             36          (5, 199)           4336         1618        17280         0.2509   OK
//       1009             73          (5, 401)          12316         3670        57245         0.2151   OK
//       2003            136           (2, 23)          24404         7588       143942         0.1695   OK
//       4001            248           (2, 67)          53696        17788       354729         0.1514   OK
//
//     Reading. The transferred construction certifies, and it loses to the
//     greedy at every accessible y by the factor in the last-but-one column.
//     That is the expected shape of an ASYMPTOTIC construction: K-K need A and
//     B "large", and at y = 4001 the band boundaries the asymptotics ask for
//     (z0 = (ln y)^A with A > 6 is 3.26e+5, already past y) do not exist.
//     So D4 is evidence that the substituted construction WORKS, not evidence
//     about its exponent. The exponent lives in D3's ledger, and D3 is where
//     the transfer is either true or false.
//
// ############################################################################
// # E. THE CROSS-ATTACK RECONCILIATION — the transferred bound against the
// #    MEASURED growth law of `history/staging/attack-growth-law.md` (attack E)
// ############################################################################
//
// Attack E measured G2(x#) ~ 0.762 x ln^2 x lnln x over x = 11..79 and excluded
// the pure power law by 10.6 AICc units. Section B here reports the K-K transfer
// would give G2(x#) >> x ln^3 x (lll x)^2/(ll x)^4. Are they compatible?
//
// E1. THEY ARE NOT THE SAME KIND OF STATEMENT, AND THE FIRST TEST IS THE ONLY
//     ONE THAT IS APPLES TO APPLES: the x-exponent.
//       attack E: every one of the six surviving families has x-exponent -> 1.
//       the transferred bound: x-exponent is exactly 1.
//     So on the ONE thing attack E actually resolved, the two AGREE. The 10.6
//     AICc units exclude c x^a at a = 1.818; they say nothing about the
//     exponent of ln, which is where the whole tension lives.
//
// E2. THE ln-EXPONENT, PUT ON THE c2' INSTRUMENT. Each candidate law is divided
//     by the SAME exact m lnD used in B2, and the trend of the quotient in ln x
//     is fitted the same way. The data's own trend is the target.
//
//   law                                                      trend exp     se      cv
//   ------------------------------------------------------ ---------- ------- -------
//   MP2   c x ln^2 x           (two-class-lower-bounds 6)     -0.5308  0.0932   13.2%
//   MP2LL c x ln^2 x lnln x    (attack E winner)               0.3181  0.0873    8.3%
//   MP3   c x ln^3 x                                           0.4692  0.0932   10.5%
//   KK    x ln^3 x lll^2/ll^4  (the transferred bound)         3.6755  0.9629   50.2%
//   G2    the exact data itself                                0.2273  0.0816    7.4%
//
//   distance from the data's own trend, in units of the data's se (0.0816):
//     MP2     -0.7581     9.3 se   EXCLUDED by this instrument
//     MP2LL    0.0908     1.1 se   CONSISTENT
//     MP3      0.2419     3.0 se   strained
//     KK       3.4483    42.3 se   EXCLUDED by this instrument
//
//     Read: the diagonal instrument, built on exact G2 and exact m lnD and on
//     nothing fitted, puts attack E's x ln^2 x lnln x closest to the data and
//     EXCLUDES two-class-lower-bounds.md 6's c x ln^2 x. x ln^3 x is strained
//     but alive. The full KK shape is off the scale for the reason B3 gives:
//     (lll x)^2/(ll x)^4 is not slowly varying on this range, so the instrument
//     is reading the correction and not the shape.
//
// E3. WHERE THE TWO STATEMENTS ACTUALLY CROSS. Divide the transferred bound by
//     attack E's law, shapes only, constants set to 1:
//         R(x) = KK / MP2LL = ln x (lll x)^2 / (ll x)^5.
//     R -> infinity, so the transferred bound does eventually exceed any fixed
//     multiple of the measured law. The question is only WHERE.
//
//        ln x            R(x)        note
//     ---------- --------------- ------------------------------------
//       4.369e+0       9.4534e-2   top of the exact ladder, x = 79
//       1.000e+1       1.0747e-1
//       1.000e+2       1.1260e-1
//       1.000e+3       2.3748e-1
//       1.000e+4       7.4380e-1
//       2.000e+4       1.1037e+0
//       1.000e+6       1.3699e+1
//
//     crossing points, solved:
//       R =  1.000e+0  at ln x = 1.6871e+4  i.e. x = 10^7.3268e+3   (both constants 1)
//       R =  7.620e-1  at ln x = 1.0445e+4  i.e. x = 10^4.5360e+3   (attack E constant 0.762, KK constant 1)
//       R =  2.481e+5  at ln x = 2.9790e+11  i.e. x = 10^1.2938e+11   (KK constant of FKMPT C(1/2) order, 1/325565)
//
//     VERDICT. The finite range cannot decide, and it is not close: with both
//     constants set to 1 the two statements do not cross until x = 10^7327, and
//     the exact ladder stops at 79. Neither result refutes the other, and no
//     computation ever will. What DOES decide it is that they are different
//     kinds of statement: attack E measures the object over 18 exact terms and
//     labels the result MEASURED over x = 11..79; the transferred bound is a
//     lower bound with an unspecified constant. Attack E section 7 already says
//     its winner and c x ln^3 x are "not separable in principle on this range"
//     because ln x/lnln x moves only 2.74 -> 2.96 across the whole ladder. So
//     the measured law is NOT a claim about the limit, its own producer says
//     so, and the tension dissolves. The one thing that would decide the
//     ln-exponent is finishing the K-K substitution on paper at D3.
//
// ############################################################################
// # SUMMARY OF THE FIVE MEASUREMENTS
// ############################################################################
// A. free bound deficit  G2/g = 1.264 (ln x)^1.268, reading 8.55 at x = 79 (top 14: (ln x)^1.478); a log, not a power
// B. c2' over all 20 diagonal terms: 0.4983 +/- 0.0369 (cv 7.4%), trend (ln x)^0.227
// C. exact terms that would separate ln^2 from ln^3: x ~ 3.35e+2 (unreachable)
// D. the K-K substitution: D1 all HOLD, D2 clean at and above z0 = 139 (the
//    derived sufficient threshold 149 is conservative by one prime step),
//    D3 ledger tracks, D4 certifies at five levels with independent replay
// E. the transferred bound and attack E's MEASURED law do not cross until
//    x = 10^7327 with both constants 1: the range cannot decide, and the
//    c2' instrument prefers attack E's law and EXCLUDES 6's c x ln^2 x
// ============================================================================
// READINGS  (rewritten 2026-08-18 from the actual run; the first version of
// this block was written before the script had ever been executed and ten of
// its figures were wrong. Every MEASUREMENT below is in the OUTPUT block
// above. Twenty tokens are not there literally, and the FIGURE PROVENANCE
// block at the foot of this file names each one: they are roundings of printed
// values, `e+6` written as `e6`, and catalogue identifiers -- OEIS, OpenAlex,
// DOI and arXiv -- that a figure scanner reads as numbers. Sentence corrected
// 2026-08-20, mismatch adjudication #29: it used to read "Every number below
// is in the OUTPUT block above", which is false as an absolute.)
// ============================================================================
// 1. THE FREE BOUND IS SHORT BY MORE THAN ONE LOG, AND THE DEFICIT IS STILL
//    RISING. G2(x#)/g(x#) climbs 1.00 -> 8.55 over x = 2..79. Fitted against
//    ln x it is (ln x)^1.268 on all 22 terms and (ln x)^1.478 on the top
//    fourteen (x >= 23). Normalised, (G2/g)/ln x sits at 1.854 +/- 0.208
//    (cv 11.2%) over x >= 17, range [1.466, 2.216]. So the two-class part of
//    the free bound's deficit is a single logarithmic factor of about 1.9 ln x
//    on this range; it is NOT a power of x, and there is no room in the data
//    for one. The exponent RISING from 1.27 to 1.48 as the window is trimmed
//    to the top is the one detail worth carrying forward: nothing here says
//    the deficit settles at exactly one log.
//    Consequence: the lower side's remaining distance to the truth is (i) the
//    measured log-and-a-bit, which a two-class construction can in principle
//    recover, plus (ii) whatever separates g(x#) from x ln x lll x/ll x, which
//    is Erdos #687, a $1000 problem, and is not ours. Only (i) is a two-class
//    question.
//
// 2. THE FREE BOUND'S ASYMPTOTIC FORM CANNOT BE MEASURED AT ALL, AND THAT IS A
//    FACT ABOUT THE FORM, NOT ABOUT THE DATA. lll x < 0 for x < e^e = 15.154,
//    so x ln x lll x/ll x is NEGATIVE at eight of the twenty-two exact levels,
//    and lll x does not reach 1 until x = e^(e^e) = 3.814e6. Over the whole
//    exact range lll x runs 0.0406 to 0.3884. The implied constant g/F drifts
//    from 13.85 at x = 17 to 2.20 at x = 79, a factor of 6.3. Any statement of
//    the form "the free bound is a factor R below the truth", quoted with F in
//    it, is quoting the behaviour of lll x. The pointwise form G2 >= g is the
//    only version of the free bound that is measurable, and reading 1 is that
//    measurement.
//
// 3. THE POISSON DIAGONAL SURVIVES THE EIGHT NEW TERMS, THE NEW TERMS ARE
//    TIGHTER AND SIT HIGHER, AND THE TREND IS POSITIVE.
//    `two-class-lower-bounds.md` §6a fits c2' = G2/(m lnD) on nine terms to
//    x = 41 and gets 0.4848 at cv 9.7%, which this run reproduces exactly. On
//    the eight terms x = 47..79, which §6a never saw, c2' = 0.5142 at cv 3.1%,
//    and over all twenty diagonal terms 0.4983 +/- 0.0369 at cv 7.4%. The new
//    terms are three times TIGHTER than the old ones and sit slightly HIGHER,
//    which retires the worry that the diagonal was drifting down; the x = 37
//    reading of 0.5939 is now clearly an outlier and not a level shift.
//    The trend across all twenty is c2' ~ (ln x)^+0.227. The KK template needs
//    this exponent to be +1 asymptotically and §6's c x ln^2 x needs it to be
//    0. It is measured at +0.227 with se 0.082, which is 2.8 se above 0 and
//    9.5 se below 1. Neither target is comfortable; the measured value sits
//    between them and closest to attack E's x ln^2 x lnln x (section E2).
//
// 4. THE TEMPLATE'S SHAPE CANNOT BE TESTED ON THIS DATA, AND THE REASON IS
//    ARITHMETIC, NOT SAMPLE SIZE. The KK shape y(ln y)^3 (lll y)^2/(ll y)^4
//    has a "slowly varying" part (lll y)^2/(ll y)^4 that moves by a factor of
//    22.8 across x = 17..79 (1.400e-3 to 3.190e-2), while G2 itself moves by
//    15.8. A correction factor moving 1.4x FASTER than the object is not a
//    correction on this range, so G2/KK - which falls 199.6 -> 8.1 - is
//    measuring lll y and nothing else; that fall is 23/16 by construction.
//    Meanwhile one factor of ln x is worth 1.822 across x = 11..79 against a
//    c2' range ratio of 1.331. The data is therefore CONSISTENT with the
//    template and equally consistent with one log less. The crude
//    normalisations say the same thing badly: G2/(x ln^3 x) has cv 7.6% and
//    G2/(x ln^2 x) has cv 14.2% over x = 11..79, which naively favours the
//    template - and is an artifact of theta(x)/x < 1 at small x, which the
//    Poisson form absorbs and the crude form does not. Reading 3, which uses
//    exact m and exact lnD, is the one to quote.
//    VERDICT ON TASK 3: the 22 exact terms do NOT contradict
//    G2(P(y)) >> y (ln y)^3 (lll y)^2/(ll y)^4. Anyone hoping to kill it with
//    data should stop; it has to be killed or proved on paper.
//
// 5. AND NO FUTURE EXACT TERM WILL HELP. To make one factor of ln x exceed the
//    c2' spread of 1.331 requires exact terms at x ~ 3.35e2; two factors,
//    x ~ 2.30e3; three, x ~ 2.97e4; four, x ~ 8.95e5. A144311 cost 2.8e10
//    years of enumeration at x = 79 already, so the FIRST of those four rows
//    is already out of reach and the question is settled by arithmetic rather
//    than by budget. The certificate ladder to x = 5003 buys ln x by only
//    1.95x over the exact range, one spread-width, i.e. exactly at the edge of
//    readability - and it is a LOWER BOUND of unmeasured fidelity (§5c), so it
//    cannot carry the discrimination either, and a lower bound can never
//    establish a falling ratio (`research/qc/units.js` §4). The exponent of ln
//    in the two-class lower bound is not an empirical question.
//
// 6. THE K-K TRANSFER IS TRACTABLE, AND THE UNCHECKED STEP IS THE EASY HALF.
//    `covering-dive.md` §4.2 names the blocker: "K-K's Cases 1-3 (§2) are
//    stated in terms of the linear and non-linear irreducible factors of f ...
//    substituting an arbitrary 2-element set requires re-deriving that
//    trichotomy for Omega_p = {a_p, a_p-2}". Run:
//      Case 1  transfers with no change and uses NO property of f. Its content
//              is that i and i+2 are two linear forms of size << m whose prime
//              factors have been excluded from [2,z0] u (z1, y/2) by bands 1
//              and 3. D2 checks it exhaustively at y = 4001, m = 300000: the
//              proof's own inequality gives the sufficient threshold
//              z0 >= (m+2)/p_min = 149, and the violations actually reach 0 at
//              z0 = 139, with 137 still carrying 5. So the derived threshold
//              is CORRECT AND CONSERVATIVE BY ONE PRIME STEP - the right
//              direction for a step being imported, and the sweep straddles
//              the true transition rather than landing on it.
//      Case 2  is VACUOUS. h_f = 0 for the two-linear-factor system, so
//              Omega^II_p is empty, and with it Lemma 2, Chebotarev, and the
//              whole Galois apparatus of K-K §3 drop out of the argument.
//      Case 3  transfers and is STRICTLY STRONGER. K-K must invoke their
//              Definition of M(f) and Theorem 2 to know a fibre of size
//              M_p(f) exists, and control M_p only on logarithmic average. A
//              free translate pair has exactly 2 elements at every odd p, with
//              no average and no exceptional primes.
//      disjointness: K-K pay an unquantified p_0 to separate Omega^I from
//              Omega^III. We choose a_p = 1 in band 2 and get it at p_0 = 5.
//              D1 verifies this at every prime to 100000.
//      the sieve: Corollary 1 sees Omega_p only through |Omega_p|, verbatim
//              from their p. 4, and applies at kappa = 4 where they need
//              kappa = 3 deg f = 6. Same z = sqrt(y), same X = m, so the
//              transfer introduces NO new analytic requirement.
//    The Mertens ledger is then identical term by term - 2 lnln y from
//    Omega^I over all p, plus 2(lnln z1 - lnln z0) from Omega^III over band 2 -
//    which is D3, and D3 measures it directly at five values of y.
//    WHAT IS AND IS NOT PUBLISHED. K-K's Theorem 1 evaluated at ell_f = 2,
//    h_f = 0, M(f) = 2 is EXACTLY y(ln y)^3 (lll y)^2/(ll y)^4, and that is a
//    published theorem about j_{x(x+2)}(P(y)). Only the replacement of the
//    left-hand side by G2(P(y)) is INFERRED, because j_f shifts the VALUE
//    (fibres {-1 +/- sqrt(1-x_p)}, centre fixed at -1, separation varying) and
//    G2 shifts the ARGUMENT (pairs {a_p, a_p-2}, centre varying, separation
//    fixed at 2). Two different families of 2-element sets, coinciding only at
//    x_p = 0. See `history/staging/lit-pdf-kalmynin-konyagin.md` §2.
//
// 7. WHAT THE TRANSFER IS WORTH, AND WHY THE CROSS-ATTACK TENSION DISSOLVES.
//    If it stands, the lower bound becomes G2(x#) >> x (ln x)^3 (lll x)^2/
//    (ll x)^4, one log above the §4b INFERRED analogue and two logs above the
//    free bound. `history/staging/attack-growth-law.md` (attack E) MEASURED
//    G2(x#) ~ 0.762 x ln^2 x lnln x over x = 11..79 the same day. Section E
//    settles the apparent conflict, and there is no conflict:
//      (a) On the x-exponent - the only thing attack E actually resolved - the
//          two AGREE. All six of attack E's surviving families have x-exponent
//          -> 1, and the transferred bound's x-exponent is exactly 1. The 10.6
//          AICc units that exclude c x^a at a = 1.818 say nothing about ln.
//      (b) On the ln-exponent, the c2' instrument (exact G2, exact m lnD,
//          nothing fitted) puts attack E's law 1.1 se from the data, c x ln^3 x
//          3.0 se away, and §6's c x ln^2 x 9.3 se away. So this instrument
//          EXCLUDES §6's law, prefers attack E's, and leaves x ln^3 x strained
//          but alive. It cannot see the full KK shape at all, for reading 4's
//          reason.
//      (c) The two statements do not CROSS until x = 10^7327 with both
//          constants set to 1, and x = 10^1.29e11 if the KK constant is of the
//          FKMPT C(1/2) = 1/325565 order. The exact ladder stops at 79.
//      (d) They are different KINDS of statement. Attack E's law is tagged
//          MEASURED over x = 11..79, and attack E's own §7 says its winner and
//          c x ln^3 x are "not separable in principle on this range" because
//          ln x/lnln x moves only 2.74 -> 2.96 across the whole ladder. So the
//          measured law was never offered as the asymptotic truth, and a lower
//          bound with an unspecified constant cannot be contradicted by a fit.
//    CONCLUSION: the finite range cannot decide, it is not close, and the only
//    thing that would decide it is finishing the substitution on paper at D3.
//    D4 does not settle it either: at y <= 4001 the substituted construction
//    certifies (five levels, independent replay) and loses to the greedy by a
//    factor of 4.0 to 6.6, which is what an asymptotic construction does at a
//    y where its own band boundaries do not fit inside y.
//
// 8. THE PRIOR ART, IN THE OWNING CONVENTION. A144311 was re-read today at
//    `oeis.org/search?q=id:A144311&fmt=text`: 22 terms, and the record carries
//    NO %F formula line, NO %D reference line and no bound of any kind, with
//    cross-references only to A048670, A049300, A058989. A048670's record
//    carries the FGKMT bound explicitly as a %C comment ("Ford, Green,
//    Konyagin, Maynard, & Tao show that j(x#) >> x log x log log log x /
//    log log x", Charles R Greathouse IV, Mar 29 2018) and Pintz's as both %C
//    and %F. So the free bound is recorded for the ONE-class object and is
//    absent for the two-class one, which is the precise form of the corpus's
//    novelty claim and it survives. A048670 also carries, and this file did
//    not previously use it, "Maier & Pomerance conjecture that
//    Max_{n <= x} A048669(n) = log(x)*(log log x)^(2+o(1)) which suggests
//    a(n) = n*(log n)^(3+o(1))" (Greathouse, Mar 29 2018) - i.e. the
//    one-class object is conjectured at x (ln x)^{2+o(1)} in the x variable,
//    which is one log below the transferred two-class bound and is consistent
//    with reading 1's measured log-and-a-bit of two-class deficit.
//    On the transfer: all three OpenAlex records for Kalmynin-Konyagin (arXiv
//    preprint W4319049890, Izv. Math. Russian W4393170300, English
//    W4393954820) report cited_by = 0, and the Semantic Scholar citation list
//    for arXiv:2302.00459 returns zero entries. Nobody has built on that paper
//    at all, so nobody has transferred it.
//    CALIBRATION, THIS SESSION, EVERY CHANNEL: OEIS text endpoint returned
//    A144311 on the known-positive numeric query `1,5,11,29,41,65,107` and
//    returned full records for A048670 and A288815; OpenAlex returned
//    cited_by = 46 for DOI 10.4007/annals.2016.183.3.4 (Ford-Green-Konyagin-
//    Tao, "Large gaps between consecutive prime numbers") on the same call
//    shape that returned 0 for the three K-K records; Semantic Scholar
//    returned citationCount = 80 for arXiv:1408.4505 on the same call shape
//    that returned an empty citation list for arXiv:2302.00459; WebSearch
//    returned the K-K paper, its mathnet record and its ADS record on a
//    keyword query. All four channels are live and calibrated positive in this
//    session. NOT usable: the arXiv API, which the producing session found
//    broken - not re-tested here, and no negative is claimed from it.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed. All twenty are benign;
// the READINGS header's completeness claim was narrowed to match this list on
// 2026-08-20 (mismatch adjudication #29), which is the only edit that pass
// made to this file.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   1.2677 -> 1.27 and 1.4784 -> 1.48, the two fitted ln-exponents (reading 1),
//     from the "all 22 terms" and "top 14, x >= 23" rows of the fit table.
//   0.0816 -> 0.082, the standard error of the data's own trend exponent,
//     from the "G2 the exact data itself  0.2273  0.0816  7.4%" row (reading 3).
//   2.295e+3 -> 2.30e3 and 2.968e+4 -> 2.97e4, the two-factor and three-factor
//     rows of the 1.33^k separation table (reading 5).
//   1.2938e+11 -> 1.29e11, the crossing exponent at the FKMPT C(1/2) constant
//     (reading 7c).
// SAME VALUE, DIFFERENT NOTATION: 3.814e6 is the printed 3.814e+6 (x = e^(e^e),
//   reading 2); 3.35e2 is the printed 3.35e+2 (reading 5); 8.95e5 is the
//   printed 8.950e+5, the four-factor row (reading 5).
// TOKENIZER ARTIFACT, not a figure: the catalogue identifiers, which the
//   scanner reads as numbers once their prefix is stripped. OEIS A049300,
//   A058989, A048669 and A288815; the three OpenAlex work ids W4319049890,
//   W4393170300 and W4393954820; the DOI 10.4007/annals.2016.183.3.4, read as
//   "10.4007" and "2016.183"; the arXiv id 1408.4505; and the OEIS query
//   string `1,5,11,29,41,65,107`, read as one number.
// ---------------------------------------------------------------------------
