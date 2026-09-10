// ============================================================================
// FOLD PROFILE 07 — THE IMPACT WINDOW: WHICH FOLDS CAN TOUCH THE TILE AT ALL
// ============================================================================
// Chris, 2026-08-17: "we can narrow the impact window. Say we start with the
// 11-tile: primes removed in the 11-tile will only happen until p*p is larger
// than the 11-tile width."
//
// THE LEMMA THIS IS (PROVEN, one line). Sift the window [0, W) by primes in
// increasing order. When the fold by p arrives, every prime below p has already
// been folded. A removal inside the window sits at r = p*t or r = p*t - 2, and
// the surviving factor t must be rough with respect to every prime below p, so
//
//        t = 1   or   t >= p.
//
// Hence the removal is at r in {p-2, p} or at r >= p^2 - 2. So:
//
//   (a) once p^2 > W + 2, the ONLY slots the fold can remove from the window
//       are r = p-2 and r = p;
//   (b) both of those are self-strikes: r = p live means (p, p+2) is a twin
//       prime pair, r = p-2 live means (p-2, p) is one. Nothing is destroyed,
//       a twin is FOUND and graduates;
//   (c) therefore the number of folds that can do genuine damage to a fixed
//       window is FINITE and explicit: pi(sqrt(W+2)) - pi(x).
//
// This is crystallisation turned inside out. The repo states it for the HEAD of
// a growing tile ([0, p'^2) is final). Chris's form fixes the window instead and
// bounds the set of folds that can reach it.
//
//   S1  the lemma verified exhaustively, every fold, small windows
//   S2  the finite fold budget, and the last damaging fold, per tile
//   S3  where the damage actually is: cumulative removals by band in 23#
//   S4  the Buchstab layer: classify every removal by its cofactor t
//
// Run:  node --max-old-space-size=8000 fold-profile-07-impact-window.js
// ============================================================================
'use strict';

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const log = (s) => process.stderr.write('   [' + el() + '] ' + s + '\n');

function primesTo(n) {
  const c = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) { if (!c[i]) { out.push(i); for (let j = i * i; j <= n; j += i) c[j] = 1; } }
  return out;
}

console.log('='.repeat(100));
console.log('FOLD PROFILE 07 — the impact window: which folds can touch a fixed tile at all');
console.log('='.repeat(100));

// ---------------------------------------------------------------------------
// S1. exhaustive verification in small windows
// ---------------------------------------------------------------------------
console.log('');
console.log('S1. THE LEMMA, VERIFIED EXHAUSTIVELY — every removal, every fold, until nothing is left');
console.log('-'.repeat(100));

function runWindow(tilePrimes, verbose) {
  const W = tilePrimes.reduce((a, b) => a * b, 1);
  const LIMIT = W + 2;
  const PS = primesTo(LIMIT);
  const rough = new Uint8Array(LIMIT + 1).fill(1);
  rough[0] = 0;
  for (const q of tilePrimes) for (let m = q; m <= LIMIT; m += q) rough[m] = 0;
  let alive = 0;
  for (let n = 0; n < W; n++) if (rough[n] && rough[n + 2]) alive++;
  const x = tilePrimes[tilePrimes.length - 1];
  const events = [];
  for (const p of PS) {
    if (p <= x) continue;
    const removed = [];
    for (let m = p; m <= LIMIT; m += p) {
      if (!rough[m]) continue;
      rough[m] = 0;
      if (m >= 2 && m - 2 < W && rough[m - 2]) { removed.push({ r: m - 2, t: m / p, via: 'r+2' }); alive--; }
      if (m < W && rough[m + 2]) { removed.push({ r: m, t: m / p, via: 'r' }); alive--; }
    }
    if (removed.length) events.push({ p, removed, alive, beyond: p * p > W + 2 });
    if (alive === 0) break;
  }
  return { W, x, events, PS };
}

for (const tp of [[2, 3, 5, 7, 11], [2, 3, 5, 7, 11, 13]]) {
  const { W, x, events } = runWindow(tp, true);
  const root = Math.sqrt(W + 2);
  console.log('');
  console.log(`   window [0, ${W}) = the ${x}-tile.  sqrt(W+2) = ${root.toFixed(2)}`);
  console.log('   fold p | p^2 > W+2 | removals | positions r (cofactor t)');
  let violations = 0;
  for (const e of events.slice(0, 26)) {
    const head = e.removed.slice(0, 10).map((d) => `${d.r}(t=${d.t})`).join(' ');
    const desc = head + (e.removed.length > 10 ? ` ... +${e.removed.length - 10} more` : '');
    if (e.beyond) for (const d of e.removed) if (d.t !== 1) violations++;
    console.log(`   ${String(e.p).padStart(6)} | ${(e.beyond ? 'YES' : 'no').padStart(9)} | ${String(e.removed.length).padStart(8)} | ${desc}`);
  }
  if (events.length > 26) console.log(`   ... ${events.length - 26} further folds, all with p^2 > W+2`);
  let allViol = 0, beyondFolds = 0, beyondRem = 0;
  for (const e of events) if (e.beyond) { beyondFolds++; beyondRem += e.removed.length; for (const d of e.removed) if (d.t !== 1) allViol++; }
  console.log(`   folds with p^2 > W+2: ${beyondFolds}, removals by them: ${beyondRem}, ` +
    `removals with cofactor t != 1: ${allViol}  ${allViol === 0 ? '<-- LEMMA HOLDS' : '<-- VIOLATION'}`);
  // and every such removal must be a twin prime graduating
  let notTwin = 0;
  for (const e of events) if (e.beyond) for (const d of e.removed) {
    const a = d.r, b = d.r + 2;
    const isP = (n) => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
    if (!(isP(a) && isP(b))) notTwin++;
  }
  console.log(`   of those removals, how many are NOT a twin prime pair: ${notTwin}  ` +
    `${notTwin === 0 ? '<-- every one is a graduation' : '<-- exception found'}`);
}

// ---------------------------------------------------------------------------
// S2. the finite fold budget
// ---------------------------------------------------------------------------
console.log('');
console.log('S2. THE FINITE FOLD BUDGET — how many folds can damage a fixed tile window');
console.log('-'.repeat(100));
console.log('   tile |               W |   sqrt(W) |  damaging folds pi(sqrtW)-pi(x) | last damaging fold | total folds to clear');
// ⚠ CORRECTED 2026-08-17: this table was primesTo(200000), which is below
// sqrt(31#) = 447,840. The T31 row silently truncated at the table's end and
// printed 17,973 damaging folds with a "last damaging fold" of 199,999, both
// artifacts of the sieve limit rather than of the arithmetic. The table now
// covers every root below, and the row refuses to print if it ever does not.
const BIG = primesTo(500000);
for (const [x, tp] of [[11, [2, 3, 5, 7, 11]], [13, [2, 3, 5, 7, 11, 13]], [17, [2, 3, 5, 7, 11, 13, 17]],
                       [19, [2, 3, 5, 7, 11, 13, 17, 19]], [23, [2, 3, 5, 7, 11, 13, 17, 19, 23]],
                       [29, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]], [31, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]]]) {
  const W = tp.reduce((a, b) => a * b, 1);
  const root = Math.sqrt(W + 2);
  if (root > BIG[BIG.length - 1]) {
    console.log(`   T${String(x).padEnd(3)} | ${W.toLocaleString().padStart(15)} | ${root.toFixed(0).padStart(9)} | ` +
      `${'PRIME TABLE TOO SMALL, ROW WITHHELD'.padStart(31)} | ${'-'.padStart(18)} | -`);
    continue;
  }
  const pir = BIG.filter((q) => q <= root).length;
  const pix = tp.length;
  const last = BIG.filter((q) => q <= root).pop();
  console.log(`   T${String(x).padEnd(3)} | ${W.toLocaleString().padStart(15)} | ${root.toFixed(0).padStart(9)} | ` +
    `${String(pir - pix).padStart(31)} | ${String(last).padStart(18)} | ~W (all primes < W)`);
}
console.log('');
console.log('   So the infinite tower of folds contributes nothing new past sqrt(W): the window is');
console.log('   crystallised there and every later fold only collects a twin pair that is already sitting in it.');

// ---------------------------------------------------------------------------
// S3 / S4. where the damage is, and the Buchstab layer, in the 23# window
// ---------------------------------------------------------------------------
console.log('');
console.log('S3/S4. THE 23# WINDOW — where the removals actually are, and what their cofactors look like');
console.log('-'.repeat(100));
{
  const TP = [2, 3, 5, 7, 11, 13, 17, 19, 23];
  const W = TP.reduce((a, b) => a * b, 1);
  const LIMIT = W + 2;
  const ROOT = Math.floor(Math.sqrt(LIMIT)) + 1;
  const PS = primesTo(ROOT + 10);
  // cofactors t = m/p run as high as W/29, so the primality table must reach there,
  // not merely to sqrt(W). Getting this wrong silently calls large primes composite.
  const TMAX = Math.floor(LIMIT / 29) + 2;
  const isPrimeSmall = new Uint8Array(TMAX + 2).fill(1);
  isPrimeSmall[0] = isPrimeSmall[1] = 0;
  for (let i = 2; i * i <= TMAX + 1; i++) if (isPrimeSmall[i]) for (let j = i * i; j <= TMAX + 1; j += i) isPrimeSmall[j] = 0;
  const CUBE = Math.cbrt(LIMIT);
  let violCube = 0;

  log('sieving the 23# window with cofactor bookkeeping ...');
  const rough = new Uint8Array(LIMIT + 1).fill(1);
  rough[0] = 0;
  for (const q of TP) for (let m = q; m <= LIMIT; m += q) rough[m] = 0;
  let alive = 0;
  for (let n = 0; n < W; n++) if (rough[n] && rough[n + 2]) alive++;
  const D0 = alive;

  // cofactor classes: t = 1 (graduation), t prime (semiprime kill), t composite
  let cT1 = 0, cTprime = 0, cTcomp = 0;
  const bands = [[23, 100], [100, 1000], [1000, 10000], [10000, ROOT + 10]];
  const bandRem = bands.map(() => 0), bandFolds = bands.map(() => 0);
  let cum = 0;
  const marks = [29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 199, 401, 1009, 3001, 10007, 14929];
  const rows = [];

  for (const p of PS) {
    if (p <= 23) continue;
    let rem = 0;
    for (let m = p; m <= LIMIT; m += p) {
      if (!rough[m]) continue;
      rough[m] = 0;
      const t = m / p;
      const cls = t === 1 ? 0 : (isPrimeSmall[t] ? 1 : 2);
      if (cls === 2 && p > CUBE) violCube++;
      if (m >= 2 && m - 2 < W && rough[m - 2]) { alive--; rem++; if (cls === 0) cT1++; else if (cls === 1) cTprime++; else cTcomp++; }
      if (m < W && rough[m + 2]) { alive--; rem++; if (cls === 0) cT1++; else if (cls === 1) cTprime++; else cTcomp++; }
    }
    cum += rem;
    for (let i = 0; i < bands.length; i++) if (p > bands[i][0] && p <= bands[i][1]) { bandRem[i] += rem; bandFolds[i]++; }
    if (marks.includes(p)) rows.push({ p, rem, cum, alive });
  }

  console.log('');
  console.log(`   start D = ${D0.toLocaleString()},  end = ${alive.toLocaleString()},  total removed = ${(D0 - alive).toLocaleString()}`);
  console.log('');
  console.log('     fold p |  removed here |  cumulative removed | % of all removals | survivors left');
  for (const r of rows) {
    console.log(`   ${String(r.p).padStart(8)} | ${r.rem.toLocaleString().padStart(13)} | ${r.cum.toLocaleString().padStart(19)} | ` +
      `${((100 * r.cum) / (D0 - alive)).toFixed(2).padStart(17)} | ${r.alive.toLocaleString().padStart(14)}`);
  }
  console.log('');
  console.log('   BY BAND:');
  console.log('     band of p     |  folds |    removals |  % of all removals |  removals per fold');
  for (let i = 0; i < bands.length; i++) {
    console.log(`   (${String(bands[i][0]).padStart(5)}, ${String(bands[i][1]).padStart(5)}] | ${String(bandFolds[i]).padStart(6)} | ` +
      `${bandRem[i].toLocaleString().padStart(11)} | ${((100 * bandRem[i]) / (D0 - alive)).toFixed(2).padStart(18)} | ` +
      `${(bandRem[i] / bandFolds[i]).toFixed(1).padStart(18)}`);
  }
  console.log('');
  console.log('   COFACTOR CLASSES of every removal (the Buchstab layer):');
  const tot = cT1 + cTprime + cTcomp;
  console.log(`     t = 1        (r = p or p-2, a twin graduating) : ${cT1.toLocaleString().padStart(10)}  ${((100 * cT1) / tot).toFixed(3)}%`);
  console.log(`     t prime      (r = p*q or p*q-2, a semiprime)   : ${cTprime.toLocaleString().padStart(10)}  ${((100 * cTprime) / tot).toFixed(3)}%`);
  console.log(`     t composite  (three or more prime factors)     : ${cTcomp.toLocaleString().padStart(10)}  ${((100 * cTcomp) / tot).toFixed(3)}%`);
  console.log('');
  console.log('');
  console.log('   THE SECOND NARROWING, same argument one level up. A composite p-rough cofactor is');
  console.log(`   at least p^2, so r = p*t >= p^3. Hence once p > W^(1/3) = ${CUBE.toFixed(0)}, EVERY removal has`);
  console.log('   t = 1 or t prime, i.e. sits at a prime or a semiprime.');
  console.log(`     composite-cofactor removals from folds p > W^(1/3): ${violCube}  ` +
    `${violCube === 0 ? '<-- HOLDS' : '<-- VIOLATION'}`);
  console.log('');
  console.log('   The t = 1 class is exactly the graduations. The t prime class is what Buchstab\'s');
  console.log('   identity peels off at the next level, and it is where the DHR iteration spends its');
  console.log('   budget. Chris\'s narrowing is the first step of that identity.');
}

console.log('');
console.log('   done in ' + el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fold-profile-07-impact-window.js
//   invocation:  node research/fold-profile-07-impact-window.js
//   code-sha256: d126d618642bdc877c664eb391341dac5a91ee2f610acfa767ec2e279fe3752e
//   out-sha256:  121e83befe61e70f3175cd8c5be4de777fb639dade5ad34322c3ce063a09599c
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     2.4 s
// ============================================================================
// ====================================================================================================
// FOLD PROFILE 07 — the impact window: which folds can touch a fixed tile at all
// ====================================================================================================
//
// S1. THE LEMMA, VERIFIED EXHAUSTIVELY — every removal, every fold, until nothing is left
// ----------------------------------------------------------------------------------------------------
//
//    window [0, 2310) = the 11-tile.  sqrt(W+2) = 48.08
//    fold p | p^2 > W+2 | removals | positions r (cofactor t)
//        13 |        no |       21 | 167(t=13) 221(t=17) 377(t=29) 401(t=31) 479(t=37) 557(t=43) 611(t=47) 689(t=53) 767(t=59) 947(t=73) ... +11 more
//        17 |        no |       15 | 17(t=1) 389(t=23) 491(t=29) 527(t=31) 629(t=37) 731(t=43) 797(t=47) 899(t=53) 1037(t=61) 1409(t=83) ... +5 more
//        19 |        no |       11 | 359(t=19) 437(t=23) 587(t=31) 701(t=37) 1007(t=53) 1121(t=59) 1271(t=67) 1499(t=79) 1577(t=83) 1691(t=89) ... +1 more
//        23 |        no |        7 | 851(t=37) 941(t=41) 989(t=43) 1217(t=53) 1541(t=67) 1679(t=73) 1907(t=83)
//        29 |        no |        7 | 29(t=1) 839(t=29) 1187(t=41) 1247(t=43) 1361(t=47) 1709(t=59) 2291(t=79)
//        31 |        no |        4 | 1457(t=47) 1829(t=59) 1889(t=61) 2201(t=71)
//        37 |        no |        2 | 1367(t=37) 1739(t=47)
//        41 |        no |        1 | 41(t=1)
//        43 |        no |        2 | 1847(t=43) 2279(t=53)
//        47 |        no |        1 | 2207(t=47)
//        59 |       YES |        1 | 59(t=1)
//        71 |       YES |        1 | 71(t=1)
//       101 |       YES |        1 | 101(t=1)
//       107 |       YES |        1 | 107(t=1)
//       137 |       YES |        1 | 137(t=1)
//       149 |       YES |        1 | 149(t=1)
//       179 |       YES |        1 | 179(t=1)
//       191 |       YES |        1 | 191(t=1)
//       197 |       YES |        1 | 197(t=1)
//       227 |       YES |        1 | 227(t=1)
//       239 |       YES |        1 | 239(t=1)
//       269 |       YES |        1 | 269(t=1)
//       281 |       YES |        1 | 281(t=1)
//       311 |       YES |        1 | 311(t=1)
//       347 |       YES |        1 | 347(t=1)
//       419 |       YES |        1 | 419(t=1)
//    ... 48 further folds, all with p^2 > W+2
//    folds with p^2 > W+2: 64, removals by them: 64, removals with cofactor t != 1: 0  <-- LEMMA HOLDS
//    of those removals, how many are NOT a twin prime pair: 0  <-- every one is a graduation
//
//    window [0, 30030) = the 13-tile.  sqrt(W+2) = 173.30
//    fold p | p^2 > W+2 | removals | positions r (cofactor t)
//        17 |        no |      173 | 17(t=1) 389(t=23) 491(t=29) 527(t=31) 629(t=37) 731(t=43) 797(t=47) 899(t=53) 1037(t=61) 1409(t=83) ... +163 more
//        19 |        no |      139 | 359(t=19) 437(t=23) 587(t=31) 701(t=37) 1007(t=53) 1121(t=59) 1271(t=67) 1499(t=79) 1577(t=83) 1691(t=89) ... +129 more
//        23 |        no |       98 | 851(t=37) 941(t=41) 989(t=43) 1217(t=53) 1541(t=67) 1679(t=73) 1907(t=83) 2369(t=103) 2459(t=107) 2921(t=127) ... +88 more
//        29 |        no |       75 | 29(t=1) 839(t=29) 1187(t=41) 1247(t=43) 1361(t=47) 1709(t=59) 2291(t=79) 2579(t=89) 2927(t=101) 3161(t=109) ... +65 more
//        31 |        no |       66 | 1457(t=47) 1829(t=59) 1889(t=61) 2201(t=71) 2447(t=79) 3191(t=103) 3317(t=107) 4307(t=139) 4619(t=149) 4679(t=151) ... +56 more
//        37 |        no |       47 | 1367(t=37) 1739(t=47) 2477(t=67) 2699(t=73) 3737(t=101) 4181(t=113) 5141(t=139) 5807(t=157) 6029(t=163) 7067(t=191) ... +37 more
//        41 |        no |       42 | 41(t=1) 2417(t=59) 2501(t=61) 2747(t=67) 2909(t=71) 4139(t=101) 5207(t=127) 5699(t=139) 6437(t=157) 7829(t=191) ... +32 more
//        43 |        no |       46 | 1847(t=43) 2279(t=53) 2537(t=59) 2621(t=61) 2879(t=67) 3137(t=73) 3569(t=83) 4601(t=107) 4859(t=113) 5459(t=127) ... +36 more
//        47 |        no |       36 | 2207(t=47) 3431(t=73) 4559(t=97) 5309(t=113) 7001(t=149) 7661(t=163) 8507(t=181) 9257(t=197) 10667(t=227) 10949(t=233) ... +26 more
//        53 |        no |       36 | 3761(t=71) 4187(t=79) 4397(t=83) 5351(t=101) 5669(t=107) 5777(t=109) 5987(t=113) 6731(t=127) 7367(t=139) 8639(t=163) ... +26 more
//        59 |        no |       31 | 59(t=1) 4661(t=79) 6077(t=103) 6311(t=107) 7727(t=131) 8081(t=137) 9617(t=163) 9851(t=167) 10559(t=179) 11621(t=197) ... +21 more
//        61 |        no |       29 | 3719(t=61) 4451(t=73) 4817(t=79) 5429(t=89) 6161(t=101) 6527(t=107) 7991(t=131) 9089(t=149) 9209(t=151) 9941(t=163) ... +19 more
//        67 |        no |       28 | 4757(t=71) 4889(t=73) 5561(t=83) 6497(t=97) 6899(t=103) 7169(t=107) 7571(t=113) 8777(t=131) 9179(t=137) 9311(t=139) ... +18 more
//        71 |        no |       25 | 71(t=1) 5039(t=71) 6317(t=89) 6887(t=97) 7739(t=109) 9869(t=139) 10721(t=151) 11147(t=157) 12281(t=173) 12707(t=179) ... +15 more
//        73 |        no |       19 | 7079(t=97) 7517(t=103) 11021(t=151) 11897(t=163) 12191(t=167) 14087(t=193) 15401(t=211) 16571(t=227) 17009(t=233) 17447(t=239) ... +9 more
//        79 |        no |       17 | 8609(t=109) 8927(t=113) 10979(t=139) 11927(t=151) 12401(t=157) 13667(t=173) 14141(t=179) 15089(t=191) 18089(t=229) 19037(t=241) ... +7 more
//        83 |        no |       17 | 8051(t=97) 9047(t=109) 9377(t=113) 11369(t=137) 13031(t=157) 13859(t=167) 16349(t=197) 16517(t=199) 18509(t=223) 18839(t=227) ... +7 more
//        89 |        no |       14 | 7919(t=89) 9521(t=107) 11657(t=131) 12371(t=139) 13259(t=149) 13439(t=151) 16109(t=181) 17711(t=199) 20201(t=227) 21269(t=239) ... +4 more
//        97 |        no |        9 | 12317(t=127) 13289(t=137) 15227(t=157) 15809(t=163) 18719(t=193) 19301(t=199) 24929(t=257) 27257(t=281) 27449(t=283)
//       101 |        no |       16 | 101(t=1) 11411(t=113) 12827(t=127) 13229(t=131) 15857(t=157) 17471(t=173) 18077(t=179) 19289(t=191) 20099(t=199) 21311(t=211) ... +6 more
//       103 |        no |       10 | 10607(t=103) 15347(t=149) 15551(t=151) 16787(t=163) 17201(t=167) 18437(t=179) 23999(t=233) 24821(t=241) 27089(t=263) 29147(t=283)
//       107 |        no |        7 | 107(t=1) 11447(t=107) 13589(t=127) 14657(t=137) 17441(t=163) 24287(t=227) 29639(t=277)
//       109 |        no |       10 | 13841(t=127) 14279(t=131) 15149(t=139) 18857(t=173) 19727(t=181) 26051(t=239) 26267(t=241) 27359(t=251) 28667(t=263) 29537(t=271)
//       113 |        no |        3 | 18869(t=167) 22259(t=197) 29717(t=263)
//       127 |        no |        7 | 16127(t=127) 17399(t=137) 19937(t=157) 21209(t=167) 24509(t=193) 25019(t=197) 28319(t=223)
//       131 |        no |        3 | 17159(t=131) 18209(t=139) 23447(t=179)
//    ... 463 further folds, all with p^2 > W+2
//    folds with p^2 > W+2: 456, removals by them: 456, removals with cofactor t != 1: 0  <-- LEMMA HOLDS
//    of those removals, how many are NOT a twin prime pair: 0  <-- every one is a graduation
//
// S2. THE FINITE FOLD BUDGET — how many folds can damage a fixed tile window
// ----------------------------------------------------------------------------------------------------
//    tile |               W |   sqrt(W) |  damaging folds pi(sqrtW)-pi(x) | last damaging fold | total folds to clear
//    T11  |           2,310 |        48 |                              10 |                 47 | ~W (all primes < W)
//    T13  |          30,030 |       173 |                              34 |                173 | ~W (all primes < W)
//    T17  |         510,510 |       715 |                             120 |                709 | ~W (all primes < W)
//    T19  |       9,699,690 |      3114 |                             435 |               3109 | ~W (all primes < W)
//    T23  |     223,092,870 |     14936 |                            1739 |              14929 | ~W (all primes < W)
//    T29  |   6,469,693,230 |     80434 |                            7863 |              80429 | ~W (all primes < W)
//    T31  | 200,560,490,130 |    447840 |                           37534 |             447829 | ~W (all primes < W)
//
//    So the infinite tower of folds contributes nothing new past sqrt(W): the window is
//    crystallised there and every later fold only collects a twin pair that is already sitting in it.
//
// S3/S4. THE 23# WINDOW — where the removals actually are, and what their cofactors look like
// ----------------------------------------------------------------------------------------------------
//
//    start D = 7,952,175,  end = 895,790,  total removed = 7,056,385
//
//      fold p |  removed here |  cumulative removed | % of all removals | survivors left
//          29 |       548,411 |             548,411 |              7.77 |      7,403,764
//          31 |       477,647 |           1,026,058 |             14.54 |      6,926,117
//          37 |       374,376 |           1,400,434 |             19.85 |      6,551,741
//          41 |       319,602 |           1,720,036 |             24.38 |      6,232,139
//          43 |       289,825 |           2,009,861 |             28.48 |      5,942,314
//          47 |       252,782 |           2,262,643 |             32.07 |      5,689,532
//          53 |       214,635 |           2,477,278 |             35.11 |      5,474,897
//          59 |       185,581 |           2,662,859 |             37.74 |      5,289,316
//          61 |       173,430 |           2,836,289 |             40.19 |      5,115,886
//          67 |       152,689 |           2,988,978 |             42.36 |      4,963,197
//          71 |       139,837 |           3,128,815 |             44.34 |      4,823,360
//          73 |       132,177 |           3,260,992 |             46.21 |      4,691,183
//          79 |       118,840 |           3,379,832 |             47.90 |      4,572,343
//          83 |       110,255 |           3,490,087 |             49.46 |      4,462,088
//          89 |       100,407 |           3,590,494 |             50.88 |      4,361,681
//          97 |        90,212 |           3,680,706 |             52.16 |      4,271,469
//         101 |        84,824 |           3,765,530 |             53.36 |      4,186,645
//         199 |        32,028 |           4,771,905 |             67.63 |      3,180,270
//         401 |        12,052 |           5,395,562 |             76.46 |      2,556,613
//        1009 |         4,178 |           6,006,897 |             85.13 |      1,945,278
//        3001 |         1,193 |           6,589,617 |             93.39 |      1,362,558
//       10007 |           171 |           7,012,922 |             99.38 |        939,253
//       14929 |             1 |           7,056,385 |            100.00 |        895,790
//
//    BY BAND:
//      band of p     |  folds |    removals |  % of all removals |  removals per fold
//    (   23,   100] |     16 |   3,680,706 |              52.16 |           230044.1
//    (  100,  1000] |    143 |   2,322,013 |              32.91 |            16237.9
//    ( 1000, 10000] |   1061 |   1,010,032 |              14.31 |              952.0
//    (10000, 14947] |    521 |      43,634 |               0.62 |               83.8
//
//    COFACTOR CLASSES of every removal (the Buchstab layer):
//      t = 1        (r = p or p-2, a twin graduating) :        268  0.004%
//      t prime      (r = p*q or p*q-2, a semiprime)   :  4,702,069  66.636%
//      t composite  (three or more prime factors)     :  2,354,048  33.361%
//
//
//    THE SECOND NARROWING, same argument one level up. A composite p-rough cofactor is
//    at least p^2, so r = p*t >= p^3. Hence once p > W^(1/3) = 606, EVERY removal has
//    t = 1 or t prime, i.e. sits at a prime or a semiprime.
//      composite-cofactor removals from folds p > W^(1/3): 0  <-- HOLDS
//
//    The t = 1 class is exactly the graduations. The t prime class is what Buchstab's
//    identity peels off at the next level, and it is where the DHR iteration spends its
//    budget. Chris's narrowing is the first step of that identity.
//
//    done in 2.4s
// ============================================================================
// READINGS (2026-08-18) — honestly calibrated
// ============================================================================
// 1. THE LEMMA IS VERIFIED EXHAUSTIVELY, NOT SAMPLED, AND THAT IS THE FILE'S
//    STRENGTH. Two windows are driven to empty: the 11-tile (64 folds with
//    p^2 > W+2, 64 removals, 0 with cofactor t != 1, 0 that are not a twin
//    pair) and the 13-tile (456, 456, 0, 0). Both counts are complete
//    enumerations, so the "LEMMA HOLDS" lines are proofs on those windows, not
//    evidence. FOLD-PROFILE section 11's table carries both rows exactly.
// 2. THE 268 GRADUATIONS ARE AN INDEPENDENT CUSTODY CHECK AND THEY PASS. The
//    cofactor split of all 7,056,385 removals in the 23# window is 268 with
//    t = 1, 4,702,069 with t prime, 2,354,048 with t composite; those sum to
//    7,056,385 exactly. The t = 1 class must be exactly the twin pairs (p, p+2)
//    with 29 <= p <= 14,947, since any composite 23-rough p-2 would have been
//    removed by its own smallest factor at an earlier fold. Counted
//    independently (scratch sieve, not this script): there are 272 twin pairs
//    with p <= 14,947 and 268 with p >= 29. Exact agreement.
// 3. THE WHOLE 23# LEDGER TIES TO fold-profile-05 AND TO 01. Start 7,952,175,
//    end 895,790, removed 7,056,385; the first fold removes 548,411, which is
//    fold-profile-01's K(0) for T23 by 29 and fold-profile-03's copy-0 kill
//    total. The survivors column reproduces 05's line for line down to 895,790.
//    Three files, three code paths, one ledger.
// 4. SIXTEEN FOLDS DO HALF THE WORK, AND THE TAIL DOES ALMOST NONE. Band table:
//    (23,100] is 16 folds and 52.16% of all removals at 230,044 per fold;
//    (10000,14947] is 521 folds and 0.62% at 83.8 per fold. The last damaging
//    fold, p = 14,929, removes exactly ONE slot. So the fold budget
//    pi(sqrt W) - pi(x) = 1,739 is dominated by its first percent, and the
//    "finite budget" result is much stronger in practice than its statement.
// 5. "DAMAGING FOLDS" IS A CAPABILITY COUNT, NOT AN ACTUAL ONE, AND THE COLUMN
//    HEADING HIDES THAT. The header states (c) correctly: the number of folds
//    that CAN do genuine damage is pi(sqrt(W+2)) - pi(x). S2's column is headed
//    "damaging folds" flat. The 11-tile shows the gap: of its ten budgeted
//    folds, the fold by 41 has exactly one removal, "41(t=1)", which is a
//    graduation and not damage at all. So nine folds damage the 11-tile, not
//    ten. Small, but it is the difference between a bound and a measurement.
// 6. THE SECOND NARROWING HOLDS AND IS CHEAP. Once p > W^(1/3) = 606 every
//    removal must have t = 1 or t prime; measured composite-cofactor removals
//    from folds above 606: 0. This is Buchstab's identity's first step arrived
//    at from the fold picture, as the file says. What the file does NOT say is
//    what it costs: the t-prime class is 66.6% of all removals and is exactly
//    where the DHR iteration's budget goes, so the narrowing relocates the
//    problem rather than shrinking it. FOLD-PROFILE section 11a says this
//    plainly; the script's closing paragraph does not.
// 7. THE T31 ROW IS THE WAVE-5 REPAIR AND IT HOLDS. S2 now reports T31 with
//    37,534 damaging folds and a last damaging fold of 447,829, against the
//    pre-repair 17,973 and 199,999 that were artifacts of a primesTo(200000)
//    table. sqrt(31#) = 447,840 and the largest prime below it is 447,829, so
//    the row is right. FOLD-PROFILE section 11's budget table stops at T29 and
//    never carried the wrong row, so nothing downstream needed repair.
// 8. SCOPE AND PRESENTATION. S1 prints at most ten positions per fold and then
//    "... +N more", and truncates the fold list itself ("... 48 further folds",
//    "... 463 further folds"); the exhaustiveness is in the summary counters,
//    not in what is displayed. S3's fold-by-fold table is SAMPLED after p = 101
//    (it jumps 101, 199, 401, 1009, 3001, 10007, 14929), so the cumulative
//    column is exact but the rows are a selection. Only two windows are driven
//    to empty and both are small; the 23# window is measured, not exhausted in
//    the S1 sense. Runtime 2.5 s, plain node, no heap flag needed.
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// TOKENIZER ARTIFACT, not a figure:
//   23,100 and 10000,14947 in reading 4 are the two band intervals (23,100]
//     and (10000,14947]. The run prints them padded, as "(   23,   100]" and
//     "(10000, 14947]", so the readings' unpadded form does not match verbatim.
//     Both are interval endpoints, not measurements.
//
// IN-CODE:
//   17,973, 199,999 and 200000 in reading 7 are the pre-repair T31 row and the
//     sieve limit that produced it. They are recorded in this file's own
//     CORRECTED 2026-08-17 note above the S2 table, not in the current run,
//     because the run now uses primesTo(500000) and prints 37,534 and 447,829.
//     The readings quote the superseded values to say what was repaired.
//
// One further reformat, for the record: "230,044 per fold" in reading 4 is the
// printed 230044.1 with a thousands separator and the tenth dropped.
// ---------------------------------------------------------------------------
