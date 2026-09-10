'use strict';
// ============================================================================
// ATTACK ANCHORED-02 — THE UNIFIED LADDER GENERALIZED TO @17 AND @19,
// THE CHEAP-K QUESTION, AND THE K-SPEND RULE (2026-08-21)
// ============================================================================
//
// QUESTION (the generalization move after attack-anchored-01, which built the
// unified-cap family at @11/@13 and left "@17 and above" plus the cheap-K
// question in NOT REACHED). Three parts.
//  (a) Extend the unified ladder (capU_K, the m >= 1 merge of the self-strike
//      into the cofactor injection — anchored-01's lemma, red-team confirmed
//      in redteam-0820-night-proofs.md §1a) to @17 and @19: anchored-point
//      floor at K = 0, the full K-curve, where the classic ladder plateaus,
//      and at what K the unified family passes it. Exact everywhere — both
//      levels priced out at under a second per pass, so nothing here is
//      sampled or bounded; every figure is a finite exact count.
//  (b) THE CHEAP-K QUESTION. At @11/@13 truth needs K = 8 of 10 and 28 of 34
//      (ascending pool). Measure the K-efficiency curve at all four levels:
//      floor(K) - floor(0) per rung; the smallest K where the unified floor
//      exceeds (i) the classic certified floor (Thm 8) and (ii) the classic
//      plateau. Verdict + conjecture if one is earned.
//  (c) THE K-SPEND RULE. Which pool primes buy most? Greedy (max-marginal)
//      spend vs ascending spend; per-prime kill counts against a density
//      model; the killer/dead/sole-killer decomposition of the scour; and
//      the exact minimal pool that reaches truth, with a PROVEN matching
//      lower bound (sole-killed candidates force their unique killer).
//
// WHAT THIS SCRIPT DOES, section by section.
//  SEC 0  Calibration at @11 and @13 against four embedded artifacts
//         ([STC], [ADV], [AA1]); ABORT on any mismatch.
//  SEC 1  @17: level facts, [STC] anchors asserted, the full unified/classic
//         K-curve (K = 0..120), waste accounting, the margin identity.
//  SEC 2  @19: the same at scour size 435 (selected K rows printed; every K
//         computed and asserted).
//  SEC 3  The cheap-K table across @11/@13/@17/@19: certification depths,
//         crossing depths, efficiency bands, and the verdict.
//  SEC 4  The K-spend rule: greedy vs ascending, the density model, the
//         killer/dead/sole decomposition, the exact minimal truth pool, the
//         @11 kill graph in full, and the shadow-guarantee test.
//
// THE ENGINE (one pass per level). For each scour prime q (index i) and each
// side, enumerate the admissible cofactor family of staircase-note §7 with
// m >= 1 (unified) — v = qm <= W-/+1, m = 1 or P^-(m) >= q, v in the side's
// mod-30 house, v not in the transcribed comb-exclusion class of any wheel
// prime — and for each admissible v record its FULL KILLER LIST: every
// earlier scour prime q' < q with v = 0 or -/+2 (mod q'), i.e. every
// freshness modulus that removes v. Everything else is bookkeeping on that
// list: capU_K(q) counts candidates whose first killer sits deeper than the
// depth-K pool; capC_K drops m = 1 and adds s(q); the greedy spend removes
// per-killer buckets; the sole-killer lower bound reads list lengths.
//
// PREDICTIONS, registered from the derivation + a scratch prototype run
// before this embedded run (house rule; the prototype is session-scratch,
// this file is the run of record):
//   @17: capU_0 = 16112 (floor -1262, vacuous), unified positive first at
//        K = 2 with floor 108 > 82 = classic certified floor; classic
//        plateau 3057 = 3099 - 42; ascending truth at K = 109; waste
//        58 allowances = 23 wheel-excluded + 19 shadows + 16 fresh-self.
//   @19: capU_0 = 308315 (floor -55865), positive first at K = 10 with
//        floor 1987 > 1877; plateau 38219 = 38380 - 161; ascending truth at
//        K = 410; 213 allowances = 86 + 75 + 52.
//   Greedy/minimal: truth pools of size exactly 4 / 21 / 88 / 350; greedy
//   plateau crossings 2 / 14 / 64 / 273.
//
// HONEST DOUBT, up front.
//  (1) The K = 0 unified gain that anchored-01 celebrated (36 > 34) DIES at
//      @17: sum capU_0 = 16112 > N = 14850, so the depth-0 floor is vacuous
//      there and at @19. The unified family's lead over classic survives at
//      every K (the margin identity below), but positivity itself costs
//      K* rungs, exactly as for the classic family.
//  (2) The greedy spend is chosen with full knowledge of the kill lists; the
//      caps it produces are still hard caps (Prop 7 is valid for ANY moduli
//      list — the list is part of the certificate), but greedy crossing
//      depths are ACHIEVABLE depths (upper bounds on the optimum), not
//      minima. Only for the truth target is the optimum exact, via the
//      sole-killer forcing argument, which is a theorem, not a heuristic.
//  (3) "Every killer is a sole killer" was TRUE at @11/@13 and FALSE at
//      @17/@19 (2 resp. 14 redundant killers). The minimal-pool identity
//      survives because lower bound (sole count) and upper bound (greedy
//      pool size) still coincide — asserted, not assumed.
//  (4) Fractions like 0.80-of-scour-for-truth are four data points; the
//      conjecture block states only what the four points support and marks
//      the growth trend MEASURED.
//
// Usage: node research/attack-anchored-02-ladder17.js       (~5 s, one process)
// ============================================================================

// ------------------------------------------------------------- cited inputs
// Every constant below is quoted from a formally embedded artifact (standing
// compute rule: cite, do not recompute). Sources:
//   [STC]  paper/staircase-note.md Theorem 8 table (producers
//          research/natal-cap-08-staircase.js and the deeper-row scripts named
//          there): N, sum cap1, sum cap2, K*, certified floors, truths at
//          @11/@13/@17/@19.
//   [ADV]  research/attack-advmin-1113.js embedded OUTPUT: the @11 and @13
//          adversarial witness class vectors and their minima 16 / 152.
//   [AA1]  research/attack-anchored-01-unify.js embedded OUTPUT (red-teamed
//          in redteam-0820-night-proofs.md §1): unified floors 36/115 at
//          K = 0, truth first at K = 8/28, classic plateaus 41/296.
const CITED = {
  witness11: [10, 4, 14, 15, 24, 17, 34, 39, 10, 40],           // [ADV] q=13..47
  witness13: [16, 14, 14, 28, 28, 9, 21, 19, 18, 18, 54, 31, 19, 17, 33, 27,
    39, 21, 1, 34, 57, 78, 27, 90, 15, 40, 8, 29, 94, 56, 20, 153, 22, 48],
  advmin11: 16, advmin13Witness: 152,                            // [ADV]
  stc: {
    11: { N: 90, sumCap1: 288, sumCap2: 56, Kstar: 0, floor: 34, truth: 45 },
    13: { N: 990, sumCap1: 5052, sumCap2: 880, Kstar: 0, floor: 110, truth: 307 },
    17: { N: 14850, sumCap1: 99729, sumCap2: 16135, Kstar: 2, floor: 82, truth: 3099 },
    19: { N: 252450, sumCap1: 2025930, sumCap2: 308401, Kstar: 10, floor: 1877, truth: 38380 },
  },
  aa1: {
    11: { floorU0: 36, truthK: 8, plateau: 41 },
    13: { floorU0: 115, truthK: 28, plateau: 296 },
  },
};

// ---------------------------------------------------------------- utilities
const WID = require('./qc/widths');
const T0 = Date.now();
const elapsed = () => ((Date.now() - T0) / 1000).toFixed(1) + ' s';
let failures = 0;
function check(name, ok) {
  console.log(`  ${ok ? 'ok   ' : 'FAIL '} ${name}`);
  if (!ok) failures++;
}
function assertAbort(name, ok) {
  if (!ok) { console.log(`  ABORT calibration failed: ${name}`); process.exit(1); }
  console.log(`  ok    ${name}`);
}
function primesUpTo(n) {
  const s = new Uint8Array(n + 1), P = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { P.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return P;
}
function spfSieve(n) { // smallest prime factor, 0 at 0/1
  const spf = new Int32Array(n + 1);
  for (let i = 2; i <= n; i++) if (spf[i] === 0) for (let j = i; j <= n; j += i) if (spf[j] === 0) spf[j] = i;
  return spf;
}
const sOf = q => { const m = q % 30; return (m === 11 || m === 13 || m === 17 || m === 19) ? 1 : 0; };

// ---------------------------------------------------------------- the level
function buildLevel(x) {
  const wheelAll = primesUpTo(x);
  let W = 1; for (const p of wheelAll) W *= p;
  // WIDTH RULE audit for the level about to run: every slot value and every
  // v = qm fits the plain-Number mod path only if W + 1 is far below 2^31
  // (Int32Array stores) and 2^53 (arithmetic). @19: W = 9 699 690. Loud guard:
  WID.assertFits('slot/candidate value W+1', W + 1, Int32Array, `@${x}`);
  const scour = primesUpTo(Math.floor(Math.sqrt(W)) + 2).filter(q => q > x && q * q <= W);
  const wheel = wheelAll.filter(p => p >= 7);
  const slots = [];
  for (let k = 0; k < W / 30; k++) for (const h of [11, 17]) {
    const r = 30 * k + h; let ok = true;
    for (const p of wheel) { const rp = r % p; if (rp === 0 || rp === p - 2) { ok = false; break; } }
    if (ok) slots.push(r);
  }
  return { x, W, wheel, scour, slots: Int32Array.from(slots) };
}
// The march under a class vector (a_q = cls[i]); anchored = all zeros.
function march(L, cls) {
  const struck = new Uint8Array(L.slots.length), fresh = new Int32Array(L.scour.length);
  let surv = L.slots.length;
  for (let i = 0; i < L.scour.length; i++) {
    const q = L.scour[i], a = ((cls[i] % q) + q) % q, b = (a - 2 + q) % q; let f = 0;
    for (let j = 0; j < L.slots.length; j++) {
      if (struck[j]) continue;
      const rq = L.slots[j] % q;
      if (rq === a || rq === b) { struck[j] = 1; f++; }
    }
    fresh[i] = f; surv -= f;
  }
  return { fresh, survivors: surv };
}

// ------------------------------------------------- the one-pass level engine
function analyze(x) {
  const L = buildLevel(x), n = L.scour.length, N = L.slots.length;
  WID.assertFits('kill-depth / pool index', n + 1, Uint16Array, `@${x}`);
  const M = march(L, new Int32Array(n));               // anchored point
  const truth = M.survivors;
  const spf = spfSieve(Math.floor((L.W + 1) / L.scour[0]));
  // candidates: v, prime index, side, m==1 flag, full killer list (indices)
  const candQ = [], candM1 = [], candKillers = [];
  let sumCap1 = 0;
  for (let i = 0; i < n; i++) {
    const q = L.scour[i];
    for (let side = 0; side < 2; side++) {
      const t = Math.floor((L.W + (side === 0 ? -1 : 1)) / q);
      const h1 = side === 0 ? 11 : 13, h2 = side === 0 ? 17 : 19;
      for (let m = 1; m <= t; m++) {
        const big = m === 1 || spf[m] >= q;
        if (!big) continue;
        if (m >= 2) sumCap1++;                          // cap1: no side conditions
        const v = q * m, v30 = v % 30;
        if (v30 !== h1 && v30 !== h2) continue;
        let ok = true;
        for (const p of L.wheel) { const bad = side === 0 ? p - 2 : 2; if (v % p === bad) { ok = false; break; } }
        if (!ok) continue;
        const kl = [];
        for (let j = 0; j < i; j++) {
          const q2 = L.scour[j], r2 = v % q2, bad2 = side === 0 ? q2 - 2 : 2;
          if (r2 === 0 || r2 === bad2) kl.push(j);
        }
        candQ.push(i); candM1.push(m === 1 ? 1 : 0); candKillers.push(kl);
      }
    }
    sumCap1 += sOf(q);
    if ((i + 1) % 100 === 0) console.log(`    ...candidate build ${i + 1}/${n} primes [${elapsed()}]`);
  }
  const C = candQ.length;
  // per-prime kill-depth histograms -> the full K-curves
  const capUK = new Int32Array(n + 1), capCK = new Int32Array(n + 1);
  const perPrime = Array.from({ length: n }, (_, i) => ({
    histU: new Int32Array(i + 2), histC: new Int32Array(i + 2), infU: 0, infC: 0, m1: null,
  }));
  for (let c = 0; c < C; c++) {
    const i = candQ[c], P = perPrime[i], d = candKillers[c].length ? candKillers[c][0] + 1 : 0;
    if (d === 0) { P.infU++; if (!candM1[c]) P.infC++; }
    else { P.histU[d]++; if (!candM1[c]) P.histC[d]++; }
    if (candM1[c]) P.m1 = d === 0 ? 'FRESH-SELF' : 'SHADOW';
  }
  const selfStat = [];
  for (let i = 0; i < n; i++) if (sOf(L.scour[i]) === 1)
    selfStat.push({ q: L.scour[i], st: perPrime[i].m1 === null ? 'WHEEL-EXCLUDED' : perPrime[i].m1,
      d: perPrime[i].m1 === 'SHADOW' ? null : undefined });
  // margin identity + hard-cap chain, asserted at EVERY K, EVERY prime
  let violations = 0, marginBad = 0;
  for (let i = 0; i < n; i++) {
    const P = perPrime[i], s = sOf(L.scour[i]);
    const tailU = new Int32Array(i + 3), tailC = new Int32Array(i + 3);
    for (let d = i; d >= 1; d--) { tailU[d] = tailU[d + 1] + P.histU[d]; tailC[d] = tailC[d + 1] + P.histC[d]; }
    // m1 kill depth (for the margin identity): 0 if fresh, else first killer
    let m1d = -1; // -1: no m1 candidate
    for (let c = 0; c < C; c++) if (candQ[c] === i && candM1[c]) { m1d = candKillers[c].length ? candKillers[c][0] + 1 : 0; break; }
    for (let K = 0; K <= n; K++) {
      const e = Math.min(K, i);
      const cu = P.infU + tailU[e + 1], cc = P.infC + tailC[e + 1] + s;
      capUK[K] += cu; capCK[K] += cc;
      if (!(M.fresh[i] <= cu && cu <= cc)) violations++;
      // PROVEN margin identity: capC_K - capU_K = s(q) - [m1 candidate alive at depth K]
      const m1alive = (m1d === 0 || m1d > e) && m1d !== -1 ? 1 : 0;
      if (cc - cu !== s - m1alive) marginBad++;
    }
  }
  // full-depth degeneration: capU = fresh per prime
  let degenerate = true;
  for (let i = 0; i < n; i++) if (perPrime[i].infU !== M.fresh[i]) degenerate = false;
  // ascending crossings
  const floorU = K => N - capUK[K], floorC = K => N - capCK[K];
  const firstK = pred => { for (let K = 0; K <= n; K++) if (pred(K)) return K; return -1; };
  const KstarC = firstK(K => capCK[K] < N), KstarU = firstK(K => capUK[K] < N);
  const plateau = floorC(n);
  const res = {
    L, n, N, M, truth, C, sumCap1, capUK, capCK, floorU, floorC, plateau,
    KstarC, KstarU, selfStat, candQ, candM1, candKillers,
    violations, marginBad, degenerate,
    ascBeatPlat: firstK(K => floorU(K) > plateau),
    ascTruth: firstK(K => floorU(K) === truth),
  };
  return res;
}

// -------------------------------------------- greedy spend + killer algebra
function spend(R, certFloor) {
  const { n, N, C, candKillers, L } = R;
  const byKiller = Array.from({ length: n }, () => []);
  const G = new Int32Array(n), sole = new Int32Array(n);
  let freshTot = 0, incid = 0;
  for (let c = 0; c < C; c++) {
    const kl = candKillers[c];
    if (kl.length === 0) freshTot++;
    if (kl.length === 1) sole[kl[0]]++;
    for (const j of kl) { byKiller[j].push(c); G[j]++; incid += 1; }
  }
  const G0 = Int32Array.from(G);
  const killerIdx = [], deadIdx = [], soleIdx = [];
  for (let j = 0; j < n; j++) {
    (G0[j] > 0 ? killerIdx : deadIdx).push(j);
    if (sole[j] > 0) soleIdx.push(j);
  }
  // greedy: max current marginal gain, smallest prime on ties
  const alive = new Uint8Array(C).fill(1), used = new Uint8Array(n);
  let floor = N - C;
  const picks = [];
  let crossCert = -1, crossPlat = -1, crossTruth = -1;
  for (let step = 1; step <= n; step++) {
    let j = -1, best = 0;
    for (let t = 0; t < n; t++) if (!used[t] && G[t] > best) { best = G[t]; j = t; }
    if (j < 0) break;                                    // all remaining gains 0
    used[j] = 1;
    let gain = 0;
    for (const c of byKiller[j]) if (alive[c]) {
      alive[c] = 0; gain++;
      for (const k of candKillers[c]) G[k]--;
    }
    floor += gain;
    picks.push({ q: L.scour[j], j, gain, floor });
    if (crossCert < 0 && floor > certFloor) crossCert = step;
    if (crossPlat < 0 && floor > R.plateau) crossPlat = step;
    if (crossTruth < 0 && floor === R.truth) crossTruth = step;
  }
  // union-bound lower bound for reaching a target floor: any pool of size k
  // removes at most the k largest G0 sums (each candidate counted once per
  // killer, so this over-credits and the bound is PROVEN one-sided).
  const G0sorted = Array.from(G0).sort((a, b) => b - a);
  const unionLB = target => {
    let need = target - (N - C), acc = 0;
    if (need <= 0) return 0;
    for (let k = 0; k < n; k++) { acc += G0sorted[k]; if (acc >= need) return k + 1; }
    return Infinity;
  };
  return { byKiller, G0, sole, killerIdx, deadIdx, soleIdx, incid, freshTot,
    picks, crossCert, crossPlat, crossTruth, unionLB };
}

// ============================================================================
console.log('SEC 0. CALIBRATION AT @11 AND @13 (abort on mismatch)');
// ============================================================================
const R = {};
for (const x of [11, 13]) {
  R[x] = analyze(x);
  const c = CITED.stc[x], a = CITED.aa1[x], r = R[x];
  assertAbort(`@${x}: N = ${c.N}, truth = ${c.truth} [STC] (got ${r.N}, ${r.truth})`,
    r.N === c.N && r.truth === c.truth);
  assertAbort(`@${x}: sum cap1 = ${c.sumCap1}, sum cap2 = ${c.sumCap2}, certified floor = ${c.floor} at K* = ${c.Kstar} [STC] ` +
    `(got ${r.sumCap1}, ${r.capCK[0]}, ${r.floorC(r.KstarC)}, K*=${r.KstarC})`,
    r.sumCap1 === c.sumCap1 && r.capCK[0] === c.sumCap2 && r.KstarC === c.Kstar && r.floorC(r.KstarC) === c.floor);
  assertAbort(`@${x}: unified floor at K = 0 is ${a.floorU0}, truth first at K = ${a.truthK}, classic plateau ${a.plateau} [AA1] ` +
    `(got ${r.floorU(0)}, ${r.ascTruth}, ${r.plateau})`,
    r.floorU(0) === a.floorU0 && r.ascTruth === a.truthK && r.plateau === a.plateau);
  assertAbort(`@${x}: zero hard-cap violations, zero margin-identity violations, full-depth capU = fresh per prime`,
    r.violations === 0 && r.marginBad === 0 && r.degenerate);
}
const w11 = march(R[11].L, Int32Array.from(CITED.witness11));
const w13 = march(R[13].L, Int32Array.from(CITED.witness13));
assertAbort(`witness replays: @11 -> ${CITED.advmin11}, @13 -> ${CITED.advmin13Witness} [ADV] (got ${w11.survivors}, ${w13.survivors})`,
  w11.survivors === CITED.advmin11 && w13.survivors === CITED.advmin13Witness);
console.log(`  calibration complete [${elapsed()}]`);

// ============================================================================
console.log('\nSEC 1. THE UNIFIED LADDER AT @17 (scour 120, N 14850)');
// ============================================================================
R[17] = analyze(17);
{
  const c = CITED.stc[17], r = R[17];
  assertAbort(`@17: N = ${c.N}, scour = 120 (19..709), truth = ${c.truth} [STC] (got ${r.N}, ${r.n}, ${r.truth})`,
    r.N === c.N && r.n === 120 && r.L.scour[0] === 19 && r.L.scour[119] === 709 && r.truth === c.truth);
  assertAbort(`@17: sum cap1 = ${c.sumCap1}, sum cap2 = ${c.sumCap2}, K* = ${c.Kstar}, certified floor = ${c.floor} [STC] ` +
    `(got ${r.sumCap1}, ${r.capCK[0]}, ${r.KstarC}, ${r.floorC(r.KstarC)})`,
    r.sumCap1 === c.sumCap1 && r.capCK[0] === c.sumCap2 && r.KstarC === c.Kstar && r.floorC(r.KstarC) === c.floor);
  check(`@17 zero hard-cap violations, zero margin-identity violations at all 121 depths x 120 primes; capU_full = fresh per prime`,
    r.violations === 0 && r.marginBad === 0 && r.degenerate);
  console.log('\n  @17    K | classic sum -> floor | unified sum -> floor');
  for (let K = 0; K <= r.n; K++)
    console.log(`      ${String(K).padStart(4)} | ${String(r.capCK[K]).padStart(8)} -> ${String(r.floorC(K)).padStart(6)} | ${String(r.capUK[K]).padStart(8)} -> ${String(r.floorU(K)).padStart(6)}`);
  console.log(`\n  @17 READINGS: floorU(0) = ${r.floorU(0)} — VACUOUS (sum capU_0 = ${r.capUK[0]} > N = ${r.N}):`);
  console.log('  the K = 0 headline of @11/@13 (36 > 34, 115 > 110) does NOT survive to @17.');
  check(`@17 unified turns positive first at K = ${r.KstarU} (same rung as classic K* = ${r.KstarC}), with floor ${r.floorU(r.KstarU)} > ${r.floorC(r.KstarC)} = classic certified floor`,
    r.KstarU === 2 && r.KstarU === r.KstarC && r.floorU(2) === 108 && r.floorU(2) > r.floorC(2));
  check(`@17 classic plateaus at ${r.plateau}; unified passes the plateau at ascending K = ${r.ascBeatPlat} and reaches truth ${r.truth} at ascending K = ${r.ascTruth} of ${r.n}`,
    r.plateau === 3057 && r.ascBeatPlat === 67 && r.ascTruth === 109);
  const nWE = r.selfStat.filter(o => o.st === 'WHEEL-EXCLUDED').length;
  const nSh = r.selfStat.filter(o => o.st === 'SHADOW').length;
  const nFr = r.selfStat.filter(o => o.st === 'FRESH-SELF').length;
  console.log(`  Waste accounting @17: ${r.selfStat.length} allowances = ${nWE} wheel-excluded self slots + ${nSh} twin-collision`);
  console.log(`  shadows + ${nFr} fresh self-strikes; classic plateau ${r.plateau} = truth ${r.truth} - ${r.selfStat.length - nFr}.`);
  check(`@17 waste identity closes on the digit: ${r.selfStat.length} - ${nFr} = ${r.truth - r.plateau} = truth - plateau`,
    r.selfStat.length - nFr === r.truth - r.plateau && nWE === 23 && nSh === 19 && nFr === 16);
  check(`@17 margin at K = 0 equals the wheel-excluded count: sumC - sumU = ${r.capCK[0] - r.capUK[0]} = ${nWE}`,
    r.capCK[0] - r.capUK[0] === nWE);
  check(`@17 margin at full depth equals the waste: ${r.capCK[r.n] - r.capUK[r.n]} = ${r.truth - r.plateau}`,
    r.capCK[r.n] - r.capUK[r.n] === r.truth - r.plateau);
}

// ============================================================================
console.log('\nSEC 2. THE UNIFIED LADDER AT @19 (scour 435, N 252450)');
// ============================================================================
R[19] = analyze(19);
{
  const c = CITED.stc[19], r = R[19];
  assertAbort(`@19: N = ${c.N}, scour = 435 (23..3109), truth = ${c.truth} [STC] (got ${r.N}, ${r.n}, ${r.truth})`,
    r.N === c.N && r.n === 435 && r.L.scour[0] === 23 && r.L.scour[434] === 3109 && r.truth === c.truth);
  assertAbort(`@19: sum cap1 = ${c.sumCap1}, sum cap2 = ${c.sumCap2}, K* = ${c.Kstar}, certified floor = ${c.floor} [STC] ` +
    `(got ${r.sumCap1}, ${r.capCK[0]}, ${r.KstarC}, ${r.floorC(r.KstarC)})`,
    r.sumCap1 === c.sumCap1 && r.capCK[0] === c.sumCap2 && r.KstarC === c.Kstar && r.floorC(r.KstarC) === c.floor);
  check(`@19 zero hard-cap violations, zero margin-identity violations at all 436 depths x 435 primes; capU_full = fresh per prime`,
    r.violations === 0 && r.marginBad === 0 && r.degenerate);
  const rows = [];
  for (let K = 0; K <= 20; K++) rows.push(K);
  for (let K = 25; K <= 100; K += 5) rows.push(K);
  for (let K = 125; K <= 400; K += 25) rows.push(K);
  rows.push(405, 410, 415, 420, 430, 435);
  console.log('\n  @19    K | classic sum -> floor | unified sum -> floor   (every K computed and asserted; selected rows printed)');
  for (const K of rows)
    console.log(`      ${String(K).padStart(4)} | ${String(r.capCK[K]).padStart(8)} -> ${String(r.floorC(K)).padStart(6)} | ${String(r.capUK[K]).padStart(8)} -> ${String(r.floorU(K)).padStart(6)}`);
  check(`@19 unified positive first at K = ${r.KstarU} = classic K*, floor ${r.floorU(r.KstarU)} > ${r.floorC(r.KstarC)} = classic certified floor`,
    r.KstarU === 10 && r.KstarU === r.KstarC && r.floorU(10) === 1987 && r.floorU(10) > 1877);
  check(`@19 classic plateaus at ${r.plateau}; unified passes it at ascending K = ${r.ascBeatPlat}, truth ${r.truth} at ascending K = ${r.ascTruth} of ${r.n}`,
    r.plateau === 38219 && r.ascBeatPlat === 281 && r.ascTruth === 410);
  const nWE = r.selfStat.filter(o => o.st === 'WHEEL-EXCLUDED').length;
  const nSh = r.selfStat.filter(o => o.st === 'SHADOW').length;
  const nFr = r.selfStat.filter(o => o.st === 'FRESH-SELF').length;
  console.log(`  Waste accounting @19: ${r.selfStat.length} allowances = ${nWE} wheel-excluded + ${nSh} shadows + ${nFr} fresh-self;`);
  console.log(`  plateau ${r.plateau} = truth ${r.truth} - ${r.selfStat.length - nFr}.`);
  check(`@19 waste identity: ${r.selfStat.length} - ${nFr} = ${r.truth - r.plateau}; margins: K=0 -> ${r.capCK[0] - r.capUK[0]} = wheel-excluded, full -> ${r.capCK[r.n] - r.capUK[r.n]} = waste`,
    r.selfStat.length - nFr === r.truth - r.plateau && r.capCK[0] - r.capUK[0] === nWE &&
    r.capCK[r.n] - r.capUK[r.n] === r.truth - r.plateau && nWE === 86 && nSh === 75 && nFr === 52);
}

// ============================================================================
console.log('\nSEC 3. THE CHEAP-K TABLE ACROSS FOUR LEVELS, AND THE VERDICT');
// ============================================================================
const SP = {};
for (const x of [11, 13, 17, 19]) SP[x] = spend(R[x], CITED.stc[x].floor);
console.log('  level  scour |  K*  K*/scour | floorC(K*) floorU(K*) margin | beat-plateau K: asc greedy  frac(greedy) | truth K: asc minimal frac(minimal)');
for (const x of [11, 13, 17, 19]) {
  const r = R[x], s = SP[x], n = r.n;
  const Ks = r.KstarC, minTruth = s.crossTruth;
  console.log(`   @${String(x).padEnd(3)} ${String(n).padStart(5)} | ${String(Ks).padStart(3)}  ${(Ks / n).toFixed(3)}   |    ${String(r.floorC(Ks)).padStart(5)}    ${String(r.floorU(Ks)).padStart(6)}  ${String(r.floorU(Ks) - r.floorC(Ks)).padStart(4)} |            ${String(r.ascBeatPlat).padStart(4)} ${String(s.crossPlat).padStart(5)}     ${(s.crossPlat / n).toFixed(3)}    |     ${String(r.ascTruth).padStart(4)} ${String(minTruth).padStart(6)}    ${(minTruth / n).toFixed(3)}`);
}
check('at every level the unified floor at the classic family\'s own K* beats the classic certified floor ' +
  '(margins +2, +5, +26, +110 at @11/@13/@17/@19)',
  [11, 13, 17, 19].every(x => R[x].floorU(R[x].KstarC) > R[x].floorC(R[x].KstarC)) &&
  R[11].floorU(0) - R[11].floorC(0) === 2 && R[13].floorU(0) - R[13].floorC(0) === 5 &&
  R[17].floorU(2) - R[17].floorC(2) === 26 && R[19].floorU(10) - R[19].floorC(10) === 110);
console.log('\n  Efficiency bands (floor gained per rung, ascending pool):');
for (const x of [11, 13, 17, 19]) {
  const r = R[x];
  const b1 = r.KstarC > 0 ? ((r.floorU(r.KstarC) - r.floorU(0)) / r.KstarC).toFixed(0) : '(positive at K=0)';
  const b2 = ((r.floorU(r.ascBeatPlat) - r.floorU(r.KstarC)) / Math.max(1, r.ascBeatPlat - r.KstarC)).toFixed(1);
  const b3 = ((r.truth - r.floorU(r.ascBeatPlat)) / Math.max(1, r.ascTruth - r.ascBeatPlat)).toFixed(2);
  console.log(`   @${x}: to positivity ${b1} per rung; positivity -> plateau-cross ${b2} per rung; plateau-cross -> truth ${b3} per rung`);
}
console.log(`
  VERDICT ON CHEAP K, in three tiers.
  (i)  BEATING THE CLASSIC CERTIFIED FLOOR IS CHEAP. The whole cost is
       positivity: K* rungs, and K* is the quarter-power band (K*/scour =
       0.000, 0.000, 0.017, 0.023 here; the staircase note's K* law). At that
       same K* the unified family is already past the classic certified
       floor, with a margin that GROWS with level (+2, +5, +26, +110) —
       by the PROVEN margin identity the lead at depth K equals the number
       of allowances the classic family wastes there, which the level
       manufactures (wheel-excluded fraction of allowances: 2/6, 5/17,
       23/58, 86/213).
  (ii) BEATING THE CLASSIC PLATEAU IS NOT CHEAP AND GETS DEARER: best
       measured spend 2/10, 14/34, 64/120, 273/435 of the scour — the
       fraction (0.20, 0.41, 0.53, 0.63) grows at every level. MEASURED.
  (iii) TRUTH IS DEEP AND EXACTLY PRICED: minimal pools 4, 21, 88, 350
       (0.40, 0.62, 0.73, 0.80 of scour), matching lower and upper bounds
       (SEC 4). The depth-cost curve does not improve with level; it
       worsens toward all-of-scour. anchored-01's open question is answered
       NO for plateau-and-truth, YES for the family lead.`);

// ============================================================================
console.log('\nSEC 4. THE K-SPEND RULE — WHERE A UNIT OF K BUYS MOST');
// ============================================================================
{
  const r = R[17], s = SP[17];
  console.log('  4a. GREEDY vs ASCENDING at @17 (floor after K rungs):');
  console.log('      K | greedy | ascending');
  const ascFloorAt = (x, K) => R[x].floorU(K);
  for (const K of [1, 2, 3, 5, 8, 10, 15, 20, 30, 50, 64, 67, 80, 88]) {
    const g = K <= s.picks.length ? s.picks[K - 1].floor : s.picks[s.picks.length - 1].floor;
    console.log(`   ${String(K).padStart(4)} | ${String(g).padStart(6)} | ${String(ascFloorAt(17, K)).padStart(6)}`);
  }
  check('greedy = ascending exactly through K = 15 at @17 (first 15 picks ARE the 15 smallest pool primes, in order)',
    s.picks.slice(0, 15).every((p, t) => p.q === r.L.scour[t]) &&
    [1, 2, 3, 5, 8, 10, 15].every(K => s.picks[K - 1].floor === ascFloorAt(17, K)));
  console.log('  first 20 greedy picks @17: ' + s.picks.slice(0, 20).map(p => `${p.q}(+${p.gain})`).join(' '));
  console.log('\n  4b. THE DENSITY MODEL. Killing power of pool prime q\' vs the naive model');
  console.log('      2/q\' x (candidates above q\'): measured/model ratio, first 12 primes @17:');
  const candAbove = new Int32Array(r.n + 1);
  { const cnt = new Int32Array(r.n); for (let c = 0; c < r.C; c++) cnt[r.candQ[c]]++;
    for (let i = r.n - 1; i >= 0; i--) candAbove[i] = candAbove[i + 1] + cnt[i]; }
  const ratios = [];
  for (let j = 0; j < 12; j++) {
    const pred = 2 / r.L.scour[j] * candAbove[j + 1];
    ratios.push(s.G0[j] / pred);
    console.log(`      q' = ${String(r.L.scour[j]).padStart(3)}: kills ${String(s.G0[j]).padStart(4)}, model ${pred.toFixed(1).padStart(7)}, ratio ${(s.G0[j] / pred).toFixed(2)}`);
  }
  check('the spend is DENSITY-DRIVEN with a FLAT calibration constant: measured/model ratio sits in the band ' +
    '0.50..0.53 for all 12 (no drift — the model is exact up to one constant ~ 0.5); kill counts strictly ' +
    'decrease over the first 12 primes',
    ratios.every(v => v > 0.49 && v < 0.54) &&
    s.G0.slice(0, 11).every((g, t) => g > s.G0[t + 1]));
  const resid = [];
  for (let j = 0; j < r.n; j++) resid.push(s.G0[j] - 2 / r.L.scour[j] * candAbove[j + 1]);
  const maxPos = Math.max(...resid);
  check(`no fold-arithmetic bonus set: the largest POSITIVE residual over the density model is ${maxPos.toFixed(1)} kill ` +
    '(vs first-pick gains in the hundreds) — no prime overperforms materially',
    maxPos < 2);
  console.log('\n  4c. KILLER / DEAD / SOLE DECOMPOSITION (all four levels):');
  console.log('      level scour killers dead sole  minimal-truth-pool = max(soleLB, ...) vs greedy   union-LB(plateau)');
  for (const x of [11, 13, 17, 19]) {
    const rr = R[x], ss = SP[x];
    const uLB = ss.unionLB(rr.plateau + 1);
    console.log(`       @${String(x).padEnd(3)} ${String(rr.n).padStart(4)} ${String(ss.killerIdx.length).padStart(6)} ${String(ss.deadIdx.length).padStart(5)} ${String(ss.soleIdx.length).padStart(4)}   LB ${String(ss.soleIdx.length).padStart(4)} = greedy ${String(ss.crossTruth).padStart(4)}  EXACT       ${String(uLB).padStart(4)} <= K <= ${ss.crossPlat}`);
  }
  check('THE MINIMAL TRUTH POOL IS EXACT at all four levels: every sole-killed candidate forces its unique killer ' +
    'into any truth-reaching pool (lower bound = sole-killer prime count), and the greedy pool of exactly that size ' +
    'reaches truth (upper bound) — 4 = 4, 21 = 21, 88 = 88, 350 = 350',
    [11, 13, 17, 19].every(x => SP[x].soleIdx.length === SP[x].crossTruth && SP[x].crossTruth > 0));
  check('redundant killers exist at the big levels (killers minus sole: 0, 0, 2, 14) — "every killer is sole" was an ' +
    'artifact of the small levels',
    SP[11].killerIdx.length - SP[11].soleIdx.length === 0 && SP[13].killerIdx.length - SP[13].soleIdx.length === 0 &&
    SP[17].killerIdx.length - SP[17].soleIdx.length === 2 && SP[19].killerIdx.length - SP[19].soleIdx.length === 14);
  console.log(`  @11 killer set: {${SP[11].killerIdx.map(j => R[11].L.scour[j]).join(', ')}}; dead: {${SP[11].deadIdx.map(j => R[11].L.scour[j]).join(', ')}}`);
  console.log(`  @13 killer set: {${SP[13].killerIdx.map(j => R[13].L.scour[j]).join(', ')}}`);
  console.log(`  @17 dead set: ${SP[17].deadIdx.length} primes, all in the top tail (min ${R[17].L.scour[SP[17].deadIdx[0]]}, max ${R[17].L.scour[SP[17].deadIdx[SP[17].deadIdx.length - 1]]})`);
  console.log(`  @19 dead set: ${SP[19].deadIdx.length} primes, all in the top tail (min ${R[19].L.scour[SP[19].deadIdx[0]]}, max ${R[19].L.scour[SP[19].deadIdx[SP[19].deadIdx.length - 1]]})`);
  check('at the two big levels every dead prime lies in the top half of the scour (@17 all >= 421, @19 all >= 2003); ' +
    'at the small levels the dead set reaches the middle (@11 from 23, @13 from 83) — the tail cleans up as the level grows',
    [17, 19].every(x => SP[x].deadIdx.every(j => j >= R[x].n / 2)) &&
    R[11].L.scour[SP[11].deadIdx[0]] === 23 && R[13].L.scour[SP[13].deadIdx[0]] === 83);
  check('ascending truth-depth = index of the LARGEST killer prime (the ascending pool must walk to it): ' +
    '8th/28th/109th/410th scour prime at @11/@13/@17/@19',
    [11, 13, 17, 19].every(x => {
      const ki = SP[x].killerIdx; return R[x].ascTruth === ki[ki.length - 1] + 1;
    }));
  console.log('\n  4d. THE @11 KILL GRAPH IN FULL (9 incidences on 54 candidates), the smallest instance of the whole mechanism:');
  { // print candidate/killer pairs at @11 with values (re-enumerated; cheap)
    const r11 = R[11], spf11 = spfSieve(Math.floor((r11.L.W + 1) / r11.L.scour[0]));
    let printed = 0;
    for (let i = 0; i < r11.n; i++) {
      const q = r11.L.scour[i];
      for (let side = 0; side < 2; side++) {
        const t = Math.floor((r11.L.W + (side === 0 ? -1 : 1)) / q);
        const h1 = side === 0 ? 11 : 13, h2 = side === 0 ? 17 : 19;
        for (let m = 1; m <= t; m++) {
          if (!(m === 1 || spf11[m] >= q)) continue;
          const v = q * m, v30 = v % 30;
          if (v30 !== h1 && v30 !== h2) continue;
          let ok = true;
          for (const p of r11.L.wheel) { const bad = side === 0 ? p - 2 : 2; if (v % p === bad) { ok = false; break; } }
          if (!ok) continue;
          const kl = [];
          for (let j = 0; j < i; j++) {
            const q2 = r11.L.scour[j], r2 = v % q2, bad2 = side === 0 ? q2 - 2 : 2;
            if (r2 === 0 || r2 === bad2) kl.push(r11.L.scour[j]);
          }
          if (kl.length) {
            console.log(`      q = ${String(q).padStart(2)}, ${side === 0 ? 'A' : 'B'}-side v = ${String(v).padStart(4)}${m === 1 ? ' (self)' : `  (m = ${m})`}  killed by {${kl.join(', ')}}`);
            printed++;
          }
        }
      }
    }
    check('the @11 kill graph has exactly 9 incidences; the 4 killers are {13, 17, 19, 41} and the dead 6 are {23, 29, 31, 37, 43, 47}',
      printed === 9 && SP[11].killerIdx.map(j => R[11].L.scour[j]).join(',') === '13,17,19,41' &&
      SP[11].deadIdx.map(j => R[11].L.scour[j]).join(',') === '23,29,31,37,43,47');
  }
  console.log('\n  4e. THE SHADOW GUARANTEE (fold arithmetic DOES predict tail membership):');
  let shadowOK = 0, shadowTot = 0;
  for (const x of [11, 13, 17, 19]) {
    const rr = R[x], ss = SP[x], scourSet = new Set(rr.L.scour);
    const killerSet = new Set(ss.killerIdx.map(j => rr.L.scour[j]));
    const slotSet = new Set(rr.L.slots);
    for (const q of rr.L.scour) {
      if (!scourSet.has(q + 2)) continue;               // twin pair (q, q+2) in scour
      if (!slotSet.has(q)) continue;                    // self slot of q+2 is the comb slot q
      shadowTot++;
      if (killerSet.has(q)) shadowOK++;
    }
  }
  check(`shadow guarantee: whenever (q, q+2) are both scour and slot q is in the comb, q IS a killer ` +
    `(it must erase its twin's m = 1 ghost) — ${shadowOK}/${shadowTot} across all four levels, no exception`,
    shadowOK === shadowTot && shadowTot > 0);
  console.log(`
  THE K-SPEND RULE, stated.
  (1) VALUE IS DENSITY. A pool prime q' kills ~ c * 2/q' * (candidate mass
      above it), c = 0.50..0.53 measured, FLAT; smallest-first IS the greedy order
      through the whole useful range (identical floors through K = 15 at @17,
      within 11 floor units everywhere), and no prime overperforms the
      density model by more than ~1 kill. The @11 forcing ladder's "q = 13
      alone costs the adversary +4" is a fact about the ADVERSARIAL measure;
      in the cap-ladder measure the same prime is simply the densest.
  (2) SPEND NOTHING ON THE DEAD TAIL. 6/13/30/71 primes kill no admissible
      candidate (at @17/@19 all of them sit in the top half of the scour).
      Of ascending's truth-rungs, 21 of 109 at @17 and 60 of 410 at @19 go
      to primes outside the minimal pool — dead primes plus the few
      redundant killers.
  (3) THE TAIL OF THE SPEND IS FORCED, AND FORESEEABLE. Truth needs exactly
      the sole-killer primes (LB = UB at all four levels), and the shadow
      guarantee gives the fold-arithmetic membership rule: every twin partner
      whose twin's self slot survives the wheel is in the pool, no matter how
      large it is. Wheel-excluded self slots, by contrast, cost NO K at all:
      the unified family prices them out at K = 0 (that is the margin at
      depth 0, and it is where the whole classic-vs-unified gap starts).`);
}

// ============================================================================
console.log(`\nTOTAL RUNTIME ${elapsed()}`);
if (failures === 0) console.log('\nALL SELF-TESTS PASS');
else { console.log(`\n${failures} SELF-TEST FAILURE(S)`); process.exit(1); }

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-anchored-02-ladder17.js
//   invocation:  node research/attack-anchored-02-ladder17.js
//   code-sha256: 8beaf77950630495401cee70bee524ccde7094a343e9804c34a495c3d286304a
//   out-sha256:  48f4b859275bc528f2b4db381765072d953a8648bb51843c75f53e5d7e8fc6ee
//   body-lines:  346
//   inputs:      research/qc/widths.js@9bcca510a863
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     0.7 s
// ============================================================================
// SEC 0. CALIBRATION AT @11 AND @13 (abort on mismatch)
//   ok    @11: N = 90, truth = 45 [STC] (got 90, 45)
//   ok    @11: sum cap1 = 288, sum cap2 = 56, certified floor = 34 at K* = 0 [STC] (got 288, 56, 34, K*=0)
//   ok    @11: unified floor at K = 0 is 36, truth first at K = 8, classic plateau 41 [AA1] (got 36, 8, 41)
//   ok    @11: zero hard-cap violations, zero margin-identity violations, full-depth capU = fresh per prime
//   ok    @13: N = 990, truth = 307 [STC] (got 990, 307)
//   ok    @13: sum cap1 = 5052, sum cap2 = 880, certified floor = 110 at K* = 0 [STC] (got 5052, 880, 110, K*=0)
//   ok    @13: unified floor at K = 0 is 115, truth first at K = 28, classic plateau 296 [AA1] (got 115, 28, 296)
//   ok    @13: zero hard-cap violations, zero margin-identity violations, full-depth capU = fresh per prime
//   ok    witness replays: @11 -> 16, @13 -> 152 [ADV] (got 16, 152)
//   calibration complete [0.0 s]
//
// SEC 1. THE UNIFIED LADDER AT @17 (scour 120, N 14850)
//     ...candidate build 100/120 primes [0.0 s]
//   ok    @17: N = 14850, scour = 120 (19..709), truth = 3099 [STC] (got 14850, 120, 3099)
//   ok    @17: sum cap1 = 99729, sum cap2 = 16135, K* = 2, certified floor = 82 [STC] (got 99729, 16135, 2, 82)
//   ok    @17 zero hard-cap violations, zero margin-identity violations at all 121 depths x 120 primes; capU_full = fresh per prime
//
//   @17    K | classic sum -> floor | unified sum -> floor
//          0 |    16135 ->  -1285 |    16112 ->  -1262
//          1 |    15346 ->   -496 |    15320 ->   -470
//          2 |    14768 ->     82 |    14742 ->    108
//          3 |    14378 ->    472 |    14352 ->    498
//          4 |    14040 ->    810 |    14014 ->    836
//          5 |    13780 ->   1070 |    13754 ->   1096
//          6 |    13578 ->   1272 |    13551 ->   1299
//          7 |    13397 ->   1453 |    13370 ->   1480
//          8 |    13245 ->   1605 |    13218 ->   1632
//          9 |    13125 ->   1725 |    13098 ->   1752
//         10 |    13018 ->   1832 |    12991 ->   1859
//         11 |    12919 ->   1931 |    12892 ->   1958
//         12 |    12831 ->   2019 |    12804 ->   2046
//         13 |    12756 ->   2094 |    12728 ->   2122
//         14 |    12686 ->   2164 |    12658 ->   2192
//         15 |    12628 ->   2222 |    12600 ->   2250
//         16 |    12574 ->   2276 |    12546 ->   2304
//         17 |    12516 ->   2334 |    12488 ->   2362
//         18 |    12475 ->   2375 |    12447 ->   2403
//         19 |    12434 ->   2416 |    12405 ->   2445
//         20 |    12396 ->   2454 |    12367 ->   2483
//         21 |    12348 ->   2502 |    12318 ->   2532
//         22 |    12319 ->   2531 |    12289 ->   2561
//         23 |    12287 ->   2563 |    12257 ->   2593
//         24 |    12255 ->   2595 |    12225 ->   2625
//         25 |    12229 ->   2621 |    12199 ->   2651
//         26 |    12205 ->   2645 |    12174 ->   2676
//         27 |    12182 ->   2668 |    12151 ->   2699
//         28 |    12164 ->   2686 |    12133 ->   2717
//         29 |    12148 ->   2702 |    12117 ->   2733
//         30 |    12125 ->   2725 |    12094 ->   2756
//         31 |    12104 ->   2746 |    12073 ->   2777
//         32 |    12090 ->   2760 |    12059 ->   2791
//         33 |    12069 ->   2781 |    12038 ->   2812
//         34 |    12053 ->   2797 |    12022 ->   2828
//         35 |    12036 ->   2814 |    12005 ->   2845
//         36 |    12021 ->   2829 |    11989 ->   2861
//         37 |    12012 ->   2838 |    11980 ->   2870
//         38 |    12006 ->   2844 |    11973 ->   2877
//         39 |    11992 ->   2858 |    11959 ->   2891
//         40 |    11979 ->   2871 |    11946 ->   2904
//         41 |    11964 ->   2886 |    11931 ->   2919
//         42 |    11955 ->   2895 |    11921 ->   2929
//         43 |    11945 ->   2905 |    11911 ->   2939
//         44 |    11936 ->   2914 |    11902 ->   2948
//         45 |    11929 ->   2921 |    11895 ->   2955
//         46 |    11918 ->   2932 |    11884 ->   2966
//         47 |    11911 ->   2939 |    11877 ->   2973
//         48 |    11904 ->   2946 |    11870 ->   2980
//         49 |    11896 ->   2954 |    11862 ->   2988
//         50 |    11890 ->   2960 |    11856 ->   2994
//         51 |    11887 ->   2963 |    11853 ->   2997
//         52 |    11883 ->   2967 |    11849 ->   3001
//         53 |    11876 ->   2974 |    11841 ->   3009
//         54 |    11874 ->   2976 |    11839 ->   3011
//         55 |    11869 ->   2981 |    11834 ->   3016
//         56 |    11862 ->   2988 |    11827 ->   3023
//         57 |    11859 ->   2991 |    11823 ->   3027
//         58 |    11853 ->   2997 |    11817 ->   3033
//         59 |    11849 ->   3001 |    11813 ->   3037
//         60 |    11847 ->   3003 |    11811 ->   3039
//         61 |    11845 ->   3005 |    11809 ->   3041
//         62 |    11840 ->   3010 |    11803 ->   3047
//         63 |    11838 ->   3012 |    11801 ->   3049
//         64 |    11836 ->   3014 |    11799 ->   3051
//         65 |    11833 ->   3017 |    11796 ->   3054
//         66 |    11830 ->   3020 |    11793 ->   3057
//         67 |    11827 ->   3023 |    11790 ->   3060
//         68 |    11824 ->   3026 |    11787 ->   3063
//         69 |    11820 ->   3030 |    11783 ->   3067
//         70 |    11820 ->   3030 |    11783 ->   3067
//         71 |    11816 ->   3034 |    11779 ->   3071
//         72 |    11814 ->   3036 |    11777 ->   3073
//         73 |    11811 ->   3039 |    11774 ->   3076
//         74 |    11809 ->   3041 |    11772 ->   3078
//         75 |    11809 ->   3041 |    11772 ->   3078
//         76 |    11807 ->   3043 |    11769 ->   3081
//         77 |    11806 ->   3044 |    11768 ->   3082
//         78 |    11804 ->   3046 |    11766 ->   3084
//         79 |    11802 ->   3048 |    11764 ->   3086
//         80 |    11801 ->   3049 |    11763 ->   3087
//         81 |    11801 ->   3049 |    11763 ->   3087
//         82 |    11799 ->   3051 |    11760 ->   3090
//         83 |    11799 ->   3051 |    11760 ->   3090
//         84 |    11799 ->   3051 |    11760 ->   3090
//         85 |    11799 ->   3051 |    11760 ->   3090
//         86 |    11799 ->   3051 |    11760 ->   3090
//         87 |    11799 ->   3051 |    11760 ->   3090
//         88 |    11799 ->   3051 |    11760 ->   3090
//         89 |    11799 ->   3051 |    11760 ->   3090
//         90 |    11798 ->   3052 |    11759 ->   3091
//         91 |    11798 ->   3052 |    11758 ->   3092
//         92 |    11797 ->   3053 |    11757 ->   3093
//         93 |    11797 ->   3053 |    11757 ->   3093
//         94 |    11797 ->   3053 |    11757 ->   3093
//         95 |    11796 ->   3054 |    11756 ->   3094
//         96 |    11796 ->   3054 |    11756 ->   3094
//         97 |    11796 ->   3054 |    11756 ->   3094
//         98 |    11795 ->   3055 |    11755 ->   3095
//         99 |    11795 ->   3055 |    11755 ->   3095
//        100 |    11795 ->   3055 |    11755 ->   3095
//        101 |    11795 ->   3055 |    11755 ->   3095
//        102 |    11795 ->   3055 |    11755 ->   3095
//        103 |    11794 ->   3056 |    11754 ->   3096
//        104 |    11794 ->   3056 |    11754 ->   3096
//        105 |    11794 ->   3056 |    11754 ->   3096
//        106 |    11794 ->   3056 |    11753 ->   3097
//        107 |    11794 ->   3056 |    11753 ->   3097
//        108 |    11793 ->   3057 |    11752 ->   3098
//        109 |    11793 ->   3057 |    11751 ->   3099
//        110 |    11793 ->   3057 |    11751 ->   3099
//        111 |    11793 ->   3057 |    11751 ->   3099
//        112 |    11793 ->   3057 |    11751 ->   3099
//        113 |    11793 ->   3057 |    11751 ->   3099
//        114 |    11793 ->   3057 |    11751 ->   3099
//        115 |    11793 ->   3057 |    11751 ->   3099
//        116 |    11793 ->   3057 |    11751 ->   3099
//        117 |    11793 ->   3057 |    11751 ->   3099
//        118 |    11793 ->   3057 |    11751 ->   3099
//        119 |    11793 ->   3057 |    11751 ->   3099
//        120 |    11793 ->   3057 |    11751 ->   3099
//
//   @17 READINGS: floorU(0) = -1262 — VACUOUS (sum capU_0 = 16112 > N = 14850):
//   the K = 0 headline of @11/@13 (36 > 34, 115 > 110) does NOT survive to @17.
//   ok    @17 unified turns positive first at K = 2 (same rung as classic K* = 2), with floor 108 > 82 = classic certified floor
//   ok    @17 classic plateaus at 3057; unified passes the plateau at ascending K = 67 and reaches truth 3099 at ascending K = 109 of 120
//   Waste accounting @17: 58 allowances = 23 wheel-excluded self slots + 19 twin-collision
//   shadows + 16 fresh self-strikes; classic plateau 3057 = truth 3099 - 42.
//   ok    @17 waste identity closes on the digit: 58 - 16 = 42 = truth - plateau
//   ok    @17 margin at K = 0 equals the wheel-excluded count: sumC - sumU = 23 = 23
//   ok    @17 margin at full depth equals the waste: 42 = 42
//
// SEC 2. THE UNIFIED LADDER AT @19 (scour 435, N 252450)
//     ...candidate build 100/435 primes [0.4 s]
//     ...candidate build 200/435 primes [0.5 s]
//     ...candidate build 300/435 primes [0.5 s]
//     ...candidate build 400/435 primes [0.5 s]
//   ok    @19: N = 252450, scour = 435 (23..3109), truth = 38380 [STC] (got 252450, 435, 38380)
//   ok    @19: sum cap1 = 2025930, sum cap2 = 308401, K* = 10, certified floor = 1877 [STC] (got 2025930, 308401, 10, 1877)
//   ok    @19 zero hard-cap violations, zero margin-identity violations at all 436 depths x 435 primes; capU_full = fresh per prime
//
//   @19    K | classic sum -> floor | unified sum -> floor   (every K computed and asserted; selected rows printed)
//          0 |   308401 -> -55951 |   308315 -> -55865
//          1 |   295354 -> -42904 |   295262 -> -42812
//          2 |   286158 -> -33708 |   286061 -> -33611
//          3 |   278307 -> -25857 |   278207 -> -25757
//          4 |   272316 -> -19866 |   272214 -> -19764
//          5 |   267251 -> -14801 |   267145 -> -14695
//          6 |   262847 -> -10397 |   262738 -> -10288
//          7 |   258960 ->  -6510 |   258850 ->  -6400
//          8 |   255783 ->  -3333 |   255673 ->  -3223
//          9 |   253073 ->   -623 |   252963 ->   -513
//         10 |   250573 ->   1877 |   250463 ->   1987
//         11 |   248400 ->   4050 |   248290 ->   4160
//         12 |   246464 ->   5986 |   246353 ->   6097
//         13 |   244621 ->   7829 |   244510 ->   7940
//         14 |   242996 ->   9454 |   242885 ->   9565
//         15 |   241523 ->  10927 |   241412 ->  11038
//         16 |   240201 ->  12249 |   240090 ->  12360
//         17 |   239090 ->  13360 |   238979 ->  13471
//         18 |   238020 ->  14430 |   237908 ->  14542
//         19 |   237027 ->  15423 |   236915 ->  15535
//         20 |   236080 ->  16370 |   235967 ->  16483
//         25 |   232332 ->  20118 |   232218 ->  20232
//         30 |   229786 ->  22664 |   229672 ->  22778
//         35 |   227804 ->  24646 |   227689 ->  24761
//         40 |   226176 ->  26274 |   226060 ->  26390
//         45 |   224826 ->  27624 |   224709 ->  27741
//         50 |   223689 ->  28761 |   223572 ->  28878
//         55 |   222702 ->  29748 |   222584 ->  29866
//         60 |   221859 ->  30591 |   221740 ->  30710
//         65 |   221176 ->  31274 |   221056 ->  31394
//         70 |   220531 ->  31919 |   220411 ->  32039
//         75 |   219953 ->  32497 |   219832 ->  32618
//         80 |   219427 ->  33023 |   219306 ->  33144
//         85 |   218980 ->  33470 |   218858 ->  33592
//         90 |   218580 ->  33870 |   218457 ->  33993
//         95 |   218206 ->  34244 |   218083 ->  34367
//        100 |   217885 ->  34565 |   217762 ->  34688
//        125 |   216615 ->  35835 |   216490 ->  35960
//        150 |   215805 ->  36645 |   215676 ->  36774
//        175 |   215269 ->  37181 |   215137 ->  37313
//        200 |   214925 ->  37525 |   214791 ->  37659
//        225 |   214672 ->  37778 |   214535 ->  37915
//        250 |   214505 ->  37945 |   214365 ->  38085
//        275 |   214393 ->  38057 |   214249 ->  38201
//        300 |   214326 ->  38124 |   214177 ->  38273
//        325 |   214264 ->  38186 |   214110 ->  38340
//        350 |   214246 ->  38204 |   214090 ->  38360
//        375 |   214239 ->  38211 |   214082 ->  38368
//        400 |   214234 ->  38216 |   214073 ->  38377
//        405 |   214234 ->  38216 |   214073 ->  38377
//        410 |   214231 ->  38219 |   214070 ->  38380
//        415 |   214231 ->  38219 |   214070 ->  38380
//        420 |   214231 ->  38219 |   214070 ->  38380
//        430 |   214231 ->  38219 |   214070 ->  38380
//        435 |   214231 ->  38219 |   214070 ->  38380
//   ok    @19 unified positive first at K = 10 = classic K*, floor 1987 > 1877 = classic certified floor
//   ok    @19 classic plateaus at 38219; unified passes it at ascending K = 281, truth 38380 at ascending K = 410 of 435
//   Waste accounting @19: 213 allowances = 86 wheel-excluded + 75 shadows + 52 fresh-self;
//   plateau 38219 = truth 38380 - 161.
//   ok    @19 waste identity: 213 - 52 = 161; margins: K=0 -> 86 = wheel-excluded, full -> 161 = waste
//
// SEC 3. THE CHEAP-K TABLE ACROSS FOUR LEVELS, AND THE VERDICT
//   level  scour |  K*  K*/scour | floorC(K*) floorU(K*) margin | beat-plateau K: asc greedy  frac(greedy) | truth K: asc minimal frac(minimal)
//    @11     10 |   0  0.000   |       34        36     2 |               2     2     0.200    |        8      4    0.400
//    @13     34 |   0  0.000   |      110       115     5 |              15    14     0.412    |       28     21    0.618
//    @17    120 |   2  0.017   |       82       108    26 |              67    64     0.533    |      109     88    0.733
//    @19    435 |  10  0.023   |     1877      1987   110 |             281   273     0.628    |      410    350    0.805
//   ok    at every level the unified floor at the classic family's own K* beats the classic certified floor (margins +2, +5, +26, +110 at @11/@13/@17/@19)
//
//   Efficiency bands (floor gained per rung, ascending pool):
//    @11: to positivity (positive at K=0) per rung; positivity -> plateau-cross 3.5 per rung; plateau-cross -> truth 0.33 per rung
//    @13: to positivity (positive at K=0) per rung; positivity -> plateau-cross 12.2 per rung; plateau-cross -> truth 0.69 per rung
//    @17: to positivity 685 per rung; positivity -> plateau-cross 45.4 per rung; plateau-cross -> truth 0.93 per rung
//    @19: to positivity 5785 per rung; positivity -> plateau-cross 133.7 per rung; plateau-cross -> truth 1.22 per rung
//
//   VERDICT ON CHEAP K, in three tiers.
//   (i)  BEATING THE CLASSIC CERTIFIED FLOOR IS CHEAP. The whole cost is
//        positivity: K* rungs, and K* is the quarter-power band (K*/scour =
//        0.000, 0.000, 0.017, 0.023 here; the staircase note's K* law). At that
//        same K* the unified family is already past the classic certified
//        floor, with a margin that GROWS with level (+2, +5, +26, +110) —
//        by the PROVEN margin identity the lead at depth K equals the number
//        of allowances the classic family wastes there, which the level
//        manufactures (wheel-excluded fraction of allowances: 2/6, 5/17,
//        23/58, 86/213).
//   (ii) BEATING THE CLASSIC PLATEAU IS NOT CHEAP AND GETS DEARER: best
//        measured spend 2/10, 14/34, 64/120, 273/435 of the scour — the
//        fraction (0.20, 0.41, 0.53, 0.63) grows at every level. MEASURED.
//   (iii) TRUTH IS DEEP AND EXACTLY PRICED: minimal pools 4, 21, 88, 350
//        (0.40, 0.62, 0.73, 0.80 of scour), matching lower and upper bounds
//        (SEC 4). The depth-cost curve does not improve with level; it
//        worsens toward all-of-scour. anchored-01's open question is answered
//        NO for plateau-and-truth, YES for the family lead.
//
// SEC 4. THE K-SPEND RULE — WHERE A UNIT OF K BUYS MOST
//   4a. GREEDY vs ASCENDING at @17 (floor after K rungs):
//       K | greedy | ascending
//       1 |   -470 |   -470
//       2 |    108 |    108
//       3 |    498 |    498
//       5 |   1096 |   1096
//       8 |   1632 |   1632
//      10 |   1859 |   1859
//      15 |   2250 |   2250
//      20 |   2494 |   2483
//      30 |   2764 |   2756
//      50 |   2996 |   2994
//      64 |   3058 |   3051
//      67 |   3067 |   3060
//      80 |   3091 |   3087
//      88 |   3099 |   3090
//   ok    greedy = ascending exactly through K = 15 at @17 (first 15 picks ARE the 15 smallest pool primes, in order)
//   first 20 greedy picks @17: 19(+792) 23(+578) 29(+390) 31(+338) 37(+260) 41(+203) 43(+181) 47(+152) 53(+120) 59(+107) 61(+99) 67(+88) 71(+76) 73(+70) 79(+58) 89(+58) 83(+54) 107(+49) 101(+42) 97(+41)
//
//   4b. THE DENSITY MODEL. Killing power of pool prime q' vs the naive model
//       2/q' x (candidates above q'): measured/model ratio, first 12 primes @17:
//       q' =  19: kills  792, model  1531.5, ratio 0.52
//       q' =  23: kills  615, model  1158.4, ratio 0.53
//       q' =  29: kills  426, model   854.9, ratio 0.50
//       q' =  31: kills  382, model   745.9, ratio 0.51
//       q' =  37: kills  307, model   588.4, ratio 0.52
//       q' =  41: kills  253, model   502.3, ratio 0.50
//       q' =  43: kills  236, model   453.3, ratio 0.52
//       q' =  47: kills  202, model   394.2, ratio 0.51
//       q' =  53: kills  172, model   333.9, ratio 0.52
//       q' =  59: kills  145, model   287.6, ratio 0.50
//       q' =  61: kills  136, model   266.6, ratio 0.51
//       q' =  67: kills  118, model   233.2, ratio 0.51
//   ok    the spend is DENSITY-DRIVEN with a FLAT calibration constant: measured/model ratio sits in the band 0.50..0.53 for all 12 (no drift — the model is exact up to one constant ~ 0.5); kill counts strictly decrease over the first 12 primes
//   ok    no fold-arithmetic bonus set: the largest POSITIVE residual over the density model is 0.9 kill (vs first-pick gains in the hundreds) — no prime overperforms materially
//
//   4c. KILLER / DEAD / SOLE DECOMPOSITION (all four levels):
//       level scour killers dead sole  minimal-truth-pool = max(soleLB, ...) vs greedy   union-LB(plateau)
//        @11    10      4     6    4   LB    4 = greedy    4  EXACT          2 <= K <= 2
//        @13    34     21    13   21   LB   21 = greedy   21  EXACT         11 <= K <= 14
//        @17   120     90    30   88   LB   88 = greedy   88  EXACT         19 <= K <= 64
//        @19   435    364    71  350   LB  350 = greedy  350  EXACT         30 <= K <= 273
//   ok    THE MINIMAL TRUTH POOL IS EXACT at all four levels: every sole-killed candidate forces its unique killer into any truth-reaching pool (lower bound = sole-killer prime count), and the greedy pool of exactly that size reaches truth (upper bound) — 4 = 4, 21 = 21, 88 = 88, 350 = 350
//   ok    redundant killers exist at the big levels (killers minus sole: 0, 0, 2, 14) — "every killer is sole" was an artifact of the small levels
//   @11 killer set: {13, 17, 19, 41}; dead: {23, 29, 31, 37, 43, 47}
//   @13 killer set: {17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 97, 101, 107, 137, 139}
//   @17 dead set: 30 primes, all in the top tail (min 421, max 709)
//   @19 dead set: 71 primes, all in the top tail (min 2003, max 3109)
//   ok    at the two big levels every dead prime lies in the top half of the scour (@17 all >= 421, @19 all >= 2003); at the small levels the dead set reaches the middle (@11 from 23, @13 from 83) — the tail cleans up as the level grows
//   ok    ascending truth-depth = index of the LARGEST killer prime (the ascending pool must walk to it): 8th/28th/109th/410th scour prime at @11/@13/@17/@19
//
//   4d. THE @11 KILL GRAPH IN FULL (9 incidences on 54 candidates), the smallest instance of the whole mechanism:
//       q = 19, B-side v =   19 (self)  killed by {17}
//       q = 19, B-side v = 1159  (m = 61)  killed by {13}
//       q = 23, A-side v = 1817  (m = 79)  killed by {17}
//       q = 23, B-side v =  529  (m = 23)  killed by {17}
//       q = 29, A-side v = 2117  (m = 73)  killed by {13}
//       q = 31, A-side v = 1271  (m = 41)  killed by {19}
//       q = 37, A-side v = 1961  (m = 53)  killed by {13}
//       q = 41, B-side v = 2173  (m = 53)  killed by {13}
//       q = 43, B-side v =   43 (self)  killed by {41}
//   ok    the @11 kill graph has exactly 9 incidences; the 4 killers are {13, 17, 19, 41} and the dead 6 are {23, 29, 31, 37, 43, 47}
//
//   4e. THE SHADOW GUARANTEE (fold arithmetic DOES predict tail membership):
//   ok    shadow guarantee: whenever (q, q+2) are both scour and slot q is in the comb, q IS a killer (it must erase its twin's m = 1 ghost) — 76/76 across all four levels, no exception
//
//   THE K-SPEND RULE, stated.
//   (1) VALUE IS DENSITY. A pool prime q' kills ~ c * 2/q' * (candidate mass
//       above it), c = 0.50..0.53 measured, FLAT; smallest-first IS the greedy order
//       through the whole useful range (identical floors through K = 15 at @17,
//       within 11 floor units everywhere), and no prime overperforms the
//       density model by more than ~1 kill. The @11 forcing ladder's "q = 13
//       alone costs the adversary +4" is a fact about the ADVERSARIAL measure;
//       in the cap-ladder measure the same prime is simply the densest.
//   (2) SPEND NOTHING ON THE DEAD TAIL. 6/13/30/71 primes kill no admissible
//       candidate (at @17/@19 all of them sit in the top half of the scour).
//       Of ascending's truth-rungs, 21 of 109 at @17 and 60 of 410 at @19 go
//       to primes outside the minimal pool — dead primes plus the few
//       redundant killers.
//   (3) THE TAIL OF THE SPEND IS FORCED, AND FORESEEABLE. Truth needs exactly
//       the sole-killer primes (LB = UB at all four levels), and the shadow
//       guarantee gives the fold-arithmetic membership rule: every twin partner
//       whose twin's self slot survives the wheel is in the pool, no matter how
//       large it is. Wheel-excluded self slots, by contrast, cost NO K at all:
//       the unified family prices them out at K = 0 (that is the margin at
//       depth 0, and it is where the whole classic-vs-unified gap starts).
//
// TOTAL RUNTIME 0.6 s
//
// ALL SELF-TESTS PASS
// ============================================================================
// READINGS
//
