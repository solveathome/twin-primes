#!/usr/bin/env node
// ============================================================================
// ATTACK SQRT-CANCELLATION — the 35% of square-root cancellation, written out
// as an exact bilinear sum and priced against the published bounds that own it.
// ============================================================================
// WHAT THIS IS FOR. `research/history/staging/attack-theta-last-gap.md` §6
// prices the last 0.209 of theta_total: the break-even against beta_2 does not
// need square-root cancellation, it needs gamma <= 0.824975 against a trivial
// exponent of 1, i.e. about 35 per cent of square root, in the bilinear
// remainder. This script (i) writes that remainder down as an exponential sum
// with every quantifier fixed, (ii) VERIFIES the algebraic reduction that turns
// it into a Kloosterman-fraction form, (iii) evaluates the published bounds of
// Duke-Friedlander-Iwaniec 1997 and Bettin-Chandee 2015 IN OUR CONFIGURATION
// and reports the gamma each gives, and (iv) measures the true size of the
// resulting trilinear Kloosterman-fraction sum at toy scale.
//
// THE SIX SECTIONS.
//
// (A) THE SUM, AS NUMBERS. Working point, modulus ranges, the Fourier
//     truncation length, the L2 norms, the trivial bound, the needed gamma, and
//     the size of the window position x relative to H.
//
// (B) THE ALGEBRAIC REDUCTION, VERIFIED EXACTLY IN BigInt. The CRT point of the
//     pair (d1 | n, d2 | n+2) inside a window at position w satisfies
//        c_w / (d1 d2)  ==  -w * inv(d2) mod d1 / d1  -  (w+2) * inv(d1) mod d2 / d2   (mod 1)
//                       ==  -w / (d1 d2)  -  2 * inv(d1) mod d2 / d2                   (mod 1)
//     so the remainder is a bilinear form in (d1,d2) whose phase splits into a
//     Kloosterman fraction with numerator 2h and a window factor e(-h w/(d1d2)).
//     At w = 0 mod d1 d2 the window factor is 1 and NOTHING depends on w.
//
// (C) THE PUBLISHED BOUNDS, IN OUR EXPONENTS. DFI 1997 (1.1) and Bettin-Chandee
//     2015 Theorem 1, both read from the arXiv PDF of 1502.00769 (pp. 1-2),
//     evaluated at our M, N, A. Reports the exponent, gamma, the saving as a
//     percentage of square root, and the largest theta_total each supports.
//
// (D) FEASIBILITY. Minimise the vector-sieve threshold u over splits (a,b)
//     subject to the Bettin-Chandee constraint, and compare with beta_2.
//
// (E) WHAT WOULD SUFFICE. The (kappa, lambda) frontier: which exponents in a
//     bound of shape ||a|| ||b|| ||v|| (AMN)^kappa (M+N)^lambda reach the
//     break-even, and how far 7/20 and 1/4 are from it.
//
// (F) THE SUM MEASURED. The trilinear Kloosterman-fraction form built on the
//     ACTUAL smooth squarefree supports at the working point, with mu as the
//     weight stand-in, evaluated exactly (the h-sum in closed form), for a
//     ladder of z. Reports the measured exponent against the trivial 1, the
//     Bettin-Chandee prediction, and the needed 0.824975.
// ============================================================================
'use strict';

const B2 = 4.26645028414864191641;          // DHR sifting limit at kappa = 2
const fx = (n, k = 6) => n.toFixed(k);
const line = s => console.log(s);
const rule = () => console.log('-'.repeat(76));

// --- the vector-sieve threshold, re-derived here, nothing inherited ---------
const uth = (a, b) => (1 + Math.exp(b / (2 * a))) / b;
const Gr = r => (1 + Math.exp(r / 2)) * (1 + 1 / r);
let lo = 0.2, hi = 6.0;
for (let i = 0; i < 400; i++) { const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3; if (Gr(m1) < Gr(m2)) hi = m2; else lo = m1; }
const RHO = (lo + hi) / 2, K = Gr(RHO);
function minTheta(amax) {
  let bt = Infinity, ba = 0, bb = 0;
  for (let a = 0.05; a <= amax + 1e-12; a += 1e-5) {
    let mb = 0, mv = Infinity;
    for (let b = 0.05; b < 3; b += 1e-4) { const v = uth(a, b); if (v < mv) { mv = v; mb = b; } }
    if (mv > B2) continue;
    let l = 0.001, h = mb;
    for (let i = 0; i < 200; i++) { const m = (l + h) / 2; if (uth(a, m) > B2) l = m; else h = m; }
    if (a + h < bt) { bt = a + h; ba = a; bb = h; }
  }
  return [bt, ba, bb];
}
const [T0, A0, B0] = minTheta(5.0);        // unconstrained break-even
const [T1, A1, B1] = minTheta(0.5);        // diagonal forced inside the window

line('='.repeat(76));
line('A. THE SUM, WITH EVERY QUANTIFIER FIXED');
rule();
line('  FIXED  : z >= 2 ; P(z) = product of odd primes p < z ; H = z^beta_2 ; the shift 2.');
line('  FIXED  : lambda+ , lambda- the Rosser-Iwaniec linear-sieve weights, |lambda| <= 1,');
line('           supported on squarefree d | P(z), of levels D+ = H^a and D- = H^b.');
line('  FOR ALL: x, the window position. The window is the H integers (x, x+H].');
line('  SUMMED : d1 <= D+ and d2 <= D- , both dividing P(z). (d1,d2) = 1 is automatic:');
line('           g | n and g | n+2 with g odd forces g = 1, so pairs with a common');
line('           factor carry no term at all.');
line('  THE SUM: R(x) = sum_{d1,d2} lambda^A_{d1} lambda^B_{d2} r_{d1,d2}(x),');
line('           r_{d1,d2}(x) = #{ n in (x, x+H] : d1 | n , d2 | n+2 } - H/(d1 d2).');
line('  NEEDED : sup_x |R(x)| << H / log^3 H, for (A,B) in {(-,+),(+,-)} .');
line('');
line(`  break-even theta_total, re-derived : ${fx(T0, 6)}  at a = ${fx(A0, 6)}, b = ${fx(B0, 6)}`);
line(`  with the (+,+) diagonal forced inside the window (a = 1/2) : theta = ${fx(T1, 6)}, b = ${fx(B1, 6)}`);
line(`  invariant theta*u = K = ${fx(K, 10)} at b/a = ${fx(RHO, 10)} ; break-even = K/beta_2 = ${fx(K / B2, 10)}`);
line('');
const TH = T1, AA = A1, BB = B1;            // the working point, theta = 1.212157
line('  THE WORKING POINT (the levels at which the lemma is needed, diagonal free):');
line(`     D+ = H^${fx(AA, 6)}        D- = H^${fx(BB, 6)}        theta_total = ${fx(TH, 6)}`);
line(`     modulus product m = d1 d2 <= H^${fx(TH, 6)}  --  LONGER THAN THE WINDOW by H^${fx(TH - 1, 6)}`);
line(`     pair count P = H^${fx(TH, 6)} ; requirement |R| << H ; so gamma = log|R|/log P <= ${fx(1 / TH, 6)}`);
line(`     saving needed H^${fx(TH - 1, 6)} ; square-root saving H^${fx(TH / 2, 6)} ;`);
line(`     needed / square root = ${fx(100 * (TH - 1) / (TH / 2), 1)} per cent  <- the target of this attack`);
line('');
line('  THE FOURIER TRUNCATION IS FREE, AND THAT IS WHY THE h-SUM COSTS NOTHING.');
line('  For m > H the class (x, x+H] holds 0 or 1 point, so the sawtooth needs');
line('  harmonics up to h ~ m/H and its coefficients are flat at H/m there:');
line(`     A := h-range = m/H <= H^${fx(TH - 1, 6)} ;  |c_h| ~ H/m = A^{-1}`);
line(`     ||nu|| = (A * A^{-2})^{1/2} = A^{-1/2} = H^${fx(-(TH - 1) / 2, 6)}`);
line(`     ||alpha|| ||beta|| ||nu|| (A M N)^{1/2} = M N = H^${fx(TH, 6)} exactly = the trivial bound.`);
line('  So an L2-normalised trilinear bound is directly comparable with the pair count,');
line('  with no bookkeeping loss, and the whole h-sum is worth O(log H).');
line('');
line('  THE SUPPORT IS SPARSE BY A CONSTANT, NOT BY A POWER. attack-theta-margin.js §F');
line('  measures #smooth<=D+ / D+ = 0.0695 and #smooth<=D- / D- = 0.0100 at z = 307,');
line('  both still rising: Dickman rho(u*a), rho(u*b) at FIXED u*a = 2.13, u*b = 3.04.');
line('  So ||alpha||^2 = c1 M and ||beta||^2 = c2 N with c1, c2 > 0 and no exponent is');
line('  bought from the sieve support.');
line('');
line('  HOW BIG IS x. The certificate is needed at every position up to P(z), and');
line('  log P(z) = theta(z) ~ z, NOT log z (research/qc/units.js §1). So');
line('     log x / log H  ~  z / (beta_2 log z)  ->  infinity ,   i.e.  x ~ exp(H^{1/beta_2}).');
const zs = [31, 101, 307, 1009];
line('     z      log H        log x_max ~ z     ratio');
for (const z of zs) {
  const lnH = B2 * Math.log(z);
  line(`   ${String(z).padStart(5)}   ${fx(lnH, 3).padStart(9)}   ${String(z).padStart(9)}       ${fx(z / lnH, 3)}`);
}
line('  This is the number that decides which published theorems can even be quoted:');
line('  every bound in this family carries the numerator of the Kloosterman fraction');
line('  in its statement, and our numerator is h*x.');

line('');
line('='.repeat(76));
line('B. THE ALGEBRAIC REDUCTION, VERIFIED EXACTLY (BigInt, no floating point)');
rule();
line('  CLAIM 1. c_w = the least n-offset j in [0, d1 d2) with j = -w mod d1, j = -w-2 mod d2.');
line('           Then  c_w/(d1 d2)  =  -w/(d1 d2) - 2*inv(d1 mod d2)/d2   (mod 1).');
line('  CLAIM 2. the window count is  floor((H - c_w)/m) + 1  when 1 <= c_w <= H, and 0');
line('           otherwise (and floor(H/m) when c_w = 0); so it is 0 or 1 once m > H.');
line('  CLAIM 3. at w = 0 (mod m) the whole w-dependence disappears and the phase is');
line('           the pure Kloosterman fraction e(-2h * inv(d1)/d2).');
function egcd(a, b) { if (b === 0n) return [a, 1n, 0n]; const [g, x, y] = egcd(b, a % b); return [g, y, x - (a / b) * y]; }
function inv(a, m) { if (m === 1n) return 0n; const [g, x] = egcd(((a % m) + m) % m, m); if (g !== 1n) return null; return ((x % m) + m) % m; }
function crtPoint(w, d1, d2) {           // least j >= 0 with j = -w (d1), j = -w-2 (d2)
  const m = d1 * d2;
  const a1 = ((-w) % d1 + d1) % d1, a2 = ((-w - 2n) % d2 + d2) % d2;
  const t = ((a2 - a1) * inv(d1 % d2, d2)) % d2;
  const j = (a1 + d1 * ((t % d2 + d2) % d2)) % m;
  return j;
}
let c1ok = 0, c1bad = 0, c2ok = 0, c2bad = 0, c3ok = 0, c3bad = 0, tested = 0;
const smallOdd = [3n, 5n, 7n, 11n, 13n, 17n, 19n];
let sd = 1234567n;
const nextR = () => { sd = (sd * 6364136223846793005n + 1442695040888963407n) & ((1n << 62n) - 1n); return sd >> 20n; };
for (let trial = 0; trial < 3000; trial++) {
  // build a coprime pair of squarefree products of the small odd primes
  let d1 = 1n, d2 = 1n;
  for (const p of smallOdd) { const r = Number(nextR() % 3n); if (r === 0) d1 *= p; else if (r === 1) d2 *= p; }
  if (d1 === 1n || d2 === 1n) continue;
  const m = d1 * d2;
  const w = nextR() % (m * 7n);
  tested++;
  // CLAIM 1: c_w/m  ==  (-w/m - 2*inv(d1)/d2)  mod 1 , compared as exact rationals over m
  const j = crtPoint(w, d1, d2);
  const rhs = ((((-w % m) + m) % m) + m - (2n * inv(d1 % d2, d2) * d1) % m) % m;
  if (j === rhs) c1ok++; else c1bad++;
  // CLAIM 2: brute-force count in a window against the closed form, window kept short
  const Hh = m < 4000n ? m / 3n + 5n : 3000n;
  let brute = 0n;
  for (let n = w + 1n; n <= w + Hh; n++) if (n % d1 === 0n && (n + 2n) % d2 === 0n) brute++;
  // n in (w, w+Hh] with n = w + j' , j' = j (mod m) , j' >= 1
  const closed = j === 0n ? Hh / m : (Hh >= j ? (Hh - j) / m + 1n : 0n);
  if (brute === closed) c2ok++; else c2bad++;
  // CLAIM 3: w = 0 mod m gives the pure Kloosterman fraction
  const j0 = crtPoint(0n, d1, d2);
  const kl = ((m - (2n * inv(d1 % d2, d2) * d1) % m) % m);
  if (j0 === kl) c3ok++; else c3bad++;
}
line('');
line(`  pairs tested (random squarefree coprime products of odd primes < 20) : ${tested}`);
line(`  CLAIM 1  c_w/m = -w/m - 2 inv(d1)/d2 (mod 1)   : ${c1ok} exact, ${c1bad} failures`);
line(`  CLAIM 2  closed-form window count = brute force : ${c2ok} exact, ${c2bad} failures`);
line(`  CLAIM 3  w = 0 mod m gives the pure fraction    : ${c3ok} exact, ${c3bad} failures`);
line('');
line('  CONSEQUENCE, and it is the whole point of this section:');
line('     R(x) = sum_{0<|h|<=A} c_h * sum_{d1,d2} lam lam * e(-h x/(d1 d2)) * e(-2h inv(d1)/d2)');
line('  The Kloosterman-fraction factor carries numerator 2h <= 2 H^{theta-1}, which is');
line('  SMALL. All of the position dependence is the single factor e(-h x/(d1 d2)), and');
line('  at the positions x = 0 mod d1 d2 it is identically 1. Those positions exist for');
line('  every z (take x = 0, or any multiple of P(z)^2), so');
line('     A BOUND ON THE PURE TRILINEAR KLOOSTERMAN-FRACTION SUM IS NECESSARY,');
line('     AND THE PUBLISHED THEOREMS APPLY TO IT VERBATIM.');

line('');
line('='.repeat(76));
line('C. THE PUBLISHED BOUNDS, EVALUATED IN OUR CONFIGURATION');
rule();
line('  Both read from the arXiv PDF of 1502.00769 (Bettin-Chandee), pp. 1-2:');
line('    DFI 1997, quoted there as (1.1):');
line('      B_a(M,N) << ||alpha|| ||beta|| (a + MN)^{3/8} (M+N)^{11/48+eps}');
line('    Bettin-Chandee 2015, Theorem 1:');
line('      B(M,N,A) << ||alpha|| ||beta|| ||nu|| (1 + |t|A/MN)^{1/2}');
line('                  * [ (AMN)^{7/20+eps}(M+N)^{1/4} + (AMN)^{3/8+eps}(AN+AM)^{1/8} ]');
line('  In our configuration m = d1 (the inverted variable, size M = H^a) and');
line('  n = d2 (the modulus, size N = H^b), A = MN/H, |t| = 2, so |t|A/MN = 2/H = O(1).');
line('');
// exponents, in units of log H
const nrm = (a, b) => 0.5;                              // ||a||||b||||v|| = (MN/A)^{1/2} = H^{1/2}
const E_BC = (a, b) => {
  const th = a + b, mx = Math.max(a, b), A = th - 1;
  const t1 = nrm(a, b) + (7 / 20) * (A + th) + (1 / 4) * mx;
  const t2 = nrm(a, b) + (3 / 8) * (A + th) + (1 / 8) * (A + mx);
  return Math.max(t1, t2);
};
const E_DFI = (a, b) => {                                // a-fixed: |c_h| summed trivially over h
  const th = a + b, mx = Math.max(a, b);
  return 0.5 * th + (3 / 8) * th + (11 / 48) * mx;       // ||a||||b|| (MN)^{3/8} (M+N)^{11/48}
};
const E_TRIV = (a, b) => a + b;
const E_SQRT = (a, b) => (a + b) / 2;
const cands = [
  ['trivial, |r| <= 1', E_TRIV],
  ['DFI 1997 (1.1)', E_DFI],
  ['Bettin-Chandee 2015 Thm 1', E_BC],
  ['square-root cancellation', E_SQRT],
];
line('  At the working point a = ' + fx(AA, 6) + ', b = ' + fx(BB, 6) + ', theta = ' + fx(TH, 6) + ' :');
line('   bound                        exponent of H   gamma      saving H^   % of sqrt   verdict');
for (const [nm, F] of cands) {
  const e = F(AA, BB), g = e / TH, sav = TH - e, pct = 100 * sav / (TH / 2);
  const verdict = e <= 1 + 1e-12 ? 'SUFFICES' : (e < TH - 1e-12 ? 'nontrivial, short' : 'no saving');
  line(`   ${nm.padEnd(28)} ${fx(e, 6).padStart(9)}   ${fx(g, 6)}   ${fx(sav, 6)}   ${fx(pct, 2).padStart(8)}   ${verdict}`);
}
line(`   ${'NEEDED'.padEnd(28)} ${fx(1, 6).padStart(9)}   ${fx(1 / TH, 6)}   ${fx(TH - 1, 6)}   ${fx(100 * (TH - 1) / (TH / 2), 2).padStart(8)}   --`);
line('');
line('  DFI IS WORSE THAN TRIVIAL HERE, AND THE REASON IS THE UNBALANCE. DFI beats');
line('  ||alpha||||beta||(MN)^{1/2} exactly when (M+N)^{11/48} < (MN)^{1/8}, i.e. when');
line('  b/a < 6/5 = 1.2 with b > a. Our splits:');
line(`     unconstrained optimum b/a = ${fx(B0 / A0, 6)} ;  diagonal-free b/a = ${fx(BB / AA, 6)} ;  DFI needs < 1.2`);
line('  Bettin-Chandee has no such restriction and does save here, by');
line(`     H^${fx(TH - E_BC(AA, BB), 6)} = ${fx(100 * (TH - E_BC(AA, BB)) / (TH / 2), 2)} per cent of square root, against the ${fx(100 * (TH - 1) / (TH / 2), 1)} per cent needed.`);
line('');
line('  THE LARGEST theta_total EACH BOUND SUPPORTS. Requirement: exponent <= 1.');
line('  (theta_total is what the vector sieve is allowed to run at; the trivial answer');
line('  is 1 and the break-even is ' + fx(T0, 6) + '.)');
function maxTheta(F, ratio) {
  let l = 0.5, h = 4.0;
  for (let i = 0; i < 200; i++) { const m = (l + h) / 2; const a = m / (1 + ratio), b = m * ratio / (1 + ratio); if (F(a, b) <= 1) l = m; else h = m; }
  return l;
}
line('   bound                        balanced b/a = 1     optimal split b/a = ' + fx(RHO, 4));
for (const [nm, F] of cands) {
  line(`   ${nm.padEnd(28)} ${fx(maxTheta(F, 1), 6).padStart(12)}       ${fx(maxTheta(F, RHO), 6).padStart(12)}`);
}
line(`   ${'NEEDED (break-even)'.padEnd(28)} ${fx(K / B2 * 1, 6).padStart(12)}       ${fx(T0, 6).padStart(12)}`);
line('   (a balanced split is not free: at b/a = 1 the threshold constant is');
line(`   2(1+sqrt e) = ${fx(2 * (1 + Math.exp(0.5)), 6)} and the break-even theta rises to ${fx(2 * (1 + Math.exp(0.5)) / B2, 6)}.)`);
line('');
line('  POSITION-UNIFORMITY IS PRICED, NOT FREE, AND BETTIN-CHANDEE PRICE IT THEMSELVES.');
line('  Their Remark 1 (same PDF, p. 2) admits a perturbed phase f(x,y) with');
line('  d/dx f << X/(x^2 y) and d/dy f << X/(x y^2), at the cost of replacing');
line('  (1+|t|A/MN)^{1/2} by (1 + (|t|A + X)/MN)^{1/2}. Our window factor');
line('  e(-h x/(d1 d2)) is EXACTLY that shape, with X = h*x. So the published');
line('  theorem covers the position-uniform sum verbatim, and charges');
line('     (1 + h x / MN)^{1/2} ,  which is < 2 only while  x << H^theta / h.');
const xcap = TH;
line(`     x << H^${fx(xcap, 6)} : covered.   x ~ exp(H^{1/beta_2}) : the factor is exp(H^{${fx(1 / B2, 4)}}/2).`);
line('  The gap is therefore not only an exponent. It is an exponent AND a quantifier,');
line('  and the quantifier gap is the larger of the two.');

line('');
line('='.repeat(76));
line('D. FEASIBILITY: WHAT EXPONENT DOES BETTIN-CHANDEE ACTUALLY BUY');
rule();
function bestU(F) {
  let bu = Infinity, ba = 0, bb = 0;
  const scan = (a0, a1, b0, b1, st) => {
    for (let a = a0; a <= a1; a += st) for (let b = Math.max(a, b0); b <= b1; b += st) {
      if (F(a, b) > 1) continue;
      const u = uth(a, b);
      if (!(u * a >= 1 && u * a <= 3 && u * b >= 2)) continue;  // linear-sieve validity
      if (u < bu) { bu = u; ba = a; bb = b; }
    }
  };
  scan(0.05, 1.6, 0.05, 2.2, 5e-3);
  if (bu < Infinity) scan(Math.max(0.01, ba - 6e-3), ba + 6e-3, Math.max(0.01, bb - 6e-3), bb + 6e-3, 5e-5);
  return [bu, ba, bb];
}
for (const [nm, F] of cands) {
  const [u, a, b] = bestU(F);
  const verdict = u < B2 ? '*** BEATS beta_2 ***' : 'worse than beta_2 = ' + fx(B2, 6);
  line(`  ${nm.padEnd(28)} best u = ${fx(u, 6)}  at a = ${fx(a, 4)}, b = ${fx(b, 4)}, theta = ${fx(a + b, 6)}   ${verdict}`);
}
line('');
line('  Read this row by row. Absolute values give 5.158065, which is worse than the');
line('  beta-sieve 4.266450 we already have, so the vector sieve is not competitive at');
line('  theta_total = 1. Bettin-Chandee moves it a little and not nearly enough. Only a');
line('  bound at the square-root benchmark makes the route pay.');

line('');
line('='.repeat(76));
line('E. WHAT WOULD SUFFICE: THE (kappa, lambda) FRONTIER');
rule();
line('  Suppose a theorem of the shape  ||alpha||||beta||||nu|| (AMN)^kappa (M+N)^lambda .');
line('  With A = MN/H the requirement exponent <= 1 reads, at split ratio r = b/a,');
line('     1/2 + kappa(2 theta - 1) + lambda * theta * r/(1+r)  <=  1 .');
function thetaOf(kap, lam, r) { const mx = r / (1 + r); return (0.5 + kap) / (2 * kap + lam * mx); }
line('');
line('   kappa   lambda      theta at b/a = 1    theta at b/a = ' + fx(RHO, 3) + '     source');
line('   (the DFI row is its exponents FORCED into this shape; DFI has no h-average,');
line('    so its true value is the 1.010526 that §C computes from its own statement.)');
const rows = [
  [3 / 8, 11 / 48, 'DFI 1997'],
  [7 / 20, 1 / 4, 'Bettin-Chandee 2015'],
  [1 / 4, 1 / 4, 'hypothetical'],
  [1 / 4, 0, 'hypothetical'],
  [0, 0, 'pure L2 / random signs'],
];
for (const [kap, lam, src] of rows)
  line(`   ${fx(kap, 4)}  ${fx(lam, 4)}      ${fx(thetaOf(kap, lam, 1), 6).padStart(10)}        ${fx(thetaOf(kap, lam, RHO), 6).padStart(10)}     ${src}`);
line('');
{
  const lam = 1 / 4, target = T0, mx = RHO / (1 + RHO);
  const kap = (0.5 - target * lam * mx) / (2 * target - 1);
  line(`  Holding lambda = 1/4 and asking for theta = ${fx(target, 6)} at the optimal split needs`);
  line(`     kappa <= ${fx(kap, 6)} , against Bettin-Chandee's 7/20 = ${fx(7 / 20, 6)} and DFI's 3/8 = ${fx(3 / 8, 6)}.`);
  line(`     That is a further ${fx(100 * (7 / 20 - kap) / (7 / 20), 1)} per cent reduction of the main exponent,`);
  line(`     on top of the ${fx(100 * (3 / 8 - 7 / 20) / (3 / 8), 1)} per cent that Bettin-Chandee already took off DFI.`);
  const lam2 = 1 / 4, k2 = 1 / 4;
  line(`  For scale: kappa = 1/4 with lambda = 1/4 gives theta = ${fx(thetaOf(k2, lam2, 1), 6)} at b/a = 1,`);
  line(`     which is ${fx(2 * (1 + Math.exp(0.5)) / B2 - thetaOf(k2, lam2, 1), 6)} short of the balanced break-even ${fx(2 * (1 + Math.exp(0.5)) / B2, 6)}.`);
}

line('');
line('='.repeat(76));
line('F. THE SUM MEASURED ON THE ACTUAL SUPPORTS');
rule();
line('  The object of §B at the aligned positions, built on the real smooth squarefree');
line('  supports and evaluated exactly (the h-sum is a geometric series in closed form):');
line('     B(z) = (1/A) sum_{h=1}^{A} sum_{d1 <= D+} sum_{d2 <= D-, (d1,d2)=1} mu(d1) mu(d2)');
line('            e(-2h * inv(d1 mod d2) / d2)   with d1, d2 | P(z) squarefree.');
line('  mu is a STAND-IN for the Rosser weights: same support shape, same size, and it');
line('  is stated as a surrogate, not as the sieve. The trivial bound is the pair count.');
line('');
function oddPrimesBelow(n) { const s = new Uint8Array(n).fill(1); for (let i = 2; i * i < n; i++) if (s[i]) for (let j = i * i; j < n; j += i) s[j] = 0; const o = []; for (let i = 3; i < n; i += 2) if (s[i]) o.push(i); return o; }
function divisorsUpTo(ps, lim) {           // squarefree products of ps that are <= lim, with a parity mask
  const out = [];
  (function rec(i, v, k) {
    out.push([v, k & 1 ? -1 : 1]);
    for (let j = i; j < ps.length; j++) { const q = v * ps[j]; if (q > lim) continue; rec(j + 1, q, k + 1); }
  })(0, 1, 0);
  return out;
}
function invInt(a, m) { let g = a % m, x = 0, x1 = 1, m0 = m; if (g < 0) g += m; let r = m; while (g) { const q = Math.floor(r / g); [r, g] = [g, r - q * g]; [x, x1] = [x1, x - q * x1]; } if (r !== 1) return -1; return ((x % m0) + m0) % m0; }
function gcd(a, b) { while (b) { [a, b] = [b, a % b]; } return a; }
line('   z      H         D+        D-       #d1    #d2     pairs      |B|       gamma_meas   BC pred   BC gamma');
const meas = [];
for (const z of [19, 23, 29, 31, 37, 41, 43]) {
  const H = Math.pow(z, B2), DP = Math.pow(H, AA), DM = Math.pow(H, BB);
  const A = Math.max(1, Math.round(DP * DM / H));
  const ps = oddPrimesBelow(z);
  const S1 = divisorsUpTo(ps, DP).filter(([v]) => v > 1);
  const S2 = divisorsUpTo(ps, DM).filter(([v]) => v > 1);
  let re = 0, im = 0, pairs = 0;
  for (const [d2, m2] of S2) {
    if (d2 < 3) continue;
    for (const [d1, m1] of S1) {
      if (gcd(d1, d2) !== 1) continue;
      pairs++;
      const t = invInt(d1 % d2, d2);
      if (t < 0) continue;
      const th = -2 * t / d2;               // the phase per unit h
      const fr = th - Math.floor(th);
      let sr, si;
      if (Math.abs(fr) < 1e-15 || Math.abs(fr - 1) < 1e-15) { sr = A; si = 0; }
      else {
        // sum_{h=1..A} e(h*fr) = e(fr)(e(A fr)-1)/(e(fr)-1)
        const den_r = Math.cos(2 * Math.PI * fr) - 1, den_i = Math.sin(2 * Math.PI * fr);
        const nr = Math.cos(2 * Math.PI * (A + 1) * fr) - Math.cos(2 * Math.PI * fr);
        const ni = Math.sin(2 * Math.PI * (A + 1) * fr) - Math.sin(2 * Math.PI * fr);
        const d = den_r * den_r + den_i * den_i;
        sr = (nr * den_r + ni * den_i) / d; si = (ni * den_r - nr * den_i) / d;
      }
      re += m1 * m2 * sr / A; im += m1 * m2 * si / A;
    }
  }
  const Bv = Math.hypot(re, im);
  const gm = Math.log(Bv) / Math.log(pairs);
  // Bettin-Chandee, in the same finite quantities
  const na = Math.sqrt(S1.length), nb = Math.sqrt(S2.length), nv = 1 / Math.sqrt(A);
  const bc = na * nb * nv * (Math.pow(A * DP * DM, 7 / 20) * Math.pow(DP + DM, 1 / 4)
    + Math.pow(A * DP * DM, 3 / 8) * Math.pow(A * DM + A * DP, 1 / 8));
  meas.push({ z, pairs, Bv, gm, bc });
  line(`${String(z).padStart(4)}  ${H.toExponential(2)}  ${DP.toExponential(2)}  ${DM.toExponential(2)}  ${String(S1.length).padStart(5)}  ${String(S2.length).padStart(5)}  ${String(pairs).padStart(8)}  ${Bv.toExponential(3)}   ${fx(gm, 4).padStart(8)}   ${bc.toExponential(2)}   ${fx(Math.log(bc) / Math.log(pairs), 4)}`);
}
line('');
line('  THE "BC pred" COLUMN IS VACUOUS AT THESE z AND IS PRINTED TO SHOW THAT. Its');
line('  gamma reads 1.44 to 1.86, i.e. far above the trivial 1: an asymptotic bound');
line('  with a 7/20 main exponent has nothing to say at four-digit moduli. The column');
line('  is a scale check on the arithmetic, never a test of the theorem.');
line('');
line(`  needed gamma = ${fx(1 / TH, 6)} ; trivial = 1 ; square root = 0.5 .`);
{
  let n = 0, sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (const r of meas) { const x = Math.log(r.pairs), y = Math.log(r.Bv); n++; sx += x; sy += y; sxx += x * x; sxy += x * y; }
  const t = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  line(`  fitted exponent of |B| against the pair count over this ladder : ${fx(t, 4)}`);
}
line('  THIS CANNOT ADJUDICATE ANYTHING AND IS RECORDED SO THAT NOBODY QUOTES IT AS IF IT');
line('  COULD. attack-theta-margin.js §G puts the crossover at which absolute-value');
line('  accounting is first obstructed at z between 3.87e4 and 6.34e5. Every z here is');
line('  three to five decades below that, so a small measured exponent is exactly what');
line('  an unobstructed range looks like, and says nothing about the limit.');

line('');
line('='.repeat(76));
line('SUMMARY');
rule();
line(`  needed          : gamma <= ${fx(1 / TH, 6)} , saving H^${fx(TH - 1, 6)} , ${fx(100 * (TH - 1) / (TH / 2), 1)} per cent of square root`);
line(`  best in print   : Bettin-Chandee 2015, gamma = ${fx(E_BC(AA, BB) / TH, 6)} , saving H^${fx(TH - E_BC(AA, BB), 6)} , ${fx(100 * (TH - E_BC(AA, BB)) / (TH / 2), 2)} per cent`);
line(`  fraction of the required saving delivered : ${fx(100 * (TH - E_BC(AA, BB)) / (TH - 1), 1)} per cent`);
line(`  theta_total supported : trivial 1.000000 , DFI ${fx(maxTheta(E_DFI, 1), 6)} , BC ${fx(maxTheta(E_BC, 1), 6)} , needed ${fx(T0, 6)}`);
line(`  and all of that is at the aligned positions only; Remark 1 charges (1 + h x/MN)^{1/2}`);
line(`  for uniformity in x, which at x ~ exp(H^{1/beta_2}) is not a constant.`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-sqrt-cancellation.js
//   invocation:  node research/attack-sqrt-cancellation.js
//   code-sha256: 2f3fa924e30f5079fc4f06721c0db695933121a9d4da695270b489f3b30781ad
//   out-sha256:  af65922672ac6eba7c58215c26c66af961458a4ec966e1bdead892ea52862b6f
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     100.5 s
// ============================================================================
// ============================================================================
// A. THE SUM, WITH EVERY QUANTIFIER FIXED
// ----------------------------------------------------------------------------
//   FIXED  : z >= 2 ; P(z) = product of odd primes p < z ; H = z^beta_2 ; the shift 2.
//   FIXED  : lambda+ , lambda- the Rosser-Iwaniec linear-sieve weights, |lambda| <= 1,
//            supported on squarefree d | P(z), of levels D+ = H^a and D- = H^b.
//   FOR ALL: x, the window position. The window is the H integers (x, x+H].
//   SUMMED : d1 <= D+ and d2 <= D- , both dividing P(z). (d1,d2) = 1 is automatic:
//            g | n and g | n+2 with g odd forces g = 1, so pairs with a common
//            factor carry no term at all.
//   THE SUM: R(x) = sum_{d1,d2} lambda^A_{d1} lambda^B_{d2} r_{d1,d2}(x),
//            r_{d1,d2}(x) = #{ n in (x, x+H] : d1 | n , d2 | n+2 } - H/(d1 d2).
//   NEEDED : sup_x |R(x)| << H / log^3 H, for (A,B) in {(-,+),(+,-)} .
//
//   break-even theta_total, re-derived : 1.208983  at a = 0.522670, b = 0.686313
//   with the (+,+) diagonal forced inside the window (a = 1/2) : theta = 1.212157, b = 0.712157
//   invariant theta*u = K = 5.1580646803 at b/a = 1.3130863738 ; break-even = K/beta_2 = 1.2089827226
//
//   THE WORKING POINT (the levels at which the lemma is needed, diagonal free):
//      D+ = H^0.500000        D- = H^0.712157        theta_total = 1.212157
//      modulus product m = d1 d2 <= H^1.212157  --  LONGER THAN THE WINDOW by H^0.212157
//      pair count P = H^1.212157 ; requirement |R| << H ; so gamma = log|R|/log P <= 0.824975
//      saving needed H^0.212157 ; square-root saving H^0.606079 ;
//      needed / square root = 35.0 per cent  <- the target of this attack
//
//   THE FOURIER TRUNCATION IS FREE, AND THAT IS WHY THE h-SUM COSTS NOTHING.
//   For m > H the class (x, x+H] holds 0 or 1 point, so the sawtooth needs
//   harmonics up to h ~ m/H and its coefficients are flat at H/m there:
//      A := h-range = m/H <= H^0.212157 ;  |c_h| ~ H/m = A^{-1}
//      ||nu|| = (A * A^{-2})^{1/2} = A^{-1/2} = H^-0.106079
//      ||alpha|| ||beta|| ||nu|| (A M N)^{1/2} = M N = H^1.212157 exactly = the trivial bound.
//   So an L2-normalised trilinear bound is directly comparable with the pair count,
//   with no bookkeeping loss, and the whole h-sum is worth O(log H).
//
//   THE SUPPORT IS SPARSE BY A CONSTANT, NOT BY A POWER. attack-theta-margin.js §F
//   measures #smooth<=D+ / D+ = 0.0695 and #smooth<=D- / D- = 0.0100 at z = 307,
//   both still rising: Dickman rho(u*a), rho(u*b) at FIXED u*a = 2.13, u*b = 3.04.
//   So ||alpha||^2 = c1 M and ||beta||^2 = c2 N with c1, c2 > 0 and no exponent is
//   bought from the sieve support.
//
//   HOW BIG IS x. The certificate is needed at every position up to P(z), and
//   log P(z) = theta(z) ~ z, NOT log z (research/qc/units.js §1). So
//      log x / log H  ~  z / (beta_2 log z)  ->  infinity ,   i.e.  x ~ exp(H^{1/beta_2}).
//      z      log H        log x_max ~ z     ratio
//       31      14.651          31       2.116
//      101      19.690         101       5.129
//      307      24.433         307       12.565
//     1009      29.510        1009       34.192
//   This is the number that decides which published theorems can even be quoted:
//   every bound in this family carries the numerator of the Kloosterman fraction
//   in its statement, and our numerator is h*x.
//
// ============================================================================
// B. THE ALGEBRAIC REDUCTION, VERIFIED EXACTLY (BigInt, no floating point)
// ----------------------------------------------------------------------------
//   CLAIM 1. c_w = the least n-offset j in [0, d1 d2) with j = -w mod d1, j = -w-2 mod d2.
//            Then  c_w/(d1 d2)  =  -w/(d1 d2) - 2*inv(d1 mod d2)/d2   (mod 1).
//   CLAIM 2. the window count is  floor((H - c_w)/m) + 1  when 1 <= c_w <= H, and 0
//            otherwise (and floor(H/m) when c_w = 0); so it is 0 or 1 once m > H.
//   CLAIM 3. at w = 0 (mod m) the whole w-dependence disappears and the phase is
//            the pure Kloosterman fraction e(-2h * inv(d1)/d2).
//
//   pairs tested (random squarefree coprime products of odd primes < 20) : 2655
//   CLAIM 1  c_w/m = -w/m - 2 inv(d1)/d2 (mod 1)   : 2655 exact, 0 failures
//   CLAIM 2  closed-form window count = brute force : 2655 exact, 0 failures
//   CLAIM 3  w = 0 mod m gives the pure fraction    : 2655 exact, 0 failures
//
//   CONSEQUENCE, and it is the whole point of this section:
//      R(x) = sum_{0<|h|<=A} c_h * sum_{d1,d2} lam lam * e(-h x/(d1 d2)) * e(-2h inv(d1)/d2)
//   The Kloosterman-fraction factor carries numerator 2h <= 2 H^{theta-1}, which is
//   SMALL. All of the position dependence is the single factor e(-h x/(d1 d2)), and
//   at the positions x = 0 mod d1 d2 it is identically 1. Those positions exist for
//   every z (take x = 0, or any multiple of P(z)^2), so
//      A BOUND ON THE PURE TRILINEAR KLOOSTERMAN-FRACTION SUM IS NECESSARY,
//      AND THE PUBLISHED THEOREMS APPLY TO IT VERBATIM.
//
// ============================================================================
// C. THE PUBLISHED BOUNDS, EVALUATED IN OUR CONFIGURATION
// ----------------------------------------------------------------------------
//   Both read from the arXiv PDF of 1502.00769 (Bettin-Chandee), pp. 1-2:
//     DFI 1997, quoted there as (1.1):
//       B_a(M,N) << ||alpha|| ||beta|| (a + MN)^{3/8} (M+N)^{11/48+eps}
//     Bettin-Chandee 2015, Theorem 1:
//       B(M,N,A) << ||alpha|| ||beta|| ||nu|| (1 + |t|A/MN)^{1/2}
//                   * [ (AMN)^{7/20+eps}(M+N)^{1/4} + (AMN)^{3/8+eps}(AN+AM)^{1/8} ]
//   In our configuration m = d1 (the inverted variable, size M = H^a) and
//   n = d2 (the modulus, size N = H^b), A = MN/H, |t| = 2, so |t|A/MN = 2/H = O(1).
//
//   At the working point a = 0.500000, b = 0.712157, theta = 1.212157 :
//    bound                        exponent of H   gamma      saving H^   % of sqrt   verdict
//    trivial, |r| <= 1             1.212157   1.000000   0.000000       0.00   no saving
//    DFI 1997 (1.1)                1.223840   1.009638   -0.011683      -1.93   no saving
//    Bettin-Chandee 2015 Thm 1     1.176550   0.970624   0.035608       5.88   nontrivial, short
//    square-root cancellation      0.606079   0.500000   0.606079     100.00   SUFFICES
//    NEEDED                        1.000000   0.824975   0.212157      35.00   --
//
//   DFI IS WORSE THAN TRIVIAL HERE, AND THE REASON IS THE UNBALANCE. DFI beats
//   ||alpha||||beta||(MN)^{1/2} exactly when (M+N)^{11/48} < (MN)^{1/8}, i.e. when
//   b/a < 6/5 = 1.2 with b > a. Our splits:
//      unconstrained optimum b/a = 1.313090 ;  diagonal-free b/a = 1.424315 ;  DFI needs < 1.2
//   Bettin-Chandee has no such restriction and does save here, by
//      H^0.035608 = 5.88 per cent of square root, against the 35.0 per cent needed.
//
//   THE LARGEST theta_total EACH BOUND SUPPORTS. Requirement: exponent <= 1.
//   (theta_total is what the vector sieve is allowed to run at; the trivial answer
//   is 1 and the break-even is 1.208983.)
//    bound                        balanced b/a = 1     optimal split b/a = 1.3131
//    trivial, |r| <= 1                1.000000           1.000000
//    DFI 1997 (1.1)                   1.010526           0.994933
//    Bettin-Chandee 2015 Thm 1        1.030303           1.009598
//    square-root cancellation         2.000000           2.000000
//    NEEDED (break-even)              1.208983           1.208983
//    (a balanced split is not free: at b/a = 1 the threshold constant is
//    2(1+sqrt e) = 5.297443 and the break-even theta rises to 1.241651.)
//
//   POSITION-UNIFORMITY IS PRICED, NOT FREE, AND BETTIN-CHANDEE PRICE IT THEMSELVES.
//   Their Remark 1 (same PDF, p. 2) admits a perturbed phase f(x,y) with
//   d/dx f << X/(x^2 y) and d/dy f << X/(x y^2), at the cost of replacing
//   (1+|t|A/MN)^{1/2} by (1 + (|t|A + X)/MN)^{1/2}. Our window factor
//   e(-h x/(d1 d2)) is EXACTLY that shape, with X = h*x. So the published
//   theorem covers the position-uniform sum verbatim, and charges
//      (1 + h x / MN)^{1/2} ,  which is < 2 only while  x << H^theta / h.
//      x << H^1.212157 : covered.   x ~ exp(H^{1/beta_2}) : the factor is exp(H^{0.2344}/2).
//   The gap is therefore not only an exponent. It is an exponent AND a quantifier,
//   and the quantifier gap is the larger of the two.
//
// ============================================================================
// D. FEASIBILITY: WHAT EXPONENT DOES BETTIN-CHANDEE ACTUALLY BUY
// ----------------------------------------------------------------------------
//   trivial, |r| <= 1            best u = 5.158065  at a = 0.4323, b = 0.5677, theta = 1.000000   worse than beta_2 = 4.266450
//   DFI 1997 (1.1)               best u = 5.173497  at a = 0.4505, b = 0.5487, theta = 0.999150   worse than beta_2 = 4.266450
//   Bettin-Chandee 2015 Thm 1    best u = 5.090707  at a = 0.4646, b = 0.5524, theta = 1.017000   worse than beta_2 = 4.266450
//   square-root cancellation     best u = 2.579033  at a = 0.8650, b = 1.1350, theta = 2.000000   *** BEATS beta_2 ***
//
//   Read this row by row. Absolute values give 5.158065, which is worse than the
//   beta-sieve 4.266450 we already have, so the vector sieve is not competitive at
//   theta_total = 1. Bettin-Chandee moves it a little and not nearly enough. Only a
//   bound at the square-root benchmark makes the route pay.
//
// ============================================================================
// E. WHAT WOULD SUFFICE: THE (kappa, lambda) FRONTIER
// ----------------------------------------------------------------------------
//   Suppose a theorem of the shape  ||alpha||||beta||||nu|| (AMN)^kappa (M+N)^lambda .
//   With A = MN/H the requirement exponent <= 1 reads, at split ratio r = b/a,
//      1/2 + kappa(2 theta - 1) + lambda * theta * r/(1+r)  <=  1 .
//
//    kappa   lambda      theta at b/a = 1    theta at b/a = 1.313     source
//    (the DFI row is its exponents FORCED into this shape; DFI has no h-average,
//     so its true value is the 1.010526 that §C computes from its own statement.)
//    0.3750  0.2292        1.012048          0.994213     DFI 1997
//    0.3500  0.2500        1.030303          1.009598     Bettin-Chandee 2015
//    0.2500  0.2500        1.200000          1.168371     hypothetical
//    0.2500  0.0000        1.500000          1.500000     hypothetical
//    0.0000  0.0000        Infinity          Infinity     pure L2 / random signs
//
//   Holding lambda = 1/4 and asking for theta = 1.208983 at the optimal split needs
//      kappa <= 0.231615 , against Bettin-Chandee's 7/20 = 0.350000 and DFI's 3/8 = 0.375000.
//      That is a further 33.8 per cent reduction of the main exponent,
//      on top of the 6.7 per cent that Bettin-Chandee already took off DFI.
//   For scale: kappa = 1/4 with lambda = 1/4 gives theta = 1.200000 at b/a = 1,
//      which is 0.041651 short of the balanced break-even 1.241651.
//
// ============================================================================
// F. THE SUM MEASURED ON THE ACTUAL SUPPORTS
// ----------------------------------------------------------------------------
//   The object of §B at the aligned positions, built on the real smooth squarefree
//   supports and evaluated exactly (the h-sum is a geometric series in closed form):
//      B(z) = (1/A) sum_{h=1}^{A} sum_{d1 <= D+} sum_{d2 <= D-, (d1,d2)=1} mu(d1) mu(d2)
//             e(-2h * inv(d1 mod d2) / d2)   with d1, d2 | P(z) squarefree.
//   mu is a STAND-IN for the Rosser weights: same support shape, same size, and it
//   is stated as a surrogate, not as the sieve. The trivial bound is the pair count.
//
//    z      H         D+        D-       #d1    #d2     pairs      |B|       gamma_meas   BC pred   BC gamma
//   19  2.86e+5  5.34e+2  7.68e+3     31     53       466  1.781e+0     0.0940   9.14e+4   1.8591
//   23  6.45e+5  8.03e+2  1.37e+4     47     91      1258  1.409e+0     0.0481   2.32e+5   1.7308
//   29  1.73e+6  1.32e+3  2.78e+4     71    155      3240  2.233e+0     0.0994   6.45e+5   1.6549
//   31  2.31e+6  1.52e+3  3.40e+4     89    228      6648  1.557e+1     0.3119   1.03e+6   1.5727
//   37  4.91e+6  2.21e+3  5.82e+4    123    354     14594  4.319e+0     0.1526   2.29e+6   1.5274
//   41  7.60e+6  2.76e+3  7.95e+4    156    504     28006  1.542e+1     0.2672   3.93e+6   1.4827
//   43  9.31e+6  3.05e+3  9.19e+4    184    669     46903  1.568e+1     0.2559   5.51e+6   1.4431
//
//   THE "BC pred" COLUMN IS VACUOUS AT THESE z AND IS PRINTED TO SHOW THAT. Its
//   gamma reads 1.44 to 1.86, i.e. far above the trivial 1: an asymptotic bound
//   with a 7/20 main exponent has nothing to say at four-digit moduli. The column
//   is a scale check on the arithmetic, never a test of the theorem.
//
//   needed gamma = 0.824975 ; trivial = 1 ; square root = 0.5 .
//   fitted exponent of |B| against the pair count over this ladder : 0.5485
//   THIS CANNOT ADJUDICATE ANYTHING AND IS RECORDED SO THAT NOBODY QUOTES IT AS IF IT
//   COULD. attack-theta-margin.js §G puts the crossover at which absolute-value
//   accounting is first obstructed at z between 3.87e4 and 6.34e5. Every z here is
//   three to five decades below that, so a small measured exponent is exactly what
//   an unobstructed range looks like, and says nothing about the limit.
//
// ============================================================================
// SUMMARY
// ----------------------------------------------------------------------------
//   needed          : gamma <= 0.824975 , saving H^0.212157 , 35.0 per cent of square root
//   best in print   : Bettin-Chandee 2015, gamma = 0.970624 , saving H^0.035608 , 5.88 per cent
//   fraction of the required saving delivered : 16.8 per cent
//   theta_total supported : trivial 1.000000 , DFI 1.010526 , BC 1.030303 , needed 1.208983
//   and all of that is at the aligned positions only; Remark 1 charges (1 + h x/MN)^{1/2}
//   for uniformity in x, which at x ~ exp(H^{1/beta_2}) is not a constant.
// ============================================================================
// READINGS
// ============================================================================
//
// 1. THE SUM IS NOW WRITTEN DOWN AND ITS PHASE IS EXACTLY A KLOOSTERMAN FRACTION.
//    Section B verifies, over 2655 random squarefree coprime pairs and window
//    positions, in BigInt with no floating point, that the CRT point of
//    (d1 | n, d2 | n+2) inside the window at position w satisfies
//    c_w/(d1 d2) = -w/(d1 d2) - 2*inv(d1)/d2 mod 1, with 0 failures, and that
//    the closed-form window count matches brute force, 2655 exact, 0 failures.
//    So the object the missing lemma is about is a trilinear form with
//    Kloosterman fractions carrying ONE extra factor, e(-h x/(d1 d2)).
//
// 2. THE h-SUM COSTS NOTHING, WHICH IS WHY THE TRILINEAR FORM IS THE RIGHT ONE.
//    With A = m/H and coefficients flat at H/m, section A gets
//    ||alpha|| ||beta|| ||nu|| (AMN)^{1/2} = MN = H^1.212157, i.e. the L2-normalised
//    trivial bound of the trilinear form IS the pair count, with no loss. An
//    average over h is therefore free, and Bettin-Chandee's trilinear theorem
//    applies where DFI's bilinear one would have to be summed over h by hand.
//
// 3. DFI 1997 IS WORSE THAN TRIVIAL IN OUR CONFIGURATION, AND THE REASON IS
//    NAMEABLE. At the working point it reads exponent 1.223840 against the
//    trivial 1.212157, gamma 1.009638. DFI beats trivial only for b/a < 6/5;
//    our splits are 1.313090 (optimum) and 1.424315 (diagonal-free). The
//    mismatch is the unbalance of the two levels, not the coefficients.
//
// 4. BETTIN-CHANDEE 2015 DOES SAVE HERE, BY 5.88 PER CENT OF SQUARE ROOT.
//    Exponent 1.176550, gamma 0.970624, saving H^0.035608 against the H^0.212157
//    needed. That is 16.8 per cent of the required saving. It is a genuine
//    nontrivial estimate in the exact configuration, and it is one sixth of the
//    way.
//
// 5. IN theta_total CURRENCY THE WHOLE LITERATURE BUYS 0.030 OF THE 0.209.
//    Largest theta_total supported: trivial 1.000000, DFI 1.010526,
//    Bettin-Chandee 1.030303, needed 1.208983. The best published bound moves
//    the ceiling on the level product from H^1 to H^1.0303.
//
// 6. AND THAT IS NOT ENOUGH TO BEAT THE beta-SIEVE, SO THE ROUTE STAYS SHUT.
//    Section D minimises the vector-sieve threshold subject to each bound:
//    5.158065 trivial, 5.173497 DFI, 5.090707 Bettin-Chandee, against
//    beta_2 = 4.266450. Only the square-root benchmark (2.579033) beats it. So
//    the answer to "does anything published reach gamma <= 0.824975" is no, and
//    the answer to "does the best published bound produce an exponent below
//    4.2665" is also no -- it produces 5.090707, which is worse than what the
//    corpus already has.
//
// 7. WHAT WOULD SUFFICE, AS AN EXPONENT IN A PUBLISHED SHAPE. Holding the
//    (M+N)^{1/4} factor, break-even needs the main exponent kappa <= 0.231615
//    against Bettin-Chandee's 7/20 = 0.350000: a further 33.8 per cent
//    reduction, on top of the 6.7 per cent Bettin-Chandee took off DFI's 3/8.
//    kappa = 1/4 with lambda = 1/4 gives theta = 1.200000, still 0.041651 short
//    of the balanced break-even 1.241651. So even a clean quarter-power main
//    term misses, and the (M+N) factor has to move too.
//
// 8. THE QUANTIFIER IS PRICED BY THE SOURCE ITSELF, AND IT IS THE BIGGER GAP.
//    Bettin-Chandee's Remark 1 admits precisely our perturbed phase -- their
//    conditions are d/dx f << X/(x^2 y), d/dy f << X/(x y^2), and our
//    f = -h x/(d1 d2) satisfies them with X = h*x -- at the price of the factor
//    (1 + (|t|A + X)/MN)^{1/2}. That is O(1) only while x << H^1.212157. Our x
//    runs to P(z), and section A measures log x / log H rising through 2.116,
//    5.129, 12.565, 34.192 at z = 31, 101, 307, 1009: x ~ exp(H^{0.2344}). The
//    published machinery covers the aligned positions and charges an
//    exponential of a power of H for the rest.
//
// 9. THE TOY MEASUREMENT IS NOT EVIDENCE AND IS LABELLED AS SUCH. Section F's
//    fitted exponent 0.5485 over z = 19..43 sits near square root, and the
//    Bettin-Chandee bound evaluated in the same finite quantities reads
//    gamma 1.4431 to 1.8591, i.e. vacuous at these scales. Both facts say the
//    same thing: four-digit moduli are three to five decades below the
//    crossover at which absolute-value accounting is first obstructed
//    (z between 3.87e4 and 6.34e5 per attack-theta-margin.js §G), so nothing
//    measured here can adjudicate the asymptotic gamma in either direction.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run of this file does not
// contain verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own run prints: 4.2665 is the beta-sieve
// exponent printed as beta_2 = 4.266450 on every "worse than beta_2" line of
// section D.
//
// DERIVED IN THIS READING by arithmetic over printed values: the 0.209 of
// theta_total still to be bought is the printed break-even 1.208983 minus the
// printed trivial 1.000000, and the 0.030 the literature buys is the printed
// Bettin-Chandee 1.030303 minus that same 1.000000. Both come off the single
// printed line "theta_total supported : trivial 1.000000 , DFI 1.010526 ,
// BC 1.030303 , needed 1.208983". The same 0.209 also appears in this file's
// header prose above the code.
// ---------------------------------------------------------------------------
