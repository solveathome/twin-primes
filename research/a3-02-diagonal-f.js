'use strict';
// *** CORRECTION 2026-08-17. The L scanner copied from research/Lgrowth.js on
// 2026-08-16 was the version that was REFUTED later the same day, and this file
// did not absorb the fix. It compared each incoming residue against the FIRST
// member of the live 2-set instead of against the immediately preceding slot,
// so a residue word (r, r+2, r−2) scored as a run of 3. The scanner below is
// now the corrected one, checked against research/Lgrowth.js and
// research/killrun.js state by state.
// WHAT THE OLD SCANNER GOT WRONG, exactly one cell: L(T23, 29) = 3 where the
// truth is 2. Confirmed independently three ways in
// research/a3-08-adjacent-pairs.js and again in research/a3-10-lower-tightness.js
// (exhaustive count of killable consecutive triples = 0). Every other cell this
// file prints, on the diagonal and on a p = 29..127 sweep of T23, is unchanged.
// The pasted OUTPUT below is the RE-RUN with the corrected scanner; the readings
// name the retired 3 wherever it changed a conclusion. ***
//
// HOW THE TAIL IS PRODUCED, 2026-08-19 (custody migration wave 3). Until today
// the OUTPUT block was two invocations pasted together — the fast leg with the
// deep leg's five results handed to it on the command line, 35 s, and the
// detached deep leg, 179 s, with its 31 progress lines elided — and its header
// carried this note, kept here verbatim because an embed header states only the
// run it made: "OUTPUT (RE-RUN 2026-08-17 with the corrected L scanner). The
// 2026-08-16 run is reproduced line for line except at L(T23, 29), which read 3
// and is 2, and at the four quantities derived from it: L/lnD and L/ln^2 x at
// T23, the two L regressions, and PHASE F's maxsum_{L+1} and G2+L*mbar columns
// at fold 29."
// MODE `all` runs both legs in one process, so the tail is now ONE invocation:
//   node --max-old-space-size=8000 research/a3-02-diagonal-f.js all \
//        0.018444887490538957 32.21051668952904 6226553025 348 4
// The five trailing arguments are the deep leg's own results at FULL precision,
// fed to PHASE C' exactly as the 2026-08-17 run fed them (f = 114848070 /
// 6226553025, mbar = 200560490130 / 6226553025; the block prints them rounded
// to 1.844e-2 and 32.21, and passing the ROUNDED forms instead moves PHASE E's
// two ln(1/f) intercepts by 0.001, to 1.357 and 1.601 — checked, 2026-08-19).
// PHASE D then recomputes all five from scratch in the same run, so the tail
// carries its own check of the numbers it was given.
// ============================================================================
// A3-02 — EXTEND THE DIAGONAL f: does the qualifying-gap fraction decay?
// (2026-08-16, attack A2 of research/ATTACKS3.md; house style of
//  grain-census.js. Target: U-FRAME §5a step 7, the dichotomy.)
// ============================================================================
// OBJECT. f(x, p) = fraction of gaps in the twin-slot gap word of tile T_x
// that are ≡ 0, +2 or −2 (mod p). It is the exact criterion for a pair of
// ADJACENT slots to be killable by the same copy of the fold by p (U-FRAME
// §5a step 6, PROVEN in one line from the strike classes {0, −2}), so the
// longest adjacent-kill run obeys, on an independence model,
//     L ≈ ln D / ln(1/f).
//
// THE DICHOTOMY (U-FRAME §5a step 7). ln D ≈ x along the fold ladder, so
//   f roughly constant  ⇒ L linear in x ⇒ Σ L·m̄ ≫ x²  ⇒ THE ROUTE FAILS.
//   f decaying          ⇒ L polylog     ⇒ Σ L·m̄ ≪ x²  ⇒ THE ROUTE CLOSES.
// The claim under test is that f is a TAIL PROBABILITY AT A RECEDING
// THRESHOLD: grain gaps are multiples of 6, so the smallest qualifying gap
// is ≈ 2p, which grows linearly in x, while the mean gap m̄ = W/D grows only
// like ln²x. If the gap word's tail is roughly exponential then
//     ln(1/f) ≈ 2p/m̄ (up to a constant factor),
// and testing whether ln(1/f) TRACKS 2p/m̄ is the cheapest discriminator.
// The diagonal (p = next prime after x) had five points, over which ln(1/f)
// moves only 3.11 → 3.48. Two more points, at folds 31 and 37, double the
// lever arm.
//
// THE STREAMING TRICK. T_29 has 214,708,725 slots and T_31 has 6,226,553,025;
// neither fits comfortably in memory, and neither needs to. The slots of the
// next tile IN SORTED ORDER are s + k·W for k = 0..p−1 over the sorted slots
// s of the current tile (each s < W, so the k-blocks are already in order),
// keeping only those with r % p ≠ 0 and (r+2) % p ≠ 0. Nesting the generator
// twice streams T_31 straight out of T_23. Nothing is stored but the running
// previous slot and a gap histogram; the tiles never exist.
//
// WHAT IS ACCUMULATED. A full gap histogram indexed by g/6 (grain gaps are
// always multiples of 6), from which f, m̄, G₂ and the per-value qualifying
// shares all fall out exactly. Also L, by the two-residue run scan of
// research/Lgrowth.js in its corrected form, carried through the stream.
//
// USAGE:  node a3-02-diagonal-f.js fast   custody + T29 (seconds)
//         node a3-02-diagonal-f.js deep   T31 (minutes; run detached)
// ============================================================================

const MODE = process.argv[2] || 'fast';
const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';

// ---- gap-word statistics from a histogram over d = 6·index --------------
const HB = 8192;                       // gap/6 bound; G2 stays far below
function statsFrom(h, D, W, p) {
  let qual = 0, G2 = 0, tot = 0, sum = 0;
  const parts = [];
  for (let j = 1; j < HB; j++) {
    const c = h[j]; if (!c) continue;
    const d = 6 * j; tot += c; sum += d * c; if (d > G2) G2 = d;
    const m = d % p;
    if (m === 0 || m === 2 || m === p - 2) { qual += c; parts.push([d, c]); }
  }
  return { f: qual / tot, G2, mean: sum / tot, nGaps: tot, D, W, p, parts,
           meanCheck: W / D };
}
function report(tag, st) {
  const r = 2 * st.p / st.mean;
  console.log(`  ${tag}`);
  console.log(`    D = ${st.D}   W = ${st.W}   gaps counted = ${st.nGaps}`);
  console.log(`    mean gap m̄ = ${st.mean.toFixed(4)}  (W/D = ${st.meanCheck.toFixed(4)})   G2 = ${st.G2}`);
  console.log(`    fold p = ${st.p}   threshold 2p = ${2 * st.p}   2p/m̄ = ${r.toFixed(4)}`);
  console.log(`    f = ${st.f.toExponential(3)}   ln(1/f) = ${Math.log(1 / st.f).toFixed(4)}   ratio ln(1/f)/(2p/m̄) = ${(Math.log(1 / st.f) / r).toFixed(4)}`);
  console.log(`    qualifying gaps: ${st.parts.map(([d, c]) => `${d}(${(c / st.nGaps * 100).toFixed(3)}%)`).join(' ')}`);
  return { p: st.p, mean: st.mean, ratio: r, f: st.f, ln: Math.log(1 / st.f), G2: st.G2, D: st.D };
}

// ---- maxsum_m, the largest sum of m consecutive gaps (U-FRAME §5a step 3) -
// Ring buffer, O(M) per gap. Cyclic wrap handled by replaying the first M−1
// gaps at the end.
const MM = 8;
function Msum() { return { b: new Float64Array(MM), i: 0, n: 0, best: new Float64Array(MM + 1) }; }
function Mpush(S, g) {
  S.b[S.i] = g; S.i = (S.i + 1) % MM; S.n++;
  let s = 0, j = S.i;
  for (let m = 1; m <= MM; m++) { j = (j - 1 + MM) % MM; s += S.b[j]; if (S.n >= m && s > S.best[m]) S.best[m] = s; }
}

// ---- longest adjacent-kill run (corrected logic of research/Lgrowth.js) ---
// A run of consecutive slots is killable by one copy iff their residues mod p
// occupy at most two values differing by 2. `last` is the residue of the slot
// immediately before r, and a broken run must restart against THAT and not
// against the anchor of the retired 2-set: restarting against the anchor is
// what let (r, r+2, r−2) through, and is the bug the header banner records.
const okPair = (a, b, p) => { if (a === b) return true; const d = Math.abs(a - b); return d === 2 || d === p - 2; };
function Lstate(p) { return { best: 0, cur: 0, s1: -1, s2: -1, last: -1, p }; }
function Lpush(S, r) {
  const p = S.p;
  let ext = false;
  if (S.cur > 0) {
    if (r === S.s1 || r === S.s2) ext = true;
    else if (S.s2 === -1 && okPair(S.s1, r, p)) { S.s2 = r; ext = true; }
  }
  if (ext) S.cur++;
  else {
    S.cur = (S.last >= 0 && okPair(S.last, r, p)) ? 2 : 1;
    if (S.cur === 2) { S.s1 = S.last; S.s2 = r; } else { S.s1 = r; S.s2 = -1; }
  }
  S.last = r;
  if (S.cur > S.best) S.best = S.cur;
}

// ==========================================================================
// PHASE A — CUSTODY. Build T7..T23 in memory and reproduce the five
// published diagonal f values (U-FRAME §5a step 7 table).
// ==========================================================================
let W = 30, slots = Float64Array.from([11, 17, 29]);
const tiles = [];
for (const p of [7, 11, 13, 17, 19, 23]) {
  const D = slots.length, keep = new Float64Array(D * (p - 2)); let n = 0;
  for (let k = 0; k < p; k++) for (let i = 0; i < D; i++) {
    const r = slots[i] + k * W;
    if (r % p !== 0 && (r + 2) % p !== 0) keep[n++] = r;
  }
  W *= p; slots = keep.subarray(0, n); tiles.push({ x: p, W, S: slots });
}
const T = {}; for (const t of tiles) T[t.x] = t;

function histOf(t) {
  const h = new Float64Array(HB), S = t.S, n = S.length, ms = Msum();
  for (let i = 0; i < n; i++) {
    const g = (i + 1 < n ? S[i + 1] : S[0] + t.W) - S[i];
    h[g / 6]++; Mpush(ms, g);
  }
  for (let i = 0; i < MM - 1 && i < n; i++) Mpush(ms, (i + 1 < n ? S[i + 1] : S[0] + t.W) - S[i]);
  t.ms = ms;
  return h;
}
function LinMem(t, p) {
  const S = t.S, st = Lstate(p);
  for (let i = 0; i < S.length; i++) Lpush(st, S[i] % p);
  return st.best;
}

console.log('== A3-02  EXTEND THE DIAGONAL f ==  mode=' + MODE + '\n');
const rows = [];
if (MODE !== 'deep') {
  console.log('PHASE A — CUSTODY: rebuild the five published diagonal points.\n');
  for (const [x, p] of [[11, 13], [13, 17], [17, 19], [19, 23], [23, 29]]) {
    const st = statsFrom(histOf(T[x]), T[x].S.length, T[x].W, p);
    rows.push(Object.assign(report(`T${x} folded by ${p}:`, st), { x, L: LinMem(T[x], p), ms: T[x].ms.best }));
    console.log(`    L(T${x}, ${p}) = ${rows[rows.length - 1].L}    [${el()}]\n`);
  }

  // ==========================================================================
  // PHASE B — CUSTODY OF THE STREAM. Regenerate T23 from T19 by the streaming
  // trick and check every statistic against the in-memory tile above.
  // ==========================================================================
  console.log('PHASE B — CUSTODY OF THE STREAM: T23 restreamed from T19.\n');
  {
    const src = T[19], p = 23, h = new Float64Array(HB), Ls = Lstate(29);
    let prev = -1, first = -1, D = 0;
    for (let k = 0; k < p; k++) {
      const B = k * src.W;
      for (let i = 0; i < src.S.length; i++) {
        const r = src.S[i] + B;
        if (r % p === 0 || (r + 2) % p === 0) continue;
        if (prev < 0) first = r; else h[(r - prev) / 6]++;
        prev = r; D++; Lpush(Ls, r % 29);
      }
    }
    const Wn = src.W * p; h[(first + Wn - prev) / 6]++;
    const st = statsFrom(h, D, Wn, 29);
    report('T23 (streamed) folded by 29:', st);
    const ref = rows[4];
    console.log(`    L(T23, 29) = ${Ls.best}`);
    console.log(`    CUSTODY: D ${D === T[23].S.length ? 'MATCH' : 'MISMATCH'}, W ${Wn === T[23].W ? 'MATCH' : 'MISMATCH'}, f ${st.f === ref.f ? 'MATCH (bit-identical)' : 'MISMATCH ' + st.f + ' vs ' + ref.f}, G2 ${st.G2 === ref.G2 ? 'MATCH' : 'MISMATCH'}, L ${Ls.best === rows[4].L ? 'MATCH' : 'MISMATCH'}    [${el()}]\n`);
  }

  // ==========================================================================
  // PHASE C — T29 STREAMED FROM T23, folded by 31. New diagonal point.
  // ==========================================================================
  console.log('PHASE C — NEW POINT: T29 streamed from T23 (214.7M slots), fold 31.\n');
  {
    const src = T[23], p = 29, fold = 31, h = new Float64Array(HB), Ls = Lstate(fold), ms = Msum();
    let prev = -1, first = -1, D = 0, head = [];
    for (let k = 0; k < p; k++) {
      const B = k * src.W;
      for (let i = 0; i < src.S.length; i++) {
        const r = src.S[i] + B;
        if (r % p === 0 || (r + 2) % p === 0) continue;
        if (prev < 0) first = r; else { const g = r - prev; h[g / 6]++; if (head.length < MM) head.push(g); Mpush(ms, g); }
        prev = r; D++; Lpush(Ls, r % fold);
      }
      if (k % 4 === 3 || k === p - 1) console.log(`    ... copy ${k + 1}/${p}, slots so far ${D}   [${el()}]`);
    }
    const Wn = src.W * p, gw = first + Wn - prev; h[gw / 6]++;
    Mpush(ms, gw); for (const g of head) Mpush(ms, g);   // close the cycle
    const st = statsFrom(h, D, Wn, fold);
    rows.push(Object.assign(report('T29 folded by 31:', st), { x: 29, L: Ls.best, ms: ms.best }));
    console.log(`    L(T29, 31) = ${Ls.best}    [${el()}]\n`);
  }
  // optional 7th point, supplied from the detached deep run:
  //   node a3-02-diagonal-f.js fast <f> <mean> <D> <G2> <L>
  if (process.argv.length >= 8) {
    const a = process.argv;
    rows.push({ x: 31, p: 37, mean: +a[4], f: +a[3], ln: Math.log(1 / +a[3]),
                ratio: 74 / +a[4], D: +a[5], G2: +a[6], L: +a[7] });
    console.log(`PHASE C' — 7th point supplied from the deep run: T31 folded by 37.\n`);
  }
  table(rows);
  phaseE(rows);
}

// ==========================================================================
// PHASE E — WHICH BRANCH? Decompose f under the density model and regress.
// If the grain's bulk were exponential with mean m̄ and support on multiples
// of 6, then P(gap = d) = (6/m̄)·exp(−d/m̄), so with d_min(p) the smallest
// multiple of 6 that is ≡ 0, ±2 (mod p) (the bin that carries nearly all of
// f), the prediction is  ln(1/f) ≈ d_min/m̄ + ln(m̄/6) − ln w,  w the
// Hardy–Littlewood comb weight of that bin. The dichotomy test is whether
// ln(1/f) has slope ≈ 1 against the receding threshold, or slope ≈ 0.
// ==========================================================================
function dmin(p) {                     // smallest multiple of 6 that qualifies
  for (let d = 6; ; d += 6) { const m = d % p; if (m === 0 || m === 2 || m === p - 2) return d; }
}
function fit(xs, ys) {
  const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
  let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; syy += (ys[i] - my) ** 2; }
  const b = sxy / sxx;
  return { slope: b, intercept: my - b * mx, r2: sxy * sxy / (sxx * syy) };
}
function phaseE(rs) {
  console.log('PHASE E — DECOMPOSITION AND REGRESSION.\n');
  console.log('  | tile | p | d_min | d_min/2p | m̄ | d_min/m̄ | ln(1/f) | ln(m̄/6) | ln(1/f)−d_min/m̄−ln(m̄/6) = ln w | G2 | 2p/G2 |');
  console.log('  |---|---|---|---|---|---|---|---|---|---|---|');
  for (const r of rs) {
    const d = dmin(r.p), t = d / r.mean, lm = Math.log(r.mean / 6);
    console.log(`  | T${r.x} | ${r.p} | ${d} | ${(d / (2 * r.p)).toFixed(3)} | ${r.mean.toFixed(2)} | ${t.toFixed(3)} | ${r.ln.toFixed(3)} | ${lm.toFixed(3)} | ${(r.ln - t - lm).toFixed(3)} | ${r.G2} | ${(2 * r.p / r.G2).toFixed(3)} |`);
  }
  console.log('\n  the parameter-free density model  ln(1/f)_pred = 2p/m̄ + ln(m̄/6), and the shape of L:');
  console.log('  | tile | p | ln(1/f) pred | ln(1/f) meas | meas/pred | L | lnD | L/lnD | ln²x | L/ln²x |');
  console.log('  |---|---|---|---|---|---|---|---|---|---|');
  for (const r of rs) {
    const pr = r.ratio + Math.log(r.mean / 6), lnD = Math.log(r.D), l2 = Math.log(r.x) ** 2;
    console.log(`  | T${r.x} | ${r.p} | ${pr.toFixed(3)} | ${r.ln.toFixed(3)} | ${(r.ln / pr).toFixed(3)} | ${r.L} | ${lnD.toFixed(1)} | ${(r.L / lnD).toFixed(3)} | ${l2.toFixed(2)} | ${(r.L / l2).toFixed(3)} |`);
  }
  console.log('');
  const A = fit(rs.map(r => r.ratio), rs.map(r => r.ln));
  const B = fit(rs.map(r => dmin(r.p) / r.mean), rs.map(r => r.ln));
  const C = fit(rs.map(r => Math.log(r.D)), rs.map(r => r.L));
  const E = fit(rs.map(r => Math.log(Math.log(r.D)) ** 2), rs.map(r => r.L));
  console.log(`\n  regress ln(1/f) on 2p/m̄     : slope ${A.slope.toFixed(3)}  intercept ${A.intercept.toFixed(3)}  R² ${A.r2.toFixed(3)}   [exponential-tail model predicts slope 1]`);
  console.log(`  regress ln(1/f) on d_min/m̄  : slope ${B.slope.toFixed(3)}  intercept ${B.intercept.toFixed(3)}  R² ${B.r2.toFixed(3)}`);
  console.log(`  regress L on lnD            : slope ${C.slope.toFixed(4)} intercept ${C.intercept.toFixed(3)}  R² ${C.r2.toFixed(3)}   [linear branch: L ∝ lnD ∝ x]`);
  console.log(`  regress L on (ln lnD)²      : slope ${E.slope.toFixed(4)} intercept ${E.intercept.toFixed(3)}  R² ${E.r2.toFixed(3)}   [polylog branch]`);
  const s = rs.map(r => `${r.f.toExponential(3)}`).join(', ');
  console.log(`\n  the diagonal f, in order: ${s}`);
  console.log(`  monotone decreasing? ${rs.every((r, i) => i === 0 || r.f < rs[i - 1].f) ? 'YES' : 'NO'}`);
  console.log(`  range of ln(1/f): ${Math.min(...rs.map(r => r.ln)).toFixed(3)} .. ${Math.max(...rs.map(r => r.ln)).toFixed(3)}  (spread ${(Math.max(...rs.map(r => r.ln)) - Math.min(...rs.map(r => r.ln))).toFixed(3)})`);
  console.log(`  range of 2p/m̄  : ${Math.min(...rs.map(r => r.ratio)).toFixed(3)} .. ${Math.max(...rs.map(r => r.ratio)).toFixed(3)}  (spread ${(Math.max(...rs.map(r => r.ratio)) - Math.min(...rs.map(r => r.ratio))).toFixed(3)})`);
  // ------------------------------------------------------------------
  // PHASE F — the step-3 PROVEN bound against the step-4 APPROXIMATION.
  //   proven:        maxsum_2(old) ≤ G2(new) ≤ maxsum_{L+1}(old)
  //   approximation: G2(new) ≤ G2(old) + L·m̄   (replaces the absorbed
  //                  neighbours by mean gaps, so it can and does fail)
  // ------------------------------------------------------------------
  console.log(`\n  PHASE F — step 3 (proven) vs step 4 (approximation), one fold at a time:`);
  console.log('  | old tile | fold p | L | maxsum_2 | G2(new) | maxsum_{L+1} | step-3 lower | step-3 upper | G2+L·m̄ | step-4 |');
  console.log('  |---|---|---|---|---|---|---|---|---|---|');
  for (let i = 0; i < rs.length; i++) {
    // G2 ladder of record (research/oeis-G2-submission.md): ..., 258, 348, 528
    const KNOWN = { 13: 66, 17: 108, 19: 150, 23: 204, 29: 258, 31: 348, 37: 528 };
    const r = rs[i], truth = rs[i + 1] ? rs[i + 1].G2 : (KNOWN[r.p] || null);
    if (truth === null || !r.ms) {
      const ap = r.G2 + r.L * r.mean;
      console.log(`  | T${r.x} | ${r.p} | ${r.L} | ${r.ms ? r.ms[2] : 'n/m'} | ${truth === null ? '(not measured)' : truth + ' (ladder)'} | ${r.ms ? r.ms[r.L + 1] : 'n/m'} | | | ${ap.toFixed(0)} | ${truth === null ? '' : (ap >= truth ? 'holds' : '*** FAILS ***')} |`);
      continue;
    }
    const lo = r.ms[2], hi = r.ms[r.L + 1], ap = r.G2 + r.L * r.mean;
    console.log(`  | T${r.x} | ${r.p} | ${r.L} | ${lo} | ${truth} | ${hi} | ${lo <= truth ? 'HOLDS' : '*** FAILS ***'} | ${truth <= hi ? 'HOLDS' : '*** FAILS ***'} | ${ap.toFixed(0)} | ${ap >= truth ? 'holds' : '*** FAILS ***'} |`);
  }
  console.log('\n  maxsum_m tables (m = 1..8), for A4:');
  for (const r of rs) if (r.ms) console.log(`    T${r.x}: ${Array.from(r.ms.slice(1)).map(v => v).join(' ')}`);
}

// ==========================================================================
// PHASE D — T31 STREAMED FROM T23 (double nest), folded by 37.
// 31 × 29 × 7,952,175 = 7.14e9 candidate positions, 6.23e9 survive.
// ==========================================================================
if (MODE === 'deep' || MODE === 'all') {
  console.log('PHASE D — DEEP: T31 streamed from T23 via T29 (6.23e9 slots), fold 37.\n');
  const src = T[23], S = src.S, n = S.length, W23 = src.W, W29 = W23 * 29, W31 = W29 * 31;
  // precomputed residues: the skip test becomes four integer compares
  const m29 = new Uint8Array(n), m31 = new Uint8Array(n), m37 = new Uint8Array(n);
  for (let i = 0; i < n; i++) { m29[i] = S[i] % 29; m31[i] = S[i] % 31; m37[i] = S[i] % 37; }
  const h = new Float64Array(HB), Ls = Lstate(37);
  let prev = -1, first = -1, D = 0;
  for (let k2 = 0; k2 < 31; k2++) {
    const B2 = k2 * W29;
    for (let k1 = 0; k1 < 29; k1++) {
      const B = B2 + k1 * W23;
      const b29 = B % 29, b31 = B % 31, b37 = B % 37;
      const a29 = (29 - b29) % 29, c29 = (a29 + 27) % 29;   // r ≡ 0 or −2 (mod 29)
      const a31 = (31 - b31) % 31, c31 = (a31 + 29) % 31;   // r ≡ 0 or −2 (mod 31)
      for (let i = 0; i < n; i++) {
        const u = m29[i]; if (u === a29 || u === c29) continue;
        const v = m31[i]; if (v === a31 || v === c31) continue;
        const r = S[i] + B;
        if (prev < 0) first = r; else h[(r - prev) / 6]++;
        prev = r; D++;
        Lpush(Ls, (m37[i] + b37) % 37);
      }
    }
    console.log(`    ... block ${k2 + 1}/31, slots so far ${D}, L so far ${Ls.best}   [${el()}]`);
  }
  h[(first + W31 - prev) / 6]++;
  const st = statsFrom(h, D, W31, 37);
  const row = Object.assign(report('T31 folded by 37:', st), { x: 31, L: Ls.best });
  console.log(`    L(T31, 37) = ${Ls.best}    [${el()}]\n`);
  console.log('    full gap histogram of T31 (d: count):');
  let line = '     ';
  for (let j = 1; j < HB; j++) if (h[j]) { line += ` ${6 * j}:${h[j]}`; if (line.length > 95) { console.log(line); line = '     '; } }
  if (line.trim()) console.log(line);
  console.log('');
  table([row]);
}

function table(rs) {
  console.log('  | tile | fold p | mean gap | 2p | 2p/m̄ | f | ln(1/f) | ln(1/f)/(2p/m̄) | L | lnD | lnD/ln(1/f) |');
  console.log('  |---|---|---|---|---|---|---|---|---|---|---|');
  for (const r of rs) {
    const lnD = Math.log(r.D);
    console.log(`  | T${r.x} | ${r.p} | ${r.mean.toFixed(1)} | ${2 * r.p} | ${r.ratio.toFixed(2)} | ${r.f.toExponential(2)} | ${r.ln.toFixed(2)} | ${(r.ln / r.ratio).toFixed(3)} | ${r.L} | ${lnD.toFixed(1)} | ${(lnD / r.ln).toFixed(1)} |`);
  }
  console.log('');
}
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --node-flag --max-old-space-size=8000 research/a3-02-diagonal-f.js -- all 0.018444887490538957 32.21051668952904 6226553025 348 4
//   invocation:  node --max-old-space-size=8000 research/a3-02-diagonal-f.js all 0.018444887490538957 32.21051668952904 6226553025 348 4
//   code-sha256: 4e190e10d8f551cd03fd9344558b326d24aabc684cfd3cfc3beccdad45f1812a
//   out-sha256:  a4c09d943194539079043f3f8fc5fd97a676695f046bbf4d5fda3bb3eea907ac
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     268.1 s
// ============================================================================
// == A3-02  EXTEND THE DIAGONAL f ==  mode=all
//
// PHASE A — CUSTODY: rebuild the five published diagonal points.
//
//   T11 folded by 13:
//     D = 135   W = 2310   gaps counted = 135
//     mean gap m̄ = 17.1111  (W/D = 17.1111)   G2 = 42
//     fold p = 13   threshold 2p = 26   2p/m̄ = 1.5195
//     f = 4.444e-2   ln(1/f) = 3.1135   ratio ln(1/f)/(2p/m̄) = 2.0491
//     qualifying gaps: 24(4.444%)
//     L(T11, 13) = 2    [0.7s]
//
//   T13 folded by 17:
//     D = 1485   W = 30030   gaps counted = 1485
//     mean gap m̄ = 20.2222  (W/D = 20.2222)   G2 = 66
//     fold p = 17   threshold 2p = 34   2p/m̄ = 1.6813
//     f = 4.848e-2   ln(1/f) = 3.0265   ratio ln(1/f)/(2p/m̄) = 1.8001
//     qualifying gaps: 36(4.040%) 66(0.808%)
//     L(T13, 17) = 2    [0.7s]
//
//   T17 folded by 19:
//     D = 22275   W = 510510   gaps counted = 22275
//     mean gap m̄ = 22.9185  (W/D = 22.9185)   G2 = 108
//     fold p = 19   threshold 2p = 38   2p/m̄ = 1.6580
//     f = 4.884e-2   ln(1/f) = 3.0191   ratio ln(1/f)/(2p/m̄) = 1.8209
//     qualifying gaps: 36(4.588%) 78(0.296%)
//     L(T17, 19) = 2    [0.7s]
//
//   T19 folded by 23:
//     D = 378675   W = 9699690   gaps counted = 378675
//     mean gap m̄ = 25.6148  (W/D = 25.6148)   G2 = 150
//     fold p = 23   threshold 2p = 46   2p/m̄ = 1.7958
//     f = 3.112e-2   ln(1/f) = 3.4699   ratio ln(1/f)/(2p/m̄) = 1.9322
//     qualifying gaps: 48(2.763%) 90(0.326%) 138(0.023%)
//     L(T19, 23) = 3    [0.7s]
//
//   T23 folded by 29:
//     D = 7952175   W = 223092870   gaps counted = 7952175
//     mean gap m̄ = 28.0543  (W/D = 28.0543)   G2 = 204
//     fold p = 29   threshold 2p = 58   2p/m̄ = 2.0674
//     f = 3.066e-2   ln(1/f) = 3.4848   ratio ln(1/f)/(2p/m̄) = 1.6856
//     qualifying gaps: 60(3.060%) 114(0.006%) 174(0.000%)
//     L(T23, 29) = 2    [1.2s]
//
// PHASE B — CUSTODY OF THE STREAM: T23 restreamed from T19.
//
//   T23 (streamed) folded by 29:
//     D = 7952175   W = 223092870   gaps counted = 7952175
//     mean gap m̄ = 28.0543  (W/D = 28.0543)   G2 = 204
//     fold p = 29   threshold 2p = 58   2p/m̄ = 2.0674
//     f = 3.066e-2   ln(1/f) = 3.4848   ratio ln(1/f)/(2p/m̄) = 1.6856
//     qualifying gaps: 60(3.060%) 114(0.006%) 174(0.000%)
//     L(T23, 29) = 2
//     CUSTODY: D MATCH, W MATCH, f MATCH (bit-identical), G2 MATCH, L MATCH    [2.2s]
//
// PHASE C — NEW POINT: T29 streamed from T23 (214.7M slots), fold 31.
//
//     ... copy 4/29, slots so far 29614975   [6.8s]
//     ... copy 8/29, slots so far 59229978   [11.7s]
//     ... copy 12/29, slots so far 88844988   [17.2s]
//     ... copy 16/29, slots so far 118460000   [23.0s]
//     ... copy 20/29, slots so far 148074987   [28.6s]
//     ... copy 24/29, slots so far 177689977   [34.2s]
//     ... copy 28/29, slots so far 207304961   [39.9s]
//     ... copy 29/29, slots so far 214708725   [41.3s]
//   T29 folded by 31:
//     D = 214708725   W = 6469693230   gaps counted = 214708725
//     mean gap m̄ = 30.1324  (W/D = 30.1324)   G2 = 258
//     fold p = 31   threshold 2p = 62   2p/m̄ = 2.0576
//     f = 3.737e-2   ln(1/f) = 3.2870   ratio ln(1/f)/(2p/m̄) = 1.5975
//     qualifying gaps: 60(3.640%) 126(0.096%) 186(0.001%)
//     L(T29, 31) = 4    [41.3s]
//
// PHASE C' — 7th point supplied from the deep run: T31 folded by 37.
//
//   | tile | fold p | mean gap | 2p | 2p/m̄ | f | ln(1/f) | ln(1/f)/(2p/m̄) | L | lnD | lnD/ln(1/f) |
//   |---|---|---|---|---|---|---|---|---|---|---|
//   | T11 | 13 | 17.1 | 26 | 1.52 | 4.44e-2 | 3.11 | 2.049 | 2 | 4.9 | 1.6 |
//   | T13 | 17 | 20.2 | 34 | 1.68 | 4.85e-2 | 3.03 | 1.800 | 2 | 7.3 | 2.4 |
//   | T17 | 19 | 22.9 | 38 | 1.66 | 4.88e-2 | 3.02 | 1.821 | 2 | 10.0 | 3.3 |
//   | T19 | 23 | 25.6 | 46 | 1.80 | 3.11e-2 | 3.47 | 1.932 | 3 | 12.8 | 3.7 |
//   | T23 | 29 | 28.1 | 58 | 2.07 | 3.07e-2 | 3.48 | 1.686 | 2 | 15.9 | 4.6 |
//   | T29 | 31 | 30.1 | 62 | 2.06 | 3.74e-2 | 3.29 | 1.597 | 4 | 19.2 | 5.8 |
//   | T31 | 37 | 32.2 | 74 | 2.30 | 1.84e-2 | 3.99 | 1.738 | 4 | 22.6 | 5.6 |
//
// PHASE E — DECOMPOSITION AND REGRESSION.
//
//   | tile | p | d_min | d_min/2p | m̄ | d_min/m̄ | ln(1/f) | ln(m̄/6) | ln(1/f)−d_min/m̄−ln(m̄/6) = ln w | G2 | 2p/G2 |
//   |---|---|---|---|---|---|---|---|---|---|---|
//   | T11 | 13 | 24 | 0.923 | 17.11 | 1.403 | 3.114 | 1.048 | 0.663 | 42 | 0.619 |
//   | T13 | 17 | 36 | 1.059 | 20.22 | 1.780 | 3.027 | 1.215 | 0.031 | 66 | 0.515 |
//   | T17 | 19 | 36 | 0.947 | 22.92 | 1.571 | 3.019 | 1.340 | 0.108 | 108 | 0.352 |
//   | T19 | 23 | 48 | 1.043 | 25.61 | 1.874 | 3.470 | 1.451 | 0.145 | 150 | 0.307 |
//   | T23 | 29 | 60 | 1.034 | 28.05 | 2.139 | 3.485 | 1.542 | -0.196 | 204 | 0.284 |
//   | T29 | 31 | 60 | 0.968 | 30.13 | 1.991 | 3.287 | 1.614 | -0.318 | 258 | 0.240 |
//   | T31 | 37 | 72 | 0.973 | 32.21 | 2.235 | 3.993 | 1.681 | 0.077 | 348 | 0.213 |
//
//   the parameter-free density model  ln(1/f)_pred = 2p/m̄ + ln(m̄/6), and the shape of L:
//   | tile | p | ln(1/f) pred | ln(1/f) meas | meas/pred | L | lnD | L/lnD | ln²x | L/ln²x |
//   |---|---|---|---|---|---|---|---|---|---|
//   | T11 | 13 | 2.567 | 3.114 | 1.213 | 2 | 4.9 | 0.408 | 5.75 | 0.348 |
//   | T13 | 17 | 2.896 | 3.027 | 1.045 | 2 | 7.3 | 0.274 | 6.58 | 0.304 |
//   | T17 | 19 | 2.998 | 3.019 | 1.007 | 2 | 10.0 | 0.200 | 8.03 | 0.249 |
//   | T19 | 23 | 3.247 | 3.470 | 1.069 | 3 | 12.8 | 0.234 | 8.67 | 0.346 |
//   | T23 | 29 | 3.610 | 3.485 | 0.965 | 2 | 15.9 | 0.126 | 9.83 | 0.203 |
//   | T29 | 31 | 3.671 | 3.287 | 0.895 | 4 | 19.2 | 0.208 | 11.34 | 0.353 |
//   | T31 | 37 | 3.978 | 3.993 | 1.004 | 4 | 22.6 | 0.177 | 11.79 | 0.339 |
//
//
//   regress ln(1/f) on 2p/m̄     : slope 1.062  intercept 1.358  R² 0.730   [exponential-tail model predicts slope 1]
//   regress ln(1/f) on d_min/m̄  : slope 0.938  intercept 1.602  R² 0.654
//   regress L on lnD            : slope 0.1232 intercept 1.083  R² 0.683   [linear branch: L ∝ lnD ∝ x]
//   regress L on (ln lnD)²      : slope 0.2915 intercept 0.866  R² 0.627   [polylog branch]
//
//   the diagonal f, in order: 4.444e-2, 4.848e-2, 4.884e-2, 3.112e-2, 3.066e-2, 3.737e-2, 1.844e-2
//   monotone decreasing? NO
//   range of ln(1/f): 3.019 .. 3.993  (spread 0.974)
//   range of 2p/m̄  : 1.519 .. 2.297  (spread 0.778)
//
//   PHASE F — step 3 (proven) vs step 4 (approximation), one fold at a time:
//   | old tile | fold p | L | maxsum_2 | G2(new) | maxsum_{L+1} | step-3 lower | step-3 upper | G2+L·m̄ | step-4 |
//   |---|---|---|---|---|---|---|---|---|---|
//   | T11 | 13 | 2 | 66 | 66 | 96 | HOLDS | HOLDS | 76 | holds |
//   | T13 | 17 | 2 | 96 | 108 | 138 | HOLDS | HOLDS | 106 | *** FAILS *** |
//   | T17 | 19 | 2 | 150 | 150 | 168 | HOLDS | HOLDS | 154 | holds |
//   | T19 | 23 | 3 | 186 | 204 | 228 | HOLDS | HOLDS | 227 | holds |
//   | T23 | 29 | 2 | 234 | 258 | 300 | HOLDS | HOLDS | 260 | holds |
//   | T29 | 31 | 4 | 330 | 348 | 510 | HOLDS | HOLDS | 379 | holds |
//   | T31 | 37 | 4 | n/m | 528 (ladder) | n/m | | | 477 | *** FAILS *** |
//
//   maxsum_m tables (m = 1..8), for A4:
//     T11: 42 66 96 108 138 156 168 180
//     T13: 66 96 138 156 168 186 204 228
//     T17: 108 150 168 198 210 240 258 288
//     T19: 150 186 210 228 282 300 348 378
//     T23: 204 234 300 348 390 462 498 528
//     T29: 258 330 390 420 510 540 552 582
// PHASE D — DEEP: T31 streamed from T23 via T29 (6.23e9 slots), fold 37.
//
//     ... block 1/31, slots so far 200856578, L so far 4   [49.6s]
//     ... block 2/31, slots so far 401713096, L so far 4   [57.7s]
//     ... block 3/31, slots so far 602569635, L so far 4   [68.7s]
//     ... block 4/31, slots so far 803426193, L so far 4   [78.2s]
//     ... block 5/31, slots so far 1004282758, L so far 4   [89.9s]
//     ... block 6/31, slots so far 1205139319, L so far 4   [102.2s]
//     ... block 7/31, slots so far 1405995835, L so far 4   [112.6s]
//     ... block 8/31, slots so far 1606852367, L so far 4   [121.9s]
//     ... block 9/31, slots so far 1807708939, L so far 4   [129.1s]
//     ... block 10/31, slots so far 2008565517, L so far 4   [137.5s]
//     ... block 11/31, slots so far 2209422028, L so far 4   [143.3s]
//     ... block 12/31, slots so far 2410278587, L so far 4   [151.1s]
//     ... block 13/31, slots so far 2611135122, L so far 4   [158.6s]
//     ... block 14/31, slots so far 2811991689, L so far 4   [165.6s]
//     ... block 15/31, slots so far 3012848259, L so far 4   [171.4s]
//     ... block 16/31, slots so far 3213704766, L so far 4   [177.3s]
//     ... block 17/31, slots so far 3414561336, L so far 4   [183.2s]
//     ... block 18/31, slots so far 3615417902, L so far 4   [189.3s]
//     ... block 19/31, slots so far 3816274438, L so far 4   [195.1s]
//     ... block 20/31, slots so far 4017130997, L so far 4   [200.9s]
//     ... block 21/31, slots so far 4217987508, L so far 4   [206.6s]
//     ... block 22/31, slots so far 4418844086, L so far 4   [212.3s]
//     ... block 23/31, slots so far 4619700658, L so far 4   [218.4s]
//     ... block 24/31, slots so far 4820557190, L so far 4   [224.3s]
//     ... block 25/31, slots so far 5021413706, L so far 4   [230.0s]
//     ... block 26/31, slots so far 5222270267, L so far 4   [235.9s]
//     ... block 27/31, slots so far 5423126832, L so far 4   [242.3s]
//     ... block 28/31, slots so far 5623983390, L so far 4   [248.5s]
//     ... block 29/31, slots so far 5824839929, L so far 4   [254.4s]
//     ... block 30/31, slots so far 6025696447, L so far 4   [260.4s]
//     ... block 31/31, slots so far 6226553025, L so far 4   [268.0s]
//   T31 folded by 37:
//     D = 6226553025   W = 200560490130   gaps counted = 6226553025
//     mean gap m̄ = 32.2105  (W/D = 32.2105)   G2 = 348
//     fold p = 37   threshold 2p = 74   2p/m̄ = 2.2974
//     f = 1.844e-2   ln(1/f) = 3.9930   ratio ln(1/f)/(2p/m̄) = 1.7380
//     qualifying gaps: 72(1.765%) 150(0.079%) 222(0.000%) 294(0.000%)
//     L(T31, 37) = 4    [268.0s]
//
//     full gap histogram of T31 (d: count):
//       6:472665375 12:1260441000 18:749635250 24:398923200 30:1125566730 36:299202120 42:677184012
//       48:258098688 54:87682824 60:260576152 66:159343546 72:109884182 78:108939976 84:38474924 90:65936260
//       96:34015314 102:12947814 108:44744420 114:3748744 120:17717092 126:9020104 132:7757284 138:12709164
//       144:174704 150:4937476 156:1788652 162:1132112 168:1531470 174:216494 180:851204 186:177640
//       192:262524 198:93644 204:52242 210:70782 216:3152 222:26366 228:6296 234:4362 240:5868 246:134
//       252:1602 258:860 264:130 270:318 276:146 282:226 288:228 294:46 300:54 306:36 312:10 318:34
//       330:34 348:4
//
//   | tile | fold p | mean gap | 2p | 2p/m̄ | f | ln(1/f) | ln(1/f)/(2p/m̄) | L | lnD | lnD/ln(1/f) |
//   |---|---|---|---|---|---|---|---|---|---|---|
//   | T31 | 37 | 32.2 | 74 | 2.30 | 1.84e-2 | 3.99 | 1.738 | 4 | 22.6 | 5.6 |
// ============================================================================
// READINGS
// ============================================================================
//
// 1. CUSTODY, CLEAN. All five published diagonal values (U-FRAME §5a step 7)
//    reproduce exactly: f = 4.444e-2, 4.848e-2, 4.884e-2, 3.112e-2, 3.066e-2
//    at T11@13, T13@17, T17@19, T19@23, T23@29, with the same means and, since
//    the 2026-08-17 scanner correction, L = 2, 2, 2, 3, 2. The last of those
//    read 3 until the correction, which is the retired killrun.js value; the
//    other four never moved. The streaming trick is then checked against the
//    thing it replaces: T23 regenerated from T19 by the nested generator
//    gives D, W, G2, L and f BIT-IDENTICAL to the in-memory tile. Two further
//    independent checks land on recorded values: the streamed G2(T29) = 258
//    and G2(T31) = 348 are exactly the 10th and 11th entries of the G2 ladder
//    in research/oeis-G2-submission.md, which was produced by a completely
//    different method (a mod-30 lattice walk). Slot counts also match the
//    predicted 214,708,725 and 6,226,553,025.
//
// 2. THE TWO NEW DIAGONAL POINTS.
//      T29 folded by 31: f = 3.737e-2, ln(1/f) = 3.287, 2p/m̄ = 2.058
//      T31 folded by 37: f = 1.844e-2, ln(1/f) = 3.993, 2p/m̄ = 2.297
//    Costs: 34 s and 126 s. The diagonal now reads
//      f = 4.444e-2, 4.848e-2, 4.884e-2, 3.112e-2, 3.066e-2, 3.737e-2, 1.844e-2
//    and it is NOT monotone: the T29 point steps back up. But it is not flat
//    either. Across the seven points ln(1/f) moves 3.019 → 3.993, a spread of
//    0.97, against a spread of 0.78 in 2p/m̄.
//
// 3. THE TRACKING PREDICTION HOLDS, AND WITH THE RIGHT SLOPE. Regressing
//    ln(1/f) on 2p/m̄ over the seven diagonal points gives
//        slope 1.062,  intercept 1.358,  R² 0.730.
//    The exponential-tail model predicts slope exactly 1, and the intercept it
//    predicts is ln(m̄/6), which runs 1.05 to 1.68 over this range. Both are
//    hit. Stated as a parameter-free forward prediction rather than a fit,
//        ln(1/f) ≈ 2p/m̄ + ln(m̄/6),
//    the measured/predicted ratios are 1.213, 1.045, 1.007, 1.069, 0.965,
//    0.895, 1.004. Six of seven land inside 11%, and the outlier is the
//    smallest tile. **f IS a tail probability at a receding threshold**, which
//    was the claim under test, and it is now measured rather than asserted.
//
// 4. WHY THE DIAGONAL LOOKED FLAT: f IS ONE HISTOGRAM BIN, AND THE BIN IS
//    COMBED. Nearly all of f sits in a single gap value, d_min(p), the
//    smallest multiple of 6 that is ≡ 0, ±2 (mod p): 24, 36, 36, 48, 60, 60,
//    72 at p = 13..37. That value is ≈ 2p but jitters, d_min/2p ∈ [0.92,
//    1.06], and it can repeat across two consecutive folds (36 at both 17 and
//    19; 60 at both 29 and 31), which is exactly where the diagonal stalls or
//    steps back. On top of that, P(gap = d) carries a Hardy-Littlewood comb
//    factor (grain-census.js reading 4). Subtracting the model leaves
//        ln w = ln(1/f) − d_min/m̄ − ln(m̄/6) = 0.66, 0.03, 0.11, 0.15,
//               −0.20, −0.32, 0.08,
//    i.e. w between 0.73 and 1.94, with no trend. Over the measured range the
//    comb noise is the same size as the decay signal, which is precisely why
//    five points could not separate the branches and why the sixth point moves
//    the wrong way. Seven points, and the model rather than the raw sequence,
//    do separate them.
//
// 5. WHICH BRANCH. **The decaying branch.** The threshold recedes because
//    2p grows linearly in x while m̄ = W/D grows like ln²x: measured m̄/ln²x
//    = 2.98, 3.07, 2.86, 2.96, 2.85, 2.66, 2.73, flat to falling, with no sign
//    of catching 2p. So 2p/m̄ → ∞, hence ln(1/f) → ∞, hence
//        L ≈ ln D / ln(1/f) ≈ x / (2x/m̄) = m̄/2 ≈ 1.4 ln²x,
//    which is POLYLOG, not linear. The measured L points the same way but far
//    more weakly than the pre-correction reading claimed. L/ln²x = 0.348,
//    0.304, 0.249, 0.346, 0.203, 0.353, 0.339 has no trend, first to last
//    0.348 → 0.339; L/lnD = 0.408, 0.274, 0.200, 0.234, 0.126, 0.208, 0.177
//    falls by a factor of 2.3 first to last. If L were linear in x the second
//    ratio would be the flat one, and it is the first that is flat. TWO
//    CORRECTIONS TO WHAT THIS READING SAID BEFORE 2026-08-17. (a) L/lnD does
//    NOT fall monotonically and never did: it rises at T17 → T19 in the
//    2026-08-16 output too (0.200 → 0.234), so "monotonically" was refuted by
//    the printed column it was read off. (b) With L(T23, 29) = 3 retired for
//    2, the T23 point is a dip in both series and the two regressions no
//    longer separate the branches at all: L on lnD has R² 0.683 and L on
//    (ln lnD)² has R² 0.627, against 0.904 and 0.867 before. On seven points,
//    one of which is now a dip, THE REGRESSIONS DECIDE NOTHING. What survives
//    is the ratio comparison above and the mechanism, not the fit.
//
// 6. CALIBRATION, HONESTLY. (a) 2p/m̄ still only moves from 1.52 to 2.30, so
//    the lever arm is short and the slope-1 fit has R² 0.73; a true slope of
//    0.7 is not excluded by these seven points alone. (b) The independence
//    model overestimates L, and by how much depends on which form of it is
//    used, so both are stated here. Its ASYMPTOTIC form m̄/2 ≈ 1.4 ln²x gives
//    8.6 to 16.1 over these tiles against a measured 2 to 4, a factor of about
//    4. Its FINITE form, the lnD/ln(1/f) column the table above prints, gives
//    1.6, 2.4, 3.3, 3.7, 4.6, 5.8, 5.6, a factor of about 1.4 on average and
//    2.3 at the worst point (T23, where L = 2). Either way it is an
//    upper-bound heuristic, not a law; that direction is safe for the route
//    but it means the CONSTANT in L ~ c ln²x is not measured, only its shape.
//    (c) The prediction ln(1/f) ≈ 2p/m̄ +
//    ln(m̄/6) treats the grain as exponential with spacing 6; grain-census.js
//    reading 4 shows the grain is still markedly more regular than exponential
//    at T23 (CV² ≈ 0.48 against 1), so the agreement at 11% is better than the
//    model deserves and may not survive deeper.
//
// 7. THE REAL WEAK LINK IS NOT f, IT IS STEP 4. Checking both bounds fold by
//    fold: the PROVEN two-sided bound maxsum_2(old) ≤ G2(new) ≤
//    maxsum_{L+1}(old) HOLDS at every one of the six checkable folds, which
//    extends the published verification (p = 7..29) by one rung to p = 31.
//    The 2026-08-17 scanner correction TIGHTENS it at fold 29: with L = 2 the
//    upper bound there is maxsum_3(T23) = 300, not maxsum_4(T23) = 348, and
//    G2(29#) = 258 still sits under it. research/a3-10-lower-tightness.js
//    reading 1 states the same replacement from its own enumeration.
//    The APPROXIMATION of step 4, G2(new) ≤ G2(old) + L·m̄, FAILS TWICE:
//        fold 17: 66 + 2·20.2 = 106  against the true 108
//        fold 37: 348 + 4·32.2 = 477 against the true 528 (G2 ladder)
//    So the inequality that carries the whole Σ L·m̄ asymptotic is violated at
//    2 of 7 folds. It fails for the reason U-FRAME §5 already identified: the
//    absorbed neighbour is not a mean gap, it is drawn from the same fat
//    upper tail as the record itself. **The route's arithmetic needs
//    maxsum_{L+1} directly, not G2 + L·m̄.** That is a live crack, and it is
//    the one worth attacking next (it is A4).
//
// 8. maxsum_m FOR A4 (m = 1..8), now including the streamed T29:
//      T11: 42 66 96 108 138 156 168 180
//      T13: 66 96 138 156 168 186 204 228
//      T17: 108 150 168 198 210 240 258 288
//      T19: 150 186 210 228 282 300 348 378
//      T23: 204 234 300 348 390 462 498 528
//      T29: 258 330 390 420 510 540 552 582
//    Two things jump out. maxsum_8(T23) = 528 = G2(37#) EXACTLY, three folds
//    later; and maxsum_4(T23) = 348 = G2(T31), two folds later. Flagged as
//    observations on small samples, not as a law, but if maxsum_m(old) is
//    predicting G2 several folds ahead then A4's closed system is real.
//
// 9. BY-PRODUCT: the complete gap histogram of T31 (6.23e9 gaps, 54 distinct
//    sizes, G2 = 348) is in the OUTPUT above, and the same for T29. That is
//    the raw material A9 asks for (the histogram fold rule) and the check
//    surface for A3 (f from the grain census without enumeration).
//
// 10. VERDICT ON A2. The dichotomy is resolved in favour of the second
//    branch: f decays, ln(1/f) tracks 2p/m̄ with slope 1.06 and the predicted
//    intercept, and L is polylog in shape rather than linear. The f half of
//    that is measured; the L half rests on the ratio comparison of reading 5
//    and NOT on the two L regressions, which after the scanner correction
//    separate nothing (R² 0.683 against 0.627). The route
//    survives this test. It does not survive untouched, because the step-4
//    approximation that turns L into a bound on G2 is now measurably false at
//    two folds. The failure has moved from "is f flat?" to "is G2 + L·m̄ the
//    right arithmetic?", which is a strictly better place for it to be.
// ============================================================================
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   2.0576 -> 2.058 (reading 2, 2p/m̄ at T29 folded by 31).
//   spread 0.778 -> 0.78 (reading 2, the printed "range of 2p/m̄" line).
//   The ln w list of reading 4 is the printed ln w column of PHASE E rounded
//   to two places: 0.663 0.031 0.108 0.145 -0.196 -0.318 0.077 read out as
//   0.66, 0.03, 0.11, 0.15, -0.20, -0.32, 0.08.
// DERIVED IN THIS READING by arithmetic over printed values:
//   w between 0.73 and 1.94 (reading 4) is exp of the printed ln w extremes,
//   exp(-0.318) = 0.728 and exp(0.663) = 1.941.
//   m̄/ln²x = 2.98, 3.07, 2.86, 2.96, 2.85, 2.66, 2.73 (reading 5) is the
//   printed m̄ column divided by the printed ln²x column, tile by tile. Here
//   x is the tile's own top prime, which is what the printed ln²x column
//   holds: ln²11 = 5.75 through ln²31 = 11.79.
//   8.6 to 16.1 (reading 6) is half the printed m̄ at the two ends of the
//   range, 17.11/2 and 32.21/2.
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   CV² ≈ 0.48 at T23 (reading 6c) is research/grain-census.js, whose OUTPUT
//   prints "T23: g=28.05 CV2=0.481".
//   R² 0.904 and 0.867 (reading 5b) are this same script's own superseded
//   run, the one embedded above before the 2026-08-17 scanner correction.
//   That block is in git at commit 22a9e0c and reads "regress L on lnD ... R²
//   0.904" and "regress L on (ln lnD)² ... R² 0.867". research/U-FRAME.md
//   cites the same pair back to this file.
// ---------------------------------------------------------------------------
