# The fold profile: where a fold's damage lands

<!-- ledger
id: Q-fold-profile
status: ANSWERED
todo: none
question: Where does a fold by p land its damage inside the original tile stretch [0, W)?
verdict: The counting half is a theorem with an effective constant (Level Ledger PROVEN, Mirror Ledger VERIFIED 45 of 45) and the survival law is scale free (MEASURED), but the quantity controlled here is provably uninformative about L and kappa(m), so it buys nothing against the Zone Postulate route.
-->

*(2026-08-17, from Chris's question: fold T₅ by 7, then 11, and so on. The tile
gets p times longer and the total loss is known exactly. What happens to the
ORIGINAL tile section? Calibration marked throughout: PROVEN, VERIFIED by exact
computation, MEASURED, REFUTED. Code, output and readings in
`research/fold-profile-01..16-*.js`; the ones this file reads from are listed
in §10.)*

## 0. Why this is a new axis

A9 (`research/a3-09-histogram-operator.md`) records that the new gap histogram is
a function of the old gap word and q **and of nothing else**: not of W mod q, not
of the tile's residues, not of the copy order. That is Holt and Rudd's transfer
matrix, arXiv:1408.6002 §5 (2014), rediscovered in two-class vocabulary; see
`research/PRIOR-ART.md`. It was the right move for the L question, and it
deliberately threw absolute position away.

This note puts position back. The question is not what the fold does to the gap
histogram but what it does to a **place**, namely the stretch [0, W) that used
to be the whole tile.

## 1. The exact identity, restated as a ledger

Fold T_x, census D, width W = x#, by a prime p > x. The tile becomes p copies
and the census goes D → (p−2)D, so exactly **2D slots die**, no matter which p.

By the copy theorem (THE-LENS §2), copy k deletes the slots whose residue mod p
lies in the 2-set {a_k, a_k − 2} with a_k = −kW mod p. So writing

> **h(a) = #{ slots of T_x at position ≡ a (mod p) }**

the whole distribution question is one histogram:

> **K(k) = h(a_k) + h(a_k − 2),   Σ_k K(k) = 2D,   mean = 2D/p.**

Copy 0 is the anchor a₀ = 0. It is the distinguished copy: its 2-set is {0, −2},
which is p sieving honestly. Copy 0's survivors are exactly the slots of the new
tile below W.

## 2. The Level Ledger (PROVEN)

**Theorem.** For every a ∈ Z/p,

>  **| h(a) − D/p | ≤ 2·3^{π(x)−1}**,

hence every copy loses **K(k) = 2D/p + E with |E| ≤ 4·3^{π(x)−1}**, uniformly
in k and in p.

*Proof.* The slot indicator is Π_{q≤x}(1 − 1[q|r] − 1[q|r+2]), with the two
inner terms coinciding at q = 2. Expanding gives 2·3^{π(x)−1} terms, each of
them ± the count of r ∈ [0, W) in one residue class modulo d·p for a squarefree
d | W. Since gcd(d·p, ·) splits and W/d is an integer, each such count is
W/(dp) + θ with |θ| < 1. The main terms sum to (W/2p)·Π_{3≤q≤x}(1−2/q) = D/p and
there are 2·3^{π(x)−1} error terms. ∎

**Sharper, by a proven constant factor of 53.9.** `research/level-ledger-tight.md`
proves, for every x ≥ 17, every prime p > x and every a,

>  **| h(a) − D/p | ≤ 27.019392 · 3^{π(x)−7} + 1/2**,

against the 2·3^{π(x)−1} above, and hence K(k) = 2D/p + E with
|E| ≤ 2·(27.019392·3^{π(x)−7} + 1/2). At T₂₃ that is 243.7 rather than 13,122
(2·3⁶/27.019392 = 53.96, verified independently). Use the tight form; the
expansion argument above is what makes the shape of the bound visible, not the
best constant available.

**It is not a vacuous bound.** ln D ≈ θ(x) ≈ x while ln(3^{π(x)}) ≈ 1.0986·x/ln x,
so the relative error 2p·3^{π(x)}/D is **exp(−x(1+o(1)))** whichever constant is
in front. Numerically the tight bound crosses below the mean at x = 11 and then
collapses:

| tile | fold p | mean 2D/p | true max deviation | K-level bound 4·3^{π(x)−1} | tight K-level bound | tight/mean |
|---|---|---|---|---|---|---|
| T₁₃ | 17 | 174.71 | 5.7 | 9.72e2 | 19.0 | 0.109 |
| T₁₇ | 19 | 2,344.74 | 6.3 | 2.92e3 | 55.0 | 0.023 |
| T₁₉ | 23 | 32,928.26 | 6.7 | 8.75e3 | 163.1 | **4.95e−3** |
| T₂₃ | 29 | 548,425.86 | 23.9 | 2.62e4 | 487.4 | **8.89e−4** |

Both bound columns are K-level, that is twice the corresponding bound on h stated
in the theorems, because K(k) = h(a_k) + h(a_k − 2) sums two values of h.

So the counting half of Chris's question is **closed, unconditionally**: the
original tile section takes its exact fair share 2D/p, with a provable error that
is superexponentially small relative to it. Nothing about the location of primes
enters, and nothing is assumed.

## 3. What the truth actually is (MEASURED)

Even the tight bound is loose by a factor of about 20 at T₂₃, 487.4 against a
true max deviation of 23.9, and the untightened one by three orders of magnitude.
The real ledger at T₂₃ folded by 29, mean 548,425.86 kills per copy:

| tile | fold p | D | mean 2D/p | K(0) | min K | max K | sd(K) | sd/√(2D/p) |
|---|---|---|---|---|---|---|---|---|
| T₇ | 11 | 15 | 2.73 | 2 | 1 | 4 | 1.21 | 0.734 |
| T₁₁ | 13 | 135 | 20.77 | 21 | 20 | 23 | 0.89 | 0.195 |
| T₁₃ | 17 | 1,485 | 174.71 | 173 | 169 | 178 | 2.82 | 0.214 |
| T₁₇ | 19 | 22,275 | 2,344.74 | 2,347 | 2,340 | 2,351 | 3.29 | 0.068 |
| T₁₉ | 23 | 378,675 | 32,928.26 | 32,930 | 32,923 | 32,935 | 3.45 | 0.019 |
| T₂₃ | 29 | 7,952,175 | 548,425.86 | 548,411 | 548,402 | 548,442 | 13.40 | 0.018 |

**The spread is not square-root sized, and that is the finding.** A binomial
model would put sd at √(2D/p) = 741 at T₂₃; the truth is 13.4. The absolute
spread barely moves as the mean grows by four orders of magnitude, so the
worst-copy deviation as a fraction of the mean falls like 6.3e−1, 1.1e−1,
3.3e−2, 2.7e−3, 2.1e−4, 4.4e−5 across the six folds. The copies are levelled far
beyond independence. This is sub-Poisson dispersion in the copy index, and not hyperuniformity in Torquato's sense (GLOSSARY, Hyperuniformity).

**The discrepancy's own growth cannot be read off the fold ladder (MEASURED).**
On the diagonal, at the smallest admissible p, max_a |h(a) − D/p| measures 1.36,
1.62, 3.35, 3.63, 6.13, 16.9 at x = 7 to 23. That sequence moves p and x
together, so it is not a growth law in either variable. The theorem quantifies
over all p > x, and maximised over p at fixed x the same quantity reads **2.87,
5.97, 12.03 at x = 11, 13, 17**, against the 1.62, 3.35, 3.63 the diagonal
shows: roughly a doubling per level, and roughly twice the diagonal reading at
every level. No exponential base should be fitted to either sequence, and the
diagonal one in particular should not be read as evidence about the constant in
the proven majorant.

## 4. The Mirror Ledger (PROVEN, VERIFIED 45 of 45)

**Theorem.** K(k) and K(p−1−k) differ by at most 1, and the discrepancy is
caused by exactly one slot.

*Proof.* The palindrome r ↦ W−2−r is an involution on the slot set of T_x. As a
map on representatives in [0, W) it is r ↦ W−2−r for every slot except r = W−1,
which is its own image (W−2−r = −1) but whose representative does not shift.
Hence h(a) = h((W−2−a) mod p) except for a defect of +1 at a = (W−1) mod p and
−1 at a = p−1. Under that reflection the 2-set of copy k maps to the 2-set of
copy p−1−k, giving K(k) = K(p−1−k) up to the single defect. ∎

VERIFIED at every (tile, prime) cell tested from T₇ to T₂₃, p ≤ 43: the
mismatch set is always exactly two residues, always with values +1 and −1,
always at the two predicted addresses, and max_k |K(k) − K(p−1−k)| is always
exactly 1. **The damage profile across the copies is a palindrome to within one
slot.** The first and last copies suffer identically.

## 5. Inside copy 0: the head deficit and the shoulder that pays it back

The total being level does not mean the damage is spread evenly along the copy.
It is not, and the shape has a mechanism.

**Head Lemma (PROVEN, VERIFIED at four folds).** On the fold ladder, where p is
the least prime above x, copy 0's kills below p² are contained in **{p, p²−2}**.

*Proof.* A kill at r < p² has p | r or p | r+2. If r = pt then t is x-rough and
t < p, and on the ladder there is no prime in (x, p), so t = 1 and r = p. If
r+2 = pt then t is x-rough with t ≤ p, so t = 1 or t = p; t = 1 gives r = p−2,
which is ≤ x and therefore never x-rough. Hence r = p²−2. ∎

Both survivors of that list are boundary objects rather than damage. The kill at
r = p is a **self-strike**, which the repo already proves means the twin pair
(p, p+2) has been FOUND, not destroyed. The kill at r = p²−2 sits exactly at the
crystallisation frontier and is the leading edge of the **stratum** at p². Inside
the crystallised head proper the fold does nothing at all. Measured:

| tile | fold p | slots < p² | kills < p² | which |
|---|---|---|---|---|
| T₁₃ | 17 | 16 | 1 | 17 (self-strike) |
| T₁₇ | 19 | 18 | 1 | 359 = 19²−2 |
| T₁₉ | 23 | 21 | 0 | – |
| T₂₃ | 29 | 30 | 2 | 29 (self-strike), 839 = 29²−2 |

**The mechanism above the head.** Copy 0 deletes r = pt and r = pt−2, and both
families need t to be x-rough. So a kill sitting at position y is p times a rough
number of size y/p: in the roughness variable u = ln y / ln x it samples the
rough-pair density curve **one full step earlier** than a slot at the same
position does, at u − ln p/ln x, and ln p/ln x is 1.065 and 1.074 at the two
deepest folds. The repo's Unification Law gives that curve as ρ(u) = e^{2γ}/u²
for 1 ≤ u ≤ 2, continuing as (e^γ·ω(u))² above. It does **not** decrease to 1 from
above. It falls from e^{2γ} = 3.1722 at u = 1, crosses 1 at u = e^γ = 1.781,
undershoots to **ρ(2) = e^{2γ}/4 = 0.79305** at u = 2, and only then returns to 1
from below. So the kill profile is the slot profile translated toward the head:

> **zero in the head, then above average on the shoulder, then a shallow dip
> below average, then flat.**

MEASURED, T₂₃ folded by 29, kills per slot as a multiple of the fair rate 2/p:

| u band | position band | slots | kills | ratio to fair |
|---|---|---|---|---|
| 1.02–1.79 | 25 – 272 | 14 | 1 | (the self-strike) |
| 1.79–2.04 | 272 – 606 | 9 | 0 | 0.000 |
| 2.04–2.30 | 606 – 1,350 | 22 | 3 | **1.977** |
| 2.30–2.55 | 1.4e3 – 3.0e3 | 60 | 5 | 1.208 |
| 2.55–2.81 | 3.0e3 – 6.7e3 | 136 | 11 | 1.173 |
| 2.81–3.07 | 6.7e3 – 1.5e4 | 296 | 19 | 0.931 |
| 3.32–3.58 | 3.3e4 – 7.4e4 | 1,455 | 103 | 1.026 |
| 4.09–4.34 | 3.7e5 – 8.2e5 | 16,090 | 1,110 | 1.000 |
| 5.88–6.13 | 1.0e8 – 2.2e8 | 4,382,479 | 302,222 | 1.000 |

The overshoot is a clean factor of about 2 in the first live band, exactly where
the shifted curve predicts it, and the profile is locked at 1.000 from u ≈ 4.1
onward. The single sub-unit band, 0.931 at u = 2.81 to 3.07, is the ρ(2) trough
seen through the shift: those kills sample the curve at u′ = 1.74 to 2.00, where
ρ runs 1.048 down to 0.79305, mean 0.91 against the measured 0.931. The dip is
predicted, not noise. The running ledger levels fast: kills-so-far over fair-share-so-far
reads 0.97, 1.32, 1.25, 1.20, 1.11, 1.04, 0.99, 0.98, 1.002, 0.993 at
Y = p², 2p², 4p², … 512p², then 1.0000, 0.9989, 1.0000, 1.0000 at
Y = 10³p², 4.1·10³p², 6.6·10⁴p² and the end of the copy. *(The tail used to read
"1.0000 from Y = 10³p² to the end of the copy"; `fold-profile-03`'s S1 table
prints 0.9989 in the row after 10³p², so the ledger reaches 1.0000, wobbles once
in the fourth decimal, and then holds. Corrected 2026-08-18.)*

**So the head deficit and the shoulder excess are the same displacement seen
twice, and they cancel.** That cancellation is what §2 and §3 measure as a
relative error of 2.7e−5. Copy 0 is not protected. It is protected only where it
is crystallised, and it pays that back immediately above the frontier.

This restates A6 reading 10 with the mechanism named. A6 measured copy 0 going
from perfectly quiet to 38% above average by 16p² and becoming the worst copy of
the p; the cause is the one-unit shift in u, and the consequence is that the
advantage is exactly co-extensive with crystallisation, as A6 said.

## 6. The negative, and it prunes a line (MEASURED, 48 cells)

If kill count predicted damage, the fold multiplier would have a cheap proxy:
find the fattest residue class and look only there. It does not.

Over 48 (tile, prime) cells from T₁₁ to T₂₃:

- mean Pearson correlation between kills(a) and dmg(a) is **0.057**, sd 0.241;
  restricted to T₁₇ and deeper, **0.008**;
- the max-kill anchor's mean rank in the damage order, as a fraction of the
  uniform null (p+1)/2, is **0.763** (0.745 at depth), where 1.000 is no
  information;
- the max-kill anchor IS the record anchor in 3 of 48 cells against 1.47
  expected by chance.

**Kill count carries essentially no information about which copy makes the
record gap.** That is the misalignment principle in a third form: the fold's
severity is about where the kills land relative to each other, not how many
there are. It also closes the obvious shortcut, and it is consistent with A5 and
A8, where what matters is adjacency and alternation rather than volume.

## 7. What this buys, stated honestly

**It buys a closed sub-question and a clean separation.** The counting half is
now a theorem with an effective constant and no hypotheses. That is worth having
because it is the first place in this programme where an interval-looking
question turned out to be free.

**And it says why it was free, which is the useful part.** The window here is the
whole old tile, of width x#, against a conductor of x# and a new modulus p. The
window is enormous relative to everything else, so the triage rule's hard case
never arises. The moment the window shrinks inside the copy, the same question
becomes the initial-segment density of a two-dimensional sieve, which is the
Buchstab/parity object of `research/bv-import-survey.md` §3.3 and the open band
2 < u < 4.266. §5 measures that object; it does not bound it.

**It does not buy anything against L or κ(m).** §6 is the reason: the quantity
this note controls is provably uninformative about the quantity the Zone
Postulate route needs. The right reading is that the fold's counting structure
and the fold's severity structure are independent, and only the second one is
hard.

## 8. The natal cohort: dispersion, and the lineage identity

*(Chris, 2026-08-17: the cohort born at fold p comes from multiplying by every
earlier prime, so it is inherently misaligned with everything that came before.
Can that be used to show the later primes cannot remove all of it? The answer is
a real theorem that does not reach. Where §§1-7 ask where a fold's damage lands,
this section asks what happens to one birth cohort over its whole life.)*

**The cohort.** Folding T_x of width W by p lays p copies, so the edge slot
W − 1 reappears at kW − 1 for k = 1…p. The k = p copy becomes the new edge; of
the other p − 1, exactly two are struck, at k ≡ ±W^{−1} (mod p). So

> **natal@p = { kW − 1 : 1 ≤ k ≤ p−1, k ≢ ±W^{−1} (mod p) }, of size p − 3.**

**Natal Dispersion Lemma (PROVEN, one line; VERIFIED, never exceeded).** For any
prime q > p, the fold by q removes **at most two** members of natal@p.

*Proof.* gcd(W, q) = 1 and q > p − 1, so k ↦ kW − 1 is injective mod q on
k ∈ [1, p−1]. Each of q's two struck classes therefore holds at most one member
of the cohort. ∎

*Consequence.* After the next m folds at least p − 3 − 2m natal slots survive,
so the cohort cannot be emptied before m = (p−3)/2 further primes. Verified on
the ladder p = 7…31: the maximum killed by any single q is 1 or 2 at every
level, never 3. Custody: (alive at the fold limit) + (self-struck) equals the
cohort's genuine twin count at every row, since a member only ever leaves by a
composite factor or by its own prime.

**And the bound is tight, which is why the lemma does not reach.** At q just
above p the expected kills per fold are (p−3)·2/q ≈ 2, so the cohort really is
emptied on the schedule the lemma permits, by about q ~ p^{1.3}. Measured
half-lives on the ladder: the cohort at fold p is half gone by q = 59, 23, 31,
89, 43, 67, 89, 149 for p = 7…31. The lemma's budget of (p−3)/2 further folds
reaches a sift level of only about Q ~ x·ln x/2, so in sieve currency
u = ln W / ln Q it protects down to **u ~ x/ln x** — which is not merely short
of the u = 2 certification needs, it is far **above** β₂ = 4.26645, meaning the
region the lemma protects is already covered by the standard sieve for free.
That is the first of the two reasons the natal creation engine is CLOSED.

**The second reason: the cohort is asymptotically empty.** Its expected genuine
twin content is (p−3)·e^{2γ}ln²x/ln²W ~ 3.17 ln²x / x → 0, since ln W = θ(x) ~ x.
Measured against that prediction the cohort holds 4, 2, 4, 6, 2, 1, 7, 1 real
twin pairs at p = 7…31 against 2.98, 3.11, 2.61, 2.52, 2.10, 2.03, 2.07, 1.78
predicted; projected forward it is 1.1 at x = 37, 0.15 at x = 1000 and 6.1e−4 at
x = 10⁶. The natal term is likewise a rounding error in the fold law
D_new = 1 + carried·(p−2) + (p−3): its share of D_new falls 2.67e−1, 5.93e−2,
6.73e−3, 6.29e−4, 4.23e−5, 2.52e−6, 1.21e−7, **4.50e−9** at folds 7 through 31.
The population is carried, not created.

**The lineage census (EXACT on the tile, MEASURED on real twin primes).** A
slot's birth level is well defined — it is the first primorial modulus at which
r stops being ≡ −1 — so the whole census splits by birth fold, and the split is
the same fraction at every later level:

| birth level y | share (y−3)/D_y | cumulative | slots of T₂₃ | twin pairs below 10⁸ |
|---|---|---|---|---|
| 5 | 6.6667e−1 | 0.666667 | 5,301,450 | 293,795 |
| 7 | 2.6667e−1 | 0.933333 | 2,120,580 | 117,287 |
| 11 | 5.9259e−2 | 0.992593 | 471,240 | 25,974 |
| 13 | 6.7340e−3 | 0.999327 | 53,550 | 2,977 |
| 17 | 6.2851e−4 | 0.999955 | 4,998 | 259 |
| 19 | 4.2253e−5 | 0.999997 | 336 | 19 |
| 23 | 2.5150e−6 | 1.000000 | 20 | 0 |

The T₂₃ column matches the predicted share to six decimals at every level and
all 7,952,175 slots classify, with the residue being the eternal-edge lineage of
share 1/D_x. The twin-prime column is the same law measured on the truth: 440,311
real pairs from (5,7) up to 10⁸ (the 440,312nd is (3,5), below the comb), ratios
0.94 to 1.02 against prediction. **99.93% of the tile's twin slots, and 99.94%
of the real twin primes below 10⁸, are born at level ≤ 13.**

**The lineage identity (EXACT at every level).** A later-born lineage is rarer
and individually better, and the two factors cancel exactly:

> **rarity (y−3)/y# × quality m̄(y) = (y−3)/D_y = the share,**

where m̄(y) = y#/D_y is the tile's mean twin-slot gap at level y. The quality
factor is not a fit: a lineage born at level y has already passed the sieve by
every prime up to y, so its members are enriched over raw integers by exactly
m̄(y), and the measured yield ratios track m̄(y)/m̄(5) at 0.998, 0.995, 1.003,
0.935, 1.020 for y = 7…19. So lineage 19 is 2.56× better per candidate than
lineage 5 and 1.6e4× rarer, and rarity wins overwhelmingly. **There is no
favourable lineage to select**, and the identity says why the search was
hopeless rather than merely unsuccessful.

**Reproduction.** `research/fold-profile-09-natal-dispersion.js` (the cohort,
its twin content, the lemma verified, the reach), `-10-lineage-census.js` (the
predicted split, the same on T₂₃ slot by slot, the same on real twin primes
below 10⁸, the natal term's share of the fold law), `-11-lineage-yield.js` (the
yield law and the exact rarity × quality trade). All three run in seconds.

## 9. Survival: what is left in the window after every later prime is folded in

*(Chris's follow-up, same day: fix the N-tile window, then keep folding. Can a
given amount be shown to survive inside the original window?)*

Fix the window [0, W) with W = 23#. It is a full period of T₂₃, so it starts with
exactly D = 7,952,175 slots and no error term anywhere. Now fold in 29, 31, 37,
and so on. Folding every prime up to √W = 14,937 leaves precisely the twin primes
above √W, so the whole curve is computable exactly, end to end, with no theory.

**The per-fold law is the fair share, and it holds far past where it is
provable (MEASURED).** Survivors inside the window after each fold, against the
predicted multiplier 1 − 2/p:

| fold p | survivors | removed | actual multiplier | 1 − 2/p | ratio |
|---|---|---|---|---|---|
| 29 | 7,403,764 | 548,411 | 0.93103635 | 0.931034 | 1.00000 |
| 31 | 6,926,117 | 477,647 | 0.93548592 | 0.935484 | 1.00000 |
| 37 | 6,551,741 | 374,376 | 0.94594720 | 0.945946 | 1.00000 |
| 53 | 5,474,897 | 214,635 | 0.96227546 | 0.962264 | 1.00001 |
| 89 | 4,361,681 | 100,407 | 0.97749775 | 0.977528 | 0.99997 |
| 109 | 3,953,878 | 74,147 | 0.98159222 | 0.981651 | 0.99994 |

So the Level Ledger of §2 keeps holding under iteration: every later prime takes
its fair 2/p of whatever is still alive inside the original window.

**The whole curve, exactly (MEASURED).** With u = ln W / ln y and
P(y) = W·(1/2)·Π_{3≤q≤y}(1−2/q):

| y | u | survivors S | S/P | regime |
|---|---|---|---|---|
| 23 | 6.129 | 7,952,175 | 1.0000 | the tile, exact |
| 43 | 5.111 | 5,942,314 | 1.0000 | Legendre still usable |
| 47 | 4.993 | 5,689,532 | 1.0000 | Legendre majorant dies here |
| 89 | 4.283 | 4,361,681 | 1.0000 | last fold inside the DHR region |
| 97 | 4.202 | 4,271,469 | 0.9999 | **open band begins** |
| 307 | 3.357 | 2,787,501 | 1.0024 | |
| 701 | 2.934 | 2,162,885 | 1.0138 | the pair-Buchstab overshoot |
| 3001 | 2.401 | 1,362,558 | 0.9456 | |
| 10007 | 2.087 | 939,253 | 0.8604 | the trough |
| 14929 | 2.000 | 895,790 | 0.8926 | **survivors ARE the twin primes** |

The end point is checked twice: the running count and a direct recount both give
895,790, and S/(2C₂W/ln²W) = 1.1238, the usual finite-size Hardy-Littlewood
overshoot at this height.

**The trough constant is confirmed a fourth time.** Asymptotically S/P at u = 2
is e^{2γ}/4 = 0.7931, the Unification Law value. The measured value is exactly
that times the finite-size factor: (e^{2γ}/4)·(S/HL) = **0.8912** against the
measured **0.8929**, both from `fold-profile-06-scale-free.js`'s summary line
at y = √W.

*(CITATION ADDED 2026-08-18, and it corrects a wave-5 finding rather than the
text. S/P at u = 2 has three published values at three sampling conventions and
neither this sentence nor the table above named which one it used:
**0.8926** is `fold-profile-05-survival-curve.js` at y = 14,929, the last prime
below the root, and is the figure in the table at the top of this section;
**0.8927** is `fold-profile-06`'s u = 2.000 table row; **0.8929** is
`fold-profile-06`'s y = √W summary line, "23#: S(√W) = 895,790, S/P = 0.8929,
S/HL = 1.1238, (e^{2γ}/4)·(S/HL) = 0.8912", which is where this sentence's pair
of numbers comes from and which is why they must be quoted together. Wave 5's
S2-19 read this as a digit slip on the ground that "neither figure is 0.8929".
Both figures are real; the defect was the missing citation.)*

### 9a. The law is scale free, and that is the decisive finding (MEASURED)

Run the same curve in three windows of different size and different character:
[0, 19#), [0, 23#), and the arbitrary [0, 5·10⁸) with no tile structure at all.
Plotted against u, they are the same curve:

| u | S/P in 19# | S/P in 23# | S/P in 5e8 | spread |
|---|---|---|---|---|
| 5.000 | 1.0000 | 1.0000 | 1.0000 | 0.0000 |
| 4.266 | 0.9999 | 1.0000 | 0.9999 | 0.0001 |
| 3.500 | 1.0010 | 1.0005 | 1.0001 | 0.0009 |
| 3.000 | 1.0116 | 1.0132 | 1.0134 | 0.0019 |
| 2.500 | 0.9664 | 0.9707 | 0.9723 | 0.0059 |
| 2.100 | 0.8823 | 0.8607 | 0.8580 | 0.0243 |
| 2.000 | 0.9232 | 0.8927 | 0.8880 | 0.0353 |

Agreement to four decimals over the provable region, and the residual spread at
u = 2 is entirely the finite-size Hardy-Littlewood factor, which is a function of
W alone and tends to 1.

**So S/P depends on u and on nothing else. The primorial window behaves exactly
like an arbitrary window of the same size.** Choosing a bigger tile moves W and
the target y together and buys nothing: the survival question is scale free, and
the tile is a picture of it rather than a lever on it.

### 9b. What is provable, in three tiers

1. **Legendre, i.e. the Level Ledger iterated.** Error majorant 3^{π(y)}, so the
   route survives while 1.0986·y/ln y < ln W ≈ x, giving y ≲ x·ln x. In the 23#
   window it dies at y = 47. Gives the count to arbitrary relative precision but
   only about ln x folds past the tile.
2. **Fundamental lemma, dimension 2.** S(y) = P(y)(1 + O(e^{−u ln u})) at any
   fixed u. This is what the 1.0000 column above is. It reaches every y in the
   table with a relative error that only becomes O(1) as u drops to a constant.
3. **DHR two-dimensional lower bound.** Positive survivors PROVEN only for
   u > β₂ = 4.26645, i.e. y < W^{1/4.26645} = 91 in this window. **The last fold
   that can be proved to leave anything is p = 89, with 4,361,681 survivors.**

Below u = 4.26645 nothing is proven, all the way down to u = 2 where positivity
for all W is the twin prime conjecture. So in this window the honest position is:
**4,361,681 survivors provable at y = 89; 895,790 actually survive to
y = 14,947; and no proof of positivity exists anywhere in between.**

### 9c. The asymmetry that decides it

Upper bounds on S(y) are free at every level, by Brun or Selberg. Lower bounds
die at u = 4.26645. Chris's question is a lower-bound question, so it inherits
the hard side of the two-dimensional sieve in full, and §9a says the fold frame
supplies no extra structure to attack it with. This is the same wall as
`research/bv-import-survey.md` §3.3 and `research/covering-dive.md`, reached from
a new direction and now measured exactly rather than cited.

## 11. The impact window: which folds can touch a fixed tile at all

*(Chris, 2026-08-17: "we can narrow the impact window. Say we start with the
11-tile: primes removed in the 11-tile will only happen until p·p is larger than
the 11-tile width.")*

**Impact Lemma (PROVEN, one line; VERIFIED exhaustively).** Sift the window
[0, W) by primes in increasing order. When the fold by p arrives, every prime
below p has already been folded, so a removal at r = p·t or r = p·t − 2 needs the
cofactor t to be rough with respect to every prime below p. Hence **t = 1 or
t ≥ p**, and the removal is at r ∈ {p−2, p} or at r ≥ p² − 2. Therefore:

1. once **p² > W + 2**, the only slots the fold can remove are r = p−2 and r = p;
2. both of those are **self-strikes**: r = p live means p and p+2 are both rough
   below p², so (p, p+2) is a twin prime pair, and likewise for r = p−2. Nothing
   is destroyed, a twin is FOUND and graduates;
3. so the number of folds that can do genuine damage to a fixed window is
   **finite and explicit: π(√(W+2)) − π(x)**.

This is crystallisation turned inside out. THE-LENS §1 states it for the HEAD of
a growing tile: [0, p′²) is final. Chris's form fixes the window instead and
bounds the *set of folds that can reach it*. Both are the same inequality read in
opposite directions, and the second one is the more useful shape for the fold
picture, because it says the infinite tower of folds is doing nothing.

**VERIFIED exhaustively.** Every fold, every removal, until the window is empty:

| window | folds with p² > W+2 | removals by them | with cofactor t ≠ 1 | not a twin pair |
|---|---|---|---|---|
| 11-tile, W = 2,310 | 64 | 64 | **0** | **0** |
| 13-tile, W = 30,030 | 456 | 456 | **0** | **0** |

Every single removal past √W is one slot, and every one of them is a genuine
twin prime pair graduating.

**The finite fold budget.**

| tile | W | √W | damaging folds π(√W) − π(x) | last damaging fold |
|---|---|---|---|---|
| T₁₁ | 2,310 | 48 | **10** | 47 |
| T₁₃ | 30,030 | 173 | 34 | 173 |
| T₁₇ | 510,510 | 715 | 120 | 709 |
| T₁₉ | 9,699,690 | 3,114 | 435 | 3,109 |
| T₂₃ | 223,092,870 | 14,936 | 1,739 | 14,929 |
| T₂₉ | 6,469,693,230 | 80,434 | 7,863 | 80,429 |

The 11-tile is settled by exactly ten folds: 13, 17, 19, 23, 29, 31, 37, 41, 43,
47. Those ten take it from 135 slots to 64, and the 64 that remain are twin
primes, collected one at a time by the next 64 folds.

**The second narrowing, same argument one level up (PROVEN, VERIFIED).** A
composite p-rough cofactor is at least p², so r = p·t ≥ p³. Hence once
**p > W^{1/3}** every removal has t = 1 or t prime, i.e. sits at a prime or a
semiprime. Checked in the 23# window (W^{1/3} = 606): composite-cofactor
removals from folds above 606 number **0**.

**Where the damage actually is (MEASURED, 23# window).** Total removed
7,056,385, from 7,952,175 down to 895,790:

| band of p | folds | removals | share | removals per fold |
|---|---|---|---|---|
| (23, 100] | 16 | 3,680,706 | **52.2%** | 230,044 |
| (100, 1,000] | 143 | 2,322,013 | 32.9% | 16,238 |
| (1,000, 10,000] | 1,061 | 1,010,032 | 14.3% | 952 |
| (10,000, 14,947] | 521 | 43,634 | 0.6% | 84 |

Sixteen folds do half the work. Cofactor classes over all 7,056,385 removals:
t = 1 gives 268 (the graduations), t prime gives 4,702,069 (66.6%), t composite
gives 2,354,048 (33.4%).

### 11a. What the narrowing is worth, honestly

**It is right, and it is the correct structural move.** The step "t = 1 or
t ≥ p" is exactly the first step of **Buchstab's identity**, and iterating it is
how the two-dimensional sieve is actually run. The t = 1 class is the
graduations, the t prime class is what the next level of the identity peels off,
and the DHR machinery spends its whole budget there. Arriving at it from the fold
picture unprompted is the right instinct.

**It does not shrink the problem, because the budget is still large.** The number
of damaging folds is π(√W) ≈ 2√W/ln W, which is 1,739 for the 23# window and
grows like √W. The Legendre error majorant 3^{π(√W)} is therefore astronomically
useless, which is §9b tier 1 restated. Narrowing the fold set from infinite to
π(√W) does not change the sifting parameter u, and §9a already showed u is all
that matters.

**What it does buy is a correct picture of what the tail folds do.** Past √W the
window is finished; every later fold is collection, not destruction. So the fold
tower is not an infinite regress and there is no need to control it. The whole
difficulty is compressed into the first π(√W) folds, and inside that, half of it
into the first sixteen.

## 12. The zone-localized gap, and why the natal ledger cannot reach it

*(Chris, 2026-08-17, three points: we only care about the max gap as it can
exist inside the zone; gap growth further down the tile is irrelevant; and the
Natal@X subsystem gives a formal creation law. Measured in
`research/fold-profile-08-zone-localized-gap.js`.)*

### 12a. Points 1 and 2 are right, and the payoff is a factor of x / 2ln x

Define M(x, Y) as the largest twin-slot gap of T_x among gaps starting below Y.
The Zone Postulate needs only M(x, x′²); the programme has been bounding
M(x, x#) = G₂ instead, a maximum over a tile of width e^x.

**MEASURED: M grows logarithmically in the window width.** At T₂₃, sampling
fourteen cuts across the tile, M/ln Y over the upper two thirds reads

  11.36, 11.92, 11.29, 11.09, 10.61   →   **M ≈ 12.2 · ln Y at T₂₃**

The coefficient is a reading at one level, not a constant. It is c(x)·m̄(x),
and c drifts with x along the diagonal (`research/maxgap-law.md`), so the 12.2
must not be carried to other levels. What transfers is the shape: M is
logarithmic in the window width. Restricting the window from the whole tile
(ln Y = θ(x) ≈ x) to the zone (ln Y = 2 ln x′) therefore divides the object by
**θ(x)/(2 ln x) ≈ x/(2 ln x)**.

| tile | G₂ | zone top | full margin | M(x, x′²) | localized margin |
|---|---|---|---|---|---|
| T₁₇ | 108 | 361 | 3.34 | 60 | **6.02** |
| T₁₉ | 150 | 529 | 3.53 | 72 | **7.35** |
| T₂₃ | 204 | 841 | 4.12 | 150 | **5.61** |

The reduction is only 1.4 to 2.1 at these levels because x/(2 ln x) is 3.67 at
x = 23. It runs away: 10.9 at x = 100, 72 at x = 10³, 3.6e4 at x = 10⁶, 2.4e7 at
x = 10⁹. So the two projections are

> full-tile: G₂ ≍ (ln W)^α against x′², **margin measured 3.3 to 4.1 on our
> ladder and flat at 2.2 for the dominating adversarial h₂; whether it grows at
> all depends on α, which is unresolved**
>
> localized: M(x, x²) ~ 2.9 to 4.2·ln³x against x′², **margin ~ x²/(4.4 ln³x) at the worst case across both engines → ∞** (band corrected 2026-08-29, `audit-cross-document-constants.md` A6; the 2.9 to 4.2 band is `maxgap-law.md` §8's engine, and this file's own engine at §12a below reads 2.14 to 4.39 on the x′² window)

The full-tile row cannot be improved by measurement. The exponent α is 1.50
central on the 22 trusted terms (h₂'s control figure stays 1.57) with
practical bracket 1.3 to 1.8 and floor 1, and the estimator that produced
those numbers overstates by +0.28 on a control whose answer is known
(`research/exponent-control.md` §5). At α = 2 the full-tile margin is a constant;
below 2 it grows; the data does not separate the cases.

The localized row does not have that problem. Measured directly to x = 4001,
M(x, x′²)/ln³x reads 2.14, 3.85, 4.39, 3.44, 3.33 at x = 101, 499, 1009, 2003,
4001, flat with no trend. **The localized gap grows polylogarithmically in x,
not as a power**, so its margin is unbounded whatever α turns out to be.

**That is what Chris's localization buys: it makes the margin unbounded
unconditionally, where the full-tile margin is unbounded only if α < 2.** It is
the largest single improvement in the target's shape recorded in this repo, and
it improves the truth rather than the proof (§12b).

### 12b. What it does and does not buy

**It does not help the sieve.** The proven bound G₂ ≪ x^{4.2665} comes from a
lower-bound sieve argument that is *position-independent*: it shows any interval
of that length contains a survivor, wherever it sits. So localizing improves the
TRUTH by x/2ln x and improves the PROVEN bound by nothing. The provable-to-true
gap widens rather than narrows.

**It does help our own recursion, and by a lot.** If the fold recursion is ever
made to work, the localized version can afford to lose a factor of x/ln x and
still land. Any bound on the fold multiplier that is lossy by a polylog factor is
fatal for G₂ and harmless for M.

**But the obvious way to spend that room has been tried and it fails, for a
reason that has nothing to do with the room.** The Localized Merge Lemma
(`research/LOCALIZED-GAP.md` §3) gets the per-fold index cost down to 1, which is
exactly the saving above. The telescope still dies, on a one-line averaging
argument: maxsum_m ≥ m·m̄ (Deficit Lemma) caps a block at x/(9.6 ln²x) folds
against the π(x) ≈ x/ln x it needs, short by 9.6 ln x whatever constant the gate
carries. MEASURED chain survival at Y = 10⁹: **1 fold at x = 16001 against the
1863 that π(16001) requires**, and 0 folds below x = 13933. Weakening the gate
does not repair it, because the gate feeds back and the resulting map has no
fixed point (`research/localized-04-maxsum.md` §§7, 10). So the localized room is
real and unspent; the merge chain is not how to spend it.

**And it removes the worst case at the source.** The G₂ recursion is
"max over the p′ 2-sets of the damage that deletion does" (THE-LENS §2), the
2-sets being {−kw, −kw−2} as k runs over the p′ copies. The head sits in
copy 0, which receives only the single alignment a = 0. **So the localized
recursion is single-alignment, not a maximum over p alignments**, and the
misalignment principle stops being a description and becomes a saving. Spent
2026-08-17: the saving is real and two orders of magnitude, and it lands on the
minority share of the object's growth (`research/localized-single-alignment.md`).

**Where the freeze ends, exactly.** By the Impact Lemma (§11) a fold by p touches
nothing below p² except the graduations, so [0, p²) is frozen and its recursion
is vacuous, which is A6's negative result. The window [0, p^k) for k ≥ 3 is NOT
frozen, since kills land at r = p·q for primes q in (p, p^{k−1}). Measured:

| tile | fold p | kills in [0,p²) | in [0,p³) | in [0,p⁴) | in all of copy 0 |
|---|---|---|---|---|---|
| T₁₇ | 19 | 1 | 33 | 598 | 2,347 |
| T₁₉ | 23 | 0 | 41 | 950 | 32,930 |
| T₂₃ | 29 | 2 | 63 | 1,745 | 548,411 |

So the object to track is **M(x, x^k) for a fixed k ≥ 3**: it dominates the zone
gap, it is only ~c·k·ln³x with c measured flat in 1.2 to 1.75 rather than the
tile's ~c·θ(x), and unlike the zone itself it carries a live recursion. That is a
concrete target and it is what Chris's first two points imply. Tried 2026-08-17
to x = 1613: the single-alignment multiplier is confirmed different in shape
from the tile's, and the growth-law route through the recursion is closed by
the window's own boundary term (`research/localized-single-alignment.md`).

**The standing caveat.** M(x, x^k) bounds the max twin-PRIME gap below x², since
the head is crystallised. So any such bound is still TPC-hard. Localizing changes
the shape of the difficulty and its margin; it does not remove it.

### 12c. Point 3, and why it pulls against points 1 and 2

**The Natal@X law is real** and the campaign that used it was large: ten attacks,
37 scripts, `research/NATAL-CAP-CAMPAIGN.md`. Its verdict is already recorded and
is not encouraging for a counting route. Per-prime removal is boxed tightly by
four independent instruments, but **no per-prime cap can close the first-order
union bound from x = 13 onward**, because Σ 2/q crosses 1 between @11 and @13 by
Mertens, found independently five times. Survival is paid entirely by overlap
credit, 47% of all strikes at @17. The Staircase Theorem does certify survivors
(≥ 34/110/82/1877 at @11/13/17/19) but those are twins in a TILE, not in a zone,
and they do not scale.

**And the deeper problem is structural: the natal ledger cannot see the zone at
all.**

*Head Monotonicity Lemma (PROVEN).* A position r < p² is a twin slot of T_p iff r and r+2 are
coprime to p#, which implies the same at every earlier level. So head membership
is monotone decreasing. **The head is pure attrition; nothing is ever created
there.**

*Concretely.* The natal@p cohort sits at the seam positions k·W_prev − 1, so its
lowest member is W_prev − 1. Against the zone top p²:

| fold p | zone top p² | lowest natal position | ratio |
|---|---|---|---|
| 13 | 169 | 2,309 | 13.7 |
| 17 | 289 | 30,029 | 104 |
| 23 | 529 | 9,699,689 | 1.8e4 |
| 29 | 841 | 223,092,869 | 2.6e5 |

The ratio explodes. **Births happen at the seams, deep in the tile; the zone only
ever loses members.** So points 1 and 2 and point 3 pull in opposite directions:
localizing to the zone freezes creation as thoroughly as it freezes destruction,
and the creation law has nothing to say about the window we care about.

The consistent reading of all three points together is therefore: keep the
localization, drop the creation ledger, and aim at **M(x, x^k) for k ≥ 3 under
the single-alignment recursion.**

## 10. Reproduction

- `research/fold-profile-01-per-copy.js` — the ledger, spread, the K-level
  inclusion-exclusion bound 4·3^{π(x)−1}, count-vs-damage on the ladder.
  Custody: the G₂(new) column reproduces 30, 42, 66, 108, 150, 204, 258. The
  tight constant of §2 is proved and tabulated separately, in
  `research/level-ledger-tight.md`.
- `research/fold-profile-02-deviation-law.js` — N(a) = p·h(a) − D in full, the
  grid over p ≤ 401, the near-palindrome test.
- `research/fold-profile-03-inside-copy0.js` — the exact positional ledger over
  the whole of copy 0, the cumulative view, the shift test, the Head Lemma.
- `research/fold-profile-04-count-vs-damage.js` — the 48-cell grid behind §6.
- `research/fold-profile-05-survival-curve.js` — §9, the exact survival curve in
  the 23# window from u = 6.13 to u = 2.00. Custody: the start is D = 7,952,175
  and the end is recounted directly.
- `research/fold-profile-06-scale-free.js` — §9a, the same curve in three
  windows, collapsed against u.
- `research/fold-profile-07-impact-window.js` — §11, the Impact Lemma verified
  exhaustively in the 11-tile and 13-tile, the fold budget, the second
  narrowing at W^{1/3}, and the cofactor classes.
- `research/fold-profile-08-zone-localized-gap.js` — §12, M(x, Y) against ln Y,
  the localized margin, where the freeze ends, and the natal-reach table.
- `research/fold-profile-09-natal-dispersion.js` — §8, the cohort, its twin
  content, the Natal Dispersion Lemma verified on the ladder p = 7..31, and the
  reach against the depth certification needs.
- `research/fold-profile-10-lineage-census.js` — §8, the lineage split predicted,
  then measured on T₂₃ slot by slot and on the real twin primes below 10⁸.
  Custody: all 7,952,175 slots of T₂₃ classify, and the twin count is 440,311
  from (5,7) up.
- `research/fold-profile-11-lineage-yield.js` — §8, the yield law against m̄(y)
  and the exact rarity × quality identity.

**The variance-deficit group, 12 to 16, which has no prose home in this
document.** These five were written on 2026-08-17, were added to this index on
2026-08-18, and carry a real NEGATIVE result that is stated nowhere in the body:
the twin-prime variance deficit in these tiles is the classical short-interval
variance and is **not** a tile phenomenon. Until the body carries it, these
entries are the only place it is written down in the research layer.

- `research/fold-profile-12-anatomy-survival.js` — is twin-prime survival above
  the tile mean at any anatomical landmark (start, end, middle, seams)? It is
  not. Source of the seam-slot survival ratios `ATTACKS2.md` row 1 quotes.
- `research/fold-profile-13-hotspot-sweep.js` — the sliding sweep that closes
  12's three coverage gaps, including a 44,607-window dyadic scan. Its one
  surviving positive excess is a skew artefact of the estimator's threshold,
  settled by simulation in wave 6.
- `research/fold-profile-13-null-mc.js` — that simulation, written to be run
  rather than described. It builds the real T23 slot geometry, sprinkles twins
  independently at the measured rate, and runs 13's own scoring code path, so
  the retirement of 13's one positive rests on a printed block instead of a
  scratch run nobody kept. Verdict: max z = 4.90 sits at the median of the
  null, and the sd of the null z is ~1 with a positive skew that
  `sqrt(2 ln n)` does not price.
- `research/fold-profile-14-underdispersion.js` — is the sub-binomial dispersion
  real or the estimator's? Real: a seeded synthetic control at the same smooth
  rate disperses at 1.009, 0.994, 0.960 through the identical pipeline while the
  real data gives 0.962, 0.921, 0.838.
- `research/fold-profile-15-variance-law.js` — what law the deficit follows.
  Under-powered: eleven of its twenty-one rows sit below the ~150 window pairs
  its estimator needs, and once its own control is subtracted the slope reads
  +0.23, −0.05 and +0.025 across three tiles. A weighted refit is the open item.
- `research/fold-profile-16-is-it-the-tile.js` — is the deficit a tile
  phenomenon at all? It is not; it is the classical short-interval variance.

All sixteen run in seconds — measured 2026-08-18, 0.09 s to 7.33 s each,
**34.6 s for the whole family**, none of them needing the `--max-old-space-size`
their Run: lines carry. *(This paragraph read "All eleven run in seconds" and the
index stopped at 11 until 2026-08-18; the five listed above were missing, and
13 to 16 had no prose home anywhere in the body layer. Wave 5's S2-19 and S2-20
raised it and wave 6's partition V measured the runtimes.)* 01 to 04 never store
a tile as positions; 05 and 06 hold one roughness map and update the pair count
incrementally, so the whole sieve to √W costs Σ_p W/p rather than (number of
primes) × W.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
