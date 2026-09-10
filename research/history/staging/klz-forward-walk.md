# The KLZ forward walk: one citing paper, no Part II, and the one-class sequence was in OEIS all along

<!-- ledger
id: Q-klz-forward-walk
status: ANSWERED
todo: none
question: Does the forward citation graph of arXiv:2205.08273 hold a two-class or k-class complexity result, and is Part II out?
verdict: The forward graph has exactly one member on three independent indices and it never treats word complexity; no citing work goes beyond one class per prime, Part II is NOT OUT as of 2026-08-19, the owning convention was OEIS A023192 all along, and the comparison is APPLES-TO-APPLES so the exponent-shape sentence needs no heredity caveat.
-->

*Closes the single biggest gap left by the 2026-08-19 officer pass
(`proposals-prior-art.md` §5, "NOT searched: the forward citation graph of
arXiv:2205.08273"). Web research only; no new script is added to the repo. The
one computation run here is a brute force written and executed in the session
scratchpad, reproducible from the recipe in §5, and its conclusion is also
proved outright in §5 so that nothing load-bearing rests on an unembedded run.*

---

## Summary

**The forward citation graph of arXiv:2205.08273 has exactly one member, and it
is not a complexity paper.** Three independent indices agree on the count.
Kułaga-Przymus, M. Lemańczyk and Rams, *Basic thermodynamic formalism for
sandwich subshifts*, DCDS 2025 = arXiv:2402.12579, cites KLZ once in its
bibliography and never treats word complexity. An arXiv-side supplement adds two
more citing preprints that no index carries yet, and neither treats complexity
either. **Nothing anywhere computes or bounds `cpx` for `Ω_R` beyond one class
per prime.**

**Part II is not out.** Neither on arXiv nor under any author's name.

**The owning convention for the one-class complexity function exists, it is not
the B-free convention, and it found us a positive.** `cpx₁(n)` is **OEIS
A023192**, *"Conjecturally, number of infinitely-recurring prime patterns on n
consecutive integers"* (David W. Wilson; extended by Sean A. Irvine and Pontus
von Brömssen to `n = 120`). Our thirteen measured values at `n = 4, 8, …, 52`
match A023192's b-file **exactly, all thirteen**. That is third-party custody on
the one-class control, and it is a stronger calibration than the published band.
On the same channel in the same minutes, the **two-class** sequence
`2,3,4,5,6,7,9,11,13,15,17,19,22,25,28,31,34,37,43,49` returns nothing at three
indexings.

**The heredity check the officer flagged is SETTLED and the comparison is
apples-to-apples.** Not by luck: the two-class admissible family is hereditary
for a reason, and the reason is `p = 2` and `p = 3` together. §5 proves it and a
brute force confirms it at every `n ≤ 20`.

**One correction to `import-bfree.md` §3.3 is stronger than the officer's.**
`cpx₁(n)` is not merely an upper bound for `cpx_{X_ℙ}(n)`. It **equals** it, by
KLZ's own definition of `X_ℬ`. So equation (8) sandwiches our measured sequence
from **both** sides, not one.

**Kułaga-Przymus: settled, and the confusion has a source.** She is not an author
of arXiv:2205.08273. She is the first author of the only paper that cites it.

---

## 1. The forward walk, three indices

Walked 2026-08-19. WebSearch was unavailable for the whole of this session (the
200-call budget was spent before it began, which is the same wall the officer
hit), so every result below comes from a direct API call or a fetched PDF.

| index | query used | count | note |
|---|---|---|---|
| **OpenAlex** | `filter=cites:W4376473079` | **1** | the work is `W4376473079`, DOI `10.4064/aa220525-14-2`, `cited_by_count` 1 |
| **Semantic Scholar**, published record | `paper/DOI:10.4064/aa220525-14-2/citations` | **1** | same work |
| **Semantic Scholar**, arXiv record | `paper/arXiv:2205.08273/citations` | **0** | `citationCount` 0 on `paperId 1efc84fa…` |
| **OpenCitations** (COCI and index v2) | `citations/doi:10.4064/…` | **1** | one OCI, `06011769162-06012057110` |

**The two indices disagree, and the disagreement is an artifact, not coverage.**
Semantic Scholar holds the preprint and the journal article as two unlinked
records; the preprint record reads zero citations and the journal record reads
one. Anyone walking this graph by arXiv id alone gets a false empty. Recorded
here because it will recur: **walk B-free citation graphs by DOI, not by arXiv
id.** The DOI is `10.4064/aa220525-14-2`, and it is worth writing down because
the natural guess from the arXiv date (`aa220530-13-3`) is wrong and returns a
clean zero from OpenAlex, which reads exactly like a genuine absence.

### 1.1 The one citing work

**Joanna Kułaga-Przymus, Michał D. Lemańczyk, Michał Rams, *Basic
thermodynamic formalism for sandwich subshifts*, Discrete Contin. Dyn. Syst.
2025, DOI `10.3934/dcds.2025077` = arXiv:2402.12579.** PDF pulled and
text-extracted, 2848 lines.

- **More than one class per prime?** **No.** The paper is about the partial
  order `x ≤ y` on `{0,1}^ℤ` and the classes of subshift it generates
  (hereditary, subordinate, and their two-sided "sandwich" analogues). It has no
  per-prime residue structure of its own; `ℬ`-free systems are cited as
  motivation.
- **Any `cpx` for `Ω_R`?** **No.** The string `complexit` occurs twice in the
  whole paper: once about "the complexity of the sofic approximations" and once
  inside a bibliography entry. KLZ appears only as reference [21].

### 1.2 The arXiv-side supplement, and why the indices undercount

Index coverage of 2025–2026 preprints is poor, so the walk was repeated
mechanically. Every arXiv paper matching `all:"B-free"` submitted after
2205.08273 was pulled (twenty papers), text-extracted, and its bibliography
grepped for the KLZ reference. Three cite it:

| citing work | indexed? | treats > 1 class/prime? | treats `cpx`? |
|---|---|---|---|
| arXiv:2402.12579, Kułaga-Przymus–Lemańczyk–Rams, DCDS 2025 | yes, by all three | no | no |
| **arXiv:2506.10218**, Kasjan, *A note on ℬ-free sets and the existence of natural density*, Jun 2025 | **no index carries it** | no | **`complexit` count: 0** |
| **arXiv:2606.27170**, *On automorphisms of ℬ-admissible and related subshifts*, Jun 2026 | **no index carries it** | no, see below | **`complexit` count: 0** |

So the true forward-citation count is at least three, and the answer to both of
the officer's questions is unchanged at three as it was at one.

**arXiv:2606.27170 is the near miss and deserves its own line**, because it is
the newest paper on exactly our object. It works with the ℬ-admissible subshift
`A_ℬ` and defines admissibility one class at a time: *"A set `A ⊂ Z` is
ℬ-admissible if, for every `b ∈ ℬ`, one has `|A mod b| < b`"* [verbatim from the
arXiv PDF `arxiv.org/pdf/2606.27170v1`, text-extracted and read, p. 2]. Its new
tool, **contours**, is *"certain unions of residue classes modulo elements of
finite subsets of ℬ"* [same PDF, p. 3] — a union over **different** moduli, one
class each, not several classes at one prime. It is not the two-class object.
Its subject is the automorphism group, and it computes no complexity function.

### 1.3 Verdicts on the officer's two questions

- **"Does any citing work treat complexity of admissible subshifts with more
  than one class per prime (two-class, k-class, polynomial `R_p^f`)?"**
  **No.** Three citing works, none of them.
- **"Does anything compute or bound `cpx` for `Ω_R` beyond the one-class
  case?"** **No.** Searched in the owning convention of
  `SEARCH-CONVENTIONS.md` §1 (`Ω_R`, the R-admissible sets of a sieve, and
  `cpx_{X_ℙ}`, the complexity of the ℙ-admissible subshift), plus the three
  forward-citation indices above and the OEIS convention found in §4.

---

## 2. Part II status: **NOT OUT** (as of 2026-08-19)

The title says "I", and the officer never checked. Checked here on four
channels, all through the arXiv API over `https` (the `http` endpoint 301s, as
`SEARCH-CONVENTIONS.md` already records):

| channel | result |
|---|---|
| `all:"Behrend sets"` | **exactly one** arXiv paper in the whole archive: 2205.08273 |
| `au:"Zuniga Alterman"` | 10 papers, latest arXiv:2603.25961 *On a Möbius double sum* (Mar 2026); everything after 2022 is explicit-estimates analytic number theory, no dynamics |
| `au:"Kasjan"` | 16 papers, latest arXiv:2606.27170 (Jun 2026); no Part II |
| `all:"B-free systems"` | 16 papers; no Part II |

**Nothing titled "…Behrend sets. II" exists on arXiv, and neither surviving
author has posted anything in this line since.** Zuniga Alterman left the
subject after 2022. Kasjan stayed in it and published four more papers, none of
them the sequel and none of them about complexity. The sequel was announced by a
title and has not appeared in four years. That is as strong a negative as this
channel can give; it does not exclude a journal-only Part II, and MathSciNet and
zbMATH were not reached (see §9).

---

## 3. The Araújo forward walks

Both parts posted 27 Feb 2026, so these are young graphs and the counts will
move.

| work | OpenAlex | Semantic Scholar | citing works |
|---|---|---|---|
| arXiv:2602.24031, *Sarnak's Program for Erdős Sieves. Part I* | **not indexed** (title search returns unrelated AMS *Notices* items) | `citationCount` **0** | — |
| arXiv:2602.24034, *…Part II* | **not indexed** | `citationCount` **1** | arXiv:2607.11330, *Intrinsic ergodicity for 𝔅-free integers in number fields* |

**arXiv:2607.11330 checked directly**: `complexit` count **0**; its subject is
the unique measure of maximal entropy, identified as a relative extension of the
Haar rotation. It is measure-theoretic, like the Araújo parts themselves.

**Both Araújo parts re-checked directly, first-hand this time.** PDFs pulled and
text-extracted (2908 and 2997 lines). `complexit` count: **0 in Part I, 0 in
Part II**. This confirms `import-bfree.md` §10's second-hand claim at source.
The arXiv phrase search `all:"Erdős sieves"` returns those two papers and
nothing else in the whole archive, so no third party has adopted the vocabulary
yet.

---

## 4. The owning convention was never the B-free one — it is OEIS A023192

This is the find of the walk, and it came from the discipline in
`SEARCH-CONVENTIONS.md` rather than from the citation graph: search the sequence,
not the theory.

**`cpx₁(n)`, the one-class complexity, is OEIS A023192.**

> *"Conjecturally, number of infinitely-recurring prime patterns on n
> consecutive integers."* — A023192, David W. Wilson; b-file to `n = 120` by
> Pontus von Brömssen, terms 1–76 by Sean A. Irvine. [Read from the OEIS text
> record `oeis.org/search?q=id:A023192&fmt=text` and the b-file
> `oeis.org/A023192/b023192.txt`, both fetched here.]

**It matches, on every value the corpus has published.** `import-bfree.md` §3.3
prints `cpx₁(n)` at `n = 4, 8, …, 52`. The b-file at those thirteen indices:

| `n` | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| §3.3 | 7 | 25 | 73 | 211 | 535 | 1275 | 3103 | 7145 | 15955 | 36457 | 80233 | 164779 | 358883 |
| A023192 | 7 | 25 | 73 | 211 | 535 | 1275 | 3103 | 7145 | 15955 | 36457 | 80233 | 164779 | 358883 |

**Thirteen of thirteen.** An independent brute force written for §5 also
reproduces A023192 at every `n = 1..20` (2, 3, 5, 7, 10, 13, 19, 25, 35, 45, 59,
73, 101, 129, 170, 211, 268, 325, 430, 535). The one-class control now has
third-party custody, which is worth more than the calibration §3.3 claims for it.

**Why the identification is exact and not numerical luck.** A023192's own
comment on its sibling A023189 says the patterns counted are the ones that
recur infinitely often, which under Dickson's conjecture is precisely KLZ's
`(X_{1ℙ})₀ = X_ℙ`. The unconditional object being counted is the ℙ-admissible
one, and §5 shows that is what our script counts.

**The two-class sequence is not in OEIS, and the negative is calibrated.**
Searched `2,3,4,5,6,7,9,11,13,15,17,19,22,25,28,31,34,37,43,49` at the full
sequence, shifted by −1, and truncated to the tail from `n = 7`: **no results**
at all three, on a channel that returned A023192 as a positive in the same
minutes. Per `SEARCH-CONVENTIONS.md` this is now a negative that carries weight,
because for the first time the owning convention is known: it is **"infinitely
recurring prime patterns on `n` consecutive integers"**, the A023189 / A023190 /
A023191 / A023192 / A035326 family, and the two-class analogue has no entry in
it. Keyword probes in that convention (`"infinitely recurring" twin`; `number of
admissible twin prime patterns`) return nothing on point — the second returns
A008407, minimal `k`-tuplet width, a different object.

**What this does to the novelty claim.** It narrows it and it strengthens it.
The one-class sequence is prior art, in OEIS, and predates KLZ; §3.3 should stop
describing it as a control derived from the published band and start citing
A023192. The two-class sequence remains not found, now in a convention that
owns the one-class case, which is the standard of evidence
`SEARCH-CONVENTIONS.md` demands. The registered novelty target is unchanged: the
**exponent shape**, not the sequence.

---

## 5. Heredity: the comparison IS apples-to-apples, and here is why

The officer's flag: *"KLZ's `X_ℬ` is hereditary, so their `cpx` counts all
admissible subsets. Confirm `import-bfree.md` §3.3's `p(n)` counts subsets and
not maximal configurations."*

### 5.1 What KLZ count

> *"Together with ℬ-free subshifts, we will also consider subshifts `(X_ℬ, S)`,
> called ℬ-admissible, where `X_ℬ` consists of all `0−1`-sequences whose support
> misses at least one residue class modulo any `b ∈ ℬ`. … the latter subshift
> being obviously hereditary."*
>
> *"Given a subshift `(X, S)`, we say that a block appears in `X` if there is
> `y ∈ X` such that the block appears in `y`. By the complexity of `(X, S)` we
> mean the function `n ↦ cpx_X(n)`, where `cpx_X(n)` stands for the number of
> blocks of length `n` appearing in `X`."*
>
> — Kasjan–Lemańczyk–Zuniga Alterman, §1.2 and footnotes 6 and 10. [Read from
> the arXiv PDF `arxiv.org/pdf/2205.08273v1`, text-extracted, pp. 3–4. This is
> a first-hand reading; the corpus previously held these statements
> second-hand.]

So `cpx_{X_ℙ}(n)` is the number of sets `S ⊆ [0,n)` such that `|S mod p| < p`
for every prime `p`. Every subset of such a set is one, so the family is
hereditary and the count is a count of **subsets**, not of maximal
configurations.

### 5.2 What §3.3 counts

`research/import-bfree-03-admissible-complexity.js` enumerates distinct zero
sets `⋃_p K_p(r_p)`, one residue `r_p` chosen per prime, with
`K_p(r) = {j ∈ [0,n) : j ≡ −r or −r−2 (mod p)}`. Read as a support instead of a
zero set, the word's support is `S = [0,n) \ ⋃_p K_p(r_p)`, and the condition on
`S` is: for every prime `p` there is a class `c` with `c ∉ S mod p` and
`c − 2 ∉ S mod p`. Equivalently `(S mod p) ∪ (S mod p + 2) ≠ Z/p`, which is
exactly the statement that the tuple `S ∪ (S+2)` is admissible.

**That family is hereditary too** — a subset of `S` avoids the same two classes.
So the two counts are the same KIND of count, and the question is only whether
the script's enumeration of *unions* reaches every hereditary member, or stops
at the maximal ones.

### 5.3 It reaches every one, and `p = 2` with `p = 3` is the reason

**Lemma (mod 6).** If `(S mod p) ∪ (S mod p + 2) ≠ Z/p` for `p = 2` and `p = 3`,
then `S` lies in a single residue class mod 6.

*Proof.* At `p = 2` the two deleted classes coincide, so the condition is
`S mod 2 ≠ Z/2` and `S` is of one parity. At `p = 3` the deleted pair
`{c, c−2}` is `{c, c+1}`, two adjacent classes of three, so `S mod 3` misses two
of the three classes and is a single class. Combine. ∎

**Corollary.** For no `j` are both `j−2` and `j+2` in `S`: they would be
congruent mod 6, forcing `6 | 4`.

**Proposition (the union family is the whole hereditary family).** Let `S` be
twin-admissible and `Z = [0,n) \ S`. Then `Z = ⋃_p K_p(r_p)` for some choice of
residues.

*Proof.* Take a witness `r_p` for every prime `p ≤ n+2`; each `K_p(r_p)` is
disjoint from `S`, so `Z₀ := ⋃_{p ≤ n+2} K_p(r_p) ⊆ Z`. For a prime `p > n+2`,
`K_p(r)` meets the window in at most the two positions `a` and `a−2` with
`a ≡ −r`, so the available generators are the pairs `{a−2, a}` for
`2 ≤ a ≤ n−1` and the four boundary singletons `{0}, {1}, {n−2}, {n−1}`. Now
take any `j ∈ Z \ Z₀` and spend one unused large prime on it. If `j ≤ 1` or
`j ≥ n−2`, the singleton `{j}` is available. Otherwise `j−2` and `j+2` are both
in the window, and by the Corollary at most one of them lies in `S`; pick the
one that does not, and its pair with `j` is a generator contained in `Z`. Doing
this for every `j ∈ Z \ Z₀`, on a fresh prime each time, gives exactly `Z`. ∎

The one-class case is the same argument and easier: for `p > n` the one-class
kill set is a single position, so every position can be added on its own.

### 5.4 Confirmed by brute force

A second, independent implementation was written in the session scratchpad: it
enumerates all `2ⁿ` subsets of `[0,n)` and tests the hereditary condition
directly against every prime `≤ 2n+4`, with no closure engine and no shared
code with `import-bfree-03`. **Union count and subset count agree at every
`n = 1..20`, in both the one-class and the two-class case**, and the two-class
values reproduce §3.3's table (31 at `n = 16`, 49 at `n = 20`) while the
one-class values reproduce A023192 (§4). Recipe, so this is repeatable without
the file: for each `n`, count masks `m ⊆ [0,n)` such that for every prime
`p ≤ 2n+4` there exists `c ∈ Z/p` with `c ∉ m mod p` and (two-class only)
`c−2 ∉ m mod p`; compare against `cpxAt(n, twoClass, n+2, true)` from
`research/import-bfree-03-admissible-complexity.js`.

### 5.5 Verdict

**APPLES-TO-APPLES.** `import-bfree.md` §3.3's `cpx(n)` counts admissible
subsets, exactly as KLZ's `cpx_{X_ℬ}(n)` does. Any exponent-shape sentence may
be published against a `(c+o(1))^{n/log n}` shape without a heredity caveat.
**And more: `cpx₁(n) = cpx_{X_ℙ}(n)` exactly**, since KLZ's `X_ℙ` is by
definition the set of sequences whose support misses a class mod every prime,
its `n`-blocks are exactly the admissible `S ⊆ [0,n)`, and that is what the
one-class branch of the script enumerates. §3.3's `cpx_{X_P}(n) ≤ cpx₁(n)` is
true but weaker than the truth, and its stated reason (least prime factor) is
the reason for the **sequence** inclusion, not the subshift one.

---

## 6. Where the exponent shape actually comes from: Tao's argument at `ω(p) = 2`

The officer registered `2^{cN/(log N)²}` as a conjecture from a sieve heuristic.
Having the proof in hand rather than the theorem statement makes the provenance
of that shape exact, so it is recorded here.

KLZ §5.1 gives Tao's upper bound as a two-factor count [read from the arXiv PDF
`arxiv.org/pdf/2205.08273v1`, text-extracted, pp. 18–19]:

> `A_N := |{B_{n,N} : n ∈ N}| ≤ √N + ∏_{p ≤ √N} p · 2^K`

where the product counts residue-choice vectors and `K` bounds the size of a set
surviving the deletion of **one** class per prime `p ≤ √N`. The large sieve at
`ω(p) = 1` gives `σ(R) > log R`, hence `K_N ≤ 2N/log N (1+o(1))` at
`R = √N/log N`, and since `∏_{p ≤ √N} p = exp(√N(1+o(1)))` is negligible against
`2^{2N/log N}`, the answer is `2^{2N/log N (1+o(1))} = (4+o(1))^{N/log N}`.

**Change one input.** At `ω(p) = 2` the residue-vector factor is unchanged
(`p` choices per prime, still `exp(√N(1+o(1)))`), and only `K` moves: the large
sieve's `σ(R)` grows like `(log R)²/2` instead of `log R`, so
`K_N ≍ 8N/(log N)²` at the same `R`. And `N/(log N)²` still dominates `√N`, so
the residue factor is still negligible and the count is
`2^{(c+o(1))N/(log N)²}` with `c ≤ 8` from this route.

**So the shape is not a guess; it is the published argument with `ω(p) = 2`
substituted.** Two honest caveats. First, the constant is unpoliced: the `≍` in
`σ(R) ≍ (log R)²/2` drops a singular-series factor, so only the shape is
claimed. Second, **the upper bound transfers and the lower bound does not.**
KLZ get their lower bound by taking `k` primes in `[N+1, 2N]`, which is
ℙ-admissible unconditionally by their (44), and counting its `2^{N/\log N(1+o(1))}`
subsets. The two-class analogue of that step wants a twin-admissible set in
`(N, 2N]` of size `≫ N/(log N)²` whose admissibility at primes in `(√N, 2N]` is
free, and the natural candidate is the twin primes. That is the circularity
`import-bfree.md` §10 already flagged, and this reading confirms it rather than
dissolving it.

**Weak numerical support, stated as weak.** Arithmetic on §3.3's embedded table,
done here and not by a script: in KLZ's coordinate `ln(cpx)·ln n / n` the
two-class sequence falls monotonically 0.5951 → 0.4963 over `n = 16..60`, while
in the `(log n)²` coordinate `ln(cpx)·(ln n)²/n` it rises 1.6499 → 2.0321 and
flattens, with the last two values equal to four decimals. That is consistent
with the `(log N)²` shape and is not evidence for it: `n ≤ 60` is nowhere near
asymptotic in a coordinate carrying `N/(log N)²`, and the implied constant
`2.0321/ln 2 = 2.93` is nowhere near the heuristic ceiling 8.

---

## 7. Kułaga-Przymus: no misattribution exists, and the confusion has a source

The officer's §5 claims `import-bfree.md` §3.3 misattributed the author list.
The `CHANGELOG` entry for the same day already records that this was checked and
found already correct. Re-checked here across the whole repo: every one of the
twelve places that name the complexity paper names
**Kasjan–Lemańczyk–Zuniga Alterman**, and the two places that name
Kułaga-Przymus name her correctly, both on
Dymek–Kasjan–Kułaga-Przymus–Lemańczyk, TAMS 370 (2018). **Nothing to fix.**

Author lists confirmed at the arXiv API:

- **arXiv:2205.08273**: Stanisław Kasjan, Mariusz Lemańczyk, Sebastian Zuniga
  Alterman.
- **arXiv:2402.12579**: Joanna Kułaga-Przymus, Michał D. Lemańczyk, Michał
  Rams.

**Where the officer's instinct came from.** Kułaga-Przymus is the first author
of the **only paper in the world that cites** the complexity paper, and its
second author is a Lemańczyk (Michał, not Mariusz). Anyone reading a citation
listing rather than the paper meets her name attached to KLZ's, one link away.
That is a real trap and it is worth the line: on this literature, **Lemańczyk
alone does not identify a person**.

---

## 8. Proposed edits elsewhere (report only, not applied)

1. **`research/SEARCH-CONVENTIONS.md` §1, amend the existing `Ω_R` row** to add
   the OEIS home now that it is known. Suggested addition to the "OWNING
   convention" cell: *"…and for the one-class complexity sequence itself,
   **"infinitely-recurring prime patterns on n consecutive integers"** —
   Wilson's family in OEIS"*; to "where it lives": *"**OEIS A023192** (Wilson;
   Irvine 2019; von Brömssen 2025, b-file to n = 120), with siblings A023189,
   A023190, A023191, A035326"*. This gives the row an A-number, which is what
   `qc.js`'s `search-convention` check reads as a clearing identifier.
2. **`research/SEARCH-CONVENTIONS.md` §2**, add to the calibration list: the
   known positive `2,3,5,7,10,13,19,25,35,45,59,73,101,129,170,211` → A023192,
   which is the calibration that makes the two-class negative meaningful.
3. **`research/SEARCH-CONVENTIONS.md` §3**, add three rows to "searches already
   run": the KLZ forward graph (answer: one citing work, three indices,
   settled here); KLZ Part II (answer: not out, four channels); and the walk-by-
   DOI-not-arXiv-id lesson from §1.
4. **`research/history/staging/import-bfree.md` §3.3**, three changes, all
   strengthening:
   - replace `cpx_{X_P}(n) ≤ cpx₁(n)` and its least-prime-factor justification
     with the equality `cpx₁(n) = cpx_{X_ℙ}(n)`, justified by KLZ's definition
     of `X_ℬ` quoted in §5.1 above, so that equation (8) bounds the measured
     sequence from both sides;
   - add the A023192 identification and the thirteen-of-thirteen match, and
     retire the phrase describing the one-class control as merely "a
     calibration" — it is now third-party custody;
   - add one sentence recording that the two-class family is hereditary, with
     the mod-6 lemma of §5.3, so the comparison stands on a proof rather than on
     a coincidence.
5. **`research/history/staging/import-bfree.md` §10**, retire the bullet *"No
   owning-convention search was run for the two-class complexity function"* —
   one has now been run, in the A023192 convention, and it is a clean calibrated
   negative. Replace with the residue: MathSciNet, zbMATH and the published Acta
   text are still unread (§9).
6. **`research/import-bfree-03-admissible-complexity.js`**, add a Stage D that
   asserts the union count equals the brute-force hereditary subset count for
   `n ≤ 16`, and a Stage E that asserts the one-class column against A023192's
   b-file values. Both are cheap and both would have caught a heredity
   regression before it reached prose.
7. **`research/history/staging/proposals-prior-art.md` §5**, update the NOT
   SEARCHED paragraph: the forward graph is now walked, and the verdict
   **ADJACENT** is unchanged and better supported.

---

## 9. NOT REACHED

- **MathSciNet and zbMATH.** `mrlookup` is reachable per
  `attack-prior-art-last-ground.md` but was not used here; its review text would
  be the next place a two-class complexity remark could hide.
- **The published Acta Arithmetica text.** Everything quoted in §5.1 and §6 is
  from arXiv:2205.08273**v1**. Equation numbers (7), (8), (9) and the section
  numbering may differ in Acta Arith. 209 (2023) 135–171.
- **WebSearch.** Unavailable for this entire session; the budget was spent
  before it started. Everything here comes from APIs and PDFs, so any citing
  work indexed by none of OpenAlex, Semantic Scholar or OpenCitations, and not
  matching `all:"B-free"` on arXiv, is outside the sweep.
- **Google Scholar**, which is the one index that would catch a citing thesis or
  a non-English paper. Unreachable, as before.
- **A023192's b-file beyond `n = 52`.** The b-file runs to `n = 120` and our
  one-class column stops at 52. Extending the comparison is free and was not
  done.
- **Whether `A023189`'s formula has a two-class analogue.** A023192 has a closed
  relation to A023189, `a(n) = 1 + Σ_{k} (n−2k+2)·A023189(k)`. If the two-class
  sequence has the same structure, its "maximal patterns starting and ending in
  a comb member" sibling is a second sequence worth computing, and nobody here
  has looked.
- **Cellarosi–Sinai, Peckner, Huang–Wang–Ye, Keller, Dymek's Toeplitz papers,
  Engelsma's *Permissible Patterns of Primes***, all still unread, as the
  officer left them. Engelsma is now more interesting than before, since A023190
  and A023191 both link his page.

---

## 10. Reproduction

No new script. Every result above is reproducible from these calls, all of which
were run on 2026-08-19:

```
# forward walk
https://api.openalex.org/works?filter=cites:W4376473079&per-page=200
https://api.semanticscholar.org/graph/v1/paper/DOI:10.4064/aa220525-14-2/citations?fields=title,year,externalIds
https://api.semanticscholar.org/graph/v1/paper/arXiv:2205.08273/citations?fields=title,year,externalIds
https://w3id.org/oc/index/coci/api/v1/citations/10.4064/aa220525-14-2

# part II, and the arXiv-side supplement
https://export.arxiv.org/api/query?search_query=all:%22Behrend+sets%22&max_results=40
https://export.arxiv.org/api/query?search_query=au:%22Zuniga+Alterman%22&max_results=60
https://export.arxiv.org/api/query?search_query=all:%22B-free%22&max_results=200
  then pdftotext -layout on each post-2022 hit and grep for "Behrend sets. I"

# the owning convention
https://oeis.org/search?q=2,3,5,7,10,13,19,25,35,45,59,73,101,129,170,211,268,325,430,535&fmt=text
https://oeis.org/A023192/b023192.txt
https://oeis.org/search?q=2,3,4,5,6,7,9,11,13,15,17,19,22,25,28,31,34,37,43,49&fmt=text
```

The heredity brute force is specified in §5.4 in enough detail to rewrite in ten
lines, and its conclusion is proved in §5.3 independently of any run.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
