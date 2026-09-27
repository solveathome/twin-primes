# The zone's tail field: first per-zone dataset, the law in local units, and the mirror of the half-level head

<!-- ledger
id: Q-zone-tail
status: PARTIAL
todo: Z4
question: What is the tail field of the zone (p, p'^2) - its law against ln^2, its worst case, its share of the R0 width, and is it the frozen-sieve last survivor below p'^2 at the rate the head is the frozen sqrt(p)-level first survivor above p?
verdict: The field exists now, 1,225 zones, and nothing in it is derived. The tail is the head's own renewal functional read at height p'^2 rather than p: c_tail = 0.7771 ln^2(p'^2) at [3163,1e4) against the head's 0.6693 ln^2 p on the same zones and the same estimator, both referenced to HL's 0.7574, and the apparent factor of four is the unit ln^2(p'^2) = 4 ln^2 p and nothing else. The band drift does not settle (0.7518, 0.7288, 0.7771; the pre-registered 0.03 step is missed), so this is band composition on two decades and not a measured convergence. The frozen-sieve mirror is 100% at the zone's own level p, but that is the Zone Restriction Lemma restated and not a rate comparable to the head's 96.65%; the non-vacuous mirror is one fold back, where the tail survives at 98.69% with the residual priced exactly (88 extra lpf(n) = p survivors, 18.18% of them biting), and the head's own frozen level sqrt(p) identifies the tail in only 22.86%, refuting this note's own pre-registered [0,5] zones. The renewal surplus t/R = 1.0619 at B4 is NOT RESOLVED, its bootstrap [0.9937, 1.1321] containing 1, and an exhaustive class-matched origin null over 5,962,057 origins gives the same 1.0619; three matched non-square endpoints see no difference at all, sign tests z = 0.14, -0.54, 0.66 with six paired intervals all containing zero, so nothing here is a property of the endpoint being a prime square. R0 is asserted at all 1,225 zones and the shares are 1.82% head, 89.72% Z2, 8.46% tail at B4 with the tail's share FALLING, so filling the tail row moves the decomposition's difficulty nowhere: Z2 was the obstruction before and is more of it after.
-->

STATUS: HELD, staging. Not integrated, not red-teamed. Producer
`research/zone-tail-01.js`. No commits this session, so §1 is timestamped and
NOT sealed by a git object: its only custody is that it was written to disk
before the producer existed, and a reader who does not trust that should read
§1 as a hypothesis list rather than a pre-registration.

Task: TODO Z4, tail half. `zonegap-02-reduction.md` §2 lists the tail as the
"unstudied (cheapest piece)" of the R0 decomposition, with one number to its
name: band means 0.58..0.77 in ln^2(p'^2) units, from
`research/zonegap-01.js`'s `tailM: mean(z.tail / l2(z.bound))` at X = 1e11.
There is no per-zone tail dataset in the corpus (greped: `zonegap-01*`,
`zonegap-02*`, `zonegap-03*`, `destroyer-census-01*`, `ZONE-POSTULATE.md`,
`QUESTIONS.md` sections 1 and 2, `TODO.md` Z4 - the only tail figures anywhere
are those six band means). This note produces one.

---

## 0. What is still open, and what failed

**Nothing is derived.** Every coefficient below is MEASURED on 1,225 zones to
1e8. The tail's 0.7771 ln²(p'²) at [3163,1e4) has no zero-parameter derivation,
exactly as the head's 0.6693 ln²p has none, and Hardy-Littlewood's 0.7574 sits
2.6% below one and 11.6% above the other with nothing proven about either gap.

**The band drift does not settle, so there is no law here yet.** 0.7518,
0.7288, 0.7771 across B2, B3, B4: down then up, missing this note's own
pre-registered ≤ 0.03 per-step drift on the second step. Three non-monotone
points over two decades are band composition. The corpus's existing sentence
about the head's 0.669..0.753 spread applies verbatim.

**One pre-registered prediction is refuted, and it is mine.** §1 (E4b) said the
head's frozen √p level would identify the tail in at most 5 of 1,225 zones. It
identifies it in 280 (22.86%). The registered number came from pricing the
event at a fixed tail instead of averaging over the tail's distribution; the
corrected Mertens price is 15.21%, the right order, and the registered figure
was never defensible.

**The one interesting number is unresolved.** The tail runs 6.19% above the
renewal functional R at B4 (t/R = 1.0619) and 6.19% above an exhaustively
computed class-matched origin null over 5,962,057 origins — but the bootstrap
over the 782 zones is [0.9937, 1.1321] and contains 1, and the pre-registered
SURPLUS rule required the interval to clear +0.03. It does not. NOT RESOLVED,
and what it needs is 27,292 zones at 1e11 (315.7 s by zonegap-01's embed), not
more analysis of these 782.

**The mirror question does not have the answer its phrasing expects.** The
frozen-sieve last-survivor test reads 100% at the zone's own level p — but that
is the Zone Restriction Lemma restated, a theorem, not a rate, and it must not
be quoted beside the head's 96.65% as though the two were the same measurement.
The comparable measured rate is one fold back: 98.69%.

**The control saw nothing, which is the result.** Three matched non-square
endpoints of the same width give sign tests z = 0.14, −0.54, +0.66 and six
paired-difference bootstrap intervals that all contain zero. Nothing measured
here is a property of the endpoint being a prime square.

**What moved.** The tail field exists, one number per zone on the head census's
own 1,225 zones, on an engine that reproduces zonegap-01's three published
decade means and the census's head coefficient to three decimals. Z4's tail
half now has data where it had six band means. The R0 shares are filled in and
they say the tail does not matter: 1.82% head, 89.72% Z2, 8.46% tail at B4,
with the tail's share falling and Z2's rising. Z4's "win" clause — two of three
pieces with derived laws — is NOT met; the tail has a measured law with an
unsettled coefficient, and nothing here is a bound.

---

## 1. PRE-REGISTRATION (written 2026-08-28 14:53Z, before `research/zone-tail-01.js` was written and before any number was computed)

**The statistic.** Conventions are `zonegap-01.js` section 0's verbatim, as
`zonegap-02-reduction.md` restates them: a pair is named by its opener a; the
pair is IN ZONE p iff `p < a` and `a + 2 < p'^2`, both strict, so both members
lie strictly inside the open interval (p, p'^2); `a_last(p)` is the largest
such opener; and

    tail(p) = p'^2 - a_last(p).

The tail is measured to the OPENER, exactly as head(p) = a_first(p) - p is.
That is the mirror-consistent choice and it is not the mirror-symmetric one:
the head's window has slack 0 at its own end (a_first can be p + 1 in
principle) while the tail's has slack 2 forced by `a + 2 < p'^2`, so the tail
carries a deterministic +2 the head does not. Stated, not corrected; at the
predicted scale (hundreds) it is below the third digit.

**The range.** `destroyer-census-01.js`'s zone list verbatim: primes p >= 7
with `p'^2 - 1 <= 1e8`. Expected 1,225 zones, p = 7 .. 9967. The producer
ASSERTS the count is 1225; if it is not, this is not the head census's range
and every comparison below is void.

**Bands.** The census's own head bands, so the head numbers are quotable
without re-banding: B1 [7,100), B2 [100,1000), B3 [1000,3163), B4 [3163,1e4).
Secondary, for continuity with `zonegap-01`: decades of p, 10^0..10^3.

**Estimator.** Ratio of sums, `sum(tail) / sum(ln^2(p'^2))`, which is
`destroyer-census-01.js` SEC 6(a)'s `hZoneSum / hZoneLn2` estimator with the
head's arguments replaced by the tail's. Reported in BOTH units: local
`ln^2(p'^2)` and `ln^2 p`. Interval: seeded bootstrap over zones within band,
2000 resamples, 2.5/97.5 percentiles.

**(E1) The law - what symmetry with the head predicts.** The head is the
forward recurrence time of the twin-gap process at height p; the tail is the
backward recurrence time of the same process at height p'^2. For a renewal
process the two have the same mean, R = E[g^2] / 2E[g]. Hardy-Littlewood puts
the mean twin gap at height n at ln^2(n) / (2 C2) = 0.7574 ln^2 n, so the
HL-referenced coefficient at the tail is the SAME 0.7574 the head is referenced
to. **Prediction: c_tail = 0.72 +- 0.05 in ln^2(p'^2) units at B4 - the head's
0.72 ln^2 p coefficient reappearing verbatim once the units are local.** In
ln^2 p units the same prediction reads about 4 x 0.72 = 2.9, because
ln^2(p'^2) = 4 ln^2 p' ~ 4 ln^2 p. That factor of four is units and not
physics, and any statement of the form "the tail is four times the head" that
does not say so is wrong.

**(E2) The prime-origin factor - the mirror of the head's residual.** The head
carries h/R = 1.09 -> 1.03 (`destroyer-census-01.md` section 6(b)), read as an
excess from the origin p being PRIME. The tail's origin p'^2 is not prime.
**Prediction: t/R_tail = 1 to within 0.03 at B4, against the head's +0.09 ->
+0.03.** Verdict rule, fixed now: SURPLUS if `t/R - 1 >= +0.03` at B4 with the
bootstrap interval excluding +0.03; DEFICIT if `<= -0.03` likewise; MATCH
otherwise. Comparator caveat registered in advance, from
`redteam-0828-head.md`: R is the CONTINUUM functional and a discrete integer
origin sees `R + 1/2` exactly, so the discrete-consistent comparator for the
integer origin p'^2 is R + 1/2 and both are reported. p'^2 is confined to
residues {1, 19} mod 30 for p' >= 7, so a class-matched comparator (origins
drawn from {1,19} mod 30) is reported as well; on the head that choice of
population moved the residual by a factor of two.

**(E3) Band drift.** Prediction: |c_tail(B4) - c_tail(B3)| <= 0.03 in local
units, with the B2..B4 spread <= 0.05. A larger spread will be called band
composition and not a law, exactly as the census called the head's
non-monotone 0.669..0.753 half-decade spread.

**(E4) The frozen-sieve identification, mirroring section 6(a).** The head test
freezes the sieve at level sqrt(p) - the level that certifies primality at the
head's own height - and asks whether the first frozen-survivor above p is the
head pair. It is, in 1,184 of 1,225 zones (96.65%), the failures being treads
q^2 with q in (sqrt(p), sqrt(a_first+2)] landing in the head window. The tail's
own certifying level at height p'^2 is p'. Three tests, at three levels:
  (a) **Level p.** Predicted 1225/1225 = 100%, and this is a THEOREM, not a
      measurement: the Zone Restriction Lemma (`zonegap-02-reduction.md`
      section 1) says the level-p rough numbers in (p, p'^2) are exactly the
      primes there. Asserted; one failure is an engine bug, not a finding. The
      registered reading of a 100% here is therefore "the mirror at the zone's
      own level is exact where the head's is 96.65%, and the asymmetry is
      structural, not statistical" - the head sits at height p where the zone's
      level p is quadratically over-strong, the tail at height p'^2 where it is
      exactly right.
  (b) **Level sqrt(p) - the literal mirror, the head's own frozen level applied
      at the deep end.** Predicted 0 of 1225 for p >= 100; registered band
      [0, 5] zones over the whole range.
  (c) **Level p^- (the prime preceding p), one fold back - the non-vacuous
      mirror.** This is the tail's analogue of "does the newest sieve activity
      move the boundary slack": the survivors level p^- keeps and level p does
      not are exactly the n = p*m in [p^2, p'^2) with m p-rough, of which the
      whole zone holds O((p' - p)/ln p) against a tail window of length ~3
      ln^2 p. **Prediction: >= 99%, strictly above the head's 96.65%.**
      Registered band [98%, 100%]. Below 96.65% the mirror is INVERTED and this
      prediction is refuted.

**(E5) The worst case.** max tail per band against ln^2(p'^2) and against the
width. Prediction: max tail / ln^2(p'^2) in [2.5, 6] at B4, and
max tail / width <= 1e-3 at B4. Registered falsifier: max tail/ln^2(p'^2) > 8,
or any zone with tail >= width (impossible by R0; an engine bug).

**(E6) The R0 accounting.** `head + Z2 + tail <= width` at every zone, with
equality iff the zone holds exactly 2 pairs - a THEOREM
(`zonegap-02-reduction.md` (R0)), ASSERTED per zone here, not measured. Shares
of width per band reported for all three pieces. Prediction: the three pieces
together take < 1e-3 of the width at B4.

**(E7) The matched control.** For each zone, a right endpoint at the same
height and the same width that is NOT a prime square:
`E(p) = p'^2 - h(p)`, with `h(p)` a deterministic seeded offset in
[W/4, 3W/4], W = p'^2 - p; the control window is (E - W, E) and
`ctrl(p) = E - (largest opener a with a + 2 < E and a > E - W)`. The producer
asserts E is not a perfect square. Comparison follows the repo's pooling rule
(`record-location-null.js` N3): each side is divided by ln^2 of ITS OWN right
endpoint before anything is pooled, the per-zone paired ratio distribution and
a sign test are reported FIRST, and only then the band means.
**Prediction: no difference - median paired ratio in [0.95, 1.05] and the sign
test not significant at 1,225 zones, |z| <= 2.6.** A significant surplus at the
square endpoint would be a real finding and is registered here as needing its
own pass before it is believed, not as a result of this one.

**Price.** Neighbours' embedded `elapsed`: `destroyer-census-01.js` 2.0 s at
the same 1e8 range and the same zone list; `zonegap-01.js` 315.7 s at 1e11;
`zonegap-03-model.js` 1.2 s. This pass is 1e8 with per-zone local window work,
priced at under 60 s, which is under the 4-hour rule and so is simply run.

---

## 2. The pre-registered scorecard

Every row was fixed in §1 before `research/zone-tail-01.js` existed. Figures
are from that file's embedded OUTPUT block (`node research/qc/embed.js --check`
reads `body matches out-sha256 — the pasted block is bit-honest`; 1.0 s).

| # | pre-registered | measured | verdict |
|---|---|---|---|
| E1 | c_tail = 0.72 ± 0.05 in ln²(p'²) units at B4 | 0.7771, bootstrap [0.7301, 0.8271] | **MISSED**, narrowly — the point estimate sits above the band's top, the interval straddles it |
| E2 | \|t/R − 1\| ≤ 0.03 at B4 (MATCH), ≥ +0.03 with the interval clear of it (SURPLUS) | t/R = 1.0619, bootstrap [0.9937, 1.1321] | **NOT RESOLVED** — point estimate is a surplus, the interval is not |
| E3 | \|c(B4) − c(B3)\| ≤ 0.03; B2..B4 spread ≤ 0.05 | 0.0483 and 0.0483 | **step MISSED, spread HIT** |
| E4a | level p identifies the tail at 1225/1225 (a theorem) | 1225/1225 | **HIT** (asserted, not measured) |
| E4b | level √p identifies it in ≤ 5 zones | 280 zones (22.86%) | **REFUTED — the prediction, not the data** |
| E4c | level p⁻ identifies it at 98–100%, above the head's 96.65% | 98.69% | **HIT** |
| E5 | max tail/ln²(p'²) ∈ [2.5, 6] at B4; max tail/width ≤ 1e-3 | 3.664 and 2.00e-5 | **HIT** |
| E6 | head + Z2 + tail < 1e-3 of width at B4 | 8.20e-5 | **HIT** |
| E7 | control median paired ratio ∈ [0.95, 1.05], sign test \|z\| ≤ 2.6 | median 1.0102, z = 0.14 (control A, the pre-registered one) | **HIT** |

Six hits, one narrow miss, one split, one unresolved, one prediction refuted.
The refuted one is mine: §1 (E4b) priced P(no √p-rough pair above a_last) at a
fixed tail instead of averaging over the tail's own distribution. Averaged, the
same Mertens price reads 15.21% against the measured 22.86% — the right order,
and the registered [0, 5] zones was never a defensible number.

## 3. The law, and what the factor of four is

| band | zones | mean tail | c = Στ/Σln²(p'²) | bootstrap | in ln²p units | head c, same zones |
|---|---|---|---|---|---|---|
| [7,100) | 22 | 33.64 | 0.5740 | [0.4315, 0.7423] | 2.4277 | 0.8530 |
| [100,1000) | 143 | 113.65 | 0.7518 | [0.6490, 0.8545] | 3.0220 | 0.9863 |
| [1000,3163) | 278 | 167.56 | 0.7288 | [0.6443, 0.8135] | 2.9185 | 0.7494 |
| [3163,1e4) | 782 | 237.26 | 0.7771 | [0.7301, 0.8271] | 3.1096 | 0.6693 |

**The caveat first: the coefficient does not settle.** B2 → B3 falls 0.0230,
B3 → B4 rises 0.0483, and the pre-registered ≤ 0.03 per-step drift is missed on
the second step. Three points that go down then up over 1,203 zones are band
composition on a range two decades wide, not a measured convergence to
anything. The same sentence stands in `destroyer-census-01.md` §6(b) about the
head's own 0.669..0.753 half-decade spread (cited, not recomputed here), and it
is not weaker here.

**The unit is the whole story of "four times".** `c_p / c_local = 4.0013` at
B4, which is `ln²(p'²) = 4 ln²p'` and nothing else. The tail is 3.1096 ln²p
where the head is 0.6693 ln²p; those two numbers describe the same renewal
functional evaluated at heights p and p², and a report of "the tail is four
and a half times the head" without the unit would be an artefact quoted as a
finding.

**In local units the two are close and the tail is the larger.** 0.7771 against
the head's 0.6693 at the same 782 zones with the same estimator, both
referenced to HL's 1/(2 C₂) = 0.7574 — the head 11.6% below it, the tail 2.6%
above. That is the row `zonegap-02-reduction.md` §2's scale table did not have.

**Custody.** This is an independent engine, and it reproduces to three decimals
the only tail figures the corpus already held: zonegap-01.js's decade means
0.578 / 0.768 / 0.766 (its mean-of-ratios estimator, its X = 1e11 sweep), and
`destroyer-census-01.js` SEC 6(a)'s head coefficient 0.6693. It also
recomputes 164 zones below 1e6 and zonegap-02's five hand-verified levels by
brute force, and asserts π₂(1e8) = 440,312 against A007508. A miss on any of
those would have voided the file.

## 4. The frozen-sieve mirror: 100%, and it is a theorem, not a rate

`destroyer-census-01.md` §6(a) reads: head(p) IS the first survivor of the
frozen √p-level sieve above p in 1,184 of 1,225 zones (96.65%). The task asked
for the mirror at the deep end. It measures 100%, and the reason it does is
structural, so the two numbers must not be quoted side by side as if they were
the same kind of thing.

| frozen level | identifies a_last | price |
|---|---|---|
| p — the zone's own level | **1225 / 1225 (100%)** | a THEOREM: the Zone Restriction Lemma |
| p⁻ — one fold back | 1209 / 1225 (98.69%) | exact: 88 extra survivors, 18.18% of them bite |
| √p — the head's own level | 280 / 1225 (22.86%) | Mertens, averaged over the tail: 15.21% |

**(a) The level-p row is not a measurement.** For n < p'² with no prime factor
≤ p, n is prime (`zonegap-02-reduction.md` §1). So the last level-p-rough pair
below p'² is the last twin pair below p'², identically, at every zone and at
every p. The producer checks it by trial division rather than by reading the
sieve array that produced a_last, so the row is an independent verification of
the lemma; it is not evidence about the tail. **The honest statement of the
asymmetry: the head's certifying level at its own height p is √p, which is the
square root of the zone's level, so a whole half-ladder of folds is still to
come and treads can still arrive; the tail's certifying level at height p'² is
p', which the zone's level p already covers, and the deep end is besides a
proven onset desert (`zonegap-02-reduction.md` §4, (D1)). The head is a
half-level object and the tail is a full-level one.** That is a restatement of
things already proven in the corpus, not a new fact; what is new is the
measurement that the corresponding rate is 100% and not 99-point-something.

**(b) One fold back is where the mirror becomes non-vacuous, and it is priced
exactly.** Freezing at p⁻ keeps exactly the n < p'² with lpf(n) = p. Counted
in the 1,225 tail windows: 88 of them, 0.0718 per zone, of which 16 (18.18%)
actually move a_last — the rest have no level-p⁻ rough partner two away. So
98.69%, above the head's 96.65%, with the residual accounted for integer by
integer rather than modelled. This is the one row that is a genuine
measured mirror, and it went the way §1 registered.

**(c) The head's own frozen level fails at the deep end, and §1's number for it
was wrong.** 280 zones, not ≤ 5. §1 priced the event at a fixed tail; the tail
is roughly exponential with mean 237 at B4 and the √p-rough pair spacing is
about 44, so the average of exp(−tail/44) is near 1/(1 + 237/44) ≈ 16%, and the
producer's zone-by-zone Mertens price reads 15.21% against a measured 22.86%
(Mertens under-counts here, u = ln(p'²)/ln √p ≈ 4, where the Buchstab
correction is not negligible). Registered band [0, 5]: refuted, by my
arithmetic and not by the data.

## 5. The renewal comparator and the control: a surplus the data cannot resolve

| band | height range | mean gap g | R = E[g²]/2E[g] | mean tail t | t/R | t/(R+½) | class-origin null | t/null |
|---|---|---|---|---|---|---|---|---|
| [7,100) | [1.2e2, 1.0e4] | 49.94 | 42.90 | 33.64 | 0.7841 | 0.7751 | 49.77 | 0.6759 |
| [100,1000) | [1.1e4, 1.0e6] | 124.43 | 114.64 | 113.65 | 0.9913 | 0.9870 | 120.75 | 0.9412 |
| [1000,3163) | [1.0e6, 1.0e7] | 177.30 | 164.11 | 167.56 | 1.0210 | 1.0179 | 170.15 | 0.9848 |
| [3163,1e4) | [1.0e7, 9.9e7] | 235.93 | 223.42 | 237.26 | **1.0619** | 1.0595 | 229.46 | 1.0340 |

**The caveat first: the B4 bootstrap is [0.9937, 1.1321] and contains 1.** The
pre-registered SURPLUS rule required the interval to clear +0.03, and it does
not. The verdict is NOT RESOLVED at 1,225 zones, and the correct next move is
more zones, not more analysis of these.

**The class-matched null is exact and says the same thing.** Every p'² with
p' ≥ 7 lies in {1, 19} mod 30 (asserted over all 1,225 zones), so the exactly
matched comparator is the mean backward distance from *every* integer of that
class at the same heights. Computed exhaustively — 5,962,057 origins at B4 —
and under the pooling rule (each unit divided by ln² of its own height before
pooling) the zones read 0.7793 against the null's 0.7339, a ratio of 1.0619.
The null's own sampling error is negligible at six million origins; all of the
uncertainty is in the 782 tails, which is exactly what the bootstrap says.

**Three matched controls see nothing.** The pre-registered control (E7) puts a
non-square endpoint of the same width at a seeded offset; two more match the
residue class and the height (the height-matched one within 0.033% in ln,
NOT pre-registered and labelled so in the producer).

| control | median paired ratio | sign test z | paired difference at B4, mean [bootstrap] |
|---|---|---|---|
| A — free endpoint (pre-registered) | 1.0102 | +0.14 | 0.0623 [−0.0151, 0.1374] |
| B — class-matched, E ≡ p'² mod 30 | 0.9687 | −0.54 | 0.0402 [−0.0329, 0.1140] |
| C — height-matched to 0.033% (not pre-registered) | 1.0826 | +0.66 | 0.0652 [−0.0012, 0.1286] |

All six paired-difference intervals contain zero and all three sign tests are
under one sigma. **Nothing measured here is a property of the endpoint being a
prime square.** The band-mean ratios do run 1.05..1.09 at B3 and B4 in all
three controls, the same direction and the same size as the class-origin
surplus — which is consistent with a real few-per-cent effect and equally
consistent with none, and the paired test at this n cannot tell them apart.
Reported as an open direction, not as a finding.

Two more things the head's own residual work forces to be said here. R is the
CONTINUUM functional (`redteam-0828-head.md`), so `t/(R + ½)` is the
discrete-consistent column and it is the smaller one; and the class-origin null
is the comparator that removes both corrections at once, which is why it is
computed exhaustively rather than modelled. The head's comparable figure is
h/R = 1.09 → 1.03 across its five windows, with the same objection standing
against it.

## 6. The worst case, and the R0 accounting

| band | max tail | at p | /ln²(p'²) | /width | max/mean |
|---|---|---|---|---|---|
| [7,100) | 80 | 29 | 1.696 | 8.58e-2 | 2.38 |
| [100,1000) | 500 | 743 | 2.851 | 8.88e-4 | 4.40 |
| [1000,3163) | 938 | 2203 | 3.956 | 1.93e-4 | 5.60 |
| [3163,1e4) | 1172 | 7643 | 3.664 | 2.00e-5 | 4.94 |

Global maximum of tail/ln²(p'²) is 4.007, at p = 4943 (tail 1160, width
24,507,458). The ratio max/mean is 4.4, 5.6, 4.9 over B2..B4 — flat, with no
growth visible, which is what a light-tailed extremal law would look like and
also what 143, 278 and 782 draws from a heavier one would look like. No
extremal analysis is offered; this is four order statistics.

**R0 is asserted, never measured.** `width = head + Σgaps + tail` holds
digit-exactly at all 1,225 zones (it telescopes: Σgaps = a_last − a_first), and
`head + Z2 + tail ≤ width` at all 1,225. The equality clause of
`zonegap-02-reduction.md` (R0) is vacuous on this range: no zone here holds
exactly 2 pairs, all 1,225 hold ≥ 3 and all 1,225 are strict.

| band | head/width | Z2/width | tail/width | sum/width | head / Z2 / tail share of the sum |
|---|---|---|---|---|---|
| [7,100) | 9.97e-3 | 8.64e-2 | 2.79e-2 | 1.24e-1 | 6.26% / 75.94% / 17.81% |
| [100,1000) | 2.32e-4 | 5.38e-3 | 1.16e-3 | 6.77e-3 | 3.84% / 84.39% / 11.77% |
| [1000,3163) | 1.23e-5 | 4.83e-4 | 5.22e-5 | 5.47e-4 | 2.52% / 87.69% / 9.80% |
| [3163,1e4) | 1.46e-6 | 7.31e-5 | 7.53e-6 | 8.20e-5 | 1.82% / 89.72% / 8.46% |

**The reading that matters for Z4's "win" clause.** The tail is between four
and five times the head and an order of magnitude below Z2, and its share of
the three-piece sum is FALLING with height, 17.81% → 8.46%. Z2 takes 89.72% at
B4 and is rising. Filling in the tail row does not move the decomposition's
difficulty anywhere: the ln³ piece was the obstruction before this pass and it
is more of the obstruction after it. Nothing here weakens the standing grade
that the chain is TPC-strength end to end (`zonegap-02-reduction.md` (R1)); the
margin p²/(3.9 ln³p) is not evidence and was never counted as any.

## 7. NOT REACHED

- **No derivation.** Every coefficient here is MEASURED. The 0.7771 at B4 has
  no zero-parameter derivation any more than the head's 0.6693 does, and the
  same HL constant 0.7574 sits above one and below the other with nothing
  proven about either gap.
- **The +6% is unresolved and needs zones, not thought.** The single decisive
  next measurement is the same statistic to 1e11 — `zonegap-01.js`'s own range,
  27,292 zones instead of 1,225, priced at 315.7 s by its embed. That is the
  one thing that would turn reading 7 into a verdict, and it was not run here
  because §1 fixed the range at the head census's 1,225 for comparability.
- **The tail's DISTRIBUTION is untouched.** Only means, one worst case per band
  and a sign test. No shape, no extremal law, no comparison against the
  Kourbatov ceiling that the head's worst case is quoted against
  (`zonegap-02-reduction.md` §2, "worst 0.72 of the Kourbatov ceiling at height
  p"); the tail has no such comparator here.
- **No proven bound on the tail at the window scale**, which is the only thing
  that would be progress on the chain. This note produces a field, not a bound.
- **Band [7,100) is 22 zones** and every figure in that row should be read as
  noise; it is carried only because the census carries it.
- **The height-matched control C is not pre-registered** and must be read as a
  robustness check that was chosen after seeing A and B, not as a test.

---

*Producer and custody: `research/zone-tail-01.js`, embedded
(`node research/qc/embed.js --check` reads code-sha256 matches, body matches
out-sha256, out-sha256 matches; one advisory, the figure 0.753, which is cited
from `destroyer-census-01.md` §6(b) and not computed here). 1.0 s. Seeds:
20260828 (band bootstrap), 555000111 (t/R bootstrap), 917234561 (controls A
and B), 220044660 (control C), 31415926 (paired differences); the control
streams are separate so that adding control C could not move the
pre-registered control A, which it did once and was fixed. Cited, never
recomputed: `zonegap-01.js`'s decade tail means and the 0.7229 head
coefficient at its own higher levels, `destroyer-census-01.md` §6(a)'s
1184/1225 = 96.65% and §6(b)'s h/R = 1.09 → 1.03 and 0.669..0.753 spread,
`zonegap-02-reduction.md` §1 (Zone Restriction Lemma), §2 (R0) and §4 (D1),
`redteam-0828-head.md`'s continuum-versus-discrete R, π₂(1e8) = 440,312
(A007508). History layer: process record, staging. See
`research/history/CHANGELOG.md` for the corpus rule.*
