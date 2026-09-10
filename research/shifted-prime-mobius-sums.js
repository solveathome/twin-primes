#!/usr/bin/env node
// ============================================================================
// shifted-prime-mobius-sums.js
//
// FINITE MEASUREMENT of the Mobius and Liouville functions at shifted primes,
// the object the 2026-09-05 review named as the cleanest instance of the
// parity input the twin-prime reduction lacks:
//
//   U_mu+(x)  = sum_{5<=p<=x} mu(p+2),      U_mu-(x)  = sum_{5<=p<=x} mu(p-2),
//   U_lam+(x) = sum_{5<=p<=x} lambda(p+2),  U_lam-(x) = sum_{5<=p<=x} lambda(p-2),
//   Sq(x)     = sum_{5<=p<=x} mu^2(p+2),    pi(x) = #{p<=x},
//
// cumulatively at x = 2^j, together with the dyadic Lambda-weighted total
//   Mdy(j) = sum_{2^(j-1) < n <= 2^j} Lambda(n-2) mu(n)
// which is the M(x) of research/moving-cutoff-parity.md (3) and is computed
// independently here from the value in centered-discrepancy-measurement.js.
//
// The folklore conjecture (Hildebrand 1989; Lichtman arXiv:2009.08969 states
// it) is sum_{p<=X} mu(p+h) = o(pi(X)) for each fixed h. It is OPEN. Its
// Liouville form at h = -2 is the statement research/README.md Status calls
// the missing Type II input. Nothing here proves or supports it: a finite
// table can only show whether the sums sit at random-sign size or carry a
// visible bias at these scales.
//
// THIS IS A MEASUREMENT, NOT A PROOF.
//
// DECISION THIS RUN INFORMS: (a) how loose the trivial bound M <= A2 x/2
// used for the -4x/25 tolerance in moving-cutoff-parity (14)-(16) is at
// reachable x; (b) whether the shifted-prime Mobius/Liouville sums show any
// sign persistence that a random-sign model does not, which would be a
// measured (unexplained) structure worth a note of its own; (c) an
// independent cross-check of M(x) between two scripts.
//
// PRE-REGISTERED FALSIFIERS (fixed before the first full run):
//   F1. If |U(x)|/sqrt(pi(x)) exceeds 4 times the random-sign control's rms
//       at three consecutive j >= 30 for the same U, record "visible
//       structure at these scales, unexplained". Otherwise "at random-sign
//       size; no structure detected". Neither reading bears on the
//       asymptotic conjecture.
//   F2. Sq(x)/pi(x) must approach A2 = prod_{p>2}(1-1/(p(p-1))) = 0.7479...
//       (a density control on the sieve; p+2 is odd so no factor at 2).
//   F3. The dyadic Mdy(j) must agree with the M column of
//       centered-discrepancy-measurement.js to floating precision at every
//       common j (checked in the companion note, not here).
//   F4. Least-squares slope of log|U| against log x over j >= 28, compared
//       with the control's slope; a random-sign sum has slope 1/2. A real
//       slope above the control's by more than the control's spread would be
//       the same "structure" flag as F1.
//
// CONTROLS: (i) pi(2^j) printed for comparison with OEIS A007053 (checked by
// a reader, not hard-coded here; the printed count omits p=2,3, so add 2); (ii) at j <= 26 a plain in-memory sieve
// recomputes every column and must agree exactly; (iii) 8 seeded random-sign
// draws per column, mean within a few se of zero; (iv) shift +2 and -2 must
// differ.
// ============================================================================

'use strict';
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { fork } = require('node:child_process');

const JMAX = Number(process.argv.slice(2).find(a => /^\d+$/.test(a)) || 38);
const JSPLIT = 33;                 // blocks above this are split into pieces of 2^JSPLIT
const SEGLG = 22;
const DRAWS = 8;
const SEED = 0x5a1f7ed;
const CHECK_J = 26;
const A2 = 0.7479116272384044; // prod_{p>2} (1 - 1/(p(p-1))) = 2 * Artin's constant 0.3739558...; density of squarefree values among odd shifted primes
const WORKERS = Math.max(1, Math.min(Number(process.env.SPMS_WORKERS || 6), os.cpus().length - 2));

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

// Sums over the range n in [lo, hi]. Columns are indexed as in COLS.
const COLS = ['pi', 'muP', 'muM', 'lamP', 'lamM', 'sq', 'Mdy'];
function rangeSums(lo, hi, primes) {
  if (lo < 3) lo = 3;                 // 1 and 2 contribute to no column
  const SEG = 1 << SEGLG;
  const out = { pi: 0, muP: 0, muM: 0, lamP: 0, lamM: 0, sq: 0, Mdy: 0, absMdy: 0,
    draws: { muP: new Float64Array(DRAWS), muM: new Float64Array(DRAWS), lamP: new Float64Array(DRAWS), lamM: new Float64Array(DRAWS) } };
  const comp = new Uint8Array(SEG + 8), lam = new Float64Array(SEG + 8);
  const rem = new Float64Array(SEG + 8), omega = new Uint8Array(SEG + 8), sqf = new Uint8Array(SEG + 8), act = new Uint8Array(SEG + 8);
  const nprimeLog = primes.map(Math.log);
  for (let a = lo; a <= hi; a += SEG) {
    const len = Math.min(SEG, hi - a + 1);
    // window [a-2, a+len+1]: Lambda and factorization data for n and n+-2
    const b = a - 2, blen = len + 4, top = b + blen - 1;
    comp.fill(0, 0, blen); lam.fill(0, 0, blen);
    for (let pi = 0; pi < primes.length; pi++) {
      const p = primes[pi]; if (p * p > top) break;
      let st = b % p; st = st === 0 ? 0 : p - st;
      let i = st; if (b + i === p) i += p;                // do not mark p itself
      for (; i < blen; i += p) comp[i] = 1;
    }
    for (let i = 0; i < blen; i++) { const n = b + i; if (n >= 2 && !comp[i]) lam[i] = Math.log(n); }
    for (let pi = 0; pi < primes.length; pi++) {
      const p = primes[pi]; let pk = p * p; if (pk > top) break;
      while (pk < b) pk *= p;
      while (pk <= top) { if (pk - b >= 0) lam[pk - b] = nprimeLog[pi]; pk *= p; }
    }
    // active window positions: n such that n-2 or n+2 is prime (or a prime power, for Mdy)
    for (let i = 0; i < blen; i++) {
      const n = b + i;
      const pm = i >= 2 && lam[i - 2] !== 0 && comp[i - 2] === 0;   // n-2 prime
      const pp = i + 2 < blen && lam[i + 2] !== 0 && comp[i + 2] === 0; // n+2 prime
      const anyL = i >= 2 && lam[i - 2] !== 0;                       // n-2 prime power
      act[i] = (pm || pp || anyL) ? 1 : 0;
      rem[i] = n; omega[i] = 0; sqf[i] = 0;
    }
    for (let pi = 0; pi < primes.length; pi++) {
      const p = primes[pi]; if (p > top) break;
      let st = b % p; st = st === 0 ? 0 : p - st;
      for (let i = st; i < blen; i += p) {
        if (!act[i]) continue;
        let r = rem[i] / p, k = 1;
        while (r % p === 0) { r /= p; k++; }
        rem[i] = r; omega[i] += k; if (k > 1) sqf[i] = 1;
      }
    }
    for (let i = 0; i < blen; i++) if (act[i] && rem[i] > 1) omega[i] += 1;   // large prime cofactor
    const mu = i => sqf[i] ? 0 : ((omega[i] & 1) ? -1 : 1);
    const lamb = i => (omega[i] & 1) ? -1 : 1;
    const aLow = (a % 4294967296) >>> 0, hiMix = Math.imul(Math.floor(a / 4294967296), 0x9E3779B1) | 0;
    for (let i2 = 0; i2 < len; i2++) {
      const i = i2 + 2, n = a + i2;
      // Mdy over all n in range: Lambda(n-2) mu(n)
      if (lam[i - 2] !== 0 && n - 2 >= 2) { const m = mu(i); if (m !== 0) { out.Mdy += m * lam[i - 2]; out.absMdy += lam[i - 2]; } }
      if (n < 5 || comp[i] || lam[i] === 0) continue;          // n prime, n >= 5
      out.pi++;
      const muP = mu(i + 2), muM = mu(i - 2), lP = lamb(i + 2), lM = lamb(i - 2);
      out.muP += muP; out.muM += muM; out.lamP += lP; out.lamM += lM; out.sq += muP * muP;
      const h = h32((((aLow + i2) >>> 0) ^ hiMix ^ SEED) | 0);
      for (let d = 0; d < DRAWS; d++) {
        const s = ((h >>> d) & 1) ? 1 : -1;
        out.draws.muP[d] += s * Math.abs(muP); out.draws.muM[d] += s * Math.abs(muM);
        out.draws.lamP[d] += s; out.draws.lamM[d] += s;
      }
    }
  }
  return out;
}

function plainCheck(N) {
  // in-memory: spf sieve, mu, lambda, primes
  const spf = new Int32Array(N + 3), mu = new Int8Array(N + 3), lam = new Int8Array(N + 3), isP = new Uint8Array(N + 3);
  const Lam = new Float64Array(N + 3);
  for (let i = 2; i <= N + 2; i++) if (!spf[i]) { for (let k = i; k <= N + 2; k += i) if (!spf[k]) spf[k] = i; isP[i] = 1; let pk = i; while (pk <= N + 2) { Lam[pk] = Math.log(i); pk *= i; } }
  mu[1] = 1; lam[1] = 1;
  for (let n = 2; n <= N + 2; n++) {
    const p = spf[n], m = n / p;
    lam[n] = -lam[m];
    mu[n] = (m % p === 0) ? 0 : -mu[m];
  }
  const res = {};
  for (let j = 1; (1 << j) <= N; j++) {
    const x = 1 << j;
    const o = { pi: 0, muP: 0, muM: 0, lamP: 0, lamM: 0, sq: 0, Mdy: 0 };
    for (let p = 5; p <= x; p++) if (isP[p]) { o.pi++; o.muP += mu[p + 2]; o.muM += mu[p - 2]; o.lamP += lam[p + 2]; o.lamM += lam[p - 2]; o.sq += mu[p + 2] * mu[p + 2]; }
    for (let n = x / 2 + 1; n <= x; n++) if (n - 2 >= 2) o.Mdy += Lam[n - 2] * mu[n];
    res[j] = o;
  }
  return res;
}

if (process.argv.includes('--worker')) {
  const lo = Number(process.argv[process.argv.indexOf('--lo') + 1]);
  const hi = Number(process.argv[process.argv.indexOf('--hi') + 1]);
  const primes = basePrimes(Math.floor(Math.sqrt(hi + 2)) + 1);
  const r = rangeSums(lo, hi, primes);
  r.draws = Object.fromEntries(Object.entries(r.draws).map(([k, v]) => [k, Array.from(v)]));
  process.send({ lo, hi, r }, () => process.exit(0));
} else main();

function main() {
  const T0 = Date.now();
  // pieces: block j = (2^(j-1), 2^j]; block 1 covers [1,2]
  const jobs = [];
  for (let j = JMAX; j >= 1; j--) {
    const lo = j === 1 ? 1 : Math.pow(2, j - 1) + 1, hi = Math.pow(2, j);
    if (j <= JSPLIT) jobs.push({ j, lo, hi });
    else { const n = Math.pow(2, j - JSPLIT), w = (hi - lo + 1) / n; for (let k = 0; k < n; k++) jobs.push({ j, lo: lo + k * w, hi: lo + (k + 1) * w - 1 }); }
  }
  const parts = [];
  let running = 0, next = 0;
  function launch() {
    while (running < WORKERS && next < jobs.length) {
      const job = jobs[next++]; running++;
      const c = fork(__filename, ['--worker', '--lo', String(job.lo), '--hi', String(job.hi)], { stdio: ['ignore', 'ignore', 'inherit', 'ipc'] });
      c.on('message', m => parts.push({ j: job.j, ...m }));
      c.on('exit', code => { running--; if (code !== 0) { console.error(`worker ${job.lo}-${job.hi} exited ${code}`); process.exitCode = 1; } if (next < jobs.length) launch(); else if (running === 0) finish(); });
    }
  }
  function finish() {
    // dyadic totals per j, then cumulative
    const dy = {};
    for (const p of parts) {
      const d = dy[p.j] || (dy[p.j] = { pi: 0, muP: 0, muM: 0, lamP: 0, lamM: 0, sq: 0, Mdy: 0, absMdy: 0, draws: { muP: new Array(DRAWS).fill(0), muM: new Array(DRAWS).fill(0), lamP: new Array(DRAWS).fill(0), lamM: new Array(DRAWS).fill(0) } });
      for (const k of ['pi', 'muP', 'muM', 'lamP', 'lamM', 'sq', 'Mdy', 'absMdy']) d[k] += p.r[k];
      for (const k of ['muP', 'muM', 'lamP', 'lamM']) for (let i = 0; i < DRAWS; i++) d.draws[k][i] += p.r.draws[k][i];
    }
    const rows = [];
    const cum = { pi: 0, muP: 0, muM: 0, lamP: 0, lamM: 0, sq: 0, draws: { muP: new Array(DRAWS).fill(0), muM: new Array(DRAWS).fill(0), lamP: new Array(DRAWS).fill(0), lamM: new Array(DRAWS).fill(0) } };
    for (let j = 1; j <= JMAX; j++) {
      const d = dy[j];
      for (const k of ['pi', 'muP', 'muM', 'lamP', 'lamM', 'sq']) cum[k] += d[k];
      for (const k of ['muP', 'muM', 'lamP', 'lamM']) for (let i = 0; i < DRAWS; i++) cum.draws[k][i] += d.draws[k][i];
      const rms = v => Math.sqrt(v.reduce((u, w) => u + w * w, 0) / v.length);
      rows.push({ j, x: Math.pow(2, j), pi: cum.pi, muP: cum.muP, muM: cum.muM, lamP: cum.lamP, lamM: cum.lamM, sq: cum.sq,
        ctrlRms: { muP: rms(cum.draws.muP), muM: rms(cum.draws.muM), lamP: rms(cum.draws.lamP), lamM: rms(cum.draws.lamM) },
        ctrlMean: Object.fromEntries(['muP', 'muM', 'lamP', 'lamM'].map(k => [k, cum.draws[k].reduce((u, w) => u + w, 0) / DRAWS])),
        Mdy: d.Mdy, absMdy: d.absMdy, drawsCum: JSON.parse(JSON.stringify(cum.draws)) });
    }
    const CJ = Math.min(CHECK_J, JMAX);
    const chk = plainCheck(1 << CJ);
    const F = (v, d = 5) => Number.isFinite(v) ? (Math.abs(v) < 1e-4 && v !== 0 ? v.toExponential(d - 1) : v.toFixed(d)) : 'n/a';
    const out = [];
    out.push(`scope: FINITE MEASUREMENT of sum_{5<=p<=x} mu(p+-2), lambda(p+-2), mu^2(p+2) and the dyadic Lambda(n-2)mu(n) total at x=2^j; the o(pi(x)) conjecture is OPEN and nothing here bears on it asymptotically`);
    out.push(`config: j=1..${JMAX}, split above 2^${JSPLIT}, seglen=2^${SEGLG}, draws=${DRAWS}, seed=0x${SEED.toString(16)}, A2=${A2}, workers=${WORKERS}`);
    out.push('');
    out.push('CUMULATIVE  j | pi(2^j) | U_mu+ | U_mu- | U_lam+ | U_lam- | Sq/pi (-> A2) | U_mu+/pi | U_mu-/pi | U_lam+/pi | U_lam-/pi');
    for (const r of rows) if (r.j >= 10) out.push([r.j, r.pi, r.muP, r.muM, r.lamP, r.lamM, F(r.sq / r.pi), F(r.muP / r.pi, 6), F(r.muM / r.pi, 6), F(r.lamP / r.pi, 6), F(r.lamM / r.pi, 6)].join(' | '));
    out.push('');
    out.push('AGAINST THE RANDOM-SIGN CONTROL (same support, 8 draws)  j | U_mu+/sqrt(pi) | ctrl rms | ratio | U_mu-/sqrt(pi) | ctrl rms | ratio | U_lam+/sqrt(pi) | ctrl rms | ratio | U_lam-/sqrt(pi) | ctrl rms | ratio');
    for (const r of rows) if (r.j >= 10) {
      const s = Math.sqrt(r.pi);
      out.push([r.j, F(r.muP / s, 3), F(r.ctrlRms.muP / s, 3), F(Math.abs(r.muP) / r.ctrlRms.muP, 3), F(r.muM / s, 3), F(r.ctrlRms.muM / s, 3), F(Math.abs(r.muM) / r.ctrlRms.muM, 3),
        F(r.lamP / s, 3), F(r.ctrlRms.lamP / s, 3), F(Math.abs(r.lamP) / r.ctrlRms.lamP, 3), F(r.lamM / s, 3), F(r.ctrlRms.lamM / s, 3), F(Math.abs(r.lamM) / r.ctrlRms.lamM, 3)].join(' | '));
    }
    out.push('');
    out.push('DYADIC Lambda(n-2)mu(n)  j | Mdy | Mdy/x | sum Lambda(n-2)mu^2(n) /x | Mdy/sqrt(x)');
    for (const r of rows) if (r.j >= 10) out.push([r.j, F(r.Mdy, 4), F(r.Mdy / r.x, 7), F(r.absMdy / r.x, 6), F(r.Mdy / Math.sqrt(r.x), 4)].join(' | '));
    out.push('');
    // F1 / F4
    const flags = {};
    for (const k of ['muP', 'muM', 'lamP', 'lamM']) {
      let run = 0, hit = [];
      for (const r of rows) { if (r.j < 30) continue; const ratio = Math.abs(r[k]) / r.ctrlRms[k]; if (ratio > 4) { run++; if (run >= 3) hit.push(r.j); } else run = 0; }
      flags[k] = hit;
    }
    const fit = pts => { const n = pts.length; if (n < 3) return null; const mx = pts.reduce((u, p) => u + p[0], 0) / n, my = pts.reduce((u, p) => u + p[1], 0) / n; let sxx = 0, sxy = 0; for (const [u, v] of pts) { sxx += (u - mx) ** 2; sxy += (u - mx) * (v - my); } return sxy / sxx; };
    const big = rows.filter(r => r.j >= 28);
    const slopes = {};
    for (const k of ['muP', 'muM', 'lamP', 'lamM']) {
      const real = fit(big.filter(r => r[k] !== 0).map(r => [r.j * Math.LN2, Math.log(Math.abs(r[k]))]));
      const ctrl = fit(big.map(r => [r.j * Math.LN2, Math.log(r.ctrlRms[k])]));
      const perDraw = Array.from({ length: DRAWS }, (_, i) => fit(big.filter(r => r.drawsCum[k][i] !== 0).map(r => [r.j * Math.LN2, Math.log(Math.abs(r.drawsCum[k][i]))])));
      const m = perDraw.reduce((u, v) => u + v, 0) / DRAWS, sd = Math.sqrt(perDraw.reduce((u, v) => u + (v - m) ** 2, 0) / (DRAWS - 1));
      slopes[k] = { real, ctrlRms: ctrl, drawMean: m, drawSd: sd };
      out.push(`SLOPE d log|U| / d log x over j>=28, ${k}: real ${F(real, 3)} ; control rms ${F(ctrl, 3)} ; per-draw ${F(m, 3)} +- ${F(sd, 3)} (random-sign expectation 1/2; o(pi) needs < 1)`);
    }
    // sign persistence: longest run of consecutive j >= 20 with one sign, real vs each draw
    const runLen = seq => { let best = 0, cur = 0, prev = 0; for (const v of seq) { const sg = Math.sign(v); if (sg !== 0 && sg === prev) cur++; else cur = sg === 0 ? 0 : 1; prev = sg; if (cur > best) best = cur; } return best; };
    const late = rows.filter(r => r.j >= 20);
    for (const k of ['muP', 'muM', 'lamP', 'lamM']) {
      const real = runLen(late.map(r => r[k]));
      const draws = Array.from({ length: DRAWS }, (_, i) => runLen(late.map(r => r.drawsCum[k][i])));
      out.push(`SIGN PERSISTENCE (longest same-sign run over j=20..${JMAX}, cumulative sums), ${k}: real ${real} ; draws ${draws.join(',')} (max ${Math.max(...draws)})`);
    }
    out.push('');
    // controls
    const ck = [];
    let plainOk = true;
    for (let j = 10; j <= CJ; j++) { const r = rows[j - 1], c = chk[j]; for (const k of ['pi', 'muP', 'muM', 'lamP', 'lamM', 'sq']) if (r[k] !== c[k]) { plainOk = false; ck.push(`j=${j} ${k}: seg ${r[k]} plain ${c[k]}`); } if (Math.abs(r.Mdy - c.Mdy) > 1e-6 * Math.max(1, Math.abs(c.Mdy))) { plainOk = false; ck.push(`j=${j} Mdy: seg ${r.Mdy} plain ${c.Mdy}`); } }
    const last = rows[rows.length - 1];
    const meanOk = ['muP', 'muM', 'lamP', 'lamM'].every(k => Math.abs(last.ctrlMean[k]) <= 4 * last.ctrlRms[k] / Math.sqrt(DRAWS) + 1e-9);
    const shiftDiff = last.muP !== last.muM && last.lamP !== last.lamM;
    out.push('');
    out.push(`FALSIFIER F1 (ratio>4 at three consecutive j>=30): ${Object.entries(flags).map(([k, v]) => `${k}=${v.length ? 'YES at j=' + v.join(',') : 'no'}`).join('; ')}`);
    out.push(`FALSIFIER F2 Sq/pi at top j: ${F(last.sq / last.pi, 6)} vs A2 ${A2} (diff ${F(last.sq / last.pi - A2, 6)})`);
    out.push(`CONTROLS: plainSieveMatches(j<=${CJ})=${plainOk}${ck.length ? ' [' + ck.join('; ') + ']' : ''}; ctrlMeanWithin4se=${meanOk}; shiftsDiffer=${shiftDiff}`);
    out.push(`pi(2^j) counting p>=5 (add 2 for A007053): ${rows.filter(r => r.j >= 20).map(r => `${r.j}:${r.pi}`).join(' ')}`);
    out.push(`runtime: ${((Date.now() - T0) / 1000).toFixed(1)} s total`);
    console.log(out.join('\n'));
    fs.writeFileSync(path.join(__dirname, 'shifted-prime-mobius-sums.json'), JSON.stringify({ schema: 1, scope: 'Finite measurement of Mobius/Liouville at shifted primes; no asymptotic claim.', config: { JMAX, JSPLIT, SEGLG, DRAWS, SEED, A2, CHECK_J }, rows: rows.map(r => ({ ...r, drawsCum: undefined })), slopes, flags, totalSeconds: (Date.now() - T0) / 1000 }, null, 2) + '\n');
  }
  launch();
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --env SPMS_WORKERS=6 research/shifted-prime-mobius-sums.js -- 38
//   invocation:  SPMS_WORKERS=6 node research/shifted-prime-mobius-sums.js 38
//   code-sha256: 91511fad024d87585dfa91fa698e5b88c801c9a4b5a39fcbc48dcab75c6c3e62
//   out-sha256:  a1079401a1a1bc989824e6b56a64c53151d450b8e20f2be6a177efd3550ab2b8
//   body-lines:  111
//   forced:      2026-09-07, 2 of 666 figures in the replaced block not reproduced (first: 0.73644380948, 0.011467)
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-07
//   elapsed:     2694.2 s
// ============================================================================
// scope: FINITE MEASUREMENT of sum_{5<=p<=x} mu(p+-2), lambda(p+-2), mu^2(p+2) and the dyadic Lambda(n-2)mu(n) total at x=2^j; the o(pi(x)) conjecture is OPEN and nothing here bears on it asymptotically
// config: j=1..38, split above 2^33, seglen=2^22, draws=8, seed=0x5a1f7ed, A2=0.7479116272384044, workers=6
//
// CUMULATIVE  j | pi(2^j) | U_mu+ | U_mu- | U_lam+ | U_lam- | Sq/pi (-> A2) | U_mu+/pi | U_mu-/pi | U_lam+/pi | U_lam-/pi
// 10 | 170 | 17 | 11 | 20 | 2 | 0.77059 | 0.100000 | 0.064706 | 0.117647 | 0.011765
// 11 | 307 | 13 | 11 | 17 | 7 | 0.75244 | 0.042345 | 0.035831 | 0.055375 | 0.022801
// 12 | 562 | 9 | -13 | 18 | -28 | 0.75267 | 0.016014 | -0.023132 | 0.032028 | -0.049822
// 13 | 1026 | 9 | -6 | 26 | -6 | 0.75146 | 0.008772 | -0.005848 | 0.025341 | -0.005848
// 14 | 1898 | 12 | 16 | -4 | 14 | 0.74710 | 0.006322 | 0.008430 | -0.002107 | 0.007376
// 15 | 3510 | -20 | 10 | -48 | 14 | 0.74815 | -0.005698 | 0.002849 | -0.013675 | 0.003989
// 16 | 6540 | 68 | 6 | 54 | -6 | 0.75076 | 0.010398 | 0.000917 | 0.008257 | -0.000917
// 17 | 12249 | -31 | 30 | -37 | 65 | 0.74920 | -0.002531 | 0.002449 | -0.003021 | 0.005307
// 18 | 22998 | -74 | 92 | -122 | 88 | 0.74885 | -0.003218 | 0.004000 | -0.005305 | 0.003826
// 19 | 43388 | -89 | 233 | -164 | 170 | 0.74811 | -0.002051 | 0.005370 | -0.003780 | 0.003918
// 20 | 82023 | -199 | 424 | -77 | 401 | 0.74812 | -0.002426 | 0.005169 | -0.000939 | 0.004889
// 21 | 155609 | -611 | -84 | -585 | -55 | 0.74831 | -0.003927 | -0.000540 | -0.003759 | -0.000353
// 22 | 295945 | -736 | -452 | -531 | -557 | 0.74816 | -0.002487 | -0.001527 | -0.001794 | -0.001882
// 23 | 564161 | -833 | -824 | -327 | -1073 | 0.74827 | -0.001477 | -0.001461 | -0.000580 | -0.001902
// 24 | 1077869 | -1967 | 437 | -1405 | 225 | 0.74797 | -0.001825 | 0.000405 | -0.001303 | 0.000209
// 25 | 2063687 | -1661 | -41 | -1699 | -639 | 0.74806 | -0.000805 | -1.98674e-5 | -0.000823 | -0.000310
// 26 | 3957807 | -842 | 569 | -1003 | -139 | 0.74799 | -0.000213 | 0.000144 | -0.000253 | -3.51205e-5
// 27 | 7603551 | -1581 | -592 | -877 | -2311 | 0.74796 | -0.000208 | -7.78584e-5 | -0.000115 | -0.000304
// 28 | 14630841 | -3143 | 2873 | -1755 | 2717 | 0.74791 | -0.000215 | 0.000196 | -0.000120 | 0.000186
// 29 | 28192748 | -5570 | -251 | -7732 | -2354 | 0.74793 | -0.000198 | -8.90300e-6 | -0.000274 | -8.34966e-5
// 30 | 54400026 | -2143 | -5296 | -4882 | -8324 | 0.74792 | -3.93934e-5 | -9.73529e-5 | -8.97426e-5 | -0.000153
// 31 | 105097563 | -620 | -9686 | -5129 | -10985 | 0.74791 | -5.89928e-6 | -9.21620e-5 | -4.88023e-5 | -0.000105
// 32 | 203280219 | -11773 | -11954 | -14927 | -3889 | 0.74791 | -5.79151e-5 | -5.88055e-5 | -7.34307e-5 | -1.91312e-5
// 33 | 393615804 | -28713 | -11773 | -28214 | 6408 | 0.74791 | -7.29468e-5 | -2.99099e-5 | -7.16790e-5 | 1.62798e-5
// 34 | 762939109 | -47492 | -18265 | -38973 | -3089 | 0.74790 | -6.22487e-5 | -2.39403e-5 | -5.10827e-5 | -4.04882e-6
// 35 | 1480206277 | -88802 | -21501 | -92449 | -6449 | 0.74791 | -5.99930e-5 | -1.45257e-5 | -6.24568e-5 | -4.35683e-6
// 36 | 2874398513 | -71833 | 8443 | -64463 | 24517 | 0.74791 | -2.49906e-5 | 2.93731e-6 | -2.24266e-5 | 8.52944e-6
// 37 | 5586502346 | -70575 | -48854 | -96502 | -20786 | 0.74791 | -1.26331e-5 | -8.74501e-6 | -1.72741e-5 | -3.72075e-6
// 38 | 10866266170 | -105505 | -46914 | -149500 | -21556 | 0.74791 | -9.70941e-6 | -4.31740e-6 | -1.37582e-5 | -1.98375e-6
//
// AGAINST THE RANDOM-SIGN CONTROL (same support, 8 draws)  j | U_mu+/sqrt(pi) | ctrl rms | ratio | U_mu-/sqrt(pi) | ctrl rms | ratio | U_lam+/sqrt(pi) | ctrl rms | ratio | U_lam-/sqrt(pi) | ctrl rms | ratio
// 10 | 1.304 | 1.071 | 1.217 | 0.844 | 0.804 | 1.049 | 1.534 | 1.102 | 1.392 | 0.153 | 1.102 | 0.139
// 11 | 0.742 | 0.780 | 0.951 | 0.628 | 0.599 | 1.049 | 0.970 | 0.803 | 1.208 | 0.400 | 0.803 | 0.497
// 12 | 0.380 | 0.975 | 0.389 | -0.548 | 1.068 | 0.513 | 0.759 | 1.175 | 0.646 | -1.181 | 1.175 | 1.005
// 13 | 0.281 | 1.086 | 0.259 | -0.187 | 0.816 | 0.229 | 0.812 | 1.265 | 0.642 | -0.187 | 1.265 | 0.148
// 14 | 0.275 | 0.989 | 0.278 | 0.367 | 0.589 | 0.624 | -0.092 | 1.049 | 0.087 | 0.321 | 1.049 | 0.306
// 15 | -0.338 | 0.610 | 0.554 | 0.169 | 0.501 | 0.337 | -0.810 | 0.848 | 0.955 | 0.236 | 0.848 | 0.279
// 16 | 0.841 | 0.810 | 1.038 | 0.074 | 0.607 | 0.122 | 0.668 | 0.967 | 0.690 | -0.074 | 0.967 | 0.077
// 17 | -0.280 | 0.920 | 0.305 | 0.271 | 0.772 | 0.351 | -0.334 | 1.102 | 0.303 | 0.587 | 1.102 | 0.533
// 18 | -0.488 | 1.198 | 0.407 | 0.607 | 0.891 | 0.681 | -0.804 | 1.159 | 0.694 | 0.580 | 1.159 | 0.501
// 19 | -0.427 | 1.263 | 0.338 | 1.119 | 1.060 | 1.056 | -0.787 | 1.419 | 0.555 | 0.816 | 1.419 | 0.575
// 20 | -0.695 | 1.155 | 0.602 | 1.480 | 1.029 | 1.438 | -0.269 | 1.233 | 0.218 | 1.400 | 1.233 | 1.136
// 21 | -1.549 | 1.103 | 1.405 | -0.213 | 1.173 | 0.182 | -1.483 | 1.212 | 1.224 | -0.139 | 1.212 | 0.115
// 22 | -1.353 | 0.965 | 1.402 | -0.831 | 1.232 | 0.675 | -0.976 | 1.286 | 0.759 | -1.024 | 1.286 | 0.796
// 23 | -1.109 | 1.104 | 1.004 | -1.097 | 1.176 | 0.933 | -0.435 | 1.400 | 0.311 | -1.429 | 1.400 | 1.020
// 24 | -1.895 | 0.702 | 2.697 | 0.421 | 0.956 | 0.440 | -1.353 | 0.992 | 1.364 | 0.217 | 0.992 | 0.218
// 25 | -1.156 | 0.717 | 1.612 | -0.029 | 0.985 | 0.029 | -1.183 | 1.015 | 1.165 | -0.445 | 1.015 | 0.438
// 26 | -0.423 | 0.792 | 0.534 | 0.286 | 0.831 | 0.344 | -0.504 | 0.896 | 0.563 | -0.070 | 0.896 | 0.078
// 27 | -0.573 | 0.757 | 0.758 | -0.215 | 1.014 | 0.212 | -0.318 | 1.034 | 0.308 | -0.838 | 1.034 | 0.811
// 28 | -0.822 | 0.850 | 0.966 | 0.751 | 1.079 | 0.696 | -0.459 | 0.909 | 0.505 | 0.710 | 0.909 | 0.781
// 29 | -1.049 | 0.614 | 1.709 | -0.047 | 0.900 | 0.053 | -1.456 | 0.942 | 1.545 | -0.443 | 0.942 | 0.470
// 30 | -0.291 | 0.661 | 0.440 | -0.718 | 0.524 | 1.369 | -0.662 | 0.862 | 0.768 | -1.129 | 0.862 | 1.309
// 31 | -0.060 | 1.140 | 0.053 | -0.945 | 0.667 | 1.417 | -0.500 | 0.985 | 0.508 | -1.072 | 0.985 | 1.088
// 32 | -0.826 | 0.969 | 0.852 | -0.838 | 0.755 | 1.110 | -1.047 | 0.753 | 1.390 | -0.273 | 0.753 | 0.362
// 33 | -1.447 | 0.871 | 1.662 | -0.593 | 0.716 | 0.829 | -1.422 | 0.689 | 2.063 | 0.323 | 0.689 | 0.468
// 34 | -1.719 | 1.092 | 1.575 | -0.661 | 0.704 | 0.939 | -1.411 | 0.888 | 1.589 | -0.112 | 0.888 | 0.126
// 35 | -2.308 | 0.818 | 2.822 | -0.559 | 0.602 | 0.929 | -2.403 | 1.029 | 2.335 | -0.168 | 1.029 | 0.163
// 36 | -1.340 | 0.618 | 2.168 | 0.157 | 0.774 | 0.203 | -1.202 | 0.829 | 1.450 | 0.457 | 0.829 | 0.551
// 37 | -0.944 | 0.642 | 1.471 | -0.654 | 0.570 | 1.146 | -1.291 | 0.767 | 1.682 | -0.278 | 0.767 | 0.362
// 38 | -1.012 | 0.790 | 1.282 | -0.450 | 0.651 | 0.692 | -1.434 | 0.723 | 1.983 | -0.207 | 0.723 | 0.286
//
// DYADIC Lambda(n-2)mu(n)  j | Mdy | Mdy/x | sum Lambda(n-2)mu^2(n) /x | Mdy/sqrt(x)
// 10 | 77.6404 | 0.0758207 | 0.388784 | 2.4263
// 11 | -18.5349 | -0.0090502 | 0.361731 | -0.4096
// 12 | -32.3663 | -0.0079019 | 0.379386 | -0.5057
// 13 | 4.7141 | 0.0005755 | 0.371559 | 0.0521
// 14 | 37.3922 | 0.0022822 | 0.373161 | 0.2921
// 15 | -344.8599 | -0.0105243 | 0.373172 | -1.9051
// 16 | 948.4119 | 0.0144716 | 0.376274 | 3.7047
// 17 | -1131.1694 | -0.0086301 | 0.374035 | -3.1244
// 18 | -479.1172 | -0.0018277 | 0.373820 | -0.9358
// 19 | -210.9505 | -0.0004024 | 0.374035 | -0.2913
// 20 | -1504.8998 | -0.0014352 | 0.373814 | -1.4696
// 21 | -5895.9065 | -0.0028114 | 0.374298 | -4.0713
// 22 | -1875.0911 | -0.0004471 | 0.373994 | -0.9156
// 23 | -1674.7113 | -0.0001996 | 0.374167 | -0.5782
// 24 | -18508.6301 | -0.0011032 | 0.373791 | -4.5187
// 25 | 5331.4560 | 0.0001589 | 0.374133 | 0.9204
// 26 | 15170.8886 | 0.0002261 | 0.373940 | 1.8519
// 27 | -14272.5483 | -0.0001063 | 0.373948 | -1.2320
// 28 | -31155.3853 | -0.0001161 | 0.373934 | -1.9016
// 29 | -47327.5579 | -8.815445e-5 | 0.373969 | -2.0426
// 30 | 71855.5032 | 6.692065e-5 | 0.373964 | 2.1929
// 31 | 32897.2490 | 1.531898e-5 | 0.373943 | 0.7099
// 32 | -243292.2419 | -5.664589e-5 | 0.373953 | -3.7123
// 33 | -383367.0801 | -4.462980e-5 | 0.373957 | -4.1364
// 34 | -436590.8014 | -2.541293e-5 | 0.373950 | -3.3309
// 35 | -986317.5607 | -2.870562e-5 | 0.373958 | -5.3210
// 36 | 411854.1373 | 5.993266e-6 | 0.373954 | 1.5711
// 37 | 42572.4687 | 3.097555e-7 | 0.373958 | 0.1148
// 38 | -900329.2775 | -3.275379e-6 | 0.373955 | -1.7172
//
// SLOPE d log|U| / d log x over j>=28, muP: real 0.650 ; control rms 0.465 ; per-draw 0.491 +- 0.187 (random-sign expectation 1/2; o(pi) needs < 1)
// SLOPE d log|U| / d log x over j>=28, muM: real 0.505 ; control rms 0.432 ; per-draw 0.494 +- 0.296 (random-sign expectation 1/2; o(pi) needs < 1)
// SLOPE d log|U| / d log x over j>=28, lamP: real 0.614 ; control rms 0.453 ; per-draw 0.500 +- 0.274 (random-sign expectation 1/2; o(pi) needs < 1)
// SLOPE d log|U| / d log x over j>=28, lamM: real 0.276 ; control rms 0.453 ; per-draw 0.500 +- 0.274 (random-sign expectation 1/2; o(pi) needs < 1)
// SIGN PERSISTENCE (longest same-sign run over j=20..38, cumulative sums), muP: real 19 ; draws 9,7,5,13,3,8,4,10 (max 13)
// SIGN PERSISTENCE (longest same-sign run over j=20..38, cumulative sums), muM: real 7 ; draws 9,11,14,19,5,9,8,12 (max 19)
// SIGN PERSISTENCE (longest same-sign run over j=20..38, cumulative sums), lamP: real 19 ; draws 9,11,10,18,4,4,7,9 (max 18)
// SIGN PERSISTENCE (longest same-sign run over j=20..38, cumulative sums), lamM: real 4 ; draws 9,11,10,18,4,4,7,9 (max 18)
//
//
// FALSIFIER F1 (ratio>4 at three consecutive j>=30): muP=no; muM=no; lamP=no; lamM=no
// FALSIFIER F2 Sq/pi at top j: 0.747911 vs A2 0.7479116272384044 (diff -4.45250e-7)
// CONTROLS: plainSieveMatches(j<=26)=true; ctrlMeanWithin4se=true; shiftsDiffer=true
// pi(2^j) counting p>=5 (add 2 for A007053): 20:82023 21:155609 22:295945 23:564161 24:1077869 25:2063687 26:3957807 27:7603551 28:14630841 29:28192748 30:54400026 31:105097563 32:203280219 33:393615804 34:762939109 35:1480206277 36:2874398513 37:5586502346 38:10866266170
// runtime: 2694.1 s total
// ============================================================================
// READINGS
// ============================================================================
