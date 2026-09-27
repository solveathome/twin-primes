# The Zone Postulate: the programme's stated focus

<!-- ledger
id: Q-zone-postulate
status: OPEN
todo: none
question: Is every zone occupied by a twin pair, and what is proven toward it?
verdict: OPEN: the weak form is PROVEN equivalent to the twin prime conjecture (both directions, elementary), the zone's supply is MEASURED to grow like p^2/ln^2 p with margin about p and verified by segmented sieve to 1e11, and the obstruction is named; none of the four attack routes closes it.
-->

*(Adopted 2026-08-16. This document holds the target, its exact logical status,
what we can already prove toward it, what we have measured, and the attack
surface. It is the thing every other artifact in the repo should be able to
point at. Calibration is marked throughout: PROVEN, VERIFIED by exact
computation, MEASURED, CONJECTURED, REFUTED.)*

**Scope.** This document owns the target: its statement, its exact logical
status, what is proven toward it, the measured margins and the four attack
routes. It does not own the state of G₂ (`G2-STATE.md`), the vocabulary
(`GLOSSARY.md`), the triage of which variable to push (`THE-DIALS.md`) or the
work queue (`../TODO.md`).

**Where this stands.** The strong form holds for every prime to 10¹¹, over four
billion primes, zero failures. The sufficient condition is a two-class
Jacobsthal exponent below 2; what is proven is 4.2665. The weak form is
equivalent to the Twin Prime Conjecture.

**"No route in this repository has moved that gap by any amount" was true until
2026-08-18 and is now too strong.** The mean-square form of **Lemma V is proved
unconditionally**, which changes the status of the one estimate the vector-sieve
road was waiting on — though the almost-all exponent it buys is 0, so on its own
it moves nothing. The same expansion also yielded `u_sup`, an unconditional
worst-position bound carrying no maximal law, which read below 4.26645 on four
points — **and which was closed the same day**: extended to nine points over
z = 13..43 it rises at every step to 3.2026, and the bounded family's best
asymptote is **5.46, above β₂**. Real as a bound, not a route.
`research/sift-limit-attack.md` §7e.

**So the honest statement is narrower than it looked for one afternoon: what
moved is the STATUS of Lemma V's mean-square form, not the gap.** The gap is
still 4.2665 against 2, and the sharpest thing known about it is now where the
loss sits — DP1 carries 71% of it, and as of 2026-08-19 its one known mechanism is CLOSED with a theorem: the degree-`k` Boole-Fréchet certificate is unconditional and all-positions but certifies about `(x#)^{1/(2⌊k/2⌋)}`, exponential in `x` at every fixed degree, and the degree it needs diverges like `x/(B log x)` under any polynomial bound `O(x^B)` (`sift-limit-attack.md` §7e, `history/staging/attack-bonferroni-degree.md`).

**Z₂, the zone gap.** The largest gap between consecutive twin openers inside
the zone is an auxiliary object for the infinitude goal in `TODO.md` §THE TARGET. It is not
owned by this document: its definitions, proven statements, measured laws,
legal open set and wall coordinates are consolidated in
`history/staging/z2-state-draft-0829.md` (a HELD draft of a Z2-STATE document,
red-teamed 2026-08-29; whether it is promoted to a live Z2-STATE document
beside G2-STATE or folded in here is open), its measured law in `history/staging/zonegap-01.md`
and `zonegap-03-score.md`, and its relation to G₂ in
`history/staging/object-bridge-read-0829.md`. This document owns the postulate.

## 1. The statement

Fix a prime p and let p′ be the next prime. The **tile** T_p is the residue
pattern of width p# (canonical alias: the primorial wheel mod p#). Its **twin
slots** are the positions r where both r and r+2 are holes, meaning coprime to
p#. The **zone** is the interval (p, p′²).

Two facts make the zone special, and both are elementary.

- Every hole of T_p except 1 exceeds p.
- A hole is composite only if its least prime factor exceeds p, hence only if
  it is at least p′².

So every hole in the zone is a genuine prime, and every twin slot lying wholly
inside the zone is a genuine twin prime pair. This gives the target its
primality-free form:

> **Zone Postulate (strong form).** For every prime p, the first twin slot of
> T_p lies below p′² − 2. Equivalently: the first p-rough twin pair above p
> arrives before p′².
>
> **Zone Postulate (weak form).** The above holds for infinitely many p.

Nothing in either statement mentions primality. They are statements about
where the tile's own grain begins.

## 2. Logical status, stated exactly

**The weak form is equivalent to the Twin Prime Conjecture (PROVEN, both
directions, elementary).**

Forward: if infinitely many zones are occupied, the pairs found are unbounded,
since the zone of p sits above p and p → ∞. So twins are infinite.

Backward: let (r, r+2) be any twin pair with r > 3, and let p be the largest
prime below r. Then p′ = r, so p′² = r² > r + 2, and the pair lies in the zone
of p. Every twin pair therefore occupies some zone, and infinitely many twin
pairs occupy infinitely many zones.

**The strong form implies TPC and imposes additional quantifiers.** Every
zone occupied implies infinitely many zones occupied. A converse from TPC, or
a proof of logical independence, is not supplied here. Uniform occupancy may
be a useful sufficient target, but infinitude needs only the weak form. An
all-sufficiently-large-primes statement must also be distinguished from the
strong form's every-prime requirement. `paper/anchored-note.md` isolates the
corresponding non-annihilation-infinitely-often target on the count side.

## 3. What is proven toward it

- **The Gap Reformulation (PROVEN reduction).** Let G₂(p#) be the largest gap
  between consecutive twin slots in T_p. The tile always carries a twin slot at
  its edge, since p# ± 1 are both coprime to p#, so reading forward from the
  origin the first twin slot lies within G₂ of it. Hence G₂(p#) < p′² − 2
  implies the Zone Postulate at p. Since ln(p#) = θ(p) ~ p, the window p² is
  (ln p#)², so the sufficient condition is a two-class Jacobsthal exponent
  below 2.
- **G₂ ≪ (log q)^{4.2665+ε} (PROVEN, `paper/beta2-note.md`).** The first
  two-class bound at any exponent, via the dimension-2 sieve in primorial
  formulation. The open band is therefore (2, 4.2665].
- **G₂(x#) ≥ g(x#) pointwise (PROVEN, elementary; VERIFIED at every shared
  term of the trusted ladders, ratios 1.00 to 8.55; the count and the ratio
  table live at `G2-STATE.md` §2).** Twin slots are a subset of holes, so an
  interval carrying no hole carries no twin slot. The inequality is free and it
  runs both ways: forward it imports the Rankin-Pintz-Ford-Green-Konyagin-
  Maynard-Tao lower bounds, giving G₂(x#) ≫ x·log x·logloglog x/loglog x,
  apparently the first lower bound recorded for the two-class Jacobsthal
  function; backward it puts a second difficulty floor under route A, priced in
  §6 (`research/two-class-lower-bounds.md`). **Superseded in strength on
  2026-08-19, and by two logs:** substituting `Ω_p = {a_p, a_p−2}` into
  Kalmynin–Konyagin's published construction gives
  `G₂(P(y)) ≫ y (ln y)³ (lnlnln y)²/(lnln y)⁴` for `y ≥ y₀ = 10^{134.1}`,
  derived in full here, adversarially checked, and **not refereed**
  (`two-class-lower-bounds.md` §4c). It does **not** move this postulate's
  margin, which is the point worth carrying: `x²/(x ln³x) → ∞`, so the margin
  stays `x^{1−o(1)}`.
- **Nothing published blocks the band** (searched as tabled in `research/SEARCH-CONVENTIONS.md` §3). Ford's notes confirm no κ = 2 extremal
  example exists in print (`research/sift-limit-attack.md`).
- **The distance is a positivity problem, not a distribution problem
  (ANALYSIS, not a theorem).** All five discard points of the dimension-2 sieve
  were mapped. Distribution hypotheses (EH, GRH, bilinear inputs) enter at
  exactly one of them, which the primorial formulation already saturates for
  free. A perfect distribution oracle moves the exponent by nothing.
- **Certified per-tile floors (PROVEN + VERIFIED, `paper/staircase-note.md`).**
  History-blind per-prime caps force survivors by pigeonhole, giving certified
  twin counts at six levels without locating a single strike. These certify
  twins in a tile, not in a zone, and they do not scale to infinitude.

## 4. What is measured

**The postulate holds for every prime up to 10¹¹ (VERIFIED, exhaustive).**
4,118,054,813 primes checked, 224,376,048 twin pairs found, zero failures, in
599 seconds (`research/window-check.js`).

The margin, and its mechanism, by decade of p. The margin here is
(p′² − p)/(distance from p to the top of the first twin above it), which credits
the whole window against the excess over p alone. It is not the headroom the
strong form actually has; that is window/F, and §5 gives it.

| decade | worst margin in it | distance to first twin above p |
|---|---|---|
| 10¹ | 20 | 8 |
| 10² | 368 | 32 |
| 10³ | 15,852 | 110 |
| 10⁴ | 609,294 | 182 |
| 10⁵ | 2.3e7 | 614 |
| 10⁶ | 1.4e9 | 722 |
| 10⁷ | 7.1e10 | 1,460 |
| 10⁸ | 3.8e12 | 2,618 |
| 10⁹ | 2.7e14 | 3,974 |
| 10¹⁰ | 1.9e16 | 5,540 |

The mechanism is the last column. The distance from p to the first twin above
it grows like log²p, crawling from 8 to about 5,500 across ten decades. The
largest seen anywhere in the run is 8,042, at p = 65,095,731,749. That extreme
sits exactly where Hardy-Littlewood predicts and shows no anomaly: the mean
twin gap there is ln²p/(2C₂) ≈ 470, so the worst case is about 17× the mean,
against an expected extremal factor of ln(2e8) ≈ 19 over the twin pairs in
range. The same check at p ≈ 4.3e9 gives 12.3× against a predicted ~18. So the
first-twin distance grows like ln²p times a slowly growing extremal factor,
call it ln³p to be safe, while the window grows like p². The margin runs away
like p²/polylog, and nothing in eleven decades hints at the postulate being
tight anywhere. **Record-exact since 2026-08-20** (`research/a113274-gap-records.js`,
the full published record ladder A113274 + A113275 adopted under the series
rule): all 82 known twin-gap records, six decades beyond our run, sit under the
ceiling below — worst load 0.8434 at record 75, the last record loading 0.8032 —
and our 8,042 extreme is record n = 41 of that ladder (published gap 8,040,
lesser to lesser; ours measured to the arriving pair's upper member, hence the
2). The margin at the last record is p²/(0.76 ln³p) ≈ 1.12·10²⁹.

**The guard has a constant, and it is published, not ours.** "Call it ln³p to
be safe" was written without one. The right citation is **A. Kourbatov,
"Maximal Gaps Between Prime k-Tuples: A Statistical Approach", J. Integer Seq.
16 (2013) 13.5.2 = arXiv:1301.2242**, whose Table 1 fits maximal twin gaps
against log³p by decade and whose stated ceiling is

> "Maximal gaps between twin primes are less than 0.76 log³ p."

He gives the expected average twin gap as `a = 0.75739 log²p` and the estimator
`E3 = a log p` (Figure 1 caption, p. 9). Measured slopes run below the ceiling
because of the `a·log(x/a)` deficit. The sequence is **OEIS A113274**.

**`0.76 = 1/(2C₂)` is our inference, not his equation, and the notation
collides.** He never writes it. It holds: `1/(2 × 0.6601618) = 0.75739`
exactly, supported by his statement (B) with note 5 (`M_k = C_k = H_k⁻¹`). But
`C₂` means **0.6601618**, the Hardy–Littlewood twin constant, in our notation
and **0.75739** in his, so the identity is only true read in ours. Anyone
carrying it forward must say whose `C₂` they mean.

The linear-in-log³p shape is older still, from **Rodriguez and Rivera's
Conjecture 66**. The refinement credits need care, because two different
Fischer preprints are in his bibliography and they are not interchangeable: the
non-linear formulas are credited to **Fischer [6],** *Maximale Intervalle von
Primzahlenpaaren*, **preprint 2006**, with Wolf; the *Maximale Lücken
(Intervallen) von Primzahlenzwillingen* preprint of **2008 is [5]**, cited
separately for heuristics and computation. Wolf's "G₂(x) in terms of π₂(x)"
item is a **personal communication**, not a document, and cannot be fetched.

Verified against the JIS published article, not a web page
(`research/history/staging/lit-pdf-kourbatov-grob.md`). Version matters here:
the "one-slope-fits-all" sentence was rewritten twice, and only v3 and the JIS
text read as we quote it — v2 says "larger k-tuples", which contradicts its own
"for a fixed k".

That is a stronger guard than any number of ours: `0.76 ln³p` against a window
of `p²`, from published work — and since 2026-08-20 checked record-exact at
every published record, no breach in 82 (`research/a113274-gap-records.js`).

**Retracted 2026-08-18: "flat over nine decades ... with no trend".** The block
campaign's anchored attack measured `max A = (0.49 ± 0.09)·ln³v per decade`,
band 0.321 to 0.571, and read that as flat. Kourbatov's four published slopes —
0.4576, 0.4756, 0.5203, 0.5628 for p below 10⁶, 10⁹, 10¹², 10¹⁵ — sit inside
our band and centre on our value, so the *measurement* replicates his. The
*flatness* does not survive him. Directly under that table he writes: "record
gaps between k-tuples farther from zero have a steeper trendline ... This is not
a 'one-slope-fits-all' situation!" His slopes rise monotonically over the same
decades we called flat. This is the class `research/natal-cap-31-calm-vs-kill.md`
names — a trend asserted on a short run — with the aggravation that here it was
refutable from published data rather than from a new computation, and the
pointer to that data was already at `research/PRIOR-ART.md`:161 and
`research/two-class-lower-bounds.md`:103.

**Custody of the retracted number, kept because it explains the failure:** the
generating scripts live in that attack's scratch directory and are **not** in
`research/`, so it was never reproducible from this repository. It is recorded
at `research/history/staging/attack-block-09-anchored.md` and survived the
self-review at `research/history/staging/attack-block-00-ADJUDICATION.md`. An
unreproducible in-house re-measurement is what got asserted over a published
result the repo already cited twice.

What does survive from that attack is the **normalisation**: the same report
shows `gap/ln²a` climbing 3.6 to 13.0 over the range, so ln³ rather than ln² is
the exponent that holds still, which agrees with Kourbatov. And it remains a
**different object** from §5's localized `M(x, x²)/ln³x`, 2.9 to 4.2 on the engine that measures it directly to x = 9973 (`maxgap-law.md` §8; the second engine, `FOLD-PROFILE.md` §12a, reads 2.14 to 4.39 over a shorter range):
that is the max gap inside one zone, this is the anchored gap across a decade,
and the two constants must not be reconciled.

**The heuristic count is enormous.** With twin density 2C₂/ln²p, the expected
number of twin pairs in the zone is about 2C₂p²/ln²p, which is roughly 3e15 at
p = 10⁹. The postulate asks for one.

## 5. The obstruction, named

**We are bounding a quantity at the origin by the maximum over a region of
width p#.** That is the whole inefficiency. At x = 37, against a window of 1,644,
the worst case gives window / G₂(37#) = 1644 / 528 = **3.11**.

**The headroom is a factor of about p, not p².** The postulate needs the first
slot F to satisfy F < x′², so the margin that matters is window/F, and since
F ≥ x′ always, window/F can never exceed x′. It is saturated: at x = 10⁹ it sits
within a factor 1.0000004 of that ceiling. The genuine advantage of the origin
over the worst case is G₂/F, measured at roughly 7 and growing only
polylogarithmically.

Across the ten computed levels the per-fold growth of G₂ (mean 1.44) slightly
exceeds that of the window (mean 1.41), so window/G₂ sits flat at 3 to 4 with no
trend. In the exponent frame, where the comparison is against x² rather than
against the window x′² − x, the same flatness reads x²/G₂ = 2.08, 1.63, 2.88,
2.56, 2.68, 2.41, 2.59, 3.26, 2.76, 2.59 at x = 5 to 37. That flatness is a
small-number effect, and two independent measurements say so. The certificate
ladder, a proven lower bound on G₂,
gives x²/certificate climbing monotonically at 3.8, 7.8, 18.1, 44.9 at
x = 37, 229, 1009, 4001, so the best construction's share of the window collapses
over a 108-fold range in x (`research/two-class-lower-bounds.md` §10). And the
localized version of the same ratio is already visibly divergent: the largest
twin-slot gap inside the zone, measured as M(x, x²)/ln³x (the window (x, x²)
binds the same gap as (x, x′²) at all seven levels measured, `zonegap-01.md`
§1), sits between 2.9 and 4.2 over a 47-fold range on the engine that measures it
directly (`maxgap-law.md` §8) and between 2.14 and 4.39 on the second engine
over a 40-fold range (`FOLD-PROFILE.md` §12a); the "flat at 3.2 to 3.7" that
stood here was narrower than either (`history/staging/audit-cross-document-constants.md`
A6), so the localized margin is x²/(4.4 ln³x) at the worst case across both
engines (x²/(4.2 ln³x) on the direct engine alone; 3.5 was a midpoint and not
a bound), and it runs away
(`research/maxgap-law.md` §8). Stated plainly, **the full-tile asymptotic margin
the Gap Reformulation depends on is still not directly visible, and every
adjacent measurement that can be pushed further points the right way.**

This is the same anchored-versus-worst-case split the framework keeps
rediscovering. It is the split between β and its rotation ensemble
(`paper/anchored-note.md` §3, Proposition 1), and between the anchored overlap
deficit and the ensemble in the X-channel (`natal-cap-31`). Three appearances of
one phenomenon.

**Two exponents in this problem sit near the boundary value 2, and they sit on
opposite sides of it.**

*G₂'s own exponent is below 2, and by a margin that a short ladder cannot
resolve.* Calibrated against the one-class control, whose true exponent is known
to be 1, the two-class exponent reads **1.50 on the 22 trusted terms (1.57 is
the h₂ control's figure — the reconciliation is `research/G2-STATE.md` §6),
1.3 to 1.8 practical bracket, 1 as a hard floor** (`research/exponent-control.md`
§5, the 22-term refit). Exponent 2 is
disfavoured rather than excluded, and the reason is one-sidedness: a positive log
power inside the truth biases a finite power fit upward, and the bias is positive
in all 40 control windows. Ziller and Morack's h₂, which dominates G₂ pointwise,
reads 1.567 in the same frame over 21 terms. So the object almost certainly sits
below 2 and the proof does not.

*The all-positions exponent θ, measured self-consistently, sits below 2 at
every exactly-measured level.* The instrument that reported it above 2 and
rising took its window from no caller (`theta-ladder-sup.js` fixed `u = 3.2`),
overstating the requirement 1.58× to 2.17×. Self-consistent exhaustive walks
give need/z² = **0.3550 to 0.6119 at z = 13..31, all exact**, inside the zone
budget at every one, and the certificate is positive at every one of the
223,092,870 positions at H = 0.46 z² (`theta-ladder.md` §5b). The crossing is
real and sits in **(31, 47]** (`history/staging/theta-selfconsistent.md`).
What went against us is the price, not the column: the sharp maximal law this
route needs is TPC-implying
(`history/staging/phase1-T4-maximal-law.md`).

**The zone frame tames the destruction ledger (2026-08-19 wave).** In
windows of fixed polynomial scale the fold ladder's multi-kills EXTINGUISH:
the last kill-run of length ≥ 2 lands at p = 181, 331, 421, 457, 631 in windows
of 2·10⁷..2·10¹¹, matching a first-moment law pre-registered and validated
out-of-sample across four decades of window size, the fifth window run blind and
landing in its sealed band [571, 877] (a measured law, and it now carries its own
systematic: the count runs ~20% high at five of five windows, and the per-fold
±3√λ clause FAILS at 43.2% — resolved 2026-08-20: the per-fold error is a
deterministic fold-factor field M_p with Poisson dispersion around the
corrected mean, blind-validated 33/37 at a fresh pre-registered anchor, the
~20% being the exposure-weighted mean of M; anchor-constancy is bounded only
at the ~6–10% one replicate pair affords;
`history/staging/attack-foldL-06-scaling.md`,
`history/staging/foldL-window5.md`,
`history/staging/perfold-error-model.md`,
`history/staging/redteam-0820-empirical.md` §T1). And the tail-count transport,
which cannot chain on the tile, CAN chain here: the (q−2) growth factor
collapses to 1, the qualifying supply hits zero (at p = 701 in the 2·10⁹
window) and stays there. The L = 1 counting statement the chain reduces to
is PROVEN EQUIVALENT to this postulate itself — the residue condition is the
kill condition with zero slack, and the chain sum vanishes iff G₂ < θ
(`history/staging/attack-l1-residue.md`; three lemmas, with T* = G₂ MEASURED
at four of four windows, so the direction that matters rests on a measured
equality, as `OUTCOMES.md`'s row states) — so the zone frame's instruments
stand while its "remaining hypothesis" is the postulate in residue notation;
the genealogy ledger arrives at the same statement from the other direction
(`attack-foldL-04-amortized.md`). The population side is Assumption A,
unchanged; the destruction side's open object is H″.

## 5a. The tighter square windows, and their prior art

Chris asked (2026-08-16) about shrinking the window from the zone's quadratic
(p, p'^2) to the square-to-square (n^2, (n+2)^2), width 4n+4, and to the
Legendre-tight (n^2, (n+1)^2), width 2n+1. Both are LINEAR windows, so the
zone's redundancy across overlapping levels disappears and the statement
develops genuine exceptions. `research/square-window.js` reproduces this.

**MEASURED, and it reproduces known results exactly.**

- (n^2, (n+2)^2): exactly one failure for n up to 1e5, at **n = 26**. The
  interval (676, 784) holds fifteen primes and no twin pair; the nearest twins
  are (659,661) below and (809,811) above, both straddling.
- (n^2, (n+1)^2): twelve failures, all with n <= 122, namely
  1, 9, 19, 26, 27, 30, 34, 39, 49, 53, 77, 122.

**PRIOR ART, and it is decisive.** That second list is OEIS **A091592**,
"Numbers n such that there are no twin primes between n^2 and (n+1)^2",
conjectured complete, tested to 50,000 by Robert G. Wilson v and to 1e7 by
Arkadiusz Wesolowski (2011), keyword `hard`. Its companion **A091591** counts
the pairs and carries the comment that settles the difficulty: proving
a(n) > 0 for all n > 122 would prove the twin prime conjecture, and (T. D. Noe)
Legendre's conjecture as well. See also **A113274**, record gaps between twin
primes, which is the right reference for our first-twin-distance data.

So the tight square window is at least TPC-hard, by the same disjoint-intervals
argument that makes our weak form equivalent to TPC. It is the same wall in a
narrower window, not a way around it. We claim nothing here; the value is that
our engine reproduced a known list exactly, which validates it.

**The lesson worth carrying, though.** Failures vanish super-exponentially:
Poisson at density 2C2/ln^2(n^2) gives P(none) of 27% at n = 10, 3.0% at
n = 122, 1e-6 at n = 1000 and 5e-217 at n = 1e5, with the expected number of
further failures over all n in [123, 1e6] being about 2.0 against 0 observed.
But they vanish because the window grows LINEARLY while the twin-gap scale
grows like ln^2 n. That is a scale mismatch, not the primes becoming better
behaved, and the same is true of the zone's quadratic window. **Neither
dataset is evidence of increasing regularity; both are evidence that we are
asking an easier question as n grows.** What would need proving is uniformity
at the gap scale, and no amount of margin touches it.

## 6. The attack surface

Four routes. Each is stated with what it would need, so a new idea can be
matched against them rather than rediscovering one.

**A. Bound G₂ below the window (the Gap Reformulation).** Status: 4.2665 proven,
2 needed. The one visible road is Brüdern-Fouvry vector-sieve decoupling,
missing the signed cancellation of the bilinear interval sawtooth remainder
uniform in position (Lemma V) — and note that the measured working point
s/u = 1.62–1.72 sits outside Lemma V's stated range s ≤ u, so the operative unproven
input is a Gaussian maximal law for the sawtooth rather than Lemma V itself.
(TPC-specific, per the 2026-08-20 night correction: at the β₂ target the ρ
maximal law's working point s/u = 3/u ∈ (0.703, 1) is back INSIDE Lemma V's
stated range for every delivered exponent u ∈ (3, β₂);
`research/history/staging/rho-maximal-law.md` §5.)
Full decoupling would give 1 + √e ≈ 2.649, which removes about 71% of the open
band and does not finish. The mean square of that remainder is done and
verified; the uniform version is not.

**Route A carries a second difficulty floor, independent of its TPC-hardness**
(`research/two-class-lower-bounds.md` §9). The pointwise inequality
G₂(x#) ≥ g(x#) of §3 runs backward as well as forward, and read backward it is a
warning. **Route A's target G₂(x#) < x′² − 2 implies g(x#) < x′² − 2**, which is
an explicit constant-1 form of the Jacobsthal bound at primorials. Iwaniec 1978
gives g(x#) ≪ x² only with an unspecified constant, and Erdős problem #687 pays
$1000 for g(x#) = o(x²), a different target. The displayed comparison yields
limsup g(x#)/x² ≤ 1, not little-o. A fixed bound O(x^(2−δ)), δ > 0, would yield
little-o. The constant problem and the power-saving problem must be priced
separately.

**And the floor holds: CLOSED by inspection of the sources.** The question was
whether an explicit elementary bound already delivers g(x#) < x′² **at the
needed constant**, since the constant is the whole question and an inexplicit
one decides nothing. The answer is no, and the three papers usually named do not
even reach the exponent: Kanold gives 2^{√k}, Stevens k^{Θ(log k)} and Paseman
(arXiv:1311.5944) k^{O(log log k)}, all far weaker than exponent 2, and at the
primorial k = π(x) ~ x/log x they miss by orders of magnitude. The only
exponent-2 statements are Vaughan 1977 for general n and Iwaniec 1971 Theorem 2
/ 1978 at primorials, g ≪ (k log k)², both with inexplicit constants. So no
explicit-constant route to g(x#) < x′² exists in this literature, the floor does
not collapse, and route A carries both prices.

**B. Bound the first slot at the origin directly (the anchored route).** This is
the lens's native opening and, as far as our literature dive reached — and it reached A144311's own convention, not only ours — nobody has
posed it. We do not need the worst gap anywhere in a tile of width p#; we need
the gap at one distinguished place. The measured advantage of the origin over the
worst case is G₂/F, about a factor of 7 and growing polylogarithmically. **Both
halves of this route are closed, and by different mechanisms.**

*The fold half is closed because the origin is too calm to say anything*
(`research/a3-06-origin-vs-max.js`, ATTACKS3 A6). Two proven statements and one
refutation.

- **Head-calm lemma (PROVEN, verified at p = 29 to 10007).** Folding T_x by
  p = x′, copy 0 deletes at most ONE slot inside the head (0, p²), namely p
  itself, and only when (p, p+2) is a pair. A slot divisible by p is p·t with t
  itself x-rough, so t = 1 or t ≥ p; and p−2 is never a slot. A typical copy
  deletes 88 slots in the same window at p = 10007, the worst copy 124. The
  origin's advantage over the average copy grows like p/ln²p. This is the
  misalignment principle in its sharpest form.
- **The first-slot recursion (PROVEN, 0 mismatches over all 78,497 prime folds
  to 10⁶).** F(new) = F(old) unless F(old) = p.
- **REFUTATION.** The recursion is exact and worth nothing. Its only nontrivial
  clause is where the slot moves when F(old) = p, and that is the next twin
  prime, which is the postulate. The fold cannot help at the origin precisely
  because the origin is so calm: the head is frozen, it equals the primes below
  p², and the recursion is a re-encoding of the twin prime sequence. **Any
  argument for the strong form that uses only the fold structure at the origin is
  vacuous.**

*The density half is closed because the origin's advantage expires exactly at the
zone's width, and then reverses* (`research/origin-excess.md`,
`research/maier-matrix.md` §4). The Origin Excess Lemma (PROVEN, VERIFIED 14/14)
gives the origin more slots than the mean over the ensemble of all x# translates,
under its **one** hypothesis, S ≤ y′². What binds is the **Origin Excess
Corollary**, which carries its own x < x\* threshold: the guaranteed lower bound
is positive only below a threshold with ln x\*/ln y ≈ 1.44 at every level
computed, so the advertised (ln x/ln y)² factor is **capped by an absolute
constant of about 2.2**, with a measured maximum of 1.372 across the 14-cell
table. The canonical enumeration of the lemma's one hypothesis and its three
companions is `research/maier-matrix.md` §4a.

*(REFRAMED 2026-08-18. This said the lemma "carries an unstated third hypothesis
that binds". `history/CHANGELOG.md`:744 and :843 RETIRED that phrasing as a
private count — "The lemma has one hypothesis, S ≤ y′²; the x < x\* threshold
belongs to the Origin Excess Corollary" — and the wave-4 fix landed in
`origin-excess.md`, `maier-matrix.md`, `GLOSSARY.md` and `G2-STATE.md` but not
here. This was the last live body instance in the corpus. No number changes; the
threshold and the cap are the corollary's and are unaffected.)* At the width the Zone Postulate actually asks
about, S = x′², the advantage is not merely gone. **It reverses: the origin
carries about 21% LESS than the ensemble mean, the ceiling being
ρ(2) = e^{2γ}/4 = 0.79305** (measured 0.79303 at x = 1487 after stripping the
finite-size Hardy-Littlewood factor). The reason is structural rather than an
artifact of one lemma: the origin's excess is exactly a ratio of two values of
the survival curve ρ, and S = x′² is the point u = 2 where ρ takes its minimum.
The origin sits at the worst point of the only curve in the problem.

**What is left of route B.** The proven origin structure the framework already
has (the fused window, the mirror, the exact −1/2 correlation constant, the
skeleton kernel) was developed for the anchored scour rather than for the zone,
and none of it is a density or fold statement of the kind just closed. Anything
new here has to be counting inside the head, which is route C. One constant is
worth carrying into that counting: m(x) ~ e^{2γ}ln²x/(2C₂), so the tile's mean
slot gap exceeds the mean twin-prime gap at the same height by exactly
e^{2γ} = 3.1722 (VERIFIED: 3.509, 3.303, 3.195, 3.180, 3.174, 3.172 at
x = 29 to 10⁷). That is the exact anchored-enrichment constant of
`attack-10-anchored-origin.js`, and it is what a counting argument at the origin
starts with.

**C. Counting with a certificate.** Show the zone's twin-slot count is positive
by a per-prime cap or an inclusion-exclusion ladder. The staircase machinery
does exactly this for the tile. Blocked by the parity floor 2 for a two-class
sieve, and by cost: the certified head is a vanishing fraction of the zone.

**D. Covering.** Show the classes {0, −2 mod q} for q ≤ p cannot cover the zone.
The infinite version is settled in our favour (Hough 2015, and
Balister-Bollobás-Morris-Sahasrabudhe-Tiba 2022: no covering system of ℤ has
all moduli large). The finite windowed version is the conjecture again. The
best known interval coverage with one class per prime (Ford-Green-Konyagin-
Maynard-Tao 2018) falls short of a zone by about p/ln p, so the adversary's
published weapons do not reach.

## 7. Triage, applied to this target

From `research/THE-LENS.md` §5, which owns the rule: if a statement can be
phrased in residues it is free and probably classical; if it needs an interval
it is hard. **The Zone
Postulate is an interval statement.** The census ∏(q−2), the Copying Theorem,
the Seam Lemma, the palindrome, the grain word and count(6) = ∏(q−4) are all
residue statements and none of them will touch this.

The practical consequence, stated so we can hold each other to it: any argument
that reaches the Zone Postulate without ever making an interval-versus-residue
step has proved something else. The most likely failure mode is an argument
that silently assumes the tile's slots are equidistributed in the zone, which
is the conjecture.

**That prediction has been paid out once, against a published programme.** Holt's
Legendre result (arXiv 2603.25915 Theorem 3.3) rests on his Conjecture 2.1,
"approximate uniformity", which is explicitly supported by samples and not
proved. It is exactly the failure mode named above, reached by two decades of
work on the same objects (`research/PRIOR-ART.md`). The rule caught the shape
before we found the example, which is the strongest evidence available that it is
worth applying to our own arguments first.

## 8. What would count as progress

In descending order of value.

1. Any unconditional two-class exponent below 4.2665.
2. An origin-specific bound on the first twin slot that beats the global G₂
   bound at the same level, by any margin, even without an asymptotic.
3. A proof of the weak form at infinitely many p, by any route. One specific
   form, listed here and not below it because it implies this item: a proof
   that the window/G₂ ratio is unbounded, which is weaker than route A and
   still TPC-implying, since unbounded means G₂(x#) < x′² − 2 at infinitely
   many x, the i.o. form of the Gap Reformulation, which is weak ZP (labelled
   2026-08-29, `history/staging/object-g2-read-0829.md` §5; it read as a
   cheaper stepping stone until then). It would also show the Gap
   Reformulation is not asymptotically self-defeating.
4. (Folded into item 3 on 2026-08-29; the numbering is kept so older
   pointers to "§8 item 4" resolve.)
   The evidence is one-sided and comes from two directions: the best construction's
   share of the window collapses over a 108-fold range in x, and the localized
   margin is measured at x²/(4.4 ln³x) at the worst case across both engines (4.2 on the direct engine), which diverges. Neither is a proof, and
   the first is an upper bound on x²/G₂ rather than a lower one, so the direction
   of inference has to be stated every time it is used.
5. An origin-side statement that survives past S = x′². Everything found so far
   expires at or before the zone's own width, and at that width the origin sits
   at the minimum of ρ. A mechanism that is not a density comparison against the
   translate ensemble would be genuinely new.

## 9. Reproduction

`node research/window-check.js 1e11` reproduces §4 in about ten minutes (1e10 takes one): a
segmented sieve, every prime checked, the worst margin per decade, and the
largest distance to a first twin. Pass a larger bound to push it.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
