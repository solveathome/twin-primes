#!/usr/bin/env node
'use strict';
// Exact finite controls for moving-cutoff-parity.md.
// Rational polynomials in formal prime logarithms, not floating estimates.
const assert = require('node:assert/strict');
const N = 1000;
const spf = Array(N + 1).fill(0);
for (let p = 2; p <= N; p++) if (!spf[p]) {
  for (let n = p; n <= N; n += p) if (!spf[n]) spf[n] = p;
}
function factor(n) {
  const out = [];
  while (n > 1) {
    const p = spf[n]; let k = 0;
    do { n /= p; k++; } while (n > 1 && spf[n] === p);
    out.push([p, k]);
  }
  return out;
}
const fs = Array.from({length: N + 1}, (_, n) => n ? factor(n) : []);
const ds = Array.from({length: N + 1}, () => []);
for (let d = 1; d <= N; d++) for (let n = d; n <= N; n += d) ds[n].push(d);
const mu = n => fs[n].some(([, k]) => k > 1) ? 0 : (-1) ** fs[n].length;
const phi = n => fs[n].reduce((v, [p]) => v / p * (p - 1), n);
const gcd = (a, b) => b ? gcd(b, a % b) : (a < 0n ? -a : a);
function rat(n, d = 1n) {
  n = BigInt(n); d = BigInt(d); assert(d !== 0n);
  if (d < 0n) { n = -n; d = -d; }
  const g = gcd(n, d); return [n / g, d / g];
}
const plus = (a, b) => rat(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const times = (a, b) => rat(a[0] * b[0], a[1] * b[1]);
const less = (a, b) => a[0] * b[1] < b[0] * a[1];
function add(a, b, num = 1, den = 1) {
  const out = new Map(a), scale = rat(num, den);
  for (const [key, value] of b) {
    const v = plus(out.get(key) || rat(0), times(value, scale));
    if (v[0]) out.set(key, v); else out.delete(key);
  }
  return out;
}
const log = n => new Map(fs[n].map(([p, k]) => [String(p), rat(k)]));
const lambda = (n, primeOnly = false) => fs[n].length === 1 &&
  (!primeOnly || fs[n][0][1] === 1) ? new Map([[String(fs[n][0][0]), rat(1)]]) : new Map();
function product(a, b) {
  let out = new Map();
  for (const [p, c] of a) for (const [q, d] of b) {
    const key = [p, q].sort((u, v) => Number(u) - Number(v)).join('*');
    out = add(out, new Map([[key, times(c, d)]]));
  }
  return out;
}
const canon = a => [...a].sort(([p], [q]) => p.localeCompare(q));
const same = (a, b) => assert.deepEqual(canon(a), canon(b));
const different = (a, b) => JSON.stringify(canon(a), (_, v) =>
  typeof v === 'bigint' ? String(v) : v) !== JSON.stringify(canon(b), (_, v) =>
  typeof v === 'bigint' ? String(v) : v);

// Published p <= 20, h = 2, y = 3 witness, under both Lambda conventions.
for (const primeOnly of [true, false]) {
  let original = new Map(), retained = new Map(), dropped = new Map();
  for (let p = 2; p <= 20; p++) {
    const n = p + 2, a = lambda(p, primeOnly);
    for (const d of ds[n]) if (d > 3) {
      original = add(original, product(a, log(d)), -(mu(n) ** 2) * mu(d));
    }
    for (const e of ds[n]) {
      const term = product(a, add(log(e), log(n), -1));
      if (3 * e < n) retained = add(retained, term, mu(n) * mu(e));
      if (3 * e < 22) dropped = add(dropped, term, mu(n) * mu(e));
    }
  }
  same(original, retained); assert(different(retained, dropped));
  let expected = product(log(3), add(log(13), log(19)));
  if (!primeOnly) {
    expected = add(expected, product(log(2), log(3)));
    expected = add(expected, product(log(2), log(2)), 2);
  }
  same(add(dropped, retained, -1), expected);
}
console.log('VERIFIED: the printed cutoff swap fails in both Lambda conventions; exact positive difference identified.');

// Same endpoint issue in the author preprint before (6.23).
// At x=40, Q=3 the added term is exactly 2*log(3)*log(5).
let source2019 = new Map(), swap2019 = new Map(), dropped2019 = new Map();
for (let n = 1; n <= 40; n++) {
  let partnerShort = new Map();
  for (const u of ds[n + 2]) if (u * u <= 40) {
    partnerShort = add(partnerShort, log(u), -mu(u));
  }
  for (const d of ds[n]) if (d > 3) {
    source2019 = add(source2019, product(log(d), partnerShort),
      -(mu(n) ** 2) * mu(n + 2) ** 2 * mu(d));
  }
  for (const e of ds[n]) {
    const term = product(add(log(e), log(n), -1), partnerShort);
    const coefficient = mu(n) * mu(n + 2) ** 2 * mu(e);
    if (3 * e < n) swap2019 = add(swap2019, term, coefficient);
    if (3 * e < 40) dropped2019 = add(dropped2019, term, coefficient);
  }
}
same(source2019, swap2019);
same(add(dropped2019, swap2019, -1), add(new Map(), product(log(3), log(5)), 2));
console.log('VERIFIED: the 2018 author-preprint swap has the same endpoint defect; exact control is 2*log(3)*log(5).');

let checks = 0, evenWitness = false, powerWitness = false;
let boundaryWitness = false, projectionWitness = false, densityWitness = false;
for (const x of [32, 48, 64, 96, 128, 192, 256]) {
  for (const y of new Set([2, 3, 5, 7, 11, Math.ceil(x ** (12 / 25))])) {
    let S = new Map(), short = new Map(), tail = new Map(), powers = new Map();
    let odd = new Map(), even = new Map(), K = new Map();
    const Q = Math.floor(x / y);
    for (let n = x / 2 + 1; n <= x; n++) {
      const a = lambda(n - 2), f = add(new Map(), a, mu(n));
      S = add(S, product(a, lambda(n)));
      powers = add(powers, product(a, lambda(n)), 1 - mu(n) ** 2);
      for (const d of ds[n]) {
        const term = product(a, log(d));
        if (d <= y) short = add(short, term, -(mu(n) ** 2) * mu(d));
        else tail = add(tail, term, -(mu(n) ** 2) * mu(d));
      }
      for (const e of ds[n]) if (e * y < n) {
        const term = product(f, add(log(e), log(n), -1));
        if (e % 2) odd = add(odd, term, mu(e));
        else even = add(even, term, mu(e));
      }
      for (let e = 1; e <= Q; e += 2) if (e * y < n) {
        K = add(K, product(f, add(log(e), log(n), -1)), mu(e), phi(e));
      }
    }
    // Independent e-first progression-minus-density calculation.
    let D = new Map(), badBoundary = new Map(), badDensity = new Map();
    for (let e = 1; e <= Q; e += 2) for (let n = x / 2 + 1; n <= x; n++) {
      const term = product(lambda(n - 2), add(log(e), log(n), -1));
      const coefficient = mu(e) * mu(n) * ((n % e === 0 ? phi(e) : 0) - 1);
      badBoundary = add(badBoundary, term, coefficient, phi(e));
      if (e * y < n) {
        D = add(D, term, coefficient, phi(e));
        badDensity = add(badDensity, term,
          mu(e) * mu(n) * ((n % e === 0 ? e : 0) - 1), e);
      }
    }
    same(S, add(add(short, tail), powers));
    same(tail, add(odd, even));
    same(odd, add(K, D));
    same(S, add(add(add(add(short, K), D), even), powers));
    evenWitness ||= even.size > 0; powerWitness ||= powers.size > 0;
    boundaryWitness ||= different(D, badBoundary);
    projectionWitness ||= different(odd, D);
    densityWitness ||= different(D, badDensity);
    checks++;
  }
}
assert(evenWitness && powerWitness && boundaryWitness && projectionWitness && densityWitness);
console.log('VERIFIED: ' + checks + ' exact dyadic reconstructions with independently ordered discrepancy sums.');
console.log('VERIFIED: deleting the moving boundary, density projection, even terms or prime powers changes a control.');

// Infinite Euler products enclosed by rational finite products and telescoping tails.
let c = rat(1), a = rat(1);
for (let p = 3; p <= N; p++) if (spf[p] === p) {
  c = times(c, rat(p * (p - 2), (p - 1) ** 2));
  a = times(a, rat(p * (p - 1) - 1, p * (p - 1)));
}
const cLo = times(c, rat(N - 2, N - 1));
const aLo = times(a, rat(N - 1, N));
const marginLo = times(cLo, plus(rat(1), times(a, rat(-1))));
const marginHi = times(c, plus(rat(1), times(aLo, rat(-1))));
assert(less(rat(33, 200), marginLo));
assert(less(marginHi, rat(21, 125)));
assert(less(rat(4, 25), marginLo));
same(new Map([['constant', plus(rat(33, 200), rat(-4, 25))]]),
  new Map([['constant', rat(1, 200)]]));
console.log('VERIFIED: rational Euler-product bounds give 33/200 < C2*(1-A2) < 21/125.');
console.log('OPEN: no asymptotic bound for the centered discrepancy is supplied by these finite controls.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/moving-cutoff-validation.js
//   invocation:  node research/moving-cutoff-validation.js
//   code-sha256: eb5eac64fa2a8c6753f329ff3651ea04f5d364322931b6203792ca62f5a82ad0
//   out-sha256:  077b2155ce9710555f15bf43d7464f1459309ff872f8a2a8b966f96e19d7fb51
//   body-lines:  6
//   forced:      2026-09-06, 0 of 2 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     1.2 s
// ============================================================================
// VERIFIED: the printed cutoff swap fails in both Lambda conventions; exact positive difference identified.
// VERIFIED: the 2018 author-preprint swap has the same endpoint defect; exact control is 2*log(3)*log(5).
// VERIFIED: 40 exact dyadic reconstructions with independently ordered discrepancy sums.
// VERIFIED: deleting the moving boundary, density projection, even terms or prime powers changes a control.
// VERIFIED: rational Euler-product bounds give 33/200 < C2*(1-A2) < 21/125.
// OPEN: no asymptotic bound for the centered discrepancy is supplied by these finite controls.
// ============================================================================
// READINGS
