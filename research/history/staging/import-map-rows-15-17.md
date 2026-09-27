# Import map, rows 15 to 17: three candidate fields, priced before anything runs

<!-- ledger
id: Q-import-rows-15-17
status: ANSWERED
todo: none
question: Which three new fields deserve import-map rows, and at what price?
verdict: Row 15 is a wall address and a published anchor and NOT a theorem, since Theorem 10 requires x^{6/11+eps} < y and fails at every fixed M; row 16 is stale, its experiment already executed by record-location-null.md and its prior-art half closed by lit-kourbatov-shortfall.md; row 17 lands as priced; six fields rejected with pointers and one promoted to row 17.
-->

*Staging record, 2026-08-28. Companion to `research/IMPORT-MAP.md`, which is the
deliverable this proposes rows for. Nothing here is integrated into a live
document, and this pass edited no existing file. No script was written, no
producer was run, and no number in the corpus was recomputed. Two pieces of
arithmetic are DERIVED HERE by hand and are marked as such in §6, offered for
adjudication rather than asserted.*

**The standing calibration this pass carries.** On this corpus's record imports
bank payoff and do not open routes: 21 imports across 2026-08-26 and 2026-08-27
returned zero routes, and the map's own lesson from the calibration set is that
structural fit "predicts a banked payoff and predicts nothing about the route
surviving". Every grade below is a grade of payoff TYPE. None of the three rows
is offered as a route to the postulate, and §2 says for each one why it is not.

**Verification legend**, as `IMPORT-MAP.md` §0 defines it: **[SOURCED]** the
statement was read at a publisher page, an arXiv abstract page, or an authors'
hosted full text during this pass; **[SOURCED-BIB]** the bibliographic data was
verified and the statement was not opened; **[MEMORY]** written from memory and
not reached at any source. The per-item ledger is §5.

---

## 0. The pre-check that ran first

Ten candidate fields were named. Each was grepped across the repository before
being priced, on its own key words and on the owning convention where
`SEARCH-CONVENTIONS.md` names one. Six came back already spent, under another
name or against another target, and are rejected in §4 with the pointer that
closes them; a seventh, the determinantal candidate, is not rejected but
promoted to row 17. Three survive and are priced in §1.

The reading done before any pricing: `CLAUDE.md`, `IMPORT-MAP.md` in full
including all fourteen landed rows, `history/staging/import-map-construction.md`
including its twelve VOCABULARY-ONLY rejections, `REFUTED.md`,
`SEARCH-CONVENTIONS.md`, and the verdict sections of the six 2026-08-27 import
records (`import-entropy-decrement.md`, `import-boolean-analysis.md`,
`import-proof-complexity.md`, `import-rough-anatomy.md`,
`import-transference.md`, `import-vc-nets.md`).

---

## 1. The three rows, in the map's row format

| # | field | the importable theorem, and where its statement lives | moiré object | target hole | fit | circularity | payoff | cost | status |
|---|---|---|---|---|---|---|---|---|---|
| 15 | the distribution of the fractional parts of `N/n`, and van der Corput's method behind it | Saffari–Vaughan, *On the fractional parts of x/n and related sequences* **II**, *Ann. Inst. Fourier* **27** (1977) 1–30, DOI 10.5802/aif.649, **Theorem 10 (p. 7)**: with `Θ*_{x,y}(α) = y^{-1} Σ_{p≤y} (log p)·c_α(x/p)` and `ε > 0`, `x^{6/11+ε} < y ≤ x`, `Θ*_{x,y}(α) = F(α, x/y) + O(exp(−C(ε)(log x/log log x)^{1/3}))`; with Theorem 1 and Corollary 1.3 (printed pp. 2–3, both carrying error `O(x^{1/3}y^{−1} log x)`) giving `F(α, ξ) → α` as `ξ → ∞` **[SOURCED, verbatim at a 150 dpi rendering of printed p. 7; the Centre Mersenne PDF's text layer is corrupted OCR and cannot be quoted, and the earlier text-extraction reading of the range exponent and of the saving does not survive the image]**; parts I (*AIF* **26** (1976) 115–131, DOI 10.5802/aif.634) and III (*AIF* **27** (1977) 31–36, DOI 10.5802/aif.3002) **[SOURCED-BIB]**; the method behind the error term is Graham–Kolesnik, *Van der Corput's Method of Exponential Sums*, CUP LMS 126 (1991), DOI 10.1017/cbo9780511661976 **[SOURCED-BIB]** | the branch phase `⌊W/q⌋ mod M` of `natal-cap-36-skeleton-door.md`, which that file already reduces exactly to `⌊M·{W/(Mq)}⌋`, so the object IS `{W'/q}` over primes `q`, `W' = W/M` | the **Skeleton Equidistribution Conjecture [OPEN]** (`natal-cap-36` §Measurement D), and behind it the all-`x` aggregate bound `G30_agg < 1/2` that is currently a theorem only for `x ≤ 29` | **EXACT-IDENTITY at the marginal face**; the joint face (`q mod M` as well) needs an AP version of Theorem 10 that the paper does not contain | **SPLIT.** CLEAN for the face the theorem reaches, and the reason is Proposition E: those branches were measured to carry essentially none of the skeleton, so a payoff there cannot be postulate-strength. UNRESOLVED, and to be read at the lower rung as **suspected TPC-STRENGTH**, for the deep branches that carry 91–111% of the mass, where the required modulus exceeds `√W` | WALL-ADDRESS + PUBLISHED-ANCHOR; **no THEOREM**, since the lower range condition reads `M > W^{1/12}` and fails at every fixed `M` as `W → ∞` | 4 h | **LANDED 2026-08-28 (`import-fracparts.md`), no route; prediction HIT** |
| 16 | the theory of records | Rényi's record theorem: for an i.i.d. sequence with continuous marginal the record indicators are independent with `P(record at n) = 1/n`, so every record-TIME statistic is distribution-free (Rényi, *Théorie des éléments saillants d'une suite d'observations*, Aarhus colloquium 1962, 104–117 **[MEMORY]**; the same statement as developed in Arnold–Balakrishnan–Nagaraja, *Records*, Wiley 1998, DOI 10.1002/9781118150412 **[SOURCED-BIB]**, and restated in the survey Godrèche–Majumdar–Schehr, *J. Phys. A* **50** (2017) 333001, DOI 10.1088/1751-8121/aa71c1 **[SOURCED-BIB]**). The trended replacements: the `F^α` scheme, Deheuvels–Nevzorov, *J. Math. Sci.* **81** (1996) 2368–2378 and **88** (1998) 29–35, DOIs 10.1007/bf02362342 and 10.1007/bf02363259 **[SOURCED-BIB]**; Ballerini–Resnick, *Records from improving populations*, *J. Appl. Probab.* **22** (1985) 487–502, DOI 10.1017/s0021900200029272, and *Records in the presence of a linear trend*, *Adv. Appl. Probab.* **19** (1987) 801–828 **[SOURCED-BIB]** | the record ladder of `Z₂`, which `zonegap-03-model.md` §1 makes the whole of the object (`D ≡ 0`, so `Z₂ = env` exactly), read as a record process rather than as an envelope | **TODO Z5**, the 6.0% record-location deficit: `z` mean `−1.298` against a matched-null `−0.212 ± 0.244` and trend load `A = 0.9295` against `0.9895 ± 0.0182`, measured against one specific null (exponential gaps at `ābar = ln²x/(2C₂)`, Gumbel block maxima, 200 reps) | **STRONG-ANALOGY.** The theorems are for independent draws and the twin-gap sequence is neither independent nor stationary; the modification the row names is that the import is used to price the NULL, never the object | **CLEAN.** A record-time law is a statement about the observed prime record sequence and carries no bound on `G₂`; it cannot imply an every-window statement in either direction. The row-14 caution applies in its instrument form and is adopted verbatim: legitimate as an instrument, never as a link in a proof chain | WALL-ADDRESS only; the DERIVED-CONSTANT half is spent elsewhere and is not banked here | 4 h | **STALE.** The row proposes as an experiment a move that had already run: `record-location-null.md` executed the null side on 2026-08-28 and the 6.0% survives every correction available from the ensemble at `z` between −3.3 and −4.3, and `lit-kourbatov-shortfall.md` closed the prior-art half the same day by identifying the deficit with Kourbatov's published `b`. Z5's null branch is closed; its mechanism branch is open |
| 17 | repulsive point processes, and hyperuniformity as the surviving half | Soshnikov's necessary condition, that a determinantal process with Hermitian kernel has `ρ₂(x,y) ≤ ρ₁(x)ρ₁(y)` at every pair, *Russian Math. Surveys* **55** (2000) 923–975 **[MEMORY for the page; the statement is the one already cited in `import-map-construction.md` §1]**; the positive half is the Torquato–Stillinger hyperuniformity classification by the small-`k` structure factor, in the corpus's own convention row (Torquato–Zhang–De Courcy-Ireland, arXiv:1804.06279) **[SOURCED-BIB, via `SEARCH-CONVENTIONS.md` §1]** | the tile `T_x ⊂ Z/W` as a translation-invariant point process whose pair correlation and structure factor are both known in closed form in-house (`level-ledger-tight.md` §(c) gives `S(j) = ∏_q S_q(j)` exactly) | the family of routes that model the survivor process as repulsive, and the missing published anchor for the `H` exponent that row 1 left unexplained | **SPLIT, on row 14's precedent.** EXACT-IDENTITY at the object and at the statistic; **NEGATIVE at the model**, and §6(a) below gives the arithmetic that makes it negative | **CLEAN.** A pair-correlation computation at a fixed level is a finite computation | CLOSURE (a family, with a mechanism) + PUBLISHED-ANCHOR | 2 h | **UNTRIED** |

---

## 2. The rows, one paragraph each

### 15. The distribution of the fractional parts of `N/n`

`natal-cap-36-skeleton-door.md` §Measurement D already did the reduction that
decides this row, and did it without naming the field: since `M | W`, writing
`u = W/(Mq)` gives `⌊W/q⌋ ≡ ⌊M·{W/(Mq)}⌋ (mod M)`, so the door "is precisely the
equidistribution of the fractional parts `{W/(Mq)}` over primes `q`, read at
resolution `1/M`, jointly with `q mod M`". Set `W' = W/M`. The sequence
`{W'/q}` over primes `q` is Saffari–Vaughan's object, with their `x = W'` and
their `y = √W`, and their Theorem 10 is a theorem about it. That is an
identification and not a resemblance, and the corpus has been carrying the
object for two weeks with the owning convention unnamed. Two bookkeeping
modifications have to be stated and neither is deep: their sum carries a
`log p` weight where the skeleton sums are unweighted, which partial summation
converts, and their sum runs over all `p ≤ y` where the scour range starts at
`x`, which costs `O(x log x)` against `θ(√W)`. One gap is not bookkeeping and is
the reason the fit is graded at the marginal face only: Theorem 10 gives the
distribution of `{W'/q}` alone, and the conjecture asks for the joint
distribution with `q mod M`. Writing the joint version means running their
argument with Siegel–Walfisz in place of the prime number theorem, which is
available for `M ≤ (log W)^A` and therefore for branches of bounded depth, and
is not available beyond it. **The row is priced as a wall and an anchor, not as a
route and not as a theorem, and §6(b) is the reason: Theorem 10's range
condition reads `W^{1/12} < M ≤ √W` under the dictionary, while Proposition E
measured 91–111% of the skeleton's mass in branches with `M_T > lB ≥ √W`.**
That arithmetic survived a second reader with one correction. The reach and the
mass's location are complementary and the covered set is unchanged at every
computed level, but the lower condition fails at every fixed `M` as `W → ∞`, so
the row banks no theorem at all.

### 16. The theory of records

`zonegap-03-model.md` §3 reports one live statistical object and one failure
inside it: the shape statistics of the `Z₂` record ladder all sit inside a
matched null, and the two location statistics do not. The null is one specific
model, exponential gaps at the Kourbatov–Wolf scale with Gumbel block maxima,
and the note's own reading of the failure is "the finite-height
non-exponentiality of real twin gaps", which is a statement about the null's
marginal. Record theory decides whether that reading is available at all,
because Rényi's theorem makes every record-TIME statistic distribution-free:
under any i.i.d. continuous marginal the record indicators are independent with
`P(record at n) = 1/n`, so the record times, the record count, and any statistic
built from them do not move when the marginal is changed. If the two failing
statistics are functions of record times, no change of marginal can rescue the
null and the deficit is dependence or trend; if they are functions of record
values, the marginal is falsifiable directly and cheaply. The row's second half
is the replacement null, because the twin-gap scale grows and the i.i.d.
assumption is wrong in a named way: the `F^α` scheme of Deheuvels and Nevzorov
and the improving-population model of Ballerini and Resnick both give closed-form
record rates for sequences with a scale trend, which is exactly the shape here.
The fit is STRONG-ANALOGY and not better, because the object is a deterministic
arithmetic sequence and the theorems are about independent draws; the import
prices the null and never the object. TODO Z5's own stated first move is to
"decide whether the deficit survives the corrected null before hunting
mechanisms", and this row is that move with the corrected null taken from print
instead of built in-house. **The row is stale.** That move has since run in
house rather than from print: `record-location-null.md` built the matched null
and the deficit survives at `z` between −3.3 and −4.3 across five window cuts,
and `lit-kourbatov-shortfall.md` identifies the deficit with Kourbatov's
published `b = 1.2597` in the same normalisation on the same records. What is
left of the row is the wall address.

### 17. Repulsive point processes, and hyperuniformity

`import-map-construction.md` §1 already rejected determinantal point processes,
with a proof-level obstruction rather than a search negative: Hermitian
determinantal processes have `ρ₂ ≤ ρ₁ρ₁` at every pair, and the reduced residues
mod a primorial are positively correlated at distance 2. That rejection is
correct and it does not transfer verbatim to the twin tile, because the twin
tile has no pairs at distance 2 at all: mod 3 the tile occupies one class, so
every gap between twin slots is divisible by 6. The corrected statement, derived
in §6(a), is at distance 6, where `g(6) = 6·∏_{5≤q≤x}(1−4/q)/(1−2/q)²` reads
2.66 at `x = 11` and stays above 2 at every level. The row exists to convert one
rejected candidate into a closed family: the same inequality that kills the
Hermitian determinantal model kills Pfaffian processes, `β`-ensembles, the
one-dimensional one-component plasma and every strictly negatively-associated
model, because all of them require `g ≤ 1`. What survives the closure is the
half the corpus is already using without a citation: `SEARCH-CONVENTIONS.md` §1
names hyperuniformity and local number variance as the owning convention for the
`H` exponent and records that "no sieved-set instance exists, searched", while
`natal-cap-29-sigma-plateau.js` derives the `σ`-plateau from `|S(j)|²` at small
`j`, which is the hyperuniformity computation done in house under another name.
The row is cheap, its kill is predicted to fire on its first line, and its value
is that the family is not proposed again and that the anchor gets written down.
Two hours, not four.

---

## 3. The first experiments, pre-registered

Pre-registration is not optional here and the reason is on the record:
`G₂(41#) = 546` meant something only because its window was written down first.
None of these had run when the rows were priced. Rows 15 and 17 have since run,
as `import-fracparts.md` and `import-repulsive.md`; row 16's experiment was
overtaken by `record-location-null.md`, which ran the same morning.

**Row 15.** *Mapping:* instantiate Saffari–Vaughan Theorem 10 at `x = W/M`,
`y = √W` for each branch modulus `M` that `natal-cap-36` measured
(30, 210, 2310, 30030) at levels @17 through @37, check the range condition
`x^{6/11+ε} < y ≤ x` at each, and record the exact `M` at which `y ≤ x` fails.
*Pre-registration, sealed before the branch ledger is reopened:* the failure
threshold is `M = √W`, and every branch that Proposition E placed above its
window length `lB` fails it, so the theorem covers only branches Proposition E
measured at or below `lB`. *Kill:* if any branch carrying more than 10% of
`Σ_T Σ_q Snum_T` at any of @13, @17, @19, @23 has `M_T ≤ √W`, then the theorem
reaches live mass, the prediction above is wrong, and the row upgrades from a
wall address to a partial closure of the skeleton bound. If none does, the row
banks the theorem for the empty half and the wall address, and the door is
confirmed unreachable by any theorem of `{N/p}` type. *Second deliverable,
whatever the kill does:* write out the arithmetic progression version of
Theorem 10, with Siegel–Walfisz in place of the prime number theorem, and state
explicitly the uniformity in `M` it needs and the branch depth that corresponds
to it.

**Row 16.** *Mapping:* classify each of the seven statistics in
`zonegap-03-model.md` §3 as record-TIME (distribution-free under Rényi) or
record-VALUE (marginal-dependent), then recompute the two failing statistics
under two further nulls with the same record-time law and different gap
marginals, and under an `F^α` null with `α_n` set by the measured `ln²x` trend.
*Pre-registration:* seal the classification before recomputing anything, and
seal the prediction that `z` mean and trend load `A` are both marginal-dependent
rather than distribution-free. *Kill:* if `z` mean and `A` move by less than the
200-rep ensemble standard deviation when the marginal is changed, they are
distribution-free, the exponential-gap null is exonerated, and TODO Z5 becomes a
dependence question with the marginal explanation removed. If they move by more,
the deficit is a null artefact, Z5 closes on the null side, and the KW-family
guard is hardened, which is the outcome TODO Z5 names as its second win.

**Row 17.** *Mapping:* compute `g(d)` exactly at `d = 6, 12, 18` from the class
counts at every ladder level, and read the small-`j` behaviour of
`S(j) = ∏_q S_q(j)` against the Torquato–Stillinger classes. *Pre-registration:*
`g(6) > 2` at every level. *Kill:* the family closes if `g(d) > 1` at any `d` and
any level, and the closure fails only if `g ≤ 1` everywhere, which §6(a) says it
is not. *Deliverable:* one `REFUTED.md` line, one `SEARCH-CONVENTIONS.md` row
naming the tile as the sieved-set instance that convention records as absent,
and the correction that the twin tile's obstruction sits at `d = 6` and not at
`d = 2`.

---

## 4. Rejected, one line each, with the pointer that closes each

| candidate | why it is not a row |
|---|---|
| additive combinatorics beyond transference (Freiman, Plünnecke, sum-product) | Freiman and Plünnecke are conditioned on small doubling and the tile has maximal doubling: `T` has density `∏(1−2/q)` in `Z/W` and `T+T` fills `Z/W` at every level past the first few, so no hypothesis in the family is satisfied; the covering face of additive combinatorics is row 8, closed 2026-08-19 on the CRT ambient |
| Beatty and Sturmian sequences, cut-and-project sets, three-distance theorems | already rejected VOCABULARY-ONLY (`import-map-construction.md` §1, three-distance and continued fractions: the survivor positions are not a rotation orbit), and the model-set framing is the landed B-free row plus the `Ω_R` / admissible-subshift convention already tabled in `SEARCH-CONVENTIONS.md` §1; re-entry costs new structural evidence and this pass found none |
| large sieve in dual or arithmetic form, Gallagher's larger sieve, aimed at the upper bound on `X(K)` | spent three ways: rejected VOCABULARY-ONLY for the `ℓ¹→ℓ²` wall (`import-map-construction.md` §1), already load-bearing in the corpus as the position-uniform interval cap through Riesel–Vaughan Lemma 5 (`natal-cap-10-sieve-cap.md` §1.4), and measured vacuous against the tile's own variance object (`level-ledger-tight.md` §(a): it "gives `Σ_{a≠0}|F(a)|² ≤ (p²+W)D` and hence nothing below binomial"); at `ω(p) = 2` it is dominated by the Selberg two-dimensional sieve the corpus already runs |
| Pólya–Vinogradov and Burgess character sums | the survivor indicator is a product of ADDITIVE local factors and the corpus has them exactly, `S_q(j) = q−2` on the divisors and `−1−e(je_q/q)` off them, so `\|S_q(j)\| = 2\|cos(πje_q/q)\|` (`level-ledger-tight.md` §(c)); a character-sum bound of size `√q log q` is strictly weaker than an exact evaluation, and `stretch-01.md` §4(iii) already names the family as adjacent instruments with the honest limit that all of it is per-modulus while the wall is joint placement, at the `C^{π(z)}` composition cost `import-l1l2.md` owns |
| random matrix and determinantal models | rejected VOCABULARY-ONLY with a proof-level obstruction (`import-map-construction.md` §1) and now promoted, corrected at the distance, to row 17 as a closure of the whole repulsive family |
| covering radius of lattices, Jacobsthal as a shortest-vector problem | the published dictionary for exactly this translation is Henze–Malikiosis, *Aequationes Math.* **91** (2017) 331–352, and `SEARCH-CONVENTIONS.md` §1 already carries it inside the lonely-runner and view-obstruction row, which is map row 12, landed and closed with mechanism 2026-08-20 |
| percolation and ordering in one dimension | one-dimensional percolation is degenerate and contributes nothing; the record half of the candidate is row 16 |

---

## 5. The verification ledger

**[SOURCED] this pass.** Saffari–Vaughan II, Theorem 10 and its statement of
`Θ*_{x,y}`, Theorem 1, and Corollaries 1.1 to 1.3, read from the Centre Mersenne
PDF at `https://aif.centre-mersenne.org/item/10.5802/aif.649.pdf`
(1,548,052 bytes, HTTP 200, sha256
`26ea860646aea8e0007bed07cc074dcf2abb3f646d173688f3939dbf32439bde`), text
extracted with `pdftotext`; the scanned original is a 1977 Numdam digitisation
and its text layer is corrupted OCR, so printed p. 7 is read at a 150 dpi
rendering of the page image: the range condition is `x^{6/11+ε} < y ⩽ x` and
the saving is `exp(−C(ε)(log x/log log x)^{1/3})`. The abstract page
(`https://aif.centre-mersenne.org/item/AIF_1977__27_2_1_0/`, sha256
`4a7307f40c8f0c2db0d6905e51566b79a54ac1f59ef1381034024b55337c8d00`) states the
scope verbatim, including that `n` runs "over an integer (or a prime)", which is
the half that makes the identification exact.

**[SOURCED-BIB] this pass, at the Crossref API.** Saffari–Vaughan I and III;
Arnold–Balakrishnan–Nagaraja, *Records*; Godrèche–Majumdar–Schehr; Deheuvels–
Nevzorov I and II; Ballerini–Resnick 1985 and 1987; Graham–Kolesnik, with its
chapter list confirmed; Duke–Friedlander–Iwaniec, *Ann. of Math.* **141** (1995)
423–441, DOI 10.2307/2118527, looked up while pricing the rejected character-sum
candidate and not used in a row.

**[MEMORY], not reached at any source this pass.** Rényi's 1962 Aarhus
colloquium paper, which returns nothing at Crossref; the record-indicator
independence statement is therefore carried through the Wiley and *J. Phys. A*
secondary records, both of which were verified bibliographically and neither of
which was opened. Soshnikov's negative-association statement at page level; the
corpus's own `import-map-construction.md` §1 is the carrier. Torquato–Stillinger's
class definitions at page level.

**Channel note, recorded because a fetcher failure is a claim about the
fetcher.** The arXiv API returned HTTP 429, rate exceeded, on every attempt this
pass, so no arXiv abstract page was reached and nothing was verified there.
Crossref and Centre Mersenne both answered normally. Any absence claim that
would need arXiv is void for this session and none is made.

---

## 6. Derived here, offered for adjudication

Neither of these is a literature finding and neither is asserted as a result.
Both are short arguments, written out so a second reader can kill them cheaply.
Both are hand arithmetic and no producer has confirmed either.

**(a) The twin tile is positively correlated at its first admissible separation,
so no repulsive model of it can exist. DERIVED HERE.** A twin slot is a residue
`n` with `n` and `n+2` coprime to every `q ≤ x`, so `n` occupies one class mod 2,
one class mod 3, and `q−2` classes mod each `q ≥ 5`. Because mod 3 there is one
class, every separation between slots is divisible by 6, and the pair
correlation at distance 2 is identically zero rather than greater than 1, which
is why `import-map-construction.md`'s reduced-residue statement does not transfer
to this object verbatim. At distance 6 the joint condition is that `n` avoids
`{0, −2, −6, −8}` mod each `q ≥ 5`, four distinct classes for every `q ≥ 5`, so

> `ρ₁ = (1/6)∏_{5≤q≤x}(1−2/q)`, `ρ₂(6) = (1/6)∏_{5≤q≤x}(1−4/q)`,
> `g(6) = ρ₂(6)/ρ₁² = 6·∏_{5≤q≤x}(1−4/q)/(1−2/q)²`.

The factors read 0.5556, 0.8400, 0.9506, 0.9669 at `q = 5, 7, 11, 13`, so
`g(6) = 3.33, 2.80, 2.66, 2.57` at `x = 5, 7, 11, 13`, and each later factor
differs from 1 by about `4/q²`, so the product converges and `g(6)` stays above
2. A determinantal process with Hermitian kernel requires `ρ₂ ≤ ρ₁ρ₁` at every
pair, so no such kernel exists for the tile at any level, and the same
inequality closes every negatively-associated model with it. The arithmetic is
by hand; the four factor values and the convergence claim are what a second
reader should check first.

**(b) Saffari–Vaughan Theorem 10's reach and Proposition E's mass are
complementary, and the reach is a two-sided window.** Theorem 10 requires
`x^{6/11+ε} < y ≤ x`. With `x = W' = W/M` and `y = √W`, the upper condition
`y ≤ x` reads `√W ≤ W/M`, that is `M ≤ √W`, and the lower condition
`(W/M)^{6/11} < W^{1/2}` reads `M > W^{1/12}`. So the theorem covers the branch
window `W^{1/12} < M_T ≤ √W`. At @13 through @37 `W^{1/12}` runs 2.36 to 11.82,
below the smallest branch modulus 30, so at every computed level the covered set
is just `{M_T ≤ √W}`. Proposition E of `natal-cap-36-skeleton-door.md` measured
90.8%, 100.9%, 110.8% and 94.5% of the skeleton at @13, @17, @19 and @23 in
branches with `M_T > lB`, and `lB = ⌊(W+1)/q⌋ ≥ √W` for every scour prime
`q ≤ √W`. So the theorem applies to branches that carry none of the mass and
stops where the mass begins, and the row is a wall and an anchor. It is not a
theorem: at fixed `M` the lower condition fails as `W → ∞`, so no fixed-modulus
asymptotic follows, and the surviving window `W^{1/12} < M ≤ √W` is a growing
modulus, which is the regime the source does not reach. Run and scored in
`import-fracparts.md`; the failure mode this paragraph named for checking first,
the definition of `lB` at the top of the scour range, was checked there and
holds.

---

## 7. NOT REACHED

- **No experiment was run and no producer was written when the rows were
  priced**, which is the map's rule: a graded row with its circularity pre-check
  comes before the run, never after. Rows 15 and 17 have since run
  (`import-fracparts.md`, `import-repulsive.md`), and row 16's experiment was
  overtaken by `record-location-null.md`.
- **No prior-art search was run on the identifications themselves**, meaning on
  whether anyone has published the identification of the skeleton door with
  Saffari–Vaughan's object, or of the `Z₂` record ladder with a trended record
  process. Both are natural enough to be in print and neither was searched, per
  `SEARCH-CONVENTIONS.md`. Row 15's PUBLISHED-ANCHOR pricing is contingent on
  that search, and the row should not be written up as novel before it runs.
- **Saffari–Vaughan's `F(α, ξ)` was not evaluated.** The claim that
  `F(α, ξ) → α` as `ξ → ∞` is taken from their Corollary 1.3 for the integer
  case and carried across to Theorem 10 by the shared main term; the definition
  at their (1.2) is OCR-degraded and was not re-derived.
- **The joint face of row 15 has no theorem.** The Siegel–Walfisz version of
  Theorem 10 is asserted here only as a shape and has not been written out, and
  its uniformity in `M` is the whole of its content.
- **Row 16's classification of the seven statistics has not been done.** The
  prediction in §3 that `z` mean and trend load are marginal-dependent is a
  guess made before reading the estimator definitions, which is why it is
  sealed rather than argued.
- **Rényi's own paper was not reached**, and the record-indicator independence
  that row 16 turns on is carried through two secondary records that were
  themselves verified only bibliographically.

---

## What would falsify this, and whether that check has run

**Row 15 is falsified** if any skeleton branch carrying more than 10% of the
mass at @13 through @23 has `M_T ≤ √W`, which would put the theorem's reach on
top of live mass and make §6(b) wrong. RUN in `import-fracparts.md`: the largest
covered branch reads 0.20%, 0.70%, 5.68% and 1.10% at @13, @17, @19 and @23, so
the kill did not fire. It is also falsified if Saffari–Vaughan's `F(α, x/y)`
does not tend to `α` in the regime `x/y = √W/M`. RUN, in the weaker sense that
`F(α, ξ) = α + O(1/ξ)` is derived there from their Theorem 1 and Corollary 1.3
rather than from their (1.2), which is unreadable in the scan. What did fire is
a falsifier this bullet did not name: the row's own reading of the range
condition. The exponent is `6/11` and not `1/11`, so the THEOREM column is
struck.

**Row 16 is falsified** if the two failing statistics of `zonegap-03-model.md`
§3 turn out to be functions of record times, since Rényi's theorem then makes
them distribution-free, no replacement marginal can move them, and the row's
DERIVED-CONSTANT payoff is unavailable, leaving only the wall address. NOT RUN,
and now moot: the row is stale, its null-side move having been executed in house
by `record-location-null.md` and its prior-art half closed by
`lit-kourbatov-shortfall.md`. It is also falsified as an instrument if the `F^α`
and improving-population models cannot be fitted with the trend held at the
measured `ln²x` scale without a free parameter, since a fitted null cannot
adjudicate a 6.0% deficit. NOT RUN.

**Row 17 is falsified** if `g(6) ≤ 1` at any ladder level, which would reopen
the repulsive family and void the closure. RUN in `import-repulsive.md`: `g` is
0 or at least 2.3812 and never in `(0,1)`, with `d = 6` the exact minimiser, so
the closure holds and is two-sided. §6(a)'s hand arithmetic at four values of
`q` reproduces there from independent residue counting. The PUBLISHED-ANCHOR half is falsified if
a sieved-set instance already exists in the hyperuniformity literature, which
`SEARCH-CONVENTIONS.md` records as searched and absent, on a search this pass
did not repeat and could not repeat, since the arXiv channel returned 429
throughout.

**The pricing itself is falsified** if any of the three fields turns out to be a
field already on the map under another name. The grep pass in §0 is the only
check that has run against that, and a grep is not a reading.

---

*This document states current understanding at 2026-08-28. It proposes rows and
edits nothing; the integration, if any, belongs to `research/IMPORT-MAP.md` and
to whoever holds it.*
