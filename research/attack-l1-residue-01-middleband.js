// ============================================================================
// ATTACK L1-RESIDUE 01 — the L = 1 residue count of the Localized Transport
// Chain, measured exactly, and its middle band located
// ============================================================================
// THE TARGET. `verify-tailcount-transport.md` §(e) states the Localized
// Transport Chain and reduces it, past the qualifying-supply collapse, to one
// counting hypothesis:
//
//     SUM_p  #{ i : g_i + g_{i+1} >= theta  and  slot i+1 = 0 or -2 (mod p) } < 1
//
// with g the gap word of the window AFTER folding by every prime < p, and theta
// the zone budget. `attack-foldL-04-amortized.md` reaches the same statement
// from the genealogy side; `attack-foldL-06-scaling.md` measures the collapse
// (no interior gap qualifies past p = 701 in the 2e9 window) that removes every
// L >= 2 term. Everything on the destruction side of the Zone Postulate rests
// on this one line. This script measures it exactly, term by term.
//
// THE OBJECT, RESTATED PER SLOT. Let B(p) = { n in the window : key(n) = 0 or
// key(n) >= p } be the word BEFORE fold p, key(n) = min{ q prime >= 5 :
// q | n(n+2) }. For a slot s in B(p) with both neighbours present, its SPAN at
// level p is
//
//     span_p(s) = succ_{B(p)}(s) - pred_{B(p)}(s)   ( = g_i + g_{i+1} )
//
// Then, exactly,
//     R_1^(p)(theta) = #{ s in B(p) : key(s) = p, span_p(s) >= theta }
//     N_2^(p)(theta) = #{ s in B(p) :            span_p(s) >= theta }
// R_1 is the hypothesis's summand; N_2 is the same count with the residue
// condition dropped. Their ratio is the entire content of the residue
// condition, and it is what a "free 2/p" claim would have to deliver.
//
// WHY "slot = 0 or -2 (mod p)" IS "key(s) = p" AND NOT A RELAXATION. s lies in
// B(p), so key(s) = 0 or key(s) >= p. If p | s(s+2) then key(s) <= p unless
// key(s) = 0; and key(s) = 0 means no prime <= QMAX divides s(s+2), which p
// does. So key(s) = p exactly. The converse is the definition. The residue
// condition inside the current word IS the kill condition, with no slack. This
// is asserted numerically in Stage A by brute force on a small window.
//
// PRE-REGISTRATION (parameter-free; no calibration window is needed and none is
// fitted). Stated here before any window was run:
//   P1  residue-is-kill: the brute-force residue count equals the key count at
//       every fold of the check window, exactly.
//   P2  the free-2/p claim, at theta = 0: R_1^(p)(0)/N_2^(p)(0) = kills/N =
//       2/p + O(1/Y) at every fold. This is the calibration, not the test.
//   P3  THE TEST: at theta well inside the tail the same ratio still equals
//       2/p. Scored on the pooled ratio over folds p >= 100 at theta = 3*mbar
//       and theta = 6*mbar, accepted if inside 2 Poisson sd of 2/p.
//   P4  T* := max over p, s of span_p(s) restricted to key(s) = p, i.e. the
//       exact threshold at which the hypothesis's sum falls to zero, satisfies
//       G2(window) <= T* <= 2*G2(window), with G2 the fold-1499 record gap of
//       `attack-foldL-06-scaling.md` §4: 1458, 1560, 2220, 2220 at
//       Y = 2e7, 2e8, 2e9, 2e10.
//   P5  the zone budget for the fold set p <= 1499 is theta_zone = 1511^2 - 2 =
//       2283119. Predicted: T* / theta_zone < 1/300 at every window, i.e. the
//       "live middle band" of the hypothesis is empty at every computable
//       scale by two and a half orders of magnitude.
//   P6  at fixed theta the sum SUM_p R_1^(p)(theta) is linear in Y (the window
//       is a bounded population with no height drift, by the exact periodicity
//       of key(n) proven in foldL-06 §3.2). Accepted at 10%.
//
// ENGINE. The chunked key sieve and the anchor guard are `attack-foldL-06-
// scaling.js`'s, reused unchanged. What is new is the second pass: instead of
// the decreasing-key stack (which measures kill RUNS) this keeps, per fold, the
// last two members of B(p) and their keys, so every slot's span at every level
// it survives to is emitted exactly once. Cost is sum over slots of pi(key),
// which is small because most slots have a small key.
// ============================================================================

'use strict';
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1);

const QMAX = 1500;                      // same fold range as angles 4 and 6
const CHUNK = Number(process.env.CHUNK || 1e8);
const BIGY = Number(process.env.BIGY || 2e10);
const NB = 1400;                        // span buckets of width 6 -> spans to 8394
const BW = 6;

// ---- primes, folds -------------------------------------------------------
const comp = new Uint8Array(QMAX + 1), primes = [];
for (let i = 2; i <= QMAX; i++) { if (!comp[i]) { primes.push(i); for (let j = i * i; j <= QMAX; j += i) comp[j] = 1; } }
const folds = primes.filter(q => q >= 5);
const F = folds.length;
const fidx = new Int32Array(QMAX + 2).fill(-1);
folds.forEach((q, j) => { fidx[q] = j; });
// jOf[k] = largest fold index j with folds[j] <= k   (k = key of a slot)
const jOf = new Int32Array(QMAX + 2).fill(-1);
{ let j = -1; for (let k = 0; k <= QMAX + 1; k++) { if (fidx[k] >= 0) j = fidx[k]; jOf[k] = j; } }
function modInv(a, m) { let g = m, x = 0, x1 = 1, a1 = a; while (a1 !== 0) { const qq = (g / a1) | 0; [g, a1] = [a1, g - qq * a1]; [x, x1] = [x1, x - qq * x1]; } return ((x % m) + m) % m; }
const inv6 = new Int32Array(QMAX + 1);
for (const q of folds) inv6[q] = modInv(6 % q, q);

const THETA_ZONE = 1511 * 1511 - 2;     // zone budget of the fold set p <= 1499

console.log('folds: ' + F + ' primes from ' + folds[0] + ' to ' + folds[F - 1] +
  ';  chunk = ' + CHUNK.toExponential(0) + ' slots;  span buckets ' + NB + ' x ' + BW);

// ---- key sieve, chunked (foldL-06's, unchanged) --------------------------
function fillKeys(key, A, i0, len) {
  key.fill(0, 0, len);
  for (let fi = F - 1; fi >= 0; fi--) {
    const q = folds[fi], iv = inv6[q], Aq = A % q, off = i0 % q;
    for (let tt = 0; tt < 2; tt++) {
      const t = tt === 0 ? 0 : q - 2;
      let s = (((t - 5 - Aq) % q) + q) % q;
      s = (s * iv) % q;
      let st = ((s - off) % q + q) % q;
      for (let i = st; i < len; i += q) key[i] = q;
    }
  }
}

// ---- the span pass -------------------------------------------------------
function runWindow(A, Y, label) {
  if (A % 6 !== 0) throw new Error('anchor A must be a multiple of 6, got ' + A);
  const t0 = Date.now();
  const M = Math.floor((Y - 5) / 6) + 1;
  // level index j = 0..F-1 is B(folds[j]), the word BEFORE fold folds[j];
  // level index F is the FULLY FOLDED word { key = 0 }, which carries no kills.
  const LV = F + 1;
  const prev1 = new Float64Array(LV).fill(-1);  // last member of the level seen
  const prev2 = new Float64Array(LV).fill(-1);  // the one before it
  const pkey = new Int32Array(LV).fill(-1);     // key of prev1 (0 -> QMAX+1)
  const nIn = new Float64Array(LV);             // |B(p)| in the window
  const kills = new Float64Array(F);            // slots with key = p
  const histK = new Float64Array(F * NB);       // killed-slot spans
  const histA = new Float64Array(LV * NB);      // all-slot spans
  const maxK = new Float64Array(F);
  const maxA = new Float64Array(LV);
  const maxG = new Float64Array(LV);            // record GAP of each level
  let ovf = 0, inner = 0;
  const csize = Math.min(M, CHUNK);
  const key = new Uint16Array(csize);
  for (let i0 = 0; i0 < M; i0 += csize) {
    const i1 = Math.min(M, i0 + csize), len = i1 - i0;
    fillKeys(key, A, i0, len);
    for (let i = 0; i < len; i++) {
      const kk = key[i];
      const n = A + 6 * (i0 + i) + 5;
      const jmax = kk === 0 ? F : jOf[kk];
      const kreal = kk === 0 ? QMAX + 1 : kk;
      if (kk !== 0) kills[fidx[kk]]++;
      inner += jmax + 1;
      for (let j = 0; j <= jmax; j++) {
        nIn[j]++;
        const p1 = prev1[j];
        if (p1 >= 0) {
          const gp = n - p1; if (gp > maxG[j]) maxG[j] = gp;
          const p2 = prev2[j];
          if (p2 >= 0) {
            const span = n - p2;
            let b = (span / BW) | 0; if (b >= NB) { b = NB - 1; ovf++; }
            histA[j * NB + b]++;
            if (span > maxA[j]) maxA[j] = span;
            if (j < F && pkey[j] === folds[j]) {
              histK[j * NB + b]++;
              if (span > maxK[j]) maxK[j] = span;
            }
          }
          prev2[j] = p1;
        }
        prev1[j] = n; pkey[j] = kreal;
      }
    }
  }
  const rows = [];
  for (let j = 0; j < F; j++) {
    rows.push({
      p: folds[j], j, N: nIn[j], kills: kills[j], mbar: Y / nIn[j],
      maxK: maxK[j], maxA: maxA[j], maxG: maxG[j],
      hK: histK.subarray(j * NB, (j + 1) * NB), hA: histA.subarray(j * NB, (j + 1) * NB),
    });
  }
  const fin = { N: nIn[F], maxA: maxA[F], maxG: maxG[F], hA: histA.subarray(F * NB, (F + 1) * NB) };
  const secs = (Date.now() - t0) / 1000;
  console.log('[' + el() + 's] ' + label + ': A = ' + A.toExponential(1) + ', Y = ' + Y.toExponential(1) +
    ', slots = ' + M + ', inner/slot = ' + (inner / M).toFixed(2) + ', overflow spans = ' + ovf +
    ', ' + secs.toFixed(1) + ' s');
  return { A, Y, M, rows, fin, secs, label };
}

// tail counts from a bucket histogram: #{ span >= theta }
function tail(h, theta) {
  let b = Math.ceil(theta / BW); if (b < 0) b = 0;
  let s = 0; for (let i = b; i < NB; i++) s += h[i];
  return s;
}
function sumR1(w, theta) { let s = 0; for (const r of w.rows) s += tail(r.hK, theta); return s; }
function sumN2(w, theta) { let s = 0; for (const r of w.rows) s += tail(r.hA, theta); return s; }

// ==========================================================================
// STAGE A — the residue-is-kill lemma, brute force
// ==========================================================================
console.log('');
console.log('############ STAGE A — "slot = 0 or -2 (mod p)" IS "key = p", brute force ############');
{
  const Y = 6e6, A = 0, M = Math.floor((Y - 5) / 6) + 1;
  const key = new Uint16Array(M);
  fillKeys(key, A, 0, M);
  let bad = 0, checked = 0, tot = 0;
  for (let j = 0; j < F; j++) {
    const p = folds[j];
    let cRes = 0, cKey = 0;
    for (let i = 0; i < M; i++) {
      const kk = key[i], n = A + 6 * i + 5;
      const inB = (kk === 0 || kk >= p);
      if (!inB) continue;
      const r = n % p;
      if (r === 0 || r === p - 2) cRes++;
      if (kk === p) cKey++;
    }
    checked++; tot += cKey;
    if (cRes !== cKey) { bad++; if (bad <= 5) console.log('  MISMATCH p = ' + p + ': residue ' + cRes + ' vs key ' + cKey); }
  }
  console.log('  window [0, 6e6), ' + checked + ' folds, ' + tot + ' killed slots total');
  console.log('  ' + (bad === 0
    ? 'P1 HOLDS: residue count = key count at all ' + checked + ' folds, exactly. The residue condition is not a relaxation.'
    : 'P1 FAILS at ' + bad + ' folds.'));
}

// ==========================================================================
// STAGE B — the four windows
// ==========================================================================
console.log('');
console.log('############ STAGE B — the L = 1 sum measured exactly, four windows ############');
const WINS = [
  runWindow(0, 2e7, 'Y = 2e7'),
  runWindow(0, 2e8, 'Y = 2e8'),
  runWindow(0, 2e9, 'Y = 2e9'),
];
if (process.env.SKIPBIG !== '1') WINS.push(runWindow(0, BIGY, 'Y = ' + BIGY.toExponential(0)));

console.log('');
console.log('--- B1. calibration against the embedded tails of foldL-04/06 ---');
{
  const w = WINS[2];
  const R = p => w.rows[fidx[p]];
  const EXPECT = [
    ['slots (n = 5 mod 6)', w.M, 333333333],
    ['fold 7   |B(7)|', R(7).N, 200000000],
    ['fold 7   kills', R(7).kills, 57142857],
    ['fold 23  kills', R(23).kills, 6789558],
    ['fold 421 kills', R(421).kills, 105790],
    ['fold 1451 kills', R(1451).kills, 21565],
  ];
  let bad = 0;
  for (const [name, got, want] of EXPECT) {
    const ok = got === want; if (!ok) bad++;
    console.log('  ' + (ok ? 'OK  ' : 'FAIL') + '  ' + name.padEnd(30) + ' got ' + String(got).padStart(11) + '   record ' + String(want).padStart(11));
  }
  console.log('  |B(1499)| after all folds is not a record figure; measured N(1499) = ' + R(1499).N);
  console.log('  ' + (bad === 0 ? 'CALIBRATION CLEAN.' : 'CALIBRATION BROKEN: ' + bad + ' figure(s).'));
}

console.log('');
console.log('--- B2. T*: the exact threshold at which the hypothesis sum falls to 0 ---');
console.log('  T* = max over folds p and slots s of span_p(s) with key(s) = p.');
console.log('  M2* = the same with the residue condition dropped (= max_p maxsum_2(B(p))).');
const G2REC = { '2e+7': 1458, '2e+8': 1560, '2e+9': 2220, '2e+10': 2220 };
console.log('');
console.log('  G2fin = record gap of the fully folded word { key = 0 }, measured here.');
console.log('');
console.log('  Y        | T*   | M2*  | G2fin | G2(rec) | T*/G2fin | theta_zone | T*/theta_zone | P5 <1/300?');
for (const w of WINS) {
  const Ts = Math.max(...w.rows.map(r => r.maxK));
  const Ms = Math.max(...w.rows.map(r => r.maxA));
  const yk = w.Y.toExponential(0);
  const g2 = G2REC[yk];
  const gf = w.fin.maxG;
  console.log('  ' + yk.padEnd(8) + ' | ' + String(Ts).padStart(4) + ' | ' + String(Ms).padStart(4) + ' | ' +
    String(gf).padStart(5) + ' | ' + String(g2).padStart(7) + ' | ' + (Ts / gf).toFixed(4).padStart(8) + ' | ' +
    String(THETA_ZONE).padStart(10) + ' | ' + (Ts / THETA_ZONE).toExponential(3) + ' | ' +
    ((Ts / THETA_ZONE < 1 / 300) ? 'yes' : 'NO'));
}
console.log('');
console.log('  THE EQUIVALENCE, asserted: T* = G2fin at every window (the hypothesis sum');
console.log('  falls below 1 at exactly the threshold at which the Zone Postulate does).');
for (const w of WINS) {
  const Ts = Math.max(...w.rows.map(r => r.maxK));
  console.log('    ' + w.Y.toExponential(0).padEnd(7) + ' T* = ' + Ts + ', G2fin = ' + w.fin.maxG + '  -> ' + (Ts === w.fin.maxG ? 'EQUAL' : 'DIFFERENT'));
}
console.log('');
console.log('  record gap per level (max over consecutive pairs of B(p)), 2e9 window,');
console.log('  against the maxsum_2 of the same level (the L = 1 transport bound):');
{
  const w = WINS[2];
  console.log('      p |  G2(B(p)) | maxsum_2(B(p)) | ratio  | record G_loc / maxsum2 (verify-tailcount (e))');
  const REC = { 17: [108, 150], 31: [300, 372], 61: [498, 588], 101: [642, 798], 211: [900, 1080], 421: [1170, 1470], 701: [1446, 1848], 1103: [2052, 2220], 1499: [null, 2262] };
  for (const p of [17, 31, 61, 101, 211, 421, 701, 1103, 1499]) {
    const r = w.rows[fidx[p]], rec = REC[p];
    console.log('  ' + String(p).padStart(6) + ' | ' + String(r.maxG).padStart(9) + ' | ' + String(r.maxA).padStart(14) +
      ' | ' + (r.maxA / r.maxG).toFixed(3) + '  | record ' + JSON.stringify(rec));
  }
}

console.log('');
console.log('--- B3. the theta-curve of the hypothesis: SUM_p R_1^(p)(theta), and SUM_p N_2^(p)(theta) ---');
{
  const TH = [0, 6, 60, 150, 300, 450, 600, 900, 1200, 1500, 1800, 2100, 2400, 3000, 3600, 4200];
  console.log('  theta    ' + WINS.map(w => ('R1[' + w.Y.toExponential(0) + ']').padStart(15)).join(''));
  for (const th of TH) {
    console.log('  ' + String(th).padStart(6) + '   ' + WINS.map(w => sumR1(w, th).toExponential(4).padStart(15)).join(''));
  }
  console.log('');
  console.log('  theta    ' + WINS.map(w => ('N2[' + w.Y.toExponential(0) + ']').padStart(15)).join(''));
  for (const th of TH) {
    console.log('  ' + String(th).padStart(6) + '   ' + WINS.map(w => sumN2(w, th).toExponential(4).padStart(15)).join(''));
  }
  console.log('');
  console.log('  last theta (multiple of 6) with SUM_p R_1 >= 1, and the value there:');
  for (const w of WINS) {
    const Ts = Math.max(...w.rows.map(r => r.maxK));
    console.log('    ' + w.Y.toExponential(0).padEnd(7) + ' theta = ' + String(Ts).padStart(5) +
      '  SUM R_1 = ' + sumR1(w, Ts) + '   at theta+6: ' + sumR1(w, Ts + 6));
  }
}

console.log('');
console.log('--- B4. P6, linearity in Y at fixed theta ---');
{
  const TH = [300, 600, 900, 1200];
  console.log('  theta |   ratio R1(2e8)/R1(2e7) | R1(2e9)/R1(2e8) | R1(2e10)/R1(2e9)  (predicted 10 each)');
  for (const th of TH) {
    const v = WINS.map(w => sumR1(w, th));
    const rs = [];
    for (let i = 1; i < v.length; i++) rs.push(v[i - 1] > 0 ? (v[i] / v[i - 1]).toFixed(3) : 'n/a');
    console.log('  ' + String(th).padStart(5) + ' |   ' + rs.map(s => s.padStart(15)).join(' '));
  }
}

console.log('');
console.log('--- B5. per-fold profile of the L = 1 sum in the 2e9 window ---');
{
  const w = WINS[2];
  const TH = [300, 600, 900, 1200];
  console.log('    p |     |B(p)| |  kills | 2/p      | mbar   | maxK | maxA | ' + TH.map(t => ('R1(' + t + ')').padStart(10)).join('') + ' | ' + TH.map(t => ('N2(' + t + ')').padStart(11)).join(''));
  for (const p of [5, 7, 11, 13, 17, 19, 23, 29, 31, 61, 101, 211, 421, 701, 1021, 1103, 1499]) {
    const r = w.rows[fidx[p]];
    console.log('  ' + String(p).padStart(4) + ' | ' + r.N.toExponential(4).padStart(10) + ' | ' + r.kills.toExponential(2).padStart(6) +
      ' | ' + (2 / p).toExponential(2) + ' | ' + r.mbar.toFixed(2).padStart(6) + ' | ' + String(r.maxK).padStart(4) + ' | ' + String(r.maxA).padStart(4) +
      ' | ' + TH.map(t => tail(r.hK, t).toExponential(3).padStart(10)).join('') +
      ' | ' + TH.map(t => tail(r.hA, t).toExponential(3).padStart(11)).join(''));
  }
}

console.log('');
console.log('--- B6. P2/P3: is the residue condition worth a free factor 2/p in the tail? ---');
{
  for (const w of WINS) {
    console.log('  window ' + w.Y.toExponential(0) + ':');
    console.log('     regime          |     R_1      |     N_2      | ratio     | 2/p pooled | ratio/(2/p) | 2 sd band');
    const bands = [['p >= 100, theta = 0', 100, 0], ['p >= 100, theta = 3 mbar', 100, -3], ['p >= 100, theta = 6 mbar', 100, -6],
    ['all p,    theta = 3 mbar', 5, -3], ['all p,    theta = 6 mbar', 5, -6]];
    for (const [nm, pmin, thc] of bands) {
      let R = 0, N = 0, wsum = 0;
      for (const r of w.rows) {
        if (r.p < pmin) continue;
        const th = thc <= 0 ? (-thc) * r.mbar : thc;
        const n2 = tail(r.hA, th), r1 = tail(r.hK, th);
        R += r1; N += n2; wsum += n2 * (2 / r.p);
      }
      const ratio = N > 0 ? R / N : NaN, exp = N > 0 ? wsum / N : NaN;
      const sd = N > 0 ? Math.sqrt(wsum) / N : NaN;
      const ok = Math.abs(ratio - exp) <= 2 * sd;
      console.log('     ' + nm.padEnd(16) + '| ' + R.toExponential(4).padStart(12) + ' | ' + N.toExponential(4).padStart(12) + ' | ' +
        ratio.toExponential(3) + ' | ' + exp.toExponential(3) + ' | ' + (ratio / exp).toFixed(4).padStart(11) + ' | ' + (ok ? 'inside' : 'OUTSIDE'));
    }
  }
}

console.log('');
console.log('--- B7. the same ratio fold by fold, 2e9 window, theta = 3 mbar ---');
{
  const w = WINS[2];
  console.log('    p |    N_2      |   R_1    | R_1/N_2   |  2/p     | ratio/(2/p) | +-2sd');
  for (const p of [17, 31, 61, 101, 211, 421, 701, 1021, 1103, 1499]) {
    const r = w.rows[fidx[p]], th = 3 * r.mbar;
    const n2 = tail(r.hA, th), r1 = tail(r.hK, th), e = n2 * 2 / r.p, sd = Math.sqrt(e);
    console.log('  ' + String(p).padStart(4) + ' | ' + n2.toExponential(4).padStart(11) + ' | ' + r1.toExponential(2).padStart(8) +
      ' | ' + (n2 ? (r1 / n2).toExponential(3) : 'n/a') + ' | ' + (2 / r.p).toExponential(3) + ' | ' +
      (n2 ? (r1 / e).toFixed(4).padStart(11) : ' n/a'.padStart(11)) + ' | ' + (Math.abs(r1 - e) <= 2 * sd ? 'inside' : 'OUTSIDE'));
  }
}

console.log('');
console.log('--- B8. what the hypothesis would have to be worth: the margin, stated ---');
{
  console.log('  A theta strictly above T* makes the sum 0; a theta at or below it makes it >= 1.');
  console.log('  So the hypothesis is a threshold statement with NO interior. Where the threshold sits:');
  console.log('');
  console.log('  Y      | T*   | mbar(1499) | T*/mbar | theta_zone/T* | SUM R1 at theta_zone');
  for (const w of WINS) {
    const Ts = Math.max(...w.rows.map(r => r.maxK));
    const mb = w.rows[fidx[1499]].mbar;
    console.log('  ' + w.Y.toExponential(0).padEnd(6) + ' | ' + String(Ts).padStart(4) + ' | ' + mb.toFixed(2).padStart(10) +
      ' | ' + (Ts / mb).toFixed(2).padStart(7) + ' | ' + (THETA_ZONE / Ts).toFixed(1).padStart(13) + ' | ' + sumR1(w, THETA_ZONE));
  }
}

console.log('');
console.log('--- B9. the first-moment budget the hypothesis would need ---');
console.log('  SUM_p (2/p) * N_2^(p)(theta) is the value of the L = 1 sum under exact');
console.log('  equidistribution of the level-(p-1) word mod p. Compared with the truth:');
{
  const TH = [300, 600, 900, 1200, 1500, 1800, 2100];
  for (const w of WINS) {
    const parts = TH.map(th => {
      let fm = 0; for (const r of w.rows) fm += (2 / r.p) * tail(r.hA, th);
      return { th, fm, tr: sumR1(w, th) };
    });
    console.log('  ' + w.Y.toExponential(0) + ':  ' + parts.map(x => x.th + ': fm ' + x.fm.toExponential(3) + ' vs true ' + x.tr.toExponential(3)).join(' | '));
  }
}

console.log('');
console.log('--- B10. the theta at which each sum falls below 1 ---');
{
  console.log('  theta_true = least theta with SUM_p R_1(theta) < 1  (= T* + 6)');
  console.log('  theta_fm   = least theta with SUM_p (2/p) N_2^(p)(theta) < 1, the first-moment version');
  console.log('  theta_N2   = least theta with SUM_p N_2^(p)(theta) < 1, the residue condition dropped entirely');
  console.log('');
  console.log('  Y      | G2fin | theta_true | theta_fm | theta_N2 | theta_zone | theta_fm/G2fin');
  for (const w of WINS) {
    const T = t => { let s = 0; for (const r of w.rows) s += tail(r.hK, t); return s; };
    const FM = t => { let s = 0; for (const r of w.rows) s += (2 / r.p) * tail(r.hA, t); return s; };
    const A2 = t => { let s = 0; for (const r of w.rows) s += tail(r.hA, t); return s; };
    const least = f => { for (let t = 0; t < NB * BW; t += BW) if (f(t) < 1) return t; return NB * BW; };
    const tt = least(T), tf = least(FM), ta = least(A2), gf = w.fin.maxG;
    console.log('  ' + w.Y.toExponential(0).padEnd(6) + ' | ' + String(gf).padStart(5) + ' | ' + String(tt).padStart(10) +
      ' | ' + String(tf).padStart(8) + ' | ' + String(ta).padStart(8) + ' | ' + String(THETA_ZONE).padStart(10) +
      ' | ' + (tf / gf).toFixed(3));
  }
}

console.log('');
console.log('--- B11. where the L = 1 mass lives, against the provable sieve range ---');
{
  const BETA2 = 4.26645;   // Diamond-Halberstam-Richert 2-dimensional sifting limit
  console.log('  A 2-dimensional sieve of the window by all primes <= p has sifting variable');
  console.log('  u = ln Y / ln p; asymptotics with a lower bound need u > beta_2 = ' + BETA2 + '.');
  console.log('  p_prov = Y^(1/beta_2) is the largest fold inside that range.');
  console.log('');
  console.log('  Y      | ln Y  | p_prov | fold carrying the 50% / 90% point of SUM_p R_1(3 mbar) | last fold with R_1 > 0');
  for (const w of WINS) {
    const pp = Math.exp(Math.log(w.Y) / BETA2);
    const per = w.rows.map(r => tail(r.hK, 3 * r.mbar));
    const tot = per.reduce((a, b) => a + b, 0);
    let c = 0, p50 = null, p90 = null, plast = null;
    for (let j = 0; j < w.rows.length; j++) {
      c += per[j];
      if (p50 === null && c >= 0.5 * tot) p50 = w.rows[j].p;
      if (p90 === null && c >= 0.9 * tot) p90 = w.rows[j].p;
      if (per[j] > 0) plast = w.rows[j].p;
    }
    console.log('  ' + w.Y.toExponential(0).padEnd(6) + ' | ' + Math.log(w.Y).toFixed(2).padStart(5) + ' | ' +
      pp.toFixed(0).padStart(6) + ' | ' + String(p50).padStart(24) + ' / ' + String(p90).padStart(4) + ' | ' + plast);
  }
}

console.log('');
console.log('--- B12. the head cannot be dropped: T* restricted to folds above the run-extinction fold ---');
{
  // foldL-06 §4: last fold carrying a kill run of length >= 2, by window.
  const PEXT = { '2e+7': 181, '2e+8': 331, '2e+9': 421, '2e+10': 457 };
  console.log('  P_ext = last fold with a kill run of length >= 2 (foldL-06 §4, embedded).');
  console.log('  Above P_ext every L >= 2 term of the transport vanishes, which is the');
  console.log('  reduction the record makes. Below it they do not.');
  console.log('');
  console.log('  Y      | P_ext | T*(all p) | T*(p > P_ext) | argmax fold | G2fin | SUM_{p>P_ext} R_1 at theta = G2fin');
  for (const w of WINS) {
    const yk = w.Y.toExponential(0), pe = PEXT[yk], gf = w.fin.maxG;
    let Tall = 0, Ttail = 0, arg = null, tailSum = 0;
    for (const r of w.rows) {
      if (r.maxK > Tall) { Tall = r.maxK; arg = r.p; }
      if (r.p > pe) { if (r.maxK > Ttail) Ttail = r.maxK; tailSum += tail(r.hK, gf); }
    }
    console.log('  ' + yk.padEnd(6) + ' | ' + String(pe).padStart(5) + ' | ' + String(Tall).padStart(9) + ' | ' +
      String(Ttail).padStart(13) + ' | ' + String(arg).padStart(11) + ' | ' + String(gf).padStart(5) + ' | ' + tailSum);
  }
  console.log('');
  console.log('  and the head, folds p <= P_ext, at the same theta:');
  console.log('  Y      | SUM_{p <= P_ext} R_1(G2fin) | folds p <= P_ext with R_1(G2fin) > 0');
  for (const w of WINS) {
    const yk = w.Y.toExponential(0), pe = PEXT[yk], gf = w.fin.maxG;
    let hs = 0; const which = [];
    for (const r of w.rows) if (r.p <= pe) { const v = tail(r.hK, gf); hs += v; if (v > 0) which.push(r.p + ':' + v); }
    console.log('  ' + yk.padEnd(6) + ' | ' + String(hs).padStart(27) + ' | ' + (which.length ? which.join(' ') : 'none'));
  }
}

console.log('');
console.log('[' + el() + 's] done.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/attack-l1-residue-01-middleband.js
//   invocation:  node research/attack-l1-residue-01-middleband.js
//   code-sha256: fa3b16e60c87ddd98283bb280fd0aef10ef868fd8ad01fe9441ddbd06bd0aae0
//   out-sha256:  bd6f404e00787e522b405506b5c9359c3bbef89a06eeae36e61034033c6317f7
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     639.7 s
// ============================================================================
// folds: 237 primes from 5 to 1499;  chunk = 1e+8 slots;  span buckets 1400 x 6
//
// ############ STAGE A — "slot = 0 or -2 (mod p)" IS "key = p", brute force ############
//   window [0, 6e6), 237 folds, 959041 killed slots total
//   P1 HOLDS: residue count = key count at all 237 folds, exactly. The residue condition is not a relaxation.
//
// ############ STAGE B — the L = 1 sum measured exactly, four windows ############
// [1.2s] Y = 2e7: A = 0.0e+0, Y = 2.0e+7, slots = 3333333, inner/slot = 18.61, overflow spans = 0, 0.6 s
// [6.9s] Y = 2e8: A = 0.0e+0, Y = 2.0e+8, slots = 33333333, inner/slot = 18.98, overflow spans = 0, 5.8 s
// [65.0s] Y = 2e9: A = 0.0e+0, Y = 2.0e+9, slots = 333333333, inner/slot = 18.98, overflow spans = 0, 58.1 s
// [638.2s] Y = 2e+10: A = 0.0e+0, Y = 2.0e+10, slots = 3333333333, inner/slot = 18.91, overflow spans = 0, 573.3 s
//
// --- B1. calibration against the embedded tails of foldL-04/06 ---
//   OK    slots (n = 5 mod 6)            got   333333333   record   333333333
//   OK    fold 7   |B(7)|                got   200000000   record   200000000
//   OK    fold 7   kills                 got    57142857   record    57142857
//   OK    fold 23  kills                 got     6789558   record     6789558
//   OK    fold 421 kills                 got      105790   record      105790
//   OK    fold 1451 kills                got       21565   record       21565
//   |B(1499)| after all folds is not a record figure; measured N(1499) = 15683540
//   CALIBRATION CLEAN.
//
// --- B2. T*: the exact threshold at which the hypothesis sum falls to 0 ---
//   T* = max over folds p and slots s of span_p(s) with key(s) = p.
//   M2* = the same with the residue condition dropped (= max_p maxsum_2(B(p))).
//
//   G2fin = record gap of the fully folded word { key = 0 }, measured here.
//
//   Y        | T*   | M2*  | G2fin | G2(rec) | T*/G2fin | theta_zone | T*/theta_zone | P5 <1/300?
//   2e+7     | 1458 | 1938 |  1458 |    1458 |   1.0000 |    2283119 | 6.386e-4 | yes
//   2e+8     | 1560 | 1968 |  1560 |    1560 |   1.0000 |    2283119 | 6.833e-4 | yes
//   2e+9     | 2220 | 2262 |  2220 |    2220 |   1.0000 |    2283119 | 9.724e-4 | yes
//   2e+10    | 2220 | 2400 |  2220 |    2220 |   1.0000 |    2283119 | 9.724e-4 | yes
//
//   THE EQUIVALENCE, asserted: T* = G2fin at every window (the hypothesis sum
//   falls below 1 at exactly the threshold at which the Zone Postulate does).
//     2e+7    T* = 1458, G2fin = 1458  -> EQUAL
//     2e+8    T* = 1560, G2fin = 1560  -> EQUAL
//     2e+9    T* = 2220, G2fin = 2220  -> EQUAL
//     2e+10   T* = 2220, G2fin = 2220  -> EQUAL
//
//   record gap per level (max over consecutive pairs of B(p)), 2e9 window,
//   against the maxsum_2 of the same level (the L = 1 transport bound):
//       p |  G2(B(p)) | maxsum_2(B(p)) | ratio  | record G_loc / maxsum2 (verify-tailcount (e))
//       17 |        66 |             96 | 1.455  | record [108,150]
//       31 |       258 |            330 | 1.279  | record [300,372]
//       61 |       492 |            576 | 1.171  | record [498,588]
//      101 |       642 |            744 | 1.159  | record [642,798]
//      211 |       900 |           1080 | 1.200  | record [900,1080]
//      421 |      1170 |           1470 | 1.256  | record [1170,1470]
//      701 |      1446 |           1848 | 1.278  | record [1446,1848]
//     1103 |      2052 |           2220 | 1.082  | record [2052,2220]
//     1499 |      2220 |           2262 | 1.019  | record [null,2262]
//
// --- B3. the theta-curve of the hypothesis: SUM_p R_1^(p)(theta), and SUM_p N_2^(p)(theta) ---
//   theta           R1[2e+7]       R1[2e+8]       R1[2e+9]      R1[2e+10]
//        0         3.1921e+6      3.1804e+7      3.1767e+8      3.1783e+9
//        6         3.1921e+6      3.1804e+7      3.1767e+8      3.1783e+9
//       60         5.0091e+5      4.8955e+6      4.8610e+7      4.8764e+8
//      150         1.3526e+5      1.2614e+6      1.2354e+7      1.2469e+8
//      300         2.7525e+4      2.3323e+5      2.2054e+6      2.2561e+7
//      450         7.0690e+3      5.4063e+4      4.9168e+5      5.1027e+6
//      600         1.9620e+3      1.3487e+4      1.1790e+5      1.2438e+6
//      900         1.3600e+2      7.7200e+2      6.2380e+3      6.8460e+4
//     1200         1.5000e+1      5.5000e+1      3.5500e+2      4.0360e+3
//     1500         0.0000e+0      4.0000e+0      3.1000e+1      2.1100e+2
//     1800         0.0000e+0      0.0000e+0      3.0000e+0      1.0000e+1
//     2100         0.0000e+0      0.0000e+0      1.0000e+0      1.0000e+0
//     2400         0.0000e+0      0.0000e+0      0.0000e+0      0.0000e+0
//     3000         0.0000e+0      0.0000e+0      0.0000e+0      0.0000e+0
//     3600         0.0000e+0      0.0000e+0      0.0000e+0      0.0000e+0
//     4200         0.0000e+0      0.0000e+0      0.0000e+0      0.0000e+0
//
//   theta           N2[2e+7]       N2[2e+8]       N2[2e+9]      N2[2e+10]
//        0         6.1895e+7      6.3110e+8      6.3100e+9     6.2893e+10
//        6         6.1895e+7      6.3110e+8      6.3100e+9     6.2893e+10
//       60         4.5683e+7      4.6762e+8      4.6765e+9     4.6587e+10
//      150         2.5688e+7      2.6021e+8      2.6051e+9     2.5999e+10
//      300         8.0674e+6      7.7042e+7      7.7197e+8      7.7807e+9
//      450         2.4638e+6      2.1578e+7      2.1396e+8      2.1907e+9
//      600         7.5255e+5      5.9611e+6      5.8020e+7      6.0495e+8
//      900         6.2302e+4      3.8469e+5      3.5700e+6      3.8708e+7
//     1200         4.8820e+3      2.5997e+4      2.2605e+5      2.4671e+6
//     1500         5.7700e+2      2.4890e+3      1.3694e+4      1.4298e+5
//     1800         1.0600e+2      1.8900e+2      1.2440e+3      8.8550e+3
//     2100         0.0000e+0      0.0000e+0      1.2000e+2      3.9600e+2
//     2400         0.0000e+0      0.0000e+0      0.0000e+0      1.7000e+1
//     3000         0.0000e+0      0.0000e+0      0.0000e+0      0.0000e+0
//     3600         0.0000e+0      0.0000e+0      0.0000e+0      0.0000e+0
//     4200         0.0000e+0      0.0000e+0      0.0000e+0      0.0000e+0
//
//   last theta (multiple of 6) with SUM_p R_1 >= 1, and the value there:
//     2e+7    theta =  1458  SUM R_1 = 1   at theta+6: 0
//     2e+8    theta =  1560  SUM R_1 = 2   at theta+6: 0
//     2e+9    theta =  2220  SUM R_1 = 1   at theta+6: 0
//     2e+10   theta =  2220  SUM R_1 = 1   at theta+6: 0
//
// --- B4. P6, linearity in Y at fixed theta ---
//   theta |   ratio R1(2e8)/R1(2e7) | R1(2e9)/R1(2e8) | R1(2e10)/R1(2e9)  (predicted 10 each)
//     300 |             8.473           9.456          10.230
//     600 |             6.874           8.742          10.550
//     900 |             5.676           8.080          10.975
//    1200 |             3.667           6.455          11.369
//
// --- B5. per-fold profile of the L = 1 sum in the 2e9 window ---
//     p |     |B(p)| |  kills | 2/p      | mbar   | maxK | maxA |    R1(300)   R1(600)   R1(900)  R1(1200) |     N2(300)    N2(600)    N2(900)   N2(1200)
//      5 |  3.3333e+8 | 1.33e+8 | 4.00e-1 |   6.00 |   12 |   12 |   0.000e+0  0.000e+0  0.000e+0  0.000e+0 |    0.000e+0   0.000e+0   0.000e+0   0.000e+0
//      7 |  2.0000e+8 | 5.71e+7 | 2.86e-1 |  10.00 |   24 |   24 |   0.000e+0  0.000e+0  0.000e+0  0.000e+0 |    0.000e+0   0.000e+0   0.000e+0   0.000e+0
//     11 |  1.4286e+8 | 2.60e+7 | 1.82e-1 |  14.00 |   42 |   42 |   0.000e+0  0.000e+0  0.000e+0  0.000e+0 |    0.000e+0   0.000e+0   0.000e+0   0.000e+0
//     13 |  1.1688e+8 | 1.80e+7 | 1.54e-1 |  17.11 |   66 |   66 |   0.000e+0  0.000e+0  0.000e+0  0.000e+0 |    0.000e+0   0.000e+0   0.000e+0   0.000e+0
//     17 |  9.8901e+7 | 1.16e+7 | 1.18e-1 |  20.22 |   96 |   96 |   0.000e+0  0.000e+0  0.000e+0  0.000e+0 |    0.000e+0   0.000e+0   0.000e+0   0.000e+0
//     19 |  8.7266e+7 | 9.19e+6 | 1.05e-1 |  22.92 |  150 |  150 |   0.000e+0  0.000e+0  0.000e+0  0.000e+0 |    0.000e+0   0.000e+0   0.000e+0   0.000e+0
//     23 |  7.8080e+7 | 6.79e+6 | 8.70e-2 |  25.61 |  186 |  186 |   0.000e+0  0.000e+0  0.000e+0  0.000e+0 |    0.000e+0   0.000e+0   0.000e+0   0.000e+0
//     29 |  7.1290e+7 | 4.92e+6 | 6.90e-2 |  28.05 |  234 |  234 |   0.000e+0  0.000e+0  0.000e+0  0.000e+0 |    0.000e+0   0.000e+0   0.000e+0   0.000e+0
//     31 |  6.6374e+7 | 4.28e+6 | 6.45e-2 |  30.13 |  300 |  330 |   1.000e+0  0.000e+0  0.000e+0  0.000e+0 |    1.300e+1   0.000e+0   0.000e+0   0.000e+0
//     61 |  4.7416e+7 | 1.55e+6 | 3.28e-2 |  42.18 |  498 |  576 |   1.034e+3  0.000e+0  0.000e+0  0.000e+0 |    3.095e+4   0.000e+0   0.000e+0   0.000e+0
//    101 |  3.8298e+7 | 7.58e+5 | 1.98e-2 |  52.22 |  582 |  744 |   5.351e+3  0.000e+0  0.000e+0  0.000e+0 |    2.675e+5   9.700e+1   0.000e+0   0.000e+0
//    211 |  2.8511e+7 | 2.72e+5 | 9.48e-3 |  70.15 |  846 | 1080 |   1.342e+4  7.900e+1  0.000e+0  0.000e+0 |    1.407e+6   9.090e+3   3.000e+1   0.000e+0
//    421 |  2.2539e+7 | 1.06e+5 | 4.75e-3 |  88.73 | 1074 | 1470 |   1.369e+4  3.730e+2  7.000e+0  0.000e+0 |    2.919e+6   8.442e+4   1.435e+3   1.700e+1
//    701 |  1.9262e+7 | 5.23e+4 | 2.85e-3 | 103.83 | 1050 | 1848 |   1.077e+4  6.430e+2  2.300e+1  0.000e+0 |    3.954e+6   2.375e+5   9.171e+3   3.110e+2
//   1021 |  1.7394e+7 | 3.21e+4 | 1.96e-3 | 114.99 | 1230 | 2220 |   8.346e+3  7.680e+2  3.700e+1  1.000e+0 |    4.544e+6   4.022e+5   2.407e+4   1.374e+3
//   1103 |  1.6996e+7 | 2.90e+4 | 1.81e-3 | 117.67 | 1680 | 2220 |   7.935e+3  7.390e+2  5.100e+1  4.000e+0 |    4.665e+6   4.467e+5   2.917e+4   1.809e+3
//   1499 |  1.5684e+7 | 2.09e+4 | 1.33e-3 | 127.52 | 1260 | 2262 |   6.761e+3  8.320e+2  7.400e+1  3.000e+0 |    5.041e+6   6.238e+5   5.455e+4   4.432e+3
//
// --- B6. P2/P3: is the residue condition worth a free factor 2/p in the tail? ---
//   window 2e+7:
//      regime          |     R_1      |     N_2      | ratio     | 2/p pooled | ratio/(2/p) | 2 sd band
//      p >= 100, theta = 0|    2.4159e+5 |    4.3215e+7 | 5.591e-3 | 5.263e-3 |      1.0622 | OUTSIDE
//      p >= 100, theta = 3 mbar|    4.2370e+4 |    7.7376e+6 | 5.476e-3 | 5.132e-3 |      1.0671 | OUTSIDE
//      p >= 100, theta = 6 mbar|    1.7100e+3 |    3.6580e+5 | 4.675e-3 | 4.409e-3 |      1.0602 | OUTSIDE
//      all p,    theta = 3 mbar|    1.8012e+5 |    9.6765e+6 | 1.861e-2 | 1.835e-2 |      1.0143 | OUTSIDE
//      all p,    theta = 6 mbar|    2.4620e+3 |    3.8564e+5 | 6.384e-3 | 6.229e-3 |      1.0249 | inside
//   window 2e+8:
//      regime          |     R_1      |     N_2      | ratio     | 2/p pooled | ratio/(2/p) | 2 sd band
//      p >= 100, theta = 0|    2.2995e+6 |    4.4428e+8 | 5.176e-3 | 5.163e-3 |      1.0024 | OUTSIDE
//      p >= 100, theta = 3 mbar|    4.0221e+5 |    7.9466e+7 | 5.061e-3 | 5.042e-3 |      1.0038 | OUTSIDE
//      p >= 100, theta = 6 mbar|    1.6553e+4 |    3.7470e+6 | 4.418e-3 | 4.377e-3 |      1.0092 | inside
//      all p,    theta = 3 mbar|    1.4366e+6 |    9.7051e+7 | 1.480e-2 | 1.479e-2 |      1.0011 | inside
//      all p,    theta = 6 mbar|    2.4749e+4 |    3.9552e+6 | 6.257e-3 | 6.211e-3 |      1.0075 | inside
//   window 2e+9:
//      regime          |     R_1      |     N_2      | ratio     | 2/p pooled | ratio/(2/p) | 2 sd band
//      p >= 100, theta = 0|    2.2636e+7 |    4.4418e+9 | 5.096e-3 | 5.157e-3 |      0.9883 | OUTSIDE
//      p >= 100, theta = 3 mbar|    3.9472e+6 |    7.9478e+8 | 4.966e-3 | 5.030e-3 |      0.9874 | OUTSIDE
//      p >= 100, theta = 6 mbar|    1.6207e+5 |    3.7476e+7 | 4.325e-3 | 4.383e-3 |      0.9866 | OUTSIDE
//      all p,    theta = 3 mbar|    1.7755e+7 |    9.8967e+8 | 1.794e-2 | 1.799e-2 |      0.9972 | OUTSIDE
//      all p,    theta = 6 mbar|    2.4392e+5 |    3.9554e+7 | 6.167e-3 | 6.213e-3 |      0.9925 | OUTSIDE
//   window 2e+10:
//      regime          |     R_1      |     N_2      | ratio     | 2/p pooled | ratio/(2/p) | 2 sd band
//      p >= 100, theta = 0|    2.2794e+8 |   4.4211e+10 | 5.156e-3 | 5.172e-3 |      0.9968 | OUTSIDE
//      p >= 100, theta = 3 mbar|    3.9817e+7 |    7.9185e+9 | 5.028e-3 | 5.046e-3 |      0.9966 | OUTSIDE
//      p >= 100, theta = 6 mbar|    1.6355e+6 |    3.7499e+8 | 4.362e-3 | 4.382e-3 |      0.9953 | OUTSIDE
//      all p,    theta = 3 mbar|    1.7789e+8 |    9.8675e+9 | 1.803e-2 | 1.804e-2 |      0.9993 | OUTSIDE
//      all p,    theta = 6 mbar|    2.4493e+6 |    3.9574e+8 | 6.189e-3 | 6.209e-3 |      0.9968 | OUTSIDE
//
// --- B7. the same ratio fold by fold, 2e9 window, theta = 3 mbar ---
//     p |    N_2      |   R_1    | R_1/N_2   |  2/p     | ratio/(2/p) | +-2sd
//     17 |   1.2121e+7 |  1.43e+6 | 1.176e-1 | 1.176e-1 |      1.0000 | inside
//     31 |   8.3465e+6 |  5.39e+5 | 6.452e-2 | 6.452e-2 |      1.0001 | inside
//     61 |   7.7374e+6 |  2.54e+5 | 3.281e-2 | 3.279e-2 |      1.0008 | inside
//    101 |   6.3506e+6 |  1.26e+5 | 1.986e-2 | 1.980e-2 |      1.0029 | inside
//    211 |   4.4493e+6 |  4.25e+4 | 9.551e-3 | 9.479e-3 |      1.0076 | inside
//    421 |   3.9041e+6 |  1.83e+4 | 4.685e-3 | 4.751e-3 |      0.9861 | inside
//    701 |   3.5739e+6 |  9.78e+3 | 2.737e-3 | 2.853e-3 |      0.9592 | OUTSIDE
//   1021 |   3.2232e+6 |  5.97e+3 | 1.851e-3 | 1.959e-3 |      0.9448 | OUTSIDE
//   1103 |   3.1731e+6 |  5.38e+3 | 1.695e-3 | 1.813e-3 |      0.9347 | OUTSIDE
//   1499 |   2.9386e+6 |  3.91e+3 | 1.332e-3 | 1.334e-3 |      0.9980 | inside
//
// --- B8. what the hypothesis would have to be worth: the margin, stated ---
//   A theta strictly above T* makes the sum 0; a theta at or below it makes it >= 1.
//   So the hypothesis is a threshold statement with NO interior. Where the threshold sits:
//
//   Y      | T*   | mbar(1499) | T*/mbar | theta_zone/T* | SUM R1 at theta_zone
//   2e+7   | 1458 |     141.42 |   10.31 |        1565.9 | 0
//   2e+8   | 1560 |     130.53 |   11.95 |        1463.5 | 0
//   2e+9   | 2220 |     127.52 |   17.41 |        1028.4 | 0
//   2e+10  | 2220 |     128.85 |   17.23 |        1028.4 | 0
//
// --- B9. the first-moment budget the hypothesis would need ---
//   SUM_p (2/p) * N_2^(p)(theta) is the value of the L = 1 sum under exact
//   equidistribution of the level-(p-1) word mod p. Compared with the truth:
//   2e+7:  300: fm 2.318e+4 vs true 2.753e+4 | 600: fm 1.512e+3 vs true 1.962e+3 | 900: fm 1.091e+2 vs true 1.360e+2 | 1200: fm 8.005e+0 vs true 1.500e+1 | 1500: fm 9.595e-1 vs true 0.000e+0 | 1800: fm 1.880e-1 vs true 0.000e+0 | 2100: fm 0.000e+0 vs true 0.000e+0
//   2e+8:  300: fm 2.256e+5 vs true 2.332e+5 | 600: fm 1.234e+4 vs true 1.349e+4 | 900: fm 6.870e+2 vs true 7.720e+2 | 1200: fm 4.309e+1 vs true 5.500e+1 | 1500: fm 4.001e+0 vs true 4.000e+0 | 1800: fm 3.069e-1 vs true 0.000e+0 | 2100: fm 0.000e+0 vs true 0.000e+0
//   2e+9:  300: fm 2.270e+6 vs true 2.205e+6 | 600: fm 1.226e+5 vs true 1.179e+5 | 900: fm 6.551e+3 vs true 6.238e+3 | 1200: fm 3.837e+2 vs true 3.550e+2 | 1500: fm 2.227e+1 vs true 3.100e+1 | 1800: fm 2.010e+0 vs true 3.000e+0 | 2100: fm 1.890e-1 vs true 1.000e+0
//   2e+10:  300: fm 2.281e+7 vs true 2.256e+7 | 600: fm 1.272e+6 vs true 1.244e+6 | 900: fm 7.087e+4 vs true 6.846e+4 | 1200: fm 4.188e+3 vs true 4.036e+3 | 1500: fm 2.316e+2 vs true 2.110e+2 | 1800: fm 1.429e+1 vs true 1.000e+1 | 2100: fm 6.036e-1 vs true 1.000e+0
//
// --- B10. the theta at which each sum falls below 1 ---
//   theta_true = least theta with SUM_p R_1(theta) < 1  (= T* + 6)
//   theta_fm   = least theta with SUM_p (2/p) N_2^(p)(theta) < 1, the first-moment version
//   theta_N2   = least theta with SUM_p N_2^(p)(theta) < 1, the residue condition dropped entirely
//
//   Y      | G2fin | theta_true | theta_fm | theta_N2 | theta_zone | theta_fm/G2fin
//   2e+7   |  1458 |       1464 |     1494 |     1944 |    2283119 | 1.025
//   2e+8   |  1560 |       1566 |     1656 |     1974 |    2283119 | 1.062
//   2e+9   |  2220 |       2226 |     1908 |     2268 |    2283119 | 0.859
//   2e+10  |  2220 |       2226 |     2058 |     2406 |    2283119 | 0.927
//
// --- B11. where the L = 1 mass lives, against the provable sieve range ---
//   A 2-dimensional sieve of the window by all primes <= p has sifting variable
//   u = ln Y / ln p; asymptotics with a lower bound need u > beta_2 = 4.26645.
//   p_prov = Y^(1/beta_2) is the largest fold inside that range.
//
//   Y      | ln Y  | p_prov | fold carrying the 50% / 90% point of SUM_p R_1(3 mbar) | last fold with R_1 > 0
//   2e+7   | 16.81 |     51 |                       29 /  353 | 1499
//   2e+8   | 19.11 |     88 |                       41 /  389 | 1499
//   2e+9   | 21.42 |    151 |                       29 /  277 | 1499
//   2e+10  | 23.72 |    260 |                       29 /  281 | 1499
//
// --- B12. the head cannot be dropped: T* restricted to folds above the run-extinction fold ---
//   P_ext = last fold with a kill run of length >= 2 (foldL-06 §4, embedded).
//   Above P_ext every L >= 2 term of the transport vanishes, which is the
//   reduction the record makes. Below it they do not.
//
//   Y      | P_ext | T*(all p) | T*(p > P_ext) | argmax fold | G2fin | SUM_{p>P_ext} R_1 at theta = G2fin
//   2e+7   |   181 |      1458 |          1458 |        1409 |  1458 | 1
//   2e+8   |   331 |      1560 |          1560 |         911 |  1560 | 2
//   2e+9   |   421 |      2220 |          2220 |        1151 |  2220 | 1
//   2e+10  |   457 |      2220 |          2220 |        1151 |  2220 | 1
//
//   and the head, folds p <= P_ext, at the same theta:
//   Y      | SUM_{p <= P_ext} R_1(G2fin) | folds p <= P_ext with R_1(G2fin) > 0
//   2e+7   |                           0 | none
//   2e+8   |                           0 | none
//   2e+9   |                           0 | none
//   2e+10  |                           0 | none
//
// [639.6s] done.
// ============================================================================
// READINGS
// ============================================================================
//
// [1] THE RESIDUE CONDITION IS THE KILL CONDITION, WITH NO SLACK. Stage A
//     enumerates both counts at all 237 folds in [0, 6e6) and they agree
//     exactly, over 959041 killed slots. So R_1^(p)(theta) is not a residue
//     relaxation of a merge count, it IS the merge count, and the framing in
//     `verify-tailcount-transport.md` §(e) that the window frame buys a
//     statement "on residues, not on the gap word" does not survive contact
//     with the window. In the tile frame the sum runs over all p alignments and
//     the residue really is free; in a window the alignment is the arithmetic.
//
// [2] T* EQUALS G2 AT EVERY WINDOW, EXACTLY. B2: T* = 1458, 1560, 2220, 2220
//     against G2fin = 1458, 1560, 2220, 2220 at Y = 2e7, 2e8, 2e9, 2e10. T*
//     is by construction the least theta above which the hypothesis sum is
//     zero, and G2fin is the least theta above which the Zone Postulate holds
//     for the window. The two thresholds are the same number, four times out of
//     four. The proven half of this is one-directional (T* <= G2fin, since a
//     killed slot's span is covered by a final gap), and the measured half is
//     equality. Either half is fatal: the first says the hypothesis is a
//     consequence of the conclusion, the second says it is the conclusion.
//
// [3] THE LIVE BAND IS EMPTY BY THREE ORDERS OF MAGNITUDE. B8: theta_zone/T*
//     reads 1565.9, 1463.5, 1028.4, 1028.4, and SUM R_1 at theta_zone is 0 at
//     every window. T*/mbar(1499) is 10.31 to 17.41, i.e. the hypothesis's
//     threshold sits at ten to seventeen mean gaps while the zone budget sits
//     at seventeen thousand. Nothing in the computable range is near the
//     statement's boundary, and the boundary is at the record gap.
//
// [4] THE HEAD IS IRRELEVANT AT THE OPERATIVE THETA, WHICH MAKES THE
//     REDUCTION HARMLESS AND THE HYPOTHESIS TAUTOLOGICAL. B12: at
//     theta = G2fin the folds at or below the run-extinction fold contribute 0
//     at every window, and the whole sum comes from folds 1409, 911, 1151, 1151,
//     all above P_ext = 181, 331, 421, 457. So the L >= 2 terms the record drops
//     were already zero there, the L = 1 statement alone carries the full sum,
//     and by [2] it flips at exactly the threshold the conclusion flips at.
//
// [5] THE FREE 2/p IS NOT FREE, AND IT ERRS THE SAFE WAY. B7, 2e9 window at
//     theta = 3 mbar: R_1/N_2 divided by 2/p reads 1.0000, 1.0001, 1.0008,
//     1.0029, 1.0076, 0.9861, 0.9592, 0.9448, 0.9347, 0.9980 at folds 17 to
//     1499, with three folds outside two Poisson standard deviations. The
//     deficit at deep folds is up to 6.5% and is a real anti-correlation
//     between the residue condition and a long span, not sampling. B6 pools it:
//     0.9866 to 1.0671 across the four windows, statistically outside the band
//     at most cells. So the residue condition is worth about 2/p and that
//     factor is a measurement, not a theorem.
//
// [6] THE FIRST-MOMENT VERSION IS NOT A BOUND, AND IT UNDER-PREDICTS THE
//     EXTREME. B9, 2e9 at theta = 2100: the first moment SUM (2/p) N_2 reads
//     1.890e-1 against a true count of 1; at 2e10 and theta = 2100 it reads
//     6.036e-1 against 1. A model value below 1 while the count is 1 is the
//     whole failure mode of a first-moment argument at an extreme statistic.
//     B10 puts the crossing thresholds side by side: theta_fm/G2fin = 1.025,
//     1.062, 0.859, 0.927, so the first-moment threshold is within 15% of the
//     record gap in both directions. Close, and on the wrong side twice.
//
// [7] THE MASS SITS ABOVE THE PROVABLE SIEVE RANGE. B11: p_prov = Y^(1/beta_2)
//     is 51, 88, 151, 260 at the four windows, while the 90% point of the L = 1
//     mass sits at folds 353, 389, 277, 281 and the last fold with any mass is
//     1499 at every window. The median fold, 29 to 41, is inside provable
//     range; the tail that decides the statement is not. This is the same
//     beta_2 = 4.26645 wall `a3-05-bound-L.md` §8 names in the run-length
//     coordinate, arriving in the counting coordinate.
//
// [8] LINEARITY IN Y HOLDS ONLY WHERE THE COUNT IS NOT AN EXTREME. B4: the
//     ratio of consecutive windows at fixed theta reads 8.473, 9.456, 10.230 at
//     theta = 300 and 3.667, 6.455, 11.369 at theta = 1200 against a predicted
//     10. P6 is PARTIAL: it holds at the largest step and at bulk theta, and
//     fails at the small windows where a fixed theta is deep in their tail.
//     Read the other way, the deficit measures how far theta = 1200 is into the
//     tail of a 2e7 window and how ordinary it is in a 2e10 one.
//
// [9] CALIBRATION AND WHAT DIFFERS FROM THE RECORD BY A CONVENTION, NOT A
//     NUMBER. B1 reproduces six figures of the angle-4 and angle-6 tails
//     exactly. B2's per-level table is indexed BEFORE fold p while
//     `verify-tailcount-transport.md` §(e) indexes AFTER, so the two agree
//     exactly at 101, 211, 421, 701, 1103 and 1499 (G_loc 642, 900, 1170, 1446,
//     2052 and maxsum_2 1080, 1470, 1848, 2220, 2262) and differ at 17, 31, 61,
//     which are folds that set a new record themselves. No disagreement of
//     substance was found anywhere.
//
// [10] WHAT THIS DOES NOT SHOW. Nothing here touches the tile frame's own
//     difficulty: the four windows are localized objects whose gaps live at the
//     ln^2 scale while the zone budget lives at x^2, which is why every margin
//     above is a factor of a thousand rather than a factor of two. The
//     equivalence lemmas are frame-independent, but the numbers are not. The
//     fold range stops at 1499 in every window, and the anchor is 0 in every
//     window: the offset check of `attack-foldL-06-scaling.md` §5 was not
//     repeated here, so the sampling spread of T* at fixed Y is unmeasured.
// ============================================================================
