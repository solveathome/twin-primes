# The corner correlation at finite dyadic x: a measurement, not a rate

<!-- ledger
id: Q-corner-measurement
status: PARTIAL
todo: C
parity: This note contains no arithmetic estimate and no proof step. Its only inputs are exact integer sieving (Mobius by segmented factorisation, prime bands by direct enumeration) and arithmetic on the resulting finite sums. Nothing is asserted about any method class, and no obstruction is claimed. The measurement can support or undercut a heuristic about the corner's cancellation; it cannot establish or exclude any asymptotic rate, and it supplies no residue, non-residue, bilinear or sieve input to any argument.
question: At finite dyadic x, how large is the corner two-point correlation K(x)=sum_{x/2<n<=x} mu(n)mu(n-2)L(n)L'(n-2) of corner-correlation (5) relative to C_2 x, to its own absolute mass, and to a matched random-sign control, and does |K|/mass fall with x?
verdict: MEASURED, on the range and cutoffs recorded in the bound OUTPUT block of corner-measurement.js. The dominant finding is disconfirming for the measurement itself, not for the corner: at every reachable x the actual right cutoff Z=floor(x^(1/20)) admits at most one prime in its band and is empty at several j, so the actual-parameter rows are a one-prime object rather than the asymptotic corner, and the enlarged-cutoff rows are a model of the corner's shape and not the corner. On the rows that exist, |K|/mass falls with x at a rate that is not faster than the matched random-sign control's own decay, so the runs give no evidence of arithmetic cancellation beyond square-root-of-count. K stays many orders below C_2 x at every j measured and never falls below -C_2 x. No asymptotic rate, saving or cancellation is established, and nothing here changes the OPEN status of the corner or of the sufficient twin margin.
-->

**Twin-prime infinitude remains OPEN. The sufficient margin
C_2 x + E_dagger(x) >= c_0 x/(log x)^K remains OPEN. Nothing below changes
either.** This note records a finite computation. Its calibration is
**MEASURED** throughout. A finite ratio at a finite x measures no
asymptotic rate, proves no saving and establishes no cancellation; the most
it can do is support or undercut a heuristic, and a monotone finite trend
is not an asymptotic statement.

Producer: [corner-measurement.js](corner-measurement.js), output bound by
`node research/qc/embed.js research/corner-measurement.js` and repeated in
the artifact [corner-measurement.json](corner-measurement.json). Every
figure quoted here is reproduced mechanically from that artifact; the
custody-bound copy is the script's OUTPUT block.

---

## 1. The object, exactly

Baseline: [corner-correlation.md](corner-correlation.md) §1.4, identity (5),
and [RESEARCH-HANDOFF.md](RESEARCH-HANDOFF.md) §3 for the consumer. On the
s=s'=1 sub-family of the corner S_0 the residual is, up to the classes
corner-correlation (5) discards,

\[
 K(x)=\sum_{x/2<n\le x}\mu(n)\,\mu(n-2)\,L(n)\,L'(n-2),
\]
\[
 L(n)=\!\!\sum_{\substack{r\mid n\ \text{prime},\ r>V\\ d_{\mathrm{lo}}<n/r\le D_0}}\!\!\log r,
 \qquad
 L'(m)=\!\!\sum_{\substack{r'\mid m\ \text{prime},\ r'>Z\\ e_{\mathrm{lo}}<m/r'\le E_0}}\!\!\log r',
\]

with V=floor(x^w), Z=floor(x^v), D_0=floor(x/(V+1)),
E_0=floor((x-2)/(Z+1)), d_lo=max(V,D_1), e_lo=max(Z,E_1). In *eta mode*
D_1=floor(x^(1-w-2eta_0)) and E_1=floor(x^(1-v-2eta_0)), which is exactly
the corner cut of corner-correlation §0. In *dyadic mode* D_1=E_1=0 and the
bands are capped at r<=2V, r'<=2Z, the "one dyadic band" sizing of the
wave-1 reachability analysis.

Five variants are run, all with the actual left exponent w=6/25:

| key | v | mode | eta_0 | what it is |
|---|---|---|---|---|
| `A-eta100` | 1/20 | eta | 1/100 | the actual corner cutoffs, primary |
| `B-eta40` | 1/20 | eta | 1/40 | the actual cutoffs, secondary eta_0 |
| `C-dyadic` | 1/20 | dyadic | n/a | actual cutoffs, bands (V,2V] and (Z,2Z] |
| `D-scaled` | 1/8 | eta | 1/100 | **a model of the corner shape, not the corner** |
| `E-empty` | 1/20 | eta | 1/100 | control (iv): r band forcibly emptied |

`D-scaled` exists only because of the degeneracy in §3. Its right cutoff
exponent is 1/8, not 1/20. It is not the corner and no reading of it
transfers to the corner without an argument that the shape is the same,
which is not supplied here.

Reported per (j, variant): the bands and the primes in them, the number of
n contributing (mu(n)mu(n-2) != 0 and both weights nonzero), the absolute
mass sum |mu(n)mu(n-2)| L(n) L'(n-2), K, |K|/mass, K/(C_2 x), the mean and
sample standard deviation of 16 seeded random-sign draws on the same
support, and the exact second-moment standard deviation
sqrt(sum w^2) that those draws estimate.

---

## 2. The pre-registered falsifier

Fixed in the header of [corner-measurement.js](corner-measurement.js)
before the script was executed for the first time, and not modified since.
Output at j<=31 was seen during development while sizing the run; the
falsifier text predates all of it.

> Fit the slope s = d log(|K|/mass) / d log x by least squares over the j
> whose r' band is non-empty. **If s >= 0 within the spread of the
> random-sign control, the measurement gives no heuristic support for
> cancellation in the corner correlation at these scales, and this note
> says so first.** If s < 0, the reading is "consistent with" at most,
> never "implies", and s is compared with the control's own decay: a
> random-sign sum of N terms decays like N^(-1/2) relative to its mass, so
> **a decay no faster than the control's is not evidence of arithmetic
> structure.**

Separately pre-registered: the sign of K at each j, and whether K ever
falls below -C_2 x, which is the only thing at a finite scale that would
bear on the one-sided consumer of handoff §3. Finite scales cannot settle
the asymptotic either way, and a finite K > -C_2 x is not a step towards
the margin; §2.2 of [corner-correlation.md](corner-correlation.md) records
that the one-sided statement, given the complement, *is* the theorem.

**Negative controls, all pre-registered and all computed:**

1. shift 4 in place of shift 2 must give a different signed value;
2. replacing mu(n)mu(n-2) by the constant 1 must reproduce the
   unrestricted mass sum_n L(n)L'(n-2) exactly, and that unrestricted mass
   must strictly exceed the squarefree-restricted mass somewhere;
3. the 16 seeded draws must have a mean within a few standard errors of
   zero;
4. a variant with the r band emptied must give K=0 with no contributing n.

A fifth check is not a control but an independent reimplementation: at
j in {20,22,24} the corner is enumerated exactly over (d,e,k,t) from a full
Mobius sieve, and the resulting two-point value must equal the segmented
pipeline's K to floating-point tolerance, with the sign identity
mu(d)mu(e)=mu(n)mu(n-2) of corner-correlation §1.4 verified term by term.

---

## 3. The degeneracy at reachable x, which is the leading result

This is reported before anything else because it limits everything else.

The actual right cutoff is Z=floor(x^(1/20)), so the r' band of
corner-correlation (5) is the set of primes in
(floor(x^(1/20)), floor((x-2)/(E_1+1))]. At every x this machine can reach
that interval contains **at most one prime**, and at several j it contains
none, so:

- the actual-parameter rows are not a measurement of the asymptotic
  corner. They are a measurement of a sum in which the right prime is a
  single fixed small prime and L'(n-2) is a fixed multiple of an
  indicator of one residue class;
- the s>1 and s'>1 branches of the corner are unpopulated wherever
  x^(2eta_0) < 2, which for eta_0=1/100 means every j below 50. The
  s=s'=1 sub-family and the full corner therefore coincide at most of the
  parameters reached, and the "share of the full corner mass" question
  can only be answered where x^(2eta_0)>2, i.e. in the `B-eta40` rows;
- `D-scaled` raises v to 1/8 so that the right band is populated. It is a
  model of the corner's shape and is labelled as such in every table.

The exact band contents at each j are in the bound OUTPUT block; the
degeneracy is visible there as the `rpband` column.

---

## 4. Verdict against the falsifier

**Falsifier verdict, first: the runs give no evidence of arithmetic
cancellation in the corner correlation at these scales.** |K|/mass does
fall with x in all four live variants, but in none of them does it fall
faster than the matched random-sign control, which is the condition the
falsifier pre-registered. At the typical j, |K| is of the same size as a
random-sign sum on the same support. Per the pre-registered rule, a decay
no faster than the control's is not evidence of arithmetic structure, and
that is what the runs show.

The second disconfirming point, from §3, is prior to the first: the rows
carrying the actual cutoffs have one prime in the right band, so what was
measured is not the asymptotic corner.

Nothing in either reading bears on whether the corner cancels
asymptotically. corner-correlation §2.2 prices the absolute target at
log^(2+eps) x on this sub-family; a log-power saving of that size is
invisible over the factor of at most 1.8 in log x available here, so the
measurement could not have detected the target even if it holds.

### 4.1 The slopes against the null

Fitted slopes and the matched nulls. `randSd` is the sample standard
deviation of the 16 seeded draws; `sqrt(sum w^2)` is the exact standard
deviation those draws estimate, and is the sharper null.

| variant | pts (j) | slope log(\|K\|/mass) | slope log(randSd/mass) | slope log(sqrt(sum w^2)/mass) | slope log\|K\| | slope log mass | signs of K | any K < -C_2 x | max \|K/(C_2 x)\| | median \|K\|/sqrt(sum w^2) |
|---|---|---|---|---|---|---|---|---|---|---|
| `A-eta100` | 12 (23..36) | -0.6658 | -0.5145 | -0.5003 | 0.4338 | 1.1 | `-+-+-+--+-++` | false | 0.0000889 | 0.943 |
| `B-eta40` | 17 (20..36) | -0.5412 | -0.5188 | -0.5173 | 0.6174 | 1.159 | `-+--++-+---++-+++` | false | 0.000184 | 0.635 |
| `C-dyadic` | 17 (20..36) | -0.4872 | -0.4461 | -0.4546 | 0.5083 | 0.9955 | `----+--+--++--+-+` | false | 0.000329 | 0.561 |
| `D-scaled` | 16 (20..36) | -0.4962 | -0.545 | -0.5347 | 0.6819 | 1.178 | `+-+-++--++-+----` | false | 0.000088 | 0.499 |
| `E-empty` | 0 | n/a | n/a | n/a | n/a | n/a | none | false | n/a | n/a |

Band contents at the top of the range and the count of contributing n:

| variant | j | V | Z | r band | r' band | available (r,r') pairs | contributing n | mass | K |
|---|---|---|---|---|---|---|---|---|---|
| `A-eta100` | 36 | 398 | 3 | (398,657] : 41 primes | (3,5] : 1 primes [5] | 41 | 32345791 | 333793000 | 54562.1 |
| `B-eta40` | 36 | 398 | 3 | (398,1389] : 143 primes | (3,12] : 3 primes [5,7,11] | 429 | 413855192 | 5617430000 | 125446 |
| `C-dyadic` | 36 | 398 | 3 | (398,796] : 60 primes | (3,6] : 1 primes [5] | 60 | 193085514 | 2068540000 | 85558 |
| `D-scaled` | 36 | 398 | 22 | (398,657] : 41 primes | (22,37] : 4 primes [23,29,31,37] | 164 | 31130966 | 667635000 | -38174.3 |
| `E-empty` | 36 | 398 | 3 | (398,657] : 0 primes | (3,5] : 1 primes [5] | 0 | 0 | 0 | 0 |

Exact small-j corner enumeration (independent full-sieve reimplementation):

| j | variant | quadruples | occurring (r,r') pairs | s=s'=1 share of full corner mass | non-squarefree share of the s=s'=1 prime mass | two-point value | matches segmented K |
|---|---|---|---|---|---|---|---|
| 20 | `A-eta100` | 0 | 0 | n/a | n/a | 0 | true |
| 20 | `B-eta40` | 6870 | 7 | 1 | 0.2694 | -38.4913 | true |
| 20 | `D-scaled` | 355 | 2 | 1 | 0.1531 | 6.16313 | true |
| 22 | `A-eta100` | 0 | 0 | n/a | n/a | 0 | true |
| 22 | `B-eta40` | 43689 | 11 | 0.9953 | 0.2645 | -363.154 | true |
| 22 | `D-scaled` | 5032 | 3 | 1 | 0.146 | 243.658 | true |
| 24 | `A-eta100` | 12170 | 5 | 1 | 0.2619 | 984.409 | true |
| 24 | `B-eta40` | 228703 | 28 | 0.9858 | 0.2505 | 2033.22 | true |
| 24 | `D-scaled` | 9696 | 5 | 1 | 0.09804 | -530.135 | true |

Controls: `emptyBand_K_zero`=true; `muReplacedByOne_reproducesMass`=true; `massAllStrictlyExceedsMassSomewhere`=true; `shift4_differs`=true; `shift4_rows`=28; `randMeanWithin4sd`=true; `enumIdentityHolds`=true; `enumTwoPointMatchesDirect`=true; `enumSplitExact`=true; `enumMatchesSegmentedK`=true; `enumRowsChecked`=9.

Range run: j=20..36, total wall clock 1393 s. Per-j wall clock at the top of the range: j=33: 77 s, j=34: 160 s, j=35: 346 s, j=36: 704 s.


### 4.2 Significance of the gap to the null

Ordinary least squares standard errors from the residuals of the two fits
above, computed from [corner-measurement.json](corner-measurement.json) by
se(slope) = sqrt( RSS/(n-2) / sum (log x - mean log x)^2 ). **This
calculation is scratchpad-grade: it is derived from the bound artifact but
is not itself inside the script's output custody.**

| variant | n | slope log(\|K\|/mass) | slope of the exact null | difference | difference in standard errors |
|---|---|---|---|---|---|
| `A-eta100` | 12 | -0.6658 +- 0.1104 | -0.5003 +- 0.0435 | -0.1655 +- 0.1187 | -1.39 |
| `B-eta40` | 17 | -0.5412 +- 0.0620 | -0.5173 +- 0.0073 | -0.0239 +- 0.0624 | -0.38 |
| `C-dyadic` | 17 | -0.4872 +- 0.0947 | -0.4546 +- 0.0054 | -0.0326 +- 0.0948 | -0.34 |
| `D-scaled` | 16 | -0.4962 +- 0.0819 | -0.5347 +- 0.0245 | +0.0385 +- 0.0855 | +0.45 |

No variant separates from its null. The largest deviation is 1.4 standard
errors, in `A-eta100`, the variant with the fewest points and the most
degenerate right band; and the deviations go in both directions across the
four variants, which is what noise looks like rather than a signal. The
null's own slope is close to -1/2 in every variant, which is the
count^(-1/2) behaviour a random-sign sum has when the mass grows like the
count: the measured slope of log mass against log x is between 0.9955 and
1.178.

### 4.3 Sign, and the one-sided consumer

K changes sign erratically across j in every variant, with no run of one
sign longer than four, so no sign bias is detectable. This is consistent
with corner-correlation §2.4, which found no structural source of a sign
and is not confirmed by a finite run either way.

**K is never below -C_2 x.** The largest |K|/(C_2 x) reached is about
3.3e-4, in `C-dyadic`. This is not progress towards the one-sided
consumer: corner-correlation §2.2 derives that the one-sided statement,
given the complement, is logically equivalent to a quantitative twin lower
bound, and a finite scale cannot settle an asymptotic in either direction.
It is recorded because the falsifier asked for it.

### 4.4 Controls, and the independent reimplementation

All four pre-registered negative controls fire, and the independent
full-sieve enumeration at j in {20,22,24} reproduces the segmented
pipeline's K exactly (`enumMatchesSegmentedK`), with the sign identity
mu(d)mu(e)=mu(n)mu(n-2) of corner-correlation §1.4 verified term by term
on every quadruple of the s=s'=1 prime class. That is a genuine
cross-check: two different algorithms over different index sets agree.

The non-squarefree class of corner-correlation §1.4 carries between 9.8 and
27 percent of the s=s'=1 prime-class absolute mass at these small
parameters. That is smaller than the majority share
corner-correlation-validation.js reports at its own parameters, and the
difference is a parameter effect, not a contradiction: the two runs use
different cutoff exponents and different corner cuts. The s=s'=1 share of
the full corner mass is 1.000 wherever x^(2eta_0) < 2, because a cofactor
k<=2V with a prime power above V dividing it is forced to equal that prime
power. Only `B-eta40` at j=22 and j=24 clears that threshold, and there
the share is 0.995 and 0.986. So the s>1 branch is essentially unmeasured.


---

## 5. Limitations

- **The actual corner is not measured.** §3. The rows carrying the actual
  cutoffs carry a one-prime right band; the rows with a populated right
  band carry a different cutoff exponent. No argument is given here that
  the two have the same shape, and none should be assumed.
- **The reachable range is short.** The largest j is recorded in the bound
  block. A least-squares slope over that range has no error bar that
  distinguishes a power law from a slowly varying prefactor, and log x
  varies by less than a factor of two across the fit.
- **The mass is a term-wise absolute mass**, matching
  corner-correlation §1.5, so |K|/mass is a saving against the triangle
  inequality on the same object the note prices. It is not the ratio the
  consumer needs. corner-correlation §2.2 prices that at log^(2+eps) x on
  this sub-family and log^(4+eps) x on the full corner; a finite ratio
  says nothing about either.
- **The random-sign control is the right null and a weak one.** Sixteen
  draws estimate a standard deviation to about 18 percent. The exact
  second moment sqrt(sum w^2) is computed alongside and is the sharper
  comparator; the draws are reported because they were asked for and
  because they check the accumulator.
- **Independence of the 16 draws** comes from 16 bits of one 32-bit mixer
  applied to n. That is adequate for a null but is not a certified
  independent stream.
- **Cutoffs use floating-point powers of 2.** V, Z, D_1, E_1 are
  `Math.floor(Math.pow(2, j*alpha))`. At an alpha where 2^(j*alpha) lands
  within 1e-8 of an integer the floor could move by one. No j in the run
  is near such a point, but the code does not check it.
- **Nothing here is an input to any estimate.** No step of any argument in
  the corpus may cite a number from this note.

---

## 6. What would change the reading

- A run reaching x with at least a few primes in the *actual* band
  (Z, Z x^(2eta_0)] would make the actual-parameter rows a measurement of
  the corner rather than of a one-prime shadow. For eta_0=1/100 and
  v=1/20 the band is (x^(1/20), x^(7/100)], whose prime count by the prime
  number theorem is about x^(7/100)/(0.07 log x) - x^(1/20)/(0.05 log x):
  roughly 4 primes at x=2^70 and roughly 17 at x=2^100. Neither is
  reachable by a sieve over (x/2,x], now or ever. The degeneracy is
  structural, not a compute budget problem, and it is the reason the
  actual corner cannot be measured directly at all.
- A |K|/mass decay measurably faster than the matched control's, sustained
  over more than a factor of two in log x, would be the first finite
  evidence of arithmetic cancellation in this object. It would still be a
  measurement.
- A single j with K < -C_2 x would matter for the one-sided reading at
  that scale, and would need re-deriving before being believed.
- If the enumeration cross-check ever fails, the segmented pipeline is
  wrong and every number here is void.

---

## 7. Prior art for the numerics

The search was run in the owning convention for this object recorded in
[SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md), row "the residual with two
signed factors and fixed product difference": two-point Mobius
correlations, the Chowla conjecture and its averaged and logarithmic
forms, and the determinant equation, with the numerics words
`Chowla`+`computation`, `Liouville correlations`+numerics and the OEIS
twin-count family. In that convention, and per the wave-1 literature scout
§E, **no published dataset of weighted Mobius correlations along two
linear forms with distinct dilations was located**. A clean negative
outside the owning convention would mean nothing; this one is inside it,
and it still only says that nothing reusable was found, not that nothing
exists. The nearest located item is Luo and Ye,
[arXiv:2401.18082](https://arxiv.org/abs/2401.18082), a numerical study of
lambda(n)lambda(n+h) and of mu on squarefree n for n <= 10^8 and
h <= 1000: unweighted, shift only, leading coefficients 1. It is not this
object and supplies no comparison. So the run here is new, and being new
is not evidence that it is informative.
