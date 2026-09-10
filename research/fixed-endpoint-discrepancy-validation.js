#!/usr/bin/env node
'use strict';
// Fixed-endpoint discrepancy: finite checks of the exact algebra in
// research/fixed-endpoint-discrepancy.md (split at e_0, density projection,
// dual divisor identity, Vaughan three-piece decomposition of the cofactor
// Mobius, deletion controls). Floating-point sums compared across
// independent summation orders at relative tolerance 1e-9. Nothing here
// tests an asymptotic estimate; the sizes printed are bookkeeping at tiny x
// and carry no asymptotic content.
const assert = require('node:assert/strict');

function sieves(N) {
  const lam = new Float64Array(N + 1);   // standard von Mangoldt, prime powers included
  const mu = new Int8Array(N + 1).fill(1);
  const isP = new Uint8Array(N + 1).fill(1); isP[0] = 0; isP[1] = 0;
  const lpf = new Int32Array(N + 1);
  for (let p = 2; p <= N; p++) {
    if (!isP[p]) continue;
    for (let q = p; q <= N; q *= p) for (let k = q; k <= N; k += q) lam[k] = Math.log(p);
    for (let k = p; k <= N; k += p) { if (k > p) isP[k] = 0; if (!lpf[k]) lpf[k] = p; }
    for (let k = p; k <= N; k += p) mu[k] = -mu[k];
    const pp = p * p; for (let k = pp; k <= N; k += pp) mu[k] = 0;
  }
  for (let q = 2; q <= N; q++) { // Lambda(q)=log p only at prime powers; reset composites
    let n = q, p = lpf[n]; while (n % p === 0) n /= p; if (n !== 1) lam[q] = 0;
  }
  return { lam, mu, lpf };
}
const phi = (n, lpf) => { let r = n, m = n; while (m > 1) { const p = lpf[m]; r = r / p * (p - 1); while (m % p === 0) m /= p; } return r; };
const gcd = (a, b) => b ? gcd(b, a % b) : a;
const divisors = n => { const d = []; for (let i = 1; i * i <= n; i++) if (n % i === 0) { d.push(i); if (i * i !== n) d.push(n / i); } return d; };
const near = (a, b, tag) => { const s = Math.max(1, Math.abs(a), Math.abs(b)); assert(Math.abs(a - b) <= 1e-9 * s, `${tag}: ${a} vs ${b}`); };

const EPS = 1 / 60, EPSP = 1 / 60;
let splitChecks = 0, dualChecks = 0, vaughanChecks = 0, controlsFired = 0;

for (const j of [10, 12, 14, 16]) {
  const x = 2 ** j, N = x + 2;
  const { lam, mu, lpf } = sieves(N);
  const f = n => lam[n - 2] * mu[n];
  const e1 = Math.floor(x ** (0.5 + EPS)), e0 = Math.floor(x ** (0.5 - EPSP));
  assert(3 <= e0 && e0 < e1 && e1 < x / 2);
  // M and the odd Mobius means over e<u
  let M = 0; for (let n = x / 2 + 1; n <= x; n++) M += f(n);
  const means = u => { let s0 = 0, s1 = 0; for (let e = 1; e < u; e += 2) if (mu[e]) { s0 += mu[e] / phi(e, lpf); s1 += mu[e] * Math.log(e) / phi(e, lpf); } return [s0, s1]; };

  // (1) D^(e_1) by definition, split by e-range, both parts of the bracket.
  const D = (lo, hi) => { let s = 0;
    for (let e = lo; e < hi; e++) { if (e % 2 === 0 || !mu[e]) continue; const pe = phi(e, lpf);
      for (let n = x / 2 + 1; n <= x; n++) { const fn = f(n); if (!fn) continue; s += mu[e] * ((n % e === 0 ? 1 : 0) - 1 / pe) * fn * Math.log(e / n); } }
    return s; };
  // Flipped progression parts: P = -sum_e sum_m mu(m) log m Lambda(em-2), (m,e)=1.
  const P = (lo, hi, keepCoprime = true, oddOnly = true) => { let s = 0;
    for (let e = lo; e < hi; e++) { if ((oddOnly && e % 2 === 0) || !mu[e]) continue;
      for (let m = Math.floor(x / (2 * e)) + 1; m <= Math.floor(x / e); m++) { if (!mu[m] || (keepCoprime && gcd(m, e) !== 1)) continue; s -= mu[m] * Math.log(m) * lam[e * m - 2]; } }
    return s; };
  // Density parts: Q = sum_e mu(e)/phi(e) sum_n f(n) log(e/n).
  const Q = (lo, hi) => { let s = 0; let Fl = 0; for (let n = x / 2 + 1; n <= x; n++) Fl += f(n) * Math.log(n);
    for (let e = lo; e < hi; e++) { if (e % 2 === 0 || !mu[e]) continue; s += mu[e] / phi(e, lpf) * (M * Math.log(e) - Fl); } return s; };
  const Dlow = D(1, e0), Dband = D(e0, e1), Dall = D(1, e1);
  const Plow = P(1, e0), Pband = P(e0, e1), Qlow = Q(1, e0), Qband = Q(e0, e1);
  near(Dall, Dlow + Dband, 'split'); near(Dlow, Plow - Qlow, 'low'); near(Dband, Pband - Qband, 'band'); splitChecks += 3;
  // Q against the two Mobius means: Q(lo,hi) = M*(S1(hi)-S1(lo)) - Fl*(S0(hi)-S0(lo)).
  { const [a0, a1] = means(e0), [b0, b1] = means(e1); let Fl = 0; for (let n = x / 2 + 1; n <= x; n++) Fl += f(n) * Math.log(n);
    near(Qband, M * (b1 - a1) - Fl * (b0 - a0), 'Qband-means'); splitChecks++; }

  // (2) Dual identity on odd n: P^(e_1)_odd = sum Lambda(n-2)Lambda(n)mu^2(n) + sum Lambda(n-2)mu^2(n) sum_{e'|n, e'<=n/e_1} mu(e') log e'.
  { let Podd = 0, Peven = 0, rhs = 0;
    for (let n = x / 2 + 1; n <= x; n++) { const fn = f(n); if (!fn) continue;
      let w = 0; for (const e of divisors(n)) if (e < e1 && e % 2 === 1) w += mu[e] * Math.log(e / n);
      if (n % 2) Podd += fn * w; else Peven += fn * w;
      if (n % 2) { let t = lam[n] ; for (const ep of divisors(n)) if (ep <= n / e1) t += mu[ep] * Math.log(ep); rhs += lam[n - 2] * t; } }
    near(Plow + Pband, Podd + Peven, 'P-by-n'); near(Podd, rhs, 'dual'); dualChecks += 2;
    assert(Math.abs(Peven) <= 2 * Math.sqrt(x) * Math.log(x) * Math.log(2) + 1e-9); }

  // (3) Vaughan identity for mu at every m<=x, then the three-piece split of P_low.
  for (const [U, V] of [[3, 3], [2, 5], [4, 6]]) {
    const c = new Float64Array(U * V + 1); for (let d = 1; d <= U; d++) for (let k = 1; k <= V; k++) c[d * k] += mu[d] * mu[k];
    const gam = b => { let s = 0; for (const k of divisors(b)) if (k > V) s += mu[k]; return s; };
    const TI = m => { let s = 0; for (const r of divisors(m)) if (r <= U * V) s += c[r]; return s; };
    const TII = m => { let s = 0; for (const a of divisors(m)) if (a > U) s += mu[a] * gam(m / a); return s; };
    for (let m = 1; m <= Math.min(x, 4096); m++) near(mu[m], TII(m) - TI(m) + (m <= U ? mu[m] : 0) + (m <= V ? mu[m] : 0), `vaughan m=${m}`);
    let tI = 0, tII = 0;
    for (let e = 1; e < e0; e += 2) { if (!mu[e]) continue;
      for (let m = Math.floor(x / (2 * e)) + 1; m <= Math.floor(x / e); m++) { assert(m > Math.max(U, V)); if (gcd(m, e) !== 1) continue;
        const L = lam[e * m - 2]; if (!L) continue; tI += Math.log(m) * L * TI(m); tII -= Math.log(m) * L * TII(m); } }
    near(Plow, tI + tII, `three-piece U=${U},V=${V}`); vaughanChecks++;
    if (j === 16 && U === 3) console.log(`x=2^16, U=V=3: T_I^low/x=${(tI / x).toFixed(4)}, T_II^low/x=${(tII / x).toFixed(4)}, P_band/x=${(Pband / x).toFixed(4)}, D^(e1)/x=${(Dall / x).toFixed(4)} (finite bookkeeping only).`);
  }
  // (4) Deletion controls: dropping the coprimality filter or the odd restriction changes P_low.
  if (Math.abs(P(1, e0, false, true) - Plow) > 1e-6) controlsFired++;
  if (Math.abs(P(1, e0, true, false) - Plow) > 1e-6) controlsFired++;
  console.log(`x=2^${j}: e0=${e0}, e1=${e1}; split/density ${splitChecks}, dual ${dualChecks}, Vaughan ${vaughanChecks} checks pass so far; controls fired ${controlsFired}.`);
}
// (5) Type I main-term density: sum_{g|e} mu(g)/phi(e[r,g]) = 1_{(r,e)=1}/(e phi(r)) for odd squarefree e, odd r.
{ const { mu } = sieves(4000); let densityChecks = 0;
  const lcm = (a, b) => a / gcd(a, b) * b;
  const phiT = n => { let r = n, m = n; for (let p = 2; p * p <= m; p++) if (m % p === 0) { r = r / p * (p - 1); while (m % p === 0) m /= p; } if (m > 1) r = r / m * (m - 1); return r; };
  for (let e = 1; e <= 315; e += 2) { if (!mu[e]) continue;
    for (let r = 1; r <= 63; r += 2) { let s = 0; for (const g of divisors(e)) s += mu[g] / phiT(e * lcm(r, g));
      near(s, gcd(r, e) === 1 ? 1 / (e * phiT(r)) : 0, `density e=${e} r=${r}`); densityChecks++; } }
  // (6) Multiplicity of the modulus q=e[r,g] over (e odd squarefree, g|e, r any), weighted by tau(r): at most tau(q)^4.
  let multChecks = 0, maxRatio = 0;
  const tau = n => divisors(n).length;
  for (let q = 1; q <= 3000; q++) { let w = 0;
    for (const e of divisors(q)) { if (e % 2 === 0 || !mu[e]) continue; const s = q / e;
      for (const g of divisors(e)) for (const r of divisors(s)) if (lcm(r, g) === s) w += tau(r); }
    const ratio = w / tau(q) ** 4; if (ratio > maxRatio) maxRatio = ratio; assert(w <= tau(q) ** 4, `multiplicity q=${q}`); multChecks++; }
  console.log(`Type I density identity: ${densityChecks} (e,r) pairs; multiplicity c'(q)<=tau(q)^4 for q<=3000 (${multChecks} checks, max ratio ${maxRatio.toFixed(3)}).`); }
// (7) V4 correction witness: without truncating g the modulus e[r,g] exceeds e_0 U V; [r,g]=rg/(r,g).
{ const { mu } = sieves(4096); const lcm = (a, b) => a / gcd(a, b) * b;
  for (let r = 1; r <= 200; r++) for (let g = 1; g <= 200; g++) assert.equal(lcm(r, g) * gcd(r, g), r * g);
  const x = 2 ** 16, e0 = Math.floor(x ** (0.5 - EPSP)), U = 3, V = 3, Q0 = e0 * U * V, G = 8;
  let over = 0, overBody = 0, maxq = 0, witness = 0;
  for (let e = 1; e < e0; e += 2) { if (!mu[e]) continue;
    for (const g of divisors(e)) for (let r = 1; r <= U * V; r++) { const q = e * lcm(r, g);
      if (q > maxq) maxq = q; if (q > Q0) over++; if (q > Q0 * G && g <= G) overBody++; if (e === 209 && g === 209 && r === 1) witness = q; } }
  assert.equal(witness, 43681); assert(witness > Q0); assert(over > 0); assert(maxq <= e0 * e0 * U * V);
  assert.equal(overBody, 0, 'body moduli with g<=G must stay below e0*U*V*G');
  assert(maxq <= e0 * U * V * (e0 - 1));
  console.log(`V4 witness at x=2^16 (e0=${e0}, U=V=3, Q0=${Q0}): e=g=209, r=1 gives q=${witness}; ${over} triples exceed Q0, max q=${maxq}; with g<=${G} no body modulus exceeds e0*U*V*${G}=${Q0 * G} (${overBody} violations).`); }
assert(controlsFired >= 6, 'deletion controls must change P_low at three or more scales');
console.log('PASS: exact fixed-endpoint identities only; no asymptotic estimate tested.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fixed-endpoint-discrepancy-validation.js
//   invocation:  node research/fixed-endpoint-discrepancy-validation.js
//   code-sha256: d04d9c345a428726a0382cd49a8b45b02c520032c204fe34b8ee5f1d6fa6d397
//   out-sha256:  8cec07576f8454313964307c60df209c3a1c045a88ff4b8fbeedbbf66dd55d35
//   body-lines:  8
//   forced:      2026-09-08, 0 of 11 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-08
//   elapsed:     0.6 s
// ============================================================================
// x=2^10: e0=28, e1=35; split/density 4, dual 2, Vaughan 3 checks pass so far; controls fired 2.
// x=2^12: e0=55, e1=73; split/density 8, dual 4, Vaughan 6 checks pass so far; controls fired 3.
// x=2^14: e0=108, e1=150; split/density 12, dual 6, Vaughan 9 checks pass so far; controls fired 5.
// x=2^16, U=V=3: T_I^low/x=4.4864, T_II^low/x=-4.4982, P_band/x=-0.0295, D^(e1)/x=-0.0231 (finite bookkeeping only).
// x=2^16: e0=212, e1=307; split/density 16, dual 8, Vaughan 12 checks pass so far; controls fired 7.
// Type I density identity: 4128 (e,r) pairs; multiplicity c'(q)<=tau(q)^4 for q<=3000 (3000 checks, max ratio 1.000).
// V4 witness at x=2^16 (e0=212, U=V=3, Q0=1908): e=g=209, r=1 gives q=43681; 1218 triples exceed Q0, max q=400689; with g<=8 no body modulus exceeds e0*U*V*8=15264 (0 violations).
// PASS: exact fixed-endpoint identities only; no asymptotic estimate tested.
// ============================================================================
// READINGS
// Exact identities at x=2^10..2^16: the e_0 split, the density projection
// against the two odd Mobius means, the dual divisor identity on odd n, and
// the Vaughan three-piece decomposition of P_low at three (U,V) pairs. The
// printed ratios at x=2^16 are finite bookkeeping; with U=V=3 the Type I
// piece is not small, which is the expected behaviour of Mobius means at a
// fixed tiny cutoff and says nothing about the asymptotic claim.
