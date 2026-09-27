# The rho maximal law: the statement, the sufficiency curve, the literature position

<!-- ledger
id: Q-rho-maximal-law
status: PARTIAL
todo: 0
question: What is the rho maximal law, what is its weakest sufficient form against the crossing, and where does it sit against print?
verdict: The pricing lemma turns any RML(alpha) with alpha < beta_2 = 4.26645 into G2(z#) << z^alpha ln^2 z, every step proven except the law itself; the sufficiency curve lambda_max falls from 2.31949 at z = 13 to 1.78446 at z = 47, the weakest measured point, and whether it ever reaches zero is model-dependent and undecided, so nothing here is an unconditional exponent.
-->

**TODO item 0's named first move, executed: the law is stated, its weakest
sufficient form is priced against the (31, 47] crossing, and the position
against print is settled. Producer: `research/rho-maxlaw-01-sufficiency.js`
(all controls pass; output embedded). Four things came out.**

**One: the statement, and a ladder of five forms from tautology to Gaussian
(§1).** The clean absolute form is RML(α): `sup_y |ρ̃_z(y)| ≤ C·z^α` uniformly
in z, for the H-free sawtooth potential of the Brüdern–Fouvry certificate at
s = 3.0. The pricing lemma (§2) turns any RML(α) with α < β₂ = 4.26645 into
`G₂(z#) ≪ z^α ln²z` — an unconditional two-class exponent below 4.2665, the
first movement of β₂ since 2008. Every step of the lemma is a proven identity
or standard linear-sieve asymptotics except the law itself; the T ≥ 1
accounting demanded by the fixed-point rider is built in and costs 1/M =
O(ln²z), i.e. at most 0.045 of exponent at z = 13 falling to 0.0008 at z = 47.

**Two: the sufficiency curve (§3).** In Gaussian units the allowed looseness is
`λ_max(z) = β₂ − θ_G(z)`, measured 2.31949 at z = 13 falling to **1.78446 at
z = 47, the weakest measured point**: a maximal law weaker than the Gaussian
form by a factor z^1.78 — about 963 at z = 47 — still beats β₂. The curve
falls at the crude column's drift rate (0.3909 ± 0.0363 per ln z over ten
points); whether it ever reaches zero is model-dependent and undecided — the
linear-drift model closes the room at z ~ 5·10³, the power-law model leaves
1.53 ∓ 0.14 of exponent forever, and ten points over one octave cannot
separate them (§6, neither called). The (31, 47] crossing raises the FLOOR
past the zone budget (th(nP) ≥ 2.0106 at z = 47) and kills only the
TPC-grade deliverable: against β₂ it consumes 0.5% of the room, leaving a
band 2.256 exponents wide for a provable law to land in.

**Three, a new measurement: the Gaussian ρ law is TRUE at every level it can
be checked, with 20–40% of margin.** `C_true = sup|ρ̃|/(√⟨ρ²⟩·√(2 lnW))` =
0.6362, 0.6044, 0.8022, 0.7554, 0.7830 at z = 13..29, exact over complete
periods — the first direct measurement of sup|ρ| in the corpus (everything
prior measured sup|R_H|). Unlike the sharp R_H law, which is TPC-implying and
already violated by 0.6% at z = 19, the ρ law is legal, looser, and so far
true.

**Four, the literature verdict: the sufficiency curve's weakest point is ABOVE
published strength — no headline, the theorem is genuinely open.** The
strongest published instrument for this remainder (Bettin–Chandee 2015,
trilinear Kloosterman fractions, priced 2026-08-19 at our configuration)
delivers exponent 5.0907, i.e. 0.824 of exponent ABOVE the 4.26645 ceiling
(θ_total 1.0303 in print against 1.2090 needed). Nothing in print bounds the
two-class object at any exponent (ABSENT, owning convention, re-verified
2026-08-18). One held reframing finding: at the sufficiency ceiling the
working point is s/u = 0.703, INSIDE Lemma V's stated range — the β₂ target,
unlike the TPC target, is Lemma-V territory (§5, HELD).

---

## 0. CUSTODY

Everything measured tonight is in `research/rho-maxlaw-01-sufficiency.js`
(embedded tail, `qc/embed.js --check`: code-sha256 matches, out-sha256
matches). Division of labour, per the standing compute rule:

- **Recomputed** (cheap): the conditional Gaussian-ρ column at z = 13..31 from
  the repo's own `row(z, ·, 3.0)` — all six rows MATCH the embedded tables
  digit for digit at printed precision (`theta-ladder.md` §2 at z = 19..31;
  `phase1-T4-maximal-law.md` §2 at z = 13, 17). The column is H-free and is
  NOT touched by the u = 3.2 defect, which lives only in §5b's old
  `need_true`; nothing from the refuted §5b column is used anywhere here.
- **Cited** (expensive, custody-bound): the z = 37..47 conditional rows from
  `theta-ladder.md` §2 (independently reproduced by T4's custody block;
  re-running them is ~2800 s at z = 47). Their cheap fields (n, M, lnW) were
  recomputed from `buildTerms` and MATCH exactly.
- **Cited**: the corrected self-consistent windows `nP(z)` from
  `history/staging/theta-selfconsistent.md` (exact 60, 126, 198, 258, 390,
  588 at z = 13..31; prefix lower bound 2301 at z = 47), post-rewrite
  instrument only.
- **New measurement**: sup|ρ̃| exact over complete periods at z = 13..29.
  Walker controls in-pass: brute force at z = 13 (identical to 1e-8), period
  mean = −M/2 at every z, walked variance against the PROVEN closed-form
  ⟨ρ²⟩ to 1.2e-8 %, period-closure drift ≤ 4.3e-7.
- **Estimator control**: the OLS fitter returns slope 2.500000 on a known
  z^2.5 truth at the same ten z before any fit is quoted, and the nine-point
  θ_G drift refit reproduces T4 §2b's 0.3746 ± 0.0404 as 0.3747 ± 0.0405.

β₂ = 4.26645 per `paper/beta2-note.md` / `SEARCH-CONVENTIONS.md` §4 (four-
decimal rounding of Diamond–Halberstam's twenty-decimal value; unattributed
per the citation discipline there). Units: windows in positions (integers);
every comparison of strengths is stated in exponents base z, dimensionless.

---

## 1. THE STATEMENT

**The object.** Fix the family parameter s = 3.0 (any s > 1+√e = 2.6487 gives
a positive main term; 3.0 is the measured family). For a prime z let
W = P(z) = ∏_{p<z} p, D = z^s, and let λ± be the Rosser–Iwaniec linear-sieve
weights of level D for the two systems {r ≡ 0 mod p} and {r ≡ −2 mod p},
p < z. The certificate's divisor-pair lattice is the list of terms indexed by
(d₁, d₂) in the support pairs of the three blocks (−,+), (+,−), (+,+), with
d₁, d₂ | P(z) squarefree and gcd(d₁,d₂) | 2 (all other pairs have empty joint
class); each term carries modulus q = [d₁,d₂], CRT class c (from r ≡ 0 mod
d₁, r ≡ −2 mod d₂), and weight w = ε_block·μ(d₁)μ(d₂) ∈ {±1}. n(z) is the
term count and M(z) = Σ w/q > 0 the position-free main density. The
**potential** is

    ρ_z(y) = Σ_j w_j · ψ((y − c_j)/q_j),      ψ(t) = t − ⌊t⌋ − 1/2,

periodic mod W with exact period mean −M/2 (each ψ term averages −1/(2q));
write ρ̃ = ρ + M/2 for the centered potential, and ⟨ρ²⟩ for its period
variance, which has a PROVEN closed form (`sift-limit-lemmaV.js` S2). The
certificate identity, also proven, is T(x) = H·M + R_H(x) with
R_H(x) = ρ(x) − ρ(x+H).

**The law — five forms, weakest sufficient upward** (each implies the win of
§2 when its parameter clears the stated threshold):

- **F0 (tautological floor, not a law):** nP(z) ≤ z^{β₂−ε}. This is the win
  restated; pricing stops being informative here. Listed so the ladder has
  its bottom.
- **F1 (one-sided, single-window):** ∃ε > 0, z₀: for every z ≥ z₀ there is an
  H ≤ z^{β₂−ε} with min_x R_H(x) ≥ 1 − H·M. Only the lower deviation of R_H
  matters; upper deviations are harmless. This is the literal weakest
  law-shaped form.
- **F2 (sup-norm Lemma V at the ceiling):** at s = 3.0, for H ≍ z^{β₂−ε}:
  sup_x |R_H(x)| ≤ H·M − 1. Note s/u = 3/4.26645 = 0.703, INSIDE Lemma V's
  stated range s ≥ (0.63+δ)u (see §5; every delivered exponent in (3, β₂)
  keeps the working point inside that range, and only exponents ≤ 3 leave
  it). Lemma V's own conclusion ≪ H/log³H is strictly stronger than needed.
- **F3 (the ρ maximal law, absolute form — THE NAMED TARGET):** **RML(α):
  ∃C, z₀ such that for every prime z ≥ z₀, sup_{y∈ℤ/W} |ρ̃_z(y)| ≤ C·z^α.**
  Sufficient whenever α < β₂ = 4.26645. Via |R_H| ≤ 2 sup|ρ̃| this implies F2
  and F1 at every window and needs no per-H information.
- **F4 (Gaussian-units form):** RML_G(λ, C): sup|ρ̃_z| ≤ C·z^λ·√⟨ρ²⟩·√(2 lnW).
  λ = 0, C = 1 is the corpus's Gaussian maximal law
  (`sift-limit-lemmaV.js`:466), the form measured TRUE at z = 13..29 (§4).
  Sufficient whenever λ < λ_max(z) uniformly (the §3 curve).

Quantifier discipline: the sup is over ALL W positions of the complete period
(equivalently all y ∈ ℤ); one constant uniform in z; s fixed. **What this law
is NOT:** the sharp maximal law for R_H at the operative (~0.5 z²) lag, which
is TPC-implying and therefore not a legal target
(`phase1-T4-maximal-law.md` §2); the entire difference between the two is the
lag-H cancellation between ρ(x) and ρ(x+H), and the fact V1 (`g | H` kills a
pair's contribution) says that is where all the cancellation lives. RML prices
the certificate with that cancellation FORFEITED, which is exactly why it is
legal and why it can only reach exponents, never TPC.

**The owning-convention statement (per `SEARCH-CONVENTIONS.md` §1).** For the
two-class rough set {n : n(n+2) coprime to P(z)} — OEIS A144311's object, the
"bounded number of residue classes per prime" convention of MO 88323 — RML is
a position-uniform sup-norm bound on the signed remainder of the linear-sieve
upper/lower approximants composed over the divisor-pair lattice: the κ = 2
analogue of the error analysis that powers Iwaniec's Jacobsthal bound
(g(q) ≪ log²q, exponent 2 at primorials, κ = 1; Iwaniec 1978, carried per
`sift-limit-attack.md` §4.5's account of the 1971/1980 engine). The statement
class it would strengthen: **Jacobsthal-type upper bounds for integers
avoiding two residue classes per prime**, where the only standing exponent is
β₂ = 4.26645 (DHR 2008 sifting limit, composition `paper/beta2-note.md`),
unimproved since 2008 and with NO published bound at any exponent for the
two-class case. For a proof attempt, the estimate's own owning convention is
**bilinear/trilinear forms with Kloosterman fractions** (§1 row: DFI 1997;
Bettin–Chandee 2015).

---

## 2. THE PRICING LEMMA, WITH THE RIDERS PAID

**Lemma (schema).** Assume RML(α) with α < β₂. Set H(z) = ⌈(2C·z^α + 1)/M⌉.
Then for every z ≥ z₀ and every position x, T(x) ≥ 1, hence every window of
length H contains a twin-admissible r, hence

    G₂(z#) ≤ H(z) ≪ z^α · ln²z ≪ z^{α+ε}.

Chain, graded: (i) T = HM + R_H is a PROVEN identity; (ii) |R_H(x)| =
|ρ̃(x) − ρ̃(x+H)| ≤ 2 sup|ρ̃| — the mean cancels exactly in the difference, so
the centered sup is the right object; (iii) HM − 2 sup|ρ̃| ≥ 1 by the choice
of H; (iv) the Brüdern–Fouvry pointwise inequality makes T(x) a lower bound
on the twin-admissible count in (x, x+H] [PROVEN, pilot-verified]; (v)
M ≥ c(s)/ln²z for s = 3.0 > 1+√e [standard linear-sieve asymptotics; measured
M·ln²z = 0.34–0.37 flat across z = 13..47, consistent]. The only unproven
ingredient is the law itself.

**Rider 1 — T ≥ 0 vs T ≥ 1, paid explicitly.** The fixed point of
`f(H) = ⌈sup|R_H|/M⌉` certifies T ≥ 0, which certifies nothing
(`theta-selfconsistent.md` reading 8; the operative window is the last fixed
point plus one). The lemma therefore uses the strict form throughout: the +1
in (2S+1)/M is the certificate-side transplant of `--strict`'s
`g(H) = ⌈(sup|R_H|+1)/M⌉`. Its price is Δneed = 1/M = O(ln²z), measured
17.9 → 43.2 positions across z = 13..47, i.e. d_strict = 0.04467 → 0.00079 in
exponent: carried, and never the difference between verdicts.

**Rider 2 — the floor.** Positivity is observed only from nP(z) onward, so no
correct law delivers a window below nP: the deliverable exponent band at z is
[th(nP), β₂). With the corrected instrument's values the floor is 1.5963,
1.7070, 1.7960, 1.7710, 1.7718, 1.8569 at z = 13..31 (exact) and ≥ 2.0106 at
z = 47 (prefix bound). **The (31, 47] crossing is the floor passing the z²
zone budget: it removes the TPC-grade deliverable and consumes 0.5% of the
band against β₂** — at z = 47 the band is still 2.256 exponents wide. The
crossing is a fact about what a PERFECT law could deliver, not about whether
a weak law exists; for this item it prices the bottom of the band, and the
top (β₂) is untouched.

---

## 3. THE SUFFICIENCY CURVE

From the producer's S3 (exponents base z; d_strict included above):

```
   z   theta_G   lambda_max   factor z^lam   alpha_max   th(nP) floor
  13   1.94696     2.31949         383.5       2.8712       1.5963
  17   2.01948     2.24697         581.8       2.9425       1.7070
  19   2.15885     2.10760         495.6       2.9344       1.7960
  23   2.18269     2.08376         687.9       2.9685       1.7710
  29   2.15889     2.10756        1208.1       3.0369       1.7718
  31   2.25232     2.01413        1008.8       3.0361       1.8569
  37   2.34513     1.92132        1030.4       3.0848        —
  41   2.38567     1.88078        1079.7       3.0995        —
  43   2.43473     1.83172         981.9       3.0954        —
  47   2.48199     1.78446         963.4       3.1085      ≥2.0106
```

Reading the columns: `theta_G` is what the Gaussian law (F4 at λ = 0) buys —
TODO 0's "measured at 2.43 at z = 43 and rising", reproduced here (2.43473).
`lambda_max = β₂ − theta_G` is the curve itself: **how much weaker than
Gaussian, in z-exponent, a provable law may be at that z and still beat β₂.**
`alpha_max = log_z((z^{β₂}M − 1)/2)` is the finite-z absolute ceiling on
sup|ρ̃| with constant 1 (asymptotically it tends to β₂; at measured z it reads
~3.1 because the ln²z and the constants bite at small z). The weakest measured
point is z = 47: λ_max = 1.78446, a factor of 963.

**Calibration of how much room that is.** The trivial ℓ¹ law
sup|ρ̃| ≤ (n+M)/2 — no cancellation at all, pure triangle inequality —
already suffices at every measured z ≤ 47 (need_triv/z^{β₂} = 0.27 rising to
0.9323 at 47) and dies at z ~ 64 on the window fit
(d ln need_triv/d ln z = 5.1178 ± 0.2161). This is the Bonferroni x ≤ 227
phenomenon at a new instrument: at small z the β₂ comparison flatters any
bound, so finite-z sufficiency is a calibration and NOT a result. What it
calibrates: near the measured range the asymptotic ask over
absolute-value accounting is under one unit of exponent, while the Gaussian
truth (if it persists) leaves ~2.3 units of measured cancellation — the
theorem's whole difficulty is asymptotic, and the window between "trivially
true at finite z" and "provable for all z" is where every route here has
died.

**Between Gaussian and sufficient, the measured margin.** The new S1
measurement puts the truth at C_true = 0.60–0.80 of the Gaussian form at
z = 13..29 (full periods; the walker verified four ways). So at measured z the
distance from TRUTH to the sufficiency ceiling is the full λ_max plus the
20–40% Gaussian margin; a law loose by three orders of magnitude at z = 47
still finishes. Nothing about that margin is asymptotic; it is stated to
show the target's slack is enormous where it can be seen at all.

---

## 4. WHAT IS NEW IN THE MEASUREMENT COLUMN

sup|ρ̃| itself had never been measured (every prior supremum in the corpus is
of R_H at some window). Exact over complete periods:

```
   z        W          sup|rho~|   sqrt<rho^2>   sqrt(2lnW)   C_true
  13        2,310        2.62013     1.04645       3.9357     0.6362
  17       30,030        4.33665     1.58005       4.5409     0.6044
  19      510,510        9.15247     2.22539       5.1270     0.8022
  23    9,699,690       12.10617     2.82533       5.6723     0.7554
  29  223,092,870       17.90249     3.68727       6.2005     0.7830
```

The Gaussian ρ maximal law holds at every measured level, margin 20–40%, no
trend a five-point column can call. Contrast: the SHARP law (same template on
R_H at the operative window) is violated at z = 19 by 0.6% (T4 §4). The legal
law is, so far, true; the TPC-implying law is, already, false as literally
stated. That asymmetry is consistent with T4's diagnosis that the sharp form
is "the wall wearing a different hat" while the ρ form genuinely forfeits the
lag cancellation.

z = 31 was not walked (W = 6.47e9, ~500 s by the theta-selfconsistent rate;
the machine stays light tonight). It is the next exact point.

---

## 5. THE LITERATURE POSITION

Position assembled from the standing registries (`SEARCH-CONVENTIONS.md`
§§1, 3, 4; `PRIOR-ART.md`; `REFUTED.md`). **No new literature search was run
tonight**; every row below carries its own prior verification date, and
absences are quoted with where the corpus looked.

**The object has no published bound.** No published upper bound on the
two-class Jacobsthal function exists at ANY exponent, conditional or not —
searched in the owning convention (A144311's wording; MO 88323's "bounded
number of residue classes per prime"), 2026-08-18, re-verified independently
the same day (`SEARCH-CONVENTIONS.md` §3; `sift-limit-attack.md` §5). β₂
itself is unimproved since DHR 2008 and everything published after is worse
at κ = 2 (Blight 4.45, Franze 4.516, Opera de Cribro 4.83; §4 table). So any
RML(α<β₂) proof would not strengthen a published two-class statement — it
would create the first one below the sifting-limit default.

**The one-class lineage the law parallels.** Iwaniec's g(q) ≪ log²q — at
primorials, exponent 2 — is the κ = 1 instance of exactly this pipeline:
linear sieve plus remainder control uniform in position. At κ = 1 the trivial
remainder accounting already suffices for exponent 2+ε (level below window);
at κ = 2 the coupled accounting gives 5.2974 > β₂, which is WHY a genuine
cancellation law is the ask. The MO 37679/52890 route (zeb 2011) derives
j(x#) ≪ x^{4.032} from a sieve error exponent at dimension one — the shape of
our pricing lemma, one dimension down; per §5's discipline its 4.032 is never
tabled beside 4.2665.

**The strongest print for the operative remainder, priced.** The remainder
reduces exactly (BigInt-verified, 2655 pairs) to trilinear forms with
Kloosterman fractions; the published estimates read γ = 1.009638 (DFI 1997,
worse than trivial at our level split) and γ = 0.970624 (Bettin–Chandee
2015) against a needed 0.824975 — in θ_total currency 1.0303 delivered
against 1.2090 needed, returning exponent **5.0907, i.e. 0.824 of exponent
ABOVE the sufficiency ceiling** (`sift-limit-attack.md` §4.5;
`history/staging/attack-sqrt-cancellation.md`). The position-uniformity gap is
structural on top of that (their Remark 1's charge is O(1) only for
x ≪ H^{1.21} while our x reaches exp(H^{0.2344})). Caveat, stated rather than
hidden: that pricing was computed at the R_H/Lemma-V decoupled configuration;
the ρ-potential configuration was not separately priced tonight (NOT
REACHED), and nothing suggests the sup over a full period is cheaper — it is
the same lattice with a longer position range.

**Verdict for (c): the sufficiency curve's weakest point is ABOVE published
strength everywhere.** Published instruments deliver 5.09+ where the ceiling
is 4.26645; published two-class bounds do not exist; the smooth-modulus and
algebraic-geometry branches are CLOSED on hypotheses (`REFUTED.md` rows,
2026-08-20); the field's special-level constructions certify nothing on the
smallness side (`special-levels-recon.md`). **No headline: nothing in print
implies even the weakest sufficient form.** The quantified distance from the
print frontier to the ceiling is 0.1787 of θ_total (1.2090 − 1.0303), the
same frontier gap already recorded for Lemma V — the ρ reframing does not
cheapen the estimate; what it changes is the LEGALITY (not TPC-implying) and
the win condition (any α < 4.26645, rather than the zone budget).

**HELD, one adversarial pass wanted before this moves anywhere live:** at the
sufficiency ceiling the working point is s/u = 3/4.26645 = 0.703, inside
Lemma V's stated range s ≥ (0.63+δ)u — and every delivered exponent in
(3, β₂) stays inside it. TODO 0's "moot and moving further away, s/u =
1.62–1.72" is a statement about TPC-grade windows and is correct there; for
the β₂ target the working point RE-ENTERS the range Lemma V was posed for.
If the pass confirms, the Lemma V sub-question is un-mooted FOR THIS ITEM
(in its weakest F2 form, at u near β₂ only), and the κ = 1 precedent
(Iwaniec 1980) plus the Kloosterman toolbox are pointed at the right ask for
the first time: a 0.18-of-θ_total improvement, not a factor-2 miracle.

---

## 6. READINGS

1. **STATED.** The ρ maximal law in five forms (F0–F4), quantifiers explicit,
   in corpus vocabulary and the owning convention; the pricing lemma
   RML(α<β₂) ⟹ G₂(z#) ≪ z^α ln²z with only the law unproven; both riders
   (T ≥ 1 accounting; the nP floor) paid explicitly. §§1–2.

2. **MEASURED.** The sufficiency curve λ_max(z) = β₂ − θ_G(z) runs 2.31949 →
   1.78446 across z = 13..47; weakest point z = 47, allowed looseness factor
   963 over the Gaussian form. The strict accounting costs 0.04467 → 0.00079
   in exponent and never a verdict. Producer S3.

3. **MEASURED, new.** The Gaussian ρ law is true at every exactly measurable
   level: C_true = 0.6362, 0.6044, 0.8022, 0.7554, 0.7830 at z = 13..29 over
   complete periods, walker verified against brute force, closed-form
   variance (1.2e-8 %), period mean, and period closure. First direct sup|ρ|
   in the corpus. Producer S1.

4. **MEASURED, finite-z calibration only.** The trivial ℓ¹ law already
   suffices at every z ≤ 47 (ratio 0.27 → 0.9323) and dies at z ~ 64 on the
   window fit (slope 5.1178 ± 0.2161, estimator calibrated in-pass). The
   Bonferroni-x≤227 phenomenon; explicitly NOT a route and NOT a headline.
   Producer S4.

5. **MEASURED / CITED.** The floor: th(nP) = 1.5963..1.8569 exact at
   z = 13..31, ≥ 2.0106 at z = 47. The (31, 47] crossing kills the exponent-2
   deliverable and consumes 0.5% of the room to β₂, leaving a 2.256-wide
   band. The crossing prices the floor, not the ceiling. Producer S5.

6. **MEASURED, two models, NEITHER CALLED.** Where the room closes: linear
   drift (slope 0.3909 ± 0.0363; nine-point control reproduces T4's 0.3746)
   says z ~ 5·10³ [2.4·10³, 1.2·10⁴]; the ⟨ρ²⟩ power model (slope 2.2355 ±
   0.1418 here, 2.4625 ± 0.2184 on theta-ladder §3's window) says θ_∞ =
   2.74 ± 0.14 and the room never closes. Ten points over one octave decide
   nothing between them. Producer S6.

7. **INFERRED from the standing registries (no new search).** Nothing
   published implies any sufficient form: best print delivers exponent
   5.0907 against the 4.26645 ceiling (gap 0.1787 of θ_total), and no
   two-class bound exists in print at any exponent. The sufficiency curve
   sits above published strength at every point — the theorem is open in the
   honest direction, with the truth (measured) two exponents below the
   ceiling. §5.

8. **HELD (one adversarial pass wanted).** The β₂-target working point
   s/u = 0.703 is inside Lemma V's stated range, for every delivered
   exponent in (3, β₂): the "Lemma V is moot" verdict is TPC-specific and
   does not transfer to this item. §5.

## 7. NOT REACHED

- **sup|ρ̃| at z = 31** (W = 6.47e9, ~500 s): the next exact point of the
  C_true column, deferred under tonight's compute ceiling.
- **The conditional row at z = 47 recomputed** rather than cited (~2800 s
  O(N²)); the cited row is custody-bound and its cheap fields verify, but a
  full local reproduction was not bought.
- **An analytic upper bound on ⟨ρ²⟩(z)** from its own closed form (a proven
  z^c would turn the F4 curve into an unconditional F3 statement and pin
  θ_∞); not attempted, and it is the natural next lemma-shaped object.
- **Pricing the Kloosterman import at the ρ-potential configuration**
  (position range e^{θ(z)} instead of the Lemma-V window); the recorded
  pricing is at the R_H configuration and was carried over with that caveat
  stated.
- **The s-freedom.** Everything here is s = 3.0. The crude column is nearly
  s-insensitive (`theta-ladder.md` §5a) but the sufficiency curve's s
  dependence — in particular whether some s < 3 lowers θ_G at large z — was
  not measured.
- **The adversarial pass on the HELD s/u finding** (reading 8).

## 8. GATE

`node research/qc.js` after the producer and this report were written:
**TOTAL 0** — no check names `research/rho-maxlaw-01-sufficiency.js` or this
file. The producer's tail verifies: `qc/embed.js --check` reports code-sha256
matches, out-sha256 matches, body bit-honest. (The standing advisories —
embed-backlog, sourcing-backlog — are pre-existing and not part of TOTAL.)
