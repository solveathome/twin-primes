# The arithmetic reduction of the twin sum: one document

<!-- ledger
id: Q-twin-reduction
status: ANSWERED
todo: C
parity: Consolidation only. The reduction uses Vaughan's identity twice, quantitative PNT, Bombieri-Vinogradov for Lambda and for mu, the excluded-prime Mobius mean and exact CRT algebra; the regional bounds use classical completion with Ramanujan and Weil inputs and arbitrary bounded coefficients. No step below extracts cancellation from Mobius signs across the remaining domain, and no obstruction theorem is asserted; the corner's status as the two-point Mobius correlation is a derived identification, not a necessity claim.
question: What has the arithmetic campaign of 2026-09-05 and 2026-09-06 actually established about the twin sum, at what calibration, what exactly remains, and what would suffice?
verdict: Consolidates the checked regional reduction S=C2*x+E_dagger+O_H(x/log^H x), its sufficient unbounded-scale margins, coefficient definitions and source dependencies. Later complete smooth and centered formulations are owned by RESEARCH-HANDOFF.md and their linked derivations. No new arithmetic estimate is supplied. Imported theorem proofs retain their stated review limits; every sufficient twin margin remains OPEN.
-->

**Twin-prime infinitude remains OPEN. Nothing in this document is a new
estimate.** It consolidates the arithmetic campaign into one place so that
a reader can judge the whole in one sitting. Every statement carries its
calibration; the owning derivation is linked; the review state is stated.
This is an internal document under the standing moratorium.
For the later complete smooth and centered formulations, read
[RESEARCH-HANDOFF.md](RESEARCH-HANDOFF.md) section 3. Current assignments
are in [RESEARCH-EXECUTION.md](RESEARCH-EXECUTION.md).

## 1. The statement

Throughout x = 2^j, J_x = (x/2, x], mu is the Mobius function, Lambda the
von Mangoldt function, and C_2 = prod_{p>2} (1 - 1/(p-1)^2) the twin
constant. The cutoffs are U = V = floor(x^(6/25)) and Y = Z = floor(x^(1/20)).

**Reduction (derived, reviewed three times, no defect).** For every fixed
H > 0,

\[
 S(x) := \sum_{n\in J_x}\Lambda(n)\Lambda(n-2) = C_2x + E_\dagger(x) + O_H(x/\log^H x).
\]

Here E_dagger is the exact weighted compatible CRT endpoint sum of
[residual-coverage.md (16)](residual-coverage.md), restricted to the
domain W_dagger of [grouped-divisor-moment.md (19)](grouped-divisor-moment.md):
divisors U < d <= D_0, Y < e <= E_0 with

\[
 de>\lfloor x^{3/4}\rfloor,\quad d^5e^2>\lfloor x^{49/20}\rfloor,\quad
 \bigl(d>\lfloor x^{151/200}\rfloor\ \text{or}\ de^3>\lfloor x^{321/200}\rfloor\bigr).
\]

The underlying arithmetic object is the residual over the determinant
equation,

\[
 R(x)=\sum_{\substack{d>U,\ k>V,\ e>Y,\ t>Z\\ dk-et=2,\ dk\in J_x}}
 \mu(d)\mu(e)\beta_V(k)\beta_Z(t),\qquad
 \beta_W(k)=\sum_{r\mid k,\ r>W}\Lambda(r),
\]

obtained from S by Vaughan's identity applied to Lambda(n) and then to
Lambda(n-2). E_dagger is what remains of R after the density is subtracted
and the controlled regions are removed.

**Chain of contributions.** Six classical pieces carry S down to the
first endpoint remainder E_>: the main term by quantitative PNT, the
Type I comparison by Bombieri-Vinogradov at level x^(12/25), the
comparison term by an Euler-product identity, the second Type I pieces by
Mobius Bombieri-Vinogradov at level x^(1/10), and two excluded-prime
Mobius means. Two further links move E_> to E_* (residual-coverage) and
E_* to E_dagger (the grouped moment). All three links were adjudicated
independently on 2026-09-06 with no defect; the record is
[chain-review-0906.md](chain-review-0906.md). The block shape used by every
dispersion estimate, sum_m A_left(gm) Y(m) with a separate left
coefficient in m, a separate right coefficient in u and a harmonic weight
in h only, was reconstructed and verified exactly. The Mobius
Bombieri-Vinogradov input had no published theorem statement and is now
derived from four numbered results of Koukoulopoulos GSM 203 in
[mobius-bv-derivation.md](mobius-bv-derivation.md), itself reviewed; the
search for a published statement ran in the owning convention of
[SEARCH-CONVENTIONS.md §1](SEARCH-CONVENTIONS.md), Mobius function in
arithmetic progressions, Bombieri-Vinogradov.

Calibration of the reduction: a checked argument, not a refereed theorem.
The constants are ineffective (Siegel-Walfisz enters), so no effective
numerical onset is supplied; the asymptotic statements still have onsets.

## 2. What suffices

Three sufficient formulations, each OPEN. The first implies the second;
the second and third are equivalent with existential positive constants:

1. A fixed fraction: E_dagger(x) >= -(1-eta) C_2 x + o(x) for fixed eta > 0
   on unbounded dyadic scales.
2. A shrinking margin: C_2 x + E_dagger(x) >= c_0 x / (log x)^K for fixed
   c_0, K > 0 on unbounded dyadic scales
   ([endpoint-target-audit.md](endpoint-target-audit.md)).
3. The block-summed form: 2 C_2 2^j + sum_{i<=j} E_dagger(2^i) >= c_0 2^j / j^K
   on an unbounded set of j ([consumer-comparison.md](consumer-comparison.md)).
   At K = 0 this is positivity of Tao's delta_x along unbounded scales.
   Equivalence follows from nonnegativity and
   sum_{i<=j} 2^i/i^K = (2+o(1))2^j/j^K, as proved in the corrected comparison.

Each implies infinitely many twin primes with a lower count
c x / log^(K+2) x on the witnessing scales. The dictionary to Tao's
asymptotic-sieve scalar is E_dagger(x)/x = C_2 (2 delta_x - delta_{x/2} - 1) + o(1);
since delta_x is defined only up to o(1), the K > 0 forms lie below that
normalisation's resolution. Unconditionally only delta_x >= 0 and the
Selberg upper bound are known; under Elliott-Halberstam, 0 <= delta_x <= 2.
No lower bound on delta_x is recorded in the sources reviewed in
[consumer-comparison.md](consumer-comparison.md), searched in the owning
conventions of [SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md); Tao's 2016
notes assert the same, even under every other standard conjecture (blog
assertion, checked at source).

## 3. What is controlled, and by what

The grouped second moment of [grouped-divisor-moment.md](grouped-divisor-moment.md)
bounds, for arbitrary bounded right coefficients and after one Cauchy
inequality in the left divisor, each block by x^epsilon times

\[
 \sqrt{Mx}+x^{3\tau/2}\bigl(\sqrt M N^{3/2}+M\bigr),
\]

with M ~ x^a, N ~ x^b the expanded lengths, a = delta + 6/25, b = nu + 1/20
for d ~ x^delta, e ~ x^nu. The three budgets are (1+a)/2 from the equal
rational frequencies, a/2 + 3b/2 from the nonzero Weil terms, and a from
the complete periods; the left orientation swaps a and b. Together with
the earlier dispersion notes this controls, to O_H(x/log^H x), every
rectangle with

\[
 \delta+\nu<19/25\quad\text{or}\quad5\delta+2\nu<123/50\quad\text{or}\quad
 (\delta<19/25\ \text{and}\ \delta+3\nu<161/100),
\]

which includes the benchmark d ~ e ~ x^(2/5) with budgets 41/50, 199/200,
16/25 before small losses. The uniform product threshold is every fixed
exponent below 19/25 and has not moved; the witness (8/25, 11/25) lies
outside all three regions. Both gcd branches, both endpoint conventions,
all coefficient sectors including prime powers, complete periods, the
full positive majorant and independent divisor twists are retained. No
additional Mobius-sign cancellation is assumed in the grouped moment.
The density and upstream arithmetic reductions do use named Mobius mean
estimates. Finite
validators check identities and rational bookkeeping; they prove no rate.

## 4. The ceiling of this argument shape

[reachability-coverage.md](reachability-coverage.md), derived and reviewed
twice. Write p = 19/25 - delta and q = 19/20 - nu. The zero-frequency and
period budgets are 1 - p/2 and 1 - p in the right orientation, 1 - q/2
and 1 - q in the left; the cross term enters neither. Therefore:

- For a prescribed fixed exponent margin eta_0, the corner
  S_0 = {p < 2 eta_0} ∩ {q < 2 eta_0} fails that margin for every
  nonzero-kernel saving. Smaller positive margins can reach fixed interior
  points under a sufficiently strong hypothetical kernel saving; only
  p=q=0 retains zero budget one for every margin. It
  lies inside W_dagger. Neither the trivial branch nor the density term
  reaches E_dagger there. The edges are invariant under the cutoff choice
  within Vaughan's identity, since a = delta + w <= 1 whenever k > x^w and
  dk <= x.
- A uniform saving gamma in the moment exponent reduces the leftover to
  S_0 exactly at gamma = 2 and at no smaller value; the target priced at
  one box is gamma > 3/50. Applied uniformly, that target removes about
  3 percent of the leftover area. Clearing either edge apart from the
  corner also costs gamma tending to 2.
- At fixed eta, the prime-cofactor subfamily has absolute term mass
  of order eta^2*x*log^2 x (corner-correlation §1.5). Its unsigned
  envelope exceeds x/log^K x by order log^(K+2) x. This is not a lower
  bound on the signed sum or the mass claim for a single dyadic box.
- The diagonal u_1 = u_2, h_1 = h_2 is nonnegative and has the upper
  budget O(B²C²f²MN/A). No uniform nonzero lower bound or unavoidable
  first-Cauchy norm floor follows for arbitrary coefficients; see
  signed-moment and round-review-0906. These are upper-budget limits.

This is a property of one argument shape: arbitrary bounded coefficients,
one Cauchy in the left divisor, zero frequencies bounded absolutely. It
is not an impossibility theorem.

The bounds used above have fixed epsilon and margin parameters. The
O(loglog x)-width window proposed in reachability-coverage is geometric
bookkeeping, not proved coverage with those losses; see its corrected §2.5.

## 5. The corner

[corner-correlation.md](corner-correlation.md), derived, reviewed once with
repairs applied. On S_0 each cofactor has exactly one prime power above
its cutoff up to negligible classes, the CRT modulus exceeds x by a fixed
power so the sawtooth formalism drops out, and the density on S_0 is
O_H(x/log^H x). Hence E_dagger on S_0 equals R on S_0 up to
O_H(x/log^H x), and on the sub-family where the cofactors are exactly
primes,

\[
 R\big|_{S_0,\ s=s'=1}=\sum_n \mu(n)\mu(n-2)L(n)L'(n-2)+O(x^{19/20+\epsilon}),
\]

with L(n) = sum over primes r|n, r>V, D_1<n/r<=D_0 of log r,
and L' likewise with Z,E_1,E_0 on n-2. These n-dependent cofactor
windows cannot be replaced by fixed bands without a new error estimate. This is a two-point Mobius
correlation at the fixed shift 2 with nonnegative prime-band weights. The
average over the prime dilations (r, r') is a re-indexing of that single
n-sum and offers no additive-shift range, so averaged Chowla does not
apply. Absolute control needs a log^(2+eps) x saving on the sub-family
relative to its mass, where no unconditional saving of any size is known
for two-point correlations at a fixed shift on the natural average.
The full corner is sum_n C(n)C'(n-2), retaining s>1 or s'>1, signed
weights and non-squarefree branches. Controlling the displayed subfamily
alone does not control it. One-sided control of the full corner is, given
the full complement at O_H(x/log^H x), inter-derivable
with the sufficient margin itself: it is the conclusion, not a lemma.

Prior art. Tao's 2016 notes on the Bombieri asymptotic sieve state that on
GEH the twin asymptotic is equivalent to
sum_n mu(n) 1_R(n) mu(n+2) 1_R(n+2) = o(x/log^2 x) for the rough indicator
1_R, and explain that recent Chowla progress relies on multiplicativity at
small primes, which that weight destroys. Maynard's ICM 2022 survey poses
the four-variable determinant-2 sum with arbitrary coefficients as
Question 17. The identification here is an independent rediscovery of the
shape by a different route, with two differences: the weight L restricts
a large prime factor and leaves small primes free, so Tao's non-transfer
reason does not apply verbatim; and the required relative saving here is
log^(2+eps) x against his o(1), because the whole prime band is summed
with log r weights.

## 6. What was priced and failed

All of these are failed upper bounds at their stated scope. None says
anything about the sign or size of the actual correlation.

| interface | box | result | record |
|---|---|---|---|
| Bettin-Chandee Theorem 1 on the separated trilinear Kloosterman fraction | (8/25, 9/20) | 129/125 against required 1; whole deficit at common divisor 1 | [small-divisor-kernel.md](small-divisor-kernel.md) |
| Duke-Friedlander-Iwaniec (1.1) | same | 1267/1200 | same |
| Spectral large sieve diagnostic | same | trivial for all common divisors up to x^(19/50) | same; [structural-literature-audit.md](structural-literature-audit.md) |
| Type I/II decomposition of the left Mobius coefficient | same | best block 41/40; balanced piece returns to 103/100; corner untouched, needs per-block saving eta' > 1 against the square-root ceiling 1/2 | [left-divisor-signs.md](left-divisor-signs.md) |
| Fouvry-Kowalski-Michel algebraic twists | same | prime modulus required; at most 1/48 against a required 3/25 | same |
| Wright, subdyadic Bettin-Chandee | same | hypothesis is on the inverted variables, not the harmonic band; 1157/1000 when forced | same |
| Guria, Kloosterman fractions averaged over primes | corner | needs two variables of weight one and a main term; the corner has neither | [corner-correlation.md](corner-correlation.md) |
| Bettin-Chandee Corollary 1 directly on dk - et = 2 | whole domain | legal after moving the prime-power part of beta onto the coefficient side; adds exactly zero area; all-pieces region inside delta + nu < 2869/3900 | [determinant-corollary.md](determinant-corollary.md) |
| Averaged Chowla (Matomaki-Radziwill-Tao), logarithmic two-point Chowla (Tao), Tao-Teravainen, Helfgott-Radziwill, Pilatte | corner | wrong average type, fixed forms, or saving far below log^(2+eps) | [corner-correlation.md](corner-correlation.md), [consumer-comparison.md](consumer-comparison.md) |

Measurements, both negative and both in regimes where the object is
invisible: the actual Mobius signs give no advantage over random signs in
the kernel moment at x <= 2^30 ([kernel-sign-control.md](kernel-sign-control.md));
the corner correlation sits at random-sign size at x <= 2^36 and the actual
right prime band holds at most one prime below x = 2^70
([corner-measurement.md](corner-measurement.md)).

## 7. Relation to the published conditional routes

[consumer-comparison.md](consumer-comparison.md) matches the reviewed
Murty–Vatwani, Pintz and exceptional-zero routes to the sufficient
consumer, with their source and hypothesis limits. Those conditional
inputs are not established here. The comparison is scoped to the sources
read; it is not a classification of every possible proof.

[moving-cutoff-parity.md](moving-cutoff-parity.md) retains the missing
lower endpoint in a Murty–Vatwani displayed switch and derives a complete
dyadic repair. Its centered prime–Mobius consumer is specified in
[RESEARCH-HANDOFF.md](RESEARCH-HANDOFF.md) section 3 and remains OPEN.
The source repair is not a new discrepancy estimate or a refutation of
the surrounding conditional theorem.

## 8. Assessment

The reduction and fixed-margin regional arguments retain the review
scope in [handoff-review-0906.md](handoff-review-0906.md) and section 9
below. Imported theorems remain named inputs; the reviews did not reprove
every external theorem.

The later [round review](round-review-0906.md) and
[transition audit](transition-round-audit.md) own the corrected scale,
coefficient and transition bookkeeping. The complete smooth residual,
C3 absolute bound, factor-family limitations and centered alternative
are indexed in [RESEARCH-HANDOFF.md](RESEARCH-HANDOFF.md) section 1.
Read the owning derivation before using any of them.

The next task is an additional arithmetic estimate with its full payoff,
as specified in [RESEARCH-EXECUTION.md](RESEARCH-EXECUTION.md). The
regional estimates and failed interfaces do not establish a sufficient
twin margin or exclude every other method. No probability, completion
fraction or effective numerical onset is established.

## 9. Where each claim lives

Every number in this document is quoted from its owning note and traces
to that note's producer: exponents and regions to
[grouped-divisor-validation.js](grouped-divisor-validation.js) and
[reachability-validation.js](reachability-validation.js), interface
pricings to [small-divisor-kernel-validation.js](small-divisor-kernel-validation.js),
[left-divisor-signs-validation.js](left-divisor-signs-validation.js) and
[determinant-corollary-validation.js](determinant-corollary-validation.js),
measurements to [kernel-sign-control.js](kernel-sign-control.js) and
[corner-measurement.js](corner-measurement.js). Nothing here is computed
afresh.

| claim | owning record | calibration | review state |
|---|---|---|---|
| reduction S = C_2 x + E_dagger + O_H | prime-detection-spec, polylog-fold-transfer, shifted-prime-decomposition, signed-divisor-grouping, residual-coverage, grouped-divisor-moment | derived | three passes, no defect |
| sufficient margins | endpoint-target-audit, consumer-comparison | derived sufficiency; cumulative/dyadic forms equivalent at fixed K up to constants | independent review F1 |
| controlled region and budgets | grouped-divisor-moment, residual-coverage, prime-power-dispersion, sparse-dispersion, dispersion-range | derived | prior reports reviewed the local arguments, including prime-power-dispersion in report 19; this round does not reprove every dependency |
| ceiling of the moment shape | reachability-coverage | fixed-margin budgets derived; shrinking-margin extension unproved | independent review F3 corrects scope |
| corner identification | corner-correlation | full C-product and prime-cofactor subfamily distinguished | independent review F2 corrects summaries |
| priced interfaces | small-divisor-kernel, left-divisor-signs, determinant-corollary | derived negatives | reviewed |
| Mobius Bombieri-Vinogradov | mobius-bv-derivation | derived from published theorems | reviewed |
| measurements | kernel-sign-control, corner-measurement | measured | pre-registered falsifiers |
| prior art and conditional routes | consumer-comparison, structural-literature-audit | checked at primary sources where stated | scout reports |
