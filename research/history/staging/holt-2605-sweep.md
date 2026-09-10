# Holt sweep, fifteenth manuscript: arXiv:2605.19165

<!-- ledger
id: Q-holt-2605
status: ANSWERED
todo: none
question: Does the fifteenth Holt manuscript, arXiv:2605.19165, contain anything that touches our record?
verdict: No: it carries no twin, no max-gap bound and no G2, its |s|/2 threshold restates the 2603.25915 / 1408.6002 inequality, and the interaction check is negative, our extinction law diverging from his by a factor 396 across three decades of W; the sweep is now complete at fifteen of fifteen.
-->

*Staging note, 2026-08-19. Completes the Holt prime-gaps corpus sweep begun in
`research/PRIOR-ART.md` §"Full corpus sweep, 2026-08-17", which covered fourteen
of fifteen manuscripts. This file edits no live document; the edits it proposes
to `PRIOR-ART.md` are listed in §6 and are not applied here.*

**Provenance.** PDF pulled from `https://arxiv.org/pdf/2605.19165` (4,256,984
bytes, 14 pages, PDF 1.7); metadata from the arXiv API (`id_list=2605.19165`).
Converted with `pdftotext -layout` for scanning. **Every load-bearing passage was
then read as a page image** (`pdftoppm -r 150`): PDF pages 7, 9, 10, 11, 12. The
prose text layer reproduces the page images word for word on pp. 10–12; the
Figure 4/5 and Table 1/2 text layers do not, and nothing in this note rests on
them except where a page image is named.

---

## 1. The sweep row

| field | value |
|---|---|
| identifier | arXiv:2605.19165v1 [math.NT] |
| title | *On nonconvex constellations among primes II: (J, \|s\|) = (458, 3240)* |
| author | Fred B. Holt (alone; not Holt–Rudd) |
| submitted | 18 May 2026, 22:40:26 UTC; paper's own dateline "19 May 2026" |
| version | v1, the only version |
| length | 14 pages, 7 figures (announced); printed objects are Figures 1, 2, 3, 5, 6, 7 and Tables 1, 2 |
| MSC | 11N05, 11A41, 11A07 |
| keywords | primes, gaps, prime constellations, Eratosthenes sieve |
| code | `https://github.com/fbholt/primegaps-v2` — the repository the corpus already cloned |

**Abstract**, from the arXiv API record, verbatim:

> Extending our work on the $k$-tuple conjecture, we previously applied those
> methods to the Engelsma counterexamples (narrow constellations) of length
> $J=459$ and span $|s|=3242$. Here we extend that analysis to the $116$
> Engelsma counterexamples of length $J=458$ and $|s|=3240$.
> We track the evolution of these $116$ counterexamples from inadmissible
> driving terms starting in the cycle of gaps ${\mathcal G}(11^\#)$ up through
> their first appearance in ${\mathcal G}(113^\#)$. We continue developing
> primorial coordinates for each admissible instance through a breadth-first
> exhaustive search through ${\mathcal G}(211^\#)$.
> Each of the $(458,3240)$ constellations sits inside a $(459,3242)$
> constellation, which we call its {\em parent}. We show that no $(458,3240)$
> constellation occurs outside of its parent until the cycle
> ${\mathcal G}(227^\#)$. The early evolution of the $(458,3240)$ constellations
> is dominated by the evolution of their parents, which we have previously
> studied.
> For each $(458,3240)$-counterexample we calculate its asymptotic relative
> population, among other constellations of length $J=458$.

### The row as PRIOR-ART.md's table wants it

| paper | year | what it holds | touches our G2? |
|---|---|---|---|
| 2605.19165 On nonconvex constellations II: (458, 3240) | 2026 | the 116 Engelsma (458, 3240) counterexamples as heads and tails of the 58 (459, 3242) parents; the in-parent / out-of-parent population matrix; the \|s\|/2 threshold restated | no |

### The rubric, answered

- **Does it touch our G₂ — the spacing between consecutive occurrences of the
  gap g = 2?** **No.** The string `g = 2` occurs eight times, every one of them
  naming the *extremal* gap of a (459, 3242) constellation, the one dropped from
  the front or the back to produce a (458, 3240) child ("These constellations all
  begin and end with a gap g = 2", p. 2). No quantity in the paper is a distance
  between two occurrences of g = 2. Our G₂, and its localized form M(x, x^k), are
  outside the paper's subject.
- **Does it touch any maximum-gap upper bound?** **No.** The words *maximum*,
  *upper bound*, *bound*, *spacing* and *Jacobsthal* have zero occurrences in the
  full text layer. The only extremal statement in the paper is a *lower* search
  limit: "No instance of any of the 116 (458, 3240)-counterexamples occur among
  primes before 9.7 E73" (p. 12, page image), the same 9.7E73 the corpus already
  records for the (459, 3242) family from 2603.25896.
- **Does "twin" appear, and in what role?** **The word does not appear at all.**
  A case-insensitive scan returns two hits, both of them the substring inside
  *entwined* / *entwined than one might expect* (p. 7). So 2605.19165 joins
  2502.20470, 2308.07570 and 2309.16833 as a fourth Holt manuscript with no
  occurrence of the word.
- **Polignac?** Zero occurrences.
- **What conjecture is it about?** Hardy–Littlewood's 1923 convexity conjecture
  (π(x+y) ≤ π(x) + π(y)), via nonconvex admissible constellations, π(|s|) < J.

---

## 2. The theorems, with every hypothesis

The paper carries exactly two numbered statements, **Lemma 1** and **Lemma 2**,
plus one displayed formula, **Equation (1)**. There is no theorem, corollary,
proposition or conjecture. Both lemmas were read as page images (pp. 4–6 for
Lemma 1's statement and proof, p. 10 for Lemma 2 and the start of its proof,
p. 11 for the end of the proof).

### Lemma 1 (p. 4), verbatim

> **Lemma 1.** *Let [2ŝ2] be a (459, 3242) counterexample of index 0 ≤ j ≤ 28,
> when the constellations are ordered by the prefixes of their primorial
> coordinates.*
>
> *Then [2ŝ] is a (458, 3240) counterexample of index j, and [2ŝ] first occurs
> outside of its parent in G(227#).*

and, continuing on p. 5, *"And [ŝ2] is also a (458, 3240) counterexample of index
j + 29, and [ŝ2] first occurs outside of its parent in G(269#)."*

**Full hypothesis list.** (i) [2ŝ2] is one of Engelsma's 58 (459, 3242)
counterexamples; (ii) its index j satisfies 0 ≤ j ≤ 28, i.e. it is in the half
whose unique inadmissible driving term in G(11#) has γ₀ = 107, not the reversed
half with γ₀ = 1271; (iii) the indexing is by the prefix of the primorial
coordinates. **The proof is by computation, not by argument**: "From the
computation summarized in Figure 5 we see that the unique prefixes extend into
G(131#)", and "Figure 4 tabulates the numbers of admissible residues … Cells are
highlighted in green when δ = 1. We observe that for all [2ŝ], this first occurs
for p = 227, and for all [ŝ2] this first occurs for p = 269." So 227 and 269 are
**measured on Engelsma's data**, not derived. Nothing in it is general.

### Lemma 2 (p. 10), verbatim, read as a page image

> **Lemma 2.** *Let s be a (458, 3240) constellation, and denote its (459, 3242)
> parent by [s2]. Let p and q be consecutive primes, and let ρ_s = q − ν_q(s) be
> the number of admissible residues mod q for s.*
>
> *Then the population n_out of s outside of its (459, 3242) parent and its
> population n_in inside its parent grow as*
>
> ```
> [ n_out(q#) ]   [ ρ_s   δ     ] [ n_out(p#) ]
> [ n_in (q#) ] = [ 0     ρ_[s2] ] [ n_in (p#) ]
> ```
>
> *Here δ = ρ_s − ρ_[s2] ∈ {0, 1}, with δ = 0 for q < 227 and δ = 1 for
> q > 1621.*

**Full hypothesis list, none of it optional.** (i) s is one of the 116
(458, 3240) Engelsma constellations — the lemma is stated for that family only,
and its δ ∈ {0, 1} clause is justified in the proof by "direct calculations of
ρ_s and ρ_[s2] across the … (458, 3240) constellations"; (ii) [s2] is the
(459, 3242) parent, so the child is the parent minus one extremal g = 2;
(iii) p and q are **consecutive** primes, so this is a single stage of the sieve;
(iv) ρ_s = q − ν_q(s) is the count of admissible residues mod q, the ν_p(s) of
2502.20470 §3; (v) the "δ = 0 for q < 227" half is **empirical**, from the table
printed on p. 7 as Table 1 (which the prose calls Figure 4); (vi) the
"δ = 1 for q > 1621" half is the only part with a general argument, and its
hypothesis is |s| = 3240, |[s2]| = 3242.

The upper-triangular shape carries a fact worth stating in its own right: the
lemma proves **n_out is fed by n_in but never the reverse** — "If the instance γ₀
is outside of its parent, then all ρ_s images of this instance in G(q#) remain
outside of the parent constellation." Instances leak out of the parent, one image
per stage per instance, and never leak back in.

### The |s|/2 clause, and its proof (pp. 10–11, page images)

The proof's final paragraph, verbatim across the page break:

> *On the other hand, under the recursion G(p#) ⟶ G(q#) [HR15], once q > 1621 all
> of the fusions between adjacent gaps occur in separate images of s and [s2]. So
> for q > 1621 we have ρ_s = q − 459 and ρ_[s2] = q − 460, and thereafter δ = 1.*

and the marking of it on p. 11, which is the passage the 2026-08-19 officer pass
already read:

> *We mark the thresholds J + 1 = 459 and |s|/2 = 1620 in the graph. The first
> threshold marks the point at which there are more residue classes mod p than
> there are possible fusions within the constellation s. At this point bare
> admissibility becomes trivial. The second threshold marks the point – half the
> span of the constellation – at which all fusions of adjacent gaps must occur in
> separate images of s under the 3-step recursion. Beyond this point δ = 1, and
> the curves all decline by factors of (p−460)/(p−459).*

**1620 = |s|/2 for the child and 1621 = |[s2]|/2 for the parent**, which is why
the lemma's clause reads q > 1621 while the graph is marked at 1620: the clause
has to clear both spans at once.

### Equation (1) (p. 12, page image) — where |s|/2 does load-bearing work

> *From [Hol25] the asymptotic relative population of a constellation s is the
> product of two factors. The first factor is the product of the number of
> admissible residues up through k = J + 1, and the second factor runs from
> J + 1 through half the span of s.*
>
> **(1)**  w_{s,J}(∞) = ∏_{q ≤ J+1} (q − ν_q) · ∏_{J+1 < q ≤ |s|/2} (q − ν_q)/(q − J − 1)

The second product **terminates at |s|/2** for exactly the reason the threshold
exists: past |s|/2 every factor is 1, because ν_q = J + 1 there. So |s|/2 is not
decorative in this paper — it is what makes an infinite product finite.

### Does anything go beyond what the officer found on p. 11?

**Three things, and one of them changes an attribution.**

1. **The threshold has a stated mechanism here, not only a marking.** The p. 11
   passage the officer read announces the threshold; the p. 10–11 proof of Lemma 2
   *uses* it and names the recursion it comes from ([HR15] = 1510.00743, the
   3-step recursion). Its consequence is quantitative: ρ_s = q − (J+1) and
   ρ_[s2] = q − (J+2) exactly, past the threshold.
2. **The threshold is load-bearing for the asymptotic populations**, through
   Equation (1)'s upper limit. That use is credited to [Hol25] = 2502.20470, so
   the formula is not new here.
3. **The corpus already holds this threshold, in a sharper form, under another
   name — and did before this paper surfaced.** `lit-pdf-holt-rudd.md` §3a
   records, verified against the PDF and quoted in `PRIOR-ART.md`, from
   arXiv:2603.25915v1 §1, PDF p. 6:

   > *"…we know that the minimum span between fusions is 2p_{k+1}. So provided
   > that |s| < 2p_{k+1}, the possible fusions in s all occur in separate images
   > of s."*

   `|s| < 2q` and `q > |s|/2` are the same inequality. The same fact appears as
   unnumbered prose in 1408.6002v1, PDF p. 11: *"the minimum distance between
   closures is 2 · p_{k+1}."* **So 2605.19165 p. 11 restates a fact the corpus
   already had from two other Holt manuscripts; what it adds is the numeral 1620
   drawn on a graph and the ρ_s = q − 459 consequence.** The officer's
   candidate-1(b) reading — that this is the published ancestor of "runs die once
   p is large enough" — survives, but **the citation should be the 2603.25915
   sentence the corpus already verified, with 2605.19165 as a secondary marking.**

### Errata noticed while reading (none load-bearing for us)

- The prose calls the p. 7 residue table "Figure 4" throughout §2; it is printed
  as **Table 1**, and no object labelled Figure 4 is printed.
- p. 11 opens "In Figure 6 we plot the proportion of occurrences…"; the plot is
  **Figure 7**, and its caption says it plots the ratio n_in/n_out while the
  plot's own title says "Proportion of occurrences … inside their parents".
- p. 12 states s₂₅ has asymptotic relative population **8.657E90**; Table 2's row
  "25, 90" reads **2.911E90**. The stated ratio 32.73 against s₂₉'s 8.896E88
  matches the table, not the prose figure, so the prose figure looks like the
  typo.
- Lemma 2's proof says "across the 59 (458, 3240) constellations"; the family has
  116, tabulated 58 at a time by reversal symmetry.

---

## 3. THE INTERACTION CHECK

**Question.** Our multi-kill extinction law measures the last fold carrying an
adjacent kill run L ≥ 2 in a window of length W. Holt's threshold says all
fusions occur in separate images of s past |s|/2. Is our measured crossing his
theorem in window coordinates?

### 3.1 The measured law, cited not recomputed

From `research/history/staging/attack-foldL-06-scaling.md` §4, whose figures are
the formally embedded output of `research/attack-foldL-06-scaling.js`:

| W | last fold with L ≥ 2 |
|---|---|
| 2·10⁷ | 181 |
| 2·10⁸ | 331 |
| 2·10⁹ | 421 (calibration window) |
| 2·10¹⁰ | 457 |

Two further cited figures matter below: at W = 2·10⁹, fold 421 carries
**105,790 kills** with mean spacing **m̄ = 89.1522** (§5 offset table); and at
W = 2·10¹⁰ the **last fold whose θ still fits under the window's G₂ is 1021**,
with the fold range stopping at **1499** in every window (§7).

### 3.2 What plays the role of s for a window of length W — the two honest readings

**Reading A, the window as the constellation.** Take s to be the window's
surviving word at level p. Its span is |s| ≈ W. Holt's threshold is then

    p > |s|/2 = W/2.

**Reading B, the window in our own alphabet.** Our slots are n ≡ 5 (mod 6), so
differences between slots are multiples of 6, and a fold p ≥ 5 divides a
difference 6m only if p | m with m ≤ W/6. Holt's argument in our alphabet gives
the one-class threshold p > W/6. The two-class branch (difference ≡ ±2 mod p,
which is the twin comb's extra channel) pushes it back up to p > (W+2)/2. So
reading B brackets the threshold between W/6 and W/2 and changes nothing that
follows.

### 3.3 The arithmetic. It does not predict our crossing, and it is not close

| W | Holt threshold W/2 | Holt threshold W/6 | measured extinction | W/2 ÷ measured |
|---|---|---|---|---|
| 2·10⁷ | 1.0·10⁷ | 3.33·10⁶ | 181 | 55,249 |
| 2·10⁸ | 1.0·10⁸ | 3.33·10⁷ | 331 | 302,115 |
| 2·10⁹ | 1.0·10⁹ | 3.33·10⁸ | 421 | 2,375,297 |
| 2·10¹⁰ | 1.0·10¹⁰ | 3.33·10⁹ | 457 | 21,881,838 |

**The scaling is the decisive part, not the size of the ratio.** Across
W = 2·10⁷ → 2·10¹⁰ the window grows by a factor 1000 and Holt's threshold grows
by the same factor 1000, because it is exactly linear in the span. Over the same
three decades the measured extinction fold grows by **457/181 = 2.525**. The two
laws diverge by a factor **1000/2.525 = 396 across three decades**, and the
divergence is unbounded. A linear-in-W statement cannot be a
grows-by-a-factor-2.5-per-thousandfold statement.

**Three further checks, each independently fatal to the identification.**

1. **The threshold lies outside the computed range entirely.** Every window's
   fold sweep stops at 1499. At W = 2·10¹⁰ Holt's W/2 = 10¹⁰ exceeds that ceiling
   by a factor 6.7·10⁶. His threshold is never reached in any window we
   measured, so it cannot be what the measurement crossed.
2. **The kill population is in the wrong regime by five orders of magnitude.**
   Past p > W/2 a window carries at most one or two fold-p kills, which is why
   coincidences become impossible there. At our measured extinction fold
   p = 421, W = 2·10⁹, the window still carries **105,790 fold-p kills**. What
   dies at 421 is not the supply of kills; it is their *adjacency*.
3. **The relations are different relations.** Holt's is
   `p | (γ_j − γ_i)` — residue coincidence, a function of the difference alone,
   deterministic, and exactly the condition of 2502.20470 Lemma 2. Ours is
   *adjacency in the surviving word at level p*: every slot strictly between the
   two kills was deleted at some earlier fold. That is a function of the whole
   sieve history below p and of nothing modular. `PRIOR-ART.md` already records
   the general form of this: Holt's coincidence count (J+1) − ν_p(s) is blind to
   where in the word the coincidences sit.

**Verdict: NOT the same statement. Our measured law is not his theorem.**

### 3.4 But there is a real correspondence, and it is already attributed

Run Holt's threshold at the right scale and it stops being a prediction and
becomes an identity. The "s" whose fusions are being tested when we ask whether
two fold-p kills can be adjacent is not the window: it is the **stretch between
the two candidate kills**, whose span must be at least θ_p = 2p − 2η (η = +1 for
p ≡ 1 mod 6, η = −1 for p ≡ 5 mod 6). For that local s,

    |s|/2 = (2p ∓ 2)/2 = p ∓ 1,

so Holt's threshold is p itself, at every fold, tautologically. **Holt's |s|/2
and our qualifying threshold θ_p ≈ 2p are the same fact read in two directions**:
"a span below 2q admits no two fusions in one image" run forwards is "two fusions
in one image are at least 2q apart" run backwards. That is precisely the
1408.6002 p. 11 sentence, *"the minimum distance between closures is 2·p_{k+1}"*.

So the map between the two frames is:

| Holt | ours |
|---|---|
| fusions in the **same image** of s | two kills at the **same fold** p |
| q \| (γ_j − γ_i) | difference ≡ 0, ±2 (mod p), the two-class form |
| minimum span between fusions = 2q ⟺ threshold \|s\|/2 | qualifying spacing θ_p = 2p − 2η |
| — | **adjacency in the level-p word**: no counterpart |
| — | **crossing of θ_p against the largest spacing W supplies**: no counterpart |

`proposals-prior-art.md` §6 already splits our extinction law into exactly these
two halves and attributes the first to Holt (1408.6002 p. 11) and the second to
the maximal-spacing convention (Lévy → Devroye → Deheuvels). **This sweep
confirms that split and adds nothing to Holt's side of it.** The extinction *fold*
is set by the half that is not his.

### 3.5 Where the two statements diverge, stated for a referee

1. **Modality.** His is a deterministic impossibility past a threshold. Ours is
   the extinction of an event that remains possible at every fold and merely
   becomes rare.
2. **Scaling.** His threshold is linear in the span. Ours grows by 2.525 while
   the span grows by 1000.
3. **Direction of what dies.** Past his threshold, same-image coincidences are
   impossible. Past ours, same-fold kills at distance ≥ 2p are still abundant —
   what dies is their adjacency in the surviving word.
4. **What the statement is a function of.** His depends only on the difference
   between two positions mod q. Ours depends on the entire sieve history below p,
   which is what makes it a statement about the surviving word rather than about
   residues.

---

## 4. Bibliography check

Eight references, read from the page-14 reference list:

| key | reference | known to the corpus? |
|---|---|---|
| [Eng05] | T. Engelsma, *k-tuple permissible patterns*, 2005 | yes — `PRIOR-ART.md`, `natal-cap-04-packing-notes.md` |
| [HL66] | Hardy & Littlewood, *Some problems in 'partitio numerorum' III*, Collected Papers vol. 1, pp. 561–630, Clarendon Press 1966 | yes — the corpus carries the Hardy–Littlewood k-tuple/convexity material throughout |
| [Hol22] | F.B. Holt, *Patterns among the Primes*, KDP, 2022 | yes — `SEARCH-CONVENTIONS.md`, `covering-dive.md`; the self-published book the sweep flagged as read only through four proxies |
| [Hol25] | F.B. Holt, *Eratosthenes sieve supports the k-tuple conjecture*, arXiv:2502.20470, 2025 | yes — row 12 of the sweep table |
| [Hol26] | F.B. Holt, *On nonconvex constellations among primes I*, **arXiv:2603.25896v3**, 2026 | yes — row 13; note the **v3**, where the corpus's sweep row carries no version |
| [HR15] | Holt & Rudd, *Combinatorics of the gaps between primes*, Connections in Discrete Mathematics (SFU), arXiv:1510.00743, 2015 | yes — row 7 |
| [Sut13] | A. Sutherland, *Narrow admissible tuples*, math.mit.edu/~primegaps/, 2013 | yes — `natal-cap-04-packing-notes.md` |
| [Sut15] | A. Sutherland, *Sieve theory and gaps between primes: narrow admissible tuples*, Oberwolfach, *Explicit Methods in Number Theory*, 2015 | yes — already cited in `PRIOR-ART.md` row 13's source |

**Nothing in the bibliography is new to the corpus.** Two small deltas worth
carrying: the paper cites [Hol26] specifically at **v3**, and its bibliography
does **not** cite 1408.6002, 2603.25915 or 1402.1970 — for the 3-step recursion
it cites [HR15] = 1510.00743 instead, which is where the corpus should point when
quoting the recursion by Holt's own preferred citation.

---

## 5. What this sweep does not cover

The Figure 4/5 and Table 1/2 data grids were read as page images for their shape,
captions and the highlighted-cell rule, not digit by digit; no claim here rests on
an individual cell. Holt's self-published *Patterns among the Primes* (2022)
remains unread beyond the four proxies the corpus already holds. The
`primegaps-v2` notebooks for this paper were not opened. The 2603.25896v3
revision was not diffed against the version the corpus swept.

---

## 6. Proposed edits to live documents (NOT APPLIED HERE)

1. **`research/PRIOR-ART.md`, the sweep table row for 2605.19165.** Replace the
   placeholder row with the completed row of §1 above, and change the section
   heading from "FOURTEEN OF FIFTEEN" to "FIFTEEN OF FIFTEEN", deleting the
   sentence "only its §3, p. 11 has been read, as page images, and the full sweep
   of it is OUTSTANDING."
2. **`research/PRIOR-ART.md`, THE NOVELTY BOUNDARY paragraph.** It says twin
   appears in the corpus in three roles and that three papers do not contain the
   word. Update to **four** papers: 2502.20470, 2308.07570, 2309.16833 and now
   2605.19165.
3. **`research/PRIOR-ART.md`.** The boundary sentence stands unchanged for this
   paper: no maximum-gap upper bound, no twin-slot spacing.
4. **Citation guidance to record wherever the |s|/2 threshold is used.** Cite
   arXiv:2603.25915v1 §1 p. 6 (already verified in `lit-pdf-holt-rudd.md` §3a) as
   the primary source, with 2605.19165 p. 11 as the numeric marking. The two are
   the same inequality.
5. **Memory note `prime-holt-prior-art.md`.** Add: the Holt sweep is complete at
   fifteen of fifteen; 2605.19165 is *On nonconvex constellations II: (458,3240)*,
   Holt alone, 18 May 2026; it does not contain the word twin, no max-gap bound,
   no G₂; its |s|/2 threshold is the 2603.25915 / 1408.6002 fact restated; and
   **the interaction check is negative — the extinction law is not his theorem,
   diverging by a factor 396 across three decades of W.**
6. **`proposals-prior-art.md` §1(b) and §6**, if either is ever promoted: keep
   the ADJACENT verdicts, but re-point the |s|/2 citation as in edit 4 and add
   the interaction arithmetic of §3.3 above, which is the sharpest available
   demonstration that the composition is not Holt's.
