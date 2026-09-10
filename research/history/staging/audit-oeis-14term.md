# OEIS re-run of the G2 absence claim at fourteen terms (2026-08-18)

<!-- ledger
id: Q-oeis-g2-absence
status: ANSWERED
todo: none
question: Is the G2 ladder absent from OEIS at fourteen terms?
verdict: Falsified: the ladder has been in OEIS since 2008 in the run-length convention G2 - 1, as A144311 carrying 22 terms to our 14, with the search channel calibrated live in the same session on two known-positive probes.
-->

**FALSIFIED. The ladder is in OEIS, and has been since 2008, in the run-length
convention `G2 - 1`: A144311, carrying 22 terms to our 14.**

## Calibration (first)

| query | expected | result |
|---|---|---|
| `2,6,18,30,66,150,192,258` | A288815 | **PASS**, sole hit |
| `2,4,6,10,14,22,26,34,40,46,58,66` | A048670 | **PASS**, first hit (A395279 returns second; they split at term 24, 234 vs 236) |

Channel live. All queries: `https://oeis.org/search?q=<terms>&fmt=json`.

## Queries

| exact query string | result |
|---|---|
| `2,6,12,30,42,66,108,150,204,258,348,528,546,618` | No results |
| `42,66,108,150,204,258,348,528,546,618` | No results |
| `12,30,42,66,108,150,204,258,348,528,546,618` | No results |
| `348,528,546,618` | No results |
| `1,5,11,29,41,65,107,149,203,257,347,527,545,617` | **A144311** |

**A144311**, *"The length of the longest sequence of consecutive integers, each
equal to 1 or -1 modulo at least one of the first n primes"* (Andrew Carter, Sep
2008; `nonn,more,hard`; rev 23, 2024-12-05; no b-file):
`1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545, 617, 707, 869, 965,
1079, 1283, 1397, 1529, 1709`.

## The collision is exact

Their m is our r+1: `m == 1 (mod p)` is `p | r`, `m == -1 (mod p)` is `p | r+2`,
so m is covered exactly when `gcd(r(r+2), W) > 1` — r is not a twin slot
(`research/G2-STATE.md` §1a). Same fixed classes `{0,-2}`, no free translate.
All fourteen exact terms agree. Their terms 15-22 give **G2 = 708, 870, 966,
1080, 1284, 1398, 1530, 1710** at x = 47..79, and these satisfy G2 >= h(x#)
(A048670) and G2 <= h2(x#) (A288815) at every shared level.

Five waves missed it because A144311's text says no "Jacobsthal", "twin",
"primorial" or "gap", and neither it nor A072753/A288815 cross-references the
other. Only the `G2 - 1` string reaches it, and this is its first run.

## A288815 / A072753: unchanged

A288815 still 21 terms ending 2190, 2460, 2622; revisions #14-#19 (2026-04-12)
edited the two link lines only, DATA untouched. A072753 still 19 terms,
n = 3..21, ending 436, last touched 2017.

## Consequences

1. `covering-dive.md`:177 target 3 must retire its ABSENT tag.
2. `research/oeis-G2-submission.md` is a **duplicate** and must not be sent.
   What survives: a b-file, twin motivation and xrefs proposed for A144311.
3. The eight new terms are OEIS-asserted at `hard,more`, not replayed here.
   Recompute before any exponent fit uses them.
4. Lesson: search an absence in every convention the object admits. Off by one
   hid this for five waves.
