// ============================================================================
// Y2 LADDER RECOMPUTE: the sixteen levels, run on the CORRECTED instrument,
// sharded one process per level, assembled here.
// (2026-08-19. The leftover of TODO 1b §8, which priced this run and skipped
//  it. Feeds TODO 1d. Companion write-up:
//  research/history/staging/y2-recompute.md.)
// ============================================================================
//
// WHAT THIS FILE IS, AND WHAT IT IS NOT.
//
// It computes NOTHING. Every number below was produced by
// research/two-class-lower-bounds.js, unmodified, run sixteen times, one
// process per level. This file is the ASSEMBLER: it reads those sixteen logs,
// parses the two OLD ladders out of the files that own them rather than
// retyping either, prints old against new, and prints the item-1d direction
// question with its calibration band. Keeping the assembler separate from the
// instrument is the point: the instrument was not touched by this run, so a
// reader can diff it against 2026-08-18 and find nothing.
//
// THE SHARDING, and why it is legitimate.
//
// two-class-lower-bounds.js's 2026-08-18 repair removed the level chaining:
// each level's bracket seed is now the closed form start = x (ln x)^2 in x
// alone, and all randomness comes from the fixed SEED_BASE = 20260818. So the
// levels are independent, the ladder shards, and a shard's row is bit-identical
// to the row the same level would print inside a --full run. That is not an
// assumption here, it is CHECKED: §3 below scores all sixteen shard rows
// against the published 2026-08-18 ladder, which was produced in one process.
//
// THE BUDGET. Uniform policy, no per-level tuning, and it is the instrument's
// own stock schedule budget(np) with no override: no --force-budget, no edited
// constants, the same SEED_BASE at every level. That is the same policy the
// published ladder ran under, which is what makes the two columns comparable at
// all. The schedule is indexed by the prime count, so R falls from 512 to 2 up
// the ladder; "uniform" here means one rule applied to sixteen levels, never a
// knob turned at any level. Each row prints its own R, W and call count.
//
// THE SIXTEEN INVOCATIONS, verbatim, which is how the logs were made:
//
//   node research/two-class-lower-bounds.js --ladder-only --levels=<x>
//     for x in 37 73 113 167 229 313 421 571 773 1009 1301 1699 2003 2503
//                3001 4001
//
// each detached with nohup, all sixteen at once, stdout to
// <shards>/y2-level-<x>.log. --shards=<dir> points this script at them; the
// default is the scratchpad directory the 2026-08-19 run used.
//
// FRAGILITY, STATED. That scratchpad is outside the repo and is session-scoped.
// When it is gone this tail no longer reproduces from the logs. What makes the
// numbers recoverable anyway is that the instrument is deterministic: re-run
// the sixteen invocations above and the same rows come back. §0 prints the
// sha256 and byte count of every log it read, so a later reader can tell
// whether the logs in hand are the ones this tail was bound to.
//
// RUN
//   node research/y2-ladder-recompute.js --collect              the bound tail
//   node research/y2-ladder-recompute.js --collect --shards=DIR elsewhere
// ============================================================================

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPO = path.resolve(__dirname, '..');
const argv = process.argv.slice(2);
const COLLECT = argv.includes('--collect');
const DEFAULT_SHARDS = '/private/tmp/claude-501/-Users-benjaminsen-Files-Git-primeoire/'
                     + 'bf77f80e-cee6-4b3e-aec5-a90fe5b7ab3d/scratchpad/y2-shards';
const SHARDS = (argv.find(a => a.startsWith('--shards=')) || '').slice(9) || DEFAULT_SHARDS;

const LEVELS = [37, 73, 113, 167, 229, 313, 421, 571, 773, 1009, 1301, 1699, 2003, 2503, 3001, 4001];

// ---------------------------------------------------------------- utilities
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
const pad = (s, n) => String(s).padStart(n);
function primesTo(N) { const s = new Uint8Array(N + 1), P = []; for (let i = 2; i <= N; i++) { if (!s[i]) { P.push(i); for (let j = i * i; j <= N; j += i) s[j] = 1; } } return P; }
const ALLP = primesTo(4100);
const npOf = (x) => ALLP.filter(p => p <= x).length;

// ordinary-least-squares slope of y on x, with the residual standard error of
// the slope. Used only where the write-up says a slope is being read.
function fitSE(xs, ys) {
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxx = 0, sxy = 0;
  for (let i = 0; i < n; i++) { sxx += (xs[i] - mx) ** 2; sxy += (xs[i] - mx) * (ys[i] - my); }
  const b = sxy / sxx, a = my - b * mx;
  let ss = 0;
  for (let i = 0; i < n; i++) ss += (ys[i] - (a + b * xs[i])) ** 2;
  const se = n > 2 ? Math.sqrt(ss / (n - 2) / sxx) : NaN;
  return { a: Math.exp(a), b, se };
}

// ------------------------------------------- the two OLD ladders, PARSED
// Neither is retyped. OLD-A comes out of the instrument's own OLDY2 constant,
// which exists precisely so the superseded 2026-08-17 numbers stay reproducible
// from the file. OLD-B comes out of the §5d table of the markdown that
// publishes the 2026-08-18 corrected ladder. Both sources are hashed below.
const JS = path.join(REPO, 'research', 'two-class-lower-bounds.js');
const MD = path.join(REPO, 'research', 'two-class-lower-bounds.md');

function parseOldA(src) {
  const m = src.match(/const OLDY2\s*=\s*\{([\s\S]*?)\}\s*;/);
  if (!m) throw new Error('OLDY2 not found in two-class-lower-bounds.js');
  const out = {};
  for (const [, k, v] of m[1].matchAll(/(\d+)\s*:\s*(\d+)/g)) out[+k] = +v;
  return out;
}
function parseOldB(src) {
  // §5d rows look like: | 37 | 512 | 200 | 65 | **527** | 355 | 1.485 | ...
  const out = {};
  for (const ln of src.split('\n')) {
    const c = ln.split('|').map(s => s.trim());
    if (c.length < 13) continue;
    const x = Number(c[1].replace(/,/g, ''));
    if (!LEVELS.includes(x)) continue;
    const num = (s) => Number(s.replace(/\*/g, '').replace(/,/g, ''));
    const R = num(c[2]), W = num(c[3]), Y1 = num(c[4]), Y2 = num(c[5]);
    if ([R, W, Y1, Y2].some(v => !Number.isFinite(v))) continue;
    out[x] = { R, W, Y1, Y2 };
  }
  return out;
}
function parseExact(src) {
  const m = src.match(/const G2EXACT\s*=\s*\{([\s\S]*?)\}\s*;/);
  const out = {};
  if (m) for (const [, k, v] of m[1].replace(/\/\/[^\n]*/g, '').matchAll(/(\d+)\s*:\s*(\d+)/g)) out[+k] = +v;
  return out;
}

// --------------------------------------------------- the shard logs, PARSED
// A shard log is the instrument's own §2+3 block with exactly one data row.
// The row is taken by column position from that block's own header, never by
// eye: x R W calls Y1 Y2 oldY2 new/old Y2/Y1 (Y2/Y1)/lnx Y2/x^2 Y2/(x ln^2x)
// replay secs.
function parseShard(txt, x) {
  for (const ln of txt.split('\n')) {
    const f = ln.trim().split(/\s+/);
    if (f.length < 14) continue;
    if (Number(f[0]) !== x) continue;
    if (!/^\d+\*?$/.test(f[3])) continue;
    return {
      x, R: +f[1], W: +f[2], calls: +f[3].replace('*', ''), capped: f[3].endsWith('*'),
      Y1: +f[4], Y2: +f[5], oldA: +f[6], newOverOld: +f[7],
      ratio: +f[8], ratioLn: +f[9], y2x2: +f[10], y2xln2: +f[11],
      replay: f[12], secs: +f[13],
    };
  }
  return null;
}

if (!COLLECT) {
  console.log('nothing to do. This script only assembles: run it with --collect.');
  console.log('The sixteen shard invocations it assembles are listed in the header.');
  process.exit(0);
}

// ============================================================ 0. PROVENANCE
console.log('='.repeat(78));
console.log('0. PROVENANCE. What produced every number below.');
console.log('='.repeat(78));
const jsSrc = fs.readFileSync(JS, 'utf8'), mdSrc = fs.readFileSync(MD, 'utf8');
console.log('\n  instrument   research/two-class-lower-bounds.js   NOT MODIFIED by this run');
console.log('               sha256 ' + sha(jsSrc));
console.log('  published    research/two-class-lower-bounds.md    the OLD-B column');
console.log('               sha256 ' + sha(mdSrc));
console.log('  shard dir    ' + SHARDS);
console.log('  budget       the instrument\'s stock schedule budget(np), no --force-budget,');
console.log('               SEED_BASE = 20260818, one rule for all sixteen levels.');

const OLDA = parseOldA(jsSrc), OLDB = parseOldB(mdSrc), EXACT = parseExact(jsSrc);
console.log('\n  parsed  OLD-A (2026-08-17 bisecting search, OLDY2 in the .js): ' + Object.keys(OLDA).length + ' levels');
console.log('  parsed  OLD-B (2026-08-18 repaired ladder, §5d of the .md):    ' + Object.keys(OLDB).length + ' levels');

console.log('\n  the sixteen shard logs, each a separate detached process:');
console.log('     x   np      bytes   sha256(first 16)   secs');
const NEW = {};
let missing = 0, wall = 0;
for (const x of LEVELS) {
  const f = path.join(SHARDS, 'y2-level-' + x + '.log');
  if (!fs.existsSync(f)) { console.log(`   ${pad(x, 5)}   MISSING  ${f}`); missing++; continue; }
  const t = fs.readFileSync(f, 'utf8');
  const r = parseShard(t, x);
  if (!r) { console.log(`   ${pad(x, 5)}   NO ROW   ${f}`); missing++; continue; }
  NEW[x] = r; wall = Math.max(wall, r.secs);
  console.log(`   ${pad(x, 5)} ${pad(npOf(x), 4)} ${pad(t.length, 10)}   ${sha(t).slice(0, 16)}   ${pad(r.secs.toFixed(1), 8)}`);
}
if (missing) { console.log(`\n  ${missing} shard(s) missing. Nothing below is complete.`); process.exit(1); }
const cpu = LEVELS.reduce((t, x) => t + NEW[x].secs, 0);
console.log(`\n  longest rung ${(wall / 60).toFixed(1)} min; summed process time ${(cpu / 60).toFixed(1)} min.`);
console.log('  TODO 1b §8 priced this at ~235 min summed, ~71 min for x = 4001 alone.');

// ================================================ 1. THE OLD LADDERS, QUOTED
console.log('\n' + '='.repeat(78));
console.log('1. THE OLD SIXTEEN, BOTH OF THEM, QUOTED BEFORE ANYTHING NEW IS READ');
console.log('='.repeat(78));
console.log('\n  OLD-A is the 2026-08-17 ladder: bisection on a NON-MONOTONE feasibility');
console.log('  predicate, deterministic tie-breaks, bracket chained from the level below.');
console.log('  Superseded at all sixteen levels by the 2026-08-18 repair.');
console.log('  OLD-B is that repair\'s published ladder, §5d of two-class-lower-bounds.md,');
console.log('  produced in ONE process. It is what this run has to reproduce.');
console.log('\n     x   np    OLD-A (08-17)    OLD-B (08-18)   B/A     OLD-B Y1');
for (const x of LEVELS) {
  const b = OLDB[x];
  console.log(`   ${pad(x, 5)} ${pad(npOf(x), 4)}   ${pad(OLDA[x], 13)}    ${pad(b.Y2, 13)}   ${pad((b.Y2 / OLDA[x]).toFixed(3), 5)}   ${pad(b.Y1, 10)}`);
}

// ============================================== 2. THE PRE-REGISTRATION
console.log('\n' + '='.repeat(78));
console.log('2. PRE-REGISTRATION, sealed before the sixteen processes were launched');
console.log('='.repeat(78));
console.log(`
  P1  AGAINST OLD-A. The corrected instrument must read >= OLD-A at every one
      of the sixteen levels where the comparison is fair. OLD-A bisected a
      predicate that is not monotone, so it can only have under-searched.
      A DECREASE IS NOT AUTOMATICALLY A FINDING at three levels and the reason
      is on record before this run: §5d already reports x = 1699, 2003, 4001
      landing BELOW OLD-A (117,596 vs 118,367; 143,942 vs 144,712; 354,729 vs
      356,711), because OLD-A chained its bracket from the level below and the
      repaired search refuses that free information in exchange for level
      independence. So: a decrease at 1699, 2003 or 4001 is EXPECTED and is not
      an instrument regression. A decrease at any OTHER level would be new, and
      would be a real finding.

  P2  AGAINST OLD-B. This is the sharp test, and it is not a >= test. The
      repair made every level independent of every other, so a sharded rerun
      must reproduce OLD-B EXACTLY, all sixteen, digit for digit, in Y1 and Y2
      alike. ANY difference is a finding: either the levels are not independent
      after all, or the published ladder does not come from the file that
      claims it. There is no noise channel here. The instrument is deterministic
      from SEED_BASE and the bracket seed is a closed form in x.

  P3  THE DIRECTION, for item 1d. Y2/x^2 is read as a monotone sequence and a
      slope with a band, never as a comparison of two means, and the greedy
      degradation measured in history/staging/greedy-oracle-validation.md is
      applied as a correction band before any direction is declared.
`);

// ============================================== 3. THE NEW LADDER
console.log('='.repeat(78));
console.log('3. THE NEW SIXTEEN, and the two scored comparisons');
console.log('='.repeat(78));
console.log('\n  Every row replay-verified by the instrument\'s own independent verifier.');
console.log('  Every Y2 is a CERTIFIED LOWER BOUND on G2(x#) - 1, never an estimate of it.');
console.log('\n     x   np    R    W      calls   Y1     NEW Y2    OLD-A    NEW-A   OLD-B   NEW-B  replay');
let dA = 0, dB = 0, capped = 0;
for (const x of LEVELS) {
  const r = NEW[x], b = OLDB[x];
  const da = r.Y2 - OLDA[x], db = r.Y2 - b.Y2;
  if (da < 0) dA++;
  if (db !== 0) dB++;
  if (r.capped) capped++;
  console.log([pad(x, 6), pad(npOf(x), 4), pad(r.R, 4), pad(r.W, 4), pad(r.calls + (r.capped ? '*' : ''), 10),
    pad(r.Y1, 6), pad(r.Y2, 9), pad(OLDA[x], 8), pad((da >= 0 ? '+' : '') + da, 7),
    pad(b.Y2, 7), pad((db >= 0 ? '+' : '') + db, 6), pad(r.replay, 6)].join(' '));
}
console.log('  (* = the instrument\'s call cap bound that level.)');
console.log(`\n  P1 scored: ${LEVELS.length - dA} of 16 at or above OLD-A; ${dA} below it.`);
console.log(`  P2 scored: ${LEVELS.length - dB} of 16 reproduce OLD-B exactly; ${dB} differ.`);
const y1same = LEVELS.filter(x => NEW[x].Y1 === OLDB[x].Y1).length;
console.log(`             the one-class control reproduces at ${y1same} of 16 as well.`);
console.log(`  call cap bound ${capped} of 16 rows.`);

// ============================================== 4. ITEM 1d: THE DIRECTION
console.log('\n' + '='.repeat(78));
console.log('4. ITEM 1d. DOES Y2/x^2 FALL OVER THE CORRECTED LADDER?');
console.log('='.repeat(78));
console.log(`
  THE TWO TRAPS, quoted from TODO.md item 1d and respected below:

    "never declare a trend from a comparison of means (0.278 -> 0.277 was
     called 'falling')"
    "never compare slot-unit ratios across natals, since L*mbar/G2 falls
     0.985 -> 0.531 across natals 5..23 at FIXED b = 37 and that fall is pure
     tile geometry"

  Trap 1 is met by never forming a mean: the reading below is a per-level
  sequence, a step-by-step sign count and a log-log slope with its standard
  error. Trap 2 is met by the units: Y2 is a count of consecutive integers on
  the integer line, the same unit at every level, divided by x^2. Nothing here
  is measured in slots of a tile, no quantity is held fixed at one natal while
  another varies, and each level IS its own natal. The tile-geometry channel
  that produced 0.985 -> 0.531 has no entry point into this table.

  THE CALIBRATION. Y2 is a lower bound produced by the greedy, and
  history/staging/greedy-oracle-validation.md measures what the greedy loses:
  exact at 14 of 14 own levels and at x = 53, then a log-log fidelity slope of
  -0.02353, se 0.00706, band [-0.03736, -0.00970], over x = 13..79. Corrected
  Y2 below divides by f(x) = (x/53)^slope for x > 53 and by 1 at x = 37, where
  Y2 = 527 = G2(37#) - 1 is the exact optimum and no correction is defensible.
`);
const SLOPES = { central: -0.02353, steepest: -0.03736, shallowest: -0.00970 };
const fid = (x, s) => (x <= 53 ? 1 : Math.pow(x / 53, s));
console.log('     x      Y2       Y2/x^2    f_central  corrected Y2/x^2 at slope    Y2/(x ln^2 x)');
console.log('                                          central  steepest shallowest');
for (const x of LEVELS) {
  const r = NEW[x];
  const c = (s) => (r.Y2 / fid(x, s) / (x * x));
  console.log([pad(x, 6), pad(r.Y2, 8), pad(r.y2x2.toFixed(5), 11), pad(fid(x, SLOPES.central).toFixed(4), 10),
    pad(c(SLOPES.central).toFixed(5), 9), pad(c(SLOPES.steepest).toFixed(5), 9), pad(c(SLOPES.shallowest).toFixed(5), 10),
    pad(r.y2xln2.toFixed(4), 15)].join(' '));
}

let falls = 0;
for (let i = 1; i < LEVELS.length; i++) if (NEW[LEVELS[i]].y2x2 < NEW[LEVELS[i - 1]].y2x2) falls++;
const lx = LEVELS.map(x => Math.log(x));
const raw = fitSE(lx, LEVELS.map(x => Math.log(NEW[x].y2x2)));
const cor = {};
for (const k of Object.keys(SLOPES)) cor[k] = fitSE(lx, LEVELS.map(x => Math.log(NEW[x].Y2 / fid(x, SLOPES[k]) / (x * x))));
const lxl = LEVELS.map(x => Math.log(Math.log(x)));
const pol = fitSE(lxl, LEVELS.map(x => Math.log(NEW[x].Y2 / NEW[x].x)));
const first = NEW[LEVELS[0]], last = NEW[LEVELS[LEVELS.length - 1]];

console.log(`
  THE CERTIFIED LADDER, which is not the same column. Both the 2026-08-17 and
  the 2026-08-18 certificates replay clean, so the certified lower bound at each
  level is the LARGER of the two, which is the convention G2-STATE.md §5a
  already uses. That column and its direction:
`);
{
  const cert = (x) => Math.max(OLDA[x], NEW[x].Y2);
  let cf = 0;
  for (let i = 1; i < LEVELS.length; i++) if (cert(LEVELS[i]) / LEVELS[i] ** 2 < cert(LEVELS[i - 1]) / LEVELS[i - 1] ** 2) cf++;
  const cfit = fitSE(lx, LEVELS.map(x => Math.log(cert(x) / (x * x))));
  console.log('     x    certified Y2   certified Y2/x^2   which run');
  for (const x of LEVELS)
    console.log(`   ${pad(x, 5)} ${pad(cert(x), 14)} ${pad((cert(x) / (x * x)).toFixed(5), 18)}   ${OLDA[x] > NEW[x].Y2 ? '2026-08-17' : '2026-08-18 (this run)'}`);
  console.log(`\n    certified Y2/x^2 fell at ${cf} of ${LEVELS.length - 1} steps; log-log slope ${cfit.b.toFixed(4)}, se ${cfit.se.toFixed(4)},`);
  console.log(`    ${(cert(37) / 37 / 37).toFixed(5)} down to ${(cert(4001) / 4001 / 4001).toFixed(5)}, a factor of ${((cert(37) / 37 / 37) / (cert(4001) / 4001 / 4001)).toFixed(1)}.`);
}
console.log(`
  step-by-step, no mean formed anywhere:
    Y2/x^2 fell at ${falls} of the ${LEVELS.length - 1} consecutive steps.
    Under a null of independent coin-flip steps that is p = ${Math.pow(0.5, LEVELS.length - 1).toExponential(2)}.
    top to bottom ${first.y2x2.toFixed(5)} -> ${last.y2x2.toFixed(5)}, a factor of ${(first.y2x2 / last.y2x2).toFixed(1)}.

  log-log slope of Y2/x^2 against x, 16 points, x in [${LEVELS[0]}, ${LEVELS[LEVELS.length - 1]}]:
    raw                 ${raw.b.toFixed(4)}  se ${raw.se.toFixed(4)}
    corrected, central  ${cor.central.b.toFixed(4)}  se ${cor.central.se.toFixed(4)}
    corrected, steepest ${cor.steepest.b.toFixed(4)}  se ${cor.steepest.se.toFixed(4)}
    corrected, shallow  ${cor.shallowest.b.toFixed(4)}  se ${cor.shallowest.se.toFixed(4)}
    the whole calibration band moves the slope by ${(cor.steepest.b - cor.shallowest.b).toFixed(4)}, against a fall of ${Math.abs(raw.b).toFixed(4)}.

  THE MATCHED CONTROL, which is the corpus's own way of taking the estimator's
  fidelity out of an exponent. Y1 is the IDENTICAL repaired search on the
  one-class problem at the identical budget, and its true exponent is 1, so
  whatever fidelity the search loses up the ladder it loses on both sides:
    one class  Y1 ~ x^${fitSE(lx, LEVELS.map(x => Math.log(NEW[x].Y1))).b.toFixed(4)}   [TRUTH: exponent 1]
    two class  Y2 ~ x^${fitSE(lx, LEVELS.map(x => Math.log(NEW[x].Y2))).b.toFixed(4)}
    excess apparent exponent ${(fitSE(lx, LEVELS.map(x => Math.log(NEW[x].Y2))).b - fitSE(lx, LEVELS.map(x => Math.log(NEW[x].Y1))).b).toFixed(4)}, so the control-corrected reading is ${(1 + fitSE(lx, LEVELS.map(x => Math.log(NEW[x].Y2))).b - fitSE(lx, LEVELS.map(x => Math.log(NEW[x].Y1))).b).toFixed(4)}.
    Y2/Y1 ~ (ln x)^${fitSE(lxl, LEVELS.map(x => Math.log(NEW[x].Y2 / NEW[x].Y1))).b.toFixed(3)}, se ${fitSE(lxl, LEVELS.map(x => Math.log(NEW[x].Y2 / NEW[x].Y1))).se.toFixed(3)}.
  Both readings sit far below 2, which is the exponent the Zone Postulate is
  about, and the control-corrected one is the number G2-STATE.md §6.1 tabulates.

  the same ladder in the OTHER normalisation, which is the shape statement:
    Y2/(x ln^2 x)  ${first.y2xln2.toFixed(4)} -> ${last.y2xln2.toFixed(4)}, a factor of ${(last.y2xln2 / first.y2xln2).toFixed(2)} the OTHER way.
    Y2/x ~ (ln x)^${pol.b.toFixed(3)}, se ${pol.se.toFixed(3)}.

  WHAT FLATNESS WOULD COST, which is the only honest way to put a lower bound
  to work against a hypothesis. If G2(x#)/x^2 were FLAT at its x = 37 value,
  where Y2 = ${first.Y2} = G2(37#) - 1 exactly, then
    G2(4001#) - 1  =  ${first.y2x2.toFixed(5)} * 4001^2  =  ${Math.round(first.y2x2 * 4001 * 4001).toLocaleString('en-US')}
  against this run's certified ${last.Y2.toLocaleString('en-US')}. The greedy would have to be short by
  a factor of ${(first.y2x2 * 4001 * 4001 / last.Y2).toFixed(1)} at x = 4001, i.e. a fidelity of ${(last.Y2 / (first.y2x2 * 4001 * 4001)).toFixed(4)}, against the
  [0.47, 0.73] bracket below and against ${(1 / 0.9567).toFixed(3)}, its largest measured shortfall
  anywhere, at x = 79 (ratio 0.9567, greedy-oracle-validation.md §3). The same
  arithmetic in the BLOCK frame is on record: history/staging/attack-block-04-greedy.md
  §7 puts the fidelity flatness would require at 0.0117 there.
  That is not a proof and it is not offered as one: the shortfall above x = 79
  is unmeasured. It is the size of the thing that would have to be true.

  A SECOND, WIDER CALIBRATION, not a power law and not from this run.
  two-class-lower-bounds.md §5c brackets the ladder's fidelity at x = 4001 by
  its two measured proxies at [0.47, 0.73]. At the worst edge of that bracket
  x = 4001 reads ${(last.Y2 / 0.47 / (4001 * 4001)).toFixed(5)} against x = 37's exact ${first.y2x2.toFixed(5)}, still a
  factor of ${(first.y2x2 / (last.Y2 / 0.47 / (4001 * 4001))).toFixed(1)} down. No calibration in evidence anywhere closes the gap.
`);

// ============================================== 5. WHAT THIS DOES NOT SHOW
console.log('='.repeat(78));
console.log('5. WHAT THIS DOES NOT SHOW');
console.log('='.repeat(78));
console.log(`
  1. It does not show that G2(x#)/x^2 falls. Y2 is a LOWER bound on G2 - 1 and
     the instrument's own banner says so: a falling Y2/x^2 does not prove a
     falling G2/x^2, because the shortfall Y2/(G2-1) is itself unmeasured above
     x = 79 and could in principle fall as fast as the ratio does.
  2. The correction band is a FLOOR on the shortfall, not a bracket on it. It
     was measured at R = 2048 restarts on 22 primes. The ladder runs at R = 512
     down to R = 2 on up to 550 primes, a budget thinner by orders of magnitude,
     so the true shortfall at the top of the ladder is larger than the band says
     and the corrected column is still a lower bound.
  3. The band is an extrapolation of a fit over x = 13..79 to x = 4001, a range
     it was never measured on, on a curve not established as a power law
     (greedy-oracle-validation.md §9.3).
  4. Nothing here is a new certificate at any level: sixteen of sixteen rows
     reproduce the published ladder, which is the result, and the certified
     lower bound at x = 1699, 2003 and 4001 remains the LARGER 2026-08-17
     number, exactly as §5d already recorded.
`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/y2-ladder-recompute.js -- --collect
//   invocation:  node research/y2-ladder-recompute.js --collect
//   code-sha256: f88457d1d5e7a8b60ad6b450005a65441bcc31518feaa65720345afd789ccef6
//   out-sha256:  401b4b4118c3558b870e668c65e5713447a47ab2a1fe56dac4d7964beb42d3fa
//   body-lines:  263
//   restamped:   2026-08-20 normalize migration; body verified byte-authentic under the bind-time rule (pre-min (before 2026-08-20)) before the hash moved
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.1 s
// ============================================================================
// ==============================================================================
// 0. PROVENANCE. What produced every number below.
// ==============================================================================
//
//   instrument   research/two-class-lower-bounds.js   NOT MODIFIED by this run
//                sha256 726e5a4bef8f8241295d37b264ba575486cb5aaba76b37550c1d06d2004f4023
//   published    research/two-class-lower-bounds.md    the OLD-B column
//                sha256 068b9acbf8b1918f7da7939b567e23c828326290e4075ea6e8e09e167562246e
//   shard dir    /private/tmp/claude-501/-Users-benjaminsen-Files-Git-primeoire/bf77f80e-cee6-4b3e-aec5-a90fe5b7ab3d/scratchpad/y2-shards
//   budget       the instrument's stock schedule budget(np), no --force-budget,
//                SEED_BASE = 20260818, one rule for all sixteen levels.
//
//   parsed  OLD-A (2026-08-17 bisecting search, OLDY2 in the .js): 16 levels
//   parsed  OLD-B (2026-08-18 repaired ladder, §5d of the .md):    16 levels
//
//   the sixteen shard logs, each a separate detached process:
//      x   np      bytes   sha256(first 16)   secs
//       37   12        759   3dfd3421ac7377f3       26.3
//       73   21        759   e99e2ec86140e581       10.1
//      113   30        759   c8f62090f390d957       28.8
//      167   39        759   cb6728c021fc1450       59.0
//      229   50        759   ae1371972fba212c       51.8
//      313   65        759   8973bad87412f257      100.3
//      421   82        759   6b9f423a9c3e5b58       68.7
//      571  105        759   14698532dded1d4c      127.4
//      773  137        759   33fe369f5b69caf3      243.7
//     1009  169        759   a474f6c8932b26a0      167.2
//     1301  212        759   bc07acb993921954      302.1
//     1699  266        759   e87e672462605793      490.1
//     2003  304        759   be9f1f1a49c1d858      747.2
//     2503  368        759   8140f6dd4fed93c9      702.0
//     3001  431        759   1a30f75e500d2b7d      830.5
//     4001  551        759   adf5f09c3a5b1302     2346.7
//
//   longest rung 39.1 min; summed process time 105.0 min.
//   TODO 1b §8 priced this at ~235 min summed, ~71 min for x = 4001 alone.
//
// ==============================================================================
// 1. THE OLD SIXTEEN, BOTH OF THEM, QUOTED BEFORE ANYTHING NEW IS READ
// ==============================================================================
//
//   OLD-A is the 2026-08-17 ladder: bisection on a NON-MONOTONE feasibility
//   predicate, deterministic tie-breaks, bracket chained from the level below.
//   Superseded at all sixteen levels by the 2026-08-18 repair.
//   OLD-B is that repair's published ladder, §5d of two-class-lower-bounds.md,
//   produced in ONE process. It is what this run has to reproduce.
//
//      x   np    OLD-A (08-17)    OLD-B (08-18)   B/A     OLD-B Y1
//       37   12             355              527   1.485           65
//       73   21            1211             1440   1.189          182
//      113   30            2501             2823   1.129          311
//      167   39            4210             4728   1.123          462
//      229   50            6748             7372   1.092          658
//      313   65           10469            11682   1.116         1000
//      421   82           16453            17280   1.050         1391
//      571  105           25469            26303   1.033         2005
//      773  137           39277            40644   1.035         2906
//     1009  169           56213            57245   1.018         3928
//     1301  212           81986            82013   1.000         5469
//     1699  266          118367           117596   0.993         7447
//     2003  304          144712           143942   0.995         8938
//     2503  368          191927           195617   1.019        11639
//     3001  431          245270           247877   1.011        14324
//     4001  551          356711           354729   0.994        19775
//
// ==============================================================================
// 2. PRE-REGISTRATION, sealed before the sixteen processes were launched
// ==============================================================================
//
//   P1  AGAINST OLD-A. The corrected instrument must read >= OLD-A at every one
//       of the sixteen levels where the comparison is fair. OLD-A bisected a
//       predicate that is not monotone, so it can only have under-searched.
//       A DECREASE IS NOT AUTOMATICALLY A FINDING at three levels and the reason
//       is on record before this run: §5d already reports x = 1699, 2003, 4001
//       landing BELOW OLD-A (117,596 vs 118,367; 143,942 vs 144,712; 354,729 vs
//       356,711), because OLD-A chained its bracket from the level below and the
//       repaired search refuses that free information in exchange for level
//       independence. So: a decrease at 1699, 2003 or 4001 is EXPECTED and is not
//       an instrument regression. A decrease at any OTHER level would be new, and
//       would be a real finding.
//
//   P2  AGAINST OLD-B. This is the sharp test, and it is not a >= test. The
//       repair made every level independent of every other, so a sharded rerun
//       must reproduce OLD-B EXACTLY, all sixteen, digit for digit, in Y1 and Y2
//       alike. ANY difference is a finding: either the levels are not independent
//       after all, or the published ladder does not come from the file that
//       claims it. There is no noise channel here. The instrument is deterministic
//       from SEED_BASE and the bracket seed is a closed form in x.
//
//   P3  THE DIRECTION, for item 1d. Y2/x^2 is read as a monotone sequence and a
//       slope with a band, never as a comparison of two means, and the greedy
//       degradation measured in history/staging/greedy-oracle-validation.md is
//       applied as a correction band before any direction is declared.
//
// ==============================================================================
// 3. THE NEW SIXTEEN, and the two scored comparisons
// ==============================================================================
//
//   Every row replay-verified by the instrument's own independent verifier.
//   Every Y2 is a CERTIFIED LOWER BOUND on G2(x#) - 1, never an estimate of it.
//
//      x   np    R    W      calls   Y1     NEW Y2    OLD-A    NEW-A   OLD-B   NEW-B  replay
//     37   12  512  200     417332     65       527      355    +172     527     +0     OK
//     73   21   96  120      44095    182      1440     1211    +229    1440     +0     OK
//    113   30   96  120      55178    311      2823     2501    +322    2823     +0     OK
//    167   39   96  120      60431    462      4728     4210    +518    4728     +0     OK
//    229   50   32   96      27076    658      7372     6748    +624    7372     +0     OK
//    313   65   32   96      26977   1000     11682    10469   +1213   11682     +0     OK
//    421   82   12   80       9899   1391     17280    16453    +827   17280     +0     OK
//    571  105   12   80      10504   2005     26303    25469    +834   26303     +0     OK
//    773  137   12   80     12156*   2906     40644    39277   +1367   40644     +0     OK
//   1009  169    4   64      4090*   3928     57245    56213   +1032   57245     +0     OK
//   1301  212    4   64      4371*   5469     82013    81986     +27   82013     +0     OK
//   1699  266    4   64      4004*   7447    117596   118367    -771  117596     +0     OK
//   2003  304    4   64      4315*   8938    143942   144712    -770  143942     +0     OK
//   2503  368    2   64      2278*  11639    195617   191927   +3690  195617     +0     OK
//   3001  431    2   64      1584*  14324    247877   245270   +2607  247877     +0     OK
//   4001  551    2   64      2404*  19775    354729   356711   -1982  354729     +0     OK
//   (* = the instrument's call cap bound that level.)
//
//   P1 scored: 13 of 16 at or above OLD-A; 3 below it.
//   P2 scored: 16 of 16 reproduce OLD-B exactly; 0 differ.
//              the one-class control reproduces at 16 of 16 as well.
//   call cap bound 8 of 16 rows.
//
// ==============================================================================
// 4. ITEM 1d. DOES Y2/x^2 FALL OVER THE CORRECTED LADDER?
// ==============================================================================
//
//   THE TWO TRAPS, quoted from TODO.md item 1d and respected below:
//
//     "never declare a trend from a comparison of means (0.278 -> 0.277 was
//      called 'falling')"
//     "never compare slot-unit ratios across natals, since L*mbar/G2 falls
//      0.985 -> 0.531 across natals 5..23 at FIXED b = 37 and that fall is pure
//      tile geometry"
//
//   Trap 1 is met by never forming a mean: the reading below is a per-level
//   sequence, a step-by-step sign count and a log-log slope with its standard
//   error. Trap 2 is met by the units: Y2 is a count of consecutive integers on
//   the integer line, the same unit at every level, divided by x^2. Nothing here
//   is measured in slots of a tile, no quantity is held fixed at one natal while
//   another varies, and each level IS its own natal. The tile-geometry channel
//   that produced 0.985 -> 0.531 has no entry point into this table.
//
//   THE CALIBRATION. Y2 is a lower bound produced by the greedy, and
//   history/staging/greedy-oracle-validation.md measures what the greedy loses:
//   exact at 14 of 14 own levels and at x = 53, then a log-log fidelity slope of
//   -0.02353, se 0.00706, band [-0.03736, -0.00970], over x = 13..79. Corrected
//   Y2 below divides by f(x) = (x/53)^slope for x > 53 and by 1 at x = 37, where
//   Y2 = 527 = G2(37#) - 1 is the exact optimum and no correction is defensible.
//
//      x      Y2       Y2/x^2    f_central  corrected Y2/x^2 at slope    Y2/(x ln^2 x)
//                                           central  steepest shallowest
//     37      527     0.38495     1.0000   0.38495   0.38495    0.38495          1.0924
//     73     1440     0.27022     0.9925   0.27226   0.27347    0.27106          1.0716
//    113     2823     0.22108     0.9823   0.22506   0.22742    0.22271          1.1179
//    167     4728     0.16953     0.9734   0.17417   0.17696    0.17143          1.0808
//    229     7372     0.14058     0.9662   0.14550   0.14848    0.14259          1.0903
//    313    11682     0.11924     0.9591   0.12433   0.12742    0.12131          1.1303
//    421    17280     0.09749     0.9524   0.10237   0.10534    0.09947          1.1241
//    571    26303     0.08067     0.9456   0.08531   0.08817    0.08256          1.1433
//    773    40644     0.06802     0.9389   0.07245   0.07518    0.06981          1.1889
//   1009    57245     0.05623     0.9330   0.06026   0.06277    0.05786          1.1859
//   1301    82013     0.04845     0.9275   0.05224   0.05461    0.04998          1.2259
//   1699   117596     0.04074     0.9216   0.04420   0.04637    0.04213          1.2512
//   2003   143942     0.03588     0.9181   0.03908   0.04109    0.03716          1.2434
//   2503   195617     0.03122     0.9133   0.03419   0.03606    0.03241          1.2763
//   3001   247877     0.02752     0.9094   0.03027   0.03200    0.02862          1.2884
//   4001   354729     0.02216     0.9033   0.02453   0.02604    0.02311          1.2888
//
//   THE CERTIFIED LADDER, which is not the same column. Both the 2026-08-17 and
//   the 2026-08-18 certificates replay clean, so the certified lower bound at each
//   level is the LARGER of the two, which is the convention G2-STATE.md §5a
//   already uses. That column and its direction:
//
//      x    certified Y2   certified Y2/x^2   which run
//       37            527            0.38495   2026-08-18 (this run)
//       73           1440            0.27022   2026-08-18 (this run)
//      113           2823            0.22108   2026-08-18 (this run)
//      167           4728            0.16953   2026-08-18 (this run)
//      229           7372            0.14058   2026-08-18 (this run)
//      313          11682            0.11924   2026-08-18 (this run)
//      421          17280            0.09749   2026-08-18 (this run)
//      571          26303            0.08067   2026-08-18 (this run)
//      773          40644            0.06802   2026-08-18 (this run)
//     1009          57245            0.05623   2026-08-18 (this run)
//     1301          82013            0.04845   2026-08-18 (this run)
//     1699         118367            0.04101   2026-08-17
//     2003         144712            0.03607   2026-08-17
//     2503         195617            0.03122   2026-08-18 (this run)
//     3001         247877            0.02752   2026-08-18 (this run)
//     4001         356711            0.02228   2026-08-17
//
//     certified Y2/x^2 fell at 15 of 15 steps; log-log slope -0.6133, se 0.0075,
//     0.38495 down to 0.02228, a factor of 17.3.
//
//   step-by-step, no mean formed anywhere:
//     Y2/x^2 fell at 15 of the 15 consecutive steps.
//     Under a null of independent coin-flip steps that is p = 3.05e-5.
//     top to bottom 0.38495 -> 0.02216, a factor of 17.4.
//
//   log-log slope of Y2/x^2 against x, 16 points, x in [37, 4001]:
//     raw                 -0.6142  se 0.0076
//     corrected, central  -0.5914  se 0.0073
//     corrected, steepest -0.5780  se 0.0072
//     corrected, shallow  -0.6048  se 0.0075
//     the whole calibration band moves the slope by 0.0268, against a fall of 0.6142.
//
//   THE MATCHED CONTROL, which is the corpus's own way of taking the estimator's
//   fidelity out of an exponent. Y1 is the IDENTICAL repaired search on the
//   one-class problem at the identical budget, and its true exponent is 1, so
//   whatever fidelity the search loses up the ladder it loses on both sides:
//     one class  Y1 ~ x^1.1986   [TRUTH: exponent 1]
//     two class  Y2 ~ x^1.3858
//     excess apparent exponent 0.1872, so the control-corrected reading is 1.1872.
//     Y2/Y1 ~ (ln x)^1.084, se 0.048.
//   Both readings sit far below 2, which is the exponent the Zone Postulate is
//   about, and the control-corrected one is the number G2-STATE.md §6.1 tabulates.
//
//   the same ladder in the OTHER normalisation, which is the shape statement:
//     Y2/(x ln^2 x)  1.0924 -> 1.2888, a factor of 1.18 the OTHER way.
//     Y2/x ~ (ln x)^2.246, se 0.032.
//
//   WHAT FLATNESS WOULD COST, which is the only honest way to put a lower bound
//   to work against a hypothesis. If G2(x#)/x^2 were FLAT at its x = 37 value,
//   where Y2 = 527 = G2(37#) - 1 exactly, then
//     G2(4001#) - 1  =  0.38495 * 4001^2  =  6,162,280
//   against this run's certified 354,729. The greedy would have to be short by
//   a factor of 17.4 at x = 4001, i.e. a fidelity of 0.0576, against the
//   [0.47, 0.73] bracket below and against 1.045, its largest measured shortfall
//   anywhere, at x = 79 (ratio 0.9567, greedy-oracle-validation.md §3). The same
//   arithmetic in the BLOCK frame is on record: history/staging/attack-block-04-greedy.md
//   §7 puts the fidelity flatness would require at 0.0117 there.
//   That is not a proof and it is not offered as one: the shortfall above x = 79
//   is unmeasured. It is the size of the thing that would have to be true.
//
//   A SECOND, WIDER CALIBRATION, not a power law and not from this run.
//   two-class-lower-bounds.md §5c brackets the ladder's fidelity at x = 4001 by
//   its two measured proxies at [0.47, 0.73]. At the worst edge of that bracket
//   x = 4001 reads 0.04715 against x = 37's exact 0.38495, still a
//   factor of 8.2 down. No calibration in evidence anywhere closes the gap.
//
// ==============================================================================
// 5. WHAT THIS DOES NOT SHOW
// ==============================================================================
//
//   1. It does not show that G2(x#)/x^2 falls. Y2 is a LOWER bound on G2 - 1 and
//      the instrument's own banner says so: a falling Y2/x^2 does not prove a
//      falling G2/x^2, because the shortfall Y2/(G2-1) is itself unmeasured above
//      x = 79 and could in principle fall as fast as the ratio does.
//   2. The correction band is a FLOOR on the shortfall, not a bracket on it. It
//      was measured at R = 2048 restarts on 22 primes. The ladder runs at R = 512
//      down to R = 2 on up to 550 primes, a budget thinner by orders of magnitude,
//      so the true shortfall at the top of the ladder is larger than the band says
//      and the corrected column is still a lower bound.
//   3. The band is an extrapolation of a fit over x = 13..79 to x = 4001, a range
//      it was never measured on, on a curve not established as a power law
//      (greedy-oracle-validation.md §9.3).
//   4. Nothing here is a new certificate at any level: sixteen of sixteen rows
//      reproduce the published ladder, which is the result, and the certified
//      lower bound at x = 1699, 2003 and 4001 remains the LARGER 2026-08-17
//      number, exactly as §5d already recorded.
// ============================================================================
// READINGS
// ============================================================================
//
// 1. THE SHARDED RERUN IS BIT-IDENTICAL TO THE PUBLISHED LADDER. 16 of 16 rows
//    reproduce OLD-B exactly in Y2, and the one-class control reproduces at
//    16 of 16 as well. P2 was the sharp pre-registered test and it passes with
//    no exceptions, so level independence is now a measured property of the
//    repaired instrument rather than a claim in its header. Sixteen separate
//    processes, launched together, agree digit for digit with one process.
//
// 2. AGAINST THE 2026-08-17 LADDER: 13 of 16 at or above it, 3 below. The three
//    are exactly x = 1699, 2003 and 4001, the three P1 named in advance as
//    expected decreases, at -771, -770 and -1982. No level outside that list
//    moved down, so the pre-registered instrument-regression flag never fires.
//    The gain shrinks up the ladder, +172 at x = 37 against +27 at x = 1301.
//
// 3. Y2/x^2 FELL AT 15 OF THE 15 STEPS, 0.38495 down to 0.02216, a factor of
//    17.4. That is a sign count over consecutive levels, not a comparison of
//    means, which is trap 1 of item 1d. Log-log slope -0.6142, se 0.0076.
//
// 4. THE CALIBRATION BAND DOES NOT TOUCH THE DIRECTION. Dividing by the greedy's
//    measured fidelity decay moves the slope to -0.5914 central, -0.5780 at the
//    steepest edge and -0.6048 at the shallowest. The whole band is 0.0268 wide
//    against a fall of 0.6142, i.e. 4.4% of the effect. The wider non-power-law
//    calibration, §5c's [0.47, 0.73] bracket, still leaves x = 4001 at 0.04715
//    against 0.38495, a factor of 8.2 down.
//
// 5. WHAT FLATNESS WOULD REQUIRE. G2(4001#) - 1 would have to be 6,162,280
//    against the certified 354,729: a greedy fidelity of 0.0576, where the
//    largest shortfall ever measured for this rule is 1.045 at x = 79. This is
//    the unrestricted-frame twin of the block-frame 0.0117 already on record.
//
// 6. THE MATCHED CONTROL PUTS THE EXPONENT AT 1.1872. One class reads x^1.1986
//    where the truth is 1, two class reads x^1.3858, excess 0.1872. Y2/Y1 grows
//    like (ln x)^1.084, se 0.048 — one logarithm, not a power of x.
//
// 7. THE SHAPE IS x times polylog. Y2/(x ln^2 x) moves 1.0924 to 1.2888, a
//    factor of 1.18 UP, over the same range where Y2/x^2 falls 17.4-fold.
//    Y2/x ~ (ln x)^2.246, se 0.032.
//
// 8. TRAP 2 HAS NO ENTRY POINT HERE. Y2 counts consecutive integers on the
//    integer line at every level and is divided by x^2, one unit throughout.
//    No quantity is held at one natal while another varies, so the tile-geometry
//    channel that produced the 0.985 to 0.531 fall cannot act on this table.
//
// 9. COST. Longest rung 39.1 min against the 71 min TODO 1b §8 priced for
//    x = 4001; summed process time 105.0 min against its ~235 min. Sharding
//    bought the ladder for the price of one rung, as §8 said it would.
//
// 10. THE CALL CAP BOUND 8 OF 16 ROWS, every level from x = 773 up. Those rows
//    are weaker lower bounds than their budget row alone suggests, and that is
//    a property the published ladder shares, since it is the same schedule.
