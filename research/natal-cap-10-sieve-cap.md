# Natal-cap attack 10 — the rigorous sieve cap: literature, exact statements, verdict

<!-- ledger
id: Q-natal-cap-sieve-cap
status: ANSWERED
todo: none
question: What is the rigorous sieve upper bound on how much a single scour prime can remove, and does it certify the zone?
verdict: Certified Selberg and Bonferroni caps run 1.60 to 2.36 times N over x = 7..17 with the fluctuation factor at 1.000, gross(q) hugging 2N/q to three decimals, but from x = 13 the harmonic factor alone exceeds 1, so Sum gross > N and even exact-truth caps fail.
-->

**Date:** 2026-08-14. Companion computation: `research/natal-cap-10-sieve-cap.js`
(finite Selberg Λ²/Bonferroni caps, certified per scour prime, verdict sums, C*(x)).
Legend as in `research/covering-dive.md`: **[PROVEN]** published + sourced,
**[CONJ]** published conjecture, **[ABSENT]** searched and not found,
**[INFERRED]** our deduction from sourced facts, **[UNVERIFIED]** could not
check against a primary source.

---

## 1. Literature: upper bounds for twin-prime-type counts

### 1.1 Normalization

Hardy–Littlewood (1923): π₂(x) ~ Π(x) := (2x/log²x)·∏_{p>2}(1−2/p)/(1−1/p)²
= 2C₂·x/log²x, 2C₂ = 1.32032… All constants below are stated as
π₂(x) ≲ c·Π(x) ("≲" = ≤ (1+o(1))·, x → ∞). The Goldbach-representation
constants are exactly double (Wu 2004, p. 3, verbatim: "the constant a is half
of the corresponding constant in the Goldbach problem").

### 1.2 The chronology of c — verified from Lichtman, Table 1 **[PROVEN]**

Read directly from J. D. Lichtman, *A modification of the linear sieve, and
the count of twin primes*, Algebra & Number Theory **19**:1 (2025) 1–38, DOI
10.2140/ant.2025.19.1 (arXiv:2109.02851); Table 1, p. 4 of the published PDF:

| year | author(s) | c |
|---|---|---|
| 1919 | Brun | O(1) |
| 1947 | Selberg [publ. 1952] | 8 |
| 1964 | Pan | 6 |
| 1966 | Bombieri–Davenport | 4 |
| 1978 | Chen | 3.9171 |
| 1983 | Fouvry–Iwaniec | 34/9 = 3.7777… |
| 1984 | Fouvry | 64/17 = 3.7647… |
| 1986 | Bombieri–Friedlander–Iwaniec | 3.5 |
| 1986 | Fouvry–Grupp | 3.454 |
| 1990 | Wu | 3.418 |
| 2003 | Cai–Lu | 3.406 |
| 2004 | Wu | **3.39951** |
| 2025 | Lichtman (Thm 1.2) | **3.29956** |

Notes. (i) Wu's exact published value is 3.39951 (J. Wu, *Chen's double sieve, Goldbach's conjecture
and the twin prime problem*, Acta Arith. **114** (2004) 215–273; twin constant
per Lichtman's table — Wu's own PDF states the Goldbach side D(N) ≤ 7.8209·Θ(N)
as Theorem 1, twin side by halving). (ii) Selberg's 8: Wu p. 2 verbatim: "In
1949 Selberg [25] proved D(N) ≤ {16+o(1)}Θ(N) with the help of his well known
λ²-upper bound sieve" (= 8 on the twin side; Lichtman's table year is 1947,
citing the 1952 publication — lecture vs publication date). (iii) Current
record: **π₂(x) ≲ 3.29956·Π(x)** (Lichtman 2025, Theorem 1.2, read from the
published PDF; "a 2.94% refinement from the previous record bound of Wu
[2004] … the largest percentage improvement since … 1986"). Two PREPRINTS are
ahead of the refereed record (read at source 2026-08-19,
`history/staging/lemmaV-neighbours.md`): Lichtman arXiv:2309.08522v1 Thm 1.1,
π₂(x) ≲ 3.2290·Π₂(x), and Pascadi arXiv:2505.00653v2 Cor 1.4,
≤ (3.203 + o(1))·Π₂(x); neither is refereed, so 3.29956 stays the record and
the two are the queue behind it.

### 1.3 The mechanism and the "2/θ rule" **[PROVEN, verbatim]**

Lichtman, p. 3: "Bombieri and Davenport obtained π₂(x)/Π(x) ≲ 4 as a
consequence of the Bombieri–Vinogradov theorem (1-2) and a standard sieve
upper bound of level x^{1/2−ε}. **More generally, if one proves level of
distribution x^{θ−ε} then one immediately obtains π₂(x)/Π(x) ≲ 2/θ.**"
So: pure Selberg Λ² with level √x → 8; BV level x^{1/2} → 4; BFI
well-factorable level x^{4/7} → 7/2; Lichtman's new weights, level x^{10/17},
→ ~3.4 before optimization, 3.29956 after combining with the switching
principle (Chen 1973). Under Elliott–Halberstam (θ = 1−ε): **2**.

### 1.4 Intervals (x, x+ℓ] — what is actually position-uniform

- Everything below 8 in the table uses equidistribution of primes in APs
  (BV or beyond) over [1, x] — those inputs are **not available uniformly in
  the window position**, so none of the sub-8 constants transfer to a bound
  for π₂(x+ℓ) − π₂(x) valid for all x. **[INFERRED from the proofs' structure;
  standard]**
- The position-uniform statement is π₂(x+ℓ) − π₂(x) ≤ (8+o(1))·2C₂·ℓ/log²ℓ,
  and in ≪-form it is the bound FKMPT cite as "[Halberstam–Richert,
  Cor. 2.4.1]" in the Remark 7 quote already verified in
  `research/covering-dive.md` §2.3. **[PROVEN in ≪-form via the verified FKMPT
  quote, and the explicit constant is sourced too — see the Riesel–Vaughan
  bullet below.]**
  *(Correction, 2026-08-18. This bullet used to call the statement "the pure
  Selberg/beta-sieve bound" and used to end: "the constant-8 interval form is
  standard but we did not locate a primary statement with the explicit 8 for
  intervals — UNVERIFIED at that level of precision." Both halves are now
  wrong. The UNVERIFIED flag was lifted in the Riesel–Vaughan bullet below and
  in §5 item 3 when Lemma 5 was read, and was left standing here, so §1.4 spent
  four days contradicting itself fifteen lines apart. The sieve attribution is
  corrected in the next bullet.)*
- **Which sieve delivers the 8 — and it is two different sieves for the two
  different statements. [PROVEN, both read at source 2026-08-18.]**
  - **On [1, y]: Selberg's Λ² upper sieve.** Halberstam–Richert, *Sieve
    Methods*, **Theorem 5.3**, quoted verbatim by Bordignon and Lee, *Explicit
    upper bounds for the number of primes simultaneously representable by any
    set of irreducible polynomials*, [arXiv:2211.11012](https://arxiv.org/abs/2211.11012)
    (20 Nov 2022), whose §1 reads "Halberstam and Richert [6, Thm. 5.3] have
    used the upper Selberg sieve to establish π_F(y) ≤ 2^g g! ∏_p
    ((p−ρ_F(p))/(p−1))(1−1/p)^{1−g} · y/log^g y · (1 + O_F(log log 3y/log y))",
    their [6] being *Sieve Methods* (1974). At g = 2 the constant is
    2²·2! = **8**. So the [1, y] eight is Selberg's, as this file said.
  - **On an interval, uniformly in position: the large sieve, not Λ².**
    Riesel–Vaughan introduce Lemma 5 with, verbatim from their §3, "It is a
    refinement of Lemma 8 of Vaughan [7] and **likewise follows from Corollary 1
    of Montgomery and Vaughan [4]**", their [4] being "H. L. Montgomery and
    R. C. Vaughan, *The large sieve*, Mathematika **20** (1973), 119–134". The
    position-uniformity that Regime 2 below actually needs is bought by the
    large sieve; calling it a Selberg/beta-sieve bound names the wrong engine.
- **Siebert 1976**, the classical interval reference: H. Siebert,
  *Montgomery's weighted sieve for dimension two*, Monatsh. Math. **82**
  (1976) 327–336. Lichtman p. 3 cites it as: "numerically explicit forms of
  Selberg's bound [1952]" (together with Riesel–Vaughan 1983, Lemma 5).
  Secondary sources state Siebert's explicit result as π₂(x) < 16·C₂·x/log²x
  (i.e. c = 8 with no o(1)) for all x > 1, and Riesel–Vaughan as
  π₂(x) < 16C₂·x/((7.5+log x)·log x). Siebert's own paper is paywalled and
  remains **[UNVERIFIED]**.
  **The Riesel–Vaughan half of that sentence is now checked, and the secondary
  sources drop its range condition.** 16C₂ = 8C exactly, so the quoted form is
  Lemma 5 at A = 7.5 — and Lemma 5's own (L, A) table pairs **A = 7.5 with
  L = 36**, i.e. that inequality is asserted for **x ⩾ e³⁶ ≈ 4.3·10¹⁵**, not
  for all x. (The table runs L = 24 at A = 0 through L = 690 at A = 8.45, so
  the constant in the denominator is bought with a range.) Quote the 7.5 with
  its e³⁶ or not at all. **[PROVEN, table read at source 2026-08-18.]**
  **But the interval-uniform form with the explicit constant 8 now HAS a
  primary source, read from the PDF on 2026-08-18: Riesel–Vaughan Lemma 5.**
  Their Lemma 5 defines R(x, a, b) as a **supremum over ALL intervals I of
  length x** of the count of p ∈ I with ap+b prime, and bounds it by
  R(x,a,b) < ( 8Cx/((log x)(A + log x)) + 100x^{1/2} ) · ∏_{p|ab, p>2}
  (p−1)/(p−2), for x ≥ e^L with (L, A) from their table (L = 24, A = 0 through
  L = 690, A = 8.45), where their (2.3) sets C = 2∏_{p>2} p(p−2)/(p−1)² with
  1.320323 < C < 1.320324. At a = 1, b = 2 the product is empty and this is
  exactly the interval-uniform twin bound with the constant 8. So the
  position-uniformity is not folklore here: it is the supremum in the lemma's
  own statement.

### 1.5 The parity floor is 2

- Four is **not** a floor: the published record 3.29956 < 4, and Chen's
  3.9171 < 4 since 1978. What 4 actually is: the value of the 2/θ rule at the
  BV level θ = 1/2 — a *technology* wall, breached by well-factorable
  weights + switching, not a parity wall. **[PROVEN, §1.3]**
- The parity floor for **upper** bounds is a factor **2** above the truth.
  Sources: (i) Tao, *Open question: the parity problem in sieve theory*
  (blog, 5 Jun 2007), fetched: "any upper bounds must be off from the truth
  by a factor of 2 or more … The reason for this — the parity problem — was
  first clarified by Selberg"; also "even assuming such strong hypotheses as
  the Elliott–Halberstam conjecture … sieve theory is largely (but not
  completely) unable to distinguish numbers with an odd number of prime
  factors from numbers with an even number." (ii) Wu 2004, p. 2 (arXiv:0705.1652),
  on why < 8 is hard for the pure method: "the linear sieve formulas (see
  Lemma 2.2 below) […] are the best possible in the sense that taking
  A = B_ν := {n : 1 ⩽ n ⩽ x, Ω(n) ≡ ν (mod 2)} (ν = 1, 2), the upper and lower
  bounds in (1.3) are respectively attained by ν = 1 and
  ν = 2 (see [14], page 239)" — Selberg's parity examples, cited to
  Halberstam–Richert, *Sieve Methods*, p. 239. **[PROVEN as statements of
  the experts; "2 is the exact floor for π₂ upper bounds under EH" is the
  standard reading of the 2/θ rule at θ = 1, consistent with Tao's "factor
  of 2 or more" — we found no theorem formalizing "no sieve can beat 2" for
  this specific problem: the floor is rigorous folklore, flag as such.]**
- Consistency check: 2 (parity floor) = 2/θ at θ = 1
  (EH); nothing published goes below 3.29956 unconditionally, searched as tabled in `research/SEARCH-CONVENTIONS.md` §3; nothing can go
  below 2 by sieve axioms alone.

## 2. Translation to the natal cap — two regimes that must not be conflated

Our object: gross(q) = #{r ∈ N_x : q | r or q | r+2}, for scour primes
q ∈ (x, √W], W = x#. Via the dilation identity the strikes are counted by a
pattern in an m-interval of length ℓ = W/q that is sifted **only by the tile
primes 7 ≤ p ≤ x** (two omitted classes each; the mod-30 part is an exact
congruence restriction, not sieving).

**Regime 1 (gross-caps — what attack 10 actually needs).** The sifting range
is z = x, tiny compared to ℓ ≥ √W. This is the *Fundamental Lemma* regime,
κ = 2, s = log ℓ / log x ≥ θ(x)/(2 log x) → ∞: the achievable upper constant
is 1 + o(1), **parity is irrelevant** (parity constrains sieves whose range
reaches ~√ℓ). At tile levels 13, 17, s ∈ [2.0, 3.6] is too small for the
asymptotic FL (in the Opera-de-Cribro Lemma 6.8 normalization used in
the Opera-de-Cribro §6.5-Notes normalization quoted in `paper/beta2-note.md` §2, the two-sided FL wants s ≥ 9κ+1 = 19, reached
only for x ≳ 200) — so the .js supplies the caps by *finite* exact
computation instead: Selberg's Λ² inequality and even-depth Bonferroni over
the ≤ 2^{π(x)−3} divisors, with the remainder Σ|λ_{d₁}λ_{d₂}|·2^{ν(lcm)}
summed exactly. Rigorous statement and proof sketch: header of the .js.
Measured certified constants: 1.134 (q = 19 @17) worsening to ~2.4 at
q ~ √W. **The π₂ constants of §1 do not apply to this regime at all.**

**Regime 2 (fresh-caps — where §1's constants DO live).** If instead one caps
*fresh* removals (kills of still-alive slots), the sum telescopes to
N − survivors and the union bound would need only C < 1/(1 − S/N) → 1. But a
fresh-cap must upper-bound a pattern sifted by **all** primes < q, q up to
√W, in a position-uniform window — precisely π₂-in-intervals. Available
constants: 8 (interval-uniform, §1.4); 4 / 3.29956 ([1,x] only, §1.2); parity
floor 2 (§1.5). Needed: 1.44 (@13), 1.28 (@17), → 1. **Parity-barred**, with
the gap → factor 2 exactly.

## 3. Computed verdict (full tables in the .js OUTPUT block)

| x | N | Σ 2N/q | Σ gross | Σ certified cap | overshoot Σcap/N |
|---|---|---|---|---|---|
| 7 | 10 | 3.4 | 3 | 16 | 1.60 |
| 11 | 90 | 71 | 73 | 180 | 2.00 |
| 13 | 990 | 1135 | 1135 | 2337 | **2.36** |
| 17 | 14850 | 22183 | 22132 | 34200 | **2.30** |

Decomposition (harmonic × fluctuation × certification): @13 = 1.147 × 1.000 ×
2.059; @17 = 1.494 × 0.998 × 1.545. The fluctuation factor is 1.000 —
gross(q) hugs 2N/q to three decimals in aggregate. From x = 13 the harmonic
factor alone exceeds 1: **Σ gross > N — even exact-truth caps fail**.
Concentration: cap-mass at small q (@17 the cumulative Σcap crosses N at
q = 97, the 23rd of 120 primes; Σgross crosses at q = 163); certification
waste at large q (narrow windows, s → 2.3, cap/gross → 2.4).

## 4. THE ONE NUMBER

C*(x) = 1/Σ_{x<q≤√(x#)} 2/q — the upper-sieve constant (relative to the true
mean) at which Σ caps = N:

x:  7 → **2.979** | 11 → **1.267** | 13 → **0.872** | 17 → **0.669** |
19 → 0.560 | 23 → 0.487 | 29 → 0.434 | 31 → 0.396 | 37 → 0.366 | 41 → 0.343 |
43 → 0.324 (exact, sieve to √(43#) = 114,379,899) | Mertens continuation:
53 → 0.295, 101 → 0.224, 199 → 0.175, 499 → 0.138, 997 → 0.118,
9973 → 0.080; asymptotically C*(x) ≈ 1/(2(ln x − ln ln x − ln 2)) → 0.
(Mertens rows agree with the exact rows to 4 decimals at x = 31…43.)

**Verdict.** C* drops below 1 permanently between x = 11 and x = 13, and
below every published or conceivable sieve constant thereafter. Ordering, for
all x ≥ 13:

  C*(x) < 1 (truth) < 2 (parity floor) < 3.29956 (record) < 4 (BV wall) < 8 (interval-uniform)

The contingency "if C* > parity floor at large x, the route could close with
existing tools" evaluates FALSE with maximal margin: the trend is
monotone DOWN (C* ~ 1/(2 ln x)). The gross-cap door is not parity-barred —
it is **Mertens-barred**: no upper-bound technology of any strength, including
oracles for the exact gross(q), closes a first-order union bound at any level
x ≥ 13, because Σ_{x<q≤√W} 2/q > 1 there and grows like 2 ln x. (At x ≤ 11
the arithmetic door is open — Σgross = 0.81N @11 — but our best certificates
reach only 2.0N against the tiny windows, and closure there would be a finite
verification, not a theorem.) The independent fresh-cap variant is
parity-barred in the precise, sourced sense (§2, Regime 2). Both failures are
first-class, quantified results; the overlap credit (second-order, signed)
remains the only live mechanism, and formalizing it is Brun/dimension-2 sieve
territory — the β₂ = 4.266 wall of `paper/beta2-note.md`.

## 5. Every literature claim we could not verify at the primary source

1. Siebert 1976 (paywalled): explicit constant and any interval form —
   **[UNVERIFIED]**; cited through Lichtman p. 3 and secondary web sources.
2. Halberstam–Richert Cor. 2.4.1 (book): cited through the verified FKMPT
   Remark 7 quote (covering-dive.md); corollary number not checked in the
   book itself. Likewise HR p. 239 (Selberg's B_ν examples) is cited through
   Wu 2004's verbatim sentence. The book remains lending-locked at the
   Internet Archive (both the text derivative and search-inside return 403),
   so **the corollary's statement is still [UNVERIFIED]**. Three things about
   it did change on 2026-08-18:
   - **Whose book `[7]` is, is now settled twice over.** FKMPT's marker
     expands to "H. Halberstam and H.-E. Richert, *Sieve Methods*, Academic
     Press, London, 1974" in the corrected/published bibliography, and the
     earlier Dartmouth preprint carries the identical entry as its `[9]`. Two
     independent bibliographies, same book. *(This item previously recorded the
     source of Cor. 2.4.1 as unconfirmed; the identification is confirmed, only
     the corollary's text is not.)*
   - **Cite the right draft.** The twin remark is **Remark 7** only in the
     corrected/published text; in the Dartmouth `longgaps.pdf` the same passage
     is **Remark 4**. Anyone verifying "Remark 7" against the Dartmouth file
     reads the wrong remark. See `research/covering-dive.md` §2.3.
   - **Do not assume Cor. 2.4.1 is where the explicit 8 lives.** FKMPT invoke
     it only for a `≪` bound on an interval, which is weaker. The statement
     that carries the explicit constant on [1, y] is HR **Theorem 5.3**
     (§1.4 above, via Bordignon–Lee's verbatim quotation), and the one that
     carries it uniformly in an interval's position is Riesel–Vaughan Lemma 5.
     Both attributions can be right at once; what would be wrong is treating
     Cor. 2.4.1 as the explicit-constant source.
3. Riesel–Vaughan 1983 Lemma 5 explicit bound: **primary source read
   2026-08-18** (see §1.4). The venue was also wrong here and is corrected
   below: Ark. Mat. 21 (1983) 45–74, not BIT 23.
4. Wu 2004's twin constant 3.39951: **read at source 2026-08-18**, full text
   of arXiv:0705.1652. Wu's **Theorem 3** states π₂(x) ⩽ 3.3996·Π(x) for
   sufficiently large x, and the last line of its proof in §8 gives the sharper
   π₂(x) ⩽ 3.5(1 − 0.0287117)Π(x) ⩽ **3.39951 Π(x)** — so 3.3996 is the stated
   theorem and 3.39951 is the proof line, and both are Wu's. **The "twin side
   by halving" gloss this file used to carry is not how he gets it**: Wu proves
   the twin bound directly as Theorem 3. What his p. 3 says is the weaker
   historical remark that for the Selberg / Pan / Bombieri–Davenport / Chen
   family "the constant a is half of the corresponding constant in the Goldbach
   problem", which is a statement about those earlier methods, not about
   Theorem 3.
5. "2 is exactly the parity floor for π₂ upper bounds": rigorous-folklore
   status (Tao 2007 wording + Selberg's examples + 2/θ at θ=1); no formal
   theorem located that excludes every conceivable sieve axiom system.
6. Mertens-continued C*(x) rows (x ≥ 53) are asymptotic, not exact
   (cross-checked to 4 decimals against exact enumeration at x = 31…43).
7. **[OPEN, raised 2026-08-18, not settled here] Is Pan's 6 interval-uniform?**
   §2 Regime 2 lists "Available constants: 8 (interval-uniform)". The claim
   underneath it — §1.4 bullet 1, that nothing below 8 transfers to a
   position-uniform interval bound because everything below 8 uses
   equidistribution in APs over [1, x] — was never stressed, and there is one
   candidate counterexample in §1.2's own table. Wu p. 2, verbatim, credits
   Pan's 1964 constant 6 to "applying Linnik's large sieve method", and the
   large sieve **is** position-uniform (that is exactly how Riesel–Vaughan get
   their interval-uniform 8, §1.4). If Pan's 6 is in fact interval-uniform,
   Regime 2's "available constants" line understates what is available and the
   ordering in §4 gains a rung at 6. **It would not change the verdict**:
   Regime 2 needs 1.28 at @17, the parity floor is 2, and 6 > 2 > 1.28 either
   way. Recorded because the sentence is stated flat and rests on a structural
   inference about other people's proofs rather than on a reading of them.

## 6. Source index

Lichtman, *A modification of the linear sieve, and the count of twin primes*,
ANT 19:1 (2025), msp.org/ant/2025/19-1/ant-v19-n1-p01-p.pdf (pp. 1–7 read) ·
Wu, *Chen's double sieve…*, Acta Arith. 114 (2004), arXiv:0705.1652 (pp. 1–3
read) · Tao, *Open question: the parity problem in sieve theory* (2007),
terrytao.wordpress.com (fetched) · FKMPT Remark 7 + HR Cor. 2.4.1 via
`research/covering-dive.md` §2.3 (verified there) · FL normalization via
the Opera-de-Cribro §6.5-Notes normalization quoted in `paper/beta2-note.md` §2 (Opera de Cribro Lemma 6.8 / Matomäki–Teräväinen
arXiv:2301.07679 Lemma 9.1) · Siebert, Monatsh. Math. 82 (1976) 327–336
[not accessed] · Riesel–Vaughan, *On sums of primes*, Ark. Mat. **21** (1983) 45–74,
DOI 10.1007/BF02384300 [Lemma 5 read at source 2026-08-18; the "BIT 23 (1983)"
this line used to give is the wrong journal] ·
Bombieri–Davenport, Proc. Roy. Soc. A 293 (1966) [via Lichtman/Wu] ·
Hardy–Littlewood, Acta Math. 44 (1923) [via Lichtman].
