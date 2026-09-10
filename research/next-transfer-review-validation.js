#!/usr/bin/env node
'use strict';
// ============================================================================
// FINITE ALGEBRA CHECKS FOR THE ADVERSARIAL REVIEW OF prime-band-transfer.md
// ============================================================================
// Question: which of the *finite* ingredients asserted in that note can be
// checked by exact algebra, independently of the imported analytic theorems?
//
// This file proves nothing asymptotic. It checks, with exact integer or
// rational arithmetic and with active controls:
//
//   (A) g_{B,t}(n) = mu(n) exp(i t L_B(n)/log X) is multiplicative on coprime
//       inputs and 1-bounded, for several bands and several real t.
//   (A') control: g_{B,t} is NOT completely multiplicative, and mu*L_B itself
//       is NOT multiplicative. The note claims exactly this pair, so a test
//       that passed both ways would be vacuous.
//   (B) the window-to-band geometry of section 3: for every n in (N,2N] the
//       symmetric difference between the exact corner-correlation window
//       {r prime : r > V, D_1 < n/r <= D_0} and the pure band
//       (x^{6/25}, x^{6/25+2eta}], x = 2N, lies in the upper strip
//       {r : 2r > x^{6/25+2eta}} union the lower sliver {r <= V+2}.
//   (B') control: shrinking the strip factor from 2 to 1.001 must FAIL.
//   (C) the exponent arithmetic that the note's error budget rests on,
//       cross-multiplied over the integers: 6/25+1/20 = 29/100;
//       29/100+4eta < 1/2 at eta = 1/400; 1/3-1/24 = 7/24 > 1/4;
//       band disjointness (1/2)(6/25) > 1/20+2eta; and the mesh optimisation
//       delta = (log X)^{-c/2} balancing delta^{-1}(log X)^{-c} against delta.
//
// NOT checked here: the Fourier identity (1) as an integral, the pretentious
// distance comparison (2), the imported Tao-Teravainen and MRT statements,
// and every asymptotic claim. Those live in the review note.
// ============================================================================

let checks = 0;
function assert(cond, msg) {
  checks++;
  if (!cond) { console.error('FAIL: ' + msg); process.exit(1); }
}

// ---------------------------------------------------------------- primes ---
function sieve(n) {
  const s = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) {
    if (!s[i]) { out.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; }
  }
  return out;
}
const PRIMES = sieve(200000);
const PSET = new Set(PRIMES);

function factor(n) {                       // returns Map prime -> exponent
  const f = new Map(); let m = n;
  for (const p of PRIMES) {
    if (p * p > m) break;
    while (m % p === 0) { f.set(p, (f.get(p) || 0) + 1); m /= p; }
  }
  if (m > 1) f.set(m, (f.get(m) || 0) + 1);
  return f;
}
function mobius(n) {
  if (n === 1) return 1;
  const f = factor(n); let s = 1;
  for (const e of f.values()) { if (e > 1) return 0; s = -s; }
  return s;
}
function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }

// ------------------------------------------------ (A) multiplicative lift ---
// L_B(n) = sum over distinct primes p | n with p in B of log p.
function LB(n, lo, hi) {
  let s = 0;
  for (const p of factor(n).keys()) if (p > lo && p <= hi) s += Math.log(p);
  return s;
}
function g(n, lo, hi, t, logX) {           // returns [re, im]
  const m = mobius(n);
  if (m === 0) return [0, 0];
  const th = t * LB(n, lo, hi) / logX;
  return [m * Math.cos(th), m * Math.sin(th)];
}
const EPS = 1e-12;
const BANDS = [[3, 40], [10, 120], [40, 400], [1, 5000]];
const TS = [0, 0.7, -1.9, 13.25, 1000.5];
const LOGX = Math.log(1e7);

let coprimeCases = 0, boundCases = 0;
for (const [lo, hi] of BANDS) {
  for (const t of TS) {
    for (let a = 1; a <= 220; a++) {
      const ga = g(a, lo, hi, t, LOGX);
      assert(Math.hypot(ga[0], ga[1]) <= 1 + EPS, '1-boundedness');
      boundCases++;
      for (let b = 1; b <= 220; b++) {
        if (gcd(a, b) !== 1) continue;
        const gb = g(b, lo, hi, t, LOGX);
        const gab = g(a * b, lo, hi, t, LOGX);
        const pr = [ga[0] * gb[0] - ga[1] * gb[1], ga[0] * gb[1] + ga[1] * gb[0]];
        assert(Math.hypot(gab[0] - pr[0], gab[1] - pr[1]) < 1e-10,
          `multiplicativity at (${a},${b}) band (${lo},${hi}] t=${t}`);
        coprimeCases++;
      }
    }
  }
}

// (A') controls. Both must FIRE, else (A) is testing nothing sharp.
let notCompletelyMult = 0, muLnotMult = 0;
for (const [lo, hi] of BANDS) {
  for (const t of TS) {
    if (t === 0) continue;                 // at t=0, g = mu, and mu(p*p)=0
    for (let a = 2; a <= 60; a++) {
      const ga = g(a, lo, hi, t, LOGX);
      const gaa = g(a * a, lo, hi, t, LOGX);
      const sq = [ga[0] * ga[0] - ga[1] * ga[1], 2 * ga[0] * ga[1]];
      if (Math.hypot(gaa[0] - sq[0], gaa[1] - sq[1]) > 1e-10) notCompletelyMult++;
    }
    for (let a = 2; a <= 120; a++) for (let b = 2; b <= 120; b++) {
      if (gcd(a, b) !== 1) continue;
      const l = (n) => mobius(n) * LB(n, lo, hi);
      if (Math.abs(l(a * b) - l(a) * l(b)) > 1e-9) muLnotMult++;
    }
  }
}
assert(notCompletelyMult > 0, 'control: g must fail complete multiplicativity');
assert(muLnotMult > 0, 'control: mu*L_B must fail multiplicativity');

// --------------------------------------- (B) window-to-band geometry, exact ---
// eta = 1/50 so that every exponent has denominator 25 and all comparisons
// are exact BigInt powers. w = 6/25, w+2eta = 7/25, 19/25-2eta = 18/25.
function iroot(n, k) {                     // floor(n^{1/k}) for BigInt n >= 0
  if (n < 2n) return n;
  let hi = 1n; while (hi ** BigInt(k) <= n) hi <<= 1n;
  let lo = hi >> 1n;
  while (lo < hi) { const mid = (lo + hi + 1n) >> 1n; if (mid ** BigInt(k) <= n) lo = mid; else hi = mid - 1n; }
  return lo;
}

// For a fixed prime r the window membership r in A(n) is the integer interval
// max(N, D1*r) < n <= min(2N, D0*r), so the count of n in (N,2N] at which the
// window and the band disagree is computed exactly, with no loop over n.
function windowBandCheck(N, stripFactor) {
  const x = 2n * BigInt(N);
  const V = iroot(x ** 6n, 25);            // floor(x^{6/25})
  const D1 = iroot(x ** 18n, 25);          // floor(x^{18/25})
  const D0 = x / (V + 1n);                 // floor(x/(V+1))
  const x6 = x ** 6n, x7 = x ** 7n;
  const SC = 1000000n, SCP = SC ** 25n;
  const bandTopOk = (r) => BigInt(r) ** 25n <= x7;          // r <= x^{7/25}
  const bandLoOk = (r) => BigInt(r) ** 25n > x6;            // r >  x^{6/25}
  const inStrip = (r) => {                 // stripFactor * r > x^{7/25}
    const num = BigInt(Math.round(stripFactor * 1e6)) * BigInt(r);
    return num ** 25n > x7 * SCP;
  };
  const cutoff = 4 * Math.pow(2 * N, 7 / 25);
  const cand = PRIMES.filter((p) => p <= cutoff);
  assert(cand.length > 0, 'candidate primes must exist at this scale');
  const band = cand.filter((r) => bandLoOk(r) && bandTopOk(r));
  assert(band.length > 0, 'band must be non-empty at this scale');
  // lower edges of window and band coincide exactly: r > V  <=>  r^25 > x^6
  for (const r of cand) assert((BigInt(r) > V) === bandLoOk(r), 'lower edges must coincide');

  let sym = 0, inUpperStrip = 0, inLowerSliver = 0, contributing = 0, violations = 0;
  for (const r of cand) {
    const br = BigInt(r);
    const inB = bandLoOk(r) && bandTopOk(r);
    let cW = 0;                            // # of n in (N,2N] with r in the window
    if (br > V) {
      const lo = D1 * br > BigInt(N) ? D1 * br : BigInt(N);
      const hi = D0 * br < 2n * BigInt(N) ? D0 * br : 2n * BigInt(N);
      if (hi > lo) cW = Number(hi - lo);
    }
    const diff = inB ? N - cW : cW;        // # of n where window and band disagree
    if (diff === 0) continue;
    contributing++; sym += diff;
    if (inStrip(r)) inUpperStrip += diff;
    else if (br <= V + 2n) inLowerSliver += diff;
    else violations += diff;
  }
  return { V, D0, D1, band: band.length, sym, inUpperStrip, inLowerSliver, contributing, violations };
}

const SCALES = [5000000, 1200000];
let symTotal = 0, differTotal = 0;
for (const N of SCALES) {
  const r = windowBandCheck(N, 2);
  assert(r.sym > 0, 'symmetric difference must be non-empty (else the test is vacuous)');
  assert(r.violations === 0, `every symmetric-difference prime must lie in the strip or sliver at N=${N}`);
  symTotal += r.sym; differTotal += r.contributing;
  // (B') control: the factor 2 is sharp; 1.001 must fail.
  const tight = windowBandCheck(N, 1.001);
  assert(tight.violations > 0, `control: strip factor 1.001 must fail at N=${N}`);
}

// -------------------------------------------- (C) exponent arithmetic, exact ---
// rationals as [num, den] with den > 0
const R = (a, b) => [a, b];
const rAdd = ([a, b], [c, d]) => [a * d + c * b, b * d];
const rSub = ([a, b], [c, d]) => [a * d - c * b, b * d];
const rLt = ([a, b], [c, d]) => a * d < c * b;
const rEq = ([a, b], [c, d]) => a * d === c * b;

const w = R(6, 25), v = R(1, 20), etaMax = R(1, 400);
assert(rEq(rAdd(w, v), R(29, 100)), '6/25 + 1/20 = 29/100');
const pairExp = rAdd(R(29, 100), [4 * etaMax[0], etaMax[1]]);
assert(rEq(pairExp, R(3, 10)), 'pair-count exponent at eta=1/400 is 3/10');
assert(rLt(pairExp, R(1, 2)), 'pair count is below N >= sqrt(X)');
assert(rEq(rSub(R(1, 2), pairExp), R(1, 5)), 'the fixed power gained is X^{1/5}');
assert(rLt(R(1, 10), R(1, 5)), 'the note quotes the weaker X^{-1/10}, which is implied');

assert(rEq(rSub(R(1, 3), R(1, 24)), R(7, 24)), '1/3 - 1/24 = 7/24');
assert(rLt(R(1, 4), R(7, 24)), 'exp M >> (log X)^{7/24} beats L = (log X)^{1/4}');
assert(!rLt(R(1, 1), R(7, 24)), 'the same input does NOT reach L = log X');

const leftLo = R(6, 50);                  // (1/2) * 6/25, at N = sqrt(X)
const rightHi = rAdd(v, [2 * etaMax[0], etaMax[1]]);
assert(rLt(rightHi, leftLo), 'left and right bands stay disjoint down to N = sqrt(X)');

// mesh balance: delta^{-1} (log X)^{-c} = delta  <=>  delta = (log X)^{-c/2}
for (const c of [0.9, 0.5, 0.2, 0.05]) {
  const eDelta = -c / 2;                  // exponent of log X in delta
  assert(Math.abs((-eDelta - c) - eDelta) < 1e-12, 'mesh balance exponent');
  assert(-1 <= eDelta, '1/log X is dominated by delta for 0 < c < 1');
}

// -------------------------------------------------------------------- report ---
console.log('Finite checks for the transfer review: PASS');
console.log(`Coprime multiplicativity cases: ${coprimeCases}; 1-boundedness cases: ${boundCases}`);
console.log(`Controls fired: not-completely-multiplicative ${notCompletelyMult}; mu*L_B not multiplicative ${muLnotMult}`);
console.log(`Window/band disagreement incidences: ${symTotal} from ${differTotal} primes; all in the upper strip or the lower sliver`);
console.log(`Exact rational exponent assertions passed; total assertions: ${checks}`);
console.log('No asymptotic claim, imported theorem, Fourier integral or twin margin is tested here.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/next-transfer-review-validation.js
//   invocation:  node research/next-transfer-review-validation.js
//   code-sha256: f593a86e08fb5178b8ce386599a6afd2922dcd48013f0c1de14ba3415a4b7624
//   out-sha256:  d8cff1bf02107087f5faba21ee3be97512d904956ade8960c6715841caa7c0b2
//   body-lines:  6
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.5 s
// ============================================================================
// Finite checks for the transfer review: PASS
// Coprime multiplicativity cases: 589020; 1-boundedness cases: 4400
// Controls fired: not-completely-multiplicative 576; mu*L_B not multiplicative 57728
// Window/band disagreement incidences: 29607367 from 16 primes; all in the upper strip or the lower sliver
// Exact rational exponent assertions passed; total assertions: 593703
// No asymptotic claim, imported theorem, Fourier integral or twin margin is tested here.
// ============================================================================
// READINGS
// The multiplicative lift is confirmed on 589020 coprime pairs across four
// bands and five values of t, and both controls fire (576 and 57728 cases):
// g is not completely multiplicative and mu*L_B is not multiplicative, so
// the note's careful wording is the checkable one.
// The 29607367 window/band disagreements, from 16 primes at two scales,
// fall entirely in the upper strip of multiplicative width two or in the
// two integers above V. The tightened-strip control fails as required, so
// the width claimed in the note is sharp rather than generous.
// The exponent arithmetic behind the CRT error budget is exact and is part
// of the 593703 assertions; it includes the pair-count exponent staying a
// fixed power below one half and the imported non-pretentious exponent
// exceeding the chosen parameter but not reaching a full power of log.
// This validates finite algebra only. The Fourier integral, the pretentious
// distance comparison, both imported theorems and every asymptotic claim
// are outside its scope.
