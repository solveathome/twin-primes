// SHIFTED PRIME — exact second Vaughan, parity and determinant-2 checks.
// Companion: research/shifted-prime-decomposition.md. Finite algebra only;
// neither the Mobius BV theorem nor the open residual bound is tested.
'use strict';
const assert = require('node:assert/strict');

const levels = [256, 1024, 4096, 16384];
const cap = Math.max(...levels);
const spf = new Uint32Array(cap + 1), mu = new Int8Array(cap + 1);
mu[1] = 1;
for (let p = 2; p <= cap; p++) {
  if (spf[p]) continue;
  for (let n = p; n <= cap; n += p) if (!spf[n]) spf[n] = p;
}
for (let n = 2; n <= cap; n++) {
  const p = spf[n], m = n / p;
  mu[n] = m % p === 0 ? 0 : -mu[m];
}
const factors = Array.from({length: cap + 1}, () => new Map());
const ds = Array.from({length: cap + 1}, () => []);
for (let n = 1; n <= cap; n++) {
  let m = n;
  while (m > 1) { const p = spf[m]; factors[n].set(p, (factors[n].get(p) || 0n) + 1n); m /= p; }
  for (let multiple = n; multiple <= cap; multiple += n) ds[multiple].push(n);
}
const lambda = n => factors[n].size === 1
  ? new Map([[factors[n].keys().next().value, 1n]]) : new Map();
function beta(n, cutoff) {
  const out = new Map();
  for (const [p, exponent] of factors[n]) {
    let power = 1, count = 0n;
    for (let i = 0n; i < exponent; i++) { power *= p; if (power > cutoff) count++; }
    if (count) out.set(p, count);
  }
  return out;
}
function plus(out, source, scale = 1n) {
  scale = BigInt(scale);
  for (const [key, value] of source) {
    const next = (out.get(key) || 0n) + scale * value;
    if (next) out.set(key, next); else out.delete(key);
  }
}
// The first log prime belongs to the outer factor and the second to the
// shifted factor. Keeping ordered pairs makes the check stronger than
// comparing numerical products of logarithms.
function tensor(out, left, right, scale = 1n) {
  scale = BigInt(scale);
  for (const [p, a] of left) for (const [q, b] of right) {
    const key = `${p},${q}`, next = (out.get(key) || 0n) + scale * a * b;
    if (next) out.set(key, next); else out.delete(key);
  }
}
function equal(a, b, label) {
  const sorted = m => [...m].sort((x, y) => String(x[0]).localeCompare(String(y[0])));
  assert.deepEqual(sorted(a), sorted(b), label);
}
function powerFloor(x, numerator, denominator) {
  let n = Math.floor(x ** (numerator / denominator));
  const target = BigInt(x) ** BigInt(numerator);
  while (BigInt(n + 1) ** BigInt(denominator) <= target) n++;
  while (BigInt(n) ** BigInt(denominator) > target) n--;
  return n;
}
function gcd(a, b) { while (b) [a, b] = [b, a % b]; return a; }
function inverse(a, q) {
  if (q === 1) return 0;
  let r = a, s = q, u = 1, v = 0;
  while (s) { const t = Math.floor(r / s); [r, s] = [s, r - t * s]; [u, v] = [v, u - t * v]; }
  assert.equal(r, 1);
  return ((u % q) + q) % q;
}

// The parity reduction is a separate evaluator, with no direct congruence
// test in its output branches. Zero-valued squareful terms are retained.
function reduce(k, ell) {
  const g = gcd(k, ell);
  if (2 % g) return {kind: 'none'};
  if (g === 2) {
    const q = ell / 2;
    return {kind: 'g2', q, a: inverse(k / 2, q), scale: 1, sign: 1};
  }
  if (ell % 2) return {kind: 'odd', q: ell, a: 2 * inverse(k, ell) % ell, scale: 1, sign: 1};
  const f = ell / 2, q = f % 2 === 0 ? f : ell;
  let a = inverse(k, f);
  if (f % 2 && a % 2 === 0) a += f;
  return {kind: f % 2 ? 'odd_lift' : 'even_f', q, a, scale: 2, sign: -1};
}
function reducedValue(d, rule) {
  if (rule.kind === 'none' || d % rule.scale) return 0;
  const m = d / rule.scale;
  return m % rule.q === rule.a && mu[m] ? rule.sign * mu[m] : 0;
}
let parityChecks = 0, intervalChecks = 0;
const branches = new Set();
for (let k = 1; k <= 64; k++) {
  for (let ell = 1; ell <= 96; ell++) {
    const rule = reduce(k, ell);
    branches.add(rule.kind);
    if (rule.kind !== 'none') { assert.equal(gcd(rule.a, rule.q), 1); assert(rule.q <= ell); }
    const direct = [0], reduced = [0];
    for (let d = 1; d <= 192; d++) {
      const lhs = (k * d - 2) % ell === 0 ? mu[d] : 0;
      const rhs = reducedValue(d, rule);
      assert.equal(rhs, lhs, `parity k=${k} ell=${ell} d=${d}`);
      direct.push(direct[d - 1] + lhs); reduced.push(reduced[d - 1] + rhs);
      parityChecks++;
    }
    for (const [lo, hi] of [[0, 192], [37, 143], [96, 191], [191, 192]]) {
      assert.equal(direct[hi] - direct[lo], reduced[hi] - reduced[lo]);
      intervalChecks++;
    }
  }
}
assert.equal(branches.size, 5);
console.log(`parity: ${parityChecks} exact pointwise reductions and ${intervalChecks} clipped intervals; all ${branches.size} gcd/parity branches exercised`);

let vectorChecks = 0, tensorChecks = 0, directTuples = 0, fiberTuples = 0;
let onePointFibers = 0, evenTuples = 0, squarefulTuples = 0;
for (const x of levels) {
  const U = powerFloor(x, 6, 25), V = U;
  const prescribed = powerFloor(x, 1, 20);
  // Prescribed cutoffs are small at these finite scales. Additional,
  // deliberately asymmetric cutoffs exercise both convolution branches;
  // they test algebra, not the asymptotic modulus budget.
  const cuts = [[prescribed, prescribed], [2, 3], [5, 7]];
  for (const [Y, Z] of cuts) {
    assert(x / 2 - 2 > Z);
    const outerBeta = Array.from({length: x + 1}, (_, n) => n ? beta(n, V) : new Map());
    const innerBeta = Array.from({length: x + 1}, (_, n) => n ? beta(n, Z) : new Map());
    const c = Array.from({length: Y * Z + 1}, () => new Map());
    for (let a = 1; a <= Y; a++) for (let b = 1; b <= Z; b++) plus(c[a * b], lambda(b), mu[a]);
    // Check the complete identity, including its small initial term.
    for (let t = 1; t <= x - 2; t++) {
      const rhs = new Map();
      if (t <= Z) plus(rhs, lambda(t));
      for (const e of ds[t]) {
        if (e <= Y) plus(rhs, factors[t / e], mu[e]);
        if (e <= Y * Z) plus(rhs, c[e], -1);
        if (e > Y && t / e > Z) plus(rhs, innerBeta[t / e], mu[e]);
      }
      equal(rhs, lambda(t), `second Vaughan x=${x} Y=${Y} Z=${Z} t=${t}`);
      vectorChecks++;
    }
    const allDirect = new Map(), allParts = new Map(), residual = new Map();
    for (let n = x / 2 + 1; n <= x; n++) {
      const t = n - 2, direct = new Map(), parts = new Map();
      for (const d of ds[n]) {
        const k = n / d;
        if (d <= U || k <= V) continue;
        tensor(direct, outerBeta[k], lambda(t), mu[d]);
        for (const e of ds[t]) {
          if (e <= Y) tensor(parts, outerBeta[k], factors[t / e], mu[d] * mu[e]);
          if (e <= Y * Z) tensor(parts, outerBeta[k], c[e], -mu[d]);
          if (e > Y && t / e > Z) tensor(parts, outerBeta[k], innerBeta[t / e], mu[d] * mu[e]);
        }
      }
      equal(parts, direct, `weighted identity at partner n=${n}`);
      plus(allDirect, direct); plus(allParts, parts); tensorChecks++;
    }
    equal(allParts, allDirect, 'interval contraction');

    // Independently enumerate by (d,k), then a divisor of dk-2; do not
    // contract the already-computed coefficient vectors of (7).
    const tupleSet = x <= 1024 ? new Set() : null;
    for (let d = U + 1; d <= Math.floor(x / (V + 1)); d++) {
      const low = Math.max(V, Math.floor(x / (2 * d)));
      for (let k = low + 1; k <= Math.floor(x / d); k++) {
        const t = d * k - 2;
        for (const e of ds[t]) {
          const v = t / e;
          if (e <= Y || v <= Z) continue;
          assert.equal(d * k - e * v, 2);
          tensor(residual, outerBeta[k], innerBeta[v], mu[d] * mu[e]);
          directTuples++;
          if ((d * k) % 2 === 0) evenTuples++;
          if (!mu[d] || !mu[e]) squarefulTuples++;
          if (tupleSet) tupleSet.add(`${d},${k},${e},${v}`);
        }
      }
    }
    const residueFromPointwise = new Map();
    for (let n = x / 2 + 1; n <= x; n++) {
      const left = new Map(), right = new Map();
      for (const d of ds[n]) if (d > U && n / d > V) plus(left, outerBeta[n / d], mu[d]);
      for (const e of ds[n - 2]) if (e > Y && (n - 2) / e > Z) plus(right, innerBeta[(n - 2) / e], mu[e]);
      tensor(residueFromPointwise, left, right);
    }
    equal(residual, residueFromPointwise, 'independent four-variable enumeration');

    if (tupleSet) {
      const fibers = new Map();
      for (let k = V + 1; k <= Math.floor(x / (U + 1)); k++) {
        for (let v = Z + 1; v <= Math.floor((x - 2) / (Y + 1)); v++) {
          const g = gcd(k, v);
          if (2 % g) continue;
          const k1 = k / g, v1 = v / g;
          const d0 = (2 / g) * inverse(k1, v1) % v1;
          const e0 = (k * d0 - 2) / v;
          assert(Number.isInteger(e0));
          assert.equal(v1 * e0 - k1 * d0, -2 / g);
          // Strict lower endpoints and the closed upper product endpoint.
          const lo = Math.max(Math.floor((U - d0) / v1), Math.floor((Y - e0) / k1), Math.floor((x / (2 * k) - d0) / v1));
          const hi = Math.floor((x / k - d0) / v1);
          const count = Math.max(0, hi - lo);
          assert(count <= Math.floor(x * g / (2 * k * v)) + 1);
          if (k * v > x) { assert(count <= 1); if (count) onePointFibers++; }
          for (let j = lo + 1; j <= hi; j++) {
            const d = d0 + v1 * j, e = e0 + k1 * j;
            assert(tupleSet.delete(`${d},${k},${e},${v}`), 'unique fiber term in direct enumeration');
            tensor(fibers, outerBeta[k], innerBeta[v], mu[d] * mu[e]);
            fiberTuples++;
          }
        }
      }
      assert.equal(tupleSet.size, 0, 'every direct term occurs in a fiber');
      equal(fibers, residual, 'weighted fiber contraction');
    }
  }
  console.log(`x=${x} U=V=${U}: exact second identity and ordered log-product contractions at prescribed Y=Z=${prescribed} and cuts (2,3),(5,7)`);
}
assert(evenTuples > 0 && squarefulTuples > 0 && onePointFibers > 0);
// Rational exponent comparisons, independent of floating-point powers.
assert(1n * 25n < 3n * 10n); // 1/10 < 3/25.
assert.equal(3n * 10n - 25n, 5n); // difference 5/250 = 1/50.
assert(1n * 24n * 25n < 10n * 11n * 6n); // 1/10 < (1/2-1/24)*(6/25).
console.log(`exact totals: ${vectorChecks} log-vector identities; ${tensorChecks} partner tensor identities; ${directTuples} determinant tuples (including ${evenTuples} even and ${squarefulTuples} zero-Mobius tuples)`);
console.log(`independent fibers through x=1024: ${fiberTuples} tuples, including ${onePointFibers} occupied fibers with kv>x; exact exponent margin 1/50`);
console.log('No asymptotic residual or scale-average estimate tested.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/shifted-prime-validation.js
//   invocation:  node research/shifted-prime-validation.js
//   code-sha256: c4bb86292c599d841259d1b263905fce745e9c95df670d5cddd8fe10884727a5
//   out-sha256:  f3fa5d365c7796b1bd5ab644e55293fa29a98647b2f0e0b02f045444ca259b2a
//   body-lines:  8
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-05
//   elapsed:     0.8 s
// ============================================================================
// parity: 1179648 exact pointwise reductions and 24576 clipped intervals; all 5 gcd/parity branches exercised
// x=256 U=V=3: exact second identity and ordered log-product contractions at prescribed Y=Z=1 and cuts (2,3),(5,7)
// x=1024 U=V=5: exact second identity and ordered log-product contractions at prescribed Y=Z=1 and cuts (2,3),(5,7)
// x=4096 U=V=7: exact second identity and ordered log-product contractions at prescribed Y=Z=1 and cuts (2,3),(5,7)
// x=16384 U=V=10: exact second identity and ordered log-product contractions at prescribed Y=Z=1 and cuts (2,3),(5,7)
// exact totals: 65256 log-vector identities; 32640 partner tensor identities; 917083 determinant tuples (including 820784 even and 548326 zero-Mobius tuples)
// independent fibers through x=1024: 23506 tuples, including 10754 occupied fibers with kv>x; exact exponent margin 1/50
// No asymptotic residual or scale-average estimate tested.
// ============================================================================
// READINGS
// Exact integer algebra checks endpoints, coefficient signs, parity cases,
// and all terms of the two enumerations, including zero-weight terms.
// These finite checks do not prove the imported distribution theorem or
// the open one-sided improvement for the coupled Mobius correlation.
