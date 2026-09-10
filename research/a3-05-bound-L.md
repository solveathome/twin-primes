# A3-05: bounding L from run consistency, and where that stops

<!-- ledger
id: Q-a3-05-bound-L
status: PARTIAL
todo: none
question: Can L be bounded unconditionally from run consistency, and where does that stop?
verdict: Theorem B gives the first unconditional bound, L <= 1 + m*, sitting 0 to 3 above the truth at all eight measured folds, but it is of order G2(old)/p, which is linear in x on the fold diagonal; section 8 locates the wall at one large-deviation hypothesis H″ the residue side cannot reach, and Theorem C inherits it for kappa(m).
-->

*(2026-08-16. Attack A5 of `research/ATTACKS3.md`, the one flagged as mattering
most, because a proven bound on L closes the single hole in U-FRAME section 5a.
Code and pasted output: `research/a3-05-bound-L.js`. Calibration is marked on
every claim: PROVEN, VERIFIED by exact computation, MEASURED, REFUTED.)*

## What came out of it

We prove the exact combinatorial law behind condition (ii) and turn it into an
unconditional upper bound on L. The bound is real and it is the first one, but
it is of the wrong order: it gives L = O(G2(old)/p), which along the fold
diagonal is linear in x, which is the branch on which the route fails. We then
show that this is not a defect of our argument. The residue side of the problem
is exhausted by the law we prove, and the exact quantity that remains is a
large deviation statement about consecutive grain gaps, stated below as
hypothesis H''. Section 8 locates the wall to that one hypothesis and says what
would be needed to pass it.

The central lemma never uses adjacency, so it applies verbatim to kappa(m), the
kill count inside a stretch that becomes m new gaps, which attack A4 identifies
as the object the recursion actually needs. That is Theorem C in section 8a. It
holds at every fold and every m up to 8. It also inherits the same wall, so
moving the target from L to kappa buys tightness and buys nothing against the
obstruction.

Section 9 establishes the L diagonal by three independent routes and locates the
state-machine fault that had `research/Lgrowth.js` reporting 3 at fold 29. That
file has since been corrected.

## 1. Setting

Fix x >= 5, let W = x# and let T_x be the twin slot tile, the residues s modulo
W with gcd(s(s+2), W) = 1, listed in increasing order s_1 < ... < s_N inside
[0, W) and read cyclically. Every slot is congruent to 5 modulo 6, so every gap
g_i = s_{i+1} - s_i is a positive multiple of 6. Write G2 for the largest gap
and mbar = W/N for the mean gap.

Fold by a prime p > x. Since gcd(W, p) = 1, copy k deletes exactly the slots
whose residue modulo p lies in the 2-set {-kW, -kW-2}, and as k runs over the p
copies those 2-sets run over all p sets {a, a-2}. So

> L = L(T_x, p) is the largest number of cyclically consecutive slots whose
> residues modulo p all lie in one set {a, a-2}.

## 2. The alternation law (PROVEN)

**Lemma 1.** Suppose s_j and s_{j+1} both lie in {a, a-2} modulo p, with p > 2.
Then g_j is congruent to 0, +2 or -2 modulo p. More precisely, if s_j = a then
g_j is 0 or -2, and if s_j = a-2 then g_j is 0 or +2.

*Proof.* The two elements of the set differ by 2 and are distinct because
p > 2. The gap is the difference of two elements of a two element set, so it is
0 or plus or minus their difference. The refinement is the statement that from
a you can only stay at a or step down to a-2, and from a-2 you can only stay or
step up. QED

So a run is a walk on two states. The gaps congruent to 0 keep the state and
the gaps congruent to plus or minus 2 switch it, which forces the nonzero
classes along a run to alternate. That is condition (ii) of the attack brief,
in the sharp form we will use: **the class word of a run is a walk on two
states, not merely a word avoiding three distinct residues.**

## 3. The qualifying values, exactly (PROVEN, VERIFIED)

Condition (ii) only becomes useful once we know which gap VALUES sit in which
class. Because gaps are multiples of 6 and p is coprime to 6, each class is a
single arithmetic progression of modulus 6p, and which one depends on p modulo
6. Write eta = +1 when p = 1 (mod 6) and eta = -1 when p = 5 (mod 6).

**Lemma 2.** Let g be a positive multiple of 6. Then

| class | g congruent to | the set of legal g | least member |
|---|---|---|---|
| 0 | 0 (mod p) | 6p + 6p*N | 6p |
| +2 | +2 (mod p) | (3+eta)p + 2 + 6p*N | (3+eta)p + 2 |
| -2 | -2 (mod p) | (3-eta)p - 2 + 6p*N | (3-eta)p - 2 |

*Proof.* For class 0, g is divisible by p and by 6 and gcd(6, p) = 1, so 6p
divides g. For class +2 write g = 2 + mp and solve 6 | 2 + mp for m modulo 6.
When p = 1 (mod 6) this reads 2 + m = 0, so m = 4 = 3 + eta. When p = 5 (mod 6)
it reads 2 + 5m = 0, so m = 2 = 3 + eta. Class -2 is the same computation with
g = mp - 2 and gives m = 3 - eta. QED

Two consequences worth naming.

**The least members swap with p modulo 6.** When p = 1 (mod 6) the cheap class
is -2, at 2p - 2, and the expensive one is +2, at 4p + 2. When p = 5 (mod 6)
they trade places, 2p + 2 and 4p - 2. So the folding prime's residue modulo 6
decides which direction of the two state walk is cheap, and the cheap step is
always about 2p while the return step is always about 4p.

**The identity that carries the whole argument.**

> min(class +2) + min(class -2) = (3+eta)p + 2 + (3-eta)p - 2 = 6p = min(class 0).

Exactly 6p, with no error term, for both residues of p modulo 6.

**VERIFIED.** Reading 2 of the output enumerates every multiple of 6 up to G2
and compares the resulting sets against the three progressions. They agree at
all eight folds. The qualifying sets it produces are {12}, {24}, {24}, {36, 66},
{36, 78}, {48, 90, 138}, {60, 114, 174}, {60, 126, 186, 246} at folds 7, 11,
13, 17, 19, 23, 29, 31, which reproduces the U-FRAME section 5 table exactly.

Fold 11 deserves a note. The law predicts a single qualifying value 24 below
G2(T_7) = 30, and U-FRAME records that fold as having no qualifying gap at all.
Both are right: 24 is legal, but the gap set of T_7 is {6, 12, 18, 30} and does
not contain 24. So the L = 1 at fold 11 is not forced by the residue law, it is
an accident of which values happen to occur. That distinction is the whole
subject of section 8.

## 4. The Run Cost Theorem (PROVEN, VERIFIED with equality)

**Theorem A.** Inside a run, any two adjacent gaps sum to at least 6p.

*Proof.* By Lemma 1 the two gaps are a pair of steps of the two state walk. If
either is in class 0 it is at least 6p by Lemma 2 and the other is positive. If
both are nonzero they switch state twice, so one is in class +2 and the other
in class -2, and by Lemma 2 their sum is at least min(class +2) + min(class -2),
which is exactly 6p. QED

**Corollary A1 (the cost floor).** Let m = L - 1 be the number of gaps in a run
and let c_min(m) be the least possible value of their sum. Then

> c_min(m) = 3pm for m even, and c_min(m) = 3pm - p - 2*eta for m odd,

*(Sign corrected 2026-08-18. This line read `- p + 2*eta` and disagreed with
the DP that produces every printed number in this file, at **all eight folds**:
at m = 1 the DP prints 12, 24, 24, 36, 36, 48, 60, 60 for p = 7..31, which is
`2p - 2*eta` and never `2p + 2*eta`. The corollary's own next sentence already
said `2p - 2*eta`, as do Corollary A2 and section 8, so the displayed formula
was the single odd one out. **Theorem B is unaffected**: its proof uses only
the worst-case inequality `c_min(m) >= 3pm - p - 2` below, which holds under
either sign and is unchanged.)*

so in all cases c_min(m) >= 3pm - p - 2. Pair up the gaps and apply Theorem A;
a leftover single gap costs at least the smaller class minimum, 2p - 2*eta.

**Corollary A2.** L >= 2 forces G2(T_x) >= 2p - 2*eta, and L >= 3 forces
G2(T_x) >= 4p + 2*eta. The second is the useful one: a run of three needs one
gap from the expensive class, or a gap divisible by 6p, and either way a single
gap of size about 4p has to be present.

**VERIFIED, and sharply.** Reading 4 extracts the actual gap sequence of the
extremal run at every fold and compares its span against c_min(L-1):

| fold p | L | the L-1 gaps, with class | span | c_min(L-1) |
|---|---|---|---|---|
| 7 | 2 | 12 (-2) | 12 | 12 |
| 11 | 1 | none | 0 | 0 |
| 13 | 2 | 24 (-2) | 24 | 24 |
| 17 | 2 | 36 (+2) | 36 | 36 |
| 19 | 2 | 36 (-2) | 36 | 36 |
| 23 | 3 | 48 (+2), 90 (-2) | 138 | 138 |
| 29 | 2 | 60 (+2) | 60 | 60 |
| 31 | 4 | 60 (-2), 126 (+2), 60 (-2) | 246 | 246 |

Equality at every fold with L >= 2, all seven of them. The extremal run always
uses the cheapest legal word, alternating between the two cheapest class
representatives. Theorem A is therefore not merely valid, it is attained, which
is the evidence that the residue side has nothing more to give.

Corollary A2 is also sharp where it bites. At fold 7 it requires G2 >= 30
against G2(T_5) = 12, at fold 11 it requires G2 >= 42 against G2(T_7) = 30, and
at fold 13 it requires G2 >= 54 against G2(T_11) = 42, so it proves L <= 2
outright at all three, and the truth there is 2, 1, 2. From fold 17 on, G2 has
overtaken 4p and the corollary goes silent, which is exactly what one expects
from a criterion linear in p tested against a quantity growing like x squared.

## 5. Theorem B: the unconditional bound

**Theorem B.** L <= 1 + m*, where m* = max{m : maxsum_m(T_x) >= c_min(m)} and
maxsum_m is the largest sum of m cyclically consecutive gaps of T_x.

*Proof.* A run of length L has L-1 gaps whose sum is at most maxsum_{L-1} by
definition and at least c_min(L-1) by Corollary A1. QED

This is a genuine unconditional bound on L, expressed entirely in the old gap
word, and it is the first one. Reading 5 evaluates it:

| fold p | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 |
|---|---|---|---|---|---|---|---|---|
| bound from condition (i) alone | 3 | 2 | 8 | 5 | 11 | 8 | 10 | 13 |
| **Theorem B, using condition (ii)** | **2** | **2** | **2** | **4** | **4** | **4** | **5** | **6** |
| true L | 2 | 1 | 2 | 2 | 2 | 3 | 2 | 4 |

The condition (i) row replaces c_min(m) by m times the least qualifying value,
which is about 2pm; that is all condition (i) can say. Condition (ii) roughly
halves the bound, and it sits 0 to 3 above the truth at every fold.

## 6. What condition (ii) is worth, exactly

Condition (i) says every gap of a run is at least about 2p. Condition (ii) says
every adjacent PAIR is at least 6p, so the per gap floor rises from about 2p to
exactly 3p. That factor is exactly 3/2 and it cannot be improved, because the
identity min(class +2) + min(class -2) = 6p is exact and the extremal runs
attain it at every fold we can compute.

Read as a decay rate the same statement says this. If the tail of the gap
distribution behaves like exp(-d/mbar), then condition (i) makes a run cost
exp(-2p/mbar) per gap and condition (ii) makes it cost exp(-3p/mbar) per gap.
Since L is about ln N divided by the per gap rate, condition (ii) multiplies the
denominator by 3/2 and divides L by 3/2. It changes the constant. It does not
change which branch of the U-FRAME section 5a dichotomy we are on, because both
rates are proportional to p and the branch is decided by whether the tail is
exponential at scale 2p at all.

MEASURED, reading 6: the empirical exponent ln(1/f) taken class by class runs
above 3p/mbar rather than at it, which is why the observed L is smaller than
the model predicts. The tail is thinner than a pure exponential at the mean gap
scale, and reading 7 fits lambda*mbar between 1.30 and 1.88 rather than 1 on the
six tiles T_11 to T_29. T_7 reads 2.46 on fifteen slots and T_5 is too small to
fit at all, so the quoted band is the six tiles that carry weight and the one
tile outside it lies further from 1, not nearer. That is favourable to the route
and it is a measurement, not a theorem.

## 7. Why Theorem B cannot reach polylog

Theorem B compares maxsum_m against 3pm. Since maxsum_m >= G2 always, the
condition maxsum_m >= 3pm cannot fail until m exceeds about G2/(3p). So

> Theorem B can never prove L <= 1 + m for any m below G2(T_x)/(3p),

no matter how the gap word behaves. On the fold diagonal G2 measures about
0.55*(ln W)^2 over the reachable ladder, which with ln W = theta(x) ~ x is about
0.55x^2, while 3p is about 3x, so the ceiling sits at about 0.18x. The exponent
in that reading is not settled (1.50 for G2 on the 22 trusted terms against
1.57 for the h2 ceiling, practical bracket 1.3 to 1.8, hard floor 1;
`research/exponent-control.md` section 5, the 22-term refit, which says to
quote the two separately), but the ceiling does not
depend on settling it:
G2 is a positive power of x on any reading, so G2/(3p) is a positive power of x
and never polylog. **The bound is linear in x on the measured law and
super-polylog on any law consistent with the data.**

The reason is visible in one line: the sum condition lets a single record gap
pay for the whole window. Reading 8 confirms the mechanism, with the model
m* = (G2 - mbar)/(3p - mbar) tracking the measured m* to within one at five of
the eight folds and to within 1.51 at the other three.

*(CORRECTED 2026-08-18. This sentence used to read "tracking the measured m* to
within one at all seven folds", and both halves were wrong. Reading 8 has eight
rows, not seven, and the model misses by 1.51 at fold 17, 1.02 at fold 29 and
1.38 at fold 31; dropping the eighth row to make "seven" true still leaves two
of them failing. The model column reads 0.18, 0.84, 1.14, 1.49, 2.50, 2.87,
2.98, 3.62 against a measured 1, 1, 1, 3, 3, 3, 4, 5. The mechanism claim
survives -- a model with no fitted parameter that lands within 1.5 of an integer
sequence running 1 to 5 is still evidence that the record gap is what sets m* --
but it is not the clean agreement the old sentence asserted.)*

Fed back into the chain, L <= G2/(3p) gives G2(new) <= G2(old)*(1 + mbar/(3p))
plus a lower order term, hence ln G2(x#) <= ln 12 + sum over p <= x of
mbar(p)/(3p). That is the right shape to test, because the Zone Postulate budget
is a condition on the partial sums of ln c: sum_{p<=x} ln c(p) <= 2 ln x - ln 12
at every x, which differentiated along the primes one fold at a time gives the
sharp per-fold rate ln c(p) <= 2 ln p / p. Reading 8 evaluates the sum with the
exact mean gap mbar(x) = 6*prod_{5<=q<=x} q/(q-2) against that requirement:

| x | ln 12 + sum mbar/(3p) | 2 ln x | B closes |
|---|---|---|---|
| 37 | 5.45 | 7.22 | yes |
| 100 | 8.38 | 9.21 | yes |
| 1000 | 18.85 | 13.82 | **no** |
| 10^4 | 33.64 | 18.42 | **no** |
| 10^6 | 76.02 | 27.63 | **no** |

**Theorem B's branch survives to about x = 100 and then fails, permanently.** So
Theorem B on its own certifies the failing branch, which is to say it certifies
nothing about the Zone Postulate.

The polylog branch must be priced the same way, through the partial sums.
**It cannot be priced through the additive form G2 <= 12 + sum L*mbar**, which is
U-FRAME section 5a step 4 and is false: the neighbour a record gap absorbs is
drawn from the same fat tail as the record, not from the mean, and the
substitution fails outright at two of seven folds. Priced correctly through
section 5a step 3, the branch goes through iff **L <= 0.19 to 0.31 * p / ln p**
on average over the ladder (`research/gate-multiplies.md` section 8, PROVEN
given the measured G2, mbar and rho laws; three measured laws feed those
constants at once, so 0.19 to 0.31 carries one significant figure and no more).
A polylog L of order ln^2 p clears that from about p ~ 800 onward. The distance
from Theorem B's proven 0.18 p to that requirement is a factor
**0.58 to 0.95 ln p** (0.18/0.31 and 0.18/0.19), and nothing else. The two ends
are the two readings of rho, 1.5 and 2.4, and rho is not monotone in the level,
so neither end may be presented as the one a trend favours.

## 8. The wall, located

Everything above uses only the residue conditions, and by the equality in
section 4 those are used to the last unit. What remains is a statement
about which gap values actually occur, and where.

The sharp remaining reduction is the per gap one rather than the sum one.
Writing theta = 2p - 2*eta for the least qualifying value and R(theta) for the
longest run of consecutive gaps of T_x that are all at least theta, we have

> L <= 1 + R(theta), PROVEN, since every gap of a run is qualifying and every
> qualifying value is at least theta.

Measured, R(theta) + 1 reads 3, 2, 4, 3, 5, 4, 5, 6 along the diagonal against
the true 2, 1, 2, 2, 2, 3, 2, 4, so it is comparable to Theorem B, and it is the
version that could in principle be polylog, because it does not let one record
gap subsidise anything.

Bounding R(theta) is an interval statement. A run of m consecutive gaps all at
least theta is an interval of length at least theta*m containing exactly m+1
twin slots of T_x, against an expectation of theta*m/mbar, which is about
2xm/ln^2 x. The deficiency factor is 2x/ln^2 x, and it has to be ruled out at
interval length theta*m with m polylogarithmic, that is at length x^{1+o(1)}.

Three things make that the hard kind of statement, and it is worth being precise
about each.

**It is a lower bound sieve question in the regime where lower bound sieves do
not exist.** Counting survivors of the sieve by all primes up to x from below in
an interval of length ell is a two dimensional sieve problem with sifting
parameter s = ln(ell)/ln(x). Lower bounds require s above the sifting limit,
which for dimension 2 is beta_2 = 4.26645 (DHR, rigorous to twenty places in
Booker and Browning; `research/dhr-verification.md`). We need s = 1 + o(1). The
gap is not a constant, it is the whole distance between 1 and the sifting limit,
and it is the same regime in which the Jacobsthal problem sits.

**Polynomial moments cannot produce it, at any order.** Let S_m be the sum of m
consecutive gaps at a random position. Then E[S_m] = m*mbar exactly, and Markov
at order k gives

> #{windows with S_m >= 3pm} / N <= E[S_m^k] / (3pm)^k.

The right hand side is at least (mbar/(3p))^k, because E[S_m^k] >= (E S_m)^k =
(m*mbar)^k, and that lower bound on the bound is independent of m. The
threshold 3pm and the mean m*mbar both scale linearly in m, so no fixed order
moment produces any decay in the run length at all. This is not a weakness of
Markov, it is the shape of the problem. Decay in m requires the order k to grow
with m, that is an exponential moment E[exp(lambda*S_m)], which is precisely a
quasi independence statement for m consecutive grain gaps.

MEASURED, reading 6: the Markov bound sits flat between 0.32 and 0.48 at every
fold and for every m, while the true fraction of windows meeting the cost floor
falls off a cliff. At fold 29 it reads 9.4e-2, 7.7e-4, 2.8e-5, 5.0e-7, 0 for
m = 1 to 5, one to two orders of magnitude per step.

*(CORRECTED 2026-08-18. The band used to be given as "between 0.32 and 0.44",
which excludes the first row of the column it summarises: reading 6's markov
column is 0.4762, 0.4242, 0.4387, 0.3965, 0.4021, 0.3712, 0.3225, 0.3240 at
folds 7 to 31, so fold 7 sits above 0.44. The flatness, which is the whole
point of the paragraph, is unaffected -- a factor 1.48 across eight folds
against a true fraction falling by six orders. `research/kappa-not-L.md`
section 6 carried the same 0.32-to-0.44 band from the same reading and is
corrected with it; the two were never independent.)* The entire content of a
proof would be that observed decay. Every proven tool in this repository, the
variance theorem, the second moment work, the Fourier budget, is a fixed order
moment tool, and reading 6 shows why none of them can reach this.

**The hypothesis, stated so it is not circular.** The naive form, that the
number of gaps at least theta is at most N*exp(-c*theta/mbar), is far too
strong: taking theta = G2 it would give G2 << mbar*ln N, about x*ln^2 x, which
is stronger than the Zone Postulate and stronger than anything known. The
correct form asks for decay only in the conditional step.

> **H''.** There is a constant c > 0 and a function delta(theta) <=
> exp(-c*theta/mbar) for theta >= C*mbar such that, for every m >= 2,
>   #{i : g_i, ..., g_{i+m-1} all >= theta} <= delta(theta) *
>   #{i : g_i, ..., g_{i+m-2} all >= theta}.

The base case m = 1 is left unconstrained, which is what keeps H'' from
implying its own conclusion. Given H'' at theta = 3p, which is the level
Theorem A licenses, R and hence L is at most about ln N * mbar/(3cp). On the
diagonal ln N is about x and p is about x, so L is about mbar/(3c), which is
**polylogarithmic**, and that is the branch the route needs. It clears section
7's requirement L <= 0.19 to 0.31 * p / ln p from about p ~ 800 onward. Note what
H'' does not do: it does not licence the additive sum L*mbar, which is step 4 and
is false. H'' delivers the branch, and the branch still has to be spent through
the two-sided bound of U-FRAME section 5a step 3.

So the hole in U-FRAME section 5a is now a single named hypothesis rather than
an open quantity, and H'' is exactly the assertion that a large gap in the grain
does not make the next gap much more likely to be large. It is a correlation
statement about consecutive survivors of the x# sieve at scale about 3x, which
is an interval statement at length x^{1+o(1)}.

MEASURED, reading 6b: the empirical conditional ratios N_m/N_{m-1} sit at or
below exp(-theta/mbar) in fourteen of the sixteen nonzero ratios there is data
for. The two exceptions are at folds 7 and 13, where the tiles have 3 and 135
slots, so they carry no weight. At fold 31, on 214.7 million slots, the ratios
read 9.5e-2, 2.4e-2, 3.6e-2, 3.3e-2 against a required 1.4e-1, comfortably
inside. That is a measurement of the thing to prove, not a proof of it, and it
is the same kind of evidence U-FRAME already had. What is new is that it is now
a measurement of one sharply stated hypothesis rather than of L itself.

**Honest summary of the position.** We have removed the residue side of the
problem entirely, in the strong sense that Theorem A is attained with equality
at every computable fold, and we have converted L into one hypothesis about the
conditional tail of consecutive grain gaps. The chain still contains something
at least as hard as the twin prime conjecture, and it is now visible as H''
rather than as the word L. U-FRAME section 9 predicted the difficulty would be
an interval statement at scale about 2p; that prediction is confirmed, and the
scale is sharpened to 3p by Theorem A.

## 8a. Theorem C: the same law applied to kappa(m)

Attack A4 reports that L is not the object the fold recursion needs. What it
needs is kappa(m), the largest number of slots one 2-set can delete inside a
stretch of the old tile that becomes m consecutive new gaps, with kappa(1) = L,
since maxsum_m(new) <= maxsum_{m + kappa(m)}(old). A4 finds the sharp shift
j*(1) strictly below L at three of five folds, so a bound aimed at L is aiming
past the target.

The lemma of section 2 never used adjacency. If one 2-set deletes slots
j_1 < ... < j_k, wherever they sit, then every consecutive separation
d_t = s_{j_{t+1}} - s_{j_t} is congruent to 0, +2 or -2 modulo p, and the same
two state walk governs them, because the argument only ever looked at which
element of {a, a-2} a deleted slot occupies. So Theorem A and Corollary A1 hold
with "gap" replaced by "separation between consecutive deleted slots", and

> **Theorem C (PROVEN).** kappa(m) <= max{ k >= 1 : maxsum_{m+k-2}(T_x) >=
> c_min(k-1) }, with maxsum_0 = 0.

*Proof.* A stretch that becomes m new gaps spans m + kappa old gaps and
m + kappa + 1 old slots, of which the two endpoints survive. So the first and
last deleted slot are separated by at most the sum of m + kappa - 2 consecutive
old gaps, hence by at most maxsum_{m+kappa-2}. Corollary A1 applied to the
separations gives that the same distance is at least c_min(kappa-1). QED

At m = 1 this is Theorem B. VERIFIED, reading 9: kappa(m) computed exactly for
m = 1 to 8 at folds 7 through 29, and Theorem C holds in every one of the 56
cases. It is tight at m = 1 at folds 7, 13 and 17.

What follows points in two directions at once.

**kappa is the better target and Theorem A reaches it for free.** Nothing in the
residue argument had to change. The measured kappa profiles grow very slowly in
m at every fold from 11 up, for instance 3, 4, 4, 4, 5, 5, 5, 5 at fold 23 and
2, 3, 3, 3, 4, 4, 4, 4 at fold 29, which is why A4's
maxsum_m(new) <= maxsum_{m+4}(old) covers every case A4 measures. Fold 7 is the
exception, 2, 2, 4, 4, 5, 5, 6, 6, and it is outside A4's measured set: A4 drops
T_5 from its tables because a three-slot tile is shorter than the windows it
tabulates (`research/a3-04-maxsum-recursion.js`:110-111).

**REFUTED: kappa(m) <= L + 2 is not universal.** A4 verified it for m <= 8 at
five folds, 13 through 29. It fails at fold 11, where L = 1 and kappa(6) = 4,
and it fails harder at fold 7, where L = 2 and kappa(7) = kappa(8) = 6, a miss
of 2. Fold 11 is the fold where no gap value qualifies at all, so L collapses to
its floor while kappa does not, which is precisely the situation in which a rule
calibrated to L will break. Fold 7 is the other degenerate end: T_5 has three
slots, and a single 2-set mod 7 deletes six of the twenty-one slots in a period,
so kappa runs up to the whole per-period kill count while L stays at 2. The
failure is instructive rather than fatal: it says the L + constant form of the
rule is an artefact of L being typical, and that kappa should be bounded
directly, which is what Theorem C does.

*(EXTENDED 2026-08-18. The fold-7 counter-example is new, and it was hidden by a
defect rather than missed. `a3-05-bound-L.js` replayed only one copy of a tile
to close its cycle, which on the three-slot T_5 gave five gaps, so every window
longer than that was truncated: reading 9 printed the fold-7 kappa row as
2, 2, 2, 1, 0, 0, 0, 0 and the verdict line said kappa(m) <= L+2 OK. The replay
is fixed, the row now reads 2, 2, 4, 4, 5, 5, 6, 6, and the verdict says FAIL.
Three independent confirmations: the cyclic gap word 6, 12, 12 by hand; a brute
force written from the definition over eight unrolled periods; and
`research/history/staging/attack-block-07-kappa.md` section 2, which computed
the same row on 2026-08-18 from its own code and reported the disagreement.
The same defect printed maxsum_m(T_5) as 12, 24, 30, 42, 48, 0, 0, 0 where the
cyclic truth is 12, 24, 30, 42, 54, 60, 72, 84. Theorem B's table is unchanged,
because c_min(2) = 42 already exceeds maxsum_2 = 24 at fold 7.)*

**The wall does not move.** Theorem C reduces kappa to the same maxsum profile
that Theorem B reduces L to, against the same cost floor of about 3p per step.
The ceiling argument of section 7 applies unchanged, so Theorem C is also
O(maxsum/p) and also lands on the linear branch. Redirecting the attack from L
to kappa buys tightness and a better fit to the recursion. It does not touch
hypothesis H''.

## 9. The diagonal, by three routes, and the script fault it exposed

The diagonal is

> **L = 2, 1, 2, 2, 2, 3, 2, 4 at folds 7, 11, 13, 17, 19, 23, 29, 31.**

Reading 1 computes L three ways: a two state dynamic program over the p 2-sets,
an independent brute force that scans all p sets separately, and a verbatim copy
of the run finder as `research/Lgrowth.js` then stood, kept inside this script
as the record of the disagreement. The first two agree at all seven folds that
can be brute forced. The third disagrees at exactly one, fold 29,
where it reports 3 against the true 2. An exhaustive count of killable
consecutive triples on T_23 at p = 29 is exactly zero.

**The fault is in the state machine of `runFor`.** It keeps two residues, `prev`
and `other`, but does not record which of the two the previous slot actually
held, so on a reset it tests the new residue against `prev` when the true
predecessor was `other`. That chains two incompatible pairs into one reported
run: a, a+2, a-2 scores as a run of three. `research/killrun.js` shares the
routine and was fixed first. **`research/Lgrowth.js` was corrected the same day**
and its banner now carries the refutation, so the file itself is usable again;
what remains unsafe is **any L number taken from it before 2026-08-16**, since
the old routine generated the whole off diagonal sweep. The corrected sweep, out
to p = 127, is in `research/a3-08-adjacent-pairs.js` section [8], which found the
same bug independently and agrees on the diagonal above.

Fold 31 is confirmed at 4 by streaming T_29, all 214,708,725 slots, generated
from T_23 in 29 blocks. Its extremal run is 60, 126, 60, which is exactly
2p - 2, 4p + 2, 2p - 2, the cheapest legal alternating word, with span 246 equal
to c_min(3) to the unit.

**L is not monotone along the diagonal**, since it goes 3 at fold 23 and 2 at
fold 29 before reaching 4 at fold 31, which forbids reading the eight integers as
a growth curve. Section 8a's kappa is better behaved and is the object the
recursion actually needs.

## 10. Reproduction

```
node --max-old-space-size=8192 research/a3-05-bound-L.js    # 74 s, all 8 folds
SKIP31=1 node research/a3-05-bound-L.js                     # 17 s, folds 7..29
```

Tiles are built exactly as `research/Lgrowth.js` builds them, from the mod 30
comb {11, 17, 29}, so the custody chain back to the published numbers is intact.
T_29 is never held in memory; it is streamed from T_23 block by block, and every
statistic is accumulated in one pass.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
