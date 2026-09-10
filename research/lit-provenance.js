// ============================================================================
// LITERATURE PROVENANCE INVENTORY
//
// Question: for every sentence this corpus attributes to somebody else, WHICH
// artifact was actually read to get it? Those quotes entered from four very
// different places and the documents do not distinguish them:
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
// which is a different claim from the one the document makes when it writes
// "verbatim". This script does not judge the quotes. It finds them, resolves
// what each one is attributed to, and reports which have a provenance note
// saying what was read. That list is the work queue; nothing else here is a
// verdict.
//
// THE EXTRACTOR MOVED, 2026-08-18, and this file is now only the report over
// it. research/qc/lit-extract.js holds the regexes, the sweep and the five
// hand-read known positives; the gate's `provenance` check requires the same
// module. Two copies of those regexes would give the corpus two answers to
// "how many attributed quotations are there", and it would then have none.
// It lives under qc/ because qc/selftest.js rebuilds the framework in a temp
// directory from a fixed copy list and cannot resolve a shared file outside it.
//
// Runtime well under a second.
// ============================================================================
'use strict';

const LX = require('./qc/lit-extract');

// ---------------------------------------------------------------------------
// Report.
//
// A FUNCTION plus a main guard, never a top-level early `return`. Top-level
// return is legal under Node's CommonJS wrapper and is a SyntaxError to a bare
// parser, and the gate's `scripts` check compiles every research script with
// `new vm.Script`, which is a bare parse. Guarding with `return` would turn
// this file into the very thing that check exists to catch: a cited artifact
// that does not parse.
// ---------------------------------------------------------------------------
function report() {

const rows = LX.inventory();

// Calibration runs BEFORE any count is printed, and a miss is fatal. A number
// from a sweep that cannot find what is known to be there is worse than no
// number, because it reads as coverage.
const missed = LX.calibrationMisses(rows);
if (missed.length) {
  console.error('CALIBRATION FAILED. The extractor missed known literature quotes:');
  for (const [f, , what] of missed) console.error(`  ${f}  ${what}`);
  console.error('Every count this script prints would be an undercount. Fix the');
  console.error('classifier in research/qc/lit-extract.js before reading anything below.');
  process.exit(1);
}

const bySource = new Map();
for (const r of rows) {
  if (!bySource.has(r.source)) bySource.set(r.source, []);
  bySource.get(r.source).push(r);
}

const verbatimNoProv = rows.filter(r => r.claimsVerbatim && !r.hasProvenance);

console.log('LITERATURE PROVENANCE INVENTORY');
console.log('='.repeat(78));
console.log(`documents scanned            ${LX.docs().length}`);
console.log(`attributed quotations        ${rows.length}`);
console.log(`distinct sources             ${bySource.size}`);
console.log(`claiming "verbatim"          ${rows.filter(r => r.claimsVerbatim).length}`);
console.log(`  ... with NO provenance     ${verbatimNoProv.length}   <-- the work queue`);
console.log(`carrying a provenance note   ${rows.filter(r => r.hasProvenance).length}`);
console.log();

console.log('BY SOURCE, most-quoted first');
console.log('-'.repeat(78));
const sorted = [...bySource.entries()].sort((a, b) => b[1].length - a[1].length);
for (const [src, rs] of sorted) {
  const prov = rs.filter(r => r.hasProvenance).length;
  console.log(`${String(rs.length).padStart(3)}  ${src.padEnd(24)} provenance ${prov}/${rs.length}  ${[...new Set(rs.map(r => r.file))].length} files`);
}

if (process.argv.includes('--full')) {
  console.log();
  console.log('EVERY ATTRIBUTED QUOTATION');
  console.log('-'.repeat(78));
  for (const [src, rs] of sorted) {
    console.log(`\n### ${src}`);
    for (const r of rs) {
      const flag = r.claimsVerbatim ? (r.hasProvenance ? 'ok  ' : 'WORK') : '    ';
      console.log(`  ${flag} ${r.file}:${r.line}  ${r.head}`);
    }
  }
}

console.log();
console.log('This inventory is a WORK QUEUE, not a verdict. A quote with no');
console.log('provenance note is unverified, not wrong. Resolve one by reading the');
console.log('PDF of record and recording, beside the quote, what was read.');
console.log();
console.log('The gate reads the same rows: `node research/qc.js --pending` runs the');
console.log('`provenance` check, which reports the work queue as findings and adds');
console.log('the question this file does not ask -- whether a note that DOES exist');
console.log('names an artifact that counts.');

}

if (require.main === module) report();

// READINGS
// 1. The count that matters is "claims verbatim, no provenance". Every one of
//    those is a document asserting it reproduces somebody's exact words while
//    not saying which artifact those words were read from.
// 2. Sources are ranked by quote count on purpose. Verification cost is per
//    PDF, not per quote, so the top of that list is where an hour buys most.
// 3. A source resolving to a bare surname rather than an arXiv id is its own
//    small finding: the citation cannot be followed mechanically.

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/lit-provenance.js
//   invocation:  node research/lit-provenance.js
//   code-sha256: 24f56360387c0c8d8ddd904c72d25150601b7fb9f784d7464bd2754507cf6e52
//   out-sha256:  513d003645c4f6a6d2dee7a8f27c6859366466f6905c6c268bdc1f6ed5a5b3c1
//   body-lines:  49
//   inputs:      research/qc/lit-extract.js@23f5773012a9
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     0.1 s
// ============================================================================
// LITERATURE PROVENANCE INVENTORY
// ==============================================================================
// documents scanned            82
// attributed quotations        52
// distinct sources             29
// claiming "verbatim"          17
//   ... with NO provenance     1   <-- the work queue
// carrying a provenance note   18
//
// BY SOURCE, most-quoted first
// ------------------------------------------------------------------------------
//   6  Jacobsthal               provenance 0/6  6 files
//   5  Hardy                    provenance 0/5  4 files
//   4  Maier                    provenance 1/4  4 files
//   4  Halberstam               provenance 3/4  2 files
//   3  UNRESOLVED               provenance 0/3  3 files
//   3  arXiv:1301.2242          provenance 2/3  2 files
//   3  Ford                     provenance 2/3  3 files
//   2  arXiv:1706.00317         provenance 0/2  2 files
//   2  arXiv:2503.04045         provenance 2/2  1 files
//   1  arXiv:1408.6002          provenance 0/1  1 files
//   1  Schemmel                 provenance 0/1  1 files
//   1  Selberg                  provenance 0/1  1 files
//   1  arXiv:1802.07604         provenance 1/1  1 files
//   1  arXiv:2302.00459         provenance 1/1  1 files
//   1  Friedlander              provenance 1/1  1 files
//   1  Holt                     provenance 0/1  1 files
//   1  arXiv:1706.03668         provenance 1/1  1 files
//   1  arXiv:1611.03310         provenance 0/1  1 files
//   1  Mertens                  provenance 0/1  1 files
//   1  arXiv:math/0406018       provenance 1/1  1 files
//   1  arXiv:1408.4505          provenance 1/1  1 files
//   1  Brüdern                  provenance 0/1  1 files
//   1  arXiv:1908.08613         provenance 1/1  1 files
//   1  Rankin                   provenance 0/1  1 files
//   1  arXiv:1311.5944          provenance 0/1  1 files
//   1  Brun                     provenance 0/1  1 files
//   1  Chebyshev                provenance 0/1  1 files
//   1  Kalmynin                 provenance 1/1  1 files
//   1  arXiv:2603.25915         provenance 0/1  1 files
//
// This inventory is a WORK QUEUE, not a verdict. A quote with no
// provenance note is unverified, not wrong. Resolve one by reading the
// PDF of record and recording, beside the quote, what was read.
//
// The gate reads the same rows: `node research/qc.js --pending` runs the
// `provenance` check, which reports the work queue as findings and adds
// the question this file does not ask -- whether a note that DOES exist
// names an artifact that counts.
// ============================================================================
// READINGS
// ============================================================================
