// ============================================================================
// LOCALIZED SINGLE-ALIGNMENT RECURSION — M(x, x^3) under folding  (TODO 0d)
// ============================================================================
// THE QUESTION.  G2-STATE §9 item 8 / SESSION-2026-08-17 §5: the head [0, x^3)
// sits in copy 0 of every fold, and copy 0 receives only the alignment a = 0.
// So the head's fold recursion is SINGLE-ALIGNMENT — the kill classes are the
// fixed pair {0, -2} mod p, deterministically — where the tile recursion is a
// max over the p 2-sets {a, a-2} (THE-LENS §2), and that max is what fed every
// refuted chain.  Does the single-alignment per-fold multiplier behave
// differently from the max-over-alignments one that killed the merge chain
// (LOCALIZED-GAP §4, gate-multiplies.md §§2-5)?
//
// DEFINITIONS (exactly the repo's, localized-01-ladder.js):
//   rough[r]   = 1 iff r has no prime factor <= x  (ALL primes folded, 2 and 3
//                included; a fold by p strikes j = p, 2p, 3p, ...).
//   twin slot  = r with rough[r] and rough[r+2].
//   M(x, Y)    = largest gap between consecutive twin slots of level x whose
//                LEFT endpoint is < Y (a straddling gap counts).
//   This run:  Y = x^3, the smallest k at which the head is not frozen and not
//              crystallised (kills land at r = p*q, q prime in (p, p^2)).
//
// THE SINGLE-ALIGNMENT STATEMENT, made precise.  For x >= 11, x# > x'^3, so
// the whole window [0, x'^3) lies inside copy 0 = [0, x#) of the fold by p=x'.
// The kills inside the window are exactly the twin slots r with r ≡ 0 or -2
// (mod p): one deterministic 2-set, no max over alignments.  BUT — and the
// tile recursion never had this term — the window itself GROWS under the fold,
// from x^3 to x'^3.  So the honest per-fold decomposition is
//
//     M(x', x'^3) = max(  M(x', x^3),          <- fold damage, fixed window
//                         boundary term        <- max gap with left endpoint
//                                                 in [x^3, x'^3), fresh ground )
//
// and the fold-damage factor M(x', x^3)/M(x, x^3) is the single-alignment
// multiplier.  The boundary term is NOT a recursion at all; if it dominates,
// that is the finding, and it must be said plainly.
//
// ============================================================================
// PREDICTIONS ON RECORD — written 2026-08-17 BEFORE any run of this script.
// Registered against the repo's existing data (LOCALIZED-GAP §5, x <= 307,
// and localized-01's default ladder to x = 491: M = 150, 204, 300, ..., 990).
// Nothing beyond x = 491 has ever been measured at k = 3.
//
// P1 (law).  M(x, x^3) / ln^3 x stays in [3.6, 4.8] with no trend out to
//     x = 1289 (this is LOCALIZED-GAP's M/(k ln^3 x) in [1.2, 1.6] at k = 3,
//     extended a decade in Y).  Numerically: M(1289, 1289^3) in [1000, 2100],
//     central ~1500.  ln^3(1289) = 367.
//
// P2 (budget, the apples-to-apples ladder of gate-multiplies).
//     (a) If the single-alignment multiplier were statistically the TILE's
//     max-over-alignments multiplier — ln c(p) ~ 2 ln p / p per fold, measured
//     there at mean 1.06 x budget — the cumulative spend from x = 53 to 1289
//     would be 2 ln(theta(1289)/theta(53)) ≈ 6.7 nats, i.e.
//     M(1289) ≈ 300 * (1268/44.9)^2 ≈ 2.4e5 ≈ 0.14 * 1289^2.  REFUTABLE: two
//     orders of magnitude above P1's band.
//     (b) The window's own budget: if M = c ln^3 x with c constant, the whole
//     lifetime spend from 53 to 1289 is 3 ln(ln 1289 / ln 53) = 1.77 nats over
//     ~193 folds — mean 0.009 nats/fold, ~3/p per fold at level p, which is a
//     factor (2/3) ln p SMALLER than the tile's per-fold budget 2 ln p / p.
//     The localized target is easier in level but the budget per fold is
//     TIGHTER by a log.  Written down before measuring.
//
// P3 (kills are countable).  Kills in [0, p^3) by the fold p are deterministic
//     given residues.  Density predicts ~ 2(p^3/p) * (twin-slot density),
//     i.e. kills ≈ c_K * p^2 / ln^2 p.  From the three published points
//     (33, 41, 63 at p = 19, 23, 29 — FOLD-PROFILE §12b) c_K ≈ 0.76-0.85.
//     Predict c_K in [0.6, 1.1], flat, out to p = 1289 (≈ 20,000-25,000 kills
//     at the top fold).  The elementary countable cap — every kill is p*t or
//     p*t-2 with t p-rough, t < p^2 — gives kills <= 2 * #rough(p^2) ≈
//     1.1 p^2 / ln p unconditionally: one log above truth.
//
// P4 (decomposition — the live question).  Predict the BOUNDARY term
//     dominates: >= 2/3 of the record increments (by count and by nats) come
//     from fresh ground [x^3, x'^3), not from in-window fusion.  Reasoning on
//     record: kills touch a fraction ~2/p of in-window slots per fold, so the
//     record-adjacent gaps are hit a few times over the whole ladder, while
//     the extreme-value ceiling of the window rises at every fold.  If this
//     holds, the single-alignment multiplier is ≈ 1 at almost every fold and
//     the object's growth is window-driven, NOT fold-driven — in which case
//     the recursion has little to bound and the route closes for a structural
//     reason stated in the readings.
//
// P5 (fusion cap).  When an in-window kill does move the record, the fused
//     gap contains 1-3 kills of that fold, never more (k = 2 measurement,
//     LOCALIZED-GAP §5; U-FRAME §7 forensics).
//
// VERDICT RULES, fixed in advance:
//   - fixed-window ladder statistically = tile c(p) ladder  -> route CLOSED
//     (the "different shape" hope refuted directly).
//   - boundary term carries most of the growth               -> route CLOSED
//     structurally: the multiplier has a handle but the handle carries
//     nothing; M grows where no recursion reaches (fresh ground = the
//     original gap problem at scale x'^3, not a fold statement).
//   - fixed-window damage dominant AND countable (P3/P5 shaped, total spend
//     within P2b's budget)                                   -> route OPEN.
//
// ============================================================================
// CONTROLS (pipeline suspected first):
//   C1  incremental M must equal a from-scratch full prefix scan at
//       x = 61, 307, 1009, 1289 (different code path, same array).
//   C2  M(307) must equal 870 and M(491) must equal 990, the values of the
//       INDEPENDENT engine localized-01-ladder.js (run 2026-08-17, and 870
//       reproduces LOCALIZED-GAP §5's M/x^2 = 0.00923 at 307).
//   C3  kills in [0, p^3) at p = 19, 23, 29 must equal 33, 41, 63
//       (FOLD-PROFILE §12b, computed there from full tiles, not a sieve).
//
// Run:  node research/localized-single-alignment.js [XMAX=1289]
// Cost: see the READINGS block at the bottom after the run.
// ============================================================================
'use strict';

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const log = (s) => process.stderr.write('   [' + el() + '] ' + s + '\n');

const XMAX = Number(process.argv[2] || 1289);
const YMAX = XMAX * XMAX * XMAX;
const N = YMAX + 1000000;            // scan slack past the last window
const BUF = 100000;                  // kill-processing slack past each window
if (N + 3 > 2 ** 32 - 1) throw new Error('window exceeds Uint8Array reach');

function primesUpTo(n) {
  const s = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) if (!s[i]) { out.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; }
  return out;
}
const ladder = primesUpTo(XMAX);
const theta = {}; { let t = 0; for (const p of ladder) { t += Math.log(p); theta[p] = t; } }

log(`allocating rough[${(N + 3).toLocaleString()}] ...`);
const rough = new Uint8Array(N + 3).fill(1); rough[0] = 0;
log('allocated');

// C1's independent path: from-scratch full prefix scan, exactly localized-01's
// definition (gap counts iff left endpoint < Y; straddle included).
function fullScan(Y) {
  let prev = -1, best = 0, bestAt = -1, count = 0;
  for (let r = 1; r < N; r++) {
    if (rough[r] && rough[r + 2]) {
      if (prev >= 0 && prev < Y) { const g = r - prev; if (g > best) { best = g; bestAt = prev; } }
      if (r < Y) count++;
      prev = r;
      if (prev >= Y) break;
    }
  }
  return { M: best, at: bestAt, count };
}

const CKPT = new Set([61, 307, 1009, XMAX === 1289 ? 1289 : ladder[ladder.length - 1]]);
const KILL_CUSTODY = { 19: 33, 23: 41, 29: 63 };

// ---------------------------------------------------------------------------
// the ladder
// ---------------------------------------------------------------------------
let Yold = 0, M = 0, Mat = -1, slotCount = 0;
const rows = [], events = [];
let controlsFailed = 0;

console.log('='.repeat(110));
console.log('LOCALIZED SINGLE-ALIGNMENT RECURSION — per-fold ladder of M(x, x^3), kills, and the fixed-window/boundary split');
console.log('='.repeat(110));
console.log('p\tY=p^3\t\tkillsOld\tkillsNew  c_K\tMfixed\tM\tM/ln^3p\tdln_fix\t\tdln_bnd\t\tbudget3lnln');

for (const p of ladder) {
  if (p < 5) { for (let j = p; j <= N + 2; j += p) rough[j] = 0; continue; }
  const Ynew = p * p * p;

  // ---- pre-pass: deterministic kill census on the OLD level -------------
  // every kill in [0, lim] is p*t or p*t - 2 with the position a twin slot.
  const lim = Math.min(Ynew + BUF, N - 4);
  let killsOld = 0, killsNew = 0; const list = [];
  for (let t = 1; p * t - 2 <= lim; t++) {
    const r2 = p * t, r1 = r2 - 2;
    if (r1 >= 1 && rough[r1] && rough[r1 + 2]) {
      if (r1 < Yold) killsOld++;
      if (r1 < Ynew) killsNew++;
      if (r1 < Yold + BUF) list.push(r1);
    }
    if (r2 <= lim && rough[r2] && rough[r2 + 2]) {
      if (r2 < Yold) killsOld++;
      if (r2 < Ynew) killsNew++;
      if (r2 < Yold + BUF) list.push(r2);
    }
  }

  // ---- the fold ---------------------------------------------------------
  for (let j = p; j <= N + 2; j += p) rough[j] = 0;

  // ---- fold damage at FIXED window: fused gaps with left endpoint < Yold
  let fixedBest = 0, fixedAt = -1;
  for (const r of list) {
    let q = r - 1; while (q >= 0 && !(rough[q] && rough[q + 2])) q--;
    if (q < 0) continue;                       // no left neighbour: no gap
    let s = r + 1; while (s < N - 2 && !(rough[s] && rough[s + 2])) s++;
    const g = s - q;
    if (q < Yold && g > fixedBest) { fixedBest = g; fixedAt = q; }
  }
  const Mfixed = Math.max(M, fixedBest);
  const MfixedAt = fixedBest > M ? fixedAt : Mat;

  // ---- boundary: fresh ground [Yold, Ynew), plus the straddle at Ynew ---
  let prev = -1;
  for (let q = Yold - 1; q >= 0; q--) if (rough[q] && rough[q + 2]) { prev = q; break; }
  let extBest = 0, extAt = -1, extCount = 0;
  for (let r = Math.max(Yold, 1); r < N; r++) {
    if (rough[r] && rough[r + 2]) {
      if (prev >= 0) { const g = r - prev; if (g > extBest) { extBest = g; extAt = prev; } }
      if (r >= Ynew) break;
      extCount++; prev = r;
    }
  }
  slotCount = slotCount - killsOld + extCount;

  const Mprev = M, MprevAt = Mat;
  const Mnew = Math.max(Mfixed, extBest);
  let type = '';
  if (Mnew > Mprev) {
    if (extBest > Mfixed) { type = 'BOUNDARY'; Mat = extAt; }
    else { type = 'KILL'; Mat = MfixedAt; }
    const killsInside = type === 'KILL'
      ? list.filter((r) => r > Mat && r < Mat + Mnew).length : 0;
    events.push({ p, from: Mprev, to: Mnew, type, at: Mat, killsInside });
  }
  M = Mnew;

  const dFix = Mprev > 0 ? Math.log(Mfixed / Mprev) : 0;
  const dBnd = Mfixed > 0 ? Math.log(Mnew / Mfixed) : 0;
  const pPrev = rows.length ? rows[rows.length - 1].p : 5;
  const budget = rows.length ? 3 * Math.log(Math.log(p) / Math.log(pPrev)) : 0;
  const cK = (killsNew * Math.log(p) ** 2) / (p * p);
  rows.push({ p, Ynew, killsOld, killsNew, cK, Mfixed, M, dFix, dBnd, budget });

  console.log(
    `${p}\t${Ynew.toExponential(3)}\t${killsOld}\t\t${String(killsNew).padEnd(8)}  ` +
    `${cK.toFixed(3)}\t${Mfixed}\t${M}\t${(M / Math.log(p) ** 3).toFixed(3)}\t` +
    `${dFix.toFixed(6)}\t${dBnd.toFixed(6)}\t${budget.toFixed(6)}`
  );

  // ---- controls ---------------------------------------------------------
  if (p in KILL_CUSTODY) {
    const ok = killsNew === KILL_CUSTODY[p];
    console.log(`   C3 kills custody at p=${p}: measured ${killsNew}, FOLD-PROFILE says ${KILL_CUSTODY[p]}  ${ok ? 'OK' : '*** FAIL ***'}`);
    if (!ok) controlsFailed++;
  }
  if (CKPT.has(p)) {
    const f = fullScan(Ynew);
    const ok = f.M === M && f.count === slotCount;
    console.log(`   C1 full-scan control at p=${p}: M=${f.M} (incr ${M}), slots=${f.count} (incr ${slotCount}), record at ${f.at}  ${ok ? 'OK' : '*** FAIL ***'}`);
    if (!ok) controlsFailed++;
    log(`checkpoint ${p} done`);
  }
  Yold = Ynew;
}

// ---------------------------------------------------------------------------
// analysis
// ---------------------------------------------------------------------------
const meas = rows.filter((r) => r.p >= 53);
const x0 = 53, x1 = meas[meas.length - 1].p;
const M0 = rows.find((r) => r.p === x0).M, M1 = meas[meas.length - 1].M;
const sumFix = meas.reduce((a, r) => a + r.dFix, 0);
const sumBnd = meas.reduce((a, r) => a + r.dBnd, 0);
const sumBudget = 3 * Math.log(Math.log(x1) / Math.log(x0));
const tileSpend = 2 * Math.log(theta[x1] / theta[x0]);
const zeroFolds = meas.filter((r) => r.dFix === 0 && r.dBnd === 0).length;

console.log('');
console.log('='.repeat(110));
console.log('SUMMARY — the ladder from x0 = 53 to the top, against the pre-registered budgets');
console.log('-'.repeat(110));
console.log(`   folds measured:                    ${meas.length}   (folds moving M at all: ${meas.length - zeroFolds})`);
console.log(`   M(${x0}) = ${M0}   M(${x1}) = ${M1}   M/ln^3 x at top = ${(M1 / Math.log(x1) ** 3).toFixed(3)}   M/x^2 at top = ${(M1 / (x1 * x1)).toFixed(5)}`);
console.log(`   cumulative ln growth:              ${Math.log(M1 / M0).toFixed(3)} nats`);
console.log(`     of which fixed-window (fold):    ${sumFix.toFixed(3)} nats`);
console.log(`     of which boundary (fresh ground):${sumBnd.toFixed(3)} nats`);
console.log(`   P2b window budget 3 ln(lnx1/lnx0): ${sumBudget.toFixed(3)} nats`);
console.log(`   P2a tile-shaped spend 2 ln(th/th): ${tileSpend.toFixed(3)} nats  -> would give M ~ ${(M0 * (theta[x1] / theta[x0]) ** 2).toExponential(2)}`);
console.log('');
console.log('   record events (every increase of M):');
console.log('   p\ttype\t\tfrom -> to\tleft endpoint\tkills inside record gap');
for (const e of events) {
  console.log(`   ${e.p}\t${e.type.padEnd(8)}\t${e.from} -> ${e.to}\t${e.at}\t\t${e.type === 'KILL' ? e.killsInside : '-'}`);
}
const evMeas = events.filter((e) => e.p >= x0);
const nB = evMeas.filter((e) => e.type === 'BOUNDARY').length;
const nK = evMeas.filter((e) => e.type === 'KILL').length;
const natsB = evMeas.filter((e) => e.type === 'BOUNDARY').reduce((a, e) => a + Math.log(e.to / e.from), 0);
const natsK = evMeas.filter((e) => e.type === 'KILL').reduce((a, e) => a + Math.log(e.to / e.from), 0);
console.log('');
console.log(`   events from x0=${x0}: BOUNDARY ${nB} (${natsB.toFixed(3)} nats), KILL ${nK} (${natsK.toFixed(3)} nats)`);
const cKs = meas.map((r) => r.cK);
console.log(`   c_K = kills*ln^2 p/p^2 over the ladder: min ${Math.min(...cKs).toFixed(3)}, max ${Math.max(...cKs).toFixed(3)}, ` +
  `mean ${(cKs.reduce((a, b) => a + b, 0) / cKs.length).toFixed(3)}; first third mean ${(cKs.slice(0, cKs.length / 3 | 0).reduce((a, b) => a + b, 0) / (cKs.length / 3 | 0)).toFixed(3)}, ` +
  `last third mean ${(cKs.slice(-(cKs.length / 3 | 0)).reduce((a, b) => a + b, 0) / (cKs.length / 3 | 0)).toFixed(3)}`);
console.log('');
console.log(`   controls failed: ${controlsFailed}${controlsFailed ? '  *** DO NOT TRUST THIS RUN ***' : '  (all controls passed)'}`);
console.log('   done in ' + el());

// ============================================================================
// READINGS — appended after the runs of 2026-08-17.  Predictions above frozen.
// Runs: control XMAX=307 (0.3 s, every number already known independently),
// deep XMAX=1289 (16.0 s), deepest XMAX=1613 (Y = 4.20e9, 240 measured folds,
// 36.2 s, 4.2 GB flat array).  ALL CONTROLS PASSED on every run: C1 full-scan
// agreement at x = 61, 307, 1009, 1289, 1613; C2 M(307) = 870 and
// M(491) = 990 reproduce localized-01; C3 kills 33, 41, 63 at p = 19, 23, 29
// reproduce FOLD-PROFILE §12b exactly.
//
// P1  REFUTED AS STATED.  M/ln^3 x leaves the registered band [3.6, 4.8]: it
//     climbs to 6.41 at x = 739 and 6.34 at x = 1151, then falls back to 5.51
//     at 1613 with no further event.  M(1613) = 2220 (band said 1000-2100 at
//     1289; measured 2220 there too — just above).  The excursion is
//     event-lumpy, not a trend: one patch born at r = 397,901,849 carries the
//     whole overshoot, and 76 consecutive folds after x = 1151 add nothing.
//     The finer form the repo actually states (maxgap-law: M = c*mbar*ln(Y/mbar),
//     c a surface) SURVIVES: c reads 0.81, 0.86, 1.12, 1.09, 0.98 at
//     x = 61, 307, 1009, 1289, 1613 — inside maxgap-law's measured
//     off-diagonal range 0.74-1.17.  My crude constant was the wrong frame;
//     mbar = 2.39 ln^2 x holds to the top.
//
// P2a REFUTED, as registered and by two orders of magnitude: tile-shaped
//     spending would give M(1613) ~ 3.7e5; measured 2220.  The
//     single-alignment ladder is NOT the max-over-alignments ladder:
//     fixed-window multiplier EXACTLY 1 at 225 of the 240 folds from x0 = 53
//     (238 of 253 over the whole ladder); total
//     fixed-window spend 1.086 nats against the tile shape's 7.12 over the
//     same folds.  M/x^2 falls monotonically 0.107 -> 0.00085.
// P2b CONFIRMED in total, lumpy in detail: spend ln(M(1613)/M(53)) = 2.001
//     nats against the window budget 3 ln(ln 1613/ln 53) = 1.862 — 107% of
//     budget (116% at the x = 1151 peak, then 76 zero folds).  Same reading
//     as the tile ladder (gate-multiplies §7): the object rides its budget
//     with no slack in either direction, and the localized budget is a
//     factor (2/3) ln p per fold TIGHTER than the tile's.
//
// P3  CONFIRMED, and it is the cleanest law in the file: c_K = kills *
//     ln^2 p / p^2 sits in [0.778, 0.852] over all 240 folds, mean 0.807,
//     first/last third means 0.812/0.803.  Dead flat.  The kill census in
//     [0, p^3) is deterministic, density-exact at ~0.81 p^2/ln^2 p, with the
//     elementary countable cap 2*rough(p^2) ~ 1.1 p^2/ln p one log above.
//
// P4  REFUTED AS REGISTERED (threshold >= 2/3 boundary): kills are a
//     co-equal engine, not a minority one.  From x0 = 53: 12 KILL events
//     (0.993 nats, 42%) vs 9 BOUNDARY events (1.394 nats, 58%); per-fold
//     split of the same total: fixed-window 45%, boundary 55%.  What DOES
//     hold is the structural half of the prediction: the multiplier is 1 at
//     94% of folds, and every record patch of the deep ladder is BORN as a
//     boundary event and then finished by kills — p = 739 births the patch
//     at 397,901,849 in the strip added by that very fold (1266 -> 1848),
//     then single kills at p = 997 and p = 1151 fatten it to 2052 and 2220.
//     Same assembly mechanism U-FRAME §7 saw at the top of the tile ladder.
//
// P5  CONFIRMED: every KILL event from p = 19 on has EXACTLY 1 kill inside
//     the record gap (2 at p = 7 and 17; never 3+).  Record damage, when it
//     happens, is a two-gap fusion — maxsum_2 shape — without the Merge
//     Lemma's gate ever being satisfied (M >> p/4 throughout this range).
//
// VERDICT — by the pre-registered rules, no rule fires cleanly (rule 1: the
// ladder is NOT tile-shaped; rule 2: boundary carries 55-58%, a majority but
// not the registered domination; rule 3: fixed-window is not dominant).  The
// honest verdict is in localized-single-alignment.md: the route to a growth
// law through this recursion CLOSES — the object's growth is initiated, at
// every deep record, by the window's own expansion into fresh ground, which
// is not a fold statement but the original localized gap problem at the new
// scale — while the single-alignment multiplier itself is confirmed
// different in shape from the tile's and leaves two countable laws standing
// (the c_K census; single-kill record hits).
//
// Cost observed: XMAX=1613: 36.2 s, ~4.2 GB.  XMAX=1289: 16.0 s, ~2.1 GB.
// XMAX=307 control: 0.3 s.  Node v22, single thread, flat Uint8Array.
// The flat-array engine caps at Y < 2^32; beyond that a segmented walk is
// needed (maxgap-law.md's engine), putting the k = 3 Merge-Lemma gate regime
// x* ~ 2.4e4 (Y ~ 1.4e13) at rough single-thread days, no longer "out of
// reach by four decades" (LOCALIZED-GAP §3) — expensive, not impossible.
// ============================================================================

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/localized-single-alignment.js
//   invocation:  node research/localized-single-alignment.js
//   code-sha256: fada50fb24f9cca3fd2deede178666f1eeb11d513aa83a449e26bda59431db71
//   out-sha256:  4cbd63443b0fa2542e4edd38f1d121f1a2b09e798aa31e6d670d8d0616b7bfaf
//   body-lines:  266
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     20.3 s
// ============================================================================
// ==============================================================================================================
// LOCALIZED SINGLE-ALIGNMENT RECURSION — per-fold ladder of M(x, x^3), kills, and the fixed-window/boundary split
// ==============================================================================================================
// p	Y=p^3		killsOld	killsNew  c_K	Mfixed	M	M/ln^3p	dln_fix		dln_bnd		budget3lnln
// 5	1.250e+2	0		8         0.829	0	12	2.878	0.000000	0.000000	0.000000
// 7	3.430e+2	4		11        0.850	30	30	4.071	0.916291	0.000000	0.569534
// 11	1.331e+3	4		17        0.808	36	42	3.046	0.182322	0.154151	0.626585
// 13	2.197e+3	13		20        0.779	66	66	3.911	0.451985	0.000000	0.202042
// 17	4.913e+3	15		30        0.833	108	108	4.749	0.492476	0.000000	0.298418
// 19	6.859e+3	22		33        0.793	150	150	5.876	0.328504	0.000000	0.115520
//    C3 kills custody at p=19: measured 33, FOLD-PROFILE says 33  OK
// 23	1.217e+4	20		41        0.762	150	150	4.866	0.000000	0.000000	0.188606
//    C3 kills custody at p=23: measured 41, FOLD-PROFILE says 41  OK
// 29	2.439e+4	33		63        0.849	150	150	3.929	0.000000	0.000000	0.213970
//    C3 kills custody at p=29: measured 63, FOLD-PROFILE says 63  OK
// 31	2.979e+4	52		66        0.810	150	150	3.704	0.000000	0.000000	0.058836
// 37	5.065e+4	47		81        0.771	156	204	4.333	0.039221	0.268264	0.150720
// 41	6.892e+4	67		94        0.771	204	204	3.983	0.000000	0.000000	0.084097
// 43	7.951e+4	94		110       0.842	204	204	3.834	0.000000	0.000000	0.038232
// 47	1.038e+5	94		114       0.765	204	204	3.574	0.000000	0.000000	0.070120
// 53	1.489e+5	109		150       0.842	204	300	4.794	0.000000	0.385662	0.092184
// 59	2.054e+5	126		170       0.812	300	300	4.425	0.000000	0.000000	0.079961
// 61	2.270e+5	161		178       0.808	300	300	4.318	0.000000	0.000000	0.024427
//    C1 full-scan control at p=61: M=300 (incr 300), slots=5249 (incr 5249), record at 145007  OK
// 67	3.008e+5	162		214       0.843	300	318	4.278	0.000000	0.058269	0.067697
// 71	3.579e+5	197		225       0.811	318	318	4.106	0.000000	0.000000	0.041091
// 73	3.890e+5	227		244       0.843	318	318	4.026	0.000000	0.000000	0.019487
// 79	4.930e+5	207		259       0.792	318	318	3.812	0.000000	0.000000	0.054728
// 83	5.718e+5	260		295       0.836	318	318	3.686	0.000000	0.000000	0.033722
// 89	7.050e+5	265		318       0.809	378	378	4.180	0.172843	0.000000	0.047015
// 97	9.127e+5	293		367       0.816	378	378	3.948	0.000000	0.000000	0.056984
// 101	1.030e+6	360		408       0.852	402	402	4.090	0.061558	0.000000	0.026383
// 103	1.093e+6	374		391       0.792	402	402	4.038	0.000000	0.000000	0.012719
// 107	1.225e+6	377		419       0.799	402	402	3.940	0.000000	0.000000	0.024561
// 109	1.295e+6	419		438       0.811	408	432	4.184	0.014815	0.057158	0.011866
// 113	1.443e+6	426		470       0.823	432	432	4.089	0.000000	0.000000	0.022959
// 127	2.048e+6	418		578       0.841	432	432	3.800	0.000000	0.000000	0.073220
// 131	2.248e+6	519		562       0.778	432	432	3.728	0.000000	0.000000	0.019143
// 137	2.571e+6	558		628       0.810	432	432	3.627	0.000000	0.000000	0.027432
// 139	2.686e+6	611		632       0.796	456	456	3.795	0.054067	0.000000	0.008824
// 149	3.308e+6	601		716       0.808	462	462	3.687	0.013072	0.000000	0.041942
// 151	3.443e+6	707		737       0.814	498	498	3.943	0.075035	0.000000	0.007983
// 157	3.870e+6	702		778       0.807	552	552	4.270	0.102948	0.000000	0.023209
// 163	4.331e+6	750		836       0.816	552	552	4.177	0.000000	0.000000	0.022170
// 167	4.657e+6	818		878       0.825	552	552	4.118	0.000000	0.000000	0.014245
// 173	5.178e+6	814		892       0.791	552	552	4.034	0.000000	0.000000	0.020619
// 179	5.735e+6	888		975       0.819	630	630	4.513	0.132172	0.000000	0.019783
// 181	5.930e+6	929		960       0.792	630	630	4.484	0.000000	0.000000	0.006419
// 191	6.968e+6	910		1056      0.799	630	630	4.348	0.000000	0.000000	0.030874
// 193	7.189e+6	1060		1091      0.811	630	630	4.322	0.000000	0.000000	0.005944
// 197	7.645e+6	1062		1129      0.812	630	630	4.272	0.000000	0.000000	0.011671
// 199	7.881e+6	1112		1143      0.809	630	630	4.248	0.000000	0.000000	0.005730
// 211	9.394e+6	1082		1252      0.805	630	630	4.110	0.000000	0.000000	0.033003
// 223	1.109e+7	1235		1425      0.838	708	708	4.478	0.116724	0.000000	0.030847
// 227	1.170e+7	1368		1440      0.822	708	708	4.435	0.000000	0.000000	0.009848
// 229	1.201e+7	1404		1447      0.815	708	708	4.413	0.000000	0.000000	0.004847
// 233	1.265e+7	1428		1496      0.819	708	708	4.371	0.000000	0.000000	0.009545
// 239	1.365e+7	1423		1525      0.801	708	708	4.311	0.000000	0.000000	0.013960
// 241	1.400e+7	1541		1578      0.817	708	708	4.291	0.000000	0.000000	0.004562
// 251	1.581e+7	1528		1696      0.822	708	708	4.197	0.000000	0.000000	0.022155
// 257	1.697e+7	1632		1739      0.811	708	708	4.144	0.000000	0.000000	0.012799
// 263	1.819e+7	1680		1775      0.797	708	708	4.092	0.000000	0.000000	0.012451
// 269	1.947e+7	1768		1871      0.809	708	708	4.043	0.000000	0.000000	0.012120
// 271	1.990e+7	1867		1912      0.817	708	708	4.027	0.000000	0.000000	0.003969
// 277	2.125e+7	1863		1968      0.811	726	852	4.790	0.025106	0.160037	0.011704
// 281	2.219e+7	1916		1996      0.804	852	852	4.753	0.000000	0.000000	0.007638
// 283	2.267e+7	2000		2033      0.809	852	852	4.735	0.000000	0.000000	0.003771
// 293	2.515e+7	1965		2161      0.812	852	852	4.649	0.000000	0.000000	0.018397
// 307	2.893e+7	2064		2349      0.817	870	870	4.632	0.020907	0.000000	0.024551
//    C1 full-scan control at p=307: M=870 (incr 870), slots=364749 (incr 364749), record at 187907  OK
// 311	3.008e+7	2302		2389      0.814	924	924	4.886	0.060219	0.000000	0.006774
// 313	3.066e+7	2342		2383      0.803	924	924	4.870	0.000000	0.000000	0.003349
// 317	3.186e+7	2367		2431      0.802	924	924	4.838	0.000000	0.000000	0.006622
// 331	3.626e+7	2371		2663      0.818	924	924	4.731	0.000000	0.000000	0.022429
// 337	3.827e+7	2610		2740      0.817	924	924	4.687	0.000000	0.000000	0.009274
// 347	4.178e+7	2619		2844      0.808	924	924	4.617	0.000000	0.000000	0.015035
// 349	4.251e+7	2859		2914      0.820	924	924	4.603	0.000000	0.000000	0.002946
// 353	4.399e+7	2840		2944      0.813	924	924	4.577	0.000000	0.000000	0.005833
// 359	4.627e+7	2850		2973      0.798	924	924	4.537	0.000000	0.000000	0.008607
// 367	4.943e+7	2982		3166      0.820	924	924	4.487	0.000000	0.000000	0.011217
// 373	5.190e+7	3058		3203      0.807	924	924	4.450	0.000000	0.000000	0.008227
// 379	5.444e+7	3171		3297      0.809	924	924	4.414	0.000000	0.000000	0.008074
// 383	5.618e+7	3302		3396      0.819	924	924	4.391	0.000000	0.000000	0.005300
// 389	5.886e+7	3325		3475      0.817	924	924	4.357	0.000000	0.000000	0.007830
// 397	6.257e+7	3391		3582      0.814	924	924	4.312	0.000000	0.000000	0.010223
// 401	6.448e+7	3527		3624      0.810	924	924	4.291	0.000000	0.000000	0.005022
// 409	6.842e+7	3574		3762      0.813	924	924	4.249	0.000000	0.000000	0.009871
// 419	7.356e+7	3643		3879      0.805	924	924	4.198	0.000000	0.000000	0.012026
// 421	7.462e+7	3839		3891      0.802	924	924	4.188	0.000000	0.000000	0.002365
// 431	8.006e+7	3840		4091      0.810	924	924	4.139	0.000000	0.000000	0.011632
// 433	8.118e+7	4007		4075      0.801	924	924	4.130	0.000000	0.000000	0.002289
// 439	8.460e+7	4103		4265      0.819	924	924	4.102	0.000000	0.000000	0.006793
// 443	8.694e+7	4115		4223      0.799	924	924	4.084	0.000000	0.000000	0.004469
// 449	9.052e+7	4233		4381      0.810	924	924	4.057	0.000000	0.000000	0.006616
// 457	9.544e+7	4294		4499      0.808	924	924	4.022	0.000000	0.000000	0.008663
// 461	9.797e+7	4446		4558      0.807	924	948	4.109	0.000000	0.025642	0.004266
// 463	9.925e+7	4558		4607      0.810	948	948	4.100	0.000000	0.000000	0.002117
// 467	1.018e+8	4568		4678      0.810	948	948	4.083	0.000000	0.000000	0.004202
// 479	1.099e+8	4579		4905      0.814	948	948	4.033	0.000000	0.000000	0.012358
// 487	1.155e+8	4769		4979      0.804	948	948	4.000	0.000000	0.000000	0.008041
// 491	1.184e+8	4948		5046      0.804	948	990	4.161	0.000000	0.043350	0.003963
// 499	1.243e+8	5049		5292      0.820	990	990	4.129	0.000000	0.000000	0.007815
// 503	1.273e+8	5197		5310      0.812	990	990	4.113	0.000000	0.000000	0.003853
// 509	1.319e+8	5267		5454      0.818	1044	1218	5.031	0.053110	0.154151	0.005713
// 521	1.414e+8	5197		5538      0.798	1218	1218	4.975	0.000000	0.000000	0.011196
// 523	1.431e+8	5666		5722      0.820	1218	1218	4.966	0.000000	0.000000	0.001837
// 541	1.583e+8	5432		5966      0.807	1218	1218	4.886	0.000000	0.000000	0.016174
// 547	1.637e+8	5920		6095      0.810	1218	1218	4.861	0.000000	0.000000	0.005253
// 557	1.728e+8	6003		6320      0.814	1218	1218	4.819	0.000000	0.000000	0.008608
// 563	1.785e+8	6248		6417      0.812	1218	1218	4.795	0.000000	0.000000	0.005080
// 569	1.842e+8	6285		6484      0.806	1218	1218	4.771	0.000000	0.000000	0.005017
// 571	1.862e+8	6438		6506      0.804	1218	1218	4.763	0.000000	0.000000	0.001659
// 577	1.921e+8	6429		6607      0.802	1218	1218	4.739	0.000000	0.000000	0.004936
// 587	2.023e+8	6585		6894      0.813	1218	1218	4.701	0.000000	0.000000	0.008097
// 593	2.085e+8	6750		6921      0.802	1218	1218	4.679	0.000000	0.000000	0.004782
// 599	2.149e+8	6995		7182      0.819	1218	1218	4.657	0.000000	0.000000	0.004726
// 601	2.171e+8	7073		7145      0.810	1218	1218	4.649	0.000000	0.000000	0.001563
// 607	2.236e+8	7038		7244      0.807	1218	1218	4.628	0.000000	0.000000	0.004654
// 613	2.303e+8	7156		7363      0.807	1218	1218	4.607	0.000000	0.000000	0.004601
// 617	2.349e+8	7288		7413      0.804	1218	1218	4.593	0.000000	0.000000	0.003039
// 619	2.372e+8	7418		7477      0.806	1218	1218	4.586	0.000000	0.000000	0.001511
// 631	2.512e+8	7335		7732      0.807	1218	1218	4.545	0.000000	0.000000	0.008948
// 641	2.634e+8	7657		7985      0.812	1218	1218	4.512	0.000000	0.000000	0.007307
// 643	2.658e+8	7947		8011      0.810	1218	1218	4.505	0.000000	0.000000	0.001446
// 647	2.708e+8	7979		8118      0.812	1218	1218	4.492	0.000000	0.000000	0.002876
// 653	2.784e+8	8023		8220      0.810	1218	1218	4.473	0.000000	0.000000	0.004276
// 659	2.862e+8	8095		8307      0.806	1218	1218	4.454	0.000000	0.000000	0.004230
// 661	2.888e+8	8372		8433      0.814	1218	1218	4.448	0.000000	0.000000	0.001400
// 673	3.048e+8	8230		8650      0.810	1218	1218	4.411	0.000000	0.000000	0.008300
// 677	3.103e+8	8506		8640      0.801	1218	1218	4.399	0.000000	0.000000	0.002729
// 683	3.186e+8	8546		8765      0.800	1218	1218	4.381	0.000000	0.000000	0.004059
// 691	3.299e+8	8732		9010      0.807	1218	1218	4.358	0.000000	0.000000	0.005348
// 701	3.445e+8	8856		9231      0.807	1218	1218	4.329	0.000000	0.000000	0.006585
// 709	3.564e+8	9078		9376      0.804	1218	1218	4.307	0.000000	0.000000	0.005191
// 719	3.717e+8	9238		9601      0.804	1218	1266	4.448	0.000000	0.038652	0.006395
// 727	3.842e+8	9491		9789      0.804	1266	1266	4.426	0.000000	0.000000	0.005042
// 733	3.938e+8	9800		10035     0.813	1266	1266	4.409	0.000000	0.000000	0.003740
// 739	4.036e+8	9893		10106     0.807	1266	1848	6.412	0.000000	0.378242	0.003705
// 743	4.102e+8	10122		10268     0.813	1848	1848	6.397	0.000000	0.000000	0.002451
// 751	4.236e+8	10084		10390     0.808	1848	1848	6.366	0.000000	0.000000	0.004856
// 757	4.338e+8	10220		10448     0.801	1848	1848	6.343	0.000000	0.000000	0.003603
// 761	4.407e+8	10440		10585     0.805	1848	1848	6.328	0.000000	0.000000	0.002384
// 769	4.548e+8	10526		10846     0.810	1848	1848	6.298	0.000000	0.000000	0.004725
// 773	4.619e+8	10709		10859     0.804	1848	1848	6.283	0.000000	0.000000	0.002341
// 787	4.874e+8	10684		11270     0.809	1848	1848	6.233	0.000000	0.000000	0.008086
// 797	5.063e+8	11125		11503     0.808	1848	1848	6.197	0.000000	0.000000	0.005675
// 809	5.295e+8	11252		11709     0.802	1848	1848	6.156	0.000000	0.000000	0.006703
// 811	5.334e+8	11725		11796     0.805	1848	1848	6.149	0.000000	0.000000	0.001106
// 821	5.534e+8	11669		12070     0.806	1848	1848	6.116	0.000000	0.000000	0.005484
// 823	5.574e+8	12028		12123     0.807	1848	1848	6.109	0.000000	0.000000	0.001088
// 827	5.656e+8	11964		12116     0.799	1848	1848	6.096	0.000000	0.000000	0.002166
// 829	5.697e+8	12182		12260     0.806	1848	1848	6.089	0.000000	0.000000	0.001078
// 839	5.906e+8	12180		12577     0.810	1848	1848	6.057	0.000000	0.000000	0.005348
// 853	6.207e+8	12277		12840     0.804	1848	1848	6.012	0.000000	0.000000	0.007365
// 857	6.294e+8	12794		12952     0.804	1848	1848	6.000	0.000000	0.000000	0.002079
// 859	6.338e+8	12868		12950     0.801	1848	1848	5.993	0.000000	0.000000	0.001035
// 863	6.427e+8	13074		13231     0.812	1848	1848	5.981	0.000000	0.000000	0.002062
// 877	6.745e+8	12906		13502     0.806	1848	1848	5.939	0.000000	0.000000	0.007133
// 881	6.838e+8	13384		13559     0.803	1848	1848	5.927	0.000000	0.000000	0.002014
// 883	6.885e+8	13528		13618     0.804	1848	1848	5.921	0.000000	0.000000	0.001003
// 887	6.979e+8	13598		13764     0.806	1848	1848	5.909	0.000000	0.000000	0.001998
// 907	7.461e+8	13400		14257     0.804	1848	1848	5.851	0.000000	0.000000	0.009839
// 911	7.561e+8	14103		14286     0.799	1848	1848	5.840	0.000000	0.000000	0.001938
// 919	7.762e+8	14281		14643     0.807	1848	1848	5.817	0.000000	0.000000	0.003847
// 929	8.018e+8	14536		14981     0.811	1848	1848	5.790	0.000000	0.000000	0.004755
// 937	8.227e+8	14779		15119     0.806	1848	1848	5.768	0.000000	0.000000	0.003762
// 941	8.332e+8	15041		15223     0.806	1848	1848	5.757	0.000000	0.000000	0.001867
// 947	8.493e+8	15171		15436     0.808	1848	1848	5.741	0.000000	0.000000	0.002784
// 953	8.655e+8	15267		15536     0.805	1848	1848	5.725	0.000000	0.000000	0.002763
// 967	9.042e+8	15332		15980     0.808	1848	1848	5.689	0.000000	0.000000	0.006371
// 971	9.155e+8	15922		16108     0.808	1848	1848	5.679	0.000000	0.000000	0.001801
// 977	9.326e+8	15879		16136     0.801	1848	1848	5.664	0.000000	0.000000	0.002686
// 983	9.499e+8	16110		16369     0.804	1848	1848	5.648	0.000000	0.000000	0.002667
// 991	9.732e+8	16264		16654     0.807	1848	1848	5.629	0.000000	0.000000	0.003527
// 997	9.910e+8	16422		16687     0.800	2052	2052	6.234	0.104711	0.000000	0.002624
// 1009	1.027e+9	16548		17136     0.805	2052	2052	6.201	0.000000	0.000000	0.005194
//    C1 full-scan control at p=1009: M=2052 (incr 2052), slots=8995983 (incr 8995983), record at 397901849  OK
// 1013	1.040e+9	17169		17358     0.810	2052	2052	6.191	0.000000	0.000000	0.001716
// 1019	1.058e+9	17110		17387     0.803	2052	2052	6.175	0.000000	0.000000	0.002559
// 1021	1.064e+9	17454		17559     0.809	2052	2052	6.170	0.000000	0.000000	0.000849
// 1031	1.096e+9	17278		17747     0.804	2052	2052	6.144	0.000000	0.000000	0.004217
// 1033	1.102e+9	17773		17872     0.807	2052	2052	6.138	0.000000	0.000000	0.000838
// 1039	1.122e+9	17680		17958     0.803	2052	2052	6.123	0.000000	0.000000	0.002502
// 1049	1.154e+9	17865		18327     0.806	2052	2052	6.098	0.000000	0.000000	0.004134
// 1051	1.161e+9	18186		18283     0.801	2052	2052	6.093	0.000000	0.000000	0.000821
// 1061	1.194e+9	18181		18673     0.805	2052	2052	6.068	0.000000	0.000000	0.004080
// 1063	1.201e+9	18719		18808     0.808	2052	2052	6.063	0.000000	0.000000	0.000811
// 1069	1.222e+9	18541		18834     0.802	2052	2052	6.048	0.000000	0.000000	0.002422
// 1087	1.284e+9	18672		19539     0.808	2052	2052	6.005	0.000000	0.000000	0.007174
// 1091	1.299e+9	19348		19545     0.803	2052	2052	5.996	0.000000	0.000000	0.001576
// 1093	1.306e+9	19605		19698     0.807	2052	2052	5.991	0.000000	0.000000	0.000785
// 1097	1.320e+9	19563		19747     0.804	2052	2052	5.982	0.000000	0.000000	0.001566
// 1103	1.342e+9	19527		19819     0.800	2052	2052	5.968	0.000000	0.000000	0.002337
// 1109	1.364e+9	19711		19999     0.799	2052	2052	5.954	0.000000	0.000000	0.002322
// 1117	1.394e+9	19909		20324     0.802	2052	2052	5.936	0.000000	0.000000	0.003074
// 1123	1.416e+9	20219		20532     0.803	2052	2052	5.922	0.000000	0.000000	0.002289
// 1129	1.439e+9	20425		20727     0.803	2052	2052	5.909	0.000000	0.000000	0.002275
// 1151	1.525e+9	20380		21484     0.806	2220	2220	6.340	0.078692	0.000000	0.008225
// 1153	1.533e+9	21315		21429     0.801	2220	2220	6.335	0.000000	0.000000	0.000739
// 1163	1.573e+9	21302		21860     0.805	2220	2220	6.312	0.000000	0.000000	0.003672
// 1171	1.606e+9	21651		22031     0.802	2220	2220	6.294	0.000000	0.000000	0.002912
// 1181	1.647e+9	21965		22480     0.807	2220	2220	6.271	0.000000	0.000000	0.003608
// 1187	1.672e+9	22392		22691     0.807	2220	2220	6.258	0.000000	0.000000	0.002148
// 1193	1.698e+9	22496		22804     0.804	2220	2220	6.244	0.000000	0.000000	0.002136
// 1201	1.732e+9	22708		23103     0.805	2220	2220	6.227	0.000000	0.000000	0.002829
// 1213	1.785e+9	22778		23396     0.802	2220	2220	6.200	0.000000	0.000000	0.004203
// 1217	1.802e+9	23559		23753     0.809	2220	2220	6.192	0.000000	0.000000	0.001391
// 1223	1.829e+9	23360		23687     0.800	2220	2220	6.179	0.000000	0.000000	0.002076
// 1229	1.856e+9	23705		24035     0.805	2220	2220	6.166	0.000000	0.000000	0.002065
// 1231	1.865e+9	23725		23845     0.797	2220	2220	6.162	0.000000	0.000000	0.000686
// 1237	1.893e+9	24109		24419     0.809	2220	2220	6.149	0.000000	0.000000	0.002049
// 1249	1.948e+9	23934		24579     0.801	2220	2220	6.124	0.000000	0.000000	0.004065
// 1259	1.996e+9	24461		24977     0.803	2220	2220	6.104	0.000000	0.000000	0.003353
// 1277	2.082e+9	24716		25726     0.807	2220	2220	6.068	0.000000	0.000000	0.005960
// 1279	2.092e+9	25554		25666     0.803	2220	2220	6.064	0.000000	0.000000	0.000656
// 1283	2.112e+9	25567		25786     0.802	2220	2220	6.056	0.000000	0.000000	0.001309
// 1289	2.142e+9	25758		26102     0.806	2220	2220	6.044	0.000000	0.000000	0.001955
//    C1 full-scan control at p=1289: M=2220 (incr 2220), slots=17486634 (incr 17486634), record at 397901681  OK
//
// ==============================================================================================================
// SUMMARY — the ladder from x0 = 53 to the top, against the pre-registered budgets
// --------------------------------------------------------------------------------------------------------------
//    folds measured:                    194   (folds moving M at all: 21)
//    M(53) = 300   M(1289) = 2220   M/ln^3 x at top = 6.044   M/x^2 at top = 0.00134
//    cumulative ln growth:              2.001 nats
//      of which fixed-window (fold):    1.086 nats
//      of which boundary (fresh ground):1.301 nats
//    P2b window budget 3 ln(lnx1/lnx0): 1.770 nats
//    P2a tile-shaped spend 2 ln(th/th): 6.643 nats  -> would give M ~ 2.30e+5
//
//    record events (every increase of M):
//    p	type		from -> to	left endpoint	kills inside record gap
//    5	BOUNDARY	0 -> 12	17		-
//    7	KILL    	12 -> 30	71		2
//    11	BOUNDARY	30 -> 42	899		-
//    13	KILL    	42 -> 66	731		1
//    17	KILL    	66 -> 108	701		2
//    19	KILL    	108 -> 150	659		1
//    37	BOUNDARY	150 -> 204	36137		-
//    53	BOUNDARY	204 -> 300	145007		-
//    67	BOUNDARY	300 -> 318	256901		-
//    89	KILL    	318 -> 378	540959		1
//    101	KILL    	378 -> 402	26267		1
//    109	BOUNDARY	402 -> 432	1245017		-
//    139	KILL    	432 -> 456	480461		1
//    149	KILL    	456 -> 462	2187377		1
//    151	KILL    	462 -> 498	24419		1
//    157	KILL    	498 -> 552	3364679		1
//    179	KILL    	552 -> 630	62297		1
//    223	KILL    	630 -> 708	439469		1
//    277	BOUNDARY	708 -> 852	20506697		-
//    307	KILL    	852 -> 870	187907		1
//    311	KILL    	870 -> 924	187907		1
//    461	BOUNDARY	924 -> 948	97890761		-
//    491	BOUNDARY	948 -> 990	117197237		-
//    509	BOUNDARY	990 -> 1218	127891991		-
//    719	BOUNDARY	1218 -> 1266	365647991		-
//    739	BOUNDARY	1266 -> 1848	397901849		-
//    997	KILL    	1848 -> 2052	397901849		1
//    1151	KILL    	2052 -> 2220	397901681		1
//
//    events from x0=53: BOUNDARY 9 (1.394 nats), KILL 12 (0.993 nats)
//    c_K = kills*ln^2 p/p^2 over the ladder: min 0.778, max 0.852, mean 0.809; first third mean 0.813, last third mean 0.805
//
//    controls failed: 0  (all controls passed)
//    done in 20.1s
// ============================================================================
// READINGS
// ============================================================================
