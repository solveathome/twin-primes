#!/usr/bin/env node
'use strict';
// ============================================================================
// QC / TAILS — does a script's pasted OUTPUT block match what the script prints?
// ============================================================================
// Run it:  node research/qc/tails.js                  fast tier, 30 s per script
//          node research/qc/tails.js --timeout 300    a slower tier
//          node research/qc/tails.js --only attack-   substring filter on names
//          node research/qc/tails.js --root <path>    run the scripts somewhere else
//          node research/qc/tails.js --json           machine-readable, for a ledger
//
// WHY THIS EXISTS, and it is the assumption the whole provenance model rests on.
//
// `research/SCRIPTS.md` states the model in its own words: the house format is
// "question in the header, code, pasted output, numbered readings, which means
// A SCRIPT IS READABLE AS EVIDENCE WITHOUT BEING RE-RUN." Every claim in this
// corpus is traceable to a script, and in practice traceable to the block of
// output pasted into that script's tail. Nothing checked that the paste was
// real.
//
// On 2026-08-18 it was not. `research/attack-lower-bound.js` was written
// complete with an OUTPUT block and eight numbered READINGS **before the file
// had ever been executed**. The agent ran it once afterwards, said "several
// results differ from what I expected", began repairing at the wrong end, and
// died on an API error. Ten figures in that tail were wrong, two with the sign
// reversed, and not one of them appeared anywhere in its own 140-entry
// transcript. The code was correct throughout and reproduces byte-identically.
// Only the evidence was invented.
//
// That defect is invisible to every other instrument here:
//   - `qc.js scripts`   checks a script parses, is titled and is cited. Passes.
//   - `qc.js provenance` checks a claim names a producer. Passes.
//   - `audit-numbers.js` recomputes load-bearing numbers that reached a
//                        DOCUMENT. A wrong number sitting in a script tail, or
//                        quoted from one into a staging report, never reaches it.
//   - a human reading    sees a number, a script beside it, and a plausible
//                        table. There is nothing to notice.
//
// So this file executes the script and asks whether the pasted figures are in
// the output. It cannot check that the code is right; `audit-numbers.js` and
// the self-tests do that. It checks that the paste is a record rather than a
// composition, which is the one thing no reader can check by reading.
//
// WHAT A FINDING MEANS. A missing figure is a candidate, not a verdict, and the
// three honest causes are worth knowing before opening the file:
//   (a) the paste is fiction, or predates the run           <- the defect
//   (b) the paste is real but elided ("..." rows dropped)   <- fix the paste
//   (c) the script is argument-driven and the recorded run used an invocation
//       this one did not                                    <- record the
//       invocation in the tail, per qc/units.js section 7
// (c) is the reason this file prints the invocation it used on every line.
// ============================================================================

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
// ONE parser, shared with embed.js and checks.js. This file used to carry its
// own copy, and on 2026-08-19 attack 9 measured the two disagreeing on 29
// scripts — the exact drift the tailfmt header warns about, committed by the
// framework itself within a day of warning about it.
const T = require('./tailfmt');

const argv = process.argv.slice(2);
const opt = (name, dflt) => {
  const i = argv.indexOf('--' + name);
  return i === -1 ? dflt : argv[i + 1];
};
const has = (name) => argv.includes('--' + name);

const REPO = path.resolve(__dirname, '..', '..');
const ROOT = path.resolve(opt('root', REPO));
const TIMEOUT = Number(opt('timeout', 30)) * 1000;
const ONLY = opt('only', null);
const JSON_OUT = has('json');

// ---------------------------------------------------------------------------
// 1 and 2. The tail and its figures now come from qc/tailfmt.js, which is the
//    single definition of what a tail is. See its header for the two shapes
//    that were invisible until 2026-08-19.
// ---------------------------------------------------------------------------
const outputBlock = (src) => T.outputText(src);
const figures = (block) => T.figures(block);
const present = (tok, out) => T.presentIn(tok, out);

// THE FINGERPRINT'S INVOCATION IS AUTHORITATIVE (2026-08-20). The old regex
// took the first token after `node` as the filename, so a recorded node flag
// (`node --max-old-space-size=8192 research/foo.js --big`) was re-run as
// `node research/foo.js research/foo.js`: 35 of 198 bound tails were re-run
// with the wrong command, two losing their argument's position and one its
// environment entirely (verify-the-verifier-embeds.md §6 item 5). Parse the
// recorded invocation properly — env assignments, node flags, script, args —
// preferring the fingerprint, falling back to a header `run:` line.
function recordedInvocation(src) {
  const fp = T.fingerprint(src);
  const inv = (fp && fp['invocation'])
    || (src.match(/^\s*\/\/.*\b(?:run|invocation|invoked)(?:\s+as)?\s*:\s*((?:[A-Z][A-Z0-9_]*=\S*\s+)*node\s[^\n]*)$/im) || [])[1];
  if (!inv) return null;
  const toks = String(inv).trim().split(/\s+/).filter(Boolean);
  const envs = [], nodeFlags = [], args = [];
  let i = 0;
  while (i < toks.length && /^[A-Z][A-Z0-9_]*=/.test(toks[i])) envs.push(toks[i++]);
  if (toks[i] === 'node') i++;
  while (i < toks.length && toks[i].startsWith('-')) nodeFlags.push(toks[i++]);
  if (i < toks.length) i++;                        // the script path itself
  while (i < toks.length) args.push(toks[i++]);
  return { envs, nodeFlags, args };
}

// ---------------------------------------------------------------------------
// 3. Run, and compare.
// ---------------------------------------------------------------------------
function run(file, inv) {
  const started = Date.now();
  const env = Object.assign({}, process.env);
  for (const kv of inv.envs) { const i = kv.indexOf('='); if (i > 0) env[kv.slice(0, i)] = kv.slice(i + 1); }
  try {
    const out = execFileSync('node', [...inv.nodeFlags, file, ...inv.args], {
      cwd: ROOT, timeout: TIMEOUT, maxBuffer: 512 * 1024 * 1024,
      encoding: 'utf8', env, stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { status: 'ran', out, ms: Date.now() - started };
  } catch (e) {
    const ms = Date.now() - started;
    if (e.killed || e.signal === 'SIGTERM') return { status: 'slow', out: (e.stdout || ''), ms };
    return { status: 'error', out: (e.stdout || '') + (e.stderr || ''), ms, msg: (e.message || '').split('\n')[0] };
  }
}

// ---------------------------------------------------------------------------
const dir = path.join(ROOT, 'research');
let files = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort();
if (ONLY) files = files.filter(f => f.includes(ONLY));

const results = [];
for (const f of files) {
  const abs = path.join(dir, f);
  const src = fs.readFileSync(abs, 'utf8');
  const block = outputBlock(src);
  if (block === null || block.trim() === '') {
    results.push({ file: f, status: 'no-tail' });
    continue;
  }
  if (/filled in from the run|see the report\)/i.test(block)) {
    results.push({ file: f, status: 'placeholder', note: 'tail is a placeholder, never filled' });
    continue;
  }
  const figs = figures(block);
  if (figs.size === 0) { results.push({ file: f, status: 'no-figures' }); continue; }

  const inv = recordedInvocation(src) || { envs: [], nodeFlags: [], args: [] };
  const r = run(path.join('research', f), inv);
  const missing = [];
  for (const [tok, ctx] of figs) if (!present(tok, r.out)) missing.push({ tok, ctx });

  results.push({
    file: f, status: r.status, ms: r.ms, msg: r.msg,
    invocation: [...inv.envs, 'node', ...inv.nodeFlags, 'research/' + f, ...inv.args].join(' '),
    checked: figs.size, missing: missing.length,
    rate: figs.size ? missing.length / figs.size : 0,
    sample: missing.slice(0, 6),
  });
  if (!JSON_OUT) {
    const tag = r.status === 'ran'
      ? (missing.length === 0 ? 'ok  ' : 'MISS')
      : (r.status === 'slow' ? 'slow' : 'ERR ');
    const detail = r.status === 'ran'
      ? `${String(figs.size).padStart(4)} figures, ${String(missing.length).padStart(4)} missing`
      : (r.status === 'slow' ? `over ${TIMEOUT / 1000}s` : (r.msg || '').slice(0, 60));
    process.stdout.write(`  ${tag}  ${f.padEnd(42)} ${detail}   [${(r.ms / 1000).toFixed(1)}s]\n`);
  }
}

if (JSON_OUT) { console.log(JSON.stringify(results, null, 1)); process.exit(0); }

const ran = results.filter(r => r.status === 'ran');
const bad = ran.filter(r => r.missing > 0).sort((a, b) => b.rate - a.rate);
const slow = results.filter(r => r.status === 'slow');
const err = results.filter(r => r.status === 'error');
const ph = results.filter(r => r.status === 'placeholder');

console.log('\n' + '='.repeat(76));
console.log('TAILS');
console.log('='.repeat(76));
console.log(`  scripts with a pasted OUTPUT block : ${results.filter(r => !['no-tail', 'no-figures'].includes(r.status)).length}`);
console.log(`  reproduced, every figure present   : ${ran.length - bad.length}`);
console.log(`  figures checked                    : ${ran.reduce((a, r) => a + r.checked, 0)}`);
console.log(`  FIGURES NOT FOUND IN A FRESH RUN   : ${bad.reduce((a, r) => a + r.missing, 0)} across ${bad.length} script(s)`);
console.log(`  too slow for this tier             : ${slow.length}   (raise --timeout to reach them)`);
console.log(`  failed to run                      : ${err.length}`);
console.log(`  placeholder tails, never filled    : ${ph.length}`);

if (bad.length) {
  console.log('\n  Ranked by the fraction of the paste that is not in the output:\n');
  for (const r of bad) {
    console.log(`  ${r.file}  —  ${r.missing}/${r.checked} missing (${(r.rate * 100).toFixed(0)}%)`);
    console.log(`      invocation: ${r.invocation}`);
    for (const m of r.sample) console.log(`      ${m.tok.padEnd(16)} in: ${m.ctx}`);
    console.log('');
  }
  console.log('  Before calling any of these a defect, read the three causes at the top');
  console.log('  of this file: fiction, elision, or an unrecorded invocation.');
}
for (const r of slow) console.log(`  slow: ${r.file}`);
for (const r of err) console.log(`  error: ${r.file}  ${(r.msg || '').slice(0, 70)}`);

process.exit(bad.length || ph.length ? 1 : 0);
