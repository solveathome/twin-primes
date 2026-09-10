# Independent review of the reduction chain, 2026-09-06

<!-- ledger
id: Q-chain-review-0906
status: ANSWERED
todo: C
parity: Review only. No new arithmetic estimate is asserted. The reviews check written derivations, imported theorem statements and quantifiers; they do not certify the OPEN endpoint margin and assert no universal obstruction.
question: Do the written derivations from S(x) down to E_dagger hold as stated, with every imported theorem used inside its hypotheses and every discarded term at the claimed O_H(x/log^H x) rate, and where does the chain remain unreviewed?
verdict: Three independent adversarial passes found no defect in the six classical contributions from S(x) to E_>, none in the grouped moment (1)-(20) including the E_* to E_dagger step, and none in the residual-coverage link E_> to E_*, whose block-shape derivation was reconstructed and verified exactly. Every imported theorem was confirmed in its primary source except the Mobius Bombieri-Vinogradov citation, which points at an exercise sheet and needs a published replacement. Stale o(x) rates in three note bodies were replaced. A checked argument is not a refereed theorem; the OPEN signed margin is untouched.
-->

**Twin-prime infinitude and the sufficient endpoint margin remain OPEN.
Nothing here is a new estimate.** This note consolidates the review
verdicts of 2026-09-06 so that the reduction chain's review state is
recorded in one place. Each review was carried out by a separate agent
with fresh context, read-only against the repository, and re-derived the
decisive inequalities rather than trusting the validators. The full
reports are retained in the session record; their content that matters
for reuse is below.

Roughly twenty derivation notes were written in about thirty-six hours
and integrated the same day. The repository's own record is that four of
five same-day integrations on an earlier campaign needed correction
within twelve hours. That is why review took two of five slots in this
wave before any new estimate was attempted.

## 1. Scope and calibration of "checked"

CHECKED means the reviewer followed the written argument line by line,
reconstructed the decisive inequality independently, and confirmed each
imported theorem's statement against its primary source. It does not mean
the note has been refereed by an outside expert. ASSUMED-UNVERIFIED means
the reviewer could not or did not verify the step and says so. DEFECTIVE
would name a file, equation and line; none was recorded in this wave.

The chain under review is, for every fixed H>0,

\[
 S(x)=\sum_{x/2<n\le x}\Lambda(n)\Lambda(n-2)
     =C_2x+E_\dagger(x)+O_H(x/\log^H x),
\]

assembled from three links: S to E_> (six classical contributions), E_> to
E_* ([residual-coverage.md](residual-coverage.md)), and E_* to E_dagger
([grouped-divisor-moment.md](grouped-divisor-moment.md) (19)-(20)).

## 2. Link one: S(x) to E_>, six contributions

The checklist is the table in
[endpoint-target-audit.md §1](endpoint-target-audit.md). All six rows
were adjudicated CHECKED.

| contribution | decisive point confirmed |
|---|---|
| M - C_2 x | b(p^j)=2C_2(1+1/(p-2)) at odd prime powers, zero on evens; quantitative PNT with the classical error gives C_2 x + O_H(x/log^H x) |
| I_1 - I_2 | the odd-d main terms match exactly through d/phi(d); D=UV<=x^(12/25) sits below the BV level x^(1/2) with a fixed power margin; the mesh interpolation in prime-detection-spec is required because the imported BV has no supremum over y<=x, and the note supplies it |
| -Bcal(b) | the Euler factor identity 1 - p^(-s)/((p-2)(1-p^(-s))) was re-derived; sum of h(e)/sqrt(e) converges uniformly in k and R |
| P_1 - P_2 | every congruence kd = 2 (mod l) reduces to a primitive class modulo q in {l, l/2} with multiplicity at most 2, which is what the imported maximum over coprime classes supplies; level x^(1/10) against T^(1/2)>=x^(3/25), margin 1/50 |
| R_{<=L} | the excluded-prime Mobius mean has t>=U/2 and m<=x^2, both polynomially bounded, and the lemma is proved uniform in m; the Abel step costs L V Z log^3 x <= x^(99/100) log^3 x |
| M_> | integrality of k=n/d forces d<=D_0 and e<=E_0, so W_> contains every original term; the same Mobius mean applies |

The four assembly identities S-M = I_1-I_2+B, B = Bcal(a)-Bcal(b),
Bcal(a) = P_1-P_2+R, R = R_{<=L}+M_>+E_> are exact. Independent finite
checks at x=512 with test cutoffs reproduced all four, and reproduced
R_{>L} = M_> + E_> exactly, which exercises the CRT kernel, the sawtooth
convention psi(integer) = -1/2 and the incompatible-gives-zero rule
together. Finite checks are checks, not proofs.

Two hazards were hunted specifically and not found: a fixed-H bound used
with H depending on x or another growing parameter, and a residue class
depending on the other variable used outside the imported maximum over
coprime classes.

## 3. Link three: the grouped moment (1)-(20)

All twelve pressure points in
[grouped-divisor-moment.md](grouped-divisor-moment.md) were adjudicated
CHECKED, with three ASSUMED-UNVERIFIED annotations on upstream inputs.
The re-derived items: the equal-frequency count 8 N A H_floor(2 min(N,A))
and its use in (5), including collisions between distinct divisors; the
endpoint variation (6) in both cases v<=1 and v>=1; the completion (7)
with complete periods removed, in both cases c>M and c<M; the gcd bound
(8) with shared prime powers between j and an ell_i; both elementary gcd
averages (9) on the closed harmonic band; the constants 4 in the Weil and
period sums; the L<1 band; the restricted bound (12) as a nonnegative
majorant; the coefficient bounds in (13) independent of Im(s); the region
arithmetic (15)-(16) in exact rationals; the Perron separation with four
cuts and error exponent 2+49/20-10; and the boundary witness (8/25,11/25).

The two classical Kloosterman inputs, |S(0,r;c)|<=(r,c) and
|S(t,r;c)|<=tau(c) sqrt(c (t,r,c)), were verified over 1,274,491 complete
sums with composite c<=300 and nonprimitive r including r=0, maximum
ratio 1.0000 in both. The reviewer could not confirm the lemma numbering
in the cited Springer DOI because the fetcher was redirected; the
statements are classical and correct as used.

One validator coverage gap: the harmonic loop in
[grouped-divisor-validation.js](grouped-divisor-validation.js) uses the
half-open band [A,2A) while the note's band is closed [A,2A]. The
inequality (9) was re-run on the closed band (76,800 cases, maximum ratio
1.0000) and holds. This is a gap in the validator, not in the note.

Bookkeeping imprecisions that change no conclusion: (5), (10) and (11)
carry inconsistent constant factors B^2 and C^2 that (2) restores; (7)
is never minimized against the trivial per-pair bound M, which costs
nothing at the boxes used; the four-cut Perron error is asserted from the
two-cut remark in residual-coverage rather than written out.

## 4. Link two: E_> to E_*, and the block shape

The transfer through [residual-coverage.md](residual-coverage.md)
§§1-5 was adjudicated NO DEFECT FOUND IN SCOPE. Its largest dependency,
flagged by both earlier reviews, was the claim that the aggregated
endpoint remainder has the block shape sum_m A_left(g m) Y(m) of
grouped-divisor-moment (1): a separate left coefficient in m, a separate
right coefficient in u, and a harmonic weight depending only on h. The
reviewer reconstructed the derivation across three notes and verified it
exactly: the bijection (d,r) to l=dr in endpoint-fourier (4)-(5); the
discrete-Abel endpoint kernel of signed-divisor-grouping (15)-(18); the
CRT origin identity n_0/q = (2/g) mbar/n (mod 1) for compatible l=gm,
j=gn with (m,n)=1, over 30,550 pairs in both g branches; and the block
form itself after the Vaaler replacement, with sigma=-1, theta=2/g and
c_h = -W(h/(T+1))/(2 pi i h), to maximum discrepancy 2.1e-14. CRT
compatibility (l,j) | 2 becomes 1_{(m,u)=1} exactly because g=(l,j)
forces (m,n)=1 and conversely.

Also checked: the inverse-reciprocity left orientation reverses sigma and
shifts both endpoints by 2, exactly as written in three notes, verified
mod 1 over 39,654 cases; the Fejer form of the Vaaler majorant with the
bound D_T <= min(1/2, 1/(8(T+1)^2 ||v||^2)), tight at integers so that
psi(integer) = -1/2 is load-bearing; the divisor-count bound on the full
positive majorant with no pairs at k=0 and k=2; the Perron separation with
absolute mass exactly D_0 E_0 V Z = x^2 times log^2 x and error exponent
-111/20; the untwisted density on every initial d-segment the cuts
produce; the budget table of residual-coverage §3 in exact rationals; the
assembly E_> - E_* through the cut {de <= L} contained in A; and that
incompatible congruences contribute exactly zero (366 pairs enumerated).

Two steps are correct but unwritten in the owning note: the Perron
separation must be read box by box, and the two-line reduction of
E_> - E_* to pieces covered by residual-coverage (15). One sub-item stays
ASSUMED-UNVERIFIED: the right-orientation rewrite of the prime-power and
first-branch moment is asserted from the sign-agnostic ingredients rather
than written out.

## 5. Imported theorems and one provenance defect

| import | source confirmed | hypotheses met |
|---|---|---|
| quantitative PNT | Tao, 254A Notes 2, Corollary 39 | yes |
| Bombieri-Vinogradov for Lambda | Tao, 254A Notes 3, Theorem 17 | yes at Q=x^(12/25); no supremum over y<=x, hence the mesh step |
| Vaughan identity | Tao, 254A Notes 3, Lemma 18 | yes |
| Mobius mean, q=1 | Tao, 254A Notes 2, Exercise 66 | yes; ineffective |
| Mobius Bombieri-Vinogradov | derived in mobius-bv-derivation.md from Koukoulopoulos GSM 203 (Cor. 13.4, Thms 26.2, 26.6, eq. (26.3)); EPFL sheet kept as teaching reference | yes as used; derivation reviewed once, no defect |
| Ramanujan and Weil bounds | Pascadi, GAFA, Lemmas 3.2-3.3, confirmed verbatim at the publisher page on a later pass | yes; composite moduli, nonprimitive numerators and n=0 admitted |

The Mobius Bombieri-Vinogradov statement in
[shifted-prime-decomposition.md (4)](shifted-prime-decomposition.md)
had no published citation. A scout searched five channels on 2026-09-06
in the owning convention of [SEARCH-CONVENTIONS.md §1](SEARCH-CONVENTIONS.md)
(Mobius function in arithmetic progressions, Bombieri-Vinogradov) and
located no published theorem statement of the Mobius case (Granville-
Shao assert it without a locator; Koukoulopoulos GSM 203 proves only the
prime case; Iwaniec-Kowalski §17.2 and Opera de Cribro §9 were not
reachable). [mobius-bv-derivation.md](mobius-bv-derivation.md) now derives
(4), with the maximum over y<=T inside, from Koukoulopoulos Corollary
13.4, Theorems 26.2 and 26.6 and equation (26.3) with Vaughan's identity
for mu, at level Q<=T^(1/2)/(log T)^(A+6). The provenance sentence in the
owning note points there. The derivation was reviewed in the same wave with no defect: the four
Koukoulopoulos statements were confirmed verbatim by a second reader,
the identity proved, and the bookkeeping found to over-estimate safely.

Effectivity: the Siegel-Walfisz inputs are ineffective, so the whole
reduction is ineffective and no onset exists. The audit and the handoff
already say so.

## 6. Definition drift

Load-bearing objects are consistent across the seven notes: beta_W, the
cutoffs U, V, Y, Z, D_0, E_0, the alpha_r/f_r expansion, the sawtooth
convention and W_dagger. Symbol reuse that a reader must watch: the
fourth variable is v in two notes and t in the handoff; H denotes both
the fixed logarithmic exponent and the harmonic band; A and B each carry
four meanings; c is a Vaughan coefficient, a margin constant, a
completion modulus and a Perron abscissa; R is the residual, a set of
odd primes and a pair numerator. None of these produced an error. The
overload of H is the one worth renaming, since the chain's precision
claim is stated in H.

Stale rates: three note bodies stated S = C_2 x + (remainder) + o(x)
where the derived rate is O_H(x/log^H x). They were updated on
2026-09-06 to the derived form with a pointer to the rate bookkeeping.

## 7. What no reviewer checked

The interior of prime-power-dispersion §§4-5 was re-derived in a later
pass of the same wave with no defect (zero-numerator count, prime-power
gcd identity with the full factor retained, harmonic averages, the
assembly (12)-(13), the region (14), the supremum 5757/6700 and the
consumption in residual-coverage §3); the singleton-fiber counting
argument of §3 was re-derived and shown to transfer to the corner boxes
with the error bookkeeping redone. Still unwritten: the right-orientation
rewrite of the prime-power and first-branch moments, which sets the
19/25 product edge through J_R. sparse-dispersion and
dispersion-range beyond their hypothesis lists. The excluded-prime Mobius
lemma of signed-divisor-grouping §2 was checked once, in the link-one
review, not twice. Pascadi Lemmas 3.2-3.3 and Baier-Zhao Lemma 2.2 as
published statements (numbering and wording). The older budgets
cross-referenced in grouped-divisor-moment §6. polylog-fold-transfer
§§1-3 and §5. Anything bearing on whether the OPEN margin holds.

A local review of one link does not certify the whole reduction, and the
whole reduction being correct does not make the signed margin any closer
to proved.
