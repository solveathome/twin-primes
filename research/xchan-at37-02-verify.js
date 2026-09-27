// ============================================================================
// XCHAN-AT37 02 — VERIFY: the prereg scored as registered, and the surprising
// number recounted by an INDEPENDENT implementation
//
// The @37 census (research/xchan-at37-01-census.js, embedded 2026-08-21,
// out-sha256 6d83c928…) measured 1−J = 0.020823 — below EVERY prediction the
// sealed prereg (research/history/staging/xchan-at37-offset-prereg.md,
// committed alone at 21fca9f) registered, by ~100 slot-σ. This file does two
// jobs, in the order the discipline requires:
//
//  1. SCORES the prereg exactly as registered: every candidate's z on the
//     run's own slot-clustered σ, the registered |z| > 3 kill rule, P1, the
//     J-band clause, and the attack-sigma31-01 calibration bracket
//     [0.745, 2.293] beside each verdict. Pure arithmetic on registered
//     constants; every input is cited to an embedded OUTPUT block.
//
//  2. RECOUNTS the number with an implementation independent of the producer:
//     - marking by DIRECT MULTIPLE ENUMERATION in v-space (walk every
//       multiple of every prime, classify by m mod 30 tracked incrementally)
//       — no CRT residues, no modular inverse, no compressed-index stride;
//     - divisor lists hold the PRIME VALUE in Uint32, not an index into a
//       prime array — the index-alias class of the repaired 2026-08-21
//       census defect cannot exist here by construction;
//     - U[q] = floor(W/q) from BigInt division, exact, and compared entry
//       by entry against the producer's integer-corrected table;
//     - a deterministic 1-in-2^20 sample of triple classifications re-decided
//       in BigInt as q1·q2·q3 vs W, exact;
//     - C(K,3), W, N̄ recomputed in BigInt (the 87%-of-2^53 close call).
//     The engine is gated on the FULL @23 period against the natal-cap-39
//     reference (the same reference the producer's own gate uses), then run
//     on the contiguous prefix [0, 3e10) of the @37 period — 0.404% of
//     7,420,738,134,810 — and the producer's own unmodified kernel (loaded
//     from its file at run time, sliced above its DRIVER; census() reads W
//     only as kmax = W/30, so a doctored W restricts it to the same prefix)
//     is run on the identical range. Every returned field is compared
//     EXACTLY: slot count, B3 four-way split, sub/sup per class, per-slot
//     subtotals SX/SX2, maxima.
//
// Priced before the run (pilot at R = 3e8, this session): independent walker
// ~208 s at R = 3e10, producer kernel ~90 s, @23 gates ~2 s. Total ~6 min.
// The pilot prefix R = 3e8 agreed with the producer kernel on every field.
//
// Sources of every cited constant:
//   [CEN]  research/xchan-at37-01-census.js, embedded OUTPUT (@37 block)
//   [PRE]  research/history/staging/xchan-at37-offset-prereg.md (sealed)
//   [TRM]  research/attack-x-offset-01-terms.js, embedded OUTPUT
//   [SIG]  research/attack-sigma31-01.js via attack-sigma31-01.md (bracket)
//   [REF]  natal-cap-39-triple-census.js reference row, as carried verbatim
//          in the producer's own REF table
// ============================================================================
'use strict';
const T00 = Date.now();
const el = () => ((Date.now() - T00) / 1000).toFixed(1) + 's';
const say = (s) => process.stderr.write(s + '\n');
const f = (v, d = 6) => Number.isFinite(v) ? v.toFixed(d) : String(v);

// ---------------------------------------------------------------------------
// CITED CONSTANTS
// ---------------------------------------------------------------------------
const OBS  = 60388809837;      // [CEN] MIXED obs at @37
const CRT  = 61673023269.22;   // [CEN] CRT at @37 (= 6·N̄·miss, miss = 0.070749)
const O21  = 30194384326;      // [CEN] orientation (2,1)
const O12  = 30194425511;      // [CEN] orientation (1,2)
const INFL = 2.136;            // [CEN] printed slot-clustered inflation
const MISS = 0.070749;         // [CEN] = [TRM] exact tail mass — they agree
const NBAR = 145286237250;     // [CEN] counted = formula
const W37  = 7420738134810;    // [CEN]
const K37  = 198274;           // [CEN]
const C3_PRINTED = 1299090727729024;  // [CEN] C(K,3) line
const PRED = {                 // [PRE] §2 = [TRM] @37 predictions, frozen
  'N1  4S2':            0.021863,
  'C1  4S2-S3':         0.021785,
  'C2  4S2-2S3':        0.021707,
  'M-mult':             0.021759,
  'M-abs':              0.021744,
  'M-cS3':              0.021770,
  'M-ln':               0.021772};
const CONTEXT = {              // [TRM] REFUTED before @37, not carried by [PRE]
  'C4  4S2-4S3 (refuted @31)': 0.021552,
  'C8  4Sqq2   (refuted @31)': 0.021262};
const SIG_BRACKET = [0.745, 2.293];  // [SIG] σ_true/σ_reported 95% at @31
const PROJ_BAND = [8.44e-6, 8.64e-6];// [PRE] §2 projection band for σ_slot(37)
const S3_37 = 7.7833e-5;       // [TRM]
const F37 = 0.005642;          // [CEN] forced scale F at @37
const REF23 = {N: 5301450, B3: [879225, 2779604, 2779107, 879385],  // [REF]
  subAl: 1758610, subMx: 3751046, supMx: 1807665, o21: 904409, o12: 903256};

// ---------------------------------------------------------------------------
// PART 1 — THE PREREG, SCORED AS REGISTERED
// ---------------------------------------------------------------------------
console.log('XCHAN-AT37 02 — prereg scored as registered + independent prefix recount');
console.log('census: xchan-at37-01-census.js embedded OUTPUT; prereg sealed at 21fca9f\n');
console.log('===== PART 1: THE REGISTERED SCORE (prereg §3: z_c on the run\'s own σ_slot; |z|>3 KILLED)');
const om = 1 - OBS / CRT;
const sReg = Math.sqrt(OBS) / CRT;
const sSlot = sReg * INFL;     // the run's own σ_slot, reconstructed from its
                               // printed obs, CRT and inflation ×2.136; prints
                               // as 0.000009, matching the block's rounded line
console.log(`  measured 1−J = ${f(om, 9)}  (block prints 0.020823: ${om.toFixed(6) === '0.020823' ? 'consistent' : 'INCONSISTENT'})`);
console.log(`  σ_reg = √obs/CRT = ${sReg.toExponential(4)}   σ_slot = σ_reg×${INFL} = ${sSlot.toExponential(4)}`);
console.log(`  σ_slot vs prereg projection band [${PROJ_BAND[0].toExponential(2)}, ${PROJ_BAND[1].toExponential(2)}]: ${sSlot >= PROJ_BAND[0] && sSlot <= PROJ_BAND[1] ? 'INSIDE — the projection held' : 'OUTSIDE'}`);
console.log(`  calibration bracket carried beside every verdict [SIG]: σ_true/σ_reported ∈ [${SIG_BRACKET[0]}, ${SIG_BRACKET[1]}]\n`);
let survivors = [];
for (const [name, p] of Object.entries(PRED)) {
  const z = (om - p) / sSlot;
  const zLo = z / SIG_BRACKET[1], zHi = z / SIG_BRACKET[0];  // bracket reads
  const v = Math.abs(z) > 3 ? 'KILLED' : 'ALIVE';
  if (v === 'ALIVE') survivors.push(name);
  console.log(`  ${name.padEnd(12)} pred ${f(p)}   z = ${z.toFixed(1).padStart(7)}  -> ${v}   [bracket: z reads ${zLo.toFixed(1)} to ${zHi.toFixed(1)} — verdict ${Math.abs(zLo) > 3 ? 'unchanged at every calibration in the bracket' : 'CHANGES inside the bracket'}]`);
}
console.log(`\n  FAMILY VERDICT (registered rule): ${survivors.length === 0 ? 'NO SURVIVORS — every registered candidate is KILLED' : 'survivors: ' + survivors.join(', ')}`);
console.log('  prereg consequence clauses: "N1 survives" — NOT MET; "N1 killed and a');
console.log('  shrinking member survives" — NOT MET; "only M-abs survives" — NOT MET.');
console.log('  The sealed prereg has NO clause for an empty survivor set: outcome outside');
console.log('  every registered consequence.');
for (const [name, p] of Object.entries(CONTEXT)) {
  console.log(`  context (not scored, already refuted): ${name.padEnd(28)} z = ${((om - p) / sSlot).toFixed(1)}`);
}
console.log(`\n  J-BAND CLAUSE [PRE §3]: J = ${f(1 - om)} in (0.94, 1.00]: ${(1 - om) > 0.94 && (1 - om) <= 1.00 ? 'does NOT fire' : 'FIRES'}`);
console.log('  P1 [PRE §4]: aligned super-W obs = 0 at @37 in the census block: PASS (HIT)');
console.log('  GATE [PRE §3]: @23 reference ALL PASS and @31 reproduced digit-exact in the');
console.log('  census block, so the @37 value is reportable under the prereg.');
console.log(`  secondary [PRE §4] line ensemble at @37: NOT RUN by the census (registered as deferrable); no β(37) to read`);
console.log(`  Δ vs N1 = ${(PRED['N1  4S2'] - om).toExponential(4)} = ${((PRED['N1  4S2'] - om) / S3_37).toFixed(1)}·S3(37)   d = ${(100 * (om / PRED['N1  4S2'] - 1)).toFixed(2)}%   (1−J)/F = ${(om / F37).toFixed(4)}`);
console.log(`  orientation symmetry [CEN]: (2,1)−(1,2) = ${O21 - O12} of ${OBS} (${((O21 - O12) / Math.sqrt(OBS)).toFixed(1)}·√obs)`);

// ---------------------------------------------------------------------------
// PART 2 — EXACT-ARITHMETIC AUDIT (BigInt)
// ---------------------------------------------------------------------------
console.log('\n===== PART 2: EXACT-ARITHMETIC AUDIT');
{
  let Wb = 30n, Nb = 2n;
  for (const p of [7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n]) { Wb *= p; Nb *= p - 2n; }
  console.log(`  W = 30·7·…·37 = ${Wb} vs [CEN] ${W37}: ${Number(Wb) === W37 ? 'PASS' : 'FAIL'}`);
  console.log(`  N̄ = 2·∏(p−2) = ${Nb} vs [CEN] ${NBAR}: ${Number(Nb) === NBAR ? 'PASS' : 'FAIL'}`);
  const Kb = BigInt(K37), c3b = Kb * (Kb - 1n) * (Kb - 2n) / 6n;
  const c3f = K37 * (K37 - 1) * (K37 - 2) / 6;   // the float path the producer prints
  console.log(`  C(K,3) BigInt = ${c3b} vs printed ${C3_PRINTED}: ${Number(c3b) === C3_PRINTED ? 'PASS' : 'FAIL'}   float path = ${c3f}: ${c3f === Number(c3b) ? 'exact' : 'FLOAT PATH WRONG'}`);
  console.log(`  K(K−1)(K−2) = ${Kb * (Kb - 1n) * (Kb - 2n)} = ${(100 * Number(Kb * (Kb - 1n) * (Kb - 2n)) / 2 ** 53).toFixed(1)}% of 2^53 — the close call, verified exact at @37`);
  console.log(`  triple-product formation: the producer never forms q1·q2·q3; it compares q1·q2 vs U[q3]. max q1·q2 ≤ y² = ${2724079 ** 2} = ${(100 * 2724079 ** 2 / 2 ** 53).toExponential(2)}% of 2^53 — exact with 6 orders of margin`);
}

// ---------------------------------------------------------------------------
// THE INDEPENDENT ENGINE
// ---------------------------------------------------------------------------
function sieve(n) { const c = new Uint8Array(n + 1), o = [2]; for (let i = 3; i <= n; i += 2) { if (!c[i]) { o.push(i); for (let j = i * i; j <= n; j += 2 * i) c[j] = 1; } } return o; }
function buildLevel(x) {
  const all = sieve(3000000);
  const basePs = all.filter(p => p >= 7 && p <= x);
  let Wb = 30n; for (const p of basePs) Wb *= BigInt(p);
  const W = Number(Wb); if (!Number.isSafeInteger(W)) throw new Error('W not exact');
  const qs = all.filter(q => q > x && q * q <= W);
  const maxq = qs[qs.length - 1];
  const Uq = new Float64Array(maxq + 1);
  for (const q of qs) Uq[q] = Number(Wb / BigInt(q));      // exact floor, BigInt
  return { x, W, Wb, basePs, qs, K: qs.length, Uq, maxq };
}
const C3f = n => n < 3 ? 0 : n * (n - 1) * (n - 2) / 6, C2f = n => n < 2 ? 0 : n * (n - 1) / 2;
function indepCensus(L, R, SEGKV, tag) {
  const { basePs, qs, Uq, Wb } = L;
  if (R % 30 !== 0) throw new Error('R must be divisible by 30');
  const LCV = 12, SEGV = 30 * SEGKV;
  const nat = new Uint8Array(2 * SEGKV), ac = new Uint8Array(2 * SEGKV), bc = new Uint8Array(2 * SEGKV);
  const la = new Uint32Array(LCV * 2 * SEGKV), lb = new Uint32Array(LCV * 2 * SEGKV);
  let Nc = 0, sumA = 0, sumB = 0, maxA = 0, maxB = 0, SX = 0, SX2 = 0;
  const B3 = [0, 0, 0, 0], sub = [0, 0, 0, 0], sup = [0, 0, 0, 0];
  const A = new Float64Array(LCV), Bv = new Float64Array(LCV);
  let big = 0, bigBad = 0, tcnt = 0, maxT = 0;
  const nSeg = Math.ceil(R / SEGV);
  for (let s = 0; s < nSeg; s++) {
    const V0 = s * SEGV, V1 = Math.min(R, V0 + SEGV), Ms = 2 * ((V1 - V0) / 30);
    nat.fill(1, 0, Ms); ac.fill(0, 0, Ms); bc.fill(0, 0, Ms);
    for (const p of basePs) {                       // base kill: r≡0 and r≡−2 mod p
      let m = V0 + ((p - V0 % p) % p), mm = m % 30; const st = p % 30;
      for (; m < V1; m += p) {
        if (mm === 11) nat[((m - V0 - 11) / 30) * 2] = 0;
        else if (mm === 17) nat[((m - V0 - 17) / 30) * 2 + 1] = 0;
        else if (mm === 13) nat[((m - V0 - 13) / 30) * 2] = 0;
        else if (mm === 19) nat[((m - V0 - 19) / 30) * 2 + 1] = 0;
        mm += st; if (mm >= 30) mm -= 30;
      }
    }
    for (let qi = 0; qi < qs.length; qi++) {        // scour: a-side q|v, b-side q|v+2
      const q = qs[qi];
      let m = V0 + ((q - V0 % q) % q), mm = m % 30; const st = q % 30;
      for (; m < V1; m += q) {
        if (mm === 11) { const idx = ((m - V0 - 11) / 30) * 2; if (nat[idx]) { const c = ac[idx]++; if (c >= LCV) throw new Error('LCV'); la[LCV * idx + c] = q; } }
        else if (mm === 17) { const idx = ((m - V0 - 17) / 30) * 2 + 1; if (nat[idx]) { const c = ac[idx]++; if (c >= LCV) throw new Error('LCV'); la[LCV * idx + c] = q; } }
        else if (mm === 13) { const idx = ((m - V0 - 13) / 30) * 2; if (nat[idx]) { const c = bc[idx]++; if (c >= LCV) throw new Error('LCV'); lb[LCV * idx + c] = q; } }
        else if (mm === 19) { const idx = ((m - V0 - 19) / 30) * 2 + 1; if (nat[idx]) { const c = bc[idx]++; if (c >= LCV) throw new Error('LCV'); lb[LCV * idx + c] = q; } }
        mm += st; if (mm >= 30) mm -= 30;
      }
    }
    for (let idx = 0; idx < Ms; idx++) {
      if (!nat[idx]) continue;
      const av = ac[idx], bv = bc[idx]; Nc++; sumA += av; sumB += bv;
      if (av > maxA) maxA = av; if (bv > maxB) maxB = bv;
      B3[3] += C3f(av); B3[2] += C2f(av) * bv; B3[1] += av * C2f(bv); B3[0] += C3f(bv);
      if (av + bv < 3) continue;
      const base = LCV * idx;
      for (let i = 0; i < av; i++) A[i] = la[base + i];
      for (let i = 0; i < bv; i++) Bv[i] = lb[base + i];
      const mx0 = sup[2] + sup[1];
      for (let i = 0; i < av; i++) for (let j = i + 1; j < av; j++) {
        const t = A[i] * A[j]; if (t > maxT) maxT = t;
        for (let k = j + 1; k < av; k++) { tcnt++; const su = t > Uq[A[k]]; if (su) sup[3]++; else sub[3]++;
          if ((tcnt & 1048575) === 0) { big++; if (su !== (BigInt(A[i]) * BigInt(A[j]) * BigInt(A[k]) > Wb)) bigBad++; } }
        for (let k = 0; k < bv; k++) { tcnt++; const su = t > Uq[Bv[k]]; if (su) sup[2]++; else sub[2]++;
          if ((tcnt & 1048575) === 0) { big++; if (su !== (BigInt(A[i]) * BigInt(A[j]) * BigInt(Bv[k]) > Wb)) bigBad++; } }
      }
      for (let i = 0; i < bv; i++) for (let j = i + 1; j < bv; j++) {
        const t = Bv[i] * Bv[j]; if (t > maxT) maxT = t;
        for (let k = j + 1; k < bv; k++) { tcnt++; const su = t > Uq[Bv[k]]; if (su) sup[0]++; else sub[0]++;
          if ((tcnt & 1048575) === 0) { big++; if (su !== (BigInt(Bv[i]) * BigInt(Bv[j]) * BigInt(Bv[k]) > Wb)) bigBad++; } }
        for (let k = 0; k < av; k++) { tcnt++; const su = t > Uq[A[k]]; if (su) sup[1]++; else sub[1]++;
          if ((tcnt & 1048575) === 0) { big++; if (su !== (BigInt(Bv[i]) * BigInt(Bv[j]) * BigInt(A[k]) > Wb)) bigBad++; } }
      }
      const xs = sup[2] + sup[1] - mx0; SX += xs; SX2 += xs * xs;
    }
    if (nSeg >= 16 && s % Math.ceil(nSeg / 16) === 0) say(`      ${tag} seg ${s + 1}/${nSeg}  [${el()}]`);
  }
  return { Nc, sumA, sumB, maxA, maxB, B3, sub, sup, SX, SX2, big, bigBad, tcnt, maxT };
}

// ---------------------------------------------------------------------------
// THE PRODUCER'S OWN KERNEL, loaded unmodified from its file at run time
// ---------------------------------------------------------------------------
const fs = require('fs'), path = require('path');
const CEN_PATH = path.resolve(__dirname, 'xchan-at37-01-census.js');
const cenSrc = fs.readFileSync(CEN_PATH, 'utf8');
const cutAt = cenSrc.indexOf('const ARG=process.argv');
if (cutAt < 0) throw new Error('producer DRIVER marker not found');
const KERNEL = new Function(cenSrc.slice(0, cutAt) + '\nreturn {level, census};')();

// ---------------------------------------------------------------------------
// PART 3 — ENGINE GATES ON THE FULL @23 PERIOD vs the natal-cap-39 reference
// ---------------------------------------------------------------------------
console.log('\n===== PART 3: ENGINE GATES — full @23 period vs natal-cap-39 [REF]');
function gate23(name, g) {
  const chk = [['N', g.Nc, REF23.N],
    ['B3(3,0)', g.B3[3], REF23.B3[0]], ['B3(2,1)', g.B3[2], REF23.B3[1]],
    ['B3(1,2)', g.B3[1], REF23.B3[2]], ['B3(0,3)', g.B3[0], REF23.B3[3]],
    ['sub aligned', g.sub[3] + g.sub[0], REF23.subAl], ['sub mixed', g.sub[2] + g.sub[1], REF23.subMx],
    ['sup aligned', g.sup[3] + g.sup[0], 0], ['sup mixed', g.sup[2] + g.sup[1], REF23.supMx],
    ['(2,1)', g.sup[2], REF23.o21], ['(1,2)', g.sup[1], REF23.o12]];
  let bad = 0;
  for (const [nm, got, want] of chk) if (got !== want) { bad++; console.log(`    MISMATCH ${nm}: got ${got}, want ${want}`); }
  console.log(`  ${name}: ${chk.length} figures vs [REF]: ${bad === 0 ? 'ALL PASS' : bad + ' FAIL'}`);
  return bad;
}
let gateBad = 0;
{
  const L23i = buildLevel(23);
  gateBad += gate23('independent engine  ', indepCensus(L23i, L23i.W, 1 << 20, '@23-indep'));
  const L23p = KERNEL.level(23);
  const g = KERNEL.census(L23p, 1 << 20);
  gateBad += gate23('producer kernel via harness', { Nc: g.Nc, B3: g.B3, sub: g.sub, sup: g.sup });
  console.log(`  [${el()}]`);
}
if (gateBad > 0) throw new Error('an engine gate failed: the @37 prefix comparison would be meaningless');

// ---------------------------------------------------------------------------
// PART 4 — THE @37 PREFIX RECOUNT, both implementations, compared exactly
// ---------------------------------------------------------------------------
const R = 3e10;                 // contiguous prefix [0, 3e10): 1e9 slots-pairs,
                                // 0.4043% of the period; priced ~208 s + ~90 s
console.log(`\n===== PART 4: THE @37 PREFIX RECOUNT — [0, ${R}) = ${(100 * R / W37).toFixed(4)}% of the period`);
const Li = buildLevel(37);
console.log(`  independent level build: K = ${Li.K} (want ${K37}: ${Li.K === K37 ? 'PASS' : 'FAIL'}), y = ${Li.maxq} (want 2724079: ${Li.maxq === 2724079 ? 'PASS' : 'FAIL'})   [${el()}]`);
const Lp = KERNEL.level(37);
{ // U-table audit: producer's integer-corrected division vs BigInt floor, all K
  let uBad = 0;
  for (let m = 0; m < Lp.K; m++) if (Lp.U[m] !== Li.Uq[Lp.qs[m]]) uBad++;
  console.log(`  U-TABLE AUDIT: producer's ${Lp.K} integer-corrected U[m] vs BigInt floor(W/q): ${uBad === 0 ? 'ALL EQUAL' : uBad + ' DIFFER'}`);
  if (uBad > 0) throw new Error('U tables differ');
}
say(`  independent walker starts  [${el()}]`);
const tI0 = Date.now();
const CI = indepCensus(Li, R, 1 << 20, '@37-indep');
const tI = (Date.now() - tI0) / 1000;
console.log(`  independent walker: ${tI.toFixed(1)}s   BigInt classification sample: ${CI.big} triples re-decided exactly, ${CI.bigBad} disagree${CI.bigBad === 0 ? ' (PASS)' : ' (FAIL)'}`);
console.log(`  max q1·q2 formed = ${CI.maxT} = ${(100 * CI.maxT / 2 ** 53).toExponential(2)}% of 2^53`);
say(`  producer kernel starts  [${el()}]`);
const tP0 = Date.now();
const CP = KERNEL.census({ ...Lp, W: R }, 1 << 20);   // census() reads W only as kmax=W/30
const tP = (Date.now() - tP0) / 1000;
console.log(`  producer kernel (unmodified, W-restricted): ${tP.toFixed(1)}s`);
// ---- the exact comparison
const rows = [
  ['natal slots Nc', CI.Nc, CP.Nc],
  ['B3(3,0)', CI.B3[3], CP.B3[3]], ['B3(2,1)', CI.B3[2], CP.B3[2]],
  ['B3(1,2)', CI.B3[1], CP.B3[1]], ['B3(0,3)', CI.B3[0], CP.B3[0]],
  ['sub(3,0)', CI.sub[3], CP.sub[3]], ['sub(2,1)', CI.sub[2], CP.sub[2]],
  ['sub(1,2)', CI.sub[1], CP.sub[1]], ['sub(0,3)', CI.sub[0], CP.sub[0]],
  ['sup(3,0) aligned', CI.sup[3], CP.sup[3]], ['sup(2,1)', CI.sup[2], CP.sup[2]],
  ['sup(1,2)', CI.sup[1], CP.sup[1]], ['sup(0,3) aligned', CI.sup[0], CP.sup[0]],
  ['per-slot ΣX (=mixed obs)', CI.SX, CP.SX], ['per-slot ΣX²', CI.SX2, CP.SX2],
  ['max |D_a|', CI.maxA, CP.maxA], ['max |D_b|', CI.maxB, CP.maxB]];
let diff = 0;
console.log('  field                        independent            producer-kernel        verdict');
for (const [nm, a, b] of rows) {
  const ok = a === b; if (!ok) diff++;
  console.log(`  ${nm.padEnd(26)} ${String(a).padStart(18)}   ${String(b).padStart(18)}   ${ok ? 'EQUAL' : '*** DIVERGE ***'}`);
}
const obsI = CI.sup[2] + CI.sup[1];
console.log(`\n  prefix mixed super-W obs = ${obsI}   (aligned super-W = ${CI.sup[3] + CI.sup[0]}, P1 holds on the prefix)`);
console.log(`  scale check (informative, not a gate): prefix obs / (full obs × R/W) = ${(obsI / (OBS * R / W37)).toFixed(4)}`);
console.log(`  independent kill-mark totals over natal slots (no producer counterpart returned): Σa = ${CI.sumA}, Σb = ${CI.sumB}`);
console.log(`  accumulator ceilings this run: ΣX² = ${CI.SX2} = ${(100 * CI.SX2 / 2 ** 53).toExponential(2)}% of 2^53; triple tests = ${CI.tcnt}`);
console.log(`\n  >>> RECOUNT VERDICT: ${diff === 0 ? 'BYTE-EXACT AGREEMENT on all ' + rows.length + ' fields over the contiguous prefix — the counting is right and the @37 number stands' : diff + ' FIELD(S) DIVERGE — the census number is NOT confirmed; localize before any interpretation'}`);
console.log(`\n[total ${el()}]`);
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/xchan-at37-02-verify.js
//   invocation:  node research/xchan-at37-02-verify.js
//   code-sha256: f57889cff12d86c364fcffba3194bef43d73e31c1a2859944be8ed819cbdc334
//   out-sha256:  770c04172324a32c82f8f96a673174602c2a3ccee503c9e4fe01666568cd459f
//   body-lines:  113
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     335.1 s
// ============================================================================
// XCHAN-AT37 02 — prereg scored as registered + independent prefix recount
// census: xchan-at37-01-census.js embedded OUTPUT; prereg sealed at 21fca9f
//
// ===== PART 1: THE REGISTERED SCORE (prereg §3: z_c on the run's own σ_slot; |z|>3 KILLED)
//   measured 1−J = 0.020822936  (block prints 0.020823: consistent)
//   σ_reg = √obs/CRT = 3.9846e-6   σ_slot = σ_reg×2.136 = 8.5111e-6
//   σ_slot vs prereg projection band [8.44e-6, 8.64e-6]: INSIDE — the projection held
//   calibration bracket carried beside every verdict [SIG]: σ_true/σ_reported ∈ [0.745, 2.293]
//
//   N1  4S2      pred 0.021863   z =  -122.2  -> KILLED   [bracket: z reads -53.3 to -164.0 — verdict unchanged at every calibration in the bracket]
//   C1  4S2-S3   pred 0.021785   z =  -113.0  -> KILLED   [bracket: z reads -49.3 to -151.7 — verdict unchanged at every calibration in the bracket]
//   C2  4S2-2S3  pred 0.021707   z =  -103.9  -> KILLED   [bracket: z reads -45.3 to -139.4 — verdict unchanged at every calibration in the bracket]
//   M-mult       pred 0.021759   z =  -110.0  -> KILLED   [bracket: z reads -48.0 to -147.6 — verdict unchanged at every calibration in the bracket]
//   M-abs        pred 0.021744   z =  -108.2  -> KILLED   [bracket: z reads -47.2 to -145.3 — verdict unchanged at every calibration in the bracket]
//   M-cS3        pred 0.021770   z =  -111.3  -> KILLED   [bracket: z reads -48.5 to -149.4 — verdict unchanged at every calibration in the bracket]
//   M-ln         pred 0.021772   z =  -111.5  -> KILLED   [bracket: z reads -48.6 to -149.7 — verdict unchanged at every calibration in the bracket]
//
//   FAMILY VERDICT (registered rule): NO SURVIVORS — every registered candidate is KILLED
//   prereg consequence clauses: "N1 survives" — NOT MET; "N1 killed and a
//   shrinking member survives" — NOT MET; "only M-abs survives" — NOT MET.
//   The sealed prereg has NO clause for an empty survivor set: outcome outside
//   every registered consequence.
//   context (not scored, already refuted): C4  4S2-4S3 (refuted @31)    z = -85.7
//   context (not scored, already refuted): C8  4Sqq2   (refuted @31)    z = -51.6
//
//   J-BAND CLAUSE [PRE §3]: J = 0.979177 in (0.94, 1.00]: does NOT fire
//   P1 [PRE §4]: aligned super-W obs = 0 at @37 in the census block: PASS (HIT)
//   GATE [PRE §3]: @23 reference ALL PASS and @31 reproduced digit-exact in the
//   census block, so the @37 value is reportable under the prereg.
//   secondary [PRE §4] line ensemble at @37: NOT RUN by the census (registered as deferrable); no β(37) to read
//   Δ vs N1 = 1.0401e-3 = 13.4·S3(37)   d = -4.76%   (1−J)/F = 3.6907
//   orientation symmetry [CEN]: (2,1)−(1,2) = -41185 of 60388809837 (-0.2·√obs)
//
// ===== PART 2: EXACT-ARITHMETIC AUDIT
//   W = 30·7·…·37 = 7420738134810 vs [CEN] 7420738134810: PASS
//   N̄ = 2·∏(p−2) = 145286237250 vs [CEN] 145286237250: PASS
//   C(K,3) BigInt = 1299090727729024 vs printed 1299090727729024: PASS   float path = 1299090727729024: exact
//   K(K−1)(K−2) = 7794544366374144 = 86.5% of 2^53 — the close call, verified exact at @37
//   triple-product formation: the producer never forms q1·q2·q3; it compares q1·q2 vs U[q3]. max q1·q2 ≤ y² = 7420606398241 = 8.24e-2% of 2^53 — exact with 6 orders of margin
//
// ===== PART 3: ENGINE GATES — full @23 period vs natal-cap-39 [REF]
//   independent engine  : 11 figures vs [REF]: ALL PASS
//   producer kernel via harness: 11 figures vs [REF]: ALL PASS
//   [1.7s]
//
// ===== PART 4: THE @37 PREFIX RECOUNT — [0, 30000000000) = 0.4043% of the period
//   independent level build: K = 198274 (want 198274: PASS), y = 2724079 (want 2724079: PASS)   [1.7s]
//   U-TABLE AUDIT: producer's 198274 integer-corrected U[m] vs BigInt floor(W/q): ALL EQUAL
//   independent walker: 251.4s   BigInt classification sample: 1753 triples re-decided exactly, 0 disagree (PASS)
//   max q1·q2 formed = 29999999987 = 3.33e-4% of 2^53
//   producer kernel (unmodified, W-restricted): 81.9s
//   field                        independent            producer-kernel        verdict
//   natal slots Nc                      587352241            587352241   EQUAL
//   B3(3,0)                             177202571            177202571   EQUAL
//   B3(2,1)                             742021562            742021562   EQUAL
//   B3(1,2)                             742004999            742004999   EQUAL
//   B3(0,3)                             177204077            177204077   EQUAL
//   sub(3,0)                            177202571            177202571   EQUAL
//   sub(2,1)                            619592072            619592072   EQUAL
//   sub(1,2)                            619568547            619568547   EQUAL
//   sub(0,3)                            177204077            177204077   EQUAL
//   sup(3,0) aligned                            0                    0   EQUAL
//   sup(2,1)                            122429490            122429490   EQUAL
//   sup(1,2)                            122436452            122436452   EQUAL
//   sup(0,3) aligned                            0                    0   EQUAL
//   per-slot ΣX (=mixed obs)            244865942            244865942   EQUAL
//   per-slot ΣX²                        803088584            803088584   EQUAL
//   max |D_a|                                   6                    6   EQUAL
//   max |D_b|                                   6                    6   EQUAL
//
//   prefix mixed super-W obs = 244865942   (aligned super-W = 0, P1 holds on the prefix)
//   scale check (informative, not a gate): prefix obs / (full obs × R/W) = 1.0030
//   independent kill-mark totals over natal slots (no producer counterpart returned): Σa = 801421249, Σb = 801420449
//   accumulator ceilings this run: ΣX² = 803088584 = 8.92e-6% of 2^53; triple tests = 1838433209
//
//   >>> RECOUNT VERDICT: BYTE-EXACT AGREEMENT on all 17 fields over the contiguous prefix — the counting is right and the @37 number stands
//
// [total 335.0s]
// ───── stderr ─────
//   independent walker starts  [1.7s]
//       @37-indep seg 1/954  [2.0s]
//       @37-indep seg 61/954  [13.9s]
//       @37-indep seg 121/954  [28.3s]
//       @37-indep seg 181/954  [43.2s]
//       @37-indep seg 241/954  [58.1s]
//       @37-indep seg 301/954  [73.0s]
//       @37-indep seg 361/954  [88.0s]
//       @37-indep seg 421/954  [103.2s]
//       @37-indep seg 481/954  [121.0s]
//       @37-indep seg 541/954  [137.1s]
//       @37-indep seg 601/954  [152.7s]
//       @37-indep seg 661/954  [171.5s]
//       @37-indep seg 721/954  [188.3s]
//       @37-indep seg 781/954  [205.2s]
//       @37-indep seg 841/954  [221.8s]
//       @37-indep seg 901/954  [238.7s]
//   producer kernel starts  [253.1s]
//       seg 1/954  [253.2s]
//       seg 61/954  [258.2s]
//       seg 121/954  [263.4s]
//       seg 181/954  [268.4s]
//       seg 241/954  [273.6s]
//       seg 301/954  [278.7s]
//       seg 361/954  [283.9s]
//       seg 421/954  [289.0s]
//       seg 481/954  [294.2s]
//       seg 541/954  [299.5s]
//       seg 601/954  [304.7s]
//       seg 661/954  [309.8s]
//       seg 721/954  [314.9s]
//       seg 781/954  [320.0s]
//       seg 841/954  [325.2s]
//       seg 901/954  [330.4s]
// ============================================================================
// READINGS
//
// 1. THE REGISTERED VERDICT IS "NO SURVIVORS". Scored exactly as the sealed
//    prereg registers it (z on the run's own slot-clustered σ, |z| > 3
//    KILLED), all seven candidates die at |z| = 104-122, and the
//    attack-sigma31-01 calibration bracket [0.745, 2.293] moves the weakest
//    reading to 45σ without changing a single verdict. The prereg's three
//    consequence clauses each presuppose at least one survivor; none is met,
//    and the J-band clause does not fire (J = 0.979177). The outcome is
//    outside the registered decision tree.
//
// 2. THE INSTRUMENT HELD; THE WORLD MOVED. The run's own σ_slot (8.511e-6)
//    lands inside the prereg's projection band [8.44e-6, 8.64e-6], the @23
//    gate and the @31 digit-exact reproduction are green, P1 holds, and the
//    exact tail mass equals the registered value. Nothing about the error
//    machinery failed: the measurement fell ~122 of those σ below the
//    nearest candidate.
//
// 3. THE NUMBER SURVIVES AN INDEPENDENT RECOUNT. A from-scratch
//    implementation - multiple-walk marking in v-space with incremental
//    mod-30 classification, prime-VALUE divisor lists (the index-alias class
//    of the repaired census defect cannot exist in it), BigInt-exact U and
//    sampled BigInt triple classification - reproduces the natal-cap-39 @23
//    reference on all 11 figures and agrees with the producer's own
//    unmodified kernel on all 17 compared fields over the contiguous prefix
//    [0, 3e10), including the prefix's mixed super-W obs = 244865942. The
//    2^53 close calls are audited exact: C(K,3) at 86.5% of 2^53, and the
//    U-test never forms a triple product.
//
// 4. THE RESIDUAL GREW NINE-FOLD IN ONE LEVEL. Delta = 4S2 - (1-J) was
//    +1.20e-4 and +1.19e-4 at the two sharp levels and is +1.04e-3 = 13.4
//    S3(37) at @37 - below the entire priced family, including the two
//    members already refuted at @31 for subtracting too much. The scoring
//    record and the interpretation through the surplus/deficit split live in
//    research/history/staging/xchan-at37-score.md.
