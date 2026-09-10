# Two-class lower bounds: how large can G2(x#) be FORCED?

<!-- ledger
id: Q-two-class-lower-bounds
status: PARTIAL
todo: none
question: How large can G2(x#) be FORCED to be?
verdict: The best PROVEN lower bound costs nothing, the Kalmynin-Konyagin substitution is carried out here (DERIVED, independently checked, not refereed), and the certificate ladder is MEASURED with an oracle test whose load-bearing caveat is stated on its own; against the target x'^2 and the proven x^(4.2665+eps) upper bound the question stays open.
-->

*(2026-08-17; search repaired and the ladder recomputed 2026-08-18. Insurance on
the programme. Script: `research/two-class-lower-bounds.js`, minutes by default,
hours with `--full`, shardable by `--levels=`.
Calibration marked throughout: PROVEN, VERIFIED by exact computation,
CERTIFIED (an explicit construction, machine-checked), MEASURED, INFERRED,
CONJ, REFUTED, ABSENT — searched in the convention that OWNS the object and not found, to the standard of `SEARCH-CONVENTIONS.md`; a clean negative in our own wording does not earn the tag.)*

## 0. The question

The Zone Postulate needs `G2(x#) < x'^2`. Every other bound in this repo is an
upper bound; this note asks the adversary's question instead. How large can
`G2(x#)` be *made* to get? If a Rankin-type construction reaches `x^2`, the Gap
Reformulation is false and we should find that out ourselves.

The question is well posed even though `G2` has fixed classes `{0, -2}` and no
visible adversary, and §1 says why: `G2` **is** an adversarial covering
problem. So the threat is real and has to be quantified rather than waved away.

**The answer, in one line.** The best lower bound available today is
`G2(x#) >= g(x#) >> x ln x lnlnln x / lnln x` (PROVEN, and free by
monotonicity from Rankin/Pintz/FGKMT); the honest asymptotic analogue of Rankin
for two classes buys **one factor of `log x`, not a power of `x`**; and the
construction we can build is **exactly the truth at every one of the thirteen
`x` where the truth is known** (§5b), reaching a certified `479,339` at
`x = 5003` on a certificate ladder whose ratio to `x²` falls by a factor of
17.4 over the sixteen levels to `x = 4001`. Nothing anyone can construct comes within `x^{1-o(1)}` of the
threshold. The Zone Postulate is **safe against the construction side**, with
one named caveat in §9.

**And one line on what that falling ratio is not.** The ladder is a ladder of
LOWER bounds whose fidelity is measured against A144311's published optima to
`x = 79` (`research/greedy-oracle-validation.js`): exact through `x = 43` at a
uniform budget, exact again at the published `x = 53` term, and degrading at
−0.024 per level beyond, so the honest oracle frontier is near `x = 53` — and
the search budget that makes it exact is unaffordable above about `x = 100`
(§5c). A falling `Y2/x²` does not show that `G2/x²` falls.

---

## 1. The object, stated so that the question is well posed

**PROVEN (elementary, CRT).**
`G2(x#) - 1` equals the maximum length of an interval `[1,m]` that can be
covered by choosing, for each prime `p <= x`, the residue pair
`{a_p, a_p - 2} mod p`.

*Proof.* A gap of length `G` starting at a twin slot `s` says every one of
`s+1, ..., s+G-1` fails to be a twin slot, that is, for each such `t` either
`t` or `t+2` shares a factor with `x#`. Translate the origin to `s` and write
`j = t - s`. Then `j` is killed by `p` exactly when `j ≡ -s` or `j ≡ -s-2 (mod
p)`, so the class pair is `{a_p, a_p - 2}` with `a_p = -s mod p`. As `s` runs
over `Z/x#`, CRT makes `(a_p)_p` run over all of `∏ Z/pZ`. Conversely any
covered run is bounded by uncovered points on both sides, since twin slots
exist (`x# - 1` is one), and those are twin slots. ∎

So there **is** an adversary. The only constraint is that the two classes sit
at distance exactly 2.

**This is not new to the repo.** `research/attack2-rankin2d.js` already records
it, under the name PAIRED, with the note *"CRT COLLAPSE: choosing all shifts
a_p independently is the same as sliding ONE window over the ... tile"*. It is
restated here because the whole of §4 and §5 depends on it.

The chain, all pointwise and all elementary:

| object | definition | relation |
|---|---|---|
| `Y1(x) = g(x#) - 1` | one class `{a_p}` per prime; Jacobsthal, OEIS A048670 | |
| `G2(x#) - 1` | classes `{a_p, a_p - 2}` | `>= Y1(x)`: add the second class to any one-class covering |
| `h2(x#)` | Ziller-Morack paired Jacobsthal, worst over even offsets, A288815 | `>= G2(x#)`: offset 2 is one of the offsets |
| free 2-class | any pair `{a_p, b_p}`, Resta ILP, A072753 | `>= h2` up to the `6a+6` bridge |

`G2 >= g` is the important one and it was not being used. **VERIFIED** at all
eleven shared terms (2.00, 3.00, 3.00, 3.00, 4.15, 4.41, 5.10, 5.61, 6.00, 8.00,
7.38 as the ratio `G2/g` at `x = 5 .. 41`).

**The sparseness points the same way, not the opposite way.** `G2` measures
gaps between twin slots, which are sparser than rough numbers, and that makes
the comparison easier rather than harder: twin slots are a **subset** of holes,
so the largest hole gap `(a,b)` contains no twin slots either, and the twin-slot
gap covering it is at least `b - a`. Hence `G2(x#) >= g(x#)` with no sieve input
at all. That single line is worth more than everything else in this note,
because it imports the entire Erdős-Rankin lower-bound literature.

---

## 2. Literature verdict

Sweep run 2026-08-17 (web + primary PDFs + OEIS + arXiv full text). Everything
below was read in the source, not inferred from a citation.

| # | question | verdict | source |
|---|---|---|---|
| 1 | FKMPT "Long gaps in sieved sets", exact hypotheses | **PROVEN**, quoted below | arXiv:1802.07604 **v4**, JEMS 23 (2021) 667-700 + Corrigendum, JEMS 25 (2023) 2483-2485 |
| 2 | does one-dimensionality permit `\|I_p\| = 2`? | **YES, on up to half the primes**; NO on all | their own `n^2+1` example |
| 3 | lower-bound construction for a 2-dimensional sieved set | **REFUTED 2026-08-18**, it exists | Kalmynin-Konyagin, Izv. Math. 88:2 (2024) 225-235 = arXiv:2302.00459; see `covering-dive.md` §4.2 |
| 4 | Maier-Pomerance heuristic, where the exponent 2 comes from | **CONJ**, located and quoted | TAMS 322 (1990) 201-237, p. 205 |
| 5 | the same accounting run in dimension 2 | **NARROWED 2026-08-18**: Kalmynin-Konyagin run the dimension-2 Mertens ledger. What §4 does first is run *Maier-Pomerance's* ledger there | arXiv:2302.00459, verified at the publisher PDF |
| 6 | Erdős 1962, Math. Scand. 10, 163-170 | **PROVEN**, one class only | users.renyi.hu/~p_erdos/1962-12.pdf |
| 7 | Ziller-Morack lower bound or asymptotic for `h2` | **ABSENT**; they have only Conjecture 6, an upper bound | arXiv:1706.00317, 1706.03668 + `full_details.pdf` |
| 8 | any lower bound at all attached to A288815 / A072753 | **ABSENT**; both entries carry none | OEIS |
| 9 | Jacobsthal-type function for admissible `k`-tuples, `k >= 3` | **NOT FOUND, and uncalibrated** | `abs:"Jacobsthal function"` returns 15 papers, none on point — a canonical-name query only, never re-run in a convention that owns a `k >= 3` analogue, so this is the reach of our search rather than an absence |
| 10 | Hagedorn's algebraic lower bound `h(n) >= 2p_{n-1}` | **PROVEN**, one class | Math. Comp. 78 (2009), Prop. 1.1 |
| 11 | Kourbatov's maximal twin-gap law | **CONJ**, and it is `0.76 log^3 p`, not `log^2` | arXiv:1301.2242 |
| 12 | computational work beyond Resta / Morack / Ziller | **REFUTED 2026-08-18**, it exists | OEIS **A144311**, three independent efforts: Carter 2008 `a(1)-a(7)`, Alekseyev 2009 `a(8)-a(16)`, Wang 2024 `a(17)-a(22)`, plus Wang's linked C++ branch-and-bound over the residue choice per prime. Also Hagedorn, Math. Comp. 78 (2009), for the one-class cycle |

Queries run and returning nothing on point: "long gaps in sieved sets two
dimensional", "Erdos-Rankin twin primes large gaps", "large gaps between twin
primes lower bound", "Jacobsthal function two residue classes lower bound",
"covering an interval with two residue classes per prime", "two-dimensional
sieved set long gaps lower bound construction twin primes Erdos-Rankin
analogue", "admissible k-tuple long gaps sieved set lower bound dimension
kappa", "gaps between prime constellations maximal", "paired Jacobsthal".

### 2a. What FKMPT's "one-dimensional" actually permits

Their Definition 1, **two of its four bullets**, verbatim except as noted.
*(Custody added 2026-08-18, PDF read: the block below silently drops the clause
"if the density of primes with |I_p| ⩾ 1 equals ρ, that is," from
(ρ-supportedness) — present in v3 and v4, absent in v2 — and silently repairs
their "sieving system system" typo. Neither changes the meaning, but a block
labelled "verbatim" may not do either without saying so. The omitted bullet
that matters is **(B-Boundedness)**, which is what licenses `B = 2` below.)*

> **(One-dimensionality)** We say that the sieving system is *one-dimensional*
> if we have the weighted Mertens-type product estimate
> `∏_{p<=x}(1 - |I_p|/p) ~ C_1/log x` (x → ∞), for some constant `C_1 > 0`.
> **(ρ-supportedness)** Given `ρ > 0`, we say that the sieving system is
> *ρ-supported* if `lim_{x→∞} |{p<=x : |I_p| >= 1}| / (x/log x) = ρ`.

Theorem 1 gives a gap `>= x(log x)^{C(ρ) - o(1)}` with `C(ρ) > e^{-1-6/ρ}`.
*(The constant is 6. arXiv v2 and v3 print `(4 + δ)·10^{2δ}` and
`e^{-1-4/ρ}`; arXiv v4 (19 Sep 2022) and the published corrigendum, JEMS 25
(2023), no. 6, 2483-2485, print `6·10^{2δ}` and `e^{-1-6/ρ}`. The 6 is
current and the 4 is retracted. The twin-primes remark below is Remark 8 in
v2 and Remark 7 from v3 on, and its text is unchanged.)*
The `n^2+1` example settles whether two classes per prime can be
one-dimensional: there `I_p = {ι_p, -ι_p}` for `p ≡ 1 (mod 4)` and
`I_p = ∅` otherwise, so `B = 2`, `ρ = 1/2`, the system **is**
one-dimensional, and Theorem 1 applies with **`C(1/2) > 1/325565`** — the
paper's own corrected figure, printed at v4 (1.7) and Corollary 2 and
enumerated in its Appendix A item (4). *(The v3 text gave `1/6001`, which is
54x larger; only the qualitative claim below depends on `C(1/2) > 0`, which
holds in every version.)*

**So two classes per prime on half the primes is inside a published theorem.**
Two classes on *all* primes is not, and the forced relation `ρ >= 1/B` says you
cannot be one-dimensional, 2-bounded, and supported on fewer than half the
primes. Their Remark 7, verbatim (v3/v4 text and v3/v4 bibliography
numbering, in which `[7]` is Halberstam and Richert, *Sieve Methods*,
Academic Press, London, 1974). **Read from the journal PDF of record — J. Eur.
Math. Soc. 23 (2021), 667–700, Remark 7 on p. 674, inside §1.1** — pulled as PDF
from `ems.press` under CC BY, and cross-read against the arXiv v4 PDF; the text
is unchanged from v3 on (verified 2026-08-18,
`research/history/staging/lit-pdf-fkmpt.md` quote 1):

> Unfortunately our methods only seem to give good results in the
> one-dimensional case. Consider for instance the set `{n ∈ P : n + 2 ∈ P}` of
> (the lower) twin primes. This corresponds to a two-dimensional system in
> which `I_p = {0 (mod p), 2 (mod p)}` for all primes `p`. The "trivial" bound
> coming from these methods would give a bound of `>> log X log log X` for the
> largest gap between lower twin primes up to `X` ..., and one could possibly
> hope to improve this bound by a small power of `log log X` using a variant of
> the methods in this paper. However, a sieve upper bound (e.g., [7, Cor.
> 2.4.1]) combined with the pigeonhole principle already gives a bound of
> `>> log^2 X` in this case.

And the structural reason, from their **§1.1, p. 673** of the journal text
(p. 7 in the arXiv PDF), verbatim. *(Corrected 2026-08-18: this read "§1.3",
which exists in no version — Section 1 has only §1.1 "Comparisons of methods"
and §1.2 "Notation". Both PDFs pulled and read; two independent passes found
this same error.)*

> ... bounds for smooth numbers cannot be used to show that `S_{z,x}` contains
> an interval with unusually few elements. Without this crucial step the
> existing methods only yield the trivial lower bound of `>> x` for the gap
> size.

The smooth-number step is the whole Erdős-Rankin lineage.

**But the gloss "specific to `I_p = {0}`" overreaches this quotation, and the
overreach is corrected here, 2026-08-18.** The passage is elided at its front,
and the elided opening puts the obstruction on the OTHER axis: it arises where
`|I_p|` **vanishes for many primes**, that is at `ρ < 1`, not at `|I_p| = 2`.
Our reading is supported only by the sentence they write *next*, which this
document does not quote — that the difficulty is "genuinely unique to the
Eratosthenes sieving system". Quote that sentence or drop the gloss; do not
rest it on the passage above, which does not say it.

### 2b. The question is posed as open, by Ford and Tao

Banks, Ford and Tao, *Large prime gaps and probabilistic models*, §1.7 Open
Problems, item (3), verbatim. **Read from the arXiv:1908.08613v3 PDF, page 8**,
where §1.7 sits in v1, v2 and v3 alike; the published article is Invent. Math.
233 (2023), no. 3, 1471–1518, whose typeset PDF is paywalled and was **not**
obtained, so no page of it is claimed (verified 2026-08-18,
`research/history/staging/lit-pdf-banks-ford-tao.md` item 1):

> Analyze the distribution of large gaps between special elements of `R`. For
> example, what is the largest gap between elements of
> `{n : n ∈ R, n + 2 ∈ R}` below `x`? This should be a good predictor for the
> maximal gap between pairs of twin primes and likely will involve **a
> different extremal sieve problem**.

That is exactly `G2`, posed as open by two of the authors of the machinery we
are trying to adapt. It is the strongest confirmation available for the rows
above that survive — but rows 3, 5 and 12 did not survive 2026-08-18, so this
table's absences are not uniformly safe. Each surviving row now names the
convention it was searched in, to the standard of `SEARCH-CONVENTIONS.md`.

### 2c. Where Maier and Pomerance's exponent 2 comes from

Their p. 205, verbatim:

> **The traditional argument is to use each prime in `(z, x]` to delete a
> single member of `R ∪ R'`.** ... What we will show below is that **for a
> certain positive proportion of the primes in `(z, x]`, we can remove two
> members of `R ∪ R'`** ...
> **If `R ∪ R'` can be viewed as a random set of residues mod `q` ... then we
> would expect to be able to remove `(log x)^{1+o(1)}` members of `R ∪ R'` for
> a positive proportion of these `q`'s. If such an argument could be made
> rigorous we would have a proof of (1.5).**

So the conjectured exponent decomposes as **1 + 1**: one `log` from the
classical one-element-per-large-prime step, one more from the conjectural
`(log x)^{1+o(1)}` elements per large prime. Their own theorem realises only
"two elements for a positive proportion", which buys the constant
`c_0 = 1.31256` and nothing in the exponent. Ford's Montreal slides record that
even granting a uniform Hardy-Littlewood conjecture the best claimed is
`J(T) >> T(log T)^{1+c}`, not exponent 2 (Kevin Ford, *Large gaps between
primes*, Talk 1, CRM Montreal workshop *Probability in Number Theory*, 2018,
[ford126.web.illinois.edu/montreal_talk1_primegaps.pdf](https://ford126.web.illinois.edu/montreal_talk1_primegaps.pdf),
verbatim: *"Assuming a uniform H-L prime k-tuples conjecture: ... Improve lower
bound to `J(T) >> T(log T)^{1+c}`"*).

**Nobody has run *this* accounting in dimension 2 — searched against arXiv:2302.00459, which owns the multi-class construction — and §4 does it, but the
blanket form of that sentence was false and is corrected here, 2026-08-18.**
Kalmynin and Konyagin, Izv. Math. 88:2 (2024) 225-235 = arXiv:2302.00459, do
publish a multi-class Erdős-Rankin construction and do run the dimension-2
Mertens ledger; `covering-dive.md` §4.2 recorded that and handed the correction
back here by name, where it sat unapplied. What survives is the narrower claim:
the ledger run in §4 is **Maier-Pomerance's**, whose three-entry decomposition
is not theirs. Their object is `j_f`, a shift of the **value**; ours is a shift
of the **argument**, and `covering-dive.md` §4.2 CORRECTION 2 shows the two
families of 2-element sets differ — theirs has fixed centre and varying
separation, ours varying centre and separation fixed at 2.

---

## 3. The best PROVEN lower bound, and it costs nothing

Since `Y1(x) = g(x#) - 1` is the classical Jacobsthal quantity and
`G2(x#) >= g(x#)` pointwise (§1):

> **PROVEN.** `G2(x#) >= g(x#) >> x · log x · logloglog x / loglog x`, by
> Ford-Green-Konyagin-Maynard-Tao, JAMS 31 (2018), via Rankin 1938 and
> Pintz 1997.
>
> **CONJ.** Under Maier-Pomerance, `g(x#) = x (log x)^{2+o(1)}`, so
> `G2(x#) >= x (log x)^{2+o(1)}`.

This is the strongest lower bound available for `G2` today and it is not in the
repo. It is also not attached to A288815 or A072753, which currently carry no
lower bound of any kind. Writing it down is a free, citable micro-result, and
it is genuinely the first lower bound anyone has recorded for the two-class
Jacobsthal function.

Against the threshold: `x^2 / (x log x) = x/log x → ∞`. The margin is
`x^{1-o(1)}`.

---

## 4. The construction attempt, and what the honest analogue is

### 4a. The naive expectation, and why it is wrong

Two classes per prime carry more covering power per prime than Rankin's one, so
naively the two-class lower bound should be stronger. It is, and the question
that matters is **by how much**. The answer is a factor of `log x`, not a power
of `x`, and here is the accounting.

### 4b. The two-class Rankin adaptation (INFERRED, ours)

**SUPERSEDED IN STRENGTH, 2026-08-19, by §4c below.** The sketch in this
subsection reaches `y ≍ x log x`, and the substitution of `Ω_p = {a_p, a_p−2}`
into Kalmynin–Konyagin's published construction now reaches **two logs higher**,
with a written proof and an adversarial check. Read §4c first; this subsection is
kept because its stage-1/stage-2 accounting is the cleanest statement of why
`β₂` never enters a construction.

Target: cover `[1, y]` using primes `p <= x`, two classes each.

*Stage 1, the sieving stage.* For `p <= z` take `I_p = {0, -2}`. This covers
every `n` such that `n` or `n+2` has a prime factor `<= z`. The survivors are
the `n <= y` with `n` and `n+2` both `z`-rough. Their count is bounded above by
the dimension-2 Brun/Selberg **upper**-bound sieve, `<< y ∏_{2<p<=z}(1 - 2/p)
<< y/(log z)^2`, valid for `z <= y^{1/2-ε}`. Note that only an upper bound is
needed here, and upper-bound sieves have no sifting-limit obstruction, so
`β_2 = 4.2665` never enters the construction.

*Stage 2, the mop-up.* Use primes in `(z, x]`, two classes each, one survivor
per class. Capacity `2(π(x) - π(z)) ~ 2x/log x`. Feasibility needs
`C y/(log z)^2 <= 2x/log x`, and with `z = y^{1/2}` this is
`y <= (2/(4C)) · x (log y)^2 / log x ≍ x log x`.

The identical accounting with one class gives survivors `~ y e^{-γ}/log z` and
`y ≍ x`, which is the Westzynthius level and the correct base for Rankin's
refinements.

### 4c. The Kalmynin–Konyagin substitution, carried out (DERIVED HERE, complete, independently checked, NOT refereed)

*Paper status and draft: `paper/proposals/prop-kk-lower-bound.md`
(QUICK-DRAFT); the short draft is `paper/proposals/draft-kk-lower-bound.md` and the full write-up, with the y ln y chain as a second theorem and a per-number provenance appendix, is `paper/kk-lower-bound.md` (2026-08-28).*

> **`G₂(P(y)) ≫ y (ln y)³ (lnlnln y)² / (lnln y)⁴` for `y ≥ y₀`.**

**What it is.** Kalmynin and Konyagin, *A polynomial analogue of Jacobsthal
function* (arXiv:2302.00459; Izv. Math. 88:2 (2024) 225–235), publish a
multi-class Erdős–Rankin construction. Substituting `Ω_p = {a_p, a_p−2}` into
their §2 trichotomy carries the construction to our object. That substitution was
executed line by line on 2026-08-19 and the result is a proof, not a sketch:
`history/staging/attack-kk-substitution.md`, producer
`research/attack-kk-substitution.js`.

**What it consumes**: their Lemma 1 and Corollary 1 at `κ = 4` (they use 6),
Mertens with Rosser–Schoenfeld, the standard smooth-number estimate, CRT, and §1
of this file. **What it does NOT consume, and this is the surprise**: their
Lemma 2, Chebotarev, Theorem 2, Lemma 3 and `M(f)` — the entire §3 apparatus of
the paper — because `h_f = 0` for the two-linear-factor system makes their
`Ω^II` empty, so Case 2's hypothesis quantifies over an empty set.

**Why the two formulations never collide.** Band 1 chooses `a_p = 0`, and at that
choice the free translate and the fixed sieve pair `{0,−2}` are the same set, so
the covering-form freedom is spent in band 2 alone. `research/qc/units.js` §5
exists because that distinction has caused an error here before; this
construction never has to reconcile the two.

**Independently checked, adversarially, the same day**
(`history/staging/verify-kk-substitution.md`). The checker pulled the source PDF
itself (md5 `b5d7d2a23ffd902415057adebfe430b1`, matching), re-read every
load-bearing display from 200 dpi page images rather than `pdftotext`, and
**brute-forced the finite content**: over `i = 1…4·10⁶` at `y = 200000`,
`z₁ = 300`, with `2m/y < z₀` satisfied there were **zero counterexamples** among
16985, 14381 and 13164 unkilled `i` at `z₀ = 100, 60, 45`, while violating it
produced 235, 799 and 2921 counterexamples at `z₀ = 30, 20, 10`. The one
hypothesis Case 1 claims to consume is sufficient at finite scale — verified
counterexample-free wherever it holds, and violated far enough it breaks,
though not at the boundary, so it is not necessary — which also rules out a
covering/sieve leak, since a leak would surface as a counterexample. Verdict: **STANDS WITH CORRECTIONS**, the corrections being to
the report's checks and presentation rather than to the theorem — including that
the proof needs `A > 4` where a draft said `A > 3` for one step, and that a
`ξ = √y` Selberg support leaves a remainder above the main term and must be taken
at `ξ = √y/(ln y)⁷`, where the fact holds. *(Superseded 2026-09-07: the source's
Lemma 1 is the Brun-form bound with pointwise `|r_d| ≤ g(d)` and no support
parameter, so this correction and its two riders concern a theorem K–K do not
cite; `paper/kk-lower-bound.md` §6.2 is now a remark and §11.2 records the
re-read.)* Two riders from the second check, now moot for the theorem consumed:
the remainder exponent is `3κ − 1 = 11`, so `κ = 4` rather than their 6 is what
makes that support suffice; and the support must be named with its sifting
parameter — as written `ξ < z = √y`, and the free repair is to sieve at
`z = ξ`, which changes `V(z)` only by `1 + o(1)`.

**What it costs, and it is why no computation can see it.** The binding
condition is always `z₀ < z₁`, and the six asymptotic hypotheses first all hold
at `y₀ = 10^{134.1}` (`A = 4.05`) with every implied constant set to 1 — a
floor on the true explicit `y₀`, not its value. Band 2 is empty at `y = 4001` for every `A > 4`, so no finite search
in this corpus can exhibit the construction, and the D4 factor-5 loss recorded in
`history/staging/attack-lower-bound.md` is **not evidence about it**.

**How to quote it.** It is our deduction from a published construction, complete
and checked here and **not refereed**, so it carries [INFERRED] by this corpus's
legend and must be stated with the derivation named. It does not touch the Zone
Postulate's margin: `x²/(x ln³x) → ∞`, so the margin remains `x^{1−o(1)}`.

**What sits above the unconditional bound.** In the `x` frame the theorem
reads `G₂(x#) ≫ x (ln x)³ (lnlnln x)²/(lnln x)⁴`, and its exponent decomposes
as `ℓ_f + M(f) − 1`: the Erdős–Rankin base contributes 1, the dimension-2
survivor density (`ℓ_f = 2`) contributes +1, and the band-2 device
(`M(f) = 2`) contributes +1 — all three unconditional. The Maier–Pomerance
multi-kill upgrade sits on top of that and is still conjectural. (Their own
exponent decomposes as `1 + 1`, §2c; Kalmynin–Konyagin run a dimension-2
Mertens ledger of their own, `covering-dive.md` §4.2.)

| source of a `log` | one class | two classes |
|---|---|---|
| Erdős-Rankin base, one survivor per large prime | 1 | 1 |
| survivor density after the small primes, `1/(log z)^κ` | 0 | **+1** |
| the band-2 device, `M(f) = 2` (§4c, unconditional) | 0 | **+1** |
| Maier-Pomerance multi-kill, `(log x)^{1+o(1)}` survivors per large prime | +1 (CONJ) | +1 (CONJ) |
| **total exponent of `log x` above `x`** | **2 (CONJ)** | **4 (CONJ); 3 unconditional** |

The multi-kill row is the same size in both dimensions — the count cannot
exceed the survivors in one class, about `y/(p (log x)²)`, which at `p ≍ x`
and `y ≍ x (log x)³` is `(log x)^{1+o(1)}` — so the conjectural two-class
ceiling is **`G₂(x#) = x (log x)^{4+o(1)}` (CONJ)**, one log above the
unconditional floor, and still `x^{1+o(1)}`: the Zone Postulate's margin is
untouched either way.

Sanity: A048670's own OEIS comment draws the corresponding conclusion one
dimension down, *"Maier & Pomerance conjecture ... which suggests
`a(n) = n*(log n)^{3+o(1)}`"*, which in the `x` frame is `x (log x)^2` — the
one-class column of the table.

### 4d. Where the counting argument fails, and it fails in both directions

It is worth recording that **no counting argument bounds `Y1` or `G2` from
above**, so the shortfall in §4b is a limitation of constructions, not a
theorem. At `x = 1009` with `z = 17` the measured survivor count is 2438
against 162 remaining primes, and the mid-range primes have total capacity
`2y(loglog x - loglog z) = 1.78 y`, nearly twice what is needed. The binding
constraint is overlap, not capacity. That is exactly why Iwaniec's `x^2` is the
only known ceiling, and why Erdős #687 is worth $1000.

### 4e. The Rankin-shaped hybrid is not better than plain greedy (MEASURED)

Fixing `a_p = 0` for all `p <= z` (the literal Stage 1 above) and greedily
choosing the rest was run for 17 values of `z` at `x = 229, 571, 1009`. The
hybrid's best readings are 7066 at `x = 229` (`z = 17`), 25606 at `x = 571`, and
55900 at `x = 1009`. **Plain greedy, searched properly (§5), beats all three**:
7372, 26303 and more at the same `x`. Every `z` above about `x/6` degrades
sharply. So the greedy already discovers the Rankin structure by itself and the
Rankin shape carries no hidden extra power.

**Read that at the calibration it has, which is coarse.** The hybrid side was
run with the same under-searched estimator §5 replaces, so a repaired hybrid
would also rise, and the honest statement is that the two constructions agree to
within the search noise of a few per cent rather than that either wins. Nothing
in §4b depends on which one is ahead; what matters is that neither is `x^{1+δ}`.

---

## 5. MEASURED: the certificate ladder, and the instrument test that licenses it

The construction is a genuine certificate. The greedy emits an explicit
`(a_p)_{p<=x}`, and a separate routine replays it from scratch, rejecting a prime
used twice, a prime outside the allowed set or a class out of range, and counting
uncovered points. Every level below verifies with zero uncovered.

**CUSTODY, three ways.**
- Brute-force `G2(x#)` from the tile at `x = 5, 7, 11, 13, 17` reproduces the
  repo ladder 12, 30, 42, 66, 108 exactly, which also confirms the §1 identity.
- The difference-2 greedy against all fourteen exact `G2` terms: ratio **1.000 at
  thirteen of them and 0.990 at the fourteenth**, `x = 43`, §5b. It never
  exceeds the exact value, as it must not.
- The free-choice greedy against Resta and Morack's ILP optima A072753: ratio
  1.000 at `n = 3 .. 8`, then 0.777 to 0.979 over `n = 9 .. 21`, **falling** —
  `1.538 x^{-0.1440}` over the budget-matched stretch `x = 23 .. 59`.

### 5a. The search, and why the obvious one is wrong

The quantity wanted is the LARGEST `m` the greedy family can cover, and **greedy
feasibility is not monotone in `m`**. Enlarging the target changes every gain and
so the entire choice sequence, which means the greedy can fail at `m` and succeed
at `m+1`. This is measured, not feared. At the budget used for the exact levels
there are 8 to 12 infeasible values of `m` below the maximum at each of
`x = 29, 31, 37, 41`, and the longest unbroken run of them is 7 at `x = 31`. For
the deterministic greedy alone the holes are far worse: at `x = 31` there are 34
infeasible values below its real reach of 305, and the first of them sits at 234,
which is why a bisection returns 233. **A bisection is therefore wrong, and so is
an upward scan that halts at the first failure — the same error in a different
costume.**

The search has three phases and none of them assumes monotonicity.

| phase | what it does | why it terminates |
|---|---|---|
| **A** anchor and double | find one feasible target, then multiply by 1.6 until one fails | a full cover of `[1,t]` exhibits a legal `(a_p)`, so `t <= G2(x#) − 1 < ∞`, and `t` grows geometrically |
| **B** scan and refine | between the largest feasible `lo` and the failing `hi`, try **every** one of `NG` interior grid points; move `lo` to the LARGEST feasible one seen, stepping over holes, and `hi` to the smallest failure above it; repeat | `hi − lo` shrinks by a factor of at least `NG+1` per pass |
| **C** window polish | scan `m = best+1 .. best+W` exhaustively, not stopping at a failure; any progress restarts the window | `best` strictly increases each restart and `best <= G2(x#) − 1` |

Two further properties matter.

**Every run certifies its prefix.** A greedy that fails at `m` still leaves a
covered run `[1, r]`, and that run is a valid certificate for `r`. So a failure
is evidence, not a wasted call, and no phase depends on a yes/no answer alone.

**Randomisation is seeded.** Within a prime the argmax is drawn uniformly among
ties; each round's move is drawn uniformly among the top `K` (prime, pair)
candidates by gain, `K` cycling over 4, 2, 3, 5; every stream comes from
`SEED_BASE = 20260818` through mulberry32. There is no `Math.random()` anywhere
in the file. The budget is a cap on greedy **calls**, never on seconds, because a
wall-clock cutoff would make the output irreproducible.

**What is and is not proved.** The result is exhaustive over `(best, best+W]` and
best-effort below it, so it is the exact maximum of the searched family *provided
no feasible target sits more than `W` above it*, with `W = 200` at the exact
levels against a measured worst hole of 7. Whatever the search missed, the number
reported is a **certified lower bound** on `G2(x#) − 1`, which is the only
direction this quantity is ever used in.

The 2026-08-17 search failed all three of these. It bisected on the
non-monotone predicate, it used two fixed tie-break rules and no randomisation,
and it seeded each level's bracket from the level below, so the ladder depended
on the order it was run in. The bracket seed is now the closed form
`x·ln²x`, which also makes the levels independent and the ladder shardable.

### 5b. THE ORACLE TEST: is the corrected greedy an exact solver for `G2`?

The comparison is the greedy's achieved run against `G2(x#) − 1`, which by §1
**is** the covering optimum at thirteen of the fourteen exactly-known terms,
and reaches 0.990 of it at the fourteenth. The rule was
fixed before the test was run: ESTABLISHED if greedy = optimum at 12 or more of
13 and at least 0.99 of optimum at all 13; DEAD if the ratio degrades with `x`.

| `x` | 2 | 3 | 5 | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 | 37 | 41 | **43** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `G2(x#) − 1` | 1 | 5 | 11 | 29 | 41 | 65 | 107 | 149 | 203 | 257 | 347 | 527 | 545 | **617** |
| repaired search | 1 | 5 | 11 | 29 | 41 | 65 | 107 | 149 | 203 | 257 | 347 | 527 | 545 | **611** |
| ratio | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | **0.990** |

> **VERDICT: ORACLE ESTABLISHED, 13 of 14 exact, minimum ratio 0.9903, log-log
> slope of the ratio against `x` equal to −0.0035 over `x >= 13`.** The rule was
> pre-registered at thirteen levels and is **not rewritten**: ESTABLISHED needs
> ≥ 12 of 13 exact and ≥ 0.99 at all, and 13 of 14 at 0.9903 clears it. The
> denominator is reported out of **fourteen** so the miss cannot hide in it.

**The clean sweep is over, and 43# is the level that ended it — 2026-08-18.**
This section previously read "13 of 13 exact, minimum ratio 1.0000" and
concluded that the construction attains the optimum at every `x` where the
optimum is known. The fourteenth exact term arrived the same day and the search
reaches **611 against 617**.

**What that does and does not mean, and the two are easy to conflate.** It does
**not** show the greedy rule fails at 43#. §1c-3 measures the search *budget*
needed to hold the ratio at 1.000 degrading by a factor of **3.31 per added
prime**, so a miss at the newest and largest level is precisely what the budget
model already predicts, and the run that found 611 used the same schedule as
the levels below. Budget and structure are **not separated by this run**. The
test that separates them is one level re-run alone at a much larger budget: if
617 appears, it was budget; if it does not, the sweep genuinely broke here. That
test has not been run.

What survives unchanged is the direction of the claim. The search is a
**construction**, so every number in its row is a lower bound on the optimum —
611 ≤ 617 is consistent, and a row that ever printed *above* the optimum would
be impossible and is checked for. The thirteen exact levels are still exact.

### 5b-ii. The extension to x = 79, and the budget/structure question settled

A144311 supplies eight more exact optima at x = 47…79 (proven maximal — the
branch-and-bound's pruning test is admissible, `sift-limit-attack.md` §7). They
are levels no enumeration here could reach: 2.8 × 10¹⁰ years at x = 79. Scored
apart from the pre-registered verdict, since they are Alekseyev's and Wang's.

At the schedule's own budget the ratios fall away — minimum **0.8995**, log-log
slope **−0.133**. **That is not evidence about the greedy rule**, and a first
version of the script's reading line wrongly said it was. The budget schedule
drops `maxCalls` from 3 × 10⁶ to 1.2 × 10⁵ and restarts from 512 to 96 at
np = 16, which is **x = 53, exactly where the ratios fall**; x = 47 is the only
extension level that keeps the np ≤ 15 row and it is the one that nearly hits
exact. Meanwhile §1c-3 has the budget *needed* rising **3.31× per added prime**.
Schedule falling and requirement rising at the same boundary is what an
under-budgeted search looks like.

**The discriminating run, `--force-budget=15`:** every level improves and the
trend halves.

| x | 47 | 53 | 59 | 61 | 67 | 71 | 73 | 79 | min | slope |
|---|---|---|---|---|---|---|---|---|---|---|
| own budget | 0.992 | 0.959 | 0.982 | 0.944 | 0.899 | 0.917 | 0.942 | 0.937 | 0.8995 | −0.133 |
| forced np ≤ 15 | 0.992 | **0.962** | **0.988** | **0.953** | **0.944** | **0.940** | **0.973** | **0.957** | **0.9399** | **−0.065** |

**Reading: the shortfall is budget-dominated.** One schedule step recovered about
40% of the gap and halved the trend, and one step is nowhere near enough — at
x = 79 the 3.31×-per-prime law asks for roughly 10⁹ times the x = 43 budget.
**Nothing here shows the greedy failing structurally.** Nor does it show the
greedy *is* the optimum above x = 41; that stays open, and the honest statement
is that these levels are too far under budget to test it either way.

**A by-product: the new thirteenth exact term is corroborated.** The window
polish scans 200 targets above the value it settles on and finds none feasible,
at `x = 37` above 527 and at `x = 41` above 545. An instrument that hits the
optimum thirteen times out of thirteen and then finds nothing in the next 200
is weak independent support for `G2(37#) = 528` and for the newly computed
`G2(41#) = 546`. Weak, because a greedy failing proves nothing; real, because
this greedy does not fail where the optimum is known.

The claim is about the greedy **rule**, and it is a strong one: a rule with no
lookahead, choosing one prime and one residue pair per round by immediate gain,
recovers the exact adversarial optimum thirteen times out of thirteen. The
same instrument run on the free-choice problem (§5, custody) reaches Resta and
Morack's ILP optima exactly at six of nineteen terms and 0.78 to 0.98 elsewhere,
so the exactness is a property of the difference-2 problem, not of the estimator
being generous.

### 5c. What the oracle test does NOT license, and this is the load-bearing caveat

The ratio does not degrade with `x`. **The budget needed to hold it at 1.000
does.** Measuring the number of randomised restarts to first reach the optimum,
at the optimum's own target, median over 25 independent seed bases:

| `x` | 13 | 17 | 19 | 23 | 29 | 31 | 37 | 41 |
|---|---|---|---|---|---|---|---|---|
| primes `<= x` | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 |
| median restarts to hit | 3 | 5 | 6 | 21 | 1 100 | 1 038 | 282 | 17 999 |

`log(median)` rises by 1.196 per extra prime, a factor of **3.31 per prime**.
Extrapolated to `x = 229`, which has 50 primes, that is `10^19` restarts. The
ladder gets between 2 and 512.

> **So the oracle property is established for the greedy RULE at `x <= 41` and is
> NOT established for the greedy AS RUN on the ladder.** Every `Y2` in §5d is a
> CERTIFIED LOWER BOUND on `G2(x#) − 1` of unmeasured fidelity, and a falling
> `Y2/x²` does not show that `G2/x²` falls. That inference was drawn here on
> 2026-08-17 and it was not licensed then either.

**Two proxies bracket the ladder, and both are pessimistic for our object.** `G2`
is known only to `x = 41`, but the identical repaired estimator can be scored
against the one-class optima to `x = 229` (A048670, fifty terms) and against the
free-choice ILP optima to `x = 73` (A072753):

| object | exact terms | budget | fidelity fit | at `x = 41` | at `x = 4001` |
|---|---|---|---|---|---|
| difference-2, ours | `x <= 41`, 13 | `R = 512` | **1.000, slope 0.0000** | **1.000** | not measurable |
| one class, A048670 | `x <= 229`, 50 | **the ladder's own schedule** | `1.232 x^{-0.0638}`, exact at 16 of 50 | 0.972 | 0.725 |
| free 2-class, A072753 | `x <= 73`, 19 | the identical `R = 512` | `1.538 x^{-0.1440}`, exact at 6 of 19 | 0.901 | 0.466 |

The two proxies are matched to different things and that is deliberate. The
one-class row runs at the **same budget schedule §5d gives the ladder**, so it
says what this budget does to fidelity as `x` grows: it costs 27% by `x = 4001`.
The free-choice row runs at the **same `R = 512` that makes the difference-2
greedy exact**, so it says the exactness is not the budget: at `x = 41`, same
budget, same rule, the difference-2 answer is 1.000 and the free-choice answer is
0.901.

**Both proxies are already below 1 at `x = 41` where ours is exactly 1, so both
are pessimistic for the difference-2 object and neither pins it.** That is the
whole of what is known about the ladder's fidelity. It is a bracket, `[0.47,
0.73]` at `x = 4001` if our object behaved like either of them, and there is no
measurement.

### 5d. The ladder

*(Reproducibility checked 2026-08-19: all sixteen levels re-run as sixteen
independent detached processes reproduce this table digit for digit, in Y2
and the Y1 control alike — level independence is measured, not asserted.
`research/y2-ladder-recompute.js`, `history/staging/y2-recompute.md`.)*

`Y2` is a CERTIFIED **lower bound** on `G2(x#) - 1`: the greedy's explicit
`(a_p)` was replayed by a separate routine and every point of `[1, Y2]`
confirmed covered, at every level, with prime reuse, out-of-list primes and
out-of-range classes rejected. `Y1` is the identical repaired estimator run on
the one-class problem, whose true exponent is 1, replayed the same way. `R` and
`W` are the per-level restart count and window width. The budget shifts from `R`
to `W` up the ladder because §5c shows restarts stop paying long before the
instances get large, while the bisection defect `W` repairs is worth 5 to 8 per
cent right across it.

|  x   | R | W | Y1 (1 class) | **Y2 (diff-2)** | 2026-08-17 Y2 | new/old | Y2/Y1 | (Y2/Y1)/ln x | Y2/x² | Y2/(x ln²x) | replay |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 37 | 512 | 200 | 65 | **527** | 355 | 1.485 | 8.11 | 2.2453 | 0.38495 | 1.0924 | OK |
| 73 | 96 | 120 | 182 | **1,440** | 1,211 | 1.189 | 7.91 | 1.8441 | 0.27022 | 1.0716 | OK |
| 113 | 96 | 120 | 311 | **2,823** | 2,501 | 1.129 | 9.08 | 1.9201 | 0.22108 | 1.1179 | OK |
| 167 | 96 | 120 | 462 | **4,728** | 4,210 | 1.123 | 10.23 | 1.9996 | 0.16953 | 1.0808 | OK |
| 229 | 32 | 96 | 658 | **7,372** | 6,748 | 1.092 | 11.20 | 2.0619 | 0.14058 | 1.0903 | OK |
| 313 | 32 | 96 | 1000 | **11,682** | 10,469 | 1.116 | 11.68 | 2.0330 | 0.11924 | 1.1303 | OK |
| 421 | 12 | 80 | 1391 | **17,280** | 16,453 | 1.050 | 12.42 | 2.0558 | 0.09749 | 1.1241 | OK |
| 571 | 12 | 80 | 2005 | **26,303** | 25,469 | 1.033 | 13.12 | 2.0668 | 0.08067 | 1.1433 | OK |
| 773 | 12 | 80 | 2906 | **40,644** | 39,277 | 1.035 | 13.99 | 2.1031 | 0.06802 | 1.1889 | OK |
| 1009 | 4 | 64 | 3928 | **57,245** | 56,213 | 1.018 | 14.57 | 2.1070 | 0.05623 | 1.1859 | OK |
| 1301 | 4 | 64 | 5469 | **82,013** | 81,986 | 1.000 | 15.00 | 2.0912 | 0.04845 | 1.2259 | OK |
| 1699 | 4 | 64 | 7447 | **117,596** | 118,367 | 0.993 | 15.79 | 2.1231 | 0.04074 | 1.2512 | OK |
| 2003 | 4 | 64 | 8938 | **143,942** | 144,712 | 0.995 | 16.10 | 2.1183 | 0.03588 | 1.2434 | OK |
| 2503 | 2 | 64 | 11639 | **195,617** | 191,927 | 1.019 | 16.81 | 2.1478 | 0.03122 | 1.2763 | OK |
| 3001 | 2 | 64 | 14324 | **247,877** | 245,270 | 1.011 | 17.31 | 2.1613 | 0.02752 | 1.2884 | OK |
| 4001 | 2 | 64 | 19775 | **354,729** | 356,711 | 0.994 | 17.94 | 2.1627 | 0.02216 | 1.2888 | OK |

Extension past the 2026-08-17 ladder, same budget schedule. Still a LOWER
bound on `G2(x#) - 1` at every row, and at a budget thinner than any row above:

|  x   | R | W | Y1 (1 class) | **Y2 (diff-2)** | Y2/Y1 | (Y2/Y1)/ln x | Y2/x² | Y2/(x ln²x) | replay |
|---|---|---|---|---|---|---|---|---|---|
| 5003 | 2 | 64 | 25723 | **479,339** | 18.63 | 2.1877 | 0.01915 | 1.3206 | OK |

The `new/old` column is the gain from repairing the search and nothing else: the
greedy rule and the object are unchanged, and §1b regenerates the old column from
the same file — all sixteen 2026-08-17 levels reproduce exactly and replay clean.
**The gain shrinks up the ladder, from 1.485 to about 1.0, and that is a
statement about the search budget running out, not about the old search having
been nearly right at the top.**

At `x = 1699`, `x = 2003`, `x = 4001` the repaired search at its budget lands BELOW the 2026-08-17 chained run (117,596 against 118,367; 143,942 against 144,712; 354,729 against 356,711). Both are machine-verified certificates, so **the certified lower bound at those levels is the larger, older number**, and the repaired column is the weaker of the two there. That is not a defect of the repair; it is §5c arriving. The old search reached those values by chaining its bracket from the level below, which is free information the repaired search deliberately refuses in exchange for level independence, and at the top of the ladder that free information is worth more than the repair.

Three readings, in order of importance, and all three are readings of a lower
bound.

**1. `Y2/x^2` falls by a factor of 17.4 over the ladder**, from 0.385 to
0.022, monotonically, over a 108-fold range in `x`. `Y2/(x ln^2 x)` moves by
only 1.20x over the same range and is nearly flat above `x = 229`. The
construction is `x · polylog`, not `x^2`. What that licenses is a statement
about the construction; `G2` itself is pinned only to `x = 41`, where the
construction IS `G2 - 1` and `G2/x^2` is flat (§10).

**2. `(Y2/Y1)/ln x` sits at 2.1.** The ratio of the two-class to the one-class
construction is about `2.1 ln x`, within 5% of 2.06 everywhere from `x = 229`
upward and drifting up to 2.16 at the top rather than being flat. Fitting the
ratio as a power of `ln x` gives exponent 1.08 on the whole ladder, 1.14 on the
top twelve points, 1.15 on the top eight and 1.21 on the top five. **The second
class buys one factor of log, measured: the exponent is 1.1 ± 0.1 across every
window and shows no sign of approaching 2.** It is not converging down onto 1 —
it is sitting slightly above it and drifting the wrong way by about 0.13 across
the ladder, which is inside the drift the two estimators' own fidelities can
account for. That is the same number the Rankin accounting of §4b predicts from
theory, and the agreement is to a tenth, not to a decimal. This reading is the
most robust
of the three, because both sides are the same estimator at the same budget, so a
fidelity loss largely cancels — and at the bottom rung it is not an estimate at
all: `Y1(37) = 65 = g(37#) − 1` and `Y2(37) = 527 = G2(37#) − 1` are **both the
exact optima**, so the ratio there is the true one.

**3. The matched estimator, and this is the calibration that matters.**
Identical estimator, identical range, on an object whose answer is known:

| range | one class (truth: exponent 1) | two class | excess |
|---|---|---|---|
| [37, 4001], 16 pts | `0.991 x^{1.1986}` | `3.880 x^{1.3858}` | 0.187 |
| [229, 4001], 12 pts | `1.064 x^{1.1882}` | `4.802 x^{1.3561}` | 0.168 |
| [773, 4001], 8 pts | `1.212 x^{1.1712}` | `6.032 x^{1.3261}` | 0.155 |
| [1699, 4001], 5 pts | `1.491 x^{1.1449}` | `7.491 x^{1.2987}` | 0.154 |

The control reports 1.14 to 1.20 when the truth is 1, so the estimator carries a
bias of about +0.17 at these sizes. Subtracting it, **the corrected two-class
exponent reads 1.15 to 1.19 and is falling with range.** This is the same phenomenon
`research/exponent-control.md` establishes on exact terms, extended here from
`x <= 73` to `x <= 4001`.

**That is a reading of the certificate ladder, not of `G2`.** The exact terms
put through the same control give 1.50 central on the 22 trusted terms (h2's
control figure stays 1.57), practical bracket 1.3 to 1.8, hard floor 1
(`exponent-control.md` §5, the 22-term refit). An exact maximum and a
constructive lower certificate are different objects, so the two numbers are
not in competition: quote **1.50 for the exponent of `G2` itself and about 1.2
only for the greedy lower ladder** (`G2-STATE.md` §6.1).

**Caveat, stated plainly, and it is the same one as §5c.** `Y2` is a lower bound
and its fidelity above `x = 41` is unmeasured, so an exponent read off it could
understate the truth by whatever the fidelity does. Three fidelity curves exist
for this estimator family, and they do not agree:

| object | truth available to | fidelity at a matched budget |
|---|---|---|
| difference-2, `G2` — the object of this note | `x = 41` | **1.000 at all 13 terms, no trend** |
| free 2-class, Resta/Morack A072753 | `x = 73` | `1.538 x^{-0.1440}` over `x = 23 .. 59` at the identical `R = 512`, mean 0.909 |
| one class, A048670 | `x = 229` | `1.232 x^{-0.0638}` over `x = 11 .. 229`, exact at 16 of 50 terms, reading 0.972 at `x = 41` |

At the **same** budget and the **same** `x = 41`, the greedy is exact on the
difference-2 problem and 0.90 on the free 2-class problem. So the exactness is a
property of the difference-2 structure, not of the budget being generous, and
the free-choice decay is not automatically our decay. That is a reason to think
the two-class ladder degrades slower than the free-choice one, and it is not a
measurement of how much slower. **Evidence, not proof, and the direction of the
error is that the ladder understates.**

---

## 6. The Poisson-extremes law, and it is better than anything we had

The `Y2/Y1 ≍ ln x` result has an exact analytic form, and the constant is one
the repo already verified.

Ford's slides give the random-dart prediction for one class as
`J(T) ~ T·Q_T/φ(Q_T) ~ e^γ T log T`. Reading that as extreme-value statistics
makes the generalisation immediate: for a sifted set of mean gap `m` inside a
period `W`, the number of gaps is `W/m` and the maximum of that many
exponential gaps is `~ m · ln(W/m)`. So

> **max gap ≈ c · m · (θ(x) − ln m)**, with `m` the exact mean gap of the
> sifted set and `θ(x) = ln x#`.

- one class: `m1 = x#/φ(x#) ~ e^γ ln x`, giving `~ c e^γ x ln x`;
- two classes: `m2 = x#/∏(q−2) ~ e^{2γ} ln²x/(2C₂)`, the constant VERIFIED in
  `ZONE-POSTULATE.md` §6, giving `~ c e^{2γ} x ln²x/(2C₂) ≈ 2.40 c · x ln²x`.

**Tested against every exact value that exists (MEASURED). Every row is the
whole period, `lnD/θ(x) → 1`, which is the diagonal of §6a:**

| `c` | object | terms | `x`-range | mean | sd | cv | range of `c` |
|---|---|---|---|---|---|---|---|
| `c1` | one class `g(x#)`, A048670 | 46 | `x ∈ [11, 229]` | **0.3718** | 0.0269 | 7.2% | `[0.3359, 0.4873]` |
| `c2` | free 2-class `h2(x#)`, A288815 | 17 | `x ∈ [11, 73]` | **0.8511** | 0.0623 | 7.3% | `[0.7784, 1.0157]` |
| `c2'` | our `G2(x#)` | 20 | `x ∈ [11, 79]` | **0.4983** | 0.0369 | 7.4% | `[0.4463, 0.5939]` |

Forty-six exact one-class terms sit at a constant times the prediction with a
7% coefficient of variation. Seventeen exact two-class terms do the same. Our
certificate ladder sits inside the same band, `Y2/pred` running
0.593 at x = 37 down to 0.477 and back to 0.546 across `x = 37 .. 4001`. At `x = 37` that reading is
the exact `c2'` of §6a, because there the certificate IS `G2 − 1`; above `x = 41`
it is a lower bound on `c2'` and drifts with whatever the search fidelity does,
so it must not be read as `c2'` rising.

**Covered length scales like `c·x ln²x`, not like `p²`.** Ziller and Morack's
`h2/p² ≈ 1/2` is a small-numbers artifact and not the shape of the optimum: the
ratio falls from **0.72 at `x = 5` to 0.492 at `x = 73`** across their 21 exact
terms, and our certificates continue the fall to 0.022 at `x = 4001` (§5d).
`x ln²x / (x²/2) → 0`, so the two curves cross near `x = 73` and then separate
for good.

**Report the coefficient of variation, not "flat".** The same 46 terms have a
range of `[0.3359, 0.4873]`, and every quoted spread in this note is a cv over
the full period. `research/localized-04-maxsum.md` §4 quotes a *range* over
localized windows, `[0.736, 1.170]`, which looks four times wider and is not.
On matched statistics the two are the same size, near ±20% (`maxgap-law.md` §3).

**The `x ln²x` shorthand for `G2` is now EXCLUDED, on two independent
instruments (2026-08-18).** It stood here as `G2(x#) ≈ 1.2 · x ln²x`, read off
`c2' ≈ 0.48`, with its own error growing as terms arrived: 10% high at the exact
`G2(37#) = 528`, 24% high at `G2(41#) = 546`. With the ladder at 22 terms to
`x = 79` both instruments reject it and prefer the same replacement:

> **`G2(x#) = x ln^{2+o(1)}x` with the `o(1)` positive, best single description
> `0.76 · x ln²x · lnln x` over `x = 11..79` [MEASURED, not proven, not an
> asymptotic].**
> Two significant figures on the constant, not three: the jackknife band is
> 0.7574–0.7698 but the *window* band is 0.7534–0.8316, five times wider.
>
> **Quote it that way and no stronger. An adversarial re-derivation on
> 2026-08-19 refuted the independence claim that stood here and weakened both
> exclusions** (`history/staging/redteam-2026-08-18.md` §§1, 2). What survives is
> the RANKING, which is a fact about `G₂` and frame-free: on the same 18 points
> `c x ln²x` sits 0.758 from the data's own trend and `c x ln²x lnln x` sits
> 0.0908, a factor of eight; `MP2LL` wins under every single-point deletion on
> this window; and the `x`-exponent tends to 1 at every window tested.
> What does NOT survive: (i) the two readings were never independent — the exact
> frame **cancels out of every reported offset**, verified by recomputing with no
> frame at all and agreeing to 4.44e-16, and the diagonal hands back attack E's
> own fitted `b = 0.893`, so the "9.3 se" is the same comparison in a sharper
> error bar rather than a second witness; (ii) `c x ln²x` "excluded at 31.8 AICc
> units" is not shape evidence, because the one-class control, whose conjectured
> truth *is* `x ln²x`, throws the same law out by 32.8; (iii) the pure power
> law's "exclusion at 10.6" falls to **3.3** on deleting the single point
> `x = 11`, and at `x = 5..79` the ranking **reverses outright**, PW winning and
> MP2LL excluded at 38.4. The low end is a judgement and the answer is a
> function of it.

The `h2` reading below is unaffected: `c2 = 0.85` on A288815 is a different
object, and `2.04 × 73 × ln²73 = 2742` against `h2(73#) = 2622`, 5% high, still
stands as the free-2-class law.

**Prefer the Poisson form to any shorthand, and that preference is what the
exclusion above vindicates.** Every closed-form shorthand drops the
`(θ(x) − ln m)` factor for its asymptotic `2 ln x`, and at accessible `x` that
factor has not got there, which is why a direct finite-range fit of the same
data gave 0.8 where the diagonal gave 1.2 (`G2-STATE.md` §6.2). Those were never
the same statement, and the shorthand is the half that has now been excluded
while the diagonal `c2'` survived and tightened. Quote
`c · m · (θ(x) − ln m)` with `c` and its coordinates `(x, lnD, lnD/θ(x))`
attached, and treat `0.762 x ln²x lnln x` as the descriptive law for the range
measured rather than as the object's shape.

### 6a. `c` is a surface, so the coordinates travel with the number

`maxgap-law.md` establishes that `c` is a surface `c(x, lnD)`, not a constant.
At fixed `x` it falls as `lnD` grows (measured 1.083 → 0.446 inside the single
tile `x = 29`); at fixed `lnD` it rises with `x` (0.577 at `x = 23` to 0.989 at
`x = 6421`). Every `c` in this note sits on the **diagonal**, where the window
is the whole period and `lnD = θ(x) − ln m`, so the two effects cancel and `c`
is stable. **A `c` measured here must not be carried to a localized window and
vice versa**; quote `c` with `(x, lnD, lnD/θ(x))` attached or do not quote it.

The exact diagonal ladder for `c2'`, from the exact primorials and the exact
`D_x`:

| x | `m = W/D` | `lnD` | `m lnD` | `G2` | `c2' = G2/(m lnD)` |
|---|---|---|---|---|---|
| 11 | 17.11 | 4.905 | 83.9 | 42 | 0.5004 |
| 13 | 20.22 | 7.303 | 147.7 | 66 | 0.4469 |
| 17 | 22.92 | 10.011 | 229.4 | 108 | 0.4707 |
| 19 | 25.61 | 12.844 | 329.0 | 150 | 0.4559 |
| 23 | 28.05 | 15.889 | 445.8 | 204 | 0.4577 |
| 29 | 30.13 | 19.185 | 578.1 | 258 | 0.4463 |
| 31 | 32.21 | 22.552 | 726.4 | 348 | 0.4791 |
| 37 | 34.05 | 26.107 | 889.0 | 528 | **0.5939** |
| **41** | 35.80 | 29.771 | **1065.7** | **546** | **0.5123** |

`c2'` sits in `[0.446, 0.500]` for `x = 11 .. 31`, a spread of 12%, jumps to
0.594 at `x = 37`, and falls back to 0.512 at `x = 41`. That is the same
`x = 37` outlier `research/exponent-control.md` flags: its `c2' = 0.594` sits
above the 0.446 to 0.500 band of every earlier level, and the thirteenth term
now sits between the band and the outlier rather than confirming either. (The
local-exponent spike of 4.49 belongs to the 29 to 31 step, not to `x = 37`,
whose step reads 2.356.)

**The prediction for the thirteenth term was made in advance and it held.** The
exact form `c2' · m2(41) · (θ(41) − ln m2)` with `m2(41) = 35.80` and
`θ(41) = 33.35` gives `1066 c2'`, so the then-measured band
`c2' ∈ [0.446, 0.594]` gave **`G2(41#) ≈ 476 to 633`**, central 513 at the
full-sample mean `c2' = 0.4814`. The exact value is **`G2(41#) = 546`**: inside
the band, 6% above the central value, and below both of the competing estimates
the law was tested against (Ziller and Morack's free-choice ceiling of 894 and
the repo's own multiplier extrapolation of about 740). The law's discriminating
question — whether `x = 37`'s 0.594 was an outlier (predicting about 488) or a
level shift (predicting about 633) — is answered **neither**: 546 sits between
them, so one term did not settle it after all. That is compatible with
`exponent-control.md`'s verdict that a further exact term is worthless for the
EXPONENT, moving a ten-term fit by 0.022 against a bias of 0.262: the two
verdicts on `G2(41#)` answer different questions and both stand. `maxgap-law.md`
§9 priced the ledger drift over the single step `37 → 41` at 4%, so nothing in
the surface structure blunted the test.

**The caveat that stops this being an asymptotic.** For one class the truth is
conjecturally `x ln²x`, so `c1` should eventually grow like `ln x`. It does
drift upward, and by nothing like enough: `c1 ~ (log p)^{0.12 ± 0.02}` on the
top 47 exact terms, against the exponent 1 Maier-Pomerance needs, with a
synthetic control ladder built to have exponent 1 returning `0.981 ± 0.006` from
the identical estimator (`maxgap-law.md` §6). So the Maier-Pomerance `o(1)` is
strongly negative on the whole accessible range at a tenth of the required rate,
and this law describes the accessible range rather than the limit. That agrees
with `research/exponent-control.md` §2, which found the frozen
Maier-Pomerance shape refuted on the same data.

What survives the caveat is the **ratio**, which is what the question needs.
Both objects sit at a flat multiple of their own Poisson prediction, and those
predictions differ by `m2/m1 ~ e^γ ln x/(2C₂) ~ 1.35 ln x`. Whatever slowly
growing factor eventually appears on top, it appears on both.

---

## 7. Holt and Rudd's driving terms: it adapts, and it is worth nothing

Holt and Rudd's `arXiv:1402.1970` §4 gives a constructive lower bound on the
one-class maximum gap. A *driving term* for a gap `g` in `G(p#)` is a run of
consecutive gaps summing to `g`; a driving term of length 1 is the gap itself.
Per fold, some copy of a length-`j` driving term acquires exactly one interior
closure and becomes a length-`(j−1)` driving term with the same sum. They
conclude, verbatim:
*"the driving term of length 3 for `g = 74` will advance into an actual gap in
two more stages of the sieve. Thus the maximum gap in `G(41#)` is at least 74."*

**It adapts to two classes, and the repo already owns the two ingredients.**
Define a twin driving term for a target `G` at level `x` as `j+1` consecutive
twin slots with total span `G`. Folding by `p` kills the twin slots in the two
classes `{0, −2} mod p`; by `LOCALIZED-GAP.md` Fact A no two twin slots are 2
apart, and by Fact B an interval of length below `p − 2` therefore contains **at
most one kill**. So provided `G < p − 2`:

> **PROVEN (two-class driving-term lemma).** If `T_x` carries `j+1` consecutive
> twin slots of total span `G < x' − 2`, then `G2(p_{k+j-1}#) >= G`, where
> `x = p_k`. Each fold removes exactly one interior slot in a suitable copy,
> the span is preserved, and the two endpoints survive automatically because
> the span is too short to hold a second kill.

The two-class version is in fact *cleaner* than theirs, because Fact A rules
out the second kill outright where he needs the span bound `2p_{k+1}`.

**REFUTED as a route to a large bound.** The hypothesis caps `G` below `x'`. To
materialise a span `G ≈ x` you need `j+1 ≈ x/(2.4 ln²x)` consecutive slots,
which lands you at level `p_{k+j-1}` where `k = π(x)` and `j ≈ k/(2.4 ln x)`, so
`p_{k+j-1} ≈ x(1 + 1/(2.4 ln x)) ≈ x`. The conclusion is `G2(X#) >> X`, which
is already trivial: `G2(x#) >= F(x) + 1 >= x'`. The technique certifies gaps of
size `O(x)` and cannot reach `x^2`. It is a bookkeeping device for the linear
regime, exactly as it is in Holt and Rudd's hands.

**Hagedorn's algebraic construction has the same ceiling.** Math. Comp. 78
(2009), Prop. 1.1: `h(n) >= 2p_{n-1}` by CRT, choosing `x ≡ 0 mod p_1···p_{n-2}`,
`x ≡ ε mod p_{n-1}`, `x ≡ −ε mod p_n`. Applied to `G2` it gives the same `2p`,
and pushing it further runs into the first-twin-slot question, which is the
Zone Postulate itself. Circular, and recorded so nobody tries it again.

---

## 8. The verdict against `x^2`

| bound on `G2(x#)` | value | status |
|---|---|---|
| upper, proven | `x^{4.2665+ε}` | PROVEN, `paper/beta2-note.md` |
| upper, conjectured by Ziller-Morack | `x^2 − x` | CONJ, verified to `x = 73` |
| **the target** | **`x'^2`** | what route A needs |
| lower, best proven | `x log x logloglog x/loglog x` | PROVEN, free via `G2 >= g` |
| lower, best constructed here | `G2(5003#) >= 479,340` | CERTIFIED, machine-verified, fidelity unmeasured above `x = 41` |
| lower, best constructed where truth is checkable | `G2(x#) − 1` exactly, at thirteen of the fourteen exact terms; 0.990 of it at `x = 43` | CERTIFIED, and it is the optimum at those thirteen, §5b |
| lower, honest Rankin analogue | `x (log x)^2 logloglog x/loglog x` | INFERRED |
| lower, K–K substitution carried out | `y (ln y)^3 (lnlnln y)^2/(lnln y)^4` | INFERRED, derived here in full and adversarially checked, NOT refereed; only above `y₀ = 10^{134.1}`, §4c |
| lower, conjectural truth | `x (log x)^{3+o(1)}` | CONJ |
| lower, measured law | `x ln^{2+o(1)}x`, `o(1)` positive; best single description `≈ 0.76 x ln²x lnln x` | MEASURED over `x = 11..79`, a description of that range and not an asymptotic. The former `≈ 1.2 x ln²x` loses on the frame-free ranking by a factor of eight, §6 — but do NOT quote the 31.8 or the 10.6 as exclusions; both were weakened by adversarial re-derivation on 2026-08-19 |

At the top of our ladder, `x = 5003`:

- certified `G2(5003#) >= 479,340`;
- the zone width is `5003² = 25,030,009`;
- **the best construction reaches 1.9% of the zone**, against 38.5% at
  `x = 37`, where the construction IS the truth, and the shortfall factor grows
  like `x/polylog`. At `x = 4001` the certified bound is `G2(4001#) >= 356,712`,
  2.2% of `4001² = 16,008,001`.

> **VERDICT: SAFE against the construction side**, which is the only side this
> note is about; §9 states what that does not cover. The gap between the best
> available lower bound and the threshold is `x^{1-o(1)}` and widening. No
> construction in the literature, no construction we could build, and no
> heuristic anyone has written reaches `x^{1+δ}` for any `δ > 0`. To threaten
> the Zone Postulate a two-class construction would have to beat the one-class
> construction by a **power** of `x`, and every route checked, theoretical and
> computational, says the second class is worth exactly one **logarithm**.

---

## 9. The one caveat, and it is not small

The safety verdict is against **constructions**, not against the truth.

`G2(x#) >= g(x#)` runs the other way too. The Gap Reformulation's target
`G2(x#) < x'^2 − 2` therefore **implies** `g(x#) < x'^2 − 2`, that is,
Jacobsthal's conjecture at primorials with the explicit constant 1. Iwaniec 1978
gives `g(x#) << x^2` with an inexplicit constant, and Erdős #687 offers $1000
merely for `Y(x) = o(x^2)`. So:

> **PROVEN (the implication; new to this repo).** Any proof of
> `G2(x#) < x'^2 − 2` also proves `g(x#) < x'^2 − 2`, an explicit
> constant-1 form of the Jacobsthal bound at primorials.
>
> **CLOSED by inspection of the sources: no such bound exists, so the floor
> stands.** The elementary literature is nowhere near exponent 2. Paseman's own
> §1 (arXiv:1311.5944) tabulates all three:
>
> | author | proved | as an exponent in `k` |
> |---|---|---|
> | Kanold | `2^k` for all `k`; `2^{√k}` for `k >= e^50` | exponential |
> | Stevens (1977) | `g(n) < 2k^{2+2e·log k}` | `k^{Θ(log k)}` |
> | Paseman (2014) | `u(k) = O(log k·loglog k)`, `u` the `log_2` of the bound | `k^{O(loglog k)}` |
>
> The exponent-2 statements belong to Vaughan and Iwaniec, and **both carry
> inexplicit constants**, which is what the question turns on: Vaughan 1977
> (Proc. Edinburgh Math. Soc. 20 (1977) 329-331) for general `n`, "C can be
> taken arbitrarily close to 2"; Iwaniec 1971 Theorem 2 for the primorial case,
> sharpened to `h(k) << (k log k)^2` in 1978. At the primorial `k = π(x) ~
> x/log x`, so `g(x#) < x'^2` needs `g << (k log k)^2` — Iwaniec's shape exactly,
> and nothing weaker will do.

That is a second difficulty floor under route A, independent of the
TPC-hardness that the exponent-2 statement already carries via Ziller and
Morack's Proposition 3.5. It does not refute anything. It says that the
programme's own reduction has a shadow one dimension down that is itself a
prize problem, and that shadow should be quoted whenever the reduction is
described.

**Measured margin on the shadow, for calibration.** `g(x#)/x^2` falls from
0.240 at `x = 5` to 0.0115 at `x = 311` across all 64 published terms of
A048670 (b-file, checked 2026-08-20) — a steady trend, not a term-by-term
monotone fall: 21 of the 63 steps tick up. The greedy one-class ladder, which
is only a lower bound and so bounds the fall from below, continues to 0.00124
at `x = 4001`. So the shadow statement is also comfortable in the data and also
unproven.

---

## 10. The certificate ladder, and how far it can be pushed

`research/ZONE-POSTULATE.md` §5 asks whether `window/G2` is bounded. On the
eleven exact terms it is flat: `x²/G2` reads 2.08, 1.63, 2.88, 2.56, 2.68, 2.41,
2.59, 3.26, 2.76, 2.59, 3.08 at `x = 5 .. 41`. On the certificate ladder the same
ratio climbs monotonically, 2.6, 7.1, 17.8, 45.1, 52.2 at
`x = 37, 229, 1009, 4001, 5003`.

**State the direction of that inference carefully.** The certificate is a lower
bound on `G2`, so `x²/certificate` is an *upper* bound on `x²/G2`, and its
growth does not by itself prove `x²/G2` grows. What it does show is that the
best construction's share of the window collapses. The greedy-to-optimum ratio
is **1.000 wherever it can be measured**, which is `x <= 41` (§5b), and the
budget that holds it there does not scale (§5c), so the ratio above `x = 41` is
unmeasured rather than known-constant. Read that way it is real evidence for
ZONE-POSTULATE §8's item 3, "a proof that the window/G₂ ratio is unbounded" (item 4 until 2026-08-29),
over a 108-fold range in `x`, and it is not a proof and not a measurement of the
truth. Anyone quoting the falling curve must quote §5c with it.

That is how far this instrument reaches. The flatness on the exact terms is a
small-number effect; the certificate ladder is the only construction that runs
far enough to see past it, and it is one-sided.

---

## 11. What is new here, drawn sharply

Not new: the CRT collapse (`attack2-rankin2d.js`), the control-estimator method
(`exponent-control.md`), Facts A and B (`LOCALIZED-GAP.md`), the reduction
(Ziller and Morack), the driving-term mechanism (Holt and Rudd), the mean-gap
constant `e^{2γ}/(2C₂)` (`ZONE-POSTULATE.md` §6), and the Poisson-extremes law
itself, which is Ford's random-dart prediction `J(T) ~ T·Q_T/φ(Q_T)` from his
Montreal slides, credited in §6.

New, and offered at the calibration marked:
- `G2(x#) >= g(x#)`, and with it the first lower bound of any kind for the
  two-class Jacobsthal function (PROVEN, trivial, and ABSENT from A144311, A288815 and A072753,
  and from the literature that owns them);
- the two-class Rankin accounting, giving `log x` and not a power (INFERRED);
- the two-class driving-term lemma, and its refutation as a route (PROVEN);
- **the greedy rule is an exact solver for `G2` at thirteen of the fourteen
  exactly-known terms**, a pre-registered instrument test scoring 13 of 14 with
  minimum ratio 0.9903 — the one miss being `x = 43`, the newest and largest
  level, where budget and structure are not separated (MEASURED, §5b) — against
  0.90 for the same greedy at the same budget on
  the free-choice two-class problem at the same `x`;
- **the budget rider**: the restarts needed to hold that exactness grow by a
  factor of 3.31 per additional prime, so the property belongs to the rule at
  `x <= 41` and not to the ladder (MEASURED, §5c);
- a certified `G2` lower-bound ladder to `x = 5003`, seventeen levels,
  independently replayed, extending the two-class data 68-fold beyond Ziller
  and Morack's 21 exact terms (CERTIFIED);
- the measurement of `c` in the Poisson-extremes law `max ≈ c·m·ln(W/m)`, at
  cv 7% over 46 exact one-class and 17 exact two-class terms **on the
  diagonal**, and its advance prediction `G2(41#) ≈ 476 to 633` against the
  exact value 546 (MEASURED, §6);
- route A's shadow implication into the explicit one-class Jacobsthal bound
  (PROVEN as an implication; see the loose end in §9).

## 12. Reproduction

```
node research/two-class-lower-bounds.js          # §1 custody + oracle test + ladder to x = 229
node research/two-class-lower-bounds.js --full   # ladder to x = 4001
node research/two-class-lower-bounds.js --ladder-only --levels=5003  # one rung
```

Measured cost, on a 10-core machine carrying a load average of 250 to 300
throughout, so read these as upper bounds: §1 about 10 minutes; the sixteen
ladder levels 235 minutes in total, of which `x = 4001` alone is 71; the
`x = 5003` extension 94 minutes on its own. Sharding one process per level cuts
the ladder to the cost of its longest rung.

Everything random is seeded from `SEED_BASE = 20260818` through mulberry32 and
reproduces exactly; there is no `Math.random()` in the file. The bracket seed is
a closed form in `x`, so **every ladder level is independent of every other** and
the ladder can be sharded across processes and stitched — which is how the table
in §5d was produced, and each row still reproduces on its own from the command
above. The per-level budget is a cap on greedy **calls**, not on seconds, for the
same reason.

Section 1 of the output is custody: brute-force `G2` against the repo ladder; the
superseded 2026-08-17 ladder regenerated from the old bisecting search, which is
kept in the file for exactly that purpose; the oracle test against all thirteen
exact `G2` terms; the non-monotonicity and budget-scaling measurements that say
what the oracle test licenses; and the free-choice greedy against Resta's ILP
optima. Sections 2 and 3 are the certificate ladder with the independent replay
and the matched one-class control. Section 4 is the Poisson law.


---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
