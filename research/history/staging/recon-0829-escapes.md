# The three killers as obstruction shapes, and where each shape has been beaten in print

<!-- ledger
id: Q-recon-0829-escapes
status: ANSWERED
todo: 0
question: Each of the three killers is an obstruction shape that occurs elsewhere in mathematics; where has each shape been beaten in print, by what mechanism, under what hypothesis, and does that hypothesis hold for the tile and zone objects?
verdict: Of nineteen escapes read, fourteen fail a hypothesis check (twelve on a fact already in this corpus), four fail some other way and one (the decoupled vector sieve) stays OPEN as the programme's existing road, so no route opens; Granville-Soundararajan's uncertainty principle is NOT killer 3 in print, is adverse-direction, and is already cited here twice.
-->

*(Staging note, 2026-08-29. HELD. Recon only: no script was run, no exponent
moves, no existing file is edited. Publication moratorium in force.)*

---

## 0. Verdict, disconfirming half first, with the base rate

**The disconfirming half, and it is the whole result.** Nineteen escapes were
read. Fourteen fail their hypothesis check outright, and in twelve of those
fourteen the fact they fail on was already in this corpus before the pass
started. Of the remaining five, one is OPEN and is the programme's own named
road (the decoupled vector sieve), one has no escape in print at all in either
direction (the `kappa = 2` band), one runs in the opposite direction and is
already banked (Erdos-Rankin), one is adverse-direction evidence already cited
twice here (Granville-Soundararajan), and one has a hypothesis that holds
trivially and a conclusion that is therefore empty (pretentious localisation).
Nothing here opens a route, moves an exponent, or produces a number. The pass is
a re-indexing of the wall in the literature's own vocabulary, and its honest
payoff is nineteen wall addresses with a named mechanism and a named failing
hypothesis, plus one name the corpus did not have (Hoheisel, absent from every
markdown file, checked by grep across `research/` and `paper/`).

**The base rate, stated as the brief requires.** About one hundred imports and
recon angles have run in this repository and every one closed. `REFUTED.md` carries 67 rows. `IMPORT-MAP.md` §1's calibration set records five landed
imports, none of which moved the exponent. The prior that this pass opens a
route is accordingly near zero, and nothing below is stated above OPEN.

**The one structural observation, at its lowest rung.** Five of the rows beat
their own killer in print and then land inside a different one: Chen's switching
principle and the bilinear remainder beat the dimension-2 cap and land on the
position quantifier; the Maynard-Tao weights beat the cap and land on the
quantifier; Iwaniec's every-interval bound beats the quantifier and lands on the
dimension; Maier's matrix beats the ensemble average and lands on the
quantifier. This is a pattern over nineteen rows, not a theorem, and it is not
novel here: `attack-wrongdirection-audit.md` §0 and `README.md` §Status already
record that the three killers were stated together because independent attacks
converged. [HEURISTIC, and novel to this note only in tabulated form.]

**The brief's one direct question, answered.** Granville and Soundararajan's
uncertainty principle is **not** killer 3 in print, and the corpus **already
cites it**, in two places. Their theorem asserts that every arithmetic sequence
is irregularly distributed *somewhere*, which is an existence statement over
intervals and progressions, at relative amplitude `1/u^{cu}`, two-sided
(`special-levels-recon.md` §1d, read at source). Killer 3 asserts that no
ensemble statement determines the value at the anchor. Those are different
statements, and the first does not prove the second. The direction is adverse
to this programme rather than helpful, and the corpus withdrew the companion
Corollary 1.4 as an obstruction because its `eta` is capped at `1/100`, firing
only past `log x >= (5e6)^200` (`REFUTED.md`; `maier-matrix.md` section 8).

**What is nevertheless worth carrying forward.** Two hypotheses did not fail,
and neither is new: the decoupled vector-sieve lemma (OPEN, already the
programme's named road, buys an exponent not TPC) and whether Pomykala's
`beta < 3` is essential (OPEN, priced below 2% by `recon-0828-sieve.md` section
4.3). Both are in section 7 with their circularity pre-checks written out.

---

## 1. Channel calibration

Calibrated before any negative was counted, per the campaign rule that a clean
negative in the wrong convention is the default failure mode
(`research/SEARCH-CONVENTIONS.md`).

| channel | what it can decide | what a negative from it means | used for |
|---|---|---|---|
| corpus grep, full-text over `research/`, `paper/` | whether a name is already priced here | a name absent is absent from THIS repo, not from the literature | prior-coverage check on all nineteen rows |
| corpus custody, artifacts read at source in an earlier pass | the hypothesis of a published theorem | nothing; a custody quote is as good as the pass that took it | Green-Tao complexity, Granville on Iwaniec, GS Cor 1.2, Pomykala review, Bettin-Chandee |
| arXiv abstract page, fetched this pass | title, authors, abstract wording | an abstract does not carry a theorem's hypotheses | GS `math/0406018` only |
| memory of standard results | the shape of a classical mechanism | a memory claim is not a source and is flagged MEMORY | Hoheisel's exponent, Linnik's `L`, the three Linnik principles |

**The standing compute rule applies** (`primeoire-campaign-lessons`, Chris,
2026-08-19): cite embedded artifacts, do not re-calculate. No script was run in
this pass, and every number below is quoted from a file that owns it.

**What this pass did not do.** No literature sweep in any owning convention was
run; the nineteen candidates are the brief's list plus Hoheisel, and the list is
not claimed to be complete. No PDF was opened. Three rows rest on MEMORY for
their numerals and say so.

---

## 2. The three killers restated as shapes, with coordinates

Restated as obstruction shapes so that an escape in another problem can be
matched to one. Grades are taken from `object-bridge-read-0829.md` section 4 and
are not re-derived here.

**K1, the class-blind cap. Shape: a method whose entire input is a count of
forbidden classes per modulus has a positivity threshold fixed by the count
alone, and the threshold is above the target.** Coordinates: the input is
`|A_d| = g(d)X + r_d` with `g(p) = 2/p`; the dimension is `kappa = 2`; the
threshold in print is `beta_2 = 4.26645` (Diamond-Halberstam 2008, unimproved,
`paper/beta2-note.md`); the target is exponent 2; the distance 2 enters the
proof only to certify there are two classes. **Grade: HEURISTIC with a PROVEN
number inside it.** What is proven is the bound and the closed search; what is
not proven is that no two-class-only argument goes below it, since `beta(kappa)`
is unknown for `kappa > 1/2` except `kappa = 1` and no `kappa = 2` extremal
example exists in print (`sift-limit-attack.md` section 2,
`SEARCH-CONVENTIONS.md` section 3: "the band is a proof gap, not a truth gap").

**K2, the quantifier. Shape: a theorem holding for almost all members of an
ensemble decides a prescribed member only if the exceptional count is below
one.** Coordinates: the ensemble has `W = x#` members, the anchor is one of
them, so an exceptional fraction `eps` decides the anchor only when `eps W < 1`,
i.e. `eps = e^{-(1+o(1))w}` and **not** any rate polynomial in `w`
(`anchored-note.md` section 3, Proposition 1 part (i), exact counting). **Grade:
this is the killer with a THEOREM in it.** The measured distance: the
second-moment bound gives `eps ~ ln^2 W / W`, measured `8.38e-6` at @19 against
the decision threshold `1.03e-7`, a factor 81 short and growing like `ln^2 W`.
One line generalises it: a single empty window contributes `(H P_y)^2 / X` to a
variance of size `M(H,y)`, so it sits below the error term of any variance
asymptotic by a factor growing with `X` (`recon-0828-rough.md` section 3.3).

**K3, equivariance. Shape: a statement quantified over a group that acts
transitively on the ensemble carries no information about any single orbit
point, because the group moves every point to every other.** Coordinates: the
rotation ensemble is `Z/W` acting simply transitively on phases, and the anchor
is the phase `t = 0`. Two components are PROVEN. (a) The tile's transform on
`Z/W` **vanishes nowhere**: each local factor is `1 + e(2v/q)` up to a phase,
zero only when `4v = q (mod 2q)`, which parity forbids for odd `q`, so
`supp That = W` and the whole Donoho-Stark uncertainty family holds with maximum
slack (`recon-0828-farfields.md` section 2a, checked numerically at twelve
primes). (b) The dependency graph is **complete**, on which Shearer's exact
criterion is the union bound (`import-shearer.md` section 4). The operational
form the corpus settled on is not Fourier at all: an interval of length `L` is a
diagonal segment of `L` points in a CRT box of `x#` cells, and any theorem that
counts, covers or optimises over the box sees the segment only once `L`
approaches `x#` (`recon-0828-farfields.md` section 2b). **Grade: MEASURED
pattern with two PROVEN components**, and three tests at the anchor all null
(mirror symmetrisation gains exactly zero, the QR-immune classes deliver exactly
the guardrail, the anchored `delta` exceeds the forced scale at 2 of 7 levels).

**A coordinate the three share, and it is the one that makes the escapes
collide.** The corpus's target window has length about `x'^2`, which is about
`(ln x#)^2`. On the scale the short-interval literature measures in, where the
window is `X^theta` with `X = x#`, the corpus needs `theta = 0`. Every K2 escape
in print is stated at `theta` bounded away from zero. Section 4 quantifies this.

---

## 3. K1 escapes: beating a sieve dimension cap

Six escapes, each stated as mechanism, hypothesis, check, verdict, and labelled
(i) mechanism named in print, (ii) hypothesis identified, (iii) hypothesis
checked against a corpus fact.

### 3a. Bilinear and Type II information in the sieve remainder

**Mechanism (i).** Replace the axiom-only input `|A_d| = g(d)X + r_d`, whose
remainder is handled in absolute value, with a bilinear form
`sum_{m<M} sum_{n<N} a_m b_n r(A, mn)` that admits cancellation. Iwaniec's 1980
bilinear error term in the linear sieve (Acta Arith. 37, 307-320) is the
canonical instance, and Vinogradov's bilinear decomposition and Heath-Brown's
identity are the two standard ways of manufacturing such forms for the primes.
The escape is real: it is what raises the effective level of distribution past
what absolute-value accounting allows.

**Hypothesis (ii), two parts.** (a) The construction must exist at the sieve
dimension in question. (b) The bilinear cancellation must hold uniformly in the
window position, since the corpus's target quantifies over positions.

**Check (iii).** Part (a) fails at source. The **only** published construction
of a bilinear or trilinear remainder above dimension 1 is Pomykala, *On the
trilinear form of the R-term in the Rosser-Iwaniec sieve of dimension
kappa > 1*, Bull. Polish Acad. Sci. Math. 38 (1990) 167-171, and Greaves's
zbMATH review, read at the record and transcribed in `recon-0828-sieve.md`
section 4.1, states the constraint verbatim: *"The construction requires that the
sifting limit `beta` satisfies `beta > 2`, because the level of distribution
`Delta` is expressed as `Delta = MNK^{beta-2}`. There is also a more technical
requirement `beta < 3`, the need for which appears in the proof of a key
lemma."* Since the DHR ladder runs at about `2.44 kappa`, `beta < 3` confines
the construction to `kappa < 1.23` (`recon-0828-sieve.md` section 4.2,
ARITHMETIC). This programme's dimension is 2 and its `beta_2` is 4.26645, above
the constraint by a factor of 1.42 on `beta` alone.

Part (b) fails independently, and it fails with a number. A trilinear form for
the comb's remainder is a trilinear sum of sawtooths over a periodic set, which
is the Kloosterman-fraction object of `SEARCH-CONVENTIONS.md` section 1 row 34.
The position-uniform case is priced there: Bettin-Chandee's Remark 1 charges
`(1 + hx/MN)^{1/2}`, which is `O(1)` only for `x << H^{1.212157}`, while this
programme's `x` reaches `exp(H^{0.2344})` (`sift-limit-attack.md` section 4.5
row). The smooth-modulus branch is unavailable because well-factorability
supplies 1-bounded factors, not smooth ones (`smoothness-front.md`;
`REFUTED.md`).

**Verdict.** The hypothesis fails because the only published construction above
dimension 1 stops at `kappa < 1.23` against this object's `kappa = 2`, by a
constraint its own reviewer flags as needed for a key lemma, and because the
position-uniform bilinear estimate is short by the exponent comparison
`H^{1.212157}` against `exp(H^{0.2344})`. Both facts are already in the corpus.

### 3b. The Friedlander-Iwaniec asymptotic sieve for primes

**Mechanism (i).** The asymptotic sieve for primes produces an asymptotic count
of primes in a sequence, defeating the parity obstruction, for sequences that
supply a Type II bilinear estimate over a wide range of `M`. The in-print payoff
is `a^2 + b^4` (Friedlander-Iwaniec 1998), and the extra structure there is a
quadratic or quartic form, not a class count.

**Hypothesis (ii).** A Type II sum `sum_{m ~ M} sum_n a_m b_n` controlled for
`M` across a range like `[x^eps, x^{1/2-eps}]`, together with a well-behaved
density function. Friedlander and Iwaniec state in their own paper that the
twin-prime sequence does not supply it, which is why the method does not settle
twins. [MEMORY for the wording of their remark; the corpus does not carry the
sentence, and this pass did not open the paper.]

**Check (iii).** The corpus already prices the input side, and the price is
saturation rather than absence. `sift-limit-attack.md` section 3 records
"Trivial remainders at level `H^{1-eps}`, uniform in `x` (PROVEN,
`beta2-note` section 3)" against discard point DP4 with the verdict
*"saturated; blocks all conditional improvement"*. The tile's remainder for a
window is a sawtooth over a periodic set of period `x#`, and what makes it
trivially bounded is what leaves nothing for a Type II decomposition to cancel:
there is no multiplicative variable to split. Second, the conclusion FI delivers
is an asymptotic over a long range, not a bound at one window, so even granting
the hypothesis the output crosses into K2.

**Verdict.** The hypothesis fails because the object supplies no Type II range,
its remainder being already trivially bounded and position-uniform at level
`H^{1-eps}`, which the corpus records as saturated; and the conclusion would
carry the wrong quantifier in any case.

### 3c. The switching principle (Chen 1973)

**Mechanism (i), and this is a genuine K1 escape in print.** Chen's theorem
gives a positive lower bound for the count of `p` with `p + 2 = P_2`, a
positivity statement at a dimension-2 problem where the dimension-2 cap would
forbid it. It escapes the cap not by improving the sieve but by counting the bad
set from the other tooth, where it becomes a semiprime-slot count an upper sieve
can afford. In this repository's vocabulary that is a change of tooth on the
comb (`bv-import-survey.md` section 4, which writes the lenient Scour and states
Chen's theorem as a lower bound on the anchored bias of the lenient comb).

**Hypothesis (ii).** Two classical components: a lower-bound linear sieve on the
alive set, and Bombieri-Vinogradov equidistribution of primes in arithmetic
progressions over `[1, x]` for the switched count (`bv-import-survey.md`
sections 4, 3.2).

**Check (iii).** The BV input is not available uniformly in the window position.
`natal-cap-10-sieve-cap.md` section 1.4 states it flatly: *"Everything below 8 in
the table uses equidistribution of primes in APs (BV or beyond) over `[1, x]`,
those inputs are not available uniformly in the window position, so none of the
sub-8 constants transfer to a bound for `pi_2(x+l) - pi_2(x)` valid for all x"*
[INFERRED from the proofs' structure; standard]. The corpus's target is
position-uniform by construction, `G_2` being a maximum over positions. Second,
the conclusion is `P_2` rather than a prime pair, so the output does not reach
`Z_2` even if the input were available.

**Verdict.** The hypothesis fails on the position quantifier: an escape that
beats K1 by importing an input K3 forbids. This is one of the five collisions
section 0 records. The corpus already judges a tile-native Chen
feasible and worth doing as a demonstration, explicitly not as a strengthening
(`bv-import-survey.md` section 4, "it would not strengthen Chen").

### 3d. The vector sieve (Brudern-Fouvry 1996)

**Mechanism (i).** The two-class condition is a product of two one-class
conditions, and the vector sieve converts exactly that into two linear sieves,
through the pointwise inequality
`theta_1(r) theta_2(r+2) >= L1- L2+ + L1+ L2- - L1+ L2+`. It is the one asset in
`sift-limit-attack.md` section 3's discard table with a named consumer.

**Hypothesis (ii).** Decoupled component levels `D_1`, `D_2`. With the levels
coupled, absolute-value remainder accounting forces `D_1 D_2 <= H^{1-eps}`.

**Check (iii).** Coupled, the route lands at `2(1 + sqrt e) = 5.2974`, worse
than `beta_2 = 4.26645`, and `paper/wall-note.md` section 1 records that this is
why the route is absent from the problem's record. Decoupling needs one new
lemma: signed cancellation of the bilinear interval remainder, uniformly in
window position, the two-dimensional analogue of Iwaniec 1980. That is precisely
the lemma 3a shows is missing above dimension 1.

**Verdict.** The hypothesis is **OPEN, not failed**, and this row is carried to
section 7 with its circularity pre-check. Its price is already measured and is
not a route to the conjecture: `research/theta-ladder.md` measures the window
exponent at which the certificate is positive at every position, and the
requirement sits inside the zone budget at every exactly-measured level
(`need/z^2 = 0.3550..0.6119` at `z = 13..31`, all exact), which makes the route
an exponent-improvement programme (`paper/wall-note.md` section 1).

### 3e. Maynard-Tao multidimensional Selberg weights

**Mechanism (i).** Optimise over a multivariable weight `F` rather than a
one-variable `lambda`, and the bounded-gaps conclusion follows: at least 2 of
`k` admissible linear forms are prime for infinitely many `n`.

**Hypothesis (ii), read as what the conclusion is allowed to say.** The
mechanism buys positivity of a difference of two sums, and what it purchases is
the existence of **some** pair among `k` forms at **infinitely many** `n`. It
never forces a prescribed pair, and it never gives a statement at a prescribed
position.

**Check (iii).** The target here is `G_2(x#)`, a maximum over all positions of
`Z/x#`, and `Z_2`, a statement about one prescribed window.
`object-bridge-read-0829.md` section 4 records that K2 bites on every "almost
all intervals" import and that infinitely-many is already fatal, since the
anchor is one point at each level (`attack-wrongdirection-audit.md` section 1,
Axis B). Bounded gaps is already priced in `IMPORT-MAP.md` and in
`recon-0828-sieve.md`.

**Verdict.** The hypothesis fails on the conclusion's shape: a K1 escape whose
output is exactly the quantifier K2 forbids. Another collision.

### 3f. Sieve escapes at kappa > 1 in any problem, read for a floor

**Mechanism (i).** Across the literature the escapes available at dimension
above 1 deliver almost-primes: Iwaniec's `x^2 + 1` and the `P_r` results for
polynomials are the standard shape. None delivers positivity at the sifting
limit for a dimension-2 problem.

**Hypothesis (ii).** That a `kappa = 2` construction below `beta_2 = 4.26645`
exists at all.

**Check (iii).** `SEARCH-CONVENTIONS.md` section 3, searched in the owning
convention: *"Published `kappa = 2` extremal example, a set that blocks an
exponent in (2, 4.2665]? None found. The band is a proof gap, not a truth
gap."* Ford's notes, quoted in `sift-limit-attack.md` section 2: *"The exact
value of `beta(kappa)` is known only for `kappa` in `[0, 1/2]` union `{1}`."*

**Verdict.** No escape in print, and no barrier theorem either. This row does
not fail a hypothesis; it records that the band `(2, 4.26645]` is unoccupied in
both directions, which is what makes K1 a heuristic rather than a theorem.
[ABSENT-PER-CONVENTION, per `SEARCH-CONVENTIONS.md`.]

---

## 4. K2 escapes: almost-all to every

Seven escapes. The scale fact that decides most of them is stated once here and
pointed at afterwards.

**The scale fact, stated once.** Write `X = x#` for the tile's period. Every
almost-all-to-every theorem for primes in print is stated for windows of length
`H = X^theta` with `theta` bounded away from zero: Hoheisel's 1930 result at
`theta = 1 - 1/33000` [MEMORY for the numeral], Huxley's 1972 asymptotic at
`theta = 7/12 = 0.5833`, and the current record `theta = 17/30 = 0.5667`
(Guth-Maynard, arXiv:2405.20552; the corpus's own table at
`attack-bilinear-transplant.md`, row "single primes, asymptotic formula"). The
window this programme must decide has length about `x'^2`, and `ln X = theta(x)`
is about `x`, so the window is about `(ln X)^2`: **on the short-interval
literature's own scale the corpus needs `theta = 0`.** The gap between 0.5667
and 0 is not a constant to be improved; the zero-density mechanism produces
nothing at any polylogarithmic length, which is exactly the regime where
Granville-Soundararajan record that the Montgomery-Vaughan Gaussian heuristic
breaks for many highly composite `q` (`special-levels-recon.md` section 1d, at
source, GS preprint p. 4). [ARITHMETIC on corpus-held numerals; the reading is
the corpus's own diagonal-segment statement restated with a number.]

### 4a. Hoheisel and Huxley via zero density

**Mechanism (i).** Convert an almost-all-intervals statement for `pi(x+H)-pi(x)`
into an every-interval one by writing the count through the explicit formula
over zeros of `zeta` and controlling the exceptional zeros with a zero-density
estimate `N(sigma, T) << T^{A(1-sigma)} L^B`. This is the cleanest
almost-all-to-every upgrade in analytic number theory.

**Hypothesis (ii).** (a) The counted object is expressible by an explicit formula
over the zeros of an L-function. (b) The window length is a power of the main
variable, with the exponent above the zero-density threshold.

**Check (iii).** (a) fails outright: the tile's hole count in a window is a sum
of sawtooths over a periodic set on `Z/x#`, with no L-function attached, and the
corpus's target is a maximum over positions, which the explicit formula does not
deliver in any form. (b) fails by the scale fact above, between `theta = 0.5667`
and `theta = 0`.

**Verdict.** The hypothesis fails on both halves. **Novelty check: Hoheisel
appears in no file of this repository** (grep over `research/` and `paper/`,
this pass), and Huxley appears only in three tables. The ROW is new here; the
FACT is the corpus's diagonal-segment statement (`recon-0828-farfields.md`
section 2b) restated with a number, so this is independent rediscovery inside
the corpus, not a discovery.

### 4b. Iwaniec's every-interval rough-number bound

**Mechanism (i).** The linear sieve applied with the trivial interval remainder
`|r(A,d)| <= 1`, which holds uniformly in `x`, gives an every-position lower
bound: `S(x,y,z) >= (4y/(log y)^2)(log(y/z^2) - O(1))` when `y >> z^2`, uniformly
in `x` (Granville, *Sieving intervals and Siegel zeros*, Acta Arith. 205 (2022)
p. 3, read at page image, `recon-0828-rough.md` section 2, attributing to Iwaniec
1978). Consequence in Granville's own words: `J(P(z)) << z^2`. This is a real
escape from the quantifier, and it is the strongest one in print for this object
class.

**Hypothesis (ii).** Sieve dimension `kappa = 1`, so that the lower-bound
function `f(u) = 2 e^gamma log(u-1)/u` is positive for `u > 2`.

**Check (iii).** Substituting `Omega_p = {a_p, a_p - 2}` moves the dimension from
1 to 2, `f` and `F` change with it, and the positivity threshold moves from
`beta_1 = 2` to `beta_2 = 4.26645`, which is this corpus's own bound
(`recon-0828-rough.md` section 2, "Exact at the object and worthless at the
exponent").

**Verdict.** The hypothesis fails on the dimension. **This is the sharpest of
the collisions**: the only theorem in print that beats K2 for
this exact object beats it at `kappa = 1`, and moving to the two classes the
target needs lands squarely on K1. `covering-dive.md` section 1.3 names the
reason: the sifting limit (2) equals the twin-critical exponent (2) only at one
class, and the corpus calls that the one-class miracle. [PROVEN, cited.]

### 4c. Erdos-Rankin and FGKMT long gaps

**Mechanism (i).** Construct a long interval covered by choosing one residue
class per prime, giving `G(x) >> x log x logloglog x / loglog x`.

**Check (iii).** The direction is opposite: this produces a lower bound on the
gap, not an upper bound, and the corpus already consumes it. `README.md` §Status
records that twin slots are a subset of the tile's holes, so `G_2 >= g`
pointwise and Rankin/Pintz/FGKMT give the free lower bound, and a stronger one
was obtained by carrying a two-class kill set through Kalmynin-Konyagin
(`paper/proposals/draft-kk-lower-bound.md`, checked twice, not refereed).

**Verdict.** Not an escape from K2; an adverse-direction theorem already banked.

### 4d. Linnik's theorem on the least prime in a progression

**Mechanism (i).** An every-class conclusion, `p(a,q) << q^L`, from ensemble
inputs: a log-free zero-density estimate, the Deuring-Heilbronn zero-repulsion
phenomenon, and Page's theorem isolating the single exceptional character. The
exceptional class is handled separately rather than averaged away, which is what
makes this a genuine almost-all-to-every mechanism.

**Hypothesis (ii).** (a) The carrier is the zeros of Dirichlet L-functions mod
`q`. (b) The range searched is a **power** of the modulus, `q^L`.

**Check (iii).** (a) fails for the same reason as 4a: no L-function is attached
to the tile. (b) fails on the scale fact: the corpus's window is about
`(ln x#)^2` against a modulus `x#`, so the range is polylogarithmic in the
modulus, not a power of it.

**And the implication runs the wrong way, which is the decisive point.**
`covering-dive.md` section 1.1 records Vaughan's observation that a Jacobsthal
exponent below 2 would give Linnik's theorem easily, and `recon-0828-rough.md`
section 2 records Mercer, INTEGERS 18 (2018) #A26 p. 3, read at page image: a
bound `h(n) <= C p_n^{2-eps}` for all `n` "would lead to a short proof of
Linnik's theorem and Dirichlet's theorem", and even `h(n) = o(p_n^2)` gives a
short proof of Dirichlet. So Linnik sits **downstream** of the one-class target,
not upstream of it.

**Verdict.** The hypothesis fails on both halves, and the direction is
wrong-way: importing Linnik as an escape would be importing a consequence of a
weaker form of the target. The corpus already records the false alarm this
generates and explicitly declines it: `G_2 >= g` pointwise, so a two-class
exponent of 2 implies nothing below 2 at one class, and no Linnik price attaches
(`recon-0828-rough.md` section 2, "Recording it so the false alarm is not raised
later").

### 4e. Gallagher's large sieve and the exceptional-set method

**Mechanism (i).** Bound the second moment of the error across the ensemble
(Barban-Davenport-Halberstam from Bombieri-Vinogradov; Gallagher's large sieve
for the variance), then conclude that the exceptional set has density tending to
zero, and take a member outside it.

**Hypothesis (ii).** The exceptional fraction `eps` must be small enough that
`eps` times the ensemble size is below one at the decision point.

**Check (iii).** PROVEN counting, and it is K2's core: the ensemble has `W = x#`
members and the anchor is one, so the boundary sits at `eps = 1/W`, i.e.
`e^{-(1+o(1))w}`, and **not** at any rate polynomial in `w` (`anchored-note.md`
section 3, Proposition 1 part (i)). The measured distance: the second-moment
bound gives `eps ~ (Var/E)/E ~ ln^2 W / W`, measured `8.38e-6` at @19 against
the decision threshold `1.03e-7`, a factor 81 short and growing like `ln^2 W`
(`object-bridge-read-0829.md` section 4). The general form, which closes the
whole branch at once: a window that is empty rather than carrying its expected
`H P_y` survivors contributes `(H P_y)^2 / X` to the variance, which is below
the error term of any variance asymptotic by a factor growing with `X`, so a
single exceptional window is invisible to a second moment at every level and for
every sharpness (`recon-0828-rough.md` section 3.3, and `variance-note.md`
section 4 in its own words).

**Verdict.** The hypothesis fails exactly, with the number: the method's
exceptional density is polynomial in `w` and the decision needs exponential.

### 4f. The combinatorial family: local lemma, second moment, Kim-Vu

**Mechanism (i).** Turn "typical" into "some member is good" by showing the bad
events have positive probability of simultaneous failure (Lovasz local lemma and
its algorithmic form), or by concentration (second moment, Janson, Kim-Vu
polynomial concentration).

**Hypothesis (ii).** For the local-lemma family, a **sparse** dependency graph.
For the concentration family, slack between the worst-case single-coordinate
effect and the theorem's own deviation scale.

**Check (iii).** All CLOSED here, and the closures are cited rather than
re-derived. The dependency graph of the tile's kill events is **complete**, on
which Shearer's exact criterion **is** the union bound, Moser-Tardos gains
nothing on the resulting chordal graph, and every member that beats Shearer buys
it with structure costing `H >= x#` (`REFUTED.md` row on the local-lemma family,
`import-shearer.md` sections 4, 6, 8, 2026-08-19). The bounded-differences family
including Kim-Vu is closed because the first scour prime's worst-case effect
`d(q_1)` misses the theorem's own slack by a factor growing like `sqrt N`, 174
rising to 70,576 over `x = 11..23`, and the published repair's exponent is about
`ln^2 x / x`, below 1 at every computable level and falling (`REFUTED.md`,
`row7-recon.md`, 2026-08-20). Generic chaining is closed because its entropy
integral already exceeds the union bound by 1.04 to 1.10 at every level
(`REFUTED.md`, `import-chaining.md`).

**Verdict.** The hypothesis fails for the local-lemma family on graph sparsity
and for the concentration family on slack, both PROVEN or CLOSED in the corpus.
There is a second, independent failure worth one line: even a successful local
lemma delivers existence of a good configuration, and the corpus's target is a
statement at a prescribed position, so the output would carry the wrong
quantifier regardless.

### 4g. Matomaki-Radziwill in short intervals

**Mechanism (i).** Control a bounded multiplicative function in almost all
intervals of length `h` with `h -> infinity`, with power-saving uniformity in
part II.

**Hypothesis (ii) and check (iii).** The input is admissible: the `y`-rough
indicator is `chi_0 mod y#`, the principal character, hence maximally
pretentious. The failure is the conclusion, which is an `L^1` average over
starting points, and no averaging statement produces a bound at a prescribed
start. Dead by 4e's mechanism, one rung weaker, at the first moment rather than
the second (`recon-0828-rough.md` section 3.4, priced 2026-08-28).

**Verdict.** Already priced and CLOSED; recorded so the row is not re-run.

---

## 5. K3 escapes: ensemble to point

Six escapes. The first is the strongest row in the note, because its hypothesis
is refuted by a printed sentence naming this programme's exact system.

### 5a. The circle method: Vinogradov's three primes at a fixed N

**Mechanism (i), and it is the canonical ensemble-to-point escape.** Write the
count as an integral over all frequencies, split into major arcs where the
singular series localises the answer to the specific `N` under consideration,
and minor arcs killed by bilinear cancellation. The output is a statement about
one prescribed odd `N`, obtained from an object defined over the whole ensemble
of frequencies. That is precisely the shape K3 says is unavailable here.

**Hypothesis (ii).** The pattern must be Fourier-detectable, which in the modern
formulation is Gowers complexity 1 or lower: the linear forms system must be one
whose count is controlled by the `U^2` norm, so that the minor-arc contribution
is genuinely small.

**Check (iii), and the check is a printed sentence about this exact system.**
Green and Tao, *Annals* 171 (2010) p. 1760, read at the page image and
transcribed in `import-transference.md` section 0, verbatim: *"The system
`Psi(n_1) := (n_1, n_1+2)`, which counts twin primes, has infinite
complexity,"* and in the same paragraph *"More generally, any system with
`d = 1` and `t > 1` has infinite complexity."* Vinogradov's three-primes system
has `d = 3` independent variables and one form; the twin system has `d = 1` and
`t = 2`. The three-primes escape works because its system is at the easy end of
the complexity scale, and this programme's system is at the other end, by a
statement in print that names it.

**A second, independent failure, PROVEN here.** There are no minor arcs to
exploit. The tile's transform on `Z/W` **vanishes nowhere**: the local factor is
`1 + e(2v/q)` up to a phase, zero only when `4v = q (mod 2q)`, impossible for
odd `q`, and at `v = 0` the local value is `q - 2 >= 1`. The worst-case local
modulus has the closed form `min |fhat_q(v)| = 2 sin(pi d_q / q) >= 2 sin(pi/(2q))`,
measured at twelve primes as `1.000000, 0.618034, 0.445042, 0.284630, 0.241073,
0.184537, 0.165159, 0.136485, 0.108278, 0.101298, 0.084882, 0.076605` for
`q = 3..41`, with `0.076605 = 2 sin(pi/82)` to six places
(`recon-0828-farfields.md` section 2a, SCRATCHPAD-GRADE for the numerals,
PROVEN for the non-vanishing).

**Verdict.** The hypothesis fails by a printed statement about the exact system,
and fails again on the transform's full support, which removes the minor-arc /
major-arc dichotomy the method needs. This is the cleanest wall address in the
note.

### 5b. Siegel-Walfisz at a fixed modulus

**Mechanism (i).** An average over characters, uniform enough to give a
statement at one fixed modulus rather than for almost all moduli.

**Hypothesis (ii).** The modulus is bounded by a fixed power of the logarithm,
`q <= (log x)^A`, and the carrier is Dirichlet L-functions.

**Check (iii).** This programme's modulus is `x#`, and `ln x#` is about `x`, so
`(log x#)^A` is nowhere near `x#`. The corpus already priced what
Siegel-Walfisz does buy here, which is the fixed-modulus tail refinements
(`bv-import-survey.md` section 3.1, "Provable now by Siegel-Walfisz").

**Verdict.** The mechanism applies, at a modulus range this programme's object
does not live in, and buys nothing at the anchor. Already priced.

### 5c. Maier's matrix method: distinguished levels chosen by the argument

**Mechanism (i).** Escape an equidistribution average by choosing a row of a
matrix whose column sums are known, which produces rows above and rows below the
average. This is the closest thing in print to selecting a favourable level
rather than accepting the ensemble's verdict.

**Hypothesis (ii).** The ability to select a level, plus the conclusion being
allowed to be an existence statement over levels.

**Check (iii), two parts, both already in the corpus.** (a) On the axis this
programme would need it, `THE-DIALS.md` dial 4's fourth channel was surveyed and
closed: 23 instruments, 19 eligible, 11 rules each, a 20,000-permutation null
with a best-of-family statistic, smallest per-instrument `p_FWE = 0.1082` and
Sidak over the nineteen instruments at `0.8865`, so not one instrument reaches
0.05 even before the outer correction. The two signatures with a named mechanism
select **finite** sets: `maxsum_{L+1}` is sharp exactly when no gap of the old
tile is `= 0, +-2 (mod p)`, whose qualifying-gap counts run `2, 4, 4, 72, 60, 20,
380, 380, 64, 11784, 9452, 9500, 243816, 248058, 95896` and grow like `3D/p` with
`D = prod_{3<=q<=x}(q-2)`, so the condition is already unsatisfiable at `T_11`;
the greedy oracle's sharp levels are the initial segment `x <= 43`
(`ioslack-survey.md` sections 0 and 5, MEASURED at 15 cells, PROVEN-shaped).
(b) Even if a signature selected an infinite set, infinitely-many is already
fatal, since the anchor is one point at each level
(`attack-wrongdirection-audit.md` section 1, Axis B).

**Verdict.** The hypothesis is available and the conclusion is on the wrong
axis. Dial 4 is FINISHED and this row is a re-statement of that closure in the
literature's vocabulary rather than a new check.

### 5d. Granville-Soundararajan, the uncertainty principle

This is the row the brief singles out, so it is answered in the brief's own two
parts.

**Is it killer 3 in print for sieve-weighted sequences? No.** The paper is
Granville and Soundararajan, *An uncertainty principle for arithmetic
sequences*, Ann. of Math. 165 (2007) 593-635, preprint arXiv:math/0406018;
title, authors and abstract fetched at the arXiv abstract page this pass
[SOURCED for the abstract only]. The abstract's own statement of scope:
*"In various discrepancy problems, combinatorics researchers have analyzed
limitations to equi-distribution, as have Fourier analysts when working with the
'uncertainty principle'. In this article we find that these ideas have a natural
setting in the analysis of distributions of sequences in analytic number theory,
formulating a general principle, and giving several examples."* The theorem
asserts that any arithmetic sequence **is** irregularly distributed somewhere.
Killer 3 asserts that no ensemble statement **determines** the value at the
anchor. The first is an existence statement over intervals and progressions; the
second is a non-transfer statement about a fixed point. Neither implies the
other, and GS's amplitude is `1/u^{cu}`, tiny and two-sided.

**Does the corpus already cite it? Yes, in two places, and one of them is a
withdrawal.** (a) `special-levels-recon.md` section 1d carries Corollary 1.2 at
source (GS preprint pp. 1-4): for `q` large squarefree with
`sum_{p | q} (log p)/p >= 60 log_3 q`, a bound *"attained when q is the product
of the primes up to some large y"*, there are intervals `I+-` of length at least
`z^u` whose reduced-residue counts read `{1 +- 1/u^{c_2 u}} (phi(q)/q) |I+-|`,
and GS note this breaks the Montgomery-Vaughan Gaussian heuristic at
`h = log^A q` for many highly composite `q`. **The extremal level is the
primorial**, which is exactly this programme's level. (b) `REFUTED.md` and
`maier-matrix.md` section 8 record that the corpus **withdrew** GS Corollary 1.4
as an obstruction, because its `eta` is capped at `1/100`, firing only past
`log x >= (5e6)^200`.

**Verdict.** Not an escape from K3 and not K3 in print. It is adverse-direction
evidence, already held at source, already cited twice, and its one
obstruction-shaped corollary is already withdrawn here for a quantified reason.
The one thing it adds to the wall address is the identification of the primorial
as the extremal level for the irregularity it certifies, which strengthens the
scale fact of section 4 and weakens nothing.

### 5e. Pretentious localisation (Granville-Soundararajan, the pretentious large sieve)

**Mechanism (i).** Replace equidistribution by a distance to a single character,
and localise a mean value by identifying which character the function pretends
to be.

**Hypothesis (ii).** The function is multiplicative and 1-bounded, and the
conclusion is a mean over a long interval.

**Check (iii).** The hypothesis holds trivially and the conclusion is therefore
empty: the `y`-rough indicator **is** `chi_0 mod y#`, the principal character,
so the input is maximally pretentious and the theory identifies it correctly and
says nothing further (`recon-0828-rough.md` section 3.4, which records exactly
this for the Matomaki-Radziwill branch of the same theory). The quantifier is
still an average.

**Verdict.** The hypothesis holds and the conclusion carries no information, the
one failure mode that is not a hypothesis failure. Recorded as VOCABULARY-ONLY
in the sense of `IMPORT-MAP.md` section 0.

### 5f. Duke and the Linnik ergodic method: equidistribution of a fixed orbit

**Mechanism (i).** For a **fixed** discriminant, Heegner points equidistribute on
the modular surface. This is an honest single-orbit result rather than an
average, obtained through subconvexity for the associated L-functions, and it is
the strongest ensemble-to-point escape available in the homogeneous-dynamics
family.

**Hypothesis (ii).** (a) The point of interest lies on a positive-dimensional
orbit of a group action with a spectral gap. (b) An L-function is attached, with
subconvexity available.

**Check (iii).** (a) fails structurally. The ensemble here is `Z/W` acting simply
transitively on the phases, so every orbit is the whole ensemble and the
anchor's stabiliser is trivial: the "orbit" of `t = 0` under anything smaller is
a single point, the degenerate case the method excludes. There is no spectral
gap to exploit, because the transform has full support with no eigenvalue
separation, `min |fhat_q(v)| >= 2 sin(pi/(2q))` at every frequency
(`recon-0828-farfields.md` section 2a). (b) fails for the same reason as 4a and
4d: no L-function is attached to the tile.

**Verdict.** The hypothesis fails on both halves, the first for a reason that is
K3's own shape restated: transitivity of the ensemble action is exactly what
makes a single phase invisible.

---

## 6. The wall-address table

One row per escape. "Lands in" names the killer the escape falls into after its
own killer is beaten, where that happens. "Prior" records whether the corpus
already priced the row before this pass.

| # | escape, in print | killer it beats elsewhere | the hypothesis that must hold here | the fact it fails on, cited | lands in | prior |
|---|---|---|---|---|---|---|
| 3a | bilinear / Type II remainder (Iwaniec 1980; Vinogradov; Heath-Brown identity) | K1 | a bilinear construction at `kappa = 2`, cancelling uniformly in window position | only construction above `kappa = 1` is Pomykala 1990, capped at `beta < 3` i.e. `kappa < 1.23` (`recon-0828-sieve.md` 4.1-4.2); position-uniform branch short, `H^{1.212157}` vs `exp(H^{0.2344})` (`sift-limit-attack.md` 4.5) | K3 | priced 2026-08-28 |
| 3b | Friedlander-Iwaniec asymptotic sieve (`a^2+b^4`) | K1 | a Type II range for the sequence | remainder already trivial and position-uniform at `H^{1-eps}`, recorded **saturated** at DP4 (`sift-limit-attack.md` 3) | K2 | input side priced; FI row new |
| 3c | switching principle (Chen 1973) | K1 | lower linear sieve plus BV over `[1,x]` | BV is not available uniformly in window position (`natal-cap-10-sieve-cap.md` 1.4); output is `P_2`, not a pair | K3 | priced |
| 3d | vector sieve (Brudern-Fouvry 1996) | K1 | **decoupled** component levels | coupled gives `2(1+sqrt e) = 5.2974 > 4.26645` (`wall-note.md` 1); decoupling needs the lemma 3a shows is missing | **OPEN**, see 7a | the programme's named road |
| 3e | Maynard-Tao multidimensional weights | K1 | that an i.o.-and-some-pair conclusion suffices | target is a max over all positions; i.o. already fatal (`attack-wrongdirection-audit.md` 1, Axis B) | K2 | priced |
| 3f | `kappa > 1` almost-prime escapes (Iwaniec `x^2+1`, `P_r`) | K1 | a `kappa = 2` construction below 4.26645 | none in print, and no extremal example either (`SEARCH-CONVENTIONS.md` 3; Ford via `sift-limit-attack.md` 2) | none; the band is unoccupied both ways | priced |
| 4a | Hoheisel / Huxley via zero density | K2 | explicit formula over L-function zeros; window `X^theta`, `theta` above the density threshold | no L-function on `Z/x#`; window is `(ln X)^2`, i.e. `theta = 0` against 0.5667 (`attack-bilinear-transplant.md` table; `recon-0828-farfields.md` 2b) | K3 | **Hoheisel absent from the repo** |
| 4b | Iwaniec's every-interval rough bound | K2 | `kappa = 1`, so `f(u) > 0` for `u > 2` | two classes move the threshold `2 -> 4.26645` (`recon-0828-rough.md` 2; `covering-dive.md` 1.3) | **K1** | priced |
| 4c | Erdos-Rankin / FGKMT long gaps | direction reversed | n/a | lower bound, not upper; already consumed (`README.md` §Status; `draft-kk-lower-bound.md`) | n/a | banked |
| 4d | Linnik's least prime in an AP | K2 | L-function zeros; range a **power** of the modulus | no L-function; range is polylog in the modulus; and the implication runs the other way, `h(n) <= C p_n^{2-eps}` gives Linnik (Mercer 2018 p. 3 via `recon-0828-rough.md` 2) | wrong direction | priced |
| 4e | Gallagher large sieve / BDH exceptional set | K2 | `eps W < 1` at the decision point | boundary is `eps = 1/W = e^{-(1+o(1))w}`, not polynomial in `w` (`anchored-note.md` 3 Prop 1(i), exact); measured `8.38e-6` vs `1.03e-7` at @19, 81x short | n/a, K2 itself | priced |
| 4f | local lemma / Shearer / Moser-Tardos; second moment, Janson; Kim-Vu | K2 | sparse dependency graph; slack over the single-coordinate effect | graph is **complete**, Shearer = union bound (`import-shearer.md` 4); `d(q_1)` misses slack by `sqrt N`, 174 to 70,576 over `x = 11..23` (`row7-recon.md`) | n/a | CLOSED |
| 4g | Matomaki-Radziwill short intervals | K2 | none; input admissible | conclusion is an `L^1` average over starting points (`recon-0828-rough.md` 3.4) | n/a | CLOSED |
| 5a | circle method, Vinogradov three primes at fixed `N` | K3 | pattern of Gowers complexity `<= 1` | Green-Tao, Annals 171 (2010) p. 1760, verbatim: the twin system *"has infinite complexity"*, and *"any system with `d = 1` and `t > 1`"* does (`import-transference.md` 0); and no minor arcs exist, `supp That = W` (`recon-0828-farfields.md` 2a, PROVEN) | n/a | complexity fact held 2026-08-27 |
| 5b | Siegel-Walfisz at a fixed modulus | K3 | `q <= (log x)^A` | modulus is `x#` with `ln x# ~ x` (`bv-import-survey.md` 3.1) | n/a | priced |
| 5c | Maier's matrix, distinguished levels | K3 | a recognisable signature selecting an infinite set | the two signatures with a mechanism select **finite** sets; `p_FWE >= 0.1082`, Sidak `0.8865` over 19 instruments (`ioslack-survey.md` 0, 5); and i.o. is already fatal | K2 | dial 4 CLOSED |
| 5d | Granville-Soundararajan uncertainty principle | neither; adverse direction | n/a | an existence-of-irregularity statement, amplitude `1/u^{cu}`, not a non-transfer statement; Cor 1.4 already withdrawn here, `eta <= 1/100` (`REFUTED.md`; `maier-matrix.md` 8) | n/a | cited twice already |
| 5e | pretentious localisation | K3 | multiplicative, 1-bounded, mean over a long interval | hypothesis holds trivially, `chi_0 mod y#` is maximally pretentious, conclusion empty (`recon-0828-rough.md` 3.4) | n/a | priced |
| 5f | Duke / Linnik ergodic method, fixed orbit | K3 | positive-dimensional orbit with a spectral gap; L-function subconvexity | `Z/W` acts simply transitively, the anchor's orbit is a point; no spectral gap, `min \|fhat_q(v)\| >= 2 sin(pi/(2q))` at every frequency; no L-function | n/a | new row, old facts |

**The audit label, where the audit settles it.** The table above grades every row
by killer and by landing killer and carries no `(i)/(ii)/(iii)` label, which red
team C records as a gap rather than an error: "two rows turn on conclusions the
audit has already labelled, and a reader moving between the two 0829 recon notes
will find one that labels every angle and one that labels none". Three rows are
settled by citation to `attack-wrongdirection-audit.md` section 2:

| row | audit label | what settles it |
|---|---|---|
| 3d | **(i)** strictly weaker | item 10: the band `(2, 4.2665]` is legal, and the decoupled vector sieve's payout sits inside it |
| 3e | **(i)** strictly weaker | item 3's quantifier distinction plus section 1 Axis B: an i.o.-and-some-pair conclusion is decidable short of the all-window target, which is why beating K1 here buys nothing |
| 4c | **(i)** strictly weaker | item 10: a lower bound on long gaps runs inside the legal band and never reaches `min_x N(x) >= 1` |

**The other sixteen rows, graded 2026-08-29, and the debt is paid at the lower
rung.** The audit's section 2 grades this programme's own targets, not the
literature's escapes, so most of what follows is a fresh judgement and not a
citation, and the caption says which is which per row. The rule is the audit's
own, section 0's last bullet: **(i)** the escape's conclusion, if it held in this
object, would still not imply TPC through any bridge this corpus holds;
**(ii)** it would; **(iii)** the note cannot tell.

| row | audit label | reason, one clause |
|---|---|---|
| 3a | **(i)** | the only consumer section 3a names for a `kappa = 2` bilinear construction is 3d's vector sieve, whose payout item 10 places inside the legal band `(2, 4.2665]`, and no landing below exponent 2 is claimed anywhere in the row; a construction delivering an asymptotic rather than a lower bound would be (ii), and section 3a claims none [FRESH] |
| 3b | **(ii)** | the asymptotic sieve's output is an asymptotic count of primes in the sequence, and on the twin sequence such a count is the Hardy-Littlewood asymptotic, which gives TPC outright with no bridge, which is why the row's own hypothesis is the one Friedlander and Iwaniec say the sequence does not supply [FRESH] |
| 3c | **(i)** | Chen's conclusion is a `P_2` and not a prime pair, and Chen's theorem is PROVEN in print while TPC is open, which is the audit section 0 witness form for strictly weaker [FRESH, on the audit's stated notion] |
| 3f | **(i)** | the hypothesis is a `kappa = 2` construction below `beta_2 = 4.26645`, and item 10 makes the whole band `(2, 4.2665]` legal, with the separation exhibited rather than modelled [CITED, item 10] |
| 4a | **(i)** | the every-interval conclusion arrives at window length `X^theta` with `theta` bounded away from zero, and Axis A makes an every-window statement TPC-implying only at `H <= w^2 - w` [CITED, Axis A] |
| 4b | **(i)** | granted at two classes the positivity threshold is `beta_2 = 4.26645`, so the every-position conclusion arrives at window exponent 4.26645, above Axis A's line at 2 [CITED, Axis A] |
| 4d | **(i)** | Linnik's theorem is PROVEN while TPC is open, and section 4d establishes it sits downstream of a one-class exponent below 2 rather than upstream of anything here, so its conclusion presupposes more than it delivers [FRESH, on the corpus facts the row cites] |
| 4e | **(ii)** | the hypothesis granted is `eps W < 1` at the anchored decision point, which certifies the anchored window itself, and audit item 8 grades that certification TPC-strength and stronger, the error term's only use being to certify `X(y*) < T` [CITED, item 8] |
| 4f | **(i)** | the family's output is existence of a good configuration somewhere in the ensemble, and Axis D admits only `min_x N(x) >= 1` at a prescribed position, which the row states as its own second failure [CITED, Axis D] |
| 4g | **(i)** | the conclusion is an `L^1` average over starting points, which is Axis C's almost-all side and never a value at a prescribed start [CITED, Axis C] |
| 5a | **(ii)** | the major-arc output at a prescribed point is, on the twin system, the Hardy-Littlewood asymptotic, which implies TPC; Green-Tao's infinite-complexity sentence is exactly the statement that the mechanism cannot deliver it here [FRESH] |
| 5b | **(i) as the theorem reads, (ii) at the modulus the escape would need** | at `q <= (log x)^A` the conclusion already holds here and buys only the fixed-modulus tail refinements the corpus priced, which is legal; the same conclusion at modulus `x#` over a window of about `x'^2` is the Zone Postulate, hence TPC-implying by `G2-STATE.md` section 1b [FRESH, and the split is the honest reading rather than one label] |
| 5c | **(i)** | the mechanism's output is existence of favourable rows, and the anchor is fixed by arithmetic rather than chosen by the argument, so Axis D's prescribed-position requirement is untouched and Axis B disposes of the level quantifier [CITED, Axis D and Axis B] |
| 5d | **(i)** | a two-sided existence-of-irregularity statement of amplitude `1/u^{cu}`, PROVEN in print while TPC is open, and adverse-direction here in any case [FRESH] |
| 5e | **(i)** | the conclusion is empty in this object, the hypothesis holding trivially at `chi_0 mod y#` and the theory identifying it and saying nothing further, and an empty conclusion implies nothing [FRESH] |
| 5f | **(i)** | the anchor's orbit under a simply transitive action is a single point, so the equidistribution conclusion is degenerate here and carries no statement about the anchor [FRESH] |

**Caption, and what this table is not.** Twelve rows come out (i), three come out
(ii) (3b, 4e, 5a), one is split (5b), and none is (iii). Seven reasons are
citations to `attack-wrongdirection-audit.md` and name the axis or item, marked
[CITED]; the other nine are **fresh judgements made 2026-08-29 against that
audit's axes**, marked [FRESH], and they have had no second reader. A **(ii)**
here opens nothing and is not a route: it says that if the escape's conclusion
held in this object it would settle the conjecture, which is a reason the escape
is expensive rather than a reason to spend a session on it, and all three fail
their own hypothesis check in sections 3 to 5 above. The labels change no verdict
in the table above, no killer, no landing killer and no number in this note.

**Reading of the table, at its lowest rung.** Nineteen rows. Fourteen fail a
hypothesis check (3a, 3b, 3c, 3e, 4a, 4b, 4d, 4e, 4f, 4g, 5a, 5b, 5c, 5f); one is
OPEN (3d); and four fail in some other way, either by having no escape in print
(3f), running in the opposite direction (4c), not being an escape at all (5d), or
having a hypothesis that holds while the conclusion is empty (5e). Of the
fourteen, twelve fail on a fact that was in this corpus before the pass, one
fails on a comparison the corpus holds in pieces across two files (4a's scale
comparison), and one fails on a printed sentence naming the twin system (5a).
Five rows land in a different killer after beating their own: 3a into K3, 3c into
K3, 3e into K2, 4b into K1, 5c into K2. That is the collision pattern of section
0, and it stays at HEURISTIC.

---

## 7. What did not fail the hypothesis check

Three items. Each is stated at its lowest rung with the circularity pre-check
written out before the item, per `IMPORT-MAP.md` section 0's gate.

### 7a. The decoupled vector-sieve lemma

**Circularity pre-check, written first.** The lemma is: signed cancellation of
the bilinear interval remainder for the two-class comb, uniformly in window
position, the two-dimensional analogue of Iwaniec's 1980 error term. Does it, if
proven, imply the Zone Postulate or TPC, which would make it a wrong-direction
target of the kind `attack-wrongdirection-audit.md` catalogues? **No, and the
reason is quantitative:** the corpus has already measured what the decoupled
route buys and it is an exponent, not the conjecture.
`research/theta-ladder.md` measures the window exponent at which the certificate
is positive at every position, and that requirement sits inside the zone budget
at every exactly-measured level, `need/z^2 = 0.3550..0.6119` at `z = 13..31`,
all exact (`paper/wall-note.md` section 1). A lemma about cancellation in a
bilinear sum is an analytic estimate about a fixed lattice of divisor pairs and
carries no positivity hypothesis, so the circularity grade is **CLEAN**, the same
grade `sift-limit-attack.md` section 3 already assigns the Brudern-Fouvry target
("Parity does not forbid it: the target 2.649 sits above 2").

**Status: OPEN.** Not novel: this is the programme's named road and has been
since before this pass. The pilot measures the cancellation and finds it strong
at toy scale, including exhaustively over full periods (`paper/wall-note.md`
section 1), which is a MEASURED input at small `n` and not evidence about the
uniform statement. What section 3a adds to it is the adverse context: the only
published attempt at a bilinear remainder above dimension 1 carries `beta < 3`,
so the analogue this lemma asks for has been attempted once in thirty-six years
and stopped below the needed dimension.

### 7b. Whether Pomykala's `beta < 3` is essential

**Circularity pre-check.** Relaxing a technical constraint in someone else's
lemma is a literature question, not a statement about the tile, so it cannot be
circular. It is also not a route on its own: even granted, section 3a's part (b)
remains, and that is an exponent comparison rather than a technicality.

**Status: OPEN, priced below 2%** by `recon-0828-sieve.md` section 4.3, on the
grounds that the announcement is five pages in a bulletin, its OpenAlex forward
graph returned one citing work and that one unrelated, and nobody appears to
have taken the construction past `kappa = 1.23` since 1990. Not novel; carried
here only so the row is not re-opened.

### 7c. The collision pattern

**Circularity pre-check.** The observation is about the literature's escapes,
not about the tile, so it is not circular. It is also not falsifiable by any
computation in this repository, which is the honest limit on it.

**Statement, at HEURISTIC.** Across the nineteen rows of section 6, every escape
that beats one killer in print and can be transplanted at all lands inside
another killer: 3a and 3c beat K1 and land on K3's position quantifier, 3e beats
K1 and lands on K2's, 4b beats K2 and lands on K1's dimension, 5c beats K3 and
lands on K2's.
**Novelty: none.** `attack-wrongdirection-audit.md` section 0 and `README.md`
§Status already record that the three killers were stated together because
independent attacks converged, and `object-bridge-read-0829.md` section 4
already records that killers 2 and 3 bite on the same link, `E(x) -> S(x)`. What
this note adds is the tabulated form and the count. A pattern over nineteen rows
of a non-exhaustive candidate list is not evidence of impossibility, and this
note does not claim it as such.

**What it would take to raise this above HEURISTIC.** A theorem of the form "any
method whose input is a class count and whose conclusion is position-uniform is
capped at `beta_2`", which is exactly the barrier theorem
`sift-limit-attack.md` section 2 records as absent for `kappa = 2` and
`natal-cap-10-sieve-cap.md` section 1.5 flags as "rigorous folklore" for the
floor. No such theorem was found in this pass, and none was searched for in an
owning convention.

---

## 8. Provenance ledger

**What was read at source this pass:** one item. arXiv abstract page for
`math/0406018`, Granville and Soundararajan, *An uncertainty principle for
arithmetic sequences*; title, authors and abstract confirmed verbatim. That is
an abstract, not a theorem statement, and section 5d says so.

**What is CORPUS CUSTODY**, meaning read at source in an earlier pass of this
repository and quoted from the file that owns it, per the standing compute rule:

| fact | owning file | grade there |
|---|---|---|
| Greaves's zbMATH review of Pomykala 1990, `Delta = MNK^{beta-2}`, `2 < beta < 3` | `recon-0828-sieve.md` 4.1 | SOURCED at the zbMATH record |
| Granville on Iwaniec's every-interval bound, `f(2) = 0`, `J(P(z)) << z^2` | `recon-0828-rough.md` 2; `covering-dive.md` 1.2 | SOURCED, page image |
| Mercer 2018 p. 3, `h(n) <= C p_n^{2-eps}` gives Linnik and Dirichlet | `recon-0828-rough.md` 2 | SOURCED, page image |
| Green-Tao, Annals 171 (2010) p. 1760, twin system has infinite complexity | `import-transference.md` 0 | AT SOURCE, Annals page image |
| GS Corollary 1.2, the primorial as extremal level | `special-levels-recon.md` 1d | AT SOURCE, GS preprint pp. 1-4 |
| GS Corollary 1.4 withdrawn, `eta <= 1/100` | `REFUTED.md`; `maier-matrix.md` 8 | corpus closure |
| Ford's notes, `beta(kappa)` known only on `[0,1/2] u {1}` | `sift-limit-attack.md` 2 | SOURCED |
| Bettin-Chandee Remark 1, `(1 + hx/MN)^{1/2}` | `SEARCH-CONVENTIONS.md` 1 row 34; `sift-limit-attack.md` 4.5 | corpus custody |
| Huxley 7/12 and Guth-Maynard 17/30 | `attack-bilinear-transplant.md` short-interval table | corpus custody |
| transform full support, twelve measured minima | `recon-0828-farfields.md` 2a | PROVEN + SCRATCHPAD-GRADE numerals |
| complete dependency graph, Shearer = union bound | `import-shearer.md` 4 | PROVEN |
| `eps W < 1` boundary; `8.38e-6` vs `1.03e-7` at @19 | `anchored-note.md` 3 Prop 1(i); `object-bridge-read-0829.md` 4 | PROVEN + MEASURED |
| dial 4 permutation test, `p_FWE >= 0.1082`, Sidak `0.8865`; the 15 miss cells | `ioslack-survey.md` 0, 3, 5 | MEASURED |
| `d(q_1)` slack miss, 174 to 70,576 | `REFUTED.md`; `row7-recon.md` | CLOSED |
| BV not position-uniform | `natal-cap-10-sieve-cap.md` 1.4 | INFERRED from proofs' structure |
| `2(1+sqrt e) = 5.2974`; `need/z^2 = 0.3550..0.6119` | `paper/wall-note.md` 1; `theta-ladder.md` | corpus custody |

**What is MEMORY, flagged and not load-bearing:** Hoheisel's 1930 exponent
`1 - 1/33000`; the value of Linnik's `L` and the names of the three Linnik
principles; the wording of Friedlander and Iwaniec's own remark that the twin
sequence supplies no Type II range. Each appears in a sentence whose verdict
does not turn on the numeral.

**What was not done.** No script was run. No PDF was opened. No owning-convention
sweep was performed, so the eighteen rows are the brief's candidate list plus
Hoheisel and are not claimed complete. No existing file was edited and no git
command was run.

---

## 9. What would falsify this, and whether that check has run

| claim in this note | what would falsify it | has that check run? |
|---|---|---|
| no escape read here reaches the wall | any one of the nineteen rows whose hypothesis in fact holds for the tile or zone objects | partially: each row was checked against one or two corpus facts, none against a fresh reading of the escape's own paper |
| the corpus needs `theta = 0` on the short-interval scale, against 0.5667 in print | a short-interval prime theorem at polylogarithmic window length | not searched in an owning convention this pass; `special-levels-recon.md` 1d is adverse evidence, GS breaking the Gaussian heuristic at `h = log^A q` |
| Hoheisel appears nowhere in this repository | a hit under a different spelling or inside a PDF or a non-markdown file | grep over `research/` and `paper/` markdown only; PDFs and scripts not scanned |
| the circle method fails because the twin system has infinite complexity | a printed complexity assignment putting the system at finite `s` | yes, and the opposite is printed: Green-Tao p. 1760, read at the page image in `import-transference.md` |
| GS is not killer 3 in print | a GS theorem asserting non-transfer of an ensemble bound to a fixed point | partial: abstract read this pass, Cor 1.2 held at source in `special-levels-recon.md`, the full paper NOT REACHED |
| the collision pattern (7c) | one escape that beats a killer and lands in none | no; the pattern is over a non-exhaustive list and the check is not defined sharply enough to run |
| 3d's lemma is CLEAN rather than TPC-strength | a derivation of the Zone Postulate from the decoupled bilinear lemma alone | no; the grade is inherited from `sift-limit-attack.md` 3 and was not re-derived here |
| Pomykala's `beta < 3` cannot be relaxed | a construction above `kappa = 1.23` in print or in preprint | partial: forward citation graph checked in `recon-0828-sieve.md` 4.3, one citing work, unrelated |

**The honest summary of this table.** The strongest falsification checks that
have actually run are the Green-Tao complexity assignment (5a) and the exact
`eps W < 1` counting (4e); those two rows are the ones this note would defend
hardest. The weakest are 7c, which is a description rather than a claim, and the
`theta = 0` scale comparison, which is arithmetic on corpus-held numerals and has
not been checked against a literature sweep for polylogarithmic short-interval
results. Nothing in this note has been through an adversarial pass, and the
campaign's own rule is that four of five same-day integrations needed correcting
within twelve hours (`primeoire-campaign-lessons`).
