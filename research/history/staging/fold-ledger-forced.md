# The fold ledger: which of its columns are FORCED

<!-- ledger
id: Q-ledger-forced
status: ANSWERED
todo: Z5b (retired)
question: Which properties of the fold ledger's columns are FORCED rather than expected?
verdict: Fourteen forced constraints, all identities or wrong-direction bounds; by_new is forced only in the prime gap (its O(1) is MEASURED); nothing forces net from below.
-->

**Status: HELD, scratchpad-grade, 2026-08-28.** This answers the last sentence
of TODO item Z5b, "whether any structural property of these columns is FORCED
rather than expected". It is an enumeration with proofs, plus a slack
measurement against the committed table. It opens no route, and it is not a
red team of the Z5b documents.

Table read: `research/fold-ledger-01.csv` (1,226 folds, q = 7..9973), produced
by `research/fold-ledger-01.js` (embedded). Definitions taken from that
producer's header and from its code, not from prose about it.

Companion producer: `research/history/staging/fold-ledger-forced.js`, embedded
via `node research/qc/embed.js`, 1.2 s, all assertions pass. Every number
quoted below is scratchpad-grade and comes from that block; the command is
`node research/history/staging/fold-ledger-forced.js`. The script is not a
research artifact and is not registered in `SCRIPTS.md`.

---

## 0. What this does NOT settle, first

- **Nothing here floors `net_new_twins`.** The only forced statements about
  `net` found are ceilings. The measured `min net = 2` over 1,226 folds is a
  MEASUREMENT of the occupancy assertion, not a proof of it. Flooring `net` at
  every fold is the Zone Postulate (`research/ZONE-POSTULATE.md`, TODO Z5b) and
  it is not attempted here.
- **No closed-form forced lower bound on `removed_by_old_moire` reaches the
  column.** The best one found (F12) holds 47.10% of it in total, and its band
  share *rises* from 0.1500 to 0.4746 without approaching 1; the single-prime
  floor F11 holds 29.89% and its share falls to 0.2984, and the exact-union
  floor F13 holds 84.59% and its share falls to 0.8444. §5 gives the reason and
  it is structural, not a failure of effort: the window is shorter than the
  period of any prime set large enough to matter.
- **The consequence for the ceiling on `net` is that the ceiling diverges from
  `net`.** Bound/net over the six bands reads 1.100, 1.018, 1.615, 2.506,
  3.393, 4.517 with the sharpest floor available, and 2.250, 3.787, 5.997,
  8.179, 10.321, 12.875 with closed forms only. The closed-form series is
  monotone increasing; the sharpest-floor series dips at the second band (where
  F13's `P` is still all of `[7, q)`) and then increases monotonically.
  A forced ceiling that grows away from the truth is not a route to anything.
- **Most of the by_new structure is already in the repo.** §7 is the prior-art
  check and it is not clean: `research/attack-lambda-ledger-01.js` Pinning 2
  and `research/history/staging/destroyer-census-01.md` §2 between them already
  own the "q times a prime" structure, the counting window of length ~2g, and
  the reading that the sup is gap-driven rather than bounded. What is new here
  is the sharp containment-corrected bound, its row-by-row slack, and the
  localization F9.

---

## 1. The definitions, as the producer fixes them

Fix an active prime q with successor q′. Write lo = q², hi = q′², width = hi − lo.
A **channel opener** is an integer a with a ≡ 11, 17 or 29 (mod 30); its slot is
the pair (a, a+2), whose members are then ≡ 13, 19, 1 (mod 30) respectively.
Both members of a channel slot are coprime to 30.

The producer marks, for each v in [lo, hi), the least prime in [7, q] dividing v,
writing 0 when there is none. Call that value lpf\*(v).

- `added_pairs(q)` counts channel openers a with lo ≤ a ≤ hi − 3. Both members
  are then inside [lo, hi).
- A slot is **surviving** (`net_new_twins`) when lpf\*(a) = lpf\*(a+2) = 0,
  otherwise **removed**. The **destroyer** is the minimum of the nonzero
  lpf\* values.
- `removed_by_new_prime(q)` counts removed slots with destroyer = q;
  `removed_by_old_moire(q)` counts removed slots with destroyer < q.
- `both_composite_pairs(q)` counts removed slots with both lpf\* nonzero.

**Lemma 0 (the sieve is complete in the stretch).** For v in [lo, hi) coprime to
30, lpf\*(v) = 0 if and only if v is prime. Proof: if v is composite its least
prime factor is at most √v < q′, and there is no prime strictly between q and q′,
so that factor lies in [7, q] and is seen. Conversely a prime v in the range
exceeds q so no active divides it. □

Everything below rests on Lemma 0, so every statement below is a statement about
primes, not about the marking convention.

---

## 2. The definitional constraints (F1 to F6)

**F1 (added is exact, and depends on width alone). PROVEN.**
For a prime p > 5, p² ≡ 1 or 19 (mod 30). Hence lo ≡ 1 or 19, hi ≡ 1 or 19,
and width ≡ 0, 12 or 18 (mod 30). Write W = width − 2, the number of eligible
openers. Counting the three channel classes over W consecutive integers whose
first is ≡ 1 or 19 (mod 30) gives the offset multiset {10, 16, 28} in the first
case and {10, 22, 28} in the second. The two differ only in 16 against 22 (the
multisets sum to 54 and 60, so a sum argument does not close it), and for each of
the three possible W classes those two offsets fall in the same count bracket, so
the two endpoint cases give the same count: 3t+2, 3t, 3t+1 with W = 30t + s. The
result is

    width ≡  0 (mod 30):  added = (width − 10)/10
    width ≡ 12 (mod 30):  added = (width − 12)/10
    width ≡ 18 (mod 30):  added = (width −  8)/10

so added is a function of width alone, with no dependence on which square class
lo sits in. The producer's own claim is the weaker "floor arithmetic"; the
generic three-class bound would be |added − (width−2)/10| < 3.
**Measured:** the deviation takes exactly one value per residue class of width
over all 1,226 folds: −0.80 on 494 folds, −1.00 on 366, −0.60 on 366, zero
spread inside each class. Asserted equal to the CRT closed form at every row.

**F2 (`removed = by_new + by_old`). PROVEN, trivially.** The destroyer of a
removed slot is a single active prime, at most q by Lemma 0, so "= q" and "< q"
partition the removed slots. Asserted at every row.

**F3 (`net = added − removed`). PROVEN, trivially.** Every added slot is
surviving or removed, exclusively. Asserted at every row.

**F4 (`cc ≤ removed`). PROVEN, trivially.** Both-composite implies removed.

**F4b (`cc ≤ by_old`, i.e. cc ≤ removed − by_new). PROVEN, and sharper than F4.**
If the destroyer is q then some member has lpf\* = q, so q divides it; q cannot
divide the other member since q ∤ 2; and if the other member were composite its
lpf\* would be some p ≤ q, and p = q is impossible, so p < q and the destroyer
would be p, not q. Hence a by_new slot has exactly one composite member and is
never both-composite. This is the counting form of Pinning 2 in
`research/attack-lambda-ledger-01.js`, which states the same fact as "the
partner is prime". Asserted at every row.

**F5 (the cumulative columns). PROVEN.** `cum_added`, `cum_removed`, `cum_twins`
are the running sums, and `cum_added − cum_removed = cum_twins` follows from F3
by telescoping. Asserted at every row and at the top.

**F6 (arithmetic of the stretch). PROVEN.** For primes p > 3, p² ≡ 1 (mod 24),
so width ≡ 0 (mod 24) at every fold; and lo ≡ 1 or 19 (mod 30). Asserted at
every row. These are what makes F1 a function of width alone.

**F7 (the partition drops exactly one slot per fold boundary). PROVEN.**
The producer's loop is `a + 2 < hi`, so the opener a = hi − 2 is never counted in
stretch S_q; and it is below lo of the next stretch, so it is never counted
there either. Since hi = q′² ≡ 1 or 19 (mod 30), hi − 2 ≡ 29 or 17 (mod 30),
which is a channel opener in both cases. So exactly one channel slot,
(q′² − 2, q′²), is dropped at every fold boundary. The drop is invisible to the
`net` column, because q′² is composite and the slot can never be a twin pair,
which is why the producer's independent sieve check on `cum_twins` passes
regardless. **Measured:** channel openers in [49, 10007² − 3] number 10,013,999
against `cum_added` = 10,012,774, a difference of exactly 1,225, matching the
1,225 dropped openers that fall inside the global range. See §8.

---

## 3. by_new: the forced upper bound (F8) and its localization (F9)

**Lemma A (the structure of a by_new kill). PROVEN.** Suppose the destroyer of
a slot (a, a+2) in S_q is q. Then exactly one member m has lpf\*(m) = q, the
other member is prime (F4b), and m = q·k with k prime and q < k ≤ (hi − 1)/q.

*Proof.* q | m and m ∈ [lo, hi), so m = q·k with k ≥ q and k ≤ (hi−1)/q. Every
prime factor of k is at least q, since lpf(m) = q. If k were composite then
k ≥ q², so m ≥ q³. But q³ > q′² whenever q′ < q^{3/2}, which holds for every q
in range (and for all q ≥ 5 by Bertrand, since q′ < 2q ≤ q^{3/2} for q ≥ 4).
So k is prime. If k = q then m = q², whose slot is (q²−2, q²) with opener below
lo, excluded from `added` by F7. So k > q. □

**Lemma A′ (the mod-30 filter). PROVEN.** m must sit in a channel slot, so
m mod 30 ∈ {1, 11, 13, 17, 19, 29}; the residues 7 and 23 belong to no channel
slot. Each residue coprime to 30 belongs to at most one channel slot (11, 17, 29
as opener, 1, 13, 19 as upper member, and the alternative reading is blocked by
divisibility by 3 in every case), so distinct k give distinct kills. □

**F8 (the forced upper bound). PROVEN.**

    by_new(q) ≤ B3(q) := #{ k prime : q < k ≤ (q′² − 1)/q,
                            q·k mod 30 ∉ {7, 23},
                            the slot of q·k lies inside [q², q′²) }

and the weakenings B2 (drop the containment test), B1 (drop the mod-30 filter),
Bg (drop primality of k above q′, keeping only that no prime lies in (q, q′)).
The chain B3 ≤ B2 ≤ B1 ≤ Bg is asserted at every row, as is by_new ≤ B3.

**Measured slack, 1,226 rows.** B3 has mean 1.271 and max 5, against the
column's mean 0.267 and max 3. B2 mean 1.272 max 5; B1 mean 1.825 max 7;
Bg mean 2.852 max 11. The slack B3 − by_new is distributed 0:417, 1:478, 2:252,
3:67, 4:12, so the bound is tight at 34.0% of folds and forces by_new = 0
outright at 297 folds. The worst forced bound in range is at q = 6173 (g = 24),
where B3 = 5 and the column reads 1.

**F9 (localization). PROVEN.** By Lemma A the smallest possible k is q′, so
every by_new kill has m ≥ q·q′ and hence opener a ≥ q·q′ − 2. The kill's opener
therefore lies in the top (q′·g + 2)/(g·(q+q′)) fraction of the stretch, which is
q′/(q+q′) plus at most two integers, so just over a half. The two-integer
overhang is not cosmetic: it is attained at 51 of the 293 folds with by_new > 0,
the earliest at q = 157 (row 34), whose by_new slot is (25589, 25591) with
25591 = q·q′, putting the opener 25589 = q·q′ − 2 below the bare q′/(q+q′) cut.
The inequality as coded holds at 293 of 293.

### Is "by_new = O(1)" forced?

**No, not in q. It is forced in the prime gap g(q) = q′ − q, and nothing more.**
The counting window is (q, (q′²−1)/q], of length

    (q′² − 1)/q − q = ((q′ − q)(q′ + q) − 1)/q = g·(2 + g/q) − 1/q ≈ 2g,

and it contains no prime in (q, q′), so by_new ≤ 1 + π((q′²−1)/q) − π(q′), which
counts primes in a window of length (g·q′ − 1)/q ≈ g above q′. The forced
statement is therefore

    by_new(q) ≤ 1 + #{ primes in (q′, q′ + g(1 + g/q)] }
              ≤ 1 + ⌈(8/30)·g·(1 + g/q)⌉        (q′ coprime to 30, load-bearing)

The second step is false for an arbitrary interval start: (10, 19] holds 11, 13,
17 and 19, which is 4 against ⌈8·9/30⌉ = 3. It survives only because the window
starts at q′, which is coprime to 30. Checked exhaustively over all 8 coprime
starts against all lengths to 600 and over every realizable (q, g): 0 violations.

An unconditional O(1) would require an unconditional O(1) on the number of
primes in a window of length ~2g above q, which is not available: it is bounded
only through g, and g itself is unbounded. **So `by_new = O(1)` as stated in
`fold-ledger-01.js` line 149 and in TODO Z5b is MEASURED over q ≤ 9973, not
forced.** The measured window length (Kmax − q) has mean 16.3 and max 72 over
this range, and the measured g has mean 8.2 and max 36. The measured max
by_new = 3 sits under the largest value the forced bound takes in range, B3 = 5
at q = 6173. B3 has no forced maximum, being driven by g.

This reading is not new. `research/history/staging/destroyer-census-01.md` §2
already records, for the k-th-youngest active prime, that "the interval length
rides the prime gaps, so 'bounded per fixed zone' is trivially true per zone but
NOT uniformly in p". F8 is the k = 1 case of that with the containment
correction added and the slack measured per row.

---

## 4. by_old: is any lower bound forced?

**Lemma B (what the by_old column actually counts). PROVEN, and asserted at all
1,226 rows.** by_old(q) = #{added slots at least one of whose members is
divisible by some prime p with 7 ≤ p < q}. Proof: the destroyer is < q exactly
when some member has lpf\* < q, which by Lemma 0 is exactly divisibility of a
member by a prime in [7, q). The companion script recomputes the window under
this characterization and asserts the result equals the CSV column at every row.

So by_old is a **union count over a short window**, and every forced lower bound
on it is a forced lower bound on that union.

**F11 (the single-prime floor). PROVEN.** For each old p, the openers killed by
p are the a with a ≡ 11, 17, 29 (mod 30) and a ≡ 0 or −2 (mod p): six classes
mod 30p, disjoint since p ∤ 2. Each class contributes ⌊W/(30p)⌋ or that plus one
over W = width − 2 consecutive integers. So

    by_old(q) ≥ max_{7 ≤ p < q} A_p(q),  A_p(q) exactly computable,
    A_p(q) ≥ 6⌊(width − 2)/(30p)⌋ ≥ (width − 2)/(5p) − 6.

**Measured:** taking the max over all p < q, this holds 29.89% of the by_old
total, and its share is falling: 0.4250, 0.3533, 0.3225, 0.3097, 0.3028, 0.2984
across the six bands. The limit is 2/7 divided by the by_old share of added,
which tends to 2/7 = 0.2857.

**F12 (the prefix-CRT floor, the best closed form found). PROVEN.** For any set
P of primes in [7, q), let M_P = 30·∏_{p∈P} p and U_P = 3(∏_{p∈P} p −
∏_{p∈P}(p−2)). The openers killed by P form exactly U_P residue classes mod M_P,
and any W consecutive integers contain at least ⌊W/M_P⌋ of each. So

    by_old(q) ≥ max_P  U_P · ⌊(width − 2)/M_P⌋.

**Measured** over prefixes {7}, {7,11}, {7,11,13}, ...: 47.10% of the by_old
total, rising band over band (0.1500, 0.2991, 0.3538, 0.3978, 0.4427, 0.4746)
because larger widths admit longer prefixes.

**F13 (the exact prefix union, forced but not closed-form).** For any fixed P
the exact union count over the window is deterministic and is a valid floor.
**Measured** with P = primes ≤ 97: 84.59% of the total, and *falling* band over
band (1.0000, 1.0000, 0.9237, 0.8741, 0.8570, 0.8444). The first two bands read
1.0000 only because there P is all of [7, q) and the floor is the column itself.

**The truncated inclusion–exclusion route is dead as stated.** Bonferroni-2 over
all p < q, Σ_p A_p − Σ_{p<p′} A_{p,p′}, cannot help: Σ_p A_p already exceeds the
whole `added` column at 1,219 of 1,226 folds (max ratio 2.90), and the density
version goes vacuous as soon as Σ_{7≤p≤y} 2/p > 1, which first happens at
**y = 29**. Past a seven-prime prefix the one-term truncation carries no
information.

**Verdict on (b).** A nontrivial forced lower bound on by_old does exist, and it
is not only the single-prime one: F12 beats F11 from the third band on. But
**no closed-form floor reaches the column, and the deficit is structural.** The
floor requires M_P ≤ width, so ∏_{p∈P} p ≲ width/30, so max P ≈ log(width) by
the prime number theorem, and then by Mertens

    added − F12  ≍  added · ∏_{7≤p≤log width}(1 − 2/p)  ≍  added / (log log width)²

while the truth is added − by_old = net ≍ added/(log width)². The forced floor's
deficit exceeds the true deficit by a factor of order (log width / log log
width)², which diverges. That is the short-window wall in the one place where
it can be written in closed form.

---

## 5. net: the forced ceiling (F14)

**F14. PROVEN.** net(q) = added(q) − removed(q) ≤ added(q) − by_old(q) ≤
added(q) − max(F11, F12, F13). Asserted with zero violations at all 1,226 rows.

**Measured, bound/net by band:** 1.100, 1.018, 1.615, 2.506, 3.393, 4.517 using
the exact-union floor F13; 2.250, 3.787, 5.997, 8.179, 10.321, 12.875 using
closed forms only. The closed-form series is monotone increasing, by §4's
factor; the F13 series dips at the second band, where F13's P is still all of
[7, q), and increases monotonically after it.

**Is anything sharper forced?** Yes, from the literature, not from the ledger:
the Selberg upper-bound sieve gives twins in an interval of length W at
≤ (1 + o(1))·8·C₂·W/(log W)², the right order in W, where F14's ceiling is off
by (log/log log)². That bound is asymptotic with an unspecified o(1), so it is
not a per-row checkable inequality at q ≤ 9973 without an explicit-constant
version, and **that check has not been run here.** The crude constant 8C₂ makes
the literature bound numerically worse than F14 in every band, not only the top:
bound/net 6.430 to 8.841 against F14's 1.100 to 4.517. Nothing is gained by
importing it at this size.

**Nothing forces net from below.** F14 is a ceiling. `net ≥ 1` is asserted by
the producer at every row in range and measured at min 2, and it is exactly the
occupancy statement of `research/ZONE-POSTULATE.md`. It is CONJECTURED, not
forced, and it is not attacked here.

---

## 6. The table

| column | forced constraint | proof | measured slack over 1,226 rows |
|---|---|---|---|
| `added_pairs` | = (width−10)/10, (width−12)/10, (width−8)/10 for width ≡ 0, 12, 18 (mod 30); function of width alone | §2 F1 | exact; one value of added − (width−2)/10 per residue class, zero spread |
| `width` | = q′² − q², ≡ 0 (mod 24); `stretch_lo` ≡ 1 or 19 (mod 30) | §2 F6 | exact at every row |
| `removed_total` | = by_new + by_old | §2 F2 | exact |
| `net_new_twins` | = added − removed; ≥ 0 | §2 F3 | exact |
| `both_composite_pairs` | ≤ by_old (sharper than ≤ removed) | §2 F4b | asserted at every row |
| `cum_*` | running sums; cum_added − cum_removed = cum_twins | §2 F5 | exact at every row and at the top |
| (partition) | exactly one channel slot, (q′²−2, q′²), is dropped per fold boundary; it can never be a twin | §2 F7 | 10,013,999 − 10,012,774 = 1,225, matches exactly |
| (hidden column) | #{prime members in contained slots} = 2·net + removed − cc | §7 F10 | asserted at every row against a direct sieve |
| `removed_by_new_prime` | ≤ B3 = #{k prime in (q, (q′²−1)/q], q·k in a channel class, slot contained} | §3 F8 | B3 mean 1.271 max 5 vs column mean 0.267 max 3; tight at 34.0%; forces 0 at 297 folds |
| `removed_by_new_prime` | every kill has opener ≥ q·q′ − 2 | §3 F9 | asserted at every row with by_new > 0 |
| `removed_by_old_moire` | = #{slots with a member divisible by some p ∈ [7,q)} | §4 Lemma B | asserted row-identical at every row |
| `removed_by_old_moire` | ≥ max_p A_p (single-prime CRT count) | §4 F11 | holds 29.89% of the column; band share falling to 0.2984 |
| `removed_by_old_moire` | ≥ max_P U_P·⌊(width−2)/M_P⌋ (prefix CRT) | §4 F12 | holds 47.10%; band share rising to 0.4746 |
| `removed_by_old_moire` | ≥ exact union count over any fixed P | §4 F13 | holds 84.59% at P = primes ≤ 97; band share falling to 0.8444 |
| `net_new_twins` | ≤ added − (any by_old floor) | §5 F14 | bound/net 4.517 (F13) and 12.875 (closed form) in the top band; the closed-form series is monotone increasing, the F13 series dips at band 2 and then increases |

**F10 (the hidden prime-member column). PROVEN.** Each contained slot has two
members. Counting prime members two ways gives
#{prime members} = 2·net + (removed − cc), since a removed slot contributes one
prime member when exactly one member is composite and none when both are. So
the CSV determines the number of primes lying in wholly-contained channel slots
of the stretch, without any extra input: **P_ch(q) = 2·net + removed − cc.**
Asserted at every row against a direct sieve of the window. This is a forced
identity, not a route: it is a re-labelling of the columns, and the quantity it
produces is a prime count that the ledger already knows.

---

## 7. What is NOT forced, and why

- **The short-window fluctuation of `removed_by_old` about its expectation.**
  F11 to F13 floor the union count by full-period arguments; every one of them
  loses exactly what the window is too short to see. The expectation
  `fold-ledger-03-iterate.js` iterates is a full-period density; the residual is
  measured as Poisson-scale there, and no argument in this document bounds that
  residual below at any single fold. Bounding it below the mean at every fold IS
  the Zone Postulate (`research/ZONE-POSTULATE.md`, TODO Z5b). Not attempted.
- **`net ≥ 1` at every fold.** Occupancy. CONJECTURED. Everything forced here
  points the wrong way (ceilings on net, floors on removals).
- **`by_new = O(1)` uniformly in q.** MEASURED to q = 9973 only; forced only
  through g(q), per §3.
- **Any per-fold value.** Nothing above pins a column's value except `added`
  (F1) and the identities F2 to F6, F10. `removed`, `by_new`, `by_old`, `cc`,
  `net` are bounded but not determined by the forced statements.

---

## 8. Prior art inside the repo (independent rediscovery is not discovery)

Grepped `by_new`, `own kills`, `fold's own`, `O(1)`, `forced` across `research/`
and `research/history/staging/`.

- **`research/attack-lambda-ledger-01.js` (2026-08-26), Pinning 2, and
  `research/history/staging/attack-lambda-ledger.md` §3.** "A by_new kill has one
  member equal to q·m with m q-rough and m < q′²/q < q², so m is prime and
  Ω(q·m) = 2; and q cannot divide the partner as well, so the partner is prime."
  That is Lemma A and F4b, stated and asserted at all 1,226 folds two days
  before this document. **F8's structure is a rediscovery.** What F8 adds is the
  containment correction, the mod-30 class filter, the resulting per-row bound
  B3, and its slack distribution.
- **`research/history/staging/destroyer-census-01.md` §2, the k-th-youngest
  ledger.** "Its kills are q·m with m prime in (p/q, p′²/q], an interval of
  length ~2(p′ − q_k)... the interval length rides the prime gaps, so 'bounded
  per fixed zone' is trivially true per zone but NOT uniformly in p." That is
  the §3 verdict on by_new = O(1), already recorded, in the k-th-youngest
  generalization. **The verdict is a rediscovery.** What is new is that it is
  now stated against the ledger's own column with the per-row slack measured,
  and that TODO Z5b's own "O(1)" line is flagged as MEASURED on that basis.
- **`research/history/staging/destroyer-census-01.md` §3, the counting
  certificate.** D ≤ B, the budget bound, is the same style of forced argument
  and dies at p = 67. F14 is its ledger-column analogue and dies the same way,
  by the same mechanism, at a growing ratio.
- **No repo hit** for F1's function-of-width-alone closed form, F7's boundary
  drop, F9's localization, F10's prime-member identity, or F11 to F13's floors
  on by_old. Those are new to the repo as far as the grep reaches. Nothing here
  is claimed novel against the literature: F11 and F12 are the Eratosthenes and
  truncated-Brun bounds in local coordinates, and the §4 verdict is the standard
  short-interval sieve obstruction.

---

## 9. Defects noticed in passing

- `research/fold-ledger-01.js` header line 9 says "the stretches S_q = [q², q′²)
  partition the line". They do not partition the *slot* set: the opener a = q′² − 2 falls in
  no stretch's ledger, one per fold boundary (F7). The `cum_added` and
  `cum_removed` columns are short by 1,225 slots over the range as a result. The
  telescoping identity and the `cum_twins` sieve check are both unaffected,
  because q′² is composite and the dropped slot is never a twin. This is an
  accounting note, not an error in any published number.
- TODO Z5b and `fold-ledger-01.js` line 149 both state by_new "stays O(1)"
  without a rung. Per §3 it is MEASURED to q = 9973, and the uniform statement
  is false as stated unless read as a bound in g(q).

---

## 10. What would falsify this, and whether that check has run

- **F1 to F7, F10 and Lemma B** are asserted row by row inside
  `fold-ledger-forced.js`. A counterexample at any of the 1,226 folds aborts the
  run. **The check has run and passes.** It would falsify them; it does not
  prove them beyond the range, but they carry proofs in §2 that do not depend on
  the range.
- **F8** would be falsified by a fold with by_new > B3. **Checked at all 1,226
  folds, zero violations.** It would also be falsified by a composite k in Lemma
  A, which the Bertrand step rules out for all q ≥ 4; that step is not
  range-limited.
- **F9** would be falsified by a by_new kill with opener < q·q′ − 2. **Checked
  at every fold with by_new > 0, zero violations.**
- **F11, F12, F13, F14** would be falsified by a fold where the floor exceeds
  the column, or the ceiling falls under `net`. **Checked at all 1,226 folds,
  zero violations.**
- **The §4 divergence claim** (forced deficit / true deficit → ∞ like
  (log/log log)²) is a HEURISTIC from Mertens, not proved here; what is measured
  is that the ratio bound/net rises monotonically over six bands to 4.517 and
  12.875. It would be falsified by the ratio turning over at larger q. **That
  check has not run** and would need a ledger past q = 9973.
- **The recomputation's own honesty** is bound by asserting the recomputed
  `added, by_old, by_new, net, cc` equal the committed CSV at every row, so a
  bug in this script that changed a column would abort rather than agree.
  **That assertion has run and passes.**
