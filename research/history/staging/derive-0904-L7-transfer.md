# The one-class to two-class transfer G₂ ≪ g·(ln x)^A (legal target L7): both transfer mechanisms the corpus holds are already priced, and neither reaches it

<!-- ledger
id: Q-derive-0904-L7-transfer
status: PARTIAL
todo: 0
question: Is the legal open-set target L7, G2(x#) << g(x#) (ln x)^A for a fixed A (which would give exponent 2 + o(1) from Iwaniec's one-class bound, below beta2 and above the TPC line), reachable by a TRANSFER from the one-class Jacobsthal bound, and if not, what does each transfer mechanism reduce to?
verdict: No transfer mechanism in the corpus reaches L7, DERIVED: the union-bound transfer is vacuous already in the period average from x = 11 (the exact CRT budget sum of 1/(p - 1) over 3 <= p <= x passes 1 at x = 11), and the sieve-on-holes transfer is the Bruedern-Fouvry vector sieve, whose coupled unconditional form lands at 2(1 + sqrt e) = 5.2974 above beta2 and whose decoupled form needs the sup-over-positions remainder law that item 0 ruled a truth gap; L7 stays a legal OPEN statement with no mechanism, and the conjectural A = 1 is truth-side evidence only.
-->

> **RIDER 2026-09-04 (orchestrator, from `redteam-0904-item0.md`).** The
> union-bound argument and the CRT count are CONFIRMED on independent code.
> Three rewordings: §2's "certifies nothing in the period average" needs "and
> hence not at every position" (the certificate is ≤ 0 at 25,386 of 30,030
> positions at x = 13, the period mean exact); §3's "exactly the
> Brüdern–Fouvry decomposition" reads "reduces to it once the hole indicator
> is replaced by a sieve minorant", the Ford–Halberstam substitution step
> that `sift-limit-attack.md` §7b(1b) owns; and the price 2(1+√e) = 5.2974 is
> the forced-equal-level constant, the corpus's live figure being
> K_BF = 5.158064680330 at free levels (reproduced to twelve digits), so read
> "5.158 at free levels, 5.297 with the levels forced equal", both above β₂.
> §6's "no third mechanism excluded" is honest but incomplete: weighted sieves
> with Chen switching on the hole set are already priced and closed at
> `sift-limit-attack.md` §4.2. Mechanism 2 is dead as a route to L7 by the
> growth half's second pass; L7 stays OPEN as a statement.

*(2026-09-04, orchestrator's note, staging, HELD like every staging note. One
producer, `research/history/staging/derive-0904-L7-transfer.js`, embedded via
`qc/embed.js`, which enumerates the periods at x = 7, 11, 13 and checks §2's
CRT count and budget; every other number is quoted from the record it names. Calibration per `CLAUDE.md`.
Written while the day's four agents ran, on a target the G₂ object read listed
as legal and unasked: `object-g2-read-0829.md` §4b row L7 and §8 Q3.)*

## 0. What is open first

L7 is still open. Nothing here closes the statement `G₂(x#) ≪ g(x#)·(ln x)^A`;
what this note settles is narrower: the two ways the corpus could try to
DERIVE L7 from the one-class bound both reduce to objects already priced, and
both prices are above β₂ or dead. So L7 is not a cheap corollary waiting to be
written; it is the κ = 2 positivity problem wearing one-class clothing. That
is DERIVED for the two mechanisms named and for no other; a third mechanism,
if one exists, is not excluded by anything here.

The truth-side reading is unchanged: three independent routes say the second
class costs one logarithm (`G2-STATE.md` §3d, MEASURED and INFERRED), which is
the conjectural A = 1. Truth-side evidence is not a mechanism.

## 1. The statement and why it is legal

`g(x#)` is the one-class Jacobsthal function of the primorial, `g(x#) ≪ x²`
by Iwaniec 1978 with an inexplicit constant (`covering-dive.md`, entry point 2;
Vaughan 1977 has `x^{2+ε}`). `G₂(x#) ≥ g(x#)` pointwise is PROVEN and one
line (twin slots are a subset of the holes). L7 asks for the reverse
comparison up to a fixed power of `ln x`. If it held, `G₂ ≪ x² ln^A x`, which
is exponent 2 + o(1): below the proven 4.26645, above the TPC line at
exponent 2 with constant below 1 (`ZONE-POSTULATE.md` §2, the tile form
`G₂ < x′² − 2`), so verdict (i) on the wrong-direction audit's scheme, as the
object read records. No `Q-` id posed it before today; `REFUTED.md` closes no
row of that name.

## 2. Mechanism 1: the union bound over the second class, vacuous in the period average from x = 11 [DERIVED, exact arithmetic]

The natural transfer: in a window of length `H`, the one-class bound gives
holes; a hole `h` fails to be a twin slot only if `h + 2` is not a hole, i.e.
only if `h ≡ −2 (mod p)` for some prime `3 ≤ p ≤ x` (the class `2` never
kills, since every hole is odd and so is `h + 2`; this is Fact B's class pair
`{0, −2}`, `G2-STATE.md` §4a). Bound the failures by the union over `p`.

Over the full period `W = x#` the count is exact by the Chinese remainder
theorem: the holes are the residues coprime to `W`, and those in the class
`−2 (mod p)` number `φ(W)/(p − 1)`, because `−2 ≢ 0 (mod p)` for odd `p`
leaves `p − 1` admissible classes at `p` and the other primes are unaffected.
So the union bound's budget, as a fraction of the holes, is

    B(x) = Σ_{3 ≤ p ≤ x} 1/(p − 1).

Exactly: `B(7) = 1/2 + 1/4 + 1/6 = 0.9167`, `B(11) = 0.9167 + 1/10 = 1.0167`,
`B(13) = 1.1000`. The budget passes 1 at `x = 11`. From there the union bound
certifies nothing in the period average, and a bound that is vacuous on
average over positions cannot be non-vacuous at every position. The corpus's
covering economy reaches the same wall in its own accounting, `Σ 2/p` crossing
1 at `x = 13` with `β_pure` diverging like `7.182 lnln x`
(`REFUTED.md`, the covering-economy row; `sift-limit-attack.md` §7). The
divergence is the point: `B(x) ~ lnln x`, so the failure is not a constant
that a better window would recover; the crude transfer loses a factor that
grows.

Inclusion–exclusion over the same classes is not a repair. Written out, it is
the dimension-2 sieve on the pair `(h, h + 2)`, which is the theorem the
programme already has at `β₂`.

## 3. Mechanism 2: the one-class sieve run on the set of holes is the vector sieve, and its price is on record [DERIVED, prices quoted]

The second way to read L7: fix the holes `h` of a window as a set `A`, and
sieve the shifted set `A + 2` by one class per prime. That is a κ = 1 sieve on
a set whose distribution in residue classes is not that of the integers: its
divisor counts `|(A + 2)_d|` are counts of holes in the class `−2 (mod d)`,
which is a two-class-type count, and their remainders are the tile's own
discrepancies at modulus `d`, not the `|r_d| ≤ 1` of an interval of integers.
So the one-class sieve on `A + 2` has a level of distribution set by the
two-class remainder, and the linear sieve's positivity at `u > 2` is then
paid twice, once per class. This is exactly the Brüdern–Fouvry vector-sieve
decomposition of the two-class condition into two coupled linear sieves, which
`sift-limit-attack.md` §7b prices against the source: joint positivity at
`1 + √e = 2.6487` per component, coupled component levels `D₁D₂ ≤ H`
unconditionally, landing at `2(1 + √e) = 5.2974`, above `β₂`. Its two
side-condition re-splits are CLOSED (`REFUTED.md`, the two Brüdern–Fouvry
rows). Decoupling the levels needs signed cancellation of the bilinear
interval remainder uniformly in window position, the sup-over-positions law;
that family (REC, RML(α)) was ruled a truth gap on 2026-08-30 at rung
derived-and-red-teamed-once (`REFUTED.md`, the ρ maximal law row), and a
second adversarial pass on its growth half is running today
(`redteam-0904-floor-growth-2.md`, HELD). If that pass breaks the growth half,
mechanism 2 reopens as a proof gap at the decoupled price `1 + √e ≈ 2.649`,
still above 2 and hence still legal; if it survives, mechanism 2 is dead as a
route to L7.

## 4. What is left of L7, and what it is not

- **L7 as a statement**: legal (i), OPEN, no mechanism in the corpus. Not a
  corollary of the one-class theorem by either transfer.
- **What a proof would have to be**: an argument that keeps the class
  positions or the pair structure through the first discard point, which is
  the same requirement `object-g2-read-0829.md` §4a states for any exponent
  below `β₂`. L7 does not evade killer 1; it restates it with a smaller ask.
- **What L7 is not**: not TPC-strength (exponent 2 + o(1) with an inexplicit
  constant says nothing about `G₂ < x′² − 2`), and not novel to pose: the
  one-class analogue of the sharp question is Erdős's problem on
  `Y(x) = o(x²)` (`covering-dive.md`, entry Q1), open with a bounty.

## 5. What this note contradicts in the live layer

Nothing. `object-g2-read-0829.md` §4b row L7 says "not asked"; after this
note it is asked and PARTIAL, which is the `Q-` id above. `TODO.md` item 0's
`Ledger:` line needs the id added (orchestrator, at integration).

## 6. What would falsify this note, and whether that check ran

- A transfer argument that is neither the union bound nor a sieve on the hole
  set. None is known to this note; not searched in the literature beyond the
  corpus's own `recon-0828-jacobsthal.md` and `covering-dive.md`, which report
  no published two-class upper bound at any exponent. Not run.
- An error in the CRT count `φ(W)/(p − 1)`: RAN, the producer's OUTPUT block.
  Every per-prime count is EQUAL to `φ(W)/(p − 1)` at x = 7, 11, 13, and the
  budget reads 0.9167, 1.0167, 1.1000, passing 1 at x = 11 (VERIFIED). The
  same block prints the exact fraction of holes that are not twin slots
  (0.6875, 0.7188, 0.7422), so the bound exceeds its own target from x = 11.
- The vector-sieve price `5.2974` or the side-condition closures being wrong:
  those are the records' claims, quoted, not re-derived here.
