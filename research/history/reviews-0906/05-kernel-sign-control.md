# 05 — kernel sign control

**Question.** At the box delta=8/25, nu=9/20 (M ~ x^(14/25), N ~ x^(1/2), A ~ x^(3/50)
top harmonic band and A=1 as a second band), does the moment
Mfrak = sum_{m in I} | sum_{u~N} b_u sum_{h in H} c_h 1_{(m,u)=1} e_u(sigma theta h mbar)
Phi_{u,h}(m) |^2 with the ACTUAL aggregated Mobius/von Mangoldt coefficient
b_u = A_right(g u) (per grouped-divisor-moment.md (13), including the log-weighted A_1
sector) come out smaller than the same moment with (control 1) |b_u| and (control 2)
|b_u| times an independent seeded random sign, and does the actual/control ratio decrease
as x grows through the feasible dyadic range? Also: X_small of (21) by ordered-pair
expansion for the same three coefficient choices, its share of Mfrak, and the shares of
the equal-frequency class (R=0), complete periods, and j > x^(1/20).

**Calibration: MEASURED.** This can refute a hope or lend heuristic weight to one. It
cannot show a power saving, cannot establish (21), and does not move the proof. Equation
(21) and the sufficient global twin margin remain OPEN and untouched.

## Falsifier verdict FIRST: negative in all four families

Pre-registered (written into research/kernel-sign-control.md §0 before the run): slope of
log2(|X_small(actual)| / |X_small(random draw k)|) against log2 x, per draw k=1..8, fitted
over the dyadic points sharing one J0 = floor(x^(1/20)); if mean slope + sd >= 0, no
heuristic support. Measured, over j = 20,22,24,26,28,30 (n = 6 scales, J0 = 2):

| family | slope mean +- sd | verdict |
|---|---|---|
| top box, g=2, A~x^(3/50) | -0.0570 +- 0.1741 | mean+sd >= 0 → no support |
| top box, g=2, A=1        | +0.2088 +- 0.2072 | mean+sd >= 0 → no support |
| top box, g=1, A~x^(3/50) | -0.1443 +- 0.2237 | mean+sd >= 0 → no support |
| low box, g=1, A~x^(3/50) | -0.0813 +- 0.3024 | mean+sd >= 0 → no support |

**The measurement gives no heuristic support for Mobius-sign cancellation in the small-j
kernel along this route.** It does not refute such cancellation; it fails to detect any,
in a regime (see limitations) where it would be hard to see.

Descriptive aggregate, computed AFTER the pre-registered fit (not the pre-registered
test), over n = 27 configurations with a nonempty small-j class: |X_small(actual)| has
mean rank 5.15 among itself and its 8 draws (null 5.00, null sd of that mean 0.50); 12 of
27 put the actual below its draw median (null 13.5). Both distribution-free statistics sit
at the null — the actual Mobius signs behave like one more independent sign draw here.
Geometric mean |X_small(actual)|/mean|X_small(random)| = 0.604, which is NOT evidence: one
value over an average of eight is below one under the null too (Jensen). Geometric mean
|X_small(actual)|/|X_small(|b|)| = 0.316 — against the all-positive control the signed
kernel is smaller by roughly a factor of three. Signs help against no signs; Mobius signs
do not help against random signs.

Moment level: Mfrak(actual)/mean Mfrak(random) = 1.027, 1.038, 1.020, 1.021, 1.019, 1.014
across j=20..30 (top box, g=2), slope -0.0024 +- 0.0035; 3 of 27 configurations below one.
No advantage at moment level, as expected once the class shares are seen.

## Table (all numbers from the embedded, code-bound output block)

Sizes actually used: j = 18,20,22,24,26,28,30; M = floor(x^(14/25)) from 1082 to 114104;
N from 274 to 23170; A = round(x^(3/50)) = 2 or 3, plus A = 1; nonzero-coefficient u from
166 to 7045; atoms (u,h) from 166 to 21135. 4 configurations per scale (top box g=2 at
A=Atop and A=1, top box g=1 at A=Atop, low box g=1 at A=Atop), 8 seeded draws each.
Run 1031.7 s wall clock; total campaign compute used here about 55 min including two
earlier bindings.

Class shares of Mfrak (actual coefficient A1), across all 28 rows:
- equal-frequency class R=0: 96.08% to 102.58% (shares can exceed 100% because the other
  classes are net negative)
- complete periods: exactly 0, PROVED empty by theta*max(h)*2N < (N+1)^2 in every
  production configuration, not assumed away
- j > J0: -0.54% to +3.92%
- X_small (j <= J0, R != 0): 0.02% to 2.88% of Mfrak, and empty at j=18 on the g=1 top box
  because that box's coefficient support is entirely even while J0 = 1 there

Growth: d log2 Mfrak / d log2 x = 0.982, 1.001, 0.979, 0.990 against budget slopes 1.388,
1.325, 1.426, 1.495 and the generic N^3 exponent 1.500. At j=30 the top box g=2 measures
Mfrak = 2.6265e+6 against budget 2.5676e+12. d log2 |X_small| / d log2 x = 0.684, 0.929,
0.455, 0.585, all under 36/25 = 1.440, but in a regime where the moment grows like x^1 and
not x^1.5 — that is not an estimate of the asymptotic exponent.

Negative controls, all fired (each is an assert; an inert control aborts the run):
- (i) periods: detector N=6, A=8, M=20 has 62 period pairs of 2304; dropping them moves
  the nonzero j<=J0 kernel from -1.4484e-2 by -8.7191e-3
- (ii) conjugation: at j=18, g=2, A=2 the conjugated X_small = 1.2476e+1 is real; the
  unconjugated ordered-pair sum is 1.0960e+0 + 9.8785e+0i
- (iii) shifted endpoints: 6552/6552 shifted-endpoint kernels equal the native reciprocity
  kernel; 6547 unshifted ones differ
- (iv) all-ones: R=0 share 108.30% (j=18) and 105.53% (j=20) against 97.66% / 100.72% for
  the actual coefficient; 638 and 1194 equal-frequency ordered pairs against the (5) count
  bounds 1.046e+4 and 1.955e+4; class mass under its majorant 1.3215e+4 / 5.3760e+4

Identity check: the divisor-sieve class decomposition agrees with literal ordered-pair
enumeration on all five quantities (moment, pair expansion, its reality, R=0 class,
j<=J0 class, j>J0 class) in four small configurations.

Endpoint sensitivity: at j=22, g=2, A=2, z=x gives Mfrak = 1.1513e+4, X_small = -8.7460e+1;
z=3x/4 gives Mfrak = 3.5937e+3, X_small = -5.1390e+1.

Precision: divisor-sieve cancellation runs 137.1x to 26201.6x; worst-case double-rounding
floor relative to |X_small| is 2.48e-7.

## Limitations

1. The reachable regime is not the regime (21) is about. The finite moment is essentially
   all equal-frequency class; X_small carries 0.02-2.88%. The Weil term N^3 that sets the
   3/2 budget is nowhere near dominant at these sizes.
2. J0 = floor(x^(1/20)) is 1 at j=18 and 2 at j=20..30. "Small common divisor" is literally
   "gcd 1 or 2" here, not a band.
3. Z = max(2,floor(x^(1/20))) = 2 throughout, so the prime-power sector of (13) has one
   prime power. The top-box coefficient collapses to -mu(ell/2)*log 2 (A_0 vanishes there
   identically) and the low-box coefficient to -mu(ell)*log ell. Repeated primes and
   multiple r values are not exercised; floor(x^(1/20)) >= 3 needs x >= 2^60.
4. One box only; native orientation and sigma=-1 only; s=0 so no divisor twist; two
   harmonic bands, not the full logarithmic stack; T = 4*round(x^(3/50)) rather than the
   derivation's ceil(x^(2tau) max(1,MN/x)). c_h IS the Vaaler coefficient, not a flat 1/A.
5. Eight draws; per-row spread is comparable to the value itself, so the aggregate rank is
   the strongest available reading and it is at the null.
6. Finite scaling never proves an asymptotic power saving and never disproves one.

## What would change the reading

A derivation, not a bigger run. A configuration where the nonzero off-diagonal dominates
the finite moment (needs A comparable to N, which the actual box does not give at reachable
x; a synthetic A~N box would measure a different object). More draws (64) rather than more
scales. A defect in the sieve identity or an emptiness certificate would invalidate every
class share above; both are checked here.

## Files and integrator actions

Created: research/kernel-sign-control.js, research/kernel-sign-control.md,
research/kernel-sign-control.json. Nothing else touched; no git state changed.

- The embedded tail carries a `forced` stamp dated 2026-09-06. Reason, recorded in the
  note §5: the first binding (same session, never committed) predated TABLE 4; adding that
  descriptive aggregate changed the output and the guard correctly refused. The tool's own
  comparison reports "0 of 546 figures in the replaced block not reproduced".
- TODO.md item C already lists Q-kernel-sign-control (another agent regenerated it).
- research/QUESTIONS.md already carries the row, but from an EARLIER verdict string: it
  says "J0=floor(x^(1/20)) is 2 throughout", now corrected in the ledger to "1 at j=18 and
  2 at j=20..30". Regenerate QUESTIONS.md.
- research/README.md (the router) has no row for this note; add one.
- research/SCRIPTS.md is generated and does not yet list kernel-sign-control.js;
  regenerate with node research/gen-scripts-index.js.
- research/OUTCOMES.md needs an entry under "Signed divisor grouping and endpoint
  discrepancies" or "Finite algebra and numerical validation": grade MEASURED, question
  Q-kernel-sign-control, result "no detectable Mobius-sign advantage over random signs in
  the j<=J0 kernel at this box over j=18..30; mean rank 5.15 of 9 against the null 5.00",
  limit "the finite moment is diagonal-dominated and X_small carries under 3% of it, so a
  null here is a failure to detect, not evidence that (21) needs no sign cancellation",
  reuse "the divisor-sieve class decomposition and the two emptiness certificates".
- Gates run: node research/qc.js clean for this note and script (refs, quotes, crosslinks,
  scripts, embeds, ledger, parity, calibration, widths). The only findings in the tree are
  another agent's in-flight files (research/determinant-corollary.md,
  research/mobius-bv-validation.js). node research/qc/selftest.js passes 58 positives and
  47 controls. node research/audit-numbers.js passes 251/251 in 164.9s.
