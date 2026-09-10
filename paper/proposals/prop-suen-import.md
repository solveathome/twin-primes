# Proposal: the correlation-inequality import, and the wall it addresses

**Grade: PROPOSAL** · reviewed 2026-09-06 (scope corrections in §§1–2; grade held) · registry: [PROPOSALS.md](PROPOSALS.md)

*Staging-layer. The record's own correction queue is labelled proposed rather
than applied, and only one of its five items has since been applied. A draft
starts by working that queue, because two of the unapplied items are corrections
to `paper/anchored-note.md`.*

## 1. Claim

**The dependency structure is a perfect matching, and that is a theorem about
the object rather than a modelling choice.** Take the product measure that puts
the comb membership and the scour residues together: it is exact, PROVEN in one
line of CRT, because the natal condition lives modulo x# and every scour prime
is coprime to it. Under it, two bad events are dependent when they share a
prime and never when they share a slot, so the dependency graph on the 2K bad
events is a perfect matching of maximum degree 1, and every edge is a mutual
exclusion because a prime above 2 cannot divide both r and r+2. Janson's Δ is
therefore exactly zero, at every level, VERIFIED at seven levels @11 through
@31.

**Janson does not apply, and the reason is structural rather than numerical.**
His inequality is stated for increasing events, and its lower half is the
Harris and FKG direction, which is false here: two disjoint nonempty increasing
events cannot exist in a finite product lattice, because two nonempty up-sets
always share the top element. So no choice of ground set puts the two strike
orientations into Janson form. PROVEN, one line, and it is the sort of
statement that saves a reader a week.

**The identity (1 + δ)(1 + F) = 1 + ρ**, algebraic, with no hypotheses beyond
the definitions and an identity-check column that holds at all seven levels. It
splits the anchored deviation cleanly: F is exactly the product-measure part,
the forced scale, and ρ is exactly everything else, which is the failure of the
tile to equidistribute modulo the product of the scour primes. Under
Hardy-Littlewood ρ vanishes and δ tends to minus the forced scale with no free
constant. VERIFIED, and INFERRED for the limit.

**The sign flip resolves without a mechanism.** δ = ρ − F to second order, a
difference of two positives of the same order, with F smooth and decreasing and
ρ an error term, so the sign of δ is the sign of ρ − F and the flip at @19 is ρ
crossing F for the second time. MEASURED. Two corrections come attached and both
matter more than the resolution. The ratio ρ/F is not bounded by 1, reaching
2.001 at @11 and 1.266 at @19, so bounding δ by the forced scale is false as
stated at 2 of 7 levels. The target's strength must also be explicit: since 1 + δ is an
identity in the counts and the two one-sided counts are positive, δ > −1 is
exactly S(0) > 0, so any bound |δ| ≤ c with any c < 1 at infinitely many levels
proves the twin prime conjecture. The other side is free from the dimension-2
upper-bound sieve. The required positive lower bound remains open. Its
twin-prime strength does not refute it as a research target; a proof would
need an independent arithmetic input, not the same positivity restated.

**The wall has an address, with a corrected premise.** Drawing a sparse
dependency graph from approximate pairwise distribution does not give a
valid local-lemma hypothesis. Even in the uniform-interval model, exact CRT
distribution modulo pq requires pq to divide the interval's integer length;
H ≥ x² alone does not make the graph empty. This correction is already
derived in `research/history/staging/import-shearer.md`'s opening review
and is now carried here. There is also a separate quantifier problem:
lopsidependency asks for the conditional bound over every subset of
non-neighbours. A proof based on full CRT independence would need joint
distribution for that subset, not just its pairs; a full product can be
primorial-sized rather than quadratic. This does not prove that such
equidistribution is necessary for every alternative conditional bound,
or identify the cost with the dimension-2 sieve exponent. Two companions
sharpen it, and the first was **CORRECTED at the thirty-fourth pass**: on the
complete dependency graph **Shearer's EXACT criterion IS the union bound**
(Scott–Sokal, arXiv:cond-mat/0309352v2, Example 3.1), so the wall sits at
**x = 13 as an identity** rather than as one more arrival at it. The x = 7
figure was the SUFFICIENT asymmetric local lemma only, and its "earlier than the
covering-economy arrival at x = 13" rider was wrong twice — wrong about which
criterion was being read, and wrong to score a sufficient condition against an
exact one (`research/history/staging/import-shearer.md`). The admissible repair is
Bonferroni truncation, which is Brun's pure sieve, landing at an exponent that
grows like lnln x and crossing the dimension-2 sifting limit for good.

**The earlier novelty search remains limited.** The searches summarized in
§4 do not establish absence of this family from the sieve literature;
the same section records arithmetic near-misses and an invalid internal
search expression. No novelty claim follows from them.

## 2. Status grade

PROPOSAL. Two of the five parts are strong enough on their own: the perfect
matching with the structural inapplicability of Janson is a clean negative
result about which tool fits, and the identity plus the escalation is the kind
of finding that stops a research programme wasting a month. The wall's address
is finished in the closing direction, though not in the constructive one. The
graph-and-marginal interface on a complete graph has exactly Shearer's
union-bound threshold. The separately inspected resampling and variable-model
interfaces have the additional hypotheses priced in
`research/history/staging/import-shearer.md` §8. That record explicitly says
the atomicity hypothesis was not established and corrects that argument in
its opening review. These findings do not exclude all uses of extra
arithmetic information, alternative event representations or new
conditional bounds. The perfect matching describes the product ensemble,
not the distribution on the anchored short interval.
What remains missing is a valid anchored conditional bound that would
imply nonannihilation. No exponent improvement is derived here.

What holds the grade down is that the load-bearing step of the Suen calculation,
taking the dependency graph complete on the anchored measure, is asserted rather
than proved, and everything that makes Suen come out vacuous flows from it. The
margin is enormous, so the conclusion very likely survives, but the record's
own strongest sentence about it does not. The absence claim's instrument is also
weaker than the record thinks, which §4 states.

**Scored at the thirty-fourth pass, 2026-08-19, and the grade does not move.**
Rows 3 and 10 of `research/IMPORT-MAP.md` LANDED with the route CLOSED, which
settles two of this proposal's sentences against it (§1's x = 7 arrival and §2's
"least finished") and settles the wall's address in its favour as an identity.
Neither direction is a grade event by this proposal's own triggers: what holds
the grade at PROPOSAL is the unproved completeness step, and the thirty-fourth
pass makes that step *forced* given the frame rather than proved from it. Grade
stays **PROPOSAL**.

## 3. Evidence

| what | where |
|---|---|
| the whole import, twelve sections | `research/history/staging/import-suen.md` |
| the producer, seven levels @11 to @31 | `research/import-suen-01-transfer.js` |
| the closed target, one line with its mechanism | `research/OUTCOMES.md` |
| the anchored objects the deviation is measured against | `paper/anchored-note.md` §1, §7 |
| what BV is, what it buys, and what it does not | `research/bv-import-survey.md` §3, §5, §7 |
| the covering economy and the sixth Mertens arrival, for comparison | `research/sift-limit-attack.md` §7 |
| the dimension-2 sifting limit and its citation discipline | `research/SEARCH-CONVENTIONS.md` §4 |

The producer runs in 576 seconds and carries an embedded OUTPUT block. Its
header records the trap that shaped the instrument: having no strike from any
scour prime is not the same as being prime, because a natal prime below the
scour depth is itself a scour prime and kills its own slot. Omitting that clause
returned a count 4% wrong at @11, and the error was invisible to every ratio in
the report. Any reimplementation starts there.

Three residuals sit in the record's own list. The run stops at @31 and the
instrument is superlinear in the tile, so the next level costs about 37 times as
much, and the δ series is two levels short of the anchored note's ten. The
upper-bound constant on the free side is asserted from the shape of the
dimension-2 sieve and not computed through this corpus's comb normalisation. And
the pair expectations in the Suen table use product-measure values where the
true anchored pair correlations differ by percents, which the producer records
and the record does not.

## 4. Prior-art risk

The novelty flag is narrower than it reads, and its instrument is weaker than
the record thinks. Two problems, both worth carrying rather than fixing
quietly. The repository-internal negative was produced by a grep whose alternation was
written in basic rather than extended syntax, so as recorded it searched for one
literal string and could never match. Re-running it correctly gives the same
answer, but the recorded instrument does not establish it. And the literature
half does not satisfy this corpus's own rule: `research/SEARCH-CONVENTIONS.md`
§1 has no row for the probabilistic-combinatorics owning convention, so the
paragraph carrying the ABSENT tag names no convention and the search was run
against the target literature rather than against the family's own. That flag
survives only because the staging layer is outside the gate's body scan. Moving
it into any live document or paper file will trip `search-convention` until the
convention row is written, and writing that row is the first job of a draft.

**The channel was narrow.** Five arXiv full texts and one abstract search, with
no MathSciNet or zbMATH sweep even though `research/SEARCH-CONVENTIONS.md` §5
documents both as working with their gotchas, no reverse-citation walk from
Janson's 1998 paper, and no search of the covering-systems literature, which is
precisely where the local lemma did land.

**Three near-misses are already on record and they cut the claim down.** Hough's
2015 Annals solution of the minimum-modulus problem uses a relative local lemma,
and the follow-up removed it again. Filaseta, Ford, Konyagin, Pomerance and Yu
wrote a Suen-shaped lemma in 2007 without the name, correcting independence by a
sum over non-coprime pairs, and their referee noted the resemblance in print.
That is the same group this corpus already tracks. Peres and Schlag imported the
family into a different arithmetic setting in 2010 and needed a bespoke variant
rather than a citation. So the shape of this import is already in the corpus's
own prior-art file under another name.

**One source was not read where it is turned on.** The lopsidependency statement
that §5's whole wall argument leans on comes from three concordant secondary
sources rather than from Erdős and Spencer's 1991 paper, which is paywalled and
has no open copy.

The standing assumption in this registry is that prior art exists for more of
the corpus than has been found, and that the burden is on us to look again.

**Verified 2026-08-19, officer pass.** Both citation graphs were walked — 97
citing works on OpenAlex, 99 on Semantic Scholar — with zero applications to
coprimality or the Jacobsthal function found, and the 2026 LLL survey
(arXiv:2603.07245) lists no number-theoretic application at all. One near-miss
joined the record: Peres–Yang, arXiv:2606.28860, citing Janson 1998 for a
maximal-gap problem, nearer than Peres–Schlag. NOVEL-SO-FAR is the officer's
verdict, the safest in the registry
(`research/history/staging/proposals-prior-art.md`).

## 5. Upgrade and downgrade triggers

**Upgrade to QUICK-DRAFT** when the owning-convention row for the
probabilistic-combinatorics family is written into
`research/SEARCH-CONVENTIONS.md` §1 and searched there, since the novelty flag
is currently the weakest load-bearing part of the package and it is cheap to
fix.

**Upgrade to QUICK-DRAFT** if the complete-graph step is replaced by a proof, or
by the minimal admissible superdependency digraph computed rather than assumed.
That is the one gap between an assertion and a theorem in the wall section.

**The `e^{2γ}/4` trigger, tracked here because this record raised it.** The
record's §7 argues that π_L and π_R each tend to e^γ/2 unconditionally, by a
dimension-1 sieve of the primes by the primes with Bombieri and Vinogradov
supplying the level of distribution and the fundamental lemma supplying the
error, so the whole conjectural content of the anchored note's sharp form is
ρ → 0 and the constant is not part of it. That would move
`paper/anchored-note.md` §7's sharp form from conjectured to
INFERRED-unconditional and narrow the note's blanket statement that the law's
constants are conditional. **It is a sketch, not a written proof.** Upgrade this
proposal, and regrade `prop-anchored-note.md` with it, when three things are
done: the assembly is written out to referee grade with the divisor-weight
absorption explicit and the fundamental lemma's hypotheses checked against the
actual sequence, it is reconciled with the comb normalisation of
`paper/anchored-note.md` §1, and a script verifies it.
`research/bv-import-survey.md` §6 already names this class of assembly as the
one long enough to hide an error, and asks for a referee-grade writeup before it
is claimed in any paper file. Its §5 table has no row for this object at all.

**Downgrade to WEAKENED** if the pre-registered prediction fails: ρ/F has fallen
at four consecutive levels, so δ should stay negative at @37 and @41 and
approach minus the forced scale. A positive δ at either level falsifies it.

**Downgrade to WEAKENED** if the Brun-pure-sieve identification is not
reconciled with `research/sift-limit-attack.md` §7. The two records currently
give different crossing points for what is claimed to be the same object, and
the identification is only INFERRED.

**Retire the wall section** if the quantifier diagnosis turns out to be wrong,
which would show up as an exhibited subset witnessing the failure behaving
differently from the account given. No such witness has been exhibited in either
direction.

## 6. What a referee would attack

- **The absence claim, at both ends.** The recorded internal instrument cannot
  match what it says it searched for, the literature search was run against this
  corpus's target papers rather than against the family's own convention, and
  the corpus's own gate would reject the paragraph as it stands. A referee who
  reads the near-misses will also note that the local lemma is already in
  adjacent number theory and that the Suen shape is already in the prior-art
  file under another name.
- **The complete graph is asserted where it is load-bearing.** The
  justification given is about large subsets failing to equidistribute, while a
  dependency graph is a pairwise object, and for pairs whose product is well
  below the tile width the residues are very nearly independent. The right
  object is a superdependency digraph and its minimal admissible form was not
  computed. The vacuity margin is huge, so the conclusion likely holds, but the
  sentence claiming this is not a modelling choice does not.
- **The one place the new cartography is checked against the corpus disagrees
  with it.** The Brun-pure exponents in this record and in
  `research/sift-limit-attack.md` §7 differ with the sign of the discrepancy
  flipping across the range, so it is not an accounting offset, and the two
  files give different levels for the crossing of the dimension-2 limit. A
  referee who checks one number against the other finds this immediately.
