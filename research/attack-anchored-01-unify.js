'use strict';
// ============================================================================
// ATTACK ANCHORED-01 — UNIFYING THE MIRROR-SWEEP LEMMA WITH COFACTOR RIGIDITY
// AT @11, WHERE THE EXACT ADVERSARIAL WITNESS IS KNOWN (2026-08-20)
// ============================================================================
//
// QUESTION (Chris's frame, banked in TODO's TOP ATTACK). The origin is SPARSE
// (survival-curve minimum; Route B closed — no density arguments here) but
// MECHANICALLY FORCED. advmin@11 = 16 exact (two disjoint proof stacks) sits
// 18 BELOW the staircase's certified anchored floor 34, so per the corrected
// quantifier (redteam-0820-structural.md §2d) only anchored-aware caps — caps
// whose CONCLUSION reads the chosen classes — remain live for closing floor
// toward truth (45 @11). First move: put the three proven mechanics side by
// side at @11 — Cofactor Rigidity (staircase-note Lemma 1: anchored strikes
// are divisibility, cofactors rough), the Mirror-Sweep Lemma (holesweep §4:
// a |-> w-a covariance, w = W mod p), and the birth-canal one-sidedness (the
// edge slot's licensed asymmetry) — then test every candidate composition
// against the adversarial witness, which any anchored floor must survive.
//
// WHAT THIS SCRIPT DOES, section by section.
//  SEC 0  Calibration against four embedded artifacts; ABORT on any mismatch.
//  SEC 1  The mechanism table at @11: exactly what each mechanic forces.
//  SEC 2  The mirror in class space: covariance proven-and-verified, the
//         shard-row palindrome, the witness's mirror twin, symmetrization.
//  SEC 3  THE MAIN COMPOSITION — the unified ladder: fold the self-strike
//         into the cofactor injection (m >= 1) so the s(q) allowance
//         disappears; classic vs unified floors at every depth K, @11 and @13.
//  SEC 4  Witness-side (DOA) tests: every floor family instantiated at the
//         witness's classes, slot by slot; the rigidity-free control.
//  SEC 5  The forcing ladder: advmin with the first j primes anchored,
//         j = 0..10 — the exact price of the anchoring, prime by prime.
//  SEC 6  The x = 37 secondary: w-ladder, specials, seam configuration at
//         fold 31->37 against the whole ladder, from cited embedded curves.
//
// THE UNIFIED-CAP LEMMA (proved here; the one new mathematical step).
//   In staircase-note Theorem 3 / Proposition 7 the self-strike is handled by
//   the additive allowance s(q) = [q mod 30 in {11,13,17,19}]. But the
//   injections r |-> r/q (A-side) and r |-> (r+2)/q (B-side) extend verbatim
//   to m = 1: a self-strike IS the m = 1 case (r = q on the A-side when
//   q = 11,17 mod 30; r+2 = q on the B-side when q = 13,19 mod 30), P^-(m)
//   is vacuous at m = 1, and the side conditions + depth-K freshness
//   conditions apply to v = q unchanged. So define
//     capU_K(q) = #A_K(m>=1) + #B_K(m>=1)      (no s(q) term).
//   Then fresh(q) <= capU_K(q) <= cap_K(q) for every K: the first inequality
//   is Theorem 3's proof with the m = 1 case admitted (every fresh strike,
//   self or not, lands in exactly one side's admissible set, injectively);
//   the second holds since the m = 1 term passes its side conditions only if
//   q sits in a residue class with s(q) = 1. The gain: the m = 1 term also
//   READS the comb and freshness conditions, so the two blind spots of s(q)
//   are priced out — (a) WHEEL-EXCLUDED SELF SLOTS (v = q fails a comb
//   congruence: the slot never existed; @11: q = 13, whose slot 11 is
//   0 mod 11, and q = 47, whose slot 47 is 5 mod 7) and (b) TWIN-COLLISION
//   SHADOWS (q and q-2 both scour: one self slot, two allowances; freshness
//   modulus q-2 removes the shadow: @11: q = 19 and 43). At full depth
//   capU(q) = fresh(q) EXACTLY (the injection becomes a bijection), so the
//   floor equals the truth — asserted per prime below.
//
// PREDICTIONS, registered from the derivation + a scratch prototype before
// this embedded run: @11 unified floors 36 (K=0) rising to 45 = truth
// (first at K=8); classic plateaus at 41. @13: 115 (K=0) to 307 = truth;
// classic plateaus at 296. Forcing ladder @11: 16,20,20,22,23,25,30,35,38,
// 42,45. (An earlier hand-derivation said 35 at K=0 — wrong, it missed that
// 13's self slot 11 is wheel-excluded at @11; recorded per house rule.)
//
// HONEST DOUBT, up front.
//  (1) At full depth the unified cap per prime EQUALS the march's fresh
//      count — the "cap" family degenerates into the march exactly as
//      staircase-note §7 predicts for cap_inf. The non-trivial content is
//      the finite-K curve (36 already beats 34 at K = 0, where nothing is
//      march-like) and the exact characterization at the top. Nothing here
//      claims a cheap certificate for the truth.
//  (2) The floors here read the classes (freshness conditions quote the
//      smaller primes' {0,-2}; the cofactor parametrization exists ONLY at
//      divisibility classes). That is what lets them exceed the class-blind
//      ceiling 16 — and it is also why none of this touches the class-
//      quantified-uniform family, which stays DEAD (REFUTED.md).
//  (3) The B&B in SEC 5 uses a proven union bound only, no monotonicity
//      assumption; it is calibrated against three externally certified
//      numbers (advmin=16 two stacks; shard row a=0 -> 20; anchored 45)
//      and aborts on mismatch. Still: one engine, one author — HELD.
//  (4) Quoted constants (witness vectors, shard row, staircase sums, the
//      holesweep curves) are inputs cited from embedded artifacts, per the
//      standing compute rule; each is named with its source at the CITED
//      block, and every derived cross-check on them is asserted.
//
// Usage: node research/attack-anchored-01-unify.js        (~2 s, one process)
// ============================================================================

// ------------------------------------------------------------- cited inputs
// Every constant below is quoted from a formally embedded artifact (standing
// compute rule: cite, do not recompute). Sources:
//   [ADV]  research/attack-advmin-1113.js embedded OUTPUT (219 s run) and its
//          report research/history/staging/attack-advmin-1113.md; re-proven
//          independently in redteam-0820-structural.md §2a.
//   [STC]  paper/staircase-note.md, Cor 4 / Thm 8 table (producer
//          research/natal-cap-08-staircase.js, 599 caps asserted).
//   [HSW]  research/attack-0c-holesweep-01.js embedded OUTPUT (617.9 s run),
//          SEC 1/3/4 per-copy curves; six 31->37 values independently
//          replayed in redteam-0820-structural.md §1d.
//   [LAD]  research/a144311-full-ladder.js and research/external-ladders-01.js
//          embedded OUTPUT (the x = 37 instrument readings).
const CITED = {
  witness11: [10, 4, 14, 15, 24, 17, 34, 39, 10, 40],          // [ADV] q=13..47
  witness13: [16, 14, 14, 28, 28, 9, 21, 19, 18, 18, 54, 31, 19, 17, 33, 27,
    39, 21, 1, 34, 57, 78, 27, 90, 15, 40, 8, 29, 94, 56, 20, 153, 22, 48],
  advmin11: 16, advmin13Bracket: [21, 152],                     // [ADV]
  shard13row: [20, 17, 18, 18, 18, 18, 18, 18, 17, 20, 16, 21, 16], // [ADV]
  staircase: { sumCap1_11: 288, sumCap2_11: 56, floor11: 34, truth11: 45,
               sumCap2_13: 880, floor13: 110, truth13: 307 },   // [STC]
  // [HSW] per-fold quoted values: w, C_1 at the two seam classes a = w-1 and
  // a = w+1, C_1 at the mirror-fixed class a* (2a* = w mod p), fold min/max,
  // and the argmax classes. Keyed by the fold prime p.
  holesweep: [
    { x: 5,  p: 7,  w: 2,  seamLo: 24,  seamHi: 30,  fix: 24,  min: 12,  max: 30,  argmax: [3] },
    { x: 7,  p: 11, w: 1,  seamLo: 30,  seamHi: 36,  fix: 30,  min: 30,  max: 42,  argmax: [5, 7] },
    { x: 11, p: 13, w: 9,  seamLo: 66,  seamHi: 66,  fix: 48,  min: 48,  max: 66,  argmax: null }, // all but a*=11
    { x: 13, p: 17, w: 8,  seamLo: 96,  seamHi: 108, fix: 90,  min: 90,  max: 108, argmax: null },
    { x: 17, p: 19, w: 18, seamLo: 150, seamHi: 150, fix: 150, min: 138, max: 150, argmax: null },
    { x: 19, p: 23, w: 15, seamLo: 198, seamHi: 186, fix: 204, min: 180, max: 204, argmax: [7, 11, 15] },
    { x: 23, p: 29, w: 17, seamLo: 228, seamHi: 234, fix: 234, min: 222, max: 258, argmax: [2, 15] },
    { x: 29, p: 31, w: 19, seamLo: 318, seamHi: 330, fix: 330, min: 318, max: 348, argmax: [7, 12, 23, 27] },
    { x: 31, p: 37, w: 11, seamLo: 420, seamHi: 510, fix: 426, min: 402, max: 528, argmax: [15, 33] },
  ],
  instruments: { c2p37: 0.5939, termsAbove37: 0, g2h37: 8.00, h2g2at37: 1.341 }, // [LAD]
};

// ---------------------------------------------------------------- utilities
function primesUpTo(n) {
  const s = new Uint8Array(n + 1), P = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { P.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return P;
}
function leastPrimeFactor(n) { if (n === 1) return Infinity; for (let d = 2; d * d <= n; d++) if (n % d === 0) return d; return n; }
function isPrime(n) { return n >= 2 && leastPrimeFactor(n) === n; }
// mulberry32 — deterministic PRNG for the random-vector covariance check only.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0; let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
let failures = 0;
function check(name, ok) {
  console.log(`  ${ok ? 'ok   ' : 'FAIL '} ${name}`);
  if (!ok) failures++;
}
function assertAbort(name, ok) {
  if (!ok) { console.log(`  ABORT calibration failed: ${name}`); process.exit(1); }
  console.log(`  ok    ${name}`);
}

// ---------------------------------------------------------------- the level
function buildLevel(x) {
  const wheelAll = primesUpTo(x);
  let W = 1; for (const p of wheelAll) W *= p;
  const scour = primesUpTo(Math.floor(Math.sqrt(W)) + 2).filter(q => q > x && q * q <= W);
  const slots = [];
  for (let r = 0; r < W; r++) {
    const m = r % 30; if (m !== 11 && m !== 17) continue;
    let ok = true;
    for (const p of wheelAll) { if (p < 7) continue; const rp = r % p; if (rp === 0 || rp === p - 2) { ok = false; break; } }
    if (ok) slots.push(r);
  }
  return { x, W, wheel: wheelAll.filter(p => p >= 7), scour, slots };
}
// The march under an arbitrary class vector: fresh(q) per prime + survivors.
function march(L, cls) {
  const struck = new Uint8Array(L.slots.length); const fresh = []; const surv = [];
  for (let i = 0; i < L.scour.length; i++) {
    const q = L.scour[i], a = ((cls[i] % q) + q) % q, b = (a - 2 + q) % q; let f = 0;
    for (let j = 0; j < L.slots.length; j++) {
      if (struck[j]) continue;
      const rq = L.slots[j] % q;
      if (rq === a || rq === b) { struck[j] = 1; f++; }
    }
    fresh.push(f);
  }
  for (let j = 0; j < L.slots.length; j++) if (!struck[j]) surv.push(L.slots[j]);
  return { fresh, survivors: surv.length, survivorSlots: surv };
}
// Classic staircase cap_K (staircase-note §7: m >= 2 cofactors + s(q)) and
// the unified capU_K (m >= 1, no s(q)) — one routine, a flag apart.
function capK(L, q, K, unified) {
  const pool = L.scour.filter(p2 => p2 < q).slice(0, K);
  const mLo = unified ? 1 : 2;
  let count = 0;
  for (const side of ['A', 'B']) {
    const t = Math.floor((L.W + (side === 'A' ? -1 : 1)) / q);
    for (let m = mLo; m <= t; m++) {
      if (m > 1 && leastPrimeFactor(m) < q) continue;             // P^-(m) >= q
      const v = q * m, v30 = v % 30;
      if (side === 'A' ? (v30 !== 11 && v30 !== 17) : (v30 !== 13 && v30 !== 19)) continue;
      let ok = true;
      for (const p of L.wheel) {                                  // comb transcription
        const bad = side === 'A' ? p - 2 : 2;
        if (v % p === bad) { ok = false; break; }
      }
      if (!ok) continue;
      for (const q2 of pool) {                                    // anchored freshness
        const r2 = v % q2, bad2 = side === 'A' ? q2 - 2 : 2;
        if (r2 === 0 || r2 === bad2) { ok = false; break; }
      }
      if (ok) count++;
    }
  }
  if (!unified) { const q30 = q % 30; if (q30 === 11 || q30 === 13 || q30 === 17 || q30 === 19) count++; }
  return count;
}
// General-class (rigidity-free) cap: comb slots in q's classes, minus those
// struck by the first K smaller pool primes AT THEIR CHOSEN CLASSES. Valid
// for every class vector; its conclusion reads the classes.
function capGenK(L, q, i, K, cls) {
  const pool = [];
  for (let t = 0; t < L.scour.length && pool.length < K; t++) if (L.scour[t] < q) pool.push(t);
  const a = ((cls[i] % q) + q) % q, b = (a - 2 + q) % q;
  let count = 0;
  for (const r of L.slots) {
    const rq = r % q; if (rq !== a && rq !== b) continue;
    let ok = true;
    for (const t of pool) {
      const q2 = L.scour[t], a2 = ((cls[t] % q2) + q2) % q2, b2 = (a2 - 2 + q2) % q2, r2 = r % q2;
      if (r2 === a2 || r2 === b2) { ok = false; break; }
    }
    if (ok) count++;
  }
  return count;
}
function cap1(L, q) { // staircase Theorem 3 cap1, for the calibration only
  let c = 0;
  for (const dt of [-1, 1]) {
    const t = Math.floor((L.W + dt) / q);
    for (let m = 2; m <= t; m++) if (leastPrimeFactor(m) >= q) c++;
  }
  const q30 = q % 30; if (q30 === 11 || q30 === 13 || q30 === 17 || q30 === 19) c++;
  return c;
}

const L11 = buildLevel(11), L13 = buildLevel(13);
const N11 = L11.slots.length, N13 = L13.slots.length;
const anch11 = L11.scour.map(() => 0), anch13 = L13.scour.map(() => 0);
const w11 = L11.scour.map(q => L11.W % q), w13 = L13.scour.map(q => L13.W % q);
const sigmaCls = (L, wv, cls) => cls.map((a, i) => ((wv[i] - a) % L.scour[i] + L.scour[i]) % L.scour[i]);
const M11 = march(L11, anch11), M13 = march(L13, anch13);

// ============================================================================
console.log('SEC 0. CALIBRATION AGAINST THE EMBEDDED ARTIFACTS (abort on mismatch)');
// ============================================================================
assertAbort(`@11: N = 90, scour = 10 primes 13..47 (got N=${N11})`,
  N11 === 90 && L11.scour.length === 10 && L11.scour[0] === 13 && L11.scour[9] === 47);
assertAbort(`@11 anchored survivors = 45 [STC truth] (got ${M11.survivors})`, M11.survivors === 45);
const sum1_11 = L11.scour.reduce((s, q) => s + cap1(L11, q), 0);
const sum2_11 = L11.scour.reduce((s, q) => s + capK(L11, q, 0, false), 0);
assertAbort(`@11 sum cap1 = 288, sum cap2 = 56, floor = 34 [STC] (got ${sum1_11}, ${sum2_11})`,
  sum1_11 === CITED.staircase.sumCap1_11 && sum2_11 === CITED.staircase.sumCap2_11 &&
  N11 - sum2_11 === CITED.staircase.floor11);
const W11 = march(L11, CITED.witness11);
assertAbort(`@11 witness replay = 16 [ADV] (got ${W11.survivors})`, W11.survivors === CITED.advmin11);
assertAbort(`@13: N = 990, scour = 34 primes 17..173 (got N=${N13})`,
  N13 === 990 && L13.scour.length === 34 && L13.scour[0] === 17 && L13.scour[33] === 173);
assertAbort(`@13 anchored survivors = 307 [STC truth] (got ${M13.survivors})`, M13.survivors === 307);
const sum2_13 = L13.scour.reduce((s, q) => s + capK(L13, q, 0, false), 0);
assertAbort(`@13 sum cap2 = 880, floor = 110 [STC] (got ${sum2_13})`,
  sum2_13 === CITED.staircase.sumCap2_13 && N13 - sum2_13 === CITED.staircase.floor13);
const W13 = march(L13, CITED.witness13);
assertAbort(`@13 witness replay = 152 [ADV] (got ${W13.survivors})`, W13.survivors === 152);

// ============================================================================
console.log('\nSEC 1. THE MECHANISM TABLE AT @11 — WHAT EACH MECHANIC FORCES');
// ============================================================================
console.log('\n  1a. COFACTOR RIGIDITY (anchored classes {0,-2} only).');
console.log('  q    w_q  divClasses a in  q^2-2  self slot  in comb?          fresh  |K_q(0)|raw');
const selfInfo = [];
for (let i = 0; i < L11.scour.length; i++) {
  const q = L11.scour[i], q30 = q % 30;
  let self = null, why = 'no residue (q = ' + q30 + ' mod 30)';
  if (q30 === 11 || q30 === 17) self = q; else if (q30 === 13 || q30 === 19) self = q - 2;
  let inComb = false, excl = '';
  if (self !== null) {
    inComb = L11.slots.includes(self);
    if (!inComb) { for (const p of [...L11.wheel]) { const rp = self % p; if (rp === 0 || rp === p - 2) excl = `excluded mod ${p}`; } }
    why = inComb ? 'yes' : excl;
  }
  selfInfo.push({ q, self, inComb });
  const raw = capGenK(L11, q, i, 0, anch11);
  console.log(`  ${String(q).padStart(2)}   ${String(L11.W % q).padStart(3)}  {0,2,${L11.W % q},${(L11.W % q + 2) % q}}`.padEnd(33) +
    `${String(q * q - 2).padStart(5)}  ${self === null ? '   --  ' : String(self).padStart(5) + '  '}  ${why.padEnd(16)}  ${String(M11.fresh[i]).padStart(3)}  ${String(raw).padStart(4)}`);
}
const R0 = L11.scour[0] * L11.scour[0] - 2;
const lowComb = L11.slots.filter(r => r < R0);
const lowTwin = lowComb.filter(r => isPrime(r) && isPrime(r + 2));
console.log(`  Protection radius of the whole Scour: q1^2-2 = ${R0}. Comb slots below it: ` +
  `${lowComb.length} [${lowComb.join(',')}]`);
check(`rigidity pins the low comb: every comb slot < ${R0} is a genuine twin (${lowTwin.length} of ${lowComb.length})`,
  lowTwin.length === lowComb.length);
const lowKilledAnch = lowComb.filter(r => !M11.survivorSlots.includes(r));
check(`anchored kills below ${R0} are exactly the fresh self-strikes {17, 41} (got {${lowKilledAnch.join(',')}})`,
  lowKilledAnch.join(',') === '17,41');

console.log('\n  1b. THE MIRROR sigma(r) = W-2-r ON THE COMB (exception-free here).');
const sigmaSlot = r => L11.W - 2 - r;
check('sigma maps the comb to itself, integer-exactly (max slot = sigma(min slot) = 2308 - 17 = 2291; no wrap)',
  L11.slots.every(r => L11.slots.includes(sigmaSlot(r))) &&
  Math.max(...L11.slots) === 2308 - Math.min(...L11.slots) && Math.min(...L11.slots) === 17);
check('sigma is a FREE involution on the comb: 45 mirror pairs, zero fixed slots',
  L11.slots.every(r => sigmaSlot(r) !== r) && L11.slots.length === 90);
check('sigma swaps House 11 <-> House 17 (45 of 45 slots swap house)',
  L11.slots.every(r => (r % 30) + (sigmaSlot(r) % 30) === 28));
let covOK = 0, covTot = 0;
for (let i = 0; i < L11.scour.length; i++) {
  const q = L11.scour[i], w = w11[i];
  for (let a = 0; a < q; a++) {
    covTot++;
    const b = (a - 2 + q) % q, a2 = ((w - a) % q + q) % q, b2 = (a2 - 2 + q) % q;
    const img = L11.slots.filter(r => { const rq = r % q; return rq === a || rq === b; }).map(sigmaSlot).sort((u, v) => u - v);
    const tgt = L11.slots.filter(r => { const rq = r % q; return rq === a2 || rq === b2; }).sort((u, v) => u - v);
    if (img.length === tgt.length && img.every((v, t) => v === tgt[t])) covOK++;
  }
}
check(`strike-set covariance sigma(K_q(a)) = K_q(w-a) holds for ALL ${covTot} classes, no specials (${covOK}/${covTot})`,
  covOK === covTot);

console.log('\n  1c. THE BIRTH CANAL at @11: the carrier is ABSENT from this comb.');
check('edge slot W-1 = 2309 is 29 mod 30: outside the comb (House 29 excluded by construction)',
  2309 % 30 === 29 && !L11.slots.includes(2309));
check('no comb slot lies in House 29 at all — the one-sided seam anomaly has nothing to act on',
  L11.slots.every(r => r % 30 !== 29));
console.log('  Reading: the Mirror-Sweep Lemma\'s specials {1, w-1, w+1, p-1} exist only because the');
console.log('  edge slot wraps; the Natal@5 comb excludes House 29, so the comb-side mirror is EXACT.');

console.log('\n  1d. THE WITNESS AGAINST THE RIGIDITY CLASSES.');
const specials11 = L11.scour.map((q, i) => [0, 2, w11[i], (w11[i] + 2) % q]);
const avoid = CITED.witness11.filter((a, i) => !specials11[i].includes(a)).length;
check(`the adversarial witness avoids the divisibility classes {0,2,w,w+2} at ALL 10 primes (${avoid}/10)`,
  avoid === 10);
console.log('  [ADV shard row, q=13 fixed to a = 0..12]: ' + CITED.shard13row.join(','));
console.log('  Cited cost of entering a rigidity class at q=13: a in {0,2,9,11} give minima ' +
  `${CITED.shard13row[0]},${CITED.shard13row[2]},${CITED.shard13row[9]},${CITED.shard13row[11]} — all >= 18 > 16.`);

// ============================================================================
console.log('\nSEC 2. THE MIRROR IN CLASS SPACE: survivors(a) = survivors(sigma a)');
// ============================================================================
const coAnch = march(L11, w11);
check(`anchored -> co-anchored (a_q = w_q): survivors 45 = ${coAnch.survivors}, fresh vector identical per prime`,
  coAnch.survivors === 45 && coAnch.fresh.every((f, i) => f === M11.fresh[i]));
const mirrorWit = march(L11, sigmaCls(L11, w11, CITED.witness11));
check(`witness -> mirror witness: survivors 16 = ${mirrorWit.survivors}`, mirrorWit.survivors === 16);
const rng = mulberry32(20260820);
let covRand = 0;
for (let t = 0; t < 500; t++) {
  const v = L11.scour.map(q => Math.floor(rng() * q));
  if (march(L11, v).survivors === march(L11, sigmaCls(L11, w11, v)).survivors) covRand++;
}
check(`covariance on 500 seeded random class vectors: ${covRand}/500 equal`, covRand === 500);
const w13of13 = L11.W % 13;
const pal = CITED.shard13row.every((v, a) => v === CITED.shard13row[((w13of13 - a) % 13 + 13) % 13]);
check(`the [ADV] shard row IS the mirror palindrome under a -> ${w13of13}-a mod 13 (13/13 cells)`, pal);
const inv2 = q => { for (let z = 1; z < q; z++) if ((2 * z) % q === 1) return z; };
const fixedPoint = L11.scour.map((q, i) => (w11[i] * inv2(q)) % q);
const fixSurv = march(L11, fixedPoint).survivors;
console.log(`  The unique sigma-FIXED class vector (2a_q = w_q): survivors = ${fixSurv}.`);
check(`no mirror-symmetric assignment attains the optimum: ${fixSurv} > 16, and the witness is not self-mirror`,
  fixSurv > 16 && CITED.witness11.some((a, i) => a !== fixedPoint[i]));
const coSet = new Set(coAnch.survivorSlots);
const overlap = M11.survivorSlots.filter(r => coSet.has(r)).length;
const mirrorPairsBothSurv = M11.survivorSlots.filter(r => M11.survivorSlots.includes(sigmaSlot(r))).length / 2;
console.log(`  Anchored survivor SET vs its sigma-image (= co-anchored set): overlap ${overlap} of 45;`);
console.log(`  mirror pairs with both members genuine twins: ${mirrorPairsBothSurv} of 45 pairs.`);
console.log('  Reading: the mirror transfers COUNTS exactly and sets only partially — it is covariance,');
console.log('  not an extra constraint at the anchored point (its orbit there is {anchored, co-anchored}).');

// ============================================================================
console.log('\nSEC 3. THE UNIFIED LADDER — THE MAIN COMPOSITION, @11 THEN @13');
// ============================================================================
function ladder(L, Mref, label, truth) {
  const Kmax = L.scour.length;
  const rows = [];
  let prevU = -Infinity;
  for (let K = 0; K <= Kmax; K++) {
    let sC = 0, sU = 0, hard = true, dom = true;
    L.scour.forEach((q, i) => {
      const c = capK(L, q, K, false), u = capK(L, q, K, true);
      sC += c; sU += u;
      if (Mref.fresh[i] > u || Mref.fresh[i] > c) hard = false;
      if (u > c) dom = false;
    });
    rows.push({ K, sC, fC: L.slots.length - sC, sU, fU: L.slots.length - sU });
    if (!hard) check(`${label} K=${K}: HARD-CAP VIOLATION`, false);
    if (!dom) check(`${label} K=${K}: capU > cap violation`, false);
    if (rows[rows.length - 1].fU < prevU) check(`${label} K=${K}: monotonicity violation`, false);
    prevU = rows[rows.length - 1].fU;
  }
  console.log(`  ${label}   K | classic sum -> floor | unified sum -> floor`);
  for (const r of rows) console.log(`      ${String(r.K).padStart(3)} |    ${String(r.sC).padStart(4)}  ->  ${String(r.fC).padStart(4)} |    ${String(r.sU).padStart(4)}  ->  ${String(r.fU).padStart(4)}`);
  const fullU = rows[Kmax];
  const eqFull = L.scour.every((q, i) => capK(L, q, Kmax, true) === Mref.fresh[i]);
  check(`${label} full-depth unified cap EQUALS fresh per prime (bijection) and floor = truth ${truth}`,
    eqFull && fullU.fU === truth);
  const firstBeat = rows.find(r => r.fU > rows[0].fC);
  const firstTruth = rows.find(r => r.fU === truth);
  console.log(`  ${label} unified beats the published floor from K = 0 on (${rows[0].fU} > ${rows[0].fC});` +
    ` reaches truth ${truth} first at K = ${firstTruth.K}. Classic plateaus at ${rows[Kmax].fC}.`);
  return rows;
}
console.log('\n  @11 (published staircase floor 34 [STC], truth 45):');
const rows11 = ladder(L11, M11, '@11', 45);
console.log('\n  Classic\'s wasted allowance @11, itemized: s(q) spent on q = 13 (slot 11 wheel-excluded');
console.log('  mod 11), q = 47 (slot 47 wheel-excluded mod 7), q = 19 and 43 (twin-collision shadows of');
console.log(`  17 and 41). 4 wasted units: classic plateau ${rows11[10].fC} = truth 45 - 4.`);
check('classic plateau @11 = 41 = 45 - 4 wasted allowances', rows11[10].fC === 41);
console.log('\n  @13 (published staircase floor 110 [STC], truth 307):');
const rows13 = ladder(L13, M13, '@13', 307);
const waste13 = 307 - rows13[34].fC;
const self13 = L13.scour.map(q => {
  const q30 = q % 30;
  if (q30 === 11 || q30 === 17) return { q, self: q };
  if (q30 === 13 || q30 === 19) return { q, self: q - 2 };
  return null;
}).filter(Boolean);
const s13tot = self13.length;
const s13inComb = self13.filter(o => L13.slots.includes(o.self));
const s13slots = [...new Set(s13inComb.map(o => o.self))];
console.log(`  Classic's waste @13: ${waste13} units of ${s13tot} allowances — ${s13tot - s13inComb.length} wheel-excluded self`);
console.log(`  slots (q = ${self13.filter(o => !L13.slots.includes(o.self)).map(o => o.q).join(',')}), ` +
  `${s13inComb.length - s13slots.length} twin-collision shadows; ${s13slots.length} distinct real self slots [${s13slots.join(',')}].`);
check(`waste accounting @13: ${s13tot} - ${s13slots.length} realized = ${waste13}`, s13tot - s13slots.length === waste13);
console.log('\n  THE FLOOR FAMILY AGAINST THE CLASS-BLIND CEILING: every unified floor @11 (36..45) exceeds');
console.log('  advmin@11 = 16 [ADV] — per the corrected quantifier these floors are anchored-aware');
console.log('  (their freshness conditions and cofactor parametrization read the classes {0,-2}), so the');
console.log('  witness does not instantiate them; no class-uniform cap can certify even 17.');

// ============================================================================
console.log('\nSEC 4. WITNESS-SIDE (DOA) TESTS — every family instantiated at the witness');
// ============================================================================
console.log('  General-class ladder (rigidity-free, reads all classes), floors at three points:');
console.log('    K | floor(anchored) | floor(witness) | floor(mirror witness)');
function genFloor(L, cls, K) {
  let s = 0; L.scour.forEach((q, i) => { s += capGenK(L, q, i, K, cls); });
  return L.slots.length - s;
}
const witM = march(L11, CITED.witness11);
for (let K = 0; K <= 10; K++) {
  const fa = genFloor(L11, anch11, K), fw = genFloor(L11, CITED.witness11, K),
    fm = genFloor(L11, sigmaCls(L11, w11, CITED.witness11), K);
  console.log(`   ${String(K).padStart(2)} |      ${String(fa).padStart(4)}       |     ${String(fw).padStart(4)}       |     ${String(fm).padStart(4)}`);
  // hard-cap check at the witness: capGen must dominate the witness's fresh
  L11.scour.forEach((q, i) => {
    if (witM.fresh[i] > capGenK(L11, q, i, K, CITED.witness11)) check(`capGen violation q=${q} K=${K}`, false);
  });
}
check('general ladder at witness ends at floor = 16 = advmin (full depth exact there too)',
  genFloor(L11, CITED.witness11, 10) === 16);
check('general ladder at anchored ends at 45 but starts BELOW the rigidity ladder ' +
  `(K=0: ${genFloor(L11, anch11, 0)} vs unified 36 — rigidity is worth ${36 - genFloor(L11, anch11, 0)} at depth 0)`,
  genFloor(L11, anch11, 10) === 45 && genFloor(L11, anch11, 0) < 36);
console.log('\n  CANDIDATE VERDICTS (a candidate the witness violates is dead on arrival):');
console.log('  C-A rigidity-free K=0 caps: VALID everywhere but WEAK — floor ' +
  `${genFloor(L11, anch11, 0)} at anchored, ${genFloor(L11, CITED.witness11, 0)} at the witness. Not the route.`);
const symGain = ['anchored', 'witness'].map((tag, t) => {
  const v = t === 0 ? anch11 : CITED.witness11;
  return genFloor(L11, v, 4) - Math.max(genFloor(L11, v, 4), genFloor(L11, sigmaCls(L11, w11, v), 4));
});
check('C-B mirror symmetrization max(F(a), F(sigma a)): gain IDENTICALLY 0 (every cap is itself ' +
  'mirror-covariant) — REFUTED as an improvement channel', symGain.every(g => g === 0));
console.log('  C-C the unified ladder: reads classes, exceeds 34 from K=0, exact at full depth. ALIVE.');
console.log(`\n  The witness's 16 survivors, slot by slot: [${witM.survivorSlots.join(',')}]`);
const witLow = witM.survivorSlots.filter(r => r < R0).length;
console.log(`  Below the protection radius ${R0} the witness keeps ${witLow} of its 16 — the adversary can`);
console.log(`  kill low slots rigidity protects (anchored keeps ${M11.survivorSlots.filter(r => r < R0).length} - 2 self-struck of ${lowComb.length} there).`);

// ============================================================================
console.log('\nSEC 5. THE FORCING LADDER — the exact price of anchoring, prime by prime');
// ============================================================================
// Branch-and-bound, union bound only (proven: each remaining prime adds at
// most its best class's fresh coverage on the CURRENT uncovered set, and
// fresh sets only shrink downward — no monotonicity-in-target anywhere).
const KILL = L11.scour.map(q => {
  const arr = [];
  for (let a = 0; a < q; a++) {
    const b = (a - 2 + q) % q, lst = [];
    L11.slots.forEach((r, j) => { const rq = r % q; if (rq === a || rq === b) lst.push(j); });
    arr.push(lst);
  }
  return arr;
});
function solveMin(fixedIdx, fixedCls) {
  const cover = new Uint16Array(N11); let covered = 0;
  for (let t = 0; t < fixedIdx.length; t++) for (const j of KILL[fixedIdx[t]][fixedCls[t]]) { if (cover[j] === 0) covered++; cover[j]++; }
  const free = []; for (let i = 0; i < L11.scour.length; i++) if (!fixedIdx.includes(i)) free.push(i);
  { // greedy incumbent (correctness never depends on it)
    const c2 = cover.slice(); let cov2 = covered; const rem = free.slice();
    while (rem.length) {
      let bi = -1, ba = 0, bg = -1;
      for (const i of rem) for (let a = 0; a < L11.scour[i]; a++) {
        let g = 0; for (const j of KILL[i][a]) if (c2[j] === 0) g++;
        if (g > bg) { bg = g; bi = i; ba = a; }
      }
      for (const j of KILL[bi][ba]) { if (c2[j] === 0) cov2++; c2[j]++; }
      rem.splice(rem.indexOf(bi), 1);
    }
    var best = cov2;
  }
  let nodes = 0;
  function maxFresh(i) {
    let m = 0;
    for (let a = 0; a < L11.scour[i]; a++) { let c = 0; for (const j of KILL[i][a]) if (cover[j] === 0) c++; if (c > m) m = c; }
    return m;
  }
  function rec(remFree) {
    nodes++;
    if (nodes > 5e6) throw new Error('node budget tripped — NOT COMPLETED');
    if (!remFree.length) { if (covered > best) best = covered; return; }
    const maxes = remFree.map(maxFresh);
    let bound = covered, bi = 0;
    maxes.forEach((m, t) => { bound += m; if (m > maxes[bi]) bi = t; });
    if (bound <= best) return;
    const i = remFree[bi], rest = remFree.filter((_, t) => t !== bi);
    let restBound = 0; maxes.forEach((m, t) => { if (t !== bi) restBound += m; });
    const opts = []; const seen = new Set();
    for (let a = 0; a < L11.scour[i]; a++) {
      const fs = KILL[i][a].filter(j => cover[j] === 0), key = fs.join(',');
      if (seen.has(key)) continue; seen.add(key); opts.push(fs);
    }
    opts.sort((u, v) => v.length - u.length);
    for (const fs of opts) {
      if (covered + fs.length + restBound <= best) break;   // sorted early break, parent maxes
      for (const j of fs) cover[j]++;
      covered += fs.length; rec(rest); covered -= fs.length;
      for (const j of fs) cover[j]--;
    }
  }
  rec(free);
  return { minSurv: N11 - best, nodes };
}
console.log('  first j scour primes anchored at a = 0, remaining free (exact minima):');
const ladderJ = [];
for (let j = 0; j <= 10; j++) {
  const fi = [], fc = [];
  for (let t = 0; t < j; t++) { fi.push(t); fc.push(0); }
  const r = solveMin(fi, fc);
  ladderJ.push(r.minSurv);
  console.log(`    j=${String(j).padStart(2)}  anchor {${L11.scour.slice(0, j).join(',') || ''}}`.padEnd(48) + ` advmin_j = ${String(r.minSurv).padStart(2)}   nodes=${r.nodes}`);
}
check('forcing-ladder calibration: j=0 -> 16 [ADV, two proof stacks], j=1 -> 20 [ADV shard row a=0], j=10 -> 45 [STC truth]',
  ladderJ[0] === 16 && ladderJ[1] === CITED.shard13row[0] && ladderJ[10] === 45);
check('the forcing ladder is monotone non-decreasing in j (restriction shrinks the adversary)',
  ladderJ.every((v, t) => t === 0 || v >= ladderJ[t - 1]));
console.log(`  THE FORCING CURVE: ${ladderJ.join(' -> ')}`);
console.log('  single-prime anchoring (only q anchored, all others free):');
const singles = [];
for (let i = 0; i < 10; i++) {
  const r = solveMin([i], [0]);
  singles.push(r.minSurv);
  console.log(`    only q=${String(L11.scour[i]).padStart(2)} anchored: advmin = ${r.minSurv}   (+${r.minSurv - 16} over free)   nodes=${r.nodes}`);
}
const coJ1 = solveMin([0], [w11[0]]);
check(`covariance check on the instrument: co-anchoring q=13 at a=w=9 gives the same minimum ${coJ1.minSurv} = ${ladderJ[1]}`,
  coJ1.minSurv === ladderJ[1]);

// ============================================================================
console.log('\nSEC 6. THE x = 37 SECONDARY — anchored/mirror structure at the outlier level');
// ============================================================================
console.log('  Cited instruments [LAD]: c2\'(37) = 0.5939 with 0 of 10 later terms above it;');
console.log('  G2/h at 37 = 8.00 (the 14-term peak); h2/G2 at 37 = 1.341 (the low).');
const foldPrimes = [7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43];
let primorial = 30n; // 5# — folds start at 5->7
const wLadder = [];
{
  let prev = 5;
  for (const p of foldPrimes) {
    const w = Number(primorial % BigInt(p));
    wLadder.push({ x: prev, p, w });
    primorial *= BigInt(p); prev = p;
  }
}
console.log('  fold      w=W mod p   w/p     specials {1,w-1,w+1,p-1}   |set|  fixed a* (2a*=w)');
for (const f of wLadder) {
  const sp = [...new Set([1, (f.w - 1 + f.p) % f.p, (f.w + 1) % f.p, f.p - 1])].sort((a, b) => a - b);
  const astar = (f.w * inv2(f.p)) % f.p;
  console.log(`  ${String(f.x).padStart(2)}->${String(f.p).padEnd(3)}  ${String(f.w).padStart(6)}     ${(f.w / f.p).toFixed(3)}   {${sp.join(',')}}`.padEnd(52) + `  ${sp.length}     ${astar}`);
}
const hswByP = new Map(CITED.holesweep.map(o => [o.p, o]));
for (const f of CITED.holesweep) {
  const wB = wLadder.find(o => o.p === f.p);
  if (wB.w !== f.w) check(`w cross-check failed at fold ->${f.p}: BigInt ${wB.w} vs cited ${f.w}`, false);
}
check('all 9 cited holesweep w values reproduce from BigInt primorials (9/9)', true);
console.log('\n  Seam and fixed-class configuration per fold, from the cited [HSW] curves:');
console.log('  fold     seam C(w-1)/C(w+1)  split  spread(max-min)  split/spread  fixed-a* C   a* is');
for (const f of CITED.holesweep) {
  const split = Math.abs(f.seamHi - f.seamLo), spread = f.max - f.min;
  const astar = (f.w * inv2(f.p)) % f.p;
  let fixIs = 'bulk';
  if (f.fix === f.max) fixIs = 'MAX'; else if (f.fix === f.min) fixIs = 'MIN';
  console.log(`  ${String(f.x).padStart(2)}->${String(f.p).padEnd(3)}   ${String(f.seamLo).padStart(4)}/${String(f.seamHi).padEnd(4)}` +
    `        ${String(split).padStart(3)}      ${String(spread).padStart(4)}          ${(split / spread).toFixed(2)}        ${String(f.fix).padStart(4)}     ${fixIs}`);
}
const f37 = hswByP.get(37);
const astar37 = (f37.w * inv2(37)) % 37;
const seam37 = [(f37.w - 1 + 37) % 37, (f37.w + 1) % 37];
check(`at 31->37 the record classes {15,33} avoid the seam {${seam37.join(',')}} and the fixed class ${astar37}`,
  !f37.argmax.some(a => seam37.includes(a) || a === astar37));
const splitNorm = CITED.holesweep.map(f => Math.abs(f.seamHi - f.seamLo) / (f.max - f.min));
const rank37 = splitNorm.filter(v => v > splitNorm[8]).length;
console.log(`\n  The seam split at 31->37 is 90 in absolute terms (vs <= 12 at every other fold) but the`);
console.log(`  fold's own spread is 126: normalized 0.71, ranked ${rank37 === 0 ? 'first but adjacent to' : 'below'} 13->17's 0.67 — a spike-tier`);
console.log('  effect (510 sits in the second tier {a=12,14,34,36}, which contains seam a=12 AND its');
console.log('  mirror 36), not a new mechanism. VERDICT: at the fold/mirror layer x = 37 is');
console.log('  UNEXCEPTIONAL — generic |specials| = 4, unremarkable w = 11, record not seam-adjacent,');
console.log('  not mirror-fixed; the c2\' spike is not carried by the anchored/mirror structure.');

// ============================================================================
if (failures === 0) console.log('\nALL SELF-TESTS PASS');
else { console.log(`\n${failures} SELF-TEST FAILURE(S)`); process.exit(1); }

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-anchored-01-unify.js
//   invocation:  node research/attack-anchored-01-unify.js
//   code-sha256: 1c501bc76859d3296922518c393bf100fa563f0453dd5b0d2b28f6f98a2021de
//   out-sha256:  edb3eb10d838eac9175d26ceceb0c8a011cbc93a885a67b8b0385ebf89bc3a87
//   body-lines:  221
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     0.4 s
// ============================================================================
// SEC 0. CALIBRATION AGAINST THE EMBEDDED ARTIFACTS (abort on mismatch)
//   ok    @11: N = 90, scour = 10 primes 13..47 (got N=90)
//   ok    @11 anchored survivors = 45 [STC truth] (got 45)
//   ok    @11 sum cap1 = 288, sum cap2 = 56, floor = 34 [STC] (got 288, 56)
//   ok    @11 witness replay = 16 [ADV] (got 16)
//   ok    @13: N = 990, scour = 34 primes 17..173 (got N=990)
//   ok    @13 anchored survivors = 307 [STC truth] (got 307)
//   ok    @13 sum cap2 = 880, floor = 110 [STC] (got 880)
//   ok    @13 witness replay = 152 [ADV] (got 152)
//
// SEC 1. THE MECHANISM TABLE AT @11 — WHAT EACH MECHANIC FORCES
//
//   1a. COFACTOR RIGIDITY (anchored classes {0,-2} only).
//   q    w_q  divClasses a in  q^2-2  self slot  in comb?          fresh  |K_q(0)|raw
//   13     9  {0,2,9,11}             167     11    excluded mod 11    13    13
//   17    15  {0,2,15,0}             287     17    yes                 9    10
//   19    11  {0,2,11,13}            359     17    yes                 8    10
//   23    10  {0,2,10,12}            527     --    no residue (q = 23 mod 30)    5     8
//   29    19  {0,2,19,21}            839     --    no residue (q = 29 mod 30)    4     7
//   31    16  {0,2,16,18}            959     --    no residue (q = 1 mod 30)    2     6
//   37    16  {0,2,16,18}           1367     --    no residue (q = 7 mod 30)    1     4
//   41    14  {0,2,14,16}           1679     41    yes                 1     5
//   43    31  {0,2,31,33}           1847     41    yes                 1     5
//   47     7  {0,2,7,9}             2207     47    excluded mod 7      1     5
//   Protection radius of the whole Scour: q1^2-2 = 167. Comb slots below it: 6 [17,41,71,101,107,137]
//   ok    rigidity pins the low comb: every comb slot < 167 is a genuine twin (6 of 6)
//   ok    anchored kills below 167 are exactly the fresh self-strikes {17, 41} (got {17,41})
//
//   1b. THE MIRROR sigma(r) = W-2-r ON THE COMB (exception-free here).
//   ok    sigma maps the comb to itself, integer-exactly (max slot = sigma(min slot) = 2308 - 17 = 2291; no wrap)
//   ok    sigma is a FREE involution on the comb: 45 mirror pairs, zero fixed slots
//   ok    sigma swaps House 11 <-> House 17 (45 of 45 slots swap house)
//   ok    strike-set covariance sigma(K_q(a)) = K_q(w-a) holds for ALL 300 classes, no specials (300/300)
//
//   1c. THE BIRTH CANAL at @11: the carrier is ABSENT from this comb.
//   ok    edge slot W-1 = 2309 is 29 mod 30: outside the comb (House 29 excluded by construction)
//   ok    no comb slot lies in House 29 at all — the one-sided seam anomaly has nothing to act on
//   Reading: the Mirror-Sweep Lemma's specials {1, w-1, w+1, p-1} exist only because the
//   edge slot wraps; the Natal@5 comb excludes House 29, so the comb-side mirror is EXACT.
//
//   1d. THE WITNESS AGAINST THE RIGIDITY CLASSES.
//   ok    the adversarial witness avoids the divisibility classes {0,2,w,w+2} at ALL 10 primes (10/10)
//   [ADV shard row, q=13 fixed to a = 0..12]: 20,17,18,18,18,18,18,18,17,20,16,21,16
//   Cited cost of entering a rigidity class at q=13: a in {0,2,9,11} give minima 20,18,20,21 — all >= 18 > 16.
//
// SEC 2. THE MIRROR IN CLASS SPACE: survivors(a) = survivors(sigma a)
//   ok    anchored -> co-anchored (a_q = w_q): survivors 45 = 45, fresh vector identical per prime
//   ok    witness -> mirror witness: survivors 16 = 16
//   ok    covariance on 500 seeded random class vectors: 500/500 equal
//   ok    the [ADV] shard row IS the mirror palindrome under a -> 9-a mod 13 (13/13 cells)
//   The unique sigma-FIXED class vector (2a_q = w_q): survivors = 48.
//   ok    no mirror-symmetric assignment attains the optimum: 48 > 16, and the witness is not self-mirror
//   Anchored survivor SET vs its sigma-image (= co-anchored set): overlap 26 of 45;
//   mirror pairs with both members genuine twins: 13 of 45 pairs.
//   Reading: the mirror transfers COUNTS exactly and sets only partially — it is covariance,
//   not an extra constraint at the anchored point (its orbit there is {anchored, co-anchored}).
//
// SEC 3. THE UNIFIED LADDER — THE MAIN COMPOSITION, @11 THEN @13
//
//   @11 (published staircase floor 34 [STC], truth 45):
//   @11   K | classic sum -> floor | unified sum -> floor
//         0 |      56  ->    34 |      54  ->    36
//         1 |      52  ->    38 |      50  ->    40
//         2 |      50  ->    40 |      47  ->    43
//         3 |      49  ->    41 |      46  ->    44
//         4 |      49  ->    41 |      46  ->    44
//         5 |      49  ->    41 |      46  ->    44
//         6 |      49  ->    41 |      46  ->    44
//         7 |      49  ->    41 |      46  ->    44
//         8 |      49  ->    41 |      45  ->    45
//         9 |      49  ->    41 |      45  ->    45
//        10 |      49  ->    41 |      45  ->    45
//   ok    @11 full-depth unified cap EQUALS fresh per prime (bijection) and floor = truth 45
//   @11 unified beats the published floor from K = 0 on (36 > 34); reaches truth 45 first at K = 8. Classic plateaus at 41.
//
//   Classic's wasted allowance @11, itemized: s(q) spent on q = 13 (slot 11 wheel-excluded
//   mod 11), q = 47 (slot 47 wheel-excluded mod 7), q = 19 and 43 (twin-collision shadows of
//   17 and 41). 4 wasted units: classic plateau 41 = truth 45 - 4.
//   ok    classic plateau @11 = 41 = 45 - 4 wasted allowances
//
//   @13 (published staircase floor 110 [STC], truth 307):
//   @13   K | classic sum -> floor | unified sum -> floor
//         0 |     880  ->   110 |     875  ->   115
//         1 |     837  ->   153 |     831  ->   159
//         2 |     804  ->   186 |     798  ->   192
//         3 |     781  ->   209 |     775  ->   215
//         4 |     768  ->   222 |     762  ->   228
//         5 |     753  ->   237 |     747  ->   243
//         6 |     743  ->   247 |     737  ->   253
//         7 |     734  ->   256 |     727  ->   263
//         8 |     729  ->   261 |     722  ->   268
//         9 |     722  ->   268 |     715  ->   275
//        10 |     716  ->   274 |     709  ->   281
//        11 |     715  ->   275 |     708  ->   282
//        12 |     713  ->   277 |     706  ->   284
//        13 |     708  ->   282 |     701  ->   289
//        14 |     703  ->   287 |     695  ->   295
//        15 |     700  ->   290 |     692  ->   298
//        16 |     698  ->   292 |     690  ->   300
//        17 |     698  ->   292 |     690  ->   300
//        18 |     698  ->   292 |     690  ->   300
//        19 |     697  ->   293 |     689  ->   301
//        20 |     696  ->   294 |     687  ->   303
//        21 |     696  ->   294 |     687  ->   303
//        22 |     695  ->   295 |     685  ->   305
//        23 |     695  ->   295 |     685  ->   305
//        24 |     695  ->   295 |     685  ->   305
//        25 |     695  ->   295 |     685  ->   305
//        26 |     695  ->   295 |     685  ->   305
//        27 |     695  ->   295 |     684  ->   306
//        28 |     694  ->   296 |     683  ->   307
//        29 |     694  ->   296 |     683  ->   307
//        30 |     694  ->   296 |     683  ->   307
//        31 |     694  ->   296 |     683  ->   307
//        32 |     694  ->   296 |     683  ->   307
//        33 |     694  ->   296 |     683  ->   307
//        34 |     694  ->   296 |     683  ->   307
//   ok    @13 full-depth unified cap EQUALS fresh per prime (bijection) and floor = truth 307
//   @13 unified beats the published floor from K = 0 on (115 > 110); reaches truth 307 first at K = 28. Classic plateaus at 296.
//   Classic's waste @13: 11 units of 17 allowances — 5 wheel-excluded self
//   slots (q = 47,79,131,163,167), 6 twin-collision shadows; 6 distinct real self slots [17,41,71,101,107,137].
//   ok    waste accounting @13: 17 - 6 realized = 11
//
//   THE FLOOR FAMILY AGAINST THE CLASS-BLIND CEILING: every unified floor @11 (36..45) exceeds
//   advmin@11 = 16 [ADV] — per the corrected quantifier these floors are anchored-aware
//   (their freshness conditions and cofactor parametrization read the classes {0,-2}), so the
//   witness does not instantiate them; no class-uniform cap can certify even 17.
//
// SEC 4. WITNESS-SIDE (DOA) TESTS — every family instantiated at the witness
//   General-class ladder (rigidity-free, reads all classes), floors at three points:
//     K | floor(anchored) | floor(witness) | floor(mirror witness)
//     0 |        17       |        5       |        5
//     1 |        26       |       10       |       10
//     2 |        33       |       12       |       12
//     3 |        38       |       14       |       14
//     4 |        40       |       15       |       15
//     5 |        43       |       16       |       16
//     6 |        44       |       16       |       16
//     7 |        44       |       16       |       16
//     8 |        45       |       16       |       16
//     9 |        45       |       16       |       16
//    10 |        45       |       16       |       16
//   ok    general ladder at witness ends at floor = 16 = advmin (full depth exact there too)
//   ok    general ladder at anchored ends at 45 but starts BELOW the rigidity ladder (K=0: 17 vs unified 36 — rigidity is worth 19 at depth 0)
//
//   CANDIDATE VERDICTS (a candidate the witness violates is dead on arrival):
//   C-A rigidity-free K=0 caps: VALID everywhere but WEAK — floor 17 at anchored, 5 at the witness. Not the route.
//   ok    C-B mirror symmetrization max(F(a), F(sigma a)): gain IDENTICALLY 0 (every cap is itself mirror-covariant) — REFUTED as an improvement channel
//   C-C the unified ladder: reads classes, exceeds 34 from K=0, exact at full depth. ALIVE.
//
//   The witness's 16 survivors, slot by slot: [41,347,377,431,617,731,851,1091,1151,1157,1367,1457,1511,1541,1961,2111]
//   Below the protection radius 167 the witness keeps 1 of its 16 — the adversary can
//   kill low slots rigidity protects (anchored keeps 4 - 2 self-struck of 6 there).
//
// SEC 5. THE FORCING LADDER — the exact price of anchoring, prime by prime
//   first j scour primes anchored at a = 0, remaining free (exact minima):
//     j= 0  anchor {}                              advmin_j = 16   nodes=6836
//     j= 1  anchor {13}                            advmin_j = 20   nodes=2708
//     j= 2  anchor {13,17}                         advmin_j = 20   nodes=158
//     j= 3  anchor {13,17,19}                      advmin_j = 22   nodes=39
//     j= 4  anchor {13,17,19,23}                   advmin_j = 23   nodes=22
//     j= 5  anchor {13,17,19,23,29}                advmin_j = 25   nodes=1
//     j= 6  anchor {13,17,19,23,29,31}             advmin_j = 30   nodes=6
//     j= 7  anchor {13,17,19,23,29,31,37}          advmin_j = 35   nodes=1
//     j= 8  anchor {13,17,19,23,29,31,37,41}       advmin_j = 38   nodes=1
//     j= 9  anchor {13,17,19,23,29,31,37,41,43}    advmin_j = 42   nodes=1
//     j=10  anchor {13,17,19,23,29,31,37,41,43,47} advmin_j = 45   nodes=1
//   ok    forcing-ladder calibration: j=0 -> 16 [ADV, two proof stacks], j=1 -> 20 [ADV shard row a=0], j=10 -> 45 [STC truth]
//   ok    the forcing ladder is monotone non-decreasing in j (restriction shrinks the adversary)
//   THE FORCING CURVE: 16 -> 20 -> 20 -> 22 -> 23 -> 25 -> 30 -> 35 -> 38 -> 42 -> 45
//   single-prime anchoring (only q anchored, all others free):
//     only q=13 anchored: advmin = 20   (+4 over free)   nodes=2708
//     only q=17 anchored: advmin = 17   (+1 over free)   nodes=805
//     only q=19 anchored: advmin = 18   (+2 over free)   nodes=2004
//     only q=23 anchored: advmin = 17   (+1 over free)   nodes=1250
//     only q=29 anchored: advmin = 17   (+1 over free)   nodes=1621
//     only q=31 anchored: advmin = 18   (+2 over free)   nodes=4013
//     only q=37 anchored: advmin = 18   (+2 over free)   nodes=1926
//     only q=41 anchored: advmin = 17   (+1 over free)   nodes=3083
//     only q=43 anchored: advmin = 18   (+2 over free)   nodes=3101
//     only q=47 anchored: advmin = 17   (+1 over free)   nodes=3662
//   ok    covariance check on the instrument: co-anchoring q=13 at a=w=9 gives the same minimum 20 = 20
//
// SEC 6. THE x = 37 SECONDARY — anchored/mirror structure at the outlier level
//   Cited instruments [LAD]: c2'(37) = 0.5939 with 0 of 10 later terms above it;
//   G2/h at 37 = 8.00 (the 14-term peak); h2/G2 at 37 = 1.341 (the low).
//   fold      w=W mod p   w/p     specials {1,w-1,w+1,p-1}   |set|  fixed a* (2a*=w)
//    5->7         2     0.286   {1,3,6}                 3     1
//    7->11        1     0.091   {0,1,2,10}              4     6
//   11->13        9     0.692   {1,8,10,12}             4     11
//   13->17        8     0.471   {1,7,9,16}              4     4
//   17->19       18     0.947   {0,1,17,18}             4     9
//   19->23       15     0.652   {1,14,16,22}            4     19
//   23->29       17     0.586   {1,16,18,28}            4     23
//   29->31       19     0.613   {1,18,20,30}            4     25
//   31->37       11     0.297   {1,10,12,36}            4     24
//   37->41        6     0.146   {1,5,7,40}              4     3
//   41->43       26     0.605   {1,25,27,42}            4     13
//   ok    all 9 cited holesweep w values reproduce from BigInt primorials (9/9)
//
//   Seam and fixed-class configuration per fold, from the cited [HSW] curves:
//   fold     seam C(w-1)/C(w+1)  split  spread(max-min)  split/spread  fixed-a* C   a* is
//    5->7       24/30            6        18          0.33          24     bulk
//    7->11      30/36            6        12          0.50          30     MIN
//   11->13      66/66            0        18          0.00          48     MIN
//   13->17      96/108          12        18          0.67          90     MIN
//   17->19     150/150           0        12          0.00         150     MAX
//   19->23     198/186          12        24          0.50         204     MAX
//   23->29     228/234           6        36          0.17         234     bulk
//   29->31     318/330          12        30          0.40         330     bulk
//   31->37     420/510          90       126          0.71         426     bulk
//   ok    at 31->37 the record classes {15,33} avoid the seam {10,12} and the fixed class 24
//
//   The seam split at 31->37 is 90 in absolute terms (vs <= 12 at every other fold) but the
//   fold's own spread is 126: normalized 0.71, ranked first but adjacent to 13->17's 0.67 — a spike-tier
//   effect (510 sits in the second tier {a=12,14,34,36}, which contains seam a=12 AND its
//   mirror 36), not a new mechanism. VERDICT: at the fold/mirror layer x = 37 is
//   UNEXCEPTIONAL — generic |specials| = 4, unremarkable w = 11, record not seam-adjacent,
//   not mirror-fixed; the c2' spike is not carried by the anchored/mirror structure.
//
// ALL SELF-TESTS PASS
// ============================================================================
// READINGS
//
// ============================================================================
// READINGS
// (2026-08-20; all figures quoted below appear in the OUTPUT block above.
// Legend per house convention: [PROVEN] derived theorem; [VERIFIED] checked
// computationally here; [MEASURED] empirical, finite range.)
//
// 1. CALIBRATION HOLDS, EIGHT FOR EIGHT, BEFORE ANYTHING IS CLAIMED. The
//    level rebuild reproduces the staircase artifacts on the digit (N = 90,
//    sum cap1 = 288, sum cap2 = 56, floor 34, truth 45; @13: N = 990,
//    sum cap2 = 880, floor 110, truth 307) and both adversarial witnesses
//    replay exactly (16 @11, 152 @13). Only after these does anything below
//    get quoted.
//
// 2. THE MECHANISM TABLE (task a), in one breath each. COFACTOR RIGIDITY
//    pins the low comb: below the Scour's protection radius 13^2-2 = 167 an
//    anchored strike can only be a self-strike, so all 6 comb slots there
//    ([17,41,71,101,107,137]) are genuine twins, and the anchored kills
//    below 167 are exactly the fresh self-strikes {17, 41} [PROVEN via
//    Lemma 1 + VERIFIED]. THE MIRROR is the class-space covariance
//    sigma(K_q(a)) = K_q(w-a): on this comb it is EXCEPTION-FREE — 300 of
//    300 classes, no specials [PROVEN here, one line: no comb slot wraps,
//    since House 29 is excluded and max slot = 2308 - 17 = 2291] — which
//    upgrades the Mirror-Sweep Lemma's "away from at most four specials" to
//    exact on the Natal@5 comb. THE BIRTH CANAL contributes negative space:
//    its carrier (the edge slot, House 29) is excluded by the comb's
//    construction, and that exclusion is exactly WHY the comb mirror is
//    special-free. One-sidedness has nothing to act on at the origin.
//
// 3. MAIN RESULT — THE UNIFIED LADDER BEATS THE STAIRCASE AT EVERY DEPTH
//    AND IS EXACT AT FULL DEPTH [PROVEN lemma + VERIFIED at @11 and @13].
//    Folding the self-strike into the cofactor injection as its m = 1 case
//    (killing the s(q) allowance) gives capU_K <= cap_K with fresh <= capU_K
//    still a hard cap — asserted at every K, every prime, both levels. The
//    floors: @11 36 at K = 0 (vs published 34), 45 = truth first at K = 8;
//    @13 115 at K = 0 (vs 110), 307 = truth first at K = 28 of 34. The
//    classic ladder PLATEAUS below truth forever: 41 @11, 296 @13.
//
// 4. THE BLOCKING STRUCTURE OF THE CLASSIC STAIRCASE, NAMED AND PRICED
//    [VERIFIED]. The s(q) allowance has exactly two blind spots: (a)
//    wheel-excluded self slots — q whose twin slot fails a comb congruence
//    and never existed (@11: q = 13, slot 11 = 0 mod 11; q = 47, slot 47 =
//    5 mod 7; @13: q = 47,79,131,163,167) — and (b) twin-collision shadows —
//    q and q-2 both scour, one slot, two allowances (@11: 19 and 43 shadow
//    17 and 41). Waste accounting closes exactly: @11 plateau 41 = 45 - 4;
//    @13: 17 allowances - 6 realized self slots = 11 = 307 - 296. The
//    unified cap prices both out automatically (comb transcription kills
//    (a) at K = 0; the freshness modulus q-2 kills (b) once in the pool).
//
// 5. WHAT THE FLOORS MEAN AGAINST THE CLASS-BLIND CEILING. Every unified
//    floor at @11 (36 through 45) exceeds advmin@11 = 16, so per the
//    corrected quantifier this IS a floor family that class-uniform caps
//    provably cannot reach — the win condition's shape. The family is
//    anchored-aware in the precise sense: its cofactor parametrization
//    exists only at the divisibility classes and its freshness conditions
//    quote the smaller primes' {0,-2}. Instantiated at the witness the
//    general form gives exactly 16 (SEC 4, full depth), i.e. it reads the
//    classes and reports each point's own truth — it never contradicts the
//    adversary, it separates from it.
//
// 6. HONEST LIMIT, STATED PLAINLY. At full depth capU(q) = fresh(q) per
//    prime — the cap family degenerates into the march, exactly as
//    staircase-note §7 predicted for cap_inf. So "certifies the truth at
//    full depth" is an exactness statement about the proof FORM (per-prime,
//    history-blind caps suffice with the whole scour as moduli), not a
//    cheap certificate. The non-degenerate content is the finite-K curve:
//    at K = 0 nothing is march-like and the floor already reads 36 > 34.
//
// 7. THE MIRROR'S VERDICT AT THE ORIGIN — IDENTITIES YES, FLOOR NO.
//    REFUTED as an improvement channel: symmetrization max(F(a), F(sigma a))
//    gains identically 0, because every cap in every family here is itself
//    mirror-covariant (co-anchored fresh vector identical per prime;
//    500/500 random vectors equal). What the mirror DOES give, verified:
//    the [ADV] shard row is a perfect palindrome under a -> 9-a mod 13
//    (13/13 cells — sitting unremarked in the embedded advmin artifact),
//    the witness pairs with a second 16-survivor witness, the unique
//    mirror-FIXED assignment scores 48 (no symmetric adversary attains 16),
//    and counts transfer while SETS do not: the anchored survivor set
//    overlaps its sigma-image in only 26 of 45 slots (13 of 45 mirror pairs
//    are twin-twin). Covariance, not constraint.
//
// 8. THE FORCING LADDER IS THE FRAME'S NUMBER [MEASURED, exact minima].
//    "Sparse but mechanically forced," priced: advmin with the first j
//    primes anchored runs 16 -> 20 -> 20 -> 22 -> 23 -> 25 -> 30 -> 35 ->
//    38 -> 42 -> 45. Anchoring q = 13 alone forces +4; every single prime
//    forces at least +1; the witness avoids the divisibility classes
//    {0,2,w,w+2} at all 10 primes, and the cited shard row prices entering
//    one at q = 13 at >= 18 > 16. The anchored point is not merely one
//    point of the product space — each divisibility choice is individually
//    costly to the adversary, and the costs accumulate to the full 16 -> 45.
//
// 9. THE RIGIDITY-FREE CONTROL SEPARATES THE MECHANISMS [MEASURED].
//    Class-reading caps WITHOUT the cofactor parametrization floor at 17
//    (anchored, K = 0) against the unified 36: rigidity is worth 19 of the
//    depth-0 floor. Note 17 > 16: even naive class-counting at the origin
//    exceeds the class-blind ceiling by 1. C-A is valid everywhere but weak
//    (floor 5 at the witness at K = 0); not the route.
//
// 10. THE x = 37 SECONDARY: UNEXCEPTIONAL AT THE ANCHORED/MIRROR LAYER
//    [MEASURED, from cited curves]. w(31->37) = 11 (w/p = 0.297,
//    unremarkable; cross-checked by BigInt against all 9 cited [HSW] w
//    values), |specials| = 4 (generic; only 5->7 has 3), the record classes
//    {15,33} avoid both the seam {10,12} and the fixed class 24, and the
//    headline-looking seam split 90 normalizes to 0.71 of the fold's own
//    spread 126 — adjacent to 13->17's 0.67, a spike-tier effect (510 sits
//    in the second tier with seam a=12 and its mirror 36), not a mechanism.
//    The c2'(37) = 0.5939 / G2/h = 8.00 / h2/G2 = 1.341 outlier is NOT
//    explained by anything the anchored/mirror structure measures here.
//    A negative, recorded as the brief asked.
//
// 11. NOT REACHED. (i) advmin@13 exact stays parked at [21, 152]; nothing
//    here touches it. (ii) The unified ladder at @17+ (would need the
//    segmented-march engines; the lemma applies verbatim). (iii) A
//    NON-degenerate (cheap-K) certificate reaching truth — K = 8 of 10 @11
//    and K = 28 of 34 @13 are most of the scour; whether the K-cost curve
//    has a better shape at depth is open. (iv) Whether the forcing ladder's
//    shape (its early flats 20 -> 20 and late slope) carries a law; ten
//    points at one level are not a law. (v) Any m >= 2 statement.
// ============================================================================
