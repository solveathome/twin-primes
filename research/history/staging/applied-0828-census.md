# The census red team's corrections applied: thirteen edits across three HELD notes, one refuted reading demoted to descriptive, three ledger blocks added, and four live-doc corrections left at the door

<!-- ledger
id: Q-applied-0828-census
status: ANSWERED
todo: Z0, Z4, Z6 (retired)
question: Were the census red team's corrections applied to the three HELD notes?
verdict: Every WEAKENED and REFUTED verdict in redteam-0828-census.md is applied to its target note in the present tense; two producer defects and four live-doc corrections stay open and are listed here.
-->

*(2026-08-28. Staging note; process record, nothing measured here. Applies
`research/history/staging/redteam-0828-census.md` to the three notes it
audited. No script was run, no git command was run, and no producer was
touched: the fence was prose-only on
`research/history/staging/destroyer-census-01.md`,
`research/history/staging/stretch-01.md` and
`research/history/staging/records-placement-01.md`. Numbers below are the
red team's, cited and not recomputed, per the standing compute rule.)*

## 1. destroyer-census-01.md

| section | old reading | new reading |
|---|---|---|
| H1 | no ledger block | block added: `Q-destroyer-census`, ANSWERED, Z4 |
| §1 Totals | both-composite pairs attribute to the opener "because time a beats time a+2" | the red team's sentence: a POSITION rule, not a time rule, overriding fold-activation order on 49.99% of both-composite pairs and 29.79% of all destroyed pairs to 1e7, moving q = 7's share from 30.36% to 19.60%, with the fold ledger named as running the other convention |
| §1 A/B split | "every A-side fresh channel kill destroys a live pair" | "is attributed a live pair under this convention", with the clause that half the both-composite pairs had already lost the closer to a smaller prime in fold order |
| §3 The verdict | "It DIES at p = 67 ... B/C climbs toward 2" | the red team's sentence: death at p = 67 is where B/C first crosses 1 (B = 503 against C = 497, B/C = 1.0121); the LIMIT is 2 and is not the threshold; the band means stay |
| §3 The closed form | "the a-priori CRT main term ... crosses at p = 59, between the two" | the red team's sentence: stays below 1 up to p = 59 and first crosses at p = 61, which is the last certified zone; the "between the two" claim is gone |
| §6(b) | "the Mertens forward density gives 0.6007 ln^2 p; HL truth 0.7574 (their ratio is again e^{2gamma}/4)" | the red team's sentence: 0.6007 is 0.7574 times rho(2) BY CONSTRUCTION, pointed at `origin-excess.md`; "again" is gone |
| §6(b) | "measured head coefficients run 0.7064 -> 0.7344 across windows" | the red team's sentence: the five window figures listed and called non-monotone, half-decade bands spanning 0.669 to 0.753, so the figures carry range composition and are not a measured convergence to 0.7574 |
| footer | producer custody line silent on the CRT off-by-one | the producer's READINGS block is disclosed as carrying the same off-by-one (p = 59 for p = 61) and as uncorrected, its OUTPUT block being right |

Untouched, as graded CONFIRMED: the 15 certified zones and their forced
counts, the closed form and p* = 42.52, the shell partition and 438,186
frozen twins, §6(a)'s 96.65% and its band rows, §6(b)'s h/R chain, §6(c)'s
7.4% at residue 12. §2, §5 and the §6(c) pooling text were not part of the
red team's WEAKENED set and are unedited.

## 2. stretch-01.md

| section | old reading | new reading |
|---|---|---|
| H1 | no ledger block | block added: `Q-stretch-structure`, ANSWERED, Z3 |
| §2 upper neighbour | "the finite check q <= 109 (done directly here)" | the red team's sentence: "the finite check for q <= 109, which SEC B2's direct occupancy sweep to q = 9973 subsumes" |
| §3 third bullet | "Occupancy, certified six decades past the sweep" | "Occupancy, certified nearly eight decades past the 1e8 sieve" |

Declined, and why: the red team's strengthening of §4's guardrail (the kill
count is exactly two offset classes at every prime anchor q <= 2000 for
r in {7..31}, so redistribution-only holds anchor by anchor and not only in
the ensemble) is graded CONFIRMED, not WEAKENED, and adding it is a new
claim rather than a correction. It is left for whoever integrates §4.

## 3. records-placement-01.md

| section | old reading | new reading |
|---|---|---|
| H1 | "the square-blindness measurement closes its fourth decade"; no ledger block | "extends by a factor 25 into the decade above 1e16"; block added: `Q-records-placement`, ANSWERED, Z6 |
| §1 headline | "UNIFORM-CONSISTENT on all three registered readings" | the red team's sentence: uniform-consistent on the two readings that had power, with READ-3 reported as descriptive because its reachable range [0.4381, 0.5235] sits inside its own band [0.436, 0.564] |
| §1 | no statement of why READ-3 is confined | the arithmetic stated: 75 of 82 fractions fixed before the seal, summing to 35.925, each fraction in [0, 1) by construction |
| §1 | the prereg's conclusion clause not read | the clause is gated on READ-3, which cannot fail, and on READ-2, so it reduces to READ-2 alone |
| §1 conclusion | "no square-anchor coupling at any measured scale" | the red team's sentence: consistent with uniform on both readings that could have flagged, no coupling detected at heights 1.29e16 to 7.05e16 |
| §2 custody | records 76-82 single-witness; nothing on band movement; nothing on the git residual | all 82 rows match the OEIS b-files b113274 and b113275 (zero mismatches, fetched 2026-08-28), so records 76-82 carry a page-level second witness; the three bands re-derive from the prereg's own nulls and no band moved; the custody residual is stated in the 08-20 prereg's own words, unverifiable from git, mitigated, not proven |
| §4 | "the ladder tail stays single-witness under the series rule" | the tail carries a page-level second witness and is no longer single-witness; in-house verification is still paper-phase |

The custody residual is written from the primary agent's git reading (the
producer first exists in git 10m56s after seal `1bc0dd8`). This note ran no
git command and does not witness it.

## 4. Left at the door: live-doc corrections, for the primary agent

| file | line | what is wrong now | what it should read |
|---|---|---|---|
| `TODO.md` | Z6 | "scored UNIFORM-CONSISTENT on all three reads — square-blindness closes its fourth decade to 7.05e16" | scored uniform-consistent on the two reads with power, READ-3 having no failure mode; square-blindness extends by a factor 25 to 7.05e16 |
| `TODO.md` | Z6 | `Ledger: Q-redteam-0828-census` | add `Q-records-placement` |
| `TODO.md` | Z4 | `Ledger: Q-head-residual, Q-redteam-0828-census, Q-redteam-0828-head` | add `Q-destroyer-census` |
| `TODO.md` | Z3 | no `Ledger:` line at all | add `Ledger: Q-stretch-structure` |
| `research/QUESTIONS.md` | generated | carries the old records-placement title and no row for the three new ids | regenerate from the blocks (`node research/qc.js --index`); it is generated, so it takes no hand edit |

Z0 already carries `Q-redteam-0828-census`, so the gate item the red team
flagged is half-closed already; Z4 and Z6 carry it too. What the gate will
still flag until the table above is applied is the three new ids.

## 5. Two producer defects, not fixed here

- `research/destroyer-census-01.js`: the READINGS block says the CRT main
  term crosses at p = 59. It first reaches 1 at p = 61. The OUTPUT block's
  own line ("stays < 1 up to p = 59") is correct, so the defect is in the
  hand-written reading beside a correct number. Disclosed in the note's
  custody line; the file itself is outside this pass's fence.
- `research/records-placement-01.js`: nothing wrong computationally. The
  defect is upstream, in the prereg: READ-3 was registered with no failure
  mode. No producer change repairs that.

## 6. NOT DONE

- No script was run and no number was recomputed. Every figure above is the
  red team's, cited.
- `node research/qc.js` was not run, so the gate's verdict after these
  edits is unknown. The three new ids will flag until TODO gets its lines.
- The HELD status of the three notes was not changed. The red team's
  "may they leave HELD" verdicts stand as its own recommendation, and the
  release is the primary agent's call.
- `attack-bc-parity-floor.md` §5's repair of the B/C sentence, named
  unapplied on 2026-08-26, is applied here in destroyer-census-01 only.
  Whether any other note repeats the phrase was not swept.

---

*Process record, staging. No producer: nothing here is measured. Cited,
never recomputed: every figure in `redteam-0828-census.md`, and the 08-20
custody wording at `research/G2-STATE.md`. See
`research/history/CHANGELOG.md` for the corpus rule.*
