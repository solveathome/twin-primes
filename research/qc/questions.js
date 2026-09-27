// ============================================================================
// QC / QUESTIONS — which questions has this corpus already attacked, and where?
// ============================================================================
// Chris, 2026-08-28: "We keep re-running things. Restructure repo so that does
// not happen." The same day three briefs re-posed questions the corpus had
// already answered: TODO item 0's first move had run a week earlier
// (attack-rhoms-01.md), item 1c's refit had run 2026-08-21, and a TODO premise
// in item 10 had been measured under another name. 316 staging notes answered
// questions and nothing indexed them BY QUESTION; the router indexes by
// document and the changelog by claim, and a briefer greps on guessed words.
//
// THE MECHANISM. Every note that answers a question carries a machine-readable
// block at its top, invisible when rendered:
//
//   <!-- ledger
//   id: Q-mod30-tail            a stable slug (letters, digits, hyphens); several notes may share one
//   status: ANSWERED            OPEN | PARTIAL | ANSWERED | CLOSED | SUPERSEDED
//   todo: 11                    the TODO item(s) whose move this executes; "none" allowed;
//                               "11 (retired)" when the item has left TODO.md
//   question: one line, the question as the note poses it
//   verdict: one line, calibrated, the note's own bottom line
//   parity: one line (REQUIRED on attack notes added from 2026-09-05; see below)
//   -->
//
// THE PARITY GATE (2026-09-05), scoped after the independent review.
// A note declares its arithmetic inputs and method scope, or `residue-only`.
// A mathematical obstruction must separately name the retained statistics,
// error tolerance and quantifiers; the gate does not prove impossibility.
// Exact residue arrangements encode primality. Merely using residue notation
// does not put every argument in one sieve-method class.
// The check rejects a missing or placeholder line on a new attack note whose
// todo names a live item. Legacy notes are exempt by git's add date; an
// untracked note is new. `residue-only` remains a supported declaration.
//

// Several notes may share an id. They are reported under one status only when they
// agree on the status AND on the verdict; otherwise the index prints MIXED, naming
// which axis disagrees and each note's own status, so a reader opens the records
// instead of trusting a rank. The verdict shown is the NEWEST note's by last author
// date (git's `--format=%as`, the parity gate's source for dates), with the
// last-in-path-order rule kept as the tiebreak and as the fallback where git is
// absent; the full chain is always listed. (2026-09-13, job #609: the two
// Q-rho-maximal-law notes agree on PARTIAL
// and disagree on the verdict, and path order displayed the OLDER one -- 2026-08-19
// "model-dependent and undecided" -- over the 2026-08-28 note that had moved past
// it to "measured against rather than undecided".)
//
// research/QUESTIONS.md is GENERATED from these blocks (node research/qc.js
// --index, or node research/gen-questions-index.js) and is the one place to
// look before briefing: by TODO item, then by question id. Notes without a
// block are listed there by title under "unindexed", so a grep finds them too.
//
// THE GUARD, gated: a TODO item must list, on a line `Ledger: Q-a, Q-b`,
// every question id whose block names that item. A move cannot be re-briefed
// without reading, in the item itself, that it has run. The gate says so when
// a note names an item that does not acknowledge it.
//
// The status belongs to the QUESTION, not the note's review grade. An answered
// specification may still contain an open arithmetic target. Read the owning
// note and linked reviews for its grade; the generated preamble explains this.
// ============================================================================
'use strict';
const fs = require('fs');
const path = require('path');
const C = require('./corpus');

const STATUSES = new Set(['OPEN', 'PARTIAL', 'ANSWERED', 'CLOSED', 'SUPERSEDED']);
// One separator for every path comparison in this file (see indexedFiles).
const slash = f => C.rel(f).split(path.sep).join('/');
const BLOCK_RE = /<!--\s*ledger\s*\n([\s\S]*?)-->/;
const TODO_PATH = path.join(C.ROOT, 'TODO.md');
const OUT_PATH = path.join(C.RESEARCH, 'QUESTIONS.md');

function indexedFiles() {
  // Staging notes and the working documents under research/. Registries carry
  // a `Q-registry-<name>` block (their question is what they index); generated
  // files (SCRIPTS.md, QUESTIONS.md) carry none and are excluded by corpus.js. History other than staging is never
  // audited (qc/README.md), and that boundary holds here too.
  //
  // PATHS ARE COMPARED IN ONE SEPARATOR (2026-09-13). These filters used to
  // match a literal '/', which is right on POSIX and wrong on Windows, where
  // path.relative yields '\'. On Windows the two filters then matched NOTHING:
  // indexedFiles() returned [], collect() saw 0 notes, and --index wrote a
  // QUESTIONS.md carrying 0 questions from 0 indexed notes, exit code 0. The
  // ledger gate reported "0 of 0 notes carry a ledger block" and stayed clean
  // for the same reason. Ported the paths once here rather than in every
  // regex: `slash()` is the only place a separator is spelled.
  const staging = C.historyMarkdown.filter(f => slash(f).includes('history/staging/'));
  const body = C.bodyMarkdown.filter(f => /^research\/[^/]+\.md$/.test(slash(f)));
  return [...staging, ...body].sort();
}

function parseBlock(file) {
  const src = C.read(file);
  const head = src.split('\n').slice(0, 60).join('\n');
  const m = BLOCK_RE.exec(head);
  const title = (src.split('\n').find(l => /^#\s/.test(l)) || '').replace(/^#\s*/, '').trim();
  if (!m) return { file, title, block: null };
  const fields = {};
  const problems = [];
  for (const raw of m[1].split('\n')) {
    const ln = raw.trim();
    if (!ln) continue;
    const km = /^([a-z]+):\s*(.*)$/.exec(ln);
    if (!km) { problems.push(`unparseable line "${ln}"`); continue; }
    fields[km[1]] = km[2].trim();
  }
  for (const k of ['id', 'status', 'question', 'verdict'])
    if (!fields[k]) problems.push(`missing field "${k}"`);
  if (fields.status && !STATUSES.has(fields.status))
    problems.push(`status "${fields.status}" is not one of ${[...STATUSES].join(' | ')}`);
  if (fields.id && !/^Q-[A-Za-z0-9][A-Za-z0-9-]*$/.test(fields.id))
    problems.push(`id "${fields.id}" must look like Q-slug (letters, digits, hyphens)`);
  const todo = (fields.todo || 'none').split(',').map(s => s.trim()).filter(s => s && s !== 'none')
    .map(s => ({ id: s.replace(/\s*\(retired\)\s*$/, ''), retired: /\(retired\)/.test(s) }));
  const line = src.slice(0, m.index).split('\n').length;
  return { file, title, block: { ...fields, todo, line }, problems };
}

function todoItems() {
  // A corpus without a TODO.md has no items to acknowledge; the block side of the
  // check still runs. The selftest fixture carries its own TODO.md.
  if (!fs.existsSync(TODO_PATH)) return new Map();
  const src = fs.readFileSync(TODO_PATH, 'utf8').split('\n');
  const items = new Map();
  let cur = null;
  src.forEach((ln, i) => {
    const h = /^\*\*([A-Za-z0-9]+)\.\s/.exec(ln);
    if (h) { cur = { id: h[1], line: i + 1, ledger: new Set(), ledgerLine: null }; items.set(h[1], cur); return; }
    if (/^##\s/.test(ln)) { cur = null; return; }
    if (cur) {
      const lm = /^\s*Ledger:\s*(.*)$/.exec(ln);
      if (lm) { cur.ledgerLine = i + 1; for (const q of lm[1].matchAll(/Q-[A-Za-z0-9-]+/g)) cur.ledger.add(q[0]); }
    }
  });
  return items;
}

function collect() {
  const rows = indexedFiles().map(parseBlock);
  return { rows, todo: todoItems() };
}

// ---------------------------------------------------------------------------
// THE CHECK
// ---------------------------------------------------------------------------
function ledger() {
  const { rows, todo } = collect();
  const findings = [];
  const byId = new Map();
  for (const r of rows) {
    if (!r.block) continue;
    for (const p of r.problems || [])
      findings.push({ file: C.rel(r.file), line: r.block.line, kind: 'ledger-malformed', detail: p,
        note: 'the block format is documented at the top of qc/questions.js' });
    if (r.block.id) {
      if (!byId.has(r.block.id)) byId.set(r.block.id, []);
      byId.get(r.block.id).push(r);
    }
    for (const t of r.block.todo) {
      if (t.retired) continue;
      const item = todo.get(t.id);
      if (!item) {
        findings.push({ file: C.rel(r.file), line: r.block.line, kind: 'ledger-todo-unknown',
          detail: `todo: ${t.id} names no item heading in TODO.md`,
          note: 'if the item has left TODO.md, write "todo: ' + t.id + ' (retired)"; otherwise fix the id' });
        continue;
      }
      if (!item.ledger.has(r.block.id)) {
        findings.push({ file: 'TODO.md', line: item.line, kind: 'ledger-todo-unlisted',
          detail: `item ${t.id} does not list ${r.block.id} (${C.rel(r.file)}, ${r.block.status}) on its Ledger: line`,
          note: 'THE RE-RUN GUARD: the item must acknowledge every question already attacked under it. Add the id to the item\'s "Ledger:" line, and read the note before briefing any move' });
      }
    }
  }
  for (const [id, group] of byId) {
    const qs = new Set(group.map(g => C.norm(g.block.question)));
    if (qs.size > 1)
      findings.push({ file: C.rel(group[1].file), line: group[1].block.line, kind: 'ledger-id-conflict',
        detail: `id ${id} is shared by ${group.length} notes with different question text`,
        note: 'notes sharing an id answer the SAME question; give a different question a different id' });
  }
  for (const [tid, item] of todo)
    for (const q of item.ledger)
      if (!byId.has(q))
        findings.push({ file: 'TODO.md', line: item.ledgerLine || item.line, kind: 'ledger-todo-dangling',
          detail: `item ${tid} lists ${q}, which no note carries`,
          note: 'a Ledger: line points at notes that exist; fix the id or add the block to the note' });
  const indexed = rows.filter(r => r.block).length;
  return {
    name: 'ledger',
    description: `every note that answers a question says which, and every TODO item acknowledges the questions already attacked under it `
      + `(${indexed} of ${rows.length} notes carry a ledger block; ${byId.size} question ids; ${todo.size} TODO items)`,
    findings,
  };
}

// ---------------------------------------------------------------------------
// THE PARITY GATE (2026-09-05). See the header.
// ---------------------------------------------------------------------------
const PARITY_CUTOFF = '2026-09-05';
const PARITY_EXEMPT = 'residue-only';
let addDates = null;
function fileAddDates() {
  // First AUTHOR date (git `--format=%as --diff-filter=A`) of every file under
  // research/, one git call, cached.
  // A corpus without git (the selftest fixture) yields an empty map, and an
  // unknown file counts as NEW, which is the conservative direction: the gate
  // asks a question rather than assuming the answer.
  if (addDates) return addDates;
  addDates = new Map();
  try {
    const out = require('child_process').execFileSync('git',
      ['-C', C.ROOT, 'log', '--diff-filter=A', '--format=%as', '--name-only', '--', 'research'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    let date = null;
    for (const ln of out.split('\n')) {
      if (/^\d{4}-\d\d-\d\d$/.test(ln)) { date = ln; continue; }
      const f = ln.trim();
      if (!f || !date) continue;
      // log is newest first; the earliest add wins (a file re-added after a
      // rename keeps its original date)
      addDates.set(f, date);
    }
  } catch (e) { /* no git: every file is new */ }
  return addDates;
}

// The display choice, as a pure function so it can be checked without git:
// `group` is the notes sharing one id, `dates` a Map(relpath -> 'YYYY-MM-DD').
// A file git does not know counts as NEW (the parity gate's convention, above),
// and with no dates at all the last note in path order wins, which is exactly
// the rule this replaced.
function pickNewest(group, dates, rel) {
  const known = group.filter(x => dates.has(rel(x.file)));
  const newest = known.length === group.length
    ? known.filter(x => dates.get(rel(x.file)) === known.map(y => dates.get(rel(y.file))).sort().pop())
    : group.filter(x => !dates.has(rel(x.file)));
  return newest[newest.length - 1];
}

let lastDates = null;
function fileLastDates() {
  // Last AUTHOR date (git `--format=%as`) of every file under research/, one git
  // call, cached: the display rule's date source (see summarise). `git log
  // --name-only` walks newest first, so the FIRST time a file appears is its
  // most recent change.
  // The parity gate above reads the same log for first-author dates. A corpus
  // without git yields an empty map, and then summarise falls back to path
  // order, exactly what it did before this rule existed.
  if (lastDates) return lastDates;
  lastDates = new Map();
  try {
    const out = require('child_process').execFileSync('git',
      ['-C', C.ROOT, 'log', '--format=%as', '--name-only', '--', 'research'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    let date = null;
    for (const ln of out.split('\n')) {
      if (/^\d{4}-\d\d-\d\d$/.test(ln)) { date = ln; continue; }
      const f = ln.trim();
      if (!f || !date || lastDates.has(f)) continue;   // newest first: the first hit wins
      lastDates.set(f, date);
    }
  } catch (e) { /* no git: the display rule keeps path order */ }
  return lastDates;
}

function parity() {
  const { rows } = collect();
  const dates = fileAddDates();
  const findings = [];
  let attacks = 0, exempt = 0;
  for (const r of rows) {
    if (!r.block) continue;
    const live = r.block.todo.filter(t => !t.retired);
    if (!live.length) continue;                     // not an attack note
    const rel = C.rel(r.file);
    // Keyed by slash(): git prints '/', so a Windows path.sep would miss every
    // entry (#136, same root cause as corpus.js #805 -- C.rel is already
    // normalised there, so this is defence in depth).
    const added = dates.get(slash(r.file));
    if (added && added < PARITY_CUTOFF) continue;    // legacy note, exempt
    attacks++;
    const v = (r.block.parity || '').trim();
    if (!v) {
      findings.push({ file: rel, line: r.block.line, kind: 'parity-missing',
        detail: `attack note (todo: ${live.map(t => t.id).join(', ')}) carries no parity: line`,
        note: 'THE PARITY GATE: state the arithmetic inputs and method scope, or write "parity: residue-only". This checks documentation, not mathematical feasibility. Format at the top of qc/questions.js' });
      continue;
    }
    if (v.toLowerCase() === PARITY_EXEMPT) { exempt++; continue; }
    if (v.length < 12 || /^(n\/?a|none|tbd|todo|unknown|\?+|-+)$/i.test(v)) {
      findings.push({ file: rel, line: r.block.line, kind: 'parity-placeholder',
        detail: `parity: "${v}" names no input`,
        note: 'either state the arithmetic inputs and method scope in one line, or write exactly "residue-only"' });
    }
  }
  return {
    name: 'parity',
    description: `every attack note added from ${PARITY_CUTOFF} states its arithmetic inputs and method scope, or declares residue-only `
      + `(${attacks} attack notes in scope, ${exempt} declared residue-only)`,
    findings,
  };
}

function ledgerBacklog() {
  const { rows } = collect();
  const missing = rows.filter(r => !r.block);
  const findings = missing.map(r => ({ file: C.rel(r.file), line: 1, kind: 'ledger-missing',
    detail: r.title ? `"${r.title.slice(0, 90)}"` : '(no title)',
    note: 'legacy note without a ledger block; it is listed by title in QUESTIONS.md §unindexed until one is added' }));
  return {
    name: 'ledger-backlog',
    description: `notes with no ledger block, listed by title in research/QUESTIONS.md so a grep still finds them (${missing.length} of ${rows.length}; the counter should only fall)`,
    findings,
  };
}

// ---------------------------------------------------------------------------
// THE GENERATOR — research/QUESTIONS.md
// ---------------------------------------------------------------------------
const cell = s => String(s || '').replace(/\|/g, '\\|').replace(/\n/g, ' ').trim();
const link = f => { const r = slash(f); const p = r.replace(/^research\//, ''); return `[${path.basename(r)}](${p})`; };

function renderQuestions() {
  const { rows, todo } = collect();
  const withBlock = rows.filter(r => r.block && r.block.id);
  const byId = new Map();
  for (const r of withBlock) { if (!byId.has(r.block.id)) byId.set(r.block.id, []); byId.get(r.block.id).push(r); }
  const ids = [...byId.keys()].sort();
  const summarise = id => {
    const g = byId.get(id);
    // Deterministic display choice: the NEWEST note supplies the verdict, where
    // newest is the last author date of its file (git `--format=%as`, not the
    // commit date, #139) -- one cached git call. This is
    // chronology of the FILES, not review precedence, and it is not authority:
    // an accepted review of an older note still outranks a newer one, so read
    // the chain. A file git does not know counts as NEW (the parity gate's
    // convention), and a corpus without git keeps the old path-order rule.
    // Within the newest-dated set the last in path order wins, so the choice
    // stays deterministic. (2026-09-13, job #609 -- see the header.)
    const chosen = pickNewest(g, fileLastDates(), slash);
    // A shared id carries one status ONLY when its notes agree on the status AND
    // on the verdict. When either disagrees the index says MIXED, names the axis
    // and lists each note's own status, so a reader opens them instead of
    // trusting a rank. (2026-08-28 red team: taking the highest rank showed
    // Q-c2prime-drift as CLOSED while its earlier note reads PARTIAL and the
    // later one closed on a weaker window.)
    const statuses = [...new Set(g.map(x => x.block.status))];
    const verdicts = new Set(g.map(x => x.block.verdict));
    const status = statuses.length === 1 && verdicts.size === 1 ? statuses[0]
      : statuses.length > 1
        ? 'MIXED (statuses differ: ' + g.map(x => path.basename(x.file) + ': ' + x.block.status).join('; ') + ')'
        : 'MIXED (verdicts differ across ' + g.length + ' records)';
    return { id, question: chosen.block.question, status, verdict: chosen.block.verdict,
             files: g.map(x => x.file),
             todo: [...new Set(g.flatMap(x => x.block.todo.map(t => t.id + (t.retired ? ' (retired)' : ''))))] };
  };
  const S = ids.map(summarise);

  const out = [];
  out.push('# Questions: what has been asked here, what it got, and where the record is');
  out.push('');
  out.push('*(GENERATED from the `<!-- ledger -->` blocks at the top of the notes; never');
  out.push('hand-edited. Regenerate with `node research/qc.js --index` or');
  out.push('`node research/gen-questions-index.js`. The block format and the gate that');
  out.push('enforces it are documented at the top of `qc/questions.js`.)*');
  out.push('');
  out.push('**Before proposing an attack or briefing an agent:** find the TODO item in');
  out.push('section 1, search for the actual object, then read the relevant records and');
  out.push('their decisive dependencies. Use [OUTCOMES.md](OUTCOMES.md) for reuse and');
  out.push('revisit conditions. An item can span many unrelated attempts; loading every');
  out.push('linked note is not the required first step. Verify any conclusion that');
  out.push('determines the next move, including an ANSWERED or CLOSED entry.');
  out.push('');
  out.push('**Status describes the question, not proof strength or review grade.**');
  out.push('OPEN: unresolved. PARTIAL: specified parts are resolved. ANSWERED: the bounded');
  out.push('question has an answer, which may be a negative finding, finite measurement');
  out.push('or completed specification. Its underlying arithmetic target may remain OPEN.');
  out.push('CLOSED: the stated premise or approach is closed at its recorded scope; this');
  out.push('does not refute every related conjecture. SUPERSEDED: another record replaces');
  out.push('this one. Consult the owning note and linked reviews for HELD or other grades.');
  out.push('');
  out.push('**Multiple records:** a shared id is shown under one status only when its');
  out.push('records agree on the status and on the verdict; otherwise the row reads MIXED,');
  out.push("naming which of the two disagrees and each record's own status. The displayed");
  out.push('verdict comes from the record with the newest last author date (a file git does');
  out.push('not track counts as newest; without git, the last record in path order), which');
  out.push('is chronology of the files, not necessarily the most authoritative review.');
  // The SOURCE of those dates, so a drift finding can be traced to the environment
  // rather than to a stale ledger. Only the KIND is emitted here: the file count
  // would change on any commit that adds a research path, and a full-text registry
  // comparison would then report drift after every such commit (#138, #2576).
  out.push(`Display dates: ${fileLastDates().size ? 'git log' : 'no git: path order'}.`);
  out.push('Read the linked records before resolving a disagreement; the generator does not');
  out.push('adjudicate it.');
  out.push('');
  out.push('## 1. By TODO item: what has already run under each');
  out.push('');
  out.push('| TODO item | question | status | verdict | records |');
  out.push('|---|---|---|---|---|');
  const itemOrder = [...todo.keys()];
  const seen = new Set();
  for (const tid of itemOrder) {
    const here = S.filter(s => s.todo.some(t => t.replace(/ \(retired\)$/, '') === tid));
    for (const s of here) { seen.add(s.id); out.push(`| ${tid} | \`${s.id}\` ${cell(s.question)} | ${s.status} | ${cell(s.verdict)} | ${s.files.map(link).join(', ')} |`); }
  }
  const retired = S.filter(s => !seen.has(s.id) && s.todo.length);
  for (const s of retired) out.push(`| ${cell(s.todo.join(', '))} | \`${s.id}\` ${cell(s.question)} | ${s.status} | ${cell(s.verdict)} | ${s.files.map(link).join(', ')} |`);
  out.push('');
  out.push('## 2. Every question, by id');
  out.push('');
  out.push('| id | status | question | verdict | TODO | records |');
  out.push('|---|---|---|---|---|---|');
  for (const s of S) out.push(`| \`${s.id}\` | ${s.status} | ${cell(s.question)} | ${cell(s.verdict)} | ${cell(s.todo.join(', ') || 'none')} | ${s.files.map(link).join(', ')} |`);
  out.push('');
  const missing = rows.filter(r => !r.block);
  out.push(`## 3. Unindexed notes (${missing.length}): title only, until a block is added`);
  out.push('');
  out.push('*(Legacy notes written before the ledger existed. A grep for the object still');
  out.push('lands here. Add a block when a note is next touched; `node research/qc.js');
  out.push('ledger-backlog` lists them.)*');
  out.push('');
  for (const r of missing) out.push(`- ${link(r.file)}: ${cell(r.title)}`);
  out.push('');
  return { text: out.join('\n'), questions: S.length, notes: withBlock.length, unindexed: missing.length };
}

function generate() {
  const r = renderQuestions();
  fs.writeFileSync(OUT_PATH, r.text);
  return { questions: r.questions, notes: r.notes, unindexed: r.unindexed };
}

// ---------------------------------------------------------------------------
// THE CHECK: registry drift.
//
// research/QUESTIONS.md is GENERATED from the notes' ledger blocks, so each row
// is a COPY and has exactly one mechanical failure mode: the ledger block (or
// the revision its patch carried) lands and the index is never regenerated.
// Nothing else in this file tests that, and it is the defect the served
// snapshot actually showed on 2026-09-13 -- a dated SNAPSHOT of that day, not a
// current count: six of the fifty-three open/partial rows were not what their own
// sources said -- Q-xchan-at29-prereg,
// Q-shadow-prereg, Q-centered-discrepancy-estimate,
// Q-fixed-endpoint-discrepancy, Q-global-factor-signs and Q-derive-0904-L7-transfer
// (job #587, return #230; the row-37 note is byte-for-byte the file accepted
// audit #152 names as its revised document and the index still prints the
// pre-#152 verdict).
//
// SCOPE OF THIS CHECK: it compares the row lines of the generated index that
// begin with a backticked id -- section 2's rows -- and nothing else. Prose,
// section 1's columns, the preamble and the unindexed list are NOT compared, so
// a change confined to them fires no finding here (#128).
//
// THE FIX IS ALWAYS THE SAME, which is why this is one finding kind and not a
// family: regenerate. A row that disagrees with its own block cannot be
// hand-edited (the next regeneration overwrites it), and if the BLOCK is the
// stale thing then the correction belongs in the note -- this check cannot tell
// which, so it names the row and says both.
// ---------------------------------------------------------------------------
function registryDrift() {
  const now = renderQuestions();
  const findings = [];
  const rowsOf = (text, into) => {
    for (const ln of text.split('\n')) {
      const m = /^\|\s*`([^`]+)`\s*\|/.exec(ln);
      if (m && !into.has(m[1])) into.set(m[1], ln);
    }
    return into;
  };
  if (!fs.existsSync(OUT_PATH)) {
    findings.push({ file: 'research/QUESTIONS.md', line: 1, kind: 'registry-missing',
      detail: 'the generated index does not exist',
      note: 'run `node research/qc.js --index` and commit research/QUESTIONS.md' });
    return { name: 'registry-drift',
      description: `the generated index exists and its section-2 rows match their ledger blocks (0 rows)`
        + `; display dates: ${fileLastDates().size ? `git log, ${fileLastDates().size} files` : 'no git: path order'}`, findings };
  }
  const onDisk = fs.readFileSync(OUT_PATH, 'utf8').split('\r\n').join('\n');
  const was = rowsOf(onDisk, new Map());
  const is = rowsOf(now.text, new Map());
  for (const [id, line] of is) {
    const old = was.get(id);
    if (old === undefined) {
      findings.push({ file: 'research/QUESTIONS.md', line: 1, kind: 'registry-row-missing',
        detail: `${id} carries a ledger block but has no row in the index`,
        note: 'run `node research/qc.js --index` and commit research/QUESTIONS.md' });
    } else if (old !== line) {
      findings.push({ file: 'research/QUESTIONS.md', line: 1, kind: 'registry-row-stale',
        detail: `${id}: the row is not what its own ledger block(s) say`,
        note: 'THE REGISTRY DRIFT: this file is generated, so a row that disagrees with its source means the index was not regenerated after the block or its integrated revision landed. Regenerate (`node research/qc.js --index`) and commit. If the BLOCK is the stale thing, fix the note instead -- this check cannot tell, and a hand-edit to this file is overwritten at the next regeneration.' });
    }
  }
  for (const id of was.keys()) if (!is.has(id))
    findings.push({ file: 'research/QUESTIONS.md', line: 1, kind: 'registry-row-orphan',
      detail: `${id} has a row in the index but no ledger block carries the id now`,
      note: 'regenerate; a row whose block was removed or renamed should not survive in the index' });
  return { name: 'registry-drift',
    description: `the generated index's section-2 rows are exactly what their ledger blocks generate`
      + ` (${is.size} rows; display dates: ${fileLastDates().size ? `git log, ${fileLastDates().size} files` : 'no git: path order'})`, findings };
}

module.exports = { parity, ledger, ledgerBacklog, generate, renderQuestions, registryDrift, collect, pickNewest, fileLastDates };

if (require.main === module) {
  const r = generate();
  console.log(`research/QUESTIONS.md: ${r.questions} questions from ${r.notes} indexed notes, ${r.unindexed} unindexed`);
}
