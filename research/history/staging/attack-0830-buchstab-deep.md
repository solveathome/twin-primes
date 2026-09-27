# The deep-ladder Buchstab transfer at dimension 2 is a bracket, not a theorem: the sharp sieve delivers F₂(s)/f₂(s) on the ratio the certificate needs, the bracket is 3.7 wide at the best sifting parameter any run level offers and the correction it would have to resolve is 11 percent at most, and in the certificate's legal direction the bracket's upper side alone leaves the floor negative at every depth at @23

<!-- ledger
id: Q-buchstab-deep-0830
status: CLOSED
todo: 8
question: Can the certificate engine's deep-ladder Buchstab transfer be proven at dimension 2 at the depths the run levels reach by a route that does not go through the fundamental lemma at s >= 22.06 or the constant-free DH Theorem 9.1 (TODO 8a)?
verdict: NO by any instrument this corpus can cite, and the non-closing step is structural, not a constant: the transfer is an asymptotic for a ratio of two dimension-2 sifting functions at one sifting depth z = q, so a sieve bracket [f2, F2] survives undivided in the ratio (width 3.67 at the best sigma any level has, 4.71 at the @23 head); a correction |B - 1| >= 1% can only occur at sigma(q) < 1.8 where f2 = 0 and F2 >= 7.85, while a lower bound exists only at sigma > 4.266 where |B - 1| < 1e-5; the Buchstab identity iterated once is already negative at K = 1 for q = 37 at @23 and is the sieve itself when iterated fully; Jurkat-Richert fails Omega(1) as stated; in the certificate's legal direction F2 beats the trivial cap_K <= cap2 at 0 of 1512930 (q, K) pairs at @23, so the sharp-sieve floor is -1733138 at every K; the transfer stays HEURISTIC, what would move it is a kappa = 2 asymptotic in the open band 2 < sigma < 4.266, and part (b) is scoped and graded, not attacked.
-->

> **RIDER 2026-08-30 (orchestrator, from `redteam-0830-engine.md`, which
> reproduced 26 of 26 comparisons with 0 disagreements, including F₂/f₂ =
> 3.6682 at σ = 4.7088 by a near-analytic route, the 0-of-1,512,930 count and
> Route B's values).** One derivation REFUTED: §§213-229's "|B − 1| ≥ c forces
> σ(q) < u_c − 1, at any level, level-free" is not a valid implication (it
> bounds every u in a weighted average by the largest and treats the average's
> denominator as e^{−γ}); exhaustively over all 1,512,930 (q, K) pairs at @23
> it fails for this engine's own model B at c = 0.10, 0.05, 0.02 and for
> measured B_true at every c, including on pairs with cap_K ≥ 1000 (at c =
> 0.01: 33,875 pairs, σ up to 2.159 against the allowed 1.798). THE
> CONCLUSION SURVIVES AT @23 AS A MEASUREMENT (worst σ = 2.159 against
> β₂ = 4.26645); the level-free claim does not, and `REFUTED.md` row 97 is
> corrected. Also WEAKENED: "the best σ any level has" is wrong (@29's head σ
> is 5.5785, @97's 17.1422); q_27 = 151, not 131; the 10²⁷ × main figure is
> head-only; "waste" names both 868 and 693.

*(2026-08-30. Staging note. HELD. No existing repo file was edited, moved or
deleted; no git command was run. One producer, formally embedded:
`research/history/staging/attack-0830-buchstab-deep.js`; every number below
is quoted from its embedded OUTPUT block by SEC, or from an existing embedded
artifact cited by file and line. Calibration per claim: PROVEN, VERIFIED by
exact computation, MEASURED, HEURISTIC, OPEN, CLOSED. Tags: `[CITED]` a repo
artifact quoted, not recomputed; `[CITED-REPO-PAGE]` a literature statement
quoted from a repo file that recorded reading it at a page; `[LIMIT-FORM]` a
sieve statement with its remainder and unwritten O-constant set to zero, i.e.
a statement about the limit at fixed s and never a finite-level bound;
`[DERIVED]` an argument carried out here. Wrong-direction guard:
`attack-wrongdirection-audit.md` §2 row 7 grades item 8 undetermined, legal
at fixed u > 2 and TPC-strength if uniform in u down to 2; every bound below
is stated at a fixed level and fixed q, and the one direction the certificate
can use, an UPPER bound on cap_K(q), is named at each step.)*

## 0. Verdict, disconfirming half first

1. **No route closes, and the reason is a structural inequality, not a
   missing constant.** The transfer asserts an asymptotic for the ratio
   #A_K(q)/#A_0(q) of two dimension-2 sifting functions that share the sifting
   depth z = q. Any sieve bracket [f₂(σ), F₂(σ)] therefore enters the ratio
   undivided, as [f₂/F₂, F₂/f₂]. At the best σ any run level has, the @23 head
   prime (σ = 4.7088), that width is 3.6684 [SEC 2]. The correction the
   transfer would have to resolve is |B − 1| ≤ 0.11 [SEC 0, e^γω(2) =
   0.890536]. §4. [DERIVED, on MEASURED σ]
2. **Where the correction is non-zero there is no lower bound at all, and
   where a lower bound exists the correction is below 10⁻⁵.** A departure
   |B − 1| ≥ 0.01 needs u = ln n/ln y_K < 2.798, which forces σ(q) < 1.798,
   where f₂ = 0 and F₂ ≥ 7.849; a lower bound needs σ > β₂ = 4.26645, i.e.
   u > 5.27, where |e^γω(u) − 1| < 10⁻⁵ (u_c = 4.705 for c = 10⁻⁵) [SEC 2b].
   The sharp sieve, like the shallow theorem, certifies the transfer exactly
   where the transfer does nothing. [DERIVED]
3. **In the certificate's legal direction the sharp sieve certifies nothing
   past K = 0 at @23.** The certificate uses an upper bound on cap_K(q). The
   F₂ upper bound X V_K F₂(σ(q)) is above the trivial #A_K ≤ #A_0 at 0 of
   1,512,930 (q, K) pairs; the least ratio is 1.475 at q = 31. So the floor
   N − Σ_q cap_K^{sharp} is −1,733,138 at every K, the K = 0 value, against a
   measured 4,841 at K* = 27 and 596,782 at full depth [SEC 3, VERIFIED
   against natal-cap-28's embedded meas column at all nine K]. That is with
   the remainder and DH Theorem 9.1's unwritten O-constant both set to zero.
4. **The Buchstab identity iterated is dead from K = 1.** Bonferroni-1 with
   F₂ on the subtracted terms gives B ≥ 0.792 at (q = 31, K = 1) and −0.308
   already at (q = 37, K = 1), −1.628 at K = 2 [SEC 3, LIMIT-FORM]; iterated
   fully it is a combinatorial sieve under Ω(2), which is Route A again. §3.2.
5. **Jurkat-Richert does not apply as stated**: the object fails Ω(1) (two
   classes per prime up to y_K). Reformulated with the sifted set as ambient
   it is the κ = 1 sibling `thm-capK-bv.md`, EMPTY through @31 and 19.8 wide
   at @37 (`thm-sharp-sieve-range.md` §3 [CITED]). §3.3.
6. **At finite level the remainder alone, exactly computed, exceeds the lower
   main term at the @23 head.** 2Σ4^{ν(m)}|r_A(m)| = 97,080 against
   X V f₂ = 53,299 at q = 31 (ratio 1.82), and 250,017 against 8,133 at
   q = 37; only at the @29 head is it below (230,050 against 3,666,277), and
   there the O-constant is still unwritten [SEC 4, VERIFIED]. So reading (F)
   of `thm-sharp-sieve-range.md` §5, EMPTY, stands at every level with a
   second, constant-free reason at @23.
7. **What stands.** Route A gives a PROVEN [LIMIT-FORM] bracket on the ratio,
   [0.211, 4.740] at (q = 31, @23), which contains the measured B_true = 1.0000
   and the engine's B_model = 1.0000 [SEC 3]. The per-q true B is measured for
   the first time here: it stays within 0.007 of 1 for q ≤ 1009, departs by
   0.022 at q = 2003 full depth (0.9780) and reaches 0.9044 at q = 4001 full
   depth against a model 0.9586 [SEC 3, MEASURED, counts of order 10³ at
   those q]. Kill verdict: the only asymptotic
   instrument at κ = 2 is the fundamental lemma (CLOSED at s ≥ 22.06) and the
   only sharp instrument is Theorem 9.1 (CLOSED as a finite-level statement);
   TODO 8(a)'s deep-ladder transfer is marked CLOSED as a sieve route, and the
   statement itself stays HEURISTIC. Part (b) is scoped in §6.

| claim | confidence | rung |
|---|---|---|
| the ratio's bracket is [f₂/F₂, F₂/f₂] because both counts sit at z = q | 0.95 | DERIVED |
| |B − 1| ≥ 0.01 forces σ(q) < 1.798 | 0.90 | DERIVED from σ(q) < u − 1, on the engine's ω grid |
| F₂ never beats the trivial bound at @23 | 0.98 | VERIFIED, exhaustive over the scour |
| the exact remainder exceeds X V f₂ at the @23 head | 0.95 | VERIFIED, A side, two classes mod 30 |
| this note opens a route | 0.01 | it closes the sieve routes to 8(a) |

## 1. The transfer statement at dimension 2, with quantifiers

Objects as in `thm-buchstab-transfer-shallow.md` §3.1 [CITED]: level x,
W = x#, scour prime q with x < q ≤ √W, T = ⌊(W ± 1)/q⌋, A = {m ≤ T : m ≡ a
(mod 30)} over the two admissible classes a, the residue system Ω_p = {0,
−2q⁻¹} for 7 ≤ p ≤ y_K and {0} for y_K < p < q, y_K = q_K the K-th scour
prime (y_0 = x), and #A_K = S(A, q) under that system, so that cap_K(q) =
s(q) + #A_K + #B_K. The density identity V_K/V_0 = ∏_{i≤K}(1 − 1/(q_i − 1))
is exact ([CITED], same note §1).

> **Transfer Statement D2** (what RESULT 2 of `natal-cap-28` asserts, written
> out). For every level x, every scour prime q ≤ √W and every depth K ≤ idx(q):
> #A_K(q) = #A_0(q) · ∏_{i≤K}(1 − 1/(q_i − 1)) · B(q,K) · (1 + ε(x, q, K)),
> with B(q,K) = ⟨ω(ln n/ln y_K)⟩/⟨ω(ln n/ln x)⟩ the engine's dimension-1
> ratio, and Σ_q (cap₂(q) − s(q))·∏·B·|ε| small against the floor. At @23 the
> floor at K* = 27 is 4,841 against Σcap₂ = 7,034,588 [SEC 3], so the
> quantifier on ε is a relative accuracy of 7·10⁻⁴ of the total [ARITHMETIC
> on those two figures], summed over
> the whole scour including the tail where cap_K(q) is O(10²).

**"At a depth the run levels reach" means** the pairs (q, K) with q ≤ √W and
K ≤ K*(x). The sifting parameter the κ = 2 sieve of #A_K has is σ(q) = ln
T/ln q, the same for every K because z = q for every K; it runs from σ(q₀) at
the head to exactly 1 at q = √W. The κ = 2 part of the mixed sieve alone, at
the engine's crossing depth y*, has ln T/ln y* ∈ [1.916, 3.161] at @23 and
[1.779, 3.361] at @97 [SEC 1; the @97 pair reproduces
`thm-buchstab-transfer-shallow.md` §5's 1.779 and 3.361 [CITED]].

**Direction.** The certificate is survivors ≥ N − Σ_q cap_K(q), so it can use
only the upper half, #A_K ≤ #A_0·∏·B·(1 + ε). The lower half is what an
asymptotic needs and it never enters a certificate; every lower bound below
is printed for the transfer's sake, not the certificate's. Both halves are at
a fixed level and fixed q, inside the legal band of
`attack-wrongdirection-audit.md` §2 row 7.

## 2. The sifting parameter each run level actually has

[SEC 1, MEASURED; σ(q₀) at @23 and @97 asserted against the sibling notes'
4.7088 and 17.1422, which are the brief's "4.7" and "17.1", verified.]

| x | ln W | q₀ | σ(q₀) | share of log-depth with f₂ > 0 | scour primes with f₂ > 0 |
|---|---|---|---|---|---|
| 13 | 10.310 | 17 | 2.6390 | 0.00% | 0/34 |
| 17 | 13.143 | 19 | 3.4637 | 0.00% | 0/120 |
| 19 | 16.088 | 23 | 4.1308 | 0.00% | 0/435 |
| 23 | 19.223 | 29 | 4.7088 | 4.53% | 3/1739 = 0.17% |
| 29 | 22.590 | 31 | 5.5785 | 10.88% | 10/7863 = 0.13% |
| 37 | 29.635 | 41 | 6.9803 | 17.23% | 47/198274 = 0.02% |
| 53 | 44.931 | 59 | 10.0190 | 24.22% | n/a (√W too large to sieve here) |
| 97 | 83.728 | 101 | 17.1422 | 30.29% | n/a |

The brief's "s available at each run level" is the head value only. By count
of scour primes the band where a lower bound exists at all is 0.17% of the
scour at @23 and shrinks with x; by log-depth it grows to 30% at @97, the
figure `thm-sharp-sieve-range.md` §4 reports [CITED, reproduced].

## 3. Three routes that do not go through the fundamental lemma

### 3.1 Route A: the DHR functions on numerator and denominator separately

**Instrument.** Diamond–Halberstam Theorem 9.1, p. 104, read at a repo
photograph (`lit-pdf-halberstam-richert.md` §6.1 [CITED-REPO-PAGE]), κ = 2,
2κ = 4 an integer; F₂, f₂ from the Booker–Browning system with α₂, β₂
rigorous to 20 places (`dhr-verification.md` §1.1 [CITED]); marched here by
the solver copied verbatim from the embedded `attack-beta2-04-loss-budget.js`
and checked against four of its OUTPUT figures to 4.9·10⁻⁷ [SEC 0].

**Hypothesis, and whether the tile satisfies it as stated.** Ω(κ) is the
one-sided product bound ∏_{z₁≤p<z}(1 − ω(p)/p)⁻¹ ≤ (log z/log z₁)^κ (1 +
A/log z₁) (`dhr-verification.md` §2.3 [CITED]). The mixed system has ω(p) ∈
{1, 2} for p ≥ 7 and 0 below, so it satisfies Ω(2) with an absolute A by
Mertens, and ω(p) < p holds. The remainder |r_A(m)| ≤ ω(m) is trivial
because the comb sits inside the sieve (shallow note §3.2 [CITED]). So the
theorem applies AS STATED, to #A_K at every K, with the same σ. [DERIVED]

**What comes out at σ = 4.7088** [SEC 2, LIMIT-FORM]: F₂ = 1.48779,
f₂ = 0.40557, so #A_K ∈ X V_K·[0.4056, 1.4878] for every K at q = 29, and the
ratio's bracket is [0.4056/1.4878, 3.6684]. At q = 31 (the first q with K ≥ 1
available) σ = 4.598, bracket [0.211, 4.740]; at q = 37, σ = 4.324, bracket
[0.039, 25.347]; from q = 41 on, f₂ = 0 and there is no lower side [SEC 3].
Width targets: F₂/f₂ < 1.1229 (the deep-end correction) needs σ ≥ 6.422,
first met by a head prime at x = 37; < 1.001 needs σ ≥ 8.746, x = 47
[SEC 2]. Those are head primes, where B = 1 to 10⁻⁵ (§0 item 2).

### 3.2 Route B: the Buchstab identity iterated to the depth available

S_K = S_0 − Σ_{i≤K} S(A⁽ⁱ⁾) + Σ_{i<j} S(A⁽ⁱʲ⁾) − …, A⁽ⁱ⁾ = {m ∈ A : m ≡
−2q⁻¹ (mod q_i)}, each term a sieve of the same shape with X/q_i elements,
density V_0/(1 − 1/q_i) and level D/q_i, σ_i = ln(T/q_i)/ln q. Truncating
after the first sum and bounding it above by F₂ gives, as a limit statement,
B ≥ (1 − Σ_{i≤K} F₂(σ_i)/((q_i − 1) f₂(σ)))/∏. This is the LOWER side (not
the certificate's). At @23: 0.792 at (31, 1); −0.308 at (37, 1); −1.628 at
(37, 2) [SEC 3]. The upper side from the second truncation needs f₂(σ_i),
which is 0 at every i, so it returns S_K ≤ S_0, the trivial bound. Iterating
to depth K optimally is a combinatorial sieve under Ω(2) alone, for which the
best functions this repo can cite are F₂, f₂ themselves (the book's own p. 79
note ranks it against Ankeny–Onishi and Rosser–Iwaniec [CITED-REPO-PAGE]).
Route B is Route A with worse constants at every K ≥ 1. [DERIVED]

### 3.3 Route C: Jurkat-Richert / Iwaniec at dimension 1

AS STATED the linear sieve needs Ω(1); the mixed system has two classes per
prime up to y_K and its product grows like (log)², so the hypothesis fails.
The reformulation that makes it κ = 1 takes A_0 (comb, freshness, q-rough)
as the ambient sequence and sifts only the K partner classes; the remainder
is then the discrepancy of A_0 in progressions mod d | q_1⋯q_K, which is a
mixed κ = 2 sieve at level D/d (Route B's terms) or, conditioned on the
comb, the Comb Discrepancy Lemma's 2^{j+1}(2·3^k + 1) per class, the
head-only mechanism of the Certified-Head Theorem (`certificate-engine.md`
§1 [CITED]). In the tail regime, m prime, it is exactly `thm-capK-bv.md`'s
object: EMPTY through @31, bracketed 19.8 wide at @37, asymptotic-grade at
@97 as a limit only (`thm-sharp-sieve-range.md` §3 [CITED]). Iwaniec's
explicit linear-sieve error constants and Halberstam–Richert Thm 8.3/8.4 are
[NOT REACHED] in this repo (same note §2), and they would not change the
hypothesis failure. Nothing new, and it is part (b)'s territory. [DERIVED]

## 4. The single step that does not close

**The step.** Passing from a two-sided sieve bracket on #A_K and on #A_0 to
an asymptotic for their ratio. Three facts make it structural. [DERIVED]

1. **The bracket does not cancel.** Both counts are sifted to z = q, so σ is
   the same in numerator and denominator and the ratio inherits F₂(σ)/f₂(σ)
   in full. The only instrument that turns a bracket into an asymptotic at
   κ = 2 is the fundamental lemma's s → ∞, which is the CLOSED route
   (`thm-buchstab-transfer-shallow.md` §3.4: s ≥ 22.06 [CITED]).
2. **The correction and the lower bound live on disjoint σ-ranges.** B ≠ 1
   needs e^γω(u) ≠ 1 at u = ln n/ln y_K ≤ ln W/ln y_K, and q > y_K gives
   σ(q) = ln W/ln q − 1 < u − 1. On the engine's own ω grid [SEC 2b]:

   | |B − 1| ≥ c | u < u_c | so σ(q) < | F₂ there ≥ | f₂ there |
   |---|---|---|---|---|
   | 0.10 | 2.022 | 1.022 | 24.302 | 0 |
   | 0.05 | 2.171 | 1.171 | 18.498 | 0 |
   | 0.01 | 2.798 | 1.798 | 7.849 | 0 |
   | 0.001 | 3.586 | 2.586 | 3.832 | 0 |
   | 10⁻⁵ | 4.705 | 3.705 | 2.056 | 0 |

   A lower bound needs σ > 4.26645, i.e. u > 5.27 [ARITHMETIC, β₂ + 1]. The
   two conditions never overlap, at any
   level, since the inequality is level-free. This is the shallow theorem's
   emptiness (§0 item 4 of that note) recurring at every finite σ: whatever
   the instrument, it brackets B where B is 1.
3. **The legal half is loose by F₂(σ(q)) ≥ 1.475 at every pair** [SEC 3],
   and F₂ → 25.378 at σ = 1, the deep end of every scour [SEC 2]; the
   pigeonhole cannot absorb a factor above 1 on caps whose K = 0 sum already
   exceeds N by 32.7% (floor/N = −0.327 at K = 0 [SEC 3]).

**What would move it.** A κ = 2 asymptotic S = X V (W₂(σ) + o(1)) at bounded
σ in the open band 2 < σ < 4.266 named in `bv-import-survey.md` §3.3
[CITED], evaluated on the mixed system; below σ = 2 the pair (m, qm + 2)
both q-rough on an interval of length T < q² is a binary problem of
Hardy–Littlewood type, which the same survey places at the parity wall in
the (n, n + 2) formulation. Not attacked here; the base rate applies.

## 5. The numerical check at @23

The producer re-derives the exact ladder at @23 from the tile
(N = 5,301,450, truth 597,475, 1,739 scour primes, Σcap₂ = 7,034,588) and
asserts the floor N − Σ_q cap_K(q) against `natal-cap-28`'s embedded meas
column at K = 0, 27, 60, 100, 150, 250, 500, 1000, 1739: all nine reproduce
digit for digit [SEC 3, VERIFIED]. Against that:

| K | measured floor | sharp-sieve floor (F₂, limit-form, remainder 0) |
|---|---|---|
| 0 | −1,733,138 | −1,733,138 |
| 27 | 4,841 | −1,733,138 |
| 1739 | 596,782 | −1,733,138 |

Per q, B_true = (cap_K − s)/((cap₂ − s)·∏) against the engine's B_model, the
same ω grid and 24-bin rule as `natal-cap-28:200–205` [SEC 3, MEASURED]:

| q | σ(q) | F₂ | f₂ | K | B_true | B_model | #A_K/(X V_K) |
|---|---|---|---|---|---|---|---|
| 31 | 4.598 | 1.530 | 0.323 | 1 | 1.0000 | 1.0000 | 1.0000 |
| 101 | 3.165 | 2.656 | 0 | 16 | 1.0002 | 0.9999 | 1.0028 |
| 401 | 2.207 | 5.213 | 0 | 69 | 0.9958 | 1.0036 | 0.9476 |
| 2003 | 1.529 | 10.862 | 0 | 294 | 0.9780 | 0.9881 | 1.2262 |
| 4001 | 1.318 | 14.617 | 0 | 541 | 0.9044 | 0.9586 | 1.2401 |
| 8009 | 1.139 | 19.573 | 0 | 998 | 0.9697 | 0.9222 | 1.1308 |

Readings, flat. The per-q model misses the per-q truth by up to 0.054 at the
deep tail, in both directions, on counts of 216 to 557 [SEC 3]; the engine's
0.21% is a sum over the scour and this is not a contradiction of it, only
the granularity under it. The last column shows the sifted count against its
own sieve main term running from 0.95 to 1.37 across the tail, inside the
sharp bracket [0, F₂] trivially and nowhere near a width the transfer could
use. At q = 11003 (σ = 1.066) cap₂ = 285 and #A_0/(X V_0) = 0.80 [SEC 3].

**The finite-level remainder, exactly** [SEC 4, VERIFIED, A side]. With
r_A(m) computed by floor division for every m | P(q), m < D:

| level, q, y_K | σ | X V f₂ | X V F₂ | 2Σ4^ν|r| exact | trivial |r| ≤ ω(m) |
|---|---|---|---|---|---|
| @23, 31, 23 | 4.598 | 53,299 | 252,626 | 97,080 | 1,120,104 |
| @23, 37, 31 | 4.324 | 8,133 | 206,151 | 250,017 | 4,238,976 |
| @29, 31, 29 | 5.578 | 3,666,277 | 5,618,482 | 230,050 | 5,371,632 |

At @23 the exact remainder exceeds the lower main term at both head primes
that have one (97,080 against 53,299; 250,017 against 8,133), so the
finite-level lower bound is negative before the O-constant is even named; at
@29 it does not (230,050 against 3,666,277), so the @29 head would carry a
finite-level bracket of about [0.74, 1.27]·X V [ARITHMETIC on the row's
figures] if Theorem 9.1's constant were zero, which is not written anywhere
this repo has read.

## 6. Part (b), scoped and graded, not attacked

**Statement, exact.** In the tail regime q³ > W + 1 the cofactor m is prime
and cap₂(q) − s(q) = #{m prime, q ≤ m ≤ T : qm ≡ 11, 17 (30), qm ≢ −2 (p)
for every mid 7 ≤ p ≤ x} + the B side. Prime-comb equidistribution is the
assertion that this equals d(x)·(π(T) − π(q − 1))·(1 + η(q)) with
Σ_{q³>W} (cap₂(q) − s)·|η| small against the floor, uniformly in the tail,
and at depth K the same with the K partner classes added and d(x) replaced by
d(x)·∏(1 − 1/(q_i − 1)) (`certificate-engine.md` §2 [CITED]). The modulus of
the comb is W and the range T < W, so Brun–Titchmarsh is vacuous and a
single-class statement is out of reach; the route that works is the κ = 1
sieve of the primes m by one class per prime, level from a distribution
theorem for primes in progressions to modulus ≤ T^θ.

**What it would need, in numbers** [SEC 5, arithmetic on the cited y* column
of `natal-cap-28`; the @97 tail figure reproduces `thm-capK-bv.md`'s 0.562,
s_BV = 0.889, s_EH = 1.779 [CITED]]. At the engine's crossing depth y* the
ratio ρ = ln y*/ln T runs 0.422 at T = W^{2/3} to 0.562 at T = √W at @97. So:
under Bombieri–Vinogradov (θ = 1/2) s = 1.186 → 0.889, an upper bound with
F₁ = 2e^γ/1.186 ≈ 3.0 at the start of the tail [ARITHMETIC on the closed
form] and no statement at its end (s < 1); under
Elliott–Halberstam (θ = 1) s = 2.372 → 1.779, F₁ = 1.502 → 2.003, still no
lower bound at the tail's end; a lower bound (f₁ > 0, s > 2) at T = √W needs
θ > 1.124, beyond EH. The same shape holds at @29 (θ > 1.065).

**Grade.** PROVEN in the limit at shallow K (Theorem C of `thm-capK-bv.md`),
EMPTY at every finite level, OPEN in the deep ladder; at the crossing depth
the legal upper half is conditional on a level of distribution between BV
and EH and is loose by F₁ ∈ [1.5, 3]; the lower half is beyond EH. Not
attacked here. What would falsify the grade: a level of distribution above
1/2 for primes in progressions on a range T = W/q, unconditional; none is
known to this corpus.

## 7. Brief errors and defects noticed in passing

- The brief's "s_max 1.81 → 1.96" reads as monotone. The record
  (`attack-0829n-X-upper.md` §4 table) is 1.81, 1.96, 1.95, 1.93, 1.91, 1.85
  for B3 → B8: a range peaking at B4, and that note's own §0 item 2 says
  "never 2". Also, that s is a Selberg level on the stretch window and this
  note's σ is a DHR level on the tile's cofactor range; they are the same
  axis only up to the remainder multiplicity the X-upper note names, and
  they are not tabled together here.
- "4.7 @23 and 17.1 @97": verified (4.7088, 17.1422). They are the head
  prime's σ; 1,736 of the 1,739 @23 scour primes sit below β₂ [SEC 1].
- "the engine's measured B": the engine measures cap_K and models B; no
  measured B existed before SEC 3's B_true column.
- "values at s in [2, 5] are tabulated in their book": not verified and not
  needed. The two book pages this repo holds (p. 79, p. 104) carry no table;
  the march checked against Booker–Browning's rigorous α₂, β₂ and against an
  embedded artifact is the stronger custody, so no page was fetched.
- `thm-capK-bv.md` §0 / `thm-sharp-sieve-range.md` §3 quote "ln q_{K*}/ln T
  = 0.562" at @97 without saying T = √W; at T = W^{2/3} it is 0.422 and at
  the head prime 0.298. The conclusion drawn (q_K is a power of T) holds in
  every coordinate; wording only.

## 8. NOT REACHED

Diamond–Halberstam 2008 beyond pp. 79 and 104; Iwaniec, Acta Arith. 37
(1980) explicit linear-sieve constants; Halberstam–Richert Thm 8.3/8.4; the
per-q exact ladder at @29 (`natal-cap-18-at29.js` holds the march, not the
per-q survival arrays); a κ = 2 lower-bound sieve with a sifting limit below
4.266 (none exists in print per `REFUTED.md`, β₂ row, 2026-08-18).
