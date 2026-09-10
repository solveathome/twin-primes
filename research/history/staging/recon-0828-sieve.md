# Sieve-side recon on the two dials: nothing in print beats 4.26645 at kappa = 2 at any level, the DHR theorem never capped the level in the first place, and the one published bilinear remainder above dimension 1 excludes our dimension by its own stated hypothesis

<!-- ledger
id: Q-recon-0828-sieve
status: ANSWERED
todo: 0, Z2
question: Is there anything in the 2008-2026 sieve literature, or in the parity-breaking literature, that lowers beta_2 = 4.26645 or supplies a consumer for a level theta > 1 on the two-class comb?
verdict: No route. Twenty-one angles examined, nineteen dead on arrival, nothing in print beats 4.26645 at kappa = 2 at any level on four calibrated channels; the two survivors are an owning-convention row and one unresolved hypothesis in a five-page 1990 announcement whose stated requirement beta < 3 excludes beta_2 = 4.26645.
-->

*(2026-08-28. Staging note. Nothing here is integrated into a live document and
no existing file was edited. No producer was written and none was run: every
number below is either quoted from a page read this session, cited from a repo
document by section, or hand arithmetic on those, marked `[ARITHMETIC]` with its
inputs. Source legend follows `research/IMPORT-MAP.md` §0: **[SOURCED]** read at
a publisher page, an arXiv abstract page or a zbMATH record this session, with a
sha256 prefix in §1; **[SOURCED-BIB]** bibliographic data verified, statement
not opened; **[MEMORY]** written from memory and not reached at any source.
Nothing here is PROVEN and nothing here is a TPC claim. HELD for an adversarial
pass.)*

**Confidence that this note opens a route: below 1%.** The one candidate that is
not dead on arrival is a hypothesis inside a five-page 1990 research announcement
that has essentially no forward citations, and even granting it, two independent
walls stand behind it. The rest of the value here is one owning-convention row
the corpus does not have and one sharpening of how the level enters the DHR
statement.

**Ledger debt, stated because this note cannot pay it.** The `questions` guard
requires TODO items 0 and Z2 to carry `Ledger: Q-recon-0828-sieve` on their own
`Ledger:` lines. The fence on this session forbids editing any existing file, so
that line is owed and unwritten, and the gate will say so.

---

## 0. The verdict, disconfirming half first

**Five things that would have made this worth doing, and none of them holds.**

1. **No paper published since Diamond-Halberstam 2008 states a sifting limit
   below 4.26645 at kappa = 2, at any level convention.** Searched in the owning
   convention of `research/SEARCH-CONVENTIONS.md` §4, which is the sieve
   literature's own phrase *sifting limit* together with the DHR beta_kappa
   table, on four channels each calibrated in this session (§1). The exact
   phrase reaches exactly one arXiv record in twenty-eight years of the archive,
   and it is Franze 2011, which is worse at kappa = 2.
2. **The one 2025 paper whose abstract promises "better inequalities of F_kappa
   and f_kappa for dimensions kappa > 1" is a paper the corpus has already read
   in full and closed.** It is Runbo Li, arXiv:2504.07974 **[SOURCED]**, and
   `history/staging/scope-fractional-retention.md` prices it: half the rule
   family is empty at every kappa >= 2 because alpha_2 = 5.35773 exceeds
   beta_2 + 1 = 5.26645, and the surviving half is worth about
   3.83 x 10^-4 of exponent at kappa = 2. `REFUTED.md` carries the line.
3. **The one published bilinear-or-trilinear form of the sieve remainder above
   dimension 1 excludes kappa = 2 by its own stated hypothesis.** Pomykala 1990,
   reviewed by Greaves, requires beta < 3; beta_2 = 4.26645
   (`research/dhr-verification.md` §1.1, Booker-Browning). §4.
4. **Every parity-breaking ingredient in print fails its structural
   precondition on the two-class comb, and most of them fail it for the same
   reason twice.** §5. The reason is the one already banked as a wall address:
   the comb is a product measure whose Fourier mass sits exactly where the
   primes' does, so no bilinear input has coefficient cancellation to exploit
   and no decorrelation is available.
5. **Parity was never the obstruction on the G2 side anyway, and treating it as
   one costs sessions.** G2(x#) is a statement about a periodic set of residues
   containing no primes. The parity problem obstructs prime detection. What
   obstructs G2 is DP1, the master discard, and the corpus has already measured
   a floor of 3.3152 for the entire class of methods that read only the
   divisor-class counts (`sift-limit-attack.md` §7d, `lp-push-x43.md`, 33
   readings to x = 43). So even a perfect kappa = 2 lower-bound sieve leaves
   exponent 3.32, which is not 2. **Lowering beta_2 cannot reach the target.**
   Parity is live only on the Z2 side, where the payout is already graded
   TPC-strength (`attack-wrongdirection-audit.md` §3.8, row 8).

**What moved.** Nothing in the exponent. One owning-convention row is identified
(§4.3), one statement about the level is sharpened (§3), and twenty-one angles
are recorded with their killers so the next wave does not re-walk them.

---

## 1. Channels, calibrated before any negative was written

Every negative in this note rests on these four, each probed with a known
positive in the same minutes as the negative it carries. The rule is
`SEARCH-CONVENTIONS.md` §2's: a channel that does not return its calibrator
voids that day's negatives on it.

| channel | how reached | calibrator | result |
|---|---|---|---|
| arXiv HTML search | `arxiv.org/search/?searchtype=all` with a browser user-agent | `"sifting limit"` returns Franze arXiv:1012.3809; `parity problem sieve` returns Friedlander-Iwaniec math/9811186 | **PASS** |
| OpenAlex | `api.openalex.org/works`, `search=`, and `filter=cites:` | `search=Sifting limits for the sieve` returns Franze at rank 1; `cites:W1827462440` returns 3 | **PASS** |
| zbMATH Open | `api.zbmath.org/v1/document/_search` | `sifting limit` returns Franze and the Grupp-Richert sieve-function notes | **PASS** |
| WebSearch (Google surface) | tool | the 4.266 query returns Franze, Blight and Ford's 2023 notes | **PASS** |

**Channels that were dead today and are owed.** The arXiv **API** answered HTTP
503 to every call including four retries at six-second spacing, on both `http`
and `https` and on `export.arxiv.org`; the HTML search interface substituted for
it and is what §2's counts come from. Semantic Scholar answered HTTP 429 on the
first call and was not retried. MathSciNet's `mrlookup` was not used, because it
returns bibliographic fields only and every question here needs a statement.
**Consequence, stated rather than hidden:** the arXiv full-text leg and Semantic
Scholar's citation graph are unrun, so §2's negative rests on three channels and
not five.

**Artifacts read at the page this session, with sha256 prefixes of what was
fetched.** arXiv abstract pages carry dynamic elements, so these hashes attest
what this session read, not a stable document identity.

| artifact | sha256 (16) |
|---|---|
| arXiv:2504.07974 abs, Li, *A note on variants of Buchstab's identity* | `03e73e6d191959df` |
| arXiv:2405.05727 abs, Li, *On Chen's theorem, Goldbach's conjecture and almost prime twins II* | `9e655f514023bfa8` |
| arXiv:2602.20917 abs, Li, *Primes in arithmetic progressions to large moduli and refinements of Harman's sieve* | `3d80a56721539885` |
| arXiv:2602.08286 abs, *Almost-primes in Sun's x^2+ny^2 conjecture* | `150fbd5cb25ed0a9` |
| arXiv:2510.10853 abs, Johnston, *An effective Bombieri-Vinogradov error term for sifting problems* | `7be42a0e855a4f79` |
| arXiv:1604.01041 abs, Maynard, *Primes with restricted digits* | `89dc704bfa247f70` |
| arXiv:math/9811186 abs, Friedlander-Iwaniec, *Asymptotic sieve for primes* | `aa7e839406a6ff9e` |
| zbMATH record Zbl 0763.11038 (Pomykala 1990) with Greaves's review text | `334e527a7dac069a` |

---

## 2. The beta dial: what the 2008-2026 literature actually contains

**The count.** Eleven candidate papers were opened at abstract or review level
after being surfaced by the three indexed channels. The surfacing was done three
ways so that no single index's blind spot decides the answer: the exact-phrase
sweep, the forward citation graphs of both OpenAlex records for the
Diamond-Halberstam book (31 and 18 citers, all titles read), and the forward
graph of Franze 2011 (3 citers, all read, all already in the corpus).

| paper | what it bounds, in its own convention | kappa = 2 sifting limit? |
|---|---|---|
| Li, arXiv:2504.07974 (2025) **[SOURCED]** | variants of Buchstab's identity, refining Brady's iteration rules; "better inequalities of F_kappa(s) and f_kappa(s) for dimensions kappa > 1" | **No.** Read in full by the corpus already; the family is worth 3.83e-4 of exponent at kappa = 2 and half of it is empty there (`scope-fractional-retention.md`) |
| Li, arXiv:2405.05727 (2024) **[SOURCED]** | D_{1,2}(N) >= 1.9728 C(N)N/log^2 N, by weighted sieve, Chen switching, Chen's double sieve, Harman's sieve, and the Lichtman and Pascadi levels | **No.** A constant in a Chen-type lower bound for primes; no sieve function is moved |
| Li, arXiv:2602.20917 (2026) **[SOURCED]** | primes in progressions to moduli up to x^{9/17} bilinear, x^{17/32} trilinear, via Harman-sieve majorants and minorants | **No.** A level for the primes, not a sifting limit, and its input is arithmetic the comb does not have (§5) |
| Johnston, *New explicit and asymptotic results in sieve theory*, Bull. Aust. Math. Soc. (2026), DOI 10.1017/s0004972725100828 **[SOURCED]** | at most 4 prime factors between n^2 and (n+1)^2; 16 under GRH for Goldbach; M(k) = 6k, 4k for p^k + eta | **No.** Explicit linear-sieve work; no beta_kappa is stated |
| Johnston, arXiv:2510.10853 (2025) **[SOURCED]** | any sifting problem with a Bombieri-Vinogradov style error term can be made effective, with no asymptotic loss | **No.** Effectivity, not limit and not level |
| Ha-Hoang-Ngo, *On the least almost-prime in an arithmetic progression*, Mathematika (2026), DOI 10.1112/mtk.70080 **[SOURCED]** | a P_2 in every progression, by the Greaves-Halberstam-Richert weighted sieve with bilinear remainders plus Selberg | **No.** An application at kappa = 1 |
| arXiv:2602.08286 (2026) **[SOURCED]** | almost-primes in Sun's x^2 + ny^2 conjecture, by Richert's weighted sieve | **No.** An application; verifies Richert's conditions, does not move them |
| Franze, J. Number Theory 131 (2011) **[SOURCED-BIB, corpus]** | Lambda^2 Lambda^- sifting limits, kappa = 2..10 | **No.** 4.516 at kappa = 2, worse; superior only from kappa >= 3 |
| Blight, Rutgers PhD (2010) **[SOURCED]** | refinements of Selberg's sieve, new lower bound sieves | **No.** `SEARCH-CONVENTIONS.md` §4: below 4.45, and the number 4.2665 is never beaten and never written |
| Brady, Stanford PhD (2017) **[SOURCED-BIB, corpus]** | iteration rules; 3.11582 to 3.11549 at kappa = 3/2 | **No.** kappa = 3/2 only, by the alpha >= beta + 1 theorem |
| Ramare, *On long kappa-tuples with few prime factors*, PLMS (2011) **[SOURCED]** | Omega((n+h_1)...(n+h_kappa)) = (1+o(1)) kappa log kappa infinitely often | **No.** A count of prime factors, not a sifting limit |

**The absence, stated with its convention.** No published sifting limit below
4.26645 at kappa = 2 was located, searched in the owning convention named in
`SEARCH-CONVENTIONS.md` §4 (the phrase *sifting limit* and the DHR beta_kappa
table) on the three indexed channels of §1. This reproduces `REFUTED.md`'s
"improving beta_2 itself" row on a fresh sweep eight months of literature later,
and adds the 2025 and 2026 papers above to what that row covers.

**And the band below 4.2665 is still a proof gap and not a truth gap.** No
kappa = 2 extremal example blocking any exponent in (2, 4.2665] was located, in
the same convention; the negative here matches `sift-limit-attack.md` §2, which
searched Selberg's *Lectures* through Franze, the DHR apparatus, Ford's 2023
notes, Blight and Brady. Searches for an optimality statement at kappa > 1
returned nothing on zbMATH under *sifting limit best possible*, *lower bound for
the sifting limit* and *optimality of the combinatorial sieve*; the only kappa
for which optimality is in print is kappa = 1, where Selberg's Liouville sets
force beta_1 = 2, and the corpus already carries that at `covering-dive.md`
§1.3.

---

## 3. The level dial: what the DHR theorem caps, and what it does not

**The question as briefed was "the DHR limit is at what level", and the answer is
that the question does not have the shape it looks like.** beta_kappa is not
attached to a level. It is a threshold in the single variable
`s = log y / log z`, where `y` is the level of distribution and `z` the sifting
parameter. `research/dhr-verification.md` §0 row 1c, read against the book at
line level, records the shape of DH 2008 Theorem 9.1: main term in
`f_kappa(log y / log z)`, remainder `2 * sum_{m | P(z), m < y} 4^{omega(m)}
|r_A(m)|`, with **the same `y` in both**. Franze's own normalisation, quoted
verbatim at `dhr-verification.md` §1.2, then specialises it: "Letting |A| = x,
and z = x^{1/beta_kappa}, we have S(A,P,z) >> x / log^kappa x". That
specialisation is where `theta = 1` enters, and it enters as a *choice of y*,
not as a hypothesis of the theorem.

**Consequence, and it is the useful half of this section.** Theorem 9.1 contains
no hypothesis `y <= |A|`. The cap `theta <= 1` is imposed entirely by the
remainder line, because the trivial per-modulus bound on a periodic comb is
`|r_A(m)| <= 2^{omega(m)}`, so the remainder sum is at most `D log^5 D` in the
DHR weight and must be `o(|A| V(z))`, which forces `D <= H^{1-epsilon}`. So the
sentence "the DHR limit is a theorem at level theta = 1" is wrong in a way that
matters: **the limit is level-free and the level is remainder-bound.** This is
consistent with, and is the derivation behind, `sift-limit-attack.md` §7d's
elasticity table, where `E = beta/theta` with log-elasticities exactly +1 and -1.
[ARITHMETIC, inputs: `dhr-verification.md` §0 row 1c and §1.2; the trivial
remainder bound.]

**So "does level > 1 make sense for our object" has a precise answer: yes in the
theorem, no in any published remainder estimate.** Level `theta > 1` means
summing `r_A(m)` over moduli exceeding the window length. The corpus's own
measurement is that the signed sum behaves as `D^gamma` with `gamma` in
0.27 to 0.49 over complete periods, giving `theta` in 2.06 to 3.65
(`sift-limit-attack.md` §7d). **That measurement carries no position
quantifier**, and the position quantifier is the whole price: `sift-limit-attack.md`
§7e measures the cost of removing it at `C^{pi(z)}` with `S_sat` growing by a
flat factor 2.0516 per added prime, and the almost-all exponent at `0`.

**What theta would have to be.** `beta_2 / theta = 2` needs `theta = 2.13322`.
[ARITHMETIC, inputs: 4.26645028414864191641 divided by 2.] That number sits
inside the measured complete-period headroom and outside every bound that holds
at every position. The gap between those two facts is the entire live front, and
it is a quantifier gap and not a size gap.

**One more arithmetic, so the two dials are not confused.** Combining the LP
floor with the measured headroom gives `3.3152 / 2.13322 = 1.554`
[ARITHMETIC, inputs: `lp-push-x43.md`'s floor and the theta above]. That is below
2, which says the two dials together would overshoot the target if both were
delivered at every position. Neither is. The reading to take from it is that
**theta is the dial with the reach and beta is not**: beta's entire headroom,
4.26645 down to 3.3152, is 22% of the exponent and cannot cross 2 by itself.

---

## 4. The one published bilinear remainder above dimension 1

### 4.1 What it is

Jacek Pomykala, *On the trilinear form of the R-term in the Rosser-Iwaniec sieve
of dimension kappa > 1*, Bull. Polish Acad. Sci. Math. **38** (1990) 167-171,
Zbl 0763.11038 **[SOURCED at the zbMATH record, review text read]**. George
Greaves's review, verbatim:

> "Under certain circumstances, Iwaniec's well-known bilinear form [H. Iwaniec,
> Acta Arith. 37, 307-320 (1980; Zbl 0444.10038)] of the error term in the linear
> sieve is replaced by a trilinear one answering to a general description
> `sum_{m<M} sum_{n<N} sum_{k<K} a_m b_n c_k r(A, mnk)`, using the usual
> notations of this subject. The construction requires that the sifting limit
> `beta` satisfies `beta > 2`, because the level of distribution `Delta` is
> expressed as `Delta = MNK^{beta-2}`. Thus it is applicable when the dimension
> `kappa` of the sieve exceeds 1. There is also a more technical requirement
> `beta < 3`, the need for which appears in the proof of a key lemma which is
> provided in this announcement. The remainder of the treatment is along the
> lines of the author's work on the bilinear form of the error term when
> `kappa > 1/2` [Acta Arith. 52, 293-306 (1989; Zbl 0626.10041)]."

The predecessor at `kappa` below 1 is Pomykala, Acta Arith. **52** (1989)
293-306 **[SOURCED-BIB]**, and Schochat, *Pomykalas Bilinearform fuer Siebe des
Greaves'schen Typs mit Dimension kappa in (1/2,1)* (1989) **[SOURCED-BIB]**
extends it to Greaves-type sieves, also below 1.

### 4.2 Why it does not reach us

**`beta < 3` excludes `beta_2 = 4.26645`.** Since the DHR ladder runs at about
`2.44 kappa` (Franze, quoting DH Ch. 17), `beta < 3` confines the construction to
roughly `kappa < 1.23`. [ARITHMETIC, inputs: 3 divided by 2.44.] Our dimension is
2. **The single published attempt to build a bilinear or trilinear remainder
above dimension 1 stops below our dimension, by a hypothesis its own reviewer
flags as needed for a key lemma.**

**And behind it stand the two walls the corpus already priced.** Granting the
hypothesis for the sake of argument, a trilinear form for the comb's remainder
`r(A, mnk)` is a trilinear sum of sawtooths over a periodic set, which is the
Kloosterman-fraction object of `SEARCH-CONVENTIONS.md` §1 row 34. The
position-uniform case there is priced, not absent: Bettin-Chandee's Remark 1
charges `(1 + hx/MN)^{1/2}`, which is `O(1)` only for `x << H^{1.212157}`, while
our `x` reaches `exp(H^{0.2344})` (`sift-limit-attack.md` §4.5 row). And the
smooth-modulus branch is unavailable to us because well-factorability supplies
1-bounded factors, not smooth ones (`smoothness-front.md`; `REFUTED.md`).

### 4.3 What is banked

**An owning-convention row the corpus does not have.** The corpus has searched
the theta axis exclusively through "bilinear forms with Kloosterman fractions"
(row 34) and through "level of distribution" (row 49, correctly marked as
guaranteed-negative because that convention's theta is always below 1). Neither
reaches Pomykala, because his object is named for the *sieve's* remainder rather
than for the exponential sum inside it. The wording that owns it is **"the
bilinear form of the error term in the Rosser-Iwaniec sieve of dimension
kappa"**, with `Delta = MNK^{beta-2}` as the level identity to search on. That
row belongs in `SEARCH-CONVENTIONS.md` §1 beside row 34, and this note cannot
write it under its fence.

**The one live question, priced honestly.** Is `beta < 3` essential or an
artifact of the announcement's key lemma? The announcement is five pages, in a
bulletin, and its OpenAlex forward graph returned one citing work, itself
unrelated (a determinant-method survey). Nobody appears to have taken the
construction past dimension 1.23 in thirty-six years. Probability that relaxing
it opens a route here: below 2%, because both walls of §4.2 remain and the second
of them is an exponent comparison rather than a technicality.

---

## 5. Parity, and why it is the wrong wall for G2

**The framing correction, first, because it is worth more than the rows.** The
parity problem is an obstruction to *detecting primes*. `G2(x#)` is the longest
run of consecutive integers each hit by `{a_p, a_p - 2}` for some `p <= x`. That
object contains no primes, and no parity of `Omega(n)` appears anywhere in its
definition. **A parity-breaking ingredient therefore cannot lower the `G2`
exponent, whatever its power.** It is live only on the Z2 side, where the
certificate `X(y*) < T` is already graded TPC-strength and stronger
(`attack-wrongdirection-audit.md` §3.8 and its row 8: the sieve half needs a
kappa = 2 *lower* bound at `s = u*/2 = 1.7829` against `beta_2 = 4.26645`, short
by 2.393x). The rows below are recorded so the next brief does not re-open them,
not because any of them is a candidate.

**The shared killer, stated once.** The comb is a product measure. Its Fourier
coefficients `Theta_e(a)` factor as products of local Ramanujan-type terms, and
the corpus has measured that this product's `l^1` mass grows like `C^{pi(z)}`
with a per-prime factor 2.0516 (`sift-limit-attack.md` §7e). Every ingredient
below needs, in one form or another, either coefficient cancellation in a
bilinear sum or a decorrelation between two Fourier supports. A product measure
supplies neither, and its spectrum sits precisely on the rationals with smooth
denominators, which is where the primes' spectrum is large.

| ingredient | the input that breaks parity | can the comb supply it | verdict |
|---|---|---|---|
| Friedlander-Iwaniec asymptotic sieve for primes, arXiv:math/9811186 **[SOURCED, abstract]** | an *additional axiom* beyond the classical formulation: a bilinear Type II estimate valid across a wide range of splittings | **No.** The bilinear sums over the comb factor into local products with no coefficient cancellation; and the conclusion is about primes in the sequence, of which the comb has none | dead on arrival, twice |
| Heath-Brown `x^3 + 2y^3`; Friedlander-Iwaniec `x^2 + y^4` **[MEMORY]** | a polynomial parametrisation of the sequence, which manufactures the bilinear decomposition | **No.** The comb is a union of residue classes, not a polynomial value set | dead on arrival |
| Maynard, *Primes with restricted digits*, arXiv:1604.01041 **[SOURCED, abstract]** | "decorrelating Diophantine conditions which dictate when the Fourier transform of the primes is large from digital conditions which dictate when the Fourier transform of numbers with restricted digits is large" | **No, and maximally so.** The comb's transform is large exactly at `a/e` with `e` dividing `P(z)`, which is the major-arc set. The two supports coincide rather than decorrelate | dead on arrival |
| Green-Tao-Ziegler nilsequences **[MEMORY]** | a linear system of finite complexity, so the Gowers norm controls the count | **No.** The twin pattern is a one-variable, infinite-complexity system; this is the method's own known scope limit | dead on arrival |
| Zhang, Maynard, Polymath8b bounded gaps **[MEMORY]** | nothing. These results break **no** parity: they place `m` primes in a bounded window without locating any pair | not applicable | not a parity ingredient |
| Chen's switching **[MEMORY]**, as used in Li arXiv:2405.05727 **[SOURCED]** | it evades parity rather than breaking it, by weakening the target from prime to `P_2` | **No.** The comb has no "almost prime" weakening available; a slot is hit or it is not | dead on arrival |
| Matomaki-Radziwill short-interval multiplicative functions **[MEMORY]** | multiplicativity of the function, plus an almost-all conclusion | **No** on both. The comb's indicator is not multiplicative, and the corpus has priced the almost-all currency at exponent 0 (`sift-limit-attack.md` §7e, item 2) | dead on arrival |
| Tao's entropy decrement **[corpus, import-entropy-decrement.md 2026-08-27]** | a logarithmically averaged multiplicative function on the unstructured side of the pretentious dichotomy | **No.** The census is the two-point correlation of a Dirichlet character, hence structured; the branch that circumvents parity is unavailable by hypothesis | landed, no transfer |
| Helfgott, parity for cubic forms **[MEMORY]** | a factorisation of polynomial values giving Type II sums | **No.** Same polynomial precondition as row 2 | dead on arrival |
| Bombieri's asymptotic sieve, and Ford's delimitation of it **[SOURCED-BIB]** | Type I information at every level below 1, and the conclusion is that this alone cannot give a prime asymptotic | not applicable, and it argues the other way | not a route |
| Harman's sieve at kappa = 2 with no arithmetic input **[MEMORY for the method; corpus for the price]** | Type I and Type II sums. Type I sums *are* divisor-class data, so a Harman sieve with Type I only is inside the corpus's DP1 class | **Floored.** Any method reading only `|A_d|` is bounded below by the LP floor 3.3152 (`lp-push-x43.md`, 33 readings to x = 43) | not a route below 3.3152 |

**The equivariance check, applied to every row above.** The wall address banked
on 2026-08-27 (`import-boolean-analysis.md`, `IMPORT-MAP.md` row 15) is that the
rotation ensemble's translation group acts transitively on its phases, so no
conclusion stated as a measure or a norm localises at the anchor. Every
ingredient in the table produces exactly such a conclusion: an asymptotic for a
sum over a range, or an almost-all statement. The Z2 certificate must hold at
**every** anchor. So even a granted parity break would land on the wrong side of
the same quantifier that §3 prices at `C^{pi(z)}`, and the two walls are the
same wall seen from two conventions.

---

## 6. The angle table

Twenty-one angles examined. Nineteen dead on arrival. Two survive, and neither is
a route: one is an owning-convention row, one is an unresolved hypothesis with
two walls behind it.

| # | angle | what it bounds in its own convention | translation to G2(x#) or Z2 | circularity | why it lives or dies |
|---|---|---|---|---|---|
| 1 | a new kappa = 2 lower-bound sieve construction | beta_2 | exponent `beta_2/theta` directly | CLEAN | **dead.** Nothing in print below 4.26645, three calibrated channels, §2; `REFUTED.md` "improving beta_2 itself" |
| 2 | Li arXiv:2504.07974, Buchstab variants at kappa > 1 | `F_kappa`, `f_kappa` inequalities | 3.83e-4 of exponent | CLEAN | **dead.** Already read in full and closed, `scope-fractional-retention.md`; alpha_2 > beta_2 + 1 empties half the family |
| 3 | Li arXiv:2405.05727, Chen plus Harman plus new levels | `D_{1,2}(N) >= 1.9728 ...` | none: needs primes | TPC-STRENGTH at the target | **dead.** A constant in a prime lower bound; no sieve function moves |
| 4 | Li arXiv:2602.20917, Harman-sieve levels to x^{17/32} | level for primes in progressions | none: the input is prime distribution, not comb discrepancy | CLEAN | **dead.** Wrong object; §5 last row prices the Harman route at 3.3152 |
| 5 | Johnston BAMS 2026, explicit sieve results | almost-prime counts, explicit | none | CLEAN | **dead.** Linear sieve; no beta_kappa |
| 6 | Johnston arXiv:2510.10853, effective BV for sifting | effectivity of any BV-style sifting result | none: our remainder is not a BV error term | CLEAN | **dead.** Effectivity is not a dial here |
| 7 | Ha-Hoang-Ngo, least P_2 in a progression | least almost-prime | none | CLEAN | **dead.** kappa = 1 application |
| 8 | arXiv:2602.08286, Sun's conjecture | almost-primes in `x^2+ny^2` | none | CLEAN | **dead.** Application of Richert's weighted sieve |
| 9 | Franze's Lambda^2 Lambda^- at kappa = 2 | 4.516 | worse than incumbent | CLEAN | **dead.** `SEARCH-CONVENTIONS.md` §4 |
| 10 | Blight's refinements of Selberg's sieve | below 4.45 | worse | CLEAN | **dead.** Same row |
| 11 | Brady's iteration rules | 3.11582 to 3.11549 at kappa = 3/2 | none at kappa = 2 | CLEAN | **dead.** alpha >= beta + 1 for kappa >= 2 |
| 12 | Ramare, long kappa-tuples | `Omega` of a product of shifts | none | CLEAN | **dead.** Different statistic |
| 13 | a kappa = 2 extremal example blocking (2, 4.2665] | a lower bound on beta_2 | would close the band as a truth gap | CLEAN | **absent.** None found, owning convention of §2; the band stays a proof gap |
| 14 | **Pomykala 1990, trilinear R-term at kappa > 1** | `Delta = MNK^{beta-2}`, requires `2 < beta < 3` | `theta > 1` at kappa = 2, hence exponent `4.26645/theta` | CLEAN | **not dead on arrival, and almost certainly dead.** `beta < 3` excludes `beta_2 = 4.26645`; behind it Bettin-Chandee's position-uniform price and the smoothness wall. §4 |
| 15 | Pomykala 1989 and Schochat 1989 | bilinear remainder at `kappa < 1` | none | CLEAN | **dead.** Below our dimension |
| 16 | Friedlander-Iwaniec asymptotic sieve | primes in thin sequences under a bilinear axiom | none | CLEAN as an instrument | **dead.** Product measure, no coefficient cancellation; and no primes in the comb |
| 17 | Maynard restricted digits, Harman plus decorrelation | primes with a missing digit | none | CLEAN as an instrument | **dead.** The comb's spectrum sits on the major arcs; decorrelation is exactly what fails |
| 18 | Green-Tao-Ziegler | linear systems of finite complexity | none | CLEAN | **dead.** Twin pattern is outside the class |
| 19 | bounded gaps, Zhang and Maynard and Polymath | `m` primes in a bounded window | none | CLEAN | **dead.** Breaks no parity |
| 20 | Matomaki-Radziwill, Tao entropy decrement, Helfgott | short-interval and logarithmic-average statements about multiplicative functions | none | CLEAN | **dead.** Multiplicativity absent; entropy row landed 08-27 with no transfer |
| 21 | **the owning-convention row for the sieve's own bilinear remainder** | not a theorem: a search wording | reaches Pomykala, which rows 34 and 49 of `SEARCH-CONVENTIONS.md` §1 both miss | CLEAN | **lives as a row, not a route.** §4.3 |

**Exponent implication, summed.** Zero. No angle above moves `log_x G2` from
4.26645 in either direction, and angle 14, if its hypothesis were relaxed and
both walls behind it fell, would move the dial to `4.26645/theta` for a `theta`
nobody has bounded at every position.

---

## 7. What would falsify this, and whether that check has run

**Falsifier 1: a paper stating a kappa = 2 sifting limit below 4.26645.** It
would falsify §2 and `REFUTED.md`'s "improving beta_2 itself" row at once. The
check that has run is the exact-phrase sweep plus two forward citation graphs on
three calibrated channels. **The check that has not run is the arXiv full-text
leg** (API 503 all session) **and the Semantic Scholar citation graph** (429 on
first call, not retried). A paper that never writes the phrase *sifting limit* in
its abstract and is cited by neither the DH book nor Franze would be invisible to
this sweep. That is a real hole and it is the same hole that hid A144311 for five
waves.

**Falsifier 2: Pomykala's `beta < 3` turning out to be removable.** It would
promote angle 14 from an anchor to a candidate, though not past the two walls of
§4.2. **This check has not run**: only Greaves's review was read, not the
announcement, and the announcement itself was not located in full text this
session. Reading Bull. Polish Acad. Sci. Math. 38 (1990) 167-171 is the cheapest
next move in this note and it was not made.

**Falsifier 3: a position-uniform bound on the comb's remainder at level
`H^theta` with `theta > 1`.** It would move the exponent to `4.26645/theta`
directly and is the only falsifier here that would change a number. The check
that has run is `sift-limit-attack.md` §7e's nine-level extension, which measures
the price of removing the position quantifier at `C^{pi(z)}` with `u_sup` rising
at all eight steps, plus the basis-independence check in the `(h,m)` basis. That
is a measurement of a specific instrument's failure, **not a proof that no such
bound exists**, and nothing in this note strengthens it.

**Falsifier 4: a parity ingredient whose precondition the comb does supply.**
§5's table asserts a structural failure for each of ten ingredients. Two of those
rows, Green-Tao-Ziegler and Heath-Brown, are **[MEMORY]** and were not read at
source this session; the corpus's own rule is that a **[MEMORY]** row cannot
carry a negative on its own. Those two rows should be read before anyone quotes
them as closed.

**Falsifier 5: the framing claim of §0 item 5, that parity is not the G2
obstruction.** It rests on the observation that G2's definition contains no
primes, together with the DP1 LP floor of 3.3152. **The LP floor check has run**
(`lp-push-x43.js`, 33 readings to x = 43, all clearing `(1+beta_2)/2 = 2.6332`,
tightest 2.6692 at x = 19). The framing claim itself is an argument, not a
theorem, and has had no adversarial pass.
