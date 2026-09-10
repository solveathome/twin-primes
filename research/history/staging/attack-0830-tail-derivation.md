# The tail's derivation: the ensemble half derives exactly, and the anchored coefficient is Hardy-Littlewood in disguise

<!-- ledger
id: Q-tail-derivation-0830
status: PARTIAL
todo: Z4
question: Does the tail's measured law c = 0.7522 ln^2(p'^2) and its surplus derive, and which part of the coefficient is the tile's own (no prime input) against which part needs Hardy-Littlewood?
verdict: PARTIAL, kill clause fired on the coefficient: the ensemble object (the same functional averaged over all p# translates) derives exactly, E_all = R + 5/2 and E_odd = R + 3 with R = Sum g^2/2W, computed exact at x = 7..29 with every conditional the rough-origin candidate needs, and its Mertens constant e^{2gamma}/(8 C2) = 0.6007 is 1/(2 C2) times rho(2) = e^{2gamma}/4 by construction; every route from there to the anchored 0.7574 passes through rho(2)'s limit (the sharp form of Assumption A, algebraically equivalent to HL) and through the zone's gap shape CV^2 -> 1 (an HL statement), so the anchored coefficient is HL in disguise and nothing beyond HL is derived; the tile's own (1 + CV^2)/2 is 0.6306 -> 0.7532 over x = 7..29 and not settled; the record's 0.7522 = HL x 0.9644 x 1.0298 is two non-HL-sized factors cancelling at this height; the rough-origin candidate has an exact ensemble counterpart E_rc/E_cls = 1.0050 -> 1.0523, right sign, wrong size and trend against the anchored 1.0157, not identified; one number derives that the record measured: the class-null offset E_cls - R = 5.600 -> 6.034 exact against the record's 6.05, replacing both the prereg's 0.5 and the note's 7.5; and the corpus's "R + 1/2" is the other convention, under the tail's own the constants are 5/2 and 3.
-->

STATUS: HELD, staging. Not integrated, not red-teamed. Producer
`research/history/staging/attack-0830-tail-derivation.js`, embedded
(`node research/qc/embed.js research/history/staging/attack-0830-tail-derivation.js`),
verdict line `0 assertion failures`, levels x = 7, 11, 13, 17, 19, 23, 29.
This note edits nothing; the proposed TODO text is in §8, HOLD.

Label: **(i) throughout.** Every statement is either an identity about an exact
periodic object, an exact number at one level, or a distributional statement
about a measured field. No bound on any tail at any p is claimed. The tail is a
slack field of R0 (`zonegap-02-reduction.md` §2, (R0), `:62`), it sits off the
exponent's critical path, and nothing here touches Z2 or moves the wall.
`attack-wrongdirection-audit.md:548` records Z4 as not audited; this note does
not audit it either. Inequality directions are stated where an inequality
appears (§2a, §3); none is load-bearing for a bound because no bound is made.

---

## 0. What is still open, and what failed

**The anchored coefficient does not derive, and the kill clause fires.** Every
route from the tile to the measured 0.7574-sized coefficient passes through two
inputs: ρ(2) = e^{2γ}/4, the origin's survival density against the ensemble at
u = 2, whose exact value is HL-conditional (`origin-excess.md:36`, `:433`) and
whose limit is the sharp form of Assumption A, "algebraically equivalent to HL
on the 11/17 comb" (`GLOSSARY.md:328-329`); and CV² → 1 for the zone's own
twin gaps, "a Hardy-Littlewood statement for twin gaps"
(`head-residual-factor.md:166`). So the anchored coefficient is Hardy-Littlewood
in disguise. Status PARTIAL with that as the coordinate; nothing beyond HL is
derived on the tail, exactly as nothing beyond HL was derived on the head.

**What derives, exactly and with no prime input, is the ensemble half.** The
tail functional averaged over all p# translates has a one-line expectation,
R + 5/2 over all integer origins and R + 3 over odd origins, R = Σg²/2W over
the tile's twin-slot gaps; it is asserted by direct summation at every level
with W ≤ 2²⁸ and its Mertens constant is e^{2γ}/(8 C₂) = 0.6007 [PROVEN]. What
does NOT settle inside the ensemble is the tile's own gap-shape factor
(1 + CV²)/2, which reads 0.6306 → 0.7532 over x = 7..29, rising at every step
and nowhere near a plateau [MEASURED exact per level, limit OPEN].

**The rough-origin candidate is not identified.** Its exact ensemble
counterpart, E_rc/E_cls (an origin coprime to p# and in the classes p'² occupies,
against every integer in those classes), reads 1.0050 → 1.0523 over x = 7..29,
rising; the record's anchored surplus is 1.0157 [1.0013, 1.0308] at sieve
level 1e5 to 3.2e5. Same sign, wrong size, and a trend the record's three bands
(1.0452, 1.0053, 1.0157, `zone-tail-02-0829.md:432`) do not show. The two sit
four orders of magnitude apart in p and cannot be compared at one level.
HEURISTIC stays HEURISTIC.

**One number derives that the record had measured and mis-explained.** The
class-null offset, classNull − R, is an exact ensemble quantity: E_cls − R =
5.600, 5.709, 5.833, 5.913, 5.973, 6.008, 6.034 over x = 7..29, rising slowly.
The record measured 440.36 − 434.31 = 6.05 at the top band
(`research/zone-tail-02.js:796`) and explained it once as 0.5 (the prereg, §1
(P4)) and once as 7.5 (§3, `zone-tail-02-0829.md:407`); `redteam-0829-measure-b.md:153`
(C17) flagged both. The ensemble's exact offset is the ground P4 lacked.
Calibration: exact at x ≤ 29; its agreement with an anchored measurement at
heights 1e10 to 1e11 is CONSISTENT WITH, one number at one band, not a
derivation across the level gap.

**A convention clarification, owed to two live files and stated here.**
"A discrete uniform integer origin sees R + 1/2 exactly"
(`head-residual-factor.md:70`; `research/zone-tail-02.js:799`) is the constant
for the convention a ≤ o. Under the tail's own convention, a + 2 < o strict
(`zone-tail-01.md` §1, `:83-86`), the constants are 5/2 for all integer
origins and 3 for odd origins [PROVEN, §2a; asserted numerically]. Re-read
against the odd-origin constant the record's t/R_shell = 1.0298 becomes
t/(R_shell + 3) = 1.0228; the class-null figure 1.0157 was computed in the
strict convention and is unaffected.

**No error in the brief was found.** Every figure the brief carries (0.7522,
[0.7410, 0.7630], 0.7574, 1.0619, 1.0298, [1.0156, 1.0443], 1.0157,
[1.0013, 1.0308], the detrended r = −0.0009, 27,292 zones, the 0.03 per-step
registration) reproduces from `research/zone-tail-02.js`'s bound block or
`zone-tail-02-0829.md`, and the producer parses the top-band rows from the
bound block rather than typing them (SEC 1).

---

## 1. The object, pinned against the record

**The tail as the record defines it.** A pair is named by its opener a; it is
in zone p iff p < a and a + 2 < p'², both strict; a_last(p) is the largest such
opener; tail(p) = p'² − a_last(p) (`zone-tail-01.md:80-86`;
`research/zone-tail-02.js:41-44`). The top-band figures, parsed by the
producer from `research/zone-tail-02.js:766` and `:796-798` and printed in
SEC 1: 17,700 zones, mean tail 447.26, c_local 0.7522 [0.7410, 0.7630],
R_shell 434.31, t/R_shell 1.0298 [1.0156, 1.0443], classNull 440.36,
t/classNull 1.0157 [1.0013, 1.0308]. The zone tails at p = 7, 11, 13, 17, 23
(14, 20, 8, 14, 14) are parsed from `research/zonegap-02-reduction.js:409-413`
and the max tail 80 at p = 29 from `research/zone-tail-02.js` SEC D; all six
reproduce from the tile with no prime table (SEC 3, IDENTICAL).

**The ensemble object.** T_x is the twin-slot tile, period W = x#, D =
∏_{5≤q≤x}(q − 2) openers, gaps summing to W. For an integer origin o mod W,

    τ(o) = o − max{ a opener : a + 2 < o }.

By the Zone Restriction Lemma (`zonegap-02-reduction.md:27`, PROVEN) the
in-zone twin slots of T_p are the in-zone twin primes, so tail(p) = τ(p'²)
read on T_p at phase zero, exactly. The record's tail is one member of the
ensemble {τ(o) : o mod W}; the ensemble mean over all o is the object whose
expectation derives.

---

## 2. The ensemble derivation

### 2a. The identities [PROVEN, one line each; asserted by direct summation at x ≤ 23]

Let the openers be a₁ < … < a_D with gaps g_i = a_{i+1} − a_i (the last gap
wraps). Origin o has last opener a_i iff a_i + 2 < o ≤ a_{i+1} + 2, so the
origins served by gap i are the g_i integers a_i + 3, …, a_i + 2 + g_i, at
distances 3, …, g_i + 2. Hence

    E_all[τ] = Σ_i g_i(g_i + 5)/2 / W  =  Σg²/2W + 5/2  =  R + 5/2,
    E_odd[τ] = Σ_i g_i(g_i + 6)/4 / (W/2)  =  R + 3,

using Σg_i = W and, for odd origins, that every a_i and every g_i is even-offset
consistent (a_i odd, g_i ≡ 0 mod 6 for x ≥ 5). Under the convention a ≤ o the
distances are 1, …, g_i and the constant is 1/2; that is the corpus's
"R + 1/2". Direction of the only inequality in this section: E_odd > E_all >
R, trivially, because the constants are positive; nothing rests on it.

The producer asserts both closed forms against the per-gap sums at every level
and against a direct sum over every one of the W origins at x ≤ 23
(`direct all-origin sum = closed form`, `direct origin count = W`), 0 failures.
D = ∏(q − 2), holes = φ(W), rough origins = φ(W), square units = ∏(q − 1)/2 are
asserted per level; D, mbar and G₂ are asserted against
`research/gap-spectrum-01.js:601-637`.

### 2b. The numbers, exact (producer SEC 2)

| x | mbar | E[g²] | CV² | R | E_all = R + 5/2 | E_odd = R + 3 | (1 + CV²)/2 |
|---|---|---|---|---|---|---|---|
| 7 | 14.0000 | 247.200 | 0.2612 | 8.8286 | 11.3286 | 11.8286 | 0.6306 |
| 11 | 17.1111 | 381.067 | 0.3015 | 11.1351 | 13.6351 | 14.1351 | 0.6508 |
| 13 | 20.2222 | 553.721 | 0.3540 | 13.6909 | 16.1909 | 16.6909 | 0.6770 |
| 17 | 22.9185 | 738.019 | 0.4051 | 16.1009 | 18.6009 | 19.1009 | 0.7025 |
| 19 | 25.6148 | 950.646 | 0.4489 | 18.5566 | 21.0566 | 21.5566 | 0.7244 |
| 23 | 28.0543 | 1165.953 | 0.4814 | 20.7803 | 23.2803 | 23.7803 | 0.7407 |
| 29 | 30.1324 | 1367.674 | 0.5063 | 22.6944 | 25.1944 | 25.6944 | 0.7532 |

Reading: R/mbar = (1 + CV²)/2 rises 0.6306 → 0.7532 across seven levels with
no sign of settling; the tile's gaps are far from exponential at every
computable level, which is `gap-spectrum-01.md`'s "uniformly steeper than
exponential" read at the second moment. Nothing here says where CV² goes.

### 2c. The asymptotic form, and what in it is proven

mbar = W/D = 2 ∏_{2<q≤x} q/(q − 2) exactly, and by Mertens
mbar ~ e^{2γ} ln²x/(2 C₂) [PROVEN, classical]. In the tail's local unit,
ln²(p'²) = 4 ln²p', the ensemble mean-gap coefficient is therefore
e^{2γ}/(8 C₂) · (ln x/ln p')², with (ln x/ln p')² → 1 by Bertrand [PROVEN];
e^{2γ}/(8 C₂) = 0.6007 is `destroyer-census-01.md:205`'s staircase-Mertens
constant, and SEC 0 recomputes it as 1/(2 C₂) × e^{2γ}/4 = 0.757390 ×
0.793055 = 0.600652. So

    c_ens(x) := E[τ]/ln²(p'²)  →  0.6007 · (1 + CV²_∞)/2 · (conditioning),

where the constant is PROVEN, CV²_∞ is OPEN (§2b), and the conditioning factor
for a rough class origin is §4's exact E_rc/E_all, itself unsettled. At the
computable levels the Mertens ratio mbar/(e^{2γ} ln²x/2C₂) is still 1.5389 →
1.1061 (SEC 4), so the exact c_ens(x) in local units, E_rc/ln²(p'²) = 0.6304,
0.6536, 0.6294, 0.6622, 0.6526, 0.6202, 0.6409, is the product of two
unconverged factors moving in opposite directions and says nothing about a
limit. The asymptotic formula evaluated with each level's own CV² reads 0.2494
→ 0.4350, which is how far these levels are from the Mertens regime.

---

## 3. The anchoring, and which value 1/(2 C₂) is

The record's tail is the phase-zero member. From the ensemble mean to the
anchored mean there are three factors, each a ratio anchored/ensemble:

1. **Density.** The zone's twin density over the tile's, ρ_p(p'²) in
   `origin-excess.md`'s notation. Exact per level (SEC 3, "zone density /
   tile density": 0.9825, 0.9747, 1.1723, 1.1326, 1.0547, 0.9946, 0.9699 at
   x = 7..29, one zone each, noise-dominated). Its limit e^{2γ}/4 = 0.79305
   is the Unification Law's value at u = 2 (`FOLD-PROFILE.md:178`), measured
   0.79303 at x = 1487 after stripping the finite-size HL factor
   (`origin-excess.md:36`), and its exact value is HL-conditional
   (`origin-excess.md:433`). Direction: ρ(2) < 1, so anchoring LENGTHENS the
   mean gap by 1/ρ(2) = 1.2609; the Survival Quotient Identity that carries it
   is PROVEN (`origin-excess.md:149`), the value of the limit is not.
2. **Gap shape.** (1 + CV²_zone)/(1 + CV²_tile). The zone side is the twin
   primes' own gap CV², measured 0.7406 → 0.8941 over 1e4 to 1e8
   (`head-residual-factor.md:169-170`), with CV² → 1 an HL statement
   (`:166`); the tile side is §2b's 0.26 → 0.51. Neither limit is proven.
3. **Origin conditioning.** The anchored analogue of §4's E_rc/E_cls, which the
   record measures as t/classNull = 1.0157 and this note does not derive.

Under HL values for all three (ρ → e^{2γ}/4, CV²_zone → 1, conditioning → 1)
the anchored coefficient is 0.6007/0.79305 = 1/(2 C₂) = 0.7574. **So 1/(2 C₂)
is Hardy-Littlewood's value and it is the ensemble value divided by ρ(2); the
ensemble value itself is not 1/(2 C₂)** (asymptotically 0.6007 × (1 + CV²_∞)/2;
exactly 0.62 to 0.66 in local units at x ≤ 29 with every finite-level factor
in). The record's own factorisation, parsed and recomputed in SEC 1: c_local =
(R_shell/ln²) × (t/R_shell) = 0.7304 × 1.0298, with R_shell/ln² = 0.9644 × HL.
The measured coefficient sits on HL because a 3.6% deficit in the renewal mean
(gap shape and/or the finite-height density factor; the two are not separable
from the record's figures, SEC 1) and a 3.0% origin surplus cancel at this
height. "Consistent with HL" is the product of two factors that are each not
HL-sized. Calibration: the decomposition is exact arithmetic on the record's
bound figures; the attribution of the 0.9644 is not.

---

## 4. The rough-origin candidate, stated exactly and tested in the ensemble

**The candidate, stated.** `zone-tail-02-0829.md:425-436`: p'² is coprime to
every prime q ≤ p', so the tail's origin is a "rough" origin, and a rough origin
sees a longer backward distance than a generic one. In the ensemble this is a
conditional expectation with no model in it: E_rgh over origins coprime to W,
E_rc over origins coprime to W and ≡ 1, 19 mod 30 (both properties p'² has),
E_sq over square units mod W (a QR mod every odd q ≤ x; p'² is a square), each
against E_cls over every integer ≡ 1, 19 mod 30, the record's own null
population. Exact at seven levels (SEC 2(b)):

| x | E_cls | E_cls − R | E_rc | E_sq | E_rc/E_cls | E_sq/E_cls | E_sq/E_rc | n_rc | n_sq |
|---|---|---|---|---|---|---|---|---|---|
| 7 | 14.4286 | 5.6000 | 14.5000 | 13.0000 | 1.0050 | 0.9010 | 0.8966 | 12 | 6 |
| 11 | 16.8442 | 5.7091 | 17.2000 | 16.2000 | 1.0211 | 0.9618 | 0.9419 | 120 | 30 |
| 13 | 19.5235 | 5.8326 | 20.2083 | 18.3667 | 1.0351 | 0.9407 | 0.9089 | 1440 | 180 |
| 17 | 22.0136 | 5.9127 | 22.9659 | 20.9375 | 1.0433 | 0.9511 | 0.9117 | 23040 | 1440 |
| 19 | 24.5294 | 5.9728 | 25.6618 | 23.5523 | 1.0462 | 0.9602 | 0.9178 | 414720 | 12960 |
| 23 | 26.7880 | 6.0078 | 28.1268 | 27.2983 | 1.0500 | 1.0190 | 0.9705 | 9123840 | 142560 |
| 29 | 28.7280 | 6.0336 | 30.2300 | 29.0998 | 1.0523 | 1.0129 | 0.9626 | 255467520 | 1995840 |

**What the test says.** (i) The sign is right: a rough class origin sees a
longer tail than a generic class origin at every level, and the effect grows
with x. (ii) The size and the trend are not the record's: 1.0500 and 1.0523 at
x = 23 and 29, rising, against 1.0157 [1.0013, 1.0308] anchored at sieve level
1e5 to 3.2e5, with the record's bands reading 1.0452, 1.0053, 1.0157 and not
rising. (iii) Squareness does not help: E_sq/E_rc is below 1 at every level,
0.8966 → 0.9626, so the square property SHORTENS the ensemble tail relative
to roughness alone; the record's "no difference at three non-square
endpoints" (`zone-tail-01.md`, verdict) is consistent with this only in that
both effects are a few per cent. (iv) The comparison mixes regimes: the
ensemble conditional averages over the whole period, all u, while the anchored
member sits at u = 2 in a window of width p² inside a period of width p#, and
the ensemble at the record's level is not computable. Verdict on the
candidate: it has an exact counterpart with the measured sign, it is not
identified as the mechanism, and it remains HEURISTIC.

**The one derived number: the class offset.** E_cls − R = 5.600 → 6.034, exact,
rising by 0.026 over the last step. The record's classNull − R_shell = 6.05 at
the top band. §1 (P4) of the record grounded its prediction on 0.5 and §3 on
7.5; C17 called both wrong. The exact ensemble constant is neither and is
within 0.02 of the measured offset at x = 29. Calibration: exact per level;
the match to the anchored figure is CONSISTENT WITH at one band, not derived
across four orders of magnitude in p; the sequence has not stopped rising.

---

## 5. The split, with numbers

**(a) Derives with no assumption beyond the tile's definition [PROVEN /
exact].** The identification tail(p) = τ(p'²) (Zone Restriction Lemma); the
ensemble expectations E_all = R + 5/2, E_odd = R + 3; the Mertens constant
e^{2γ}/(8 C₂) = 0.6007 of the ensemble mean gap; every conditional in §4 as an
exact number at x ≤ 29; the class-null offset E_cls − R ≈ 6.03 at x = 29; the
convention constants 5/2 and 3 replacing 1/2.

**(b) Needs Hardy-Littlewood-strength input on the two openers [OPEN, HL].**
The anchoring density ρ(2) → e^{2γ}/4 (the zone holding e^{2γ}/4 of the tile's
twin density at u = 2 is the sharp form of Assumption A); CV²_zone → 1 for the
twin primes' gaps; the anchored conditioning factor; and the finite-height
density correction. The size of the anchoring the coefficient needs is
c_local/ENS = 1.2523 against 1/ρ(2) = 1.2609 at CV² = 1 (SEC 4); the two differ
by less than the record's bootstrap width, and the difference is the product
of the three factors above.

**(c) Unsettled on the tile's own side, no HL involved [OPEN].** CV²_tile's
limit, 0.5063 at x = 29 and rising; without it the ensemble coefficient has a
proven constant and an unproven shape factor.

---

## 6. The step that does not derive, and what would falsify

**The single step.** ρ_p(p'²) → e^{2γ}/4: that the phase-zero window of width
p'² holds e^{2γ}/4 of the tile's twin-slot density. Everything on the ensemble
side of it derives; everything on the anchored side of it is priced in HL.
That step is the anchored bias β's limit (`GLOSSARY.md:310-323`), and the
corpus already records that its sharp form is HL and that bounding it by any
constant is refuted as a target (`REFUTED.md`, the "bounding the anchored δ"
row). No derivation closes here.

**Falsifiers, and whether each has run.**

- The identities of §2a: any level where the direct sum over all W origins
  disagrees with the closed form. RUN, x ≤ 23, 0 failures.
- The ensemble shape factor: CV²_tile at x = 31 (the producer accepts
  `--to 31`; `gap-spectrum-01.js:568` scanned that level in 1280 s and this
  file does more per hole) falling below 0.5063 would break the monotone
  reading of §2b. NOT RUN.
- The anchoring identification: a measured ρ(2) away from 0.79305 at higher
  x (`origin-excess.md` has eighteen levels to x = 1487), or c_local at 1e12
  (`zonegap-03-prereg.md`'s sealed apparatus) outside [0.7410, 0.7630], would
  break "consistent with HL". NOT RUN here.
- The class-offset derivation: the record's per-band classNull − R_shell (SEC
  E rows at 10^3 and 10^4, `research/zone-tail-02.js:794-795`) against the
  ensemble's ~6.0; only the top band is parsed here. NOT CHECKED.
- The rough-origin candidate: a derivation predicting the record's band
  ordering 1.0452, 1.0053, 1.0157 from the ensemble's rising 1.0050 → 1.0523
  would identify it; none exists.

---

## 7. Defects, brief errors, NOT REACHED

1. **One engine, one run, x ≤ 29.** The tile scan is a single implementation;
   custody is D, mbar, G₂ against `gap-spectrum-01.js` and the phase-zero zones
   against `zonegap-02-reduction.js` and `zone-tail-02.js` SEC D, which pins
   the openers and the gap multiset but not the conditional accumulators.
   Those are checked only by the identities (E_all, E_odd, the four counts).
2. **The level gap is not bridged.** The ensemble is exact at p ≤ 29; the
   record is anchored at p ~ 1e5 to 3.2e5. Every ensemble-versus-record
   comparison in §3 and §4 crosses four orders of magnitude in p and mixes a
   whole-period average with a u = 2 window.
3. **The class-offset agreement could be coincidence.** 6.034 against 6.05 is
   one number; the ensemble sequence is still rising and the record's own
   R_shell is an estimate with the straddling-gap bias the record discloses
   (`zone-tail-02-0829.md` §7 defect 8).
4. **Brief errors: none found.** Each figure in the brief was verified at its
   record before use (§0, last paragraph).
5. **Corrections owed outside this file (HOLD for the orchestrator).**
   `research/zone-tail-02.js:799` and `head-residual-factor.md:70` state
   "R + 1/2" for the discrete uniform origin; under the tail's strict
   convention the constants are 5/2 and 3 (§2a). `zone-tail-02-0829.md:407`'s
   "7.5" and §1 (P4)'s "0.5" are both replaced by the exact E_cls − R of §4.
   The head's own forward constant is not examined here; the head half is in
   flight (`attack-0830-head-remainder`).

**NOT REACHED.** x = 31. A closed form for E_cls − R (only the exact sequence
is given). A window-restricted ensemble at u = 2 (it would be the anchored
member itself). Any derivation of CV² on either side. The per-band class
offsets. A red team.

---

## 8. Proposed TODO Z4 text (HOLD for the orchestrator)

Proposed addition after "What is left on the tail is a derivation, not more
zones.":

> THE TAIL'S DERIVATION RAN 2026-08-30 (`attack-0830-tail-derivation.md`,
> HELD; `Q-tail-derivation-0830` PARTIAL). The ensemble half derives exactly:
> the tail functional averaged over all p# translates has expectation R + 5/2
> (R + 3 over odd origins), R = Σg²/2W over the tile's gaps, asserted by
> direct summation, with Mertens constant e^{2γ}/(8 C₂) = 0.6007 = HL × ρ(2);
> the tile's own shape factor (1 + CV²)/2 reads 0.6306 → 0.7532 over x = 7..29
> and does not settle. The anchored coefficient does not derive: every route to
> 0.7574 passes through ρ(2) → e^{2γ}/4 (the sharp form of Assumption A, HL)
> and CV²_zone → 1 (HL), so it is HL in disguise; the record's 0.7522 = HL ×
> 0.9644 × 1.0298 is two non-HL-sized factors cancelling. The rough-origin
> candidate has an exact ensemble counterpart E_rc/E_cls = 1.0050 → 1.0523,
> right sign, wrong size and trend against the anchored 1.0157; not identified.
> One number derives that the record measured: the class-null offset
> E_cls − R = 6.034 at x = 29 against the measured 6.05, replacing P4's 0.5 and
> 7.5. The corpus's "R + 1/2" is the a ≤ o convention; under the tail's own the
> constants are 5/2 and 3.

Ledger line: add `Q-tail-derivation-0830`.
