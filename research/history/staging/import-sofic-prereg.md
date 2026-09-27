# PRE-REGISTRATION — import 2 (constrained coding / symbolic dynamics), row 2 of IMPORT-MAP

<!-- ledger
id: Q-import-sofic-prereg
status: OPEN
todo: none
question: Does the constrained-coding presentation of the fold predict the exact per-fold L, and is the shift sofic?
verdict: Pre-registration only, and declared weaker than the G2(41#) case because the nine exact L values were already published in the corpus: what is fixed here is the estimator, the exclusion rule, the trend statistic and the kill thresholds, plus a soficity verdict written before the check, strictly sofic and not of finite type.
-->

*Written 2026-08-19, BEFORE any ratio was formed or any comparison script was
run. It fixes the estimator, the exclusion rule, the trend statistic and the
kill thresholds. The producers are `research/import-sofic-01-graph.js` and
`research/import-sofic-02-prediction.js`; the record is
`history/staging/import-sofic.md`.*

## 0. What this pre-registration can and cannot claim

**It is weaker than the `G₂(41#) = 546` case and it is declared as such.** The
nine exact per-fold `L` values are already published in this corpus
(`research/U-FRAME.md` §5 table, `research/a3-05-bound-L.md` §7,
`research/qc.js` section W2 for the first seven), and so is the adjacent-pair
census (`research/operator-and-pair-count.md` §11). Nothing here was hidden from
the author. What is pre-registered is therefore **the estimator, the exclusion
rule, the trend statistic and the decision thresholds**, written down before the
ratio column existed, and not blindness to the inputs. A reader should price it
at that.

## 1. The presentation being tested

The Alternation Lemma's automaton, states `Z` (`r ≡ 0 mod p`) and
`M` (`r ≡ −2 mod p`), labels the gap class `g mod p`:

    Z --0--> Z      Z --(-2)--> M      M --0--> M      M --(+2)--> Z

right-resolving (the two labels out of each state are distinct). Predicted
soficity verdict, written before the check: **strictly sofic, not of finite
type**, because the forbidden set is the infinite family `−2 0^k −2` and
`+2 0^k +2`, `k ≥ 0`. Unlabelled adjacency matrix `[[1,1],[1,1]]`, Perron root
`2`, so the predicted capacity is `ln 2` nats per symbol on a three-letter
alphabet, independent of `p`.

## 2. The three estimators, fixed here

Let `D = D(T_x) = ∏_{3≤q≤x}(q−2)` be the tile's slot count, and let the fold
prime be `p` (the next prime after `x`). A fold's run scan runs over the FULL
period, `pD` slots, not `D` (`research/import-maxplus-01-mapping.js` reading 8:
a one-copy cyclic scan reports `L = 2` at fold 11 where the truth is 1).

- **A, the graph's own first moment, uniform residues.** The graph's per-step
  continuation probability given a state is `P(g ≡ 0) + P(g ≡ the one legal
  ±2) = 2/p`, NOT the qualifying fraction `3/p`: from `Z` only `0` and `−2` are
  legal, from `M` only `0` and `+2`. Kills number exactly `2D`. Setting
  `2D·(2/p)^{ℓ−1} = 1` gives

      L_A = 1 + ln(2D)/ln(p/2) = ln(pD)/ln(p/2).

- **B, the map's literal formula.** `IMPORT-MAP.md` row 2 and `U-FRAME.md` §5a
  step 6 write `L ≈ ln D / ln(1/f)` with `f = 3/p`:

      L_B = ln D / ln(p/3).

- **C, the graph with MEASURED edge weights.** Replace the uniform `2/p` by the
  exact per-fold edge measure `f_edge = PAIRS(T_x, p) / (2D)`, where `PAIRS` is
  the embedded adjacent-deletable-pair census of
  `research/operator-and-pair-count.md` §11 (2, 0, 6, 72, 1088, 11870, 243822,
  8025014, 114874436 at folds 7..37):

      L_C = 1 + ln(2D)/ln(1/f_edge).

**Pre-registered prediction table** (A and B are functions of `p` and `D` only,
so they are computed here, before the comparison):

| fold `p` | tile | `D` | `ln D` | `L_A` | `L_B` |
|---|---|---|---|---|---|
| 7 | T₅ | 3 | 1.0986 | 2.4302 | 1.2966 |
| 11 | T₇ | 15 | 2.7081 | 2.9951 | 2.0843 |
| 13 | T₁₁ | 135 | 4.9053 | 3.9909 | 3.3453 |
| 17 | T₁₃ | 1485 | 7.3032 | 4.7365 | 4.2103 |
| 19 | T₁₇ | 22275 | 10.0112 | 5.7548 | 5.4237 |
| 23 | T₁₉ | 378675 | 12.8444 | 6.5429 | 6.3059 |
| 29 | T₂₃ | 7952175 | 15.8890 | 7.2009 | 7.0036 |
| 31 | T₂₉ | 214708725 | 19.1848 | 8.2525 | 8.2149 |
| 37 | T₃₁ | 6226553025 | 22.5521 | 8.9668 | 8.9767 |

`L_C` is not tabulated here because it consumes the pair census, which is the
comparison's own input.

## 3. The exact `L` this is scored against, cited not recomputed

`L = 2, 1, 2, 2, 2, 3, 2, 4, 4` at folds 7, 11, 13, 17, 19, 23, 29, 31, 37
(`research/U-FRAME.md` §5, `research/a3-10-lower-tightness.js` reading 1 for the
fold-29 correction and for folds 31 and 37,
`research/qc.js` section W2 for the first seven). **No exact `L` is recomputed by
this experiment**, per the standing compute rule.

## 4. The claim under test, and the exclusion rule

**CLAIM (IMPORT-MAP row 2, restated).** The ratio `R(p) = L_pred(p) / L_exact(p)`
is FLAT in `p` across the nine diagonal folds, so that the predicted shape
`p/ln p` is the object's shape and only a constant separates prediction from
truth.

**Declared in advance: two folds are structurally anomalous and are reported
BOTH ways, in and out.** Both anomalies are PROVEN in
`research/kappa-not-L.md`, not selected after seeing the ratio.

- **Fold 11.** `T₇`'s gap set is `{6, 12, 18, 30}` and contains no 24, the single
  legal qualifying value, so `L = 1` is a census accident. Every ratio there is
  `L_pred/1` and the point is uninformative about a multiplicative law.
- **Fold 29.** All 288 adjacent qualifying-gap pairs in `T₂₃` are `(60, 60)`,
  both in class `+2`; alternation forbids all of them, so `L = 2` is forced by
  the lemma rather than by scarcity.

## 5. The test statistic and the thresholds

- **Trend.** OLS slope `b` of `R(p)` on `ln p`, with its standard error, run on
  all nine folds and on the seven with folds 11 and 29 excluded. The alternative
  the kill criterion is aimed at is `R ∝ ln p`, the signature of dividing
  `ln D ≍ p` by the wrong logarithm.
- **Endpoint check.** `mean R` over the top three folds (29, 31, 37) divided by
  `mean R` over the bottom three (7, 11, 13). Flat means near 1.

**KILL / SCORE, fixed here:**

1. **Shape dies** if `b > 2·SE(b)` on BOTH readings (nine folds and seven).
   IMPORT-MAP row 2 then drops from DERIVED-CONSTANT to WALL-ADDRESS.
2. **Constant out of reach, row closes**, if `b` is not significant but
   `mean R > 5` on the seven-fold reading.
3. **Shape survives with a usable constant** if `b` is not significant and
   `mean R ≤ 5`. The remaining distance to a proof is then stated as the factor
   between the prediction, divided by the flat ratio, and the `u`-frame
   requirement `L ≤ (0.19 to 0.31)·p/ln p` (`research/gate-multiplies.md` §8,
   `research/U-FRAME.md` §5a step 4).
4. **Ambiguous** if the two readings disagree on significance. Reported as
   ambiguous; nine points with `L_exact ∈ {1,2,3,4}` is a low-resolution test and
   an ambiguous verdict is the honest one, not a tie broken by preference.

**Also pre-registered, on the map's own arithmetic.** `IMPORT-MAP.md` row 2
states that at `p = 101` the prediction reads 28.7 against a requirement of 4.2
to 6.8, "a factor of 4.2 to 6.9". The requirement is confirmed:
`101/ln 101 = 21.8846`, times 0.19 and 0.31, is 4.158 to 6.784. The prediction
28.7 is `p/ln(p/3)` — that is, `ln D` replaced by `p` — and the actual
`ln D(T₉₇) = Σ_{3≤q≤97} ln(q−2) = 79.7729`, not 101. The arithmetic to be
reported is therefore with the true `ln D`.

## 6. Soficity, VERIFIED or refuted, criteria fixed here

The presentation is **VERIFIED** iff all four hold, and refuted otherwise:

- (a) the class word of every maximal adjacent-kill run observed at every fold
  the tile can be built for is accepted by the graph;
- (b) the graph's weighted count of legal length-2 windows,
  `Σ_i w(d_i)` with `w = 2` for `d ≡ 0` and `w = 1` for `d ≡ ±2 (mod p)`,
  equals the embedded `PAIRS` census exactly at all nine folds;
- (c) the graph's transfer-matrix count of legal windows of length `ℓ` on the
  real gap word equals a direct run census at every `ℓ`, at every buildable fold;
- (d) the shift is strictly sofic: no finite forbidden set presents it.
