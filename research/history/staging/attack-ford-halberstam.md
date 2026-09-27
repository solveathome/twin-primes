# Attack Ford–Halberstam: the dual decomposition its authors said should win

<!-- ledger
id: Q-ford-halberstam
status: CLOSED
todo: none
question: Does Ford and Halberstam's dual decomposition beat Brudern-Fouvry's (2.6), as its authors said it should?
verdict: No: the dual is the same inequality, verified to 3.553e-15 at r = 2 and 6.821e-13 at r = 2..7, and their estimation step is better than they claimed, the Rosser boundary layer making their absolute-value bound an identity with loss 0.000000000 at z = 20, 30, 42; the shortfall is the freedom the step gives up, one level per component and no lower sieve.
-->

**HEADLINE. It should not, and the reason is exact. Ford and Halberstam's dual
is not a different inequality from Brüdern–Fouvry's (2.6) — it is the SAME
inequality, verified to `3.553e-15` at `r = 2` and `6.821e-13` at `r = 2..7`,
and their sentence is precise in saying so: the claim is entirely about how the
`y_ℓ − x_ℓ` terms are estimated. Their estimation step turns out to be BETTER
than they claimed, not worse: the Rosser boundary layer `χ̄⁺` is supported on
`ν(d)` ODD only, so `μ(d) = −1` throughout and their absolute-value bound is an
IDENTITY, `y − x = Σ χ̄⁺` exactly, loss `0.000000000` over 4849845 / 2989692 /
3000001 positions at `z = 20, 30, 42`; and the boundary layer stays strictly
under the level `D` (ratios `0.358423`, `0.513683`, `0.372761`), so it costs no
level either. The shortfall is not a defect in the step, it is the freedom the
step gives up. Because the boundary layer belongs to the SAME `χ⁺`, the dual
has one level per component and no lower sieve, so it is exactly `(2.6)` with
`D⁻ = D⁺` imposed — and the majorant/minorant asymmetry `D⁻/D⁺ = 1.313086` is
what Brüdern and Fouvry are paid for. In level currency `K_FH = 2(1+√e) =
5.297442541400` against `K_BF = 5.158064680330`, worse by `0.139377861070`
(2.702135 per cent). In OUR configuration the dual returns exponent
`5.297443` at `θ_total = 1` and `5.141635` loaded with the best published
cancellation, against `β₂ = 4.266450`; it needs `θ_total > 1.241651065543`
where `(2.6)` needs `1.208982722591`, and `γ ≤ 0.805379247` where `(2.6)` needs
`0.827141680`. And in BRÜDERN–FOUVRY'S OWN PROBLEM, against all four side
conditions of their Proposition 2, the dual returns `4.359140915496` against
their published `4.156000022150` — it loses to their own constant by
`0.203140893346` and does not even reach `β₂`. The named reason for the
shortfall: `f` is optimal at `κ = 1`, so the dual's per-component bound cannot
beat the Rosser minorant it declines to use.**

Script: `research/attack-ford-halberstam.js` — 75.8 s, exit 0, OUTPUT block
written by `research/qc/embed.js` (code-sha256 `afa28b3a15e65afe…`, out-sha256
`f3de984f4221d782…`), re-verified with `--check`. Every figure below is the
machine's. Ten READINGS in the tail.

---

## 1. The source, read at the page

Ford, K. and Halberstam, H., *The Brun–Hooley Sieve*, **J. Number Theory 81**
(2000) 335–350, doi `10.1006/jnth.1999.2479`. Read here from the author's copy
at `ford126.web.illinois.edu/wwwpapers/hooleysieve.pdf` (15 pp., sha256
`af299c3fd776e8a5271fe6ee6f0c7f1f1e621cd85912599b6250e1452aa20ece`,
pdfTeX‑0.14f, dated 2000‑11‑06), from a **300 dpi rendered page image of page
15**. The author's copy is unpaginated against the journal, so the printed
journal page of the sentence is **not** asserted here; the ScienceDirect
version was not obtained.

The introduction, **author's copy p. 1**, flags the intent:

> "We shall put forward also a 'dual' form of Hooley's method that probably has
> relevance to the multi-dimensional vector sieve of Brüdern and Fouvry
> ([BF1],[BF2])."

The claim itself, **author's copy p. 15**, closing §5 *A dual of Hooley's
method*:

> "This seems to us superior to Lemma 13 of [BF1] or (2.6) of [BF2] in the
> treatment of the '`y_ℓ − x_ℓ`' terms, and should lead to better results."

with `[BF1]` = Brüdern–Fouvry, *Lagrange's Four Squares Theorem with almost
prime variables*, J. reine angew. Math. **454** (1994) 59–96, and `[BF2]` =
*Le crible à vecteurs*, Compositio Math. **102** (1996) 337–355.
**[PROVEN, their p. 15 and p. 1.]**

**What the dual is.** Their Lemma 1, **author's copy p. 2**, inequality (4):

    x1 ... xr  >=  y1 ... yr  -  sum_{l=1..r} (y_l - x_l) prod_{j != l} y_j,
                                                        0 <= x_j <= y_j.

At p. 15 it is applied to `A = {∏_{j=1..r}(a_j n + b_j) : n ≤ x}` with
`y_j = Σ_{d|(a_j n+b_j, P)} μ(d)χ⁺(d)`, `χ⁺` **the LINEAR upper Rosser–Iwaniec
sieve** (their capitals), `x_j = Σ_{d|(a_j n+b_j,P)} μ(d)` the true indicator,
and the correction term written as

    sum_{l=1..r} ( sum_{d|(a_l n+b_l,P), p-(d)=p-((a_l n+b_l,P))} chibar+(d) )
                 * prod_{j != l} ( sum_{d|(a_j n+b_j,P)} mu(d) chi+(d) )

where `χ̄(1) = 0` and `χ̄(d) = χ(d/p⁻(d)) − χ(d)` for `d > 1` (their p. 3), and
the bound on `y_ℓ − x_ℓ` comes from the DHR/HR identity, their Lemma 2 (7)/(9),
p. 4. **There is no lower-bound sieve anywhere in it.**

**What it replaces.** Brüdern–Fouvry (2.6), transcribed from a **400 dpi
rendered page image** of numdam `CM_1996__102_3_337_0`, sha256
`74b805107add9830…`, **PDF page 6 = journal page 341**, the display at the foot
of the page — the numdam text layer drops it entirely:

    (mu*1)(n1)(mu*1)(n2) >= L1+(n1) L2-(n2) + L1-(n1) L2+(n2) - L1+(n1) L2+(n2)

with (2.5), same page, fixing `Λᵢ⁻ ≤ μ*1 ≤ Λᵢ⁺ (i = 1 ou 2)`. **Four** free
functions: an upper and a lower sieve per component. **[PROVEN, their p. 341.]**

## 2. The dual is the same inequality, and its estimation step is lossless

**§A. The algebra.** `FH-RHS = y₁y₂ − (y₁−x₁)y₂ − (y₂−x₂)y₁` and
`x₁y₂ + x₂y₁ − y₁y₂` agree to `3.553e-15` over 200000 random admissible pairs;
at general `r` the FH right side and `Σ_ℓ x_ℓ ∏_{j≠ℓ} y_j − (r−1)∏_j y_j` agree
to `6.821e-13` over `r = 2..7` **[VERIFIED, §A1–A2]**. Lemma 1 at `r = 2` is
`(y₁−x₁)(y₂−x₂) ≥ 0` rearranged, which is the standard derivation of the vector
sieve. And `BF-RHS ≤ FH-RHS` pointwise whenever `w ≤ x ≤ y`, 0 violations in
200000 draws **[VERIFIED, §A3]**: (2.6) is the *weakened* form of the same
identity, weakened exactly by `x_ℓ → Λ_ℓ⁻`.

**So the whole claim is about the `y_ℓ − x_ℓ` estimation**, precisely as their
sentence says. Three things were checked about that step, and **the first two
are in Ford and Halberstam's favour**.

**§B2/B5. The step is an identity, not an inequality.** Building Rosser's `D⁺`
explicitly in the corpus convention (`research/sift-limit-attack.js`:27–45),
`χ̄⁺(d) = 1` occurs **only** for `ν(d)` odd — 7, 23 and 34 support elements at
`z = 20, 30, 42`, every one of odd `ν` **[VERIFIED, §B2]**. Hence `μ(d) = −1`
throughout the support and FH's absolute-value bound throws away nothing.
Pointwise over 4849845 / 2989692 / 3000001 values of `n` (full period at
`z = 20`, coprime strides above), `y − x = Σ χ̄⁺` with **0 failures**, and the
Rosser sandwich `w ≤ x ≤ y` holds with **0 failures** **[VERIFIED, §B5]**.
Loss `0.000000000`.

*This is a small correction to the paper's own modesty.* At their (5), p. 2,
the relation is stated as `0 ≤ y_ℓ − x_ℓ ≤ Σ …`. For the Rosser–Iwaniec `χ⁺`
of their §5 the right inequality is an **equality**.

**§B3. The step costs no level.** `max d` in `supp(χ̄⁺)` is 1001, 4199, 7429
against `D = 2792.8, 8174.3, 19929.7`, ratios `0.358423`, `0.513683`,
`0.372761` **[VERIFIED, §B3]**. The boundary layer never leaves level `D`, so
no factor `z` is paid — the obvious `d < D·p⁻(d) ≤ Dz` bound is not tight.

**§B1. The hypothesis holds.** Rosser's `D⁺` is truncation-closed (0 failures)
and, at every parameter tested, **fully divisor-closed** (0 of 91, 211, 417),
so FH's stated hypothesis (iii) on p. 3 is satisfied and their Lemma 2 applies
to the Rosser–Iwaniec sieve as they intend **[VERIFIED, §B1]**. Also verified:
their identity (9) holds for every divisor `D'` of `P` (0 of 128, 512, 4096
failures) **[VERIFIED, §B4]**.

**Nothing in the mechanism is defective. What follows is a pricing of the
freedom it gives up, not of a mistake.**

## 3. The ceiling, and the pricing in our configuration

**The ceiling, and it is where the negative comes from.** Because the boundary
layer belongs to the SAME `χ⁺` at the SAME level, the dual's per-component
bound is

    x_l  >=  y_l  -  (boundary sum of chi+ at level D_l),

and by §B3 every modulus in it is `≤ D_l` once the inner condition
`p⁻(d) = p⁻((n,P))` is expanded by upper sieves of level `D_l/d` (the classical
Rosser iteration; composite moduli `d · D_l/d = D_l`). It is therefore **a
linear-sieve lower bound of level `D_l`**, and by the optimality of `f` at
`κ = 1` — Selberg's parity example; Iwaniec, *A new form of the error term in
the linear sieve*, Acta Arith. **37** (1980) 307–320 — its main term cannot
exceed `W f(s_l)`, `s_l = log D_l / log z`. **[PROVEN, given that optimality.]**

**So the dual is at best `(2.6)` with `D⁻ = D⁺` imposed.** Everything below
grants it that ceiling, i.e. assumes the expansion is as good as Rosser's own
minorant, which is the reading most favourable to it.

**§C1–C3. Level currency.** Minimising the total level exponent subject to
positivity, with `F(s) = 2e^γ/s`, `f(s) = 2e^γ ln(s−1)/s`, `f/F = ln(s−1)`:

| inequality | positivity condition | min total level | at |
|---|---|---|---|
| BF (2.6) | `2 f(s⁻) > F(s⁺)` | **`K_BF = 5.158064680330`** | `s⁺ = 2.229949005179`, `s⁻ = 2.928115675151`, ratio `1.313086383747` |
| FH dual | `ln(s₁−1) + ln(s₂−1) > 1` | **`K_FH = 5.297442541400`** | `s₁ = s₂ = 1+√e = 2.648721`, symmetric |

`K_FH − K_BF = 0.139377861070`, **2.702135 per cent**, identical under the
strict sieve windows (`F` on `[1,3]`, `f` on `[2,4]`) and under extended ones
**[VERIFIED, §C1–C3]**. `K_BF` reproduces the corpus's `K = 5.1580646803` at
`b/a = 1.3130863738` to ten places, and `K_FH` reproduces `2(1+√e)` exactly.

**§C4. Exponents, against `β₂ = 4.266450284149`.**

| configuration | `θ_total` | `u` from (2.6) | `u` from the dual | beats `β₂`? |
|---|---|---|---|---|
| `θ_total = 1` (defensible, `sift-limit-attack.md` §7b) | 1.000000 | 5.158065 | **5.297443** | neither |
| DFI 1997 at ratio 1 (`κ=3/8, λ=11/48`) | 1.012048 | 5.096659 | **5.234378** | neither |
| **Bettin–Chandee 2015 at ratio 1** (`κ=7/20, λ=1/4`) | **1.030303** | 5.006357 | **5.141635** | neither |
| `θ_total = 5/4` (BF Prop 2 condition (iv)) | 1.250000 | 4.126452 | 4.237954 | both |

The `θ` column re-derives `1.030303` and `1.012048` from the published bound
shape `1/2 + κ(2θ−1) + λθ·r/(1+r) ≤ 1` at `r = 1`, matching
`attack-sqrt-cancellation.md` §6 **[VERIFIED, §C4]**. Ratio 1 is the right row
because **the dual forces both moduli to the same level**; (2.6) is free to sit
at `1.313086` and the corpus's `5.090707` for (2.6) comes from that joint
optimisation, which is why the (2.6) column here reads `5.006357` at the
ratio‑1 row rather than `5.090707`. The comparison that matters is
**`5.141635` against `5.006357` at the same input**.

**§C5–C6. Break-even and `γ`.**

    theta_total needed to reach beta_2:   BF (2.6)  1.208982722591
                                          FH dual   1.241651065543
                                          extra     0.032668342952  (2.702135 %)

    gamma needed at the break-even split: BF (2.6)  0.827141680  (M=H^0.522671, N=H^0.686312)
                                          FH dual   0.805379247  (M=N=H^0.620826)
    best published (Bettin-Chandee 2015, aligned)   0.970624
    shortfall                             BF 0.143482320   FH 0.165244753

**[VERIFIED, §C5–C6]**. The corpus's working-point figure `γ ≤ 0.824975`
corresponds to `θ_total = 1.212157`, i.e. to the split `a = 1/2` that buys the
diagonal for free; `0.827141680` here is the unconstrained break-even. Both
are worse for the dual.

**§C7. A second, independent loss.** In (2.6) the `Λ⁺Λ⁺` diagonal carries
moduli `D⁺² = H^{2a}`, and the corpus working point takes `a = 1/2` exactly so
that term is `H` and free (`attack-theta-last-gap.md` §2). **In the dual all
three terms carry `D₁D₂ = H^{θ_total}`**, so the diagonal can never be free; at
the dual's optimum it sits at `H^1.241651066`, over the window by
`H^0.241651066` **[VERIFIED, §C7]**. This is on top of the `0.139377861` of
§C3, not inside it.

## 4. Priced in Brüdern–Fouvry's own configuration

The claim was made about *their* problem, so it is priced there too, against
**all four** side conditions of their Proposition 2 (p. 345) — the trap this
ground sprang once. In the `κ → 0` limit, with `d₁ = log_x D₁`,
`d₂ = log_x D₂`, they read `d₁ ≤ 1`, `d₁+2d₂ ≤ 2`, `2d₁+3d₂ ≤ 3`,
`4d₁+4d₂ ≤ 5` (transcribed at 600 dpi in `attack-bf-split.md` §1).

| | `ξ` | exponent `1/ξ` | levels | `θ_total` |
|---|---|---|---|---|
| BF (2.6) as published | `0.240615975618` | **`4.156000022150`** | majorant `x^{1/2}`, minorant `x^{3/4}` | 1.25 |
| BF (2.6) re-optimised | — | `4.155791838187` | majorant `x^0.502674`, minorant `x^0.745990` (`attack-bf-split.md`) | — |
| **FH dual, best possible** | `0.229402999211` | **`4.359140915496`** | `x^0.541194017`, `x^0.688208975` | `1.229402992` |
| FH dual, extended windows | `0.229409508567` | `4.359017227526` | `x^0.538234921`, `x^0.692647619` | `1.230882540` |
| `β₂` | — | `4.266450284149` | — | — |

**[VERIFIED, §D1–D3.]** Slot feasibility was checked in both assignments: the
dual's optimum is legal only in **assignment B** (`D₁ = x^0.688209`,
`D₂ = x^0.541194`), where **(iii) binds** to slack `-0.000000` with (i), (ii),
(iv) slack `0.311791`, `0.229403`, `0.082388`; assignment A violates (iii) by
`0.147015`. Both slots are open to the dual because the Rosser `λ⁺` is well
factorable and the boundary sum has `‖·‖_∞ ≤ 1`, so the well-factorability
hypothesis on slot 2 is met either way.

**The dual loses to their own published constant by `0.203140893346`, and does
not even reach `β₂`, falling short by `0.092690631348`.** Two separate causes,
both visible in the table: it forfeits the `2.702135` per cent in the
positivity constant, **and** the symmetric-level constraint drags `θ_total`
from `1.25` down to `1.229403`, because condition (iii) is asymmetric and bites
harder on a symmetric split.

**So "should lead to better results" is false at `r = 2` for linear
components, in their own setting.**

**§E. Nor at any `r`.** With the closed forms extended past their sharp windows
(the reading most favourable to the dual), the excess `K_FH − K_BF` is
`0.139377861070`, `0.265894922263`, `0.391641248638`, `0.517545488091`,
`0.643679867998` at `r = 2, 3, 4, 5, 6` **[VERIFIED, §E]**. It grows with `r`.

**What would have to be true for the claim to hold, stated fairly.** The
ceiling argument uses the optimality of `f` at `κ = 1`. Where no good
lower-bound sieve exists — components of dimension `κ > 1`, where DHR's
`f_κ` is far from optimal and is identically zero below the sifting limit —
the ceiling does not bite, and the dual can genuinely beat (2.6) because its
correction term is not a sieve minorant at all. **That is the setting FH's own
§5 is written in**: their p. 14 says "the problem of estimating `S(A,P)` is of
'dimension' `r`, that is, has `κ = r`", and their whole paper is about
partitioning `P` so that Brun–Hooley handles high dimension. **It is not our
setting.** Our two components are each `κ = 1` and each is sieved by the
optimal linear sieve, which is exactly the one case where the dual has nothing
to add. **[INFERRED, from the ceiling argument plus their §5's own framing.]**

## 5. Does it transfer to `G₂`? No, and for the same reason nothing else has

**It does not, and the failure is inherited whole.** Every result above is a
MAIN-TERM inequality. The identified obstruction to transfer lives in the
REMAINDER: by reciprocity `e(hρ/(d₁d₂)) = e(−hN/(d₁d₂))·e(−2h·d̄₁/d₂)`, and the
left factor is `O(x^ε)` for Brüdern–Fouvry, because their window length equals
their element size, and `O(N/H)` for us with `N` running to `P(z)`
(`research/sift-limit-attack.md` §7b). The dual changes which weights sit in
the bilinear form; it does not touch that factor, and it does not change the
shape `Σ_{d₁,d₂} λλ · e(−hx/(d₁d₂))·e(−2h·inv(d₁)/d₂)` that
`attack-sqrt-cancellation.md` §2 verified exactly. Worse, the dual makes the
remainder problem **harder** on both axes it does move: it needs `γ ≤ 0.805379`
instead of `0.827142`, and it removes the free diagonal.

**A gain in their problem would still have been worth recording as theirs. There
is no gain in their problem either (§4), so there is nothing to label.**

## 6. Prior art: has anyone carried it out in 26 years?

**[ABSENT: no work carries out the Ford–Halberstam dual in place of
Brüdern–Fouvry (2.6), in any dimension.]** The evidence is full-text greps and
an empty citation intersection, not merely empty search pages. Channels, all
calibrated in this session:

| channel | calibration probe, this session | result | negative claimable? |
|---|---|---|---|
| Semantic Scholar `/citations` | known-true edge FH→BF: `CorpusID:125534041/citations` → 13 citers, **Ford–Halberstam present**, verified independently from FH's own reference list on the rendered p. 15 | FH's own citers enumerated, **16**; every one uses §§1–4 as a fundamental lemma | **yes** |
| Semantic Scholar `/references` | — | `data: null`, publisher elided the reference list | **NO** |
| OpenAlex citation graph | `works/W2581797856` returns BF (cited_by 10); `title.search:brun-hooley sieve` returns FH `W1967298466` (cited_by 14) | 14 citers enumerated; intersection of FH's citers with BF‑1994's (87) and BF‑1996's (10) is **EMPTY** except FH itself | **yes**, with the caveat below |
| OpenAlex full text | `fulltext.search:"crible à vecteurs"` → count 2, one the paper's own text | `"Brun-Hooley"` → **21** works, all accounted for; `"vector sieve" AND "Brun-Hooley"` → **2** (FH itself and a 2002 book review); `"dual of Hooley"` → **0**; `"dual form" AND "vector sieve"` → **1** (FH itself) | **yes**, for the OA index |
| arXiv metadata API | `all:"vector sieve"` → **4** papers, matching the prior session's record | `all:"Brun-Hooley"` → **0** | **NO** for full text — arXiv has no public full-text index |
| arXiv + author sites, hand-grepped | every file separately passed a positive control (`"vector sieve"` present, or `sieve` count > 30, so extraction is known to work) | **39 PDFs** downloaded and `pdftotext`-grepped, incl. 23 vector-sieve papers: **zero** occurrences of "Brun-Hooley" or Ford–Halberstam in any of them | **yes**, for those 39 |
| zbMATH metadata | `search_string=Brun-Hooley sieve` returns the target, Zbl id 1443345 | zbMATH's entire holdings mentioning "Brun-Hooley" number **four**, all four accounted for | metadata yes, citations **NO** (no API) |
| WebSearch, deep PDF | `"Multidimensional vector sieve"` — a phrase on p. 32 of a PDF and absent from its abstract — returns arXiv 1705.09133 as hit 1, so PDF interiors are indexed | ~12 queries; every hit is FH, an application of §§1–4, or an unrelated sibling | **yes** |
| MathSciNet | — | paywalled, not consulted | **NO** |

**The decisive fact is not statistical.** Schindler–Sofos, *Sarnak's saturation
problem for complete intersections*, Mathematika (2018), arXiv 1705.09133,
Lemma 5.1, build the **"Multidimensional vector sieve"** — the arbitrary-`r`
object FH's §5 sketched — and build it the Brüdern–Fouvry way, from
`∏(1∗μ)(mᵢ) ≥ Σᵢ (1∗λ⁻ᵢ)(mᵢ)∏_{j≠i}(1∗λ⁺_j)(m_j) − (n−1)∏ᵢ(1∗λ⁺ᵢ)(mᵢ)`,
requiring **both** `λ⁺` and `λ⁻`. **Ford–Halberstam is not in its
bibliography.** The proposal was not weighed and rejected; it went unread.

**Second decisive fact: the co-author of the paper did not carry it out
either.** Ford's *Sieve methods lecture notes*, Spring 2023
(`ford126.web.illinois.edu/sieve2023.pdf`, sha256 `a6e8462f1e766066…`, 7355
extracted lines) has §2 "The Brun–Hooley sieve: upper bounds" and §3 "The
Brun–Hooley sieve: lower bounds", cites FH 2000 as `[56]` in the bibliography,
and contains **zero** occurrences of "vector sieve" or "Brüdern"
**[VERIFIED here, greps run in this session]**. §3 applies inequality (4)
across a partition of the primes for a single `n` — the 2000 paper's Lemma 1,
not the §5 dual across `r` linear forms.

**One near miss, scoped carefully because it is easy to overstate.** Fouvry and
Michel, *Sur le changement de signe des sommes de Kloosterman*, **Annals of
Mathematics 165** (2007) 675–715, **journal page 680** (PDF page 6, sha256
`02290f1b8cad5220…`), read from a **400 dpi rendered page image**:

> "Nous la traitons par une adaptation du crible de Selberg (version majoration)
> en dimension 2, mais il y a certainement d'autres possibilités: la première
> version de cet article partait du crible de Brun dans la version très élégante
> que l'on trouve dans [FH], mais menait à une valeur plus grande de `u₀` au
> Théorème 1.3."

So **Fouvry — co-author of both `[BF1]` and `[BF2]` — read Ford–Halberstam,
built a first version of a two-dimensional sieve problem on it, got a worse
constant, and switched to a two-dimensional Selberg majorant.** **[PROVEN,
their p. 680.]** What this is NOT: it is not a test of the §5 dual. Their
object is an upper-bound problem they name a *crible étrange*, with a
three-term approximation formula, and the passage says "le crible de Brun dans
la version très élégante que l'on trouve dans [FH]" — the paper's §§1–4
machinery, not its §5 dual. It is corroboration of direction, at the weakest
strength that supports: the one person best placed to act on the proposal used
the paper and got a worse number. **[INFERRED, and labelled.]**

**Where a negative cannot be claimed, recorded so nobody reads this as more
than it is.** MathSciNet was not consulted and is the authoritative list.
OpenAlex demonstrably under-reports here: two false negatives were caught
against it in this session (Ramaré–Viswanadham `10.1090/tran/9598`, found only
via OpenCitations, and Diouf arXiv:2310.08144, found only via WebSearch, both
of which do cite FH), so its empty intersection corroborates and does not carry
the finding — the 39 full-text greps do. Four documents were **not obtained**
and their bibliographies are unverified: Greaves, *Sieves in Number Theory*
(Springer Ergeb. Math. 43, 2001); Friedlander–Iwaniec, *Opera de Cribro* (AMS
Colloq. 57, 2010); Koukoulopoulos, *The Distribution of Prime Numbers* (GSM
203, 2019), which OpenAlex records as citing FH but whose citation context is
unread; and Halberstam, *A sieve application*, Asian J. Math. **4** (2000)
831–838, read as a zbMATH review only. **`[BF1]`'s Lemma 13 was not read
directly** (Crelle 454 is paywalled), so the half of FH's sentence that
concerns `[BF1]` is priced only through `[BF2]`.

## 7. Corrections to draft into the corpus (this report edits nothing)

**(1) `history/staging/attack-bf-split.md` §6, final paragraph.** It records the
lead as "an explicit, published, never-executed claim that the vector-sieve
inequality (2.6) — the *pointwise* inequality, not the level split — can be
beaten … It is a live and independent lead, and it is a better one than the
re-split ever was." The first half stands; the last sentence should be
retired. Replace with:

> **CLOSED 2026-08-19.** The dual is not a different pointwise inequality: at
> every `r` it rearranges to `Σ_ℓ x_ℓ ∏_{j≠ℓ} y_j − (r−1)∏_j y_j`, which is
> (2.6) with the true indicator in the minorant slots. Their estimation of
> `y_ℓ − x_ℓ` is lossless (`χ̄⁺` is supported on `ν(d)` odd, so the absolute
> bound is an identity) and costs no level, but it forces `D⁻ = D⁺`, and the
> resulting per-component bound is a linear-sieve minorant of level `D`, hence
> capped by `f`. Level currency `2(1+√e) = 5.297442541400` against
> `5.158064680330`; in BF's own problem `4.359140915496` against their
> published `4.156000022150`; in ours `5.297443` at `θ_total = 1` against
> `β₂ = 4.266450`. `research/attack-ford-halberstam.js`,
> `history/staging/attack-ford-halberstam.md`.

**(2) `research/sift-limit-attack.md` §7b(2), the transfer paragraph.** Add,
after the one-factor statement:

> The Ford–Halberstam dual, the only other published inequality aimed at this
> slot, does not help: it is (2.6) with `D⁻ = D⁺` imposed, needs
> `θ_total > 1.241651065543` where (2.6) needs `1.208982722591`, and leaves the
> `e(−hN/(d₁d₂))` factor untouched. `attack-ford-halberstam.md` §5.

**(3) `research/SEARCH-CONVENTIONS.md`.** A row is missing for this object. The
owning convention for the FH proposal is **"Brun–Hooley sieve"** (four
documents in zbMATH's entire holdings) and, for what it would be used on,
**"multidimensional vector sieve"** — the phrase Schindler–Sofos use for
exactly the `r`-dimensional object FH sketched. Searching under "vector sieve"
alone misses the Brun–Hooley half; searching under "Brun–Hooley" alone misses
Schindler–Sofos, who built the object without citing FH.

**(4) `research/PRIOR-ART.md`.** The FH lead entered as "worth a session". It
has had one. Record it as CLOSED with the numbers of (1), and record the two
facts that make the absence solid: Schindler–Sofos built the multidimensional
vector sieve in 2018 from Brüdern–Fouvry without citing FH, and Ford's own 2023
lecture notes present Brun–Hooley with no mention of the vector sieve at all.

**(5) A small correction to the published paper, if this is ever written up.**
Their (5) on p. 2, `0 ≤ y_ℓ − x_ℓ ≤ Σ_{d|(a,P_ℓ), ν(d)=k_ℓ+1} 1`, and the
corresponding bound at p. 15, are stated as inequalities. For any `χ` whose
`χ̄` support has constant `ν`-parity — which includes both their Brun example
`χ^{(k)}` and the Rosser–Iwaniec `χ⁺` of their §5 — the right-hand relation is
an **equality**. Verified at `z = 20, 30, 42` over 4849845 / 2989692 / 3000001
positions with 0 failures. This makes their step stronger than they claim and
does not rescue the conclusion.

**(6) The method lesson, for `primeoire-campaign-lessons`.** *A published
"should lead to better results" is a hypothesis, not a lead with a sign.* This
one was correct in every detail except the one that decides it: the mechanism
is sound, the estimation step is better than advertised, and the proposal still
loses — because its cost is a freedom forfeited, and forfeited freedoms are
invisible in the sentence that proposes the method. **The way to price such a
claim is to ask what the new object CANNOT do that the old one could, before
asking what it does better.**

## 8. Custody

Every figure above is from the OUTPUT block of
`research/attack-ford-halberstam.js`, which `research/qc/embed.js` wrote from a
completed 75.8 s run (code-sha256
`afa28b3a15e65afe5fc255059c35f77b8293f8c1940be3b3dd5e8efd4af647b5`, out-sha256
`f3de984f4221d78209e06fe424dd3013fcc8fd9b11727516d616564a2e3e2fec`, node
v22.21.0, invocation `node research/attack-ford-halberstam.js`), re-verified
with `--check`. Nothing was hand-pasted.

Published mathematics, all from **rendered page images**, never from a text
layer:

| source | file sha256 (first 16) | page | dpi | what was read |
|---|---|---|---|---|
| Ford–Halberstam, author's copy | `af299c3fd776e8a5` | p. 15 | 300 | the "superior … should lead to better results" sentence, and the full dual display with `χ̄⁺` and the `p⁻(d)` condition |
| Brüdern–Fouvry, numdam `CM_1996__102_3_337_0` | `74b805107add9830` | PDF 6 = journal 341 | 400 | **(2.5) and (2.6) verbatim** — the numdam text layer drops the (2.6) display entirely |
| Fouvry–Michel, Annals 165 (2007) | `02290f1b8cad5220` | PDF 6 = journal 680 | 400 | the *crible étrange* passage and the `[FH]` sentence |

Text-layer greps (used only for locating and for absence, never for quoting):
Ford's `sieve2023.pdf` (`a6e8462f1e766066`), Nath–Xie arXiv 2501.16723, and
the 39-PDF sweep corpus, each with a positive control.

The four side conditions of Brüdern–Fouvry's Proposition 2 are taken as
transcribed at 600 dpi in `history/staging/attack-bf-split.md` §1 and were not
re-imaged here; §D depends on them and inherits that custody.
