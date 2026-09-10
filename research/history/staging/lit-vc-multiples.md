# arXiv:2208.06442 read in full: the prior-art leg on the VC finding, closed at the paper and one hop short of closed at the neighbourhood

<!-- ledger
id: Q-vc-prior-art
status: ANSWERED
todo: none
question: Does arXiv:2208.06442 contain or overlap the VC-dimension = 4 finding of import-vc-nets?
verdict: DISJOINT at theorem level; not found there nor in the reachable one-hop neighbourhood; Helmbold-Sloan-Warmuth 1992 Thm 3.1 owed (abstract only).
-->

*(2026-08-28. Staging note. Literature only. No repo file was edited, no script
was written or run, no git command was run. Nothing here is a measurement of a
primeoire object; the only primeoire numbers quoted are the ones already carried
by `import-vc-nets.md` §2.2 and §2.3, and they keep that note's
`[SCRATCHPAD-GRADE]` label. This note closes the paper-level leg that
`import-vc-nets.md` §6 recorded as PRIOR ART, NOT CLEARED, and names the one leg
it does not close.)*

---

## 0. Verdict, the limiting half first

**The one-hop leg is not clean, and the reason is a closed-access reference.**
Thomas's own §3 points at Helmbold, Sloan and Warmuth, *Learning Integer
Lattices*, SIAM J. Comput. **21** (1992) 240-266, Theorem 3.1. His arXiv v1
sentence is missing its verb: "This result is conceptually similar to Theorem
3.1 in [2] **which the VC-dimension of** subsets of multiples of `d` lying
between `−n` and `n`." The published OJAC version repairs it, and more strongly:
"which **establishes a formula for** the VC-dimension of subsets consisting of
all multiples of `d` lying between `−n` and `n`." Both descriptions are
Thomas's, single-source and uncorroborated: HSW's own abstract states the result
for lattices of `Z^k` restricted to `{−n, …, 0, …, n}^k`, and the `k = 1`
multiples-of-`d` reading is a specialisation nobody here has seen in the paper.
The theorem number, the `k = 1` phrasing and any bound all rest on Thomas alone.
On that description it is a **windowed** multiples family, and a windowed family
is the one shape in this neighbourhood that could bear on `import-vc-nets.md`
§2.3's `O(log log L)` lemma. The paper is closed access, Unpaywall reports no
open location, and Theorem 3.1's statement was **not reached**; only the SICOMP
abstract was read. That leg is **OWED**, and no negative from it is recorded
here.

**Relation of Thomas's range space to ours: DISJOINT at the level of theorems,
OVERLAPS at the level of objects in one degenerate sub-family.** Neither of
Thomas's results contains, implies or overlaps `import-vc-nets.md` §2.2's
`VC = 4` measurement or §2.3's `VCdim ≤ (1+o(1))·log₂ ln L` bound. Details and
the deciding sentence are §3.

**Forward citations: zero, on three channels, all calibrated in the same
session, so this is a negative and not a channel failure.** §5.

**Novelty word supportable for the VC finding:** *not found in this paper, and
not found in the part of its one-hop neighbourhood that was reachable.* Not
"new", not "first". The HSW leg is why the phrasing cannot be stronger. §6.

---

## 1. What was read, and at what fidelity

| artifact | sha256 | fidelity |
|---|---|---|
| `arxiv.org/abs/2208.06442` (abstract page HTML) | `9b27e578d32982705ecac25b15ff68cd0f23d21ee764e1ab59202d60a55668b4` | metadata and abstract |
| `arxiv.org/pdf/2208.06442v1` (9 pp) | `a114abce8fc0f36c778a1bb0fa67d3bef7c1f3896f19156041b5be90c01bf34e` | **full text, all 9 pages** |
| `combinatorialpress.com/article/ojac/vol17/292.pdf` (published version, 9 pp) | `0c0deb93053a8b32cf9cd3213ef9172a43d7843ac9f3fbb49255b1b26d84cb2f` | **full text, all 9 pages** |

- **Title:** *The VC-dimension of a class of multiples of the primes, and a
  connection to AdaBoost.* The truncated title recorded at `import-vc-nets.md`
  line 415 said "multiples of integers and primes"; the actual title says "of
  the primes", and "multiples of integers and primes" is the abstract's wording.
- **Author:** Andrew M. Thomas, Center for Applied Mathematics, Cornell.
- **Venue:** published, *Online Journal of Analytic Combinatorics* **17** (2022),
  DOI `10.61091/ojac-1705`. Not a preprint-only item. arXiv has one version only
  (v1, 12 Aug 2022). The two versions share the numbering of Theorem 1.1,
  Corollaries 1.2 and 1.3, Lemma 3.1 and Proposition 3.2, checked line by line;
  the documents themselves do not agree. arXiv v1 carries **four** references
  and OJAC **six**, adding Rosser-Schoenfeld 1962 and Erdős-Kac 1940 and
  renumbering the rest; the §3 sentence pointing at HSW is repaired differently
  and more strongly in OJAC (§0); and the closing justification of Corollary
  1.2's proof was rewritten. The numbering agrees, the documents do not, and no
  difference found is load-bearing here.
- **MSC:** 11B25, 68Q32, 60F15.
- **Extraction discipline.** Two independent extractions were taken
  (`pdftotext -layout` and `pdftotext -raw`) and agreed. The two load-bearing
  statements, Corollary 1.3 and Proposition 3.2, were then re-read **on the
  rendered page images** of pages 3 and 8, because both are `log₂` expressions
  and subscript glyphs are the standing extraction trap. Both confirmed at the
  image. A second trap, recorded because it would have manufactured a finding:
  `pdftotext` renders `H′` as `H0` throughout the OJAC PDF, so anyone grading
  these claims from OJAC text alone would record a notation change that does not
  exist.

---

## 2. What the paper actually proves

Domain `X = {n ∈ N : n ≥ 2}`, unbounded. Hypothesis class

> `H′ = {h_p : p prime}`, where `h_p(x) = 1` if `x ≤ p` or `p ∤ x`, and `0`
> otherwise.

Equivalently, the zero set of `h_p` is `pN \ {p} = {2p, 3p, 4p, …}`.

Four results, in the paper's own numbering:

- **Theorem 1.1.** The primes are infinite **iff** `VCdim(H′) = ∞`. The forward
  direction is a construction: to shatter `ℓ` points, enumerate the `2^ℓ` subsets
  of `{1,…,ℓ}`, assign a prime to each, and set `c_i` to the product of the
  primes of the subsets containing `i`, which is a product of `2^{ℓ−1}` distinct
  primes. The reverse direction is the finite-class bound.
- **Corollary 1.2.** If `H′` shatters `{c_1,…,c_n}` then each `c_i` is divisible
  by a product of `2^{n−1}` distinct primes, and `∏ c_i` has at least `2^n − 1`
  distinct prime factors.
- **Corollary 1.3** (confirmed at the page image, p. 3). For
  `H′_{≤n} = {h_p : p ≤ n}`, `VCdim(H′_{≤n}) = ⌊log₂ π(n)⌋`.
- **Proposition 3.2** (confirmed at the page image, p. 8). For
  `H_k = {h_{d,k} : d ≥ 2}` with `h_{d,k}(x) = 0` iff `x ∈ {2d, 3d, …, kd}`, and
  `H′_k` its restriction to prime `d`,
  `⌊log₂ π(η_k)⌋ ≤ VCdim(H′_k) ≤ VCdim(H_k) ≤ ⌈log₂(k−1)⌉ + 1`, where
  `η_k = ⌊(log₂ k)/2⌋`.

§2 of the paper is about AdaBoost and empirical risk minimisation on the same
class (Proposition 2.1, Theorem 2.2) and has no bearing here.

**The paper's result in one sentence:** for the family of indicator functions
that cross out the proper multiples of one prime, on the unbounded integer
domain, the VC dimension is infinite and is exactly `⌊log₂ π(n)⌋` once the prime
is capped at `n`, which is the trivial `log₂|H|` ceiling **attained**.

---

## 3. The mapping to `import-vc-nets.md` §2, and the deciding sentence

`import-vc-nets.md` §2.1 fixes ground set `X = {0,1,…,L} ⊂ Z` and ranges

> `R_{p,a} = { n ∈ X : n ≡ a or n ≡ a−2 (mod p) }`, `p` odd prime `≤ x`,
> `a ∈ Z/p`.

Four differences, each one enough on its own:

1. **Class count.** Two residue classes per prime, `a` and `a−2`, versus one.
2. **Shift.** `a` ranges over all of `Z/p` and is the adversary's free choice.
   Thomas's kill class is nailed to residue `0`. **This is the sentence that
   decides the relation**, from the paper's p. 1: *"Another characterization is
   that `h_p(x) = 0` if and only if `x ∈ pN \ {p} = {2p, 3p, 4p, …}`."* There is
   no shift parameter anywhere in the paper. The free `a` is the entire content
   of `G₂`; a family without it is a family without the adversary.
3. **Ground set.** A window `[0,L]` versus all integers `≥ 2`. Thomas's
   `VCdim(H′) = ∞` holds **because** the domain is unbounded, and does not
   transfer to any window. `import-vc-nets.md` §2.3 is a statement about
   windows and has no unbounded-domain content.
4. **Parameter.** Thomas's parameter is the modulus cap `n`, and `π(n)` is the
   size of his hypothesis class. The primeoire parameter is the window length
   `L`, with the prime cap `x` carried separately. The two `log₂`s are `log₂` of
   different things: his of the family size, the note's of `ω_x(L)`, the number
   of primes dividing a difference.

**Do any of his results contain or imply ours? No, in both directions.**

- **Corollary 1.3 is the opposite phenomenon to §2.3.** It says the family-size
  ceiling `log₂|H|` is *attained*. §2.3 says that on a window the family-size
  ceiling is *not* attained: `|{R_{p,a}}| = Σ_{3≤p≤x} p`, giving a trivial
  ceiling of `2 log₂ x = 12.61` at `x = 79`, against the lemma's
  `log₂ ln L = 4.22` at the widest window the certified bound ever needs,
  `L = x^{4.2665}`. Corollary 1.3's mechanism, if it transferred, would predict
  the larger number. It does not transfer, because his shattering construction
  needs unbounded room.
- **The `VC = 4` coincidence is a coincidence, and it is checkable.**
  `π(79) = 22` and `⌊log₂ 22⌋ = 4`, which equals `import-vc-nets.md` §2.2's
  measured two-class `VC = 4` at `x = 79`. The two 4s are unrelated. Corollary
  1.3 at `ℓ = 4` requires `2^4 = 16` primes and makes each witness `c_i` a
  product of `2^3 = 8` distinct primes, so the smallest possible witness is
  `2·3·5·7·11·13·17·19 = 9 699 690`. The primeoire witness is `{0, 2, 7, 9}`,
  inside a window of 250. Nothing about a witness of magnitude `10^7` bears on a
  window of `250`.
- **The one place the objects do meet.** Restricted to a window, Thomas's family
  is (up to the `x ≤ p` exception) the sub-family `{R_{p,0}}` of the note's
  **one-class control** with the shift frozen. A sub-family's VC dimension is at
  most the parent's, so this direction yields only that the note's one-class
  column is `≥` something, which is not a result anyone needs. No theorem of the
  paper is stated on a windowed ground set at all.
- **Proposition 3.2 is the nearest miss and still misses.** Its `k` bounds the
  *multiplier* range `{2d,…,kd}`, not the ground set, so it constrains which
  multiples are crossed out rather than where the shattered points may sit.
  Still one class, still no shift.

**Relation, stated at its rung: DISJOINT at the level of theorems; OVERLAPS at
the level of objects, in the degenerate zero-shift one-class sub-family only.**

---

## 4. One hop out: references

arXiv v1 has four references; OJAC has six, the two extra being
Rosser-Schoenfeld 1962 and Erdős-Kac 1940. Of the four, two are textbooks with
no bearing (Hardy-Wright; Shalev-Shwartz and Ben-David) and one is the AdaBoost
book (Schapire and Freund). The fourth is on-topic:

- **Helmbold, Sloan, Warmuth, *Learning Integer Lattices*, SIAM J. Comput. 21
  (1992) 240-266**, DOI `10.1137/0221019`. **[SOURCED, ABSTRACT ONLY]** via the
  Crossref record's JATS abstract; the SICOMP text is closed access and
  Unpaywall returns `is_oa: false` with an empty location list. Three other
  routes were tried and failed: the author's UCSC publication directory (the
  path now serves a school landing page, HTTP 200 on every filename),
  ScienceDirect's COLT 1990 chapter PDF (`10.1016/b978-1-55860-146-8.50025-4`,
  HTTP 403), and Semantic Scholar's open-PDF field (`status: CLOSED`).
  The abstract's operative sentence: *"It is shown that this bound is
  approximately a `log log n` factor larger than the lower bound on the worst
  case number of mistakes given by the VC dimension of lattices that are
  restricted to `{−n, ⋯, 0, ⋯, n}^k`."* So the object is sublattices of `Z^k`
  restricted to a box, which at `k = 1` is *multiples of `d` inside a window*.
  With the mistake bound `k + ⌊k log(n√k)⌋` and the stated `log log n` gap, the
  `k = 1` VC dimension is of order `log n / log log n`, a **single** log in the
  window, against `import-vc-nets.md` §2.3's **double** log,
  `(1+o(1))·log₂ ln L`. That is consistent with the structural difference (their
  moduli are all integers `d`, no shift, one class; the note's are primes with a
  free shift and a two-class union), and it is **not a check**, because
  Theorem 3.1 itself was never opened. Its exact hypotheses and its exact
  statement remain unread, and no comparison beyond order-of-growth is asserted.
  The `k = 1` multiples-of-`d` reading of Theorem 3.1 is Thomas's alone (§0);
  HSW's own abstract states the result for `Z^k` in a box.

---

## 5. One hop out: citing works

- **OpenAlex.** Two records carry this paper, `W4292108209` (the 2022 preprint)
  and `W4407306228` (the OJAC version). `filter=cites:` returns **0** on each.
  **Channel calibrated in the same session on the same filter**: Pach-Tardos,
  *Tight lower bounds for the size of epsilon-nets*, *J. Amer. Math. Soc.* 25
  (2012), DOI `10.1090/s0894-0347-2012-00759-0`, `W1995671037`, returns **36**,
  matching its `cited_by_count`. So the zero is a negative on this channel, not
  a channel failure.
- **Semantic Scholar.** `arXiv:2208.06442` resolves to paperId
  `57d04d2f71a…`, `citationCount: 0`, and the `/citations` endpoint returns an
  empty list. **Calibrated in the same session**: `arXiv:1012.1240` (Pach-Tardos)
  returns `citationCount: 102`. Zero is a negative here too. Note the S2 record
  reports `referenceCount: 8` against the four printed references, so its
  reference parse is not trustworthy; only the citation count is used. Rider: S2
  answers 429 from some addresses on a first pass and only on backoff, so a 429
  recorded there as a negative would be a fetcher artefact.
- **OpenCitations.** The HTTP 301 returned on both the target DOI and the
  calibration DOI is a fetcher artefact and not a dead channel: `curl -L`
  follows it as an ordinary host migration to `api.opencitations.net` and
  returns HTTP 200 with `[]`, and the v2 endpoint agrees. The channel calibrates
  three ways in the same session, 40,830 records for AlphaFold, 267 for Zhang's
  *Annals* 2014 and 19 for Pach-Tardos JAMS, so its zero is a third calibrated
  negative.

Three citation channels agreeing on zero, all calibrated, is the finding:
nothing has cited this paper.

---

## 6. One hop out: neighbourhood by topic

Run on the arXiv API over `https` (the `http` 301 gotcha in
`SEARCH-CONVENTIONS.md` §3 was avoided), calibrated in-session on
`ti:"The VC-dimension of a class of multiples"` returning exactly the target,
and on `all:"residue classes"` returning 477.

| query | total | what came back |
|---|---|---|
| `all:"VC dimension" AND all:"residue classes"` | 0 | nothing |
| `all:"VC-dimension" AND all:"residue"` | 4 | one relevant, arXiv:2210.03789 |
| `abs:"VC-dimension" AND abs:"arithmetic progressions"` | 1 | arXiv:2505.21789 |
| `all:"VC dimension" AND all:"covering system"` | 0 | nothing |
| `all:"VC dimension" AND all:"multiples" AND all:"primes"` | 1 | the target itself |

- **arXiv:2505.21789, Conant, Iplikci Arodirik, Ozawa, Zeng,
  *VC-dimension of generalized progressions in some nonabelian groups*.**
  **[SOURCED, abstract]**: finite upper bounds on the VC dimension of
  generalised progressions in finitely generated **free groups** and the
  **Heisenberg group over `Z`**. Not the primeoire setting, confirming
  `import-vc-nets.md` §6's guess. **DISJOINT.**
- **arXiv:2210.03789, McDonald, Sahay, Wyman, *The VC-dimension of quadratic
  residues in finite fields*.** **[SOURCED, abstract]**: the VC dimension of the
  squares in `F_q` as a subset of the additive group, conjectured
  `(1+o(1))log₂ q`, proved `≥ (1/2 + o(1))log₂ q` by Weil. This is the closest
  *shape* in the neighbourhood to `import-vc-nets.md` §4.1's translate
  formulation, since it is the VC dimension of the translates of one fixed
  subset of a finite abelian group, and `import-vc-nets.md` §4.1 writes
  `B_n = n − D` with `D` the twin-slot set in `Z/x#`. It is not the §2 range
  space and it says nothing about it: `F_q` is a field, `Z/x#` is not, the
  Weil-bound lower-bound method has no counterpart on a CRT product, and their
  direction is toward the family-size ceiling `log₂ q` being attained, again the
  opposite of §2.3. **OVERLAPS in convention, DISJOINT in content.** It is not a
  one-hop neighbour of the target (neither cites the other); it is recorded
  because the topic sweep surfaced it.

---

## 7. The novelty word, at its rung

For `import-vc-nets.md` §2.2's `VC = 4` measurement and §2.3's
`VCdim ≤ (1+o(1))·log₂ ln L` lemma, the supportable phrasing is:

> **Not found in arXiv:2208.06442, which was read in full at two independent
> sources, and not found in the reachable part of its one-hop neighbourhood
> (zero citing works on three calibrated channels; three of its four references
> off-topic; four topic queries on a calibrated arXiv channel).**

Not "new". Not "first". Not "the only". The phrasing stops short of the
strongest form the brief allows, because one reference is unread: **HSW 1992
Theorem 3.1 is the one statement in the neighbourhood about a windowed multiples
family, and it was reached at abstract level only.** Until its statement is
read, "not found in this paper and its one-hop neighbourhood" overstates the
neighbourhood by one paper.

**Suggested edit to `import-vc-nets.md` §6, not made here** (that file was not
touched, per the fence): the `arXiv:2208.06442` bullet's "PRIOR ART, NOT
CLEARED" may become "PRIOR ART, CLEARED AT THE PAPER; NEIGHBOURHOOD ONE PAPER
SHORT", pointing at this file, and its title should be corrected to "multiples
of the primes".

---

## 8. What would falsify this, and whether that check has run

- **That Thomas's Corollary 1.3 does bear on the window problem.** Falsified by
  producing a shattered set of `⌊log₂ π(x)⌋ + 1` points inside `[0,L]` for the
  two-class family, or by showing Corollary 1.3's construction admits witnesses
  of size `O(L)`. **Check has run, on the second half only**: the construction
  makes each witness a product of `2^{ℓ−1}` distinct primes, minimum
  `9 699 690` at `ℓ = 4`, against a window of `250`. The first half is not a
  falsification test of this note, it is `import-vc-nets.md` §2.2's own open
  question at `L = x²`.
- **That HSW 1992 Theorem 3.1 already contains the `O(log log L)` lemma.**
  Falsified or confirmed by reading Theorem 3.1. **This check has NOT run.**
  Only the SICOMP abstract was read, and the order-of-growth comparison in §4 is
  inferred from the abstract's mistake bound, not from the theorem. This is the
  single largest hole in the note, and roughly thirty fetch routes have now
  failed on it. zbMATH is tried and yields nothing: the record exists
  (Zbl 0747.68047, SIAM J. Comput. 21(2) 240-266) but its editorial contribution
  begins "Summary:", so it reproduces the publisher's abstract, carries no
  theorem numbering, and lists no references. Routes not yet tried: institutional
  SIAM access, ACM DL id 92655 for the COLT 1990 version (pp. 288-300 per
  Warmuth's own archived publication list), MathSciNet `mrlookup` for the review,
  or an interlibrary copy.
- **That the zero forward-citation count is a channel artefact.** Falsified by
  any channel returning a citing work. **Check has run**: three channels, all
  calibrated in-session against known-cited papers (36 on OpenAlex, 102 on
  Semantic Scholar, and 40,830 / 267 / 19 on OpenCitations once the 301 is
  followed). Google Scholar was not tried.
- **That the published OJAC version differs from arXiv v1 in a load-bearing
  way.** **Check has run**: both PDFs were fetched and their statement numbering
  and content compared line by line for Theorem 1.1, Corollaries 1.2 and 1.3,
  Lemma 3.1 and Proposition 3.2. The statements agree; the documents do not.
  arXiv v1 has four references and OJAC six, the §3 sentence pointing at HSW is
  repaired differently in each, and the closing justification of Corollary 1.2's
  proof was rewritten (§1). None of the three is load-bearing here, and the HSW
  difference is carried into §0 because the OJAC reading is the stronger one.
- **That the `log₂` expressions were misread by glyph extraction.**
  **Check has run**: both load-bearing statements were re-read on the rendered
  page images of pages 3 and 8, after two independent text extractions agreed.
- **That the topic sweep missed the owning convention.** The convention searched
  is the field's own (range space, VC dimension, shatter function), which is
  what `SEARCH-CONVENTIONS.md` prescribes for an import. **Not checked**:
  whether a number-theory-side convention exists for "VC dimension of a sifted
  set system". MathSciNet was not queried at all, and zbMATH was queried only
  for the HSW record. No absence claim in this note rests on either channel.
