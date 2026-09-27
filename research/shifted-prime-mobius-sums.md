# Mobius and Liouville at shifted primes: a finite table to 2^38

<!-- ledger
id: Q-shifted-prime-mobius-sums
status: ANSWERED
todo: C
parity: Measurement only. Exact sieve counts of mu(p+-2), lambda(p+-2), mu^2(p+2) over primes p<=2^38 and of the dyadic total sum Lambda(n-2)mu(n), against seeded random-sign controls. No arithmetic estimate, no non-residue input and no asymptotic claim; the o(pi(x)) conjecture for Mobius on shifted primes remains OPEN.
question: At reachable x, do the shifted-prime Mobius and Liouville sums, the cleanest instance of the parity input the twin reduction lacks, show any size or sign structure that a random-sign model does not, and how loose is the trivial bound on M(x) used for the centered tolerance?
verdict: MEASURED to x=2^38 (10.9e9 primes). All four sums sit at random-sign size: |U|/control rms at most 2.8 at any j, slopes 0.28 to 0.65 against the control's 0.43 to 0.47 with per-draw spread 0.19 to 0.30; the pre-registered structure falsifier did not fire. M(x)/x is at most 8.8e-5 in magnitude for j>=29 against the trivial bound 0.374, so the -4x/25 tolerance in moving-cutoff-parity is loose by four orders at these scales; a proof still needs a bound on M, which is the same parity object. The squarefree density of p+2 among primes is 0.747911 at 2^38 against 2*Artin = 0.7479116. pi(2^j) matches OEIS A007053 at every j. Nothing here bears on the asymptotic conjecture.
-->

**Nothing here is a theorem or evidence for one.** The conjecture
sum_{p<=X} mu(p+h) = o(pi(X)) for fixed h (Hildebrand 1989, stated in
[Lichtman, arXiv:2009.08969](https://arxiv.org/abs/2009.08969)) is OPEN,
and its Liouville form at h=-2 is the statement README Status names as the
missing Type II input. A finite table cannot support it. What a finite table
can do is show whether the sums carry a visible bias at reachable scales,
and measure how loose a trivial bound is where a derivation uses it.

## 1. Prior data, searched first

No published or tabulated values of any of these sums exist above x=10^4,
in the owning convention (Mobius on shifted primes, Chowla two-point,
Elliott--Halberstam twisted by Mobius), OEIS included; the search record
is [history/reviews-0907/01](history/reviews-0907/01-shifted-prime-data-search.md)
and the convention row is in [SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md).
Carella (arXiv:2206.12956, math.GM) calls sum_{p<=x} mu(p+a) "currently
viewed as an intractable problem" and computes nothing beyond 10^4. The
table here is new data, and being new is not evidence that it is informative.

## 2. The objects and the pre-registration

[shifted-prime-mobius-sums.js](shifted-prime-mobius-sums.js) computes, for
x=2^j, j<=38, cumulatively over primes 5<=p<=x,

U_mu+(x)=sum mu(p+2), U_mu-(x)=sum mu(p-2), U_lam+(x)=sum lambda(p+2),
U_lam-(x)=sum lambda(p-2), Sq(x)=sum mu^2(p+2), pi(x),

and on each dyadic block the total Mdy(j)=sum_{2^(j-1)<n<=2^j} Lambda(n-2)mu(n),
which is M(x) of [moving-cutoff-parity.md](moving-cutoff-parity.md) (3),
computed independently of [centered-discrepancy-measurement.js](centered-discrepancy-measurement.js).

Fixed in the script header before the first full run: F1 (structure: |U|
above 4 times the random-sign control rms at three consecutive j>=30), F2
(Sq/pi approaches A2=prod_{p>2}(1-1/(p(p-1)))), F3 (Mdy agrees with the
other script's M), F4 (slope of log|U| against log x over j>=28 against the
control's). Controls: pi(2^j) printed for comparison with OEIS A007053; a
plain in-memory sieve reproducing every column at j<=26; 8 seeded random-sign
draws per column with the same support; shifts +2 and -2 must differ.

One defect in the pre-registration itself, on record: the constant A2 in
the first run's header was typed as 0.7364. The run returned Sq/pi=0.747911
stable to five digits from j=28 on, which is 2*Artin's constant, 0.7479116;
the certified interval 33/200<C2(1-A2)<21/125 of moving-cutoff-parity (15)
already excluded 0.7364. The constant was corrected and the script
re-embedded with `--force`, stamped into its fingerprint. No reading was
written before the correction. The data caught the constant, not the other
way round.

## 3. Readings

Every figure is from the OUTPUT block of the script. j indexes x=2^j.

1. **F1 does not fire.** The largest |U|/control-rms over all j>=10 is
   2.822 (U_mu+ at j=35) and 2.335 (U_lam+ at j=35); at j=38 the four ratios
   are 1.282, 0.692, 1.983, 0.286. No column exceeds 4 at any j.
2. **F4: slopes at random-sign size.** Over j>=28, d log|U|/d log x is
   0.650 (mu+), 0.505 (mu-), 0.614 (lam+), 0.276 (lam-) against control rms
   slopes 0.465, 0.432, 0.453, 0.453 and per-draw spreads 0.187, 0.296,
   0.274, 0.274. Every real slope is within about one per-draw standard
   deviation of 1/2. These summaries do not supply a significance test.
3. **Sign persistence, the one thing a reader would notice.** U_mu+ and
   U_lam+ are negative at every j from 21 to 38, and U_mu+/pi at j=38 is
   -9.7e-6. The longest same-sign run over the 19 checkpoints j=20..38 is
   19 for both +2 columns. The eight random-sign draws over the same
   checkpoints reach 13 (mu+), 19 (mu-), 18 (lam+) and 18 (lam-): one draw
   of the mu- control holds one sign across the whole window, while no draw
   in the mu+ column exceeds 13 and none in the lambda+ column exceeds 18, so
   the real +2 runs are matched only across the pooled 32 draws. A cumulative
   random-sign control has strongly dependent dyadic cumulative checkpoints;
   eight draws per column do not establish how unusual a full-window run is.
   The -2 shift's real runs are 7 and 4. No significance calculation or
   mechanism is supplied.
4. **The tolerance in moving-cutoff-parity is loose by four orders.** The
   trivial bound there is M<=A2 x/2, i.e. M/x<=0.374, and it is attained
   by the unsigned column: sum Lambda(n-2)mu^2(n)/x is 0.373955 at j=38.
   The signed M/x is -3.28e-6 at j=38 and at most 8.8e-5 in magnitude for
   every j>=29; Mdy/sqrt(x) lies between -5.3 and 2.2 over j>=25. The
   sufficient input D_y>=-4x/25 therefore has, at these scales, an
   effective allowance near C2 x. This changes no proof: a bound on M is a
   bound on sum Lambda(n-2)mu(n), the same parity-type object as D_y itself
   (the note's (17) makes the dependence explicit), and the trivial bound
   is what a derivation can currently use.
5. **F2, after the correction:** Sq/pi=0.747911 at j=38, against
   A2=0.7479116, diff -4.45e-7. The heuristic density of squarefree values
   among p+2 (no factor at 2 since p+2 is odd) is confirmed to that
   precision at this scale. This is a sieve control, not a result.
6. **Controls.** plainSieveMatches(j<=26)=true; ctrlMeanWithin4se=true;
   shiftsDiffer=true; pi(2^j)+2 equals A007053 at every j from 20 to 38
   (10866266170+2=10866266172 at j=38). F3 holds: Mdy at j=24 is
   -18508.6301 here and the other script's M column at j=24 is
   -18508.63 in its own block.
7. **Not measured, and not measurable this way:** any asymptotic rate; the
   conjecture; whether the +2 persistence is arithmetic. A larger table
   would sharpen nothing a proof can use.

## 4. Cost and custody

3445.8 s at 6 workers on the first run (identical figures; the block
carried the wrong A2 constant and the F2 diff), then 2694.2 s for the
forced re-embed with the corrected constant and the persistence readout;
the fingerprint records the override and the two figures it replaced. Retained artifact:
[shifted-prime-mobius-sums.json](shifted-prime-mobius-sums.json). The
naive sieve at j<=26 is the independent reimplementation; the second
script's M column is the cross-check between codebases.
