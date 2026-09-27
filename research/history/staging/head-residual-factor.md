# The head's prime-origin factor: one third of it derives, the mod-30 answer is no, and the rate stays open

<!-- ledger
id: Q-head-residual
status: PARTIAL
todo: Z4
question: What is the head's residual prime-origin factor h/R = 1.09 -> 1.03, and does it derive?
verdict: h - R decomposes exactly and A_forced derives; h/R -> 1 follows from beta CV^2 being bounded, beta CV^2 -> 2 controlling the RATE and not the limit (under it h - R -> D = -0.95, so +8.4661/ln^2 p cannot be the limit law); R is the continuum functional and the integer-origin null sees R + 1/2 exactly, so h - R = 5.679 depends on the unstated null population, reading 5.179 discrete-uniform and 2.925 coprime-to-30; the mod-30 answer is NO by a valid route, class term -0.0001; Delta = 2 - beta is priced by HL to 5.3 percent with nothing fitted and HL's own 1/ln x term absorbs the miss, so the 5.5 s.e. framing is dropped; the asymmetry-as-mechanism claim and the [0.289, 0.361] bracket are refuted, hl3's 16 percent standing; beta_null is 1.898 for the discrete-consistent null and 2 in the continuum; the 72/28 split reads 81/19 in the other exact order; c = 0.844 is 0.722 on a subset, pinned to 15 percent; Delta_HL ln p/lnln p = 4.02 is a property of the prediction; and the N4 plateau is not OPEN, needing beta CV^2 = 2.71 rising to 6.63.
-->

STATUS: HELD, staging. Not integrated, not red-teamed. Companion script
`research/history/staging/head-residual-factor.js` (embedded, 1.5 s, seeded
bootstrap, `--check` green). It reproduces every figure of
`research/destroyer-census-01.js` SEC 6(b) from an independent segmented sieve
before it computes anything new; if that control had failed nothing below would
stand.

Task: TODO Z4, head half. The question asked was whether the residual
prime-origin factor 1.09 → 1.03 of `destroyer-census-01.md` §6(b) is the mod-30
small-h class correlation of §6(c), and whether it has a derivable form.

---

## 0. What is still open, and what failed

**No derivation of the residual was reached.** The residual is still MEASURED.
What changed is that it is now an exact algebraic identity in three parts, one
of which has a closed form and two of which do not.

**The RATE is not settled and the measurement cannot settle it.** h/R → 1
follows from β CV²(g) staying bounded, which is far weaker than the product
reaching 2 (§3). What the product decides is how fast h/R − 1 falls: like
1/ln²p if it tends to 2, like 1/ln p if it settles anywhere else. Over 1e4 to
1e8 it runs 0.7993 → 1.2326: rising, still short, and with no argument here
that it arrives.

**The competing description is excluded by §3's identity, not by the fit.** A
two-parameter law with a negative plateau, h/R − 1 = −0.0315 + 1.036/ln p, fits
the six half-decade windows better (χ²/df 0.762) than the one-parameter law
(0.883). Sustaining that plateau needs β CV² = 2.713 at ln p = 17.9, 3.208 at
27.6 and 6.633 at 100, against a measured 0.7993 → 1.2326, so it is
structurally unavailable unless β diverges [MEASURED, `redteam-0828-head.js`].
It fits better on six points and is not a live description.

**One prior candidate was checked and does not apply.** `origin-excess.md`'s
ρ(2) → e^{2γ}/4 = 0.79305 is the origin's survival density against the ensemble
of translates at sieve level u = 2. It is a different object from the forward
recurrence residual here: R is built from the window's own MEASURED twin gaps,
so every Mertens-to-HL constant, e^{2γ}/4 included, is already inside R. The
residual sits on top of a calibrated baseline. Reading `origin-excess.md` first
was the right instruction and the answer is that it does not carry over.

---

## 1. The objects, pinned against the embedded data

Definitions taken from `research/destroyer-census-01.js` (lines 368–445, SEC 6)
and re-implemented independently:

- **twin opener** a: a and a+2 both prime.
- **F(p)** for a prime p: the first twin opener strictly above p, minus p. A
  prime that is itself an opener therefore takes the full forward gap. This is
  the census's `head`, and the same object as `zonegap-01.js`'s zone head
  a_first − p, since every prime is a zone origin.
- **h**: the mean of F over all primes ≥ 7 in the window (5,096,856 of them in
  [1e7,1e8), the whole prime count of the decade less 20 censored at the range
  end).
- **g_i**: the gaps between consecutive twin openers; **R = Σg²/(2Σg)**, the
  CONTINUUM inspection-paradox functional of the same window's twin gaps. A
  discrete uniform integer origin sees R + 1/2 exactly, an odd origin R + 1,
  and an origin drawn from the coprime-to-30 residues that primes ≥ 7 occupy
  sees R + 2.754 at [1e7,1e8) [MEASURED, `redteam-0828-head.js`, five decades].
  Read h − R against whichever null population is meant; against the
  coprime-to-30 one it is 2.925, not 5.679.

The five windows and their measured ratios, quoted from the census's embedded
block and reproduced byte-identically by the companion script's SEC 0:
h/R = 1.0924, 1.0780, 1.0416, 1.0347, 1.0254 over [11,1e4), [1e4,1e5),
[1e5,1e6), [1e6,1e7), [1e7,1e8). In absolute terms, with gaps binned by their
left opener, SEC 1 gives h − R = 4.001, 6.007, 4.932, 5.696, 5.679, all
against R as written. Against the discrete nulls of the bullet above the top
window reads 5.179, 4.679 and 2.925. The ratio falls because R grows, not
because the excess shrinks.

---

## 2. The identity, and the one piece with a closed form

Bin the primes by the twin gap that contains them. Gap i runs [a_i, a_{i+1}),
holds n_i primes, and its primes' forward distances sum to S_i. Then

    h − R = A + B,        exactly, asserted to 1e-9 at every window
    A = Σ(S_i − n_i g_i/2) / Σ n_i      within-gap placement
    B = Σ n_i g_i /(2 Σ n_i) − R        length-versus-count coupling

B is exactly one half of (mean containing gap seen by a PRIME) minus (mean
containing gap seen by an INTEGER). It vanishes when n_i is proportional to g_i.

**The derived part [PROVEN, conditional on PNT and Hardy-Littlewood].** Split
A = A_forced + D. Every twin gap contains its own left opener a_i and a_i + 2,
both prime, both at the extreme left of the gap, so both carry near-maximal
forward distance; the right opener's forced pair belongs to the NEXT gap. That
asymmetry is worth, against the uniform-within-gap surrogate, exactly g_i − 2 per
gap, so

    A_forced = (E[g] − 2)/E[n] = 1/λ − 2λ₂/λ = ln p − 4C₂/ln p + o(1)

using λ = 1/ln p and λ₂ = 2C₂/ln²p. Measured against the closed form at the six
half-decades: 11.998 against 11.971, 13.157/13.142, 14.313/14.310,
15.480/15.475, 16.639/16.638, 17.802/17.800. The agreement tightens with height,
as an o(1) error term should. This is the piece that derives.

**The remainder of A [MEASURED, no derivation].** D = A − A_forced runs −0.661,
−0.906, −0.987, −0.860, −0.919, −0.955 across the same windows. The non-forced
primes sit very slightly late inside their gap, worth about one unit, flat. Not
derived, and small enough that it does not drive anything.

---

## 3. B, and where the limit question actually lives

B is not a residue effect and not a small correction. It is the largest single
term after A_forced: −3.119, −4.303, −7.085, −8.594, −10.883 across the decades.

**B is an exact identity in a regression coefficient [PROVEN, algebra].** Let α
and β be the OLS slope and intercept of a gap's prime count n_i on its length
g_i. Then

    B = Var(g)(α − λ)/(2 E[n]) = − β Var(g) / (2 E[g] E[n]) ≈ − (β CV²(g)/2) ln p

asserted to 1e-9 at every window, with the ln p form matching to four figures
(−10.882 against −10.883 at [1e7,1e8)). So the sign of the whole prime-origin
excess is decided by one question: does a twin gap hold more or fewer primes
than its length alone predicts.

**β is measured, not derived [MEASURED].** β = 1.028, 1.079, 1.310, 1.314,
1.379 across the decades, against a null of 2 − 2λ_bulk = 1.898 at [1e7,1e8),
the density-consistent discrete value in the convention this β uses; the
continuum value is 2 exactly. Putting the two forced left-end primes on a
full-density λ interior instead gives 2 − 2/ln p = 1.887 and over-counts the
gap's primes. The measured value is well below either null throughout,
which is the expected direction: a twin gap is defined by the ABSENCE of an
opener inside it, and suppressing openers suppresses primes. Expected direction
is not a derivation, and no derivation of β is offered here.

**The limit question, stated so it can be attacked.** Putting the three parts
together,

    h − R = [ln p − 4C₂/ln p] + D − (β CV²(g)/2) ln p

so h − R is bounded iff β CV²(g) → 2. The limit h/R → 1 needs much less,
namely β CV² = o(ln p) and D = o(ln²p), because R grows like ln²p while h − R
is O(ln p); the measured R/(1/λ) runs 7.15, 9.07, 10.68, 12.66 up the decades.
What β CV² → 2 decides is the RATE: 1/ln²p if it holds, 1/ln p if the product
settles anywhere else.

That correction bites once more. Under β CV² → 2 with D → −0.95 the identity
sends h − R to D, so h falls BELOW R and h/R − 1 approaches 0 from the negative
side: at ln p = 27.6 the limit form gives −1.69e-3 while the accepted fit
+8.4661/ln²p gives +1.11e-2. The accepted law is a local fit whose coefficient
must change sign under this file's own conjecture, not a candidate limit law
[MEASURED, `redteam-0828-head.js`].

Measured β CV² = 0.7993, 1.0849, 1.1193, 1.2326 over the four decades above
1e4. Both factors are rising (CV² 0.7406 → 0.8941, β 1.079 → 1.379) and
CV² → 1 is a Hardy-Littlewood statement for twin gaps, so β → 2 is what would
be needed. Nothing here shows it. This is the sharpest form of Z4's open half,
and what is open in it is the rate.

---

## 4. Z4's specific question: is it the mod-30 class correlation? NO

The like-for-like excess is h − R_cop30 = 2.9253 at [1e7,1e8), the origin
population being the coprime-to-30 residues primes ≥ 7 occupy (§1). Against it:

1. The residue marginal's own mean shift, Σ_c c·(P_meas(c) − P_null(c)) over the
   full 5,761,432-head ensemble, is **−0.0854** (companion script SEC 4). Wrong
   sign, and 2.9% of the magnitude to be explained.
2. Binning heads by the origin's class mod 30 and subtracting the per-class
   marginals first, h − R_cop30 = 2.9253 = 2.9254 within-class + **−0.0001**
   class-reweighting. The class correlation carries −0.0001 of the excess,
   0.002 percent [MEASURED, `redteam-0828-head.js`, one window].

That is four orders of magnitude short, and the answer to Z4's question as
posed is no. The class correlation is real and it is a separate O(0.1) effect.

Two earlier routes to the same answer are dropped because neither is a bound.
A total-variation bound of 0.563 and a small-h confinement bound of 0.522 both
assume the mod-30 histogram constrains where the mass sits in h: mass moved
from h = 2 to h = 302 shifts the mean by 300 and leaves the histogram
unchanged, and the same holds in reverse. The verdict was right and the route
was invalid.

---

## 5. What a derived head law would buy, and how close this gets

The R0 decomposition is head + Z₂ + tail ≤ width (`zonegap-02-reduction.js` SEC
B, exact per zone). Z4 asks for one of the three pieces with a derived law. This
gets the head to a product of three factors, each separately measured:

    c_h = c_g × (1 + CV²(g))/2 × (h/R)

where c_h and c_g are the window's head and twin-gap coefficients against ln²p.
Measured ratio of that product to the measured c_h: 0.9953, 0.9956, 0.9967,
0.9977 on the four decades above 1e4 (0.9603 on [11,1e4), whose ln²p average
spans three decades). At [1e7,1e8) the product gives 0.7360 against a measured
0.7344.

So the head coefficient's derivation reduces to CV²(g) → 1 and
c_g → 1/(2C₂), both Hardy-Littlewood. h/R → 1 needs only that β CV² stays
bounded. Granted the two HL limits, c_h → c_g → 1/(2C₂) = 0.7574 and the head
has a zero-parameter law. Neither is established here, and neither is something
this programme is going to prove: HL is doing more work in this file than it is
credited with, since A_forced's 4C₂/ln p term rests on it too.

Nothing in this file touches Z₂, and nothing in it bears on the conjecture.

---

## Defects noticed in passing

- `destroyer-census-01.md` §6(b) quotes head coefficients "0.7064 → 0.7344
  across windows" while §6(a) of the same file quotes 0.6693 on band
  [3163,1e4). Both are correct for their own ensemble (zone origins in a narrow
  band against all primes in a decade window), but the file does not say so, and
  a reader lands on an apparent inconsistency.
- `destroyer-census-01.md` §6(b) calls R the mean forward recurrence a uniform
  origin would see and reads h/R = 1.09 → 1.03 against it. R is the continuum
  functional; a discrete integer origin sees R + 1/2 and a coprime-to-30 origin
  R + 2.754 at [1e7,1e8), so the ratio there is quoted against a population no
  prime belongs to. That file is owned elsewhere and the correction is owed
  there.
- `research/GLOSSARY.md` has no entry for **head** or **tail**, though both are
  load-bearing in Z4 and in the R0 chain. They are defined only in the
  `zonegap-01.js` / `zonegap-02-reduction.js` headers.
- `attack-02-head-bias.js` uses "head" for the head of a primorial period, a
  different object from the zone head. Vocabulary collision, currently
  unmarked.

---

## What would falsify this, and whether that check has run

| Claim | Rung | Falsifier | Run? |
|---|---|---|---|
| h − R = A + B, and B = −βVar(g)/(2E[g]E[n]) | PROVEN (algebra) | any window where the assertion misses at 1e-9 | YES, asserted at all five decades and all six half-decades, green |
| A_forced = ln p − 4C₂/ln p + o(1) | PROVEN cond. on PNT+HL | the measured (E[g]−2)/E[n] departing from ln p − 4C₂/ln p by more than o(1) | YES, six half-decades, agreement tightening to 0.002 at the top |
| The residual is not the mod-30 class correlation | MEASURED | the class-reweighting term carrying a sizeable share of the like-for-like excess | YES, one window: the term is −0.0001 against h − R_cop30 = 2.9253, 0.002% |
| D ≈ −0.9, flat | MEASURED | growth with ln p over a longer lever arm | PARTIAL, six half-decades only, 1e5 to 1e8 |
| β CV² → 2, hence h − R bounded | CONJECTURED | β CV² stalling below 2 above 1e8 | NO. Needs the 1e12 pass; this is the check to queue |
| h/R → 1 | PROVEN from §3's identity, given β CV² = o(ln p) and D = o(ln²p) | R failing to grow like ln²p, or D growing like ln²p | PARTIAL. R/(1/λ) is measured rising 7.15 → 12.66; D is measured flat at −0.9 over six half-decades and is not derived bounded |
| h/R − 1 falls like 1/ln²p, not 1/ln p | MEASURED | the 1/ln p law fitting | YES, 1/ln p rejected at χ²/df 8.127 on 5 df; 1/ln²p accepted at 0.883 |
| The N4 plateau h/R − 1 → −0.0315 is not available | PROVEN from §3's identity, unless β diverges | β CV² reaching 2.713 at ln p = 17.9 and 6.633 at 100 | YES, from the identity. The fit alone does not discriminate: 0.762 against 0.883 on the same six points, and those data discriminate the RATE, not the LIMIT |

The one cheap check not run: the same decomposition at 1e12 on the box, which
would extend the β CV² lever arm from ln p ≤ 17.9 to ≤ 27.6 and separate the two
model families. It reuses this script's engine unchanged and is a one-number
addition to TODO Z7's item (3).
