# The QR refinement, preregistered and scored: the surplus test is void on its own matched control, the placement test holds, the immune classes deliver the guardrail's factor and nothing past it over 3.4 million twin openers, and as a certificate they are dominated by the restriction that ignores quadratic residues entirely

<!-- ledger
id: Q-z3-immune
status: CLOSED
todo: Z3 (retired)
question: Do the square anchor's immune offset classes (stretch-01 §4) carry a survivor surplus beyond the redistribution-only guardrail, do they attract the floor's first survivor, and does restricting the transplanted caps to them lower K*?
verdict: No, on all three. The preregistered surplus test is VOID on its own matched control (a 0.6% ratio-of-means bias present with and without the quadratic point); the preregistered placement test HOLDS at Z = +0.49; the design-free class test reads the guardrail's r/(r-2) over 3.4 million twin openers with a largest per-prime deviation of 0.11% and per-prime Z in -0.48..+1.66; and the restricted certificate, while lowering K* at 61% of anchors, has no certificate at all at 93 of 1219 and is beaten head to head by the QR-BLIND restriction that certifies 1219 of 1219. The refinement is closed.
-->

*(2026-08-28. Staging note; nothing here is integrated into a live document.
HELD. Producer: `research/attack-z3-immune-01.js`, formally embedded.
Executes TODO item Z3. Conventions are `stretch-01.md` §0's and
`attack-quadpoint-01.md`'s, restated in §0; the window is HALF-OPEN with
both members inside, a pair (a, a+2) lies in S_Q iff Q² ≤ a and a+2 < Q′²
(`quadpoint-identity-01.md`, load-bearing). Calibration marked per claim:
PROVEN, VERIFIED by exact computation, MEASURED, OPEN, REFUTED. **One gate
debt is knowingly left open:** the ledger block below names TODO item Z3,
and `TODO.md` Z3's `Ledger:` line does not yet list `Q-z3-immune`, which
`research/qc/questions.js` enforces. This session's fence forbids editing
any existing file, so that one-word addition to `TODO.md` Z3, and the
`REFUTED.md` row drafted in §5, are both owed and unapplied.)*

**THE GUARDRAIL, FIRST.** Route B (a density advantage at the anchor) is
CLOSED (`REFUTED.md`), and `stretch-01.md` §4 proves why from this side:
summing the kill incidence over the r offset classes gives exactly 2(r−1),
the generic ensemble mean 2/r. The QR structure redistributes kills over
offsets and removes none. Nothing below argues from density, and the test
registered in §1 is deliberately built to have the redistribution factor
as its NULL, not as its finding: a measurement that merely recovers
∏ r/(r−2) confirms the guardrail and buys nothing.

## 0. The objects, from the sources

Anchor a prime Q with successor Q′; the stretch is S_Q = [Q², Q′²) and the
opener offset is t = a − Q². Actives are the primes 7 ≤ r ≤ Q (freeze S1,
`stretch-01.md` §1). The QR kill law (`stretch-01.md` §4(i), PROVEN,
verified r = 7..31 at all prime anchors to 2000): inside S_Q, active r
kills the opener Q² + t iff t ≡ −α or −α−2 (mod r), with α = (Q mod r)² a
nonzero quadratic residue. Hence the **immune classes**

  I_r = { c mod r : neither −c nor −c−2 is a nonzero QR mod r },

killable by r at NO square anchor. Their sizes i_r = |I_r| for
r = 7..31 are 2, 3, 4, 4, 5, 6, 8, 8 (`stretch-01.js` SEC C1, reproduced
and asserted by this producer). The transplant's caps, K* and the floor
are `attack-quadpoint-01.js`'s: capU_K(r) counts candidates v = r·m in the
window with lpf(m) ≥ r passing the other-member freshness conditions of
the first K actives below r; floor_K = C − Σ_r capU_K(r); K*(Q) is the
least K with floor_K ≥ 1.

## 1. PREREGISTRATION — written 2026-08-28 12:51:41 CEST (2026-08-28T10:51:41Z), before the producer existed and before any number was computed

**The seal is UNSEALED and cannot be otherwise.** No git command may be run
in this session, so no commit can timestamp this block ahead of the
producer. The only custody here is the order of writing inside one session
and this paragraph saying so. Treat it as weaker than
`quadpoint-decade-prereg.md`'s commit seal, which was itself scored as
carrying a custody residual (`attack-quadpoint-02.md` §2).

### 1a. The one primary statistic, fixed here

r_max = 31; R\* = {7, 11, 13, 17, 19, 23, 29, 31}, the range over which
`stretch-01.js` verified the immune classes exhaustively. Anchors are
restricted to Q ≥ 37 so every r ∈ R\* is active and strictly below Q (at
r = Q the kill law degenerates to α = 0 and the QR statement does not
apply).

The **immune weight** of an opener offset t is

  ν(t) = ∏_{r ∈ R\*} f_r(t),  f_r(t) = r/(r−2) if (t mod r) ∈ I_r,
  else f_r(t) = [(r − i_r − 2)/(r − i_r)] · [r/(r−2)].

**The null factor, DERIVED here (this is the redistribution-only
prediction the test scores against, not 1).** Fix an anchor. Under CRT
independence across the actives, t mod r is uniform on r classes. Immunity
to r means the two killed classes cannot be hit, so survival of r is
certain: P(survive r | t mod r ∈ I_r) = 1 against the unconditional
(r−2)/r, a factor r/(r−2). The complementary conditioning is forced:
P(survive r | t mod r ∉ I_r) = (r − i_r − 2)/(r − i_r), a factor
[(r − i_r − 2)/(r − i_r)]·[r/(r−2)] ≤ 1. The guardrail then reads as an
exact identity,

  (i_r/r)·[r/(r−2)] + ((r−i_r)/r)·[(r−i_r−2)/(r−i_r)]·[r/(r−2)] = 1,

so E[f_r] = 1 on uniform t, for every r. That identity is the guardrail in
weight coordinates and the producer asserts it exactly. Numerically the
immune factors r/(r−2) are 1.400, 1.222, 1.182, 1.133, 1.118, 1.095,
1.074, 1.069, so an opener immune to all eight of R\* carries
ν = ∏ r/(r−2) ≈ 2.9; a fully non-immune opener carries ν ≈ 0.31.

**PRIMARY STATISTIC.** Per anchor Q, with openers O_Q (channel openers,
a ≡ 11, 17, 29 mod 30, both members in the half-open window) and twins
T_Q ⊆ O_Q:

  μ_Q = Σ_{t ∈ O_Q} ν(t)² / Σ_{t ∈ O_Q} ν(t)   (the ν-size-biased mean:
        the null expectation of the mean immune weight of a survivor, when
        survivors are drawn with probability ∝ ν, which is exactly the
        redistribution-only prediction)

  ρ_Q = ( mean_{t ∈ T_Q} ν(t) ) / μ_Q,   **D = mean_Q(ρ_Q) − 1**,
  s.e. = sd_Q(ρ_Q)/√n, n = #anchors with |T_Q| ≥ 1.

Per-anchor marginals are subtracted by construction: every anchor is
compared to its own opener population's ν distribution, never pooled raw
(the 113%-artefact rule). D is reported alongside its log form
ln mean(ρ), which is a readability restatement and carries no separate
verdict.

**KILL BAND.** D > 3 s.e. at Q ≤ 10007 AND mean(ρ) − 1 > 0 in each of
three disjoint anchor bands A = [37, 997], B = [1009, 3163],
C = [3167, 10007]. **REVERSED BAND.** D < −3 s.e. with the sign holding in
all three bands. **HOLD BAND.** |D| ≤ 3 s.e., or the band signs disagree.

**REGISTERED SECONDARY, no independent verdict.** The literal split form
of the TODO's wording: H = {t : n(t) ≥ 3}, where n(t) = #{r ∈ R\* :
(t mod r) ∈ I_r} is the immunity index (mean 2.159 by
Σ i_r/r). Λ2(Q) = ln[(T_H/C_H)/(T/C)] − ln[(Σ_H ν/C_H)/(Σ_O ν/C)], null 0,
same bands. Reported for agreement with the primary; it does not overturn
the primary.

**ESTIMATOR CALIBRATION, registered as a precondition.** μ_Q is the
with-replacement null mean; the realised survivor set is a subset of fixed
size, so the exact null mean can differ at order 1/C. Before the primary
is read, the producer runs a Monte Carlo on 12 spread anchors, 200
replicates each, drawing |T_Q| openers without replacement with inclusion
∝ ν (exponential race), and reports MC-mean(ρ) − 1. **Precondition:** if
|MC-mean(ρ) − 1| exceeds 1 s.e. of the primary, the primary is VOID and
only the MC-corrected form is read. (Campaign lesson: calibrate the
estimator before fitting.)

### 1b. The placement test

The floor's position: t\* = the smallest offset in T_Q, the first survivor
above Q². Per-anchor indicator X_Q = [n(t\*) ≥ 3], i.e. t\* lands in H.
Per-anchor null probability p_Q = Σ_{t ∈ H ∩ O_Q} ν(t) / Σ_{t ∈ O_Q} ν(t)
(the redistribution null's survivor-weighted share of H, not the raw
opener share). Pooled Poisson-binomial:

  Z = ( Σ_Q X_Q − Σ_Q p_Q ) / sqrt( Σ_Q p_Q (1 − p_Q) ).

**KILL BAND.** |Z| > 3 at Q ≤ 10007 AND the sign of (ΣX − Σp) holds in
each of the three bands A, B, C. **HOLD BAND.** |Z| ≤ 3, or the band signs
disagree.

### 1c. The matched control, which must read 0

Same code path, same statistic, on a NON-SQUARE anchor family: the window
W_Q = [Q² − w, Q²) with w = Q′² − Q² the treatment width, origin
N = Q² − w. Two properties make it matched rather than merely adjacent:
every composite below Q² has least prime factor below Q, so the active set
is the same {7..Q} and finality holds identically (survivors are exactly
the twin primes); and N is not a perfect square, so the kill classes
{−N, −N−2} mod r are unconstrained by the QR law. The producer asserts N
is not a square at every anchor.

Pseudo-immunity is drawn from the SAME class counts: for each (Q, r) a
seeded Fisher-Yates permutation of Z_r supplies the first i_r classes that
avoid the control window's own two kill classes, giving J_r with
|J_r| = i_r and J_r ∩ K_r(N) = ∅. Pseudo-immunity therefore implies
survival of r exactly as true immunity does, the f_r factors are
unchanged, and the same null applies. This is the treatment stripped of
QR-ness and nothing else.

**REGISTERED READING.** |D_ctrl| ≤ 3 s.e.(ctrl) and |Z_ctrl| ≤ 3. **If the
control does not read 0, both treatment verdicts are VOID** and the note
reports an instrument defect, not a finding.

### 1d. K\*: does immunity buy depth back

Restriction set A ⊆ {7, 11, 13} (larger A empties the subset: the immune
density ∏_{r ∈ R\*} i_r/r is 2.76·10⁻⁵, under one opener per window at
Q = 10007). M_A = openers with t mod r ∈ I_r for every r ∈ A; densities
∏ i_r/r are 0.2857, 0.0779, 0.0240. The restricted certificate is

  floor_K^A = C_A − Σ_{r active, r ∉ A} capU_K^A(r),

where capU_K^A(r) counts candidates v = r·m whose pair lies in M_A, with
lpf(m) ≥ r, passing the other-member conditions of the first K actives
below r EXCLUDING A (those conditions can never fire on M_A, so spending
pool slots on them is pure waste). K\*_A = least K with floor_K^A ≥ 1.

**Soundness, and exactly what would count.** Primes in A kill nothing in
M_A, so fresh_A(r) = 0 for r ∈ A; for r ∉ A the pigeonhole is the
transplant's verbatim, so floor_K^A ≥ 1 certifies a survivor in M_A, and a
survivor in M_A is a twin in S_Q. The restricted floor is therefore a
genuine occupancy certificate for the stretch, and **K\*_A < K\* at an
anchor WOULD be a real reduction of the depth cost**, not a subset
artefact. That is the win condition, and it is the only one: a smaller
K\*_A that came from a subset which did not itself certify would count for
nothing.

**REGISTERED EXPECTATION (a prediction, scored, not a band).** K\*_A ≥ K\*
at at least 90% of anchors, and the median of K\*_A − K\* is ≥ 0, because
the pigeonhole threshold "floor ≥ 1" is an absolute integer while the
restriction scales both C and the caps by roughly ∏ i_r/r. Falsified by
K\*_A < K\* at more than 10% of anchors. Reported: the full distribution of
K\*_A − K\* at Q ≤ 1499 and Q ≤ 10007, per A.

### 1e. Levels, and what is asserted

Levels: Q ≤ 1499 (the `attack-quadpoint-01.js` overlap, pool scan
uncapped, full-depth bijection asserted) and Q ≤ 10007 (pool scan capped
at KCAP = 64, per `attack-quadpoint-02.js`). The baseline K\* must
reproduce the v1 rows digit-exact or the run aborts. Whether a third level
runs is decided by measured runtime and stated in §2.


---

## 2. The run: levels, runtimes, and the two disclosed deviations

Producer `research/attack-z3-immune-01.js`, formally embedded
(`node research/qc/embed.js`, then `--check`: code-sha256 `679cbb81…`,
out-sha256 `a12703c6…`, 188 body lines, **31.6 s**, `--check` passes
bit-honest; two READINGS figures flagged by the advisory are the cited
9.0e15 and the hand anchor 173, both declared in the figure-provenance
block). Zero assertion failures.

**Levels.** Two, both stated in §1e and one added.
- **Registered level, Q ≤ 10007** (1219 anchors, Q = 37..10007). Everything
  runs here: the statistics, the matched control, the Monte Carlo null, and
  the certificate engine with its five variants. Q ≤ 1499 inside it (228
  anchors) runs with the pool scan uncapped and the full-depth bijection
  asserted for every variant; above it the scan is capped at KCAP = 64, per
  `attack-quadpoint-02.js`.
- **Extension, statistics only, Q ≤ 31607** (2171 further anchors,
  Q = 10009..31607; 2,984,289 further twin openers). Outside §1's bands, so
  it carries no preregistered verdict. The certificate engine is deliberately
  NOT run there: `attack-quadpoint-02.md` §2 forecasts the band max of
  K*/pool past KCAP = 64 at that level, so K* would be cap-bound and say
  nothing, and raising the cap costs more than the ten-minute rule allows.
- **The full decade Q ≈ 10⁵ did NOT run.** The sieved range grows as Q², so
  measured scaling from the 31.6 s at 31607 puts it near 19 minutes, past
  the rule; and hi ≈ 10¹⁰ breaks this producer's < 2³¹ width audit, which
  would have to be redone rather than reused.

**Calibration, all abort-on-mismatch [VERIFIED].** The immune class lists,
their sizes, the 2(r−1) kill incidence and the weight-coordinate identity
E[f_r] = 1 reproduce `stretch-01.js` SEC C1 digit-exact at r = 7..31. The QR
kill law itself re-verifies over the first 3000 positions of every window at
every anchor to Q = 1499, for r = 7, 11, 13, against direct divisibility. Immunity implies no kill at every checked opener. The
baseline certificate engine reproduces `attack-quadpoint-01.js` digit-exact
on 19 shown rows (width, C, T, pool, floor_0, K*), with an independently
coded T recount at every anchor of the whole run.

**Deviation D1, forced.** §1c's control origin N = Q² − w is a perfect
square at some anchors: at Q = 113, N = 9409 = 97², a PRIME square, which
carries the exact structure the control must not have. The producer steps N
down by 30 until it is not a square, keeping the width, the active set and
finality. One anchor of 1219 needed it.

**Deviation D2, and it is §1's own remedy firing.** The registered
estimator-calibration precondition FIRES. The analytic null μ_Q is the
with-replacement mean; the realised survivor set has fixed size, and the two
differ by **−0.00397** against one s.e. of **0.00093**. §1 said in that case
the analytic primary is VOID and only the MC-corrected form is read, so the
producer computes the exact without-replacement null (successive sampling
proportional to ν, as registered) at **every** anchor rather than the 12 §1
named, and SEC 4 scores the corrected statistic against §1's unchanged
bands. §1 anticipating this is the one thing the preregistration clearly
bought.

## 3. Scoring against §1 as written

### 3a. The surplus test: VOID, on its own matched control

**Lead with the disconfirming reading.** The matched control fails.

| statistic | treatment | control (non-square, pseudo-immune) |
|---|---|---|
| D, MC null (the form §1's remedy makes binding) | **+0.00623**, 6.50 s.e. | **+0.00577**, 6.63 s.e. |
| D, analytic null (VOID per §1) | +0.00220, 2.36 s.e. | +0.00180, 2.07 s.e. |

§1c's clause is explicit: *if the control does not read 0, both treatment
verdicts are VOID and the note reports an instrument defect, not a finding.*
|D_ctrl / s.e.| = 6.63 > 3. **PRIMARY VERDICT: VOID (control).**

What the defect is, stated flatly: the ratio-of-means statistic ρ carries a
common bias of about +0.6% under the registered sampling design, present
with the quadratic point and without it, in a control where no class is
QR-immune at all. The treatment's 6.50 s.e. is therefore not evidence of
anything about quadratic residues. The control earned its place; a note that
had run the treatment alone would have reported a 6.5-sigma surplus.

Registered secondary Λ2 agrees with the same reading: treatment +0.01006
(3.82 s.e.), control +0.00628 (2.18 s.e.), the same common drift.

### 3b. The placement test: HOLD, control clean

The first survivor above Q² lands in H = {n(t) ≥ 3} at **589 of 1219**
anchors against **580.50** expected under the redistribution null,
**Z = +0.49**. The control reads Z = +1.59, inside its own ±3 clause, so the
treatment verdict stands. §1's band condition also fails independently: the
treatment band signs are +, −, +. **PLACEMENT VERDICT: HOLD.**

Extended past the registered bands to Q = 31607 (no verdict attached):
1684 of 3390 against 1637.69, Z = +1.59, control Z = −0.72. The floor's
first survivor does not sit in the immune classes any more often than the
redistribution null puts it there.

### 3c. K\*: §1d's registered prediction is falsified as stated, and the family is still unusable

§1d predicted K\*_A ≥ K\* at ≥ 90% of anchors. **Measured, Q ≤ 10007: 0.388,
0.380, 0.373** for M{7}, M{7,11}, M{7,11,13}, with median differences
−1, −2, −3. The prediction is **FALSIFIED**: restricting to the immune
subset lowers K\* at about 61% of comparable anchors, and the reasoning
behind the prediction (an absolute pigeonhole threshold against a scaled
population) was wrong because it ignored the caps of the restricted primes
being dropped entirely.

That is not a win, for two reasons §1d did not anticipate and which are
reported here before the reduction:

- **The restricted certificate often does not exist.** The immune subset
  holds NO twin at **38** of 1219 anchors, where no depth certifies
  anything; **55** more run past the engine's KCAP = 64 unresolved. That is
  **93 of 1219 anchors with no certificate**, against a baseline that
  certifies all 1219 (mean K\* = 22.61). A certificate family is worth its
  worst anchor, and this one has no worst anchor because it has holes.
- **The one place it does help is the K = 0 end.** floor_0 ≥ 1 revives from
  2 anchors (baseline, Q = 37 and 43) to 9, 21 and **39** anchors under
  M{7}, M{7,11}, M{7,11,13}, the largest being Q = 2141. Real, measured, and
  small.

## 4. POST HOC — invented after the data, carrying NO verdict

Everything in this section was written after the numbers existed. It is
reported because the §3a defect leaves the actual question unanswered, and
because §3c's reduction has an obvious comparator §1 failed to register.

**4a. The design-free class test — the reading that survives.** The null
needs no sampling design: twin openers must equidistribute over the r − 2
classes mod r that this anchor does not kill, so the immune share of twins
is i_r/(r−2) against the openers' i_r/r — ratio r/(r−2), the redistribution
factor and nothing else. Pooled with per-anchor binomial expectations over
440,985 twin openers to Q = 10007 and 2,984,289 more to Q = 31607:

| r | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 |
|---|---|---|---|---|---|---|---|---|
| treatment Z | +1.66 | +0.20 | +0.93 | −0.48 | −0.38 | −0.19 | −0.34 | +0.38 |
| control Z | +0.76 | +0.24 | +0.79 | +1.86 | +1.29 | +0.56 | +1.06 | +2.39 |

Per-anchor dispersion runs 0.708 to 0.821 of binomial (under-dispersed, as
a fixed survivor total forces). The largest per-prime deviation from the
guardrail's factor is 0.11%, at r = 7; the immune classes deliver that
factor and deliver nothing past it. The restriction-set form
agrees: obs/exp = 1.0038, 1.0079, 1.0094 at Z = +2.05, +2.06, +1.42 for
M{7}, M{7,11}, M{7,11,13} at Q ≤ 10007. (The pooled 8-prime summary,
treatment Z = +0.69 against control Z = +3.12, is quoted in the producer
with the caveat that the eight tests share the same twins and it is not a
valid test.)

**4b. The QR-blind comparator, which dominates.** Take the same restricted
certificate but restrict to N{7,11,13} = openers this anchor's 7, 11 and 13
simply do not kill. Density ∏(1−2/r) = 0.4941 against the immune subset's
∏ i_r/r = 0.0240. No quadratic residue is used anywhere; the two classes
each small prime kills are read off directly. This is the exact-head-plus-
caps object whose use as a PROOF technique is CLOSED
(`attack-beta2-03-exact-strata.md`, infinite regress), standing here only as
the yardstick.

- N{7,11,13} certifies **1219 of 1219** anchors and lowers K\* at **1217**
  of them, mean change −2.98. M{7,11,13} certifies 1126.
- Head to head on the 1126 anchors where both certify: mean K\* **19.84**
  for the QR-blind restriction against **22.20** for the immune one. The
  immune one has the lower K\* at 527 of the 1126, so it is not uniformly
  worse; it is worse on average and it is the only one of the two that
  fails outright.

**4c. The registered primary differenced against its own control**, which
is where the common design bias cancels: treatment − control = **+0.00046
± 0.00127**, 0.36 s.e. (MC null); +0.00040 ± 0.00127 analytic. Consistent
with zero, and consistent with 4a.

## 5. What this buys: a clean negative, and the REFUTED row

TODO Z3's win condition was "the first use of the quadratic point's own
arithmetic in a certificate, or a clean negative closing that refinement."
It is the second.

- There is **no survivor surplus** beyond redistribution: the design-free
  test reads the guardrail's r/(r−2) across eight primes and 3.4 million
  twin openers with a largest deviation of 0.11%, and the matched control
  reads the same.
- There is **no concentration of the floor**: the preregistered placement
  test holds at Z = +0.49 with a clean control.
- There is **no usable certificate gain**. The immune restriction lowers K\*
  at 61% of anchors and revives the K = 0 certificate to Q = 2141, but it
  has no certificate at all at 93 of 1219 anchors, and the restriction that
  ignores quadratic residues entirely certifies every anchor and beats it
  head to head.

`stretch-01.md` §4's verdict — real structure, exactly bookkeeping — now
extends from the density to the CERTIFICATE. **TPC-strength calibration,
carried:** nothing here is asymptotic. No statement about all Q follows from
any of it; any all-Q occupancy claim remains the Stretch Postulate, which is
TPC-strength (`stretch-01.md` §2). Occupancy over this whole range was never
in doubt, being certified to 9.0e15 from adopted data (`stretch-01.md` §3).
Route B stays closed; ρ(2) stays adverse.

**Draft row for `REFUTED.md`**, in the table's format (NOT applied — this
note edits no existing file):

```
| the QR refinement of the anchored-cap transplant (immune offset classes in the caps) | CLOSED | the immune classes deliver exactly the guardrail's r/(r−2) and nothing past it (per-prime Z −0.48..+1.66 over 3.4M twin openers, matched control the same), and as a certificate they are dominated by simply naming the two classes each small prime kills, which certifies 1219/1219 anchors against the immune subset's 1126 | 2026-08-28 | `history/staging/attack-z3-immune-01.md` §3, §4; `research/attack-z3-immune-01.js` |
```

## 6. NOT REACHED

- The preregistered surplus statistic is **unresolved on its own terms**.
  Its verdict is VOID, not HOLD: the ratio-of-means estimator carries a
  ~0.6% design bias that swamps the effect size it was built to detect. The
  answer in §4a comes from a statistic invented after the data. A rerun
  would register the design-free class test as primary from the start.
- The certificate half stops at Q ≤ 10007. Above it KCAP = 64 binds and
  nothing is resolved either way at 55 anchors; the extension to 31607 is
  statistics only, and Q ≈ 10⁵ is out of reach at this width audit and this
  time budget.
- Only r ≤ 31 enters ν and the immunity index; the immune classes exist at
  every r, and nothing here tests whether a deeper R\* changes anything (the
  guardrail says it cannot, but that is a theorem about density, which is
  §3a's whole lesson).
- Restriction sets larger than {7, 11, 13} were not run: ∏ i_r/r over all of
  R\* is 2.76·10⁻⁵, under one opener per window at Q = 10007.
- The QR-blind comparator N{7,11,13} is measured here as a yardstick only.
  Whether pushing its head further (exact sieve by more small primes, caps
  on the tail) moves K\* usefully is a different question and is not asked;
  its use as a proof technique is already CLOSED.
- Nothing was done about the K\* > KCAP anchors, and no anchor above 10007
  has a certificate computed at all in this note.
