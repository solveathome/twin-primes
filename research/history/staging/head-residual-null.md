# The head residual against the programme's own null: the null settles the direction and misses the rate by a power of ln p, and beta carries the miss

<!-- ledger
id: Q-head-residual
status: PARTIAL
todo: Z4
question: What is the head's residual prime-origin factor h/R = 1.09 -> 1.03, and does it derive?
verdict: h - R decomposes exactly and A_forced derives; h/R -> 1 follows from beta CV^2 being bounded, beta CV^2 -> 2 controlling the RATE and not the limit (under it h - R -> D = -0.95, so +8.4661/ln^2 p cannot be the limit law); R is the continuum functional and the integer-origin null sees R + 1/2 exactly, so h - R = 5.679 depends on the unstated null population, reading 5.179 discrete-uniform and 2.925 coprime-to-30; the mod-30 answer is NO by a valid route, class term -0.0001; Delta = 2 - beta is priced by HL to 5.3 percent with nothing fitted and HL's own 1/ln x term absorbs the miss, so the 5.5 s.e. framing is dropped; the asymmetry-as-mechanism claim and the [0.289, 0.361] bracket are refuted, hl3's 16 percent standing; beta_null is 1.898 for the discrete-consistent null and 2 in the continuum; the 72/28 split reads 81/19 in the other exact order; c = 0.844 is 0.722 on a subset, pinned to 15 percent; Delta_HL ln p/lnln p = 4.02 is a property of the prediction; and the N4 plateau is not OPEN, needing beta CV^2 = 2.71 rising to 6.63.
-->

STATUS: HELD, staging. Not integrated, not red-teamed. Companion script
`research/history/staging/head-residual-null.js` (embedded, 1.6 s, seeded
simulation, `--check` green). Its SEC 2 re-sieves [1e7,1e8) independently and
reproduces the sibling's E[g], E[n], beta and CV^2 for that window to 1e-3
before it measures anything new; if that control had failed nothing below would
stand.

Task: the null half of TODO Z4's head question, sitting on top of
`research/history/staging/head-residual-factor.md`, whose measured per-window
numbers are quoted here from its embedded block and are nowhere recomputed.

---

## 0. What is still open, and what failed

**The null does not reproduce the measured residual, and the miss is not
subtle.** Under the programme's standard Poisson-Hardy-Littlewood null for
twin gaps the residual is

    h - R = -4 C2 / ln p,        h/R - 1 = -8 C2^2 / ln^3 p

which is NEGATIVE and one power of ln p faster than the measured
+8.4704/ln^2 p (8.4661 under the sibling's own error model; the two refits use
the same six points and differ only in how the errors are estimated). That
fitted law is local, not a limit law: under beta CV^2 -> 2 with D -> -0.95 the
sibling's identity sends h - R to D, so h/R - 1 approaches 0 from BELOW and the
coefficient has to change sign. On the sibling's six half-decade points the
zero-parameter null sits at chi2/df = 1362 (script SEC 3). Ratio of measured
to null runs -14.0, -27.7, -26.5, -36.0, -40.1 up the five decades, widening. **The head's residual
is not a renewal artefact** [MEASURED, script SEC 1].

**The composed rate is not separable on this lever arm.** Both null-deviation
factors carry O(lnln p / ln p) corrections, so the composed prediction is
h - R ~ ((b+2c)/2) lnln p rather than a constant. Over the six half-decades
lnln p moves only 15.5%, and h - R = 6.008 constant (chi2/df 1.295) against
h - R = 2.126 lnln p (0.887) is not a discrimination [MEASURED, script SEC 3].
The sibling's 8.4661/ln^2 p and a lnln-p-modulated version of it are the same
fit at this height.

**The variance note's sub-Poisson constant does not transport, so TODO item 9's
[0.46, 0.72] is not an input here.** The renewal identity
Var N(L) / E N(L) -> CV^2(g) requires an L-plateau. The twin-candidate process
on the wheel has none: `paper/variance-note.md` §6 shows Var/E falling
monotonically in the window exponent u (0.845 at u = 0.6 down to 0.076 at
u = 3), and §2's sum rule forces it to 0 at L = P exactly. So the u = 2
diagonal value 0.3958 of §7, and with it the intercept `varE-asymptotic.md`
leaves unpinned across [0.46, 0.72], are a different object from CV^2(g) and
neither predict nor bound it [PROVEN that the identity fails, from the note's
own §2 sum rule; the numbers are the note's].

**No derivation of the excess was reached.** What follows names the object that
carries it and prices it, at MEASURED and HEURISTIC.

---

## 1. Fixing the null [PROVEN, given the stated model]

The null R = E[g^2]/(2E[g]) presumes is a **renewal** process on the twin
openers, which is what makes R the inspection-paradox functional at all. The
matching structural null in this corpus is `zonegap-03-model.md` §3's matched
pure-Exp / Kourbatov-Wolf process, exponential gaps at mean ln^2 x / (2 C2).
Stated so it also fixes the prime count inside a gap:

- primes near p are Poisson at rate lambda = 1/ln p;
- a fraction theta = lambda_2/lambda = 2 C2 / ln p of them are twin openers,
  the marking independent of everything else.

Written as a **cluster** process so the prime density stays honest: a cluster is
either a twin pair (an opener, two primes 2 apart) or a solitary prime; cluster
rate lambda_c = lambda(1 - theta), a cluster is an opener with probability
q = theta/(1 - theta), solitary rate lambda_s = lambda_c(1 - q) =
lambda - 2 lambda_2.

**CV^2_null = 1 exactly.** An independent q-thinning of a Poisson process is
Poisson, so the opener gaps are Exp(lambda_2) and CV^2 = 1 with no correction
term at all.

**beta_null = 2 in the continuum, 1.898 discrete.** Splitting a marked Poisson
process leaves the opener and solitary processes independent, so given a gap
[a, a+g) the interior solitary primes are Poisson(lambda_s) on it. With
n = 2 + K counting the opener a and its partner a+2,

    E[n | g] = 2 + lambda_s g,   so alpha_null = lambda_s and beta_null = 2,

where the interior is charged over the full length g. That is the continuum
value; the discrete-consistent version, and the convention the measured beta
lives in, is 1.898, worked out in the next paragraph.

**The sibling's quoted null 2 - 2/ln p puts the two forced primes on a
full-density interior** [DEFECT, see §5], which over-counts primes by
2 - 2/ln p per gap, about 14% of E[n] at [1e7,1e8). Thinning the interior to
lambda_s over the g - 2 positions the pair does not occupy gives
beta = 2 - 2 lambda_bulk = 1.898 in the convention the measured beta uses; 2
exactly is the continuum value, reached by letting the interior run over the
full length g. The sibling's 1.887 is off by 0.011, not by 0.113, and the 0.102
between 1.898 and 2 is the same object §3 reading 3 prices as the pair's two
slots. The limit is the same either way, so the sibling's §3 conclusion is
unaffected.

**D_null = 0 exactly.** The interior primes are uniform given their count, so
S - n g/2 = g - 2 identically and A = A_forced with no remainder.

**Hence the null's residual.** With E[g] = 1/lambda_2, E[g^2] = 2E[g]^2,
E[n] = 1/theta,

    h - R = -2 / E[n] = -2 theta = -4 C2 / ln p
    h/R - 1 = -2/(E[n] E[g]) = -8 C2^2 / ln^3 p = -3.4865 / ln^3 p.

Equivalently beta_null x CV^2_null = 2 exactly, so the two ln p terms of the
sibling's identity h - R = [ln p - 4C2/ln p] + D - (beta CV^2/2) ln p cancel
identically. **Under the null, h/R -> 1.** That is not what the null buys: the
sibling's identity gives h/R -> 1 for any bounded beta CV^2, and what the null
adds is the rate, which it gets wrong by a power of ln p, and the sign, which
it gets wrong too.

All six statements are checked in the continuum convention by direct
simulation at 4,000,000 seeded gaps matched to [1e7,1e8) (script SEC 0):
CV^2 = 0.9998, beta = 1.9984,
alpha = 0.04816 against lambda_s = 0.04817, D = -0.0103, h - R = -0.1424
against -2/E[n] = -0.1497.

## 2. Where the discrepancy sits: beta, by about 5 to 2 and widening [MEASURED]

Split the shortfall exactly: 2 - beta CV^2 = (2 - beta) CV^2 + 2(1 - CV^2).
Script SEC 1, on the sibling's decade numbers:

| window | beta | CV^2 | shortfall | beta's share | CV^2's share |
|---|---|---|---|---|---|
| [11,1e4) | 1.028 | 0.7436 | 1.2356 | 0.7228 (58%) | 0.5128 (42%) |
| [1e4,1e5) | 1.079 | 0.7406 | 1.2009 | 0.6821 (57%) | 0.5188 (43%) |
| [1e5,1e6) | 1.310 | 0.8281 | 0.9152 | 0.5714 (62%) | 0.3438 (38%) |
| [1e6,1e7) | 1.314 | 0.8520 | 0.8805 | 0.5845 (66%) | 0.2960 (34%) |
| [1e7,1e8) | 1.379 | 0.8941 | 0.7670 | 0.5552 (72%) | 0.2118 (28%) |

beta is the larger carrier at every window and its share is rising. CV^2 is
closing on 1 faster than beta is closing on 2. The 72/28 split is one of two
exact decompositions of 2 - beta CV^2; taking the factors in the other order,
2 - beta CV^2 = (2 - 2 CV^2) + CV^2(2 - beta), reads 81/19 at the same window.
The rise survives both orders, the split level does not.

## 3. What beta's deficit is, as an object [MEASURED]

E[n] = 1/theta is an identity, not a model claim, so

    beta = 2 - (alpha - lambda_s)/lambda_2   exactly.

A beta below 2 is therefore not an abstraction: it is a deficit of
Delta = 2 - beta primes near the two openers that bound a gap, paid for by a
bulk interior density above lambda_s. Measured: Delta = 0.972, 0.921, 0.690,
0.686, 0.621 up the decades, with the bulk excess +24%, +15%, +9%, +7%, +5%.

Script SEC 2 measures the interior-prime density profile against distance from
an opener, on the 107,722 gaps of [1e7,1e8) with g >= 300, shells aligned to 30
so the mod-30 house structure averages out inside each shell:

| d | left | right | sum |
|---|---|---|---|
| < 30 | 0.4626 | 0.1134 | 0.5761 |
| < 60 | 0.4929 | 0.1557 | 0.6486 |
| < 90 | 0.4966 | 0.1421 | 0.6388 |
| < 120 | 0.5295 | 0.1942 | 0.7236 |

Three readings, all with the caveat that this is band-restricted (28% of the
window's gaps) and its baseline lambda_bulk = 0.05101 exceeds the global OLS
slope alpha = 0.05079 by 0.4%, so 0.7236 against 2 - beta = 0.621 is agreement
to 16%, not an identity.

1. **The deficit is local, not log-divergent.** 0.5761 of 0.7236, 80%, sits
   within d < 30. The shells beyond contribute 0.0725, -0.0098, 0.0849
   (+-0.0053 Poisson), non-monotone, against the steady 0.11 per nat a
   Montgomery-Soundararajan singular-series-average deficit would give. **The
   MS shape is not what the profile shows** [MEASURED, and it refutes this
   pass's own first guess]. The MS bracket does land on the right size, 0.446
   for one-prime conditioning and 0.892 for pair conditioning against measured
   0.621, but a bracket that wide and a shape that wrong is not a derivation.
2. **The left-heavy column, 0.5295 against 0.1942, is a binning artefact and
   not a mechanism.** The prime field around a twin pair is symmetric: measured
   over 381,332 pairs, the prime count per pair at centre-distance +s and -s
   agrees to 0.70 Poisson sd out to s = 199, 11.9752 against 11.9807 primes per
   pair [MEASURED, `redteam-0828-head.js`, no model]. Hardy-Littlewood says the
   same without measuring, the conditional density being exactly
   reflection-symmetric about the pair centre, and it reproduces the 4.079 ratio
   at 4.232 out of the binning alone (`head-residual-hl3.md` §4). The two causes
   are this script's skipped pair slots and the right column's 30-shell running
   over t = 3..32 against the left's t = 3..29.
3. **About a sixth of it is the two live positions the opener pair occupies.**
   The statistic above sums lambda_bulk - count_d/gaps over every d, a flat
   baseline, so the two excluded slots are worth 2 lambda_bulk = 0.1020 against
   the d < 120 profile total 0.7236, 14.1 percent, and 2 lambda_s = 0.0963
   against Delta = 0.621, 15.5 percent [MEASURED, `head-residual-hl3.md` §4,
   confirmed on independent code]. The per-live-slot conversion 30/8 does not
   belong here: the continuum null charges 2 units of LENGTH at density
   lambda_s, not two live slots at the per-live-slot density.

Everything in Delta is O(1/ln p) in this reading, so beta -> 2 follows from
it, and slowly. Under Hardy-Littlewood the rate is one lnln p slower,
O(lnln p/ln p) (`head-residual-hl3.md` §5), and the available lever arm does
not separate the two. Neither is a proof: this is the shape of one measured
profile at one height, and the residual 20% beyond d = 30 is not accounted
for.

## 4. CV^2, and what the variance note can and cannot say [HEURISTIC]

CV^2_null = 1 exactly (§1). The measured deficit 1 - CV^2 = 0.2564, 0.2594,
0.1719, 0.1480, 0.1059 is not derived here.

The variance note's numbers are the right kind of object at the wrong scale.
Gap scale is L = E[g] with sieve level y = sqrt(x), so the window exponent is
u = 2 ln E[g] / ln x, which runs 0.846, 0.779, 0.704, 0.642, 0.593 up the five
decades and tends to 0 like 4 lnln x / ln x. Evaluated there, §6's empirical
shape ln(Var/E) ~ -(0.24 u^2 + 0.13 u) at y = 401 gives 0.7544, 0.7813, 0.8101,
0.8332, 0.8508 against measured CV^2 0.7436, 0.7406, 0.8281, 0.8520, 0.8941.
Right size, right drift direction, and CV^2 -> 1 follows from u -> 0. Three
reasons this is HEURISTIC and not more: the renewal identity that would license
reading a count-variance ratio as CV^2(g) fails for this process (§0); the
fit is at y = 401 and the note's own §6 point 2 says the ratio at fixed u
drifts upward with y; and the two middle windows sit on the wrong side.

## 5. What this buys, and what it does not

The head coefficient still does not derive. The sibling reduced it to
CV^2 -> 1 and h/R -> 1; this pass shows both hold **under the null**, exactly,
and that the null is wrong about the residual by a factor 40 and a sign at
[1e7,1e8). So the reduction survives but the null cannot close it, and the
object left standing is beta's endpoint deficit: local, symmetric about the
pair once the binning is fixed, about a sixth of it priced by the discreteness
the continuum null drops, and O(1/ln p) here against O(lnln p/ln p) under
Hardy-Littlewood.

Nothing in this file touches Z2, and nothing in it bears on the conjecture.

## Defects noticed in passing

- `head-residual-factor.js` SEC 2b's stated null "beta = 2 - 2 lambda (the two
  forced left-end primes on an interior Poisson process of rate lambda)" is not
  density-consistent: that model has E[n] = lambda E[g] + 2 - 2 lambda, which
  over-counts primes by 14% at [1e7,1e8). The density-consistent value in that
  script's own convention is 2 - 2 lambda_bulk = 1.898, and 2 exactly is the
  continuum value; the script's 1.887 is off by 0.011. Its §3 conclusion is
  unaffected because every version tends to 2.
- `head-residual-factor.md` §5 calls CV^2 -> 1 "the standard Poisson-limit
  statement for twin gaps" and §3 calls it "a Hardy-Littlewood consequence".
  Neither is cited to a source in the corpus, and this pass did not find one;
  it is CONJECTURED here, not PROVEN.
- `paper/variance-note.md` §6's table is at fixed y = 401 while §6 point 2
  records that the ratio at fixed u drifts with y. Any use of the (c_1, c_2)
  fit away from y = 401, including §4 above, is an extrapolation the note does
  not license and does not flag.
- `research/GLOSSARY.md` still has no entry for **opener**, **head** or
  **tail**, all three load-bearing here and in Z4. The sibling flagged the last
  two.

---

## What would falsify this, and whether that check has run

| Claim | Rung | Falsifier | Run? |
|---|---|---|---|
| beta_null = 2, CV^2_null = 1, D_null = 0, h - R = -2/E[n], all exact in the continuum convention | PROVEN (given the stated null) | the seeded simulation missing any of them | YES, 4e6 gaps, all five inside tolerance. The discrete-consistent beta_null is 1.898, not 2 |
| the null's h/R - 1 = -8 C2^2/ln^3 p is refuted by the data | MEASURED | the null fitting the six half-decade points | YES, chi2/df = 1362, zero parameters, and the sign is wrong at every window |
| beta carries 72% of the shortfall at [1e7,1e8), rising | MEASURED | the split reversing at greater height | NO. Five decades only, the split is a decomposition of one identity rather than two independent measurements, and the other exact order of the same identity reads 81/19 at that window |
| Delta = 2 - beta is an endpoint prime deficit, localized within d < 30 | MEASURED | the profile flattening only past d = 120, or the deficit continuing to accrue at 0.11 per nat | PARTIAL. One window, one band (g >= 300), d <= 120 only; 20% of the total is unexplained beyond d = 30 |
| the deficit is not the MS singular-series-average shape | MEASURED | shell contributions turning steady at 0.11 per nat over a longer d range | PARTIAL, d <= 120, and the non-monotone shells are not the evidence: Hardy-Littlewood's own shells are non-monotone too and correlate with the measured ones at r = 0.9518 with the two dominant shells dropped (`head-residual-hl3.md` §3). Only the accrual RATE separates them |
| about a sixth of Delta is the opener pair's two live positions | MEASURED (from the statistic's own flat baseline) | the accumulator using a per-live-slot baseline after all | YES. 2 lambda_bulk = 0.1020 and 2 lambda_s = 0.0963, 14 to 16 percent; the earlier [0.289, 0.361] bracket was the per-live-slot conversion applied to a flat-baseline statistic |
| the variance note's u = 2 number does not bound CV^2(g) | PROVEN (from the note's own §2 sum rule) | a renewal-plateau in L for the twin-candidate process | YES, by the sum rule: Var/E -> 0 at L = P |
| note §6's shape at u_gap predicts CV^2 | HEURISTIC | the prediction missing beyond its two-window spread at 1e12 | NO. Two of five windows already sit on the wrong side |
| beta -> 2 and CV^2 -> 1, hence beta CV^2 -> 2 and h - R bounded | CONJECTURED | Delta or 1 - CV^2 stalling above 1e8 | NO. Same 1e12 pass the sibling queues; this file adds beta's profile as a second thing to measure there. h/R -> 1 itself needs only that beta CV^2 stays bounded |

The cheap check not run, and it is the sibling's: the same decomposition at
1e12, which would take the lever arm from ln p <= 17.9 to <= 27.6. Two
additions this file wants from it: the endpoint profile of §3 at that height
(does Delta fall like 1/ln p?), and the shell contributions past d = 30 over a
longer range.
