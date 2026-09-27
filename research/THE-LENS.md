# The lens: why the tile is the right object

<!-- ledger
id: Q-the-lens
status: ANSWERED
todo: none
question: Why is the tile the right object, and what does the lens buy?
verdict: Completeness is PROVEN and elementary (every twin prime above p is a twin slot of T_p) and the recursion is exact; nothing here is claimed as new mathematics, and the triage rule of section 5 states what the lens does not buy.
-->

*(Written 2026-08-16 at Chris's request, to record why this framing has power
before the details bury it. Canonical alias for the tile, stated once: the
primorial wheel mod p#. Nothing here is claimed as new mathematics; the
objects are classical. What the note records is why they are the right things
to look at, and what they do and do not buy.)*

**Scope.** This document owns the framing: why the tile is the right object, the
exact recursion, the CRT covering identity, the one-number reformulations, and
the triage rule of §5, which is the corpus's canonical statement of it. It does
not own the state of any object (`G2-STATE.md`), the target (`ZONE-POSTULATE.md`),
the vocabulary (`GLOSSARY.md`) or the work queue (`../TODO.md`).

## 1. The central property: completeness

Fix a prime p and let W = p# be the product of all primes up to p. The tile
T_p is the residue pattern mod W: its **holes** are the residues coprime to W,
its **twin slots** the positions r where r and r+2 are both holes.

**Completeness (PROVEN, elementary).** Every twin prime pair above p appears as
a twin slot of T_p.

*Proof.* Let (q, q+2) be twin primes with q > p. Both are primes exceeding p,
so neither is divisible by any prime up to p, so both are coprime to W. Hence r
= q mod W is a twin slot. ∎

That is the whole engine, and it is worth stating baldly: **the tile misses
nothing.** It is a finite, periodic, exactly computable pattern that contains
every twin prime there will ever be. There is no tail, no error term, no
sampling. The twin primes are a subset of a set we can write down completely.

The converse holds in a region, which is what makes the containment useful.

**Crystallization (PROVEN, elementary).** Every hole h of T_p with 1 < h < p′², where p′
is the least prime above p, is a genuine prime; every twin slot with opener
greater than 1 and both members below p′² is a genuine twin prime pair.

*Proof.* A hole h > 1 is coprime to every prime up to p, so if composite its
least prime factor exceeds p, forcing h ≥ p′². ∎

So inside the **zone**, containment becomes equality: the pattern is not a
superset of the truth, it IS the truth. Above the zone the pattern is a
superset that later folds prune.

The proof of crystallization never uses primality of p, so the same statement
holds with any u in place of p. That is what lets the frontier be written in
closed form, u², with no next-prime lookup, and it is the basis of the u-frame
(research/U-FRAME.md).

## 2. The recursion is exact

Folding by the next prime is not an approximation. It is an exact rewriting.

**The fold (PROVEN).** T_{p'} consists of p′ copies of T_p laid end to end,
with p′ striking the residues 0 and −2 in every copy. Each existing slot keeps
exactly p′ − 2 of its p′ copies, which gives the census law
D_{p'} = (p′ − 2)·D_p.

**The residue-deletion form (PROVEN, verified at six folds).** Since
gcd(W, p′) = 1, as k runs over the p′ copies the shift kW mod p′ runs over
every residue exactly once. Writing w = W mod p′ and r_i = s_i mod p′, copy k
deletes exactly the slots whose residue lies in the 2-set {−kw, −kw−2}. So a
fold is p′ residue-class deletions applied to one fixed pattern, and

  G₂(new) = max over the p′ 2-sets of the damage that deletion does.

## 3. What CRT permits across folds

**PROVEN.** Every alignment for a new prime occurs among the copies. Moreover,
for any choices `a_p` at every prime in the tile, CRT supplies a phase `s` with
`−s ≡ a_p (mod p)` simultaneously. The forbidden positions in a window
translated by s are exactly `{a_p, a_p−2}` for each p. Thus adverse translated
pairs can occur together. Independence of the coordinates under a uniform
random phase does not exclude any joint configuration in a maximum over phases.

Consequently `G₂(P)−1` is precisely the maximum covered interval when one may
translate each prime's pair freely while keeping separation 2. This is the
covering identity in `two-class-lower-bounds.md` §1, checked exhaustively at
T7 by `review-0905-validation.js`.

The paired Jacobsthal function in OEIS A288815 also varies the common even
offset. Its larger values do not establish protection against translations in
our fixed-offset object. Record relocation at measured folds is finite data;
it supplies no theorem preventing damage from accumulating at some phase.
Any advantage at the integer origin needs a separate anchored estimate.

## 4. What the lens buys

**Many local residue identities are elementary.** The census ∏(q−2), the Copying Theorem, the
Seam Lemma, the palindrome, the birth cohorts, count(6) = ∏(q−4), the
never-self-strike classes, the Inertness Lemma: all of these fall out of the
CRT product in a line or two. The lens produces them constantly and cheaply.

**Exact computation at any level.** Because the object is finite and periodic,
quantities that are asymptotic elsewhere are integers here. The census, the
gap word, the variance, the anchored survivor count, the twin Jacobsthal are
all exactly computable, and have been computed: β at ten levels out to
W = 3.04e14, the ensemble variance at nine, G₂ at twelve.

**One-number reformulations.** The lens keeps compressing the conjecture into
the positivity or boundedness of a single computable quantity. Five so far, all
equivalent to or stronger than TPC. The u-frame gets two rows because its two
forms have different statuses, and two rows are already priced out as routes:

| reformulation | the one number | status as a route | file |
|---|---|---|---|
| anchored bias | liminf β(x) > 0 | open, Hardy-Littlewood strength | paper/anchored-note.md |
| Gap Reformulation | two-class Jacobsthal exponent < 2 | open sufficient target; secondary to the long-interval benchmark | paper/beta2-note.md |
| Zone Postulate | first twin slot below u² | open, the stated focus | research/ZONE-POSTULATE.md |
| Pane Bound | removals below slots in (n², (n+2)²) | CLOSED, strictly harder than the zone | research/GLOSSARY.md |
| u-frame, multiplier form | ln c(p) ≤ 2 ln p / p per fold | CLOSED, the rate has no slack | research/U-FRAME.md |
| u-frame, copy-theorem form | a bound on the residue-deleted maxsum | open, and the branch's one live entry point (TODO 0c) | research/U-FRAME.md |

The two CLOSED rows carry their own verdict and are worth reading together.
The Pane Bound removes the zone's redundancy and pays for it: in the repo's own
currency it reads "4.2665 proven, 1 needed" against the zone's "4.2665 proven,
2 needed", and 1 is half the parity floor. Removing the redundancy moved the
target further away, not nearer. The u-frame's per-fold requirement is
sharp rather than generous. It comes from differentiating the partial-sum
condition Σ_{p≤x} ln c(p) ≤ 2 ln x − ln 12, and the multiplier the tile actually
runs is measured at 0.77 to 2.14 times that rate on our own ladder and at mean
1.06 on Ziller and Morack's dominating sequence. What is left is not a rate
advantage but a total lifetime slack measured at 0.88 to 1.19 nats, summed over every
fold from here to infinity. Both are correct reformulations. Neither is a
way in.

That compression is the lens's real product. It does not make the conjecture
easier, but it makes it *sayable* in terms of finite objects, which is the
precondition for aiming at it.

## 5. What the lens does not buy, and the rule that keeps us honest

**The triage rule.** Identify the statistic, the scale, the quantifier and
which arithmetic estimates the argument actually uses. Local CRT counts are
often elementary and classical. An anchored survivor estimate can be hard;
expressing it in residue notation does not make it easy or prove it impossible.
Exact inclusion–exclusion retains all the information, but its signed
remainder still requires control on the relevant intervals.

Completeness says the tile contains every twin pair above the sieve depth.
It does not provide a lower bound in the chosen window. An almost-all-phase
estimate does not automatically apply at the integer origin. Any argument
that uses equidistribution there must state whether it has proved, imported,
or assumed the required error bound.

**A working test.** Trace the step that produces positive occupancy. Check
that its hypotheses, interval length and errors match the actual conclusion.
A finite measurement cannot supply an unproved asymptotic input.

The test has already caught a published programme. Holt's Legendre result
(arXiv 2603.25915 Theorem 3.3) rests on his Conjecture 2.1, "approximate
uniformity", stated as a conjecture supported by samples. That is the failure
mode above, reached from inside two decades of work on these same objects. The
rule named the shape before we found the example, which is the reason to run it
on our own arguments first rather than last.

**And the ceiling.** Every reformulation in the table above is equivalent to or
stronger than TPC, so each contains something at least TPC-hard. No reformulation here has removed that difficulty. This records the
status of the existing arguments; it does not exclude an independently proved
estimate in these coordinates.

## 6. Positioning

A new framework and vocabulary over classical sieve-theoretic objects: a new
lens. The tile is the primorial wheel, the census is Schemmel's totient at the
primorial, the fold is the wheel recursion, and the Zone Postulate route is
Ziller and Morack's from 2017.

**The largest overlap is with Fred B. Holt, with Helgi Rudd on the earlier
papers, and it covers most of this note.** Their programme has run since 2007,
about fifteen manuscripts, and it independently occupies the frame: the tile is
his cycle of gaps G(p#) among the generators of Z mod p#; §2's fold is his
R1/R2/R3 and Lemma 2.1; the kills are his fusions; the Copying and Redundancy
Lemmas are his Theorem 2.3; the census ∏(q−2) is his N2(p#); §1's zone is his
interval of survival Δ-H(p_k) = [p_k², p_{k+1}²] and the crystallization frontier
is his horizon of survival. The histogram transfer operator is his and Rudd's
from 2014, eigenstructure included. See `research/PRIOR-ART.md` for the
correspondence table and the citations. We reached these from the corpus and from
first principles without knowing the programme existed, several of the papers not
being in print until 2025 and 2026, so independent arrival is the credential.
Priority is theirs and we cite it.

What is ours is the vocabulary, the exact computations, the honest boundary, the
compressions of §4, the two-class form of the merge structure and its application
to a maximum gap, and the triage rule of §5.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
