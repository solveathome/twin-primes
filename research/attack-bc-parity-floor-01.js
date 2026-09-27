'use strict';
// ============================================================================
// attack-bc-parity-floor-01 — is the 2 in B/C -> 2 the parity floor's 2?
// ============================================================================
// THE QUESTION (Chris's brief, 2026-08-23). Three counting grids in this
// corpus die and each has a 2 near it:
//   (1) the destroyer census's zone-occupancy certificate, whose budget over
//       capacity satisfies B/C = 2 - 15/(4 ln p) + o(1)
//       (research/history/staging/destroyer-census-01.md §3, HELD, never
//       red-teamed — cited here as an UNVERIFIED PREMISE and independently
//       recomputed below);
//   (2) the covering / union-bound economy, whose deciding sum is Sum 2/q
//       (REFUTED.md, "it dies at x = 13 where Sum 2/p crosses 1");
//   (3) the parity floor 2 of natal-cap-10-sieve-cap.md §1.5 — "any sieve
//       upper bound on pi_2 is off from the truth by a factor of 2 or more".
// Are (1)/(2)'s 2 and (3)'s 2 the same object?
//
// THE DERIVATION THIS FILE TESTS (done on paper first, reproduced here).
// Let H = {h_1 < ... < h_kappa} be an admissible pattern, A the set of
// residues mod 30 at which every member n + h_i is coprime to 30, a = |A|.
// Zone p = the positions n with p < n and n + h_max < p'^2 (p' = next prime).
// Zone Restriction: a member m in (p, p'^2) is composite iff lpf(m) <= p, so
// the composite-member count B is computable from the actives {q <= p} alone.
// Each destroyed position owns kappa member SLOTS, at least one composite, so
// D <= B_slots and T >= C - B_slots. Then, with L = p'^2 - p the zone length:
//     C            = L * a / 30
//     member slots = kappa * C
//     prime slots  ~ pi(zone) * kappa * a / 8         (8 reduced classes mod 30)
//     pi(zone)     ~ L / (2 ln p)
//   => prime slots / C = 30 kappa / (8 * 2 ln p) = 15 kappa / (8 ln p)
//   => B/C = kappa - 15 kappa / (8 ln p) = kappa * (1 - 15/(8 ln p)).
// At kappa = 2 this is 2 - 15/(4 ln p): the census's closed form, reproduced.
//
// WHERE EACH 2 COMES FROM, tracked:
//   * the leading kappa is MEMBERS PER TUPLE = classes removed per prime = the
//     sifting dimension. It reads kappa, not 2, for a kappa-class problem.
//   * the 15/8 = 30/(8*2) is the wheel (30), the reduced-class count (8) and
//     the ln p^2 of the zone's height. No parity anywhere.
//   * the certificate DIES at B/C = 1, not at B/C = kappa. kappa is the
//     asymptote the ratio never reaches in the certified range; 1 is the
//     pigeonhole threshold. Death is at ln p = 15 kappa / (8 (kappa - 1)).
//
// PRE-REGISTERED PREDICTIONS (written before the first run; the script grades
// itself against them and prints PASS/FAIL per line):
//   PR1  (B_slots/C)/kappa is the SAME function of p for every pattern: the
//        five curves collapse to within 3% relative at every p >= 101.
//   PR2  kappa = 1 ({0}): the certificate NEVER dies — B <= C-1 at all 1225
//        zones. (Derived death is at ln p = infinity.)
//   PR3  kappa = 2 ({0,2}): last valid p = 61, first death p = 67, permanent.
//        This also reproduces destroyer-census-01 §3 independently.
//   PR4  kappa = 3: death in 13 <= p <= 41 (derived p* = e^{45/16} = 16.6,
//        times the finite-height lateness factor 67/42.5 = 1.58 -> ~26).
//        kappa = 4: death in 7 <= p <= 31 (derived p* = e^{5/2} = 12.2).
//   PR5  at every pattern's death zone B/C lies in [1.00, 1.10]. No pattern
//        dies anywhere near 2.
// PR1 and PR2 are the load-bearing ones: PR1 says the constant is kappa, PR2
// says the death constant is not kappa. If PR2 fails (kappa = 1 dies), the
// death threshold is not 1 and the whole reading is wrong.
//
// NOT TESTED HERE, and not testable by counting: whether the parity floor 2
// is 2 for reasons that scale with kappa. That is settled by reading, not by
// this script — Selberg's B_nu = {n : Omega(n) = nu mod 2} examples are a
// kappa = 1 (linear sieve) construction and the floor they force is 2 there
// too, and the DHR sifting limit beta_1 = 2 while beta_2 = 4.26645. See the
// staging note for the citation trail.
// ============================================================================

const T0 = Date.now();
let failures = 0;
const ok = (cond, label) => {
  if (!cond) failures++;
  return cond ? 'OK' : 'FAIL';
};

// ---------------------------------------------------------------------------
// 0. sieve
// ---------------------------------------------------------------------------
const N = 1e8;
const words = new Uint32Array(((N >>> 1) + 32) >>> 5);
// bit i marks the odd number 2i+1 as COMPOSITE (or, for i = 0, the unit 1)
const mark = (i) => { words[i >>> 5] |= (1 << (i & 31)); };
const marked = (i) => (words[i >>> 5] & (1 << (i & 31))) !== 0;
mark(0); // 1 is not prime
for (let i = 1; (2 * i + 1) * (2 * i + 1) <= N; i++) {
  if (marked(i)) continue;
  const p = 2 * i + 1;
  for (let j = (p * p - 1) / 2; j <= (N >>> 1); j += p) mark(j);
}
// members of every pattern below are coprime to 30, hence odd
const isPrimeOdd = (m) => !marked((m - 1) >>> 1);

// small primes, for the zone ladder
const SMALL = 20000;
const sm = new Uint8Array(SMALL + 1).fill(1);
sm[0] = sm[1] = 0;
for (let i = 2; i * i <= SMALL; i++) if (sm[i]) for (let j = i * i; j <= SMALL; j += i) sm[j] = 0;
const smallPrimes = [];
for (let i = 2; i <= SMALL; i++) if (sm[i]) smallPrimes.push(i);

// zones: p from 7 up, p' the next prime, p'^2 <= N
const ZONES = [];
for (let k = 0; k < smallPrimes.length - 1; k++) {
  const p = smallPrimes[k], q = smallPrimes[k + 1];
  if (p < 7) continue;
  if (q * q > N) break;
  ZONES.push({ p, pn: q, hi2: q * q });
}

// ---------------------------------------------------------------------------
// 1. patterns
// ---------------------------------------------------------------------------
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
function channel(H) {
  const A = [];
  for (let r = 0; r < 30; r++) if (H.every((h) => gcd((r + h) % 30, 30) === 1)) A.push(r);
  return A;
}
const PATTERNS = [
  { name: 'k=1 {0}', H: [0] },
  { name: 'k=2 {0,2}', H: [0, 2] },
  { name: 'k=3 {0,2,6}', H: [0, 2, 6] },
  { name: 'k=3 {0,2,8}', H: [0, 2, 8] },
  { name: 'k=4 {0,2,6,8}', H: [0, 2, 6, 8] },
];
for (const P of PATTERNS) {
  P.k = P.H.length;
  P.hmax = P.H[P.H.length - 1];
  P.A = channel(P.H);
  const M = new Set();
  for (const r of P.A) for (const h of P.H) M.add((r + h) % 30);
  P.M = [...M].sort((a, b) => a - b);
  P.slotsPer30 = P.k * P.A.length;
  P.sharing = P.slotsPer30 !== P.M.length;
}

// ---------------------------------------------------------------------------
// 2. one linear pass per pattern: cumulative C, B_slots, T over positions
//    and cumulative distinct composite member values
// ---------------------------------------------------------------------------
function scanPattern(P) {
  const { H, A, M, k, hmax } = P;
  const bpSet = new Set();
  for (const z of ZONES) { bpSet.add(z.p); bpSet.add(z.hi2 - hmax - 1); bpSet.add(z.hi2 - 1); }
  const bps = [...bpSet].sort((a, b) => a - b);
  const bpIdx = new Map(); bps.forEach((v, i) => bpIdx.set(v, i));
  const nb = bps.length;

  // --- positions
  const cC = new Float64Array(nb), cB = new Float64Array(nb), cT = new Float64Array(nb);
  let ci = 0, bi = 0, ti = 0, kb = 0;
  const limit = N - hmax;
  for (let base = 0; base <= limit; base += 30) {
    for (let ai = 0; ai < A.length; ai++) {
      const n = base + A[ai];
      if (n > limit) continue;
      while (kb < nb && n > bps[kb]) { cC[kb] = ci; cB[kb] = bi; cT[kb] = ti; kb++; }
      ci++;
      let comp = 0;
      for (let i = 0; i < k; i++) if (!isPrimeOdd(n + H[i])) comp++;
      bi += comp;
      if (comp === 0) ti++;
    }
  }
  while (kb < nb) { cC[kb] = ci; cB[kb] = bi; cT[kb] = ti; kb++; }

  // --- distinct member values (composite only)
  const cD = new Float64Array(nb);
  let di = 0; kb = 0;
  for (let base = 0; base <= N; base += 30) {
    for (let mi = 0; mi < M.length; mi++) {
      const m = base + M[mi];
      if (m > N) continue;
      while (kb < nb && m > bps[kb]) { cD[kb] = di; kb++; }
      if (!isPrimeOdd(m)) di++;
    }
  }
  while (kb < nb) { cD[kb] = di; kb++; }

  const rows = ZONES.map((z) => {
    const lo = bpIdx.get(z.p);
    const hi = bpIdx.get(z.hi2 - hmax - 1);
    const hiD = bpIdx.get(z.hi2 - 1);
    const C = cC[hi] - cC[lo];
    const B = cB[hi] - cB[lo];
    const T = cT[hi] - cT[lo];
    const Bd = cD[hiD] - cD[lo];
    return { p: z.p, pn: z.pn, C, B, T, Bd, forced: C - B, ratio: B / C };
  });
  return rows;
}

for (const P of PATTERNS) P.rows = scanPattern(P);

// ---------------------------------------------------------------------------
// 3. CALIBRATION against destroyer-census-01 (HELD document, independently
//    recomputed here; a mismatch means our zone definition differs from its)
// ---------------------------------------------------------------------------
const k2 = PATTERNS[1].rows;
const CENSUS_FORCED = [8, 8, 15, 13, 17, 20, 19, 20, 22, 19, 20, 18, 12, 10, 1];
const CENSUS_P = [7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61];
const gotForced = CENSUS_P.map((p) => k2.find((r) => r.p === p).forced);
const r67 = k2.find((r) => r.p === 67);

console.log('============================================================');
console.log('CALIBRATION — independent recomputation of destroyer-census-01 §3');
console.log('============================================================');
console.log(`  zones in reach (p'^2 <= 1e8): ${ZONES.length} vs census 1225   ${ok(ZONES.length === 1225, 'zones')}`);
console.log(`  forced counts p=7..61: [${gotForced.join(', ')}]`);
console.log(`  census          §3:    [${CENSUS_FORCED.join(', ')}]   ${ok(gotForced.join() === CENSUS_FORCED.join(), 'forced')}`);
console.log(`  p=67: B=${r67.B} C=${r67.C} vs census B=503 C=497   ${ok(r67.B === 503 && r67.C === 497, 'p67')}`);
const nValid2 = k2.filter((r) => r.B <= r.C - 1).length;
console.log(`  zones where B <= C-1 (kappa=2): ${nValid2} vs census 15   ${ok(nValid2 === 15, 'n15')}`);
console.log(`  every forced count <= truth T:  ${ok(k2.every((r) => r.forced <= r.T), 'sound')}`);

// ---------------------------------------------------------------------------
// 4. the pattern table
// ---------------------------------------------------------------------------
console.log('');
console.log('============================================================');
console.log('SEC 1 — the patterns, their wheels, and their member sharing');
console.log('============================================================');
console.log('  pattern        kappa  A (mod 30)                    slots/30  distinct  sharing');
for (const P of PATTERNS) {
  console.log(`  ${P.name.padEnd(14)} ${String(P.k).padEnd(6)} {${P.A.join(',')}}`.padEnd(63) +
    `${String(P.slotsPer30).padEnd(9)} ${String(P.M.length).padEnd(9)} ${P.sharing ? 'YES' : 'no'}`);
}

// ---------------------------------------------------------------------------
// 5. death points
// ---------------------------------------------------------------------------
console.log('');
console.log('============================================================');
console.log('SEC 2 — where each counting certificate dies, and at what ratio');
console.log('============================================================');
console.log('  the certificate is  B_slots <= C-1  (D <= B_slots is exact: each');
console.log('  destroyed position charges one of its OWN kappa slots)');
console.log('');
console.log('  pattern         valid zones  last valid p  first dead p  B,C there   B/C there  derived p*  returns?');
const DEATH = {};
for (const P of PATTERNS) {
  const valid = P.rows.filter((r) => r.B <= r.C - 1);
  const dead = P.rows.filter((r) => r.B > r.C - 1);
  const lastValid = valid.length ? valid[valid.length - 1].p : null;
  const firstDead = dead.length ? dead[0].p : null;
  const fdRow = firstDead === null ? null : P.rows.find((r) => r.p === firstDead);
  const returns = firstDead === null ? false : valid.some((r) => r.p > firstDead);
  const pstar = P.k === 1 ? Infinity : Math.exp(15 * P.k / (8 * (P.k - 1)));
  DEATH[P.name] = { lastValid, firstDead, ratio: fdRow ? fdRow.ratio : null, returns, valid: valid.length };
  console.log(`  ${P.name.padEnd(15)} ${String(valid.length).padEnd(12)} ${String(lastValid).padEnd(13)} ` +
    `${String(firstDead).padEnd(13)} ${(fdRow ? `${fdRow.B},${fdRow.C}` : '--').padEnd(11)} ` +
    `${fdRow ? fdRow.ratio.toFixed(4).padEnd(10) : '  --      '} ` +
    `${(pstar === Infinity ? 'inf' : pstar.toFixed(1)).padEnd(11)} ${returns ? 'YES' : 'no'}`);
}

// ---------------------------------------------------------------------------
// 6. the collapse test: is the leading constant kappa?
// ---------------------------------------------------------------------------
console.log('');
console.log('============================================================');
console.log('SEC 3 — (B_slots/C)/kappa against the kappa-free curve 1 - 15/(8 ln p)');
console.log('============================================================');
const SHOW = [7, 11, 13, 17, 19, 23, 29, 41, 61, 67, 101, 211, 499, 997, 2003, 4999, 9967];
let hdr = '  p'.padEnd(8) + 'derived  ';
for (const P of PATTERNS) hdr += P.name.padEnd(14);
console.log(hdr);
let worst = 0, worstAt = '';
for (const p of SHOW) {
  const der = 1 - 15 / (8 * Math.log(p));
  let line = `  ${String(p).padEnd(6)}${der.toFixed(4).padEnd(9)}`;
  for (const P of PATTERNS) {
    const r = P.rows.find((x) => x.p === p);
    const v = r.ratio / P.k;
    line += v.toFixed(4).padEnd(14);
    if (p >= 101) {
      const rel = Math.abs(v - der) / der;
      if (rel > worst) { worst = rel; worstAt = `${P.name} @ p=${p}`; }
    }
  }
  console.log(line);
}
console.log('');
console.log(`  worst relative deviation from the derived curve at p >= 101: ${(100 * worst).toFixed(2)}%  (${worstAt})`);
// cross-pattern spread at matched p, the collapse statement proper
let spreadWorst = 0, spreadAt = '';
for (const r of PATTERNS[0].rows) {
  if (r.p < 101) continue;
  const vals = PATTERNS.map((P) => P.rows.find((x) => x.p === r.p).ratio / P.k);
  const s = (Math.max(...vals) - Math.min(...vals)) / (vals.reduce((a, b) => a + b, 0) / vals.length);
  if (s > spreadWorst) { spreadWorst = s; spreadAt = `p=${r.p}`; }
}
console.log(`  worst cross-pattern spread of (B/C)/kappa at p >= 101:       ${(100 * spreadWorst).toFixed(2)}%  (${spreadAt})`);

// ---------------------------------------------------------------------------
// 7. what the certificate actually asks for
// ---------------------------------------------------------------------------
console.log('');
console.log('============================================================');
console.log('SEC 4 — the certificate restated: it needs (kappa-1)/kappa of all');
console.log('        member slots to be PRIME. That fraction, measured.');
console.log('============================================================');
console.log('  pattern         (k-1)/k   f(prime slots) at p=61   at p=997   at p=9967   f needed / f true @9967');
for (const P of PATTERNS) {
  const need = (P.k - 1) / P.k;
  const f = (p) => { const r = P.rows.find((x) => x.p === p); return (P.k * r.C - r.B) / (P.k * r.C); };
  const f61 = f(61), f997 = f(997), f9967 = f(9967);
  console.log(`  ${P.name.padEnd(15)} ${need.toFixed(4).padEnd(9)} ${f61.toFixed(4).padEnd(24)} ${f997.toFixed(4).padEnd(10)} ${f9967.toFixed(4).padEnd(11)} ` +
    `${need === 0 ? '   0 (vacuous)' : (need / f9967).toFixed(2)}`);
}

// ---------------------------------------------------------------------------
// 8. the kappa=1 degeneracy
// ---------------------------------------------------------------------------
console.log('');
console.log('============================================================');
console.log('SEC 5 — the kappa = 1 control is an IDENTITY, not a certificate');
console.log('============================================================');
const k1 = PATTERNS[0].rows;
const identical = k1.every((r) => r.forced === r.T);
console.log(`  forced = C - B equals the truth T at all ${k1.length} zones: ${identical ? 'YES' : 'NO'}   ${ok(identical, 'k1id')}`);
console.log(`  so at kappa = 1 the pigeonhole returns the exact prime count and`);
console.log(`  proves nothing it was not handed. Its "budget/capacity ratio"`);
console.log(`  limits to 1, and 1 is not the parity floor.`);
const k1min = k1.reduce((a, r) => Math.min(a, r.C - r.B), Infinity);
console.log(`  min over zones of C - B at kappa = 1: ${k1min}  (a prime in every (p, p'^2) — Bertrand-strength)`);

// ---------------------------------------------------------------------------
// 9. the OTHER grid: the union-bound / Mertens economy, scanned in kappa
// ---------------------------------------------------------------------------
console.log('');
console.log('============================================================');
console.log('SEC 6 — the second grid: Sum_{5<=q<=x} kappa/q, and where it crosses');
console.log('============================================================');
console.log('  the threshold is 1 for every kappa; the kappa is a multiplier on');
console.log('  the Mertens sum, never the threshold');
console.log('');
console.log('  kappa   last x with Sum kappa/q < 1   Sum at that x   Sum at next prime   limit of the sum');
for (const kap of [1, 2, 3, 4]) {
  let s = 0, last = null, sLast = 0, sNext = null;
  for (const q of smallPrimes) {
    if (q < 5) continue;
    const s2 = s + kap / q;
    if (s2 < 1) { s = s2; last = q; sLast = s2; } else { sNext = s2; break; }
  }
  console.log(`  ${String(kap).padEnd(7)} ${String(last).padEnd(29)} ${sLast.toFixed(4).padEnd(15)} ${sNext.toFixed(4).padEnd(19)} divergent (kappa lnln x)`);
}

// ---------------------------------------------------------------------------
// 10. distinct-member budget (a NON-theorem, reported for completeness)
// ---------------------------------------------------------------------------
console.log('');
console.log('============================================================');
console.log('SEC 7 — B_distinct: smaller, but NOT a proven budget when members');
console.log('        are shared between positions. Does it move any death point?');
console.log('============================================================');
console.log('  pattern         slots/distinct  last p with B_dist <= C-1   vs slot-budget last valid p');
for (const P of PATTERNS) {
  const valid = P.rows.filter((r) => r.Bd <= r.C - 1);
  const lv = valid.length ? valid[valid.length - 1].p : null;
  console.log(`  ${P.name.padEnd(15)} ${(P.slotsPer30 / P.M.length).toFixed(4).padEnd(15)} ${String(lv).padEnd(27)} ${DEATH[P.name].lastValid}`);
}

// ---------------------------------------------------------------------------
// 11. prereg grading
// ---------------------------------------------------------------------------
console.log('');
console.log('============================================================');
console.log('SEC 8 — PRE-REGISTERED PREDICTIONS, graded');
console.log('============================================================');
const pr1 = spreadWorst < 0.03;
console.log(`  PR1  cross-pattern collapse of (B/C)/kappa within 3% at p>=101 : ${(100 * spreadWorst).toFixed(2)}%  ${pr1 ? 'PASS' : 'FAIL'}`);
const pr2 = DEATH['k=1 {0}'].firstDead === null;
console.log(`  PR2  kappa=1 never dies                                        : ${pr2 ? 'no death in 1225 zones' : 'died at p=' + DEATH['k=1 {0}'].firstDead}  ${pr2 ? 'PASS' : 'FAIL'}`);
const d2 = DEATH['k=2 {0,2}'];
const pr3 = d2.lastValid === 61 && d2.firstDead === 67 && !d2.returns;
console.log(`  PR3  kappa=2 last valid 61, dies 67, permanent                 : ${d2.lastValid}/${d2.firstDead}/${d2.returns ? 'returns' : 'permanent'}  ${pr3 ? 'PASS' : 'FAIL'}`);
const d3a = DEATH['k=3 {0,2,6}'], d3b = DEATH['k=3 {0,2,8}'], d4 = DEATH['k=4 {0,2,6,8}'];
const inb = (v, lo, hi) => v !== null && v >= lo && v <= hi;
const pr4 = inb(d3a.firstDead, 13, 41) && inb(d3b.firstDead, 13, 41) && inb(d4.firstDead, 7, 31);
console.log(`  PR4  kappa=3 dies in [13,41], kappa=4 in [7,31]                : ${d3a.firstDead}/${d3b.firstDead}/${d4.firstDead}  ${pr4 ? 'PASS' : 'FAIL'}`);
const deathRatios = PATTERNS.filter((P) => DEATH[P.name].firstDead !== null).map((P) => DEATH[P.name].ratio);
const pr5 = deathRatios.every((r) => r >= 1.0 && r <= 1.10);
console.log(`  PR5  B/C at every death zone in [1.00,1.10]                    : [${deathRatios.map((r) => r.toFixed(3)).join(', ')}]  ${pr5 ? 'PASS' : 'FAIL'}`);
const prPass = [pr1, pr2, pr3, pr4, pr5].filter(Boolean).length;
console.log(`  PREREG SCORE: ${prPass} of 5. A FAIL is a FAIL and is not re-banded here.`);
console.log('');
console.log('  THE ANSWER THIS GRID GIVES:');
console.log('    the leading constant of B/C is kappa (PR1), so the "2" of the');
console.log('    census IS the sifting dimension and reads 1 and 3 and 4 for the');
console.log('    one-, three- and four-class problems;');
console.log('    the constant that KILLS the certificate is 1, at every kappa');
console.log('    (PR5), and at kappa = 1 nothing is killed at all (PR2).');
console.log('    2 is a limit the certified range never reaches, not a threshold.');

console.log('');
console.log(`elapsed ${((Date.now() - T0) / 1000).toFixed(1)} s`);
console.log(`${failures === 0 ? 'ALL CALIBRATION ASSERTIONS PASS' : `CALIBRATION FAILURES: ${failures}`}; PREREG ${prPass} of 5`);
if (failures > 0) process.exitCode = 1;

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-bc-parity-floor-01.js
//   invocation:  node research/attack-bc-parity-floor-01.js
//   code-sha256: ebb23e165eef1913c7c99635936b9d0de752eef44086d08a9118996a4f72312e
//   out-sha256:  871db77156ce86dd96fbc680de721fbc20b423941e2c09a1f942a455f120d8f6
//   body-lines:  121
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-26
//   elapsed:     1.3 s
// ============================================================================
// ============================================================
// CALIBRATION — independent recomputation of destroyer-census-01 §3
// ============================================================
//   zones in reach (p'^2 <= 1e8): 1225 vs census 1225   OK
//   forced counts p=7..61: [8, 8, 15, 13, 17, 20, 19, 20, 22, 19, 20, 18, 12, 10, 1]
//   census          §3:    [8, 8, 15, 13, 17, 20, 19, 20, 22, 19, 20, 18, 12, 10, 1]   OK
//   p=67: B=503 C=497 vs census B=503 C=497   OK
//   zones where B <= C-1 (kappa=2): 15 vs census 15   OK
//   every forced count <= truth T:  OK
//
// ============================================================
// SEC 1 — the patterns, their wheels, and their member sharing
// ============================================================
//   pattern        kappa  A (mod 30)                    slots/30  distinct  sharing
//   k=1 {0}        1      {1,7,11,13,17,19,23,29}                8         8         no
//   k=2 {0,2}      2      {11,17,29}                             6         6         no
//   k=3 {0,2,6}    3      {11,17}                                6         5         YES
//   k=3 {0,2,8}    3      {11,29}                                6         6         no
//   k=4 {0,2,6,8}  4      {11}                                   4         4         no
//
// ============================================================
// SEC 2 — where each counting certificate dies, and at what ratio
// ============================================================
//   the certificate is  B_slots <= C-1  (D <= B_slots is exact: each
//   destroyed position charges one of its OWN kappa slots)
//
//   pattern         valid zones  last valid p  first dead p  B,C there   B/C there  derived p*  returns?
//   k=1 {0}         1225         9967          null          --            --       inf         no
//   k=2 {0,2}       15           61            67            503,497     1.0121     42.5        no
//   k=3 {0,2,6}     4            17            19            33,33       1.0000     16.7        no
//   k=3 {0,2,8}     5            19            23            60,54       1.1111     16.7        no
//   k=4 {0,2,6,8}   2            11            13            8,8         1.0000     12.2        no
//
// ============================================================
// SEC 3 — (B_slots/C)/kappa against the kappa-free curve 1 - 15/(8 ln p)
// ============================================================
//   p     derived  k=1 {0}       k=2 {0,2}     k=3 {0,2,6}   k=3 {0,2,8}   k=4 {0,2,6,8}
//   7     0.0364   0.1333        0.1364        0.1250        0.0952        0.1250
//   11    0.2181   0.1905        0.2333        0.2000        0.1852        0.1875
//   13    0.2690   0.2466        0.2222        0.2222        0.2745        0.2500
//   17    0.3382   0.2857        0.3030        0.2727        0.3182        0.2955
//   19    0.3632   0.3259        0.3300        0.3333        0.3232        0.3281
//   23    0.4020   0.3687        0.3765        0.3827        0.3704        0.3889
//   29    0.4432   0.3871        0.3967        0.3817        0.3934        0.3871
//   41    0.4951   0.4398        0.4472        0.4306        0.4426        0.4280
//   61    0.5439   0.4992        0.4989        0.4994        0.5000        0.5000
//   67    0.5541   0.5053        0.5060        0.5030        0.5076        0.5045
//   101   0.5937   0.5475        0.5490        0.5457        0.5503        0.5487
//   211   0.6497   0.6169        0.6174        0.6175        0.6166        0.6174
//   499   0.6982   0.6705        0.6704        0.6700        0.6706        0.6699
//   997   0.7284   0.7063        0.7063        0.7062        0.7064        0.7063
//   2003  0.7534   0.7349        0.7348        0.7348        0.7349        0.7349
//   4999  0.7799   0.7652        0.7652        0.7652        0.7652        0.7651
//   9967  0.7964   0.7839        0.7839        0.7839        0.7839        0.7839
//
//   worst relative deviation from the derived curve at p >= 101: 8.09%  (k=3 {0,2,6} @ p=101)
//   worst cross-pattern spread of (B/C)/kappa at p >= 101:       1.05%  (p=113)
//
// ============================================================
// SEC 4 — the certificate restated: it needs (kappa-1)/kappa of all
//         member slots to be PRIME. That fraction, measured.
// ============================================================
//   pattern         (k-1)/k   f(prime slots) at p=61   at p=997   at p=9967   f needed / f true @9967
//   k=1 {0}         0.0000    0.5008                   0.2937     0.2161         0 (vacuous)
//   k=2 {0,2}       0.5000    0.5011                   0.2937     0.2161      2.31
//   k=3 {0,2,6}     0.6667    0.5006                   0.2938     0.2161      3.08
//   k=3 {0,2,8}     0.6667    0.5000                   0.2936     0.2161      3.09
//   k=4 {0,2,6,8}   0.7500    0.5000                   0.2937     0.2161      3.47
//
// ============================================================
// SEC 5 — the kappa = 1 control is an IDENTITY, not a certificate
// ============================================================
//   forced = C - B equals the truth T at all 1225 zones: YES   OK
//   so at kappa = 1 the pigeonhole returns the exact prime count and
//   proves nothing it was not handed. Its "budget/capacity ratio"
//   limits to 1, and 1 is not the parity floor.
//   min over zones of C - B at kappa = 1: 26  (a prime in every (p, p'^2) — Bertrand-strength)
//
// ============================================================
// SEC 6 — the second grid: Sum_{5<=q<=x} kappa/q, and where it crosses
// ============================================================
//   the threshold is 1 for every kappa; the kappa is a multiplier on
//   the Mertens sum, never the threshold
//
//   kappa   last x with Sum kappa/q < 1   Sum at that x   Sum at next prime   limit of the sum
//   1       107                           0.9984          1.0076              divergent (kappa lnln x)
//   2       11                            0.8675          1.0214              divergent (kappa lnln x)
//   3       5                             0.6000          1.0286              divergent (kappa lnln x)
//   4       5                             0.8000          1.3714              divergent (kappa lnln x)
//
// ============================================================
// SEC 7 — B_distinct: smaller, but NOT a proven budget when members
//         are shared between positions. Does it move any death point?
// ============================================================
//   pattern         slots/distinct  last p with B_dist <= C-1   vs slot-budget last valid p
//   k=1 {0}         1.0000          9967                        9967
//   k=2 {0,2}       1.0000          59                          61
//   k=3 {0,2,6}     1.2000          29                          17
//   k=3 {0,2,8}     1.0000          19                          19
//   k=4 {0,2,6,8}   1.0000          7                           11
//
// ============================================================
// SEC 8 — PRE-REGISTERED PREDICTIONS, graded
// ============================================================
//   PR1  cross-pattern collapse of (B/C)/kappa within 3% at p>=101 : 1.05%  PASS
//   PR2  kappa=1 never dies                                        : no death in 1225 zones  PASS
//   PR3  kappa=2 last valid 61, dies 67, permanent                 : 61/67/permanent  PASS
//   PR4  kappa=3 dies in [13,41], kappa=4 in [7,31]                : 19/23/13  PASS
//   PR5  B/C at every death zone in [1.00,1.10]                    : [1.012, 1.000, 1.111, 1.000]  FAIL
//   PREREG SCORE: 4 of 5. A FAIL is a FAIL and is not re-banded here.
//
//   THE ANSWER THIS GRID GIVES:
//     the leading constant of B/C is kappa (PR1), so the "2" of the
//     census IS the sifting dimension and reads 1 and 3 and 4 for the
//     one-, three- and four-class problems;
//     the constant that KILLS the certificate is 1, at every kappa
//     (PR5), and at kappa = 1 nothing is killed at all (PR2).
//     2 is a limit the certified range never reaches, not a threshold.
//
// elapsed 1.3 s
// ALL CALIBRATION ASSERTIONS PASS; PREREG 4 of 5
// ============================================================================
// READINGS
// ============================================================================
//
// 0. THE IDENTIFICATION IS REFUTED, AND THE FIRST NUMBER DOES IT. The brief's
//    premise is that "counting ends exactly where B/C reaches 2". It does not.
//    At the death zone p = 67 the reading is B = 503 against C = 497, that is
//    B/C = 1.0121. Every other pattern dies at 1.0000, 1.1111, 1.0000. The
//    certificate dies where B/C crosses 1, which is the pigeonhole threshold,
//    and 2 is only the limit the ratio walks toward long afterwards — at the
//    last computable zone p = 9967 the kappa = 2 ratio still stands at 0.7839
//    of its own limit, nowhere near it. A limit never reached inside the certified
//    range cannot be the thing that ends the range.
//
// 1. THE LEADING CONSTANT IS kappa, MEASURED, AND THAT PART IS STRUCTURAL.
//    Dividing each pattern's B/C by its own kappa collapses five curves onto
//    one to within 1.05% at every p >= 101 (worst at p = 113), across
//    kappa = 1, 2, 3, 3, 4 and four different mod-30 wheels with |A| = 8, 3,
//    2, 2, 1. The census's 2 therefore IS the sifting dimension, exactly as
//    the brief's mechanism test proposed: it reads 1 for the one-class
//    problem and 3 and 4 for the three- and four-class ones. It enters as
//    "members per tuple", which for an admissible pattern is the same integer
//    as "classes removed per prime".
//
// 2. BUT kappa ENTERS AS A MULTIPLIER, NOT AS A THRESHOLD, AND THAT KILLS THE
//    IDENTIFICATION. The whole ratio is kappa x (one kappa-free function of p),
//    the second factor measured at 0.7839 at p = 9967 against the derived
//    1 - 15/(8 ln p) = 0.7964 (the derived form is the asymptotic one and runs
//    up to 8.09% high at p = 101, so quote the measurement, not the formula).
//    Death is where the PRODUCT crosses 1. A constant that multiplies cannot
//    be a constant that thresholds.
//
// 3. THE kappa = 1 CONTROL IS THE CLEANEST SEPARATION. At kappa = 1 the
//    certificate never dies: B <= C-1 at all 1225 zones, minimum margin 26.
//    The parity floor at kappa = 1 is still 2 (Selberg's B_nu examples are a
//    linear-sieve construction; beta_1 = 2). So at kappa = 1 the counting
//    grid's constant is 1 and the parity constant is 2. Two numbers that are
//    equal at kappa = 2 and unequal at kappa = 1 are not the same object.
//
// 4. AND THE kappa = 1 CERTIFICATE IS AN IDENTITY. C - B equals the true
//    survivor count T at all 1225 zones, exactly. The one-class pigeonhole
//    returns the prime count it was handed and proves nothing; its "never
//    dies" is therefore not a rescue of the family, it is the degenerate end
//    of it. Report it as the control it is.
//
// 5. WHAT THE CERTIFICATE ACTUALLY DEMANDS, restated: that a fraction
//    (kappa-1)/kappa of all member slots be PRIME. Measured, the prime-slot
//    fraction is 0.5011 at p = 61 and 0.2161 at p = 9967 for kappa = 2, and it
//    is the same curve for every pattern (0.2161 at p = 9967 for all five, to
//    four places) — it is 1/(2 ln p)-shaped and pattern-blind. The twin
//    certificate therefore dies exactly where half the member slots stop being
//    prime, at p between 61 and 67, and the needed/true ratio at p = 9967 is
//    2.31 and rising like ln p. Not a constant gap, and not a factor 2.
//
// 6. THE SECOND GRID SCANS THE SAME WAY. Sum_{5<=q<=x} kappa/q crosses 1 at
//    x = 11 for kappa = 2 (0.8675 there, 1.0214 at the next prime), at x = 107
//    for kappa = 1, and at x = 5 for kappa = 3 and 4. The threshold is 1 at
//    every kappa and only the crossing point moves. Same verdict as SEC 2: the
//    2 in "Sum 2/p" is kappa, the deciding constant is 1.
//
// 7. THE DISTINCT-MEMBER VARIANT MOVES DEATH POINTS BY ONE OR TWO ZONES AND
//    IS NOT A THEOREM. For {0,2,6}, where member sharing is real (6 slots per
//    30 against 5 distinct values), B_distinct extends the last valid p from
//    17 to 29; for {0,2} it SHRINKS it from 61 to 59. But D <= B_distinct
//    needs a system of distinct representatives that sharing can break, so the
//    17 stands and the 29 does not. Recorded so nobody mistakes the smaller
//    column for a better certificate.
//
// 8. PR5 FAILED AND IS LEFT FAILED. The band [1.00, 1.10] was pre-registered
//    for B/C at the death zone; {0,2,8} reads 1.1111 at p = 23, from B = 60
//    against C = 54 — a zone small enough that a single integer moves the
//    ratio visibly. The band was set too tight for small counts. It changes nothing
//    in readings 0-6 (1.1111 is not 2 either), but re-banding after the fact
//    is the failure mode this house has a name for, so the FAIL stands in the
//    output and the prereg score is 4 of 5.
//
// 9. WHAT SURVIVES, AND IT IS SMALL. One sentence, MEASURED: in this frame a
//    counting grid's budget/capacity ratio is (sifting dimension) x (a
//    prime-density factor that tends to 1), and the grid dies where the
//    product crosses 1. That is a triage rule for new grids and it is not a
//    passage: it proves nothing about twins, it names no obstruction the
//    corpus did not already carry as "Mertens-barred" (natal-cap-10 §4;
//    REFUTED.md rows 43 and 55), and it has no parity content, because B is an
//    EXACT count and no improvement in any sieve upper bound touches it.
