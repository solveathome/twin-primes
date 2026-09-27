// REVIEW 2026-09-05: independent checks of the fold kernel and review identities.
// Finite validation only; no asymptotic inference or new prime theorem.
// Companion: research/history/staging/review-0905.md
'use strict';
const assert = require('node:assert/strict');
const K = require('../web/bench/kernel.js');
const primes = [2, 3, 5, 7, 11, 13, 17, 19];
let W = 1;
for (let i = 0; i < primes.length; i++) {
  W *= primes[i];
  // Direct Eratosthenes marking, independent of the kernel's copy recursion.
  const hit = new Uint8Array(W);
  for (const p of primes.slice(0, i + 1)) {
    for (let n = 0; n < W; n += p) hit[n] = 1;
  }
  const expected = [];
  for (let n = 0; n < W; n++) {
    if (!hit[n] && !hit[(n + 2) % W]) expected.push(n);
  }
  const actual = Array.from(K.buildSlots(i, 2).slots);
  assert.deepEqual(actual, expected);
  let gap = 0;
  for (let j = 0; j < expected.length; j++) {
    gap = Math.max(gap, (j + 1 < expected.length ? expected[j + 1] : expected[0] + W) - expected[j]);
  }
  console.log(`kernel/direct agreement: p=${primes[i]} W=${W} slots=${expected.length} G2=${gap}`);
}

// Enumerate EVERY choice of translated kill pairs at 7# and reconstruct its
// unique phase. This checks the CRT-covering identity, not statistical freedom.
const ps = [2, 3, 5, 7], period = 210;
const phases = new Set();
let longest = -1, witness = null, comparisons = 0;
function visit(a) {
  if (a.length < ps.length) {
    for (let r = 0; r < ps[a.length]; r++) visit([...a, r]);
    return;
  }
  let s = 0, modulus = 1;
  for (let i = 0; i < ps.length; i++) {
    while ((s + a[i]) % ps[i] !== 0) s += modulus;
    modulus *= ps[i];
  }
  phases.add(s);
  let first = null;
  for (let j = 1; j <= period; j++) {
    const covered = ps.some((p, i) => (j - a[i]) % p === 0 || (j - a[i] + 2) % p === 0);
    const killedAtPhase = ps.some(p => (s + j) % p === 0 || (s + j + 2) % p === 0);
    assert.equal(covered, killedAtPhase);
    comparisons++;
    if (!covered && first === null) first = j;
  }
  assert.notEqual(first, null);
  if (first - 1 > longest) { longest = first - 1; witness = { a, s }; }
}
visit([]);
assert.equal(phases.size, period);
assert.equal(longest, 29);
console.log(`CRT covering: ${phases.size} phase vectors, ${comparisons} exact comparisons, max covered run=${longest}`);
console.log(`cover witness: ${JSON.stringify(witness)}`);

// Exact four-sign identity in a range where every surviving member has
// at most two prime factors. This checks bookkeeping, not a decorrelation claim.
const cap = 200002;
const spf = new Uint32Array(cap + 1);
for (let p = 2; p <= cap; p++) {
  if (spf[p]) continue;
  for (let n = p; n <= cap; n += p) if (!spf[n]) spf[n] = p;
}
const omega = new Uint8Array(cap + 1);
for (let n = 2; n <= cap; n++) omega[n] = omega[n / spf[n]] + 1;
for (const X of [100, 1000, 10000, 100000]) {
  let y = Math.floor(Math.cbrt(2 * X + 2));
  while (y ** 3 < 2 * X + 2) y++;
  let S = 0, A = 0, B = 0, C = 0, twins = 0;
  for (let n = X + 1; n <= 2 * X; n++) {
    if (spf[n] === n && spf[n + 2] === n + 2) twins++;
    if (spf[n] <= y || spf[n + 2] <= y) continue;
    assert(omega[n] <= 2 && omega[n + 2] <= 2);
    const a = omega[n] % 2 ? -1 : 1;
    const b = omega[n + 2] % 2 ? -1 : 1;
    S++; A += a; B += b; C += a * b;
  }
  assert.equal(S - A - B + C, 4 * twins);
  // Cov=C/S-(A/S)(B/S), so the PP numerator is equally
  // S*((1-A/S)*(1-B/S)+Cov). Keep the check in exact integer form.
  assert.equal((S - A) * (S - B) + S * C - A * B, 4 * S * twins);
  console.log(`four-sign identity: X=${X} y=${y} S=${S} A=${A} B=${B} C=${C} twins=${twins}`);
}
console.log('All finite review checks passed. No asymptotic claim is tested.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/review-0905-validation.js
//   invocation:  node research/review-0905-validation.js
//   code-sha256: 0408d8f1e4e8d7ba41ee6140b4bacdc949c283f79b4960958126a6997e9aeac7
//   out-sha256:  8f586869acbb44102ccc8aef5dbd3dea682f935acd614f69399e5e92c297f0f4
//   body-lines:  15
//   inputs:      web/bench/kernel.js@ac01fc8d4ca8
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-05
//   elapsed:     0.1 s
// ============================================================================
// kernel/direct agreement: p=2 W=2 slots=1 G2=2
// kernel/direct agreement: p=3 W=6 slots=1 G2=6
// kernel/direct agreement: p=5 W=30 slots=3 G2=12
// kernel/direct agreement: p=7 W=210 slots=15 G2=30
// kernel/direct agreement: p=11 W=2310 slots=135 G2=42
// kernel/direct agreement: p=13 W=30030 slots=1485 G2=66
// kernel/direct agreement: p=17 W=510510 slots=22275 G2=108
// kernel/direct agreement: p=19 W=9699690 slots=378675 G2=150
// CRT covering: 210 phase vectors, 44100 exact comparisons, max covered run=29
// cover witness: {"a":[1,1,3,5],"s":107}
// four-sign identity: X=100 y=6 S=11 A=-7 B=-5 C=5 twins=7
// four-sign identity: X=1000 y=13 S=52 A=-22 B=-22 C=8 twins=26
// four-sign identity: X=10000 y=28 S=358 A=-104 B=-84 C=2 twins=137
// four-sign identity: X=100000 y=59 S=2408 A=-590 B=-586 C=160 twins=936
// All finite review checks passed. No asymptotic claim is tested.
// ============================================================================
// READINGS
//
