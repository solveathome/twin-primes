#!/usr/bin/env node
'use strict';
// ============================================================================
// QC / EMBED — the only sanctioned way to put a run's output into a script
// ============================================================================
// Run it:  node research/qc/embed.js research/<file>.js [-- args to the script]
//          node research/qc/embed.js --check research/<file>.js   verify, no write
//            (--check verifies the static hashes and then RE-RUNS the recorded
//            invocation with its recorded environment, workers included; for a
//            census-scale script the re-run is the census. Use `node research/qc.js embeds`
//            for the static check alone.)
//          node research/qc/embed.js --timeout 600 research/<file>.js
//          node research/qc/embed.js --tail 2 research/<file>.js   multi-tail files
//
// WHY THIS EXISTS. Chris, 2026-08-18: "not trust AI to copy correctly data
// over, but have a formal embed". Exactly right, and it is the difference
// between a rule and a mechanism.
//
// The house format has always been question, code, pasted output, numbered
// readings. The pasting was done by hand — by a person or, lately, by an agent
// — and on 2026-08-18 `research/attack-lower-bound.js` was found carrying an
// OUTPUT block and eight numbered READINGS written BEFORE the file had ever
// been executed. Ten figures were wrong, two with the sign reversed. The code
// was correct all along. Only the transcription was invented, and no reader
// could have told, because an invented table and a real one look the same.
//
// So the transcription step is removed. This tool runs the script and writes
// the block itself. Nothing between the run and the file is a judgement call,
// and the tail carries a fingerprint that binds it to the code above it:
//
//   code-sha256   every byte above the OUTPUT banner. Edit the code without
//                 re-embedding and `qc.js embeds` says so, statically, in
//                 milliseconds, with nothing executed.
//   out-sha256    the normalised stdout. Since 2026-08-20 this is ALSO checked
//                 statically against the pasted block's own bytes, by
//                 `qc.js embeds` and by --check's `body` verdict — a digit
//                 hand-edited inside a bound block is caught with nothing run.
//   body-lines    how many lines the pasted body has, so the parser never has
//                 to guess where it ends (a script that PRINTS the word
//                 READINGS defeated the guess; see tailfmt.js).
//   inputs        path@sha for every file outside this script that the code
//                 above the banner names statically. A dependency edit is then
//                 visible without a re-run.
//   forced        present only when --force overrode a guard, with the date
//                 and what the guard flagged. An overridden guard must leave a
//                 mark in the artefact, not only in a staging report.
//
// WHAT IT DELIBERATELY DOES NOT DO. It does not write the READINGS. Those are
// the interpretation, they are the part worth a human's attention, and a tool
// that generated them would be inventing exactly what this one exists to stop.
// What the framework enforces about readings is narrower and checkable: a
// figure quoted in a reading must appear in the block above it.
//
// EXIT CODES: 0 ok; 1 run/check failure; 2 usage; 3 guard refusal (--force to
// override); 4 no OUTPUT banner (loud, on both streams); 5 ambient environment
// collision; 6 multi-tail file needs --tail.
// ============================================================================

const fs = require('fs');
const path = require('path');
const T = require('./tailfmt');

const REPO = path.resolve(__dirname, '..', '..');
const argv = process.argv.slice(2);
// FLAG SCOPE STOPS AT `--` (2026-08-20). `has()` used to scan the whole argv,
// so `embed.js research/t.js -- --force` disabled the guard AND passed --force
// to the script, and `--check` after the separator put the tool in check mode.
// Everything after `--` belongs to the script, full stop.
const dashdashAt = argv.indexOf('--');
const toolArgv = dashdashAt === -1 ? argv : argv.slice(0, dashdashAt);
const has = (n) => toolArgv.includes('--' + n);
const optOf = (n, d) => { const i = toolArgv.indexOf('--' + n); return i === -1 ? d : toolArgv[i + 1]; };

const CHECK = has('check');
const TIMEOUT_GIVEN = optOf('timeout', null);
let TIMEOUT = Number(TIMEOUT_GIVEN === null ? 120 : TIMEOUT_GIVEN) * 1000;

// STREAMS. `embed.js` recorded stdout only until 2026-08-19, and attack 8
// measured that as the single dominant blocker in the migration: 35 scripts
// here write their progress with `process.stderr.write`, legacy tails were
// pasted from the merged terminal stream, and so those tails could never be
// reproduced from stdout alone. Default stays `stdout`, so every tail bound
// before this change still verifies byte for byte. `--streams both` appends
// stderr under a marker and hashes the pair. The fingerprint records WHICH
// mode was used, because a checker that guesses the capture mode is a checker
// that reports false mismatches.
const STREAMS_GIVEN = optOf('streams', null);
let STREAMS = (STREAMS_GIVEN === 'both') ? 'stdout+stderr' : 'stdout';

// ENV and NODE FLAGS. `a3-01` states its own invocation as
// `FOLDS=… node --max-old-space-size=12000 …`. Setting those in the shell and
// embedding would have written a tail whose recorded `invocation` is false, so
// attack 8 correctly refused to do it. They are first-class and appear in
// the recorded invocation verbatim.
let ENVS = [];
for (let i = 0; i < toolArgv.length; i++) if (toolArgv[i] === '--env' && toolArgv[i + 1]) ENVS.push(toolArgv[i + 1]);
let NODE_FLAGS = [];
for (let i = 0; i < toolArgv.length; i++) if (toolArgv[i] === '--node-flag' && toolArgv[i + 1]) NODE_FLAGS.push(toolArgv[i + 1]);
let scriptArgs = dashdashAt === -1 ? [] : argv.slice(dashdashAt + 1);
const VALUED = new Set(['--timeout', '--streams', '--env', '--node-flag', '--tail']);
const positional = toolArgv
  .filter((a, i, arr) => !a.startsWith('--') && (i === 0 || !VALUED.has(arr[i - 1])));

if (!positional.length) {
  console.error('usage: node research/qc/embed.js [--check] [--timeout s] [--tail n] research/<file>.js [-- args]');
  process.exit(2);
}

const rel = positional[0].replace(/^\.\//, '');
const abs = path.resolve(REPO, rel);
const src = fs.readFileSync(abs, 'utf8');
const tails = T.locateAll(src);

if (!tails.length) {
  // LOUD, ON BOTH STREAMS, WITH ITS OWN EXIT CODE (2026-08-20). The refusal
  // used to go to stderr only, so an operator capturing stdout saw a
  // successful embed and this refusal as the same empty string; and exit 2 was
  // shared with the usage error, so the code alone could not say which
  // happened. 37 scripts in research/ carry no banner at all and are invisible
  // to every custody instrument — `embed-backlog` now counts them.
  const msg = [
    `${rel}: NO OUTPUT BANNER — nothing was run and nothing was written.`,
    'This script is OUTSIDE output custody entirely. Add a banner, then re-run:',
    '  // ============================================================',
    '  // OUTPUT',
    '  // ============================================================',
    '  // ============================================================',
    '  // READINGS',
  ].join('\n');
  console.log(msg);
  console.error(msg);
  process.exit(4);
}

// MULTI-TAIL FILES (2026-08-20). A declared composite carries one tail per
// run. Binding without saying which would replace one run's block with
// another's, which is exactly what happened to natal-cap-36-skeleton-door.js.
const TAIL_OPT = optOf('tail', null);
let loc;
if (tails.length > 1) {
  if (TAIL_OPT === null) {
    console.error(`${rel}: ${tails.length} OUTPUT tails. Say which with --tail <n>:`);
    tails.forEach((t, i) => console.error(`  --tail ${i + 1}   line ${t.outHead + 1}: ${t.lines[t.outHead].trim().slice(0, 90)}`));
    process.exit(6);
  }
  loc = tails[Number(TAIL_OPT) - 1];
  if (!loc) { console.error(`${rel}: --tail ${TAIL_OPT} out of range (1..${tails.length})`); process.exit(2); }
} else {
  loc = tails[0];
}

// For a multi-tail file the CODE is what sits above the FIRST tail, so every
// tail's code-sha256 covers the same bytes. For a single tail this is the
// historic definition unchanged.
const head = tails.length > 1 ? T.headTextAll(src) : T.headText(src);
const codeHash = T.sha(head);
const fpHere = T.fingerprintOf(loc);

// --- static inputs -----------------------------------------------------------
// `code-sha256` covers one file's bytes; 20 bound scripts read something
// outside their own source, five of them a file with no custody of its own
// (verify-the-verifier-embeds.md §5). The cheap static half: resolve
// `require('./…')` targets and literal readFileSync/readdirSync paths out of
// the code, hash each at bind time, and compare them statically on --check.
// Computed paths (shard functions, worker temp files) stay outside — that
// limit is stated rather than papered over.
function staticInputs(headText) {
  const found = new Map();   // repo-relative -> sha12
  const scriptDir = path.dirname(abs);
  const tryAdd = (p) => {
    if (!p.startsWith(REPO + path.sep)) return;
    if (p === abs || !fs.existsSync(p)) return;
    const st = fs.statSync(p);
    const content = st.isDirectory()
      ? fs.readdirSync(p).sort().join('\n')
      : fs.readFileSync(p);
    found.set(path.relative(REPO, p), T.sha(String(content)).slice(0, 12));
  };
  for (const m of headText.matchAll(/require\(\s*['"](\.\.?\/[^'"]+)['"]\s*\)/g)) {
    let p = path.resolve(scriptDir, m[1]);
    if (!/\.[A-Za-z0-9]+$/.test(p)) p += '.js';
    tryAdd(p);
  }
  for (const m of headText.matchAll(/(?:readFileSync|readdirSync|statSync)\s*\([^)\n]*?['"]([^'"\n]+)['"]/g)) {
    const lit = m[1];
    if (!/[\w.]/.test(lit) || /^(utf-?8|ascii|binary|hex|base64)$/i.test(lit)) continue;
    for (const base of [scriptDir, REPO]) {
      const p = path.resolve(base, lit);
      if (fs.existsSync(p)) { tryAdd(p); break; }
    }
  }
  return found;
}

// --- ambient environment guard ----------------------------------------------
// The child inherits the whole ambient environment and only --env pairs reach
// the recorded invocation. A bind performed with a stray DEEP=1 in the shell
// writes a tail whose recorded invocation cannot reproduce it, permanently and
// invisibly (verify-the-verifier-embeds.md §4.1). So: every environment
// variable the code reads that is SET in this shell must be declared with
// --env, or the bind refuses. Ubiquitous shell variables are exempt.
const ENV_EXEMPT = new Set(['HOME', 'PATH', 'USER', 'TMPDIR', 'PWD', 'SHELL',
  'LANG', 'TERM', 'LOGNAME', 'OLDPWD', 'SHLVL', 'EDITOR']);
function ambientCollisions(envPairs) {
  const declared = new Set(envPairs.map(kv => kv.split('=')[0]));
  const reads = new Set();
  for (const m of head.matchAll(/process\.env\.([A-Z][A-Z0-9_]*)/g)) reads.add(m[1]);
  for (const m of head.matchAll(/process\.env\[['"]([A-Z][A-Z0-9_]*)['"]\]/g)) reads.add(m[1]);
  return [...reads].filter(n => !ENV_EXEMPT.has(n) && !declared.has(n)
    && process.env[n] !== undefined).sort();
}

// --- recorded invocation ------------------------------------------------------
function parseInvocation(inv) {
  const toks = String(inv || '').trim().split(/\s+/).filter(Boolean);
  const envs = [], nodeFlags = [], args = [];
  let i = 0;
  while (i < toks.length && /^[A-Z][A-Z0-9_]*=/.test(toks[i])) envs.push(toks[i++]);
  if (toks[i] === 'node') i++;
  while (i < toks.length && toks[i].startsWith('-')) nodeFlags.push(toks[i++]);
  if (i < toks.length) i++;                      // the script path itself
  while (i < toks.length) args.push(toks[i++]);
  return { envs, nodeFlags, args };
}

// --- run helper --------------------------------------------------------------
const STDERR_MARK = '───── stderr ─────';
function runScript(envs, nodeFlags, args) {
  const childEnv = Object.assign({}, process.env);
  for (const kv of envs) { const i = kv.indexOf('='); if (i > 0) childEnv[kv.slice(0, i)] = kv.slice(i + 1); }
  const started = Date.now();
  let stdout = '', stderr = '', failed = null;
  try {
    const r = require('child_process').spawnSync('node', [...nodeFlags, rel, ...args], {
      cwd: REPO, timeout: TIMEOUT, maxBuffer: 512 * 1024 * 1024,
      encoding: 'utf8', env: childEnv, stdio: ['ignore', 'pipe', 'pipe'],
    });
    stdout = r.stdout || '';
    stderr = r.stderr || '';
    if (r.error) failed = (r.error.code === 'ETIMEDOUT') ? `timed out after ${TIMEOUT / 1000}s` : String(r.error.message).split('\n')[0];
    else if (r.status !== 0) failed = `exited with status ${r.status}`;
  } catch (e) {
    stdout = e.stdout || '';
    failed = String(e.message).split('\n')[0];
  }
  const elapsed = (Date.now() - started) / 1000;
  const capturedIn = (mode) => (mode === 'stdout+stderr' && stderr.trim())
    ? String(stdout).replace(/\n*$/, '\n') + STDERR_MARK + '\n' + stderr
    : stdout;
  return { stdout, stderr, failed, elapsed, capturedIn };
}

// --- check mode --------------------------------------------------------------
// FOUR VERDICTS: code (static), body (static), inputs (static), run. The
// static three cost microseconds and nothing executed; a hand-edited digit
// inside a bound block, a dependency drift, and a code edit are all visible
// before any run. The run then VERIFIES IN THE MODE AND INVOCATION THE TAIL
// RECORDS: 33 of 198 bound tails record an invocation that is not the bare
// default, and checking them the obvious way manufactured a false DIFFERS —
// a checker that cries wolf on one tail in six is a checker people stop
// running (verify-the-verifier-embeds.md §1.1).
if (CHECK) {
  const fp = fpHere;
  if (!fp) { console.log(`${rel}: LEGACY tail, no fingerprint. Re-embed to bind it.`); process.exit(1); }
  const okCode = fp['code-sha256'] === codeHash;
  const body = T.bodyMatchesRecordedOf(loc, fp);
  console.log(`${rel}`);
  console.log(`  code-sha256  ${okCode ? 'matches' : 'DIFFERS — the code changed since the tail was written'}`);
  console.log(`  body         ${body.ok ? 'matches out-sha256 — the pasted block is bit-honest' : 'DIFFERS — the pasted block does not hash to the recorded out-sha256 (hand-edited, or bound under an older normalize)'}`);

  let okInputs = true;
  if (fp['inputs']) {
    for (const entry of fp['inputs'].split(/\s+/).filter(Boolean)) {
      const [p, h] = entry.split('@');
      const absP = path.join(REPO, p);
      let now = '(missing)';
      if (fs.existsSync(absP)) {
        const st = fs.statSync(absP);
        now = T.sha(String(st.isDirectory() ? fs.readdirSync(absP).sort().join('\n') : fs.readFileSync(absP))).slice(0, 12);
      }
      const same = now === h;
      if (!same) okInputs = false;
      console.log(`  input        ${same ? 'matches' : 'DIFFERS'}  ${p}${same ? '' : `  (recorded ${h}, now ${now})`}`);
    }
  }

  // the recorded invocation drives the run, unless the caller overrode it
  const recInv = parseInvocation(fp['invocation']);
  const overrode = scriptArgs.length || ENVS.length || NODE_FLAGS.length;
  if (overrode) {
    const given = [...ENVS, 'node', ...NODE_FLAGS, rel, ...scriptArgs].join(' ');
    if (given !== (fp['invocation'] || '').trim())
      console.log(`  (NOTE: checking with YOUR invocation, not the recorded one:\n     yours:    ${given}\n     recorded: ${fp['invocation']})`);
  } else {
    ENVS = recInv.envs; NODE_FLAGS = recInv.nodeFlags; scriptArgs = recInv.args;
    if (ENVS.length || NODE_FLAGS.length || scriptArgs.length)
      console.log(`  (re-running the RECORDED invocation: ${fp['invocation']})`);
  }
  const mode = fp['streams'] || 'stdout';
  if (mode !== 'stdout') console.log(`  (verified in the tail's recorded mode: ${mode})`);
  if (fp['node'] && fp['node'] !== process.version)
    console.log(`  (NOTE: tail was bound under node ${fp['node']}, this is ${process.version}: a float-formatting difference would read as a content mismatch)`);
  const amb = ambientCollisions(ENVS);
  if (amb.length)
    console.log(`  (WARNING: ambient environment sets ${amb.join(', ')}, which the script reads and the recorded invocation does not declare — the run below may not be the recorded run)`);
  // a --check must not time out on a tail whose own header prices the run
  if (TIMEOUT_GIVEN === null && fp['elapsed']) {
    const e = parseFloat(fp['elapsed']);
    if (Number.isFinite(e)) TIMEOUT = Math.max(TIMEOUT, Math.ceil(e * 3) * 1000);
  }

  const r = runScript(ENVS, NODE_FLAGS, scriptArgs);
  if (r.failed) {
    console.log(`  run          FAILED (${r.failed}) — static verdicts above still stand`);
    process.exit(1);
  }
  const okOut = fp['out-sha256'] === T.sha(T.normalize(r.capturedIn(mode)));
  console.log(`  out-sha256   ${okOut ? 'matches' : 'DIFFERS — this run does not reproduce the pasted block'}`);

  // the readings advisory, so a --check also says whether the READINGS still
  // quote figures the block contains (the external-ladders-01 class)
  const readings = T.readingsText(src);
  if (readings && readings.trim()) {
    const out = T.outputTextRaw(src) || '';
    const miss = [...T.figures(readings).keys()].filter(t => !T.presentIn(t, out));
    if (miss.length) console.log(`  (advisory: ${miss.length} READINGS figure(s) not in the block: ${miss.slice(0, 6).join(', ')})`);
  }
  process.exit(okCode && body.ok && okInputs && okOut ? 0 : 1);
}

// --- bind mode ---------------------------------------------------------------
const amb = ambientCollisions(ENVS);
if (amb.length) {
  console.error(`${rel}: REFUSING to bind under an ambient environment the tail cannot record.`);
  console.error(`  the code reads ${amb.map(n => 'process.env.' + n).join(', ')} and the shell sets ${amb.length > 1 ? 'them' : 'it'}.`);
  console.error('  A tail bound this way records an invocation that cannot reproduce it — permanently.');
  console.error(`  Either unset ${amb.join(', ')} or declare intent explicitly: --env ${amb[0]}=${process.env[amb[0]]}`);
  process.exit(5);
}

const invocation = [...ENVS, 'node', ...NODE_FLAGS, rel, ...scriptArgs].join(' ');
const r = runScript(ENVS, NODE_FLAGS, scriptArgs);

if (r.failed) {
  console.error(`${rel}: the script did not complete (${r.failed}).`);
  console.error('Nothing was written. A tail is a record of a completed run or it is not a record.');
  process.exit(1);
}

const captured = r.capturedIn(STREAMS);
const norm = T.normalize(captured);
const outHash = T.sha(norm);

// --- the guards ---------------------------------------------------------------
// A pasted tail is evidence. Two guards, one per population, and BOTH leave a
// mark when overridden:
//
// LEGACY (no fingerprint): a hand-pasted block can be the record of a
// SUPERSEDED result; overwriting it with today's run destroys the provenance
// this tool exists to protect. Refuse when any old figure has no source in
// this run; --force overrides and is stamped.
//
// BOUND (fingerprint present): re-embedding used to be the SOFTER path — no
// comparison, no flag, exit 0 (verify-the-verifier-embeds.md §2.1). Now a
// re-embed that CHANGES the block requires --force, and the figures the old
// block carried that this run does not produce are printed first. A re-embed
// that reproduces the recorded out-sha is a no-op refresh and passes.
let forcedNote = null;
{
  const existingRaw = T.outputBodyCandidatesOf(loc);
  const existing = existingRaw.length ? existingRaw[existingRaw.length - 1].text : '';
  const bound = !!fpHere;
  const changed = bound ? (fpHere['out-sha256'] !== outHash) : true;
  if (existing && existing.trim() && changed) {
    const oldFigs = T.figures(existing);
    const gone = [...oldFigs.keys()].filter(t => !T.presentIn(t, norm));
    if (!has('force')) {
      if (!bound && gone.length) {
        console.error(`${rel}: REFUSING to overwrite a legacy tail that does not match this run.`);
        console.error(`  the pasted block carries ${oldFigs.size} figures, ${gone.length} of which this run does not produce`);
        console.error(`  first: ${gone.slice(0, 8).join(', ')}`);
        console.error('  A hand-pasted block can be the record of a SUPERSEDED result, and this');
        console.error('  repository has scripts whose headers say exactly that. Read the header');
        console.error('  banner first. Then either:');
        console.error('    - it is stale evidence worth keeping: quote it into the report or the');
        console.error('      CHANGELOG, then re-run with --force');
        console.error('    - it should never have differed: that is a finding, report it');
        console.error(`    - the run needs arguments: node research/qc/embed.js ${rel} -- <args>`);
        process.exit(3);
      }
      if (bound) {
        console.error(`${rel}: REFUSING to replace a BOUND tail with a run that changes it.`);
        console.error(`  recorded out-sha256 ${fpHere['out-sha256'].slice(0, 16)}…, this run ${outHash.slice(0, 16)}…`);
        if (gone.length) {
          console.error(`  ${gone.length} of the block's ${oldFigs.size} figures have no source in this run; first: ${gone.slice(0, 8).join(', ')}`);
        } else {
          console.error('  every old figure reproduces; the difference is elsewhere (ordering, prose, volatile shapes)');
        }
        console.error('  If the change is intended (code was corrected, invocation changed), re-run with --force.');
        console.error('  The override is stamped into the fingerprint.');
        process.exit(3);
      }
    } else if (gone.length || bound) {
      forcedNote = `${new Date().toISOString().slice(0, 10)}, ${gone.length} of ${oldFigs.size} figures in the replaced block not reproduced`
        + (gone.length ? ` (first: ${gone.slice(0, 4).join(', ')})` : '');
    }
  }
}

// --- write it ---------------------------------------------------------------
// The BODY is the run's real output, verbatim, because a reader has to be able
// to read it. The HASH is over the normalised form, because elapsed times move.
const rule = '// ' + '='.repeat(76);
const body = String(captured).replace(/\r\n/g, '\n').replace(/\n+$/, '')
  .split('\n').map(l => (l ? '// ' + l.replace(/\s+$/, '') : '//'));
const inputs = staticInputs(head);
const header = [
  rule,
  '// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:',
  `//   node research/qc/embed.js${STREAMS === 'stdout+stderr' ? ' --streams both' : ''}` +
    `${ENVS.map(e => ' --env ' + e).join('')}${NODE_FLAGS.map(f => ' --node-flag ' + f).join('')}` +
    `${tails.length > 1 ? ' --tail ' + TAIL_OPT : ''}` +
    ` ${rel}${scriptArgs.length ? ' -- ' + scriptArgs.join(' ') : ''}`,
  `//   invocation:  ${invocation}`,
  `//   code-sha256: ${codeHash}`,
  `//   out-sha256:  ${outHash}`,
  `//   body-lines:  ${body.length}`,
  ...(inputs.size ? [`//   inputs:      ${[...inputs.entries()].map(([p, h]) => p + '@' + h).join(' ')}`] : []),
  ...(forcedNote ? [`//   forced:      ${forcedNote}`] : []),
  `//   streams:     ${STREAMS}`,
  `//   node:        ${process.version}`,
  `//   embedded:    ${new Date().toISOString().slice(0, 10)}`,
  `//   elapsed:     ${r.elapsed.toFixed(1)} s`,
  rule,
];

// Everything from the tail's READINGS banner onward is preserved; the tail's
// closing rule is emitted UNCONDITIONALLY, because attributing the body's own
// last rule line to the header is how attack-growth-law.js lost a line to the
// writer/reader clash (verify-the-verifier-embeds.md §1.5).
const lines = loc.lines;
const before = lines.slice(0, loc.tailStart);
let after;
if (loc.readStart !== -1) {
  after = [rule, ...lines.slice(loc.readStart)];
} else if (loc.limitEnd < lines.length) {
  // multi-tail: this tail has no READINGS; the next tail must survive
  after = [rule, '// READINGS', '//', ...lines.slice(loc.limitEnd)];
} else {
  after = [rule, '// READINGS', '//'];
}
const out = [...before, ...header, ...body, ...after].join('\n');

fs.writeFileSync(abs, out.replace(/\n*$/, '\n'));

console.log(`embedded ${rel}${tails.length > 1 ? ` (tail ${TAIL_OPT} of ${tails.length})` : ''}`);
console.log(`  invocation   ${invocation}`);
console.log(`  ${body.length} lines of output, ${r.elapsed.toFixed(1)} s`);
console.log(`  code-sha256  ${codeHash.slice(0, 16)}…`);
console.log(`  out-sha256   ${outHash.slice(0, 16)}…${fpHere && fpHere['out-sha256'] !== outHash ? '   (CHANGED from the previous embed)' : ''}`);
if (inputs.size) console.log(`  inputs       ${inputs.size} static dependenc${inputs.size === 1 ? 'y' : 'ies'} hashed`);
if (forcedNote) console.log(`  forced       ${forcedNote}`);
if (T.readingsText(src)) {
  const rf = T.figures(T.readingsText(src));
  const miss = [...rf.keys()].filter(t => !T.presentIn(t, norm));
  if (miss.length) {
    console.log(`\n  ${miss.length} figure(s) in the existing READINGS are not in this output:`);
    for (const m of miss.slice(0, 8)) console.log(`    ${m}`);
    console.log('  Re-read the readings against the block that is now there.');
  }
}
