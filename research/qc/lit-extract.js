// ============================================================================
// QC / LIT-EXTRACT — the one extractor for attributed quotations
// ============================================================================
// For every sentence this corpus attributes to somebody else, which artifact
// was actually read to get it? Quotes enter from four very different places and
// the documents do not distinguish them:
//   (1) the publisher's or arXiv's PDF          -- the source of record
//   (2) an ar5iv / arXiv HTML rendering         -- a MACHINE TRANSLATION of
//       the LaTeX; it drops, reflows and renumbers, and it is the layer that
//       burned this repo before (FKMPT's constant, retracted at source)
//   (3) an abstract page or a search snippet    -- never sufficient for a
//       theorem statement, always sufficient-looking
//   (4) a restatement inside a THIRD paper      -- the citation says A, the
//       reading was B quoting A
//
// A quote from (2), (3) or (4) is not wrong by construction. It is UNVERIFIED,
// which is a different claim from the one a document makes when it writes
// "verbatim". Nothing here judges a quote. It finds them, resolves what each is
// attributed to, and says which carry a note about what was read.
//
// It deliberately over-collects. A false positive costs one line in a report; a
// missed quote is a claim nobody checks. Runtime well under a second.
//
// WHY THIS IS IN qc/ AND NOT IN research/. Two callers need it: the standing
// inventory research/lit-provenance.js, and the gate's `provenance` check. Two
// copies of these regexes would give the corpus two answers to "how many
// attributed quotations are there", and the corpus would then have none. It
// sits in qc/ rather than in research/ because qc/selftest.js rebuilds the
// framework in a temp directory from a fixed copy list, and a shared file
// outside that directory cannot be resolved from inside the fixture. The first
// draft left it in research/ and the selftest died on the import.
//
// THE IMPORT IS HARD ON PURPOSE. Do not wrap it in an existsSync probe. An
// extractor that silently resolves to nothing makes `provenance` report zero
// findings and read as clean while checking nothing at all, which is the exact
// failure mode ledgers.js was moved off on 2026-08-18.
// ============================================================================

'use strict';

const fs = require('fs');
const path = require('path');
const C = require('./corpus');

// ---------------------------------------------------------------------------
// What counts as an attribution. These are the cues that a quoted block came
// from outside rather than from one of our own program outputs -- which is the
// single most common OTHER thing a '>' block holds in this corpus.
// ---------------------------------------------------------------------------

const ARXIV = /arXiv:\s*(\d{4}\.\d{4,5}|math\/\d{7})/i;

// Author surnames the corpus cites. Kept explicit rather than inferred: a
// capitalised word before a comma matches half the prose in these documents.
const AUTHORS = [
  'Holt', 'Rudd', 'Ziller', 'Morack', 'Kourbatov', 'Kalmynin', 'Konyagin',
  'Banks', 'Ford', 'Tao', 'Maynard', 'Pomerance', 'Granville',
  'Soundararajan', 'Montgomery', 'Vaughan', 'Halberstam', 'Richert',
  'Hardy', 'Littlewood', 'Maier', 'Rankin', 'Erd', 'Jacobsthal', 'Hagedorn',
  'Schemmel', 'Grob', 'Schmitt', 'Brun', 'Selberg', 'Bombieri', 'Iwaniec',
  'Friedlander', 'Zhang', 'Polymath', 'Meissel', 'Lehmer', 'Wolf', 'Fischer',
  'Rodriguez', 'Rivera', 'Dickson', 'Polignac', 'Mertens', 'Chebyshev',
  'Christoffel', 'Vinogradov', 'Brudern', 'Brüdern', 'Fouvry', 'Smith',
  'Labos', 'Adamchuk', 'Smeets', 'Tener', 'Sierpinski', 'Sierpiński',
];
const AUTHOR_RE = new RegExp('\\b(' + AUTHORS.join('|') + ')\\b');

// Journals and venues, for quotes attributed by publication rather than name.
const VENUE = /\b(J\.|Journal|Ann\.|Acta|Math\.|Izv\.|JEMS|J\. Eur\.|Proc\.|Trans\.|Compos\.|Invent\.|Duke|Mathematika|OEIS|A\d{6})\b/;

// The word that makes a quote a claim about the source's exact words.
const VERBATIM = /\bverbatim\b|\bquotes?\b|\bwrites\b|\bstates\b|\bsays\b/i;

// Attribution by POSSESSIVE rather than by name. The corpus's dominant house
// style for a second or third quote from a paper already introduced above is
// "Their Definition 1, verbatim:" or "And the structural reason, from their
// §1.3, verbatim:" -- no surname, no arXiv id anywhere in reach. The first
// version of this extractor matched only names and ids and therefore MISSED
// every such quote, which is most of them in the most heavily-quoting
// documents. The calibration list below exists because of that miss.
//
// `[*_`]*` after the possessive is not decoration. On 2026-08-18 a correction
// pass rewrote "from their §1.3, verbatim:" as "from their **§1.1, p. 673** …
// verbatim." -- fixing a real citation error -- and the added bold markers put
// two asterisks between "their" and "§", which dropped the quote out of this
// sweep entirely. The calibration list caught it, which is what it is for.
const POSSESSIVE = /\b(their|his|her|its|the (?:paper|authors?|source)'s)\s+[*_`]*(?:§|Definition|Theorem|Lemma|Proposition|Corollary|Remark|Conjecture|Table|§?\d|p\.|page|abstract|introduction|\w+\s+(?:§|\d))/i;

// A document that writes "verbatim:" immediately above a quoted block is
// asserting it reproduces someone's exact words. Our own program output is
// never introduced that way, so the word alone is an attribution cue.
//
// The full stop is in the class for the same reason as the emphasis above: the
// house style is "…, verbatim:" but a sentence that continues past the cue ends
// it with a period, as in "verbatim. *(Corrected 2026-08-18: …)*". The
// colon-and-comma-only version silently lost those.
const VERBATIM_CUE = /\bverbatim\s*[:,.]/i;

// A provenance note: the document saying which artifact was read. This is the
// thing that mostly does not exist yet, which is the point of the inventory.
const PROVENANCE = /\b(PDF|pdf|title page|page \d+|p\. ?\d+|ar5iv|HTML|abs page|arXiv API|abstract page|read from|verified against|checked against)\b/;

// ---------------------------------------------------------------------------
// Extraction.
// ---------------------------------------------------------------------------

/** The documents an attributed quotation can live in: body prose, never history. */
function docs() {
  const out = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) {
        // history/ is the append-only archive: it is SUPPOSED to hold
        // superseded readings, so auditing it is noise, not signal.
        if (e.name === 'history' || e.name === 'node_modules' || e.name === '.git') continue;
        walk(p);
      } else if (e.name.endsWith('.md')) {
        out.push(p);
      }
    }
  };
  for (const d of ['research', 'paper']) {
    const full = path.join(C.ROOT, d);
    if (fs.existsSync(full)) walk(full);
  }
  const top = path.join(C.ROOT, 'TODO.md');
  if (fs.existsSync(top)) out.push(top);
  return out;
}

// Group consecutive '> ' lines into blocks, and carry the lines above each
// block as its attribution context. The corpus's house style is "<attribution
// sentence>, verbatim:" then a blank line then the quote.
function blocks(lines) {
  const out = [];
  let i = 0;
  while (i < lines.length) {
    if (!/^\s*>/.test(lines[i])) { i++; continue; }
    const start = i;
    while (i < lines.length && (/^\s*>/.test(lines[i]) || /^\s*$/.test(lines[i]) && /^\s*>/.test(lines[i + 1] || ''))) i++;
    out.push({
      line: start + 1,
      text: lines.slice(start, i).join('\n'),
      // Ten lines, not six. The attribution sentence is often preceded by a
      // wrapped lead-in and separated from the quote by a blank line, and the
      // surname that identifies the source can sit a full paragraph above.
      context: lines.slice(Math.max(0, start - 10), start).join('\n'),
    });
  }
  return out;
}

function classify(b, doc) {
  const near = b.context + '\n' + b.text;
  const arx = near.match(ARXIV);
  const hasAuthor = AUTHOR_RE.test(b.context);
  const hasVenue = VENUE.test(b.context);
  const hasPossessive = POSSESSIVE.test(b.context);
  const hasVerbatimCue = VERBATIM_CUE.test(b.context);
  if (!arx && !hasAuthor && !hasVenue && !hasPossessive && !hasVerbatimCue) {
    return null;                                      // our own output, or prose
  }
  // Resolving a possessive. "Their Definition 1" names no one, so the source is
  // whatever the document last named ABOVE this point. That is a guess and is
  // labelled as one: an unresolved possessive is itself a defect, because the
  // citation cannot be followed without reading the whole document in order.
  let source, resolved = 'direct';
  if (arx) source = 'arXiv:' + arx[1];
  else if (hasAuthor) source = b.context.match(AUTHOR_RE)[1];
  else {
    const above = doc.slice(0, b.line).join('\n');
    const lastArx = [...above.matchAll(new RegExp(ARXIV, 'gi'))].pop();
    const lastAuth = [...above.matchAll(new RegExp(AUTHOR_RE, 'g'))].pop();
    if (lastArx) { source = 'arXiv:' + lastArx[1]; resolved = 'inherited'; }
    else if (lastAuth) { source = lastAuth[1]; resolved = 'inherited'; }
    else { source = 'UNRESOLVED'; resolved = 'unresolved'; }
  }
  return {
    source,
    resolved,
    claimsVerbatim: VERBATIM.test(b.context),
    hasProvenance: PROVENANCE.test(b.context),
  };
}

/** Every attributed quotation in the corpus, as rows. */
function inventory() {
  const rows = [];
  for (const f of docs()) {
    const lines = fs.readFileSync(f, 'utf8').split('\n');
    const rel = path.relative(C.ROOT, f);
    for (const b of blocks(lines)) {
      const c = classify(b, lines);
      if (!c) continue;
      // `text` and `context` are carried so a caller can key on CONTENT rather
      // than on file and line, and so the qc check can ask the further question
      // the inventory does not: not "is there a provenance note?" but "does the
      // note name an artifact that counts?"
      rows.push({ file: rel, line: b.line, ...c,
        text: b.text, context: b.context, head: b.text.replace(/\s+/g, ' ').slice(2, 90) });
    }
  }
  return rows;
}

// ---------------------------------------------------------------------------
// CALIBRATION. A silent sweep proves nothing. These five are literature quotes
// read by hand in research/two-class-lower-bounds.md; the first version of this
// extractor found NONE of them, because all five are introduced by possessive
// rather than by name, and it undercounted the corpus by 61%. If any stops
// being found, the extractor has narrowed and every count is an undercount.
//
// KEYED ON CONTENT, NOT ON POSITION, and that correction cost a false alarm
// within two hours of the list being written. The first version keyed each
// positive to a LINE NUMBER in two-class-lower-bounds.md as it stood at
// 2026-08-18 13:32. Three commits later that day (13:48, 14:13, 15:17) edited
// the document above those quotes, every anchor drifted by 6 to 18 lines, and
// the script began reporting CALIBRATION FAILED on five quotes the extractor
// was still finding perfectly well. A position key describes where a sentence
// sat, not which sentence it is, so it goes stale on the first edit anywhere
// above it. The framework's house rule for the `transfers` ledger says the same
// thing and said it first: key on content, never on file and line.
//
// The failure direction was safe -- a stale key makes the script shout, not go
// quiet -- but a calibration that cries wolf is a calibration people learn to
// skip, which ends in exactly the silent undercount it exists to prevent.
// ---------------------------------------------------------------------------

const KNOWN_POSITIVES = [
  // file, a distinctive phrase from inside the quoted block, what it is.
  // The line numbers are the 2026-08-18 13:32 positions, kept only as history.
  ['research/two-class-lower-bounds.md', 'We say that the sieving system is',   'FKMPT Definition 1, "Their Definition 1, verbatim:" (was line 118)'],
  ['research/two-class-lower-bounds.md', 'Unfortunately our methods only seem', 'FKMPT Remark 7, Halberstam-Richert numbering (was line 146)'],
  ['research/two-class-lower-bounds.md', 'bounds for smooth numbers cannot be used', 'FKMPT §1.1, "from their §1.1, verbatim." (was line 159)'],
  ['research/two-class-lower-bounds.md', 'Analyze the distribution of large gaps', 'Banks-Ford-Tao open problem 3 (was line 172)'],
  ['research/two-class-lower-bounds.md', 'The traditional argument is to use each prime', 'Maier-Pomerance, "Their p. 205, verbatim:" (was line 186)'],
];

/**
 * Which known positives the extractor failed to find, matched on CONTENT.
 *
 * A positive whose FILE is not in the corpus at all is not a miss: it is a
 * calibration case that does not apply here, which is what a ported corpus or
 * the qc fixture looks like. Only a file that exists and no longer yields its
 * quote is evidence the extractor has narrowed.
 */
function calibrationMisses(rows, corpusFiles = null) {
  const present = corpusFiles || new Set(docs().map(f => path.relative(C.ROOT, f)));
  return KNOWN_POSITIVES.filter(([f, phrase]) =>
    present.has(f) && !rows.some(r => r.file === f && r.text.includes(phrase)));
}

module.exports = {
  ARXIV, AUTHORS, AUTHOR_RE, VENUE, VERBATIM, POSSESSIVE, VERBATIM_CUE, PROVENANCE,
  docs, blocks, classify, inventory, calibrationMisses, KNOWN_POSITIVES,
};
