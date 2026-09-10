#!/usr/bin/env node
// ============================================================================
// centered-discrepancy-measurement.js
//
// FINITE MEASUREMENT of the centered prime-Mobius discrepancy D_y(x) of
// research/moving-cutoff-parity.md (9), and of the two sufficient forms
// (13) and (16) that the note leaves OPEN, at dyadic x = 2^j.
//
//   J = (x/2, x],  y = ceil(x^(12/25)),  Q = floor(x/y),
//   f(n) = Lambda(n-2) mu(n)   (standard von Mangoldt, prime powers kept),
//   M(x) = sum_{n in J} f(n),
//   Delta_e(t) = sum_{x/2<n<=t, e|n} f(n) - (1/phi(e)) sum_{x/2<n<=t} f(n),
//   a_e = max(x/2, e*y),
//   D_y(x) = sum_{e<=Q, e odd} mu(e) * int_{(a_e,x]} log(e/t) dDelta_e(t)
//          = sum_{e odd sqfree <=Q} mu(e) [ sum_{n>e y, e|n} f(n) log(e/n)
//                                     - (1/phi(e)) sum_{n>a_e} f(n) log(e/n) ].
//
// The note's repaired dyadic relation (12) is
//   S(x) = sum_J Lambda(n)Lambda(n-2) = C2 x - 2 C2 M(x) + D_y(x) + O_A(x/log^A x),
// and its OPEN sufficient input (16) is D_y(x) >= -4x/25 + o(x) on unbounded
// dyadic x. The absolute form behind (13) is
//   W1(x) := sum_{e<=Q odd} log(x/e) max_{x/2<=t<=x} |Delta_e(t)|,   |D_y| <= 2 W1,
// so W1 <= 2x/25 also suffices.
//
// THIS IS A MEASUREMENT, NOT A PROOF. Every number is a finite sum at one
// dyadic x. A finite ratio is not an asymptotic rate, and a finite inequality
// holding is not a step toward the margin. What a finite scale CAN do is
// refute a sufficient inequality at that scale, and separate the signed form
// (16) from the absolute form (13) numerically.
//
// DECISION THIS RUN INFORMS: whether lane A of research/RESEARCH-EXECUTION.md
// (an estimate for D_y) should be pursued through an ABSOLUTE, Bombieri-
// Vinogradov-type theorem for the sequence Lambda(n-2)mu(n), or whether any
// proof must exploit sign cancellation ACROSS the moduli e.
//
// PRE-REGISTERED FALSIFIERS (fixed before the first full run; development
// output at j<=30 was seen while sizing; this text predates it):
//   F1. If D_y(2^j)/2^j < -4/25 at any j >= 26, the centered fixed-fraction
//       route (16) is numerically violated at that scale and this is said
//       first. If it holds, the reading is "not refuted at these scales",
//       never "supported".
//   F2. If the grid lower bound W1_grid(2^j)/2^j exceeds 2/25 at every
//       j >= 26 and is non-decreasing in j (strictly as coded, no tolerance;
//       vacuous unless at least three such j exist), the absolute form (13) is
//       numerically implausible: a BV-type absolute theorem for this
//       sequence, even if proved, would not supply (16) by (13), and lane A
//       must aim at the signed sum. W1_grid is a LOWER bound for W1 (max over
//       a 64-point grid in t), so exceeding the threshold is decisive in
//       that direction only.
//   F3. Identity (12): the residual r(x) = (S - C2 x + 2 C2 M - D_y)/x must
//       tend to 0. Its pieces are printed: (T1 - C2 x)/x from the BV and
//       Mobius-mean step (6), (P + 2 C2 M)/x from the density step (11),
//       and the two exact prime-power / even-e errors. If |r| does not fall
//       with j, the derivation is flagged, not the data.
//   F4. Real D_y and W1 are compared with 4 seeded random-sign controls
//       (mu(n) replaced by +-1 on the same support, mu(e) kept). A real
//       D_y at the control's size means no detectable arithmetic structure
//       at these scales.
//
// CONTROLS AND EXACT CHECKS, all computed and printed:
//   (i)   exact algebra S = T1 + T2 + E_pp with every term enumerated
//         separately from the same factor lists (must hold to fp precision);
//   (ii)  E_even is accumulated separately from the even e, and the
//         enumeration must satisfy T2 = acc1 + E_even exactly. D_y itself is
//         formed as acc1 - P, i.e. THROUGH equation (10); the only check of
//         D_y against the definition (9) independent of that identity is
//         control (iii) below;
//   (iii) at j in {16,18,20} an independent naive implementation directly
//         from (9) with per-modulus loops and the EXACT max over all t must
//         reproduce D_y to fp precision, and gives the ratio W1_grid/W1_exact
//         so the grid's undercount is known;
//   (iv)  the 4 random-sign draws' mean D_y must sit within a few sd of 0;
//   (v)   shift 4 in place of shift 2 (f(n)=Lambda(n-4)mu(n)) must give a
//         different D_y (different sequence, same machinery).
// ============================================================================

'use strict';
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { fork } = require('node:child_process');

// ------------------------------------------------------------------ config --
const JMIN = 16;
const JMAX = Number(process.argv.slice(2).find(a => /^\d+$/.test(a)) || 36);
const SEGLG = 22;
const GRID = 64;
const SEEDS = 4;
const SEED = 0xd15c0de;
const NAIVE_J = [16, 18, 20];
const C2 = 0.6601618158468695739;   // prod_{p>2} (1 - 1/(p-1)^2)
const A2 = 0.7479116272384044;      // prod_{p>2} (1 - 1/(p(p-1))) = 2 * Artin's constant; for the M bound only
const THETA_Y = 12 / 25;
const WORKERS = Math.max(1, Math.min(8, os.cpus().length - 2));

// ------------------------------------------------------------------ sieves --
function basePrimes(N) {
  const s = new Uint8Array(N + 1), out = [];
  for (let i = 2; i <= N; i++) { if (!s[i]) { out.push(i); for (let j = i * i; j <= N; j += i) s[j] = 1; } }
  return out;
}
function h32(z) {
  z = (z + 0x9E3779B9) | 0;
  z = Math.imul(z ^ (z >>> 16), 0x21f0aaad);
  z = Math.imul(z ^ (z >>> 15), 0x735a2d97);
  return (z ^ (z >>> 15)) >>> 0;
}
function acc() { return { s: 0, c: 0 }; }
function addTo(a, v) {
  const t = a.s + v;
  a.c += Math.abs(a.s) >= Math.abs(v) ? (a.s - t) + v : (v - t) + a.s;
  a.s = t;
}
const val = a => a.s + a.c;

function params(j) {
  const x = Math.pow(2, j);
  const y = Math.ceil(Math.pow(2, THETA_Y * j));
  const Q = Math.floor(x / y);
  return { x, y, Q };
}
// phi, mu, log for e <= Q
function smallTables(Q) {
  const phi = new Int32Array(Q + 1), mu = new Int8Array(Q + 1), lg = new Float64Array(Q + 1);
  for (let i = 0; i <= Q; i++) { phi[i] = i; mu[i] = 1; lg[i] = i > 0 ? Math.log(i) : 0; }
  const sq = new Uint8Array(Q + 1);
  for (let p = 2; p <= Q; p++) {
    if (phi[p] !== p) continue;                  // p prime
    for (let k = p; k <= Q; k += p) { phi[k] -= phi[k] / p; mu[k] = -mu[k]; }
    const pp = p * p; if (pp <= Q) for (let k = pp; k <= Q; k += pp) sq[k] = 1;
  }
  for (let i = 0; i <= Q; i++) if (sq[i]) mu[i] = 0;
  return { phi, mu, lg };
}

// ------------------------------------------------- the measurement at one j --
// shift: 2 (the object) or 4 (control v). Returns everything for the parent.
function measure(j, shift) {
  const t0 = Date.now();
  const { x, y, Q } = params(j);
  const nlo = x / 2 + 1, nhi = x;
  const sqx = Math.floor(Math.sqrt(x)) + 1;
  const primes = basePrimes(sqx);
  const { phi, mu: muE, lg: logE } = smallTables(Q);
  const SEG = Math.min(1 << SEGLG, nhi - nlo + 1);
  const MAXF = 14;

  // per-segment buffers. base b = a - shift, positions i -> b + i, i in [0, len+shift)
  const lam = new Float64Array(SEG + 8);        // Lambda(b+i)
  const comp = new Uint8Array(SEG + 8);
  const rem = new Float64Array(SEG + 8);        // unremoved cofactor of n = b+i
  const sqf = new Uint8Array(SEG + 8);          // 1 if a square divides n
  const active = new Uint8Array(SEG + 8);       // Lambda(n-shift) != 0 at n = b+i
  const actIdx = new Int32Array(SEG + 8);
  const facCnt = new Uint8Array(SEG + 8);
  let fac = new Float64Array(Math.ceil(SEG / 4) * MAXF); // compact, indexed by actIdx; grown on demand
  const nprimeLog = primes.map(Math.log);

  // accumulators (real + seeds)
  const NS = 1 + SEEDS;
  const acc1 = Array.from({ length: NS }, acc);     // odd-e divisor part of T2
  const Msum = Array.from({ length: NS }, acc);     // M
  const T1 = acc(), T2all = acc(), Epp = acc(), S = acc(), absF = acc(), Eev = acc();
  let countActive = 0, countSupport = 0;
  const cumF = Array.from({ length: NS }, () => new Float64Array(Q + 1));  // cumulative F through n = e*y
  const cumG = Array.from({ length: NS }, () => new Float64Array(Q + 1));  // cumulative sum f log n
  const seen = new Uint8Array(Q + 1);
  const Fgrid = new Float64Array(GRID * NS);                 // [bk*NS + s]
  const Agrid = new Float64Array((Q + 1) * GRID * NS);        // [(e*GRID + bk)*NS + s]
  const runF = new Float64Array(NS), runG = new Float64Array(NS);
  const stE = new Float64Array(MAXF + 2), stSg = new Int8Array(MAXF + 2), stOdd = new Uint8Array(MAXF + 2), stT = new Int32Array(MAXF + 2);
  const sgn = new Float64Array(NS);                           // per-n sign vector (real, seeds)
  const half = x / 2, bucketScale = GRID / half;

  for (let a = nlo; a <= nhi; a += SEG) {
    const len = Math.min(SEG, nhi - a + 1);
    const b = a - shift, blen = len + shift, hi = b + blen - 1;
    // --- Lambda on [b, hi] : all numbers here exceed sqrt(x)
    comp.fill(0, 0, blen); lam.fill(0, 0, blen);
    for (let pi = 0; pi < primes.length; pi++) {
      const p = primes[pi];
      if (p * p > hi) break;
      let st = b % p; st = st === 0 ? 0 : p - st;
      for (let i = st; i < blen; i += p) comp[i] = 1;
    }
    for (let i = 0; i < blen; i++) if (!comp[i]) lam[i] = Math.log(b + i);
    for (let pi = 0; pi < primes.length; pi++) {
      const p = primes[pi]; let pk = p * p;
      if (pk > hi) break;
      while (pk < b) pk *= p;
      while (pk <= hi) { lam[pk - b] = nprimeLog[pi]; pk *= p; }
    }
    // --- factor lists for active n = a + i  (positions i+shift in the b-frame)
    let na = 0;
    for (let i = 0; i < len; i++) {
      const L2 = lam[i];                      // Lambda(n - shift), n = a + i
      if (L2 !== 0) { active[i] = 1; actIdx[i] = na++; } else active[i] = 0;
    }
    countActive += na;
    if (na * MAXF > fac.length) fac = new Float64Array(na * MAXF);
    for (let i = 0; i < len; i++) { rem[i] = a + i; sqf[i] = 0; }
    facCnt.fill(0, 0, na);
    for (let pi = 0; pi < primes.length; pi++) {
      const p = primes[pi];
      let st = a % p; st = st === 0 ? 0 : p - st;
      for (let i = st; i < len; i += p) {
        if (!active[i]) continue;
        rem[i] /= p;
        const k = actIdx[i]; fac[k * MAXF + facCnt[k]++] = p;
      }
      const pp = p * p; if (pp > nhi) continue;
      let s2 = a % pp; s2 = s2 === 0 ? 0 : pp - s2;
      for (let i = s2; i < len; i += pp) sqf[i] = 1;
    }
    // --- main pass, n increasing
    const aLow = (a % 4294967296) >>> 0, aHi = Math.floor(a / 4294967296);
    const hiMix = Math.imul(aHi, 0x9E3779B1) | 0;
    let lS = 0, lEpp = 0, lT1 = 0, lT2 = 0, lAbs = 0, lEv = 0;
    const l1 = new Float64Array(NS), lM = new Float64Array(NS);
    for (let i = 0; i < len; i++) {
      const n = a + i;
      const L2 = lam[i];
      if (L2 !== 0) {
        const Ln = lam[i + shift];
        if (Ln !== 0) { lS += Ln * L2; if (sqf[i]) lEpp += Ln * L2; }
      }
      if (L2 !== 0 && !sqf[i]) {
        const k = actIdx[i];
        let nf = facCnt[k];
        if (rem[i] > 1) fac[k * MAXF + nf++] = rem[i];   // one large prime > sqrt(x)
        const mun = (nf & 1) ? -1 : 1;
        const f = mun * L2;
        const logn = Math.log(n);
        const h = h32((((aLow + i) >>> 0) ^ hiMix ^ SEED) | 0);
        lM[0] += f; lAbs += L2; countSupport++;
        for (let s = 1; s < NS; s++) lM[s] += ((h >>> (s - 1)) & 1) ? f : -f;
        runF[0] += f; runG[0] += f * logn;
        for (let s = 1; s < NS; s++) { const fs_ = ((h >>> (s - 1)) & 1) ? f : -f; runF[s] += fs_; runG[s] += fs_ * logn; }
        const bk = Math.min(GRID - 1, Math.floor((n - nlo) * bucketScale));
        sgn[0] = 1; for (let s = 1; s < NS; s++) sgn[s] = ((h >>> (s - 1)) & 1) ? 1 : -1;
        for (let s = 0; s < NS; s++) Fgrid[bk * NS + s] += sgn[s] * f;
        // divisor enumeration over subsets of the prime factor list (ascending).
        // e = product, sg = mu(e). Three consumers:
        //   all d <= y           : T1 += Lambda(n-2) mu^2(n) * (-mu(d) log d)
        //   all e with e*y < n   : T2 += f mu(e) log(e/n); odd part -> acc1
        //   odd e <= Q           : Agrid
        const base = k * MAXF;
        const limE = (n - 1) / y;                     // e*y < n  <=>  e <= (n-1)/y  (< Q)
        let sp = 0; stE[0] = 1; stSg[0] = 1; stOdd[0] = 1; stT[0] = 0;
        // visit e = 1: T1 gets 0 (log 1 = 0); T2 and acc1 get f*log(1/n) since
        // 1*y < n always holds here; Agrid gets the e=1 row
        { const w = -f * logn; lT2 += w; for (let s = 0; s < NS; s++) { l1[s] += sgn[s] * w; Agrid[(GRID + bk) * NS + s] += sgn[s] * f; } }
        while (sp >= 0) {
          const t = stT[sp];
          if (t >= nf) { sp--; continue; }
          stT[sp] = t + 1;
          const p = fac[base + t];
          const e2 = stE[sp] * p;
          if (e2 > Q) { sp--; continue; }             // later p are larger: whole level done
          const odd2 = stOdd[sp] && p !== 2 ? 1 : 0;
          if (!odd2 && e2 > y && e2 > limE) continue; // even and beyond T1/T2 bounds: useless, as are supersets
          const sg2 = -stSg[sp];
          const loge = Math.log(e2);
          if (e2 <= y) lT1 += -sg2 * loge * L2;
          if (e2 <= limE) {
            const w = f * sg2 * (loge - logn);
            lT2 += w;
            if (odd2) for (let s = 0; s < NS; s++) l1[s] += sgn[s] * w; else lEv += w;
          }
          if (odd2) { const o = (e2 * GRID + bk) * NS; for (let s = 0; s < NS; s++) Agrid[o + s] += sgn[s] * f; }
          sp++; stE[sp] = e2; stSg[sp] = sg2; stOdd[sp] = odd2; stT[sp] = t + 1;
        }
      }
      // thresholds n = e*y  (record cumulative through n inclusive)
      if (n % y === 0) {
        const e = n / y;
        if (e <= Q && !seen[e]) {
          seen[e] = 1;
          for (let s = 0; s < NS; s++) { cumF[s][e] = runF[s]; cumG[s][e] = runG[s]; }
        }
      }
    }
    addTo(S, lS); addTo(Epp, lEpp); addTo(T1, lT1); addTo(T2all, lT2); addTo(absF, lAbs); addTo(Eev, lEv);
    for (let s = 0; s < NS; s++) { addTo(acc1[s], l1[s]); addTo(Msum[s], lM[s]); }
  }

  // --- density term P = sum_e mu(e)/phi(e) * sum_{n > a_e} f(n)(log e - log n)
  const eMin = Math.ceil(half / y);   // e*y > x/2 from here on; below, tail = total
  const P = new Float64Array(NS), D = new Float64Array(NS), Mv = new Float64Array(NS);
  for (let s = 0; s < NS; s++) Mv[s] = val(Msum[s]);
  const totalF = runF.slice(), totalG = runG.slice();
  for (let e = 1; e <= Q; e += 2) {
    if (muE[e] === 0) continue;
    const c = muE[e] / phi[e];
    for (let s = 0; s < NS; s++) {
      let TF, TG;
      if (e < eMin || !seen[e]) { TF = totalF[s]; TG = totalG[s]; }
      else { TF = totalF[s] - cumF[s][e]; TG = totalG[s] - cumG[s][e]; }
      P[s] += c * (logE[e] * TF - TG);
    }
  }
  for (let s = 0; s < NS; s++) D[s] = val(acc1[s]) - P[s];
  const Eeven = val(Eev);

  // --- grid discrepancies: W1_grid, endpoint sum, per-e maxima
  const W1 = new Float64Array(NS), Wend = new Float64Array(NS), Wmax0 = new Float64Array(NS);
  const Fpre = new Float64Array(GRID * NS);
  for (let s = 0; s < NS; s++) { let r = 0; for (let k = 0; k < GRID; k++) { r += Fgrid[k * NS + s]; Fpre[k * NS + s] = r; } }
  let nE = 0;
  const run = new Float64Array(NS), mxv = new Float64Array(NS), lastv = new Float64Array(NS);
  for (let e = 1; e <= Q; e += 2) {
    if (muE[e] === 0) continue;
    nE++;
    const w = Math.log(x / e), ip = 1 / phi[e];
    run.fill(0); mxv.fill(0);
    for (let k = 0; k < GRID; k++) {
      const o = (e * GRID + k) * NS, q = k * NS;
      for (let s = 0; s < NS; s++) { run[s] += Agrid[o + s]; const d = run[s] - Fpre[q + s] * ip; lastv[s] = d; const m = Math.abs(d); if (m > mxv[s]) mxv[s] = m; }
    }
    for (let s = 0; s < NS; s++) { W1[s] += w * mxv[s]; Wend[s] += w * Math.abs(lastv[s]); if (mxv[s] > Wmax0[s]) Wmax0[s] = mxv[s]; }
  }
  return {
    j, shift, x, y, Q, nOddSqfE: nE, countActive, countSupport,
    S: val(S), T1: val(T1), T2: val(T2all), Epp: val(Epp), Eeven, absF: val(absF),
    M: Mv[0], acc1: val(acc1[0]), P: P[0], D: D[0], W1: W1[0], Wend: Wend[0], Wmax: Wmax0[0],
    seeds: Array.from({ length: SEEDS }, (_, s) => ({ M: Mv[s + 1], D: D[s + 1], W1: W1[s + 1], Wend: Wend[s + 1] })),
    seconds: (Date.now() - t0) / 1000,
  };
}

// ------------------------------------------------ naive reimplementation --
// Directly from (9): full arrays, per-modulus loops, exact max over ALL t.
function naive(j) {
  const t0 = Date.now();
  const { x, y, Q } = params(j);
  const N = x;
  const lam = new Float64Array(N + 1), mu = new Int8Array(N + 1).fill(1), spf = new Int32Array(N + 1);
  const sq = new Uint8Array(N + 1);
  for (let p = 2; p <= N; p++) {
    if (spf[p]) continue;
    for (let k = p; k <= N; k += p) { if (!spf[k]) spf[k] = p; mu[k] = -mu[k]; }
    for (let k = p * p; k <= N; k += p * p) sq[k] = 1;
    let pk = p; while (pk <= N) { lam[pk] = Math.log(p); pk *= p; }
  }
  for (let i = 0; i <= N; i++) if (sq[i]) mu[i] = 0;
  const { phi, mu: muE } = smallTables(Q);
  const f = new Float64Array(N + 1);
  for (let n = x / 2 + 1; n <= x; n++) f[n] = lam[n - 2] * mu[n];
  // prefix F
  const F = new Float64Array(N + 1); let r = 0;
  for (let n = x / 2 + 1; n <= x; n++) { r += f[n]; F[n] = r; }
  let D = 0, W1exact = 0, M = r;
  for (let e = 1; e <= Q; e += 2) {
    if (muE[e] === 0) continue;
    const ae = Math.max(x / 2, e * y);
    let integral = 0, A = 0, mx = 0;
    for (let n = x / 2 + 1; n <= x; n++) {
      if (n % e === 0) A += f[n];
      const del = A - F[n] / phi[e];
      if (Math.abs(del) > mx) mx = Math.abs(del);
      if (n > ae) {
        const jump = (n % e === 0 ? f[n] : 0) - f[n] / phi[e];
        integral += Math.log(e / n) * jump;
      }
    }
    D += muE[e] * integral;
    W1exact += Math.log(x / e) * mx;
  }
  return { j, D, M, W1exact, seconds: (Date.now() - t0) / 1000 };
}

// ------------------------------------------------------------------ driver --
if (process.argv.includes('--worker')) {
  const j = Number(process.argv[process.argv.indexOf('--worker') + 1]);
  const shift = Number(process.argv[process.argv.indexOf('--shift') + 1] || 2);
  const res = measure(j, shift);
  process.send(res, () => process.exit(0));
} else main();

function main() {
const T0 = Date.now();
const jobs = [];
for (let j = JMAX; j >= JMIN; j--) jobs.push({ j, shift: 2 });
for (const j of [20, 24, 28]) if (j <= JMAX) jobs.push({ j, shift: 4 });
const results = [];
let running = 0, next = 0;
function launch() {
  while (running < WORKERS && next < jobs.length) {
    const job = jobs[next++]; running++;
    const child = fork(__filename, ['--worker', String(job.j), '--shift', String(job.shift)], { stdio: ['ignore', 'ignore', 'inherit', 'ipc'] });
    child.on('message', m => results.push(m));
    child.on('exit', code => { running--; if (code !== 0) { console.error(`worker j=${job.j} shift=${job.shift} exited ${code}`); process.exitCode = 1; } if (next < jobs.length) launch(); else if (running === 0) finish(); });
  }
}
function finish() {
  results.sort((u, v) => (u.shift - v.shift) || (u.j - v.j));
  const naives = NAIVE_J.filter(j => j <= JMAX).map(naive);
  const F = (v, d = 6) => (v === null || v === undefined || Number.isNaN(v)) ? 'n/a' : (Math.abs(v) >= 1e6 || (Math.abs(v) < 1e-4 && v !== 0)) ? v.toExponential(d - 1) : v.toFixed(d);
  const out = [];
  out.push(`scope: FINITE MEASUREMENT of D_y(x), M(x), W1(x) of moving-cutoff-parity (9),(13),(16) at x=2^j; no asymptotic estimate is proved or supported`);
  out.push(`config: j=${JMIN}..${JMAX}, y=ceil(x^(12/25)), Q=floor(x/y), seglen=2^${SEGLG}, grid=${GRID}, seeds=${SEEDS}, seed=0x${SEED.toString(16)}, C2=${C2}, workers=${WORKERS}`);
  out.push(`thresholds: F1 needs D_y/x >= -4/25 = -0.16 ; F2 absolute form needs W1/x <= 2/25 = 0.08 ; M bound A2/2 = ${(A2 / 2).toFixed(4)}`);
  out.push('');
  out.push('MAIN TABLE (shift 2)  j | x | y | Q | #odd sqfree e | support n | M/x | D_y/x | acc1/x | P/x | W1grid/x | Wend/x | max_e maxΔ/x | sec');
  const main = results.filter(r => r.shift === 2);
  for (const r of main) {
    out.push([r.j, r.x, r.y, r.Q, r.nOddSqfE, r.countSupport, F(r.M / r.x), F(r.D / r.x), F(r.acc1 / r.x), F(r.P / r.x),
      F(r.W1 / r.x), F(r.Wend / r.x), F(r.Wmax / r.x), r.seconds.toFixed(1)].join(' | '));
  }
  out.push('');
  out.push('IDENTITY (12) PIECES  j | S/x | T1/x - C2 | (P + 2 C2 M)/x | Epp/x | Eeven/x | r(x) = (S - C2 x + 2 C2 M - D_y)/x | exact S-T1-T2-Epp | exact T2-acc1-Eeven');
  for (const r of main) {
    out.push([r.j, F(r.S / r.x), F(r.T1 / r.x - C2), F((r.P + 2 * C2 * r.M) / r.x), F(r.Epp / r.x, 8), F(r.Eeven / r.x, 8),
      F((r.S - C2 * r.x + 2 * C2 * r.M - r.D) / r.x), F(r.S - r.T1 - r.T2 - r.Epp, 3), F(r.T2 - r.acc1 - r.Eeven, 3)].join(' | '));
  }
  out.push('');
  out.push('RANDOM-SIGN CONTROL (mu(n) -> +-1 on the same support, mu(e) kept)  j | real D_y/x | ctrl D_y/x mean | ctrl sd | |real|/ctrl rms | real W1/x | ctrl W1/x mean | real Wend/x | ctrl Wend/x mean | real M/x | ctrl M/x rms');
  for (const r of main) {
    const ds = r.seeds.map(s => s.D / r.x), ws = r.seeds.map(s => s.W1 / r.x), es = r.seeds.map(s => s.Wend / r.x), ms = r.seeds.map(s => s.M / r.x);
    const mean = v => v.reduce((u, w) => u + w, 0) / v.length;
    const rms = v => Math.sqrt(v.reduce((u, w) => u + w * w, 0) / v.length);
    const sd = v => { const m = mean(v); return Math.sqrt(v.reduce((u, w) => u + (w - m) ** 2, 0) / (v.length - 1)); };
    out.push([r.j, F(r.D / r.x), F(mean(ds)), F(sd(ds)), F(Math.abs(r.D / r.x) / rms(ds), 3), F(r.W1 / r.x), F(mean(ws)), F(r.Wend / r.x), F(mean(es)), F(r.M / r.x), F(rms(ms))].join(' | '));
  }
  out.push('');
  out.push('SHIFT-4 CONTROL (v)  j | D_y/x shift2 | D_y/x shift4 | differs | M/x shift4');
  for (const r4 of results.filter(r => r.shift === 4)) {
    const r2 = main.find(r => r.j === r4.j);
    out.push([r4.j, F(r2.D / r2.x), F(r4.D / r4.x), Math.abs(r2.D - r4.D) > 1e-6 * r4.x ? 'yes' : 'NO', F(r4.M / r4.x)].join(' | '));
  }
  out.push('');
  out.push('NAIVE REIMPLEMENTATION (iii)  j | D_y segmented | D_y naive | rel diff | M seg | M naive | W1grid | W1exact | grid/exact | sec');
  for (const nv of naives) {
    const r = main.find(q => q.j === nv.j);
    out.push([nv.j, F(r.D, 4), F(nv.D, 4), F(Math.abs(r.D - nv.D) / Math.max(1, Math.abs(nv.D)), 3), F(r.M, 2), F(nv.M, 2),
      F(r.W1, 2), F(nv.W1exact, 2), F(r.W1 / nv.W1exact, 4), nv.seconds.toFixed(1)].join(' | '));
  }
  out.push('');
  // slopes
  const fit = (pts) => { const n = pts.length; if (n < 3) return null; const mx = pts.reduce((u, p) => u + p[0], 0) / n, my = pts.reduce((u, p) => u + p[1], 0) / n; let sxx = 0, sxy = 0; for (const [u, v] of pts) { sxx += (u - mx) ** 2; sxy += (u - mx) * (v - my); } return sxy / sxx; };
  const big = main.filter(r => r.j >= 26);
  const sD = fit(big.filter(r => r.D !== 0).map(r => [r.j * Math.LN2, Math.log(Math.abs(r.D))]));
  const sW = fit(big.map(r => [r.j * Math.LN2, Math.log(r.W1)]));
  const sDc = fit(big.map(r => [r.j * Math.LN2, Math.log(Math.sqrt(r.seeds.reduce((u, s) => u + s.D * s.D, 0) / SEEDS))]));
  const sWc = fit(big.map(r => [r.j * Math.LN2, Math.log(r.seeds.reduce((u, s) => u + s.W1, 0) / SEEDS)]));
  out.push(`SLOPES over j>=26 (d log|.| / d log x): |D_y| real ${F(sD, 3)} vs control rms ${F(sDc, 3)} ; W1grid real ${F(sW, 3)} vs control ${F(sWc, 3)} ; (x itself has slope 1, sqrt(x) 0.5)`);
  const f1 = big.filter(r => r.D / r.x < -4 / 25).map(r => r.j);
  const f2 = big.length >= 3 && big.every(r => r.W1 / r.x > 2 / 25) && big.every((r, i) => i === 0 || r.W1 / r.x >= big[i - 1].W1 / big[i - 1].x);
  const ctlMeanOk = main.every(r => { const ds = r.seeds.map(s => s.D); const m = ds.reduce((u, v) => u + v, 0) / SEEDS; const sd = Math.sqrt(ds.reduce((u, v) => u + (v - m) ** 2, 0) / (SEEDS - 1)); return Math.abs(m) <= 4 * sd / Math.sqrt(SEEDS) + 1e-9; });
  const exactOk = main.every(r => Math.abs(r.S - r.T1 - r.T2 - r.Epp) < 1e-6 * r.x && Math.abs(r.T2 - r.acc1 - r.Eeven) < 1e-6 * r.x);
  const naiveOk = naives.every(nv => { const r = main.find(q => q.j === nv.j); return Math.abs(r.D - nv.D) < 1e-6 * Math.max(1, Math.abs(nv.D)) && Math.abs(r.M - nv.M) < 1e-6; });
  const shift4Ok = results.filter(r => r.shift === 4).every(r4 => { const r2 = main.find(r => r.j === r4.j); return Math.abs(r2.D - r4.D) > 1e-6 * r4.x; });
  out.push(`FALSIFIERS: F1 D_y/x < -0.16 at j>=26: ${f1.length ? 'YES at j=' + f1.join(',') : 'no'} ; F2 W1grid/x > 0.08 at all j>=26 and non-decreasing: ${f2 ? 'YES' : 'no'}`);
  out.push(`CONTROLS: exactAlgebra=${exactOk}; naiveMatches=${naiveOk}; ctrlMeanWithin4se=${ctlMeanOk}; shift4Differs=${shift4Ok}`);
  out.push(`runtime: ${((Date.now() - T0) / 1000).toFixed(1)} s total`);
  console.log(out.join('\n'));
  fs.writeFileSync(path.join(__dirname, 'centered-discrepancy-measurement.json'),
    JSON.stringify({ schema: 1, scope: 'Finite measurement of the centered prime-Mobius discrepancy D_y and its absolute form; no asymptotic estimate.', config: { JMIN, JMAX, SEGLG, GRID, SEEDS, SEED, C2, THETA_Y, NAIVE_J }, rows: results, naives, totalSeconds: (Date.now() - T0) / 1000 }, null, 2) + '\n');
}
launch();
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/centered-discrepancy-measurement.js -- 38
//   invocation:  node research/centered-discrepancy-measurement.js 38
//   code-sha256: 9cf46c46fd3fbf80ed3fe6d216eeeae3b8a47bfd2e6cfc7f1e1ad49f697dd43e
//   out-sha256:  40458c50729944df9625609398c41a16fa4d0632b8d22c48588fe408de4f5b65
//   body-lines:  93
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-07
//   elapsed:     8223.5 s
// ============================================================================
// scope: FINITE MEASUREMENT of D_y(x), M(x), W1(x) of moving-cutoff-parity (9),(13),(16) at x=2^j; no asymptotic estimate is proved or supported
// config: j=16..38, y=ceil(x^(12/25)), Q=floor(x/y), seglen=2^22, grid=64, seeds=4, seed=0xd15c0de, C2=0.6601618158468696, workers=8
// thresholds: F1 needs D_y/x >= -4/25 = -0.16 ; F2 absolute form needs W1/x <= 2/25 = 0.08 ; M bound A2/2 = 0.3740
//
// MAIN TABLE (shift 2)  j | x | y | Q | #odd sqfree e | support n | M/x | D_y/x | acc1/x | P/x | W1grid/x | Wend/x | max_e maxΔ/x | sec
// 16 | 65536 | 206 | 318 | 130 | 2294 | 0.014472 | -0.016647 | -0.033685 | -0.017039 | 0.863753 | 0.565540 | 0.007042 | 0.0
// 17 | 131072 | 287 | 456 | 186 | 4283 | -0.008630 | -0.039617 | -0.028807 | 0.010810 | 0.753470 | 0.486210 | 0.004703 | 0.1
// 18 | 262144 | 399 | 657 | 266 | 8067 | -0.001828 | -0.030072 | -0.028065 | 0.002007 | 0.736486 | 0.502722 | 0.003262 | 0.1
// 19 | 524288 | 557 | 941 | 381 | 15264 | -0.000402 | -0.003985 | -0.003213 | 0.000772 | 0.618895 | 0.413588 | 0.002751 | 0.1
// 20 | 1048576 | 777 | 1349 | 549 | 28939 | -0.001435 | -0.014966 | -0.013213 | 0.001753 | 0.607388 | 0.408963 | 0.001406 | 0.1
// 21 | 2097152 | 1083 | 1936 | 783 | 55126 | -0.002811 | 0.009566 | 0.013206 | 0.003640 | 0.521856 | 0.333632 | 0.000873 | 0.2
// 22 | 4194304 | 1510 | 2777 | 1126 | 105028 | -0.000447 | 0.009354 | 0.009927 | 0.000573 | 0.481018 | 0.318348 | 0.000694 | 0.2
// 23 | 8388608 | 2106 | 3983 | 1616 | 200821 | -0.000200 | 0.000935 | 0.001200 | 0.000265 | 0.455906 | 0.303879 | 0.000637 | 0.7
// 24 | 16777216 | 2937 | 5712 | 2315 | 384170 | -0.001103 | -0.010634 | -0.009182 | 0.001452 | 0.407205 | 0.261048 | 0.000346 | 1.4
// 25 | 33554432 | 4096 | 8192 | 3321 | 737682 | 0.000159 | -0.009726 | -0.009944 | -0.000218 | 0.358757 | 0.236409 | 0.000349 | 1.5
// 26 | 67108864 | 5713 | 11746 | 4758 | 1416852 | 0.000226 | -0.003430 | -0.003730 | -0.000300 | 0.322294 | 0.206677 | 0.000124 | 2.6
// 27 | 134217728 | 7968 | 16844 | 6827 | 2726991 | -0.000106 | -0.004283 | -0.004145 | 0.000138 | 0.291870 | 0.189238 | 0.000133 | 3.3
// 28 | 268435456 | 11114 | 24152 | 9793 | 5255741 | -0.000116 | -0.001090 | -0.000936 | 0.000154 | 0.261337 | 0.169290 | 0.000225 | 6.8
// 29 | 536870912 | 15501 | 34634 | 14034 | 10144176 | -8.81544e-5 | -0.003992 | -0.003877 | 0.000114 | 0.235037 | 0.152151 | 9.15179e-5 | 13.0
// 30 | 1073741824 | 21619 | 49666 | 20132 | 19601413 | 6.69207e-5 | -0.000265 | -0.000354 | -8.86166e-5 | 0.208028 | 0.134617 | 5.67213e-5 | 33.5
// 31 | 2147483648 | 30153 | 71219 | 28867 | 37917363 | 1.53190e-5 | 0.002449 | 0.002428 | -2.05950e-5 | 0.185224 | 0.121984 | 5.44092e-5 | 83.0
// 32 | 4294967296 | 42056 | 102124 | 41392 | 73432988 | -5.66459e-5 | -0.001258 | -0.001183 | 7.43898e-5 | 0.163222 | 0.106898 | 2.75341e-5 | 192.0
// 33 | 8589934592 | 58657 | 146443 | 59354 | 142355174 | -4.46298e-5 | -0.004180 | -0.004122 | 5.86248e-5 | 0.144735 | 0.095232 | 1.75449e-5 | 358.0
// 34 | 17179869184 | 81811 | 209994 | 85104 | 276219080 | -2.54129e-5 | -0.000899 | -0.000866 | 3.33896e-5 | 0.127406 | 0.083277 | 8.24765e-6 | 627.5
// 35 | 34359738368 | 114105 | 301123 | 122040 | 536461069 | -2.87056e-5 | 0.001132 | 0.001170 | 3.78093e-5 | 0.113108 | 0.074340 | 8.37379e-6 | 1145.5
// 36 | 68719476736 | 159147 | 431798 | 174991 | 1042733073 | 5.99327e-6 | -0.001193 | -0.001201 | -7.86882e-6 | 0.099652 | 0.065541 | 4.44777e-6 | 2168.4
// 37 | 137438953472 | 221970 | 619178 | 250949 | 2028428142 | 3.09755e-7 | -0.000406 | -0.000406 | -4.08769e-7 | 0.087830 | 0.057870 | 3.47104e-6 | 4224.1
// 38 | 274877906944 | 309591 | 887874 | 359847 | 3948794345 | -3.27538e-6 | 0.001476 | 0.001480 | 4.33565e-6 | 0.077347 | 0.050998 | 3.68381e-6 | 8221.1
//
// IDENTITY (12) PIECES  j | S/x | T1/x - C2 | (P + 2 C2 M)/x | Epp/x | Eeven/x | r(x) = (S - C2 x + 2 C2 M - D_y)/x | exact S-T1-T2-Epp | exact T2-acc1-Eeven
// 16 | 0.633497 | 0.002043 | 0.002069 | 0.00502714 | -4.9999627e-5 | 0.009089 | 2.50e-12 | -6.74e-13
// 17 | 0.671253 | 0.037387 | -0.000585 | 0.00251102 | 0.00000000 | 0.039313 | -2.03e-11 | 0.000
// 18 | 0.652028 | 0.018474 | -0.000406 | 0.00142757 | 2.9324565e-5 | 0.019525 | -3.07e-10 | -4.22e-12
// 19 | 0.654254 | -0.004110 | 0.000241 | 0.00141705 | -1.4524460e-6 | -0.002454 | -1.50e-9 | 4.57e-12
// 20 | 0.664244 | 0.016192 | -0.000142 | 0.00109761 | 6.2102696e-6 | 0.017153 | -2.06e-9 | -2.06e-11
// 21 | 0.674757 | 0.000661 | -7.23984e-5 | 0.00072799 | -3.6311150e-7 | 0.001317 | 1.32e-8 | -8.86e-13
// 22 | 0.665499 | -0.005059 | -1.77236e-5 | 0.00046933 | -4.6821447e-7 | -0.004608 | 8.56e-8 | -6.87e-12
// 23 | 0.660099 | -0.001634 | 1.80149e-6 | 0.00037089 | 0.00000000 | -0.001261 | -1.81e-7 | 0.000
// 24 | 0.661155 | 0.009946 | -4.84354e-6 | 0.00022956 | -3.1630043e-7 | 0.010170 | -8.20e-8 | -1.41e-10
// 25 | 0.659361 | 0.008975 | -8.13777e-6 | 0.00016781 | -2.2694469e-8 | 0.009135 | 8.56e-8 | 3.55e-11
// 26 | 0.658944 | 0.002409 | -1.06582e-6 | 0.00010323 | -1.7182339e-7 | 0.002511 | -1.51e-7 | -3.48e-12
// 27 | 0.660708 | 0.004598 | -1.94573e-6 | 9.2757980e-5 | 3.6937565e-9 | 0.004689 | 2.49e-7 | -5.95e-11
// 28 | 0.659027 | -0.000263 | 1.04946e-6 | 6.4907002e-5 | 3.1619794e-8 | -0.000197 | 1.98e-7 | 5.92e-11
// 29 | 0.660182 | 0.003848 | -2.15237e-6 | 4.9193908e-5 | 0.00000000 | 0.003895 | -4.04e-8 | 0.000
// 30 | 0.660287 | 0.000450 | -2.59699e-7 | 2.9754697e-5 | -1.8289628e-9 | 0.000479 | -2.24e-6 | -2.14e-11
// 31 | 0.660022 | -0.002591 | -3.69008e-7 | 2.2553312e-5 | 1.6543612e-24 | -0.002569 | -7.54e-7 | -3.55e-15
// 32 | 0.660342 | 0.001349 | -4.01082e-7 | 1.4318007e-5 | 0.00000000 | 0.001363 | 1.02e-6 | 0.000
// 33 | 0.660259 | 0.004208 | -3.01032e-7 | 1.0691636e-5 | -8.8650269e-11 | 0.004219 | 5.23e-6 | 2.01e-9
// 34 | 0.660287 | 0.000983 | -1.63668e-7 | 7.6443946e-6 | -2.6076046e-10 | 0.000990 | -7.72e-6 | -9.47e-10
// 35 | 0.660051 | -0.001286 | -9.13579e-8 | 5.5548231e-6 | 0.00000000 | -0.001281 | 7.86e-6 | 0.000
// 36 | 0.660168 | 0.001204 | 4.42278e-8 | 3.8068026e-6 | 1.5128387e-10 | 0.001207 | -1.12e-5 | -1.01e-9
// 37 | 0.660213 | 0.000455 | 2.08099e-10 | 2.6369330e-6 | -1.2235145e-10 | 0.000458 | -9.70e-6 | -1.02e-9
// 38 | 0.660171 | -0.001473 | 1.10896e-8 | 1.9570835e-6 | 9.6433058e-12 | -0.001471 | 1.26e-5 | 1.98e-8
//
// RANDOM-SIGN CONTROL (mu(n) -> +-1 on the same support, mu(e) kept)  j | real D_y/x | ctrl D_y/x mean | ctrl sd | |real|/ctrl rms | real W1/x | ctrl W1/x mean | real Wend/x | ctrl Wend/x mean | real M/x | ctrl M/x rms
// 16 | -0.016647 | 0.014795 | 0.028593 | 0.577 | 0.863753 | 0.858456 | 0.565540 | 0.564789 | 0.014472 | 0.001552
// 17 | -0.039617 | -0.031880 | 0.032439 | 0.932 | 0.753470 | 0.805646 | 0.486210 | 0.567585 | -0.008630 | 0.005778
// 18 | -0.030072 | 0.004257 | 0.021029 | 1.608 | 0.736486 | 0.736334 | 0.502722 | 0.496262 | -0.001828 | 0.001956
// 19 | -0.003985 | -0.009373 | 0.036055 | 0.122 | 0.618895 | 0.688337 | 0.413588 | 0.475830 | -0.000402 | 0.002559
// 20 | -0.014966 | -0.006877 | 0.008739 | 1.464 | 0.607388 | 0.644039 | 0.408963 | 0.429658 | -0.001435 | 0.002346
// 21 | 0.009566 | -0.002684 | 0.015944 | 0.680 | 0.521856 | 0.565525 | 0.333632 | 0.380239 | -0.002811 | 0.000553
// 22 | 0.009354 | 0.003547 | 0.002813 | 2.174 | 0.481018 | 0.528647 | 0.318348 | 0.363369 | -0.000447 | 0.001667
// 23 | 0.000935 | 0.002588 | 0.009413 | 0.109 | 0.455906 | 0.476522 | 0.303879 | 0.316855 | -0.000200 | 0.000858
// 24 | -0.010634 | -0.002180 | 0.004217 | 2.500 | 0.407205 | 0.428371 | 0.261048 | 0.289982 | -0.001103 | 0.000634
// 25 | -0.009726 | 0.000369 | 0.002712 | 4.091 | 0.358757 | 0.384318 | 0.236409 | 0.258604 | 0.000159 | 0.000392
// 26 | -0.003430 | 0.001083 | 0.003516 | 1.061 | 0.322294 | 0.346527 | 0.206677 | 0.232181 | 0.000226 | 0.000216
// 27 | -0.004283 | 0.002011 | 0.001980 | 1.621 | 0.291870 | 0.310502 | 0.189238 | 0.206484 | -0.000106 | 0.000159
// 28 | -0.001090 | -0.000399 | 0.000400 | 2.064 | 0.261337 | 0.275249 | 0.169290 | 0.184994 | -0.000116 | 4.03553e-5
// 29 | -0.003992 | 0.000106 | 0.000946 | 4.833 | 0.235037 | 0.246660 | 0.152151 | 0.165950 | -8.81544e-5 | 0.000118
// 30 | -0.000265 | -0.000197 | 0.000662 | 0.438 | 0.208028 | 0.219905 | 0.134617 | 0.148495 | 6.69207e-5 | 5.73134e-5
// 31 | 0.002449 | 0.000464 | 0.000729 | 3.126 | 0.185224 | 0.195175 | 0.121984 | 0.131819 | 1.53190e-5 | 3.43198e-5
// 32 | -0.001258 | -0.000118 | 0.000200 | 6.014 | 0.163222 | 0.172649 | 0.106898 | 0.116145 | -5.66459e-5 | 4.70851e-5
// 33 | -0.004180 | 0.000101 | 0.000357 | 12.849 | 0.144735 | 0.153405 | 0.095232 | 0.103476 | -4.46298e-5 | 1.98642e-5
// 34 | -0.000899 | -2.85867e-5 | 0.000121 | 8.252 | 0.127406 | 0.134766 | 0.083277 | 0.091027 | -2.54129e-5 | 2.21007e-5
// 35 | 0.001132 | 1.82468e-5 | 0.000168 | 7.703 | 0.113108 | 0.118762 | 0.074340 | 0.080253 | -2.87056e-5 | 1.26699e-5
// 36 | -0.001193 | 6.98503e-5 | 0.000169 | 7.374 | 0.099652 | 0.104565 | 0.065541 | 0.070569 | 5.99327e-6 | 2.42566e-5
// 37 | -0.000406 | -3.88797e-7 | 5.46404e-5 | 8.580 | 0.087830 | 0.091808 | 0.057870 | 0.061748 | 3.09755e-7 | 8.91387e-6
// 38 | 0.001476 | -5.70080e-5 | 4.20361e-5 | 21.816 | 0.077347 | 0.080797 | 0.050998 | 0.054557 | -3.27538e-6 | 6.43551e-6
//
// SHIFT-4 CONTROL (v)  j | D_y/x shift2 | D_y/x shift4 | differs | M/x shift4
// 20 | -0.014966 | -0.013581 | yes | 0.000309
// 24 | -0.010634 | -0.008920 | yes | -0.000428
// 28 | -0.001090 | 0.000262 | yes | 0.000115
//
// NAIVE REIMPLEMENTATION (iii)  j | D_y segmented | D_y naive | rel diff | M seg | M naive | W1grid | W1exact | grid/exact | sec
// 16 | -1090.9610 | -1090.9610 | 8.96e-15 | 948.41 | 948.41 | 56606.95 | 58076.33 | 0.9747 | 0.1
// 18 | -7883.2766 | -7883.2766 | 7.50e-15 | -479.12 | -479.12 | 193065.26 | 198668.90 | 0.9718 | 0.3
// 20 | -15693.1605 | -15693.1605 | 6.14e-15 | -1504.90 | -1504.90 | 636892.12 | 659261.24 | 0.9661 | 2.0
//
// SLOPES over j>=26 (d log|.| / d log x): |D_y| real 0.863 vs control rms 0.544 ; W1grid real 0.827 vs control 0.825 ; (x itself has slope 1, sqrt(x) 0.5)
// FALSIFIERS: F1 D_y/x < -0.16 at j>=26: no ; F2 W1grid/x > 0.08 at all j>=26 and non-decreasing: no
// CONTROLS: exactAlgebra=true; naiveMatches=true; ctrlMeanWithin4se=true; shift4Differs=true
// runtime: 8223.5 s total
// ============================================================================
// READINGS
// ============================================================================
