'use strict';
// ============================================================================
// ATTACK 0830 HEAD-REMAINDER — THE HEAD'S HL REMAINDER SPLIT INTO AN ENSEMBLE
// PART (A CRT COUNT, EXACT) AND AN ANCHORING PART (THE NUMBER LINE AGAINST THE
// TILE'S ROTATION ENSEMBLE)
// (2026-08-30; TODO item Z4, head half, continuing Q-head-residual PARTIAL;
// companion note research/history/staging/attack-0830-head-remainder.md)
// ============================================================================
//
// QUESTION. head-residual-hl3.md prices the head's endpoint prime deficit
// Delta = 2 - beta with Hardy-Littlewood triple constants to 5.3 percent at
// [1e7,1e8) with nothing fitted, and leaves the miss. Does that remainder
// derive by a route that is not HL? The candidate the brief names as most
// likely to derive is the exact tile ensemble: the head over all x# translates
// is a periodic object, so its part of the remainder is a finite count.
//
// WHAT IS ALREADY ON RECORD, reproduced here as the custody gate (SEC 0) and
// not re-posed: Delta_meas = 0.6899, 0.6862, 0.6214 and Delta_HL = 0.7914,
// 0.7124, 0.6545 at the three decades (head-residual-hl3.js SEC 0, SEC 3);
// R = 223.5196, h - R = 5.679, coprime-30 offset 2.7541 and coprime-210
// offset 3.3395 at [1e7,1e8) (redteam-0828-head.js SEC 1).
//
// CONVENTIONS (head-residual-factor.js, head-residual-hl3.js, GLOSSARY).
//   opener a     a and a+2 both prime (number line) / both coprime to W (tile).
//   gap g_i      a_{i+1} - a_i, consecutive openers; n_i = primes (holes) in
//                [a_i, a_{i+1}), the opener pair included.
//   S_i          sum over those n_i of (a_{i+1} - m): forward distances.
//   R            sum g^2 / (2 sum g), the continuum inspection functional.
//   OLS          n_i on g_i: slope alpha, intercept beta; Delta = 2 - beta.
//   lambda_s     lambda - 2 lambda_2 = (E[n] - 2)/E[g], the identity thinning.
//   rho_y(t,g)   S_y(0,2,t,g,g+2)/S_y(0,2,g,g+2) with the singular-series
//                product truncated at q <= y: by CRT this is EXACTLY the
//                density of holes of T_y at offset t given holes at 0,2,g,g+2.
//   pipeline     E[n|g] = 2 + kappa W(g), W(g) = sum_{t=3}^{g-1} rho(t,g),
//                kappa = lambda_s E[g]/E[W] (fixed by the identity, not
//                fitted), alpha_pipe = kappa Cov(W,g)/Var(g), Delta_pipe =
//                2 - (E[n] - alpha_pipe E[g]). This is hl3's SEC 3 verbatim.
//
// WHAT THIS SCRIPT DOES.
//  SEC 0  Custody on the number line: re-sieve [1e5,1e8), reproduce every
//         figure listed above on an independent walk, and print the remainder
//         eps = Delta_HL - Delta_meas per decade. Also: the wheel ladder of
//         origin populations coprime to y#, y = 2..31, at each decade, and
//         for y <= 13 the CRT prediction of that ladder under equidistribution
//         of the openers' residues, so the ladder's anchoring deviation is a
//         number at each rung.
//  SEC 1  The tile T_y enumerated at y = 11, 13, 17, 19, 23 (29 with
//         --level29): every head quantity exactly (E[g], CV^2, R, beta,
//         Delta_tile, D, the hole-origin head and its excess over R), the CRT
//         identity for rho asserted as integers, and the pipeline of hl3 run
//         INSIDE the tile against the tile's exact E[n|g]. The pipeline's one
//         approximation (the no-interior-opener condition treated as uniform
//         thinning) is then a measured number at each level.
//  SEC 2  The anchored zone (y, y'^2) of each level against its own ensemble:
//         the primes there ARE the holes and the twin primes ARE the twin
//         slots (Zone Restriction), so the head at every origin in the zone
//         is the same object in both readings; the anchored mean against the
//         ensemble mean, with the ensemble's per-hole spread.
//
// Usage: node research/history/staging/attack-0830-head-remainder.js [--level29]
// Progress and timing go to stderr only; nothing on stdout is a clock.
// ============================================================================

const WID = require('../../qc/widths');
const T0 = Date.now();
const argv = process.argv.slice(2);
const LEVEL29 = argv.includes('--level29');
let failures = 0;
function assertNear(name, got, want, tol) {
  if (!(Math.abs(got - want) <= tol)) { failures++; console.log(`  ASSERT FAIL ${name}: got ${got} want ${want} +-${tol}`); }
}
function assertEq(name, got, want) {
  if (got !== want) { failures++; console.log(`  ASSERT FAIL ${name}: got ${got} want ${want}`); }
}
const f1 = x => x.toFixed(1), f2 = x => x.toFixed(2), f3 = x => x.toFixed(3), f4 = x => x.toFixed(4), f5 = x => x.toFixed(5);
const pad = (s, n) => String(s).padStart(n);
const log = s => process.stderr.write(s + '\n');
const elapsed = () => ((Date.now() - T0) / 1000).toFixed(1) + ' s';

function primesUpTo(N) {
  const c = new Uint8Array(N + 1), out = [];
  for (let i = 2; i <= N; i++) { if (!c[i]) { out.push(i); for (let j = i * i; j <= N; j += i) c[j] = 1; } }
  return out;
}
const PR = primesUpTo(20000);
const WHEEL = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];   // the ladder's rungs

// --------------------------------------------------------------------------
// rho_y(t,g): the local factors of hl3 SEC 2, product truncated at q <= ymax
// (ymax = Infinity reproduces hl3 exactly: primes up to g+2 all enter; GTOT
// is a t-independent normaliser and cancels in every pipeline quantity).
// --------------------------------------------------------------------------
function makeRho(ymax) {
  const plist = PR.filter(q => q <= ymax);
  let GTOT = 0; const genlog = new Map();
  for (const q of plist) { if (q < 7) continue; const v = Math.log((q - 5) * q / ((q - 4) * (q - 1))); genlog.set(q, v); GTOT += v; }
  const LOG3 = Math.log(3);
  const genFactor = (q, nu4) => (q - nu4 - 1) * q / ((q - nu4) * (q - 1));
  return function rhoRow(g) {
    const L = new Float64Array(g + 1).fill(LOG3 + GTOT);
    const alive = new Uint8Array(g + 1);
    for (let t = 0; t <= g; t++) alive[t] = (t % 2 === 0 && t % 3 !== 1) ? 1 : 0;
    for (const q of plist) {
      if (q < 5) continue;
      if (q > g + 2) break;
      let nu4 = 4;
      if (g % q === 0) nu4 = 2; else if ((g + 2) % q === 0 || (g - 2) % q === 0) nu4 = 3;
      const gen = genFactor(q, nu4), colFac = q / (q - 1);
      const already = q === 5 ? 0 : genlog.get(q);
      const marks = new Uint8Array(q);
      marks[0] = 1; marks[2 % q] = 1; marks[g % q] = 1; marks[(g + 2) % q] = 1;
      const dcol = Math.log(colFac) - already;
      if (gen === 0) { for (let t = 0; t <= g; t++) if (!marks[t % q]) alive[t] = 0; else L[t] += dcol; }
      else { const dgen = Math.log(gen) - already; for (let t = 0; t <= g; t++) L[t] += marks[t % q] ? dcol : dgen; }
    }
    const r = new Float64Array(g + 1);
    for (let t = 0; t <= g; t++) r[t] = alive[t] ? Math.exp(L[t]) : 0;
    return r;
  };
}
// the pipeline of hl3 SEC 3 on a gap histogram, with a supplied W(g)
function pipeline(gapHist, gMax, lamS, Wfn) {
  let n = 0, Sg = 0, Sg2 = 0, SW = 0, SWg = 0;
  for (let g = 0; g <= gMax; g++) {
    const c = gapHist[g]; if (!c) continue;
    const w = Wfn(g);
    n += c; Sg += c * g; Sg2 += c * g * g; SW += c * w; SWg += c * w * g;
  }
  const eg = Sg / n, ew = SW / n, vg = Sg2 / n - eg * eg, cwg = SWg / n - ew * eg;
  const kappa = lamS * eg / ew, alpha = kappa * cwg / vg;
  const beta = (2 + lamS * eg) - alpha * eg;
  return { kappa, alpha, beta, delta: 2 - beta, ew, eg, eg0: n };
}
function olsOnGaps(acc) {
  // acc: {nGap, Sg, Sg2, Sn, Sn2, Sng}
  const G = acc.nGap, Eg = acc.Sg / G, En = acc.Sn / G;
  const varg = acc.Sg2 / G - Eg * Eg, varn = acc.Sn2 / G - En * En;
  const alpha = (acc.Sng / G - En * Eg) / varg, beta = En - alpha * Eg;
  const s2 = (varn - alpha * alpha * varg) * G / (G - 2);
  const seBeta = Math.sqrt(s2 * (1 / G) * (1 + Eg * Eg / varg));
  return { Eg, En, varg, alpha, beta, seBeta, cv2: varg / (Eg * Eg), lamS: (En - 2) / Eg };
}

// ==========================================================================
// SEC 0 — CUSTODY on the number line, and the wheel ladder
// ==========================================================================
console.log('SEC 0 — CUSTODY: the number line [1e5,1e8) on an independent walk; the remainder per decade; the wheel ladder');
const LO0 = 1e5, HI0 = 1e8, MARGIN = 20000;
const NL = (() => {
  const HI = HI0 + MARGIN;
  const base = primesUpTo(Math.floor(Math.sqrt(HI)) + 2);
  const GCAP = 8192;
  WID.assertCapacity('gap histogram width', 4000, GCAP, 'number line');
  // per-gap records (binned by LEFT opener)
  const CAP = 600000;
  const gA = new Int32Array(CAP), nA = new Int32Array(CAP), aA = new Float64Array(CAP);
  const sA = new Float64Array(CAP);                      // S_i: forward-distance sum over primes
  const NW = WHEEL.length + 1;                            // lpf class 0 = coprime to 31#
  const cC = new Float64Array(CAP * NW), dC = new Float64Array(CAP * NW);  // per class: count, distance sum
  let nGap = 0, prevOpener = -1, pendN = 0, pendOff = 0;
  const pendCls = new Float64Array(NW), pendOffCls = new Float64Array(NW);
  const SEG = 1 << 22;
  const lpf = new Uint8Array(SEG + 4);
  for (let lo = LO0; lo < HI; lo += SEG) {
    const hi = Math.min(lo + SEG, HI), len = hi - lo + 3;
    const seg = new Uint8Array(len);
    for (const p of base) { let m = Math.max(p * p, Math.ceil(lo / p) * p); for (; m < lo + len; m += p) seg[m - lo] = 1; }
    // least wheel prime dividing each position (class index 1..11), 0 if none
    lpf.fill(0);
    for (let k = WHEEL.length - 1; k >= 0; k--) { const p = WHEEL[k]; for (let m = Math.ceil(lo / p) * p; m < lo + len; m += p) lpf[m - lo] = k + 1; }
    for (let m = lo; m < hi; m++) {
      const isP = (m & 1) ? seg[m - lo] === 0 : false;
      if (isP && seg[m + 2 - lo] === 0) {
        // an opener closes the gap it ends (its own position belongs to the next gap)
        if (prevOpener > 0) {
          const g = m - prevOpener;
          WID.assertCapacity('gap records', nGap + 1, CAP, 'number line');
          gA[nGap] = g; nA[nGap] = pendN; aA[nGap] = prevOpener; sA[nGap] = pendN * g - pendOff;
          for (let c = 0; c < NW; c++) { cC[nGap * NW + c] = pendCls[c]; dC[nGap * NW + c] = pendCls[c] * g - pendOffCls[c]; }
          nGap++;
        }
        prevOpener = m; pendN = 0; pendOff = 0; pendCls.fill(0); pendOffCls.fill(0);
      }
      if (prevOpener > 0) {
        const cl = lpf[m - lo]; pendCls[cl] += 1; pendOffCls[cl] += m - prevOpener;
        if (isP) { pendN++; pendOff += m - prevOpener; }
      }
    }
    log(`  [SEC 0] sieved to ${hi} (${elapsed()})`);
  }
  return { nGap, gA, nA, aA, sA, cC, dC, NW };
})();
const rhoFull = makeRho(Infinity);
const DEC = [[1e5, 1e6], [1e6, 1e7], [1e7, 1e8]];
const decOut = [];
{
  console.log('  window        gaps(A)  E[g]      E[n]     beta+-se          CV^2    alpha    lambda_s | Delta_meas  Delta_HL  ratio   eps=HL-meas');
  for (const [lo, hi] of DEC) {
    // convention A (hl3): both endpoints in [lo,hi)
    const acc = { nGap: 0, Sg: 0, Sg2: 0, Sn: 0, Sn2: 0, Sng: 0 };
    const gapHist = new Int32Array(8192); let gMax = 0;
    for (let i = 0; i < NL.nGap; i++) {
      const a = NL.aA[i], g = NL.gA[i]; if (a < lo || a + g >= hi) continue;
      const n = NL.nA[i];
      acc.nGap++; acc.Sg += g; acc.Sg2 += g * g; acc.Sn += n; acc.Sn2 += n * n; acc.Sng += n * g;
      gapHist[g]++; if (g > gMax) gMax = g;
    }
    const o = olsOnGaps(acc);
    const Wc = new Map();
    const Wfn = g => { if (!Wc.has(g)) { const r = rhoFull(g); let s = 0; for (let t = 3; t <= g - 1; t++) s += r[t]; Wc.set(g, s); } return Wc.get(g); };
    const hl = pipeline(gapHist, gMax, o.lamS, Wfn);
    const dm = 2 - o.beta, eps = hl.delta - dm;
    console.log(`  [${lo.toExponential(0)},${hi.toExponential(0)}) ${pad(acc.nGap, 7)}  ${f3(o.Eg)}  ${f3(o.En)}  ${f3(o.beta)}+-${f3(o.seBeta)}  ${f4(o.cv2)}  ${f5(o.alpha)}  ${f5(o.lamS)} | ${f4(dm)}      ${f4(hl.delta)}    ${f3(hl.delta / dm)}   ${f4(eps)}`);
    decOut.push({ lo, hi, o, hl, dm, eps, gapHist, gMax });
  }
  assertNear('custody Delta_meas [1e5,1e6)', decOut[0].dm, 0.6899, 0.0001);
  assertNear('custody Delta_meas [1e6,1e7)', decOut[1].dm, 0.6862, 0.0001);
  assertNear('custody Delta_meas [1e7,1e8)', decOut[2].dm, 0.6214, 0.0001);
  assertNear('custody Delta_HL [1e5,1e6)', decOut[0].hl.delta, 0.7914, 0.0001);
  assertNear('custody Delta_HL [1e6,1e7)', decOut[1].hl.delta, 0.7124, 0.0001);
  assertNear('custody Delta_HL [1e7,1e8)', decOut[2].hl.delta, 0.6545, 0.0001);
  assertNear('custody beta [1e7,1e8)', decOut[2].o.beta, 1.379, 0.001);
  assertNear('custody CV^2 [1e7,1e8)', decOut[2].o.cv2, 0.8941, 0.0001);
  console.log(`  the remainder eps = Delta_HL - Delta_meas, in units of Delta_meas: ${decOut.map(d => f3(d.eps / d.dm)).join(', ')}`);
  // pooling guard: the prime density falls 10% across a decade, so the pooled OLS could carry a
  // Simpson-type bias; Delta on the two half-decades of the top window, convention A
  for (const [lo, hi] of [[1e7, Math.round(10 ** 7.5)], [Math.round(10 ** 7.5), 1e8]]) {
    const acc = { nGap: 0, Sg: 0, Sg2: 0, Sn: 0, Sn2: 0, Sng: 0 };
    for (let i = 0; i < NL.nGap; i++) { const a = NL.aA[i], g = NL.gA[i]; if (a < lo || a + g >= hi) continue; const n = NL.nA[i]; acc.nGap++; acc.Sg += g; acc.Sg2 += g * g; acc.Sn += n; acc.Sn2 += n * n; acc.Sng += n * g; }
    const o = olsOnGaps(acc);
    console.log(`  half-decade [${lo},${hi}): ${acc.nGap} gaps, E[g]=${f3(o.Eg)}, Delta_meas = ${f4(2 - o.beta)} +- ${f4(o.seBeta)}, CV^2=${f4(o.cv2)}`);
  }
  for (let k = 7; k < 8; k += 0.25) {
    const lo = Math.round(10 ** k), hi = Math.round(10 ** (k + 0.25));
    const acc = { nGap: 0, Sg: 0, Sg2: 0, Sn: 0, Sn2: 0, Sng: 0 };
    for (let i = 0; i < NL.nGap; i++) { const a = NL.aA[i], g = NL.gA[i]; if (a < lo || a + g >= hi) continue; const n = NL.nA[i]; acc.nGap++; acc.Sg += g; acc.Sg2 += g * g; acc.Sn += n; acc.Sn2 += n * n; acc.Sng += n * g; }
    const o = olsOnGaps(acc);
    console.log(`  quarter-decade [${lo},${hi}): ${acc.nGap} gaps, E[g]=${f3(o.Eg)}, Delta_meas = ${f4(2 - o.beta)} +- ${f4(o.seBeta)}`);
  }
  console.log(`  the largest prime entering rho at [1e7,1e8) is <= g_max + 2 = ${decOut[2].gMax + 2}; sqrt(1e7) = ${f1(Math.sqrt(1e7))}; g_max + 2 < sqrt(1e7): ${decOut[2].gMax + 2 < Math.sqrt(1e7)}`);
}
// the wheel ladder: origins coprime to y#, convention B (binned by left opener)
const ladder = [];
{
  console.log('  the wheel ladder at each decade, convention B (gaps by left opener): R, then R_cop(y) - R for origins coprime to y#, then the prime origin h - R');
  console.log('  window        R          h-R    | ' + ['int', ...WHEEL.slice(1).map(y => 'cop' + y)].map(s => pad(s, 6)).join(' '));
  for (const [lo, hi] of DEC) {
    let Sg = 0, Sg2 = 0, Sn = 0, Ss = 0, nB = 0;
    const cnt = new Float64Array(NL.NW), dst = new Float64Array(NL.NW);
    for (let i = 0; i < NL.nGap; i++) {
      const a = NL.aA[i]; if (a < lo || a >= hi) continue;
      const g = NL.gA[i]; nB++;
      Sg += g; Sg2 += g * g; Sn += NL.nA[i]; Ss += NL.sA[i];
      for (let c = 0; c < NL.NW; c++) { cnt[c] += NL.cC[i * NL.NW + c]; dst[c] += NL.dC[i * NL.NW + c]; }
    }
    const R = Sg2 / (2 * Sg), h = Ss / Sn;
    const offs = [];
    // coprime to y# = lpf class 0 or class index > rank(y)
    for (let k = 0; k < WHEEL.length; k++) {
      let c = cnt[0], d = dst[0];
      for (let j = k + 1; j < WHEEL.length; j++) { c += cnt[j + 1]; d += dst[j + 1]; }
      offs.push(d / c - R);
    }
    // 'int' = all integers: every class
    let ci = 0, di = 0; for (let c = 0; c < NL.NW; c++) { ci += cnt[c]; di += dst[c]; }
    const intOff = di / ci - R;
    console.log(`  [${lo.toExponential(0)},${hi.toExponential(0)}) ${f4(R)}   ${f3(h - R)}  | ${[intOff, ...offs.slice(1)].map(v => pad(f3(v), 6)).join(' ')}   (h=${f3(h)}, ${nB} gaps)`);
    ladder.push({ lo, hi, R, h, intOff, offs, Sg, Sn, nB });
    assertNear(`integer origin = R + 1/2 at [${lo.toExponential(0)},${hi.toExponential(0)})`, intOff, 0.5, 1e-6);
  }
  const L8 = ladder[2];
  assertNear('custody R [1e7,1e8)', L8.R, 223.5196, 0.0001);
  assertNear('custody h - R [1e7,1e8)', L8.h - L8.R, 5.679, 0.001);
  assertNear('custody cop30 offset [1e7,1e8)', L8.offs[2], 2.7541, 0.0001);
  assertNear('custody cop210 offset [1e7,1e8)', L8.offs[3], 3.3395, 0.0001);
  console.log(`  at [1e7,1e8) the prime origin's excess h - R = ${f3(L8.h - L8.R)} against the ladder's last rung cop31 = ${f3(L8.offs[10])}: the wheel to 31 reaches ${f1(100 * L8.offs[10] / (L8.h - L8.R))}% of it`);
}
// CRT prediction of the ladder rungs y <= 13 under equidistribution of the
// openers' residue pairs (r, r+g) mod y#, gap by gap, weighted by the window's
// own gap histogram: the ENSEMBLE value of the rung at the number line's gap law.
{
  console.log('  the ladder\'s ensemble prediction (CRT, openers equidistributed among the residue pairs (r, r+g) that are twin residues mod y#):');
  console.log('  window        y    P=y#     measured   predicted   deviation   (measured minus residue-uniform; SEC 3 asks whether the ensemble shows the same)');
  for (let w = 0; w < DEC.length; w++) {
    const [lo, hi] = DEC[w];
    // gap histogram, convention B
    const gh = new Int32Array(8192); let gm = 0;
    for (let i = 0; i < NL.nGap; i++) { const a = NL.aA[i]; if (a < lo || a >= hi) continue; gh[NL.gA[i]]++; if (NL.gA[i] > gm) gm = NL.gA[i]; }
    for (const y of [5, 7, 11, 13]) {
      let P = 1; for (const q of WHEEL) if (q <= y) P *= q;
      const cop = new Uint8Array(P); for (let r = 0; r < P; r++) { let ok = 1; for (const q of WHEEL) { if (q > y) break; if (r % q === 0) { ok = 0; break; } } cop[r] = ok; }
      const twinRes = []; for (let r = 0; r < P; r++) if (cop[r] && cop[(r + 2) % P]) twinRes.push(r);
      let phiP = 0; for (let r = 0; r < P; r++) phiP += cop[r];
      // prefix sums of cop over [0, 2P) for fast window sums
      const pc = new Float64Array(2 * P + 1), pd = new Float64Array(2 * P + 1);
      for (let m = 0; m < 2 * P; m++) { const c = cop[m % P]; pc[m + 1] = pc[m] + c; pd[m + 1] = pd[m] + c * m; }
      let totC = 0, totD = 0;
      for (let g = 6; g <= gm; g += 6) {
        const wgt = gh[g]; if (!wgt) continue;
        let cC = 0, cD = 0, npairs = 0;
        for (const r of twinRes) {
          if (!cop[(r + g) % P] || !cop[(r + g + 2) % P]) continue;
          npairs++;
          // positions m in [r, r+g): coprime count c and sum of (r+g-m), over
          // full periods plus a remainder, r < P
          const full = Math.floor(g / P), rem = g - full * P;
          const S0 = pd[r + P] - pd[r];
          let c = full * phiP + (pc[r + rem] - pc[r]);
          let sumM = full * S0 + P * phiP * full * (full - 1) / 2 + (pd[r + rem] - pd[r]) + full * P * (pc[r + rem] - pc[r]);
          cC += c; cD += c * (r + g) - sumM;
        }
        if (!npairs) { failures++; console.log(`  ASSERT FAIL no residue pair for g=${g} mod ${P}`); continue; }
        totC += wgt * cC / npairs; totD += wgt * cD / npairs;
      }
      const pred = totD / totC - ladder[w].R;
      const k = WHEEL.indexOf(y);
      const meas = ladder[w].offs[k];
      console.log(`  [${lo.toExponential(0)},${hi.toExponential(0)}) ${pad(y, 3)}  ${pad(P, 6)}   ${f4(meas)}     ${f4(pred)}     ${(meas - pred >= 0 ? '+' : '') + f4(meas - pred)}`);
    }
  }
}
console.log('');

// ==========================================================================
// SEC 1 — THE TILE, ENUMERATED
// ==========================================================================
console.log('SEC 1 — THE TILE T_y ENUMERATED: every head quantity exact, the CRT identity, and hl3\'s pipeline run inside the tile');
const LEVELS = LEVEL29 ? [11, 13, 17, 19, 23, 29] : [11, 13, 17, 19, 23];
const GM = 4096;
const tileOut = {};
function nuQ(q, set) { const s = new Set(); for (const v of set) s.add(((v % q) + q) % q); return s.size; }
for (const y of LEVELS) {
  const qs = PR.filter(q => q <= y);
  let W = 1; for (const q of qs) W *= q;
  WID.assertFits('tile width', W, Float64Array, `@${y}`);
  // walker state
  const gapHist = new Float64Array(GM);
  const tab = new Float64Array(GM * GM);    // tab[g*GM + t]: holes at offset t in gaps of length g
  WID.assertCapacity('per-(g,t) table', GM * GM, 2 ** 31, `@${y}`);
  let nGap = 0, Sg = 0, Sg2 = 0, Sn = 0, Sn2 = 0, Sng = 0, Ss = 0, Ss2 = 0, gMax = 0, nHoles = 0, nTwin = 0;
  let firstOpener = -1, prevOpener = -1, pendN = 0, pendOff = 0, pendOff2 = 0;
  const pendList = new Int32Array(GM); let pendLen = 0;
  const preN = []; // holes before the first opener (offsets from 0), folded into the wrap gap
  function closeGap(nextOpener, g) {
    // pending holes have offsets pendList[0..pendLen) from prevOpener; S = sum (g - off)
    WID.assertCapacity('gap length vs GM', g + 1, GM, `@${y}`);
    let s = 0, s2 = 0;
    for (let i = 0; i < pendLen; i++) { const d = g - pendList[i]; s += d; s2 += d * d; tab[g * GM + pendList[i]] += 1; }
    nGap++; Sg += g; Sg2 += g * g; Sn += pendLen; Sn2 += pendLen * pendLen; Sng += pendLen * g; Ss += s; Ss2 += s2;
    gapHist[g]++; if (g > gMax) gMax = g;
  }
  // order matters: an opener closes the gap it ends BEFORE it is counted as a
  // hole, so that its own position (offset 0, distance g) belongs to its gap
  const seenOpener = (m) => {
    nTwin++;
    if (prevOpener >= 0) closeGap(m, m - prevOpener);
    else firstOpener = m;
    prevOpener = m; pendLen = 0;
  };
  const seenHole = (m) => {
    nHoles++;
    if (prevOpener >= 0) { pendList[pendLen++] = m - prevOpener; }
    else preN.push(m);
  };
  const SEGT = 1 << 25;
  let holeFull = null;
  if (W <= 2 ** 29) {
    holeFull = new Uint8Array(W + 2);
    holeFull.fill(1);
    for (const q of qs) for (let m = 0; m < W + 2; m += q) holeFull[m] = 0;
    for (let m = 1; m < W; m += 2) {
      if (!holeFull[m]) continue;
      if (holeFull[m + 2]) seenOpener(m);     // m+2 = W+1 <-> 1, and holeFull[W+1] = hole(1) = 1
      seenHole(m);
    }
  } else {
    for (let lo = 0; lo < W; lo += SEGT) {
      const hi = Math.min(lo + SEGT, W), len = hi - lo + 2;
      const seg = new Uint8Array(len); seg.fill(1);
      for (const q of qs) for (let m = Math.ceil(lo / q) * q; m < lo + len; m += q) seg[m - lo] = 0;
      if (hi === W) { seg[len - 2] = 0; seg[len - 1] = 1; }   // positions W, W+1 wrap to 0, 1
      for (let m = (lo | 1); m < hi; m += 2) {
        if (!seg[m - lo]) continue;
        if (seg[m + 2 - lo]) seenOpener(m);
        seenHole(m);
      }
      log(`  [SEC 1 @${y}] walked to ${hi} of ${W} (${elapsed()})`);
    }
  }
  // wrap gap: from the last opener through W to the first opener
  {
    const g = W - prevOpener + firstOpener;
    for (const m of preN) pendList[pendLen++] = m + W - prevOpener;
    closeGap(firstOpener + W, g);
  }
  assertEq(`@${y} sum of gaps = W`, Sg, W);
  assertEq(`@${y} sum of n = phi(W)`, Sn, nHoles);
  let phi = 1; for (const q of qs) phi *= q - 1;
  assertEq(`@${y} holes = phi(W)`, nHoles, phi);
  let twinExp = 1; for (const q of qs) twinExp *= q === 2 ? 1 : q - 2;
  assertEq(`@${y} twin slots = prod (q-2)`, nTwin, twinExp);
  const o = olsOnGaps({ nGap, Sg, Sg2, Sn, Sn2, Sng });
  const R = Sg2 / (2 * Sg), hHole = Ss / Sn, sdHole = Math.sqrt(Ss2 / Sn - hHole * hHole);
  const hInt = (Sg2 + Sg) / (2 * Sg);
  const lam = phi / W, lam2 = nTwin / W, lamS = lam - 2 * lam2;
  assertNear(`@${y} lambda_s identity`, lamS, o.lamS, 1e-12);
  const h1 = Sng / (2 * Sn);
  const A = hHole - h1, B = h1 - R, Af = (o.Eg - 2) / o.En, D = A - Af;
  assertNear(`@${y} B regression identity`, B, -o.beta * o.varg / (2 * o.Eg * o.En), 1e-9);
  // CRT identity for rho: #{n : n, n+2, n+t holes} = prod_q (q - nu_q({0,2,t})), exact integers
  let crtLine = '';
  if (holeFull) {
    const ts = [4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 30, 36, 42, 60, 84, 90];
    let ok = 0;
    for (const t of ts) {
      let c = 0;
      for (let m = 1; m < W; m += 2) if (holeFull[m] && holeFull[m + 2] && holeFull[(m + t) % W]) c++;
      let want = 1; for (const q of qs) want *= q - nuQ(q, [0, 2, t]);
      if (c === want) ok++; else { failures++; console.log(`  ASSERT FAIL @${y} CRT count t=${t}: ${c} vs ${want}`); }
    }
    crtLine = `${ok}/${ts.length} offsets t agree as integers`;
  } else crtLine = 'not enumerated at this level (segmented walk)';
  // the pipeline inside the tile: rho truncated at q <= y, then the exact E[n|g]
  const rhoY = makeRho(y);
  const W5 = new Float64Array(gMax + 1), Wex = new Float64Array(gMax + 1);
  for (let g = 6; g <= gMax; g++) {
    if (!gapHist[g]) continue;
    const r = rhoY(g); let s = 0; for (let t = 3; t <= g - 1; t++) s += r[t]; W5[g] = s;
    let e = 0; for (let t = 3; t <= g - 1; t++) e += tab[g * GM + t]; Wex[g] = e / gapHist[g];
  }
  const pipe5 = pipeline(gapHist, gMax, lamS, g => W5[g]);
  const pipeX = pipeline(gapHist, gMax, lamS, g => Wex[g]);
  assertNear(`@${y} exact-W pipeline returns the OLS Delta`, pipeX.delta, 2 - o.beta, 1e-9);
  console.log(`  @${y}: W=${W} phi=${phi} twin slots=${nTwin} gaps=${nGap} g_max=${gMax} | E[g]=${f3(o.Eg)} E[n]=${f3(o.En)} CV^2=${f4(o.cv2)} R=${f4(R)} | lambda=${f5(lam)} lambda_2=${f5(lam2)} lambda_s=${f5(lamS)}`);
  console.log(`       heads: uniform-integer origin ${f4(hInt)} (= R + 1/2: ${f4(R + 0.5)}) | hole origin ${f4(hHole)} = R + ${f4(hHole - R)} | per-hole sd ${f3(sdHole)}`);
  console.log(`       identity: h_hole - R = ${f4(hHole - R)} = A ${f4(A)} + B ${f4(B)}; A = A_forced ${f4(Af)} + D ${f4(D)}; beta=${f4(o.beta)} alpha=${f5(o.alpha)} beta*CV^2=${f4(o.beta * o.cv2)}`);
  console.log(`       CRT identity for the hole density at offset t from an opener: ${crtLine}`);
  console.log(`       Delta_tile (exact, OLS) = ${f4(2 - o.beta)} | Delta_pipe (hl3 pipeline, rho_y, 5-point conditioning) = ${f4(pipe5.delta)} | ratio pipe/exact = ${f4(pipe5.delta / (2 - o.beta))} | kappa/lambda=${f4(pipe5.kappa / lam)} (exact W gives kappa = 1 in count units)`);
  // where the pipeline's miss sits: E[n|g] exact vs 2 + kappa W5(g), at the gap lengths carrying the mass
  {
    const rows = [];
    for (let g = 6; g <= gMax; g += 6) if (gapHist[g] >= 0.001 * nGap) rows.push(g);
    const shown = rows.filter((g, i) => i % Math.max(1, Math.floor(rows.length / 8)) === 0).slice(0, 9);
    console.log('       E[n|g] exact against the pipeline 2 + kappa*W5(g), at the gap lengths carrying >= 0.1% of the gaps:');
    console.log('         g     share    exact     pipe     pipe-exact   W_exact/W5');
    for (const g of shown) console.log(`       ${pad(g, 5)}   ${f4(gapHist[g] / nGap)}   ${f4(2 + Wex[g])}   ${f4(2 + pipe5.kappa * W5[g])}   ${pad((pipe5.kappa * W5[g] - Wex[g] >= 0 ? '+' : '') + f4(pipe5.kappa * W5[g] - Wex[g]), 8)}     ${f4(Wex[g] / W5[g])}`);
  }
  tileOut[y] = { W, phi, nTwin, nGap, gMax, o, R, hHole, sdHole, hInt, lam, lam2, lamS, A, B, Af, D, pipe5, qs };
  log(`  [SEC 1] level ${y} done (${elapsed()})`);
}
{
  console.log('  summary across levels: Delta_tile, Delta_pipe, ratio, the hole-origin excess h_hole - R, and beta*CV^2');
  console.log('    y    E[g]     Delta_tile  Delta_pipe  pipe/exact   h_hole-R   (h_hole-R)/E[g]   beta*CV^2   D');
  for (const y of LEVELS) { const t = tileOut[y]; console.log(`   ${pad(y, 2)}   ${f3(t.o.Eg).padStart(7)}   ${f4(2 - t.o.beta)}      ${f4(t.pipe5.delta)}      ${f4(t.pipe5.delta / (2 - t.o.beta))}      ${f4(t.hHole - t.R)}     ${f4((t.hHole - t.R) / t.o.Eg)}          ${f4(t.o.beta * t.o.cv2)}    ${f4(t.D)}`); }
}
console.log('');

// ==========================================================================
// SEC 2 — THE ANCHORED ZONE (y, y'^2) AGAINST ITS OWN ENSEMBLE
// ==========================================================================
console.log('SEC 2 — THE ANCHORED ZONE (y, y\'^2): the number-line head at every prime origin there against the tile\'s hole-origin ensemble');
{
  const NMAX = 1e6;
  const comp = new Uint8Array(NMAX + 3);
  for (let i = 2; i * i <= NMAX + 2; i++) if (!comp[i]) for (let j = i * i; j <= NMAX + 2; j += i) comp[j] = 1;
  const isPrime = n => n >= 2 && !comp[n];
  console.log('    y   zone         origins  anch.mean  ens.mean  ens.sd   z(naive)  | sqrt-matched (y^2,y\'^2): origins  anch.mean   z   | head_line = head_tile at');
  for (const y of LEVELS) {
    const t = tileOut[y];
    const yp = PR[PR.indexOf(y) + 1], top = yp * yp;
    const isHole = n => { for (const q of t.qs) if (n % q === 0) return false; return true; };
    let n1 = 0, s1 = 0, n2 = 0, s2 = 0, agree = 0;
    for (let p = y + 1; p < top; p++) {
      if (!isPrime(p)) continue;
      let a = p + 1; while (!(isPrime(a) && isPrime(a + 2))) a++;
      let b = p + 1; while (!(isHole(b) && isHole(b + 2))) b++;
      const hl = a - p, ht = b - p;
      if (hl === ht) agree++;
      n1++; s1 += hl;
      if (p > y * y) { n2++; s2 += hl; }
    }
    const m1 = s1 / n1, m2 = n2 ? s2 / n2 : NaN;
    const z1 = (m1 - t.hHole) / (t.sdHole / Math.sqrt(n1)), z2 = n2 ? (m2 - t.hHole) / (t.sdHole / Math.sqrt(n2)) : NaN;
    console.log(`   ${pad(y, 2)}   (${y},${pad(top, 4)})   ${pad(n1, 5)}    ${f3(m1).padStart(7)}   ${f3(t.hHole).padStart(7)}   ${f3(t.sdHole)}   ${(z1 >= 0 ? '+' : '') + f2(z1)}     |                          ${pad(n2, 4)}     ${f3(m2).padStart(7)}   ${(z2 >= 0 ? '+' : '') + f2(z2)}  | ${agree}/${n1} origins`);
  }
  console.log('  z(naive) treats the zone\'s origins as independent draws from the ensemble of holes; they are one contiguous stretch, so z is a scale and not a test.');
}
// ==========================================================================
// SEC 3 — THE ROTATION ENSEMBLE AT THE NUMBER LINE'S OWN LEVELS, SAMPLED
// ==========================================================================
// T_y at y = 313..9973 cannot be enumerated, but one uniformly random
// translate of it can be drawn EXACTLY: choose the residue of the origin mod
// every q <= y uniformly (CRT), and the hole pattern in a window of length L
// is then determined. Every statistic below is a Monte Carlo estimate of an
// ensemble expectation of a periodic object; the error is sampling only.
// The level for the number line's decade [lo, hi) is y = sqrt(p): the sieve
// frozen at sqrt(p) is exact on the number line for a distance of order
// sqrt(p) ln p above p, far beyond one twin gap, so the number line's local
// statistics at height p ARE the anchored member of this ensemble at level
// sqrt(p) (destroyer-census-01.md §6(a): the head is that frozen survivor in
// 96.65% of zones). Windows: L = 2^22; gaps crossing a window edge are
// dropped (bias of relative order E[g]/L, below 1e-3).
console.log('SEC 3 — THE ROTATION ENSEMBLE AT y = sqrt(p), SAMPLED EXACTLY BY CRT: the ensemble value of every head statistic at the number line\'s own level');
function xorshift(seed) {
  let a = seed >>> 0 || 1, b = 0x9e3779b9, c = 0x243f6a88, d = 0xb7e15162;
  return () => { let t = a ^ (a << 11); a = b; b = c; c = d; d = (d ^ (d >>> 19)) ^ (t ^ (t >>> 8)); return (d >>> 0) / 4294967296; };
}
function ladderPrediction(gh, gm, y, R) {
  let P = 1; for (const q of WHEEL) if (q <= y) P *= q;
  const cop = new Uint8Array(P); for (let r = 0; r < P; r++) { let ok = 1; for (const q of WHEEL) { if (q > y) break; if (r % q === 0) { ok = 0; break; } } cop[r] = ok; }
  const twinRes = []; for (let r = 0; r < P; r++) if (cop[r] && cop[(r + 2) % P]) twinRes.push(r);
  let phiP = 0; for (let r = 0; r < P; r++) phiP += cop[r];
  const pc = new Float64Array(2 * P + 1), pd = new Float64Array(2 * P + 1);
  for (let m = 0; m < 2 * P; m++) { const c = cop[m % P]; pc[m + 1] = pc[m] + c; pd[m + 1] = pd[m] + c * m; }
  let totC = 0, totD = 0;
  for (let g = 6; g <= gm; g += 6) {
    const wgt = gh[g]; if (!wgt) continue;
    let cC = 0, cD = 0, npairs = 0;
    for (const r of twinRes) {
      if (!cop[(r + g) % P] || !cop[(r + g + 2) % P]) continue;
      npairs++;
      const full = Math.floor(g / P), rem = g - full * P;
      const S0 = pd[r + P] - pd[r];
      const c = full * phiP + (pc[r + rem] - pc[r]);
      const sumM = full * S0 + P * phiP * full * (full - 1) / 2 + (pd[r + rem] - pd[r]) + full * P * (pc[r + rem] - pc[r]);
      cC += c; cD += c * (r + g) - sumM;
    }
    if (!npairs) { failures++; console.log(`  ASSERT FAIL no residue pair for g=${g} mod ${P}`); continue; }
    totC += wgt * cC / npairs; totD += wgt * cD / npairs;
  }
  return totD / totC - R;
}
const SEED = 20260830, LWIN = 1 << 22, NWIN0 = 400, NWIN1 = 300;
const mcOut = {};
const MCLEVELS = [1e5, 1e6, 1e7, 1e8].map(e => { let y = 2; for (const q of PR) { if (q * q <= e) y = q; else break; } return y; });
// [lo,hi) is a window of the tile T_y at phase 0 when hi <= y'^2 (Zone Restriction): asserted
for (let i = 0; i < 4; i++) { const y = MCLEVELS[i], yp = PR[PR.indexOf(y) + 1]; assertEq(`decade top ${[1e5, 1e6, 1e7, 1e8][i]} <= y'^2 = ${yp * yp} for y = ${y}`, [1e5, 1e6, 1e7, 1e8][i] <= yp * yp, true); }
const YMATCH = (() => { let y = 2; for (const q of PR) { if (q <= 20000) y = q; else break; } return y; })();
console.log(`  seed ${SEED}, window L = ${LWIN}, ${NWIN0} windows per decade level and ${NWIN1} per matched level, levels y = ${MCLEVELS.join(', ')} (largest prime with y^2 <= 1e5, 1e6, 1e7, 1e8; each decade [lo,hi) is a window of T_y at phase 0 since hi <= y'^2, asserted)`);
console.log(`  plus y = ${YMATCH}, chosen so that the ensemble's E[g] lands near the number line's 236 at [1e7,1e8): a gap-scale-matched comparator`);
function mcLevel(y, NWIN, label) {
  const qs = PR.filter(q => q <= y);
  const rnd = xorshift(SEED + y);
  const NW = WHEEL.length + 1;
  const seg = new Uint8Array(LWIN + 2), lpf = new Uint8Array(LWIN + 2);
  const gapHist = new Float64Array(8192); let gMax = 0;
  let nGap = 0, Sg = 0, Sg2 = 0, Sn = 0, Sn2 = 0, Sng = 0, Ss = 0, Ss2 = 0, Sd = 0;
  let totPos = 0, totHoles = 0, totTwin = 0;
  const cnt = new Float64Array(NW), dst = new Float64Array(NW);
  const pendCls = new Float64Array(NW), pendOffCls = new Float64Array(NW);
  const pendList = new Int32Array(8192);
  for (let w = 0; w < NWIN; w++) {
    seg.fill(1); lpf.fill(0);
    // one uniform translate: an independent uniform residue of the origin mod every q <= y
    const off = new Int32Array(qs.length);
    for (let i = 0; i < qs.length; i++) { const q = qs[i], r = Math.floor(rnd() * q); off[i] = (q - r) % q; }
    for (let i = 0; i < qs.length; i++) { const q = qs[i]; for (let j = off[i]; j < LWIN + 2; j += q) seg[j] = 0; }
    // least wheel prime dividing each position (class index 1..11), 0 if none
    for (let k = WHEEL.length - 1; k >= 0; k--) { const q = WHEEL[k], i = qs.indexOf(q); for (let j = off[i]; j < LWIN + 2; j += q) lpf[j] = k + 1; }
    let prevOpener = -1, pendN = 0, pendOff = 0, pendLen = 0, nH = 0, nT = 0;
    for (let j = 0; j < LWIN; j++) {
      const isH = seg[j] === 1;
      if (isH) nH++;
      if (isH && seg[j + 2] === 1) {
        nT++;
        if (prevOpener >= 0) {
          const g = j - prevOpener;
          WID.assertCapacity('MC gap length', g + 1, 8192, `@${y}`);
          let s = 0, s2 = 0;
          for (let i = 0; i < pendLen; i++) { const d = g - pendList[i]; s += d; s2 += d * d; }
          nGap++; Sg += g; Sg2 += g * g; Sn += pendN; Sn2 += pendN * pendN; Sng += pendN * g; Ss += s; Ss2 += s2;
          gapHist[g]++; if (g > gMax) gMax = g;
          for (let c = 0; c < NW; c++) { cnt[c] += pendCls[c]; dst[c] += pendCls[c] * g - pendOffCls[c]; }
        }
        prevOpener = j; pendN = 0; pendOff = 0; pendLen = 0; pendCls.fill(0); pendOffCls.fill(0);
      }
      if (prevOpener >= 0) {
        const cl = lpf[j]; pendCls[cl] += 1; pendOffCls[cl] += j - prevOpener;
        if (isH) { pendN++; pendList[pendLen++] = j - prevOpener; }
      }
    }
    totPos += LWIN; totHoles += nH; totTwin += nT;
    if ((w + 1) % 100 === 0) log(`  [SEC 3 @${y}] ${w + 1}/${NWIN} windows, ${nGap} gaps (${elapsed()})`);
  }
  const o = olsOnGaps({ nGap, Sg, Sg2, Sn, Sn2, Sng });
  const R = Sg2 / (2 * Sg), hHole = Ss / Sn, sdHole = Math.sqrt(Ss2 / Sn - hHole * hHole);
  const h1 = Sng / (2 * Sn), A = hHole - h1, B = h1 - R, Af = (o.Eg - 2) / o.En, D = A - Af;
  let lamEx = 1, lam2Ex = 1; for (const q of qs) { lamEx *= 1 - 1 / q; lam2Ex *= q === 2 ? 0.5 : 1 - 2 / q; }
  const rhoY = makeRho(y);
  const Wc = new Map();
  const Wfn = g => { if (!Wc.has(g)) { const r = rhoY(g); let s = 0; for (let t = 3; t <= g - 1; t++) s += r[t]; Wc.set(g, s); } return Wc.get(g); };
  const pipe = pipeline(gapHist, gMax, o.lamS, Wfn);
  // the wheel ladder in the ensemble, and its CRT prediction
  const offs = [];
  for (let k = 0; k < WHEEL.length; k++) { let c = cnt[0], d = dst[0]; for (let j = k + 1; j < WHEEL.length; j++) { c += cnt[j + 1]; d += dst[j + 1]; } offs.push(d / c - R); }
  let ci = 0, di = 0; for (let c = 0; c < NW; c++) { ci += cnt[c]; di += dst[c]; }
  console.log(`  @${y} (${label}): ${nGap} gaps | E[g]/ln^2 y = ${f3(o.Eg / Math.log(y) ** 2)} | hole density ${f5(totHoles / totPos)} (exact ${f5(lamEx)}) twin density ${f5(totTwin / totPos)} (exact ${f5(lam2Ex)}) | E[g]=${f3(o.Eg)} E[n]=${f3(o.En)} CV^2=${f4(o.cv2)} R=${f3(R)} g_max=${gMax}`);
  console.log(`       beta=${f4(o.beta)}+-${f4(o.seBeta)} alpha=${f5(o.alpha)} lambda_s=${f5(o.lamS)} beta*CV^2=${f4(o.beta * o.cv2)} | Delta_ens=${f4(2 - o.beta)} Delta_pipe=${f4(pipe.delta)} ratio pipe/ens=${f4(pipe.delta / (2 - o.beta))} kappa/lambda=${f4(pipe.kappa / (totHoles / totPos))}`);
  console.log(`       h_hole - R = ${f4(hHole - R)} = A ${f4(A)} + B ${f4(B)}; A_forced ${f4(Af)}, D ${f4(D)}; integer origin - R = ${f4(di / ci - R)} (1/2 exactly); per-hole sd ${f3(sdHole)}`);
  console.log(`       ladder: ${['int', ...WHEEL.slice(1).map(q => 'cop' + q)].map((s, i) => s + '=' + f3(i === 0 ? di / ci - R : offs[i])).join(' ')}`);
  const dev = [];
  for (const yy of [5, 7, 11, 13]) { const pred = ladderPrediction(gapHist, gMax, yy, R); const k = WHEEL.indexOf(yy); dev.push(`cop${yy}: meas ${f4(offs[k])} pred ${f4(pred)} dev ${(offs[k] - pred >= 0 ? '+' : '') + f4(offs[k] - pred)}`); }
  console.log(`       ladder against its CRT prediction: ${dev.join(' | ')}`);
  const out = { y, o, R, hHole, D, pipe, offs, nGap, holeDensity: totHoles / totPos, label };
  log(`  [SEC 3] level ${y} done (${elapsed()})`);
  return out;
}
for (const y of MCLEVELS) mcOut[y] = mcLevel(y, NWIN0, 'decade tile');
mcOut[YMATCH] = mcLevel(YMATCH, NWIN1, 'gap-scale matched to [1e7,1e8)');
// half-decade windows of the number line, each against an ensemble whose level is chosen so
// that the ensemble's E[g] lands on the window's: ln y = sqrt(E[g]_line / 2.41), 2.41 being the
// measured E[g]_ens / ln^2 y at the five levels above (printed there as a check)
const HALF = [];
for (let k = 5; k < 8; k += 0.5) HALF.push([Math.round(10 ** k), Math.round(10 ** (k + 0.5))]);
const halfOut = [];
console.log('  half-decade windows of the number line (convention A) against gap-scale-matched ensembles:');
console.log('  window                    gaps    E[g]_line  Delta_meas+-se     Delta_HL  | y_match  E[g]_ens   Delta_ens+-se     Delta_pipe  pipe/ens | Delta_meas/Delta_ens  (HL-ens)/Dm  (ens-meas)/Dm');
for (const [lo, hi] of HALF) {
  const acc = { nGap: 0, Sg: 0, Sg2: 0, Sn: 0, Sn2: 0, Sng: 0 };
  const gapHist = new Int32Array(8192); let gMax = 0;
  for (let i = 0; i < NL.nGap; i++) { const a = NL.aA[i], g = NL.gA[i]; if (a < lo || a + g >= hi) continue; const n = NL.nA[i]; acc.nGap++; acc.Sg += g; acc.Sg2 += g * g; acc.Sn += n; acc.Sn2 += n * n; acc.Sng += n * g; gapHist[g]++; if (g > gMax) gMax = g; }
  const o = olsOnGaps(acc);
  const Wc = new Map();
  const Wfn = g => { if (!Wc.has(g)) { const r = rhoFull(g); let s = 0; for (let t = 3; t <= g - 1; t++) s += r[t]; Wc.set(g, s); } return Wc.get(g); };
  const hl = pipeline(gapHist, gMax, o.lamS, Wfn);
  const lnY = Math.sqrt(o.Eg / 2.41);
  let y = 2; for (const q of PR) { if (Math.log(q) <= lnY) y = q; else break; }
  const m = mcLevel(y, NWIN1, `matched to [${lo},${hi})`);
  const dm = 2 - o.beta, de = 2 - m.o.beta;
  console.log(`  [${lo},${hi})  ${pad(acc.nGap, 6)}   ${f3(o.Eg).padStart(8)}   ${f4(dm)}+-${f4(o.seBeta)}   ${f4(hl.delta)}   | ${pad(y, 6)}   ${f3(m.o.Eg).padStart(8)}   ${f4(de)}+-${f4(m.o.seBeta)}   ${f4(m.pipe.delta)}     ${f4(m.pipe.delta / de)} |      ${f4(dm / de)}           ${pad((hl.delta - de >= 0 ? '+' : '') + f3((hl.delta - de) / dm), 6)}      ${pad((de - dm >= 0 ? '+' : '') + f3((de - dm) / dm), 6)}`);
  halfOut.push({ lo, hi, o, hl, dm, m, de });
}
{
  // the pooled decade against the mean of its two halves: the pooling bias in Delta_meas
  console.log('  pooling: the decade\'s Delta_meas against the gap-weighted mean of its two half-decades');
  for (let w = 0; w < 3; w++) {
    const a = halfOut[2 * w], b = halfOut[2 * w + 1];
    const mean = (a.dm * a.hl.eg0 + b.dm * b.hl.eg0) / (a.hl.eg0 + b.hl.eg0);
    console.log(`  [${DEC[w][0].toExponential(0)},${DEC[w][1].toExponential(0)}): pooled ${f4(decOut[w].dm)} | halves ${f4(a.dm)}, ${f4(b.dm)} | gap-weighted mean of halves ${f4(mean)} | pooled minus mean ${(decOut[w].dm - mean >= 0 ? '+' : '') + f4(decOut[w].dm - mean)}`);
  }
}
{
  console.log('  THE SPLIT. Per decade: the number line\'s Delta_meas and Delta_HL; the ensemble\'s Delta_ens and Delta_pipe at y = sqrt(lo) and sqrt(hi);');
  console.log('  c = Delta_ens/Delta_pipe is the pipeline\'s own approximation measured in the ensemble (the no-interior-opener conditioning treated as uniform thinning);');
  console.log('  ensemble-corrected HL = Delta_HL * c; the anchoring part is what is left: Delta_HL*c - Delta_meas, in units of Delta_meas');
  console.log('  window        Delta_meas  Delta_HL  eps/Dm  |  y     Delta_ens  Delta_pipe    c     | HL*c     pipeline part  anchoring part');
  for (let w = 0; w < DEC.length; w++) {
    const d = decOut[w];
    for (const y of [MCLEVELS[w], MCLEVELS[w + 1]]) {
      const m = mcOut[y]; const c = (2 - m.o.beta) / m.pipe.delta;
      const hlc = d.hl.delta * c;
      console.log(`  [${d.lo.toExponential(0)},${d.hi.toExponential(0)})   ${f4(d.dm)}     ${f4(d.hl.delta)}   ${f3(d.eps / d.dm)}  | ${pad(y, 5)}   ${f4(2 - m.o.beta)}     ${f4(m.pipe.delta)}    ${f4(c)}  | ${f4(hlc)}   ${pad((d.hl.delta - hlc >= 0 ? '+' : '') + f3((d.hl.delta - hlc) / d.dm), 8)}        ${pad((hlc - d.dm >= 0 ? '+' : '') + f3((hlc - d.dm) / d.dm), 8)}`);
    }
  }
  console.log('  the same statistics side by side, number line (anchored) against the ensemble of the tile the decade is a window of (y = sqrt(hi)):');
  console.log('  window         E[g]_line E[g]_ens | beta_line  beta_ens | CV2_line  CV2_ens | bCV2_line bCV2_ens | D_ens   | (h-R)/E[g] line   ens | Delta_meas/Delta_ens');
  for (let w = 0; w < DEC.length; w++) {
    const d = decOut[w], m = mcOut[MCLEVELS[w + 1]], L = ladder[w];
    console.log(`  [${d.lo.toExponential(0)},${d.hi.toExponential(0)})    ${f3(d.o.Eg)}   ${f3(m.o.Eg)} | ${f4(d.o.beta)}     ${f4(m.o.beta)} | ${f4(d.o.cv2)}   ${f4(m.o.cv2)} | ${f4(d.o.beta * d.o.cv2)}    ${f4(m.o.beta * m.o.cv2)} | ${f4(m.D)} |   ${f4((L.h - L.R) / (L.Sg / L.nB))}          ${f4((m.hHole - m.R) / m.o.Eg)} |   ${f4(d.dm / (2 - m.o.beta))}`);
  }
  {
    const d = decOut[2], m = mcOut[YMATCH], L = ladder[2];
    console.log(`  gap-scale-matched: [1e7,1e8) against the ensemble at y = ${YMATCH} (E[g]_ens = ${f3(m.o.Eg)} against the number line's ${f3(d.o.Eg)}, hole density ${f5(m.o.En / m.o.Eg)} against 1/ln(5e7) = ${f5(1 / Math.log(5e7))})`);
    console.log(`    Delta_meas ${f4(d.dm)} against Delta_ens ${f4(2 - m.o.beta)}+-${f4(m.o.seBeta)}: ratio ${f4(d.dm / (2 - m.o.beta))} | beta ${f4(d.o.beta)} vs ${f4(m.o.beta)} | CV^2 ${f4(d.o.cv2)} vs ${f4(m.o.cv2)} | beta*CV^2 ${f4(d.o.beta * d.o.cv2)} vs ${f4(m.o.beta * m.o.cv2)} | (h-R)/E[g] ${f4((L.h - L.R) / (L.Sg / L.nB))} vs ${f4((m.hHole - m.R) / m.o.Eg)} | pipe/ens ${f4(m.pipe.delta / (2 - m.o.beta))}`);
  }
}
console.log('');
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
log(`done (${elapsed()})`);
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/attack-0830-head-remainder.js
//   invocation:  node research/history/staging/attack-0830-head-remainder.js
//   code-sha256: 77895ae49f7d13d5e875c562e5db9d383991efb8b04eba6b875f04cb8b1e825f
//   out-sha256:  f7701aac9fb734d05e126be83c26a7851ca501689d713c6f863bb31fcf0ed5e4
//   body-lines:  218
//   inputs:      research/qc/widths.js@9bcca510a863
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     312.5 s
// ============================================================================
// SEC 0 — CUSTODY: the number line [1e5,1e8) on an independent walk; the remainder per decade; the wheel ladder
//   window        gaps(A)  E[g]      E[n]     beta+-se          CV^2    alpha    lambda_s | Delta_meas  Delta_HL  ratio   eps=HL-meas
//   [1e+5,1e+6)    6944  129.581  9.921  1.310+-0.035  0.8281  0.06645  0.06113 | 0.6899      0.7914    1.147   0.1015
//   [1e+6,1e+7)   50810  177.129  11.535  1.314+-0.015  0.8520  0.05770  0.05383 | 0.6862      0.7124    1.038   0.0263
//   [1e+7,1e+8)  381331  236.014  13.366  1.379+-0.006  0.8941  0.05079  0.04816 | 0.6214      0.6545    1.053   0.0330
//   the remainder eps = Delta_HL - Delta_meas, in units of Delta_meas: 0.147, 0.038, 0.053
//   half-decade [10000000,31622777): 101137 gaps, E[g]=213.795, Delta_meas = 0.6848 +- 0.0111, CV^2=0.8804
//   half-decade [31622777,100000000): 280193 gaps, E[g]=244.035, Delta_meas = 0.6500 +- 0.0070, CV^2=0.8902
//   quarter-decade [10000000,17782794): 38071 gaps, E[g]=204.412, Delta_meas = 0.7203 +- 0.0176
//   quarter-decade [17782794,31622777): 63065 gaps, E[g]=219.454, Delta_meas = 0.6842 +- 0.0142
//   quarter-decade [31622777,56234133): 104886 gaps, E[g]=234.648, Delta_meas = 0.6677 +- 0.0113
//   quarter-decade [56234133,100000000): 175306 gaps, E[g]=249.651, Delta_meas = 0.6565 +- 0.0089
//   the largest prime entering rho at [1e7,1e8) is <= g_max + 2 = 2870; sqrt(1e7) = 3162.3; g_max + 2 < sqrt(1e7): true
//   the wheel ladder at each decade, convention B (gaps by left opener): R, then R_cop(y) - R for origins coprime to y#, then the prime origin h - R
//   window        R          h-R    |    int   cop3   cop5   cop7  cop11  cop13  cop17  cop19  cop23  cop29  cop31
//   [1e+5,1e+6) 118.4379   4.932  |  0.500  2.000  2.754  3.307  3.694  3.998  4.244  4.456  4.514  4.620  4.781   (h=123.370, 6945 gaps)
//   [1e+6,1e+7) 164.0218   5.696  |  0.500  2.000  2.760  3.336  3.742  4.057  4.312  4.562  4.707  4.839  4.965   (h=169.718, 50811 gaps)
//   [1e+7,1e+8) 223.5196   5.680  |  0.500  2.000  2.754  3.340  3.755  4.096  4.344  4.583  4.758  4.889  5.009   (h=229.199, 381332 gaps)
//   at [1e7,1e8) the prime origin's excess h - R = 5.680 against the ladder's last rung cop31 = 5.009: the wheel to 31 reaches 88.2% of it
//   the ladder's ensemble prediction (CRT, openers equidistributed among the residue pairs (r, r+g) that are twin residues mod y#):
//   window        y    P=y#     measured   predicted   deviation   (measured minus residue-uniform; SEC 3 asks whether the ensemble shows the same)
//   [1e+5,1e+6)   5      30   2.7543     2.7571     -0.0028
//   [1e+5,1e+6)   7     210   3.3065     3.2718     +0.0347
//   [1e+5,1e+6)  11    2310   3.6941     3.6244     +0.0697
//   [1e+5,1e+6)  13   30030   3.9983     3.9359     +0.0624
//   [1e+6,1e+7)   5      30   2.7602     2.7573     +0.0028
//   [1e+6,1e+7)   7     210   3.3357     3.2985     +0.0372
//   [1e+6,1e+7)  11    2310   3.7421     3.6708     +0.0713
//   [1e+6,1e+7)  13   30030   4.0572     3.9938     +0.0634
//   [1e+7,1e+8)   5      30   2.7541     2.7548     -0.0006
//   [1e+7,1e+8)   7     210   3.3395     3.3187     +0.0208
//   [1e+7,1e+8)  11    2310   3.7545     3.7094     +0.0451
//   [1e+7,1e+8)  13   30030   4.0963     4.0350     +0.0612
//
// SEC 1 — THE TILE T_y ENUMERATED: every head quantity exact, the CRT identity, and hl3's pipeline run inside the tile
//   @11: W=2310 phi=480 twin slots=135 gaps=135 g_max=42 | E[g]=17.111 E[n]=3.556 CV^2=0.3015 R=11.1351 | lambda=0.20779 lambda_2=0.05844 lambda_s=0.09091
//        heads: uniform-integer origin 11.6351 (= R + 1/2: 11.6351) | hole origin 14.3875 = R + 3.2524 | per-hole sd 8.993
//        identity: h_hole - R = 3.2524 = A 3.8125 + B -0.5601; A = A_forced 4.2500 + D -0.4375; beta=0.7720 alpha=0.16268 beta*CV^2=0.2328
//        CRT identity for the hole density at offset t from an opener: 16/16 offsets t agree as integers
//        Delta_tile (exact, OLS) = 1.2280 | Delta_pipe (hl3 pipeline, rho_y, 5-point conditioning) = 1.2884 | ratio pipe/exact = 1.0492 | kappa/lambda=0.8759 (exact W gives kappa = 1 in count units)
//        E[n|g] exact against the pipeline 2 + kappa*W5(g), at the gap lengths carrying >= 0.1% of the gaps:
//          g     share    exact     pipe     pipe-exact   W_exact/W5
//            6   0.1556   2.0000   2.0000    +0.0000     NaN
//           12   0.4148   2.6429   2.5631    -0.0798     0.2078
//           18   0.1630   3.6364   3.7518    +0.1154     0.1700
//           24   0.0444   4.3333   4.5547    +0.2213     0.1662
//           30   0.1630   5.7273   5.7538    +0.0265     0.1807
//           36   0.0296   6.5000   6.5046    +0.0046     0.1818
//           42   0.0296   8.0000   7.9998    -0.0002     0.1820
//   @13: W=30030 phi=5760 twin slots=1485 gaps=1485 g_max=66 | E[g]=20.222 E[n]=3.879 CV^2=0.3540 R=13.6909 | lambda=0.19181 lambda_2=0.04945 lambda_s=0.09291
//        heads: uniform-integer origin 14.1909 (= R + 1/2: 14.1909) | hole origin 17.1812 = R + 3.4903 | per-hole sd 11.511
//        identity: h_hole - R = 3.4903 = A 4.2135 + B -0.7232; A = A_forced 4.6979 + D -0.4844; beta=0.7836 alpha=0.15306 beta*CV^2=0.2774
//        CRT identity for the hole density at offset t from an opener: 16/16 offsets t agree as integers
//        Delta_tile (exact, OLS) = 1.2164 | Delta_pipe (hl3 pipeline, rho_y, 5-point conditioning) = 1.2327 | ratio pipe/exact = 1.0134 | kappa/lambda=0.8711 (exact W gives kappa = 1 in count units)
//        E[n|g] exact against the pipeline 2 + kappa*W5(g), at the gap lengths carrying >= 0.1% of the gaps:
//          g     share    exact     pipe     pipe-exact   W_exact/W5
//            6   0.1273   2.0000   2.0000    +0.0000     NaN
//           12   0.3394   2.5714   2.4978    -0.0737     0.1918
//           18   0.1603   3.4454   3.5486    +0.1032     0.1559
//           24   0.0646   4.1042   4.2866    +0.1825     0.1538
//           30   0.1818   5.3926   5.4014    +0.0089     0.1666
//           36   0.0404   6.2000   6.0928    -0.1072     0.1715
//           42   0.0566   7.3333   7.3718    +0.0385     0.1659
//           48   0.0135   8.6000   8.4434    -0.1566     0.1711
//           60   0.0081   10.3333   10.3577    +0.0243     0.1666
//   @17: W=510510 phi=92160 twin slots=22275 gaps=22275 g_max=108 | E[g]=22.919 E[n]=4.137 CV^2=0.4051 R=16.1009 | lambda=0.18053 lambda_2=0.04363 lambda_s=0.09326
//        heads: uniform-integer origin 16.6009 (= R + 1/2: 16.6009) | hole origin 19.7729 = R + 3.6719 | per-hole sd 14.186
//        identity: h_hole - R = 3.6719 = A 4.5394 + B -0.8675; A = A_forced 5.0560 + D -0.5166; beta=0.7732 alpha=0.14679 beta*CV^2=0.3132
//        CRT identity for the hole density at offset t from an opener: 16/16 offsets t agree as integers
//        Delta_tile (exact, OLS) = 1.2268 | Delta_pipe (hl3 pipeline, rho_y, 5-point conditioning) = 1.2074 | ratio pipe/exact = 0.9842 | kappa/lambda=0.8708 (exact W gives kappa = 1 in count units)
//        E[n|g] exact against the pipeline 2 + kappa*W5(g), at the gap lengths carrying >= 0.1% of the gaps:
//          g     share    exact     pipe     pipe-exact   W_exact/W5
//            6   0.1103   2.0000   2.0000    +0.0000     NaN
//           12   0.2941   2.5275   2.4593    -0.0681     0.1805
//           18   0.1515   3.3349   3.4291    +0.0942     0.1469
//           24   0.0690   3.9479   4.1101    +0.1622     0.1451
//           30   0.1899   5.1102   5.1389    +0.0287     0.1558
//           36   0.0459   5.8924   5.7994    -0.0930     0.1611
//           42   0.0770   6.9918   6.9988    +0.0070     0.1570
//           48   0.0213   8.0338   7.9971    -0.0367     0.1582
//           54   0.0018   9.2000   9.0883    -0.1117     0.1597
//   @19: W=9699690 phi=1658880 twin slots=378675 gaps=378675 g_max=150 | E[g]=25.615 E[n]=4.381 CV^2=0.4489 R=18.5566 | lambda=0.17102 lambda_2=0.03904 lambda_s=0.09294
//        heads: uniform-integer origin 19.0566 (= R + 1/2: 19.0566) | hole origin 22.3829 = R + 3.8263 | per-hole sd 16.816
//        identity: h_hole - R = 3.8263 = A 4.8471 + B -1.0208; A = A_forced 5.3906 + D -0.5435; beta=0.7778 alpha=0.14066 beta*CV^2=0.3492
//        CRT identity for the hole density at offset t from an opener: 16/16 offsets t agree as integers
//        Delta_tile (exact, OLS) = 1.2222 | Delta_pipe (hl3 pipeline, rho_y, 5-point conditioning) = 1.1869 | ratio pipe/exact = 0.9711 | kappa/lambda=0.8707 (exact W gives kappa = 1 in count units)
//        E[n|g] exact against the pipeline 2 + kappa*W5(g), at the gap lengths carrying >= 0.1% of the gaps:
//          g     share    exact     pipe     pipe-exact   W_exact/W5
//            6   0.0973   2.0000   2.0000    +0.0000     NaN
//           18   0.1418   3.2497   3.3335    +0.0838     0.1395
//           30   0.1911   4.8915   4.9290    +0.0375     0.1470
//           42   0.0919   6.6879   6.6979    +0.0100     0.1486
//           54   0.0052   8.4939   8.6144    +0.1205     0.1462
//           66   0.0167   10.1655   9.8474    -0.3181     0.1549
//           78   0.0069   11.7359   11.8727    +0.1369     0.1468
//           90   0.0033   14.2023   13.8313    -0.3710     0.1536
//          108   0.0025   16.8197   16.3025    -0.5172     0.1543
//   @23: W=223092870 phi=36495360 twin slots=7952175 gaps=7952175 g_max=204 | E[g]=28.054 E[n]=4.589 CV^2=0.4814 R=20.7803 | lambda=0.16359 lambda_2=0.03565 lambda_s=0.09230
//        heads: uniform-integer origin 21.2803 (= R + 1/2: 21.2803) | hole origin 24.7407 = R + 3.9604 | per-hole sd 19.122
//        identity: h_hole - R = 3.9604 = A 5.1129 + B -1.1525; A = A_forced 5.6771 + D -0.5642; beta=0.7832 alpha=0.13567 beta*CV^2=0.3771
//        CRT identity for the hole density at offset t from an opener: 16/16 offsets t agree as integers
//        Delta_tile (exact, OLS) = 1.2168 | Delta_pipe (hl3 pipeline, rho_y, 5-point conditioning) = 1.1662 | ratio pipe/exact = 0.9584 | kappa/lambda=0.8710 (exact W gives kappa = 1 in count units)
//        E[n|g] exact against the pipeline 2 + kappa*W5(g), at the gap lengths carrying >= 0.1% of the gaps:
//          g     share    exact     pipe     pipe-exact   W_exact/W5
//            6   0.0881   2.0000   2.0000    +0.0000     NaN
//           18   0.1333   3.1878   3.2638    +0.0760     0.1339
//           30   0.1887   4.7334   4.7759    +0.0425     0.1403
//           42   0.1008   6.4299   6.4524    +0.0225     0.1418
//           54   0.0087   8.1096   8.2687    +0.1592     0.1389
//           66   0.0209   9.7855   9.4791    -0.3064     0.1483
//           78   0.0105   11.3606   11.3980    +0.0374     0.1419
//           90   0.0055   13.6382   13.2886    -0.3497     0.1469
//          108   0.0041   16.1539   15.6370    -0.5170     0.1479
//   summary across levels: Delta_tile, Delta_pipe, ratio, the hole-origin excess h_hole - R, and beta*CV^2
//     y    E[g]     Delta_tile  Delta_pipe  pipe/exact   h_hole-R   (h_hole-R)/E[g]   beta*CV^2   D
//    11    17.111   1.2280      1.2884      1.0492      3.2524     0.1901          0.2328    -0.4375
//    13    20.222   1.2164      1.2327      1.0134      3.4903     0.1726          0.2774    -0.4844
//    17    22.919   1.2268      1.2074      0.9842      3.6719     0.1602          0.3132    -0.5166
//    19    25.615   1.2222      1.1869      0.9711      3.8263     0.1494          0.3492    -0.5435
//    23    28.054   1.2168      1.1662      0.9584      3.9604     0.1412          0.3771    -0.5642
//
// SEC 2 — THE ANCHORED ZONE (y, y'^2): the number-line head at every prime origin there against the tile's hole-origin ensemble
//     y   zone         origins  anch.mean  ens.mean  ens.sd   z(naive)  | sqrt-matched (y^2,y'^2): origins  anch.mean   z   | head_line = head_tile at
//    11   (11, 169)      34     14.353    14.387   8.993   -0.02     |                             9      16.222   +0.61  | 30/34 origins
//    13   (13, 289)      55     14.655    17.181   11.511   -1.63     |                            22      14.636   -1.04  | 55/55 origins
//    17   (17, 361)      65     18.615    19.773   14.186   -0.66     |                            11      37.818   +4.22  | 62/65 origins
//    19   (19, 529)      91     22.132    22.383   16.816   -0.14     |                            27      30.148   +2.40  | 91/91 origins
//    23   (23, 841)     137     29.985    24.741   19.122   +3.21     |                            47      44.681   +7.15  | 135/137 origins
//   z(naive) treats the zone's origins as independent draws from the ensemble of holes; they are one contiguous stretch, so z is a scale and not a test.
// SEC 3 — THE ROTATION ENSEMBLE AT y = sqrt(p), SAMPLED EXACTLY BY CRT: the ensemble value of every head statistic at the number line's own level
//   seed 20260830, window L = 4194304, 400 windows per decade level and 300 per matched level, levels y = 313, 997, 3137, 9973 (largest prime with y^2 <= 1e5, 1e6, 1e7, 1e8; each decade [lo,hi) is a window of T_y at phase 0 since hi <= y'^2, asserted)
//   plus y = 19997, chosen so that the ensemble's E[g] lands near the number line's 236 at [1e7,1e8): a gap-scale-matched comparator
//   @313 (decade tile): 20642396 gaps | E[g]/ln^2 y = 2.461 | hole density 0.09652 (exact 0.09652) twin density 0.01230 (exact 0.01231) | E[g]=81.273 E[n]=7.844 CV^2=0.7402 R=70.715 g_max=1056
//        beta=1.0552+-0.0005 alpha=0.08353 lambda_s=0.07191 beta*CV^2=0.7811 | Delta_ens=0.9448 Delta_pipe=0.8986 ratio pipe/ens=0.9511 kappa/lambda=0.8812
//        h_hole - R = 5.3161 = A 9.3623 + B -4.0462; A_forced 10.1058, D -0.7435; integer origin - R = 0.5000 (1/2 exactly); per-hole sd 68.126
//        ladder: int=0.500 cop3=2.000 cop5=2.767 cop7=3.275 cop11=3.635 cop13=3.947 cop17=4.157 cop19=4.344 cop23=4.472 cop29=4.561 cop31=4.637
//        ladder against its CRT prediction: cop5: meas 2.7674 pred 2.7674 dev -0.0001 | cop7: meas 3.2746 pred 3.2313 dev +0.0432 | cop11: meas 3.6352 pred 3.5451 dev +0.0901 | cop13: meas 3.9473 pred 3.8193 dev +0.1280
//   @997 (decade tile): 14524536 gaps | E[g]/ln^2 y = 2.423 | hole density 0.08097 (exact 0.08097) twin density 0.00866 (exact 0.00866) | E[g]=115.504 E[n]=9.352 CV^2=0.7968 R=103.769 g_max=1710
//        beta=1.1505+-0.0007 alpha=0.07101 lambda_s=0.06365 beta*CV^2=0.9167 | Delta_ens=0.8495 Delta_pipe=0.8149 ratio pipe/ens=0.9594 kappa/lambda=0.8885
//        h_hole - R = 5.6935 = A 11.3547 + B -5.6613; A_forced 12.1369, D -0.7822; integer origin - R = 0.5000 (1/2 exactly); per-hole sd 101.202
//        ladder: int=0.500 cop3=2.000 cop5=2.762 cop7=3.304 cop11=3.689 cop13=4.016 cop17=4.241 cop19=4.449 cop23=4.587 cop29=4.689 cop31=4.778
//        ladder against its CRT prediction: cop5: meas 2.7624 pred 2.7624 dev +0.0000 | cop7: meas 3.3041 pred 3.2655 dev +0.0386 | cop11: meas 3.6892 pred 3.6072 dev +0.0820 | cop13: meas 4.0156 pred 3.9147 dev +0.1008
//   @3137 (decade tile): 10731523 gaps | E[g]/ln^2 y = 2.412 | hole density 0.06960 (exact 0.06960) twin density 0.00640 (exact 0.00640) | E[g]=156.325 E[n]=10.880 CV^2=0.8379 R=143.658 g_max=2172
//        beta=1.2255+-0.0009 alpha=0.06176 lambda_s=0.05681 beta*CV^2=1.0269 | Delta_ens=0.7745 Delta_pipe=0.7446 ratio pipe/ens=0.9615 kappa/lambda=0.8959
//        h_hole - R = 5.9811 = A 13.3584 + B -7.3772; A_forced 14.1840, D -0.8257; integer origin - R = 0.5000 (1/2 exactly); per-hole sd 141.139
//        ladder: int=0.500 cop3=2.000 cop5=2.759 cop7=3.323 cop11=3.727 cop13=4.061 cop17=4.300 cop19=4.524 cop23=4.676 cop29=4.788 cop31=4.890
//        ladder against its CRT prediction: cop5: meas 2.7588 pred 2.7589 dev -0.0000 | cop7: meas 3.3229 pred 3.2917 dev +0.0312 | cop11: meas 3.7274 pred 3.6547 dev +0.0727 | cop13: meas 4.0611 pred 3.9754 dev +0.0858
//   @9973 (decade tile): 8212843 gaps | E[g]/ln^2 y = 2.409 | hole density 0.06088 (exact 0.06088) twin density 0.00490 (exact 0.00489) | E[g]=204.261 E[n]=12.436 CV^2=0.8677 R=190.754 g_max=3228
//        beta=1.2886+-0.0012 alpha=0.05458 lambda_s=0.05109 beta*CV^2=1.1182 | Delta_ens=0.7114 Delta_pipe=0.6850 ratio pipe/ens=0.9630 kappa/lambda=0.9030
//        h_hole - R = 6.2380 = A 15.4210 + B -9.1830; A_forced 16.2636, D -0.8426; integer origin - R = 0.5000 (1/2 exactly); per-hole sd 188.175
//        ladder: int=0.500 cop3=2.000 cop5=2.756 cop7=3.336 cop11=3.752 cop13=4.088 cop17=4.336 cop19=4.568 cop23=4.728 cop29=4.850 cop31=4.961
//        ladder against its CRT prediction: cop5: meas 2.7565 pred 2.7567 dev -0.0002 | cop7: meas 3.3360 pred 3.3104 dev +0.0256 | cop11: meas 3.7522 pred 3.6918 dev +0.0604 | cop13: meas 4.0879 pred 4.0170 dev +0.0709
//   @19997 (gap-scale matched to [1e7,1e8)): 5333614 gaps | E[g]/ln^2 y = 2.405 | hole density 0.05666 (exact 0.05666) twin density 0.00424 (exact 0.00424) | E[g]=235.892 E[n]=13.365 CV^2=0.8823 R=222.012 g_max=3150
//        beta=1.3186+-0.0016 alpha=0.05107 lambda_s=0.04818 beta*CV^2=1.1634 | Delta_ens=0.6814 Delta_pipe=0.6544 ratio pipe/ens=0.9605 kappa/lambda=0.9069
//        h_hole - R = 6.3679 = A 16.6353 + B -10.2675; A_forced 17.5005, D -0.8651; integer origin - R = 0.5000 (1/2 exactly); per-hole sd 219.481
//        ladder: int=0.500 cop3=2.000 cop5=2.756 cop7=3.342 cop11=3.764 cop13=4.104 cop17=4.359 cop19=4.591 cop23=4.757 cop29=4.888 cop31=5.001
//        ladder against its CRT prediction: cop5: meas 2.7560 pred 2.7557 dev +0.0003 | cop7: meas 3.3418 pred 3.3193 dev +0.0225 | cop11: meas 3.7642 pred 3.7105 dev +0.0537 | cop13: meas 4.1044 pred 4.0374 dev +0.0670
//   half-decade windows of the number line (convention A) against gap-scale-matched ensembles:
//   window                    gaps    E[g]_line  Delta_meas+-se     Delta_HL  | y_match  E[g]_ens   Delta_ens+-se     Delta_pipe  pipe/ens | Delta_meas/Delta_ens  (HL-ens)/Dm  (ens-meas)/Dm
//   @941 (matched to [100000,316228)): 11073779 gaps | E[g]/ln^2 y = 2.424 | hole density 0.08164 (exact 0.08163) twin density 0.00880 (exact 0.00880) | E[g]=113.622 E[n]=9.276 CV^2=0.7951 R=101.984 g_max=1440
//        beta=1.1463+-0.0008 alpha=0.07155 lambda_s=0.06403 beta*CV^2=0.9115 | Delta_ens=0.8537 Delta_pipe=0.8187 ratio pipe/ens=0.9591 kappa/lambda=0.8882
//        h_hole - R = 5.6676 = A 11.2504 + B -5.5828; A_forced 12.0338, D -0.7834; integer origin - R = 0.5000 (1/2 exactly); per-hole sd 99.393
//        ladder: int=0.500 cop3=2.000 cop5=2.763 cop7=3.304 cop11=3.688 cop13=4.013 cop17=4.238 cop19=4.443 cop23=4.582 cop29=4.682 cop31=4.771
//        ladder against its CRT prediction: cop5: meas 2.7626 pred 2.7626 dev -0.0001 | cop7: meas 3.3041 pred 3.2637 dev +0.0405 | cop11: meas 3.6882 pred 3.6039 dev +0.0844 | cop13: meas 4.0135 pred 3.9101 dev +0.1034
//   [100000,316228)    1908    113.145   0.8239+-0.0625   0.8298   |    941    113.622   0.8537+-0.0008   0.8187     0.9591 |      0.9651           -0.029      +0.036
//   @1811 (matched to [316228,1000000)): 9235578 gaps | E[g]/ln^2 y = 2.421 | hole density 0.07456 (exact 0.07456) twin density 0.00734 (exact 0.00734) | E[g]=136.236 E[n]=10.158 CV^2=0.8202 R=123.986 g_max=1902
//        beta=1.1900+-0.0010 alpha=0.06583 lambda_s=0.05988 beta*CV^2=0.9760 | Delta_ens=0.8100 Delta_pipe=0.7764 ratio pipe/ens=0.9585 kappa/lambda=0.8925
//        h_hole - R = 5.8661 = A 12.4108 + B -6.5448; A_forced 13.2147, D -0.8039; integer origin - R = 0.5000 (1/2 exactly); per-hole sd 121.524
//        ladder: int=0.500 cop3=2.000 cop5=2.760 cop7=3.315 cop11=3.710 cop13=4.040 cop17=4.274 cop19=4.490 cop23=4.634 cop29=4.743 cop31=4.836
//        ladder against its CRT prediction: cop5: meas 2.7601 pred 2.7603 dev -0.0002 | cop7: meas 3.3154 pred 3.2800 dev +0.0354 | cop11: meas 3.7102 pred 3.6335 dev +0.0767 | cop13: meas 4.0403 pred 3.9497 dev +0.0906
//   [316228,1000000)    5035    135.793   0.7114+-0.0419   0.7786   |   1811    136.236   0.8100+-0.0010   0.7764     0.9585 |      0.8783           -0.044      +0.139
//   @3229 (matched to [1000000,3162278)): 7991102 gaps | E[g]/ln^2 y = 2.412 | hole density 0.06936 (exact 0.06936) twin density 0.00635 (exact 0.00635) | E[g]=157.451 E[n]=10.921 CV^2=0.8383 R=144.723 g_max=1938
//        beta=1.2258+-0.0011 alpha=0.06158 lambda_s=0.05666 beta*CV^2=1.0277 | Delta_ens=0.7742 Delta_pipe=0.7430 ratio pipe/ens=0.9598 kappa/lambda=0.8961
//        h_hole - R = 6.0201 = A 13.4280 + B -7.4079; A_forced 14.2341, D -0.8061; integer origin - R = 0.5000 (1/2 exactly); per-hole sd 142.166
//        ladder: int=0.500 cop3=2.000 cop5=2.759 cop7=3.325 cop11=3.730 cop13=4.062 cop17=4.300 cop19=4.522 cop23=4.673 cop29=4.786 cop31=4.889
//        ladder against its CRT prediction: cop5: meas 2.7587 pred 2.7588 dev -0.0002 | cop7: meas 3.3246 pred 3.2922 dev +0.0324 | cop11: meas 3.7296 pred 3.6556 dev +0.0741 | cop13: meas 4.0624 pred 3.9763 dev +0.0860
//   [1000000,3162278)   13730    157.415   0.7705+-0.0268   0.7385   |   3229    157.451   0.7742+-0.0011   0.7430     0.9598 |      0.9953           -0.046      +0.005
//   @6287 (matched to [3162278,10000000)): 6826701 gaps | E[g]/ln^2 y = 2.409 | hole density 0.06410 (exact 0.06410) twin density 0.00543 (exact 0.00542) | E[g]=184.303 E[n]=11.814 CV^2=0.8563 R=171.064 g_max=2652
//        beta=1.2636+-0.0013 alpha=0.05724 lambda_s=0.05325 beta*CV^2=1.0820 | Delta_ens=0.7364 Delta_pipe=0.7075 ratio pipe/ens=0.9607 kappa/lambda=0.9002
//        h_hole - R = 6.1799 = A 14.6203 + B -8.4403; A_forced 15.4314, D -0.8112; integer origin - R = 0.5000 (1/2 exactly); per-hole sd 168.407
//        ladder: int=0.500 cop3=2.000 cop5=2.758 cop7=3.333 cop11=3.746 cop13=4.083 cop17=4.326 cop19=4.553 cop23=4.711 cop29=4.832 cop31=4.942
//        ladder against its CRT prediction: cop5: meas 2.7578 pred 2.7573 dev +0.0005 | cop7: meas 3.3329 pred 3.3035 dev +0.0294 | cop11: meas 3.7456 pred 3.6779 dev +0.0678 | cop13: meas 4.0827 pred 4.0018 dev +0.0808
//   [3162278,10000000)   37079    184.408   0.7172+-0.0174   0.7039   |   6287    184.303   0.7364+-0.0013   0.7075     0.9607 |      0.9740           -0.045      +0.027
//   @12301 (matched to [10000000,31622777)): 5895852 gaps | E[g]/ln^2 y = 2.406 | hole density 0.05957 (exact 0.05957) twin density 0.00469 (exact 0.00469) | E[g]=213.400 E[n]=12.713 CV^2=0.8727 R=199.820 g_max=3060
//        beta=1.2988+-0.0014 alpha=0.05349 lambda_s=0.05020 beta*CV^2=1.1335 | Delta_ens=0.7012 Delta_pipe=0.6757 ratio pipe/ens=0.9636 kappa/lambda=0.9042
//        h_hole - R = 6.2685 = A 15.7817 + B -9.5132; A_forced 16.6289, D -0.8472; integer origin - R = 0.5000 (1/2 exactly); per-hole sd 197.321
//        ladder: int=0.500 cop3=2.000 cop5=2.757 cop7=3.338 cop11=3.757 cop13=4.095 cop17=4.344 cop19=4.576 cop23=4.738 cop29=4.861 cop31=4.974
//        ladder against its CRT prediction: cop5: meas 2.7572 pred 2.7566 dev +0.0005 | cop7: meas 3.3380 pred 3.3131 dev +0.0249 | cop11: meas 3.7569 pred 3.6975 dev +0.0595 | cop13: meas 4.0947 pred 4.0231 dev +0.0715
//   [10000000,31622777)  101137    213.795   0.6848+-0.0111   0.6768   |  12301    213.400   0.7012+-0.0014   0.6757     0.9636 |      0.9766           -0.036      +0.024
//   @19997 (matched to [31622777,100000000)): 5333614 gaps | E[g]/ln^2 y = 2.405 | hole density 0.05666 (exact 0.05666) twin density 0.00424 (exact 0.00424) | E[g]=235.892 E[n]=13.365 CV^2=0.8823 R=222.012 g_max=3150
//        beta=1.3186+-0.0016 alpha=0.05107 lambda_s=0.04818 beta*CV^2=1.1634 | Delta_ens=0.6814 Delta_pipe=0.6544 ratio pipe/ens=0.9605 kappa/lambda=0.9069
//        h_hole - R = 6.3679 = A 16.6353 + B -10.2675; A_forced 17.5005, D -0.8651; integer origin - R = 0.5000 (1/2 exactly); per-hole sd 219.481
//        ladder: int=0.500 cop3=2.000 cop5=2.756 cop7=3.342 cop11=3.764 cop13=4.104 cop17=4.359 cop19=4.591 cop23=4.757 cop29=4.888 cop31=5.001
//        ladder against its CRT prediction: cop5: meas 2.7560 pred 2.7557 dev +0.0003 | cop7: meas 3.3418 pred 3.3193 dev +0.0225 | cop11: meas 3.7642 pred 3.7105 dev +0.0537 | cop13: meas 4.1044 pred 4.0374 dev +0.0670
//   [31622777,100000000)  280193    244.035   0.6500+-0.0070   0.6472   |  19997    235.892   0.6814+-0.0016   0.6544     0.9605 |      0.9539           -0.053      +0.048
//   pooling: the decade's Delta_meas against the gap-weighted mean of its two half-decades
//   [1e+5,1e+6): pooled 0.6899 | halves 0.8239, 0.7114 | gap-weighted mean of halves 0.7423 | pooled minus mean -0.0524
//   [1e+6,1e+7): pooled 0.6862 | halves 0.7705, 0.7172 | gap-weighted mean of halves 0.7316 | pooled minus mean -0.0455
//   [1e+7,1e+8): pooled 0.6214 | halves 0.6848, 0.6500 | gap-weighted mean of halves 0.6592 | pooled minus mean -0.0378
//   THE SPLIT. Per decade: the number line's Delta_meas and Delta_HL; the ensemble's Delta_ens and Delta_pipe at y = sqrt(lo) and sqrt(hi);
//   c = Delta_ens/Delta_pipe is the pipeline's own approximation measured in the ensemble (the no-interior-opener conditioning treated as uniform thinning);
//   ensemble-corrected HL = Delta_HL * c; the anchoring part is what is left: Delta_HL*c - Delta_meas, in units of Delta_meas
//   window        Delta_meas  Delta_HL  eps/Dm  |  y     Delta_ens  Delta_pipe    c     | HL*c     pipeline part  anchoring part
//   [1e+5,1e+6)   0.6899     0.7914   0.147  |   313   0.9448     0.8986    1.0514  | 0.8320     -0.059          +0.206
//   [1e+5,1e+6)   0.6899     0.7914   0.147  |   997   0.8495     0.8149    1.0424  | 0.8249     -0.049          +0.196
//   [1e+6,1e+7)   0.6862     0.7124   0.038  |   997   0.8495     0.8149    1.0424  | 0.7426     -0.044          +0.082
//   [1e+6,1e+7)   0.6862     0.7124   0.038  |  3137   0.7745     0.7446    1.0401  | 0.7410     -0.042          +0.080
//   [1e+7,1e+8)   0.6214     0.6545   0.053  |  3137   0.7745     0.7446    1.0401  | 0.6807     -0.042          +0.095
//   [1e+7,1e+8)   0.6214     0.6545   0.053  |  9973   0.7114     0.6850    1.0384  | 0.6796     -0.040          +0.094
//   the same statistics side by side, number line (anchored) against the ensemble of the tile the decade is a window of (y = sqrt(hi)):
//   window         E[g]_line E[g]_ens | beta_line  beta_ens | CV2_line  CV2_ens | bCV2_line bCV2_ens | D_ens   | (h-R)/E[g] line   ens | Delta_meas/Delta_ens
//   [1e+5,1e+6)    129.581   115.504 | 1.3101     1.1505 | 0.8281   0.7968 | 1.0849    0.9167 | -0.7822 |   0.0381          0.0493 |   0.8121
//   [1e+6,1e+7)    177.129   156.325 | 1.3138     1.2255 | 0.8520   0.8379 | 1.1194    1.0269 | -0.8257 |   0.0322          0.0383 |   0.8860
//   [1e+7,1e+8)    236.014   204.261 | 1.3786     1.2886 | 0.8941   0.8677 | 1.2326    1.1182 | -0.8426 |   0.0241          0.0305 |   0.8736
//   gap-scale-matched: [1e7,1e8) against the ensemble at y = 19997 (E[g]_ens = 235.892 against the number line's 236.014, hole density 0.05666 against 1/ln(5e7) = 0.05641)
//     Delta_meas 0.6214 against Delta_ens 0.6814+-0.0016: ratio 0.9120 | beta 1.3786 vs 1.3186 | CV^2 0.8941 vs 0.8823 | beta*CV^2 1.2326 vs 1.1634 | (h-R)/E[g] 0.0241 vs 0.0270 | pipe/ens 0.9605
//
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================================
//
// 1. CUSTODY FIRST. Twelve record figures reproduce on this file's own walk:
//    Delta_meas 0.6899 / 0.6862 / 0.6214, Delta_HL 0.7914 / 0.7124 / 0.6545,
//    beta 1.379, CV^2 0.8941, R 223.5196, h - R 5.680, the coprime-30 offset
//    2.7541 and the coprime-210 offset 3.3395. Nothing below rests on a number
//    that was not first reproduced.
//
// 2. THE 5.3 PERCENT IS THE WINDOW, NOT THE PRIMES. The decade-pooled Delta at
//    [1e7,1e8) is 0.6214; its two half-decades read 0.6848 and 0.6500 and its
//    four quarter-decades 0.7203, 0.6842, 0.6677, 0.6565. Pooled minus the
//    gap-weighted mean of the halves is -0.0378, -0.0455, -0.0524 at the three
//    decades. The prime density falls ten percent across a decade, E[n] grows
//    like sqrt(E[g]) between heights while n grows like g within one, and the
//    pooled OLS intercept absorbs the difference (Simpson). HL's pipeline
//    pools linearly (0.6545 against 0.6768 and 0.6472 weighted by gap count),
//    so the record compared a biased measurement to an unbiased prediction.
//    At half-decade resolution (HL - meas)/meas reads +0.007, +0.094, -0.042,
//    -0.019, -0.012, -0.004: inside 1.6 s.e. everywhere, sign alternating.
//
// 3. HL'S RHO IS THE TILE'S CRT DENSITY, EXACTLY. g_max + 2 = 2870 < 3162.3
//    at [1e7,1e8), so every prime in the singular-series product is below
//    sqrt(p) and rho(t,g) is the hole density of T_y at offset t for every
//    y >= sqrt(p); asserted as integers at 16 offsets at each of five levels
//    (80/80). Each decade is a phase-zero window of T_313, T_997, T_3137,
//    T_9973 (hi <= y'^2 asserted). "HL prices Delta" is therefore "the
//    five-point pipeline run on the anchored member's gap law lands near the
//    anchored member's Delta", an ensemble statement plus an anchoring one.
//
// 4. THE PIPELINE UNDER-PREDICTS ITS OWN ENSEMBLE BY FOUR PERCENT. Inside the
//    enumerated tile, pipe/exact = 1.0492, 1.0134, 0.9842, 0.9711, 0.9584 at
//    y = 11, 13, 17, 19, 23; sampled by CRT, 0.9511, 0.9594, 0.9615, 0.9630 at
//    y = 313, 997, 3137, 9973 and 0.9591 to 0.9636 at the six matched levels.
//    Replacing W(g) by the exact E[n|g] - 2 returns the OLS Delta to 1e-9, so
//    the whole error is the uniform-thinning treatment of the no-interior-
//    opener condition. hl3 section 2 guessed that condition lowers the
//    deficit; the exact tile says it raises it. This part of the remainder is
//    a finite count at every level and needs no prime input.
//
// 5. THE ANCHORING PART. Against gap-scale-matched ensembles (E[g]_ens within
//    0.5 percent of E[g]_line, hole density 0.05666 against 1/ln(5e7) =
//    0.05641 at the top), Delta_meas/Delta_ens = 0.9651, 0.8783, 0.9953,
//    0.9740, 0.9766, 0.9539 over the six half-decades: the anchored window's
//    endpoint deficit sits two to five percent below its ensemble's at the
//    best-measured windows, and the half-decade values are themselves about
//    0.01 low from residual pooling. Against the tile the decade is a window
//    of (y = sqrt(hi)) the ratio is 0.8121, 0.8860, 0.8736, the difference
//    being the Mertens factor in the gap scale (E[g] 236.0 against 204.3).
//    The pipeline part and the anchoring part are of opposite sign and near
//    equal size, which is why HL lands within one percent.
//
// 6. THE WHEEL LADDER IS AN ENSEMBLE EFFECT. The number line's cop7 / cop11 /
//    cop13 rungs exceed the residue-uniform CRT prediction by +0.0208,
//    +0.0451, +0.0612 at [1e7,1e8); the ensemble of T_9973 shows +0.0256,
//    +0.0604, +0.0709 and T_19997 +0.0226, +0.0540, +0.0680 on the same
//    rungs. The openers' residue pairs are not uniform given g because the
//    no-interior-opener condition selects configurations, inside the tile.
//    The prime origin's 5.680 is reached to 88.2 percent by the wheel to 31.
//
// 7. THE SMALL-LEVEL ZONES CANNOT SEE ANY OF THIS. Anchored zone (y, y'^2)
//    head means against ensemble hole-origin means at y = 11..23: naive z of
//    -0.02, -1.63, -0.66, -0.14, +3.21, one contiguous stretch each; the
//    y = 23 value is one 148-long twin gap. Head_line = head_tile at 30/34,
//    55/55, 62/65, 91/91, 135/137 origins.
//
// 8. WHAT DOES NOT DERIVE. Delta_anchored / Delta_ens at matched scale: a
//    three-point prime correlation asymptotic in a window of length ln^2 p
//    about each opener. Only HL supplies it. Not TPC-implying (conditional on
//    the gap process), off the exponent's critical path, and the head is a
//    slack field. Level 29 was not enumerated (about fifteen minutes; the
//    --level29 flag has no embedded output).
