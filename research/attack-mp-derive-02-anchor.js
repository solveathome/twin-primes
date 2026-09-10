// ============================================================================
// ATTACK mp-derive-02 — THE FORMULA-BAND TEST AT THE FRESH ANCHOR 1.32e11
// ============================================================================
// Producer of the test pre-registered in
// `research/history/staging/mp-window-prereg.md`, committed ALONE (5e0fd87)
// before this file existed. The prereg fixed the window [A, A + 2e9) at
// A = 132,000,000,000 (a multiple of 6; git grep finds no prior use of the
// anchor anywhere in the corpus), the 37-fold population, the predictive
// formula, all 37 sealed band pairs, three scoring criteria and every
// consequence.
//
// WHAT IS TESTED. `attack-mp-derive-01.js` (formally embedded; pinned in the
// prereg by code- and out-sha256) derived the fold-factor field of
// `perfold-error-model.md` as an arithmetic formula:
//     M_D4(p) = k * W1(theta_p) * exp(-delta * theta_p / mbar_p),
//     W1(v) = prod_{q|v}(q-2)/(q-4) * prod_{q|v-2 or v+2}(q-3)/(q-4),
//         over primes 5 <= q < p (zero parameters),
//     mbar_p = 6 * prod_{5<=q<p} q/(q-2) (analytic),
//     (k, delta) fitted ONLY on the 37 pooled folds p <= 293.
// The predictive for the unrun window is X_p ~ PLN(lambda_model(p,2e9) *
// M_D4(p), s0 = the formula's train residual sd), against the constant-bias
// rival D0 (M = b, its own s0). NO per-fold measured M enters any band: a
// HIT means the arithmetic transfers to an anchor never measured.
// Units on both sides: counts of adjacent kill pairs per fold (dimensionless).
//
// STAGES. A: the engine (copied VERBATIM from attack-foldL-06-scaling.js via
// attack-perfold-02-blindwindow.js) reproduces the embedded [0, 2e9)
// calibration digit for digit, and aborts on any mismatch. B: the whole
// derivation chain (parse embeds -> W1, mbar, train fit, PLN quantiles) is
// re-run at full precision and must reproduce every sealed band integer of
// the prereg, or abort. C: the fresh window is sieved. D: the three sealed
// criteria are scored and the fixed consequences applied mechanically.
// ============================================================================

'use strict';
const fs = require('fs');
const path = require('path');
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1);
const QMAX = 1500;                      // same fold range as angle 4: p to 1499
const CHUNK = Number(process.env.CHUNK || 1e8);
const BIGY = Number(process.env.BIGY || 2e10);
const STAGE = process.env.STAGE || 'all';   // 'predict' = stages A+B only

// ---- primes, folds, constants -------------------------------------------
const comp = new Uint8Array(QMAX + 1), primes = [];
for (let i = 2; i <= QMAX; i++) { if (!comp[i]) { primes.push(i); for (let j = i * i; j <= QMAX; j += i) comp[j] = 1; } }
const folds = primes.filter(q => q >= 5);
const F = folds.length;
const fidx = new Int32Array(QMAX + 2).fill(-1);
folds.forEach((q, j) => { fidx[q] = j; });
const INFK = QMAX + 1;
const theta = folds.map(p => 2 * p - 2 * ((p % 6 === 1) ? 1 : -1));
function modInv(a, m) { let g = m, x = 0, x1 = 1, a1 = a; while (a1 !== 0) { const qq = (g / a1) | 0; [g, a1] = [a1, g - qq * a1]; [x, x1] = [x1, x - qq * x1]; } return ((x % m) + m) % m; }
const inv6 = new Int32Array(QMAX + 1);
for (const q of folds) inv6[q] = modInv(6 % q, q);

console.log('folds: ' + F + ' primes from ' + folds[0] + ' to ' + folds[F - 1] +
  ';  chunk = ' + CHUNK.toExponential(0) + ' slots');

// ---- the streaming engine ------------------------------------------------
function runWindow(A, Y, label) {
  // n = A + 6i + 5 has to stay in the twin-slot class 5 (mod 6). An anchor that
  // is not a multiple of 6 silently walks a different residue class and every
  // number below it is a number about the wrong object. Caught exactly that way
  // on the first offset run, where A = 1e10 = 4 (mod 6) put the walk on n = 3
  // (mod 6), i.e. on multiples of 3.
  if (A % 6 !== 0) throw new Error('anchor A must be a multiple of 6, got ' + A);
  const t0 = Date.now();
  const M = Math.floor((Y - 5) / 6) + 1;          // n = A + 6i + 5, i < M
  const kills = new Float64Array(F), runsC = new Float64Array(F);
  const hist = new Float64Array(F * 10);          // run-length histogram, 9 = "9 or more"
  const maxL = new Int32Array(F);
  const candG = new Float64Array(F);              // gap candidate recorded at a level floor
  const stK = new Int32Array(F + 4), stPos = new Float64Array(F + 4), stRun = new Float64Array(F + 4);
  let sp = 0;
  const csize = Math.min(M, CHUNK);
  const key = new Uint16Array(csize);
  for (let i0 = 0; i0 < M; i0 += csize) {
    const i1 = Math.min(M, i0 + csize), len = i1 - i0;
    key.fill(0, 0, len);
    // smallest prime factor >= 5 of n(n+2): write folds in DECREASING order so
    // the smallest one to touch a slot is the one that survives, no read needed
    for (let fi = F - 1; fi >= 0; fi--) {
      const q = folds[fi], iv = inv6[q], Aq = A % q, off = i0 % q;
      for (let tt = 0; tt < 2; tt++) {
        const t = tt === 0 ? 0 : q - 2;           // n = 0 (mod q) or n = -2 (mod q)
        let s = (((t - 5 - Aq) % q) + q) % q;
        s = (s * iv) % q;                          // i = s (mod q)
        let st = ((s - off) % q + q) % q;
        for (let i = st; i < len; i += q) key[i] = q;
      }
    }
    for (let i = 0; i < len; i++) {
      const kk = key[i];
      const k = kk === 0 ? INFK : kk;
      const n = A + 6 * (i0 + i) + 5;
      let bidx = 0;
      while (sp > 0 && stK[sp - 1] < k) {
        sp--;
        const j = fidx[stK[sp]], rl = stRun[sp];
        runsC[j]++; if (rl > maxL[j]) maxL[j] = rl;
        hist[j * 10 + (rl < 9 ? rl : 9)]++;
        const g = n - stPos[sp];
        if (bidx < F && g > candG[bidx]) candG[bidx] = g;
        bidx = j + 1;
      }
      if (sp > 0) { const g = n - stPos[sp - 1]; if (bidx < F && g > candG[bidx]) candG[bidx] = g; }
      if (sp > 0 && stK[sp - 1] === k) { stRun[sp - 1]++; stPos[sp - 1] = n; }
      else { stK[sp] = k; stPos[sp] = n; stRun[sp] = 1; sp++; }
      if (kk !== 0) kills[fidx[kk]]++;
    }
  }
  while (sp > 0) {                                 // runs closed by the window end
    sp--;
    if (stK[sp] === INFK) continue;
    const j = fidx[stK[sp]], rl = stRun[sp];
    runsC[j]++; if (rl > maxL[j]) maxL[j] = rl; hist[j * 10 + (rl < 9 ? rl : 9)]++;
  }
  // running max upward gives the record gap of each level
  const G2b = new Float64Array(F);
  { let m = 0; for (let j = 0; j < F; j++) { if (candG[j] > m) m = candG[j]; G2b[j] = m; } }
  const rows = [];
  let N = M, surv = M;
  for (let j = 0; j < F; j++) {
    const Nb = surv; surv -= kills[j];
    rows.push({
      p: folds[j], j, theta: theta[j], kills: kills[j], runs: runsC[j],
      X: kills[j] - runsC[j], L: Math.max(1, maxL[j]),
      Nbefore: Nb, Nafter: surv, mbarB: Y / Nb, mbarA: Y / surv,
      thr: theta[j] / (Y / Nb), G2: G2b[j],
      hist: Array.from(hist.subarray(j * 10, j * 10 + 10)),
    });
  }
  const secs = (Date.now() - t0) / 1000;
  console.log('[' + el() + 's] ' + label + ': A = ' + A.toExponential(1) + ', Y = ' + Y.toExponential(1) +
    ', slots = ' + M + ', ' + secs.toFixed(1) + ' s');
  return { A, Y, M, rows, secs, label };
}

function summarise(w) {
  const r = w.rows;
  let lastLive = null, lastQual = null, n2 = 0, s1 = 0, n2d = 0, s1d = 0, sx = 0;
  for (const x of r) {
    if (x.L >= 2) { lastLive = x.p; n2++; s1 += x.L - 1; if (x.p >= 100) { n2d++; s1d += x.L - 1; } }
    if (x.theta <= x.G2) lastQual = x.p;
    sx += x.X;
  }
  return { lastLive, lastQual, n2, s1, n2d, s1d, sx, maxL: Math.max(...r.map(x => x.L)) };
}

// ---------------------------------------------------------------------------
// numerics shared by Stages B and D
// ---------------------------------------------------------------------------
function lgamma(x) {
  const g = [676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012,
    9.9843695780195716e-6, 1.5056327351493116e-7];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  x -= 1;
  let a = 0.99999999999980993;
  const t = x + 7.5;
  for (let i = 0; i < 8; i++) a += g[i] / (x + i + 1);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}
function logPois(x, mu) { mu = Math.max(mu, 1e-12); return x * Math.log(mu) - mu - lgamma(x + 1); }
function logPLN(x, mu, s) {
  if (s < 1e-4) return logPois(x, mu);
  const N = 61, LO = -5, HI = 5, h = (HI - LO) / (N - 1);
  let best = -Infinity; const terms = [];
  for (let i = 0; i < N; i++) {
    const u = LO + i * h;
    const w = (i === 0 || i === N - 1) ? 0.5 : 1;
    const lt = logPois(x, mu * Math.exp(s * u - s * s / 2)) - 0.5 * u * u + Math.log(w * h / Math.sqrt(2 * Math.PI));
    terms.push(lt); if (lt > best) best = lt;
  }
  let sum = 0; for (const lt of terms) sum += Math.exp(lt - best);
  return best + Math.log(sum);
}
function plnBands(mu, s) {
  const XMAX = 500; const cdf = []; let a = 0;
  for (let x = 0; x <= XMAX; x++) { a += Math.exp(logPLN(x, mu, s)); cdf.push(a); if (a > 1 - 1e-12 && x > 10 * mu + 20) break; }
  const q = t => { for (let x = 0; x < cdf.length; x++) if (cdf[x] >= t) return x; return cdf.length; };
  return { l90: q(0.05), u90: q(0.95), l99: q(0.00135), u99: q(0.99865) };
}

// ---------------------------------------------------------------------------
// Stage B machinery — the derivation chain, re-run at full precision
// (parse the SAME embeds attack-mp-derive-01.js parses, refit, re-derive
// every sealed band; abort if any integer moved)
// ---------------------------------------------------------------------------
function readEmbed(f) {
  const t = fs.readFileSync(path.join(__dirname, f), 'utf8');
  const i = t.lastIndexOf('OUTPUT — EMBEDDED');
  if (i < 0) throw new Error('no embedded OUTPUT block in ' + f);
  return t.slice(i);
}
function deriveSealedBands() {
  const srcP1 = readEmbed('attack-perfold-01-error-model.js');
  const src01 = readEmbed('attack-mp-derive-01.js');
  // pooled Mhat and Stage-4 lambda from perfold-01 (train inputs)
  const MPOOL = {}, POOL4 = {};
  {
    const a = srcP1.indexOf('pooled fold factors Mhat'), b = srcP1.indexOf('Stage 3b');
    const re = /^\/\/\s+(\d+)\s+(\d+)\s+([\d.]+)\s+([\d.]+)\s/;
    for (const l of srcP1.slice(a, b).split('\n')) { const m = l.match(re); if (m) MPOOL[+m[1]] = +m[3]; }
    const c = srcP1.indexOf('Stage 4: BLIND per-fold bands'), d = srcP1.indexOf('expected count inside');
    const re4 = /^\/\/\s+(\d+)\s+([\d.]+)\s+(\d+)\s+([\d.]+)\s+([\d.]+)\s+\[/;
    for (const l of srcP1.slice(c, d).split('\n')) { const m = l.match(re4); if (m) POOL4[+m[1]] = { lam: +m[2], Sx: +m[3], Sl: +m[4] }; }
  }
  const TRAIN = folds.filter(p => p >= 101 && p <= 293);
  if (Object.keys(MPOOL).length !== 48 || Object.keys(POOL4).length !== 37) throw new Error('Stage B parse drift');
  // W1, mbar analytic, z
  const isP = n => { if (n < 2) return false; for (let d2 = 2; d2 * d2 <= n; d2++) if (n % d2 === 0) return false; return true; };
  const W1 = {}, Z = {};
  {
    let m = 6;
    for (const p of folds) {
      const th = 2 * p - 2 * ((p % 6 === 1) ? 1 : -1);
      if (p >= 101 && p <= 293) {
        let w = 1;
        for (const q of folds) {
          if (q >= p) break;
          if (th % q === 0) w *= (q - 2) / (q - 4);
          else if ((th - 2) % q === 0 || (th + 2) % q === 0) w *= (q - 3) / (q - 4);
        }
        W1[p] = w; Z[p] = th / m;
      }
      m *= p / (p - 2);
    }
  }
  // the two train fits, exactly as attack-mp-derive-01.js declares them
  // the fit target is ln(Sx/Sl) at FULL precision (as attack-mp-derive-01
  // does); the printed 3-decimal Mhat is only a custody cross-check
  const ys = TRAIN.map(p => Math.log(POOL4[p].Sx / POOL4[p].Sl));
  for (const p of TRAIN) if (Math.abs(POOL4[p].Sx / POOL4[p].Sl - MPOOL[p]) > 0.0006) throw new Error('Mhat drift at ' + p);
  const d4in = TRAIN.map(p => Math.log(POOL4[p].Sx / POOL4[p].Sl) - Math.log(W1[p]));
  const zs = TRAIN.map(p => Z[p]);
  const n = TRAIN.length;
  let sx = 0, sy = 0, sxy = 0, sxx = 0;
  for (let i = 0; i < n; i++) { sx += zs[i]; sy += d4in[i]; sxy += zs[i] * d4in[i]; sxx += zs[i] * zs[i]; }
  const slope = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const a4 = (sy - slope * sx) / n;
  let ss = 0; for (let i = 0; i < n; i++) { const r = d4in[i] - a4 - slope * zs[i]; ss += r * r; }
  const s0 = Math.sqrt(ss / (n - 2));
  const a0 = ys.reduce((s, x) => s + x, 0) / n;
  let ss0 = 0; for (const y of ys) ss0 += (y - a0) * (y - a0);
  const s0r = Math.sqrt(ss0 / (n - 1));
  console.log('  re-derived: k = ' + Math.exp(a4).toFixed(4) + '  delta = ' + (-slope).toFixed(4) +
    '  s0 = ' + s0.toFixed(3) + '  |  b = ' + Math.exp(a0).toFixed(3) + '  s0_rival = ' + s0r.toFixed(3));
  // the sealed table, re-derived
  const seal = [];
  for (const p of TRAIN) {
    const lam = POOL4[p].lam;
    const mu4 = lam * Math.exp(a4 + Math.log(W1[p]) + slope * Z[p]);
    const mu0 = lam * Math.exp(a0);
    seal.push({ p, lam, mu4, mu0, s0, s0r, ...plnBands(mu4, s0) });
  }
  // custody: every sealed band integer in the prereg table quoted from the
  // embedded Stage 7 of attack-mp-derive-01.js must reproduce
  const sec = src01.slice(src01.indexOf('Stage 7: sealed D4-formula bands'));
  const re7 = /^\/\/\s+(\d+)\s+([\d.]+)\s+([\d.]+)\s+\[(\d+), (\d+)\]\s*\[(\d+), (\d+)\]/;
  let nOK = 0;
  for (const l of sec.split('\n')) {
    const m = l.match(re7); if (!m) continue;
    const p = +m[1], row = seal.find(r => r.p === p);
    if (!row) throw new Error('sealed fold ' + p + ' missing');
    if (row.l90 !== +m[4] || row.u90 !== +m[5] || row.l99 !== +m[6] || row.u99 !== +m[7] ||
        Math.abs(row.mu4 - +m[3]) > 0.005) throw new Error('sealed band drift at p = ' + p);
    nOK++;
  }
  if (nOK !== 37) throw new Error('sealed table incomplete: ' + nOK);
  console.log('  ' + nOK + ' of 37 sealed band rows re-derived exactly  OK');
  return seal;
}

// ---------------------------------------------------------------------------
// Stage A — calibration on [0, 2e9), digit for digit against the record
// ---------------------------------------------------------------------------
console.log('\n############ STAGE A — calibration, [0, 2e9), digit for digit ############');
{
  const w = runWindow(0, 2e9, 'calibration');
  const s = summarise(w);
  const row = p => w.rows[fidx[p]];
  const checks = [
    ['slots', w.M, 333333333],
    ['fold 7   X', row(7).X, 19047619],
    ['fold 23  X', row(23).X, 106418],
    ['fold 29  X', row(29).X, 75336],
    ['fold 421 kills', row(421).kills, 105790],
    ['fold 421 runs', row(421).runs, 105789],
    ['fold 421 X', row(421).X, 1],
    ['N2(p >= 100)', s.n2d, 37],
    ['sum X', s.sx, 20317943],
    ['last L >= 2 fold', s.lastLive, 421],
    ['last theta <= G2 fold', s.lastQual, 1021],
  ];
  for (const [name, got, want] of checks) {
    const ok = got === want;
    console.log('  ' + (ok ? 'OK  ' : 'FAIL') + '  ' + name.padEnd(24) + ' got ' + got + '  record ' + want);
    if (!ok) throw new Error('calibration mismatch: ' + name);
  }
}

// ---------------------------------------------------------------------------
// Stage B — the sealed bands re-derived from the committed chain
// ---------------------------------------------------------------------------
console.log('\n############ STAGE B — sealed bands re-derived at full precision ############');
const SEAL = deriveSealedBands();

if (STAGE === 'predict') { console.log('[' + el() + 's] STAGE=predict: stopping before the fresh anchor.'); process.exit(0); }

// ---------------------------------------------------------------------------
// Stage C — the measurement at the fresh anchor
// ---------------------------------------------------------------------------
console.log('\n############ STAGE C — MEASUREMENT, [1.32e11, 1.32e11 + 2e9), anchor never used ############');
const ANCHOR = 132000000000;
const WNEW = runWindow(ANCHOR, 2e9, 'fresh window');
{
  const s = summarise(WNEW);
  console.log('  for the record (NOT scored): N2(p>=100) = ' + s.n2d + ';  sum X = ' + s.sx +
    ';  last L >= 2 fold = ' + s.lastLive + ';  max L = ' + s.maxL);
}

// ---------------------------------------------------------------------------
// Stage D — the pre-registered score
// ---------------------------------------------------------------------------
console.log('\n############ STAGE D — the pre-registered score ############');
{
  let in90 = 0, out99 = 0, margin = 0;
  console.log('    p    mu_D4     90% band       99.73% band     X meas   in90  in99.7');
  for (const r of SEAL) {
    const X = WNEW.rows[fidx[r.p]].X;
    const i90 = X >= r.l90 && X <= r.u90;
    const i99 = X >= r.l99 && X <= r.u99;
    if (i90) in90++;
    if (!i99) out99++;
    margin += logPLN(X, r.mu4, r.s0) - logPLN(X, r.mu0, r.s0r);
    console.log('  ' + String(r.p).padStart(5) + r.mu4.toFixed(2).padStart(9) +
      ('   [' + r.l90 + ', ' + r.u90 + ']').padEnd(15) + ('[' + r.l99 + ', ' + r.u99 + ']').padEnd(15) +
      String(X).padStart(6) + (i90 ? '   yes' : '   NO ') + (i99 ? '   yes' : '   NO '));
  }
  const pa = in90 >= 28, pb = out99 <= 1, pc = margin > 0;
  console.log('\n  (a) inside 90% bands:     ' + in90 + ' of 37   (prereg: HIT needs >= 28)  -> ' + (pa ? 'PASS' : 'FAIL'));
  console.log('  (b) outside 99.73% bands: ' + out99 + ' of 37   (prereg: HIT allows <= 1)  -> ' + (pb ? 'PASS' : 'FAIL'));
  console.log('  (c) PLN loglik margin D4 - D0 = ' + margin.toFixed(1) + ' nats  (prereg: > 0)  -> ' + (pc ? 'PASS' : 'FAIL'));
  console.log('\n  VERDICT UNDER THE PRE-REGISTERED RULE: ' + (pa && pb && pc ? 'HIT' :
    (pa && pb ? 'CONSISTENT, NOT CONFIRMED (c failed)' : 'MISS')));
}

console.log('\n// ============================================================');
console.log('// READINGS');
console.log('// ============================================================');
console.log('// 1. Stage A: the copied engine reproduces the embedded [0, 2e9) record');
console.log('//    digit for digit (11 of 11), so the instrument is the record engine.');
console.log('// 2. Stage B: the full derivation chain (embeds -> W1 -> mbar -> train fit');
console.log('//    -> PLN quantiles) re-derives all 37 sealed band pairs integer-exactly;');
console.log('//    no drift between the prereg and this producer.');
console.log('// 3. Stage D scores the three sealed criteria; the consequences are fixed');
console.log('//    in mp-window-prereg.md sections 3-4 and apply mechanically. Nothing');
console.log('//    here bears on the aggregate law, its WEAKENED grade, or H-doubleprime.');
console.log('// [' + el() + 's] done');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-mp-derive-02-anchor.js
//   invocation:  node research/attack-mp-derive-02-anchor.js
//   code-sha256: 0a83def0fa7c35da40fcb98a9d13d2a14528073fc598570b410d3d9f716f30d6
//   out-sha256:  8f7c0ac2860affbb22105b24eea0219899803aa85e5f4c126c32213977b38b92
//   body-lines:  82
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     15.8 s
// ============================================================================
// folds: 237 primes from 5 to 1499;  chunk = 1e+8 slots
//
// ############ STAGE A — calibration, [0, 2e9), digit for digit ############
// [7.8s] calibration: A = 0.0e+0, Y = 2.0e+9, slots = 333333333, 7.8 s
//   OK    slots                    got 333333333  record 333333333
//   OK    fold 7   X               got 19047619  record 19047619
//   OK    fold 23  X               got 106418  record 106418
//   OK    fold 29  X               got 75336  record 75336
//   OK    fold 421 kills           got 105790  record 105790
//   OK    fold 421 runs            got 105789  record 105789
//   OK    fold 421 X               got 1  record 1
//   OK    N2(p >= 100)             got 37  record 37
//   OK    sum X                    got 20317943  record 20317943
//   OK    last L >= 2 fold         got 421  record 421
//   OK    last theta <= G2 fold    got 1021  record 1021
//
// ############ STAGE B — sealed bands re-derived at full precision ############
//   re-derived: k = 1.9468  delta = 0.2771  s0 = 0.177  |  b = 0.750  s0_rival = 0.563
//   37 of 37 sealed band rows re-derived exactly  OK
//
// ############ STAGE C — MEASUREMENT, [1.32e11, 1.32e11 + 2e9), anchor never used ############
// [15.7s] fresh window: A = 1.3e+11, Y = 2.0e+9, slots = 333333333, 7.9 s
//   for the record (NOT scored): N2(p>=100) = 39;  sum X = 20317819;  last L >= 2 fold = 397;  max L = 3
//
// ############ STAGE D — the pre-registered score ############
//     p    mu_D4     90% band       99.73% band     X meas   in90  in99.7
//     101   204.94   [146, 274]  [111, 351]        279   NO    yes
//     103   221.14   [158, 296]  [120, 378]        285   yes   yes
//     107   146.69   [104, 198]  [77, 254]         136   yes   yes
//     109   157.89   [112, 212]  [84, 272]         131   yes   yes
//     113   291.52   [210, 388]  [161, 496]        253   yes   yes
//     127   222.36   [159, 297]  [121, 380]        183   yes   yes
//     131    96.69   [67, 132]   [49, 170]          76   yes   yes
//     137    45.88   [30, 65]    [20, 85]           68   NO    yes
//     139    49.25   [32, 69]    [22, 90]           49   yes   yes
//     149    78.20   [53, 107]   [38, 139]          75   yes   yes
//     151    83.86   [58, 115]   [41, 148]          87   yes   yes
//     157    56.18   [37, 78]    [26, 102]          49   yes   yes
//     163    24.94   [15, 37]    [9, 49]            23   yes   yes
//     167    26.80   [16, 39]    [10, 52]           21   yes   yes
//     173    33.69   [21, 48]    [13, 64]           45   yes   yes
//     179    28.48   [17, 41]    [10, 55]           39   yes   yes
//     181    30.42   [19, 44]    [12, 58]           44   yes   yes
//     191     6.32   [2, 11]     [0, 16]             7   yes   yes
//     193     6.75   [3, 12]     [0, 17]             5   yes   yes
//     197     7.14   [3, 12]     [0, 18]            10   yes   yes
//     199     7.62   [3, 13]     [1, 19]            14   NO    yes
//     211    22.81   [13, 34]    [8, 45]            23   yes   yes
//     223     3.03   [0, 6]      [0, 10]             5   yes   yes
//     227     2.26   [0, 5]      [0, 8]              0   yes   yes
//     229     2.42   [0, 5]      [0, 9]              3   yes   yes
//     233     4.46   [1, 8]      [0, 13]             5   yes   yes
//     239     4.45   [1, 8]      [0, 13]             8   yes   yes
//     241     4.75   [1, 9]      [0, 13]             5   yes   yes
//     251     2.09   [0, 5]      [0, 8]              3   yes   yes
//     257     1.26   [0, 3]      [0, 6]              1   yes   yes
//     263     1.93   [0, 5]      [0, 8]              3   yes   yes
//     269     1.86   [0, 4]      [0, 7]              2   yes   yes
//     271     1.98   [0, 5]      [0, 8]              2   yes   yes
//     277     1.40   [0, 4]      [0, 6]              0   yes   yes
//     281     0.49   [0, 2]      [0, 4]              1   yes   yes
//     283     0.52   [0, 2]      [0, 4]              0   yes   yes
//     293     1.15   [0, 3]      [0, 6]              3   yes   yes
//
//   (a) inside 90% bands:     34 of 37   (prereg: HIT needs >= 28)  -> PASS
//   (b) outside 99.73% bands: 0 of 37   (prereg: HIT allows <= 1)  -> PASS
//   (c) PLN loglik margin D4 - D0 = 25.4 nats  (prereg: > 0)  -> PASS
//
//   VERDICT UNDER THE PRE-REGISTERED RULE: HIT
//
// // ============================================================
// // READINGS
// // ============================================================
// // 1. Stage A: the copied engine reproduces the embedded [0, 2e9) record
// //    digit for digit (11 of 11), so the instrument is the record engine.
// // 2. Stage B: the full derivation chain (embeds -> W1 -> mbar -> train fit
// //    -> PLN quantiles) re-derives all 37 sealed band pairs integer-exactly;
// //    no drift between the prereg and this producer.
// // 3. Stage D scores the three sealed criteria; the consequences are fixed
// //    in mp-window-prereg.md sections 3-4 and apply mechanically. Nothing
// //    here bears on the aggregate law, its WEAKENED grade, or H-doubleprime.
// // [15.7s] done
// ============================================================================
// READINGS
//
