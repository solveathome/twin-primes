// ============================================================================
// QC / CORPUS — shared primitives for the quality checks
// ============================================================================
// One place that knows how this repository is laid out, so the checks do not
// each re-implement discovery, normalisation and reference resolution and drift
// apart. Everything here is pure reading; nothing in qc/ ever writes to a body
// document.
//
// The distinctions encoded here are the house rules, and they are load-bearing:
//
//   BODY vs HISTORY. research/history/ is the process record and is allowed to
//   be full of superseded claims. Checks run against the BODY and may use
//   history only as evidence. A check that flags history for stating history is
//   broken.
//
//   SCRIPTS ARE EXEMPT from history-migration. A script header saying "the
//   output below is superseded" is that artifact's current status, and it is the
//   only guard between a reader and a runnable wrong number. audit-numbers.js is
//   a regression test AGAINST retired numbers. Never treat those banners as
//   defects; surface them.
//
//   GENERATED FILES are not evidence. SCRIPTS.md is generated from the scripts,
//   so it must never be scanned as a citation source or every script would
//   appear to cite itself.
// ============================================================================

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const RESEARCH = path.join(ROOT, 'research');
const HISTORY = path.join(RESEARCH, 'history');

// Files that are generated, and so are outputs rather than sources.
const GENERATED = new Set(['SCRIPTS.md', 'QUESTIONS.md']);

// ---------------------------------------------------------------------------
// PROJECT CONFIG: the naming conventions of THIS corpus.
//
// The checks used to hard-code these family names in three live regexes, which
// meant the engine could not be lifted to another project without editing
// checks.js. They live here now, beside the other project facts (ROOT, the
// generated files), so that porting the framework is a matter of editing config
// and re-running the selftest.
//
// CONFIG, NOT VERDICTS. Everything in this file is true whether or not a check
// ever runs. The adjudications are a different kind of thing and live in
// ledgers.js: each one exists only because a check fired and a human ruled on
// it. Porting rewrites this file and empties that one.
//
// WHAT DOES AND DOES NOT PORT, recorded so nobody over-promises: the eight
// checks, the three-gate structure, the selftest discipline and the ledger
// pattern are general. The KNOWN-POSITIVE SET IS NOT. Every case in
// selftest.js is copied from a defect this corpus actually had, and that is
// what licenses a zero from qc.js. A new project inherits the machinery with an
// empty fixture and therefore uncalibrated checks. You earn the checks by
// making the mistakes; the scar tissue does not transfer.
// ---------------------------------------------------------------------------
const SCRIPT_FAMILIES = ['natal-cap', 'fold-profile', 'attack', 'a3', 'localized', 'cap'];
// Shorthand references in prose, e.g. "cap-31", "fold-profile-12".
const shortRefRe = () => new RegExp(`\\b((?:${SCRIPT_FAMILIES.join('|')})-(\\d{1,2})[a-z]?)\\b`, 'g');
// Named objects a quotation may be attributed to. Kept as an alternation
// because 'cap' takes an optional 'natal-' prefix and the others do not.
const NAMED_OBJECT_ALT = '(?:natal-)?cap-\\d+|(?:fold-profile|attack|a3|localized)-\\d+';
// Artifact shorthands as they appear in absence claims; same families, with the
// optional letter suffix this corpus uses (attack-06b, fold-profile-12a).
const ARTIFACT_ALT = '(?:natal-)?cap-\\d+|(?:fold-profile|attack|a3|localized)-\\d+[a-z]?';

// ---------------------------------------------------------------------------
// THE SEARCH-CONVENTIONS DOCUMENT. Config, because which file holds a project's
// literature-search discipline is a project fact, and because the vocabulary
// itself must never be copied into the engine: a check that hard-codes "paired
// Jacobsthal" would go stale the moment the conventions table gained a row, and
// the corpus would then have two disagreeing lists of what counts as searching
// properly. The check parses the table instead, so the document stays the only
// place the vocabulary lives.
//
// The columns are named rather than numbered at the call site for the same
// reason. `owning` is the wording the LITERATURE uses and is the only thing that
// clears an absence claim. `ours` and `canonical` are the two wordings that must
// NOT clear one, and they are config rather than an exclusion list in the engine
// because "our vocabulary" is by definition per-project.
// ---------------------------------------------------------------------------
const SEARCH_CONVENTIONS = {
  doc: 'research/SEARCH-CONVENTIONS.md',
  // Column indices in the §1 table, 0-based after splitting on '|'.
  cols: { object: 0, ours: 1, canonical: 2, owning: 3, home: 4 },
  // The heading that opens the table, so the parser does not swallow §3's
  // "searches already run" table, which is a different shape and a different job.
  heading: /^##\s*1\.\s/,
};

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '.git' || e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const allFiles = walk(ROOT);
const rel = p => path.relative(ROOT, p);
const isHistory = p => p.startsWith(HISTORY + path.sep) || p.includes(`${path.sep}history${path.sep}`);

/** Every markdown file in the repo, including history. */
const allMarkdown = allFiles.filter(f => f.endsWith('.md') && !GENERATED.has(path.basename(f)));

/** Working documents: the corpus a fresh reader is expected to trust. */
const bodyMarkdown = allMarkdown.filter(f => !isHistory(f));

/** The process record. Evidence only, never audited as a working document. */
const historyMarkdown = allMarkdown.filter(f => isHistory(f));

/** Research scripts: the evidence base. */
// The evidence base: research scripts that produce results. The qc framework and
// its generators are tooling, not evidence, so they are not part of the corpus
// they check.
const scripts = allFiles.filter(f => f.endsWith('.js') && f.startsWith(RESEARCH + path.sep)
  && !f.includes(`${path.sep}qc${path.sep}`)
  && path.basename(f) !== 'qc.js'
  && !path.basename(f).startsWith('gen-'));

const _text = new Map();
function read(p) {
  if (!_text.has(p)) _text.set(p, fs.readFileSync(p, 'utf8'));
  return _text.get(p);
}

/**
 * Normalise prose for comparison. Forgiving about the things that differ freely
 * between a quotation and its source without changing meaning (markdown
 * emphasis, smart punctuation, dash flavour, whitespace); strict about words.
 */
function norm(s) {
  return s
    .replace(/[`*_]/g, '')
    .replace(/[‘’‛]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—−‐‑]/g, '-')
    .replace(/ /g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim();
}

/**
 * Section labels present in a markdown file, as WHOLE tokens.
 *
 * Until 2026-08-20 this captured only `[0-9]+[a-zA-Z]?`, so `§6.5`, `§6.9` and
 * `§6` were the same token, `§P6` and `§Theorem B` matched nothing, and three
 * real dead references sat in the corpus under a green gate for two audit
 * waves (verify-the-verifier-checks.md §5). Now every heading contributes:
 *   - its full leading label token (`6`, `6.5`, `7a-bis`, `P6`), dots and
 *     hyphens included, trailing punctuation stripped;
 *   - a `Word L` pair when the heading is of the "Theorem A" / "Corollary B" /
 *     "Measurement D" shape, so lettered theorem headings are addressable.
 */
function sectionsOf(p) {
  const nums = new Set();
  for (const ln of read(p).split('\n')) {
    const m = /^#{1,6}\s+§?\s*([A-Za-z0-9][A-Za-z0-9.\-]*)/.exec(ln);
    if (m) {
      const label = m[1].replace(/[.\-]+$/, '');
      if (label) nums.add(label.toLowerCase());
      const t = /^#{1,6}\s+§?\s*([A-Za-z]+ [A-Z0-9][a-z0-9]?)\b/.exec(ln);
      if (t) nums.add(t[1].toLowerCase());
      continue;
    }
    // BOLD-LED LABELS. This corpus numbers sub-items as `**4.5 The vector
    // sieve …**` inside a `## 4.` section, and glossary entries as
    // `- **Stratum (fossil)** — …`; both are the addressable unit a `§4.5` or
    // `§stratum` reference points at, and neither is a markdown heading.
    const b = /^(?:[-*+]\s+)?\*\*([A-Za-z0-9][A-Za-z0-9.\-]*)/.exec(ln);
    if (b) {
      const label = b[1].replace(/[.\-]+$/, '');
      if (label) nums.add(label.toLowerCase());
    }
  }
  return nums;
}

/**
 * Paragraph index: for each line, the text of the paragraph it belongs to.
 *
 * A paragraph is a run of contiguous non-blank, non-heading, non-fenced lines,
 * EXCEPT that a block containing list items or table rows is kept line by line.
 * That exception is the whole reason this is shared rather than re-derived: list
 * items and table rows sit adjacent while being about unrelated documents, so
 * merging them tests a claim on one row against the citation on its neighbour.
 * `quotes` learned that the expensive way and `search-convention` would have
 * learned it again -- a literature-verdict table would have had every row
 * cleared by whichever row happened to carry an arXiv id.
 */
function paragraphIndex(lines) {
  const para = new Array(lines.length).fill('');
  let start = 0, fence = false;
  const close = end => {
    if (end <= start) return;
    const block = lines.slice(start, end);
    // A bullet needs its trailing space, or `**Bold lead.**` reads as a list
    // item: `**` shares its first character with `* item`, and any paragraph
    // with a bold-opened line was silently scoped line-by-line — which
    // produced false positives in `search-convention` (a convention on the
    // adjacent line stopped counting) and false negatives in `quotes`
    // (verify-the-verifier-checks.md B9). Table rows (`|`) need no space.
    const listy = block.some(l => /^\s*(?:[-+]\s|\*\s|\d+\.\s|\|)/.test(l));
    if (listy) for (let k = start; k < end; k++) para[k] = lines[k];
    else { const joined = block.join(' '); for (let k = start; k < end; k++) para[k] = joined; }
  };
  lines.forEach((ln, i) => {
    if (/^\s*```/.test(ln)) { close(i); fence = !fence; start = i + 1; return; }
    if (fence) { start = i + 1; return; }
    if (/^\s*$/.test(ln) || /^\s*#/.test(ln)) { close(i); start = i + 1; }
  });
  close(lines.length);
  return para;
}

/** Headings of a markdown file, as {level, title, line}. */
function headingsOf(p) {
  const out = [];
  read(p).split('\n').forEach((ln, i) => {
    const m = /^(#{1,6})\s+(.*)$/.exec(ln);
    if (m) out.push({ level: m[1].length, title: m[2].trim(), line: i + 1 });
  });
  return out;
}

// --- reference resolution -------------------------------------------------
// Generated files are valid LINK TARGETS (they exist and a reader can open them)
// even though they are never audited as sources.
const generatedFiles = allFiles.filter(f => GENERATED.has(path.basename(f)));
const byBasename = new Map();
for (const f of [...allMarkdown, ...scripts, ...generatedFiles]) {
  const b = path.basename(f);
  if (!byBasename.has(b)) byBasename.set(b, []);
  byBasename.get(b).push(f);
}

/**
 * Resolve a reference token to absolute paths. Handles filenames, bare document
 * names (U-FRAME), and the corpus's canonical shorthands (cap-30 for
 * natal-cap-30-*, fold-profile-12, attack-04, a3-05, localized-04).
 */
function resolveRef(token) {
  const t = token.trim().replace(/^`|`$/g, '');
  if (byBasename.has(t)) return byBasename.get(t);
  for (const ext of ['.md', '.js'])
    if (byBasename.has(t + ext)) return byBasename.get(t + ext);

  const low = t.toLowerCase();
  for (const [b, fs_] of byBasename)
    if (b.toLowerCase().replace(/\.(md|js)$/, '') === low) return fs_;

  let m = /^(?:natal-)?cap-(\d+)$/i.exec(low);
  if (m) {
    const re = new RegExp(`^natal-cap-0*${Number(m[1])}-`, 'i');
    const hits = [...byBasename].filter(([b]) => re.test(b) || new RegExp(`^natal-cap-${m[1]}-`, 'i').test(b));
    if (hits.length) return hits.flatMap(([, v]) => v);
  }
  // A trailing letter is part of the shorthand, not noise: attack-06b is a
  // different artifact from attack-06. The scanner in checks.js accepts that
  // suffix, so this must too, or a correct citation is reported as dead. That
  // mismatch produced the framework's first false positive, on THE-DIALS.md:121.
  m = /^(fold-profile|attack|a3|localized)-(\d+)([a-z])?$/i.exec(low);
  if (m) {
    const suffix = m[3] || '';
    const pats = [
      new RegExp(`^${m[1]}-0*${Number(m[2])}${suffix}-`, 'i'),
      new RegExp(`^${m[1]}-${m[2]}${suffix}-`, 'i'),
    ];
    const hits = [...byBasename].filter(([b]) => pats.some(re => re.test(b)));
    if (hits.length) return hits.flatMap(([, v]) => v);
  }
  return [];
}

module.exports = {
  SCRIPT_FAMILIES, shortRefRe, NAMED_OBJECT_ALT, ARTIFACT_ALT, SEARCH_CONVENTIONS,
  ROOT, RESEARCH, HISTORY, GENERATED,
  allFiles, allMarkdown, bodyMarkdown, historyMarkdown, scripts,
  rel, isHistory, read, norm, sectionsOf, headingsOf, paragraphIndex, resolveRef, byBasename,
};
