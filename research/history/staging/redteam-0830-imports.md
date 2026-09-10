# Red team 2026-08-30: the six lighter notes of the 0830 wave. Every measured number reproduces on independent code; four literature rows are wrong at the page, one search missed a published theorem that voids its "unmet in print" clause, and one open inequality is written in a form that does not support the deduction under it

<!-- ledger
id: Q-redteam-0830-imports
status: ANSWERED
todo: 9, 0, D, 1
question: Do the six lighter notes of 2026-08-30 (varE-identification, smooth-aps, rec-killrun, skeleton-door, at43-bigint, coherence) survive an adversarial pass on independent code and at the source pages, and which of their load-bearing claims are wrong?
verdict: No note is refuted whole and no exponent moves. Every decisive measurement reproduces on code sharing nothing with the producers: the varE mixed remainder and its 0.844 / 0.826 share below 2L and 94.4 / 98.7 percent unbalanced share at x = 13, 17; the Buchstab deviations and all three crossing levels log10 z* = 33.53, 68.80, 33.62; the skeleton door's 9.2 / -0.9 percent, G30_agg 0.1113 / 0.1011 and the 0.0102 cap at @13, @17, by a path that also verifies cap-36 Theorem A; the @43 parity exactness on all 26,157,448 scour classes with 0 above 2^54 and a constructed @47 counterexample; and the five recon-0828 verdict counts summing to 75, which REFUTES rec-killrun's brief-error clause and confirms the orchestrator's rider. Seven claims WEAKEN. The load-bearing one is smooth-aps's "the weight is unmet in print": Harper's J. London Math. Soc. 112 (2025) e70293 proves a Barban-Davenport-Halberstam asymptotic for an ARBITRARY sequence on exactly that dyadic all-classes object, and his own footnote says the missing max over x' can be incorporated, so the NEAREST citation changes even though the step still does not close (the 2025 range is sqrt(2x) < Q <= x and its Theorem 2 route bars sieved sets by name). Also: Henriot Corollary 2 applies, but to the ERRATUM's statement and under two hypotheses the note leaves unstated (eps < alpha/600, not "every eps"; F at prime powers); varE section 4's display (*) carries an unfilled placeholder and is vacuous by a factor L/d; the skeleton door's "would tighten" is wrong in sign at @17, where the closable block is negative and removing it RAISES G30_agg to 0.1020; Halasz-Montgomery is not applicable for the reason given (it is an abstract inner-product inequality); FGKT's heuristic quote is on p. 4, not p. 3; and the "~13x had no source" is a corpus miss, the retired G2-walk figure at CHANGELOG.md:5716. Not TPC-strength; nothing here opens a route.
-->

*(2026-08-30. Adversarial verification pass over the six lighter notes of the
0830 wave and the live edits made from them, before any of them is released
from HELD. Method: refuted until re-derived. Every decisive number recomputed
on a code path that shares nothing with the producers; every literature claim
re-read at the page or at a page image, with the sha256 and the HTTP status
recorded; every channel calibrated on a known positive in the same session.
Companion producer: `research/history/staging/redteam-0830-imports.js`,
SCRATCHPAD-GRADE, PARTS A-F, embedded by `node research/qc/embed.js`, no
timing on stdout. Fence: this pass wrote these two files and nothing else,
edited no existing file, and ran no git command. Grades: STANDS / WEAKENED,
with the corrected sentence / REFUTED, with the failing line.)*

**Ledger debt, stated because this pass cannot pay it.**
`research/qc/questions.js` requires TODO items 9, 0, D and 1 to carry
`Ledger: Q-redteam-0830-imports` on their `Ledger:` lines. The fence forbids
editing `TODO.md`, so `node research/qc.js ledger` reports four
`ledger-todo-unlisted` findings against this note; the fix belongs to the
orchestrator. Gate state after this pass is in section 3.

---

## 0. VERDICT

**The caveats first.**

1. **Nothing here opens a route and no exponent moves.** Six notes were
   attacked; six survive as objects. What changes is nine sentences, four of
   them citations.
2. **This pass did not re-derive three of the notes' own load-bearing
   internals**, and says so rather than implying coverage: the varE record
   defect (the doubled `X2` column, `attack-0830-varE-identification.md`
   section 2) was NOT rebuilt; the no-wrap equivalence `M_T > lB <=> q > W/M_T`
   was NOT re-derived; and the skeleton split was recomputed at @13 and @17
   only, not at @19 or @23. The varE shares at `x = 19` (the note's headline
   `82 %` and `99.7 %`) were NOT recomputed either; what this pass reproduces
   is the same two quantities at `x = 13` and `x = 17`, where the note's own
   table reads `0.844 / 0.826` and `94.4 / 98.7 %`.
3. **One literature negative in `recon-0830-smooth-aps.md` is wrong, and it is
   the note's load-bearing one.** Harper's Barban-Davenport-Halberstam theorem
   for a general weighted sequence is PUBLISHED (J. London Math. Soc. **112**
   (2025) no. 4, e70293 = arXiv:2412.19644), and the note's four calibrated
   channels did not surface it. The step still does not close, for reasons
   named in the table, but "no Barban-Davenport-Halberstam theorem for a
   multiplicatively weighted sequence was surfaced" is false.
4. **The published text of Henriot's Theorem 5 is still unread** (Cambridge
   answered HTTP 200 with a paywall landing page, `text/html`, not the PDF —
   a channel failure, not a negative). `TODO.md`:739-740's already-corrected
   "read at the text layer of arXiv v1" remains the right rung.

**What survived, flatly.** Every measurement in all six notes that this pass
attacked reproduced: the varE mixed remainder and both of its splits, the
Buchstab deviations and all three crossing levels, the skeleton door's shares
and caps and the `G30_agg` certificate, the @43 parity exactness, the cost
arithmetic, and the five ledger counts. Three identities the two varE notes
rest on were re-derived by hand and checked numerically (PART F): the
Kloosterman-fraction form of the mixed CRT class, the closed form of `R_n(c)`
against a direct Fejer sum, and the Mobius identity of
`recon-0830-smooth-aps.md` section 3.2(iv). The skeleton pass evaluated
`Snum_T` from cap-36's **direct** definition rather than Theorem A's collapsed
form, so its agreement with the exact BigInt kernel (relative `1.1e-13` at
@13, `4.4e-12` at @17) is also an independent check of Theorem A.

**Scoreboard.**

| note | verdict | the sentence that has to change |
|---|---|---|
| `recon-0830-smooth-aps.md` | **WEAKENED, one REFUTED clause** | "it counts `1_{n in S(y)}` with weight one, not [our weight]" is not a gap in the literature: Harper, JLMS 112 (2025) e70293, proves the asymptotic for an arbitrary complex sequence on the same dyadic all-classes object, and arXiv:1208.5992's missing max over `x'` is addressed in that paper's own footnote 1. Two misquotes of Thm 1/Thm 2 besides |
| `recon-0830-rec-killrun.md` | **WEAKENED, one REFUTED clause, arithmetic clean** | The "~75 candidates is not on the record" clause is refuted at the record (21+10+15+13+16 = 75, PART E), as the orchestrator's rider says. Halasz-Montgomery is NOT APPLICABLE for the wrong reason. FGKT's heuristic quote is on p. 4 |
| `attack-0830-varE-identification.md` | **WEAKENED, measurements exact** | Section 4's display `(*)` carries an unfilled placeholder `(1/phi-share)` and is vacuous by a factor `L/d >= y^{6/5}`; the deduction under it needs `|E_d| <= eps`, not what the display says. Henriot "applies as stated" is true of the ERRATUM's statement, under two unstated hypotheses |
| `decide-0830-skeleton-door.md` | **CONFIRMED, one sign defect** | Section 2's "would tighten a six-level certificate ... by under 0.001 from @17 on" is wrong in sign at @17: the closable block is `-0.0009`, so removing it raises `G30_agg` from 0.1011 to 0.1020. `REFUTED.md` row 96 carries the same gloss |
| `engine-0830-at43-bigint.md` | **CONFIRMED, one provenance defect** | "No derivation of 13 was found in the record": the corpus holds exactly one, `CHANGELOG.md`:5716's retired G2-walk figure for @41 against @37. The conclusion is unaffected |
| `coherence-0830.md` | **CONFIRMED, one row wrong** | S2 quotes "576 h" twice and calls it "576 core-hours × 8". The record reads 579 h, and 579 h is a WALL figure on eight shards, not core-hours. S2 is ASK and unapplied, so nothing on disk is wrong |

No note is refuted whole. The one claim graded REFUTED outright in a
literature row is `recon-0830-smooth-aps.md`'s "unmet in print" clause on the
weight; the one graded REFUTED in a record row is `recon-0830-rec-killrun.md`'s
"~75", which the orchestrator had already ruled by rider.

---

## 1. CLAIMS TABLE

Rows are grouped by note. "Re-derivation" names PART A-F of this pass's
producer, a hand derivation, or the page read. Every literature row records
the HTTP status and, where a PDF was fetched, its sha256 prefix (full digests
in the pass's scratchpad log).

### (a) `attack-0830-varE-identification.md`

| # | claim, quoted with its locator | re-derivation or page check | grade | replacement sentence |
|---|---|---|---|---|
| a1 | `:62-65` "The CRT class of a mixed lag with parts `(n0, n+, n-)` is the Kloosterman fraction `c/n = 2( inv(n0 n-, n+)/n+ - inv(n0 n+, n-)/n- ) mod 1` ... With `n- = 1` it is `2 inv(n0)/n+`" | Re-derived by partial fractions in two lines (`c/n = sum_{m | n} c inv(n/m, m)/m mod 1`; the `n0` term vanishes because `n0 | c`). Checked on 3000 coprime triples drawn from disjoint prime pools, PART F(ii): max deviation mod 1 = `3.60e-12` | **STANDS** (PROVEN) | unchanged |
| a2 | `:63-65` "and `c = 2 n0 v` with `v^2 = inv(n0)^2 (mod n+ n-)`" | True as an implication (`v = +inv(n0) mod n+`, `-inv(n0) mod n-`), but `v^2 = inv(n0)^2` has `2^{omega(n+ n-)}` roots and does not determine `c` | **STANDS, under-determined** | "...and `c = 2 n0 v` where `v = inv(n0) (mod n+)` and `v = -inv(n0) (mod n-)`, so in particular `v^2 = inv(n0)^2 (mod n+ n-)`" |
| a3 | `:76-78` "`82 %` sits at `n <= 2L` at `x = 19` (`0.986, 0.916, 0.844, 0.826, 0.818` across the levels)" and `:73-75` the mixed remainder "`-0.41, -0.71, -0.49, -0.49, -0.49` times `ln y`" | PART A, independent path (COUNT by SPF-factoring `h, h-2, h+2`; MAIN by enumerating every squarefree `y`-smooth 7-rough `n <= 2L` then splitting it). Total REM reproduces the corpus `X` to `1.6e-9` (`x=13`) and `8.0e-9` (`x=17`) relative; MAIN sums to `L` to `5e-16`. Mixed remainder `-2.5106` and `-3.2312` (note: `-2.51`, `-3.23`), i.e. `-0.4872` and `-0.4923` times `ln y`; share below `2L` **0.8437** and **0.8257** against the note's 0.844 and 0.826 | **STANDS** (MEASURED, two of five levels) | unchanged. `x = 19` NOT recomputed by this pass |
| a4 | `:86-89` "the pairs with `min(d, e) <= L^(2/5)` carry `95.7, 93.2, 94.4, 98.7, 99.7 %` of the cell's remainder" | PART A, same run: **94.37 %** at `x = 13` and **98.65 %** at `x = 17`, against the note's 94.4 and 98.7; the balance split re-sums to the cell exactly | **STANDS** (MEASURED, two of five levels) | unchanged. The headline `99.7 %` at `x = 19` is NOT checked here |
| a5 | `:322`, `:355` Henriot 2012 Cor. 2 "**APPLIES AS STATED**", "hypotheses met as stated", `F in M_3(17/3, B, eps)` "for every `eps`" | arXiv:1102.1643v1 fetched (HTTP 200, 310450 B, sha256 `49f72f22…`; v1 is the only version), read at a clean text layer; erratum MPCPS 157 (2014) 375-377 fetched (HTTP 200, 72564 B, sha256 `bd56f8f4…`). **Four findings.** (i) The fixed prime divisor 3 does NOT block: Theorem 5's only polynomial hypothesis is "`Q` is primitive"; the no-fixed-prime-divisor condition is in Theorems 1 and 6 only, and Lemma 6 builds the sieve around `Xi`, the fixed prime divisors, with `rho(p) <= g`. So `g = 3` is Henriot's own device, not the note's repair — but ours sits at the exact boundary `rho(3) = 3 = g`, and Henriot's prose says fixed prime divisors are "smaller than `g`" where only "`<= g`" is true (the displayed product is right). (ii) `M_k(A,B,eps)` requires `0 < eps < alpha/(50 g(g + 1/delta))`, i.e. `eps < alpha/600` here — **not "for every `eps`"**. (iii) Membership also needs `F_0, F_1` at prime POWERS; the note defines them at primes only. They are fine (`lam0, lam1` are squarefree-supported), but a completely multiplicative extension `F_0(7^m) = (17/3)^m` admits no `B`. (iv) The erratum makes **three statement changes**, not a sharpness remark: `rho^hat_R -> rho^breve_R` (redefining `Delta_{D*}`), each `Q_j` primitive rather than only `Q`, and `D* -> a* D*`. All three land clear here (`a* = 1` by monicity, which the note never states). `D* = 256` confirmed: `disc(X^3 - 4X) = 256`. The `<< L ln^4 y` exponent confirmed numerically at four `(y, L)` pairs. Published MPCPS 152 text: Cambridge returned HTTP 200 with an HTML paywall page — **channel failed, not read** | **WEAKENED**, conclusion intact | "Henriot's Corollary 2 applies to `F_0(h) F_1(h-2) F_1(h+2)` **as corrected by the 2014 erratum** (which changes three statements, not only the sharpness claim), with `Q = X(X-2)(X+2)` primitive and each factor primitive, `a* = 1` by monicity so `a* D* = D* = 256`, `g = 3` supplied by Theorem 5's own fixed-prime-divisor sieve at the exact boundary `rho(3) = g`, and `F in M_3(17/3, B, eps)` for `eps < alpha/600` **once `F_0, F_1` are extended to prime powers by their values at primes**. arXiv v1 and the erratum read at the text layer; the published MPCPS text is paywalled and unread" |
| a6 | `:273` the display `(*)`: "`| E_d | <= eps * (L/d) * sum_{e <= 2L/d} lam1(e)/e * (1/phi-share)`" | Two defects. (i) `(1/phi-share)` is an **unfilled placeholder**, not a quantity. (ii) The inequality is vacuous: the note derives `|E_d| = O(1)` trivially six lines above, while the right side is `eps * (L/d) * O(1)`, larger by `L/d >= y^{6/5}`. The deduction that follows (`sum_d lam0(d) |E_d| <= eps * O(ln^2 y)`, using `sum_{d <= L^{2/5}} lam0(d) = O(ln^2 y)`, which is correct) needs `|E_d| <= eps`. Also `eta` is quantified nowhere in `(*)` although the `e`-range depends on it | **WEAKENED** (the prose sentence after the display is correct and is the intended content) | Delete the display and keep the prose: "For every `eps > 0` and every fixed `eta in (0, 1/5)` there is `y_0` such that for `y > y_0`, `|E_d| <= eps` uniformly in `y`-smooth squarefree `d <= L^{2/5} = y^{4/5 + o(1)}` coprime to 30; that is, the `y`-friable squarefree integers `e` in `(L^{1-eta}/d, 2L/d]`, weighted by `lam1(e)`, are equidistributed among the reduced classes mod `d` against bounded-variation test functions to relative precision `o(1)`, uniformly in `d` up to `y^{4/5}`" |
| a7 | `:39-52` the `X2`-column defect, "PROVEN by rebuild" | **NOT RE-DERIVED.** This pass rebuilt `X` by type and band but not the corpus's `X2` column | not graded | flag as unchecked by the 0830 red team |

### (b) `recon-0830-smooth-aps.md`

| # | claim, quoted with its locator | re-derivation or page check | grade | replacement sentence |
|---|---|---|---|---|
| b1 | `:47-52` and the Harper row: Thm 1's RHS "`+ sqrt(Psi(x,y) Q) log^{7/2} x`"; Thm 2's "`Psi(x,y)^2 (e^{-2cu/log^2(u+1)} + y^{-c}) + Psi(x,y) Q`" | arXiv:1208.5992v1 fetched (HTTP 200, 369943 B, sha256 `ddfb7d92…`); p. 3 read as a 170 dpi page image because the text layer mangles radicals. **Thm 1's term is `sqrt(Psi(x,y)) * Q * log^{7/2} x`, not `sqrt(Psi Q) log^{7/2} x`** — Harper's own gloss confirms ("non-trivial when `Q = sqrt(Psi) log^{-A} x` and `Q = Psi log^{-A} x` respectively"). **Thm 2's exponential is `e^{-cu/log^2(u+1)}`, not `e^{-2cu/...}`** (the 2 is `log`'s exponent, a text-layer artefact) — the note quotes a stronger bound than exists. `1 <= Q <= Psi(x,y)` and the second term `Psi(x,y) Q` with no log factor: confirmed exactly. The proof split (p. 18 "we merely insert the squares of all our bounds", Siegel for the ineffective form; p. 19 large sieve needing only `y >= log^K x`): confirmed | **WEAKENED** (two misquotes; the range and quantifier claims stand) | Correct both terms in the table row, and correct the derived clause "Thm 1 non-trivial for `Q <= sqrt(Psi)/log^{7+2A}`" to `log^{A + 7/2}` |
| b2 | `:44-46` "a preprint with no journal version found ... no journal-ref on the arXiv abstract page" | Abstract page HTTP 200: v1 only (29 Aug 2012), Comments "33 pages", no journal-ref and no DOI beyond the DataCite arXiv one. OpenAlex `W1526769317` HTTP 200: `"type":"preprint"`, `"is_published":false`, only location arXiv. Crossref HTTP 200, calibrated on Harper (returns his JNT 2012, Compos. Math. 2016, JLMS 2025) and returns no journal version. Decisive: Harper's own 2025 bibliography lists it "[11] ... Preprint available online at http://arxiv.org/abs/1208.5992". zbMATH web UI answered HTTP 403 (Cloudflare) — **channel failed, no negative counted**; the zbMATH API answered 200 and shows Ramare's 2018 review citing it as "Preprint" | **STANDS** | unchanged |
| b3 | `:50-52` "What it does not have: it counts `1_{n in S(y)}` with weight one, not `mu^2(e) 1_{(e,30)=1} prod_{p|e} p/(p-4) / e`, and it carries no maximum over `x' <= x` inside the sum"; and the channel-calibration paragraph's "neither list ... surfaced a Barban-Davenport-Halberstam or Bombieri-Vinogradov theorem for a MULTIPLICATIVELY WEIGHTED friable sequence at bounded `u`" | Both literally true **of arXiv:1208.5992**. But the search missed a published paper: **Harper, "Simple Barban-Davenport-Halberstam type asymptotics for general sequences", J. London Math. Soc. 112 (2025) no. 4, e70293, DOI 10.1112/jlms.70293 = arXiv:2412.19644** (HTTP 200, sha256 `be7c989b…`; Crossref record HTTP 200). It proves asymptotics for `V(A,x,Q) = sum_{Q/2 < q <= Q} sum_{1 <= a <= q} |A(x;q,a) - Aver(A,x;q,(a,q))|^2` for an **arbitrary complex sequence** `(a_n)_{n<=x}` — the note's own dyadic-block, all-classes object with a general weight. Its footnote 1 (p. 19) also answers the max: "Theorem 1 of Harper [11] is stated without the innermost maximum over `Z <= x/h`, **but that may be incorporated with a few modifications to the proof**, at the unimportant cost of a factor `log^{9/2} x` here rather than `log^{7/2} x` there." What still blocks: its range is `sqrt(2x) < Q <= x`, so the small-`D` dyadic blocks are outside it; it still carries no max over `x'`; and its Theorem 2 route bars sieved sets by name ("those produced by a sieve process, which forbids some small divisors, would not be allowed"), which is exactly the `mu^2 1_{(e,30)=1}` restriction, leaving only the sparse Theorem 1 route; its friable Corollary 1 needs `x^{0.51} <= Q <= x` | **REFUTED as a claim about the literature; the STEP still does not close** | "The weight is not the obstruction in print: Harper, JLMS 112 (2025) e70293 (= arXiv:2412.19644), proves the Barban-Davenport-Halberstam asymptotic on `Q/2 < q <= Q` summed over ALL classes for an arbitrary complex sequence, and his footnote 1 there says arXiv:1208.5992's missing max over `x'` can be incorporated. What blocks `(H_w)` is narrower and sharper: that paper's range is `sqrt(2x) < Q <= x`, which excludes the small-`D` blocks; it has no max over `x'`; and its Theorem 2 route explicitly excludes sieved sequences, which the squarefree-and-coprime-to-30 restriction makes ours. NEAREST is now this 2025 theorem, not the 2012 preprint, and the unmet hypotheses are the `Q`-range and the sieve exclusion" |
| b4 | `:135-146` (section 3.2) Lemma A's identity (iv) `sum_{(a,d)=1} G(a, e) = sum_{g | d} mu(g) R_{eg}(2)`, and the closed form `R_n(c) = [(r-c)^+ + (r+c-n)^+ - r^2/n]/L` | Re-derived by hand (Mobius over `j = 0 (mod g)`, using that `{2 + e g j'}` mod `de` is exactly the classes `= 2` mod `eg`, so the main terms cancel), and checked numerically on my own code: PART F(iii), 130 coprime `(d, e)` with random `L`, max `|diff| = 3.61e-15`; PART F(i), 400 random `(L, n, c)`, closed form against a direct Fejer sum, max `|diff| = 1.14e-13` | **STANDS** (PROVEN, elementary; both checks on independent code) | unchanged |
| b5 | `:47-50` (section 0) "which on the dyadic block `d ~ D` of the cell is `D <= L^{1/2} / log^{A/2}` [ARITHMETIC, mine, unstamped]" | Redone: with `x = E = L/(DM)` and `u` bounded, `Psi(E,y) asymp kappa L/(DM)`; non-triviality needs `Q <= Psi/log^A`, and `Q = 2D` gives `D <= (kappa/2)^{1/2} L^{1/2}/(M log^A)^{1/2}`. That is exactly the note's section 2 and section 3.3 expression; section 0 drops the `M^{1/2}` | **WEAKENED** (section 0 only; sections 2 and 3.3 are right) | section 0: "which on the dyadic block `d ~ D` of the cell is `D << L^{1/2}/(M log^A)^{1/2}`, i.e. `L^{1/2}/log^{A/2}` only at `M asymp 1`" |
| b6 | The Granville I row: Thm 1 (1.4)-(1.5), Thm 2 (1.6)-(1.7), Thm 3 (`N < 4/3`), and the Fouvry-Tenenbaum restatement (1.2)-(1.3) | Project Euclid `.../BF02392787.full` HTTP 200; PDF HTTP 200, 19 pp., sha256 `9beb9e5d…`; read at 300 dpi page images, not the OCR layer. `link.springer.com` HTTP 200 but a 3038-byte bot wall — **uncalibrated channel, no data**. All four statements are **verbatim as the note prints them**, with no hypothesis on `u` beyond `x >= y >= 2` in Thm 1 (the constant depends on the fixed `N`, which the note omits and which is immaterial at `N = 4/5`). Granville's own p. 256 sentence is a stronger citation for the ruling than the note's arithmetic: "*Note that (1.4) only provides a non-trivial lower bound for `Psi(x,y;a,q)` if `q < y^eps` for some sufficiently small `eps > 0`.*" **Two completeness gaps.** The paper carries Theorems 1-4, Propositions 1-2, Lemmas 1-6, Remarks 1-2 and unnumbered sections 6-7; the note lists Theorems 1-3 only. None of the omitted results supplies `o(1)` at `q = y^{4/5}` (Thm 4 is an upper bound only; Prop. 2 narrows the range at the same error; Remark 1's improvements are at `q < exp(sqrt(log y))`, and Granville adds "*Such results are already obtained in [FT], and so we do not pursue this here*"; section 6 is GRH-conditional at `q <= y^{1/2}/log^2 y`). But section 6 names **Granville II** as the sequel that improves (1.4)'s error term "as `u` gets larger" — the note's one unread source is the one aimed at its own gap, and three fetch channels for it are dead (royalsocietypublishing 403, doi.org 403, the author's own host 404 on guessed paths, itself calibrated at 200) | **STANDS**, with an incomplete inventory | Add to the Granville I row: "the paper's Thm 4, Prop. 2, Remarks 1-2 and sections 6-7 were also read and none reaches `o(1)` at `q = y^{4/5}`; section 6 names Granville II as the sequel that improves (1.4)'s error term as `u` grows, which makes the unread Granville II the highest-value fetch on this object" |
| b7 | The four `u -> infinity` rows: Soundararajan Thm 1, Drappeau Thm 1, DGS Thm 1.2, Pascadi Thm 1.5, "NOT APPLICABLE, hypothesis `u -> infinity` unmet"; and `:38-42` "Beyond the square root, nothing reaches `u <= 2`" | All four read in full at source, HTTP 200 (sha256 `22b82409…`, `e072c2f6…`, `803d1fac…`, `2d0ba499…`; also 2304.11696v3, `c6cd0ab4…`). Every hypothesis verbatim as the note prints it. **One correction:** DGS's constant is explicitly `5/2` (`y >= exp((5/2) sqrt(log x log log x)/log log log x)`), where the note writes an unnamed `C'`; and `f in C` gives `|f(n)| <= 1` directly, so `g(p) = p/(p-4) > 1` is outside `C` twice over, not once. **One unlisted source that softens the blanket sentence:** Soundararajan p. 1 cites **Harman, Acta Arith. 91 (1999) 279-289** for `Psi(x,y;q,a) >> Psi_q(x,y)/phi(q)` at cube-free `q <= y^{4 sqrt e - eps}`, `q^{2+eps} <= x <= q^{1/eps}` — a genuine BOUNDED-`u` statement inside our range. It is an order-of-magnitude lower bound, so it supplies no `o(1)` and does not close the step; it belongs beside Granville Thm 3. Both Pascadi papers searched for a bounded-`u` result: none exists (2304 Thm 1.5 is 1-bounded completely multiplicative at `y <= x^delta`, failing on both counts, which strengthens the note) | **STANDS**, two additions | "Beyond the square root, nothing with an `o(1)` reaches `u <= 2`; the one bounded-`u` statement in the range, Harman (Acta Arith. 91 (1999) 279-289, cube-free `q`), is an order-of-magnitude lower bound, in the same register as Granville Thm 3." And write DGS's constant as `5/2` |

### (c) `recon-0830-rec-killrun.md`

| # | claim, quoted with its locator | re-derivation or page check | grade | replacement sentence |
|---|---|---|---|---|
| c1 | `:212` "`omega(u) e^gamma = 0.8905362, 1.0052059, 0.9999978, 1.0001078` at `u = 2, 3, 4, 4.26645`" and `:233-235` "`log10 z* = 33.53` at `(3, 0.10)`, `68.80` at `(4, 0.10)`, `33.62` at `(4, 0.20)`" | PART B, independent `omega` from the delay equation on a `1e-5` grid, self-checked against the closed form `(1 + ln 2)/3` to `2.1e-12` and `omega(2) = 1/2` exactly: `0.890536, 1.005206, 0.999998, 1.000108`, deviations `1.0946e-1, 5.2059e-3, 2.2124e-6, 1.0775e-4`. Crossing by bisection on `z^eps = sqrt(e^gamma ln z)/dev(u)`: **33.53, 68.80, 33.62**, all three to the printed digit. The `z = 37` floors reproduce exactly: `0.452` against `156.8` at `u = 3`, `0.001` against `954.1` at `u = 4` | **STANDS** (MEASURED-calibration, as the note grades it) | unchanged, with one caveat worth carrying: my `u = 4` deviation is `2.2124e-6` against the note's `2.2121e-6`, a grid difference on a quantity where `omega - e^{-gamma}` changes sign, so `68.80` is the least stable of the three (a 1 % move in `dev(4)` moves `log10 z*` by about 0.04) |
| c2 | `:86-88`, `:368-373` "the '~75 candidates over two waves' count is not on the record (the recorded counts are 21 + 21 attacks and 59 recon angles)" | PART E reads the five `recon-0828-*` ledger verdicts out of the files at run time: 21 (sieve) + 10 (rough) + 15 (covering) + 13 (jacobsthal) + **16 (farfields)** = **75**. The note's sum omits `recon-0828-farfields.md` | **REFUTED** (as the orchestrator's rider already says; confirmed here on independent code) | Delete the clause. The five verdicts sum to 75 and `README.md` §Status's sentence stands |
| c3 | `:289`, `:321`, `:323`, `:343`, `:352` the FGKT quotes, all cited "FGKT p. 3 **[SOURCED, page image]**" | arXiv:1408.4505 has only v1 and v2 (v3-v5 HTTP 404); v2 sha256 `cb1fed1b…`, matching the note's prefix. **Definition 1** verbatim, on v2 p. 3 (v1 p. 2) — quantifiers exactly as the note has them (one class per prime, every prime `p <= x`, covering all of `{1,...,y}`). The `Y(x) << x^2` / Maier-Pomerance sentence verbatim on p. 3 of both, attributed to Maier and Pomerance as claimed; the note closes the quote mid-sentence without an ellipsis, and the dropped clause strengthens its use; the reference is `[23]` in v2, `[22]` in v1. **The heuristic quote is verbatim but sits on p. 4, not p. 3, in BOTH versions.** Section 3.3's short re-quote of Def. 1, still inside quotation marks, silently drops "integer", the scare quotes and "`= {1,...,y}`" | **WEAKENED** (locators; every quoted string is verbatim) | "FGKT `arXiv:1408.4505v2` p. 3 (Definition 1, the `Y(x) << x^2` sentence) and p. 4 (the max-load heuristic), page images"; restore the elided clause or mark it with an ellipsis; requote Def. 1 in full at section 3.3 |
| c4 | `:177` Iwaniec 1978 via "Granville 2022 p. 2-3, page image": "`S(x, y, z) >= (f(u) - c/log y) prod (1-1/p) y` uniformly in `x`, for `2 < u <= 3`, hence `J(P(z)) << z^2`" | arXiv:2010.01211 has only v1, sha256 `35a6aa6a…` (matches the note). p. 3 verbatim: "*(In fact uniformly for `2 < u <= 3` he proved that `S(x,y,z) >= (f(u) - c/log y) prod_{p<=z}(1-1/p) y`, where `f(u) = 2 e^gamma log(u-1)/u` in this range.)*" Inequality and range exact. Two slips: Granville's "uniformly" attaches to `u`, not to `x` (substantively right, the bound is `x`-free, but not the source's phrasing); and "`J(P(z)) << z^2`" IS Granville's own deduction, not the note's, but it sits on **p. 4**, outside the cited pp. 2-3. Corollary 1 at p. 3 verbatim as the note has it | **STANDS**, two locator slips | "...(Granville 2022 p. 3 for the Iwaniec bound, uniformly for `2 < u <= 3`; p. 4 for Granville's own deduction `J(P(z)) << z^2`)" |
| c5 | `:179` Montgomery-Vaughan 1986 via Gorodetsky p. 6, used at `:214` as "the rms CEILING": "`V_q(H) <= H phi(q)/q`" | arXiv:2111.00853v3 sha256 `069d1a4c…` (matches). The display is verbatim on v3 printed p. 6, `V_q(H)` defined p. 5 as the full-period variance of the coprime count in windows of length `H`, **for squarefree `q`**, with **no hypothesis on `H`**. Corroborated by the zbMATH review (HTTP 200 after a calibrator passed): the `h <= exp(cP)` range restricts SHARPNESS, not validity. Independent exhaustive check: `q in {6,10,15,30,42,105,210,2310}`, every `H <= min(q,400)` plus `H > q`, max ratio `V/(H phi/q) = 0.792`, never violated | **STANDS** (the ceiling is used in-hypothesis) | unchanged. Two silent departures to flag in the row: the review prints `M_k(q;h) << q(hP)^{k/2} - qhP` and the note drops "`- qhP`"; and with `P = phi(q)/q <= 1` the review's own `exp(cP)` is `O(1)`, which the note passes through unflagged |
| c6 | `:182` "Halasz-Montgomery ... **NOT APPLICABLE** by hypothesis. ... hypothesis: a Dirichlet polynomial in `t` or in characters" | Montgomery, *The analytic principle of the large sieve*, Bull. AMS **84** (1978) 547-567 (HTTP 200, sha256 `92b47a25…`), p. 552: "*LEMMA 3 (BOAS). Let `phi_1, ..., phi_R` be vectors in an inner product space*", and p. 553's (11) `sum_r |<xi, phi_r>|^2 <= ||xi||^2 max_r sum_s |<phi_r, phi_s>|` — **abstract, any inner-product space; no Dirichlet polynomial in the hypotheses.** The name attaches to the Dirichlet-polynomial specialisation (Iwaniec-Kowalski Thm 9.6, cited so by Soundararajan's Bourbaki 1119 Lemma 2.6 and by Matomaki-Radziwill-Tao Lemma 4.1; the brief's "IK Thm 9.10" is the wrong locator, and IK itself was not obtained — the locator is second-hand from two independent papers). The inequality is routinely transplanted off Dirichlet polynomials (Jarviniemi-Teravainen Prop. 5.1, Hecke polynomials, via duality plus an off-diagonal bound). It DOES formally apply to `R_H` with `phi_x = (e(a x/W))_{a in F}`, and the note's fallback `sup <= (#frequencies)^{1/2} rms` is the orthonormal case of (11), not an alternative to it | **WEAKENED** — right conclusion, wrong reason | "**APPLICABLE but inert as used.** The inequality is abstract (Montgomery, Bull. AMS 84 (1978) 553, eq. (11), vectors in any inner-product space); the Dirichlet-polynomial framing is a specialisation. Applied to `R_H` with the frequency vectors it yields exactly the term-count cap `z^{2s+o(1)}` the rml-proof note already names, and beats it only if the off-diagonal `sum_{x'} |sum_{a in F} e(a(x-x')/W)|` shows cancellation, which is untested here" |
| c7 | `:58-61`, `:190-198` "No Maier-type theorem in print refutes REC as stated" | **NOT independently re-searched.** This is a statement about a search, and the search is its own evidence; the note says so and names what it cannot see (section 5) | not graded | unchanged |

### (d) `decide-0830-skeleton-door.md`

| # | claim, quoted with its locator | re-derivation or page check | grade | replacement sentence |
|---|---|---|---|---|
| d1 | `:8`, `:41-42` "SEC B of the producer walks every prime: the closable share is **9.2%, −0.9%, 0.2%, 0.5%**"; `:76` "SEC C prices that side at 0.0102, −0.0009, 0.0002, 0.0005 of G30_agg against an open part of 0.1010, 0.1020, 0.1256, 0.0941" | PART C, own kernel built from the cap-30 Thm A and cap-36 definitions, evaluating `Snum_T` from cap-36's **direct** form `L(F(0) + 2 sum_{0<d<lA} G(d)) + 4 sum_{0<=e<lB}(lB-e)G(lA+e)` rather than Theorem A's collapsed `2 Pa (lA - lB + 2R) + 4B`. At @13: total `2.9021e+1`, matching the exact BigInt `sum_q NUMsk/(15W)` to `1.1e-13` relative; `G30_agg = 0.1113` CERTIFIED as the integer inequality; closable `9.2 %`, open `90.8 %`, SV-covered `0.2 %`; closable part of `G30_agg` **0.0102**, open part **0.1010**. At @17: total `2.2650e+2`, relerr `4.4e-12`; `G30_agg = 0.1011` CERTIFIED; closable `-0.9 %`, open `100.9 %`, SV-covered `-0.9 %`; closable part **-0.0009**, open part **0.1020**. The direct-versus-collapsed agreement is also an independent check of cap-36 Theorem A at both levels | **STANDS** (MEASURED, two of four levels; @19 and @23 NOT run here) | unchanged |
| d2 | `:97-100` (section 2) "A proof on the closable side would **tighten** a six-level certificate whose smallest margin is 0.287 by about 0.01 at @13 and **by under 0.001 from @17 on**" | The closable part of `G30_agg` is **negative at @17** (`-0.0009`, reproduced above). Removing that block therefore RAISES `G30_agg` from 0.1011 to 0.1020: it loosens the certificate. "Tighten" is right at @13, @19 and @23 and wrong at @17, and the note's own SEC C table prints the sign it then glosses over | **WEAKENED** | "A proof on the closable side would move a six-level certificate whose smallest margin is 0.287 by about 0.01 at @13 and by under 0.001 from @17 on — and at @17 in the wrong direction, the closable block being `-0.0009`, so removing it raises `G30_agg` from 0.1011 to 0.1020 — and would say nothing about `x >= 31`" |
| d3 | `REFUTED.md`:96 "the door as named **removes** at most 0.0102 from a `G30_agg` whose open part is 0.094 to 0.126" | The open-part range `0.094 to 0.126` is right (0.0941 to 0.1256). "Removes at most 0.0102" is an upper bound on the MAGNITUDE and reads as if the door can only help; at @17 it adds | **WEAKENED**, one clause | "...so the door as named moves `G30_agg` by at most 0.0102 in magnitude, and at @17 in the wrong direction, against an open part of 0.094 to 0.126..." |
| d4 | `:69-71` (section 1 table) "the open side is an equidistribution statement ... `M_T > lB <=> q > W/M_T` ... **PROVEN** (two lines), machine-checked on 1,133,872 pairs" | **NOT RE-DERIVED.** This pass reproduced the split by `M_T <= lB` but did not re-derive the equivalence or re-run the 1,133,872-pair check; both are cited to `import-fracparts.md` section 5 and cap-36 Prop. E, neither read at this pass | not graded | flag as unchecked by the 0830 red team |
| d5 | `:143-149` the four owed live edits, as they now stand on disk | Read as applied. `anchored-calm.md`: the status row (`:40`) carries "the named door is CLOSED as a route (2026-08-30)" with "at most 0.0102" and "open part 0.094 to 0.126"; the "read at a glance" line and the "of either sign" paragraph carry `9.2%, −0.9%, 0.2%, 0.5%` with the subsample rider naming 40 of 435 and 29 of 1,739. `GLOSSARY.md`:372-384 carries the full-prime shares and the closed door. `natal-cap-36-skeleton-door.md`:37 carries "between 90.8% and 100.9%", which is exactly the min and max of the four full-prime OPEN shares (90.8, 100.9, 99.8, 99.5) reproduced above at two levels. `REFUTED.md`:96 present. `README.md`:142-143 applied. `TODO.md` item 4 retired, `Q-skeleton-decide-0830` under `4 (retired)` | **STANDS**, all applied and all correct | one residue: `GLOSSARY.md`'s "it governs 9.2%, −0.9%, 0.2%, 0.5% of the mass" drops the "of either sign" qualifier `anchored-calm.md` keeps; a negative share of a signed total is not a share of a mass. Suggest "carries" for "governs", with "of either sign" |

### (e) `engine-0830-at43-bigint.md`

| # | claim, quoted with its locator | re-derivation or page check | grade | replacement sentence |
|---|---|---|---|---|
| e1 | `:87-92` "The reason is parity: `a - b` is `q - 11`, `q - 13`, `q - 17` or `q - 19`, even for every odd `q`, so each product is an even integer below `2^54` and is exactly representable in a double" | **PROVEN here, and checked.** The record's anchor is `r = ((a - b) mod q)` with `a in {0, q-2}`, `b in {11, 17}`, so `r in {q-11, q-13, q-17, q-19}`; every scour prime at @43 exceeds 19, so `0 < r < q` and `r` is even because `q` is odd; then `r * inv30(q) < q^2 <= 43# = 13082761331670030 < 2^54` and is even, hence exactly representable; IEEE multiplication of two exact doubles whose exact product is representable is exact, and so is the subsequent `%`. PART D checks all **26,157,448** scour classes at @43 in BigInt on three separate columns: **0** with odd `r`, **644,256** products at or above `2^53` (matching the note), **0** products at or above `2^54`, **0** disagreements with BigInt, largest product `12,646,626,466,403,800`. The "`a - b`" naming is loose (`a - b` is `-11, -17, q-13, q-19`); the SET is right | **STANDS** (PROVEN, exhaustively checked) | "...the reason is parity: the reduced anchor `r = ((a-b) mod q)` is `q-11`, `q-13`, `q-17` or `q-19`, even for every odd `q`..." |
| e2 | `:92-94` "the accident ends at `@47`, where `47# = 614889782588491410` lies above `2^54`" | Confirmed with a witness this pass constructed. `47#` exceeds `2^54 = 18014398509481984` by a factor 34.1; above `2^54` evenness no longer suffices, divisibility by 4 does. At `q = 784149071` (prime, below `floor(sqrt(47#)) = 784149081`), `b = 17`: `r = 784149054`, `inv30(q) = 496627745`, exact product `389430176431903230`, which is above `2^54` and `= 2 (mod 4)`; the double evaluates to `389430176431903232`, an error of `+2` | **STANDS**, strengthened | add the witness |
| e3 | `:96-100` path M: "the first such `k = 300239975158033` (BigInt 9007199254741007, double 9007199254741008, off by -1), over 31.2% of the @43 tile" | PART D: first `k = 300239975158033` for BOTH lanes; positions `9007199254741001` (`b = 11`, double `9007199254741000`, error `-1`) and `9007199254741007` (`b = 17`, double `9007199254741008`, error `+1`). Tile share above that `k`: `(436092044389001 - 300239975158033)/436092044389001 = 31.2 %` | **STANDS** | note that the error is `-1` on one lane and `+1` on the other; the note quotes one lane |
| e4 | `:170-172` "6.035 h ... x 43.00 (tile) x 2.230 (per cell) = 579 h wall = 24.1 days"; `:180-181` "Even at a per-cell factor of 1.0 the run is 6.035 h x 43 = 260 h" | PART D redoes the arithmetic from the printed inputs: `578.7 h = 24.1 days`; `259.5 h` at factor 1.0; the brief's 13x gives `78.5 h` (note: 78 h); strike-budget ratio `2.6896e15/5.9157e13 = 45.465`; per-strike `2.230/(45.465/43.000) = 2.109`. All to the printed digit | **STANDS** | unchanged. One inconsistency: the note's own printed medians, `4.89 s` and `2.19 s`, give **2.233**, not the printed 2.230 (the producer divides the raw medians), so the printed inputs do not reproduce the printed ratio to three decimals. Immaterial: 579.4 h against 578.7 h |
| e5 | `:173-179` the 2.23's measurement conditions | Restated flatly from the producer's own stderr: one machine shared with the wave, load average `7.6 / 66.9 / 124.9` on 10 CPUs (the 1-minute figure at probe time is 7.6), three interleaved repetitions, a SINGLE span position `k = M/3`, `blockK 2^22`. The note's own PART 3 shows the cursor-scan component alone moving `0.53 -> 3.12` entries per cell, a 5.9x ratio, so 2.230 is a blend and not a per-component profile. The note flags it ("the least certain input") and the flag is adequate. Also disclosed there: the same span ran `3.65 s` at `blockK 2^24` serial against `4.89 s` at `2^22`, so the block size has to be re-probed; at `3.65/2.19` the price would be 432 h. That last figure is mine and is NOT like-for-like (serial against concurrent) | **STANDS**, adequately caveated | unchanged |
| e6 | `:156-158`, `:246` "No derivation of 13 was found in the record; it is recorded as a brief error" | Grep over the whole corpus for `13x`/`13×`/`~13` in a cost context: exactly one hit outside the 0830 wave, `research/history/CHANGELOG.md`:5716 — "*and 12 h is about 13x the measured 37# run, which no scaling of the counter produces*", the RETIRED U-FRAME estimate for the `G2` lattice walk at 41# against 37#, replaced there by "about 40x". A different object and a different pair of levels, and already dead | **WEAKENED** (the conclusion is unaffected) | "The only `13x` anywhere in the record is `CHANGELOG.md`:5716's retired `G2`-walk figure for @41 against @37, replaced there by 40x; it is not a `@43/@41` figure and was already withdrawn, so the item's `~13x` has no live source" |

### (f) `coherence-0830.md` — five APPLY items spot-checked on disk

| # | item | state on disk | grade |
|---|---|---|---|
| f1 | D1: move the `prop-exact-fold-L.md` bullet out of `G2-STATE.md` §0's PROVEN list | `G2-STATE.md`:57-61 now reads "(PROPOSAL grade, not proven here, moved out of this list 2026-08-30 per `coherence-0830.md` D1:) per-fold `L` ... its equality lemma proven in a staging record and verified at 36 cells, no second reader" | **applied, correct** |
| f2 | D3: `README.md`:140-141, the skeleton door | `README.md`:142-143 reads "its all-x form is open with its named door closed as a route on 2026-08-30 (it governs under one percent of the mass from @17 on...)". Checked against the numbers: the full-prime closable shares are `9.2, -0.9, 0.2, 0.5 %`, so "under one percent from @17 on" is exact | **applied, correct** |
| f3 | D4: `anchored-calm.md`:46 and :61 | both applied, plus the status row and the "read at a glance" line; the "of either sign" paragraph carries the four full-prime shares and the subsample rider naming 40 of 435 and 29 of 1,739 | **applied, correct** |
| f4 | D6: "27 clauses corrected" -> "25" in `README.md` | `README.md`:200 reads "and every one of the 67 closed routes then indexed was re-derived at its record with none reopening and 25 clauses corrected" — the proposal, plus a further repair ("then indexed") that keeps 67 consistent with the new 71 | **applied, correct, improved** |
| f5 | O1: resolve the `CHANGELOG.md` parenthetical | `CHANGELOG.md`:39 reads "(resolved: the bullet moved out of §0's PROVEN list, `coherence-0830.md` D1)" | **applied, correct** |
| — | also checked: D2 (`README.md` "71", `G2-STATE.md`:158 "71 routes (recounted 2026-08-30: 67 on 08-28, two added 08-29, three 08-30)", `REFUTED.md` holding 71 data rows), D5 ("ten hits of ten"), D17 (`REFUTED.md`:43 "at all nine steps over ten levels (z = 13..47)"), D18 (confirmed independently, PART E) | all applied and correct | **applied, correct** |

**One defect in the coherence note itself, and one residue.**

- **S2 is wrong twice.** It quotes `QUESTIONS.md`:104 as "the measured
  extrapolation is **576 h** of eight cores" and then prices the run at "**576
  core-hours × 8**". The landed note, `QUESTIONS.md`:106 and :224, and
  `TODO.md`:686 all read **579 h**; a grep finds no `576` anywhere on disk.
  And 579 h is a WALL figure on eight shards (the record's @41 per-shard walls
  are ~21,500 s each, run in parallel for a 6.035 h wall), i.e. about 4,632
  core-hours, not 576 core-hours times 8. S2 is graded ASK and unapplied, so
  nothing on disk carries the error; the row should be corrected before it is
  acted on. **WEAKENED.**
- **`README.md`:81 residue.** It now reads "measured rising over ten levels to
  z = 47", where `REFUTED.md`:43 and the record read "at all nine steps over
  ten levels". Nine steps across ten levels; the README wording elides the
  step count. Cosmetic, no number wrong.

---

## 2. What would falsify this pass, and whether that check has run

- **The varE shares are wrong** if the type/band decomposition here is not the
  note's. RUN, and the strongest available control: the six types' remainders
  sum to the corpus `X` to `1.6e-9` and `8.0e-9` relative at `x = 13, 17` and
  the main terms sum to `L` to `5e-16`, on a COUNT path that factors `h` and a
  MAIN path that enumerates `n` first. NOT RUN at `x = 7, 11, 19`, so the
  note's headline figures at `x = 19` are uncorroborated by this pass.
- **The skeleton shares are wrong** if the direct `Snum` evaluation is not
  cap-36's object. RUN: it agrees with the exact BigInt `sum_q NUMsk/(15W)` to
  `1.1e-13` and `4.4e-12`, which is simultaneously a check of cap-36 Theorem A.
  NOT RUN at @19 and @23, where the decide note's own numbers (0.2 %, 0.5 %)
  therefore stand on its producer alone.
- **The @43 parity proposition is wrong** if some scour class has odd `r` or a
  product at or above `2^54`. RUN exhaustively: 0 and 0 over all 26,157,448
  classes. The proposition is stated so that its failure at @47 is predicted,
  and a witness was produced.
- **The Harper 2025 finding is wrong** if that paper does not cover the note's
  object. PARTLY RUN: the theorem's statement and its footnote 1 were read at
  the arXiv text; the JLMS published text was not opened, and the reduction of
  `(H_w)` to it was NOT attempted here, so "the NEAREST citation changes" is a
  claim about the literature and not about the deduction.
- **The Henriot findings are wrong** if the published MPCPS 152 text differs
  from arXiv v1 plus the erratum. NOT RUN: Cambridge returned an HTML paywall
  page under HTTP 200. That is a channel failure and no negative rests on it.
- **The "13x had no source" correction is wrong** if the grep missed a
  derivation. RUN over every `.md` and `.js` in the repo for the string; the
  one hit is quoted. A derivation that never wrote "13" would not be found.
- **Every "STANDS" here is a failed attempt, not an endorsement.** Nothing in
  this pass raises any rung in any of the six notes, and no note leaves HELD by
  it.

---

## 3. Gate

`node research/qc.js --full` after this pass: **251/251 audit checks passed**;
`FULL GATE FAILED: qc checks`. Every section clean — refs, quotes, crosslinks,
transfers, calibration, absence, sourcing, widths, provenance,
search-convention all 0 findings — except three, and only one of them names
this pass:

- **LEDGER, 8 findings.** Four are this note's declared debt (items 9, 0, D, 1
  do not list `Q-redteam-0830-imports`), unfixable under the fence. The other
  four belong to sibling passes landing during the run
  (`Q-redteam-0830-engine` on items 8 and A, `Q-redteam-0830-floor-growth` and
  `Q-redteam-0830-floor-sign` on item 0).
- **SCRIPTS, 5 `uncited-script`,** and **EMBEDS, 1 `binding-lost`.** All six
  name sibling files of the same wave
  (`redteam-0830-{doubling,records,rml,slack,zone,floor-sign}.js`), none of
  them this pass's. `research/history/staging/redteam-0830-imports.js` is
  cited by this note and its binding verifies:
  `node research/qc/embed.js --check` reports code-sha256, out-sha256 and body
  all matching.

Nothing was fixed outside this pass's own two files, per the fence.
