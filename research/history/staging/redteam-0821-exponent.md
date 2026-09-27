# Red team 0821: the two exponent-adjacent held headlines

<!-- ledger
id: Q-redteam-0821-exponent
status: ANSWERED
todo: none
question: Do attack-rhoms-01's exponent claim and attack-doubling-01's certificates survive independent re-derivation?
verdict: No numerical discrepancy anywhere in either target, every re-derived figure reproducing to the printed digit; the 3.5+o(1) cap survives the attack it was most likely to die to but is not an unconditional bound on G2, and two wordings that run ahead of their custody grades are WEAKENED.
-->

*2026-08-21, adversarial pass. Targets: `attack-rhoms-01.md` (the ⟨ρ̃²⟩
theorem + the 3.5+o(1) cap) and `attack-doubling-01.md` (C₂ table, Bridging
Lemma, closure refutations). Method: refuted-until-rederived; independent
re-derivation in own code (scratchpad `rt-rhoms-verify.js`,
`rt-doubling-verify.js`), own lattice construction, own walks, own OLS.
Grades: CONFIRMED / WEAKENED (corrected sentence) / REFUTED (counterexample).*

**Bottom line: no numerical discrepancy found anywhere in either target.
Every figure I re-derived — from an independently constructed lattice and
independently coded walks — reproduces to the printed digit. The 3.5+o(1)
claim survives the specific attack it was most likely to die to (a hidden
e^{θ/3}); what it is NOT is an unconditional bound on G₂, and the two
places where the report's wording runs a half-step ahead of its own
custody grades are recorded below as WEAKENED riders.**

## 1. Target 1 — attack-rhoms-01 (the exponent claim)

### 1.0 The headline verdict on "3.5+o(1)"

The headline decomposes into three claims of different logical strength,
and the report's fine print keeps them apart correctly:

1. **⟨ρ̃²⟩ ≤ C z^{2s} ln⁸z unconditionally (rms ≤ z^{3+o(1)}) —
   CONFIRMED.** All three proofs re-derived independently (§1.1, §1.3);
   every verification chain holds on my own lattice.
2. **θ_G capped below β₂ at every measured z and at 3.5+o(1)
   asymptotically, unconditionally — CONFIRMED as arithmetic**, with the
   essential caveat stated plainly: θ_G is the bookkeeping exponent of the
   Gaussian FORM (2√(2·lnW·⟨ρ̃²⟩)/M). Capping it caps what F4 *would*
   deliver. It moves nothing unconditionally: **the two-class exponent
   4.2665 is NOT moved by this result.** The genuine unconditional content
   is λ_max = β₂ − θ_G ≥ 0.766 − o(1): the sufficiency curve's room can
   never close, so the route stays alive at every large z. The report
   itself never claims an unconditional G₂ bound; a hurried reader could
   take one from headline two, and the corrected reading is the above.
3. **F4 ⟹ G₂(z#) ≪ z^{3.5+ε} — CONFIRMED as a conditional implication**
   through the pricing lemma, with the mean-square factor now a theorem
   (see §1.4 for the one literature-grade link and the "no other
   hypothesis" rider).

**The suspected break — a θ/3 hidden inside the 3.5 — is not there.**
Checked by direct computation (own θ(z) by sieve): the F4 route's width
factor is √(2·lnW) = √(2θ(z)), whose base-z exponent is 0.559 at z = 47,
0.546 at 1009, 0.530 at 10⁵, → 1/2: polynomial, as claimed. The e^{θ/3}
factor lives ONLY in the R1 recovery, whose base-z exponent I get as 3.2
at z = 47, 46.1 at 1009, 2886 at 10⁵ — and the report itself declares R1
dead at z = 47 for exactly this reason. No quantifier laundering, no
finite-z calibration promoted to an asymptote: the finite-z window
(47, ~2767–3547] where only models cover the composition is stated in the
report rather than hidden.

### 1.1 MS3: the sine identity and its application — CONFIRMED

- **Identity re-derived**: Σ_{a=1}^{e−1} 1/(4 sin²(πa/e)) = (e²−1)/12 is
  the classical cosecant identity (Σ csc² = (e²−1)/3, quartered). My own
  check: hand-exact at e = 2, 3, 4, 6 (3/12, 8/12, 15/12, 35/12), worst
  rel 3.2e-15 over e = 2..40 and 2.2e-14 over e = 41..200.
- **Application sound, direction sound**: ⟨ρ̃²⟩ = Σ_e Σ*_a
  |Θ_e(a)|²/(4sin²(πa/e)) (spectral identity — verified on my own lattice
  at z = 13, 17 to rel ≤ 4.7e-13, with Θ_e(a) computed by my own direct
  phase sum); each |Θ_e(a)|² ≤ Θ*(e)², and extending the primitive-a sum
  to all a ≠ 0 only adds positive weights, so the identity gives
  Σ Θ*(e)²(e²−1)/12 ≤ Σ Vabs(e)²·e²/12 = B₂/12. Θ* ≤ Vabs held at every
  mode I computed (triangle inequality over the V(e₁,e₂) decomposition,
  which I rebuilt from my own d₁ bookkeeping). My B and B₂ from scratch:
  B = 1.3833 / 1.4214 and B₂/12 = 19.710 / 77.252 at z = 13 / 17 — the
  cited figures to the digit. B₂ ≤ qmax·B holds because every e divides
  some q_i. Chain verified end-to-end: 1.095 ≤ 3.340 ≤ 19.705 ≤ 19.710.

### 1.2 The cube-root recovery R1 and the W^{1/3} arithmetic — CONFIRMED

Re-derived from scratch: if S = sup|ρ̃| is attained and increments are
bounded by C_L (ρ(y+1) − ρ(y) = M − cc(y+1), an identity I verified at
0 violations over the full z = 13 period with my own cc), then on one
side of the peak |ρ̃| ≥ S − C_L·t for 0 ≤ t ≤ S/C_L, so
W·⟨ρ̃²⟩ ≥ Σ_t (S − C_L t)² ≥ S³/(3C_L) by integral comparison — the
stated sup ≤ (3 C_L W ⟨ρ̃²⟩)^{1/3}, with W the period (the correct
normalization: ⟨·⟩ is a period average, so W·⟨ρ̃²⟩ is the period total the
one-sided peak count is compared against). Numerically at z = 13:
W·ms = 2529.6 vs sup³/(3C_L) = 5.7 — holds with room. And the exponent
arithmetic is as the report says: W^{1/3} = e^{θ(z)/3} is superpolynomial
(θ/3lnz → ∞), so R1's composed exponent (2c + θ/lnz + log_z 3C_L)/3
diverges; the report prices R1 as a finite-z clearing at z ≤ 29 and a
certified failure at 37..47 — my recomputation agrees (§1.6). The
"proven finite-z clearing" language is earned: at z ≤ 29 every input
(C_L, ms, W, M) is exact and independently reproduced here.

### 1.3 MS1 and MS2 re-derived — CONFIRMED

Own lattice first: I rebuilt the certificate from the definitions only
(own Rosser support recursion, own CRT, three blocks (−,+),(+,−),(+,+),
gcd(d₁,d₂)|2, w = ε·μμ) and compared against the repo's `buildTerms`:
**term multisets IDENTICAL at z = 13, 17, 19, 23** (n = 852, 2236, 4764,
9636; M to 0 ulp). Everything below runs on MY lattice.

- **MS1**: |C_ij| ≤ (g²−1)/(12qq′) re-derived (max of |(g²−1)/12 −
  d̄(g−d̄)/2| over d̄ is at d̄ = 0 for g ≥ 2, since (g²+2)/24 ≤ (2g²−2)/24);
  max measured ratio 1.0000, never above. Closed-form pair sum matches my
  brute-force period walk at z = 13 to rel 2.8e-15, and matches the
  report's ms at 13..23 to all printed digits. Multiplicity cap: per
  block, ordered pairs with lcm q and gcd | 2 number τ(q) (odd q) or
  (3/2)τ(q) (even q) — re-derived; three blocks give (9/2)τ(q). GS and
  the assembled (81/4)z⁶P₄P₂² bound hold at 13..23 (GS matches to 5
  digits). The Mertens step Σ_{g≤qmax} 4^{ω(g)} ≤ qmax·Π(1+4/p) and
  qmax ≤ D² = z^{2s} both check.
- **MS2**: the H-average transfer re-derived: avg_{H≤K} 4sin²(πaH/e) =
  2 − 2Re[(1/K)Σe(aH/e)] ≥ 2 − e/(Ka′) ≥ 1 once K = qmax ≥ e (Dirichlet
  bound |Σ| ≤ 1/|sin(πa/e)| ≤ e/2a′, classical); per-mode violations 0 at
  z = 13, 17 in my own sweep; chain 1.095 ≤ 2.190 ≤ 1.598e3 (z = 13) and
  2.497 ≤ 4.993 ≤ 2.134e4 (z = 17) reproduced. Theorem A checked at its
  source (`attack-beta2-01-lemmaV-meansquare.md` §1: for every H, every z,
  every s) and spot-checked with my own spectral ⟨R_H²⟩: max ratio to B·H
  = 0.0258 over four H at z = 13. B = O(log⁸z) confirmed present as
  Theorem 1 of `attack-AB-bounded.md` §1.1 (statement checked; its proof
  internals not re-audited — see NOT REACHED).

### 1.4 The corollary chain to G₂ ≪ z^{3.5+ε} — CONFIRMED, one rider

The pricing lemma (`rho-maximal-law.md` §2) does NOT invoke Lemma V: its
chain is (i) the certificate identity T = HM + R_H (verified by
telescoping my increment identity, 0/2309 violations), (ii) |R_H| ≤
2 sup|ρ̃| (trivial), (iii) the choice of H, (iv) the vector-sieve
pointwise minorant cc(r) ≤ 1_{r rough}1_{r+2 rough} — **verified at all
2310/2310 positions of the z = 13 period with my own indicator** — and
(v) M ≥ c(s)/ln²z. So "F4 alone" is accurate against the corpus's own
ledger: F4 is the only unproven CORPUS object in the chain.

**WEAKENED (wording rider): "with no other hypothesis" should carry the
same grade its source carries for step (v).** M ≥ c(s)/ln²z at s = 3 >
1+√e is standard vector-sieve main-term positivity — literature-standard,
measured flat (M·ln²z = 0.34–0.37), but not a corpus-machine-verified
theorem. Corrected sentence: "F4 alone now implies G₂(z#) ≪ z^{3.5+ε},
with no other unproven hypothesis — the remaining links are proven
identities plus the standard linear-sieve asymptotic M ≍ 1/ln²z." The
same rider attaches to the asymptotic cap (its 2lnlnz/lnz term is 1/M).
Second fine-print item: headline two's "re-entering below permanently
after" — the window boundaries [23, ~2767–3547] are computed under the
MEASURED-B models (B = 1.5 / B-drift), the scan runs to z = 150000, and
under the proven B = O(ln⁸z) (explicit constant unknown) the re-entry
point is finite but not located. Reading 3's own grade ("exact at
z ≤ 47, crude-proven past re-entry, model-covered between") is the
correct statement; the word "permanently" in headline two inherits the
model constants. I reproduced the crude window myself: [23, 2767], peak
4.7391 at z = 31, to the digit.

### 1.5 The multiplicity lemma, both directions — CONFIRMED

Own counts on my own lattice at z = 13, 17, 19: max m(q)/((3/2)τ(q)) =
3.0000 exactly (at q = 330, 546, 714) — the orphan's (3/2)τ(q) lemma is
FALSE, refutation reproduced; max m(q)/((9/2)τ(q)) = 1.0000 — the
(9/2)τ(q) cap holds and is tight, and its derivation re-derives cleanly
(§1.3). Both directions land exactly as the report states.

### 1.6 The budget table, three rows recomputed — CONFIRMED

Rows z = 13, 29, 47 rebuilt with my own arithmetic (own lnW by sieve, own
M/ms/C_L/m₄/m₆ at 13 and 29 from my own full-period walks — the z = 29
walk is my own strided implementation over all 223092870 positions; at 47
the cited ms = 18.99742² and C_L ≥ 10.023 with Gaussian-model moments, as
the table's asterisk declares):

    z=13: budget 383.5, R1 consumed 0.266, M2 0.134, M3 0.047, k_min 1
    z=29: budget 1208.1, R1 consumed 0.688, M2 0.458, M3 0.256, k_min 2
    z=47: budget 963.4, R1 consumed 1.509 (R1 > smax), M2 1.077, M3 0.652, k_min 3

— all to the printed digit, including R1's certified failure at 47 and M3
clearing every row. The θ_G column and the cap column re-verify: my own
subset sweep at z = 29 and 47 gives B = 1.4660/1.5135, B₂/12 =
6.4627e2/1.5955e4, cap3 = 2.7323/2.9740 (−1.5342/−1.2924 against β₂) —
identical. The z = 29 walk also reproduces sup = 17.90249, m₄/m₂² =
2.918, m₆/m₂³ = 14.00, m₈/m₂⁴ = 93.5, C_L = 3.032: the sub-Gaussian
moment headline (reading 6) is independently re-measured at 13 and 29.

## 2. Target 2 — attack-doubling-01

### 2.1 The Bridging Lemma and three certificates — CONFIRMED

Lemma re-derived: level-2s slots satisfy the level-s admissibility
condition plus more, so they are a sub-pattern of the periodic level-s
slots; a level-2s gap therefore decomposes as k+1 consecutive level-s
gaps whose k interior slots are each killed by an entering prime (they
survive p ≤ P(s) but are not level-2s survivors), each gap ≤ Ĝ(s), and
the k killed slots form a consecutive killed run, so k ≤ K*. Hence
Ĝ(2s) ≤ (K*+1)Ĝ(s). Airtight, endpoints included (level-2s survivors are
level-s slots), cyclic wrap included. Certificates checked with my own
walker (direct kill-test sieve, not the fold recursion, not the report's
walk code) at three steps: 5#→11# K* = 3 (cert 4), 7#→19# K* = 8
(cert 9), 13#→23# K* = 8 (cert 9) — matching the published list — with
C₂ ≤ cert at each (3.50 ≤ 4, 5.00 ≤ 9, 3.0909 ≤ 9). The hand-checkable
first step (2#→3#: survivors ≡ 5 mod 6, window [5,11], kills 7 and 9 by
the entering 3, cert 3 = C₂) also re-derives.

### 2.2 The decomposition at three steps, own tile enumeration — CONFIRMED

At 5#→11#, 7#→19#, 13#→23# my walks reproduce every published field:
G₂ = 42@899(x4)/150@659(x20)/204@76166567(x4), alive = 135/378675/
7952175 (= Π(p−2)), k = 3/8/8. Decomposition closes to the digit at all
three (Σ spanned gaps = L, k+1 gaps), every bridged copy killed by an
entering prime only, strikes/multi = 3/0, 9/1, 8/0 — the single
multi-killed copy of the corpus claim (779 at 7#→19#, struck by 11 & 19)
sits exactly where reported. The record-anchoring refutation reproduces:
at 13#→23# the window's max spanned level-13 gap is 42 < Ĝ(13) = 66 and
NO copy of the level-13 record gap lies in the window — first-class
refutation of locate-over-the-old-record strategies, confirmed. kcap
(20/86/64) and θ (5.61/16.76/20.45) recompute to the digit.

### 2.3 The "kills every constant-factor sharpening" quantifier — CONFIRMED as scoped

The corollary's logic re-derived: the AP cap linearizes to
L ≤ Ĝ(s)(1+2#Q) + θL, which closes iff θ < 1; a constant discount c
closes iff cθ < 1, i.e. c < 1/θ; and θ = 2Ĝ(s)Σ_{q∈(s,2s]}1/q → ∞
because even the trivial Ĝ(s) ≥ s − O(1) (the [2, P(s)] block is dead)
gives θ ≳ 2s·ln2/lns. So the divergence — and with it the corollary —
is proven-grade. **The quantifier is correctly scoped in the text**: §3
says "proves any all-s C₂ *through this route*" and the producer says
"no constant-factor sharpening *of residue-density counting*". It kills
constant-factor discounts of the AP residue-density closure only — NOT
placement-structure routes, which the report itself names as the open
successor target. Anyone quoting the §0 headline ("takes every
constant-factor sharpening down with it") should carry the scope with it;
the body already does.

### 2.4 The K* drift regression — CONFIRMED, sensitivity recorded

Own OLS on the 11 (P(2s), K*+1) points: slope 0.6881 ± 0.1328, and C₂ on
the same points 0.2018 ± 0.1412 — identical to the report. The fit is
honest for what it claims: raw, no null, flagged as such, and "positive
at 1σ" is what the numbers say. The "~69" crossing is anchor-dependent:
last-point anchor gives 69 (what the script computes), the fitted
intercept gives 78, and slope ± 1σ moves it across 58–90. The report
brackets it as "illustration, not a claim", which is the right grade;
anyone promoting the 69 should not.

### 2.5 Two spot rows of the C₂ table — CONFIRMED (four rows)

From my own parse of the two ladder files (14 exact terms agree with
A144311+1 on all shared indices): s = 13 → 204/66 = 3.0909, s = 16 →
348/66 = 5.2727 (P(s) = 13, P(2s) = 31, both custody), s = 23 → 618/204
= 3.0294, s = 41 → 1710/546 = 3.1319. My own full-table sup/inf: 5.2727
at s = 16 / 2.0000 at s = 3 — sup on the chain, custody = trusted.
Landing arithmetic: log₂(348/66) = 2.3985, 2^4.26645 = 19.2455. The
discriminating statistic reproduces from my own fit: G₂-minus-POW slope
−0.0336 ± 0.0596. Note rows s ≥ 24 rest on the A144311 literature column
via the repo keeper (as the report itself flags); I did not re-verify
those terms against an external source.

## 3. NOT REACHED

- **Theorem A's and Theorem 1's proof internals** (`attack-beta2-01` §1,
  `attack-AB-bounded` §1.1): statements checked at source and spot-checked
  numerically here; the proofs themselves were not re-audited this pass.
- **The cited rmsr at z = 37..47** (ms inputs to the budget table's
  starred rows): custody-bound O(n²) computations (~2800 s at 47), taken
  as cited; my independent checks stop at the z = 29 full period and the
  z = 47 B/B₂/cap sweep.
- **The crude-window scan beyond my z ≤ 10⁴ reproduction** (the producer
  scans to 1.5·10⁵; I reproduced the window and peak, not the full tail).
- **The z = 31 walk** (same as the report's own NOT REACHED).
- **Doubling: the other eight enumerable steps** re-walked only via the
  report's own checks (my three-step sample all match); rows s ≥ 24
  against an external A144311 source; the `--force` re-embed's replaced
  block (tail says 0 of 195 figures changed; not independently diffed).
- **M ≥ c(s)/ln²z from the literature** (the §1.4 rider): not sourced to
  a specific vector-sieve reference this pass.

## 4. Gate

`node research/qc.js` after this report: TOTAL 2 — the two known
transient embed reds (`xchan-at37-01-census.js`, mid-flight census;
`attack-x-offset-02-profile.js`, mid-edit by the repair agent), both
pre-existing, neither naming either target or this file. `qc/embed.js
--check` on both producers: code-sha256 and out-sha256 match,
deterministic re-runs. Own scripts: scratchpad `rt-rhoms-verify.js`,
`rt-doubling-verify.js`, `rt-cap47.js` (session scratchpad, not part of
the corpus).
