# Independent review of the sharp corner energy and the failed norm transfer

<!-- ledger
id: Q-transition-energy-review
status: ANSWERED
todo: C
parity: Review of an existing argument. The audited inputs are a named uniform mean-square theorem for truncated Mobius divisor sums, Graham's Barban-Vehov mean square, PNT/Mertens and exact divisor algebra. Every cross-prime term is priced before the diagonal lower bound is used, so no one-point lower bound rests on diagonal terms alone. No cancellation at shift 2, no signed estimate and no favorable global twin margin is obtained or claimed here.
question: Does the sharp-energy chain in sharp-corner-transition.md survive an adversarial check, and do the upper norm, the small-fixed-eta lower norm and the failed negligible transition each stand at their stated scope?
verdict: All ten assigned rows survive at their stated scope; no counterexample or decisive contradiction was found. The upper norm, the small-fixed-eta lower norm and the refuted negligible L2 transition each stand separately. Two repairs are citation-level only: the integer Barban-Vehov input is Graham 1978 quoted by Chen An, and the note should record why the k=Q constant is absolute. The de la Breteche-Dress-Tenenbaum PDF was refetched and its SHA-256 matches the pinned hash; its (1.5) and Theorem 1.1 supply exactly the imported (3) and (4). eta_0 remains positive and unextracted, and the signed sums, E_out and the twin margin remain OPEN.
-->

**The sufficient twin margin remains OPEN, and nothing here moves it.**
This note is an audit. It produces no new estimate, no signed saving and
no bound on any correlation at shift 2. The single most important limit
on what follows: the two mean-square theorems behind the whole chain,
de la Breteche-Dress-Tenenbaum Theorem 1.1 and Graham's Barban-Vehov
estimate, are **imported**. Their statements, hypotheses, quantifiers and
proof outlines were read at their sources; their proofs were not
reproduced here. A finite check cannot certify either of them, and none
of the checks below tries to.

Launch commit `cb51292c7635c3b75540ab5f2ac5b8a9e40eaa2d`, working tree
clean at launch. Mathematical baseline `029208295099b60d7a8b837d19eb361cfc12e6b1`.
Objects, cutoffs and the four signed sums are as fixed in
[TRANSITION-RESEARCH-EXECUTION.md](TRANSITION-RESEARCH-EXECUTION.md) §2.
Scope: [sharp-corner-transition.md](sharp-corner-transition.md) in full,
[corner-coefficient-energy.md](corner-coefficient-energy.md) (1)-(16),
and [corner-correlation.md](corner-correlation.md) sections 1.1 to 1.4.

## 0. The three decisive verdicts

| Object | Verdict | Scope it survives at |
|---|---|---|
| Sharp **upper** norm (6), (7) | Survives | every fixed 0<eta<1/400, both sides, on I_0 and I_2; constant is O(B eta), not merely O_eta(1) |
| Small-fixed-eta **lower** norm (16), (17) | Survives | 0<eta<eta_0=min(1/400, L_0/(2880B)) only; eta_0>0 but not numerically extracted, and (17) is asserted nowhere else |
| **Failed** negligible L2 transition (18) | Survives | same eta range; refutes an O_eta(x log x) sharp squared norm and an o_eta(x log^2 x) transition squared norm, nothing more |

Failure of one would not have invalidated the others; none failed. The lower norm has an unextracted eta restriction, which the transition
statement inherits. The upper-bound constant B is also unextracted. No
claim of ineffectivity follows from not having computed these constants.

## 1. Per-row dispositions

Every row was re-derived from the definitions before the note's own
wording was compared against it. "Decisive calculation" records the step
that would have exposed an error.

| Row | Claim / equation | Checked hypotheses | Decisive calculation | Disposition | Remaining dependency | Proposed correction |
|---|---|---|---|---|---|---|
| A1 | Inversion (2); r=n cancels; M(m,D)=0 for 1<m<=D; upper cut redundant | mu*1=delta; M(1,D)=1; r integer so r>W means r>=W+1; n<=x on I_0 and n<=x-2 on I_2 | C(n)=sum_{r\|n,r>W}Lambda(r)[1_{n/r=1}-M(n/r,D)]; the r=n term is Lambda(n)(1-M(1,D))=0. d>=floor((x-b)/(W+1))+1>(x-b)/(W+1) gives n/d<W+1, hence n/d<=W and beta=0, at the exact floors D_0=floor(x/(V+1)) and E_0=floor((x-2)/(Z+1)) | Survives at stated scope | none beyond elementary algebra | none |
| A2 | (3) and (4) from de la Breteche-Dress-Tenenbaum | absolute B, L_0>0, c>0; uniformity in xi, z, x | PDF refetched, SHA-256 `1a806559c82718e1e3d33cf9e0d71ebd5fab7c93488feec102601607f549997f`, identical to the pinned hash. (1.5) reads S(x,z)<<x for x>=1,z>=1, which is (3). Theorem 1.1 (1.6) reads S(x,z)=Lx+O(x/L(3xi)^c) uniformly for xi>=1, xi<=z<=x/xi, which is (4) with L_0=L. Positivity and explicitness of L are in the abstract; Remark (ii) gives Helfgott's L≈0.4407. Proof steps match the note's description: (2.7) divisor symmetry, (2.8) error x^(3/2)/z, (2.9) Lemma 2.1, middle range separate | Survives at stated scope | the proof of Theorem 1.1, including Lemma 2.1 and the omitted details at (2.10), is imported | add the printed journal line ("Mathematika 66 (2020), 416-421") and state that L_0 is the paper's L |
| A3 | (5)-(7) sharp upper norm | weighted Cauchy with sum_{r\|n}Lambda(r)=log n; S(x/r,D)<=Bx/r needs x/r>=1, true since r<R=x/D; Mertens | \|C(n)\|^2<=log n · sum_{W<r<R}Lambda(r)M(n/r,D)^2; summing gives Bx log x · sum Lambda(r)/r = Bx log x(log(R/W)+O(1)); with floors log(R/W)=2 eta log x+o(1); Cauchy at shift 2 pairs I_0 against I_2 | Survives at stated scope | (3) imported; Mertens classical | none. Worth recording that the constant is ~2B eta, so (6) and (16) are both linear in eta and do not conflict |
| A4 | (8) proper powers | eps<w/2 fixed; tau(m)<<_eps m^eps | sum_{p^a>W,a>=2}p^(-a)<<W^(-1/2) by three ranges: a=2 gives sum_{p>sqrt W}p^(-2)<<W^(-1/2); 3<=a<=log_2 W gives W^((1-a)/a)<=W^(-2/3) each, total O(W^(-2/3)log W); a>log_2 W is geometric, O(1/W). Support count <=x·(that). \|Q(n)\|<=tau(n)log n, so \|\|Q\|\|^2<<_eps x^(1-w/2+eps)=o(x), hence o(sqrt x log x) in norm on both intervals | Survives at stated scope | none | none |
| A5 | (9)-(10) prime expansion | r<n in (2) forces m>=2 on the diagonal; p!=q forces pq\|n | Diagonal: n=pm, m>=2, pm in I. Off-diagonal: n=pqm, m>=1, ordered pairs, so the square is reproduced with no missing factor two. Terms with p\|m or q\|m are retained, not discarded; repeated prime divisibility in m is inside the sum | Survives at stated scope | none | none |
| A6 | (11), the m=1 / p\|m / q\|m cases, (12), and (13) | R<D iff 1-2w-4eta>0: 13/25-4eta>0 and 9/10-4eta>0. x/W^2<D iff w-2eta>0: 6/25-2eta>0 and 1/20-2eta>0, both true for eta<1/400 | m<=x/(pq)<x/W^2<D. m=1 gives M(p,D)M(q,D)=0 because p,q<R<D. p\|m gives M(pm,D)=M(rad(pm),D)=M(m,D)=0 because 1<m<D. For m>1, (m,pq)=1: M(qm,D)=M(m,D)-M(m,D/q)=-M(m,D/q), and likewise for p, so (12) is exact. Cauchy then needs S at N=x/(pq)>D^2/x>1 and z=D/q>D/R=D^2/x>1, both >=1 by (11). Prime sum is 2 eta log x+O(1), squared 4 eta^2 log^2 x(1+o(1))<=9B eta^2 log^2 x | Survives at stated scope | (3) imported | none |
| A7 | (14), (15) dyadic diagonal | xi=x^(eta/2); source range xi<=D<=N/xi at both endpoints, uniformly in W<p<=x^(w+eta) | Upper endpoint N=(x-b)/p>=x^(1-w-eta)(1+o(1)), so N/xi>=x^(1-w-3eta/2)>D=floor(x^(1-w-2eta)); lower endpoint N'=(x/2-b)/p loses only a factor 2, absorbed by x^(eta/2). xi<=D holds for eta<1/400. Subtraction gives L_0(N-N')+O((N+N')/L(3xi)^c), and N-N'=(x/2)/p **exactly**, with b=0 and b=2 both cancelling. m=1 is outside I because N'>x^(1-w-eta)/3>1. (15) by partial summation from sum_{p<=t}(log p)^2/p=(1/2)log^2 t+O(log t): the band contributes (w eta+eta^2/2)log^2 x+O(log x) | Survives at stated scope | (4) imported; PNT/Mertens classical | none |
| A8 | (16) coefficients and the eta restriction | eta fixed independent of x; B>=1; L_0>0 | D_I>=(L_0x/4)(w eta/2)log^2 x=(L_0 w eta/8)x log^2 x. 9B eta^2<=L_0 w eta/16 iff 144B eta<=L_0 w iff eta<=L_0 w/(144B); then the retained margin is >=L_0 w eta/16. With w_min=1/20 this is L_0/(2880B), so eta_0=min(1/400, L_0/(2880B)) is admissible for both sides. Checked as exact rational arithmetic over a grid, with the 72B variant failing the equivalence at 3 grid points | Survives at stated scope | positivity of eta_0 needs only L_0>0 and B<infinity; its **value** and the x_0(eta) implied by "sufficiently large x" are not extracted | none. The claim must keep the words "for every sufficiently small fixed eta" |
| A9 | coefficient-energy (10)-(14) and the triangle inequalities to (17)-(18) | Graham range 1<=a<b<=N; L>=1; N>=z_1 | An's weight m(d) equals rho with a=w, b=y, including m(y)=0 at the right endpoint, and his (1.1) hypothesis 1<=w<y<=x is exactly 1<=a<b<=N. Rescaling: for d<=N, rho(d)-(t/L)rho_{z_1,N}(d)=log(z_2/N)/L, the same constant on d<=z_1, on z_1<d<N and at d=N, so F_rho(m)=(t/L)F_{z_1,N}(m) for m>1 and the sum is O(N(t+1)/L^2)<=O(N/L). (12)-(13) then give \|\|C~\|\|^2<<_eta x log x, and since \|\|C~\|\|<<sqrt(x log x)=o(sqrt x log x), \|\|T\|\|>=\|\|C\|\|-\|\|C~\|\| and \|\|T\|\|<=\|\|C\|\|+\|\|C~\|\| give (18) from (17) | Survives at stated scope, **needs a citation repair** | Graham's proof is imported and is not in An either | An (1.1) is a **quotation** of Graham [Gra78]. Cite S. W. Graham, *An asymptotic estimate related to Selberg's sieve*, J. Number Theory 10 (1978) 83-94, as the primary integer source, say whether (1.1) or An's Theorem 1.1 at k=Q is the import, and record that the k=Q constant is absolute because n_k=1, d_k=1 and no Siegel zero exists for Q (so C_{beta_0}=1) |
| A10 | (19), (20), support and compatibility; density replacement; no norm-to-correlation conversion | C=C~+T pointwise; d\|n and e\|n-2 give (d,e)\|2 | (19) is the expansion of (C~+T)(C~'+T'). (20) reindexes n=dk, n-2=ev, so dk-ev=2 with dk in I_0; every index positive; both gcd branches kept. Density: corner-correlation (3) rests on signed-divisor-grouping (7)-(8), which are stated uniformly for U/2<=a<b<=x and excluded-prime parameter m<=x^2, so they do cover varying lower cuts, which is what coefficient-energy §4 and sharp §3 use. S_0 lies in W_dagger: 19/25-2eta>151/200 exactly when eta<1/400; 171/100-4eta>3/4; 57/10-14eta>49/20; and the grouped cut is also avoided since the de^3 exponent is 3.61-8eta>1.605. §5 and §6 state twice that (17) is not a shifted-correlation lower bound, and no later step uses it as one | Survives at stated scope | the derivation of signed-divisor-grouping (7) from the classical Mobius mean was read as a statement, not re-derived | the handler's brief cites "coefficient-energy (17)-(20)"; that note ends at (16) and (17)-(20) live in sharp-corner-transition. Cite accordingly |

## 2. Imports, inspected steps and independent derivations

**Imported and not verified here.** de la Breteche-Dress-Tenenbaum
Theorem 1.1 and (1.5) (proof, including Lemma 2.1 and the details
omitted at (2.10)); Graham's Barban-Vehov mean square; PNT and Mertens;
the classical Mobius mean used in signed-divisor-grouping (4).

**Inspected at the source.** The DBT PDF was refetched at the pinned
URL: SHA-256 matches the recorded hash byte for byte. Read: abstract,
(1.1)-(1.6), Theorem 1.1 with its full hypothesis line, and §2 through
(2.10). The An PDF was refetched, SHA-256
`60b77f3957a4da643079ded072adf5f10515e90e047eb0b6327685a87ef2ec19`,
matching its pinned hash. Read: abstract, the weight m(d), (1.1), and
Theorem 1.1 with its constant C_{beta_0}.

**Derived independently in this review.** The inversion (2) and its
singleton cancellation; the upper-cut redundancy at the exact floors on
both actual intervals; (5), (6), (7); the three-range tail behind (8);
(9) and (10); the exponent gaps in (11) for both w; the exact identity
(12) through M(qm,D)=M(m,D)-M(m,D/q); the constant in (13); the source
parameter check for (14) at both shifted endpoints; (15); the threshold
algebra of (16); the triangle inequalities to (17) and (18); (19) and
(20); coefficient-energy (9), the N<z_2 rescaling identity, and
(12)-(13); the S_0 ⊂ W_dagger exponent arithmetic.

## 3. Falsifiers attempted, and whether they ran

[transition-energy-review-validation.js](transition-energy-review-validation.js)
runs three named falsifiers against steps the two existing validators do
not exercise, with six active controls. It PASSES; no defect was found.

| Falsifier | Target | Ran | Result |
|---|---|---|---|
| F1 | the upper divisor cut at its true floors on I_0 and I_2 | yes | 12053 redundancy points, 7319 with squarefree divisors above the cut; coefficients with and without the cut agree everywhere. Control: a non-strict r>=W threshold breaks the same floor at 393 points, so the strictness is load-bearing |
| F2 | the shifted diagonal bookkeeping of (14) | yes | 14 identities across both shifts b=0 and b=2; the m>=2 sum equals the prefix difference and the shift cancels exactly. Control: above the band m=1 re-enters and the difference is exactly M(1,D)^2=1 |
| F3 | the exact rational arithmetic of (16) | yes | 108 equivalences; the 144B threshold is equivalent to the (16) inequality, the 72B variant is not (3 disagreements); eta_0 admissible for both w=6/25 and w=1/20 |
| upper/lower consistency | whether the derived lower coefficient can exceed the derived upper coefficient | yes, by derivation | upper ~2B eta, lower >=L_0 w eta/16; consistency needs only L_0 w<=32B, true since the two mean-square inputs imply L_0<=B and w<1. Both are linear in eta, which is the expected shape |
| cross-prime positivity probe | whether the O(eta^2) payment can be removed | scratch only; not reproducible from retained artifacts | not used as evidence; actual dyadic-interval positivity remains OPEN |
| (12) outside its hypothesis | whether m<=D is optional | yes (existing control reproduced) | the identity fails for m>D, so the hypothesis is not silently optional |

Both existing validators were re-run and reproduce their embedded output
exactly. Their green output is not a derivation and was not treated as
one. One bookkeeping observation: the sharp validator's embed banner
carries `forced: 2026-09-06, 0 of 6 figures in the replaced block not
reproduced`, that is, a forced re-embed in which nothing failed to
reproduce.

## 4. Cost table and contribution to (E2)

Nothing in the reviewed chain contributes a saving to (E2). The entries
below are the absolute budgets the reviewed norms supply, all valid for
every fixed admissible eta.

| Term of (E2) | Best reviewed budget | Status |
|---|---|---|
| R_00 | O_eta(x log x) | derived, imports Graham |
| R_10, R_01 | O_eta(x log^(3/2) x) | derived, imports both mean squares |
| R_11 | O_eta(x log^2 x) | derived, imports DBT |
| R_cor endpoint remainder | same as R_cor, via the O_H(x/log^H x) density replacement | derived, conditional on the imported uniformity of signed-divisor-grouping (7)-(8) |
| E_out | none | OPEN |
| sufficient twin margin | none | OPEN |

Each of these is an absolute bound; none is o(x) and none constrains a
sign. The lower bounds (17) and (18) give **no** lower bound for R_11 or
for its absolute shifted product, and supply no impossibility statement
about signed cancellation at shift 2.

## 5. Reusable findings, failed steps and remaining obligations

**Reusable, derived.** For the off-diagonal under (11), a necessary
support interval is D/min(p,q)<m<=x/(pq), intersected with the actual
shifted dyadic interval. Coprimality, integer endpoints and Mobius zeros
can shrink it. Its real interval is nonempty only when max(p,q)<R;
that condition does not guarantee a nonzero contribution.

**Not established.** The scratch positivity probe in section 3 was not
retained with a reproducing script or data; it is not evidence for a
uniform sign assertion. Positivity on prefixes would in any case not
imply positivity on the dyadic interval required by (10). A proof on
the actual intervals and under the prime hypotheses could remove the
absolute cross-prime payment, but no such proof was given. A negative
entry alone would not prove that the particular 9B eta^2 bound is optimal.

**Unjustified closure withdrawn.** S(z,z)=1 localizes the remaining energy
to (z,N]. It does not rule out an upper bound depending more sharply on
N-z or the cutoff width. The uniform bound S(N,z)<=BN alone does not
supply that improvement. See [the review](transition-round-audit.md).

**Remaining obligations.** eta_0, B and the sufficiently-large-x onset
are not numerically extracted. The imported proofs remain imports. The
signed sums, E_out and the sufficient twin margin remain OPEN. Reuse the
upper-norm constant 2B eta and the lower result only at its stated scope.
