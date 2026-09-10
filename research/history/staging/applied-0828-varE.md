# The Var/E red team's corrections applied: forty-two edits across four HELD notes, one step count corrected to two, the 0.611 refutation extended to both halves of its protocol, and seven live-doc sentences left at the door

<!-- ledger
id: Q-applied-0828-varE
status: ANSWERED
todo: 9
question: Were the Var/E red team's corrections applied to the four HELD notes?
verdict: Every WEAKENED and REFUTED verdict in redteam-0828-varE.md is applied to its target note in the present tense; four ledger verdicts are rewritten, the theta=1 row is raised to PROVEN, and seven live-doc sentences plus one producer reading stay open and are drafted here.
-->

*(2026-08-28. Staging note; process record, nothing measured here. Applies
`research/history/staging/redteam-0828-varE.md` to the four notes it audited:
`varE-spectral.md`, `varE-asymptotic.md`, `varE-theta2-step.md` and
`lit-dickman-variance.md`, all in `research/history/staging/`. No script was
run, no producer was touched, no live document was touched, and no git command
was run. Every number below is the red team's, cited and not recomputed, per
the standing compute rule. All four notes remain HELD.)*

## 1. varE-spectral.md

| section | old reading | new reading |
|---|---|---|
| H1 | "one unproven step" | "two unproven steps" |
| ledger `verdict:` | "one named unproven step (the theta=2 mean-coefficient replacement); the published 0.611 is refuted as an inference; HELD pending an adversarial pass" | the constant confirmed to 2.9e-11 by three routes; TWO open steps, the theta=2 replacement and the model's own limit theorem whose `n <= L` band is unevaluated; the theta=1 branch an exact identity with Gorodetsky's (1.5)/(1.6); 0.611 refuted on both the in-sample and the frozen out-of-sample protocol; HELD pending the two steps |
| §0 opener | "One step is unproven, and it is the whole gap" | the red team's §8 sentence: two steps, the replacement and the limit theorem, the second needing the convergence of `ln n/ln y` to GD(2) (routine, unwritten) and the `n <= L` band to vanish (stated `O(1/ln W)` in §4, not evaluated) |
| §0 second paragraph | "**A second gap.**" | "**And no computed level reaches the constant.**", pointed at the second step rather than counted as a third |
| §0 third bullet | "PROVEN given the one step" | "PROVEN given the decoupling step" |
| §0 MEASURED bullet | "to $\le 0.0022$ for $x \ge 13$ ... the seven residuals average +0.0009, about 3 sigma of the pooled MC noise" | to $\le 0.0029$; the §6a model column named as Monte Carlo, the exact-column residuals +0.00291, +0.00130, +0.00050, +0.00063 at $x = 13..23$, and the $x \ge 29$ residuals placed at the measured column's quantisation floor |
| §0 REFUTED bullet | the control's 0.6151 / 0.4463, in-sample only | the exact column's 0.6164 / 0.4468, plus the frozen out-of-sample half the note's own control does not run: $-0.00039$ against $+0.00276$ at $x = 37$ |
| §2 heading | "The one unproven step, named and priced" | "The decoupling step, named and priced" |
| §5, before "Convergence, checked" | nothing | a new paragraph naming the passage to `Pr[GD(2) > u]` as the second open step, with both asserted arrows written out |
| §7 preamble and table | the PART 6b Monte-Carlo column at $N = 4\times10^5$, five-column table | the exact/`N = 2e7` column, with `\|c\|_1` and the a-priori gap bound as two further columns; the note's own MC column retained as inside its own noise |
| §7 | no frozen-forecast control | the red team's frozen table (fit $x = 13..31$, forecast $x = 37$) on model and data, with the model's own $0.395567 \pm 0.000106$ |
| §7 reading 1 | intercept misses by +0.160 | +0.161 |
| §7 reading 2 | "within 0.007" | "within 0.009" |
| §7 reading 3 | "Bias-corrected, the seven forms agree", spread 0.0063 | the agreement is mostly forced: spread 0.0075 in [0.4471, 0.4546], bounded a priori by $\|c\|_1 \cdot \max\|{\rm data}-{\rm model}\| $ running 0.0059 to 0.0286, every gap inside it, so it is not a check that could have failed |
| §8 item-9 paragraph | "§2's step is open, and closing it is now the single statement item 9 needs" | both §2's replacement and §5's limit theorem are open, and item 9 needs both |
| §8 $x = 41$ | $0.40184 \pm 0.00075$, "sits at the bottom edge of the registered band" | $0.402364 \pm 0.000075$ (MC, $N = 2\times10^7$, two seeds), inside the band and near its middle; the fifth forecast reads 0.40236 |
| §9 first bullet | "published and proven ... the strongest external evidence" | an exact identity: $n = 2n'$ turns the decoupled sum into (1.5)/(1.6) term by term, checked at three $(y,H)$ to relative 1.7e-16, with Lemma 1.5 making the primorial window his own case and Theorem 1.3(1) applying on the diagonal; the value to $\theta = 2$ stated as limited |
| §9 second bullet | "**the Gorodetsky paper was not read here**, only quoted at second hand" | the paper is read at source, $\kappa = 1$ only with the eight greps; the successor question still NOT CHECKED with four channels owed; Aryan named as the nearest neighbour found |
| §10 first bullet | "returns 0.6151 on a control ... should be reversed, not just softened, if the model survives" | returns 0.6164, and the frozen separation is reproduced with the wrong limit; reversed, not softened; the replacement sentence pointed at §5 below |
| §10 third bullet | "now has a candidate reason; the row needs updating either way" | the reason is on both halves, and the sibling carries it |
| §11 limit row | HEURISTIC | HEURISTIC, two open steps named; the "0.054 short" figure corrected to 0.053 here and in §5's convergence paragraph, against the new $x = 41$ value |
| §11 $\lambda_1$ row | MEASURED, "the paper was NOT read; the identification is second-hand" | PROVEN, exact identity, three pairs to 1.7e-16, paper read at source |
| §11 fit-comparison row | in-sample control only | both halves, with the frozen residual |
| §11 $x = 41$ row | 0.40184 | 0.402364 |
| §11 closing line | "one named open step" | "two open steps", on both halves of the protocol |

Untouched, as graded CONFIRMED: §1's CRT twist and its 2.9e-7 agreement, §2's
mean-versus-maximum accounting of the missing log, §3's decoupled expectation
and $\pi_p$, §4's three conductor groups, §5's closed form and tail table, §6b
and §6c, and §10's fourth bullet on `natal-cap-29-sigma-plateau.js`.

## 2. varE-asymptotic.md

| section | old reading | new reading |
|---|---|---|
| ledger `verdict:` | "the fitted intercept is unpinned in [0.46, 0.72]" | that, plus 0.611 refuted as an inference on both halves of its protocol and the bias-corrected intercepts clustering in [0.4471, 0.4546] |
| §1 | "$y$ the largest prime $\le \sqrt{L}$, so $u = \ln L/\ln y = 2$" | the red team's §2 sentence: $u = 2$ in the limit, and 2.0847, 2.0116, then 2.000x from $x = 13$, at the computed levels; the load stated as small because everything is evaluated at the true $L$ and $y$ |
| §1 | the $X$ column presented without a precision statement | four figures and no more (15.08 against 15.073187, 51.40 against 51.400255), because it is divided out of a four-decimal Var/E column |
| §0 CALIBRATION bullet | "rests on a two-way comparison that a wider family does not respect" | that, and then REFUTED as an inference rather than merely widened, with the control's 0.6164 and the factor-7 frozen win |
| §5 second reading | "the frozen forecast that §7 rightly treats as the stronger test" | "treats as the stronger test", followed by the control's frozen residuals $-0.00039$ against $+0.00276$ and the finding that this half carries no information about the limit either |
| §8 intercept row | "NO. No such reason is offered here, and none is known" | YES, on both halves: `varE-spectral` §7 in-sample and the red team's §4 frozen |
| §8 closing | intercept unpinned across [0.46, 0.72] | that, plus the bias-corrected cluster [0.4471, 0.4546], flagged as a consistency check on the model and not a measurement |

Untouched, as graded CONFIRMED: $\mathrm{Var}/\mathbb{E} = \delta X$ and its
five-level rebuild, $\kappa = 1.109905424$ and the nine-level column, the
prime-by-prime main term, Fact A/B/C, the six-versus-eight-point fit defect and
every published coefficient in §5, and §6's four requirements.

## 3. varE-theta2-step.md

| section | old reading | new reading |
|---|---|---|
| ledger `verdict:` | "delta(X - X_dec) ln y bounded, so the error is O(1/ln y) MEASURED" | falling rather than settling, so `O(1/ln y)` or better on four levels that exclude growth and nothing finer, with varE-spectral's second step still open |
| header line | "`varE-spectral.md` §2, the one named unproven step in that note" | one of the two open steps, the other being that note's §5 limit theorem |
| §0 fifth bullet | "bounded on every level computed ... Six levels is six levels" | bounded and falling; the evidence is for `O(1/ln y)` or better, and four levels exclude growth and nothing finer |
| §3 | "inheriting `varE-spectral` §5's own unproven limit theorem" | the same, with that theorem named as that note's second open step |
| §5 reading | order not constant, full stop | the same, plus the red team's §6 point that 0.01498, 0.00832, 0.00404, 0.00459 falls rather than settles, so growth is the only excluded failure mode |
| §6 first bullet | exact residuals "+0.00291, +0.00127, +0.00050, +0.00048: all positive and falling"; "the x = 41 forecast 0.40184 +- 0.00075" | "all positive" (the sequence is not falling on the red team's rebuild); the independent rebuild +0.00291, +0.00130, +0.00050, +0.00063; the last-digit differences attributed to the measured column's +-5e-5 quantisation, comparable to the $x \ge 29$ residuals, so the top three levels are at the floor and are not signal; $x = 41$ at 0.402364 +- 0.000075 |
| §8 error row | "O(1/ln y) ... PARTLY. Bounded on x = 7..23" | "O(1/ln y) or better ... Falling on x = 13..23, so these levels exclude growth and nothing finer" |

Untouched, as graded CONFIRMED: the real-space restatement, `V(h)`'s closed
form, the `3^omega` split and the `c = 0` group, `(p-1)(p-4)+2 = (p-2)(p-3)`,
every figure in §4's and §5's tables (matched to the last printed digit by an
independent implementation), and §7's literature placement.

## 4. lit-dickman-variance.md

| section | old reading | new reading |
|---|---|---|
| ledger `verdict:` | "Aryan 2015 Lemma 1.2 is an upper bound with our main term" | the same, with the exponent named as the nested `P^{-2^{ks}+ks}`, and Gorodetsky's `kappa = 1` marked confirmed at source |
| §0 correction paragraph | "a factor of **2.11 to 2.86** rather than 13.9 to 22.7 ... shrinks by a factor of about 6.6" | the 2.11 to 2.86 stands; the like-for-like `λ₁` figures at the same 0.718 are 13.9 and **25.2**, and `import-rough-anatomy.md` §0.6's 22.7 is a six-band maximum on a different band, so it is not the second comparand; shrinkage 6.6 to 8.8 |
| §2 first bullet | the object quoted with absolute-value bars, silently | the paper's bracket carries no bars, which is the same object at the even `k` used here |
| §2 second bullet | `M_k^D(q,h) ≪ q h^{k/2} P^{−2ks+ks}` | `P^{−2^{ks}+ks}`, the exponent nested, read on a rendered page image of page 5 |
| §5 | the two band values tagged `[SCRATCHPAD-GRADE]` with no second witness | both reproduce in the red team's re-derivation, so they carry a second witness; the tag stays until they are produced inside an embedded producer |
| §6.3 (drafted IMPORT-MAP row, still NOT APPLIED) | "2.11 to 2.86 rather than 13.9 to 22.7 ... shrinks by 6.6×" | the 13.9/25.2 pairing and the 6.6 to 8.8 shrinkage, with §0.6's 22.7 excluded as the comparand |
| §9 `λ₂`-values row | "NO. The delay-equation integration is an unembedded scratchpad script" | PARTLY: the red team reproduces both; this note's own integration is still unembedded |

Untouched, as graded CONFIRMED at source: Gorodetsky's scope, (1.5), (1.6),
Theorems 1.1 and 1.3, Lemma 1.4's general `k` with the p. 5 future-work
sentence, §1.6.1 and Lemma 1.5, the eight greps, Aryan's Remark 1.1 and his
upper-bound-only status, and §4's channel calibration table with its four owed
legs.

## 5. Left at the door: live-doc corrections, for the primary agent

Nothing below is applied. Each row carries the sentence to write.

| file | line | what is wrong now | what it should read |
|---|---|---|---|
| `paper/variance-note.md` | abstract, "the ninth level separates ... a single constant, near $0.611$" | quotes 0.611 as the constant | "the ninth level separates the two candidate drift laws by a factor of ten and reduces the open question to the value of a single constant. That separating fit does not estimate the constant: on a control sequence whose limit is known, the same protocol picks the same winner, misses the limit by $+0.16$, and reproduces the forecast separation, so $0.611$ is a property of the fit form and the range." |
| `paper/variance-note.md` | §7 "The diagonal", "so that $u = \ln L/\ln y = 2$ exactly" | false at every finite level, because $y$ is the largest prime *below* $\sqrt{W}$ | "so that $u = \ln L / \ln y = 2$ in the limit, and $2.0847$, $2.0116$, then $2.000x$ from $x = 13$ up, at the computed levels" (the red team's §8 sentence) |
| `paper/variance-note.md` | §7 closing, "The live hypothesis is $\lim \operatorname{Var}/\mathbb{E} = 0.611$ ... the $0.44$ reading ... is demoted, not excluded" | the inference is refuted on both halves of its own protocol | "So the open question of §6 is down to one constant, and this comparison does not measure it. Run on a control sequence that tracks these nine points to 0.003 and whose limit is known by construction, the same protocol returns the same winner with an intercept $0.16$ above that limit, and reproduces the frozen forecast separation as well; so the $1/\ln\ln W$ intercept $0.611$ is a property of the fit form on this range, and neither it nor the $0.44$ reading is measured here." |
| `paper/variance-note.md` | §7 "Calibration", "no finite computation can distinguish a limit of $0.611$ from a slow approach to something else" | understates it: a computation of this kind does not distinguish any two limits | "and no finite computation of this kind distinguishes one limit from another: a control with a known limit passes both halves of the same protocol while missing its own limit by $0.16$" |
| `research/GLOSSARY.md` | the Var/E entry, "≈ 0.611 is the live hypothesis, favoured 10:1 over the demoted 0.44 by a single separating point" | carries the refuted inference into the vocabulary | "its limit is Paper III's last open question and no value is measured for it: the 10:1 separating point that favoured ≈ 0.611 is reproduced by a control sequence whose limit is 0.4555, on the in-sample half and on the frozen forecast half alike, so the intercept is a property of the fit form on a lever arm where 1/lnlnW moves only 0.295 to 0.343 (paper/variance-note.md §7)" |
| `research/README.md` | row 06, "is pinned down on the comb-restricted diagonal of `paper/variance-note.md` §7, hypothesis 0.611" | "pinned down" and "hypothesis 0.611" both overstate | "is not pinned on the comb-restricted diagonal of `paper/variance-note.md` §7 either: the fit that favoured 0.611 is reproduced by a control with a known, different limit, so no value is measured" |
| `TODO.md` | item 9, "**Var/E limit ≈ 0.61 analytically** (lnlnW favored 10:1; intercept 0.6106 stable ...). Candidate closed forms against 0.6106 and all nine exact points." | briefs the item at a refuted number | "**9. Var/E limit analytically.** 0.611 is refuted as an inference: the lnlnW 10:1 win and its frozen forecast are both reproduced by a control whose limit is 0.4555 (variance-note §§6–7; ninth point single-witness, a second 5.25 h run is worth it). The live candidate is HEURISTIC, λ₂(2) = 1 − e^{−2γ}(9/2 − 4ln2) = 0.45546, with TWO open steps: the θ = 2 mean-coefficient replacement and the model's own limit theorem. Every note carrying it is HELD. Candidate closed forms against all nine exact points." |
| `research/IMPORT-MAP.md` | row 15's landed status ("his `λ(s)` is 12–23× below the measured `χ²/df`") | the amendment drafted for it in `lit-dickman-variance.md` §6.3 is itself corrected in §4 above | apply §6.3 as corrected: the comparand is `λ₂`, the factor is 2.11 to 2.86 against like-for-like `λ₁` figures 13.9 and 25.2, §0.6's 22.7 is a six-band maximum on another band, the shrinkage is 6.6 to 8.8, and the `λ₂` values are `[SCRATCHPAD-GRADE]` |
| `research/QUESTIONS.md` | generated | carries the four old `Q-varE-limit` verdicts and this note's title is absent | regenerate from the blocks (`node research/qc.js --index`); it is generated, so it takes no hand edit |

TODO item 9 already carries `Ledger: Q-varE-limit, Q-redteam-0828-varE`, and
this note shares the second of those ids, so the gate needs no new line for it.

## 6. Producer defects, not fixed here

- `varE-spectral.js` reading 7 states the bias-corrected agreement as evidence.
  It is bounded a priori by `\|c\|_1` times the pointwise model-data gap, so it
  restates pointwise tracking. The note's own §7 reading 3 now says so; the
  producer's reading does not, and it is the one that would get quoted. The
  fence here is prose-only, so the file is untouched.
- `varE-spectral.js`'s header says its `PTS` `X` values are read from
  `variance-note.md` §7. §7 has no `X` column; they come from
  `varE-asymptotic.md`. Provenance nit, recorded by the red team's §5, not
  fixed.
- `varE-spectral.js`'s model column is Monte Carlo at `N = 4e5` throughout. The
  exact column exists in `varE-theta2-step.js` at `x <= 23`. No producer was
  merged.

## 7. NOT DONE, and one deviation

- No script was run, no number was recomputed, and `node research/qc.js` was
  not run, so the gate's verdict after these edits is unknown.
- The four notes stay HELD. The red team's own release recommendation is its
  to make and the primary agent's to act on.
- **Deviation from the brief.** The brief places the new frozen out-of-sample
  control result at `redteam-0828-varE.md` §7. It is in that note's §4; §7 is
  the literature pass. The citations written into `varE-spectral.md` §0 and §7
  and into `varE-asymptotic.md` §0 and §5 therefore read §4.
- The red team's two explicit non-actions carry through unchanged: it did not
  attempt the decoupling proof, and it did not search for a published
  `lambda_k` at `k >= 2` beyond the two papers named. `varE-spectral.md` §11's
  "do not call it new before that search" stands.
- The `[SCRATCHPAD-GRADE]` tag on `lit-dickman-variance.md` §5's two band
  values is left in place. The red team reproduces both, but whether its own
  embedded producer prints them is not established from its text, and the tag's
  condition is production inside an embedded producer.

---

*Process record, staging. No producer: nothing here is measured. Cited, never
recomputed: every figure in `redteam-0828-varE.md`. See
`research/history/CHANGELOG.md` for the corpus rule.*
