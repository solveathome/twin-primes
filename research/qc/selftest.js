// ============================================================================
// QC / SELFTEST — do the checks still fire on defects we know are defects?
// ============================================================================
// Run it:  node research/qc/selftest.js
//
// WHY THIS EXISTS. The campaign's fifth lesson is that a grep returning nothing
// proves nothing until the pattern is checked against a known positive. By wave
// 3 the whole campaign rested on `refs` and `crosslinks` reading zero and nobody
// had ever tested them. Doing it found three blind spots, one of which caught a
// real defect within minutes of being closed.
//
// A zero from qc.js means "no defect found". It only means "no defect present"
// if the checks demonstrably fire when a defect IS present, and that is what
// this asserts. Run it after changing anything in qc/.
//
// Each case below is copied from a defect this corpus actually had, so a case
// that stops firing is a regression in the instrument, not a style question.
//
// The fixture is built in a temp directory and deleted afterwards. It is never
// written into the repository: it is full of deliberately broken references, and
// committing it would give every check a permanent set of findings to explain.
// ============================================================================

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'qc-selftest-'));
const w = (rel, body) => {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, body);
};

// The qc code under test, copied so corpus.js resolves ROOT to the fixture.
//
// lit-extract.js is in this list for a reason worth stating. The `provenance`
// check does not own an extractor: it requires the one that research/
// lit-provenance.js also uses, so the corpus has ONE answer to "how many
// attributed quotations are there" instead of two that disagree. The first
// draft left that file in research/ and the fixture could not resolve it, so
// the whole selftest died. The fix is not a tolerant require -- a probed import
// yielding "no quotations found" would make the check pass green while checking
// nothing, which is precisely the failure ledgers.js was moved off this morning.
// The fix is that the shared code lives in qc/ and the fixture copies it.
for (const f of ['checks.js', 'corpus.js', 'lit-extract.js', 'tailfmt.js', 'questions.js'])
  w(path.join('research', 'qc', f), fs.readFileSync(path.join(__dirname, f), 'utf8'));

// The fixture's ledgers are empty BY CONSTRUCTION, not by a file failing to
// resolve. Every case below is meant to fire or stay silent on its own merits;
// importing the repo's real adjudications could only mask one. Written here
// rather than omitted so checks.js can require() it and a missing ledgers.js
// in the repo stays a hard error.
// One exception to emptiness, and it suppresses nothing: an ADJUDICATED key
// that matches NO pair. That is the M09f shape — a passage edited past the
// similarity threshold leaves its adjudication matching nothing, and until
// 2026-08-20 a vanished key was indistinguishable from a settled one. A key
// only ever suppresses when a live candidate pair carries it, so this stale
// entry cannot mask any other case.
// A second exception, also suppressing-and-flagging rather than masking: an
// ABSENCE_VERIFIED entry dated far in the past. The claim it suppresses stays
// suppressed (that part is the ledger working), and `absence-stale` must fire
// on it, because an absence verification does not survive the world changing
// underneath it (M19).
w(path.join('research', 'qc', 'ledgers.js'),
  'module.exports = { INTENDED_MISSING: new Map(),\n'
  + "  ABSENCE_VERIFIED: new Map([['research/absence-stale.md|never been run', '2026-08-01: verified against the directory as it stood THEN.']]),\n"
  + "  ADJUDICATED: new Map([['aaaaaa:bbbbbb', 'KEEP. Settled 2026-08-19 — and the pair it settled no longer exists.']]),\n"
  + '  ADJUDICATED_RETIRED: new Map() };\n');

// --- the home document: the research layer, already corrected ---------------
w('research/home-frame.md', `# The home frame

## 1. The multiplier budget

Measured across six tiles, our multiplier uses 77 to 214 percent of its budget,
and the fraction is not falling.

## 4. The origin excess

**Origin Excess Lemma.** For every smooth number y' with y'^2 > x, the origin
pane carries strictly more qualifying gaps than the mean pane, and the excess is
bounded below by a constant independent of the level.

## 6. Where the wall sits

The wall is at exponent 4.2665 and the target is 2, measured on G2 itself.
`);

// --- a summary quoting a phrase the home no longer contains ----------------
// The real one: gate-multiplies.md attributed "15 to 45 percent ... TRENDING
// DOWN" to U-FRAME, which by then said 77 to 214 percent and not falling.
w('research/summary-quote.md', `# Summary with a dead quotation

home-frame.md reports "the multiplier uses only 15 to 45 percent of its budget and the fraction is trending down" across the measured tiles.

See also research/titled-script.js and research/broken-syntax.js.
`);

// --- B4 (2026-08-20): the bag-of-long-words tier is gone --------------------
// The home says the two methods ARE comparable. One summary quotes it with
// "not" inserted — every word longer than three characters unchanged, so the
// 95%-of-long-words fallback cleared it. Another changes the exponent word
// inside the quote marks. A third is an honest ELIDED excerpt, which the
// contiguity tier must still clear.
w('research/quote-home.md', `# The home that owns the verdict

The settled verdict is that the two methods are genuinely comparable rather
than one dominating, and the elementary column is void for the bound below
the threshold at every computed level of the ladder.

Linked from research/quote-negated.md.
`);
w('research/quote-negated.md', `# A summary quoting it with one word inserted

quote-home.md says "the two methods are not genuinely comparable rather than one dominating", the reverse of what that file records.
`);
w('research/quote-exponent.md', `# A summary quoting a strength word wrongly

quote-home.md records that "the elementary column is void for the bound above the threshold" at every level.
`);
w('research/quote-elided.md', `# An honest excerpt with an elision

quote-home.md says "the two methods are genuinely comparable ... the elementary column is void" in its verdict paragraph.
`);

// --- the prose section form, which refs was blind to until wave 3 ----------
w('research/summary-prose-ref.md', `# Summary using prose section references

What home-frame section 4 and section 6a report is the bound on the origin pane.

Linked from research/summary-quote.md for reachability.
`);

// --- dead path, dead section, dead shorthand, plus a live control ----------
w('research/summary-badrefs.md', `# Summary with three dead references

The derivation is in research/does-not-exist.md, which is a dead path.
The statement is \`home-frame.md\` §6c, a section that does not exist.
The experiment is natal-cap-99, a shorthand that resolves to nothing.
For control, \`home-frame.md\` §4 exists and must NOT fire.

\`\`\`sh
node research/fenced-example-does-not-exist.js   # an EXAMPLE, not a pointer
\`\`\`
`);

// --- Complete JSON extensions, both repository-root and relative paths ---
w('research/data/live.json', '{"value":1}\n');
w('research/json-live-refs.md', `# Existing JSON inputs

Read research/data/live.json and [the same input](data/live.json).
Linked from research/home-frame.md.
`);
w('research/json-dead-root.md', `# Missing JSON input

Read research/data/missing.json.
`);
w('research/json-dead-relative.md', `# Missing relative JSON input

Read [the missing input](data/missing.json).
`);

// --- B2 (2026-08-20): dotted, lettered, and unsectioned § references --------
// SEARCH-CONVENTIONS.md cited sift-limit-attack.md §4.7 and the integer
// prefix cleared it for two audit waves; anchored-calm.md cited §P6, which
// matched no pattern at all; natal-cap-10 cited beta2-note.md §6.5 into a
// file whose sections run 1..8 undotted.
w('research/sectioned-home.md', `# A home with dotted and lettered sections

## 6. The exponent

### 6.1 The exact ladders

## Theorem A (the collapse)

**4.5 A bold-led sub-item** inside a numbered section.

Linked from research/summary-dotted-refs.md.
`);
w('research/unsectioned-home.md', `A home with no headings at all — not even a title line.
Linked from research/summary-dotted-refs.md.
`);
w('research/summary-dotted-refs.md', `# Section references of several shapes

The statement is \`sectioned-home.md\` §6.9, a subsection that does not exist.
The certificate is \`sectioned-home.md\` §P6, a label that is not a number.
The measurement is \`unsectioned-home.md\` §7, into a file with no labels.
For control, \`sectioned-home.md\` §6.1 exists and must NOT fire, and so must
\`sectioned-home.md\` §6 and the bold-led \`sectioned-home.md\` §4.5 and the
lettered \`sectioned-home.md\` §Theorem A.
`);

// --- B6 (2026-08-20): a settled-sounding word outside the vocabulary --------
w('research/calib-synonym.md', `# A lemma carried at a strength the vocabulary cannot see

**Deficit Lemma (ESTABLISHED).** The M12c shape: ESTABLISHED is not one of the
twelve markers, so the calibration check read nothing here at all.

Linked from research/calib-home.md.
`);

// --- B7 (2026-08-20): a short stem is not a pointer -------------------------
// A file named G2.md was "reachable" from every document that mentions G2;
// the fixture uses `wall.md` because the home says "the wall" in plain prose.
w('research/wall.md', `# A short-stemmed orphan
Nothing links here; the topic word appears everywhere in plain prose.
`);

// --- B8 (2026-08-20): a dated absence verification lapses -------------------
w('research/absence-stale.md', `# An absence verified long ago

The deep pass has never been run, and the engine is research/titled-script.js.

Linked from research/home-frame.md.
`);

// --- B9 (2026-08-20): a bold lead is not a list item ------------------------
// `**Bold lead.**` starts with `*`, so the block was scoped line-by-line and
// the convention on the ADJACENT line stopped counting: a false positive in
// search-convention (M08). The owning convention here sits one line below the
// verdict, same paragraph.
w('research/lit-absence-bold.md', `# A bold-opened paragraph with the convention adjacent

**The verdict.** Searching found no published growth law, ABSENT at every
exponent, run in the paired Jacobsthal function convention per OEIS A144311.

Linked from research/home-frame.md.
`);

// --- B11 (2026-08-20): both vocabularies in one provenance note -------------
w('research/lit-quote-mixed.md', `# A quotation whose note names a rendering AND a page

Ford's Lemma 3, read from the ar5iv HTML rendering, page 4, verbatim:

> The exceptional set has measure zero for every admissible choice of the
> parameter in the stated range.

Linked from research/home-frame.md.
`);

// --- a transferred claim with the hypothesis dropped -----------------------
// The real one: G2-STATE dropped "with y'^2 > x", which makes the lemma vacuous.
w('paper/summary-transfer.md', `# Paper summary carrying the lemma

**Origin Excess Lemma.** For every smooth number y', the origin pane carries
strictly more qualifying gaps than the mean pane, and the excess is bounded
below by a constant independent of the level.

Cited from research/home-frame.md.
`);

// --- an orphan, and a pair of orphans that cite only each other ------------
w('research/orphan-solo.md', `# A document nothing points at
Standalone content with no inbound reference at all.
`);
w('research/orphan-a.md', `# Orphan A
This points at research/orphan-b.md and nothing in the reading path points here.
`);
w('research/orphan-b.md', `# Orphan B
This points at research/orphan-a.md and nothing in the reading path points here.
`);

// --- a history file, which must NOT confer reachability on the orphan -----
w('research/history/staging/spent-report.md', `# A spent audit report, superseded

This report examined research/orphan-solo.md and made recommendations that were
applied and are now history.
`);

// --- scripts: one untitled and uncited, one titled and cited --------------
w('research/untitled-uncited.js', `// ============================================================================
// ============================================================================
const x = 1;
`);
w('research/titled-script.js', `// ============================================================================
// TITLED SCRIPT — computes the origin excess at six tiles
// ============================================================================
const x = 1;
`);

// A cited artifact that cannot run is a result nobody can reproduce.
w('research/broken-syntax.js', `// ============================================================================
// BROKEN SCRIPT — deliberately unparseable, cited so only the parse fires
// ============================================================================
const x = (1 + ;
`);

// --- widths: the three width incidents, in miniature -----------------------
// A defect class with no fixture is a class nobody has proved the instrument
// can see, and this one bit three times in three days while every COUNT
// identity in the affected scripts stayed PASS. The positives below are the
// shapes those incidents actually had; the controls beside them are the shapes
// that must never fire, because a width check that flags every Uint8Array in a
// sieve is a check whose red nobody reads.
w('research/widths-defects.js', `// ============================================================================
// WIDTHS DEFECTS — the three width incidents reproduced, cited so only widths speaks
// ============================================================================
const primes = [2, 3, 5, 7, 11];

// 2026-08-21: la held an INDEX into a list of size K. K = 37,534 at @31, and
// 198,274 at @37, where sixteen bits stop being enough.
function census(K, qs) {
  const la = new Uint16Array(4 * K);
  for (let m = 0; m < K; m++) la[m] = m;
  let s = 0;
  for (let m = 0; m < K; m++) s += qs[la[m]];
  return s;
}

// 2026-08-19: a bit index taken mod a VARIABLE modulus, beside the degenerate
// form that is wrong on its face.
function bits(o, q) {
  let m = 0;
  m |= 1 << (((-o) % q + q) % q);
  m |= 1 << 37;
  return m;
}

// 2026-08-21: a hardcoded capacity that is also an array stride. This one threw.
const LC = 7;
function divisors(n) {
  const list = new Int32Array(LC * n);
  for (let i = 0; i < n; i++) list[i * LC + 0] = i;
  return list;
}

function tag(rows) {
  const t = new Uint16Array(rows.length);
  t[0] = rows.length;
  const f = new Uint8Array(4);
  f[0] = 300;
  return [t, f];
}

function spf(N) {
  const s = new Uint16Array(N);
  for (const p of primes) s[p] = p;
  return s;
}

function primorial() {
  let P = 1;
  for (const p of primes) P *= p;
  return P;
}

const g = new Uint8Array(8);   // widths-ok:

// widths-ok: this annotation has drifted off its store and now guards nothing
const note = 'prose';
`);

w('research/widths-clean.js', `// ============================================================================
// WIDTHS CLEAN — the safe shapes, which must stay silent
// ============================================================================
const primes = [2, 3, 5, 7, 11];
const tab = new Int32Array(64);

function flags(n) {
  const f = new Uint8Array(n);
  for (let i = 0; i < n; i++) f[i] = 1;
  f[0] = 3;
  return f;
}

function shifts(x) {
  return ((x >> 5) & 31) | (1 << 5);
}

function guardedCensus(K, qs) {
  const gkey = new Uint16Array(K);
  if (K > 0xFFFF) throw new Error('gkey index ' + K + ' exceeds its container width');
  for (let m = 0; m < K; m++) gkey[m] = m;
  let s = 0;
  for (let m = 0; m < K; m++) s += qs[gkey[m]];
  return s;
}

function annotated(n) {
  // widths-ok: the fold index is 0..12 at every level this script can reach
  const akey = new Uint8Array(n);
  for (const q of primes) akey[q] = q;
  let t = 0;
  for (let i = 0; i < n; i++) t += tab[akey[i]];
  return t;
}

function primorial() {
  let P = 1n;
  for (const p of primes) P *= BigInt(p);
  return P;
}
`);

w('research/widths-cites.md', `# A note citing the two width fixtures

research/widths-defects.js and research/widths-clean.js are cited here so the
scripts check stays quiet about them and only widths speaks.

Linked from research/home-frame.md.
`);

// --- the same named object at two strengths in two files ------------------
// The real one: natal-cap-23's banner said the aggregate was PROVEN while the
// artifact's own status table reads "[OPEN] the aggregate theorem ... for all x".
w('research/calib-home.md', `# The home that owns the lemma

**Deficit Lemma (PROVEN).** For 1 <= m <= D/2, maxsum_m >= m*mbar*(1 - O(m/D)).

Linked from research/calib-summary.md.
`);
w('research/calib-summary.md', `# A summary carrying it at a different strength

**Deficit Lemma (MEASURED).** The same object, one step up the summary layer,
carried at a strength its home does not claim. See research/calib-home.md.
`);

// A control: an object whose marker AGREES across two files must stay silent.
w('research/calib-agree-a.md', `# One file
**Traverse Bound (PROVEN).** Telescoping the merge lemma caps the block.
Linked from research/calib-agree-b.md.
`);
w('research/calib-agree-b.md', `# Another file
**Traverse Bound (PROVEN).** The same object at the same strength.
See research/calib-agree-a.md.
`);

// --- a measurement with no producing script, which is Chris's rule of ----------
// 2026-08-18: our claims as tested must link to the script that produced them.
// Third-party numbers are exempt by that rule, so both controls below must stay
// silent: one cites a script, the other is quoted from the literature.
w('research/no-script-measure.md', `# A leaf note of ours
Measured across the ladder: 0.7361, 0.8148 and 0.9027, with the census
reaching 22309287 slots. Linked from research/home-frame.md.
`);
w('research/sourced-measure.md', `# A leaf note that names its script
Measured 0.7361 and 0.8148 by research/broken-syntax.js over 22309287 slots.
Linked from research/home-frame.md.
`);
w('research/lit-measure.md', `# Numbers quoted from the literature
Rankin 1938 and Ford et al. give the constant 0.7361 and the bound 22309287,
per arXiv:1412.5029. Linked from research/home-frame.md.
`);
// B5 (2026-08-20): the per-SECTION custody queue. One .js in section 1 used to
// exempt the whole file, including section 2's figures no script produced —
// the shape of the "25x with no producer" burn (M21).
w('research/mixed-sourcing.md', `# A note with one sourced section and one unsourced

## 1. What the engine measured

Measured 0.7361 and 0.8148 by research/broken-syntax.js over 22309287 slots.

## 2. What the summary adds

The retention then reaches 0.94118 and the census 41552903 slots, with the
band running 0.4462 to 0.5941.

Linked from research/home-frame.md.
`);

// --- an absence claim beside a real artifact, which is R-1 exactly -----------
// Wave 2 wrote "Not yet run, so the corpus holds exactly one" into the entry
// document while natal-cap-27-t4-at13.js sat in the same directory having
// computed and printed the theorem.
w('research/absence-claim.md', `# A summary asserting a computation was never done

The @13 pass has never been run, so only one such bound exists. The engine is
research/titled-script.js and nobody has computed the second.

Linked from research/summary-quote.md.
`);

// Controls: a LITERATURE absence and a QUOTED-MECHANISM absence are different
// classes with different owners, and must stay silent.
w('research/absence-literature.md', `# A literature absence, not an artifact absence

This note builds the two-class analogue that does not exist in the literature,
using research/titled-script.js as its engine.
`);
w('research/absence-mechanism.md', `# A named mechanism with no instance

The strata route has none ("Buchstab with exact strata" does not exist), which
research/titled-script.js does not change.
`);

// --- CHECK 9: which artifact was a quotation read from? ---------------------
// PRIOR-ART.md's standing rule of 2026-08-18. The PDF of record is the only
// thing that counts as verification; an ar5iv/HTML rendering, an abstract page,
// a snippet and a third paper quoting the first are all UNVERIFIED, which is a
// different claim from the one a document makes when it writes "verbatim".
w('research/lit-quote-noprov.md', `# A quotation with no provenance note

Rankin's Theorem 1, verbatim:

> The largest gap between consecutive primes below x exceeds a constant times
> log x times the iterated logarithm factors, for infinitely many x.

Linked from research/home-frame.md.
`);

// The note exists and names a MACHINE RENDERING, which is the layer that
// produced the FKMPT constant this repo carried and later retracted at source.
w('research/lit-quote-ar5iv.md', `# A quotation whose provenance is a rendering

Ford's Lemma 2, read from the ar5iv HTML rendering, verbatim:

> The sifted set contains a gap larger than the trivial bound for all
> sufficiently large values of the parameter.

Linked from research/home-frame.md.
`);

// Controls. One quotation read from the PDF of record with a page, and one
// block that is our own program output and is not an attribution at all.
w('research/lit-quote-pdf.md', `# A quotation read from the PDF of record

Maynard's Theorem 1.1, read from the arXiv PDF, page 4, verbatim:

> There are infinitely many pairs of primes differing by a bounded amount.

Linked from research/home-frame.md.
`);
w('research/own-output.md', `# Our own program output, quoted as a block

research/titled-script.js prints:

> origin excess 1.25 at eight times the threshold
> census reaching 22309287 slots

Linked from research/home-frame.md.
`);

// --- CHECK 10: an absence IN THE LITERATURE must say where it looked --------
// The conventions document the check parses. The vocabulary is never copied
// into the engine: a second list of what counts as searching properly would go
// stale the first time this table gained a row.
w('research/SEARCH-CONVENTIONS.md', `# Search conventions for this corpus

## 1. The owning conventions, by object

The **owning convention** is the wording the literature actually uses.

| object | our name | canonical | **OWNING convention — search THIS** | where it lives |
|---|---|---|---|---|
| max gap between twin-admissible slots | \`G2\`, twin Jacobsthal | two-class Jacobsthal function | **"the length of the longest sequence of consecutive integers each equal to 1 or -1 modulo at least one of the first n primes"** | **OEIS A144311** |
| same object, weaker | — | — | **"paired Jacobsthal function"** | Ziller-Morack arXiv:1706.00317; OEIS A288815 |

**House terms that must be translated before any search** — none of these
appears in any paper: tile → primorial wheel; fold → sieve extension by the
next prime; zone → the interval between a prime and the next square.

## 2. Where this is read from
Linked from research/home-frame.md.
`);

// The known positives, both recovered from git: research/two-class-lower-bounds.md
// §2 as it stood before 2026-08-18 carried row 3 "lower-bound construction for a
// 2-dimensional sieved set | ABSENT | see queries below" and row 5 "the same
// accounting run in dimension 2 | ABSENT; done for the first time in §4 here".
// Both were FALSE and both were corrected the same day: Kalmynin-Konyagin,
// Izv. Math. 88:2 (2024), publish exactly that construction and do run a
// dimension-2 ledger. Neither cell named an owning convention.
w('research/lit-absence.md', `# A literature verdict table with two unconventioned absences

| # | question | verdict | source |
|---|---|---|---|
| 3 | lower-bound construction for a 2-dimensional sieved set | **ABSENT** | see queries below |
| 5 | the same accounting run in dimension 2 | **ABSENT**; done for the first time here | |
| 7 | a lower bound for the paired Jacobsthal function | **ABSENT**; only a conjecture | arXiv:1706.00317 |

Nobody has bounded the fold or the tile at any level, and the zone was clean.

Linked from research/home-frame.md.
`);

// Controls, one per way of satisfying the rule, plus the two shapes that are
// mentions rather than claims.
w('research/lit-absence-ok.md', `# Absence claims that say where they looked

No published upper bound exists at any exponent, searched per
research/SEARCH-CONVENTIONS.md in the convention that owns the object.

Searching OEIS A144311 and the paired Jacobsthal function finds no published
asymptotic growth law.

Legend: [PROVEN] = published theorem; [CONJ] = published conjecture; [ABSENT] =
we searched and found nothing published.

The style rule "To our knowledge, no one has noticed" is banned in this corpus.

Linked from research/home-frame.md.
`);

w('README.md', `# Fixture entry point
Read research/home-frame.md, then research/summary-quote.md,
research/summary-prose-ref.md, research/summary-badrefs.md and
paper/summary-transfer.md.

The literature layer: research/SEARCH-CONVENTIONS.md, research/lit-absence.md,
research/lit-absence-ok.md, research/lit-quote-noprov.md,
research/lit-quote-ar5iv.md, research/lit-quote-pdf.md and
research/own-output.md.
`);

// --- run and assert -------------------------------------------------------

// --- the formal embed: a tail that lies about which code produced it -------
// The real defect this stands for: attack-lower-bound.js carried an OUTPUT
// block and eight numbered READINGS written BEFORE the file had ever been
// executed, and 05-twin-jacobsthal.js carries a p = 29 row its committed code
// stops short of producing. The fingerprint makes both statically visible.
{
  const T = require('./tailfmt');
  const mk = (headline, codeHash, outHash, value) => `// ${'='.repeat(76)}
// ${headline}
// ${'='.repeat(76)}
const answer = 41;
console.log('answer = ' + answer);
// ${'='.repeat(76)}
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/embed-x.js
//   invocation:  node research/embed-x.js
//   code-sha256: ${codeHash}
//   out-sha256:  ${outHash}
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.1 s
// ${'='.repeat(76)}
// answer = ${value}
// ${'='.repeat(76)}
// READINGS
// 1. The answer is ${value}.
`;
  // Honest: the recorded code hash is the hash of the code above the banner,
  // and the recorded out hash is the hash of the (normalised) body. Until
  // 2026-08-20 this fixture carried out-sha256 = 000…0 and was a PASSING
  // control — proof inside the selftest that no static check ever read
  // out-sha256 (verify-the-verifier-checks.md §3). It cannot be all-zeros now.
  const probe = mk('EMBED HONEST — the tail belongs to this code', 'P', 'P', 41);
  const honestHash = T.sha(T.headText(probe));
  const honestOut = T.sha(T.normalize('answer = 41'));
  w('research/embed-honest.js', mk('EMBED HONEST — the tail belongs to this code', honestHash, honestOut, 41));
  // Broken: a plausible code hash that is not this code's. This is what
  // editing the code and leaving the old output beside it looks like.
  w('research/embed-broken.js', mk('EMBED BROKEN — the code changed after the tail was written',
    'dead'.repeat(16), honestOut, 41));
  // BODY-EDITED: the code hash is HONEST and one digit inside the bound block
  // was changed by hand. This is the defect out-sha256 was written for and
  // that no static check read until 2026-08-20: a forged row passed
  // `embed.js --check` AND `qc.js embeds`, both green
  // (verify-the-verifier-embeds.md §1.4 — the attack-lower-bound class).
  {
    const probe2 = mk('EMBED BODY-EDITED — a digit changed inside the bound block', 'P', 'P', 47);
    const editedCode = T.sha(T.headText(probe2));
    w('research/embed-body-edited.js',
      mk('EMBED BODY-EDITED — a digit changed inside the bound block', editedCode, honestOut, 47));
  }
  // BINDING-LOST: the file says OUTPUT — EMBEDDED and no tail parses as
  // fingerprinted (here: the code-sha line is gone). Commit 391bd7a put
  // a3-08-adjacent-pairs.js in exactly this state and the gate read the same
  // TOTAL for four commits while `embeds` silently stopped checking it.
  w('research/embed-binding-lost.js',
    mk('EMBED BINDING-LOST — the header lost its hashes', 'x', 'x', 41)
      .split('\n').filter(l => !/code-sha256/.test(l)).join('\n'));
  // MULTI-TAIL: two stages, each independently bound; the whole file's code is
  // what sits above the FIRST banner. Both tails must verify, and an edit
  // inside the SECOND tail's block must fire on that tail alone.
  {
    const rule = '// ' + '='.repeat(76);
    const mkMulti = (codeHash, aOut, bOut, bVal) => [
      rule, '// EMBED MULTI — two bound stages', rule,
      "const s = process.argv[2] || 'a';",
      "console.log(s === 'a' ? 'stage a 111222' : 'stage b 333444');",
      rule, '// OUTPUT — stage a (EMBEDDED marker: OUTPUT — EMBEDDED)',
      '//   invocation:  node research/embed-multi.js a',
      `//   code-sha256: ${codeHash}`, `//   out-sha256:  ${aOut}`,
      '//   body-lines:  1',
      rule, '// stage a 111222', rule, '// READINGS', '// stage a reading.',
      rule, '// OUTPUT — stage b (EMBEDDED marker: OUTPUT — EMBEDDED)',
      '//   invocation:  node research/embed-multi.js b',
      `//   code-sha256: ${codeHash}`, `//   out-sha256:  ${bOut}`,
      '//   body-lines:  1',
      rule, `// stage b ${bVal}`, rule, '// READINGS', '// stage b reading.',
    ].join('\n') + '\n';
    const probeM = mkMulti('P', 'P', 'P', '333444');
    const codeM = T.sha(T.headTextAll(probeM));
    const aOut = T.sha(T.normalize('stage a 111222'));
    const bOut = T.sha(T.normalize('stage b 333444'));
    w('research/embed-multi.js', mkMulti(codeM, aOut, bOut, '333444'));
    w('research/embed-multi-edited.js', mkMulti(codeM, aOut, bOut, '999999'));
  }
  // TWO LEGACY TAIL SHAPES THAT THE PARSER WAS BLIND TO UNTIL 2026-08-19.
  // Both returned an EMPTY body, both consumers skipped them, and the migration
  // counter under-read by more than half — but the real damage was that
  // `embed.js`'s guard against overwriting legacy evidence was inert on exactly
  // these files, and was demonstrated destroying a row while exiting 0. These
  // fixtures fire `hand-pasted-tail`, which is only reachable when the body
  // parses, so a parser that goes blind again fails here instead of silently.
  w('research/legacy-no-rule.js', `// ${'='.repeat(70)}
// LEGACY NO-RULE — output begins on the line after OUTPUT, with no rule
// ${'='.repeat(70)}
console.log('x = 1');
// ${'='.repeat(70)}
// OUTPUT (run of 2026-08-13), abridged:
//
// 5       | 49             | 11,13             | 4.45e+0
// 71      | 5329           | 101,103           | 5.28e+1
// ${'='.repeat(70)}
// READINGS
// 1. The margin at 71 is 5.28e+1.
`);
  w('research/legacy-block-body.js', `// ${'='.repeat(70)}
// LEGACY BLOCK BODY — the pasted run sits in a block comment, not // lines
// ${'='.repeat(70)}
console.log('y = 2');
// ${'='.repeat(70)}
// OUTPUT (2026-08-18) — full run
// ${'='.repeat(70)}
/*
   [0.0s] fold T5 (D=3) by 7 ...
   [0.0s] fold T7 (D=15) by 11 ...
   total 22275 survivors
*/
// ${'='.repeat(70)}
// READINGS
// 1. There are 22275 survivors.
`);
  w('research/legacy-cites.md', `# A note citing the two legacy tail fixtures

research/legacy-no-rule.js and research/legacy-block-body.js are cited here so
the scripts check stays quiet about them.

Linked from research/home-frame.md.
`);
  w('research/embed-cites.md', `# A note citing both embed fixtures

Both research/embed-honest.js and research/embed-broken.js are cited here so
the scripts check does not flag them, leaving the embed check the only thing
speaking about them.

Linked from research/home-frame.md.
`);
}


// --- the question ledger (2026-08-28): "we keep re-running things" ----------
// The defect it exists for: TODO item 0's first move was re-briefed a week after
// attack-rhoms-01.md had executed it. A note names the item it executes; the
// item must list the note's question id on its Ledger: line.
w('TODO.md', `# TODO fixture

**7. An item that acknowledges its executed question.** Prose.
   Ledger: Q-ack-case, Q-parity-missing-case, Q-parity-thin-case, Q-parity-named-case

**8. An item that does not acknowledge its executed question.** Prose.

**9. An item whose Ledger line points at nothing.** Prose.
   Ledger: Q-nothing-here
`);
const block = (id, status, todo, q, v, parity = 'residue-only') => `<!-- ledger\nid: ${id}\nstatus: ${status}\ntodo: ${todo}\nquestion: ${q}\nverdict: ${v}\nparity: ${parity}\n-->`;
// --- the parity gate (2026-09-05): "we just want twin prime goal" ------------
// The defect it checks is missing input documentation, not mathematical
// feasibility or a universal sieve obstruction. The fixture has no git,
// so every file counts as new and the gate is in scope for all of them.
w('research/history/staging/parity-missing.md', `# No parity line\n\n<!-- ledger\nid: Q-parity-missing-case\nstatus: OPEN\ntodo: 7\nquestion: An attack note that never says what it consumes?\nverdict: It does not.\n-->\n\nBody.\n`);
w('research/history/staging/parity-thin.md', `# Placeholder parity line\n\n${block('Q-parity-thin-case', 'OPEN', '7', 'A placeholder for the input?', 'Yes.', 'n/a')}\n\nBody.\n`);
w('research/history/staging/parity-named.md', `# Named input\n\n${block('Q-parity-named-case', 'OPEN', '7', 'A named arithmetic input?', 'Yes.', 'A specified Type II estimate for a shifted-prime sequence; the estimate is unproved')}\n\nBody.\n`);
w('research/history/staging/parity-not-attack.md', `# Not an attack note\n\n<!-- ledger\nid: Q-parity-not-attack\nstatus: ANSWERED\ntodo: none\nquestion: A note under no item?\nverdict: Out of scope.\n-->\n\nBody.\n`);
w('research/history/staging/ledger-ack.md', `# Acknowledged\n\n${block('Q-ack-case', 'ANSWERED', '7', 'Was it run?', 'Yes.')}\n\nBody.\n`);
w('research/history/staging/ledger-unack.md', `# Unacknowledged\n\n${block('Q-unack-case', 'CLOSED', '8', 'Was it run?', 'Yes, and item 8 does not say so.')}\n\nBody.\n`);
w('research/history/staging/ledger-bad.md', `# Malformed\n\n<!-- ledger\nid: Q-bad-case\nstatus: BOGUS\ntodo: none\nquestion: A question with no verdict line\n-->\n\nBody.\n`);
w('research/history/staging/ledger-unknown.md', `# Unknown item\n\n${block('Q-unknown-item', 'ANSWERED', '99', 'Names an item that is not in TODO.md?', 'It does.')}\n\nBody.\n`);
w('research/history/staging/ledger-conflict-a.md', `# Conflict A\n\n${block('Q-shared-id', 'ANSWERED', 'none', 'First question text', 'A.')}\n\nBody.\n`);
w('research/history/staging/ledger-conflict-b.md', `# Conflict B\n\n${block('Q-shared-id', 'ANSWERED', 'none', 'A different question under the same id', 'B.')}\n\nBody.\n`);

const checks = require(path.join(root, 'research', 'qc', 'checks.js'));

const found = {};
// Run EVERY exported check, not a hand-maintained list. Until 2026-08-18 this
// line named the seven checks explicitly, so a newly added check was silently
// absent from the selftest and could ship with no known positive at all -- which
// is exactly what happened to `sourcing` and is how this was found. The whole
// point of this file is that a zero from qc.js means something, and that
// guarantee was only ever as complete as this array.
const record = r => {
  for (const f of r.findings) (found[f.kind] = found[f.kind] || []).push(`${f.file}:${f.line} ${f.detail}`);
};
for (const run of Object.values(checks).filter(v => typeof v === 'function')) record(run());
record(require(path.join(root, 'research', 'qc', 'questions.js')).ledger());
record(require(path.join(root, 'research', 'qc', 'questions.js')).parity());

// THE CALIBRATION BRANCH NEEDS ITS OWN RUN, because it deliberately suppresses
// everything else. If the extractor cannot find quotations known to be there,
// `provenance` reports THAT and no counts, since a number from a sweep that
// cannot find what is known to be present is worse than no number: it reads as
// coverage. So the two cases cannot co-fire in one fixture. Writing the
// calibration file with its anchor quotes absent and re-running is what proves
// the branch is reachable at all -- and the branch matters, because the real
// list went stale within two hours of being written when three commits moved
// the lines it was keyed to.
w('research/two-class-lower-bounds.md', `# The calibration target, with its quotations gone

This file exists so the extractor's known positives have somewhere to be
missing from. It contains no quoted blocks at all.

Linked from research/home-frame.md.
`);
record(checks.provenance());

// What each case is, and the real defect it stands for.
const EXPECT = [
  ['ledger-todo-unlisted', 'Q-unack-case', 'THE RE-RUN GUARD: a note executed under item 8 and item 8 does not list it (the attack-rhoms-01 shape, re-briefed a week later)'],
  ['ledger-malformed', 'ledger-bad.md', 'a block with a status outside the enum and no verdict line'],
  ['ledger-todo-unknown', 'ledger-unknown.md', 'a note naming a TODO item that does not exist'],
  ['ledger-id-conflict', 'ledger-conflict', 'two notes sharing an id with different question text'],
  ['ledger-todo-dangling', 'Q-nothing-here', 'a Ledger: line pointing at an id no note carries'],
  ['parity-missing', 'parity-missing.md', 'THE PARITY GATE: an attack note that never documents its arithmetic inputs and scope'],
  ['parity-placeholder', 'parity-thin.md', 'a parity: line holding a placeholder instead of an input or the word residue-only'],
  ['hand-pasted-tail', 'legacy-no-rule.js', 'a legacy tail whose output starts with no rule after OUTPUT — parsed as EMPTY until 2026-08-19, which made the overwrite guard inert on 47 files'],
  ['hand-pasted-tail', 'legacy-block-body.js', 'a legacy tail whose body is a /* */ block — the other blind shape, 21 more files'],
  ['tail-does-not-belong-to-this-code', 'embed-broken.js', "a pasted output whose fingerprint names code that is not the code above it"],
  ['output-block-hand-edited', 'embed-body-edited.js', 'a digit changed by hand inside a BOUND block: code-sha256 matches, and until 2026-08-20 nothing read out-sha256 statically'],
  ['output-block-hand-edited', 'embed-multi-edited.js', 'the same defect inside the SECOND tail of a multi-tail file'],
  ['binding-lost', 'embed-binding-lost.js', 'a file that says OUTPUT — EMBEDDED whose fingerprint evaporated (the 391bd7a a3-08 regression)'],
  ['no-output-block', 'titled-script.js', 'a cited script with no OUTPUT banner: outside output custody entirely, and counted as such since 2026-08-20'],
  ['dead-path', 'research/summary-badrefs.md', 'a reference to a file that does not exist'],
  ['dead-path', 'research/json-dead-root.md', 'a missing JSON input is checked at its full extension'],
  ['dead-relative-path', 'research/json-dead-relative.md', 'a missing relative JSON input is checked'],
  ['dead-section', 'research/summary-badrefs.md', 'maier-matrix.md citing origin-excess.md §6c'],
  ['dead-section', 'research/summary-prose-ref.md', 'the PROSE form, "DOC section 6a", blind until wave 3'],
  ['dead-shorthand', 'research/summary-badrefs.md', 'a cap-NN shorthand resolving to nothing'],
  ['dead-section', 'summary-dotted-refs.md:3', 'a dotted subsection that does not exist: the integer prefix cleared §4.7 for two audit waves (B2)'],
  ['dead-section', 'summary-dotted-refs.md:4', 'a non-numeric label (§P6) that matched no pattern at all until 2026-08-20'],
  ['section-into-unsectioned-file', 'summary-dotted-refs.md:5', 'a § pointer into a file with no parseable labels, which returned early and cleared silently'],
  ['unmarked-strength-word', 'research/calib-synonym.md', 'ESTABLISHED beside a named object: a settled-sounding word outside the twelve markers (M12c)'],
  ['reachability-unprovable', 'research/wall.md', 'a short-stemmed file "reachable" only through topic-word collisions (M25)'],
  ['absence-stale', 'research/absence-stale.md', 'a dated absence verification past its review interval: falsified by a new artifact without its sentence changing (M19)'],
  ['mixed-provenance', 'research/lit-quote-mixed.md', 'a note naming BOTH a page and an ar5iv rendering: one qualifying token used to beat every disqualifying one (M22)'],
  ['dead-quotation', 'research/summary-quote.md', 'gate-multiplies quoting a sentence U-FRAME had already corrected'],
  ['dead-quotation', 'research/quote-negated.md', 'a quotation that GAINS the word "not": short words were not content words, so the old fuzzy tier cleared it (M05)'],
  ['dead-quotation', 'research/quote-exponent.md', 'one strength word changed inside the quote marks (the M05c exponent class)'],
  ['unreachable', 'research/orphan-solo.md', 'an orphan cited ONLY by a spent history report'],
  ['off-the-path', 'research/orphan-a.md', 'a clique of documents clearing each other'],
  ['off-the-path', 'research/orphan-b.md', 'the other half of the clique'],
  ['no-banner-title', 'research/untitled-uncited.js', 'a script a reader cannot identify'],
  ['uncited-script', 'research/untitled-uncited.js', 'a result no document points at'],
  ['transferred-claim', 'paper/summary-transfer.md', "G2-STATE dropping \"with y'^2 > x\""],
  ['adjudicated-pair-vanished', 'aaaaaa:bbbbbb', 'a ledger key matching no live pair — a dropped scope took a real pair from c=0.89 to c=0.57 and out of the check (M09f)'],
  ['calibration-disagreement', 'research/calib-summary.md', "cap-23's banner calling PROVEN what its own table calls OPEN"],
  ['unverified-absence-claim', 'research/absence-claim.md', 'R-1: "never been run" beside the script that ran it'],
  ['does-not-parse', 'research/broken-syntax.js', 'a cited artifact that cannot run'],
  ['unsourced-measurement', 'research/no-script-measure.md', "our numbers with no script named (Chris's rule, 2026-08-18)"],
  ['unsourced-section', 'mixed-sourcing.md:7', 'the section whose figures no script produced: the .js in section 1 exempted the whole file until 2026-08-20 (M21)'],
  ['unprovenanced-quotation', 'research/lit-quote-noprov.md', '"verbatim" with no word about WHICH artifact was read'],
  ['disqualified-provenance', 'research/lit-quote-ar5iv.md', 'the note names an ar5iv rendering: the layer that produced the retracted FKMPT constant'],
  ['unconventioned-absence', 'research/lit-absence.md:5', 'two-class §2 row 3: ABSENT, no owning convention, and it was FALSE'],
  ['unconventioned-absence', 'research/lit-absence.md:6', 'two-class §2 row 5: ABSENT plus "for the first time", also narrowed the same day'],
  ['unconventioned-absence', 'research/lit-absence.md:9', 'a clean negative run entirely in OUR vocabulary, which is the five-wave failure'],
  ['extractor-uncalibrated', 'research/two-class-lower-bounds.md', 'the quotation extractor stops finding quotations known to be there'],
  ['narrow-store-holds-index', 'widths-defects.js', 'incident 2: a Uint16Array holding an INDEX into a K-sized list — fits at @31 (K=37,534), aliases at @37 (K=198,274), and every COUNT identity still passed'],
  ['shift-count-over-31', 'widths-defects.js', 'incident 1 in its provable form: `1 << 37` is `1 << 5`, because JS takes the shift count mod 32'],
  ['shift-count-from-modulus', 'widths-defects.js', 'incident 1 as it was actually written: a bit index mod a VARIABLE q, correct below 32 and silently aliased above it'],
  ['capacity-literal-as-stride', 'widths-defects.js', 'incident 3: LC = 7 as both allocation factor and index stride, exceeded at @37 — the one that threw, and so cost a single run'],
  ['narrow-store-from-length', 'widths-defects.js', 'an array length stored in sixteen bits: bounded by nothing in the source'],
  ['narrow-store-over-cap', 'widths-defects.js', 'a literal 300 stored in a Uint8Array, wrong on its face'],
  ['narrow-store-holds-prime', 'widths-defects.js', 'a prime stored in sixteen bits: primes are unbounded by anything in the source'],
  ['unsafe-integer-product', 'widths-defects.js', 'a primorial accumulated in a Number: 37# fits under 2^53 and 47# does not'],
  ['widths-ok-without-reason', 'widths-defects.js', 'a bare `// widths-ok:` signs nothing off, so it suppresses nothing and is itself a finding'],
  ['widths-ok-matches-nothing', 'widths-defects.js', 'an annotation that has drifted off its store: a suppression with no target is a blindfold'],
];

// Controls: things that must NOT fire, because a check that flags everything is
// as useless as one that flags nothing.
const FORBID = [
  ['ledger-todo-unlisted', 'Q-ack-case', 'an item that lists its executed question stays silent'],
  ['ledger-malformed', 'ledger-ack.md', 'a well-formed block stays silent'],
  ['parity-missing', 'parity-named.md', 'a named arithmetic input stays silent'],
  ['parity-missing', 'ledger-ack.md', 'residue-only is an honest declaration and stays silent'],
  ['parity-missing', 'parity-not-attack.md', 'a note under no live item is out of the gate\'s scope'],
  ['parity-placeholder', 'parity-named.md', 'a real one-line input is not a placeholder'],
  ['tail-does-not-belong-to-this-code', 'embed-honest.js', 'a tail whose fingerprint DOES match the code above it'],
  ['hand-pasted-tail', 'embed-honest.js', 'a fingerprinted tail is not part of the legacy backlog'],
  ['output-block-hand-edited', 'embed-honest.js', 'an untouched bound block hashes to its own record and stays silent'],
  ['output-block-hand-edited', 'embed-multi.js', 'both tails of an untouched multi-tail file verify'],
  ['tail-does-not-belong-to-this-code', 'embed-multi', 'multi-tail code-sha covers the bytes above the FIRST banner, for every tail'],
  ['binding-lost', 'embed-honest.js', 'a file whose fingerprint parses is not binding-lost'],
  ['no-output-block', 'embed-honest.js', 'a script WITH a banner is not in the no-custody population'],
  ['dead-section', 'home-frame.md §4', 'a section reference that resolves'],
  ['dead-path', 'fenced-example', 'a dead path inside a fenced code block is an example, not a pointer (M26)'],
  ['dead-path', 'research/json-live-refs.md', 'an existing JSON path is not truncated to a nonexistent JS file'],
  ['dead-relative-path', 'research/json-live-refs.md', 'an existing relative JSON path resolves with its full extension'],
  ['dead-section', 'summary-dotted-refs.md:6', 'the control references: §6.1 dotted, §6 plain'],
  ['dead-section', 'summary-dotted-refs.md:7', 'the bold-led §4.5 and lettered §Theorem A controls'],
  ['dead-section', 'summary-dotted-refs.md:8', 'the lettered control continues here'],
  ['unmarked-strength-word', 'calib-home', 'a real marker (PROVEN) is not a synonym'],
  ['unreachable', 'research/wall.md', 'unprovable is its own verdict, not orphanhood'],
  ['unverified-absence-claim', 'absence-stale', 'the ledger entry still suppresses the claim; only the staleness fires'],
  ['unconventioned-absence', 'lit-absence-bold', 'a bold-opened paragraph whose owning convention sits on the ADJACENT line: bold is not a list item (M08/B9)'],
  ['disqualified-provenance', 'lit-quote-mixed', 'both vocabularies present is mixed-provenance, not disqualified'],
  ['dead-quotation', 'summary-prose-ref', 'prose with no quotation in it'],
  ['dead-quotation', 'quote-elided', 'an honest excerpt with an "..." elision, every part verbatim and in order'],
  ['dead-quotation', 'quote-home', 'the home stating its own sentence is not a quotation of anyone'],
  ['calibration-disagreement', 'calib-agree', 'the same object at the SAME strength in two files'],
  ['unverified-absence-claim', 'absence-literature', 'an absence in the LITERATURE, which PRIOR-ART owns'],
  ['unverified-absence-claim', 'absence-mechanism', 'a quoted MECHANISM name with no instance'],
  ['unsourced-measurement', 'sourced-measure', 'a measurement that DOES name its script'],
  ['unsourced-section', 'mixed-sourcing.md:3', 'the section that DOES name its script must stay silent'],
  ['unsourced-measurement', 'mixed-sourcing', 'the file-level rule is satisfied by the section-1 producer'],
  ['unsourced-measurement', 'lit-measure', 'numbers quoted from the literature, exempt by the rule'],
  ['unprovenanced-quotation', 'lit-quote-pdf', 'a quotation read from the PDF of record, with a page'],
  ['unprovenanced-quotation', 'own-output', 'our own program output in a block: not an attribution at all'],
  ['disqualified-provenance', 'lit-quote-pdf', 'a note naming the PDF is verification, not a rendering'],
  ['unconventioned-absence', 'lit-absence-ok', 'absences that cite the conventions file or name the owning convention'],
  ['narrow-store-over-cap', 'widths-clean.js', 'a Uint8Array holding a genuine 0-3 flag is the safe case, and the sieve population is most of this corpus'],
  ['shift-count-over-31', 'widths-clean.js', 'a shift by a literal small constant is not a finding'],
  ['shift-count-from-modulus', 'widths-clean.js', 'nor is `(x >> 5) & 31`, which is masked into range'],
  ['narrow-store-holds-index', 'widths-clean.js', 'a container whose file THROWS on its bound is not carrying the risk silently: adopting the guard clears the entry'],
  ['narrow-store-holds-prime', 'widths-clean.js', 'and a `// widths-ok:` with a real reason suppresses its own store, which is what makes the annotation an audit trail'],
  ['unsafe-integer-product', 'widths-clean.js', 'a product accumulated in BigInt has no 2^53 edge to fall off'],
  ['widths-ok-matches-nothing', 'widths-clean.js', 'an annotation sitting on the store it signs off is exactly right'],
  ['unconventioned-absence', 'lit-absence.md:7', 'the row that DOES name arXiv:1706.00317 and the paired Jacobsthal function'],
];

let bad = 0;
console.log('qc selftest: do the checks fire on defects we know are defects?\n');

// --- tailfmt.normalize: timing shapes are volatile, data numbers are not ----
// Added 2026-08-19 with the key-form rule ("secs":70.2 — unit BEFORE the
// number), the blind shape that made two fresh embeds permanently fail
// --check while every real figure reproduced. A normalize rule with no case
// here is a rule nobody has proved collapses what it should and ONLY that.
{
  const T = require(path.join(root, 'research', 'qc', 'tailfmt.js'));
  const eq = (a, b) => T.normalize(a) === T.normalize(b);
  const NCASES = [
    [true,  'x [53.4s] y',    'x [99.9s] y',    'bracketed timing collapses'],
    [true,  'done in 70.2 s', 'done in 1.1 s',  'suffix timing collapses'],
    [true,  '"secs":70.2,',   '"secs":431.9,',  'key-form timing collapses (2026-08-19 shape)'],
    [false, 'f = 70.2',       'f = 431.9',      'a plain data number is PRESERVED'],
    [false, '"count":70',     '"count":99',     'a non-time JSON key is PRESERVED'],
    // 2026-08-20, the min-rule lookahead miss: "24.9 min wall" IS a wall clock
    // and the bare letter-lookahead refused it; `min(j` and the aligned-column
    // minimum must both stay data.
    [true,  'took 24.9 min wall', 'took 99.1 min wall', 'a "N min wall" clock collapses (lookahead miss, 2026-08-20)'],
    [false, 'W / (2 min(j, W-j))', 'W / (9 min(j, W-j))', 'min() the FUNCTION is PRESERVED'],
    [false, 'gap 6   min',    'gap 9   min',    'a column-aligned minimum is PRESERVED'],
    // Q6 (Chris, 2026-08-20): a bare number under a column literally headed
    // `secs` is a wall clock; the scope ends at the first non-row line, so a
    // later data table is untouched. This is the shape that made
    // two-class-lower-bounds.js's --check amber forever.
    [true,  ' x  replay  secs\n 37  OK  12.8\n 73  OK  5.2',
            ' x  replay  secs\n 37  OK  99.9\n 73  OK  1.1', 'a bare secs COLUMN collapses (Q6, 2026-08-20)'],
    [false, ' x  secs\n 37  1.0\n\n y  ratio\n 1  2.27',
            ' x  secs\n 37  1.0\n\n y  ratio\n 1  9.99', 'a data table BELOW the secs table is PRESERVED'],
  ];
  for (const [want, a, b, why] of NCASES) {
    const got = eq(a, b);
    if (got !== want) bad++;
    console.log(`  ${got === want ? (want ? 'FIRES ' : 'silent') : '*NORM FAIL*'}  normalize          ${(a + ' ~ ' + b).replace(/\n/g, '⏎').slice(0, 38).padEnd(38)} ${why}`);
  }
  // figures() must not let a trailing comma into a token: "min 548,402," must
  // yield the figure 548,402 and match a block that prints 548,402 (2026-08-19
  // false-positive class in the readings-not-traceable advisory).
  {
    const toks = [...T.figures('min 548,402, max 548,442,').keys()];
    const okTok = toks.includes('548,402') && toks.includes('548,442') &&
                  !toks.some(t => t.endsWith(','));
    if (!okTok) bad++;
    console.log(`  ${okTok ? 'silent' : '*NORM FAIL*'}  figures            ${'"min 548,402," tokenizes clean'.padEnd(38)} trailing comma stays out of the token`);
  }
  // THE THREE TOKENIZER FALSE-POSITIVE CLASSES, closed 2026-08-20.
  // (1) identifier digits: A048670 / arXiv ids / DOI paths are addresses, not
  //     figures — "048670" flagged external-ladders-01.js's readings for weeks.
  {
    const toks = [...T.figures('control A048670, arXiv:2302.00459 and doi.org/10.1093/imrn').keys()];
    const okId = toks.length === 0;
    if (!okId) bad++;
    console.log(`  ${okId ? 'silent' : '*NORM FAIL*'}  figures            ${'"A048670" yields no figure token'.padEnd(38)} OEIS/arXiv/DOI ids are addresses, not figures`);
  }
  // (2) hyphen-ranges: "1.54-2.27" must never yield "-2.27".
  {
    const toks = [...T.figures('band 1.54-2.27, bracket [30.8-42.9]').keys()];
    const okRange = toks.includes('2.27') && toks.includes('42.9') && !toks.some(t => t.startsWith('-'));
    if (!okRange) bad++;
    console.log(`  ${okRange ? 'silent' : '*NORM FAIL*'}  figures            ${'"1.54-2.27" is a range, not -2.27'.padEnd(38)} a hyphen after a digit is a range separator`);
    const neg = [...T.figures('slope = -2.271 here').keys()];
    const okNeg = neg.includes('-2.271');
    if (!okNeg) bad++;
    console.log(`  ${okNeg ? 'silent' : '*NORM FAIL*'}  figures            ${'"= -2.271" keeps its minus sign'.padEnd(38)} a real negative is still a negative`);
  }
  // (3) exponent-notation variants: 3.0e8 == 3.0e+08 for presence checks.
  {
    const okExp = T.presentIn('3.0e8', 'row 3.0e+08 here') && T.presentIn('2.23e+8', 'only 2.23e8')
      && !T.presentIn('3.0e8', 'row 3.1e+08 here');
    if (!okExp) bad++;
    console.log(`  ${okExp ? 'silent' : '*NORM FAIL*'}  presentIn          ${'3.0e8 matches 3.0e+08, not 3.1e+08'.padEnd(38)} exponent spellings are one figure`);
  }
  // OUT_HEAD is tight (2026-08-20): a prose line beginning with the word
  // OUTPUT must not capture the banner — commit 391bd7a's shape unbound
  // a3-08-adjacent-pairs.js silently.
  {
    const okHead = !T.OUT_HEAD.test('//   OUTPUT, which is a cross-check rather than a second source: 109884182,')
      && !T.OUT_HEAD.test('// OUTPUT block at the foot of this file. ***')
      && T.OUT_HEAD.test('// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:')
      && T.OUT_HEAD.test('// OUTPUT (run of 2026-08-13), abridged:')
      && T.OUT_HEAD.test('// OUTPUT');
    if (!okHead) bad++;
    console.log(`  ${okHead ? 'silent' : '*NORM FAIL*'}  OUT_HEAD           ${'prose "OUTPUT, which…" cannot steal'.padEnd(38)} the banner must own its line (391bd7a class)`);
  }
  // body-lines: an explicit body length beats the READINGS scan — a body that
  // PRINTS the word READINGS (the perfold shape) parses to its full extent.
  {
    const rule = '// ' + '='.repeat(60);
    const mk = (withField) => ['// head code', 'const x=1;', rule,
      '// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:',
      '//   invocation:  node research/t.js',
      '//   code-sha256: deadbeef', '//   out-sha256:  deadbeef',
      ...(withField ? ['//   body-lines:  5'] : []),
      rule,
      '// line 1', rule.replace('// ', '// ').replace(/=/g, '='), '// READINGS', '// printed reading', '// [1.0s] done',
      rule, '// READINGS'].join('\n');
    const L = T.locate(mk(true));
    const okBL = L.outEnd - L.bodyStart === 5 && L.readStart === mk(true).split('\n').length - 1;
    if (!okBL) bad++;
    console.log(`  ${okBL ? 'silent' : '*NORM FAIL*'}  locate             ${'body-lines: 5 overrides READINGS scan'.padEnd(38)} a printed READINGS line cannot truncate a bound body`);
    const L2 = T.locate(mk(false));
    const okLegacy = L2.outEnd - L2.bodyStart < 5;
    if (!okLegacy) bad++;
    console.log(`  ${okLegacy ? 'silent' : '*NORM FAIL*'}  locate             ${'legacy parse unchanged without field'.padEnd(38)} no fingerprint field, no behavior change`);
  }
  console.log();
}
for (const [kind, where, why] of EXPECT) {
  const hit = (found[kind] || []).some(s => s.includes(where));
  if (!hit) bad++;
  console.log(`  ${hit ? 'FIRES ' : '*MISS*'}  ${kind.padEnd(18)} ${where.padEnd(38)} ${why}`);
}
console.log();
for (const [kind, where, why] of FORBID) {
  const hit = (found[kind] || []).some(s => s.includes(where));
  if (hit) bad++;
  console.log(`  ${hit ? '*FALSE POSITIVE*' : 'silent'}  ${kind.padEnd(18)} ${where.padEnd(24)} ${why}`);
}

fs.rmSync(root, { recursive: true, force: true });

console.log(`\n${bad === 0
  ? `All ${EXPECT.length} known positives fire and all ${FORBID.length} controls stay silent. A zero from qc.js means something.`
  : `${bad} case(s) wrong. A zero from qc.js does NOT currently mean the corpus is clean.`}`);
process.exit(bad === 0 ? 0 : 1);
