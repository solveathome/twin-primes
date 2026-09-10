// KERNEL SIGN CONTROL — does the ACTUAL aggregated Mobius/von Mangoldt right
// coefficient b_u = A_right(g u) of grouped-divisor-moment.md (13) make the
// moment (1) and the small-common-divisor kernel (21) smaller than the same
// moment with |b_u|, or with |b_u| times an independent seeded random sign?
//
// Companion: kernel-sign-control.md, whose section 0 carries the falsifier and
// the four negative controls, written before this file was ever executed.
//
// A finite ratio measured on a handful of dyadic scales is a MEASUREMENT. It
// cannot establish or refute an asymptotic power saving, it does not prove
// (21), and it does not move the twin margin. Every number carries its sizes.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const started = Date.now();
const CAP_MS = 2 * 3600 * 1000;
const cap = (what) => assert(Date.now() - started < CAP_MS, `wall-clock cap exceeded at ${what}`);
const elog = (s) => process.stderr.write(s + '\n');
const argv = process.argv.slice(2);
const optOf = (n, d) => { const i = argv.indexOf('--' + n); return i === -1 ? d : argv[i + 1]; };

// ---------------------------------------------------------------------------
// 0. Small arithmetic
// ---------------------------------------------------------------------------
const LIMIT = 1 << 18;
const spf = new Int32Array(LIMIT + 1);
for (let i = 2; i <= LIMIT; i++) { if (spf[i] === 0) for (let j = i; j <= LIMIT; j += i) if (spf[j] === 0) spf[j] = i; }
function factor(n) { const f = []; while (n > 1) { const p = spf[n]; let k = 0; while (n % p === 0) { n /= p; k++; } f.push([p, k]); } return f; }
function mobius(n) { if (n === 1) return 1; const f = factor(n); for (const [, k] of f) if (k > 1) return 0; return f.length % 2 ? -1 : 1; }
function divisors(n) { let ds = [1]; for (const [p, k] of factor(n)) { const cur = ds.slice(); let q = 1; for (let i = 1; i <= k; i++) { q *= p; for (const d of cur) ds.push(d * q); } } return ds; }
function gcdn(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; }
function invmod(a, n) { // -1 when gcd(a,n) != 1
  if (n === 1) return 0;
  let t = 0, nt = 1, r = n, nr = ((a % n) + n) % n;
  while (nr !== 0) { const q = Math.floor(r / nr); const tt = t - q * nt; t = nt; nt = tt; const rr = r - q * nr; r = nr; nr = rr; }
  return r !== 1 ? -1 : ((t % n) + n) % n;
}
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () { a = (a + 0x6D2B79F5) >>> 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function kahan(terms) { let s = 0, c = 0; for (const t of terms) { const y = t - c, u = s + y; c = (u - s) - y; s = u; } return s; }
function stats(list) { const n = list.length, mu = list.reduce((a, b) => a + b, 0) / n; const sd = Math.sqrt(list.reduce((a, b) => a + (b - mu) ** 2, 0) / Math.max(1, n - 1)); return { mu, sd }; }
function slope(xs, ys) { const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n; let num = 0, den = 0; for (let i = 0; i < n; i++) { num += (xs[i] - mx) * (ys[i] - my); den += (xs[i] - mx) ** 2; } return num / den; }

// ---------------------------------------------------------------------------
// 1. The exact aggregated coefficients of grouped-divisor-moment.md (13) at s=0
//    A0(l) = mu(l) 1_J(l)
//    A1(l) = -mu(l) 1_J(l) log l - sum_{r|l, 2<=r<=W} mu(l/r) 1_J(l/r) Lambda(r)
//    J = (E,2E] is the ORIGINAL right divisor interval, W = Z the cutoff.
// ---------------------------------------------------------------------------
function coeffA(kind, ell, E, Z) {
  const inJ = (n) => n > E && n <= 2 * E;
  if (kind === 0) return inJ(ell) ? mobius(ell) : 0;
  let val = inJ(ell) ? -mobius(ell) * Math.log(ell) : 0;
  for (const [p, k] of factor(ell)) { let r = p; for (let i = 1; i <= k; i++) { if (r > Z) break; if (inJ(ell / r)) val += -mobius(ell / r) * Math.log(p); r *= p; } }
  return val;
}

// ---------------------------------------------------------------------------
// 2. Configuration and coefficient variants
// ---------------------------------------------------------------------------
function buildConfig(o) {
  const { x, g, ellBox, A, Atop, E, Z, J0, zNum, zDen, Mover } = o;
  assert(ellBox % g === 0, 'ell box must be divisible by g');
  const N = ellBox / g;
  const M = Mover !== undefined ? Mover : Math.floor(Math.pow(x, 14 / 25));
  const theta = 2 / g;
  assert(Number.isInteger(theta), 'theta = 2/g must be an integer here');
  const Hs = []; for (let h = A; h < 2 * A; h++) Hs.push(h);
  const T = 4 * Atop;
  const ch = Hs.map((h) => { const v = h / (T + 1); const W = Math.PI * v * (1 - Math.abs(v)) / Math.tan(Math.PI * v) + Math.abs(v); return W / (2 * Math.PI * h); });
  const f = new Float64Array(2 * N + 1);
  for (let d = 1; d <= Math.min(J0, 2 * N); d++) for (let e = 1; d * e <= 2 * N; e++) f[d * e] += mobius(e);
  for (let n = 1; n <= 2 * N; n++) { let s = 0; for (const d of divisors(n)) s += f[d]; assert(Math.abs(s - (n <= J0 ? 1 : 0)) < 1e-9, `f-sieve identity failed at ${n}`); }
  return { x, g, N, M, A, Atop, Hs, ch, theta, E, Z, J0, f, ellBox, zNum, zDen, sigma: -1 };
}

function coefficientVariants(cfg, opts) {
  const { N, g, E, Z } = cfg;
  const base1 = new Float64Array(N + 1), base0 = new Float64Array(N + 1);
  for (let i = 1; i <= N; i++) { const ell = g * (N + i); base1[i] = coeffA(1, ell, E, Z); base0[i] = coeffA(0, ell, E, Z); }
  const vs = [];
  const abs1 = new Float64Array(N + 1); for (let i = 1; i <= N; i++) abs1[i] = Math.abs(base1[i]);
  const abs0 = new Float64Array(N + 1); for (let i = 1; i <= N; i++) abs0[i] = Math.abs(base0[i]);
  vs.push({ name: 'A1', b: base1 });
  vs.push({ name: 'absA1', b: abs1 });
  for (let k = 0; k < opts.nDraws; k++) {
    const seed = (0x5EED0000 ^ Math.imul(k + 1, 2654435761) ^ Math.imul(Math.log2(cfg.x) | 0, 40503) ^ (cfg.g << 24) ^ (cfg.A << 16) ^ Math.imul(cfg.ellBox, 97)) >>> 0;
    const rng = mulberry32(seed);
    const a = new Float64Array(N + 1);
    for (let i = 1; i <= N; i++) a[i] = abs1[i] * (rng() < 0.5 ? -1 : 1);
    vs.push({ name: 'rnd' + (k + 1), b: a });
  }
  vs.push({ name: 'A0', b: base0 });
  vs.push({ name: 'absA0', b: abs0 });
  if (opts.ones) { const a = new Float64Array(N + 1).fill(1); a[0] = 0; vs.push({ name: 'ones', b: a }); }
  return vs;
}

// ---------------------------------------------------------------------------
// 3. The moment engine.
//    Y(m) = sum_{u~N} b_u sum_{h in H} c_h 1_{(m,u)=1} e_u(sigma theta h mbar)
//           Phi_{u,h}(m),  Phi = e(h z0/(gmu)) - e(h z/(gmu)),  Mfrak = sum_I |Y|^2.
//    Ordered pairs: j=(u1,u2), c=lcm(u1,u2), R=h1 l2-h2 l1.
//    With f_{J0} = 1_{n<=J0} * mu (Dirichlet inverse pairing), sum_{d|n} f(d)
//    = 1_{n<=J0}, hence   sum over pairs with j<=J0 = sum_m sum_d f(d)|G_d(m)|^2,
//    G_d(m) = sum_{u~N, d|u} b_u sum_h c_h 1_{(m,u)=1} e_u(...) Phi.
//    Equal-frequency pairs (R=0) are exactly the pairs sharing a reduced h/u.
// ---------------------------------------------------------------------------
function runMoment(cfg, variants) {
  const { N, M, Hs, ch, theta, sigma, g, x, f, J0, zNum, zDen } = cfg;
  const nv = variants.length, nh = Hs.length;
  const z0 = x / 2, z1 = x * zNum / zDen, twoZ = Math.abs(z1 - 2 * z0) < 1e-9;
  const TWO_PI = 2 * Math.PI;

  const uList = [];
  for (let i = 1; i <= N; i++) { for (const v of variants) if (v.b[i] !== 0) { uList.push(i); break; } }
  const nu = uList.length;
  assert(nu > 0, 'empty coefficient support');

  const dOff = new Int32Array(nu + 1), dBuf = [];
  for (let a = 0; a < nu; a++) { dOff[a] = dBuf.length; for (const d of divisors(N + uList[a])) if (f[d] !== 0) dBuf.push(d); }
  dOff[nu] = dBuf.length;
  const dArr = new Int32Array(dBuf);
  const seen = new Uint8Array(2 * N + 1), kUsed = [];
  for (const d of dArr) if (!seen[d]) { seen[d] = 1; kUsed.push(d); }
  kUsed.sort((p, q) => p - q);
  const nk = kUsed.length;
  const kIndex = new Int32Array(2 * N + 1).fill(-1);
  for (let t = 0; t < nk; t++) kIndex[kUsed[t]] = t;
  const dIdx = new Int32Array(dArr.length);
  for (let t = 0; t < dArr.length; t++) dIdx[t] = kIndex[dArr[t]];
  assert(kIndex[1] >= 0, 'k=1 must be present');

  const atomU = [], atomH = [];
  for (let a = 0; a < nu; a++) for (let t = 0; t < nh; t++) { atomU.push(a); atomH.push(t); }
  const na = atomU.length;
  const keyMap = new Map(), rawGid = new Int32Array(na);
  let minQ = Infinity;
  for (let s = 0; s < na; s++) {
    const u = N + uList[atomU[s]], h = Hs[atomH[s]], d = gcdn(u, h), q = u / d, p = h / d;
    if (q < minQ) minQ = q;
    const key = p * 8388608 + q;
    if (!keyMap.has(key)) keyMap.set(key, keyMap.size);
    rawGid[s] = keyMap.get(key);
  }
  const gsize = new Int32Array(keyMap.size);
  for (let s = 0; s < na; s++) gsize[rawGid[s]]++;
  let zeroPairs = 0; for (const c of gsize) zeroPairs += c * c;
  const gid = new Int32Array(na).fill(-1), remap = new Int32Array(keyMap.size).fill(-1);
  let nmg = 0;
  for (let s = 0; s < na; s++) if (gsize[rawGid[s]] > 1) { if (remap[rawGid[s]] < 0) remap[rawGid[s]] = nmg++; gid[s] = remap[rawGid[s]]; }

  const maxH = Hs[nh - 1];
  const periodEmpty = theta * maxH * (2 * N) < (N + 1) * (N + 1);
  const zeroFreqSmallEmpty = minQ > J0;

  const bMat = new Float64Array(nu * nv);
  for (let a = 0; a < nu; a++) for (let v = 0; v < nv; v++) bMat[a * nv + v] = variants[v].b[uList[a]];

  const G = new Float64Array(nk * nv * 2), SQ = new Float64Array(nk * nv);
  const ZG = new Float64Array(Math.max(1, nmg * nv * 2)), R0multi = new Float64Array(nv);
  const D = new Float64Array(na);
  let coprime = 0, maxPhi = 0;

  for (let m = M + 1; m <= 2 * M; m++) {
    for (let a = 0; a < nu; a++) {
      const u = N + uList[a];
      const mb = invmod(m % u, u);
      if (mb < 0) continue;
      coprime++;
      const ang1 = TWO_PI * (((((sigma * theta * mb) % u) + u) % u)) / u;
      const w1r = Math.cos(ang1), w1i = Math.sin(ang1);
      const ang2 = TWO_PI * (z0 / (g * m * u));
      const w2r = Math.cos(ang2), w2i = Math.sin(ang2);
      let w3r, w3i;
      if (twoZ) { w3r = w2r * w2r - w2i * w2i; w3i = 2 * w2r * w2i; }
      else { const a3 = TWO_PI * (z1 / (g * m * u)); w3r = Math.cos(a3); w3i = Math.sin(a3); }
      let p1r = 1, p1i = 0, p2r = 1, p2i = 0, p3r = 1, p3i = 0, q;
      for (let e = 0; e < Hs[0]; e++) {
        q = p1r * w1r - p1i * w1i; p1i = p1r * w1i + p1i * w1r; p1r = q;
        q = p2r * w2r - p2i * w2i; p2i = p2r * w2i + p2i * w2r; p2r = q;
        q = p3r * w3r - p3i * w3i; p3i = p3r * w3i + p3i * w3r; p3r = q;
      }
      let Vre = 0, Vim = 0;
      for (let t = 0; t < nh; t++) {
        const dr = p2r - p3r, di = p2i - p3i;
        const ph = dr * dr + di * di; if (ph > maxPhi) maxPhi = ph;
        const kr = p1r * dr - p1i * di, ki = p1r * di + p1i * dr;
        const c = ch[t], ar = -c * ki, ai = c * kr;
        Vre += ar; Vim += ai;
        const s = a * nh + t;
        if (gid[s] < 0) D[s] += ar * ar + ai * ai;
        else { const base = gid[s] * nv * 2; for (let v = 0; v < nv; v++) { const b = bMat[a * nv + v]; ZG[base + 2 * v] += b * ar; ZG[base + 2 * v + 1] += b * ai; } }
        if (t + 1 < nh) {
          q = p1r * w1r - p1i * w1i; p1i = p1r * w1i + p1i * w1r; p1r = q;
          q = p2r * w2r - p2i * w2i; p2i = p2r * w2i + p2i * w2r; p2r = q;
          q = p3r * w3r - p3i * w3i; p3i = p3r * w3i + p3i * w3r; p3r = q;
        }
      }
      const lo = dOff[a], hi = dOff[a + 1];
      for (let t = lo; t < hi; t++) {
        const base = dIdx[t] * nv * 2;
        for (let v = 0; v < nv; v++) { const b = bMat[a * nv + v]; G[base + 2 * v] += b * Vre; G[base + 2 * v + 1] += b * Vim; }
      }
    }
    for (let t = 0; t < nk; t++) {
      const base = t * nv * 2, sb = t * nv;
      for (let v = 0; v < nv; v++) { const re = G[base + 2 * v], im = G[base + 2 * v + 1]; SQ[sb + v] += re * re + im * im; G[base + 2 * v] = 0; G[base + 2 * v + 1] = 0; }
    }
    for (let p = 0; p < nmg; p++) {
      const base = p * nv * 2;
      for (let v = 0; v < nv; v++) { const re = ZG[base + 2 * v], im = ZG[base + 2 * v + 1]; R0multi[v] += re * re + im * im; ZG[base + 2 * v] = 0; ZG[base + 2 * v + 1] = 0; }
    }
    if ((m & 4095) === 0) cap('moment loop');
  }

  const cnt = new Float64Array(nk);
  for (let a = 0; a < nu; a++) for (let t = dOff[a]; t < dOff[a + 1]; t++) cnt[dIdx[t]] += nh;
  const smallPairs = Math.round(kahan(Array.from({ length: nk }, (_, t) => f[kUsed[t]] * cnt[t] * cnt[t])));
  const out = { N, M, A: cfg.A, nu, na, nk, nmg, coprime, zeroPairs, smallPairs, periodEmpty, zeroFreqSmallEmpty, minQ, maxPhi: Math.sqrt(maxPhi), variants: [] };
  for (let v = 0; v < nv; v++) {
    const Mfrak = SQ[kIndex[1] * nv + v];
    const terms = new Array(nk); let absMass = 0;
    for (let t = 0; t < nk; t++) { terms[t] = f[kUsed[t]] * SQ[t * nv + v]; absMass += Math.abs(terms[t]); }
    const Xsmall = kahan(terms);
    let R0 = R0multi[v];
    for (let s = 0; s < na; s++) if (gid[s] < 0) { const b = bMat[atomU[s] * nv + v]; R0 += b * b * D[s]; }
    out.variants.push({ name: variants[v].name, Mfrak, Xsmall, XsmallAbsMass: absMass, R0, big: Mfrak - R0 - Xsmall });
  }
  return out;
}

// no-conjugation control: same divisor sieve, but sum f(d) G_d(m)^2 unconjugated
function runNoConjugate(cfg, variant) {
  const { N, M, Hs, ch, theta, sigma, g, x, f, zNum, zDen } = cfg;
  const nh = Hs.length, z0 = x / 2, z1 = x * zNum / zDen, TWO_PI = 2 * Math.PI;
  const uList = []; for (let i = 1; i <= N; i++) if (variant.b[i] !== 0) uList.push(i);
  const kUsed = []; for (let k = 1; k <= 2 * N; k++) if (f[k] !== 0) kUsed.push(k);
  const kIndex = new Int32Array(2 * N + 1).fill(-1); kUsed.forEach((k, t) => { kIndex[k] = t; });
  const nk = kUsed.length;
  const Gre = new Float64Array(nk), Gim = new Float64Array(nk), Cr = new Float64Array(nk), Sr = new Float64Array(nk), Si = new Float64Array(nk);
  for (let m = M + 1; m <= 2 * M; m++) {
    for (const i of uList) {
      const u = N + i, mb = invmod(m % u, u); if (mb < 0) continue;
      const ang1 = TWO_PI * (((((sigma * theta * mb) % u) + u) % u)) / u;
      const w1r = Math.cos(ang1), w1i = Math.sin(ang1);
      const ang2 = TWO_PI * (z0 / (g * m * u)); const w2r = Math.cos(ang2), w2i = Math.sin(ang2);
      const a3 = TWO_PI * (z1 / (g * m * u)); const w3r = Math.cos(a3), w3i = Math.sin(a3);
      let p1r = 1, p1i = 0, p2r = 1, p2i = 0, p3r = 1, p3i = 0, q;
      for (let e = 0; e < Hs[0]; e++) {
        q = p1r * w1r - p1i * w1i; p1i = p1r * w1i + p1i * w1r; p1r = q;
        q = p2r * w2r - p2i * w2i; p2i = p2r * w2i + p2i * w2r; p2r = q;
        q = p3r * w3r - p3i * w3i; p3i = p3r * w3i + p3i * w3r; p3r = q;
      }
      let Vre = 0, Vim = 0;
      for (let t = 0; t < nh; t++) {
        const dr = p2r - p3r, di = p2i - p3i;
        const kr = p1r * dr - p1i * di, ki = p1r * di + p1i * dr;
        const c = ch[t]; Vre += -c * ki; Vim += c * kr;
        if (t + 1 < nh) {
          q = p1r * w1r - p1i * w1i; p1i = p1r * w1i + p1i * w1r; p1r = q;
          q = p2r * w2r - p2i * w2i; p2i = p2r * w2i + p2i * w2r; p2r = q;
          q = p3r * w3r - p3i * w3i; p3i = p3r * w3i + p3i * w3r; p3r = q;
        }
      }
      const b = variant.b[i];
      for (const d of divisors(u)) { const t = kIndex[d]; if (t >= 0) { Gre[t] += b * Vre; Gim[t] += b * Vim; } }
    }
    for (let t = 0; t < nk; t++) { const re = Gre[t], im = Gim[t]; Cr[t] += re * re + im * im; Sr[t] += re * re - im * im; Si[t] += 2 * re * im; Gre[t] = 0; Gim[t] = 0; }
  }
  return { conj: kahan(kUsed.map((k, t) => f[k] * Cr[t])), noConjRe: kahan(kUsed.map((k, t) => f[k] * Sr[t])), noConjIm: kahan(kUsed.map((k, t) => f[k] * Si[t])) };
}

// ---------------------------------------------------------------------------
// 4. Literal ordered-pair expansion (validation only; O(N^2 A^2 M))
// ---------------------------------------------------------------------------
function bruteForce(cfg, variant) {
  const { N, M, Hs, ch, theta, sigma, g, x, J0, zNum, zDen } = cfg;
  const nh = Hs.length, z0 = x / 2, z1 = x * zNum / zDen, TWO_PI = 2 * Math.PI;
  const uList = []; for (let i = 1; i <= N; i++) if (variant.b[i] !== 0) uList.push(N + i);
  const ms = []; for (let m = M + 1; m <= 2 * M; m++) ms.push(m);
  const atoms = [];
  for (const u of uList) for (let t = 0; t < nh; t++) {
    const h = Hs[t], L = ms.length;
    const phiR = new Float64Array(L), phiI = new Float64Array(L), kR = new Float64Array(L), kI = new Float64Array(L), ok = new Uint8Array(L);
    for (let q = 0; q < L; q++) {
      const m = ms[q], mb = invmod(m % u, u); if (mb < 0) continue; ok[q] = 1;
      const a1 = TWO_PI * h * (z0 / (g * m * u)), a2 = TWO_PI * h * (z1 / (g * m * u));
      phiR[q] = Math.cos(a1) - Math.cos(a2); phiI[q] = Math.sin(a1) - Math.sin(a2);
      const ap = TWO_PI * (((((sigma * theta * h * mb) % u) + u) % u)) / u;
      const pr = Math.cos(ap), pi = Math.sin(ap);
      kR[q] = pr * phiR[q] - pi * phiI[q]; kI[q] = pr * phiI[q] + pi * phiR[q];
    }
    atoms.push({ u, h, c: ch[t], b: variant.b[u - N], phiR, phiI, kR, kI, ok });
  }
  let Mfrak = 0;
  for (let q = 0; q < ms.length; q++) {
    let yr = 0, yi = 0;
    for (const a of atoms) { if (!a.ok[q]) continue; yr += a.b * (-a.c * a.kI[q]); yi += a.b * (a.c * a.kR[q]); }
    Mfrak += yr * yr + yi * yi;
  }
  let tot = [0, 0], zero = [0, 0], per = [0, 0], smallAll = [0, 0], smallNZ = [0, 0], smallNZnoPer = [0, 0], big = [0, 0];
  let periodPairs = 0, zeroPairs = 0, smallPairs = 0;
  for (const a of atoms) for (const b of atoms) {
    const j = gcdn(a.u, b.u), l1 = a.u / j, l2 = b.u / j, c = j * l1 * l2, R = a.h * l2 - b.h * l1, r = sigma * theta * R;
    let sr = 0, si = 0;
    for (let q = 0; q < ms.length; q++) {
      if (!a.ok[q] || !b.ok[q]) continue;
      const mb = invmod(ms[q] % c, c); if (mb < 0) continue;
      const ang = TWO_PI * (((((r * mb) % c) + c) % c)) / c;
      const er = Math.cos(ang), ei = Math.sin(ang);
      const fr = a.phiR[q] * b.phiR[q] + a.phiI[q] * b.phiI[q];
      const fi = a.phiI[q] * b.phiR[q] - a.phiR[q] * b.phiI[q];
      sr += er * fr - ei * fi; si += er * fi + ei * fr;
    }
    const w = a.b * b.b * a.c * b.c;
    const tr = w * sr, ti = w * si;
    tot = [tot[0] + tr, tot[1] + ti];
    const isPeriod = R !== 0 && ((((r % c) + c) % c) === 0);
    if (isPeriod) { per = [per[0] + tr, per[1] + ti]; periodPairs++; }
    if (R === 0) { zero = [zero[0] + tr, zero[1] + ti]; zeroPairs++; }
    if (j <= J0) {
      smallAll = [smallAll[0] + tr, smallAll[1] + ti]; smallPairs++;
      if (R !== 0) { smallNZ = [smallNZ[0] + tr, smallNZ[1] + ti]; if (!isPeriod) smallNZnoPer = [smallNZnoPer[0] + tr, smallNZnoPer[1] + ti]; }
    }
    if (R !== 0 && j > J0) big = [big[0] + tr, big[1] + ti];
  }
  return { Mfrak, tot, zero, per, smallAll, smallNZ, smallNZnoPer, big, periodPairs, zeroPairs, smallPairs, pairs: atoms.length * atoms.length };
}

// ---------------------------------------------------------------------------
// 5. Negative control (iii): reciprocity needs BOTH endpoints shifted
// ---------------------------------------------------------------------------
function reciprocityControl() {
  const TWO_PI = 2 * Math.PI;
  const ph = (a, c) => { const t = TWO_PI * ((((a % c) + c) % c)) / c; return [Math.cos(t), Math.sin(t)]; };
  const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
  const mul = (p, q) => [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]];
  let checked = 0, agree = 0, disagree = 0;
  const z0 = 256, z = 487;
  for (const g of [1, 2]) for (let u = 5; u <= 40; u++) for (let m = 41; m <= 90; m++) {
    if (gcdn(m, u) !== 1) continue;
    const theta = 2 / g;
    for (const h of [1, 2, 3]) {
      const phi = (d) => sub(ph(h * (z0 - d), g * m * u), ph(h * (z - d), g * m * u));
      const shifted = mul(ph(theta * h * invmod(m, u), u), phi(2));
      const native = mul(ph(-theta * h * invmod(u, m), m), phi(0));
      const unshifted = mul(ph(theta * h * invmod(m, u), u), phi(0));
      checked++;
      if (Math.hypot(shifted[0] - native[0], shifted[1] - native[1]) < 1e-9) agree++;
      if (Math.hypot(unshifted[0] - native[0], unshifted[1] - native[1]) > 1e-7) disagree++;
    }
  }
  return { checked, agree, disagree };
}

// ---------------------------------------------------------------------------
// 6. Sweep
// ---------------------------------------------------------------------------
const JMIN = Number(optOf('jmin', 18)), JMAX = Number(optOf('jmax', 30)), NDRAWS = 8;
const JLIST = []; for (let j = JMIN; j <= JMAX; j += 2) JLIST.push(j);
const fmt = (v) => (v === 0 ? '0' : (Math.abs(v) < 1e-300 ? '0' : v.toExponential(4)));
const pct = (v) => (100 * v).toFixed(2) + '%';
const boxOf = (kind, E, Z, g) => { const raw = kind === 'top' ? E * Z : E; return raw - (raw % g); };

console.log('KERNEL SIGN CONTROL — actual A_right(gu) against |A_right| and seeded random signs');
console.log('box delta=8/25 nu=9/20: M=floor(x^(14/25)), I=(M,2M]; E=floor(x^(9/20)), Z=max(2,floor(x^(1/20)))');
console.log('top expanded box ell~E*Z (~x^(1/2)), low expanded box ell~E; u=ell/g; native z0=x/2, z=x; sigma=-1');
console.log(`c_h = -W(h/(T+1))/(2 pi i h) with Vaaler W and T=4*Atop; J0=max(1,floor(x^(1/20))); draws=${NDRAWS}`);
console.log(`dyadic scales j: ${JLIST.join(',')}`);

const rc = reciprocityControl();
assert.equal(rc.agree, rc.checked);
assert(rc.disagree > 0);
console.log(`control (iii) reciprocity: ${rc.checked}/${rc.checked} shifted-endpoint kernels equal the native kernel; ${rc.disagree} unshifted ones differ`);

// identity validation against literal ordered-pair enumeration
{
  const rows = [];
  for (const [xv, gg, A, Eb, Zc, J0] of [[4096, 1, 2, 24, 2, 2], [4096, 2, 2, 24, 2, 2], [8192, 1, 1, 32, 2, 1], [8192, 2, 3, 32, 2, 2]]) {
    const cfg = buildConfig({ x: xv, g: gg, ellBox: Eb * Zc, A, Atop: 3, E: Eb, Z: Zc, J0, zNum: 1, zDen: 1, Mover: 24 });
    const vs = coefficientVariants(cfg, { nDraws: 1 });
    const e0 = runMoment(cfg, vs).variants[0];
    const bf = bruteForce(cfg, vs[0]);
    const mass = Math.abs(bf.tot[0]) + Math.abs(bf.zero[0]) + Math.abs(bf.smallAll[0]) + 1;
    assert(Math.abs(bf.Mfrak - e0.Mfrak) < 1e-7 * mass, 'moment vs direct');
    assert(Math.abs(bf.tot[0] - e0.Mfrak) < 1e-7 * mass, 'pair expansion vs moment');
    assert(Math.abs(bf.tot[1]) < 1e-7 * mass, 'pair expansion not real');
    assert(Math.abs(bf.zero[0] - e0.R0) < 1e-7 * mass, 'R=0 class');
    assert(Math.abs(bf.smallAll[0] - e0.Xsmall) < 1e-7 * mass, 'j<=J0 class');
    assert(Math.abs((bf.tot[0] - bf.zero[0] - bf.smallAll[0]) - e0.big) < 1e-7 * mass, 'j>J0 class');
    rows.push(`  x=${xv} g=${gg} A=${A} J0=${J0} N=${cfg.N} M=24: ${bf.pairs} ordered pairs (R=0: ${bf.zeroPairs}, j<=J0: ${bf.smallPairs}, periods: ${bf.periodPairs}); 5 quantities agree`);
  }
  console.log('identity check — divisor sieve against literal ordered-pair expansion:');
  for (const r of rows) console.log(r);
  cap('identity check');
}

// negative control (i): the complete-period class must be detectable
let periodRow = null;
{
  const cfg = buildConfig({ x: 4096, g: 1, ellBox: 6, A: 8, Atop: 8, E: 3, Z: 2, J0: 2, zNum: 1, zDen: 1, Mover: 20 });
  const vs = coefficientVariants(cfg, { nDraws: 0, ones: true });
  const bf = bruteForce(cfg, vs[vs.length - 1]);
  assert(bf.periodPairs > 0, 'control (i) inert: no complete-period pairs in the detector configuration');
  const drop = bf.smallNZ[0] - bf.smallNZnoPer[0];
  assert(Math.abs(drop) > 1e-9, 'control (i) inert: dropping complete periods left the kernel unchanged');
  periodRow = { N: cfg.N, A: cfg.A, M: cfg.M, periodPairs: bf.periodPairs, pairs: bf.pairs, drop, smallNZ: bf.smallNZ[0] };
  console.log(`control (i) complete periods: detector N=${cfg.N} A=${cfg.A} M=${cfg.M} has ${bf.periodPairs} period pairs of ${bf.pairs}; dropping them moves the nonzero j<=J0 kernel from ${fmt(bf.smallNZ[0])} by ${fmt(drop)}`);
}

// main sweep
const CONFIGS = [{ box: 'top', g: 2, band: 'top' }, { box: 'top', g: 2, band: 'one' }, { box: 'top', g: 1, band: 'top' }, { box: 'low', g: 1, band: 'top' }];
const table = [];
for (const j of JLIST) {
  const x = Math.pow(2, j);
  const E = Math.floor(Math.pow(x, 9 / 20)), Z = Math.max(2, Math.floor(Math.pow(x, 1 / 20)));
  const J0 = Math.max(1, Math.floor(Math.pow(x, 1 / 20))), Atop = Math.max(1, Math.round(Math.pow(x, 3 / 50)));
  for (const cf of CONFIGS) {
    const A = cf.band === 'top' ? Atop : 1;
    const cfg = buildConfig({ x, g: cf.g, ellBox: boxOf(cf.box, E, Z, cf.g), A, Atop, E, Z, J0, zNum: 1, zDen: 1 });
    const vs = coefficientVariants(cfg, { nDraws: NDRAWS });
    const t0 = Date.now();
    const res = runMoment(cfg, vs);
    const secs = (Date.now() - t0) / 1000;
    assert(res.zeroFreqSmallEmpty, 'equal-frequency pairs with j<=J0 exist; X_small identity would need correcting');
    let B = 0; for (let i = 1; i <= cfg.N; i++) B = Math.max(B, Math.abs(vs[0].b[i]));
    const v = A * x / (cfg.M * cfg.N), fA = Math.min(1, v);
    const budget = B * B * fA * fA * (cfg.M * cfg.N / A + (1 + v) * (Math.pow(cfg.N, 3) + cfg.M));
    const count5 = 8 * cfg.N * A * (1 + Math.log(2 * Math.min(cfg.N, A)));
    assert(res.zeroPairs <= count5, 'equal-frequency ordered-pair count exceeds the (5) counting bound');
    table.push({ j, x, box: cf.box, g: cf.g, band: cf.band, A, Atop, E, Z, J0, N: cfg.N, M: cfg.M, B, v, f: fA, budget, count5, secs, res });
    elog(`  j=${j} ${cf.box} g=${cf.g} A=${A} N=${cfg.N} M=${cfg.M} nz_u=${res.nu} atoms=${res.na} k=${res.nk} mg=${res.nmg} smallpairs=${res.smallPairs} ${secs.toFixed(1)}s`);
    cap('sweep');
  }
}

// negative control (ii): conjugation
let ncRow = null;
{
  const j = JLIST[0], x = Math.pow(2, j);
  const E = Math.floor(Math.pow(x, 9 / 20)), Z = Math.max(2, Math.floor(Math.pow(x, 1 / 20)));
  const Atop = Math.max(1, Math.round(Math.pow(x, 3 / 50))), J0 = Math.max(1, Math.floor(Math.pow(x, 1 / 20)));
  const cfg = buildConfig({ x, g: 2, ellBox: boxOf('top', E, Z, 2), A: Atop, Atop, E, Z, J0, zNum: 1, zDen: 1 });
  const vs = coefficientVariants(cfg, { nDraws: 0 });
  const nc = runNoConjugate(cfg, vs[0]);
  const scale = Math.abs(nc.conj) + Math.abs(nc.noConjRe) + 1;
  assert(Math.abs(nc.noConjIm) > 1e-6 * scale, 'control (ii) inert: the unconjugated ordered-pair sum came out real');
  ncRow = { j, g: 2, A: Atop, ...nc };
  console.log(`control (ii) conjugation: at j=${j} g=2 A=${Atop} the conjugated X_small = ${fmt(nc.conj)} is real; the unconjugated ordered-pair sum is ${fmt(nc.noConjRe)} + ${fmt(nc.noConjIm)}i`);
}

// negative control (iv): all-ones coefficients
const onesRows = [];
{
  for (const j of JLIST.slice(0, 2)) {
    const x = Math.pow(2, j);
    const E = Math.floor(Math.pow(x, 9 / 20)), Z = Math.max(2, Math.floor(Math.pow(x, 1 / 20)));
    const Atop = Math.max(1, Math.round(Math.pow(x, 3 / 50))), J0 = Math.max(1, Math.floor(Math.pow(x, 1 / 20)));
    const cfg = buildConfig({ x, g: 2, ellBox: boxOf('top', E, Z, 2), A: Atop, Atop, E, Z, J0, zNum: 1, zDen: 1 });
    const vs = coefficientVariants(cfg, { nDraws: 0, ones: true });
    const res = runMoment(cfg, [vs[vs.length - 1], vs[0]]);
    const one = res.variants[0], act = res.variants[1];
    const maxc = Math.max(...cfg.ch);
    const majorant = 1 * maxc * maxc * res.maxPhi * res.maxPhi * cfg.M * res.zeroPairs;
    assert(one.R0 <= majorant * (1 + 1e-9), 'control (iv): the equal-frequency class exceeds its own (5) majorant');
    onesRows.push({ j, N: cfg.N, M: cfg.M, Mfrak: one.Mfrak, R0share: one.R0 / one.Mfrak, actShare: act.R0 / act.Mfrak, zeroPairs: res.zeroPairs, count5: 8 * cfg.N * Atop * (1 + Math.log(2 * Math.min(cfg.N, Atop))), majorant });
  }
  console.log('control (iv) all-ones coefficients, equal-frequency domination (top box, g=2, A=Atop):');
  for (const r of onesRows) console.log(`  j=${r.j} N=${r.N} M=${r.M}: Mfrak(ones)=${fmt(r.Mfrak)}, R=0 share ${pct(r.R0share)} (actual A1 on the same box: ${pct(r.actShare)}); ${r.zeroPairs} equal-frequency ordered pairs vs the (5) count bound ${r.count5.toExponential(3)}; class majorant ${fmt(r.majorant)}`);
}

// endpoint sensitivity
let epRow = null;
{
  const j = JLIST[Math.min(2, JLIST.length - 1)], x = Math.pow(2, j);
  const E = Math.floor(Math.pow(x, 9 / 20)), Z = Math.max(2, Math.floor(Math.pow(x, 1 / 20)));
  const Atop = Math.max(1, Math.round(Math.pow(x, 3 / 50))), J0 = Math.max(1, Math.floor(Math.pow(x, 1 / 20)));
  const base = { x, g: 2, ellBox: boxOf('top', E, Z, 2), A: Atop, Atop, E, Z, J0 };
  const cA = buildConfig({ ...base, zNum: 1, zDen: 1 }), cB = buildConfig({ ...base, zNum: 3, zDen: 4 });
  const ra = runMoment(cA, coefficientVariants(cA, { nDraws: 0 })).variants[0];
  const rb = runMoment(cB, coefficientVariants(cB, { nDraws: 0 })).variants[0];
  epRow = { j, zx: { Mfrak: ra.Mfrak, Xsmall: ra.Xsmall }, z34: { Mfrak: rb.Mfrak, Xsmall: rb.Xsmall } };
  console.log(`endpoint sensitivity at j=${j} g=2 A=${Atop}: z=x gives Mfrak=${fmt(ra.Mfrak)} X_small=${fmt(ra.Xsmall)}; z=3x/4 gives Mfrak=${fmt(rb.Mfrak)} X_small=${fmt(rb.Xsmall)}`);
}

// ---------------------------------------------------------------------------
// 7. Tables
// ---------------------------------------------------------------------------
const pick = (res, name) => res.variants.find((v) => v.name === name);
const draws = (res, key) => res.variants.filter((v) => v.name.startsWith('rnd')).map((v) => v[key]);

console.log('');
console.log('TABLE 1 — the moment Mfrak. n per row: |I|=M values of m, nz_u divisors u with A_right(gu)!=0, |H|=A harmonics');
console.log('   j  box  g   A  J0       N        M   nz_u   atoms    Mfrak(A1)   Mfrak(|A1|)      Mfrak(random) mean +- sd    Mfrak(A0)       budget');
for (const r of table) {
  const s = stats(draws(r.res, 'Mfrak'));
  console.log(`  ${String(r.j).padStart(2)}  ${r.box}  ${r.g}  ${String(r.A).padStart(2)}  ${String(r.J0).padStart(2)}  ${String(r.N).padStart(6)}  ${String(r.M).padStart(7)}  ${String(r.res.nu).padStart(5)}  ${String(r.res.na).padStart(6)}  ${fmt(pick(r.res, 'A1').Mfrak)}  ${fmt(pick(r.res, 'absA1').Mfrak)}  ${fmt(s.mu)} +- ${fmt(s.sd)}  ${fmt(pick(r.res, 'A0').Mfrak)}  ${fmt(r.budget)}`);
}

console.log('');
console.log('TABLE 2 — X_small of (21) and the four ordered-pair classes as shares of Mfrak (actual coefficient A1)');
console.log('   j  box  g   A  J0   X_small(A1)  X_small(|A1|)  mean|X_small(rnd)|   rms(rnd)  rank  |Xs|/Mfrak   R=0 share   periods   j>J0 share  sieve cancel');
let roundFloor = 0;
for (const r of table) {
  const a1 = pick(r.res, 'A1'), ab = pick(r.res, 'absA1'), dd = draws(r.res, 'Xsmall');
  const ma = stats(dd.map(Math.abs)).mu, rms = Math.sqrt(dd.reduce((p, q) => p + q * q, 0) / dd.length);
  const empty = r.res.smallPairs === 0;
  const rank = empty ? 0 : 1 + dd.filter((v) => Math.abs(v) < Math.abs(a1.Xsmall)).length;
  r.rank = rank; r.empty = empty;
  if (!empty) roundFloor = Math.max(roundFloor, 1e-15 * Math.sqrt(r.res.nk * r.M) * a1.XsmallAbsMass / Math.abs(a1.Xsmall));
  console.log(`  ${String(r.j).padStart(2)}  ${r.box}  ${r.g}  ${String(r.A).padStart(2)}  ${String(r.J0).padStart(2)}  ${empty ? 'CLASS EMPTY (0 ordered pairs with j<=J0)                                     ' : `${fmt(a1.Xsmall)}  ${fmt(ab.Xsmall)}     ${fmt(ma)}  ${fmt(rms)}   ${rank}/9`}  ${pct(Math.abs(a1.Xsmall) / a1.Mfrak).padStart(8)}  ${pct(a1.R0 / a1.Mfrak).padStart(8)}  ${r.res.periodEmpty ? '0 (empty)' : 'NONEMPTY'}  ${pct(a1.big / a1.Mfrak).padStart(9)}  ${empty ? '-' : (a1.XsmallAbsMass / Math.abs(a1.Xsmall)).toFixed(1) + 'x'}`);
}
console.log(`  rank = position of |X_small(actual)| among itself and the 8 seeded draws, smallest first; 1/9 would mean the actual coefficient is the most cancelled of the nine`);
console.log(`  worst-case double-rounding floor over these rows, relative to |X_small|: ${roundFloor.toExponential(2)}`);

console.log('');
console.log('TABLE 3 — exponent fits and the pre-registered falsifier (primary fit: the points sharing one J0)');
const families = [];
for (const cf of CONFIGS) {
  const rows = table.filter((r) => r.box === cf.box && r.g === cf.g && r.band === cf.band);
  if (rows.length < 3) continue;
  const tally = new Map(); for (const r of rows) if (r.res.smallPairs > 0) tally.set(r.J0, (tally.get(r.J0) || 0) + 1);
  if (!tally.size) continue;
  let modal = null, best = -1; for (const [k, c] of tally) if (c > best || (c === best && k > modal)) { modal = k; best = c; }
  families.push({ ...cf, rows, fit: rows.filter((r) => r.J0 === modal && r.res.smallPairs > 0), modal });
}
for (const fam of families) {
  const xs = fam.fit.map((r) => r.j);
  const st = {
    mA: slope(xs, fam.fit.map((r) => Math.log2(pick(r.res, 'A1').Mfrak))),
    mAbs: slope(xs, fam.fit.map((r) => Math.log2(pick(r.res, 'absA1').Mfrak))),
    mRnd: stats([...Array(NDRAWS).keys()].map((k) => slope(xs, fam.fit.map((r) => Math.log2(draws(r.res, 'Mfrak')[k]))))),
    mBud: slope(xs, fam.fit.map((r) => Math.log2(r.budget))),
    xA: slope(xs, fam.fit.map((r) => Math.log2(Math.abs(pick(r.res, 'A1').Xsmall)))),
    xRnd: stats([...Array(NDRAWS).keys()].map((k) => slope(xs, fam.fit.map((r) => Math.log2(Math.abs(draws(r.res, 'Xsmall')[k])))))),
    rMf: stats([...Array(NDRAWS).keys()].map((k) => slope(xs, fam.fit.map((r) => Math.log2(pick(r.res, 'A1').Mfrak / draws(r.res, 'Mfrak')[k]))))),
    rXs: stats([...Array(NDRAWS).keys()].map((k) => slope(xs, fam.fit.map((r) => Math.log2(Math.abs(pick(r.res, 'A1').Xsmall) / Math.abs(draws(r.res, 'Xsmall')[k])))))),
  };
  st.ratMf = fam.fit.map((r) => pick(r.res, 'A1').Mfrak / stats(draws(r.res, 'Mfrak')).mu);
  st.ratXs = fam.fit.map((r) => Math.abs(pick(r.res, 'A1').Xsmall) / stats(draws(r.res, 'Xsmall').map(Math.abs)).mu);
  st.ratAbsX = fam.fit.map((r) => Math.abs(pick(r.res, 'A1').Xsmall) / Math.abs(pick(r.res, 'absA1').Xsmall));
  st.ratAbsM = fam.fit.map((r) => pick(r.res, 'A1').Mfrak / pick(r.res, 'absA1').Mfrak);
  fam.st = st;
  console.log(`  ${fam.box} box, g=${fam.g}, band ${fam.band === 'top' ? 'A~x^(3/50)' : 'A=1'}; fit over j=${xs.join(',')} (n=${xs.length} scales, J0=${fam.modal})`);
  console.log(`    d log2 Mfrak / d log2 x:  actual ${st.mA.toFixed(3)}   |b| ${st.mAbs.toFixed(3)}   random ${st.mRnd.mu.toFixed(3)} +- ${st.mRnd.sd.toFixed(3)}   budget ${st.mBud.toFixed(3)}   generic N^3 exponent 1.500`);
  console.log(`    d log2 |X_small| / d log2 x:  actual ${st.xA.toFixed(3)}   random ${st.xRnd.mu.toFixed(3)} +- ${st.xRnd.sd.toFixed(3)}   ((21) needs an exponent below 36/25 = 1.440)`);
  console.log(`    FALSIFIER, slope of log2(actual/random) per draw:  Mfrak ${st.rMf.mu.toFixed(4)} +- ${st.rMf.sd.toFixed(4)}   X_small ${st.rXs.mu.toFixed(4)} +- ${st.rXs.sd.toFixed(4)}`);
  console.log(`    ratio actual/random   Mfrak: ${st.ratMf.map((v) => v.toFixed(3)).join(' ')}`);
  console.log(`    ratio actual/random   |X_small|: ${st.ratXs.map((v) => v.toFixed(3)).join(' ')}`);
  console.log(`    ratio actual/|b|      Mfrak: ${st.ratAbsM.map((v) => v.toFixed(3)).join(' ')}   |X_small|: ${st.ratAbsX.map((v) => v.toFixed(3)).join(' ')}`);
  console.log(`    VERDICT: ${st.rXs.mu + st.rXs.sd < 0 ? 'mean slope + sd < 0 — consistent with extra cancellation over this finite range only' : 'mean slope + sd >= 0 — NO heuristic support for Mobius-sign cancellation in the small-j kernel here'}`);
}

// TABLE 4 — descriptive aggregate, added AFTER the pre-registered fit above.
// It is not the pre-registered test; TABLE 3 is. Under the null that the actual
// Mobius signs behave like one more independent sign draw, the rank of
// |X_small(actual)| among the nine values is uniform on 1..9.
const live = table.filter((r) => r.res.smallPairs > 0);
const ranks = live.map((r) => r.rank);
const meanRank = ranks.reduce((a, b) => a + b, 0) / ranks.length;
const nullSd = Math.sqrt((81 - 1) / 12 / ranks.length);
const belowMedian = live.filter((r) => { const d = draws(r.res, 'Xsmall').map(Math.abs).sort((a, b) => a - b); const med = (d[3] + d[4]) / 2; return Math.abs(pick(r.res, 'A1').Xsmall) < med; }).length;
const gmX = Math.exp(live.map((r) => Math.log(Math.abs(pick(r.res, 'A1').Xsmall) / stats(draws(r.res, 'Xsmall').map(Math.abs)).mu)).reduce((a, b) => a + b, 0) / live.length);
const gmM = Math.exp(live.map((r) => Math.log(pick(r.res, 'A1').Mfrak / stats(draws(r.res, 'Mfrak')).mu)).reduce((a, b) => a + b, 0) / live.length);
const gmAbsX = Math.exp(live.map((r) => Math.log(Math.abs(pick(r.res, 'A1').Xsmall) / Math.abs(pick(r.res, 'absA1').Xsmall))).reduce((a, b) => a + b, 0) / live.length);
const belowMfrak = live.filter((r) => pick(r.res, 'A1').Mfrak < stats(draws(r.res, 'Mfrak')).mu).length;
const aggregate = { n: live.length, meanRank, nullSd, belowMedian, gmX, gmM, gmAbsX, belowMfrak };
console.log('');
console.log('TABLE 4 — descriptive aggregate over every configuration with a nonempty small-j class');
console.log('  (post-hoc summary added after the pre-registered fit in TABLE 3; it is not the pre-registered test)');
console.log(`  configurations n = ${live.length} (7 dyadic scales x 4 boxes, minus the empty-class row at j=18)`);
console.log(`  mean rank of |X_small(actual)| among the nine values: ${meanRank.toFixed(2)}   null expectation 5.00, null sd of this mean ${nullSd.toFixed(2)}`);
console.log(`  configurations with |X_small(actual)| below the median of its 8 draws: ${belowMedian} of ${live.length} (null expectation ${(live.length / 2).toFixed(1)})`);
console.log(`  geometric mean of |X_small(actual)| / mean|X_small(random)|: ${gmX.toFixed(3)}`);
console.log(`  geometric mean of |X_small(actual)| / |X_small(|b|)|: ${gmAbsX.toFixed(3)}`);
console.log(`  geometric mean of Mfrak(actual) / mean Mfrak(random): ${gmM.toFixed(4)}; ${belowMfrak} of ${live.length} configurations below`);

const artifact = {
  schema: 1, aggregate,
  scope: 'Finite measurement of an existing ordered-pair decomposition. No asymptotic rate, power saving or twin margin is measured.',
  jlist: JLIST, nDraws: NDRAWS, configs: CONFIGS,
  reciprocity: rc, periodDetector: periodRow, noConjugate: ncRow, ones: onesRows, endpoint: epRow,
  table: table.map((r) => ({ j: r.j, x: r.x, box: r.box, g: r.g, band: r.band, A: r.A, N: r.N, M: r.M, E: r.E, Z: r.Z, J0: r.J0, B: r.B, v: r.v, f: r.f, budget: r.budget, count5: r.count5, secs: r.secs, rank: r.rank, nu: r.res.nu, na: r.res.na, nk: r.res.nk, nmg: r.res.nmg, zeroPairs: r.res.zeroPairs, smallPairs: r.res.smallPairs, periodEmpty: r.res.periodEmpty, zeroFreqSmallEmpty: r.res.zeroFreqSmallEmpty, minQ: r.res.minQ, variants: r.res.variants })),
  families: families.map((f) => ({ box: f.box, g: f.g, band: f.band, J0: f.modal, fitJ: f.fit.map((r) => r.j), stats: f.st })),
};
fs.writeFileSync(path.join(__dirname, 'kernel-sign-control.json'), JSON.stringify(artifact, null, 2) + '\n');
console.log('');
console.log(`artifact: kernel-sign-control.json (${JLIST.length} dyadic scales, ${table.length} configurations, ${NDRAWS} seeded draws each)`);
console.log('MEASURED ONLY: no power saving, no asymptotic rate and no twin margin follows; (21) and the global margin remain OPEN');
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/kernel-sign-control.js
//   invocation:  node research/kernel-sign-control.js
//   code-sha256: 23288515208f4954fc4235828a44a7ff508b484f528a57044ff835122b669997
//   out-sha256:  4d9f80733c74fd24cb62a5dd2a6633791b1bb915a34c02bba2b208797041406a
//   body-lines:  127
//   forced:      2026-09-06, 0 of 546 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     1031.7 s
// ============================================================================
// KERNEL SIGN CONTROL — actual A_right(gu) against |A_right| and seeded random signs
// box delta=8/25 nu=9/20: M=floor(x^(14/25)), I=(M,2M]; E=floor(x^(9/20)), Z=max(2,floor(x^(1/20)))
// top expanded box ell~E*Z (~x^(1/2)), low expanded box ell~E; u=ell/g; native z0=x/2, z=x; sigma=-1
// c_h = -W(h/(T+1))/(2 pi i h) with Vaaler W and T=4*Atop; J0=max(1,floor(x^(1/20))); draws=8
// dyadic scales j: 18,20,22,24,26,28,30
// control (iii) reciprocity: 6552/6552 shifted-endpoint kernels equal the native kernel; 6547 unshifted ones differ
// identity check — divisor sieve against literal ordered-pair expansion:
//   x=4096 g=1 A=2 J0=2 N=48 M=24: 900 ordered pairs (R=0: 32, j<=J0: 656, periods: 0); 5 quantities agree
//   x=4096 g=2 A=2 J0=2 N=24 M=24: 900 ordered pairs (R=0: 32, j<=J0: 768, periods: 0); 5 quantities agree
//   x=8192 g=1 A=1 J0=1 N=64 M=24: 361 ordered pairs (R=0: 19, j<=J0: 0, periods: 0); 5 quantities agree
//   x=8192 g=2 A=3 J0=2 N=32 M=24: 3249 ordered pairs (R=0: 59, j<=J0: 2808, periods: 0); 5 quantities agree
// control (i) complete periods: detector N=6 A=8 M=20 has 62 period pairs of 2304; dropping them moves the nonzero j<=J0 kernel from -1.4484e-2 by -8.7191e-3
// control (ii) conjugation: at j=18 g=2 A=2 the conjugated X_small = 1.2476e+1 is real; the unconjugated ordered-pair sum is 1.0960e+0 + 9.8785e+0i
// control (iv) all-ones coefficients, equal-frequency domination (top box, g=2, A=Atop):
//   j=18 N=274 M=1082: Mfrak(ones)=2.0698e+3, R=0 share 108.30% (actual A1 on the same box: 97.66%); 638 equal-frequency ordered pairs vs the (5) count bound 1.046e+4; class majorant 1.3215e+4
//   j=20 N=512 M=2352: Mfrak(ones)=8.4549e+3, R=0 share 105.53% (actual A1 on the same box: 100.72%); 1194 equal-frequency ordered pairs vs the (5) count bound 1.955e+4; class majorant 5.3760e+4
// endpoint sensitivity at j=22 g=2 A=2: z=x gives Mfrak=1.1513e+4 X_small=-8.7460e+1; z=3x/4 gives Mfrak=3.5937e+3 X_small=-5.1390e+1
//
// TABLE 1 — the moment Mfrak. n per row: |I|=M values of m, nz_u divisors u with A_right(gu)!=0, |H|=A harmonics
//    j  box  g   A  J0       N        M   nz_u   atoms    Mfrak(A1)   Mfrak(|A1|)      Mfrak(random) mean +- sd    Mfrak(A0)       budget
//   18  top  2   2   1     274     1082    166     332  7.3248e+2  6.8433e+2  6.9160e+2 +- 3.0227e+1  0  2.7434e+7
//   18  top  2   1   1     274     1082    166     166  6.4526e+2  6.3136e+2  6.3327e+2 +- 2.4117e+1  0  1.4672e+7
//   18  top  1   2   1     548     1082    166     332  4.5876e+2  4.0989e+2  4.1148e+2 +- 2.6359e+1  0  1.1659e+8
//   18  low  1   2   1     274     1082    166     332  9.3168e+4  9.5638e+4  9.0466e+4 +- 2.1651e+3  2.5817e+3  2.2695e+9
//   20  top  2   2   2     512     2352    310     620  2.8491e+3  2.8632e+3  2.7749e+3 +- 8.8428e+1  0  1.7708e+8
//   20  top  2   1   2     512     2352    310     310  2.4951e+3  2.5581e+3  2.5526e+3 +- 3.6176e+1  0  9.1907e+7
//   20  top  1   2   2    1024     2352    310     620  1.7516e+3  1.6635e+3  1.6226e+3 +- 4.1720e+1  0  7.3217e+8
//   20  low  1   2   2     512     2352    310     620  4.7756e+5  4.5954e+5  4.5061e+5 +- 7.9240e+3  1.0883e+4  1.7703e+10
//   22  top  2   2   2     955     5113    580    1160  1.1513e+4  1.1286e+4  1.1094e+4 +- 1.5851e+2  0  1.1386e+9
//   22  top  2   1   2     955     5113    580     580  1.0201e+4  9.7556e+3  1.0217e+4 +- 1.7055e+2  0  5.7571e+8
//   22  top  1   2   2    1910     5113    580    1160  6.9926e+3  6.6882e+3  6.5697e+3 +- 1.8351e+2  0  4.5936e+9
//   22  low  1   2   2     955     5113    580    1160  2.2462e+6  2.3044e+6  2.2094e+6 +- 2.7588e+4  4.2780e+4  1.3526e+11
//   24  top  2   3   2    1782    11113   1086    3258  4.0971e+4  4.1335e+4  4.0167e+4 +- 2.8406e+2  0  9.6319e+9
//   24  top  2   1   2    1782    11113   1086    1086  4.2035e+4  4.1403e+4  4.1928e+4 +- 2.6285e+2  0  3.6114e+9
//   24  top  1   3   2    3564    11113   1086    3258  2.5025e+4  2.3886e+4  2.3995e+4 +- 3.9785e+2  0  4.9396e+10
//   24  low  1   3   2    1782    11113   1086    3258  4.7417e+6  4.9622e+6  4.7228e+6 +- 3.6470e+4  7.5531e+4  1.3409e+12
//   26  top  2   3   2    3326    24154   2019    6057  1.6409e+5  1.6684e+5  1.6067e+5 +- 1.2699e+3  0  6.1991e+10
//   26  top  2   1   2    3326    24154   2019    2019  1.6576e+5  1.6211e+5  1.6486e+5 +- 6.1213e+2  0  2.2667e+10
//   26  top  1   3   2    6652    24154   2019    6057  9.8117e+4  9.7491e+4  9.7055e+4 +- 5.2774e+2  0  3.1865e+11
//   26  low  1   3   2    3326    24154   2019    6057  2.2656e+7  2.3198e+7  2.2418e+7 +- 9.9463e+4  3.1060e+5  9.9968e+12
//   28  top  2   3   2    6208    52498   3772   11316  6.5649e+5  6.6411e+5  6.4439e+5 +- 2.5795e+3  0  3.9904e+11
//   28  top  2   1   2    6208    52498   3772    3772  6.4971e+5  6.5000e+5  6.5260e+5 +- 4.8264e+3  0  1.4232e+11
//   28  top  1   3   2   12416    52498   3772   11316  3.9324e+5  3.9245e+5  3.8809e+5 +- 2.2935e+3  0  2.0558e+12
//   28  low  1   3   2    6208    52498   3772   11316  1.0817e+8  1.0971e+8  1.0632e+8 +- 5.5324e+5  1.2878e+6  7.3804e+13
//   30  top  2   3   2   11585   114104   7045   21135  2.6265e+6  2.6425e+6  2.5895e+6 +- 9.2785e+3  0  2.5676e+12
//   30  top  2   1   2   11585   114104   7045    7045  2.5865e+6  2.5943e+6  2.5860e+6 +- 4.9483e+3  0  8.9366e+11
//   30  top  1   3   2   23170   114104   7045   21135  1.5830e+6  1.5714e+6  1.5512e+6 +- 3.9659e+3  0  1.3258e+13
//   30  low  1   3   2   11585   114104   7045   21135  5.0683e+8  5.1466e+8  4.9943e+8 +- 9.6734e+5  5.2910e+6  5.3984e+14
//
// TABLE 2 — X_small of (21) and the four ordered-pair classes as shares of Mfrak (actual coefficient A1)
//    j  box  g   A  J0   X_small(A1)  X_small(|A1|)  mean|X_small(rnd)|   rms(rnd)  rank  |Xs|/Mfrak   R=0 share   periods   j>J0 share  sieve cancel
//   18  top  2   2   1  1.2476e+1  -2.7383e+1     1.7663e+1  2.2758e+1   5/9     1.70%    97.66%  0 (empty)      0.64%  223.3x
//   18  top  2   1   1  5.9706e+0  -2.0867e+1     1.7869e+1  2.2632e+1   2/9     0.93%    99.62%  0 (empty)     -0.54%  419.4x
//   18  top  1   2   1  CLASS EMPTY (0 ordered pairs with j<=J0)                                          0.00%    96.08%  0 (empty)      3.92%  -
//   18  low  1   2   1  -2.6841e+3  -2.1502e+3     1.7930e+3  2.0180e+3   7/9     2.88%   101.35%  0 (empty)      1.53%  137.1x
//   20  top  2   2   2  -5.6170e+1  -3.1269e+0     4.9625e+1  6.8690e+1   7/9     1.97%   100.72%  0 (empty)      1.25%  176.3x
//   20  top  2   1   2  -6.2734e+1  1.2603e+1     3.2602e+1  3.8338e+1   8/9     2.51%   102.58%  0 (empty)     -0.07%  140.1x
//   20  top  1   2   2  -3.5223e+1  -9.7056e+1     3.8619e+1  4.5630e+1   5/9     2.01%   100.77%  0 (empty)      1.24%  222.3x
//   20  low  1   2   2  8.9228e+3  -3.2127e+3     7.2101e+3  9.2315e+3   6/9     1.87%    98.10%  0 (empty)      0.04%  183.3x
//   22  top  2   2   2  -8.7460e+1  -2.5726e+2     1.0290e+2  1.1652e+2   5/9     0.76%    99.99%  0 (empty)      0.77%  482.6x
//   22  top  2   1   2  4.1716e+0  -3.3853e+2     1.2118e+2  1.3856e+2   1/9     0.04%   100.20%  0 (empty)     -0.24%  9005.0x
//   22  top  1   2   2  -1.4487e+2  -3.2459e+2     1.6337e+2  2.0516e+2   6/9     2.07%   101.12%  0 (empty)      0.96%  229.1x
//   22  low  1   2   2  -2.9883e+4  2.2984e+4     1.7080e+4  2.1191e+4   8/9     1.33%   101.42%  0 (empty)     -0.09%  278.8x
//   24  top  2   3   2  2.1394e+2  6.1840e+2     2.2236e+2  2.4632e+2   6/9     0.52%    99.49%  0 (empty)     -0.02%  736.4x
//   24  top  2   1   2  -7.0618e+0  -3.7162e+2     2.3043e+2  2.5233e+2   1/9     0.02%    99.57%  0 (empty)      0.44%  22937.6x
//   24  top  1   3   2  4.9533e+2  -7.3278e+2     2.3957e+2  2.8023e+2   8/9     1.98%    97.82%  0 (empty)      0.20%  252.7x
//   24  low  1   3   2  -1.7659e+4  1.9170e+5     1.9369e+4  2.3995e+4   6/9     0.37%   100.44%  0 (empty)     -0.06%  1048.6x
//   26  top  2   3   2  6.9576e+2  3.8908e+3     8.5581e+2  1.0362e+3   5/9     0.42%    99.63%  0 (empty)     -0.05%  952.5x
//   26  top  2   1   2  1.1776e+3  -3.1025e+3     6.0521e+2  7.4798e+2   8/9     0.71%    99.75%  0 (empty)     -0.46%  569.6x
//   26  top  1   3   2  1.9849e+1  -6.1772e+2     6.2540e+2  7.1588e+2   1/9     0.02%    99.90%  0 (empty)      0.08%  26201.6x
//   26  low  1   3   2  1.2276e+4  6.0113e+5     1.0617e+5  1.4022e+5   2/9     0.05%   100.34%  0 (empty)     -0.40%  7549.5x
//   28  top  2   3   2  5.1793e+2  4.7708e+3     1.8142e+3  2.1933e+3   3/9     0.08%    99.96%  0 (empty)     -0.04%  5383.8x
//   28  top  2   1   2  -4.0222e+3  -2.8246e+3     3.3869e+3  4.3404e+3   7/9     0.62%   100.52%  0 (empty)      0.10%  690.7x
//   28  top  1   3   2  -6.3190e+2  -3.6992e+3     1.4288e+3  1.7076e+3   4/9     0.16%   100.13%  0 (empty)      0.03%  3476.8x
//   28  low  1   3   2  6.1727e+5  1.7666e+6     3.9718e+5  4.5860e+5   7/9     0.57%    99.52%  0 (empty)     -0.09%  747.0x
//   30  top  2   3   2  -1.1644e+4  5.1029e+3     7.5491e+3  8.5113e+3   8/9     0.44%   100.35%  0 (empty)      0.09%  1005.5x
//   30  top  2   1   2  3.0114e+3  1.3199e+4     4.6759e+3  5.2863e+3   3/9     0.12%    99.86%  0 (empty)      0.03%  3819.9x
//   30  top  1   3   2  2.2917e+3  -1.1430e+4     3.3113e+3  4.3940e+3   5/9     0.14%    99.88%  0 (empty)     -0.02%  4028.0x
//   30  low  1   3   2  4.5448e+5  9.2797e+6     7.5063e+5  1.1253e+6   5/9     0.09%    99.71%  0 (empty)      0.20%  4986.1x
//   rank = position of |X_small(actual)| among itself and the 8 seeded draws, smallest first; 1/9 would mean the actual coefficient is the most cancelled of the nine
//   worst-case double-rounding floor over these rows, relative to |X_small|: 2.48e-7
//
// TABLE 3 — exponent fits and the pre-registered falsifier (primary fit: the points sharing one J0)
//   top box, g=2, band A~x^(3/50); fit over j=20,22,24,26,28,30 (n=6 scales, J0=2)
//     d log2 Mfrak / d log2 x:  actual 0.982   |b| 0.984   random 0.984 +- 0.004   budget 1.388   generic N^3 exponent 1.500
//     d log2 |X_small| / d log2 x:  actual 0.684   random 0.741 +- 0.174   ((21) needs an exponent below 36/25 = 1.440)
//     FALSIFIER, slope of log2(actual/random) per draw:  Mfrak -0.0024 +- 0.0035   X_small -0.0570 +- 0.1741
//     ratio actual/random   Mfrak: 1.027 1.038 1.020 1.021 1.019 1.014
//     ratio actual/random   |X_small|: 1.132 0.850 0.962 0.813 0.285 1.542
//     ratio actual/|b|      Mfrak: 0.995 1.020 0.991 0.984 0.989 0.994   |X_small|: 17.963 0.340 0.346 0.179 0.109 2.282
//     VERDICT: mean slope + sd >= 0 — NO heuristic support for Mobius-sign cancellation in the small-j kernel here
//   top box, g=2, band A=1; fit over j=20,22,24,26,28,30 (n=6 scales, J0=2)
//     d log2 Mfrak / d log2 x:  actual 1.001   |b| 1.001   random 0.998 +- 0.002   budget 1.325   generic N^3 exponent 1.500
//     d log2 |X_small| / d log2 x:  actual 0.929   random 0.720 +- 0.207   ((21) needs an exponent below 36/25 = 1.440)
//     FALSIFIER, slope of log2(actual/random) per draw:  Mfrak 0.0022 +- 0.0021   X_small 0.2088 +- 0.2072
//     ratio actual/random   Mfrak: 0.977 0.998 1.003 1.005 0.996 1.000
//     ratio actual/random   |X_small|: 1.924 0.034 0.031 1.946 1.188 0.644
//     ratio actual/|b|      Mfrak: 0.975 1.046 1.015 1.023 1.000 0.997   |X_small|: 4.978 0.012 0.019 0.380 1.424 0.228
//     VERDICT: mean slope + sd >= 0 — NO heuristic support for Mobius-sign cancellation in the small-j kernel here
//   top box, g=1, band A~x^(3/50); fit over j=20,22,24,26,28,30 (n=6 scales, J0=2)
//     d log2 Mfrak / d log2 x:  actual 0.979   |b| 0.987   random 0.988 +- 0.004   budget 1.426   generic N^3 exponent 1.500
//     d log2 |X_small| / d log2 x:  actual 0.455   random 0.599 +- 0.224   ((21) needs an exponent below 36/25 = 1.440)
//     FALSIFIER, slope of log2(actual/random) per draw:  Mfrak -0.0095 +- 0.0038   X_small -0.1443 +- 0.2237
//     ratio actual/random   Mfrak: 1.080 1.064 1.043 1.011 1.013 1.021
//     ratio actual/random   |X_small|: 0.912 0.887 2.068 0.032 0.442 0.692
//     ratio actual/|b|      Mfrak: 1.053 1.046 1.048 1.006 1.002 1.007   |X_small|: 0.363 0.446 0.676 0.032 0.171 0.200
//     VERDICT: mean slope + sd >= 0 — NO heuristic support for Mobius-sign cancellation in the small-j kernel here
//   low box, g=1, band A~x^(3/50); fit over j=20,22,24,26,28,30 (n=6 scales, J0=2)
//     d log2 Mfrak / d log2 x:  actual 0.990   |b| 0.994   random 0.994 +- 0.002   budget 1.495   generic N^3 exponent 1.500
//     d log2 |X_small| / d log2 x:  actual 0.585   random 0.666 +- 0.302   ((21) needs an exponent below 36/25 = 1.440)
//     FALSIFIER, slope of log2(actual/random) per draw:  Mfrak -0.0043 +- 0.0019   X_small -0.0813 +- 0.3024
//     ratio actual/random   Mfrak: 1.060 1.017 1.004 1.011 1.017 1.015
//     ratio actual/random   |X_small|: 1.238 1.750 0.912 0.116 1.554 0.605
//     ratio actual/|b|      Mfrak: 1.039 0.975 0.956 0.977 0.986 0.985   |X_small|: 2.777 1.300 0.092 0.020 0.349 0.049
//     VERDICT: mean slope + sd >= 0 — NO heuristic support for Mobius-sign cancellation in the small-j kernel here
//
// TABLE 4 — descriptive aggregate over every configuration with a nonempty small-j class
//   (post-hoc summary added after the pre-registered fit in TABLE 3; it is not the pre-registered test)
//   configurations n = 27 (7 dyadic scales x 4 boxes, minus the empty-class row at j=18)
//   mean rank of |X_small(actual)| among the nine values: 5.15   null expectation 5.00, null sd of this mean 0.50
//   configurations with |X_small(actual)| below the median of its 8 draws: 12 of 27 (null expectation 13.5)
//   geometric mean of |X_small(actual)| / mean|X_small(random)|: 0.604
//   geometric mean of |X_small(actual)| / |X_small(|b|)|: 0.316
//   geometric mean of Mfrak(actual) / mean Mfrak(random): 1.0213; 3 of 27 configurations below
//
// artifact: kernel-sign-control.json (7 dyadic scales, 28 configurations, 8 seeded draws each)
// MEASURED ONLY: no power saving, no asymptotic rate and no twin margin follows; (21) and the global margin remain OPEN
// ============================================================================
// READINGS
// ============================================================================
