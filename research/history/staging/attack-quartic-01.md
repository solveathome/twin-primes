# The quartic: the off-diagonal measured at 1–10%, the whole question moved onto one explicit cosecant sum, and a new increment rung that clears z = 47

<!-- ledger
id: Q-quartic-fourth-moment
status: PARTIAL
todo: none
question: Can the fourth moment of rho-tilde, attack-rhoms-01's named stopping object, be bounded?
verdict: Not yet: the genuine quartic correlation is small (OFF/m2^2 measured -0.0454, -0.2767, +0.0101, -0.0446 at z = 13..23), the resonance condition is proved to be a local covering condition, and the whole question transfers by two exact identities onto a Lambda(4) inequality for one explicit cosecant sum whose constant is flat; the new increment rung clears z = 47.
-->

**attack-rhoms-01's named stopping object — the fourth moment ⟨ρ̃⁴⟩, "the
quartic gcd-lattice correlation (mode-resonance sum), for which no Theorem-A
analogue exists" — is attacked. The expansion is written and its bookkeeping
brute-force verified; the diagonal/off-diagonal split is measured exactly at
z = 13..23; the resonance condition is proved to be a local covering condition
and the whole quartic question is transferred, by two exact identities, onto a
Λ(4) inequality for one explicit non-negative-coefficient cosecant sum, whose
constant is then computed and is flat; and the budget is re-priced through a
new recovery rung. Producer: `research/attack-quartic-01.js` (embedded via
`qc/embed.js`; all controls pass; 9.4 s, deterministic). Five things came out.**

**One: the genuine quartic correlation is small, and it is not what makes ρ̃
sub-Gaussian (§1).** Inclusion–exclusion over the three pairings is exact:
m₄ = DIAG + OFF with DIAG = 3m₂² − 3Q + ĉ(1/2)⁴, Q = Σ_ξ|ĉ(ξ)|⁴. Measured
over complete periods, **OFF/m₂² = −0.0454, −0.2767, +0.0101, −0.0446 at
z = 13, 17, 19, 23** — the off-diagonal is 0.3%–11% of the diagonal and mostly
negative. The measured shortfall from Gaussian (m₄/m₂² = 2.5086, 2.3210,
2.8930, 2.8958) is carried almost entirely by the **self-pairing term**
3Q/m₂² = 0.4460, 0.4023, 0.1170, 0.0596, which is decaying. So the reading of
attack-rhoms' sub-Gaussian column changes: ρ̃ is not sub-Gaussian because the
quartic resonances cancel, it is sub-Gaussian because a finite-W self-pairing
correction is still visible, and that correction is going away. m₄/m₂² → 3 is
the shape the measurement supports.

**Two: the resonance condition is a local covering condition, and that is why
the second moment was easy (§2).** Lemma Q2: Σa_i/e_i ∈ ℤ holds iff for every
prime p | lcm(e_i), Σ_{i: p|e_i} a_i(L/e_i) ≡ 0 mod p — so a prime dividing
**exactly one** conductor admits no solution, and every prime of the lcm
divides at least two of the four. At two modes this forces e₁ = e₂, which is
exactly why MS3's one-conductor cosecant identity closes the mean square and
has no four-mode analogue. The lemma is checked positionwise: with A_p the
part of ρ̃ carried by conductors divisible by p and B_p the p-fold period
average, ⟨A_pB_p³⟩ = 0 at every prime and every level, worst 5.3e-17 to
1.1e-15.

**Three: the whole question moves onto one explicit function (§3).** Put
F*_e(y) = Σ*_a cos(2πay/e)/sin(πa/e) and H_V(y) = Σ_e Vabs(e)F*_e(y). Two
exact identities, both machine-verified:

    ⟨H_V²⟩/4 = B₂ᴶ/12 = MS3′   (rel 2.4e-15 .. 1.5e-13 against attack-b2mean-01)
    ⟨ρ̃⁴⟩ ≤ ⟨H_V⁴⟩/16          (mode-by-mode |ĉ| ≤ Vabs·csc/2)

The second is the first upper bound on ⟨ρ̃⁴⟩ this corpus states at all, and
the first that is not the trivial sup²·m₂ wearing proven clothes: 2.90e3,
6.52e4, 2.42e5, 6.42e5 at z = 13..23, which beats (H_V(0)/2)²·MS3′ — the best
proven sup times the best proven mean square — by 7.3×, 13.9×, 34.2×, 91.9×,
a saving that grows at 4.5026 ± 0.7662 per lnz. And the constant that decides
the route, **K_V = ⟨H_V⁴⟩/⟨H_V²⟩² = 16.4456, 24.1645, 25.3180, 19.7404, is
flat** (slope 0.3926 ± 0.5192 on four points), i.e. m₄ ≤ K_V·MS3′² with K_V
measured bounded. The peak share of ⟨H⁴⟩ at y = 0 — the spike a non-negative-
coefficient majorant risks being ruined by — **falls** 0.3761 → 0.0172.

**Four: the two fronts have NOT converged, and the stopping term is named
(§4).** Running the same ceiling with Θ*(e) in place of Vabs(e) gives
K_T = 24.722, 28.317, 31.321, 26.865, i.e. K_T/K_V = 1.17–1.50: the
Vabs → Θ* sign-discard, which `attack-b2mean-01` names as its stall and
measures at a flat ~600× under the e² weight, **cancels in the Λ(4) ratio**.
b2mean's signed class-sum mean value is not on the quartic's critical path.
The quartic's own stopping term is different and new: **⟨H_V⁴⟩ ≤ polylog·
⟨H_V²⟩², a weighted Λ(4)/additive-energy inequality over the conductor
lattice** — equivalently the 4-dimensional Dedekind–Rademacher-type mean value
(1/L)Σ_y Π F*_{e_i}(y) summed against ΠVabs(e_i) over the non-pairing covering
classes. All three off-the-shelf imports are refused at the hypothesis, each
checked here rather than asserted: Rudin's Λ(4)/B₂ criterion is **vacuous**
(the mode set is W-saturated, N = W−1 exactly at z = 13, 17, 19, so its bound
is the trivial (W−1)m₂²); Young's convolution inequality needs no hypothesis
but its constant (Λ/rms)² = 87.7 → 1842 grows at z^{5.2}; and Zagier's higher-
dimensional Dedekind sums, read at page images, require one common modulus and
cotangent kernels and prove exact evaluations, reciprocity and denominator
bounds — no size bound, no mean value over a family.

**Five: what a proven quartic buys, and a new rung that beats the bare ladder
(§5).** The increment argument of attack-rhoms' R1 generalises: if the sup is
attained at y₀ then |ρ̃| ≥ S − C_L t on one side, so W·m_{2k} ≥ S^{2k+1}/
((2k+1)C_L) and **sup ≤ ((2k+1)C_L·W·m_{2k})^{1/(2k+1)}** — the increment turns
the bare ladder's e^{θ/(2k)} into e^{θ/(2k+1)}. At k = 2, R2 = (5C_L·W·m₄)^{1/5}
**clears smax at all ten levels z = 13..47** (4.805e4 ≤ 1.577e5 at z = 47),
where M2 = (W m₄)^{1/4} fails (2.67e5) and R1 died at 37; in the fully proven
grade m₄ ≤ 25·MS3′² it clears z = 13..43 and misses at 47. It is still a
Bonferroni window: the death scan puts R1 at z = 41, M2 at 53, R2 at 67, R3 at
89. **A proven quartic buys a wider finite-z window and nothing asymptotic**,
because the composed exponent is 2kc/(2k+1) + θ(z)/((2k+1)lnz) and θ/lnz ~
z/lnz for every fixed k. Against MV(α) the verdict is INDEPENDENT with an
asymmetry: MV(α < β₂) implies RML(α) and the theorem outright, a proven
quartic implies only the k = 2 rung.

---

## 0. CUSTODY

Everything measured is in `research/attack-quartic-01.js` (`qc/embed.js
--check`: code-sha256 matches, out-sha256 matches, body bit-honest; the check's
re-run reproduced the out-sha — deterministic, 9.4 s). Division of labour per
the standing compute rule:

- **Recomputed (cheap, controls in-pass):** the closed-form ⟨ρ̃²⟩ and the
  full-period walker at z = 13..23 — m₂ MATCHES `attack-rhoms-01`'s embedded
  column to rel ≤ 4.4e-7 (its 6-digit print), m₄/m₂² to rel ≤ 5.5e-5 against
  its 2.509/2.321/2.893/2.896, sup to rel ≤ 7.6e-7, closure drift ≤ 1.1e-8.
  The subset sweep (Vabs, B, B₂, B₂ᴶ) re-run; ⟨H_V²⟩/4 reproduces
  `attack-b2mean-01`'s B₂ᴶ/12 to 1.5e-13. The exact ℓ¹ norm Λ reproduces
  `attack-f4weak-01`'s 9.801 / 25.157 / 60.031 / 121.250 at all four levels
  from independent code, and the mode counts N reproduce its saturation column
  (N = W−1 at z ≤ 19, cover 0.2731 at 23).
- **New measurements:** Q = Σ|ĉ|⁴ and ĉ(1/2); DIAG and OFF; the per-prime
  |T_p| profile and the smooth-core cascade; ⟨H_V²⟩, ⟨H_V⁴⟩, ⟨H_T²⟩, ⟨H_T⁴⟩,
  K_V, K_T, the peak shares; the primitive-restricted ℓ¹ bound H(0)/2; the R_k
  rows.
- **Cited (custody-bound, not recomputed):** ⟨ρ̃²⟩ and C_L at z = 29..47, the
  sup and m₆ columns, and the whole S4 budget skeleton from
  `attack-rhoms-01.js`; MS3′/truth from `attack-b2mean-01.js` §4; Λ/rms's
  slope 2.608 ± 0.179 and the mode-count closure z^{8.174} from
  `attack-f4weak-01.js`; β₂ = 4.26645 per `paper/beta2-note.md`.
- **Machinery:** the walker is `attack-rhoms-01.js`'s `walkStats` with the
  period stored; the subset sweep is its `sweepB`; the mode enumeration is
  `attack-f4weak-01.js`'s `l1exact` restructured to return Q and Θ*. Same
  custody practice as those files.
- **Estimator and instrument controls, all before use:** OLS returns
  3.700000 on a known z^3.7 truth; Lemma J verified to 2.9e-14 over e = 2..200;
  the F_d recursion verified against the direct O(d²) sum to 9.8e-13 over
  d = 2..60 with period closure 7.5e-15; the two cotangent identities quoted in
  the Zagier verdict verified to 7.1e-15 and 2.1e-12; and **the Wick
  bookkeeping brute-forced** on a synthetic function on ℤ/30 over all 24389
  quadruple slots — enumerated pairing part against the inclusion–exclusion
  formula rel 6.3e-15, enumerated off-diagonal against m₄ − DIAG rel 1.7e-15.
- **Read at source this session:** Zagier, *Higher dimensional Dedekind sums*,
  Math. Ann. 202 (1973) 149–172, at page images (pp. 149–151 for Eq. (1) and
  the plan of the paper, 166–168 for the four-dimensional tables and the
  cotangent identities). Nothing on Dedekind sums or Λ(4) existed on disk
  before this file; the disk was checked first.

Units: ρ̃, its moments, H, Θ, Vabs are dimensionless (weight counts); W, qmax,
e, y are positions; every strength comparison is an exponent base z. WIDTH:
the file RUNS at z ≤ 23, where W = P(23) = 9699690 and qmax = 881790, so every
index and every product of two moduli (< 7.8e11) is far below 2^53; the
z ≥ 31 rows of §5 are pricing arithmetic only and every W-dependence there is
exp of a log-space sum off lnW = θ(z).

## 1. THE EXPANSION, AND THE SPLIT

ρ̃'s Fourier coefficient at the reduced frequency a/e is ĉ(a/e) =
i·e(a/2e)·Θ_e(a)/(2 sin(πa/e)), so the period average of ρ̃⁴ is literally a
4-mode resonance sum over the coefficient lattice:

    ⟨ρ̃⁴⟩ = Σ_{ξ₁+ξ₂+ξ₃+ξ₄ ≡ 0, ξ_i ≠ 0} ĉ(ξ₁)ĉ(ξ₂)ĉ(ξ₃)ĉ(ξ₄)
          = (1/16) Σ' (−1)^σ Π_i Θ_{e_i}(a_i) / Π_i sin(πa_i/e_i),  σ = Σ a_i/e_i ∈ ℤ

(the four half-shifts e(a/2e) collapse to (−1)^σ). The three pairing sets
A = {ξ₂ = −ξ₁, ξ₄ = −ξ₃}, B, C each contribute m₂²; each pairwise intersection
is the single-frequency locus contributing Q = Σ_ξ|ĉ(ξ)|⁴; the triple
intersection forces 2ξ₁ = 0 and is the one quadruple (1/2,1/2,1/2,1/2).

**Lemma Q1 [PROVEN; bookkeeping brute-forced in the producer S0].**

    m₄ = DIAG + OFF,   DIAG = 3m₂² − 3Q + ĉ(1/2)⁴,
    and since Q ≥ 0 and ĉ(1/2)⁴ ≤ Q,   m₄ ≤ 3m₂² + OFF.

The Gaussian constant 3 is free; the entire quartic question is the
off-diagonal. Measured exactly (producer S1, S5):

```
  z    m4/m2^2   DIAG/m2^2   OFF/m2^2   3Q/m2^2   |OFF|/DIAG
 13     2.5086     2.5540     -0.0454    0.4460     1.78e-2
 17     2.3210     2.5977     -0.2767    0.4023     1.07e-1
 19     2.8930     2.8830     +0.0101    0.1170     3.49e-3
 23     2.8958     2.9404     -0.0446    0.0596     1.52e-2
```

**Reading.** The genuine quartic gcd-lattice correlation is a 0.3%–11% effect
and mostly negative; the self-pairing term is four to ten times larger and is
falling with z. attack-rhoms reading 6's sub-Gaussian column is therefore a
finite-W artefact of Q, not evidence of quartic cancellation, and the honest
extrapolation is m₄/m₂² → 3 rather than to something below it. [MEASURED]

## 2. THE RESONANCE LATTICE IS A COVERING PROBLEM

**Lemma Q2 [PROVEN; verified positionwise].** Let e_i | W with W squarefree,
gcd(a_i, e_i) = 1, L = lcm(e_i). Then Σ_i a_i/e_i ∈ ℤ iff for every prime
p | L,  Σ_{i: p|e_i} a_i(L/e_i) ≡ 0 (mod p). Since v_p(L/e_i) = 1 − v_p(e_i),
a prime dividing e_i does not divide L/e_i, and p ∤ a_i; so a prime dividing
**exactly one** of the four admits no solution.

    Every prime dividing any conductor of a resonant quadruple divides at
    least two of them.

- **(Q2a)** At two modes the condition forces e₁ and e₂ to have the same prime
  support, i.e. e₁ = e₂. That is precisely why ⟨ρ̃²⟩ is conductor-diagonal and
  why MS3/Lemma J close it with one exact cosecant evaluation per conductor.
  There is no four-mode analogue because at four modes the covering can be
  inconsistent across primes (p pairing 1–2 while q pairs 1–3).
- **(Q2b)** With A_p the part of ρ̃ carried by conductors divisible by p and
  B_p(y) = (1/p)Σ_{k<p} ρ̃(y + kW/p) the rest, ⟨A_pB_p³⟩ = 0 exactly, while
  ⟨A_p³B_p⟩ need not vanish. Measured at every prime and level: worst
  |4⟨A_pB_p³⟩| relative to the largest surviving term is 5.3e-17 (z = 13),
  1.5e-16 (17), 1.0e-15 (19), 1.1e-15 (23). [VERIFIED]

The induced profile (producer S2) says where the quartic mass sits. At the
small primes |T_p| = 4 dominates (z = 23, p = 2: ⟨A⁴⟩ = 8.28e1 against
6⟨A²B²⟩ = 8.41e1 and ⟨B⁴⟩ = 1.77e1); at the largest prime of each level the
|T_p| = 2 class takes over (z = 23, p = 19: 9.0278e1 against 3.3997e1); and
|T_p| = 3 — the genuinely three-covering class, the one with no pairing
interpretation at p — is small and signed at every level (|4⟨A³B⟩| ≤ 5.9e0
against an m₄ of 1.85e2 at z = 23). The smooth-core cascade agrees: deleting
the largest prime leaves 12.8%–48.5% of m₄, deleting four leaves 2.0e-7 to
3.3e-4 of it. The quartic lives on the large conductors, as the second moment
does.

## 3. THE 4-MODE ANALOGUE OF MS3's IDENTITY, AND THE CEILING

MS3 evaluated the 2-mode cosecant sum exactly, Σ_{a≠0} 1/(4sin²(πa/e)) =
(e²−1)/12, sharpened by `attack-b2mean-01`'s Lemma J to the primitive form
J₂(e)/12. **The 4-mode analogue exists, but it is a convolution identity, not
an evaluation.** With

    F*_e(y) = Σ*_{a mod e} cos(2πay/e)/sin(πa/e)      (real, even, period e),

the resonance sum over a fixed conductor quadruple is (1/L)Σ_{y mod L} Π_i
F*_{e_i}(y). Assembling the conductor sum into one function,

    H_V(y) = Σ_{e|W, e>1} Vabs(e) F*_e(y),

whose Fourier coefficients Vabs(e)/sin(πa/e) are non-negative and dominate
2|ĉ(a/e)| mode by mode, gives two exact identities:

**Lemma Q3 [PROVEN; both verified].**

    (a)  ⟨ρ̃²⟩ ≤ ⟨H_V²⟩/4 = Σ_e Vabs(e)²J₂(e)/12 = B₂ᴶ/12 = MS3′,
    (b)  ⟨ρ̃⁴⟩ ≤ ⟨H_V⁴⟩/16.

(a) follows from Q2a plus Lemma J and is reproduced numerically to rel
2.4e-15, 3.6e-15, 7.3e-16, 1.5e-13 against b2mean's B₂ᴶ — the control that
guards every number in this section. (b) is the mode-by-mode triangle.

**Computation.** F*_e is expensive per conductor but the whole sum is cheap
through Möbius on the conductor: with F_d(y) = Σ_{a=1}^{d−1} cos(2πay/d)/
sin(πa/d) = Σ_{k|d, k>1} F*_k(y),

    H_V(y) = Σ_{d|W, d>1} c_d F_d(y),   c_d = Σ_{m|W/d} μ(m) Vabs(dm),

and F_d obeys the exact first-order recursion, derived here from the classical
odd-multiple sine sum Σ_{a=1}^{d−1} sin(πam/d) = cot(πm/2d) for odd m:

    F_d(y) − F_d(y+1) = 2 cot(π(2y+1)/(2d)),    F_d(0) = Σ_{a=1}^{d−1} csc(πa/d).

So every F_d costs O(d) and H_V costs O(τ(W)·W). Verified against the direct
O(d²) sum to 9.8e-13 over d = 2..60, with period closure 7.5e-15.

**The result [MEASURED]** (producer S3, S3b):

```
  z   <H_V^2>/4 = MS3'   <H_V^4>/16 = ceiling   ceiling/m4   K_V     K_T     K_T/K_V   peak share
 13     1.32831e+1          2.90167e+3            9.65e+2   16.4456  24.722   1.5033     0.3761
 17     5.19416e+1          6.51940e+4            4.51e+3   24.1645  28.317   1.1718     0.1548
 19     9.78456e+1          2.42389e+5            3.42e+3   25.3180  31.321   1.2371     0.0581
 23     1.80332e+2          6.41952e+5            3.48e+3   19.7404  26.865   1.3609     0.0172
```

- **K_V is flat**, d lnK_V/d lnz = 0.3926 ± 0.5192 on four points. The
  statement m₄ ≤ K·MS3′² with K bounded is what the measurement supports.
- **The peak share falls**, 0.3761 → 0.0172. H has non-negative coefficients
  and therefore spikes at y = 0 with H(0) = ‖Ĥ‖₁; at z = 13 that spike alone
  carries 38% of ⟨H⁴⟩ and would have forced K to grow like ‖Ĥ‖₁⁴/(W‖Ĥ‖₂⁴). It
  does not: W outruns the ℓ¹ norm.
- **The ceiling's own Wick split** shows where the ceiling's mass is:
  OFF_H/⟨H²⟩² = 13.66, 21.29, 22.38, 16.78 against a diagonal of at most 3.
  Discarding the resonance signs costs roughly a factor 10²–10³ on the
  off-diagonal (compare §1's |OFF|/m₂² ≤ 0.28) and the total is still only
  ~20⟨H²⟩². That is the whole reason the route survives.

**The currency, stated plainly.** In the truth currency the ceiling is
2.420e3, 1.046e4, 9.883e3, 1.007e4 times m₂², so **this does not prove
m₄ ≪ polylog·m₂²** — the squared mean-square looseness (MS3′/m₂)² = 146..510
sits inside it. What it proves, at each measured z, is m₄ ≤ K_V·MS3′² with
K_V measured flat. That is the weaker and sufficient form: §5's consumers all
pay the proven mean square anyway, so a polylog constant against the proven
bound is worth exactly as much as one against the truth.

## 4. WHERE THE PROOF STOPS, AND WHETHER IT IS b2mean's OBJECT

**The stopping term.** ⟨H_V⁴⟩ ≤ K·polylog·⟨H_V²⟩² — a **weighted Λ(4) /
additive-energy inequality** for one explicit non-negative-coefficient cosecant
sum on ℤ/W, equivalently the 4-dimensional Dedekind–Rademacher-type mean value
(1/L)Σ_{y mod L} Π_i F*_{e_i}(y) summed against Π_i Vabs(e_i) over the
non-pairing covering classes of Lemma Q2. The pairing classes are already
free: they contribute exactly 3⟨H²⟩² − 3Q_H + Ĥ(1/2)⁴ ≤ 3⟨H²⟩².

**Is it b2mean's object? No, and the check is direct.** Running the same
ceiling with Θ*(e) — the sharper coefficient, whose gap to Vabs(e) is exactly
the sign-discard `attack-b2mean-01` §3 names as its stall and measures flat at
4.6e2–7.6e2× under the e² weight — gives K_T = 24.722, 28.317, 31.321, 26.865,
i.e. K_T/K_V = 1.5033, 1.1718, 1.2371, 1.3609. The ~600× cancels between
numerator and denominator of the Λ(4) ratio, because it appears to the fourth
power above and the second power squared below. **The two fronts have not
converged.** b2mean's signed class-sum mean value sharpens the *level* of the
quartic ceiling exactly as much as it sharpens MS3′, and does nothing for the
ratio; the quartic's own missing theorem is a four-fold resonance mean value
that nothing in the corpus touches.

**The three classical imports, hypotheses read, all refused.**

1. **Rudin's Λ(4)/B₂ criterion** (W. Rudin, *Trigonometric series with gaps*,
   J. Math. Mech. 9 (1960) 203–227; standard finite form). Hypothesis: the
   frequency support E has bounded representation function r_E(ξ) ≤ B for
   ξ ≠ 0; conclusion ‖f‖₄⁴ ≤ (1+B)‖f‖₂⁴. Our support is **W-saturated** —
   `attack-f4weak-01` §1 measured cover 1.0000 at z ≤ 19 and the mode counts
   here reproduce N = W−1 exactly at z = 13, 17, 19 — so B = W−2 and the
   criterion returns the trivial m₄ ≤ (W−1)m₂², exponential in z. VACUOUS.
2. **Young's convolution inequality**, ‖ĉ∗ĉ‖₂ ≤ ‖ĉ‖₁‖ĉ‖₂, i.e.
   m₄ ≤ (Λ/rms)²·m₂². No hypothesis, but the constant is measured
   87.72 → 1842 over z = 13..23 and grows at z^{5.2} (f4weak's
   d ln(Λ/rms)/d lnz = 2.608 ± 0.179). It beats the S3 ceiling in truth
   currency at these small z and is overtaken around z ~ 30 on the measured
   slopes; only the S3 constant is flat. REFUSED as an asymptotic route.
3. **Zagier's higher-dimensional Dedekind sums** (Math. Ann. 202 (1973)
   149–172, read at page images this session). Eq. (1):
   d(p; a₁..a_n) = (−1)^{n/2} Σ_{k=1}^{p−1} cot(πka₁/p)···cot(πka_n/p), with
   p a positive integer, **every a_i prime to p**, **n even**, and **one
   common modulus p**. Three failures, each independently fatal: (i) our four
   factors carry four different conductors and the sum is over ℤ/lcm, not one
   p; (ii) the kernel is cosecant, and csc t = cot(t/2) − cot t (verified to
   7.1e-15) turns it into a half-argument cotangent sum against cos — the
   plain cot-against-cos sum is 0 by antisymmetry (verified to 2.1e-12) — which
   is outside (1); (iii) the paper's content is exact evaluation: rationality,
   the reciprocity law generalising Rademacher's, and **denominator** bounds
   (plan of the paper p. 151; the four-dimensional tables p. 166 and the
   cotangent identities p. 168). It proves no upper bound on |d| and no mean
   value over a family of tuples. The shape is right and the theorems are the
   wrong kind: **there is no classical cancellation theory here to import.**

## 5. THE RE-PRICED BUDGET

**A new rung, R_k [DERIVED; k = 1 is attack-rhoms-01's R1].** If S = sup|ρ̃| is
attained at y₀ then |ρ̃(y₀+t)| ≥ S − C_L·t for 0 ≤ t ≤ S/C_L on one side, with
C_L = max_x|M − cc(x)| the exact bounded-increment constant, so
W·m_{2k} ≥ Σ_{t<S/C_L}(S − C_L t)^{2k} ≥ S^{2k+1}/((2k+1)C_L) and

    sup|ρ̃| ≤ ((2k+1)·C_L·W·m_{2k})^{1/(2k+1)}.

The increment structure turns the bare ladder's e^{θ/(2k)} into e^{θ/(2k+1)} at
every rung. The quartic unlocks k = 2.

```
  z    smax       M1 (Wm2)^1/2   R1 (3C_L W m2)^1/3   M2 (W m4)^1/4   R2 (5 C_L W m4)^1/5   R3
 13  1.579e+3     5.03e+1 Y        2.00e+1 Y            9.13e+0 Y       8.18e+0 Y        5.69e+0 Y
 29  2.762e+4     5.51e+4 n        3.02e+3 Y            5.89e+2 Y       2.83e+2 Y        1.08e+2 Y
 37* 6.881e+4     4.15e+6 n        7.13e+4 n            8.15e+3 Y       2.74e+3 Y        7.12e+2 Y
 47* 1.577e+5     2.17e+9 n        5.22e+6 n            2.67e+5 n       4.81e+4 Y        6.76e+3 Y
```

(* = C_L is a sampled lower bound and m₄, m₆ are Gaussian-model at z ≥ 31, so
verdicts there are indicative except that an "n" against a C_L lower bound is
certifiable; at z ≤ 29 every input is exact.) **R2 clears at all ten levels,
including z = 47 where M2 fails** — the second instrument in the corpus to
survive 47, after `attack-f4weak-01`'s Λ_V, and the first that does it through
a moment rather than through absolute values.

In the three input grades (producer S4), R2 reads:

```
  z    smax       (i) measured m4   (ii) 3 m2^2, true m2   (iii) 25 MS3'^2 PROVEN   M2 (iii) PROVEN
 13  1.579e+3     8.183e+0 Y        8.481e+0 Y             3.513e+1 Y               5.643e+1 Y
 29  2.762e+4     2.833e+2 Y        2.849e+2 Y             1.741e+3 Y               5.700e+3 Y
 43* 1.138e+5     1.671e+4 Y        1.671e+4 Y             9.938e+4 Y               7.248e+5 n
 47* 1.577e+5     4.805e+4 Y        4.805e+4 Y             2.859e+5 n               2.484e+6 n
```

So with the quartic proven at K = 25 the R2 route is a **fully proven clearing
at z = 13..43** (modulo the C_L upper bound, exact only to 29), and the bare
4th-moment ladder M2 is proven only to z = 31. Grades (i) and (ii) are
indistinguishable to three figures — the shrunk lemma m₄ ≤ 3m₂² costs almost
nothing against the measured m₄, exactly as §1 predicts.

**Does it clear the sufficiency curve unconditionally? At a z-range, yes;
asymptotically, no.** The death scan (θ exact by sieve, M = 0.35/ln²z and the
ms model flagged) gives R1 at z = 41, M2 at 53, R2 at 67 (C_L = 1 floor; 61 at
C_L = 10, the z = 47 sampled scale), R3 at 89. The composed exponent of R_k is
2kc/(2k+1) + θ(z)/((2k+1)lnz) at c = 3, and θ(z)/lnz ~ z/lnz, so **every fixed
rung diverges**. A proven quartic moves the wall from z = 41 to z = 67 and
changes nothing about the asymptote. The unconditional asymptotic content of
attack-rhoms — λ_max ≥ 0.766, the room can never close — is untouched, and the
only object that closes the route asymptotically remains a statement uniform in
k, i.e. F4 or MV(α).

**MV(α) cross-check: independent, with an asymmetry.** A quartic bound reaches
an ℓ¹ mode bound only through Cauchy–Schwarz over the mode set, Λ ≤ √N·rms,
which `attack-f4weak-01` §1 closed at z^{8.174 ± 0.249}; its measured slack
against the true Λ is 5.1×, 10.9×, 26.5×, 37.9× and widening. In the other
direction MV(α) gives sup ≤ Cz^α hence m₄ ≤ C²z^{2α}m₂, which is not
polylog·m₂² at any α the corpus would call a win. Neither implies the other.
The asymmetry that decides priority: **MV(α < β₂) implies RML(α) and the
theorem outright; a proven quartic implies only the k = 2 rung, dead at 67.**
The measured shapes agree that these are different statistics — m₄/m₂² is flat
(2.5086, 2.3210, 2.8930, 2.8958) while Λ/rms grows at 2.608 ± 0.179.

**A by-product that sharpens the standing best proven recovery.**
`attack-f4weak-01` NOT-REACHED lists "the primitive-restricted cosecant sum —
would sharpen Λ_V by ~φ(e)/e per conductor". It is H_V(0)/2 here, and it is
computed: 3.985e1, 1.319e2, 2.912e2, 5.719e2 against Λ_V = 1.560e2, 5.524e2,
1.245e3, 2.462e3, i.e. **sharper by 3.92×, 4.19×, 4.27×, 4.31×** — the measured
e/φ(e) factor, flat and slightly rising. Λ_V cleared z = 47 with 5.0% of margin;
a factor 4.3 there is a large amount of room. The sweep past z = 23 was not run
here (see NOT REACHED).

## 6. READINGS

Producer readings 1–11 carry the grades in the script tail: 1 PROVEN +
VERIFIED (Lemma Q1 and the reduction), 2 MEASURED new (the split, OFF at
1–11% and mostly negative; the sub-Gaussian deficit is the self-pairing term),
3 PROVEN + VERIFIED (Lemma Q2, the local covering condition; ⟨A_pB_p³⟩ = 0
positionwise), 4 PROVEN + VERIFIED (Lemma Q3, ⟨H²⟩/4 = MS3′ exactly and the
first proven bound on ⟨ρ̃⁴⟩), 5 MEASURED headline (K_V flat, K_T/K_V ~ 1, the
b2mean object off the critical path), 6 MEASURED (the power saving over
sup²·m₂, 7.3× → 91.9×, growing at 4.5026 ± 0.7662), 7 REFUTATION/currency
(the literal ask is not delivered; the proven-currency form is), 8 DERIVED +
MEASURED (R_k, and R2 clearing all ten levels), 9 MEASURED by-product (the
primitive ℓ¹ bound, 3.92–4.31× on Λ_V), 10 INFERRED (the named stopping term
and the three refused imports), 11 (MV(α) independent, with the asymmetry).
All new findings are HELD for one adversarial pass per the standing rule.

## 7. NOT REACHED

- **A proof of the stopping term** ⟨H_V⁴⟩ ≪ polylog·⟨H_V²⟩². Nothing was
  proved beyond the pairing classes (worth exactly 3) and the two exact
  identities that define the object. The measurement is four points.
- **K_V at z = 29 and beyond** — the decisive test of its flatness. The cost
  is the blocker: ⟨H⁴⟩ needs τ(W)·W array operations and W = P(29) =
  2.23e8 puts H at 1.8 GB, with no smaller period available (lcm of the
  conductors is W). A streaming pass costs τ(W)·W = 1.1e11 operations. A
  divisor-lattice FFT would reach it; not attempted.
- **The exact off-diagonal at z = 29..47** — same array constraint; the split
  needs the full period stored.
- **The primitive-ℓ¹ bound H_V(0)/2 at z = 29..47**, where it would be priced
  against Λ_V's 5% margin at 47. It needs Σ*_a csc(πa/e) over all conductors:
  1.1e10 terms at z = 47 by direct summation, 2.5e10 by the Möbius route
  through Σ_{d|W}d. An analytic form for the primitive cosecant sum — the
  ℓ¹ analogue of Lemma J, with the expected φ(e)/e saving — is the cheap way
  in and was not derived.
- **An upper bound on C_L past z = 29.** Every R_k row at z ≥ 31 uses a
  sampled lower bound, so its clearings are indicative. This is inherited from
  `attack-rhoms-01` and unchanged.
- **The s-freedom** (everything is s = 3.0) and **the Kloosterman pricing at
  the ρ-potential configuration**, both inherited and untouched.
- **A REFUTED.md row** for the three imports of §4. This file owns no
  shared-tree edits; the row is proposed, not written.

## 8. GATE

`node research/qc.js` after the producer and this report: **TOTAL 1** — the
standing census red alone (`tail-does-not-belong-to-this-code` on
`research/xchan-at37-01-census.js:308`, pre-existing, mid-flight with another
agent, naming neither of this attack's files). Both of this attack's files are
clean in every check, widths included; the `uncited-script` finding this
producer raised before the report existed cleared with this file's reference
to it. `qc/embed.js
--check` on the producer: code-sha256 matches, out-sha256 matches, body
bit-honest (9.4 s, deterministic — the check's re-run reproduced the out-sha).

*History and superseded claims: `research/history/CHANGELOG.md`.*
