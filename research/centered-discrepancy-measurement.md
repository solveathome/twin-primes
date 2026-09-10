# The centered discrepancy D_y at finite x: what a census can and cannot see

<!-- ledger
id: Q-centered-discrepancy-measurement
status: ANSWERED
todo: C
parity: Measurement only. Exact evaluation of D_y(x), M(x), the identity pieces of moving-cutoff-parity (12) and the absolute sum of (13) at x=2^j, j<=38, against four seeded random-sign controls, a shift-4 control and a naive reimplementation. No arithmetic estimate, no non-residue input, no asymptotic claim; the sufficient input (16) remains OPEN.
question: At reachable x, is the OPEN sufficient input D_y>=-4x/25 numerically violated, is the absolute form (13) numerically plausible, and does D_y carry structure beyond a random-sign model?
verdict: MEASURED to x=2^38. Neither pre-registered falsifier fires. D_y/x stays within 0.0043 of zero for the measured j>=26. Over 30<=j<=38, D_y/x differs from -(T1/x-C2) by at most 2e-4, with maximum 1.84401e-4 at j=30; the classical term dominates this finite comparison. The data do not establish an asymptotic fluctuation scale, an impossibility of informative future measurements, or the sufficient signed estimate. No proof status changes.
-->

**No estimate for D_y is obtained and the sufficient input (16) of
[moving-cutoff-parity.md](moving-cutoff-parity.md) remains OPEN.** This note
records a finite computation with two pre-registered falsifiers, what it
refuted (nothing), and the one thing it did establish: that at reachable x
the object is dominated by the finite-size error of its classical companion
term, so a larger census could not see the parity object either.

## 1. Prior data and the decision this run informed

No published or tabulated values of D_y, of Lambda(n-2)mu(n) in progressions,
or of the neighbouring shifted-prime and two-point Chowla sums exist above
x=10^4 in the owning convention; the search record is
[history/reviews-0907/01](history/reviews-0907/01-shifted-prime-data-search.md)
and the convention row is in [SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md).

The decision: whether lane A of [RESEARCH-EXECUTION.md](RESEARCH-EXECUTION.md)
should aim at an absolute, Bombieri--Vinogradov-type theorem for the sequence
f(n)=Lambda(n-2)mu(n), which would supply (16) through (13), or must exploit
sign cancellation across the moduli; and, cheaper, whether (16) is numerically
false at accessible scales, which would end the centered route.

## 2. The objects, exactly as computed

[centered-discrepancy-measurement.js](centered-discrepancy-measurement.js)
takes x=2^j, J=(x/2,x], y=ceil(x^(12/25)), Q=floor(x/y), standard Lambda with
prime powers, f(n)=Lambda(n-2)mu(n), M=sum_J f, and evaluates
D_y(x) of (9) as the finite atomic Stieltjes sum

D_y = sum_{e<=Q odd sqfree} mu(e) [ sum_{n>ey, e|n} f(n) log(e/n)
      - (1/phi(e)) sum_{n>max(x/2,ey)} f(n) log(e/n) ],

with the endpoint a_e excluded; the first bracket summed over all e is acc1,
the second is the density term P. It also evaluates T1, T2, E_pp, E_even of
(4)--(5) and (10) from the same factor lists, S(x)=sum_J Lambda(n)Lambda(n-2),
and the absolute sum W1=sum_e log(x/e) max_t |Delta_e(t)| of (13) with the
max over a 64-point grid in t (a lower bound for W1; at j in {16,18,20} the
exact max gives grid/exact 0.9747, 0.9718, 0.9661).

Pre-registered before the first full run: F1, D_y/x < -4/25 at any j>=26
refutes (16) at that scale; F2, W1grid/x > 2/25 at every j>=26 and
non-decreasing makes the absolute form implausible; F3, the residual r(x) of
(12) must fall with j; F4, comparison with four random-sign draws (mu(n)
replaced by +-1 on the same support, mu(e) kept). Controls: S=T1+T2+E_pp and
T2=acc1+E_even exactly; a naive per-modulus implementation directly from (9)
at j in {16,18,20}; draws' mean within 4 se of zero; shift 4 differs from
shift 2. An adversarial code review before the bound run
([history/reviews-0907/02](history/reviews-0907/02-centered-discrepancy-script-review.md))
found the E_even column double-subtracting P and a vacuous F2 on short runs;
both fixed, no headline number affected. The constant A2 in the thresholds
line was corrected from a wrong value before the bound run, for the reason
recorded in [shifted-prime-mobius-sums.md](shifted-prime-mobius-sums.md) §2.

## 3. Readings

Every figure is from the OUTPUT block. j indexes x=2^j; 3948794345 support
integers at j=38; 8223.5 s total on 8 workers.

1. **F1 does not fire.** For j>=26 the extreme values of D_y/x are -0.004283
   (j=27), -0.004180 (j=33) and +0.002449 (j=31); at j=38 it is 0.001476. The
   threshold is -0.16. The centered route is not refuted at these scales.
   This is "not refuted", never "supported": (16) is an asymptotic statement.
2. **F2 does not fire, and the absolute form is noise-sized.** W1grid/x falls
   monotonically from 0.322294 (j=26) to 0.077347 (j=38), crossing 2/25 at
   the last row; the grid undercount is about 3 percent, so the true W1/x at
   j=38 is at the threshold. Real W1 is within 8 percent of the control at
   every j>=26 (0.077347 against 0.080797 at j=38) and the slopes of log W1
   against log x over j>=26 are 0.827 real against 0.825 control. The
   absolute sum is the size a random-sign model gives, roughly
   x^(1/2) Q^(1/2) times logarithms, and shrinks relative to x for that
   reason alone. Consistent with the absolute form being true; no bearing on
   proving it.
3. **Real D_y is far above the control, and the identity says why.** The
   ratio |D_y|/(control rms) is 6.014, 12.849, 8.252, 7.703, 7.374, 8.580,
   21.816 at j=32..38, and the slope of log|D_y| over j>=26 is 0.863 against
   the control's 0.544. Read alone this would look like arithmetic
   structure. The raw comparison is dominated by a classical term on these
   measured scales. The exact identities
   S=T1+T2+E_pp and T2=acc1+E_even, with D_y=acc1-P, give

   D_y/x = (S/x - C2) - (T1/x - C2) - P/x - E_pp/x - E_even/x,

   and the columns show every term but one is negligible: S/x-C2 is at most
   1.8e-4 in magnitude for j>=30 (1.80e-4 at j=32, 9e-6 at j=38), P/x is below 9e-5 (it is
   (P+2C2M)/x, below 5e-7, minus 2C2M/x with M/x below 7e-5), E_pp/x is
   below 3e-5, E_even/x below 2e-9. So D_y/x
   equals -(T1/x - C2) to within 2e-4 at every j>=30 (the largest deviation
   is 1.84e-4 at j=30; it is below 1e-4 at j=32, 33, 34, 36, 37, 38): at j=38,
   0.001476 against -(-0.001473); at j=33, -0.004180 against -(0.004208);
   at j=35, 0.001132 against -(-0.001286). T1 is the classical term of (6),
   Bombieri--Vinogradov plus the Mobius mean, whose error is O_A(x/log^A x)
   for every fixed A; its measured size is comparable to x/log^2 x with
   oscillating sign on this range (1/log^2(2^38)=1.4e-3). The control has no such term: its D_y is a
   genuine random-sign sum of size about 1e-4 x at j=38. The real D_y's
   excess over the control is therefore the slow convergence of a proved
   classical asymptotic, and the parity object's own fluctuation, which is
   what a census was meant to look at, is not isolated by this raw comparison.
   This is a finite diagnostic, not a theorem about every reachable scale.
4. **F3.** |r(x)| falls from 0.017153 (j=20) through 0.010170 (j=24),
   0.003895 (j=29) to 0.001471 (j=38) with oscillating sign; it is the
   T1 error by item 3. The derivation is not flagged. The rate is not
   resolved (a power of 1/log x between 2 and 3 fits the range; not fitted).
5. **The centering removes almost nothing at finite x.** P/x is at most
   1.5e-4 in magnitude for j>=26 and D_y/x agrees with acc1/x to 4e-6 at
   j=38, because M is at random-sign size (real M/x against control rms:
   -3.28e-6 against 6.44e-6 at j=38). The trivial bound M<=A2 x/2 that sets
   the -4/25 tolerance is loose by four orders here, as
   [shifted-prime-mobius-sums.md](shifted-prime-mobius-sums.md) records; a
   derivation still cannot use that.
6. **Controls.** exactAlgebra=true (both identities hold to at most 1.3e-5
   absolute at j=38 on sums of size 1e11); naiveMatches=true (relative
   differences 9e-15, 7.5e-15, 6.1e-15 at j=16,18,20); ctrlMeanWithin4se=true;
   shift4Differs=true at j=20,24,28. M at j=24 is -18508.63 here and
   -18508.6301 in the other script's block.
7. **Not measured, and not measurable this way:** any estimate for D_y; the
   rate of (12)'s error; anything about the parity object beneath the T1
   error. By item 3, no census of D_y at reachable x can separate the
   parity object from the classical convergence, so a larger run has no
   decision attached and should not be made.

## 4. What this changes

Nothing in the proof status. For lane A: an absolute BV-type theorem for
f(n) is consistent with the data and would suffice through (13); the
difficulty is entirely in proving it for this sequence, not in whether it
holds. For finite testing: the centered representation is not a better
window on the parity object than the residual it re-expresses; at every
reachable scale it shows the classical term's error. This is a bounded
negative about the method of measurement, recorded so it is not repeated.

## 5. Cost and custody

8223.5 s wall on 8 workers (j=38 single-threaded for the last two hours),
about 2.3 GB per worker at j=38. Two earlier launches were killed within 20
minutes for the review fixes and the constant. Retained artifact:
[centered-discrepancy-measurement.json](centered-discrepancy-measurement.json).
The naive per-modulus implementation is the independent check of (9); the
shifted-prime script's M column is the cross-codebase check.
