# The primeoire paper suite (architecture adopted 2026-08-14, pending Chris's review)

The material has outgrown one document. Four papers plus OEIS micro-publications,
each with its own audience, standard of rigor, and submission target.

**OFFICIAL POSITIONING (Chris, 2026-08-14):** *a new framework and vocabulary
over classical sieve-theoretic objects — a new lens.* Not a new branch of
mathematics; a lens that makes old objects newly speakable, earning its keep
by what it produced: new named objects, two theorem candidates, and the
five-door survey of the wall. This sentence governs every abstract,
introduction, and public description.

## Sequencing, revised 2026-09-05

The consolidated bounds and data document is `two-class-jacobsthal.md`,
assembled from Paper II (`beta2-note.md`), the lower-bound paper
(`kk-lower-bound.md`) and the 22-term ladder. Its calibration distinguishes
constants from powers and method obstructions from properties of the tile.
The active research campaign has completed a long-interval Chen benchmark
and audited a sufficient signed estimate. Its input/weight specification
(`research/prime-detection-spec.md`) gives a conditional positive count from
an explicit bilinear bound; the first fold estimate does not establish it.
That work is separate from the
manuscript's established results. Papers I to IV retain their architecture;
the publication moratorium is unchanged.

## Paper I — the flagship (expository/research hybrid)
**"Primes as Moiré Patterns: the tile, the family, and the wall"**
File: moire-primes.md (existing draft; to be restructured around the final
vocabulary). Contents: the moiré framing (cited to PRL 2019/Davies/Pritchard);
the tile/fold system; the spine theorems (Redundancy, Crystallization, Copying,
Euclid-in-moiré, pigeonhole 2·ln p) plus the Zone Equivalence Proposition,
which is a framing device rather than a result and is presented as one; the genealogy (houses,
cohorts, frozen shares); the geography (seams, strata, grain, Scour, Unification
Law); the Two-Moiré form of TPC; the five-door survey of the parity wall with
measured numbers at each door; the prior-art audit as appendix. Audience: broad
mathematical readership; arXiv math.HO + math.NT cross-list.

**Companion note, split out 2026-08-17 for token pressure:
[wall-note.md](wall-note.md)** carries the five doors and the four faces in full,
with every measured number, while §7 and §7A of the flagship keep their numbers
and now state what each door and face establishes and at what calibration. The
split is orthogonal to the spine question in sequencing step 4 below and, if that
question resolves toward making §7A the spine, it reverses in one edit: the
note's §1 and §2 are the old bodies unchanged.

## Paper II — the theorem note (technical)
**"An upper bound for the twin Jacobsthal function"**
File: beta2-note.md (drafted; DHR sieve input verified line by line against the
Diamond–Halberstam book, 2026-08-14, no outstanding items). The title is the
note's own, which governs: the note proves both sides, and its abstract, status
block and §6 are all organised around the upper one. The first
two-class bound at any exponent: G₂ ≪ (log q)^{4.267+ε} via the dimension-2
sieve, in a primorial formulation that avoids Iwaniec's transfer lemma
entirely. Avoiding it is the selling point and needs no claim against the
lemma: Iwaniec's 1978 Lemma 1 is a published result we have not been able to
read in the original, and an explicit-constant or formalised exposition of it
would be useful to the subject. The
note now also carries a lower bound, far from matching, G₂(x#) ≥ g(x#) pointwise and
hence ≫ x·log x·logloglog x/loglog x by Rankin/Pintz/FGKMT, which per the audit
is the first lower bound of any kind for a two-class Jacobsthal function and is
free. The Fundamental-Lemma fallback, if the DHR citation ever fails, gives the
same theorem at exponent ~19 (§6 item 5, s ≥ 9κ + 1 at κ = 2).
Audience: math.NT; short journal note. This is the paper where
expert consultation before posting is non-negotiable.

## Paper III — the variance note (technical)
**"The exact variance of twin-candidate counts in windows over a primorial period"**
File: variance-note.md (drafted). Exact pair correlation, sum rule, certified
almost-all-windows bounds, sub-Poisson scaling law with the open limit
question. Cites Hausman–Shapiro, Montgomery–Vaughan, Aryan. Audience: math.NT
note or Integers.

## Paper IV — the experimental paper (data + constructions)
**"The twin Jacobsthal function: data, constructions, and the adversary's reach"**
To be assembled from: the verified G₂ ladder to T₄₃ (fourteen exact terms
computed here against A144311's twenty-two, so the top two are recomputations
that agree rather than new values),
the d↦G_d map, the 2D Erdős–Rankin experiment (free vs unshifted adversary;
the one-class constructions are Rankin's, FGKMT's and Holt's, the two-class
accounting is ours), the certified two-class lower-bound ladder to x = 4001,
Ziller–Morack extension, and the census verification
methodology (mod-30 lattice, 57× speedup). Audience: Experimental Mathematics
or Journal of Integer Sequences.

## Micro-publications (feed the papers, establish priority)
- OEIS: G₂ sequence — **WITHDRAWN, duplicate of A144311** (Andrew Carter 2008,
  22 terms to x = 79; ours is A144311 + 1). The drafted submission must not be
  sent. What survives is a proposal ON A144311: a b-file, the twin-prime
  motivation, and cross-references. Nothing is submitted, and nothing goes out
  while the moratorium stands
- OEIS: per-level seam-twin count (drafted)
- OEIS: twin gap word / grain (candidate)
- OEIS: comment contributions — A059861 asymptotic (2C₂e^{−2γ}·P#/ln²p),
  A060256 growth scale
- The A059861 d=2/d=4 bijection, if we prove it (comment or short note)

## Sequencing
1. Gate: reconcile Paper I against the Holt prior art (2026-08-17). The
   framework has a predecessor that owns the fold recursion, the closure
   theorem, the transfer operator and the interval of survival, and nothing goes
   out until each of them is attributed where it is used. Paper I §9
   carries the correspondence; the spine sections cite it inline.
2. OEIS: the G₂ submission is withdrawn as a duplicate of A144311; the
   seam-count submission waits on a search re-run in the owning convention
   (`research/ATTACKS2.md` row 10, `research/SEARCH-CONVENTIONS.md`). What is
   left here is a b-file and cross-reference proposal on an existing entry, not
   a priority timestamp.
3. Paper I restructure around final vocabulary (biggest writing job).
4. Papers III, IV polish (mostly assembled already).

## Paper-grade assessment (2026-08-17, pending Chris)

The campaign of 2026-08-14/15 produced two artifacts the architecture above
does not account for: `paper/anchored-note.md` (the β compression) and
`research/sift-limit-attack.md` (the Lemma V map). The work of 2026-08-16/17
added a third thing the architecture does not account for, and it is not an
artifact but a constraint: the Holt prior art (`research/PRIOR-ART.md`). What
follows is an assessment, not a decision; the moratorium holds and the calls
below are Chris's.

**Ranked by what would survive a referee, not by what is most interesting.**

1. **Paper II (the exponent bound 4.267).** Still the only genuinely new
   theorem in the corpus: the first two-class Jacobsthal bound at any
   exponent, and the one item the Holt sweep confirmed nobody else holds,
   since his corpus contains no upper bound on any maximum gap. Its sieve
   input is verified and its gate is closed. It gained a second result for
   free, the pointwise lower bound G₂ ≥ g, which brackets the object and makes
   the note two-sided. We also now know precisely what would improve the
   exponent, and that it is a positivity problem rather than a distribution
   problem.
2. **The staircase note.** Print-grade already, elementary, self-contained,
   machine-asserted, and now carrying six levels of the K* law rather than
   four. Its own §9 concedes an expert would call Theorem 3 an exercise, and
   that concession is what makes it publishable: the content is the framing
   and the measurement of K*, both stated as such. Lowest-risk first
   publication, and it puts the vocabulary in print.
3. **Paper III (the variance note).** Exact formulas, brute-force verified,
   and the new §7 adds nine exact levels of the diagonal plus a fit
   discrimination that reduces the open question to one constant. Solid, and
   its open question is now sharp enough to attract an analyst.
4. **Paper I (the flagship).** The restructure is still the biggest writing
   job, and it is now also the riskiest document in the suite. §7A exists and
   is, by the style guide's own standard, the most original part of the work:
   the wall with coordinates on four faces. That section should become the
   paper's spine rather than an addition to it, and the more so because the
   Holt sweep moved most of §§2–4 from candidate novelty to correctly
   attributed rediscovery. A referee who knows the cycle-of-gaps literature
   will check §9 first. §9 now leads with the correspondence, and the spine
   sections cite it where they use it; a further pass should decide how much
   of §§2–4 survives as exposition once it is all attributed.
5. **Paper IV (experimental).** One narrowing: the 2D Erdős–Rankin material is
   an adversarial covering problem the repo already held under the name
   PAIRED, the one-class lower bounds are Rankin's and FGKMT's, and Holt gives
   a constructive one-class lower-bound technique through driving terms. What
   is ours there is the two-class accounting and the certified ladder to
   x = 4001. Otherwise unchanged.

**The anchored note is the hard call.** It is the artifact most likely to
interest a number theorist on sight, because it is one number and a table of
ten values, and it is also the artifact most likely to get an amateur
twin-prime manuscript deleted unread. The mathematics is honest: the
conditional theorem is proven and short, Proposition 1 (that measure-theoretic
bounds provably cannot decide the anchored question) is real content, and §9
prices Assumption A at Hardy-Littlewood strength with the equivalence spelled
out. The risk is entirely in reception. Two options, both defensible:

- **Publish as a short note**, with the HL equivalence stated in the abstract
  rather than in §9, and the title naming the compression rather than the
  conjecture. The referee then reads it as "an equivalent finite form of HL,
  plus an exact computation to W = 3.04·10¹⁴", which is what it is.
- **Hold as internal** until an expert has read it privately, and let Paper I
  §7A carry the β material at expository strength in the meantime.

Recommendation: hold, and use it as the artifact for the first expert
conversation. It is the best single thing to put in front of someone, and a
private read costs nothing while a mispositioned posting cannot be undone.

**The Lemma V map is not paper-grade, and should not be a paper.** It is an
analysis of a method plus a toy-scale pilot. Its correct home is Paper II's
"what would move it" section: the finding that the distance from 4.2665 to 2
is entirely a positivity problem and not at all a distribution problem, which
is an analysis of the sieve's discard points rather than a theorem, is
exactly the context a referee of Paper II wants, and it costs Paper II
nothing to say. If it travels, the qualification travels with it: at the
working point the ladder measures, the operative assumption is not Lemma V but
an unproven Gaussian maximal law for the sawtooth. The Parseval mean-square form of Lemma V is now proven with no hypothesis
(the `B` estimate closed 2026-08-19 and is published as Opera de Cribro
Lemma 6.18) — but **the almost-all exponent the mean-square form delivers is 0**,
because the window `B/(ηM²)` is polylog and not a power, and the elementary
second moment already owns that ground about 1.4× cheaper
(`research/sift-limit-attack.md` §7e item 2). 2.649 is the ALL-POSITIONS
full-decoupling figure and does not follow from the mean-square theorem, so
there is no almost-all paper here to sequence.
The pilot's numbers stay in the repository until it is.

**Does any of this change the sequencing?** One change is worth considering:
promote the staircase note ahead of the Paper I restructure, since it is
finished, low-risk, and independent of every open gate. That would make the
order: DHR gate, OEIS, staircase note, Paper I restructure, Papers III and IV.
Everything else stands.

The queue behind these calls is [proposals/PROPOSALS.md](proposals/PROPOSALS.md),
the standing registry of paper proposals, each carrying a grade, its records,
an honest prior-art position and pre-registered upgrade and downgrade triggers,
kept under Chris's 2026-08-19 decision to track candidates rather than push
toward publishing. As of 2026-08-20 the queue holds seven: one QUICK-DRAFT
with a draft beside it, three PROPOSAL, two HELD, and one WEAKENED whose
scored triggers (Neudecker, the fifth window, the amplitude derivation) were
each scored the night they fired and none moved the grade.

## Authorship & AI disclosure (adopted 2026-08-14, updated 2026-09-05)

Sole author: Chris Benjaminsen. Every paper carries this
methods/acknowledgment statement (adapted per paper):

> The framework, vocabulary, and driving questions are the author's,
> developed over six years of independent work. Formal derivations,
> literature audits, computations, and manuscript drafting were carried out
> using AI assistants under the author's
> direction. Computations have reproducible code and recorded outputs;
> asymptotic arguments require their stated mathematical inputs and are not
> proved by finite checks. Refuted intermediate claims are retained in the
> record.

Remaining open decisions: refutation prominence in Paper I (current stance:
keep visible), venues, and the moratorium-lift date.

## Style (Chris, 2026-08-14)

All prose follows the math edition of Chris's style guide:
**paper/writing-style-math.md** (adapted 2026-08-14 from his general guide
at `~/Files/Git/mba/notes/writing-style-guide.md`; the math edition wins in
this repo). Headlines: authorial "we"; technical terms with real referents
stay; calibration ladder as grammar (proven / verified / measured /
conjectured / refuted); no em dashes, no "Not X. Y." reframes, no
rule-of-three cadence, no filler vocabulary; refutations visible; name the
wall first.
