# The 2026-08-27 drafted corrections, applied where their argument holds

<!-- ledger
id: Q-applied-0828-queue0827
status: ANSWERED
todo: none
question: Were the 2026-08-27 drafted corrections applied?
verdict: Eighteen edit entries applied across six files, the Wu band-label inference and the saturation claim being the load-bearing ones; six proposals declined, two on ownership, one because the brief forbids promoting its note, one as already carried in paraphrase, one on an unverified inferred theta-law, and one because two scratchpad notes disagree on the number.
-->

*(2026-08-28. Staging note; a process record of an edit pass, not a result. Sources:
`lit-wu2004.md`, `lit-evans.md` §5, `lit-tao-parity.md` §4, `import-boolean-analysis.md` §7,
`u2-engine-depth.md` §5, `import-rough-anatomy.md` §§0, 2, 8.3. No producer was written,
`research/qc.js` was not run, no git command was run, and no number in any embedded
producer changed. Nothing here opens or closes a route.)*

## 1. What was applied

| file | section | old reading | new reading |
|---|---|---|---|
| `attack-lichtman-decomp.md` | §3.1 chronology, 2004 row | `θ = 4/7` + switching, **saturated** | `θ = 4/7` + switching; the standing record at that level |
| `attack-lichtman-decomp.md` | §4.2 heading | Row 5 is a tabulated function and 2004 saturated it | Row 5 is a tabulated function and its published values are lower bounds |
| `attack-lichtman-decomp.md` | §4.2 table header | `H_θ(2)` | `H_θ(t)`, `t ∈ [2.0, 2.1]` |
| `attack-lichtman-decomp.md` | §4.2 body | the printed "(2.1)" is the band label, not the argument, so Wu's constant is exactly `(2/θ)(1 − H_θ(2))` | `2.1` is the argument in both sources; Wu p. 32 prints `H(2.1) ⩾ 0.0287118` and Lichtman's band `2.0 ⩽ t ⩽ 2.1` carries that value, so `0.0280509` belongs to the next band and excludes `t = 2.1`; the constant is `(2/θ)(1 − H_θ(2.1))` |
| `attack-lichtman-decomp.md` | §4.2 credits table, last row | `H_{4/7}(2) = 2.87118%`, **saturated** | `H_{4/7}(2.1) ⩾ 2.87118%`, a lower bound, not a ceiling |
| `attack-lichtman-decomp.md` | §4.2 closing paragraph | eighteen years converging onto the value of one named function, which 2004 attains to five decimals | the credit equals the lower bound by construction, since the constant *is* `(2/θ)(1 − H)`; the bound comes from a discretisation of a functional inequality with no known closed form, so the value may be larger; what 2004 saturates is the chronology of published constants at `θ = 4/7` |
| `attack-lichtman-decomp.md` | §6.3, §9, falsifier table, Summary | permeability 2.87% attained by Wu 2004; Wu 2004 the single highest-value unread item; `(1 − H_θ(2))` | best published permeability, a lower bound with no upper bound known at any level; the arXiv deposit read at page level 2026-08-27 with the published Acta Arith. text still unreached, and `θ → 1` open and unaddressed in the source rather than decided in the recurrence; `(1 − H_θ(2.1))` |
| `quadpoint-prior-art.md` | §2.3, third bullet | Evans is the nearest rigorous test of the product form, in the sub-case `u < 3`, not read at page level | Evans is read and is not a test of the hypothesis; her smaller prime factor is `X^{o(1)}`, so her regime is `u → ∞`, the opposite corner, and the "sub-case `u < 3`" reading is wrong |
| `quadpoint-prior-art.md` | §6, proposed PRIOR-ART item 3 | nearest rigorous test of the product-plus-singular-series form | read at page level, journal version named, nearest proven instance of the form and not a test of the depth law, with the three things it is worth |
| `quadpoint-prior-art.md` | §8, bullet 2 | Evans not read; the single highest-value unread item, read before further depth-law work | closed 2026-08-27 with the sha256 and pages; the form is proven and cannot become a test, `h` averaged and `p₁ = X^{o(1)}`, no secondary term since `η` is never bounded below |
| `quadpoint-identity-01.md` | §3 | exponent `1/(2e^γ) = 0.28073`, stated as the law's constant; κ introduced without its literature name | the exponent is the `u → ∞` form; the exact condition is `ω(ln h/ln y) < ∏_{y<p≤Q}(1 − 1/p)`, asymptotically `u·ω(u) < 2`, so the asymptote is `1/u* = 0.280438`, scratchpad-grade in two notes with no embedded producer; κ named as `𝔖(2) = 2Π₂ = (45/32)·κ = 1.320324` against `κ = 0.938897` |
| `quadpoint-identity-01.md` | §3 measured paragraph, §6 first bullet | the finite-size drift has no model | the drift has a zero-parameter account at scratchpad grade in two notes and no embedded producer, so it is an explanation and not a fact; it is probably not a classical `1/log` secondary term, on two unstable fits and de Bruijn's refuted `μ_y`; the asymptote is `1/u*`; the two notes' forward forecasts disagree at the first anchor |
| `attack-obstruction-audit.md` | §2.1 | the primality-detection step means M is not closed under the reduction, so the transfer fails | the primality-detection step is not an escape the source names, since Tao's escape enlarges the sieve's input rather than appending a deduction; the reason that survives is that "forbidden" is extensional, which exempts the bare congruence-defined tile statement and does not exempt the zone form |
| `attack-obstruction-audit.md` | §6, the 403 bullet | the post returned 403 and was not read; treat the check as open; the largest hole in this note | the post is read at source 2026-08-27; the two reported sentences are accurate and the check closes only halfway, live for the tile statement and dead for the zone statement, with §3(a) carrying the weight |
| `paper/wall-note.md` | §2, head | no sentence on whether the obstruction can be stated about a finite periodic object | the obstruction is a test on a property's extension; congruence-defined properties forbid no sign pattern, so the bare tile statement is not named by it, while the zone form's extension is the twin-prime set and is obstructed in full; the mechanism is asymptotic, so no computed level is evidence either way |
| `paper/wall-note.md` | §2 Face 1, after the floor paragraph | the three 2s of the programme are not separated | parity factor 2 (Selberg, dimension 1, whole range, with 8 operative here), sifting depth `u = 2`, sieve dimension `κ = 2` carrying `β₂` as Face 4's coordinate; none implies the others and Friedlander-Iwaniec's asymptotic sieve is stated at `κ = 1` |
| `paper/wall-note.md` | §2 Face 1, infinitely-often statement | unchanged claim, no pricing | one sentence appended with Tao's own 2007 reply pricing such a sieve as a very unusual species of comparable difficulty to the problem itself |
| `research/bv-import-survey.md` | the rotation-averaging paragraph | the rotation ensemble has exactly W members by CRT, and the exact mean and variance give the almost-all statement | which ensemble the moments belong to is load-bearing; they are the deep ensemble's, period `∏_{p≤y}p`, and only that one is a product measure; the W-member phase set is a diagonal inside it, measured variance 1.36× at @11 and 6.87× at @13 with the anchored z changing sign at @13, scratchpad-grade and awaiting a second reader |

## 2. What was declined, and why

- **`lit-evans.md` §5.6**, a new `SEARCH-CONVENTIONS.md` §5 residual on uncalibrated
  citing-graph channels. Declined: that file is outside this pass's fence and is owned
  elsewhere. The proposal stands where it is drafted.
- **`lit-wu2004.md` §4.2**, re-anchoring `attack-lichtman-decomp.md` §6.1's third tier
  in `1/θ` rather than `θ` (`H_1(2) ≈ 0.0477`, floor ≈ 1.905 against 0.0666 and 1.867).
  Declined for this pass: it is a different proposal from the queued one, the number is
  unchanged to two significant figures by the drafting note's own statement, and it rests
  on an inferred θ-law (`m(θ) = (1/2)/θ`) the note marks as its own inference from two
  fractions and did not verify inside Wu's Lemma 5.1. The tier row's calibration language
  already says two data points and a 6× extrapolation, so nothing in the file overstates.
- **`import-rough-anatomy.md` §8.3's addition to `paper/wall-note.md` Face 4**, Ford's
  verbatim "the exact value of β(κ) is unknown in all cases κ > 1/2 except for κ = 1".
  Declined: Face 4 already carries that statement in paraphrase with the same citation,
  and the 2026-08-28 barrier paragraph now sits immediately after it. The addition is a
  strengthening of wording only and the section was edited by another pass today.
- **`import-rough-anatomy.md` §8.3's forecast pair for `quadpoint-identity-01.md` §3**
  (`y* = 313` and `617` at `Q = 31607` and `100003`). Declined as a stated replacement,
  recorded as a disagreement instead: `u2-engine-depth.md` §5 gives `317` and `617` for
  the same comparator at the same anchors. Two scratchpad-grade notes disagree at the
  first anchor by one active prime, so neither pair may be sealed in a prereg until one
  embedded producer settles it. The §6 bullet now says exactly that.
- **`TODO.md` item 8** (`u2-engine-depth.md` §6's proposed text). Not edited; another
  agent owns that file.
- **`paper/anchored-note.md` §3 Proposition 1(i)** (`import-boolean-analysis.md` §7's
  replacement text). Declined: the brief for this pass forbids promoting that note, and
  §1 of `anchored-note.md` already distinguishes the W-member strike-statistics ensemble
  from the deep window-count ensemble in its own words, so the file does not assert the
  product-measure reading. The one live document that ran the two together was
  `bv-import-survey.md`, and that sentence is softened above.

## 3. The item-1 sweep of the live layer, recorded because an absence is worth its record

`permeability`, `0.0287`, `Wu 2004`, `Wu [2004` and `saturat` were grepped across
`research/*.md` and `paper/*.md`. **No live document repeats the saturation claim.**
`permeability` occurs nowhere outside staging. `natal-cap-10-sieve-cap.md` §5 item 4
quotes Wu's own proof line `π₂(x) ⩽ 3.5(1 − 0.0287117)Π(x) ⩽ 3.39951 Π(x)`, which is
correct as printed and carries no claim about the function's value;
`sift-limit-attack.md` names Wu 2004 only in a source list. Nothing in the live layer
needed the item-1 edit.

## 4. What this pass did not do

- No embedded producer was written or run, so every number this pass moved into a
  document carries the grade its source note carries: `1/u* = 0.280438`, the six-band
  agreement, the 1.36× and 6.87× variance ratios and the 313/317 forecasts are all
  scratchpad-grade and may not be quoted outside the notes named beside them.
- The drafting notes are HELD and none has been red-teamed. This pass checked each
  argument on its own terms and against the target's current text; it did not re-derive
  any measurement.
- `research/qc.js` was not run and no ledger or generated file was touched, so
  `research/QUESTIONS.md` does not yet carry this note's block.
- The title of `quadpoint-identity-01.md` still names `y* = h^{1/(2e^γ)}` as the
  zero-parameter candidate. That reading is accurate as a description of the candidate
  and the title is the string `QUESTIONS.md` indexes, so it is left alone; §3 and §6
  carry the corrected asymptote.

## 5. CHANGELOG entry text, for the primary agent to append

> **2026-08-28 — the 2026-08-27 drafted corrections applied.** Eighteen edit entries
> across six files, from six HELD notes drafted the previous day and never applied. The load-bearing
> one is Wu's savings function: `attack-lichtman-decomp.md` §4.2 had inferred that the
> printed "(2.1)" was a band label and the intended argument `2.0`, and had read the
> resulting agreement as 2004 saturating the function. Wu's own p. 32 prints
> `H(2.1) ⩾ 0.0287118` at argument 2.1, Lichtman's band `2.0 ⩽ t ⩽ 2.1` carries that
> value, and the disconfirming arithmetic used the neighbouring band; the value is a
> numerical lower bound from a discretisation, so "2004 saturated parity permeability"
> is unsupported and is replaced throughout that note by "the standing record at
> `θ = 4/7`, a lower bound with no upper bound known at any level". No live document
> repeated the claim. `quadpoint-prior-art.md` closes its Evans item, corrects its
> §2.3 "sub-case `u < 3`" and rewords its proposed PRIOR-ART row.
> `quadpoint-identity-01.md` §3 gains the corrected asymptote `1/u* = 0.280438` in place
> of `1/(2e^γ) = 0.280730`, κ's name in the literature's notation, and a §6 bullet stating
> the finite-size drift as explained at scratchpad grade in two notes rather than as a
> fact; the two notes' forward forecasts disagree at the first anchor (313 against 317)
> and neither may be sealed. `attack-obstruction-audit.md` §2.1's exemption argument is
> corrected: the primality-detection step is not an escape Tao names, and the reason that
> survives at source is extensionality, which exempts the bare tile statement and not the
> zone form; §6's 403 hole is closed as read-at-source and half-answered.
> `paper/wall-note.md` gains the finite-periodic address at the head of §2, a paragraph
> separating the three 2s in Face 1, and Tao's own pricing of the infinitely-often
> weakening. `research/bv-import-survey.md`'s rotation-averaging paragraph is softened:
> the moments are the deep ensemble's product measure, the W-member phase set is a
> diagonal inside it whose measured variance is 1.36× at @11 and 6.87× at @13. Six
> proposals declined: two on ownership, one because the brief forbids promoting its
> note, one already carried in paraphrase, one on an unverified inferred theta-law, and
> one because two scratchpad notes disagree on the number. No exponent, constant or route status moved, and no embedded producer ran.
> Record: `history/staging/applied-0828-queue0827.md`.

---

*History layer: process record, staging. See `research/history/CHANGELOG.md` for the
corpus rule.*
