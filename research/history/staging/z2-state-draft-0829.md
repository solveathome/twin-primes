# Z2: the state of the object (DRAFT, HELD)

<!-- ledger
id: Q-z2-state
status: PARTIAL
todo: none
question: What is known about Z2, the largest gap between twin openers inside the zone (p, p'^2), and at what calibration?
verdict: Draft consolidation only, computes nothing new: the zone statement is an interval statement, the parity obstruction applies to it in full, and no proven statement about Z2 survives past the zone's own width.
-->

> **RIDER 2026-09-04 (orchestrator, from `derive-0904-r0-extension.md` Part 2
> and `redteam-0904-r0-extension.md` §7).** §8 question 2 is answered. The
> equivariance argument is not imported to the zone by analogy: by CRT,
> translating a p′²-wide window by σ in Z/p# is exactly the rotation that
> carries every prime q's strike pair from {0, −2} to {σ, σ−2} mod q, so the
> window ensemble and the rotation ensemble are one action, simply transitive
> on the p# window positions, and the ε·|ensemble| < 1 threshold is identical
> on both sides (DERIVED, red-teamed once). The anchor's DEVIATION does not
> transfer: measured at the zone's own window width over 43 levels to
> p = 199 on the exact second-moment formula of `research/06-variance-theorem.js`
> (which the derivation note wrongly said did not exist), the zone anchor's
> z stays inside two sigma with no drift, −0.49 to +2.13, mean +0.59, against
> the tile anchor's +1.05 to −22,633 (`redteam-0904-r0-extension.js`). Two
> different statistics at two different widths, so the contrast is a fact about
> two measurements and not yet about the objects; an unresolved tension with
> `origin-excess.md`'s 21% deficit at u = 2 is the named follow-up. Also from
> the derivation note, red-teamed: no piece of R0 (head, Z₂, tail, R1, R2, the
> stretch form) is both legal (i) and exempt from Claim 1's H5 with content;
> the only exempt statements are the tile form (a property of the statement
> that does not license a sieve route) and statements asserting no existence.
> Conditional on Claim 1 (Liouville pseudorandomness) throughout; the §8
> question 1 negative is written once so nobody looks again.

*(Consolidation draft. Assembles what is known about Z2 from the zone-side
staging record. Every claim carries a calibration marker (PROVEN, VERIFIED,
MEASURED, HEURISTIC, INFERRED, CONJECTURED, REFUTED, OPEN) and a pointer to the
file it came from. HELD in staging: not promoted, and it edits nothing.)*

## 0. What is hard here, first

**The object cannot be bounded, and every statement that would bound it is the
conjecture.** That is the first fact, and it is not softened anywhere below.

**It is an interval statement, so the triage rule puts it on the hard side.**
`research/THE-LENS.md` §5 owns the rule: a statement phrasable in residues is
free and probably classical, a statement needing a relation between the pattern
and a stretch of the number line is hard. Z2(p) is the maximum gap inside a
named interval. `research/ZONE-POSTULATE.md` §7 applies the rule to the target
by name: "The Zone Postulate is an interval statement", and the census
prod(q-2), the Copying Theorem, the Seam Lemma and the grain word are residue
statements that will not touch it [PROVEN scope statement, cited].

**The parity obstruction applies to the zone form in full, and the exemption
that covers the tile form does not reach it.** `paper/wall-note.md` §2, the head
of the faces section, states the split and it is load-bearing here: Tao's test
runs on a property's extension, a property defined by congruences alone forbids
no Liouville sign pattern, so the bare tile statement `G2(x#) < x'^2 - 2` does
not satisfy the obstruction's hypothesis and no parity theorem names it. But the
reduction consumes the tile only inside the zone, where an x-rough number is
prime, and there the extension IS the set of twin prime pairs, so the zone form
carries exactly the forbidden set "both prime" and the obstruction applies in
full [PROVEN as a reading of Tao 2014, `history/staging/lit-tao-parity.md`; the
exemption covers Door 5 only and does not cover any route proving the zone
statement by bounding sums against a non-negative sieve weight]. Z2 is the zone
form. It is on the covered side of that line, not the exempt side.

**Everything proven toward it is either a residue statement or expires at or
before the zone's own width.** Two expiries, both PROVEN, both cited rather than
re-derived:

- The origin's density advantage reverses exactly at S = x'^2. `origin-excess.md`
  §2, §5 and `ZONE-POSTULATE.md` §6 route B: the excess is a ratio of two values
  of the survival curve, S = x'^2 is the point u = 2 where rho takes its minimum,
  and at the zone's own width the origin carries about 21% LESS than the
  ensemble mean, ceiling rho(2) = e^{2gamma}/4 = 0.793055 [PROVEN mechanism,
  MEASURED 0.79303 at x = 1487]. `stretch-01.md` §3 measures the same constant
  on the finer stretch grid: 0.7980, 0.7978, 0.8021, 0.7946 across four q-bands
  to 1e8 [MEASURED].
- The one proven instrument for the head expires in the open exponent band.
  `zonegap-02-reduction.md` §3.1: F(p) <= G2(p#) - p - 1 from the tile's edge
  pair, and with G2 << p^{4.2665+eps} that misses the needed p^2 by exactly the
  band (2, 4.26645] [PROVEN; VERIFIED at p = 7..17].

**The three killers, as they bite Z2.** The naming and the coordinates are
`README.md` §Status (2026-08-28 paragraph) and the files under each.

1. **The class-blind cap.** Any argument that uses only "two classes per prime"
   is a dimension-2 sieve statement and caps at beta_2 = 4.26645028414864191641
   by construction [PROVEN, `paper/beta2-note.md`]. It bites Z2 twice. Through
   the Euclid edge anchor it caps the head at p^{4.2665+eps} against a needed
   p^2 (`zonegap-02-reduction.md` §3.1). Through the census reformulation it
   caps the certificate: the only sieve path to X(y) < T is a dimension-2 LOWER
   bound on the rough pairs at sieve parameter s = u*/2 = 1.7829, short of
   beta_2 by a factor 2.393 [ARITHMETIC, unstamped, no adversarial pass;
   `attack-wrongdirection-audit.md` §3.8, and that note flags its own number as
   hand arithmetic in its §0].
2. **The almost-all quantifier.** Every "almost all intervals" theorem is the
   wrong quantifier for a maximal gap [`README.md` §Status]. The line is exact
   and it is not polynomial: `attack-wrongdirection-audit.md` §1, Axis C, puts
   the all-positions boundary at empty-density eps = 1/W = e^{-(1+o(1))w}, and
   Axis B records that no quantifier over the level buys anything, since
   infinitely-many is already fatal. On this object the quantifier axis is
   priced and closed: an almost-all-positions bound cannot be steered to the
   origin because certification pins the anchor at 0 and there is exactly one
   usable window per tile [`G2-STATE.md` §1c, `THE-DIALS.md` §1 dial 4], and the
   instrument-slack channel measured 0.3747 nats of oscillation against a need
   of 6.700 [MEASURED, `ioslack-survey.md`, `REFUTED.md` row "the
   instrument-slack channel of the i.o. licence"].
3. **The equivariance wall.** Every ensemble statement, probabilistic or
   Fourier, fails to localise. The statement banked as a wall address is
   `import-boolean-analysis.md` §4: the ensemble's translation group acts
   transitively, so no measure-or-norm conclusion localises at the anchor
   [PROVEN as stated there]. Its price at the anchor is in `paper/wall-note.md`
   Face 1: a bound admitting an exceptional fraction eps decides the anchor only
   if eps*W < 1, and read self-consistently the miss is e^3025 at x = 19 in the
   window ensemble and 1,682 at x = 17 in the rotation ensemble [MEASURED /
   ARITHMETIC as marked there; the earlier mixed-ensemble "factor of 81" is corrected and must never be quoted without naming its two ensembles (`paper/wall-note.md`:261-262)]. On the zone side the same wall is why the
   diverging margin p^2/(c ln^3 p) is budget and not evidence: the square-window
   lesson of `ZONE-POSTULATE.md` §5a says failures vanish because the window
   grows faster than the gap scale, which is asking an easier question as p
   grows, not the primes becoming better behaved.

**What this note does not do.** It runs no producer and computes nothing new;
every figure is cited to the artifact that measured it. It closes no question
and opens no route. It edits no live document, and it is not a promotion of any
HELD note. It does not re-run anything in `research/QUESTIONS.md`, and §8's
proposed questions are checked against that file and against
`research/REFUTED.md`. It is a DRAFT of a consolidated state document for Z2;
`README.md` §Status, `research/G2-STATE.md` §0 and `research/ZONE-POSTULATE.md`
remain canonical and win against anything here.

## 1. Definitions and variants, one table

**Lead with the collisions.** The corpus carries at least four naming defects on
this object, and §5 gives file:line for each: `head`/`F(p)` names two different
objects (a twin-slot distance and a twin-prime distance) that coincide only
under the postulate; `tail` names three objects with only two registered in
`research/GLOSSARY.md`; `window/G2` is quoted against two different windows; and
`M(x, x^2)` and `M(x, x'^2)` are used interchangeably in the live layer.

| object | exact definition | where defined | relation to Z2 |
|---|---|---|---|
| **Z2(p)** | largest opener-to-opener gap between consecutive twin pairs lying wholly inside the zone (p, p'^2); defined only when the zone holds k >= 2 pairs | `zonegap-01.md` §0; `GLOSSARY.md` "Zone gap"; `G2-STATE.md` §1a third bullet | the object |
| **zone** | the interval (p, p'^2), p' the next prime; every hole in it is prime, every twin slot wholly inside it is a twin pair | `GLOSSARY.md` "Zone"; `ZONE-POSTULATE.md` §1 | its window |
| **head, sense (iii) = F(p)** | zone head: a_first - p, the distance from p to the first twin opener strictly above it | `GLOSSARY.md` "Head" sense (iii); `zonegap-01.md` §0 | disjoint from Z2 by construction: head, gaps and tail are counted separately |
| **F(p), R2 sense** | the distance from p to the tile's first twin-SLOT opener above p | `zonegap-02-reduction.md` §2 (R2); TODO §THE TARGET | equals the head sense only when the first slot's closer lands below p'^2, which is the postulate at p (`zonegap-02-reduction.md` §1 convention caveat) |
| **tail, zone sense** | p'^2 - a_last, measured to the OPENER, carrying a deterministic +2 the head does not | `zone-tail-01.md` §1; `zonegap-01.md` §0 | disjoint from Z2; NOT the `GLOSSARY.md` "Tail" entry, which is the scour tail q^3 > W+1 |
| **width** | p'^2 - p, the zone's length, ~ p^2 | `zonegap-02-reduction.md` §2 | width = head + sum(gaps) + tail exactly |
| **the record envelope, env(p)** | the largest published twin-gap record wholly below p'^2 (A113274/A113275 ladder) | `zonegap-03-model.md` §1; `a113274-gap-records.js` | Z2(p) = env(p), D(p) := Z2 - env identically 0 [PROVEN conditional on the adopted ladder; VERIFIED 27,292/27,292] |
| **D(p)** | the posited below-record correction field Z2 - env <= 0 | posed `zonegap-01.md` §7, killed `zonegap-03-model.md` §1 | identically zero: there are no D-binding zones |
| **M(x, x'^2)** | the largest twin-slot gap inside the localized window | `ZONE-POSTULATE.md` §5; `maxgap-law.md` §8 measures M(x, x^2) | same number at all seven measured levels (`zonegap-01.md` §1, 7 of 7 EXACT); the two labels are used interchangeably in the live layer and should not be |
| **stretch S_Q** | [Q^2, Q'^2), the onset shell of Q read as an interval; the zone's LAST stretch is S_p | `stretch-01.md` §0, §1 | S_p is a subset of zone p; a stretch serves many zones (S_q lies inside zone p for every prime p in [q, q^2)) |
| **T** | twin count in S_Q (both members inside) | `quadpoint-identity-01.md` §1 | T >= 2 is what makes Z2 defined on the stretch grid |
| **X(K)** | pairs in S_Q with both members composite and min(lpf(a), lpf(a+2)) > p_K | `quadpoint-identity-01.md` §1 | the capture identity floor_K = T - X(K) |
| **capU_K(r)** | r's surviving candidate count at depth K in the transplanted cap family | `attack-quadpoint-01/02`; identity at `quadpoint-identity-01.md` §1 | sum_r capU_K(r) = (C - T) + X(K) |
| **C** | capacity: channel pairs (a, a+2) with both members in S_Q | `quadpoint-identity-01.md` §1 | the certificate is sum_r capU_K(r) <= C - 1 |
| **floor_K** | C - sum_r capU_K(r), the certified survivor floor at depth K | `quadpoint-identity-01.md` §1 | floor_K >= 1 is TPC-strength (§4) |
| **y\*, K\*** | the crossing depth: least K with X(K) <= T - 1 | `quadpoint-identity-01.md` §2 | exists iff T >= 1, so its all-Q form presupposes the strong stretch postulate |
| **u\*** | root of u*omega(u) = 2, u* = 3.565845, 1/u* = 0.280438 | `quadpoint-prior-art.md` via TODO Z2 | the exact crossing exponent; the zero-parameter candidate 1/(2e^gamma) = 0.280730 is its u -> infinity form |
| **weak Zone Postulate** | infinitely many zones occupied | `ZONE-POSTULATE.md` §2 | PROVEN equivalent to TPC, both directions, elementary |
| **strong Zone Postulate** | every zone occupied | `ZONE-POSTULATE.md` §2 | strictly stronger than TPC; nothing implies it short of itself |
| **SP, the Stretch Postulate** | every stretch S_q contains a twin pair | `stretch-01.md` §2 | SP => strong ZP by containment; the converse containment FAILS (no zone fits inside any stretch), so SP sits strictly above |
| **A091592-complete** | no twin-free window (n^2, (n+1)^2) for n > 122 | OEIS A091592; `ZONE-POSTULATE.md` §5a; `stretch-01.md` §2 | A091592-complete => SP => strong ZP => weak ZP <=> TPC <=> weak SP |

**Two symbols for one object, and one symbol for two.** `head(p)` and `F(p)` are
one object under two symbols in `zonegap-01.md`/`GLOSSARY.md`, and `F(p)` is a
second, larger object in `zonegap-02-reduction.md` §2 (R2) and in TODO's TARGET
block. `env(p)` and `Z2(p)` are one object under two symbols since
`zonegap-03-model.md` §1. `tail` is one symbol for three objects (scour tail,
distributional tail, zone tail), and `GLOSSARY.md` registers the first two only.

## 2. PROVEN

**Lead with the limit.** Nothing in this section bounds Z2. Every item either
certifies (turns slot language into prime language), decomposes, or bounds
DESTRUCTION. `zonegap-02-reduction.md` §5 states the gap in its own words: "No
statement anywhere about WHERE survivors sit; every proven item here bounds
destruction or restates certification." Three of the items below are
wrong-direction by construction, and they are marked.

**The logical spine.**

- **Weak Zone Postulate <=> TPC** [PROVEN, both directions, elementary,
  `ZONE-POSTULATE.md` §2]. Forward: occupied zones sit above p and p -> infinity.
  Backward: for a twin pair (r, r+2) with r > 3, take p the largest prime below
  r, then p' = r and the pair lies in zone p.
- **Strong Zone Postulate is strictly stronger than TPC** [PROVEN, same section].
  Nothing implies it short of itself. Every G2-based route proves the strong
  form, because a gap bound is uniform by construction.
- **The chain above** [PROVEN, `stretch-01.md` §2]: A091592-complete => SP =>
  strong ZP => weak ZP <=> TPC <=> weak SP. The converse containment SP <= strong
  ZP FAILS: no zone fits inside any stretch, so no interval argument delivers SP
  from strong ZP.

**R0, the partition identity** [PROVEN; VERIFIED digit-exact at p = 7, 11, 13,
17, 23, `zonegap-02-reduction.md` §2 SEC B]. When the zone holds k >= 1 pairs,
width = head + sum(gaps) + tail EXACTLY; for k >= 2, Z2 <= sum(gaps), hence

> head + Z2 + tail <= width, equality iff k = 2, strict iff k >= 3.

**Hypotheses, stated because they are the whole difficulty.** head, tail and Z2
are DEFINED only when the zone holds at least two pairs. Occupancy is not
concluded by R0; it is assumed by R0's own definitions.

**R1, the chain as tasked** [PROVEN, trivially, with its circularity stated,
`zonegap-02-reduction.md` §2]. Z2(p) + head(p) + tail(p) < p'^2 - p for
infinitely many p => infinitely many zones occupied <=> TPC. The premise already
contains occupancy, and by R0 the strict inequality is exactly "k >= 3". The
implication is trivial; producing the premise is TPC-strength.

**R2, the non-circular sufficient form** [PROVEN, same section]. With F(p) the
distance from p to the tile's first twin-SLOT opener above p: F(p) < p'^2 - p - 2
for infinitely many p => weak ZP <=> TPC, and for EVERY p => strong ZP. This is
the form to quote, because its premise does not presuppose occupancy.

**The occupancy caveat, carried on all three.** `zonegap-02-reduction.md` §1
states it: "head" presupposes an in-zone first slot. The tile's first twin-slot
opener above p equals the zone's first pair opener PROVIDED its closer lands
below p'^2, which is the postulate at p. So R2's F and R0's head are the same
number exactly on the set where the postulate holds, and the corpus has no
proof that this set is everything.

**The Zone Restriction Lemma (Lemma A)** [PROVEN; VERIFIED at p = 7, 11, 13, 17,
23, `zonegap-02-reduction.md` §1]. The in-zone twin-slot openers of T_p and the
in-zone twin-prime openers are the SAME SET. Consequently every zone statistic
has two readings, prime-side and slot-side, and they are equal numbers, not
analogous ones: Z2(p) IS the whole-tile gap object restricted to (p, p'^2). Its
two supporting clauses, each one line and each verified per level: the first hole
of T_p above 1 is exactly p'; every hole in (p, p'^2) is prime.

**Z2(p) <= G2(p#)** [PROVEN, one line, `zonegap-01.md` §5]. In-zone pairs are the
tile's twin slots. VERIFIED at the shared exact levels: EQUALITY at p = 2, 3, 5,
7, then G2/Z2 = 1.40, 2.20, 3.00, 2.08, 1.36, 1.72, 2.32, 3.52, 3.64, 4.12 at
p = 11..43. Past level 7 the tile's extremal gap lives beyond p'^2, so Z2 is NOT
G2 restricted and the zone maximum is strictly easier.

**Z2(p) = env(p), D(p) identically 0** [PROVEN conditional on the adopted
A113274/A113275 ladder being the true running max; VERIFIED 27,292 of 27,292
zones and through 204 equality assertions, `zonegap-03-model.md` §1]. Two lines:
every in-zone gap lies wholly below p'^2, and the largest twin gap wholly below
any bound is the last record before it (<=); wherever the record's start s_k > p
its two bounding pairs are in-zone and consecutive there (>=). The premise
s_k > p holds at all 27,292 swept zones and s_k^2 > e_{k+1} at all 79 ladder
transitions from record 3, tightest ratio 4.74, so the identity runs to
e_82 = 7.05e16. **Consequence, and it is the sharpest structural fact about
Z2:** the per-zone series carries no information the published record ladder
does not; zonegap-01's fitted "law" numbers are deterministic functionals of the
ladder, recomputable in about a second with no twin data.

**The Euclid edge anchor** [PROVEN; VERIFIED SEC C1 at p = 7..17,
`zonegap-02-reduction.md` §3.1]. The tile carries the twin slot (W-1, W+1) at its
edge, so F(p) <= G2(p#) - p - 1, where F(p) is R2's slot object; head(p) equals F(p) exactly on the set where the zone is occupied, and only the F form is unconditional (`zonegap-02-reduction.md`:95 states it for F and :122 for head, the collision §5i names). Checked against the ladder at p = 7..17
(anchor gaps 12, 18, 18, 30 against G2 = 30, 42, 66, 108). **This is the ONE
proven head bound and its shortfall is the whole open band**: p^{4.2665+eps}
against a needed p^2. Companion [PROVEN]: inside the zone, Euclid-type guarantees
give SINGLES only; the only construction-guaranteed pair in the tile is the edge
and it lies in no zone.

**The capture identity** [PROVEN, elementary; VERIFIED at every depth of all
1,227 anchors, `quadpoint-identity-01.md` §1]. On the half-open stretch
S_Q = [Q^2, Q'^2) with BOTH members inside:

> sum_r capU_K(r) = (C - T) + X(K), equivalently floor_K = T - X(K).

**The window clause is load-bearing, not cosmetic.** Finality fails at v = Q'^2,
and (Q'^2 - 2, Q'^2) is a channel pair at 1,227 of 1,227 anchors, so the loose
convention a + 2 <= hi breaks the identity by exactly +1 at every anchor tested
[MEASURED, `redteam-0828-quadpoint.js` SEC C, 12 of 12]. Consequence [PROVEN]:
the whole cap machinery needs no caps; the certificate at (Q, y) is exactly
"X(y) < T in S_Q". Consequence [VERIFIED]: at K = 0 the certificate is CC <= T-1,
and the 8-anchor list {7, 11, 13, 19, 23, 31, 37, 43} is precisely the CC < T
list.

**The L = 1 residue equivalence** [the ROUTE is REFUTED, `REFUTED.md` row "the L = 1 residue count as a smaller target than the postulate"; the lemmas below are PROVEN in part, MEASURED in part,
`attack-l1-residue.md` §0, §2, §3, §6.2]. Three findings, and the calibration
split matters: (a) inside the level-p word, "slot = 0 or -2 (mod p)" and "slot is
killed at fold p" are the SAME condition with no slack [PROVEN; VERIFIED at 237
folds]; (b) T*, the exact threshold at which the L = 1 sum falls to zero,
satisfies T* <= G2 always [PROVEN] and equals G2 at four windows of four
[MEASURED]; (c) the live middle band is empty by three orders of magnitude,
T*/theta_zone = 6.386e-4 to 9.724e-4 across four windows [MEASURED]. **The
honest statement is (b)'s split**, not "proven equivalent": the Zone Postulate
implies the hypothesis by proof, and the reverse rests on a measured equality at
four windows (§5 records where the live layer drops that qualifier).

**The fourteen forced fold-ledger constraints** [PROVEN, scratchpad-grade, no
second reader; `fold-ledger-forced.md` §6, table read from
`research/fold-ledger-01.csv`, 1,226 folds q = 7..9973]. The ledger runs on the
STRETCH grid, width = q'^2 - q^2. Classified as the brief asks:

*Identities* (F1, F2, F3, F5, F6, F7, F10, Lemma B): added_pairs is a function of
width alone, one value per residue class mod 30 with zero spread;
removed_total = by_new + by_old; net = added - removed; the cum_* running sums
with cum_added - cum_removed = cum_twins; width = q'^2 - q^2 = 0 (mod 24) and
stretch_lo = 1 or 19 (mod 30); exactly one channel slot (q'^2 - 2, q'^2) is
dropped per fold boundary and it can never be a twin (1,225 rows, matches
exactly); the hidden prime-member column P_ch(q) = 2*net + removed - cc, asserted
at every row against a direct sieve; and by_old = #{slots with a member divisible
by some p in [7, q)}, row-identical at every row.

*Wrong-direction bounds* (F4b, F8, F9, F11, F12, F13, F14): cc <= by_old; by_new
<= B3 (mean 1.271, max 5, against the column's mean 0.267, max 3; tight at 34.0%;
forces 0 at 297 folds); every by_new kill has opener >= q*q' - 2; three FLOORS on
by_old holding 29.89%, 47.10% and 84.59% of the column with band shares 0.2984
falling, 0.4746 rising and 0.8444 falling; and F14, a CEILING on net. **All seven
point away from occupancy.** The note's own §0 says it: nothing floors net,
`min net = 2` over 1,226 folds is a measurement of occupancy and not a proof, and
bounding the short-window fluctuation below the mean at every fold IS the Zone
Postulate. The forced ceiling diverges from net: bound/net reads 1.100 to 4.517
over six bands with the sharpest floor, 2.250 to 12.875 with closed forms only.

**The zone's exact destruction ledger** [PROVEN; VERIFIED SEC C4 at p = 7, 11,
13, every q, `zonegap-02-reduction.md` §3.4]. The active strikers of the zone are
exactly the primes q <= p, and the fresh-kill count inside the zone is
freshZone(q) = Phi*(floor((p'^2-1)/q), q) - Phi*(floor(p/q), q), simplifying in
the prime regime q^3 > p'^2 - 1 to pi(floor((p'^2-1)/q)) - pi(q-1). This is the
staircase's Theorem 3 transplanted with W -> p'^2. It bounds destruction per
prime exactly; it does not bound where the misses sit.

**The deep end is an onset desert** [PROVEN; VERIFIED at 24 levels and 1,084
(p, delta) cells, `zonegap-02-reduction.md` §4]. (D1) consecutive onset treads
near the frontier are p'^2 - p^2 >= 4p + 4 apart, so the zone's last
p'^2 - p^2 - 1 >= 4p + 3 carries no onset tread at all. (D2) the total
just-onset contribution to the zone's last delta is exactly ONE struck integer,
p'^2 - 2. (D3) the youngest active prime q = p makes 2, 3 or 4 fresh kills in its
whole zone at every level to 97. Consequence: the deep-end loading of Z2 is NOT
an onset-front effect, and the alternative mechanism is eliminated by proof
rather than by measurement.

**The Mirror-Sweep transfer, and its refutation as a channel** [PROVEN and
REFUTED respectively; VERIFIED SEC C2, `zonegap-02-reduction.md` §3.2]. sigma(a)
= W - 2 - a maps in-zone openers bijectively onto the tile openers of the
co-edge window and reverses the gap multiset, so Z2 is sigma-invariant. But
certification does NOT survive the mirror: the image window carries
composite-membered slots at every level, 1 of 16 members at p = 7 rising to 21 of
34 at p = 17. The mechanism is structural: the frontier p'^2 is not a
mirror-covariant object.

**The anchored/staircase machinery degenerates inside the zone** [PROVEN;
VERIFIED SEC C3, `zonegap-02-reduction.md` §3.3]. Cofactor Rigidity's protection
radius q1^2 - 2 with q1 = p' IS the zone frontier, so every strike by a prime
q > p on an in-zone slot is a SELF-strike (strike count = 2 per pair at all five
levels, each pair struck by its own two members), and a self-strike is a twin
found. Inside the zone the whole cap ledger reduces to the certification identity
of Lemma A and adds zero information. The floors are location-blind pigeonhole
counts over width W, and a windowed pigeonhole is vacuous because in-window
survival <=> primality is already known.

**The head-calm lemma and the first-slot recursion** [PROVEN, verified at
p = 29 to 10007 and at all 78,497 prime folds to 1e6 respectively;
`ZONE-POSTULATE.md` §6 route B, `research/a3-06-origin-vs-max.js`]. Folding T_x
by p = x', copy 0 deletes at most ONE slot inside (0, p^2), namely p itself, and
only when (p, p+2) is a pair; and F(new) = F(old) unless F(old) = p. **Both are
REFUTED as routes in the same place**: the recursion's only nontrivial clause is
where the slot moves when F(old) = p, and that is the next twin prime, which is
the postulate. Any argument for the strong form that uses only the fold structure
at the origin is vacuous.

**The stretch decomposition** [PROVEN; VERIFIED at all 25 stretches to q = 97 and
digit-exact at p = 7..97, `stretch-01.md` §1]. (S1) Freeze: for every n in S_q
the destructive influencer set is exactly {r <= q}. (S2) Finality: wheel
survivors in S_q are exactly the twin-prime openers there, as sets. (S3) Zone
identity: (p, p'^2) = (p, r0^2) + S_{r0} + ... + S_p, exactly pi(p) - pi(sqrt p)
full stretches plus a head fragment, and the zone's LAST stretch is S_p.

**The QR kill law at the square anchor, and its guardrail** [PROVEN; VERIFIED
r = 7..31 at all prime anchors to 2000, `stretch-01.md` §4]. Inside S_q, active
prime r kills opener q^2 + t iff t = -alpha or -alpha - 2 (mod r) with
alpha = (q mod r)^2 a nonzero quadratic residue, so only (r-1)/2 of the r generic
forbidden-offset pairs can occur and some offset classes are IMMUNE to r at every
square anchor. **The guardrail is a theorem**: summing kill incidence over all r
offset classes gives 2(r-1) exactly, the same ensemble mean 2/r as a generic
window. The QR structure REDISTRIBUTES kills; it removes none. There is no
density advantage at the square anchor, and the refinement that tried to use the
immune classes is CLOSED (`REFUTED.md`, `attack-z3-immune-01.md`).

**Nothing else in the corpus is at PROVEN rung on this object.** The head's
0.72 ln^2 p coefficient, Z2's ln^3 family, the tail, the 6.0% record deficit and
the depth law are all MEASURED or HEURISTIC and belong to §3 and §7.

## 3. MEASURED

**Lead with the residuals.** No law in this section derives. Every coefficient
below is fitted or estimated on a range two to four decades wide, three of them
are non-monotone across their own bands, and the largest single sweep is
27,292 zones whose per-zone values are 100% redundant given a published record
ladder (§2, D = 0). Two pre-registrations scored 2 of 5 and 6 of 10.

**Z2 itself: the ln^3 family with a drifting constant, and no single exponent**
[MEASURED, `zonegap-01.js -- 1e11`, 315.7 s, embedded; note `zonegap-01.md` §4].
- n = 27,292 zones, p = 2 to about 3.16e5 (the constraint is p'^2 <= 1e11).
- Band constants c3 = Z2/ln^3 p: **3.426 +- 0.497, 3.681 +- 0.362,
  4.022 +- 0.243, 3.930 +- 0.219** at 10^2, 10^3, 10^4 and the top band. The
  sequence is NOT monotone: the top band sits below the one before it, so
  "drifting" in TODO's TARGET block and in `zonegap-02-reduction.md` §2 should
  be read as "not settled", not as a direction.
- Naive power fit over 27,267 zones: e = 3.192. **Controls on the same grid,
  same estimator, matched noise sigma = 0.064**: truth ln^3 reads 3.000 +- 0.003,
  truth ln^2 reads 1.999 +- 0.004, and the deterministic E-form
  a*ln(w/a) reads 3.261. So the measurement is 58 control-sd from constant*ln^3,
  339 from ln^2, and sits BETWEEN constant*ln^3 and the E-form. **No single
  exponent should be quoted**; at stage 1 the same fit read 3.411 and at 1e8 it
  read 3.323.
- REFUTED in-pass: the ln^2*lnln candidate, whose "constant" runs 11.60 to 19.17.
- **The residual is zero and that is the finding**: e = 3.192 is a deterministic
  functional of the record ladder (§2), so it was never a measurement of twin
  data [`zonegap-03-model.md` §1, 204 equality assertions].
- Prereg (`zonegap-01-prereg.md`, sealed commit `cdd753c`, stage-1 output
  sha-bound): **2 of 5**. P1 MISS (top-band c3 = 3.930 below sealed
  [4.05, 4.35]); P2 MISS (mean u = 0.728 above [0.63, 0.71]; frac u>0.8 = 0.462
  against [0.21, 0.33]); P5 MISS with a sign flip (e = 3.192 below [3.38, 3.48]
  and below the E-form read where stage 1 had it above). P3 and P4 PASS. The
  three misses share one mechanism: the per-zone series is not independent.
  Disclosed in the same note: the prereg prose miscounted stage-1 zones (9,592
  written, 9,591 in the sha-bound output).
- Guard, published and record-exact: max load Z2/(0.76 ln^3 s) = **0.7504** at
  the gap's own height, against the record ladder's worst 0.8434
  [`a113274-gap-records.js`, all 82 known records, `ZONE-POSTULATE.md` §4].

**The head: 0.72 ln^2 p, and the residual factor does not derive**
[MEASURED; `zonegap-01.md` §6, `destroyer-census-01.md` §6,
`head-residual-factor.md`, `head-residual-null.md`, `head-residual-hl3.md`, the
last three red-teamed by `redteam-0828-head.md`].
- Sweep figure: mean head/ln^2 p = **0.7229** over 27,267 zones to 1e11 (the p >= 100 subset, `zonegap-01.js` THE HEAD block), against
  the HL mean-gap coefficient 1/(2 C2) = 0.7574 (4.6% under). Worst head against
  the Kourbatov ceiling at height p is 0.7218, at p = 659.
- Census figure, 1,225 zones to 1e8, ratio-of-sums estimator: window values
  0.7064, 0.7177, 0.7236, 0.7192, 0.7344, **non-monotone**; on half-decade bands
  the same estimator spans **0.669 to 0.753**, so the window figures carry range
  composition and are not a convergence to 0.7574.
- Mechanism, exact: head(p) IS the first survivor of the FROZEN sqrt(p)-level
  sieve above p in 1,184 of 1,225 zones (**96.65%**); a tread enters the head
  window in 105 zones and changes the head in 41, the differ-fraction falling
  9.09% to 1.79% across bands [VERIFIED, exact per zone].
- The residual prime-origin factor **h/R = 1.09 -> 1.03 is read against a
  population no prime belongs to**. R is the CONTINUUM inspection-paradox
  functional; a uniform integer origin sees R + 1/2 exactly, an odd origin R + 1,
  and an origin from the coprime-to-30 classes primes actually occupy sees
  R + 2.754 at [1e7, 1e8). So h - R = 5.679 as written, 5.179 discrete-uniform,
  2.925 coprime-to-30: against the population primes occupy the residual is about
  half the quoted figure, and it still falls with height [MEASURED,
  `redteam-0828-head.js`, five decades].
- What ran on 2026-08-28 and did not close it: h - R decomposes exactly and its
  forced part derives; h/R -> 1 follows from beta*CV^2 bounded, with
  beta*CV^2 -> 2 controlling the RATE and not the limit; the mod-30 mechanism the
  old first move named is **NO** by a valid route, class term -0.0001; and the
  remainder is a prime deficit at the two openers that Hardy-Littlewood prices to
  **5.3%** with nothing fitted and the same sign across three decades, HL's own
  1/ln x term absorbing the miss (0.6545 predicted against 0.6214 +- 0.0060
  measured at [1e7, 1e8); 1.038 and 1.147 at the two lower decades). **The 5.49
  s.e. framing is dropped**: the miss is a 0.276% discrepancy in alpha amplified
  19.29x by a near-cancellation, sitting inside HL's own unquantified 1/ln x
  term. **And the route is circular as evidence**: HL implies TPC, so nothing
  established about beta this way is available to the programme
  [`head-residual-hl3.md`, PROVEN by inspection of what is assumed].

**The tail: the field exists, the coefficient does not settle** [MEASURED,
`zone-tail-01.md`, producer `research/zone-tail-01.js` embedded, `--check`
bit-honest, 1.0 s; 1,225 zones to 1e8; HELD and NOT red-teamed].
- Local units c = sum(tail)/sum(ln^2(p'^2)) by band: 0.5740 [0.4315, 0.7423],
  0.7518 [0.6490, 0.8545], 0.7288 [0.6443, 0.8135], **0.7771 [0.7301, 0.8271]**.
  Down then up: the pre-registered <= 0.03 per-step drift is missed on the second
  step (0.0483), so this is band composition on two decades and not a law.
- In ln^2 p units the same numbers read 2.4277, 3.0220, 2.9185, 3.1096, against
  the head's 0.8530, 0.9863, 0.7494, 0.6693 on the same zones; **the factor of
  four is the unit** ln^2(p'^2) = 4 ln^2 p'
  and nothing else (c_p/c_local = 4.0013 at B4).
- Against HL's 0.7574 at the same 782 zones with the same estimator: the head is
  11.6% below it, the tail 2.6% above.
- The one interesting number is **NOT RESOLVED**: t/R = 1.0619 at B4, matched by
  an exhaustively computed class-matched origin null over 5,962,057 origins, but
  the bootstrap [0.9937, 1.1321] contains 1 and the pre-registered rule required
  the interval to clear +0.03.
- **The control saw nothing, which is the result**: three matched non-square
  endpoints give sign tests z = 0.14, -0.54, +0.66 and six paired-difference
  intervals all containing zero. Nothing measured is a property of the endpoint
  being a prime square.
- Prereg scorecard: **six hits, one narrow miss, one split, one unresolved, one
  prediction refuted** (E4b: the sqrt(p) level identifies the tail in 280 zones,
  22.86%, against a registered <= 5; the corrected Mertens price is 15.21%).
- **The R0 shares say the tail does not matter**: 1.82% head, 89.72% Z2, 8.46%
  tail at B4, with the tail's share falling and Z2's rising. Filling the tail row
  moves the decomposition's difficulty nowhere.
- Earlier corpus figures, superseded in precision and reproduced by the new
  engine to three decimals: band means 0.58 to 0.77 in ln^2(p'^2) units and
  decade means 0.578 / 0.768 / 0.766 [`zonegap-01.js`, X = 1e11].

**The 6.0% record deficit, and Kourbatov's b** [MEASURED then IDENTIFIED;
`zonegap-03-model.md` §3, `record-location-null.md`, `lit-kourbatov-shortfall.md`].
- Object: the record process of A113274/A113275, 72 to 82 records over
  e in [1e4, 7.05e16]. Controls passed in-pass: deterministic recovery
  (A = 1.000000, z = 0), injection (abar halved reads A ratio 0.525 against truth
  0.500), and a 200-rep matched Kourbatov-Wolf null.
- SHAPE FITS: count 72 (null 68 +- 8), rate 2.562 per ln x (null 2.356 +- 0.304),
  spacing CV 0.908 (null 0.944 +- 0.100), z sd 1.021 (null 1.264 +- 0.177), all
  inside the null 95%.
- LOCATION FAILS: z mean = **-1.298** (null -0.212 +- 0.244), trend load
  A = **0.9295** (null 0.9895 +- 0.0182): about 6.0% of trend.
- Survives the corrected null at **z = -3.3 over five window cuts**, and Z5's own
  premises on "location" and on n_eff were wrong [`record-location-null.md`,
  PARTIAL]. **Custody caveat, stated by that note**: its producer is
  SCRATCHPAD-GRADE, `embed.js --check` finds no OUTPUT banner, so every figure in
  it is hand-pasted and none may leave that file until a producer carries one.
- **It is Kourbatov's published finite-height shortfall coefficient b = 1.2597**,
  same object, same normalisation, same data, with the in-house median z reading
  -1.2597 [`lit-kourbatov-shortfall.md`, ANSWERED; same SCRATCHPAD-GRADE custody
  caveat]. Reproduction, not confirmation, and unexplained as a mechanism in both
  corpora.
- **The two in-house estimators disagree by 15%**: 1.125 from the
  A-normalisation against 1.298 from mean z. The number is not sharp enough to
  test a mechanism against, which is why TODO Z5's first move is to pin b.
- By D = 0 (§2) this is a statement about Z2 itself, not about a separate record
  anomaly.

**The depth-cost fraction bands** [MEASURED, sealed prereg `7800bd2`, scored in
`attack-quadpoint-02.md`, HELD; caveats applied 2026-08-27].
- K*/pool fell inside all three registered bands over the second decade:
  **0.061 -> 0.050 -> 0.040 -> 0.032** to Q = 10007, sup quiet, twin-Q subfamily
  converged, largest K* anywhere 46 of a 1,146 pool. Band means of K*
  12.20 -> 31.22.
- **The reproduction target is a weaker test than it reads**: a zero-parameter
  main term passes it, main-term K* running 3.92 -> 31.15 against measured
  3.88 -> 31.22, ratio 0.998 at B8 [`attack-roughpair-error.md` §6]. Hitting it
  is necessary and a long way from sufficient.
- Measured band means of ln y*/ln h climb **0.2624 -> 0.2763**, top band 0.9843
  of the zero-parameter candidate 1/(2 e^gamma) = 0.280730 [embedded,
  `attack-quadpoint-03.js` SEC 2]; the corrected asymptote from
  u*omega(u) = 2 is 1/u* = 0.280438, 0.10% below, which moves the target by 6.6%
  of the measured residual.
- The residual drift 0.923 -> 0.984 is reproduced by replacing the Mertens
  asymptotic with the exact partial product, residual -0.0032 -> +0.0000, with
  the asymptotic comparator drifting the other way 1.041 -> 1.004 as control
  [`u2-engine-depth.md`, SCRATCHPAD-GRADE, no embedded producer]; a second and
  independent derivation reaches the same mechanism, reproducing band means at
  0.9985 to 1.0016 [`import-rough-anatomy.md`, HELD]. **Two caveats before either
  is called closed**: agreement is band-mean only, with per-anchor sd 15x the
  mean residual, and the main term is still heuristic.

**The rough-pair error: sub-Poisson, and it is not what binds**
[MEASURED, `attack-roughpair-error.md`, producer `attack-roughpair-error-01.js`
embedded and `--check` bit-honest; HELD].
- **0 of 1,206 anchors reach |E| >= T.** Scatter is sub-Poisson at
  chi^2/df = 0.546 to 0.785, fit-free. The systematic part is 0.1% at the top
  band with the favourable sign. Growth exponents differ by 0.407: rms E
  0.405 +- 0.022 against rms T 0.812 +- 0.018.
- **What binds is DEPTH s, not the error term.** At beta_2 = 4.2665 the main term
  ALONE gives X/T = 3.054 -> 5.631 and RISING; a certificate exists only for
  s < 2.317 measured, drifting toward u*/2 = 1.783 as ln W/ln h -> 0.5; slack at
  the crossing is 1.056 and falling. **The corrected statement is HARDER, not
  softer**: the shortfall is now visible in the main term rather than hidden in
  an unmeasured error term.

**The extinction law and the M_p field, in the zone frame** [MEASURED,
blind-validated; `ZONE-POSTULATE.md` §5, `attack-foldL-06-scaling.md`,
`foldL-window5.md`, `perfold-error-model.md`, `mp-derivation.md`, corrections in
`redteam-0820-empirical.md` §T1 and `redteam-0820-night-empirical.md` §T1].
- In windows of fixed polynomial scale the fold ladder's multi-kills EXTINGUISH:
  the last kill-run of length >= 2 lands at p = **181, 331, 421, 457, 631** in
  windows of 2e7 to 2e11, the fifth run blind and landing inside its sealed band
  [571, 877].
- The law carries its own systematic in writing: a **~20% count overprediction at
  five of five windows**, and the old per-fold +-3*sqrt(lambda) clause FAILED at
  43.2% and is retired. The per-fold error is a deterministic fold-factor field
  M_p with Poisson dispersion around the corrected mean, blind-validated **33 of
  37 inside the 90% bands and 0 of 37 outside 99.73%** at a fresh pre-registered
  anchor, and again **34 of 37** after the partial derivation (prereg committed
  alone at `303711b`). **Custody residual, on record**: producer-02 first exists
  in git 5m21s after the seal, so "the producer did not exist at the seal" is
  unverifiable from git.
- The tail-count transport, which cannot chain on the tile, CAN chain here: the
  (q-2) growth factor collapses to 1 and the qualifying supply hits zero at
  p = 701 in the 2e9 window and stays there. **But the L = 1 counting statement
  the chain reduces to is the postulate in residue notation** (§2), so the zone
  frame's instruments stand while its remaining hypothesis is the target itself.

**Occupancy, at three grids, and none of it is evidence at the gap scale.**
- Every zone of every prime p <= 1e11 is occupied: 4,118,054,813 primes,
  224,376,048 twin pairs, zero failures, 599 s [VERIFIED, exhaustive,
  `research/window-check.js`, `ZONE-POSTULATE.md` §4].
- Every one of the 27,292 zones with p'^2 <= 1e11 holds at least TWO pairs;
  zones with a single pair: 0 [VERIFIED, `zonegap-01.md` §2].
- Every stretch with q'^2 < 2^53 = 9.007e15 is occupied, 5,484,595 of 5,484,596
  by the straddle criterion from adopted tables plus q = 29 by direct sieve
  [VERIFIED conditional on the adopted TOS/A113274 custody, `stretch-01.md` §3].
- **The square-window lesson applies to all three** [`ZONE-POSTULATE.md` §5a]:
  failures vanish because the window grows faster than the twin-gap scale, which
  is a scale mismatch and not the primes becoming better behaved. Margin is
  budget, never evidence.

## 4. The wall on Z2, and the TPC-strength line

**Lead with what is closed here.** Z2 has no band below the zone width that is
not itself the conjecture [`README.md` §Status, 2026-08-28]. Route B, the
density advantage, is CLOSED and ADVERSE (`REFUTED.md`; rho(2) = 0.793055 is the
minimum of the survival curve and the zone's own width is exactly the point
u = 2 where it sits). Counting certificates die permanently: the zone grid at
p = 67 where B/C first crosses 1 [`destroyer-census-01.md`], the stretch grid at
Q = 17 with revivals to 43 [TODO §THE TARGET, `attack-quadpoint-01/02`]. Past
there the whole question is PLACEMENT, and per-prime history-blind caps are the
only proof form that has ever certified survivors in this corpus.

### 4a. Which killer binds at which coordinate

| killer | where it bites Z2 | coordinate | calibration of the coordinate |
|---|---|---|---|
| class-blind cap | the Euclid edge anchor, the only proven head bound | p^{4.26645+eps} against a needed p^2; the miss is the whole open band (2, 4.26645] | PROVEN (`paper/beta2-note.md`, `zonegap-02-reduction.md` §3.1) |
| class-blind cap | the census reformulation's sieve half | a kappa = 2 LOWER bound at s = u*/2 = **1.7829** against beta_2 = 4.26645, short by **2.393x**; a direct twin bound in the same window needs s ~ 1, short by 4.266x | **[ARITHMETIC], hand arithmetic on two cited constants, UNSTAMPED, no adversarial pass** (`attack-wrongdirection-audit.md` §3.8, flagged as such in that note's own §0) |
| class-blind cap | the depth axis, measured | at beta_2 the main term ALONE gives X/T = 3.054 -> 5.631 and rising; a certificate exists only for s < 2.317 measured, drifting toward 1.783 | MEASURED (`attack-roughpair-error.md`) |
| almost-all quantifier | steering any positional bound to the zone's origin | the line is eps = 1/W = e^{-(1+o(1))w}, not polynomial; instrument slack measured at 0.3747 nats against a need of 6.700 | Axis C PROVEN as a criterion (`attack-wrongdirection-audit.md` §1); the slack MEASURED (`ioslack-survey.md`) |
| almost-all quantifier | the anchored-cap floors transplanted into the zone | location-blind pigeonhole over width W; a windowed pigeonhole is vacuous because in-window survival <=> primality | PROVEN; VERIFIED SEC C3 (`zonegap-02-reduction.md` §3.3) |
| equivariance wall | any ensemble or measure statement at the zone/stretch anchor | the translation group acts transitively, so no measure-or-norm conclusion localises at the anchor; eps*W < 1 is required and missed by e^3025 at x = 19 (window ensemble) and 1,682 at x = 17 (rotation ensemble) | the equivariance statement PROVEN as stated (`import-boolean-analysis.md` §4); the misses MEASURED/ARITHMETIC (`paper/wall-note.md` Face 1) |
| equivariance wall | the QR structure at the square anchor | kill incidence sums to exactly 2(r-1), the generic ensemble mean 2/r: redistribution, no removal | PROVEN; VERIFIED r = 7..31 (`stretch-01.md` §4) |
| parity, in Tao's general form | the zone form of the statement | the zone property's extension IS "both prime", so the obstruction applies in full; the congruence-only tile form is exempt and the exemption does not transfer | PROVEN as a reading of the source (`paper/wall-note.md` §2, `lit-tao-parity.md`) |

**The unstamped number, said once more plainly.** s = 1.7829 is the single
route-blocking coordinate on Z2's census half, it is hand arithmetic on
`u* = 3.565845` and `beta_2 = 4.26645028414864191641`, it carries no producer and
no adversarial pass, and the note that produced it says so in its own §0. It
should be stamped before it is cited outside staging.

### 4b. The TPC-STRENGTH LINE on Z2

Verdicts follow `attack-wrongdirection-audit.md` §2: **(i)** strictly weaker than
TPC in the corpus's operational sense (the target does not imply TPC through any
bridge this corpus holds, witnessed by an explicit function or by the target
already being proven); **(ii)** TPC-strength; **(iii)** undetermined.

**TPC-strength, settled (ii). Do not spend a session trying to weaken these.**

| statement | why | record |
|---|---|---|
| the certificate `sum_r capU_K(r) <= C - 1`, equivalently `X(y) < T` | capture identity makes it `T >= X(K) + 1 >= 1`: a twin pair inside [Q^2, Q'^2); i.o. Q with Q -> infinity is TPC | audit §3.1 |
| the all-Q depth law `y* = h^{1/(2e^gamma)}` | `y*(Q)` exists <=> `T(Q) >= 1`, so an asymptotic over all large Q presupposes the strong stretch postulate: STRONGER than TPC; the i.o. form IS TPC | audit §3.2, `quadpoint-identity-01.md` §2 |
| Z2 route (b), beating the twin density in a rough-pair error term | target 1 restated; in asymptotic form it returns T, i.e. Hardy-Littlewood in a short interval, strictly above TPC | audit §3.8 |
| any bound placing Z2 below the window at i.o. p, in the R1 form `Z2 + head + tail < width` | the premise's three objects are defined only when the zone holds >= 2 pairs, so it contains occupancy | `zonegap-02-reduction.md` §2 (R1) |
| `F(p) < p'^2 - p - 2` at i.o. p (R2) | weak ZP <=> TPC; for every p it gives the strong form | `zonegap-02-reduction.md` §2 (R2) |
| `net >= 1` at every fold of the ledger; bounding the ledger's short-window fluctuation below the mean at every fold | it IS the Zone Postulate | `fold-ledger-forced.md` §0, §7 |
| the L = 1 chain sum vanishing (with the dropped `L >= 2` terms restored) | it IS the Zone Postulate in residue notation | `attack-l1-residue.md` §0 |
| SP (every stretch occupied); A091592-completeness | SP => strong ZP by containment; A091592-complete => SP | `stretch-01.md` §2 |
| any positivity statement at the anchored point, i.o. | `anchored-note.md` Prop 2; `REFUTED.md`, the row "bounding the anchored delta by the forced scale (or any constant) as a lemma" (the file is unnumbered; cite it by text) | `paper/anchored-note.md` §8 |

**LEGAL AND OPEN: (a) not proven, (b) not TPC-strength, (c) not in
`REFUTED.md`.** This is the set a session may be spent on. Each carries its
label and a one-line argument.

1. **(i) An upper bound on `X(y)` alone, with no comparison to `T`.** The audit
   names this exactly: "an upper bound on X(y) alone, or an asymptotic for the
   rough-rough census with no comparison to T, is a sieve statement and is not
   TPC-strength. Everything on the T side is" (§3.1). X is the classical
   dimension-2 twin sifting function minus prime-bearing pairs
   [`quadpoint-prior-art.md`], so this is a sieve upper bound, the direction
   sieves give freely.
2. **(i) The conditional depth law: on the set where `T >= 1`,
   `ln y*/ln h -> 1/u* = 0.280438`.** The audit's own repair (§3.2): this form is
   legal, it is what the 1,227 anchors measure, and it is free. What it can never
   do is test the quantifier, since all 1,227 anchors have T >= 1 by
   construction.
3. **(i) Any unconditional two-class exponent in the open band
   (2, 4.26645].** Separation is exhibited, not modelled: 4.26645 is PROVEN while
   TPC is open, and both bridges this corpus holds transition at exponent 2 and
   nowhere else (audit §3.10). It bites Z2 only through the Euclid anchor and
   never reaches p^2, which is exactly why it is legal. The audit attaches a rider
   to that legality: "police the instrument, not the exponent: RML's legality
   rests on the measured floor crossing in (31, 47], not on a proof, and the
   rho -> R_H step that turns it TPC-implying is invisible in the delivered
   exponent" (`attack-wrongdirection-audit.md`:87). The (i) label belongs to the
   exponent alone; the instrument that would deliver it carries its own label and
   must be graded separately.
4. **(i) A derivation of Kourbatov's `b` as a mechanism, and a sharper in-house
   estimate of it.** b is a finite-height shortfall coefficient of a record
   process. It certifies nothing and floors nothing. TODO Z5's own first move is
   to pin b before hunting the mechanism, because the two in-house estimators
   disagree by 15% (1.125 against 1.298). Not in `REFUTED.md`; the closest row is
   the extinction-density fitting model, a different object. Police the quantifier:
   b as posed here is a finite-height coefficient, and an unconditional
   all-heights derivation of it would be an asymptotic statement about maximal
   twin gaps, which is at least item 11's grade, (iii), not (i).
5. **(i) A non-HL derivation of the head's residual remainder.** TODO Z4 states
   what is left: "a derivation of that remainder that is not HL". The HL route is
   proven circular as evidence (`head-residual-hl3.md`), so the legal target is a
   derivation of a mean-scale coefficient by other means. It is a statement about
   E[head], not a bound on any head, so it produces no occupancy.
6. **(i) Resolving the tail's `t/R = 1.0619` surplus.** The bootstrap contains 1
   and the pre-registered rule was not met; `zone-tail-01.md` §0 says what it
   needs, 27,292 zones rather than more analysis of 782. A renewal surplus at a
   prime-square endpoint is a distributional statement about a measured field.
7. **(i) `Z2(p) < p'^2 - p^2` for every p at which Z2 is defined, and whether
   the binding gap's interval always lies wholly inside `(p^2, p'^2)`.** VERIFIED
   at five levels; OPEN in general, with the u-deciles saying "usually, not
   always" [`zonegap-02-reduction.md` §4]. **The argument for (i)**: the statement
   is conditional on the zone already holding >= 2 pairs, so it cannot produce
   occupancy and cannot imply TPC through R0 or R1. Police the quantifier: the
   unconditional form, asserted at every p without the definedness clause, is
   (ii).
8. **(i) A general written proof of the Phi\* transplant's regime boundaries.**
   `zonegap-02-reduction.md` §5 records it as verified at three levels and stated
   for general p without a written proof, "Theorem 3's verbatim with W -> p'^2".
   It bounds destruction, which §2 shows is the wrong direction, so it is legal
   and it is also cheap.
9. **(i) The co-edge window bookkeeping.** `zonegap-02-reduction.md` §3.2:
   derived and unused; whether edge isolation runs the head inequality in the
   OTHER direction was not attempted. Certification does not survive the mirror
   [REFUTED as a transfer channel], so this is bookkeeping about slot structure
   only.
10. **(iii) Whether the strong Zone Postulate implies SP by any non-containment
    route.** `stretch-01.md` §2 disproves the interval argument and leaves the
    general question open. Both endpoints are TPC-strength, but the IMPLICATION
    between two TPC-strength statements is not itself TPC-strength, so a proof or
    a counterexample here is legal. Undetermined because no bridge is known
    either way.
11. **(iii) Whether the record process's trend load `A` rises toward 1 with
    height.** `zonegap-03-model.md` §5: needs records beyond 1e17 or a
    second-order null, neither reachable. Legal as posed; graded (iii) because a
    proof that A -> 1 would be an asymptotic for maximal twin gaps, which is at
    least Kourbatov-conjecture strength and possibly more, and nobody has priced
    that implication here.
12. **(i) Whether the M_p field's anchor-constancy is a measured identity rather
    than a surviving model class.** Bounded only at the ~6-10% one replicate pair
    affords [`G2-STATE.md` §0]. A statement about a fold-factor field's
    dependence on its anchor.

**What is deliberately NOT in that list.** Anything that compares a count in the
zone or the stretch against T, C or the twin density; anything that floors net,
floors a survivor count, or asserts positivity at the anchor; and anything in
`REFUTED.md`, whose zone-side rows are the recognizability-radius route, the
L = 1 residue count as a smaller target, the Maier matrix as a route to the
origin, the origin as a distinguished position at S = x'^2, mirror
symmetrization, the QR refinement of the anchored caps, the instrument-slack
channel of the i.o. licence, and the two-class driving-term route.

## 5. Inconsistencies found

**Expected output; drift is normal across roughly 420 notes.** Nothing below is
applied, and this note edits no file. Severity is graded by whether a reader
acting on the stale text would get a wrong number or waste a session.

### 5a. APPLIED 2026-08-29: the tail was quoted in the wrong unit in the live TARGET block, a factor of four

*(Applied by the orchestrator after verification at the producer; `research/history/CHANGELOG.md` 2026-08-29. `TODO.md` §THE TARGET now carries both units.)*

`TODO.md`:51 reads "tail ~ (0.58..0.77) ln²p (cheapest, least studied)". The
source estimator is `research/zonegap-01.js`:391,
`tailM: mean(z.tail / l2(z.bound))` with `bound = pn * pn = p'^2`
(`zonegap-01.js`:162), so those band means are in **ln^2(p'^2)** units, and
ln^2(p'^2) = 4 ln^2 p' ~ 4 ln^2 p. In ln^2 p units the tail measures **2.43,
3.02, 2.92, 3.11** across four bands, against the head's 0.85, 0.99, 0.75, 0.67
on the same zones [`zone-tail-01.md` §3, embedded producer]. So the TARGET
block's two lines read head ~ 0.72 ln^2 p and tail ~ 0.58..0.77 ln^2 p, making
them the same scale, when the tail is about 4.4 times the head at B4.
`zone-tail-01.md` §3 warns against the inverse error in the same words: "a
report of 'the tail is four and a half times the head' without the unit would be
an artefact quoted as a finding". The intermediate documents are correct or
nearly so: `zonegap-01.md`:150 writes "ln^2(p^2)" and
`zonegap-02-reduction.md`:108 copies "ln²(p²)", both approximately the right
scale (p^2 rather than p'^2, a sub-percent difference at these heights); the
unit is lost only at `TODO.md`:51.

**Consequence for a reader.** The R0 decomposition's shares in the live layer
look like head ~ Z2 ~ tail against a quadratic width; the measured shares are
1.82% head, 89.72% Z2, 8.46% tail at B4, with the tail's share falling
[`zone-tail-01.md` §0]. A reader budgeting effort from TODO's numbers would
overweight the head and underweight nothing, but would price the tail at a
quarter of its size.

### 5b. HIGH: Z2 is absent from both live documents that should route to it

`research/ZONE-POSTULATE.md` is the document that "owns the target" by its own
scope line, and it contains **zero** occurrences of Z2 or "zone gap" (checked
case-insensitively over the whole file). `research/README.md`, the router,
contains zero as well. `TODO.md`:26 states "The programme's one goal: prove Z₂
stays below the window", restated 2026-08-22 by Chris's direction. So the object
named as the head of the programme is reachable in the live layer only from
`GLOSSARY.md`:280 ("Zone gap"), `G2-STATE.md`:274 (§1a, third gap object) and
one clause of `README.md`:180. **This is the gap this draft exists to close**, and
the orchestrator should decide whether the fix is a Z2 section inside
`ZONE-POSTULATE.md` or a promoted standalone state document.

### 5c. APPLIED 2026-08-29: TODO Z4 said the tail field did not exist; it was produced on 2026-08-28

*(Applied by the orchestrator after verification at the record; `research/history/CHANGELOG.md` 2026-08-29. `TODO.md` Z4 now states what ran and what is left.)*

- `TODO.md`:210: "The tail field has NO per-zone dataset at all (cheapest piece
  of the decomposition, zonegap-02 §2)."
- `TODO.md`:223: "First move (tail), untouched: a per-zone tail census on the
  zonegap-01 range".
- `TODO.md` Z7 item (3) still queues "the per-zone TAIL field data the 1e8 census
  could not reach, which is Z4's remaining half".
- Against: `research/history/staging/zone-tail-01.md`, 2026-08-28, 1,225 zones to
  1e8, producer `research/zone-tail-01.js` embedded and `--check` bit-honest,
  with a ten-row pre-registered scorecard.
- `research/QUESTIONS.md` §1 already carries it: row `Z4 | Q-zone-tail | PARTIAL
  | ... | zone-tail-01.md`.

**Same shape as the RESUME's `phase1-T4-maximal-law.md` example**: the generated
index knows, the TODO item body does not. It is exactly the failure the ledger
was built to stop, one layer up. Note also that Z4's first move is only half
executed: the note's range is 1e8, not "the zonegap-01 range" (1e11), and
`zone-tail-01.md` §0 says the unresolved t/R needs the 27,292-zone range.

### 5d. MEDIUM: two constants for the same divergent margin, and a third that no document carries

- `TODO.md`:53, "Margin diverges like p²/(3.9 ln³p)", sourced to
  `zonegap-01.md`:100, which measured it on 27,292 zones.
- `research/ZONE-POSTULATE.md`:268 and :534, "the localized margin is
  x²/(3.5 ln³x)", sourced to `maxgap-law.md`:531, which measured it on seven
  levels.
- `research/history/staging/audit-cross-document-constants.md` §A6 already
  adjudicated the second: both engines that measured the band give 2.93-4.20 and
  2.14-4.39, the quoted "flat at 3.2 to 3.7" is narrower than either, 3.5 is the
  midpoint and not a bound, and **the honest worst case is x²/(4.2 ln³x)**. That
  audit records the correction as computed, escalated to `qc-scope-T.md`:826-847
  as TA-3 graded HIGH, and **never landed**; the strings are unchanged in all four
  live files today.
- The zone-side third estimate (3.9, on 27,292 zones) is not reconciled with
  either of those in any document. Whether 3.5, 3.9 and 4.2 are three
  measurements of one object or of two is not stated anywhere, which is 5e's
  problem.

### 5e. MEDIUM: `M(x, x^2)` and `M(x, x'^2)` are used as one label for two windows

`maxgap-law.md`:523 measures and prints `M(x, x^2)`. `ZONE-POSTULATE.md`:235 and
:267 quote the same band as `M(x, x′²)`. The two windows differ by
`p'^2 - p^2 >= 4p + 4`. `zonegap-01.md` §1 (lines 54-57) reports that they happen to bind the
same gap at all seven of `maxgap-law` §8's levels [VERIFIED, 7 of 7 EXACT], so
the numbers are right and the label is not. Since `ZONE-POSTULATE.md` §4 warns
in the same document that the anchored-per-decade constant and the in-zone
constant "must not be reconciled", the same discipline should apply here.

### 5f. MEDIUM: three published ranges for the tile margin column, and two definitions of "window"

- `G2-STATE.md`:401, "The margin column is flat. Its minimum over the computed
  ladder is 3.18 at x = 37", the column being x'^2/G2.
- `ZONE-POSTULATE.md`:247, "against a window of 1,644, the worst case gives
  window / G₂(37#) = 1644 / 528 = **3.11**", the window being x'^2 - x.
- `ZONE-POSTULATE.md`:257, "window/G₂ sits flat at 3 to 4 with no trend".
- `zonegap-01.md`:96, "window/G2 is FLAT at 3.2-4.5 over the 14 exact levels
  (`G2-STATE.md` §2)".

One phrase, "window/G2", two denominators and three ranges. All four numbers are
arithmetically right for their own definition; the collision is definitional.

### 5g. MEDIUM: `stretch-01.md` calls its own band constants an echo of numbers they do not match

`stretch-01.md`:126-127, "env/ln^3 q holds 3.67..4.65 from decade 10^2 on (the
zonegap band constants, echoed)". The zonegap band constants are 3.426, 3.681,
4.022, 3.930 [`zonegap-01.md` §4]. The stretch figures run higher at both ends.
The objects are not identical (env below q'^2 normalised by ln^3 q at the stretch
anchor, against Z2 below p'^2 normalised by ln^3 p at the zone origin), so
disagreement is expected; what is wrong is the word "echoed", which asserts
agreement. Since `zonegap-03-model.md` proves Z2 = env, a reader may reasonably
read the two as the same measurement.

### 5h. MEDIUM: a calibration drops a qualifier between the record and the live layer

`ZONE-POSTULATE.md`:325, the L = 1 counting statement "is PROVEN EQUIVALENT to
this postulate itself ... and the chain sum vanishes iff G₂ < θ". The record
(`attack-l1-residue.md` §0, findings 1 and 2) proves `T* <= G2` always and
MEASURES `T* = G2` at four windows of four; the equivalence in the direction
that matters rests on that measured equality. `REFUTED.md` states it correctly,
carrying "(three lemmas; T* = G₂ measured at four of four windows)" in the same
row. The live document drops the parenthesis and upgrades the rung.

### 5i. LOW: one symbol, two objects (`F(p)`), and one symbol, three objects (`tail`)

- `GLOSSARY.md` "Head" sense (iii) defines F(p) as the distance from p to the
  first **twin opener** (a realized prime pair). `zonegap-02-reduction.md` §2
  (R2) and `TODO.md`:37-38 define F(p) as the distance to the tile's first
  **twin-slot** opener. The two coincide only when the first slot's closer lands
  below p'^2, which is the postulate at p; `zonegap-02-reduction.md` §1 flags
  this as a "convention caveat" and no live document carries it. R2's
  non-circularity depends on using the slot version, so the distinction is
  load-bearing.
- `GLOSSARY.md` "Tail" registers the scour tail (q^3 > W+1) and the
  distributional tail, and does not register the zone tail p'^2 - a_last, which
  is the object of TODO Z4 and of `zone-tail-01.md`. The companion "Head" entry
  does register its three senses. `applied-0828-live.md` records adding "twin
  opener, head, tail" entries to the glossary; the tail entry it added is the
  scour one.

### 5j. LOW: "verified to 1e11" means two different things on the zone side

`ZONE-POSTULATE.md` §4 reports the strong form verified over 4,118,054,813
primes to 1e11, meaning every prime p <= 1e11 (`research/window-check.js`).
`zonegap-01.md` §2 reports 27,292 zones "to 1e11", meaning every zone whose TOP
p'^2 <= 1e11, i.e. p <= about 3.16e5. Both are stated correctly in their own
notes; a reader comparing the two counts without opening the producers will get
the ranges wrong by five orders of magnitude in p.

### 5k. Where else this pass looked and found nothing

- The Z2 <= G2 ratios (`zonegap-01.md` §5) against `G2-STATE.md` §2's ladder:
  consistent at all ten shared levels.
- The Kourbatov ceiling and its worst loads (0.7504 in-zone, 0.8434 on the record
  ladder): consistent across `ZONE-POSTULATE.md` §4, `zonegap-01.md` §4 and
  `a113274-gap-records.js`.
- rho(2) = e^{2gamma}/4 = 0.793055: consistent across `origin-excess.md`,
  `ZONE-POSTULATE.md` §6, `stretch-01.md` §3, `paper/wall-note.md`,
  `GLOSSARY.md`.
- beta_2 = 4.26645028414864191641: consistent everywhere checked.
- The 6.0% record deficit against A = 0.9295 and the null 0.9895: consistent
  between `zonegap-03-model.md` §3 and `lit-kourbatov-shortfall.md`.
- The capture identity's window clause and the 1,227-anchor count: consistent
  between `quadpoint-identity-01.md`, `redteam-0828-quadpoint.md` and TODO Z2.
- `research/QUESTIONS.md` §1 rows for Z2, Z4, Z5, Z0 against the notes they cite:
  every listed note exists and its ledger block matches the row.

## 6. Cheap unknowns about Z2

**Lead with what this section is not.** Nothing here attacks the wall. Every
item is a measurement, every one is legal by §4b's test, and none of them, run
or not, moves the exponent or produces occupancy. They are ranked by what each
would say about the wall's SHAPE, not by how likely they are to matter.

**Nothing was run for this note.** No producer was written and no figure below is
new. The costing is from embedded neighbours' `elapsed` fields, cited per item.

**TODO Z4's untouched first move, priced.** `TODO.md`:223 asks for a per-zone
tail census on the zonegap-01 range (X = 1e11, 27,292 zones).
`research/zonegap-01.js -- 1e11` carries `315.7 s` in its embedded block
(`zonegap-01.md` header), and it already computes `tail` per zone
(`zonegap-01.js`:205); `research/zone-tail-01.js` runs the whole 1,225-zone
version at X = 1e8 in `1.0 s` (`zone-tail-01.md` §2). **So the run is well under
twenty minutes**: the sieve is the cost and it is 315.7 s, with the renewal
functionals accumulable in the same pass, so six to twelve minutes is the honest
bracket. **It was not run here, and the reason is that it is not decisive.**
`zone-tail-01.md` §0 says what it would settle: the unresolved surplus
t/R = 1.0619 whose bootstrap contains 1. The tail's share of the R0 width is
8.46% and FALLING, Z2's is 89.72% and rising, and that note's own verdict is that
"filling the tail row moves the decomposition's difficulty nowhere: Z2 was the
obstruction before and is more of it after". A run that resolves a renewal
surplus in the smallest and shrinking term of the decomposition is worth doing
and is not worth doing in a session whose object is the wall. It is listed at
rank 5 below for whoever owns Z4.

**Ranked, each with the `QUESTIONS.md` grep that shows it has not run.**

1. **Where does Z2's binding gap sit relative to the last stretch S_p?**
   [label **(i)** legal: it is a conditional placement statistic on zones already
   known occupied, so it produces no occupancy; police the unconditional form,
   which is (ii)]
   Cost: ladder arithmetic plus base primes, the `zonegap-03-model.js` cost class
   (`1.2 s` embedded), because Z2 = env makes the binding gap's interval a
   published record's interval. What it would say about the wall: the SP/ZP
   separation is the one place two TPC-strength statements are known to sit
   strictly apart (`stretch-01.md` §2, the converse containment FAILS), and this
   measures how far apart, in the coordinate the danger actually lives in. It
   also settles `zonegap-02-reduction.md` §4's own OPEN clause, "whether the
   binding gap's interval always lies wholly inside (p², p'²) is OPEN, u-deciles
   say usually, not always".
   Grep: `grep -ci "binding gap" research/QUESTIONS.md` -> 0;
   `grep -ci "last stretch" research/QUESTIONS.md` -> 0.

2. **Instantiate the Phi\* destruction ledger on the stretch grid.**
   [label **(i)**: it bounds destruction, which §2 shows is the wrong direction]
   `stretch-01.md` §6 records it as not reached: "The Phi* ledger was not
   instantiated on the stretch grid (it is proven for zones at zonegap-02 §3.4;
   the W -> q'^2 substitution is verbatim but unexecuted here)". Cost: the
   `zonegap-02-reduction.js` class, `0.1 s` embedded, over 1,229 stretches. What
   it would say about the wall: it completes the destruction/placement split at
   the finer grid, and a discrepancy between the zone and stretch ledgers would be
   the first sign that the transplant is not verbatim. `zonegap-02-reduction.md`
   §5 also owes the general proof of the regime boundaries, which is five lines
   of prose and no compute.
   Grep: `grep -ci "Phi\*" research/QUESTIONS.md` -> 0.

3. **Extend the deep-end desert verification past p = 97 and delta > p'-3.**
   [label **(i)**: D1 is already proven in general by square spacing; this is
   verification of D2's stride condition outside its checked window]
   `zonegap-02-reduction.md` §5: "Deep-end verification stops at p = 97 and
   delta <= p'-3 (LIGHT budget); the desert statement (D1) is fully general by the
   square-spacing argument, but delta beyond ~p' needs the stride lemma's window
   condition re-examined." Cost: the same `0.1 s` engine over more levels;
   minutes at most. What it would say about the wall: the deep-end mechanism is
   currently eliminated by proof at 24 levels and 1,084 cells, and Z2's mass sits
   at u = 0.9992 to 1.0000, so this is verification of the one proven structural
   statement about WHERE Z2's danger lives.
   Grep: `grep -ci "tread" research/QUESTIONS.md` -> 1, and that hit is
   `Q-f-census`, a different object.

4. **Pin Kourbatov's b: reconcile the two in-house estimators.**
   [label **(i)**: a finite-height shortfall coefficient of a record process
   certifies nothing]
   `TODO.md` Z5's own first move, unexecuted: the A-normalisation gives 1.125 and
   mean z gives 1.298, a 15% disagreement, "so the number is not sharp enough yet
   to test a mechanism against". Cost: ladder-only, the
   `record-location-null.js` class (15.4 s) and the `lit-kourbatov-shortfall.js`
   class (0.0 s). **Prerequisite, and it is the real work**: both producers are
   SCRATCHPAD-GRADE with no OUTPUT banner, so every figure in both notes is
   hand-pasted and none may leave those files. Giving them embedded producers is
   the cheap deliverable and it unblocks two notes at once. What it would say
   about the wall: nothing directly; by D = 0 it is a statement about Z2's own
   envelope, and a derived b would be the first structure in the record process
   beyond its envelope.
   Grep: `Q-record-deficit` is MIXED in `QUESTIONS.md` §1 under Z5, and the
   pinning move is named as NOT RUN inside `TODO.md` Z5.

5. **The per-zone tail field at X = 1e11 (Z4's remaining half).**
   [label **(i)**] Priced above at six to twelve minutes. Deliverables: the
   unresolved t/R at 27,292 zones instead of 782, the R0 shares at 1e11 instead
   of 1e8, and the tail's band drift over four decades instead of two. Not
   decisive about the wall, by that note's own §0.
   Grep: `Q-zone-tail` is PARTIAL in `QUESTIONS.md` §1 under Z4, and its §0 names
   the 1e11 range as what is needed.

6. **Carry the stretch straddle criterion past 2^53 with BigInt widths.**
   [label **(i)**: occupancy certified from published tables is verification, not
   proof, and it certifies nothing about any p beyond the table]
   `stretch-01.md` §6: "the straddle criterion stops at q'^2 < 2^53 although
   maxF = 9.99e15 would carry it slightly further with BigInt widths". Cost:
   minutes. What it would say about the wall: nothing; it extends a budget. It is
   listed because it is the cheapest open item on the zone side and because
   `records-placement-01/02` already did the harder half of the same family.
   Grep: `grep -ci "straddle" research/QUESTIONS.md` -> 0.

7. **The TOS F(g) first-occurrence cloud against the Kourbatov-Wolf trend, with
   its own controls.** [label **(i)**]
   `zonegap-03-model.md` §5 and `zonegap-01.md` §7 both record it unused: "The TOS
   F(g) table beyond its 75 starred rows is still unused except through
   zonegap-01's custody guards; fitting the first-occurrence cloud against the KW
   trend (with its own controls) remains open." Cost: table parse, seconds; the
   adopted file is `research/tos-twin-gaps-1e16.txt`, 3,909 rows, sha-checked.
   What it would say about the wall: the record process is the only live
   statistical object left after D = 0, and the first-occurrence cloud is the
   only part of it with more than 82 points.
   Grep: `grep -ci "first-occurrence" research/QUESTIONS.md` -> 0.

**Not proposed, and why.** A larger Z2 sweep (X = 1e12) is item Z7's box queue
with its preregistrations already sealed at `f345adf`; duplicating it on a laptop
would spend the blind test. Anything comparing a zone or stretch count against T,
C or the twin density is (ii) by §4b and is not a measurement question.

## 7. The conjectural true size of Z2(p)

**Lead with the caveat.** There is no derivation here, and the corpus has none
either. Everything in this section is HEURISTIC or MEASURED, the model is a
Cramér-type extreme-value heuristic on top of Hardy-Littlewood, and HL implies
TPC, so nothing in this section is available to the programme as evidence. The
same circularity that `head-residual-hl3.md` proves for the head applies here
verbatim.

**What the model gives, and its shape is not a constant times ln^3 p.** The
Kourbatov-Wolf family (`ZONE-POSTULATE.md` §4, `import-kw-zonegap.md`) predicts
the maximal gap below height H as `E3 = a * ln(H/a)` with `a` the expected
average twin gap at that height, `a = ln^2(H)/(2 C2) = 0.75739 ln^2 H`, C2 the
Hardy-Littlewood twin constant 0.6601618 in this corpus's notation. Kourbatov's
own ceiling statement is the linear-in-ln^3 form: "Maximal gaps between twin
primes are less than 0.76 log^3 p" [PUBLISHED, J. Integer Seq. 16 (2013) 13.5.2 =
arXiv:1301.2242, verified against the published article,
`lit-pdf-kourbatov-grob.md`]. The identity `0.76 = 1/(2 C2) = 0.75739` is this
corpus's inference and not his equation, and **the notation collides**: C2 means
0.6601618 here and 0.75739 in his paper, so the identity is only true read in
ours (`ZONE-POSTULATE.md` §4). The linear-in-ln^3 shape is older still, Rodriguez
and Rivera's Conjecture 66.

**Kourbatov publishes that the slope is not one number.** His four fitted slopes
are **0.4576, 0.4756, 0.5203, 0.5628** for p below 10^6, 10^9, 10^12, 10^15, and
directly under that table he writes that record gaps farther from zero have a
steeper trendline, "This is not a 'one-slope-fits-all' situation!". This corpus
retracted a "flat over nine decades" reading against exactly that sentence on
2026-08-18, and the retraction is on record with its cause: an unreproducible
in-house re-measurement asserted over a published result the repo already cited
twice (`ZONE-POSTULATE.md` §4).

**The model's effective ln^3 coefficient at the zone, worked out.**
[**[MEASURED]**, and it is already stamped: all eight numbers below sit in the embedded OUTPUT block of `research/import-kw-01-calibrate.js` (lines 272-278), cited at `import-kw-zonegap.md` §5, which runs the same four geometric band midpoints. Recomputed here from the constants and reproduced to four digits; this paragraph is a re-derivation of a stamped artifact and not a new one, and by the standing compute rule the artifact is what should be cited (redteam-0829-objects-zm.md §2 E1).] At the zone's cutoff
H = p'^2 ~ p^2, ln H = 2 ln p, so `a = 4 * 0.75739 * ln^2 p = 3.02956 ln^2 p` and

> `E3 = a * (ln H - ln a) = 6.0591 ln^3 p - 3.02956 ln^2 p * (1.10842 + 2 lnln p)`,

whose leading coefficient is `4/C2 = 6.0591` and whose EFFECTIVE ln^3
coefficient, `E3/ln^3 p`, is a rising function of p: **3.633, 4.074, 4.368,
4.532** at band midpoints p = 10^2.5, 10^3.5, 10^4.5, 10^5.25.

**Against what the corpus measures.** zonegap-01's band constants are 3.426,
3.681, 4.022, 3.930 [MEASURED, 27,292 zones]. Ratio measured/model: **0.943,
0.904, 0.921, 0.867**. Three readings follow, and the third is the honest one.

- **The measured drift is CONSISTENT WITH the model's own shape.** The model
  predicts a rising effective coefficient because `ln(H/a)` grows more slowly
  than `ln H`; a constant times ln^3 p is not what HL plus the extreme-value
  heuristic predicts at any finite height. So the measured 3.4 to 4.0 climb is
  what the model does, not an anomaly in the data.
- **The measured values sit BELOW the model at every band, by 6% to 13%, and
  the shortfall does not close.** That direction and rough size are what the
  record-location deficit already says: records run about 6.0% of trend below
  the matched pure-Exp process, A = 0.9295 against a null 0.9895
  (`zonegap-03-model.md` §3), and that deficit IS Kourbatov's published b
  (`lit-kourbatov-shortfall.md`). The 13% at the top band is larger than 6% and
  is not explained by b alone.
- **The two comparisons must not be conflated.** The band arithmetic above is a
  coarse instrument: band midpoints against band means of a ratio, with no
  matched estimator. The corpus's own matched control is `zonegap-01.md` §4,
  which ran the E-form as a control THROUGH THE SAME FIT on the same grid and
  read exponent 3.261 against the measurement's 3.192. That is a 2.1% shortfall
  in the fitted exponent, in the same direction, and it is the reading with
  custody. The band arithmetic agrees in sign and is not a second confirmation.

**What the measured 3.4..4.0 drift is consistent with, and what it is not.**
- CONSISTENT WITH: the ln^3 family with a drifting constant; the Kourbatov-Wolf
  E-form with a 6-13% shortfall; Kourbatov's own rising published slopes.
- NOT consistent with, and these are measured against matched controls on the
  same grid with matched noise sigma = 0.064 (`zonegap-01.md` §4): a constant
  times ln^3 p (58 control-sd away), ln^2 p (339 control-sd away), and
  ln^2 p * lnln p, REFUTED because its "constant" runs 11.60 to 19.17.
- NOT evidence of anything about the postulate. The guard 0.76 ln^3 p holds at
  every one of the 82 published records with worst load 0.8434
  (`a113274-gap-records.js`), and the in-zone worst load is 0.7504
  (`zonegap-01.md` §4), but a guard that holds at 82 points six decades past the
  sweep is a budget statement. `import-kw-zonegap.md` prices the whole
  Kourbatov-Wolf import at PUBLISHED-ANCHOR plus WALL-ADDRESS and names the wall
  as a quantifier: **an almost-all over a log-sparse record sequence cannot
  deliver an every-zone statement.**

**What no model here gives.** A lower bound, an unconditional upper bound, or
any statement uniform in p. Kourbatov's ceiling is a fit with heuristics and
nothing proven (`zonegap-prior-art.md`: Kourbatov 2013 and Kourbatov-Wolf 2019
own maximal twin-prime gaps, "with heuristics and records and nothing proven";
the zone form (p, p'^2) has five neighbours and no owner, and the per-zone
quadratic-cutoff object appears absent on channels calibrated in the same
session). The one PROVEN upper bound on Z2 in this corpus is
Z2(p) <= G2(p#) << p^{4.26645+eps}, which is `p^2` times too weak by exactly the
open band.

## 8. Questions about Z2 not in the ledger

**Lead with the disclaimer.** These are UNDERSTANDING questions, not routes. Each
is checked against `research/QUESTIONS.md` by the grep shown, against
`research/REFUTED.md` (none is a closed row or a restatement of one), and against
`research/PRIOR-ART.md`, `zonegap-prior-art.md` and `research/SEARCH-CONVENTIONS.md`
for novelty language: **no question below is claimed novel**, only unasked here.
Ranked by what an answer would say about the wall.

1. **Which pieces of the R0 decomposition carry the parity obstruction's
   forbidden extension, and which do not?** [label **(i)** as posed: it is a
   classification of statements, not a bound]
   `paper/wall-note.md` §2 establishes that a congruence-only property forbids no
   Liouville sign pattern, so the tile form `G2(x#) < x'^2 - 2` is exempt, while
   the zone form's extension IS "both prime" and is covered in full. R0 splits
   the zone form into head, Z2 and tail. head(p) and tail(p) are distances to
   twin PRIMES and inherit the covered extension. **Z2 itself is a gap BETWEEN two
   twin pairs**, and whether its extension differs is not written down anywhere.
   Why it matters: if any single piece of R0 sits on the exempt side, that is the
   only place in this frame where the obstruction is not already known to bite,
   and the exemption is one step narrower than it looks (it covers Door 5 and no
   route that bounds sums against a non-negative sieve weight). If none does, the
   negative is worth writing once so nobody looks again.
   Grep: `grep -ci "extension" research/QUESTIONS.md` -> 9, none about R0's
   pieces; `grep -ci "wall-note\|forbidden extension" research/QUESTIONS.md`
   returns no row posing this. The nearest asked question is `Q-parity-adversary`,
   which builds an adversary on the stretches and asks what precision class a
   certificate needs, a different object.

2. **Does the equivariance wall have a zone-side statement, and is the zone
   anchor a diverging outlier of its own window ensemble?** [label **(i)**: it is
   an ensemble deviation measurement, and by §4b anything that concludes
   positivity at the anchor is (ii)]
   `import-boolean-analysis.md` §4's banked wall address is stated on the tile's
   ROTATION ensemble: the translation group acts transitively, so no
   measure-or-norm conclusion localises at the anchor. `paper/wall-note.md` Face 1
   prices the anchor's deviation on that ensemble, z = +1.05 at x = 7 to
   z = -22,633 at x = 37. The zone's analogue is the ensemble of p^2-wide windows
   with the zone at its own position, and nobody has stated the equivariance
   argument there or measured the deviation. Why it matters: §0's third killer is
   currently imported to the zone side by analogy, and an analogy is not a
   coordinate. Either the argument transfers verbatim, in which case say so once,
   or the zone anchor is a weaker outlier, which would locate the wall differently
   on this object than on the tile.
   Grep: `grep -ci "equivariance" research/QUESTIONS.md` -> 0;
   `grep -ci "rotation ensemble" research/QUESTIONS.md` -> 1, and that hit is
   `Q-natal-discrepancy-lemma`, the class-discrepancy question.

3. **Which zone statistics are ladder-determined, and is the list complete?**
   [label **(i)**: a completeness question about a deterministic functional]
   `zonegap-03-model.md` §1 proves Z2 = env and shows the per-zone Z2 series is
   100% redundant given the published record ladder, and its §3 says the honest
   statistical objects are "the record process and the boundary fields (head,
   tail), nothing else". That sentence is an assertion, not a theorem. head and
   tail are NOT ladder-determined (they need the twin list), the pair count is
   not, and `zonegap-witnesses.md` finds the per-zone pair-count sequence is
   A273257 one index over. Why it matters: it says exactly how much of Z2's
   apparent content is a published table wearing new coordinates, which is the
   single most deflationary fact about the object and the one most likely to be
   forgotten by the next reader.
   Grep: `grep -ci "ladder-determined" research/QUESTIONS.md` -> 0.

4. **What does the model predict for the SP/ZP separation rate, and why has no
   separation been observed to 9.0e15?** [label **(i)**: a heuristic failure-rate
   computation on a model, with no implication for either postulate]
   `stretch-01.md` §2 proves SP sits strictly above the strong Zone Postulate and
   that no interval argument delivers SP from ZP, while §3 verifies every stretch
   with q'^2 < 2^53 is occupied. So the two postulates are provably distinct and
   empirically indistinguishable over sixteen decades. The model's own prediction
   for how often S_p should be empty while zone p is occupied is computable from
   the min-margin ladder (min M = 0.80 at q = 29 rising to 2175.84 by decade
   1e7-1e8) and has never been computed. Why it matters: the square-window lesson
   says failures vanish because the window outgrows the gap scale; the SP window
   is 2q ln q, LINEAR, so SP is the zone-side object whose window does NOT
   outgrow the gap scale as fast, and its expected failure count is the one place
   in this frame where the lesson can be checked rather than restated.
   Grep: `grep -ci "empty stretch\|occupied while" research/QUESTIONS.md` -> 0;
   `Q-stretch-structure` asks where SP sits logically, not what its failure rate
   is.

5. **Do head and tail have a joint law, and is the zone's boundary pair one twin
   gap seen twice?** [label **(i)**: a distributional question about two measured
   fields]
   `zone-tail-01.md` §1 models head as the forward recurrence time at height p and
   tail as the backward recurrence time at height p'^2, of the same renewal
   process at two different heights. Their joint distribution is never posed. R0
   makes head + tail the whole non-Z2 part of the width, so their sum's law is the
   R0 residual's law. Why it matters: if head and tail are asymptotically
   independent, the R0 shares (1.82% / 89.72% / 8.46%) are a product structure and
   the decomposition is three separate problems as advertised; if not, the
   "separately-attackable" claim in `zonegap-02-reduction.md` §2 needs a
   qualifier.
   Grep: `grep -ci "forward recurrence" research/QUESTIONS.md` -> 0;
   `grep -ci "backward recurrence"` -> 0; the two "joint law" hits are
   `Q-verify-cofactor-convolution`, an anchor identity.

6. **Does Kourbatov's b account for the whole shortfall of the measured band
   constants against the E-form, or only part?** [label **(i)**: a comparison of
   two measured coefficients]
   §7's arithmetic puts the measured/model ratio at 0.943, 0.904, 0.921, 0.867
   across the four bands while the record-location deficit is a flat ~6.0%. The
   two numbers are about the same object by D = 0, and they do not match at the
   top band. Why it matters: TODO Z5 asks for a mechanism for b; if b does not
   close the band-constant shortfall, then either the E-form's finite-size terms
   are incomplete or there is a second deficit, and knowing which is a
   prerequisite for any mechanism hunt.
   Grep: `grep -ci "band constant" research/QUESTIONS.md` -> 0;
   `grep -ci "c3" research/QUESTIONS.md` -> 0.

7. **Which of the fourteen forced fold-ledger constraints has a zone-grid
   analogue?** [label **(i)** for the identities and the ceilings; the floor on
   `net` is (ii) and is excluded]
   `fold-ledger-forced.md` runs entirely on the STRETCH grid, width q'^2 - q^2.
   The zone grid has its own exact ledger (`zonegap-02-reduction.md` §3.4's
   freshZone) and no forced-constraint enumeration. Why it matters: the ledger's
   value is its classification, "all identities or wrong-direction bounds", and
   whether that classification is a property of the stretch grid or of the
   arithmetic is not known. If a zone-grid constraint pointed the other way it
   would be the first one in either enumeration.
   Grep: `Q-ledger-forced` is ANSWERED under `Z5b (retired)` and its question
   text names the fold ledger's columns, which are the stretch grid's.

8. **Is the u-distribution's deep-end concentration a property of Z2 or of the
   record ladder's floor spectrum, at heights beyond the ladder?**
   [label **(i)**]
   `zonegap-03-model.md` §2 closes the u bimodality deterministically: it is the
   floor-spectrum structure of records 30-41, no randomness and no null model
   needed. But that closure is a statement about the ladder that exists, and
   `zonegap-03-model.md` §5 records that no blind record-process prediction below
   e_82 = 7.05e16 is possible because the ladder covers the whole reachable range.
   Why it matters: every statement in this corpus about WHERE Z2's binding gap
   sits (u = 0.9992 to 1.0000 on the last 15 envelope steps) is a statement about
   82 published records. Whether the concentration is a stable feature or an
   artifact of a finite ladder is the difference between "the danger sits at the
   frontier" and "the danger sits where the last record happens to be".
   Grep: `grep -ci "u-decile" research/QUESTIONS.md` -> 0; the one `bimodal` hit
   is `Q-zonegap-model` itself, which closes the bimodality on the existing
   ladder and does not ask this.

---

*Draft, HELD in staging. Not integrated, not red-teamed, and it edits no other
file. `README.md` §Status, `research/G2-STATE.md` §0 and
`research/ZONE-POSTULATE.md` are canonical and win against anything here. History
layer and corpus rule: `research/history/CHANGELOG.md`.*
