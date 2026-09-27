# The λ-weighted fold ledger: does parity information survive in it?

<!-- ledger
id: Q-lambda-ledger
status: CLOSED
todo: Z5b (retired)
question: Does parity information survive in the lambda-weighted fold ledger?
verdict: REJECT, against a pre-registered threshold fixed before the producer existed: the lambda multiplier exists and is parity-free, so the ledger is blind at its design point rather than at its margins; two columns are pinned by proof, and nothing here is novel mathematics.
-->

**Status: PRE-REGISTRATION WRITTEN 2026-08-26, BEFORE THE PRODUCER EXISTED.**
Sections 0 and 1 below were written and saved to disk before
`research/attack-lambda-ledger-01.js` was written or run. Everything from §2
down was appended after the run. The ordering is the point: the acceptance
threshold is not allowed to be chosen after seeing the numbers.

Producer: `research/attack-lambda-ledger-01.js` (embedded via
`node research/qc/embed.js`). Table it binds to: `research/fold-ledger-01.csv`
(extracted and asserted row-identical at runtime; nothing transcribed).

---

## 0. What is being asked, and what a win would and would not buy

The fold ledger (`research/fold-ledger-01.js`, TODO item Z5b) is parity-blind
by construction: it counts surviving pairs and nothing else. The parity
obstruction is precisely the statement that count-tracking cannot separate an
integer with an odd number of prime factors from one with an even number. So
the ledger, as built, cannot see the material the wall is made of
(`paper/wall-note.md` §1, Door 3: "parity survives all polynomial
certificates").

The move tested here: attach the Liouville weight. Instead of counting the
pairs (n, n+2) that survive to fold depth q, sum λ(n)λ(n+2) over them, with
λ(n) = (−1)^Ω(n).

**What a win buys, stated before the run.** Nothing is proven either way by
this. In the best case it identifies a channel in our own coordinates where
pair-parity information is visible and measurable — a prerequisite for any
parity-defeating argument, not an argument. In the likely case it confirms the
blindness, which is a clean negative worth recording: it tells future sessions
not to look for the wall's passage in the fold ledger.

**Prior-art posture.** Measuring λλ correlations at shift 2 is measuring
Chowla's conjecture, which is open. Nothing measured here is novel as
mathematics; the only thing that could be new-to-us is where the signal sits in
*our* frame. No novelty language is licensed by this document.

**Collision check against `research/REFUTED.md`.** Row 32, "any twin-specific
discrepancy law — REFUTED, the random-class control reproduces it"
(`discrepancy-two-class.md` §6), is adjacent but not identical: that row closes
*discrepancy* laws claimed as twin-specific. This attack is not proposing a
law; it is asking whether a weight carries information, and it carries row 32's
lesson as a mandatory control (§1, PREREG-2). Row 56 (fold-succession damping)
and row 83 (K as the M_p field mechanism) are the other fold-ledger-adjacent
closures; neither concerns a weight on the ledger. No collision. Proceeding.

---

## 1. PRE-REGISTRATION (fixed before the producer was written)

### 1.1 The statistic

Fix a fold stretch S_q = [q², q′²) — the ledger's own stretch definition,
extracted from `research/fold-ledger-01.js`, not re-invented. Fix a sieve depth
p ≤ q. Over the opener set (a with gcd(a,30) = gcd(a+h,30) = 1, a+h < q′²),
let

- N(p)   = #{pairs with both members p-rough},
- R(p)   = mean of λ(a)λ(a+h) over that surviving set,
- r_a(p) = mean of λ(a) over that same set, r_b(p) = mean of λ(a+h) over it,
- **Cov(p) = R(p) − r_a(p)·r_b(p)**.

Cov is the primary statistic: the covariance of the two Liouville values on the
surviving set. It is exactly zero when the two members' parities are
uncorrelated *given* the sieve condition, whatever the marginal bias the sieve
imposes. Subtracting r_a·r_b is what strips out the deterministic
Ω-composition effect, which is not parity information about pairs.

The per-fold multiplier question is answered in the same coordinates: the count
ledger's multiplier is m_N(p) = N(p)/N(p_prev) ≈ (1 − 2/p). The λ-weighted
multiplier is m_Λ(p) = Λ(p)/Λ(p_prev). The **parity-free prediction** for it is

  m̂_Λ(p) = m_N(p) · [r_a(p)r_b(p)] / [r_a(p_prev)r_b(p_prev)],

i.e. the multiplier that follows from counting plus the single-variable λ
marginals alone. m_Λ ≠ (1 − 2/p) is expected and is *not* evidence of anything;
m_Λ ≠ m̂_Λ beyond the noise floor is the only thing that would be.

### 1.2 The acceptance threshold

**ACCEPT "parity information is visible in the fold ledger" only if all three
of the following hold.**

- **PREREG-1 (size).** On the top band q ∈ [3167, 9973], at some sieve depth p
  in the sweep, |Cov(p)| ≥ **5 σ_rand(p)**, where σ_rand is the sample standard
  deviation of the identical statistic under the i.i.d. random-sign control (λ
  replaced by an independent ±1 attached to each integer, same pair set, same
  buckets, ≥ 8 trials).
- **PREREG-2 (twin-specificity).** AND that excess is not reproduced by the
  matched non-twin shift controls h ∈ {4, 6, 8}: require
  |Cov₂|/σ ≥ 2 · max_{h∈{4,6,8}} |Cov_h|/σ at the same depth. (Row 32's
  lesson, made a gate.)
- **PREREG-3 (stability).** AND the sign of Cov₂ agrees across all three
  disjoint sub-bands q ∈ [3167,4999], [5003,7499], [7507,9973], with
  |Cov₂|/σ ≥ 3 in each.

**REJECT** — record the clean negative, "the fold ledger is parity-blind" — if
any of PREREG-1..3 fails.

- **PREREG-4 (Chowla calibration, reported either way).** The unsifted λ-added
  column is a Chowla sum at shift 2; Chowla's conjecture predicts it is o(width).
  Report |Λ_added| / √added per band. If that ratio is O(1) — operationally
  ≤ 4 — the added column is *consistent with Chowla and uninformative*, and must
  be described that way, never as a signal.

### 1.3 What would falsify the negative

If the run rejects, the negative is falsifiable in one clean way: a later run at
larger q, or at a sieve depth outside this sweep, exhibiting Cov₂ passing all
three gates. The sweep's reach is recorded in §3 so a future session knows
exactly which depths were and were not looked at.

---

---

## 2. Verdict: REJECT. The disconfirming evidence, first

**The pre-registered pooled statistic passed PREREG-1 and it is not a signal.**
On the top band at depth p = 3163 the covariance reads Cov₂ = 0.0076, which is
6.03 σ against the random-sign control. That is over the threshold. It fails
everything that was set up to catch exactly this:

- **PREREG-2 fails.** At the same depth the matched non-twin shift h = 6 reads
  Cov₆ = 0.0082 at **13.10 σ**, and h = 4 and h = 8 read 6.51 σ and 6.11 σ. The
  twin shift is the *weakest* of the four. This is `REFUTED.md` row 32's failure
  mode reproduced exactly: the random-class control reproduces the twin reading.
- **PREREG-3 fails.** Split into the three disjoint sub-bands the same statistic
  reads 0.72, 0.66 and −0.80. The sign does not survive the split and no
  sub-band reaches even 1 σ, let alone the required 3.
- **The 6.03 is an aggregation artifact, and it is quantified.** A diagnostic
  added after the run (flagged as such, not re-scored) subtracts each fold's own
  marginals before pooling instead of pooling the marginals. At a fixed p the
  sieve parameter u = 2 ln q / ln p still runs across the band from 2.00 to
  2.28, so the pre-registered statistic carries a between-fold term. That term
  is **1.13 of the pooled reading, i.e. 113% of it**: the between-fold-free
  covariance at p = 3163 is Cov_w = −0.0010, at −0.76 σ, sign reversed and
  inside the noise.

**On the between-fold-free statistic the twin shift never leaves the noise
anywhere in the sweep: max |z| = 0.86** over 10 depths, against 2.72 for the
largest of 40 independent standard normals. The largest cell of all 40 is
3.29 σ at h = 6, p = 199, which is a non-twin shift and does not clear the
multiple-comparison scale either.

**PREREG-4.** The unsifted λ-added column reads |Λ_added|/√added of 0.54, 0.03,
0.75, 0.51, 0.64, 0.24 across the six bands, worst 0.75 against a threshold of
4. That column is **consistent with Chowla and uninformative**, and it is not
evidence about anything. Chowla at shift 2 is open; nothing here touches it.

**VERDICT: the fold ledger is parity-blind, on this evidence, at these sizes.**

---

## 3. The part that is not a measurement: two columns are pinned by proof

The measurement above is the weaker half of the result. The stronger half is
that the ledger's central column cannot carry parity information at all, for a
reason that needs no statistics.

**Pinning 1 (proven; asserted at all 1226 folds).** A pair surviving to its own
fold's depth lies wholly inside S_q = [q², q′²) and both members are q-rough. If
such a member were composite its smallest prime factor would be at least q′, so
the member would be at least q′², which it is not. So both members are prime,
Ω = 1, λ = −1, and λ(a)λ(a+h) = **+1 on the whole net column, at every fold, for
every even shift h**. Therefore

  **Λ_net(q) = net(q) exactly, at all 1226 folds.**

The producer asserts this per fold rather than reporting it, and separately
verifies the argument's premise directly: at q = 7, 11, 13, 101, 1009, 3167,
9973 it checks all 5648 surviving members and finds Ω exactly 1 in every case,
0 violations.

**Pinning 2 (proven; asserted at all 1226 folds).** A `by_new` kill has one
member equal to q·m with m q-rough and m < q′²/q < q², so m is prime and
Ω(q·m) = 2; and q cannot divide the partner as well, since q does not divide h,
so the partner is prime. Hence λλ = −1 on every such pair and

  **Λ_by_new(q) = −by_new(q) exactly, at all 1226 folds.**

**The reading.** The fold ledger's stretch geometry pins the sieve parameter at
u = log(q²)/log(q) = **2 exactly**. u = 2 is the one depth at which Ω is
determined outright on the survivor set, so the Liouville weight is a constant
there. Two of the ledger's six columns are constants under the weight by proof.
The parity problem is not merely invisible to this ledger, it is *vacuous* on
the ledger's own design point, and that is a property of the stretch definition,
not of the sample size. It also holds for h = 4, 6 and 8, so it is not a
twin-specific fact.

This is the sharpest thing the attack produced, and it is negative.

---

## 4. The λ-weighted ledger, every column

Each count column of `fold-ledger-01.csv` beside its λ-weighted analogue, from
`research/attack-lambda-ledger-01.js` SEC 2. The count columns are asserted
row-identical against the committed CSV, parsed at runtime.

| band | added | Λ_added | removed | Λ_removed | by_new | Λ_by_new | by_old | Λ_by_old | net | Λ_net | cc | Λ_cc |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [7,31] | 124 | −6 | 84 | −46 | 4 | −4 | 80 | −42 | 40 | 40 | 17 | 11 |
| [37,97] | 869 | −1 | 705 | −165 | 3 | −3 | 702 | −162 | 164 | 164 | 264 | 110 |
| [101,313] | 8,989 | −71 | 7,972 | −1,088 | 18 | −18 | 7,954 | −1,070 | 1,017 | 1,017 | 3,738 | 878 |
| [317,997] | 91,656 | −154 | 84,570 | −7,240 | 29 | −29 | 84,541 | −7,211 | 7,086 | 7,086 | 46,123 | 6,675 |
| [1009,3163] | 900,902 | 612 | 850,075 | −50,215 | 71 | −71 | 850,004 | −50,144 | 50,827 | 50,827 | 511,932 | 49,494 |
| [3167,9973] | 9,010,234 | −726 | 8,628,503 | −382,457 | 202 | −202 | 8,628,301 | −382,255 | 381,731 | 381,731 | 5,565,304 | 380,576 |
| TOTAL | 10,012,774 | −346 | 9,571,909 | −441,211 | 327 | −327 | 9,571,582 | −440,884 | 440,865 | 440,865 | 6,127,378 | 437,744 |

Reading the table: the net column repeats itself under the weight (Pinning 1),
the by_new column repeats itself negated (Pinning 2), the added column is a
Chowla sum sitting at 0.24 to 0.75 of its own √N, and the only columns with
non-trivial λ content are removed / by_old / cc, which are just added minus a
pinned quantity and therefore carry no information the added column does not.

---

## 5. The decisive question, answered: the λ multiplier exists and is parity-free

The count ledger's per-fold multiplier is m_N(p) = N(p)/N(p_prev), and it tracks
(1 − 2/p) closely: 0.9130 vs 0.9130 at p = 23, 0.9792 vs 0.9794 at p = 97,
0.9990 vs 0.9994 at p = 3163.

The λ-weighted sum **does** have a per-fold multiplier and it is **not**
(1 − 2/p). That is not a finding. The whole of the difference is the
single-variable λ marginal, which is deterministic sieve bookkeeping and not
pair-parity information. Comparing the raw multiplier m_Λ against the
parity-free prediction m̂_Λ = m_N · (r_a r_b)(p)/(r_a r_b)(p_prev):

| p | u_eff | N(p) | m_N | 1 − 2/p | R_pair | r_a | r_b | m_Λ | m̂_Λ | m_Λ / m̂_Λ |
|---|---|---|---|---|---|---|---|---|---|---|
| 401 | 2.91 | 1,037,971 | 0.9954 | 0.9950 | 0.0460 | −0.2127 | −0.2129 | 1.0228 | 1.0210 | 1.002 |
| 797 | 2.61 | 842,873 | 0.9973 | 0.9975 | 0.1209 | −0.3452 | −0.3455 | 1.0087 | 1.0077 | 1.001 |
| 1601 | 2.37 | 668,080 | 0.9984 | 0.9988 | 0.2650 | −0.5104 | −0.5102 | 1.0030 | 1.0031 | 1.000 |
| 3163 | 2.17 | 523,646 | 0.9990 | 0.9994 | 0.5052 | −0.7054 | −0.7054 | 1.0014 | 1.0014 | 1.000 |

At shallower depths (p ≤ 199, u ≥ 3.30) Λ itself sits at the noise floor, so
m_Λ is a ratio of two noise values and the ratio column there is not
interpretable; those rows are in the producer's SEC 4 and are not quoted as
readings.

So the answer to the pre-registered decisive question is: **the multiplier
differs from (1 − 2/p), and the difference is reproduced to 1.000–1.002 by a
prediction containing no pair information.** What is left over after that
prediction is the covariance of §2, and it is noise.

---

## 6. Controls, and the aggregation defect the controls caught

**(a) Random-sign control, validated.** λ replaced by an independent ±1 attached
to each integer, 32 trials, same pair set, same buckets. Its measured σ sits at
0.82 to 1.04 of the 1/√N floor across the sweep, with ~13% estimator noise from
32 trials and the depths nested (so the ratios move together rather than
independently). An earlier mixer failed this check, reading 1.69 at the
shallowest depth; the producer carries the murmur3 finalizer that passes it, and
the ratio column is the standing check.

**(b) Matched non-twin shifts h = 4, 6, 8.** Same stretches, same buckets, same
opener rule generalised. At every depth in the sweep the twin shift is
indistinguishable from the others, and at the depth where the pooled statistic
peaks the twin shift is the smallest of the four. `REFUTED.md` row 32 predicted
this outcome and it happened.

**(c) The between-fold diagnostic.** Not pre-registered; added after the run and
labelled as such throughout. It is the mechanism for the whole of the pooled
6.03 σ and it is the methodological carry-forward from this attack: **at a fixed
sieve depth, folds in one band do not share a sieve parameter, so pooling their
marginals manufactures covariance.** Any future test on this ledger that pools
folds at a fixed p must subtract per-fold marginals first or it will find a
signal that is not there.

---

## 7. What this closes, what it does not, and the falsifier

**Closed by proof, not by data.** The λ weight is a constant on the fold
ledger's net and by_new columns, at every fold, for every even shift, because
the stretch definition pins u = 2. Attaching the Liouville function to the fold
ledger cannot produce pair-parity information about the columns the ledger
exists to track. Future sessions should not look for the wall's passage in the
fold ledger, and should not spend time re-attaching parity weights to it.

**Closed by measurement, at this size only.** Off the ledger's own depth, in the
sweep p = 7..3163 over q ∈ [3167, 9973] (u from 2.00 to 9.46, N from 523,646 to
6,435,923 pairs, 40 depth × shift cells), the pair covariance never leaves the
noise floor at the twin shift, max |z| = 0.86.

**Not closed.** Nothing here says anything about Chowla, about parity in
general, or about any other object in the programme. The λ weight was tested
against *this* ledger, not against the tile, the census, the capture identity or
the Z₂ window. A parity-visible channel may well exist elsewhere in the frame;
this says it is not here.

**What would falsify the negative.** A run at larger q, or at a sieve depth
outside p = 7..3163, exhibiting a between-fold-free Cov₂ that clears all three
gates. The pinning results are not falsifiable by computation at all; they would
need an error in the two-line arguments in §3, which are stated in full there
and asserted mechanically at 1226 folds each.

**Candidate `REFUTED.md` row** (for the orchestrator to place or not; this
document does not edit the index):

> | the λ-weighted fold ledger as a parity-visible channel | CLOSED | the stretch pins u = 2, so every survivor is prime and λ is a constant on the net column (and −1 on by_new) by proof at all 1226 folds; off-depth the pair covariance stays at max 0.86 σ while the h = 6 control reaches 13.10 σ at the twin shift's own peak | 2026-08-26 | `history/staging/attack-lambda-ledger.md`; `research/attack-lambda-ledger-01.js` |

**Adjacent work in the same tree, not read into this document.** Other
parity-side producers were present uncommitted alongside this one when it ran
(an LP adversary on the same stretches, and a rough-pair census error probe).
Their paths are deliberately not written here, so that their own
`qc.js scripts` citation flags stay live until their records land. No claim in
this document depends on any of them.

**Prior art.** Nothing in this document is novel mathematics. That λ is constant
on the survivors of a u = 2 sieve is immediate from the standard fact that a
z-rough number below z² is prime; that measuring λλ at shift 2 is measuring
Chowla is textbook. The only new-to-us content is *where in our own coordinates*
the blindness sits, and that it sits at the design point rather than at the
margins.

