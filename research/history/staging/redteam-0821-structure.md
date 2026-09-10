# Red team 0821: the W1/HL identity and the anchored-02 ladder both hold — every headline number re-derived from the definitions

<!-- ledger
id: Q-redteam-0821-structure
status: ANSWERED
todo: none
question: Do the W1/HL identity and the anchored-02 ladder survive re-derivation from the definitions on independent code?
verdict: Both headlines survive with zero refutations and all ten sub-claims CONFIRMED, carrying two recorded corrections: the -0.33 se figure's sign is presentation-dependent, becoming +0.32 se when duplicate-theta folds are collapsed, and the shadow guarantee is stronger than sold, a one-line theorem rather than a 76/76 empirical.
-->

*(2026-08-21. Adversarial verifier over two HELD headlines:
`w1-singular-series.md` + `attack-w1hl-01.js`, and `attack-anchored-02.md` +
`attack-anchored-02-ladder17.js`. Method: refuted-until-rederived. Every
graded claim was re-derived by hand or recomputed by independent code written
from the definitions — the Hardy–Littlewood local factors as
(1 − ν/q)/(1 − 1/q)^k with ν a raw distinct-residue count, and the
staircase note §7 cap definitions — never from the producers' case formulas
or engine. Scratch producers (session scratchpad, not embedded):
`rt0821-t1-w1hl.py` (Python Fractions, exact), `rt0821-t2-ladder.py` +
two derived passes (numpy, exact integer counts). Verdict scale:
CONFIRMED / WEAKENED / REFUTED.)*

## Bottom line

**Both headlines survive. Zero refutations.** All ten sub-claims graded
CONFIRMED; two carry corrections worth recording: the −0.33 se figure's
*sign* is presentation-dependent (it becomes +0.32 se when duplicate-θ folds
are collapsed — the consistency conclusion is unaffected), and the shadow
guarantee is stronger than the report sells it (a one-line theorem, not a
76/76 empirical).

## T1 — W1 IS the HL 4-tuple singular-series ratio

- **T1.a ν-case table — CONFIRMED, no overlooked case.** Re-derived by hand
  from the collision analysis: on H = {0, 2, v, v+2}, 0≡v and 2≡v+2 both
  ⟺ q | v; 2≡v ⟺ q | v−2; 0≡v+2 ⟺ q | v+2; any two cases
  simultaneously force q | 2 or q | 4, impossible for q ≥ 3, so the classes
  are exclusive and ν = 2/3/4 exactly as claimed. Multiplicity is a
  non-issue by definition — ν counts distinct residues mod q, so v ≡ 0
  (mod q²) changes nothing; verified from the raw definition on a grid that
  includes v ∈ {2q², 4q², 2q(q+2)} for q ≤ 101, plus q = 3 (ν = 2 iff 3 | v,
  else 3 = q, inadmissible) and q = 2 (ν = 1 on even v). Zero mismatches.
- **T1.b prime-indexed mean — CONFIRMED, re-derived.** Over the q − 1
  classes p ≢ 0 (mod q): p ≡ η gives q | v (one class, factor (q−2)/(q−4));
  of the two v∓2 classes (p ≡ η ± 1), exactly ONE is p ≡ 0 and empty — for
  η = +1 the dead class is q | v+2, for η = −1 it is q | v−2 — the other
  survives (factor (q−3)/(q−4)); the remaining q − 3 classes give 1. Mean =
  [(q−2) + (q−3) + (q−3)(q−4)] / ((q−1)(q−4)) = (q² − 5q + 7)/((q−1)(q−4))
  = 1 + 3/((q−1)(q−4)). **The 3 is the total excess 2/(q−4) + 1/(q−4)** of
  the two live special classes over 1. The p ≡ 0 exclusion is consistent on
  both sides: the prediction averages over the q − 1 admissible classes, and
  on the field p ≡ 0 (mod q) is genuinely impossible (q < p prime). Verified
  exactly for both η, all q ∈ [5, 199]; the integer-indexed mean-one and the
  two products 2.5197 / 2.3252 reproduce from raw factors.
- **T1.c constant and domain — CONFIRMED.** C_P = ∏ q(q−4)/(q−2)² is
  v-independent by construction (at fixed cutoff P; across folds the cutoff
  is P = p, which the report states). Raw computation gives r₂ = 2, r₃ = 3
  on 6 | v, so the constant 6 is exact; for 3 ∤ v the q = 3 local factor is
  0 (𝔖₄ = 0) while W1 ≠ 0 — the identity's domain is 6 | v exactly as
  stated. The domain claim's load-bearing fact, 12 | θ_p, verified on all
  102 folds INDEPENDENTLY of the table's θ column via θ = 2(p − η), η ≡ p
  (mod 3): every θ matches the rule and every θ ≡ 0 (mod 12). Also
  re-derived: p | θ + 2η always (θ ± 2 ∋ 2p), confirming the truncation
  claim's "q = p itself always, factor (p−3)/(p−4)".
- **T1.d numerical identity — CONFIRMED by from-definition code.** My own
  singular-series code (ν by residue-set counting, local factors from the
  HL definition, exact `fractions.Fraction`) reproduces 17 sampled folds of
  the embedded per-fold table to ≤ 0.0050 (printing precision) and matches
  all 12 exact fractions the producer quotes (15/13, 128/21, 2380/429, …)
  as identities of rationals. The identity ∏r_q = C_P · W1_P held exactly at
  every tested fold.
- **T1.e the −0.33 se — CONFIRMED as a consistency read; the sign is not
  meaningful.** Reproduced exactly (mean 2.2823, sd 1.214, se 0.120,
  prediction 2.3215, z = −0.33). The folds are indeed not independent:
  22 of the 102 share their θ with a neighboring fold (e.g. θ_101 = θ_103 =
  204), and lag-1 residual autocorrelation is 0.116. AR(1)-adjusting gives
  effective n ≈ 81, z = −0.29; collapsing to the 80 distinct θ values flips
  the sign: collapsed mean 2.3645, z = **+0.32**. Corrected sentence for any
  integration: *"the zero-parameter prediction lands within a third of a
  standard error of the field mean under every weighting tried (−0.33 raw,
  −0.29 AR(1)-adjusted, +0.32 with duplicate-θ folds collapsed); the gap's
  sign is presentation-dependent and carries no information."*

Not re-checked in T1: the literature negatives (Kelly–Pilling re-read, the
comb's absence from print) — no web sweep was run here; those stand on the
producer report's own custody. HL 1923 itself remains un-imaged, as §5
already discloses.

## T2 — the unified ladder at @17/@19

All numbers below are from my own engine (numpy, written fresh from
staircase-note §7: cap_K = #A_K + #B_K + s(q); unified = m ≥ 1, no s(q)),
with truth from a direct anchored march.

- **T2.a margin identity — CONFIRMED; it is bookkeeping, and that is fine.**
  From the definitions: capU_K counts admissible m ≥ 1 candidates alive at
  depth K; capC_K counts the m ≥ 2 subset plus s(q). Their difference is
  s(q) − [the m = 1 candidate exists and is alive], and the m = 1 candidate
  v = q exists on exactly one side iff q mod 30 ∈ {11,13,17,19} — Lemma 2's
  classification is exactly s(q)'s support — minus wheel exclusion. So the
  identity is a two-line consequence of the definitions ("small theorem" is
  generous but not wrong); the indicator is well-defined at every depth
  (fresh ⇒ alive at all K; wheel-excluded ⇒ 0 at all K; killed at depth d ⇒
  alive iff min(K, i) < d), and it survives the m = 1 extension trivially
  because it *quantifies* that extension. My engine asserts it at every
  depth × prime at @11/@13/@17 (all K) and @19 (K ≤ 12): zero violations.
- **T2.b @17/@19 numbers — CONFIRMED, all of them.** @17: ΣcapU₀ = 16112 >
  N = 14850 (floor −1262, VACUOUS — the K = 0 death is real), ΣcapC₀ =
  16135, K* = 2 for both families, floorU(2) = 108 > 82 = floorC(2), truth
  3099, plateau 3057, waste 58 = 23 wheel-excluded + 19 shadows + 16
  fresh-self, ascending truth K = 109, margin 23 at K = 0 and 42 at full
  depth. @19: ΣcapU₀ = 308315 (floor −55865, vacuous), K* = 10, 1987 >
  1877 (margin 110), truth 38380, plateau 38219, waste 213 = 86 + 75 + 52,
  ascending truth K = 410, plateau crossed ascending at K = 281. @13:
  115 > 110, plateau 296, ascending truth 28. Margins +2/+5/+26/+110 all
  reproduce. Density model @17: my measured/model ratios on the first 12
  primes are 0.50–0.53, flat, as claimed.
- **T2.c truth-pool matching bounds — CONFIRMED, and sharpened.** The lower
  bound is a genuine theorem: floor(pool) = truth forces every killable
  candidate to have a pool killer (capU_pool(q) ≥ fresh(q) per prime, with
  equality iff all of q's killable candidates are killed), so sole-killed
  candidates force their unique killers — |pool| ≥ #sole-killer primes. The
  upper bound is an explicit pool. **Sharpening the reports can have for
  free: when LB = UB the minimal pool is UNIQUE and equals the sole-killer
  set** (any truth-reaching pool of minimal size contains all sole killers
  and has exactly that many elements). Verified: greedy pool = sole set
  exactly at @11 and @17, and at @11 the bare sole set {13, 17, 19, 41}
  reaches floor 45 = truth by direct computation. The @11 kill graph
  re-enumerated independently: exactly 9 incidences matching anchored-02's
  list line by line (13 kills 4 composites; 17 kills 19's self ghost + 2;
  19 kills one; 41 kills only 43's self ghost). anchored-01's "K = 8" is an
  ordering artifact, not a contradiction: ascending truth-depth 8 = the
  index of the largest killer 41 in the ascending scour, while the minimal
  pool is 4 — both reproduce. @13: sole = killers = 21, largest killer is
  the 28th scour prime = ascending truth depth. @19 sole count = 350. The
  report's honest limit stands: sole-count = greedy-size is a checked
  coincidence at each level, not a derived law.
- **T2.d density vs forcing ladder — CONFIRMED, sound reconciliation.** The
  two measures are genuinely different objects: anchored-01's +4 is the rise
  of the exact ADVERSARIAL minimum (B&B over class vectors) when q = 13's
  class is anchored; anchored-02's marginal value is certified-floor gain at
  the anchored point a = 0. Both coexist without tension — in the cap
  measure q = 13 at @11 kills exactly 4 candidates (visible in the kill
  graph) and is simply the densest prime. Nothing papered over. (The
  numerical coincidence 4 = +4 at @11 is a coincidence of the small level,
  not an identity — the measures count different things.)
- **T2.e shadow guarantee — CONFIRMED 10/10, and it is a theorem.** Spot
  check at @17 (41, 71, 101, 137, 191, 197, 281, 347, 461, 641): every one
  is a killer in my independently built kill graph. Stronger: the guarantee
  needs no verification at all. If q ≡ 11 or 17 (mod 30) and q + 2 is a
  scour prime, then v = q + 2 is q+2's B-side m = 1 candidate (house 13/19
  automatic; the B-side wheel condition v ≢ 2 (mod p) says p ∤ q, automatic
  for prime q > x), and v mod q = 2 is exactly the B-side kill residue: q
  kills it. One line. The 76/76 check's slot-q-in-comb condition is
  sufficient but slightly stronger than needed (slot membership also
  requires q ≢ p−2 (mod p), which the argument never uses).

## NOT REACHED

- T1: no re-search of the literature negatives; no zbMATH/MathSciNet sweep;
  HL 1923 page image still absent (all already disclosed in the producer's
  §5). The θ-field's full correlation structure beyond AR(1) + θ-collapsing
  was not modeled.
- T2: greedy plateau crossings (64 @17, 273 @19), the @17 ascending
  plateau-cross 67, the efficiency-band figures, and the union-bound
  bracket were not independently recomputed; @19's margin identity was
  asserted only at K ≤ 12 in my engine (all K at the other levels); the
  remaining 66 of the 76 shadow cases rest on the producer plus the theorem
  above; @23+ untouched.

## Scratch reproduction

```
python3 <scratchpad>/rt0821-t1-w1hl.py     # T1, exact fractions, ~40 s
python3 <scratchpad>/rt0821-t2-ladder.py   # T2 @11/@17/@19(K<=12), ~4 min
```

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
