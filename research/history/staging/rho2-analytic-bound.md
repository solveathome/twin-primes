# The ⟨ρ²⟩ analytic bound: the first move was already made, audited clean, and its constant named

<!-- ledger
id: Q-rho2-bound
status: ANSWERED
todo: 0
question: Is there an analytic upper bound on <rho^2>(z) from its proven closed form, and does it matter for RML?
verdict: Already proven 2026-08-21 (attack-rhoms-01); the constant is now named, 170.88 z^{2s} ln^8 z; Chebyshev off any second moment diverges from RML (the true C_L = ms = 1 floor clears at z = 41 and 43 and misses by 2.155x at z = 47), so it is an ingredient, not a route.
-->

**The brief's premise is refuted. TODO item 0's named first move, "an analytic
upper bound on ⟨ρ²⟩(z) from its PROVEN closed form", was executed on 2026-08-21
and is a theorem: `research/history/staging/attack-rhoms-01.md` proves
⟨ρ̃²⟩ ≤ C·z^{2s}·ln⁸z three independent ways. TODO.md item 0 and
`rho-maximal-law.md` §7 both still list it as unreached. This session did not
redo it. It audited the MS1 derivation step by step and found no defect, and it
closed the one thing the existing artifact leaves open: the constant C, which
was never named. Producer: `research/history/staging/rho2-analytic-bound.js`
(scratchpad grade, `qc/embed.js --check` bit-honest). Nothing about any exponent
moved, and nothing could have: the second moment is an ingredient of RML, and
the negative half of this note quantifies how far it is from being a route.**

---

## 0. WHAT IS OPEN OR FAILED, FIRST

- **RML(α) is open at every α.** No form F1–F4 is proven. The mean-square
  lemma changes none of that. Rung: OPEN, unchanged since
  `rho-maximal-law.md`.
- **The all-z explicit bound is worthless as a finite-z number.** FORM I* below
  sits 2.535e+12 above the exact ⟨ρ̃²⟩ at z = 13 and 3.213e+14 at z = 47. The
  ratio widens over the ten levels but not monotonically: 1.745e+14 at z = 29
  exceeds 1.653e+14 at z = 31. The bound grows like z⁶ln⁸z while the measured
  ⟨ρ̃²⟩ exponent between the cited endpoints z = 13 and z = 47 is 4.511, which
  is 75% of the stated z⁶ and 44% of the effective log_z(FORM I*) = 10.2054 at
  z = 47 (`research/history/staging/redteam-0828-closures.js` R4). The
  measured-input form (MS3 = B₂/12, cited) is 18.0× to 44.2× above truth over the same ten levels.
  Only the asymptotic exponent is worth anything here.
- **The stated exponent 2s = 6 is a limit no computable z reaches.** Measured
  on the closed form itself: log_z(FORM I*) = 10.2054 at z = 47, 8.9921 at
  z = 1009, 8.1470 at z = 10⁵, 7.8941 at z = 10⁶. The ln⁸z surcharge is still
  1.5205 of exponent at z = 10⁶. Rung: MEASURED, scratchpad grade, from
  `node research/history/staging/rho2-analytic-bound.js` S4.
- **Chebyshev off any second moment provably cannot reach RML.** Quantified in
  §4. The mean-square lemma is an INGREDIENT, never a route.
- **[MEMORY] flag, and the quoted form is false in range.** The one bound in
  the derivation not read at a page is Rosser–Schoenfeld 1962,
  Π_{p≤x}(1−1/p)^{-1} < e^γ ln x (1 + 1/(2 ln²x)). As stated it is FALSE at
  x = 109 and x = 113 (ratios 1.001320 and 1.003226 in this file's p < z
  convention) and holds at every prime z from 127 to 3.3e7. The RS bounds of
  this shape are published with a lower cutoff (x > 285 for the direction that
  gives an upper bound on the reciprocal product) [MEMORY, unverified at a
  page], which is exactly what the two violations sit below. FORM I* therefore
  carries a validity floor, not "all z". The producer's own sixteen-z sample
  (worst ratio 0.998681 at z = 19) did not include 109 or 113, so the sampling
  passed, not the check. Anyone integrating FORM I* must open
  Rosser–Schoenfeld.

## 1. THE OBJECT AND THE CLOSED FORM, RESTATED

Per `rho-maximal-law.md` §1. Fix s = 3.0, W = P(z) = Π_{p<z} p, D = z^s. The
certificate's divisor-pair lattice carries terms j with modulus q_j = [d₁,d₂],
CRT class c_j, and weight w_j = ε_block·μ(d₁)μ(d₂) ∈ {±1}. The potential is

    ρ_z(y) = Σ_j w_j ψ((y − c_j)/q_j),   ψ(t) = t − ⌊t⌋ − 1/2,

periodic mod W with exact period mean −M/2, M = Σ_j w_j/q_j > 0. The centered
potential is ρ̃ = ρ + M/2, and ⟨ρ²⟩ in the corpus's usage is the period
variance of ρ, that is ⟨ρ̃²⟩. The argument is a position y ∈ ℤ/W; the
normalisation is weight units, dimensionless. It is H-free: R_H(x) =
ρ(x) − ρ(x+H) is the H-dependent object, ρ̃ is not.

**The closed form (PROVEN).** `research/sift-limit-lemmaV.js`, function
`meanSquare`, field `rho2` (= `plateau`/2); the derivation sits in the block
comment immediately above that function (lines 108–124) and in S2 of the same
file, where it is checked against brute force over the full period:

    ⟨ρ̃²⟩ = Σ_{i,j} w_i w_j C_ij,
    C_ij  = [ (g²−1)/12 − d̄(g−d̄)/2 ] / (q_i q_j),
    g = gcd(q_i, q_j),  d̄ = (c_j − c_i) mod g,   g = 1 ⟹ C_ij = 0 exactly.

**Independent reproduction (this session).** The producer calls the repo's own
`buildTerms(z, z³)` and `meanSquare(t, H)` and reads `rho2` at z = 13, 17, 19,
23: values 1.095066, 2.496563, 4.952375, 7.982480, matching the cited column of
`attack-rhoms-01.js` (OUTPUT S0, out-sha256 4377df4f…) to the six decimals the
citation carries, and invariant in H to zero ulp between H = 10 and H = 1000, as
an H-free object must be. Rung: MEASURED, scratchpad grade, S0.

## 2. THE BOUND, WITH EXPLICIT CONSTANTS

The derivation is MS1 of `attack-rhoms-01.md` §2, re-derived here with every
inequality made explicit and each step checked numerically. Rung on the
derivation: PROVEN, and this session's audit found no defect in it.

1. For g ≥ 2, f(d̄) = (g²−1)/12 − d̄(g−d̄)/2 has maximum (g²−1)/12 at d̄ = 0 and
   minimum ≥ −(g²+2)/24, and (g²+2)/24 ≤ (g²−1)/12 exactly when g² ≥ 4. So
   |C_ij| ≤ (g²−1)/(12 q_i q_j) and ⟨ρ̃²⟩ ≤ GS/12 with GS = Σ_{i,j} g²/(q_iq_j).
   Checked over every g = 2..4000 and every d̄: worst ratio 1.000000, attained
   at g = 2, so the step is tight and correct.
2. Multiplicity of a modulus among lattice terms is ≤ (9/2)τ(q), proven in
   `attack-rhoms-01.md` §2 as (3/2)τ per block times three blocks, and measured
   there to attain the cap (ratio 1.0000). Hence
   GS ≤ (81/4) Σ_{q,q'} τ(q)τ(q') g²/(qq').
3. Substituting q = gu, q' = gv and dropping (u,v) = 1 (all terms positive, so
   this over-counts and stays an upper bound), with τ(gu) = 2^{ω(g)}2^{ω(u)} for
   squarefree q: GS ≤ (81/4)·[Σ_{g|P(z), g ≤ qmax} 4^{ω(g)}]·[Σ_{u|P(z)} 2^{ω(u)}/u]².
4. Σ_{g ≤ X} 4^{ω(g)} ≤ X·Π_{p<z}(1+4/p) and Σ_{u|P(z)} 2^{ω(u)}/u = Π_{p<z}(1+2/p).
5. qmax ≤ min(D², P(z)) = min(z^{2s}, e^{θ(z)}), since every d ≤ D and every
   q = [d₁,d₂] divides P(z). For large z the z^{2s} branch binds. Checked
   against the cited qmax column at all ten levels: zero violations, equality
   at z = 13 where qmax = P(13) = 2310.

That gives the explicit product form, unconditional and with no [MEMORY]
ingredient:

    ⟨ρ̃²⟩ ≤ (81/48) · z^{2s} · Π_{p<z}(1+4/p) · Π_{p<z}(1+2/p)²      [FORM I]

6. (1+k/p) ≤ (1−1/p)^{−k} for integer k ≥ 1 by the binomial series (checked for
   k = 2, 4 at every p < 1000, zero violations), so the two products are at most
   the eighth power of Mertens' product; closing that with Rosser–Schoenfeld
   [MEMORY] gives the closed all-z form:

    ⟨ρ̃²⟩ ≤ (27/16)·e^{8γ} · z^{2s} · ln⁸z · (1 + 1/(2 ln²z))⁸
          =  170.88 · z^{2s} · ln⁸z · (1 + 1/(2 ln²z))⁸               [FORM I*]

    rms(ρ̃) ≤ √170.88 · z^{s} · ln⁴z · (1 + 1/(2 ln²z))⁴  =  z^{s+o(1)}.

**Growth order: z^{2s}, that is z⁶ at s = 3.0. Constant: 170.88 = (27/16)e^{8γ}.
Polylog: ln⁸z.** This names the C that `attack-rhoms-01.md` reading 1 leaves
unnamed. Validity: not all z. The RS form as quoted fails at z = 109 and
z = 113 and holds at every prime z from 127 to 3.3e7
(`research/history/staging/redteam-0828-closures.js` R6), so FORM I* carries a
validity floor whose true cutoff is whatever RS actually states. Rung on
FORM I: PROVEN. Rung on FORM I*: PROVEN above that floor, modulo the [MEMORY]
RS citation.

## 3. RATIO BOUND/EXACT AT EVERY EMBEDDED LEVEL

Exact ⟨ρ̃²⟩ cited from `attack-rhoms-01.js` OUTPUT S0/S3 (exact at z ≤ 31, the
cited rmsr² at 37..47). Bound columns computed this session, scratchpad grade,
`node research/history/staging/rho2-analytic-bound.js` S3.

```
   z   exact ⟨ρ̃²⟩   FORM I*/exact   FORM I/exact   FORM II/exact   MS3/exact
                     (closed, all-z) (cited qmax)   (cited qmax)    (cited B₂)
  13       1.095       2.535e+12      4.833e+06      6.314e+05        18.0
  17       2.497       1.112e+13      4.798e+07      6.119e+06        30.9
  19       4.952       1.436e+13      6.344e+08      7.975e+07        29.3
  23       7.982       4.403e+13      1.005e+09      1.247e+08        33.5
  29      13.596       1.745e+14      3.187e+09      3.914e+08        47.5
  31      24.738       1.653e+14      6.436e+09      7.861e+08        47.0
  37      85.677       1.999e+14      7.812e+09      9.492e+08        43.2
  41     143.927       2.712e+14      1.316e+10      1.594e+09        44.9
  43     201.454       2.835e+14      1.296e+10      1.565e+09        44.3
  47     360.902       3.213e+14      2.310e+10      2.781e+09        44.2
```

FORM II is the MS3 route with the explicit B ceiling 9A²(E−1) of
`attack-AB-bounded.md` Thm 1 substituted for the measured B, same exponent 2s,
and it beats FORM I by about an order of magnitude at every level. MS3 in the
last column is the cited B₂/12 and is not an all-z form: it needs the MEASURED
B₂, so it prices the truth but proves nothing about large z.

At the largest embedded level z = 47 the all-z explicit bound is 3.213e+14 times
the exact value. That number is the honest price of asking for explicit
constants valid at every z off a triangle inequality with no cancellation in it.

## 4. WHAT THIS DOES FOR RML(α) AND MV(α)

**Ingredient, not movement. Nothing here delivers a bound on G₂(z#).** Without a
recovery from the second moment to the supremum, the mean-square lemma yields no
statement about sup|ρ̃| and therefore none about G₂ at all.

**The pricing lemma's chain** (`rho-maximal-law.md` §2; the brief calls these
F0–F4, but F0–F4 are the five forms of the law, not the lemma's hypotheses, so
both lists are given). Chain steps (i)–(v):

| step | statement | status |
|---|---|---|
| (i) | T(x) = H·M + R_H(x) | PROVEN identity; red-team confirmed to machine zero at 330 positions, `redteam-0820-night-empirical.md` T2.a |
| (ii) | \|R_H\| = \|ρ̃(x) − ρ̃(x+H)\| ≤ 2 sup\|ρ̃\| | PROVEN, exact algebra (the mean cancels) |
| (iii) | HM − 2sup\|ρ̃\| ≥ 1 at H = ⌈(2Cz^α+1)/M⌉ | PROVEN by construction; strict T ≥ 1 rider paid, cost 1/M = O(ln²z) |
| (iv) | Brüdern–Fouvry pointwise inequality | PROVEN, pilot-verified; zero violations at z = 13, T2.a |
| (v) | M ≥ c(s)/ln²z at s = 3.0 > 1+√e | standard linear-sieve asymptotics, CITED not re-derived; MEASURED M·ln²z = 0.343–0.367 flat over z = 13..47 |
| — | the law itself | **OPEN** |

The five forms:

| form | status after this session |
|---|---|
| F0 (tautological floor) | not a law; the ladder's bottom, no content |
| F1 (one-sided single-window) | OPEN. Weakest law-shaped form. Untouched by a second moment |
| F2 (sup-norm Lemma V at the ceiling) | OPEN. Lemma V is posed-not-proven; working point s/u = 0.703 is inside its stated range (HELD, confirmed with the mandatory rider at T2.e), and the fixed-smooth-profile obstruction binds at the β₂ point exactly as at the TPC point |
| F3 = RML(α), the named target | OPEN at every α. This session bounds one of its two factors |
| F4 (Gaussian units) | OPEN as a theorem; MEASURED TRUE at z = 13..29, C_true 0.6044–0.8022, five levels, reproduced digit-for-digit by the red team (T2.d). Composed with the proven mean square it gives RML(3.5+ε), so F4 ⟹ G₂(z#) ≪ z^{3.5+ε}, margin β₂ − 3.5 = 0.766 |

**Effect on the sufficiency curve: one thing, and it is not exponent movement.**
θ_G(z) is capped at s + 1/2 + o(1) = 3.5 + o(1) unconditionally, since
sup|ρ̃| ≤ √⟨ρ̃²⟩·√(2 lnW) ≤ z^{3+o(1)}·z^{1/2+o(1)} and lnW = θ(z) ≍ z. So
λ_max = β₂ − θ_G cannot close asymptotically, which excludes
`rho-maximal-law.md` reading 6's model A (linear drift, room gone at z ≈ 5·10³)
as an asymptote. That is a statement about a model of a measured curve, not
about any delivered exponent. Rung: the cap is PROVEN; the exclusion of model A
is PROVEN as an asymptotic statement and says nothing about a finite-z dip.

**MV(α), the measured weakest sufficient form** (slope 4.214 ± 0.304 with β₂
inside the bar, per TODO item 0): a second-moment bound does not move it either.
MV is a mean-value form over windows; the ⟨ρ̃²⟩ bound is the H-free variance and
enters MV only as the same ingredient it is for RML. No measurement here bears
on the 4.214 ± 0.304 slope, and none was run.

**The negative, quantified: Chebyshev cannot reach a sup-type law.** RML is a
sup statement; Chebyshev from a second moment costs the position-union factor.
The only fully proven recovery in the corpus is R1 = (3·C_L·W·⟨ρ̃²⟩)^{1/3}
(`attack-rhoms-01.md` §1, from the exact increment identity
ρ(y+1) − ρ(y) = M − cc(y+1)). Against smax = (z^{β₂}M − 1)/2, two different
floors have to be kept apart, and `attack-rhoms-01.js` S5 keeps them apart. Its
S4 `R1f` column is `exp((ln 3 + lnW + ln ms)/3)`: C_L = 1 with the MEASURED mean
square. The true absolute floor, C_L = 1 and ⟨ρ̃²⟩ = 1, which no mean-square
lemma can improve on, is (3W)^{1/3}. Both against smax:

```
   z            13     17     19     23     29     31     37     41     43     47
 C_L=1, meas ms 0.012  0.015  0.035  0.056  0.076  0.232  0.541  1.474  5.000  15.346
 in exp        −1.709 −1.493 −1.142 −0.920 −0.767 −0.425 −0.170 +0.105 +0.428 +0.709
 C_L = ms = 1   0.012  0.011  0.020  0.028  0.032  0.080  0.123  0.282  0.852   2.155
```

The `C_L = 1, meas ms` row is the cited S4 column; the absolute-floor row is
rebuilt in `research/history/staging/redteam-0828-closures.js` R5, which also
checks that the cited column matches the measured-ms form at all ten levels and
never the ms = 1 form.

So even at its floor the Chebyshev route already misses by a factor 2.155, or
0.1994 of exponent, at z = 47; at z = 41 and z = 43 the absolute floor still
clears, and it is the C_L = 1 floor with the measured mean square that fails
from z = 41 at 1.474×, 5.000× and 15.346×. The miss diverges either way: the
union price is e^{θ(z)/3} with θ(z) ≍ z, which beats every fixed power of z. A
perfect mean-square lemma composed with Chebyshev therefore fails at every large
z, at every exponent. The 2k-th moment ladder needs k ≍ z/(1.53 ln z), also divergent
(cited, `attack-rhoms-01.js` S5). Chaining is CLOSED (`REFUTED.md`) and was not
retried. Rung: MEASURED on cited columns, with a PROVEN divergence mechanism.

## 5. READINGS

1. **REFUTED (the brief's premise).** TODO item 0's first move was already
   executed and is a theorem (`attack-rhoms-01.md`, 2026-08-21). The item is
   stale in two places, listed in §7.
2. **AUDIT PASS on MS1, with one input false in range.** The PROVEN closed
   form reproduces the cited column at z = 13..23 from the repo's own code,
   H-invariant to zero ulp; MS1's steps (1), (5) and (6)'s binomial half each
   verify with zero violations over the tested range. No defect found in the
   MS1 derivation itself. Step (6)'s RS half is the exception: the quoted RS
   form fails at z = 109 and z = 113, which is a validity floor on FORM I*
   rather than a defect in MS1.
3. **PROVEN, new: the constant.** ⟨ρ̃²⟩ ≤ 170.88·z^{2s}·ln⁸z·(1+1/(2ln²z))⁸,
   modulo the [MEMORY] Rosser–Schoenfeld citation; and the RS-free product form
   ⟨ρ̃²⟩ ≤ (81/48)·z^{2s}·Π(1+4/p)·Π(1+2/p)². Growth order z⁶ at s = 3.0.
4. **MEASURED, scratchpad grade.** Ratio bound/exact at the ten embedded
   levels: 2.535e+12 to 3.213e+14 for the closed all-z form, widening over the
   range but not monotonically (z = 29 exceeds z = 31); 6.3e+05 to 2.8e+09 for
   the best explicit form (FORM II at cited qmax).
5. **MEASURED, scratchpad grade.** The exponent 2s = 6 is unreachable in
   practice: log_z of the bound is 10.2054 at z = 47 and still 7.8941 at
   z = 10⁶.
6. **NEGATIVE, quantified.** At the true absolute floor (C_L = ⟨ρ̃²⟩ = 1)
   Chebyshev off any second moment clears smax at z = 41 and z = 43 and first
   misses at z = 47, by 2.155× or 0.1994 of exponent; at C_L = 1 with the
   measured mean square it misses from z = 41. Either way the miss diverges,
   since the union price is e^{θ(z)/3}. The mean-square lemma is an ingredient
   of RML and provably not a route to it.
7. **UNCHANGED.** RML is open at every α; no exponent moved; the sufficiency
   curve's measured columns are untouched.

## 6. WHAT WOULD FALSIFY THIS, AND WHETHER THE CHECK HAS RUN

- **FORM I / FORM I* false at some z.** Falsified by any z with exact ⟨ρ̃²⟩ above
  the bound. RUN at ten levels (§3): the smallest margin is 6.3e+05. A
  counterexample would require the multiplicity cap (9/2)τ(q) or the qmax bound
  to fail; both were checked directly (zero violations) and the first is
  measured tight, so a failure would be a proof error, not a numerical surprise.
- **The RS constant wrong.** Opening Rosser–Schoenfeld 1962 is NOT RUN and
  stays [MEMORY]. The numerical check is no substitute and has now failed: the
  quoted form is false at z = 109 and z = 113, so the validity range does
  exclude small z. If RS is wrong the FORM I product bound survives untouched,
  and so does 170.88 = (27/16)e^{8γ}, which comes from the leading term of
  Mertens' product and not from the correction factor. What moves is the
  (1 + 1/(2 ln²z))⁸ factor and the validity floor: substituting the safer
  (1 + 1/ln²z)⁸ raises FORM I* at z = 47 from 1.1597e+17 to 1.4994e+17, 29%,
  against a bound already 3.2e+14 above truth.
- **The exponent 2s wrong.** Falsified if qmax exceeds min(z^{2s}, P(z)) for
  some z, or if the linear sieve's support is larger than D per system. Checked
  at ten levels; the general statement is a one-line consequence of d ≤ D and
  q | P(z) and is not in doubt.
- **The Chebyshev negative wrong.** Falsified by a recovery that does not pay a
  position-union factor, or by C_L growing slower than assumed. The C_L values
  at z ≥ 31 are sampled LOWER bounds (cited), so the R1 failure verdicts there
  are certifiable in the direction claimed; the R1f floor row uses C_L = 1 and
  is unconditional. RUN.
- **"Ingredient not route" wrong.** Falsified by any proof of F1–F4 that
  consumes only a second moment. None exists; the named first unproven object on
  that ladder is ⟨ρ̃⁴⟩ (`attack-rhoms-01.md` §4), and nothing here touched it.

## 7. DEFECTS NOTICED IN PASSING

- `TODO.md` item 0 and `rho-maximal-law.md` §7 both still list "an analytic
  upper bound on ⟨ρ²⟩(z)" as a first move / NOT REACHED; it was closed
  2026-08-21 by `attack-rhoms-01.md`. Two stale pointers.
- `TODO.md` item 1e quotes "C_true = 0.60–0.78 at z = 13..29"; the measured
  values run to 0.8022 (`rho-maximal-law.md` §4), and §3 of that file states the
  band correctly as 0.60–0.80. The TODO band understates the maximum.

## 8. NOT REACHED

- Rosser–Schoenfeld opened at a page. FORM I*'s validity floor stands on
  [MEMORY]; the constant 170.88 does not depend on it.
- A mean-value bound on B₂ = Σ e²Vabs(e)² below its qmax·B ceiling, which is the
  named object that would sharpen FORM II's constant. Inherited unattempted from
  `attack-rhoms-01.md` §6.
- Anything on ⟨ρ̃⁴⟩. Named as the stopping object, untouched here.
- The s-freedom. Everything is s = 3.0; the constant 170.88 and the exponent 2s
  both move with s and were not scanned.
- Exact Λ at z = 31/37, the other first move of TODO item 0. Explicitly out of
  scope for this session.

*History and superseded claims: `research/history/CHANGELOG.md`.*
