'use strict';
// ============================================================================
// ATTACK 0830 ANCHORED-LADDER-17 — THE UNIFIED ANCHORED LADDER ONE LEVEL UP:
// @17/@19 RE-DERIVED AS THE CUSTODY GATE, @23 RUN UNDER A SEALED FORECAST
// (2026-08-30; TODO item A first move (a); companion note
// research/history/staging/attack-0830-anchored-ladder-17.md)
// ============================================================================
//
// QUESTION. At @17 and above, at which depth K does the composed (unified)
// anchored floor first turn positive, at which K does it reach the truth, and
// how do K_first_positive(level) and K_truth(level) move across the levels?
//
// WHAT IS ALREADY ON RECORD, and is NOT re-posed here. The @17 and @19
// ladders in K are ANSWERED (Q-anchored-ladder, attack-anchored-02.md,
// producer research/attack-anchored-02-ladder17.js, embedded 2026-08-21):
// unified positive first at K = 2 / 10 (= the classic K*), truth at
// ascending K = 109 / 410, minimal truth pool 88 / 350, classic plateau
// 3057 / 38219 passed at ascending K = 67 / 281. Those figures are asserted
// here as the custody gate before the new level runs; they are not findings
// of this script.
//
// WHAT IS NEW. The same engine (a flat Uint8Array tile as in
// research/natal-cap-11-kstar23.js, so no segmentation is needed below
// W = 2^31) taken to @23: W = 223092870, N = 5301450, scour 1739 primes.
// Every figure at @23 is an exact finite count, and every quantity that was
// forecast in the note's section 1 before this run is scored HIT / MISS
// against its band in SEC 3.
//
// THE FAMILY (staircase-note section 7 + anchored-01's unified-cap lemma).
// Fix the level x, W = x#, the Natal@5 comb N_x, the ascending scour. For a
// scour prime q and a side, the admissible cofactor candidates are v = q m,
// m >= 1, m = 1 or P^-(m) >= q, v in the side's mod-30 house, v not in the
// transcribed comb-exclusion class of any wheel prime 7 <= p <= x. A
// candidate is ALIVE at depth K if none of the first K scour primes below q
// strikes it (A-side v != -2, B-side v != 0, 2 mod q'). capU_K(q) = number of
// alive candidates (m >= 1). capC_K(q) = the same over m >= 2, plus s(q).
// PROVEN (anchored-01 section 2, red-teamed): fresh(q) <= capU_K(q) <= capC_K(q)
// for every K and q, at the ANCHORED point (all class offsets 0). The floor
// floorU(K) = N - sum_q capU_K(q) is a lower bound on the anchored
// survivors, which are twin prime pairs (Lemma 5), at THIS level only.
//
// WHAT THIS SCRIPT DOES.
//  SEC 0  Custody gate at @11/@13 ([STC], [ADV], [AA1], [AA2]); abort on any
//         mismatch.
//  SEC 1  @17 and @19: [STC] and [AA2] anchors asserted, landmark rungs
//         printed for comparison with the record's table.
//  SEC 2  Timing probe: nothing printed to stdout; the level sizes that set
//         the cost (candidates, killer incidences) are printed so that @29
//         can be priced from them.
//  SEC 3  @23: [STC] anchors asserted first, then the unified ladder in K,
//         the waste accounting, the margin identity, the spend, and the
//         forecast scorecard.
//  SEC 4  The depth-cost table across five levels, MEASURED.
//
// Usage: node research/history/staging/attack-0830-anchored-ladder-17.js
//        [--levels 11,13,17,19,23]
// Progress and timing go to stderr only.
// ============================================================================

const WID = require('../../qc/widths');

// ------------------------------------------------------------- cited inputs
// Standing compute rule: cite, do not recompute. Sources:
//   [STC]  paper/staircase-note.md Theorem 8 table; @23 row from
//          research/natal-cap-11-kstar23.js embedded OUTPUT (lines 321, 360-369).
//   [ADV]  research/attack-advmin-1113.js embedded OUTPUT (witness vectors, 16 / 152).
//   [AA1]  research/attack-anchored-01-unify.js embedded OUTPUT (36/115, K = 8/28, 41/296).
//   [AA2]  research/attack-anchored-02-ladder17.js embedded OUTPUT (SEC 1-4).
const CITED = {
  witness11: [10, 4, 14, 15, 24, 17, 34, 39, 10, 40],
  witness13: [16, 14, 14, 28, 28, 9, 21, 19, 18, 18, 54, 31, 19, 17, 33, 27,
    39, 21, 1, 34, 57, 78, 27, 90, 15, 40, 8, 29, 94, 56, 20, 153, 22, 48],
  advmin11: 16, advmin13Witness: 152,
  stc: {
    11: { N: 90, scour: 10, q0: 13, qLast: 47, sumCap1: 288, sumCap2: 56, Kstar: 0, floor: 34, truth: 45 },
    13: { N: 990, scour: 34, q0: 17, qLast: 173, sumCap1: 5052, sumCap2: 880, Kstar: 0, floor: 110, truth: 307 },
    17: { N: 14850, scour: 120, q0: 19, qLast: 709, sumCap1: 99729, sumCap2: 16135, Kstar: 2, floor: 82, truth: 3099 },
    19: { N: 252450, scour: 435, q0: 23, qLast: 3109, sumCap1: 2025930, sumCap2: 308401, Kstar: 10, floor: 1877, truth: 38380 },
    23: { N: 5301450, scour: 1739, q0: 29, qLast: 14929, sumCap1: 48424543, sumCap2: 7034588, Kstar: 27,
      sumKstar: 5296609, sumK26: 5312453, floor: 4841, truth: 597475, removed: 4703975, sumS: 868, self: 175, capInf: 4704668 },
    29: { W: 6469693230, N: 143139150, sumCap1: 1443004515, sumCap2: 202133083, Kstar: 69, floor: 31327, truth: 12307838 },
  },
  aa1: { 11: { floorU0: 36, truthK: 8, plateau: 41 }, 13: { floorU0: 115, truthK: 28, plateau: 296 } },
  aa2: {
    11: { floorU0: 36, KstarU: 0, floorUKs: 36, plateau: 41, ascPlat: 2, greedyPlat: 2, ascTruth: 8, minimal: 4, WE: 2, SH: 2, FR: 2, dead: 6, redundant: 0 },
    13: { floorU0: 115, KstarU: 0, floorUKs: 115, plateau: 296, ascPlat: 15, greedyPlat: 14, ascTruth: 28, minimal: 21, WE: 5, SH: 6, FR: 6, dead: 13, redundant: 0 },
    17: { floorU0: -1262, KstarU: 2, floorUKs: 108, plateau: 3057, ascPlat: 67, greedyPlat: 64, ascTruth: 109, minimal: 88, WE: 23, SH: 19, FR: 16, dead: 30, redundant: 2 },
    19: { floorU0: -55865, KstarU: 10, floorUKs: 1987, plateau: 38219, ascPlat: 281, greedyPlat: 273, ascTruth: 410, minimal: 350, WE: 86, SH: 75, FR: 52, dead: 71, redundant: 14 },
  },
};

// Forecasts sealed in the note's section 1 BEFORE SEC 3 ran (bands inclusive).
const FORECAST23 = {
  plateau: { kind: 'DERIVED', lo: 596782, hi: 596782 },
  waste: { kind: 'DERIVED', lo: 693, hi: 693 },
  FR: { kind: 'DERIVED', lo: 175, hi: 175 },
  floorU0max: { kind: 'DERIVED', lo: -Infinity, hi: -1732000 },
  KstarU: { kind: 'DERIVED', lo: 27, hi: 27 },
  WE: { kind: 'EXTRAPOLATED', lo: 280, hi: 420, point: 347 },
  floorUKs: { kind: 'EXTRAPOLATED', lo: 5240, hi: 5490, point: 5350 },
  marginKs: { kind: 'EXTRAPOLATED', lo: 400, hi: 650, point: 510 },
  ascPlat: { kind: 'EXTRAPOLATED', lo: 1130, hi: 1390, point: 1250 },
  greedyPlat: { kind: 'EXTRAPOLATED', lo: 1100, hi: 1390, point: 1217 },
  ascTruth: { kind: 'EXTRAPOLATED', lo: 1600, hi: 1739, point: 1670 },
  minimal: { kind: 'EXTRAPOLATED', lo: 1390, hi: 1600, point: 1495 },
  dead: { kind: 'EXTRAPOLATED', lo: 120, hi: 260, point: 174 },
  redundant: { kind: 'EXTRAPOLATED', lo: 20, hi: 200, point: 60 },
};

// ---------------------------------------------------------------- utilities
const argv = process.argv.slice(2);
const optOf = (n, d) => { const i = argv.indexOf('--' + n); return i === -1 ? d : argv[i + 1]; };
const LEVELS = optOf('levels', '11,13,17,19,23').split(',').map(Number);
const T0 = Date.now();
const prog = s => process.stderr.write(`  [${((Date.now() - T0) / 1000).toFixed(1)} s] ${s}\n`);
let failures = 0;
function check(name, ok) { console.log(`  ${ok ? 'ok   ' : 'FAIL '} ${name}`); if (!ok) failures++; }
function assertAbort(name, ok) {
  if (!ok) { console.log(`  ABORT custody failed: ${name}`); process.exit(1); }
  console.log(`  ok    ${name}`);
}
function primesUpTo(n) {
  const s = new Uint8Array(n + 1), P = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { P.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return P;
}
function spfSieve(n) {
  const spf = new Int32Array(n + 1);
  for (let i = 2; i <= n; i++) if (spf[i] === 0) for (let j = i; j <= n; j += i) if (spf[j] === 0) spf[j] = i;
  return spf;
}
const sOf = q => { const m = q % 30; return (m === 11 || m === 13 || m === 17 || m === 19) ? 1 : 0; };
class GrowI32 {
  constructor(cap) { this.a = new Int32Array(cap); this.n = 0; }
  push(v) { if (this.n === this.a.length) { const b = new Int32Array(this.a.length * 2); b.set(this.a); this.a = b; } this.a[this.n++] = v; }
}

// ---------------------------------------------------------------- the level
function buildLevel(x) {
  const wheelAll = primesUpTo(x);
  let W = 1; for (const p of wheelAll) W *= p;
  WID.assertFits('slot/candidate value W+1', W + 1, Int32Array, `@${x}`);
  const scour = primesUpTo(Math.floor(Math.sqrt(W)) + 2).filter(q => q > x && q * q <= W);
  const wheel = wheelAll.filter(p => p >= 7);
  const alive = new Uint8Array(W);
  let N = 0;
  for (const h of [11, 17]) for (let r = h; r < W; r += 30) {
    let ok = true;
    for (const p of wheel) { const rp = r % p; if (rp === 0 || rp === p - 2) { ok = false; break; } }
    if (ok) { alive[r] = 1; N++; }
  }
  return { x, W, wheel, scour, alive, N };
}
// The march under a class vector (a_q = cls[i]); anchored = all zeros.
// Flat-tile strided march (natal-cap-11's form); consumes a copy of alive.
function march(L, cls) {
  const alive = Uint8Array.from(L.alive), fresh = new Int32Array(L.scour.length);
  let surv = L.N;
  for (let i = 0; i < L.scour.length; i++) {
    const q = L.scour[i], a = ((cls[i] % q) + q) % q, b = (a - 2 + q) % q; let f = 0;
    for (let r = a; r < L.W; r += q) if (alive[r]) { alive[r] = 0; f++; }
    for (let r = b; r < L.W; r += q) if (alive[r]) { alive[r] = 0; f++; }
    fresh[i] = f; surv -= f;
  }
  return { fresh, survivors: surv };
}

// ------------------------------------------------- the one-pass level engine
function analyze(x) {
  prog(`@${x}: build`);
  const L = buildLevel(x), n = L.scour.length, N = L.N;
  WID.assertFits('kill-depth / pool index', n + 1, Uint16Array, `@${x}`);
  const M = march(L, new Int32Array(n));
  const truth = M.survivors;
  prog(`@${x}: march done, truth ${truth}`);
  const spf = spfSieve(Math.floor((L.W + 1) / L.scour[0]));
  // candidates in CSR form
  const candQ = new GrowI32(1 << 16), candM1 = new GrowI32(1 << 16), killOff = new GrowI32(1 << 16), killPool = new GrowI32(1 << 16);
  killOff.push(0);
  let sumCap1 = 0;
  const m1d = new Int32Array(n).fill(-1);   // -1 no m = 1 candidate; 0 fresh; d first killer depth
  for (let i = 0; i < n; i++) {
    const q = L.scour[i];
    for (let side = 0; side < 2; side++) {
      const t = Math.floor((L.W + (side === 0 ? -1 : 1)) / q);
      const h1 = side === 0 ? 11 : 13, h2 = side === 0 ? 17 : 19, bad = side === 0 ? -2 : 2;
      for (let m = 1; m <= t; m++) {
        if (!(m === 1 || spf[m] >= q)) continue;
        if (m >= 2) sumCap1++;
        const v = q * m, v30 = v % 30;
        if (v30 !== h1 && v30 !== h2) continue;
        let ok = true;
        for (const p of L.wheel) { const b = side === 0 ? p - 2 : 2; if (v % p === b) { ok = false; break; } }
        if (!ok) continue;
        let first = -1;
        for (let j = 0; j < i; j++) {
          const q2 = L.scour[j], r2 = v % q2, bad2 = bad === 2 ? 2 : q2 - 2;
          if (r2 === 0 || r2 === bad2) { killPool.push(j); if (first < 0) first = j; }
        }
        candQ.push(i); candM1.push(m === 1 ? 1 : 0); killOff.push(killPool.n);
        if (m === 1) m1d[i] = first < 0 ? 0 : first + 1;
      }
    }
    sumCap1 += sOf(q);
    if ((i + 1) % 200 === 0) prog(`@${x}: candidates ${i + 1}/${n} primes, ${candQ.n} so far, ${killPool.n} incidences`);
  }
  const C = candQ.n;
  prog(`@${x}: ${C} candidates, ${killPool.n} incidences`);
  // per-prime kill-depth histograms -> full K curves
  const capUK = new Float64Array(n + 1), capCK = new Float64Array(n + 1);
  const histU = Array.from({ length: n }, (_, i) => new Int32Array(i + 2));
  const histC = Array.from({ length: n }, (_, i) => new Int32Array(i + 2));
  const infU = new Int32Array(n), infC = new Int32Array(n);
  for (let c = 0; c < C; c++) {
    const i = candQ.a[c], o = killOff.a[c], d = killOff.a[c + 1] > o ? killPool.a[o] + 1 : 0;
    if (d === 0) { infU[i]++; if (!candM1.a[c]) infC[i]++; }
    else { histU[i][d]++; if (!candM1.a[c]) histC[i][d]++; }
  }
  let violations = 0, marginBad = 0, degenerate = true;
  for (let i = 0; i < n; i++) {
    const s = sOf(L.scour[i]);
    const tailU = new Int32Array(i + 3), tailC = new Int32Array(i + 3);
    for (let d = i; d >= 1; d--) { tailU[d] = tailU[d + 1] + histU[i][d]; tailC[d] = tailC[d + 1] + histC[i][d]; }
    for (let K = 0; K <= n; K++) {
      const e = Math.min(K, i);
      const cu = infU[i] + tailU[e + 1], cc = infC[i] + tailC[e + 1] + s;
      capUK[K] += cu; capCK[K] += cc;
      if (!(M.fresh[i] <= cu && cu <= cc)) violations++;
      const m1alive = (m1d[i] === 0 || m1d[i] > e) && m1d[i] !== -1 ? 1 : 0;
      if (cc - cu !== s - m1alive) marginBad++;
    }
    if (infU[i] !== M.fresh[i]) degenerate = false;
  }
  const floorU = K => N - capUK[K], floorC = K => N - capCK[K];
  const firstK = pred => { for (let K = 0; K <= n; K++) if (pred(K)) return K; return -1; };
  const KstarC = firstK(K => capCK[K] < N), KstarU = firstK(K => capUK[K] < N);
  const plateau = floorC(n);
  let WE = 0, SH = 0, FR = 0, allow = 0;
  for (let i = 0; i < n; i++) if (sOf(L.scour[i]) === 1) { allow++; if (m1d[i] === -1) WE++; else if (m1d[i] === 0) FR++; else SH++; }
  // spend: killer algebra + greedy
  const G0 = new Int32Array(n), sole = new Int32Array(n);
  for (let c = 0; c < C; c++) {
    const o = killOff.a[c], e = killOff.a[c + 1];
    if (e - o === 1) sole[killPool.a[o]]++;
    for (let t = o; t < e; t++) G0[killPool.a[t]]++;
  }
  const byOff = new Int32Array(n + 1);
  for (let j = 0; j < n; j++) byOff[j + 1] = byOff[j] + G0[j];
  const byPool = new Int32Array(byOff[n]), fillPos = Int32Array.from(byOff.subarray(0, n));
  for (let c = 0; c < C; c++) for (let t = killOff.a[c]; t < killOff.a[c + 1]; t++) byPool[fillPos[killPool.a[t]]++] = c;
  let killers = 0, dead = 0, soleN = 0, lastKiller = -1;
  for (let j = 0; j < n; j++) { if (G0[j] > 0) { killers++; lastKiller = j; } else dead++; if (sole[j] > 0) soleN++; }
  const G = Int32Array.from(G0), aliveC = new Uint8Array(C).fill(1), used = new Uint8Array(n);
  let floor = N - C, crossCert = -1, crossPlat = -1, crossTruth = -1, steps = 0;
  const certFloor = floorC(KstarC);
  for (let step = 1; step <= n; step++) {
    let j = -1, best = 0;
    for (let t = 0; t < n; t++) if (!used[t] && G[t] > best) { best = G[t]; j = t; }
    if (j < 0) break;
    used[j] = 1; steps = step;
    for (let t = byOff[j]; t < byOff[j + 1]; t++) {
      const c = byPool[t]; if (!aliveC[c]) continue;
      aliveC[c] = 0; floor++;
      for (let u = killOff.a[c]; u < killOff.a[c + 1]; u++) G[killPool.a[u]]--;
    }
    if (crossCert < 0 && floor > certFloor) crossCert = step;
    if (crossPlat < 0 && floor > plateau) crossPlat = step;
    if (crossTruth < 0 && floor === truth) crossTruth = step;
  }
  prog(`@${x}: spend done`);
  return {
    x, L, n, N, M, truth, C, incid: killPool.n, sumCap1, capUK, capCK, floorU, floorC, plateau, KstarC, KstarU,
    violations, marginBad, degenerate, WE, SH, FR, allow,
    ascBeatPlat: firstK(K => floorU(K) > plateau), ascTruth: firstK(K => floorU(K) === truth),
    killers, dead, soleN, lastKiller, greedyCert: crossCert, greedyPlat: crossPlat, greedyTruth: crossTruth,
  };
}
function ladderRow(r, K) {
  return `      ${String(K).padStart(4)} | ${String(r.capCK[K]).padStart(8)} -> ${String(r.floorC(K)).padStart(7)} | ${String(r.capUK[K]).padStart(8)} -> ${String(r.floorU(K)).padStart(7)}`;
}
function assertStc(r) {
  const c = CITED.stc[r.x];
  assertAbort(`@${r.x}: N = ${c.N}, scour ${c.scour} primes ${c.q0}..${c.qLast}, truth = ${c.truth} [STC] (got ${r.N}, ${r.n} ${r.L.scour[0]}..${r.L.scour[r.n - 1]}, ${r.truth})`,
    r.N === c.N && r.n === c.scour && r.L.scour[0] === c.q0 && r.L.scour[r.n - 1] === c.qLast && r.truth === c.truth);
  assertAbort(`@${r.x}: sum cap1 = ${c.sumCap1}, sum cap2 = ${c.sumCap2}, K* = ${c.Kstar}, certified floor = ${c.floor} [STC] (got ${r.sumCap1}, ${r.capCK[0]}, ${r.KstarC}, ${r.floorC(r.KstarC)})`,
    r.sumCap1 === c.sumCap1 && r.capCK[0] === c.sumCap2 && r.KstarC === c.Kstar && r.floorC(r.KstarC) === c.floor);
  assertAbort(`@${r.x}: zero hard-cap violations, zero margin-identity violations at all ${r.n + 1} depths x ${r.n} primes; capU_full = fresh per prime`,
    r.violations === 0 && r.marginBad === 0 && r.degenerate);
}
function assertAa2(r) {
  const a = CITED.aa2[r.x];
  assertAbort(`@${r.x}: unified K = 0 floor ${a.floorU0}, positive first at K = ${a.KstarU} with floor ${a.floorUKs}, classic plateau ${a.plateau} [AA2] (got ${r.floorU(0)}, ${r.KstarU}, ${r.floorU(r.KstarU)}, ${r.plateau})`,
    r.floorU(0) === a.floorU0 && r.KstarU === a.KstarU && r.floorU(r.KstarU) === a.floorUKs && r.plateau === a.plateau);
  assertAbort(`@${r.x}: plateau passed at ascending K = ${a.ascPlat} / greedy ${a.greedyPlat}; truth at ascending K = ${a.ascTruth}, minimal pool ${a.minimal} [AA2] (got ${r.ascBeatPlat}, ${r.greedyPlat}, ${r.ascTruth}, ${r.greedyTruth} = sole ${r.soleN})`,
    r.ascBeatPlat === a.ascPlat && r.greedyPlat === a.greedyPlat && r.ascTruth === a.ascTruth && r.greedyTruth === a.minimal && r.soleN === a.minimal);
  assertAbort(`@${r.x}: waste ${a.WE} wheel-excluded + ${a.SH} shadows + ${a.FR} fresh-self; dead ${a.dead}; redundant killers ${a.redundant} [AA2] (got ${r.WE}, ${r.SH}, ${r.FR}, ${r.dead}, ${r.killers - r.soleN})`,
    r.WE === a.WE && r.SH === a.SH && r.FR === a.FR && r.dead === a.dead && r.killers - r.soleN === a.redundant);
}
function scoreForecast(name, f, value) {
  const hit = value >= f.lo && value <= f.hi;
  const band = f.lo === f.hi ? `= ${f.lo}` : `[${f.lo === -Infinity ? '-inf' : f.lo}, ${f.hi}]` + (f.point !== undefined ? ` point ${f.point}` : '');
  console.log(`      ${hit ? 'HIT ' : 'MISS'}  ${name.padEnd(34)} ${f.kind.padEnd(12)} band ${band.padEnd(28)} measured ${value}`);
  return hit;
}

const R = {};
// ============================================================================
console.log('SEC 0. CUSTODY GATE AT @11 AND @13 (abort on mismatch)');
// ============================================================================
for (const x of [11, 13]) {
  if (!LEVELS.includes(x)) continue;
  R[x] = analyze(x);
  assertStc(R[x]);
  const a = CITED.aa1[x], r = R[x];
  assertAbort(`@${x}: unified floor at K = 0 is ${a.floorU0}, truth first at ascending K = ${a.truthK}, classic plateau ${a.plateau} [AA1] (got ${r.floorU(0)}, ${r.ascTruth}, ${r.plateau})`,
    r.floorU(0) === a.floorU0 && r.ascTruth === a.truthK && r.plateau === a.plateau);
  assertAa2(r);
}
if (R[11] && R[13]) {
  const w11 = march(R[11].L, Int32Array.from(CITED.witness11)), w13 = march(R[13].L, Int32Array.from(CITED.witness13));
  assertAbort(`witness replays: @11 -> ${CITED.advmin11}, @13 -> ${CITED.advmin13Witness} [ADV] (got ${w11.survivors}, ${w13.survivors})`,
    w11.survivors === CITED.advmin11 && w13.survivors === CITED.advmin13Witness);
}

// ============================================================================
console.log('\nSEC 1. @17 AND @19: THE RECORD RE-DERIVED (Q-anchored-ladder, not re-posed)');
// ============================================================================
for (const x of [17, 19]) {
  if (!LEVELS.includes(x)) continue;
  R[x] = analyze(x);
  assertStc(R[x]); assertAa2(R[x]);
  const r = R[x];
  console.log(`  @${x} landmark rungs (compare research/attack-anchored-02-ladder17.js OUTPUT):`);
  console.log('         K | classic sum ->   floor | unified sum ->   floor');
  const rows = x === 17 ? [0, 1, 2, 3, 27, 66, 67, 88, 108, 109, 120] : [0, 1, 2, 10, 100, 275, 281, 350, 405, 410, 435];
  for (const K of rows) console.log(ladderRow(r, K));
}

// ============================================================================
console.log('\nSEC 2. THE COST DRIVERS PER LEVEL (for pricing @29; no timing on stdout)');
// ============================================================================
console.log('  level     W          N    scour  candidates  incidences  sum cap2 [STC]');
for (const x of [11, 13, 17, 19]) if (R[x]) {
  const r = R[x];
  console.log(`   @${String(x).padEnd(3)} ${String(r.L.W).padStart(11)} ${String(r.N).padStart(9)} ${String(r.n).padStart(6)} ${String(r.C).padStart(11)} ${String(r.incid).padStart(11)}  ${CITED.stc[x].sumCap2}`);
}

// ============================================================================
console.log('\nSEC 3. @23: THE UNIFIED LADDER ONE LEVEL UP, UNDER THE SEALED FORECAST');
// ============================================================================
if (LEVELS.includes(23)) {
  R[23] = analyze(23);
  const r = R[23], c = CITED.stc[23];
  assertStc(r);
  assertAbort(`@23: classic sum at K = 26 is ${c.sumK26} and at K* = 27 is ${c.sumKstar} [STC] (got ${r.capCK[26]}, ${r.capCK[27]})`,
    r.capCK[26] === c.sumK26 && r.capCK[27] === c.sumKstar);
  assertAbort(`@23: removed ${c.removed}, sum s = ${c.sumS}, self-strikes ${c.self}, cap-infinity anchor ${c.capInf} [STC] (got ${r.N - r.truth}, ${r.allow}, ${r.FR}, ${r.capCK[r.n]})`,
    r.N - r.truth === c.removed && r.allow === c.sumS && r.FR === c.self && r.capCK[r.n] === c.capInf);
  console.log(`   @23  W ${r.L.W}  N ${r.N}  scour ${r.n}  candidates ${r.C}  incidences ${r.incid}`);
  console.log('\n  @23    K | classic sum ->   floor | unified sum ->   floor   (every K computed and asserted; selected rows printed)');
  const rows = [];
  for (let K = 0; K <= 30; K++) rows.push(K);
  for (let K = 40; K <= 200; K += 20) rows.push(K);
  for (let K = 300; K <= 1700; K += 100) rows.push(K);
  for (const K of [r.ascBeatPlat - 1, r.ascBeatPlat, r.ascTruth - 1, r.ascTruth, r.n]) if (!rows.includes(K)) rows.push(K);
  rows.sort((a, b) => a - b);
  for (const K of rows) console.log(ladderRow(r, K));
  console.log(`\n  @23 floorU(0) = ${r.floorU(0)} (sum capU_0 = ${r.capUK[0]} > N = ${r.N}): VACUOUS, as at @17 and @19.`);
  console.log(`  @23 unified positive first at K = ${r.KstarU} (classic K* = ${r.KstarC}); floorU(K*) = ${r.floorU(r.KstarU)} vs classic certified ${r.floorC(r.KstarC)}, margin ${r.floorU(r.KstarU) - r.floorC(r.KstarC)}`);
  console.log(`  @23 classic plateau ${r.plateau} = truth ${r.truth} - ${r.truth - r.plateau}; unified passes it at ascending K = ${r.ascBeatPlat}, greedy ${r.greedyPlat}; truth at ascending K = ${r.ascTruth} of ${r.n}, greedy ${r.greedyTruth}`);
  console.log(`  @23 waste: ${r.allow} allowances = ${r.WE} wheel-excluded + ${r.SH} shadows + ${r.FR} fresh-self; margin at K = 0 -> ${r.capCK[0] - r.capUK[0]}, at full depth -> ${r.capCK[r.n] - r.capUK[r.n]}`);
  console.log(`  @23 scour decomposition: killers ${r.killers}, dead ${r.dead}, sole killers ${r.soleN}, redundant killers ${r.killers - r.soleN}; greedy truth pool ${r.greedyTruth}`);
  console.log(`  @23 greedy first beats the classic certified floor ${r.floorC(r.KstarC)} at step ${r.greedyCert}`);
  check(`@23 margin identity at K = 0 equals the wheel-excluded count (${r.capCK[0] - r.capUK[0]} = ${r.WE}) and at full depth equals the waste (${r.capCK[r.n] - r.capUK[r.n]} = ${r.allow - r.FR})`,
    r.capCK[0] - r.capUK[0] === r.WE && r.capCK[r.n] - r.capUK[r.n] === r.allow - r.FR);
  check(`@23 ascending truth depth ${r.ascTruth} = index of the largest killer prime (${r.lastKiller + 1}, q = ${r.L.scour[r.lastKiller]})`,
    r.ascTruth === r.lastKiller + 1);
  console.log('\n  FORECAST SCORECARD (sealed in the note section 1 before this section ran):');
  let hits = 0, tot = 0;
  const S = (name, f, v) => { tot++; if (scoreForecast(name, f, v)) hits++; };
  S('D1 classic plateau', FORECAST23.plateau, r.plateau);
  S('D1 waste (allowances - fresh-self)', FORECAST23.waste, r.allow - r.FR);
  S('D1 fresh self-strikes', FORECAST23.FR, r.FR);
  S('D2 floorU(0) at most', FORECAST23.floorU0max, r.floorU(0));
  S('D3 K_first_positive (unified)', FORECAST23.KstarU, r.KstarU);
  S('E1 wheel-excluded allowances', FORECAST23.WE, r.WE);
  S('E2 floorU at K*', FORECAST23.floorUKs, r.floorU(r.KstarU));
  S('E2 margin at K*', FORECAST23.marginKs, r.floorU(r.KstarU) - r.floorC(r.KstarC));
  S('E3 ascending plateau crossing', FORECAST23.ascPlat, r.ascBeatPlat);
  S('E3 greedy plateau crossing', FORECAST23.greedyPlat, r.greedyPlat);
  S('E4 ascending truth depth', FORECAST23.ascTruth, r.ascTruth);
  S('E5 minimal truth pool (sole)', FORECAST23.minimal, r.soleN);
  S('E6 dead primes', FORECAST23.dead, r.dead);
  S('E6 redundant killers', FORECAST23.redundant, r.killers - r.soleN);
  console.log(`      E5 coincidence sole = greedy truth pool: ${r.soleN === r.greedyTruth ? 'HOLDS' : 'FAILS'} (${r.soleN} vs ${r.greedyTruth})`);
  console.log(`      score: ${hits} HIT of ${tot}`);
}

// ============================================================================
console.log('\nSEC 4. THE DEPTH-COST CURVE ACROSS THE LEVELS (MEASURED; finite table, no law)');
// ============================================================================
console.log('  level scour |  K*=K_pos  frac | floorC(K*) floorU(K*) margin | plateau K: asc  frac  greedy  frac | truth K: asc  frac  minimal  frac | dead frac');
for (const x of [11, 13, 17, 19, 23]) if (R[x]) {
  const r = R[x], n = r.n, Ks = r.KstarU;
  console.log(`   @${String(x).padEnd(3)} ${String(n).padStart(5)} | ${String(Ks).padStart(8)}  ${(Ks / n).toFixed(4)} | ${String(r.floorC(r.KstarC)).padStart(9)} ${String(r.floorU(Ks)).padStart(10)} ${String(r.floorU(Ks) - r.floorC(r.KstarC)).padStart(6)} | ${String(r.ascBeatPlat).padStart(12)}  ${(r.ascBeatPlat / n).toFixed(3)} ${String(r.greedyPlat).padStart(6)}  ${(r.greedyPlat / n).toFixed(3)} | ${String(r.ascTruth).padStart(12)}  ${(r.ascTruth / n).toFixed(3)} ${String(r.soleN).padStart(7)}  ${(r.soleN / n).toFixed(3)} | ${String(r.dead).padStart(4)} ${(r.dead / n).toFixed(3)}`);
}
const have = [11, 13, 17, 19, 23].filter(x => R[x]);
check('K_first_positive (unified) = classic K* at every level run', have.every(x => R[x].KstarU === R[x].KstarC));
check('the unified floor at K* beats the classic certified floor at every level run', have.every(x => R[x].floorU(R[x].KstarU) > R[x].floorC(R[x].KstarC)));
check('the minimal-truth-pool fraction rises at every consecutive pair of levels run', have.every((x, t) => t === 0 || R[x].soleN / R[x].n > R[have[t - 1]].soleN / R[have[t - 1]].n));
check('the greedy plateau-crossing fraction rises at every consecutive pair of levels run', have.every((x, t) => t === 0 || R[x].greedyPlat / R[x].n > R[have[t - 1]].greedyPlat / R[have[t - 1]].n));
check('sole-killer count = greedy truth pool at every level run', have.every(x => R[x].soleN === R[x].greedyTruth));
console.log('\n  The largest killer prime per level (the ascending pool must walk to it), and the shadow-guarantee reading of it:');
for (const x of have) {
  const r = R[x], q = r.L.scour[r.lastKiller], inScour = new Set(r.L.scour);
  const twinUp = inScour.has(q + 2), twinDown = inScour.has(q - 2);
  console.log(`   @${x}: last killer q = ${q} (scour index ${r.lastKiller + 1} of ${r.n}; ${r.n - r.lastKiller - 1} scour primes above it kill nothing); q+2 in scour: ${twinUp ? 'yes' : 'no'}, q-2 in scour: ${twinDown ? 'yes' : 'no'}`);
}
check('at every level run the largest killer prime q has q+2 in the scour (shadow duty for its twin, attack-anchored-02 section 3)',
  have.every(x => { const r = R[x]; return new Set(r.L.scour).has(r.L.scour[r.lastKiller] + 2); }));
console.log('\n  Efficiency (floor gained per rung, ascending pool), three regimes:');
for (const x of have) {
  const r = R[x];
  const b1 = r.KstarU > 0 ? ((r.floorU(r.KstarU) - r.floorU(0)) / r.KstarU).toFixed(0) : '(positive at K=0)';
  const b2 = ((r.floorU(r.ascBeatPlat) - r.floorU(r.KstarU)) / Math.max(1, r.ascBeatPlat - r.KstarU)).toFixed(1);
  const b3 = ((r.truth - r.floorU(r.ascBeatPlat)) / Math.max(1, r.ascTruth - r.ascBeatPlat)).toFixed(2);
  console.log(`   @${x}: to positivity ${b1} per rung; positivity -> plateau-cross ${b2} per rung; plateau-cross -> truth ${b3} per rung`);
}
{
  const c = CITED.stc[29];
  const sc29 = primesUpTo(Math.floor(Math.sqrt(c.W)) + 2).filter(q => q > 29 && q * q <= c.W).length;
  const r23 = R[23];
  console.log(`\n  @29 pricing inputs [STC]: W ${c.W} (above 2^31: segmented tile needed), N ${c.N}, scour ${sc29} primes, sum cap2 ${c.sumCap2}, K* ${c.Kstar}, floor ${c.floor}, truth ${c.truth}`);
  if (r23) console.log(`  @29 / @23 ratios: sum cap2 ${(c.sumCap2 / CITED.stc[23].sumCap2).toFixed(1)}x, scour ${(sc29 / r23.n).toFixed(1)}x, killer-scan work (sum cap2 x scour) ${(c.sumCap2 * sc29 / (CITED.stc[23].sumCap2 * r23.n)).toFixed(0)}x`);
}
console.log(`\n${failures === 0 ? 'ALL CHECKS PASS' : failures + ' CHECK(S) FAILED'}`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/attack-0830-anchored-ladder-17.js
//   invocation:  node research/history/staging/attack-0830-anchored-ladder-17.js
//   code-sha256: edcda1562e282cf6b42ebc5411a0c5ef1c0cde1e97ada1ea022bcecb3b0158e2
//   out-sha256:  13497ffa25a25a7d3d67831c6355745de7a308eef318523baaef6aba9340c32a
//   body-lines:  193
//   inputs:      research/qc/widths.js@9bcca510a863
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     12.0 s
// ============================================================================
// SEC 0. CUSTODY GATE AT @11 AND @13 (abort on mismatch)
//   ok    @11: N = 90, scour 10 primes 13..47, truth = 45 [STC] (got 90, 10 13..47, 45)
//   ok    @11: sum cap1 = 288, sum cap2 = 56, K* = 0, certified floor = 34 [STC] (got 288, 56, 0, 34)
//   ok    @11: zero hard-cap violations, zero margin-identity violations at all 11 depths x 10 primes; capU_full = fresh per prime
//   ok    @11: unified floor at K = 0 is 36, truth first at ascending K = 8, classic plateau 41 [AA1] (got 36, 8, 41)
//   ok    @11: unified K = 0 floor 36, positive first at K = 0 with floor 36, classic plateau 41 [AA2] (got 36, 0, 36, 41)
//   ok    @11: plateau passed at ascending K = 2 / greedy 2; truth at ascending K = 8, minimal pool 4 [AA2] (got 2, 2, 8, 4 = sole 4)
//   ok    @11: waste 2 wheel-excluded + 2 shadows + 2 fresh-self; dead 6; redundant killers 0 [AA2] (got 2, 2, 2, 6, 0)
//   ok    @13: N = 990, scour 34 primes 17..173, truth = 307 [STC] (got 990, 34 17..173, 307)
//   ok    @13: sum cap1 = 5052, sum cap2 = 880, K* = 0, certified floor = 110 [STC] (got 5052, 880, 0, 110)
//   ok    @13: zero hard-cap violations, zero margin-identity violations at all 35 depths x 34 primes; capU_full = fresh per prime
//   ok    @13: unified floor at K = 0 is 115, truth first at ascending K = 28, classic plateau 296 [AA1] (got 115, 28, 296)
//   ok    @13: unified K = 0 floor 115, positive first at K = 0 with floor 115, classic plateau 296 [AA2] (got 115, 0, 115, 296)
//   ok    @13: plateau passed at ascending K = 15 / greedy 14; truth at ascending K = 28, minimal pool 21 [AA2] (got 15, 14, 28, 21 = sole 21)
//   ok    @13: waste 5 wheel-excluded + 6 shadows + 6 fresh-self; dead 13; redundant killers 0 [AA2] (got 5, 6, 6, 13, 0)
//   ok    witness replays: @11 -> 16, @13 -> 152 [ADV] (got 16, 152)
//
// SEC 1. @17 AND @19: THE RECORD RE-DERIVED (Q-anchored-ladder, not re-posed)
//   ok    @17: N = 14850, scour 120 primes 19..709, truth = 3099 [STC] (got 14850, 120 19..709, 3099)
//   ok    @17: sum cap1 = 99729, sum cap2 = 16135, K* = 2, certified floor = 82 [STC] (got 99729, 16135, 2, 82)
//   ok    @17: zero hard-cap violations, zero margin-identity violations at all 121 depths x 120 primes; capU_full = fresh per prime
//   ok    @17: unified K = 0 floor -1262, positive first at K = 2 with floor 108, classic plateau 3057 [AA2] (got -1262, 2, 108, 3057)
//   ok    @17: plateau passed at ascending K = 67 / greedy 64; truth at ascending K = 109, minimal pool 88 [AA2] (got 67, 64, 109, 88 = sole 88)
//   ok    @17: waste 23 wheel-excluded + 19 shadows + 16 fresh-self; dead 30; redundant killers 2 [AA2] (got 23, 19, 16, 30, 2)
//   @17 landmark rungs (compare research/attack-anchored-02-ladder17.js OUTPUT):
//          K | classic sum ->   floor | unified sum ->   floor
//          0 |    16135 ->   -1285 |    16112 ->   -1262
//          1 |    15346 ->    -496 |    15320 ->    -470
//          2 |    14768 ->      82 |    14742 ->     108
//          3 |    14378 ->     472 |    14352 ->     498
//         27 |    12182 ->    2668 |    12151 ->    2699
//         66 |    11830 ->    3020 |    11793 ->    3057
//         67 |    11827 ->    3023 |    11790 ->    3060
//         88 |    11799 ->    3051 |    11760 ->    3090
//        108 |    11793 ->    3057 |    11752 ->    3098
//        109 |    11793 ->    3057 |    11751 ->    3099
//        120 |    11793 ->    3057 |    11751 ->    3099
//   ok    @19: N = 252450, scour 435 primes 23..3109, truth = 38380 [STC] (got 252450, 435 23..3109, 38380)
//   ok    @19: sum cap1 = 2025930, sum cap2 = 308401, K* = 10, certified floor = 1877 [STC] (got 2025930, 308401, 10, 1877)
//   ok    @19: zero hard-cap violations, zero margin-identity violations at all 436 depths x 435 primes; capU_full = fresh per prime
//   ok    @19: unified K = 0 floor -55865, positive first at K = 10 with floor 1987, classic plateau 38219 [AA2] (got -55865, 10, 1987, 38219)
//   ok    @19: plateau passed at ascending K = 281 / greedy 273; truth at ascending K = 410, minimal pool 350 [AA2] (got 281, 273, 410, 350 = sole 350)
//   ok    @19: waste 86 wheel-excluded + 75 shadows + 52 fresh-self; dead 71; redundant killers 14 [AA2] (got 86, 75, 52, 71, 14)
//   @19 landmark rungs (compare research/attack-anchored-02-ladder17.js OUTPUT):
//          K | classic sum ->   floor | unified sum ->   floor
//          0 |   308401 ->  -55951 |   308315 ->  -55865
//          1 |   295354 ->  -42904 |   295262 ->  -42812
//          2 |   286158 ->  -33708 |   286061 ->  -33611
//         10 |   250573 ->    1877 |   250463 ->    1987
//        100 |   217885 ->   34565 |   217762 ->   34688
//        275 |   214393 ->   38057 |   214249 ->   38201
//        281 |   214374 ->   38076 |   214228 ->   38222
//        350 |   214246 ->   38204 |   214090 ->   38360
//        405 |   214234 ->   38216 |   214073 ->   38377
//        410 |   214231 ->   38219 |   214070 ->   38380
//        435 |   214231 ->   38219 |   214070 ->   38380
//
// SEC 2. THE COST DRIVERS PER LEVEL (for pricing @29; no timing on stdout)
//   level     W          N    scour  candidates  incidences  sum cap2 [STC]
//    @11         2310        90     10          54           9  56
//    @13        30030       990     34         875         205  880
//    @17       510510     14850    120       16112        5235  16135
//    @19      9699690    252450    435      308315      119912  308401
//
// SEC 3. @23: THE UNIFIED LADDER ONE LEVEL UP, UNDER THE SEALED FORECAST
//   ok    @23: N = 5301450, scour 1739 primes 29..14929, truth = 597475 [STC] (got 5301450, 1739 29..14929, 597475)
//   ok    @23: sum cap1 = 48424543, sum cap2 = 7034588, K* = 27, certified floor = 4841 [STC] (got 48424543, 7034588, 27, 4841)
//   ok    @23: zero hard-cap violations, zero margin-identity violations at all 1740 depths x 1739 primes; capU_full = fresh per prime
//   ok    @23: classic sum at K = 26 is 5312453 and at K* = 27 is 5296609 [STC] (got 5312453, 5296609)
//   ok    @23: removed 4703975, sum s = 868, self-strikes 175, cap-infinity anchor 4704668 [STC] (got 4703975, 868, 175, 4704668)
//    @23  W 223092870  N 5301450  scour 1739  candidates 7034216  incidences 3082915
//
//   @23    K | classic sum ->   floor | unified sum ->   floor   (every K computed and asserted; selected rows printed)
//          0 |  7034588 -> -1733138 |  7034216 -> -1732766
//          1 |  6796706 -> -1495256 |  6796315 -> -1494865
//          2 |  6592965 -> -1291515 |  6592556 -> -1291106
//          3 |  6436012 -> -1134562 |  6435590 -> -1134140
//          4 |  6303925 -> -1002475 |  6303490 -> -1002040
//          5 |  6186041 -> -884591 |  6185594 -> -884144
//          6 |  6084448 -> -782998 |  6083991 -> -782541
//          7 |  5999327 -> -697877 |  5998860 -> -697410
//          8 |  5926606 -> -625156 |  5926128 -> -624678
//          9 |  5859338 -> -557888 |  5858853 -> -557403
//         10 |  5800625 -> -499175 |  5800132 -> -498682
//         11 |  5747526 -> -446076 |  5747027 -> -445577
//         12 |  5697881 -> -396431 |  5697379 -> -395929
//         13 |  5653721 -> -352271 |  5653214 -> -351764
//         14 |  5613056 -> -311606 |  5612545 -> -311095
//         15 |  5576367 -> -274917 |  5575853 -> -274403
//         16 |  5543630 -> -242180 |  5543116 -> -241666
//         17 |  5513101 -> -211651 |  5512584 -> -211134
//         18 |  5484147 -> -182697 |  5483629 -> -182179
//         19 |  5457093 -> -155643 |  5456572 -> -155122
//         20 |  5431271 -> -129821 |  5430749 -> -129299
//         21 |  5406762 -> -105312 |  5406240 -> -104790
//         22 |  5385515 ->  -84065 |  5384993 ->  -83543
//         23 |  5365430 ->  -63980 |  5364908 ->  -63458
//         24 |  5346778 ->  -45328 |  5346255 ->  -44805
//         25 |  5328900 ->  -27450 |  5328377 ->  -26927
//         26 |  5312453 ->  -11003 |  5311930 ->  -10480
//         27 |  5296609 ->    4841 |  5296086 ->    5364
//         28 |  5281604 ->   19846 |  5281081 ->   20369
//         29 |  5267491 ->   33959 |  5266968 ->   34482
//         30 |  5253924 ->   47526 |  5253401 ->   48049
//         40 |  5148494 ->  152956 |  5147968 ->  153482
//         60 |  5028718 ->  272732 |  5028189 ->  273261
//         80 |  4962686 ->  338764 |  4962155 ->  339295
//        100 |  4919651 ->  381799 |  4919119 ->  382331
//        120 |  4887457 ->  413993 |  4886923 ->  414527
//        140 |  4862655 ->  438795 |  4862118 ->  439332
//        160 |  4842848 ->  458602 |  4842310 ->  459140
//        180 |  4826553 ->  474897 |  4826012 ->  475438
//        200 |  4812899 ->  488551 |  4812356 ->  489094
//        300 |  4768451 ->  532999 |  4767893 ->  533557
//        400 |  4744974 ->  556476 |  4744404 ->  557046
//        500 |  4730678 ->  570772 |  4730099 ->  571351
//        600 |  4721858 ->  579592 |  4721264 ->  580186
//        700 |  4715899 ->  585551 |  4715296 ->  586154
//        800 |  4711907 ->  589543 |  4711294 ->  590156
//        900 |  4709290 ->  592160 |  4708671 ->  592779
//       1000 |  4707507 ->  593943 |  4706879 ->  594571
//       1100 |  4706305 ->  595145 |  4705668 ->  595782
//       1200 |  4705557 ->  595893 |  4704911 ->  596539
//       1241 |  4705321 ->  596129 |  4704670 ->  596780
//       1242 |  4705318 ->  596132 |  4704667 ->  596783
//       1300 |  4705093 ->  596357 |  4704437 ->  597013
//       1400 |  4704871 ->  596579 |  4704209 ->  597241
//       1500 |  4704735 ->  596715 |  4704064 ->  597386
//       1600 |  4704686 ->  596764 |  4704008 ->  597442
//       1700 |  4704668 ->  596782 |  4703977 ->  597473
//       1731 |  4704668 ->  596782 |  4703976 ->  597474
//       1732 |  4704668 ->  596782 |  4703975 ->  597475
//       1739 |  4704668 ->  596782 |  4703975 ->  597475
//
//   @23 floorU(0) = -1732766 (sum capU_0 = 7034216 > N = 5301450): VACUOUS, as at @17 and @19.
//   @23 unified positive first at K = 27 (classic K* = 27); floorU(K*) = 5364 vs classic certified 4841, margin 523
//   @23 classic plateau 596782 = truth 597475 - 693; unified passes it at ascending K = 1242, greedy 1227; truth at ascending K = 1732 of 1739, greedy 1543
//   @23 waste: 868 allowances = 372 wheel-excluded + 321 shadows + 175 fresh-self; margin at K = 0 -> 372, at full depth -> 693
//   @23 scour decomposition: killers 1580, dead 159, sole killers 1543, redundant killers 37; greedy truth pool 1543
//   @23 greedy first beats the classic certified floor 4841 at step 27
//   ok    @23 margin identity at K = 0 equals the wheel-excluded count (372 = 372) and at full depth equals the waste (693 = 693)
//   ok    @23 ascending truth depth 1732 = index of the largest killer prime (1732, q = 14867)
//
//   FORECAST SCORECARD (sealed in the note section 1 before this section ran):
//       HIT   D1 classic plateau                 DERIVED      band = 596782                     measured 596782
//       HIT   D1 waste (allowances - fresh-self) DERIVED      band = 693                        measured 693
//       HIT   D1 fresh self-strikes              DERIVED      band = 175                        measured 175
//       HIT   D2 floorU(0) at most               DERIVED      band [-inf, -1732000]             measured -1732766
//       HIT   D3 K_first_positive (unified)      DERIVED      band = 27                         measured 27
//       HIT   E1 wheel-excluded allowances       EXTRAPOLATED band [280, 420] point 347         measured 372
//       HIT   E2 floorU at K*                    EXTRAPOLATED band [5240, 5490] point 5350      measured 5364
//       HIT   E2 margin at K*                    EXTRAPOLATED band [400, 650] point 510         measured 523
//       HIT   E3 ascending plateau crossing      EXTRAPOLATED band [1130, 1390] point 1250      measured 1242
//       HIT   E3 greedy plateau crossing         EXTRAPOLATED band [1100, 1390] point 1217      measured 1227
//       HIT   E4 ascending truth depth           EXTRAPOLATED band [1600, 1739] point 1670      measured 1732
//       HIT   E5 minimal truth pool (sole)       EXTRAPOLATED band [1390, 1600] point 1495      measured 1543
//       HIT   E6 dead primes                     EXTRAPOLATED band [120, 260] point 174         measured 159
//       HIT   E6 redundant killers               EXTRAPOLATED band [20, 200] point 60           measured 37
//       E5 coincidence sole = greedy truth pool: HOLDS (1543 vs 1543)
//       score: 14 HIT of 14
//
// SEC 4. THE DEPTH-COST CURVE ACROSS THE LEVELS (MEASURED; finite table, no law)
//   level scour |  K*=K_pos  frac | floorC(K*) floorU(K*) margin | plateau K: asc  frac  greedy  frac | truth K: asc  frac  minimal  frac | dead frac
//    @11     10 |        0  0.0000 |        34         36      2 |            2  0.200      2  0.200 |            8  0.800       4  0.400 |    6 0.600
//    @13     34 |        0  0.0000 |       110        115      5 |           15  0.441     14  0.412 |           28  0.824      21  0.618 |   13 0.382
//    @17    120 |        2  0.0167 |        82        108     26 |           67  0.558     64  0.533 |          109  0.908      88  0.733 |   30 0.250
//    @19    435 |       10  0.0230 |      1877       1987    110 |          281  0.646    273  0.628 |          410  0.943     350  0.805 |   71 0.163
//    @23   1739 |       27  0.0155 |      4841       5364    523 |         1242  0.714   1227  0.706 |         1732  0.996    1543  0.887 |  159 0.091
//   ok    K_first_positive (unified) = classic K* at every level run
//   ok    the unified floor at K* beats the classic certified floor at every level run
//   ok    the minimal-truth-pool fraction rises at every consecutive pair of levels run
//   ok    the greedy plateau-crossing fraction rises at every consecutive pair of levels run
//   ok    sole-killer count = greedy truth pool at every level run
//
//   The largest killer prime per level (the ascending pool must walk to it), and the shadow-guarantee reading of it:
//    @11: last killer q = 41 (scour index 8 of 10; 2 scour primes above it kill nothing); q+2 in scour: yes, q-2 in scour: no
//    @13: last killer q = 139 (scour index 28 of 34; 6 scour primes above it kill nothing); q+2 in scour: no, q-2 in scour: yes
//    @17: last killer q = 641 (scour index 109 of 120; 11 scour primes above it kill nothing); q+2 in scour: yes, q-2 in scour: no
//    @19: last killer q = 2887 (scour index 410 of 435; 25 scour primes above it kill nothing); q+2 in scour: no, q-2 in scour: no
//    @23: last killer q = 14867 (scour index 1732 of 1739; 7 scour primes above it kill nothing); q+2 in scour: yes, q-2 in scour: no
//   FAIL  at every level run the largest killer prime q has q+2 in the scour (shadow duty for its twin, attack-anchored-02 section 3)
//
//   Efficiency (floor gained per rung, ascending pool), three regimes:
//    @11: to positivity (positive at K=0) per rung; positivity -> plateau-cross 3.5 per rung; plateau-cross -> truth 0.33 per rung
//    @13: to positivity (positive at K=0) per rung; positivity -> plateau-cross 12.2 per rung; plateau-cross -> truth 0.69 per rung
//    @17: to positivity 685 per rung; positivity -> plateau-cross 45.4 per rung; plateau-cross -> truth 0.93 per rung
//    @19: to positivity 5785 per rung; positivity -> plateau-cross 133.7 per rung; plateau-cross -> truth 1.22 per rung
//    @23: to positivity 64375 per rung; positivity -> plateau-cross 486.8 per rung; plateau-cross -> truth 1.41 per rung
//
//   @29 pricing inputs [STC]: W 6469693230 (above 2^31: segmented tile needed), N 143139150, scour 7863 primes, sum cap2 202133083, K* 69, floor 31327, truth 12307838
//   @29 / @23 ratios: sum cap2 28.7x, scour 4.5x, killer-scan work (sum cap2 x scour) 130x
//
// 1 CHECK(S) FAILED
// ============================================================================
// READINGS
// ============================================================================
// (written in the companion note; see attack-0830-anchored-ladder-17.md)
