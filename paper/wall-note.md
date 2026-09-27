# The wall: the five doors and the four faces, worked out

**Contributions to the 27 September revisions:** [Benjaminsen](https://solveathome.org/@Benjaminsen)
provided direction and publication authorization. Codex (AI assistant; exact
model variant not recorded) performed the meta-research, source checks and
edits in these two tasks. Original mathematical sources and earlier project
contributors retain their credit; the [contribution record](../research/RESEARCH-CONTRIBUTIONS-2026-09-27.md)
names the recorded accounts, AI models and revision links. This is not a
claim of sole research authorship by the publishing account.

**Parent: `paper/moire-primes.md` §7 (the doors) and §7A (the faces).** Those
two sections say what this note establishes and at what calibration; this note
gives the supporting calculations with their stated scope. This revision
repairs the five objections in the review of return #17; it does not certify
every retained source claim. The obstruction itself, the
parity problem, is stated in the parent and is not repeated here. Authors
cited below resolve against the parent's References where they appear there;
the ones that do not are listed in §3 with the record they were read at.
Draft under the house publication moratorium; do not circulate.

**How to read a door and a face.** Each door below is given in three parts with
the calibration of each stated separately, the *mechanism*, the *toll*, and
*where it stops*, and a toll always carries the levels it was measured or
certified at. A door is a route and never a result. Each face is a place where
the obstruction sits, priced in numbers that regenerate; the faces are not
disjoint from the doors, and the parent's §7A says which overlaps which.

---

## 1. The five doors

**Door 1, Legendre's budget (3ⁿ).** *Mechanism* (proven): the exact
inclusion–exclusion formula for the twin-slot count in any window has a
fair-share main term and 2·3ⁿ correction terms of error ≤ 1 each. *Toll*
(certified, with the cancellation measured beside it): ±1,062,882 against a
signal of 50 already at pₙ = 41, while the exact count hugs the main term to
within about 2 at each of the ten computed levels, pₙ = 7 through 41
(`research/03-legendre-error-budget.js`). *Where it stops* (proven for the
upper bound; the lower-bound half is the parity obstruction, stated in the
parent, not a theorem of this note): Brun's truncation of this formula proves
twins sparse, and no sieve truncation of it has brought the lower bound under
the budget (`research/removal-ledger.js`, header).

**Door 2, the Fourier budget (2ⁿ).** *Mechanism* (proven, verified against a
direct DFT at x = 7 and 11): the slot indicator's exponential sum factors over
the primes by CRT, so the whole spectrum is exactly computable. Smooth
conspiracies are spectrally dead, |F(1)| ~ 2ⁿ/P# (a class-level reading of
`research/attack-04-fourier-budget.js` that survives that file's retraction
below); at a frequency no natal prime divides, every local factor has modulus
at most 2, so a product of n such factors is bounded by 2ⁿ where Door 1's
budget is 3ⁿ, and the measured L₁ mass per support class is smaller still,
with the effective base at a fully generic frequency reading 1.165, 1.185,
1.195, 1.204 at x = 7, 11, 13, 17, converging toward 4/π from below. The
largest individual coefficients reach the full census N exactly, at the rigid
comb frequencies k = j·(W/30) with 5 | j, five of them (the script's reading
says four, its top-k list being capped at four; a direct DFT at x = 7 and 11
shows the fifth); the certified budget, however, is
carried by the diffuse cloud of frequencies that touch two or more primes, not
by those few structured modes, the largest single contributor to a sharp sum
being about 1 out of 60 at x = 17.

*Toll* (certified per prime, at x = 7, 11, 13, 17; the aggregation is what
fails): every certificate below was tested against the true sliding-window
deviation for every scour prime at its branch window length at each of the four
computed levels, with zero violations (the script's reading says every window
length; its code checks the one length it certifies at, and the uniform-in-length
Erdős–Turán bound is compared to the sup at x ≤ 13 only), and it exceeds that
true deviation by 1.7, 2.9, 4.7, 7.1 at x = 7, 11, 13, 17, growing about 1.6× per level because the certified
deviation scales like N^{0.4–0.5} while the true one grows like N^{0.2–0.26}.
Per prime the certificate is informative: at x = 17 the deviation
term stays below the main term N/q for every q ≤ 263, and at q = 19 it proves
gross(19) ≤ 1,685 against a true 1,563, a deterministic 8% cap on one prime's
overdraw.

*Where it stops* (measured certificates and the stated aggregation rule):
the tested certificates fail at all four computed levels. At x = 7, however,
the ideal per-window oracle has positive margin +2.1, while the implemented
certificate needs a deviation sum at most 6.6 and delivers 7.7. Sharper
certification could therefore change this finite sign; the experiment is not
an impossibility theorem for harmonic analysis. At x = 11 even the ideal
per-window oracle, inserted into this first-order per-prime sum, caps removals
at 117.3 against a census of 90. At x = 13 and 17 the gross strike totals
alone, 1,135 and 22,132, exceed the respective censuses 990 and 14,850, so even
zero-deviation bounds cannot certify survival through that sum. These are
obstructions to this first-order aggregation, which discards overlaps, not to
all harmonic methods. An overlap-sensitive replacement changes the method;
the classical inclusion–exclusion route meets Door 1's budget. The reported
crossing of Σ2/q between x = 11 and 13 is background for this diagnosis
(`research/NATAL-CAP-CAMPAIGN.md`, header), not a proof of a universal
harmonic obstruction (`research/natal-cap-02-fourier-budget.js`, reading 4).

*Retracted, and left visible.* Earlier drafts of this door read the certified
budget as growing like 2ⁿ and reported that it missed certifying the p = 11
zone by only 18%, on `research/attack-04-fourier-budget.js`. That file indexed
its local factors at k mod p and omitted the CRT twist y_p = (W/p)^{−1} mod p,
which moves pointwise |S| by up to N/2, so its class-level readings stand but
its "certified" column paired moduli with the wrong kernel values and was not a
certificate. The corrected computation above reverses the reading: the near
miss is 15% at x = 7 rather than 18% at x = 11, and at x = 11 the door is shut
by the oracle rather than by the quality of our bookkeeping.

**Door 3, the moment ceiling.** *Mechanism* (measured at p = 13, 17, 19,
with the moments exact): window counts are sub-Poisson at every computed
level, with kurtosis 2.5, 2.88, 2.89 at p = 13, 17, 19, and the exact moments
are available to certify against (`paper/moire-primes.md` §8, Paper III).
*Toll* (certified at p = 19): the best degree-4 certificate in the family
((t − a)(t − b))², found on a 0.05 grid, puts the empty-window probability at
1.62 × 10⁻⁴ there, 57× below Chebyshev's 9.27 × 10⁻³ (the script's own reading
says about 60×). *Where it stops* (heuristic; only degrees 2 and 4 were
computed): each two further moment degrees should multiply the conspiracy's
price by about 5μ, the script's estimate of μ²/Var, without ever reaching
zero; the one measured step, Cantelli to the searched degree-4 family, buys
45× to 59× against
5μ = 71 to 103 at the three levels (`research/attack-03-higher-moments.js`,
`research/attack-07-certificate-ceiling.js`). Parity survives every
polynomial certificate computed, at a cost that the estimate makes geometric.

**Door 4, the removal ledger (capacity and the union bound).** *Mechanism*
(proven, machine-verified): the primes that can strike inside a tile, **the
Scour**, which is the tile's own crystallized output re-scaled and turned
against itself (⋃ q × holes), are few but mass-capable, and 34 removers
suffice for all of T₁₃. *Toll* (measured at T₁₃ and T₃₁): their total capacity
*exceeds* the census, 1,699 kill events against 1,485 slots, and the overrun
is put at about 2 ln x by the script without a derivation, reaching 37,534
removers with Σ2/q = 2.52× the family at T₃₁ (both figures corrected in the
script's provenance block on 2026-08-20; earlier drafts carried ~37,000 and
2.66). *Where it stops* (proven, and it reverses before any limit is taken): the
scarcity route to infinitude, "they can't remove them all", is dead on the
numbers, in the way the 2025 sketch in this project's folder 17 hoped
otherwise (its step-6 `<FORMULA(PI#)>` placeholder is now filled, and its
step-7 inequality reverses). Salvation is **overlap credit**: 670 of T₁₃'s
1,699 strikes land on already-dead slots, forced by arithmetic, and
the independent residue-class model predicts census·∏(1−2/q) survivors.
At T₁₃ this model gives 456.4, compared with the actual anchored count 456;
the product is not an identity for that count. Growth of the model product
can be proved using Mertens' theorem. Transferring that growth to the actual
anchored survivors is the unproved step in this Hardy–Littlewood reading.
The union-bound route with overlap corrections
*is* Brun (1919), so this door and Door 1 are one classical object seen at two
truncation depths; the thin-band variant that arithmetically closes instead
requires a lower bound on an anchored window's slot count, which is the
equidistribution problem, the wall met at the entrance
(`research/removal-ledger.js`). House-blindness (`paper/moire-primes.md` §4)
closes the
family-restriction escape.

**Door 5, coverings and constructions.** *Mechanism* (proven for distinct
moduli; inferred for ours): "Can classes {0, −2 mod q}, primes q > x only,
cover a stretch?" is the covering-systems question. Hough (2015) and
Balister–Bollobás–Morris–Sahasrabudhe–Tiba (2022) proved that a covering
system of ℤ **with distinct moduli** cannot have all moduli large, and our
classes {0, −2 mod q} use each modulus twice, so neither theorem applies to
our object. The theorem that does is Klein–Koukoulopoulos–Lemieux (2024),
whose Theorem 3 bounds the smallest modulus of a covering system of
multiplicity s by exp(c·log²(s+1)/log log(s+2)) and so covers s = 2
explicitly, **with no numeric constant available at s = 2**. Read through KKL
the infinite version of the question goes the family's way. Our translation is
inferred rather than proven, and the gap in it is the one that matters: KKL
says a multiplicity-2 system cannot cover ℤ, and says nothing about covering a
finite interval, which is all a zone is.

*Toll* (proven for one class, measured over exact terms for two): with one
class per prime ≤ y the best known interval coverage
(Ford–Green–Konyagin–Maynard–Tao 2018) is about y·ln y times small factors;
with two classes per prime the only construction data in existence is Ziller
and Morack's exact optima to the 21st prime, and the free two-class quantity
h₂ over the 17 terms at x = 11 through 73 measures c·x·ln²x with **c not
constant**: the ratio runs 1.04 at x = 11 up to 1.95 at x = 73, so it must be
quoted with the level attached (`research/covering-dive.md` §Q4.2). The
constrained two-class data on x = 11 through 79 favor the finite-window
description 0.76·x·ln²x·lnln x over the tested pure c·x·ln²x form. The
2026-08-19 adversarial rider retains this ranking but withdraws the claim of
two independent instruments; the diagnostics share the same data and frame,
and the ranking changes with the fitted window. This does not exclude an
asymptotic growth shape. The coefficient is stated to two significant figures,
and the free h₂ quantity above is a different object
(`research/two-class-lower-bounds.md` §6;
`research/history/staging/redteam-2026-08-18.md` §1c–h). A transferred Kalmynin–Konyagin bound,
derived 2026-08-19 and not refereed, puts a construction one logarithm above
either. A zone requires p². So the adversary's best known weapons fall short
of a zone by about p/ln p with one class and by about p/ln²p with two (our
arithmetic from the two laws against p²; no source states the shortfall), and
the two-class figure is the one this paper needs. It rests on a measured
construction law rather than on a proven bound.

*Where it stops* (searched and not found, which is not a theorem): no
covering-systems result in print bounds the length of a finite interval
coverable by two classes per prime at any polynomial scale, and we looked. The
literature covers all of ℤ, or transfers an interval to ℤ at the exponential
threshold 2ⁿ, which is sharp in general and therefore vacuous at Jacobsthal
scale. A failure of the Twin Prime Conjecture requires a covering phenomenon
that no published method reaches (`research/covering-dive.md` §§Q3, Q4; `research/SEARCH-CONVENTIONS.md` §3; Paper IV
for the two-class construction data). That search was run in the
covering-systems convention rather than in ours.

**This door wants an expert read before it goes anywhere.** Its infinite half
now rests on a 2024 theorem whose constant at multiplicity 2 is not computed,
and its finite half on a measured construction law plus a search that came back
empty. Both statements are calibrated as stated and neither is a bound we
could hand a referee.

**What the raw data says about all five doors at once.** None of them is closed
by the statistics. The distribution data shows no cliff at "prime": requiring the smallest
factor of r+2 to exceed p^0.9 loses only 8% against true twins, and
Chen-flavored territory (factors > p^0.5) holds almost exactly 2.0× the twins
at each of the three computed levels, 1.96 at p = 499 and 1009 and 2.02 at
p = 3001 (ratios of the script's printed counts), the
linear sieve's parity factor visible in raw zone data
(`research/attack-09`). The wall exists only in what can be certified, never
in the statistics.

---

## 2. The four faces

**What the obstruction can and cannot be stated about.** Tao's general form of
the parity obstruction (blog post of 21 November 2014, read at source 2026-08-27,
`research/history/staging/lit-tao-parity.md`) is a test on a target property P
of k numbers: compute the Liouville sign patterns that no tuple satisfying P
realises, and ask whether the origin lies in their convex hull. The test runs on
P's *extension*, meaning which tuples satisfy it, and never on how P is written.
Two consequences fix where the obstruction sits on this programme, and they
point opposite ways. A property defined by congruences alone forbids no sign
pattern at all, because every reduced class carries numbers of both Liouville
signs, so the bare tile statement, G₂(x#) < x′² − 2, does not satisfy the
obstruction's hypothesis and no parity theorem names it. But the reduction to
the conjecture uses the tile only inside the zone, where an x-rough number is
prime, and there the property, with both coordinates bounded by the zone,
has as its extension the set of pairs of primes inside (x, x′²), a product
set in which the difference-2 relation lives in the linear forms and not in
the property, so the zone form carries the forbidden set of "both prime" and
the obstruction applies to it in full (the bound on both coordinates is
load-bearing: with one coordinate bounded the property is Tao's Example 2,
which he names as not obstructed; corrected 2026-09-04,
`research/history/staging/redteam-0904-r0-extension.md`). All of this is
conditional on Claim 1, which presumes Liouville pseudorandomness and is not a
theorem. The exemption is real and it is one step
narrower than it looks: it covers Door 5, which uses no sieve weight to
reweight, and it does not cover any route that proves the zone statement by
bounding sums against a non-negative sieve weight. Separately, the obstruction
is asymptotic in its mechanism and silent at every finite level, so no computed
level, neither the ten β values below nor any tile, is evidence about it in
either direction.

**Face 1: the anchored bias, where the whole conjecture now lives.** Fix a
level x and let W = x#. Let S(x) be the number of Natal@5 comb slots in the
tile that survive every scour prime at the anchored phase, meaning the phase
where every prime's strike classes sit at {0, −2} at once, which is the
arithmetic Scour itself. Put y = y(x), the largest prime at most √W, and
let E(x) be the independent residue-class mean

    E(x) = (2/30)·W·∏_{7≤p≤y(x)}(1 − 2/p).

Equivalently, E(x) is the natal census times the product over scour primes
x < q ≤ y of (1 − 2/q), with each prime's phase chosen independently and
uniformly. The **anchored bias** in the table is β(x) = S(x)/E(x). This is
the CRT product mean, not the mean S̄ of the W diagonal phases in Face 2.
For example, at x = 23 the reported values are S(0) = 597,475,
S̄ = 815,732.55 and E = S_CRT = 669,028.80: S(0)/S̄ = 0.7324 while
β = 0.8930 (`research/natal-cap-35-x-multiplicity.js`, OUTPUT @23;
the product formula is `paper/anchored-note.md` §6, whose earlier ensemble
description also needs this distinction).

Both sides are exactly computable, and we have computed ten of them, through
x = 41 at W = 3.04 × 10¹⁴, which is the last level this arithmetic reaches:

| x | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 | 37 | 41 |
|---|---|---|---|---|---|---|---|---|---|---|
| β | 1.156 | 1.146 | 1.009 | 0.955 | 0.926 | 0.893 | 0.875 | 0.863 | 0.853 | 0.846 |

Three results make this one number the wall's cleanest costume. First, a
theorem (proven): if liminf β > 0 then twin primes are infinite. The proof is
short, because E(x) → ∞ is Mertens and nothing more, survivors are twin primes
by an elementary argument, and S(x) is an integer. Second, a weaker sufficient
statement (proven): if S(x) ≥ 1 for infinitely many x, twin primes are
infinite. No density, no positivity, only non-annihilation infinitely often.
The measured margin at x = 41 is S = 256,725,962,834 against the needed 1. The
weakening is real as a logical requirement and it is not evidently a weakening
as a proof target: Tao's own reply to this exact question (2007 post, comment of
22 April 2022, read at source) is that the obstruction does not rule out a sieve
giving a non-uniform bound for infinitely many N but not all, while pricing such
a thing as "a very unusual species of sieve that does not resemble any existing
sieve", one that "would have to be sensitive to the fluctuations of the Liouville
function", and therefore "of comparable difficulty to the type of problem one is
trying to attack in the first place".
Third, and this is the boundary itself (the equivalence is proven; the
floor is the best constant in print, not a proven floor, and its pricing is
measured): Assumption A, the positivity of β, is Hardy-Littlewood-strength
input. Its sharp form, β → e^{2γ}/4 = 0.793055, is algebraically equivalent
to the Hardy-Littlewood asymptotic on the 11/17 comb; its weak form is a
positive-proportion lower bound of the kind a parity floor blocks for a
two-class sieve, and the block is quantified. **The floor must be read in the
sieve dimension the object sits in** (`research/history/staging/attack-lichtman-decomp.md`
§7, 2026-08-26, a staging note whose figures are not yet re-derived in an
embedded producer): this is a dimension-2, position-uniform problem, so the
operative floor is 8, the parity floor of Selberg's Λ² at κ = 2, which is
also the best constant in print that survives the position quantifier
(Riesel–Vaughan Lemma 5, read at source 2026-08-18); no κ = 2 extremal
example is in print, so 8 is best known rather than proven. Against the
constant 1.28 the weak form needs at x = 17 the margin is 8/1.28 = 6.25×. The number 2 is the dimension-1, whole-range figure,
reachable only through A = {p+2} plus equidistribution of primes in arithmetic
progressions, which is exactly the input not available uniformly in the
window's position; it remains a valid *a fortiori* lower bound and it is not
the figure this face is barred by. Earlier drafts quoted 2 here and so read the
route as barred by 1.56×, recoverable by a 22% improvement; that reading
used the wrong dimension and is withdrawn.

Three different 2s meet in this programme and they are not the same object. The
**parity factor 2** is Selberg's: a sieve upper bound is off by at least that
factor, equivalently only ⌈k/2⌉ of k linear forms can be forced prime by sieve
methods alone (Tao 2014, Claim 1 and the j ≥ k/2 + 1 corollary). That is the
dimension-1, whole-range figure of the paragraph above, and the operative floor
for this face is 8. The **sifting depth u = 2** is where a survivor of the sift
becomes a prime and where the κ = 1 lower-bound function vanishes. The **sieve
dimension κ = 2** is this object's two classes per prime, and it carries
β₂ = 4.26645, which is Face 4's coordinate and not this one's. None of the three
implies either of the others, the general obstruction speaks only to the first,
and Friedlander-Iwaniec's asymptotic sieve, the instrument that defeats the
first given a bilinear hypothesis, is stated at κ = 1, its hypothesis (1.9)
reading Σ_{p≤y} g(p) = log log y + c, so it is not an instrument this dimension
can pick up as published
(`research/history/staging/lit-tao-parity.md` §§1, 3.3).

We also know that the tool most likely to be reached for cannot work here.
**Measure-theoretic bounds provably cannot decide the anchored question**
(proven in part, measured in part): the rotation ensemble has W members and
the anchor is one of them, so a bound admitting an exceptional fraction ε
decides the anchor only if εW < 1, and our second-moment bound misses that
threshold by a factor of 81 at x = 19 with the gap growing like ln²W. **That
81 must never be quoted without its ensemble** (corrected 2026-08-27,
`research/history/staging/attack-multiplicity3.md` §0 Correction 2): the ε in it
is the window ensemble's and the cardinality is the diagonal rotation
ensemble's, so the pairing mixes two ensembles. Read self-consistently, each
ensemble against its own cardinality, the miss is larger in both readings: in
the window ensemble it is e^3025 at x = 19 rather than a factor of 81, and in
the rotation ensemble it is 1,682 at x = 17 against the 51.40 the mixed pairing
reports at that level. Both self-consistent readings strengthen this
paragraph's conclusion; neither weakens it. The
anchor is a diverging outlier of the ensemble it sits inside: its deviation
runs from z = +1.05 at x = 7 to z = −22,633 at x = 37, across the nine levels
where the ensemble variance is certified. Full development in
`paper/anchored-note.md`, whose §9 still prices the floor at 2 and is to be
brought to the dimension-2 reading above.

The ensemble half of this split is not only hard to transfer from, it is
provably irregular. Maier (1985) shows that primes in intervals of length
(log x)^λ with λ > 1 are not uniformly distributed, and our window width is
(ln W)², so every heuristic of the form "the zone behaves like a typical
window" is known to fail for the analogous prime statement at the analogous
scale (`paper/moire-primes.md` §9).

**Face 2: the overlap channel, where the survivor count is actually decided.**
The natural picture of the anchored tile is a fight between removal capacity
and census, and that picture is wrong in a way we can now state as a theorem.
Survivors are what the removers miss, and the misses are dominated by
**overlap credit**: strikes landing on already-dead slots, forced by
arithmetic. Reading the overlap credit as a fluctuating quantity gives the
X-channel, and the survivor fluctuation migrates into it as the level rises:
corr(X, S) = 0.48, 0.91, 0.99 at x = 11, 13, 17, and by x = 17 the strike
channel carries only 2.7% of Var(S), so 97% of the fluctuation is overlap
credit (measured, exact by full enumeration of all 2,310 / 30,030 / 510,510
rotations).

The **X-limitation theorem** (proven at x = 11, 13, 17 and 19, the levels where
the ensemble maximum of VR is enumerated, and at x = 23 through a per-level
alignment bound that needs no enumeration, `research/history/staging/attack-maxvr-uniform.md`,
2026-08-26; carrying content from 13 upward because x = 11 is already closed
outright below): strikes alone cannot annihilate the natal set at any
loudness. However adversarially the scour primes' strike
classes are placed, removal capacity is not the binding constraint, and
annihilation requires an overlap collapse of 8 to 15 standard deviations of X.
At x = 11 the question is closed outright, by capacity plus exhaustion. The
proof runs per level, from the strike-variance lemma plus the *enumerated*
ensemble maximum of VR, so its extension beyond the enumerated levels rests on
measured trends rather than on a theorem, and of the two trends one broke and
one held. Max VR is enumerated at four levels, 2.78, 2.35, 2.14, 2.293 at
x = 11, 13, 17, 19, the last over all 9,699,690 rotations, so it **falls and
then rises again** rather than staying on a trend. The driver S̄/√(K·V̄) keeps
growing, 3.12, 4.88, 9.75, 24.96. Because the per-level hypothesis is exactly
√(K·V̄·max VR) < S̄, computing the @19 driver proved the theorem at x = 19 as
well, with two orders of magnitude to spare: the squared-form margin runs ×3.5,
×10.1, ×44.4, ×271.7, and the alignment bound at x = 23 gives ×370.5 in its
own V̄-free form. What is still open is every level above 23: a bound on max
VR uniform in the level (the Loudness Ceiling Conjecture) and a lower bound on
S̄, neither of which is known. To compare this channel with Assumption A,
keep both the strike fluctuation and the different normalization. If T is the
total number of strikes with multiplicity and X the overlap credit, then
S = N − T + X and

    S(0) ≥ εE ⇔ [X̄ − X(0)] + [T(0) − T̄] ≤ S̄ − εE.

This is an algebraic identity, with bars denoting diagonal-phase means and
E the independent-class mean defined in Face 1. An overlap-only relative
bound requires additional control of T(0) − T̄ and S̄/E; it is not the same
statement by definition. The anchor's own credit crosses from surplus into deficit,
X(0)/X̄ = 1.4541, 0.9908, 0.9482, 0.9558, 0.9661 at the five exactly computed
levels x = 11, 13, 17, 19, 23, so the anchor moves from surplus at x = 11 into
deficit by x = 17, and then the fall stops: @19 and @23 both come back up. We
were wrong about this once. An earlier draft of this sentence read the three
levels then computed, 1.45, 0.991, 0.948, as a downward drift through the
crossing; it was written before the @19 row existed and called a trend from
three points. `natal-cap-35-x-multiplicity.js` prints 0.9558 at @19 and says
in its own header that the three-point reading breaks there, and its
2026-08-19 addendum prints 0.9661 at @23. With one turning point on five
points the channel supports a crossing, not a direction, and β continues to
fall through x = 23 (0.8930) while X(0)/X̄ does not.

Two things we believed, and killed, belong here. The anchored tile is
unusually quiet in its strike statistics, at rank 2 of 510,510 rotations at
x = 17, and we expected quiet to mean populated. It does not: corr(VR, S) ≈ 0.
The calm is real, its mechanism is now proven (the anchor's two strike classes
are mirror-adjacent and glue into a single cyclic window, which we call the
fused window and which is a different phenomenon from Holt's fusions of
adjacent gaps under the fold, `paper/moire-primes.md` §9), and it is irrelevant
to survival.
Separately, and **corrected 2026-08-27**: earlier drafts of this paragraph said
the overlap deficit lives in multiplicity m ≥ 3. **That is refuted**
(`research/history/staging/attack-multiplicity3.md` §0 Correction 1). The
evidence for it was indirect: at x = 17, in the diagonal strike ensemble, the
anchored pair statistic reads z = −0.30 against the X-channel's z = −2.71, from
which m ≥ 3 was inferred. Resolving the X-channel by cell instead of inferring
from the pair statistic reverses it: at x = 17 the anchored X-deficit sits in
the **m = 2 cell**, z = −2.68, and the m ≥ 3 cells carry z = −0.23. The pair
census B₂ = Σ_k C(k,2)n_k is dim because it *dilutes*, mixing the
signal-carrying k = 2 cell with high-k cells whose C(k,2) weights are large and
whose contribution is noise; its dimness is an artifact of the statistic, not a
location for the deficit. The corpus's own channel split already said this and
was read past: `natal-cap-39-triple-census.js` prints, at x = 17, X-gap =
−566.70 = (m = 2) −507.46 + (m ≥ 3) −59.24, putting the m ≥ 3 share at 10.5%.
The same script's later rows move that share to 23.5% at x = 19 and 81.1% at
x = 23 (X-gap −216,803.55 = (m = 2) −40,916.72 + (m ≥ 3) −175,886.83), which
it reads, as an inference and not a proof, as a marginal cofactor effect; so
the cell that carries the deficit migrates with the level and the z-scored
statement holds at x = 17 only. **Scope:** the cell attribution is a one-level
statement and must not be written as a trend. Of the three enumerable levels only x = 17 has a survivor deficit worth
attributing at all, z(S) = −2.49 at x = 17 against −0.16 at x = 13 and +1.83
at x = 11. What survives from the original paragraph is the weaker and still
useful reading: pair-based methods, which is most of the second-moment toolkit,
see this deficit dimly, and we have measured by how much
(`research/natal-cap-31-calm-vs-kill.md`). What does not survive is the
instruction to attack it at higher multiplicity.

This face also carries the campaign's best certified bounds. Against the
ensemble, a fourth-moment certificate (the optimal quadratic-square form on the
moments through 4, in the independent uniform-class ensemble) beats Chebyshev
by a factor of 513 at x = 13, computed exactly over 39,782,707,965 quadruples, and at x = 11, where
moments through order 6 are also exactly available, the optimal certificate on
moments 1 through 6 beats Chebyshev by 4,190 while the best degree-4
certificate beats it by 80 (proven, machine-verified). They bound the ensemble;
they do not reach the anchor, for the reason Face 1 gives.

**Face 3: certificate depth, where the price of blindness is measured.** The
Scour can be capped prime by prime, with hard upper bounds that are
*history-blind*: they depend only on the level, the prime, and which primes
marched earlier, never on where any earlier strike landed. Folding in K
freshness moduli gives a ladder of such caps, and K* is the least depth at
which the caps sum below the census, so that the pigeonhole forces survivors.
The depth parameter plays the role of Brun's depth in a graded sieve (Brun
1920), and the quantity the caps bound is Brun-sieve territory. This certifies
twin primes in a tile by counting alone, with no primality test and no strike
located: at x = 29 the certificate proves at least 31,327 twin pairs exist in
the tile (proven, machine-asserted at every rung), which is 0.25% of the
12,307,838 that are actually there. The floors are weak against the truth at
every certified level, and the point is the proof form rather than the
strength.

The measured escalation is K* = 0, 0, 2, 10, 27, 69 at x = 11 through 29, for
the moduli pool we used: the first 12 scour primes at x = 11 through 19 and the
first 192 at 23 and 29, ascending in both cases. A different pool or ordering
could shift K*, while any pool yields valid caps. It is sub-linear in the scour,
and it tracks the quarter-power band π(W^{1/4}) − π(x) times a factor reading
1.00, 1.25, 1.29, 1.35 at x = 17 through 29. Whether that factor converges,
plausibly near 1.4, is open: four ratios on six K* points are not a law. We reversed ourselves
twice on this
face and both reversals stand in the record. We first read the K* growth as
the wall's fingerprint; it is not, since K* grows strictly slower than the
scour. We then read the vanishing ratio of certified floor to true survivor
count as a collapse of certificate efficiency; that was an artifact of looking
only at the crossing point. At fixed relative depth the efficiency *improves*
with level, monotonically at every tested depth beyond 5% of the scour on the three
levels x = 17, 19, 23 that script compares (`research/natal-cap-24-boundK-curve.js`
reading 5; the staircase note and cap-11 put the threshold at 3%).

What the face actually says is quieter and harder. The ladder's limit is the
march itself: cap_∞ equals removals plus the self-strike allowance. Every rung
buys back one modulus of a Mertens product, so the technology certifies more
and more of the truth at any fixed level and certifies nothing about
infinitude at any depth. The price of history-blindness is finite, measured,
and paid per level forever.

**Face 4: the exponent, the only face with a defined finish line.** The Gap
Reformulation states the conjecture as a bound on the two-class Jacobsthal
exponent: an exponent below 2 proves the Twin Prime Conjecture outright. Our
published-grade bound is 4.2665 (Paper II), an application of existing dimension-two sieve machinery, with
priority unestablished, so the open band is (2, 4.2665]. No published bound of any kind (searched as tabled in `research/SEARCH-CONVENTIONS.md` §3),
conditional or unconditional, sits inside that band, and we searched for one.
What does sit inside it is the κ = 2 sifting limit itself, and **the
defensible statement of its status is weaker than earlier drafts of this face claimed**
(flagged 2026-08-26 in `research/history/staging/attack-lichtman-decomp.md` §8,
applied 2026-09-04 per `redteam-0904-sifting-limit.md`).
β₂ = 4.26645 is an **upper bound on the sifting limit that the DHR dimension-2
sieve attains**, the exponent our own theorem sits behind. It is **not** a
proven lower bound on what the sieve axioms permit, and no lower bound on β(2)
above 2 is known. Lower bounds below and at 2 are in print or immediate from
what is in print (found 2026-09-04 by searching Selberg's reciprocal convention,
`research/history/staging/recon-0904-sifting-limit-floor.md`, red-teamed in
`redteam-0904-sifting-limit.md`): Selberg's *Lectures* §17 in his convention
a_k = 1/β_κ (Ford, *Sieve Methods* 2023, p. 37: "Some authors, e.g. Selberg,
refer to 1/β(κ) as the sieve limit"), Brady 2017's Theorem 22 evaluated at
κ = 2 giving β₂ ≥ 3e^{−1/2} = 1.8196, and β(2) ≥ β(1) = 2 because Ford's
dimension axiom (Ω) is one-sided, so Selberg's κ = 1 extremal example is itself
a legal dimension-2 problem. The exact value β(κ) is unknown in all cases
κ > 1/2 except κ = 1 (Ford 2023, quoted at source in
`research/sift-limit-attack.md` §2), a κ = 2 extremal example is not known
(Halberstam, *Bull. AMS* 40 (2003) p. 117: such examples at κ ≠ 1/2, 1 "are
not known and greatly to be desired"), and `research/OUTCOMES.md` (row of
2026-08-18) refutes the earlier "floor at 4" reading and records only that no
κ = 2 limit below 4.2665 has been exhibited. So the
correct reading of this face is that closing the band plausibly means consuming
structure the axioms discard, and that no barrier theorem in the corpus or in
print says an axiom-only argument cannot do better inside the band. The
corpus's own level-D linear programme does return an exact barrier at finite
levels for a fixed profile, certified in rational arithmetic at x = 7, κ = 2,
D = 21 (`research/history/staging/redteam-0904-sifting-limit.md` §4.1), and
turning that into an exponent needs two choices the axioms do not make, so
its calibrated reading of 3.3152 (`recon-0828-sieve.md` §5, whose own word
"floor" the 2026-09-04 red team withdrew) is not a floor on the class and
must not be quoted as one: a legal profile inside the classical
budget reads 5.0113 calibrated, above β₂, and the definitional route reads
3.9487 at x = 43 and is still climbing toward 4.26645. What can be said is
that no axiom-only argument has been exhibited anywhere inside the band. **The
programme's one barrier statement sits below the band** (2026-08-28,
`research/history/staging/attack-barrier-kappa2.md`, held pending an
adversarial pass): under a Siegel-zero hypothesis strictly stronger than the
one Granville's Corollary 1 needs, and which itself implies the conjecture
(Heath-Brown 1983), two-class interval problems attain the dimension-2 sieve
bounds up to u = 2, so β_interval(2) ≥ 2 conditionally; the construction pays
the two-class axioms in full and dies above u = 2 at its sifted count, on a
Chowla-strength correlation that is relocated rather than removed, which is
where the band begins. **Inside (2, 4.2665] there is still no barrier result.** Saying otherwise would be a lower-bound claim
with no lower-bound source.

The campaign's strategic finding on this face is an analysis of the method
rather than a theorem, and we mark it as such: **the entire distance from
4.2665 to 2 is a positivity problem and zero percent a distribution problem.**
Distribution hypotheses, meaning the Elliott-Halberstam conjecture, the
Generalized Riemann Hypothesis, and bilinear inputs, enter the dimension-2
sieve at one of its five discard points, and the primorial formulation
already saturates that point; the saturation is a constraint and not a gift
(`research/sift-limit-attack.md`, 2026-08-18 rider). A perfect distribution
oracle moves the exponent by nothing. Our own exact structure, the correlation function, the sub-Poisson window variance, the mod-30 rigidity, the mirror, and the fusion identity, is
quotiented away at the first discard point, where the sieve reduces the set to
divisor counts.

One road remains visible. The Brüdern-Fouvry vector sieve consumes the product
structure the current bound throws away, and its unconditional coupled form
gives 2(1 + √e) = 5.297, worse than what we have, which is one reason it has
not been used on this problem (Brüdern and Fouvry's own introduction compares
their θ(κ) → 0.2406 favourably against the DHR κ = 2 route in *their* setting,
so we claim only that the coupled form does not beat 4.2665 for G₂, not that
the literature had no use for the sieve). It is missing signed cancellation of
the bilinear interval sawtooth remainder, uniform in position, which we call
Lemma V: the two-dimensional analog of Iwaniec's 1980 linear-sieve error term.
One qualification is essential and we state it in place. At the working point
our own ladder measures, the component level exceeds the window, s/u = 1.62–1.72,
which is outside the range s ≤ u that Lemma V is stated in (at the β₂ target
itself, s/u = 3/u lies in (0.703, 1), inside the range: 2026-08-20 scope rider).
So what the conditional rows of that ladder assume is not Lemma V but a Gaussian
maximal law for the sawtooth, and that maximal inequality, not Lemma V, is the
whole price of the route (`research/sift-limit-attack.md` §§3, 4.5;
`research/theta-ladder.md`). The payoff scale is worth stating precisely. Any
partial decoupling past
θ_total = 1.2090 beats 4.2665, and full decoupling gives 1 + √e ≈ 2.649, which removes about 71% of the open band. A pilot computation with real Rosser weights
finds the decoupled certificate positive at every one of the 9,699,690
positions of the p < 20 period, with measured cancellation exponent 0.23 to
0.33 against 1.0 for absolute values (verified, at toy scale, and stated as
such: `research/sift-limit-attack.md`).

The price is what makes this an exponent programme rather than a road to the
conjecture, and it is the maximal law itself: the sharp Gaussian maximal law
for the sawtooth is TPC-implying, so no weak form of it is both soft-provable
and sufficient. The certificate's own requirement, measured self-consistently
by exhaustive full-period walks, sits inside the zone budget at every
exactly-measured level (need/z² = 0.3550 to 0.6119 at z = 13..31, all exact)
and leaves it between z = 31 and z = 47; at z = 29 the certificate is
positive at every one of the 223,092,870 positions of the 23# period at
H = 0.46 z² (`research/theta-ladder.md`).

What the four faces have in common, and the sense in which they are one wall,
is in the parent's §7A.

---

## 3. References not in the parent

Each entry names the project record it was read at; "read at source" is that
record's claim, not a second reading here. Where the record carries no locator
the entry says so.

Brady, Z. *Sieves and iteration rules.* Stanford PhD thesis (2017), purl.stanford.edu/gk881hk9239, Theorem 22; evaluated at κ = 2 in `research/history/staging/recon-0904-sifting-limit-floor.md`, confirmed by `redteam-0904-sifting-limit.md` (`research/SEARCH-CONVENTIONS.md` §4 row).
Brüdern, J.; Fouvry, É. Compositio Math. 102 (1996) 337–355 (numdam), the vector sieve and its 0.2406 comparison; read in `research/sift-limit-attack.md` §4.5.
Ford, K. Sieve-methods course notes (2023), p. 37 and the β(κ) statement; quoted in `research/sift-limit-attack.md` §2 and `recon-0904-sifting-limit-floor.md`.
Friedlander, J.; Iwaniec, H. *Asymptotic sieve for primes.* Ann. of Math. 148 (1998), hypothesis (1.9); read in `research/history/staging/lit-tao-parity.md` §3.3.
Halberstam, H. Bull. Amer. Math. Soc. 40 (2003), p. 117; quoted in `research/sift-limit-attack.md` (page corrected from 116 by the 2026-09-04 red team).
Heath-Brown, D. R. (1983), Siegel zeros and twin primes; cited through `research/history/staging/attack-barrier-kappa2.md`, and marked "citation unverified at source" in `research/OUTCOMES.md`.
Iwaniec, H. Acta Arith. 37 (1980) 307–320, the error term in the linear sieve; the κ = 1 precedent for Lemma V in `research/sift-limit-attack.md`.
Kalmynin, A.; Konyagin, S. *A polynomial analogue of Jacobsthal function.* arXiv:2302.00459; Izv. Math. 88:2 (2024) 225–235; the transferred two-class bound in `research/covering-dive.md` (2026-08-19, not refereed), full treatment in `paper/kk-lower-bound.md`.
Riesel, H.; Vaughan, R. C. Ark. Mat. 21 (1983) 45–74, Lemma 5; read at source 2026-08-18 per `research/natal-cap-10-sieve-cap.md` §1.4 and `research/history/staging/attack-lichtman-decomp.md` §2.2.
Selberg, A. *Lectures on Sieves.* Collected Papers II (Springer 1991), §17; the convention a_κ = 1/β_κ read in `recon-0904-sifting-limit-floor.md`, through Franze's account per `research/SEARCH-CONVENTIONS.md`.
Tao, T. *A general parity problem obstruction.* Blog post, 21 November 2014; read at source 2026-08-27 in `research/history/staging/lit-tao-parity.md`. Tao's 2007 post is in the parent; the comment of 22 April 2022 on it is read in the same note.
Ziller and Morack are in the parent; the h₂ terms used in Door 5 are OEIS A288815 (21 terms, keyword hard).
