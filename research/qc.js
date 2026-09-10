#!/usr/bin/env node
// ============================================================================
// QC — the body of work checks itself
// ============================================================================
// Chris, 2026-08-17: "Our goal is correctness of the body of work for future AI
// assisted research. We need a trusted body of work for us to even think about
// what we would want to dive into next." And: "feel free to write yourself a
// small software library that enforces these rules where needed. Consider it a
// self helping software framework."
//
// USAGE
//   node research/qc.js                 every check, human-readable report
//   node research/qc.js --full          all three gates; exits 1 if any fails
//   node research/qc.js refs quotes     only the named checks
//   node research/qc.js --pending       also run the checks not yet in the gate
//   node research/qc.js --strict        exit 1 if any finding survives
//   node research/qc.js --index         also regenerate research/SCRIPTS.md
//   node research/qc.js --list          what the checks are and what each caught
//
// WHY EACH CHECK EXISTS. Every rule caught a real defect on the day it was
// written, and the defects were not typos. They were the same failure repeated:
// a claim was fixed in the research layer and the summary layer above it went on
// asserting the old thing. The checks below are the layers disagreeing, made
// mechanical. See research/history/staging/qc-CAMPAIGN.md for the full campaign.
//
// WHAT THIS TOOL WILL NOT DO. It never edits a body document, and it never
// treats research/history/ as a working document, because that directory is the
// process record and is supposed to be full of superseded claims. It also never
// flags a script's CORRECTION banner as a defect: those banners are the only
// guard between a reader and a runnable wrong number.
// ============================================================================

'use strict';

const path = require('path');
const checks = require('./qc/checks');
const C = require('./qc/corpus');

const GATED = {
  refs: checks.refs,
  quotes: checks.quotes,
  crosslinks: checks.crosslinks,
  scripts: checks.scriptProvenance,
  transfers: checks.transfers,
  calibration: checks.calibration,
  absence: checks.absenceClaims,
  sourcing: checks.sourcing,
  embeds: checks.embeds,
  widths: checks.widths,
  ledger: require('./qc/questions').ledger,
  parity: require('./qc/questions').parity,
};

// ---------------------------------------------------------------------------
// PENDING CHECKS — built, calibrated, visible, and deliberately not in the gate.
//
// Both were specified before they were built (provenance in PRIOR-ART.md's
// "Provenance: what artifact was actually read"; search-convention in
// SEARCH-CONVENTIONS.md §6) and both were deferred twice on 2026-08-18 for the
// same honest reason: an attack agent is still running against the very claims
// they fire on, and reports against a clean eight-check gate. Turning them on
// mid-flight would have meant either a red gate nobody could act on or a
// suppression ledger written to hide findings nobody had read.
//
// THIS IS NOT A SUPPRESSION, and the difference is worth stating because the
// house rule here is that a check which exists but is hidden IS one. Nothing is
// hidden: `--list` prints both, every default run prints their names and their
// live finding counts are recorded in
// research/history/staging/qc-checks-9-10.md. What they do not do is change the
// gate's verdict while a wave is in the air.
//
// THE FLIP IS ONE LINE: set PENDING_IN_GATE to true, immediately below. That
// promotes both into the gate, into --full, and into --strict's exit code. Do
// it when the running attack agent lands and its findings have been applied,
// and expect the gate to go red until the queues below are worked.
// ---------------------------------------------------------------------------
const PENDING_IN_GATE = true;          // <-- THE FLIP. true promotes both into the gate.

const PENDING = {
  provenance: checks.provenance,
  'search-convention': checks.searchConvention,
};

// ---------------------------------------------------------------------------
// ADVISORY — run and printed on every default run, and DELIBERATELY OUTSIDE the
// verdict. Not a pending check: nothing here is waiting to be promoted.
//
// `embed-backlog` counts two things that are honest to know and dishonest to
// gate on. The 61 legacy tails predate `qc/embed.js` and are a migration
// counter that should only fall. The readings ranking has a MEASURED
// false-positive floor — prose arithmetic over printed values lands in it, as
// `a3-06-origin-vs-max.js`'s "230.6M copy-slots" over a printed 214,708,725
// does — so it is a reading order for a human, not a defect list. Gating on a
// number whose floor is noise would train everyone to ignore a red gate, which
// is the failure this framework is supposed to prevent, not cause.
// ---------------------------------------------------------------------------
const ADVISORY = {
  'embed-backlog': checks.embedBacklog,
  'sourcing-backlog': checks.sourcingBacklog,
  'widths-scan': checks.widthsScan,
  'ledger-backlog': require('./qc/questions').ledgerBacklog,
};

const WHY = {
  refs: 'caught maier-matrix.md:282 citing origin-excess.md §6c, a section that does not exist',
  quotes: 'caught gate-multiplies.md attributing "15 to 45 percent, TRENDING DOWN" to U-FRAME, which now says 77 to 214 percent and not falling',
  crosslinks: "enforces Chris's condition for moving things: a document nothing points at is unreachable",
  scripts: 'surfaces the 18 scripts whose header carries a correction banner, and any script with no title',
  transfers: "caught G2-STATE dropping 'with y'^2 > x' from a proven lemma, which makes it vacuous; six more in the papers",
  calibration: "caught natal-cap-23's banner calling the aggregate PROVEN where the artifact's own table reads [OPEN] for all x",
  absence: "enumerates the class NOTHING can verify: three documents said the @13 bound was never run while the script that ran it sat in the same directory",
  sourcing: "Chris's rule of 2026-08-18: a number of ours must name the script that produced it; four documents carried numbers no script claimed",
  provenance: 'PENDING. Every quotation says "verbatim" and nine said nothing about WHICH artifact was read; the ar5iv rendering is the layer that produced the FKMPT constant this repo retracted',
  embeds: "caught nothing the day it landed, by construction: it speaks only about tails that claim which code produced them, and Chris's formal embed had just been built. It exists because attack-lower-bound.js carried an OUTPUT block and eight READINGS written before the file was ever executed",
  'embed-backlog': 'ADVISORY, never gated. 61 legacy tails awaiting an embed, and a ranking of readings by how much of them their own output does not contain',
  'sourcing-backlog': 'ADVISORY, never gated. Per-SECTION custody: sections whose numbers ride on a producer named elsewhere in the file (220 on the day it landed; the counter should only fall, gate it in the tens)',
  widths: "the la/lb container held INDICES into a 198,274-entry list in sixteen bits at @37: two thirds of the primes read back wrong, the measurement came out 18% low, and it read as a refutation. This tier holds only what is provable from the source alone, and it reads 0 today, as `embeds` did on its first day",
  'widths-scan': 'ADVISORY, never gated. The shapes the three width incidents actually had — a bit index mod a VARIABLE modulus, a narrow container read back as a subscript, a primorial in a Number. Every one is correct at the level last run and unproven at the next, so it is a work queue, not a defect list. Adopting the qc/widths guard clears an entry',
  parity: "Every new attack note declares its arithmetic inputs and method scope, or residue-only. The gate checks that declaration; it does not prove feasibility or exclude every exact residue argument",
  ledger: "Chris, 2026-08-28: 'We keep re-running things.' Three briefs that day re-posed answered questions (TODO 0's first move had run a week earlier). A note names the TODO item it executes; the item must list it on its Ledger: line, so the next briefer reads it instead of re-running it",
  'ledger-backlog': 'ADVISORY, never gated. Legacy notes without a ledger block, listed by title in QUESTIONS.md §3; the counter should only fall',
  'search-convention': 'PENDING. two-class-lower-bounds.md §2 rows 3 and 5 both read ABSENT with no owning convention named; both were false, and G2 had been in OEIS as A144311 since 2008 under wording containing none of our words',
};

const argv = process.argv.slice(2);
const strict = argv.includes('--strict');
const full = argv.includes('--full');
const wantIndex = argv.includes('--index');
const list = argv.includes('--list');
const pending = PENDING_IN_GATE || argv.includes('--pending');
const named = argv.filter(a => !a.startsWith('--'));

// Naming a pending check explicitly runs it, so `node research/qc.js provenance`
// works without the flag. Otherwise it takes --pending, or the flip above.
const ALL = { ...GATED };
for (const [k, fn] of Object.entries(PENDING))
  if (pending || named.includes(k)) ALL[k] = fn;

if (list) {
  console.log('qc checks, and the defect each was written to catch:\n');
  for (const k of Object.keys(GATED)) console.log(`  ${k.padEnd(18)} ${WHY[k]}`);
  console.log('\npending, built and calibrated but NOT in the gate (run with --pending):\n');
  for (const k of Object.keys(PENDING)) console.log(`  ${k.padEnd(18)} ${WHY[k]}`);
  console.log('\nadvisory, printed on every run and never part of the verdict:\n');
  for (const k of Object.keys(ADVISORY)) console.log(`  ${k.padEnd(18)} ${WHY[k]}`);
  console.log('\nresearch/history/ is never audited as a working document.');
  console.log('research/*.js correction banners are surfaced, never flagged as defects.');
  process.exit(0);
}

for (const [k, fn] of Object.entries(ADVISORY)) if (named.includes(k)) ALL[k] = fn;

const toRun = named.length ? named.filter(n => ALL[n]) : Object.keys(ALL);
const unknown = named.filter(n => !ALL[n] && !ADVISORY[n]);
if (unknown.length) {
  console.error(`unknown check(s): ${unknown.join(', ')}`);
  console.error(`available: ${Object.keys(GATED).join(', ')}`);
  console.error(`pending (run by name, or with --pending): ${Object.keys(PENDING).join(', ')}`);
  process.exit(2);
}

console.log(`qc: ${C.bodyMarkdown.length} working documents, ${C.historyMarkdown.length} history documents, ${C.scripts.length} scripts`);
console.log(`running: ${toRun.join(', ')}\n`);

let total = 0;
const summary = [];

for (const name of toRun) {
  const t0 = Date.now();
  const res = ALL[name]();
  const ms = Date.now() - t0;
  total += res.findings.length;
  summary.push({ name, n: res.findings.length, ms });

  console.log('─'.repeat(76));
  console.log(`${name.toUpperCase()}  —  ${res.description}`);
  console.log(`${res.findings.length} finding(s)   [${ms} ms]`);
  console.log('─'.repeat(76));

  if (!res.findings.length) { console.log('  clean\n'); continue; }

  const byKind = new Map();
  for (const f of res.findings) {
    if (!byKind.has(f.kind)) byKind.set(f.kind, []);
    byKind.get(f.kind).push(f);
  }
  for (const [kind, group] of byKind) {
    console.log(`\n  ${kind}  (${group.length})`);
    for (const f of group) {
      console.log(`    ${f.file}:${f.line}`);
      if (f.detail) console.log(`        ${f.detail}`);
      if (f.note) console.log(`        ${f.note}`);
    }
  }
  console.log();
}

if (wantIndex) {
  console.log('─'.repeat(76));
  console.log('regenerating research/SCRIPTS.md');
  require('child_process').execFileSync(process.execPath,
    [path.join(__dirname, 'gen-scripts-index.js')], { stdio: 'inherit' });
  console.log('regenerating research/QUESTIONS.md');
  require('child_process').execFileSync(process.execPath,
    [path.join(__dirname, 'gen-questions-index.js')], { stdio: 'inherit' });
  console.log();
}

console.log('═'.repeat(76));
console.log('SUMMARY');
for (const s of summary) console.log(`  ${s.name.padEnd(12)} ${String(s.n).padStart(5)} finding(s)   ${s.ms} ms`);
console.log(`  ${'TOTAL'.padEnd(12)} ${String(total).padStart(5)}`);
console.log('═'.repeat(76));

// VISIBILITY IS THE WHOLE POINT. A check that exists and is not mentioned is a
// suppression, so every run that leaves the pending checks out says they exist,
// says what they hold, and says how to run them.
if (!pending) {
  console.log();
  console.log(`PENDING, built and calibrated, deliberately OUT of this total: ${Object.keys(PENDING).join(', ')}.`);
  console.log('  Run them with `node research/qc.js --pending`. They are out because an attack');
  console.log('  agent is still running against the claims they fire on and reports against a');
  console.log('  clean 8-check gate. Counts as of 2026-08-18 and the one-line flip that promotes');
  console.log('  them: research/history/staging/qc-checks-9-10.md.');
}

// The advisory tier, printed on every run and never in the total above. It is
// here rather than in the gate because its floor is noise, and a red gate that
// cannot be cleared is how a team learns to ignore a red gate.
if (!named.length) {
  for (const [k, fn] of Object.entries(ADVISORY)) {
    const res = fn();
    const byKind = {};
    for (const f of res.findings) byKind[f.kind] = (byKind[f.kind] || 0) + 1;
    console.log();
    console.log(`ADVISORY  ${k}  —  ${res.description}`);
    for (const [kind, n] of Object.entries(byKind)) console.log(`  ${String(n).padStart(5)}  ${kind}`);
    console.log(`  NOT part of TOTAL. Detail: node research/qc.js ${k}`);
  }
}

console.log();
console.log('Findings are candidates, not verdicts. Open the target before editing:');
console.log('a paraphrase inside quote marks is a style defect, a changed claim is a');
console.log('correctness defect, and the two get different fixes.');
console.log();
console.log('WHAT A ZERO CERTIFIES (verify-the-verifier, 2026-08-20): this is a fast');
console.log('SYNTACTIC gate — pointers resolve, quotations reproduce contiguously, bound');
console.log('blocks hash to their own record, markers agree. It is silent by construction');
console.log('where meaning or arithmetic is at stake: a consistent wrong constant across');
console.log('documents, a stale count in prose, a single-sited overstatement, and a');
console.log('falsified dated absence remain a HUMAN and audit-numbers concern.');

// ---------------------------------------------------------------------------
// THE GATE IS THREE COMMANDS, AND SAYING SO IS THE POINT.
//
// Through four waves this file printed TOTAL 0 while research/audit-numbers.js
// was failing 2 of its 39 checks, because nothing here ran it and nobody
// remembered it existed. A green gate that does not include every instrument is
// a partial green, and a partial green read as a full one is exactly the defect
// class this whole framework was built to catch, committed by the framework.
//
// So the fast checks now name the other two every time they pass, and --full
// runs all three and fails if any of them fails.
// ---------------------------------------------------------------------------
const otherGates = [
  ['node research/qc/selftest.js', 'do these checks still fire on defects we know are defects? (instant)'],
  ['node research/audit-numbers.js', 'every load-bearing number recomputed, retired values included (~400 s)'],
];

if (!full) {
  console.log();
  console.log('This is the fast gate only. The full gate is three commands:');
  console.log(`  node research/qc.js${' '.repeat(20)} the ${Object.keys(ALL).length} checks above (0.4 s)`);
  for (const [cmd, why] of otherGates) console.log(`  ${cmd.padEnd(35)} ${why}`);
  console.log('Run all three, or `node research/qc.js --full`, before believing the corpus is clean.');
}

if (full) {
  const { spawnSync } = require('child_process');
  let failed = total > 0 ? ['qc checks'] : [];
  for (const [cmd] of otherGates) {
    const script = cmd.replace('node research/', '');
    console.log('\n' + '═'.repeat(76));
    console.log(`FULL GATE: ${cmd}`);
    console.log('═'.repeat(76));
    const r = spawnSync(process.execPath, [path.join(__dirname, script)], { stdio: 'inherit' });
    if (r.status !== 0) failed.push(cmd);
  }
  console.log('\n' + '═'.repeat(76));
  console.log(failed.length
    ? `FULL GATE FAILED: ${failed.join(', ')}`
    : `FULL GATE PASSED: ${Object.keys(ALL).length} checks clean, the checks themselves verified, every number recomputed.`);
  console.log('═'.repeat(76));
  if (failed.length) process.exit(1);
}

if (strict && total) process.exit(1);
