# The Aggregate 30-Skeleton Bound — certified at every computed level, @11 through @29

<!-- ledger
id: Q-skeleton-bound
status: PARTIAL
todo: none
question: Does the aggregate 30-skeleton bound hold, and can it be certified at every level?
verdict: Certified as an exact BigInt inequality at six levels @11 through @29, margins 0.287 to 0.406, with the Skeleton Collapse Theorem proven for all x and all q and an exact exception criterion; the all-x form is open and its blocking term is prime-equidistribution of window residues rather than branch algebra.
-->

*(2026-08-14. Companion to `natal-cap-30-skeleton-bound.js`, which verifies
the collapse identity pointwise (≤ 4e−18 @11) and against cap-26's 2ⁿ-mask
ledger (relerr ≤ 1.6e−10 through @17, all 164 primes; 1.5e−7 @19 over a
**58-of-435 sample chosen to include every exception**, the float ledger's own
precision floor — sample disclosure added 2026-08-18, the clause read "1.5e−7
@19" flat while its @11–@17 neighbour said "all 164 primes", so the reader was
invited to take both as exhaustive; the 58/435 is printed at
`natal-cap-30-skeleton-bound.js`:216 and at
`research/wave7-logs/cap36-cap30-repro.log`:6), and certifies every inequality below in exact
BigInt. Notation as cap-26: level x, W = x#, N̄ = 2∏(p−2), δ = N̄/W; scour
prime q, lA = ⌈W/q⌉, lB = ⌊(W+1)/q⌋, L = lA+lB; C(m) = c₃₀(m)·P(m) the natal
autocorrelation with P(m) = ∏_{7≤p≤x} c_p(m) its 30-free part; dev(q) =
R(q) + 1/2; ledger subsets T ⊆ {30, 7..x}; skeleton G30(q) = Σ_{30∈T} dev_T.)*

Status of these results and of the anchored calm as a whole:
[anchored-calm.md](anchored-calm.md).

Cap-26 reduced the anchored calm's aggregate anticorrelation to one open
statement: **G30_agg(x) < 1/2**. This file (1) collapses the skeleton — a priori
2ⁿ ledger terms — to a single closed-form kernel, (2) turns the open statement
into an integer inequality and certifies it exactly at every computed level, and
(3) computes, honestly, why the all-x version stays open. The certified ladder
now runs to @29; the sixth level is the `--at29` pass of
[natal-cap-36-skeleton-door.md](natal-cap-36-skeleton-door.md), whose
split-weight accumulator is what keeps the arithmetic exact at W = 6.5·10⁹.

---

## Theorem A (Skeleton Collapse — proven, all x, all q)

Define **K(m) := 15·C(m) − 2·P(m)**. Then for every lag m

**Σ_{T∋30} ∏_{M∈T} φ_M(m) ∏_{M∉T} m̄_M = φ₃₀(m)·∏_p f_p(m) = K(m) / (15W)**,

and hence, with the cap-26 exact variance integers IVA + IVB = W²(V_A+V_B),

**G30(q) = W·NUMsk(q) / (30·(IVA+IVB))**, where
**NUMsk = L·(K(0) + 2Σ_{0<d<lA} K(qd mod W)) + 4Σ_{lA≤d<L} (L−d)·K(qd mod W)**
and K(0) = 14N̄.

*Proof.* Fix m and sum over the p-part S = T∖{30} of the ledger term:
Σ_{S⊆P} ∏_{p∈S}φ_p ∏_{p∉S}m̄_p = ∏_p(φ_p + m̄_p) = ∏_p f_p(m), leaving the
factor φ₃₀(m) = c₃₀(m)/30 − 1/225. With ∏_p f_p = P(m)·30/W this is
P(m)(15c₃₀(m) − 2)/(15W) = K(m)/(15W). Feeding the kernel through cap-26
Prop. 3's weights ((L/2)·flat on the class qZ, triangular on a + qZ) gives
NUMsk; K(0) = P(0)·28 = 28·(N̄/2). ∎

**Reading.** K/P = **+28 / +13 / −2** at m ≡ 0 / ±6 / other (mod 30) —
mean-zero over the wheel (28 + 2·13 = 54 = 2·27). The skeleton is exactly a
pair of AP-restricted J₅ correlation sums: the lags d ≡ 0, ±6q̄ (mod 30) of
the two classes sample the 30-free correlation P at weight +28/+13, all other
lags at −2. Cap-26's "deep diffuse support-≥2 cloud" is this one object.

## Theorem B (Aggregate bound — exact integers, six levels @11 through @29)

G30_agg < 1/2 is equivalent to the **integer inequality
W·Σ_q NUMsk(q) < 15·Σ_q (IVA+IVB)**, certified in exact BigInt:

| x | K | G30_agg | margin ½−G30 | dev_agg | max\|no30\| | R_agg | resonances G30>½ |
|---|---|---|---|---|---|---|---|
| 11 | 10 | +0.2132 | 0.287 | +0.2133 | 0.0024 | −0.287 | 13 (0.625) |
| 13 | 34 | +0.1113 | 0.389 | +0.1109 | 0.0068 | −0.389 | none |
| 17 | 120 | +0.1011 | 0.399 | +0.1013 | 0.0070 | −0.399 | 107 (0.544) |
| 19 | 435 | +0.1259 | 0.374 | +0.1262 | 0.0060 | −0.374 | 2083 (0.606), 2221 (0.521) |
| 23 | 1739 | +0.0945 | 0.406 | +0.0948 | 0.0039 | −0.405 | 2339 (0.575) |
| **29** | **7863** | **+0.1176** | **0.3824** | **+0.1180** | **0.0054** | **−0.382** | **173 (0.511)** |

ΣCov_adj < 0 is also certified as an exact integer sign at every level.
Rows @11–@19 reproduce cap-26 to all printed digits; @23 and @29 extend it.
@23 is the first exact deviation/skeleton pass at W = 223,092,870 (17 s), with
the lowest dev_agg and the largest margin on record; @29 is the `--at29` pass at
W = 6,469,693,230 with 7,863 scour primes (11.3 min), which reproduces @23 as
its control. The @29 max|no30| is **0.0054, at q = 1109**, the largest in the
table and still four times inside the margin; the aggregate no30 there is
dev_agg − G30_agg = +0.0004, in line with every level below. That cell was
carried as absent until 2026-08-17, when `natal-cap-36-skeleton-door.js` gained
the column and the pass was re-run: every other figure on both rows reproduced
exactly, and the control row's @23 value matches the @23 row above, so the
column arrived with its control already passed.
Exceptions keep thinning: 1 in 1,739 at @23 and
1 in 7,863 at @29. Cap-26's "the offset does not trend to 0 through @19" softens
into no trend at all — @19 and @29 are both upward moves, and the sequence has no
decay law (cap-36).

**Corollary (the aggregate anticorrelation is a theorem at six levels).** With
cap-26 (−1/2 exact, the deviation identity, the no-30 bound),
R_agg = −1/2 + G30_agg + no30_agg < 0 at every computed level, every ingredient
exact or exactly certified. The all-x statement is not covered by this: it is the
Skeleton Equidistribution Conjecture, and it is OPEN.

## Proposition C (The uniformity blockers — computed, not conjectured)

Three candidate all-x bounds, evaluated exactly:

1. **Branch-Abel** (the P4 machinery on the 30∈T half): |G30(q)| ≤
   Ask·(L/4 + lB/2)/Vg, Ask = s₃₀·∏_p(m̄_p+s_p). Aggregate value 18.2 → 52.5
   → 158 → 521 → 1593 at @11..@23 (truth: ~0.1); certifies **zero** primes at
   any level. The per-branch triangle bound is Θ(1/Vg) with an L-free
   constant, so the window length is not the obstruction. It is vacuous for
   two other reasons (cap-36 §"The per-branch bound"): the constant grows like
   8^{π(x)}, since the sum over branches is dominated by the deepest one where
   M_T is W itself; and the denominator shrinks, the aggregate calm ratio
   ΣV/Σ(Lδ) reading 0.2349, 0.1149, 0.0505, 0.0198, 0.0080 at @11 through @23,
   a clean loss of 0.29 per unit ln W.
2. **Spike-product candidate** ∏_p(1 + 2/(p−2)) − 1: 0.711 @11, 1.805 @23,
   divergent in x (Mertens). Dead on arrival.
3. **Exact positive mass** (kernel K⁺, BigInt): 24.5 @11 → 7.3e6 @23. The
   skeleton's smallness is ~100% cancellation along the two incomplete lag
   classes; no positivity/majorization route exists.

**The blocker, named.** Even the shallowest term T = {30} alone (kernel
φ₃₀·∏m̄_p, period 30) Abel-bounds to ≈ 0.12·(L/2)·∏m̄_p/Vg ≫ 1/2 for x ≥ 17.
Its true aggregate smallness — and hence any all-x proof — requires the
window-length residues ⌈W/q⌉ mod 30 and class phases a mod 30 to
equidistribute over the scour primes q: an analytic prime-equidistribution
statement, provably outside the branch algebra that proved cap-26 P4. The
wall's smallest room has an arithmetic door, and the door is prime
equidistribution.

## Proposition D (Exception criterion — exact)

q is a skeleton resonance iff **W·NUMsk(q) > 15·(IVA+IVB)** — one integer
comparison per prime. It reproduces all four cap-26 exceptions to the printed
digit (13@11: 0.625; 107@17: 0.544; 2083@19: 0.606; 2221@19: 0.521) and finds
@23's single one, q = 2339 (0.575) — the only Cov_adj > 0 prime among 1739 —
and @29's, q = 173 (0.511), the only one among 7,863. Six known counterexamples
in 10,201 scour primes: this criterion is what makes the Uniform-in-q
Anticorrelation refutation (cap-23) exact rather than statistical.
The criterion is exact but not shallow: rigid (|T| ≤ 2) skeleton averages
≈ 0 (cap-26), so no congruence one-liner in q decides it; near-resonances
form the expected continuum (@23: q = 107 at 0.483). Resonance = multi-prime
alignment of the classes qZ, a+qZ with the J₅ spikes, now computable as two
AP-restricted sums of one kernel.

## What this file owns, and what it does not

Two proven objects and one open one: the **Skeleton Collapse Theorem**
(Theorem A, all x and all q), the **Aggregate 30-Skeleton Bound (@11..@29)**
(Theorem B, certified as an exact integer inequality at six levels, margins
0.287 to 0.406), and the exception criterion (Prop D). What is open is the all-x
form, whose blocking term Prop C identifies as prime-equidistribution of window
residues rather than branch algebra; cap-36 goes through that door, names the
statement the **Skeleton Equidistribution Conjecture**, and finds it is not the
blocker.

The calibration of every part of the anchored calm, including the parts this file
does not touch, is one table in [anchored-calm.md](anchored-calm.md).

## Next

The T = {30} aggregate term: ⌈W/q⌉ mod 30 equidistribution over scour primes may
be attackable via Vinogradov-type bounds — the first branch with an actual
analytic handle. Cap-36 measures that door open at M = 30, 210 and 2310 with
square-root cancellation, and then shows that between 91% and 111% of the
skeleton's mass sits in branches whose modulus exceeds the window length, where
the same question is posed at moduli of order W. The honest next move is stated
there rather than here.
