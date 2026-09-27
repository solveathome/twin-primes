// gate-multiplies-02.js
//
// The decisive test. The no-fixed-point argument needs the per-fold INDEX COST
// to be proportional to the running bound. In the maxsum family the index cost
// is kappa(m), the maximum number of kills inside a window of m consecutive NEW
// gaps. Two questions:
//
//   Q1  Is kappa(m) proportional to m?  If yes the index MULTIPLIES,
//       J -> J*(1 + kappa(m)/m), and the chain blows up.
//       If kappa(m) is bounded in m the index is ADDITIVE and it does not.
//
//   Q2  How loose is the counting bound kappa(m) <= maxsum_m(new)/(p-2) + 1,
//       which is the only unconditional handle either A5 or Fact B supplies,
//       and which is what SUPPLIES the proportionality?
//
// Also measures rho(m) = (maxsum_m - G2)/((m-1)*mbar), the single constant the
// u-frame's per-fold budget turns on, and the true longest kill run L.
//
// usage: node research/gate-multiplies-02.js [maxFold]      default 29

'use strict';

const MAXFOLD = Number(process.argv[2] || 29);
const PRIMES = [3, 5, 7, 11, 13, 17, 19, 23, 29];
const KM = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32];

const T0 = Date.now();
function log(s) { console.log('[' + ((Date.now() - T0) / 1000).toFixed(1) + 's] ' + s); }

function baseTile() { return { slots: Float64Array.from([5]), W: 6, x: 3 }; }

function foldTile(tile, p) {
  const { slots, W } = tile, D = slots.length;
  const rs = new Int32Array(D);
  for (let i = 0; i < D; i++) rs[i] = slots[i] % p;
  const wp = W % p;
  const out = new Float64Array(D * (p - 2));
  let n = 0;
  for (let k = 0; k < p; k++) {
    const off = k * W, kw = (k * wp) % p;
    const d0 = (p - kw) % p, d2 = (2 * p - 2 - kw) % p;
    for (let i = 0; i < D; i++) if (rs[i] !== d0 && rs[i] !== d2) out[n++] = slots[i] + off;
  }
  if (n !== out.length) throw new Error('kill count wrong');
  return { slots: out, W: W * p, x: p };
}

function gapsOf(t) {
  const { slots, W } = t, D = slots.length, g = new Float64Array(D);
  for (let i = 0; i < D - 1; i++) g[i] = slots[i + 1] - slots[i];
  g[D - 1] = W - slots[D - 1] + slots[0];
  return g;
}

function maxsum(g, m) {
  const D = g.length;
  if (m > D) return null;
  let s = 0;
  for (let j = 0; j < m; j++) s += g[j];
  let best = s;
  for (let i = 1; i < D; i++) { s += g[(i + m - 1) % D] - g[i - 1]; if (s > best) best = s; }
  return best;
}

// kappa(m) for the fold of `tile` by p, plus the true longest kill run L.
// Walks all D*p positions of the new tile in order. Position j = k*D + i is
// alive iff old slot i survives in copy k. A window of m consecutive alive
// positions spans (j_last - j_first) positions, of which m are the alive
// endpoints-to-endpoints steps, so the kills inside are (j_last-j_first) - m.
function kappaAndL(tile, p, ms) {
  const { slots, W } = tile, D = slots.length;
  const rs = new Int32Array(D);
  for (let i = 0; i < D; i++) rs[i] = slots[i] % p;
  const wp = W % p;
  const mmax = Math.max(...ms);
  const buf = new Float64Array(mmax + 1);   // circular buffer of alive positions
  let nAlive = 0, head = 0;
  const kap = new Map(); for (const m of ms) kap.set(m, 0);
  let L = 0, run = 0;
  const total = D * p;
  let nextTick = 0;

  for (let k = 0; k < p; k++) {
    const kw = (k * wp) % p;
    const d0 = (p - kw) % p, d2 = (2 * p - 2 - kw) % p;
    const base = k * D;
    for (let i = 0; i < D; i++) {
      const dead = (rs[i] === d0 || rs[i] === d2);
      if (dead) { run++; if (run > L) L = run; continue; }
      run = 0;
      const j = base + i;
      buf[head] = j; head = (head + 1) % (mmax + 1); nAlive++;
      for (const m of ms) {
        if (nAlive <= m) continue;
        const idx = (head - 1 - m + 2 * (mmax + 1)) % (mmax + 1);
        const span = j - buf[idx];
        const kk = span - m;
        if (kk > kap.get(m)) kap.set(m, kk);
      }
    }
    if (k * D > nextTick) { log('  fold by ' + p + ': copy ' + k + '/' + p); nextTick = k * D + total / 8; }
  }
  return { kappa: kap, L };
}

function main() {
  let tile = baseTile();
  const hist = [];
  for (let i = 0; i < PRIMES.length - 1; i++) {
    const x = PRIMES[i], p = PRIMES[i + 1];
    if (tile.x !== x) tile = foldTile(tile, x);
    const g = gapsOf(tile);
    const D = g.length;
    let sum = 0, G2 = 0;
    for (let q = 0; q < D; q++) { sum += g[q]; if (g[q] > G2) G2 = g[q]; }
    const mbar = sum / D;

    // rho(m)
    const rho = [];
    for (const m of [2, 3, 4, 6, 8, 12, 16]) {
      const v = maxsum(g, m);
      if (v !== null) rho.push(m + ':' + ((v - G2) / ((m - 1) * mbar)).toFixed(3));
    }

    if (p > MAXFOLD) { console.log('(stopping before fold ' + p + ')'); break; }
    log('fold T_' + x + ' -> ' + p + '  (D_old = ' + D + ', positions = ' + (D * p) + ')');
    const ms = KM.filter(m => m <= Math.min(32, D - 1));
    if (ms.length === 0) { tile = foldTile(tile, p); continue; }
    const { kappa, L } = kappaAndL(tile, p, ms);

    const newTile = foldTile(tile, p);
    const gn = gapsOf(newTile);
    let G2n = 0; for (let q = 0; q < gn.length; q++) if (gn[q] > G2n) G2n = gn[q];

    console.log('');
    console.log('=== fold T_' + x + ' by p = ' + p + ' ===');
    console.log('  old: D = ' + D + '  mbar = ' + mbar.toFixed(3) + '  G2 = ' + G2 +
                '   new: G2 = ' + G2n);
    console.log('  rho(m) = (maxsum_m - G2)/((m-1)mbar):  ' + rho.join('  '));
    console.log('  true longest kill run L = ' + L);
    const kr = [], krm = [], bound = [];
    for (const m of ms) {
      kr.push(m + ':' + kappa.get(m));
      krm.push(m + ':' + (kappa.get(m) / m).toFixed(3));
      const msn = maxsum(gn, m);
      bound.push(m + ':' + (msn / (p - 2) + 1).toFixed(1));
    }
    console.log('  kappa(m)        = ' + kr.join('  '));
    console.log('  kappa(m)/m      = ' + krm.join('  '));
    console.log('  counting bound  = ' + bound.join('  ') + '   [maxsum_m(new)/(p-2)+1]');
    console.log('  mbar_new/(p-2)  = ' + (mbar * p / (p - 2) / (p - 2)).toFixed(3) +
                '   <- the slope kappa(m)/m would have if kills were spacing-limited');
    hist.push({ x, p, mbar, G2, G2n, L, kappa, D });
    tile = newTile;
  }
}

main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/gate-multiplies-02.js
//   invocation:  node research/gate-multiplies-02.js
//   code-sha256: f942be273851b13e6dfa8e7ad6cbbf04a22b46379a60427610865a1801f4c4ef
//   out-sha256:  193221e9f9befff3b4cea99132760c8dfec90dde2efcec766ec40180137d5dd2
//   body-lines:  115
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     22.6 s
// ============================================================================
// [0.0s] fold T_3 -> 5  (D_old = 1, positions = 5)
// [0.0s] fold T_5 -> 7  (D_old = 3, positions = 21)
// [0.0s]   fold by 7: copy 1/7
// [0.0s]   fold by 7: copy 2/7
// [0.0s]   fold by 7: copy 3/7
// [0.0s]   fold by 7: copy 4/7
// [0.0s]   fold by 7: copy 5/7
// [0.0s]   fold by 7: copy 6/7
//
// === fold T_5 by p = 7 ===
//   old: D = 3  mbar = 10.000  G2 = 12   new: G2 = 30
//   rho(m) = (maxsum_m - G2)/((m-1)mbar):  2:1.200  3:0.900
//   true longest kill run L = 2
//   kappa(m)        = 1:2  2:2
//   kappa(m)/m      = 1:2.000  2:1.000
//   counting bound  = 1:7.0  2:9.4   [maxsum_m(new)/(p-2)+1]
//   mbar_new/(p-2)  = 2.800   <- the slope kappa(m)/m would have if kills were spacing-limited
// [0.0s] fold T_7 -> 11  (D_old = 15, positions = 165)
// [0.0s]   fold by 11: copy 1/11
// [0.0s]   fold by 11: copy 3/11
// [0.0s]   fold by 11: copy 5/11
// [0.0s]   fold by 11: copy 7/11
// [0.0s]   fold by 11: copy 9/11
//
// === fold T_7 by p = 11 ===
//   old: D = 15  mbar = 14.000  G2 = 30   new: G2 = 42
//   rho(m) = (maxsum_m - G2)/((m-1)mbar):  2:0.857  3:1.286  4:1.143  6:1.114  8:1.102  12:0.974
//   true longest kill run L = 1
//   kappa(m)        = 1:1  2:2  3:2  4:2  6:4  8:4  12:4
//   kappa(m)/m      = 1:1.000  2:1.000  3:0.667  4:0.500  6:0.667  8:0.500  12:0.333
//   counting bound  = 1:5.7  2:8.3  3:11.7  4:13.0  6:18.3  8:21.0  12:27.7   [maxsum_m(new)/(p-2)+1]
//   mbar_new/(p-2)  = 1.901   <- the slope kappa(m)/m would have if kills were spacing-limited
// [0.0s] fold T_11 -> 13  (D_old = 135, positions = 1755)
// [0.0s]   fold by 13: copy 1/13
// [0.0s]   fold by 13: copy 3/13
// [0.0s]   fold by 13: copy 5/13
// [0.0s]   fold by 13: copy 7/13
// [0.0s]   fold by 13: copy 9/13
// [0.0s]   fold by 13: copy 11/13
//
// === fold T_11 by p = 13 ===
//   old: D = 135  mbar = 17.111  G2 = 42   new: G2 = 66
//   rho(m) = (maxsum_m - G2)/((m-1)mbar):  2:1.403  3:1.578  4:1.286  6:1.332  8:1.152  12:1.052  16:1.122
//   true longest kill run L = 2
//   kappa(m)        = 1:2  2:2  3:2  4:2  6:3  8:4  12:5  16:6  24:8  32:9
//   kappa(m)/m      = 1:2.000  2:1.000  3:0.667  4:0.500  6:0.500  8:0.500  12:0.417  16:0.375  24:0.333  32:0.281
//   counting bound  = 1:7.0  2:9.7  3:13.5  4:15.2  6:17.9  8:21.7  12:31.0  16:36.5  24:53.4  32:69.2   [maxsum_m(new)/(p-2)+1]
//   mbar_new/(p-2)  = 1.838   <- the slope kappa(m)/m would have if kills were spacing-limited
// [0.0s] fold T_13 -> 17  (D_old = 1485, positions = 25245)
// [0.0s]   fold by 17: copy 1/17
// [0.0s]   fold by 17: copy 4/17
// [0.0s]   fold by 17: copy 7/17
// [0.0s]   fold by 17: copy 10/17
// [0.0s]   fold by 17: copy 13/17
// [0.0s]   fold by 17: copy 16/17
//
// === fold T_13 by p = 17 ===
//   old: D = 1485  mbar = 20.222  G2 = 66   new: G2 = 108
//   rho(m) = (maxsum_m - G2)/((m-1)mbar):  2:1.484  3:1.780  4:1.484  6:1.187  8:1.144  12:1.187  16:1.068
//   true longest kill run L = 2
//   kappa(m)        = 1:2  2:2  3:2  4:3  6:3  8:4  12:5  16:6  24:7  32:9
//   kappa(m)/m      = 1:2.000  2:1.000  3:0.667  4:0.750  6:0.500  8:0.500  12:0.417  16:0.375  24:0.292  32:0.281
//   counting bound  = 1:8.2  2:11.0  3:12.2  4:14.2  6:17.0  8:20.2  12:27.0  16:36.2  24:48.2  32:59.8   [maxsum_m(new)/(p-2)+1]
//   mbar_new/(p-2)  = 1.528   <- the slope kappa(m)/m would have if kills were spacing-limited
// [0.0s] fold T_17 -> 19  (D_old = 22275, positions = 423225)
// [0.0s]   fold by 19: copy 1/19
// [0.0s]   fold by 19: copy 4/19
// [0.0s]   fold by 19: copy 7/19
// [0.0s]   fold by 19: copy 10/19
// [0.0s]   fold by 19: copy 13/19
// [0.0s]   fold by 19: copy 16/19
//
// === fold T_17 by p = 19 ===
//   old: D = 22275  mbar = 22.919  G2 = 108   new: G2 = 150
//   rho(m) = (maxsum_m - G2)/((m-1)mbar):  2:1.833  3:1.309  4:1.309  6:1.152  8:1.122  12:1.119  16:1.222
//   true longest kill run L = 2
//   kappa(m)        = 1:2  2:2  3:3  4:3  6:3  8:4  12:5  16:5  24:7  32:8
//   kappa(m)/m      = 1:2.000  2:1.000  3:1.000  4:0.750  6:0.500  8:0.500  12:0.417  16:0.313  24:0.292  32:0.250
//   counting bound  = 1:9.8  2:11.9  3:13.4  4:14.4  6:18.6  8:23.2  12:32.1  16:37.0  24:50.4  32:63.5   [maxsum_m(new)/(p-2)+1]
//   mbar_new/(p-2)  = 1.507   <- the slope kappa(m)/m would have if kills were spacing-limited
// [0.1s] fold T_19 -> 23  (D_old = 378675, positions = 8709525)
// [0.1s]   fold by 23: copy 1/23
// [0.2s]   fold by 23: copy 4/23
// [0.3s]   fold by 23: copy 7/23
// [0.4s]   fold by 23: copy 10/23
// [0.5s]   fold by 23: copy 13/23
// [0.5s]   fold by 23: copy 16/23
// [0.6s]   fold by 23: copy 19/23
// [0.7s]   fold by 23: copy 22/23
//
// === fold T_19 by p = 23 ===
//   old: D = 378675  mbar = 25.615  G2 = 150   new: G2 = 204
//   rho(m) = (maxsum_m - G2)/((m-1)mbar):  2:1.405  3:1.171  4:1.015  6:1.171  8:1.272  12:1.342  16:1.202
//   true longest kill run L = 3
//   kappa(m)        = 1:3  2:4  3:4  4:4  6:5  8:5  12:5  16:6  24:8  32:9
//   kappa(m)/m      = 1:3.000  2:2.000  3:1.333  4:1.000  6:0.833  8:0.625  12:0.417  16:0.375  24:0.333  32:0.281
//   counting bound  = 1:10.7  2:12.1  3:15.3  4:17.6  6:23.0  8:26.1  12:30.1  16:36.7  24:48.1  32:59.0   [maxsum_m(new)/(p-2)+1]
//   mbar_new/(p-2)  = 1.336   <- the slope kappa(m)/m would have if kills were spacing-limited
// [1.0s] fold T_23 -> 29  (D_old = 7952175, positions = 230613075)
// [2.4s]   fold by 29: copy 1/29
// [4.5s]   fold by 29: copy 5/29
// [6.7s]   fold by 29: copy 9/29
// [8.8s]   fold by 29: copy 13/29
// [10.9s]   fold by 29: copy 17/29
// [13.0s]   fold by 29: copy 21/29
// [15.1s]   fold by 29: copy 25/29
//
// === fold T_23 by p = 29 ===
//   old: D = 7952175  mbar = 28.054  G2 = 204   new: G2 = 258
//   rho(m) = (maxsum_m - G2)/((m-1)mbar):  2:1.069  3:1.711  4:1.711  6:1.839  8:1.650  12:1.322  16:1.297
//   true longest kill run L = 2
//   kappa(m)        = 1:2  2:3  3:3  4:3  6:4  8:4  12:5  16:5  24:8  32:8
//   kappa(m)/m      = 1:2.000  2:1.500  3:1.000  4:0.750  6:0.667  8:0.500  12:0.417  16:0.313  24:0.333  32:0.250
//   counting bound  = 1:10.6  2:13.2  3:15.4  4:16.6  6:21.0  8:22.6  12:27.9  16:33.7  24:43.0  32:53.9   [maxsum_m(new)/(p-2)+1]
//   mbar_new/(p-2)  = 1.116   <- the slope kappa(m)/m would have if kills were spacing-limited
// ============================================================================
// READINGS
// ============================================================================
