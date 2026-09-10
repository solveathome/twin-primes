# The proof attempt on RML: the chain from the proven mean square to an exponent below β₂, and the one arrow that does not close

<!-- ledger
id: Q-rml-proof-0829n
status: PARTIAL
todo: 0
question: Starting from Lemma V's PROVEN mean-square bound, what is the exact chain of implications to a two-class exponent below beta_2 = 4.26645, which single arrow is open, and does it close?
verdict: The chain from the proven mean square to an exponent below beta_2 has exactly one open arrow, the mean-square-to-sup recovery REC(s,u0): sup_x |R_H(x)| <= z^{u0/2 - eps} rms(R_H) at H = z^{u0} for one fixed u0 in (2, beta_2); every attempt here dies at a named place (term-by-term accounting is capped at 2s + o(1), the trivial-level exponent; position-union pays e^{theta(z)/q}; window smoothing and the P(y) lever move polylog only; the smooth-profile form is closed on hypothesis and priced above beta_2), the arrow is measured TRUE with certified margin z^1.72 to z^1.92 at u0 = 4 over z = 19..37 and the truth's slope 2.766 +/- 0.212 sits 5.8 se under u0 = 4 on seven points under one octave, so the failure is a proof gap at every computable z and undecided asymptotically; no exponent moved.
-->

> **RIDER 2026-08-30 (orchestrator, from `redteam-0830-rml.md`: 12 claims
> stand, 14 fail at sentence level, none inflating any result — the
> load-bearing one errs in the CONSERVATIVE direction).** PROVEN under
> independent code: the whole CAP lemma of §4.1, including the sine-sum step
> this note checked only numerically (Σ 1/sin(πa/e) ≤ e·H_{⌊(e−1)/2⌋} + 1 ≤
> e(ln e + 1), violated at no e ≤ 20000), the slope 2.7660 ± 0.2120 with its
> 1.10 and 5.82 se placements, and the reduction. WHAT FAILS: (i) §2's
> `ms_m`/`ask` column is log_z √(B·H) with B the PROVEN Lemma V constant, i.e.
> the exponent of the proven BOUND on the rms, not of the rms ⟨R_H²⟩^{1/2}
> that REC names; the two part by 36.53× to 200.45× because ⟨R_H²⟩ saturates
> once H passes the correlation length while B·H grows linearly, so §5's
> reading "at u₀ = 3.0 and 3.5 ask does not exceed gauss" REVERSES at every
> row when both sides are measured against the same mean square; (ii) "gauss
> → 0" and "sup/rms ≤ √(2 lnW)·O(1) = z^{o(1)}" are both wrong (the limit is
> 1/2, measured 0.5645 at z = 1e7) and contradict this note's own §0; (iii)
> "the recovery exponent … 0.99–1.29" quotes the `truth` column, whose real
> value is 0.56–0.67; (iv) "REC would be moot rather than false" should read
> false; (v) "u_cap → 2s" and "n ~ z^{2s}/polylog" are asserted, not proven
> (`verify-0830-usup-convention.md` §6's "OPEN in both directions" is the
> better-calibrated reading); (vi) the 1.509-octave correction is still
> unapplied in three places. NEW: u_cap crosses β₂ at z = 53, reaches 4.4891
> at z = 79, and passes u_triv from z = 53.

*(2026-08-29 night wave, staging. Producer:
`research/history/staging/attack-0829n-rml-proof.js`, embedded via
`qc/embed.js`. No existing file edited, no git command run. Every number
below is either in the producer's OUTPUT block or a quotation of an embedded
artifact cited by file and section. Calibration per claim: PROVEN, MEASURED,
HEURISTIC, OPEN, REFUTED.)*

## 0. What is open, first

- **RML(α) is open at every α, and so is every form F1–F4. Nothing here
  lowers any exponent.** The deliverable is a location, not a theorem: the
  chain from Lemma V's PROVEN mean-square bound to an exponent below
  β₂ = 4.26645 has one open arrow, written down in §3 with its quantifiers,
  and none of the five attempts in §4 closes it.
- **The open arrow is Lemma V's sup form (F2 of `rho-maximal-law.md` §1)
  with the proven mean square factored out.** It is not a new statement. What
  is new is the accounting: which part of F2 is proven (the rms), what the
  remainder must supply (a recovery of the sup from the rms by a factor
  z^{u₀/2−ε}), what every proven recovery actually costs (either the
  position-union price e^{θ(z)/q} or the term-count cap z^{2s+o(1)}), and
  what the truth measures (the sup exceeds the rms by about √(4θ(z)), i.e.
  z^{1/2+o(1)} if the Gaussian form persists).
- **Finite-z sufficiency is calibration, not a result.** At z ≤ 37 even the
  term-count cap reads below β₂ (u_cap 3.4103 → 4.0593, OUTPUT S2), which is
  the Bonferroni-x ≤ 227 phenomenon of `rho-maximal-law.md` reading 4 at yet
  another instrument. No row of any table below is evidence for an asymptotic
  statement; the rows are there to show the arrow is true where it can be
  seen, and by how much.
- **Asymptotically the arrow is undecided in both directions.** The truth's
  measured slope, 2.7660 ± 0.2120 on seven points spanning less than one
  octave of z (OUTPUT S5), leaves 1.23 exponents of room under u₀ = 4 and
  0.23 under u₀ = 3; the corpus's standing observation that local slopes here
  rise with z (`rho-maximal-law.md` reading 6; `rho-exact-z31-01.md` §0)
  applies. The u₀ = 3 form could be false; the u₀ = 4 form is 5.8 se clear on
  a fit that cannot refute an asymptotic statement.
- **What this note did not do.** It ran no new sup over positions (the exact
  points at z = 31, 37 were bought on 2026-08-29 by `rho-exact-z31-01.md`),
  it did not price the smooth-profile form again (CLOSED, `REFUTED.md`
  "manufacturing the smooth profile"), and it did not touch ⟨ρ̃⁴⟩, the named
  stopping object of `attack-rhoms-01.md` §3.

## 1. The objects and the direction of every inequality (wrong-direction guard)

Fix s = 3.0 (the measured family; any s > 1 + √e = 2.6487 gives M > 0), a
prime z, W = P(z), D = z^s, the divisor-pair lattice (block, d₁, d₂) with
q = [d₁, d₂], w = ε μ(d₁)μ(d₂) ∈ {±1}, c the CRT class, n the term count and
M = Σ w/q > 0 (`rho-maximal-law.md` §1). The potential ρ(y) = Σ_j w_j
ψ((y − c_j)/q_j), the centred ρ̃ = ρ + M/2, and for a window H the certificate

    T(x) = H·M + R_H(x),      R_H(x) = ρ(x) − ρ(x + H),

with T(x) ≤ #{twin-admissible r ∈ (x, x+H]} pointwise (Brüdern–Fouvry,
PROVEN, `rho-maximal-law.md` §2 (iv)). The consumer is min_x T(x) ≥ 1, which
gives G₂(z#) ≤ H. Every inequality this note uses or asks for, with its
direction and why it is legal under `attack-wrongdirection-audit.md`:

| # | inequality | direction | rung | legality |
|---|---|---|---|---|
| I1 | ⟨R_H²⟩ ≤ B(z,s)·H, B ≤ 9A²(E−1) = O(ln⁸z) | upper bound on a period mean | PROVEN (`lemmaV-parseval.js` L1–L5; `redteam-0829-theorem1.md`) | no position quantifier; gives only almost-all statements at any H, so it carries no TPC content even at H < z² |
| I2 | sup_x \|R_H(x)\| ≤ H·M − 1 at H = z^{u₀}, ONE fixed u₀ ∈ (2, β₂) | upper bound on the remainder, the direction that bounds G₂ from above | OPEN (= F2 at (s, u₀)) | legal by audit row 10: the band (2, β₂] is exhibited legal, α = β₂ being PROVEN with TPC open. TPC-strength if u₀ ≤ 2 (Gap Reformulation, constant < 1 at exponent 2) or if stated uniformly in u down to 2 (Axis A). This note fixes u₀ and never lets it move |
| I3 | REC(s,u₀): sup_x \|R_H(x)\| ≤ z^{u₀/2−ε}·⟨R_H²⟩^{1/2} at H = z^{u₀} | upper bound on a sup by a multiple of an rms | OPEN, the arrow | implies I2 through I1 and M ≍ 1/ln²z; same legality as I2, same trap at u₀ = 2 (there it would read sup ≤ z^{2−ε}·polylog < z²/ln²z, i.e. o(z²), which is TPC) |
| I4 | sup\|R_H\| ≤ Σ_e Vabs(e)·e·(ln e + 1) =: CAP(z) for every H | upper bound, absolute values across moduli | PROVEN here (§4.1) | harmless: delivers exponent 2s + o(1) ≥ 2(1+√e) = 5.2974 |
| I5 | M ≥ c(s)/ln²z at s > 1+√e | lower bound on the main term | standard, CITED; MEASURED M·ln²z = 0.3359–0.3772 at z = 13..37 (OUTPUT S0) | no twin content |
| I6 | the floor: no correct law delivers H below nP(z); th(nP) ≥ 2.0106 at z = 47 | lower bound on any deliverable window | MEASURED (`rho-maximal-law.md` §2, rider 2) | the reverse direction; if it ever exceeded β₂ it would kill the item, and it is undecided asymptotically |

Two things the table makes explicit. I1 is the strongest possible statement
about the remainder on average: at every level D and every H the mean square
is √H·polylog, square-root cancellation with no level restriction, and it is
proven. The consumer needs something far weaker in size, H/ln²z, but
pointwise. The whole distance between I1 and I2 is the quantifier over x,
which the corpus has priced before (`sift-limit-attack.md` §7e: "the price is
exactly the quantifier"); what §3 does is write that price as one inequality
with its exponent.

## 2. The chain, each arrow graded

The vector sieve consumes one statement, min_x T(x) ≥ 1 at some H = z^{u₀}.
Read from the proven end:

```
 (C1) <R_H^2> <= B(z,s) H                     PROVEN   L1-L5 (lemmaV-parseval.js); every H, z, s
 (C2) B(z,s) <= 9 A(z)^2 (E(z)-1) = O(ln^8 z) PROVEN   redteam-0829-theorem1.md; no hypothesis
      => rms(R_H) <= z^{u0/2} (ln z)^4 O(1)   PROVEN   composite of C1, C2 at H = z^{u0}
 (C3) sup_x |R_H(x)| <= z^{u0/2 - eps} rms    OPEN     REC(s,u0), the arrow, sec.3
 (C4) M >= c(s)/ln^2 z  (s > 1 + sqrt e)      CITED    standard linear sieve; MEASURED 0.3359-0.3772 (S0)
      => sup_x |R_H(x)| <= H M - 1, z >= z0   PROVEN   from C3 + C2 + C4 (the polylogs are absorbed by z^eps)
 (C5) T(x) = H M + R_H(x)                     PROVEN   exact identity
 (C6) T(x) <= #{admissible r in (x, x+H]}     PROVEN   Bruedern-Fouvry pointwise, pilot-verified
      => G2(z#) <= H = z^{u0},  z >= z0       PROVEN   from C4-C6: exponent u0 < beta_2
```

Beside the open arrow stand two proven arrows that reach the consumer
without it, and both land above β₂:

```
 (C3-triv) sup|R_H| <= 2 sup|rho~| <= n + M           PROVEN  triangle inequality over the lattice
           => exponent u_triv -> 2s + o(1)              at s = 3: 6; at s -> 1+sqrt e: 5.2974
 (C3-cap)  sup|R_H| <= CAP(z) = sum_e Vabs(e) e (ln e + 1)  PROVEN  sec.4.1, this note
           => exponent u_cap  -> 2s + o(1)              same asymptote; 3.4103 -> 4.0593 at z = 13..37 (S2)
 (C3-cheb) #{x : |R_H(x)| >= HM-1} <= B H W/(HM-1)^2   PROVEN  Chebyshev off C1
           => almost-all exponent 0, sup exponent none  attack-beta2-01 item 2; rho2-analytic-bound.md sec.4
```

At numbers, s = 3.0, from OUTPUT S1 (exponents base z; rows with H > W
dropped):

| u₀ | z | need = log_z(HM−1) | ms_m = log_z √(B_meas H) | ask = need − ms_m | union = θ(z)/(2 ln z) | truth = log_z(2 sup\|ρ̃\|) |
|---|---|---|---|---|---|---|
| 4.00 | 19 | 2.9033 | 2.0613 | 0.8420 | 2.2319 | 0.9873 |
| 4.00 | 29 | 2.9763 | 2.0568 | 0.9195 | 2.8544 | 1.0626 |
| 4.00 | 37 | 3.0104 | 2.0551 | 0.9553 | 3.6036 | 1.2874 |
| 3.00 | 19 | 1.9021 | 1.5613 | 0.3408 | 2.2319 | 0.9873 |
| 3.00 | 37 | 2.0102 | 1.5551 | 0.4551 | 3.6036 | 1.2874 |
| 4.25 | 37 | 3.2604 | 2.1801 | 1.0803 | 3.6036 | 1.2874 |

Read across a row: the consumer at (3.0, 4.0), z = 37 needs sup|R_H| under
z^{3.0104}; the proven mean square hands over an rms of z^{2.0551}; so the
arrow must recover the sup from the rms within a factor z^{0.9553}
(asymptotically z^{u₀/2 − o(1)} = z^{2−o(1)}, the finite-z figure being
smaller because M and the polylogs bite); the only fully proven recovery,
a union over the W positions, charges z^{3.6036} and rises like z/(2 ln z);
and the truth, certified from the exact sup|ρ̃|, sits at z^{1.2874}. The
arrow is the inequality truth ≤ ask, and at every measured level it holds
by a wide margin (§5); the union price exceeds the ask at every level from
z = 19 on and diverges.

**Which arrow is "the" open one.** C3 is the only arrow in the first block
that is not PROVEN or CITED-standard. C4's citation is standard linear-sieve
asymptotics at s > 1+√e and is not in doubt; C6 is Brüdern–Fouvry's pointwise
inequality, verified. So (a) of the brief is answered: one open arrow, C3,
and everything else in the chain is a theorem.

## 3. The open arrow, isolated, with its quantifiers and its payoff

**REC(s, u₀).** Fix s > 1 + √e and u₀ ∈ (2, β₂). There exist ε > 0 and z₀
such that for every prime z ≥ z₀, with D = z^s, H = ⌊z^{u₀}⌋, W = P(z), the
signed sawtooth remainder of the level-D vector-sieve lattice satisfies

    sup_{x ∈ ℤ/W} |R_H(x)|  ≤  z^{u₀/2 − ε} · ⟨R_H²⟩^{1/2},

the mean on the right taken over one full period. Quantifier discipline: the
sup is over ALL W positions; s and u₀ are fixed before z; ε may depend on
(s, u₀) but not on z; u₀ is never a function of z and is never sent to 2.

**Equivalent forms, so the arrow can be recognised in other clothing.**

- In sieve currency: a level of distribution for the signed two-class
  Rosser comb in short intervals, uniformly in the interval's position. The
  joint level is D² = z^{2s} = H^{θ_total} with θ_total = 2s/u₀; at (3.0, 4.0)
  that is θ_total = 1.5, and the break-even the corpus has already priced is
  θ_total > 1.2090 for Brüdern–Fouvry's asymmetric split
  (`sift-limit-attack.md` §7b) and 5.297442541400/β₂ = 1.241651 for the
  symmetric lattice used here (§7b (1b)). REC is that level statement with
  the remainder's size measured against its own rms rather than against H.
- In the F-ladder of `rho-maximal-law.md` §1: REC(s, u₀) is F2 at window
  exponent u₀ with the mean square factored out. F2 ⟸ REC, and F3 = RML(α)
  with α < u₀ ⟹ REC (through |R_H| ≤ 2 sup|ρ̃|). F4 (the Gaussian form,
  λ = 0) ⟹ REC with room to spare: it supplies sup/rms ≤ √(2 lnW)·O(1) =
  z^{o(1)}, against an allowance of z^{u₀/2 − ε}.
- The weakest law-shaped form beneath it is per-position in H: ∀x ∃H ≤ z^{u₀}
  with T_H(x) ≥ 1. It is implied by REC and it is exactly "every window of
  length z^{u₀} contains a certified survivor"; no instrument in the corpus
  distinguishes it from F1, and it is listed so the ladder has its bottom.

**What its truth gives, quantified.** REC(s, u₀) ⟹ G₂(z#) ≤ z^{u₀} for all
z ≥ z₀ (chain C4–C6), an unconditional two-class exponent u₀. At u₀ = 4.0 the
movement below β₂ is 0.266 of exponent; at u₀ = 4.25 it is 0.016; at
u₀ = 3.0 it is 1.266 [ARITHMETIC: β₂ − u₀ on the cited β₂], and the u₀ = 3.0
form is the one the data leave least room for (§5). Every u₀ here is above the measured floor th(nP) ≥ 2.0106
(z = 47, I6), so none is excluded by the floor at any measured level.

**What it costs, in the corpus's own currencies.** Against the trivial
accounting (C3-triv, C3-cap) REC asks for a saving of z^{2s − u₀ − o(1)} over
the triangle inequality, uniformly in x: z^{2.0} at (3.0, 4.0), z^{1.75} at
(3.0, 4.25), and z^{1.031} at the cheapest legal point (s → 1+√e, u₀ → β₂)
[ARITHMETIC: 2s − u₀, and 5.2974 − 4.2665 on the cited constants], which is
the 2(1+√e) − β₂ gap the corpus has carried since `sift-limit-attack.md`
§4.5. Against the proven mean square it asks for a
recovery exponent below u₀/2, where the proven recoveries cost θ(z)/(2k ln z)
at moment order k (`attack-rhoms-01.md` §3), i.e. diverge. The measured truth
of the recovery exponent is log_z(2 sup|ρ̃|/rms): about 0.99–1.29 in the
table of §2, and if the Gaussian form persists it is 1/2 + o(1).

**Kill checks, run.** (i) Is REC on a REFUTED row? No. The rows nearest it
are "Lemma V's mean-square form as the missing factor" (CLOSED because B was
never binding, which is the statement C1–C2 are proven and irrelevant to C3),
"u_sup as an unconditional worst-position bound" (CLOSED; C3-cap is that route
with its asymptote named, not the arrow), "the ℓ¹ → ℓ²√log conversion"
(CLOSED because that conversion IS the sharp maximal law; REC asks for
ℓ² × z^{u₀/2}, not ℓ² × √log), "generic chaining" (CLOSED; not retried), and
"the Kowalski–Michel–Sawin branch" and "manufacturing the smooth profile"
(CLOSED; §4.5 says why they are not REC). (ii) Is REC TPC-strength? No, at
fixed u₀ > 2 (§1, I3). (iii) Is it already listed ANSWERED? No: QUESTIONS.md
carries Q-rho-maximal-law as PARTIAL with the law itself open, and this note
is the proof attempt that item calls for, not a re-run of its measurements.

## 4. The attempt, and where it dies

Five routes were tried on REC. One produced a small theorem (4.1, an
asymptote for a closed route); none produced the arrow. Each is recorded
with the exact place it stops.

### 4.1 Term-by-term accounting is capped at 2s + o(1), and the cap is the trivial-level exponent

**Lemma (PROVEN here).** For every H, sup_x |R_H(x)| ≤ CAP(z) :=
Σ_{e | P(z), e > 1} Vabs(e)·e·(ln e + 1), and CAP(z) ≤ z^{2s}·(2s ln z + 1)·
6·Π_{p<z}(1 + 2/p)². Proof: L5 gives R_H(x) = Σ_e Σ*_a Θ_e(a) S_H(a/e)
e(ax/e); |Θ_e(a)| ≤ Vabs(e) (Theorem B of `attack-beta2-01-lemmaV-meansquare.md`
§1); |S_H(a/e)| = |sin(πHa/e)/sin(πa/e)| ≤ 1/sin(πa/e); and Σ_{a=1}^{e−1}
1/sin(πa/e) ≤ e(ln e + 1) from sin(πt) ≥ 2t on [0, 1/2] (checked numerically,
worst ratio 0.585568 over e = 2..20000, OUTPUT LEMMA CHECK). The second
inequality: e | q_i for some i forces e ≤ q_i ≤ D² = z^{2s}, and Σ_e Vabs(e)
≤ Σ_e T(e) = Σ_i (τ(q_i) − 1)/q_i ≤ 6 Π(1 + 2/p)² because q_i ≥ d₁d₂/2 and
τ(q_i) ≤ τ(d₁)τ(d₂) (partition identity checked exact at all seven levels,
S0; measured Σ Vabs = 0.9442–0.9747 against Σ T = 79.08–242.86 against
6Π² = 301.7–937.7, S2). Per-modulus, the cap was checked against the exact
Σ*_a |Θ_e(a)||S_H(a/e)| at z = 13, 17 for H = z³ and z⁴: no violation, and
the cap is loose by 28.62–36.94× in total (S2).

**What it says.** u_cap = log_z((CAP + 1)/M) → 2s + o(1); measured 3.4103 →
4.0593 at z = 13..37, above the cited u_sup 2.0617 → 3.0125 at every level,
as it must be (S2). At s ↓ 1 + √e the asymptote is 2(1 + √e) = 5.2974, the
K_FH of `sift-limit-attack.md` §7b (1b): every accounting that takes absolute
values across the lattice, in the divisor-pair basis or the Fourier basis,
lands on the trivial-level exponent, and so does the term count itself
(u_triv 3.7560 → 4.1038, S2). **Where it dies:** the asymptote is set by the
term count n ~ z^{2s}/polylog, and no cancellation across moduli is used.
The exponent gap REC must close, z^{2s − u₀ − o(1)}, is exactly the gap
between this cap and the window.

**A correction in passing, verdict unchanged** (attribution corrected
2026-08-30 per `verify-0830-usup-convention.md` §3.1, which confirmed at the
code that both notes bound the same lattice). `lemmaV-sup-extension.md` §4
describes Ssat's growth over z = 13..47 as geometric in π(z) (per-prime factor
2.0516, its line 442), says the e-sum "has 2^π(z) terms" (lines 485-486), and
writes the reachable theorem as Ssat ≤ A·C^{π(z)}, hence G₂(P(z)) ≤
exp((ln C)(1+o(1)) z/ln z), "superpolynomial in z" (lines 508-516). At fixed
s the lemma above refutes the last two: the e-sum has at most z^{2s} moduli,
Ssat ≤ CAP ≤ z^{2s+o(1)}, and the reachable theorem is G₂(P(z)) ≤
z^{2s+o(1)}, polynomial, the trivial-level exponent, which is what that
note's §7 first bullet anticipated. Its measured tables stand as
measurements and its closure verdict ("plateau above β₂, or divergence — the
same verdict") is unaffected, since 2s ≥ 2(1 + √e) > β₂ at every admissible
s; the divergence disjunct is now refuted at fixed s.

### 4.2 Position-union routes, including hypercontractivity, are dominated by 4.1

Chebyshev and the moment ladder are on record: sup ≤ W^{1/2k}·‖R_H‖_{2k}
pays e^{θ(z)/2k} and needs k ≍ z/(1.53 ln z) (`attack-rhoms-01.md` §3;
`rho2-analytic-bound.md` §4). The one route not on record is the product
structure of the positions: x ∈ ℤ/W ≅ Π_{p<z} ℤ/p, and the modulus-e
component f_e(x) = Σ*_a Θ_e(a) S_H(a/e) e(ax/e) depends on only the ω(e) ≤
2s log₂ z coordinates dividing e, so R_H is a sum of low-coordinate functions
on a product space and hypercontractive moment bounds suggest themselves.
They give nothing, and the reason is sharp: on ℤ/p with uniform measure the
degree-one function 1_{x ≡ c} − 1/p has ‖·‖_q/‖·‖₂ = p^{1/2 − 1/q}(1 + o(1)),
so the best per-coordinate constant is the atom size, and over the
coordinates of e it multiplies to e^{1/2 − 1/q} ≤ z^{s(1 − 2/q)}. Then
sup|R_H| ≤ W^{1/q}·Σ_e e^{1/2 − 1/q}‖f_e‖₂, the triangle inequality across
moduli re-enters, and the requirement θ(z)/(q ln z) + s(1 − 2/q) +
½ log_z(#moduli) < u₀/2 forces q → ∞ (θ(z) ≍ z) and then u₀ > 2s + log_z
(#moduli): strictly worse than 4.1. Rung: the negative is elementary; no
hypercontractive theorem was cited because its best case is already
dominated. **Where it dies:** the atom √p, i.e. one residue class has no
cancellation by itself; the saving must come from the signs w_j across
terms, which no per-term or per-coordinate bound sees.

### 4.3 Window smoothing and the P(y) lever move polylogs, not the exponent

Averaging T_H(x) over H ∈ [H₀, 2H₀) is legitimate for the consumer (an
average ≥ 1 forces some T_H(x) ≥ 1, hence a survivor in (x, x + 2H₀]) and it
replaces |S_H(a/e)| ≤ 1/(2‖a/e‖) by a Fejér-type kernel ≤ c/(H₀‖a/e‖²),
which cuts the per-modulus ℓ¹ mass from e ln e to about e²/H₀ for e < H₀
and does nothing for e > H₀. Choosing H ≡ 0 mod P(y) kills every modulus
all of whose primes are < y exactly (V1). Measured: at u₀ = 4 the moduli
above the window carry 0–27.26% of CAP over z = 13..37 (S3), so at
computable z the smoothing would remove most of the ℓ¹ mass, and the P(y)
lever at y = ⌈4 ln z⌉ removes 31.64% of CAP at z = 13 falling to 1.713% at
z = 37 (S4). Neither touches the asymptote: **the part of CAP below
z^{u₀ − δ} is at most z^{u₀ − δ}·polylog (PROVEN, from the second
inequality of 4.1 applied to e ≤ z^{u₀ − δ}), so it is below HM − 1 for
large z at any fixed δ > 0, and REC needs proving only for the moduli in
(z^{u₀ − δ}, z^{2s}]**. At (u₀, δ) = (4, 0.5) that part reads 0.3948, 0.3884,
0.5067, 0.5346 of HM − 1 at z = 19, 29, 31, 37, already below 1 but rising
(the polylog dominates the z^{−δ} at these z), and the remaining moduli carry
24.45–56.84% of CAP (S3). **Where it dies:** the moduli above the window
are exactly the terms whose class hits the window at most once, so the
reduced arrow is a bound on the signed count of large-modulus hits,
Σ_{r ∈ (x, x+H]} Σ_{d₁ | r, d₂ | r+2, [d₁,d₂] > z^{u₀−δ}} w(d₁,d₂) = o(H/ln²z)
for every x — the definition of the problem with the easy part removed, and
no instrument for it.

### 4.4 The mean square is not improvable into the arrow

I1 is already square-root cancellation at every level, uniform in s
(B ≤ 9A²(E−1) with no s in it, `redteam-0829-theorem1.md` §1). Improving B
to O(1) (measured flat 1.3833–1.4883, `attack-AB-bounded.md` §1.4) would
change ms_m by O(ln ln z/ln z) and nothing in the ask column of §2. The
corpus's row "Lemma V's mean-square form as the missing factor — CLOSED" is
confirmed from this side: C1–C2 are a theorem, and they are not where the
exponent is lost.

### 4.5 The fixed-smooth-profile form is not the arrow, from both ends

Written in the form the Kloosterman-fraction instruments prove: for smooth
compactly supported g₁, g₂ and arbitrary 1-bounded α, β,
Σ_{d₁, d₂} g₁(d₁/D₁) g₂(d₂/D₂) α(d₁) β(d₂) e(−2h d̄₁/d₂) e(−hx/(d₁d₂)) ≪
(D₁D₂)^{γ}·H^{o(1)}, uniformly in x, with γ ≤ 0.827142 needed against
Bettin–Chandee's 0.970624 (`rho-maximal-law.md` §5; `sift-limit-attack.md`
§7b). It is disconnected from REC at both ends. (i) The instruments need a
smooth factor in the modulus and the inverted variable; the Rosser weight
μ(d)·1_{S^±}(d) has none and cannot be decomposed into any: its
low-frequency share sits at the random-sign noise floor at 31 of 31 slices
(`smoothness-front.md` §4.3; `REFUTED.md` "manufacturing the smooth
profile", CLOSED). (ii) The consumer cannot take a smooth g either:
Brüdern–Fouvry's pointwise inequality needs λ⁻ ≤ 1_{rough} ≤ λ⁺, which
Möbius-signed Rosser supports supply and a smooth profile does not. (iii)
Granting the smoothness anyway, the published bound prices at exponent
5.0907 > β₂ and holds for x ≪ H^{1.21} against a period of exp(H^{0.2344})
(`rho-maximal-law.md` §5). So "at a fixed smooth profile" the statement is
a different statement with a closed hypothesis, not REC in other clothing.
Rung: CITED throughout; nothing re-priced here.

## 5. Proof gap or truth gap: the arrow against the data

**Against the sharp form first, as the brief asks.** The TPC-implying sharp
law is sup|R_H| ≤ √⟨R_H²⟩·√(2 ln W) at the operative window H ≈ 0.5 z², with
constant 1; it fails at z = 19 by 0.6% and on 528 of 640 windows at z = 31
(`rho-maximal-law.md` §4; `rho-exact-z31-01.md` §4.5). REC is at H = z^{u₀}
with u₀ > 2 and allows a factor z^{ask} in place of √(2 ln W): in the table
of §2 the allowance ask exceeds the Gaussian factor gauss = log_z(2√(2 ln W))
at every level from z = 19 at u₀ = 4.0 (0.8420 against 0.7905 at z = 19,
0.9553 against 0.7392 at z = 37) and at u₀ = 4.25, while at u₀ = 3.0 and 3.5
it does not (0.3408–0.4551 and 0.5918–0.7053 against 0.7392–0.7905). So at
computable z the u₀ ≤ 3.5 forms ask for less than Gaussian recovery and are
the forms a sharp-law failure could touch; the u₀ ≥ 4.0 forms sit above the
Gaussian line there, and the sharp law's death at z = 19 says nothing about
them. Asymptotically ask → u₀/2 − o(1) while gauss → 0, so every form ends
above the Gaussian line; the finite-z ordering is a statement about where
the polylogs bite.

**At every computable level the arrow holds, with a certified margin.**
Since sup|R_H| ≤ 2 sup|ρ̃| (exact), F(z, u₀) = (HM − 1)/(2 sup|ρ̃|) is a lower
bound on the true margin. From S1 (rows with H < W only):

| u₀ | F at z = 19, 29, 31, 37 | log_z F |
|---|---|---|
| 3.00 | 1.478e+1, 2.166e+1, 1.548e+1, 1.360e+1 | 0.9148, 0.9134, 0.7977, 0.7228 |
| 3.50 | 6.462e+1, 1.168e+2, 8.625e+1, 8.276e+1 | 1.4157, 1.4137, 1.2980, 1.2230 |
| 4.00 | 2.819e+2, 6.290e+2, 4.803e+2, 5.035e+2 | 1.9160, 1.9137, 1.7980, 1.7230 |
| 4.25 | 5.885e+2, 1.460e+3, 1.133e+3, 1.242e+3 | 2.1660, 2.1637, 2.0480, 1.9730 |

The margin in exponent falls with z at every u₀, by 0.19 from z = 19 to 37
at u₀ = 3.0 and 4.0 alike: in the §2 table the truth column rises from
0.9873 to 1.2874 while need rises only from 2.9033 to 3.0104 (u₀ = 4.0), and
u₀ enters need as an additive constant, so the fall is the same at every
u₀. Rung: MEASURED on the cited exact suprema; the factor 2 in
|R_H| ≤ 2 sup|ρ̃| is up to 2× conservative and was not tightened (sup|R_H|
at H = z^{u₀} was not walked).

**Proof gap, not truth gap, at every z where the question can be put.** No
computable level contradicts REC at any u₀ ≥ 3, and the sharp-form failure
is at a window two exponents below the legal band. Asymptotically: the
truth's slope is 2.7660 ± 0.2120 (S5, seven points, estimator returns
2.500000 on a synthetic z^{2.5} truth), leave-one-out 2.6180 ± 0.2601, and
the room under u₀ reads 0.2340 (1.10 se) at u₀ = 3.0, 0.7340 (3.46 se) at
3.5, 1.2340 (5.82 se) at 4.0, 1.4840 (7.00 se) at 4.25. The F4 envelope
2√⟨ρ̃²⟩√(2 ln W) itself has slope 2.5111 ± 0.1775 on the same points (S5),
so the measured truth is tracking the Gaussian envelope, not outrunning it.
Two honest limits on that reading: seven points under one octave decide no
asymptote, and the corpus records local slopes here rising with z
(`rho-exact-z31-01.md` §0). The u₀ = 3.0 form is therefore the one that
could be false; the u₀ = 4.0 form is measured true with 1.2 exponents to
spare and no known mechanism against it. Neither is a theorem, and the
distance from measured truth to proof is the whole of §4.

## 6. What would falsify the arrow, and whether it has run

- **REC(3.0, u₀) false at a computable z**: an exact sup|ρ̃|(z) with
  2 sup|ρ̃| ≥ HM − 1 at H = z^{u₀}, or, sharper, a walked sup|R_H| at that H
  above HM − 1. RUN at z = 13..37 through the cited exact suprema (S1): no
  failure at any u₀ ≥ 3.0; margins in §5. NOT RUN for sup|R_H| directly at
  H = z^{u₀} (the factor 2 stands in), and NOT RUN at z ≥ 41 (the z = 31, 37
  walks cost 6928 s, `rho-exact-z31-01.md`; z = 41 is a period of 7.4e12
  positions, well above the four-hour rule, so it is an ask).
- **The truth's slope reaching u₀**: the seven-point slope 2.7660 ± 0.2120
  (S5) against u₀. RUN. Decides nothing asymptotically; u₀ = 3.0 is 1.10 se
  away and u₀ = 4.0 is 5.82 se away. The next exact point moves this more
  than anything else here.
- **A worst-position construction**: a position x with a large-modulus
  hit count of order H/ln²z (the §4.3 reduced form). The corpus's closest
  test is `sift-limit-attack.md` §7b (3): at a CRT-planted doubly-smooth
  position the absolute sum reaches 0.978 of the trivial bound while the
  signed sum stays about H (max 6 over 20,000 positions at pair count
  588). RUN at one level; it passed; it is one level.
- **The floor crossing β₂**: if th(nP(z)) ever exceeded β₂, no law of any
  strength could deliver and REC would be moot rather than false. MEASURED
  ≥ 2.0106 at z = 47 (prefix bound); undecided asymptotically
  (`rho-maximal-law.md` reading 6, two models, neither called).
- **The cap lemma of 4.1 wrong**: a modulus e with Σ*_a |Θ_e(a)||S_H(a/e)|
  above Vabs(e)·e(ln e + 1), or u_cap below the cited u_sup at some z. RUN
  at z = 13, 17 over every primitive frequency (no violation) and at seven
  levels against the cited column (u_cap ≥ u_sup at all seven, S2).
- **The reduction of 4.3 wrong**: CAP_{≤ z^{u₀−δ}} not below HM − 1 for
  large z. The inequality is a one-line consequence of 4.1's second bound
  and cannot fail asymptotically; at (4, 0.5) it reads 0.39–0.53 and rising
  over z = 19..37 (S3), so at computable z it is the polylog, not the
  exponent, that is being watched.

## 7. Readings

1. **STATED, one open arrow.** From Lemma V's proven mean square to an
   exponent below β₂ the chain is C1–C6 of §2; C1, C2, C5, C6 are PROVEN,
   C4 is standard and measured (M ln²z = 0.3359–0.3772 at z = 13..37, S0),
   and C3 = REC(s, u₀) is the only open arrow. Every proven substitute for
   C3 lands at exponent 2s + o(1) or pays e^{θ(z)/q}.

2. **ISOLATED.** REC(s, u₀): for fixed s > 1 + √e and fixed u₀ ∈ (2, β₂),
   sup_x |R_H(x)| ≤ z^{u₀/2 − ε}·⟨R_H²⟩^{1/2} at H = z^{u₀} for all large z.
   Its truth gives G₂(z#) ≤ z^{u₀}. It is F2 with the rms factored out, a
   level-of-distribution statement at θ_total = 2s/u₀ measured against the
   remainder's own rms, legal at fixed u₀ > 2 and TPC-strength at u₀ = 2
   or uniformly down to it. It is on no REFUTED row (§3, kill checks).

3. **PROVEN, small, an asymptote for a closed route.** Every absolute-value
   accounting across the lattice is capped by CAP(z) ≤ z^{2s}(2s ln z + 1)·
   6Π(1 + 2/p)², so u_sup ≤ 2s + o(1), which at s ↓ 1 + √e is 5.2974, the
   trivial-level exponent. Measured u_cap 3.4103 → 4.0593 against the cited
   u_sup 2.0617 → 3.0125 (S2); the cap is loose by 28.62–36.94× against the
   exact Fourier ℓ¹ sum at z = 13, 17. `lemmaV-sup-extension.md`'s
   asymptotic prose at lines 485-486 and 508-516 (2^{π(z)} moduli; a
   C^{π(z)} theorem as the reachable end) cannot hold at fixed s; its
   verdict does (`verify-0830-usup-convention.md` §3).

4. **PROVEN, a reduction.** REC needs proving only for moduli in
   (z^{u₀ − δ}, z^{2s}]; the rest is ℓ¹-controlled below HM − 1 for large z.
   At (4, 0.5) the controlled part reads 0.3948–0.5346 of HM − 1 over
   z = 19..37, rising (S3). The reduced arrow is a bound on the signed count
   of large-modulus lattice hits in every window, with no instrument.

5. **NEGATIVE, each at a named place.** Term-by-term accounting dies at the
   term count (4.1); position-union and hypercontractive routes die at the
   atom √p and the union price e^{θ/q} (4.2); window smoothing and the P(y)
   lever move 0–27% and 1.7–32% of CAP at computable z and no exponent
   (4.3, S3, S4); B is not where the exponent is lost (4.4); the
   smooth-profile form is disconnected from the consumer at both ends and
   priced at 5.0907 even if granted (4.5).

6. **MEASURED: proof gap, not truth gap, at every computable z.** Certified
   margin F = (HM − 1)/(2 sup|ρ̃|) at u₀ = 4: 2.819e+2, 6.290e+2, 4.803e+2,
   5.035e+2 at z = 19, 29, 31, 37 (log_z F 1.9160 → 1.7230); at u₀ = 3.0:
   1.478e+1 → 1.360e+1 (log_z F 0.9148 → 0.7228). The truth's slope 2.7660 ±
   0.2120 sits 1.10 se under u₀ = 3.0 and 5.82 se under u₀ = 4.0 (S5); the
   F4 envelope's slope is 2.5111 ± 0.1775 on the same points. Seven points
   under one octave; asymptotically undecided, with the u₀ = 3.0 form the
   one the data could yet refute.

7. **UNCHANGED.** RML(α) open at every α; no exponent moved; the item's
   named riders ("Lemma V re-enters as ASK not import; fixed-smooth-profile
   binds") stand, and §4.5 says why the second is not a property of the
   working point.

## 8. Not reached

- sup|R_H| walked directly at H = z^{u₀} (the factor 2 in |R_H| ≤ 2 sup|ρ̃|
  stands in; at most 2× conservative).
- Any exact point at z ≥ 41 (period 7.4e12; above the four-hour rule).
- ⟨ρ̃⁴⟩, the named stopping object of `attack-rhoms-01.md` §3; a
  sub-Gaussian fourth moment (measured m₄/m₂² = 2.32–2.92 there) would cut
  the union price to e^{θ/4}, which still diverges, so it was not pursued.
- The s-freedom: everything is s = 3.0. The cap's asymptote 2s says a
  smaller s is cheaper for the trivial accounting; whether REC is easier at
  s near 1 + √e was not measured.
- The u₀-dependence of the reduced arrow's mean square (the sub-lattice
  B_big ≤ 9A²(E−1) holds by the same proof, since dropping terms only lowers
  T(e); its measured size was not tabled).
- Re-pricing the Kloosterman imports at the ρ-configuration (carried over
  from `rho-maximal-law.md` §5 with its caveat).

*Gate: `node research/qc.js --full` result recorded in the closing report;
the producer's tail verifies under `qc/embed.js --check` (code-sha256
matches, out-sha256 matches, body bit-honest).*
