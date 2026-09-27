# Proposal: the staircase note

**Grade: HELD** · last regraded 2026-08-19 · registry: [PROPOSALS.md](PROPOSALS.md)

*A wrapper over a finished draft. `paper/staircase-note.md` is the document.
What follows is the case for putting it out, what would change that case, and
where its prior-art position is thinner than the note admits.*

## 1. Claim

Three objects at three calibrations, as the note's own title block sets them
out. Theorem 3, the per-prime hard caps on the Scour, is PROVEN and
elementary. Theorem 8, the certified twin floors, is VERIFIED at six tile
levels, @11 through @29, by `research/natal-cap-08-staircase.js`,
`research/natal-cap-11-kstar23.js` and `research/natal-cap-18-at29.js`, which
assert every cap against the actual march with zero violations. Theorem 6, the
tail theorem, is the one non-elementary ingredient: its asymptotic form uses
the Prime Number Theorem and Mertens, and every finite instance is made
explicit by Rosser and Schoenfeld. What the note claims as its own is the
framing, fresh kills of a fixed comb capped prime by prime and history-blind,
plus K*(x) as a reproducible measure of how steep the wall is. It claims no
inequality beyond classical technology, and says so in its §9.

## 2. Status grade

HELD, awaiting the owner's read. Nothing about the mathematics is holding it.
`paper/PAPERS.md`'s paper-grade assessment ranks it second of five by what
would survive a referee, calls it print-grade and self-contained, and floats
promoting it ahead of the Paper I restructure on the grounds that it is
finished, low-risk, and independent of every open gate. That promotion is the
owner's call and has not been made, so the grade stays HELD rather than
QUICK-DRAFT.

The moratorium is the other half of the hold. The note carries its own banner
saying so.

## 3. Evidence

| what | where |
|---|---|
| the drafted note, all twelve sections | `paper/staircase-note.md` |
| the paper-grade assessment that ranks it | `paper/PAPERS.md`, the assessment section |
| the certificate at four levels, 599 scour primes | `research/natal-cap-08-staircase.js` |
| the extension to six levels, 10,201 scour primes | `research/natal-cap-11-kstar23.js`, `research/natal-cap-18-at29.js` |
| the sieve-cap companion and the parity floor | `research/natal-cap-10-sieve-cap.md` |
| the Bonferroni pricing of the same wall | `research/natal-cap-06-bonferroni.js` |

Numbers are not restated here. Every figure the note uses regenerates from the
scripts above, and §11 of the note is its own reproduction block.

## 4. Prior-art risk

The note's §9 is already the prior-art section, and it concedes rather than
claims: the per-prime caps are Legendre and Buchstab-type identities applied
per remover rather than to the sifted set, regime (i) is the elementary fact
that rough numbers below z² are prime, and an expert would read Theorem 3 as
an exercise. That concession is what makes the note publishable, because the
content on offer is the framing and the measurement of K*, both stated as
such.

Searched: the sieve-theory side, through Halberstam and Richert, Cojocaru and
Murty, and the current literature on the counting function Φ (Fan and
Pomerance, J. Number Theory 254 (2024), arXiv:2306.03339; Weingartner,
arXiv:2604.22058; Holt, arXiv:2308.07570). The comparison the note names and
has not made is substituting Fan and Pomerance for the Rosser and Schoenfeld
closed form in §6.

Not searched: `research/SEARCH-CONVENTIONS.md` §1 carries no owning-convention
row for the per-remover cap in the per-tile, per-prime form, so the note's
sentence about finding no prior statement of it is our framing rather than a
calibrated negative, and it should be read at that weight. Writing that row,
or deciding the object has no separate owning convention, is the honest
prerequisite to any priority language in the abstract.

Prior art probably exists for more of this than the note currently attributes.

## 5. Upgrade and downgrade triggers

**Upgrade to QUICK-DRAFT** when the owner has read the note and cleared it,
since the drafting work is done and the remaining step is a decision rather
than a derivation.

**Upgrade to QUICK-DRAFT** independently if the Fan and Pomerance substitution
into §6 is carried out and the tail theorem tightens, because that would give
the note a second result rather than a restatement.

**Downgrade to WEAKENED** if an owning-convention row for the per-remover cap
is written into `research/SEARCH-CONVENTIONS.md` §1 and a search in it returns
the cap in print, since the framing claim would then need rewriting around
whatever is found.

**Downgrade to WEAKENED** if any of the six certified levels fails a re-run,
or if the K* ladder stops being reproducible from the named scripts.

**Retire** only if Theorem 3 is found stated in the same per-tile, per-prime
form somewhere in print, which would leave K* alone as the contribution and is
too thin for a note.

## 6. What a referee would attack

- **Theorem 3 is an exercise.** The note says so first, which defuses the
  attack but does not answer it. The reply has to be that the framing and K*
  are the content, and a referee is entitled to judge that thin.
- **Theorem 6's asymptotic step.** It is the only non-elementary ingredient,
  it leans on the Prime Number Theorem and Mertens, and the explicit finite
  version rides on Rosser and Schoenfeld rather than on the sharper Φ bounds
  now available. A referee who knows that literature will ask why the sharper
  input was not used.
- **Six levels is a short ladder.** Theorem 8's floors are CERTIFIED at @11
  through @29 and nowhere else. A referee can reasonably ask what happens at
  @31 and beyond, and the answer today is that the computation was not run.
