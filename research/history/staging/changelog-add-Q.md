# changelog-add-Q.md — the history migrated out of partition Q's files

<!-- ledger
id: Q-changelog-add-Q
status: ANSWERED
todo: none
question: What history left wave-4 partition Q's files, and what has to be staged for the CHANGELOG?
verdict: Staged: the Maier-Pomerance clause in the OEIS draft is RETIRED because it drew a >= from a << (they state an upper bound), and audit-numbers.js gained an oeis part of 39 checks carrying three retired values, including the exponent 1.57 quoted for G2 when 1.57 is A288815's.
-->

Wave 4, partition Q. Every block below was removed from or rewritten in a working
document and is reproduced verbatim with the file it came from. Nothing here is a
claim about the mathematics; it is the record of how the mathematics got to where
it is. To be folded into `research/history/CHANGELOG.md` by the shepherd, indexed
by document.

---

## research/oeis-G2-submission.md

**COMMENTS, the Maier-Pomerance clause (RETIRED, conjecture cited in the wrong
direction).** Verbatim:

> and
> a(n) >= p * log(p)^(2+o(1)) under the Maier-Pomerance conjecture for
> Jacobsthal's function.

Maier and Pomerance state an **upper** bound. `research/maxgap-law.md`:415,
which records a source check against FGKMT (arXiv:1412.5029) dated 2026-08-17,
quotes them verbatim as *"It is conjectured by Maier and Pomerance that in fact
`Y(x) << x(log x)^{2+o(1)}`"*, with `Y(x) = j(P(x)) - 1` their eq. (1.3). A `<<`
statement does not give the `>=` this sentence drew from it. The equality form
`J(T) = T(log T)^{2+o(1)}`, which does, is Ford's 2018 Montreal slides, and
`maxgap-law.md`:426 separates the two forms explicitly and locates each.

The corpus therefore already held the distinction and the draft collapsed it.
Replaced by a version that names both forms and attributes each, and Ford's
slides were added to LINKS.

**COMMENTS, the upper-bound paragraph (RETIRED, an openness claim the repository
contradicts).** Verbatim:

> No upper bound is published. Iwaniec's bound O(log(P)^2) for Jacobsthal's
> function has no published analogue for two forbidden classes per prime, at any
> exponent.

`research/THE-DIALS.md`:257 carries the twin Jacobsthal G2(p#) at sieve
dimension 2 with a proven Jacobsthal exponent of **4.2665**, citing
`paper/beta2-note.md`, whose status line is "THEOREM, sieve input FULLY VERIFIED
against the primary source, no outstanding items" and whose §1 gives
`G2(n) <= C(eps) * p_n^(beta_2 + eps)` for all n. The sieve limit
`beta_2 ≈ 4.266` is quoted there as in print at Diamond and Halberstam,
Cambridge Tracts 177, p. 79.

The retired sentence is defensible on the narrow word "published", since
beta2-note is itself unpublished. It is not defensible on "at any exponent",
which reads as "nothing is known" while the submitter holds the bound. Replaced
by a statement of what is true: no analogue is in print, the obstruction is
sieve dimension rather than missing input, and the open band on the exponent is
(2, 4.2665], matching `THE-DIALS.md`:288.

**NAME, the residue range (RETIRED, half-open interval written as closed).**
Verbatim:

> Largest gap between consecutive integers r in [0, P] with gcd(r, P) =
> gcd(r+2, P) = 1

The period is `0 <= r < P`. Writing `[0, P]` names P itself, which is not a
residue of the cycle. Harmless arithmetically, since gcd(P,P) = P excludes it
anyway, but an OEIS NAME field should not need the reader to notice that.
A059861's own OEIS formula uses `0 <= r < primorial(n)`.

**COMMENTS, the p log^2 p ratio (RESCOPED, not retired).** The sentence

> The direct ratio a(n)/(p * log(p)^2) wobbles between 0.66 and 1.13 with
> no trend, mean 0.89

carried no range, and followed a sentence scoped to n = 5..12. The numbers are
those of **n = 3..12**: 0.6640, 1.1318, mean 0.8929. Over n = 5..12 the same
three read 0.66, 1.09 and 0.86, so the inherited scope would have made the
sentence wrong. The range is now written into the sentence.

**PROG, the feasibility comment (SUPERSEDED, stopped short of the DATA).**
Verbatim:

> \\ feasible through n=9; a(10) computed by segmented sieve (see link)

DATA runs to a(12). Corrected to name a(10) and a(11) as segmented-sieve terms
and a(12) as the mod-30 lattice walk, which is what the provenance table has
always said.

**COMMENTS, the growth exponent (RETIRED, another sequence's number).**
Verbatim:

> Calibrated against the 58-term one-class control, the growth
> exponent in p is near 1.57, with a practical bracket of 1.3 to 1.9 and a hard
> floor of 1.

1.57 is the control-corrected exponent of **h2**, Ziller and Morack's paired
Jacobsthal function A288815, measured over nineteen terms. This sequence's
figure is **1.54 ± 0.09** over its ten exact terms.
`research/exponent-control.md`:198 gives the instruction in terms, *"Quote 1.57
for h2 and 1.54 for G2"*, its §5 table at :168-169 carries both with their error
bars, and `research/U-FRAME.md`:156 carries 1.54 ± 0.09 for G2 independently.

Both figures were rebuilt from the control rather than copied. The raw x-frame
slope over x = 5..37 is 1.801; the control A048670 fitted over all sliding
windows reproduces `exponent-control.md` §1 digit for digit, giving bias +0.262
at width 10 and +0.280 at width 19; and 1.801 − 0.262 = 1.539 while
1.847 − 0.280 = 1.567. The replacement states the raw slope, the control, the
bias and the corrected value with its scope, and says explicitly that A288815
reads 1.57 over nineteen terms so the two are not one exponent.

**CROSSREFS, the A192870 label (SUPERSEDED, loose).** Verbatim:

> A192870 (twins between squares)

A192870 is the maximum M with no prime **n-tuplet** between M^2 and (M+1)^2, an
irregular sequence over k-tuplet types whose twin case is the single term
a(2) = 122. A091592 is "numbers n such that there are no twin primes between n^2
and (n+1)^2" and is the sequence this draft's danger-line discussion actually
concerns. A091592 added, A192870 relabelled, and the A288815 / A072753 grouping
strengthened with the identity `A288815(n) = 6*A072753(n) + 6` that A072753's own
page carries.

---

## research/oeis-seam-submission.md

No claim in this file was retired. The audit recomputed all twenty DATA terms,
every witness, the ceiling, the two low-n exceptions, the EXAMPLE, the PROG entry
and the Hardy-Littlewood heuristic from scratch, and found no correctness defect.
The wave-3 factor-of-two correction was rederived independently from Mertens
rather than accepted, and it stands.

Two additions, neither superseding anything:

- The heuristic now states its numbers: 52.5 by exact per-k sum and 57.3 by the
  asymptotic form against 48 observed, with a note that the n = 1 term carries
  about 8 of the asymptotic total because P = prime(1) there and the form
  degenerates. Written down so that a future reintroduction of the retired
  factor of two shows up as 26.3 against 48 in prose as well as in the audit.
- a(21)..a(30) were computed and verified and are recorded in the provenance
  section: `0, 2, 1, 1, 2, 1, 1, 1, 0, 1`. They are deliberately **not** appended
  to DATA, which is the submitter's field.

---

## research/audit-numbers.js

Exempt from history migration by house rule: a correction banner in a script
header is that artifact's current status. Recorded here only as a scope change,
since it is the enforcement behind the two blocks above.

The script gained a part `oeis`, 39 checks. Nothing was removed and no retired
value was weakened. The pair at line 63, `e^{2gamma}/(4 C2) = 1.2013` against
`e^{2gamma}/(2 C2) = 2.4026`, labelled in code "the retired factor-2-slipped
value", was the correct regression test for the seam draft's error and could not
reach it, because the script's scope was the research corpus. That same pair now
also stands inside the part that covers the drafts, alongside two further retired
values: the `c` fit under the retired `A059861(n-1)` indexing (mean 0.0406 at
cv 69.4%, against 0.4814 at cv 10.2%), and the seam heuristic under the retired
`/2` (26.3 against 52.5).

A third retired value joined them at the end of the wave: the exponent 1.57
quoted for G2, where 1.57 is A288815's. The part now rebuilds both corrected
exponents from the control and checks that they differ by more than rounding, so
collapsing the two sequences to one exponent fails the run.
