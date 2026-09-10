# Paper proposals: the registry

Nothing here is a paper and nothing here is a decision to write one. This is the
standing list of results that might one day become papers, each with a grade, the
records behind it, an honest prior-art position, and triggers written in advance
that say what would move the grade in either direction.

Chris's decision, 2026-08-19, which this registry exists to carry out:

> We are not ready for papers just yet at all. Create a series of paper
> proposals where needed and upgrade or downgrade them as we learn. It is
> likely we will find prior art to a lot of what we are doing, so for now our
> body of research should keep track as we have and not prematurely push
> towards publishing.

The publication moratorium is unchanged. Four of these grew out of
`research/IMPORT-MAP.md` rows. `paper/PAPERS.md` holds the suite
architecture, the paper-grade assessment and the authorship and AI-disclosure
statement that every paper carries; this file holds the queue behind it.

## The proposals

| proposal | grade | claim, in one line | last regraded |
|---|---|---|---|
| [prop-kk-lower-bound.md](prop-kk-lower-bound.md) | QUICK-DRAFT | G₂(P(y)) ≫ y ln³y (lnlnln y)²/(lnln y)⁴, by substituting a two-class kill set into Kalmynin and Konyagin's construction | 2026-08-19 |
| [prop-xlnx-lower-bound.md](prop-xlnx-lower-bound.md) | QUICK-DRAFT (regraded 2026-08-28: its first trigger fired, the paper case is written in `paper/kk-lower-bound.md` §§3, 9, 10) | G₂(x#) ≫ x ln x from published ingredients only (K–K Cor 1 + Mertens + PNT + the CRT identity), held at the door and adversary-confirmed, not refereed | 2026-08-20 (added) |
| [prop-exact-fold-L.md](prop-exact-fold-L.md) | PROPOSAL | per-fold L is the longest alternation-legal window of the old gap word, exactly, with Theorem A sharpened to an equality by a min-plus critical circuit | 2026-08-20 (trigger scored, grade held) |
| [prop-tailcount-transport.md](prop-tailcount-transport.md) | PROPOSAL | the histogram operator read as an inequality gives a proven per-level evaluator, exact at eight consecutive folds | 2026-08-19 |
| [prop-thinning-null.md](prop-thinning-null.md) | WEAKENED | the exactly-geometric null turned out to be Hawkins' random sieve (1957); what survives is the Fold Moment Identity, the Ψ − Φ² deviation, and the rate law — which now carries a known ~20% count overprediction and a failed per-fold dispersion clause inside it | 2026-08-20 (three triggers scored, grade held) |
| [prop-suen-import.md](prop-suen-import.md) | PROPOSAL | the anchored dependency structure is a perfect matching, the deviation splits by an identity, and the local lemma's wall has an address | 2026-08-20 (trigger scored, grade held) |
| [prop-anchored-note.md](prop-anchored-note.md) | HELD | the twin question compresses into the positivity of one computable function, with the compression proven and its price stated | 2026-08-20 (import-map row 7 landed on its object: trigger moved AGAINST, grade held) |
| [prop-staircase-note.md](prop-staircase-note.md) | HELD | per-prime hard caps on the Scour, certified twin floors at six levels, and K* as a measure of the wall's steepness | 2026-08-19 |

The two HELD entries are thin wrappers over drafts that already exist,
`paper/anchored-note.md` and `paper/staircase-note.md`. The QUICK-DRAFT entry
points at two drafts: the short `draft-kk-lower-bound.md` beside this file, and the full refereeable write-up `paper/kk-lower-bound.md` (2026-08-28), the draft of record.

## Cross-campaign review, 2026-09-06

All eight proposals were compared with the current arithmetic target in
`research/cross-campaign-synthesis.md` §4. Their grades are retained;
none supplies the open anchored or signed twin margin. The x log x file's
header now agrees with its already-recorded QUICK-DRAFT decision. The
anchored note's auxiliary lower-bound argument had a reversed inequality,
repaired using the correct Euler product without changing the conclusion.
The Suen proposal now carries its owning review's corrections on exact
independence and atomicity and scopes its closure to the stated interfaces.
No new blind-test, all-level bound or publication trigger is claimed.
The moratorium remains unchanged. These repairs are recorded in
`research/history/CHANGELOG.md`.

## The grades

| grade | what it means |
|---|---|
| **SKETCH** | an idea with a record behind it, no draft, and no case made yet. It may not survive its own prior-art search. |
| **PROPOSAL** | the result is stated, calibrated per component, and evidenced, and the case for a paper is written down. No draft. |
| **QUICK-DRAFT** | a draft exists or is being written. The remaining work is checking rather than deriving. |
| **HELD** | finished enough to submit, and deliberately not submitted. The file records who the hold is waiting on and why. |
| **WEAKENED** | something landed against it. The claim survives in reduced form and the file says which part died. |
| **RETIRED** | the claim is gone. The file stays, as the record of why, and the row stays in this table. |

## The regrade rule

**Any session that lands evidence touching a proposal must regrade it, in both
directions, and record the change in `research/history/CHANGELOG.md`.** A
proposal that quietly keeps its grade through a session that moved its evidence
is the same defect the corpus's quality checks were built to catch, one layer up:
the research layer moves and the summary layer above it goes on asserting the old
thing.

Upgrading is as much of an obligation as downgrading. Four of the seven files
below carry upgrade triggers that are one computation away, and leaving a
proposal stale at PROPOSAL because nobody reread it is a failure of the same
kind as leaving one stale at QUICK-DRAFT after its prior-art search came back
with a hit.

## The calibration legend

Every claim in a proposal file carries its rung, in the words the corpus already
uses (`research/G2-STATE.md` §0, and `research/covering-dive.md`, where the
legend was set):

- **PROVEN**: a proof is in hand, or it is a published theorem cited to its source.
- **VERIFIED**: checked by explicit computation here, with the producing script named.
- **CERTIFIED**: machine-asserted over a stated finite range, with the assertions in the script.
- **MEASURED**: empirical over a finite range, with no claim past it.
- **INFERRED**: our deduction from sourced facts, complete but not refereed.
- **CONJ**: a published conjecture.
- **REFUTED**: tried and dead, and it stays visible.

A claim that blurs two rungs is a defect, not a style choice.

## Prior art, and the posture of this registry

The standing assumption in this registry is that prior art exists for more of
the corpus than has been found, and that the burden is on us to look again.

That is not modesty. The corpus has been wrong about this in the most expensive
way available: the central object was in OEIS from September 2008 and five
audit waves missed it, every one of them running a calibrated search in our own
vocabulary. `research/SEARCH-CONVENTIONS.md` is the file that fixed the method,
and its §1 table is the only thing that licenses an absence. Every proposal's
prior-art section says which owning conventions were searched and which have no
row in that table yet, because a missing row is the honest answer far more often
than a clean negative.

Recounted 2026-08-20 against `research/SEARCH-CONVENTIONS.md` §1 as it now
stands: the wave wrote rows for the tail-count transport (line ~37), the
alternation language and the longest-run law (~47/48), and the anchored
ensemble's concentration object (~51). The surviving gaps, each named to its
proposal: the semiring / min-plus mapping (prop-exact-fold-L), the Suen/Janson
correlation-inequality family (prop-suen-import, confirmed still absent), the
anchored bias proper (prop-anchored-note), and the per-remover cap
(prop-staircase-note).

## Adding a proposal

One file, `prop-<slug>.md`, six numbered sections: claim, status grade,
evidence, prior-art risk, upgrade and downgrade triggers, and what a referee
would attack. Then one row in the table above. Cite records by root-relative
path so `node research/qc.js` can check them, and never restate a number without
naming the script or the source that produced it.
