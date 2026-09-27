// gate-multiplies-03.js
// Streams T_29 (214,708,725 twin slots) out of T_23 and reads maxsum_m for
// m <= 12 without ever storing the tile. Settles whether the step-3 chain
// busts at fold 31: it needs maxsum_5(T_29)/G2(T_29) < 1.376.

'use strict';
const T0 = Date.now();
const log = s => console.log('[' + ((Date.now() - T0) / 1000).toFixed(1) + 's] ' + s);

const PR = [5, 7, 11, 13, 17, 19, 23];
let slots = Float64Array.from([5]), W = 6;
for (const p of PR) {
  const D = slots.length, rs = new Int32Array(D);
  for (let i = 0; i < D; i++) rs[i] = slots[i] % p;
  const wp = W % p, out = new Float64Array(D * (p - 2));
  let n = 0;
  for (let k = 0; k < p; k++) {
    const off = k * W, kw = (k * wp) % p;
    const d0 = (p - kw) % p, d2 = (2 * p - 2 - kw) % p;
    for (let i = 0; i < D; i++) if (rs[i] !== d0 && rs[i] !== d2) out[n++] = slots[i] + off;
  }
  slots = out; W *= p;
}
log('T_23 built: D = ' + slots.length + ', W = ' + W);

const p = 29, D = slots.length;
const rs = new Int32Array(D);
for (let i = 0; i < D; i++) rs[i] = slots[i] % p;
const wp = W % p, Wn = W * p;

const MMAX = 12;
const buf = new Float64Array(MMAX + 1);   // last MMAX+1 slot values, circular
let head = 0, cnt = 0, first = -1, prev = -1;
const best = new Float64Array(MMAX + 1);

function push(v) {
  buf[head] = v; head = (head + 1) % (MMAX + 1); cnt++;
  for (let m = 1; m <= MMAX; m++) {
    if (cnt <= m) continue;
    const idx = (head - 1 - m + 2 * (MMAX + 1)) % (MMAX + 1);
    const s = v - buf[idx];
    if (s > best[m]) best[m] = s;
  }
}

for (let k = 0; k < p; k++) {
  const off = k * W, kw = (k * wp) % p;
  const d0 = (p - kw) % p, d2 = (2 * p - 2 - kw) % p;
  for (let i = 0; i < D; i++) {
    if (rs[i] === d0 || rs[i] === d2) continue;
    const v = slots[i] + off;
    if (first < 0) first = v;
    push(v);
    prev = v;
  }
  if (k % 4 === 0) log('  copy ' + k + '/' + p + '  (alive so far ' + cnt + ')');
}
// wrap: continue with the first MMAX slots shifted by Wn
{
  let m = 0;
  for (let k = 0; k < p && m < MMAX; k++) {
    const off = k * W, kw = (k * wp) % p;
    const d0 = (p - kw) % p, d2 = (2 * p - 2 - kw) % p;
    for (let i = 0; i < D && m < MMAX; i++) {
      if (rs[i] === d0 || rs[i] === d2) continue;
      push(slots[i] + off + Wn); m++;
    }
  }
}

const Dn = cnt - MMAX;
const mbar = Wn / Dn;
console.log('');
console.log('=== T_29 ===');
console.log('  D = ' + Dn + '   W = ' + Wn.toExponential(6) + '   mbar = ' + mbar.toFixed(4));
console.log('  G2 = maxsum_1 = ' + best[1] + '   (recorded value 258)');
for (let m = 1; m <= MMAX; m++) {
  console.log('  maxsum_' + String(m).padStart(2) + ' = ' + String(best[m]).padStart(6) +
              '   / G2 = ' + (best[m] / best[1]).toFixed(4) +
              '   rho = ' + (m > 1 ? ((best[m] - best[1]) / ((m - 1) * mbar)).toFixed(3) : '-'));
}
console.log('');
console.log('  step-3 chain at fold 31 needs maxsum_5(T_29)/G2 < 1.376  ->  measured ' +
            (best[5] / best[1]).toFixed(4) + '   ' + (best[5] / best[1] < 1.376 ? 'SURVIVES' : 'BUSTS'));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/gate-multiplies-03.js
//   invocation:  node research/gate-multiplies-03.js
//   code-sha256: 50dcc3dba2dcfd398046355601a6df5a492eb97559f16098c17fd18695894422
//   out-sha256:  957051bd860bc0401c0d5ebbcd629f8b5633f842b5bb960746979d2b37f976ac
//   body-lines:  27
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     4.4 s
// ============================================================================
// [0.0s] T_23 built: D = 7952175, W = 223092870
// [0.5s]   copy 0/29  (alive so far 7403764)
// [1.0s]   copy 4/29  (alive so far 37018748)
// [1.6s]   copy 8/29  (alive so far 66633738)
// [2.1s]   copy 12/29  (alive so far 96248725)
// [2.7s]   copy 16/29  (alive so far 125863736)
// [3.2s]   copy 20/29  (alive so far 155478747)
// [3.8s]   copy 24/29  (alive so far 185093750)
// [4.3s]   copy 28/29  (alive so far 214708725)
//
// === T_29 ===
//   D = 214708725   W = 6.469693e+9   mbar = 30.1324
//   G2 = maxsum_1 = 258   (recorded value 258)
//   maxsum_ 1 =    258   / G2 = 1.0000   rho = -
//   maxsum_ 2 =    330   / G2 = 1.2791   rho = 2.389
//   maxsum_ 3 =    390   / G2 = 1.5116   rho = 2.190
//   maxsum_ 4 =    420   / G2 = 1.6279   rho = 1.792
//   maxsum_ 5 =    510   / G2 = 1.9767   rho = 2.091
//   maxsum_ 6 =    540   / G2 = 2.0930   rho = 1.872
//   maxsum_ 7 =    552   / G2 = 2.1395   rho = 1.626
//   maxsum_ 8 =    582   / G2 = 2.2558   rho = 1.536
//   maxsum_ 9 =    594   / G2 = 2.3023   rho = 1.394
//   maxsum_10 =    660   / G2 = 2.5581   rho = 1.482
//   maxsum_11 =    672   / G2 = 2.6047   rho = 1.374
//   maxsum_12 =    726   / G2 = 2.8140   rho = 1.412
//
//   step-3 chain at fold 31 needs maxsum_5(T_29)/G2 < 1.376  ->  measured 1.9767   BUSTS
// ============================================================================
// READINGS
// ============================================================================
