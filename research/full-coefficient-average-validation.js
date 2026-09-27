#!/usr/bin/env node
'use strict';
// Finite checks for full-coefficient-average.md.
// Exact algebra: the complete C3 coefficient Ghat on composite inputs equals
// -(log n - log s_W(n)) F(s_W(n)) up to the exceptional term, F(s) is a
// discrete Fourier superposition of multiplicative functions with prime
// values 1-p^(i pi k/log x), the superposition norm is scale-free and
// measured, the envelope 2^omega is attained, sup|F| is measured on a proxy
// window and a large-x construction is checked exactly, and the harmonic
// mass of a large-smooth-part subfamily is computed in the limit.
// 2026-09-08 continuation: the constant Fourier coefficient is exactly 3/5,
// W-rough composites carry the full coefficient -log n, and the equal-exponent
// profile sum F_r is decomposed exactly at its right junction with its
// normalized limit kappa and the fourth-difference bounds used in the proof.
// No correlation theorem, asymptotic rate or twin margin is tested.
const assert = require('node:assert/strict');

// ---------------------------------------------------------------- profile
// C3 profile from global-smooth-majorant (2): chi(t)=1 (t<=0), 0 (t>=1).
const chi = t => t <= 0 ? 1 : t >= 1 ? 0 : 1 - 35 * t ** 4 + 84 * t ** 5 - 70 * t ** 6 + 20 * t ** 7;
const near = (a, b, tol, label) => assert(Math.abs(a - b) <= tol, `${label}: ${a} vs ${b}`);

// Proxy scale: a=x^.22=64 exactly, so log x = 6 log 2/.22; b=x^.24, W=floor(b).
const LOGX = 6 * Math.log(2) / 0.22;
const side = (wa, wb) => {
  const a = Math.exp(wa * LOGX), b = Math.exp(wb * LOGX);
  return { wa, wb, a, b, W: Math.floor(b), L: Math.log(b / a) };
};
const SL = side(0.22, 0.24); // a=64, b~93.4, W=93
const SR = side(0.04, 0.05); // a~2.13, b~2.57, W=2 (degenerate proxy right side)
assert.equal(Math.round(SL.a), 64);
const rho = (d, S) => chi((Math.log(d) - Math.log(S.a)) / S.L);

// ---------------------------------------------------------------- sieve
const N = 1 << 18;
const spf = new Int32Array(N + 3);
for (let i = 2; i <= N + 2; i++) if (!spf[i]) for (let j = i; j <= N + 2; j += i) if (!spf[j]) spf[j] = i;
const factor = n => { const f = []; while (n > 1) { const p = spf[n]; let k = 0; while (n % p === 0) { n /= p; k++; } f.push([p, k]); } return f; };
const divisorsMu = n => { // squarefree divisors with mu
  let list = [[1, 1]];
  for (const [p] of factor(n)) list = list.concat(list.map(([d, m]) => [d * p, -m]));
  return list;
};
const isPrime = n => n >= 2 && spf[n] === n;
const Lambda = n => { const f = factor(n); return f.length === 1 ? Math.log(f[0][0]) : 0; };
const beta = (m, W) => { let s = 0; for (const [p, k] of factor(m)) if (p > W) for (let j = 1; j <= k; j++) s += Math.log(p); return s; }; // sum_{r|m, r>W} Lambda(r), r=p^j>W
const betaExact = (m, W) => { let s = 0; for (const [p, k] of factor(m)) for (let j = 1; j <= k; j++) if (p ** j > W) s += Math.log(p); return s; };

// F(s)=sum_{d|s} mu(d) rho(d); Ghat(n)=sum_{d|n} mu(d)(1-rho(d)) beta_W(n/d).
const F = (s, S) => divisorsMu(s).reduce((acc, [d, m]) => acc + m * rho(d, S), 0);
const Ghat = (n, S) => divisorsMu(n).reduce((acc, [d, m]) => acc + m * (1 - rho(d, S)) * betaExact(n / d, S.W), 0);
const smoothPart = (n, W) => { let s = 1; for (const [p, k] of factor(n)) if (p <= W) s *= p ** k; return s; };
const Eterm = (n, S) => { // global-factor-signs (4): sum over p<=W, p^j|n, p^j>W of log p * F(n/p^j)
  let e = 0;
  for (const [p, k] of factor(n)) if (p <= S.W) for (let j = 2; j <= k; j++) if (p ** j > S.W) e += Math.log(p) * F(n / p ** j, S);
  return e;
};

// (A) Exact factor formula for the C3 profile on the proxy window.
let identityChecks = 0, irregular = 0, primeZero = 0, maxErr = 0;
for (let n = 2; n <= N; n++) {
  const s = smoothPart(n, SL.W);
  const rhs = Lambda(n) * (n > SL.W ? 1 : 0) - (Math.log(n) - Math.log(s)) * F(s, SL) - Eterm(n, SL);
  const lhs = Ghat(n, SL);
  maxErr = Math.max(maxErr, Math.abs(lhs - rhs));
  assert(Math.abs(lhs - rhs) < 1e-9 * (1 + Math.abs(lhs)), `factor formula fails at n=${n}: ${lhs} vs ${rhs}`);
  identityChecks++;
  if (Eterm(n, SL) !== 0) irregular++;
  if (isPrime(n) && n > SL.W) { assert(Math.abs(lhs) < 1e-9); primeZero++; }
}
assert(irregular > 0);
// Control: dropping the exceptional term breaks the identity on irregular inputs.
{
  let broken = 0;
  for (let n = 2; n <= 20000; n++) if (Eterm(n, SL) !== 0) {
    const s = smoothPart(n, SL.W);
    const wrong = Lambda(n) * (n > SL.W ? 1 : 0) - (Math.log(n) - Math.log(s)) * F(s, SL);
    if (Math.abs(wrong - Ghat(n, SL)) > 1e-9) broken++;
  }
  assert(broken > 0);
  console.log(`Factor formula: ${identityChecks} inputs, max abs error ${maxErr.toExponential(2)}; irregular inputs ${irregular}; primes above W with Ghat=0: ${primeZero}; control (omit E): ${broken} failures`);
}

// (B) Discrete Fourier superposition. In y=log d/log x, h(y)=1-chi((y-wa)/(wb-wa)).
// Periodic C3 extension of period 2: hper(y)=h(y)-h(y-1.2) on [0,2).
const fourier = (S, M) => {
  const h = y => 1 - chi((y - S.wa) / (S.wb - S.wa));
  const hper = y => { y = ((y % 2) + 2) % 2; return h(y) - h(y - 1.2); };
  // c_k = (1/2) int_0^2 hper(y) e^{-i pi k y} dy, trapezoid on M points (periodic => exact to spectral accuracy).
  const K = M / 2 - 1; const re = new Float64Array(2 * K + 1), im = new Float64Array(2 * K + 1);
  const ys = Array.from({ length: M }, (_, j) => 2 * j / M), hs = ys.map(hper);
  for (let k = -K; k <= K; k++) { let sr = 0, si = 0; for (let j = 0; j < M; j++) { const th = -Math.PI * k * ys[j]; sr += hs[j] * Math.cos(th); si += hs[j] * Math.sin(th); } re[k + K] = sr / M; im[k + K] = si / M; }
  const c = k => [re[k + K], im[k + K]];
  const abs = k => Math.hypot(re[k + K], im[k + K]);
  let norm = 0; for (let k = -K; k <= K; k++) norm += abs(k);
  const tail = K0 => { let t = 0; for (let k = -K; k <= K; k++) if (Math.abs(k) > K0) t += abs(k); return t; };
  return { c, abs, norm, tail, K, hper };
};
const M = 4096;
const FL = fourier(SL, M), FR = fourier(SR, M);
// Pointwise reconstruction of h(d) for d in the fixture with |k|<=K0.
const reconstructH = (d, Fo, K0) => { const y = Math.log(d) / LOGX; let s = 0; for (let k = -K0; k <= K0; k++) { const [cr, ci] = Fo.c(k); const th = Math.PI * k * y; s += cr * Math.cos(th) - ci * Math.sin(th); } return s; };
let recErr = 0, recChecks = 0;
for (let d = 1; d <= 4096; d++) { recErr = Math.max(recErr, Math.abs(reconstructH(d, FL, 400) - (1 - rho(d, SL)))); recChecks++; }
console.log(`Fourier superposition (period 2 in y, C3 periodic extension): norm sum|c_k| left ${FL.norm.toFixed(4)}, right ${FR.norm.toFixed(4)}; tails beyond |k|=100: ${FL.tail(100).toExponential(2)}/${FR.tail(100).toExponential(2)}; beyond 400: ${FL.tail(400).toExponential(2)}/${FR.tail(400).toExponential(2)}; pointwise h reconstruction max error (|k|<=400, ${recChecks} d): ${recErr.toExponential(2)}`);
assert(recErr < 1e-3);
// F(s) = -sum_k c_k g_k(s), g_k(s)=prod_{p|s}(1-p^{i pi k/log x}) multiplicative; check Euler identity and envelope.
const gk = (s, k) => { let re = 1, im = 0; for (const [p] of factor(s)) { const th = Math.PI * k * Math.log(p) / LOGX; const ar = 1 - Math.cos(th), ai = -Math.sin(th); [re, im] = [re * ar - im * ai, re * ai + im * ar]; } return [re, im]; };
let eulerChecks = 0, envelopeMaxRatio = 0, multChecks = 0;
const gcd = (a, b) => b ? gcd(b, a % b) : a;
for (const k of [1, 2, 3, 5, 8, 13, 21, 34, 55]) for (let s = 1; s <= 3000; s++) {
  // sum_{d|s} mu(d) d^{i pi k/log x}
  let sr = 0, si = 0; for (const [d, m] of divisorsMu(s)) { const th = Math.PI * k * Math.log(d) / LOGX; sr += m * Math.cos(th); si += m * Math.sin(th); }
  const [gr, gi] = gk(s, k); near(sr, gr, 1e-9, 'Euler re'); near(si, gi, 1e-9, 'Euler im'); eulerChecks++;
  const om = factor(s).length; envelopeMaxRatio = Math.max(envelopeMaxRatio, Math.hypot(gr, gi) / 2 ** om);
  assert(Math.hypot(gr, gi) <= 2 ** om + 1e-9);
}
for (const k of [3, 7]) for (let m = 1; m <= 80; m++) for (let n = 1; n <= 80; n++) if (gcd(m, n) === 1) { const [a1, b1] = gk(m, k), [a2, b2] = gk(n, k), [c1, c2] = gk(m * n, k); near(a1 * a2 - b1 * b2, c1, 1e-9, 'mult re'); near(a1 * b2 + b1 * a2, c2, 1e-9, 'mult im'); multChecks++; }
// F reconstruction through the superposition, |k|<=400, on smooth parts of the fixture.
let fRecErr = 0, fRecChecks = 0;
for (let s = 2; s <= 6000; s++) { if (factor(s).some(([p]) => p > SL.W)) continue; let re = 0; for (let k = -400; k <= 400; k++) { const [cr, ci] = FL.c(k); const [gr, gi] = gk(s, k); re += cr * gr - ci * gi; } fRecErr = Math.max(fRecErr, Math.abs(-re - F(s, SL))); fRecChecks++; }
assert(fRecErr < 1e-2);
console.log(`Euler identities sum_{d|s} mu(d)d^{i pi k/log x}=g_k(s): ${eulerChecks}; coprime multiplicativity checks: ${multChecks}; max |g_k|/2^omega attained ${envelopeMaxRatio.toFixed(4)}; F reconstruction from the superposition on ${fRecChecks} W-smooth s (|k|<=400): max error ${fRecErr.toExponential(2)}`);

// (C) Pointwise size of F on the proxy window, and the exact large-x construction.
let supF = 0, argF = 0, nonzeroF = 0;
for (let n = 2; n <= N; n++) { const v = Math.abs(F(smoothPart(n, SL.W), SL)); if (v > 1e-12) nonzeroF++; if (v > supF) { supF = v; argF = n; } }
console.log(`Proxy window n<=${N}, a=64, b=${SL.b.toFixed(2)}, W=${SL.W}: sup|F(s_W(n))| = ${supF.toFixed(6)} at n=${argF} (smooth part ${smoothPart(argF, SL.W)}, omega=${factor(smoothPart(argF, SL.W)).length}); inputs with F!=0: ${nonzeroF}`);
// Construction: r=45 primes with exponent e in (.24/11,.22/10): every 10-subset below a, every 11-subset above b, product below x.
{
  const lo = 0.24 / 11, hi = 0.22 / 10; assert(lo < hi); assert(45 * hi < 1); assert(46 * lo > 1);
  const e = (lo + hi) / 2; assert(10 * e < 0.22 && 11 * e > 0.24);
  const binom = (n, k) => { let r = 1n; for (let i = 0n; i < BigInt(k); i++) r = r * (BigInt(n) - i) / (i + 1n); return r; };
  let Fc = 0n; for (let j = 0; j <= 45; j++) { const rhoVal = j * e <= 0.22 ? 1n : (j * e >= 0.24 ? 0n : -1n); assert(rhoVal !== -1n); Fc += (j % 2 ? -1n : 1n) * binom(45, j) * rhoVal; }
  assert.equal(Fc, binom(44, 10));
  console.log(`Large-x construction: 45 primes with exponent in (${lo.toFixed(5)},${hi.toFixed(5)}) give F = C(44,10) = ${Fc} exactly (all profile values 0 or 1); any superposition of 1-bounded functions representing F has norm at least this`);
}

// (D) Harmonic mass of the subfamily s=p1p2p3, exponents in (.18,.22): F=-2 exactly, s in (x^.54,x^.66], s W_L-smooth.
{
  const e1 = 0.18, e2 = 0.22; assert(2 * e1 > 0.24); assert(e2 <= 0.22); assert(e2 < 0.24);
  // F for exponents (u,v,w): 1 - 3*rho(single) + 3*rho(pair) - rho(triple), with rho=1 on singles (<=.22) and 0 on pairs/triple (>=.24)
  const Fexp = (...es) => { let s = 0; const r = es.length; for (let mask = 0; mask < 1 << r; mask++) { let sum = 0, bits = 0; for (let i = 0; i < r; i++) if (mask >> i & 1) { sum += es[i]; bits++; } s += (bits % 2 ? -1 : 1) * chi((sum - 0.22) / 0.02); } return s; };
  for (const es of [[0.181, 0.19, 0.2199], [0.2, 0.2, 0.2], [0.185, 0.21, 0.215]]) assert.equal(Fexp(...es), -2);
  const mass = 2 * Math.log(e2 / e1) ** 3 / 6; // Mertens limit of sum |F(s)|/s over the subfamily
  console.log(`Subfamily s=p1p2p3, exponents in (.18,.22): F=-2 exactly; limit harmonic mass sum|F(s)|/s = (1/3)ln(.22/.18)^3 = ${mass.toFixed(6)}; these s exceed x^(1/2) and are W_L-smooth`);
  // Control: with exponents in (.12,.13) the triple is below b and F=0 on the plateau region? single .12<=.22 ->1, pairs .24..26 -> 0, triple .36 -> 0: F = 1-3+0-0 = -2 still; with (.05,.07): pairs <.22 ->1, triple <.22 ->1: F=1-3+3-1=0.
  assert.equal(Fexp(0.05, 0.06, 0.07), 0);
  assert.equal(Fexp(0.125, 0.125, 0.125), -2);
}

// (E) Unsigned envelope after conversion back from a 1-bounded surrogate: sum 2^omega(n) 2^omega(n-2) over (N/2,N].
{
  const omega = n => factor(n).length;
  const rows = [];
  for (const Nn of [1 << 14, 1 << 16, 1 << 18]) { let s = 0; for (let n = Nn / 2 + 1; n <= Nn; n++) s += 2 ** omega(n) * 2 ** omega(n - 2); rows.push(`${Nn}: ${(s / (Nn / 2)).toFixed(2)} per integer, /log^2 N = ${(s / (Nn / 2) / Math.log(Nn) ** 2).toFixed(4)}`); }
  console.log(`Envelope 2^omega(n)2^omega(n-2), mean over (N/2,N]: ${rows.join('; ')} (finite measurement only)`);
}

// ---------------------------------------------------------------- 2026-09-08 continuation
// (F) The constant Fourier coefficient of the period-2 extension is exactly 3/5 for every
// profile with 0<w<w'<0.8: int_0^2 [h(v)-h(v-1.2)] dv = int_{0.8}^{2} h - int_{-1.2}^{0} h = 1.2.
// Hence the rough indicator 1_{s_i(n)=1} enters F_i(s_i(n)) with coefficient 1-c_0 = 2/5,
// while every g_k has g_k(1)=1, so the full coefficient on rough inputs is F_i(1)=1.
{
  const [c0L] = FL.c(0), [c0R] = FR.c(0);
  near(c0L, 0.6, 1e-9, 'c_0 left'); near(c0R, 0.6, 1e-9, 'c_0 right');
  let sumL = 0, sumR = 0; for (let k = -FL.K; k <= FL.K; k++) { sumL += FL.c(k)[0]; sumR += FR.c(k)[0]; }
  near(sumL, 0, 1e-6, 'sum c_k = hper(0) = 0'); near(sumR, 0, 1e-6, 'sum c_k right');
  // Lipschitz constant of chi: max |chi'| = 140/64 = 35/16 at t=1/2.
  let maxSlope = 0; for (let i = 1; i < 2000; i++) { const t = i / 2000; maxSlope = Math.max(maxSlope, 140 * t ** 3 * (1 - t) ** 3); }
  near(maxSlope, 35 / 16, 1e-6, 'max |chi prime|');
  console.log(`Constant Fourier coefficient c_0 = ${c0L.toFixed(6)} (left), ${c0R.toFixed(6)} (right): exact 3/5; sum_k c_k = ${sumL.toExponential(2)}/${sumR.toExponential(2)} (exact 0, so F_i(1)=1); max|chi'| = ${maxSlope.toFixed(6)} = 35/16`);
}
// (H) On W-rough composite inputs the complete coefficient is exactly -log t (F(1)=1, E=0, Lambda=0 off prime powers):
// the both-rough composite pair sum enters Rhat with coefficient 1, not through the Fourier weights.
{
  let roughComp = 0, roughPrime = 0;
  for (let n = 2; n <= N; n++) if (smoothPart(n, SL.W) === 1) {
    const f = factor(n);
    if (isPrime(n)) { assert(Math.abs(Ghat(n, SL)) < 1e-9); roughPrime++; }
    else { const expected = f.length === 1 ? -(f[0][1] - 1) * Math.log(f[0][0]) : -Math.log(n); near(Ghat(n, SL), expected, 1e-9, 'rough composite'); roughComp++; }
  }
  console.log(`W-rough inputs on the proxy window: ${roughPrime} primes with Ghat=0, ${roughComp} composites with Ghat=-log n (=-(k-1)log p at a prime power p^k)`);
}
// (G) Growth of the equal-exponent alternating profile sum F_r = sum_j (-1)^j C(r,j) chi((0.7 j/r - .22)/.02),
// exact rational arithmetic. Junction decomposition for r=35m: with n=r-4, J2=12m, h=35/r,
// g_k = sum_{i<=4} (-1)^{4-i} C(4,i) S((k-i)h), S(y)=1-chi(y)=chi(1-y)=35y^4-84y^5+70y^6-20y^7 on [0,1],
// F_r = (-1)^{J2+1} sum_{k=1}^{J2} (-1)^{k-1} C(n,J2-k) g_k exactly. Normalized sigma_r = F_r/((-1)^{J2+1} C(n,J2-1) 35 h^4)
// tends to kappa = 1-24q^3/(1+q), q=12/23; bounds 24(1-12kh) <= g_k/(35h^4) <= 24 for 5<=k<=m.
{
  const gcdB = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) { [a, b] = [b, a % b]; } return a; };
  class Q { constructor(n, d = 1n) { if (d < 0n) { n = -n; d = -d; } const g = gcdB(n, d) || 1n; this.n = n / g; this.d = d / g; }
    add(o) { return new Q(this.n * o.d + o.n * this.d, this.d * o.d); } mul(o) { return new Q(this.n * o.n, this.d * o.d); }
    sub(o) { return this.add(new Q(-o.n, o.d)); } cmp(o) { const l = this.n * o.d, r = o.n * this.d; return l < r ? -1 : l > r ? 1 : 0; }
    eq(o) { return this.n === o.n && this.d === o.d; } toNum() { return Number(this.n) / Number(this.d); } }
  const one = new Q(1n), zero = new Q(0n);
  const chiQ = t => { if (t.cmp(zero) <= 0) return one; if (t.cmp(one) >= 0) return zero;
    const t2 = t.mul(t), t4 = t2.mul(t2), t5 = t4.mul(t), t6 = t5.mul(t), t7 = t6.mul(t);
    return one.sub(t4.mul(new Q(35n))).add(t5.mul(new Q(84n))).sub(t6.mul(new Q(70n))).add(t7.mul(new Q(20n))); };
  const SQ = y => one.sub(chiQ(y));
  const binomB = (n, k) => { let r = 1n; for (let i = 0n; i < BigInt(k); i++) r = r * (BigInt(n) - i) / (i + 1n); return r; };
  const Fr = r => { let s = zero; for (let j = 0; j <= r; j++) { const t = new Q(BigInt(j) * 35n, BigInt(r)).sub(new Q(11n)); s = s.add(chiQ(t).mul(new Q((j % 2 ? -1n : 1n) * binomB(r, j)))); } return s; };
  const q = 12 / 23, kappa = 1 - 24 * q ** 3 / (1 + q);
  const gk = (k, h) => { let g = zero; for (let i = 0; i <= 4; i++) g = g.add(SQ(h.mul(new Q(BigInt(k - i)))).mul(new Q([1n, -4n, 6n, -4n, 1n][i]))); return g; };
  let identityOK = 0;
  for (let m = 2; m <= 8; m++) {
    const r = 35 * m, n = r - 4, J2 = 12 * m, h = new Q(35n, BigInt(r));
    let rhs = zero;
    for (let k = 1; k <= J2; k++) rhs = rhs.add(gk(k, h).mul(new Q(((k - 1) % 2 ? -1n : 1n) * binomB(n, J2 - k))));
    rhs = rhs.mul(new Q((J2 + 1) % 2 ? -1n : 1n));
    assert(Fr(r).eq(rhs), 'junction decomposition r=' + r); identityOK++;
  }
  const rows = [];
  for (const r of [35, 70, 140, 280, 420]) { const v = Fr(r).toNum(); rows.push(`r=${r}: |F_r|=${Math.abs(v).toExponential(3)}, log2|F_r|/r=${(Math.log2(Math.abs(v)) / r).toFixed(3)}`); }
  const sig = [];
  for (const m of [4, 20, 100, 400]) {
    const r = 35 * m, n = r - 4, J2 = 12 * m, h = new Q(35n, BigInt(r)); const h4 = 35 * (35 / r) ** 4;
    let sigma = 0, rho = 1;
    for (let k = 1; k <= J2; k++) { if (k > 1) rho *= (J2 - k + 1) / (n - J2 + k);
      const gt = gk(k, h).toNum() / h4;
      if (k >= 5 && k <= m) assert(gt <= 24 + 1e-9 && gt >= 24 * (1 - 12 * k * 35 / r) - 1e-9, 'g_k bound');
      sigma += (k % 2 ? 1 : -1) * rho * gt; if (rho < 1e-300) break; }
    sig.push(`m=${m}: sigma/kappa=${(sigma / kappa).toFixed(5)}`);
    if (m >= 100) assert(Math.abs(sigma / kappa - 1) < 0.05);
  }
  console.log(`Equal-exponent profile sum, exact rationals: junction decomposition identity holds for r=35m, m=2..8 (${identityOK} cases); ${rows.join('; ')}`);
  console.log(`Normalized junction sum against kappa=${kappa.toFixed(6)} (q=12/23): ${sig.join('; ')}; bounds 24(1-12kh)<=g_k/(35h^4)<=24 verified for 5<=k<=m (finite measurement; the asymptotic proof is in the note)`);
}
console.log('Full-coefficient superposition finite controls: PASS. No correlation theorem, rate or twin margin is tested.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/full-coefficient-average-validation.js
//   invocation:  node research/full-coefficient-average-validation.js
//   code-sha256: c38767eb3f1aa8fb8ce23ead836018da0f8f115d3b844289e42925e84bfd35ff
//   out-sha256:  496c1e50257585951fae63d4ad0560de6bd39f000eaf87c030f04a3718405f05
//   body-lines:  12
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-08
//   elapsed:     2.6 s
// ============================================================================
// Factor formula: 262143 inputs, max abs error 5.33e-15; irregular inputs 7320; primes above W with Ghat=0: 22976; control (omit E): 287 failures
// Fourier superposition (period 2 in y, C3 periodic extension): norm sum|c_k| left 2.8247, right 3.0963; tails beyond |k|=100: 8.28e-2/2.84e-1; beyond 400: 2.49e-4/3.43e-3; pointwise h reconstruction max error (|k|<=400, 4096 d): 1.40e-4
// Euler identities sum_{d|s} mu(d)d^{i pi k/log x}=g_k(s): 27000; coprime multiplicativity checks: 7862; max |g_k|/2^omega attained 1.0000; F reconstruction from the superposition on 2523 W-smooth s (|k|<=400): max error 3.99e-4
// Proxy window n<=262144, a=64, b=93.41, W=93: sup|F(s_W(n))| = 3.621938 at n=72930 (smooth part 72930, omega=6); inputs with F!=0: 112943
// Large-x construction: 45 primes with exponent in (0.02182,0.02200) give F = C(44,10) = 2481256778 exactly (all profile values 0 or 1); any superposition of 1-bounded functions representing F has norm at least this
// Subfamily s=p1p2p3, exponents in (.18,.22): F=-2 exactly; limit harmonic mass sum|F(s)|/s = (1/3)ln(.22/.18)^3 = 0.002694; these s exceed x^(1/2) and are W_L-smooth
// Envelope 2^omega(n)2^omega(n-2), mean over (N/2,N]: 16384: 50.77 per integer, /log^2 N = 0.5391; 65536: 63.49 per integer, /log^2 N = 0.5162; 262144: 77.44 per integer, /log^2 N = 0.4975 (finite measurement only)
// Constant Fourier coefficient c_0 = 0.600000 (left), 0.600000 (right): exact 3/5; sum_k c_k = 3.02e-11/1.04e-8 (exact 0, so F_i(1)=1); max|chi'| = 2.187500 = 35/16
// W-rough inputs on the proxy window: 22976 primes with Ghat=0, 8831 composites with Ghat=-log n (=-(k-1)log p at a prime power p^k)
// Equal-exponent profile sum, exact rationals: junction decomposition identity holds for r=35m, m=2..8 (7 cases); r=35: |F_r|=2.861e+8, log2|F_r|/r=0.803; r=70: |F_r|=3.071e+17, log2|F_r|/r=0.830; r=140: |F_r|=1.451e+36, log2|F_r|/r=0.858; r=280: |F_r|=8.660e+73, log2|F_r|/r=0.877; r=420: |F_r|=1.698e+112, log2|F_r|/r=0.888
// Normalized junction sum against kappa=-1.239914 (q=12/23): m=4: sigma/kappa=0.99853; m=20: sigma/kappa=1.06554; m=100: sigma/kappa=1.01583; m=400: sigma/kappa=1.00408; bounds 24(1-12kh)<=g_k/(35h^4)<=24 verified for 5<=k<=m (finite measurement; the asymptotic proof is in the note)
// Full-coefficient superposition finite controls: PASS. No correlation theorem, rate or twin margin is tested.
// ============================================================================
// READINGS
// Exact finite identities pass: the C3 factor formula with its exceptional
// term, the discrete Fourier superposition of F over multiplicative functions
// with prime values 1-p^(i pi k/log x), the Euler identities and the attained
// 2^omega envelope. The unfloored proxy Fourier norms are 2.8247 left, 3.0963
// right; the C(44,10) construction bounds below the norm of any 1-bounded
// representation; the (.18,.22) triple subfamily carries harmonic mass
// 0.002694 above x^(1/2). Finite algebra only: no correlation theorem, rate,
// asymptotic or twin margin is tested.
// Integration correction: these norms belong to the unfloored proxy. The
// rounded-profile identity and the limits of the norm/transfer conclusions
// are stated in full-coefficient-average.md and research-round-validation.md.
// 2026-09-08: c_0 = 3/5 on both sides and sum_k c_k = 0, so rough inputs carry
// F_i(1)=1; every W-rough composite on the proxy has Ghat = -log n. The exact
// junction decomposition of F_r holds for r = 35m, m <= 8; |F_r| grows with
// log2|F_r|/r rising from 0.803 (r=35) to 0.888 (r=420); the normalized sum
// has sigma/kappa = 1.00408 at m = 400 (kappa = -1.239914) and the fourth-
// difference bounds hold. These are finite checks of the ingredients of the
// note's Proposition 6.5; the asymptotic statement itself is proved there.
