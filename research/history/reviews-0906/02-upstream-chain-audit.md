# Upstream chain audit: S(x) down to E_dagger

Adversarial read, 2026-09-06, baseline commit `6e4a4fc`. Read-only; no repo file was
touched. Scope as briefed: the six rows of `research/endpoint-target-audit.md` §1
(lines 65-72), i.e. the reduction to **E_>**, plus a definitional consistency check on
E_* and E_dagger.

## Verdict

**NO DEFECT FOUND IN SCOPE.**

Every one of the six contributions is O_H(x/log^H x) with constants depending on H
alone, and no term in the chain S -> E_> is discarded with an unquantified o(x).
Read the two scope caveats below before reusing this verdict.

**Caveat 1 (bookkeeping gap that matters for the handoff's headline).** The six-row
table proves S(x) = C_2 x + E_>(x) + O_H(x/log^H x). `RESEARCH-HANDOFF.md` §3 states
the reduction with **E_dagger**, which needs two further discarded terms:
E_> - E_* (residual-coverage.md §§3-4, (15)) and E_* - E_dagger
(grouped-divisor-moment.md §5, (20)). Those two rows are **not** in the §1 table.
They are asserted in the audit's preamble (endpoint-target-audit.md:24-31) but the
audit's own falsifier list (endpoint-target-audit.md:190-194) says "Section 1 lists
every discarded term and its arbitrary fixed logarithmic rate" — true for E_>, not
for E_dagger. I did not audit those two steps; they carry essentially all of the
recent unreviewed derivation (endpoint-fourier, coefficient-structure,
endpoint-pairing, prime-band-completion, prime-dispersion, dispersion-range,
sparse-dispersion, prime-power-dispersion, residual-coverage, grouped-divisor-moment).
The risk in the chain is concentrated there, not in the six rows.

**Caveat 2 (calibration of my own read).** "CHECKED" below means I followed the
written argument line by line, reconstructed the decisive inequality independently,
and confirmed the imported theorem's verbatim statement against its primary source.
It does not mean the notes have been refereed. Two log-power slips and one
normalisation elision are listed in §Imprecisions; none changes any conclusion.

## The six rows

| # | contribution | verdict | decisive inequality / reason |
|---|---|---|---|
| 1 | M - C_2 x | **CHECKED** | b(p^j)=2C_2(1+1/(p-2)) at odd p^j, b=0 on evens, so M = 2C_2(psi(x)-psi(x/2)) + O(sqrt x) + O(log x). Tao Notes 2 Cor. 39 gives psi(t)=t+O_A(t log^-A t) (verbatim confirmed). Difference at x and x/2 gives C_2 x + O_H(x/log^H x). |
| 2 | I_1 - I_2 | **CHECKED** | (9): sum_{d<=D} max_K \|sum_{k in K, dk in J_x} w(dk)\| <<_A x/log^A x with D=UV<=x^{12/25}<x^{1/2}. Odd-d main terms match exactly: prime-detection-spec (6) computes C_2 f(d) sum_{(e,d)=1} h(e)/e = prod_{p\|d} p/(p-1) = d/phi(d), the same main term as psi(I;d,-2)~\|I\|/phi(d) with \|I\|=d\|K\|. I checked (6) by hand: (1+1/(p(p-2)))=(p-1)^2/(p(p-2)), so [(p-1)/(p-2)]/[(p-1)^2/(p(p-2))]=p/(p-1). Comparison error O(tau(d)log^3 x) sums to O(D log^4 x); even d gives O(D log^2 x); BV covers the rest. Partial summation costs one log. |
| 3 | -Bcal(b) | **CHECKED** | The d-coefficient g_{k,R}(d)=1_{d odd}mu(d)prod_{p\|d,p in R,p∤k}(p-1)/(p-2) has Dirichlet series zeta(s)^{-1}H_{k,R}(s) with the Euler factor 1 - p^{-s}/((p-2)(1-p^{-s})). I verified that identity algebraically: both sides equal [(p-2)-(p-1)u]/[(p-2)(1-u)], u=p^{-s}. Hence sum_e \|h(e)\|/sqrt e = prod_p(1+O(p^{-3/2})) < C uniformly in k and R, g = mu*h, and splitting at sqrt T gives sum_{d<=T} g <<_A T/log^A T. Endpoints of D_k are >= U = x^{6/25}, so log T ≍ log x. Times beta_V(k)<=log x, f(k)<<log log x, sum_k 1/k << log x. |
| 4 | P_1 - P_2 | **CHECKED** | Vaughan at Y=Z=x^{1/20}. The §3 parity table reduces every congruence kd≡2 (mod ℓ) to a **primitive** class modulo q ∈ {ℓ, ℓ/2}, with multiplicity <= 2; that is exactly what the imported max_{(a,q)=1} supplies. Level: q <= YZ <= x^{1/10} while T=x/k > U=x^{6/25}, so T^{1/2} >= x^{3/25} and the exponent margin is 3/25-1/10 = 1/50, which beats any log power. Weight log((dk-2)/e) has sup O(log x) and total variation O(1) (derivative k/(dk-2), d dyadic). Final: \|P_1\|+\|P_2\| << x log^{3-A} x via sum_{V<k<x/U} beta_V(k) x/k << x log^2 x. |
| 5 | R_{<=L} | **CHECKED** | Two halves, both verified. (a) M_L: for fixed n,e,r,s the d-sum is a constant of modulus <= 2/(ers) times an excluded-prime Möbius mean over a ∈ (U/2^eps, L/(2^eps e)], with excluded set {2} ∪ {p\|b_o}. The uniform lemma (7) holds because t^{-1/4} m^{1/100} << x^{-6/100+2/100} = x^{-1/25} for t >= U/2, m <= x^2 — I re-derived both bounds in (6), including sum_h h_m(h)/h = m/phi(m) and sum_h h_m(h)/sqrt h = prod_{p\|m}(1-p^{-1/2})^{-1} <<_eps m^eps. Costs after (8): log x (e) × log x (r) × log x (s) × x/2 (n). (b) E_L: F(n)=f_r(n;d)f_s(n-2;e) is nonnegative and nondecreasing on J_x with F <= log^2 x, discrepancy < 1, so Abel gives <= 2F(x) per (d,e,r,s); summing gives L·V·Z·log^3 x <= x^{99/100} log^3 x since 70/100+24/100+5/100 = 99/100. |
| 6 | M_> | **CHECKED** | Same proof as row 5(a) on W_> = {U<d<=D_0, Y<e<=E_0, de>L}. Two things I verified independently: (i) W_> really contains every original term — k=n/d is an **integer** > V forces n >= d(V+1), hence d <= floor(x/(V+1)) = D_0, and likewise e <= E_0 (the note asserts this at line 242 without the integrality remark; the remark is what makes it true); (ii) the d-interval (max(U,L/e), D_0] has lower endpoint >= U >= U/2 and m = 2b_o <= 2es <= 2x <= x^2, so (8) applies throughout. |

Assembly: S - M = I_1 - I_2 + B (Vaughan, exact); B = Bcal(a) - Bcal(b) (exact);
Bcal(a) = P_1 - P_2 + R (exact); R = R_{<=L} + R_{>L} (exact); R_{>L} = M_> + E_>
(exact, discrete Abel). Six terms, all O_H. No o(x) survives: the only o(x) in the
upstream notes (prime-detection-spec (13), shifted-prime (1)/(3),
signed-divisor-grouping (3)/(18)) is the M error, and row 1 sharpens exactly that.

### Independent finite checks (these are checks, not proofs)

Two scripts written in the session scratchpad (`chk.js`, `chain.js`/`chain2.js`),
never in the repo. All pass:

* Möbius excluded-prime convolution mu(n)1_{(n,m)=1} = (mu*h_m)(n), m<=60, n<=400.
* beta expansion (9) for V ∈ {3,5,10,20}, d<=25, n<=800.
* CRT density delta(a,b) = (g/ab)1_{g|2} and the < 1 interval discrepancy, a,b<=40.
* The exact discrepancy identity (16), Delta(m) = psi((A-n_0)/q) - psi((m-n_0)/q),
  including psi(integer) = -1/2 and the (15) construction of n_0, a,b <= 30.
* All four rows of the shifted-prime §3 parity table, including the g=1/ℓ-even
  branch and the claim that f even already forces h odd, ℓ,k <= 60.
* Vaughan's identity (10) for four (U,V) pairs, n <= 600.
* The (13) kernel condition: g=(dr,es)|2 <=> (r_o,b_o)=(a,b_o)=1 and
  min(eps+rho,tau)<=1, with g = 2^{min}; d<=60, r<=20, es<=60.
* End-to-end, at x=512 with test cutoffs U=V=3, Y=Z=2, L=40:
  S-M = I_1-I_2+B (exact), B = Bcal(a)-Bcal(b) (exact),
  Bcal(a) = P_1-P_2+R with P_1,P_2 coded literally from (8) (exact),
  zero original R_{>L} terms outside the W_> global bounds,
  R_{>L} = M_> + E_> (exact, agreeing to 1e-6).
  The last one is the strongest single check: it exercises the CRT kernel, the
  endpoint convention and the incompatible-congruence-gives-zero rule together.

## Imported theorems

Statements fetched and read verbatim from the cited sources on 2026-09-06.

| # | theorem | source, as cited | statement actually found | hypotheses | met? |
|---|---|---|---|---|---|
| 1 | PNT with classical error | Tao, 254A Notes 2, **Corollary 39** | "Prime number theorem with classical error term": sum_{n<=x} Lambda(n) = x + O(x exp(-c sqrt(log x))), "in particular ... = x + O_A(x log^{-A} x) for any x>=2 and A>=0" | x >= 2 | **Yes.** Applied at x and x/2; A fixed. |
| 2 | Bombieri–Vinogradov | Tao, Notes 3, **Theorem 17** | sum_{q<=Q} sup_{a in (Z/qZ)^×} \|Delta(Lambda 1_{[1,x]}; a (q))\| <<_A x log^{-A} x for Q <= x^{1/2} log^{-B} x, B=B(A) | Q <= x^{1/2}log^{-B}x; sup over **primitive** classes; **fixed** endpoint x (no sup over y<=x) | **Yes**, at Q = D = x^{12/25} and residue -2 mod d with d odd. Two remarks: (a) because there is no sup over y, the mesh argument at prime-detection-spec.md:133-139 is *required*, not merely an alternative — the note supplies it, so the application stands; (b) Tao's Delta(f;a(q)) subtracts (1/phi(q)) sum_{(n,q)=1} f(n), not x/phi(q). The notes write x/phi(q). The gap is (psi(x)-x)/phi(q) + O(log^2 x/phi(q)); summed over q<=D it is <<_A x log^{1-A}x + log^3 x. Negligible, but unremarked in the note. |
| 3 | Vaughan's identity | Tao, Notes 3, **Lemma 18** | Lambda = Lambda_{<=V} + mu_{<=U}*L - mu_{<=U}*Lambda_{<=V}*1 + mu_{>U}*Lambda_{>V}*1 | U,V > 1 | **Yes.** Character-for-character identical to prime-detection-spec (10) and reused at (Y,Z) in shifted-prime (7). Verified numerically as well. |
| 4 | Möbius mean | Tao, Notes 2, **Exercise 66**, q=1 case | "Siegel–Walfisz for the Möbius function": sum_{n<=x, n≡a(q)} mu(n) <<_A x log^{-A} x for all residue classes (not necessarily primitive), **ineffective** constant | x >= 2 | **Yes** for q=1. Used in polylog-fold-transfer §4 and signed-divisor-grouping (4). Note: the q=1 case also follows effectively from item 1, so the ineffectivity here is not binding. |
| 5 | Möbius Bombieri–Vinogradov | **Le Boudec, EPFL Topics in Number Theory, Sheet III, Exercise 4** | verbatim: "sum_{q<=x^{1/2}/(log x)^B} max_{a (mod q)} \| sum_{n<=x, n≡a (mod q)} mu(n) \| << x/(log x)^A, where the maximum is taken over integers a coprime to q" | q <= x^{1/2}/(log x)^B, B=B(A); a coprime to q | **Yes** as used: shifted-prime (4) copies it exactly, and the §3 parity reduction delivers only primitive classes. **Citation quality is the weak point:** this is an exercise sheet ("Steps: (I)... (II)... (III) Follow the steps of the proof of the Bombieri–Vinogradov Theorem"), i.e. a problem set asking the student to prove the statement, not a theorem in a primary published source. The result is standard and follows from Tao Notes 3 Theorem 16 by the sheet's own step (III); I did not run that derivation. Recommend replacing the citation with a published one (Iwaniec–Kowalski, or the Theorem 16 route written out). This is a provenance defect, not a mathematical one. |
| 6 | Siegel–Walfisz | Tao, Notes 2, **Exercise 64** | Siegel–Walfisz for Lambda, ineffective c_A, q <= log^A x | q <= log^A x | Correctly cited, but **used only in polylog-fold-transfer §2-§3**, which is *not* one of the six rows. Row 3 (Bcal(b)) uses item 4 only. Not load-bearing for this chain. |

Effectivity: items 2, 4 and 6 are ineffective (Siegel). So the O_H in (2) is
ineffective and no onset can be computed. Both `endpoint-target-audit.md`:81-83 and
`RESEARCH-HANDOFF.md` already say this; consistent.

Level of distribution: nothing in the six rows uses a level above x^{1/2}. The
prime-BV use is at x^{12/25} = x^{0.48}; the Möbius-BV use is at x^{1/10} against a
square-root scale of at least x^{3/25} = x^{0.12}. Both have fixed power margins
(0.02 and 0.02 respectively), which is what allows the arbitrary log losses.

Residue-class uniformity — the specific hazard flagged in the brief: in
shifted-prime (6) the class for d is 2k^{-1} (mod ℓ), i.e. it depends on the other
variable k. The imported statement carries `max over a coprime to q` **inside** the
q-sum, so the dependence is harmless. This is only true because §3 reduces every
branch to a *primitive* class; if the g=1/ℓ-even branch had been left as
"d ≡ 0 (mod 2)" with an imprimitive class, the import would not cover it. The note
says as much at line 122-123 and it is correct.

Excluded-prime parameter and interval lower endpoint — the other flagged hazard: in
signed-divisor-grouping (7) the parameter is m = 2b_o <= 2es, bounded by x^2 in both
§4 and §5, and the interval lower endpoint is t >= U/2 >> x^{6/25}. Both are
polynomially bounded as required, and (7) is proved uniformly in m rather than
assumed. Line 222-224 makes the point explicitly. Checked.

Fixed H used with a growing parameter: none found. H is fixed before K in §2, the
BV/Möbius exponent A is fixed and enlarged only by fixed amounts (log^3 in §4,
log^{K} mesh points, log^3 in shifted-prime (9)). The audit's own falsifier
"if a constant must be uniform in a growing H" is satisfied.

## Definition drift found (including harmless)

1. **Fourth variable letter.** `shifted-prime-decomposition.md` and
   `signed-divisor-grouping.md` call it `v`; `RESEARCH-HANDOFF.md` §3 calls it `t`.
   Same object (`dk - ev = 2` vs `dk - et = 2`, beta_Z on it). Harmless.
2. **`L` overloaded three ways.** Product cut floor(x^{7/10}) (signed-divisor-grouping,
   endpoint-target-audit); L(n) = log n (prime-detection-spec (10) and Vaughan);
   polylog exponent Q <= (log x)^L (polylog-fold-transfer §1). Harmless in context.
3. **`R` overloaded three ways.** The residual R(x); the set of odd primes R in
   polylog-fold-transfer §4; the pair numerator R = h_1 l_2 - h_2 l_1 in
   grouped-divisor-moment §6 and handoff §5. The handoff flags the third; the second
   is unflagged.
4. **`H` overloaded.** The fixed logarithmic exponent H throughout, versus the
   harmonic band H in handoff §4 and grouped-divisor-moment (21). Given that the
   whole chain's precision claim is "for every fixed H", this one is worth renaming.
5. **`A` and `B` overloaded.** A = the BV log exponent, the interval left endpoint
   A = x/2 in signed-divisor-grouping (16)-(17), the harmonic scale A in handoff §4,
   and the coefficients A_0/A_1. B = the bilinear sum B(x), the right endpoint B = x
   in (16)-(17), the set B in residual-coverage (13), B_exc, and the coefficient norm
   B in handoff §4.
6. **`c` overloaded.** The Vaughan coefficient c(d); the margin constant c/c_0; the
   completion modulus c (handoff flags); the Perron abscissa c = 1/log x.
7. **`b` overloaded.** The comparator b(n); the right interval endpoint b in (8);
   the exponent b = nu + 1/20; the right coefficient b_u; the odd part b_o.
8. **`W` overloaded.** The beta cutoff W in beta_W; the divisor regions W_>, W_*,
   W_dagger; the cross budget W_L/W_R in residual-coverage §3.
9. **Stale weaker rate in three live note bodies.** `prime-detection-spec.md` (13),
   `shifted-prime-decomposition.md` (1)/(3), `signed-divisor-grouping.md` (3) and
   line 282 all still state the reduction with `+ o(x)`. Each cross-references
   `endpoint-target-audit.md`, so this is not a contradiction, but the live layer of
   three notes states a weaker rate than the canonical one in `RESEARCH-HANDOFF.md`
   §3. Under the repo's doc convention (body = latest full understanding) these
   should carry the O_H form.

**No drift found in the load-bearing objects.** beta_W(k) = sum_{r|k, r>W} Lambda(r)
is byte-identical in prime-detection-spec §4, shifted-prime §1, signed-divisor-grouping
§1 and handoff §3. U=V=floor(x^{6/25}), Y=Z=floor(x^{1/20}), D_0=floor(x/(V+1)),
E_0=floor((x-2)/(Z+1)) agree across prime-detection-spec, shifted-prime,
signed-divisor-grouping, residual-coverage, grouped-divisor-moment, endpoint-target-audit
and the handoff. The alpha_r/f_r prime-power expansion and the P_V, P_Z sets agree
between signed-divisor-grouping (9) and residual-coverage (16). The sawtooth
convention psi(u) = {u} - 1/2 with psi(integer) = -1/2 is used consistently in
signed-divisor-grouping (16) and asserted in the handoff; my numeric check of
R_{>L} = M_> + E_> confirms the two endpoints A = x/2 and B = x and the
incompatible-gives-zero rule are exactly as written.

E_* (residual-coverage (16), region de > floor(x^{3/4}) and d^5 e^2 > floor(x^{49/20}))
and E_dagger (grouped-divisor-moment (19), same plus d > floor(x^{151/200}) or
de^3 > floor(x^{321/200})) are literally the signed-divisor-grouping (17)-(18) kernel
restricted to smaller (d,e) sets. Handoff §3's W_dagger matches (19) exactly
(3/4 = 0.75, 49/20 = 2.45, 151/200 = 0.755, 321/200 = 1.605). Definitions consistent.

## Imprecisions found (none changes a conclusion)

1. `prime-detection-spec.md:129-130`: "For even d, a(dk) can be nonzero only when
   dk-2 is a power of 2. The crude bound O(log x) per modulus costs O(D log x)."
   The true per-modulus bound is O(log^2 x) (O(log x) powers of 2, each of weight up
   to log x), so the cost is O(D log^2 x). Still << x/log^A x since D = x^{12/25}.
2. `prime-detection-spec.md:135-136`: "Positivity of Lambda bounds the interpolation
   cost after summing d by O(x log^{1-K} x)." Summing (x/(d log^K x) + 1)·log x over
   d <= D gives O(x log^{2-K} x + D log x). One log understated; K is arbitrary, so
   harmless.
3. `endpoint-target-audit.md:51-52`: "The terms with j>=2 cost O(sqrt(x) log^2 x) by
   counting proper prime powers and bounding each weight by O(log x)." The count of
   proper prime powers up to x is O(sqrt x / log x), and the weight log p/(p-2) is
   O(1), so the true cost is O(sqrt x). Over-generous in the safe direction.
4. `signed-divisor-grouping.md:213`: "Sigma_{r<=V} Lambda(r)/r << log^2 x." The true
   size is << log V ≍ log x. Over-generous in the safe direction.
5. Tao's Delta normalisation (item 2 in the theorem table) is unremarked in
   prime-detection-spec §3. Negligible, but a reader reproducing the step will hit it.
6. `signed-divisor-grouping.md:242` asserts W_> "contains every original term of
   R_{>L}" without the one-line reason (k and v are integers exceeding V and Z, which
   is what forces d <= D_0 and e <= E_0 — not just d < x/V). Worth adding; the claim
   is true, and my enumeration at x=512 found zero terms outside.

## What I did not check

* **The two transfers that carry the recent work.** E_> - E_* (residual-coverage
  §§2-4) and E_* - E_dagger (grouped-divisor-moment §§1-5). I read residual-coverage
  §§1-5 and grouped §5 only far enough to confirm the E_*/E_dagger definitions match
  the upstream kernel, and I re-derived the budget algebra in residual-coverage (12)
  (J_R = 31/50 + theta/2; W_R <= 5theta/4 + 3/200 using delta >= 6/25; P_R <= theta +
  43/200 using nu >= 1/20; W_L = (5delta+2nu)/4 + 77/200) and in grouped (16)/(18)
  ((1+a)/2 = 41/50, a/2+3b/2 = 199/200, a = 16/25 at delta=nu=2/5; 399/400, 399/400,
  199/200 at kappa=151/200, lambda=321/200). That algebra is internally consistent.
  **The analytic content behind those budgets — the completion, the Weil/Ramanujan
  inputs, the Vaaler majorant, the gcd averages, the Perron separation — is
  unreviewed here.** Given the brief's note that ~20 notes were written and
  integrated in ~36 hours, that is where a second audit should go.
* Whether Pascadi Lemmas 3.2-3.3, Bettin–Chandee Theorem 1 / Remark 1 and the Vaaler
  majorant are correctly stated and correctly applied. Not fetched, not read.
* polylog-fold-transfer §§1-3 and §5 (the local model, (11)); not in the six rows.
* `endpoint-target-audit.md` §4 (the Kloosterman-scope comparison). It is a scope
  argument about a different note, not a chain step. Its logic — "a published upper
  bound exceeding the desired budget does not establish that the underlying signed
  sum exceeds it" — is correct as stated, and it correctly claims nothing more.
* The repo validators `prime-detection-validation.js`, `shifted-prime-validation.js`,
  `signed-divisor-validation.js`. I did not run them; I wrote independent checks
  instead, precisely so that a shared bug could not hide.
* Any question of whether the OPEN margin (3)/(5) is plausible. Out of scope, and
  nothing here bears on it.

## One line for the ledger

The classical half of the reduction — Vaughan twice, prime BV at x^{12/25}, Möbius BV
at x^{1/10}, the excluded-prime Möbius mean, and the exact CRT/Abel endpoint split —
holds as written with O_H(x/log^H x) precision, constants depending on H only, no
o(x) survivor, and no import used outside its hypotheses. One citation
(Möbius BV, an EPFL exercise sheet) should be replaced with a published source. The
E_> -> E_dagger transfer, which is what the current handoff headline actually asserts,
was not audited and is not covered by the endpoint-target-audit §1 table.
