# The destruction-onset instrument: Chris's q^2 staircase verified over 1..10000, the three onsets collapse to two, the A/B split is a theorem plus a prime density, and the onset lens closes the FOURTH mechanism family at x = 37

<!-- ledger
id: Q-natal-onset
status: ANSWERED
todo: none
question: Does Chris's q^2 destruction-onset staircase hold, and does the onset lens open a mechanism at x = 37?
verdict: The staircase is VERIFIED over 1..10000 after aborting-on-mismatch against his three hand anchors, the three onsets collapse to two and the naive 50:50 A/B split is refuted by derivation; the x = 37 fourth lens is a clean negative and the fourth mechanism family closes.
-->

*(2026-08-21. Staging note; nothing here is integrated into a live document.
Producer, formally embedded: `research/natal-onset-01.js` (0.3 s;
code-sha256 c7b13ef0…, out-sha256 b6092339…). The mathematical frame is
Chris's, hand-derived from his run of Natal@5 over the first 500 integers;
this instrument verifies it against his three hand anchors — ABORTING on any
mismatch — before printing anything, then runs positions 1..10000. The full
1..500 merged destruction timeline is bound inside the producer's OUTPUT
block for Chris to diff against his notebook. Calibration marked per claim:
PROVEN, VERIFIED by exact computation, MEASURED, REFUTED.)*

## 0. The frame, and calibration

On the integer line under the mod-30 wheel, scour prime q's FIRST FRESH KILL
is exactly q^2 (Chris's derivation: any earlier q*m has lpf(m) < q and is
already struck), so the influencer set at n is {q : q^2 <= n} — a sqrt(n)
staircase, one tread per q^2. Twin channels are the pairs (a, a+2) with
a ≡ 11, 17, 29 (mod 30) (A-side/opener classes; B-side/closer classes 13,
19, 1). A pair dies when its first member dies; the destroyer is that
member's lpf.

All three hand anchors PASS: 7's first pair-destruction is (47,49) at 49;
11's first fresh kill is 121 with (119,121) already dead at 119 via
119 = 7*17; 11's first LIVE-pair destruction is (209,211) at 209 = 11*19.
Window totals: 999 channel pairs (openers <= 9998), 796 destroyed, 203
survive — and the survivors are true twin-prime pairs (the window is
sieve-complete to sqrt(10000)), cross-checking the classical 205 twin pairs
below 10^4 minus the non-channel (3,5), (5,7).

**Prior art on disk, cited and extended, not duplicated.** The q^2 rule
tile-globally is `research/scour-into-fixed-tile.js` (effective scour on a
fixed width-W tile = primes <= sqrt(W)); the fresh-kill/self-strike
distinction and the Natal@5 scour march are `research/killrun.js` and
`research/gen-natal5-17tile-scour.js`; the Natal@5 cohort vocabulary is
`research/birth-cohorts.js`. None of them is origin-local or pair-timed;
this instrument is the origin-local dual (the scour entering tread by tread
on the integer line, destruction ONSETS and live-pair timing), which did not
exist on disk.

## 1. The three onsets collapse to two [PROVEN + VERIFIED]

q coprime to 30 has q^2 ≡ 1 or 19 (mod 30) — and both are twin-channel
CLOSER classes. So the first fresh kill ALWAYS lands in a channel, always
B-side, on the pair (q^2 - 2, q^2): **onset2 = onset1 = q^2 for every scour
prime** (one-line proof; verified for all 22 primes 7..97). The third onset
has a clean criterion: **onset3 = q^2 iff q^2 - 2 is prime** (10 of the 22
here). First rows of the bound table:

| q | onset1 = onset2 | onset3 (live pair) | lag | q^2-2 prime? |
|---|---|---|---|---|
| 7 | 49 | 49, pair (47,49), B | 0 | yes |
| 11 | 121 | 209, pair (209,211), A | 88 | no |
| 13 | 169 | 169, pair (167,169), B | 0 | yes |
| 17 | 289 | 391, pair (389,391), B | 102 | no |
| 19 | 361 | 361, pair (359,361), B | 0 | yes |
| 23 | 529 | 851, pair (851,853), A | 322 | no |
| 29 | 841 | 841, pair (839,841), B | 0 | yes |
| 31 | 961 | 1271, pair (1271,1273), A | 310 | no |

When q^2 - 2 is composite the lag runs 88 to 1162 (q = 83) with no visible
law. The producer also carries, per prime, the FULL sequence of live-pair
destructions and the inter-destruction gaps (e.g. 7: 219 destructions, gaps
concentrated on 14/28/42 with 98s and 126s at the twin-free stretches).

## 2. The A/B split: the naive 50:50 null is REFUTED BY DERIVATION

Two exact identities, each verified with zero exceptions across all 796
destructions:

- **Kill level (CRT):** q's channel kills occupy exactly 3 A-side and 3
  B-side residues per period 30q — the kill-level null is 1:1, and the
  window measures 539:543 (ratio 0.993).
- **Live level (time orientation):** an A-side fresh kill strikes the
  opener, whose partner cannot yet be dead — so EVERY A-side channel kill
  destroys a live pair. A B-side kill destroys a live pair IFF the opener is
  prime. [PROVEN, one line each; asserted in-code.]

So the live A:B ratio is not a phenomenon: it is 1 : f_q with f_q the prime
fraction among the B-killed pairs' openers. Measured aggregate A:B = 2.10;
the derived null (local prime density among openers, no destruction data
used) predicts 2.19 — 246.0 predicted B-side destructions vs 257 measured.
Nothing beyond the identity plus prime density is present at this window.

**Mirror-Sweep, origin-local shadow [VERIFIED EXACT].** The conjugation
mu(n) = (-2-n) mod 30q maps every A-strike residue class onto a B-struck
opener class (channels 11 <-> 17 swapped, 29 fixed) — exact for all 22
primes, every kill, both directions. The mirror exchanges A and B onsets at
the residue-class level, exactly as the Mirror-Sweep conjugation
(`attack-0c-holesweep.md` §4) predicts; what it cannot conjugate is time
order, and the live-level identity above IS that breaking — the
origin-local analog of "the seam side never loses".

## 3. Twin-destruction shares and the staircase quantified

By Chris's rule (destroyed pairs only; total prime kills disregarded): 7
destroys 219 pairs (27.51% of all destructions), 11 destroys 120 (15.08%),
13: 86, 17: 57, 19: 55, falling roughly like 2/q but above it for small q
(first-mover advantage against a fully live population). Newcomer
contribution per tread is small after the first: 7 owns 100.0% of its
tread's destructions, but from 11 on incumbents dominate (newcomer share
0-33.3%, mostly under 10%).

**The restriction is the staircase.** The pre-scour head [1, 49) is 100%
alive; tread survivor shares then fall 57.1% -> 40.0% -> ... -> 17.2% at
the deepest tread [9409, 10001), tracking the active-prime product
prod(1 - 2/p) with observed/predicted fluctuating 0.48-1.18 (mean below 1,
the familiar Mertens-vs-truth bias plus small-sample noise). A pair at n is
tested by exactly pi(sqrt(n)) - 3 primes and nothing more.

## 4. The x = 37 fourth lens: a CLEAN NEGATIVE — the fourth family closes

Record positions cited from `research/exact-g2-ladder.js` (least attaining
position; nothing re-enumerated). On every onset-MECHANISM coordinate the
37 record is mid-pack among {29, 31, 37, 41, 43}: fractional depth pos/x#
rank 4/5 ascending (0.0734 vs 29's 0.186, 41's 0.0124); log depth
ln pos/ln x# rank 3/5 (0.9119); distance past staircase saturation pos/x^2
rank 3/5, exactly where monotone growth puts it. Every level's record sits
a factor 10^6-10^11 beyond its own x^2, so NO record lives in the
onset-restricted head: origin-local onset structure cannot source the 37
spike.

One curiosity is recorded and discounted honestly: 37's record integer sits
just above a prime square (inter-prime-square fraction 0.0030, rank 1/5).
The coordinate is convention-dependent (the ladder's canonical LEAST of
nmax = 2 attaining positions; the other one gives a different fraction),
the look-elsewhere null across 5 levels, 2 edges and 4 inspected
coordinates is of order 10%, and no mechanism connects a prime near
sqrt(pos) ~ 7*10^5 to a tile that knows only primes <= 37.

**Verdict: the onset/origin-local mechanism family at x = 37 is CLOSED — the
fourth, after anchored/mirror, the HL comb, and the h2 side
(`attack-delta37-01.md`). The spike stays G2-side, real, and unexplained,
now four ways. The negative is the result.**

## 5. NOT REACHED

- The lag distribution onset3 - q^2 (88..1162) has no derived law here;
  its natural null (first prime opener along q's kill sequence) is
  formulated but not scored.
- The A/B derived null uses an in-window empirical prime density (window
  +-1050); a Mertens/PNT-form f_q would make the 2.19 parameter-free.
- Nothing beyond N = 10000; no second window for stability of the tread
  ratios (0.48-1.18 is small-sample).
- The other attaining position at 37 (nmax = 2) was not located to re-read
  the inter-square fraction; it would sharpen §4's discount into a direct
  refutation or a persistence.
