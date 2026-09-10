# The head residual against Hardy-Littlewood: the endpoint deficit prices to five percent with no fitted parameter, the miss sits inside HL's own error term, and the head half of Z4 reduces to a conjecture strictly stronger than the one it was meant to help

<!-- ledger
id: Q-head-residual
status: PARTIAL
todo: Z4
question: What is the head's residual prime-origin factor h/R = 1.09 -> 1.03, and does it derive?
verdict: h - R decomposes exactly and A_forced derives; h/R -> 1 follows from beta CV^2 being bounded, beta CV^2 -> 2 controlling the RATE and not the limit (under it h - R -> D = -0.95, so +8.4661/ln^2 p cannot be the limit law); R is the continuum functional and the integer-origin null sees R + 1/2 exactly, so h - R = 5.679 depends on the unstated null population, reading 5.179 discrete-uniform and 2.925 coprime-to-30; the mod-30 answer is NO by a valid route, class term -0.0001; Delta = 2 - beta is priced by HL to 5.3 percent with nothing fitted and HL's own 1/ln x term absorbs the miss, so the 5.5 s.e. framing is dropped; the asymmetry-as-mechanism claim and the [0.289, 0.361] bracket are refuted, hl3's 16 percent standing; beta_null is 1.898 for the discrete-consistent null and 2 in the continuum; the 72/28 split reads 81/19 in the other exact order; c = 0.844 is 0.722 on a subset, pinned to 15 percent; Delta_HL ln p/lnln p = 4.02 is a property of the prediction; and the N4 plateau is not OPEN, needing beta CV^2 = 2.71 rising to 6.63.
-->

> **RIDER 2026-08-30 (orchestrator, from `verify-0830-record-defects.md` §3, CONFIRMED as an artefact and
> AMENDED on mechanism, independent code).** Delta_meas = 0.6214 ± 0.0060 at
> the pooled decade [1e7, 1e8) is a decade-pooling artefact: the sub-window
> means read 0.6592, 0.6705, 0.6736 at 2, 4, 8 splits (halves 0.6848 ± 0.0111
> and 0.6500 ± 0.0070; quarters 0.7203, 0.6842, 0.6677, 0.6565), the pooling
> term being −0.0378, −0.0491, −0.0522 AT THIS DECADE ONLY (corrected
> 2026-08-30 per `redteam-0830-slack.md` row 9: the queued sentence's range
> "0.038 to 0.052 at all three decades" is the top decade's; the others are
> −0.0455, −0.0592, −0.0655 at [1e6, 1e7) and −0.0524, −0.0706, −0.0757 at
> [1e5, 1e6), so the effect is LARGER at lower height, and the residual term
> inside the eighths, estimated at +0.005, measures +0.0004 at sixteenths),
> of which the between-slope (λ/2)
> piece is 46 to 50% and the rest is the within slope's own fall with height
> weighted by Var(g). The 5.3% remainder with "the same sign across three
> decades" is therefore an estimator artefact, and the half-decade reading in
> `attack-0830-head-remainder.md` ("HL within 1.6 se, alternating sign") is
> itself pooled: halves re-read from eighths (0.7005, 0.6638) put HL 2.5 to
> 3.4% BELOW the measurement at about 2 se in 5 of 6 half-decades. See §3.3
> there for the sentence-level replacements of §0 and §6.

STATUS: HELD, staging. Not integrated, not red-teamed. Companion script
`research/history/staging/head-residual-hl3.js` (embedded, 1.6 s, no random
numbers, `--check` green). Its SEC 0 re-sieves [1e5,1e6), [1e6,1e7) and
[1e7,1e8) independently and reproduces `head-residual-null.js` SEC 2 in that
file's own convention, including the four-row left/right deficit profile to the
printed digit, before anything below is computed. If that control had failed
nothing here would stand.

Task: TODO Z4, head half, sitting on `research/history/staging/head-residual-factor.md`
and `research/history/staging/head-residual-null.md`. Their per-window numbers
are the control targets, not inputs to be trusted.

---

## 0. What is still open, and what failed

**Hardy-Littlewood over-predicts the deficit, and the miss does not shrink.**
The zero-parameter HL prediction for Delta = 2 - beta at [1e7,1e8) is 0.6545
against a measured 0.6214 +- 0.0060, a ratio of 1.053, so HL over-predicts by
5.3 percent. The two lower decades give 1.038 (+- 0.022) and 1.147 (+- 0.059).
Four to five percent of Delta is not accounted for, the sign of the miss is the
same at every window and at every cut of the profile, and nothing here derives
it [MEASURED, script SEC 3]. The statistical size of the miss is not the
binding number and is not reported as one: it is 5.49 OLS standard errors, 6.51
under an interleaved jackknife and 3.31 under a contiguous-block jackknife
[MEASURED, `redteam-0828-head.js`]. The miss is a 0.276 percent discrepancy in
alpha amplified 19.29x by the near-cancellation in
Delta = E[g](alpha - lambda_s), and it sits inside HL's own unquantified
1/ln x term at ln x = 17.7 (§6). It is not evidence against HL.

**The prediction is not a derivation of anything, because HL is stronger than
what it is being used to support.** The prime k-tuple conjecture implies the
twin prime conjecture. Anything this file establishes about beta is conditional
on a statement that already settles the question the programme is attacking. The
useful content is negative and structural, not evidentiary [PROVEN, by
inspection of what is assumed].

**The one-opener sum the task asked for does not converge, so the question as
posed has no answer.** Summing (1 - S(0,2,2+d)/S(0,2)) over d does not converge
and Cesaro averaging does not rescue it: the Cesaro mean of the ratio is 0.9999
by T = 1e5, so the leading term cancels and a logarithm survives. The partial
sums run 3.429, 5.688, 8.475, 12.924 at T = 30, 120, 1000, 100000, fitting
c ln T + C with c = 0.844 over six points in [1e3, 2e5]; a four-point subset of
the same points gives 0.722, so c is pinned to about 15 percent [MEASURED,
`redteam-0828-head.js`]. This is Montgomery-Soundararajan behaviour
transposed to a triple. What makes the deficit finite is the gap
length, which cuts the sum off, so the cutoff is the model and cannot be
finessed away [MEASURED, script SEC 1].

**Two of `head-residual-null.md` §3's three readings do not survive.** Its
reading 2, that the left-heavy profile is "the mechanism naming itself", is
wrong: the HL correlation around a twin pair is exactly reflection-symmetric, so
it cannot produce a physical left-right asymmetry at all, and it still
reproduces the measured 4.079 ratio (predicting 4.232) out of a binning
artefact. Its reading 3 over-prices the opener pair's two slots by 3.19x in that
file's own convention. Both corrections are in §4 below.

---

## 1. The conditional density, exactly [PROVEN, given HL]

For an admissible k-tuple H, S(H) = prod_q (1 - nu_q(H)/q)/(1 - 1/q)^k with
nu_q(H) the number of distinct residues of H mod q. HL k-tuple gives
#{n <= x : n + h prime for all h in H} ~ S(H) x / (ln x)^k.

**One opener.** Given (a, a+2) a twin pair, the conditional density of a prime
at a + t is psi(t)/ln x with psi(t) = S(0,2,t)/S(0,2). Its local factors:

- q = 2: nu_2({0,2,t}) is 1 on even t and 2 on odd t, so psi = 0 on odd t.
- q = 3: a twin opener has a = 2 mod 3, so {0,2,t} covers Z/3 exactly when
  t = 1 mod 3, so psi = 0 there.
- q >= 5: nu_q = 2 iff q | t(t-2), else 3.

Dividing out S(0,2)'s own local factors leaves, on live t (t even, t not 1 mod 3,
which is t = 0 or 2 mod 6, one third of all t),

    psi(t) = 3 * P5 * prod_{q >= 5, q | t(t-2)} (q-2)/(q-3),
    P5 = prod_{q >= 5} (1 - 2/((q-1)(q-2))).

Computed, 3*P5 = 2.164809083 against the independent route through the published
prime-triplet constant, S(0,2,6)/S(0,2) = 2.858248596/(2 C2) = 2.164809087
[MEASURED, agreement to 4e-9, script SEC 1]. The live set is exactly the
"d = 0, 2 mod 6" the sibling names in its reading 3.

**The right opener is the same function.** For m = b - u below a pair (b, b+2)
the tuple is {0, u, u+2}, whose reflection is {0, 2, u+2}, and the singular
series is invariant under reflection. So the density there is psi(u+2). **HL
makes the depletion around a twin pair exactly reflection-symmetric in the
distance from the pair, with no free parameter to break it** [PROVEN, given HL].

**A gap is bounded by two pairs, so psi is the wrong object for it.** The
conditioning set is {0, 2, g, g+2}, and the exact conditional density at a + t is

    rho(t,g) = S(0,2,t,g,g+2) / S(0,2,g,g+2).

Every twin gap above 3 has 6 | g, both openers being odd and 2 mod 3, checked on
all 439,085 gaps of the three windows with zero exceptions. The local factors:

- q = 2: factor 2 on even t, 0 on odd t.
- q = 3: factor 3/2 on t = 0, 2 mod 3, 0 on t = 1 mod 3.
- q >= 5: nu_4 = 2 if q | g, 3 if q | g-2 or q | g+2, else 4;
  nu_5 = nu_4 if q | t(t-2)(t-g)(t-g-2), else nu_4 + 1;
  factor = (1 - nu_5/q) / ((1 - nu_4/q)(1 - 1/q)).

Two things follow that the product psi(t) psi(u+2) gets wrong, so the
factorized form is not used anywhere below. First, the product double-counts
q = 2 and q = 3 by a factor 3. Second, at q = 5 with nu_4 = 4 the four endpoints
already occupy four of the five classes mod 5, so one residue class of t is
barred outright and the factor is zero; the product cannot see that. The second
check on the local factors is rho's own mean. Nothing forces it to 1 at finite
g: it is a Gallagher-type average that 1 is approached by, and the measured
0.9582, 0.9760, 0.9827, 0.9910 over the interior at g = 300, 606, 1002, 2010 is
that approach, not a check that passed [MEASURED, script SEC 2].

Nothing in this section is new. It is the standard conditional singular series;
the repo's own `research/history/staging/w1-singular-series.md` already
identifies S(0,2,v,v+2)/S(0,2)^2 as the fold comb W1. rho is one point larger
than that object and is used here for a different purpose.

---

## 2. What beta's intercept actually measures, and what the gap conditioning does

**The identity.** E[n] = 2 + lambda_s E[g] holds exactly in the data, since
E[n] = lambda E[g], E[g] = 1/lambda_2 and lambda_s = lambda - 2 lambda_2. So
writing the OLS line as E[n | g] = beta + alpha g,

    Delta = 2 - beta = E[g] (alpha - lambda_s)

is the part of the prime count that does NOT scale with the gap length: the
total endpoint deficit per gap, measured against the bulk density far from
either opener [PROVEN, algebra; it is `head-residual-null.md` §3's identity
read the other way round].

The consequence matters. Any part of the deficit that grows with g, and §0 says
the HL part grows like c ln g, is split by the OLS between alpha and beta rather
than landing wholly in beta. So the comparison cannot be made by summing a
profile. It is made here by pushing the model through the same OLS the sibling
runs: E[n | g] = 2 + kappa W(g) with W(g) = sum_{t=3}^{g-1} rho(t,g), then
alpha_HL = kappa Cov(W,g)/Var(g) and beta_HL = E[n] - alpha_HL E[g]. **kappa is
not fitted**: the identity above fixes it at kappa = lambda_s E[g]/E[W], giving
0.05136 against the measured lambda_bulk = 0.05101 and alpha = 0.05079.

**The gap's own conditioning is already in lambda_s, and its non-uniform part is
the leading omission.** A gap is defined by no interior position being an
opener. Under the programme's null that condition is exactly the thinning
lambda to lambda_s, which kappa carries. Two local consequences that might have
needed adding do not: a+4 and b-2 must be composite or the gap would end early,
and both are already zero in rho by the mod-3 factor. What is not carried is the
correlation between where rho peaks and where an interior opener is likely,
which thins the comb's peaks harder than its floor and so flattens it. That has
the right sign to explain a five percent over-prediction and it is not priced
here [HEURISTIC, direction only, no number].

---

## 3. The comparison [MEASURED against HEURISTIC]

All numbers from the script's embedded block. HL's column has no fitted
parameter in it.

**Delta = 2 - beta.**

| window | Delta measured | Delta HL | ratio |
|---|---|---|---|
| [1e5,1e6) | 0.6899 +- 0.0355 | 0.7914 | 1.147 |
| [1e6,1e7) | 0.6862 +- 0.0148 | 0.7124 | 1.038 |
| [1e7,1e8) | 0.6214 +- 0.0060 | 0.6545 | 1.053 |

Swapping the measured gap-length law for an exponential law of the same mean
moves the top window's prediction from 0.6545 to 0.6463, so the miss is not the
gap law. The bulk slope by contrast is priced to 0.3 percent: alpha_HL = 0.05093
against a measured 0.05079.

**The d-profile, in the sibling's exact binning convention.**

| cut | left meas | left HL | right meas | right HL | sum meas | sum HL |
|---|---|---|---|---|---|---|
| d < 30 | 0.4626 | 0.4838 | 0.1134 | 0.1143 | 0.5761 | 0.5981 |
| d < 60 | 0.4929 | 0.5049 | 0.1557 | 0.1641 | 0.6486 | 0.6690 |
| d < 90 | 0.4966 | 0.5185 | 0.1421 | 0.1577 | 0.6388 | 0.6762 |
| d < 120 | 0.5295 | 0.5623 | 0.1942 | 0.2241 | 0.7236 | 0.7864 |

Poisson standard deviation is 0.0053 on one 30-wide shell and 0.0107 on a d<120
cumulative, so the d<120 sum's miss of 0.063 is about four standard deviations.
Share of the d<120 total sitting inside d<30: measured 0.796, HL 0.761, against
the sibling's stated 80 percent. Left-to-right ratio at d<30: measured 4.079, HL
4.232.

**The shell structure the sibling could not place is in the comb.** Its reading
1 recorded shells beyond d=30 contributing 0.0725, -0.0098, 0.0849, non-monotone
and unlike the Montgomery-Soundararajan shape it was tested against. HL gives
0.0709, +0.0072, 0.1102 for the same three. Across the eight shell deficits, four
left and four right, measured against HL correlates at r = 0.9989, and still at
0.9518 with the two dominant d<30 shells dropped. The sign of the [60,90) shell
is missed, measured -0.0098 against HL +0.0072, which is within two standard
deviations of zero either way. **rho is not smooth in t, and a 30-wide shell
samples it unevenly. That, not a mechanism, is what the non-monotonicity is.**

---

## 4. Two corrections to `head-residual-null.md` §3

**The left-heaviness is a binning artefact.** rho is exactly reflection-symmetric
about a pair, so HL has no way to make the deficit physically left-heavy, and it
predicts 4.232 against the measured 4.079 anyway. The whole of it comes from two
places. First, the script's cntL skips the forced pair, so d = 0 and d = 2 read
as empty slots and contribute 2 lambda_bulk = 0.1020 to the left column and
nothing to the right. Second, the left column's 30-shell runs over
distance-from-pair t = 3..29 while the right column's runs over t = 3..32,
because the right index is offset by the two positions b-1 and b; t = 30 and
t = 32 are both live and carry large rho, so they subtract about three units
from the right column's first shell. The sibling's sentence "the asymmetry is
the mechanism naming itself" is withdrawn there. The symmetry also holds
without HL: measured over 381,332 pairs, the prime count per pair at
centre-distance +s and -s agrees to 0.70 Poisson sd out to s = 199, 11.9752
against 11.9807 [MEASURED, `redteam-0828-head.js`, no model].

**The "two live positions" bracket is the d = 0, 2 term of this expansion, and
it is over-priced by 3.19x.** The sibling puts the opener pair's two slots at
6 lambda_s = 0.289 to 7.5 lambda_s = 0.361, about half of Delta, by charging
each occupied slot the per-LIVE-slot density (30/8) lambda_s. Its own statistic
sums (lambda_bulk - count_d/gaps) over ALL d, which is a flat baseline in which
two excluded slots are worth exactly 2 lambda_bulk = 0.1020, sixteen percent of
Delta rather than fifty-two. The anatomy at the mean gap g = 234, in lambda_bulk
units: pair slots 2.000, the |d| < 30 field 5.495, everything beyond 6.192,
i.e. 0.1020 + 0.2803 + 0.3158 of the measured 0.6214.

---

## 5. The rate, which is the one thing that moves

HL's comb sums to c ln T and the gap cuts it off at T of order
E[g] = ln^2 p/(2 C2), so Delta should vanish like lnln p / ln p rather than like
1/ln p. Measured on the prediction: Delta_HL * ln p / lnln p = 4.022, 4.005,
4.025 across the three windows, flat to 0.5 percent, which is a property of the
prediction and not a measurement, since the log divergence is built into the
model that produces it. The measured version, 3.506, 3.857, 3.822, is flat only
over the top two windows.

**`head-residual-null.md` §3's closing line, "everything in Delta is O(1/ln p)",
is one lnln p too fast** if HL is right, and it is the same lnln p that §0 of
that file could not separate from a constant on the h - R fit over the available
lever arm. The two statements are the same ambiguity seen twice.

---

## 6. What closes, and what HL leaves

**HL prices the head's residual to within five percent, so Z4's head half
reduces to HL and does not close.** Granting the prime k-tuple conjecture,
Delta = 2 - beta is the correlation of primes with the two twin pairs bounding
their gap, it vanishes like lnln p/ln p, hence beta tends to 2; with CV^2 tending
to 1 that gives beta CV^2 tending to 2 and h/R tending to 1, which is
`head-residual-factor.md` §3's open question answered conditionally on a
conjecture that already implies twin primes. **The correct summary of the head
half is now "measured consistent with HL to five percent, nothing derived beyond
HL"** [CONJECTURED on HL; the consistency is MEASURED].

**What HL leaves is 0.033 out of 0.621 at [1e7,1e8), 5.3 percent, same sign at
three windows and at four cuts.** The same-sign pattern is the honest content;
the standard-error framing is dropped, running 3.31 to 6.51 depending on the
error model and attaching a significance to a 5 percent agreement with a
zero-parameter conjecture. Named candidates, none priced: the
non-uniform part of the no-interior-opener conditioning (§2, right sign); HL's
own error term, which at ln x = 17.7 could carry a 1/ln x correction of about
0.06 in relative terms and so is the right order; and the factorization-free but
still five-point truncation of the conditioning set, which ignores that the
neighbouring gaps' openers also sit at known distances.

Nothing in this file touches Z2, and nothing in it bears on the conjecture.
It makes the head half smaller and more clearly conditional, which is a
reduction in what is claimed, not an advance.

---

## Defects noticed in passing

- `head-residual-null.md` §3 reading 2's "the asymmetry is the mechanism naming
  itself" is not supportable: HL is reflection-symmetric and predicts the
  asymmetry from binning alone. §4 above.
- `head-residual-null.md` §3 reading 3's bracket [0.289, 0.361] is computed in a
  per-live-slot baseline while the statistic it is compared against uses a flat
  one. Same object, 3.19x apart. §4 above.
- `head-residual-null.md` §3's closing "everything in Delta is O(1/ln p)" is
  O(lnln p/ln p) under HL. §5 above.
- `head-residual-null.md` §3 reading 1 rejects the MS shape on the grounds that
  the shells are non-monotone. The shells are non-monotone in HL too, at
  r = 0.9518, so non-monotonicity was never evidence against a singular-series
  account; only the accrual RATE was.
- `research/GLOSSARY.md` still has no entry for **opener**, **head** or
  **tail**. Flagged by both siblings, still true.

---

## What would falsify this, and whether that check has run

| Claim | Rung | Falsifier | Run? |
|---|---|---|---|
| psi and rho's local factors are right | MEASURED (two independent routes) | 3*P5 differing from the published triplet-constant route; rho's interior mean not approaching 1 | YES. 2.164809083 against 2.164809087; rho's mean 0.9582 to 0.9910 over g = 300 to 2010 |
| every twin gap has 6 \| g | PROVEN (openers are odd and 2 mod 3) | one gap in the data with 6 not dividing g | YES, 439,085 gaps, zero exceptions |
| the one-opener deficit sum diverges | MEASURED | D(T) flattening above T = 2e5 | PARTIAL. T <= 2e5 only, and D(T) is noisy: D(T)/ln T swings 0.95 to 1.23, and c = 0.844 reads 0.722 on a four-point subset of the same points, so c is pinned to about 15% |
| Delta = 2 - beta is the g-independent endpoint deficit | PROVEN (algebra) | E[n] = 2 + lambda_s E[g] failing in the data | YES, it is an identity, and alpha, beta reproduce the sibling at three windows |
| HL prices Delta to about 5%, over-predicting | MEASURED against HEURISTIC | the ratio crossing 1 at greater height, or the miss vanishing inside HL's own error term | YES at three windows, ratios 1.147, 1.038, 1.053, a 5.3% miss at the top (3.31 to 6.51 s.e. by error model, and inside HL's 1/ln x term at ln x = 17.7). NO above 1e8 |
| the miss is not the gap-length law | MEASURED | a different gap law moving the prediction by more than the miss | YES. Exp law of the same mean moves 0.6545 to 0.6463, a quarter of the miss |
| the left-heaviness is binning, not mechanism | PROVEN (rho's reflection symmetry) + MEASURED | a measured L/R ratio that HL cannot reach | YES, HL gives 4.232 against 4.079 |
| the pair's two slots are worth 2 lambda_bulk, not 6 to 7.5 lambda_s | PROVEN (the statistic's own baseline) | the sibling's statistic using a per-live-slot baseline after all | YES, read from `head-residual-null.js` SEC 2's accumulator |
| Delta vanishes like lnln p/ln p under HL | HEURISTIC | the MEASURED Delta * ln p/lnln p drifting over a longer lever arm | PARTIAL, and weak. The prediction's own 4.022, 4.005, 4.025 is flat by construction; the measured 3.506, 3.857, 3.822 is flat only over the top two windows, ln p in [13.1, 17.7] |
| the residual 5% is the no-opener conditioning | CONJECTURED | an exact treatment of that conditioning giving the wrong sign or the wrong order | NO. Not attempted; only the sign is argued |
| beta -> 2 and hence h/R -> 1 | CONJECTURED on HL | nothing available below the k-tuple conjecture | NO, and it cannot be run: HL implies the conjecture the programme is attacking |

The cheap check not run is the siblings': the same three quantities at 1e12,
which would take the lever arm from ln p <= 17.7 to <= 27.6 and say whether the
five percent miss is a 1/ln p error term or a floor. This file adds one number
to want from that pass, Delta_HL/Delta_meas, and one shape, the eight shell
deficits against rho.
