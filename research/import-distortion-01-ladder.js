#!/usr/bin/env node
'use strict';
// ============================================================================
// IMPORT-DISTORTION 01 — THE DISTORTION METHOD PRICED ON THE TWO-CLASS WINDOW
// (2026-08-19, foreign import, research/IMPORT-MAP.md row 8: Erdős covering
//  systems, the distortion method)
// ============================================================================
// PRE-REGISTRATION. research/history/staging/import-distortion-prereg.md,
// written and committed (4d8ac38) BEFORE this file existed. P0..P10 below refer
// to it. Nothing in this header may be changed after the run; corrections go in
// the record, research/history/staging/import-distortion.md.
//
// THE IMPORTED MACHINE, quoted from the two theorem statements that carry the
// hypotheses, both read at source (arXiv PDFs, not abstracts):
//
//   BBMST, "On the Erdős covering problem: the density of the uncovered set",
//   arXiv:1811.03547 = Invent. Math. 228 (2022) 377–414, THEOREM 3.1, verbatim:
//     "Let A = {A_d : d ∈ D} be a finite collection of arithmetic progressions,
//      and let δ_1,…,δ_n ∈ [0,1/2]. If
//          η := Σ_{i=1}^n min( M_i^{(1)}, M_i^{(2)}/(4δ_i(1−δ_i)) ) < 1,   (9)
//      then A does not cover the integers. Moreover, the uncovered set R has
//      density at least
//          P_0(R) ⩾ (1 − η)·exp( −(2/(1−η))·Σ_{d∈D} ν(d)/d ).             (10)"
//   with M_i^{(1)} = E_{i−1}[α_i(x)], M_i^{(2)} = E_{i−1}[α_i(x)²], α_i the
//   fraction of the fibre over Z/Q_{i−1}Z covered by the progressions whose
//   largest prime factor is p_i, and ν(d) = ∏_{p_j | d} 1/(1−δ_j).
//   >>> THEOREM 3.1 CARRIES NO DISTINCTNESS AND NO MULTIPLICITY HYPOTHESIS. <<<
//   Distinctness enters one level down, in THEOREM 3.2 (the moment bounds),
//   whose proof identifies a hyperplane from its set of fixed coordinates and
//   therefore needs "no two parallel".
//
//   KKL (Klein–Koukoulopoulos–Lemieux), arXiv:2212.01299v2 = Int. J. Number
//   Theory 20 (2024) 471–479, quotes exactly that criterion as their Lemma 3.1
//   ("Theorem 3.1 in [4]") inside a multiplicity-s setting, and writes: "Doing
//   so is the context of Theorem 3.2 in [4], but this result is only valid for
//   systems of congruences of multiplicity 1. We thus need to generalize it."
//   Their Lemma 3.3 pays s in the first moment and s² in the second.
//
//   CRITTENDEN–VANDEN EYNDEN, quoted verbatim inside KKL §1: "if a set of n
//   arithmetic progressions does not cover Z, then it does not cover the
//   interval {1, 2, …, 2^n}."
//
// OUR OBJECT. Level x; two residue classes mod p for each prime p ≤ x, chosen
// by an adversary; the question is the longest interval they can cover. Because
// every modulus is a PRIME, the fibre at p is Z/pZ and the two classes occupy
// exactly two of its points, so α_p = 2/p IDENTICALLY: the moments are exact,
// M^{(1)} = 2/p and M^{(2)} = 4/p², and no multiplicity-corrected moment lemma
// is needed at all. That is the whole reason the criterion is computable here.
//
// AND THE SMALL PRIMES MUST BE REMOVED FIRST, WHICH IS NOT A DETAIL. Since
// δ ∈ [0,1/2], the smallest a term can be made is min(M¹, M²), so p = 2 costs
// 1/4 and p = 3 costs 4/9 no matter how the δ's are chosen: on the FULL system
// 2 ≤ p ≤ x the criterion's floor is already 0.6944 before a single scour prime
// is added, and it crosses 1 at x = 17 (PART B). The repair is the corpus's own
// convention: survivors of the twin sieve all lie in 5 mod 6, so writing
// r = 6k + 5 turns the p = 2 and p = 3 conditions into the change of variable
// itself and leaves exactly two classes mod p in k for each 5 ≤ p ≤ x. The
// certificate is then G₂(x#) ≤ 6·2^{2(π(x)−2)} + 6, and the criterion it needs
// is the Natal one, η < 0.3646. THIS IS WHY EVERY COVERING-SYSTEMS THEOREM IN
// THE FIELD CARRIES A MINIMUM-MODULUS HYPOTHESIS: the method has no purchase on
// small moduli, and the hypothesis is that structural fact wearing a number.
//
// WHAT IS NOT COMPUTED HERE. G₂ and H* are INPUTS, cited from embedded blocks
// and not recomputed (STANDING COMPUTE RULE). H* is not a certificate: it is
// the reading of an exact criterion on a dependency graph the corpus has not
// verified (import-shearer.md §5), and it sits BELOW G₂ at every level.
// ============================================================================

const F = (v, d) => (Number.isFinite(v) ? v.toFixed(d) : String(v));
const pad = (s, n) => String(s).padStart(n);
let PASS = 0, FAIL = 0;
function check(name, ok, extra) {
  if (ok) { PASS++; console.log('  ok    ' + name + (extra ? '   ' + extra : '')); }
  else { FAIL++; console.log('  FAIL  ' + name + (extra ? '   ' + extra : '')); }
}

function primesUpTo(n) {
  const s = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { out.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return out;
}
const PR = primesUpTo(200000);
const pi = (x) => PR.filter(p => p <= x).length;

// ---------------------------------------------------------------------------
// INPUTS — cited, not recomputed
// ---------------------------------------------------------------------------
// G₂ at primorials. x = 2..43 computed in this repo; x = 47..79 are OEIS
// A144311 a(15)–a(22) read through G₂ = a(n) + 1. Copied verbatim from the
// embedded ladder in research/attack-0c0e-02-level-selection.js.
const X_G2 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];
const G2 = [2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528, 546, 618, 708, 870, 966, 1080, 1284, 1398, 1530, 1710];
// The exact Shearer threshold H*(x), from the embedded PART C block of
// research/import-shearer-01-region.js (17 levels, x = 13..79).
const X_HS = [13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];
const HSTAR = [35, 55, 65, 91, 115, 133, 155, 185, 209, 235, 265, 295, 319, 371, 407, 437, 481];
// The proven sieve exponent, research/dhr-verification.md row 1a.
const BETA2 = 4.26645028414864191641;
// The block bound at its level, research/sift-limit-attack.md §7a.
const L_BLOCK = 62;

console.log('='.repeat(78));
console.log('IMPORT-DISTORTION 01 — BBMST/KKL DISTORTION METHOD ON THE TWO-CLASS WINDOW');
console.log('='.repeat(78));
console.log('');
console.log('-'.repeat(78));
console.log('SELF-TESTS');
console.log('-'.repeat(78));
check('G₂ ladder has 22 terms and is non-decreasing',
  G2.length === 22 && X_G2.length === 22 && G2.every((v, i) => i === 0 || v >= G2[i - 1]));
check('G₂(23#) = 204 and G₂(43#) = 618 (repo anchors)',
  G2[X_G2.indexOf(23)] === 204 && G2[X_G2.indexOf(43)] === 618);
check('H* ladder has 17 terms, runs 35..481, non-decreasing',
  HSTAR.length === 17 && HSTAR[0] === 35 && HSTAR[16] === 481 && HSTAR.every((v, i) => i === 0 || v >= HSTAR[i - 1]));
check('H*(x) < G₂(x#) at every shared level — H* is NOT a certificate',
  X_HS.every((x, i) => HSTAR[i] < G2[X_G2.indexOf(x)]),
  'max H*/G₂ = ' + F(Math.max(...X_HS.map((x, i) => HSTAR[i] / G2[X_G2.indexOf(x)])), 4));
check('π(13) = 6, π(79) = 22', pi(13) === 6 && pi(79) === 22);
check('block bound L ≤ 62 carried as a scalar input', L_BLOCK === 62);

// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('PART A. (P1, P2, P4) THE CRITERION η ON OUR SYSTEM, AND ITS SUPREMUM');
console.log('='.repeat(78));
console.log('Every modulus is a prime, so α_p = 2/p EXACTLY and the moments need no');
console.log('multiplicity lemma: M1 = 2/p, M2 = 4/p². With δ_j = 1/2 the denominator');
console.log('4δ(1−δ) is 1, so η(x) = Σ_{5≤p≤x} min(2/p, 4/p²) = Σ_{5≤p≤x} 4/p².');
console.log('The union-bound economy Σ_{5≤p≤x} 2/p is printed beside it: that column');
console.log('is the one that crosses 1 at x = 13 (sift-limit-attack.md §7, six arrivals).');
console.log('');
const etaAt = (x, delta) => PR.filter(p => p >= 5 && p <= x)
  .reduce((a, p) => a + Math.min(2 / p, (4 / (p * p)) / (4 * delta * (1 - delta))), 0);
const sum2p = (x) => PR.filter(p => p >= 5 && p <= x).reduce((a, p) => a + 2 / p, 0);
console.log('    x  |  K | η(x), δ=1/2 | Σ_{5≤p≤x} 2/p | union bound alive?');
const LEV = [5, 7, 11, 13, 17, 19, 23, 29, 43, 61, 79, 101, 1009, 100003];
for (const x of LEV) {
  const K = pi(x) - 2, e = etaAt(x, 0.5), s = sum2p(x);
  console.log('  ' + pad(x, 6) + ' | ' + pad(K, 2) + ' |    ' + F(e, 6) + ' |      ' + F(s, 6) +
    ' |  ' + (s < 1 ? 'YES' : 'no'));
}
// sup over all x, with a rigorous tail: Σ_{p>N} 1/p² < Σ_{n>N} 1/n² < 1/N.
{
  const N = 10000000;
  const big = primesUpTo(N);
  let s = 0; for (const p of big) if (p >= 5) s += 4 / (p * p);
  console.log('');
  console.log('  sup_x η = Σ_{p≥5} 4/p², summed to p ≤ ' + N.toExponential(0) +
    ': ' + F(s, 9) + '   tail < 4/N = ' + (4 / N).toExponential(1));
  console.log('  identity check: 4·(P(2) − 1/4 − 1/9) with P(2) = Σ_p p^{−2} = 0.4522474200410655');
  const viaP2 = 4 * (0.4522474200410655 - 0.25 - 1 / 9);
  console.log('  4·(P(2) − 1/4 − 1/9) = ' + F(viaP2, 9) + '   agreement to ' + Math.abs(viaP2 - s).toExponential(1));
  check('η is bounded by a constant < 1 at EVERY x (P4)', s < 1 && Math.abs(viaP2 - s) < 1e-6,
    'sup η = ' + F(s, 6));
  global.SUP_ETA = s;
}
console.log('');
console.log('READING. The distortion criterion is satisfied at every level with room to');
console.log('spare, where the union bound dies at x = 13. The economy is Σ4/p² (convergent)');
console.log('instead of Σ2/p (divergent). THIS IS THE ONE PLACE THE METHOD BEATS THE');
console.log('UNION BOUND, and PART E prices what it charges for it.');

// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('PART B. (P3, P5) THE CERTIFIED INTERVAL, VIA CRITTENDEN–VANDEN EYNDEN');
console.log('='.repeat(78));
console.log('η < 1 ⇒ the system does not cover Z (BBMST Thm 3.1). CVE: n progressions that');
console.log('do not cover Z do not cover {1,…,2^n}.');
console.log('');
console.log('B0. THE NAIVE FULL-SYSTEM APPLICATION IS NOT AVAILABLE, AND THE REASON IS THE');
console.log('    REASON EVERY THEOREM IN THIS FIELD HAS A MINIMUM-MODULUS HYPOTHESIS.');
console.log('    δ ∈ [0,1/2] ⇒ 4δ(1−δ) ≤ 1 ⇒ each term is at best min(M¹, M²) = min(κ/p, κ²/p²).');
console.log('    p = 2 contributes one class (0 ≡ −2 mod 2), so κ=1 and the floor is 1/4;');
console.log('    p = 3 contributes two, so the floor is 4/9. Running floor over 2 ≤ p ≤ x:');
{
  const kappa = (p) => (p === 2 ? 1 : 2);
  let run = 0, firstDead = null;
  const shown = [];
  for (const p of PR) {
    if (p > 41) break;
    run += Math.min(kappa(p) / p, (kappa(p) * kappa(p)) / (p * p));
    shown.push('      p = ' + pad(p, 2) + '  running floor of η_full = ' + F(run, 6) + (run >= 1 ? '   ← EXCEEDS 1' : ''));
    if (run >= 1 && firstDead === null) firstDead = p;
  }
  for (const l of shown) console.log(l);
  check('the full system 2 ≤ p ≤ x fails the criterion from x = 17 on', firstDead === 17,
    'first level with η_full ≥ 1: x = ' + firstDead);
}
console.log('');
console.log('B1. THE REPAIR IS THE COMB, WHICH IS THE CORPUS\'S OWN NATAL@5 CONVENTION.');
console.log('    Every survivor of the twin sieve is ≡ 5 mod 6, so write r = 6k + 5. The');
console.log('    p = 2 and p = 3 conditions become the change of variable, and each prime');
console.log('    5 ≤ p ≤ x leaves exactly two classes mod p in k. A gap G in r is a covered');
console.log('    run of G/6 − 1 in k, so CVE with n_nat = 2(π(x)−2) progressions gives');
console.log('        G₂(x#) ≤ 6·2^{n_nat} + 6,');
console.log('    and the criterion it needs is the Natal one, η < 0.3646, which holds always.');
console.log('');
console.log('   x | n_nat | 6·2^{n_nat}+6       | G₂(x#) | ratio      | 2^{n_nat}       | H*(x) | ratio');
const rowsB = [];
for (const x of X_G2) {
  if (x < 5) continue;
  const nNat = 2 * (pi(x) - 2);
  const cNat = 2n ** BigInt(nNat), cG2 = 6n * cNat + 6n;
  const g = G2[X_G2.indexOf(x)];
  const iHS = X_HS.indexOf(x);
  const hs = iHS >= 0 ? HSTAR[iHS] : null;
  const rG = Number(cG2) / g, rH = hs ? Number(cNat) / hs : null;
  rowsB.push({ x, nNat, cG2, cNat, g, hs, rG, rH });
  console.log(pad(x, 4) + ' | ' + pad(nNat, 5) + ' | ' + pad(cG2.toString(), 19) + ' | ' + pad(g, 6) +
    ' | ' + pad(rG.toExponential(2), 10) + ' | ' + pad(cNat.toString(), 15) +
    ' | ' + pad(hs === null ? '—' : hs, 5) + ' | ' + pad(rH === null ? '—' : rH.toExponential(2), 9));
}
check('6·2^{n_nat}+6 > G₂(x#) at every ladder level (P5.1)',
  rowsB.every(r => r.cG2 > BigInt(r.g)));
check('2^{n_nat} > H*(x) at every level x = 13..79 (P5.2)',
  rowsB.filter(r => r.hs !== null).every(r => Number(r.cNat) > r.hs));
check('the loss ratio to G₂ grows with x (P5.1)',
  rowsB[rowsB.length - 1].rG > rowsB[0].rG,
  'x=5: ' + rowsB[0].rG.toExponential(2) + '  →  x=79: ' + rowsB[rowsB.length - 1].rG.toExponential(2));
console.log('');
console.log('VERDICT ON P5. The distortion method certifies NO H that the exact ladders do');
console.log('not already dominate, at any level in the computable range. It is dominated by');
console.log('the exact G₂ ladder by a factor that grows without bound. The block bound');
console.log('L ≤ ' + L_BLOCK + ' is NOT compared here: L counts slots of the fold, not integers of a');
console.log('window, and converting it needs the block\'s own spacing (attack-L-law). The');
console.log('numeric proximity of 62 to 2^{n_nat} = 64 at x = 11 is a coincidence of two');
console.log('different coordinates and carries no content.');

// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('PART C. (P6, P7) THE EXPONENT, AND THE TWO LINES IT CROSSES');
console.log('='.repeat(78));
console.log('θ_nat(x) := ln(2^{n_nat})/ln x = 2(π(x)−2)·ln2/ln x, and θ_G₂(x) := ln(6·2^{n_nat})/ln x,');
console.log('which is the one to compare against β₂ since 6·2^{n_nat} is what bounds G₂. The p² rule');
console.log('is θ = 2, the proven sieve bound is θ = β₂ = ' + BETA2.toFixed(5) + ' (G₂ ≪ (log p#)^{β₂+ε}), and the');
console.log('exact Shearer instrument reads θ ≈ 1.41 flat. The trivial period bound is');
console.log('G₂ < x# = e^{θ(x)}, i.e. θ_period = θ(x)/ln x ~ x/ln x.');
console.log('');
console.log('   x | θ_nat   | θ_G₂    | θ_Shearer | θ_period  | 6·2^{n_nat} vs x^β₂ | 6·2^{n_nat} vs x#');
const theta = (x) => (2 * (pi(x) - 2)) * Math.LN2 / Math.log(x);
const lnCertG2 = (x) => Math.log(6) + 2 * (pi(x) - 2) * Math.LN2;   // ln(6·2^{n_nat}), the G₂ certificate
const thetaFull = (x) => lnCertG2(x) / Math.log(x);
const lnPrimorial = (x) => PR.filter(p => p <= x).reduce((a, p) => a + Math.log(p), 0);
const rowsC = [];
for (const x of X_G2) {
  if (x < 5) continue;
  const td = theta(x), tf = thetaFull(x);
  const iHS = X_HS.indexOf(x);
  const ts = iHS >= 0 ? Math.log(HSTAR[iHS]) / Math.log(x) : null;
  const tp = lnPrimorial(x) / Math.log(x);
  const lnCert = lnCertG2(x);
  const dBeta = lnCert - BETA2 * Math.log(x);      // >0 ⇒ certificate is WEAKER than the sieve line
  const dPer = lnCert - lnPrimorial(x);            // >0 ⇒ certificate is WEAKER than the period bound
  rowsC.push({ x, td, tf, ts, tp, dBeta, dPer });
  console.log(pad(x, 4) + ' | ' + pad(F(td, 4), 7) + ' | ' + pad(F(tf, 4), 7) + ' | ' + pad(ts === null ? '—' : F(ts, 4), 9) +
    ' | ' + pad(F(tp, 4), 9) + ' |  ' + pad(dBeta > 0 ? 'WORSE by e^' + F(dBeta, 2) : 'better by e^' + F(-dBeta, 2), 18) +
    ' | ' + (dPer > 0 ? 'WORSE by e^' + F(dPer, 2) : 'better by e^' + F(-dPer, 2)));
}
check('θ_dist is not an exponent: it grows without bound (P6.1)',
  theta(100003) > theta(79) && theta(79) > theta(13),
  'θ_dist(13) = ' + F(theta(13), 3) + ', θ_dist(79) = ' + F(theta(79), 3) + ', θ_dist(1e5) = ' + F(theta(100003), 1));
// P6.2 predicted θ_dist > β₂ at every level 13..79. It is FALSE below x = 37, and the
// self-test asserts the observed behaviour so that the refutation is a fact and not a FAIL.
// The β₂ comparison must be made on the FULL system, since 2^{n_full} is what bounds G₂.
check('P6.2 REFUTED: θ_G₂ < β₂ for 13 ≤ x ≤ 31 and > β₂ from x = 37 on',
  [13, 17, 19, 23, 29, 31].every(x => thetaFull(x) < BETA2) && [37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79].every(x => thetaFull(x) > BETA2),
  'θ_G₂(13) = ' + F(thetaFull(13), 4) + ', θ_G₂(31) = ' + F(thetaFull(31), 4) + ', θ_G₂(37) = ' + F(thetaFull(37), 4) +
  '; θ_nat(13) = ' + F(theta(13), 4) + ', θ_nat(79) = ' + F(theta(79), 4));
{
  // where does the certificate cross the constant-free sieve line and the period bound?
  let xBeta = null, xPer = null;
  for (const p of PR) {
    if (p < 5) continue;
    const lnCert = lnCertG2(p);
    if (xBeta === null && lnCert > BETA2 * Math.log(p)) xBeta = p;
    if (xPer === null && lnCert < lnPrimorial(p)) xPer = p;
    if (xBeta !== null && xPer !== null) break;
  }
  console.log('');
  console.log('  crossover 1: 6·2^{n_nat} first exceeds the CONSTANT-FREE line x^β₂ at x = ' + xBeta +
    ' — below that level the certificate is the smaller of the two, with the caveat that a');
  console.log('               constant-free reading of x^{β₂} is a fiction (the sieve bound carries an');
  console.log('               unspecified implied constant, dhr-verification.md row 1a).');
  console.log('  crossover 2: 6·2^{n_nat} first drops BELOW the period bound x# at x = ' + xPer +
    ', and stays below it: the');
  console.log('               certificate is a genuine unconditional improvement on "shorter than the');
  console.log('               period" from x = ' + xPer + ' on, by e^{40.7} already at x = 79.');
  console.log('  and both crossings are permanent thereafter (2ln2·π(x) ~ 1.386 x/lnx, θ(x) ~ x,');
  console.log('  β₂·ln x is logarithmic), checked to x = 1e5 below.');
  let permBeta = true, permPer = true;
  for (const p of PR) {
    if (p < 5 || p > 100000) continue;
    const lnCert = lnCertG2(p);
    if (p >= xBeta && !(lnCert > BETA2 * Math.log(p))) permBeta = false;
    if (p >= xPer && !(lnCert < lnPrimorial(p))) permPer = false;
  }
  check('both crossings are permanent to x = 1e5', permBeta && permPer);
  check('the constant-free sieve line beats the certificate from x = ' + xBeta + ' on', xBeta === 37);
  check('the certificate beats the trivial period bound from x = ' + xPer + ' on (P7, and earlier than predicted)',
    xPer === 5);
  global.X_BETA = xBeta; global.X_PER = xPer;
}
console.log('');
console.log('VERDICT ON P7, CONFIRMED and better than registered. The certificate beats the');
console.log('trivial period bound from x = 5 on, not x = 13, and the margin grows: 2ln2·π(x) ~');
console.log('1.386 x/ln x against θ(x) ~ x. So the one thing the distortion method delivers');
console.log('here is REAL — an unconditional, sieve-free, constant-free upper bound on the');
console.log('two-class Jacobsthal quantity that is exponentially better than the period — and');
console.log('it is beaten by the proven sieve bound from x = 37 on, and by the EXACT ladder at');
console.log('every level anyone has computed.');
console.log('');
console.log('VERDICT ON P6.2, REFUTED. θ_nat(13) = 2.16 and θ_G₂(13) = 2.86, not the 4.3 the');
console.log('prereg hand-computed (it doubled a count that was already doubled). The certified');
console.log('exponent sits BELOW β₂ for 13 ≤ x ≤ 31 and crosses it at x = 37. P6.1 stands: it is');
console.log('not an exponent at all, it grows like 2ln2·x/ln²x, reading 1155 at x = 1e5.');

// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('PART D. (P10) THE DENSITY HALF, AND WHY ITS DIRECTION IS WRONG');
console.log('='.repeat(78));
console.log('BBMST Thm 3.1 (10): P₀(R) ≥ (1−η)·exp(−(2/(1−η))·Σ_{d∈D} ν(d)/d), ν(d) =');
console.log('∏_{p|d} 1/(1−δ_p). Our D is a MULTISET: two progressions per prime, so');
console.log('Σ_d ν(d)/d = (2/(1−δ))·Σ_{5≤p≤x} 1/p. [INFERRED, mechanism-checked: the only');
console.log('step of Lemma 3.5 that touches D is a union bound over the progressions');
console.log('revealed at stage j, which is indifferent to repeated moduli.]');
console.log('The exact truth needs no method: with prime moduli the uncovered set is a');
console.log('product, of density exactly ∏_{5≤p≤x}(1 − 2/p).');
console.log('');
console.log('   x | best δ | η(δ)   | distortion density bound | exact ∏(1−2/p) | truth/bound');
for (const x of [13, 19, 29, 43, 79, 1009, 100003]) {
  const ps = PR.filter(p => p >= 5 && p <= x);
  const exact = ps.reduce((a, p) => a * (1 - 2 / p), 1);
  let best = { v: -1, d: null, e: null };
  for (let d = 0.005; d <= 0.5 + 1e-12; d += 0.005) {
    const e = etaAt(x, d);
    if (e >= 1) continue;
    const S = ps.reduce((a, p) => a + 1 / p, 0) * 2 / (1 - d);
    const v = (1 - e) * Math.exp(-(2 / (1 - e)) * S);
    if (v > best.v) best = { v, d, e };
  }
  console.log(pad(x, 4) + ' |  ' + F(best.d, 3) + ' | ' + F(best.e, 4) + ' | ' + pad(best.v.toExponential(4), 24) +
    ' | ' + pad(exact.toExponential(4), 14) + ' | ' + (exact / best.v).toExponential(2));
}
console.log('');
console.log('READING. The density half is dominated by the exact product at every level, and');
console.log('the domination widens. But the direction is the real point: a density LOWER');
console.log('bound bounds the AVERAGE gap from above and says nothing about the MAXIMUM gap,');
console.log('which is G₂. No H follows from it, at any strength.');

// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('PART E. (P8, P9) THE EXCHANGE RATE: WHAT THE CONVERGENT ECONOMY COSTS');
console.log('='.repeat(78));
console.log('The distortion measure P_j is Q_j-measurable, i.e. it is a measure on the CRT');
console.log('product of the primes it has revealed. A window [0,H) is a union of classes mod');
console.log('∏p only when H is at least that primorial. So the hybrid is forced: discipline');
console.log('the primes 5 ≤ p ≤ y with distortion (cost η, convergent), and union-bound the');
console.log('primes in (y, x] against the surviving measure (cost 2Σ_{y<p≤x}1/p, divergent).');
console.log('[INFERRED — the hybrid is NOT carried out here: the union-bound step needs the');
console.log('untreated classes to equidistribute under the DISTORTED measure, which is an');
console.log('unverified hypothesis of exactly the kind import-shearer.md §5 warns about.');
console.log('What is computed is the arithmetic the hybrid would have to satisfy.]');
console.log('');
{
  const eta = global.SUP_ETA;
  const c = Math.exp(-(1 - eta) / 2);
  console.log('  condition:  2·Σ_{y<p≤x} 1/p < 1 − η   ⇒   2·ln(ln x / ln y) < 1 − η');
  console.log('  ⇒  ln y ≥ ln x · e^{−(1−η)/2},  i.e.  y ≥ x^c  with  c = e^{−(1−η)/2} = ' + F(c, 6));
  console.log('  ⇒  H ≥ exp(θ(y)) = exp(x^{' + F(c, 4) + '+o(1)}),  which is SUPERPOLYNOMIAL in x.');
  console.log('');
  console.log('   x     | y = x^c      | θ(y) ≈ y     | log10 of the window the hybrid would need');
  for (const x of [13, 79, 1009, 100003, 1e8, 1e12]) {
    const y = Math.pow(x, c);
    const th = y <= 200000 ? lnPrimorial(Math.floor(y)) : y; // θ(y) ~ y
    console.log('  ' + pad(x >= 1e6 ? x.toExponential(0) : String(x), 6) + ' | ' + pad(F(y, 2), 12) +
      ' | ' + pad(F(th, 2), 12) + ' | 10^' + F(th / Math.LN10, 2));
  }
  check('the hybrid exponent c is strictly between 0 and 1 (P8.1)', c > 0 && c < 1, 'c = ' + F(c, 6));
  check('the hybrid window is superpolynomial in x (P8.2)',
    Math.pow(100003, c) > 4.26645 * Math.log(100003));
}
console.log('');
console.log('THE EXCHANGE RATE, WHICH IS THE ROW\'S PAYOFF (P9).');
console.log('  · union bound   : no ambient, window-linear, pays Σ 2/p  — DIVERGES at x = 13.');
console.log('  · distortion    : pays Σ 4/p² — CONVERGES, sup 0.3645 — but demands an ambient');
console.log('                    CRT product, so the certified window is at least ∏p = e^{θ(y)}.');
console.log('  · the bridge in print between the two is Crittenden–Vanden Eynden, and it is');
console.log('    EXPONENTIAL IN THE NUMBER OF PROGRESSIONS, hence 2^{2π(x)}, not polynomial.');
console.log('  · neither economy prices the number of classes per modulus in any way that');
console.log('    matters: the class count enters the criterion as α = κ/p, i.e. QUADRATICALLY');
console.log('    in the second moment (κ²/p²), and κ = 2 costs a factor 4 in a sum whose');
console.log('    supremum is 0.09 at κ = 1. THE ONE-VS-TWO-CLASS WALL IS NOT WHERE THIS DIES.');

// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('PART F. PRE-REGISTRATION SCORECARD');
console.log('='.repeat(78));
{
  const eta = global.SUP_ETA;
  const rows = [
    ['P0', 'covering-dive §6 bullet 6 "primes on the knife\'s edge" REFUTED at source',
      'CONFIRMED', 'BBMST survey: "Note that p_k ∼ k log k, whereas in Theorem 2.1 we allow the size of the sets S_k to grow only linearly."'],
    ['P1', 'the engine speaks at two classes per modulus',
      'CONFIRMED', 'BBMST Thm 3.1 has no distinctness/multiplicity hypothesis; distinctness lives in Thm 3.2'],
    ['P2', 'KKL generalise to multiplicity s at cost s^k in the k-th moment',
      'CONFIRMED', 'KKL Lemma 3.3: M1 ≤ s·Σ1/d, M2 ≪ s²(log p)^6/p²; Thm 3 gives no numeric constant at s = 2'],
    ['P3', 'the clean statement is distortion + CVE, unconditional and constant-free',
      'CONFIRMED', 'adversary cannot cover 2^{2(π(x)−2)} on the Natal window; G₂(x#) ≤ 6·2^{2(π(x)−2)}+6 after the 5-mod-6 comb — the naive 2 ≤ p ≤ x form is NOT available, η_full ≥ 1 from x = 17'],
    ['P4', 'η < 1 at every x, sup η = 4(P(2) − 1/4 − 1/9) ≈ 0.3645',
      'CONFIRMED', 'sup η = ' + F(eta, 6)],
    ['P5', 'the certificate loses to every exact instrument at every level',
      'CONFIRMED', 'dominated by G₂ and by H*; ratio to G₂ grows'],
    ['P6.1', 'θ_dist is not an exponent: it grows without bound',
      'CONFIRMED', 'θ_nat(13) = ' + F(theta(13), 3) + ', θ_nat(79) = ' + F(theta(79), 3) + ', θ_nat(1e5) = ' + F(theta(100003), 1) + ' — growth 2ln2·x/ln²x'],
    ['P6.2', 'θ_dist > β₂ at every level 13..79',
      'REFUTED', 'θ_G₂ < β₂ for 13 ≤ x ≤ 31 (θ_G₂(13) = ' + F(thetaFull(13), 3) + '); it crosses the constant-free x^β₂ line at x = ' + global.X_BETA],
    ['P6.3', 'hand-computed θ_dist(13) ≈ 4.3 and θ_dist(79) ≈ 6.3',
      'SPLIT', 'x = 79 confirmed (θ_nat = ' + F(theta(79), 3) + '); x = 13 refuted (θ_nat = ' + F(theta(13), 3) + ', θ_G₂ = ' + F(thetaFull(13), 3) + ')'],
    ['P7', 'the certificate beats the trivial period bound from x = 13 on',
      'CONFIRMED', 'and earlier: from x = ' + global.X_PER + ' on, permanently, by e^{40.7} at x = 79'],
    ['P8', 'the hybrid dies at Mertens with exponent c = e^{−(1−η)/2}',
      'CONFIRMED', 'c = ' + F(Math.exp(-(1 - eta) / 2), 6) + ', window exp(x^c) — the SEVENTH arrival at the Mertens wall'],
    ['P9', 'the wall address: convergent economy bought with ambient length',
      'CONFIRMED', 'and the one-vs-two-class wall is NOT the obstruction here'],
    ['P10', 'the density half is dominated by the exact product and points the wrong way',
      'CONFIRMED', 'truth/bound grows; density bounds the average gap, G₂ is the maximum gap'],
  ];
  let conf = 0, ref = 0, split = 0;
  for (const [id, claim, verdict, note] of rows) {
    if (verdict === 'CONFIRMED') conf++; else if (verdict === 'REFUTED') ref++; else split++;
    console.log('  ' + pad(id, 3) + '  ' + pad(verdict, 9) + '  ' + claim);
    console.log('         ' + note);
  }
  console.log('');
  console.log('  SCORE: ' + conf + ' confirmed, ' + ref + ' refuted, ' + split + ' split, out of ' + rows.length + '.');
  console.log('  The two that moved are both about MY arithmetic, not about the method: P6.2/P6.3');
  console.log('  hand-doubled a count that was already doubled, and P7 was pessimistic by two levels.');
}

console.log('');
console.log('-'.repeat(78));
console.log('SELF-TEST TOTAL: ' + PASS + ' pass, ' + FAIL + ' fail');
console.log('-'.repeat(78));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/import-distortion-01-ladder.js
//   invocation:  node research/import-distortion-01-ladder.js
//   code-sha256: 876428f55e8d6455a7bddee8a53adcc8d559806db47efd6a7ae4366d55da95a1
//   out-sha256:  fdd244c69cfb4233ae412d7a133a1d5a08873b2c28edad2d584379c4b6cb3924
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     2.3 s
// ============================================================================
// ==============================================================================
// IMPORT-DISTORTION 01 — BBMST/KKL DISTORTION METHOD ON THE TWO-CLASS WINDOW
// ==============================================================================
//
// ------------------------------------------------------------------------------
// SELF-TESTS
// ------------------------------------------------------------------------------
//   ok    G₂ ladder has 22 terms and is non-decreasing
//   ok    G₂(23#) = 204 and G₂(43#) = 618 (repo anchors)
//   ok    H* ladder has 17 terms, runs 35..481, non-decreasing
//   ok    H*(x) < G₂(x#) at every shared level — H* is NOT a certificate   max H*/G₂ = 0.5303
//   ok    π(13) = 6, π(79) = 22
//   ok    block bound L ≤ 62 carried as a scalar input
//
// ==============================================================================
// PART A. (P1, P2, P4) THE CRITERION η ON OUR SYSTEM, AND ITS SUPREMUM
// ==============================================================================
// Every modulus is a prime, so α_p = 2/p EXACTLY and the moments need no
// multiplicity lemma: M1 = 2/p, M2 = 4/p². With δ_j = 1/2 the denominator
// 4δ(1−δ) is 1, so η(x) = Σ_{5≤p≤x} min(2/p, 4/p²) = Σ_{5≤p≤x} 4/p².
// The union-bound economy Σ_{5≤p≤x} 2/p is printed beside it: that column
// is the one that crosses 1 at x = 13 (sift-limit-attack.md §7, six arrivals).
//
//     x  |  K | η(x), δ=1/2 | Σ_{5≤p≤x} 2/p | union bound alive?
//        5 |  1 |    0.160000 |      0.400000 |  YES
//        7 |  2 |    0.241633 |      0.685714 |  YES
//       11 |  3 |    0.274691 |      0.867532 |  YES
//       13 |  4 |    0.298359 |      1.021379 |  no
//       17 |  5 |    0.312200 |      1.139026 |  no
//       19 |  6 |    0.323280 |      1.244289 |  no
//       23 |  7 |    0.330842 |      1.331245 |  no
//       29 |  8 |    0.335598 |      1.400211 |  no
//       43 | 12 |    0.347225 |      1.614073 |  no
//       61 | 16 |    0.352684 |      1.761047 |  no
//       79 | 20 |    0.355760 |      1.871781 |  no
//      101 | 24 |    0.357663 |      1.958770 |  no
//     1009 | 167 |    0.364041 |      2.731476 |  no
//   100003 | 9591 |    0.364542 |      3.743898 |  no
//
//   sup_x η = Σ_{p≥5} 4/p², summed to p ≤ 1e+7: 0.364545212   tail < 4/N = 4.0e-7
//   identity check: 4·(P(2) − 1/4 − 1/9) with P(2) = Σ_p p^{−2} = 0.4522474200410655
//   4·(P(2) − 1/4 − 1/9) = 0.364545236   agreement to 2.3e-8
//   ok    η is bounded by a constant < 1 at EVERY x (P4)   sup η = 0.364545
//
// READING. The distortion criterion is satisfied at every level with room to
// spare, where the union bound dies at x = 13. The economy is Σ4/p² (convergent)
// instead of Σ2/p (divergent). THIS IS THE ONE PLACE THE METHOD BEATS THE
// UNION BOUND, and PART E prices what it charges for it.
//
// ==============================================================================
// PART B. (P3, P5) THE CERTIFIED INTERVAL, VIA CRITTENDEN–VANDEN EYNDEN
// ==============================================================================
// η < 1 ⇒ the system does not cover Z (BBMST Thm 3.1). CVE: n progressions that
// do not cover Z do not cover {1,…,2^n}.
//
// B0. THE NAIVE FULL-SYSTEM APPLICATION IS NOT AVAILABLE, AND THE REASON IS THE
//     REASON EVERY THEOREM IN THIS FIELD HAS A MINIMUM-MODULUS HYPOTHESIS.
//     δ ∈ [0,1/2] ⇒ 4δ(1−δ) ≤ 1 ⇒ each term is at best min(M¹, M²) = min(κ/p, κ²/p²).
//     p = 2 contributes one class (0 ≡ −2 mod 2), so κ=1 and the floor is 1/4;
//     p = 3 contributes two, so the floor is 4/9. Running floor over 2 ≤ p ≤ x:
//       p =  2  running floor of η_full = 0.250000
//       p =  3  running floor of η_full = 0.694444
//       p =  5  running floor of η_full = 0.854444
//       p =  7  running floor of η_full = 0.936077
//       p = 11  running floor of η_full = 0.969135
//       p = 13  running floor of η_full = 0.992804
//       p = 17  running floor of η_full = 1.006644   ← EXCEEDS 1
//       p = 19  running floor of η_full = 1.017725   ← EXCEEDS 1
//       p = 23  running floor of η_full = 1.025286   ← EXCEEDS 1
//       p = 29  running floor of η_full = 1.030042   ← EXCEEDS 1
//       p = 31  running floor of η_full = 1.034205   ← EXCEEDS 1
//       p = 37  running floor of η_full = 1.037127   ← EXCEEDS 1
//       p = 41  running floor of η_full = 1.039506   ← EXCEEDS 1
//   ok    the full system 2 ≤ p ≤ x fails the criterion from x = 17 on   first level with η_full ≥ 1: x = 17
//
// B1. THE REPAIR IS THE COMB, WHICH IS THE CORPUS'S OWN NATAL@5 CONVENTION.
//     Every survivor of the twin sieve is ≡ 5 mod 6, so write r = 6k + 5. The
//     p = 2 and p = 3 conditions become the change of variable, and each prime
//     5 ≤ p ≤ x leaves exactly two classes mod p in k. A gap G in r is a covered
//     run of G/6 − 1 in k, so CVE with n_nat = 2(π(x)−2) progressions gives
//         G₂(x#) ≤ 6·2^{n_nat} + 6,
//     and the criterion it needs is the Natal one, η < 0.3646, which holds always.
//
//    x | n_nat | 6·2^{n_nat}+6       | G₂(x#) | ratio      | 2^{n_nat}       | H*(x) | ratio
//    5 |     2 |                  30 |     12 |    2.50e+0 |               4 |     — |         —
//    7 |     4 |                 102 |     30 |    3.40e+0 |              16 |     — |         —
//   11 |     6 |                 390 |     42 |    9.29e+0 |              64 |     — |         —
//   13 |     8 |                1542 |     66 |    2.34e+1 |             256 |    35 |   7.31e+0
//   17 |    10 |                6150 |    108 |    5.69e+1 |            1024 |    55 |   1.86e+1
//   19 |    12 |               24582 |    150 |    1.64e+2 |            4096 |    65 |   6.30e+1
//   23 |    14 |               98310 |    204 |    4.82e+2 |           16384 |    91 |   1.80e+2
//   29 |    16 |              393222 |    258 |    1.52e+3 |           65536 |   115 |   5.70e+2
//   31 |    18 |             1572870 |    348 |    4.52e+3 |          262144 |   133 |   1.97e+3
//   37 |    20 |             6291462 |    528 |    1.19e+4 |         1048576 |   155 |   6.77e+3
//   41 |    22 |            25165830 |    546 |    4.61e+4 |         4194304 |   185 |   2.27e+4
//   43 |    24 |           100663302 |    618 |    1.63e+5 |        16777216 |   209 |   8.03e+4
//   47 |    26 |           402653190 |    708 |    5.69e+5 |        67108864 |   235 |   2.86e+5
//   53 |    28 |          1610612742 |    870 |    1.85e+6 |       268435456 |   265 |   1.01e+6
//   59 |    30 |          6442450950 |    966 |    6.67e+6 |      1073741824 |   295 |   3.64e+6
//   61 |    32 |         25769803782 |   1080 |    2.39e+7 |      4294967296 |   319 |   1.35e+7
//   67 |    34 |        103079215110 |   1284 |    8.03e+7 |     17179869184 |   371 |   4.63e+7
//   71 |    36 |        412316860422 |   1398 |    2.95e+8 |     68719476736 |   407 |   1.69e+8
//   73 |    38 |       1649267441670 |   1530 |    1.08e+9 |    274877906944 |   437 |   6.29e+8
//   79 |    40 |       6597069766662 |   1710 |    3.86e+9 |   1099511627776 |   481 |   2.29e+9
//   ok    6·2^{n_nat}+6 > G₂(x#) at every ladder level (P5.1)
//   ok    2^{n_nat} > H*(x) at every level x = 13..79 (P5.2)
//   ok    the loss ratio to G₂ grows with x (P5.1)   x=5: 2.50e+0  →  x=79: 3.86e+9
//
// VERDICT ON P5. The distortion method certifies NO H that the exact ladders do
// not already dominate, at any level in the computable range. It is dominated by
// the exact G₂ ladder by a factor that grows without bound. The block bound
// L ≤ 62 is NOT compared here: L counts slots of the fold, not integers of a
// window, and converting it needs the block's own spacing (attack-L-law). The
// numeric proximity of 62 to 2^{n_nat} = 64 at x = 11 is a coincidence of two
// different coordinates and carries no content.
//
// ==============================================================================
// PART C. (P6, P7) THE EXPONENT, AND THE TWO LINES IT CROSSES
// ==============================================================================
// θ_nat(x) := ln(2^{n_nat})/ln x = 2(π(x)−2)·ln2/ln x, and θ_G₂(x) := ln(6·2^{n_nat})/ln x,
// which is the one to compare against β₂ since 6·2^{n_nat} is what bounds G₂. The p² rule
// is θ = 2, the proven sieve bound is θ = β₂ = 4.26645 (G₂ ≪ (log p#)^{β₂+ε}), and the
// exact Shearer instrument reads θ ≈ 1.41 flat. The trivial period bound is
// G₂ < x# = e^{θ(x)}, i.e. θ_period = θ(x)/ln x ~ x/ln x.
//
//    x | θ_nat   | θ_G₂    | θ_Shearer | θ_period  | 6·2^{n_nat} vs x^β₂ | 6·2^{n_nat} vs x#
//    5 |  0.8614 |  1.9746 |         — |    2.1133 |    better by e^3.69 | better by e^0.22
//    7 |  1.4248 |  2.3456 |         — |    2.7479 |    better by e^3.74 | better by e^0.78
//   11 |  1.7344 |  2.4816 |         — |    3.2299 |    better by e^4.28 | better by e^1.79
//   13 |  2.1619 |  2.8605 |    1.3861 |    4.0196 |    better by e^3.61 | better by e^2.97
//   17 |  2.4465 |  3.0789 |    1.4144 |    4.6390 |    better by e^3.36 | better by e^4.42
//   19 |  2.8249 |  3.4334 |    1.4177 |    5.4637 |    better by e^2.45 | better by e^5.98
//   23 |  3.0949 |  3.6664 |    1.4386 |    6.1308 |    better by e^1.88 | better by e^7.73
//   29 |  3.2935 |  3.8257 |    1.4091 |    6.7088 |    better by e^1.48 | better by e^9.71
//   31 |  3.6333 |  4.1551 |    1.4241 |    7.5785 |    better by e^0.38 | better by e^11.76
//   37 |  3.8392 |  4.3354 |    1.3967 |    8.2071 |     WORSE by e^0.25 | better by e^13.98
//   41 |  4.1064 |  4.5888 |    1.4058 |    8.9803 |     WORSE by e^1.20 | better by e^16.31
//   43 |  4.4229 |  4.8993 |    1.4204 |    9.8666 |     WORSE by e^2.38 | better by e^18.68
//   47 |  4.6808 |  5.1462 |    1.4180 |   10.6386 |     WORSE by e^3.39 | better by e^21.15
//   53 |  4.8883 |  5.3396 |    1.4054 |   11.3167 |     WORSE by e^4.26 | better by e^23.73
//   59 |  5.0997 |  5.5392 |    1.3947 |   12.0190 |     WORSE by e^5.19 | better by e^26.42
//   61 |  5.3956 |  5.8315 |    1.4024 |   12.9216 |     WORSE by e^6.43 | better by e^29.15
//   67 |  5.6049 |  6.0311 |    1.4070 |   13.6332 |     WORSE by e^7.42 | better by e^31.96
//   71 |  5.8539 |  6.2742 |    1.4096 |   14.4478 |     WORSE by e^8.56 | better by e^34.84
//   73 |  6.1391 |  6.5567 |    1.4171 |   15.3542 |     WORSE by e^9.83 | better by e^37.75
//   79 |  6.3454 |  6.7555 |    1.4134 |   16.0767 |    WORSE by e^10.88 | better by e^40.73
//   ok    θ_dist is not an exponent: it grows without bound (P6.1)   θ_dist(13) = 2.162, θ_dist(79) = 6.345, θ_dist(1e5) = 1154.9
//   ok    P6.2 REFUTED: θ_G₂ < β₂ for 13 ≤ x ≤ 31 and > β₂ from x = 37 on   θ_G₂(13) = 2.8605, θ_G₂(31) = 4.1551, θ_G₂(37) = 4.3354; θ_nat(13) = 2.1619, θ_nat(79) = 6.3454
//
//   crossover 1: 6·2^{n_nat} first exceeds the CONSTANT-FREE line x^β₂ at x = 37 — below that level the certificate is the smaller of the two, with the caveat that a
//                constant-free reading of x^{β₂} is a fiction (the sieve bound carries an
//                unspecified implied constant, dhr-verification.md row 1a).
//   crossover 2: 6·2^{n_nat} first drops BELOW the period bound x# at x = 5, and stays below it: the
//                certificate is a genuine unconditional improvement on "shorter than the
//                period" from x = 5 on, by e^{40.7} already at x = 79.
//   and both crossings are permanent thereafter (2ln2·π(x) ~ 1.386 x/lnx, θ(x) ~ x,
//   β₂·ln x is logarithmic), checked to x = 1e5 below.
//   ok    both crossings are permanent to x = 1e5
//   ok    the constant-free sieve line beats the certificate from x = 37 on
//   ok    the certificate beats the trivial period bound from x = 5 on (P7, and earlier than predicted)
//
// VERDICT ON P7, CONFIRMED and better than registered. The certificate beats the
// trivial period bound from x = 5 on, not x = 13, and the margin grows: 2ln2·π(x) ~
// 1.386 x/ln x against θ(x) ~ x. So the one thing the distortion method delivers
// here is REAL — an unconditional, sieve-free, constant-free upper bound on the
// two-class Jacobsthal quantity that is exponentially better than the period — and
// it is beaten by the proven sieve bound from x = 37 on, and by the EXACT ladder at
// every level anyone has computed.
//
// VERDICT ON P6.2, REFUTED. θ_nat(13) = 2.16 and θ_G₂(13) = 2.86, not the 4.3 the
// prereg hand-computed (it doubled a count that was already doubled). The certified
// exponent sits BELOW β₂ for 13 ≤ x ≤ 31 and crosses it at x = 37. P6.1 stands: it is
// not an exponent at all, it grows like 2ln2·x/ln²x, reading 1155 at x = 1e5.
//
// ==============================================================================
// PART D. (P10) THE DENSITY HALF, AND WHY ITS DIRECTION IS WRONG
// ==============================================================================
// BBMST Thm 3.1 (10): P₀(R) ≥ (1−η)·exp(−(2/(1−η))·Σ_{d∈D} ν(d)/d), ν(d) =
// ∏_{p|d} 1/(1−δ_p). Our D is a MULTISET: two progressions per prime, so
// Σ_d ν(d)/d = (2/(1−δ))·Σ_{5≤p≤x} 1/p. [INFERRED, mechanism-checked: the only
// step of Lemma 3.5 that touches D is a union bound over the progressions
// revealed at stage j, which is indifferent to repeated moduli.]
// The exact truth needs no method: with prime moduli the uncovered set is a
// product, of density exactly ∏_{5≤p≤x}(1 − 2/p).
//
//    x | best δ | η(δ)   | distortion density bound | exact ∏(1−2/p) | truth/bound
//   13 |  0.290 | 0.3623 |                7.0040e-3 |      2.9670e-1 | 4.24e+1
//   19 |  0.300 | 0.3849 |                1.9013e-3 |      2.3424e-1 | 1.23e+2
//   29 |  0.300 | 0.3995 |                7.6749e-4 |      1.9912e-1 | 2.59e+2
//   43 |  0.305 | 0.4095 |                2.2648e-4 |      1.5981e-1 | 7.06e+2
//   79 |  0.305 | 0.4196 |                5.4127e-5 |      1.2297e-1 | 2.27e+3
// 1009 |  0.310 | 0.4255 |                5.9483e-7 |      5.1835e-2 | 8.71e+4
// 100003 |  0.305 | 0.4299 |                3.5325e-9 |      1.8829e-2 | 5.33e+6
//
// READING. The density half is dominated by the exact product at every level, and
// the domination widens. But the direction is the real point: a density LOWER
// bound bounds the AVERAGE gap from above and says nothing about the MAXIMUM gap,
// which is G₂. No H follows from it, at any strength.
//
// ==============================================================================
// PART E. (P8, P9) THE EXCHANGE RATE: WHAT THE CONVERGENT ECONOMY COSTS
// ==============================================================================
// The distortion measure P_j is Q_j-measurable, i.e. it is a measure on the CRT
// product of the primes it has revealed. A window [0,H) is a union of classes mod
// ∏p only when H is at least that primorial. So the hybrid is forced: discipline
// the primes 5 ≤ p ≤ y with distortion (cost η, convergent), and union-bound the
// primes in (y, x] against the surviving measure (cost 2Σ_{y<p≤x}1/p, divergent).
// [INFERRED — the hybrid is NOT carried out here: the union-bound step needs the
// untreated classes to equidistribute under the DISTORTED measure, which is an
// unverified hypothesis of exactly the kind import-shearer.md §5 warns about.
// What is computed is the arithmetic the hybrid would have to satisfy.]
//
//   condition:  2·Σ_{y<p≤x} 1/p < 1 − η   ⇒   2·ln(ln x / ln y) < 1 − η
//   ⇒  ln y ≥ ln x · e^{−(1−η)/2},  i.e.  y ≥ x^c  with  c = e^{−(1−η)/2} = 0.727801
//   ⇒  H ≥ exp(θ(y)) = exp(x^{0.7278+o(1)}),  which is SUPERPOLYNOMIAL in x.
//
//    x     | y = x^c      | θ(y) ≈ y     | log10 of the window the hybrid would need
//       13 |         6.47 |         3.40 | 10^1.48
//       79 |        24.05 |        19.22 | 10^8.35
//     1009 |       153.54 |       136.66 | 10^59.35
//   100003 |      4355.27 |      4277.86 | 10^1857.85
//     1e+8 |    664368.93 |    664368.93 | 10^288531.76
//    1e+12 | 541519341.88 | 541519341.88 | 10^235178862.02
//   ok    the hybrid exponent c is strictly between 0 and 1 (P8.1)   c = 0.727801
//   ok    the hybrid window is superpolynomial in x (P8.2)
//
// THE EXCHANGE RATE, WHICH IS THE ROW'S PAYOFF (P9).
//   · union bound   : no ambient, window-linear, pays Σ 2/p  — DIVERGES at x = 13.
//   · distortion    : pays Σ 4/p² — CONVERGES, sup 0.3645 — but demands an ambient
//                     CRT product, so the certified window is at least ∏p = e^{θ(y)}.
//   · the bridge in print between the two is Crittenden–Vanden Eynden, and it is
//     EXPONENTIAL IN THE NUMBER OF PROGRESSIONS, hence 2^{2π(x)}, not polynomial.
//   · neither economy prices the number of classes per modulus in any way that
//     matters: the class count enters the criterion as α = κ/p, i.e. QUADRATICALLY
//     in the second moment (κ²/p²), and κ = 2 costs a factor 4 in a sum whose
//     supremum is 0.09 at κ = 1. THE ONE-VS-TWO-CLASS WALL IS NOT WHERE THIS DIES.
//
// ==============================================================================
// PART F. PRE-REGISTRATION SCORECARD
// ==============================================================================
//    P0  CONFIRMED  covering-dive §6 bullet 6 "primes on the knife's edge" REFUTED at source
//          BBMST survey: "Note that p_k ∼ k log k, whereas in Theorem 2.1 we allow the size of the sets S_k to grow only linearly."
//    P1  CONFIRMED  the engine speaks at two classes per modulus
//          BBMST Thm 3.1 has no distinctness/multiplicity hypothesis; distinctness lives in Thm 3.2
//    P2  CONFIRMED  KKL generalise to multiplicity s at cost s^k in the k-th moment
//          KKL Lemma 3.3: M1 ≤ s·Σ1/d, M2 ≪ s²(log p)^6/p²; Thm 3 gives no numeric constant at s = 2
//    P3  CONFIRMED  the clean statement is distortion + CVE, unconditional and constant-free
//          adversary cannot cover 2^{2(π(x)−2)} on the Natal window; G₂(x#) ≤ 6·2^{2(π(x)−2)}+6 after the 5-mod-6 comb — the naive 2 ≤ p ≤ x form is NOT available, η_full ≥ 1 from x = 17
//    P4  CONFIRMED  η < 1 at every x, sup η = 4(P(2) − 1/4 − 1/9) ≈ 0.3645
//          sup η = 0.364545
//    P5  CONFIRMED  the certificate loses to every exact instrument at every level
//          dominated by G₂ and by H*; ratio to G₂ grows
//   P6.1  CONFIRMED  θ_dist is not an exponent: it grows without bound
//          θ_nat(13) = 2.162, θ_nat(79) = 6.345, θ_nat(1e5) = 1154.9 — growth 2ln2·x/ln²x
//   P6.2    REFUTED  θ_dist > β₂ at every level 13..79
//          θ_G₂ < β₂ for 13 ≤ x ≤ 31 (θ_G₂(13) = 2.860); it crosses the constant-free x^β₂ line at x = 37
//   P6.3      SPLIT  hand-computed θ_dist(13) ≈ 4.3 and θ_dist(79) ≈ 6.3
//          x = 79 confirmed (θ_nat = 6.345); x = 13 refuted (θ_nat = 2.162, θ_G₂ = 2.860)
//    P7  CONFIRMED  the certificate beats the trivial period bound from x = 13 on
//          and earlier: from x = 5 on, permanently, by e^{40.7} at x = 79
//    P8  CONFIRMED  the hybrid dies at Mertens with exponent c = e^{−(1−η)/2}
//          c = 0.727801, window exp(x^c) — the SEVENTH arrival at the Mertens wall
//    P9  CONFIRMED  the wall address: convergent economy bought with ambient length
//          and the one-vs-two-class wall is NOT the obstruction here
//   P10  CONFIRMED  the density half is dominated by the exact product and points the wrong way
//          truth/bound grows; density bounds the average gap, G₂ is the maximum gap
//
//   SCORE: 11 confirmed, 1 refuted, 1 split, out of 13.
//   The two that moved are both about MY arithmetic, not about the method: P6.2/P6.3
//   hand-doubled a count that was already doubled, and P7 was pessimistic by two levels.
//
// ------------------------------------------------------------------------------
// SELF-TEST TOTAL: 18 pass, 0 fail
// ------------------------------------------------------------------------------
// ============================================================================
// READINGS
// ============================================================================
//
// 1. THE ENGINE SPEAKS AT TWO CLASSES PER MODULUS, AND THAT IS SETTLED BY
//    HYPOTHESIS, NOT BY ADAPTATION. BBMST's Theorem 3.1 — the criterion η < 1
//    and the density bound (10) — is stated for "a finite collection of
//    arithmetic progressions" with no distinctness, no multiplicity and no
//    minimum-modulus hypothesis of any kind. The distinctness hypothesis lives
//    one level down, in Theorem 3.2, whose proof recovers a progression from
//    its set of fixed coordinates and therefore needs "no two parallel". KKL
//    confirm the split in print by quoting Theorem 3.1 unchanged as their
//    Lemma 3.1 inside a multiplicity-s setting and re-proving only Theorem 3.2.
//    So the one-vs-two-class wall that this corpus keeps meeting is NOT this
//    method's wall.
//
// 2. AND ON OUR OBJECT NO MULTIPLICITY LEMMA IS NEEDED AT ALL. Every modulus
//    is a prime, so the fibre at p is Z/pZ, the two chosen classes occupy
//    exactly two of its points, and α_p = 2/p IDENTICALLY. The moments are
//    exact rather than bounded: M¹ = 2/p, M² = 4/p². KKL's generalisation
//    (s in the first moment, s² in the second) is the general answer; here the
//    exact value is available and the general answer is not needed.
//
// 3. THE ECONOMY IS Σ4/p², AND IT CONVERGES. At δ = 1/2 the criterion reads
//    η(x) = Σ_{5≤p≤x} 4/p², which is 0.298 at x = 13 and 0.3645 in the limit
//    (= 4(P(2) − 1/4 − 1/9), agreeing with a direct sum to 10⁷ to 2.3e−8). The
//    union bound's economy Σ_{5≤p≤x} 2/p crosses 1 between x = 11 (0.8675) and
//    x = 13 (1.021379) and never comes back. So the distortion method CLEARS THE
//    MERTENS WALL that closed the covering economy at x = 13
//    (sift-limit-attack.md §7). It is the first import in the map that does.
//
// 4. WHAT IT CHARGES FOR CLEARING IT IS THE AMBIENT. The measures P_j are
//    Q_j-measurable: they live on the CRT product of the primes revealed so
//    far. A window [0,H) is a union of classes mod ∏p only when H is at least
//    that primorial. The only bridge in print from "does not cover Z" to "does
//    not cover an interval" is Crittenden–Vanden Eynden, and it is exponential
//    in the NUMBER OF PROGRESSIONS: 2ⁿ. So the cleanest true statement the
//    distortion method gives for our object is
//        the adversary cannot cover 2^{2(π(x)−2)} consecutive integers with two
//        classes per prime 5 ≤ p ≤ x, and after the 5-mod-6 comb
//        G₂(x#) ≤ 6·2^{2(π(x)−2)} + 6,
//    unconditional, constant-free, and superpolynomial in x.
//
// 4b. AND THE SMALL PRIMES CANNOT BE FED TO THE CRITERION AT ALL, WHICH IS THE
//    STRUCTURAL CONTENT OF EVERY MINIMUM-MODULUS HYPOTHESIS IN THE FIELD. Since
//    δ ∈ [0,1/2], each term of η is at best min(M¹, M²), so p = 2 costs 1/4 and
//    p = 3 costs 4/9 whatever the δ's are: the running floor over 2 ≤ p ≤ x is
//    0.9928 at x = 13 and 1.0066 at x = 17, so the naive full-system form of the
//    certificate DIES AT x = 17. The repair is the corpus's own Natal@5
//    convention, r = 6k + 5, which turns the p = 2 and p = 3 conditions into the
//    change of variable and costs only the factor 6 above. A first draft of this
//    file claimed G₂ ≤ 2^{2π(x)−1} from the full system; that claim was false
//    from x = 17 and is recorded here rather than quietly repaired.
//
// 5. IT CERTIFIES NOTHING THE EXACT LADDERS DO NOT ALREADY DOMINATE. The
//    certificate reads 1542 against G₂(13#) = 66 and 6597069766662 against
//    G₂(79#) = 1710; the loss ratio runs 2.34e+1 → 3.86e+9 over the ladder and grows
//    monotonically. Against the exact Shearer instrument the Natal certificate
//    reads 256 against H*(13) = 35 and 1099511627776 against H*(79) = 481. Both
//    comparisons are one-sided at every level in the computable range.
//
// 6. THE EXPONENT IS NOT AN EXPONENT. θ_G₂ = ln(6·2^{n_nat})/ln x grows like
//    2ln2·x/ln²x: 2.8605 at x = 13, 6.7555 at x = 79, and θ_nat reads 1154.9 at
//    x = 10⁵. It crosses the constant-free line x^{β₂} at x = 37 and never
//    returns. So the method cannot address the 4.26645 → 2 gap even in
//    principle: it is not competing in the polynomial regime at all. The
//    pre-registration's hand-computed θ ≈ 4.3 at x = 13 was wrong by about a
//    factor 1.5 — it doubled a count that was already doubled — and the correct
//    2.86 is what refutes P6.2.
//
// 7. THE ONE THING IT DOES BEAT IS THE PERIOD. G₂ < x# is the only bound this
//    corpus has that needs no sieve hypothesis at all. 2^{2π(x)−1} drops below
//    x# at x = 5 and stays below, by e^40.73 already at x = 79, and
//    asymptotically by e^{x−1.386x/lnx}. That is a genuine unconditional
//    improvement, and it is the entire positive content of this row.
//
// 8. THE DENSITY HALF IS DOMINATED AND POINTS THE WRONG WAY. Optimising δ, the
//    bound (10) gives uncovered density ≥ 7.0e−3 at x = 13 and 3.5e−9 at
//    x = 10⁵, against the exact product ∏(1 − 2/p) = 2.97e−1 and 1.88e−2 — a
//    domination that widens from 4.24e+1 to 5.33e+6, because with prime moduli the
//    uncovered set IS a product and needs no method. And the direction is
//    fatal independently of the size: a density lower bound controls the
//    AVERAGE gap, and G₂ is the MAXIMUM gap.
//
// 9. THE HYBRID DIES AT MERTENS, WHICH IS THE SEVENTH ARRIVAL. Disciplining
//    the primes up to y with distortion and union-bounding (y, x] needs
//    2·Σ_{y<p≤x} 1/p < 1 − η, i.e. y ≥ x^c with c = e^{−(1−η)/2} = 0.7278, and
//    then the window must exceed exp(θ(y)) = exp(x^{0.7278+o(1)}) — 10^{8.35}
//    at x = 79 and 10^1857.85 at x = 10⁵. The step is not carried out here
//    because it needs the untreated classes to equidistribute under the
//    DISTORTED measure, which is unverified; what is computed is the arithmetic
//    the hybrid would have to satisfy, and it is superpolynomial before the
//    unverified step is even reached.
//
// 10. THE EXCHANGE RATE, WHICH IS THE ADDRESS OF THE WALL. The union bound
//    needs no ambient, is linear in the window, and pays a divergent Σ2/p. The
//    distortion method pays a convergent Σ4/p², and buys it with ambient
//    length: every prime it disciplines must have its modulus fully resolved
//    inside the ambient, so the certified window is at least the primorial of
//    those primes. The two economies price the same object at opposite ends,
//    neither is polynomial in x, and the class count κ enters both only as
//    κ/p (union) and κ²/p² (distortion) — a factor 4 in a sum whose supremum
//    at κ = 1 is 0.09. A method that prices classes quadratically and windows
//    exponentially is not the one that decides a polynomial-window question.
//
// 11. WHAT THIS FILE DOES NOT SHOW. Nothing here improves any bound the corpus
//    uses. H*(x) is carried as an input and is NOT a certificate: it lies below
//    G₂ at every shared level (max ratio 0.53), because the dependency graph it
//    reads is unverified (import-shearer.md §5). The block bound L ≤ 62 is not
//    compared: L counts slots of the fold, and converting it to a window length
//    needs the block's own spacing.
