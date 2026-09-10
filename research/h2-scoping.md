# Pricing the extension of A288815, and the answer is no

<!-- ledger
id: Q-h2-extension
status: CLOSED
todo: none
question: Is extending A288815 (h2) past its 21 terms the high-value computation it was taken for?
verdict: No, on both halves, and it is recorded in OUTCOMES.md as WITHDRAWN: term 22 is a roughly four-year single-thread computation for the specialists' own tuned code, all three cheaper proxies fail downward and growing (the direction that fakes a smaller exponent), and the control measured one extra term moving a ten-term exponent fit by 0.022.
-->

*(2026-08-17. Scoping task, not a computation. Scripts: `research/h2-prototype.js`,
`research/h2-lower-ladder.js`, `research/h2-randomised.js`,
`research/h2-length-needed.js`. Every number below is pasted output from those
files or a digitisation of Ziller and Morack's own timing figure, and the
digitisation method is stated so it can be checked.)*

## What is hard here, first

Two things are hard, and they are independent, which is why the verdict is
firm.

**The computation is hard.** A288815 has stood at 21 terms since June 2017.
Ziller and Morack's own timing figure, digitised below, says their best
algorithm spent about **245 days of single-threaded CPU on term 21 alone**, and
their per-term cost ratio at the top of the ladder is about **6.7**. Term 22 is
therefore a four-year single-thread computation for the people who wrote the
purpose-built code.

**And the question is harder than the computation.** Measured on the one-class
control where the answer is known, the model that contains the truth loses to
the pure power law by a margin that **grows monotonically with the number of
terms**, from 0.6 AIC units at 15 terms to 47.0 at 56. More two-class terms do
not make the exponent readable. They make the wrong answer look better.

Extending h2 past 21 terms therefore fails on both legs at once: it is not
affordable, and it would not settle the exponent if it were. That is the main
result of this task, and it reversed a standing recommendation.
`research/exponent-control.md` §8 now carries the same verdict and cites the
pricing below.

## 1. The method, from the source and not the abstract

The algorithms are not in arXiv:1706.03668, which is a three-page announcement.
They are in its ancillary file `full_details.pdf`, 32 pages, "On the
computation of the generalised Jacobsthal function for paired progressions".
That is the file to read. arXiv:1611.03310 is the one-class parent and shares
the structure.

**The object, stripped.** Their corollary 1.3 removes 2 and 3 from the problem:

> h2(n) = 6·ω2(n) + 6

where ω2(n) (their definition 1.10, condensed paired Jacobsthal) is, by their
proposition 1.5 (2), a pure covering problem with no primes 2 or 3 and no
integers at all:

> ω2(n) = the largest m such that one can choose **two non-zero residue classes
> a_i, b_i mod p_i for each prime p_i in {5, 7, ..., p_n}** with every
> q in {1, ..., m} congruent to a_i or b_i for at least one i.

That is the whole computation. It is the two-class covering system this repo
already thinks in, with the adversary free on both classes. A288815 is
6·ω2 + 6 and A072753 is ω2 itself.

**The naive cost.** Their equation for the Basic Sequential Algorithm counts
the residue-class combinations exactly:

> N_BSA2 = prod over i of (p_i − 1)(p_i − 2)/2

For p_n = 73 that is about 10^49. The permutation form (their proposition
1.5 (3): fill the leftmost uncovered position, choose which prime covers it) is
bounded by (2n−4)!/2^(n−2) times the same and is worse. Everything in the paper
is pruning.

**The two pruning ideas, and they are different.**

1. *Discarding (their §2.2, DSA2).* For a tentative length m, a partial choice
   can be discarded when the primes not yet used cannot cover what is left.
   The bound is not the naive sum of 2·ceil(m/p): that is worthless, because
   for p up to 73 and m = 436 the naive capacity is 826 against a need of 436,
   nearly a factor of two of slack. Their lemma 2.2 subtracts the coverage the
   *smaller* primes must already have inflicted on the multiples of p_k, via a
   precomputed table psi2min(m, k) they ship as an ancillary file for m <= 1000
   and k <= 8. That is what makes the bound bite.
2. *Exact counting (their §2.3, criterion 2.2, the engine of GPA2).* Instead of
   a table-driven bound, count for each remaining prime the best residue class
   **against the current uncovered set**. It costs more per node and rejects
   far earlier. Choosing the maximiser as the next move makes the search a
   permutation algorithm for free, with contributions monotonically decreasing
   along every branch, which is a valid canonical form.

Their production runs used CRPDSA2 (sequential on the small primes, permutation
plus discarding above p_n/2, switch point found empirically at p_n/2), GPA2,
and a portioned ILP (PILP2) handing the tail to SYMPHONY.

**The bottleneck is not arithmetic.** It is that the covering problem has
enormous slack in every relaxation and the extremal configurations are
isolated. Their own table 1 counts the number of maximum-length sequences at
each n: **1, 6, 1, 1, 4, 2, 2, 14, 8, 4, 1, 8, 2, 16, 2, 2, 2, 2, 2**. At
n = 13 there is exactly one, out of a search space of order 10^30. Nothing
short of exhaustive search finds it, and §5 below shows experimentally that
nothing short of exhaustive search comes close.

## 2. Reproduction, which is also the cost curve

`research/h2-prototype.js` implements the position-driven RPA2 recursion with
the exact-count bound of their criterion 2.2, plus their RPA2 symmetry rule
(skip a prime when an equivalent permutation places a smaller prime earlier).
It is a single-threaded Node program. Every accepted length is checked by an
independent witness verifier: two non-zero classes per prime, every position of
{1..m} hit.

Pasted output, MacBook Pro 18,2 (Apple M1 Max, 10 cores, 64 GB), node v22.21.0,
one core:

```
n   p_n   omega2   h2      m-tests  nodes(last-fail)  total-nodes  secs
3   5     2        18      2        1                 4            0.00
4   7     4        30      3        1                 10           0.00
5   11    10       66      7        10                57           0.00
6   13    24       150     15       88                477          0.00
7   17    31       192     8        3453              5703         0.00
8   19    42       258     12       69899             72001        0.02
9   23    60       366     19       1849333           2915279      0.83
10  29    74       450     15       67888106          69631707     21.69
```

**All eight terms match Ziller and Morack's table 1 and A288815/A072753 digit
for digit**, and h2 = 6·ω2 + 6 reproduces at every one. That is the custody
check: our engine computes their object.

Two facts from that table are worth more than the terms.

**The cost ratio is about 25 to 40 per term.** Nodes go 72k, 2.9M, 70M for
p = 19, 23, 29; ratios 40 and 24. Seconds go 0.02, 0.83, 21.7. Term 11
(p = 31) had run for **more than 14 minutes without finishing** (killed at 14:20) when this task's
budget expired, against 21.7 seconds for term 10, so the ratio at that step is
at least 37 and the naive projection understates it. Term 12 is then a
multi-hour run and term 13 a multi-day one, which is where a prototype stops
being interesting. The comparison that matters is with Ziller's ratio of 6.7
(§3): our engine is not merely slower, it is on a **steeper curve**, so the gap
widens with every term.

**The proof is the whole cost.** At n = 10, 67.9M of 69.6M nodes were spent on
the single failing test at m = 75. Finding the optimum cost 2.5% of the run;
proving nothing longer exists cost 97.5%. That asymmetry is what §5 tries to
exploit, and it is why the attempt fails in an informative way.

## 3. Ziller and Morack's own cost curve, digitised

Their figure 2 (`full_details.pdf` p. 29) plots computation time against
maximum prime for all eight algorithms on a log(1 + t) scale. The plotted
points are text glyphs, so `pdftotext -bbox` recovers their coordinates
exactly.

Calibration, and it self-checks: the x axis ticks 0, 20, 40, 60, 80 sit at
152.358, 236.160, 319.965, 403.764, 487.568, uniform to four figures. The y
gridlines "1 sec", "1 min", "1 hour", "1 day", "1 month" sit at 621.094,
581.491, 534.246, 497.428, 458.016, and the implied scale factor between
consecutive pairs is **−11.586, −11.586, −11.585, −11.588** units per unit of
log(1 + t). Four independent agreements to five figures. One point of vertical
reading error is 9% in time, so the numbers below are good to about 10%.

Taking the **fastest algorithm run at each prime** (their frontier; at 71 and
73 only one algorithm was run to completion at all):

| p_n | n | best time | | p_n | n | best time |
|---|---|---|---|---|---|---|
| 43 | 14 | 53 s | | 61 | 18 | 19.7 h |
| 47 | 15 | 4.7 min | | 67 | 19 | 94.5 h |
| 53 | 16 | 1.5 h | | 71 | 20 | 17.7 d |
| 59 | 17 | 5.5 h | | **73** | **21** | **245 d** |

Per-term ratios over the last four steps: 3.6, 4.8, 4.5, 13.9. Geometric mean
over p = 43 to 73: **6.3**. Over the last three steps: **6.7**. Hardware: a
2016-era i7 boosted to 3.9 GHz, single thread except the ILP.

**READING 1 (MEASURED, from their published figure).** The published ladder
cost about 245 days of single-core time for its last term, and the marginal
cost of a term at the top of the ladder is a factor of about 6.7.

## 4. What terms 22, 25 and 30 would cost

Hardware assumption, stated so it can be argued with: Chris's M1 Max
single-core is taken at 2.0x the 2016 i7 at 3.9 GHz, and the search
parallelises well across the root branches, so 8 performance cores give
another 8x. Total **16x** against Ziller's figures. That is generous and it
assumes we have *matched their best algorithm*, which the prototype does not:
our per-term ratio is 25 to 40 against their 6.7, so a faithful
reimplementation is itself a serious project.

| term | p_n | Ziller-equivalent single-thread | on the M1 Max at 16x |
|---|---|---|---|
| 21 (published) | 73 | 245 days | 15 days |
| **22** | 79 | 4.5 years | **3.4 months** |
| 23 | 83 | 30 years | 1.9 years |
| 25 | 97 | 1.4e3 years | 85 years |
| 30 | 113 | 8.9e6 years | 5.6e5 years |

**READING 2 (INFERRED, from Reading 1 and a stated hardware model).** One new
term of A288815 is a three-to-four month uninterrupted run on Chris's machine,
*after* writing code as good as Ziller's. Two new terms is two years. The ten
to twenty terms a diagnostic would want are not reachable by any amount of
patience on one machine, and are not reachable on any machine: term 30 is
5.6e5 machine-years.

Note the direction of the error bars. 6.7 is the mean of a ratio series that
ran 3.6, 4.8, 4.5, 13.9. If the true asymptotic ratio is the 13.9 seen at the
last step rather than the mean, every row above gets worse.

## 5. Cheaper proxies, all three evaluated and all three refuted

This was the best hope of the task, so it got the most experiment.

### 5a. The head window does not exist for h2

`research/localized-01-ladder.js` reaches x = 16001 in seconds by computing the
largest twin-slot gap inside a head window [0, x^k) instead of the full tile of
width x#. The briefing asked whether the same trick prices h2.

**It does not, and the reason is structural, not computational.** The localized
trick works for G2 because G2 fixes the classes at {0, −2} and then *asks where
in the tile the worst gap is*; restricting to the head is a real restriction.
h2 has no location. By the Chinese remainder theorem, any choice of two classes
per prime that covers a run of length m can be realised at any position
whatsoever, so "h2 restricted to [0, Y)" equals h2 exactly for every Y >= h2.
Windowing an adversarial object saves nothing.

**READING 3 (PROVEN, one line of CRT).** The head-window method is available
for G2 and unavailable for h2. Any proxy for h2 must restrict the adversary,
not the window.

### 5b. Lower-bound ladders decay, and the decay is the exponent

Since proving optimality is 97.5% of the cost, drop the proof.
`research/h2-lower-ladder.js` climbs m while a verified cover is found inside a
node budget. Every value is a certified lower bound. Pasted output, budget
2e7 nodes per feasibility call, 6.5 minutes total:

```
n   p_n   lower(omega2)  h2>=   true   shortfall%  secs
9   23    60             366    60     0.00        0.84
12  37    113            684    117    3.42        15.73
15  47    187            1128   213    12.21       38.92
18  61    243            1464   316    23.10       151.97
21  73    313            1884   436    28.21       16.50
```

The shortfall is not flat. It grows monotonically, 0% to 28% over the range
where we can check it. A hundredfold increase in budget (from 2e5 nodes, where
the shortfall reaches 37%) buys nine percentage points.

That matters exactly as much as the growth rate, because a *constant* relative
shortfall changes only the fitted constant and leaves the exponent untouched.
A growing one moves the exponent. `research/h2-length-needed.js` §(d) prices
it on the control:

```
shortfall at last term   fitted a
    0%                   a=1.282
   10%                   a=1.253   (shift -0.029)
   30%                   a=1.184   (shift -0.098)
   40%                   a=1.143   (shift -0.139)
```

A 28% terminal shortfall biases the exponent down by about 0.09, against a
question whose whole width is 1.5 versus 2.

### 5c. Randomised restarts are worse, and they say why

`research/h2-randomised.js` runs a randomised greedy with no backtracking:
walk the leftmost uncovered position, sample among the top-K classes by new
coverage, restart. Pasted output, 20000 restarts:

```
n   p_n   heuristic   true   ratio(heur/true)  secs
6   13    24          24     1.0000            0.04
9   23    48          60     0.8000            0.11
12  37    82          117    0.7009            0.23
15  47    124         213    0.5822            0.42
18  61    178         316    0.5633            0.67
21  73    219         436    0.5023            1.01
```

The ratio decays monotonically to 0.50. Twenty times the restarts (400000,
top-2, 18 seconds per term) lifts n = 21 only from 0.502 to **0.557**. A ratio
falling by a factor of two across p = 13 to 73 is an exponent bias of
log 2 / log(73/13) ≈ **−0.40**, four fifths of the entire 1.5-versus-2 gap.

**READING 4 (MEASURED).** Heuristic proxies for h2 do not track h2. They decay
against it at a rate that destroys the exponent, and the decay is not a budget
artefact: 20x the effort recovers five percentage points of a fifty-point gap.
Ziller's own count of maximum-length sequences (one, at n = 13, in a space of
order 10^30) is the reason.

## 6. What more terms would buy, which is nothing

This is the part that makes the verdict easy, and it is measured rather than
argued. `research/h2-length-needed.js` asks the question on the one-class
control A048670, where the truth is known.

**Statistical precision is not the constraint and never was.** Sliding-window
sd against window width, 56 control terms:

```
width  windows   mean      sd        median-se   sd*width
8      49        1.2568    0.1297    0.0895      1.04
10     47        1.2660    0.0942    0.0658      0.94
19     38        1.2846    0.0567    0.0262      1.08
21     36        1.2856    0.0517    0.0227      1.08
30     27        1.2859    0.0359    0.0174      1.08
40     17        1.2991    0.0181    0.0124      0.72
```

sd·width is flat at 1.05, so sd ≈ 1.05/width. At the 19 terms h2 already has,
the sd is 0.057. Separating 1.5 from 2 needs 0.17 at three sigma. **We have
three times the precision we need, and have had it since 2017.**

**The constraint is the bias, and terms make it worse.** Nested prefixes of the
control, comparing the pure power law against the family that contains the
truth:

```
terms  p-range      a(p^a)   AIC(p^a)   a(p log^a)  AIC(p log^a)   winner       dAIC
10     [5,37]       1.191    -44.4      0.484       -44.8          p log^a (right) 0.5
15     [5,59]       1.205    -72.0      0.561       -71.4          p^a (WRONG)     -0.6
21     [5,83]       1.251    -100.0     0.721       -93.5          p^a (WRONG)     -6.5
30     [5,131]      1.277    -150.3     0.855       -134.3         p^a (WRONG)     -16.0
40     [5,181]      1.280    -213.2     0.924       -186.5         p^a (WRONG)     -26.8
56     [5,271]      1.282    -318.3     1.000       -271.4         p^a (WRONG)     -46.9
```

Read the last column downward. **The wrong model's advantage grows
monotonically with every term added, from a tie at 10 terms to 47 AIC units at
56.** The right family's own exponent estimate crawls from 0.484 to 1.002 and
is still nowhere near the conjectured 2 at p = 271. There is no prefix length
at which this data set turns around and identifies its own generating law.

**READING 5 (MEASURED, and it is the answer to the briefing's question 4).**
There is no number of terms at which the two-class exponent becomes readable by
this estimator. The required ladder length is not 30 terms or 40 terms; on the
only object where the answer can be checked, 56 terms out to p = 271 still
select the wrong model, by the largest margin in the table. The bias is a
property of the range, not of the sample size, and h2 terms 22 to 30 would live
at p = 79 to 113, well inside the range where the control is already wrong by
0.28.

## 7. Verdict and recommendation

**Infeasible, and it would not help.**

1. **Do not attempt exact term 22.** Three to four months of uninterrupted
   single-machine wall clock in the best case, after a reimplementation
   matching a specialist's decade of tuning, for a term that the control says
   moves nothing. `research/exponent-control.md` §8 itself measured that adding
   one term to a ten-term fit moves the exponent by 0.022; there is no reason
   the twenty-second term of a twenty-one-term fit does better.
2. **Do not build a proxy ladder.** All three candidate proxies were tested
   here and all three fail in the same direction, downward and growing, which
   is precisely the direction that fakes a smaller exponent. Reporting a
   heuristic h2 ladder as evidence about the exponent would be reporting a
   −0.4 artefact.
3. **The prototype is worth keeping anyway**, for two reasons that have nothing
   to do with the exponent. It reproduces eight terms of a `hard` OEIS sequence
   from scratch, so it is a live check on any two-class covering claim this
   repo makes; and it is a ready-made exact solver for *restricted* two-class
   questions, where the adversary is confined to a few primes and the rest take
   the arithmetic {0, −2} classes. That family interpolates between G2 and h2,
   costs whatever we choose to spend, and unlike the proxies above it is an
   exact computation of a well-defined object at every setting. Whether its
   exponent tracks anything is unknown and would itself need checking.
4. **The exponent question does not have a computational answer at these
   sizes.** §6 is the honest statement of that. If the exponent of the
   two-class ladder matters to the Zone Postulate, it has to be reached by
   proof, not by a longer table. That is the same conclusion
   `research/exponent-control.md` reached about the estimator, extended to the
   only remedy it left open.

## 8. What this note owes other files

*(Outstanding against files this note does not own. The claims themselves belong
in those files; the reasons they changed belong in `history/CHANGELOG.md`.)*

1. **`research/exponent-control.md` §8, second bullet.** "Extending h2 past 21
   terms is the highest-value computation available on this question, because
   it is the only two-class ladder long enough for the sliding-window
   diagnostic to work at all." Both halves need withdrawing. The cost is
   3.4 months per term on Chris's hardware with code we do not have (§4), and
   the sliding-window diagnostic is not term-limited: at 19 terms its sd is
   already 0.057 against a 0.5 question, and on the control the systematic bias
   it is meant to expose does not shrink out to 56 terms (§6). The bullet
   should be replaced by the measured statement that no reachable ladder length
   separates the models.
2. **`research/exponent-control.md` §8, third bullet.** "Deciding whether Q is
   bounded ... needs only more h2 terms plus the corresponding h, both of which
   are OEIS computations rather than new theory." The phrase "OEIS
   computations rather than new theory" understates it by about six orders of
   magnitude on the h2 side. h is cheap and known to 58 terms; h2 is the
   245-days-per-term object. Q is capped at 19 points for the foreseeable
   future.
3. **A288815's `more` keyword should not be read as an invitation.** The
   sequence is `hard,more` because its author, who wrote the algorithms, ran
   out of compute at 245 days for the last term, not because nobody has tried (`SEARCH-CONVENTIONS.md`). That is the opposite of an absence claim, and it is about the OEIS community rather than about this repository.

## 9. Files

- `research/h2-prototype.js` — exact solver, RPA2 recursion with the criterion
  2.2 exact-count bound; reproduces ω2(n) for n = 3..10 in 22 seconds. Exports
  `makeSolver` for reuse.
- `research/h2-lower-ladder.js` — certified lower bounds under a node budget;
  measures the shortfall against the 19 published terms.
- `research/h2-randomised.js` — randomised-restart heuristic; measures the
  proxy decay.
- `research/h2-length-needed.js` — the four control diagnostics of §6 and
  §5b, on A048670 and h2.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
