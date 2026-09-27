# Red team, 2026-08-28: the three head-residual notes, one refuted equivalence, one comparator artefact, and an HL pricing that reproduces digit for digit

<!-- ledger
id: Q-redteam-0828-head
status: ANSWERED
todo: Z4
question: Do the three 2026-08-28 head-residual notes survive an adversarial re-derivation of every load-bearing claim on independent code?
verdict: Mostly yes on the numbers and no on two framings: "h/R -> 1 iff beta CV^2 -> 2" is REFUTED (the limit needs only boundedness, the product controls the RATE), and 9 to 59 percent of the quoted h - R is the choice of comparator, since R is the continuum functional and a discrete uniform origin sees R + 1/2 exactly.
-->

STATUS: HELD, staging. Adversarial pass over `head-residual-factor.md`,
`head-residual-null.md`, `head-residual-hl3.md` and their scripts, before any
of the three reaches a live document. Method: refuted-until-rederived. Every
decisive statistic was recomputed from the definitions on a different code
path in `research/history/staging/redteam-0828-head.js` (embedded, 2.0 s,
no random numbers, `--check` green), which re-sieves [11, 1e8) with an
independent odd-only segmented engine and reimplements the Hardy-Littlewood
local factors from the definition of the singular series rather than from the
siblings' incremental-log routine. `node research/qc/embed.js --check` is green
on all three target scripts and reports one advisory (the null script's
READINGS carry the figure 8.4661, which is the sibling's refit, not its own).

---

## 0. Scoreboard

Most load-bearing correction first. The corrected sentence for each WEAKENED or
REFUTED row is in §2.

| # | Claim, and where | Grade | On what |
|---|---|---|---|
| 1 | factor §3: "h/R -> 1 iff beta CV^2(g) -> 2", and §5's "reduces to exactly two limits" | **REFUTED** | h - R is O(ln p) for any bounded beta CV^2 and R grows like ln^2 p, so h/R -> 1 follows from boundedness alone. The product controls the RATE, not the limit |
| 2 | factor §1 and census §6(b): R is "the mean forward recurrence a UNIFORM origin would see" | **REFUTED** | A discrete uniform integer origin measures R + 1/2 exactly (asserted, and 0.5000 at all five decades); odd R + 1; coprime-to-30 R + 2.754; coprime-to-210 R + 3.340 |
| 3 | factor §4 bounds 2 and 3 on the mod-30 route (0.563, 0.522) | **WEAKENED**, verdict CONFIRMED | Neither is an upper bound. The valid decomposition with per-class marginals subtracted first puts the class-correlation term at -0.0001, 0.002 percent of h - R, not "an order of magnitude short" |
| 4 | factor §0 and its table: the N4 plateau h/R - 1 -> -0.0315 is a live competing description, listed OPEN | **REFUTED as OPEN** | The plateau needs beta CV^2 = 2.713 at ln p = 17.9, 3.208 at 27.6, 6.633 at 100. The note's own identity excludes it unless beta diverges |
| 5 | null §1: "beta_null = 2 exactly", and its correction of the sibling's 2 - 2/ln p | **WEAKENED** | 2 is the continuum value. The density-consistent DISCRETE null, in the convention the measured beta uses, is 2 - 2 lambda_bulk = 1.898. The sibling's 1.887 was off by 0.011, not by 0.113 |
| 6 | hl3 §0 and title: "HL over-predicts at 5.5 standard errors" | **WEAKENED** | 5.49 OLS s.e., 6.51 interleaved-jackknife s.e., 3.31 contiguous-jackknife s.e. It is a 0.276 percent miss in alpha amplified 19.29x by the near-cancellation in Delta = E[g](alpha - lambda_s), and HL's own 1/ln x term at ln x = 17.7 is the same size as the miss |
| 7 | null §3 reading 2: "the asymmetry is the mechanism naming itself" | **REFUTED** | Direct measurement, no model: 11.9752 primes per pair above the pair centre against 11.9807 below, out to s = 199 over 381,332 pairs, a 0.70 Poisson sd difference |
| 8 | null §3 reading 3: the pair's two slots are 6 lambda_s to 7.5 lambda_s, "roughly half" of Delta | **REFUTED**; hl3's correction CONFIRMED | 2 lambda_s = 0.0963 (15.5 percent of Delta) and 2 lambda_bulk = 0.1020 (14.1 percent of the d < 120 profile total). hl3's "16 percent not 52" is right |
| 9 | hl3 §5: Delta = O(lnln p/ln p), "Delta_HL ln p/lnln p = 4.02 stable" | **WEAKENED** | 4.019, 4.004, 4.025 is a property of the PREDICTION, which has the log divergence built into it. The measured version is 3.504, 3.857, 3.822 and is not flat |
| 10 | hl3 §0: the one-opener sum diverges at c = 0.844 per nat | **WEAKENED** | D(T) reproduces exactly (3.429, 5.688, 8.475, 12.924). The slope does not: c = 0.722 on a four-point subset of the same points, so c is pinned to about 15 percent |
| 11 | null §2: beta carries 72 percent of the shortfall at [1e7,1e8), rising | **WEAKENED** | Arithmetic exact. It is one of two equally exact decompositions; the other order reads 80.96 / 19.04 at the same window. The rise survives both |
| 12 | hl3 §1: "rho's own mean, which HL's normalisation forces to 1" | **WEAKENED** | Nothing forces it at finite g. It is a Gallagher-type average, approached: the note's own 0.9582 -> 0.9910 is the approach, not a check that passed |
| 13 | factor §2: h - R = A + B "exactly, asserted to 1e-9" | CONFIRMED, and it is a tautology | A and B are defined as h - h1 and h1 - R. The assertion tests floating point, not content. The content is B's regression form, which is a real identity and does re-derive |
| 14 | factor §2: A_forced = (E[g]-2)/E[n], the forced-pair argument, and = ln p - 4C2/ln p | CONFIRMED | Re-derived: actual 2g - 2 against surrogate g gives exactly g - 2 per gap. Reproduced 11.998/11.971 and 17.802/17.800. Split into its two halves it is tighter than the note claims: 1/lambda = 17.949 against ln p = 17.947, and 2/E[n] = 0.1471 against 4C2/ln p = 0.1471 |
| 15 | factor §3: B = -beta Var(g)/(2 E[g] E[n]) | CONFIRMED | Re-derived from the OLS normal equations, asserted to 1e-9 at all five decades on independent code |
| 16 | factor: the fit comparison, same points, honest sigma | CONFIRMED | Jackknife errors instead of the bootstrap: N1 8.4771 at chi2/df 0.832 (note 0.883), N2 0.4943 at 7.989 (note 8.127), N4 at 0.700 (note 0.762). Both models use the same six points and the same errors in the note's own `wls` |
| 17 | null §1: CV^2_null = 1, D_null = 0, h - R = -4C2/ln p, h/R - 1 = -8C2^2/ln^3 p = -3.4865/ln^3 p | CONFIRMED | Re-derived by hand from the cluster null. The chi2/df 1362 is confirmed in order of magnitude and the sign is wrong at every window |
| 18 | null §3: beta = 2 - (alpha - lambda_s)/lambda_2, E[n] = 1/theta | CONFIRMED | Equivalent to Delta = E[g](alpha - lambda_s), reproduced at three windows |
| 19 | null §0: the variance note's sub-Poisson constant does not transport | CONFIRMED | `paper/variance-note.md` §2 does carry the sum rule (line 96) and does say the full-period window has variance 0, so the renewal plateau the identity needs does not exist |
| 20 | hl3 §1: psi's local factors, 3*P5, the live set t = 0, 2 mod 6, 6 \| g | CONFIRMED | Re-derived by hand for q = 2, 3 and q >= 5. Independent computation gives 3*P5 = 2.164809078 against the published-triplet route 2.164809087 |
| 21 | hl3 §1: rho is exactly reflection-symmetric about a twin pair | CONFIRMED | Re-derived: {0,u,u+2} reflects to {0,2,u+2}, so the symmetry is about the pair centre a+1, not about the opener. Confirmed independently by measurement (row 7) |
| 22 | hl3 §3: Delta_HL = 0.7914, 0.7124, 0.6545; the binned profile; L/R 4.079 against 4.232; share 0.796 against 0.761; r = 0.9989 | CONFIRMED | Every figure reproduced to the printed digit by an independent implementation of rho built from nu_q of the two tuples |
| 23 | hl3 §0: HL is stronger than what it supports | CONFIRMED, and under-applied | It applies equally to the factor note's A_forced (HL for the twin density) and to its CV^2 -> 1, neither of which is flagged there |

Nothing in the three notes is refuted numerically. Two framings are refuted,
one measured route is invalid though its verdict is right, and the HL pass
reproduces on independent code without a single figure moving.

---

## 1. The two refutations, at length

### 1.1 "h/R -> 1 iff beta CV^2 -> 2" is false [REFUTED]

The identity is right. Writing it out from the note's own three parts,

    h - R = (1/lambda)(1 - beta CV^2/2) + D - 2/E[n],   R = E[g](1 + CV^2)/2

which the script asserts to 2e-9 at every decade. The inference from it is not.
1/lambda is one mean prime gap, so the first term is O(ln p) whenever
beta CV^2 is bounded, while R grows like ln^2 p; the measured ratio
R/(1/lambda) runs 7.15, 9.07, 10.68, 12.66 up the decades and is itself of
order ln p. So (h - R)/R is O(1/ln p) for any bounded beta CV^2, and
h/R -> 1 follows from boundedness alone.

What beta CV^2 -> 2 buys is h - R = O(1), which is the difference between
h/R - 1 falling like 1/ln^2 p and falling like 1/ln p. That is a claim about
the RATE. The note's own falsification table says as much in its last row
("the data discriminate the RATE, not the LIMIT") and then §3 and §5 state the
opposite. The two cannot both stand.

The correction bites twice more. First, under beta CV^2 -> 2 with D -> -0.95,
h - R tends to D, so h falls BELOW R and h/R - 1 approaches 0 from the negative
side: at ln p = 27.6 the limit form gives -1.69e-3 while the accepted fit
+8.4661/ln^2 p gives +1.11e-2. The accepted law is therefore a local fit whose
coefficient must change sign under the note's own conjecture, not a candidate
limit law. Second, the reduction in §5 loses a limit: c_h -> c_g x (1+CV^2)/2 x
(h/R) needs CV^2 -> 1 and c_g -> 1/(2 C2), both Hardy-Littlewood, while
h/R -> 1 is nearly free. "Exactly two open limits" is one open limit and HL.

### 1.2 The comparator carries 9 to 59 percent of the quoted excess [REFUTED]

R = sum g^2/(2 sum g) is the CONTINUUM inspection-paradox functional. Summing
the forward distance over the integers of a gap gives g(g+1)/2, so a discrete
uniform integer origin measures

    (sum g^2 + sum g)/(2 sum g) = R + 1/2   exactly

and the script measures exactly R + 1/2 at all five decades. An odd origin
measures R + 1. A coprime-to-30 origin, which is the population primes >= 7
actually live in, measures R + 2.754 at [1e7,1e8); coprime-to-210 measures
R + 3.340. So at [1e7,1e8) the "prime-origin excess" reads

    h - R = 5.679, h - (R + 1/2) = 5.179, h - R_cop30 = 2.925, h - R_cop210 = 2.340.

None of the notes states which null population the excess is measured against,
and the number roughly halves between the stated one and the natural one. The
identity h - R = A + B and the product c_h = c_g x (1+CV^2)/2 x (h/R) are
untouched, since both are defined with R as written. What moves is every
sentence that reads h - R as a property of primes.

---

## 2. Corrected sentences

Replacements, ready to paste, one per REFUTED or WEAKENED row.

- factor §3, last paragraph: "so h/R -> 1 iff beta CV^2(g) -> 2" becomes
  "so h - R is bounded iff beta CV^2(g) -> 2. The limit h/R -> 1 needs much
  less, namely beta CV^2 = o(ln p) and D = o(ln^2 p), because R grows like
  ln^2 p while h - R is O(ln p). What beta CV^2 -> 2 decides is the RATE:
  1/ln^2 p if it holds, 1/ln p if the product settles anywhere else."
- factor §5: "reduces to exactly two limits: CV^2(g) -> 1 ... and h/R -> 1"
  becomes "reduces to CV^2(g) -> 1 and c_g -> 1/(2 C2), both Hardy-Littlewood.
  h/R -> 1 needs only that beta CV^2 stays bounded."
- factor §1, the R bullet: "the mean forward recurrence a UNIFORM origin would
  see" becomes "the CONTINUUM inspection-paradox functional of the same
  window's twin gaps. A discrete uniform integer origin sees R + 1/2 exactly,
  an odd origin R + 1, and an origin drawn from the coprime-to-30 residues that
  primes >= 7 occupy sees R + 2.754 at [1e7,1e8). Read h - R against whichever
  null population is meant; against the coprime-to-30 one it is 2.925, not
  5.679."
- factor §4: drop bounds 2 and 3 and replace with "Binning heads by the origin's
  class mod 30 and subtracting the per-class marginals first,
  h - R_cop30 = 2.9253 = 2.9254 within-class + (-0.0001) class-reweighting.
  The class correlation carries -0.0001 of the excess, 0.002 percent. It is not
  the residual, by four orders of magnitude." (The old bound 2 is not a bound:
  mass moved from h = 2 to h = 302 shifts the mean by 300 and leaves the mod-30
  histogram unchanged. The old bound 3 is not a bound either, for the same
  reason in reverse.)
- factor §0 and the table's last row: "h/R -> 1 rather than to a plateau below
  1 | OPEN" becomes "the plateau model N4 is excluded by the identity of §3
  unless beta diverges: sustaining c0 = -0.0315 needs beta CV^2 = 2.713 at
  ln p = 17.9, 3.208 at 27.6 and 6.633 at 100, against a measured 0.80 -> 1.23.
  It fits better on six points and is structurally unavailable."
- null §1: "The sibling's quoted null 2 - 2/ln p is not density-consistent"
  becomes "The sibling's quoted null 2 - 2/ln p puts the two forced primes on a
  full-density interior. Thinning the interior to lambda_s over the g - 2
  positions the pair does not occupy gives beta = 2 - 2 lambda_bulk = 1.898 in
  the convention the measured beta uses; 2 exactly is the continuum value,
  reached by letting the interior run over the full length g. The sibling's
  1.887 is off by 0.011, not by 0.113, and the 0.102 between 1.898 and 2 is the
  same object hl3 §4 prices as the pair's two slots."
- null §2: "beta is the larger carrier at every window and its share is rising"
  keeps its verdict but adds "the 72/28 split is one of two exact
  decompositions of 2 - beta CV^2; taking the factors in the other order reads
  81/19 at the same window. The rise survives both orders."
- null §3 reading 2: withdraw, as hl3 §4 already asks. Add the direct evidence:
  "measured over 381,332 pairs, the prime count per pair at centre-distance +s
  and -s agrees to 0.70 Poisson sd out to s = 199, so there is no physical
  asymmetry to name."
- null §3 reading 3: replace [0.289, 0.361] with "2 lambda_s = 0.0963, 15.5
  percent of Delta". The per-live-slot conversion 30/8 does not belong: the
  continuum null charges 2 units of length at density lambda_s, not two live
  slots at the per-live-slot density.
- hl3 §5: "Delta_HL x ln p/lnln p = 4.022, 4.005, 4.025 across the three
  windows, flat to 0.5 percent" becomes "flat to 0.5 percent, which is a
  property of the prediction and not a measurement: the log divergence is built
  into the model that produces it. The measured version, 3.506, 3.857, 3.822,
  is flat only over the top two windows."
- hl3 §0 and title: "HL over-predicts it at five standard errors" becomes
  "HL over-predicts it by 5.3 percent, which is 5.49 OLS standard errors, 6.51
  interleaved-jackknife and 3.31 contiguous-jackknife. The statistical
  significance is not the binding number: the miss is a 0.276 percent
  discrepancy in alpha amplified 19.29x by the near-cancellation in
  Delta = E[g](alpha - lambda_s), and it sits inside HL's own unquantified
  1/ln x term at ln x = 17.7. It is not evidence against HL."
- hl3 §0: "fitting c ln T + C with c = 0.844 over [1e3, 2e5]" becomes "with
  c = 0.844 over six points in [1e3, 2e5]; a four-point subset of the same
  points gives 0.722, so c is pinned to about 15 percent."

---

## 3. The cross-note corrections, checked against the earlier note's own data

Three later corrections were checked against the data of the note they correct.

1. **52 percent -> 16 percent** (hl3 §4 against null §3 reading 3). CONFIRMED.
   The null note's own statistic sums lambda_bulk - count_d/gaps over every d,
   a flat baseline, so two skipped slots are worth 2 lambda_bulk = 0.1020, and
   in the Delta = 2 - beta object they are worth 2 lambda_s = 0.0963. Against
   Delta = 0.6214 that is 16.4 and 15.5 percent; against the d < 120 profile
   total 0.7236 it is 14.1 percent. The bracket [0.289, 0.361] is over-priced
   by about 3x, as hl3 says.
2. **2 - 2/ln p -> 2** (null §1 against factor §2b). PARTIALLY CONFIRMED, and
   it over-corrects. The 14 percent over-count in the sibling's model is real
   arithmetic. The replacement is a continuum value; the discrete convention
   that the measured beta lives in gives 1.898. Both nulls tend to 2, so no
   downstream conclusion moves, and the residual 0.102 is exactly the object of
   correction 1 above. The two corrections are the same correction seen twice
   and neither note says so.
3. **left-heavy -> symmetric** (hl3 §4 against null §3 reading 2). CONFIRMED,
   and now established without HL. hl3 argues from rho's reflection symmetry,
   which re-derives correctly ({0,u,u+2} reflects to {0,2,u+2}, so the symmetry
   is about the pair centre a+1, one position left of the opener the null note
   measures from). The direct measurement in §1 needs no model at all: 11.9752
   against 11.9807 primes per pair out to s = 199, 0.70 Poisson sd.

---

## 4. The chain that survives, at its rung

At [1e7, 1e8), h - R = 5.679 is an exact decomposition A_forced + D + B whose
two closed pieces re-derive: A_forced = (E[g] - 2)/E[n] is forced by the two
primes at each gap's left end and equals ln p - 4C2/ln p to PNT and HL
[PROVEN, conditional on both, and reproduced with each half checked separately],
and B = -beta Var(g)/(2 E[g] E[n]) is an identity in the OLS of prime count on
gap length [PROVEN, algebra]. Of the 5.679, at least 0.500 and plausibly 2.754
is the choice of null origin rather than a property of primes [MEASURED]. It is
not the mod-30 class correlation, which carries -0.0001 of the like-for-like
excess [MEASURED, and the sibling's route to that answer was invalid while its
answer was right]. h/R -> 1 does not depend on beta CV^2 -> 2 [PROVEN from the
identity]; the product controls only whether h/R - 1 falls like 1/ln^2 p or
1/ln p, and the six-window fit prefers 1/ln^2 p at chi2/df 0.83 against 7.99
[MEASURED, n = 6, jackknife errors, and the finer discriminations flip with the
parameterisation: fitting h - R prefers k lnln p over a constant while fitting
h/R - 1 prefers the un-modulated form]. Delta = 2 - beta is the g-independent
endpoint prime deficit [PROVEN, algebra], and Hardy-Littlewood triple constants
price it to 5.3 percent with nothing fitted, over-predicting at every window
[MEASURED against HEURISTIC, reproduced digit for digit on independent code].
Nothing derives below HL, and HL implies the conjecture the programme attacks,
so the head half of Z4 is smaller and more clearly conditional than it was, and
no route opened.

On the headline sentence "measured consistent with HL to 5 percent, nothing
derived beyond HL, with a 5.5 s.e. same-sign residual": the first two clauses
STAND. The third should be dropped or restated. The residual is same-sign at
three windows and at four cuts, which is the honest content, but 5.5 s.e. is a
statistical figure for a 0.276 percent miss in alpha that HL's own error term
at this height can absorb whole, and the same quantity reads 3.31 s.e. under a
contiguous-block jackknife. Reporting it as "5.5 s.e." invites the reader to
treat a 5 percent agreement with a zero-parameter conjecture as tension with
that conjecture.

---

## Defects noticed in passing

- `research/QUESTIONS.md` carries all three notes under the single id
  `Q-head-residual` and shows the null note's verdict as the row verdict. The
  hl3 note is the later and the correcting one, and its verdict ("measured
  consistent with HL to 5 percent") does not surface in the index at all. A
  briefer who reads only QUESTIONS.md gets the superseded reading.
- `head-residual-factor.js` and `head-residual-null.js` refit the same six
  points to the same one-parameter law and print 8.4661 and 8.4704, and
  8.127 and 8.518, because they use different error estimates. Neither file
  says the other's number exists except in the null note's parenthesis.
- `head-residual-null.js` hard-codes the sibling's measured decade table as its
  SEC 1 input (`decLnp`, `decBeta`, `decCV2`, `decEg`, `decEn`, `decHmR`,
  `decD`). The transcription is correct, checked digit by digit against the
  sibling's embedded block, but it is hand-copied numbers inside a script and
  the corpus has a standing rule against exactly that shape.
- This note's ledger block names TODO item Z4, whose `Ledger:` line currently
  reads `Q-head-residual` only. The gate wants `Ledger: Q-head-residual,
  Q-redteam-0828-head`. This pass is fenced out of every existing file, so the
  one-line edit to `TODO.md` is owed and has not been made here.
- `research/GLOSSARY.md` still has no entry for **opener**, **head** or
  **tail**. All three notes flag it. It is still true.

---

## What would falsify this, and whether that check has run

| Claim of this pass | Rung | Falsifier | Run? |
|---|---|---|---|
| A discrete uniform integer origin sees R + 1/2 exactly | PROVEN (sum over a gap is g(g+1)/2) | a window where the measured integer-origin mean differs from R + 1/2 | YES, asserted to 1e-6 and read 0.5000 at all five decades |
| h/R -> 1 needs only bounded beta CV^2 | PROVEN (from the sibling's own identity) | R failing to grow like ln^2 p, or D growing like ln^2 p | PARTIAL. R/(1/lambda) is measured rising 7.15 -> 12.66; D is measured flat at -0.9 over six half-decades and is NOT derived to be bounded |
| the N4 plateau needs beta CV^2 to diverge | PROVEN (same identity) | beta or CV^2 unbounded | NO, and it cannot be run below 1e8. beta is measured in [1.03, 1.38] and bounded only by conjecture |
| the mod-30 class term is -0.0001 | MEASURED | the term growing with height | NO. One window, [1e7,1e8). The prime classes are equidistributed to 5 digits there, so the term is small for a reason that will not reverse |
| the prime field around a twin pair is symmetric | MEASURED | an asymmetry beyond Poisson at some s | YES, 381,332 pairs, all odd s <= 199, worst cut 0.70 sd |
| the HL machinery reproduces | MEASURED, two independent implementations | any figure moving | YES. 3*P5, rho's interior means, Delta_HL at three windows, the binned profile, the L/R ratio, the d<30 share and r = 0.9989 all reproduce to the printed digit |
| the 5.3 percent miss sits inside HL's own 1/ln x term | HEURISTIC | an exact treatment of the HL error term at this height | NO. Only the order is argued, as hl3 §6 already says |
| the fit verdicts survive the error model | MEASURED | a third error model reversing N1 against N2 | PARTIAL. Two error models (the sibling's bootstrap, this pass's jackknife) agree; both rest on the same six windows |
| c = 0.844 is pinned to about 15 percent | MEASURED | a longer T range stabilising the slope | NO. T <= 2e5 in both passes |

The cheap check not run is the one all three notes queue: the same
decomposition at 1e12. Two additions this pass wants from it. First, D at that
height, because "h/R -> 1 needs only bounded beta CV^2" leans on D = o(ln^2 p)
and D is measured flat rather than derived bounded. Second, the mod-30 class
term, which is small here because the prime classes are equidistributed to five
digits at 1e8 and should be checked, not assumed, at 1e12.
