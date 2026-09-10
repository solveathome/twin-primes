# Audit: cross-document constants, second edition (2026-08-20)

<!-- ledger
id: Q-constants-audit-2
status: ANSWERED
todo: none
question: For every load-bearing number that appears in two or more live documents, does it agree everywhere, and does it trace to exactly one custody-bound producer?
verdict: 25 findings over 69 of 70 files, 8 rank A, 12 rank B, 5 rank C: 46 named-constant groups carry two or more distinct values across two or more files, and 439 numerals of five or more significant digits in the live layer have no producer printing them at any precision; nothing was fixed and five judgement calls stayed queued.
-->

**What this covers, and how it differs from the first edition.**
`research/history/staging/audit-cross-document-constants.md` (2026-08-18) asked
whether two documents ever say two things about one object. It found 26. This
pass asks a narrower and harder question: **for every load-bearing number that
appears in two or more live documents, does it agree everywhere, and does it
trace to exactly one custody-bound producer?** The second half is new. A number
can agree in nine documents and still have nothing behind it but the first
document that printed it, and that is a defect the first edition could not see
because it only ever compared documents to each other.

**Scope.** `research/*.md`, `paper/*.md`, `TODO.md`, `README.md` — 70 files, 69
audited. File list pulled fresh at the start of the run and every reported line
re-verified at the end, because sibling implementers were editing the live layer
throughout: four references moved during the pass (`TODO.md`:500 → :529,
`GLOSSARY.md`:224 → :225, and `IMPORT-MAP.md`'s row 4 moved three times, :120 →
:123 → :130 → :131), and two reported findings were reversed on re-verification
(B7, B8). Every line number below is as of the final re-grep.
`research/history/**` is excluded by design — it is the append-only archive and
is supposed to hold superseded values. `research/SCRIPTS.md` is excluded as
generated.

**What counts as a producer.** A script under `research/` carrying an embedded
OUTPUT block written by `research/qc/embed.js` — an OUTPUT banner plus a tail
with `code-sha256` and `out-sha256` — or a data artifact on disk
(`research/t37-partials/`, `research/foldL-window5-01-extinction.raw.txt`). A
live `.md` is never a producer. A closed form recomputable from first principles
needs no producer and is marked so.

**Method, three sweeps.**
1. **Object-centric.** Extract every `NAME = VALUE` / `NAME ≈ VALUE` binding in
   the live layer, normalise the name, group. 46 named-constant groups carry two
   or more distinct values across two or more files. Most are precision variants;
   the report keeps the ones that are not.
2. **Custody.** For every numeral of five or more significant digits in the live
   layer, ask whether any producer prints it at any precision. 439 do not. The
   multi-file residue is the no-producer list below.
3. **Seeded.** The wave's own burn list, run down constant by constant against
   the producer that owns it.

**25 findings: 8 rank A, 12 rank B, 5 rank C.** Nothing was fixed and nothing was
decided; five judgement calls are queued in §Questions. Two of the twenty-five
are corrections to this pass's own first reading, marked as such in place.

**Headline.** The dangerous classes the brief expected are mostly empty. The
0.41621 sweep is fully applied. β₂'s print ladder has no false-ellipsis site and
no precision-sensitive site printing too few digits. `e^{2γ}/4` has 42 live sites
and not one wrong digit. **What the pass found instead is a custody problem, not
an agreement problem**: the single most-quoted measured number in the corpus
rests on a hand-pasted output block, a shared data table lives in two documents
with no script behind it at all, and one check inside `audit-numbers.js` has been
passing green for two days while asserting an attribution that was retired.

---

## Ranking

**A** — a load-bearing number or attribution that is wrong, unsupported, or
retired, in a live argument or a paper. **B** — a number somebody would quote,
where two live documents part or the custody is thin. **C** — presentational: two
correct numbers whose page arrangement invites a false alarm on the next pass.

| # | rank | object | shape |
|---|---|---|---|
| A1 | A | `2(1+√e)/β₂` in `audit-numbers.js` | a green check asserting a retired attribution; the value is right and the label names the file that retired it |
| A2 | A | the 1.57 / 1.54 growth exponents | 34 + 17 live sites, sole source is a hand-pasted `REAL OUTPUT` block with no embed tail |
| A3 | A | G₂(41#) = 546 called new | novelty claim in a paper for an OEIS term published 2009 |
| A4 | A | G₂(41#)'s custody | a paper says "not two independent computations"; there were two |
| A5 | A | h₂'s 1.57 attributed to G₂ | four live sites, including a sentence headed "G₂'s **own** exponent" |
| A6 | A | the β(x)/HL ladder 0.79303…0.79922 | a five-value table in four live documents, no producer anywhere |
| A7 | A | the Maier-matrix census table | ~16 values duplicated across two live documents, neither script embedded |
| A8 | A | `IMPORT-MAP.md` row 4 | still presents two blind tests as unspent and a refuted asymptote as standing; four other live documents carry the outcome |
| B1 | B | K = 5.2974 in formula form | three live sites still encode the K that generates the retired 1.2417, one of them three lines from the 1.2090 that replaced it |
| B2 | B | "halves the open band" vs "removes about 71%" | inside one file, 321 lines apart |
| B3 | B | `THE-DIALS.md`'s 1.57-and-1.567 | one measurement presented as two agreeing ones, with the wrong term count |
| B4 | B | the drift law's `/K(y)` | `GLOSSARY.md` restates the law without the divisor and without the remainder term |
| B5 | B | "remainder zero at 2σ" | the producer measures 1.74σ and 1.85σ from zero |
| B6 | B | the @31 verdict | the live bullet reports @29's hit and omits @31's z = −4.93 |
| B7 | B | the @29/@31 residuals | the live number is right for one level and quoted for two; the producer's printed residual is double-rounded and off by one in its last place |
| B8 | B | the √m law, four unflagged live sites | stated without the REFUTED verdict `TODO.md`:232-238 and `IMPORT-MAP.md`:128 both carry |
| B9 | B | how many exact G₂ terms | 14 current, 13 in a paper, 12 in three research docs |
| B10 | B | 1.3206, 2.4035 | quoted in two live documents each, no producer |
| B11 | B | `shadow-buchstab-01-candidate.js:98` | a live producer hardcoding `0.5573013` for `0.5573049591…` |
| B12 | B | `import-stein-02-strikes.js` | permanently un-checkable by `embed.js --check`, and invisible at the default tail tier |
| C1 | C | the two H laws | `0.2205 + 0.0061` and `0.2208 + 0.0061`, both real fits, neither labelled by basis |
| C2 | C | the two f-law comb baselines | −1.030/−1.038 against −1.021/−1.025, both producer-backed, different baselines |
| C3 | C | 708 | h₂(37#) and G₂(47#) are the same integer at different primorials |
| C4 | C | β₂'s print register | 4.266 / 4.2665 / 4.26645 / 4.266450 all correct; one clause carries two of them |
| C5 | C | the H* ladder | banked as NOVEL-SO-FAR; not one of its twenty integers is in the live layer |

---

# RANK A

## A1. A green check in `audit-numbers.js` asserting a retired attribution

**OBJECT.** The θ_total break-even against β₂.

`research/audit-numbers.js`:70-71 —

```js
  check('2(1+sqrt e)/beta2  [ sift-limit-attack.md break-even ]',
        (2 * (1 + Math.sqrt(Math.E)) / 4.26645028414864191641).toFixed(4), '1.2417');
```

The arithmetic is right: `2(1+√e)/β₂ = 1.2416510655432016`, and `.toFixed(4)` is
`1.2417`. The label is wrong. `research/sift-limit-attack.md`:274 has read
**1.2090** since 2026-08-18, and says in terms: *"Every appearance of 1.2417 in
this file and in briefs derived from it was that much too pessimistic."*

**The two numbers are the same formula over two different K.** Not an arithmetic
error at any point — a change of which K is optimal:

- `K_FH = 2(1+√e) = 5.297442541400` — the **symmetric** split. `K_FH/β₂ = 1.2417`.
- `K_BF = 5.158064680330` at `b/a = 1.3130863738` — the **asymmetric** optimum.
  `K_BF/β₂ = 1.2089827226`.

**Producer, custody-bound.** `research/attack-theta-margin.js` (`code-sha256:
c25181ab…`, `out-sha256: 7c74e8ec…`), inside its embedded OUTPUT block:

> `invariant      : min_{b/a} theta_total*u = K = 5.1580646803   at b/a = 1.3130863738`
> `symmetric a=b  : u = 2(1+sqrt e) = 5.29744254   (the coupled figure, and NOT optimal)`
> `theta* = K/beta_2 = 1.2089827226      shortfall from theta_total = 1 : 0.208983`

Corroborated independently by `research/attack-sqrt-cancellation.js`:451
(`code-sha256: 2f3fa924…`) and by `research/attack-ford-halberstam.js`:755-757
(`code-sha256: afa28b3a…`), which prints both requirements side by side.

**Why nothing caught it.** Because 1.2417 is the *correct* value of the
expression, the check passes forever. `research/audit-numbers.js` is not itself
embedded — by design, it is the independent recomputation gate — so no
`out-sha256` binds it, and no QC check reads its labels. **This is a green
instrument asserting a retired attribution, which is precisely the failure mode
`research/qc/corpus.js`:18 calls "the only guard between a reader and a runnable
wrong number".**

**And the file already has the idiom to fix it.** `research/qc/corpus.js`:17-20
says in terms: *"audit-numbers.js is a regression test AGAINST retired numbers.
Never treat those banners as defects; surface them."* The file's own convention
for a retired value is a retired label — `:67` reads
`'e^{2g}/(4 C2)  [ the retired factor-2-slipped value ]'`, `:357` reads
`"G2(41#) x=37-as-outlier (retired: 487)"`. Line 70 carries a retired value under
a live label, and that is the whole of the defect. Carrying the number is
correct; naming the file that retired it as its authority is not.

Section X below adds the check the live docs actually assert
(`K_BF/β₂ = 1.2090`) beside a retired-labelled version of this one, so the pair
can never drift apart again. **The existing check at :70-71 was not touched** —
this audit does not edit sections it does not own.

**Live-layer state, for the record: clean.** Every bare `1.2417` in the live
layer is a *corrected-from* citation (`G2-STATE.md`:660, `GLOSSARY.md`:352,
`sift-limit-attack.md`:270, :429). No live document asserts it as the break-even.
`sift-limit-attack.md`:916-917 quotes `1.241651` legitimately — there it is the
Ford–Halberstam dual's own requirement, stated against BF's `1.208983`.

## A2. 1.57 and 1.54 rest on a hand-pasted output block

**OBJECT.** The control-corrected growth exponents. They are **two objects, and
the live layer says so** in three places (`exponent-control.md`:198,
`G2-STATE.md`:832, `two-class-lower-bounds.md`:722): *"Quote 1.57 for h2, 1.54
for G2."*

- **1.57 ± 0.06** — h₂, the Ziller–Morack adversarial two-class ceiling, 19 exact
  terms, x ∈ [5,73].
- **1.54 ± 0.09** — G₂ itself, 10 exact terms, x ∈ [5,37].

`research/exponent-control.js`:439,441 —

```
    G2     [5,37]   10  1.801   +-0.074        2.7     1.539+-0.094    0.729  (aeff 0.48->1.98)
    h2     [5,73]   19  1.847   +-0.035        4.4     1.566+-0.058    0.825  (aeff 0.67->2.45)
```

Both round correctly. **But that block opens at `exponent-control.js`:283 with**

```
/* ====================== REAL OUTPUT, pasted ========================
```

**— hand-pasted. No OUTPUT banner, no `code-sha256`, no `out-sha256`, no node
version, no embed date.** This is the exact shape `research/qc/embed.js`'s header
exists to describe: a block found in `attack-lower-bound.js` carrying eight
numbered readings written before the file had ever been executed. **1.57 appears
at 34 live sites in 19 files, 1.54 at 17, and between them they are the corpus's
most-quoted measured number. Their only witness is an unembedded paste.**

Partial custody-bound corroboration exists on a *different* window:
`research/attack-growth-law.js`:1123 (`code-sha256: 32c6e55d…`) prints
`G2 exponent after subtracting the MATCHED bias: 1.546` over x = 11..79, 22
terms. That supports 1.54 for G₂ on a longer ladder — near-agreement, not the
same measurement. **Nothing custody-bound produces h₂'s 1.57 at all.**

**Repair:** `node research/qc/embed.js research/exponent-control.js`.

## A3. A paper claims a published OEIS term as new

`paper/beta2-note.md`:62 — *"The thirteenth term is new (2026-08-18)."*

The thirteenth term is G₂(41#) = 546 = A144311(13) + 1 = 545 + 1, **published by
Alekseyev in 2009**. `research/G2-STATE.md`:935 already carries the correction:
*"41# and 43# were recomputations, not new values."* A144311 runs to a(22) = 1709
(G₂(79#) = 1710); the repo's ladder stops at the fourteenth. **None of 348 / 528 / 546 /
618 / 708 extends the published sequence.** Section X checks all five against
A144311 by the identity `G₂(prime(n)#) = A144311(n) + 1`.

This is the highest-severity finding in the pass, because it is a novelty claim
in a document headed out of the repo, and the resolution is in a file the paper's
own programme document cites.

## A4. The same paper understates the custody it has

`paper/beta2-note.md`:69-70 — *"…so 546 is one search's exact term with its
certificate verified, **not two independent computations of a maximum**."*

There were two. `research/G2-STATE.md`:208 — *"41# and 43# on 2026-08-18, each
twice on disjoint natal masks."*
`research/audit-numbers.js`'s own `partG2at41` header says the same: *"computed
2026-08-18 by two independent enumerations over disjoint natal masks (19 and 23),
which agreed on both the value and the position and whose survivor count equalled
D_41 exactly."* The paper is the weaker document and it lost, which is the
Kourbatov signature exactly.

Two more in the same file, lower severity: `:57` misattributes the producers
(546 and 618 came from the natal-mask enumerators, not `05`/`05b`/`verify-ladder-big`),
and `:59` is one term stale (13 terms, ending 546, with 618 missing).

## A5. h₂'s exponent quoted as G₂'s

Four live sites attribute 1.57 to G₂, which measures 1.54:

- `research/ZONE-POSTULATE.md`:267-269 — the sentence is headed *"G₂'s **own**
  exponent is below 2"* and then quotes **1.57**.
- `research/GLOSSARY.md`:224-225 — *"G₂ ≪ (log p#)^{4.2665+ε} PROVEN …, the
  exponent measured at 1.57."*
- `research/README.md`:151 — the `05-twin-jacobsthal.js` row, headed *"G₂
  growth"*, ends *"growth exponent ~1.57."*
- `research/THE-DIALS.md`:300-301 — see B3.

Four further sites (`README.md`:82, `THE-DIALS.md`:54, `sift-limit-attack.md`:205,
`FOLD-PROFILE.md`:598) say "the two-class exponent" or "α" without naming h₂,
which is defensible as the programme-level ceiling but reads as G₂ to anybody who
does not already know the distinction.

## A6. The β(x) ladder: five values, four documents, no producer

`research/origin-excess.md`:410-414 prints a table whose last column reads

```
    1487     2217121        16883       18044.6     0.93562     1.17982  0.79303
    2111     4464769        30074       32339.3     0.92995     1.17011  0.79475
    2999     9006001        53783       58169.5     0.92459     1.16056  0.79668
    4253    18139081        96465      105002.3     0.91869     1.15034  0.79863
    6037    36517849       173738      190487.2     0.91207     1.14120  0.79922
```

and the same five values appear at `research/G2-STATE.md`:577,
`research/ZONE-POSTULATE.md`:437, `research/maier-matrix.md`:395, and again at
`research/origin-excess.md`:28 and :727 — the ladder that carries the reading
*"ρ(2) → e^{2γ}/4 = 0.79305: the origin carries 21% LESS than the mean density."*

**`research/origin-excess.js` carries no embed tail. Neither does
`research/maier-matrix.js`.** Grepped across every `.js`, `.txt`, `.json` and
`.log` in the tree, **none of the five numbers occurs outside prose.** Four live
documents agree perfectly on a table nothing on disk produces.

The constant they converge to is fine — `e^{2γ}/4 = 0.79305473953…` is a closed
form and Section X pins all five of its print precisions. It is the measurement
ladder that has no custody.

## A7. The Maier-matrix census table, duplicated with no script behind it

`research/maier-matrix.md`:240-245 and `research/origin-excess.md`:88-93 carry the
same census rows, and again at `maier-matrix.md`:334-338 / `origin-excess.md`:105-109
and `maier-matrix.md`:368-380 / `origin-excess.md`:117-123. Sixteen values —
`14.118, 12.632, 11.533, 16.105, 14.705, 19.174, 13.696, 33.879, 177.323,
1070.423, 15.679, 21.316, 29.554, 27.776, 27.391, 1.0015` — appear in two live
documents each and **nowhere else in the repository**. Same root cause as A6:
both owning scripts are among the 40 of 238 `research/*.js` with no embed tail.

The full unembedded list, for the record: `a3-05-bound-L`, `attack-beta2-02-theta-total`,
`attack-beta2-03-exact-strata`, `audit-numbers` (by design), `block-L-first-dead`,
`exponent-control`, `fdecay-deep-00-core` (a library, correctly so), `gate-multiplies-01/02/03`,
`gen-natal5-17tile-scour`, `gen-scripts-index`, `h2-lower-ladder`, `h2-prototype`,
`h2-randomised`, `killrun`, `Lgrowth`, `lit-provenance`, `localized-01-ladder`,
`localized-02-fixed-window`, `localized-03-merge-lemma`, `localized-04-maxsum`,
`localized-single-alignment`, `lucky-control`, `maier-matrix`, `maxgap-law`,
`natal-cap-33-overnight`, `natal-cap-34-wrap-precision`, `natal-cap-37-at41-march`,
`origin-excess`, `qc` (by design), `scanstat-t37-01-engine`, `scanstat-t37-03-shard`,
`scope-fractional-retention`, `sift-limit-lemmaV`, `square-window`, `theta-ladder-row`,
`two-class-lower-bounds`, `window-check`, `window-exceptions`.

The four that matter for this audit are `exponent-control` (A2), `origin-excess`
and `maier-matrix` (A6, A7), and `two-class-lower-bounds` (B10).

## A8. `IMPORT-MAP.md` row 4 still reads as if the blind tests are unspent

`research/IMPORT-MAP.md`:131 (row 4, Stein's method — the row has moved from
:120 to :123 to :130 to :131 during this audit's run, which is itself worth
recording) —

> …a zero-parameter candidate for the ~3.8 — `4·Σ_{x<q≤√W} q⁻²`, **asymptote
> exactly 4, hits at −0.29σ/+0.60σ with blind @29/@31 values pre-computed**…

Three things in that clause are stale, and **four other live documents carry the
resolution**:

1. **"pre-computed"** — the blind values were spent the same night
   (`research/xchan-at29-01-segmented.js`, pre-registration committed alone at
   `27dc709`). `TODO.md`:523-530, `research/G2-STATE.md`:54-56 and
   `research/ZONE-POSTULATE.md` all record the outcome.
2. **"asymptote exactly 4"** — `TODO.md`:530 says in terms *"'Asymptote exactly
   4' gets no support: measured (1−J)/F runs 3.8630, 3.8240, 3.8427 over @23..@31
   and does not rise."*
3. **"−0.29σ/+0.60σ"** — technically correct and misplaced. Those are the **@19
   and @23** scores (`import-stein-02-strikes.js` §C5: `@19 −0.292 HIT`,
   `@23 0.603 HIT`). Read at speed the sentence says the *blind* tests hit at
   those sigmas. The blind scores are **−0.90 at @29 (HIT)** and **−4.93 at @31
   (MARGINAL)**, and the row does not say the formula is now measured NOT EXACT.

This is the Kourbatov signature in its purest form in this pass: the strongest,
most-cited index row is the stale one, and every document it indexes is current.

---

# RANK B

## B1. Three live sites still encode the K that generates the retired 1.2417

A1 records that the live layer no longer *asserts* 1.2417. It still carries the
formula that produces it, in three places, one of them three lines from the
number that replaced it:

- `research/sift-limit-attack.md`:426 — *"its threshold arithmetic is checkable
  (**u > 2(1+√e)/θ_total**)"* — with :429 reading *"Any θ_total > **1.2090** is a
  new theorem (corrected from 1.2417, §4.5)."* The formula and the number in one
  paragraph disagree; under the §4.5 correction the formula reads
  `u > 5.158065/θ_total`.
- `research/theta-ladder.md`:594 — table row
  `| coupled, absolute-value remainders | 1 | u > 2(1+sqrt e) = 5.2974 | loses |`,
  directly above :595's `| break-even | 1.2090 |`.
  `attack-ford-halberstam.js`:747 gives the θ_total = 1 figure under that
  accounting as **5.158065**, with 5.297443 printed beside it as the other column.
- `research/sift-limit-attack.md`:33, :268 and `paper/wall-note.md`:349 — *"the
  coupled route lands at 2(1+√e) = 5.2974"*, which is the symmetric-restricted
  figure, not the coupled optimum.

## B2. "Halves the open band" against "removes about 71%", inside one file

`research/G2-STATE.md`:665 — *"Full decoupling would give 1 + √e ≈ 2.649, which
**halves** the open band without finishing."*
`research/G2-STATE.md`:986 — *"…full Brüdern-Fouvry decoupling at 1 + √e ≈ 2.649,
which **removes about 71%** of the open band."*

71% is right: `(4.26645 − 2.6487)/(4.26645 − 2) = 71.4%`.
`ZONE-POSTULATE.md`:362 and `paper/wall-note.md`:364 both say 71% too. :665 is
alone and it is wrong, and it disagrees with its own file 321 lines later. This
is B4 of the first edition, still open, and now with the arithmetic in Section X.

## B3. `THE-DIALS.md` presents one measurement as two agreeing ones

`research/THE-DIALS.md`:300-301 —

> Calibrated against the one-class control the two-class exponent measures 1.57,
> bracket 1.3 to 1.9, and Ziller and Morack's adversarial h₂, which dominates G₂
> pointwise, measures **1.567 in the same frame over 21 terms**.

Both halves are wrong. Per `exponent-control.js`:441 these are **one**
measurement: h₂ over [5,73] measures **1.566**, which is what "1.57" already is.
And the term count is **19**, not 21. The sentence reads as independent
corroboration and is a number quoted twice.

A third reading in the same file is *not* a conflict and should not be reported
as one: `THE-DIALS.md`:177's *"the measured exponent is 1.70 flat over 22 exact
terms to x = 79"* is `log_x G₂` at x = 79 = 1.7037 — a pointwise log-ratio, not a
bias-corrected log-log slope (`attack-growth-law.js`:1170). Different estimator.
It reads as a contradiction only because the row carries "1.57 measured" eleven
words earlier without distinguishing the two.

## B4. The drift law loses its divisor in the restatement

`research/G2-STATE.md`:59 — `0.793055·(1 + (2 − 1/ln 2)·ln 2/ln y + …)/K(y)`
`research/GLOSSARY.md`:193 — `0.793055·(1 + (2 − 1/ln 2)·ln 2/ln y)`

Compared byte for byte, the two differ in exactly two ways and in no constant.
GLOSSARY drops the ` + …` remainder placeholder — closing the parenthesis turns
an asymptotic into an identity, and the producer's own recommended form
(`adversary-wave2-01-shadow.js`:313) carries `+ O(1/ln^2 y)` — and it drops
`/K(y)`. The K(y) division is stated in prose six lines later at
`GLOSSARY.md`:199-200, so the content survives; the formula as written is the
uncorrected law.

`K(y)` is custody-clean: `research/shadow-amplitude-01-derivation.js`
(`code-sha256: 9336374a…`, `out-sha256: 568c2946…`). It is
`K(y) = δ(y)/δ_∞(y)` with `δ(y) = ½∏_{2<p≤y}(1 − 2/p)` and
`δ_∞(y) = 2C₂e^{−2γ}/ln²y`. Section X recomputes the whole seven-rung ladder from
that definition; `K(1009) = 0.993010641`.

## B5. "Remainder zero at 2σ" for a remainder that is 1.74σ and 1.85σ

`research/GLOSSARY.md`:200 says the surviving offset is *"zero at 2σ"*.
`shadow-amplitude-02-measure.js`:369-371 measures it at **1.74σ and 1.85σ** from
zero. `research/G2-STATE.md`:59-61's wording — *"the remainder consistent with
zero at 2σ"* — is exact. GLOSSARY's is an overstatement of the same measurement.

A second asymmetry in the same pair: `GLOSSARY.md`:195-198 and `ATTACKS2.md`:22
both stamp the drift law **SHAPE-ONLY** (corrected from DERIVED). `G2-STATE.md`:59-61
carries the law with no verdict label at all.

## B6. The @31 verdict is missing from the live bullet

`research/G2-STATE.md`:54-58 reports *"@29 is a hit at z = −0.90"* and calls the
closed form `1 − J = 4·Σ_{x<q≤√W} q⁻²` "the last law standing". At @31 the same
closed form scores **z = −4.93, MARGINAL**. The producer's own reading is headed
*"@29 IS A HIT AND @31 IS NOT … the closed form is right in scale and wrong in
the fourth digit"* (`research/xchan-at29-01-segmented.js`, `code-sha256:
54155de7…`, gate-checked against `natal-cap-39-triple-census.js`'s embedded
output on five reference levels). The bullet does say the law is "not exact",
which covers it; the −4.93 never surfaces.

Section X recomputes the predicted side of both levels from first principles —
`0.028943` at @29 over 7863 primes 31..80429, `0.024784` at @31 over 37534
primes 37..447829 — and the measured side from the producer's own two integers.

## B7. A residual quoted for a pair when it belongs to one level

**This finding was reported to me the other way round and the recompute reversed
it. Both halves are worth recording, because the wrong version is the one a
reader would arrive at from the printed page.**

`TODO.md`:529 — *"the same residual **0.000119** at both new levels."*
The producer prints `0.028943 − 0.028823 = 0.000120` (@29) and
`0.024784 − 0.024666 = 0.000118` (@31). From the page, `0.000119` matches
neither, and it looks synthesized.

**Recomputed at full precision it is not synthesized — the producer's number is
the loose one.** Section X carries the arithmetic:

```
@29  predicted 0.0289431856736   measured 1-J = 0.0288230946307   residual 0.000120091
@31  predicted 0.0247842794653   measured 1-J = 0.0246657456404   residual 0.000118534
```

`0.000118534` rounds to **`0.000119`** at six decimals. The producer's `0.000118`
is the difference of its own already-rounded six-decimal columns — a **double
rounding**, and the printed residual is off by one in the last place it prints.

So the live claim's *number* is right for @31 and its *scope* is wrong: the two
residuals are `0.000120` and `0.000119`, and they differ by 1.3% of themselves.
It should read "0.000120 and 0.000119, one detection apart" — not "0.000120 and
0.000118", which is what the producer's page invites and what a first pass over
this finding concluded.

The z-scores follow the same pattern: `|z| = 0.903` at @29 (a hit) and `4.939` at
@31 (not one). The producer's `4.93` and the rounded-column `4.92` bracket it.
Section X asserts the band rather than the digits, because the digits depend on
how many places the CRT count is carried to.

## B8. Four live sites state the √m law without its dispute flag

`research/LOCALIZED-GAP.md`:143, `research/U-FRAME.md`:753,
`research/G2-STATE.md`:512 and :954 all state `maxsum_m = m·m̄ + σ·√(2m·ln D)`
unflagged.

**`TODO.md` is not one of them, and this is a correction to my own first pass.**
`TODO.md`:232-238 now reads *"the growth law `maxsum_m = m*mbar + sigma*sqrt(2m
ln D)` is DEAD in both factors (2026-08-19/20): sqrt(m) is REFUTED at seven exact
levels (H = 0.2661, 0.2804, 0.3001, 0.3216, 0.3367, 0.3460, 0.3565, with
H + 3se = 0.3770 < 0.5 at T_37), the tail factor sqrt(2 ln D) and its one named
repair … refuted by magnitude and by SIGN"* — current, complete, and matching
the producer. It was reported to me as carrying a stale dispute flag; re-grepped
at the end of the pass it does not. Either it was edited during this run, or the
stale line was read from a stale offset. **Four sites are unflagged, not five.**

**Do not over-claim this one.** The `σ√(2m ln D)` law is measured in the *head*
(segmented sieve over [0,Y), `localized-04-maxsum.js`); the H series is measured
on the *tile* (full cyclic gap word). `U-FRAME.md`:757-765 warns explicitly *"do
not transfer the constant between the two settings"*. So this may be two objects
rather than one contradiction — but no live sentence says so, and
`IMPORT-MAP.md`:166 draws no head/tile distinction when it says "both halves of
the form break". **Adjudication, not a silent edit.**

## B9. How many exact G₂ terms are known: 14, 13, or 12

The first edition found 12 in seven documents, 13 in five, 14 in a script. The
sweep has largely landed and the residue is smaller and different:

| count | sites |
|---|---|
| **14 (current)** | `GLOSSARY.md`:219 (the term list, ending 618); `G2-STATE.md`:207 ("All fourteen exact terms") and :216-231; `PRIOR-ART.md`:363-364; `two-class-lower-bounds.md`:503; `exact-g2-ladder.js` |
| **13** | `paper/beta2-note.md`:59, whose list ends at 546 — stale by one |
| **12, asserted as a count** | `exponent-control.md`:23, *"our own G2 (12 terms, out to…)"* — stale, and it is the sentence that sets the window for A2's exponent |
| **12-term list, no count claimed** | `PRIOR-ART.md`:150 (an OEIS offset comparison) and `THE-LENS.md`:86 (a G₂-against-h₂ comparison) both print the list ending at 528. Neither says "twelve"; both would read to a newcomer as the ladder's extent. Weaker than stale, worth a trailing ellipsis |
| **legitimately 12** | `U-FRAME.md`:552 quotes the twelve-term list as a historical *search string*; `oeis-G2-submission.md`:38 is the retired draft, banner-guarded at :3 |
| **10 shown** | `paper/moire-primes.md`:504, a table that starts at 12 and ends at 528 |

**Live actionable, in order: `research/exponent-control.md`:23** (a count, wrong,
and load-bearing for A2's window) **and `paper/beta2-note.md`:59** (a list, one
term short, in a paper). The two comparison lists are cosmetic.
`TODO.md` carried a twelve-term mention on the first sweep and no longer does.

## B10. Two more numbers in two live documents each, with no producer

- **1.3206** — `research/G2-STATE.md`:762 and
  `research/two-class-lower-bounds.md`:665, the x = 5003 rung of the covering
  ladder. `two-class-lower-bounds.js` has no embed tail; the number occurs
  nowhere else on disk. (`import-thinning-02-coalescence.js`:516 prints
  `1.320691` at T_19 — a different object, not a producer for this.)
- **2.4035** — `research/a3-09-histogram-operator.md`:145 and
  `research/operator-and-pair-count.md`:69, on two different x-grids. No producer.
  It is recomputable, and Section X now recomputes both grids in full: the eight
  values `3.6973, 2.8536, 2.6115, 2.4954, 2.5024, 2.4167, 2.4052, 2.4035` and the
  three `2.4195, 2.4086, 2.4035` all reproduce digit for digit against
  `m̄/ln²x = (W/D)/ln²x`, converging on `e^{2γ}/(2C₂) = 2.4026`. **Both documents
  are right; neither has a witness.**

## B11. A live producer hardcoding a wrong constant

`research/shadow-buchstab-01-candidate.js`:98 —

```js
const fo = rho(2) * (1 + 0.5573013 * w);
```

`2 − 1/ln 2 = 0.5573049591110366`. The hardcode is wrong in the sixth decimal.
It was flagged on 2026-08-19 by `adversary-wave2-01-shadow.js`:311 and by
`history/staging/shadow-buchstab.md`:18, and no published figure moves — **and
the producer still carries it**. Any regression built on that script inherits it.

The closed form itself is custody-clean:
`research/adversary-wave2-01-shadow.js` (`code-sha256: 6cb512c5…`) derives it
parameter-free as `∫₀¹ s·ln2·2^s ds = 2 − 1/ln2 = 0.5573049591`, confirmed by
4e6-panel quadrature to ten digits. No live document prints a decimal for it at
all, so there is no live-layer error here — only a producer one.

## B12. A producer that can never pass its own custody check

`research/import-stein-02-strikes.js` fails `node research/qc/embed.js --check`:
`code-sha256` matches, `out-sha256` **DIFFERS**. Re-run and diffed line by line,
**exactly three lines differ, all of them the bare wall-clock `secs` column in
§C3** (`@17 0.0→0.1`, `@19 0.8→0.9`, `@23 213.8→307.7`). Every arithmetic figure
reproduces byte for byte.

The cause is in the framework, not the script. `research/qc/tailfmt.js`'s
`VOLATILE` list normalises a timing only when a unit is *adjacent* to the number
— `[213.8s]`, `213.8 s`, `"secs": 213.8`. A bare number under a column headed
`secs` is not caught. And because the script needs more than 300 s, at
`research/qc/tails.js`'s default 120 s tier it is classified "slow" and never
checked at all: **it reports as a hard MISMATCH only if somebody raises the
timeout**, which is a defect that is invisible by default and alarming when
found. There is no exemption list in `tails.js`.

Two repairs are available and both are one line: widen `VOLATILE` to catch a
bare number in a `secs` column, or drop the `secs` column from the printed table.
This is recorded and not fixed — `research/qc/**` is outside this audit's write
scope.

---

# RANK C — two correct numbers arranged to look like one wrong one

These are not errors. They are the shapes that will produce a false alarm on the
next pass, and one of them already cost this pass a wave.

## C1. Two H laws, four decimals apart, neither labelled by its basis

- `H = 0.220511 + 0.006140·lnD` — the **three-level pre-registration**
  (`research/import-scanstat-03-prereg.js`:158, `code-sha256: 36ccffb7…`).
- `H = 0.220795 + 0.006146·lnD` — the **five-level refit on the published four
  decimals** (`research/scanstat2-01-t31.js`:373, and
  `research/t37-partials/t37-run.log`:4).

At four decimals: `0.2205 + 0.0061` against `0.2208 + 0.0061`.
`research/IMPORT-MAP.md`:128 quotes the first and labels it correctly as "was
pre-registered" — so nothing is wrong. But the live layer carries only the 4-dp
form, with no indication which fit it is, and the two laws differ at T_37 by less
than a tenth of the measured standard error. Section X refits the five-level law
from scratch (reproducing `0.220795 + 0.006146` and `H*_5(T_37) = 0.381254`
exactly) and asserts that it is **not** the pre-registered one.

The live sentence should name the fit basis.

## C2. Two f-law comb baselines that read as one quantity

- `research/f-decays.md`:24 — *"the comb coefficient (−1.030 corrected vs −1.038)"*
- `research/a3-03-f-from-census.md`:27 — *"the comb coefficient (−1.021 corrected
  against −1.025)"*

Both are producer-backed and neither is arithmetically wrong, because they are
different fits:

- **−1.021 / −1.025** — 51 window levels (`fdecay-deep-03-ladder.js`,
  `code-sha256: 193eff25…`) against a3-03's **published value of record**.
- **−1.030 / −1.038** — 42 census levels, first terms only
  (`fdecay-deep-01-census-defect.js`, `code-sha256: b63da380…`), against that
  file's *own* refit of the defective points.

**−1.038 is not the published value of record; −1.025 is.** `f-decays.md`:24 does
not name its baseline, so a reader comparing the two live documents sees a
contradiction where there is none. Section X asserts both pairs out of the
embedded blocks and records that `1.038` occurs in `fdecay-deep-01` and not in
`a3-03-f-from-census.js`, which is the fact that separates them.

## C3. 708 is two objects

- `research/G2-STATE.md`:229 — the `h₂(37#)` ceiling column,
  `= A288815(12) = 708`.
- `research/PRIOR-ART.md`:385 — *"G₂(47#) = 708 is already published"*,
  `= A144311(15) + 1 = 707 + 1`.

Both correct, numerically coincident, at **different primorials**. Any regression
keyed on the bare integer conflates a ceiling at 37# with the next ladder term at
47#. Section X asserts both and records that 708 alone never identifies the
primorial. A disambiguating word at both sites would close it.

## C4. β₂'s print register

`4.266`, `4.2665`, `4.26645`, `4.266450` and the full
`4.26645028414864191641` all appear in the live layer, and **all five are correct
roundings**. Counts: `4.2665` at **116** sites in **25** files; `4.26645` at **51** sites in **20**;
the 20-digit form at **9**; `4.266` at ~20; `4.267` (theorem-headline ceiling) at
7. Counted directly over the live file list, not taken on report.

**The two dangerous classes are empty.** No live site writes `4.2665…` with an
ellipsis except `dhr-verification.md`:23 and :60, which quote it in order to
condemn it. No division, elasticity or comparison in the live layer runs at fewer
than five decimals. The sweep landed.

What remains is cosmetic: `research/U-FRAME.md`:168 carries both forms eleven
words apart — *"G₂ ≪ (log q)^{4.2665+ε}, from the two-dimensional sieve limit
β₂ = 4.26645"* — and it is the only site in fourteen that does it inside one
clause. And the "proven, needed" idiom is split: `ATTACKS3.md`:198 prints
`"4.267 proven, 1 needed"` where `THE-LENS.md`:123 and `GLOSSARY.md`:397 print
`"4.2665 proven, 1 needed"`.

## C5. A banked result the live layer cannot substantiate

`research/IMPORT-MAP.md`:130 (row 3) banks `θ_Shearer ≈ 1.41` with the proven floor
`2/√e = 1.21306`, and `research/SEARCH-CONVENTIONS.md`:127 records a negative
OEIS search for the `H*` ladder. **Not one of the twenty `H*` integers appears in
any live document.** They exist in two custody-bound producers
(`research/import-shearer-01-region.js`, `code-sha256: 596c3e1c…`, and the
independent `research/adversary-wave2-03-shearer.js`, `code-sha256: fc3f5bc7…`,
which agree) and in the archive. If the ladder is NOVEL-SO-FAR, the live layer
cannot show it.

Note also a namespace collision when grepping: `H*` means a theta-ladder product
at `theta-ladder.md`:82,102,384,757 and `H* = G₂` at `sift-limit-attack.md`:792.

---

# The burn list, constant by constant

Every seed the brief named, with its custody verdict. **Green means the live
layer agrees with the producer everywhere; the finding column says what the pass
turned up anyway.**

| constant | live files | values | producer | custody verdict |
|---|---|---|---|---|
| θ break-even 1.2417 / 1.2090 | `G2-STATE`, `GLOSSARY`, `sift-limit-attack`, `theta-ladder`, `wall-note` | both, but 1.2417 only as corrected-from | `attack-theta-margin.js` (+2 independent) | **1.2090.** Live layer clean. `audit-numbers.js`:70 is not (A1); three sites still carry K = 5.2974 in formula form (B1) |
| exponent 1.57 / 1.54 | 34 sites in 19 files / 17 sites | 1.57 = h₂, 1.54 = G₂ | `exponent-control.js` — **hand-pasted, no embed** | **Two objects, correctly distinguished at ~20 sites.** No custody (A2); 4 sites misattribute (A5); `THE-DIALS`:300 double-counts (B3) |
| 0.41621 / 0.41625 | `sift-limit-attack`, `beta2-note`, `moire-primes`, `TODO` | 0.41621 everywhere | closed form + `genealogy.js`, `attack-beta2-04-loss-budget.js` | **0.41621.** `2C₂e^{−2γ} = 0.41621453…`. **Sweep fully applied** — the only live `0.41625` is `TODO`:67, the sentence recording the sweep |
| extinction folds 181/331/421/457/631 | `ZONE-POSTULATE`:291,294, `G2-STATE`:48-49, `U-FRAME`:648-649 | all four agree | `attack-foldL-06-scaling.js` (windows 1–4), `foldL-window5-01-extinction.js` + `.raw.txt` (window 5) | **Clean — zero defects.** Windows 2e7/2e8/2e9/2e10/2e11 → 181/331/421/457/631. Section X recomputes the bottom three from first principles and reads the top two from the artifact |
| H series 0.2661..0.3565 | `IMPORT-MAP`:128,166-167 and `TODO`:233-234 | 0.2661, 0.2804, 0.3001, 0.3216, 0.3367, 0.3460, 0.3565 | `scanstat-t37-04-run.js` (`3d9d8721…`) | **Clean, reproduced, and the two live docs agree with the producer digit for digit** (C1, B8) |
| G₂ ladder 348/528/546/618/708 | `G2-STATE`, `PRIOR-ART`, `oeis-G2-submission`, `beta2-note`, `covering-dive` | agree | `exact-g2-ladder.js` (`e07551…`), `t37-partials/`, `audit-numbers.js` parts | **All five = A144311(n)+1, all published.** None extends the sequence (A3); custody understated (A4); 708 is two objects (C3) |
| 4.26645 vs 4.2665 | 25 files / 20 files | both, plus 4.266, 4.266450, 20-digit | literature (`dhr-verification.md`:55, Booker–Browning); 5 scripts hardcode the 20-digit | **All correct roundings.** No false-ellipsis site, no under-precise arithmetic site (C4) |
| e^{2γ}/4 = 0.793055 | 42 sites | 0.79 / 0.793 / 0.7931 / 0.79305 / 0.793055 | closed form; none needed | **Every printed digit correct at every site.** The cleanest constant in the corpus |
| 2 − 1/ln 2 = 0.5573049591 | `G2-STATE`:59, `GLOSSARY`:193 — closed form only | no decimal printed anywhere live | `adversary-wave2-01-shadow.js` (`6cb512c5…`) | **No live-layer digits, so no live error.** But a producer hardcodes `0.5573013` (B11) |
| c_null 1.0577 / 1.0818 / 1.0701 | **none** | — | `import-thinning-01-nullmodel.js`, `attack-foldL-06-scaling.js`, `import-stein-01-multikill.js` | **Three different objects, not three readings.** 1.0818±0.0317 is the record's fitted c; 1.0577 the geometric-null c; 1.0701 the Stein-derived c at Y = 2e9. **No live document quotes any of the three**, so there is no live disagreement to have |
| A = 2.2091e-2 / 2.4312e-2 | `IMPORT-MAP`:131, `U-FRAME`:652-653 | derived vs fitted | `import-stein-01-multikill.js` §B5 (derived), `attack-foldL-06-scaling.js` §A3 (fitted) | **Both live sites agree with the producer digit for digit.** Note the derived A is window-dependent (2.0511 → 2.2010e−2 over the four windows); the docs quote the Y = 2e9 row, which is the one that matches the fit's own window |
| the 3.8 series | `TODO`:530, `IMPORT-MAP`:131 | 3.8630 / 3.8240 / 3.8427 measured; 3.8399 / 3.8612 predicted | `xchan-at29-01-segmented.js` (measured), `import-stein-02-strikes.js` §C7 (predicted) | **Measured and predicted, not five readings of one thing.** `TODO`:530 is correct. `IMPORT-MAP`:131 is stale (A8) |
| K–K exponents | `two-class-lower-bounds`:311,368,963, `TODO`:70 | `y (ln y)³ (lnlnln y)²/(lnln y)⁴` | `attack-kk-substitution.js` (`eeeb366a…`), `verify-kk-substitution.js` (`524c4f9c…`) | **Clean, all four sites identical, caveat carried at every one.** The best-custodied constant in the audit. The stale `1.5e6` the verifier flagged is gone from the live layer |

**"K–K" is Kalmynin–Konyagin** (arXiv:2302.00459v2, Izv. Math. 88:2 (2024)
225–235), **not Kourbatov**, who is a separate and unrelated citation in this
corpus (the maximal twin-gap law, arXiv:1301.2242). They do not overlap.

---

# The no-producer list

Sweep 2 asked, of every numeral of five or more significant digits in the live
layer, whether **any** file on disk that is not a working document prints it at
any precision — every `.js`, `.txt`, `.json` and `.log` under `research/`,
including `research/history/**`, and allowing a producer that prints *more*
digits than the document. 439 numerals have no such witness. arXiv identifiers
and DOI prefixes were filtered by shape and by line context.

**The multi-file residue — a number in two or more live documents with nothing on
disk behind it — is the list that matters:**

| value(s) | live sites | what it is | verdict |
|---|---|---|---|
| `0.79303, 0.79475, 0.79668, 0.79863, 0.79922` | `G2-STATE`:577, `ZONE-POSTULATE`:437, `maier-matrix`:395, `origin-excess`:28,410-414,727 | the HL-stripped origin/mean ladder at x = 1487..6037 | **NO PRODUCER** (A6). `origin-excess.js` has no embed tail |
| `14.118, 12.632, 11.533, 16.105, 14.705, 19.174` | `maier-matrix`:240-245, `origin-excess`:88-93 | the pair-census rows | **NO PRODUCER** (A7) |
| `13.696, 33.879, 177.323, 1070.423` | `maier-matrix`:335-338, `origin-excess`:106-109 | the same table's second block | **NO PRODUCER** (A7) |
| `15.679, 21.316, 29.554, 27.776, 27.391` | `maier-matrix`:368-380, `origin-excess`:117-123 | the same table's third block | **NO PRODUCER** (A7) |
| `1.0015` | `maier-matrix`:178, `origin-excess`:291 | a ρ row | **NO PRODUCER** (A7) |
| `1.3206` | `G2-STATE`:762, `two-class-lower-bounds`:665 | the x = 5003 covering rung | **NO PRODUCER** (B10) |
| `2.4035` | `a3-09-histogram-operator`:145, `operator-and-pair-count`:69 | `m̄/ln²x` at x = 200003 | **NO PRODUCER, but recomputable** — now recomputed in Section X, both grids, digit for digit (B10) |
| `0.75739` | `PRIOR-ART`:253,254, `ZONE-POSTULATE`:166,171,174 | `1/(2C₂)`, the Kourbatov-collision constant | **Closed form, no producer needed** — now pinned in Section X |
| `5.26645` | `REFUTED`:39, `sift-limit-attack`:833 | `β₂ + 1`, the fractional-retention window top | **Derived, no producer needed** — now pinned in Section X |

**The single-file residue, by document, for scale.** These are not
cross-document disagreements and are outside this audit's remit, but the shape of
the distribution names the same four scripts:

```
  211  research/theta-ladder.md        78  research/origin-excess.md
   26  research/maxgap-law.md          23  research/maier-matrix.md
   18  research/two-class-lower-bounds.md   14  research/dhr-verification.md
   13  research/h2-scoping.md           8  research/natal-cap-10-sieve-cap.md
    8  research/OBSERVATIONS.md         (11 files with 4 or fewer)
```

`theta-ladder.md`'s 211 are almost entirely the retracted θ column, which its own
⚠ CORRECTION box at :408-421 says is *"left in place as the custody record of
what was run; do not quote them"* — a deliberate no-producer block, correctly
banner-guarded. `dhr-verification.md`'s 14 are literature quotations, likewise
correct. The four that are neither are `origin-excess`, `maier-matrix`,
`maxgap-law` and `two-class-lower-bounds`, all four of them scripts with no embed
tail.

**Of 238 `research/*.js`, 198 carry an embed tail and 40 do not.** A caution for
whoever runs this sweep next, earned in this one: after section X landed, a naive
`grep -l code-sha256 research/*.js` returns **199**, because X21 and X22 test for
the literal string `code-sha256` inside a regex. **A custody sweep must look for
the tail's position at the foot of the file, not for the substring anywhere in
it.** Two of the 40
are by design (`audit-numbers.js` is the independent gate; `qc.js` is the
framework), one is a library with no output (`fdecay-deep-00-core.js`). The rest
are the surface this list is measuring.

---

# Canonical print decisions, proposed

The brief asked for these as decisions, not observations. Each is a rule a
regression can enforce, and each says what would have to change.

## β₂ — four registers, chosen by what the sentence is doing

1. **Prose, narrative, and "proven vs needed" ledger rows → `4.2665`.**
   A legitimate 4-d.p. rounding; `dhr-verification.md`:23 blesses it explicitly.
   **~110 of the 116 sites need no change.**
2. **Any arithmetic, division, elasticity, or comparison at 10⁻⁴ or finer →
   `4.26645` minimum.** Already honoured everywhere: `sift-limit-attack.md`:274
   does the break-even division at 5 d.p., `theta-ladder.md`:592,595 likewise.
   **Zero offenders.**
3. **Definitional and theorem-statement sites → the full
   `4.26645028414864191641`.** Already honoured at all 9.
4. **`4.2665…` with an ellipsis → banned.** The expansion reads `4.266450…`;
   truncated to four places it is `4.2664`, so `4.2665` is a round-**up** and can
   never take an ellipsis. **Zero live offenders** — the two survivors quote the
   error in order to condemn it.

**Recommended canonical print: `4.2665` for prose, `4.26645` for arithmetic.**
Reserve `4.267` for the theorem statement, which is what `paper/beta2-note.md`:90
and `paper/PAPERS.md`:39 already do, and bring `ATTACKS3.md`:198's
`"4.267 proven, 1 needed"` into line with `THE-LENS.md`:123 and
`GLOSSARY.md`:397's `"4.2665 proven, 1 needed"`. Fix `U-FRAME.md`:168, the one
clause carrying both forms.

## e^{2γ}/4 — no rule needed

`0.79305473953…`. All five print precisions in the live layer are correct
roundings and Section X now pins each one to the site class that uses it. Leave
as is.

## 2C₂e^{−2γ} — `0.41621`

Five decimals, as swept. The 8-d.p. value `0.41621453` is available for
arithmetic. The regression is a two-sided one: the closed form must round to
`0.41621`, **and** `grep -rn "0\.41625" research/*.md paper/*.md TODO.md README.md`
must return exactly one line, `TODO.md`:67, the sentence that records the sweep.

## 2 − 1/ln 2 — `0.5573049591` where a decimal is wanted

Ten decimals is what the producer derives and what the closed form supports. No
live document currently prints any decimal, which is fine. **The repair owed is
in a producer, not a document:** `shadow-buchstab-01-candidate.js`:98.

## The break-even — `1.2090`, and always with its K

`K_BF/β₂` where `K_BF = 5.158064680330`. The failure mode here is not the digits
but the numerator: a document that prints `2(1+√e)` in the formula regenerates
`1.2417` no matter what number sits beside it. **Print the K.**

## The H law — name the fit basis

`0.2205 + 0.0061·lnD` is the three-level pre-registration;
`0.2208 + 0.0061·lnD` is the five-level refit. Neither is canonical on its own.
Whichever a sentence uses, it must say which.

---

# Section X of `research/audit-numbers.js`

**125 checks, appended as section X, in the style of sections A..W. No existing
section was touched.** The rule the section is written to is the brief's: **every
check reads its inputs from an embedded artifact or recomputes from first
principles, and not one of them reads a live document.** A document that quotes a
number cannot be the witness that the number is right — that is the whole premise
of a cross-document audit, and a regression net that violated it would be
certifying the thing it exists to catch.

| group | n | what it pins | how |
|---|---|---|---|
| X1 | 3 | `2 − 1/ln 2`, and that the `0.5573013` hardcoded in `shadow-buchstab-01-candidate.js`:98 is not it | closed form |
| X2 | 5 | `e^{2γ}/4` at all five live print precisions | closed form |
| X3 | 3 | `2C₂e^{−2γ} = 0.41621`, and that `0.41625` is not a rounding of it | closed form |
| X4 | 8 | β₂'s four print registers; the truncation `4.2664` that bans the ellipsis; `β₂+1 = 5.26645` and the empty retention window | closed form |
| X5 | 8 | `K_BF/β₂ = 1.2090` **and** the retired `K_FH/β₂ = 1.2417`, labelled retired; the 71% band share, and that it is not "half" | closed form |
| X6–X7 | 9 | `G₂(37#) = 528` from the five `t37-partials` shard JSONs — max over shards of the `m = 1` max — plus `Σ dOwn = D₃₇`, `Σ sum = 37#`, the `endPos` chain closing on 37#, and `m̄(T₃₇)` | **artifact** + first principles |
| X8 | 4 | the seven-level `ln D` ladder; the H series strictly increasing; the span `0.2661 → 0.3565`; √m killed at the top rung | first principles |
| X9 | 6 | the five-level H law **refit from scratch** — `0.220795 + 0.006146`, `H*₅(T₃₇) = 0.381254` — and that it is not the three-level pre-registration | least squares, recomputed |
| X10 | 5 | H(T₃₇) below its band, the miss in its own s.e., the extrapolation reach | first principles |
| X11–X13 | 3 | the extinction folds **181, 331, 421** at windows 2e7, 2e8, 2e9, from an independent reimplementation of the level-p object | first principles, ~15 s |
| X14 | 8 | folds **457 and 631**, the sequence, the band `[571, 877]` median 683, the crossing-fold ratio | **artifact** (`foldL-window5-01-extinction.raw.txt`) |
| X15 | 2 | `1/(2C₂) = 0.75739` | closed form |
| X16 | 5 | `m̄/ln²x` on **both** live grids, eleven values, and the Mertens limit `2.4026` | first principles |
| X17 | 9 | the five ladder terms against A144311 by `G₂(prime(n)#) = a(n)+1`; the 708 collision | published sequence |
| X18 | 4 | `K(y)`, all seven rungs, from `δ(y)/δ_∞(y)` | first principles |
| X19 | 6 | `2/√e = 1.2130613194`; θ at both ends of the H* ladder | closed form |
| X20 | 14 | the @29/@31 joint deficits: the closed form recomputed over 7863 and 37534 primes; J from the producer's own integers; both residuals at full precision **and** the double-rounded print they differ from; both z-scores as bands | first principles |
| X21 | 12 | the f-law coefficients, asserted **out of the `fdecay-deep` embedded blocks**, with the two comb baselines separated | embedded artifact |
| X22 | 11 | the extinction rate law's derived `(A, c) = (2.2091e−2, 1.0701)` against the fitted `(2.4312e−2, 1.0818 ± 0.0317)` and the null `c = 1.0577`; the 0.37σ and 2.2% the live layer quotes, recomputed; that the three c are three objects | embedded artifact + arithmetic |

**Three of these are worth naming as new instruments, not just regressions.**

- **X11–X13 recompute the extinction ladder from first principles** with an
  implementation that shares no code with the wave's. It is also a *second*
  convention: section W3 reaches 181 for the 2e7 window through the natal comb,
  X11 reaches it through the window-5 level-p object. Two conventions, one
  answer. The 2e10 and 2e11 rungs cost a decade and two decades more and are read
  from the artifact instead.
- **X6 reconstructs `G₂(37#) = 528` from the shard partials**, and asserts three
  invariants beyond the value: `Σ dOwn = 217929355875 = A059861(12)` proves the
  sieve was complete, `Σ (m = 1 sums) = 7420738134810 = 37#` proves the shards
  tile the period with no gap and no overlap, and the `startPos`/`endPos` chain
  closes. A max alone would pass on a partial scan; these three do not.
- **X9 refits the H law rather than quoting it**, which is what makes C1
  checkable: the section can state that the five-level refit is *not* the
  three-level pre-registration, and hold both.

**Cost.** Section X adds about 20 s to the run — X13's 2e9 window is 13 s of it,
X12's 2e8 window 1 s, and everything else is milliseconds against a file whose
`g2big` part alone is four minutes.

**Result.** `node --max-old-space-size=16384 research/audit-numbers.js` —
**242/242 checks passed, exit 0, 283.5 s** (117 pre-existing + 125 new). Run on
an unloaded machine; the same file took 534.5 s at the 124-check revision while
three other jobs were running, so budget 5 to 9 minutes depending on load.

The file is locked at `sha256 087477f3c2674a3b7e243620cfff10df7b99b9d7f5099d4d5a443bccecc14296`;
the confirmation run above executed exactly those bytes. The diff against `HEAD`
is a single hunk: **521 insertions at line 1074, zero deletions.** No existing
section was read, moved, or edited, including the one A1 is about.

---

# Near-misses examined and deliberately not reported

The first edition's hardest class was two documents that look like they are
reconciling a normalisation and are not. This pass hit the mirror image: pairs
that look like disagreements and are reconciliations. Each of the following was
in the flag list until a second look moved it out, and each is recorded so the
next pass does not spend the wave on it again.

- **`σ/m̄` = 0.892 and 0.89**, **`x(0)/x̄` = 1.4541 and 1.45**, **`e^{2γ}` =
  3.172 / 3.1722 / 3.17**, **`2(1+√e)` = 5.2974 / 5.297442541400 / 5.297** —
  precision variants of one number, all correct roundings. The object-centric
  sweep returns them and they are noise.
- **`c₂′` = 0.4814 against 0.594.** 0.4814 is the full-sample mean, 0.594 the
  band maximum; `audit-numbers.js`:344-345 already holds both.
- **`θ_total` = 1.2090 against 1.25** (`sift-limit-attack.md`:455). 1.25 is a
  *partial target* — "which already beats 4.2665 and asks for four times less
  cancellation than full decoupling" — not a break-even claim.
- **`need/z²` = 0.3550 against 0.5485.** Different z. The 0.5485 at
  `sift-limit-attack.md`:358 is the corrected z = 19 reading from the ⚠
  CORRECTION box; 0.3550 is a different row.
- **`1.8356` and `1.5592`** looked like a no-producer pair on the first sweep and
  are not: `research/discrepancy-two-class.js`:647-648 prints them, glued to an
  `×`. **The sweep's own bug**: a negative lookbehind excluding a word character
  before the digits dropped every producer value printed as `x1.8356`. Fixed, and
  worth stating because any future sweep will write the same regex.
- **`10.5281`** is a DOI prefix (Zenodo), not a constant. Filtered by line
  context. **`1302.2296`, `2312.09021`, `2408.10460`, `1202.3670`, `2210.15487`,
  `2102.12297`, `2009.05000`, `1410.3333`, `2302.05946`, `2308.05378`,
  `2402.03810`** are arXiv identifiers, filtered by shape (YYMM.NNNNN).
- **`5.26645`** is `β₂ + 1`, and `α₂ = 5.35773 > β₂ + 1` is exactly why the
  fractional-retention window is empty. Derived, correct, now checked.
- **The fifth window has two pre-registered bands, and only one is quoted.**
  PREDICTION 1 (the record's fitted pair, unioned over `c ± 3se` with `A`
  profiled) gives `[571, 877]` median 683; PREDICTION 2 (the Stein pair) gives
  `[619, 811]`. **Every live site quotes the first and none quotes the second**,
  which is correct — the first is the one the pre-registration scores on — and it
  looked like a missing band until the producer was read. Recorded because the
  next sweep will find `[619, 811]` in the artifact and not in any document.
- **Per-window bands for the lower rungs**, likewise in the artifact and not in
  the live layer: `[163, 311]` at 2e7, `[241, 439]` at 2e8, `[457, 719]` at 2e10
  — the last of which the measurement lands exactly on the floor of. No live
  document quotes any of them, and none needs to.
- **`THE-DIALS.md`:177's 1.70** against the same file's 1.57 — two estimators
  (pointwise `log_x G₂` at x = 79 against a bias-corrected log-log slope), not
  two values of one estimator. The file's arrangement is the problem, not the
  numbers; recorded under B3 rather than as a disagreement.
- **`research/discrepancy-two-class.md`:284's "measured exponent ratio near
  1.57"** is `α(h₂)/α(h) = 1.57/1`, legitimate, not a G₂ misattribution.
- **`2.4052` at x = 20011 against `2.4086` at x = 10007** — different x on a
  monotone curve, and both recompute exactly. Not a disagreement.
- **A mangled sentence at `research/IMPORT-MAP.md`:166** — *"…(`history/staging/scanstat2.md`).md` §5 measured it (`0.2661, 0 / 0.3565` against `0.5`…"* — carries a stray fragment and a broken series. **Not reported as a finding**: a sibling implementer was editing that file throughout this pass and the row moved three times, so this is very likely mid-edit rather than committed. The constants either side of it are correct. Worth a look after the wave settles.
- **The 40 `research/*.js` with no embed tail** are not all defects.
  `audit-numbers.js` is the independent recomputation gate and must not be
  embedded; `qc.js` is the framework; `fdecay-deep-00-core.js` is a library with
  no output at all. Only the ones whose numbers reach a live document are
  reported.

---

# Questions queued for Chris — research judgement, not audit judgement

Five of the findings above are calls the audit cannot make.

1. **B8, the √m law's two settings.** `U-FRAME.md`:757-765 says do not transfer
   the constant between head and tile. `IMPORT-MAP.md`:166 says "**Both halves of the form
   break — `sd_m = σ√m` at seven levels**" and draws no such distinction. Are the four unflagged live
   statements a contradiction, or two objects that share a formula? The audit can
   show the sentences; it cannot decide which.
2. **A6 and A7, what to do with an unembedded table.** Running
   `qc/embed.js` on `origin-excess.js` and `maier-matrix.js` would bind them —
   but it would also rewrite two tables that six live documents quote, and if
   the code has drifted since the paste, the documents move. Bind first and
   reconcile, or reconcile first and bind?
3. **A3, the novelty claim.** `paper/beta2-note.md`:62 is wrong on the record and
   the correction is already at `G2-STATE.md`:935. But the paper's surrounding
   paragraph is making a point about *certificate* custody, not priority, and
   whether the fix is a deletion or a rewrite is an authorial call.
4. **C5, the H\* ladder.** If it is NOVEL-SO-FAR, does it belong in the live
   layer? Right now the claim is banked in an index row and the twenty integers
   that support it are only in scripts and the archive.
5. **B12, the `secs` column.** Widen `tailfmt.js`'s `VOLATILE`, or drop the
   column? Widening makes one more class of number invisible to the hash;
   dropping loses a runtime record. `research/qc/**` is outside this audit's
   write scope either way.

---

# What this says about the checks

**The first edition's root cause was staleness: the resolution already on disk,
in a document the stale one cites by name. This pass found a different one.**
Eighteen of that edition's twenty-six were stale citations, by its own count. Of this edition's
findings, only A3, A4, B8 and B9 are that shape. The dominant shape here is
**custody**: a number that everybody agrees on and nobody can reproduce.

That difference is a measurement of how well the embed migration worked. It
worked: 198 of 238 scripts are bound, the 0.41621 sweep is complete, β₂'s
dangerous print classes are empty, `e^{2γ}/4` is perfect at 42 sites, and every
seeded constant that has a producer agrees with it. **What the migration did not
reach is the residue, and the residue is where the tables are.**
`origin-excess.js` and `maier-matrix.js` between them supply numbers to six live
documents and neither has ever been embedded.

**Three signals would catch this class, and none of them needs to understand the
mathematics.**

1. **A numeric table in a working document whose values occur in no `.js`, no
   `.txt`, no `.json` and no `.log` in the tree.** This is sweep 2, it runs in
   under a second, and it is what found A6, A7 and B10. The one implementation
   trap is the regex: producers print `x1.8356`, `= 0.4814`, `(0.41621)`, so the
   lookbehind must exclude only a preceding digit-or-dot, never a word character.
2. **A script with an `OUTPUT` block and no `code-sha256`.**
   `exponent-control.js` is the case that matters — one grep, and it names the
   sole source of the corpus's most-quoted measured number. `qc.js` already has
   the `embeds` check; what is missing is the inverse, a script that *looks* like
   it carries output and is not bound. `exact-g2-ladder.js` carries both a bound
   block and a legacy hand-pasted duplicate at :197-286, currently identical and
   guaranteed to desync on the next code edit.
3. **A check in `audit-numbers.js` whose label names a live document.** A1 is
   green and wrong because the label cites `sift-limit-attack.md` for a value
   that file retired. Nothing can catch that by running the file. But a check
   whose label contains a `.md` path is a check making a claim about a document,
   and that claim is greppable: does the named file still contain the claimed
   value? Before this pass exactly two checks in the file carried such a label —
   `:70`'s `[ sift-limit-attack.md break-even ]`, which is A1, and
   `:559`'s `exponent-control.md S1`, whose source is A2. **Both of the two are
   findings in this report.** Section X deliberately adds twenty more, because
   the label *is* the cross-document assertion, and an assertion nobody can grep
   is an assertion nobody re-reads.

A fourth, cheapest of all, and this pass earned it the hard way: **two fits of
one law, four decimals apart, both real.** C1 and C2 are both this. The rule is
not "flag them" — it is that a live sentence quoting a fitted coefficient must
name the fit basis, and a sentence that does not is incomplete whether or not it
currently disagrees with anything.

**A fifth, which cost this pass a reversal and is the reason section X recomputes
rather than asserts.** B7 arrived as "the live layer quotes a residual that no run
printed". It is the opposite: the run's printed residual is the difference of its
own already-rounded columns, and at full precision the live number is the
correctly rounded one. **A producer that prints `a`, `b`, and `a − b` at the same
precision is printing three numbers of which the third is not the difference of
the first two** — and every document downstream inherits the double rounding as
if it were a measurement. The check that catches it is not a comparison between
documents at all; it is recomputing the difference from the inputs. Every one of
section X's 125 checks is written that way for this reason, and it is why the
brief's rule — never read a live document — has a second half worth stating:
**never read a producer's derived column either, when its inputs are on the same
page.**

---

*This document is an audit record, not a working document. No live document was
edited to produce it. The only file changed outside this record is
`research/audit-numbers.js`, which gained section X and nothing else.*
