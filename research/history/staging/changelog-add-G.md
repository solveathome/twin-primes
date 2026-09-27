# changelog-add-G.md — the history migrated out of partition G's files

<!-- ledger
id: Q-changelog-add-G
status: ANSWERED
todo: none
question: What history left wave-3 partition G's files, and what has to be staged for the CHANGELOG?
verdict: Staged verbatim with file and line: the twin-candidate census index is corrected from A059861(n-1) to A059861(n) with four independent confirmations, two script banner titles are retired as contradicted by their own companion prose, and two scripts that had no banner title gained one.
-->

Wave 3, partition G. Every block below was removed from or rewritten in a working
document and is reproduced verbatim with the file and line it came from. Nothing
here is a claim about the mathematics; it is the record of how the mathematics
got to where it is. To be folded into `research/history/CHANGELOG.md` by the
shepherd, indexed by document.

---

## research/oeis-G2-submission.md

**:26, COMMENTS, the twin-candidate census (RETIRED, wrong index).** Verbatim:

> There are
> A059861(n-1) of them per period for n >= 2 (Schemmel totient); the pattern is
> periodic mod P and palindromic (r is a twin candidate iff P-2-r is).

The correct index is `A059861(n)`, and with it the qualifier `for n >= 2` is
unnecessary: the identity holds from n = 1. Four independent confirmations, three
of them internal to the file itself and none previously written down together:

1. Brute-force enumeration of the residues r mod P with
   gcd(r,P) = gcd(r+2,P) = 1 gives 1, 1, 3, 15, 135, 1485 for n = 1..6, which is
   `A059861(n)` term for term. `A059861(n-1)` gives 1, 1, 1, 3, 15, 135.
2. The file's own EXAMPLE: "twin candidates mod 30 are 11, 17, 29", three of
   them at n = 3. `A059861(3) = 3`; `A059861(2) = 1`.
3. The file's own fitted constant. With `m = P/A059861(n)` the extreme-value fit
   `a(n) = c·m·(log P − log m)` over n = 5..12 returns the eight values 0.5004,
   0.4469, 0.4707, 0.4559, 0.4577, 0.4463, 0.4791, 0.5939, that is **mean
   0.4814, sd 0.0490, cv 10.2%, range [0.4463, 0.5939]** — which is
   `maxgap-law.md`:66's `c2'` row digit for digit, including both range
   endpoints, and the file's own rounded "c averages 0.48 … coefficient of
   variation of 10%". With `m = P/A059861(n-1)` the same fit returns 0.1007,
   0.0605, 0.0430, 0.0344, 0.0270, 0.0200, 0.0194, 0.0196: mean 0.0406 at cv
   69.4%, nothing like either.
4. The file's own provenance table already uses the `(n)` indexing: it records
   the slot counts as `A059861 = 6226553025` at n = 11 and `= 217929355875` at
   n = 12, which are `A059861(11)` and `A059861(12)` exactly.

So the code always used `(n)` and only the prose was wrong.

**:54, COMMENTS, the growth law (RETIRED, same index error).** Verbatim:

> c * m * (log(P) - log(m)), where m = P/A059861(n-1) is the mean gap between

Now `m = P/A059861(n)`. The error made the stated mean gap wrong by a factor of
p_n − 2, in the COMMENTS field of a draft addressed to an OEIS editor.

**:33, the A288815 comparison list (SUPERSEDED, stale at ten terms).** Verbatim:

> all computed terms (12 <= 18, 30 <= 30, 42 <= 66, ..., 258 <= 450).

The list ended at n = 10 while DATA carries twelve terms. Extended to
`528 <= 708`, which is n = 12. The inequality `a(n) <= A288815(n)` was checked at
all twelve against A288815 fetched from oeis.org and holds at every one.

---

## research/oeis-seam-submission.md

**:47-52, COMMENTS, the Hardy-Littlewood heuristic (RETIRED, a factor of two).**
Verbatim:

> Hardy-Littlewood heuristic: each seam pair is a twin pair with
> probability ~ (2*C2 / log^2(k*P)) * Product_{2 < p <= prime(n)} p/(p-2),
> giving expected count roughly e^(2*gamma) * prime(n+1) * (log(prime(n)) /
> log(P))^2 / 2, which decays like log(prime(n))^2 / prime(n);

The stated probability omits the factor 2 contributed by the prime 2, and the
`/ 2` in the expected count is that omission propagated. The twin-candidate
density mod P is `A059861(n)/P = (1/2)·∏_{2<p≤p_n}(1−2/p)`, not
`∏_{2<p≤p_n}(1−2/p)`, so the conditional twin probability is
`(2C2/log²N)·P/A059861(n)`. Since
`P/A059861(n) ~ e^{2γ}·log²(p_n)/(2C2)` the twin constant cancels exactly and the
expected count over k = 1..p_{n+1} is `e^{2γ}·p_{n+1}·(log p_n / log P)²`, with
no `/2`. The decay rate `log(p_n)²/p_n` and the divergence of its sum are
unaffected.

Measured against the file's own twenty terms: the corrected form predicts 57.3
by the asymptotic and 52.5 by the exact k-sum, against 48 observed. The retired
form predicted 26.3, low by a factor of 1.8.

Recorded because the repo already carries a regression test against the same
slip in the same constant: `research/audit-numbers.js` line 63 checks
`e^{2γ}/(4C2) = 1.2013` under the label "the retired factor-2-slipped value",
against the correct mean twin-slot gap constant `e^{2γ}/(2C2) = 2.4026`
(`research/a3-03-f-from-census.md`). The seam draft carried an independent
instance of it that the audit did not reach.

**:57-58, COMMENTS, the A057706 endpoint condition (REWRITTEN, ambiguous
parse).** Verbatim:

> (row n length of A087732) + [A002110(n+1) is in A057706 + 1].

Arithmetically correct under the reading "A002110(n+1) ∈ (A057706 + 1)", since
A057706 = 5, 29, 2309 and A002110(n+1) = 6, 30, 2310 at n+1 = 2, 3, 5. Rewritten
as `[A002110(n+1) - 1 is in A057706]`, which is equivalent and admits only one
parse. The submission goes to an editor who will check the formula.

**:74-75, CROSSREFS, the A087651 gloss (CORRECTED).** Verbatim:

> A087732 and A087651 (the twin primes of this family,
> open range),

A087651 is not a sequence of twin primes. Its OEIS name is "Sequence of
primorials P# such that j*P# has twin prime neighbors for some j with
0 < j < prime following P": it lists the primorials, not the primes. The gloss
was correct for A087732 and wrong for A087651, and the two shared one
parenthesis.

**Checked and left alone, recorded so the check is not repeated.** The
CROSSREFS gloss "A288815 and A072753 (paired Jacobsthal function, all even
differences)" in `oeis-G2-submission.md` looks wrong, since A072753's OEIS name
is "Maximum gap in two-stage prime-sieves" and its definition quantifies over
free choices of two residues per prime. It is right: `A288815(n) = 6·A072753(n)
+ 6` at all nineteen shared terms, verified against both sequences fetched from
oeis.org. The two are one object in two coordinates and belong in one
parenthesis.

---

## research/a3-03-f-from-census.md

**:29, the custody note (SESSION STAMP REMOVED).** Verbatim:

> Two methods sharing no code and no arithmetic agree to
> four figures at levels nobody had computed before this morning.

"before this morning" dates the session, not the result. The agreement is the
content.

**:47-48, the U-FRAME attribution (ORPHAN, dead quotation).** Verbatim:

> a comb of spacing 2p, truncated at G₂(T_x). U-FRAME's "the smallest qualifying
> value is about 2p" is therefore exact, with the sign read straight off p mod 3.

U-FRAME no longer says "about 2p". `U-FRAME.md` §10 now reads "putting the
smallest qualifying gap at exactly 2p ∓ 2 rather than 'about 2p'", and its child
`research/kappa-not-L.md`:24 carries the same sentence. The claim was corrected
in the sister document and this note about correcting it stayed behind, so a
reader following the pointer found agreement rather than the loose statement
being sharpened.

**:112, the exponent gap (SCOPE RESTORED).** Verbatim:

> branch the truth is on; it does nothing about the factor 0.58 ln p between the
> branch and a proof.

The home statement is a range, not a point: `0.58 to 0.95 ln p`, the two ends
being ρ = 1.5 and ρ = 2.4, and ρ is not monotone in the level. See the entry
under `a3-05-bound-L.md` below, which is the same defect in three files.

---

## research/a3-05-bound-L.md

**:30, section heading (REWORDED).** Verbatim: `## 1. Setting, all previously
proven`. The section's own text says what is proven and where.

**:260 (REWORDED).** Verbatim: "those are now used to the last unit". The "now"
dates the drafting, not the argument.

**:254-256, the exponent gap (SCOPE RESTORED, and this is the home of the
defect).** Verbatim:

> L of order ln^2 p clears that from about p ~ 800 onward. The distance from
> Theorem B's proven 0.18 p to that requirement is a factor **0.58 ln p**, and
> nothing else.

`research/gate-multiplies.md`:466 and `research/U-FRAME.md` (three sites) all
state the gap as **0.58 to 0.95 ln p** (0.18/0.31 and 0.18/0.19), and U-FRAME §9
adds in terms that "since ρ is not monotone in the level neither end can be
presented as the one the trend favours". Three of partition G's files carried the
flattened single-ended form — `a3-05-bound-L.md`:254, `a3-09-histogram-operator.md`:184
and `a3-03-f-from-census.md`:112 — and all three are descendants of
`gate-multiplies.md` §8 as it read before the range was measured. Their agreement
was not independence. The range and its reason are now stated in a3-05 and the
range alone in the other two.

`gate-multiplies.md`:384 and :494 also read `0.58 ln p` and were checked: :384
carries the two-ended parenthetical two lines below, and :494 is a statement
about the *branch*, which 0.58 against 0.95 does not change. Neither is a defect.

---

## research/a3-09-histogram-operator.md

**:78 (REWORDED).** Verbatim: "This is the brief's skeleton with the
multiplicity filled in". The multiplicity is exact and the fact stands without a
brief behind it.

**:167 (REWORDED).** Verbatim: "priced against the **corrected** budget". The
per-fold budget is not "corrected" any more, it is the budget. Same defect as
`gate-multiplies.md` and `U-FRAME.md`:314.

**:184 (SCOPE RESTORED).** Verbatim: "factor 0.58 ln p, and it is the whole of
the u-frame branch." See the a3-05 entry above.

---

## research/localized-04-maxsum.md

**:3, header (SESSION STAMP REMOVED).** Verbatim: `*(2026-08-17 night. Engine
…)*`. The date stays, because it identifies the dated OUTPUT block of the
companion script; "night" dates the session.

**:121-122, the LOCALIZED-GAP quotation (SCOPE RESTORED).** Verbatim:

> That is the same statement as LOCALIZED-GAP.md §5's "M/(k ln³x) flat in 1.2 to
> 1.6", written so the k dependence sits where it belongs, in the window and not
> in the level.

The band is scoped in its home: `LOCALIZED-GAP.md` §5 states it from
`localized-01-ladder.js`, "k = 3, window Y = x³, 61 folds to x = 307". This file
quoted it unscoped, and `research/localized-single-alignment.md` §5 — the same
partition — carries the same object to x = 1613 and records M/ln³x reaching 6.41,
outside the band. The two files disagreed with each other with the home's scope
removed from one of them. The scope is now carried at the quotation.

**:291-293, the Theorem B pointer (STALE POINTER).** Verbatim:

> **And it locates exactly what localization buys A5.** U-FRAME §11 records that
> Theorem B is "structurally capped, since maxsum_m ≥ G₂ always, so it can never
> prove L below G₂/(3p) ≈ 0.18x".

The quoted phrase is alive and moved. It has not been in U-FRAME §11 since wave
2, and as of this session it is not in `U-FRAME.md` at all: the section split
sent it to the new child `research/kappa-not-L.md`, where lines 85-86 carry it
word for word. Repointed at the child, which U-FRAME §10 itself names as the
home. Verified at both ends rather than assumed from the move.

**:305-306, the tail-fit pointer (STALE POINTER).** Verbatim:

> U-FRAME §11's exact tail
> engine gives FIT ln(1/tail) = −0.235 + 1.2992·(g/m̄) on the tile.

U-FRAME §11 now describes the tail engine but no longer carries the fit; the fit
lives at `research/operator-and-pair-count.md`:38, which states it as
`ln(1/tail) = −0.235 + 1.2992·(2p′/m̄)` with R² = 0.993. Repointed, and the
regressor restored to the home's form with a note that this file reads it as a
law in the threshold.

**:392, the U-FRAME §9 quotation (ORPHAN, dead quotation).** Verbatim:

> which retires the question
> U-FRAME §9 called "one rung, no ladder": the ladder exists, it is

The phrase "one rung" appears nowhere in `U-FRAME.md`. §9 now reads "**Solid, and
a hole that has since closed.** The growth law of maxsum_m is no longer missing",
and cites this file as what closed it. Textbook wave-1 orphan: the claim was
fixed in the sister document and the note about fixing it stayed. The hole is
still named in the body, by description rather than by a dead quotation.

**Two further sites of the same dead quotation are outside partition G and were
not touched**: `research/LOCALIZED-GAP.md`:155 and `research/G2-STATE.md`:397
both say "described there as one rung with no ladder". They and this file are
three descendants of one home.

---

## research/localized-single-alignment.md

**:91 (REWORDED).** Verbatim: "The per-fold cost question the brief asked — is
the damage countable? — has a clean yes for the CENSUS".

**:109 (MIGRATED).** Verbatim:

> So the crude
> ln³ constant was my wrong frame, the surface law is intact, and the correct
> statement stays:

First person about one's own drafting error. The registered prediction P1 stated
M/ln³x flat in [3.6, 4.8]; the ladder to x = 1613 reaches 6.41 at x = 739. P1 is
REFUTED in that frame and the surface law of `maxgap-law.md` §4 is intact, which
is what the body now says. Partly logged already at `CHANGELOG.md`:24-26.

**:153, section heading (REWORDED).** Verbatim: `## 8. Compute, and one
correction to the reach estimate`. Section number unchanged.

---

## research/level-ledger-tight.md

**:3, header (PROCESS MARKER REMOVED).** Verbatim: `**2026-08-17, branch
`opus-try`. Script: …**`. The branch name is process; the date identifies the
script's dated output and stays.

**:29, section heading (REWORDED).** Verbatim: `## 1. Custody, and one
correction`.

**:47-68, the agent-to-parent handoff block (MIGRATED, and it was a live
falsehood).** Verbatim, in full:

> **Corrections to the record** (for the parent to apply; nothing was edited):
>
> 1. FOLD-PROFILE §2's table column headed "Möbius bound" is the **K-level** bound
>    4·3^{π(x)−1}, twice the h-level bound 2·3^{π(x)−1} stated in the theorem two
>    lines above it. Both are correct; the header is ambiguous and cost this
>    file one round of confusion.
> 2. **REFUTED, a premise of the whole ladder.** FOLD-PROFILE §3's row is quoted
>    at the *ladder* prime, which is the smallest admissible p at every level, and
>    the truth is not uniform in p. Maximising over p instead:
>
>    | x | §3 value (ladder p) | max over p | at p | range of p searched |
>    |---|---|---|---|---|
>    | 11 | 1.62 | 2.87 | 47 | ≤ 5000 |
>    | 13 | 3.35 | 5.97 | 149 | ≤ 5000 |
>    | 17 | 3.63 | 12.03 | 37 | ≤ 2000 |
>
>    So §3's "the base is nearer 2 than 3" is read off a sequence that moves p and
>    x together, and is not a statement about x alone. The bound is uniform in p;
>    the measurement it is compared against is not.
> 3. RESOLVED: the session record cited by `research/discrepancy-two-class.md`
>    §4 and §5 lives at `research/history/SESSION-2026-08-17.md`, moved there
>    when the body of work was separated from the changelog.

The block told a reader that three edits were pending and that nothing had been
edited. All three had been done.

- **Item 1: PAID.** `research/FOLD-PROFILE.md`:73 now heads the column "K-level
  bound 4·3^{π(x)−1}", and :79 states "Both bound columns are K-level, that is
  twice the corresponding bound on h". Removed outright.
- **Item 2: PAID as a conclusion, kept as data.** `FOLD-PROFILE.md`:110-119 now
  carries the maxima 2.87, 5.97, 12.03 at x = 11, 13, 17, the statement that the
  diagonal sequence moves p and x together, and the conclusion "No exponential
  base should be fitted to either sequence". What FOLD-PROFILE does *not* carry
  is the primes attaining the maxima (47, 149, 37) or the ranges searched
  (≤5000, ≤5000, ≤2000), and `research/discrepancy-two-class.md` §9 cites this
  file's §1 for the refutation. So item 2's table and its conclusion stay in §1,
  restated as a scope note on the custody row they qualify rather than as a
  correction owed to another file.
- **Item 3: SPENT.** A note about where a file was moved. The pointers that
  needed it (`discrepancy-two-class.md`:138 and this file's :278) already name
  `research/history/SESSION-2026-08-17.md` directly.

**Also removed with the block**: the dead quotation of FOLD-PROFILE §3 as reading
"the base is nearer 2 than 3". That phrase is in no working document but this
file and `discrepancy-two-class.md`; FOLD-PROFILE §3 no longer makes the claim.

**:97, the discrepancy-two-class quotation (ORPHAN, dead quotation).** Verbatim:

> §9's "loose end worth one hour": the natal ledger deviation is a sup of a k = 2

`discrepancy-two-class.md` §9 is headed "Loose end, since settled", cites this
file as what settled it, and nowhere contains "worth one hour". The two files
agree; only the quotation was dead.

**:190 (REWORDED).** Verbatim: "**(a) Second moment plus extreme value, the
briefing's suggested route.**"

**:397 (REWORDED).** Verbatim: "The best deliverable is a **constant** 81.0. The
briefing asked for a growing factor". The fact that a growing factor was wanted
stays; that a briefing asked for it does not.

---

## research/exponent-control.md

**:31 (REWORDED).** Verbatim: "and so do the briefing's three pilot numbers
1.191, 1.282, 1.801."

**:50-51 (REWORDED).** Verbatim: "The briefing's +0.19 is an unlucky-low draw
from a distribution centred on +0.26". The +0.19 stays as a number on record.

**:144 (CLAUSE DELETED).** Verbatim: "which is the briefing's doubt (c)".

**:177 (REWORDED).** Verbatim: "Chris's ~1.6 survives; the route to it in the
briefing does not." The route being rejected is the bias-transfer route, which is
a fact; whose briefing proposed it is not. Attribution to Chris stays.

**:206 (REWORDED).** Verbatim: "Two corrections to how the margin is being read,
then the number."

**:219-220 (ORPHAN, dead quotation).** Verbatim:

> But "1.62, comfortably below the critical
> 2" is a θ-frame exponent measured against an x-frame threshold.

The phrase "comfortably below the critical 2" is in no working document in the
corpus. `U-FRAME.md` §6a now reads "**The fitted exponent is 1.62 in the theta
frame and 1.924 against x, and the Zone Postulate threshold is an x-frame
quantity**", states the frame correction itself, and cites this file's §6 back;
`THE-DIALS.md` §6 carries the corrected 1.57/1.567. This is a second instance of
the orphan partition E fixed in `two-class-lower-bounds.md`, and nobody had
caught it. The rule the paragraph teaches survives, stated as a rule rather than
as a quotation of a retired reading.

---

## research/discrepancy-two-class.md

**:3, header (PROCESS MARKER REMOVED).** Verbatim: `**2026-08-17, branch
`opus-try`. Script: …**`.

**:243-244 (MIGRATED).** Verbatim:

> (An earlier 8-draw run to $x=19$ put the twin set above the whole control range.
> That was small-sample noise and is corrected here.)

An 8-draw run to x = 19 put the twin set above the whole control range and was
read as a twin-specific discrepancy law. RETIRED as small-sample noise, refuted
by the fuller run in `discrepancy-two-class.md` §6. Nothing in the body needed
fixing: §6's refutation two lines above already states the current finding in the
present tense.

**:299-311, §9 (ORPHAN, dead quotation).** Verbatim:

> `research/FOLD-PROFILE.md` §3 records $\max_a \lvert h(a) - D/p\rvert$ =
> 1.36, 1.62, 3.35, 3.63, 6.13, 16.9 across five folds and reads it as "the base
> is nearer 2 than 3" against the $3^{\pi(x)}$ majorant.
> …
> so §5 applies and its base should be
> $\sqrt 3 = 1.732$, not 2. The "nearer 2" reading itself was refuted in the same
> file (§1): §3's series is quoted at the ladder prime, which moves $p$ with $x$,
> and maximising over $p$ instead breaks it.

FOLD-PROFILE §3 does not read the sequence as "the base is nearer 2 than 3"; it
says "No exponential base should be fitted to either sequence, and the diagonal
one in particular should not be read as evidence about the constant in the proven
majorant." The claim was fixed at the home and the note describing the error
stayed here. The numerical agreement this section exists for — FOLD-PROFILE's
per-fold geometric mean 1.655 against this file's two-class sd base 1.661 — is
untouched, and the pointer to `level-ledger-tight.md` §1 still resolves to the
scope note that survives there.

**Checked and NOT changed, recorded so it is not "fixed" later**: "across five
folds" beside six listed values is correct. The six values sit at x = 7, 11, 13,
17, 19, 23, which is five fold steps, and the geometric mean the sentence goes on
to quote, 1.655, is `(16.9/1.36)^(1/5)` exactly.

---

## research/OBSERVATIONS.md

**:14-45, the triage statement (RELOCATED to its owner).** Thirty-two lines
reduced to the rule in two operational sentences plus a pointer, per the wave-2
verdict. `research/THE-LENS.md` §5 owns the triage rule and says so at
`THE-LENS.md`:184, and it carries every part removed here: the CRT argument for
why the split is forced, the working test, and the payout against Holt's
Conjecture 2.1. Verbatim, in full:

> **Triage rule, applied to every entry before anything else.** The tile is a CRT
> product: an allowed residue chosen independently modulo each stacked prime. So
> sightings come in two kinds, and they have very different value.
>
> - *Residue statements.* Anything expressible in terms of residues modulo the
>   stacked primes. These fall out of the product structure in a line, they never
>   touch the wall, and they are classical or near-classical almost without
>   exception. The census ∏(q−2), the Copying Theorem, the Seam Lemma, the
>   palindrome, Euclid's p# ± 1, count(6) = ∏(q−4), and entry 1 below are all of
>   this kind. Expect the bench to produce these constantly.
> - *Interval statements.* Anything relating the pattern to a stretch of the
>   number line: does a slot land in (p, p²), how many holes sit in this window,
>   is an anchored count positive. This is where the parity wall lives, and it is
>   the same split `sift-limit-attack.md` reached from the other side when it
>   found the distance from 4.2665 to 2 to be entirely a positivity problem and
>   zero percent a distribution problem.
>
> The rule: **if it can be stated in residues it is free and probably known; if it
> needs an interval it is hard.** The entries worth real time are the ones sitting
> on the boundary, where a residue statement is trying to become an interval
> statement. Gaps are the main example, which is why the extremal-gap position
> question and the d ↦ G_d map rank above everything else on the bench.
>
> **The rule has paid out once against a published programme, which is the best
> evidence it is not just a slogan.** `research/ZONE-POSTULATE.md` §7 used it to
> name the likely failure mode in advance: an argument that silently assumes the
> tile's slots are equidistributed in the zone, which is the conjecture. Holt's
> Legendre result (arXiv 2603.25915 Theorem 3.3) rests on exactly that, his
> Conjecture 2.1 "approximate uniformity", explicitly supported by samples and not
> proved, after two decades of work on these same objects
> (`research/PRIOR-ART.md`). The prediction was written down before the example was
> found.

**:675, the corpus-change ledger (ORPHAN, dead quotation).** Verbatim:

> - **Changed in the corpus.** `GLOSSARY.md`'s "the grain census awaits a law"
>   now points at `grain-census.js`, which settled it.

`GLOSSARY.md` contains no such phrase. Its grain entry now reads that the size
distribution "HAS a law as of 2026-08-14: the exact CRT inclusion-exclusion
identity and its fold covariance, in [grain-census.js]". The claim was corrected
at the home and the note about correcting it stayed. Reworded to state what the
glossary says, matching the disposition already given to the twin site at
`web/bench/README.md`:121-123. GLOSSARY's "awaits a law" is RETIRED; the law is
settled and the entry repointed.

---

## Script header banners

Retitles only. No READINGS block, no pasted OUTPUT, and no correction or
superseded banner was touched anywhere, per decision U5.

**`research/natal-cap-23-covadj-proof.js`:2.** Verbatim: `NATAL-CAP-23 —
Cov_adj < 0: proving the calm's anticorrelation leg (iii)`. The leg numbering
names a lemma's internal structure rather than the result.

**`research/natal-cap-26-minus-half.js`:2.** Verbatim: `NATAL-CAP-26 — THE
MINUS-HALF THEOREM: the calm's leg (iii), aggregate form`.

**`research/natal-cap-30-skeleton-bound.js`:2-3.** Verbatim: `NATAL-CAP-30 — THE
AGGREGATE 30-SKELETON BOUND: the calm's leg (iii) closed at every computed
level`.

**`research/natal-cap-28-analytic-certificate.js`:2.** Verbatim: `ATTACK 28 —
THE FULLY ANALYTIC CERTIFICATE LAW`. Retired because its own companion prose
says in terms that it is false: `research/certificate-engine.md`:11 opens "There
is no 'fully analytic certificate law', and nothing here is 'closed'. The
script's banner names one object; it is nine, at five calibrations, and one of
the nine is refuted."

**`research/audit-numbers.js` and `research/exponent-control.js`** had no banner
title at all. Nothing retired; titles added.
