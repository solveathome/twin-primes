# Anchored windows vs random windows

<!-- ledger
id: Q-anchored-windows
status: SUPERSEDED
todo: none
question: How much does anchoring at the origin enrich a window against a random window, and for how long?
verdict: SPENT, live treatment is paper/anchored-note.md: Theorems A-C proven (A and B unconditional, C's constants HL-conditional), anchored enrichment bounded by e^{2gamma} = 3.172 and mortal, the head-window dip constant e^{2gamma}/4 = 0.79305 with 0.89 a finite-size blend; the kill shadow is no longer a separate object and section 3's peak sequence remains unreproduced.
-->

> **STATUS: SPENT, and two of its claims have been overtaken. Read this header
> before the body.** The live treatment of the anchored side is
> `paper/anchored-note.md`.
>
> 1. **The kill shadow is no longer a separate object.** §5 below calls it a new
>    measured object with no prior study. `attack2-05-07-integral-ladder.js`
>    absorbed it into the Unification Law, `ATTACKS2.md` records that, and
>    `GLOSSARY.md` now lists "kill shadow" as an *absorbed term, no longer a
>    separate object*, at ~0.85 = the first-octave average. The measurement
>    stands; the novelty claim does not.
> 2. **§7's verification code is gone; §5 is RECOVERED, §3 is not.**
>    (Updated 2026-08-19.) The pointer `scratchpad/anchored-check.js` is a
>    session file that no longer exists. §5's shadow table now reproduces
>    **32 of 32 entries to three decimals** from
>    `research/shadow-buchstab-02-instrument.js`, an instrument sharing no
>    code with the lost script (`history/staging/shadow-buchstab.md`), with
>    two reading corrections recorded there: the k = 1 rows rest on 25 / 166 /
>    1625 / 7542 slots, so only p = 997 decides; and the band starts at the
>    NEXT prime's square, which alone moves the p = 23 prediction 0.873 →
>    0.943 and makes that row a measurement of the 23 → 29 prime gap. §3's
>    peak sequence remains unreproduced: do not quote a §3 number without
>    recomputing it first.
>
> Nothing below has been edited. A spent note is a record of what was thought at
> the time, and rewriting it would destroy the thing it is kept for.

Formalization of the attack-10 idea (2026-08-13). The variance theorem (script
06) and all Montgomery–Vaughan-style statistics describe a window dropped at a
**uniformly random position** of the pattern mod P_n#. But the window the Twin
Prime Conjecture needs is not random: it is **anchored at the origin**, where
every prime's kill-classes are pinned. This note makes the distinction precise,
proves what is provable, gives the head window's life-cycle law and the
constant behind its dip, and reports one new measured object (the kill
shadow).

Notation: level n has primes 2 = p_1 < … < p_n, primorial P = P_n#, twin-slot
indicator A_n(r) = 1 iff r mod p ∉ {0, −2 mod p} for every p ≤ p_n. Slot count
D_n = ∏_{2<p≤p_n}(p−2), density δ_n = D_n/P ~ 2C₂e^{−2γ}/ln²p_n. C_n(x) =
#{0 < r ≤ x : A_n(r) = 1}.

## 1. Definitions

**Random window:** N_L(t) = Σ_{j<L} A_n(t+j) with t uniform on Z_P. All of
script 06 / attacks 3, 7 concern this ensemble: E[N_L] = δ_n L, and the
variance is sub-Poisson with Var/E drifting rather than constant — the stable
empirical law is ln(Var/E) ≈ −(0.24u² + 0.13u) in the window exponent u
(0.25 → 0.32 at zone scale).

**Anchored window:** the same count at the deterministic position t = 0 (head
windows [0, x]) or the zone W_n = (p_n, p²_{n+1}). Anchoring is not a size
condition but a *phase* condition: under a random shift each prime's two kill
classes land uniformly; at the origin they sit exactly at 0 and −2 for **every**
prime simultaneously — the unique point of total phase alignment in the pattern.

## 2. What is proven

**Theorem A (crystallization identity — exact, unconditional).** For x ≤ p²_{n+1},
  C_n(x) = #{r ≤ x : r and r+2 are both primes > p_n}.
*Proof.* A slot r has both r, r+2 coprime to P_n#; any m ≤ x+2 ≤ p²_{n+1}+2
coprime to P_n# and > 1 has least prime factor > p_n, hence, being < p²_{n+1},
is prime. Conversely twin primes > p_n are coprime to P_n#. (r = 1 is excluded
since r+2 = 3 is killed once n ≥ 2.) ∎

So the anchored window's content below p² is *literal arithmetic reality* —
not a sample from the ensemble.

**Theorem B (churn contrast — unconditional).** Fix window length L = p²_{n+1}.
Passing from level n to n+1 kills twin slots at density 2δ_n/p_{n+1} (Copying
Theorem), so a random window of length L loses on average
  2δ_n L/p_{n+1} ≈ 2δ_n p_{n+1} → ∞
slots per level, at every future level, forever. The anchored zone loses
**exactly zero** (Theorem A: its contents are final). A random window is never
finished; the anchored window is finished at birth. ∎

**Theorem C (life-cycle identity).** For fixed x and growing n, with
β = ln p_n / ln x:
  ρ_n(x) := C_n(x)/(δ_n x) = [π₂(x) − π₂(p_n) + O(1)] / (δ_n x)  for β ≥ 1/2,
and ρ_n(x) = 0 once p_n ≥ x (every r ≤ x is 1, composite, or a prime ≤ p_n —
all killed). The identity is unconditional; its asymptotic evaluation below is
conditional on Hardy–Littlewood (Brun's theorem gives the same shape as a
certified **upper** bound).

## 3. The life-cycle law: anchored enrichment is bounded and mortal

The head ratio does not diverge. Under HL, for p_n = x^β:
  ρ_n(x) ≈ e^{2γ} β² · [1 − π₂(x^β)/π₂(x)],
which traces: fair (ρ ≈ 1) while β < 1/3; a trough near β = 1/2 with asymptotic
depth **e^{2γ}/4 ≈ 0.793**; a rise toward the **cap e^{2γ} ≈ 3.172** (never
∞); then a crash to 0 as p_n → x, because twins below p_n are killed *by
themselves* — anchored enrichment is bounded by e^{2γ} and mortal. Measured
(x = 10⁴, verification script below): 0.999 → trough 0.953 (β=.46) → peak 2.01
(β=.83) → 0.564 (β=.98) → 0 (β=1). The peak's slow climb toward 3.17 is the
usual ln² convergence.

## 4. The dip constant is e^{2γ}/4, and the 0.89 reading is a blend

The asymptotic dip constant of the anchored head window is
e^{2γ}/4 = 0.79305, attained at x = p²_{n+1} (the zone edge, β = 1/2). Its
resemblance to the single-prime Mertens constant e^γ/2 = 0.8905 is a numerical
coincidence: the 0.895–0.899 measured at small levels is a finite-size
mixture, not a different constant. At x ≈ 2p² the
cumulative ratio blends the crystallized zone (ratio ≈ 1.0 at these small
levels — itself still far from its own 0.793 limit, cf. script 01's slow drift
0.90 @ p=10⁴) with the newly measured **kill shadow** (next section) at ≈ 0.85.
Blend ≈ 0.90. No e^γ/2 anywhere.

## 5. New object: the kill shadow (measured, unexplained)

Density ratio to δ_n in consecutive windows [kZ, (k+1)Z], Z = p²_{n+1}
(verification script below):

| level | k=0 (zone) | k=1 | k=2 | k=3 | k=4 | k=5 | k=6 | k=7 |
|---|---|---|---|---|---|---|---|---|
| p=23  | 1.001 | 0.834 | 1.067 | 0.967 | 1.001 | 1.134 | 1.067 | 0.967 |
| p=97  | 1.034 | 0.850 | 0.921 | 0.978 | 0.952 | 0.932 | 0.957 | 1.009 |
| p=401 | 0.968 | 0.853 | 0.883 | 0.934 | 0.928 | 0.958 | 0.967 | 0.967 |
| p=997 | 0.939 | 0.856 | 0.882 | 0.918 | 0.924 | 0.936 | 0.941 | 0.955 |

The window **immediately past the zone** is depleted to ≈ 0.85 of fair share —
strikingly stable (0.834, 0.850, 0.853, 0.856) across levels. Conjectured
mechanism: (Z, 2Z) is exactly where the freshest kills concentrate — every
prime q ≲ p_n places its first uncovered kills at q² and q·(next survivors),
and these pile up just past the crystallization boundary (the Redundancy
Lemma's scaled self-images all enter there). The shadow constant ≈ 0.85 and its
k → ∞ recovery rate are new measurable objects; we found no prior study
(cf. PRIOR-ART.md). **Overtaken — read the header.** The kill shadow was
absorbed into the Unification Law and is no longer a separate object, so the
novelty claim here does not stand; `SEARCH-CONVENTIONS.md` §1 also carries no
owning convention for the shadow constant, so the search behind it was ours. Note the shadow does NOT threaten the zone itself — it sits
strictly outside, and by Theorem A the zone is already final before the shadow
forms.

## 6. The honest open problem

**Axiom A(λ):** there exists λ > 0 with C_n(zone) ≥ λ·δ_n·|W_n| for infinitely
many n. Any λ > 0 implies TPC (zone counts → ∞). By Theorem A this is exactly
a positive-proportion Hardy–Littlewood lower bound in the anchored short
interval (p_n, p²_{n+1}) — open; it sits strictly between "some twin in
(x, x + x)"-type statements (open) and full HL-in-short-intervals (open). In
Cramér-type random models, zone failure has probability ≲ exp(−c p²/ln²p),
summable, so the model predicts all but finitely many zones occupied — the
anchored framework's contribution is to show the model's window is the wrong
ensemble (Theorems A/B: the true zone is *better* behaved than the model —
final, shadow-free, and fed by crystallized reality).

**Vacuity warning.** "Anchored ≥ λ × (minimum over all windows)" is not a path:
anchored ≥ min is trivially true, and min ≥ 1 is exactly the gap statement
G₂(n) < L — the wall again, in its original clothes.

## 7. Verification code

```js
// density ratio per window [k*Z,(k+1)*Z] and fixed-x life cycle; full source:
// scratchpad/anchored-check.js (run 2026-08-13). Key outputs reproduced in
// sections 3 and 5 above. Method: window-only sieve (no period needed),
// delta computed exactly as (1/2) prod (p-2)/p.
```

**Status summary:** Theorems A–C proven (A, B unconditional; C's constants
HL-conditional with Brun-certified upper bounds). Anchored enrichment is
bounded by e^{2γ} = 3.172 and mortal. The head-window dip constant is
e^{2γ}/4 = 0.79305, with the 0.89 reading at small levels a finite-size blend.
New measured object: the kill shadow ≈ 0.85 just past every zone. Open problem
stated as Axiom A(λ).
