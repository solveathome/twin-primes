# Attack 3 of 5: DP3, re-inserting exact Buchstab strata

<!-- ledger
id: Q-beta2-exact-strata
status: CLOSED
todo: none
question: Does re-inserting exact Buchstab strata (DP3) lower the dimension-2 positivity threshold below beta2 = 4.26645?
verdict: A sharp negative with a price tag: exact strata are legitimate and worth 1.72 to 1.84 of exponent, taking the positivity threshold to 2.0260 at finite levels, but they produce no theorem because the exact stratum value is the upper sieve function of a dilated tile one level down, so the regress terminates at every finite z and at no uniform z.
-->

*(2026-08-18. Staging note. Target from `research/sift-limit-attack.md` §1 DP3
and §4.6. Companion computation: `research/attack-beta2-03-exact-strata.js`
(`node research/attack-beta2-03-exact-strata.js`, about 25 s, full output pasted
into the script). Legend as in `research/covering-dive.md`: **[PROVEN]**
published theorem with source; **[VERIFIED]** checked computationally in this
repository; **[MEASURED]** empirical, finite range; **[ABSENT]** searched and
found nothing; **[INFERRED]** deduction from sourced facts.)*

## 0. The numbers, first

| quantity | value | status |
|---|---|---|
| DHR dimension-2 sifting limit β₂ | 4.26645028414864191641 | [PROVEN], `research/dhr-verification.md` §1.1 |
| **positivity threshold with EXACT strata, p ≤ 23** | **2.0260** (sifting-limit reading) | [VERIFIED] full period, this script §3 |
| same, first-crossing reading (the operative certificate) | 1.9264 | [VERIFIED] full period, unit-exact |
| positivity threshold with EXACT strata, p ≤ 19 | 2.0028 / 1.8160 | [VERIFIED] full period |
| the truth, log G₂/log p_k, p ≤ 23 | 1.6961 | [VERIFIED] recomputed here |
| same bound, strata priced at the envelope instead | 3.85 | [MEASURED] surrogate, §4b |
| **exponent that the exact pricing of DP3 is worth** | **1.72 to 1.84** | [MEASURED] |
| decoupling excess D(H), the whole remaining cost | 1 to 15 elements | [MEASURED] |

**Normalisation, because everything depends on it.** u = log H / log p_k with
p_k the **largest sifted prime**, the convention of `research/exact-g2-ladder.js`
and `paper/beta2-note.md` (G₂(n) ≪ pₙ^{β₂+ε}). DHR's own parameter uses the
sifting bound z = p_k + 1; at p_k = 23 that is 1.4% in the log and it vanishes
asymptotically. Using the log of the NEXT prime instead would move u by 7%.

**The verdict in one line.** The strata ARE exactly smaller instances, the
transformation law is now written down, exact re-insertion moves the threshold
from 4.2665 to about 2, and it is **not a theorem and cannot be made into one by
this route**: it fails on an infinite regress in the asymptotics, not on
circularity, and the finite certificates it does produce are strictly weaker
than the enumeration that produced G₂ in the first place.

---

## 1. What a discarded stratum IS

### 1a. Stratum Dilation Lemma [PROVEN here, VERIFIED at eight levels]

Write T(y) for the tile sifted by all primes ≤ y, of period Q(y), and T⁻, Q⁻ for
the tile and period at the primes strictly below p. The Buchstab stratum is
S(A_p, p) = #{r in the window : p | r(r+2) and no q < p divides r(r+2)}, which
splits by the two classes p | r and p | r+2.

> **Stratum Dilation Lemma.** For every odd sifting prime p, as subsets of
> Z/(p·Q⁻):
>
> - { r ≡ 0 (mod p), r ∈ T⁻ } = p · (p⁻¹ · T⁻)
> - { r ≡ −2 (mod p), r ∈ T⁻ } = p · (−p⁻¹ · T⁻) − 2
>
> where p⁻¹ · T⁻ is again a two-class tile at level p⁻, cut by the class pair
> {0, −2/p mod q} at every q < p, and −p⁻¹ · T⁻ by {0, +2/p mod q}.

*Proof.* Take the first branch. r = p·m, and for q < p we have q ∤ p, so
q | r(r+2) iff q | m or q | pm+2 iff m ≡ 0 or m ≡ −2p⁻¹ (mod q). So the m that
survive form the two-class tile with class pair {0, −2p⁻¹}. Multiplying that
tile by p sends {0, −2p⁻¹} to {0, −2}, which is T⁻, so the tile is p⁻¹ · T⁻.
The second branch is the image of the first under m ↦ −m. ∎

**Consequences, and they are the whole answer to "is it exactly a smaller
instance of the same problem".**

1. **Yes, exactly.** A discarded stratum is two two-class interval sifts of
   length H/p at level p⁻, with the same dimension κ = 2 and the same local
   densities ω(q) = 2, ω(2) = 1. Nothing about the problem class changes.
2. **The recursion is closed and its action is division.** The class-offset
   vector transforms as c ↦ c/p. Starting from the twin tile c_q ≡ −2, the
   family generated is exactly { c_q ≡ −2/m mod q } indexed by squarefree m built
   from sifting primes, and every member is the multiplicative dilate m⁻¹·T of
   the twin tile. This is `paper/moire-primes.md`'s Redundancy Lemma (the kill
   image p × holes) stated for the two-class problem, and it upgrades
   `sift-limit-attack.md` §1's "the strata are dilated kill images" from a
   description to a transformation law.
3. Verified as an exact set identity at p = 3, 5, 7, 11, 13, 17, 19, 23, together
   with the Buchstab identity itself at six (x, H, j) spot checks including
   x = 223,092,869. [VERIFIED]

### 1b. Where the analogy breaks, precisely

The dilation m⁻¹ is a **bijection of Z/Q carrying slots to slots and destroying
intervals**. The self-similarity is exact for the tile as a set with congruence
structure, and false for the tile as a set with order. Every question a sieve
asks about a stratum is an order question: how many survivors sit in a window.
So the exactness transfers no interval statistic by fiat. It has to be measured,
and it was.

**Measured, at level 19, over the full period** [VERIFIED]:

- **From above the family is uniform.** Max window count, the quantity a
  lower-bound sieve needs for its strata, spreads at most about 15% across 40
  dilates, and the twin tile sits sometimes at the top of that range (u = 1.2,
  1.7) and sometimes at the bottom (u = 1.5, 2.0).
- **From below it is not.** Max gap: the twin tile is the family **minimum**. Of
  10 sampled dilates none has a smaller max gap and 9 have a larger one, running
  to 198 against G₂ = 150 (+32%). The dilates the recursion actually produces,
  23⁻¹ through 43⁻¹, give 168 to 198.

So exact re-insertion of stratum **upper** bounds is family-robust. Anything
resting on the lower side of the family is not, and any attempt to recurse the
*retained* part of the identity pays that 32%.

**Ladder provenance.** The script recomputes the census ∏(p−2) and the max gap
from scratch at all nine levels it uses (x ≤ 23) and both match the ladder. The
terms x = 47..79 appear only as a reference table; their maximality is
established in `attack-beta2-05-covering-pruning-bound.md`, not here.

---

## 2. The instrument

`research/attack-beta2-03-exact-strata.js`. Primes p₁ < … < p_k, T_j the tile
sifted by p₁..p_j, N_j(x,H) = |T_j ∩ (x, x+H]|, Str_i(x,H) the count of r in the
window whose least prime factor of r(r+2) is exactly p_i. Buchstab is then the
exact partition N_k = N_j − Σ_{i>j} Str_i.

**The cut family.** For every j,

> min_x N_k(x,H) ≥ min_x N_j(x,H) − Σ_{i>j} max_x Str_i(x,H)

is a valid all-positions lower bound. j = k is the untruncated identity. j = 0
retains nothing and prices every stratum at its **exact maximum over the full
period**. j interpolates, so the family is precisely the "Buchstab iteration
with exact low strata" that `sift-limit-attack.md` §4.6 says does not exist.

Every max and min is taken over a complete period (Q = 223,092,870 at p ≤ 23),
so nothing here is sampled. The census reproduces the Schemmel product ∏(p−2)
and the max gaps reproduce the G₂ ladder at all nine levels, which is the
instrument's self-test. The DHR (F₂, f₂) system is integrated from the
Booker-Browning α, β by the method of steps and both functions converge to 1
within 2.7·10⁻⁵, which is the solver's self-test. **The predicate is scanned, not
bisected**: the bound is not monotone in H.

---

## 3. The thresholds

u*(0), every stratum priced at its exact maximum, nothing retained
[VERIFIED, full period]:

| p_k | 7 | 11 | 13 | 17 | 19 | 23 |
|---|---|---|---|---|---|---|
| u*, first crossing (operative) | 1.7479 | 1.7835 | 1.9037 | 1.8209 | **1.8160** | **1.9264** |
| u*, stable (sifting-limit reading) | 2.1372 | 1.9448 | 1.9638 | 1.9812 | **2.0028** | **2.0260** |
| u_true = log G₂/log p_k | 1.7479 | 1.5587 | 1.6334 | 1.6526 | 1.7017 | 1.6961 |

Two readings, because the bound is not monotone in H and the scan reports both.
The **first crossing** is the operative one for a gap bound: positivity at a
single H already proves G₂ ≤ H. The **stable** value, the least H past which the
bound never fails again, is the sifting-limit reading and the one comparable to
β₂. The grid is every integer to 700, so every first crossing above is
unit-exact.

**Against β₂ = 4.26645 the exact-strata threshold is lower by 2.24.** It sits at
the TPC-equivalent line 2, the gap to the truth is flat at 0.30 to 0.39, and the
stable threshold **rises monotonically** from p_k = 11 on: 1.9448, 1.9638,
1.9812, 2.0028, 2.0260, crossing 2 at p_k = 19. **It is not trending below.**

**What the certificates actually assert.** G₂(19#) ≤ 210 and G₂(23#) ≤ 420,
against true values 150 and 204. Valid, independently checkable, and a factor
1.4 to 2.1 weaker than the enumerations that produced the ladder.

**The cut ladder, p ≤ 23** (stable reading), which is where the shape of the
loss shows:

| j | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| u*(j) | 2.0260 | 2.0260 | 1.9994 | 1.9958 | 1.9921 | 1.9484 | 1.8928 | 1.8877 | 1.7994 | 1.6961 |

Row j = 9 is the identity and returns H* = G₂ = 204 exactly, at all six levels
tested. **Retaining the single largest prime exactly (j = 8 → 9) buys 0.103 of
exponent; retaining the first five primes exactly buys 0.078 in total.** The
exactness that pays is the exactness whose sub-problem is nearly the whole
problem. Cheap low strata are worth almost nothing.

---

## 4. Where the loss actually sits

**4a. With exact strata the entire remaining cost of DP3 is O(1).** Because
Σ_i Str_i(x) = H − N_k(x) identically, the only loss left in the j = 0 bound is
that the maxima are taken at independent positions:

  D(H) := Σ_i max_x Str_i(x,H) − H + min_x N_k(x,H) ≥ 0,

and the bound is positive exactly when min_x N_k(H) > D(H). Measured D runs **1
to 15** over everything computed (H from G₂ to 30·G₂, p_k from 13 to 23), growing
slowly in both H and p_k. Four levels is not a trend line, but the order of
magnitude is unambiguous: **DP3 with exact strata costs a handful of elements,
where DP3 with the envelope costs a factor on every stratum.** [MEASURED]

**4b. Same bound, only the pricing swapped (stable reading).**

| p_k | 13 | 17 | 19 | 23 |
|---|---|---|---|---|
| u*, exact strata | 1.9638 | 1.9812 | 2.0028 | 2.0260 |
| u*, strata at main·F₂(u_i) | 3.6892 | 3.6963 | 3.8459 | 3.8452 |
| **difference = the price of DP3** | **1.725** | **1.715** | **1.843** | **1.819** |

The envelope column applies F₂ pointwise and is a **surrogate, not a rigorous
finite-z bound**: Theorem 9.1 carries an o(1) of size O((log log y)²/(log y)^{1/6})
which is not small at these z, and this one-step decoupled bound is not DHR's
truncation. Do not quote 3.85 as "what DHR gives"; the rigorous asymptotic
answer for the method remains 4.26645. What the pair is good for is the
**difference**, which isolates the stratum pricing and nothing else.

**4c. Per-stratum overpayment at the working point** (p ≤ 19, H = 19²)
[MEASURED]:

| p_i | main_i | max_x Str_i | exact ratio | u_i | F₂(u_i) | envelope / exact |
|---|---|---|---|---|---|---|
| 7 | 10.31 | 12 | 1.163 | 2.450 | 4.249 | 3.65× |
| 11 | 4.69 | 7 | 1.493 | 1.794 | 7.885 | 5.28× |
| 13 | 3.25 | 6 | 1.849 | 1.386 | 13.207 | 7.14× |
| 17 | 2.10 | 5 | 2.381 | 1.191 | 17.882 | 7.51× |
| 19 | 1.66 | 4 | 2.413 | 1.039 | 23.495 | 9.74× |

The overpayment concentrates entirely on the deep strata, at u_i near 1. That is
the DP3 loss localised.

---

## 5. Is re-insertion legitimate? Three different answers

**5a. FULL re-insertion is a tautology, and the script proves it on itself.**
Row j = k returns H* = G₂ exactly at every level. Buchstab with every stratum
exact IS the identity N_k = N_k. Anyone reporting "exact strata give exponent
1.70" has reported G₂ back to itself. This is the trap the brief asked about,
and it is real: it fires at j = k and only there.

**5b. PARTIAL re-insertion (j < k) is NOT circular and IS a valid theorem at
each finite z.** Every input is a strictly smaller problem: min_x N_j is at level
j < k, and max_x Str_i is a shorter window at level p_{i−1} < p_k. The
computation terminates. "G₂(19#) ≤ 210" is true and independently checkable.
There is no hidden assumption of the conclusion.

**5c. As a proof technique it fails on an infinite REGRESS, not on circularity.**
To turn u*(0) into a statement for all z you need an asymptotic upper
bound on max_x Str_i(x,H) at u_i near 1. By §1a that quantity IS the upper sieve
function of a dilated tile at the same parameter one level down. The only proven
bound for it is F₂, which is exactly what the exactness was brought in to
replace. The regress terminates at every finite z and at no uniform z. **That is
precisely why the finite certificates exist and the theorem does not**, and it
is the sharp form of §4.6's "nobody has a way to propagate exactness through the
recursion without reverting to worst case at the next depth".

**5d. The cost accounting is also against it.** Producing max_x Str_i over the
full period is a computation of the same order as enumerating G₂ directly, and
returns a weaker answer (210 against 150). As a computational device the route
is dominated by what the repo already runs.

---

## 6. What would have to be true asymptotically

Stated as sharply as the data allows. Define F_meas(y,u) = max_x count /
(L·V(y)) at L = y^u, the exact upper sieve function of the natal tile over its
full period. The re-insertion becomes a theorem if and only if F_meas(y, u) is
bounded by an explicit constant C(u) < F₂(u), uniformly in y, at the parameters
u ≈ 1 to 2 where the strata sit. Measured [MEASURED, six levels]:

| u | y=7 | 11 | 13 | 17 | 19 | 23 | F₂(u) |
|---|---|---|---|---|---|---|---|
| 1.2 | 2.800 | 1.901 | 2.758 | 2.292 | 3.014 | 3.262 | 17.623 |
| 2.0 | 1.714 | 1.414 | 1.436 | 1.427 | 1.490 | 1.538 | 6.344 |
| 3.0 | 1.102 | 1.067 | 1.040 | 1.040 | 1.049 | 1.042 | 2.916 |

At u = 3 the ratio is flat near 1.05, as it must be. **At the parameters that
matter it rises with y**, and the envelope-to-truth ratio F₂/F_meas closes
monotonically at u = 2: 4.49, 4.42, 4.44, 4.26, 4.13. Six points cannot decide
whether F_meas converges to a constant below F₂ or climbs toward it. They do
decide that **no constant-factor re-insertion is supported by the data in the
accessible range**: the quantity to be re-inserted is not observed to be stable
where it is needed.

The companion lower-side requirement, from §1b: the same bound would have to
hold across the whole dilate family m⁻¹·T, uniformly in m. From above that looks
plausible (15% spread). From below the twin tile is the family minimum, so any
argument that recurses the retained part starts by giving back 32%.

---

## 7. Literature (sweep run 2026-08-18 for this attack)

- **β₂ is already the limit of Buchstab iteration inside the axiom class.**
  Blight, *Refinements of Selberg's Sieve*, Rutgers PhD thesis, p. 8: "The
  Diamond-Halberstam sieve is an infinite iteration of the Ankeny-Onishi sieve."
  [PROVEN, quoted from the thesis]. **This decides the shape of the attack**: no
  rearrangement of the truncation can beat 4.2665, so any movement must come from
  information outside the axioms. Exactness is such information, which is why it
  moves the number at all, and §5c is why it does not move it into a theorem.
- **4.2665 is not the axiom-class truth.** Blight §2.2: β_κ is "the greatest
  lower bound of the β_{κ,Λ} over all possible lower bound sieves Λ", and
  "Selberg proposed that the sifting limit is 2κ … a lower bound sieve with a
  sieving limit of 2κ has not been found for κ > 1". So the conjectural axiom
  limit at κ = 2 is **4**, and DHR's 4.26645 is an upper bound for it. This
  refines `sift-limit-attack.md` §2, which reports the same 2κ plateau from
  Franze but does not carry Blight's statement of it. [PROVEN as quoted]
- **Closest published relative, and it is live.** Brady, *Sieves and iteration
  rules*, Stanford PhD 2017; Runbo Li, *A note on variants of Buchstab's
  identity*, arXiv:2504.07974 (2025). These **retain** more strata with
  fractional coefficients instead of discarding them at 0 / F, proved from
  pointwise inequalities such as 1 − ((m₁+m₂−1)/m₁m₂)n + (2/m₁m₂)C(n,2) ≥ 0. Li
  §4, verbatim: "these may be helpful in bounding the 'sifting limits' β_κ for
  κ > 1 … We hope someone can accomplish this work." That is an explicitly open
  problem sitting at DP3, approached by inequalities rather than exact values.
  **[PROVEN that it is open, as quoted]**
- **Harman's method is not exact re-insertion.** It evaluates some decomposition
  pieces asymptotically by comparison against a model set, licensed by Type I and
  Type II arithmetic input. That is DP4 information, which
  `sift-limit-attack.md` §5 establishes is already saturated for our sequence at
  no cost. [PROVEN mechanism, INFERRED verdict]
- **Chen's switching principle re-classifies survivors, it does not re-evaluate
  a stratum.** [PROVEN via secondary sources]
- **No published sieve prices a discarded stratum exactly.** [ABSENT, as far as
  this sweep reaches] `sift-limit-attack.md` §4.6's absence claim survives a
  second independent search.
- **The regress observation of §5c is not in the literature either.** Tao's
  "Open question: the parity problem in sieve theory" (2007) frames the
  obstruction as 2^k term explosion and Liouville correlations, not as
  self-reference of the strata. [ABSENT, as far as this sweep reaches]

One custody note. This sweep failed to re-find Booker-Browning as the source of
the 20-digit β₂ and attributed it to the DH book p. 227. `research/dhr-verification.md`
§1.1 quotes the Booker-Browning ancillary table verbatim from a direct fetch,
with the URL. **The direct fetch stands; the sweep's miss is a miss.** Recorded
here so it is not rediscovered as a contradiction.

---

## 8. Corrections and additions to the record

Not applied. `research/attack-beta2-03-exact-strata.js` is the only file this
attack wrote.

1. `research/sift-limit-attack.md` §3, the last table row, currently reads
   "Self-similar strata / kill image (PROVEN, Redundancy Lemma) | DP3 | none | no
   known mechanism; **not provably useless**". It is now measured. Proposed
   replacement for the verdict cell: *"measured 2026-08-18: exact re-insertion
   moves the threshold to 2.026 at p ≤ 23 and is not a proof technique (infinite
   regress, `research/attack-beta2-03-exact-strata.js`)"*.
2. `research/sift-limit-attack.md` §4.6 ends "the missing lemma class is
   'Buchstab iteration with exact low strata' … nobody has that". The cut family
   of §2 above is that object, built and run. The sentence should point at it and
   record that the value is concentrated at the LARGEST primes, which is the
   reason nobody has it.
3. `research/sift-limit-attack.md` §1 DP3 says "the strata are dilated kill
   images". The Stratum Dilation Lemma of §1a above is the statement with its
   proof and its transformation law c ↦ c/p; §1 should cite it.
4. `research/sift-limit-attack.md` §2 should carry Blight's two quoted facts
   (DHR = infinite Ankeny-Onishi iteration; β_κ defined as the infimum over all
   lower-bound sieves, with Selberg's 2κ unattained for κ > 1). The first is the
   cleanest available statement of why DP3 depth is exhausted.
5. `research/GLOSSARY.md`'s "Kill image" entry could gain the two-class form:
   the strata of the twin tile are its multiplicative dilates m⁻¹·T, and the
   dilate family is uniform from above (15%) and not from below (+32% max gap).

---

## 9. Verdict

**The attack returns a sharp negative with a measured price tag, which is the
outcome the brief called a full success.**

The strata are exactly what `sift-limit-attack.md` said they were, and the proof
is three lines. Re-inserting them exactly is legitimate, non-circular, and
worth 1.72 to 1.84 of exponent, taking the positivity threshold from 4.2665 to
2.03. It produces true certificates at every finite level. It does not produce a
theorem, and the reason is now precise rather than vague: **the exact stratum
value is the upper sieve function of a dilated tile one level down, so the only
proven bound for it is the very envelope the exactness was replacing.** The
regress terminates at every finite z and at no uniform z. Two independent
readings confirm the closure from the other side: the value of exactness is
concentrated at the largest primes, where the sub-problem is nearly the whole
problem; and Blight's identification of the DHR sieve as the infinite iteration
of Ankeny-Onishi says the axiom class has no depth left to give.

The one door this attack leaves open is not exactness. It is Brady and Li's
fractional retention rules, which sit at DP3, are inequality-based rather than
exact (so they carry no regress), and are on the record as an open problem for
κ > 1. That is a different attack.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in
[../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
