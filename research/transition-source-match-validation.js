#!/usr/bin/env node
'use strict';
// ============================================================================
// FINITE ALGEBRA FOR THE TRANSITION SOURCE MATCH (transition-source-match.md)
// ============================================================================
// Question: are the two load-bearing rewritings used to match R_11 against the
// named source statements exact, and is the level arithmetic that disqualifies
// those statements exact?
//
// Nothing asymptotic is tested here. The checks are:
//
//   (A) the Barban-Vehov / Goldston-Yildirim representation of the transition
//       divisor weight,
//         Theta(m) = [ Lambda_z(m) - Lambda_D(m) ] / log(z/D) - M(m,D),
//       written multiplied through by log(z/D) so that it is an identity of
//       formal integer combinations of the symbols log z, log D, log d.
//       Lambda_R(m) = sum_{d|m, d<=R} mu(d) log(R/d) is Goldston-Yildirim
//       (1.1); M(m,D) = sum_{d|m, d<=D} mu(d).
//   (A') control: dropping the M(m,D) term must break (A).
//
//   (B) the cofactor rearrangement T(n) = sum_{r|n, r>W} Lambda(r) Theta(n/r)
//       against the defining T(n) = sum_{d|n, D<d<z} mu(d) rho(d) beta_W(n/d),
//       both multiplied by log(z/D) and compared as formal degree-two integer
//       combinations of log z, log d and log p. All prime powers r are kept
//       with weight Lambda(p^a) = log p.
//   (B') control: replacing the inner condition d | (n/r) by d | n must break
//       (B), i.e. the exchange of summation is doing work.
//
//   (C) the singleton-fibre fact at the actual transition cuts: with
//       eta = 1/400, D_L = 2^(151 j/200) and D_R = 2^(189 j/200) at x = 2^j,
//       exact BigInt comparison gives D_L * D_R > 2x, so for every admissible
//       pair (d,e) with (d,e) | 2 the modulus lcm(d,e) >= de/2 exceeds x and
//       #{n in J_x : d|n, e|(n-2)} <= 1.
//   (C') control: at a pair of exponents summing below one the same comparison
//       must fail, so (C) is a statement about these cuts and not a tautology.
//
//   (D) exact rational exponent arithmetic behind the source comparison:
//       19/25 + 19/20 = 171/100; the Goldston-Yildirim Theorem 8.1 error
//       O(N^(theta_1+theta_2)) beats the main term only for theta_1+theta_2 < 1
//       and here the sum is 171/100 - 2 eta > 1 for every eta < 71/200;
//       the Granville-Koukoulopoulos-Maynard Theorem 1.3 (1.15) range R^(2k) <= x at
//       k = 1 needs exponent <= 1/2 and both cuts exceed 1/2; the recorded
//       regional product supremum 87/100 is below 171/100; and the absolute
//       route WITH mass log^2 x would need a saving above 2 against the 1/3000 of
//       Matomaki-Radziwill-Tao (1.2).
//
// NOT checked here: any imported theorem, any asymptotic bound, any sign, any
// correlation estimate, and the twin margin, which remains open.
// ============================================================================

let checks = 0;
function assert(cond, msg) {
  checks++;
  if (!cond) { console.error('FAIL: ' + msg); process.exit(1); }
}

// ----------------------------------------------------------- arithmetic ---
const NMAX = 20000;
const spf = new Int32Array(NMAX + 1);
for (let i = 2; i <= NMAX; i++) {
  if (spf[i] === 0) for (let j = i; j <= NMAX; j += i) if (spf[j] === 0) spf[j] = i;
}
function factor(n) {                       // -> Map prime -> exponent
  const f = new Map();
  while (n > 1) { const p = spf[n]; let a = 0; while (n % p === 0) { n /= p; a++; } f.set(p, a); }
  return f;
}
function divisors(n) {
  const f = factor(n); let ds = [1];
  for (const [p, a] of f) {
    const next = [];
    for (const d of ds) { let q = d; for (let i = 0; i <= a; i++) { next.push(q); q *= p; } }
    ds = next;
  }
  return ds.sort((u, v) => u - v);
}
function mobius(n) {
  const f = factor(n); let s = 1;
  for (const [, a] of f) { if (a > 1) return 0; s = -s; }
  return s;
}
// prime powers r | k with r > W, each carrying the symbol log p
function betaTerms(k, W) {
  const out = [];
  for (const [p, a] of factor(k)) { let r = p; for (let i = 1; i <= a; i++) { if (r > W) out.push(p); r *= p; } }
  return out;
}

// --------------------------------------------- formal linear combinations ---
// A vector is a Map from a symbol key to an integer coefficient.
function vadd(v, key, c) { if (c === 0) return; const q = (v.get(key) || 0) + c; if (q === 0) v.delete(key); else v.set(key, q); }
function vequal(a, b) {
  if (a.size !== b.size) return false;
  for (const [k, c] of a) if (b.get(k) !== c) return false;
  return true;
}

// (A) log(z/D) * Theta(m) as defined, versus Lambda_z(m) - Lambda_D(m) - log(z/D)*M(m,D).
// Symbols: 'Z' = log z, 'D' = log D, 'd<val>' = log(val).
function sideA_defn(m, D, z) {                       // sum_{d|m, D<d<z} mu(d) (log z - log d)
  const v = new Map();
  for (const d of divisors(m)) {
    if (d <= D || d >= z) continue;
    const mu = mobius(d); if (mu === 0) continue;
    vadd(v, 'Z', mu); vadd(v, 'd' + d, -mu);
  }
  return v;
}
function sideA_source(m, D, z, withM) {              // Lambda_z - Lambda_D - log(z/D) M(m,D)
  const v = new Map();
  for (const d of divisors(m)) {
    const mu = mobius(d); if (mu === 0) continue;
    if (d <= z) { vadd(v, 'Z', mu); vadd(v, 'd' + d, -mu); }          // Lambda_z
    if (d <= D) { vadd(v, 'D', -mu); vadd(v, 'd' + d, mu); }          // - Lambda_D
    if (withM && d <= D) { vadd(v, 'Z', -mu); vadd(v, 'D', mu); }     // - log(z/D) M(m,D)
  }
  return v;
}

// (B) degree-two forms. Symbol pair key is the sorted join of two symbol keys.
function pairKey(a, b) { return a < b ? a + '|' + b : b + '|' + a; }
function sideB_defn(n, D, z, W) {                    // sum_{d|n, D<d<z} mu(d)(log z - log d) beta_W(n/d)
  const v = new Map();
  for (const d of divisors(n)) {
    if (d <= D || d >= z) continue;
    const mu = mobius(d); if (mu === 0) continue;
    for (const p of betaTerms(n / d, W)) {
      vadd(v, pairKey('Z', 'p' + p), mu);
      vadd(v, pairKey('d' + d, 'p' + p), -mu);
    }
  }
  return v;
}
function sideB_exchanged(n, D, z, W, breakIt) {      // sum_{r|n, r>W} Lambda(r) Theta(n/r)
  const v = new Map();
  for (const [p, a] of factor(n)) {
    let r = p;
    for (let i = 1; i <= a; i++) {
      if (r > W) {
        const inner = breakIt ? n : n / r;
        for (const d of divisors(inner)) {
          if (d <= D || d >= z) continue;
          const mu = mobius(d); if (mu === 0) continue;
          vadd(v, pairKey('Z', 'p' + p), mu);
          vadd(v, pairKey('d' + d, 'p' + p), -mu);
        }
      }
      r *= p;
    }
  }
  return v;
}

// ------------------------------------------------------------------ runs ---
const cutSets = [[6, 40], [10, 60], [12, 200], [30, 500], [77, 1500]];
let aCases = 0, aNontrivial = 0, aControl = 0;
for (const [D, z] of cutSets) {
  for (let m = 1; m <= 4000; m++) {
    const lhs = sideA_defn(m, D, z), rhs = sideA_source(m, D, z, true);
    assert(vequal(lhs, rhs), `A failed at m=${m}, D=${D}, z=${z}`);
    aCases++; if (lhs.size > 0) aNontrivial++;
    if (!vequal(lhs, sideA_source(m, D, z, false))) aControl++;
  }
}

const bSets = [[6, 40, 3], [10, 60, 5], [12, 200, 7], [30, 500, 11]];
let bCases = 0, bNontrivial = 0, bControl = 0;
for (const [D, z, W] of bSets) {
  for (let n = 1; n <= 4000; n++) {
    const lhs = sideB_defn(n, D, z, W), rhs = sideB_exchanged(n, D, z, W, false);
    assert(vequal(lhs, rhs), `B failed at n=${n}, D=${D}, z=${z}, W=${W}`);
    bCases++; if (lhs.size > 0) bNontrivial++;
    if (!vequal(lhs, sideB_exchanged(n, D, z, W, true))) bControl++;
  }
}

// (C) singleton fibres at the actual cuts, exact BigInt, eta = 1/400.
// x = 2^(200k); D_L = 2^(151k) = floor(x^(19/25-2eta)); D_R = 2^(189k).
let cCases = 0;
for (let k = 1; k <= 6; k++) {
  const x = 1n << BigInt(200 * k);
  const DL = 1n << BigInt(151 * k);
  const DR = 1n << BigInt(189 * k);
  assert(DL * DR > 2n * x, `C failed at k=${k}`);
  cCases++;
}
// (C') control: exponents 3/10 and 4/10 sum below one, the comparison must fail.
let cControl = 0;
for (let k = 1; k <= 6; k++) {
  const x = 1n << BigInt(10 * k);
  if (!((1n << BigInt(3 * k)) * (1n << BigInt(4 * k)) > 2n * x)) cControl++;
}
assert(cControl === 6, 'C control did not fire');

// (D) exact rational exponent arithmetic. Fractions as [num, den] with den > 0.
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; }
function red(a) { const g = gcd(a[0], a[1]) || 1; return [a[0] / g, a[1] / g]; }
function cmp(a, b) { return a[0] * b[1] - b[0] * a[1]; }
function add(a, b) { return [a[0] * b[1] + b[0] * a[1], a[1] * b[1]]; }
function sub(a, b) { return [a[0] * b[1] - b[0] * a[1], a[1] * b[1]]; }
const wL = [19, 25], wR = [19, 20], one = [1, 1], half = [1, 2];
const sum = add(wL, wR);
assert(cmp(sum, [171, 100]) === 0, '19/25 + 19/20 must equal 171/100');
for (const eta of [[1, 400], [1, 500], [1, 1000]]) {
  const thetaSum = sub(sum, add(eta, eta));                 // (19/25-eta)+(19/20-eta)
  assert(cmp(thetaSum, one) > 0, 'GY 8.1 error exponent must exceed one');
  assert(cmp(sub(wL, eta), half) > 0 && cmp(sub(wR, eta), half) > 0,
    'both transition cuts must exceed the GKM k=1 range exponent 1/2');
  const dSum = sub(sum, add(add(eta, eta), add(eta, eta))); // lower cuts, 2eta each
  assert(cmp(dSum, one) > 0, 'lower transition cuts must also have product exponent above one');
}
assert(cmp([71, 200], [1, 400]) > 0, 'the eta threshold 71/200 must exceed the admissible range');
assert(cmp([87, 100], [171, 100]) < 0, 'recorded regional product supremum must be below the corner');
assert(cmp(sub([0, 1], [1, 3000]), [0, 1]) < 0, 'mass-one rate tends to zero; no universal two-log requirement');
assert(cmp([2, 1], [1, 3000]) > 0, 'conditional mass-log^2 comparison: 2 exceeds 1/3000');

console.log('Finite checks for the transition source match: PASS');
console.log(`(A) Barban-Vehov representation: ${aCases} cases, ${aNontrivial} with a nonzero form; control fired ${aControl} times`);
console.log(`(B) cofactor exchange: ${bCases} cases, ${bNontrivial} with a nonzero form; control fired ${bControl} times`);
console.log(`(C) singleton fibres at eta=1/400: ${cCases} scales verified; low-exponent control fired ${cControl} times`);
const sumR = red(sum);
console.log(`(D) transition cut exponent sum ${sumR[0]}/${sumR[1]}, above one; regional product supremum 87/100 below it; exact assertions: ${checks}`);
console.log('No imported theorem, correlation estimate, sign or twin margin is tested here.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/transition-source-match-validation.js
//   invocation:  node research/transition-source-match-validation.js
//   code-sha256: eb7f394ff92e32de9f58776ba18bca1a68ef9c52e6957e16f9b4c6c7f7cd7708
//   out-sha256:  dfab5d74596ffb2dcaea1795df799227677e61b5f2f781a1b98276688e2df462
//   body-lines:  6
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.2 s
// ============================================================================
// Finite checks for the transition source match: PASS
// (A) Barban-Vehov representation: 20000 cases, 12479 with a nonzero form; control fired 7621 times
// (B) cofactor exchange: 16000 cases, 7000 with a nonzero form; control fired 9152 times
// (C) singleton fibres at eta=1/400: 6 scales verified; low-exponent control fired 6 times
// (D) transition cut exponent sum 171/100, above one; regional product supremum 87/100 below it; exact assertions: 36021
// No imported theorem, correlation estimate, sign or twin margin is tested here.
// ============================================================================
// READINGS
// The Barban-Vehov representation of the transition weight is exact on all
// 20000 cases, 12479 of which carry a nonzero form, so the identity is not
// vacuous on the tested cutoffs. The control that drops the truncated Mobius
// term M(m,D) fires on 7621 cases, so that term is load-bearing: the
// transition weight is a difference of two Goldston-Yildirim weights minus a
// sharp truncated Mobius sum, not a single sieve weight.
// The cofactor exchange holds on all 16000 cases, 7000 with a nonzero form,
// and the control that replaces d | (n/r) by d | n fires 9152 times, so the
// rearrangement is doing work rather than restating the definition. Proper
// prime powers and non-squarefree inputs are inside both sides.
// Every fixed-divisor fibre at the transition cuts is empty or singleton: the 6
// verified scales all satisfy D_L * D_R > 2x with eta = 1/400, and the
// low-exponent control fires on all 6 of its scales, so the conclusion
// belongs to these cuts and is not automatic.
// The assertions include rational exponent arithmetic and the conditional
// mass/rate comparison: 19/25 + 19/20 = 171/100 exceeds one, both
// cuts exceed one half, and the recorded regional product supremum 87/100 is
// below the corner. These are comparisons, not source applications or estimates.
// A representation of mass one has a different rate requirement from mass log^2 x.
// Nothing here bounds any correlation, fixes any sign, or bears on the twin
// margin, which remains open.
// ============================================================================
