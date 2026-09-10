# Special-levels recon: what the literature can engineer at a chosen level

<!-- ledger
id: Q-special-levels-recon
status: CLOSED
todo: none
question: What level and modulus engineering does the literature own, and does any of it compose with the natal frame at primorial levels?
verdict: None of it composes: the literature's level engineering is entirely on the deviation side, every construction surveyed certifies that something deviates and none certifies smallness or regularity of a max-type object at its engineered level, so the i.o. licence to pick levels adds nothing to what is already imported.
-->

*2026-08-20. Literature recon only — no computation, no live document touched.
Question: the i.o. quantifier lets us PICK the levels; only Maier's construction
is closed here (`maier-matrix.md`, REFUTED 2026-08-17). What level/modulus
engineering does the literature own, what does each construction certify, and
does any of it compose with the natal frame at primorial levels? Search method
per `SEARCH-CONVENTIONS.md`; citations verified at source from rendered page
images where marked [AT SOURCE]; everything else carries its retrieval channel.
Status: HELD — proposes additions to PRIOR-ART.md, edits nothing.*

## 0. The answer, up front

> **The literature's level engineering is entirely on the DEVIATION side.**
> Every construction surveyed picks a modulus (usually a primorial or a
> class-restricted primorial) in order to certify that something deviates —
> more primes, fewer primes, a longer gap, a biased class. **No construction
> in the family certifies smallness or regularity of a max-type object at its
> engineered level.** The one published proof that WINS by exhibiting
> favourable levels (AGP's Carmichael theorem, §1f) targets a monotone COUNT
> and buys its favourable levels from averaged equidistribution with a bounded
> exceptional-modulus set — first-moment machinery that is already exact and
> free in our frame (`maier-matrix.md` §3). And the family's only
> i.o.-over-levels quantifier used offensively is Heath-Brown's, where the
> special levels are hypothesised (Siegel zeros), not constructed. The corner
> stays open from the literature's side: nothing here supplies the checkable
> level-predicate `R(x)` that `ioslack-survey.md` §8d requires, which is
> consistent with dial 4's closure.

## 1. The inventory

*(a) = what it engineers and at which levels; (b) = what it certifies;
(c) = composition with the natal frame at primorial levels; (d) = citation and
custody. "[AT SOURCE]" = read this pass from rendered page images in
`scratchpad/slrecon/`; "[CORPUS CUSTODY]" = verified earlier at source by the
lit-pdf staging records; "[SECOND-HAND]" = carried via a verified page of a
different paper, original unread — §4 lists each.)*

### 1a. Maier matrices and descendants

**(a)** Maier fixes `Q = ∏_{p<y} p` — a primorial, our tile's own modulus —
sets `x₁ = Q^D`, and reads the matrix `{Qx₁ + j}` two ways: columns are APs mod
Q, rows are short intervals of length `y^C`. The rough-number count
`Φ(y^C, y) ~ y^C (φ(Q)/Q) e^γ ω(C)` oscillates via Buchstab's `ω`, so some row
beats its mean [AT SOURCE: Thorne survey pp. 1–2; Maier 85 itself is CORPUS
CUSTODY, `lit-pdf-fgkt-maier.md` items obtained-table and 4.1].
**The level set is itself an i.o. subsequence, and defensively so**: PNT for
APs at modulus Q "is not known to be true for all Q, except under GRH.
However, a theorem of Gallagher [3] implies the correct asymptotic for an
infinite set of such Q" [AT SOURCE: Thorne survey p. 1 footnote 2]. So the
founding construction of the field already runs on picked levels — picked to
dodge Siegel zeros, never because the object is smaller there.

**(b)** `limsup ≥ 1+δ_A` and `liminf ≤ 1−δ_A` for prime counts in intervals of
length `log^A n` — existence i.o. in position, constant-factor relative
deviation, no density, both directions.

**(c)** CLOSED for us, and not re-litigated here: on the twin-slot set the
matrix is exact and returns one first moment (`maier-matrix.md` §§2–3, 6;
`REFUTED.md` "the Maier matrix as a route to the origin"). The nuance banked
by this pass is (a)'s: the literature's own use of level freedom in this
family is Siegel-avoidance, a defensive move with no analogue of "the level
where G₂ is small".

**(d)** Maier, *Primes in short intervals*, Michigan Math. J. **32** (1985)
221–225 [CORPUS CUSTODY]. Survey: Thorne, *Maier matrices beyond ℤ*,
Integers (2007 Integers Conference proceedings) [AT SOURCE, all 8 pp].

**Descendants, from the field's own roster** (Thorne survey §§2–4, read in
full; Springer volume TOC verified at the publisher's page):

- **Friedlander–Granville limitations**: APs with "significantly more (and
  others with significantly fewer) primes than usual" at `q ≤ x/(log x)^A` —
  the rich/poor classes, i.o. in x [AT SOURCE: GS preprint p. 2, eq. (1.1);
  original Ann. of Math. 129 (1989) NOT REACHED].
- **Thorne, function fields**: Maier's theorem and Shiu's theorem in `F_q[t]`
  (J. Number Theory **128** (2008) 1784–1794, Thms 1.1/1.2 quoted as survey
  Thms 2.1/2.2) [AT SOURCE: survey pp. 3–4].
- **Tanner**: Shiu strings in `F_q[t]` at every sufficiently large degree —
  the one descendant that upgrades i.o.-in-position to all-large-parameters
  [SECOND-HAND: survey p. 4; original NOT REACHED].
- **Thorne, prime bubbles**: imaginary quadratic fields; the engineered level
  is the ideal `𝔔 = 𝔮 ∏_{𝔭∈𝒫, 𝔭≠𝔭₀} 𝔭`, a primorial-like product with class
  restrictions depending on the target residue `a`, and **one prime 𝔭₀
  excluded exactly to kill Siegel zeros** [AT SOURCE: bubbles arXiv:1201.5400v1
  p. 1 and survey p. 5, eqs. (0.8)–(0.9)].
- **Balog–Wooley**: sums of two squares show Maier-type irregularities
  [SECOND-HAND: GS preprint p. 2; original NOT REACHED].
- **Raigorodskii–Rassias**, the method survey, in Pintz–Rassias (eds.),
  *Irregularities in the Distribution of Prime Numbers*, Springer 2018,
  pp. 165–186 [publisher TOC read; chapter text NOT REACHED].

### 1b. Erdős–Rankin engineered moduli, and the modern gap constructions

**(a)** The level is the full primorial-like `P(z) = ∏_{p≤z} p`; what is
engineered is the residue vector `(a_p)` inside it — the smooth trick `a_p = 0`
for medium p, then greedy/random covering, since 2016 a hypergraph covering
theorem and Maynard-style sieve weights. The engineering axis is orthogonal to
ours: they choose classes at ALL levels, we would want to choose levels.

**(b)** Quantitative LOWER bounds on the one-class covering optimum, hence on
max prime gaps, holding at every large level — no special levels needed:
FGKT and Maynard independently `≫ log X log₂X log₄X/log₃X` (removing `(log₃X)²`),
FGKMT the same with the improved constant; FMT chains put `k` consecutive
gaps of that size at once, `G_k(X) ≫ k^{-2} log X log₂X log₄X / log₃X`, **"we
combine the arguments in that paper with the Maier matrix method"** and §2 of
the paper is titled "Siegel zeroes" — the only in-print composition of the
Maier matrix with the Erdős–Rankin engine, and it is adversarial
[AT SOURCE: fmt-chains arXiv:1511.04468v1 p. 1].

**(c)** Already imported, adversary's side: `G₂ ≥ g` pointwise gives FGKMT
free, and the two-class substitution into Kalmynin–Konyagin is carried out in
`two-class-lower-bounds.md` §4c (NOT refereed). The special-levels reading is
new and negative in the useful direction: **the lower-bound engine succeeds at
every level, so no subsequence of levels escapes the floor** — picking levels
buys the prover nothing against the adversary, consistent with the max gap
being non-decreasing under inclusion of the sieve set (`ioslack-survey.md`).

**(d)** FGKT = Ford, Green, Konyagin, Tao, arXiv:1408.4505v2 (four authors, no
Maynard) and FGKMT = + Maynard, arXiv:1412.5029v3, *Long gaps between primes*,
JAMS 31 (2018) — author lists verified at the PDFs, `lit-pdf-fgkt-maier.md`
[CORPUS CUSTODY]. FKMPT sieved sets: `lit-pdf-fkmpt.md` [CORPUS CUSTODY].
Kalmynin–Konyagin Izv. Math. 88:2 (2024): `lit-pdf-kalmynin-konyagin.md`
[CORPUS CUSTODY]. FMT = Ford, Maynard, Tao, *Chains of large gaps between
primes*, arXiv:1511.04468 [AT SOURCE p. 1], published in the Pintz–Rassias
Springer volume pp. 1–21 [publisher TOC read]. Rankin 1938 / Pintz 1997 /
Westzynthius: carried per `two-class-lower-bounds.md` §2 [CORPUS CUSTODY].

### 1c. Shiu's strings of congruent primes

**(a)** The one true "favourable primorial-like level" construction in print.
Shiu's matrix modulus is a primorial with primes REMOVED by class: "the
primary difference is in the choice of Q. For example, if a = 1, primes ≢ 1
(mod m) are excluded from the product. This forces most primes in the matrix
to be ≡ 1 (mod m)" [AT SOURCE: Thorne survey p. 2]. The level is engineered so
the surviving columns are biased toward the target class.

**(b)** Existence i.o.: strings of k consecutive primes `p_{n+1} ≡ … ≡ p_{n+k}
≡ a (mod q)` for every (a,q)=1 and every k; quantitatively
`(1/φ(q)) (log₂p·log₄p/(log₃p)²)^{1/φ(q)} ≪ k`, uniform in q — note the
exponent `1/φ(q)`: the certified string length is brutally small, and the
uniformity in q is Thorne's sharpening of what Shiu printed ("In Shiu's
statement … the initial 1/φ(q) … [is] omitted, and the implied constant …
is allowed to depend on q" — bubbles p. 1 footnote 1) [AT SOURCE: both].

**(c)** Two kills. **(i) A class-restricted level exits the reduction.** The
Zone Equivalence needs the natal frame at FULL primorials: drop primes from
the level and their multiples stay unsifted, so zone occupancy stops meaning
twin primes; and the max gap is non-decreasing under inclusion of the sieve
set, so a favourable bound at a sub-level `L | x#` sits on the WRONG side —
`G₂(L) ≤ G₂(x#)` transfers nothing upward. **(ii) What the engineering buys is
a column-density bias, a first moment** — and on our set first moments are
exact, free, and already classified as empty (`maier-matrix.md` §§3, 6).

**(d)** D. K. L. Shiu, *Strings of congruent primes*, J. London Math. Soc. (2)
**61** (2000) 359–373 — author and venue verified at the journal's own article
page (Oxford Academic); full text paywalled, so every hypothesis above is
carried via Thorne's two rendered statements, not Shiu's page. **Citation
trap:** Thorne's survey and bubbles paper both write "In 1997, Shiu proved";
the journal prints 2000. Cite 2000.

### 1d. Granville–Soundararajan: the uncertainty principle, and "poor/rich"

**(a)** GS prove that ANY "arithmetic sequence" (multiplicative divisibility
profile `h(d)/d`) is somewhere irregular; the engineered-level instance is
their Corollary 1.2: q large squarefree with `Σ_{p|q} (log p)/p ≥
60 log₃q` — a bound "attained when q is the product of the primes up to some
large y", i.e. the primorial is the extremal level — gives intervals `I±` of
length ≥ `z^u` whose reduced-residue counts read `{1 ± 1/u^{c₂u}} (φ(q)/q)|I±|`
[AT SOURCE: GS preprint arXiv:math/0406018v1 pp. 1–4; published Annals 165
(2007) 593–635 is CORPUS CUSTODY, `lit-pdf-fgkt-maier.md` obtained-table].
They note this breaks the Montgomery–Vaughan Gaussian heuristic at
`h = log^A q` "for many highly composite q" [AT SOURCE: p. 4].

**(b)** Existence of a bad interval or bad progression (ensemble, i.o. in x),
at relative amplitude `1/u^{cu}` — tiny, and two-sided. Never a density over
levels, never a regularity.

**(c)** Obstruction-shaped, and already priced: the corpus withdrew GS Cor 1.4
as an obstruction because its η is capped at 1/100, firing only past
`log x ≥ (5·10⁶)^{200}` (`REFUTED.md`; `maier-matrix.md` §8). Cor 1.2 is the
closest published statement to "the one-class tile's interval counts deviate
at engineered levels", and it certifies the wrong direction for us:
irregularity exists. Nothing to import.

**(d)** On the brief's phrase "poor/rich residue classes": what is in print is
GS's "poorly distributed" dichotomy (1.2a)/(1.2b) for any subset of the primes,
and Friedlander–Granville's progressions with "significantly more/fewer primes"
(§1a). **No GS item titled "poor/rich residue classes" was found** — looked in
the GS preprint pp. 1–4 [AT SOURCE], Thorne's survey and its reference list
[AT SOURCE], and the Pintz–Rassias volume TOC, i.e. inside the Maier-matrix
family's own owning convention ("irregularities in the distribution", "Maier
matrix") per `SEARCH-CONVENTIONS.md` §1's rule; a wider titled-phrase sweep
was not run (§4).

### 1e. McNew / Pomerance-style deviations

**(a–b)** Two threads, neither engineering a level. **(i) Extreme primes:**
Pomerance, *The prime number graph* (Math. Comp. 33 (1979) [SECOND-HAND]),
studies vertices of the convex hull of `(n, p_n)`; McNew's chapter resolves
several of its conjectures — *The Convex Hull of the Prime Number Graph*,
Nathan McNew, in Pintz–Rassias (eds.), Springer 2018, pp. 125–141 [author and
pages verified at the publisher's TOC; chapter text NOT REACHED]. Certifies:
infinitely many record/extreme primes — i.o. existence of extreme LEVELS in a
one-dimensional record sense, driven by π(x) error terms. **(ii) Least-prime
deviations at almost all moduli:** Pomerance's theorem, read at source as
LPS's eq. (1): `P(k) ≥ (e^γ+o(1)) φ(k) log k log₂k log₄k/(log₃k)²` for every
k outside the set Q of k with more than `exp(log₂k/log₃k)` distinct prime
factors — ALMOST EVERY k; Granville–Pomerance: infinitely many progressions
with `p(k,ℓ) ≥ (2+o(1)) k log k log₂k log₄k/(log₃k)²`; Li–Pratt–Shakan
Thm 1.1: `P(k) ≫ φ(k) log k log₂k log₄k/log₃k` (one `log₃k` better) for all k
with few prime factors — a density-one set — effective, "answering a question
of Ford, Green, Konyagin, Maynard, and Tao", via "sieve weights to capture not
only primes, but also small multiples of primes" [AT SOURCE: lps
arXiv:1607.02543v2 pp. 1–2; authors Junxian Li, Kyle Pratt, George Shakan].

**(c)** Calibration, not machinery: the least-prime thread shows the bad-level
phenomenon is GENERIC — almost every modulus is bad for the adversarial
object — so "pick a level" cannot dodge a floor that holds at density one.
Same lesson as 1b, now on the moduli axis itself. The extreme-primes thread
transports nothing: records of a scalar sequence against π(x) error terms have
no analogue of our sup-over-positions wall.

**(d)** Originals Pomerance 1979, 1980 and Granville–Pomerance: NOT REACHED
(§4); their statements above are quoted from LPS pp. 1–2, rendered.

### 1f. Favourable-level constructions proper: AGP, and the Siegel dichotomy

**(a)** Alford–Granville–Pomerance build Carmichael numbers by finding a
highly composite L with unusually many primes `p ≡ 1 (mod d)` for divisors
`d | L`. The favourable-level certificate is their set ℬ: `π(y;d,a) ≥
π(y)/2φ(d)` for all `d ≤ min{x^B, y/x^{1−B}}` **"whenever d is not divisible
by any member of 𝒟_B(x), a set of at most D_B integers, each of which exceeds
log x"** — averaged equidistribution with a bounded exceptional-modulus set,
`(0, 5/12) ⊂ ℬ` from Huxley–Jutila zero densities; paired with the friable
set ℰ (`(0, 1−(2√e)^{-1}) ⊂ ℰ`, Friedlander) [AT SOURCE: agp.pdf pp. 704–705].

**(b)** Theorem 1: `C(x) ≥ x^{EB}` for all large x, so `C(x) > x^{2/7}` —
a density of successes, not mere i.o.; the favourable levels exist in
abundance because the exceptional set is bounded.

**(c)** The only offensive use of level freedom in the surveyed literature,
and its two enabling conditions both fail here. (i) The target is a COUNT,
monotone in finding more primes, so averaged (first-moment) inputs suffice;
our target is a sup over positions, and our first moments are exact and empty
(`maier-matrix.md`). (ii) The favourability predicate is checkable from
averaged equidistribution; the analogous `R(x)` for G₂ is exactly what
`ioslack-survey.md` §8d demands and the corpus survey could not find, with
0.37 nats of instrument slack against a need of 6.7. Template noted, not
importable with any instrument now on record.

**(d)** AGP, *There are infinitely many Carmichael numbers*, Ann. of Math. (2)
**139** (1994), no. 3, 703–722, MR1283874, DOI 10.2307/2118576 — authors
W. R. Alford, Andrew Granville, Carl Pomerance verified at the paper's first
page [AT SOURCE: agp.pdf p. 703, from Pomerance's own site]. **Citation trap,
found this pass:** the author-hosted scan's running head prints "Annals of
Mathematics, 140 (1994), 703–722"; MR1283874 and the DOI say volume 139,
no. 3. Cite 139 and never the running head.

**The Siegel dichotomy, for completeness.** The one place the literature
certifies something TPC-shaped from special levels is Heath-Brown: if Siegel
zeros exist i.o. then there are infinitely many twin primes (*Prime twins and
Siegel zeros*, Proc. London Math. Soc. (3) 47 (1983) 193–216 — citation
standard but NOT verified at source this pass, §4). There the special levels
are hypothesised, not constructed — the exact inverse of Maier's defensive
avoidance in §1a — and `ioslack-survey.md` §9 already records that his
instrument selects levels where a Siegel zero exists, not levels where the
truth is generous.

## 2. Compose-with-our-frame verdicts

| construction | engineers | certifies | composes with the natal frame? |
|---|---|---|---|
| Maier 1985 | primorial level + matrix position, Siegel-safe levels only | i.o. ±constant-factor interval deviations | NO — already REFUTED on our set (exact ⇒ first moment only); its level freedom is defensive |
| Friedlander–Granville | modulus `q ≤ x/(log x)^A` | i.o. rich/poor classes | NO — deviation-direction; it is the ensemble-irregularity half PRIOR-ART already banks |
| FGKT / Maynard / FGKMT / FKMPT / KK | residue vector at ALL levels | lower bounds on gaps, every level | ALREADY IMPORTED (adversary); needs no special levels, so the i.o. licence adds nothing to it |
| FMT chains | Maier level × Rankin residues | i.o. chains of k large gaps | NO for the wall, YES as an existence proof that matrix∘Rankin composes — adversarially only |
| Shiu 2000 | class-restricted primorial `Q` | i.o. strings of congruent primes, `k` at exponent `1/φ(q)` | NO — sub-primorial levels exit the Zone Equivalence and sit on the wrong side of gap monotonicity; the gain is a first moment |
| GS uncertainty | highly composite / primorial `q` | i.o. bad interval or bad class, amplitude `1/u^{cu}` | NO — obstruction-shaped, quantitatively inert at reachable scales (Cor 1.4 already WITHDRAWN as an obstruction) |
| Pomerance / Granville–Pomerance / LPS | none (bad levels are generic) | least-prime floors at almost all k | NO — calibration only: level-picking cannot dodge a density-one floor |
| McNew (convex hull) | none | i.o. extreme primes | NO — scalar-record shape, no sup-over-positions analogue |
| AGP 1994 | highly composite L avoiding a bounded exceptional-modulus set | density of favourable levels, count target | TEMPLATE ONLY — needs a monotone count target and an averaged input; both absent here (`ioslack-survey.md` §8d) |
| Heath-Brown 1983 | none (levels hypothesised) | Siegel zeros i.o. ⇒ TPC | the shape of our wall, solved conditionally from the other end; nothing constructive to import |

## 3. Proposed PRIOR-ART.md additions (NOT APPLIED)

1. **Maier-chain section, one sentence**: Maier's construction certifies its
   levels only on an infinite Siegel-safe subsequence (Gallagher's theorem;
   Thorne survey p. 1 fn. 2) — the field's own i.o.-over-levels quantifier,
   used defensively.
2. **New verdict row**: "Engineered favourable primorial-like level" —
   **classical as a technique** (Shiu 2000's class-restricted primorial;
   Thorne's `𝔔` with a Siegel-killing excluded prime; AGP's exceptional-set
   avoidance); every published instance certifies a deviation or a count,
   none a max-type upper bound at its level — searched inside the family's
   own convention (§1d, §4).
3. **Citation-trap register**: Shiu is 2000 not Thorne's "1997"; AGP is
   Ann. of Math. (2) 139 (1994) 703–722 (MR1283874), not the scan's
   running-head "140".

## 4. NOT REACHED

- **Shiu 2000 full text** — JLMS paywall; theorem carried via Thorne's two
  rendered statements. His exact hypothesis set (which residue classes the
  method handles best) is therefore UNREAD.
- **Friedlander–Granville, Ann. of Math. 129 (1989)** — carried via GS p. 2.
- **Granville, ICM 1994 survey** and **Soundararajan's NATO survey** — cited
  by Thorne, unread.
- **Balog–Wooley** (sums of two squares) — carried via GS p. 2.
- **Tanner** (function-field strings at every large degree) — carried via
  Thorne survey p. 4.
- **Pomerance, Math. Comp. 33 (1979)**; **Pomerance, J. Number Theory 12
  (1980)**; **Granville–Pomerance (least prime)** — all carried via LPS
  pp. 1–2; original hypothesis sets unread.
- **McNew's chapter text** and **Raigorodskii–Rassias's survey chapter text**
  — Springer paywall; only the publisher's TOC (titles, authors, pages) read.
- **Heath-Brown 1983** — citation not verified at source; the dichotomy's
  exact hypotheses unread this pass.
- **Konyagin's and Pintz's intermediate gap papers** (between Rankin 1938 and
  FGKT) — trusted to `two-class-lower-bounds.md` §2's custody, not re-read.
- **A systematic owning-convention sweep for "regularity at an engineered
  modulus"** (zbMATH/MathSciNet keyword classes 11N13/11N25) was NOT run;
  §1's absence claims rest on the family's own surveys (Thorne, read in
  full; the Pintz–Rassias TOC) plus GS's examples list, not on an indexed
  sweep. If this corner is ever re-opened, start there.
- **Threads not followed**: Funkhouser–Goldston–Ledoan and Freiberg chapters
  in the Pintz–Rassias volume (gap distributions, not level engineering by
  their titles — titles only read); Kalmynin–Konyagin's bibliography for
  Russian-school antecedents of multi-class engineering.

---

*Producer artifacts: rendered-page reads in
`/private/tmp/claude-501/.../scratchpad/slrecon/` (thorne-survey.pdf,
gs-uncertainty.pdf, thorne-bubbles.pdf, fmt-chains.pdf, lps.pdf, agp.pdf,
fgkmt-jams.pdf downloaded but not needed beyond corpus custody, mr.html =
mrlookup response). Scratchpad is session-local; the citations above carry
everything load-bearing.*
