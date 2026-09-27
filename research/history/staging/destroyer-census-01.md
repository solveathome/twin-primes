# The destroyer census: the first-mover excess dissolves into a fully derived null, the zone kill budget gets a closed form with its crossover at 61/67, fifteen zones are occupied by counting alone, and the finality frame is graded

<!-- ledger
id: Q-destroyer-census
status: ANSWERED
todo: Z4
question: Who destroys each channel pair, what does the zone kill budget certify, and where does the counting certificate die?
verdict: The census reproduces digit-exactly on an independent engine; the destroyer rule is positional, not temporal, the certificate holds at 15 zones and dies at p = 67 where B/C first crosses 1, and no first-mover excess survives the derived null.
-->

*(2026-08-21. Staging note; nothing here is integrated into a live document.
Producer, formally embedded: `research/destroyer-census-01.js` (2.0 s;
code-sha256 d2062103..., out-sha256 1c286cc8...). Chris's framing, developed
as tasked: only primes q with q^2 <= n+2 can destroy the pair at opener n
(fresh-kill theorem, natal-onset-01 §0, red-team CONFIRMED), so every
destroyed pair has one destroyer and every zone has an exact kill budget.
The producer calibrates against natal-onset-01's 10k window (999/796/203,
kill-level 539:543, destroyer counts 7:219 11:120 13:86 17:57 19:55),
zonegap-02's zone twin counts (8/9/16/17/29) and its D3 youngest-kill list
(22 levels), ABORTING on any mismatch, before measuring openers 11..1e8.
Every null below is derived before it is measured against. Calibration
marked per claim: PROVEN, VERIFIED by exact computation, MEASURED. No
first-moment TPC claim appears anywhere: Route B is CLOSED
(`research/REFUTED.md`); everything here is exact counting.)*

## 1. The census: 9,559,689 destroyed pairs, and a null with nothing left over

**Totals [VERIFIED].** 9,999,999 channel pairs, 9,559,689 destroyed, 440,310
survive = pi2(1e8) = 440,312 (A007508, cited) minus the non-channel (3,5),
(5,7) — asserted. Every destroyer satisfies q^2 <= its kill (max ratio
1.0000, attained only at the natal strikes); a same-q tie is impossible
(q | a and q | a+2 force q | 2) and the tie-adjacent case — both members
composite — always attributes to the opener's lpf, A-side. This is a
POSITION rule, not a time rule: it overrides fold-activation order whenever
lpf(a+2) < lpf(a), which is 49.99% of both-composite pairs and 29.79% of all
destroyed pairs to 1e7, and it moves q = 7's destroyer share from 30.36% to
19.60%. The fold ledger (`research/fold-ledger-01.js`) runs the other
convention; every null below is derived against this one.

**The derived null [derivation PROVEN; fit VERIFIED at dest/null = 1.000].**
Per side, the CRT kill density of destroyer q among channel positions is
s(q) = (1/q) prod_{7<=r<q}(1-1/r) — exact, not 2/q. The B side multiplies
by the opener-prime density (30/8)/ln a times cf(q) = (q/(q-1)) *
prod_{7<=r<q} r(r-2)/(r-1)^2: q | a+2 forces a ≡ -2 (mod q), a gain of
q/(q-1), and lpf(a+2) = q forces a ≢ -2 (mod r) for every r in [7, q) — one
NONZERO residue removed, costing exactly the Hardy-Littlewood local factor
r(r-2)/(r-1)^2. With cf in place the census sits at dest/null = 1.000 for
every q <= 97 (worst 1.003) and f_meas/f_pred = 1.000. The bare-PNT
residual at q = 7 that forced the correction is exactly 7/6.

**The first-mover excess does not exist [MEASURED, against the derived
null].** Per window, destroyer-count/null for q = 7..23 reads 1.000 from
[1e5,1e6) on (small-sample wobble 0.95–1.10 in the two head windows).
Natal-onset-01's "first-mover advantage" (7 at 27.51% of its window's
destructions, above 2/q) was the naive null's error, not a mechanism: the
share of 7 falls to 18.71% at 1e8 and the derived cumulative null tracks
the entire curve. This CORRECTS the excess-decay question the brief posed:
there is no excess to decay once the null carries CRT + PNT + cf(q).

**A/B split per destroyer [identity PROVEN in natal-onset/red-team;
VERIFIED here at scale].** Afresh/Bfresh = 1.000 at every q (3 vs 3 CRT
classes; 1,428,571 : 1,428,572 at q = 7 over ten million pairs), every
A-side fresh channel kill is attributed a live pair under this convention
(not a fact about liveness: half of the both-composite pairs had already lost
the closer to a smaller prime in fold order), and B-live is the
opener-prime fraction — the identity's prediction, now parameter-free.

**Prime-regime closure [VERIFIED, asserted].** For q^3 > 1e8 every fresh
kill of q is q x prime (zonegap-02 §3.4's regime); at q = 997, 3167, 9973
the census columns EQUAL the enumerated counts of primes m with q*m in the
opener/closer classes. This closes the large-q tail exactly where the
asymptotic CRT density misprices the short window above q^2 (the null-total
ratio 0.9670 lives entirely there).

**Concentration [MEASURED, null derived].** Half of all destruction is done
by the 7 primes <= 29 (eps = 0.183: q <= X^0.183); 90% by q <= 1153 (188 of
1226 destroyer primes); the single prime 7 owns 18.71%. A vanishing share
of primes does almost all destruction, and the derived cumulative null
(1 - prod(1-1/r), the telescoped s-sum, times the B-side factor) matches
the measured curve at every eps.

## 2. The entry-fee ledger

- **Entry fee [PROVEN + MEASURED].** Every prime's first fresh kill is the
  B-side natal strike on (q^2-2, q^2); it destroys a LIVE pair iff q^2-2 is
  prime: 10/22 for q <= 97 (natal's row, asserted), falling to 19.51% for
  q in [1009, 9973] — a descriptive count; no null is claimed for the
  quadratic's prime density here.
- **The k-th-youngest ledger [formula PROVEN via §3.4's Phi* form; VERIFIED
  by exact enumeration + 9,624 pi-formula cross-asserts].** The k-th
  youngest active prime makes on average ~2k + 1 fresh kills per zone
  (means 2.83, 4.78, 6.74, ..., 16.89 for k = 1..8; fitted slope 2.010;
  channel share 6/8 of that). Derivation: its kills are q*m with m prime in
  (p/q, p'^2/q], an interval of length ~2(p'-q_k) — two kills per
  seniority step. Generalizes zonegap-02's D3 (youngest: 2..4). The MEAN is
  bounded per seniority rank; the max is not (measured max 8 at k = 1, 27
  at k = 8): the interval length rides the prime gaps, so "bounded per
  fixed zone" is trivially true per zone but NOT uniformly in p — the
  correct uniform statement is O(k) on average, gap-driven in the sup.
- **Rate per unit of newly frozen territory [derived + VERIFIED to 4
  digits].** A fixed prime q kills channel members at asymptotic rate
  s(q)/5 per unit of new territory, forever (measured/derived = 1.0000 at
  q = 7, 11; 0.9998 at 31, over 1,060 shells). Lifetime destruction is
  linear in frozen territory; within any FIXED zone it is the finite Phi*
  count of the ledger.
- **Budget decomposition [VERIFIED at p = 7, 11, 13].** Per-q zone budgets
  vs CRT 2*C*s(q), exact small-window fluctuation on display; the
  decomposition sums to B(p) exactly, and the big-walk B(p) is
  cross-asserted against a direct second computation.

## 3. THE OBJECT: budget vs capacity, and where the certificate dies

**The theorem [PROVEN, one line].** Channel members belong to exactly one
pair each, so destroyed pairs absorb DISTINCT composite members: D <= B,
hence T = C - D >= C - B. In the zone, composite <=> lpf <= p (Zone
Restriction Lemma), so B(p) is computable from the actives {q <= p} alone —
no primality input beyond p. If B <= C - 1 the zone CANNOT be emptied; the
count C - B is a forced minimum of twins.

**The verdict [VERIFIED at all 1,225 zones in reach].** The certificate
holds at exactly 15 zones, p = 7..61, with forced counts 8, 8, 15, 13, 17,
20, 19, 20, 22, 19, 20, 18, 12, 10, 1 — TIGHT at p = 7, where all 8 twins
are forced by counting alone. It DIES at p = 67, where B/C first crosses 1
(B = 503 against C = 497, B/C = 1.0121), and never returns; the ratio's
LIMIT is 2, which is not the threshold (band means 0.8528 / 1.3218 /
1.4663 / 1.5419).

**The closed form [derived; VERIFIED to <0.1% relative error from p = 97].**
B(p) = 2C(p) - (prime members) = (p'^2 - p)/5 - (3/4)(primes in the zone),
so B/C = 2 - 15/(4 ln p) + o(1), and the density crossover B = C sits at
ln p = 15/4, p* = e^{15/4} = 42.52. The measured die-off at 61/67 lands
LATER than p* because finite-height prime density exceeds its asymptote;
the a-priori CRT main term 2(1 - prod_{7<=q<=p}(1-1/q)) stays below 1 up to
p = 59 and first crosses at p = 61, which is the last certified zone.

**The honest grade — this is NOT a headline.** The family is finite and its
death is derived, not accidental: B/C -> 2 because channel prime density
falls like 15/(8 ln p) -> 0, so no zone family past 67 can ever be
certified by the count. What the budget arithmetic certifies: occupancy —
indeed a twin COUNT — for 15 small zones, with zero placement information,
the only occupancy mechanism in the corpus that needs none. What it cannot
certify: anything at large p, where budget exceeds capacity forever and
WHERE the kills land — the max wall, zonegap-01 §5 — is again the entire
question. Computing B exactly is itself a sieve of the zone, so the
certificate's value is structural (a count suffices below the crossover),
not computational. No infinite family, no TPC content; the statement is
exact counting and stays that.

## 4. The finality note: the freeze frame, graded

- **The freeze sequence [PROVEN].** The verdict on pair (a, a+2) depends
  only on divisibility by its destroyer set {q : q^2 <= a+2}, which has
  pi(sqrt(a+2)) - 3 channel-active members. Fold p (activation of p)
  makes verdicts final on the stretch p^2 <= a+2 < p'^2 — exactly p's
  onset shell in pair coordinates, length p'^2 - p^2. A twin is a pair
  that outlives its whole destroyer set; in the channel this is exactly
  "both members prime".
- **Shells partition; zones overlap [PROVEN; VERIFIED].** The shells
  [p^2, p'^2) partition [49, ∞) and each shell sits INSIDE its zone
  (p^2 <= a+2 < p'^2 implies p < a and a+2 < p'^2). The census telescopes
  exactly: 1,225 shells to 1e8, 438,186 frozen twins, sum asserted equal
  to the endpoint difference.
- **The equivalence, made exact.** Weak level [PROVEN, elementary]: every
  channel twin with a+2 >= 49 lies in exactly ONE shell, so infinitely many
  freeze steps freeze >= 1 surviving pair <=> TPC <=> weak Zone Postulate
  (ZONE-POSTULATE.md §2, cited). Strong level [one direction PROVEN, the
  equivalence FAILS as stated]: "every freeze step freezes >= 1 pair"
  IMPLIES the strong Zone Postulate (shell inside zone), but the converse
  does not follow — a zone's twin may sit below p^2, in an earlier shell.
  So the brief's "Postulate <=> every freeze step freezes a pair" is a
  theorem only at the weak (infinitely-often) boundary; at the strong
  boundary it is a one-way implication, and the shell form is the STRICTLY
  stronger uniform statement.
- **Measured standing [VERIFIED].** No empty shell in reach; minimum 2
  frozen pairs per shell (p = 11, 17, 29) — the shell analogue, over a
  partition, of zonegap-01's "every zone holds >= 2 pairs" (which is over
  overlapping windows, to 1e11).

## 5. The intra-zone staircase (addendum 1)

The active destroyer set at zone position n is {q : q^2 <= n+2}: the zone's
interior climbs pi(sqrt(p)) - 3 at entry to pi(p') - 3 at the frontier
(zone 9967: 22 -> 1,226 actives). The deterministic tread curve
S(q) = prod_{7<=r<=q}(1-2/r) predicts the alive fraction up to ONE derived
constant [VERIFIED everywhere measured]: measured-alive/S sits at
0.794–0.806 in every u-decile of every band — e^{2gamma}/4 = 0.7931, the
origin-excess constant (origin-excess.md, cited), with NO u-dependence left
over. The within-zone destruction profile is the staircase times that
constant; nothing zone-local remains. Tread violence 2/q against spacing
~2q ln q quantifies Chris's framing exactly: the 7-tread kills 2/7 of
survivors in one step, the 9973-tread 2.01e-4 — early treads rare and
violent, late treads dense and negligible, with per-tread noise (0.50–1.18
at single small treads) exactly natal's §3 tread wobble.

## 6. The half-level head (addendum 2)

- **(a) [VERIFIED, exact per zone].** head(p) IS the first survivor of the
  FROZEN sqrt(p)-level sieve above p in 1,184 of 1,225 zones (96.65%); a
  tread enters the head window in 105 zones and CHANGES the head in only
  41, the differ-fraction falling 9.09% -> 1.79% across bands. The
  hypothesis is confirmed as an exact statement with a vanishing
  correction, not as an asymptotic.
- **(b) The coefficient does NOT derive zero-parameter [MEASURED, nulls
  derived].** The staircase-Mertens forward density gives
  e^{2gamma}/(8 C2) = 0.6007 ln^2 p, which is the HL coefficient
  1/(2 C2) = 0.7574 multiplied by the origin-excess constant
  rho(2) = e^{2gamma}/4 by construction (origin-excess.md); the measured
  head coefficients sit between them, and read 0.7064, 0.7177, 0.7236,
  0.7192, 0.7344 across the five windows, non-monotone. On half-decade
  bands the same ratio-of-sums estimator spans 0.669 to 0.753, so the
  window figures carry range composition and are not a measured
  convergence to 0.7574. The honest decomposition: h = R x
  (prime-origin factor), R = E[g^2]/2E[g] the CONTINUUM
  inspection-paradox functional of the SAME window's twin gaps. R is not
  what a discrete origin sees: a uniform integer origin sees R + 1/2
  exactly, an odd origin R + 1, and an origin drawn from the
  coprime-to-30 residues that primes >= 7 actually occupy sees R + 2.754
  at [1e7,1e8) [MEASURED, `redteam-0828-head.js`, five decades]. So
  h/R = 1.09 -> 1.03 is read against a population no prime belongs to,
  and the excess depends on which null is meant: at [1e7,1e8),
  h - R = 5.679 against R as written, 5.179 against the discrete uniform
  origin, and 2.925 against the coprime-to-30 one. Against the population
  primes occupy the residual is about half the figure quoted here, and it
  still falls with height. So the head field is the twin-gap process's
  renewal functional times a decaying prime-origin excess of a few
  percent — derived up to the gap shape, that excess, and the choice of
  null. NOT the hoped headline; the
  reduction of head to (gap process + renewal + small conditioning) is
  the result, HELD like everything else here.
- **(c) [MEASURED].** head mod 30 deviates from the class-independence null
  by at most 7.4% (residue 12); the deviation pattern is the small-h class
  correlation, no new forbidden structure.

## 7. NOT REACHED

- Nothing beyond 1e8; the certificate's death at 67 is derived to be
  permanent (B/C -> 2) but measured only to p = 9967. No 1e11 pass.
- The mid-large destroyer band (97 < q < 467) keeps the asymptotic CRT
  null (drift to 0.98–1.16 visible at 199/997); the Buchstab-corrected
  null is formulated (prime-regime + rough-count) but only the three
  q > 467 witnesses were closed exactly.
- The k-th-youngest SUP (gap-driven) is measured, not bounded; the
  channel-restricted per-zone destroyer-count (as opposed to kill-count)
  ledger was not separated.
- Addendum (2a) tested the head as an OBJECT (frozen-level first survivor)
  and its mean; the full head DISTRIBUTION against the level-sqrt(p)
  tile's first-slot-gap law, and the prime-origin excess's mechanism, are
  open. zonegap-01's 0.7229 at its higher levels was cited, not re-swept.
- The entry-fee live-kill density (primality of q^2-2) has no derived
  null here (HL quadratic constant not computed).
- The finality note's shell postulate at 1e11 scale (zonegap-01's range)
  was not swept; shells were checked only to 1e8.

---

*Producer and custody: `research/destroyer-census-01.js`, embedded
(`node research/qc/embed.js --check` passes bit-honest; calibration aborts
before measurement; the producer's READINGS block carries the same
off-by-one at the CRT crossing that §3 corrects here, p = 59 for p = 61,
and is uncorrected, while its OUTPUT block is right). Cited, never recomputed: pi2(1e8) = 440,312 (OEIS
A007508), natal-onset-01's window figures, zonegap-02's D3 list and zone
twin counts, zonegap-01's head coefficients, origin-excess.md's
e^{2gamma}/4 = 0.79305. History layer: process record, staging. See
`research/history/CHANGELOG.md` for the corpus rule.*
