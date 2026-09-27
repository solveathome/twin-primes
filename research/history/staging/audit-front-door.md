# Front-door audit: README.md, G2-STATE.md §0, CHRONICLE.md

<!-- ledger
id: Q-audit-front-door
status: ANSWERED
todo: none
question: Does someone arriving after the 2026-08-19/20 wave get the true current picture from README, G2-STATE section 0 and CHRONICLE in ten minutes?
verdict: All three are STALE: README's Status is dated 2026-08-17 with a broken map row and four missing files, G2-STATE section 0 stops at the second attack wave, and CHRONICLE ends at Day 5; drafts are ready for two of the three and README's rewrite is left in Chris's register.
-->

*(2026-08-20. Read-only audit of the three documents a future researcher meets
first, plus drafts for the two that are stale. Nothing outside this file was
edited. The question the audit answers: does someone arriving in a month, after
the 2026-08-19/20 wave, get the true current picture in ten minutes? Calibration
legend as elsewhere: PROVEN, VERIFIED, CERTIFIED, MEASURED, INFERRED, REFUTED.)*

---

## 1. Verdicts

| document | verdict | why |
|---|---|---|
| `README.md` | STALE, and it orients well | §Status is stamped 2026-08-17 and predates three days of work; the map has one broken row and four missing files |
| `research/G2-STATE.md` §0 | STALE at the edges, sound at the core | the 4.2665 → 2 headline is right and unchanged; §0 stops at the second attack wave and never mentions the registries, the blind-test programme, the extinction law, the census defect, or the live analytic front |
| `research/history/CHRONICLE.md` | STALE by three days | the narrative ends at Day 5, 2026-08-17; both 08-18 and 08-19/20 are missing entirely |

### 1a. `README.md` — the specific defects

1. **§Status is dated 2026-08-17.** Three days and roughly forty recorded
   passes have landed since. It does not carry the Kalmynin–Konyagin lower
   bound, the exact ladder reaching 43#, A144311's ownership of the sequence,
   or the fact that four registries now hold the programme's map.
2. **A broken table row.** Line 53 of the Map is a `-` list item sitting inside
   a pipe table, so the `REFUTED.md` entry renders outside the table. The row is
   correct in content and wrong in form.
3. **Four live files are absent from the Map**: `research/IMPORT-MAP.md`,
   `research/SEARCH-CONVENTIONS.md`, `research/OBSERVATIONS.md` and
   `paper/proposals/PROPOSALS.md`. The first two are load-bearing on the reading
   path — the router already carries IMPORT-MAP and the search conventions gate
   every literature claim — and the fourth is where the publication queue lives
   under the moratorium.
4. **The exponent sentence quotes 1.57 central** for the control-corrected
   reading. That is the h2 figure; the G₂ figure is 1.54, and the certificate
   ladder reads about 1.2. `G2-STATE.md` §6 owns the reconciliation and §Status
   does not point at it.
5. **The lower-bound sentence is superseded in strength.** It quotes the free
   `x·log x·logloglog x/loglog x`, which is right and is no longer the best
   thing on record: the KK substitution is two logs above it
   (`two-class-lower-bounds.md` §4c), and it is unrefereed, which §Status is the
   right place to say out loud.

What is right, and should not be touched: the three-step reading path, the
positioning sentence, the attribution paragraph naming Holt, Maier and Buchstab,
and the moratorium block. The orientation job is done well; only the state is old.

### 1b. `CHRONICLE.md` — where it stops, and a second hole

The narrative ends at **Day 5 — 2026-08-17, evening: the localized chain, and
finding Holt**. Two chapters are missing, not one: **2026-08-18** (the block
campaign, the nine-agent phase-1 wave, the exact terms 41# and 43#, the
retirement of the certificate route, the day the corpus learned to distrust a
same-day headline) and **2026-08-19/20**. §3 below drafts the second. The first
is flagged rather than drafted, because it needs a reader of that day's records
and this audit did not run one.

One narrative hazard worth a corrections note rather than an edit: the Day 1
entry records "G₂ (not in OEIS)" as a candidate novelty. That reading was
retired on 2026-08-18 — the sequence is A144311 + 1, Carter 2008, 22 terms. The
Chronicle is a dated log and the entry was true when written, but a future
reader meets it before meeting the correction.

---

## 2. Draft replacement for `research/G2-STATE.md` §0

*(Ready to paste, with one judgment call flagged after it.)*

---

### 0. What is hard here, first

We cannot bound this object. The proven upper bound is exponent 4.2665 and the
target is exponent 2. **Updated 2026-08-20. The gap is unchanged**, through
roughly fifty recorded passes; what moved is the map, and the map is now held in
four standing registries rather than in prose.

**PROVEN.**
- `G₂(x#) ≪_ε x^{4.26645+ε}`. Searched in `SEARCH-CONVENTIONS.md` §1's owning
  conventions and never in ours, it is the first published upper bound at any
  exponent for the two-class problem. `paper/beta2-note.md`, `dhr-verification.md`.
- `G₂ ≥ g` pointwise, so FGKMT gives `G₂(x#) ≫ x log x logloglog x/loglog x`
  free; and `G₂(P(y)) ≫ y (ln y)³ (lnlnln y)²/(lnln y)⁴` for `y ≥ 10^{134.1}` by
  substituting `Ω_p = {a_p, a_p−2}` into Kalmynin–Konyagin. Two logs above the
  free bound, adversarially checked, **NOT refereed**.
  `two-class-lower-bounds.md` §§3, 4c.
- The mean-square Lemma V, with `B ≤ 9A(z)²(E(z)−1) = O((log z)⁸)` and the
  finding that `B` was never the binding term.
  `history/staging/attack-AB-bounded.md`.
- The complementary-window duality `maxsum_m + minsum_{D−m} = W`, VERIFIED at all
  1484 `m` on T₁₃ — and **not ours**: it is the complement identity of the
  circular scan statistic (Cressie 1977). `IMPORT-MAP.md` row 1.
- Shearer's exact criterion on a complete dependency graph **is** the union
  bound, which is what closes the whole local-lemma family.
  `history/staging/import-shearer.md` §4.
- The Fold Moment Identity. `paper/proposals/prop-thinning-null.md`.
- The Tail-Count Transport, `N_new(θ) ≤ (q−2)·N(θ) + 2·Σ_L Q_L(θ)`, the sharp
  per-level evaluator, exact at eight consecutive folds. `U-FRAME.md` §11.
- The Exact Invariance Lemma: bands scale by exactly `(p−2)` and fossil depth is
  frozen at birth. `GLOSSARY.md` §stratum, `ATTACKS2.md` attack 2.
- Per-fold `L` is a statistic of the old gap word alone, exactly: the longest
  alternation-legal window, with Theorem A sharpened from approximation to
  equality by a min-plus critical circuit, so the constant 3/2 is a Perron root
  and no re-derivation of the same automaton moves it.
  `paper/proposals/prop-exact-fold-L.md`.
- `G₂(37#) = 528` carries an exhaustive maximality certificate: `maxsum₁` over
  all 217,929,355,875 gaps, from an engine sharing no code with the exact-ladder
  producers. `history/staging/scanstat-t37.md`.

**MEASURED, and blind-validated against sealed bands.**
- The extinction rate law holds at **five windows over four decades of Y**; at
  `W = 2·10¹¹` the last multi-kill fold measured 631 against the sealed
  [571, 877]. It carries its own systematic in writing: a **~20% count
  overprediction at five of five windows**, and a per-fold `±3√λ` clause that
  FAILS at 43.2%, so the aggregate is right and the per-fold dispersion is far
  wider than Poisson. `history/staging/foldL-window5.md`,
  `paper/proposals/prop-thinning-null.md` §5.
- The joint deficit's closed form `1 − J = 4·Σ_{x<q≤√W} q⁻²` is the last law
  standing after two pre-registered rivals died at 6.35σ and 20.81σ; @29 is a hit
  at `z = −0.90`; and it is **not exact** — a **−0.41% to −0.48% offset**, the
  same residual at both new levels, visible only where the error bar can see it.
  `history/staging/xchan-at29.md`.
- The shadow drift law, `0.793055·(1 + (2 − 1/ln 2)·ln 2/ln y + …)/K(y)`, with
  45.1% of the missing amplitude derived parameter-free and the remainder
  consistent with zero at 2σ. `history/staging/shadow-amplitude.md`.
- The programme's blind tests are not decoration: the linear-in-`ln D` exponent
  rule was validated one level out and then **killed twice blind**, at T₃₁ (4.96
  band-s.e.) and T₃₇ (3.63 s.e.), two engines, one verdict, and its
  DERIVED-CONSTANT claim is withdrawn. `history/staging/scanstat2.md`,
  `scanstat-t37.md`.
- One instrument was defective: the census held each prime's avoided set in a
  32-bit word, so residues aliased for `q > 32` and every published `f-decays`
  point from `x = 37` up was off by 0.62× to 1.05×. Recomputed alias-free at all
  42 levels. The standing lesson is verify at a level where the feared mechanism
  can fire. `history/staging/fdecay-deep.md`.

**DEAD.** Fifty routes, one line each with its mechanism and record, in
`REFUTED.md`. By family: **chaining** (the entropy integral of the true metric
already exceeds the union bound, so chaining's ceiling sits below the union
bound's floor); **the local-lemma family** (Shearer, Moser–Tardos, resampling
oracles, entropy compression — all die on the complete dependency graph);
**the concentration family** (McDiarmid, Azuma, Talagrand, Warnke, Kutin, Kim–Vu
— one shared uniform residue draw defeats every local neighbourhood, and
Banks–Ford–Tao arXiv:1908.08613 §5 had already run the programme on this
ensemble); **spectral ℓ¹→ℓ²** (the conversion *is* the sharp maximal law and its
true constant sits below the TPC line); **coverings** (the economy dies at
`x = 13` where `Σ 2/p` crosses 1; the adversary side is SAFE by `x^{1−o(1)}` and
widening); **thinning as a route** (the merge event is a function of the gap
value and is mutually singular with every solvable coupling). Four candidate
hypotheses were unmasked in one wave as the Zone Postulate wearing other
clothes, which is why every `IMPORT-MAP.md` row now carries a circularity
pre-check.

**The one live analytic front.** Lemma V's missing piece is the quantifier —
almost-all against worst-position — and the instrument family that would supply
it is now named and priced. Deshouillers–Iwaniec 1982 Theorem 12, Maynard's
Lemma 6.12 and Pascadi's 2026 Corollary 18 all require the **modulus and the
inverted variable each to carry a fixed smooth profile**; Rosser weights are
arbitrary functions of the whole modulus and supply none. If both were smooth,
either theorem would clear Lemma V outright. The affordable rough mass is 12.49%
of ours for DI and 29.24% for Pascadi, leaving a shortfall of `H^{0.857720}`.
`history/staging/lemmaV-neighbours.md`. Beside it, open and idle rather than
closed: the **1d bounded-defect Fekete target**. The submultiplicativity defect
is an identity on the Overshoot slack, `D(s,t) = S(s) + S(t) − S(st)`, so the
whole of TODO 1d is a statement about the sublinear part of `ln G₂`; de Bruijn
and Erdős cover a defect growing like `O(u^α)` and the reachable range supports a
bounded one. `history/staging/import-interp.md` §0.

**The compute lever, and it is looser than the ladders suggest.** The exact
ladder runs to 43# (`G₂(43#) = 618`); 41# and 43# are recomputations against
A144311's 22 terms rather than new values, which makes them a check on both
sides. The `162 GB` price recorded for the @29 census was the in-memory
instrument's and not the object's — the segmented census runs @29 and @31 at
62 MB. Standing lever: any question phrased about a bounded window `[0, x^k)`
rather than about the whole tile runs on a segmented sieve and reaches about
three decades further, and the segmented engine walks the exact 29# period in
O(1) memory. Check any stalled ladder against that before calling it
compute-bound. `TODO.md` standing compute note, `LOCALIZED-GAP.md` §10.

**And the second difficulty, which is about our measurements rather than about
G₂.** Three quantities this programme quotes are not constants: the
extreme-value `c` is a surface `c(x, lnD)` reading 0.45 to 1.09 across the
reachable range (§3c); the exponent reads 1.54 on exact terms and about 1.2 on
certified ones, a third of that gap priced (§6); and the all-positions exponent
θ is above 2 and rising with no visible asymptote (§7). Every number below
carries the coordinates it was measured at, because two apparent contradictions
in this programme were nothing but missing coordinates.

---

**Judgment call for the orchestrator.** The draft above is longer than the ~30
lines requested — it lands near 90 — because every claim carries its record
pointer and the DEAD block names six families. Two ways to cut, and the choice is
editorial rather than factual: drop the per-item record pointers in the PROVEN
block and let §10's table carry them, or move the DEAD family paragraph out to a
one-line pointer at `REFUTED.md`, which is where the authority already lives.
The compute-lever paragraph is the most droppable; it duplicates `TODO.md`'s
standing note.

---

## 3. Draft new chapter for `research/history/CHRONICLE.md`

*(To be appended after the Day 5 chapter and before "The refutation ledger".
Written in the file's own register. Needs the orchestrator's judgment on one
count — see the note after it.)*

---

### Days 7 and 8 — 2026-08-19/20: the registries, and the night the programme learned to bet in advance

The work changed shape rather than direction. Twenty attacks over two nights had
left the 4.2665 exponent exactly where it was, and the response was to stop
attacking by inspiration and start keeping books.

- **Four registries opened, and they are now the map.** `research/REFUTED.md`
  (forty closed routes, one line each: name, verdict, mechanism in one clause,
  record pointer — fifty by the following evening); `paper/proposals/PROPOSALS.md`
  (the publication queue under the moratorium, seven proposals, each with a grade
  and triggers written in advance that say what would move it in either
  direction); `research/IMPORT-MAP.md` (thirteen graded candidate imports, each
  with a structural-fit gate, a circularity pre-check and a payoff type); and
  `research/SEARCH-CONVENTIONS.md`, extended row by row all week. TODO.md got its
  forward-only charter back when the closed-routes block migrated out.
- **The five foreign imports landed, and none moved the exponent.** Chaining,
  Suen, thinning, max-plus and B-free. All five banked something anyway — a
  proven identity, a derived constant, a published anchor, a wall address — and
  that hit rate is the reason the map exists.
- **Four hypotheses were unmasked in one wave as the Zone Postulate in other
  clothes**: the `L = 1` residue count, `H″` at `m = 1` and at `m = 2`, and any
  constant bound on `δ`. The circularity pre-check on every import row is the
  scar from that day.
- **The concentration family closed as a family.** McDiarmid, Azuma, Talagrand,
  Warnke, Kutin and Kim–Vu all die on the same mechanism: one shared uniform
  residue draw that the non-neighbourhood indicators reconstruct. Talagrand alone
  evades that and dies on the Lipschitz constant instead. And the prior art was
  waiting — Banks, Ford and Tao had run the concentration programme on this exact
  ensemble in 2019, five checkpoints and Azuma on a normalised martingale, with
  their own "most delicate part" sitting at the coordinate that defeats us.
- **The blind-test programme began, and it bit.** Pre-registrations were
  committed alone, before any producer existed, with anchor, ceiling, predictions
  and every consequence fixed in advance. The scoreboard is mixed on purpose: the
  extinction law's fifth window HIT at `W = 2·10¹¹` (631 inside the sealed
  [571, 877]); the joint deficit's closed form HIT at @29 and survived @31 while
  two rivals died at 6.35σ and 20.81σ; and the linear-in-`ln D` exponent rule,
  validated one level out at T₂₉, was **killed twice blind** — T₃₁ at 4.96
  band-s.e., T₃₇ at 3.63 s.e., two engines and one verdict. Its derived-constant
  claim was withdrawn the same day. A law that is only ever fitted is never in
  danger; these were.
- **What the seals also bought was honesty about the survivors.** The extinction
  law's own record now carries a ~20% count overprediction at five of five
  windows and a per-fold dispersion far wider than Poisson. The 3.8 constant's
  closed form is the last law standing and is measurably not exact, off by
  −0.41% to −0.48% at the only precision that can see it.
- **The census had a bug, and it had been invisible for the right reason.**
  `a3-03-f-from-census.js` held each prime's avoided set in one 32-bit word, and
  JavaScript's shift takes its count modulo 32, so residues aliased for every
  prime above 32. T_x carries such a prime exactly when `x ≥ 37`, and the
  prediction was written before the table was read and proved exact: published
  points off by 0.62× to 1.05× from `x = 37` up. Nothing had caught it because
  every verification had lived at `x ≤ 31`. The standing lesson entered the
  method: **verify at a level where the feared mechanism can fire.**
- **The adversarial pass, which is now house practice.** Every same-day headline
  was held for one hostile read before it was allowed into a live document.
  Nothing broke, three verdicts were corrected in the sentence, and one closed
  form was found in the doing. The Kalmynin–Konyagin lower bound — the strongest
  thing the project has produced — was deliberately held out of every corpus
  document overnight until its adversary reported.
- **One alarm was stale when it was raised.** The FKMPT corrigendum "live risk"
  had already been read a day earlier, and a verification pass found nothing
  load-bearing affected. An alarm about missing prior art now checks the disk
  before it is raised.

Refutations this wave: the localized chain's every repair, the LLL family, the
concentration family, generic chaining, the ℓ¹→ℓ² conversion, the covering
economy, thinning as a route, the greedy oracle past `x ≈ 53`, the one-parameter
extinction density law, the linear-in-`ln D` exponent rule, and Ford and
Halberstam's dual decomposition — which said in print it should win, and carried
out, loses.

---

**Judgment call for the orchestrator.** The brief named an **eleven-agent wave**.
The corpus records a nine-agent parallel wave on 2026-08-18 and a six-agent wave
on 2026-08-17, and no agent count for 2026-08-19/20 appears anywhere in
`CHANGELOG.md`, `TODO.md` or the staging records. The draft therefore says "two
nights" and "the wave" and names no number. If the count is known from the
session rather than from the disk, it belongs in the chapter and needs an
orchestrator to supply it; this audit will not write a number it cannot source.

---

## 4. What is ready to paste, and what is not

| draft | status |
|---|---|
| §2, the replacement `G2-STATE.md` §0 | **Ready**, with one editorial choice open: it runs ~90 lines against the ~30 requested, and §2's closing note names the three cuts that would get it there. Every claim carries its pointer and every pointer was opened during this audit. |
| §3, the `CHRONICLE.md` chapter | **Ready except for one number.** The agent count is unsourced on disk and is left out rather than guessed. Everything else in the chapter traces to `CHANGELOG.md` passes 13, 26, 28, 36, 37, 42, 43, 44, 45, 46, 47, 48 and the staging records they name. |
| §1a, the `README.md` fixes | **Not drafted as replacement prose, deliberately.** §Status is in Chris's voice and the house style guide governs it; the five defects are specified precisely enough to fix, but the rewrite is his register and should be written knowing which of the three days' headlines he wants in the one-paragraph state. The broken table row (item 2) and the four missing Map rows (item 3) are mechanical and can be applied without judgment. |
| the missing **2026-08-18** Chronicle chapter | **Not drafted.** Flagged in §1b. It needs a reader of that day's records; this audit read them only where 08-19/20 depended on them. |

*This file is an audit record. It states what was found on 2026-08-20 and holds
no mathematics of its own.*
