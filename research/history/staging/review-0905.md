# Primeoire review and proposed next campaign, 2026-09-05

<!-- ledger
id: Q-review-0905
status: ANSWERED
todo: none
parity: Review of the scope of sieve obstructions; no new parity estimate is claimed. The proposed benchmark imports classical prime-distribution input, and its extension requires a separately proved signed arithmetic estimate.
question: Does the present programme justify its latest stopping decision, and what is the next useful campaign toward infinitely many twin primes?
verdict: The computational checks pass and the DHR application survives this reading, but several summaries overstate the obstruction or misstate an implication. Recommend repairing those claims, retaining the fold framework, and testing it against Chen on long intervals before attempting a specifically stated parity-sensitive estimate. No proof of twin primes or improvement of an exponent is supplied.
-->

Internal review at commit `6ab754e`. This is a proposal for Chris, not a change
to the adopted research programme. The existing manuscripts and research
summaries have been left unchanged. No external publication or contact was made.

The project has a useful exact representation of the problem and substantial
computational work. It has no demonstrated route to infinitely many twin
primes. However, the latest assertion that the tile itself cannot support such
a route is stronger than the evidence warrants. The correct distinction is
between what the structure encodes and what the estimates currently extract.

## 1. Review scope and what survives

Read the entry documents, target, lens, attack and question registries,
search conventions, the upper-bound derivation, the relevant variance and
anchored formulas, and the records underlying the parity and bilinear
closures. The lower-bound manuscript was inspected for its statement and
construction setup; its full Kalmynin–Konyagin adaptation has **not** been
independently audited in this review. Neither the entire historical corpus nor
every external citation has been referee-checked.

**VERIFIED computationally.** `node research/qc.js --full` exited successfully:
14 corpus checks clean, the checker self-tests passed, and 251/251 numerical
checks passed. This included recomputing the maximum twin-slot gaps through
37#, and checking the recorded gap witnesses at 41# and 43#; the latter two
were not fresh exhaustive maximality searches. A successful gate verifies its
listed assertions, not every mathematical sentence in the repository.

The added [validation script](../../review-0905-validation.js), whose output is
written by the existing embed tool, independently compares the browser fold
kernel with direct divisibility marking through T19. It also exhausts the CRT
covering identity at T7 and checks the four-sign identity in section 4 below.
These are finite checks of definitions and algebra, not evidence for a new
asymptotic law.

**DERIVATION CHECKED, using the cited sieve theorem.** The application in
[beta2-note](../../../paper/beta2-note.md) has the right structure. With
`H = z^(beta+epsilon)` and sieve level `D = z^(beta+epsilon/2)`, the weighted
remainder is `O(D log^7 D)` while the positive main term has order
`H/log^2 z`. Their ratio tends to zero. This gives the stated uniform upper
bound with `beta = 4.266450284…`. I found no defect in this application; this
review did not re-read all the archived book pages or establish its novelty.

**ELEMENTARY AND CHECKED.** The fold census, crystallization with the exclusion
of 1, and the CRT product for pair correlations are sound. Almost-all phase
estimates do not select the integer origin. A subquadratic uniform G2 bound
would suffice for twin primes. None of these statements is a new proof of
infinitude.

## 2. Corrections needed before another campaign

### A. The parity obstruction is overextended in the latest summary

[README Status](../../../README.md) says every statement about the tile is a
residue statement and concludes that every argument using it is parity-blind.
That conclusion does not follow. Exact divisibility information, including
its arrangement on a finite interval, determines primality there. Full
inclusion–exclusion is an exact identity. The difficulty is controlling its
signed remainder uniformly as the interval grows.

The classical obstruction concerns specified classes of sieve bounds and their
available errors. A parity-twisted comparison sequence can preserve their
usable asymptotic statistics; it need not preserve every exact residue count
or every possible fact about the original integers. The stronger general
obstruction in [Tao's 2014 discussion](https://terrytao.wordpress.com/2014/11/21/a-general-parity-problem-obstruction/)
also explicitly relies on a pseudorandomness hypothesis. It cannot serve as
an unconditional impossibility theorem for all arguments on the tile.

This distinction was already made in
[the obstruction audit](attack-obstruction-audit.md) and
[the exact-data adversary experiment](attack-parity-adversary.md). The latter
even records finite instances where exact congruence information defeats its
adversary. Those computations are not an asymptotic escape, but they directly
contradict the unrestricted information-loss claim.

**Repair:** every exclusion must name the method class, retained statistics,
error tolerance, and relevant quantifiers. Keep the parity checklist, but do
not classify a proposed proof by the presence of residue notation alone.
This does not reopen any specific failed inequality.

### B. The number 4 is not a proved universal floor

The README states that everything in `(2,4]` needs input outside the standard
sieve axioms. Its own [refuted registry](../../REFUTED.md), under the floor-at-4
entry, withdraws precisely that claim. The DHR value is an achieved sifting
threshold, not the optimal threshold proved for every possible sieve.
[Ford's notes, section 3.1](https://ford126.web.illinois.edu/sieve2023.pdf)
table known **upper bounds** on the optimal sifting limit and state that its
exact value at dimension 2 is unknown.

**Repair:** say that the available DHR lower function is zero at the target
parameters, and that an improvement of its threshold is open. The failure of
current methods is real; a universal barrier at 4 has not been established by
the cited material. This correction supplies no improved sieve.

### C. The Jacobsthal implication loses a quantifier

[The new consolidated paper, section 5](../../../paper/two-class-jacobsthal.md)
and the README infer `g(x#)=o(x^2)` from `G2(x#)<x'^2` using `g<=G2`.
That inference is invalid as written. Since `x'/x` tends to 1, those inequalities
give at most `limsup g(x#)/x^2 <= 1`, not convergence to zero.

An abstract comparison `g(x)=x^2/2`, `G(x)=3x^2/4` illustrates the logical
failure; it is not a proposed model of the actual Jacobsthal functions.
The genuinely subquadratic bound `G2(x#)=O(x^(2-delta))` for fixed `delta>0`
would imply the little-o conclusion. An infinitely-often upper bound is
weaker again. These targets must not be interchanged.

**Repair:** preserve the distinction between a constant at exponent 2, a
strict power saving, and an infinitely-often result. This is a correction to
the cited deduction, not a proof that no other implication can exist.

### D. CRT does not prevent adverse alignments from combining

[THE-LENS section 3](../../THE-LENS.md) says different primes' worst
alignments cannot compound at one location. For any specified residues `a_p`,
CRT supplies an `s` with `-s = a_p (mod p)` simultaneously for every prime
in the tile. In a window translated by `s`, its forbidden pairs are exactly
`{a_p,a_p-2}`. Thus the full tile realizes every such joint choice.

The correct statement is already proved in
[two-class-lower-bounds section 1](../../two-class-lower-bounds.md): G2 minus
one is the maximum covered interval under freely translated pairs with
separation 2. The validation script exhausts all phase choices at T7.

The larger paired Jacobsthal function also varies the common even offset.
Its larger values therefore do not establish protection from adverse
translations in G2. Any protection near the actual origin must be proved
using the origin and the interval length.

### E. The headline numerical band drops an outlier

The README's full-ladder range `0.45 to 0.53` omits the value at x=37.
[The bound producer](../../a144311-full-ladder.js) and the paper's own table
give approximately 0.594 there. For the reported normalization over x>=11,
the full range is approximately 0.446 to 0.594. Excluding a point must be
explicit; a local power fit is not an asymptotic exponent.

### F. One shifted Liouville average is not a complete proof specification

The README names `sum_(p<=X) lambda(p-2)=o(pi(X))` as the clean missing input.
Such cancellation would concern the parity of the number of factors of p-2.
Negative Liouville value alone does not imply primality: for example,
`107-2=105=3*5*7`. A proof must also supply appropriate roughness or factor-count
restrictions and show that the estimate survives those restrictions.

**Repair:** call this an example of difficult parity-sensitive information,
not a sufficient substitute for the conjecture without a written implication.
Likewise, Type II is a concrete class of useful inputs, not a proved necessary
form for every conceivable future proof.

## 3. What the finish line actually requires

Use the ordinary count

`T(X) = #{n <= X : n and n+2 are prime}`.

The target is exactly `T(X) -> infinity`. Equivalently, the dyadic intervals
`(2^j,2^(j+1)]` contain a twin opener for infinitely many j. This asks for
neither every zone nor every translation of an enormous primorial period,
nor a Hardy–Littlewood asymptotic. Sparse successful scales are sufficient.

The existing weak Zone Postulate already records this quantifier distinction.
Changing the target alone proves nothing, but it avoids importing an
unnecessary uniform maximum-gap problem. A sufficient lemma being as hard as
the final problem is not itself a refutation: the useful question is whether
it comes with independently justified input or merely renames the desired
conclusion.

## 4. A useful correction to the Liouville experiment's interpretation

[The earlier lambda ledger](attack-lambda-ledger.md) correctly proves that
signs become constant on survivors after full crystallization. Its off-depth
test, however, looked for unusually large pair covariance and a signal stronger
at shift 2 than at shifts 4, 6, and 8. Failure to find that anomaly does not
exclude the usefulness of proving decorrelation. All those fixed admissible
shifts have related prime-pair conjectures; a useful estimate need not be
unique to shift 2.

Here is an exact way to see which sign matters. Fix X sufficiently large,
`y = ceil((2X+2)^(1/3))`, and the openers `X<n<=2X` for which both members
have least prime factor greater than y. Each member has at most two prime
factors, with multiplicity. On this set define

`S=sum 1, A=sum lambda(n), B=sum lambda(n+2), C=sum lambda(n)lambda(n+2)`.

Then, exactly,

`4 [T(2X)-T(X)] = S-A-B+C`.

The identity follows by expanding `(1-lambda(n))(1-lambda(n+2))`: on this
restricted set its value is 4 precisely for a prime pair. All twin pairs in
the dyadic interval belong to the set for sufficiently large X.

If S>0, put `a=A/S`, `b=B/S`, and `cov=C/S-ab`. The prime-pair proportion is

`[(1-a)(1-b)+cov]/4`.

Consequently, sufficiently small negative covariance, together with controlled
marginals below 1, would help prove a positive count. A large exceptional
covariance is not required. The new script checks the identity on finite
intervals only; this is elementary bookkeeping, with no novelty claim.

**The unresolved obligations are all retained:** at this depth a useful lower
bound on S, bounds on a and b conditioned on *both* numbers surviving, and
the necessary covariance bound have not been established here. One-variable
rough-number marginals cannot simply replace those conditional marginals.
This identity is a diagnostic for evaluating a proposed estimate, not an
announced route through the wall. Do not repeat the old correlation sweep
under a new name.

## 5. Proposed campaign, in order

**First: repair the specification.** Apply the corrections above to the live
summaries and their downstream decisions, with the normal history record.
Replace blanket closures with their actual theorem hypotheses or measured
failure criteria. Preserve the many valid finite refutations. This is the
immediate prerequisite for sensible selection of the next mathematical task.

**Second: make the framework reproduce Chen on long intervals.** The benchmark
is a proved lower bound for primes p for which p+2 has at most two prime
factors, on the usual long counting range. Chen's theorem is stated and
developed in [Tao's lecture](https://terrytao.wordpress.com/2015/01/29/254a-supplement-5-the-linear-sieve-and-chens-theorem-optional/).
The repository already proposes this in
[bv-import-survey section 4](../../bv-import-survey.md); it is not a new idea
or a new theorem. What is missing is a completed derivation in the framework.

Retain the fold engine, but track the partner's prime-factor states and import
the actual lower-sieve and prime-distribution estimates. Use a whole long
interval, rather than demand that the theorem work separately between
consecutive prime squares. The latter was the extra obstruction in
[the bilinear transplant note](attack-bilinear-transplant.md), whose local
failure remains valid within its stated scope.

**Acceptance criterion:** a complete classical proof with every imported
hypothesis matched to the chosen sequence, and a small independent numerical
check of the identities. Relabelling the theorem as an anchored bias is not
completion. If the framework cannot carry this benchmark without loss, resolve
that before trying to surpass it.

**Third: specify one arithmetic estimate beyond that benchmark.** Choose the
actual non-negative sequence, comparison sequence, factor ranges, and
coefficients before selecting a theorem. Extract the signed sums over products
of two varying factors, with the fixed shift 2 still present. Write a
conditional implication from a stated error bound to an unbounded twin count.
Record the required error relative to the positive main term and whether the
estimate is needed at every scale or only infinitely often.

[Ford–Maynard's prime-producing sieve framework](https://arxiv.org/html/2407.14368v1)
is a suitable reference for this specification: it relates specified Type I
and Type II information to prime lower bounds and gives counterexamples in
parts of its parameter space. Its introduction was checked in this review;
the full paper was not audited. It is already cited in the transplant note.
It supplies a framework for pricing an estimate, not the missing estimate for
shifted primes.

**Acceptance criterion:** one precise unproved inequality, a checked theorem
that would consume it, and a proposed mechanism for proving it. If the input
is only a divisor-count bound already covered by a closed route, stop that
attempt. If the proposed estimate is just the twin count in disguise, label
the equivalence and do not count the rewriting as progress.

**Fourth: compute only to test that mechanism.** Use scales and controls fixed
before the run, include a parity-twisted comparison where applicable, and
preserve factor multiplicities. A success must support the error estimate the
proof actually needs. More G2 terms, prettier folds, a smaller fitted slope,
or a high-significance anomaly without a proof implication would not meet this
criterion. The variance-limit project can continue separately as a worthwhile
theorem project, with no claim that an ensemble limit forces origin occupancy.

The recommendation is to keep Primeoire as the exact language and laboratory,
while changing the next deliverable from another gap-growth conjecture to a
classical benchmark followed by one precisely priced arithmetic estimate.
There is no established estimate in this review that finishes the conjecture.

## 6. Reproduction and limits

Run from the repository root:

```sh
node research/qc.js --full
node research/qc/embed.js --check research/review-0905-validation.js
```

The full gate was run before these review artifacts were added. Afterwards,
the strict fast gate passed with zero findings, and the validator's code,
embedded output, and kernel-input hashes all passed `embed.js --check`. The
new validator was executed through the embed tool, so its output and kernel
input are hash-bound. Its independent mathematical content is the direct marking
comparison, the exhaustive CRT check, and the sign identity; none is a test of
the proposed future analytical estimates. No existing manuscript has been
silently promoted, withdrawn, or corrected by this review.
