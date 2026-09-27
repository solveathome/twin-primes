# Source match for the signed transition kernel R_11

<!-- ledger
id: Q-transition-source-match
status: ANSWERED
todo: C
parity: Scoped primary-source statement matching and exact divisor algebra. A failed direct substitution does not exclude a paper's methods. The full coefficient representation, parameter costs and fixed-shift estimate remain unproved. No signed saving or twin margin is supplied.
question: Do the inspected divisor-correlation, shifted-convolution and averaged-Chowla statements directly supply a usable estimate for the exact transition kernel?
verdict: No direct supplier was established among the inspected statements. The cofactor exchange and Theta identity are exact, but their scalar coefficient mass is not a full bounded-class representation for T. The transition Mellin kernel requires a sharp subtraction with a 1/s tail. Fixed-divisor singleton fibers differ from potentially long cofactor fibers. The fixed-shift arbitrary-factor relaxation is refuted; broader signed and cutoff methods remain open.
-->

**No signed improvement or sufficient twin margin is established.** This
source match is corrected by [transition-round-audit.md](transition-round-audit.md).
It records failed direct applications, not absence of a suitable theorem or
exhaustion of a method. The original round was executed under
[the specification](transition-source-match-spec.md) from `cb51292`.
The returned version is preserved in Git at `cb957a1`.

## 0. Exact object and available budget

With the contract's floors and fixed 0<eta<1/400, write

\[
 \tau_i(d)=\rho_i(d)1_{D_i<d<z_i},\quad
 T_i(n)=\sum_{d\mid n}\mu(d)\tau_i(d)\beta_{W_i}(n/d),\quad
 R_{11}=\sum_{n\in J_x}T_L(n)T_R(n-2).
\]

The available absolute bound is 2B eta x log^2 x(1+o_eta(1)), from the
uniform truncated-Mobius mean square. A one-sided bound or an admissible
joint estimate is needed for the consumer; its sign is not given by norms.

## 1. Two exact identities and the representation gap

Define Theta_i(m)=sum_(d|m)mu(d)tau_i(d). Interchanging finite sums gives

\[
 T_i(n)=\sum_{r\mid n,\ r>W_i}\Lambda(r)\Theta_i(n/r).          \tag{1}
\]

For Lambda_R(m)=sum_(d|m,d<=R)mu(d)log(R/d),

\[
 \Theta_i(m)=\frac{\Lambda_{z_i}(m)-\Lambda_{D_i}(m)}{L_i}
              -M(m,D_i),\quad L_i=\log(z_i/D_i).              \tag{2}
\]

Both identities retain all prime powers with Lambda(p^a)=log p. They
are checked by the formal-coefficient validator, including controls that
omit M or replace d|n/r by d|n.

The three scalar coefficients in (2) have absolute sum 1+2/L_i.
For a product of two Theta expressions their scalar product mass is
(1+2/L_L)(1+2/L_R). Neither number bounds the total cost of applying a
theorem to T: the sharp M terms and outer r,r' sums remain. On fixing
r,r', the arguments n/r and (n-2)/r' are affine forms along a progression,
with variable coefficients and prescribed residues. A normalized function
representation and the cost of summing its estimates have not been supplied.

**Lemma S (fixed divisors only).** For a fixed admissible pair d,e,
compatibility implies gcd(d,e)|2. The step in n is lcm(d,e)>=de/2>x/2
for all sufficiently large x at these cuts. Its fiber in J_x is empty or
singleton. This does not hold for the fixed-cofactor fibers k=n/d,
v=(n-2)/e: their step in n is lcm(k,v), and their clipped progressions can
be long. See the exact form and upper count in
[transition-signed-estimate.md](transition-signed-estimate.md) section 2.

## 2. How candidates are matched

Check the actual summation orientation, coefficient class, fixed versus
averaged parameters, sharp boundaries, uniformity and full error budget.
The raw divisor-band exponents and logarithmic losses are useful diagnostics
for a specified representation. They are not universal screens that exclude
a source before inspecting its alternative variables or mechanism.
A different reduction or proof adaptation can justify reopening a paper;
repeating an unchanged direct substitution cannot repair its mismatch.

## 3. Interface A: truncated divisor correlations and one-point moments

Goldston–Yildirim III, equations (8.1)–(8.2) and Theorem 8.1, estimates
products of truncated Lambda sums at shifts of a common variable. The
error budget contains the product of truncation levels. At raw levels
z_L,z_R this product has exponent 171/100-2eta>1, so that displayed
budget alone is insufficient. It remains an upper budget, not a lower
bound on the actual error. More basically, (1)–(2) do not yet reduce
R_11 to those shifted products: M terms and variable affine forms remain.
[Primary paper](https://arxiv.org/pdf/math/0209102).

GKM Theorem 1.3 has two statements: (1.14) evaluates an lcm main form;
(1.15) evaluates a finite band moment and explicitly assumes R^(2k)<=x.
At k=1 the latter does not cover the raw transition levels exceeding
x^(1/2). It is also a one-point moment, not the required signed correlation.
The wider-range results elsewhere in that paper should not be excluded
by quoting the range of (1.15) as a restriction on the entire method.
[Primary paper](https://arxiv.org/html/1606.06781v4).

**Disposition:** no direct signed estimate. Equations (1)–(2) are reusable;
a source application still needs the full coefficient and affine-form match.

## 4. Interface B: shifted convolutions and the Mellin correction

Topacogullari Theorems 1.1–1.2 concern d_k(n)d(n+h), with specified smooth
weights in the latter. Drappeau Theorem 1.5 concerns specified divisor
correlations. Neither statement directly permits replacing their arithmetic
coefficients by our restricted Mobius divisor sums. This is a statement
mismatch, not an impossibility theorem for spectral or dispersion methods.
There is no justified blanket x^(1/2) modulus ceiling for these papers.
[Topacogullari](https://arxiv.org/pdf/1605.02364),
[Drappeau](https://arxiv.org/pdf/1504.05549).

The claimed cheap Mellin separation also needs correction. For c>0,

\[
 \frac1{2\pi i}\int_{(c)}d^{-s}\frac{z^s-D^s}{Ls^2}\,ds=\rho(d),
 \qquad \tau(d)=\rho(d)-1_{d\le D}.
\]

For d different from D the transition kernel is
K(s)=(z^s-D^s)/(Ls^2)-D^s/s. At d=D the Perron half-weight must also be
corrected. Its 1/s tail prevents the asserted absolute infinite-height
separation cost. A finite-height treatment must price truncation and
endpoint errors along with the proposed theorem's twist uniformity.
[The review](transition-round-audit.md) derives this directly; a finite
control checks the inverse ramp below, inside and above the band.

**Disposition:** no direct supplier and no completed proof adaptation.
The missing lower cutoff cannot be removed to obtain a cheaper norm.

## 5. Interface C: averaged Chowla and fixed-shift uniformity

MRT Theorem 1.6 allows 1-bounded functions with one multiplicative factor,
**averages shifts**, and carries explicit dependence on the bound A for
its affine coefficients. Its displayed error includes (log X)^(-1/3000).
A prescribed shift or residue can be exceptional; coefficient growth,
normalization and sampling must be paid before applying it to (1).
[Primary paper](https://arxiv.org/html/1503.05121v3).

The quantitative test is the product of the actual representation mass
and the theorem's rate, together with every parameter and truncation cost.
Mass log^2 x times the displayed logarithmic term does not tend to zero;
mass one times that term does. The existing sharp-subfamily normalization
is not a representation of full T, and no universal requirement to save
more than two logarithms follows. A pointwise divisor-function truncation
would also need its discarded mass controlled at the consumer's scale.

A fixed-shift version uniform over an arbitrary other factor is false:
for n>=3 take g_1(n)=lambda(n-2), g_2(n)=lambda(n). Their relevant product
g_1(n)g_2(n-2) is one. Define g_1 arbitrarily at 1 and 2. This refutes
that relaxation, without specifying how every successful argument must work.

**Disposition:** no fixed-shift input for T is supplied. A logarithmic or
shift-averaged source remains usable only after a matched transfer, with
exceptional sets and a common-scale consumer priced.

## 6. Source custody

These fetch records belong to the executed round. The direct review read
the primary statements again and corrected their interpretation; it does
not claim a new hash comparison for each PDF.

All fetches by `curl` into the session scratchpad, text extracted with
`pdftotext -layout`, statements read in the extracted text. No abstract or
search summary is used as a theorem statement. No fetch failed; no 403 or
paywall was encountered. Read 2026-09-06.

| source | URL fetched | version stamp | statements read | PDF SHA-256 |
|---|---|---|---|---|
| Goldston-Yildirim, *Higher correlations of divisor sums related to primes III: k-correlations* | `https://arxiv.org/pdf/math/0209102` | v1, 10 Sep 2002 | (1.1)-(1.5), Thm 1.1, Thm 1.2, (1.8)-(1.9), §8: (8.1)-(8.2), Thm 8.1, (8.6)-(8.12) | `6be1422119bf78f43ea265da70bc73ce6b952ca07560f80b5105d96a81eca66f` |
| Goldston-Yildirim, *... I: triple correlations* | `https://arxiv.org/pdf/math/0111212` | as posted | Thm 1.1 and its O(R^k) error only | `a2a867d18cbdfb31ef5765b9fa8900f0c746d70568e332eecb1c3cabd22df5f5` |
| Granville-Koukoulopoulos-Maynard, *Sieve weights and their smoothings* | `https://arxiv.org/pdf/1606.06781v4` | v4 | Thm 1.1, Thm 1.3 with (1.14)-(1.15), Thm 1.6, Thm 1.7; full-text search for shifted statements | `67feecce65ced4250aa046d6e0c36300744eb84358d21d53409a512d1649e34d` |
| Topacogullari, *The shifted convolution of generalized divisor functions* | `https://arxiv.org/pdf/1605.02364` | v1, 8 May 2016 | §1 including (1.1)-(1.4), Thm 1.1, Thm 1.2 | `b1d21df0b731cd9d8e8b4898cef4863626ac095978e06df1bd7f57cb61e54d08` |
| Topacogullari, *The shifted convolution of divisor functions* | `https://arxiv.org/pdf/1506.02608` | as posted | retrieved, **not read** beyond the abstract | `c00ccb755598d423af9336364ac052312eeaa52631df32c4bd38c58e12ccf1c4` |
| Drappeau, *Sums of Kloosterman sums in arithmetic progressions, and the error term in the dispersion method* | `https://arxiv.org/pdf/1504.05549` | as posted | Thm A, Thms 1.1-1.6, Thm B with (1.3)-(1.5), the level footnote on page 4 | `7d5b2f3c2dac35f09004f005bfc6de9696979cdf05c4330b25c346a81f4d924f` |
| Matomaki-Radziwill-Tao, *An averaged form of Chowla's conjecture* | `https://arxiv.org/pdf/1503.05121` | v3 | Thms 1.1, 1.2, 1.3, Conj. 1.5, Thm 1.6 with (1.10)-(1.12), and the method-ceiling remark after Thm 1.2 | `8a2633b1594615fe0c340bbca01ad059be5bd66d3495bd028e7e9d2264f1e688` (matches the hash recorded in prime-band-transfer §4) |

No proof in any of these papers was independently verified. Every use above
is a statement match or an explicit hypothesis mismatch.

## 7. Verification and research use

[transition-source-match-validation.js](transition-source-match-validation.js)
checks (1)–(2), fixed-divisor singleton arithmetic and rational comparisons.
It cannot certify source applicability, a representation cost, a universal
rate requirement or any asymptotic estimate. The corrected labels distinguish
those calculations from the conclusions previously attached to them.
[transition-round-audit-validation.js](transition-round-audit-validation.js)
adds controls for the missing transition cut and fiber orientation.

Reuse the identities while retaining all costs. A further source attempt
should specify the exact clipped affine-form average, or a joint cutoff
correlation, and name the uniformity it needs. The three failed direct
applications do not close those research directions. The signed kernel,
the outside remainder and the sufficient twin margin remain OPEN.
