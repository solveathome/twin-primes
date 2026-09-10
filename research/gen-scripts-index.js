#!/usr/bin/env node
// ============================================================================
// GEN-SCRIPTS-INDEX — the provenance index: every number's birthplace
// ============================================================================
// Chris, 2026-08-17: "we need to be able to point exactly to where our data was
// generated." 129 scripts carry the corpus's entire evidence base and had no
// index; 19 of them were reachable only by `ls`. This generates research/
// SCRIPTS.md from the scripts themselves, so the index cannot drift from them.
//
// It is GENERATED, never hand-edited. Re-run after adding or renaming a script:
//     node research/gen-scripts-index.js
//
// What it extracts per script, all from the house header format (banner line,
// SETTING/question block, pasted OUTPUT, numbered READINGS):
//   - the title from the banner's second line
//   - the companion prose file, where the header names one
//   - the date, where the header carries one
//   - every markdown file that cites the script, by filename or by shorthand
//     (natal-cap-30, cap-30, fold-profile-12, attack-04, a3-05, script 05b)
//   - whether the script carries a CORRECTION or superseded banner, which is
//     load-bearing: those headers are the only guard between a reader and a
//     runnable wrong number, so the index surfaces them rather than hiding them
//   - ORPHAN status: no markdown cites it, so its result is invisible
// ============================================================================

const fs = require('fs');
const path = require('path');

// Discovery comes from qc/corpus.js and never from a second walk of the tree.
// Two tools counting the corpus two ways is the exact defect this framework
// exists to catch, and it happened here first: this generator reported 130
// scripts while qc.js reported 128, because each had its own idea of what counts
// as evidence rather than tooling.
const C = require('./qc/corpus');

const ROOT = C.ROOT;
const RESEARCH = C.RESEARCH;

const scripts = C.scripts.map(p => path.basename(p)).sort();
// Scripts live under research/ AND research/history/staging/ (corpus.js walks
// both); the index keys them by basename, so resolve each to its real path here
// rather than assuming research/. Until 2026-09-05 this file joined RESEARCH
// with the basename and threw ENOENT on the first staging script.
const scriptPath = new Map(C.scripts.map(p => [path.basename(p), p]));

// Links are relative to SCRIPTS.md, including scripts moved into staging.
function localLink(label, file) {
  const target = path.relative(RESEARCH, file).split(path.sep).map(encodeURIComponent).join('/');
  return `[${label}](${target})`;
}
const scriptLink = file => localLink(file, scriptPath.get(file));

// corpus.js already excludes generated files, so no script can appear to cite
// this index.
const mdText = new Map();
for (const m of C.allMarkdown) mdText.set(C.rel(m), C.read(m));

// --- parse one script's header -------------------------------------------
function parse(file) {
  const src = fs.readFileSync(scriptPath.get(file), 'utf8');
  const head = src.split('\n').slice(0, 40).join('\n');

  // Banner title: the first comment line that is not a rule of = signs and not
  // the filename alone.
  let title = null;
  const headLines = src.split('\n').slice(0, 16);
  for (let i = 0; i < headLines.length; i++) {
    const ln = headLines[i];
    if (!/^\s*\/\//.test(ln)) continue;              // comment lines only
    const t = ln.replace(/^\s*\/\/\s?/, '').trim();
    if (!t || /^[=\-*]+$/.test(t)) continue;         // rules
    if (/^['"]use strict/.test(t)) continue;         // pragma, not a title
    if (t.toLowerCase() === file.toLowerCase()) continue;        // filename as banner
    if (t.toLowerCase() === file.replace(/\.js$/, '').toLowerCase()) continue;
    if (/^\*{3}/.test(t)) continue;                  // a correction line, not the title
    title = t;
    // A banner title that WRAPS across two comment lines was silently cut here,
    // with no ellipsis and nothing to tell a reader the title was incomplete:
    // natal-cap-30's old banner ended "the calm's leg (iii) closed" and lost
    // "at every computed level" entirely. Found 2026-08-17, after two drafts
    // reproduced the truncated form believing it was the real title.
    //
    // The join is deliberately narrow: the line before it must not end a
    // sentence, and the continuation must not open the way a NEW line opens.
    // A provenance line starts with "(", and a fresh sentence starts with a
    // capital, so a continuation is what starts with anything else. That covers
    // both real shapes in this corpus, the lower-case "at every computed level"
    // and natal-cap-36's "⌈W/q⌉ mod 30 over the scour primes".
    // A title ending in a dangling function word is incomplete whatever the next
    // line looks like, which is the only safe way to catch a continuation that
    // begins with a proper noun: h2-prototype's banner breaks after "Ziller and"
    // and resumes at "Morack", indistinguishable from a new sentence by shape
    // alone.
    const dangling = /\b(and|or|of|the|a|an|to|for|from|with|its|whose|what|that|in|on|at|by)$/i.test(title);
    if (!/[.!?]$/.test(title)) {
      const next = headLines[i + 1];
      if (next && /^\s*\/\//.test(next)) {
        const n = next.replace(/^\s*\/\/\s?/, '').trim();
        const continues = !/^[=\-*]+$/.test(n) && !/^[(\[]/.test(n) && !/^\*{3}/.test(n)
          && (dangling || !/^[A-Z]/.test(n));
        if (n && continues) title += ' ' + n;
      }
    }
    break;
  }
  // Strip only a trailing parenthetical that is provenance chatter (a date or a
  // companion .md), never one that is part of the mathematics, e.g. K*(23).
  if (title) {
    title = title.replace(/\s*\((?=[^)]*(?:20\d\d-\d\d-\d\d|\.md))[^)]*\)?\s*$/, '').trim();
    title = title.replace(/[:\-–,]\s*$/, '').trim();
  }
  if (!title) title = '(no banner title)';
  // A header sentence is not a title. Cut at the first clause break and cap it,
  // so the table stays scannable.
  if (title.length > 96) title = title.slice(0, 93).replace(/\s+\S*$/, '') + '…';

  // Companion prose, where named.
  let companion = null;
  const cm = /([A-Za-z0-9._-]+\.md)/.exec(head);
  if (cm && fs.existsSync(path.join(RESEARCH, cm[1]))) companion = 'research/' + cm[1];

  // Date, where present.
  const dm = /(20\d\d-\d\d-\d\d)/.exec(head);
  const date = dm ? dm[1] : null;

  // Correction / superseded banner: load-bearing, must be surfaced.
  const corrected = /CORRECTION|SUPERSED|NOT a valid|⚠|WRONG/i.test(head);

  // ...and the same notice sitting BELOW the header, which until 2026-08-20 the
  // index could not see at all. The corpus's worst known numeric defect,
  // a3-03-f-from-census.js, banners itself at line 600 with the word DEFECT:
  // past the 40-line head window, and in a word this pattern did not carry. So
  // the file the warning table exists for was the one file it omitted.
  // The markers below are deliberately CASE-SENSITIVE and upper-case. A
  // case-insensitive whole-file scan matches 148 of the 238 scripts, because
  // ordinary prose says "wrong" and "corrected"; the upper-case forms are
  // written on purpose, as banners are.
  const belowHead = src.split('\n').slice(40);
  const MARK = /⚠|\bDEFECT(?:IVE)?\b|\bCORRECTION\b|\bCORRECTED\b|\bSUPERSEDED\b/;
  let correctedBelowAt = 0;
  for (let i = 0; i < belowHead.length; i++)
    if (MARK.test(belowHead[i])) { correctedBelowAt = i + 41; break; }
  const correctedBelow = !corrected && correctedBelowAt > 0;

  // Line count and whether it carries pasted OUTPUT and READINGS.
  const lines = src.split('\n').length;
  const hasOutput = /^\s*\/\/\s*(===|---)?\s*(OUTPUT|RESULT)/im.test(src) || /^\/\/ [a-z]?p?=?\d/im.test(src);
  const hasReadings = /READINGS?/i.test(src);

  return { file, title, companion, date, corrected, correctedBelow, correctedBelowAt, lines, hasOutput, hasReadings };
}

// --- who cites this script? ----------------------------------------------
function citations(file) {
  const base = file.replace(/\.js$/, '');
  // shorthands: natal-cap-30-skeleton-bound -> natal-cap-30, cap-30
  const m = /^((?:natal-cap|fold-profile|attack|a3|localized)-(\d+))/.exec(base);
  const pats = [file, base];
  if (m) {
    pats.push(m[1]);
    if (m[1].startsWith('natal-cap-')) pats.push('cap-' + m[2]);
  }
  const hits = new Set();
  for (const [rel, text] of mdText) {
    for (const p of pats) {
      if (text.includes(p)) { hits.add(rel); break; }
    }
  }
  return [...hits].sort();
}

// --- family grouping -----------------------------------------------------
function family(file) {
  const m = /^(natal-cap|fold-profile|attack|a3|localized|maxgap|theta|level-ledger|origin|gate|discrepancy|exponent|window|sift|covering|dhr|h2|two-class|oeis)/.exec(file);
  if (!m) return 'other';
  return m[1];
}

const rows = scripts.map(f => ({ ...parse(f), cites: citations(f), family: family(f) }));

// --- emit ----------------------------------------------------------------
const out = [];
out.push('# SCRIPTS: the provenance index');
out.push('');
out.push('**GENERATED FILE. Do not hand-edit.** Regenerate with');
out.push('`node research/gen-scripts-index.js` after adding or renaming a script.');
out.push('');
out.push('Use this index to locate experiments, reusable routines and citing documents.');
out.push('Script links resolve to their actual locations, including `history/staging/`.');
out.push('Titles and companion names come from script headers; citations are filename');
out.push('or shorthand matches, not verified endorsements. Inclusion is not a proof grade');
out.push('or an execution assignment. Read the owning argument before reusing a claim.');
out.push('');
out.push('**Before quoting or running a script:** read its correction notices, invocation');
out.push('and input dependencies. Use [qc/embed.js](qc/embed.js) to record output;');
out.push('`qc.js embeds` checks its code binding, and `qc/tails.js` reruns and compares.');
out.push('Hashes check output custody, not mathematical correctness. Missing fingerprints');
out.push('are tracked by the `embed-backlog` advisory. The mechanism and its limits are');
out.push('documented in [qc/README.md](qc/README.md).');
out.push('');

const orphans = rows.filter(r => r.cites.length === 0);
const corrected = rows.filter(r => r.corrected);
const correctedBelow = rows.filter(r => r.correctedBelow);

out.push(`Scripts: **${rows.length}**. Cited by at least one document: **${rows.length - orphans.length}**.`);
out.push(`Carrying a correction or superseded banner in the header: **${corrected.length}**.`);
out.push(`Carrying one further down, in the OUTPUT or the READINGS: **${correctedBelow.length}**.`);
out.push(`Cited by nothing: **${orphans.length}**.`);
out.push('');

out.push('## Read this first: scripts whose header carries a correction');
out.push('');
out.push('These headers flag corrections or superseded output. **Read the notice and');
out.push('its scope before quoting a figure.** Absence from this list is not validation.');
out.push('');
if (corrected.length) {
  out.push('| script | title | cited by |');
  out.push('|---|---|---|');
  for (const r of corrected)
    out.push(`| ${scriptLink(r.file)} | ${r.title || ''} | ${r.cites.length} |`);
} else out.push('*(none)*');
out.push('');

out.push('## Read this too: scripts whose correction sits BELOW the header');
out.push('');
out.push('These files contain a correction, defect notice or superseded marker past');
out.push('line 40, often in the OUTPUT or READINGS. The notice can concern this file');
out.push('or a file it cites. Start at the listed line and check its scope before reuse.');
out.push('');
if (correctedBelow.length) {
  out.push('| script | first notice at | title | cited by |');
  out.push('|---|---|---|---|');
  for (const r of correctedBelow)
    out.push(`| ${scriptLink(r.file)} | :${r.correctedBelowAt} | ${r.title || ''} | ${r.cites.length} |`);
} else out.push('*(none)*');
out.push('');

out.push('## Cited by nothing');
out.push('');
out.push('No document matches these scripts by filename or recognized shorthand.');
out.push('Check their purpose and status, then cite them from the relevant note or');
out.push('record their disposition. An uncited script need not contain a valid result.');
out.push('');
if (orphans.length) {
  out.push('| script | title | lines |');
  out.push('|---|---|---|');
  for (const r of orphans)
    out.push(`| ${scriptLink(r.file)} | ${r.title || ''} | ${r.lines} |`);
} else out.push('*(none: every script is cited)*');
out.push('');

out.push('## The full index, by family');
out.push('');
const fams = [...new Set(rows.map(r => r.family))].sort();
for (const fam of fams) {
  const fr = rows.filter(r => r.family === fam);
  out.push(`### ${fam} (${fr.length})`);
  out.push('');
  out.push('| script | title | companion prose | cited by |');
  out.push('|---|---|---|---|');
  for (const r of fr) {
    const cites = r.cites.length === 0 ? '**nothing**'
      : r.cites.length <= 3 ? r.cites.map(c => localLink(c, path.join(ROOT, c))).join(', ')
      : `${localLink(r.cites[0], path.join(ROOT, r.cites[0]))} +${r.cites.length - 1} more`;
    out.push(`| ${scriptLink(r.file)} | ${(r.title || '').replace(/\|/g, '\\|')} | ${r.companion ? `\`${r.companion}\`` : ''} | ${cites} |`);
  }
  out.push('');
}

// ---------------------------------------------------------------------------
// THE CAPABILITY INDEX, added 2026-08-18 and the reason is a measured cost.
//
// This index listed what each script IS ABOUT. It did not list what each script
// CAN DO. On 2026-08-18 that cost a result: cap-32 ships `k4direct`, an exact
// computation of the shape factor that a Monte Carlo was approximating, and the
// Monte Carlo's noise was the ONLY thing keeping the @13 gate out of reach. The
// exact routine had been written, validated at @7, and never run above it. It
// moved the assembly from missing the gate by 2% to meeting it by x3600 --
// baseline -1.021692e-9 against a 1e-9 cap, swapped -2.753038e-13.
//
// TWO CORRECTIONS, 2026-08-18, both measured when the swap was finally made.
// The 199 s here was 2.1x too expensive: `k4direct` measures 93.5 s over three
// runs with 0.8% spread, which drags the @17 extrapolation from 8.5 days on ten
// cores to about 4.4. And the x3600 is an ACCURACY margin, not a speedup -- a
// distinction worth stating because a brief written from this note read it as
// "x3600 cheaper" and sent an agent looking for a speedup that does not exist.
// The exact routine is SLOWER: 93.5 s against k4MC(2e8)'s 11.7-23.4 s, so the
// swap costs 4x-8x, or +75 s on a 266 s stage. It is worth paying because the
// Monte Carlo's noise was the only thing keeping the gate out of reach, and
// noise is not something you buy your way out of with more samples here.
//
// The information was not missing. It was structured, on one line, in
// natal-cap-34's EXPORTS32 list -- which named `k4MC` and `k4direct` SIDE BY
// SIDE -- and it was invisible because nothing indexed the routines a script
// exposes. So this section is generated from the export idioms themselves: a
// script that deliberately makes routines available to another script is
// declaring a capability, and those declarations now appear in the map.
// ---------------------------------------------------------------------------
{
  // Attribute a routine to the file that DEFINES it, not to the file whose
  // export list happens to name it. cap-34's EXPORTS32 names 37 routines that
  // all live in cap-32; a first version of this index credited them to cap-34
  // and would have sent a reader to the wrong file to find k4direct.
  const defines = new Map();          // name -> [files that define it]
  const srcOf = new Map();
  for (const r of rows) {
    const src = fs.readFileSync(scriptPath.get(r.file), 'utf8');
    srcOf.set(r.file, src);
    const code = src.replace(/\/\*[\s\S]*?\*\//g, '');
    for (const m of code.matchAll(/^\s*(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/gm))
      (defines.get(m[1]) || defines.set(m[1], []).get(m[1])).push(r.file);
    for (const m of code.matchAll(/^\s*const\s+([A-Z][A-Z0-9_]*)\s*=/gm))
      (defines.get(m[1]) || defines.set(m[1], []).get(m[1])).push(r.file);
  }
  const byDefiner = new Map();        // definingFile -> Map(name -> exposedBy)
  for (const r of rows) {
    const src = srcOf.get(r.file);
    const names = new Set();
    for (const m of src.matchAll(/module\.exports\s*=\s*\{([^}]*)\}/g))
      for (const n of m[1].split(',')) { const t = n.split(':')[0].trim(); if (/^[A-Za-z_$][\w$]*$/.test(t)) names.add(t); }
    for (const m of src.matchAll(/const\s+EXPORTS\w*\s*=\s*\[([\s\S]*?)\]/g))
      for (const n of m[1].split(',')) { const t = n.trim().replace(/^['"]|['"]$/g, ''); if (/^[A-Za-z_$][\w$]*$/.test(t)) names.add(t); }
    for (const n of names) {
      const d = defines.get(n) || [];
      const home = d.includes(r.file) ? r.file : (d.length === 1 ? d[0] : null);
      const key = home || r.file;
      if (!byDefiner.has(key)) byDefiner.set(key, new Map());
      byDefiner.get(key).set(n, home && home !== r.file ? r.file : null);
    }
  }
  const caps = [...byDefiner.entries()].sort((a, b) => a[0] < b[0] ? -1 : 1)
    .map(([file, m]) => ({ file, names: [...m.entries()].sort((a, b) => a[0] < b[0] ? -1 : 1) }));
  out.push('## What the scripts PROVIDE, not just what they are about');
  out.push('');
  out.push('Check these extracted export names before writing another implementation.');
  out.push('Read the defining script and any exposing script for invocation, input limits');
  out.push('and validation. This table locates code; it does not establish that a routine');
  out.push('has been tested at the scale or parameters you need.');
  out.push('');
  out.push('| script | routines it exposes |');
  out.push('|---|---|');
  for (const c of caps) out.push(`| ${scriptLink(c.file)} | ${c.names.map(([n, via]) => `\`${n}\`` + (via ? ` *(exposed via ${via.replace(/\.js$/, '')})*` : '')).join(', ')} |`);
  out.push('');
  out.push(`**${caps.reduce((a, c) => a + c.names.length, 0)} routines across ${caps.length} scripts**, attributed to the file that DEFINES each one.`);
  out.push('');
  out.push('Two things this table does NOT tell you, both of which have cost something:');
  out.push('');
  out.push('1. **At what levels a routine has actually been RUN.** `k4direct` was exercised');
  out.push('   at @7 and @11 and never above, which is exactly why it read as unavailable.');
  out.push('   A routine that exists is not a routine that has been used at your level.');
  out.push('2. **Where a long run put its output.** Results large enough to matter have');
  out.push('   been written outside the repository; see the section below.');
  out.push('');
  // External artifact tree: results that exist but are not under version control.
  const EXT = path.join(process.env.HOME || '', 'Files', 'primeoire-runs');
  out.push('## Results that live OUTSIDE this repository');
  out.push('');
  out.push('Long runs have written their output to `~/Files/primeoire-runs/`, which is not');
  out.push('under version control and which no index reached until 2026-08-18. The @41');
  out.push('march -- 6.16 hours of compute -- was recorded as NEEDS COMPUTE in a wave');
  out.push('report while its completed log and shard JSONs sat there. **If that directory');
  out.push('is lost, those results are lost.**');
  out.push('');
  try {
    const subs = fs.readdirSync(EXT, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort();
    for (const d of subs) {
      let n = 0; try { n = fs.readdirSync(path.join(EXT, d)).length; } catch { /* unreadable */ }
      out.push(`- \`~/Files/primeoire-runs/${d}/\` — ${n} file(s)`);
    }
    if (!subs.length) out.push('- (directory present, no subdirectories)');
  } catch { out.push('- (directory not present on this machine)'); }
  out.push('');
}

out.push('---');
out.push('');
out.push('Current findings, failed steps and reuse conditions are in');
out.push('[OUTCOMES.md](OUTCOMES.md). Earlier correction records remain in');
out.push('[history/CHANGELOG.md](history/CHANGELOG.md); Git preserves revisions.');

const dest = path.join(RESEARCH, 'SCRIPTS.md');
fs.writeFileSync(dest, out.join('\n') + '\n');
console.log(`wrote ${path.relative(ROOT, dest)}`);
console.log(`  scripts ${rows.length}, orphans ${orphans.length}, corrected-banner ${corrected.length} in header + ${correctedBelow.length} below it`);
for (const r of orphans) console.log(`  ORPHAN  ${r.file}`);
