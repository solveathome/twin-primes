# The primeoire paper suite (architecture adopted 2026-08-14, pending Chris's review)

The material has outgrown one document. Four papers plus OEIS micro-publications,
each with its own audience, standard of rigor, and submission target.

**OFFICIAL POSITIONING (Chris, 2026-08-14):** *a new framework and vocabulary
over classical sieve-theoretic objects — a new lens.* Not a new branch of
mathematics; a lens that makes old objects newly speakable, earning its keep
by what it produced: explicit specializations, two bound arguments, and the
five-door survey of the wall. This sentence governs every abstract,
introduction, and public description.

## Meta-research disposition, 2026-09-27

Directed and published by [Benjaminsen](https://solveathome.org/@Benjaminsen).
Research, checks and drafting in both 27 September tasks were performed by
Codex (AI assistant; exact model variant not recorded). The
[contribution record](../research/RESEARCH-CONTRIBUTIONS-2026-09-27.md)
separates original source ownership, earlier contributor accounts/models and
the work done here. The [meta-research assessment](../research/prime-meta-research-2026-09-27.md)
owns the source comparisons and limits. No whole-paper retraction is warranted
by this audit: the necessary actions are claim-level withdrawals and corrections.

| Document | Disposition |
|---|---|
| `variance-note.md` | Retract novelty for qualitative almost-all quadratic-window occupancy; derive it from Aryan Theorem 0.1. Retain exact finite formulas and explicit bounds. Mark fits as finite-range and the arithmetic Dickman identification as conjectured. |
| `beta2-note.md` | Retain the DHR application; withdraw unsupported first-result assertions in the suite and manuscript §5. The manuscript already disclaims new sieve ideas. |
| `kk-lower-bound.md` | Retain as a candidate specialized contribution with source/referee qualifications; correct the §8 numerical inequality and the disclosure (findings #2651–2653). |
| `two-class-jacobsthal.md` | Retain the synthesis; attribute the checked lower bound G2(83#)>=1860 to Wang's 2024 witness, with project reproduction credit and no maximality claim. |
| `moire-primes.md` | Correct first-bound language and variance positioning; retain it as an exposition of classical objects and project-specific work. |
| `wall-note.md` | Replace its first-two-class-bound assertion with the qualified DHR-application description. |
| Earlier empirical limit 0.611 and duplicate G2 OEIS proposal | Keep their existing withdrawals; neither is revived. |
| Other manuscripts | No new withdrawal established by this bounded audit; existing findings and reviews remain in force. |

These author revisions require review of their own text. Earlier platform
verdicts apply only to the manuscript hashes actually reviewed. This update
neither awards itself an independent verification nor submits anything to a
journal, arXiv or OEIS.

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
block and §6 are all organised around the upper one. An explicit
application of the existing dimension-two sieve: G₂ ≪ (log q)^{4.267+ε} via the dimension-2
sieve, in a primorial formulation that avoids Iwaniec's transfer lemma
entirely. Avoiding it is the selling point and needs no claim against the
lemma: Iwaniec's 1978 Lemma 1 is a published result we have not been able to
read in the original, and an explicit-constant or formalised exposition of it
would be useful to the subject. The
note now also carries a lower bound, far from matching, G₂(x#) ≥ g(x#) pointwise and
hence ≫ x·log x·logloglog x/loglog x by Rankin/Pintz/FGKMT, an immediate transferred lower bound whose
priority is not established by this audit. The Fundamental-Lemma fallback, if the DHR citation ever fails, gives the
same theorem at exponent $19 + \varepsilon$ after fixing the residue class mod
$\prod_{p<23} p$ (§6 item 5; $18 + 10\ln K + \varepsilon \ge 28.98 + \varepsilon$
for the full twin sequence, return #26).
Audience: math.NT; short journal note. This is the paper where
expert consultation before posting is non-negotiable.

## Paper III — the variance note (technical)
**"The exact variance of twin-candidate counts in windows over a primorial period"**
File: variance-note.md (drafted). Exact pair correlation, sum rule, certified
per-level occupancy bounds, a finite-range sub-Poisson fit and the open
arithmetic limit question. Qualitative almost-all quadratic-window occupancy
is a corollary of Aryan, not a new result of this note. Cites Hausman–Shapiro, Montgomery–Vaughan, Aryan. Audience: math.NT
note or Integers.

## Paper IV — the experimental paper (data + constructions)
**"The twin Jacobsthal function: data, constructions, and the adversary's reach"**
To be assembled from: the verified G₂ ladder to T₄₃ (fourteen exact terms
computed here against A144311's twenty-two, so the top two are recomputations
that agree rather than new values — with a(8)–a(16) due to Alekseyev 2009 and
a(17)–a(22) to Jinyuan Wang's 2024 covering DFS (OEIS A144311,
`a144311.cpp.txt`) — and, per #1166, the patched tie-enumerating DFS now also
gives the attaining sets at 47#–59# (verified) and 61# (measured)),
the d↦G_d map, the 2D Erdős–Rankin experiment (free vs unshifted adversary;
the one-class constructions are Rankin's, FGKMT's and Holt's, the two-class
accounting is ours), the certified two-class lower-bound ladder to x = 4001,
Ziller–Morack extension, and the census verification
methodology (mod-30 lattice, 57× speedup). Audience: Experimental Mathematics
or Journal of Integer Sequences.

## OEIS contribution ideas

The [current proposal register](../research/OEIS-PROPOSALS.md) owns disposition,
evidence limits and attribution across the corpus. No item has been submitted
to OEIS in this reconciliation.

- G2: **retired duplicate of A144311**. Its 22-term b-file already exists;
  Wang's 2024 83# lower-bound certificate is also prior work. Exposition,
  validation links and suitable cross-references are possible contributions
  to the existing entry; no exact new term is established here.
- Per-level seam twin count: **draft, novelty unestablished**. Calibrated
  prefix searches found no match; related counts and the prime-pair family
  already exist. The computed terms still require primality certification.
- Twin gap word / grain, restricted packing diameters, word complexity and
  other exploratory sequences: exact conventions, certified terms and owning
  searches remain required; see the register before preparing a draft.
- A059861: the census and its asymptotic are classical; the local d=2/d=4
  proof and bijection explain Labos's already recorded equality. The twin-grain
  analogue is refuted. A060256 growth-scale/Exp(1) comments remain heuristic.

## Sequencing
1. Gate: reconcile Paper I against the Holt prior art (2026-08-17). The
   framework has a predecessor that owns the fold recursion, the closure
   theorem, the transfer operator and the interval of survival, and nothing goes
   out until each of them is attributed where it is used. Paper I §9
   carries the correspondence; the spine sections cite it inline.
2. OEIS: follow the [proposal register](../research/OEIS-PROPOSALS.md).
   Certify seam-count terms and resolve remaining definition/prior-art checks;
   keep retired duplicates retired. Public draft publication is not an OEIS
   submission, acceptance or mathematical priority claim.
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

1. **Paper II (the DHR exponent bound).** A specialized application of the
   existing dimension-two sieve, with standard exponent 4.26645028... . The
   earlier description as the only new theorem and a confirmed first result
   is withdrawn: absence from Holt's work does not establish global priority.
   The transferred lower bound G2 >= g remains an immediate consequence.
   The present sieve argument does not reach the sufficient quadratic target.
2. **The staircase note.** Print-grade already, elementary, self-contained,
   machine-asserted, and now carrying six levels of the K* law rather than
   four. Its own §9 concedes an expert would call Theorem 3 an exercise, and
   that concession is what makes it publishable: the content is the framing
   and the measurement of K*, both stated as such. Lowest-risk first
   publication, and it puts the vocabulary in print.
3. **Paper III (the variance note).** Exact formulas, brute-force verified,
   and the new §7 adds nine exact levels of the diagonal. Its §11 withdraws
   the fit discrimination this entry used to credit: the fitted reading is
   refuted as an inference, a control sequence with a known, different limit
   passing both halves of the protocol that produced it. Solid, and its open
   question is now sharp enough to attract an analyst.
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

## Contribution and AI disclosure (updated 2026-09-27)

The former blanket “sole author” statement is withdrawn. Each manuscript
must distinguish the following roles using its actual source and revision
records:

- **Project direction and publication:** Chris Benjaminsen. Project framing,
  vocabulary and questions do not confer ownership of imported mathematics.
- **Research and writing:** the AI assistants and project contributors who
  performed the derivations, searches, computations, checks and text edits.
  Name the recorded contributor account and model for a specific return;
  do not silently relabel another account's work as Benjaminsen's.
- **Original mathematical sources:** the named authors of the theorems,
  sequences, algorithms and certificates used. Reproduction and explanation
  do not transfer their priority.
- **Unknowns:** if an original worker or exact model is not established,
  say so. A commit identity, profile or publication timestamp is not enough
  to infer sole intellectual authorship.

The [27 September contribution record](../research/RESEARCH-CONTRIBUTIONS-2026-09-27.md)
applies this policy to the meta-research and OEIS tasks and names the selected
source/revision records used. Current author edits still require independent
review. Finite computations do not prove asymptotic statements.

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
