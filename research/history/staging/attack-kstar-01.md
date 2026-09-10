# K* extended five steps: the drift is structural, the certificate reaches 18 of 19.2455 at the chain step itself, and the HL first moment becomes a period-free certificate engine

<!-- ledger
id: Q-kstar-drift
status: ANSWERED
todo: none
question: Is the drift in K* across doubling steps structural, and how far past the scannable levels does the certificate reach?
verdict: Structural and it lands early: K* is now enumerated at 16 doubling steps against 11, the raw drift slope steepens from 0.6881 +/- 0.1328 to 0.8184 +/- 0.0908, and the period-free certificate touches K*+1 = 18, 93.5% of 2^beta2 = 19.2455, at the base-2 chain step s = 16 itself.
-->

*2026-08-21. Producer: `research/attack-kstar-01.js` (345 s, formal embed
with input hashing; re-verify with `node research/qc/embed.js --check
--timeout 900 research/attack-kstar-01.js` — the run walks the full 29# and
31# periods, so the default 120 s check timeout is not enough). Pre-registration:
`attack-kstar-01-prereg.md`, committed ALONE at `552143c` before any of the
three period walks ran — the producer's tile-only prediction sections
existed and had run at commit time; the measurement sections did not exist
yet. Answers `attack-doubling-01.md` §4's alarm and §6's "K* beyond 23# is
unenumerated". HELD, not integrated — awaiting the standing one-pass
adversarial review. Legend as in `research/sift-limit-attack.md`:
**[PROVEN]** proof given here or by exact finite computation with validated
engines; **[VERIFIED]** checked computationally here; **[MEASURED]**
empirical, finite range; **[INFERRED]** deduction from sourced facts.*

---

## 0. The verdict, up front

> **The alarm is structural, and it lands early. K* is now enumerated at 16
> doubling steps (was 11): three new full period walks (13#→29#, 13#→31#,
> 17#→31#) and two period-free certificates past every scannable level
> (19#→37#, 19#→41#). The raw drift slope steepens from 0.6881 ± 0.1328 to
> 0.8184 ± 0.0908, and the certificate touches K*+1 = 18 — 93.5% of
> 2^β₂ = 19.2455 — at the base-2 chain step s = 16 itself, the sup row.
> The instrument that did it: the kill-run count N_k is EXACTLY an
> alternating sum of Hardy–Littlewood local products (W1's ν-case table one
> level up), computable on the tile alone at cost D·2^k independent of the
> period — so "expected count < 1" is not a heuristic here but an integer
> reading N_k = 0, a proven finite-level certificate. The pre-registered
> predictions hit at all three scanned steps, cell for cell (43 census
> cells), and the HL growth verdict is NEAR-LINEAR: the bridging-certificate
> route to an all-s C₂ < 19.2455 is dead — under the model it fails at the
> very next chain step 31#→61#, and no fit is needed to see cert = 18 at
> P(2s) = 31. C₂ itself stays flat (3.22–5.27 across the five new steps);
> what dies is the certificate, not the inequality.**

## 1. (a) The extended ladder

Three full cyclic walks (periods 6.47·10⁹ and 2.006·10¹¹, twice), each
re-deriving the exact ladder from scratch as its custody gate —
**G2(29#) = 258 @ 1205437109 (×2)** and **G2(31#) = 348 @ 8813641451 (×4)**,
digit-for-digit including least argmax and multiplicity, alive counts
= Π(p−2) — plus two certificate-only steps (§3). The fold-recursion path was
also pushed from 13# to 23# (D₂₃ = 7,952,175), so ladder rows 17, 19, 23 are
now re-derived by BOTH paths. **[VERIFIED]**

| step | s | K* | cert = K*+1 | C₂ exact | cert/C₂ | route |
|---|---|---|---|---|---|---|
| 13#→29# | 15 | 10 | 11 | 43/11 = 3.9091 | 2.81 | scan |
| 13#→31# | 16 (chain) | **17** | **18** | 58/11 = 5.2727 | 3.41 | scan |
| 17#→31# | 17, 18 | 13 | 14 | 29/9 = 3.2222 | 4.34 | scan |
| 19#→37# | 19, 20 | 13 | 14 | 528/150 = 3.5200 | 3.98 | I–E, period-free |
| 19#→41# | 21 | 16 | 17 | 546/150 = 3.6400 | 4.67 | I–E, period-free |

Full ladder (K*+1, 16 steps): 3 2 5 3 4 4 6 9 7 11 9 11 18 14 14 17.
All five new C₂ comparisons are custody-exact (both G₂ terms among the 14
exact ladder terms). The certificate holds at every step and its slack
cert/C₂ **widens monotonically in scale**: 1.00 at the first three steps
(attack-doubling-01) to 4.67 at 19#→41#. **[VERIFIED]**

## 2. (b) The HL route, made exact — and the growth verdict

**The identity [PROVEN, elementary].** A slot x survives the entering
primes Q iff t + x avoids {0, −2} mod every q ∈ Q; for a window of k
consecutive level-s slots x₁..x_k, inclusion–exclusion over the surviving
subset J gives, per period of P(2s)#,

> N_k = Σ_shapes Σ_{J⊆[k]} (−1)^{|J|} Π_{q∈Q} (q − ν_q(J)),
> ν_q(J) = #distinct residues of {x_j, x_j+2 : j ∈ J} mod q

— an INTEGER identity, no probability anywhere. Each ν_q(J) is the
Hardy–Littlewood local count of the 2|J|-tuple {x_j, x_j+2}: on pairs it is
exactly W1's case table (ν = 4 − 2[q|d] − [q|d−2] − [q|d+2], verified on
295 cells), so a kill-run IS a k-fold twin-tuple correlation event and N_k
is the HL k-tuple first moment with nothing truncated — the
`w1-singular-series.md` identification one level up. K* = max{k : N_k ≥ 1},
and N_k = 0 is a proven certificate. Cost: D_s·2^k·|Q| with monotone
shape-pruning (an all-killed (k+1)-window needs both its k-sub-windows
all-killed), INDEPENDENT of the period. **[PROVEN + VERIFIED: the I–E
engine reproduces the scan's full run census at every k at all 14 scanned
steps — 63 (step, k) cells at the eleven known steps, 43 more at the three
new ones, and K* equal at all 14.]**

**The model scorecard [MEASURED].** Two smooth rungs against the exact
count, eleven known steps: M0 (iid: N_k = D·M·p₁^k, p₁ = 1 − Π(1−2/q))
overshoots K* by **+4.02 mean**; M1 (pairwise singular-series/Kirkwood:
per-shape Π_{j<j′} of the exact 4-tuple pair correlation) overshoots by
**+1.00 mean**. Pre-registered at the three new steps: M1 landed +2, −1, 0
(PASS under the committed ±2 rule); M0 missed by +7.61, +6.29, +5.42. So
the covering's rigidity is mostly pair-level HL correlation — each entering
prime's kills sit on two rigid APs, and conditioning on a run's early kills
depresses the next slot's kill probability — with a residual ≈ 1 slot of
higher-order rigidity that no pair model sees. **[MEASURED]**

**The growth verdict: NEAR-LINEAR, the alarm is structural.** Three
readings, none needing another:

- ln(K*+1) on ln P(2s): 0.6881 ± 0.1328 (11 points, the alarm) →
  **0.8041 ± 0.1098** (14, scans added) → **0.8184 ± 0.0908** (16, I–E
  certificates in). The slope went UP with the new data. **[MEASURED]**
- The decisive instrument I_eff = ln(D·M)/K*: a log-type K* needs I_eff
  growing like P/ln P (roughly ×2 from P(2s) = 23 to 43); measured I_eff
  stays in **[0.55, 2.56]** across all 16 steps, raw trend 0.3676 ± 0.1400
  per ln P — bounded-looking, mildly rising, nowhere near doubling.
  Since ln(D·M) = θ(P(2s)) − ln(mean slot gap) grows linearly in P(2s),
  bounded I_eff forces K* to grow near-linearly. **[MEASURED + INFERRED]**
- No fit at all: cert = 18 at P(2s) = 31. The doubling report's "crossing
  near P(2s) ~ 69" was an 11-point extrapolation; the truth is that the
  certificate consumed 93.5% of the ceiling already at 31. Under the model
  the next chain step 31#→61# reads M0 crossing 37.0 and measured rigidity
  K*/M0 ∈ [0.568, 0.730], putting its K* at ~21–27 and its certificate at
  ~22–28 — every value above 19.2455 (illustration, not a claim; the
  producer prints the band). **[MEASURED the inputs; INFERRED the band]**

What this does NOT say: C₂ shows no drift (the five new values sit in
[3.22, 5.27], inside the known range, sup still 5.2727 at s = 16). The
inequality's truth is untouched; the *certificate quantity* grows. The
route "prove C₂ ≤ K*+1, bound K*" cannot give any all-s C₂ < 19.2455,
because K*+1 itself passes 18 at the second chain step it can be computed
at. A proof must bound C₂ without passing through the worst kill-run.
**[INFERRED, from proven per-step facts]**

## 3. (c) The bypass, priced exactly

The brief's counting version — "bound the NUMBER of k-runs so that beyond a
threshold the expected count is < 1 in the period" — collapses, on this
object, into something better than a bound: **the first moment of a
deterministic union over placements is the actual count**, and it is
computable exactly on the tile. What certifies it: the I–E engine's 14-step
validation against two independent scan engines (fold recursion + streaming
bucket-mark walk) with the exact ladder as the external anchor, and the
integer arithmetic guarded below 2^53 throughout (WIDTH RULE class).

- **Reach demonstrated.** 19#→37# (period 7.42·10¹²) certified at
  K* = 13 with 1.44·10⁸ subsets; 19#→41# (period 3.04·10¹⁴) at K* = 16
  with 1.04·10⁹ subsets. No walk of those periods is feasible; the
  certificates are finite theorems of the same standing as
  attack-doubling-01's eleven — C₂ ≤ 14 at s = 19, 20 and C₂ ≤ 17 at
  s = 21, both custody-checked against the measured C₂. **[PROVEN per
  instance]**
- **Why it cannot close all-s.** The threshold k*(s) where N_k hits zero is
  exactly K*+1, and §2 shows it grows near-linearly — there is no
  s-independent threshold, so no all-s C₂ emerges from counting alone. An
  ANALYTIC all-s upper bound on N_k would need to bound the alternating
  HL sum uniformly — which is the entering primes' two-class covering
  problem again, the same self-similarity attack-doubling-01 §3 named. The
  bypass changes the cost of a finite certificate (period → tile), not the
  quantifier. **[INFERRED]**
- **Where the engine's own reach ends.** 19#→43# needs a peak pass of
  ~2.5·10¹⁰ subsets (priced from the measured prune profile), 23#→43#
  ~1–2·10¹⁰ with D₂₃ = 7.95·10⁶ shapes — an hour-class JS run each; base
  29 (D₂₉ = 2.15·10⁸) is out entirely. Not run. **[MEASURED the profile;
  the prices are estimates]**

## 4. The pre-registration, scored

Committed alone at `552143c` before any period walk ran. Scored against its
own fixed rule:

- **Exact route: HIT, 3 of 3.** K* = 10, 17, 13 exactly as predicted; the
  scans' run censuses reproduce every predicted N_k value — 11 + 18 + 14 =
  43 (step, k) cells, no exceptions. **[VERIFIED]**
- **M1: PASS** (±2 rule): +2, −1, 0. **M0** overshoots +5.4 to +7.6, as
  expected from the eleven-step scorecard.
- **Two transcription slips in the prereg's derived-prose line, disclosed.**
  The illustrative sentence "exactly 2 maximal 13-runs against base 17, and
  exactly 6 maximal 10-runs in the 29# period" misquotes the prereg's OWN
  committed N_k table: applying its own stated formula
  hist[ℓ] = N_ℓ − 2N_{ℓ+1} + N_{ℓ+2} to its own numbers gives 6 and 36,
  which is what the scans found (and the first derived figure, 2 maximal
  17-runs at 13#→31#, is correct and confirmed). The slips are internal to
  the committed document and derivable from it; the scoring-rule section —
  which binds only K*, the N_k cells, and M1's ±2 — is untouched. Scored
  as written: HIT on every bound cell, two wrong figures in one
  illustrative sentence, flagged here rather than papered over.

## 5. The record anatomy at 29# and 31# (doubling-01's open instruments)

attack-doubling-01 §6 asked whether ρ and overlap efficiency persist at
29#+. Answers, now measured:

- **Ordinary ground: holds, with a new maximum.** ρ = 1.160 (13#→29#),
  1.147 (13#→31#), **1.518 (17#→31#)** — the last exceeds the old max
  1.461; eleven of fourteen scanned steps remain below 1.2. The record
  still assembles by covering, not by pre-thinned terrain, but the
  17#→31# window leans on sparser ground than any before it. **[MEASURED]**
- **Overlap-free zones: persists.** New strikes/kills: 10/10, 15/14, 9/9 —
  one multi-killed copy in three walks (8813641517, struck by 17 and 29),
  running total 86 strikes for 84 kills across fourteen
  steps: covering efficiency at records stays ≈ 98%. **[VERIFIED the
  count]**
- **The record does not anchor on the record — third instance.** The
  13#→29# argmax window contains NO copy of the level-13 record gap (max
  spanned 42 < 66), joining 11#→19# and 13#→23#. At 13#→31# and 17#→31#
  the record copy IS present (inherited shares 0.1897 and 0.3103).
  **[VERIFIED]**
- **New decoupling: the record window is no longer the max kill-run.** At
  13#→29# the argmax realizes k = 10 = K*; at 13#→31# it realizes k = 14
  of K* = 17, at 17#→31# k = 9 of K* = 13. The certificate's widening
  slack is exactly this gap: the longest covering run sits on ground the
  record never uses. Both 31# argmax anatomies decompose the SAME physical
  window [8813641451, 8813641799] against two base levels — C₂ is a
  property of the pair of levels, reconfirmed. **[VERIFIED]**

## 6. Trap grading

Nothing here derives an all-s constant; the five new certificates are
finite-level theorems (C₂ ≤ 11, 18, 14, 14, 17 at their steps) and imply
nothing about limsup. All new C₂ measurements sit in [3.22, 5.27] — the
sup 5.2727 and the landing zone [5.2727, 19.2455) are unchanged, TPC
through the slice stays excluded by the s = 16 datum. The slice remains
trap-free.

## 7. NOT REACHED

- **No all-s bound on C₂ or on K*.** The near-linear verdict is a 16-point
  measurement plus HL-model asymptotics, not a theorem; growth past
  P(2s) = 41 is inferred, not enumerated.
- **19#→43#, 23#→43#, 23#→47#**: priced (§3), not run; base 29+ out of
  reach for the I–E engine as written.
- **19#→41#'s K* = 16 rests on the I–E route alone** — the period 3.04·10¹⁴
  admits no verifying walk; confidence is the 14-step dual-engine
  validation, not an independent measurement at that step.
- **M1's residual (+2 at 13#→29#, −1 at 13#→31#)** has no third-moment
  model; the higher-order rigidity is measured, not derived.
- **The two maximal 17-runs at 13#→31#** are predicted by Mirror-Sweep
  symmetry to be a mirror pair; not checked.
- **The 31#→61# band (cert ~22–28)** is a model illustration; computing
  K*(31#→61#) exactly would need either a 2.3·10²³ walk (impossible) or an
  I–E pass over D₃₁ = 6.2·10⁹ shapes (out of reach as written).
- **No analytic bound on the alternating HL sum** — the self-similarity
  stands exactly where attack-doubling-01 left it; this pass moved the
  certificate's cost, not the quantifier.

## 8. Sources and reproduction

| artifact | what it carries |
|---|---|
| `research/attack-kstar-01.js` | everything above: tiles to 23#, both engines, the 14-step validation, the three walks, the five new certificates, the models, the drift refit (§§1–5) |
| `research/history/staging/attack-kstar-01-prereg.md` | the predictions, committed alone at `552143c` before any walk ran |
| `research/attack-doubling-01.js` + `attack-doubling-01.md` | the eleven known steps, the Bridging Lemma, the alarm this pass answers |
| `research/history/staging/w1-singular-series.md` | the HL ν-case identification this pass lifts from pairs to k-tuples |
| `research/exact-g2-ladder.js`, `research/import-interp-01-bgt-defect.js` | the two ladders, parsed at run time, input-hashed by the embed |
| `research/dhr-verification.md` row 1a | β₂ = 4.26645…, giving 2^β₂ = 19.2455, the ceiling the certificates are read against |

Reproduce: `node research/qc/embed.js --check --timeout 900
research/attack-kstar-01.js` (the fingerprint matches as of 2026-08-21;
the run re-walks both periods, ~6 minutes).

---

*This document states current understanding. Superseded claims, retired
numbers and the reasons they changed are in
[../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
