# Far fields priced against the exponent: the tile's transform vanishes nowhere, so the whole uncertainty-principle family is empty on this object, and Janson's lower tail saturates at 0.08 instead of reaching 1/W

<!-- ledger
id: Q-recon-0828-farfields
status: ANSWERED
todo: 0
question: Do any of the fields still absent from IMPORT-MAP.md hold a theorem whose hypothesis the tile satisfies exactly and whose conclusion is a lower bound on a periodic set's count in every window, a maximal-gap bound for a product-structured periodic set, or a positivity statement at a distinguished point?
verdict: No route from any of the sixteen candidates priced; two reach STRONG-ANALOGY or better and CLEAN and both bank only a closure or a wall address, the Fourier one by a one-line non-vanishing proof that empties the Donoho-Stark/Tao/Meshulam family on this object, and Janson's lower tail by saturating at exp(-1/c) >= 0.0805 against the 1/W a position union bound needs, short by 3.6e2 at x = 11 and 2.8e13 at x = 41.
-->

*(2026-08-28. Staging note, HELD, no adversarial pass. Nothing here is
integrated into a live document and no existing repo file was edited, moved or
deleted. No git command was run and `research/qc.js` was not run. One producer
was written and it lives in the session scratchpad (`farfield.py`); it is not
embedded, not `qc`-gated and not a repo number, so every figure it printed is
marked `[SCRATCHPAD-GRADE]` per the `attack-lichtman-decomp.md` precedent, and
nothing here may be quoted outside this file until it is re-derived inside an
embedded producer. Literature statements are **[SOURCED]** when read this
session at a page image or an authors' hosted full text with the sha256 in §6,
**[SOURCED-BIB]** when only the record was verified, **[MEMORY]** otherwise.
Corpus numbers are **[CITED]** and were never recomputed, per the standing
compute rule.)*

**Confidence that any candidate in this note opens a route on the
`4.2665 -> 2` gap: below 0.5%.** The base rate this note is priced against is
the map's own: 22 imports, 0 routes. The two candidates that survive the
structural gate bank a closure and a wall address, which is what the
calibration set predicts and is not a route.

---

## 0. Verdict, disconfirming half first

**Nothing found opens anything, and the strongest of the sixteen candidates is
strongest because it is empty rather than because it is close.** Sixteen fields
were priced against the three target shapes the brief names. Fourteen come back
VOCABULARY-ONLY or subsumed by a landed row. Two reach STRONG-ANALOGY or better
with a CLEAN circularity cell, and both of those bank payoff of type CLOSURE or
WALL-ADDRESS only.

Three findings carry across the whole pass, and each one closes more than the
row it came from.

1. **The tile's Fourier transform on `Z/W` vanishes nowhere** (§2a, PROVEN in
   one line here, checked numerically at twelve primes). Every local factor is
   `1 + e(2v/q)` up to a unit phase, and that is zero only when `4v = q`
   modulo `2q`, which parity forbids for odd `q`. So `|supp T-hat| = W`,
   maximal, and the Donoho-Stark inequality reads `D*W >= W` while the
   prime-order sharpening reads `D + W >= W + 1`. Both hold with the maximum
   possible slack and constrain nothing. The uncertainty-principle family is
   not weak on this object, it is empty on it.

2. **Janson's lower tail does not fail by being vacuous; it fails by
   saturating.** With `Delta` proportional to `mu^2` on a complete dependency
   graph, the bound `exp(-mu/(1+delta))` decreases in `mu` and then stops, at
   `exp(-1/c) >= 0.0805` where `c` is the window-averaged pair correlation. It
   never reaches the `1/W` that a union bound over the tile's positions needs,
   and it does not improve as the window lengthens. The shortfall runs
   `3.6e2` at `x = 11` to `2.8e13` at `x = 41` and diverges like `W`
   `[SCRATCHPAD-GRADE]`.

3. **Half the candidate list dies on one sentence that is not about any of the
   fields.** An interval of length `L` is a diagonal segment of `L` points in a
   CRT box of `x#` cells. Any theorem that counts, covers or bounds over the box
   sees the segment only once `L` approaches `x#`. That is the closure already
   recorded against Alon-Furedi in `import-map-construction.md` §1 and against
   the distortion method in `import-distortion.md`, and it disposes of the
   polynomial method, the sumset family and the density-to-interval bridge
   without any new search.

**What this note does NOT establish.** It does not establish that these fields
hold no relevant theorem. It establishes that no theorem of the three named
shapes was reached in the conventions searched in §1, with the channels
calibrated in-pass. Two channels were not reached at all: MathSciNet, and
zbMATH beyond its public search. No sentence below should be read as an
absence claim outside the conventions §1 names.

---

## 1. Channel calibration, before any negative is counted

Per `SEARCH-CONVENTIONS.md`, a clean negative in the wrong convention is the
default failure mode here, and a negative is not counted until the channel has
returned a known positive in the same pass.

| channel | probe | result | state |
|---|---|---|---|
| OpenAlex, single filter | `title_and_abstract.search:Jacobsthal function` | 299, with Erdos 1962 first | LIVE |
| OpenAlex, conjunctive (comma is AND) | `uncertainty principle` AND `cyclic group` | 63, with Tao 2005 first | LIVE, conjunction confirmed |
| OpenAlex, conjunctive negative control | `covering radius` AND `mixed alphabet` | 0 | a real 0 on a live channel |
| arXiv abstract pages | `math/0308286`, `1406.1248` | both fetched, hashed | LIVE |
| arXiv full text | `1406.1248` PDF, 420,257 bytes | statement extracted verbatim | LIVE |
| WebSearch | uncertainty principle on `Z/nZ` squarefree | returned the Biro-Meshulam-Tao line | LIVE |

The arXiv API 429 the brief warns about did not recur on the abstract and PDF
hosts used here. MathSciNet was not reached and no §4 line depends on it.

Conventions searched, by object rather than by house vocabulary:

| object | convention searched | outcome |
|---|---|---|
| support of `1_T` and of its transform | **uncertainty principle**, **Donoho-Stark**, **support of a function and its Fourier transform** | the family exists and is sharp at prime order; nothing bounds a minimum over windows |
| covering an interval by two classes per prime | **covering systems**, **minimum modulus**, **Jacobsthal's function** | all already in the corpus; the 2025 squarefree-moduli minimum-modulus paper is about covering all of `Z`, not an interval |
| the code-theoretic reading of the complement | **covering radius**, **linear programming bound**, **mixed alphabet** | LP-for-covering exists (20 records); the mixed-alphabet conjunction is a real 0 |
| growth rate of the fold operator | **joint spectral radius**, **max-plus**, **tropical matrices** | 6 records, all about finite matrix sets |
| lower tail of a sum of dependent indicators | **Janson's inequality**, **lower tail**, **Poisson approximation** | found, read verbatim, and the optimality is in print |

---

## 2. The fit test, applied once, before the rows

Two facts about the object decide most of what follows, and both are cheap.

### 2a. The transform has full support (PROVEN here)

Under CRT, `1_T` is a product over primes of local indicators, so its transform
on `Z/W` is the product of the local transforms. For odd `q` the local
forbidden set is `{0, q-2}`, so for `v` not congruent to `0` the local
transform is `-(1 + e(2v/q))` up to a phase, and

> `1 + e(2v/q) = 0` requires `4v = q (mod 2q)`, which is even against odd. No
> solution exists for odd `q`.

At `v = 0` the local value is `q - 2 >= 1`. The factor at `q = 2` is `-1`. So no
factor ever vanishes and `supp T-hat = W`. A closed form for the worst case
falls out: `min |f-hat_q(v)| = 2 sin(pi d_q / q)` for the `v` whose phase is
nearest a quarter turn, which is at least `2 sin(pi/(2q))`. Measured at twelve
primes `[SCRATCHPAD-GRADE]`: `1.000000, 0.618034, 0.445042, 0.284630,
0.241073, 0.184537, 0.165159, 0.136485, 0.108278, 0.101298, 0.084882,
0.076605` at `q = 3..41`, and `0.076605 = 2 sin(pi/82)` to six places.

The ambient itself is not new here. `varE-spectral.md` §1 already carries the
exact spectral form `X = sum_{v != 0} W-hat(v) K_L(v/M)` with the CRT twist
`[CITED]`, and `variance-note.md` Thm 1 carries the pair correlation. What §2a
adds is the support statement and its consequence in §3a.

### 2b. The interval is a diagonal segment in the box

The map `n -> (n mod q)_q` is a bijection `Z/W -> prod Z/q`, and an interval of
length `L` is the image of `L` consecutive integers, which is a segment of the
CRT diagonal. It meets `L` of the `x#` cells. Any statement proved by counting,
covering or optimising over the box is a statement at scale `x#`, and the
restriction to the segment is the missing step in every case below. This is the
Alon-Furedi rejection reason of `import-map-construction.md` §1 restated once so
that §3b, §3c and §3f can point at it instead of repeating it.

---

## 3. The priced angles

Grades use `IMPORT-MAP.md` §0 throughout. Cost is the size of a first
experiment shaped to four hours, not the size of the mathematics.

### 3a. Fourier analysis on finite abelian groups, and the uncertainty principles for `Z/x#Z`

**The theorem.** Donoho-Stark for any finite abelian group, `|supp f| *
|supp f-hat| >= |G|`, and the prime-order sharpening `|supp f| + |supp f-hat|
>= p + 1`, sharp, in Tao, *An uncertainty principle for cyclic groups of prime
order*, arXiv `math/0308286`, *Math. Res. Letters* 12 (2005) 121-127
**[SOURCED at the abstract page, both inequalities quoted; the proof was not
opened]**. Meshulam's `Z/p^n` variant and the squarefree extensions of the
Biro-Meshulam-Tao line **[SOURCED-BIB, via the survey channel only]**.

**Structural fit: EXACT-IDENTITY at the ambient, and the conclusion is empty.**
The tile is exactly a function on `Z/W` with `W` squarefree, which is the
hypothesis these theorems are stated for, so the fit at the hypothesis is not a
resemblance. The deciding sentence is on the other side:

> By §2a the transform's support is all of `Z/W`, so `|supp f| * |supp f-hat| =
> D * W`, which exceeds `W` by the factor `D`, and no member of the family can
> say anything about a set whose transform is already maximally spread.

The wrong-shape half is worth stating too, because it is what would be reached
for next. An uncertainty principle bounds supports. The object needed is a
lower bound on `min_a #(T intersect [a, a+L))`, which in the Fourier ambient is
`D*L/W - sum_{v != 0} T-hat(v) K-hat_L(v)` minimised over `a`. Bounding that
sum by its `l^1` norm converges exactly where `sum 2/q < 1`, which is the
Mertens wall at `x = 13` that six independent routes already reach
(`sift-limit-attack.md` §7 `[CITED]`), and the `l^1 -> l^2 sqrt(log)`
improvement of the same sum is rows 5 and 6, closed, with the true constant
below the TPC line (`import-l1l2.md` `[CITED]`). The expander mixing lemma on a
Cayley graph of `Z/W` with the interval as connection set is the same sum in
graph notation and lands in the same place.

**Circularity: CLEAN.** A support computation at a fixed level is finite and
carries no hypothesis.

**Payoff type: CLOSURE (a family, with a one-line mechanism) + WALL-ADDRESS.**
No THEOREM and no DERIVED-CONSTANT are available.

**First experiment, and it is 30 minutes rather than 4 hours.** Write §2a as an
embedded producer that prints `min_{v != 0} |T-hat(v)|` exactly at
`x = 5..41` from the local closed form, checks it against `prod_q 2 sin(pi
d_q/q)`, and confirms the count is `W` at the levels where the full transform
can be enumerated. Pre-registration: the minimum is nonzero at every level, and
`ln min |T-hat|` falls linearly in `pi(x)` at rate near `ln(2 sin(pi/(2q)))`.
Kill: a single vanishing coefficient at any level refutes §2a and reopens the
family.

### 3b. The polynomial method: Combinatorial Nullstellensatz, Chevalley-Warning, zero-sum bounds on products of cyclic groups

**The theorem that would have been imported.** Alon's Combinatorial
Nullstellensatz and the Chevalley-Warning congruence for the number of common
zeros of a low-degree system, together with Davenport-constant and
Erdos-Ginzburg-Ziv style bounds on `prod Z/p` **[MEMORY for the statements; not
opened this session, because the fit dies before the statement matters]**.

**Structural fit: VOCABULARY-ONLY.** The deciding sentence:

> Chevalley-Warning and the Nullstellensatz both need a single ambient field or
> a single grid over one field, and the tile is cut out by congruences to
> `pi(x)` distinct prime moduli at once, so the only common ambient is the CRT
> box, where §2b says the interval is a diagonal segment of `L` cells out of
> `x#` and no degree-count over the box restricts to it.

The one sub-angle that is not simply the box argument is the parity idea, that
the survivor count in a window might be forced nonzero by computing it modulo
something. It dies on the same sentence: the inclusion-exclusion for the count
runs over subsets of the `pi(x)` primes and its terms live in `Z`, not in any
`F_p`, so there is no characteristic in which to take the congruence.
Croot-Lev-Pach needs a prime field and `Z/W` is not one. This candidate is a
re-proposal of `import-map-construction.md` §1's Alon-Furedi row and does not
carry the new structural evidence that re-entry costs.

**Circularity: not reached.** **Payoff type: none.** **Cost: 0.**

### 3c. Additive combinatorics of sumsets: Kneser, Cauchy-Davenport, Vosper, Kemperman

**The theorem that would have been imported.** Kneser's theorem for abelian
groups with its stabiliser conclusion, and the Vosper and Kemperman structure
theorems for critical pairs **[MEMORY]**.

**Structural fit: VOCABULARY-ONLY.** Two deciding sentences, either sufficient:

> The gap question is a covering question and not a sumset question. An
> interval avoiding `T` is contained in a UNION of `2 pi(x)` cosets of maximal
> subgroups, and the owning convention for that union is covering systems,
> which is row 8, landed and closed on the CRT ambient.

> Every hypothesis in the family is a small-doubling hypothesis, and the tile
> has maximal doubling. `T` is a product set, so `T + T = prod (A_q + A_q)`,
> and `|A_q| = q - 2 >= 3` gives `A_q + A_q = Z/q` at every `q >= 5` by
> Cauchy-Davenport, hence `T + T = Z/W`.

The second sentence is the Freiman-Plunnecke rejection of
`import-map-rows-15-17.md` §4 re-derived for a different family, and it is now
exact rather than density-based. Kneser's stabiliser for the complement is
likewise unavailable in a usable form: each `A_q` is a union of two cosets of
the index-`q` subgroup, so the individual stabilisers are the `pi(x)` maximal
subgroups and the stabiliser of their union is trivial.

**Circularity: not reached.** **Payoff type: none beyond the `T + T = Z/W`
sentence, which is a one-line strengthening of an existing rejection.**
**Cost: 0.**

### 3d. Coding theory: covering radius of product codes and the Delsarte linear-programming bound for covering

**The theorem that would have been imported.** Delsarte's linear-programming
method transposed to covering, in the line represented by *Linear Programming
Bounds for Codes via a Covering Argument* (2008) and *Packing radius, covering
radius, and dual distance* (1995) **[SOURCED-BIB via OpenAlex records only]**.
The brief is right that this is a different object from the Lovasz-theta and
packing-LP rejection already recorded, and right that the corpus's own loss
budget LP at `x = 43` is a third object again. It was priced on its own terms
and it still fails.

**Structural fit: VOCABULARY-ONLY, with the degeneracy stated.** Writing the
kill structure as a code in `prod Z/q` gives exactly two codewords, `u = (0)_q`
and `v = (-2)_q`, and "position `n` is killed" is "the coordinate vector of `n`
agrees with `u` or with `v` in at least one coordinate". The deciding sentence:

> The code has two words, so every LP or sphere-covering bound in the family,
> each of which bounds `|C|` from below as a function of the radius, is a
> statement about a quantity that is known exactly and equal to 2, and the
> quantity actually wanted is the intersection of the anticode with one
> diagonal segment, which is not a scheme-invariant object.

The second half is the equivariance wall of `import-boolean-analysis.md` §4 in
coding clothes: the mixed Hamming scheme's automorphism group acts transitively
on the box, LP bounds are invariant under it, and the question distinguishes one
line. The `covering radius` AND `mixed alphabet` conjunction returned 0 on a
channel calibrated in the same pass, so the specialised statement was not merely
missed. The lattice reading of the same idea is already spent
(`import-map-rows-15-17.md` §4, Henze-Malikiosis inside row 12).

**Circularity: CLEAN, and irrelevant.** **Payoff type: none new; it reuses the
equivariance address.** **Cost: 0.**

### 3e. Tropical and max-plus spectral theory: a joint spectral radius for the fold

**The theorem that would have been imported.** Joint spectral radius of a
finite set of tropical matrices, in the line of *Comparison of max-plus automata
and joint spectral radius of tropical matrices* (2016) **[SOURCED-BIB]**.

**Structural fit: STRONG-ANALOGY at the words, subsumed at the mathematics.**
The deciding sentence:

> A joint spectral radius is defined for a FIXED finite set of matrices, and the
> fold's operator changes with the level: each old gap is copied `p'` times and
> the max-plus Perron root of the tile is `3p`, so the family is indexed by `p`
> rather than drawn from a fixed alphabet, and there is no finite set to take a
> joint radius of.

Beyond that the row is dominated by what is already banked. `import-maxplus.md`
§2c `[CITED]` makes A5's Theorem A an exact min-plus Perron statement, with the
critical circuit `P -> M -> P` of weight `6p`, so per-fold `L` is already exact.
A joint-radius bound would be an inequality where an equality is held. Row 4 of
the calibration set covers the field.

**Circularity: CLEAN.** **Payoff type: none; the equality outranks it.**
**Cost: 0.**

### 3f. Covering systems: the density of the uncovered set, with a minimum-modulus input, plus a Fourier bridge to an interval

**The theorem that would have been imported.** BBMST, *Invent. Math.* 228
(2022) 377-414 Thm 1.1 and the criterion beneath it, and Klein-Koukoulopoulos-
Lemieux for multiplicity `s`, both already read in `import-distortion.md`
**[CITED]**; the 2025 squarefree-moduli minimum-modulus upper bound as the new
element **[SOURCED-BIB, OpenAlex record only]**.

**Structural fit: STRONG-ANALOGY, and it is row 8 re-entering without the new
structural evidence re-entry costs.** Two deciding sentences:

> A covering system covers all of `Z`. The two-class family covers a finite
> interval and provably does not cover `Z`, since its density is
> `1 - prod (1 - 2/q) < 1` at every level, so the minimum-modulus theorems
> speak about a hypothesis this object never satisfies.

> Converting a density statement about the uncovered set into an interval
> statement requires a bound on the uncovered set's discrepancy in windows of
> length `x^2`, uniform in position, and the sharp form of that is the maximal
> law, which is TPC-implying (`phase1-T4-maximal-law.md` §2 `[CITED]`).

So the composed route the brief asks about is exactly the composition of a
landed closure with a wall the corpus has already priced as TPC-strength. What
would be needed, stated so the row is not re-proposed: a position-uniform
discrepancy bound for a union of two classes per prime at window scale `x^2`
with a constant below the mean, which is Face 1's quantifier.

**Circularity: TPC-STRENGTH at the bridge, CLEAN at the density half.**
**Payoff type: WALL-ADDRESS, already held.** **Cost: 0, unless the 2025
squarefree paper turns out to carry an interval statement, which the record
does not suggest and which was not opened.**

### 3g. Janson's lower-tail inequality, priced honestly

**The theorem, [SOURCED, verbatim, at the arXiv full text].** Janson and
Warnke, *The lower tail: Poisson approximation revisited*, arXiv:1406.1248,
*Random Structures and Algorithms* 48 (2016) 219-246, equation (2) with the
setup of their §1:

> the underlying probability space is the random subset `Gamma_p` included in
> `Gamma`, with `|Gamma| = N` and `p = (p_i)`, where each `i` is included,
> independently, with probability `p_i`. Given a family `Q(alpha)` of subsets
> of `Gamma`, `I_alpha = 1{Q(alpha) subset of Gamma_p}`, `X = sum I_alpha`.
> `alpha ~ beta` if `Q(alpha) intersect Q(beta)` is nonempty and `alpha` is not
> `beta`. `mu = EX`, `Pi = max E I_alpha`, `Lambda = mu + sum_{alpha ~ beta}
> E I_alpha I_beta = (1 + delta) mu`. With `phi(x) = (1+x) log(1+x) - x`, for
> all `epsilon` in `[0,1]`, `P(X <= (1 - epsilon) EX) <= exp(-phi(-epsilon) mu
> / (1 + delta)) = exp(-phi(-epsilon) mu^2 / Lambda)`, and `phi(-1) = 1`.

Note first what the brief's remembered form gets wrong, since it changes the
verdict. The inequality is not `exp(-mu + Delta)`. At `epsilon = 1` it reads
`P(X = 0) <= exp(-mu / (1 + delta))`, which is never vacuous. The failure is
not vacuity, it is saturation.

**Structural fit: STRONG-ANALOGY, and the hypothesis is not satisfied
verbatim.** The randomness has to come from the rotation ensemble, where the
adversary's classes `{a_q, a_q - 2}` are drawn independently across primes.
That is a product of uniform choices, not an independent-inclusion random
subset: within one prime exactly two of the `q` classes are deleted, in a
correlated block. The member of the family whose hypothesis this ensemble does
satisfy is Suen's inequality, and that is the landed correlation-inequalities
row (`import-suen.md`), whose theorem column already names Janson's RSA 13
(1998). So this candidate is a re-proposal of a landed row before any
arithmetic is done.

**And the arithmetic kills it independently.** Grant the hypothesis. The
dependency graph is complete, because every pair of survival events shares every
prime's variable, so `Delta = sum_{m != n} P(both survive) = p_x^2 sum_{m != n}
g(n - m)` with `p_x = D/W` and `g` the tile's pair correlation. Row 17
`[CITED]` proved that `g` is 0 unless `6 | d` and is at least `2.3812` on its
support, at every level. Hence over a window of length `L`,

`sum_{m != n} g(n-m) = 2 sum_{d<L} (L-d) g(d) >= 2 * 2.3812 * L^2/12 = 0.3969
L^2`,

so `delta = Delta/mu >= c*mu` with `c >= 0.3969`, and

`P(X = 0) <= exp(-mu/(1 + c*mu))`, which decreases in `mu` to the FLOOR
`exp(-1/c) >= exp(-2.5195) = 0.08048`.

A union bound over the tile's `W` positions needs the same probability below
`1/W`. Measured at the exact levels `[SCRATCHPAD-GRADE]`, with `L = x^2`, which
is the target window:

| `x` | mean gap `W/D` | `mu = x^2 D/W` | Janson bound | `1/W` | shortfall |
|---|---|---|---|---|---|
| 11 | 17.111 | 7.0714 | 0.156021 | 4.329e-04 | 3.604e+02 |
| 17 | 22.919 | 12.6099 | 0.122445 | 1.959e-06 | 6.251e+04 |
| 23 | 28.054 | 18.8563 | 0.108314 | 4.482e-09 | 2.416e+07 |
| 29 | 30.132 | 27.9101 | 0.099153 | 1.546e-10 | 6.415e+08 |
| 37 | 34.051 | 40.2043 | 0.093375 | 1.348e-13 | 6.929e+11 |
| 41 | 35.797 | 46.9588 | 0.091500 | 3.287e-15 | 2.784e+13 |

The shortfall is `W` times a number falling to `0.0805`, so it diverges like
`W`. Lengthening the window does not help, which is the part worth keeping: the
bound is monotone in `L` and bounded below by a constant, so no choice of `L`
buys the `1/W`.

**The third failure is the quantifier.** Even a bound that did reach `1/W`
would be a statement about the rotation ensemble, and
`import-boolean-analysis.md` §4 `[CITED]` records why that does not localise:
the ensemble's translation group acts transitively on its phases, every
conclusion of the form "off an exceptional set of measure `epsilon`" is
equivariant, and the anchor is arithmetically distinguished and
measure-theoretically generic. Face 1 measures the same gap directly, missing
the `epsilon*W < 1` threshold by `e^3025` at `x = 19` in the window ensemble's
own reading (`wall-note.md` §2 `[CITED]`).

**Circularity: CLEAN.** An upper bound on the probability of an empty window
over the ensemble carries no hypothesis of postulate strength. It also carries
no conclusion about the anchor.

**Payoff type: WALL-ADDRESS.** The saturation constant `exp(-1/c)` is a new
statement of the complete-dependency-graph mechanism in the lower-tail
convention, beside Shearer's criterion being the union bound (row 3) and
`b_3` sitting at its own ceiling (row 4). Three fields, one mechanism, three
different constants.

**First experiment, 2 hours not 4.** Write an embedded producer that computes
`c` exactly rather than through the `2.3812` lower bound, by summing the true
`g(d)` over `d < L` at `x = 11..23`, and prints `exp(-1/c)` per level.
Pre-registration: `c` lands in `[0.39, 0.60]` at every level and the floor
`exp(-1/c)` therefore lands in `[0.08, 0.19]`, and the shortfall column tracks
`W` to within a factor 3. Kill: `c` below `0.05` at any level would put the
floor below `e^-20` and would reopen the row, and would also contradict row 17.

### 3h. Model theory, o-minimality, definable families

**Structural fit: VOCABULARY-ONLY, one line as the brief allows.** The deciding
sentence: o-minimality and the Pila-Wilkie counting theorems are statements
about definable sets in an ordered structure over the reals and bound rational
points on transcendental parts, while the tile is a finite union of congruence
classes with no real-definable family attached, and the transfer principles that
do reach congruences (Ax-Kochen and ultraproduct arguments) conclude "for all
but finitely many `p`", which cannot give a bound uniform over all `q <= x`
simultaneously, which is exactly what a level-uniform statement requires.

---

## 4. Rejected in one line each, with the deciding sentence

Eight further fields were carried far enough to name what would have been
imported, so that the rejection is reusable.

| candidate | the theorem that would have been imported | why it is not a fit |
|---|---|---|
| real stable polynomials, interlacing families, Marcus-Spielman-Srivastava | the method of interlacing families and the Kadison-Singer resolution | every hypothesis in the family is negative dependence or strong Rayleigh, and row 17 closed that in print for this object: `g(6) >= 2.3812 > 1` kills strongly Rayleigh and `g(2) = 0 < 1` kills the positive side, so no member's hypothesis holds; separately the conclusion is existence of a good member of a family, and the anchor is a named member |
| Turan's power sum method, Sos-Turan, Makai | the second main theorem, a lower bound on `max_v |sum b_j z_j^v|` over a range of `v` | the method lower-bounds a MAXIMUM over a range, and the object needed is a lower bound on a MINIMUM over positions; the maximum of the deficit is already known at every computed level, and it is where the records sit |
| anti-concentration, Littlewood-Offord, Erdos-Moser | the sharp bound on `P(sum epsilon_i a_i = t)` | the conclusion is an upper bound on a point mass, so it can say a window is unlikely to be empty and never that one is not, and the ensemble quantifier applies on top |
| topological combinatorics, Borsuk-Ulam, Lovasz's neighbourhood complex | topological lower bounds on chromatic numbers of hypergraphs with a free group action | these bound the chromatic number of a hypergraph with strong symmetry, and the covering question's LP relaxation is the loss budget already closed at `x = 43`; the difficulty is the integrality gap, which topological methods do not price |
| flag algebras, sum-of-squares and Lasserre hierarchies | Razborov's flag algebra calculus; SoS degree lower bounds | flag algebras need a convergent local profile of a growing family and the tile family has none; the SoS half is the landed proof-complexity note, which found the collision is on the word parity and located the owning convention for the corpus's own certificates as the truncated moment problem, not SoS |
| quantitative Helly, the Alon-Kleitman `(p,q)` theorem, piercing numbers | the `(p,q)` theorem's bounded transversal number | this is the dual of the epsilon-net statement, and `import-vc-nets.md` landed on 2026-08-27 with the verdict that the dimension is small and the theorems point the other way; a piercing bound is an upper bound on a cover and the object wants a lower bound on non-coverability |
| density Hales-Jewett, combinatorial lines | DHJ for dense subsets of `[k]^n` | the CRT diagonal is not a combinatorial line, and DHJ concludes existence of structure inside a dense set rather than a covering lower bound for a sparse one |
| Beurling generalized primes, as a source of a `kappa = 2` extremal example | constructions of generalized prime systems with prescribed sieve behaviour | this would target the sifting limit from below rather than any of the three shapes the brief names, so it is not an import for this question; it belongs to Face 4's own `[ABSENT]` line in `SEARCH-CONVENTIONS.md` §3, and the OpenAlex conjunction `Beurling` AND `sieve` returned 21 records, none about sifting limits |

---

## 5. What the pass proposes, and what it is not allowed to do

Under `IMPORT-MAP.md` §0a a future import gets a graded row BEFORE it runs, and
this note is a recon, not a run. Two rows are proposed here in draft for the
holder of that file, since this pass may not edit it:

**Row 18 (draft), Fourier analysis on finite abelian groups.** Theorem:
Donoho-Stark, and Tao arXiv `math/0308286` at prime order **[SOURCED]**. Moire
object: `1_T` on `Z/W`, `W` squarefree. Target hole: none reached. Fit:
EXACT-IDENTITY at the ambient, EMPTY at the conclusion. Circularity: CLEAN.
Payoff: CLOSURE + WALL-ADDRESS. Cost: 0.5 h. Status: priced 2026-08-28, not
run beyond §2a.

**Row 19 (draft), the lower tail of sums of dependent indicators.** Theorem:
Janson-Warnke arXiv:1406.1248 eq. (2) **[SOURCED, verbatim]**. Moire object:
the survivor count in a window over the rotation ensemble. Target hole: the
`4.2665 -> 2` gap from the probabilistic side. Fit: STRONG-ANALOGY, hypothesis
not satisfied verbatim, and the member that fits is Suen, already landed.
Circularity: CLEAN. Payoff: WALL-ADDRESS. Cost: 2 h. Status: priced and
arithmetically decided 2026-08-28, scratchpad-grade.

**Owed, and not applied by this pass.** `TODO.md` item 0 carries a `Ledger:`
line and `Q-recon-0828-farfields` is not on it. The questions gate will say so
until the holder of `TODO.md` adds it. This pass was fenced to one new file and
did not edit `TODO.md`, `IMPORT-MAP.md`, `QUESTIONS.md`, `REFUTED.md` or
`import-map-construction.md`, all five of which have lines owed to them by the
paragraphs above.

**Novelty position.** Nothing above is claimed novel. §2a is an elementary
observation about a product of local transforms and is exactly the kind of
statement the prior-art discipline expects to be folklore in the harmonic
analysis convention; it was not searched for as a named result and must not be
written as new anywhere.

---

## 6. Provenance ledger

| artifact | what was read | bytes | sha256 |
|---|---|---|---|
| `https://arxiv.org/pdf/1406.1248` | Janson-Warnke, full text pp. 1-2, eq. (2), the `Gamma_p` setup, `Lambda` and `delta`, Theorems 1 and 2, and Harris (3), all quoted or paraphrased in §3g | 420257 | `25126b597b0a3f255294234ad389d99e6fd74ef76f2864aa86427db3948794b0` |
| `https://arxiv.org/abs/1406.1248` | the abstract page and the RSA 48 (2016) 219-246 record | 41161 | `34650241c454a26cfb2dc502b2caa43cee93fa6c1ba58c48040cfc7c920fa909` |
| `https://arxiv.org/abs/math/0308286` | Tao's abstract page, both inequalities and the sharpness claim | 40415 | `6595408067a8fb4dddf18e44a836c70936ddb683e1718deefcc3a2c2c40ff1d5` |
| `https://www.math.ias.edu/~avi/PUBLICATIONS/WigdersonY_WigdersonA_2021.pdf` | fetched and hashed as the survey channel for the Biro-Meshulam-Tao line; the PDF body was NOT opened, so every Meshulam and squarefree statement here stays **[SOURCED-BIB]** | 467708 | `5f1adbe7a484611412fbaf2232e187019229aac68796c78a69316c69c1ceab42` |

Scratchpad producer: `farfield.py`, in the session scratchpad, not embedded,
not `qc`-gated. It prints the density table, the `mu` columns, the Janson
bound and shortfall columns of §3g, and the local-transform minima of §2a.
Every number it produced is `[SCRATCHPAD-GRADE]`.

Corpus numbers used and never recomputed, per the standing compute rule:
`g(6) = 2.661728` at `x = 11` and `g >= 2.3812` at every level with support on
`6 | d` (`import-repulsive.md` §2, row 17); the exponent `4.26645` and the
target 2 (`G2-STATE.md` §0); the `epsilon*W < 1` threshold and the `e^3025`
miss (`wall-note.md` §2); the equivariance statement
(`import-boolean-analysis.md` §4); the Mertens wall at `x = 13`
(`sift-limit-attack.md` §7); the min-plus critical circuit of weight `6p`
(`import-maxplus.md` §2c).

---

## 7. What would falsify this, and whether that check has run

**§2a, the non-vanishing of the transform.** Falsified by a single frequency
`v` with `T-hat(v) = 0` at any level. The check has run at `q = 3..41` on the
local factors and the parity argument covers every odd `q`, so it has run and
it passed, at scratchpad grade; it has NOT run as an embedded producer and it
has NOT been read by a second person.

**§3a's claim that the uncertainty family is empty here.** Falsified by an
uncertainty principle whose conclusion is about the minimum of a function's
`l^1` mass on an interval rather than about support sizes. That check has NOT
run; the search was in the support convention only, and one obvious adjacent
convention, the Turan-type problem for positive definite functions on `Z/N`,
was not searched at all.

**§3g's saturation floor.** Falsified in two ways. If `c` is not bounded below
by a positive constant, the floor `exp(-1/c)` goes to 0 and the row reopens;
that check has run only through row 17's `g >= 2.3812` bound and NOT by
computing `c` exactly, which is §3g's first experiment and has not been run. If
Janson's inequality has a variant whose `Delta` counts only a sparse
dependency, the complete-graph reading is wrong; that check has NOT run beyond
reading the setup in §1 of the source, where `alpha ~ beta` is defined by
nonempty intersection of the `Q` sets, which for this object is every pair.

**§4's eight one-line rejections.** Each is falsified by a statement of the
form "the moire object is the foreign object, here is the identification",
which is what re-entry costs under the map's regrade rule. None of the eight
was searched at more than one conjunction, so each is a shallow negative and is
marked as such rather than as an absence.

**The pass as a whole.** Falsified by any theorem in any of the sixteen fields
whose hypothesis the tile satisfies and whose conclusion is one of the three
named shapes. Two channels that could carry such a theorem were not reached,
MathSciNet and zbMATH beyond public search, so the negative is bounded by the
channels of §1 and by nothing wider.
