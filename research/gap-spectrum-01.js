// ============================================================================
// GAP-SPECTRUM-01 — THE FULL GAP-LENGTH DISTRIBUTION OF TWIN SLOTS OVER ONE
// PERIOD OF THE TILE, THE EXCESS-LENGTH FUNCTIONAL |B_N|, AND THE EMPIRICAL
// SIFTING CURVE, AT EVERY EXACT LEVEL IN REACH
// ============================================================================
// SETTING. T_x is the twin-slot tile: the positions n in [0, W), W = x#, with
// n and n+2 both coprime to x#. There are D_x = prod_{5<=p<=x}(p-2) of them
// (A059861), their gaps sum to W exactly, and the largest gap is G2(x#), the
// exact ladder of research/G2-STATE.md section 2 / OEIS A144311+1. The corpus
// holds the MAXIMUM of that gap multiset (the ladder), its scan-statistic
// generalisation maxsum_m on a coarse grid (history/staging/scanstat2.md), the
// count VARIANCE (paper/variance-note.md), and window-count laws in the rho
// family (history/staging/rho-maximal-law.md). It does NOT hold the
// distribution itself. This file computes it.
//
// THREE OBJECTS, ONE STREAMING PASS.
//
//   1. THE GAP SPECTRUM. The multiset {g_i}, as an exact histogram (all gaps
//      are multiples of 6 for x >= 5), with the number of gaps, the mean
//      (= W/D exactly, asserted), the tail counts #{g > t} on a geometric grid
//      of t/mbar, the max (asserted equal to the ladder's G2 at every level),
//      and the log-tail slope read on the range where counts exceed 100.
//
//   2. THE EXCESS-LENGTH FUNCTIONAL |B_N| = sum_{g>N} (g - N), proven in
//      history/staging/gap-spectrum-01.md section 2 to equal the number of
//      window starts s in [0,W) whose length-N window holds no twin slot, so
//      that G2 <= N + |B_N| for every N. Tabulated on N = round(x^s),
//      s in {1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5}, against the renewal null
//      |B_N|/W = exp(-N/mbar) pre-registered in section 1 of the note.
//
//   3. THE EMPIRICAL SIFTING CURVE. mincount(N) = min over ALL starts s in
//      [0,W) of #{slots in [s, s+N)}, divided by the mean count N*D/W, on the
//      same s-grid, against the kappa = 2 sieve lower-bound function f_2(s)
//      (zero for s <= beta_2 = 4.26645; DHR delay-differential system, solver
//      copied from research/attack-beta2-04-loss-budget.js section 3 with its
//      kappa = 1 closed-form validation carried along).
//
//      mincount is attained just past a slot, so
//        mincount(N) = min_i #{j > i : p_j - p_i <= N}
//      and equivalently mincount(N) = max{m : maxsum_m <= N}, which makes this
//      curve an exact re-encoding of the scan statistic already tabulated at
//      T_23, T_29, T_31 on a coarse m-grid. Stated so the novelty claim stays
//      small: the grid is new, the object is not.
//
// ENGINE. One segmented mod-6 bit/byte sieve over j, where n = 6j + 5 (every
// twin slot is 5 mod 6 for x >= 5), so the scan touches W/6 cells. Primes
// 5..min(x,19) are carried as a precomputed periodic pattern of length
// prod = 1,616,615 bytes, copied into each segment by typed-array set; the
// remaining primes are struck individually. Survivors stream out in order and
// feed (a) the gap histogram, (b) a ring-buffer two-pointer per window length
// N, cyclically closed by replaying the first survivors offset by W.
//
// CALIBRATION, every one of which aborts the run:
//   slot count       = prod_{5<=p<=x}(p-2)               [A059861]
//   sum of gaps      = W exactly, and count of gaps = D  [period closure]
//   max gap          = G2(x#) from the exact ladder      [G2-STATE.md sec.2]
//   mean gap         = W/D exactly                        [asserted, not fitted]
//   every gap        = 0 mod 6 for x >= 5
//   |B_N| at N = G2  = 0, and at N = G2-1 equals the max gap's multiplicity
//   mincount(N) = 0 for N < G2 and >= 1 for N = G2        [same edge, other object]
//   DHR solver       reproduces F1 = 2e^g/u on [1,3] and f1 = 2e^g ln(u-1)/u
//                    on [2,4], and f2(20) -> 1 at the published beta_2
//
// WIDTH AUDIT (the level this RUNS at, @31, and what would be needed at @37).
//   j index      < W/6 = 3.343e10  < 2^35   exact in a double (< 2^53)
//   position n   < W   = 2.006e11  < 2^38   exact in a double
//   slot count D = 6.226e9         < 2^33   exact in a double
//   gap g        <= G2(31#) = 348  < 2^9    fits Int32, histogram index g/6 < 64
//   sum of gaps  = W = 2.006e11    < 2^38   exact (integer-valued double)
//   |B_N|        <= W              < 2^38   exact
//   sum over the mincount two-pointer: differences of positions, all < 2^38.
//   NO bit shifts are applied to any index above 2^31: the segment-local index
//   (< 2^22) is the only shifted quantity, and j0 is added as a Number. The
//   pattern offset uses Number % Number on operands below 2^35, exact.
//   At @37, W/6 = 1.237e12 cells: still exact in a double, but the scan is
//   1.24e12 byte writes and is OUT OF BUDGET, which is why @37 is not run.
//
// NO CLAIM ABOUT THE ASYMPTOTIC EXPONENT IS MADE OR CAN BE MADE HERE. Nine
// levels of an exact distribution are nine levels; the pre-registration in the
// note names the direction the renewal null is expected to fail in and the
// reading survives only as MEASURED.
//
//   node --max-old-space-size=4096 research/gap-spectrum-01.js
//   node --max-old-space-size=4096 research/gap-spectrum-01.js --levels 5,7,11
// ============================================================================
'use strict';
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';

let failures = 0;
function assertEq(tag, got, want) {
  if (got !== want) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; }
  return true;
}
function assertTrue(tag, cond, detail) {
  if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]${detail ? ': ' + detail : ''}`); }
  return cond;
}
const F = (v, d) => (Number.isFinite(v) ? v.toFixed(d) : 'n/a');
const P = (s, w) => String(s).padEnd(w);
const R = (s, w) => String(s).padStart(w);
function rule(t) { console.log('\n' + '='.repeat(78) + '\n' + t + '\n' + '='.repeat(78)); }
function sub(t) { console.log('\n' + '-'.repeat(78) + '\n' + t + '\n' + '-'.repeat(78)); }

const EULER = 0.5772156649015328606;
const BETA2 = 4.26645028414864191641;   // paper/beta2-note.md; Diamond-Halberstam
const ALPHA2 = 5.35770736985376;        // Booker-Browning alpha_2, as in attack-beta2-04

// the exact ladder, research/G2-STATE.md section 2 (A144311 + 1)
const LADDER = { 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258, 31: 348, 37: 528 };
const SGRID = [1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5];

function primesTo(n) { const s = []; for (let i = 2; i <= n; i++) { let p = true; for (let j = 2; j * j <= i; j++) if (i % j === 0) { p = false; break; } if (p) s.push(i); } return s; }
function tileWD(x) { let D = 1, W = 1; for (const p of primesTo(x)) { W *= p; if (p >= 5) D *= (p - 2); } return { W, D }; }
function inv(a, m) { a = ((a % m) + m) % m; for (let i = 1; i < m; i++) if ((a * i) % m === 1) return i; return NaN; }
// n = 6j + 5.  n = 0 mod p  <=>  j = -5*inv6 mod p ;  n = -2 mod p  <=>  j = -7*inv6 mod p
function badResidues(p) { const i6 = inv(6, p); return [(((-5 * i6) % p) + p) % p, (((-7 * i6) % p) + p) % p]; }

function ols(xs, ys) {
  const n = xs.length; if (n < 2) return { a: NaN, b: NaN, r2: NaN, n };
  const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; syy += (ys[i] - my) ** 2; }
  const b = sxy / sxx, a = my - b * mx;
  return { a, b, r2: syy > 0 ? (sxy * sxy) / (sxx * syy) : NaN, n };
}

// ---------------------------------------------------------------------------
// THE DHR DIMENSION-2 SYSTEM. Copied verbatim in structure from
// research/attack-beta2-04-loss-budget.js section 3 (which cites Booker-Browning
// Thm 3.1 via research/dhr-verification.md section 1.1) so that this file needs
// no import; its kappa = 1 validation is carried along below and must pass.
// ---------------------------------------------------------------------------
function solveDDE(kappa, alpha, beta, UMAX, h) {
  const N = Math.round(UMAX / h) + 1;
  const i1 = Math.round(1 / h), i2 = Math.round(2 / h);
  const G = new Float64Array(N), Fa = new Float64Array(N), fa = new Float64Array(N);
  const gam = kappa === 1 ? 1 : 2;
  const A = Math.pow(2 * Math.exp(EULER), -kappa) / gam;
  for (let i = 0; i <= i2 && i < N; i++) G[i] = A;
  const dg = i => { const u = i * h; return u <= 2 ? 0 : -kappa * Math.pow(u, -kappa - 1) * Math.pow(u - 2, kappa) * G[i - i2]; };
  for (let i = i2 + 1; i < N; i++) G[i] = G[i - 1] + 0.5 * h * (dg(i - 1) + dg(i));
  const sigma = i => Math.pow(i * h, kappa) * G[i];
  const ia = Math.floor(alpha / h), ib = Math.floor(beta / h);
  for (let i = 1; i <= ia && i < N; i++) Fa[i] = 1 / sigma(i);
  Fa[0] = Infinity;
  let PF = Math.pow(ia * h, kappa) * Fa[ia], Pf = 0;
  const start = Math.min(ia, ib) + 1;
  for (let i = start; i < N; i++) {
    const u = i * h, um = (i - 1) * h;
    if (i > ib) { Pf += 0.5 * h * (kappa * Math.pow(um, kappa - 1) * Fa[i - 1 - i1] + kappa * Math.pow(u, kappa - 1) * Fa[i - i1]); fa[i] = Pf / Math.pow(u, kappa); }
    if (i > ia) { PF += 0.5 * h * (kappa * Math.pow(um, kappa - 1) * fa[i - 1 - i1] + kappa * Math.pow(u, kappa - 1) * fa[i - i1]); Fa[i] = PF / Math.pow(u, kappa); }
  }
  const at = (arr, u) => { const t = u / h, i = Math.floor(t); if (i < 0 || i + 1 >= N) return NaN; const w = t - i; return arr[i] * (1 - w) + arr[i + 1] * w; };
  return { F: u => at(Fa, u), f: u => at(fa, u) };
}

// ---------------------------------------------------------------------------
// THE ENGINE. One segmented pass. Returns the gap histogram (exact) and the
// mincount table (exact), plus timings.
// ---------------------------------------------------------------------------
const SEGJ = 1 << 22;             // j-cells per segment (4,194,304); 4 MB byte buffer
const RB = 1 << 14, RMASK = RB - 1;

function scanLevel(x, Ns) {
  const { W, D } = tileWD(x);
  const M = W / 6;                                     // number of j-cells, exact
  const ps = primesTo(x).filter(p => p >= 5);
  const patP = ps.filter(p => p <= 19);
  const restP = ps.filter(p => p > 19);
  let PAT = 1; for (const p of patP) PAT *= p;
  const pat = new Uint8Array(PAT);
  for (const p of patP) for (const r of badResidues(p)) for (let k = r; k < PAT; k += p) pat[k] = 1;

  const segLen = Math.min(SEGJ, Math.max(4, Math.ceil(M / 4) * 4));
  const buf = new Uint8Array(Math.ceil(segLen / 4) * 4);
  const w32 = new Uint32Array(buf.buffer);
  const restRes = restP.map(p => ({ p, r: badResidues(p) }));

  // gap histogram, index g/6
  const HB = 4096;
  const hist = new Float64Array(HB);
  let nSlots = 0, sumGaps = 0, nGaps = 0, maxGap = 0, firstPos = -1, lastPos = -1;
  let nonMul6 = 0;

  // mincount two-pointer state
  const K = Ns.length;
  const ring = new Float64Array(RB);
  const ptr = new Float64Array(K);
  const mins = new Float64Array(K).fill(Infinity);
  const NA = Float64Array.from(Ns);
  let idx = 0;                       // global slot index of the next slot to be written
  let ringOverrun = 0;
  const FK = 1 << 13;
  const firstList = new Float64Array(FK);
  let nFirst = 0;

  function feed(p) {
    ring[idx & RMASK] = p;
    for (let k = 0; k < K; k++) {
      const nk = NA[k];
      let q = ptr[k];
      while (q < idx && q < D && p - ring[q & RMASK] > nk) {
        const c = idx - 1 - q;
        if (c < mins[k]) mins[k] = c;
        q++;
      }
      ptr[k] = q;
      if (idx - q >= RB) ringOverrun++;
    }
    idx++;
  }

  const tScan0 = Date.now();
  for (let j0 = 0; j0 < M; j0 += segLen) {
    const len = Math.min(segLen, M - j0);
    // lay down the pattern
    let t = 0, o = j0 % PAT;
    while (t < len) { const c = Math.min(PAT - o, len - t); buf.set(pat.subarray(o, o + c), t); t += c; o += c; if (o === PAT) o = 0; }
    // strike the remaining primes
    for (let a = 0; a < restRes.length; a++) {
      const p = restRes[a].p, rs = restRes[a].r;
      for (let b = 0; b < 2; b++) {
        let k = rs[b] - (j0 % p); if (k < 0) k += p;
        for (; k < len; k += p) buf[k] = 1;
      }
    }
    // enumerate survivors
    const nw = len >> 2;
    for (let w = 0; w < nw; w++) {
      if (w32[w] === 0x01010101) continue;
      const b0 = w << 2;
      for (let t2 = 0; t2 < 4; t2++) {
        if (buf[b0 + t2] === 0) {
          const pos = 6 * (j0 + b0 + t2) + 5;
          nSlots++;
          if (firstPos < 0) firstPos = pos; else {
            const g = pos - lastPos;
            if (g % 6 !== 0) nonMul6++;
            const gi = g / 6;
            if (gi < HB) hist[gi]++; else failures++;
            sumGaps += g; nGaps++; if (g > maxGap) maxGap = g;
          }
          lastPos = pos;
          if (nFirst < FK) firstList[nFirst++] = pos;
          feed(pos);
        }
      }
    }
    for (let t2 = nw << 2; t2 < len; t2++) {
      if (buf[t2] === 0) {
        const pos = 6 * (j0 + t2) + 5;
        nSlots++;
        if (firstPos < 0) firstPos = pos; else {
          const g = pos - lastPos; if (g % 6 !== 0) nonMul6++;
          const gi = g / 6; if (gi < HB) hist[gi]++; else failures++;
          sumGaps += g; nGaps++; if (g > maxGap) maxGap = g;
        }
        lastPos = pos;
        if (nFirst < FK) firstList[nFirst++] = pos;
        feed(pos);
      }
    }
  }
  // close the period: the wrap gap, and the cyclic completion of the two-pointer
  const wrapGap = firstPos + W - lastPos;
  if (wrapGap % 6 !== 0) nonMul6++;
  hist[wrapGap / 6]++; sumGaps += wrapGap; nGaps++; if (wrapGap > maxGap) maxGap = wrapGap;

  let rep = 1, guard = 0;
  while (guard++ < 64) {
    let done = true; for (let k = 0; k < K; k++) if (ptr[k] < D) done = false;
    if (done) break;
    for (let t = 0; t < nFirst; t++) feed(firstList[t] + rep * W);
    rep++;
  }
  const scanSec = (Date.now() - tScan0) / 1000;

  return { x, W, D, M, nSlots, nGaps, sumGaps, maxGap, hist, nonMul6, mins: Array.from(mins), ringOverrun, scanSec, wrapGap };
}

// ---------------------------------------------------------------------------
// derived, exact, from the histogram
// ---------------------------------------------------------------------------
function tailCount(hist, t) { let c = 0; for (let i = 0; i < hist.length; i++) if (6 * i > t) c += hist[i]; return c; }
function excess(hist, N) { let s = 0; for (let i = 0; i < hist.length; i++) { const g = 6 * i; if (g > N) s += hist[i] * (g - N); } return s; }

// ===========================================================================
function main() {
  const argv = process.argv.slice(2);
  const li = argv.indexOf('--levels');
  const levels = li >= 0 ? argv[li + 1].split(',').map(Number) : [5, 7, 11, 13, 17, 19, 23, 29, 31];

  rule('GAP-SPECTRUM-01 — the gap multiset of the twin-slot tile, |B_N|, and the empirical sifting curve');
  console.log('Levels: ' + levels.join(', ') + '.  Producer: research/gap-spectrum-01.js');
  console.log('Note (pre-registration in section 1): research/history/staging/gap-spectrum-01.md');

  // -------------------------------------------------------------------------
  sub('0. THE RENEWAL NULL, EVALUATED. Formulas fixed in the note section 1 before the run.');
  console.log('N1 tail:    #{g > t} = D*exp(-t/mbar); log-tail slope on t/mbar is exactly -1.');
  console.log('N2 excess:  |B_N| = W*exp(-N/mbar), so |B_N|/W = exp(-N/mbar).');
  console.log('N3 max:     G2_null = mbar * ln D.');
  console.log('');
  console.log('  x |            W |            D |    mbar | ln D  |  G2_null | G2 true | null/true');
  for (const x of levels) {
    const { W, D } = tileWD(x); const mb = W / D; const gn = mb * Math.log(D); const gt = LADDER[x];
    console.log(`${R(x, 3)} | ${R(W, 12)} | ${R(D, 12)} | ${R(F(mb, 4), 7)} | ${R(F(Math.log(D), 3), 5)} | ${R(F(gn, 1), 8)} | ${R(gt, 7)} | ${R(F(gn / gt, 3), 9)}`);
  }
  console.log('\n  Registered reading P1: the renewal maximum EXCEEDS the truth at every level,');
  console.log('  so the far tail is predicted LIGHTER than exponential with a cut-off near G2.');

  // -------------------------------------------------------------------------
  sub('0b. THE DHR SOLVER, VALIDATED (kappa = 1 closed forms; the kappa = 2 far field).');
  const h = 1e-5, UMAX = 22;
  const s1 = solveDDE(1, 2, 2, UMAX, h), s2 = solveDDE(2, ALPHA2, BETA2, UMAX, h);
  const twoEg = 2 * Math.exp(EULER);
  let vmax = 0;
  for (const u of [1.5, 2.0, 2.5, 3.0, 3.5, 4.0]) {
    if (u <= 3) vmax = Math.max(vmax, Math.abs(s1.F(u) / (twoEg / u) - 1));
    if (u >= 2.2 && u <= 4) vmax = Math.max(vmax, Math.abs(s1.f(u) / (twoEg * Math.log(u - 1) / u) - 1));
  }
  console.log(`  kappa=1 closed-form max relative error over the checked points: ${vmax.toExponential(2)}`);
  console.log(`  f1(20) = ${F(s1.f(20), 8)}   f2(20) = ${F(s2.f(20), 8)}   [both must -> 1]`);
  assertTrue('DHR kappa=1 closed forms', vmax < 1e-4, vmax.toExponential(2));
  assertTrue('DHR f2 far field', Math.abs(s2.f(20) - 1) < 1e-4);
  console.log(`  f2(s) is 0 for s <= beta_2 = ${F(BETA2, 5)}: f2(4.0) = ${F(Math.max(0, s2.f(4.0)), 6)}, f2(4.26645) = ${F(Math.max(0, s2.f(BETA2)), 6)}, f2(4.5) = ${F(Math.max(0, s2.f(4.5)), 6)}, f2(5) = ${F(Math.max(0, s2.f(5)), 6)}`);
  console.log(`  The whole s-grid of this file, s <= 2.5, sits at f2(s) = 0. The kappa = 1 column is`);
  console.log(`  the calibration: f1(s) = 0 for s <= beta_1 = 2, f1(2.5) = ${F(Math.max(0, s1.f(2.5)), 6)}, f1(3) = ${F(Math.max(0, s1.f(3)), 6)}.`);

  // -------------------------------------------------------------------------
  const res = [];
  for (const x of levels) {
    const { W, D } = tileWD(x);
    const Ns = SGRID.map(s => Math.round(Math.pow(x, s))).concat([LADDER[x] - 1, LADDER[x], 2 * LADDER[x], 4 * LADDER[x]]);
    const r = scanLevel(x, Ns);
    r.Ns = Ns;
    res.push(r);
    // calibration gates
    assertEq(`@${x} slot count`, r.nSlots, D);
    assertEq(`@${x} gap count`, r.nGaps, D);
    assertEq(`@${x} sum of gaps = W`, r.sumGaps, W);
    assertEq(`@${x} max gap = G2 ladder`, r.maxGap, LADDER[x]);
    assertEq(`@${x} all gaps 0 mod 6`, r.nonMul6, 0);
    assertEq(`@${x} ring buffer never overrun`, r.ringOverrun, 0);
    const iG = Ns.indexOf(LADDER[x]), iGm = Ns.indexOf(LADDER[x] - 1);
    assertEq(`@${x} |B_{G2}| = 0`, excess(r.hist, LADDER[x]), 0);
    assertEq(`@${x} |B_{G2-1}| = multiplicity of the max gap`, excess(r.hist, LADDER[x] - 1), r.hist[LADDER[x] / 6]);
    assertTrue(`@${x} mincount(G2) >= 1`, r.mins[iG] >= 1, 'got ' + r.mins[iG]);
    assertEq(`@${x} mincount(G2-1) = 0`, r.mins[iGm], 0);
    console.log(`\n  [@${x}] scanned ${r.M} cells, ${r.D} slots, ${r.scanSec.toFixed(1)} s   (elapsed ${el()})`);
  }

  // -------------------------------------------------------------------------
  rule('1. THE GAP SPECTRUM');
  sub('1a. The summary. mean is ASSERTED equal to W/D, not fitted; max is ASSERTED equal to the ladder.');
  console.log('  x |    #gaps |    mean | max = G2 | max/mean | ln D  | mode g | sd/mean | skew');
  for (const r of res) {
    const mb = r.W / r.D;
    let s1m = 0, s2m = 0, s3m = 0, mode = 0, mc = -1;
    for (let i = 0; i < r.hist.length; i++) if (r.hist[i] > 0) { const g = 6 * i, c = r.hist[i]; s1m += c * g; s2m += c * (g - mb) ** 2; s3m += c * (g - mb) ** 3; if (c > mc) { mc = c; mode = g; } }
    const sd = Math.sqrt(s2m / r.D), sk = (s3m / r.D) / Math.pow(sd, 3);
    console.log(`${R(r.x, 3)} | ${R(r.D, 8)} | ${R(F(mb, 4), 7)} | ${R(r.maxGap, 8)} | ${R(F(r.maxGap / mb, 3), 8)} | ${R(F(Math.log(r.D), 3), 5)} | ${R(mode, 6)} | ${R(F(sd / mb, 4), 7)} | ${R(F(sk, 3), 5)}`);
    assertEq(`@${r.x} histogram first moment = W`, s1m, r.W);
  }
  console.log('\n  Under the renewal null sd/mean = 1 and skew = 2 exactly, and max/mean = ln D.');

  sub('1b. The full histogram, counts by gap length. "." = zero count. Gaps are multiples of 6.');
  for (const r of res) {
    console.log(`\n  x = ${r.x}   (D = ${r.D}, mbar = ${F(r.W / r.D, 4)}, G2 = ${r.maxGap})`);
    const top = r.maxGap / 6;
    let line = '   ';
    for (let i = 1; i <= top; i++) {
      line += `${R(6 * i, 5)}:${R(r.hist[i] > 0 ? r.hist[i] : '.', 12)}`;
      if (i % 4 === 0) { console.log(line); line = '   '; }
    }
    if (line.trim()) console.log(line);
  }

  sub('1c. Tail counts on a geometric grid of t/mbar, and the ratio to the renewal null.');
  const TG = [0.5, 0.75, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 12.0];
  for (const r of res) {
    const mb = r.W / r.D;
    console.log(`\n  x = ${r.x}   mbar = ${F(mb, 4)}   D = ${r.D}`);
    console.log('   t/mbar |     t |      #{g > t} |   /D          | null exp(-t/mbar) | meas/null | z_Poisson');
    for (const u of TG) {
      const t = mb * u; const c = tailCount(r.hist, t); const frac = c / r.D; const nul = Math.exp(-u);
      const zp = c > 0 ? (frac - nul) * r.D / Math.sqrt(Math.max(1, c)) : NaN;
      console.log(`  ${R(F(u, 2), 7)} | ${R(F(t, 1), 5)} | ${R(c, 13)} | ${R(frac.toExponential(5), 13)} | ${R(nul.toExponential(5), 17)} | ${R(c > 0 ? F(frac / nul, 4) : '0', 9)} | ${R(Number.isFinite(zp) ? F(zp, 1) : 'n/a', 9)}`);
    }
  }

  sub('1d. The tail SHAPE, read before anything is fitted.');
  console.log('  Three candidate readings, each with the statistic that separates it:');
  console.log('    exponential (renewal)  d ln(#{g>t}/D) / d(t/mbar) = -1, constant');
  console.log('    power law              d ln(#{g>t}) / d ln t constant');
  console.log('    cut-off near G2        the local slope STEEPENS without bound as t -> G2');
  console.log('');
  console.log('  Local log-tail slope in units of t/mbar, over the range where #{g>t} > 100.');
  console.log('  Each row is a decade of the tail fraction; the slope is the OLS slope of');
  console.log('  ln(#{g>t}/D) against t/mbar over the gap lengths inside that decade.');
  for (const r of res) {
    const mb = r.W / r.D;
    const us = [], ls = [];
    for (let i = 1; i * 6 <= r.maxGap; i++) { const t = 6 * i; const c = tailCount(r.hist, t); if (c > 100) { us.push(t / mb); ls.push(Math.log(c / r.D)); } }
    if (us.length < 4) { console.log(`  x = ${r.x}: fewer than 4 points with count > 100 (D = ${r.D}); no slope read.`); continue; }
    const all = ols(us, ls);
    console.log(`\n  x = ${r.x}   points with #{g>t} > 100: ${us.length}, spanning t/mbar ${F(us[0], 2)} to ${F(us[us.length - 1], 2)}`);
    console.log(`    whole-range OLS slope = ${F(all.b, 4)}   (renewal: -1)   R^2 = ${F(all.r2, 5)}`);
    console.log('    decade | t/mbar range   | pts | OLS slope | power-law slope d ln N / d ln t');
    const bands = [[0, -1], [-1, -2], [-2, -3], [-3, -4], [-4, -5], [-5, -6], [-6, -99]];
    for (const [hi, lo] of bands) {
      const uu = [], ll = [], lt = [];
      for (let k = 0; k < us.length; k++) { const y = ls[k] ; if (y <= hi * Math.LN10 && y > lo * Math.LN10) { uu.push(us[k]); ll.push(y); lt.push(Math.log(us[k] * mb)); } }
      if (uu.length < 3) continue;
      const f = ols(uu, ll), fp = ols(lt, ll);
      console.log(`    1e${hi}..1e${lo === -99 ? 'end' : lo} | ${R(F(uu[0], 2), 5)} to ${R(F(uu[uu.length - 1], 2), 5)} | ${R(uu.length, 3)} | ${R(F(f.b, 4), 9)} | ${R(F(fp.b, 3), 6)}`);
    }
  }

  // -------------------------------------------------------------------------
  rule('2. THE EXCESS-LENGTH FUNCTIONAL |B_N| = sum_{g>N}(g-N)');
  console.log('  |B_N| is EXACTLY the number of window starts s in [0,W) whose length-N window');
  console.log('  holds no twin slot (proof: note section 2), hence G2 <= N + |B_N| for every N.');
  console.log('  beta\'(s) = ln|B_N| / ln x with N = round(x^s).  Null: |B_N| = W*exp(-N/mbar).');
  for (const r of res) {
    const mb = r.W / r.D;
    console.log(`\n  x = ${r.x}   W = ${r.W}   mbar = ${F(mb, 4)}   G2 = ${r.maxGap}   ln W / ln x = ${F(Math.log(r.W) / Math.log(r.x), 4)}`);
    console.log('     s |     N |            |B_N| |    |B_N|/W |   beta\'(s) | null |B_N| | null beta\' | meas/null | hold?');
    for (const s of SGRID) {
      const N = Math.round(Math.pow(r.x, s));
      const b = excess(r.hist, N);
      const nul = r.W * Math.exp(-N / mb);
      const bp = b > 0 ? Math.log(b) / Math.log(r.x) : NaN;
      const np = nul > 0 ? Math.log(nul) / Math.log(r.x) : NaN;
      const hold = (b > 0 && nul > 0) ? (Math.abs(Math.log(b / nul)) <= Math.LN2 ? 'HOLD' : 'FAIL') : (b === 0 && nul < 0.5 ? 'HOLD' : 'FAIL');
      console.log(`  ${R(F(s, 2), 4)} | ${R(N, 5)} | ${R(b, 16)} | ${R((b / r.W).toExponential(4), 11)} | ${R(b > 0 ? F(bp, 4) : '-inf', 10)} | ${R(nul.toExponential(4), 11)} | ${R(Number.isFinite(np) ? F(np, 4) : 'n/a', 10)} | ${R(b > 0 && nul > 0 ? F(b / nul, 4) : (b === 0 ? '0' : 'n/a'), 9)} | ${hold}`);
    }
    console.log(`     the first grid N with |B_N| = 0 is the first N >= G2 = ${r.maxGap}; ln G2 / ln x = ${F(Math.log(r.maxGap) / Math.log(r.x), 4)}`);
  }

  sub('2b. beta\'(s) across the levels, measured, and the null beside it.');
  for (const s of SGRID) {
    console.log(`\n  s = ${F(s, 2)}`);
    console.log('    x |     N |            |B_N| |   beta\'(s) | null beta\' | meas/null');
    for (const r of res) {
      const mb = r.W / r.D, N = Math.round(Math.pow(r.x, s)), b = excess(r.hist, N), nul = r.W * Math.exp(-N / mb);
      console.log(`  ${R(r.x, 3)} | ${R(N, 5)} | ${R(b, 16)} | ${R(b > 0 ? F(Math.log(b) / Math.log(r.x), 4) : '-inf', 10)} | ${R(nul > 0 ? F(Math.log(nul) / Math.log(r.x), 4) : 'n/a', 10)} | ${R(b > 0 && nul > 0 ? F(b / nul, 4) : (b === 0 ? '0' : 'n/a'), 9)}`);
    }
  }

  sub('2c. What the identity G2 <= N + |B_N| actually certifies, priced.');
  console.log('    x | best N + |B_N| over the grid | at N  | G2  | ratio to G2');
  for (const r of res) {
    let best = Infinity, bn = 0;
    for (const s of SGRID) { const N = Math.round(Math.pow(r.x, s)); const v = N + excess(r.hist, N); if (v < best) { best = v; bn = N; } }
    console.log(`  ${R(r.x, 3)} | ${R(best, 28)} | ${R(bn, 5)} | ${R(r.maxGap, 3)} | ${R(F(best / r.maxGap, 4), 11)}`);
  }

  // -------------------------------------------------------------------------
  rule('3. THE EMPIRICAL SIFTING CURVE');
  console.log('  mincount(N) = min over ALL W starts of the count in a length-N window, exact.');
  console.log('  mean count = N*D/W.  f2(s) is the kappa = 2 DHR sieve lower bound, 0 for s <= beta_2.');
  for (const r of res) {
    console.log(`\n  x = ${r.x}   D = ${r.D}   W = ${r.W}   G2 = ${r.maxGap}   ln G2 / ln x = ${F(Math.log(r.maxGap) / Math.log(r.x), 4)}`);
    console.log('     s |     N | mincount | mean count | min/mean | f2(s) | f1(s) | N >= W?');
    for (let k = 0; k < SGRID.length; k++) {
      const s = SGRID[k], N = r.Ns[k], mc = r.mins[k], mean = N * r.D / r.W;
      console.log(`  ${R(F(s, 2), 4)} | ${R(N, 5)} | ${R(N >= r.W ? 'n/a' : mc, 8)} | ${R(F(mean, 4), 10)} | ${R(N >= r.W ? 'n/a' : F(mc / mean, 4), 8)} | ${R(F(Math.max(0, s2.f(s)), 3), 5)} | ${R(F(Math.max(0, s1.f(s)), 3), 5)} | ${N >= r.W ? 'YES (window exceeds the period)' : 'no'}`);
    }
    const iG = r.Ns.indexOf(r.maxGap);
    console.log(`     anchors: N = G2-1 = ${r.maxGap - 1}: mincount ${r.mins[SGRID.length]} ;  N = G2 = ${r.maxGap}: mincount ${r.mins[iG]}, mean ${F(r.maxGap * r.D / r.W, 3)}, min/mean ${F(r.mins[iG] / (r.maxGap * r.D / r.W), 4)}`);
    console.log(`              N = 2*G2 = ${2 * r.maxGap}: mincount ${r.mins[SGRID.length + 2]}, min/mean ${F(r.mins[SGRID.length + 2] / (2 * r.maxGap * r.D / r.W), 4)} ;  N = 4*G2 = ${4 * r.maxGap}: mincount ${r.mins[SGRID.length + 3]}, min/mean ${F(r.mins[SGRID.length + 3] / (4 * r.maxGap * r.D / r.W), 4)}`);
  }

  sub('3b. The onset. mincount(N) >= 1 exactly when N >= G2, so the onset s is ln G2 / ln x.');
  console.log('    x | ln G2 / ln x | first grid s with mincount > 0 | min/mean there | min/mean at N = G2');
  for (const r of res) {
    const on = Math.log(r.maxGap) / Math.log(r.x);
    let fs = NaN, fr = NaN;
    for (let k = 0; k < SGRID.length; k++) { const N = r.Ns[k]; if (N < r.W && r.mins[k] > 0) { fs = SGRID[k]; fr = r.mins[k] / (N * r.D / r.W); break; } }
    const iG = r.Ns.indexOf(r.maxGap);
    console.log(`  ${R(r.x, 3)} | ${R(F(on, 4), 12)} | ${R(Number.isFinite(fs) ? F(fs, 2) : 'none on grid', 30)} | ${R(Number.isFinite(fr) ? F(fr, 4) : 'n/a', 14)} | ${R(F(r.mins[iG] / (r.maxGap * r.D / r.W), 4), 18)}`);
  }
  console.log('\n  The onset is BELOW beta_2 = 4.26645 at every level, and below beta_1 = 2 at most of');
  console.log('  them. f2(s) = 0 across the whole grid, so the sieve lower bound is vacuous exactly');
  console.log('  where the truth is not: that gap IS the Face-4 barrier, restated on this instrument.');

  // -------------------------------------------------------------------------
  rule('CALIBRATION SUMMARY');
  console.log(`  assertion failures: ${failures}`);
  console.log('  gates run per level: slot count vs A059861; gap count = D; sum of gaps = W;');
  console.log('  max gap = the exact ladder; every gap 0 mod 6; histogram first moment = W;');
  console.log('  |B_{G2}| = 0 and |B_{G2-1}| = the max gap\'s multiplicity; mincount(G2-1) = 0');
  console.log('  and mincount(G2) >= 1; the histogram tail above G2 is empty;');
  console.log('  ring buffer never overrun; DHR kappa = 1 closed forms and the kappa = 2 far field.');
  console.log('\n  runtimes, seconds of scan per level:');
  for (const r of res) console.log(`    x = ${R(r.x, 3)}   cells ${R(r.M, 14)}   slots ${R(r.D, 12)}   ${R(F(r.scanSec, 1), 8)} s`);
  console.log(`\n  total elapsed ${el()}`);
  if (failures) { console.log('\n  RUN IS NOT CLEAN.'); process.exitCode = 1; }
}
main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/gap-spectrum-01.js
//   invocation:  node research/gap-spectrum-01.js
//   code-sha256: f0adb3ad63c5dbddce0355e5472fe48994882847f7d94d0bdd9a3cc021e84181
//   out-sha256:  74304758d757e03c321bb71e5ba9f82284fc56032c710f5f7ff4825fb4049e40
//   body-lines:  744
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     1322.1 s
// ============================================================================
//
// ==============================================================================
// GAP-SPECTRUM-01 — the gap multiset of the twin-slot tile, |B_N|, and the empirical sifting curve
// ==============================================================================
// Levels: 5, 7, 11, 13, 17, 19, 23, 29, 31.  Producer: research/gap-spectrum-01.js
// Note (pre-registration in section 1): research/history/staging/gap-spectrum-01.md
//
// ------------------------------------------------------------------------------
// 0. THE RENEWAL NULL, EVALUATED. Formulas fixed in the note section 1 before the run.
// ------------------------------------------------------------------------------
// N1 tail:    #{g > t} = D*exp(-t/mbar); log-tail slope on t/mbar is exactly -1.
// N2 excess:  |B_N| = W*exp(-N/mbar), so |B_N|/W = exp(-N/mbar).
// N3 max:     G2_null = mbar * ln D.
//
//   x |            W |            D |    mbar | ln D  |  G2_null | G2 true | null/true
//   5 |           30 |            3 | 10.0000 | 1.099 |     11.0 |      12 |     0.916
//   7 |          210 |           15 | 14.0000 | 2.708 |     37.9 |      30 |     1.264
//  11 |         2310 |          135 | 17.1111 | 4.905 |     83.9 |      42 |     1.998
//  13 |        30030 |         1485 | 20.2222 | 7.303 |    147.7 |      66 |     2.238
//  17 |       510510 |        22275 | 22.9185 | 10.011 |    229.4 |     108 |     2.124
//  19 |      9699690 |       378675 | 25.6148 | 12.844 |    329.0 |     150 |     2.193
//  23 |    223092870 |      7952175 | 28.0543 | 15.889 |    445.8 |     204 |     2.185
//  29 |   6469693230 |    214708725 | 30.1324 | 19.185 |    578.1 |     258 |     2.241
//  31 | 200560490130 |   6226553025 | 32.2105 | 22.552 |    726.4 |     348 |     2.087
//
//   Registered reading P1: the renewal maximum EXCEEDS the truth at every level,
//   so the far tail is predicted LIGHTER than exponential with a cut-off near G2.
//
// ------------------------------------------------------------------------------
// 0b. THE DHR SOLVER, VALIDATED (kappa = 1 closed forms; the kappa = 2 far field).
// ------------------------------------------------------------------------------
//   kappa=1 closed-form max relative error over the checked points: 2.47e-5
//   f1(20) = 1.00000629   f2(20) = 0.99999783   [both must -> 1]
//   f2(s) is 0 for s <= beta_2 = 4.26645: f2(4.0) = 0.000000, f2(4.26645) = 0.000000, f2(4.5) = 0.240280, f2(5) = 0.578997
//   The whole s-grid of this file, s <= 2.5, sits at f2(s) = 0. The kappa = 1 column is
//   the calibration: f1(s) = 0 for s <= beta_1 = 2, f1(2.5) = 0.577744, f1(3) = 0.823042.
//
//   [@5] scanned 5 cells, 3 slots, 0.0 s   (elapsed 0.5s)
//
//   [@7] scanned 35 cells, 15 slots, 0.0 s   (elapsed 0.5s)
//
//   [@11] scanned 385 cells, 135 slots, 0.0 s   (elapsed 0.5s)
//
//   [@13] scanned 5005 cells, 1485 slots, 0.0 s   (elapsed 0.5s)
//
//   [@17] scanned 85085 cells, 22275 slots, 0.0 s   (elapsed 0.5s)
//
//   [@19] scanned 1616615 cells, 378675 slots, 0.1 s   (elapsed 0.6s)
//
//   [@23] scanned 37182145 cells, 7952175 slots, 1.4 s   (elapsed 2.0s)
//
//   [@29] scanned 1078282205 cells, 214708725 slots, 39.6 s   (elapsed 41.6s)
//
//   [@31] scanned 33426748355 cells, 6226553025 slots, 1280.5 s   (elapsed 1322.0s)
//
// ==============================================================================
// 1. THE GAP SPECTRUM
// ==============================================================================
//
// ------------------------------------------------------------------------------
// 1a. The summary. mean is ASSERTED equal to W/D, not fitted; max is ASSERTED equal to the ladder.
// ------------------------------------------------------------------------------
//   x |    #gaps |    mean | max = G2 | max/mean | ln D  | mode g | sd/mean | skew
//   5 |        3 | 10.0000 |       12 |    1.200 | 1.099 |     12 |  0.2828 | -0.707
//   7 |       15 | 14.0000 |       30 |    2.143 | 2.708 |     12 |  0.5111 | 1.223
//  11 |      135 | 17.1111 |       42 |    2.455 | 4.905 |     12 |  0.5491 | 0.906
//  13 |     1485 | 20.2222 |       66 |    3.264 | 7.303 |     12 |  0.5950 | 1.109
//  17 |    22275 | 22.9185 |      108 |    4.712 | 10.011 |     12 |  0.6364 | 1.378
//  19 |   378675 | 25.6148 |      150 |    5.856 | 12.844 |     12 |  0.6700 | 1.522
//  23 |  7952175 | 28.0543 |      204 |    7.272 | 15.889 |     12 |  0.6939 | 1.579
//  29 | 214708725 | 30.1324 |      258 |    8.562 | 19.185 |     12 |  0.7116 | 1.607
//  31 | 6226553025 | 32.2105 |      348 |   10.804 | 22.552 |     12 |  0.7270 | 1.626
//
//   Under the renewal null sd/mean = 1 and skew = 2 exactly, and max/mean = ln D.
//
// ------------------------------------------------------------------------------
// 1b. The full histogram, counts by gap length. "." = zero count. Gaps are multiples of 6.
// ------------------------------------------------------------------------------
//
//   x = 5   (D = 3, mbar = 10.0000, G2 = 12)
//        6:           1   12:           2
//
//   x = 7   (D = 15, mbar = 14.0000, G2 = 30)
//        6:           3   12:           8   18:           2   24:           .
//       30:           2
//
//   x = 11   (D = 135, mbar = 17.1111, G2 = 42)
//        6:          21   12:          56   18:          22   24:           6
//       30:          22   36:           4   42:           4
//
//   x = 13   (D = 1485, mbar = 20.2222, G2 = 66)
//        6:         189   12:         504   18:         238   24:          96
//       30:         270   36:          60   42:          84   48:          20
//       54:           .   60:          12   66:          12
//
//   x = 17   (D = 22275, mbar = 22.9185, G2 = 108)
//        6:        2457   12:        6552   18:        3374   24:        1536
//       30:        4230   36:        1022   42:        1716   48:         474
//       54:          40   60:         380   66:         286   72:          64
//       78:          66   84:          12   90:          24   96:          22
//      102:           .  108:          20
//
//   x = 19   (D = 378675, mbar = 25.6148, G2 = 150)
//        6:       36855   12:       98280   18:       53690   24:       26208
//       30:       72378   36:       18776   42:       34812   48:       10462
//       54:        1968   60:        9452   66:        6322   72:        2816
//       78:        2620   84:         632   90:        1236   96:         876
//      102:          16  108:         954  114:           .  120:         142
//      126:          48  132:          26  138:          86  144:           .
//      150:          20
//
//   x = 23   (D = 7952175, mbar = 28.0543, G2 = 204)
//        6:      700245   12:     1867320   18:     1060150   24:      539136
//       30:     1500318   36:      393464   42:      801540   48:      275040
//       54:       69288   60:      243370   66:      166526   72:       94492
//       78:       83712   84:       26956   90:       43542   96:       27136
//      102:        4384  108:       32326  114:         440  120:        7852
//      126:        4668  132:        2314  138:        5598  144:           .
//      150:        1404  156:         310  162:         170  168:         322
//      174:           6  180:         112  186:          20  192:           8
//      198:           2  204:           4
//
//   x = 29   (D = 214708725, mbar = 30.1324, G2 = 258)
//        6:    17506125   12:    46683000   18:    27184430   24:    14178528
//       30:    39735054   36:    10497320   42:    22680468   48:     8256720
//       54:     2479200   60:     7815766   66:     5067262   72:     3197558
//       78:     3028200   84:     1026404   90:     1711068   96:      948278
//      102:      264346  108:     1194016  114:       54546  120:      387506
//      126:      205068  132:      150588  138:      278558  144:        1180
//      150:       88548  156:       29724  162:       15172  168:       24418
//      174:        2054  180:       10862  186:        2090  192:        2764
//      198:         748  204:         548  210:         442  216:          38
//      222:          84  228:          22  234:          12  240:           8
//      246:           .  252:           .  258:           2
//
//   x = 31   (D = 6226553025, mbar = 32.2105, G2 = 348)
//        6:   472665375   12:  1260441000   18:   749635250   24:   398923200
//       30:  1125566730   36:   299202120   42:   677184012   48:   258098688
//       54:    87682824   60:   260576152   66:   159343546   72:   109884182
//       78:   108939976   84:    38474924   90:    65936260   96:    34015314
//      102:    12947814  108:    44744420  114:     3748744  120:    17717092
//      126:     9020104  132:     7757284  138:    12709164  144:      174704
//      150:     4937476  156:     1788652  162:     1132112  168:     1531470
//      174:      216494  180:      851204  186:      177640  192:      262524
//      198:       93644  204:       52242  210:       70782  216:        3152
//      222:       26366  228:        6296  234:        4362  240:        5868
//      246:         134  252:        1602  258:         860  264:         130
//      270:         318  276:         146  282:         226  288:         228
//      294:          46  300:          54  306:          36  312:          10
//      318:          34  324:           .  330:          34  336:           .
//      342:           .  348:           4
//
// ------------------------------------------------------------------------------
// 1c. Tail counts on a geometric grid of t/mbar, and the ratio to the renewal null.
// ------------------------------------------------------------------------------
//
//   x = 5   mbar = 10.0000   D = 3
//    t/mbar |     t |      #{g > t} |   /D          | null exp(-t/mbar) | meas/null | z_Poisson
//      0.50 |   5.0 |             3 |    1.00000e+0 |        6.06531e-1 |    1.6487 |       0.7
//      0.75 |   7.5 |             2 |    6.66667e-1 |        4.72367e-1 |    1.4113 |       0.4
//      1.00 |  10.0 |             2 |    6.66667e-1 |        3.67879e-1 |    1.8122 |       0.6
//      1.50 |  15.0 |             0 |    0.00000e+0 |        2.23130e-1 |         0 |       n/a
//      2.00 |  20.0 |             0 |    0.00000e+0 |        1.35335e-1 |         0 |       n/a
//      2.50 |  25.0 |             0 |    0.00000e+0 |        8.20850e-2 |         0 |       n/a
//      3.00 |  30.0 |             0 |    0.00000e+0 |        4.97871e-2 |         0 |       n/a
//      4.00 |  40.0 |             0 |    0.00000e+0 |        1.83156e-2 |         0 |       n/a
//      5.00 |  50.0 |             0 |    0.00000e+0 |        6.73795e-3 |         0 |       n/a
//      6.00 |  60.0 |             0 |    0.00000e+0 |        2.47875e-3 |         0 |       n/a
//      7.00 |  70.0 |             0 |    0.00000e+0 |        9.11882e-4 |         0 |       n/a
//      8.00 |  80.0 |             0 |    0.00000e+0 |        3.35463e-4 |         0 |       n/a
//      9.00 |  90.0 |             0 |    0.00000e+0 |        1.23410e-4 |         0 |       n/a
//     10.00 | 100.0 |             0 |    0.00000e+0 |        4.53999e-5 |         0 |       n/a
//     12.00 | 120.0 |             0 |    0.00000e+0 |        6.14421e-6 |         0 |       n/a
//
//   x = 7   mbar = 14.0000   D = 15
//    t/mbar |     t |      #{g > t} |   /D          | null exp(-t/mbar) | meas/null | z_Poisson
//      0.50 |   7.0 |            12 |    8.00000e-1 |        6.06531e-1 |    1.3190 |       0.8
//      0.75 |  10.5 |            12 |    8.00000e-1 |        4.72367e-1 |    1.6936 |       1.4
//      1.00 |  14.0 |             4 |    2.66667e-1 |        3.67879e-1 |    0.7249 |      -0.8
//      1.50 |  21.0 |             2 |    1.33333e-1 |        2.23130e-1 |    0.5976 |      -1.0
//      2.00 |  28.0 |             2 |    1.33333e-1 |        1.35335e-1 |    0.9852 |      -0.0
//      2.50 |  35.0 |             0 |    0.00000e+0 |        8.20850e-2 |         0 |       n/a
//      3.00 |  42.0 |             0 |    0.00000e+0 |        4.97871e-2 |         0 |       n/a
//      4.00 |  56.0 |             0 |    0.00000e+0 |        1.83156e-2 |         0 |       n/a
//      5.00 |  70.0 |             0 |    0.00000e+0 |        6.73795e-3 |         0 |       n/a
//      6.00 |  84.0 |             0 |    0.00000e+0 |        2.47875e-3 |         0 |       n/a
//      7.00 |  98.0 |             0 |    0.00000e+0 |        9.11882e-4 |         0 |       n/a
//      8.00 | 112.0 |             0 |    0.00000e+0 |        3.35463e-4 |         0 |       n/a
//      9.00 | 126.0 |             0 |    0.00000e+0 |        1.23410e-4 |         0 |       n/a
//     10.00 | 140.0 |             0 |    0.00000e+0 |        4.53999e-5 |         0 |       n/a
//     12.00 | 168.0 |             0 |    0.00000e+0 |        6.14421e-6 |         0 |       n/a
//
//   x = 11   mbar = 17.1111   D = 135
//    t/mbar |     t |      #{g > t} |   /D          | null exp(-t/mbar) | meas/null | z_Poisson
//      0.50 |   8.6 |           114 |    8.44444e-1 |        6.06531e-1 |    1.3923 |       3.0
//      0.75 |  12.8 |            58 |    4.29630e-1 |        4.72367e-1 |    0.9095 |      -0.8
//      1.00 |  17.1 |            58 |    4.29630e-1 |        3.67879e-1 |    1.1679 |       1.1
//      1.50 |  25.7 |            30 |    2.22222e-1 |        2.23130e-1 |    0.9959 |      -0.0
//      2.00 |  34.2 |             8 |    5.92593e-2 |        1.35335e-1 |    0.4379 |      -3.6
//      2.50 |  42.8 |             0 |    0.00000e+0 |        8.20850e-2 |         0 |       n/a
//      3.00 |  51.3 |             0 |    0.00000e+0 |        4.97871e-2 |         0 |       n/a
//      4.00 |  68.4 |             0 |    0.00000e+0 |        1.83156e-2 |         0 |       n/a
//      5.00 |  85.6 |             0 |    0.00000e+0 |        6.73795e-3 |         0 |       n/a
//      6.00 | 102.7 |             0 |    0.00000e+0 |        2.47875e-3 |         0 |       n/a
//      7.00 | 119.8 |             0 |    0.00000e+0 |        9.11882e-4 |         0 |       n/a
//      8.00 | 136.9 |             0 |    0.00000e+0 |        3.35463e-4 |         0 |       n/a
//      9.00 | 154.0 |             0 |    0.00000e+0 |        1.23410e-4 |         0 |       n/a
//     10.00 | 171.1 |             0 |    0.00000e+0 |        4.53999e-5 |         0 |       n/a
//     12.00 | 205.3 |             0 |    0.00000e+0 |        6.14421e-6 |         0 |       n/a
//
//   x = 13   mbar = 20.2222   D = 1485
//    t/mbar |     t |      #{g > t} |   /D          | null exp(-t/mbar) | meas/null | z_Poisson
//      0.50 |  10.1 |          1296 |    8.72727e-1 |        6.06531e-1 |    1.4389 |      11.0
//      0.75 |  15.2 |           792 |    5.33333e-1 |        4.72367e-1 |    1.1291 |       3.2
//      1.00 |  20.2 |           554 |    3.73064e-1 |        3.67879e-1 |    1.0141 |       0.3
//      1.50 |  30.3 |           188 |    1.26599e-1 |        2.23130e-1 |    0.5674 |     -10.5
//      2.00 |  40.4 |           128 |    8.61953e-2 |        1.35335e-1 |    0.6369 |      -6.4
//      2.50 |  50.6 |            24 |    1.61616e-2 |        8.20850e-2 |    0.1969 |     -20.0
//      3.00 |  60.7 |            12 |    8.08081e-3 |        4.97871e-2 |    0.1623 |     -17.9
//      4.00 |  80.9 |             0 |    0.00000e+0 |        1.83156e-2 |         0 |       n/a
//      5.00 | 101.1 |             0 |    0.00000e+0 |        6.73795e-3 |         0 |       n/a
//      6.00 | 121.3 |             0 |    0.00000e+0 |        2.47875e-3 |         0 |       n/a
//      7.00 | 141.6 |             0 |    0.00000e+0 |        9.11882e-4 |         0 |       n/a
//      8.00 | 161.8 |             0 |    0.00000e+0 |        3.35463e-4 |         0 |       n/a
//      9.00 | 182.0 |             0 |    0.00000e+0 |        1.23410e-4 |         0 |       n/a
//     10.00 | 202.2 |             0 |    0.00000e+0 |        4.53999e-5 |         0 |       n/a
//     12.00 | 242.7 |             0 |    0.00000e+0 |        6.14421e-6 |         0 |       n/a
//
//   x = 17   mbar = 22.9185   D = 22275
//    t/mbar |     t |      #{g > t} |   /D          | null exp(-t/mbar) | meas/null | z_Poisson
//      0.50 |  11.5 |         19818 |    8.89697e-1 |        6.06531e-1 |    1.4669 |      44.8
//      0.75 |  17.2 |         13266 |    5.95556e-1 |        4.72367e-1 |    1.2608 |      23.8
//      1.00 |  22.9 |          9892 |    4.44085e-1 |        3.67879e-1 |    1.2071 |      17.1
//      1.50 |  34.4 |          4126 |    1.85230e-1 |        2.23130e-1 |    0.8301 |     -13.1
//      2.00 |  45.8 |          1388 |    6.23120e-2 |        1.35335e-1 |    0.4604 |     -43.7
//      2.50 |  57.3 |           874 |    3.92368e-2 |        8.20850e-2 |    0.4780 |     -32.3
//      3.00 |  68.8 |           208 |    9.33782e-3 |        4.97871e-2 |    0.1876 |     -62.5
//      4.00 |  91.7 |            42 |    1.88552e-3 |        1.83156e-2 |    0.1029 |     -56.5
//      5.00 | 114.6 |             0 |    0.00000e+0 |        6.73795e-3 |         0 |       n/a
//      6.00 | 137.5 |             0 |    0.00000e+0 |        2.47875e-3 |         0 |       n/a
//      7.00 | 160.4 |             0 |    0.00000e+0 |        9.11882e-4 |         0 |       n/a
//      8.00 | 183.3 |             0 |    0.00000e+0 |        3.35463e-4 |         0 |       n/a
//      9.00 | 206.3 |             0 |    0.00000e+0 |        1.23410e-4 |         0 |       n/a
//     10.00 | 229.2 |             0 |    0.00000e+0 |        4.53999e-5 |         0 |       n/a
//     12.00 | 275.0 |             0 |    0.00000e+0 |        6.14421e-6 |         0 |       n/a
//
//   x = 19   mbar = 25.6148   D = 378675
//    t/mbar |     t |      #{g > t} |   /D          | null exp(-t/mbar) | meas/null | z_Poisson
//      0.50 |  12.8 |        243540 |    6.43137e-1 |        6.06531e-1 |    1.0604 |      28.1
//      0.75 |  19.2 |        189850 |    5.01353e-1 |        4.72367e-1 |    1.0614 |      25.2
//      1.00 |  25.6 |        163642 |    4.32144e-1 |        3.67879e-1 |    1.1747 |      60.2
//      1.50 |  38.4 |         72488 |    1.91425e-1 |        2.23130e-1 |    0.8579 |     -44.6
//      2.00 |  51.2 |         27214 |    7.18664e-2 |        1.35335e-1 |    0.5310 |    -145.7
//      2.50 |  64.0 |         15794 |    4.17086e-2 |        8.20850e-2 |    0.5081 |    -121.7
//      3.00 |  76.8 |          6656 |    1.75771e-2 |        4.97871e-2 |    0.3530 |    -149.5
//      4.00 | 102.5 |          1276 |    3.36964e-3 |        1.83156e-2 |    0.1840 |    -158.4
//      5.00 | 128.1 |           132 |    3.48584e-4 |        6.73795e-3 |    0.0517 |    -210.6
//      6.00 | 153.7 |             0 |    0.00000e+0 |        2.47875e-3 |         0 |       n/a
//      7.00 | 179.3 |             0 |    0.00000e+0 |        9.11882e-4 |         0 |       n/a
//      8.00 | 204.9 |             0 |    0.00000e+0 |        3.35463e-4 |         0 |       n/a
//      9.00 | 230.5 |             0 |    0.00000e+0 |        1.23410e-4 |         0 |       n/a
//     10.00 | 256.1 |             0 |    0.00000e+0 |        4.53999e-5 |         0 |       n/a
//     12.00 | 307.4 |             0 |    0.00000e+0 |        6.14421e-6 |         0 |       n/a
//
//   x = 23   mbar = 28.0543   D = 7952175
//    t/mbar |     t |      #{g > t} |   /D          | null exp(-t/mbar) | meas/null | z_Poisson
//      0.50 |  14.0 |       5384610 |    6.77124e-1 |        6.06531e-1 |    1.1164 |     241.9
//      0.75 |  21.0 |       4324460 |    5.43808e-1 |        4.72367e-1 |    1.1512 |     273.2
//      1.00 |  28.1 |       3785324 |    4.76011e-1 |        3.67879e-1 |    1.2939 |     442.0
//      1.50 |  42.1 |       1090002 |    1.37070e-1 |        2.23130e-1 |    0.6143 |    -655.5
//      2.00 |  56.1 |        745674 |    9.37698e-2 |        1.35335e-1 |    0.6929 |    -382.8
//      2.50 |  70.1 |        335778 |    4.22247e-2 |        8.20850e-2 |    0.5144 |    -547.0
//      3.00 |  84.2 |        130618 |    1.64254e-2 |        4.97871e-2 |    0.3299 |    -734.1
//      4.00 | 112.2 |         23230 |    2.92121e-3 |        1.83156e-2 |    0.1595 |    -803.2
//      5.00 | 140.3 |          2358 |    2.96523e-4 |        6.73795e-3 |    0.0440 |   -1054.9
//      6.00 | 168.3 |           152 |    1.91143e-5 |        2.47875e-3 |    0.0077 |   -1586.5
//      7.00 | 196.4 |             6 |    7.54511e-7 |        9.11882e-4 |    0.0008 |   -2957.9
//      8.00 | 224.4 |             0 |    0.00000e+0 |        3.35463e-4 |         0 |       n/a
//      9.00 | 252.5 |             0 |    0.00000e+0 |        1.23410e-4 |         0 |       n/a
//     10.00 | 280.5 |             0 |    0.00000e+0 |        4.53999e-5 |         0 |       n/a
//     12.00 | 336.7 |             0 |    0.00000e+0 |        6.14421e-6 |         0 |       n/a
//
//   x = 29   mbar = 30.1324   D = 214708725
//    t/mbar |     t |      #{g > t} |   /D          | null exp(-t/mbar) | meas/null | z_Poisson
//      0.50 |  15.1 |     150519600 |    7.01041e-1 |        6.06531e-1 |    1.1558 |    1654.0
//      0.75 |  22.6 |     123335170 |    5.74430e-1 |        4.72367e-1 |    1.2161 |    1973.2
//      1.00 |  30.1 |      69421588 |    3.23329e-1 |        3.67879e-1 |    0.8789 |   -1148.0
//      1.50 |  45.2 |      36243800 |    1.68805e-1 |        2.23130e-1 |    0.7565 |   -1937.5
//      2.00 |  60.3 |      17692114 |    8.24005e-2 |        1.35335e-1 |    0.6089 |   -2702.1
//      2.50 |  75.3 |       9427294 |    4.39074e-2 |        8.20850e-2 |    0.5349 |   -2669.7
//      3.00 |  90.4 |       3661622 |    1.70539e-2 |        4.97871e-2 |    0.3425 |   -3672.8
//      4.00 | 120.5 |        812930 |    3.78620e-3 |        1.83156e-2 |    0.2067 |   -3460.0
//      5.00 | 150.7 |         88988 |    4.14459e-4 |        6.73795e-3 |    0.0615 |   -4551.4
//      6.00 | 180.8 |          6758 |    3.14752e-5 |        2.47875e-3 |    0.0127 |   -6391.8
//      7.00 | 210.9 |           166 |    7.73140e-7 |        9.11882e-4 |    0.0008 |  -15183.3
//      8.00 | 241.1 |             2 |    9.31495e-9 |        3.35463e-4 |    0.0000 |  -50929.2
//      9.00 | 271.2 |             0 |    0.00000e+0 |        1.23410e-4 |         0 |       n/a
//     10.00 | 301.3 |             0 |    0.00000e+0 |        4.53999e-5 |         0 |       n/a
//     12.00 | 361.6 |             0 |    0.00000e+0 |        6.14421e-6 |         0 |       n/a
//
//   x = 31   mbar = 32.2105   D = 6226553025
//    t/mbar |     t |      #{g > t} |   /D          | null exp(-t/mbar) | meas/null | z_Poisson
//      0.50 |  16.1 |    4493446650 |    7.21659e-1 |        6.06531e-1 |    1.1898 |   10694.0
//      0.75 |  24.2 |    3344888200 |    5.37197e-1 |        4.72367e-1 |    1.1372 |    6979.7
//      1.00 |  32.2 |    2219321470 |    3.56429e-1 |        3.67879e-1 |    0.9689 |   -1513.5
//      1.50 |  48.3 |     984836650 |    1.58167e-1 |        2.23130e-1 |    0.7089 |  -12889.4
//      2.00 |  64.4 |     636577674 |    1.02236e-1 |        1.35335e-1 |    0.7554 |   -8168.5
//      2.50 |  80.5 |     258409970 |    4.15013e-2 |        8.20850e-2 |    0.5056 |  -15719.7
//      3.00 |  96.6 |     119983472 |    1.92696e-2 |        4.97871e-2 |    0.3870 |  -17347.4
//      4.00 | 128.8 |      31805298 |    5.10801e-3 |        1.83156e-2 |    0.2789 |  -14582.2
//      5.00 | 161.1 |       4438018 |    7.12757e-4 |        6.73795e-3 |    0.1058 |  -17808.4
//      6.00 | 193.3 |        266574 |    4.28125e-5 |        2.47875e-3 |    0.0173 |  -29376.9
//      7.00 | 225.5 |         20388 |    3.27436e-6 |        9.11882e-4 |    0.0036 |  -39622.0
//      8.00 | 257.7 |          2126 |    3.41441e-7 |        3.35463e-4 |    0.0010 |  -45255.1
//      9.00 | 289.9 |           218 |    3.50113e-8 |        1.23410e-4 |    0.0003 |  -52029.0
//     10.00 | 322.1 |            38 |    6.10290e-9 |        4.53999e-5 |    0.0001 |  -45851.4
//     12.00 | 386.5 |             0 |    0.00000e+0 |        6.14421e-6 |         0 |       n/a
//
// ------------------------------------------------------------------------------
// 1d. The tail SHAPE, read before anything is fitted.
// ------------------------------------------------------------------------------
//   Three candidate readings, each with the statistic that separates it:
//     exponential (renewal)  d ln(#{g>t}/D) / d(t/mbar) = -1, constant
//     power law              d ln(#{g>t}) / d ln t constant
//     cut-off near G2        the local slope STEEPENS without bound as t -> G2
//
//   Local log-tail slope in units of t/mbar, over the range where #{g>t} > 100.
//   Each row is a decade of the tail fraction; the slope is the OLS slope of
//   ln(#{g>t}/D) against t/mbar over the gap lengths inside that decade.
//   x = 5: fewer than 4 points with count > 100 (D = 3); no slope read.
//   x = 7: fewer than 4 points with count > 100 (D = 15); no slope read.
//   x = 11: fewer than 4 points with count > 100 (D = 135); no slope read.
//
//   x = 13   points with #{g>t} > 100: 6, spanning t/mbar 0.30 to 1.78
//     whole-range OLS slope = -1.5484   (renewal: -1)   R^2 = 0.96915
//     decade | t/mbar range   | pts | OLS slope | power-law slope d ln N / d ln t
//     1e0..1e-1 |  0.30 to  1.48 |   5 |   -1.4860 | -1.049
//
//   x = 17   points with #{g>t} > 100: 12, spanning t/mbar 0.26 to 3.14
//     whole-range OLS slope = -1.7251   (renewal: -1)   R^2 = 0.98570
//     decade | t/mbar range   | pts | OLS slope | power-law slope d ln N / d ln t
//     1e0..1e-1 |  0.26 to  1.57 |   6 |   -1.4124 | -0.995
//     1e-1..1e-2 |  1.83 to  2.62 |   4 |   -1.2009 | -2.626
//
//   x = 19   points with #{g>t} > 100: 22, spanning t/mbar 0.23 to 5.15
//     whole-range OLS slope = -1.6988   (renewal: -1)   R^2 = 0.99220
//     decade | t/mbar range   | pts | OLS slope | power-law slope d ln N / d ln t
//     1e0..1e-1 |  0.23 to  1.41 |   6 |   -1.3231 | -0.835
//     1e-1..1e-2 |  1.64 to  3.05 |   7 |   -1.6006 | -3.588
//     1e-2..1e-3 |  3.28 to  3.98 |   4 |   -1.4777 | -5.388
//     1e-3..1e-4 |  4.22 to  5.15 |   5 |   -1.3294 | -6.195
//
//   x = 23   points with #{g>t} > 100: 29, spanning t/mbar 0.21 to 6.20
//     whole-range OLS slope = -1.7871   (renewal: -1)   R^2 = 0.98358
//     decade | t/mbar range   | pts | OLS slope | power-law slope d ln N / d ln t
//     1e0..1e-1 |  0.21 to  1.71 |   8 |   -1.4625 | -1.014
//     1e-1..1e-2 |  1.92 to  3.21 |   7 |   -1.6520 | -4.162
//     1e-2..1e-3 |  3.42 to  4.71 |   7 |   -1.6492 | -6.657
//     1e-3..1e-4 |  4.92 to  5.35 |   3 |   -2.1155 | -10.776
//     1e-4..1e-5 |  5.56 to  6.20 |   4 |   -2.6135 | -15.379
//
//   x = 29   points with #{g>t} > 100: 36, spanning t/mbar 0.20 to 7.17
//     whole-range OLS slope = -1.9448   (renewal: -1)   R^2 = 0.96931
//     decade | t/mbar range   | pts | OLS slope | power-law slope d ln N / d ln t
//     1e0..1e-1 |  0.20 to  1.79 |   9 |   -1.3638 | -0.973
//     1e-1..1e-2 |  1.99 to  3.39 |   8 |   -1.4672 | -3.872
//     1e-2..1e-3 |  3.58 to  4.38 |   5 |   -1.3558 | -5.360
//     1e-3..1e-4 |  4.58 to  5.38 |   5 |   -1.9567 | -9.701
//     1e-4..1e-5 |  5.58 to  6.17 |   4 |   -2.6486 | -15.516
//     1e-5..1e-6 |  6.37 to  6.77 |   3 |   -2.8664 | -18.816
//
//   x = 31   points with #{g>t} > 100: 50, spanning t/mbar 0.19 to 9.31
//     whole-range OLS slope = -2.0283   (renewal: -1)   R^2 = 0.98485
//     decade | t/mbar range   | pts | OLS slope | power-law slope d ln N / d ln t
//     1e0..1e-1 |  0.19 to  1.86 |  10 |   -1.3302 | -0.961
//     1e-1..1e-2 |  2.05 to  3.35 |   8 |   -1.4748 | -3.900
//     1e-2..1e-3 |  3.54 to  4.66 |   7 |   -1.9839 | -8.062
//     1e-3..1e-4 |  4.84 to  5.59 |   5 |   -2.3766 | -12.347
//     1e-4..1e-5 |  5.77 to  6.33 |   4 |   -2.6126 | -15.836
//     1e-5..1e-6 |  6.52 to  7.26 |   5 |   -2.3992 | -16.510
//     1e-6..1eend |  7.45 to  9.31 |  11 |   -1.9126 | -15.944
//
// ==============================================================================
// 2. THE EXCESS-LENGTH FUNCTIONAL |B_N| = sum_{g>N}(g-N)
// ==============================================================================
//   |B_N| is EXACTLY the number of window starts s in [0,W) whose length-N window
//   holds no twin slot (proof: note section 2), hence G2 <= N + |B_N| for every N.
//   beta'(s) = ln|B_N| / ln x with N = round(x^s).  Null: |B_N| = W*exp(-N/mbar).
//
//   x = 5   W = 30   mbar = 10.0000   G2 = 12   ln W / ln x = 2.1133
//      s |     N |            |B_N| |    |B_N|/W |   beta'(s) | null |B_N| | null beta' | meas/null | hold?
//   1.00 |     5 |               15 |   5.0000e-1 |     1.6826 |   1.8196e+1 |     1.8026 |    0.8244 | HOLD
//   1.25 |     7 |               10 |   3.3333e-1 |     1.4307 |   1.4898e+1 |     1.6783 |    0.6713 | HOLD
//   1.50 |    11 |                2 |   6.6667e-2 |     0.4307 |   9.9861e+0 |     1.4298 |    0.2003 | FAIL
//   1.75 |    17 |                0 |   0.0000e+0 |       -inf |   5.4805e+0 |     1.0570 |         0 | FAIL
//   2.00 |    25 |                0 |   0.0000e+0 |       -inf |   2.4625e+0 |     0.5599 |         0 | FAIL
//   2.25 |    37 |                0 |   0.0000e+0 |       -inf |   7.4171e-1 |    -0.1857 |         0 | FAIL
//   2.50 |    56 |                0 |   0.0000e+0 |       -inf |   1.1094e-1 |    -1.3662 |         0 | HOLD
//      the first grid N with |B_N| = 0 is the first N >= G2 = 12; ln G2 / ln x = 1.5440
//
//   x = 7   W = 210   mbar = 14.0000   G2 = 30   ln W / ln x = 2.7479
//      s |     N |            |B_N| |    |B_N|/W |   beta'(s) | null |B_N| | null beta' | meas/null | hold?
//   1.00 |     7 |              108 |   5.1429e-1 |     2.4061 |   1.2737e+2 |     2.4909 |    0.8479 | HOLD
//   1.25 |    11 |               60 |   2.8571e-1 |     2.1041 |   9.5717e+1 |     2.3441 |    0.6268 | HOLD
//   1.50 |    19 |               22 |   1.0476e-1 |     1.5885 |   5.4053e+1 |     2.0504 |    0.4070 | FAIL
//   1.75 |    30 |                0 |   0.0000e+0 |       -inf |   2.4637e+1 |     1.6467 |         0 | FAIL
//   2.00 |    49 |                0 |   0.0000e+0 |       -inf |   6.3415e+0 |     0.9492 |         0 | FAIL
//   2.25 |    80 |                0 |   0.0000e+0 |       -inf |   6.9269e-1 |    -0.1887 |         0 | FAIL
//   2.50 |   130 |                0 |   0.0000e+0 |       -inf |   1.9475e-2 |    -2.0240 |         0 | HOLD
//      the first grid N with |B_N| = 0 is the first N >= G2 = 30; ln G2 / ln x = 1.7479
//
//   x = 11   W = 2310   mbar = 17.1111   G2 = 42   ln W / ln x = 3.2299
//      s |     N |            |B_N| |    |B_N|/W |   beta'(s) | null |B_N| | null beta' | meas/null | hold?
//   1.00 |    11 |              930 |   4.0260e-1 |     2.8505 |   1.2146e+3 |     2.9618 |    0.7657 | HOLD
//   1.25 |    20 |              396 |   1.7143e-1 |     2.4944 |   7.1779e+2 |     2.7425 |    0.5517 | HOLD
//   1.50 |    36 |               24 |   1.0390e-2 |     1.3254 |   2.8177e+2 |     2.3525 |    0.0852 | FAIL
//   1.75 |    66 |                0 |   0.0000e+0 |       -inf |   4.8806e+1 |     1.6214 |         0 | FAIL
//   2.00 |   121 |                0 |   0.0000e+0 |       -inf |   1.9612e+0 |     0.2809 |         0 | FAIL
//   2.25 |   220 |                0 |   0.0000e+0 |       -inf |   6.0232e-3 |    -2.1319 |         0 | HOLD
//   2.50 |   401 |                0 |   0.0000e+0 |       -inf |   1.5342e-7 |    -6.5433 |         0 | HOLD
//      the first grid N with |B_N| = 0 is the first N >= G2 = 42; ln G2 / ln x = 1.5587
//
//   x = 13   W = 30030   mbar = 20.2222   G2 = 66   ln W / ln x = 4.0196
//      s |     N |            |B_N| |    |B_N|/W |   beta'(s) | null |B_N| | null beta' | meas/null | hold?
//   1.00 |    13 |            12552 |   4.1798e-1 |     3.6795 |   1.5789e+4 |     3.7689 |    0.7950 | HOLD
//   1.25 |    25 |             4810 |   1.6017e-1 |     3.3055 |   8.7227e+3 |     3.5376 |    0.5514 | HOLD
//   1.50 |    47 |              404 |   1.3453e-2 |     2.3398 |   2.9389e+3 |     3.1134 |    0.1375 | FAIL
//   1.75 |    89 |                0 |   0.0000e+0 |       -inf |   3.6828e+2 |     2.3037 |         0 | FAIL
//   2.00 |   169 |                0 |   0.0000e+0 |       -inf |   7.0485e+0 |     0.7613 |         0 | FAIL
//   2.25 |   321 |                0 |   0.0000e+0 |       -inf |   3.8347e-3 |    -2.1691 |         0 | HOLD
//   2.50 |   609 |                0 |   0.0000e+0 |       -inf |   2.5039e-9 |    -7.7216 |         0 | HOLD
//      the first grid N with |B_N| = 0 is the first N >= G2 = 66; ln G2 / ln x = 1.6334
//
//   x = 17   W = 510510   mbar = 22.9185   G2 = 108   ln W / ln x = 4.6390
//      s |     N |            |B_N| |    |B_N|/W |   beta'(s) | null |B_N| | null beta' | meas/null | hold?
//   1.00 |    17 |           191622 |   3.7535e-1 |     4.2931 |   2.4314e+5 |     4.3772 |    0.7881 | HOLD
//   1.25 |    35 |            48238 |   9.4490e-2 |     3.8062 |   1.1086e+5 |     4.0999 |    0.4351 | FAIL
//   1.50 |    70 |             2636 |   5.1635e-3 |     2.7802 |   2.4073e+4 |     3.5609 |    0.1095 | FAIL
//   1.75 |   142 |                0 |   0.0000e+0 |       -inf |   1.0403e+3 |     2.4521 |         0 | FAIL
//   2.00 |   289 |                0 |   0.0000e+0 |       -inf |   1.7045e+0 |     0.1882 |         0 | FAIL
//   2.25 |   587 |                0 |   0.0000e+0 |       -inf |   3.8428e-6 |    -4.4011 |         0 | HOLD
//   2.50 |  1192 |                0 |   0.0000e+0 |       -inf |  1.3189e-17 |   -13.7184 |         0 | HOLD
//      the first grid N with |B_N| = 0 is the first N >= G2 = 108; ln G2 / ln x = 1.6526
//
//   x = 19   W = 9699690   mbar = 25.6148   G2 = 150   ln W / ln x = 5.4637
//      s |     N |            |B_N| |    |B_N|/W |   beta'(s) | null |B_N| | null beta' | meas/null | hold?
//   1.00 |    19 |          3725630 |   3.8410e-1 |     5.1388 |   4.6197e+6 |     5.2118 |    0.8065 | HOLD
//   1.25 |    40 |           956992 |   9.8662e-2 |     4.6771 |   2.0350e+6 |     4.9334 |    0.4703 | FAIL
//   1.50 |    83 |            59488 |   6.1330e-3 |     3.7337 |   3.7976e+5 |     4.3632 |    0.1566 | FAIL
//   1.75 |   173 |                0 |   0.0000e+0 |       -inf |   1.1313e+4 |     3.1699 |         0 | FAIL
//   2.00 |   361 |                0 |   0.0000e+0 |       -inf |   7.3463e+0 |     0.6773 |         0 | FAIL
//   2.25 |   754 |                0 |   0.0000e+0 |       -inf |   1.5952e-6 |    -4.5335 |         0 | HOLD
//   2.50 |  1574 |                0 |   0.0000e+0 |       -inf |  1.9947e-20 |   -15.4057 |         0 | HOLD
//      the first grid N with |B_N| = 0 is the first N >= G2 = 150; ln G2 / ln x = 1.7017
//
//   x = 23   W = 223092870   mbar = 28.0543   G2 = 204   ln W / ln x = 6.1308
//      s |     N |            |B_N| |    |B_N|/W |   beta'(s) | null |B_N| | null beta' | meas/null | hold?
//   1.00 |    23 |         77938280 |   3.4935e-1 |     5.7954 |   9.8273e+7 |     5.8693 |    0.7931 | HOLD
//   1.25 |    50 |         17672652 |   7.9217e-2 |     5.3221 |   3.7537e+7 |     5.5624 |    0.4708 | FAIL
//   1.50 |   110 |           471508 |   2.1135e-3 |     4.1664 |   4.4221e+6 |     4.8803 |    0.1066 | FAIL
//   1.75 |   242 |                0 |   0.0000e+0 |       -inf |   4.0014e+4 |     3.3797 |         0 | FAIL
//   2.00 |   529 |                0 |   0.0000e+0 |       -inf |   1.4431e+0 |     0.1170 |         0 | FAIL
//   2.25 |  1158 |                0 |   0.0000e+0 |       -inf |  2.6429e-10 |    -7.0336 |         0 | HOLD
//   2.50 |  2537 |                0 |   0.0000e+0 |       -inf |  1.1871e-31 |   -22.7105 |         0 | HOLD
//      the first grid N with |B_N| = 0 is the first N >= G2 = 204; ln G2 / ln x = 1.6961
//
//   x = 29   W = 6469693230   mbar = 30.1324   G2 = 258   ln W / ln x = 6.7088
//      s |     N |            |B_N| |    |B_N|/W |   beta'(s) | null |B_N| | null beta' | meas/null | hold?
//   1.00 |    29 |       1809313450 |   2.7966e-1 |     6.3304 |   2.4712e+9 |     6.4230 |    0.7322 | HOLD
//   1.25 |    67 |        272871576 |   4.2177e-2 |     5.7686 |   7.0020e+8 |     6.0484 |    0.3897 | FAIL
//   1.50 |   156 |           936720 |   1.4479e-4 |     4.0834 |   3.6515e+7 |     5.1713 |    0.0257 | FAIL
//   1.75 |   362 |                0 |   0.0000e+0 |       -inf |   3.9213e+4 |     3.1410 |         0 | FAIL
//   2.00 |   841 |                0 |   0.0000e+0 |       -inf |   4.8940e-3 |    -1.5798 |         0 | HOLD
//   2.25 |  1952 |                0 |   0.0000e+0 |       -inf |  4.7530e-19 |   -12.5294 |         0 | HOLD
//   2.50 |  4529 |                0 |   0.0000e+0 |       -inf |  3.4278e-56 |   -37.9274 |         0 | HOLD
//      the first grid N with |B_N| = 0 is the first N >= G2 = 258; ln G2 / ln x = 1.6491
//
//   x = 31   W = 200560490130   mbar = 32.2105   G2 = 348   ln W / ln x = 7.5785
//      s |     N |            |B_N| |    |B_N|/W |   beta'(s) | null |B_N| | null beta' | meas/null | hold?
//   1.00 |    31 |      56965647110 |   2.8403e-1 |     7.2119 |  7.6608e+10 |     7.2982 |    0.7436 | HOLD
//   1.25 |    73 |       8548548018 |   4.2623e-2 |     6.6596 |  2.0796e+10 |     6.9185 |    0.4111 | FAIL
//   1.50 |   173 |         22832300 |   1.1384e-4 |     4.9341 |   9.3258e+8 |     6.0144 |    0.0245 | FAIL
//   1.75 |   407 |                0 |   0.0000e+0 |       -inf |   6.5262e+5 |     3.8989 |         0 | FAIL
//   2.00 |   961 |                0 |   0.0000e+0 |       -inf |   2.2135e-2 |    -1.1097 |         0 | HOLD
//   2.25 |  2268 |                0 |   0.0000e+0 |       -inf |  5.2820e-20 |   -12.9259 |         0 | HOLD
//   2.50 |  5351 |                0 |   0.0000e+0 |       -inf |  1.4279e-61 |   -40.7985 |         0 | HOLD
//      the first grid N with |B_N| = 0 is the first N >= G2 = 348; ln G2 / ln x = 1.7042
//
// ------------------------------------------------------------------------------
// 2b. beta'(s) across the levels, measured, and the null beside it.
// ------------------------------------------------------------------------------
//
//   s = 1.00
//     x |     N |            |B_N| |   beta'(s) | null beta' | meas/null
//     5 |     5 |               15 |     1.6826 |     1.8026 |    0.8244
//     7 |     7 |              108 |     2.4061 |     2.4909 |    0.8479
//    11 |    11 |              930 |     2.8505 |     2.9618 |    0.7657
//    13 |    13 |            12552 |     3.6795 |     3.7689 |    0.7950
//    17 |    17 |           191622 |     4.2931 |     4.3772 |    0.7881
//    19 |    19 |          3725630 |     5.1388 |     5.2118 |    0.8065
//    23 |    23 |         77938280 |     5.7954 |     5.8693 |    0.7931
//    29 |    29 |       1809313450 |     6.3304 |     6.4230 |    0.7322
//    31 |    31 |      56965647110 |     7.2119 |     7.2982 |    0.7436
//
//   s = 1.25
//     x |     N |            |B_N| |   beta'(s) | null beta' | meas/null
//     5 |     7 |               10 |     1.4307 |     1.6783 |    0.6713
//     7 |    11 |               60 |     2.1041 |     2.3441 |    0.6268
//    11 |    20 |              396 |     2.4944 |     2.7425 |    0.5517
//    13 |    25 |             4810 |     3.3055 |     3.5376 |    0.5514
//    17 |    35 |            48238 |     3.8062 |     4.0999 |    0.4351
//    19 |    40 |           956992 |     4.6771 |     4.9334 |    0.4703
//    23 |    50 |         17672652 |     5.3221 |     5.5624 |    0.4708
//    29 |    67 |        272871576 |     5.7686 |     6.0484 |    0.3897
//    31 |    73 |       8548548018 |     6.6596 |     6.9185 |    0.4111
//
//   s = 1.50
//     x |     N |            |B_N| |   beta'(s) | null beta' | meas/null
//     5 |    11 |                2 |     0.4307 |     1.4298 |    0.2003
//     7 |    19 |               22 |     1.5885 |     2.0504 |    0.4070
//    11 |    36 |               24 |     1.3254 |     2.3525 |    0.0852
//    13 |    47 |              404 |     2.3398 |     3.1134 |    0.1375
//    17 |    70 |             2636 |     2.7802 |     3.5609 |    0.1095
//    19 |    83 |            59488 |     3.7337 |     4.3632 |    0.1566
//    23 |   110 |           471508 |     4.1664 |     4.8803 |    0.1066
//    29 |   156 |           936720 |     4.0834 |     5.1713 |    0.0257
//    31 |   173 |         22832300 |     4.9341 |     6.0144 |    0.0245
//
//   s = 1.75
//     x |     N |            |B_N| |   beta'(s) | null beta' | meas/null
//     5 |    17 |                0 |       -inf |     1.0570 |         0
//     7 |    30 |                0 |       -inf |     1.6467 |         0
//    11 |    66 |                0 |       -inf |     1.6214 |         0
//    13 |    89 |                0 |       -inf |     2.3037 |         0
//    17 |   142 |                0 |       -inf |     2.4521 |         0
//    19 |   173 |                0 |       -inf |     3.1699 |         0
//    23 |   242 |                0 |       -inf |     3.3797 |         0
//    29 |   362 |                0 |       -inf |     3.1410 |         0
//    31 |   407 |                0 |       -inf |     3.8989 |         0
//
//   s = 2.00
//     x |     N |            |B_N| |   beta'(s) | null beta' | meas/null
//     5 |    25 |                0 |       -inf |     0.5599 |         0
//     7 |    49 |                0 |       -inf |     0.9492 |         0
//    11 |   121 |                0 |       -inf |     0.2809 |         0
//    13 |   169 |                0 |       -inf |     0.7613 |         0
//    17 |   289 |                0 |       -inf |     0.1882 |         0
//    19 |   361 |                0 |       -inf |     0.6773 |         0
//    23 |   529 |                0 |       -inf |     0.1170 |         0
//    29 |   841 |                0 |       -inf |    -1.5798 |         0
//    31 |   961 |                0 |       -inf |    -1.1097 |         0
//
//   s = 2.25
//     x |     N |            |B_N| |   beta'(s) | null beta' | meas/null
//     5 |    37 |                0 |       -inf |    -0.1857 |         0
//     7 |    80 |                0 |       -inf |    -0.1887 |         0
//    11 |   220 |                0 |       -inf |    -2.1319 |         0
//    13 |   321 |                0 |       -inf |    -2.1691 |         0
//    17 |   587 |                0 |       -inf |    -4.4011 |         0
//    19 |   754 |                0 |       -inf |    -4.5335 |         0
//    23 |  1158 |                0 |       -inf |    -7.0336 |         0
//    29 |  1952 |                0 |       -inf |   -12.5294 |         0
//    31 |  2268 |                0 |       -inf |   -12.9259 |         0
//
//   s = 2.50
//     x |     N |            |B_N| |   beta'(s) | null beta' | meas/null
//     5 |    56 |                0 |       -inf |    -1.3662 |         0
//     7 |   130 |                0 |       -inf |    -2.0240 |         0
//    11 |   401 |                0 |       -inf |    -6.5433 |         0
//    13 |   609 |                0 |       -inf |    -7.7216 |         0
//    17 |  1192 |                0 |       -inf |   -13.7184 |         0
//    19 |  1574 |                0 |       -inf |   -15.4057 |         0
//    23 |  2537 |                0 |       -inf |   -22.7105 |         0
//    29 |  4529 |                0 |       -inf |   -37.9274 |         0
//    31 |  5351 |                0 |       -inf |   -40.7985 |         0
//
// ------------------------------------------------------------------------------
// 2c. What the identity G2 <= N + |B_N| actually certifies, priced.
// ------------------------------------------------------------------------------
//     x | best N + |B_N| over the grid | at N  | G2  | ratio to G2
//     5 |                           13 |    11 |  12 |      1.0833
//     7 |                           30 |    30 |  30 |      1.0000
//    11 |                           60 |    36 |  42 |      1.4286
//    13 |                           89 |    89 |  66 |      1.3485
//    17 |                          142 |   142 | 108 |      1.3148
//    19 |                          173 |   173 | 150 |      1.1533
//    23 |                          242 |   242 | 204 |      1.1863
//    29 |                          362 |   362 | 258 |      1.4031
//    31 |                          407 |   407 | 348 |      1.1695
//
// ==============================================================================
// 3. THE EMPIRICAL SIFTING CURVE
// ==============================================================================
//   mincount(N) = min over ALL W starts of the count in a length-N window, exact.
//   mean count = N*D/W.  f2(s) is the kappa = 2 DHR sieve lower bound, 0 for s <= beta_2.
//
//   x = 5   D = 3   W = 30   G2 = 12   ln G2 / ln x = 1.5440
//      s |     N | mincount | mean count | min/mean | f2(s) | f1(s) | N >= W?
//   1.00 |     5 |        0 |     0.5000 |   0.0000 | 0.000 | 0.000 | no
//   1.25 |     7 |        0 |     0.7000 |   0.0000 | 0.000 | 0.000 | no
//   1.50 |    11 |        0 |     1.1000 |   0.0000 | 0.000 | 0.000 | no
//   1.75 |    17 |        1 |     1.7000 |   0.5882 | 0.000 | 0.000 | no
//   2.00 |    25 |        2 |     2.5000 |   0.8000 | 0.000 | 0.000 | no
//   2.25 |    37 |      n/a |     3.7000 |      n/a | 0.000 | 0.353 | YES (window exceeds the period)
//   2.50 |    56 |      n/a |     5.6000 |      n/a | 0.000 | 0.578 | YES (window exceeds the period)
//      anchors: N = G2-1 = 11: mincount 0 ;  N = G2 = 12: mincount 1, mean 1.200, min/mean 0.8333
//               N = 2*G2 = 24: mincount 2, min/mean 0.8333 ;  N = 4*G2 = 48: mincount 4, min/mean 0.8333
//
//   x = 7   D = 15   W = 210   G2 = 30   ln G2 / ln x = 1.7479
//      s |     N | mincount | mean count | min/mean | f2(s) | f1(s) | N >= W?
//   1.00 |     7 |        0 |     0.5000 |   0.0000 | 0.000 | 0.000 | no
//   1.25 |    11 |        0 |     0.7857 |   0.0000 | 0.000 | 0.000 | no
//   1.50 |    19 |        0 |     1.3571 |   0.0000 | 0.000 | 0.000 | no
//   1.75 |    30 |        1 |     2.1429 |   0.4667 | 0.000 | 0.000 | no
//   2.00 |    49 |        2 |     3.5000 |   0.5714 | 0.000 | 0.000 | no
//   2.25 |    80 |        4 |     5.7143 |   0.7000 | 0.000 | 0.353 | no
//   2.50 |   130 |        7 |     9.2857 |   0.7538 | 0.000 | 0.578 | no
//      anchors: N = G2-1 = 29: mincount 0 ;  N = G2 = 30: mincount 1, mean 2.143, min/mean 0.4667
//               N = 2*G2 = 60: mincount 2, min/mean 0.4667 ;  N = 4*G2 = 120: mincount 6, min/mean 0.7000
//
//   x = 11   D = 135   W = 2310   G2 = 42   ln G2 / ln x = 1.5587
//      s |     N | mincount | mean count | min/mean | f2(s) | f1(s) | N >= W?
//   1.00 |    11 |        0 |     0.6429 |   0.0000 | 0.000 | 0.000 | no
//   1.25 |    20 |        0 |     1.1688 |   0.0000 | 0.000 | 0.000 | no
//   1.50 |    36 |        0 |     2.1039 |   0.0000 | 0.000 | 0.000 | no
//   1.75 |    66 |        2 |     3.8571 |   0.5185 | 0.000 | 0.000 | no
//   2.00 |   121 |        4 |     7.0714 |   0.5657 | 0.000 | 0.000 | no
//   2.25 |   220 |       11 |    12.8571 |   0.8556 | 0.000 | 0.353 | no
//   2.50 |   401 |       20 |    23.4351 |   0.8534 | 0.000 | 0.578 | no
//      anchors: N = G2-1 = 41: mincount 0 ;  N = G2 = 42: mincount 1, mean 2.455, min/mean 0.4074
//               N = 2*G2 = 84: mincount 2, min/mean 0.4074 ;  N = 4*G2 = 168: mincount 7, min/mean 0.7130
//
//   x = 13   D = 1485   W = 30030   G2 = 66   ln G2 / ln x = 1.6334
//      s |     N | mincount | mean count | min/mean | f2(s) | f1(s) | N >= W?
//   1.00 |    13 |        0 |     0.6429 |   0.0000 | 0.000 | 0.000 | no
//   1.25 |    25 |        0 |     1.2363 |   0.0000 | 0.000 | 0.000 | no
//   1.50 |    47 |        0 |     2.3242 |   0.0000 | 0.000 | 0.000 | no
//   1.75 |    89 |        1 |     4.4011 |   0.2272 | 0.000 | 0.000 | no
//   2.00 |   169 |        5 |     8.3571 |   0.5983 | 0.000 | 0.000 | no
//   2.25 |   321 |       11 |    15.8736 |   0.6930 | 0.000 | 0.353 | no
//   2.50 |   609 |       25 |    30.1154 |   0.8301 | 0.000 | 0.578 | no
//      anchors: N = G2-1 = 65: mincount 0 ;  N = G2 = 66: mincount 1, mean 3.264, min/mean 0.3064
//               N = 2*G2 = 132: mincount 2, min/mean 0.3064 ;  N = 4*G2 = 264: mincount 9, min/mean 0.6894
//
//   x = 17   D = 22275   W = 510510   G2 = 108   ln G2 / ln x = 1.6526
//      s |     N | mincount | mean count | min/mean | f2(s) | f1(s) | N >= W?
//   1.00 |    17 |        0 |     0.7418 |   0.0000 | 0.000 | 0.000 | no
//   1.25 |    35 |        0 |     1.5271 |   0.0000 | 0.000 | 0.000 | no
//   1.50 |    70 |        0 |     3.0543 |   0.0000 | 0.000 | 0.000 | no
//   1.75 |   142 |        1 |     6.1959 |   0.1614 | 0.000 | 0.000 | no
//   2.00 |   289 |        8 |    12.6099 |   0.6344 | 0.000 | 0.000 | no
//   2.25 |   587 |       18 |    25.6125 |   0.7028 | 0.000 | 0.353 | no
//   2.50 |  1192 |       44 |    52.0103 |   0.8460 | 0.000 | 0.578 | no
//      anchors: N = G2-1 = 107: mincount 0 ;  N = G2 = 108: mincount 1, mean 4.712, min/mean 0.2122
//               N = 2*G2 = 216: mincount 5, min/mean 0.5305 ;  N = 4*G2 = 432: mincount 12, min/mean 0.6366
//
//   x = 19   D = 378675   W = 9699690   G2 = 150   ln G2 / ln x = 1.7017
//      s |     N | mincount | mean count | min/mean | f2(s) | f1(s) | N >= W?
//   1.00 |    19 |        0 |     0.7418 |   0.0000 | 0.000 | 0.000 | no
//   1.25 |    40 |        0 |     1.5616 |   0.0000 | 0.000 | 0.000 | no
//   1.50 |    83 |        0 |     3.2403 |   0.0000 | 0.000 | 0.000 | no
//   1.75 |   173 |        1 |     6.7539 |   0.1481 | 0.000 | 0.000 | no
//   2.00 |   361 |        7 |    14.0934 |   0.4967 | 0.000 | 0.000 | no
//   2.25 |   754 |       21 |    29.4361 |   0.7134 | 0.000 | 0.353 | no
//   2.50 |  1574 |       51 |    61.4488 |   0.8300 | 0.000 | 0.578 | no
//      anchors: N = G2-1 = 149: mincount 0 ;  N = G2 = 150: mincount 1, mean 5.856, min/mean 0.1708
//               N = 2*G2 = 300: mincount 6, min/mean 0.5123 ;  N = 4*G2 = 600: mincount 15, min/mean 0.6404
//
//   x = 23   D = 7952175   W = 223092870   G2 = 204   ln G2 / ln x = 1.6961
//      s |     N | mincount | mean count | min/mean | f2(s) | f1(s) | N >= W?
//   1.00 |    23 |        0 |     0.8198 |   0.0000 | 0.000 | 0.000 | no
//   1.25 |    50 |        0 |     1.7823 |   0.0000 | 0.000 | 0.000 | no
//   1.50 |   110 |        0 |     3.9210 |   0.0000 | 0.000 | 0.000 | no
//   1.75 |   242 |        2 |     8.6261 |   0.2319 | 0.000 | 0.000 | no
//   2.00 |   529 |        8 |    18.8563 |   0.4243 | 0.000 | 0.000 | no
//   2.25 |  1158 |       29 |    41.2771 |   0.7026 | 0.000 | 0.353 | no
//   2.50 |  2537 |       77 |    90.4317 |   0.8515 | 0.000 | 0.578 | no
//      anchors: N = G2-1 = 203: mincount 0 ;  N = G2 = 204: mincount 1, mean 7.272, min/mean 0.1375
//               N = 2*G2 = 408: mincount 5, min/mean 0.3438 ;  N = 4*G2 = 816: mincount 18, min/mean 0.6188
//
//   x = 29   D = 214708725   W = 6469693230   G2 = 258   ln G2 / ln x = 1.6491
//      s |     N | mincount | mean count | min/mean | f2(s) | f1(s) | N >= W?
//   1.00 |    29 |        0 |     0.9624 |   0.0000 | 0.000 | 0.000 | no
//   1.25 |    67 |        0 |     2.2235 |   0.0000 | 0.000 | 0.000 | no
//   1.50 |   156 |        0 |     5.1771 |   0.0000 | 0.000 | 0.000 | no
//   1.75 |   362 |        2 |    12.0136 |   0.1665 | 0.000 | 0.000 | no
//   2.00 |   841 |       15 |    27.9101 |   0.5374 | 0.000 | 0.000 | no
//   2.25 |  1952 |       49 |    64.7807 |   0.7564 | 0.000 | 0.353 | no
//   2.50 |  4529 |      130 |   150.3032 |   0.8649 | 0.000 | 0.578 | no
//      anchors: N = G2-1 = 257: mincount 0 ;  N = G2 = 258: mincount 1, mean 8.562, min/mean 0.1168
//               N = 2*G2 = 516: mincount 5, min/mean 0.2920 ;  N = 4*G2 = 1032: mincount 20, min/mean 0.5840
//
//   x = 31   D = 6226553025   W = 200560490130   G2 = 348   ln G2 / ln x = 1.7042
//      s |     N | mincount | mean count | min/mean | f2(s) | f1(s) | N >= W?
//   1.00 |    31 |        0 |     0.9624 |   0.0000 | 0.000 | 0.000 | no
//   1.25 |    73 |        0 |     2.2663 |   0.0000 | 0.000 | 0.000 | no
//   1.50 |   173 |        0 |     5.3709 |   0.0000 | 0.000 | 0.000 | no
//   1.75 |   407 |        1 |    12.6356 |   0.0791 | 0.000 | 0.000 | no
//   2.00 |   961 |       14 |    29.8350 |   0.4692 | 0.000 | 0.000 | no
//   2.25 |  2268 |       51 |    70.4118 |   0.7243 | 0.000 | 0.353 | no
//   2.50 |  5351 |      141 |   166.1259 |   0.8488 | 0.000 | 0.578 | no
//      anchors: N = G2-1 = 347: mincount 0 ;  N = G2 = 348: mincount 1, mean 10.804, min/mean 0.0926
//               N = 2*G2 = 696: mincount 9, min/mean 0.4165 ;  N = 4*G2 = 1392: mincount 26, min/mean 0.6016
//
// ------------------------------------------------------------------------------
// 3b. The onset. mincount(N) >= 1 exactly when N >= G2, so the onset s is ln G2 / ln x.
// ------------------------------------------------------------------------------
//     x | ln G2 / ln x | first grid s with mincount > 0 | min/mean there | min/mean at N = G2
//     5 |       1.5440 |                           1.75 |         0.5882 |             0.8333
//     7 |       1.7479 |                           1.75 |         0.4667 |             0.4667
//    11 |       1.5587 |                           1.75 |         0.5185 |             0.4074
//    13 |       1.6334 |                           1.75 |         0.2272 |             0.3064
//    17 |       1.6526 |                           1.75 |         0.1614 |             0.2122
//    19 |       1.7017 |                           1.75 |         0.1481 |             0.1708
//    23 |       1.6961 |                           1.75 |         0.2319 |             0.1375
//    29 |       1.6491 |                           1.75 |         0.1665 |             0.1168
//    31 |       1.7042 |                           1.75 |         0.0791 |             0.0926
//
//   The onset is BELOW beta_2 = 4.26645 at every level, and below beta_1 = 2 at most of
//   them. f2(s) = 0 across the whole grid, so the sieve lower bound is vacuous exactly
//   where the truth is not: that gap IS the Face-4 barrier, restated on this instrument.
//
// ==============================================================================
// CALIBRATION SUMMARY
// ==============================================================================
//   assertion failures: 0
//   gates run per level: slot count vs A059861; gap count = D; sum of gaps = W;
//   max gap = the exact ladder; every gap 0 mod 6; histogram first moment = W;
//   |B_{G2}| = 0 and |B_{G2-1}| = the max gap's multiplicity; mincount(G2-1) = 0
//   and mincount(G2) >= 1; the histogram tail above G2 is empty;
//   ring buffer never overrun; DHR kappa = 1 closed forms and the kappa = 2 far field.
//
//   runtimes, seconds of scan per level:
//     x =   5   cells              5   slots            3        0.0 s
//     x =   7   cells             35   slots           15        0.0 s
//     x =  11   cells            385   slots          135        0.0 s
//     x =  13   cells           5005   slots         1485        0.0 s
//     x =  17   cells          85085   slots        22275        0.0 s
//     x =  19   cells        1616615   slots       378675        0.1 s
//     x =  23   cells       37182145   slots      7952175        1.4 s
//     x =  29   cells     1078282205   slots    214708725       39.6 s
//     x =  31   cells    33426748355   slots   6226553025     1280.5 s
//
//   total elapsed 1322.0s
// ============================================================================
// READINGS
// ============================================================================
//  0. [VERIFIED] Nine levels, x = 5..31, zero assertion failures. At every one
//     the slot count equals prod(p-2) = A059861, the gaps number D and sum to W
//     exactly, every gap is 0 mod 6, the histogram's first moment is W, and the
//     MAXIMUM equals the exact ladder's G2(x#) — 12, 30, 42, 66, 108, 150, 204,
//     258, 348. The ladder agreement is a check on the scan, not a second
//     derivation of G2; what is new here is the whole multiset below the max.
//
//  1. [MEASURED] THE PRE-REGISTERED NULL FAILS, AND IN THE LIGHT DIRECTION.
//     The renewal maximum mbar*ln D overshoots the truth at every level from
//     x = 13 up, by a factor flat at 2.238, 2.124, 2.193, 2.185, 2.241, 2.087.
//     So G2 is less than half the renewal extreme value rather than equal to
//     it, and the ratio shows no drift over six levels.
//
//  2. [MEASURED] THE DISTRIBUTION IS UNDER-DISPERSED AGAINST RENEWAL AND
//     CLOSING SLOWLY. sd/mean runs 0.5950, 0.6364, 0.6700, 0.6939, 0.7116,
//     0.7270 over x = 13..31 against a renewal value of 1; skew runs 1.109,
//     1.378, 1.522, 1.579, 1.607, 1.626 against 2. Both rise monotonically and
//     neither is close. Six levels do not establish a limit.
//
//  3. [MEASURED] THE MODAL GAP IS 12, NOT 6, AT EVERY LEVEL INCLUDING x = 5.
//     Two twin slots six apart are rarer than two twelve apart. That is the
//     alternation constraint appearing in the first bin of the spectrum.
//
//  4. [MEASURED] THE TAIL IS NOT A POWER LAW, AND NOT AN EXPONENTIAL. Read
//     before fitting: a power law holds d ln N / d ln t fixed, and it moves
//     from -0.973 to -18.816 at @29 and -0.961 to -15.944 at @31, a factor of
//     17 to 19, monotonically. An exponential holds the log-tail slope on
//     t/mbar at -1, and it reads -1.3638 (@29) and -1.3302 (@31) already in the
//     first decade and never returns to -1.
//
//  5. [MEASURED, ONE LEVEL] THE CUT-OFF SIGNATURE IS NOT CLEAN AT THE DEEPEST
//     LEVEL. The slope steepens to -2.8664 (@29) and -2.6126 (@31) and then
//     RELAXES: @31's last two decades read -2.3992 and -1.9126, back toward the
//     body value, over t/mbar 6.52 to 9.31 with 16 points. @29 cannot resolve
//     that stretch — it has 2 gaps above 8*mbar where @31 has 2126. One level
//     is one level; this is recorded so the next level can check it, and it is
//     NOT banked.
//
//  6. [MEASURED] THE EXCESS FUNCTIONAL SITS BELOW THE NULL EVERYWHERE IT CAN BE
//     RESOLVED, AND THE DEFICIT DEEPENS WITH s BUT NOT WITH THE LEVEL.
//     meas/null at s = 1.00, 1.25, 1.50 reads 0.7931 / 0.4708 / 0.1066 (@23),
//     0.7322 / 0.3897 / 0.0257 (@29), 0.7436 / 0.4111 / 0.0245 (@31). The @29
//     and @31 rows are the same to within the grid's resolution: the one place
//     a level trend could have been read, and it is not there.
//
//  7. [MEASURED] |B_N| IS EXACTLY ZERO FROM s = 1.75 AT EVERY LEVEL FROM x = 13.
//     At @31 the null still predicts 6.5262e+5 empty windows of length 407 and
//     the truth is 0. So beta'(s) = ln|B_N|/ln x is a THREE-POINT object on the
//     brief's grid — 7.2119, 6.6596, 4.9341 at @31 — and no trend in s can be
//     fitted from it. That is a property of the grid against this tile.
//
//  8. [PROVEN, and priced] G2 <= N + |B_N| holds for every N, because |B_N| is
//     exactly the number of empty length-N window starts. On this grid the best
//     N + |B_N| is 1.1533 to 1.4031 times G2 and is ALWAYS attained at the
//     smallest N with |B_N| = 0, i.e. the identity degenerates to G2 <= N. It
//     is a certificate object, not a route: it converts a bound that is already
//     good and never manufactures one.
//
//  9. [PROVEN] mincount(N) = max{m : maxsum_m <= N}, so section 3's empirical
//     sifting curve is the corpus's own scan statistic on a different grid.
//     The novelty is the grid and the min/mean normalisation, nothing more. In
//     particular min/mean at N = G2 is exactly mbar/G2, the reciprocal of the
//     max/mean column, and carries no second measurement.
//
// 10. [MEASURED] THE ONSET IS FLAT. mincount(N) > 0 exactly when N >= G2, so
//     the onset exponent is ln G2 / ln x by identity: 1.6334, 1.6526, 1.7017,
//     1.6961, 1.6491, 1.7042 over x = 13..31, with no drift. The s-grid is too
//     coarse to see it — every level's first positive entry is s = 1.75.
//
// 11. [MEASURED] THE WORST WINDOW IS FAR BELOW ITS MEAN WELL PAST THE ONSET.
//     At @31, min/mean is 0.0791 at s = 1.75, 0.4692 at s = 2.00, 0.7243 at
//     s = 2.25, 0.8488 at s = 2.50; at 2*G2 and 4*G2 it is 0.4165 and 0.6016.
//     The @29 values at 2*G2 and 4*G2 are 0.2920 and 0.5840, which does not
//     agree with @31 closely enough for a trend.
//
// 12. THE BARRIER, RESTATED AND NOT NARROWED. f2(s) = 0 for every s <= 4.26645,
//     so the kappa = 2 sieve lower bound is ZERO across the entire grid this
//     file can reach, while the tile delivers 0.0791 of its mean at s = 1.75.
//     The distance between those two is the whole Face-4 gap. This run measures
//     its size at nine levels and narrows it by nothing.
//
// 13. WHAT IS CLOSED, AND AT WHAT RUNG. The route "the twin-slot gap
//     distribution is heavy-tailed, and that is where a super-linear G2
//     exponent comes from" is refuted at every computable level: the tail is
//     lighter than renewal in every basis measured (tail counts, log-tail
//     slope, excess functional, maximum). That is [MEASURED] over x <= 31 and
//     says NOTHING about the asymptotic exponent. The 1.50 +/- 0.05 fit stands
//     where it stood, with its own control caveat, and the 4.26645-against-2
//     gap is untouched.
