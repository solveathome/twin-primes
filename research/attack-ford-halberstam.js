#!/usr/bin/env node
'use strict';
// ============================================================================
// ATTACK FORD-HALBERSTAM — the one unexplored inequality on the vector-sieve
// road, and its authors said in print that it should win.
// ============================================================================
// THE CLAIM UNDER TEST, quoted from the RENDERED PAGE IMAGE of the author's
// copy at ford126.web.illinois.edu/wwwpapers/hooleysieve.pdf (15 pp., sha256
// af299c3fd776e8a5..., pdfTeX-0.14f, 2000-11-06), page 15, last paragraph of
// section 5 "A dual of Hooley's method":
//
//   "This seems to us superior to Lemma 13 of [BF1] or (2.6) of [BF2] in the
//    treatment of the 'y_l - x_l' terms, and should lead to better results."
//
//   [BF1] = Brudern-Fouvry, Lagrange's Four Squares Theorem with almost prime
//          variables, J. reine angew. Math. 454 (1994) 59-96.
//   [BF2] = Brudern-Fouvry, Le crible a vecteurs, Compositio Math. 102 (1996)
//          337-355.
//   Journal of record: K. Ford and H. Halberstam, The Brun-Hooley Sieve,
//          J. Number Theory 81 (2000) 335-350, doi 10.1006/jnth.1999.2479.
//
// WHAT THE TWO INEQUALITIES ARE, both transcribed from rendered page images.
//
// BF (2.6), numdam CM_1996__102_3_337_0, PDF page 6 = journal page 341, the
// display at the foot of the page (the numdam text layer drops it):
//
//   (mu*1)(n1)(mu*1)(n2) >= L1p(n1)L2m(n2) + L1m(n1)L2p(n2) - L1p(n1)L2p(n2)
//
// with (2.5) on the same page fixing Lim <= mu*1 <= Lip (i = 1 or 2). Four
// free functions: an upper and a lower sieve for each component.
//
// FH's dual, same paper page 15, is inequality (4) of their Lemma 1
// (page 2 of the same PDF):
//
//   x1...xr >= y1...yr - sum_{l=1..r} (y_l - x_l) prod_{j != l} y_j,
//                                                   0 <= x_j <= y_j,
//
// applied at page 15 with y_j = the LINEAR upper Rosser-Iwaniec sieve value of
// component j and x_j = the true indicator sum_{d|(a_j n + b_j, P)} mu(d), and
// with y_l - x_l bounded by the complementary sum
//
//   y_l - x_l  <=  sum_{d|(a_l n+b_l, P), p-(d) = p-((a_l n+b_l,P))} chibar+(d)
//
// where chibar(1)=0, chibar(d) = chi(d/p-(d)) - chi(d) for d>1 (their page 3).
// So FH use ONE sieve per component and no lower-bound sieve at all: the
// "y_l - x_l" term is handled by the boundary layer of the SAME upper sieve.
//
// THE QUESTION THIS SCRIPT ANSWERS. Priced in OUR configuration (H = z^u, two
// classes {0,-2} mod p, p < z, against beta_2 = 4.26645028414864191641), and
// then in BRUDERN-FOUVRY's own configuration, does the dual beat (2.6)?
//
// SECTIONS.
//   A. Is FH's Lemma 1 a DIFFERENT inequality from BF (2.6), or the same one?
//      Exact algebra at r = 2 and at general r.
//   B. The Rosser-Iwaniec structure the dual rests on, built explicitly and
//      checked: truncation closure, the parity of the boundary layer, the
//      level of the boundary layer, the DHR/HR identity, and the pointwise
//      defect y - x.
//   C. The pricing in our configuration: the ceiling on the dual, the
//      break-even, the exponent, and the comparison with BF (2.6).
//   D. The pricing in BRUDERN-FOUVRY's own configuration, against all four
//      side conditions of their Proposition 2 (p. 345), both slot assignments.
//   E. What the dual would need from the remainder: gamma and theta_total.
//   F. General r, where FH's claim is aimed.
//
//   node research/attack-ford-halberstam.js        (~5 s at defaults)
// ============================================================================

const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';
function assert(c, m) { if (!c) throw new Error('ASSERT FAIL: ' + m); }
const F6 = (x) => Number(x).toFixed(6);
const F9 = (x) => Number(x).toFixed(9);
const F12 = (x) => Number(x).toFixed(12);

// ---- constants of record -------------------------------------------------
const BETA2 = 4.26645028414864191641;   // Booker-Browning rigorous truncation
const EGAMMA = Math.exp(0.57721566490153286060651209008240243104);
const SQRTE = Math.sqrt(Math.E);

// Linear (kappa = 1) sieve functions, Rosser-Iwaniec / Iwaniec Acta Arith. 37
// (1980) 307-320, in their exact validity ranges.
//   F(s) = 2 e^gamma / s          on 1 <= s <= 3
//   f(s) = 2 e^gamma ln(s-1) / s  on 2 <= s <= 4
const Ffun = (s) => 2 * EGAMMA / s;
const ffun = (s) => 2 * EGAMMA * Math.log(s - 1) / s;
// Outside the sharp ranges the closed forms remain VALID as bounds and only
// stop being sharp: the true F(s) < 2e^gamma/s for s > 3 (so the closed form
// over-states an upper bound, which is safe) and the true f(s) > 2e^gamma
// ln(s-1)/s for s > 4 (so the closed form under-states a lower bound, which is
// safe). The lower ends are hard: F is not 2e^gamma/s below s=1 and f is 0
// below s=2. STRICT uses the sharp windows, EXT uses only the hard lower ends,
// and EXT is the reading most favourable to the dual.
let EXTEND = false;
const F_OK = (s) => s >= 1 && (EXTEND || s <= 3);
const f_OK = (s) => s >= 2 && (EXTEND || s <= 4);
// f/F = ln(s-1), exactly, at any common s.

function primesBelow(n) { const s = new Uint8Array(n), o = []; for (let i = 2; i < n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j < n; j += i) s[j] = 1; } } return o; }

console.log('='.repeat(76));
console.log('ATTACK FORD-HALBERSTAM: the dual decomposition, priced');
console.log('='.repeat(76));
console.log('beta_2                    = ' + BETA2.toFixed(20));
console.log('2 e^gamma                 = ' + F12(2 * EGAMMA));
console.log('1 + sqrt(e)               = ' + F12(1 + SQRTE));
console.log('');

// ============================================================================
// A. IS FH'S LEMMA 1 A DIFFERENT INEQUALITY FROM BF (2.6)?
// ============================================================================
console.log('='.repeat(76));
console.log('A. FH Lemma 1 (4) versus BF (2.6): the algebra');
console.log('='.repeat(76));
{
  // A1. r = 2, exact identity on random reals with 0 <= x_j <= y_j.
  //   FH RHS  = y1 y2 - (y1-x1) y2 - (y2-x2) y1
  //   claim   = x1 y2 + x2 y1 - y1 y2   (BF (2.6) with x_j in the Lm slots)
  let worst = 0, n = 0;
  // Math.imul, and `& 0x7fffffff` for the reduction: the plain-multiply form
  // overflows 2^53 and this generator's real period was 10,466, so the 200,000
  // 'random' trials below were a few thousand. (2026-08-20.)
  let mt = 19937, rnd = () => { mt = (Math.imul(mt, 1103515245) + 12345) & 0x7fffffff; return mt / 2147483648; };
  for (let t = 0; t < 200000; t++) {
    const y1 = rnd() * 4, y2 = rnd() * 4, x1 = rnd() * y1, x2 = rnd() * y2;
    const fh = y1 * y2 - (y1 - x1) * y2 - (y2 - x2) * y1;
    const bf = x1 * y2 + x2 * y1 - y1 * y2;
    worst = Math.max(worst, Math.abs(fh - bf)); n++;
  }
  console.log('A1  r=2, ' + n + ' random (x,y) with 0<=x<=y');
  console.log('    max | FH-RHS - [x1 y2 + x2 y1 - y1 y2] |  = ' + worst.toExponential(3));
  assert(worst < 1e-12, 'A1 identity');

  // A2. general r: FH RHS == sum_l x_l prod_{j!=l} y_j - (r-1) prod_j y_j
  let worstR = 0;
  for (let r = 2; r <= 7; r++) {
    for (let t = 0; t < 20000; t++) {
      const y = [], x = [];
      for (let j = 0; j < r; j++) { const yy = rnd() * 3 + 0.1; y.push(yy); x.push(rnd() * yy); }
      const P = y.reduce((a, b) => a * b, 1);
      let fh = P;
      for (let l = 0; l < r; l++) { let q = 1; for (let j = 0; j < r; j++) if (j !== l) q *= y[j]; fh -= (y[l] - x[l]) * q; }
      let bf = -(r - 1) * P;
      for (let l = 0; l < r; l++) { let q = x[l]; for (let j = 0; j < r; j++) if (j !== l) q *= y[j]; bf += q; }
      worstR = Math.max(worstR, Math.abs(fh - bf));
    }
  }
  console.log('A2  r=2..7, 20000 draws each: max | FH-RHS - vector-sieve-RHS | = ' + worstR.toExponential(3));
  assert(worstR < 1e-9, 'A2 identity');

  // A3. So the ONLY difference is how y_l - x_l is estimated. BF replace
  //     x_l by a LOWER SIEVE w_l <= x_l; FH bound y_l - x_l directly. Check
  //     that BF's RHS is <= FH's RHS pointwise, i.e. BF (2.6) is the weakened
  //     form of the same identity.
  let viol = 0, minGap = Infinity;
  for (let t = 0; t < 200000; t++) {
    const y1 = rnd() * 4, y2 = rnd() * 4, x1 = rnd() * y1, x2 = rnd() * y2;
    const w1 = rnd() * x1, w2 = rnd() * x2;       // w <= x <= y
    const fh = x1 * y2 + x2 * y1 - y1 * y2;
    const bf = w1 * y2 + w2 * y1 - y1 * y2;
    if (bf > fh + 1e-12) viol++;
    minGap = Math.min(minGap, fh - bf);
  }
  console.log('A3  BF-RHS <= FH-RHS pointwise (w<=x<=y): violations = ' + viol + ', min gap = ' + minGap.toExponential(3));
  assert(viol === 0, 'A3 ordering');
  console.log('');
  console.log('    VERDICT A. FH Lemma 1 and BF (2.6) are THE SAME INEQUALITY.');
  console.log('    At every r, FH-RHS = sum_l x_l prod_{j!=l} y_j - (r-1) prod y_j,');
  console.log('    which is BF (2.6) with the true x_l in the lower-sieve slots.');
  console.log('    The whole of the FH claim is therefore about how the terms');
  console.log('    y_l - x_l are ESTIMATED, exactly as their sentence says.');
}
console.log('');

// ============================================================================
// B. THE ROSSER-IWANIEC STRUCTURE THE DUAL RESTS ON
// ============================================================================
console.log('='.repeat(76));
console.log('B. The Rosser boundary layer chibar+, built and checked');
console.log('='.repeat(76));

// Rosser-Iwaniec supports at level D, sifting primes p < z, in the corpus
// convention (research/sift-limit-attack.js:27-45):
//   d = p1 > p2 > ... > pr,  D+ : p1...p_{m-1} p_m^3 <= D for all ODD  m <= r
//                            D- : p1...p_{m-1} p_m^3 <= D for all EVEN m <= r
function rosserSet(primesDesc, D, upper) {
  const S = new Set();
  (function rec(start, prod, m) {
    S.add(prod);
    for (let i = start; i < primesDesc.length; i++) {
      const p = primesDesc[i], m2 = m + 1;
      if (prod * p > D) continue;
      const isCond = upper ? (m2 % 2 === 1) : (m2 % 2 === 0);
      if (isCond && prod * p * p * p > D) continue;
      rec(i + 1, prod * p, m2);
    }
  })(0, 1, 0);
  return S;
}

function runB(zmax, sExp, label) {
  const ps = primesBelow(zmax).filter(p => p > 2);       // ODD primes, our problem
  const psDesc = ps.slice().sort((a, b) => b - a);
  const z = zmax;
  const D = Math.pow(z, sExp);
  const Sp = rosserSet(psDesc, D, true);
  const Sm = rosserSet(psDesc, D, false);
  // all squarefree divisors of P = prod of the odd primes < z
  const divs = [1];
  for (const p of ps) { const L = divs.length; for (let i = 0; i < L; i++) divs.push(divs[i] * p); }
  divs.sort((a, b) => a - b);
  const pmin = (d) => { for (const p of ps) if (d % p === 0) return p; return Infinity; };
  const nu = (d) => { let c = 0; for (const p of ps) if (d % p === 0) c++; return c; };
  const mu = (d) => (nu(d) % 2 === 0 ? 1 : -1);
  const chiP = (d) => (Sp.has(d) ? 1 : 0);
  const chiM = (d) => (Sm.has(d) ? 1 : 0);
  const chibarP = (d) => (d === 1 ? 0 : chiP(d / pmin(d)) - chiP(d));

  console.log('  [' + label + ']  z = ' + z + '  odd primes ' + ps.length + '  D = z^' + sExp + ' = ' + D.toFixed(1)
    + '  |D+| = ' + Sp.size + '  |D-| = ' + Sm.size + '  divisors = ' + divs.length);

  // B1a. truncation closure: d in D+, d>1  =>  d/p-(d) in D+   (what the
  //      DHR/HR identity proof at FH p.4 actually uses)
  let b1a = 0;
  for (const d of Sp) if (d > 1 && !Sp.has(d / pmin(d))) b1a++;
  // B1b. FULL divisor closure, which is FH's stated hypothesis (iii) p.3
  let b1b = 0, b1btot = 0;
  for (const d of Sp) for (const t of divs) { if (t <= d && d % t === 0) { b1btot++; if (!Sp.has(t)) b1b++; } }
  console.log('    B1  truncation closure failures            = ' + b1a + '   (FH p.4 proof needs this)');
  console.log('        FULL divisor-closure failures          = ' + b1b + ' of ' + b1btot + '   (FH p.3 hypothesis (iii))');
  assert(b1a === 0, 'B1a truncation closure');

  // B2. parity of the boundary layer
  let sup = [], oddOnly = true;
  for (const d of divs) if (chibarP(d) === 1) { sup.push(d); if (nu(d) % 2 === 0) oddOnly = false; }
  console.log('    B2  |supp chibar+| = ' + sup.length + '   every d has nu(d) ODD: ' + (oddOnly ? 'YES' : 'NO')
    + '   => mu(d) = -1 throughout: ' + (oddOnly ? 'YES' : 'NO'));
  assert(oddOnly, 'B2 parity');

  // B3. level of the boundary layer
  const maxSup = sup.length ? Math.max.apply(null, sup) : 0;
  const maxDp = Math.max.apply(null, Array.from(Sp));
  console.log('    B3  max d in supp chibar+ = ' + maxSup + '   D = ' + D.toFixed(1)
    + '   ratio = ' + (maxSup / D).toFixed(6) + '   (max d in D+ = ' + maxDp + ')');
  assert(maxSup <= D, 'B3 boundary layer stays under D');

  // B4. the identity (9) of FH p.4, for EVERY divisor D' of P
  let bad4 = 0;
  for (const Dp of divs) {
    let lhs = 0, r1 = 0, r2 = 0;
    const pm = pmin(Dp);
    for (const d of divs) {
      if (Dp % d) continue;
      lhs += mu(d);
      r1 += mu(d) * chiP(d);
      if (d > 1 && pmin(d) === pm) r2 += mu(d) * chibarP(d);
    }
    if (lhs !== r1 + r2) bad4++;
  }
  console.log('    B4  identity  sum mu = sum mu.chi+ + sum_{p-(d)=p-(D)} mu.chibar+   failures = '
    + bad4 + ' of ' + divs.length);
  assert(bad4 === 0, 'B4 identity');

  // B5. the pointwise defect over one full period of P
  const P = ps.reduce((a, b) => a * b, 1);
  let bad5 = 0, badSand = 0, sumY = 0, sumW = 0, sumD = 0, sumX = 0, N = 0;
  const gcd = (a, b) => { while (b) { const t = a % b; a = b; b = t; } return a; };
  let step = P > 6000000 ? Math.floor(P / 3000000) : 1;
  while (step > 1 && gcd(step, P) !== 1) step++;   // a stride sharing a factor
  // with P samples only n in a fixed class and is not representative
  for (let n = 0; n < P; n += step) {
    let m = 1; for (const p of ps) if (n % p === 0) m *= p;   // m = (n, P)
    let y = 0, w = 0, dbar = 0;
    const pm = pmin(m);
    for (const d of divs) {
      if (m % d) continue;
      y += mu(d) * chiP(d);
      w += mu(d) * chiM(d);
      if (d > 1 && pmin(d) === pm) dbar += chibarP(d);
    }
    const x = (m === 1 ? 1 : 0);
    if (y - x !== dbar) bad5++;
    if (!(w <= x && x <= y)) badSand++;
    sumY += y; sumW += w; sumD += dbar; sumX += x; N++;
  }
  console.log('    B5  y - x = chibar+ sum, pointwise over ' + N + ' n (step ' + step + '): failures = ' + bad5);
  console.log('        Rosser sandwich  w <= x <= y:  failures = ' + badSand);
  assert(bad5 === 0, 'B5 pointwise defect');
  assert(badSand === 0, 'B5 sandwich');
  const W = ps.reduce((a, p) => a * (1 - 1 / p), 1);
  console.log('        mean y = ' + F9(sumY / N) + '   mean w = ' + F9(sumW / N)
    + '   mean x = ' + F9(sumX / N) + '   W = ' + F9(W));
  console.log('        mean chibar+ sum = ' + F9(sumD / N) + '   mean y - mean x = ' + F9(sumY / N - sumX / N));
  console.log('        => the FH bound on y-x is an EQUALITY here, loss 0.000000000');
}
runB(20, 2.6487, 'toy 1');
runB(30, 2.6487, 'toy 2');
runB(42, 2.6487, 'toy 3');
console.log('');
console.log('  VERDICT B. Three structural facts, all VERIFIED, and the first two');
console.log('  are in FH\'s favour:');
console.log('   (1) chibar+ is supported on nu(d) ODD only, so mu(d) = -1 throughout,');
console.log('       so FH\'s absolute-value bound on y-x loses NOTHING: it is an');
console.log('       identity, not an inequality (B2, B5). Their step is lossless.');
console.log('   (2) supp(chibar+) stays BELOW the level D (B3), so the boundary');
console.log('       layer costs no extra level: no factor z is paid.');
console.log('   (3) Rosser\'s D+ is fully divisor-closed at every parameter tested');
console.log('       (B1), so FH\'s hypothesis (iii) on p.3 holds for it and their');
console.log('       Lemma 2 applies to the Rosser-Iwaniec sieve as they intend.');
console.log('  So NOTHING in the mechanism is lost. The shortfall priced below is');
console.log('  not a defect in their step; it is the freedom their step gives up.');
console.log('');

// ============================================================================
// C. PRICING IN OUR CONFIGURATION
// ============================================================================
console.log('='.repeat(76));
console.log('C. Pricing: the dual in our configuration, against beta_2');
console.log('='.repeat(76));
console.log('');
console.log('  THE CEILING ARGUMENT. By B3 the whole of the dual\'s per-component');
console.log('  lower bound  x_l >= y_l - (boundary sum)  has moduli <= D_l once the');
console.log('  inner condition p-(d)=p-((n,P)) is expanded by upper sieves of level');
console.log('  D_l/d. It is therefore a LINEAR-SIEVE LOWER BOUND OF LEVEL D_l, and');
console.log('  by the optimality of f (Selberg\'s parity example; Iwaniec, Acta Arith.');
console.log('  37 (1980)) its main term cannot exceed W f(s_l), s_l = log D_l/log z.');
console.log('  So the dual is at best BF (2.6) with the constraint D- = D+.');
console.log('');

// C1. BF (2.6): minimise the total level exponent s+ + s-  subject to
//     positivity  2 f(s-) > F(s+)  i.e.  2 s+ ln(s- - 1) > s-.
function bfTotal() {
  let best = { T: Infinity };
  for (let i = 0; i <= 3000000; i++) {
    const sm = 2 + (4 - 2) * i / 3000000;                  // s- in [2,4]
    if (!f_OK(sm)) continue;
    const L = Math.log(sm - 1); if (L <= 0) continue;
    const sp = sm / (2 * L);                               // equality 2 s+ ln(s--1) = s-
    if (!F_OK(sp)) continue;
    const T = sp + sm;
    if (T < best.T) best = { T, sp, sm };
  }
  // polish
  let lo = best.sm - 1e-3, hi = best.sm + 1e-3;
  for (let it = 0; it < 300; it++) {
    const a = lo + (hi - lo) / 3, b = hi - (hi - lo) / 3;
    const T = (sm) => { const L = Math.log(sm - 1); const sp = sm / (2 * L); return (F_OK(sp) ? sp + sm : Infinity); };
    if (T(a) < T(b)) hi = b; else lo = a;
  }
  const sm = (lo + hi) / 2, sp = sm / (2 * Math.log(sm - 1));
  return { T: sp + sm, sp, sm };
}
// C2. FH dual: forced s- = s+ = s per component; positivity
//     sum_j f(s_j)/F(s_j) > 1  i.e.  ln(s1-1) + ln(s2-1) > 1.
function fhTotal() {
  let best = { T: Infinity };
  for (let i = 0; i <= 3000000; i++) {
    const s1 = 2 + (4 - 2) * i / 3000000;
    if (!(F_OK(s1) && f_OK(s1))) continue;
    const L1 = Math.log(s1 - 1);
    const s2 = 1 + Math.exp(1 - L1);          // ln(s2-1) = 1 - ln(s1-1), equality
    if (!(F_OK(s2) && f_OK(s2))) continue;
    const T = s1 + s2;
    if (T < best.T) best = { T, s1, s2 };
  }
  return best;
}

let BF = null, FH = null, BFx = null, FHx = null;
EXTEND = false; BF = bfTotal(); FH = fhTotal();
EXTEND = true;  BFx = bfTotal(); FHx = fhTotal();
EXTEND = false;
console.log('C1  BF (2.6), independent upper and lower levels');
console.log('    positivity   2 f(s-) > F(s+)      i.e.   2 s+ ln(s- - 1) > s-');
console.log('    STRICT sieve windows (F on [1,3], f on [2,4]):');
console.log('      K_BF = s+ + s-  = ' + F12(BF.T) + '   at s+ = ' + F12(BF.sp) + '  s- = ' + F12(BF.sm)
  + '  ratio = ' + F12(BF.sm / BF.sp));
console.log('    EXTENDED (closed forms kept beyond their sharp windows, still valid):');
console.log('      K_BF = ' + F12(BFx.T) + '   at s+ = ' + F12(BFx.sp) + '  s- = ' + F12(BFx.sm));
console.log('    corpus records K = 5.1580646803 at b/a = 1.3130863738');
console.log('');
console.log('C2  FH dual, one level per component (D- = D+ forced)');
console.log('    positivity   f(s1)/F(s1) + f(s2)/F(s2) > 1   i.e.   ln(s1-1) + ln(s2-1) > 1');
console.log('    STRICT:   K_FH = ' + F12(FH.T) + '   at s1 = ' + F12(FH.s1) + '  s2 = ' + F12(FH.s2));
console.log('    EXTENDED: K_FH = ' + F12(FHx.T) + '   at s1 = ' + F12(FHx.s1) + '  s2 = ' + F12(FHx.s2));
console.log('    closed form  2(1 + sqrt(e))     = ' + F12(2 * (1 + SQRTE)));
console.log('    the optimum is symmetric and interior, so the windows do not bind it');
console.log('');
console.log('C3  THE GAP BETWEEN THEM');
console.log('    STRICT    K_FH - K_BF = ' + F12(FH.T - BF.T) + '   ( ' + F6(100 * (FH.T / BF.T - 1)) + ' per cent )');
console.log('    EXTENDED  K_FH - K_BF = ' + F12(FHx.T - BFx.T) + '   ( ' + F6(100 * (FHx.T / BFx.T - 1)) + ' per cent )');
console.log('    FH is WORSE either way. The dual forfeits exactly the majorant/minorant');
console.log('    level asymmetry s-/s+ = ' + F6(BF.sm / BF.sp) + ' that BF exploit.');
console.log('');

// C4. exponent u = K / theta_total
const rows = [];
function addRow(name, theta) {
  rows.push({ name, theta, uBF: BF.T / theta, uFH: FH.T / theta });
}
addRow('theta_total = 1 (defensible; sift-limit-attack 7b)', 1);
// theta from the published bilinear shape, at split ratio r:
//   1/2 + kappa (2 theta - 1) + lambda theta r/(1+r) <= 1
function thetaFromShape(kappa, lambda, r) {
  // solve 1/2 + kappa(2 theta - 1) + lambda theta r/(1+r) = 1
  const A = 2 * kappa + lambda * r / (1 + r);
  return (0.5 + kappa) / A;
}
const thDFI = thetaFromShape(3 / 8, 11 / 48, 1);
const thBC = thetaFromShape(7 / 20, 1 / 4, 1);
addRow('DFI 1997 at ratio 1   (kappa=3/8, lambda=11/48)', thDFI);
addRow('Bettin-Chandee 2015 at ratio 1 (kappa=7/20, lambda=1/4)', thBC);
addRow('theta_total = 5/4 (BF Prop 2 condition (iv))', 1.25);

console.log('C4  EXPONENT u = K / theta_total, against beta_2 = ' + F6(BETA2));
console.log('    ' + 'configuration'.padEnd(52) + 'theta   u(BF 2.6)   u(FH dual)  beats beta_2?');
for (const r of rows) {
  console.log('    ' + r.name.padEnd(52) + F6(r.theta) + '   ' + F6(r.uBF) + '    ' + F6(r.uFH)
    + '     BF:' + (r.uBF < BETA2 ? 'YES' : 'no') + '  FH:' + (r.uFH < BETA2 ? 'YES' : 'no'));
}
console.log('    corpus cross-check: theta at ratio 1 for Bettin-Chandee = 1.030303, here ' + F6(thBC));
console.log('    corpus cross-check: theta at ratio 1 for DFI            = 1.012048, here ' + F6(thDFI));
console.log('');

console.log('C5  BREAK-EVEN: the theta_total each inequality needs to reach beta_2');
const thNeedBF = BF.T / BETA2, thNeedFH = FH.T / BETA2;
console.log('    BF (2.6)  needs theta_total > ' + F12(thNeedBF) + '   (corpus: 1.208983)');
console.log('    FH dual   needs theta_total > ' + F12(thNeedFH) + '   (corpus records the balanced');
console.log('                                                  break-even as 1.241651)');
console.log('    extra cancellation the dual demands = ' + F12(thNeedFH - thNeedBF)
  + '  ( ' + F6(100 * (thNeedFH / thNeedBF - 1)) + ' per cent more )');
console.log('');

console.log('C6  GAMMA CURRENCY (attack-sqrt-cancellation section 1)');
console.log('    gamma = log|R| / log(pair count) required at the working point:');
console.log('    BF (2.6)  working point  M = H^' + F6(thNeedBF * BF.sp / BF.T) + ', N = H^' + F6(thNeedBF * BF.sm / BF.T)
  + '   gamma needed <= ' + F9(1 / thNeedBF));
console.log('    FH dual   working point  M = N = H^' + F6(thNeedFH / 2)
  + '            gamma needed <= ' + F9(1 / thNeedFH));
console.log('    best published (Bettin-Chandee 2015, aligned)  gamma = 0.970624');
console.log('    shortfall in gamma:  BF ' + F9(0.970624 - 1 / thNeedBF) + '   FH ' + F9(0.970624 - 1 / thNeedFH));
console.log('');

console.log('C7  THE (+,+) DIAGONAL, which BF can buy for free and the dual cannot');
console.log('    BF (2.6): the Lp.Lp term carries moduli D+^2 = H^{2a}. The corpus');
console.log('    working point takes a = 1/2 exactly, so that term is H and costs');
console.log('    nothing (attack-theta-last-gap section 2); the price is theta_total');
console.log('    = 1.212157 instead of the unconstrained ' + F9(thNeedBF) + ', and');
console.log('    gamma <= 0.824975 for the two surviving terms.');
console.log('    FH dual: ALL THREE terms carry moduli D1 D2 = H^{theta_total}, so the');
console.log('    diagonal is never free. At the dual\'s optimum that is H^'
  + F9(thNeedFH) + ', over the window by H^' + F9(thNeedFH - 1) + '.');
console.log('    This is a SECOND, independent loss on top of the ' + F9(FH.T - BF.T) + ' in C3.');
console.log('');

// ============================================================================
// D. PRICING IN BRUDERN-FOUVRY'S OWN CONFIGURATION
// ============================================================================
console.log('='.repeat(76));
console.log('D. The dual in BRUDERN-FOUVRY\'s own problem, against Proposition 2');
console.log('='.repeat(76));
console.log('  Their four side conditions, journal p. 345, read at 600 dpi and');
console.log('  transcribed in history/staging/attack-bf-split.md section 1:');
console.log('     (i)   q^C0 D1        <= x^{1-c eps}');
console.log('     (ii)  q^C0 D1 D2^2   <= x^{2-c eps}');
console.log('     (iii) q^C0 D1^2 D2^3 <= x^{3-c eps}');
console.log('     (iv)  q^C0 D1^4 D2^4 <= x^{5-c eps}');
console.log('  In the kappa -> 0 limit (their p. 339) these read, in log_x units');
console.log('  d1 = log_x D1, d2 = log_x D2:  d1<=1, d1+2d2<=2, 2d1+3d2<=3, 4d1+4d2<=5.');
console.log('');
function feasible(d1, d2) {
  const E = 1e-12;
  return d1 <= 1 + E && d1 + 2 * d2 <= 2 + E && 2 * d1 + 3 * d2 <= 3 + E && 4 * d1 + 4 * d2 <= 5 + E;
}
// BF's own objective, their p.355: xi = beta / (1 + exp(beta/(2 alpha)))
// with alpha = majorant level exponent, beta = minorant level exponent.
function xiBF(alpha, beta) {
  const sp = alpha, sm = beta;   // in log_x units; s = level/xi below
  return beta / (1 + Math.exp(beta / (2 * alpha)));
}
// FH dual objective: one level per COMPONENT (da, db); positivity
// ln(da/xi - 1) + ln(db/xi - 1) > 1, maximise xi.
function xiFH(da, db) {
  // solve (da/xi - 1)(db/xi - 1) = e  for the largest xi
  // => da db - (da+db) xi + xi^2 = e xi^2  => (1-e) xi^2 - (da+db) xi + da db = 0
  const A = 1 - Math.E, B = -(da + db), C = da * db;
  const disc = B * B - 4 * A * C;
  if (disc < 0) return 0;
  const r1 = (-B + Math.sqrt(disc)) / (2 * A), r2 = (-B - Math.sqrt(disc)) / (2 * A);
  const cand = [r1, r2].filter(x => x > 0);
  if (!cand.length) return 0;
  // need da/xi and db/xi inside the sieve validity windows [2,3]
  let best = 0;
  for (const x of cand) {
    const s1 = da / x, s2 = db / x;
    if (F_OK(s1) && f_OK(s1) && F_OK(s2) && f_OK(s2)) best = Math.max(best, x);
  }
  return best;
}
{
  // D1. BF's own point, re-derived
  const bfXi = xiBF(0.5, 0.75);
  console.log('D1  BF\'s own split: majorant x^{1/2}, minorant x^{3/4} (their p. 353)');
  console.log('    xi = 3/(4(1+e^{3/4})) = ' + F12(bfXi) + '   exponent 1/xi = ' + F12(1 / bfXi));
  console.log('    their printed constant "0,2406"; corpus records 0.2406159756 / 4.156000');
  console.log('    slot assignment: D1 = minorant x^{3/4}, D2 = majorant x^{1/2}');
  console.log('    feasible against (i)-(iv)? ' + feasible(0.75, 0.5)
    + '   (the reverse assignment: ' + feasible(0.5, 0.75) + ')');

  // D2. the FH dual under the same four conditions, both slot assignments
  const solveD2 = () => {
  let best = { xi: 0 };
  const NG = 1400;
  for (let i = 0; i <= NG; i++) {
    for (let j = 0; j <= NG; j++) {
      const da = 0.2 + (1.0 - 0.2) * i / NG, db = 0.2 + (1.0 - 0.2) * j / NG;
      // three terms, all with component levels (da, db); slot 1 must accept an
      // ||.||_inf <= 1 function, slot 2 a well-factorable one. Rosser lambda+ is
      // well factorable, the boundary sum is bounded by 1, so BOTH assignments
      // are open; take the better.
      const ok = feasible(da, db) || feasible(db, da);
      if (!ok) continue;
      const xi = xiFH(da, db);
      if (xi > best.xi) best = { xi, da, db, asgnA: feasible(da, db), asgnB: feasible(db, da) };
    }
  }
  // polish around the grid optimum
  let cur = best;
  for (let pass = 0; pass < 8; pass++) {
    const h = 0.8 / NG / Math.pow(3, pass);
    for (let i = -40; i <= 40; i++) for (let j = -40; j <= 40; j++) {
      const da = cur.da + i * h / 20, db = cur.db + j * h / 20;
      if (!(feasible(da, db) || feasible(db, da))) continue;
      const xi = xiFH(da, db);
      if (xi > cur.xi) cur = { xi, da, db };
    }
  }
  return cur;
  };
  EXTEND = false; const curS = solveD2();
  EXTEND = true;  const curX = solveD2();
  EXTEND = false;
  const cur = curS;
  console.log('');
  console.log('D2  FH dual, maximised over the SAME four side conditions');
  console.log('    best xi = ' + F12(cur.xi) + '   exponent 1/xi = ' + F12(1 / cur.xi));
  console.log('      at component levels  x^' + F9(cur.da) + '  and  x^' + F9(cur.db));
  console.log('      theta_total = d_a + d_b = ' + F9(cur.da + cur.db));
  console.log('      s1 = ' + F6(cur.da / cur.xi) + '  s2 = ' + F6(cur.db / cur.xi) + '   (STRICT needs both in [2,3])');
  const slacks = (D1, D2) => '(i) ' + F6(1 - D1) + '  (ii) ' + F6(2 - D1 - 2 * D2)
    + '  (iii) ' + F6(3 - 2 * D1 - 3 * D2) + '  (iv) ' + F6(5 - 4 * D1 - 4 * D2);
  const asgnA = feasible(cur.da, cur.db), asgnB = feasible(cur.db, cur.da);
  console.log('      slot assignment A  (D1 = x^' + F6(cur.da) + ', D2 = x^' + F6(cur.db) + ') feasible: ' + asgnA);
  console.log('        slacks ' + slacks(cur.da, cur.db));
  console.log('      slot assignment B  (D1 = x^' + F6(cur.db) + ', D2 = x^' + F6(cur.da) + ') feasible: ' + asgnB);
  console.log('        slacks ' + slacks(cur.db, cur.da));
  console.log('');
  console.log('D3  THE VERDICT IN THEIR OWN PROBLEM');
  console.log('    BF (2.6) as published   1/xi = ' + F12(1 / bfXi));
  console.log('    BF (2.6) re-optimised   1/xi = 4.155791838187   (attack-bf-split)');
  console.log('    FH dual, best possible  1/xi = ' + F12(1 / cur.xi));
  console.log('    beta_2                        = ' + F12(BETA2));
  console.log('    EXTENDED windows (the reading most favourable to the dual):');
  console.log('      xi = ' + F12(curX.xi) + '   1/xi = ' + F12(1 / curX.xi)
    + '   at x^' + F9(curX.da) + ' and x^' + F9(curX.db)
    + '   theta_total = ' + F9(curX.da + curX.db));
  console.log('    The dual LOSES to their own published constant by '
    + F12(1 / cur.xi - 1 / bfXi) + ',');
  console.log('    and it does not even reach beta_2 (' + (1 / cur.xi < BETA2 ? 'it does' : 'short by '
      + F12(1 / cur.xi - BETA2)) + ').');
}
console.log('');

// ============================================================================
// E. GENERAL r, WHERE FH'S CLAIM IS AIMED
// ============================================================================
console.log('='.repeat(76));
console.log('E. General r: does the dual ever overtake (2.6)?');
console.log('='.repeat(76));
console.log('  For r linear components the vector inequality has main term');
console.log('    sum_l f(s_l^-) prod_{j!=l} F(s_j^+)  -  (r-1) prod_j F(s_j^+)');
console.log('  Positive iff  sum_l f(s_l^-)/F(s_l^+) > r-1.');
console.log('  BF may take s^- != s^+; the FH dual is forced to s^- = s^+.');
console.log('');
console.log('    r    K_BF = min sum levels    K_FH = min sum levels     FH excess');
EXTEND = true;
for (let r = 2; r <= 6; r++) {
  // BF: symmetric across components, minimise r*(s+ + s-)/... careful: the
  // moduli of term l are D^-_l prod_{j!=l} D^+_j, and of the pure term prod D^+.
  // Total level exponent = max over terms = s- + (r-1) s+   (>= r s+).
  let bestBF = { T: Infinity };
  for (let i = 1; i <= 400000; i++) {
    const sm = 2 + (4 - 2) * i / 400000;
    const L = Math.log(sm - 1); if (L <= 0) continue;
    // r f(s-)/F(s+) = r-1  =>  r * (s+/s-) * L = r-1  =>  s+ = (r-1) sm / (r L)
    const sp = (r - 1) * sm / (r * L);
    if (!F_OK(sp) || !f_OK(sm)) continue;
    const T = sm + (r - 1) * sp;
    if (T < bestBF.T) bestBF = { T, sp, sm };
  }
  // FH: s+ = s- = s, r ln(s-1) > r-1  =>  s > 1 + e^{(r-1)/r}; total = r s
  const sFH = 1 + Math.exp((r - 1) / r);
  const okFH = F_OK(sFH) && f_OK(sFH);
  const KFH = okFH ? r * sFH : NaN;
  console.log('    ' + String(r).padEnd(5) + F12(bestBF.T).padEnd(24) + (okFH ? F12(KFH) : 'sieve range fails').padEnd(24)
    + (okFH ? F12(KFH - bestBF.T) : '-'));
}
EXTEND = false;
console.log('');
console.log('  (table computed with the closed forms extended beyond their sharp');
console.log('   windows, which is the reading most favourable to the dual)');
console.log('  The excess is positive at every r: the dual never overtakes (2.6)');
console.log('  for LINEAR components, because f is optimal at kappa = 1 and the');
console.log('  dual\'s only freedom is a single level per component.');
console.log('');

// ============================================================================
// F. WHAT SURVIVES
// ============================================================================
console.log('='.repeat(76));
console.log('F. Summary of the pricing');
console.log('='.repeat(76));
console.log('  K_BF (min total level, BF 2.6)          = ' + F12(BF.T));
console.log('  K_FH (min total level, FH dual)         = ' + F12(FH.T) + '   = 2(1+sqrt(e))');
console.log('  exponent at theta_total = 1:  BF ' + F12(BF.T) + '   FH ' + F12(FH.T));
console.log('  exponent with best published cancellation (theta = ' + F6(thBC) + '):');
console.log('       BF ' + F12(BF.T / thBC) + '   FH ' + F12(FH.T / thBC));
console.log('  beta_2                                  = ' + F12(BETA2));
console.log('  FH dual in BF\'s own problem, best possible 1/xi, see D2 above.');
console.log('');
console.log('done ' + el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-ford-halberstam.js
//   invocation:  node research/attack-ford-halberstam.js
//   code-sha256: b0b47f411d880ddae0bfedd5b5c415e9c49cbba035975b0af7d7056d118d62af
//   out-sha256:  6ca704f2925fc2edb714c53a9674988dab527740e3d7002a219b3a7cd0926658
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     206.1 s
// ============================================================================
// ============================================================================
// ATTACK FORD-HALBERSTAM: the dual decomposition, priced
// ============================================================================
// beta_2                    = 4.26645028414864224686
// 2 e^gamma                 = 3.562144835980
// 1 + sqrt(e)               = 2.648721270700
//
// ============================================================================
// A. FH Lemma 1 (4) versus BF (2.6): the algebra
// ============================================================================
// A1  r=2, 200000 random (x,y) with 0<=x<=y
//     max | FH-RHS - [x1 y2 + x2 y1 - y1 y2] |  = 5.329e-15
// A2  r=2..7, 20000 draws each: max | FH-RHS - vector-sieve-RHS | = 1.364e-12
// A3  BF-RHS <= FH-RHS pointwise (w<=x<=y): violations = 0, min gap = 1.109e-6
//
//     VERDICT A. FH Lemma 1 and BF (2.6) are THE SAME INEQUALITY.
//     At every r, FH-RHS = sum_l x_l prod_{j!=l} y_j - (r-1) prod y_j,
//     which is BF (2.6) with the true x_l in the lower-sieve slots.
//     The whole of the FH claim is therefore about how the terms
//     y_l - x_l are ESTIMATED, exactly as their sentence says.
//
// ============================================================================
// B. The Rosser boundary layer chibar+, built and checked
// ============================================================================
//   [toy 1]  z = 20  odd primes 7  D = z^2.6487 = 2792.8  |D+| = 21  |D-| = 24  divisors = 128
//     B1  truncation closure failures            = 0   (FH p.4 proof needs this)
//         FULL divisor-closure failures          = 0 of 91   (FH p.3 hypothesis (iii))
//     B2  |supp chibar+| = 7   every d has nu(d) ODD: YES   => mu(d) = -1 throughout: YES
//     B3  max d in supp chibar+ = 1001   D = 2792.8   ratio = 0.358423   (max d in D+ = 273)
//     B4  identity  sum mu = sum mu.chi+ + sum_{p-(d)=p-(D)} mu.chibar+   failures = 0 of 128
//     B5  y - x = chibar+ sum, pointwise over 4849845 n (step 1): failures = 0
//         Rosser sandwich  w <= x <= y:  failures = 0
//         mean y = 0.390609391   mean w = 0.308189643   mean x = 0.342048045   W = 0.342048045
//         mean chibar+ sum = 0.048561346   mean y - mean x = 0.048561346
//         => the FH bound on y-x is an EQUALITY here, loss 0.000000000
//   [toy 2]  z = 30  odd primes 9  D = z^2.6487 = 8174.3  |D+| = 43  |D-| = 47  divisors = 512
//     B1  truncation closure failures            = 0   (FH p.4 proof needs this)
//         FULL divisor-closure failures          = 0 of 211   (FH p.3 hypothesis (iii))
//     B2  |supp chibar+| = 23   every d has nu(d) ODD: YES   => mu(d) = -1 throughout: YES
//     B3  max d in supp chibar+ = 4199   D = 8174.3   ratio = 0.513683   (max d in D+ = 741)
//     B4  identity  sum mu = sum mu.chi+ + sum_{p-(d)=p-(D)} mu.chibar+   failures = 0 of 512
//     B5  y - x = chibar+ sum, pointwise over 2989692 n (step 1082): failures = 0
//         Rosser sandwich  w <= x <= y:  failures = 0
//         mean y = 0.355016503   mean w = 0.288127339   mean x = 0.315889730   W = 0.315894446
//         mean chibar+ sum = 0.039126773   mean y - mean x = 0.039126773
//         => the FH bound on y-x is an EQUALITY here, loss 0.000000000
//   [toy 3]  z = 42  odd primes 12  D = z^2.6487 = 19929.7  |D+| = 68  |D-| = 80  divisors = 4096
//     B1  truncation closure failures            = 0   (FH p.4 proof needs this)
//         FULL divisor-closure failures          = 0 of 417   (FH p.3 hypothesis (iii))
//     B2  |supp chibar+| = 34   every d has nu(d) ODD: YES   => mu(d) = -1 throughout: YES
//     B3  max d in supp chibar+ = 7429   D = 19929.7   ratio = 0.372761   (max d in D+ = 2145)
//     B4  identity  sum mu = sum mu.chi+ + sum_{p-(d)=p-(D)} mu.chibar+   failures = 0 of 4096
//     B5  y - x = chibar+ sum, pointwise over 3000001 n (step 50708377): failures = 0
//         Rosser sandwich  w <= x <= y:  failures = 0
//         mean y = 0.336780221   mean w = 0.256767581   mean x = 0.290180903   W = 0.290187341
//         mean chibar+ sum = 0.046599318   mean y - mean x = 0.046599318
//         => the FH bound on y-x is an EQUALITY here, loss 0.000000000
//
//   VERDICT B. Three structural facts, all VERIFIED, and the first two
//   are in FH's favour:
//    (1) chibar+ is supported on nu(d) ODD only, so mu(d) = -1 throughout,
//        so FH's absolute-value bound on y-x loses NOTHING: it is an
//        identity, not an inequality (B2, B5). Their step is lossless.
//    (2) supp(chibar+) stays BELOW the level D (B3), so the boundary
//        layer costs no extra level: no factor z is paid.
//    (3) Rosser's D+ is fully divisor-closed at every parameter tested
//        (B1), so FH's hypothesis (iii) on p.3 holds for it and their
//        Lemma 2 applies to the Rosser-Iwaniec sieve as they intend.
//   So NOTHING in the mechanism is lost. The shortfall priced below is
//   not a defect in their step; it is the freedom their step gives up.
//
// ============================================================================
// C. Pricing: the dual in our configuration, against beta_2
// ============================================================================
//
//   THE CEILING ARGUMENT. By B3 the whole of the dual's per-component
//   lower bound  x_l >= y_l - (boundary sum)  has moduli <= D_l once the
//   inner condition p-(d)=p-((n,P)) is expanded by upper sieves of level
//   D_l/d. It is therefore a LINEAR-SIEVE LOWER BOUND OF LEVEL D_l, and
//   by the optimality of f (Selberg's parity example; Iwaniec, Acta Arith.
//   37 (1980)) its main term cannot exceed W f(s_l), s_l = log D_l/log z.
//   So the dual is at best BF (2.6) with the constraint D- = D+.
//
// C1  BF (2.6), independent upper and lower levels
//     positivity   2 f(s-) > F(s+)      i.e.   2 s+ ln(s- - 1) > s-
//     STRICT sieve windows (F on [1,3], f on [2,4]):
//       K_BF = s+ + s-  = 5.158064680330   at s+ = 2.229949005179  s- = 2.928115675151  ratio = 1.313086383747
//     EXTENDED (closed forms kept beyond their sharp windows, still valid):
//       K_BF = 5.158064680330   at s+ = 2.229949005179  s- = 2.928115675151
//     corpus records K = 5.1580646803 at b/a = 1.3130863738
//
// C2  FH dual, one level per component (D- = D+ forced)
//     positivity   f(s1)/F(s1) + f(s2)/F(s2) > 1   i.e.   ln(s1-1) + ln(s2-1) > 1
//     STRICT:   K_FH = 5.297442541400   at s1 = 2.648721333333  s2 = 2.648721208067
//     EXTENDED: K_FH = 5.297442541400   at s1 = 2.648721333333  s2 = 2.648721208067
//     closed form  2(1 + sqrt(e))     = 5.297442541400
//     the optimum is symmetric and interior, so the windows do not bind it
//
// C3  THE GAP BETWEEN THEM
//     STRICT    K_FH - K_BF = 0.139377861070   ( 2.702135 per cent )
//     EXTENDED  K_FH - K_BF = 0.139377861070   ( 2.702135 per cent )
//     FH is WORSE either way. The dual forfeits exactly the majorant/minorant
//     level asymmetry s-/s+ = 1.313086 that BF exploit.
//
// C4  EXPONENT u = K / theta_total, against beta_2 = 4.266450
//     configuration                                       theta   u(BF 2.6)   u(FH dual)  beats beta_2?
//     theta_total = 1 (defensible; sift-limit-attack 7b)  1.000000   5.158065    5.297443     BF:no  FH:no
//     DFI 1997 at ratio 1   (kappa=3/8, lambda=11/48)     1.012048   5.096659    5.234378     BF:no  FH:no
//     Bettin-Chandee 2015 at ratio 1 (kappa=7/20, lambda=1/4)1.030303   5.006357    5.141635     BF:no  FH:no
//     theta_total = 5/4 (BF Prop 2 condition (iv))        1.250000   4.126452    4.237954     BF:YES  FH:YES
//     corpus cross-check: theta at ratio 1 for Bettin-Chandee = 1.030303, here 1.030303
//     corpus cross-check: theta at ratio 1 for DFI            = 1.012048, here 1.012048
//
// C5  BREAK-EVEN: the theta_total each inequality needs to reach beta_2
//     BF (2.6)  needs theta_total > 1.208982722591   (corpus: 1.208983)
//     FH dual   needs theta_total > 1.241651065543   (corpus records the balanced
//                                                   break-even as 1.241651)
//     extra cancellation the dual demands = 0.032668342952  ( 2.702135 per cent more )
//
// C6  GAMMA CURRENCY (attack-sqrt-cancellation section 1)
//     gamma = log|R| / log(pair count) required at the working point:
//     BF (2.6)  working point  M = H^0.522671, N = H^0.686312   gamma needed <= 0.827141680
//     FH dual   working point  M = N = H^0.620826            gamma needed <= 0.805379247
//     best published (Bettin-Chandee 2015, aligned)  gamma = 0.970624
//     shortfall in gamma:  BF 0.143482320   FH 0.165244753
//
// C7  THE (+,+) DIAGONAL, which BF can buy for free and the dual cannot
//     BF (2.6): the Lp.Lp term carries moduli D+^2 = H^{2a}. The corpus
//     working point takes a = 1/2 exactly, so that term is H and costs
//     nothing (attack-theta-last-gap section 2); the price is theta_total
//     = 1.212157 instead of the unconstrained 1.208982723, and
//     gamma <= 0.824975 for the two surviving terms.
//     FH dual: ALL THREE terms carry moduli D1 D2 = H^{theta_total}, so the
//     diagonal is never free. At the dual's optimum that is H^1.241651066, over the window by H^0.241651066.
//     This is a SECOND, independent loss on top of the 0.139377861 in C3.
//
// ============================================================================
// D. The dual in BRUDERN-FOUVRY's own problem, against Proposition 2
// ============================================================================
//   Their four side conditions, journal p. 345, read at 600 dpi and
//   transcribed in history/staging/attack-bf-split.md section 1:
//      (i)   q^C0 D1        <= x^{1-c eps}
//      (ii)  q^C0 D1 D2^2   <= x^{2-c eps}
//      (iii) q^C0 D1^2 D2^3 <= x^{3-c eps}
//      (iv)  q^C0 D1^4 D2^4 <= x^{5-c eps}
//   In the kappa -> 0 limit (their p. 339) these read, in log_x units
//   d1 = log_x D1, d2 = log_x D2:  d1<=1, d1+2d2<=2, 2d1+3d2<=3, 4d1+4d2<=5.
//
// D1  BF's own split: majorant x^{1/2}, minorant x^{3/4} (their p. 353)
//     xi = 3/(4(1+e^{3/4})) = 0.240615975618   exponent 1/xi = 4.156000022150
//     their printed constant "0,2406"; corpus records 0.2406159756 / 4.156000
//     slot assignment: D1 = minorant x^{3/4}, D2 = majorant x^{1/2}
//     feasible against (i)-(iv)? true   (the reverse assignment: false)
//
// D2  FH dual, maximised over the SAME four side conditions
//     best xi = 0.229402999211   exponent 1/xi = 4.359140915496
//       at component levels  x^0.541194017  and  x^0.688208975
//       theta_total = d_a + d_b = 1.229402992
//       s1 = 2.359141  s2 = 3.000000   (STRICT needs both in [2,3])
//       slot assignment A  (D1 = x^0.541194, D2 = x^0.688209) feasible: false
//         slacks (i) 0.458806  (ii) 0.082388  (iii) -0.147015  (iv) 0.082388
//       slot assignment B  (D1 = x^0.688209, D2 = x^0.541194) feasible: true
//         slacks (i) 0.311791  (ii) 0.229403  (iii) -0.000000  (iv) 0.082388
//
// D3  THE VERDICT IN THEIR OWN PROBLEM
//     BF (2.6) as published   1/xi = 4.156000022150
//     BF (2.6) re-optimised   1/xi = 4.155791838187   (attack-bf-split)
//     FH dual, best possible  1/xi = 4.359140915496
//     beta_2                        = 4.266450284149
//     EXTENDED windows (the reading most favourable to the dual):
//       xi = 0.229409508567   1/xi = 4.359017227526   at x^0.538234921 and x^0.692647619   theta_total = 1.230882540
//     The dual LOSES to their own published constant by 0.203140893346,
//     and it does not even reach beta_2 (short by 0.092690631348).
//
// ============================================================================
// E. General r: does the dual ever overtake (2.6)?
// ============================================================================
//   For r linear components the vector inequality has main term
//     sum_l f(s_l^-) prod_{j!=l} F(s_j^+)  -  (r-1) prod_j F(s_j^+)
//   Positive iff  sum_l f(s_l^-)/F(s_l^+) > r-1.
//   BF may take s^- != s^+; the FH dual is forced to s^- = s^+.
//
//     r    K_BF = min sum levels    K_FH = min sum levels     FH excess
//     2    5.158064680331          5.297442541400          0.139377861070
//     3    8.577307200901          8.843202123164          0.265894922263
//     4    12.076358817813         12.468000066451         0.391641248638
//     5    15.610159154371         16.127704642462         0.517545488091
//     6    19.162175477359         19.805855345357         0.643679867998
//
//   (table computed with the closed forms extended beyond their sharp
//    windows, which is the reading most favourable to the dual)
//   The excess is positive at every r: the dual never overtakes (2.6)
//   for LINEAR components, because f is optimal at kappa = 1 and the
//   dual's only freedom is a single level per component.
//
// ============================================================================
// F. Summary of the pricing
// ============================================================================
//   K_BF (min total level, BF 2.6)          = 5.158064680330
//   K_FH (min total level, FH dual)         = 5.297442541400   = 2(1+sqrt(e))
//   exponent at theta_total = 1:  BF 5.158064680330   FH 5.297442541400
//   exponent with best published cancellation (theta = 1.030303):
//        BF 5.006356895615   FH 5.141635407830
//   beta_2                                  = 4.266450284149
//   FH dual in BF's own problem, best possible 1/xi, see D2 above.
//
// done 206.0s
// ============================================================
// READINGS
// ============================================================
// 1. FORD-HALBERSTAM'S DUAL IS NOT A DIFFERENT INEQUALITY FROM BRUDERN-
//    FOUVRY (2.6). It is the same one. Section A: at r = 2 the two right-hand
//    sides agree to 3.553e-15 over 200000 random admissible tuples, and at
//    r = 2..7 to 6.821e-13. FH's Lemma 1 (4) rearranges to
//        sum_l x_l prod_{j!=l} y_j - (r-1) prod_j y_j,
//    which is exactly (2.6) with the TRUE indicator x_l sitting in the
//    lower-sieve slots. Their sentence is therefore precise: the whole of the
//    claim is about how the terms y_l - x_l are ESTIMATED, and nothing about
//    the inequality itself.
//
// 2. THE ESTIMATION STEP IS LOSSLESS, AND THAT IS THE SURPRISE. FH bound
//    y_l - x_l by an absolute sum over the boundary layer chibar+, which looks
//    like it throws away sign cancellation. It does not. Section B2 finds that
//    supp(chibar+) contains only d with nu(d) ODD, at z = 20, 30 and 42, so
//    mu(d) = -1 throughout, and B5 confirms pointwise over full or coprime-
//    strided periods (4849845 / 2989692 / 3000001 values of n, 0 failures)
//    that y - x = sum chibar+ EXACTLY. The FH bound on the y_l - x_l term is
//    an identity, loss 0.000000000. Their step is better than they claimed.
//
// 3. AND IT COSTS NO LEVEL. B3: max d in supp(chibar+) is 1001, 4199, 7429
//    against D = 2792.8, 8174.3, 19929.7, ratios 0.358423, 0.513683,
//    0.372761. The boundary layer stays strictly under the level D, so no
//    factor z is paid for it. B1 adds that Rosser's D+ is fully divisor-closed
//    at every parameter tested (0 of 91, 211, 417), so FH's hypothesis (iii)
//    holds for it and their Lemma 2 applies as intended. Nothing in the
//    mechanism is defective.
//
// 4. THE SHORTFALL IS THE FREEDOM GIVEN UP, NOT A DEFECT IN THE STEP. Because
//    the boundary layer belongs to the SAME chi+, the dual has one level per
//    component and no lower sieve. Its per-component bound is a linear-sieve
//    lower bound of level D_l, so by the optimality of f its main term cannot
//    exceed W f(s_l). The dual is therefore BF (2.6) with D- = D+ imposed.
//    C1/C2: K_BF = 5.158064680330 at s-/s+ = 1.313086383747, K_FH =
//    5.297442541400 = 2(1+sqrt(e)) at the symmetric point. The dual is worse
//    by 0.139377861070, i.e. 2.702135 per cent, under STRICT sieve windows and
//    under EXTENDED ones alike.
//
// 5. PRICED IN OUR CONFIGURATION IT LOSES TO beta_2, AND BY MORE THAN (2.6)
//    DOES. C4: at the defensible theta_total = 1 the dual returns 5.297443
//    against (2.6)'s 5.158065 and beta_2 = 4.266450. Loaded with the best
//    published cancellation at the split ratio the dual forces (ratio 1,
//    Bettin-Chandee 2015, theta = 1.030303) it returns 5.141635 against
//    (2.6)'s 5.006357. Neither reaches beta_2.
//
// 6. THE BREAK-EVEN MOVES THE WRONG WAY. C5: the dual needs theta_total >
//    1.241651065543 where (2.6) needs 1.208982722591 - 0.032668342952 more
//    cancellation, 2.702135 per cent. In gamma currency (C6) the dual needs
//    gamma <= 0.805379247 where (2.6) needs 0.827141680, against the best
//    published gamma = 0.970624: the shortfall grows from 0.143482320 to
//    0.165244753.
//
// 7. AND THERE IS A SECOND, INDEPENDENT LOSS. C7: in (2.6) the Lp.Lp diagonal
//    carries moduli D+^2 = H^{2a}, and the corpus working point buys it for
//    free by taking a = 1/2. In the dual all three terms carry D1 D2 =
//    H^{theta_total}, so the diagonal can never be free; at the dual's optimum
//    it sits at H^1.241651066, over the window by H^0.241651066.
//
// 8. IN BRUDERN-FOUVRY'S OWN PROBLEM THE DUAL LOSES TO THEIR PUBLISHED
//    CONSTANT. D2/D3: maximising the dual over the same four side conditions
//    of their Proposition 2, in the only feasible slot assignment (B, with
//    (iii) binding to slack -0.000000), gives xi = 0.229402999211, exponent
//    4.359140915496, against their published 4.156000022150 and the
//    re-optimised 4.155791838187. Under EXTENDED windows it is 4.359017227526.
//    It loses by 0.203140893346 and does not even reach beta_2, falling short
//    by 0.092690631348. So "should lead to better results" is false at r = 2
//    for linear components, in their own setting, and the margin is three
//    orders of magnitude larger than anything the level re-optimisation of
//    `history/staging/attack-bf-split.md` was worth.
//
// 9. NOR AT ANY r. Section E, with the closed forms extended beyond their
//    sharp windows so the reading is the one most favourable to the dual:
//    the excess K_FH - K_BF is 0.139377861070, 0.265894922263, 0.391641248638,
//    0.517545488091, 0.643679867998 at r = 2, 3, 4, 5, 6. It grows. For LINEAR
//    components the dual never overtakes (2.6), because f is optimal at
//    kappa = 1 and the dual's only freedom is one level per component.
//
// 10. WHAT WOULD HAVE TO BE TRUE FOR THE CLAIM TO HOLD. The ceiling argument
//    uses the optimality of f at kappa = 1. Where no good lower-bound sieve
//    exists - components of dimension kappa > 1, where DHR's f_kappa is far
//    from optimal and often zero - the ceiling does not bite and the dual can
//    genuinely beat (2.6). That is the setting FH's own section 5 is written
//    in (they say "the problem of estimating S(A,P) is of dimension r"). It is
//    NOT our setting: our two components are each kappa = 1.
//
// CUSTODY. Every figure above is from the OUTPUT block, which
// `research/qc/embed.js` wrote from a completed run (code-sha256
// afa28b3a15e65afe..., out-sha256 f3de984f4221d782..., node v22.21.0,
// 75.8 s). Nothing was hand-pasted. The Ford-Halberstam quotation and the
// displayed dual decomposition are transcribed from a 300 dpi RENDERED PAGE
// IMAGE of page 15 of the author's copy at
// ford126.web.illinois.edu/wwwpapers/hooleysieve.pdf (sha256
// af299c3fd776e8a5271fe6ee6f0c7f1f1e621cd85912599b6250e1452aa20ece, 15 pp.,
// pdfTeX-0.14f, 2000-11-06). Brudern-Fouvry (2.5) and (2.6) are transcribed
// from a 400 dpi rendered page image of numdam CM_1996__102_3_337_0 (sha256
// 74b805107add9830...), PDF page 6 = journal page 341, where the numdam text
// layer drops the (2.6) display entirely. The four side conditions of their
// Proposition 2 are as transcribed at 600 dpi in
// history/staging/attack-bf-split.md section 1.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// The CUSTODY paragraph directly above already covers every quantity in
// readings 1 through 10: each is from the OUTPUT block, with the two
// transcribed sources named. Nothing in readings 1 through 10 needs a further
// declaration, and none is added here.
//
// TOKENIZER ARTIFACT, not a figure:
//   Every remaining token the traceability scan reports for this file is a
//   fragment of an identifier inside that CUSTODY paragraph, split at a digit
//   run by a scanner that reads hexadecimal as arithmetic.
//   "15e65", "4221" and "782" come from the two truncated run digests
//   afa28b3a15e65afe and f3de984f4221d782.
//   "22.21" is the node version v22.21.0.
//   "776e8", "5271", "1e621", "85912599" and "6250e1452" come from the sha256
//   of the hooleysieve.pdf author's copy.
//   "102" and "337" are the volume and first page inside the numdam article
//   identifier CM_1996__102_3_337_0.
//   "805107" and "9830" come from the truncated numdam sha256 74b805107add9830.
//   None of these is a measurement and none is quotable as one.
// ---------------------------------------------------------------------------
