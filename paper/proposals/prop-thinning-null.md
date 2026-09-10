# Proposal: the thinning null, the Fold Moment Identity, and the extinction law

**Grade: WEAKENED** · last regraded 2026-08-20 (amplitude-derivation trigger scored, §5; grade held) · registry: [PROPOSALS.md](PROPOSALS.md)

*Staging-layer throughout. The thinning record says of itself that it is a
proposal and that nothing in it is integrated into a live document. Only the
extinction law reached the live layer, through the fold-L wave synthesis.*

## 1. Claim

**A null model that is exactly solvable.** Delete points of the comb
independently and the gaps merge, and the number of old intervals swallowed is
geometric, so the generating function of the new gap follows a Möbius
transformation that fixes 0 and 1. Reparameterised, those maps form a
one-parameter multiplicative group, so the whole fold ladder collapses to a
single map whose parameter is α(x) = ∏ q/(q−2) = m̄/6, the mean gap in comb
units. The group law is PROVEN in two lines and VERIFIED to 3.7e−16 over 36
triples. The consequence is the null law itself: under independent thinning the
gap word of T_x is exactly geometric with ratio 1 − 6/m̄ at every rung, with no
error term and no limit, VERIFIED to 1.0e−14 against a brute-force recursion at
folds 5 through 29. The name is a collision hazard and a draft has to defuse it
in its first paragraph: this Möbius map has nothing to do with the arithmetic
Möbius function that appears elsewhere in the corpus.

**An exact identity for the real fold.** (p−2)Φ_new = (p−4)Φ + Ω + 2Ψ + Δ,
where Φ is the exponential moment of the gap, Ψ the adjacent-pair moment, Ω the
qualifying-gap weight, and Δ collects kill runs of length two or more. PROVEN
from the Merge Rate and Consumption Identities, themselves PROVEN and verified
exactly at nine folds, and VERIFIED at 7 folds against 4 values of λ. There is
no error term. Set beside the null's expansion, which carries Φ² exactly where
the fold carries Ψ, this says the entire first-order deviation of CRT thinning
from independent thinning is Ψ − Φ². So H″ at m = 2 is the adjacent-pair
correlation, as an identity rather than as a model. Δ is second order, measured
below four parts in a thousand of the total at every fold checked.

**A constant that was derived and then met the fit.** The null forces
c_null = (m̄/6)·ln(1/(1 − 6/m̄)), which falls from 1.527151 at fold 7 toward 1 as
the thinning fixed point. Refitted the way the record fits, by least squares in
the log over folds p ≥ 100, it reads 1.0577 against the record's own blind
Poisson maximum-likelihood value of 1.0818 ± 0.0317. A gap of 2.2%, with zero
free parameters, and the prediction was written to disk by a prediction-only
run before any measurement. The same null misses the amplitude by a factor of
about two, and that mismatch is part of the claim rather than a footnote.

**A rate law that survived an out-of-sample test.** One law,
E[X_p] = kills(Y,p)·A·exp(−c·θ_p/m̄), with a single amplitude and exponent
calibrated at one window and extrapolated to others only through the window
length inside the kill count. Tested at **four** further windows against
pre-registered bands and a pre-registered kill criterion: CONFIRMED on every
criterion, with the last fold carrying a run of length two or more running
**181 → 331 → 421 → 457 → 631 across five windows and four decades of Y**,
strictly increasing, the fifth window run blind at W = 2·10¹¹ and landing inside
its sealed band [571, 877]. MEASURED. **Two clauses of the law are now known to
fail and belong in the statement of it** (forty-sixth pass,
`research/history/staging/foldL-window5.md`): the per-fold ±3√λ clause holds at
only **43.2%** against 90% — resolved 2026-08-20: the per-fold dispersion is
Poisson around a deterministic fold-factor field M_p that the smooth law
misses, blind-validated 33/37 at a fresh pre-registered anchor (§5's
2026-08-20 scoring) — and the count runs systematically **~20% high at five
of five windows** (0.75–0.87), which is now carried IN the law as a known
overprediction rather than treated as scatter; the ~20% is the
exposure-weighted mean of M over the scored folds. The one-parameter version of the
same shape is REFUTED as a fitting model, because two calibrations of it
disagree by 60%.

## 2. Status grade

WEAKENED, by found prior art, hours after filing. The exactly-geometric null
is **Hawkins' random sieve**: Neudecker and Williams (Compositio Math. 29
(1974) 197–200) give
P(p_{n+1} − p_n = j | F_n) = (1/m_n)(1 − 1/m_n)^{j−1}, gaps exactly geometric
at every stage, verified in the published survey Rivoal, J. Théor. Nombres
Bordeaux 20 (2008) 799–809, pp. 800–801. The composition of thinnings is the
**composition semigroup of probability generating functions**, Bunge, Ann.
Probab. 24 (1996) 1476–1489, with the geometric case as the worked example.
The sentence that died is this proposal's own headline, "an exactly solvable
null for an object that had none": the object had one, since 1957, under a
name this corpus mentioned zero times. What was searched in that convention
and NOT FOUND (`research/history/staging/proposals-prior-art.md`, with the
`SEARCH-CONVENTIONS.md` §1 rows added the same day): the Fold Moment Identity
and the Ψ − Φ² reading of the first-order deviation. Whether the Hawkins
literature itself carries a two-class variant is UNCHECKED — it was reached
only through Rivoal's survey — and that check decides what a draft could
still claim.

The ceiling beneath the regrade is unchanged, and the record states it in one
sentence:
the measurements are evidence for the Zone Postulate, and they are not a route
to it. The induction the Fold Moment Identity invites turns an m = 2 hypothesis
at every level into an m = 1 conclusion at the top, which is the Zone Postulate,
which is the target. That is the third independent wrong-direction arrival in
this corpus and it is CLOSED in `research/OUTCOMES.md` together with the monotone
coupling route, which dies because the merge event is a function of the gap
value and is mutually singular with every solvable variant.

What is left after both concessions is why the grade is WEAKENED rather than
RETIRED: an identity with no error term that names the exact first-order
deviation, a rate law that made blind predictions at three windows and hit
them, and the null itself, demoted from a discovery to a citation carrying a
two-class instantiation. What it is not is progress on H″, and the record says
so in its own summary.

## 3. Evidence

| what | where |
|---|---|
| the null, the group law, the derived constant, the domination measurements | `research/history/staging/import-thinning.md` |
| the Merge Rate and Consumption Identities, the ledger, the extinction rule | `research/history/staging/attack-foldL-04-amortized.md` |
| the rate law, the pre-registration, the four windows, the verdict | `research/history/staging/attack-foldL-06-scaling.md` |
| the closed routes, one line each | `research/OUTCOMES.md` |
| the null model and the prediction-only stage | `research/import-thinning-01-nullmodel.js` |
| coalescence | `research/import-thinning-02-coalescence.js` |
| deep folds | `research/import-thinning-03-deepfolds.js` |
| the genealogy ledger | `research/attack-foldL-04-genealogy.js` |
| the localized window instrument | `research/attack-foldL-04-localized.js` |
| the scaling test across five windows | `research/attack-foldL-06-scaling.js` |

Every producer is formally embedded. The extinction fold at the smallest window
is in the regression net of `research/audit-numbers.js`, so it is checked on
every full gate run rather than only when someone rereads the record.

Two corrections from the scaling record travel with the ledger and must be
carried if it is ever integrated: the per-decade effective exponents are biased
low by a Jensen effect, and the crossing figure at the extinction fold was
rounded up in the earlier record. Neither changes a conclusion.

The near-miss that record documents is worth keeping in any draft's methods
note, because it is the kind of bug that produces clean-looking wrong numbers:
an offset run was anchored at a value not divisible by 6, so the walk visited
multiples of 3 rather than twin slots, and nothing it printed looked wrong. The
engine now refuses a bad anchor.

## 4. Prior-art risk

**The literature attributions in the thinning record are written from memory,
and the record says so in bold.** Three of them carry the classical thinning
identity: Daley and Vere-Jones on thinning a renewal process, Feller volume II
on the compound-geometric tail, and Embrechts, Klüppelberg and Mikosch on the
Cramér-Lundberg exponent. No copy of any of the three is on disk and no chapter
or section number is given, because none was checked. A fourth citation, Pyke's
spacings paper in JRSS-B 27 (1965) 395–449, carries volume, year and pages and
therefore looks verified, but no verification is recorded anywhere. It is
load-bearing for the claim about which solvable model is nearest, so treat it as
equally unchecked. The exactly-geometric null itself is self-contained and does
not rest on any of the four.

**The search has now been run, and it found the owner.** The 2026-08-19
officer pass identified the convention — Hawkins' random sieve for the null,
the composition semigroup of probability generating functions for the group
law — wrote both rows into `research/SEARCH-CONVENTIONS.md` §1, and confirmed
the record's own prediction that the derivation was more likely known than
not: known since 1957. The remaining exposure named here — the unopened
primary literature — was closed the same night: six papers read at source,
no two-class variant, no fold-side identity, and the new ownership facts
recorded in §5 (`research/history/staging/hawkins-read.md`). The record's old
posture stands vindicated rather than retired: nothing here may be written as
new, and the gate would reject it if it were, since the `search-convention`
check rejects an absence claim that does not name the convention it searched,
and it fired on 75 paragraphs the
day it went live.

**The identity's side is different.** The Merge Rate and Consumption Identities
are about the fold, which is Holt and Rudd's object under
`research/PRIOR-ART.md`'s correspondence, so any draft attributes the fold and
the closure before stating anything about moments over it.

The standing assumption in this registry is that prior art exists for more of
the corpus than has been found, and that the burden is on us to look again.

## 5. Upgrade and downgrade triggers

**Upgrade to QUICK-DRAFT** if the domination that the induction would need is
proven at even one cell rather than measured at 52. That is the single step
between a set of exact identities and an argument.

**Upgrade to QUICK-DRAFT** if the amplitude is derived rather than fitted. The
null forces an amplitude and misses the measured one by a factor of about two;
closing that would turn the 2.2% agreement from a coincidence charge into a
prediction, and it is the sharpest objection the record raises against itself.

**Scored 2026-08-20, thirty-seventh pass, and the grade does not move — because
this trigger names two different amplitudes and only one of them was derived**
(`research/history/staging/import-stein.md`). **What happened:** the extinction
law's amplitude `A` in `E[X_p] = kills(Y,p)·A·exp(−c·θ_p/m̄)` IS now derived. The
Arratia–Goldstein–Gordon first moment, which counts the window's actual
qualifying gaps instead of modelling the gap word, gives **A = 2.2091e−2 against
the record's fitted 2.4312e−2** — a factor 0.909, inside the pre-registered 1.5 —
with **c = 1.0701 against the fitted 1.0818 ± 0.0317, 0.37σ low** and inside the
pre-registered [0.987, 1.177]. At `Y = 2·10¹⁰`, where the record's error bar is
three times tighter, the derived pair lands at a factor 1.007 on `A` and 0.36σ on
`c`. It beats the geometric null on both coordinates. So
`attack-foldL-06-scaling.md` §7's "A is fitted, not derived" is answered, and the
first sentence of this trigger, read on its own, is satisfied.

**Why the grade stays WEAKENED anyway.** The trigger's second sentence names
*the null's* amplitude — "the null forces an amplitude and misses the measured
one by a factor of about two" — and that miss is **not closed**: the geometric
null still gives `A = 4.7843e−2`, a factor **1.97 high**, exactly as before. The
number that moved came from a different instrument, the AGG first moment, not
from repairing the null. The trigger's object is therefore ambiguous between the
law's `A` and the null's `A`, and it is scored narrowly: the derivation that
fired is not the one whose closure the trigger says would "turn the 2.2%
agreement from a coincidence charge into a prediction", so the sharpest objection
the record raises against itself still stands and the grade stays **WEAKENED**.
A draft that wants this upgrade must either close the null's factor of two or
rewrite the trigger to name the AGG route it actually got.

**Resolved against, 2026-08-19.** The pre-registered upgrade above it — a
convention row written into `research/SEARCH-CONVENTIONS.md` §1, searched, and
the composed null not found — fired in the other direction: the rows were
written and the null was found (Hawkins 1957, Neudecker–Williams 1974, Bunge
1996). That event is what moved the grade to WEAKENED.

**Checked against the primaries, 2026-08-19 late** (six papers read at
source, `research/history/staging/hawkins-read.md`): no two-class or
k-residue variant exists anywhere in the tradition — the decisive check §4
named is now run, and it is clean. New concessions absorbed with it: the
moment-recursion TECHNIQUE is the tradition's own (Wunderlich 1974 eq. (5),
Lorch 2007 Lem. 3.3, Bui–Keating eqs. (4)/(7)); a joint-minus-product
expansion already exists for the null itself (Bui–Keating p. 2); the
two-class rate p(n) = 2/n sits inside Lorch's published general-rate family;
the random-sieve twin conjecture is a THEOREM since 1974 (Wunderlich Thm 4,
no singular series); and the null's maximal gap is OWNED — Neudecker 1975,
lim sup gap/log²p = 1 a.s. (second-hand via Rivoal p. 808). What survives
sharpened: Ψ − Φ² answers a question the tradition asks out loud and answers
only as constants (Bui–Keating p. 2; Neudecker–Williams p. 199's
"tantalising" e^γ), and the fold-side identity remains ours.

**The Neudecker trigger was scored the same night and does NOT fire**
(`research/history/staging/null-limsup.md`, prereg committed alone). The law
does not transfer as a constant on log²p — in Hawkins' sieve log p is
simultaneously the mean gap and ln N, so the transferable content is
"maximal gap ≈ mean gap × ln(number of points), constant 1", and forced back
onto ln²p for the two-class rate the constant is e^{2γ}/(2C₂) = 2.402607.
All three pre-registered criteria pass (exact law vs Gumbel to 0.2%; the
Hawkins-rate reduction returns constant 1; coupled simulation z = +0.56 and
−0.36). A literal constant-1 reading would have predicted 53.5 against real
record gaps near 2000 and wrongly retired a sound half. Riders: the real
fold's G₂ sits at 0.83–1.02 of the null's maximal gap, below at 3 of 4
windows (the safe direction); the null's own ceiling spread (~90–105 in p
over 1400 windows) independently confirms the scaling record's 72-in-p
caution. The grade stays WEAKENED — none of this is progress on H″.

**The fifth-window trigger was scored 2026-08-19 night and does NOT fire —
the law HIT one decade blind** (`research/history/staging/foldL-window5.md`,
prereg committed alone at `4391c2c`): at W = 2·10¹¹ the last multi-kill fold
measured 631 against the pre-registered band [571, 877], the sequence
181 → 331 → 421 → 457 → 631 holds, and both counts land in band. The
consequences were fixed in advance and apply mechanically: support now spans
five windows and four decades, still MEASURED; the hot systematic is
confirmed at five of five windows (0.75–0.87) and now belongs IN the law as
a known ~20% count overprediction; the per-fold ±3√λ clause FAILS (43.2%
against 90% — the aggregate lands while per-fold dispersion is far wider
than Poisson, the law's one missing piece); and the grade stays WEAKENED,
since a fifth window says nothing about prior art.

**The missing piece was found and blind-validated 2026-08-20, and the ±3√λ
clause is retired with a scope clause**
(`research/history/staging/perfold-error-model.md`; adversarial corrections
`research/history/staging/redteam-0820-empirical.md` §T1): the per-fold error
is a deterministic fold-factor field — X_p ~ Poisson(λ_model·M_p) with
M_p = λ_derived/λ_model, matching import-stein's zero-parameter derived first
moment at 8 of 8 printed folds with pooled X ≥ 15 — and at the fresh
pre-registered anchor (prereg committed alone at 199dd33, the sealed bands a
deterministic function of data committed before it) the NB fold-factor bands
scored **HIT: 33 of 37 folds inside the 90% bands and 0 of 37 outside the
99.73%**, re-scored digit-identically from the red team's independent sieve.
The field is constant in window length to within ~2–3% relative sd over
2·10⁷…2·10¹¹, and constant across the three anchors tested to within the
~6–10% resolution one replicate pair affords — "deterministic" is the
surviving model class, not yet a measured identity in the anchor direction.
The ±3√λ clause is retired FOR FUTURE LARGER-Y PREREGS — the blind window
rejects it at p ≈ 0.02 (29/37 against its 90% demand) and the 2·10¹¹ window
at p ~ 10⁻¹⁹ (32/74); the failure mechanism is the first-moment shift
(M_p−1)√λ, which grows with window length — but it was never separately
refuted at Y ≤ 2·10⁸, where it still holds approximately. Any future window
prereg quotes the NB fold-factor predictive bands
(X_p ~ NB(r = Sx_p + ½, q = λ_h/(λ_h + Sλ_p))) instead, with the honest
√(1 + Y/ΣY′) widening for a new decade. The grade stays WEAKENED: the
comb-weight lead CLOSED 2026-08-20 night — M_p = k·W1(θ_p)·e^{−δθ_p/m̄}
with W1 the exact endpoint comb of the two kill classes (zero parameters;
the measured free exponent reads 1.03 where the derivation says exactly 1),
(k, δ) the law's own two constants re-estimated, blind-validated 34/37 at a
second fresh anchor (`research/history/staging/mp-derivation.md`;
adversarial verdict
`research/history/staging/redteam-0820-night-empirical.md` §T1, with a
recorded custody residual on the prereg timing) — while the residual
sub-field (sd ≈ 0.18, a far-tail flattening, fold 631) stays measured-only,
and none of this touches prior art. Two riders from the adversarial pass:
the field-is-θ-not-p claim rests on the MATCHED CONTROL, not the raw twin
contrast — 0.155-vs-0.764 is confounded, since θ-sharing ⟺ Δp = 2; matched
non-twin pairs agree like twins (rms 0.181 vs 0.155) and control-pair
variance decomposes onto the θ-arithmetic at ratio 1.09 — and the four
flagged folds are Poisson pulls: under the formula's own PLN variance only
409 and 631 stay above 3.

**Downgrade toward RETIRED** if any of the four memory-sourced attributions turns
out to misdescribe the classical result, particularly the spacings one, since
that changes which model is being called the nearest solvable neighbour.

**Retire the extinction half** if the 72-in-p swing seen when the same window
length is moved to a different anchor turns out to dominate the per-decade
increments of 150, 90 and 36. The apparent deceleration of the extinction
sequence is inside that noise and the record says so.

## 6. What a referee would attack

- **The record concedes the hypothesis implies the target.** Turn the m = 2
  statement into an induction and the conclusion is the Zone Postulate itself,
  which the corpus's own L-bound work already calls far too strong. A referee
  will ask what remains once that is conceded, and the honest answer is exact
  identities plus evidence in the right direction, which is not a route.
- **The 2.2% is not three independent confirmations.** The record says so: three
  routes agreeing on the exponent are three models of the same measurement. The
  derived value is the closed form refitted through the record's own estimator
  over the record's own fitting window, while the same null misses the amplitude
  by a factor of about two and over-predicts the pair count by nearly three at
  the calibration window. A model that wrong on two quantities and right to 2.2%
  on a third invites a coincidence charge.
- **The out-of-sample pass is a wide-band pass on a hot model.** The counts run
  one-directionally low against prediction at all four windows, the deep decade
  is roughly twice over-predicted at the two largest, and the largest window's
  extinction fold sits on the exact edge of its band. Add the anchor-offset
  swing and the extinction sequence's apparent shape is not established by
  anything in the record.
