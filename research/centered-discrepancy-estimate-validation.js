#!/usr/bin/env node
'use strict';
// Exact finite controls for centered-discrepancy-estimate.md.
// Rational polynomials in formal prime logarithms, as in moving-cutoff-validation.js.
// Nothing here estimates D_y; the checks are algebraic identities and controls.
const assert = require('node:assert/strict');
const N = 1100;
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
const gcdI = (a, b) => b ? gcdI(b, a % b) : a;
const gcd = (a, b) => b ? gcd(b, a % b) : (a < 0n ? -a : a);
function rat(n, d = 1n) {
  n = BigInt(n); d = BigInt(d); assert(d !== 0n);
  if (d < 0n) { n = -n; d = -d; }
  const g = gcd(n, d); return [n / g, d / g];
}
const plus = (a, b) => rat(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const times = (a, b) => rat(a[0] * b[0], a[1] * b[1]);
function add(a, b, num = 1, den = 1) {
  const out = new Map(a), scale = rat(num, den);
  for (const [key, value] of b) {
    const v = plus(out.get(key) || rat(0), times(value, scale));
    if (v[0]) out.set(key, v); else out.delete(key);
  }
  return out;
}
const log = n => new Map(fs[n].map(([p, k]) => [String(p), rat(k)]));
// Standard von Mangoldt convention, proper prime powers included.
const lambda = n => fs[n].length === 1 ? new Map([[String(fs[n][0][0]), rat(1)]]) : new Map();
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
const ser = a => JSON.stringify(canon(a), (_, v) => typeof v === 'bigint' ? String(v) : v);
const different = (a, b) => ser(a) !== ser(b);

// f(n) = Lambda(n-2) mu(n) as a formal polynomial with integer coefficient mu(n).
const f = n => add(new Map(), lambda(n - 2), mu(n));
// log(e/n) = log e - log n.
const logRatio = (e, n) => add(log(e), log(n), -1);

// ---------------------------------------------------------------------------
// 1. The exact split of D_y at a fixed level e_1 <= x/(2y), and the flip of the
//    top range to the m-orientation with the Mobius sign on the modulus.
// ---------------------------------------------------------------------------
let checks = 0, atomWitness = false, coprimeWitness = false;
let projectionWitness = false, endpointWitness = false, e1Witness = false;
for (const x of [32, 48, 64, 96, 128, 192, 256, 384, 512]) {
  for (const y of new Set([2, 3, 5, 7, 11, Math.ceil(x ** (12 / 25))])) {
    const Q = Math.floor(x / y);
    const aOf = e => Math.max(x / 2, e * y); // excluded endpoint
    // D_y exactly as in moving-cutoff-parity (9): e-orientation.
    let Dy = new Map();
    for (let e = 1; e <= Q; e += 2) {
      const a = aOf(e);
      for (let n = x / 2 + 1; n <= x; n++) if (n > a) {
        const coefficient = mu(e) * mu(n) * ((n % e === 0 ? phi(e) : 0) - 1);
        Dy = add(Dy, product(lambda(n - 2), logRatio(e, n)), coefficient, phi(e));
      }
    }
    const half = Math.floor(x / (2 * y));
    const candidates = new Set([1, 2, 3, Math.max(1, Math.floor(half / 2)), half + 1]);
    for (const e1 of candidates) {
      if (e1 < 1 || e1 > half + 1) continue;
      // Every odd e < e1 has ey <= x/2, so its interval is the full J_x.
      for (let e = 1; e < e1; e += 2) assert(aOf(e) === x / 2);
      // Fixed-endpoint truncation D^{(e1)}.
      let Dfixed = new Map(), Dnoproj = new Map();
      for (let e = 1; e < e1; e += 2) for (let n = x / 2 + 1; n <= x; n++) {
        const term = product(lambda(n - 2), logRatio(e, n));
        Dfixed = add(Dfixed, term, mu(e) * mu(n) * ((n % e === 0 ? phi(e) : 0) - 1), phi(e));
        if (n % e === 0) Dnoproj = add(Dnoproj, term, mu(e) * mu(n));
      }
      // Top range in the e-orientation, with and without the moving endpoint.
      let TtopE = new Map(), TtopFixed = new Map(), Ptop = new Map();
      const start = e1 % 2 ? e1 : e1 + 1; // first odd e >= e1
      for (let e = start; e <= Q; e += 2) {
        const a = aOf(e);
        for (let n = x / 2 + 1; n <= x; n++) {
          const term = product(lambda(n - 2), logRatio(e, n));
          if (n % e === 0) {
            TtopFixed = add(TtopFixed, term, mu(e) * mu(n));
            if (n > a) TtopE = add(TtopE, term, mu(e) * mu(n));
          }
          if (n > a) Ptop = add(Ptop, term, mu(e) * mu(n), phi(e));
        }
      }
      // Top range in the m-orientation: modulus m > y, cofactor e >= e1 odd,
      // squarefree, coprime to m; weight mu(m)(-log m) Lambda(em-2).
      let TtopM = new Map(), TtopMatom = new Map(), TtopMnocop = new Map();
      for (let m = y; m <= Math.floor(x / e1); m++) {
        if (mu(m) === 0) continue;
        for (let e = start; e * m <= x; e += 2) {
          if (e * m <= x / 2 || mu(e) === 0) continue;
          const term = product(lambda(e * m - 2), log(m));
          const coprime = gcdI(e, m) === 1;
          if (m > y) {
            if (coprime) TtopM = add(TtopM, term, -mu(m));
            TtopMnocop = add(TtopMnocop, term, -mu(m));
          }
          if (coprime) TtopMatom = add(TtopMatom, term, -mu(m));
        }
      }
      same(Dy, add(add(Dfixed, TtopE), Ptop, -1));
      same(TtopE, TtopM);
      // The e = 1 term of D^{(e1)} vanishes identically: 1 - 1/phi(1) = 0.
      if (e1 > 1) {
        let one = new Map();
        for (let n = x / 2 + 1; n <= x; n++) one = add(one, product(lambda(n - 2), logRatio(1, n)), mu(n) * (1 - 1));
        assert(one.size === 0);
      }
      atomWitness ||= different(TtopM, TtopMatom);
      coprimeWitness ||= different(TtopM, TtopMnocop);
      projectionWitness ||= (e1 > 1 && different(Dfixed, Dnoproj));
      endpointWitness ||= different(TtopE, TtopFixed);
      e1Witness ||= (e1 > 1 && e1 <= half + 1 && Dfixed.size > 0 && TtopE.size > 0);
      checks++;
    }
  }
}
assert(atomWitness && coprimeWitness && projectionWitness && endpointWitness && e1Witness);
console.log('VERIFIED: ' + checks + ' exact splits D_y = D^(e1) + T_top - P_top with the top range flipped to the m-orientation.');
console.log('VERIFIED: every odd e < e1 <= x/(2y) has a_e = x/2; the moving endpoint acts only inside the flipped top range.');
console.log('VERIFIED: the e = 1 term of the fixed-endpoint truncation is identically zero.');
console.log('VERIFIED: including the endpoint atom m = y, dropping (e,m)=1, dropping the density projection, or dropping the moving endpoint each changes a control.');

// ---------------------------------------------------------------------------
// 2. Vaughan's identity for mu, as written for the band analysis: for
//    m > max(U,V), mu(m) = -sum_{d<=U, d'<=V, dd'|m} mu(d)mu(d') + sum_{dl=m, d>U, l>V} mu(d)c(l),
//    c(l) = -sum_{d'|l, d'<=V} mu(d').
// ---------------------------------------------------------------------------
let vaughan = 0;
for (const [U, V] of [[3, 5], [10, 10], [31, 7], [7, 31]]) {
  for (let m = Math.max(U, V) + 1; m <= 1000; m++) {
    let typeI = 0, typeII = 0;
    for (const d of ds[m]) if (d <= U) for (const dd of ds[m / d]) if (dd <= V) typeI -= mu(d) * mu(dd);
    for (const d of ds[m]) if (d > U) {
      const l = m / d;
      if (l > V) {
        let c = 0;
        for (const dd of ds[l]) if (dd <= V) c -= mu(dd);
        typeII += mu(d) * c;
      }
    }
    assert(typeI + typeII === mu(m));
    vaughan++;
  }
}
console.log('VERIFIED: Vaughan identity for mu on ' + vaughan + ' (m,U,V) cases; Type I divisors dd\' <= UV, Type II factors d > U, l > V.');

// ---------------------------------------------------------------------------
// 3. Exponent bookkeeping for the flipped top range, rational.
//    y = x^(12/25) and e_1 = x^(1/2+eps) give moduli m <= x/e_1 = x^(1/2-eps);
//    the filter moduli m[b^2,g] with b,g <= (log x)^C stay below x^(1/2-eps/2).
//    The band e in (x^(1/2-eps), x^(1/2+eps)] has trivial mass of order eps x log^2 x.
// ---------------------------------------------------------------------------
const less = (a, b) => a[0] * b[1] < b[0] * a[1];
const eps = rat(1, 100);
assert(less(rat(12, 25), plus(rat(1, 2), times(eps, rat(-1)))));       // 2y < x^(1/2-eps) eventually
assert(less(plus(rat(1, 2), times(eps, rat(-1))), plus(rat(1, 2), times(eps, rat(-1, 2))))); // room for polylog filters
console.log('VERIFIED: 12/25 < 1/2 - eps < 1/2 - eps/2 at eps = 1/100; the flipped moduli sit inside the Bombieri-Vinogradov range.');
console.log('OPEN: no asymptotic bound for D^(e1) or for the band is supplied by these finite controls.');

// ---------------------------------------------------------------------------
// 4. Repair attempt 2026-09-08 (section 3a of the note): the algebra the
//    repaired top-range argument changes. Finite identities only.
// ---------------------------------------------------------------------------
const isPow2 = n => n >= 2 && (n & (n - 1)) === 0;
// Lambda_0: standard Lambda with the powers of two removed.
const lambda0 = n => isPow2(n) ? new Map() : lambda(n);
function factorAny(n) {
  const out = [];
  for (let p = 2; p * p <= n; p++) if (n % p === 0) { let k = 0; while (n % p === 0) { n /= p; k++; } out.push([p, k]); }
  if (n > 1) out.push([n, 1]);
  return out;
}
const phiAny = n => factorAny(n).reduce((v, [p]) => v / p * (p - 1), n);
const lcm = (a, b) => a / gcdI(a, b) * b;
const tau = n => fs[n].reduce((v, [, k]) => v * (k + 1), 1);

// 4a. Reconstruction of the flipped count with n >= e_1 m, odd b and g | m.
let recon = 0, atomEndpoint = false, pow2Witness = false, evenBZero = 0;
for (const x of [16, 32, 64, 128, 256, 512]) {
  for (const y of new Set([2, 3, 5, Math.ceil(x ** (12 / 25))])) {
    const half = Math.floor(x / (2 * y));
    for (const e1 of new Set([2, 3, Math.max(1, Math.floor(half / 2)), half + 1])) {
      if (e1 < 1 || e1 > half + 1) continue;
      const start = e1 % 2 ? e1 : e1 + 1;
      for (let m = y + 1; m <= Math.floor(x / e1); m++) {
        if (mu(m) === 0) continue;
        // N(m) from (4), and N_0(m) with Lambda_0.
        let N = new Map(), N0 = new Map(), pow2 = new Map();
        for (let e = start; e * m <= x; e += 2) {
          if (e * m <= x / 2 || mu(e) === 0 || gcdI(e, m) !== 1) continue;
          N = add(N, lambda(e * m - 2)); N0 = add(N0, lambda0(e * m - 2));
          if (isPow2(e * m - 2)) { assert(e * m === x / 2 + 2); pow2 = add(pow2, lambda(e * m - 2)); }
        }
        same(N, add(N0, pow2));
        pow2Witness ||= pow2.size > 0;
        if (m % 2 === 0) { assert(N0.size === 0); continue; }
        // Reconstruction: odd b, g | m, interval (l_m, x] with l_m = max(x/2, e_1 m - 1).
        const l = Math.max(x / 2, e1 * m - 1);
        assert(Number.isInteger(l));
        const L = x - l; assert(L >= 1 && L <= x / 2);
        let R = new Map(), Rstrict = new Map(), Reven = new Map();
        for (let b = 1; m * b * b <= x; b++) for (const g of ds[m]) {
          const q = m * lcm(b * b, g);
          let count = 0;
          for (let n = l + 1; n <= x; n++) if (n % q === 0) {
            count++;
            const t = lambda0(n - 2);
            if (b % 2) R = add(R, t, mu(b) * mu(g));
            else Reven = add(Reven, lambda(n - 2), mu(b) * mu(g));
            if (b % 2 && n > e1 * m) Rstrict = add(Rstrict, t, mu(b) * mu(g));
          }
          if (q <= x) assert(count <= L / q + 1);
        }
        same(R, N0);
        if (x >= 8) { assert(Reven.size === 0); evenBZero++; }
        if (x === 16 && y === 2 && e1 === 3 && m === 5) {
          assert(different(R, Rstrict));
          same(R, new Map([['13', rat(1)]]));
          atomEndpoint = true;
        }
        recon++;
      }
    }
  }
}
assert(recon > 100 && atomEndpoint && pow2Witness);
console.log('VERIFIED: ' + recon + ' reconstructions N_0(m) = sum over odd b and g | m of mu(b)mu(g) times the Lambda_0 progression count on (max(x/2, e_1 m - 1), x]; N = N_0 + the single power-of-two atom n = x/2 + 2.');
console.log('VERIFIED: at x=16, y=2, e_1=3, m=5 the inclusive count is exactly log 13 and the strict count differs; even-b terms vanish identically for x >= 8 in ' + evenBZero + ' cases.');

// 4b. Reciprocal-totient local factors with (m',g)=1 retained.
//     1/phi(m' r) = 1/(phi(m') phi(r)) * prod_{p | (m', b), p not dividing g} (p-1)/p,  r = g [b^2, g].
function hLocal(p, b, g) { return g % p === 0 ? rat(0) : b % p === 0 ? rat(p - 1, p) : rat(1); }
const cases = [
  ['neither', 1, 1, 5], ['b only', 3, 1, 3], ['g only', 1, 3, 5], ['both b and g', 3, 3, 5],
  ['shared primes', 15, 1, 15], ['b and g share a prime', 15, 5, 3], ['nonsquarefree b', 9, 1, 3],
];
for (const [label, b, g, mp] of cases) {
  assert(mu(mp) !== 0 && gcdI(mp, g) === 1 && mu(g) !== 0);
  const r = g * lcm(b * b, g);
  assert(r === b * b * g * g / gcdI(b, g));
  let lhs = rat(1, phiAny(mp * r)), rhs = rat(1, phiAny(mp) * phiAny(r));
  for (const [p] of fs[mp]) rhs = times(rhs, hLocal(p, b, g));
  assert.deepEqual(lhs, rhs);
  if (label === 'b only') {
    assert.deepEqual(hLocal(3, b, g), rat(2, 3));
    let wrong = times(rat(1, phiAny(mp) * phiAny(r)), rat(3, 2));
    assert.notDeepEqual(lhs, wrong);
  }
}
// Coprimality: when p | g the weight is zero, so m' with p | m' is excluded.
assert.deepEqual(hLocal(3, 1, 3), rat(0)); assert.deepEqual(hLocal(3, 3, 3), rat(0));
console.log('VERIFIED: 1/phi(m\'r) = (1/(phi(m\')phi(r))) prod_{p|(m\',b)} (p-1)/p in ' + cases.length + ' cases (p | b only, g only, both, neither, shared primes); the reciprocal 3/2 fails at m\'=3, r=9; p | g gives weight 0.');

// 4c. The corrected Dirichlet series: mu(m') h(m')/phi(m') = (mu/id) * eta with
//     eta(p^k) = -1/(p^k (p-1)) for p not dividing 2bg, p^-k for p | 2g, 0 for p | b, p not dividing g.
function etaPrimePower(p, k, b, g) {
  if (p === 2 || g % p === 0) return rat(1, p ** k);
  if (b % p === 0) return rat(0);
  return rat(-1, (p ** k) * (p - 1));
}
function eta(n, b, g) { let v = rat(1); for (const [p, k] of fs[n]) v = times(v, etaPrimePower(p, k, b, g)); return v; }
function hOf(n, b, g) { if (mu(n) === 0 || n % 2 === 0) return rat(0); let v = rat(1); for (const [p] of fs[n]) v = times(v, hLocal(p, b, g)); return v; }
let conv = 0;
for (const [b, g] of [[1, 1], [3, 1], [1, 3], [3, 3], [15, 1], [15, 5], [9, 1], [5, 21]]) {
  for (let n = 1; n <= N; n++) {
    let lhs = times(rat(mu(n), phi(n)), hOf(n, b, g)), rhs = rat(0);
    for (const d of ds[n]) rhs = plus(rhs, times(rat(mu(d), d), eta(n / d, b, g)));
    assert.deepEqual(lhs, rhs); conv++;
  }
}
console.log('VERIFIED: the corrected series identity mu(m\')h(m\')/phi(m\') = (mu(d)/d) * eta(k) on ' + conv + ' (m\',b,g) cases; eta vanishes at primes dividing b but not g, so H_{b,g} has no b-dependent factor.');

// 4d. Modulus multiplicity: the number of (m,b,g) with m odd squarefree, b odd, g | m and m[b^2,g] = q is at most tau(q)^3.
let maxRatio = 0;
const count = Array(N + 1).fill(0);
for (let m = 1; m <= N; m += 2) if (mu(m) !== 0) for (const g of ds[m]) for (let b = 1; m * b * b <= N; b += 2) {
  const q = m * lcm(b * b, g); if (q <= N) count[q]++;
}
for (let q = 1; q <= N; q++) { assert(count[q] <= tau(q) ** 3); maxRatio = Math.max(maxRatio, count[q] / tau(q) ** 3); }
console.log('VERIFIED: modulus multiplicity c(q) <= tau(q)^3 for q <= ' + N + ' (largest ratio ' + maxRatio.toFixed(3) + ').');
console.log('OPEN: these finite identities do not prove the asymptotic bound; the Bombieri-Vinogradov and Mobius mean inputs are carried by the written derivation in section 3a.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/centered-discrepancy-estimate-validation.js
//   invocation:  node research/centered-discrepancy-estimate-validation.js
//   code-sha256: 4c8df762baa9ac533743fa8a5b61b830131c4b9aab52cd978d07219b884841f6
//   out-sha256:  8c0cc4c87e1a43d4e2e5eb312cc00e122d5f0f487c815a4dc54bf8f5b9f274a9
//   body-lines:  13
//   forced:      2026-09-08, 0 of 3 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-08
//   elapsed:     15.0 s
// ============================================================================
// VERIFIED: 237 exact splits D_y = D^(e1) + T_top - P_top with the top range flipped to the m-orientation.
// VERIFIED: every odd e < e1 <= x/(2y) has a_e = x/2; the moving endpoint acts only inside the flipped top range.
// VERIFIED: the e = 1 term of the fixed-endpoint truncation is identically zero.
// VERIFIED: including the endpoint atom m = y, dropping (e,m)=1, dropping the density projection, or dropping the moving endpoint each changes a control.
// VERIFIED: Vaughan identity for mu on 3923 (m,U,V) cases; Type I divisors dd' <= UV, Type II factors d > U, l > V.
// VERIFIED: 12/25 < 1/2 - eps < 1/2 - eps/2 at eps = 1/100; the flipped moduli sit inside the Bombieri-Vinogradov range.
// OPEN: no asymptotic bound for D^(e1) or for the band is supplied by these finite controls.
// VERIFIED: 1412 reconstructions N_0(m) = sum over odd b and g | m of mu(b)mu(g) times the Lambda_0 progression count on (max(x/2, e_1 m - 1), x]; N = N_0 + the single power-of-two atom n = x/2 + 2.
// VERIFIED: at x=16, y=2, e_1=3, m=5 the inclusive count is exactly log 13 and the strict count differs; even-b terms vanish identically for x >= 8 in 1412 cases.
// VERIFIED: 1/phi(m'r) = (1/(phi(m')phi(r))) prod_{p|(m',b)} (p-1)/p in 7 cases (p | b only, g only, both, neither, shared primes); the reciprocal 3/2 fails at m'=3, r=9; p | g gives weight 0.
// VERIFIED: the corrected series identity mu(m')h(m')/phi(m') = (mu(d)/d) * eta(k) on 8800 (m',b,g) cases; eta vanishes at primes dividing b but not g, so H_{b,g} has no b-dependent factor.
// VERIFIED: modulus multiplicity c(q) <= tau(q)^3 for q <= 1100 (largest ratio 1.000).
// OPEN: these finite identities do not prove the asymptotic bound; the Bombieri-Vinogradov and Mobius mean inputs are carried by the written derivation in section 3a.
// ============================================================================
// READINGS
// ============================================================
// 1. Every displayed identity of centered-discrepancy-estimate.md sections 2 and 4.3
//    that can be tested at finite x is tested exactly; the asymptotic claims (5)-(8)
//    are not finite statements and are carried by the written derivation only.
