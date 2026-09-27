# Proposal: the anchored note

**Grade: HELD** · last regraded 2026-08-19 · registry: [PROPOSALS.md](PROPOSALS.md)

Reviewed 2026-09-06: grade remains HELD. Lemma 1's optional elementary
lower-bound argument in `paper/anchored-note.md` had a reversed inequality;
the corrected Euler-product factorization supplies the stated lower bound.
The conditional positivity input is still open. This repair does not
establish an anchored bias bound or satisfy a publication trigger.

*A wrapper over a drafted document. `paper/anchored-note.md` holds the
mathematics. This file holds the publication grade, what the hold is waiting
on, and the triggers that would move it.*

## 1. Claim

The twin question, on the anchored side, compresses into the positivity of one
exactly computable function, the anchored bias β(x). The compression is PROVEN:
`paper/anchored-note.md` §7 states the conditional theorem and proves it, and
§8 isolates the weakest input it actually needs, which is non-annihilation of
the anchored tile infinitely often rather than positivity everywhere. Alongside
it sits a result of the opposite kind, Proposition 1 of §3: measure-theoretic
bounds over the rotation ensemble cannot decide the anchored question, which is
a statement about the reach of an entire class of arguments and is proven, not
observed. The arithmetic is VERIFIED at ten exactly computed levels of β through
@41, where the tile width reaches the point at which the current arithmetic
stops, with the ensemble variance CERTIFIED through @37; every figure
regenerates from a named script in `research/`. The price is stated rather than
buried: §9 puts Assumption A at Hardy-Littlewood strength and spells out the
equivalence. The note proves no case of the Twin Prime Conjecture and says so
in its first line.

## 2. Status grade

HELD. `paper/PAPERS.md` calls this the hard call of the whole suite, and the
reasoning there is worth reading before any regrade: the note is the artifact
most likely to interest a number theorist on sight, because it is one number
and a table of ten values, and it is for the same reason the artifact most
likely to get an amateur twin-prime manuscript deleted unread. The risk is
reception, not mathematics.

The recommendation on record is to hold it and use it as the artifact for the
first expert conversation, on the grounds that a private read costs nothing
while a mispositioned posting cannot be undone. That recommendation is an
assessment, not a decision. The decision is the owner's, and until it is made
this proposal does not move.

The alternative on record, if the call goes the other way, is a short note with
the Hardy-Littlewood equivalence stated in the abstract rather than in §9, and
a title naming the compression rather than the conjecture. That framing turns
the referee's reading into an equivalent finite form of Hardy-Littlewood plus
an exact computation, which is what the note is.

## 3. Evidence

| what | where |
|---|---|
| the drafted note, eleven sections plus the disclosure | `paper/anchored-note.md` |
| the conditional theorem and its proof | `paper/anchored-note.md` §7 |
| the weakest sufficient statement | `paper/anchored-note.md` §8 |
| the price of Assumption A | `paper/anchored-note.md` §9 |
| what is proven, certified, open and refuted, leg by leg | `research/anchored-calm.md` |
| the ensemble enumeration and the anchored member | `research/natal-cap-13-anchored-calm.js` |
| the exhaustive twin cross-check at @23 | `research/natal-cap-11-kstar23.js` |
| the window-count moments and the exact pair correlation | `research/natal5-variance.js` |
| the note's own honesty section | `paper/anchored-note.md` §11 |

Numbers are not restated here. `research/anchored-calm.md` is the file to open
before quoting any leg of the calm, because it grades them separately and two
of them are not proven.

## 4. Prior-art risk

The compression's ingredients are classical and the note cites them as such.
What has not been settled is whether the compression itself, in this exact
finite form, has a predecessor. `research/SEARCH-CONVENTIONS.md` §1 now
carries a row for the ENSEMBLE concentration object this note's §2 E/Var
table lives in (written 2026-08-20 from the row-7 recon: Banks–Ford–Tao's
checkpoint programme owns it), and still carries none for the anchored bias
proper or the anchored-versus-random separation — so any priority sentence
about the compression itself still rests on a search run in our own wording,
which is the shape of failure the conventions document was written to stop.

The adjacent object does have an owning convention and it has been searched.
Maximal gaps between actual twin primes belong to Kourbatov, JIS 16 (2013)
13.5.2, and OEIS A113274, per `research/SEARCH-CONVENTIONS.md` §1. The
corpus's own earlier reading of that law was refuted by his table, and the row
in `research/SEARCH-CONVENTIONS.md` §3 records the correction. Anyone writing
the note's related-work paragraph starts there.

The prudent standing position is that prior art exists for more of this than
the note currently attributes, and the registry treats it that way until a
convention row is written and searched.

## 5. Upgrade and downgrade triggers

**Upgrade to QUICK-DRAFT** when an expert has read the note privately and the
owner decides to position it as the short note described in §2 above. That is
the sequencing `paper/PAPERS.md` recommends, and the draft is close enough
that the writing job is a repositioning rather than a rewrite.

**Upgrade to QUICK-DRAFT** independently if Assumption A's price falls: if §9's
equivalence can be weakened so the conditional theorem runs on something
strictly below Hardy-Littlewood strength, the reception risk drops with it and
the note stops needing a private read first.

**That trigger moved AGAINST on 2026-08-20** (import-map row 7,
`research/history/staging/row7-recon.md`): the whole bounded-differences
family — McDiarmid, Azuma, Talagrand, Warnke, Kutin, Kim–Vu — is CLOSED as a
route to lowering Assumption A's price (the anchor is a single member against
an ensemble, and a sharper tail bound moves it the WRONG way), and ρ is
graded TPC-STRENGTH. The price-falling route now has one fewer family to
come from. Grade held at HELD; the evidence bears on the price, not on the
note's readiness.

**Downgrade to WEAKENED** if an owning-convention row for the anchored bias is
written into `research/SEARCH-CONVENTIONS.md` §1 and a search in it returns the
compression, or a recognisable equivalent, already in print.

**Downgrade to WEAKENED** if any leg of the anchored calm that the note leans
on is regraded downward in `research/anchored-calm.md`, since the note's
measured layer is what makes the conditional theorem worth stating.

**Retire** if Proposition 1 is found to be false or is superseded by a
measure-theoretic argument that does decide the anchored question, because the
note's second-best result is then gone and the first is a restatement of
Hardy-Littlewood.

## 6. What a referee would attack

- **Assumption A is Hardy-Littlewood in disguise.** §9 concedes exactly this
  and prices it. A referee who reads §9 first will ask what the note buys over
  the conjecture it assumes, and the only honest answer is the finite,
  computable form plus Proposition 1. Whether that is enough for a note is a
  judgement call the corpus cannot make for the referee.
- **Ten levels is a table, not a trend.** β is computed exactly at ten levels
  through @41 and the arithmetic stops there. A referee can ask whether the
  sign of β is stable for a reason or is an artifact of a short range, and the
  note cannot answer past @41.
- **The anchored member is one point of a huge ensemble.** The whole
  construction turns on the anchor being the arithmetic Scour itself rather
  than a typical rotation. A referee who does not accept that framing will
  read the ensemble results as decoration, and Proposition 1 is precisely the
  admission that the ensemble cannot reach the anchor.
