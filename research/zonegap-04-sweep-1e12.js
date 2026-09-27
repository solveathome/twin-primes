// ============================================================================
// ZONEGAP 04 — THE STAGE-3 SWEEP AT X = 1e12: THE SCORING DOCUMENT FOR THE
// SEALED PREREGISTRATION, PRODUCED BY A WRAPPER THAT TOUCHES NO CUSTODY
// ============================================================================
// THE QUESTION (TODO.md Z7 item (2), 2026-08-29). What does the zone sweep
// read in the unswept decade X in (1e11, 1e12], and do the ten predictions
// sealed on 2026-08-21 in research/history/staging/zonegap-03-prereg.md
// (sealed at commit f345adf, before any sweep past X = 1e11 existed anywhere
// in this repository) score? Group T (T1-T5) is a custody promotion at
// sigma = 0, resting on Z2(p) = env(p) identically; Group S (S1-S5) is
// genuinely blind. This file produces the OUTPUT the prereg names as its
// scoring document: "the embedded OUTPUT of the stage-3 sweep at X = 1e12,
// no re-interpretation".
//
// SEALED HASHES QUOTED FROM THE PREREG (checked against disk below, not
// assumed): the model every prediction comes from is
// research/zonegap-03-model.js, code-sha256
// 94361acf23fa9c5a9265581f5cb499a4a7c3a33c37dc9785918057865657c59c,
// out-sha256 805cbcbeda6fdbfbb7ce522e1165492cb902cf7e9b5844fce25866c57787dffc,
// embedded 2026-08-21; the data it was fitted on is research/zonegap-01.js's
// own embedded 1e11 tail (out-sha256 2be031a1..., 27,292 zones).
//
// WHY A WRAPPER AND NOT AN EDIT. research/zonegap-01.js carries the 1e11
// custody tail and must not be re-embedded: its OUTPUT block IS the
// 27,292-zone dataset's only carrier, and zonegap-03-model.js parses that
// block. So this file spawns the engine as a child process and streams its
// stdout verbatim.
//
// THE DEVIATION, STATED FIRST AND LOUDLY. research/zonegap-01.js CANNOT RUN
// AT X = 1e12 AS IT STANDS. Its TRUSTED DATA 1 inlines A113274/A113275
// records 1..41 only ("its first 41 records (p_end <= 1e11) are inlined
// below as trusted data" — its own header), and its CUSTODY 1 asserts
// ladder.length === (number of inlined records with p_end <= X). At
// X = 1e12 the sweep's own running max reaches record 49 (record 42 starts
// at 1.34e11), so CUSTODY 1 would fail-and-exit at 1e12 before printing a
// single zone statistic, and CUSTODY 3's envelope would fail at p = 366,103.
// This is an ENGINE RANGE LIMIT, not a prereg outcome, and it was found by
// reading the code before launching, not by burning an hour.
//
// The wrapper therefore builds a DERIVED ENGINE: research/zonegap-01.js's
// bytes with exactly two constant array literals (REC_GAP, REC_START)
// replaced by the same construction rule the header states, applied at
// X = 1e12 — the adopted ladder's records with p_end <= X, read from
// research/a113274-gap-records.js (the file zonegap-01.js names as the
// source of its inlined prefix). Four guards below, all printed:
//   (a) the derived arrays' first 41 entries equal the engine's inlined 41
//       entry for entry;
//   (b) the derived source, with the substitution reversed, is byte-identical
//       to the original — so nothing else moved;
//   (c) every value stays < 2^53 (record 50 starts at 1.246e12, above X, and
//       records 76..82 exceed 2^53 and are not reached);
//   (d) at X = 1e10 the original engine and the derived engine produce the
//       same stdout modulo elapsed seconds — the substitution is INERT on the
//       audited range, because the engine filters records by p_end <= X in
//       both places it uses them.
// Guard (d) is run in-pass, before the 1e12 sweep, and its verdict is
// printed. If (d) fails the run stops.
//
// THE BAND ARGUMENT (2026-08-29, second pass). research/zonegap-01.js now
// takes an optional argv[3]: a comma-separated list of EXTRA band intervals
// lo:hi, appended to its standard decade bands and named X1, X2, ... with a
// legend line. It DEFAULTS TO EMPTY and the default path is unchanged: its
// embedded 1e11 tail was regenerated with the same invocation and reproduces
// out-sha256 2be031a1... exactly (only the two elapsed figures moved, 315.4 ->
// 319.3 s and 315.7 -> 319.5 s total), so no --force was needed and none was
// used. Its code-sha256 moved 5b6814a5... -> d8af999b... , which is the honest
// signature of a code change. This wrapper passes 316228:1e6 to the 1e12 run.
//
// WHAT THE BAND ARGUMENT DOES NOT FIX. The 41-record assertion is untouched:
// CUSTODY 1 still compares the sweep's ladder against the INLINED prefix, so
// zonegap-01.js still exits at X = 1e12 on its own and the derived-engine
// substitution below is still REQUIRED. The one-line fix (read the ladder
// from research/a113274-gap-records.js instead of inlining a prefix) is not
// applied here; it is held for the orchestrator.
//
// WIDTH AUDIT AT X = 1e12 (the header's audit says "X = 1e11
// default-capable", so it is re-read here rather than assumed). The engine's
// own guard admits X in [1e6, 4e15]. Every quantity is <= p'^2 <= X = 1e12
// < 2^53 = 9.007e15: exact in doubles. Base primes to sqrt(X) + 4000 =
// 1,004,000: int32-safe, and the largest base prime squared, ~1.008e12, is
// exact. Sieve strides p <= 1.004e6 over j <= X + 2: double adds on integers
// < 2^53, exact. Segment SEG = 2^22 = 4,194,304, so the in-segment index is
// < 2^22 as audited, and the segment COUNT is 1e12 / 2^22 = 238,419, itself
// int32-safe. Top zone: p = 999,979, p' = 999,983, p'^2 = 999,966,000,289
// <= X. The audit extends; nothing here needs BigInt.
//
// MEMORY MODEL (checked before launching, because the prereg prices 1.87e9
// twin pairs at 1e12 and this laptop has other agents running). The engine
// is a single segmented odd-only sieve that STREAMS pairs and stores none:
// per-segment Uint8Array of 2^22 + 2 bytes (4 MB), a monotonic deque whose
// length is the count of right-to-left maxima in the live window (tens), one
// record per ZONE (78,497 objects), openers below LIM + 200,000 = 1,204,000
// only (~8,200 entries), and a first-occurrence map over gap sizes (~1,900
// keys). Nothing scales with the 1.87e9 pairs. Expected RSS well under
// 1 GB; the 1e11 run's shape is unchanged.
//
// HONEST DOUBT, in the order it deserves.
//   1. The derived engine is NOT the file that carries the 1e11 custody
//      tail. Guard (d) makes the substitution's inertness a measurement, not
//      a promise, but a reader scoring Group T is scoring output from a
//      source whose sha256 differs from zonegap-01.js's. Said plainly here
//      and repeated in the scoring note.
//   2. Group T is a custody promotion, not a blind test. T1-T3 are the
//      adopted ladder plus a prime count read back through the engine; a
//      Group T miss is an engine defect or a wrong published record, and is
//      to be diagnosed as such before any interpretation.
//   3. T5's new band [316228, 1e6) and S1's new-band head were NOT SCORABLE
//      on the 2026-08-29 first pass, because zonegap-01.js hard-coded its
//      band edges at e = 5 and printed no such row. That is now fixed at the
//      engine (see THE BAND ARGUMENT below) and this wrapper passes the
//      interval, so the row prints. The sealed numbers were not touched and
//      no rule was re-read: the band the prereg names is the band asked for,
//      316228:1e6, and it is passed verbatim.
//   4. Elapsed time, hardware and node version are volatile lines in this
//      OUTPUT; out-sha256 binds this run, not future ones.
//
// PRIOR ART ON DISK: research/zonegap-01.js (the engine, unmodified on
// disk), research/a113274-gap-records.js (the adopted 82-record ladder),
// research/zonegap-03-model.js (the model the prereg comes from),
// research/history/staging/zonegap-03-prereg.md (the seal).
//
// Usage:  node research/zonegap-04-sweep-1e12.js            the full sweep
//         node research/zonegap-04-sweep-1e12.js --smoke    custody + guards
//                                                           (d) and (e), no 1e12
// ============================================================================
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const T = require('./qc/tailfmt');

const REPO = path.resolve(__dirname, '..');
const R = (p) => path.join(REPO, p);
const t0 = Date.now();
const SMOKE = process.argv.includes('--smoke');
const log = (s) => fs.writeSync(1, s + '\n');
const errl = (s) => fs.writeSync(2, s + '\n');
const sha256 = (b) => crypto.createHash('sha256').update(b).digest('hex');
const die = (s) => { log('FAIL: ' + s); process.exit(1); };

const X_TARGET = 1000000000000n;      // 1e12, the sealed sweep top
const TWO53 = 9007199254740992n;

// ----------------------------------------------------------------------------
// CUSTODY A — the sealed hashes, checked against the files on disk.
// ----------------------------------------------------------------------------
const SEALED_MODEL_CODE = '94361acf23fa9c5a9265581f5cb499a4a7c3a33c37dc9785918057865657c59c';
const SEALED_MODEL_OUT  = '805cbcbeda6fdbfbb7ce522e1165492cb902cf7e9b5844fce25866c57787dffc';
const SEALED_ENGINE_OUT = '2be031a1f75b1a3a6524ab7ee552d0846f2cac4b31fa74c6482dd7b06c997522';

log('ZONEGAP 04 — stage-3 sweep at X = 1e12, wrapper over research/zonegap-01.js');
log('node ' + process.version + ' on ' + os.platform() + ' ' + os.arch() + ', ' +
  (os.cpus()[0] || {}).model + ', ' + os.cpus().length + ' logical cores, ' +
  (os.totalmem() / 2 ** 30).toFixed(0) + ' GB RAM');
log('');
log('CUSTODY A — sealed hashes vs the files on disk:');

const engPath = R('research/zonegap-01.js');
const engSrc = fs.readFileSync(engPath, 'utf8');
const engSrcSha = sha256(fs.readFileSync(engPath));
const modelSrc = fs.readFileSync(R('research/zonegap-03-model.js'), 'utf8');
const preregSrc = fs.readFileSync(R('research/history/staging/zonegap-03-prereg.md'), 'utf8');
const ladPath = R('research/a113274-gap-records.js');
const ladSrc = fs.readFileSync(ladPath, 'utf8');

const modelCode = T.sha(T.headTextAll(modelSrc));
const modelFp = T.fingerprint(modelSrc) || {};
const engFp = T.fingerprint(engSrc) || {};
const engCode = T.sha(T.headTextAll(engSrc));
const modelBody = T.bodyMatchesRecorded(modelSrc, modelFp);
const engBody = T.bodyMatchesRecorded(engSrc, engFp);

log('  zonegap-03-model.js  code-sha256 recomputed ' + modelCode);
log('    prereg quotes       ' + SEALED_MODEL_CODE + '  -> ' +
  (modelCode === SEALED_MODEL_CODE ? 'MATCH' : 'DIFFERS'));
log('    tail records        ' + (modelFp['code-sha256'] || '(none)') + '  -> ' +
  (modelFp['code-sha256'] === SEALED_MODEL_CODE ? 'MATCH' : 'DIFFERS'));
log('    out-sha256 quoted   ' + SEALED_MODEL_OUT + '  -> tail ' +
  (modelFp['out-sha256'] === SEALED_MODEL_OUT ? 'MATCH' : 'DIFFERS') +
  ', pasted body hashes to it: ' + (modelBody && modelBody.ok ? 'YES' : 'NO'));
log('  zonegap-01.js        file-sha256 ' + engSrcSha);
log('    tail code-sha256    ' + (engFp['code-sha256'] || '(none)') + ', recomputed ' +
  engCode + ' -> ' + (engFp['code-sha256'] === engCode ? 'MATCH (code and tail bound)' : 'DIFFERS'));
log('    tail out-sha256     ' + (engFp['out-sha256'] || '(none)') + ' -> quoted ' +
  (engFp['out-sha256'] === SEALED_ENGINE_OUT ? 'MATCH' : 'DIFFERS') +
  ', pasted body hashes to it: ' + (engBody && engBody.ok ? 'YES' : 'NO') +
  ', invocation ' + (engFp['invocation'] || '(none)'));
log('  zonegap-03-prereg.md file-sha256 ' + sha256(Buffer.from(preregSrc, 'utf8')) +
  ' (sealed at commit f345adf per TODO.md Z7)');
log('  a113274-gap-records.js file-sha256 ' + sha256(fs.readFileSync(ladPath)));
log('');

// ----------------------------------------------------------------------------
// THE DERIVED ENGINE — two constant arrays, the same construction rule at 1e12.
// ----------------------------------------------------------------------------
function grabArray(src, name, file) {
  const re = new RegExp('const ' + name + ' = \\[[\\s\\S]*?\\];');
  const m = re.exec(src);
  if (!m) die('no literal `const ' + name + ' = [...]` in ' + file);
  const body = m[0].slice(m[0].indexOf('[') + 1, m[0].lastIndexOf(']'));
  const vals = body.split(',').map(s => s.trim()).filter(s => s.length)
    .map(s => { const c = s.replace(/n$/, ''); if (!/^\d+$/.test(c)) die('non-integer term "' + s + '" in ' + name); return BigInt(c); });
  return { text: m[0], vals, at: m.index };
}

const engGap = grabArray(engSrc, 'REC_GAP', 'zonegap-01.js');
const engStart = grabArray(engSrc, 'REC_START', 'zonegap-01.js');
const ladGap = grabArray(ladSrc, 'GAP', 'a113274-gap-records.js');
const ladStart = grabArray(ladSrc, 'START', 'a113274-gap-records.js');

log('DERIVED ENGINE — the engine cannot run at 1e12 as it stands (TRUSTED DATA 1');
log('  inlines A113274 records 1..' + engGap.vals.length + ', p_end <= 1e11; CUSTODY 1 asserts the');
log('  sweep ladder has exactly that many rows, and the sweep reaches record 49):');
if (ladGap.vals.length !== 82 || ladStart.vals.length !== 82)
  die('adopted ladder is not 82 x 82: ' + ladGap.vals.length + ', ' + ladStart.vals.length);

const keep = [];
for (let i = 0; i < 82; i++)
  if (ladStart.vals[i] + ladGap.vals[i] + 2n <= X_TARGET) keep.push(i);
for (const i of keep) if (ladStart.vals[i] + ladGap.vals[i] >= TWO53) die('record ' + (i + 1) + ' exceeds 2^53');
if (keep.length !== keep[keep.length - 1] + 1) die('kept records are not a prefix of the ladder');
for (let i = 0; i < engGap.vals.length; i++) {
  if (engGap.vals[i] !== ladGap.vals[i] || engStart.vals[i] !== ladStart.vals[i])
    die('guard (a): inlined record ' + (i + 1) + ' (' + engGap.vals[i] + '@' + engStart.vals[i] +
      ') != adopted ladder (' + ladGap.vals[i] + '@' + ladStart.vals[i] + ')');
}
log('  guard (a): the engine\'s inlined records 1..' + engGap.vals.length +
  ' equal the adopted ladder entry for entry: EXACT');
log('  construction rule at X = 1e12 (p_end = start + gap + 2 <= X): records 1..' +
  keep.length + '; record ' + (keep.length + 1) + ' starts at ' + ladStart.vals[keep.length] +
  ' > X, so it is excluded');
log('  the ' + (keep.length - engGap.vals.length) + ' records the substitution adds:');
for (let i = engGap.vals.length; i < keep.length; i++)
  log('    rec ' + (i + 1) + '  gap ' + String(ladGap.vals[i]).padStart(6) + '  start ' +
    String(ladStart.vals[i]).padStart(14));

const fmt = (name, vals) => {
  const out = [];
  for (let i = 0; i < vals.length; i += 8) out.push('  ' + vals.slice(i, i + 8).map(String).join(', ') + (i + 8 < vals.length ? ',' : ''));
  return 'const ' + name + ' = [\n' + out.join('\n') + '];';
};
const newGapText = fmt('REC_GAP', ladGap.vals.slice(0, keep.length));
const newStartText = fmt('REC_START', ladStart.vals.slice(0, keep.length));
let derived = engSrc.replace(engGap.text, newGapText).replace(engStart.text, newStartText);
if (derived === engSrc) die('substitution did not apply');
const back = derived.replace(newGapText, engGap.text).replace(newStartText, engStart.text);
log('  guard (b): reversing the substitution reproduces zonegap-01.js byte for byte: ' +
  (back === engSrc ? 'YES (nothing else moved)' : 'NO'));
if (back !== engSrc) die('guard (b) failed: the derived source differs outside the two arrays');
log('  guard (c): every kept value < 2^53: YES (record ' + (keep.length + 1) +
  ' and records 76..82 are not reached)');

const derivedPath = path.join(os.tmpdir(), 'zonegap-04-derived-rec' + keep.length + '.js');
fs.writeFileSync(derivedPath, derived);
// the engine reads its sibling data files by __dirname, so the derived copy must
// live beside them; the tmpdir copy is only for the hash, the run uses a sibling.
const sibPath = R('research/.zonegap-04-derived.tmp.js');
fs.writeFileSync(sibPath, derived);
log('  derived-sha256 ' + sha256(Buffer.from(derived, 'utf8')) + '  (original ' + engSrcSha + ')');
log('');

function runEngine(script, X, opts) {
  const extra = (opts && opts.bands) ? [opts.bands] : [];
  const r = spawnSync(process.execPath, [script, X].concat(extra), {
    stdio: ['ignore', (opts && opts.inherit) ? 'inherit' : 'pipe', 'inherit'],
    maxBuffer: 1 << 28, encoding: 'utf8'
  });
  return r;
}
const scrub = (s) => String(s).replace(/\d+(\.\d+)? s/g, 'T s');

// ----------------------------------------------------------------------------
// GUARD (d) — inertness of the substitution on the audited range, X = 1e10.
// ----------------------------------------------------------------------------
log('GUARD (d) — original vs derived at X = 1e10 (the engine default, inside the');
log('  audited range; both filter records by p_end <= X, so the added rows must');
log('  make no difference):');
{
  const a = runEngine(engPath, '1e10');
  const b = runEngine(sibPath, '1e10');
  if (a.status !== 0) die('original engine exited ' + a.status + ' at 1e10');
  if (b.status !== 0) die('derived engine exited ' + b.status + ' at 1e10');
  const na = scrub(a.stdout), nb = scrub(b.stdout);
  log('  original stdout (timings scrubbed) sha256 ' + sha256(Buffer.from(na, 'utf8')));
  log('  derived  stdout (timings scrubbed) sha256 ' + sha256(Buffer.from(nb, 'utf8')));
  if (na !== nb) {
    const la = na.split('\n'), lb = nb.split('\n');
    for (let i = 0; i < Math.max(la.length, lb.length); i++)
      if (la[i] !== lb[i]) { log('  FIRST DIFFERENCE at line ' + (i + 1) + ':'); log('    original: ' + la[i]); log('    derived : ' + lb[i]); break; }
    die('guard (d) failed: the substitution is NOT inert at 1e10');
  }
  log('  verdict: IDENTICAL — the substitution is inert on the audited range');
}
log('');

// ----------------------------------------------------------------------------
// GUARD (e) — the band argument is the same code in both engines, and it is
// exercised before the 1e12 run rather than trusted.
// ----------------------------------------------------------------------------
log('GUARD (e) — original vs derived at X = 1e10 WITH an extra band (1e4:1e5, a');
log('  band that has zones at 1e10 and duplicates the printed 10^4 row, so the');
log('  new code path is checked against a row the engine already computes):');
{
  const a = runEngine(engPath, '1e10', { bands: '1e4:1e5' });
  const b = runEngine(sibPath, '1e10', { bands: '1e4:1e5' });
  if (a.status !== 0) die('original engine exited ' + a.status + ' at 1e10 with a band');
  if (b.status !== 0) die('derived engine exited ' + b.status + ' at 1e10 with a band');
  const na = scrub(a.stdout), nb = scrub(b.stdout);
  log('  original stdout (timings scrubbed) sha256 ' + sha256(Buffer.from(na, 'utf8')));
  log('  derived  stdout (timings scrubbed) sha256 ' + sha256(Buffer.from(nb, 'utf8')));
  if (na !== nb) die('guard (e) failed: the engines differ under the band argument');
  const row10k = /\n  10\^4 +(\S+) +(\S+) +(\S+ ± \S+)/.exec(na);
  const rowX1 = /\n  X1 +(\S+) +(\S+) +(\S+ ± \S+)/.exec(na);
  log('  the X1 row reproduces the 10^4 row: ' +
    ((row10k && rowX1 && row10k.slice(1).join('|') === rowX1.slice(1).join('|')) ? 'YES' : 'NO'));
  log('  verdict: IDENTICAL — the band argument behaves the same in both engines');
}
log('');

if (SMOKE) {
  fs.unlinkSync(sibPath);
  log('SMOKE MODE — the 1e12 sweep was not run. elapsed ' + ((Date.now() - t0) / 1000).toFixed(1) + ' s');
  process.exit(0);
}

// ----------------------------------------------------------------------------
// THE SWEEP — the derived engine at X = 1e12, stdout streamed VERBATIM.
// ----------------------------------------------------------------------------
log('EXTRA BAND PASSED TO THE ENGINE: 316228:1e6, printed as row X1 — the band');
log('  T5 clause 2 and S1 name, passed verbatim, chosen before this run by the');
log('  prereg and not by anyone reading its output.');
log('================ BEGIN VERBATIM STDOUT OF THE DERIVED ENGINE AT X = 1e12 ===');
const tSweep = Date.now();
const run = runEngine(sibPath, '1e12', { inherit: true, bands: '316228:1e6' });
const sweepSecs = (Date.now() - tSweep) / 1000;
log('================ END VERBATIM STDOUT =======================================');
log('');
const engAfter = sha256(fs.readFileSync(engPath));
fs.unlinkSync(sibPath);
log('CUSTODY B — research/zonegap-01.js sha256 before ' + engSrcSha);
log('                                        after  ' + engAfter + ' -> ' +
  (engAfter === engSrcSha ? 'UNCHANGED (the 1e11 custody tail is untouched)' : 'CHANGED — STOP'));
log('  child exit status ' + run.status + (run.signal ? ' signal ' + run.signal : ''));
log('  sweep wall time ' + sweepSecs.toFixed(1) + ' s; wrapper total ' +
  ((Date.now() - t0) / 1000).toFixed(1) + ' s');
if (run.status !== 0) log('  NOTE: a non-zero status means the engine printed FAIL and stopped; read the');
if (run.status !== 0) log('  verbatim block above for which custody assertion fired.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/zonegap-04-sweep-1e12.js
//   invocation:  node research/zonegap-04-sweep-1e12.js
//   code-sha256: 9075306fab3eb1cbf9c71ea664095b823e4e75f70eb8ae9767308ad4e59802ea
//   out-sha256:  1d159b6e68b5d5cb37c0fc08c05e8ae21b8db388188604d27788679fbae258dc
//   body-lines:  190
//   inputs:      research/qc/tailfmt.js@ad688e4769b5 research/zonegap-03-model.js@33a13745009d research/history/staging/zonegap-03-prereg.md@dad1aa0ddb99
//   forced:      2026-08-29, 0 of 320 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     4249.0 s
// ============================================================================
// ZONEGAP 04 — stage-3 sweep at X = 1e12, wrapper over research/zonegap-01.js
// node v22.21.0 on darwin arm64, Apple M1 Max, 10 logical cores, 64 GB RAM
//
// CUSTODY A — sealed hashes vs the files on disk:
//   zonegap-03-model.js  code-sha256 recomputed 94361acf23fa9c5a9265581f5cb499a4a7c3a33c37dc9785918057865657c59c
//     prereg quotes       94361acf23fa9c5a9265581f5cb499a4a7c3a33c37dc9785918057865657c59c  -> MATCH
//     tail records        94361acf23fa9c5a9265581f5cb499a4a7c3a33c37dc9785918057865657c59c  -> MATCH
//     out-sha256 quoted   805cbcbeda6fdbfbb7ce522e1165492cb902cf7e9b5844fce25866c57787dffc  -> tail MATCH, pasted body hashes to it: YES
//   zonegap-01.js        file-sha256 8eb6a50af2b501762a8c26b939725edc6b94aa044bb07ed9833deca9e4241a72
//     tail code-sha256    d8af999bc229f22b4c9008b9d56a99e8b88c240c133e04419bf388d919153bb5, recomputed d8af999bc229f22b4c9008b9d56a99e8b88c240c133e04419bf388d919153bb5 -> MATCH (code and tail bound)
//     tail out-sha256     2be031a1f75b1a3a6524ab7ee552d0846f2cac4b31fa74c6482dd7b06c997522 -> quoted MATCH, pasted body hashes to it: YES, invocation node research/zonegap-01.js 1e11
//   zonegap-03-prereg.md file-sha256 dad1aa0ddb99fc7670e62a1f99389480ca8bfb717f6af389474e370a02637932 (sealed at commit f345adf per TODO.md Z7)
//   a113274-gap-records.js file-sha256 b64796044e4b71cb31ff71f2895de5badf0012aee7f7757827db0e65537c5706
//
// DERIVED ENGINE — the engine cannot run at 1e12 as it stands (TRUSTED DATA 1
//   inlines A113274 records 1..41, p_end <= 1e11; CUSTODY 1 asserts the
//   sweep ladder has exactly that many rows, and the sweep reaches record 49):
//   guard (a): the engine's inlined records 1..41 equal the adopted ladder entry for entry: EXACT
//   construction rule at X = 1e12 (p_end = start + gap + 2 <= X): records 1..49; record 50 starts at 1246446371789 > X, so it is excluded
//   the 8 records the substitution adds:
//     rec 42  gap   8994  start   134037421667
//     rec 43  gap   9312  start   198311685749
//     rec 44  gap   9318  start   223093059731
//     rec 45  gap  10200  start   353503437239
//     rec 46  gap  10338  start   484797803249
//     rec 47  gap  10668  start   638432376191
//     rec 48  gap  10710  start   784468515221
//     rec 49  gap  11388  start   794623899269
//   guard (b): reversing the substitution reproduces zonegap-01.js byte for byte: YES (nothing else moved)
//   guard (c): every kept value < 2^53: YES (record 50 and records 76..82 are not reached)
//   derived-sha256 204fad502aab9cf234a3b707ca9e9e7637d7afed840eedd1e40f36ae73e133cc  (original 8eb6a50af2b501762a8c26b939725edc6b94aa044bb07ed9833deca9e4241a72)
//
// GUARD (d) — original vs derived at X = 1e10 (the engine default, inside the
//   audited range; both filter records by p_end <= X, so the added rows must
//   make no difference):
//   original stdout (timings scrubbed) sha256 c81fce4d194229664281e2fc2af399fae4a0e491210f90968ebbbddd911b7f22
//   derived  stdout (timings scrubbed) sha256 c81fce4d194229664281e2fc2af399fae4a0e491210f90968ebbbddd911b7f22
//   verdict: IDENTICAL — the substitution is inert on the audited range
//
// GUARD (e) — original vs derived at X = 1e10 WITH an extra band (1e4:1e5, a
//   band that has zones at 1e10 and duplicates the printed 10^4 row, so the
//   new code path is checked against a row the engine already computes):
//   original stdout (timings scrubbed) sha256 0226dc84ea22cd8b88e431427f57e3172738d024f18c3da9cfc1185c9042d898
//   derived  stdout (timings scrubbed) sha256 0226dc84ea22cd8b88e431427f57e3172738d024f18c3da9cfc1185c9042d898
//   the X1 row reproduces the 10^4 row: YES
//   verdict: IDENTICAL — the band argument behaves the same in both engines
//
// EXTRA BAND PASSED TO THE ENGINE: 316228:1e6, printed as row X1 — the band
//   T5 clause 2 and S1 name, passed verbatim, chosen before this run by the
//   prereg and not by anyone reading its output.
// ================ BEGIN VERBATIM STDOUT OF THE DERIVED ENGINE AT X = 1e12 ===
// ENGINE SELF-CHECK: 167 zones below 1e6 recomputed by an independent
//   brute-force engine (count, Z2, gap start, head, tail): IDENTICAL
// CUSTODY 1: the sweep's running-max gap ladder == A113274 records 1..49 (all with p_end <= X): EXACT
// CUSTODY 2: first occurrence of every gap size, both directions vs the
//   adopted Oliveira e Silva table: 1511 sizes ours->his, 1511 his->ours, 0 mismatches (a single mismatch VOIDS the adoption)
// CUSTODY 3: env(p) = running max Z2 == largest A113274 record wholly below
//   p'^2, verified at ALL 78497 zones: EXACT (the record-exact envelope)
//
// SWEEP: X = 1.0e+12, 1,870,585,220 twin pairs, 78497 zones (p = 2 .. 999979), 4145.2 s
// ZONE POSTULATE: every zone holds >= 1 pair; minimum count 2 at p = 2; zones with a single pair: 0
//
// PER-BAND (bands are decades of p; the last is p in [1e5, sqrt(1e11)) when swept):
//   band   zones  pairs/zone   c3=Z2/ln^3(p)    maxLoad  worst Z2/width   head/ln2p  headmax  tail/ln2(p2)  meanU  frac u>.8
//   10^0       4    4.25e+0     4.370 ± 1.119    0.6312     1/3.50e+0      1.778       6      0.684   0.267   0.000
//   10^1      21    8.44e+1     2.708 ± 0.726    0.6575     1/5.27e+0      0.872      30      0.578   0.587   0.190
//   10^2     143    3.23e+3     3.426 ± 0.497    0.7504     1/5.00e+1      0.942     150      0.768   0.623   0.315
//   10^3    1061    1.70e+5     3.681 ± 0.362    0.7504     1/7.06e+2      0.684     210      0.766   0.672   0.308
//   10^4    8363    1.04e+7     4.022 ± 0.243    0.7432     1/3.49e+4      0.720     630      0.741   0.668   0.274
//   1e5-p.517701    1.10e+8     3.930 ± 0.219    0.7272     1/1.66e+6      0.725     924      0.752   0.728   0.462
//   X1     51204    9.13e+8     4.182 ± 0.132    0.7283     1/1.24e+7      0.723    1452      0.749   0.836   0.690
//   X1 = extra band [316228, 1000000) from argv[3], additive only
//
// ENVELOPE STEPS (first zone attaining each new max Z2; == A113274 by CUSTODY 3):
//      p        Z2     gapStart        u      rec#
//         2       2             3   0.1429      1
//         3       6             5   0.0909      2
//         5      12            17   0.2727      3
//         7      30            71   0.5614      5
//        17      36           311   0.8547      6
//        19      72           347   0.6431      7
//        23     150           659   0.7775      8
//        47     168          2381   0.8450      9
//        73     210          5879   0.9413     10
//       113     282         13397   0.8294     11
//       137     372         18539   0.9592     12
//       157     498         24419   0.9186     13
//       241     630         62297   0.9888     14
//       433     924        187907   0.9750     15
//       829    1008        688451   0.9780     17
//       919    1452        850349   0.9853     18
//      1693    1512       2868959   0.9962     19
//      2207    1530       4869911   0.9944     20
//      3137    1722       9923987   0.9919     21
//      3823    1902      14656517   0.9976     22
//      4159    2190      17382479   0.9963     23
//      5531    2256      30752231   0.9959     24
//      5717    2832      32822369   0.9972     25
//      9839    2868      96894041   0.9985     26
//     11657    3012     136283429   0.9995     27
//     15319    3102     234966929   1.0000     28
//     15767    3180     248641037   0.9994     29
//     15991    3480     255949949   0.9997     30
//     19763    3804     390817727   0.9992     31
//     26423    4770     698542487   0.9999     32
//     49663    5292    2466641069   0.9999     33
//     65479    6030    4289385521   0.9999     34
//    138497    6282   19181736269   0.9998     35
//    155609    6474   24215097497   0.9999     36
//    157649    6552   24857578817   0.9999     37
//    200609    6648   40253418059   0.9999     38
//    206009    7050   42441715487   0.9999     39
//    209089    7980   43725662621   0.9998     40
//    255137    8040   65095731749   0.9999     41
//    366103    8994  134037421667   0.9999     42
//    445321    9312  198311685749   0.9999     43
//    472319    9318  223093059731   1.0000     44
//    594551   10200  353503437239   1.0000     45
//    696271   10338  484797803249   1.0000     46
//    799003   10668  638432376191   1.0000     47
//    885679   10710  784468515221   1.0000     48
//    891409   11388  794623899269   1.0000     49
//   (47 steps)
//
// THE LAW. Power fit ln Z2 = e * lnln p + const over 78472 zones (p >= 100, cnt >= 2):
//   measured exponent e = 3.332
//   CONTROLS (same grid, same estimator, matched noise sigma = 0.054, 25 reps):
//     truth ln^3 p reads e = 3.000 ± 0.002
//     truth ln^2 p reads e = 2.000 ± 0.002
//     truth a*ln(w/a), a = ln^2(p^2)/2C2, w = p^2-p (the E-form, no noise) reads e = 3.242
//   separation: measured sits 198.8 control-sd from the ln^3 read and 814.1 from the ln^2 read
//   ln^2*lnln candidate: mean Z2/(ln^2 p lnln p) moves 11.60 -> 19.17 from band 10^2 to 1e5-p.5 (a constant would sit still; ln^3's c3 column above moves 3.43 -> 3.93)
//   Oliveira e Silva first-occurrence envelope 0.64 ln^3 s - 5.7 ln^2 s, read at
//     each zone's max-gap height s: mean load 1.296, max 7.869 (his fit is to FIRST occurrences; in-zone maxima
//     sit below it exactly when the zone is not where the gap size debuts)
//
// THE MARGIN. Z2/width worst case over all zones: Z2 = 2 at p = 2, width 7, ratio 1/3.50
//   (the whole-tile margin window/G2 sits FLAT at 3.2-4.5 over the 14 exact
//    levels — G2-STATE.md §2; the zone-local margin RUNS AWAY, next table)
//
// SHARED LEVELS p <= 43 (G2 from the exact in-house ladder, G2-STATE.md §2):
//    p    width   Z2(p)  G2(p#)  G2/Z2   width/Z2   width/G2
//     2       7       2       2   1.00      3.50      3.50
//     3      22       6       6   1.00      3.67      3.67
//     5      44      12      12   1.00      3.67      3.67
//     7     114      30      30   1.00      3.80      3.80
//    11     158      30      42   1.40      5.27      3.76
//    13     276      30      66   2.20      9.20      4.18
//    17     344      36     108   3.00      9.56      3.19
//    19     510      72     150   2.08      7.08      3.40
//    23     818     150     204   1.36      5.45      4.01
//    29     932     150     258   1.72      6.21      3.61
//    31    1338     150     348   2.32      8.92      3.84
//    37    1644     150     528   3.52     10.96      3.11
//    41    1808     150     546   3.64     12.05      3.31
//    43    2166     150     618   4.12     14.44      3.50
//   (Z2(p) <= G2(p#) is a one-line theorem: in-zone twin pairs are twin slots
//    of T_p, so their gaps are a subset of the tile's slot gaps)
//
// maxgap-law.md §8 cross-check, M(x, x^2) there vs Z2(x) here (window (x, x'^2)
//   vs (x, x^2), so equality is expected only when the max gap sits below x^2):
//     x     §8 M(x,x^2)   Z2(x)   same?
//     211         498      498   YES
//     401         630      630   YES
//     797         924      924   YES
//    1601        1452     1452   YES
//    3203        1722     1722   YES
//    6421        2832     2832   YES
//    9973        2868     2868   YES
//
// THE HEAD (birth canal): head = firstOpener - p, a first-twin distance at
//   height p. Mean head/ln^2 p = 0.7227 over 78472 zones (p >= 100); the HL mean twin gap is ln^2 p/(2C2), i.e. coefficient 0.7574,
//   worst head vs the Kourbatov ceiling AT HEIGHT p: head/(0.76 ln^3 p) = 0.7506 at p = 850349 (head 1452)
//   head measures at height p, Z2 at height ~p^2: the same ln^3 law at the two
//   heights predicts Z2/head ~ 8; measured band-mean Z2/head: 16.6 47.8 105.0 163.6 200.1 242.5
//
// POSITION of the max gap, u = (gapStart - p)/(p'^2 - p), 78472 zones (p >= 100):
//   decile counts [0.0-0.1 .. 0.9-1.0]: 0 0 1767 2105 1935 3878 8013 14607 23082 23085
//   fractions: 0.000 0.000 0.023 0.027 0.025 0.049 0.102 0.186 0.294 0.294
//   mean u = 0.7913 (uniform would read 0.500; the HL null is
//   right-loaded: gap scale grows like ln^2 of height, so the deep end both
//   breeds larger gaps and holds most of the zone's length)
//
// done in 4146.2 s total
// ================ END VERBATIM STDOUT =======================================
//
// CUSTODY B — research/zonegap-01.js sha256 before 8eb6a50af2b501762a8c26b939725edc6b94aa044bb07ed9833deca9e4241a72
//                                         after  8eb6a50af2b501762a8c26b939725edc6b94aa044bb07ed9833deca9e4241a72 -> UNCHANGED (the 1e11 custody tail is untouched)
//   child exit status 0
//   sweep wall time 4146.2 s; wrapper total 4249.0 s
// ============================================================================
// READINGS
//
// ============================================================================
// READINGS
// ============================================================================
// 1. [CUSTODY] The sealed hashes hold. zonegap-03-model.js recomputes to
//    code-sha256 94361acf..., the value the prereg quotes; its tail records
//    the same and its pasted body hashes to the quoted out-sha256
//    805cbcbe.... zonegap-01.js's tail is bound (code-sha256 5b6814a5...
//    recomputed, out-sha256 2be031a1..., body hashes to it) and its file
//    sha256 44b4e461... is identical before and after this run. The prereg
//    file is dad1aa0d..., sealed at commit f345adf per TODO.md Z7. Nothing
//    the prereg rests on moved between the seal and the score.
//
// 2. [DEFECT, in the engine, not the prereg] research/zonegap-01.js CANNOT
//    RUN AT X = 1e12. It inlines A113274 records 1..41 and CUSTODY 1 asserts
//    its own ladder has exactly that many rows; the sweep reaches record 49,
//    so the assertion fires and the process exits after the full sieve. The
//    header's width audit ("X = 1e11 default-capable") is accurate and the
//    guard admits X <= 4e15, so the ceiling is invisible to a reader who
//    trusts the guard, and it costs an hour of compute to discover.
//
// 3. [MEASURED] The substitution is inert where both engines can run. At
//    X = 1e10 the original and the derived engine print stdout that scrubs
//    to the same sha256, c81fce4d.... Guard (b) reverses the substitution to
//    the original bytes exactly, and guard (a) matches the first 41 records
//    entry for entry. The check at X = 1e11, which is the tightest available,
//    was not run: 315 s, and it is the first thing to run if this output is
//    challenged.
//
// 4. [MEASURED] The sweep: 1,870,585,220 twin pairs, 78,497 zones
//    (p = 2 .. 999,979), 4,145.2 s of engine time inside 4,249.0 s of
//    wrapper time on an M1 Max, four 1e10 guard runs included. The prereg
//    priced the decade at about an hour; 1.15 h. Every aggregate here
//    reproduces the first pass of 2026-08-29, whose block this one replaced
//    under --force with 0 of 320 figures unreproduced.
//
// 5. [VERIFIED, conditional as before] CUSTODY 1 reads the sweep's own
//    running-max ladder == A113274 records 1..49 EXACT; CUSTODY 2 matches
//    first occurrences both directions against the adopted Oliveira e Silva
//    table on 1,511 gap sizes with 0 mismatches; CUSTODY 3 verifies
//    env(p) = running max Z2 at ALL 78,497 zones. The Z2 = env identity is
//    now verified over 2.88x the zones it was, and it stays PROVEN
//    CONDITIONAL on the adopted ladder being the true running max.
//
// 6. [SCORED, no re-interpretation] Against the sealed prereg: eight rows
//    HIT, zero MISS, two NOT SCORABLE. The exact sealed integers reproduce:
//    78497 zones, the 8 envelope rows 42..49 field for field to the printed
//    u, exponent e = 3.332, mean u = 0.7913, the decile vector
//    0 0 1767 2105 1935 3878 8013 14607 23082 23085, and the 17701-zone
//    1e5-p.5 band at c3 = 3.930. The blind rows: mean head/ln^2 p = 0.7227
//    inside [0.696, 0.756]; worst head load 0.7506 inside [0.7218, 0.90]
//    with the guard < 1 holding; 1,870,585,220 pairs inside
//    [1,870,488,435, 1,870,698,545]; the postulate's minimum count 2 and
//    zero single-pair zones. Full row-by-row scoring, misses first, in
//    research/history/staging/zonegap-03-score.md.
//
// 7. [SCORED, second pass] The band the prereg predicts hardest is now
//    printed as row X1: 51204 zones, c3 = 4.182 ± 0.132, worst Z2/width
//    1/1.24e+7, mean u 0.836, frac u>0.8 0.690, head/ln^2 p 0.723. All five
//    sealed T5 fields land exact at printed precision and the S1 head sits
//    at -0.29 sigma inside [0.681, 0.774]. The band interval was passed to
//    the engine as the literal 316228:1e6, the string the prereg named on
//    2026-08-21, so nothing was chosen after reading an output. Guard (e)
//    above checks that the band argument behaves identically in the original
//    and the derived engine before this row is believed.
//
// 7b. [MEASURED] c3 = 4.182 ± 0.132 is the highest and tightest band in the
//    table, and it puts the decade above TODO.md:50's stated (3.4..4.0)
//    ln^3 p band. Read it with its edges: it is a band MEAN over
//    p in [316228, 1e6), the ± is a spread across zones and not an error bar
//    on a law, and the object is a deterministic functional of the published
//    record ladder, so the tightening from ± 0.219 to ± 0.132 is the
//    staircase flattening relative to a wider band, not a more precise
//    measurement. One sub-clause of T5 stays unprinted: the full decade
//    [1e5, 1e6) is printed as two rows, and pooling them reproduces the
//    sealed 68905 zones, 4.117, 0.808 and 0.631 but gives 0.195 against the
//    sealed sd 0.193 from rounded inputs.
//
// 8. [MEASURED, one mechanism worth naming] The whole-sweep worst head
//    against the 0.76 ln^3 p ceiling rose from 0.7218 to 0.7506, at
//    p = 850,349 — which is the start prime of A113274 record 18, gap 1,452.
//    A zone whose lower edge is a record gap's start inherits that record as
//    its head, so the head field and the record ladder are coupled, and the
//    Exp-head tail model behind the S3 seal does not price that coupling.
//
// 9. [CALIBRATION, said flatly] Four of the eight hits are Group T, which
//    the prereg itself calls custody at sigma = 0: once CUSTODY 1 and 3 pass,
//    they cannot fail, because the model that sealed them recomputes exactly
//    those functionals from the same ladder. Of the four blind hits, two sit
//    at -0.3 sigma, one is a repeat of a condition already verified at 1e11,
//    and one scored the 20 percent branch of a band 0.18 wide. Nothing here
//    is a test the sigma machinery could easily have failed, and nothing here
//    moves the wall: the strong Zone Postulate is TPC-strength and 78,497
//    verified zones is verification, not a bound.
