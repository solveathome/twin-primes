// ============================================================================
// QC / CHECKS — the rules, one function each
// ============================================================================
// Each check returns { name, description, findings: [...] }. A finding carries
// file, line, what is wrong, and where to look. None of them edit anything.
//
// Every rule here exists because the 2026-08-17 campaign found the defect in the
// wild. The comment above each says which, so nobody removes a check without
// knowing what it caught.
//
// RULES ONLY. Three checks suppress findings a human has already ruled on, and
// none of those verdicts are in this file: they are project data and live in
// ledgers.js. What stays here is the mechanism by which a suppression lapses,
// which is engine. The split is what makes this file portable.
// ============================================================================

'use strict';

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const C = require('./corpus');
// Adjudications live in ledgers.js: which findings a human already ruled on,
// and why. They are this project's DATA and the checks below are the engine, so
// porting takes this file unchanged and starts that one empty.
//
// Required, not probed. selftest.js writes its own empty ledgers.js into the
// fixture, so the fixture states "no suppressions here" rather than inheriting
// that by accident of a file failing to resolve. Losing this file in the repo
// is then a hard error at load, not a run that quietly returns every
// adjudicated finding as if it were new.
const L = require('./ledgers');

// ---------------------------------------------------------------------------
// 1. REFERENCES. Caught research/maier-matrix.md:282 citing origin-excess.md
//    §6c, a section that does not exist. Cheap, mechanical, and the corpus
//    navigates by these pointers.
//
//    PROSE_RE was added after an instrument audit on 2026-08-17 showed the §
//    patterns were blind to the form the corpus actually uses most often in
//    running text, "U-FRAME section 4 and section 6a", which is exactly the
//    shape of the orphan gate-multiplies.md:332 carried. The corpus holds 20
//    such pointers. All 20 resolved when the gap was found, so this check was
//    not covering up a live defect, but nothing was stopping the next edit from
//    creating one silently. The probe was confirmed against a known positive
//    before the zero was believed, which is the standing rule.
// ---------------------------------------------------------------------------
function refs() {
  const findings = [];
  // Match the complete extension: factor-windows.json was previously read
  // as factor-windows.js and reported as missing (2026-09-05 data audit).
  const PATH_RE = /(?:^|[\s(`\[])((?:research|paper|web|attestation)\/[A-Za-z0-9._\/-]+\.(?:md|json|js))\b/g;
  // THE WHOLE LABEL, NOT THE INTEGER PREFIX (2026-08-20). `§6.5`, `§6.9` and
  // `§6` used to be the same token to this check, and `§P6` / `§Theorem B`
  // matched no pattern at all: three real dead references cleared for two
  // audit waves that way (verify-the-verifier-checks.md B2/§5). The capture
  // takes dots and hyphens, plus one optional short capitalised second token
  // for the "§Theorem B" shape.
  const SEC_RE = /([A-Za-z0-9._-]+\.md)[`'"\)\]]*\s*(?:,\s*)?§§?\s*([A-Za-z0-9][A-Za-z0-9.\-]*(?: [A-Z][0-9a-z]?(?![\w.]))?)/g;
  const SHORT_RE = C.shortRefRe();   // project naming lives in corpus.js, not here
  // "<doc> section 4", "<doc> sections 4 and 6a", "section 4 of <doc>", and —
  // since 2026-08-20 — "<doc> in section 4", where one stopword used to
  // disable the pattern entirely.
  const PROSE_A = /([A-Za-z0-9][A-Za-z0-9._-]{2,})[`'"\)\]]*\s+(?:(?:in|at|under)\s+)?sections?\s+([0-9]+[a-zA-Z]?)(?:\s+and\s+(?:section\s+)?([0-9]+[a-zA-Z]?))?/gi;
  const PROSE_B = /sections?\s+([0-9]+[a-zA-Z]?)\s+of\s+[`'"]?([A-Za-z0-9][A-Za-z0-9._-]{2,})/gi;
  const REL_RE = /(?:^|[\s(`\[])([a-z0-9][A-Za-z0-9._-]*\/[A-Za-z0-9._\/-]+\.(?:md|json|js))\b/g;

  const deadSection = (src, line, targetBase, label, secs) => {
    findings.push({
      file: src, line, kind: 'dead-section',
      detail: `${targetBase} §${label}`,
      note: `target has: ${[...secs].join(',')}`,
    });
  };
  // A `§` reference into a file with no parseable labels used to RETURN EARLY
  // and clear silently; the corpus's real instances were all defects. Distinct
  // kind so the fix is obvious: either the target needs labels or the pointer
  // needs a real section.
  const unsectioned = (src, line, targetBase, label) => {
    findings.push({
      file: src, line, kind: 'section-into-unsectioned-file',
      detail: `${targetBase} §${label} — the target has no parseable section labels`,
      note: 'a § pointer into an unlabelled file resolves to nothing a reader can find',
    });
  };
  // Cleared when the whole label matches, or — for the optional-second-token
  // capture — when the first token alone does ("see §4 A further point" must
  // not manufacture a dead `§4 A`); ranges (`§§1-2`) clear when BOTH endpoints
  // are labels; the human alias `§Q4.2` clears when the target carries both
  // `q4` and `4.2` (a Q-sectioned file numbering its subsections bare).
  const secLabelOk = (secs, label) => {
    const l = label.toLowerCase().replace(/[.\-]+$/, '');
    if (secs.has(l)) return true;
    if (l.includes(' ') && secs.has(l.split(' ')[0].replace(/[.\-]+$/, ''))) return true;
    const range = /^(\d+[a-z]?)-(\d+[a-z]?)$/.exec(l);
    if (range && secs.has(range[1]) && secs.has(range[2])) return true;
    const alias = /^([a-z]+)(\d+)\.(\d+[a-z]?)$/.exec(l);
    if (alias && secs.has(alias[1] + alias[2]) && secs.has(alias[2] + '.' + alias[3])) return true;
    return false;
  };

  const proseSection = (src, line, token, nums) => {
    const hits = C.resolveRef(token);
    if (!hits.length || !hits[0].endsWith('.md')) return;   // unresolvable prose is not a pointer
    const secs = C.sectionsOf(hits[0]);
    for (const n of nums) {
      if (!n) continue;
      if (!secs.size) { unsectioned(src, line, path.basename(hits[0]), n); continue; }
      if (secs.has(n.toLowerCase())) continue;
      findings.push({
        file: src, line, kind: 'dead-section',
        detail: `${path.basename(hits[0])} section ${n}`,
        note: `target has: ${[...secs].join(',')}`,
      });
    }
  };

  for (const f of C.bodyMarkdown) {
    const src = C.rel(f);
    // A path inside a fenced code block is an EXAMPLE, not a pointer: the
    // mutation matrix scored a dead path inside a ```sh block as this check's
    // one false positive (verify-the-verifier-checks.md M26). Fences are
    // skipped; prose paths keep their obligations.
    let fence = false;
    C.read(f).split('\n').forEach((ln, i) => {
      if (/^\s*```/.test(ln)) { fence = !fence; return; }
      if (fence) return;
      const line = i + 1;
      for (const m of ln.matchAll(PATH_RE))
        if (!fs.existsSync(path.join(C.ROOT, m[1])) && !L.INTENDED_MISSING.has(m[1]))
          findings.push({ file: src, line, kind: 'dead-path', detail: m[1] });

      for (const m of ln.matchAll(SEC_RE)) {
        const hits = C.resolveRef(path.basename(m[1]));
        if (!hits.length) { findings.push({ file: src, line, kind: 'dead-path', detail: m[1] }); continue; }
        const secs = C.sectionsOf(hits[0]);
        if (!secs.size) { unsectioned(src, line, path.basename(m[1]), m[2]); continue; }
        if (!secLabelOk(secs, m[2]))
          deadSection(src, line, path.basename(m[1]), m[2], secs);
      }

      for (const m of ln.matchAll(SHORT_RE))
        if (!C.resolveRef(m[1]).length)
          findings.push({ file: src, line, kind: 'dead-shorthand', detail: m[1] });

      for (const m of ln.matchAll(PROSE_A)) proseSection(src, line, m[1], [m[2], m[3]]);
      for (const m of ln.matchAll(PROSE_B)) proseSection(src, line, m[2], [m[1]]);

      // RELATIVE PATHS. PATH_RE above only matches the four top-level prefixes,
      // so every relative link was invisible: history/CHANGELOG.md, qc/README.md,
      // staging/applied-D.md all resolve fine from their citing directory and
      // were never checked, and so did scratchpad/anchored-check.js, which does
      // not exist. Partition S2 found that one by reading; nothing could have
      // flagged it. Resolve against the citing file's directory first, then the
      // repo root, and only then call it dead.
      for (const m of ln.matchAll(REL_RE)) {
        const p = m[1];
        if (/^(?:research|paper|web|attestation)\//.test(p)) continue;   // PATH_RE owns these
        if (L.INTENDED_MISSING.has(p)) continue;
        // Resolve the way a reader does: against the citing file's directory,
        // then each ancestor up to the repo root. research/qc/README.md writes
        // "qc/checks.js", which is correct read from research/, and the first
        // draft flagged it. Prose relative paths are not shell paths.
        const fromDir = path.resolve(path.dirname(f), p);
        let resolved = false;
        for (let dir = path.dirname(f); dir.startsWith(C.ROOT); dir = path.dirname(dir)) {
          if (fs.existsSync(path.join(dir, p))) { resolved = true; break; }
          if (dir === C.ROOT) break;
        }
        if (resolved || fs.existsSync(path.join(C.ROOT, p))) continue;
        // Do NOT skip when the parent directory is missing. That was the first
        // draft's guard, meant to spare references to other repositories, and it
        // suppressed the very case this was built for: anchored-windows.md cites
        // scratchpad/anchored-check.js for a table nothing in the repo can
        // reproduce, and research/scratchpad/ does not exist either. A missing
        // parent is what a vanished session directory looks like, so it is the
        // signal and not the exemption. Genuine external references belong in
        // INTENDED_MISSING in ledgers.js with a stated reason, the pattern the
        // framework already uses for forward-looking paths.
        findings.push({ file: src, line, kind: 'dead-relative-path', detail: p,
          note: `resolved against ${C.rel(path.dirname(fromDir))}/ and against the repo root; neither exists` });
      }
    });
  }
  return { name: 'refs', description: 'internal references resolve to a file and a section', findings };
}

// ---------------------------------------------------------------------------
// 2. DEAD QUOTATIONS. The campaign's dominant defect class: 14 of 15 orphaned
//    claims were a document quoting a sister that had since been corrected.
//    gate-multiplies.md:332 attributes "15 to 45 percent ... TRENDING DOWN" to
//    U-FRAME, which now says 77 to 214 percent and not falling. The reference
//    resolves; only the phrase is dead, so refs() is blind to it.
//
//    Precision matters more than recall here: a false positive costs an applier
//    real time. So a span is only checked when an ATTRIBUTION CUE sits near it,
//    which is what distinguishes "X reports '...'" from prose that happens to
//    contain a quoted phrase.
// ---------------------------------------------------------------------------
const ATTRIB = /\b(says?|said|reports?|states?|stating|calls?|called|per|according to|quoted?|quotes|quoting|notes?|noted|records?|recorded|establishes?|argues?|claims?|describ\w+|reads?)\b/i;
const MIN_WORDS = 6;

// A quotation reproduced IN ORDER TO CORRECT IT is not a dead quotation, it is
// the house rule "refutations stay visible" working as intended. The live
// instance is paper/staircase-note.md:287, which quotes natal-cap-08-staircase.js
// saying "exact < RS < PNT at all four levels" precisely because the script's own
// output refutes it at @19. Flagging that would ask an applier to delete the
// correction. Found during the 2026-08-17 instrument audit.
const REFUTING = /\b(correct\w*|refut\w*|wrongly|incorrect\w*|stale|superseded|no longer|used to|mistaken\w*|rebut\w*|overturn\w*|disagree\w*|contradict\w*)\b/i;

// THE FUZZY TIER IS CONTIGUOUS OR IT IS NOTHING (2026-08-20). The old
// fallback cleared a span when 95% of its words LONGER THAN THREE CHARACTERS
// appeared anywhere in the target file: word order invisible, every short word
// invisible — so a quotation that GAINED the word "not", or changed an
// exponent word, cleared (verify-the-verifier-checks.md B4, mutations
// M05/M05c). What replaces it: the span clears only if it appears contiguously
// (exact, already tested), or split on an explicit elision marker with every
// part exact and in order, or as TWO exact halves in order with one bounded
// gap — the shapes an honest excerpt actually takes.
function fuzzyContiguous(q, text) {
  const parts = q.split(/\s*(?:\.\.\.|…)\s*/).filter(p => p.length >= 4);
  if (parts.length > 1) {
    let at = 0;
    for (const p of parts) {
      const i = text.indexOf(p, at);
      if (i === -1) return false;
      at = i + p.length;
    }
    return true;
  }
  const words = q.split(' ').filter(Boolean);
  for (let k = 3; k <= words.length - 3; k++) {
    const A = words.slice(0, k).join(' ');
    const iA = text.indexOf(A);
    if (iA === -1) continue;
    const B = words.slice(k).join(' ');
    const iB = text.indexOf(B, iA + A.length);
    if (iB !== -1 && iB - (iA + A.length) <= 240) return true;
  }
  return false;
}

function quotes() {
  const findings = [];
  const seen = new Set();
  let checked = 0, spansSeen = 0, droppedNoAttrib = 0, droppedNoToken = 0, droppedRefuting = 0, fuzzyCleared = 0;

  for (const f of C.bodyMarkdown) {
    const src = C.rel(f);
    // The framework's own documentation quotes example phrases in order to
    // describe the checks that hunt them. Same exclusion `absence` and
    // `search-convention` already apply, adopted here 2026-08-20 when the
    // contiguity tier (correctly) stopped clearing qc/README.md's examples.
    if (src.startsWith('research/qc/')) continue;
    const lines = C.read(f).split('\n');

    // Paragraph index: contiguous non-blank, non-heading, non-fence lines. The
    // document token that names the source is often on the paragraph's first
    // line while the quotation sits on its third, and the original same-line
    // rule dropped half of all attributed quotations for exactly that reason
    // (32 with an attribution cue, 16 surviving the token test, 3 reaching a
    // target). Widening to the paragraph rather than to a fixed line window
    // keeps the property the line rule was protecting: list items and table
    // rows sit adjacent while being about unrelated documents, so each is its
    // own paragraph and never merges with its neighbour.
    //
    // Lifted into corpus.js on 2026-08-18 when `search-convention` needed the
    // same rule. It was moved rather than copied: two paragraph builders that
    // disagree about whether a table row is its own unit would give two answers
    // to the same question about the same file.
    const para = C.paragraphIndex(lines);

    lines.forEach((ln, i) => {
      // Extract quoted spans first, so the coverage counters below measure the
      // real denominator. Smart and straight quotes are handled separately so a
      // line mixing them cannot yield the GAP between two quotations as a span.
      const spans = [];
      for (const m of ln.matchAll(/[“]([^“”]{20,400})[”]/g)) spans.push(m[1]);
      const straight = ln.match(/"/g);
      if (straight && straight.length % 2 === 0)
        for (const m of ln.matchAll(/"([^"]{20,400})"/g)) spans.push(m[1]);

      const real = spans.filter(raw => {
        if (/^\s|\s$/.test(raw)) return false;           // ragged span, a parse artifact
        const w = C.norm(raw).split(' ').filter(Boolean);
        if (w.length < MIN_WORDS) return false;          // terminology, not quotation
        // A title is not a claim. Title Case with no sentence punctuation.
        return !(/^([A-Z][a-z]+\s+){3,}[A-Z]?[a-z]*$/.test(raw.trim()) && !/[.,;:]/.test(raw));
      });
      spansSeen += real.length;
      if (!real.length) return;

      // The ATTRIBUTION CUE stays close: same line, or the previous line when it
      // continues this paragraph. That is what distinguishes "X reports '...'"
      // from prose that happens to contain a quoted phrase, and loosening it
      // would flag every quoted definition in the corpus.
      const prev = i > 0 ? lines[i - 1] : '';
      const continues = prev.trim() !== '' && !/^\s*(?:[-+]\s|\*\s|\d+\.\s|\|)/.test(ln) && !/^\s*#/.test(prev);
      const scope = continues ? prev + ' ' + ln : ln;
      // Second tier, added 2026-08-17. The verb list misses the two forms the
      // corpus actually favours: the possessive, GLOSSARY.md's "…", and the
      // noun, "the recommendation in exponent-control.md §8, that … is '…'".
      // A quotation on a line that NAMES A RESOLVABLE DOCUMENT is an attribution
      // whatever verb it uses. Corpus-wide this tier adds 8 spans and two of
      // them were live dead quotations, so the precision is worth the recall.
      const namesDoc = [...scope.matchAll(
        new RegExp(`\\b([A-Z][A-Z0-9-]{2,}(?:\\.md)?|[a-z0-9]+(?:-[a-z0-9]+){1,4}\\.(?:md|js)|${C.NAMED_OBJECT_ALT})\\b`, 'g'))]
        .some(m => C.resolveRef(m[1]).length);
      if (!ATTRIB.test(scope) && !namesDoc) { droppedNoAttrib += real.length; return; }

      // A quotation carried in order to correct it is the house rule working.
      if (REFUTING.test(para[i] || scope)) { droppedRefuting += real.length; return; }

      // The DOCUMENT TOKEN may sit anywhere in the paragraph. It routinely names
      // the source in the paragraph's first sentence while the quotation lands
      // two lines later, and the same-line rule threw those away.
      const tokens = new Set();
      for (const m of (para[i] || scope).matchAll(
        new RegExp(`\\b([A-Z][A-Z0-9-]{2,}(?:\\.md)?|[a-z0-9]+(?:-[a-z0-9]+){1,4}\\.(?:md|js)|${C.NAMED_OBJECT_ALT})\\b`, 'g')))
        tokens.add(m[1]);
      if (!tokens.size) { droppedNoToken += real.length; return; }

      for (const raw of real) {
        const q = C.norm(raw);
        const words = q.split(' ').filter(Boolean);

        const tried = [];
        let cleared = false;
        for (const tok of tokens) {
          for (const target of C.resolveRef(tok)) {
            if (target === f) { cleared = true; break; }  // self-reference
            const text = C.norm(C.read(target));
            tried.push(C.rel(target));
            if (text.includes(q)) { cleared = true; break; }
            if (words.length >= MIN_WORDS && fuzzyContiguous(q, text)) {
              cleared = true; fuzzyCleared++; break;
            }
          }
          if (cleared) break;
        }
        if (!tried.length) continue;
        checked++;
        if (cleared) continue;
        const key = `${src}:${i + 1}:${q.slice(0, 60)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        findings.push({
          file: src, line: i + 1, kind: 'dead-quotation',
          detail: raw.length > 140 ? raw.slice(0, 137) + '…' : raw,
          note: `not found in ${[...new Set(tried)].join(', ')}`,
        });
      }
    });
  }
  // The denominator is printed on purpose. Before the 2026-08-17 instrument
  // audit this check reported "3 checked" and nothing else, and 3 reads like a
  // corpus with three quotations rather than what it was: 2.4% coverage of the
  // campaign's dominant defect class. A check that cannot say what it did not
  // look at invites the reader to mistake silence for cleanliness.
  return {
    name: 'quotes',
    description: `attributed quotations still present in the document they cite `
      + `(${checked} of ${spansSeen} quoted spans reached a target; `
      + `${fuzzyCleared} cleared by the contiguous-excerpt tier rather than exact match; `
      + `${droppedNoAttrib} carry no attribution cue, ${droppedNoToken} name no document, `
      + `${droppedRefuting} are quoted in order to be corrected)`,
    findings,
  };
}

// ---------------------------------------------------------------------------
// 3. CROSSLINKS. Chris made crosslinking the safety condition for splitting and
//    moving documents: "As long as our md files are internally crosslinked we
//    are super happy to move things around." So a document nothing points at is
//    unreachable, and a split whose child does not point home is half-done.
//
//    Two corrections from the 2026-08-17 instrument audit, both found by running
//    the check against known positives rather than by reading it:
//
//    (a) HISTORY MUST NOT CONFER REACHABILITY. The original counted a mention in
//    any file including research/history/, and staging alone holds nine wave-1
//    reports plus six applied-*.md that name most of the corpus by path. A
//    document cited only by a spent audit is not reachable by a reader; it was
//    passing on the strength of the record of its own retirement. Verified on a
//    fixture: an orphan cited by one history file scored clean.
//
//    (b) MENTIONED IS NOT REACHED. Counting inbound edges lets a clique of
//    orphans clear each other. Two files that cite only one another both scored
//    clean on a fixture while neither was reachable from any entry point. The
//    fix is a transitive walk from the entry set over body-only edges, which is
//    what "a reader can get there" actually means.
// ---------------------------------------------------------------------------
// Entry points are allowed to have nothing pointing at them.
// CLAUDE.md is loaded automatically at session start — an entry by mechanism.
const ENTRY = new Set(['README.md', 'TODO.md', 'research/README.md', 'paper/PAPERS.md',
  'attestation/README.md', 'web/PROPOSAL.md', 'web/bench/README.md', 'CLAUDE.md']);

function crosslinks() {
  const findings = [];
  // A REAL POINTER, NOT A SUBSTRING COLLISION (2026-08-20). The old predicate
  // accepted the bare stem anywhere, so a file named `G2.md` was "reachable"
  // from every document that mentions G2 — nearly all of them — with no link
  // existing (verify-the-verifier-checks.md B7, mutation M25). What counts
  // now: the basename with its extension, a backticked or bracketed stem, or
  // a bare stem distinctive enough to BE a pointer (this corpus's filenames:
  // hyphenated, seven characters or more). A short plain-word stem match
  // proves nothing either way and is reported as such.
  const distinctive = (stem) => stem.length >= 7 && stem.includes('-');
  const mentions = (text, g) => {
    const base = path.basename(g);
    if (text.includes(base)) return true;
    const stem = base.replace(/\.md$/, '');
    if (text.includes('`' + stem + '`') || text.includes('[' + stem + ']')) return true;
    return distinctive(stem) && text.includes(stem);
  };
  const weaklyMentioned = (text, g) => text.includes(path.basename(g).replace(/\.md$/, ''));

  // Body-only inbound counts. History is evidence, never a citation source.
  const inbound = new Map(C.bodyMarkdown.map(f => [C.rel(f), 0]));
  for (const f of C.bodyMarkdown) {
    const text = C.read(f);
    for (const g of C.bodyMarkdown) {
      if (g === f) continue;
      if (mentions(text, g)) inbound.set(C.rel(g), inbound.get(C.rel(g)) + 1);
    }
  }

  // Transitive reach from the entry set, over body-only edges.
  const byRel = new Map(C.bodyMarkdown.map(f => [C.rel(f), f]));
  const reached = new Set([...ENTRY].filter(e => byRel.has(e)));
  const queue = [...reached];
  while (queue.length) {
    const text = C.read(byRel.get(queue.pop()));
    for (const g of C.bodyMarkdown) {
      const r = C.rel(g);
      if (reached.has(r) || !mentions(text, g)) continue;
      reached.add(r);
      queue.push(r);
    }
  }

  for (const [file, n] of inbound) {
    if (ENTRY.has(file)) continue;
    if (n === 0) {
      // Distinguish "nothing points here" from "only a short plain-word stem
      // appears, which proves nothing": the latter needs a real link written,
      // not a verdict of orphanhood.
      const g = byRel.get(file);
      const weak = C.bodyMarkdown.some(f => f !== g && weaklyMentioned(C.read(f), g));
      findings.push(weak ? {
        file, line: 1, kind: 'reachability-unprovable',
        detail: 'only bare short-stem mentions point at this file, which a topic word satisfies without any link existing',
        note: 'write a real pointer — the basename with .md, or a backticked stem — from the note that owns the topic',
      } : {
        file, line: 1, kind: 'unreachable',
        detail: 'no other working document references this file',
        note: 'a mention in research/history/ does not count: cite it from the relevant note, or move it to history/',
      });
    } else if (!reached.has(file))
      findings.push({
        file, line: 1, kind: 'off-the-path',
        detail: `cited by ${n} document(s), none of them reachable from an entry point`,
        note: 'a clique of documents citing each other is still unreachable: link it into the reading path',
      });
  }

  return { name: 'crosslinks', description: 'every working document is reachable from an entry point', findings };
}

// ---------------------------------------------------------------------------
// 4. SCRIPT PROVENANCE. Chris: "we need to be able to point exactly to where our
//    data was generated." Surfaces the correction banners rather than hiding
//    them, because those headers are the only guard between a reader and a
//    runnable superseded number.
// ---------------------------------------------------------------------------
function scriptProvenance() {
  const findings = [];
  const vm = require('vm');
  for (const s of C.scripts) {
    const base = path.basename(s);
    const head = C.read(s).split('\n').slice(0, 40).join('\n');

    // A SCRIPT THAT DOES NOT PARSE IS AN UNREPRODUCIBLE RESULT. Every number in
    // this corpus is meant to be regenerable from research/, and a syntax error
    // silently converts a cited artifact into a dead one. Compiling without
    // running costs about a millisecond each and nothing was checking. All 134
    // parsed the day this was added, so it is a guard rather than a discovery.
    try {
      // Node runs research scripts as CommonJS modules, inside a function
      // wrapper, so a top-level `return` is legal there and illegal to a bare
      // vm.Script. Parse the way Node will run it (rho-exact-z31-01.js, 2026-08-28).
      const srcText = C.read(s);
      try { new vm.Script(srcText, { filename: base }); }
      catch (e0) {
        if (!/Illegal return/.test(String(e0 && e0.message))) throw e0;
        new vm.Script('(function(){\n' + srcText.replace(/^#!.*\n/, '\n') + '\n})', { filename: base });
      }
    } catch (e) {
      findings.push({ file: C.rel(s), line: e.lineNumber || 1, kind: 'does-not-parse',
        detail: String(e.message).split('\n')[0],
        note: 'a cited artifact that cannot run is a result nobody can reproduce' });
    }

    let title = null;
    for (const ln of C.read(s).split('\n').slice(0, 16)) {
      if (!/^\s*\/\//.test(ln)) continue;
      const t = ln.replace(/^\s*\/\/\s?/, '').trim();
      if (!t || /^[=\-*]+$/.test(t) || /^['"]use strict/.test(t)) continue;
      if (t.toLowerCase() === base.toLowerCase() || t.toLowerCase() === base.replace(/\.js$/, '').toLowerCase()) continue;
      if (/^\*{3}/.test(t)) continue;
      title = t; break;
    }
    if (!title)
      findings.push({ file: C.rel(s), line: 1, kind: 'no-banner-title',
        detail: 'script has no title in its header banner',
        note: 'a reader cannot tell what it computes without reading the code' });

    const cited = [...C.bodyMarkdown, ...C.historyMarkdown].some(m => {
      const t = C.read(m);
      const stem = base.replace(/\.js$/, '');
      return t.includes(base) || t.includes(stem);
    });
    if (!cited)
      findings.push({ file: C.rel(s), line: 1, kind: 'uncited-script',
        detail: 'no document references this script',
        note: 'an unreferenced result is a lost result' });
  }
  return { name: 'scripts', description: 'every script parses, is titled, and is referenced', findings };
}

// ---------------------------------------------------------------------------
// 5. TRANSFERRED CLAIMS. Three independent passes found the same signature: a
//    result copied into a summary keeps its citation, its calibration marker and
//    its numbers, and silently loses a HYPOTHESIS. G2-STATE dropped "with
//    y'^2 > x" from the Origin Excess Lemma, making it vacuous, and dropped "at
//    the needed constant" from a loose end. Six more were found in the papers.
//    Only a word-diff shows them, so this reports near-duplicate pairs that
//    differ, for a human to diff.
// ---------------------------------------------------------------------------
// The thirteen pairs already word-diffed and ruled on are DATA and live in
// ledgers.js as ADJUDICATED, each with the reason it was kept. What belongs here
// is only the mechanism: the key is a CONTENT FINGERPRINT of both passages,
// never a line number, so editing either side changes the fingerprint, lapses
// the suppression and brings the pair back for re-adjudication. Run with
// QC_FINGERPRINTS=1 to print the fingerprints of live findings.

function transfers({ jaccard = 0.45, minWords = 14 } = {}) {
  const INTENTIONAL = [
    /this document states current understanding/i,
    /superseded claims, retired numbers and the reasons they changed/i,
    /the framework, vocabulary, and driving questions are the author's/i,
  ];
  const units = [];
  for (const f of C.bodyMarkdown) {
    const lines = C.read(f).split('\n');
    let buf = [], start = 0, fence = false;
    const flush = end => {
      if (!buf.length) return;
      const raw = buf.join(' ');
      buf = [];
      if (INTENTIONAL.some(re => re.test(raw))) return;
      const words = C.norm(raw).split(' ').filter(Boolean);
      if (words.length < minWords) return;
      const sh = new Set();
      for (let i = 0; i + 5 <= words.length; i++) sh.add(words.slice(i, i + 5).join(' '));
      const fp = crypto.createHash('sha1').update(words.join(' ')).digest('hex').slice(0, 6);
      units.push({ file: C.rel(f), line: start + 1, endLine: end, words: words.length, sh, fp,
        preview: raw.slice(0, 100).replace(/\s+/g, ' ') });
    };
    lines.forEach((ln, i) => {
      if (/^\s*```/.test(ln)) { fence = !fence; flush(i); return; }
      if (fence) return;
      if (/^\s*$/.test(ln) || /^\s*#/.test(ln)) { flush(i); return; }
      if (!buf.length) start = i;
      buf.push(ln.replace(/^\s*[-*|>]\s*/, ''));
    });
    flush(lines.length);
  }

  const index = new Map();
  units.forEach((u, i) => { for (const s of u.sh) { if (!index.has(s)) index.set(s, []); index.get(s).push(i); } });
  const pairCount = new Map();
  for (const ids of index.values()) {
    if (ids.length > 40) continue;
    for (let a = 0; a < ids.length; a++) for (let b = a + 1; b < ids.length; b++)
      pairCount.set(`${ids[a]}:${ids[b]}`, 1);
  }

  const findings = [];
  let settled = 0;
  const show = process.env.QC_FINGERPRINTS === '1';
  const liveKeys = new Set();
  for (const key of pairCount.keys()) {
    const [i, j] = key.split(':').map(Number);
    const A = units[i], B = units[j];
    if (A.file === B.file) continue;
    let inter = 0;
    const [small, big] = A.sh.size < B.sh.size ? [A.sh, B.sh] : [B.sh, A.sh];
    for (const s of small) if (big.has(s)) inter++;
    const jac = inter / (A.sh.size + B.sh.size - inter);
    const contain = inter / small.size;
    if (jac < jaccard && contain < 0.7) continue;
    if (jac > 0.995) continue;                    // identical: nothing lost in transfer
    const fpKey = [A.fp, B.fp].sort().join(':');
    liveKeys.add(fpKey);
    liveKeys.add(`${B.fp}:${A.fp}`); liveKeys.add(`${A.fp}:${B.fp}`);
    if (L.ADJUDICATED.has(fpKey)) { settled++; continue; }
    findings.push({
      file: A.file, line: A.line, kind: 'transferred-claim',
      detail: `${A.file}:${A.line}-${A.endLine} vs ${B.file}:${B.line}-${B.endLine} (j=${jac.toFixed(2)} c=${contain.toFixed(2)})`
        + (show ? `  [fp ${fpKey}]` : ''),
      note: 'near-duplicate that DIFFERS: word-diff both for a dropped hypothesis or qualifier',
    });
  }
  // A VANISHED ADJUDICATION IS A FINDING (2026-08-20). This check finds
  // candidates by similarity, and dropping a big enough hypothesis takes the
  // pair BELOW the threshold: the pair leaves the candidate set, the
  // adjudicated key matches nothing, and nothing is reported in either
  // direction — the bigger the drop, the less likely the check sees it
  // (verify-the-verifier-checks.md B3, mutation M09f took a real pair from
  // c=0.89 to c=0.57 with a four-token scope). An adjudicated key matching no
  // live pair means either that, or a stale/invented ledger entry; both need
  // a human. Superseded keys belong in ADJUDICATED_RETIRED in ledgers.js,
  // where the reason survives without suppressing anything.
  for (const key of L.ADJUDICATED.keys()) {
    if (liveKeys.has(key)) continue;
    findings.push({
      file: 'research/qc/ledgers.js', line: 1, kind: 'adjudicated-pair-vanished',
      detail: `ADJUDICATED key ${key} matches no live candidate pair`,
      note: 'either a passage was edited past the similarity threshold (word-diff both sides NOW — a dropped hypothesis lowers similarity), or the entry is stale: move it to ADJUDICATED_RETIRED with the reason intact',
    });
  }
  findings.sort((a, b) => a.file.localeCompare(b.file));
  return {
    name: 'transfers',
    description: 'near-duplicate passages that are STILL similar enough to compare, and differ'
      + (settled ? ` (${settled} adjudicated KEEP and suppressed; they return if either side is edited)` : '')
      + '. A pair edited BELOW the threshold is caught only through its vanished adjudication; a claim existing in one place only is outside this check by construction',
    findings,
  };
}

// ---------------------------------------------------------------------------
// 6. CALIBRATION AGREEMENT. The campaign's dominant defect in its sharpest form:
//    the same named object carried at one strength in its home and a stronger one
//    somewhere above it. Two confirmed instances, and both were caught by a human
//    opening the artifact rather than by any check.
//
//    natal-cap-23's script banner was retitled "the anticorrelation PROVEN in
//    aggregate" while the artifact's own status table reads "[OPEN] the aggregate
//    theorem ... for all x". The Fused-Window Calm Lemma sat under "Proven:" in
//    README while its home graded four legs separately, two of them not proven.
//
//    A marker only counts when it is ATTACHED to the name: inside the bracket or
//    parenthesis that follows it, or the next table cell. Pairing every name in a
//    paragraph with every marker in it makes status tables, which legitimately
//    carry a dozen markers for a dozen objects, produce a finding per row. The
//    first draft of this check did exactly that and reported 22 objects, all of
//    them noise.
// ---------------------------------------------------------------------------
const OBJECT_NAME = /\b((?:[A-Z][A-Za-z0-9'’-]*\s+){1,4}(?:Lemma|Theorem|Conjecture|Postulate|Principle|Law|Bound|Hypothesis|Proposition|Identity))\b/g;
const MARKER = /\b(PROVEN|THEOREM|CERTIFIED|VERIFIED|MEASURED|OPEN|REFUTED|INFERRED|PREDICTED|HEURISTIC|CONJECTURE|FIT)\b/;
const SETTLED = new Set(['PROVEN', 'THEOREM', 'CERTIFIED']);
// A SYNONYM IS INVISIBLE TO A CLOSED VOCABULARY (2026-08-20). `ESTABLISHED`
// carried next to a named object claims settled strength and matched nothing
// (verify-the-verifier-checks.md B6, mutation M12c). Marker-shaped (ALL-CAPS)
// settled-sounding words outside the twelve-word vocabulary are reported, so
// the vocabulary grows from evidence instead of by surprise.
const MARKER_SYNONYM = /\b(ESTABLISHED|SETTLED|DEMONSTRATED|CONFIRMED|DEFINITIVE|FINAL)\b/;

function calibration() {
  const byName = new Map();
  const findings = [];
  for (const f of C.bodyMarkdown) {
    if (C.rel(f).startsWith('research/qc/')) continue;   // the framework documents its own vocabulary
    C.read(f).split('\n').forEach((ln, i) => {
      for (const m of ln.matchAll(OBJECT_NAME)) {
        const name = m[1].trim().replace(/\s+/g, ' ');
        const after = ln.slice(m.index + m[1].length, m.index + m[1].length + 50);
        const hit = MARKER.exec(after);
        if (!hit) {
          const syn = MARKER_SYNONYM.exec(after);
          if (syn && !/[.;]\s/.test(after.slice(0, syn.index)))
            findings.push({ file: C.rel(f), line: i + 1, kind: 'unmarked-strength-word',
              detail: `"${name}" carries ${syn[1]}, which is not in the marker vocabulary`,
              note: 'a settled-sounding word outside the twelve markers is invisible to the calibration check: use a real marker, or add the word to the vocabulary deliberately' });
          continue;
        }
        // A marker on the far side of a sentence break belongs to the next
        // sentence, not to this name.
        if (/[.;]\s/.test(after.slice(0, hit.index))) continue;
        if (!byName.has(name)) byName.set(name, []);
        byName.get(name).push({ file: C.rel(f), line: i + 1, mark: hit[1] });
      }
    });
  }
  let crossFile = 0;
  for (const [name, sites] of byName) {
    if (new Set(sites.map(s => s.file)).size < 2) continue;
    crossFile++;
    const marks = new Set(sites.map(s => s.mark));
    if (marks.size < 2) continue;
    const settled = [...marks].filter(m => SETTLED.has(m));
    const unsettled = [...marks].filter(m => !SETTLED.has(m));
    if (!settled.length || !unsettled.length) continue;
    // Report the WEAKEST site first: the home is usually the careful one, so the
    // stronger claim is usually the defect. Usually, not always, which is why
    // this is a candidate and not a verdict.
    const weakest = sites.find(s => !SETTLED.has(s.mark));
    findings.push({
      file: weakest.file, line: weakest.line, kind: 'calibration-disagreement',
      detail: `"${name}" is ${settled.join('/')} in ${
        [...new Set(sites.filter(s => SETTLED.has(s.mark)).map(s => s.file))].join(', ')
      } and ${unsettled.join('/')} in ${
        [...new Set(sites.filter(s => !SETTLED.has(s.mark)).map(s => s.file))].join(', ')}`,
      note: 'open both: an object proven in one document and open in another is a defect in one of them, unless the two are scoped differently and neither says so',
    });
  }
  return {
    name: 'calibration',
    description: `the same named object carried at the same strength everywhere `
      + `(${byName.size} named objects carry an attached marker; ${crossFile} appear with one in more than one file)`,
    findings,
  };
}

// ---------------------------------------------------------------------------
// 7. ABSENCE CLAIMS. The one class nothing can verify, so this enumerates it.
//
// Wave 4's worst finding: three documents said the @13 beyond-Chebyshev bound
// had never been run, while natal-cap-27-t4-at13.js had computed it, printed the
// theorem, and sat in the same directory under a matching name. Wave 2 wrote that
// claim from the document recording the INTENTION rather than the artifact
// recording the RESULT.
//
// `refs` confirms that what is cited exists. NOTHING confirms that what is said
// not to exist does not exist, because the claim is about the absence of a file
// rather than the content of one. That asymmetry is permanent and no check can
// close it.
//
// What a check CAN do is make the list finite, named and dated, so that verifying
// it is a bounded job instead of an act of faith. Every absence claim whose
// paragraph names a resolvable artifact is reported unless it carries a dated
// VERIFIED entry in ledgers.js.
//
// Those nine entries are DATA and are kept out of this file, with the trap that
// makes them different from the transfers ledger stated beside them: an absence
// claim can be falsified WITHOUT ITS SENTENCE CHANGING, so no fingerprint can
// make one of these verifications permanent. Re-verify them whenever a wave adds
// scripts. The check says so on every run.
// ---------------------------------------------------------------------------
const ABSENCE_RE = /\b(never (?:run|started|computed|tried|attempted|been run)|not (?:yet )?(?:run|started|computed|attempted)|has not been (?:run|computed)|does not exist|nobody has (?:tried|run|computed)|was never attempted|not been done)\b/i;

function absenceClaims() {
  const findings = [];
  // .md was missing from the first draft, and it cost a real miss the same day:
  // README.md said "@17 is not run" in a paragraph naming only .md files, so the
  // artifact list came back empty and the claim was discarded unchecked. The
  // paragraph that carries an absence claim is often a summary citing summaries,
  // which is precisely the layer where this defect lives.
  const ART = new RegExp(`\\b(${C.ARTIFACT_ALT}|[A-Za-z0-9]+(?:-[A-Za-z0-9]+){0,4}\\.(?:js|md))\\b`, 'g');
  let scanned = 0, verified = 0;

  for (const f of C.bodyMarkdown) {
    // The framework's own documentation describes this check, so it necessarily
    // contains the phrases it hunts. Excluding qc/ is the same rule that keeps
    // INTENDED_MISSING in code rather than in prose.
    if (C.rel(f).startsWith('research/qc/')) continue;
    const lines = C.read(f).split('\n');
    lines.forEach((ln, i) => {
      const m = ABSENCE_RE.exec(ln);
      if (!m) return;
      scanned++;
      let a = i; while (a > 0 && lines[a - 1].trim() !== '' && !/^\s*#/.test(lines[a - 1])) a--;
      let b = i; while (b < lines.length - 1 && lines[b + 1].trim() !== '') b++;
      const para = lines.slice(a, b + 1).join(' ');
      // A claim that something does not exist IN THE LITERATURE is a different
      // class with a different owner: PRIOR-ART.md audits it, and it is settled
      // by searching journals rather than by listing a directory. Both instances
      // in this corpus name an artifact in the same paragraph incidentally, which
      // is exactly how a paragraph-scoped pairing misfires.
      // The guard runs over the PARAGRAPH, not the line: "the two-class analogue
      // that does not exist" and "in the literature" are split across a wrap.
      // The window runs BOTH ways. "a targeted literature check has not been
      // run" puts the disqualifying word before the phrase, not after, and a
      // forward-only window missed it.
      const at = para.indexOf(m[0]);
      const tail = at >= 0 ? para.slice(Math.max(0, at - 90), at + 160)
                           : ln.slice(Math.max(0, m.index - 90), m.index + 160);
      if (/\b(in the literature|in print|published|literature|no paper|no such paper|survey|prior art)\b/i.test(tail)) return;
      // A quoted subject is a NAMED MECHANISM rather than a file: `none
      // ("Buchstab with exact strata" does not exist)` asserts that an idea has
      // no instance, which no directory listing can settle either way.
      const before = (at >= 0 ? para.slice(Math.max(0, at - 40), at) : ln.slice(Math.max(0, m.index - 40), m.index));
      if (/["”'’)]\s*$/.test(before)) return;
      const arts = [...new Set([...para.matchAll(ART)].map(x => x[1]))].filter(t => C.resolveRef(t).length);
      if (!arts.length) return;             // no artifact named: not a checkable claim
      const key = `${C.rel(f)}|${m[1].toLowerCase()}`;
      if (L.ABSENCE_VERIFIED.has(key)) {
        verified++;
        // A DATED VERIFICATION LAPSES (2026-08-20). An absence claim is
        // falsified by a new artifact WITHOUT its sentence changing, so a
        // ledger entry can only ever be true as of its date — and this corpus
        // adds scripts daily. Fourteen days is the review interval: past it,
        // the suppression stops being silent (verify-the-verifier-checks.md
        // B8; mutation M19 confirmed the trap end to end).
        const reason = L.ABSENCE_VERIFIED.get(key);
        const dm = /(\d{4})-(\d{2})-(\d{2})/.exec(reason || '');
        const age = dm ? (Date.now() - new Date(`${dm[1]}-${dm[2]}-${dm[3]}`)) / 86400000 : Infinity;
        if (age > 14)
          findings.push({
            file: C.rel(f), line: i + 1, kind: 'absence-stale',
            detail: `the ABSENCE_VERIFIED entry for "${m[1]}" is ${dm ? Math.floor(age) + ' days old' : 'undated'}`,
            note: 're-verify: open the artifact set as it stands TODAY, then re-date the ledger entry. An absence verification does not survive the world changing underneath it',
          });
        return;
      }
      findings.push({
        file: C.rel(f), line: i + 1, kind: 'unverified-absence-claim',
        detail: `"${m[1]}" beside ${arts.slice(0, 3).join(', ')}`,
        note: 'no check can confirm this: open the artifact and list the directory, then record the verdict in ABSENCE_VERIFIED in qc/ledgers.js',
      });
    });
  }
  return {
    name: 'absence',
    description: `claims that an artifact does NOT exist, which nothing can verify `
      + `(${scanned} absence phrases, ${verified} verified and dated, ${findings.length} unverified). `
      + `RE-VERIFY THE DATED ONES WHENEVER A WAVE ADDS SCRIPTS: an absence claim is falsified by a new artifact without its own sentence changing`,
    findings,
  };
}

// ---------------------------------------------------------------------------
// SOURCING — a number of OURS must name the script that produced it.
//
// Chris's rule, 2026-08-18: "our claims as tested should be linked to actual
// scripts > output when feasible. Naturally there is no need to do this for
// third-party research, but for our own stuff absolutely."
//
// The corpus already states this norm in SCRIPTS.md ("any claim can be traced to
// the code that generated it") and `refs` already checks that what IS cited
// resolves. Nothing checked that a number IS cited at all, which is a different
// and weaker guarantee.
//
// Measured when this was written: 70 documents carry substantive numbers, 58 of
// them name a script, and of the 12 that do not, 8 are literature documents that
// the rule exempts by design. The four genuine cases were fixed in the same
// commit, so this check should read zero and any finding is a regression.
//
// WHAT COUNTS AS A NUMBER. Deliberately narrow: scientific notation, four or
// more significant digits, or three or more decimals. Years, section numbers,
// level markers like @11 and small integers are all excluded, because a check
// that fires on "section 3" teaches people to ignore it.
//
// KNOWN FALSE-POSITIVE SHAPE, found while calibrating and worth recording: an
// early version treated "Theorem 1" and "Lemma 2" as evidence of third-party
// content, which silently exempted `anchored-calm.md` -- this corpus names its
// OWN theorems that way. The external markers below are citation-shaped only.
// ---------------------------------------------------------------------------
function sourcing() {
  const findings = [];
  // Years are 4-digit integers and are NOT measurements. Found while calibrating:
  // two-moire-argument.md's only "numbers" were 2015, 2018 and 2026, so the check
  // fired on a framing document that originates nothing. Excluded by shape.
  const YEAR = /^(?:19|20)\d\d$/;
  const NUM = /(?<![\w@.\-])(?:\d+\.\d{3,}|\d\.\d+e[+-]?\d+|\d{4,}(?:,\d{3})*(?:\.\d+)?)(?![\w%])/gi;
  const SCRIPT = /[A-Za-z0-9_.\-]+\.js\b/;
  const LIT = /arXiv|\bDOI\b|doi\.org|et al\.|OEIS|A0\d{5}|J\. Number Theory|Math\. Ann|Acta |Ann\. of Math|Proc\. |JEMS|Izv|Cambridge Tracts|Springer|Demonstratio|CPAM|Math\. Comp/;
  let scanned = 0, sourced = 0, thirdParty = 0;
  for (const f of C.bodyMarkdown) {
    const rel = C.rel(f);
    if (rel.startsWith('research/history/')) continue;   // the ledger quotes, it does not originate
    if (rel === 'research/SCRIPTS.md') continue;         // generated
    const txt = C.read(f);
    const nums = (txt.match(NUM) || []).filter(v => !YEAR.test(v)).length;
    if (!nums) continue;
    scanned++;
    if (SCRIPT.test(txt)) { sourced++; continue; }
    if (LIT.test(txt)) { thirdParty++; continue; }
    findings.push({
      file: rel, line: 1, kind: 'unsourced-measurement',
      detail: `${nums} substantive number(s), no producing script named anywhere in the file`,
      note: 'name the script that produced them, or if they are quoted from the literature, cite the source',
    });
  }
  return {
    name: 'sourcing',
    description: `our numbers name the script that produced them (${sourced} of ${scanned} sourced, ${thirdParty} third-party and exempt). `
      + `THE FILE SCOPE IS KNOWN-WEAK: one .js mention exempts the whole file; the honest per-section queue lives in the sourcing-backlog advisory`,
    findings,
  };
}

// ---------------------------------------------------------------------------
// 8b. SOURCING BACKLOG — ADVISORY, per SECTION. One `.js` mention anywhere
//     used to exempt every number in a document, and two words — `et al.` —
//     exempted a whole file; the burn history has the "25x with no producer"
//     case, and mutations M21/M21b sailed through
//     (verify-the-verifier-checks.md B5). The honest scope is the SECTION a
//     number sits in (with the file preamble, the layer that states
//     "Producer: x.js" for a whole document, also consulted).
//
//     ADVISORY rather than gated for the same reason as embed-backlog: on the
//     day this landed the queue read 220 sections, and a red gate that cannot
//     be cleared is how a team learns to ignore a red gate. The counter should
//     only fall; gate it when it reaches the tens.
// ---------------------------------------------------------------------------
function sourcingBacklog() {
  const findings = [];
  const YEAR = /^(?:19|20)\d\d$/;
  const NUM = /(?<![\w@.\-])(?:\d+\.\d{3,}|\d\.\d+e[+-]?\d+|\d{4,}(?:,\d{3})*(?:\.\d+)?)(?![\w%])/gi;
  const SCRIPT = /[A-Za-z0-9_.\-]+\.js\b/;
  const LIT = /arXiv|\bDOI\b|doi\.org|et al\.|OEIS|A0\d{5}|J\. Number Theory|Math\. Ann|Acta |Ann\. of Math|Proc\. |JEMS|Izv|Cambridge Tracts|Springer|Demonstratio|CPAM|Math\. Comp/;
  for (const f of C.bodyMarkdown) {
    const rel = C.rel(f);
    if (rel.startsWith('research/history/')) continue;
    if (rel === 'research/SCRIPTS.md') continue;
    const lines = C.read(f).split('\n');
    const heads = [];
    lines.forEach((ln, i) => { if (/^#{1,6}\s/.test(ln)) heads.push(i); });
    const preEnd = heads.length ? heads[0] : lines.length;
    const units = [{ start: 0, end: preEnd, label: '(preamble)' }];
    heads.forEach((h, k) => units.push({
      start: h, end: k + 1 < heads.length ? heads[k + 1] : lines.length,
      label: lines[h].replace(/^#+\s*/, '').slice(0, 60),
    }));
    const preamble = lines.slice(0, preEnd).join('\n');
    const preSourced = SCRIPT.test(preamble), preLit = LIT.test(preamble);
    for (const u of units) {
      const txt = lines.slice(u.start, u.end).join('\n');
      const nums = (txt.match(NUM) || []).filter(v => !YEAR.test(v)).length;
      if (!nums) continue;
      if (SCRIPT.test(txt) || preSourced || LIT.test(txt) || preLit) continue;
      findings.push({
        file: rel, line: u.start + 1, kind: 'unsourced-section',
        detail: `${nums} substantive number(s) in section "${u.label}", no producer named in the section or the preamble`,
        note: 'ADVISORY. the file-level exemption cleared this; per-number custody wants the producer named where the number sits',
      });
    }
  }
  return { name: 'sourcing-backlog', description: 'sections whose numbers ride on a producer named elsewhere in the file (per-section custody queue)', findings };
}

// ---------------------------------------------------------------------------
// 9. PROVENANCE — which ARTIFACT was a quotation read from?
//
// Specified in research/PRIOR-ART.md, "Provenance: what artifact was actually
// read", adopted as a standing rule 2026-08-18. A quotation attributed to
// external work must record which artifact it was read from, beside the
// quotation. The PDF of record -- arXiv's or the publisher's -- is the only
// thing that counts. Three things look like verification and are not:
//
//   an ar5iv or arXiv HTML rendering, which is a machine translation of the
//   LaTeX that drops, reflows and renumbers, and is the layer that produced the
//   FKMPT constant this repo carried and later retracted at source;
//   an abstract page or a search snippet, never sufficient for a theorem
//   statement and always sufficient-looking;
//   a restatement inside a third paper, where the citation says A and the
//   reading was B quoting A.
//
// A quote from any of those is not wrong. It is UNVERIFIED, which is a
// different claim from the one a document makes when it writes "verbatim".
//
// ONE EXTRACTOR, NOT TWO. qc/lit-extract.js inventories every attributed
// quotation and resolves what each is attributed to; research/lit-provenance.js
// is the standing report over the same module. This check requires it rather
// than re-implementing its regexes, because two extractors that disagree about
// what an attributed quotation is give two answers to "how many are there" and
// the corpus then has none. What this check adds is the question the inventory
// does not ask: not "is there a provenance note?" but "does the note name an
// artifact that COUNTS?"
//
// The require is HARD, like ledgers.js and for the same reason. An extractor
// probed with existsSync and silently resolving to nothing would make this
// check report zero and read as clean while checking nothing at all.
//
// THE CALIBRATION IS LOAD-BEARING AND IS REPORTED AS A FINDING. The extractor
// carries five hand-read known positives. Its first version matched only
// surnames and arXiv ids, missed every quote introduced by possessive ("Their
// Definition 1, verbatim:"), and undercounted the corpus by 61%. A sweep that
// cannot find what is known to be there is worse than no sweep, because it
// reads as coverage -- so if calibration fails, this check reports THAT and
// nothing else, rather than printing a count that would be read as a result.
// ---------------------------------------------------------------------------

// What a provenance note has to name to count as verification.
const PROV_QUALIFYING = /\bPDF\b|title page|page \d|pp?\.\s?\d|photograph|printed|attestation\/|text-extracted|publisher'?s? (?:page|copy|text)/i;
// What looks like verification and is not. PRIOR-ART names all four.
const PROV_DISQUALIFYING = /ar5iv|arxiv html|html rendering|abs page|abstract page|search snippet|\bsnippet\b|summari[sz]er|as quoted (?:in|by)|restated in/i;

function provenance() {
  const findings = [];
  const LX = require('./lit-extract');
  const rows = LX.inventory();

  const missed = LX.calibrationMisses(rows);
  if (missed.length) {
    for (const [file, phrase, what] of missed)
      findings.push({
        file, line: 1, kind: 'extractor-uncalibrated',
        detail: `known literature quotation not found by the extractor: ${what}`,
        note: `the anchor phrase "${phrase.slice(0, 48)}" is in the file but the sweep did not classify it as attributed; `
          + 'every count below would be an undercount, so no other provenance finding is reported until this is fixed',
      });
    return {
      name: 'provenance',
      description: 'CALIBRATION FAILED: the quotation extractor cannot find quotations known to be there, so its counts are void',
      findings,
    };
  }

  let inherited = 0, unresolved = 0, noted = 0;
  for (const r of rows) {
    if (r.resolved === 'inherited') inherited++;
    if (r.resolved === 'unresolved') { unresolved++; continue; }
    if (r.hasProvenance) noted++;
    if (!r.claimsVerbatim) continue;

    if (!r.hasProvenance) {
      findings.push({
        file: r.file, line: r.line, kind: 'unprovenanced-quotation',
        detail: `attributed to ${r.source}, claims to reproduce exact words: "${r.head.slice(0, 90)}"`,
        note: 'record beside the quotation WHICH artifact was read: the arXiv or publisher PDF, with a page. '
          + 'A note is not required to be long, only to name the artifact',
      });
      continue;
    }
    if (PROV_DISQUALIFYING.test(r.context) && !PROV_QUALIFYING.test(r.context))
      findings.push({
        file: r.file, line: r.line, kind: 'disqualified-provenance',
        detail: `attributed to ${r.source}; the provenance note names only a rendering, an abstract or a restatement`,
        note: 'an ar5iv/HTML rendering, an abstract page, a snippet and a third paper quoting the first are all UNVERIFIED. '
          + 'Pull the PDF of record and say so, or mark the quotation corroborated rather than verified',
      });
    // ONE QUALIFYING TOKEN USED TO BEAT EVERY DISQUALIFYING ONE (2026-08-20):
    // adding "p. 4" beside "read from the ar5iv HTML rendering" cleared the
    // note silently (verify-the-verifier-checks.md B11, mutation M22). Both
    // vocabularies present is a note a human has to read, not a pass.
    else if (PROV_DISQUALIFYING.test(r.context) && PROV_QUALIFYING.test(r.context))
      findings.push({
        file: r.file, line: r.line, kind: 'mixed-provenance',
        detail: `attributed to ${r.source}; the provenance note names BOTH an artifact of record and a rendering/abstract/restatement`,
        note: 'say which artifact the quoted words were actually read from. A page number beside a rendering is still a rendering',
      });
  }

  return {
    name: 'provenance',
    description: `quotations of external work name the artifact they were read from `
      + `(${rows.length} attributed quotations, ${rows.filter(r => r.claimsVerbatim).length} claiming verbatim, ${noted} carrying a note). `
      + `${inherited} attributions are INHERITED from a source named further up and ${unresolved} resolve to nobody; `
      + `both are counted rather than reported, because the extractor cannot tell one of our own blockquotes from a literature quote `
      + `and all three unresolved ones today are ours`,
    findings,
  };
}

// ---------------------------------------------------------------------------
// 10. SEARCH CONVENTION — an absence IN THE LITERATURE must say where it looked.
//
// Specified in research/SEARCH-CONVENTIONS.md §6. That file exists because of
// one failure repeated for five audit waves: every search this project ran was
// calibrated, was a genuine clean negative, and was worthless, because it was
// run in OUR vocabulary. The object we call G2 had been in OEIS since September
// 2008 under wording containing none of our words.
//
// The `absence` check above catches a claim that an ARTIFACT does not exist. It
// explicitly hands the literature case to somebody else -- its own guard drops
// any absence phrase whose paragraph mentions the literature -- so a claim that
// a RESULT is absent from the literature was checked by nothing at all. That is
// the failure class that cost the five waves.
//
// THE RULE: a document asserting literature absence must, within the same
// paragraph, either cite SEARCH-CONVENTIONS.md or name the convention it
// searched. A calibrated negative in our own vocabulary must NOT satisfy it.
//
// KNOWN POSITIVES, both from research/two-class-lower-bounds.md §2 as it stood
// before 2026-08-18, recovered from git:
//   row 3  "lower-bound construction for a 2-dimensional sieved set | ABSENT |
//          see queries below" -- REFUTED the same day: Kalmynin-Konyagin,
//          Izv. Math. 88:2 (2024), publish exactly that construction.
//   row 5  "the same accounting run in dimension 2 | ABSENT; done for the first
//          time in §4 here" -- NARROWED the same day to Maier-Pomerance's
//          particular ledger, because K-K run a dimension-2 Mertens ledger.
// Both cells name no owning convention and cite no conventions file. Both were
// false. The check fires on both and stays silent on the repaired rows, which
// clear by naming arXiv:1706.00317 and A288815 -- entries of the §1 table.
//
// THE VOCABULARY IS PARSED FROM THE DOCUMENT, NEVER COPIED INTO THE ENGINE.
// Copying it would give the corpus two lists of what counts as searching
// properly, and the copy would go stale the first time the table gained a row.
// ---------------------------------------------------------------------------

// The verdict marker is ALL CAPS on purpose: "absent" in ordinary prose is not a
// literature claim, and matching it case-insensitively would fire on every
// sentence about a missing term in a series.
const ABSENT_MARKER = /\bABSENT\b/;
const LIT_ABSENCE = [
  /\bno (?:published|prior art|literature|paper|such paper|refereed|follow-up)\b/i,
  /\bno literature\b/i,
  /\bnothing (?:published|in print)\b/i,
  /\bnot (?:in|found in) (?:the )?(?:literature|print)\b/i,
  /\bnot in OEIS\b/i,
  /\bdoes not exist in (?:the )?(?:literature|print)\b/i,
  /\bnobody (?:has|else has)\b/i,
  /\bno one has\b/i,
  /\bunpublished\b/i,
  /\bpossibly novel\b/i,
  /\bapparently unworked\b/i,
  /\bwe are the first\b/i,
  /\bnone found\b/i,
  /\bwe found no\b/i,
];

// "First" is in the specification and is the single noisiest word in it, because
// this corpus uses it four other ways: ordinal ("take the first to be the
// one-class optimum"), our own computation ("computed T4@17 for the FIRST
// time"), our own measurement ("measured in a scale-free variable for the first
// time"), and narration ("the reason first given here"). Calibrated against
// those four, all of which are live in the corpus today and none of which is a
// literature claim, these two shapes fire only when the PARAGRAPH is also about
// publication. That keeps the two genuine priority claims -- covering-dive.md's
// "the first published upper bound at any exponent" and two-class-lower-bounds'
// "run in dimension 2 for the first time" -- and drops all four false ones.
const LIT_FIRST = [/\bfor the first time\b/i, /\bthe \*{0,2}first\*{0,2} (?:to|published)\b/i];
const LIT_CONTEXT = /\b(publish\w*|literature|in print|prior art|refereed|journal|OEIS|arXiv|preprint|paper)\b/i;

/**
 * The owning-convention vocabulary, read out of the conventions document's §1
 * table. Returns { clear, house, ok }.
 *
 *   clear  phrases that, appearing in a paragraph, show the search was run in
 *          the wording the LITERATURE uses: the bold or quoted phrases of the
 *          "OWNING convention" column, plus the identifiers of the "where it
 *          lives" column (OEIS A-numbers, arXiv ids, MathOverflow question ids).
 *   house  our own terms, taken from the document's "House terms that must be
 *          translated" line. Never clearing. Carried so a finding can say WHICH
 *          of our words the paragraph searched in, which is the whole lesson.
 *
 * SINGLE WORDS ARE NOT ACCEPTED as clearing phrases, and that is deliberate.
 * One row's owning convention is the bare word "Jacobsthal", which is also the
 * canonical name and appears in nearly every literature paragraph this corpus
 * has. Admitting it would clear almost everything and leave a check that reads
 * zero for the same reason the five waves did.
 */
function conventionVocabulary() {
  const cfg = C.SEARCH_CONVENTIONS;
  const abs = path.join(C.ROOT, cfg.doc);
  if (!fs.existsSync(abs)) return { clear: new Set(), house: new Set(), ok: false };
  const lines = C.read(abs).split('\n');
  const clear = new Set(), house = new Set();

  let inSection = false, inHouse = false;
  for (const ln of lines) {
    if (/^##\s/.test(ln)) { inSection = cfg.heading.test(ln); inHouse = false; continue; }
    if (!inSection) continue;

    // House terms: "tile -> primorial wheel; fold -> sieve extension by ...".
    // The list runs over several wrapped lines and its FIRST line carries the
    // label and no arrow, so the flag is set by the label and cleared by the
    // blank line that ends the paragraph. A first draft keyed continuation on
    // "we have already seen an arrow", which could never start.
    if (/House terms/i.test(ln)) inHouse = true;
    else if (inHouse && /^\s*$/.test(ln)) inHouse = false;
    if (inHouse)
      for (const m of ln.matchAll(/(?:^|[;:])\s*([a-z][a-z ]{2,20}?)\s*(?:→|->)/g))
        house.add(m[1].trim().toLowerCase());

    if (!/^\s*\|/.test(ln)) continue;
    const cells = ln.split('|').slice(1, -1).map(s => s.trim());
    if (cells.length <= cfg.cols.home) continue;
    if (/^-{2,}/.test(cells[0]) || /^:?-+:?$/.test(cells[1] || '')) continue;   // separator
    if (/OWNING convention/i.test(ln)) continue;                                // header

    const owning = cells[cfg.cols.owning] || '';
    const home = cells[cfg.cols.home] || '';

    // Bold spans and quoted phrases of the owning column.
    for (const re of [/\*\*(.+?)\*\*/g, /"([^"]+)"/g, /“([^”]+)”/g])
      for (const m of owning.matchAll(re)) {
        const phrase = C.norm(m[1]).replace(/^["']|["']$/g, '').trim();
        if (phrase.split(' ').length >= 3) clear.add(phrase);
      }
    // Un-marked-up owning cells, e.g. "the branch-and-bound over residue choice
    // per prime" once the bold is stripped: take the plain text too.
    const plain = C.norm(owning.replace(/[`*"“”]/g, '')).split(/[;,]| -- | — /)[0].trim();
    if (plain.split(' ').length >= 3) clear.add(plain);

    // Identifiers of the home column: these ARE the owning convention's address.
    for (const cell of [owning, home]) {
      for (const m of cell.matchAll(/\bA\d{6}\b/g)) clear.add(m[0].toLowerCase());
      for (const m of cell.matchAll(/arxiv:\s*(\d{4}\.\d{4,5}|math\/\d{7})/gi)) clear.add('arxiv:' + m[1]);
      for (const m of cell.matchAll(/(?:MathOverflow|StackExchange)\s*\*{0,2}(\d{4,7})/gi)) clear.add(m[1]);
    }
  }
  return { clear, house, ok: clear.size > 0 };
}

function searchConvention() {
  const findings = [];
  const cfg = C.SEARCH_CONVENTIONS;
  const { clear, house, ok } = conventionVocabulary();
  const docBase = path.basename(cfg.doc);
  const stem = docBase.replace(/\.md$/, '');

  // A conventions table that cannot be parsed would silently clear nothing and
  // flag everything, or the reverse. Say so instead of reporting a number.
  if (!ok)
    return {
      name: 'search-convention',
      description: `cannot read the owning-convention table from ${cfg.doc}; no literature-absence claim can be judged`,
      findings: [{ file: cfg.doc, line: 1, kind: 'conventions-unreadable',
        detail: 'the §1 table produced no owning-convention phrases',
        note: 'the check parses this table rather than carrying a copy; if the table moved, update SEARCH_CONVENTIONS in qc/corpus.js' }],
    };

  let scanned = 0, cleared = 0, deduped = 0;
  const seen = new Set();
  for (const f of C.bodyMarkdown) {
    const rel = C.rel(f);
    // The framework's own documentation specifies this check and so necessarily
    // contains the phrases it hunts. Same rule that excludes qc/ from `absence`.
    if (rel.startsWith('research/qc/')) continue;
    // The conventions document itself trivially satisfies "cite this file".
    if (rel === cfg.doc) continue;

    const lines = C.read(f).split('\n');
    const para = C.paragraphIndex(lines);
    lines.forEach((ln, i) => {
      const scope = para[i] || ln;
      let hit = ABSENT_MARKER.test(ln) ? 'ABSENT'
        : (LIT_ABSENCE.find(re => re.test(ln)) || null);
      if (!hit && LIT_CONTEXT.test(scope)) hit = LIT_FIRST.find(re => re.test(ln)) || null;
      if (!hit) return;
      const phrase = hit === 'ABSENT' ? 'ABSENT' : (ln.match(hit) || [''])[0];

      // A LEGEND is not a claim. Several documents open with the tag key
      // "[PROVEN] = published theorem; [CONJ] = published conjecture;
      // [ABSENT] = we searched and found nothing published", which defines the
      // marker rather than applying it. Two or more distinct bracketed markers
      // is a key, not a verdict.
      //
      // Tested on the PARAGRAPH, not the line, and the difference is not
      // cosmetic: a legend wraps, and the wrapped tail carries the words
      // "nothing published" with none of the markers beside them. A line-scoped
      // guard cleared the head of the legend and fired on its own second half.
      if (new Set([...scope.matchAll(/\[(PROVEN|CONJ|CONJECTURE|ABSENT|INFERRED|MEASURED|OPEN|REFUTED|VERIFIED)\]/g)]
        .map(m => m[1])).size >= 2) return;

      // A phrase INSIDE QUOTATION MARKS is being mentioned, not asserted. The
      // live case is paper/writing-style-math.md:122, whose whole point is to
      // forbid the sentence it quotes: `"To our knowledge, no one has noticed"
      // (the prior-art audit speaks instead)`. Flagging that asks a writer to
      // fix a rule that already says the right thing. Same shape as the
      // quoted-mechanism guard in `absence`.
      const quoted = [...ln.matchAll(/[“"]([^“”"]{6,300})[”"]/g)].map(m => m[1]);
      if (quoted.some(q => q.includes(phrase))) return;

      scanned++;

      // Cleared by citing the conventions document, by name or by path.
      if (scope.includes(docBase) || scope.includes(stem)) { cleared++; return; }
      // Cleared by naming an owning convention or its address.
      const low = C.norm(scope);
      const named = [...clear].find(t => low.includes(t));
      if (named) { cleared++; return; }

      // ONE FINDING PER PARAGRAPH. A paragraph that states an absence and then
      // corrects it on the next line carries the phrase twice and is one job,
      // not two; reporting it twice is how a queue of 92 becomes a queue nobody
      // works. The key is the paragraph's own text, so a paragraph that is
      // edited comes back rather than staying suppressed.
      const key = `${rel}|${low.slice(0, 200)}`;
      if (seen.has(key)) { deduped++; return; }
      seen.add(key);

      const ourWords = [...house].filter(h => new RegExp(`\\b${h}\\b`).test(low));
      findings.push({
        file: rel, line: i + 1, kind: 'unconventioned-absence',
        detail: `"${phrase}" with no owning convention named in the paragraph`,
        note: ourWords.length
          ? `the paragraph searches in our vocabulary (${ourWords.slice(0, 4).join(', ')}), which is the exact shape of the five-wave failure: `
            + `name the convention that OWNS the object, or cite ${cfg.doc}`
          : `cite ${cfg.doc}, or name the owning convention the search was run in`,
      });
    });
  }

  return {
    name: 'search-convention',
    description: `claims that a RESULT is absent from the literature say where they looked `
      + `(${scanned} literature-absence phrases, ${cleared} name an owning convention or cite ${docBase}, `
      + `${deduped} repeat a phrase already reported for their paragraph, ${findings.length} remain; `
      + `${clear.size} owning conventions and ${house.size} house terms parsed from ${docBase} §1). `
      + `A calibrated negative in OUR vocabulary does not clear this: that is what five audit waves produced. `
      + `Table rows are row-scoped; in PROSE paragraphs a convention phrase about one object still clears a verdict about another, which is a stated limit of paragraph scoping`,
    findings,
  };
}

module.exports = { refs, quotes, crosslinks, scriptProvenance, transfers, calibration, absenceClaims, sourcing,
  provenance, searchConvention };

// ---------------------------------------------------------------------------
// 11. EMBEDS. Chris, 2026-08-18: "not trust AI to copy correctly data over, but
//     have a formal embed". This is the static half of that mechanism, and it
//     runs nothing: it reads the fingerprint `qc/embed.js` writes into a tail
//     and asks whether the tail still belongs to the code above it, and whether
//     the readings quote figures the output block actually contains.
//
//     WHAT IT IS FOR. `research/attack-lower-bound.js` was found on 2026-08-18
//     carrying an OUTPUT block and eight numbered READINGS written before the
//     file had ever been executed: ten wrong figures, two sign-reversed, code
//     correct throughout. Nothing here could see it. `qc.js scripts` checks a
//     script parses, is titled and is cited — all true of that file. The
//     `reading-not-in-output` finding below is the one that would have caught
//     it, in a millisecond, with no run.
//
//     THE THREE FINDINGS, in descending severity:
//       tail-does-not-belong-to-this-code  the fingerprint's code hash does not
//           match the bytes above the banner. Someone edited the code and left
//           the old output beside it. Caught `05-twin-jacobsthal.js`, whose
//           committed code stops at p = 23 while its tail carries a p = 29 row.
//       reading-not-in-output  a figure quoted in READINGS is absent from the
//           OUTPUT block above it. Either the reading was composed rather than
//           read, or it is a literature constant that should be cited rather
//           than left looking like a measurement.
//       hand-pasted-tail  a pasted OUTPUT block with no fingerprint at all.
//           This is the legacy population and it is a migration counter, not an
//           accusation: it says the tail predates the mechanism.
// ---------------------------------------------------------------------------
function embeds() {
  const T = require('./tailfmt');
  const findings = [];
  for (const s of C.scripts) {
    const src = C.read(s);
    const tails = T.locateAll(src);
    // BINDING-LOST (2026-08-20). A file that once said `OUTPUT — EMBEDDED`
    // and no longer parses as bound has not become innocent: its binding
    // EVAPORATED — a prose line captured the banner, or the header was
    // damaged — and it was silently demoted to the advisory backlog while the
    // gate read the same TOTAL. Commit 391bd7a did exactly this to
    // a3-08-adjacent-pairs.js and nothing fired for four commits
    // (verify-the-verifier-embeds.md §3.4).
    const claimsBinding = src.includes('OUTPUT — EMBEDDED');
    let anyFp = false;
    for (const loc of tails) {
      const fp = T.fingerprintOf(loc);
      if (fp) { anyFp = true; break; }
    }
    if (claimsBinding && !anyFp) {
      findings.push({ file: C.rel(s), line: 1, kind: 'binding-lost',
        detail: 'the file contains "OUTPUT — EMBEDDED" but no tail parses as fingerprinted',
        note: 'the binding evaporated: a prose line may have captured the banner, or the header was damaged. Restore the tail before anything else touches this file' });
      continue;
    }
    if (!tails.length) continue;                // no tail: `embed-backlog` counts it

    // Multi-tail files: the code is what sits above the FIRST tail, so every
    // tail's code-sha256 covers the same bytes.
    const codeHash = T.sha(tails.length > 1 ? T.headTextAll(src) : T.headText(src));
    for (const loc of tails) {
      const fp = T.fingerprintOf(loc);
      if (!fp) continue;                        // legacy: `embed-backlog` counts it
      if (fp['code-sha256'] !== codeHash) {
        findings.push({ file: C.rel(s), line: loc.outHead + 1, kind: 'tail-does-not-belong-to-this-code',
          detail: `code changed since the tail was embedded (${fp['embedded'] || 'date not recorded'})`,
          note: 'the output beside this code was produced by different code' });
      }
      // THE BODY MUST HASH TO ITS OWN RECORD (2026-08-20). `out-sha256` was
      // written into every tail and never read by any static check, so a
      // digit hand-edited inside a bound block passed everything — the exact
      // attack-lower-bound.js defect the mechanism exists to prevent
      // (verify-the-verifier-embeds.md §1.4, repair 1). This is fully static:
      // read the body, normalise, hash, compare. Millisecond cost.
      const body = T.bodyMatchesRecordedOf(loc, fp);
      if (!body.ok) {
        findings.push({ file: C.rel(s), line: loc.outHead + 1, kind: 'output-block-hand-edited',
          detail: 'the pasted OUTPUT block does not hash to the out-sha256 its own fingerprint records',
          note: 'either a hand-edit inside the bound block, or a tail bound under an older normalize that was never migrated. Diff against a fresh run before trusting a single figure in it' });
      }
    }
  }
  return { name: 'embeds', description: "a script's pasted output belongs to the code above it, and the block hashes to its own record", findings };
}

// ---------------------------------------------------------------------------
// 11b. EMBED BACKLOG — ADVISORY, never gated, and the reason is stated rather
//      than assumed. Two populations live here.
//
//      hand-pasted-tail: the legacy tails, written before `qc/embed.js`
//      existed. 61 of them the day the mechanism landed. This is a migration
//      counter that should only ever fall, and while it is non-zero the hard
//      check above is green mostly because there is little for it to bind.
//
//      readings-not-traceable: a RANKING, not a defect list. Its false-positive
//      floor is real and measured: `a3-06-origin-vs-max.js` says "230.6M
//      copy-slots" over a printed 214,708,725, which is prose arithmetic and
//      entirely honest. What the ranking is good for is the top of it. On the
//      day it landed the top two files were `natal-cap-34-wrap-precision.js`
//      and `natal-cap-37-at41-march.js`, whose OUTPUT blocks are not output at
//      all but provenance notes saying the real logs live OUTSIDE this repo.
//      That is a genuine and separate fragility — evidence that cannot be
//      re-run — and it was invisible until a check counted figures.
// ---------------------------------------------------------------------------
function embedBacklog() {
  const T = require('./tailfmt');
  const findings = [];
  for (const s of C.scripts) {
    const src = C.read(s);
    const loc = T.locate(src);
    if (!loc) {
      // NO OUTPUT BANNER AT ALL (2026-08-20). These scripts used to be
      // invisible to both this counter and `embeds` — the comment said
      // "'scripts' owns that", and it did not: scriptProvenance checks parse,
      // title and citation, and says nothing about output custody. The
      // migration counter's denominator was 3 when the population with no
      // custody was 40 (verify-the-verifier-embeds.md §3.3). Tooling scripts
      // (the auditor, the kill-switch) have no output to bind and are named
      // rather than silently skipped.
      const base = path.basename(s);
      const TOOLING = new Set(['audit-numbers.js', 'killrun.js']);
      if (!TOOLING.has(base))
        findings.push({ file: C.rel(s), line: 1, kind: 'no-output-block',
          detail: 'script has no OUTPUT banner: its results have no output custody at all',
          note: 'ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen' });
      continue;
    }
    const out = T.outputText(src);
    if (out === null || !out.trim()) continue;

    if (!T.fingerprint(src))
      findings.push({ file: C.rel(s), line: loc.outHead + 1, kind: 'hand-pasted-tail',
        detail: 'OUTPUT block carries no embed fingerprint',
        note: 'legacy. bind it with: node research/qc/embed.js ' + C.rel(s) });

    const readings = T.readingsText(src);
    if (readings && readings.trim()) {
      const figs = T.figures(readings);
      const missing = [...figs.entries()].filter(([tok]) => !T.presentIn(tok, out));
      if (missing.length) {
        const rate = missing.length / figs.size;
        findings.push({ file: C.rel(s), line: loc.readStart + 1, kind: 'readings-not-traceable',
          detail: `${missing.length} of ${figs.size} figures in READINGS are not in the OUTPUT block (${(rate * 100).toFixed(0)}%)`,
          note: 'ADVISORY. prose arithmetic and literature constants land here too; read the file. first: ' +
                missing.slice(0, 4).map(([t]) => t).join(', ') });
      }
    }
  }
  return { name: 'embed-backlog', description: 'legacy tails awaiting an embed, and readings ranked by how much of them the output does not contain', findings };
}

module.exports.embeds = embeds;
module.exports.embedBacklog = embedBacklog;
module.exports.sourcingBacklog = sourcingBacklog;

// ---------------------------------------------------------------------------
// 12. WIDTHS — a value stored in a container narrower than the value can be.
//
//     THE DEFECT CLASS, three times in three days, and the gate blind to all
//     three:
//       2026-08-19  `1 << r` for a residue r mod q. JS takes a shift count mod
//           32, so every q > 32 aliased. a3-03's census went wrong from x = 37.
//       2026-08-21  la/lb were Uint16Array holding INDICES into a scour-prime
//           list of size K: 37,534 at @31 (fits), 198,274 at @37 (does not).
//           Two thirds of the primes read back as the wrong prime, the measured
//           quantity came out 18% low, and it looked like a clean refutation of
//           a pre-registered law. Five hours, and a false refutation.
//       2026-08-21  the divisor-list capacity LC = 7, exceeded at @37 — but it
//           THREW. One dead run, fixed in minutes.
//
//     WHY NOTHING SAW IT, which is the part worth instrumenting. Every internal
//     check in that script is a COUNT identity: slot count against a closed
//     form, sub + sup = total, CRT residues and missing mass against
//     pre-registered values. Every one stayed PASS while the values were
//     corrupt, because an aliased container corrupts WHICH PRIME, not HOW MANY.
//     `audit-numbers.js` is equally blind, because it recomputes through the
//     same code. The only guard that worked was the LOUD one, and the whole
//     difference between the second incident and the third is loud versus
//     silent.
//
//     THE TIER SPLIT, and why it is not a hedge. `widths` is GATED and holds
//     only findings that are PROVABLE FROM THE SOURCE ALONE — a literal shift
//     of 32, a literal that does not fit its container, an array length stored
//     in sixteen bits. None of those needs to know what x is. `widths-scan` is
//     ADVISORY and holds the shapes that require a human to know the level:
//     a residue mod a VARIABLE modulus used as a bit index, a narrow container
//     read back as a subscript, a primorial accumulated in a Number. Those are
//     the shapes the three incidents actually had, and they have 60-odd live
//     hits in this corpus, every one of which is "correct at the level it was
//     last run, unproven at the level it will be run next". Gating on them
//     would put a red that nobody can clear in front of every commit, and the
//     house rule — stated in qc.js's own advisory block — is that a red gate
//     which cannot be cleared is how a team learns to ignore a red gate.
//
//     THE GATED TIER READS ZERO TODAY, and that is said rather than hidden.
//     `embeds` did the same on the day it landed. What zero certifies here is
//     narrow: no container in research/ is provably too small on its face. It
//     certifies nothing about the containers that merely have not met their
//     level yet, and those are in the advisory list by name.
//
//     THE ANNOTATION. A script may carry `// widths-ok: <reason>` on the store's
//     line or within the four lines above it. It suppresses both tiers for that
//     line, and it is itself the audit trail: the reason has to be a sentence, a
//     bare `// widths-ok:` is a finding, and an annotation sitting above nothing
//     of fixed width is a finding too, because a suppression that has lost its
//     target is a blindfold rather than a ruling.
// ---------------------------------------------------------------------------

// Inclusive maxima of the containers that alias silently. Uint32Array/Int32Array
// are deliberately absent: they are the WIDENED forms, and the corpus's repairs
// move stores INTO them.
const NARROW_CAPS = { Uint8Array: 255, Uint8ClampedArray: 255, Int8Array: 127,
                      Uint16Array: 65535, Int16Array: 32767 };

// Names a corpus of prime research binds its prime lists to. Config, not a
// verdict: it decides which stores get READ carefully, never which are wrong.
const PRIME_LISTS = '(?:primes|ps|qs|Q|pr|plist|basePs)';

/**
 * Strip comments, keeping one entry per source line.
 *
 * NEVER PAD THE STRIPPED TEXT WITH SPACES. The first draft replaced comment
 * bytes with blanks to keep columns aligned, which turned this corpus's large
 * header banners into runs of tens of thousands of spaces; a pattern opening
 * with `\s*` then went quadratic and the scan did not finish inside two
 * minutes on origin-excess.js. Line NUMBERS are what the findings need, and
 * those survive truncation.
 */
function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ''))
    .split('\n').map(l => { const i = l.indexOf('//'); return i < 0 ? l : l.slice(0, i); });
}

/** The balanced right-hand side beginning at `i`, stopping at a top-level `;` or `,`. */
function rhsFrom(line, i) {
  let j = i, depth = 0, out = '';
  while (j < line.length) {
    const c = line[j];
    if ('([{'.includes(c)) depth++;
    else if (')]}'.includes(c)) { if (depth === 0) break; depth--; }
    else if (depth === 0 && (c === ';' || c === ',')) break;
    out += c; j++;
  }
  return out.trim();
}

/** The shift count beginning at `i`: one balanced operand, no more. */
function shiftOperand(line, i) {
  let j = i, depth = 0, out = '';
  while (j < line.length) {
    const c = line[j];
    if (c === '(') depth++;
    else if (c === ')') { if (depth === 0) break; depth--; }
    else if (depth === 0 && /[;,\])|&^+\-*/=<>?:]/.test(c) && out.trim()) break;
    out += c; j++;
  }
  return out.trim();
}

/** Subscripts collapsed, so a `.length` used as an INDEX is not read as a stored length. */
const withoutSubscripts = s => s.replace(/\[[^\[\]]*\]/g, '[]').replace(/\[[^\[\]]*\]/g, '[]');

/**
 * One pass over one script. Returns findings tagged `gated: true|false`; the two
 * exported checks are the two halves of this list, so a rule can never be in the
 * gate in one place and out of it in another.
 */
function scanWidths(rel, src) {
  const out = [];
  const code = stripComments(src);
  const whole = code.join('\n');

  // --- the annotation, and its own two failure modes ------------------------
  const suppressed = new Set();                 // lines a sound annotation covers
  src.split('\n').forEach((raw, i) => {
    const m = /\/\/\s*widths-ok:(.*)$/.exec(raw);
    if (!m) return;
    const reason = m[1].trim();
    const ln = i + 1;
    if (reason.split(/\s+/).filter(Boolean).length < 3) {
      out.push({ gated: true, file: rel, line: ln, kind: 'widths-ok-without-reason',
        detail: `\`// widths-ok:${reason ? ' ' + reason : ''}\` carries no reason`,
        note: 'the annotation IS the audit trail; a bare one signs nothing off' });
      return;                                   // a bare annotation suppresses nothing
    }
    const window = code.slice(i, i + 5).join('\n');
    if (!/new\s+\w*(?:Array)\s*\(|<<|>>|\*=|\[[^\]]*\*/.test(window)) {
      out.push({ gated: true, file: rel, line: ln, kind: 'widths-ok-matches-nothing',
        detail: 'no fixed-width store, shift or stride within four lines below',
        note: 'a suppression that has lost its target is a blindfold, not a ruling. Move it back onto the store or delete it' });
      return;
    }
    for (let k = ln; k <= ln + 4; k++) suppressed.add(k);
  });
  const push = f => { if (!suppressed.has(f.line)) out.push({ file: rel, ...f }); };

  // --- which names are narrow containers, and which hold primes -------------
  const narrow = new Map();
  const ctorRe = new RegExp(`\\b([A-Za-z_$][\\w$]*)\\s*=\\s*new\\s+(${Object.keys(NARROW_CAPS).join('|')})\\s*\\(`, 'g');
  let m;
  while ((m = ctorRe.exec(whole))) narrow.set(m[1], { ctor: m[2], cap: NARROW_CAPS[m[2]] });
  const primeBound = new Set();
  for (const g of whole.matchAll(new RegExp(`\\b([A-Za-z_$][\\w$]*)\\s*=\\s*${PRIME_LISTS}\\s*\\[`, 'g'))) primeBound.add(g[1]);
  for (const g of whole.matchAll(new RegExp(`for\\s*\\(\\s*(?:const|let|var)\\s+([A-Za-z_$][\\w$]*)\\s+of\\s+${PRIME_LISTS}\\b`, 'g'))) primeBound.add(g[1]);

  // --- ADOPTING THE GUARD CLEARS THE FINDING ------------------------------
  // A file that already THROWS on a name is not carrying that risk silently,
  // and the advisory list is a work queue rather than a census: leaving a
  // guarded store on it would tell a reader that the repair changed nothing.
  // `xchan-at37-01-census.js` is the worked example — it throws on both K and
  // LC, and it is silent here for that reason and no other.
  const _guard = new Map();
  const guarded = nm => {
    if (!_guard.has(nm)) _guard.set(nm, new RegExp(
      `throw[^;\n]*\\b${nm}\\b|\\b${nm}\\b[^;\n]*throw|assert(?:Fits|Capacity|BitIndex|ExactInteger)\\s*\\([^)]*\\b${nm}\\b`
    ).test(whole));
    return _guard.get(nm);
  };
  // The per-name scanners are built ONCE per file, not once per line: the first
  // draft compiled them inside the line loop and the check cost 931 ms.
  for (const [name, info] of narrow) {
    info.store = new RegExp(`\\b${name}\\s*\\[`, 'g');
    info.asIndex = new RegExp(`([A-Za-z_$][\\w$]*)\\s*\\[\\s*${name}\\s*\\[`, 'g');
  }

  code.forEach((line, i) => {
    const ln = i + 1;

    // --- shifts ------------------------------------------------------------
    let at = -1;
    while ((at = line.indexOf('<<', at + 1)) >= 0) {
      if (line[at + 2] === '=' || line[at - 1] === '<') continue;   // <<= and <<<
      const op = shiftOperand(line, at + 2);
      const lit = /^\(*\s*(-?\d+)\s*\)*$/.exec(op);
      if (lit) {
        const n = Number(lit[1]);
        if (n > 31 || n < 0)
          push({ gated: true, line: ln, kind: 'shift-count-over-31',
            detail: `\`<< ${lit[1]}\` — JS takes the shift count mod 32, in int32`,
            note: `this shift means \`<< ${((n % 32) + 32) % 32}\`, silently` });
        continue;
      }
      if (/%/.test(op) && !/&\s*(?:31|0x1[fF])/.test(op)) {
        const mod = /%\s*([A-Za-z_$][\w$]*|\d+)/.exec(op);
        const md = mod && mod[1];
        if (!(md && /^\d+$/.test(md) && Number(md) <= 32))
          push({ gated: false, line: ln, kind: 'shift-count-from-modulus',
            detail: `bit index \`${op.slice(0, 46)}\` is a residue mod ${md}`,
            note: 'the 2026-08-19 shape: correct while the modulus is under 32, silently aliased above it. Guard with qc/widths.assertBitIndex, or move the mask to a Uint8Array' });
      }
    }

    // --- stores into a narrow container ------------------------------------
    if (line.indexOf('[') >= 0) for (const [name, info] of narrow) {
      const re = info.store; re.lastIndex = 0;
      let s;
      while ((s = re.exec(line))) {
        let j = s.index + s[0].length, d = 0;
        while (j < line.length) { const c = line[j]; if (c === '[') d++; else if (c === ']') { if (d === 0) break; d--; } j++; }
        const eq = /^\s*=(?!=)/.exec(line.slice(j + 1));
        if (!eq) continue;
        const rhs = rhsFrom(line, j + 1 + eq[0].length);
        const top = withoutSubscripts(rhs);
        const where = `${info.ctor} ${name} (holds at most ${info.cap})`;
        if (/\.length\b|\.indexOf\s*\(/.test(top)) {
          push({ gated: true, line: ln, kind: 'narrow-store-from-length',
            detail: `${where} <- ${rhs.slice(0, 46)}`,
            note: 'an array length is bounded by nothing in this source; the container is' });
          continue;
        }
        const lit = /^[-+]?\d+$/.exec(rhs);
        if (lit) {
          if (Math.abs(Number(lit[0])) > info.cap)
            push({ gated: true, line: ln, kind: 'narrow-store-over-cap',
              detail: `${where} <- ${rhs}`, note: 'the literal does not fit, on its face' });
          continue;                             // a small literal is the safe case
        }
        const bare = /^([A-Za-z_$][\w$]*)$/.exec(rhs);
        if (bare && primeBound.has(bare[1]) && !guarded(name)) {
          push({ gated: false, line: ln, kind: 'narrow-store-holds-prime',
            detail: `${where} <- ${bare[1]}, an element of a prime list`,
            note: 'primes are unbounded by anything in this source. Which level does this container survive?' });
          continue;
        }
        const modv = /%\s*([A-Za-z_$][\w$]*)\s*$/.exec(top);
        if (modv)
          push({ gated: false, line: ln, kind: 'narrow-store-mod-variable',
            detail: `${where} <- ${rhs.slice(0, 42)}`,
            note: `bounded by ${modv[1]}, not by a literal. Fits while ${modv[1]} <= ${info.cap + 1}, aliases above it` });
      }
      // --- read back as a subscript: the 2026-08-21 la/lb shape -------------
      if (guarded(name)) continue;
      const idxRe = info.asIndex; idxRe.lastIndex = 0;
      let r;
      while ((r = idxRe.exec(line)))
        push({ gated: false, line: ln, kind: 'narrow-store-holds-index',
          detail: `${r[1]}[${name}[...]] — ${info.ctor} ${name} (holds at most ${info.cap}) is used as an INDEX`,
          note: 'an index is as large as the thing indexed. This is the la/lb shape: fits at @31, aliases at @37, and every COUNT identity still passes' });
    }
  });

  // --- a hardcoded capacity doubling as an array stride (the LC = 7 shape) ---
  for (const c of whole.matchAll(/(?:const|let)\s+([A-Z][A-Z0-9_]*)\s*=\s*(\d{1,3})\s*[;,]/g)) {
    const [, name, val] = c;
    if (Number(val) < 2 || Number(val) > 64) continue;
    const alloc = new RegExp(`new\\s+\\w*Array\\s*\\(\\s*${name}\\s*\\*|new\\s+\\w*Array\\s*\\([^)]*\\*\\s*${name}\\b`).test(whole);
    const stride = new RegExp(`\\[[^\\]]*\\b${name}\\s*\\*|\\*\\s*${name}\\s*\\+`).test(whole);
    if (!alloc || !stride) continue;
    if (guarded(name)) continue;
    // A WHEEL MODULUS IS NOT A CAPACITY. `const W = 30` used as `% W` is the
    // wheel this corpus counts in, not a fixed-size list, and reporting it
    // taught nobody anything (natal-cap-29-sigma-plateau.js).
    if (new RegExp(`%\\s*${name}\\b`).test(whole)) continue;
    const line = code.findIndex(l => new RegExp(`(?:const|let)\\s+${name}\\s*=\\s*${val}\\b`).test(l)) + 1;
    if (suppressed.has(line)) continue;
    out.push({ gated: false, file: rel, line: line || 1, kind: 'capacity-literal-as-stride',
      detail: `${name} = ${val} is both an allocation factor and an index stride`,
      note: 'the LC = 7 shape. It threw at @37, which is why it cost one run. Assert it with qc/widths.assertCapacity rather than trusting the level' });
  }

  // --- a primorial accumulated in a Number ----------------------------------
  if (!/BigInt|\b\d+n\b/.test(whole))
    for (const p of whole.matchAll(new RegExp(`for\\s*\\([^)]*\\bof\\s+${PRIME_LISTS}\\b[^)]*\\)\\s*([A-Za-z_$][\\w$]*)\\s*\\*=`, 'g'))) {
      const line = whole.slice(0, p.index).split('\n').length;
      if (suppressed.has(line)) continue;
      out.push({ gated: false, file: rel, line, kind: 'unsafe-integer-product',
        detail: `\`${p[1]} *=\` accumulates a product over a prime list, and this file uses no BigInt`,
        note: '2^53 is 9.0e15, so 41# (3.0e14) is exact and 43# (1.3e16) is not. Past that edge the product stops being exact without saying so' });
    }

  return out;
}

function allWidthFindings() {
  const out = [];
  for (const s of C.scripts) out.push(...scanWidths(C.rel(s), C.read(s)));
  return out;
}

function widths() {
  const findings = allWidthFindings().filter(f => f.gated).map(({ gated, ...f }) => f);
  return { name: 'widths', description: 'a fixed-width container that is too small ON ITS FACE, and the annotations that sign one off', findings };
}

function widthsScan() {
  const ORDER = ['shift-count-from-modulus', 'narrow-store-holds-index', 'narrow-store-holds-prime',
    'capacity-literal-as-stride', 'unsafe-integer-product', 'narrow-store-mod-variable'];
  const findings = allWidthFindings().filter(f => !f.gated).map(({ gated, ...f }) => f)
    .sort((a, b) => ORDER.indexOf(a.kind) - ORDER.indexOf(b.kind));
  return { name: 'widths-scan', description: 'containers that fit the level last run and are unproven at the next one', findings };
}

module.exports.widths = widths;
module.exports.widthsScan = widthsScan;
