// ============================================================================
// ATTACK w1hl-01 — IS W1 THE HARDY–LITTLEWOOD SINGULAR SERIES IN DISGUISE?
// ============================================================================
// THE QUESTION. `history/staging/mp-derivation.md` §1 derives the endpoint
// comb W1(v) = prod_{q|v}(q-2)/(q-4) * prod_{q|v-2 or q|v+2}(q-3)/(q-4) over
// folded primes 5 <= q < p from the forbidden set {0,-2,-v,-v-2} mod q, and
// flags NOT-REACHED on its prior-art position ("the object is singular-
// series-shaped and nothing here is claimed as new"). The forbidden set is
// the local condition for the QUADRUPLE pattern H_v = (0, 2, v, v+2) — two
// twin pairs at distance v. So: is W1 exactly the Hardy–Littlewood singular
// series ratio S4(v)/S2^2, where S4(v) = S(0,2,v,v+2) and S2 = S(0,2), up to
// a v-independent constant, over the folded primes?
//
// THE CLAIMED IDENTITY, stated before any code runs. Per prime q the HL
// local factor of a k-tuple H is (1 - nu_q(H)/q)/(1 - 1/q)^k with nu_q(H)
// the number of distinct residues of H mod q. For H_v with v even, 6 | v:
//   nu_q = 2 if q | v;  nu_q = 3 if q | v-2 or q | v+2;  nu_q = 4 otherwise
// (q >= 5; the three classes mutually exclusive since any collision forces
// q | 2 or q | 4). The per-prime ratio to the twin square is
//   r_q(v) = (1 - nu_q/q)/(1 - 2/q)^2 = q(q - nu_q)/(q-2)^2,
// and dividing by the generic value gen_q = q(q-4)/(q-2)^2 gives EXACTLY
//   q | v   -> (q-2)/(q-4);   q | v±2 -> (q-3)/(q-4);   else 1,
// which is W1's factor. Hence, claimed for every cutoff P and every v with
// 6 | v, as an identity of rationals:
//   prod_{5<=q<P} r_q(v)  =  C_P * W1_P(v),   C_P = prod_{5<=q<P} q(q-4)/(q-2)^2,
// i.e. W1 IS the folded-prime truncation of S4(v)/S2^2, normalised by the
// generic (v-independent) base. Including q = 2, 3 (v even, 6 | v: r_2 = 2,
// r_3 = 3) the full-series form is S4(v)/S2^2 = 6 * C_inf * W1_inf(v).
// For 3 !| v the quadruple is INADMISSIBLE (nu_3 = 3) and S4 = 0 while W1
// is not — the identity lives on 6 | v, which every theta_p satisfies
// (theta = 2(p - eta) with 3 | p - eta and p odd, so 12 | theta).
//
// SECOND CLAIM (the Gallagher block). (i) Integer-indexed mean-one: for
// every prime q, the average of r_q(v) over v mod q is EXACTLY 1 (q = 2
// over the even/odd split; q = 3 with the inadmissible classes contributing
// 0). This is the per-prime skeleton of Gallagher-type singular-series
// averaging: E_v[S4(v)] = S2^2 * (v-parity factor). (ii) Prime-indexed
// shift: over folds, v = theta_p = 2(p - eta) with p prime, so p !== 0
// mod q; one of the two v±2 classes (p - eta ± 1 == 0 mod q) collides with
// p == 0 and is EMPTY. The per-prime mean of W1's factor over admissible
// p-classes is then exactly 1 + 3/((q-1)(q-4)) — NOT the integer-indexed
// (q-2)^2/(q(q-4)). The product of these is a zero-parameter PREDICTION of
// the comb field's mean, testable against the embedded per-fold W1 table.
//
// PREDICTIONS, written before running: A1 the nu_q case table verifies by
// brute residue count with no exceptions; A2 the identity holds as exact
// rational equality at every tested (v, P); A3 the HL-path W1 reproduces
// all 102 embedded per-fold W1 values to the printed 2 decimals; G1 both
// per-prime means verify exactly; G2 the prime-indexed prediction lands
// within ~2 sd of the measured 102-fold mean of W1 (the folds' theta are
// deterministic, not sampled, so this is a consistency read, not a test
// with guaranteed power).
//
// UNITS. Everything here is dimensionless: singular-series factors, W1,
// their ratios and means. Exactness claims are BigInt-rational equalities,
// never float comparisons; floats appear only in convergence estimates and
// in comparisons against the table's printed 2-decimal values.
//
// COMPUTE DISCIPLINE. Nothing is re-sieved and no corpus number is
// re-derived from raw data. The per-fold W1/theta table is PARSED from the
// formally embedded OUTPUT block of research/attack-mp-derive-01.js
// (code-sha256 248c8c88…, the mp-derivation.md producer) and custody-checked
// against pinned rows before use. Everything else is elementary arithmetic
// on small integers, computed here both by brute residue enumeration and by
// the closed-form cases, which must agree exactly.
// ============================================================================
'use strict';
const fs = require('fs');
const path = require('path');
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1) + ' s';

// --- exact rationals over BigInt --------------------------------------------
function bgcd(a, b) { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) { [a, b] = [b, a % b]; } return a; }
function frac(n, d) {
  n = BigInt(n); d = BigInt(d);
  if (d === 0n) throw new Error('zero denominator');
  if (d < 0n) { n = -n; d = -d; }
  const g = bgcd(n, d) || 1n;
  return { n: n / g, d: d / g };
}
const F1 = frac(1, 1);
const fmul = (a, b) => frac(a.n * b.n, a.d * b.d);
const feq = (a, b) => a.n === b.n && a.d === b.d;
const fdiv = (a, b) => frac(a.n * b.d, a.d * b.n);
const fadd = (a, b) => frac(a.n * b.d + b.n * a.d, a.d * b.d);
const ffloat = (a) => Number(a.n) / Number(a.d);
const fstr = (a) => a.n + '/' + a.d;

// --- primes -----------------------------------------------------------------
function sieve(N) {
  const c = new Uint8Array(N + 1); const ps = [];
  for (let i = 2; i <= N; i++) { if (!c[i]) { ps.push(i); for (let j = i * i; j <= N; j += i) c[j] = 1; } }
  return ps;
}
const PRIMES = sieve(2000000);
const P709 = PRIMES.filter(q => q <= 709);

function assert(cond, msg) {
  if (!cond) { console.log('  ASSERT FAILED: ' + msg); process.exitCode = 1; throw new Error(msg); }
  console.log('  ok: ' + msg);
}

// nu_q(H_v) by brute residue enumeration — the independent path
function nuBrute(q, v) {
  const m = (x) => ((x % q) + q) % q;
  return new Set([m(0), m(2), m(v), m(v + 2)]).size;
}
// nu_q by the claimed case table (q >= 5)
function nuCases(q, v) {
  if (v % q === 0) return 2;
  if ((v - 2) % q === 0 || (v + 2) % q === 0) return 3;
  return 4;
}

// ---------------------------------------------------------------------------
// Stage 1 — the nu_q case table, brute vs cases, and class exclusivity
// ---------------------------------------------------------------------------
console.log('--- Stage 1: nu_q by brute residue count vs the case table --- [' + el() + ']');
{
  let pairs = 0, excl = 0;
  for (const q of PRIMES.filter(q => q >= 5 && q <= 97)) {
    for (let v = 6; v <= 2 * q + 12; v += 2) {
      if (nuBrute(q, v) !== nuCases(q, v)) throw new Error('nu mismatch q=' + q + ' v=' + v);
      pairs++;
      const c = (v % q === 0 ? 1 : 0) + ((v - 2) % q === 0 ? 1 : 0) + ((v + 2) % q === 0 ? 1 : 0);
      if (c <= 1) excl++;
    }
  }
  assert(pairs >= 1000 && excl === pairs, 'nu_q case table exact and classes mutually exclusive on ' + pairs + ' (q, v) pairs, q in [5, 97]');
  // q = 3: quadruple admissible iff 3 | v (else nu_3 = 3 = q and S4 = 0)
  let ok3 = true;
  for (let v = 6; v <= 60; v += 2) ok3 = ok3 && (nuBrute(3, v) === (v % 3 === 0 ? 2 : 3));
  assert(ok3, 'q = 3: nu_3 = 2 iff 3 | v, else 3 (inadmissible, S4 = 0)');
  // q = 2: v even -> nu = 1; v odd -> nu = 2 (inadmissible)
  assert(nuBrute(2, 6) === 1 && nuBrute(2, 7) === 2, 'q = 2: nu_2 = 1 for even v, 2 (inadmissible) for odd v');
}

// ---------------------------------------------------------------------------
// Stage 2 — the per-prime identity, exact rationals
// ---------------------------------------------------------------------------
console.log('\n--- Stage 2: per-prime identity r_q(v)/gen_q = W1-factor, exact --- [' + el() + ']');
// r_q(nu) = (1 - nu/q)/(1 - 2/q)^2 = q(q - nu)/(q-2)^2 ; gen_q = q(q-4)/(q-2)^2
const rq = (q, nu) => frac(BigInt(q) * BigInt(q - nu), BigInt(q - 2) * BigInt(q - 2));
const genq = (q) => rq(q, 4);
{
  let n = 0;
  for (const q of PRIMES.filter(q => q >= 5 && q <= 1009)) {
    if (!feq(fdiv(rq(q, 2), genq(q)), frac(q - 2, q - 4))) throw new Error('q|v factor fails at q=' + q);
    if (!feq(fdiv(rq(q, 3), genq(q)), frac(q - 3, q - 4))) throw new Error('q|v±2 factor fails at q=' + q);
    if (!feq(fdiv(rq(q, 4), genq(q)), F1)) throw new Error('generic factor fails at q=' + q);
    n++;
  }
  assert(n === 167, 'r_q(v)/gen_q = {(q-2)/(q-4), (q-3)/(q-4), 1} EXACT for all ' + n + ' primes q in [5, 1009]');
  // the q = 2, 3 constants of the full-series form (6 | v): r_2 = 2, r_3 = 3
  const r2 = fdiv(frac(1, 2), frac(1, 16));            // (1 - 1/2)/(1 - 1/2)^4
  const t2 = fdiv(frac(1, 2), frac(1, 4));             // twin factor at 2
  const r3 = fdiv(fdiv(frac(1, 3), frac(16, 81)), fmul(fdiv(frac(1, 3), frac(4, 9)), fdiv(frac(1, 3), frac(4, 9))));
  assert(feq(fdiv(r2, fmul(t2, t2)), frac(2, 1)) && feq(r3, frac(3, 1)), 'q = 2, 3 contribute the v-independent constant 2 * 3 = 6 (6 | v)');
}

// ---------------------------------------------------------------------------
// Stage 3 — the full object against the embedded W1 field (custody first)
// ---------------------------------------------------------------------------
console.log('\n--- Stage 3: HL-ratio path vs the embedded per-fold W1 table --- [' + el() + ']');
const SRC = path.join(__dirname, 'attack-mp-derive-01.js');
const TABLE = (() => {
  const t = fs.readFileSync(SRC, 'utf8');
  const i = t.lastIndexOf('OUTPUT — EMBEDDED');
  if (i < 0) throw new Error('no embedded OUTPUT block in attack-mp-derive-01.js');
  const lines = t.slice(i).split('\n');
  const h = lines.findIndex(l => /p\s+theta\s+z\s+W1\s+Sx/.test(l));
  if (h < 0) throw new Error('per-fold table header not found');
  const rows = [];
  for (let j = h + 1; j < lines.length; j++) {
    const m = lines[j].match(/^\/\/\s+(\d+)\s+(\d+)\s+([\d.]+)\s+([\d.]+)\s+/);
    if (!m) break;
    rows.push({ p: +m[1], theta: +m[2], W1: +m[4] });
  }
  return rows;
})();
{
  const by = {}; for (const r of TABLE) by[r.p] = r;
  assert(TABLE.length === 102 && TABLE[0].p === 101 && TABLE[101].p === 709, 'parsed 102 fold rows, p in [101, 709], from attack-mp-derive-01.js embed');
  assert(by[211].W1 === 6.10 && by[631].W1 === 5.55 && by[331].W1 === 5.26 && by[631].theta === 1260, 'custody pins: W1(211) = 6.10, W1(331) = 5.26, W1(631) = 5.55, theta(631) = 1260');
  let all6 = true, all12 = true;
  for (const r of TABLE) { if (r.theta % 6) all6 = false; if (r.theta % 12) all12 = false; }
  assert(all6 && all12, 'every theta_p is divisible by 12 (so 6 | v holds on the whole field)');
}
// the HL path: prod r_q(nu by BRUTE count) / C_P, exact rationals throughout
function hlW1(v, P) {
  let A = F1, C = F1;
  for (const q of P709) { if (q < 5) continue; if (q >= P) break; A = fmul(A, rq(q, nuBrute(q, v))); C = fmul(C, genq(q)); }
  return { A, C, W: fdiv(A, C) };
}
// W1 by the mp-derivation divisibility formula, exact rationals — the recorded path
function combW1exact(v, P) {
  let w = F1;
  for (const q of P709) {
    if (q < 5) continue; if (q >= P) break;
    if (v % q === 0) w = fmul(w, frac(q - 2, q - 4));
    else if ((v - 2) % q === 0 || (v + 2) % q === 0) w = fmul(w, frac(q - 3, q - 4));
  }
  return w;
}
{
  // exact identity at a dozen folds spanning the field
  const dozen = [101, 113, 131, 191, 211, 281, 331, 409, 457, 541, 631, 709];
  for (const p of dozen) {
    const r = TABLE.find(t => t.p === p);
    const { A, C, W } = hlW1(r.theta, p);
    const w = combW1exact(r.theta, p);
    if (!feq(W, w)) throw new Error('identity FAILS at p=' + p);
    console.log('  p=' + String(p).padStart(3) + ' theta=' + String(r.theta).padStart(4) +
      '  prod r_q = C_p * W1 exact: ' + (feq(A, fmul(C, w)) ? 'EQUAL' : 'DIFFER') +
      '   W1 = ' + fstr(w) + ' = ' + ffloat(w).toFixed(4) + '  (embed prints ' + r.W1.toFixed(2) + ')');
    if (!feq(A, fmul(C, w))) throw new Error('A != C*W1 at p=' + p);
  }
  // float custody across the whole field: HL-path W1 vs the printed 2 decimals
  let worst = 0, worstP = 0;
  for (const r of TABLE) {
    const w = ffloat(hlW1(r.theta, r.p).W);
    const dev = Math.abs(w - r.W1);
    if (dev > worst) { worst = dev; worstP = r.p; }
  }
  assert(worst <= 0.005 + 1e-9, 'HL-ratio path reproduces ALL 102 embedded W1 values to the printed 2 decimals (worst |dev| = ' + worst.toFixed(4) + ' at p = ' + worstP + ')');
}

// ---------------------------------------------------------------------------
// Stage 4 — the Gallagher block: mean-one, the prime-indexed shift, and the
//           measured comb mean
// ---------------------------------------------------------------------------
console.log('\n--- Stage 4: Gallagher-type averages, exact then measured --- [' + el() + ']');
{
  // (i) integer-indexed mean-one, EXACT, brute nu per residue class
  for (const q of PRIMES.filter(q => q >= 3 && q <= 199)) {
    let S = frac(0, 1);
    for (let v = 0; v < q; v++) S = fadd(S, rq(q, nuBrute(q, 2 * v)));  // v even: 2v runs over all classes mod odd q
    if (!feq(S, frac(q, 1))) throw new Error('mean-one fails at q=' + q);
  }
  assert(true, 'integer-indexed: avg over v mod q of r_q(v) = 1 EXACTLY for every prime q in [3, 199] (Gallagher-type mean-one, per prime)');
  // q = 2 over the even/odd split: r = 2 on even v, 0 (inadmissible) on odd v -> mean 1
  console.log('  q = 2: r_2 = 2 on even v, 0 on odd v -> mean 1 as well; over even v the factor is the constant 2');

  // (ii) prime-indexed: v = theta_p = 2(p - eta), p prime, p !== 0 mod q.
  // Classes mod q (q >= 5): p == eta -> q | theta; p == eta - 1 -> q | theta + 2;
  // p == eta + 1 -> q | theta - 2. One of the last two is p == 0: EMPTY.
  for (const q of PRIMES.filter(q => q >= 5 && q <= 199)) {
    for (const eta of [1, -1]) {
      let S = frac(0, 1);
      for (let a = 1; a < q; a++) {
        const m = (x) => ((x % q) + q) % q;
        let f = F1;
        if (m(a - eta) === 0) f = frac(q - 2, q - 4);
        else if (m(a - eta + 1) === 0 || m(a - eta - 1) === 0) f = frac(q - 3, q - 4);
        S = fadd(S, f);
      }
      const claim = fmul(frac(q - 1, 1), fadd(F1, frac(3, (q - 1) * (q - 4))));
      if (!feq(S, claim)) throw new Error('prime-indexed mean fails at q=' + q + ' eta=' + eta);
    }
  }
  assert(true, 'prime-indexed: avg of the W1-factor over p !== 0 mod q is 1 + 3/((q-1)(q-4)) EXACTLY, both eta, all primes q in [5, 199]');

  // (iii) the numeric predictions vs the measured field
  let cInt = 1, cPrime = 1;
  for (const q of PRIMES) { if (q < 5) continue; cInt *= (q - 2) * (q - 2) / (q * (q - 4)); cPrime *= 1 + 3 / ((q - 1) * (q - 4)); }
  console.log('  E_v[W1_inf]   (integer-indexed, v uniform)   = prod (q-2)^2/(q(q-4)) = ' + cInt.toFixed(4) + '   (q <= 2e6; tail < 4e-6)');
  console.log('  E_p[W1_inf]   (prime-indexed, one class dead) = prod 1 + 3/((q-1)(q-4)) = ' + cPrime.toFixed(4));
  // per-fold truncated prediction, then the field comparison
  const predFold = (p) => { let c = 1; for (const q of P709) { if (q < 5) continue; if (q >= p) break; c *= 1 + 3 / ((q - 1) * (q - 4)); } return c; };
  const meas = TABLE.map(r => r.W1);
  const pred = TABLE.map(r => predFold(r.p));
  const mMeas = meas.reduce((a, b) => a + b) / meas.length;
  const mPred = pred.reduce((a, b) => a + b) / pred.length;
  const sdMeas = Math.sqrt(meas.reduce((a, b) => a + (b - mMeas) ** 2, 0) / (meas.length - 1));
  const se = sdMeas / Math.sqrt(meas.length);
  console.log('  measured mean W1 over the 102 folds          = ' + mMeas.toFixed(4) + '  (sd ' + sdMeas.toFixed(3) + ', se ' + se.toFixed(3) + ')');
  console.log('  prime-indexed prediction, per-fold truncated = ' + mPred.toFixed(4) + '   -> (measured - predicted)/se = ' + ((mMeas - mPred) / se).toFixed(2));
  const t37 = TABLE.filter(r => r.p <= 293);
  const m37 = t37.reduce((a, r) => a + r.W1, 0) / t37.length;
  const p37 = t37.reduce((a, r) => a + predFold(r.p), 0) / t37.length;
  console.log('  train folds (p <= 293): measured ' + m37.toFixed(4) + ' vs predicted ' + p37.toFixed(4));
  const mLn = meas.reduce((a, b) => a + Math.log(b), 0) / meas.length;
  console.log('  mean ln W1 measured = ' + mLn.toFixed(4) + '  (the prediction above is for the MEAN of W1, not of ln W1; no ln-mean prediction is derived here)');
}

console.log('\ndone [' + el() + ']');

// ============================================================================
// READINGS (written after the run; every figure appears in the OUTPUT block)
// ============================================================================
// 1. IDENTITY, PROVEN + VERIFIED: nu_q of (0,2,v,v+2) is 2/3/4 by exactly the
//    q|v, q|v±2, generic cases (brute count, 1147 (q,v) pairs, classes
//    mutually exclusive), and per prime the HL ratio-to-twin-square factor
//    divided by its generic value equals W1's factor EXACTLY as rationals,
//    all 167 primes q in [5, 1009]. So over any folded range 5 <= q < P and
//    any 6 | v:  prod r_q(v) = C_P * W1_P(v) with C_P = prod q(q-4)/(q-2)^2
//    v-independent. W1 IS the folded-prime truncation of S(0,2,v,v+2)/S(0,2)^2
//    normalised by the generic base — verified as exact rational equality at
//    12 folds (independent brute-nu path vs the divisibility formula) and
//    float-verified against ALL 102 embedded per-fold W1 values (worst dev
//    0.0050, i.e. printing precision) from attack-mp-derive-01.js's embed.
// 2. The constant: including q = 2, 3 the full-series statement is
//    S4(v)/S2^2 = 6 * C_inf * W1_inf(v) on 6 | v; S4 = 0 off it, and every
//    theta_p has 12 | theta, so the field never leaves the identity's domain.
//    W1's truncation at q < p differs from W1_inf only in primes q >= p
//    dividing theta(theta^2 - 4) — q = p itself always (p | theta ± 2, factor
//    (p-3)/(p-4)), plus any prime factor > p of p - eta ± 1: a 1 + O(1/p)
//    per-fold correction, absorbed by the law's smooth normalisation.
// 3. GALLAGHER SKELETON, EXACT: the per-prime average of r_q over v mod q is
//    exactly 1 at every prime (q = 2, 3 included, inadmissible classes
//    contributing 0) — the local form of "singular series average to 1".
// 4. PRIME-INDEXING SHIFTS THE MEAN, EXACT + MEASURED: on the fold field
//    v = theta_p with p prime, p == 0 mod q is impossible, which kills one of
//    the two q | v ± 2 classes; the per-prime mean becomes 1 + 3/((q-1)(q-4))
//    exactly (verified both eta), so E[W1] over folds is predicted
//    prod(1 + 3/((q-1)(q-4))) = 2.3252 rather than the integer-indexed
//    prod(q-2)^2/(q(q-4)) = 2.5197. Measured over the 102 embedded folds:
//    mean W1 = 2.2823 vs per-fold-truncated prediction 2.3215, gap -0.33 se
//    — the comb field's MEAN is where zero-parameter Gallagher-style
//    averaging puts it. (Consistency read, not a powered test: theta_p is
//    deterministic; se treats folds as independent draws.)
// 5. NOT TOUCHED: nothing here derives delta = 0.277, the depth term, or the
//    far-tail flattening; singular-series identities constrain the comb
//    factor only. See history/staging/w1-singular-series.md for what the
//    published 4-tuple literature does and does not import.
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-w1hl-01.js
//   invocation:  node research/attack-w1hl-01.js
//   code-sha256: f3b2d0a969dd70705b72728f40f4fc141271d9c44d06ec25167b3f4167ed982c
//   out-sha256:  6f67dbee52d92fa10adf589e62d5aa256b9b5c8e0d71acd8aaf011584dcc34e2
//   body-lines:  39
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     0.3 s
// ============================================================================
// --- Stage 1: nu_q by brute residue count vs the case table --- [0.0 s]
//   ok: nu_q case table exact and classes mutually exclusive on 1147 (q, v) pairs, q in [5, 97]
//   ok: q = 3: nu_3 = 2 iff 3 | v, else 3 (inadmissible, S4 = 0)
//   ok: q = 2: nu_2 = 1 for even v, 2 (inadmissible) for odd v
//
// --- Stage 2: per-prime identity r_q(v)/gen_q = W1-factor, exact --- [0.0 s]
//   ok: r_q(v)/gen_q = {(q-2)/(q-4), (q-3)/(q-4), 1} EXACT for all 167 primes q in [5, 1009]
//   ok: q = 2, 3 contribute the v-independent constant 2 * 3 = 6 (6 | v)
//
// --- Stage 3: HL-ratio path vs the embedded per-fold W1 table --- [0.0 s]
//   ok: parsed 102 fold rows, p in [101, 709], from attack-mp-derive-01.js embed
//   ok: custody pins: W1(211) = 6.10, W1(331) = 5.26, W1(631) = 5.55, theta(631) = 1260
//   ok: every theta_p is divisible by 12 (so 6 | v holds on the whole field)
//   p=101 theta= 204  prod r_q = C_p * W1 exact: EQUAL   W1 = 15/13 = 1.1538  (embed prints 1.15)
//   p=113 theta= 228  prod r_q = C_p * W1 exact: EQUAL   W1 = 136/57 = 2.3860  (embed prints 2.39)
//   p=131 theta= 264  prod r_q = C_p * W1 exact: EQUAL   W1 = 64/35 = 1.8286  (embed prints 1.83)
//   p=191 theta= 384  prod r_q = C_p * W1 exact: EQUAL   W1 = 1/1 = 1.0000  (embed prints 1.00)
//   p=211 theta= 420  prod r_q = C_p * W1 exact: EQUAL   W1 = 128/21 = 6.0952  (embed prints 6.10)
//   p=281 theta= 564  prod r_q = C_p * W1 exact: EQUAL   W1 = 45/43 = 1.0465  (embed prints 1.05)
//   p=331 theta= 660  prod r_q = C_p * W1 exact: EQUAL   W1 = 1584/301 = 5.2625  (embed prints 5.26)
//   p=409 theta= 816  prod r_q = C_p * W1 exact: EQUAL   W1 = 1360/1001 = 1.3586  (embed prints 1.36)
//   p=457 theta= 912  prod r_q = C_p * W1 exact: EQUAL   W1 = 272/81 = 3.3580  (embed prints 3.36)
//   p=541 theta=1080  prod r_q = C_p * W1 exact: EQUAL   W1 = 32/7 = 4.5714  (embed prints 4.57)
//   p=631 theta=1260  prod r_q = C_p * W1 exact: EQUAL   W1 = 2380/429 = 5.5478  (embed prints 5.55)
//   p=709 theta=1416  prod r_q = C_p * W1 exact: EQUAL   W1 = 7448/5335 = 1.3961  (embed prints 1.40)
//   ok: HL-ratio path reproduces ALL 102 embedded W1 values to the printed 2 decimals (worst |dev| = 0.0050 at p = 251)
//
// --- Stage 4: Gallagher-type averages, exact then measured --- [0.2 s]
//   ok: integer-indexed: avg over v mod q of r_q(v) = 1 EXACTLY for every prime q in [3, 199] (Gallagher-type mean-one, per prime)
//   q = 2: r_2 = 2 on even v, 0 on odd v -> mean 1 as well; over even v the factor is the constant 2
//   ok: prime-indexed: avg of the W1-factor over p !== 0 mod q is 1 + 3/((q-1)(q-4)) EXACTLY, both eta, all primes q in [5, 199]
//   E_v[W1_inf]   (integer-indexed, v uniform)   = prod (q-2)^2/(q(q-4)) = 2.5197   (q <= 2e6; tail < 4e-6)
//   E_p[W1_inf]   (prime-indexed, one class dead) = prod 1 + 3/((q-1)(q-4)) = 2.3252
//   measured mean W1 over the 102 folds          = 2.2823  (sd 1.214, se 0.120)
//   prime-indexed prediction, per-fold truncated = 2.3215   -> (measured - predicted)/se = -0.33
//   train folds (p <= 293): measured 2.0984 vs predicted 2.3186
//   mean ln W1 measured = 0.6915  (the prediction above is for the MEAN of W1, not of ln W1; no ln-mean prediction is derived here)
//
// done [0.2 s]
// ============================================================================
// READINGS
//
