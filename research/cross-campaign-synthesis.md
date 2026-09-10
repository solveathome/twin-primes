# Cross-campaign review: coefficients, proposed papers and the proof target

<!-- ledger
id: Q-cross-campaign-synthesis
status: ANSWERED
todo: C
parity: Source and scope audit, exact divisor identities, one-point quadratic sieve input and elementary common-scale bookkeeping. No new shift-2 cancellation, positive twin margin or universal obstruction is claimed. The derived smoothed norm is for an auxiliary portion of the residual; the signed transition correlations and global complement remain open.
question: What can be recovered by comparing the fold, anchored, arithmetic and literature campaigns, including the proposed papers, against the actual twin-prime consumer?
verdict: The full-coefficient viewpoint leads to an exact sharp energy quadratic form, a Graham/Barban–Vehov O_eta(x log x) bound for smoothed full coefficients, and a small-prime cutoff-difference identity. The follow-up sharp-corner-transition.md prices the full sharp norm and rules out negligible L2 transfer for sufficiently small fixed eta. The local proposals supply quantifier and dependency lessons; a reversed anchored inequality, overbroad Suen closure and stale proposal header are repaired. Signed transition correlations and the global margin remain OPEN. The subsequent global-cutoff-averaging.md gives the current complete global formulation and signed research priority; its one-point cancellation is not a shift-2 estimate.
-->

**Twin-prime infinitude and every sufficient positive margin in the current
handoff remain OPEN.** This review finds a usable one-point estimate and a
more specific next question. It does not find a proof concealed in the corpus.
The new derivations are in [corner-coefficient-energy.md](corner-coefficient-energy.md).

The first follow-up is completed in
[sharp-corner-transition.md](sharp-corner-transition.md): sharp squared
norms are O_eta(x log^2 x), and for sufficiently small fixed eta the
sharp and transition squared norms have that order. The norm transfer
fails in that range; the signed transition correlation remains open.

The subsequent [global cutoff assessment](global-cutoff-averaging.md)
rechecks the next priority using the complete upstream identities.
Averaging their initial cutoffs gives a full smooth remainder with no
separately unpaid corner transition, and O(x log x) squared coefficient
norms. It also derives same-input cancellation between the sharp corner
and the coefficient complement. It does not transfer that cancellation
to shift 2 or supply a lower twin margin. Its bounded global signed
attempt now precedes an automatic extension of the small-cofactor lemma.

## 1. Scope and the standard used

Baseline: local commit `382d830`, 2026-09-06. The review compares the question
and outcome registers, the current arithmetic chain and its recent reviews,
the fold/anchor alternatives, the import map, and all eight entries in
[the proposal registry](../paper/proposals/PROPOSALS.md). The paper-suite
architecture in [PAPERS.md](../paper/PAPERS.md) is context, not evidence of
a theorem or a renewed novelty assessment.

The decisive arguments checked at their owning steps include:

- the full coefficient and prime-power split in corner-correlation;
  the lift and sampling consequence in prime-band-transfer and round-review;
- the common-factor sign identity in structural-literature-audit, used below
  in a different, one-point energy;
- the signed consumer in TWIN-REDUCTION and consumer-comparison, the coverage
  cuts and their fixed-margin qualification, and the distinction between a
  moment diagonal and an upper budget;
- the anchored survivor lemma and conditional argument in anchored-note;
  the product-ensemble versus anchored hypotheses in the Suen proposal and
  import-shearer's actual correction and tightness statements;
- the exact fold transport, alternation and thinning claims and their stated
  missing recurrence or correlation inputs, through the proposals and their
  owning U-FRAME, kappa-not-L and outcome entries;
- the named source statements and selected proof steps listed in §3.

This is a targeted mathematical cross-review, not independent certification
of every archived script, every proposed manuscript or the full proofs of
the imported analytic theorems. Earlier finite data are reused at their
recorded scope; the new algebra has its own reproducible checks in §7.

## 2. What the comparisons recover

### 2.1 Regrouping is useful, but the coefficient being bounded matters

The singleton audit has large masses of both signs before grouping. The
signed-divisor argument nevertheless controls a nontrivial region after
grouping. The later grouped moment also removes a Cauchy loss without using
the signs of arbitrary bounded coefficients. These are concrete reasons to
check the point at which absolute values were taken; neither result proves
that all other groupings work.

The full corner has coefficients

    C(n) = sum_(dk=n, Dlo<d<=D0) mu(d) beta_V(k).

Expanding its ONE-POINT energy over k,l leaves the same multiplier t in both
Möbius factors. With k=ga, l=gb, (a,b)=1, their product becomes

    mu(at)mu(bt) = mu(a)mu(b) mu(t)^2 1_((t,ab)=1).

The elementary squarefree-coprime count then gives the explicit quadratic
form of corner-coefficient-energy (5), with error
O_epsilon(x^(1/2)K^2 x^epsilon). At the left fixed corner its exponent is
49/50+4eta+epsilon<1; the right error is smaller. The cofactor weights,
off-diagonal terms and clipping intervals stay in the main quadratic form.
This includes non-squarefree n. It is not a two-point estimate: replacing
one n by n-2 loses the common t identity.

Logarithmically averaging the lower divisor cutoff produces exactly a
Barban–Vehov weight after Möbius inversion. The imported mean-square estimate,
with the endpoint-range repair given in the owning note, yields

    sum_(n<=x) |C_tilde(n)|^2 <<_eta x log x,
    sum_(n in J_x) |C_tilde(n) C'_tilde(n-2)| <<_eta x log x.

This is for the FULL SMOOTHED coefficients, including small cofactors and
proper prime powers. It is not the sharp corner, and it is too large to
give o(x). Its sharp-to-smooth difference is written exactly in (15).
No three-log improvement for E_dagger follows by comparing it with the
sharp term-wise x log^4 x envelope: the objects differ.

### 2.2 Multiplicativity points to the cutoff boundary

The subfamily's bounded multiplicative lift is valid. Applying its theorem
to the full coefficient would require a new representation or a new theorem.
The radical identity in corner-coefficient-energy (6) retains all surviving
small cofactors but still has a signed truncated divisor sum as multiplier.
Its total size cannot be replaced by one.

A more specific bridge comes from checking the multiplication step in the
papers: for p<=W prime, p not dividing n, and fixed divisor weight w,

    C_w(pn) = sum_(d|n) mu(d) [w(d)-w(pd)] beta_W(n/d).

For a sharp cutoff this is a divisor band D/p<d<=D; for a logarithmic
transition the weight difference is at most min(1,log p/L). This is an
exact cutoff-difference identity, not approximate multiplicativity. The
small factor on the weight can be lost on summing divisors or treating
p|n. It supplies a concrete sum to estimate rather than an unsupported
import of the correlation result.

### 2.3 Infinitude does not require the strongest old target

The maximal twin-slot gap bounds concern every translation. A fixed anchor
or unbounded family of occupied intervals is sufficient for infinitude.
The anchored-note survivor proof includes the self-strike exclusion, so its
survivors tend to infinity with the cutoff; this is the reason repeated
nonempty levels would produce distinct twin pairs.

The current arithmetic consumer asks for fixed c,K>0 and unbounded dyadic x
with C2*x+E_dagger(x)>=c*x/log^K x. It is sufficient and quantitatively
stronger than bare infinitude. Its cumulative version is equivalent at the
same fixed K up to constants, as the recent review proves. Neither a
uniform maximal-gap theorem nor an every-dyadic asymptotic is necessary.
Conversely, replacing the target by an equivalent positivity statement
does not prove that statement.

## 3. Proposed external papers: what was actually checked

Primary texts below were opened during the cross-review. “Checked” means
the specified statement, parameter range or selected proof step was read
and matched, not that the whole paper was independently verified. Existing
broader source trails remain in structural-literature-audit,
consumer-comparison and next-correlation-source-map.

| source and reading depth | usable content or method | first unpaid obligation here |
|---|---|---|
| [Chen An, 2206.10104v1](https://arxiv.org/html/2206.10104v1), (1.1), weight definition and Theorem 1.1; integer case of Graham's estimate | Uniform mean square for the actual logarithmic cutoff, including long divisor support. Imported in the owning energy note, with a fixed PDF hash. | Its range is upper cutoff <= summation endpoint. The N<z2 rescaling argument is supplied locally. It gives a one-point norm; transition and shift-2 cancellation remain open. |
| [Carneiro–Chirre–Helfgott–Mejía-Cordero, 2005.03162v6](https://arxiv.org/html/2005.03162v6), §1 definitions and quadratic-form statement | Identifies the natural two-parameter quadratic sieve and its smoothing optimization. | The elementary conversion S_rho=N M_rho+O(D2^2) is unusable at our long cutoffs. Optimizing that main form alone does not prove our norm. Its optimization result is not a universal barrier to twin primes. |
| [Ramaré–Zuniga-Alterman, 2405.12662v1](https://arxiv.org/html/2405.12662v1), theorem/corollary statements | Explicit harmonic L2 estimates for these sieve weights. | The directly stated nonharmonic consequence retains an extra log X. Dropping it would falsely reproduce the stronger Graham input. No new input taken from this paper. |
| [Tao–Teräväinen, 2512.01739v2](https://arxiv.org/html/2512.01739v2), Theorem 3.1(ii), accompanying hypotheses, and §3.5 Ramaré step | Supports the already-derived fixed-band lift. The proof factors g(pm)=g(p)g(m) off a controlled exceptional set, then uses prime averages. | The full coefficient instead obeys the cutoff difference in §2.2. An L2 bound alone does not put it in the theorem's bounded multiplicative class. A cofactor decomposition must pay representation norms, exceptional terms and cutoff losses. |
| [Guo, 2608.23500v4](https://arxiv.org/html/2608.23500v4), Theorem 1.8 and §§5.3–7.1 | The stated Liouville logarithmic estimate is uniform for shifts up to a fixed power of log x. The proof compares uncentered and centered prime-product forms and tracks subset expansion and local scale costs. | Equation (102) uses complete multiplicativity to remove d0. It does not hold for our full coefficients; (16) identifies the replacement for a single coprime small prime. The existing natural-scale conversion also lacks the required saving. The preprint's full proof remains unverified here. |
| [Ford–Maynard, 2407.14368v1](https://arxiv.org/html/2407.14368v1), (I), (II), growth conditions and §2 interfaces | A consumer for simultaneous distribution and bilinear estimates, using all supplied ranges together. | Type II must hold uniformly for the stated divisor-bounded test coefficients, with a locally correct comparison sequence. A bound for one corner or one actual coefficient is not that hypothesis. Retain the exact specification in prime-detection-spec; no hypothesis is newly discharged. |
| [Fouvry–Kowalski–Michel–Sawin, 2511.09459v3](https://arxiv.org/html/2511.09459v3), Theorem 1.1, definitions and Remark 1.2 | Bilinear cancellation from trace-function structure; the source explains which geometric hypotheses and complexity controls are needed. | The displayed interface has a prime modulus and restricted lengths. Our variable composite lcm kernel is not identified with that class. Complexity dependence is not automatically polynomial. A composite-kernel reduction and a full regional budget would be needed. |
| [Tao, Bombieri asymptotic sieve notes](https://terrytao.wordpress.com/2016/07/17/notes-on-the-bombieri-asymptotic-sieve/), reduction and conditional scalar discussion | Explains how extensive local/distribution information can leave a signed scalar undetermined. This is a useful comparison for the endpoint remainder. | The stronger distribution assumptions are conditional, and its normalization does not by itself resolve a lower margin on a finer logarithmic scale. The exact comparison remains the one in consumer-comparison. |

The spectral, composite Kloosterman, divisibility-graph and asymptotic-sieve
families beyond this table are not newly certified here. Their specific
earlier matches and failures remain those in structural-literature-audit
§3 and consumer-comparison. “No direct match in these checked statements”
is the conclusion; it is not an exhaustive literature impossibility claim.

## 4. The local paper proposals also contain useful distinctions

These are research records under a publication moratorium. The review scores
their stated triggers rather than treating draft grades as proof grades.

| proposal | reusable content for this campaign | scope and grade after review |
|---|---|---|
| [K–K adaptation](../paper/proposals/prop-kk-lower-bound.md) | Constructive covers expose the difference between local densities and an extremal gap. | A lower bound on a worst-case gap supplies no anchored survivor lower bound. QUICK-DRAFT retained; imported proof adaptation still has its recorded refereeing dependencies. |
| [x log x lower bound](../paper/proposals/prop-xlnx-lower-bound.md) | A shorter chain of named published inputs is easier to audit than an adapted proof. | Same direction-of-inequality limitation. Header and §2 now agree with the previously recorded QUICK-DRAFT decision; no mathematical upgrade today. |
| [Exact fold L](../paper/proposals/prop-exact-fold-L.md) | The alternation automaton keeps order information that a gap histogram discards. | An exact per-fold statistic does not provide the missing uniform recurrence. The all-j induction and blind-test triggers are not newly met. PROPOSAL retained. |
| [Tail-count transport](../paper/proposals/prop-tailcount-transport.md) | Keep legal runs and copy alignment when transporting tails. | The full-support evaluator's exactness and the growth of the relaxed recurrence do not bound the anchored tail at unbounded levels. This closes the recorded relaxation, not every refined recurrence. PROPOSAL retained. |
| [Thinning null](../paper/proposals/prop-thinning-null.md) | The exact fold-moment identity isolates the adjacent correlation term and longer-run correction. | Independent thinning has different conditional structure; measured small corrections are not uniform bounds. WEAKENED retained; no fitted law is promoted. |
| [Suen import](../paper/proposals/prop-suen-import.md) | The product-space matching and anchored conditional distribution are different objects. | PROPOSAL retained with substantive scope corrections: H>=x^2 does not give exact independence, the atomicity premise was not proved, and Shearer closes a graph/marginal interface rather than every use of arithmetic structure. These corrections were already in the owning review but missing here. |
| [Anchored note](../paper/proposals/prop-anchored-note.md) | Its self-strike lemma explains why unbounded nonannihilation would suffice. | HELD retained. Lemma 1's reversed elementary inequality is replaced by the correct positive Euler-product factorization. Mean divergence survives; anchored positivity is still open. |
| [Staircase note](../paper/proposals/prop-staircase-note.md) | Prime-by-prime caps provide reproducible finite certificates and locate their slack. | Finite floors and an upper bound on kills do not establish a positive infinite-scale margin. HELD retained; no new cap or publication trigger. |

In particular, the local-lemma statements cannot be used to rule out a new
arithmetic conditional bound. The simple verified conclusion is about the
information retained: for a complete graph the independence polynomial is
1-sum p_i. Extra arithmetic information would be a new input and must be
proved. Pairwise near-independence does not supply all the required
conditional probabilities.

## 5. Quantifiers and losses that do not compose for free

### 5.1 Independent unbounded good scales need not intersect

Two good sets of dyadic indices can be the even and odd indices. Each is
unbounded, but there is no common scale. Thus separate subsequence results
for residual components cannot simply be added.

A usable replacement is elementary. On a finite common set of indices J,
suppose nonnegative normalized errors e_i(j) satisfy

    (1/|J|) sum_(j in J) e_i(j) <= epsilon_i.

For positive thresholds t_i, the fraction of indices failing any bound
e_i(j)<=t_i is at most sum_i epsilon_i/t_i, by Markov and a union bound.
If a favorable main-term event occupies fraction delta and that sum is
less than delta, at least one common index survives. The error thresholds
must also sum to less than the main-term margin. This proves a combination
rule; it supplies no arithmetic epsilon_i or favorable event.

The existing prime-subfamily average is normalized by N log^2 X. Its
relative saving log^(-d) X, d=c_*/2, gives only log^(2-d) X after
normalization by N. At a margin N/log^K X, the corresponding Markov cost
is log^(K+2-d) X times a fixed threshold factor, which the present rate
does not make small. This is the cost of this particular absolute-value
conversion, not a necessary exponent for every one-sided proof.

### 5.2 Fixed margins, translations and coefficient norms

- Fixed eta estimates do not allow eta to shrink with x without tracking
  every eta-dependent constant and every x^epsilon loss. Smoothing leaves
  the actual transition contribution to be estimated.
- An averaged translation statement does not locate the anchor. A periodic
  configuration may be translated to place an empty interval at the
  chosen origin while leaving translation-averaged moments unchanged.
  This example concerns those statistics, not the complete residue data.
- Bounds for distinct coefficient families cannot be multiplied. The
  bounded-multiplicative subfamily saving and the full smoothed L2 bound
  are useful separate facts, not a full-coefficient correlation theorem.
- A smaller geometric residual is not a monotone decrease of its signed
  sum. Regional suprema and area percentages do not bound its mass.
- A finite sign-control ratio cannot rule out an asymptotic mechanism.
  In kernel-sign-control the accessible prime threshold and common-divisor
  range are explicitly degenerate; that qualification remains decisive.

## 6. The next bounded work, in order

1. **Attempt the complete global signed pair.**
   The follow-up global-cutoff-averaging derives its uniform complete
   reduction and O(x log x) squared coefficient norms. These steps are
   completed work. Analyze the negative factor configurations while
   retaining positive contributions when needed, and seek the stated
   one-sided lower margin on common scales. Same-input cancellation
   does not supply the shift-2 estimate.
2. **Match any proposed correlation input to these actual coefficients.**
   The small-cofactor transfer can be an ingredient, but its bounded
   multiplicative theorem does not automatically apply to the global
   divisor coefficients. Price the representation, every range and the
   final rate. An O(x log x) norm budget is not an improved signed bound;
   the global signed O(x) bound was already available.
3. **Require a complete consumer before enlarging computation.**
   The global identity retains outside arithmetic directly. If returning
   to the sharp-corner decomposition, retain its transition, mixed terms
   and E_out. A signed average is admissible when its rate implies the
   positive margin; full o(x) cancellation is stronger than necessary.
   No result ranks this direction above every possible proof method.

The retained factor inputs already suffice for algebraic falsifiers. Their
proxy corner is not the asymptotic fixed-eta corner. A longer census needs
a named new question whose outcome can change one of the estimates above.
No six-hour run is justified merely to increase a finite twin count.

## 7. Reproduction and falsification

[cross-campaign-validation.js](cross-campaign-validation.js) is embedded by
the standard custody tool. It checks complex sharp energies, the full
prime-log Gram matrix, radical regrouping, smoothing/singleton identities,
the short-endpoint rescaling and small-prime dilation. Its deletion controls
must change the answer. It also checks the elementary Euler factor and a
finite common-scale counterexample.

The mean-square theorem and its uniformity are named imported dependencies.
A missing hypothesis there would invalidate the smoothed bound. A claimed
sharp bound must control the displayed transition; a claimed twin result
must additionally establish the global consumer. No finite test supplies
either. Proposal corrections and the reusable/failed deductions are recorded
under these questions in [OUTCOMES.md](OUTCOMES.md).

Reproduction commands:

```sh
node research/qc/embed.js --check research/cross-campaign-validation.js
node research/qc.js --index --strict
node research/qc/selftest.js
node research/audit-numbers.js
git diff --check
```

The QC and regression gates check their documented finite and syntactic
contracts; passing them is not verification of the imported analytic proofs.
