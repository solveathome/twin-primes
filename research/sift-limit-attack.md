# The sift-limit attack: where the dimension-2 sieve discards our structure

<!-- ledger
id: Q-sift-limit-discards
status: PARTIAL
todo: none
question: Where does the dimension-2 sieve discard our structure, and can any of it re-enter to beat beta2 = 4.2665?
verdict: Every asset checked against the five discard points has no known consumer and no entry point, and EH and GRH change nothing here; Lemma V's mean-square form is PROVED and hands back a sup bound, the strata are self-similar and it still does not close, L has no combination law of its own, and the 529 covering route is closed rather than unfinished.
-->

*(2026-08-14. Companion computation: `research/sift-limit-attack.js`. Legend
as in `research/covering-dive.md`: **[PROVEN]** published theorem with source;
**[VERIFIED]** checked computationally in this repository; **[MEASURED]**
empirical, finite range; **[CONJ]** published conjecture; **[ABSENT]** we
searched and found nothing; **[INFERRED]** our deduction from sourced facts.)*

**The question.** `paper/beta2-note.md` proves G₂(n) ≪_ε pₙ^{β₂+ε} with
β₂ = 4.26645028414864191641 (Booker and Browning's rigorous truncation), by
running the Diamond-Halberstam Theorem 9.1 lower-bound sieve at dimension
κ = 2 on A = {r(r+2) : x < r ≤ x+H}. The finish line is known: a two-class
exponent below 2 implies the twin prime conjecture through crystallization
and the p² rule, and any exponent below 4.2665 would be, per our audit, a
new theorem. This file walks the sieve's proof skeleton and marks every step
where the method keeps only its axioms and throws the rest of our set away;
checks each piece of our proven structure against those discard points;
inventories the refinement literature; and reports the one route that consumes
any structure we own, with its first computation and its price.

**The answer, compressed.** The sieve is a positivity certificate priced on
one-point data alone: divisor-class counts |A_d|. Everything we have proven
about the natal tile beyond those counts (exact J₅, the sub-Poisson σ-plateau, the mod-30 five-lag rigidity, the mirror, the fusion) is quotiented
away before the argument begins, and no published sieve refinement re-admits any input of that type (searched as tabled in `SEARCH-CONVENTIONS.md` §3).
That negative is in sieve-theory vocabulary and §1 carries no owning-convention
row for the object, so read it as the reach of our search rather than as a
calibrated absence. The one piece the existing machinery can consume is
the coarsest: the two-class condition is a product of two one-class
conditions, and the Brüdern-Fouvry vector sieve converts exactly that into
two linear sieves whose joint positivity threshold is 1+√e = 2.6487 per
component level. Run unconditionally the component levels couple
(D₁D₂ ≤ H) and the route lands at 2(1+√e) = 5.2974, worse than 4.2665, which
is why it is absent from this problem's record. Decoupling the levels needs
one new lemma: signed cancellation of the bilinear interval remainder,
uniformly in window position, the two-dimensional analog of Iwaniec's 1980
error term in the linear sieve. Our pilot measures that cancellation and
finds it strong at toy scale, including exhaustively over full periods.

**And its price, measured.** The route is an exponent-improvement programme,
not a road to TPC. `research/theta-ladder.md` measures the window exponent
theta at which the certificate is positive at EVERY position. Measured
self-consistently, that requirement sits INSIDE the zone budget at every
exactly-measured level (need/z² = 0.3550..0.6119 at z = 13..31, all exact) and
leaves it in (31, 47] — at z = 47, min T = 0 inside a 4·10⁹ prefix at
H = 1.041 z² (`research/history/staging/theta-selfconsistent.md`); the
certificate is positive at every one of the 223,092,870 positions at
H = 0.46 z².
What retires the route as a road to TPC is the maximal law itself: the sharp
Gaussian maximal law for the sawtooth is TPC-implying, so no weak form is both
soft-provable and sufficient
(`research/history/staging/phase1-T4-maximal-law.md`). Under the **unproven**
Gaussian maximal law the conditional column reads 2.159 to 2.482 across
z = 19 to 47, still rising, and the working point there has s/u = 1.62–1.72,
**outside the range s ≤ u that Lemma V is stated in** (§4.5). So the theta column is not the
statement "Lemma V suffices"; it is the statement that the actual sawtooth,
if it obeys a maximal law we cannot prove, is smaller than Lemma V's stated
range would need. **This file is the home and the authority for that
distinction: Lemma V is NOT the operative assumption at the measured working
point, and the Gaussian maximal law is.** Scope rider (2026-08-20 night):
that verdict is TPC-specific. At the β₂ target — the ρ maximal law's F2 form —
the delivered exponents u ∈ (3, β₂) put s/u = 3/u ∈ (0.703, 1), INSIDE the
stated range above, so the working point re-enters Lemma-V territory there;
what re-enters is the ASK (the 0.1787-of-θ_total frontier gap), not an import
route, since the fixed-smooth-profile obstruction binds at the β₂ point
exactly as here (`research/history/staging/rho-maximal-law.md` §5;
`research/history/staging/redteam-0820-night-empirical.md` §T2.e). The whole price of the route is that
one maximal inequality.

---

## 1. The certificate view of Theorem 9.1: five discard points

The pipeline (verified in `research/dhr-verification.md` and since against
the book): encode A as counts |A_d| = (ω(d)/d)X + r_d; assume the one-sided
density envelope Ω(κ,L); build sieve weights by truncated Buchstab
iteration; bound the truncation loss by the delay-differential system
defining (F_κ, f_κ); absorb remainders through 2Σ_{m<y} 4^{ν(m)}|r_m|. Each
stage discards something specific.

**DP1, the encoding.** From the first line the sieve sees only the vector
(|A_d|)_{d|P(z)}: how many elements sit in each divisor class. Positions of
elements relative to EACH OTHER never enter. Pair counts of the sifted set
(our J₅), the spectrum |S(j)|², window variance, mirror, fusion: none is
expressible as a function of the |A_d|, so none can be consumed by any
theorem whose hypotheses are the standard axioms. This is the master
discard; DP2 through DP4 are its refinements.

**DP2, the density envelope.** Ω(κ,L) is a one-sided inequality and the DHR
functions are extremal against adversarial saturation of it at every scale.
For us this discard is nearly free: ω(p) = 2 exactly, and Mertens makes the
envelope tight up to the constant L. The adversary's real freedom lives in
DP3, not here.

**DP3, positivity-only truncation.** The Buchstab recursion
S(A,z) = S(A,z₁) − Σ_{z₁≤p<z} S(A_p,p) is truncated, and every discarded
stratum S(A_m,p) is priced at its worst case: 0 from below, the envelope
from above. This is where the dimension-2 price is actually paid; β₂ is the
point where the accumulated worst-case losses swallow the main term (DH book
p. 79: below β₂ "Theorem 9.1 yields only the trivial lower bound"). For our
A every discarded stratum is itself a two-class interval sift at a smaller
scale (the tile's self-similarity: the strata are dilated kill images), in
principle exactly computable. No published sieve re-inserts exact strata (§4.6; the reach of that search is tabled in `SEARCH-CONVENTIONS.md` §3).

**DP4, remainder absolute values.** The remainder enters as
2Σ4^{ν(m)}|r_m|: all sign structure of r_m is discarded. For our interval
problem this discard costs nothing: |r_d| ≤ 2^{ν(d)} trivially, so the level
is H^{1−ε} for free, uniformly in the window position. Every distributional
input in the literature (Bombieri-Vinogradov, Elliott-Halberstam, GRH,
bilinear remainder hypotheses) enters the sieve here and only here. Our
problem arrives with this slot already saturated; that single fact decides
§5.

**DP5, the method is not the wall.** β₂ = 4.2665 is the best certificate
price achieved by known methods, not a proven property of the axiom class.
This is a literature fact, not our hope; §2 documents it.

## 2. Is 4.2665 information-theoretic? The extremal question at κ = 2

What is proven, from Kevin Ford's 2023 sieve lecture notes (§3.1, Definition
2 and the surrounding text, read from the PDF): **[PROVEN]**

> "The exact value of β(κ) is known only for κ ∈ [0, 1/2] ∪ {1}, in these
> cases β(κ) = 1 for κ ⩽ 1/2 and β(1) = 2. ... The lower bound β(1) ⩾ 2 is
> clear from Selberg's examples in Section 1.7.4. ... The exact value of
> β(κ) is unknown in all cases κ > 1/2 except for κ = 1."

with his Table 1 listing β(2) ≤ **4.266** (the DHR value our theorem uses; we
round it to 4.2665 elsewhere, which `dhr-verification.md` §1 blesses, but the
digits may not be attributed to Franze — his table prints three decimals.
Corrected 2026-08-18, PDF read). At
κ = 1 the extremizers are Selberg's Liouville sets A± = {n ≤ x : λ(n) = ±1}:
full level x^{1−o(1)}, correct linear density, S(A+, √x) = 1. Nothing
analogous is in print at κ = 2: our searches (Selberg's Lectures via
Franze's account, the DHR book's Ch. 17 apparatus, Ford's notes) found
upper-bound technology only. **[ABSENT for the EXAMPLE, now calibrated:
Halberstam, *Bull. AMS* 40 (2003) p. 117, says such examples at κ ≠ 1/2, 1
"are not known and greatly to be desired". NOT absent for LOWER BOUNDS on
β_κ: that reading was a convention failure, corrected 2026-09-04. Selberg's
§17 "Some upper bounds for sifting limits" states lower bounds on β_κ in his
reciprocal convention a_k = 1/β_κ (Ford 2023 p. 37), and Brady 2017 Theorem
22 gives β₂ ≥ 3e^{−1/2} = 1.8196; `SEARCH-CONVENTIONS.md` §1 now carries the
row; `history/staging/recon-0904-sifting-limit-floor.md`,
`redteam-0904-sifting-limit.md`]** Franze (C. S. Franze, *Sifting limits
for the Λ²Λ⁻ sieve*, J. Number Theory **131** (2011), no. 10, **1962–1982**,
[arXiv:1012.3809](https://arxiv.org/abs/1012.3809); read from
the PDF) computes the competing Λ²Λ⁻ limit 4.516 at κ = 2 and records
Selberg's asymptotic β_κ ≲ 2κ + 19/36, "approached rapidly from below" (which
describes his own Λ²Λ⁻ table, not the truth; his TeX carries a ≳ at one
line that contradicts his ≲ elsewhere, an apparent typo; and he prints
β_κ ≲ 2.44κ for the DHR sieves). The earlier reading here, "two independent
technologies plateau near 2κ, the community's implicit guess for the
axiom-class truth at integer κ", holds at small κ only: the DHR table's
β_κ − 2κ grows to 6.45 at κ = 15, so the inference does not generalise
(corrected 2026-09-04, `history/staging/recon-0904-sifting-limit-floor.md`).
**[PROVEN values; the plateau reading is INFERRED and small-κ only]**

Two sketches of what a κ = 2 extremizer would have to look like, both ours:
**[INFERRED, flagged]**

- *Product example, half level.* B = {nm : n, m ≤ x, λ(n) = λ(m) = 1}: two
  dimensional densities, and for u < 4 survivors are forced into
  n, m ∈ {1} ∪ {primes with λ = +1}, so S ≈ 0. But its verifiable level is
  only ≈ X^{1/2} = z^{u/2}, so it constrains sieves at half our level and
  does not touch the regime our theorem runs in.
- *Mixed-sign twin example, full level, conditional.* C = {n(n+2) :
  λ(n) = −1, λ(n+2) = +1}: for u < 2 a survivor needs n prime (λ = −1
  holds) and n+2 prime (λ = +1 fails), so S ≈ 0. Its axioms need two-point
  λ-equidistribution at full level: Chowla-strength, open. Conditionally it
  pins the full-level axiom limit at ≥ 2, the parity statement we already
  own, and nothing more.

**Reading.** No published example blocks any exponent in (2, 4.2665] even for axiom-only sieves at our (full) level (searched as §2 records, tabled in `SEARCH-CONVENTIONS.md` §3), and no published lower bound on β(2) exceeds 2 either. The best resting on a proved inequality is 3e^{−1/2} = 1.8196 from Brady 2017 Theorem 22 at d = 0, 1.8394 using his computed v₄ = 2; β(2) ≥ 2 follows from the one-sidedness of the dimension axiom and is the band's lower endpoint, not a point inside it (2026-09-04).
So the wall our theorem sits behind is methodological. Where extremizers are known (κ = 1) they are λ-weighted
sets whose pair correlations are conjecturally Poisson: the opposite end of
the pair-correlation range from our set, whose first five lags vanish
identically and whose spectral mass is O(2ⁿ) against the generic N². The
contrast is checkable and real, but §3 shows why it currently buys nothing
**inside the sieve**. A mechanism that eats two-point input does exist, and
**it is in print**, which settles the other way an absence attack D asserted and
then retired for want of a search: **Friedlander, *Math. Ann.* 267 (1984)
101–106 is the degree-2 member** — the second moment of the sifted count over
windows, converted to a gap-moment bound. Gorodetsky arXiv:2111.00853 is the
modern unconditional variance and Brady arXiv:2112.02722 casts the pair
correlation as an SDP with no gap output; `k ≥ 3` remains unresolved in the
literature. Found 2026-08-18 and priced the same day: the sharp degree-`k` Boole-Fréchet bound on
the count of empty windows takes the survivor density and the pair correlation of
the SIFTED set and concludes at every position. It certifies the exact truth at
`x = 5` and degrades from `x = 7` on, over-certifying by `1.0, 3.8, 9.3, 34.2,
175.0, 783.7` across `x = 5..19` with log-log slope `+5.20`. **The price of
stopping at two-point data is not a constant factor, it grows as a power of `x`**
(`research/attack-D-twopoint.js`,
`history/staging/attack-DP1-mechanism.md`).

## 3. Our exact structure against the discard map

| Our asset (status) | Discard point it hits | Known consumer | Verdict |
|---|---|---|---|
| Exact J₅ pair correlation, ρ₃₀ = 2/1/0 comb (**PROVEN**, `natal5-variance.js`) | DP1 | second-moment (Chebyshev) arguments only | funds the ensemble economy at k = 2; invisible to every sieve |
| Hyperuniform plateau, exact spectral mass, level law ×3 per fold (**PROVEN/VERIFIED**, cap-29) | DP1 | none in sieve literature | same; see the moment arithmetic below |
| Mod-30 rigidity: lags 1..5 vanish; the exact −1/2 (**PROVEN**, cap-26) | DP1 | none | sharpens ensemble constants; no sieve entry |
| Mirror symmetry, T(k) real (**PROVEN**, cap-19) | DP1 | none | halves computations; no sieve entry |
| Fusion / anchored calm — **PROVEN**: Mirror-Sibling Identity, Fusion Identity, Mirror-Phase Doubling, Minus-Half, Skeleton Collapse; **CERTIFIED at six levels** (@11..@29, exact integer inequality): Aggregate 30-Skeleton Bound; **MEASURED**: Anchored Typicality. Status table: `research/anchored-calm.md` | DP1 | none | statement about one position; G₂ is a worst-position problem |
| Two-class = product of two one-class systems (**structural, exact**) | DP1, coarsest layer | **vector sieve** (Brüdern-Fouvry) | the one route with a consumer: §4.5. Buys an exponent, not TPC |
| Trivial remainders at level H^{1−ε}, uniform in x (**PROVEN**, beta2-note §3) | DP4 | already consumed by our theorem | saturated; blocks all conditional improvement (§5) |
| Self-similar strata / kill image (**PROVEN**, Redundancy Lemma) | DP3 | none ("Buchstab with exact strata" does not exist) | no known mechanism; not provably useless |

**The two economies, and the moment arithmetic.** Every known approach falls
into one of two certificate economies. The sieve economy proves positivity
at EVERY window position from one-point data, price β₂. The ensemble economy
proves positivity at ALMOST ALL positions from k-point data: Chebyshev with
our exact variance and the measured sub-Poisson Fano factors (0.15 to 0.35,
`natal5-variance.js`) certifies typical gaps at the c·ln² scale, the right
order for the measured G₂ law. Upgrading almost-all to all positions by
moments alone needs the k-th moment at k ≳ 2·ln W / ln(δl) ≈ 2pₙ/(u·ln pₙ):
correlation functions of unbounded order, the regime where the campaign's
Bonferroni depth K* = 0, 0, 2, 10 escalates (attack 8). If a sub-Gaussian
maximal law held for window counts, the crossover δl ≈ σ√(2 ln W) would give
G₂ ≲ (2F/0.41621)·pₙ·ln²pₙ, within a factor of about two of the measured
range, where the direct ratio G₂/(x ln²x) wobbles between 0.66 and 1.13 with
no trend, mean 0.89. That is a description of the accessible range and not an
asymptotic law: the law is c(x, lnD)·m̄·lnD with c a surface rather than a
constant, and the control-corrected growth exponent is **1.50** central on
the 22 trusted terms (h₂'s control figure 1.57), bracket 1.3 to 1.8, floor 1
(`research/exponent-control.md` §5, `research/maxgap-law.md` §1). **[INFERRED heuristic arithmetic]** We flag honestly: that
maximal law quantifies over the same all-positions tail as the anchored
escape, which `natal5-variance.js` reading 6 proves no ensemble statement
can close; it is the parity wall in concentration clothing, not a route.
One more honest negative: at full-tile scales the plateau's level law
(spectral mass ×3 per fold, cap-29) makes σ superpolynomial in pₙ, so the
ensemble economy is confined to short windows; it loses to the sieve
asymptotically even before the max step.

## 4. The refinement inventory: what consumes what

**4.1 Bombieri's asymptotic sieve; Friedlander-Iwaniec's asymptotic sieve
for primes.** Input: remainder control at level x^{1−ε} (Bombieri), plus a
bilinear-form hypothesis whose sign cancellations carry parity information
(FI, Annals 148 (1998); the x²+y⁴ theorem). Both are DP4 inputs. Our DP4 is
already saturated free of charge, and what these sieves buy (detecting
primes inside a sifted sequence, breaking the parity factor 2) is not our
bottleneck at 4.2665. Verdict: the precedent for §4.5 (structure beyond the
axioms, inserted at the remainder, breaks a "limit" of the axiom class), but
no direct application. **[PROVEN facts; verdict INFERRED]**

**4.2 Weighted sieves.** Richert's weights, DHR Theorem 11.1, Chen's
switching, through Lichtman's 2025 refereed record π₂(x) ≲ 3.29956·Π(x)
(preprints ahead: Lichtman arXiv:2309.08522 at 3.2290, Pascadi
arXiv:2505.00653 at 3.203+o(1); `history/staging/lemmaV-neighbours.md`): all convert
sieve slack into almost-primality of survivors, and the sub-8 constants all
consume progressions-averaged inputs unavailable uniformly in window
position (`natal-cap-10-sieve-cap.md` §1.4). G₂ has no almost-prime slack to
spend: membership demands zero factors below pₙ, so weights tolerating a
stray mid-range factor certify the wrong set. Verdict: no entry point.
**[PROVEN ingredients; verdict INFERRED]**

**4.3 GPY / Maynard-Tao.** Consumes level of distribution of primes to
detect primes in tuples: a lower-bound device, not an upper bound for gaps
of a sifted set, and its Selberg weights are again functionals of
|A_d|-type data. Verdict: different problem. **[INFERRED, standard]**

**4.4 FKMPT long-gap machinery** (Ford-Konyagin-Maynard-Pomerance-Tao,
*Long gaps in sieved sets*, JEMS 23 (2021) 667-700, Corrigendum JEMS 25 (2023)
2483-2485, arXiv:1802.07604 v4)**.** Their own Remark 7 states the
one-dimensionality restriction and that the two-class case falls back to the
pigeonhole log²X bound (verified verbatim in `research/covering-dive.md`
§2.3). Lower-bound side only. Verdict: no.

**4.5 The vector sieve: the one route with a consumer.** Brüdern and Fouvry (Le crible
à vecteurs, Compositio Math. 102 (1996) 337-355) sift the pair (n, n+2)
through the product of two one-dimensional indicators. Pointwise, if Λᵢ±
are linear-sieve majorant/minorant sums with Λ⁻ ≤ θ ≤ Λ⁺, then

  θ₁(r)·θ₂(r+2) ≥ Λ₁⁻(r)Λ₂⁺(r+2) + Λ₁⁺(r)Λ₂⁻(r+2) − Λ₁⁺(r)Λ₂⁺(r+2)

(expand (Λ₁⁺−θ₁)(Λ₂⁺−θ₂) ≥ 0 and replace θ by Λ⁻ where it lowers the right
side; Λ⁺ ≥ θ ≥ 0 pointwise makes each replacement valid). Summing over the
window and evaluating each factor by the linear sieve (F(s) = 2e^γ/s on
[1,3], f(s) = 2e^γ·ln(s−1)/s on [2,4], so f/F = ln(s−1)), the main term is
positive when ln(s₁−1) + ln(s₂−1) > 1, with sᵢ the component level
exponents. Two regimes: **[INFERRED from standard machinery; the
optimization is ours]**

- *Coupled (unconditional).* Absolute-value remainder accounting forces
  D₁D₂ ≤ H^{1−ε}, so s₁ = s₂ = u/2 and positivity needs
  u > 2(1+√e) = 5.2974: WORSE than β₂ = 4.2665.
  **Two corrections, 2026-08-18, from reading Brüdern–Fouvry's own PDF (§7b).**
  (i) The break-even is **1.2090, not 1.2417.** Parametrising by
  `ln(s₁−1) + ln(s₂−1) > 1` varies *component* asymmetry, but the asymmetry
  that pays here is **upper-level against lower-level**: the threshold is
  `u > (1+e^{b/2a})/b`, whose optimum is `5.158065/θ_total`, so the break-even
  is `5.158065/4.26645 = 1.2090`. Every appearance of 1.2417 in this file and
  in briefs derived from it was that much too pessimistic.
  (ii) *"This is why the vector sieve does not appear in the two-class gap
  problem: run on axioms alone it loses to DHR"* is the **wrong reason** and is
  withdrawn. **Brüdern and Fouvry never ran it coupled.** The coupled figure is
  ours, computed here; their absence from this problem needs a different
  explanation, and §7b gives it.
- *Decoupled (the target).* If each component separately carries level
  ≈ H^{1−ε} (θ_total = 2), positivity holds at u > 1+√e + ε = 2.649: an
  exponent decrement of 1.62 below β₂, landing safely above the
  TPC-equivalent line at 2.

The price is exactly one lemma.

> **Lemma V (needed, not proven).** Let z ≥ 2, H = z^u, D = z^s, and let
> λ± be the Rosser-Iwaniec linear-sieve weights of level D for the systems
> {r ≡ 0 mod p} and {r ≡ −2 mod p}, p < z. Then for every x,
> Σ_{d₁,d₂ ≤ D; d₁,d₂ | P(z)} λ^{a}_{d₁} λ^{b}_{d₂} · r_{d₁,d₂}(x)
> ≪ H/log³H for each (a,b) ∈ {(−,+),(+,−),(+,+)}, where r_{d₁,d₂}(x) is
> the interval remainder of the joint congruence class (a pure lattice
> sawtooth, no arithmetic function in it), in some range s ≥ (0.63+δ)·u
> (θ_total ≥ 1.25) up to s = u − ε.

**Where the working point actually sits, and it is outside that range.** With
D₁ = D₂ = z^s and H = z^u the product level is θ_total = 2s/u, so the family
`research/theta-ladder.md` runs at (s = 3.0, u = theta ≈ 2.16 to 2.48) has
θ_total = 6/theta ≈ 2.4 to 2.8, i.e. ABOVE full decoupling: the component
level D = z³ exceeds the window. That means s/u ≈ 1.2 to 1.25 > 1, outside
Lemma V's stated s ≥ (0.63+δ)u up to s = u − ε. What is being assumed there
is not Lemma V but a Gaussian maximal law for the sawtooth, which §3 already
names as the parity wall in concentration clothing. Both halves of the route,
the exponent and the maximal law, are therefore not independent: the maximal
law is the whole cost, and the exponent only prices the goods.

The lemma itself is classical territory: the two-dimensional analog of Iwaniec's
refined error analysis of the linear sieve (Acta Arith. 37 (1980) 307-320;
his Acta Arith. 1971 Theorem 2 is, per Granville's account, the engine of
the one-class Jacobsthal bound at u near 2, uniformly in position). Brüdern
and Fouvry inserted Deshouillers-Iwaniec Kloosterman bounds into exactly
this kind of bilinear remainder. **What does not exist in print is a
NONTRIVIAL position-uniform version, and that is a price rather than an absence
— corrected 2026-08-19 when the object was finally searched in the convention
that owns it, "bilinear/trilinear forms with Kloosterman fractions".** The
remainder reduces, verified exactly in BigInt over 2655 pairs, to a trilinear
form with Kloosterman fractions times a single window factor `e(−hx/(d₁d₂))`,
and the trilinear theorem rather than the bilinear one is the instrument
because the `h`-sum is free. In our configuration
(`M = H^{0.5}`, `N = H^{0.712157}`, `A = H^{0.212157}`) the published estimates
read `γ = 1.009638` for Duke–Friedlander–Iwaniec 1997, **worse than trivial**
because our level split `b/a = 1.4243` exceeds their `6/5` threshold, and
`γ = 0.970624` for Bettin–Chandee 2015, against a needed `0.824975`. In
`θ_total` currency that is `1.030303` against a needed `1.208983`, and the route
returns exponent **5.090707**, worse than `β₂`. Position-uniformity is priced by
the source itself: Bettin–Chandee's Remark 1 admits our window phase and charges
`(1+hx/MN)^{1/2}`, which is `O(1)` only for `x ≪ H^{1.212157}` while our `x`
reaches `exp(H^{0.2344})` — so the exponent gap is technical and the uniformity
gap is structural and larger. `history/staging/attack-sqrt-cancellation.md`;
tabled in `SEARCH-CONVENTIONS.md` §§1, 3. Parity does not forbid it: the target 2.649
sits above 2, and the conditional κ = 2 extremizer of §2 constrains
axiom-level inputs, not this explicit exponential-sum estimate about the
fixed lattice of divisor pairs.

**The pilot (run today, `research/sift-limit-attack.js`).** We built the
actual Rosser supports, machine-verified the sandwich Λ⁻ ≤ θ ≤ Λ⁺ at every
integer scanned, and measured the certificate
T(x) = Σ_{window} [Λ⁻Λ⁺ + Λ⁺Λ⁻ − Λ⁺Λ⁺] directly. **[VERIFIED /
MEASURED]**

| z | u | s | scan | min T | positions with T ≤ 0 |
|---|---|---|---|---|---|
| 20 | 2.8 | 2.6 | EXHAUSTIVE, all 9,699,690 x of the p<20 period | **107** | 0 |
| 20 | 2.2 | 2.6 | EXHAUSTIVE, same period | **8** | 0 |
| 13/17/19 | 2.8 | 2.6 | exhaustive full periods 2310 / 30030 / 510510 | 50 / 103 / 112 | 0 |
| 50 | 2.8 | 1.4 | sampled 8·10⁶ x (coupled control, D² = H) | −11,277 | ALL |
| 50 | 2.8 | 2.6 | sampled 8·10⁶ x (decoupled) | 785 | 0 |
| 100 | 2.8 / 2.2 / 1.8 | 2.6 | sampled 8·10⁶ x | 4326 / 218 / 13 | 0 |

The coupled control reproduces the classical verdict (uniformly negative at
u = 2.8, as dimension-2 theory demands). Decoupled, the certificate is
positive at every position scanned, and for z ≤ 20 the scan is the complete
period: a finite worst-case verification that the p<20 tile carries a valid
two-class window certificate at exponent 2.2, below β₂/2 and below the
Ziller-Morack conjectural p² ceiling, at toy scale. The exact-supremum ladder
of `research/theta-ladder.md` §5b prices that row properly: measured
self-consistently, the true all-positions requirement reads need/z² = 0.5485,
0.4877, 0.4637 at z = 19, 23, 29, inside the zone budget at every
exactly-measured level. The signed deviation of T across
positions scales like (term count)^γ with γ = 0.23..0.33 measured;
absolute-value accounting is γ = 1, square-root cancellation γ = 0.5.
Honest limits: toy z cannot resolve the asymptotic threshold 1+√e
(finite-size terms dominate); the z ≥ 30 scans sample a sliver of their
periods, so worst-case completeness holds only at z ≤ 20; and we do not
extrapolate the u = 1.8 row, which as a law would assert G₂ ≪ pₙ^{1.8},
beyond anything we believe provable. What the pilot establishes is narrower
and real: the signed bilinear remainder is not the immediate killer that
absolute-value accounting says it is, at any scale we can check completely.

**4.6 What has no consumer at all.** J₅, the plateau, the rigidity, the
mirror, the fusion: the entry for any of these would be a sieve whose
hypotheses include two-point or spectral data and whose conclusion prices
truncation below the DHR worst case. No such framework exists in the
literature we searched (asymptotic sieves take remainder data, weighted
sieves take almost-primality slack, the vector sieve takes product
structure). Physics documents the phenomenon on the prime side (Torquato,
Zhang, de Courcy-Ireland: primes as effectively limit-periodic hyperuniform
point sets, J. Phys. A 52 (2019) 135002, conditional on Hardy-Littlewood)
with no arithmetic consequence drawn. Honest classification for all five
assets: no known mechanism, not provably useless. Where each would have to
enter: DP3, as exact pricing of the truncation strata; the missing lemma
class is "Buchstab iteration with exact low strata", which would need the
self-similar stratum values (we have them) and a way to propagate exactness
through the recursion without reverting to worst case at the next depth
(nobody has that; "the literature we searched" above is sieve-side only, and is tabled in `SEARCH-CONVENTIONS.md` §3).

## 5. Conditional inputs: EH and GRH change nothing here

Elliott-Halberstam and GRH enter sieve arguments at DP4 (remainder level and
averaging). Our remainders are already trivially perfect: |r_d| ≤ 2^{ν(d)}
at every window position, level H^{1−ε} unconditionally. So under EH, under
GRH, or under both, the theorem of `paper/beta2-note.md` reruns verbatim and
stops at the same β₂ + ε: the binding constraint is the sifting limit, to
which distributional hypotheses contribute nothing. **[INFERRED from the
proof structure; standard]** We searched for any published conditional upper
bound on a two-class Jacobsthal-type function below 4.2665: nothing exists
at any exponent, conditional or not (consistent with
`research/covering-dive.md` §2.2, and re-run 2026-08-18 in the convention that
owns the object — A144311's wording and MathOverflow 88323's "bounded number of
residue classes per prime" — rather than in ours). **[ABSENT]** For contrast, EH improves
the [1,x]-averaged twin COUNT constant to 2 (the 2/θ rule at θ = 1,
Lichtman's account), but that statement is not position-uniform and cannot
bound a gap. And at exponent 2 sits the TPC-equivalence: since even EH plus
GRH are not known to imply the twin prime conjecture, no standard
conditional input reaches 2 by any known argument. Calibration, stated as
sharply as we can: the entire distance from 4.2665 down to 2 is a
positivity-method problem and zero percent a distribution problem. Among
prime-constellation questions that is unusual, and it is the reason the only
visible road is a certificate that consumes structure (§4.5) rather than
better arithmetic inputs.

## 6. The map, the route, the first lemma

The discard map, one line per point: DP1 discards all inter-element
structure (J₅, plateau, rigidity, mirror, fusion die here; only the product
structure survives, into the vector sieve); DP2 discards density regularity
we barely need; DP3 discards the exact strata (the real dimension-2 price;
no consumer exists); DP4 discards remainder signs (free for us; the only
door conditional inputs know, and it is already open); DP5 is the reminder
that 4.2665 is a price tag, not a wall.

The single entry with a consumer: the vector sieve at partially decoupled
levels. It is the only mechanism in the literature that consumes any
structure our set actually has, its threshold arithmetic is checkable
(u > 2(1+√e)/θ_total), and its missing ingredient is one well-posed
estimate (Lemma V) with a κ = 1 precedent proven by Iwaniec in 1980 and a
Kloosterman toolbox already used on this exact sequence by Brüdern and
Fouvry. Any θ_total > **1.2090** is a new theorem (corrected from 1.2417, §4.5); full
decoupling gives 2.649.

**Priced honestly, it is an exponent programme and not a route to TPC.**
Conditional on an unproven maximal inequality for the sawtooth it currently
gives a two-class gap exponent of 2.48 at z = 47 against the unconditional
4.2665, which would be the first number in this repo below the
full-decoupling target 2.649. The margin below 2.649 is 0.17 and closing at
about 0.57 per unit ln z. The unconditional requirement, which owes nothing
to any maximal law, is above 2 from z = 29 on. Neither branch reaches the
Gap Reformulation's theta < 2, and even the win branch converts an open
exponent problem into an open maximal inequality over the same all-positions
quantifier that `natal5-variance.js` reading 6 shows no ensemble statement can
close. Full ladder, branches and costs: `research/theta-ladder.md` §§2, 7, 8.

First computation: the pilot above (exhaustive worst-case positivity through
the p<20 period at u = 2.2; cancellation exponent γ ≈ 0.3). The exponent
question is answered as far as laddering can answer it, so the remaining work
is the maximal law. First lemma to try, in order: (i) the mean-square-in-x version of
Lemma V by Parseval over the period: the position-average of the squared
signed remainder is a spectral sum over the divisor-pair lattice that the
factored-spectrum machinery of cap-02/cap-29 can evaluate exactly at small
levels and bound in general; it would give the almost-all form of the 2.649
exponent and locate exactly what a worst-position proof must beat.
(ii) the exact-supremum direction rather than more conditional rows, since
the true full-period supremum removes the conditionality entirely and is what
settled the theta question. (iii) The θ_total = 1.25 partial target, which
already beats 4.2665 and asks for four times less cancellation than full
decoupling.

Calibration of the whole file: nothing here moves the parity wall, nothing
here is a proof below 4.2665, and the one route with a consumer depends on an
estimate (Lemma V) that is not even the operative assumption at the measured
working point, where s/u > 1 puts the ladder outside Lemma V's stated range
and on an unproven maximal law instead; the pilot's signal is finite-range
evidence, not asymptotic evidence.
What the file settles is the geography: where each proven object would have
to enter, which doors are already open, which are walls, and which single
door has a key with a known shape.

## 7. The covering economy, priced (2026-08-18)

A third economy was tried, outside both the sieve and the ensemble: bound `G₂`
from the **covering** side, with no sieve at all. `research/attack-beta2-05-covering-prune.js`
runs it; the full write-up is `history/staging/attack-beta2-05-covering-pruning-bound.md`.
It is a closed negative with a number, which is the useful kind.

**First, a by-product worth more than the attack.** OEIS A144311's terms above
x = 43 were produced by a branch-and-bound whose pruning test is a **union bound
on the current residual**: if two-class sets cover `U`, then
`|U| ≤ Σ_q max_r |U ∩ C^q_r|`. That is **admissible** at every deeper state
because the residual only shrinks, so **the published terms to x = 79 are proven
maximal, not merely best-found**. Three independent confirmations: a faithful
port reproduces every term it reaches (n = 3..15, past this repo's own ladder);
the pruned optimum equals brute force over 8.35 million assignments at n ≤ 9;
zero violations across 104 prefixes. One detail makes the search exact rather
than merely sound — at the last prime the sum is empty, so the test degenerates
to `0 ≥ |U|` and a leaf is reachable only on a complete cover, which is why the
leaf code never re-checks coverage.

**Run backwards as an upper bound it is exactly sharp twice, then dies.**
Phase-free it gives `G₂(5#) ≤ 11` and `G₂(7#) ≤ 29` — the truth, by counting
alone. At x = 11 it gives 83 against 41. **From x = 13, nothing, ever.** The
whole content is `Σ_{5≤p≤x} 2/p < 1`, which crosses 1 between 0.8675 and 1.0214.
That is the Mertens wall, and this is the **sixth** independent arrival at it —
true as written, and incomplete. **Completed at the thirty-fourth pass:** on the
complete dependency graph the local lemma's EXACT criterion (Shearer, via
Scott–Sokal Example 3.1) *is* the union bound, so at that graph the wall is an
**identity** rather than one more coincidence of arrivals, and the exact
criterion is the **eighth** arrival
(`research/history/staging/import-shearer.md`, `research/OUTCOMES.md`
local-lemma row).

**The number.** The cheapest admissible repair is Bonferroni truncation, which is
Brun's pure sieve:

| x | 13 | 101 | 199 | 1009 | 10⁶ |
|---|---|---|---|---|---|
| `β_pure` | 2.80 | 3.98 | 4.25 | 5.38 | 8.88 |

It **beats 4.2665 for x ≤ 227**, loses from x = 229, never returns, and diverges
like `7.182·lnln x` (threshold `m₀/W → 3.5911`, the root of `a·ln(a/e) = 1`,
verified exactly to W = 1024). **Handling a head of primes below `x₀` exactly,
at a cost of `x₀#`, widens that window to `x ≤ 439`** — first loss 443, never
returning over 5972 further primes to x = 60000 — **and changes nothing
asymptotic**, because exactness costs `e^{θ(x₀)}` so the head reaches only
`x₀ = O(ln x)` and removes just `lnlnln x` of the `lnln x` Mertens mass that
sets the Bonferroni depth (Theorem HY, `research/attack-hybrid-bound.js`,
`history/staging/attack-hybrid-bound.md`). At the crossover that is a factor
1.27 in a bound sitting 6.8 orders of magnitude above the measured law, so it is
a record-keeping improvement rather than a route. So the covering economy is a small-x instrument,
not an asymptotic one, and the reason is measurable: the main term alone is
already **false** at x = 13 — it reads 25.2 against a truth of 65, and the ratio
grows like x, reaching 49145× at x = 10⁵.

## 7e. Lemma V: the mean-square form is PROVED, and L5 hands back a sup bound (2026-08-18)

`research/lemmaV-parseval.js` (371 s); write-up
`history/staging/attack-beta2-01-lemmaV-meansquare.md`.

**PROVED, unconditionally: `⟨R²⟩_H ≤ B(z,s)·H` for every `H`, `z`, `s`**, with
`B(z,s) = Σ_{e | P(z), e>1} e·Vabs(e)²`. The chain is five identities and two
triangle inequalities: L1 the window sum, L2 the autocovariance, L3 Parseval, L4
the exact Fejér mass `Σ_{a ≢ 0 mod e} F_H(a/e) = h(e−h)`, L5 the pointwise
expansion. `B(z, 3.0)` measures **1.3833 to 1.4883, flat across z = 13..37**, and
stays in [1.27, 1.68] over `s ∈ [2.0, 3.4]`.

**A corpus gap closed on the way.** L4 also **proves (V1) and (V2)**, equality
case included — statements `sift-limit-lemmaV.js` **asserts without proof**.

**The proof stops at exactly one place, and it is not a maximal inequality:**
`B` bounded as `z` grows. That is a character-free mean-value estimate for signed
Rosser weights, with **no quantifier over positions**.

**The honest negative (item 2).** The almost-all exponent is **0** — the window
`B/(ηM²)` is polylog, not a power. Useless for `G₂`, and the elementary second
moment already owns that ground about 1.4× cheaper. *Almost-all is not the
currency this problem trades in, and this is the clearest demonstration yet.*

**What a worst-position proof must beat (item 3).** `u₁ = θ(z)/(2 ln z) + 1.45`,
measured 2.8489, 3.2063, 3.6686, 4.0634, 4.3767 at z = 13..29 with the residual
flat at 1.34–1.52, against `u_true` flat at 1.60–1.80. **The gap is
`θ(z)/(2 ln z) − 1.45` = 1.25, 1.50, 1.87, 2.29, 2.60 — diverging like
`z/(2 ln z)`.** In moment order `k ~ θ(z)/(2 ln z (β₂ − 1.45))`, so `k = 1` up to
z = 23 and `k = 2` from z = 29. (`u₁` dipping below `β₂` at `z ≤ 23` is a
soundness check firing, flagged in place.)

> ### The `u_sup` route — RAISED AND CLOSED THE SAME DAY
>
> L5 also yields an **unconditional worst-position bound with no maximal law**:
> `sup|R_H| ≤ Σ_{e,a}|Θ_e(a)||S_H(a/e)|`. On four points at z = 13..23 it read
> 2.06, 2.30, 2.55, 2.67 — all below `β₂` — and was recorded here as possibly
> outranking everything else in this file, with the caveat that four points
> could not separate a plateau from a slow crossing.
>
> **Extended to nine points (`research/lemmaV-sup-extension.js`, z = 13..43), it
> is DEAD.** `u_sup` = 2.0617, 2.3036, 2.5518, 2.6666, **2.7464, 2.8924, 3.0125,
> 3.1103, 3.2026** — **rising at all eight steps**, with the constant model's RSS
> **49×** the best fit's. A plateau below `β₂` is rejected.
>
> **And the crossing point does not need to be located to close it.** All four
> rising models cross `β₂` (at z = 73, 147, 267, 1544) and are statistically
> indistinguishable, RSS spread 1.8× — so *where* is undetermined. Asymptote
> extrapolations carry no weight in either direction: bounded families land on
> both sides of `β₂` depending on the abscissa (5.46 in `A − B/ln z`, below
> `β₂` in the better-fitting `A − B/π(z)`). What closes the route is the
> mechanism and the model-free reading: `S_sat` grows by a flat factor ~2.05
> per added prime, so `u_sat` grows like `π(z)/ln z`, and `d ln S_sat/d ln z`
> is **4.99** over ten levels and **6.20** over the top five — above `β₂` in
> every window, and rising. *Divergence is the mechanism's verdict, and a
> plateau above `β₂` would close the route just the same.*
>
> **Attack 1's own `θ(z)/ln z` shape is rejected too**, conservatively:
> residuals −0.086, −0.189, −0.249, −0.373, −0.535 across the five new levels.
> Growth sits between `ln z` and `lnln z`.
>
> **The mechanism, and both horns are MEASURED rather than argued.** `S_sat`
> grows ~2.05× per added prime, and the step that loses `C^{π(z)}` is exactly the
> absolute-value step `|e(ax/e)| = 1` — the one that removes the position
> quantifier. That step **is** a mean-value estimate and not a maximal
> inequality, i.e. it lives in the tractable class, but it is too weak by that
> factor. Keeping the phase to recover the factor puts `x` back and makes the
> statement uniform-in-`x` again. **So the quantifier is not a presentational
> choice here; it is priced, and the price is `C^{π(z)}`.**
>
> **A cheaper price was proposed on 2026-08-18 and WITHDRAWN on 2026-08-19, and
> the two halves of it separate cleanly.** The **separability is true**: all the
> `x`-dependence sits in one factor `e(−hx/m)`, verified four ways (the one-class
> Fourier identity against brute force to 5.08e-14, reciprocity over 13,116
> coprime pairs with zero violations, the aggregate identity to 2.52e-13), and it
> is not even new — it is L5, already in `research/lemmaV-parseval.js` lines
> 55–62. **The re-pricing that was drawn from it is false.** The chain has ONE
> absolute-value step doing two jobs: `|e(ax/e)| = 1`, which is free, and the
> triangle inequality over the `(e,a)` sum, which is where all the loss is, and
> the first cannot be taken without the second. `τ(m)` counts terms inside one
> modulus; summed over the modulus set it **is** the divisor-pair count up to the
> vector sieve's factor 3. Measured, the `τ(m)` price used as a bound is **4–5×
> worse** (Fourier) to **23–44× worse** (divisor-pair) than what this file already
> computes, and `S_sat`'s per-added-prime factor recomputes at **2.0516**,
> reproducing the 2.05 recorded here. **`C^{π(z)}` was right.**
> `history/staging/attack-tau-repricing.md`.

**The closure is BASIS-INDEPENDENT, checked 2026-08-19 in the natural basis.**
The `u_sup` divergence was measured in the `e` basis, and one attack had flagged
that an `e`-basis divergence could in principle be a fact about the
representation. It is not. The weights the `(h,m)` basis needs are
`K_h(m) = Σ_{q_i=m}(w_i/q_i)e(−h c_i/m)`, validated by `Σ_m K_0(m) = M` to
7.7e-15 and by rebuilding `Θ_e(a)` to 3.12e-16 across 2309 frequencies. **The two
bases differ only in whether the `m`-sum sits inside or outside the single
absolute value, so `Ssup_hm ≥ Ssup_e` frequency by frequency** — 0 violations over
2309/30029/510509 frequencies checked — and the natural basis is therefore
strictly the more expensive of the two, by a flat factor **7.2599**
(6.6170–7.8932 over z = 13..43, log-log slope 0.0133). `u_sup_hm` rises at 5 of 5
steps exactly as the `e` column does, and the like-for-like bounded asymptote is
5.4512 against 5.4823, **both above β₂**. Stated at its true size by the attack
that ran it: this is the same instrument with one summation moved, **not** a
second independent witness. `history/staging/attack-hm-basis.md`.

**The §7b question, settled by the extension.** Attack 2 found absolute-value
accounting sharp at a worst position (`Σ|r|` at 0.978 of the trivial bound) and
read it as "`θ_total ≤ 1` is a real ceiling on any absolute-value method";
attack 1 answered that L5 is **80× tighter** at the same positions, so the
ceiling was on the representation rather than the problem. **Both halves needed
correcting.** The Fourier route wins on the **constant**, by 23–44× and not a
flat 80× — `N/S_sat` *falls* from 44 to 23 — while §7b wins on the **rate**, and
**both losses grow ~1.5× per prime**. So neither is a ceiling on the problem and
neither is a route: they degrade together.

**And it answers the BF transfer question of §7b.** Their left factor
`e(−hN/(d₁d₂))` is L5's `e(ax/e)`: **unimodular, so Parseval kills it for free** —
no partial summation, no Lemme 2, no `N/H` loss. **The price is exactly the
quantifier, not the factor.** So "the one factor" is dissolved in the
mean-square setting, and the obstruction relocates to almost-all-versus-sup —
where the `u_sup` route above does not obviously pay it.

## 7d. The loss budget, and §1's ordering is inverted (2026-08-18)

`research/attack-beta2-04-loss-budget.js`; write-up
`history/staging/attack-beta2-04-loss-budget.md`. Where the `x^3.3` goes, with
`E = β/θ` and DHR at `β = 4.26645`, `θ = 1`.

| line | exponent | cumulative | basis |
|---|---|---|---|
| truth | 1.0000 | 1.0000 | asymptotic; `log_x G₂ = 1.70` flat over `x ≤ 79` |
| **DP1, the one-point floor** | **+2.1945** | **3.1945** | exact level-`D` LP over `x ≤ 23`, 16 readings, calibrated on the proven `β₁ = 2`; bracket 2.67–3.63. **This row is the x ≤ 23 measurement. §7c's push to x ≤ 43 raises it to +2.32 on a floor of 3.3152, i.e. DP1 at 71% rather than 67%, and that is the current figure. The two are the same quantity at two ranges and not a disagreement** |
| **DP2 + DP3** | **+1.0719** | **4.2665** | residual |
| DP2 envelope alone | +0.0000 | 4.2665 | `L* = 2.19722` exact, `κ_eff = 2.0465`; `V` costs `2lnln z/ln z → 0` |
| DP4 at `θ = 1` | +0.0000 | 4.2665 | `max|r_d|/ω(d) = 0.88`, attained |
| the unnamed `o(1)` | +0.0000 | 4.2665 | zero in exponent, **+2.80 at x = 79** |

Residual 0.000000. `β₂` was recovered independently by shooting the DDE:
**4.26660 against 4.26645**, agreeing to 3.5 × 10⁻⁵.

**§1's ordering is INVERTED.** This file calls DP3 "where the dimension-2 price
is actually paid". Measured, **DP1 is 2.19 of the 3.27 at `x ≤ 23` and 2.32 of it
at `x ≤ 43` (§7c), against DP2+DP3's 1.07 falling to 0.95.** The master discard really is the master cost: what the sieve gives up by
seeing only `(|A_d|)` outweighs everything it gives up afterwards.

**Elasticity.** `∂E/∂β = 1.0000`, `∂E/∂θ = −4.2665`; log-elasticities are exactly
`+1` and `−1`, so a factor `c` in either knob divides the exponent by `c`.
Ranked by headroom × availability:

1. **`θ`, i.e. DP4 — and this reverses §1's "free for us".** Headroom `1 → 2` is
   **measured**: the signed sum behaves as `D^γ` with `γ = 0.27–0.49` over
   complete periods, giving `θ = 2.06–3.65`. It is the **only knob with a
   consumer** (the vector sieve, via Lemma V). Reaching `θ = 2` gives `E → 2.133`.
2. `β`, i.e. DP2+DP3. Headroom only `4.266 → 3.195`, and no consumer exists.
3. DP1. `3.195 → 1`. **Still the wall, and since 2026-08-19 a CLOSED door with a
   theorem behind it rather than an unexplored one.** The one known consumer of
   two-point data, the sharp degree-`k` Boole-Fréchet certificate, is
   unconditional and all-positions and **provably dead for asymptotics**.
   (a) *Degree only divides the exponent.* The right variable is `θ(x)`, not `x`:
   `ln(6L/G₂)` is linear in `θ(x)` with measured slopes 0.5441, 0.5425, 0.2816,
   0.2937, 0.1695 at `k = 2..6` against a predicted `1/(2⌊k/2⌋)`, so the certified
   bound is about `(x#)^{1/(2⌊k/2⌋)}` — **exponential in `x` at every fixed
   degree**. Attack D's `+5.20` log-log slope is a fit statistic for an
   exponential and must not be quoted as a growth exponent. Odd degree is nearly
   free (`k = 3` tracks `k = 2`, `k = 5` tracks `k = 4`), proved and verified
   59/59 against the exact simplex.
   (b) *The required degree diverges, and self-defeatingly.*
   `k* ≥ (θ(x) − O(1))/(log G₂(x#) + O(1))`, so under any polynomial
   `G₂ = O(x^B)` the degree needed is `≥ (1+o(1))·x/(B log x)`: **the better the
   `G₂` bound assumed, the higher the degree required.** Measured over eight
   levels, `k* = 2, 4, 5, 8, 10, 12, 14, 16`, slope 1.066 ± 0.099, the eighth
   from a full enumeration of `x = 29` (1,078,282,205 slots, confirming
   `G₂(29#) = 258`).
   (c) *And the input holds up*, so there is one cause of death rather
   than two: every `k`-point correlation is an exact Euler product over the slot
   classes, verified 12/12 and 40/40 per block.
   `history/staging/attack-bonferroni-degree.md`.
4. DP2's `L` and the `o(1)`: elasticity exactly zero. Do not spend effort here.

**DP4 is saturated, not free.** The per-term bound is tight to 0.88 — and that
tightness is exactly what caps `θ`, the largest derivative in the problem. So the
sentence "our DP4 is already saturated free of charge" is true and its cheerful
reading is wrong: saturation is the constraint, not a gift.

**An independent consistency check worth recording.** `β_floor/θ_max = 3.195/2
= 1.597` against the measured `1.70`, **6.2% apart with no shared code**.

> ### ✅ RESOLVED 2026-08-18 by the x = 43 push — they measure different things
>
> `research/lp-push-x43.js` (1850 s) settles it. **§7c's 1.72–1.84 and §7d's
> 1.0719 have different endpoints at BOTH ends.** §7c runs from a one-step
> envelope surrogate (**3.8452**, not β₂) down to the exact-strata threshold
> (2.0260); §7d runs from β₂ down to the calibrated floor. **The two bottoms are
> one object at two scales** — exact strata and the raw LP frontier agree to
> **0.1% at x = 23**, with `|ratio − 1|` falling at all six levels, 0.223 → 0.001,
> and crossing 1. Neither figure was wrong; they were never comparable. *Not
> split down the middle, which is what I asked the adjudicator not to do.*
>
> **The inversion SURVIVES and strengthens.** The LP now reaches x = 29, 31, 37,
> 41, 43 and reproduces all 48 of §7d's published cells to 4.9e-5, worst duality
> gap 3.7e-13. **s90/s99 settle**: raw s90(κ=2) rose +0.130/level to x = 23 and
> then only +0.022/level to x = 41; s99 rose +0.090 then +0.005. After the
> `β₁ = 2` calibration the spread over x = 23..43 is 0.093 and 0.045, against
> 0.279 and 0.211 before — **the two statistics that were flagged as still rising
> are now the stable ones**, and what drifts instead is `s*` and `s50`, every
> drift upward. **The floor RISES**: pooled 3.1945 (x ≤ 23, 16 readings) →
> **3.3152** (x ≤ 43, 33 readings), 3.2513 like-for-like. **DP1 is 2.32 of
> 3.2665 — 71% — against DP2+DP3's 0.95.** All 33 readings clear the
> `(1+β₂)/2 = 2.6332` the inversion needs, tightest 2.6692 at x = 19. **So
> 3.195 was conservative, not an artifact.**
>
> *Not reached, stated: s90/s99 at x = 43 and s99 at x = 41 hit row caps and are
> given as honest lower bounds; the B-vs-L identification cannot exceed six
> levels.*

> **⚠ SUPERSEDED — the conflict as first recorded. Kept for the reasoning.**
> Attack 3 reports that swapping stratum pricing from worst-case to exact is
> worth **1.72 to 1.84 of exponent**. Attack 4's budget caps DP2+DP3 together at
> **1.0719**, and separately measures worst-casing exact strata as costing only
> about **0.25** of exponent (certifying within 1.2–2.4× of true `G₂`). Those
> cannot both be right. The two used different baselines — §7c swaps the pricing
> inside the DHR bound, §7d measures exact strata against true `G₂` — which is
> the likely source but is **not** established. **Adjudicate before either figure
> is used.**

**Reach — and it was pushed the same day.** This originally read: exhaustive to
`x = 23`, LP to `x = 23` at 512 cells, `κ = 2`'s `s90/s99` still rising, so the
3.195 rests on calibration rather than convergence. **That is now settled** —
see the resolved box above. The LP reaches `x = 43`, the flagged statistics
converge, the floor rises to 3.3152, and DP1's share rises to 71%.

## 7c. DP3 opened: the strata ARE self-similar, and it still does not close (2026-08-18)

`research/attack-beta2-03-exact-strata.js`; write-up
`history/staging/attack-beta2-03-exact-strata.md`. DP3 was the one discard point
with no consumer in the literature, recorded above as "not provably useless".
It has now been opened, and the answer is precise in all three directions.

**The transformation law, proved and machine-verified at all eight levels.** For
an odd sifting prime `p`,
`{r ≡ 0 mod p, r ∈ T⁻} = p·(p⁻¹·T⁻)` and
`{r ≡ −2 mod p, r ∈ T⁻} = p·(−p⁻¹·T⁻) − 2`.
So a discarded stratum **is exactly two two-class interval sifts** at length
`H/p` and level `p⁻`, same `κ = 2`, same `ω(q) = 2`. The recursion divides the
class-offset vector by `p`, so the family generated from the twin tile is
precisely its multiplicative dilates `m⁻¹·T`. This file's "dilated kill images"
is no longer a metaphor.

**Where the self-similarity breaks, and it is the crux.** The dilation is an
isomorphism of the tile **as a set with congruence structure**, not **as a set
with order** — and every question a sieve asks a stratum is an *interval*
question. Measured at level 19: the family is uniform **from above** (≤ 15%
spread in max window count) and **not from below** — the twin tile is the family
*minimum* in max gap, with 0 of 10 dilates smaller and one reaching 198 against
`G₂ = 150`.

**What exact pricing is worth, isolated.** Same bound, only the stratum pricing
swapped: **1.72 to 1.84 of exponent.** With exact strata the entire remaining
cost is an `O(1)` decoupling excess `D(H) = 1..15`. That is the largest single
elasticity measured anywhere in this pipeline.

**The thresholds, full period, nothing sampled.** At `p ≤ 23`,
`u* = 2.0260` (sifting-limit reading; 1.9264 first crossing) against
`β₂ = 4.26645` and `u_true = 1.6961`. Two genuine finite certificates fall out:
**`G₂(19#) ≤ 210`** and **`G₂(23#) ≤ 420`** (true values 150 and 204). But it is
**not trending below**: the stable value *rises* monotonically 1.9448 → 2.0260
across `p_k = 11..23` and crosses 2 at `p_k = 19`.

**Legitimacy — the real result, and it is not the objection I expected.**
Full re-insertion at `j = k` is a **tautology**: the script demonstrates this on
itself, returning `H* = G₂` exactly at all six levels. Partial re-insertion at
`j < k` is **not circular** and is a valid finite theorem. What kills it as a
proof technique is an **infinite regress, not circularity**: `max_x Str_i` at
`u_i ≈ 1` *is* the upper sieve function of a dilated tile one level down, and the
only proven bound for that is `F₂` — the very thing exactness was inserted to
replace. **It terminates at every finite `z` and at no uniform `z`.**
Corroborated three ways: the value of exactness concentrates at the *largest*
primes (one prime buys more than the first five combined); `F_meas` *rises* with
`y` at the parameters that matter; and Blight's thesis states the DHR sieve is
the infinite iteration of Ankeny–Onishi, so the axiom class has no depth left to
mine.

> **~~A ceiling that reframes the programme~~ — DOWNGRADED 2026-08-18, same day,
> on reading Blight's thesis directly. There is no ceiling at 4.**
> The first version of this box said Blight gives Selberg's conjectured `κ = 2`
> sifting limit as 4, and concluded that inside-axiom attacks compete for the
> band (4, 4.2665]. **Two things are wrong with that.**
> (i) **Blight never writes 4.** Her p. 6 (§2.1) reads: *"Selberg proposed that
> the sifting limit is 2κ… a lower bound sieve with a sieving limit of 2κ has
> not been found for κ > 1."* The 4 is **our arithmetic** on `2κ`.
> (ii) **`2κ` is a TARGET, not a proven floor, and it has already been beaten
> elsewhere.** Her p. 7 records `β_κ < 2κ` **achieved** for `½ < κ < 1`, and
> Brady p. 3 conjectures `β_κ ≤ 2κ − εκ^{1/3}` for large `κ`. The most direct
> source is Brady's own p. 3, read 2026-08-18: *"It is currently not known
> whether there is any κ > 1 with β_κ < 2κ"* — a statement that the question is
> **open**, which is not what a floor is. So nothing
> establishes 4 as a floor at `κ = 2`; the axiom class may well go below it.
> **The band (4, 4.2665] is not a thing.** What survives is only the weaker and
> still useful statement that no `κ = 2` sifting limit below 4.2665 has been
> exhibited by anyone. Confirmed on the same read: **DHR really is the infinite
> iteration of Ankeny–Onishi** (Blight p. 8, §2.2.2, verbatim), and that page
> prints `β₂ = 4.266450` — a second independent source for our constant.

**The adjacent door, scoped the same day, and it opens onto nothing.**
Brady's and Runbo Li's **fractional retention rules** do sit at DP3, they do
apply to our system — Brady p. 1 names it exactly: *"κ is 2 and the congruence
classes chosen modulo each prime are 0 and 2"* — and being functional
inequalities in `(F_κ, f_κ)` they genuinely carry **no regress**, which was the
whole reason the lead looked good after exact strata died on one. **But Brady
§9.6 (p. 133) gives the rule's window as `(α_κ, β_κ+1)`, and DH p. 77 proves
`α_κ ≥ β_κ+1` for `κ ≥ 2` — so the window is EMPTY at every `κ ≥ 2`**
(`α₂ = 5.35773` against `β₂+1 = 5.26645`). Only the lower-bound half survives,
and Brady measured its yield himself: `β(3/2)` from 3.11582 to 3.11549, a
relative `1.06 × 10⁻⁴` — **0.017% of the 4.2665 → 2 gap.** Closed.
`research/scope-fractional-retention.js`;
`history/staging/scope-fractional-retention.md`.

**What that scoping found instead is worth more than the door.** **Brady's thesis
is uncited prior art on our central object**: his **p. 1 names our exact system**
and he **gives no bound at any exponent**. The reconciliation this entry once
asked for was run on 2026-08-18 and withdrew the rest of what stood here: his
**Problem 3 (p. 12) is a one-class, arbitrary-`A` decision problem and is NOT
ours**, and its NP-completeness (Theorem 9, p. 13) is about **partitions**, so it
does not reach our 2-cover family and licenses nothing about the exponent. What
does carry over is his p. 12 sentence that a bound at the `z²` scale *"would be a
much stronger claim than the twin prime conjecture"*, which **corroborates**
`G2-STATE.md` §1c's strong form. Full reconciliation, with the numerical
separation between value-shift and argument-shift, in
`history/staging/attack-np-licenses.md`. Nothing published re-inserts exact strata and nothing published states the regress, searched sieve-side only, as tabled in `SEARCH-CONVENTIONS.md` §3.

## 7b. The vector-sieve route, priced against the source (2026-08-18)

`research/attack-beta2-02-theta-total.js`; write-up
`history/staging/attack-beta2-02-theta-total-minimal.md`. Both Brüdern–Fouvry
PDFs read (numdam `CM_1996__102_3_337_0`, matwbn `aa37127`) — the numdam text
layer drops every display formula, so the side conditions were read off rendered
page images, which is the only way to get them right.

**Verdict: the defensible `θ_total` is 1. It does NOT clear the break-even of
1.2090, and is short by 0.209.** No part of that gap closes with what is
available. Three findings outweigh the verdict.

**(1) The 5/4 target is already a published theorem — in a different problem.**
Brüdern–Fouvry's **Proposition 2** (p. 345) carries four side conditions, the
last of which, `q^{C₀} D₁⁴ D₂⁴ ≤ x^{5−cε}`, **is exactly `θ_total ≤ 5/4`**.
Their choice `(upper, lower) = (x^{1/2}, x^{3/4})` saturates it and their
exponent is `(4/3)(1 + e^{3/4}) = 4.156000`, **below β₂ by 0.110450** — a
comparison their own §1 makes, against "1/4,2664". Their elementary Proposition
1 (Weil) tops out at 4.6123 and loses to β₂, so **the entire margin rests on
Deshouillers–Iwaniec.** *(**CLOSED 2026-08-18, and it was never an error: `4.156000 = (1+e^{b/2a})/b` at
their split, `1/4.156000 = 0.2406159769` reproduces their printed "0,2406", and
their "0,2343" is `1/β₂`. But the re-split this once promised was a trap, and
it was sprung on 2026-08-19 by reading all four of their side conditions at
600 dpi instead of one.** They are*
`q^{C₀}D₁ ≤ x^{1−cε}`, `q^{C₀}D₁D₂² ≤ x^{2−cε}`, `q^{C₀}D₁²D₂³ ≤ x^{3−cε}`,
`q^{C₀}D₁⁴D₂⁴ ≤ x^{5−cε}` *(numdam PDF p. 10 = journal p. 345; the PDF carries a
cover sheet, so journal N = PDF N−335). **Only the fourth is a product
condition.** The first constrains `D₁` alone and the middle two are asymmetric,
so inferring the shape of the constraint set from the fourth — which is what the
2026-08-18 reading did — is the defect. **Condition (iii) binds at
Brüdern–Fouvry's own split and kills the re-split**: at their levels exactly one
slot assignment is feasible, and there (iii) and (iv) saturate simultaneously, so
their point is a vertex and the signature of an optimisation already performed.
The 2026-08-18 optimum violates (iii) by `x^{0.040403}`, and its
`0.0295482779` is **not available**. What survives is `0.0000120536` in `θ`,
**0.70% of the claim**: their vertex is not stationary (`dθ/dβ = −0.006021`), and
the true optimum sits just inside edge (iii) at majorant `x^{0.502674}`, minorant
`x^{0.745990}`, `θ = 0.240628029251`. **Their printed "0,2406" is unchanged.**
Two further corrections from the same read: this file had the slot assignment
**reversed** — `D₁` is the minorant `x^{3/4}` and `D₂` the majorant `x^{1/2}` —
and the four printed conditions are exactly their p. 348 maximum after
substituting `D₂'`, whose choice is itself optimal, so no comparability is needed
anywhere and four independent levels buy exactly nothing. `research/attack-bf-split.js`,
`history/staging/attack-bf-split.md`.)*

**(1b) Ford–Halberstam's own proposal, carried out, loses to their own constant
(2026-08-19).** Ford and Halberstam, *J. Number Theory* 81 (2000), write at
p. 15 — read from a 300 dpi page image — *"This seems to us superior to Lemma 13
of [BF1] or (2.6) of [BF2] in the treatment of the 'y_ℓ − x_ℓ' terms, and should
lead to better results."* Nobody carried it out in the 26 years since; Schindler
and Sofos built the multidimensional vector sieve in 2018 from Brüdern–Fouvry
without citing it, and Ford's own 2023 notes never mention the vector sieve.
Carried out here: **their Lemma 1 is BF (2.6) with the true indicators in the
minorant slots** — strictly stronger pointwise, and any usable form of it
(minorants substituted for the true indicators) is (2.6) verbatim; it
rearranges at every `r` to `Σ_ℓ x_ℓ ∏_{j≠ℓ} y_j − (r−1)∏ y_j`. The claim is entirely about the estimation step, and **that step
is better than they claimed**: `χ̄⁺` is supported on `ν(d)` odd only, so their
absolute bound is an **identity** (zero failures over 4.8M/3.0M/3.0M positions)
and costs no level. **What sinks it is the freedom forfeited.** One `χ⁺` per
component forces `D⁻ = D⁺`, and the per-component bound becomes a linear-sieve
minorant of level `D` capped by `f`, so the level currency is
`K_FH = 2(1+√e) = 5.297442541400` against `K_BF = 5.158064680330`, **2.702135%
worse**, and the `(+,+)` diagonal can never be bought free. Priced for us:
exponent **5.297443** at `θ_total = 1` and 5.141635 with Bettin–Chandee, against
`β₂ = 4.266450`, needing `θ_total > 1.241651` and `γ ≤ 0.805379` where the
Brüdern–Fouvry road needs 1.208983 and 0.827142 — **strictly harder on both**.
Priced in **their** problem, against all four side conditions with (iii) binding
in the only feasible slot assignment: **4.359140915496 against their published
4.156000022150**, so it loses to their own constant and misses `β₂` by 0.092691.
Transfer to `G₂`: none — the work is all main-term, the `e(−hN/(d₁d₂))` factor is
untouched, and the remainder demand gets harder.
`history/staging/attack-ford-halberstam.md`.

**(2) The transfer fails at exactly one factor, and it is identifiable.** By
reciprocity the shifted CRT phase splits as
`e(hρ/(d₁d₂)) = e(−hN/(d₁d₂)) · e(−2h·d̄₁/d₂)`. The **right** factor is theirs
verbatim. The **left** is `O(x^ε)` for them, because their window length equals
their element size, and `O(N/H)` for us, with `N` running up to `P(z)`. That one
factor breaks their partial-summation step in (2.9) and the smoothness
hypothesis of their Lemme 2. **This is the sharpest statement of the obstruction
the project has: not "the method does not apply" but "one factor, here, for this
reason."**

**(3) A new small result: absolute-value accounting is SHARP, not lazy.** A CRT
construction places a doubly-smooth `n₀` in the window; there `Σ|r|` reaches
**0.978** of the trivial pair-count bound, against **0.027** at typical
positions. **So `θ_total ≤ 1` is a genuine ceiling on any absolute-value method**,
not a habit a sharper estimate could shake off — which is why the mean-square
route is the one with room. At that same worst position the **signed** Rosser sum
stays about `H` (max 6 over 20,000 positions, pair count 588), so **Lemma V looks
true and only its proof is missing.**

### 7a-bis. How `L` combines, and what the covering-form freedom is worth (2026-08-19)

*(Chris asked whether `L` should be smaller for the combined set of two prime
sets than for the two separately. It is the right question and the answer
inverts, which is why it is worth stating carefully.
`research/attack-L-subadditivity.js`, `history/staging/attack-L-subadditivity.md`.
The theorem and the `G₂` identity below were re-derived independently by the
adjudicator before being written here.)*

**THEOREM. For DISJOINT prime sets, `L(P ∪ Q) ≥ L(P) + L(Q)`. [PROVEN]** One
line, and disjointness is the whole hypothesis: `a_p` is free, so a cover is
translation-invariant; translate `Q`'s cover by `t = L(P)` and lay the two end to
end. Disjoint primes touch disjoint coordinates, so no CRT is needed for the
merge. **Sub-additivity is therefore impossible on disjoint sets**, and the
concatenation baseline is a **floor rather than a ceiling**.

**The census agrees and is exhaustive. [VERIFIED]** Over all 9330 disjoint pairs
reachable to 9 primes: **0 sub-additive**, 398 exactly additive, 8932
super-additive, mean surplus +10.5 and max +44. Every equality is a small-set
case; with both parts of size ≥ 3 there are none.

**But the instinct was about prime REUSE, and there it is right.** Drop
disjointness and the sign flips, monotonically in the overlap. Over 120,975
overlapping pairs the mean `Δ = L(P∪Q) − L(P) − L(Q)` runs **+8.21, +5.83, +2.48,
−2.31, −8.96, −18.06, −30.58, −47.00** at `|P ∩ Q| = 1..8`, **crossing zero at an
overlap of 4**. So the deficit Chris expected is real, and it is a statement about
sharing primes rather than about union of sets. [MEASURED]

**The law, and it says which operation `L` respects.** `L+1 ≈ m̄(P)·m̄(Q)·r(|P|+|Q|)`
with `m̄` multiplicative and `r` roughly linear in `|P|` (1.67 → 12.11): merging
**multiplies spacings and only adds residuals**. So `L` is **super-additive but
sub-multiplicative** (ratio min 0.264, mean 0.504) — against `(L+1)(L′+1)` rather
than `L+L′`, Chris's sentence is true.

**What it prices, against the requirement.** The 529 requirement is `L ≤ 51`.
Super-additivity **kills the upper-bound-by-splitting family outright**: splitting
a prime set yields floors on `L`, never ceilings, so no such argument can bound
`G₂` from above. It is no obstruction either — the best two-part floor in block 1
is 15 — and the defect compounds rather than accumulating: the best `k`-part floor
falls from 64 to 9 across all Bell(9) = 21147 partitions.

**And a by-product worth more than the question: `L(primes ≤ x) + 1 = G₂(x#)` at
every exact ladder level.** [VERIFIED, nine levels by the attack, seven
re-derived independently by the adjudicator on a separate implementation.] So at
these levels **the covering form's free translate buys exactly ZERO over the
pinned sieve pair `{0, −2}`** — the two formulations `research/qc/units.js` §5
keeps apart agree numerically here, which is a fact about the object and not a
licence to merge them.

### 7a-ter. `L` has no law of its own, and the 529 route is closed rather than unfinished (2026-08-19)

*(`research/attack-L-law.js`, `history/staging/attack-L-law.md`. Companion to
§7a-bis: that one asked how `L` combines, this one asks what `L` does on its own.)*

**`(L(v,y) + 1)·m̄(T_v) ≈ G₂(y#)` at every level where both are exact.**
[MEASURED, and it is the headline] Over `y ≥ 23` the spread across four tiles is
1.0000 to 1.0838, mean 1.0198, and it is **exactly 1.0000 at `y = 53, 61, 73,
79`**, with the residue pure quantisation. **The block coordinate contributes
exactly one thing, the divisor `m̄(T_v)`.** So "compute `L` at the block where it
reaches 529" **is** "compute `G₂` there", and `L` is not an independent handle on
the object. Taken with §7a-bis's super-additivity, the whole
covering-by-blocks family is now mapped: splitting gives floors and never
ceilings, and merging gives back `G₂`.

**529 is closed at depth 0, and the counting criterion has a depth axis.** The
depth-0 criterion's ceiling is 62 (proven, CRT) against the `L ≤ 51` that 529
needs: a deficit of 11 slots, a factor of 1.216 — and that deficit is a
property of depth 0, not of counting. Charging forced *pairwise* overlap brings
the ceiling to **54**, closing 8 of the 11 slots, and the exact optimum over
the full fractional-cover polytope at depth 2 is **also 54** (the depth-2 LP
gain is exactly the fractional-matching gap on K₆, which vanishes here), so
pairwise genuinely stops 3 slots short; the residue sits on the `{7, 11, 13}`
triple, whose forced overlap is 5 slots against 2 from its pairwise deficits.
Parts of size 3 give **`L ≤ 38`** and clear 51 with room: at block 1 the
counting route to 529 is **open at depth 3, not closed**. It is also
expensive — the depth needed to clear `x²` rises 3, 3, 5, 5 at
`x = 23, 29, 31, 37`, the phase-tuple count at depth `k` is
`Σ_{|B|≤k} ∏_{p∈B} p`, and `x = 41` is out of reach at every depth run — and
even depth 3's 38 is still 2.0× the truth `L = 19`. Open and expensive is not
a proof route. [`research/attack-ab-coupling-01.js`,
`research/attack-ab-coupling-02-lp.js`; independently verified,
`history/staging/verify-ab-coupling.md`.] The object itself clears 529 by
2.59×, and the margin *grows* — 1.63×, 2.59×, 2.99× at `v = 3, 5, 7`. `L` itself reaches 529 only at `v = 17`, which needs `G₂` at 61
primes against a frontier of 22, about `10^{43.2}` nodes.

**New exact values, from an exhaustive branch-and-bound decision procedure**
validated 9/9 against full-period scans to 37.2M slots, against brute force, and
against A144311 at `n = 3..8`: `L` is now pinned in **60 of 90** `(tile, y)`
pairs, with 37/37 agreement between two independent instruments. **`L(7,47) = 50`
is new** — the corpus carried `≥ 49` — with `l = 50` feasible in 29,381,838 nodes
and `l = 51` infeasible on a completed search of 107,391,034.

**And `L` is linear in nothing, which is a finding about our instruments.**
Calibrated against the one-class control, bias-corrected exponents span 1.314 to
1.754 and **the data prefers no abscissa at all**: not `y`, not `θ`, not `π`. The
apparent linearity in `θ ln²θ` is an estimator artifact — the control reads 0.72
where the truth is 1. `y` and `θ` agree to 0.04 and `π` is the outlier. This is
the same trap that turned a polynomial reading into an exponential one at DP1 two
days ago, avoided here by calibrating before fitting.

### 7a-quater. The exact Shearer threshold ladder H*(x) (2026-08-19; NOVEL-SO-FAR)

For the two-class kill events with their true dependency graph (p ~ q iff
pq > H), the exact Shearer feasibility threshold H*(x) = min{H : the
marginals lie in Shearer's region R(G(H))} is computable, and the ladder is

> H* = 35, 55, 65, 91, 115, 209, 319, 481 at x = 13..79 — every value a
> semiprime — with θ_Shearer = ln H*/ln x ≈ 1.41 flat over seventeen levels
> and the PROVEN floor 2/√e = 1.21306 (primes in (√H, x] form a clique).

Producer `research/import-shearer-01-region.js` (embedded; exact BigInt
subset enumeration, brute-forced at 38 of 38 (level, H) pairs); record
`history/staging/import-shearer.md`; adversarially re-verified in
`history/staging/adversary-wave2.md`. NOVEL-SO-FAR: absent from OEIS at six
calibrated indexings and no exactly-computed Shearer region on an arithmetic
family exists in zbMATH/arXiv/OEIS full text, searched as "Shearer's region"
(`history/staging/identifications-prior-art.md`; MathSciNet unreached). The
reading: the pairwise-drawn local lemma certifies a window a tenth of the p²
rule — and §7's wall stands because the exact criterion IS the union bound
on the complete graph.

### 7a. A correction to this repo's own adjudication: `L ≤ 62` stands, `L ≤ 111` is weaker

**Coverability of `[1, L]` is DOWNWARD CLOSED**: restrict a cover of `[1, L′]` to
`[1, L]` and every point is still covered. So the feasible `L` form an initial
segment, there are no revivals, and **the first infeasible `L` minus one is the
bound**. Verified here by exhaustive enumeration over all 385 phase choices at
primes {5, 7, 11}: the feasible set is exactly 1..9, contiguous.

`history/staging/attack-block-00-ADJUDICATION.md` overturned an `L ≤ 62` in
favour of `L ≤ 111` on the ground that feasibility is non-monotone. **That
conflated two different things.** What is genuinely non-monotone — and is a real
defect this repo found and fixed — is the **greedy search's success**, which is
why bisecting on it is unsafe. Feasibility itself is monotone. Taking the *last*
dead `L` rather than the *first* therefore yields a true but much weaker bound:
at x = 11, where the truth is known, first-dead gives 2.02× the truth and
last-dead gives **5854×**.

**`L ≤ 62` is correct and stronger; `L ≤ 111` is true, implied by 62, and weaker
by 1.79×.** **RECOMPUTED AND CONFIRMED 2026-08-18** — the INFERRED flag is
dropped. `research/block-L-first-dead.js` re-runs the instrument
(`attack-block-03-alternation.md` §2(c)+§6, Theorem D's sweep of
`S(l,f) = Σ_p max_a #{i<l : d_i ≡ a or a−2 mod p}`) from scratch in 17 s: **first
dead `l = 63`, sums 62/62/62 across all three phases**, last-alive 111. Block 2
reproduces independently (660 → `L ≤ 659`), and all seven object numbers replay,
including `maxsum₂₀(T₅) = 204 = G₂(23#)`.

**Closure holds in the block coordinate, attacked four ways.** Achievable
dead-run lengths decided per-`l` by independent full-period scans are exactly
1..19; all 190 sub-runs of the extremal run are themselves all-dead and satisfy
the constraint — which is the property closure actually needs, since Theorem D
never uses maximality; and 67 instances with exact truth (63 sub-blocks on `T₅`,
four on `T₇`) show zero non-contiguous cases and zero violations. The block
object is an interval of slots, so this is the same triviality rather than an
inheritance from the interval coordinate.

**Three things this section did not have, all from the recomputation.**
(i) The adjudication's `w`-window **is** attack 3's instrument: `W(l) = Smax(l)`
at every `l ≤ 400`, **proven by CRT** — every per-prime phase is realised at a
real `T₅` slot inside one 23# period. So **62 is the ceiling of this criterion**,
not merely a valid reading of it. (ii) There is no revival anywhere:
`T(l) = Smax(l) − l` is subadditive, `max T = 7`, `T(1200) = −77`.
(iii) **The `5854×` figure quoted here earlier was the wrong quantity** — it was
covering-prune's *last-dead*, i.e. its sweep limit, and that script prints 40000
today. The dispute turns on **last-alive**. Apples to apples at `x = 11`:
**83 (2.02×) against 113 (2.76×).**

**Nothing downstream consumes either bound.** The only other carrier was
`research/qc/units.js`, now corrected. **Neither bound clears 529**, so this
settles a record-keeping question and not a mathematical one.

## Sources

DHR / Theorem 9.1 / β₂ chain: `paper/beta2-note.md`,
`research/dhr-verification.md` (Booker-Browning arXiv:1511.00601 ancillary
table; Franze-Kao arXiv:1812.11280). · Ford, *Sieve methods lecture notes*
(2023), ford126.web.illinois.edu/sieve2023.pdf, §1.7.4, §3.1 Def. 2, Table 1
(fetched, quoted). · Franze, JNT 131 (2011), arXiv:1012.3809 (PDF read). ·
Brüdern-Fouvry, Compositio Math. 102 (1996) 337-355 (numdam). · Iwaniec,
Acta Arith. 37 (1980) 307-320 (matwbn.icm.edu.pl scan) and Acta Arith. 19
(1971). · Friedlander-Iwaniec, Ann. of Math. 148 (1998); Bombieri's
asymptotic sieve via Tao's 2016 notes (terrytao.wordpress.com). · Granville,
*Sieving intervals and Siegel zeros*, via `research/covering-dive.md`
(FKMPT Remark 7 there too, §2.3). · Lichtman ANT 19 (2025), Wu 2004, parity
floor: via `research/natal-cap-10-sieve-cap.md`. ·
Torquato-Zhang-de Courcy-Ireland, J. Phys. A 52 (2019) 135002,
arXiv:1804.06279. · Repository inputs: `research/natal5-variance.js`,
`research/natal-cap-19-calm-lemma.md`, `research/natal-cap-26-minus-half.md`,
`research/natal-cap-29-sigma-plateau.js`, `research/NATAL-CAP-CAMPAIGN.md`.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
