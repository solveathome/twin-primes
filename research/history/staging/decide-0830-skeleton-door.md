# Item 4 adjudicated: the Skeleton Equidistribution door is demoted, the Collapse Theorem and the six-level certificate stay banked, and the "tenth of the mass" was an @13 number that reads under one percent from @17 on once every prime is walked

<!-- ledger
id: Q-skeleton-decide-0830
status: ANSWERED
todo: 4 (retired)
question: Should TODO item 4, "Skeleton Equidistribution: restate or demote", be restated around the modulus-W mass or demoted off the board, and what exactly is banked either way?
verdict: DEMOTE. Over every scour prime the branches on which the door is a fixed-modulus question carry 9.2, -0.9, 0.2 and 0.5 percent of the skeleton at @13, @17, @19, @23 (the -10.8 and 5.5 percent on record were 9 and 2 percent subsamples), so the door as named removes at most 0.0102 from a G30_agg whose open part is 0.094 to 0.126; on the open side the phase never wraps and no equidistribution statement remains, only the inequality; nothing on the live board consumes G30_agg < 1/2; no first move exists that is not already ANSWERED. Banked regardless: the Skeleton Collapse Theorem (PROVEN, all x, all q) and G30_agg < 1/2 CERTIFIED at six levels @11..@29.
-->

> **RIDER 2026-08-30 (orchestrator, from `redteam-0830-imports.md`, which
> CONFIRMED this note's shares, caps and G30_agg certificate on independent
> code via cap-36's direct Snum definition).** One sign defect: §2's "would
> tighten a six-level certificate ... by about 0.01 at @13 and by under 0.001
> from @17 on" is wrong in sign at @17 — the closable block there is −0.0009,
> so removing it RAISES G30_agg from 0.1011 to 0.1020. The DEMOTE decision is
> unaffected (a door that can move the certificate the wrong way is not a
> route); `REFUTED.md` row 96 carried the same gloss and is corrected.

STATUS: HELD, staging. Not integrated, not red-teamed. This is an adjudication
of an item's place on the board, not an attack. Companion producer
`research/history/staging/decide-0830-skeleton-door.js`, embedded by
`node research/qc/embed.js`; every figure below that is not cited to another
artifact by file and line is in its OUTPUT block. This pass edited no existing
file and ran no git command.

---

## 0. What is open, and what the brief got wrong, first

**Still open, unchanged by this pass.** The all-x form of G30_agg < 1/2
(`natal-cap-30-skeleton-bound.md` §Theorem B, six certified levels and no
seventh). The Anchored Typicality Measurement (`anchored-calm.md`), which is
the calm's harder open sub-claim and is already off the TODO board. Whether the
open side of the skeleton is TPC-strength: `import-fracparts.md` §6 reads it as
"suspected TPC-STRENGTH, UNRESOLVED", and nothing here upgrades that, in either
direction.

**The brief's figures, checked at their record.**

- "the door reaches ~10% of the mass": NOT one number. Cap-36 Proposition E
  printed 9.2%, −0.9%, −10.8%, 5.5% at @13, @17, @19, @23
  (`natal-cap-36-skeleton-door.md`:190-194, log
  `research/wave7-logs/cap36-skeleton-door.log`:29/33/37/41), and the @19 and
  @23 rows are subsamples of 40 of 435 and 29 of 1,739 scour primes.
  `qc-wave6-Y.md` flagged this on 2026-08-18 (defect Y-3, MED-HIGH: "sample
  presented as enumeration") and the flag never reached `TODO.md`:608, which
  still reads "~10%". SEC B of the producer walks every prime: the closable
  share is **9.2%, −0.9%, 0.2%, 0.5%**. The −10.8% was a subsample artifact
  with the wrong sign, and the "tenth" is the @13 value alone.
- "covered branches carry at most 8% of the door's mass": the 8.1% is
  `import-fracparts.md` §4's @19 row, on the same 40-prime subsample. Over
  every prime the Saffari–Vaughan-covered share (M_T ≤ √W) is 0.2%, −0.9%,
  −1.9%, 0.4% (SEC B). The prediction that note scored still HITs; the number
  the brief carries is the subsampled one.
- "G30_agg < 1/2 certified @11..@29": correct, six levels, exact BigInt
  (`natal-cap-30-skeleton-bound.md` §Theorem B; @29 in
  `natal-cap-36-skeleton-door.md` P6). SEC B re-certifies @13..@23 and
  reproduces 0.1113, 0.1011, 0.1259, 0.0945 to the printed digit.
- "Collapse Theorem PROVEN (all x, all q)": correct,
  `natal-cap-30-skeleton-bound.md` §Theorem A, a four-line proof.
- "Saffari–Vaughan Thm 10's range condition x^{6/11+ε} < y fails at fixed M;
  its object is a marginal while Ψ_M is joint; row 15's theorem VOID":
  correct as stated at `import-fracparts.md` §§2, 3, 6 and
  `redteam-0828-litimports.md`.
- "Win, honestly: a tenth of a leg": a tenth at @13; a hundredth or less at
  every level above it, on the full-prime count.

## 1. The door's claim, restated exactly (deliverable a)

Setting as cap-30/cap-36: W = x#, scour primes q ∈ (x, √W], k = ⌊W/q⌋,
lA = k+1, lB = ⌊(W+1)/q⌋, branch T ∋ 30 with modulus M_T | W, kernel Φ_T even
and mean-zero mod M_T, skeleton G30(q) = Σ_T dev_T, aggregate
G30_agg = Σ_q NUMsk(q)·W / (30·Σ_q(IVA+IVB)).

| claim | statement, with its quantifier | rung | record |
|---|---|---|---|
| Skeleton Collapse Theorem | for all x and all q, Σ_{T∋30} ∏φ∏m̄ = K(m)/(15W) with K = 15C − 2P, so G30(q) is one closed-form kernel sum | PROVEN | `natal-cap-30-skeleton-bound.md` §Thm A |
| Trapezoid Cancellation | for all x, q, and every branch: Snum_T = 2Pa(lA − lB + 2R) + 4B, the window length cancels, and Snum_T is a bounded function of (q mod M_T, ⌊W/q⌋ mod M_T) | PROVEN | `natal-cap-36-skeleton-door.md` §Thm A, §Prop C |
| Aggregate 30-Skeleton Bound | G30_agg(x) < 1/2, as the integer inequality W·ΣNUMsk < 15·ΣV | CERTIFIED at six levels @11..@29 only; re-certified @13..@23 here (SEC B) | cap-30 §Thm B; cap-36 P6 |
| Skeleton Equidistribution Conjecture | for every M | W, the pairs (q mod M, ⌊W/q⌋ mod M) equidistribute over (Z/M)^× × Z/M as q runs over the scour primes, with a saving uniform enough in M to give G30_agg < 1/2 for all x | OPEN; its hypothesis MEASURED consistent with uniformity at M = 30, 210, 2310 through @37 | cap-36 §Prop C, §Meas. D |
| "the door reaches a tenth of the mass" | the share of Σ_TΣ_q Snum_T in branches with M_T ≤ lB, where Thm A's bound is L-free and the door is a fixed-modulus question | MEASURED; 9.2%, −0.9%, 0.2%, 0.5% at @13..@23 over every prime (SEC B); cap-36's −10.8% and 5.5% were subsamples | this note, SEC A (custody) and SEC B |
| the open side is an equidistribution statement | for M_T > lB ⟺ q > W/M_T, ⌊W/q⌋ mod M_T = ⌊W/q⌋ unreduced and q mod M_T = q: the "pair" is (q, k) itself and the branch sum is the bare incomplete sum with L intact | PROVEN (two lines), machine-checked on 1,133,872 pairs | `import-fracparts.md` §5; cap-36 §Prop E first paragraph |

So the Conjecture, read on the branches that carry the mass, is not an
equidistribution statement: nothing wraps, nothing is reduced, and what it
asserts there is G30_agg < 1/2 itself. Its content beyond the target lives on
the closable side, and SEC C prices that side at 0.0102, −0.0009, 0.0002,
0.0005 of G30_agg against an open part of 0.1010, 0.1020, 0.1256, 0.0941.

## 2. The honest ledger: what a proof of the full door would buy (deliverable b)

**Toward item 0 (exponent), 1d (Fekete), D (doubling), Z2 (the certificate
race): nothing, in exponent or in any named inequality.** The evidence is a
grep, not an argument: `G30`, `skeleton` and `calm` occur in `TODO.md` only
inside item 4 itself (line 608), nowhere in `research/G2-STATE.md`, and in
`paper/wall-note.md` only at Face 2's "two things we believed, and killed"
paragraph (lines 327-337), which records that the calm's mechanism is proven
and that the calm "is irrelevant to survival". The critical path
(`G2-STATE.md` §0: Lemma V's quantifier, the DI/Pascadi smoothness front, the
1d bounded-defect target, the doubling window) cites none of these objects.

**What it would buy where it lives.** G30_agg < 1/2 for all x gives
R_agg = −1/2 + G30_agg + no30_agg < 0 for all x, provided the margin absorbs
no30_agg, which cap-26 Prop. 4 bounds a priori and uniformly in q (cap-30
§Thm B Corollary assembles exactly this at each certified level):
the aggregate anticorrelation of the anchored strike classes at every level,
which is one of the two unproven sub-claims in `anchored-calm.md`'s table.
That table's own reading, and cap-31's, is that calm is about strikes and
survival is about the X-channel, corr(VR, S) ≈ 0
(`natal-cap-31-calm-vs-kill.md`; `anchored-calm.md` §"What is not proven"),
so a theorem here moves no survivor count, no floor, and no exponent.

**Fraction reachable by the door as named.** The closable part of G30_agg is
at most 0.0102 in magnitude over the four full-prime levels (SEC C, last
line), against an open part never below 0.0941. A proof on the closable side
would tighten a six-level certificate whose smallest margin is 0.287 by about
0.01 at @13 and by under 0.001 from @17 on, and would say nothing about x ≥ 31.

## 3. The decision: DEMOTE (deliverable c)

**Why not RESTATE.** A restated item would have to read "prove G30_agg < 1/2
for all x", since that is all the open side asserts, and every first move the
corpus can name for it is already run and ANSWERED or CLOSED: the fixed-modulus
door (this note, cap-36 §Prop E), the decay-law shortcut (cap-36, REFUTED),
the two uniform bounds (cap-30 §Prop C, cap-36 §Cor B, both vacuous with
constants growing like 8^{π(x)}), the fractional-parts import
(`import-fracparts.md`, Q-import-fracparts ANSWERED, no theorem), and the
hyperbola face (cap-36 §Prop C: primes in progressions across intervals of
mean length ≤ 1, "irreducibly an averaged one", read at the lower rung as
suspected TPC-strength in `import-fracparts.md` §6). An item with no legal
first move and no consumer is not a standing front; it is a status row.

**The REFUTED.md row, verbatim, for the orchestrator to apply.**

| route | verdict | why, in one clause | closed | record |
|---|---|---|---|---|
| the Skeleton Equidistribution door (fixed-modulus equidistribution of (q mod M_T, ⌊W/q⌋ mod M_T) over the scour primes) as the route to the all-x aggregate 30-skeleton bound | CLOSED as a route; the Collapse Theorem and the six-level certificate stand | over every scour prime the branches on which the door is a fixed-modulus question carry 9.2%, −0.9%, 0.2%, 0.5% of the skeleton at @13..@23 (the −10.8% and 5.5% on record were 9% and 2% subsamples), so the door as named removes at most 0.0102 from a G30_agg whose open part is 0.094 to 0.126; on the open side M_T > lB ⟺ q > W/M_T, the phase never wraps and no equidistribution statement remains, only the inequality itself; the one literature instrument (Saffari–Vaughan Thm 10) is a marginal on a growing window and certifies no level; and nothing on the live board consumes G30_agg < 1/2, calm being decorrelated from survival | 2026-08-30 | `history/staging/decide-0830-skeleton-door.md`; `natal-cap-36-skeleton-door.md` §Prop E; `history/staging/import-fracparts.md` §§5-6 |

**What is banked, regardless.** The Skeleton Collapse Theorem (PROVEN, all x,
all q), the Trapezoid Cancellation identity (PROVEN, all x, q, branches), the
exception criterion (exact), G30_agg < 1/2 CERTIFIED at @11..@29, the no-wrap
identity, and the Saffari–Vaughan anchor for the marginal face. None of these
is touched by the demotion; their home stays `anchored-calm.md`'s status
table, which already lists the all-x form as OPEN beside the Anchored
Typicality Measurement, the precedent for an open sub-claim that sits off the
TODO board.

**Edits the demotion owes, none applied here.** (i) `TODO.md`:607-619, delete
item 4; its five `Ledger:` ids move with it, so the six notes carrying
`todo: 4` (the five listed there plus this one) flip their block to
`todo: 4 (retired)`, the mechanism `research/qc/questions.js`:19 provides, and
`QUESTIONS.md` regenerates. (ii) `anchored-calm.md`:40 and the paragraph at
:59-64, and `GLOSSARY.md`:377-380: replace "the door reaches about a tenth of
the mass" and the four subsampled shares with the full-prime shares above.
(iii) `natal-cap-36-skeleton-door.md` §Prop E: the table's @19 and @23 rows
stay as the subsample they declare, but the sentence "between 91% and 111%"
in the head (line 37) and the "+0.10" reading should carry the full-prime
90.8%, 100.9%, 99.8%, 99.5%. (iv) `research/history/CHANGELOG.md`: one line.

## 4. The modulus-W mass: is there a handle anywhere in the corpus? (deliverable d)

Grep for the object under its names (modulus ~W, moduli of order W, no-wrap,
never wraps, W/(k+1), modulus-W) finds it in exactly five places, all
descriptive: cap-30 §"Next", cap-36 §Prop C and §Prop E, `import-fracparts.md`
§§5-6, `coherence-0828.md`:973, and `WAVE7-RESULTS-2026-08-15.md`:165-203,
which is where "restate around the modulus-W mass, or demote" was first
written. No attack note names it as a target. What the corpus holds is two
exact reformulations and one calibration:

- the hyperbola face (cap-36 §Prop C): for fixed k the primes with
  ⌊W/q⌋ = k lie in (W/(k+1), W/k], of length W/k² and mean length ≤ 1 for
  q ≤ √W, so the open side is primes in progressions mod M_T averaged over
  about √W intervals of bounded mean length;
- the no-wrap identity (`import-fracparts.md` §5): M_T > lB ⟺ q > W/M_T, so
  on the open side the fractional part {W/(M_T q)} = W/(M_T q) is monotone in
  q and there is no distribution question to pose;
- the depth profile (cap-36 §Prop E; SEC B's by-depth column for the
  closable side): the open mass sits at the one depth where M_T first passes
  the window, which is the depth at which the branch kernel first sees the
  whole window as one incomplete period.

The only adjacent live object is the X-channel (item X, Face 2), and the
adjacency is by address only: the calm and the X-channel are both anchored
strike-side objects, but cap-31 measured them decorrelated, and the wall note
files the calm under Face 2 as a belief that was killed, not as a face. Filing
the modulus-W mass under item X would attach an open statement to a front that
does not consume it. **Where it should sit:** as it already does, the OPEN row
of `anchored-calm.md`'s status table, with the row's clause corrected to say
that the open side is the inequality itself at moduli exceeding the window,
suspected TPC-strength and unresolved, and with `REFUTED.md` carrying the door
as a closed route. No TODO line.

## 5. Custody of the numbers used above

SEC A reproduces cap-36 P4 as printed, on its own prime steps, from the CRT
evaluator of `import-fracparts.js` (no table of size M): totals 2.9021e+1,
2.2650e+2, 1.8153e+2, 3.8400e+2 at relative error 1.1e−7 to 2.6e−5, closable
shares 9.2%, −0.9%, −10.8%, 5.5% to the printed digit, covered shares 0.2%,
−0.9%, −8.1%, −0.3% to the printed digit. SEC B takes the level total from
cap-30's exact BigInt kernel scan, which re-certifies the integer inequality
at @13, @17, @19, @23 and returns G30_agg = 0.1113, 0.1011, 0.1259, 0.0945;
the branch-to-kernel identity total/(2Vg) = G30_agg holds to four digits at
every level; at @13, @17, @19 the open side summed directly agrees with the
subtraction to relative error ≤ 1.5e−13. The full-prime kernel totals are
2.2425e+3 at @19 and 1.6551e+4 at @23; the subsampled totals cap-36 printed
were partial sums over 40 and 29 primes and are not comparable to them, which
is the whole of the correction.

## What would falsify this, and whether that check has run

- **The full-prime shares are wrong** if the CRT evaluator disagrees with
  cap-36's table evaluator. RUN: SEC A matches every printed cap-36 and
  import-fracparts figure; the branch total matches the exact kernel at all
  four levels; the direct open-side sum matches the subtraction at three.
- **The demotion is wrong** if any live item consumes G30_agg < 1/2 or the
  calm. RUN as a grep over `TODO.md`, `G2-STATE.md`, `wall-note.md`: no
  consumer outside item 4. NOT RUN as a reading of every staging note; a
  consumer hiding in staging would be a defect in the live layer, not in
  this verdict.
- **The "no legal first move" claim is wrong** if a route to the open side
  exists that is not one of the five named in §3. NOT RUN beyond the grep in
  §4 and `QUESTIONS.md`'s item-4 rows; `import-fracparts.md` §6's
  TPC-strength reading is a suspicion and is carried here as one.
- **The closable share could grow at higher levels.** NOT RUN above @23; no
  branch ledger exists at @29, and the four levels show 9.2% falling to under
  1% with no reversal. A reversal at @29 would reprice §2, not §3.
