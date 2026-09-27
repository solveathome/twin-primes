# The bridge between Z2 and G2: every object on the road, and what each reduction discards

<!-- ledger
id: Q-object-bridge-read
status: PARTIAL
todo: none
question: What sits between Z2(p) and G2(x#), which inequalities between them are proven and in which direction, and is the information the Gap Reformulation discards provably needed?
verdict: Map only, nothing computed: the reduction discards the origin to buy rotation invariance at a loss measured at G2/Z2 = 4.12 by p = 43, and the discarded information is PROVABLY not needed for the implication (a rotation-invariant statement, G2 < x'^2 - 2, does reach the zone statement), MEASURED to be worth about one unit of exponent against a deficit of 2.2665, and OPEN as to whether any proof needs it, with no separation theorem on record on either side.
-->

> **RIDER 2026-09-04 (orchestrator, from `redteam-0904-r0-extension.md`).**
> The zone property quoted near line 471, "coprime to x#, and x < l₁ < x′²",
> must bound both coordinates, `x < l₁, l₂ < x′²`, for its extension to be
> the pairs of primes in the zone and for H5 to hold; with one coordinate
> bounded it is Tao's Example 2 and H5 fails. Prefer "pairs of primes l, l+2
> in (x, x′²)" over "twin prime pairs", which borrows the conjecture for its
> (−1, −1) witness. Conditional on Claim 1 throughout.

*(Staging note, HELD under the publication moratorium. Computes nothing new;
proposes no route. Every claim carries a calibration marker and a pointer.
Written 2026-08-29 as one of four parallel reads.)*

## 0. What is open, first

- **The band on G₂ is open and unmoved.** `G₂(x#) ≪_ε x^{4.26645+ε}` is PROVEN
  (`paper/beta2-note.md`, via `research/G2-STATE.md` §0); the Gap Reformulation
  needs exponent 2 with constant strictly below 1
  (`history/staging/attack-block-08-secondmoment.md` §1.1 as quoted in
  `history/staging/attack-wrongdirection-audit.md` §1); the open band is
  (2, 4.26645] and every route in this corpus has left it where it was
  (`README.md` §Status).
- **There is no band on Z₂ at all.** Below the zone's own width, every
  statement the corpus can make about Z₂(p) is either a measurement or is
  TPC-strength. `Z₂ + head + tail < width` for all p is the strong Zone
  Postulate; i.o. it is TPC; and any a-priori bound on any one of the three
  pieces at the window scale is TPC-strength, because the three objects are
  only DEFINED when the zone is occupied
  (`history/staging/zonegap-02-reduction.md` §2, (R0) and (R1); PROVEN, with
  the circularity stated there). The one non-circular sufficient form, (R2),
  is a first-slot bound, and its one proven instrument is the Euclid anchor,
  which is G₂ again.
- **The headroom the reduction spends is a factor of about p, not p².** The
  postulate needs F < x′², and F ≥ x′ always, so window/F can never exceed x′
  and is saturated within 1.0000004 of that ceiling at x = 10⁹; the genuine
  advantage of the origin over the worst case is G₂/F, MEASURED at roughly 7
  and growing only polylogarithmically (`research/ZONE-POSTULATE.md` §5).
- **What this note does not do.** It computes nothing new: every number below
  is cited to the artifact that produced it, per the standing compute rule. It
  proposes no route, and it is not an attack. Three of this corpus's closed
  routes were bridges of exactly the kind a map like this invites
  (`research/REFUTED.md`: the localized merge chain, the maxsum bridge as a
  0c→L converter, the L = 1 residue count), and a fourth, fifth and sixth
  were sub-targets that turned out TPC-strength.
- **One thing in the brief's own framing needed correcting before the map
  could be drawn**, and it is carried in §5: the separation at issue cannot be
  "tile versus zone", because the tile statement `G₂(x#) < x′² − 2` is about
  the tile alone and does reach the zone statement (PROVEN,
  `research/G2-STATE.md` §1b). §5 states what it is between instead.

## 1. The chain of objects, zone to tile

**Read the caveats in the columns, not around them.** "Expires" is the largest
window or level at which anything is proven, certified or exhaustively
verified about the object, not the range over which it has been sampled;
several rows expire at a level far below where they have been measured.
"Rot-inv" asks whether the object is invariant under translation of the tile
(equivalently, whether it is a statement about residues alone rather than
about a distinguished position). TPC-strength labels are the audit's:
**(i)** strictly weaker than TPC in the corpus's witnessed sense, **(ii)**
implies TPC or more, **(iii)** undetermined
(`history/staging/attack-wrongdirection-audit.md` §2).

| object | definition pointer | rot-inv | scale | expires at | grade | TPC-strength |
|---|---|---|---|---|---|---|
| **Z₂(p)**, max gap between consecutive twin openers in the zone (p, p′²) | `history/staging/zonegap-01.md` §0 | **no** (interval, anchored at p) | ln³p family, band constants c₃ = 3.426, 3.681, 4.022, 3.930 at 10², 10³, 10⁴, top band (`zonegap-01.md` §4) | nothing proven at any scale; VERIFIED exhaustively to p = 10¹¹ (27,292 zones), envelope record-exact against A113274/TOS | MEASURED | **(ii)** in every form that bounds it below the width (`zonegap-02-reduction.md` §2 R1) |
| **head F(p)**, distance from p to the first twin opener above it | `research/GLOSSARY.md` §head, sense (iii); `zonegap-01.md` §6 | **no** | ln²p: mean head/ln²p = 0.7229 against HL's 0.7574 (`zonegap-01.md` §6) | one proven bound only: F(p) ≤ G₂(p#) − p − 1, i.e. p^{4.2665+ε} (`zonegap-02-reduction.md` §3.1) | MEASURED + one PROVEN bound | **(ii)**: F(p) < p′² − p − 2 i.o. ⟹ weak ZP ⟺ TPC (`zonegap-02-reduction.md` §2 R2) |
| **tail**, p′² − a_last | `zonegap-01.md` §0 | **no** | ln²(p′²): c_tail = 0.7771 at [3163, 10⁴), against the head's 0.6693 ln²p on the same zones; the factor 4 is the unit and nothing else (`history/staging/zone-tail-01.md` via `QUESTIONS.md` `Q-zone-tail`) | nothing proven; field measured at 1,225 zones, band drift does not settle | MEASURED, PARTIAL | **(ii)** as a summand of R0 |
| **M(x, x′²)**, largest twin-slot gap inside the zone | `research/maxgap-law.md` §8 | **no** | M/ln³x flat at 3.2 to 3.7 over a 47-fold range in x | measured at seven levels x = 211..9973; reproduced 7 of 7 EXACT by the zone sweep, the two windows (x, x²) and (x, x′²) binding the same gap at all seven (`zonegap-01.md` §1) | MEASURED | **(ii)**, same object as Z₂ under the Zone Restriction Lemma (see §6) |
| **stretch S_Q = [Q², Q′²), and T(Q)** its twin count | `history/staging/stretch-01.md` §0, §1 | **no** | width ~ 2Q ln Q | occupancy VERIFIED at all 5,484,596 stretches with Q′² < 2⁵³ ≈ 9.0·10¹⁵, one exception cleared directly (`stretch-01.md` §3) | VERIFIED (occupancy), the postulate itself OPEN | SP ⟹ strong ZP ⟹ weak ZP ⟺ TPC, so **(ii)**, and per level strictly above zone occupancy (`stretch-01.md` §2) |
| **X(K)**, both-composite pairs in S_Q rough beyond p_K; **floor_K**; **capU_K(r)** | `history/staging/quadpoint-identity-01.md` §1 | **no** | stretch-local | identity VERIFIED at every depth of all 1,227 anchors to Q = 10007 | PROVEN (the identity), the certificate OPEN | certificate **(ii)** (audit §3.1); an upper bound on X alone is the legal half |
| **y\***, the crossing depth, candidate h^{1/(2e^γ)} | `quadpoint-identity-01.md` §2, §3 | **no** | ln y\*/ln h ≈ 0.2807 | y\*(Q) exists ⟺ T(Q) ≥ 1, so the law is measured only where it is defined (all 1,227 anchors have T ≥ 1) | HEURISTIC derivation, MEASURED-consistent | **(ii)** in the all-Q form, and stronger; legal only stated conditionally on {T ≥ 1} (audit §3.2) |
| **S(x)**, anchored survivor count | `paper/anchored-note.md` §1, §3 | **no** (one phase of W) | whole tile, W = x# | ten levels, to x = 41, W = 3.04·10¹⁴, "the last level this arithmetic reaches" (`paper/wall-note.md` §2) | computed exactly at ten levels | **(ii)**: S(x) ≥ 1 i.o. ⟹ TPC (Proposition 2, PROVEN, `anchored-note.md` §8) |
| **E(x)**, exact rotation-ensemble mean | `anchored-note.md` §1, §3 | **yes** | whole tile | exactly computable at every computed level; E → ∞ is Mertens | PROVEN + computed | **(i)**: an ensemble mean decides nothing about one member (Proposition 1, `anchored-note.md` §3) |
| **β(x) = S(x)/E(x)** | `anchored-note.md` §3; `GLOSSARY.md` §anchored bias | **no** | descends 1.156 → 0.846 over @7..@41 | ten levels | MEASURED; liminf β > 0 ⟹ TPC is PROVEN | **(ii)**, and possibly strictly stronger; no converse is proven |
| **anchored calm δ, ρ, F**, with (1+δ)(1+F) = 1+ρ | `history/staging/import-suen.md` §7 and its correction list | **no** (δ is anchored) | per-level percentages: \|δ\| = 0.29% to 2.02% | seven levels; ρ/F = 2.001 at @11 and 1.266 at @19, so δ exceeds the forced scale at 2 of 7 | the identity is exact, F exact, ρ measured | **(ii)**: any \|δ\| ≤ c < 1 is TPC-strength through the identity (`REFUTED.md`, the fourth wrong-direction arrival) |
| **anchored caps cap₁, cap₂, cap_K, capU_K; floors; K\*** | `paper/staircase-note.md`; `GLOSSARY.md` §staircase cap | **no** | per-level integer counts | floors at @11, @13, @17, @19; K\* measured 0, 0, 2, 10, 27, 69 at @11..@29 | PROVEN caps, CERTIFIED floors, finite | **(i)** while at named levels; any all-x family with floor(x) → ∞ is **(ii)** (audit §3.4) |
| **advmin@11 = 16**, the class-uniform ceiling | `history/staging/attack-advmin-1113.md` | **yes** (quantified over classes) | one level | exact at @11, two disjoint proof stacks | PROVEN at that level | **(i)**, and it CLOSES the class-uniform family: 16 sits 18 below the anchored floor 34 |
| **maxsum_m**, largest sum of m cyclically consecutive tile gaps | `research/a3-05-bound-L.md` §5; `GLOSSARY.md` (scan statistic) | **yes** | maxsum_m ≥ G₂ always | exact at T₃₇ over all 217,929,355,875 gaps (`history/staging/scanstat-t37.md`) | PROVEN inequality, MEASURED law | **(i)** as an upper-bound instrument; the Bridge Floor caps what it can deliver at ≈ 0.183x |
| **θ ladder, all-positions exponent; R_H** | `research/theta-ladder.md` §5b; `history/staging/phase1-T4-maximal-law.md` | **yes** (all positions) | need_true/z² = 0.5485, 0.4877, 0.4637 at z = 19, 23, 29, self-consistent | exact full-period walks to z = 31; prefix bounds above | MEASURED exactly, the law itself unproven | **(ii)** for the sharp maximal law on R_H at the operative window (audit §3.6a); the H-free ρ̃ form is **(i)** |
| **G₂(x#)** | `research/G2-STATE.md` §1a | **yes** | needs < x′² − 2; proven ≪ x^{4.26645+ε}; measured exponent 1.50 (control 1.57) | exact ladder to x = 37 with an exhaustive maximality certificate (G₂(37#) = 528) | PROVEN upper and lower bounds; the band OPEN | **(i)** across the whole band (2, 4.26645]; **(ii)** only at exponent 2 with constant < 1 |
| **g(x#)**, one-class Jacobsthal at primorials | `G2-STATE.md` §0; `research/two-class-lower-bounds.md` §9 | **yes** | G₂ ≥ g pointwise | Iwaniec 1978 gives g ≪ x² with an inexplicit constant | PROVEN | **(i)** above exponent 2; at exponent 2 with an explicit constant it is prize-adjacent (Erdős #687) |
| **Ĝ(s) = G₂(P(s)#)**, the doubling target's object | `history/staging/attack-doubling-01.md` §1 | **yes** | base-2 chain ratios 3.0000, 5.0000, 2.2000, 5.2727, 3.1034 at s = 2..32 | the last chain datum rests on Wang 2024's A144311 a(18), literature grade | MEASURED | **(i)** for the all-s form; **(ii)** for the eventual form at every C₂ ∈ (3.1034, 4) (audit §3.3) |

**The one exception to "rot-inv means free" is worth stating here rather than
in §5**: E(x), maxsum_m, the θ ladder and G₂ are all rotation-invariant, and
three of the four are still hard. Rotation invariance is what makes a
statement expressible in residues; it is not what makes it cheap.
`research/THE-LENS.md` §5 owns the rule and states it as a triage heuristic,
not a theorem.

## 2. Every proven inequality between them, with direction

**What is wrong here first.** Not one of these inequalities is a bridge in the
useful direction. Every arrow that runs zone-to-tile is either vacuous when
read backward (the floors it puts under G₂ are polylog against a proven floor
of x ln x) or is the postulate again. That is the finding of this section, and
it is stated before the list so the list is not read as an inventory of
options.

**(P1) Z₂(p) ≤ G₂(p#), when the zone holds ≥ 2 pairs [PROVEN, elementary;
stated in the corpus at `zonegap-01.md` §5 as "a one-line theorem"; VERIFIED
at the shared exact levels there].**

The step the statement turns on is that consecutive in-zone openers are
consecutive twin-slot openers of the tile, so the two gap sets agree inside
the zone and no summing of slot gaps is needed. Written out:

*Proof.* Fix p ≥ 7, W = p#, and note p′² < W (`stretch-01.md` §0), so the
zone (p, p′²) sits inside one period. Let A = {a : p < a, a+2 < p′²,
gcd(a(a+2), W) = 1} be the in-zone twin-slot openers, which by the Zone
Restriction Lemma is exactly the set of in-zone twin-prime openers
(`zonegap-02-reduction.md` §1, PROVEN). Suppose a < b are consecutive in A,
and suppose some twin-slot opener c of T_p satisfies a < c < b. Then c > a > p,
and c + 2 < b + 2 < p′², so c ∈ A, contradicting consecutiveness in A. Hence
no tile opener lies strictly between a and b: a and b are **consecutive** twin
slots of T_p, and b − a is one of the tile's consecutive-opener gaps, so
b − a ≤ G₂(p#). Taking the maximum over consecutive pairs in A gives
Z₂(p) ≤ G₂(p#). For p = 2, 3, 5 check directly. ∎

*Direction of use.* Forward it is used nowhere as an instrument, because it
runs the wrong way: it bounds the easy object by the hard one. Backward it is
**vacuous**: Z₂(p) is MEASURED at 3.43 to 4.02 ln³p (`zonegap-01.md` §4), so
the floor it puts under G₂(x#) is polylog in x, against the PROVEN floor
G₂(P(y)) ≫ y (ln y)³ (lnlnln y)²/(lnln y)⁴ (`G2-STATE.md` §0). It is
outclassed by a factor x. What the inequality does carry is the measured
slack: EQUALITY at p = 2, 3, 5, 7, then G₂/Z₂ = 1.40, 2.20, 3.00, 2.08, 1.36,
1.72, 2.32, 3.52, 3.64, 4.12 at p = 11..43, so **past level 7 the tile's
extremal gap lives beyond p′² and Z₂ is not G₂ restricted**
(`zonegap-01.md` §5, MEASURED). That ratio is the reduction's loss, measured
in the only place it can be measured exactly.

**(P2) F(p) ≤ G₂(p#) − p − 1 [PROVEN; VERIFIED at p = 7..17,
`zonegap-02-reduction.md` §3.1 SEC C1].** F(p) is the distance from p to the
tile's first twin-slot opener above p. The −p−1 is the Euclid edge anchor: the
tile carries the twin slot (W−1, W+1), so cyclically an opener sits at
a₀ = −1; the next opener a₁ satisfies a₁ = p + F(p), and the cyclic gap
a₁ − a₀ = F(p) + p + 1 is one of the tile's consecutive-opener gaps, hence at
most G₂(p#). The verification cited reads anchor gaps 12, 18, 18, 30 against
G₂ = 30, 42, 66, 108, so the inequality is loose at every checked level.

*Direction.* Forward this is the corpus's ONE proven head bound, and its
shortfall is exactly the open band: p^{4.2665+ε} against a needed p². Backward
it says G₂(p#) ≥ p + F(p) + 1 ≈ p + 0.72 ln²p, again far below the proven
x ln x floor: vacuous in that direction too, and `zonegap-02-reduction.md` §3.2
notes it is the same fact as the mirror's edge isolation, not a second one.

**(P3) head + Z₂ + tail ≤ width, equality iff k = 2 [PROVEN; VERIFIED
digit-exact at five levels, `zonegap-02-reduction.md` §2 (R0)].** With k the
number of in-zone pairs, width = head + Σ gaps + tail exactly, and for k ≥ 2
the maximum gap is at most the sum of the gaps, with equality iff there is
exactly one gap. The identity is the decomposition the whole zone side rests
on. Its measured shares at band B4 are **1.82% head, 89.72% Z₂, 8.46% tail,
with the tail's share falling** (`zone-tail-01.md`, `QUESTIONS.md`
`Q-zone-tail`, MEASURED at 1,225 zones), so filling in the two small pieces
moves the difficulty nowhere: Z₂ carries nine tenths of the width and carried
it before the tail was measured.

*Direction.* Forward it gives the chain (R1): Z₂ + head + tail < width i.o.
⟹ infinitely many occupied zones ⟺ TPC. Backward, and this is the honest
reading the corpus insists on: **the premise's three objects are defined only
when the zone holds ≥ 2 pairs, so the premise already contains occupancy**,
and by (R0) the strict inequality is exactly "≥ 3 pairs". The implication is
trivially PROVEN and the whole difficulty is producing the premise
(`zonegap-02-reduction.md` §2).

**(P4) The Gap Reformulation: G₂(x#) < x′² − 2 ⟹ Zone Postulate at x ⟹ (i.o.)
TPC [PROVEN, `G2-STATE.md` §1b, `ZONE-POSTULATE.md` §3].** Same edge anchor as
(P2): reading forward from the origin the first twin slot lies within G₂ of
the edge slot, so it lands below x′² − 2 and is a genuine pair. Since
ln(x#) = θ(x) ~ x, the window x² is (ln x#)² and the sufficient condition is a
two-class Jacobsthal exponent below 2.

*Direction.* Forward it is the programme's one route with a defined finish
line (`GLOSSARY.md` §Gap Reformulation). **Backward it fails, and by a
measured factor:** the Zone Postulate does not imply G₂ < x′² − 2, because the
tile's extremal gap lives beyond the frontier past level 7 (P1's ratio table).
The implication is strictly one-way, and §3 quantifies the loss.

**(P5) The stretch chain: A091592-complete ⟹ SP ⟹ strong ZP ⟹ weak ZP ⟺ TPC
⟺ weak SP [PROVEN arrow by arrow, `stretch-01.md` §2].** SP ⟹ strong ZP is
containment (S_p ⊆ zone p). The converse containment FAILS, PROVEN: no zone
fits inside any stretch, so the strong Zone Postulate delivers SP by no
interval argument, and whether some non-containment derivation closes the gap
is OPEN. Weak SP ⟺ TPC is elementary in both directions.

*Direction.* Forward, A091592-completeness is an OEIS conjecture with keyword
`hard` whose companion A091591 records that proving it proves TPC
(`ZONE-POSTULATE.md` §5a), so the top of the chain is not a lever. Backward,
the chain says SP is per level strictly more demanding than zone occupancy, so
descending it costs and never pays.

**(P6) The capture identity: Σ_r capU_K(r) = (C − T) + X(K), equivalently
floor_K = T − X(K) [PROVEN, elementary; VERIFIED at every depth of all 1,227
anchors, `quadpoint-identity-01.md` §1].** The half-open window convention is
load-bearing: the loose convention breaks the identity by exactly one at every
anchor tested.

*Direction.* Forward, the certificate floor_K ≥ 1 is T ≥ X(K) + 1 ≥ 1, a twin
pair in the stretch, hence **(ii)** (audit §3.1). Backward it is the useful
reading and the corpus already carries it: the cap machinery needs no caps,
the certificate at (Q, y) is exactly "X(y) < T", and the transplant instrument
was measuring a classical object in disguise.

**(P7) (1+δ)(1+F) = 1+ρ [exact identity, F exact, ρ measured;
`import-suen.md` §7 as corrected].** δ is the anchored dependence defect, F the
forced scale, ρ the measured ratio.

*Direction.* Forward it converts a bound on δ into a statement about the
anchored survivor count. Backward it kills the target: δ > −1 is equivalent to
S(0) > 0, so ANY bound |δ| ≤ c < 1 is TPC-strength, which is the fourth
recorded wrong-direction arrival (`REFUTED.md`). And δ in fact exceeds the
forced scale at 2 of 7 levels, ρ/F = 2.001 at @11 and 1.266 at @19, so the
bound is not merely TPC-strength but MEASURED false in the shape it was
wanted.

**(P8) G₂(x#) ≥ g(x#) pointwise [PROVEN, elementary; VERIFIED at all ten
shared terms, ratios 2.00 to 8.00, `ZONE-POSTULATE.md` §3].** Twin slots are a
subset of holes.

*Direction.* Forward it imports the Rankin–Pintz–FGKMT lower bounds free.
**Backward it is a warning and the corpus reads it as one** (`ZONE-POSTULATE.md`
§6, route A): G₂(x#) < x′² − 2 implies g(x#) < x′² − 2, an explicit-constant
Jacobsthal bound at primorials, where Erdős problem #687 pays $1000 for merely
g(x#) = o(x²). The floor was checked and holds: no explicit-constant route to
g(x#) < x′² exists in the named literature.

**(P9) maxsum_m ≥ G₂ always, the Bridge Floor [PROVEN, `a3-05-bound-L.md`
§7].** Hence Theorem B (L ≤ 1 + m\*, PROVEN, §5 there) can never prove
L ≤ 1 + m for any m below G₂/(3p), which on the measured law is ≈ 0.183x and
is a positive power of x on any law consistent with the data.

*Direction.* Forward, maxsum bounds L. Backward it is what CLOSED the maxsum
bridge as a 0c→L converter (`REFUTED.md`): any maxsum bound whatsoever floors
the bridge output at ≈ 0.183x.

**(P10) The complementary-window duality maxsum_m + minsum_{D−m} = W [PROVEN;
VERIFIED at all 1484 m on T₁₃; and NOT ours, it is Cressie 1977's complement
identity for the circular scan statistic, `IMPORT-MAP.md` row 1].** Direction:
it converts a max statement into a min statement on the same tile and stays
inside the rotation-invariant layer, so it crosses no bridge.

**(P11) Two more, recorded for completeness because they are the ones that
close routes rather than open them.** The L = 1 residue count is PROVEN
EQUIVALENT to the Zone Postulate, the residue condition being the kill
condition with zero slack and the chain sum vanishing iff G₂ < θ
(`attack-l1-residue.md`); and Shearer's exact criterion on a complete
dependency graph IS the union bound (`import-shearer.md` §4), which is why the
whole local-lemma family closes. Both run only in the closing direction.

## 3. What the Gap Reformulation discards, quantified

**The caveat first: none of these ratios is evidence.** They are flat or
divergent over short ladders, and `ZONE-POSTULATE.md` §5a's square-window
lesson applies to all of them: a margin that grows because the window grows
faster than the gap scale is a scale mismatch, not the primes becoming better
behaved. What follows is a ledger of the loss, not an argument about it.

**The four ratios, at every level where they are computed.**

| ratio | what it measures | values | source |
|---|---|---|---|
| x′²/G₂(x#) | the whole-tile margin against the frontier | 4.50, 4.17, 4.08, 4.03, 4.02, 4.38, 3.34, 3.53, 4.12, 3.72, 3.93, 3.18, 3.39, 3.57 at x = 2..43 | `G2-STATE.md` §2, the fourteen exact terms |
| x²/G₂(x#) | the same in the exponent frame | 2.08, 1.63, 2.88, 2.56, 2.68, 2.41, 2.59, 3.26, 2.76, 2.59 at x = 5..37 | `ZONE-POSTULATE.md` §5 |
| G₂/F | the origin's genuine advantage over the worst case | ≈ 7, growing only polylogarithmically | `ZONE-POSTULATE.md` §5 |
| window/F | what the postulate actually has | can never exceed x′ since F ≥ x′; saturated within a factor 1.0000004 of that ceiling at x = 10⁹ | `ZONE-POSTULATE.md` §5 |
| x²/certificate | the best construction's share of the window | 3.8, 7.8, 18.1, 44.9 at x = 37, 229, 1009, 4001 | `two-class-lower-bounds.md` §10, cited via `ZONE-POSTULATE.md` §5 |
| M(x, x′²)/ln³x | the localized margin | flat at 3.2 to 3.7 over a 47-fold range in x, so the localized margin is x²/(3.5 ln³x) and diverges | `maxgap-law.md` §8 |
| G₂/Z₂ | the reduction's loss, measured exactly | 1.00, 1.00, 1.00, 1.00 at p = 2, 3, 5, 7, then 1.40, 2.20, 3.00, 2.08, 1.36, 1.72, 2.32, 3.52, 3.64, 4.12 at p = 11..43; extended 2026-08-29 to all 22 trusted terms, reaching 8.1429 at x = 79 with the maximum 8.3214 at x = 71 (`measure-g2z2-0829.md` §3, red-team reproduced) | `zonegap-01.md` §5; `measure-g2z2-0829.md` |
| head : Z₂ : tail | where the zone's width sits | 1.82% : 89.72% : 8.46% at band B4, tail share falling | `zone-tail-01.md` via `QUESTIONS.md` `Q-zone-tail` |

**The one number that is not flat is the one that runs the wrong way for the
route and the right way for the postulate.** x²/certificate climbs
monotonically 3.8 → 44.9 over a 108-fold range in x: the best construction's
share of the window collapses. That is an upper bound on x²/G₂ moving, not a
lower bound, and `ZONE-POSTULATE.md` §8 item 4 insists the direction of
inference be stated every time the number is used. It is used here only to say
that the flatness of x²/G₂ over fourteen terms is a small-number effect.

**The structural statement, and it is what the reformulation actually buys and
sells.** Passing from Z₂(p) to G₂(p#) discards the origin. The zone is an
interval anchored at a distinguished point; the tile's maximum gap is taken
over all positions, so the resulting statement is invariant under translation
of the tile and is a statement about residues alone. That is the whole trade:
**rotation invariance is restored, and the price is the factor measured in the
G₂/Z₂ row, which reaches 4.12 by p = 43 and has no proven ceiling.**

**Is it true that every origin-keeping object either expires by x′² or is
TPC-strength?** Checked row by row against §1, and the answer is yes with one
row needing a third word rather than an exception.

- **Expire at or before the zone's width.** The Origin Excess Lemma's advantage
  is positive only below a threshold with ln x\*/ln y ≈ 1.44 at every computed
  level, so the advertised (ln x/ln y)² factor is capped at about 2.2 with a
  measured maximum of 1.372 across the 14-cell table, and at S = x′² the
  advantage does not merely vanish, it **reverses to 0.79305 = e^{2γ}/4**, the
  minimum of the survival curve (`origin-excess.md` §0, §2, PROVEN identity plus
  MEASURED 0.79303 at x = 1487). The anchored caps expire even more sharply:
  inside the zone every strike by a prime q > p on an in-zone slot is a
  self-strike, so the whole cap ledger reduces to the certification identity and
  **adds zero information there** (`zonegap-02-reduction.md` §3.3, PROVEN;
  VERIFIED at five levels). The mirror expires too: certification does not
  survive σ, with composite-membered slots in the image window at every level,
  1 of 16 at p = 7 rising to 21 of 34 at p = 17, and the mechanism is structural
  because the frontier is not a mirror-covariant object
  (`zonegap-02-reduction.md` §3.2, REFUTED as a transfer channel).
- **TPC-strength.** Z₂, head, tail, M, T(Q), floor_K, β, S(x), and any bound on
  the anchored δ: §1's last column, each with its audit pointer.
- **The row needing a third word: X(y) alone.** An upper bound on X with no
  comparison to T is a sieve statement, is legal, and does not expire; it is
  simply never sharp enough. Certifying Σ capU below C − 1 needs the count
  bounded above with relative precision at twin scale, (T − X)/C ~ 1/ln²h, on
  intervals as short as the stretch, down to width 4Q + 4, and **no sieve upper
  bound delivers a constant sharp to 1 + O(1/ln²)**: that precision class is the
  parity wall's (`quadpoint-identity-01.md` §4). So the dichotomy's honest form
  is: expires, or is TPC-strength, or is available at every scale and never at
  the precision the comparison needs.
- **One further qualification, and it is the sharpest fact in this section.**
  The proven bound on the ANCHORED gap is not a consequence of the proven bound
  on G₂; it is the identical theorem, because the DHR sieve is position-uniform
  (`QUESTIONS.md` `Q-anchored-vs-global-gap`, CLOSED,
  `attack-block-09-anchored.md`). The separation between anchored and global was
  measured, is real, and is worth exactly one unit of exponent against a deficit
  of 2.2665. So the information the Gap Reformulation discards is information
  **the proven bound never used in the first place**: the reduction gives up an
  advantage the instrument on the far side cannot exploit.

## 4. The three killers, placed on the chain

**What is wrong with treating these as three separate walls:** they are not
independent, and two of the three are not theorems. The corpus states them
together because three days of attacks moved neither exponent and said why from
independent directions (`README.md` §Status), which is a convergence of
evidence, not a proof of impossibility. Graded lowest-rung-first:

**Killer 1, the class-blind cap at 4.26645: HEURISTIC, with a PROVEN number
inside it.** What is proven is `G₂(x#) ≪_ε x^{4.26645+ε}` (`paper/beta2-note.md`)
and that β₂ has been unimproved since Diamond–Halberstam 2008, everything after
being worse at κ = 2 (Blight 4.45, Franze 4.516, Opera de Cribro 4.83;
`REFUTED.md`). What is **not** proven is that a two-class-only argument cannot
go below it: the exact value of β(κ) is unknown for κ > 1/2 except κ = 1, and
Ford's notes confirm no κ = 2 extremal example exists in print
(`research/sift-limit-attack.md` §2, `ZONE-POSTULATE.md` §3). So the cap is a
property of a construction class plus a closed search, not a barrier theorem.

*Where it bites.* At the input to (P4): the Gap Reformulation is a PROVEN link
from tile to zone, and the only instruments that feed it are dimension-2 sieve
statements. It bites again at (P8) read backward, where the target silently
contains an explicit-constant one-class bound, and once more at Z2's route (b),
where the sieve half needs a κ = 2 lower bound at s = u\*/2 = 1.7829 against
β₂ = 4.26645, short by 2.393× (`attack-wrongdirection-audit.md` §3.8, hand
arithmetic, unstamped, no adversarial pass).

**Killer 2, the almost-all quantifier: this is the one with a THEOREM in it.**
The core is exact counting and needs no measurement: the ensemble has W members
and the anchor is one of them, so a bound admitting an exceptional fraction ε
decides the anchor only if εW < 1 (`anchored-note.md` §3, Proposition 1 part
(i), exact). The audit states the same line as Axis C: the boundary sits at
empty-density ε = 1/W = e^{−(1+o(1))w}, **not at any rate polynomial in w**, and
Axis B records that no quantifier over w (infinitely-many, almost-all, for-all,
averaged) buys anything, since infinitely-many is already fatal
(`attack-wrongdirection-audit.md` §1). The measured half is how far short the
available bounds sit: the second-moment bound gives ε ≈ (Var/E)/E ≍ ln²W/W,
measured 8.38·10⁻⁶ at @19 against the decision threshold 1.03·10⁻⁷, a factor 81
short and growing like ln²W.

*Where it bites.* Squarely on the link E(x) → S(x), which is the only place the
ensemble layer touches the origin. It bites again on the θ ladder wherever an
all-positions statement is weakened to almost-all, and on every "almost all
intervals" import, which is the whole Maier/BV/EH family. It does **not** bite
on maxsum_m or on G₂ itself, both of which are already all-positions objects.

**Killer 3, the equivariance wall: a MEASURED pattern over the attack fleet,
with two proven components.** Operationally, "fails to localise" is this
claim about the ensemble-to-origin step:

> No statement quantified over the rotation ensemble, a mean, a variance, a
> tail bound, a Fourier bound or a correlation inequality, determines the value
> of the statistic at the single phase t = 0, because the ensemble carries no
> structure that distinguishes that phase, and the anchor is measurably
> atypical at the depth any such bound would have to be stated at.

Two components of that are proven. **(a)** The tile's Fourier transform on ℤ/W
**vanishes nowhere**: every local factor is 1 + e(2v/q) up to a unit phase, zero
only when 4v ≡ q mod 2q, which parity forbids for odd q; so the support is
maximal and the whole uncertainty-principle family (Donoho–Stark and its
sharpenings) holds with maximum slack and constrains nothing (PROVEN in one
line, checked numerically at twelve primes, `recon-0828-farfields.md` §2a).
**(b)** The dependency graph is complete, on which Shearer's exact criterion IS
the union bound, which closes the entire local-lemma family
(`import-shearer.md` §4, PROVEN); and generic chaining cannot beat that union
bound either, its entropy integral already exceeding it by 1.054 to 1.099 at the
lower branch, flat across z = 13..23 (`import-chaining.md`, CLOSED).

The remaining component, that the one non-generic structure available, the
constant shift making twin slots S₁ ∩ (S₁ − 2), buys nothing at the anchor, is
measured, and the three tests the brief names are the three that were run:

1. **Mirror symmetrisation gains exactly 0**, and the zero is structural rather
   than empirical: every cap family in play is itself mirror-covariant, the
   covariance σ(K_q(a)) = K_q(w−a) with the comb fixed being a one-line theorem
   (`attack-anchored-01.md` §3, `redteam-0820-night-proofs.md` §1; REFUTED as an
   improvement channel).
2. **The QR-immune classes deliver exactly the guardrail's r/(r−2) and nothing
   past it**: per-prime Z from −0.48 to +1.66 over 3.4 million twin openers with
   the matched control reading the same, and as a certificate the immune subset
   is dominated by simply naming the two classes each small prime kills,
   1219/1219 anchors against 1126 (`attack-z3-immune-01.md` §3, §4; CLOSED). The
   pre-registered matched control is what voided a 6.5σ surplus the control
   reproduced (`README.md` §Status).
3. **The anchored δ exceeds the forced scale at 2 of 7 levels**, ρ/F = 2.001 at
   @11 and 1.266 at @19, so the room-for-dependence reading cannot be quoted as
   a bound and only the identity (1+δ)(1+F) = 1+ρ survives
   (`import-suen.md` §7, as corrected).

*Where it bites.* On the same link as killer 2, E(x) → S(x), and on every arrow
in §1 that would carry a rotation-invariant statement to an origin-keeping one.
The general form the corpus has settled on is not about Fourier at all: an
interval of length L is a diagonal segment of L points in a CRT box of x# cells,
and any theorem that counts, covers or bounds over the box sees the segment only
once L approaches x# (`recon-0828-farfields.md` §0, item 3, which disposes of
the polynomial method, the sumset family and the density-to-interval bridge at
once).

**Summary of the grades, since the brief asks for it explicitly.** Killer 2 is
the theorem (its core is exact counting; its distance-from-available is
measured). Killer 3 is the measured pattern over the attack fleet, with two
proven components and a third that is three tests deep. Killer 1 is the
heuristic: the number is a theorem, the cap is not.

## 5. Is the discarded information provably needed?

**The short answer, and it is a correction to the question as posed.** No. As
literally asked, is the origin information *needed* for a residue-only
statement to reach the zone statement, the answer is PROVEN NO, and the
witness is the Gap Reformulation itself: `G₂(x#) < x′² − 2` is a statement about
residues alone, invariant under translation of the tile, and it implies the Zone
Postulate at x (`G2-STATE.md` §1b, `ZONE-POSTULATE.md` §3, PROVEN). A
rotation-invariant statement reaches the zone statement. The separation the
question is reaching for therefore cannot be between "tile" and "zone", and it
cannot be between "residue" and "interval" at the level of statements either.

**So what is it between?** Two things, and they should not be confused.

1. **Cheap residue statements versus expensive ones.** `THE-LENS.md` §5 states
   the triage rule: if a statement can be phrased in residues it is free and
   probably classical; if it needs an interval it is hard. Read carefully, that
   rule sorts the residue layer by what KIND of statement it is, not by whether
   it is about residues. The free ones are counting and structure statements:
   the census ∏(q−2), the Copying Theorem, the Seam Lemma, the palindrome, the
   grain word, count(6) = ∏(q−4). G₂ is also a residue object and it is not
   free: it is the extremal statistic of the same pattern, and it is the one
   thing the sweep did not find in anyone's hands (`README.md` §Status,
   `PRIOR-ART.md`). The rule as written is a triage heuristic and the corpus
   labels it as such; it is not a theorem, and G₂ is the standing witness that
   the residue layer contains statements as hard as the interval ones.
2. **Statements versus method classes.** The only real separation instrument
   anyone has here is a theorem about a method class, not about a statement.
   Tao's Claim 1 is such a theorem, and `lit-tao-parity.md` reads it at source:
   H4 defines the forbidden sign patterns from the property's **extension**,
   never from how the property is written. That fixes the two ends of the chain
   in opposite positions, both PROVEN:
   - The bare tile property "l₁ and l₂ both coprime to x#" has an **empty**
     forbidden set, since each of l₁, l₂ can independently be taken prime > x
     (λ = −1) or a product of two such (λ = +1). H5 fails and Claim 1 is vacuous
     on it; the same holds for any congruence-defined property, since every
     reduced class carries numbers of both Liouville signs
     (`lit-tao-parity.md` §2.1, PROVEN modulo Dirichlet, and confirmed by Tao's
     own converse).
   - The zone property "coprime to x#, and x < l₁ < x′²" has extension exactly
     the twin prime pairs in (x, x′²), whose forbidden set is Example 3's
     (+1,+1), (+1,−1), (−1,+1), with the origin in its convex hull. **H5 holds
     and Claim 1 applies** (`lit-tao-parity.md` §2.2, PROVEN given H4 and
     zone crystallization).

**Which means the exemption is real, is narrow, and is not a licence.** The
finite-periodic exemption evaporates at exactly the point where the reduction
bites, and the obstruction does not care that the zone property is *written*
with no prime in it. What survives the exemption is Door 5 only: a proof of
`G₂(x#) < x′² − 2` that is extremal or combinatorial, a covering argument, an
explicit construction, a pigeonhole over ℤ/x# **with no sieve weight anywhere**,
has no ν to reweight and Claim 1's proof has no purchase on it
(`lit-tao-parity.md` §2.2, `wall-note.md` §2). Any route that proves the zone
statement by bounding sums against a non-negative sieve weight is inside the
obstruction, exemption or no exemption. And `attack-obstruction-audit.md` adds
the sharper constraint from the other side: the tile-side target asks for sieve
positivity at u = 2·ln x′/ln x, which exceeds 2 by 2(ln x′ − ln x)/ln x → 0, so
it converges to the parity boundary from above with margin tending to zero,
where the κ = 1 lower-bound function f(u) = 2e^γ log(u−1)/u vanishes
(`covering-dive.md` §1.2, Granville's account transcribed).

**Is there a THEOREM that no residue-only statement reaches the zone
statement?** **There is not**, and nothing in this corpus or in the searched
literature is a candidate. Stated plainly, so it cannot be misread: no
separation theorem of that shape is on record here, the corpus's own audit says
its separations are never model-theoretic, "strictly weaker" always means "the
target does not imply TPC through any bridge this corpus holds", witnessed by an
explicit function or by the target already being proven
(`attack-wrongdirection-audit.md` §0), and the one statement of that shape that
does exist runs the other way, since P4 exhibits a residue-only statement that
reaches. [PROVEN for the non-existence-here; OPEN as a mathematical question.]

**Is there a heuristic?** Yes, three, and none of them is close to a proof.

- **The triage rule with its one paid-out prediction.** `THE-LENS.md` §5 and
  `ZONE-POSTULATE.md` §7 predict that the failure mode of any argument reaching
  an interval conclusion without an interval-versus-residue step is a silent
  equidistribution assumption. It was paid out once against a published
  programme: Holt's Legendre result (arXiv 2603.25915 Theorem 3.3) rests on his
  Conjecture 2.1, approximate uniformity, stated as a conjecture supported by
  samples, reached from inside two decades of work on these same objects
  (`PRIOR-ART.md`). One correct prediction against one example is evidence about
  the rule's usefulness, not about its truth. [HEURISTIC]
- **The CRT-diagonal statement.** An interval of length L is a diagonal segment
  of L points in a CRT box of x# cells, and any theorem that counts, covers or
  bounds over the box sees the segment only once L approaches x#
  (`recon-0828-farfields.md` §0 item 3). This is the operational content of the
  equivariance wall and it has closed three import families on its own. It is a
  statement about which theorems apply, not a proof that none can. [HEURISTIC,
  with the individual closures at PROVEN or CLOSED]
- **The measured price of the origin.** The separation between the anchored gap
  and the global gap is real and correctly measured, and it is **worth exactly
  one unit of exponent against a deficit of 2.2665**; further, the anchored
  quantity's only proven bound is β₂ = 4.26645, the identical theorem rather
  than a consequence, because the DHR sieve is position-uniform
  (`QUESTIONS.md` `Q-anchored-vs-global-gap`, CLOSED,
  `attack-block-09-anchored.md`). So the discarded information is priced: not
  negligible, and not sufficient. [MEASURED, one closure]

**What would a proof of such a separation even look like?** It would have to be
a theorem about a method class, quantified over arguments rather than over
statements, because a statement-level separation is impossible here on the
evidence above: P4 already exhibits the implication. The two instruments in this
corpus of the right shape are Tao's Claim 1, which quantifies over H3 arguments
whose entire arithmetic input is upper and lower bounds against a non-negative
weight, and Shearer's exact criterion, which on a complete dependency graph IS
the union bound and thereby closes an entire technique family
(`import-shearer.md` §4, PROVEN). A separation of the kind wanted would have to
name a class, "arguments using only rotation-invariant data about T_x", and give
that class a closure property, and exhibit a data-preserving perturbation that
changes the truth of the zone statement while fixing the class's inputs. Nothing
here has such a perturbation: the tile is a single deterministic object at each
level, so the natural candidate, the rotation ensemble, is exactly the thing
killers 2 and 3 say cannot see the anchor. And the obstruction's own scoping
cuts the other way at the finite levels this corpus can compute: Claim 1's proof
is asymptotic everywhere, so **no computed level is evidence about it in either
direction**, and β(x) > 0 at ten levels is not and can never be evidence that
the obstruction is soft (`lit-tao-parity.md` §2.3, PROVEN).

**The one sourced item that bears on the weakest form of the target.** The
corpus's minimal requirement is non-annihilation infinitely often
(`anchored-note.md` §8, Proposition 2, PROVEN). Tao addressed that shape
directly in a 2022 comment: the obstruction does not rule out a sieve with a
non-trivial non-uniform bound holding for infinitely many N but not all, but
such a thing "would be a very unusual species of sieve that does not resemble
any existing sieve", would "have to be sensitive to the fluctuations of the
Liouville function", and is therefore "of comparable difficulty to the type of
problem one is trying to attack in the first place" (`lit-tao-parity.md` §2.4,
SOURCED for the quotation, HEURISTIC for the reading). So the i.o. quantifier is
a genuine gap in the obstruction's coverage and it is priced as no easier than
the problem.

**The section's answer, at the correct rung.** The information the Gap
Reformulation discards is PROVABLY NOT NEEDED for the implication to run, is
MEASURED to be worth about one unit of exponent against a deficit of 2.2665, and
whether it is needed for any PROOF of the tile-side statement is OPEN with no
theorem on either side. The honest position is that the reduction is lossy by a
factor measured at 4.12 by p = 43 with no proven ceiling, that the loss is not
the reason the route is stuck, and that the reason the route is stuck is the
open exponent band, which sits on the far side of the reduction where the origin
was never being used.

## 6. Inconsistencies found

Five, none of them a number that is wrong, all of them a place where two files
say the same phrase about two different objects or state a bound for one object
and use it for another. Each is given with file:line on both sides.

**(I1) "window/G₂" names two different ratios, and the two bands do not
match.** `research/ZONE-POSTULATE.md`:257 reads "window/G₂ sits flat at 3 to 4
with no trend", where §5's own worked example at :245 uses window = x′² − x
(1644/528 = 3.11 at x = 37). `research/history/staging/zonegap-01.md`:96 reads
"window/G2 is FLAT at 3.2-4.5 over the 14 exact levels", citing
`research/G2-STATE.md`:345, whose column is headed **x′²/G2** and runs 3.18 to
4.50. Evaluated on the ladder, the x′² − x convention runs 3.50, 3.67, 3.67,
3.80, 3.76, 4.18, 3.19, 3.40, 4.01, 3.61, 3.84, 3.11, 3.31, 3.50 at
x = 2..43 [ARITHMETIC on `G2-STATE.md` §2's terms; no producer], so its band is
3.11 to 4.18 and ZONE-POSTULATE's "3 to 4" understates the top by 0.18 while
zonegap-01's "3.2 to 4.5" is the other convention's band quoted under the same
name. Neither number is wrong; the word "window" is doing two jobs.

**(I2) "Z₂ is not G₂ restricted" against "Z₂ IS the whole-tile gap object
restricted".** `research/history/staging/zonegap-01.md`:107 says "Past level 7
the tile's extremal gap lives beyond p'^2: Z2 is NOT G2 restricted, and the zone
maximum is strictly easier."
`research/history/staging/zonegap-02-reduction.md`:38 says "**Z2(p) IS the
whole-tile gap object restricted to the head window (p, p'^2).**" Both are true
and they use "restricted" in opposite senses: the second means the gap
MULTISETS agree inside the window (Lemma A), the first means the MAXIMA differ
because the tile's argmax lies outside it. Read side by side without the
distinction they contradict, and the second is the one a summary is likely to
copy.

**(I3) A bound proven for the conditionally-defined object is used for the
unconditionally-defined one.** `zonegap-02-reduction.md`:89 defines F(p) as
"the distance from p to the tile's first twin-slot opener above p", defined at
every p, and uses it in (R2), the non-circular sufficient form.
`zonegap-02-reduction.md`:122 then states and verifies "**head(p) ≤ G2(p#) −
p − 1**", and "head" is the zone-side object, which §1 of the same file flags as
presupposing occupancy ("'head' presupposes an in-zone first slot"). The Euclid
anchor's proof works for F unconditionally, so the substitution is sound, but
the file states the bound for the object it is NOT entitled to use in (R2). One
sentence would fix it.

**(I4) M(x, x′²) and M(x, x²) are quoted as one object on the strength of a
seven-level coincidence.** `research/ZONE-POSTULATE.md`:267 says "the largest
twin-slot gap inside the zone obeys M(x, x′²)/ln³x flat at 3.2 to 3.7", citing
`research/maxgap-law.md` §8, whose table at :513 is headed **M(x,x^2)** and
whose flatness statement at :523 is about `M(x,x^2)/ln^3 x`. The identification
rests on `zonegap-01.md`:53, which reports that the two windows "happen to bind
the same gap at all seven" levels. "Happen" is the right word and it is not
carried forward: ZONE-POSTULATE quotes the constant for the zone window with no
mention that the measurement was made on the smaller one.

**(I5) A registry count that no longer matches the registry.**
`research/history/staging/attack-obstruction-audit.md`:67 (2026-08-26) reads
"All 83 rows were read" of `REFUTED.md`; the file today carries 67 route rows
and `README.md`:82-83 says "67 closed routes". A closed-route registry does not
normally shrink, so either the 83 counted something else or rows were merged
under the 2026-08-19 doc-convention extension. Minor, and flagged only because
a stale count in an audit is the kind of thing a later audit cites.

**Where else was looked, with nothing found.** The Gap Reformulation's statement
was compared across `G2-STATE.md` §1b, `ZONE-POSTULATE.md` §3,
`attack-wrongdirection-audit.md` §1 and `GLOSSARY.md`: all four agree that the
transition is at exponent 2 **with constant strictly below 1** and that an
unspecified constant at exponent 2 implies nothing. The Zone Postulate's
strong/weak split agrees across `ZONE-POSTULATE.md` §2, `stretch-01.md` §2 and
`anchored-note.md` §8. The TPC-strength labels for Z2, D, A, 1d, 1e, 8, X and 0
agree between `attack-wrongdirection-audit.md` §2 and the corresponding
`QUESTIONS.md` rows. The lower-bound ladder (free FGKMT, then x ln x, then
K–K's y ln³y) agrees between `G2-STATE.md` §0, `ZONE-POSTULATE.md` §3 and
`README.md` §Status, including the "NOT refereed" marker on both of the upper
two.

## 7. Questions not in QUESTIONS.md that would sharpen the map

Understanding questions only; none is a route, and each was checked against
`REFUTED.md` (all 67 rows) and against `research/PRIOR-ART.md` and
`SEARCH-CONVENTIONS.md`, which own the novelty position. Nothing below is
claimed as new mathematics; they are measurements of objects this corpus already
holds. Ranked by what they would settle.

**Q1. Is G₂(x#)/Z₂(x) bounded, and if not, how does it grow?**
This ratio is the exact, measurable price of the Gap Reformulation, and it is
the only place the reduction's loss can be seen without an asymptotic. It is
computable at every level where both objects exist: G₂ at 22 trusted terms to
x = 79 (`a144311-full-ladder.js`) against Z₂ known at 27,292 zones to 10¹¹, and
the corpus records it only at the fourteen exact terms
(`zonegap-01.md` §5, 1.00 → 4.12). *TPC-strength label:* **(i)** as a
measurement, and the label must be stated in halves, because an UPPER bound on
G₂/Z₂ combined with any Z₂ bound below the width is **(ii)**. *Grep showing it
is unasked:* `grep -c 'G2/Z2' research/QUESTIONS.md` returns 0; so does
`grep -c 'Z2 <= G2'`.

**Q2. At which x does the tile's maximal-gap interval leave (x, x²), and does it
ever lie inside a zone?**
`zonegap-01.md`:53 reports that the windows (x, x²) and (x, x′²) bind the same
gap at all seven M levels, x = 211..9973, while `zonegap-01.md` §3 measures the
zone's own binding gap sitting at u = 0.9992..1.0000 on the last fifteen
envelope steps. Those two facts are about different families and they point in
opposite directions on the same question, which is why the question is worth
asking rather than assuming. It is also the direct test of (I2)/(I4).
*TPC-strength:* **(i)**, a location statistic. *Grep:*
`grep -c -i 'where the maximal gap' research/QUESTIONS.md` returns 0.

**Q3. Where in the period is G₂ attained, and how does the multiplicity grow?**
`QUESTIONS.md` `Q-g2-43-term` records that G₂(43#) = 618 is "attained at 8
positions of the period", at one level and as a by-product. The argmax
distribution over the period is the one direct test of killer 3's operational
claim on the object the programme actually holds: if the tile's extremal
structure were origin-sensitive at all, this is where it would show. It costs
nothing new, since both exact-ladder producers already enumerate.
*TPC-strength:* **(i)**. *Grep:* `grep -c -i 'argmax' research/QUESTIONS.md` and
`grep -c -i 'position of the maximum'` both return 0.

**Q4. How often is the zone decomposition tight, i.e. how many zones hold
exactly two pairs?**
(P3) is an equality iff k = 2, and (R0)'s strict form is exactly "k ≥ 3"
(`zonegap-02-reduction.md` §2). The sweep records that every zone to 10¹¹ holds
at least two pairs and that zones with a single pair number zero
(`zonegap-01.md` §2), but not how many hold exactly two. That count is the
measure of how often head + Z₂ + tail actually saturates the width, and it is a
free by-product of a sweep already run. *TPC-strength:* **(i)**. *Grep:*
`grep -c 'exactly two pairs' research/QUESTIONS.md` returns 0.

---

*Staging note; process record, HELD under the publication moratorium. No
existing file was edited, no producer was written and no script was run: every
figure above is cited to the artifact that produced it, per the standing compute
rule. The only derivation carried out here is §2 (P1), whose statement the
corpus already holds at `zonegap-01.md` §5 as a one-line theorem; no novelty is
claimed for it or for anything else in this note. See
`research/history/CHANGELOG.md` for the corpus rule.*
