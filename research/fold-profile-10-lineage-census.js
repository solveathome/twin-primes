// ============================================================================
// FOLD PROFILE 10 — THE LINEAGE CENSUS: where do twin slots actually come from?
// ============================================================================
// Chris, 2026-08-17: if late natal cohorts almost never contain a twin prime,
// are we mostly dependent on the low-X cohorts?
//
// A slot's BIRTH LEVEL is well defined. Every twin slot satisfies r = -1 (mod 6),
// and slot r of T_x descends from slot (r mod W') of T_{x'}. A slot is natal at
// fold y exactly when its parent was the EDGE slot, i.e. r = -1 (mod y'#) but
// r != -1 (mod y#). So
//
//        birth level of r = the first primorial modulus at which r stops being -1.
//
//   S1  the predicted lineage split, (y-3)/D_y, and its cumulative
//   S2  the same computed directly on a real tile, slot by slot
//   S3  the same computed on ACTUAL TWIN PRIMES below 1e8
//   S4  the natal term's share of the fold law, level by level
//
// Run:  node --max-old-space-size=6000 fold-profile-10-lineage-census.js
// ============================================================================
'use strict';

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const log = (s) => process.stderr.write('   [' + el() + '] ' + s + '\n');

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
const PRIMORIAL = [];
{ let w = 1; for (const q of PRIMES) { w *= q; PRIMORIAL.push(w); } }   // 2,6,30,210,...
const DENS = [];
{ let d = 1; for (const q of PRIMES) { if (q > 2) d *= (q - 2); DENS.push(d); } }  // D at each level

console.log('='.repeat(96));
console.log('FOLD PROFILE 10 — the lineage census: 99.9% of all twin slots are born early');
console.log('='.repeat(96));

// ---------------------------------------------------------------------------
console.log('');
console.log('S1. THE PREDICTED SPLIT — a slot born at level y has (y-3)/D_y of the population');
console.log('-'.repeat(96));
console.log('   birth level y |  cohort size y-3 |      D_y |   share (y-3)/D_y |  cumulative');
let cum = 0;
for (let i = 2; i < PRIMES.length; i++) {
  const y = PRIMES[i], Dy = DENS[i];
  const share = (y - 3) / Dy;
  cum += share;
  console.log(`   ${String(y).padStart(13)} | ${String(y - 3).padStart(16)} | ${String(Dy).padStart(8)} | ` +
    `${share.toExponential(4).padStart(17)} | ${cum.toFixed(6)}`);
}
console.log('   (the residue is the eternal-edge lineage, share 1/D_x, which vanishes)');

// ---------------------------------------------------------------------------
// S2. directly on a real tile
// ---------------------------------------------------------------------------
function tileT5() { return { x: 5, W: 30, s0: 11, D: 3, gaps: Uint16Array.from([6, 12, 12]) }; }
function fold(T, p) {
  const { W, s0, D, gaps } = T;
  const Dn = D * (p - 2), Wn = W * p;
  const ng = new Uint16Array(Dn);
  const w = W % p, d2 = p - 2;
  let idx = 0, prev = -1, first = -1;
  for (let k = 0; k < p; k++) {
    const base = k * W, sh = (k * w) % p;
    let r = (s0 + sh) % p, pos = base + s0;
    for (let j = 0; j < D; j++) {
      if (r !== 0 && r !== d2) { if (first < 0) first = pos; else ng[idx++] = pos - prev; prev = pos; }
      const g = gaps[j]; pos += g; r += g % p; if (r >= p) r -= p;
    }
  }
  ng[idx++] = (first + Wn) - prev;
  if (idx !== Dn) throw new Error('census');
  return { x: p, W: Wn, s0: first, D: Dn, gaps: ng };
}

// birth level of r: first primorial index i>=2 with r % PRIMORIAL[i] != PRIMORIAL[i]-1
function birthLevel(r) {
  for (let i = 2; i < PRIMORIAL.length; i++) {
    if (r % PRIMORIAL[i] !== PRIMORIAL[i] - 1) return PRIMES[i];
  }
  return 'edge';
}

console.log('');
console.log('S2. DIRECTLY ON T23 — every one of its 7,952,175 slots classified by birth level');
console.log('-'.repeat(96));
{
  let T = tileT5();
  for (const p of [7, 11, 13, 17, 19, 23]) T = fold(T, p);
  const cnt = {};
  let pos = T.s0;
  for (let j = 0; j < T.D; j++) { const b = birthLevel(pos); cnt[b] = (cnt[b] || 0) + 1; pos += T.gaps[j]; }
  console.log('   birth level |        slots |   measured share |  predicted (y-3)/D_y |  ratio');
  let tot = 0;
  for (let i = 2; i < PRIMES.length; i++) {
    const y = PRIMES[i]; if (!(y in cnt)) continue;
    const share = cnt[y] / T.D, pred = (y - 3) / DENS[i];
    tot += cnt[y];
    console.log(`   ${String(y).padStart(11)} | ${cnt[y].toLocaleString().padStart(12)} | ${share.toExponential(4).padStart(16)} | ` +
      `${pred.toExponential(4).padStart(20)} | ${(share / pred).toFixed(6)}`);
  }
  if ('edge' in cnt) console.log(`   ${'edge'.padStart(11)} | ${String(cnt.edge).padStart(12)} | ` +
    `${(cnt.edge / T.D).toExponential(4).padStart(16)} | ${(1 / T.D).toExponential(4).padStart(20)} | 1.000000`);
  console.log(`   CUSTODY: classified ${(tot + (cnt.edge || 0)).toLocaleString()} of ${T.D.toLocaleString()} slots  ` +
    (tot + (cnt.edge || 0) === T.D ? 'ALL' : '*** MISSING ***'));
}

// ---------------------------------------------------------------------------
// S3. on actual twin primes
// ---------------------------------------------------------------------------
console.log('');
console.log('S3. ON ACTUAL TWIN PRIMES BELOW 1e8 — does the truth follow the lineage law?');
console.log('-'.repeat(96));
{
  const N = 1e8;
  log('sieving to 1e8 ...');
  const comp = new Uint8Array(N + 3);
  comp[0] = comp[1] = 1;
  for (let i = 2; i * i <= N + 2; i++) if (!comp[i]) for (let j = i * i; j <= N + 2; j += i) comp[j] = 1;
  const cnt = {}; let total = 0;
  for (let n = 5; n + 2 <= N; n++) {
    if (!comp[n] && !comp[n + 2]) { const b = birthLevel(n); cnt[b] = (cnt[b] || 0) + 1; total++; }
  }
  console.log(`   twin pairs counted: ${total.toLocaleString()}`);
  console.log('   birth level |  twin pairs |   measured share |  predicted (y-3)/D_y |  ratio');
  for (let i = 2; i < PRIMES.length; i++) {
    const y = PRIMES[i]; if (!(y in cnt)) continue;
    const share = cnt[y] / total, pred = (y - 3) / DENS[i];
    console.log(`   ${String(y).padStart(11)} | ${cnt[y].toLocaleString().padStart(11)} | ${share.toExponential(4).padStart(16)} | ` +
      `${pred.toExponential(4).padStart(20)} | ${(share / pred).toFixed(4)}`);
  }
  if ('edge' in cnt) console.log(`   ${'edge'.padStart(11)} | ${String(cnt.edge).padStart(11)} | ${(cnt.edge / total).toExponential(4).padStart(16)}`);
}

// ---------------------------------------------------------------------------
console.log('');
console.log('S4. THE NATAL TERM\'S SHARE OF THE FOLD LAW  D_new = 1 + carried*(p-2) + (p-3)');
console.log('-'.repeat(96));
console.log('   fold p |      D_new |  natal p-3 |  natal share of D_new');
for (let i = 3; i < PRIMES.length; i++) {
  const p = PRIMES[i], Dn = DENS[i];
  console.log(`   ${String(p).padStart(6)} | ${String(Dn).padStart(10)} | ${String(p - 3).padStart(10)} | ${((p - 3) / Dn).toExponential(4)}`);
}
console.log('');
console.log('   The natal term is a rounding error in the census from fold 13 onward, and it falls');
console.log('   superexponentially. The creation engine contributes essentially nothing to the');
console.log('   population; the population is carried.');

console.log('');
console.log('   done in ' + el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fold-profile-10-lineage-census.js
//   invocation:  node research/fold-profile-10-lineage-census.js
//   code-sha256: 369d75836be4e975f8e25f3f73c9c81baed789b6990695bfc82845bb6af4027f
//   out-sha256:  626dcee9fcd322211fa36a2ab309324d320d76d384a9636df4b5b2525bddf3dc
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     1.3 s
// ============================================================================
// ================================================================================================
// FOLD PROFILE 10 — the lineage census: 99.9% of all twin slots are born early
// ================================================================================================
//
// S1. THE PREDICTED SPLIT — a slot born at level y has (y-3)/D_y of the population
// ------------------------------------------------------------------------------------------------
//    birth level y |  cohort size y-3 |      D_y |   share (y-3)/D_y |  cumulative
//                5 |                2 |        3 |         6.6667e-1 | 0.666667
//                7 |                4 |       15 |         2.6667e-1 | 0.933333
//               11 |                8 |      135 |         5.9259e-2 | 0.992593
//               13 |               10 |     1485 |         6.7340e-3 | 0.999327
//               17 |               14 |    22275 |         6.2851e-4 | 0.999955
//               19 |               16 |   378675 |         4.2253e-5 | 0.999997
//               23 |               20 |  7952175 |         2.5150e-6 | 1.000000
//               29 |               26 | 214708725 |         1.2109e-7 | 1.000000
//               31 |               28 | 6226553025 |         4.4969e-9 | 1.000000
//    (the residue is the eternal-edge lineage, share 1/D_x, which vanishes)
//
// S2. DIRECTLY ON T23 — every one of its 7,952,175 slots classified by birth level
// ------------------------------------------------------------------------------------------------
//    birth level |        slots |   measured share |  predicted (y-3)/D_y |  ratio
//              5 |    5,301,450 |        6.6667e-1 |            6.6667e-1 | 1.000000
//              7 |    2,120,580 |        2.6667e-1 |            2.6667e-1 | 1.000000
//             11 |      471,240 |        5.9259e-2 |            5.9259e-2 | 1.000000
//             13 |       53,550 |        6.7340e-3 |            6.7340e-3 | 1.000000
//             17 |        4,998 |        6.2851e-4 |            6.2851e-4 | 1.000000
//             19 |          336 |        4.2253e-5 |            4.2253e-5 | 1.000000
//             23 |           20 |        2.5150e-6 |            2.5150e-6 | 1.000000
//             29 |            1 |        1.2575e-7 |            1.2109e-7 | 1.038462
//    CUSTODY: classified 7,952,175 of 7,952,175 slots  ALL
//
// S3. ON ACTUAL TWIN PRIMES BELOW 1e8 — does the truth follow the lineage law?
// ------------------------------------------------------------------------------------------------
//    twin pairs counted: 440,311
//    birth level |  twin pairs |   measured share |  predicted (y-3)/D_y |  ratio
//              5 |     293,795 |        6.6724e-1 |            6.6667e-1 | 1.0009
//              7 |     117,287 |        2.6637e-1 |            2.6667e-1 | 0.9989
//             11 |      25,974 |        5.8990e-2 |            5.9259e-2 | 0.9955
//             13 |       2,977 |        6.7611e-3 |            6.7340e-3 | 1.0040
//             17 |         259 |        5.8822e-4 |            6.2851e-4 | 0.9359
//             19 |          19 |        4.3151e-5 |            4.2253e-5 | 1.0213
//
// S4. THE NATAL TERM'S SHARE OF THE FOLD LAW  D_new = 1 + carried*(p-2) + (p-3)
// ------------------------------------------------------------------------------------------------
//    fold p |      D_new |  natal p-3 |  natal share of D_new
//         7 |         15 |          4 | 2.6667e-1
//        11 |        135 |          8 | 5.9259e-2
//        13 |       1485 |         10 | 6.7340e-3
//        17 |      22275 |         14 | 6.2851e-4
//        19 |     378675 |         16 | 4.2253e-5
//        23 |    7952175 |         20 | 2.5150e-6
//        29 |  214708725 |         26 | 1.2109e-7
//        31 | 6226553025 |         28 | 4.4969e-9
//
//    The natal term is a rounding error in the census from fold 13 onward, and it falls
//    superexponentially. The creation engine contributes essentially nothing to the
//    population; the population is carried.
//
//    done in 1.2s
// ============================================================================
// READINGS (2026-08-18) — honestly calibrated
// ============================================================================
// 1. THE LAW IS EXACT ON THE TILE, TO SIX PLACES, AND CUSTODY IS COMPLETE. S2
//    classifies all 7,952,175 slots of T23 ("CUSTODY: classified 7,952,175 of
//    7,952,175 slots ALL") and the measured/predicted ratio is 1.000000 at
//    every birth level from 5 to 23. That is not a fit, it is an identity: the
//    cohort at level y is exactly y-3 members per period of y#, so the share is
//    (y-3)/D_y by construction. S2 is a check on the classifier, not evidence
//    for the law.
// 2. THE LAST ROW OF S2 IS A CATEGORY ERROR THAT LOOKS LIKE AGREEMENT. Birth
//    level 29 shows 1 slot, measured share 1.2575e-7, predicted 1.2109e-7,
//    ratio 1.038462. T23 has no level-29 cohort. That single slot is the
//    ETERNAL EDGE r = W-1, which is -1 modulo every primorial and therefore
//    never gets a finite birth level; S1's footnote names it ("the residue is
//    the eternal-edge lineage, share 1/D_x"). Comparing it against (29-3)/D_29
//    compares one object with another, and the 3.8% "agreement" is pure
//    arithmetic: D_29 = 27*D_23, so the ratio is exactly 27/26 = 1.038462 and
//    would print the same at any level. Nothing is measured in that row.
// 3. THE TWIN-PRIME TEST IS THE REAL EVIDENCE AND IT PASSES. S3 classifies
//    440,311 actual twin pairs below 1e8 and the ratios are 1.0009, 0.9989,
//    0.9955, 1.0040, 0.9359, 1.0213 at levels 5 through 19. The two loose rows
//    are the small ones: level 17 has 259 pairs, so Poisson noise is 6.2% and
//    the -6.4% miss is about one sigma; level 19 has 19 pairs, noise 23%. So
//    the lineage law survives contact with the primes at every level where
//    there is enough data to test it, and the test dies out at level 19 for
//    want of pairs, not for want of agreement. No error bars are printed.
// 4. THE TWIN COUNT IS OFF BY ONE FROM THE STANDARD VALUE AND THE REASON IS NOT
//    IN THE SCRIPT. "twin pairs counted: 440,311"; the standard count of pairs
//    (p, p+2) below 1e8 is 440,312 (verified here by an independent sieve). The
//    missing pair is (3,5), which is not in the mod-6 comb this classifier
//    walks. FOLD-PROFILE.md:320-321 states exactly that ("the 440,312nd is
//    (3,5), below the comb"); the script prints the bare 440,311. The .md is
//    the more careful artifact here, which is the opposite of the usual
//    direction.
// 5. S4 IS S1 AGAIN. The "natal share of D_new" column reads 2.6667e-1,
//    5.9259e-2, 6.7340e-3, 6.2851e-4, 4.2253e-5, 2.5150e-6, 1.2109e-7,
//    4.4969e-9 — the same eight numbers as S1's share column, shifted one row.
//    That is correct (the natal share of D_new IS (p-3)/D_p) and it is not an
//    independent computation. Read S4 as a restatement, not a confirmation.
// 6. THE CONCLUSION IS STRONG AND THE FILE UNDERSELLS ITS OWN CAVEAT. 99.93% of
//    T23's slots are born at level 13 or below, and the natal term is a
//    rounding error from fold 13 onward, falling superexponentially. So the
//    creation engine contributes nothing to the POPULATION. It does not follow
//    that it contributes nothing to the STRUCTURE: fold-profile-08 S5 shows
//    natal members sit at the seams, deep in the tile, which is exactly where
//    the record gaps are not, and fold-profile-09 shows the late cohorts are
//    empty of twin primes anyway. The three files agree; only this one draws
//    the population conclusion, and "the population is carried" is the right
//    statement of it.
// 7. SCOPE. One tile (T23) for S2, one bound (1e8) for S3, eleven primes in the
//    PRIMES table so nothing past 31 is reachable. The S3 sieve is the only
//    real cost in the file. Runtime 1.2 s, plain node; the header's
//    --max-old-space-size=6000 was not needed.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run of this file does not
// contain verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own run prints (printed value first):
// 0.999327, the S1 cumulative share at birth level 13, is the 99.93% of
// reading 6. The banner's own 99.9% is the same figure to one decimal.
//
// DEFINITION / LITERATURE constants: 440,312 is the standard count of twin
// pairs (p, p+2) below 1e8. Reading 4 exists to say this run prints 440,311
// instead, one lower, because the mod-6 comb does not carry (3,5). The two are
// the printed value and the printed value plus one, and the reading states the
// discrepancy rather than hiding it.
//
// TOKENIZER ARTIFACT, not a figure: 320 and -321 in "FOLD-PROFILE.md:320-321"
// are a line range in a markdown file, not quantities. The sentence they point
// at is real and reads "440,311 real pairs from (5,7) up to 10^8 (the 440,312nd
// is (3,5), below the comb)", but on the current copy of that file it sits at
// lines 324-325, so the pointer has drifted by four lines since the reading was
// written.
//
// IN-CODE: 6000 is the --max-old-space-size value in this file's own run line
// at the top, "node --max-old-space-size=6000 fold-profile-10-lineage-census.js".
// ---------------------------------------------------------------------------
