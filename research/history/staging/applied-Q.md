# applied-Q.md — wave 4, partition Q: the OEIS drafts get an instrument

<!-- ledger
id: Q-applied-Q
status: ANSWERED
todo: none
question: Do the two OEIS drafts survive an instrument that recomputes them rather than reads them?
verdict: Two defects found in the G2 draft (the Maier-Pomerance conjecture cited in the wrong direction, and a no-upper-bound-published claim the repository itself contradicts) plus a third error class routed from partition P; every DATA term was recomputed and audit-numbers went from 37/39 to 76/78 checks.
-->

Files owned and edited: `research/oeis-G2-submission.md`,
`research/oeis-seam-submission.md`, `research/audit-numbers.js`. Nothing outside
that list was touched.

**Gate.** Before: refs 0, quotes 0, crosslinks 0, scripts 0, transfers 0,
calibration 0; `qc/selftest.js` exit 0. After: identical, all six at zero,
selftest exit 0. `audit-numbers.js` went from 37/39 to 76/78: the two
pre-existing failures are unchanged and are reported in §6, and all 39 new
checks pass.

**Lead with the finding.** Three defects, all in `oeis-G2-submission.md`, all in
COMMENTS: a conjecture cited in the wrong direction, a claim of openness the
repository's own theorem contradicts, and the exponent of a *different sequence*
quoted as this one's. Details in §3, and the third arrived by routing from
partition P and is written up in §8. The seam draft, by contrast, came through
the audit with no correctness defect at all, which is a result and is recorded
as one.

---

## 1. Method: nothing was read, everything was recomputed

Every number below was produced in this session from an independent
implementation, and every A-number was fetched from oeis.org rather than taken
from the repository's description of it. `WebFetch` returns HTTP 403 on
oeis.org; `curl -A "Mozilla/5.0" "https://oeis.org/search?q=id:AXXXXXX&fmt=text"`
works and returns the full internal record.

**The negative searches were controlled.** Three OEIS searches returned "No
results", and a null search result proves nothing until the endpoint is shown to
return a positive. Two positive controls were run through the identical URL
form: `seq:2,6,18,30,66,150,192,258` returns A288815, and
`seq:1,1,3,15,135,1485,22275` returns A059861. Both fired. Only then were the
three nulls trusted.

Scratch scripts used, all under the session scratchpad, none added to the repo:
`seam.py` (two independent primality tests), `g2num.py` (the G2 COMMENTS
numbers and the Hardy-Littlewood sums), `extra.py` (the retired index fit and
the a(21)..a(30) extension).

---

## 2. Every A-number, checked at the source

Fetched and read in full. The middle column is what oeis.org actually says, not
what the drafts or the corpus say it says.

| A-number | what oeis.org has | draft's use | verdict |
|---|---|---|---|
| A002110 | "Primorial numbers: product of first n primes", **offset 0**, a(0)=1 | "P = A002110(n) is the n-th primorial" | correct; offset 0 still makes A002110(n) the product of the first n primes |
| A059861 | `a(n) = Product_{i=2..n} (prime(i) - 2)`, offset 1 | twin candidates per period | correct, and confirmed by Tener's own formula on the page: `a(n) = \|{r : 0 <= r < primorial(n), gcd(r,P)=gcd(r+2,P)=1}\|`. This is a fourth independent proof of the `(n)` indexing, at the source |
| A048669 | "The Jacobsthal function g(n): maximal gap in a list of all the integers relatively prime to n" | the one-class analogue | correct |
| A048670 | "Jacobsthal function A048669 applied to the product of the first n primes", 58 terms in DATA | pointwise lower bound; the 58-term control | correct, and the DATA field really does hold **58** terms, counted |
| A288815 | "Paired Jacobsthal function applied to the product of the first n primes", Ziller, ref Ziller & Morack arXiv:1706.00317 | dominating comparison | correct, including the Ziller-Morack attribution |
| A072753 | "Maximum gap in two-stage prime-sieves", **offset 3** | grouped with A288815 as the paired function | correct, and stronger than the draft claimed: the page carries `a(n) = (A288815(n) - 6)/6`, so the two are one object in two normalisations. Verified arithmetically over n = 3..12 |
| A192870 | max M with no prime **n-tuplet** between M^2 and (M+1)^2; a(2) = 122 is the twin case | labelled "twins between squares" | loose, not wrong. Sharpened, and A091592 added, which is the twin case directly |
| A091592 | "Numbers n such that there are no twin primes between n^2 and (n+1)^2" | not previously cited | added to CROSSREFS; the script already computed it in part `a091592` |
| A087732 | "Smaller of twin primes of the form j*P(i)#-1 and j*P(i)#+1 with **0 < j < P(i+1)**" | open-range row lengths | correct, open range confirmed verbatim |
| A087651 | primorials P# such that j*P# has twin prime neighbours for some 0 < j < next prime, **offset 0** | "the primorials that produce them" | correct |
| A057706 | "Smaller of twin primes whose average is a primorial number", terms 5, 29, 2309 | the endpoint indicator | correct; 5, 29, 2309 are the primorials 6, 30, 2310, so n+1 = 2, 3, 5 exactly as the draft says |
| A014545 | k with 1 + (product of first k primes) prime | primorial + 1 | correct |
| A057704 | m with m-th primorial minus 1 prime | primorial - 1 | correct |
| A060256 | "Smallest multiple a(n) of n-th primorial q(n) such that a(n)*q(n)-1 and a(n)*q(n)+1 are twin primes" | the companion, deliberately not submitted | correct |

**No A-number in either draft is wrong.** That is a null result and it is the
answer to the highest-consequence question asked.

### The two absence claims, checked

- The seam count sequence is absent from OEIS in both conventions.
  `seq:2,4,4,3,4,6,2,1,7,1,1,2,0,1,1,1,3,1,0,4` (closed range) and
  `seq:1,3,4,2,4,6,2,1,7,1,1` (open range) both return "No results", against the
  two positive controls above.
- The G2 sequence is likewise absent: `seq:2,6,12,30,42,66,108,150,204,258`
  returns "No results". The draft does not claim this, but it is worth having on
  the record before submission.

---

## 3. The two defects found, both in oeis-G2-submission.md

### 3.1 The Maier-Pomerance conjecture was cited in the wrong direction

The draft read:

> a(n) >= p * log(p)^(2+o(1)) under the Maier-Pomerance conjecture for
> Jacobsthal's function.

The conjecture is an **upper** bound in the source the corpus itself pinned.
`research/maxgap-law.md`:415, checked against FGKMT (arXiv:1412.5029) on
2026-08-17, quotes it verbatim: *"It is conjectured by Maier and Pomerance that
in fact `Y(x) << x(log x)^{2+o(1)}`"*, with `Y(x) = j(P(x)) - 1` their eq. (1.3).
A `<<` statement cannot yield the `>=` the draft deduced from it. The equality
form `J(T) = T(log T)^{2+o(1)}`, which does yield it, is Ford's Montreal slides,
and `maxgap-law.md`:426 says so in terms and locates them.

So the corpus already held both forms, correctly separated, and the draft
collapsed them into the one that does not support the sentence. Fixed by naming
both forms and attributing each. Ford's slides added to LINKS.

Note the shape of this: the draft was internally consistent, consistent with the
loose reading of A048670's OEIS comment, and wrong against the primary source.
Only the corpus's own source-pinned section caught it.

### 3.2 "No upper bound is published, at any exponent" is contradicted by the repository

The draft read:

> No upper bound is published. Iwaniec's bound O(log(P)^2) for Jacobsthal's
> function has no published analogue for two forbidden classes per prime, **at
> any exponent**.

`research/THE-DIALS.md`:257 carries a table row for the twin Jacobsthal G2(p#)
with sieve dimension 2, sieve limit **4.2665**, and a proven Jacobsthal exponent
of **4.2665**, pointing at `paper/beta2-note.md`. That note's status line is
"THEOREM, sieve input FULLY VERIFIED against the primary source, no outstanding
items", and its §1 states `G2(n) <= C(eps) * p_n^(beta_2 + eps)` for all n. Its
input, `beta_2 ≈ 4.266`, is quoted as **in print** at Diamond and Halberstam,
Cambridge Tracts 177, p. 79.

The sentence is defensible on the narrow word "published", since beta2-note is
unpublished and calls itself "the first published upper bound of any exponent"
if it ever appears. But "at any exponent" reads to an OEIS user as "nothing is
known", when the submitter holds a theorem giving 4.2665 from an in-print sieve
limit by a standard argument. That is the campaign's dominant defect exactly: a
scoped result restated without its scope, in the one place with an external
consequence.

Rewritten to say what is true: no analogue is in print, the obstruction is sieve
dimension rather than missing input, the dimension-2 limit gives
`a(n) << p^(beta_2 + eps)`, and the open band on the exponent is (2, 4.2665].
This also matches `THE-DIALS.md`:288 word for word on the band.

---

## 4. Everything recomputed, term by term

### 4.1 G2 draft, all twelve DATA terms

Rebuilt from scratch by `audit-numbers.js` parts `ladder` and `g2big`, which
construct the twin-slot cycle directly to 29#, lift one prime to 31# and two
primes to 37#, and settle copy-boundary gaps separately. Every term matches:

    2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528

a(1) and a(2) were also done by hand: mod 2 the only slot is r = 1, mod 6 the
only slot is r = 5, so each cycle has a single slot and the cyclic gap is the
modulus, giving 2 and 6. Both agree with A059861(1) = A059861(2) = 1.

The EXAMPLE was checked independently: mod 30 the slots are 11, 17, 29, cyclic
gaps 6, 12, 12, so a(3) = 12.

The provenance table's primorials were checked against A002110 term by term,
including 200560490130 at n = 11 and 7420738134810 at n = 12, and the slot
counts against A059861, including 6226553025 and 217929355875. All correct.
A002110(13) = 304250263527210, so "3.0e14 positions" and "about 40x" are right
(the ratio is 41.0).

### 4.2 G2 draft, the COMMENTS numbers

| claim | recomputed | verdict |
|---|---|---|
| a(n) < 0.32 * prime(n+1)^2 | max over twelve terms is 0.3141 | holds |
| ratio 0.222 at n = 1 to 0.314 at n = 12 | 0.2222 and 0.3141 | correct (not monotone in between, but the draft says "runs from", not "increases") |
| a(n)/A048670(n) = 2.00 ... 8.00 at n = 3..12 | matches, already checked in part `onecls` | correct |
| c averages 0.48 over n = 5..12, cv 10% | mean 0.4814, sample sd 0.0490, **cv 10.2%**, range 0.4463..0.5939 | correct |
| a(n)/(p log^2 p) between 0.66 and 1.13, mean 0.89 | **over n = 3..12**: 0.6640, 1.1318, mean 0.8929 | correct but unscoped; over n = 5..12 the same three read 0.66, 1.09, 0.86 and the sentence would be wrong. Scope added |
| 58-term one-class control | A048670's DATA field holds exactly 58 terms, counted | correct |
| exponent near 1.57, bracket 1.3 to 1.9, floor 1 | **wrong number for this sequence**, see §8 | 1.57 is A288815's; G2's is 1.54 |
| Iwaniec O(log(P)^2) | corpus states it as `g(x#) << x^2` with an inexplicit constant; log P = theta(x) ~ x, so the forms agree | correct |
| a(n) <= A288815(n), the listed pairs | 12<=18, 30<=30, 42<=66, 528<=708 and all twelve | holds |

### 4.3 The reduction to the twin prime conjecture: checked, and it survived a wrong objection

The draft states that if `a(n) < prime(n+1)^2 - prime(n)` for infinitely many n
then TPC follows. My first derivation made this look off by two: the argument
needs a twin candidate r with both r and r+2 below prime(n+1)^2, so r must be at
most `prime(n+1)^2 - 3`, and I read the draft's threshold as one too generous.

That was my error, not the draft's. A twin candidate r has no prime factor at or
below prime(n), so r <= prime(n) forces r = 1, and r = 1 is a candidate only
when 3 does not divide P, that is only at n = 1. So for n >= 2 the lower end of
the window costs nothing and the correct threshold is
`a(n) < prime(n+1)^2 - 2`, which is exactly what
`research/two-class-lower-bounds.md`:619 and `THE-DIALS.md`:274 already carry.
Since prime(n) >= 2, the draft's `prime(n+1)^2 - prime(n)` is at least as strong
a hypothesis as `prime(n+1)^2 - 2`, so the draft's implication is valid and
conservative. **No change made.** Recorded because the objection is the natural
one and the next reader will raise it.

The supporting clause "any composite in (prime(n), prime(n+1)^2) has a prime
factor <= prime(n)" is correct: a composite m has least prime factor at most
sqrt(m) < prime(n+1).

### 4.4 G2 draft, the PROG entry

Hand-traced, since no PARI is installed on this machine. The state machine is
correct: `first` latches the first slot without contributing a gap, `prev`
carries the previous slot, and the final `max(g, first+P-prev)` closes the
cycle. Traced at n = 1 (slots {1} mod 2, returns max(0, 1+2-1) = 2) and n = 3
(slots 11, 17, 29 mod 30, internal max 12, wrap 11+30-29 = 12, returns 12). Both
correct. `primes(n)`, `vecprod`, `gcd` and `max` are all valid PARI.

The trailing comment said a(10) came from a segmented sieve and stopped there,
while DATA runs to a(12). Corrected to name all three.

### 4.5 Seam draft, all twenty DATA terms and every witness

Recomputed from scratch in Python with **two independent primality tests**: a
Miller-Rabin with 40 random bases, and a Baillie-PSW (Miller-Rabin base 2 plus a
strong Lucas probable-prime test, with its own Jacobi symbol implementation).
The two were asserted to agree on **every** call, not only on the accepted ones.
Independently reimplemented a third time in BigInt inside `audit-numbers.js`.

All twenty terms reproduce: `2, 4, 4, 3, 4, 6, 2, 1, 7, 1, 1, 2, 0, 1, 1, 1, 3,
1, 0, 4`, summing to 48. Every witness list in the provenance table reproduces
exactly, including the two empty rows at n = 13 and n = 19.

**Four independent confirmations from OEIS itself**, none of which the draft
claims and all of which hold:

1. A087732's DATA, decoded, gives the open-range witnesses row by row. 3 is
   j=2 of 2#; 5, 11, 17 are 6#; 29, 59, 149, 179 are 30#; 419, 1049 are 210#;
   2309, 9239, 11549, 25409 are 2310#; 180179 through 420419 are the six terms
   of 30030# at k = 6, 9, 10, 11, 13, 14, matching a(6) = 6 witness for witness;
   4084079 and 8678669 are 510510# at k = 8, 17; 106696589 is 9699690# at k = 11;
   and the seven terms from 892371479 to 6023507489 are 223092870# at
   k = 4, 11, 16, 19, 20, 22, 27, matching a(9) = 7 exactly.
2. A087651's run lengths are 1, 3, 4, 2, 4, 6, 2, 1, 7, 1, 1 for n = 1..11,
   which are precisely a(n) minus the endpoint indicator. The identity the draft
   states holds at every one of the eleven.
3. A057706 = {5, 29, 2309} gives endpoint hits at n+1 = 2, 3, 5, so the indicator
   fires at n = 1, 2, 4, and 2 = 1+1, 4 = 3+1, 3 = 2+1 are exactly a(1), a(2),
   a(4). Correct.
4. A060256(n) equals the least witness for every n = 1..30 with a(n) > 0, and
   the n with a(n) = 0 (13, 19, and 21, 29 in the extension) are exactly those
   where A060256(n) exceeds prime(n+1). Thirty-for-thirty.

### 4.6 Seam draft, the ceiling and the two exceptions

`a(n) <= prime(n+1) - 2 for n >= 3` verified at all computed n. The stated proof
is correct: k*P sweeps every residue mod q = prime(n+1) once, so exactly two k
give a member divisible by q, and for n >= 3 that member exceeds q and is
therefore composite. The n = 1, 2 exceptions are right and were checked
individually: at n = 1 the pair (3,5) at k = 2 counts because the divisible
member is 3 = prime(2) itself, at n = 2 the pair (5,7) at k = 1 because it is
5 = prime(3). Both give exactly one extra over the bound, and a(1) = 2 = (q-2)+1,
a(2) = 4 = (q-2)+1.

The EXAMPLE at n = 4 was checked: among k = 1..11 the twin pairs are k = 2
(419,421), k = 5 (1049,1051) and k = 11 (2309,2311), so a(4) = 3.

The PROG entry is correct as written, including at n = 1 where k = 1 gives
`isprime(1)` = 0.

### 4.7 Seam draft, the Hardy-Littlewood heuristic, rederived from scratch

The wave-3 correction is right, and it was rederived here rather than accepted.
Write `W = prod_{q<=x} q` and `D = prod_{3<=q<=x} (q-2)`. Then

    W/D = 2 * prod_{3<=q<=x} q/(q-2)

and since `C2 = prod_{q>=3} (1 - 1/(q-1)^2)` with
`1 - 1/(q-1)^2 = q(q-2)/(q-1)^2`, substituting gives

    prod_{3<=q<=x} q/(q-2) = (1/C2) * prod_{3<=q<=x} (q/(q-1))^2
                           ~ (1/C2) * (e^gamma ln x / 2)^2

by Mertens with the q = 2 factor removed. Hence

    W/D ~ 2 * e^{2 gamma} ln^2 x / (4 C2) = e^{2 gamma} ln^2 x / (2 C2)

which is `2.4026`, not `1.2013`. The draft's stated form is correct and the twin
constant does cancel exactly, leaving no surviving factor of 2.

Numerically, the per-seam probability summed over k = 1..prime(n+1) and over
n = 1..20 gives **52.51** by exact per-k evaluation and **57.32** by the
asymptotic form, against **48** observed. The retired form gives 26.25, which
does not bracket 48, and 26.25 doubling to 52.51 is what identifies the defect
as exactly a factor of two. The asymptotic total's n = 1 term is 9.52 on its own,
because there P = prime(1) = 2 and `(log prime(n) / log P)^2` degenerates to 1;
this is now said in the draft so the number is not read as a clean prediction.

The decay claim was checked too: `log P = theta(p_n) ~ p_n`, so the expectation
decays like `log^2(p_n)/p_n`, whose sum over n behaves like `sum log n / n` and
diverges. The draft's conclusion, infinitely many positive terms but density
zero, follows heuristically as stated.

### 4.8 The extension a(21)..a(30), computed and verified

Computed with both primality implementations and cross-checked against A060256:

    n:  21 22 23 24 25 26 27 28 29 30
    a:   0  2  1  1  2  1  1  1  0  1

witnesses none, {20,75}, {83}, {91}, {35,72}, {80}, {48}, {47}, none, {2}. The
sum over n = 1..30 is 58. Recorded in the draft's provenance section rather than
appended to DATA, because DATA is the submitter's field and the moratorium means
nothing is going anywhere today. Appending is a one-line change.

---

## 5. The instrument, extended

`research/audit-numbers.js` gains a part `oeis`, 39 checks, running in 0.1 s. It
was added, nothing was removed, the banner title is intact, and the existing
retired-value checks are untouched.

Design constraint kept: the part reads no repo script and no draft. A059861 is
recomputed by a **direct residue sieve** over Z/P for n = 1..7 and only then
compared to its closed form, so the closed form is tested rather than assumed.
The seam terms come from a self-contained BigInt Miller-Rabin written for this
part. The G2 terms are cross-referenced to parts `ladder` and `g2big`, which
build the cycle from nothing.

Retired values now inside the audit's reach, each of which will fail the run if
reintroduced:

- `c` fitted with **A059861(n-1)**: mean 0.0406 at cv 69.4%, against 0.4814 at
  cv 10.2% for the correct A059861(n). The retired indexing collapses the fit by
  more than a factor of ten, so this is a loud check.
- The seam heuristic with the retired `/2`: 26.3 against the live 52.5.
- `e^{2gamma}/(4 C2) = 1.2013` against `e^{2gamma}/(2 C2) = 2.4026`. This pair
  already existed at line 63 in part `const`, which is the point: it was the
  right regression test in the wrong scope, and it now also stands inside the
  part that covers the drafts, where the same slip actually happened.

Also newly checked: the G2 DATA string, A002110(12) and A059861(12), both margin
columns, the p ln^2 p row with its n = 3..12 scope written into the label, the
A048670 and A288815 pointwise inequalities, the `A288815 = 6*A072753 + 6`
identity over n = 3..12, all thirty seam terms, the seam ceiling, the
A060256 agreement, and the zero-term characterisation.

One bug of my own was caught by the run and fixed before it landed: the first
version of the A072753 check appended two terms to the claimed side that
A072753's offset-3 indexing does not reach. The audit failed, which is the
instrument working on its author.

---

## 6. Outside my files, reported not fixed

`audit-numbers.js` failed two checks **before** any of my edits, and still fails
exactly those two. Both are live disagreements in documents I do not own, and
both are already labelled as such in the script:

- `G2(41#) x=37-as-outlier`: the script computes **488**; `two-class-lower-bounds.md`
  and `maxgap-law.md` say **487**.
- `G2(41#) band low`: the script computes **476**; `U-FRAME.md` says **475**,
  while the other two files say 476.

Each is a rounding-level discrepancy of 1, and each is a real disagreement
between the script and a document. They are outside partition Q's scope and are
handed on untouched.

---

## 7. What was NOT checked, and why

- **The PARI PROG entries were not executed.** No PARI or gp on this machine.
  Both were hand-traced against DATA instead, at two values of n each, which
  catches state-machine errors but would not catch a PARI syntax error. Running
  them under a real gp before submission is cheap and is the one verification
  gap I could not close.
- **a(13) of the G2 sequence was not computed.** It needs about 40x a 54-minute
  run and no term depends on it.
- **The a(10), a(11), a(12) G2 runs were not re-executed at full scale.** The
  audit rebuilds all twelve terms by an independent route (cycle construction
  plus one- and two-prime lifts with separate boundary handling), which is a
  stronger check than repeating the original segmented sieve would be.
- **The Iwaniec 1978 and Rankin 1938 bibliographic details were not fetched from
  a primary source.** They are consistent with the corpus, which has them at
  `THE-DIALS.md`:256 and `ZONE-POSTULATE.md`:270, but internal consistency is
  precisely what this campaign has twice found insufficient. The FGKMT details
  (JAMS 31 (2018), 65-105) *were* verified, at `maxgap-law.md`:412, which records
  a source check against arXiv:1412.5029 dated 2026-08-17.
- **The novelty claims were not re-checked against the literature.** "Absent
  from OEIS" was checked and holds. "No analogue in print" now rests on the
  audit recorded in `paper/beta2-note.md` and was not independently re-searched;
  wave 3 already flagged the repository's remaining novelty claims as needing an
  expert literature read before anything leaves.

---

## 8. Addendum, routed from partition P: the exponent was another sequence's

P reported that the draft might quote 1.57 where G2's figure is 1.54, and warned
against copying 1.54 in on its say-so because the home's own arithmetic had been
questioned elsewhere. Both ends were checked here and the routing is **correct**.

**The draft did carry it.** `oeis-G2-submission.md` read "the growth exponent in
p is near 1.57". The draft is about G2. 1.57 is not G2's number.

**The home is explicit.** `research/exponent-control.md`:198 says in terms:
*"Quote 1.57 for h2 and 1.54 for G2"*. Its §5 table at :169 gives
"control-corrected, G2 | **1.54 ± 0.09**" against "control-corrected, h2 |
**1.57 ± 0.06**" at :168. `research/U-FRAME.md`:156 corroborates independently
with "1.54 ± 0.09 for our own G₂ on 10". So the instruction is not a stray line.

**Neither figure was copied.** Both were rebuilt from the control. The estimator
is the raw log-log slope in the x-frame minus the one-class control's own bias at
the *matching window width*, and every input reproduces:

- The raw G2 slope over the ten exact terms x = 5..37 is **1.801**, which the
  audit's part `fits` already computed independently.
- The control A048670, 58 terms, fitted over every sliding window, reproduces
  `exponent-control.md` §1 **digit for digit**: width 10 gives 49 windows,
  mean 1.262, sd 0.095, min 1.126, max 1.549; width 12, 47 windows, mean 1.267;
  width 19, 40 windows, mean 1.280; width 21, 38 windows, mean 1.282; width 30,
  29 windows, mean 1.283. Every one of those matches the printed table.
- G2: 1.801 − 0.262 = **1.539**, which is the 1.54 the home instructs.
- h2: 1.847 − 0.280 = **1.567**, which is 1.57.

So the §5 table reproduces exactly and the two figures are genuinely different
numbers about genuinely different sequences: G2 on ten terms, A288815 on
nineteen. P's caution about the home was worth raising and does not bite here.
The arithmetic P had seen questioned, "1.924 − 0.282 = 1.642 against 1.567
printed", belongs to §6's margin discussion and pairs a different raw slope with
the width-21 bias; the §5 exponents pair 1.801 with width 10 and 1.847 with
width 19, and both land on the printed values.

**One loose end, outside my files and not chased.** `exponent-control.md` §1's
*nested* prefix readings, "1.191 on ten terms, 1.238 on nineteen, 1.282 on
fifty-six", do not reproduce from a prefix starting at x = 2: I get 1.176, 1.198
and 1.262. The sliding-window table, which is what the corrected exponents
actually use, reproduces perfectly. The difference is almost certainly a
starting-x convention in the nested row. Reported, not fixed, and it does not
touch 1.54 or 1.57.

**Fixed in the draft**, with the scope and the distinction written in rather than
a bare number swapped: the raw slope, the control, the bias, 1.54 ± 0.09, the
bracket and floor kept, an explicit sentence that A288815 reads 1.57 ± 0.06 over
nineteen terms and that the two should not be quoted at a common exponent, and
the home's instruction to note the long certificate ladder at about 1.2 with a
third of the gap priced and the residual unexplained.

**Audit coverage added**, eight checks: the control's 58 terms, its bias at
widths 10, 19 and 21, the raw G2 slope, both corrected exponents, and an
explicit check that the two differ by more than rounding. The comment block
names 1.57-for-G2 as the retired value, so reintroducing it fails the run.

**This is the third distinct error class in the drafts**, after the A059861
index off-by-one and the seam factor of two, and all three were in COMMENTS
fields of documents no instrument reached. It is the single strongest input to
the readiness judgement.
