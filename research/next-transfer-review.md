# Adversarial verification of the multiplicative band transfer

<!-- ledger
id: Q-next-transfer-review
status: ANSWERED
todo: C
parity: Review only. The arithmetic inputs consumed are the imported Tao-Teravainen arXiv:2512.01739v2 Theorem 3.1(ii) and the imported Matomaki-Radziwill-Tao arXiv:1503.05121 equation (1.12), both read at source and neither reproved, together with elementary CRT, Mertens, quantitative PNT and Fourier steps and finite algebra. No new estimate, no controlled region, no o(x) bound and no twin margin is claimed here.
question: Does prime-band-transfer.md (1)-(6) follow at exactly its stated scope, and does any step fail against an adversarial reading of its hypotheses?
verdict: The derivation (1)-(6) survives at its stated continuous-average scope. The coordinating round review corrects check l: interval stability additionally gives a dyadic scale average, with a further exponent loss. There is no every-dyadic estimate, o(N), full-corner control or twin margin. Proper-prime-power branches have a separate negligible fixed-corner bound.
-->

**Twin-prime infinitude and the sufficient signed margin remain OPEN. This
review adds no estimate, no controlled region and no margin.** It checks one
newly written derivation against its own stated scope and against the printed
hypotheses of the two theorems it imports.

**Current qualification:** [round-review-0906.md](round-review-0906.md)
retains the checked derivation (1)--(6) but corrects the overly broad
dyadic exclusion in check l below. Bounded-interval stability gives a
dyadic scale-average saving with another exponent loss. No every-dyadic
bound, o(N) or twin margin follows. Proper-prime-power branches also
already have a separate negligible fixed-corner bound.

Baseline: commit `10f64919495ee7e5300120ecb6aead1ca7e91c94`, `git status
--short` empty at dispatch. Reviewed note:
[prime-band-transfer.md](prime-band-transfer.md), status PARTIAL.

## 1. Verdicts

| # | step | verdict | one-line reason |
|---|---|---|---|
| a | multiplicativity and 1-boundedness of g_{B,t} | PASS | L_B is additive on coprime arguments and mu is multiplicative, so g(mn)=g(m)g(n) for (m,n)=1; \|g\|<=1 since \|mu\|<=1 and the exponential is unimodular |
| b | Fourier identity (1) | PASS | psi=u*chi with chi smooth and 1 on [0,2] exists, hat psi is Schwartz hence L^1, and L_B(n)<=log n<=2 log X for n<=2X+2 puts ell_B in [0,2] where psi(u)=u |
| c | pretentious-distance comparison (2) | PASS | D uses only prime values, g_{B,t}(p) and mu(p) differ only for p in B and by at most 2 in modulus, and \|inf f - inf g\| <= sup\|f-g\|; Mertens makes 2*sum_{p in B}1/p = 2 log(beta/alpha)+o(1) |
| d | MRT (1.12) supplies exp M >> (log X)^{7/24} but not log X | PASS | (1.12) read at source gives M >= (1/3-eps) loglog X + O(1) for conductors q <= (log X)^{1/125}; at Y=X^2 and eps=1/24 this is 7/24 > 1/4, and 1/3-eps never reaches exponent 1 |
| e | source theorem structure, shift 2, modulus 1, functions fixed per X | PASS | Theorem 3.1(ii) read at source: L^{-c} bound off a set of logarithmic measure << log X * L^{-c}, W in [L^c], integers b,h1,h2 = O(L^c) with h1 != h2, natural average on (N,2N], g1,g2 fixed given X |
| f | integral (3) | PASS | \|A\|<=2 on the exceptional set of measure << log X (log X)^{-c}, and the theorem's (log X)^{-c} off it against ((1/2) log X) of measure; both terms are (log X)^{1-c}, uniformly in t,s |
| g | Tonelli order for (4) | PASS | the integrand \|hat psi(t)\|\|hat psi(s)\|\|A_{t,s}(N)\| is nonnegative and jointly measurable, so the t,s integral passes outside the N integral without any common exceptional set |
| h | window-to-band replacement and CRT error versus N >= sqrt(X) | PASS | the symmetric difference is the upper strip of multiplicative width at most 2 plus at most two integers above V; the main term is O_eta(N log X) and the CRT error is O(X^{29/100+4eta+o(1)} log^2 X) <= N X^{-1/5} log^2 X at every N >= sqrt(X) |
| i | mesh count, symmetric-difference mass, disjointness, error (5) | PASS | O(1/delta) intervals cover theta in [1/2,1]; endpoint log-shift O(delta log X + 1) gives symmetric-difference mass O(delta log X + 1) against band mass O_eta(log X); left and right bands stay separated because 1/20+2eta < 3/25 |
| j | summing over frozen pairs, delta=(log X)^{-c/2}, boxed (6) | PASS | each mesh interval's integral is bounded by the full nonnegative integral, so the cost is exactly 1/delta; at delta=(log X)^{-c/2} the two competing terms are equal and 1/log X is dominated because c<1 |
| k | proper-square error and endpoint rounding absorbed | PASS | corner-correlation (5) carries O(x^{19/20+eps}) at x=2N, which after the N log^2 X normalization is X^{-1/40+eps'}, below every log power |
| l | continuous versus dyadic in section 4 | CORRECTED SCOPE | a bare integral does not give every-dyadic control, but interval stability additionally gives a dyadic scale average; round-review-0906 §2 derives it. The no-o(N) and no-margin conclusions stand. |

**First actual gap: there is no load-bearing gap.** The chain (1) to (6) follows at the stated
scope from the two imported theorems plus elementary steps. Four steps are
true but unstated in the note, and one sentence is imprecise; all five are
recorded in section 3 and none of them changes a bound.

## 2. What was read at source

Fetched with `curl` and hashed locally on 2026-09-06. Both PDF digests
reproduce the custody hashes recorded in the reviewed note.

| source | version and URL | what was read | SHA-256 of the PDF |
|---|---|---|---|
| Tao and Teravainen, *Quantitative correlations and some problems on prime factors of consecutive integers* | v2, 2026-04-25, `https://arxiv.org/html/2512.01739v2` and `https://arxiv.org/pdf/2512.01739v2` | Theorem 3.1 in full including axioms (i) and (ii), (3.1)-(3.4), Remarks 3.2 (all three bullets), the definitions of the pretentious distance and of M(g;X) and M(g;X,Q) | `ce10e83b10c6544e1dbff037a5e4efa0e387892e0fc596ae09dce76025d7b41e` |
| Matomaki, Radziwill and Tao, *An averaged form of Chowla's conjecture* | `https://arxiv.org/pdf/1503.05121` (latest version; digest matches the note's recorded v3) | equation (1.12) with its displayed justification, the definitions of D(f,g;X) and M(g;X,Q), and the statement of Theorem 1.6 around it | `8a2633b1594615fe0c340bbca01ad059be5bd66d3495bd028e7e9d2264f1e688` |

No fetch failed. Nothing below rests on an abstract, a search summary or a
secondary description.

Printed statements used, quoted in substance:

- Theorem 3.1(ii): for 1-bounded multiplicative g1,g2 and 1 <= L <= log X,
  if delta_N = 0 for all X^{0.4} <= N <= X and
  exp(M(g1;X^2,log^{1/125}X)) >> L, then for a sufficiently small absolute
  c > 0 there is E contained in [sqrt X, X] with
  (1/log X) integral_E dt/t << L^{-c} such that for any W in [L^c] and
  integers b,h1,h2 = O(L^c) with h1 != h2,
  (W/N) sum_{N<n<=2N} (g1(n+h1)-delta_N) g2(n+h2) 1_{n = b mod W} << L^{-c}
  for all N in [sqrt X, X] \ E.
- M(g;X,Q) = inf over |t| <= X, q <= Q and chi mod q of
  D(g, n -> chi(n)n^{it}; X)^2, with
  D(f,g;X)^2 = sum_{p<=X} (1 - Re(f(p) conj(g(p))))/p. The definitions in the
  two papers agree verbatim.
- MRT (1.12): for g = lambda and Q, M as in their Theorem 1.6, for every
  eps > 0, M >= inf over |t| <= X, q <= Q, chi of
  sum_{exp((log X)^{2/3+eps}) <= p <= X} (1 + Re chi(p)p^{it})/p, which
  is at least (1/3 - eps) loglog X + O(1), read from the arXiv PDF of 1503.05121v3,
  section 1.1, display (1.12), PDF page 6, in this note's notation; the
  source justifies it by the Vinogradov-Korobov zero-free region, and it
  applies because chi has conductor q <= (log X)^{1/125}.

## 3. Checked hazards, and the five things the note leaves unsaid

**H1. Condition (3.2) is scoped to axiom (i) only. Checked, and it matters.**
Theorem 3.1's technical condition g1(p) = 1 for
exp(log^{1/11} X) <= p <= exp(log^{1/10} X) is printed after (3.1) and before
the label (ii). In the LaTeXML markup of the v2 HTML both (3.1) and (3.2) sit
inside the list item `S3.I1.ix1`, which carries the tag `(i)`; axiom (ii) is
the separate item `S3.I1.ix2`. The paper's own third bullet in Remarks 3.2
derives a Chowla-type bound for Liouville from Theorem 3.1(ii), and
lambda(p) = -1 violates (3.2), so (3.2) cannot bind case (ii). This is
load-bearing for the transfer: g_{B,t}(p) = -1 for every p below the band,
including that whole range, so a global (3.2) would have refuted the
application outright. The reviewed note does not mention (3.2) at all;
recording the check here closes that hole. Calibration: verified against the
source markup and against the paper's own use.

**H2. The shift assignment is not written down, and either choice is
harmless.** The note's A_{t,s}(N) = N^{-1} sum_{N<n<=2N} g_{B,t}(n)
g_{B',s}(n-2) is exactly (3.4) with W = 1, b = 0, h1 = 0, h2 = -2, which are
integers of size O(1) = O(L^c) with h1 != h2. Taking instead h1 = 2, h2 = 0
gives the same sum on a shifted interval, differing in at most four
1-bounded terms, so O(1/N) per scale and O(X^{-1/2}) after the dN/N integral
and the 1/log X normalization. Derived, negligible either way.

**H3. Uniformity of (2) across the growing family of frozen bands is used but
not stated.** In section 2 the band is fixed and 2 sum_{p in B} 1/p =
O_{alpha,beta}(1) suffices. In section 3 there are O(1/delta) frozen bands,
and delta goes to zero with X, so the number of distinct bands grows. The
constant does not degrade: for B_theta = ((2N_theta)^w, (2N_theta)^{w+2eta}]
with N_theta in [sqrt X, X], Mertens gives sum_{p in B_theta} 1/p =
log(1 + 2eta/w) + o(1), which is independent of theta. The same remark covers
the exponent range fed to the theorem, since (2N_theta)^w lies between
X^{w/2} and X^{w+o(1)}, both fixed. Derived, and it holds.

**H4. The lower edge of the window is not named separately.** Section 3 prices
"a strip of multiplicative width at most 2 at the upper edge, plus the
vanishing floor adjustments". Working the geometry out: with x = 2N,
V = floor(x^w), D_0 = floor(x/(V+1)) and D_1 = floor(x^{19/25-2eta}), the
constraint n/r <= D_0 is not implied by r > V at the top of the n-range, and
contributes a second discrepancy set. That set is contained in
(V, n/D_0] with n/D_0 <= V + 1 + o(1), so at most two integers wide, which is
what "vanishing floor adjustments" has to mean. The finite validator confirms
that at two scales every disagreement between the exact window and the pure
band lies in the upper strip or in the two integers above V, and that a strip
factor of 1.001 in place of 2 fails, so the width 2 is sharp rather than
generous. Derived plus verified on finite instances; not a defect.

**H5. One imprecise sentence in section 4.** "the bound on the normalized
absolute average |A_w|/N is only O_eta(log^{2-c_*}X)" reads as a pointwise
bound on |A_w(N)|/N. What (6) gives is a bound on the continuous logarithmic
scale average of |A_w(N)|/(N log^2 X). The next two sentences of the same
paragraph state the pointwise limitation correctly, so no downstream claim
depends on the loose reading, but the sentence should say "scale-averaged".
Wording only.

**H6. An observation about the MRT source, not load-bearing here.** MRT's
parenthetical in section 1.1 after (1.11) states that M(g;X,Q) is
non-decreasing in Q. From their own printed definition M is an infimum over a
set of characters that grows with Q, hence non-increasing in Q. The transfer
does not use that parenthetical: (1.12) is a direct lower bound whose stated
justification is the zero-free region for conductors q <= (log X)^{1/125},
which is exactly the conductor range Theorem 3.1(ii) requires, and Tao and
Teravainen cite (1.12) for precisely M(lambda; X^2, log^{1/125} X). Recorded
so that a later reuse of the source does not lean on the parenthetical.

Two further points, both consistent with the note and with review 21 F7.
Theorem 3.1(ii) puts the non-pretentiousness hypothesis on g1 alone; g2 needs
only 1-boundedness and multiplicativity, so the note establishes more than it
needs when it covers both. And Remarks 3.2 records that Pilatte obtained
L^{-c} errors with L = log X in the model case of Liouville. That is a
different theorem about a different function, reached without (3.3), and it
does not license L = log X for g_{B,t} through Theorem 3.1(ii). The note's
refusal to take L = log X is correct on the input it names.

## 4. The arithmetic behind checks h, i and j, written out

At x = 2N, with w = 6/25 on the left and w = 1/20 on the right and
0 < eta < 1/400 fixed.

*Window against band.* The exact window of corner-correlation (5) is
{r prime : r > V, D_1 < n/r <= D_0}. Its lower edge coincides with the band's
lower edge, since r > floor(x^w) and r > x^w agree on integers. Its upper edge
is r < n/D_1, which for n in (N, 2N] sweeps
[(1/2) x^{w+2eta}, x^{w+2eta}(1+o(1))], a multiplicative interval of ratio 2.
The one remaining piece is r < n/D_0 with n/D_0 <= V + 1 + o(1), the sliver
of H4.

*Cost of the swap.* Bounding
|L_B L'_{B'} - L_w L'_w| <= Delta * L'_{B'} + L_w * Delta' and swapping the
order of summation, each piece is
sum_{r,r'} (log r)(log r') (N/(rr') + O(1)) with r != r'. Mertens gives
sum over a multiplicative-width-2 strip of (log r)/r = log 2 + O(1) and over a
full band = 2eta log x + O(1), so the main term is O_eta(N log X). The error
term is O(#pairs * log^2 X) with #pairs <= X^{29/100+4eta+o(1)}. At eta =
1/400 the exponent is exactly 3/10, so at the worst scale N = sqrt X the ratio
#pairs/N is at most X^{3/10-1/2} = X^{-1/5}, and the note's quoted X^{-1/10}
in (5) is the weaker and therefore safe statement. This is the check the brief
names "CRT error versus N >= sqrt(X)": the comparison does go against N and
not against X, and it survives at the bottom of the range with a fixed power
to spare.

*Disjointness at the bottom of the range.* The left band sits above
X^{w/2} = X^{3/25} = X^{0.12} when N >= sqrt X; the right band sits below
X^{1/20+2eta} <= X^{11/200} = X^{0.055}. So r != r' throughout and CRT applies
with error O(1) per pair.

*Mesh.* theta = log N/log X ranges over [1/2,1], so O(1/delta) intervals of
length delta cover it. Freezing moves each log-endpoint by O(delta log X + 1),
giving symmetric-difference reciprocal-log mass O(delta log X + 1) against a
band mass O_eta(log X); after the N log^2 X normalization this is
O_eta(delta + 1/log X), and the CRT error contributes O(X^{-1/5}). Summing
(4) over the O(1/delta) frozen pairs costs the factor 1/delta because each
mesh interval's nonnegative integral is at most the whole-range integral.
Balancing delta^{-1}(log X)^{-c} against delta gives delta = (log X)^{-c/2}
and c_* = c/2, and 1/log X is dominated because c < 1.

## 5. What (6) gives, exactly, and what it does not

Derived, conditional on the two imports, at fixed eta and for all large X:
the normalized continuous logarithmic scale average over N in [sqrt X, X] of
|A_w(N)|/(N log^2 X) is O_eta((log X)^{-c_*}) for some fixed c_* > 0 whose
value is not extracted. Against the unsigned envelope of the same subfamily,
of order eta^2 N log^2 N by corner-correlation section 1.5 and review 21 F6,
that is a saving of a factor (log X)^{-c_*} in the scale average.

It does not give, and the note does not claim:

- a bound at every prescribed N. The later sampling argument gives a
  dyadic scale average and unbounded good dyadic scales, at a weak relative
  rate; membership in an exceptional set alone does not exclude this;
- o(N) at any scale, since the scale-averaged bound on |A_w|/N is only
  O_eta((log X)^{2-c_*});
- an estimate for prime-r branches with s > 1 or s' > 1 and their
  non-squarefree inputs. Proper prime powers are separately negligible
  by corner-correlation §1.1; formula (1) is not their representation;
- a new controlled divisor region, a change to any cut, or a signed margin.

## 6. Still open after this review

- The sufficient signed twin margin C_2 x + E_dagger(x) >= c_0 x/log^K x.
- Remaining prime-r branches with s>1 or s'>1, and the complement of
  S_0 at the global precision. The proper-prime-power bound is completed.
- A sufficiently strong rate and full-coefficient bound on the scales
  needed by the consumer. The later dyadic scale-average consequence is
  too weak for this and is not an every-dyadic pointwise estimate.
- The numerical value of c_*, which is inherited from an absolute constant
  in Theorem 3.1 that the source does not make explicit.

Falsifiers for this review, and their status: a global reading of the source's
condition (3.2) would refute the application, and the source markup and the
paper's own Liouville corollary rule that reading out (checked, section 3 H1);
a failure of uniformity in (2) over the frozen bands would break the mesh, and
Mertens supplies it (checked, H3); a CRT error of size N in (5) would break the
transfer, and the pair count is a fixed power below N at N = sqrt X (checked,
section 4); a non-integrable hat psi would break (1), and psi in C_c^infinity
rules it out (checked, b). The imported theorems are not reproved and their
proofs were not read.

## 7. Verification

The finite ingredients are checked in
[next-transfer-review-validation.js](next-transfer-review-validation.js), with
its output embedded by `node research/qc/embed.js`. It checks multiplicativity
of g_{B,t} on coprime pairs and 1-boundedness across four bands and five
values of t; fires two controls, that g_{B,t} is not completely multiplicative
and that mu*L_B is not multiplicative; verifies the window-to-band geometry of
H4 exactly at two scales with an active tightened-strip control; and checks
the exponent arithmetic of section 4 by cross-multiplied integer rationals.
It is finite algebra. It does not test the Fourier integral, the pretentious
distance comparison, either imported theorem or any asymptotic claim, and it
does not prove (6).
