// MOBIUS BV — finite checks on the identity and support claims used in
// research/mobius-bv-derivation.md. Exact integer arithmetic only. Nothing
// here tests a distribution theorem: the Bombieri-Vinogradov estimate itself
// is asymptotic and is imported, not measured.
'use strict';
const assert = require('node:assert/strict');

const X = 100000;
const mu = new Int8Array(X + 1);
const spf = new Uint32Array(X + 1);
mu[1] = 1;
for (let p = 2; p <= X; p++) {
  if (spf[p]) continue;
  for (let n = p; n <= X; n += p) if (!spf[n]) spf[n] = p;
}
for (let n = 2; n <= X; n++) {
  const p = spf[n], m = n / p;
  mu[n] = m % p === 0 ? 0 : -mu[m];
}
const tau = new Int32Array(X + 1);
for (let d = 1; d <= X; d++) for (let n = d; n <= X; n += d) tau[n]++;

const coprime = (n, r) => {
  let a = n, b = r;
  while (b) { const t = a % b; a = b; b = t; }
  return a === 1;
};
// mu restricted to a range, then optionally to integers coprime to r. The
// coprimality indicator is multiplicative, so restricting each factor of a
// convolution is the same as restricting the convolution (checked below).
function muRange(low, high, r) {
  const f = new Int32Array(X + 1);
  for (let n = Math.max(1, low); n <= Math.min(X, high); n++) {
    if (mu[n] && coprime(n, r)) f[n] = mu[n];
  }
  return f;
}
function oneRange(r) {
  const f = new Int32Array(X + 1);
  for (let n = 1; n <= X; n++) if (coprime(n, r)) f[n] = 1;
  return f;
}
function convolve(f, g, limit) {
  const out = new Int32Array(limit + 1);
  for (let a = 1; a <= limit; a++) {
    if (!f[a]) continue;
    for (let b = 1; a * b <= limit; b++) if (g[b]) out[a * b] += f[a] * g[b];
  }
  return out;
}

let identityChecks = 0, dyadicChecks = 0, supportChecks = 0, sizeChecks = 0;
let typeTwoZeros = 0;
for (const [U, V, r] of [[1, 1, 1], [7, 7, 1], [10, 31, 1], [100, 100, 1],
                         [316, 316, 1], [50, 200, 1], [30, 30, 6], [64, 64, 105]]) {
  const one = oneRange(r);
  const muLowU = muRange(1, U, r), muLowV = muRange(1, V, r);
  const muHighU = muRange(U + 1, X, r), muHighV = muRange(V + 1, X, r);
  const f = convolve(muLowU, muLowV, X);            // supported on [1, UV]
  const typeOne = convolve(f, one, X);
  const g = convolve(muHighV, one, X);              // supported on (V, X]
  const typeTwo = convolve(muHighU, g, X);
  // (a) Vaughan's identity for the Mobius function, pointwise and exact.
  for (let n = 1; n <= X; n++) {
    const restricted = coprime(n, r) ? mu[n] : 0;
    assert.equal(typeTwo[n] - typeOne[n] + muLowU[n] + muLowV[n], restricted,
      `mu identity at n=${n} (U=${U},V=${V},r=${r})`);
    identityChecks++;
  }
  // (b) Support and size claims the Type I and Type II bounds rest on.
  for (let n = 1; n <= X; n++) {
    if (n > U * V) assert.equal(f[n], 0, `f supported past UV at n=${n}`);
    if (n <= V) assert.equal(g[n], 0, `g supported at or below V at n=${n}`);
    if (n <= U * V) {
      assert.equal(typeTwo[n], 0, `type II nonzero at n=${n} <= UV`);
      typeTwoZeros++;
    }
    assert(Math.abs(f[n]) <= tau[n], `|f| exceeds tau at n=${n}`);
    assert(Math.abs(g[n]) <= tau[n], `|g| exceeds tau at n=${n}`);
    supportChecks++; sizeChecks += 2;
  }
  // (c) The dyadic decomposition actually applied to Theorem 26.6: for n <= X,
  //     typeTwo = sum over 2^j in (U, 2X/V] of alpha_j * beta_j, with
  //     alpha_j = mu_{>U} on (2^(j-1), 2^j] and beta_j = g on [1, X/2^(j-1)].
  const dyadic = new Int32Array(X + 1);
  for (let j = 0; (1 << j) <= 2 * X / V; j++) {
    const top = 1 << j, bottom = top >> 1;
    if (top <= U) continue;
    const alpha = new Int32Array(X + 1), beta = new Int32Array(X + 1);
    for (let k = bottom + 1; k <= Math.min(top, X); k++) alpha[k] = muHighU[k];
    for (let l = 1; l <= Math.min(X, Math.floor(X / Math.max(1, bottom))); l++) beta[l] = g[l];
    const piece = convolve(alpha, beta, X);
    for (let n = 1; n <= X; n++) dyadic[n] += piece[n];
  }
  for (let n = 1; n <= X; n++) {
    assert.equal(dyadic[n], typeTwo[n], `dyadic split at n=${n} (U=${U},V=${V},r=${r})`);
    dyadicChecks++;
  }
  console.log(`U=${U} V=${V} r=${r}: identity, supports and dyadic split exact on n<=${X}`);
}
assert(typeTwoZeros > 0);
console.log(`exact totals: ${identityChecks} pointwise identity checks, ${supportChecks} support checks, ${sizeChecks} size checks, ${dyadicChecks} dyadic checks`);
console.log('No distribution estimate, level of distribution or error rate is tested here.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/mobius-bv-validation.js
//   invocation:  node research/mobius-bv-validation.js
//   code-sha256: c1fbbe3293632097f450ba312ac567dac3b739cb349c293eaa32c3fcc2ddeef5
//   out-sha256:  4b16bf01029d867be62daa605bd853d9a9b4571e64463d686e3395e41d104526
//   body-lines:  10
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.3 s
// ============================================================================
// U=1 V=1 r=1: identity, supports and dyadic split exact on n<=100000
// U=7 V=7 r=1: identity, supports and dyadic split exact on n<=100000
// U=10 V=31 r=1: identity, supports and dyadic split exact on n<=100000
// U=100 V=100 r=1: identity, supports and dyadic split exact on n<=100000
// U=316 V=316 r=1: identity, supports and dyadic split exact on n<=100000
// U=50 V=200 r=1: identity, supports and dyadic split exact on n<=100000
// U=30 V=30 r=6: identity, supports and dyadic split exact on n<=100000
// U=64 V=64 r=105: identity, supports and dyadic split exact on n<=100000
// exact totals: 800000 pointwise identity checks, 800000 support checks, 1600000 size checks, 800000 dyadic checks
// No distribution estimate, level of distribution or error rate is tested here.
// ============================================================================
// READINGS
// Vaughan's identity for the Mobius function holds pointwise at every n<=10^5
// for all eight parameter sets, including the three with a coprimality
// restriction, so the restricted identity used in the character reduction is
// exact and not merely valid for large n.
// The support claims the Type I and Type II bounds use are exact here: the
// short convolution vanishes past UV, the long factor vanishes at or below V,
// the Type II term vanishes at or below UV, and both are dominated by tau.
// The dyadic split fed to the large sieve reproduces the Type II term exactly
// on this range, so no term is lost or double counted at the split.
// None of this is evidence for the asymptotic estimate: the level of
// distribution, the error rate and the uniformity in q are untested here.
