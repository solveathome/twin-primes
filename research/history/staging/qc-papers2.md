# QC pass 2: the paper suite

<!-- ledger
id: Q-qc-papers2
status: ANSWERED
todo: none
question: Do the paper suite's five doors and four faces restate their research homes correctly?
verdict: Fifteen findings in sections 7 and 7A plus a suite sweep: a door resting entirely on a column its own cited file disclaims as invalid, whose corrected computation reverses the reading; a degree-4 certificate credited with a result needing moments through order 6; and the same paper contradicting itself forty lines apart on the anchored calm.
-->

STATUS: COMPLETE for §§7 and 7A claim by claim, and for the suite's abstracts,
theorem statements and caveated numbers. Coverage gap stated at the end. Wave 1,
diagnosis only: read-only on every existing file, nothing edited, nothing committed.
This is the only file written.

Extends `research/history/staging/qc-status.md` (13 defects), whose closing
recommendation named `paper/moire-primes.md` §§7 and 7A as the second pass, "because
the five doors and four faces are where every object's status gets restated for
publication, and a paper draft is the one place a scope error becomes a false claim
rather than an internal inconsistency."

**23 findings: 15 in §§7 and 7A (P-1 to P-15), 8 in the rest of the suite (S-1 to
S-8).** Every one carries file:line, the claim as written, the home document's status
and scope, the class of mismatch, an exact replacement sentence, and a confidence.

Count by class: REFUTED-NUMBER-AS-CERTIFIED 1 · DROPPED HYPOTHESIS 6 · SCOPE
INFLATION 7 · STATUS CONTRADICTION 3 · ATTRIBUTION 4 · HONESTY DIRECTION 2.

**The three worst.** P-1, Door 2's numbers come from a column its own cited file
disclaims as not a certificate, and the corrected file reverses the verdict: this is
the one finding that is a false published claim rather than an internal
inconsistency. P-11, Door 5 cites two covering theorems whose "distinct moduli"
hypothesis our two-classes-per-prime system violates, and omits the one theorem
(Klein-Koukoulopoulos-Lemieux 2024) that covers multiplicity 2. P-3, Face 4 names
Lemma V as "exactly one ingredient" where four research documents say Lemma V is not
the operative assumption at the measured working point and a Gaussian maximal law is
the whole price: qc-status finding A-1, landing in a paper, with "exactly" added.

**The dominant defect class, confirming the brief's prediction:** six separate
dropped hypotheses, at P-2 (moment order 6 credited to a degree-4 certificate), P-5
(two ensembles quoted as one), P-9 (K* stated without its moduli pool), P-11
(distinct moduli), P-15 (per-degree instead of per-two-degrees), S-2 (p ≥ 17 dropped
from the abstract's one novelty theorem). Every one survived every check that was not
a word-diff.

## Section 1: §§7 and 7A, claim by claim

Ranked by publication risk. P-1 is the worst: a number that its own cited source
marks as not a certificate.

### P-1. Door 2 rests entirely on a column its own cited file disclaims as invalid, and the corrected computation reverses the reading

`paper/moire-primes.md`:432-437, as written:

> **Door 2 — the Fourier budget (2ⁿ).** The slot indicator's transform factors
> over primes: smooth conspiracies are spectrally dead (|F(1)| ~ 2ⁿ/P#), the
> dominant modes are the rigid mod-6 comb, and the certified window-discrepancy
> budget grows like 2ⁿ, strictly better bookkeeping than Door 1, missing
> certification of the p = 11 zone by only 18% (`research/attack-04`).

HOME AND STATUS. The cited file, `research/attack-04-fourier-budget.js`, carries a
correction banner at its own lines 4-11, dated 2026-08-14:

> "⚠ CORRECTION (2026-08-14, natal-cap-02): the local factor below indexes at a
> mod p, but the correct CRT index is a·(P/p)^{-1} mod p — this file's "certified"
> bound column paired moduli with WRONG kernel values (pointwise |F| off by up to
> N/2 at x=11) and was **NOT a valid certificate**. The qualitative class-level
> readings (smooth conspiracies dead; big coefficients at highly-divisible
> frequencies) survive. Valid certificates:
> `research/natal-cap-02-fourier-budget.js`."

The 18% figure and the `certified/mu = 1.19, 1.91, 3.91` ladder behind "grows like
2ⁿ" are both read off that disclaimed column (`attack-04` lines 76-78 and reading
3 at lines 90-96). The corrected authority, `research/natal-cap-02-fourier-budget.js`
reading 4, reverses the p = 11 verdict outright:

> "x=11: certification quality is IRRELEVANT — even the oracle fails (cap 117.3 vs
> N=90, margin −27.3). … The per-prime union bound is structurally dead from here
> on, no matter how good the harmonic analysis gets."

and relocates the near-miss to x = 7, at 15% rather than 18%, while noting it is
moot: "the ONLY level where sharper Fourier bookkeeping could flip a sign —
methodologically interesting, mathematically moot (twins below 210 are known by
inspection)."

CLASS: REFUTED NUMBER PUBLISHED AS CERTIFIED, plus a reversed reading. This is the
one finding in this pass that is a false published claim rather than a scope slip:
the paper says a certified bound came within 18% of closing the p = 11 zone, and the
corrected computation says no bound of that shape can ever close it, at that level or
any later one.

Two sub-defects in the same three lines:
- "the dominant modes are the rigid mod-6 comb" is superseded as a statement about
  the budget. `natal-cap-02` reading 2: "the certified budget is carried by the
  DIFFUSE u>=2 cloud, not by few structured modes — the largest single contributor
  to a sharp sum is ~1 out of ~60 at x=17." The comb frequencies do carry the
  largest individual |S| (= N exactly, at the four frequencies k = j·(W/30)), so the
  amplitude claim survives and the dominance claim does not.
- "|F(1)| ~ 2ⁿ/P#" survives (`attack-04` reading 1, explicitly preserved by the
  correction banner as a class-level reading).

REPLACEMENT SENTENCE (Door 2, full):

`**Door 2 — the Fourier budget (2ⁿ).** The slot indicator's transform factors over
primes, so the spectrum is exactly computable: smooth conspiracies are spectrally
dead, |F(1)| ~ 2ⁿ/P#, and the largest individual coefficients sit at the rigid
mod-6 comb frequencies k = j·(W/30), where they reach the full census N. The
certified window-discrepancy budget is better bookkeeping than Door 1, growing
about like 2ⁿ against Door 1's 3ⁿ, but it is carried by the diffuse cloud of
frequencies that touch two or more primes rather than by the few structured modes,
and it loses to the true deviation by a factor that grows about 1.6× per level
(1.7, 2.9, 4.7, 7.1 at x = 7, 11, 13, 17). The certified route closes here for a
reason no sharper kernel repairs: at x = 11 even a perfect per-window oracle fails,
capping removals at 117.3 against a census of 90, and from x = 13 up the gross
strike total alone exceeds the census (1,135 against 990). Only at x = 7 is the
margin positive at all, and there the certificate misses by 15%
(`research/natal-cap-02-fourier-budget.js`; the earlier
`research/attack-04-fourier-budget.js` indexed its local factors without the CRT
twist and its certified column is not a certificate).`

CONFIDENCE HIGH. Checked: `attack-04-fourier-budget.js`:4-11, 70-97;
`natal-cap-02-fourier-budget.js`:18-25 and readings 1-6;
`research/NATAL-CAP-CAMPAIGN.md`:40. The same stale 18% claim also sits at
`research/ATTACKS.md`:14 and `research/README.md`:120, and no markdown in the
current corpus carries `natal-cap-02`'s corrected verdict, which is why the paper
inherited the wrong one. Those two are outside my axis but they are the reason this
defect will come back if only the paper is fixed.

### P-2. §7A Face 2 credits a degree-4 certificate with a result that needs moments through order 6

`paper/moire-primes.md`:575-579, as written:

> "This face also carries the campaign's best certified bounds. Against the
> ensemble, degree-4 moment certificates now beat Chebyshev by a factor of 4,190 at
> x = 11 and 513 at x = 13, the latter computed exactly over 39,782,707,965
> quadruples (proven, machine-verified)."

HOME: `research/natal-cap-21-beyond-chebyshev.md` Theorem 2 table, lines 40-46. At
@11 the ladder reads: Chebyshev 6.24e−3 (1×), quartic Markov 1.16e−4 (53.6×),
**optimal quartic-square 7.80e−5 (80×)**, sextic Markov 3.61e−6 (1728×), **optimal
cubic-square using moments 1..6, 1.49e−6 (4190×)**. So 4,190 is the moments-1..6
figure. The degree-4 figure at @11 is 80×. The 513× at @13 is genuinely quartic
(T₄ over C(990,4) = 39,782,707,965; `research/natal-cap-27-t4-at13.js`).

CLASS: DROPPED HYPOTHESIS, the pattern the brief names. The number, the level, the
citation and the calibration marker all survive the transfer; the moment order the
number depends on does not. A referee who reads this believes a fourth-moment
certificate delivers 4,190× and will not reproduce it.

REPLACEMENT SENTENCE:

`This face also carries the campaign's best certified bounds. Against the ensemble,
a fourth-moment certificate beats Chebyshev by a factor of 513 at x = 13, computed
exactly over 39,782,707,965 quadruples, and at x = 11, where moments through order
6 are also exactly available, the optimal certificate on moments 1 through 6 beats
Chebyshev by 4,190 while the best degree-4 certificate beats it by 80 (proven,
machine-verified). They bound the ensemble; they do not reach the anchor, for the
reason Face 1 gives.`

CONFIDENCE HIGH. Checked: `natal-cap-21-beyond-chebyshev.md`:31-51 and 97-101;
`natal-cap-27-t4-at13.js`:2, 255, 363; `research/history/NIGHT-LEDGER-2026-08-14-15.md`:127
(P(S=0) ≤ 1.898e−6 against Chebyshev 9.74e−4 = 513×).

### P-3. §7A Face 4 names Lemma V as "exactly one ingredient"; its home says Lemma V is not the operative assumption at the measured working point. This is qc-status A-1 landing in the paper, and it has NOT been fixed here

`paper/moire-primes.md`:627-633, as written:

> "One road remains visible. The Brüdern-Fouvry vector sieve consumes the product
> structure the current bound throws away, and its unconditional coupled form gives
> 2(1 + √e) = 5.297, worse than what we have, which explains its absence from this
> problem. **It is missing exactly one ingredient, which we name Lemma V**: signed
> cancellation of the bilinear interval sawtooth remainder, uniform in position, the
> two-dimensional analog of Iwaniec's 1980 linear-sieve error term."

HOME AND STATUS: `research/sift-limit-attack.md`, closing calibration:

> "the one route with a consumer depends on an estimate (Lemma V) **that is not even
> the operative assumption at the measured working point**, where s/u > 1 puts the
> ladder outside Lemma V's stated range and on an unproven maximal law instead"

and §4.5: "What is being assumed there is not Lemma V but a **Gaussian maximal law
for the sawtooth** … the maximal law is the whole cost, and the exponent only prices
the goods." Corroborated at `research/theta-ladder.md`:569-572 and `TODO.md`:60-66
("the maximal law is not half the price, it is the whole price").

CLASS: STATUS CONTRADICTION plus SCOPE. The word "exactly" makes it worse than the
glossary instance qc-status caught, because a paper claiming a route needs exactly
one named ingredient is inviting a reader to supply it, and supplying it would not
reach the regime the ladder sits in. Grepped the whole suite: **"maximal law",
"Gaussian maximal" and "theta-ladder" appear in no paper file at all**, so the
correction that four research documents carry has not reached publication anywhere.

REPLACEMENT SENTENCE (from "It is missing"):

`It is missing signed cancellation of the bilinear interval sawtooth remainder,
uniform in position, which we call Lemma V: the two-dimensional analog of Iwaniec's
1980 linear-sieve error term. One qualification is essential and we state it in
place. At the working point our own ladder measures, the component level exceeds
the window, s/u ≈ 1.2, which is outside the range s ≤ u that Lemma V is stated in.
So what the conditional rows of that ladder actually assume is not Lemma V but a
Gaussian maximal law for the sawtooth, and that maximal inequality, not Lemma V, is
the whole price of the route (`research/sift-limit-attack.md` §§3, 4.5;
`research/theta-ladder.md`).`

CONFIDENCE HIGH. Checked: `sift-limit-attack.md`:38-53, 230-262, 400-410;
`theta-ladder.md`:550, 569-572; `TODO.md`:60-66; grep for "maximal law" across
`paper/`: zero hits.

### P-4. §7A Face 4: "nothing in print blocks it" is stronger than the home's "no published bound exists", and the κ = 2 sifting limit is in print

`paper/moire-primes.md`:609-613: "Our published-grade bound is 4.267 (Paper II), the
first two-class bound at any exponent, so the open band is (2, 4.2665] and nothing in
print blocks it."

HOME: `research/sift-limit-attack.md` §5 supports a narrower statement: "We searched
for any published conditional upper bound on a two-class Jacobsthal-type function
below 4.2665: nothing exists at any exponent, conditional or not. **[ABSENT]**" and,
in the same paragraph, the reason the band is hard: "since even EH plus GRH are not
known to imply the twin prime conjecture, no standard conditional input reaches 2 by
any known argument." The repo's own position on β₂ is DP5, "4.2665 is a price tag,
not a wall", but the sifting limit for κ = 2 is a published theorem and it does block
every argument that uses only the sieve axioms (§4.5: "the conditional κ = 2
extremizer of §2 constrains axiom-level inputs"). "Nothing in print blocks it" reads
as "no obstruction is known", which is not what the corpus holds.

CLASS: SCOPE INFLATION, in a sentence that carries an ABSENT marker at home and none
in the paper.

REPLACEMENT SENTENCE:

`Our published-grade bound is 4.2665 (Paper II), the first two-class bound at any
exponent, so the open band is (2, 4.2665]. No published bound of any kind, conditional
or unconditional, sits inside that band, and we searched for one. What does sit inside
it is the κ = 2 sifting limit itself: β₂ = 4.26645 is a proven barrier for any argument
that uses the sieve axioms alone, so closing the band requires consuming structure the
axioms discard rather than importing better arithmetic inputs.`

Note also the rounding: the same sentence writes 4.267 and 4.2665 eleven words apart.
qc-status flagged the identical split in `README.md`:28 versus :39. Numbers axis, but
it is inside the sentence this finding replaces, so the replacement fixes it.

CONFIDENCE MEDIUM-HIGH on the sifting-limit half (the repo deliberately calls β₂ a
price tag, so this is a wording judgement rather than a factual error), HIGH on the
"no published bound" narrowing.

### P-5. §7A Face 2 quotes z-scores from two different ensembles as if they were one, and the home document states the caveat explicitly

`paper/moire-primes.md`:568-571: "Separately, the overlap deficit lives in
multiplicity m ≥ 3, where the anchored pair statistic reads z = −0.30 against the
X-channel's z = −2.71."

`paper/moire-primes.md`:540-541 (Face 1): "its deviation runs from z = +1.05 at x = 7
to z = −22,633 at x = 37."

HOME: `research/natal-cap-31-calm-vs-kill.md`:123-128 states the caveat in terms:

> "**Ensemble caveat:** this diagonal ensemble's mean differs from both the
> independent strike ensemble and the window ensemble (S̄ = 3614.9 vs 3245.5 @17);
> anchored z here (−2.49) **is not cap-07's window z (−4.50)**. P2 … tracks X poorly
> (corr 0.59 / 0.13 / −0.21; anchored P2 z = −0.30 vs X z = −2.71 **@17**)"

CLASS: DROPPED HYPOTHESIS, exactly the pattern the brief names. Face 1's z-ladder is
the window ensemble; Face 2's z = −0.30 and z = −2.71 are the diagonal ensemble,
where the same anchor at the same level x = 17 has z = −2.49 rather than −4.50. The
paper prints both scales in one section, thirty lines apart, with no marker. A reader
comparing them concludes the anchored deviation shrank between faces. The level
tag @17 is also dropped.

REPLACEMENT SENTENCE:

`Separately, the overlap deficit lives in multiplicity m ≥ 3: at x = 17, in the
diagonal strike ensemble, the anchored pair statistic reads z = −0.30 against the
X-channel's z = −2.71 (these z-scores are taken in the diagonal ensemble, whose mean
differs from the window ensemble of Face 1, where the same anchor at the same level
reads z = −4.50).`

CONFIDENCE HIGH. Checked: `natal-cap-31-calm-vs-kill.md`:60-72, 118-128;
`paper/anchored-note.md`:111-130.

### P-6. §7A Face 2's "97% of the anchored survivor fluctuation" and "corr(X, S) = 0.99" hold at x = 17 only; the paper attaches them to "the computed levels"

`paper/moire-primes.md`:549-551: "Reading the overlap credit as a fluctuating
quantity gives the X-channel, and 97% of the anchored survivor fluctuation lives
there, with corr(X, S) = 0.99 (measured, exact at the computed levels)."

HOME: `research/natal-cap-31-calm-vs-kill.md` measurement table line 66,
`corr(X,S) = 0.48 / 0.91 / 0.99` at @11 / @13 / @17, and reading 1 line 80-82,
"Var(D) is 2.7% of Var(S) **at @17**".

CLASS: SCOPE INFLATION. The calibration marker survives, the number survives, the
level it belongs to does not, and the phrase "at the computed levels" actively
asserts the wrong thing: at x = 11 the correlation is 0.48, so less than a quarter
of the fluctuation is explained there. The trend is the interesting fact and the
paper loses it by flattening the ladder to its last rung.

REPLACEMENT SENTENCE:

`Reading the overlap credit as a fluctuating quantity gives the X-channel, and the
survivor fluctuation migrates into it as the level rises: corr(X, S) = 0.48, 0.91,
0.99 at x = 11, 13, 17, and by x = 17 the strike channel carries only 2.7% of
Var(S), so 97% of the fluctuation is overlap credit (measured, exact by full
enumeration of all 2,310 / 30,030 / 510,510 rotations).`

CONFIDENCE HIGH. Checked: `natal-cap-31-calm-vs-kill.md`:60-82.

### P-7. §7A Face 2 says "the anchor is in deficit" and then prints a surplus as its first value

`paper/moire-primes.md`:559-561: "The anchor is in deficit and the deficit is
drifting, X(0)/X̄ = 1.45, 0.991, 0.948 at the three exactly computed levels."

HOME: `research/natal-cap-31-calm-vs-kill.md`:118, "Measured X(0)/X̄ = 1.45 / 0.991
/ 0.948, **descending**". The home says descending, not in deficit. 1.45 is a 45%
surplus.

CLASS: SCOPE / internal contradiction inside one sentence. Small, but it is in a
sentence a referee can falsify by reading the sentence.

REPLACEMENT SENTENCE:

`The anchor's overlap credit is drifting downward through the crossing: X(0)/X̄ =
1.45, 0.991, 0.948 at the three exactly computed levels, so the anchor moves from
surplus at x = 11 into deficit by x = 17.`

CONFIDENCE HIGH.

### P-8. §7A Face 2 attributes the "fusion" mechanism without noting that Holt's programme already owns the word

`paper/moire-primes.md`:566-568: "The calm is real, its mechanism is now proven (the
anchor's two strike classes are mirror-adjacent and fuse into a single cyclic
window)", and `:623` lists "the fusion identity" among our exact structure.

`research/PRIOR-ART.md`:107 correspondence table: `| kills, closures | **fusions** |
2603.25915 §1 |`. Holt's "fusion" is the closing of adjacent gaps under the fold.
Ours is the gluing of two strike classes into one cyclic window at the anchor. These
are different objects wearing the same word, in the same subject, and §7A does not
distinguish them. §9 carries the correspondence table, so the paper does disclose
Holt's term elsewhere, which makes the collision worse rather than better: a reader
who has read §9 will read "fuse" in §7A as Holt's fusion.

CLASS: ATTRIBUTION, collision rather than misappropriation. Nothing here is claimed
that is his; the risk is that a referee reads the paper as reusing his term for a
different thing without saying so.

REPLACEMENT SENTENCE:

`The calm is real, its mechanism is now proven (the anchor's two strike classes are
mirror-adjacent and glue into a single cyclic window; we call this the fused window,
which is a different phenomenon from Holt's fusions of adjacent gaps under the fold,
§9), and it is irrelevant to survival.`

CONFIDENCE MEDIUM-HIGH on the collision, MEDIUM on the wording, since renaming our
object rather than annotating it may be the better fix and that is a naming call.

### P-9. §7A Face 3 calls K* a "measured law" where its home says in terms that six points are not a law, and drops the pool-dependence hypothesis

`paper/moire-primes.md`:591-593: "**The measured law is** K* = 0, 0, 2, 10, 27, 69 at
x = 11 through 29, which is sub-linear in the scour and tracks the quarter-power band
π(W^{1/4}) − π(x) times a factor drifting from 1.00 to 1.35."

HOME: `paper/staircase-note.md`:363-377, "**The K\* law, measured (added
2026-08-15).**… the ratio K\*/φ reads 1.00, 1.25, 1.29, 1.35 at @17 through @29 …
Whether K*/φ converges, plausibly near 1.4, is open, **and six points are not a
law**." And honesty item 7 at :501-505: "**K\* depends on the moduli pool** (first 12
scour primes at @11 to @19, first 192 at @23 and @29, ascending in both cases). A
different pool or ordering could shift K*; the certified floors are valid for the
stated pool."

CLASS: SCOPE INFLATION plus DROPPED HYPOTHESIS, and both defects run in the
dishonest direction. The home names the object a law in its heading and then withdraws
the word in its last line; the paper keeps the heading's word and drops the
withdrawal. Separately, K* is not a function of x alone: it is a function of x and of
the moduli pool, and the paper states it as a function of x.

REPLACEMENT SENTENCE:

`The measured escalation is K* = 0, 0, 2, 10, 27, 69 at x = 11 through 29, for the
moduli pool we used (the first 12 scour primes at x = 11 through 19, the first 192 at
23 and 29, ascending in both cases; a different pool or ordering could shift K*,
while any pool yields valid caps). It is sub-linear in the scour, and it tracks the
quarter-power band π(W^{1/4}) − π(x) times a factor reading 1.00, 1.25, 1.29, 1.35 at
x = 17 through 29. Whether that factor converges, plausibly near 1.4, is open: six
points are not a law.`

CONFIDENCE HIGH. Checked: `paper/staircase-note.md`:339-377 and 469-505;
`research/natal-cap-24-boundK-curve.js`:270-332.

### P-10. §7A Face 3 prints the certified floor without the truth beside it, which its home does print

`paper/moire-primes.md`:586-589: "at x = 29 the certificate proves at least 31,327
twin pairs exist in the tile (proven, machine-asserted at every rung)."

HOME: `paper/staircase-note.md` Theorem 8 table prints the certified floor and the
true survivor count side by side in adjacent columns, 31,327 against 12,307,838, and
honesty item 2 at :475-477 opens "**The floors are weak against the truth** (34 vs
45, 110 vs 307, 82 vs 3 099, 1 877 vs 38 380, 4 841 vs 597 475, 31 327 vs 12 307
838). The point is the proof form, not the strength."

CLASS: HONESTY, in the direction that matters. Nothing stated is false. What is
missing is the ratio, 0.25% at x = 29, which the home volunteers and the flagship
does not. A referee who later finds the true column will read the omission as
salesmanship, and it is not: the paper's own argument is about the proof form, so
printing the ratio costs the paper nothing and buys it the credibility the staircase
note already has.

REPLACEMENT SENTENCE:

`at x = 29 the certificate proves at least 31,327 twin pairs exist in the tile
(proven, machine-asserted at every rung), which is 0.25% of the 12,307,838 that are
actually there. The floors are weak against the truth at every level, and the point
is the proof form rather than the strength: no strike is located and no slot is
primality-tested.`

CONFIDENCE HIGH.

### P-11. Door 5 cites two theorems whose "distinct moduli" hypothesis our own system violates, and omits the one theorem that does cover it

`paper/moire-primes.md`:468-471, as written:

> "Hough (2015) and Balister–Bollobás–Morris–Sahasrabudhe–Tiba (2022) proved no
> covering system of ℤ has all moduli large: the infinite version of the question is
> settled in the family's favor."

HOME: `research/covering-dive.md` §3.1 and §3.3 are unambiguous.

> "**Hough** … any covering system **with distinct moduli** has minimum modulus ≤
> 10¹⁶. **[PROVEN]**"
> "**BBMST** … Theorem 8.1: 'Let A be a finite collection of arithmetic progressions
> **with distinct moduli** d₁,…,d_k ⩾ 616000. Then A does not cover the integers.'"

and then, in §3.3, the theorem that actually applies:

> "**Klein–Koukoulopoulos–Lemieux** … Theorem 3: 'Let A be a covering system of
> multiplicity s [each modulus appears ≤ s times]. Then … its smallest modulus is ⩽
> exp(c·log²(s+1)/log log(s+2)).' … This covers **s = 2 explicitly** (bounded, but no
> numeric constant is given for s = 2). **[PROVEN]**
> Translation to our setting **[INFERRED]**: two residue classes mod p for each prime
> p in (x, y] is a system of **multiplicity 2** with prime moduli. KKL Theorem 3 says
> such a system **cannot cover ℤ** once x exceeds an absolute constant. It says
> *nothing* about covering a finite interval."

CLASS: DROPPED HYPOTHESIS plus ATTRIBUTION, and it is the most dangerous instance in
§7 after P-1, because the dropped hypothesis is exactly the one our object violates.
The classes {0, −2 mod q} use each modulus twice. So the two theorems the paper cites
do not apply to the family's own covering question, and the theorem that does apply is
KKL 2024, which appears nowhere in the paper suite (grepped `paper/`: zero hits for
Klein, Koukoulopoulos, multiplicity). The status word is also inflated: our own home
marks the translation INFERRED and notes that no numeric constant is known at s = 2.

REPLACEMENT SENTENCE:

`Hough (2015) and Balister-Bollobas-Morris-Sahasrabudhe-Tiba (2022) proved that a
covering system of ℤ with distinct moduli cannot have all moduli large. Our classes
{0, −2 mod q} use each modulus twice, so those theorems do not apply directly, and
the result that does is Klein-Koukoulopoulos-Lemieux (2024), whose Theorem 3 bounds
the smallest modulus of any covering system of multiplicity s and covers s = 2
explicitly, though with no numeric constant at s = 2. Read that way the infinite
version of the question is settled in the family's favor, and we mark the translation
to our system as inferred rather than proven.`

CONFIDENCE HIGH. Checked: `research/covering-dive.md`:69-90 (§§3.1, 3.3, 3.4);
grep across `paper/` for KKL and for "distinct moduli": zero hits.

### P-12. Door 5's shortfall factor p/ln p is the one-class number, and the corpus holds the measured two-class law

`paper/moire-primes.md`:471-476: "The finite version is the Erdős–Rankin machinery:
the best known interval coverage with one class per prime ≤ y
(Ford–Green–Konyagin–Maynard–Tao 2018) is ~ y·ln y·(small factors), while a zone
requires p². **The adversary's best known weapons fall short of the zone by a factor
of about p/ln p; a failure of the Twin Prime Conjecture requires a covering
phenomenon of a fundamentally new kind**."

HOME: `research/covering-dive.md` §4.1 confirms the one-class figure as PROVEN. §4.2
then supplies the two-class data the sentence needs and does not use: Ziller-Morack's
exact optima to n = 21, with "the measured growth of h₂ over all 21 exact terms is
**c·x·ln²x with c ≈ 1.90**" (MEASURED). Against a zone of width p², a two-class
adversary reaching about p·ln²p falls short by about p/ln²p, not p/ln p.

CLASS: SCOPE, and it runs in the direction that flatters us. The paper prices the
adversary with a one-class construction while the paper's whole subject is the
two-class problem, and the two-class adversary is measurably closer to the zone than
the sentence implies. §7 does say "with one class per prime ≤ y", so the sentence is
not false; the bolded conclusion drawn from it is over-strong. The bolded second
clause is supported by an ABSENT marker at home ("We found no covering-systems result
that bounds the length of a finite interval coverable by ≤ 2 classes per prime … at
any polynomial scale"), which is a searched-and-not-found, not a theorem.

REPLACEMENT SENTENCE:

`The finite version is the Erdős-Rankin machinery. With one class per prime ≤ y the
best known interval coverage (Ford-Green-Konyagin-Maynard-Tao 2018) is about
y·ln y·(small factors), and with two classes per prime the only construction data in
existence is Ziller and Morack's exact optima to n = 21, whose measured growth over
all 21 terms is about 1.90·x·ln²x. A zone requires p². So the adversary's best known
weapons fall short of the zone by about p/ln²p in the two-class case and about p/ln p
in the one-class case, and no covering-systems result in print bounds the length of a
finite interval coverable by two classes per prime at any polynomial scale: we
searched for one and did not find it. A failure of the Twin Prime Conjecture requires
a covering phenomenon that no published method reaches.`

CONFIDENCE HIGH on the two-class law and the ABSENT marker, MEDIUM on the exact
p/ln²p arithmetic, which follows from the measured h₂ law rather than from a proven
bound and should be checked by the numbers axis.

### P-13. The §7 preamble claims five independent routes, each rigorous until its last step; Doors 1 and 4 are one classical object and Door 2 does not fail at its last step

`paper/moire-primes.md`:420-423: "What this project adds is a *surveyed perimeter*:
five independent routes, each rigorous until its last step, each meeting the same
wall at a different door, each with the toll measured."

Two problems, both traceable.

(a) INDEPENDENCE. Door 1 is Legendre inclusion-exclusion with a 3ⁿ error budget, and
the paper's own Door 1 sentence says "Brun's truncation of exactly this formula proves
twins sparse". Door 4 is the union bound, and `research/removal-ledger.js`'s addendum
says "**HISTORICAL NAME: this attack is the first line of Brun (1919) — the union
bound; Brun's sieve is exactly its overlap-corrected refinement** (alternating
Bonferroni truncations)". So Doors 1 and 4 are the same classical object at two
truncation depths, which the paper itself states twice without drawing the
consequence for the word "independent".

(b) "RIGOROUS UNTIL ITS LAST STEP". False for Door 2 as now understood: per P-1, the
corrected computation says the per-prime union bound over the Fourier certificate is
"structurally dead from here on" at x = 11, and from x = 13 up the gross strike total
alone exceeds the census, so even a zero-deviation certificate proves nothing. That
route fails several steps before its last one.

CLASS: SCOPE INFLATION in the framing sentence of the section, which is the sentence
a referee uses to decide what the section claims.

REPLACEMENT SENTENCE:

`What this project adds is a surveyed perimeter: five routes to the same wall, each
one carried as far as it goes, each meeting the wall at a different door, and each
with the toll measured. The five are not independent of each other. Door 1 and Door 4
are the same classical object at two truncation depths, since the union bound of Door
4 is the first line of Brun (1919) and Door 1's budget is what Brun's truncation
tames. Nor do all five fail at the last step: Doors 1, 3 and 5 run to their final
inequality, while Door 2 fails structurally at x = 11 and Door 4 reverses on the
numbers before any limit is taken. Naming where each one actually stops is the point
of the survey.`

CONFIDENCE HIGH on (a) and (b) as facts, MEDIUM on the replacement wording, since how
much of this belongs in the preamble versus in the individual doors is a structural
call (see Section 4).

### P-14. Door 3's "exactly 2.0×" and Door 1's "at every level": two small unqualified generalisations

- `paper/moire-primes.md`:490-492: "Chen-flavored territory (factors > p^0.5) holds
  **exactly** 2.0× the twins". HOME `research/attack-09-chen-theta.js` reading 2:
  "Chen-flavored territory (theta ~ 0.5, r+2 rough) holds **almost exactly** 2.0x the
  twins at every level". The computed ratios are 1.955 at p = 1009 and 2.020 at
  p = 3001, over three levels (p = 499, 1009, 3001). FIX: replace `holds exactly 2.0×
  the twins` with `holds almost exactly 2.0× the twins at each of the three computed
  levels, 1.96 at p = 1009 and 2.02 at p = 3001`.
- `paper/moire-primes.md`:428-429: "Observed cancellation: within ~2 of the main term
  **at every level**." HOME `research/03-legendre-error-budget.js` reading: "exact
  hugs the main term to within ~2 at every level", where the levels computed are
  pₙ = 7 through 41, ten of them. The home's "every level" means every computed level,
  and the corpus convention elsewhere (`paper/variance-note.md`:187,
  `research/README.md`:63) is to write "computed". FIX: `Observed cancellation: within
  about 2 of the main term at each of the ten computed levels, pₙ = 7 through 41.`

CONFIDENCE HIGH on both. Low publication risk individually; listed because they are
the same defect class as the findings above and cost one word each.

### P-15. Door 3's certificate ladder rate is stated per degree; the home states it per two degrees

`paper/moire-primes.md`:442-444: "each added degree multiplies the conspiracy's price
by ~5μ without reaching zero".

HOME: `research/attack-07-certificate-ceiling.js` reading 2: "THE CEILING PATTERN:
each **+2 moment degrees** buys roughly a factor ~Var/mu^2 ~ 1/(5mu) of improvement",
and `research/ATTACKS.md`:17 repeats it: "each +2 degrees buys ~1/(5μ)".

CLASS: DROPPED HYPOTHESIS, a factor of two in the rate. Only even degrees exist in
this ladder, since the certificates are polynomial squares, so "each added degree" is
not merely imprecise, it describes rungs that do not exist.

FIX: replace `each added degree multiplies the conspiracy's price by ~5μ` with `each
two further moment degrees multiply the conspiracy's price by about 5μ`.

CONFIDENCE HIGH.

## Section 2: the rest of the suite

### S-1. B-4 has NOT landed. `paper/moire-primes.md`:39 still claims a matching lower bound, and there is a THIRD instance qc-status did not find

`paper/moire-primes.md`:38-40 (abstract, closing sentence): "A companion note (Paper
II) proves the first upper bound for G₂ at any exponent; **the matching lower bound**
is free, and is likewise the first recorded."

Status: unchanged since qc-status wrote finding B-4. Both were diagnosis-only passes,
so this is expected; recording it as verified-still-present rather than as new.

**Correction to qc-status and to my brief.** qc-status B-4 states: "Grepped
'matching' across the corpus: exactly two occurrences, both listed." There are three.
The third is `paper/PAPERS.md`:30: "The note now also carries **the matching lower
bound**, G₂(x#) ≥ g(x#) pointwise and hence ≫ x·log x·logloglog x/loglog x by
Rankin/Pintz/FGKMT". That is the suite architecture document, which is where every
future abstract will be written from, so leaving it is how the phrase comes back after
the paper is fixed.

HOME remains `paper/beta2-note.md`:234, "**The point of this note is not sharpness.**
The interval of provable exponents was entirely empty before, in both directions", and
`paper/moire-primes.md`:686-691 states the two-sided position correctly in §8 without
the word "matching". So the flagship contradicts itself between its abstract and its
§8, in the same way `README.md` contradicts itself between :28 and :39.

FIX for `paper/moire-primes.md`:39, adopting qc-status's replacement: replace `the
matching lower bound is free, and is likewise the first recorded` with `a lower bound
is free and is likewise the first recorded, though it is nowhere near matching: the
band (2, 4.2665] between them is the problem this paper is about`.

FIX for `paper/PAPERS.md`:30: replace `The note now also carries the matching lower
bound,` with `The note now also carries a lower bound, far from matching,`.

CONFIDENCE HIGH. Checked: grep -rn "matching" across `*.md`, three hits outside
`history/`: `README.md`:28, `paper/moire-primes.md`:39, `paper/PAPERS.md`:30.

### S-2. The abstract drops the hypothesis p ≥ 17 from the one theorem it advertises as new

`paper/moire-primes.md`:29-31 (abstract): "and one new unconditional theorem: **every
interval (p, p²) contains two primes at distance at most 2(1+o(1))·ln p.**"

HOME, in the same paper at `:399-400`: "**Theorem (pigeonhole small-gap).** *For every
prime **p ≥ 17**, the interval (p, p²) contains two primes q < q′ with
q′ − q ≤ (2 + o(1)) · ln p.*"

CLASS: DROPPED HYPOTHESIS, and it is in the abstract, on the sentence that carries the
paper's one novelty claim. The statement is false as written at p = 2, 3, 5, 7, 11, 13
in the sense that the proof does not cover them, and the proof's Rosser-Schoenfeld
input is exactly what needs p ≥ 17.

A second, separate problem with the same statement, in both places: an inequality with
o(1) in it cannot be asserted "for every prime p ≥ 17", because o(1) is a statement
about a limit and the quantifier makes it a statement about each p. A referee will
stop on this. The proof already supplies the clean form.

REPLACEMENT SENTENCE (abstract):

`and one new unconditional theorem: for every prime p ≥ 17 the interval (p, p²)
contains two primes at distance at most (2 + o(1))·ln p, with the constant certified
at 2.00 by p = 1009.`

REPLACEMENT SENTENCE (`:399-400`, the theorem itself):

`**Theorem (pigeonhole small-gap).** *Let p ≥ 17 be prime and let
K = π(p²) − π(p). Then the interval (p, p²) contains two primes q < q′ with
q′ − q ≤ (p² − p)/(K − 1), and by Rosser-Schoenfeld this bound is (2 + o(1))·ln p as
p → ∞.*`

CONFIDENCE HIGH on the dropped hypothesis, HIGH on the quantifier problem, MEDIUM on
the exact restatement, which the numbers axis should confirm reproduces the certified
2.00 at p = 1009.

### S-3. §8 carries the pre-refutation reading of the anchored calm, and it contradicts §7A Face 2 forty lines later in the same paper

`paper/moire-primes.md`:746-749: "and the real tile is consistently *quieter* than its
ensemble on four independent statistics ('the anchored calm',
`research/NATAL-CAP-CAMPAIGN.md`), **an unexplained structural bias in the helpful
direction**."

`paper/moire-primes.md`:563-568 (§7A Face 2) says the opposite: "The anchored tile is
unusually quiet in its strike statistics … and we expected quiet to mean populated. It
does not: corr(VR, S) ≈ 0. The calm is real, **its mechanism is now proven** … and it
is **irrelevant to survival**."

HOME: `research/natal-cap-31-calm-vs-kill.md` reading 1 ("**Calm does not concentrate
S** … The intuition's middle step, low variance ⇒ near mean, is false here") and its
calibration line 111 ("What it refutes: calm ⇒ concentration, and minimizer
loudness"), plus `natal-cap-19-calm-lemma.md` Lemmas 1 to 3 for the proven mechanism.

CLASS: STATUS CONTRADICTION, internal to the flagship. §8 asserts two things the
campaign settled in the other direction: that the calm is unexplained (its mechanism
is proven: the anchor's two strike classes are mirror-adjacent and glue into one cyclic
window), and that it is a bias in the helpful direction (it is uncorrelated with
survival, so it is not helpful at all). This is the worst instance outside §§7 and 7A,
because a referee who reads §7A and then §8 sees the paper arguing with itself about
its own headline measurement.

REPLACEMENT SENTENCE:

`and the real tile is consistently quieter than its ensemble on four independent
statistics (the anchored calm, `research/NATAL-CAP-CAMPAIGN.md`). We expected that to
help and it does not: the calm's mechanism is now proven, the anchor's two strike
classes being mirror-adjacent and gluing into a single cyclic window, and the calm is
uncorrelated with survival, corr(VR, S) ≈ 0 at all three exactly enumerated levels
(§7A, Face 2).`

CONFIDENCE HIGH.

### S-4. `paper/anchored-note.md` carries the stale five-level G30_agg count, which settles qc-status's open question 1

`paper/anchored-note.md`:392-397: "With the kernel in hand the bound is certified in
exact BigInt **at @11 through @23**, at 0.2132, 0.1113, 0.1011, 0.1259, 0.0945, the
deepest level also the lowest … **So the leg is a theorem for x ≤ 23.**"

qc-status's Unresolved item 1 asked whether `paper/anchored-note.md` quotes a level
count for G30_agg, and whether it therefore needs the same fix as
`natal-cap-30-skeleton-bound.md`. ANSWER: yes, it quotes one, it is five levels, and
per qc-status F-1 the script `research/natal-cap-36-skeleton-door.js` has certified
six, adding @29 at 0.1176 with margin 0.3824.

CLASS: the inverted-scope defect of F-1, now confirmed in a paper draft. The paper
understates a certified result and understates the reach of its own theorem by one
level.

REPLACEMENT SENTENCE:

`With the kernel in hand the bound is certified in exact BigInt at @11 through @29, at
0.2132, 0.1113, 0.1011, 0.1259, 0.0945, 0.1176, and the sequence is flat within its
own spread after @11 rather than trending down, which retires the earlier reading that
the deepest level is also the lowest. So the leg is a theorem for x ≤ 29.`

Note that this replacement also removes a claim the six-level data contradicts: at
five levels the deepest level (@23, 0.0945) was the lowest, and at six it is not
(@29 reads 0.1176). The current sentence's "the deepest level also the lowest, which
softens the earlier worry that the offset does not trend downward" is therefore false
on the current data, and the worry it softens is back.

CONFIDENCE HIGH on the level count and on the reversal, per qc-status F-1's reading of
the script's embedded output. Custody question inherited from qc-status: whether the
`--at29` row may be written in on the strength of the embedded output alone is Chris's
call, and this finding does not change that.

### S-5. `paper/staircase-note.md` honesty item 1 says four finite computations; its own Theorem 8 table has six rows

`paper/staircase-note.md`:470-472: "**Finite results only.** Theorems 3, 6 hold for all
x; the certified floors (Theorem 8) are **four** finite computations."

The Theorem 8 table at :346-353 has six rows, @11 through @29, and honesty item 2 at
:475-477 lists six floor-versus-truth pairs. The two deeper rows were added
2026-08-15 per :363 and :514-516.

CLASS: stale count in an honesty section, which is the worst place to carry one because
the honesty section is what a referee reads to calibrate everything else. It
understates the work.

FIX: replace `the certified floors (Theorem 8) are four finite computations` with `the
certified floors (Theorem 8) are six finite computations`.

CONFIDENCE HIGH.

### S-6. The abstract repeats "five independent doors"

`paper/moire-primes.md`:32-33: "survey the parity wall through five independent doors
with measured numbers at each". Same defect as P-13, in the abstract. FIX: replace
`five independent doors` with `five doors`. The independence claim is the part that
fails; the survey claim is fine. CONFIDENCE HIGH.

### S-7. The abstract's novelty list contains two objects the prior-art audit did not clear, and §8 clears one of them correctly

`paper/moire-primes.md`:35-38: "and introduce the objects the lens found that the
literature appears not to contain: the twin Jacobsthal function G₂, **the difference
map d ↦ G_d**, the exact two-class window variance, and the twin grain of the tile."

`research/PRIOR-ART.md` "Bottom line" names **three** candidate novelties that survived
the audit: G₂ with its values and exponent, the exact two-class variance formula, and
the synthesis. The difference map d ↦ G_d and the twin grain are not among them, and
the verdict table has no row for either.

For the twin grain the claim is still defensible, because the novelty-boundary
paragraph at `PRIOR-ART.md`:192-200 establishes that Holt "never studies the spacing
between consecutive occurrences of the gap g = 2", which is exactly the grain. For
d ↦ G_d it is weaker: `PRIOR-ART.md`:24 records that Ziller-Morack's paired Jacobsthal
h₂ is the maximum over ALL even differences, so it is a published function of the same
family, and §8 of this very paper says so at :677-679 ("The closest published object is
Ziller-Morack's paired Jacobsthal function h₂"). The abstract makes an unqualified
not-in-the-literature claim about an object whose closest relative the paper itself
cites forty lines later.

CLASS: ATTRIBUTION, over-claim by omission, in the abstract.

REPLACEMENT SENTENCE:

`and introduce the objects the lens found that our audit did not find in the
literature: the twin Jacobsthal function G₂, the exact two-class window variance, and
the twin grain of the tile, together with the difference map d ↦ G_d, whose closest
published relative is Ziller and Morack's paired Jacobsthal function h₂.`

CONFIDENCE MEDIUM-HIGH. Checked `PRIOR-ART.md`:24, 32-47, 185-200 against
`paper/moire-primes.md`:35-38 and 677-679.

### S-8. §7A cites no prior art at all, against PAPERS.md's own publication gate

`paper/PAPERS.md`:64-68 states the gate: "The framework has a predecessor that owns the
fold recursion, the closure theorem, the transfer operator and the interval of survival,
and **no paper may go out until each of them is attributed where it is used.** Paper I
§9 carries the correspondence; the spine sections cite it inline."

§§1-4 honour this well (Holt cited inline at :79, :137-138, :158, :324-325; Buchstab at
:299; Pritchard at :66; Schemmel at :154). §7 cites Selberg, Tao, Brun, Hough, BBMST
and FGKMT. **§7A cites nothing outside this repository.** Two places where that matters:

- Face 1 declares "the anchored bias, where the whole conjecture now lives" and builds
  its argument on the split between the anchored window and the rotation ensemble.
  `research/PRIOR-ART.md`:308-318 and :360-364 establish that the ensemble half has a
  published theorem against it: Maier (1985) proves primes in intervals of length
  (log x)^λ, λ > 1, are not uniformly distributed, our window width x² is (ln W)², and
  "the ensemble is provably irregular at our window width". Face 1 is the place that
  reading is used.
- Face 3's ladder depth K* is, per `paper/staircase-note.md`:451, "Brun's depth" in a
  graded sieve ("op. cit. 1920, with K* playing the role of Brun's depth"). Face 3
  names no predecessor.

CLASS: ATTRIBUTION, citation-at-point-of-use rather than misappropriation. §9 covers
both, so nothing is claimed that is not ours; the gate PAPERS.md sets is stricter than
that, and §7A does not meet it.

SUGGESTED ADDITIONS (two sentences, no content moved):
- Face 1, after "Full development in `paper/anchored-note.md`.": `The ensemble half of
  this split is not merely hard to transfer from, it is provably irregular: Maier
  (1985) shows that primes in intervals of length (log x)^λ with λ > 1 are not
  uniformly distributed, and our window width is (ln W)², so every heuristic of the
  form "the zone behaves like a typical window" is known to fail for the analogous
  prime statement at the analogous scale (§9).`
- Face 3, after "so that the pigeonhole forces survivors.": `The depth parameter plays
  the role of Brun's depth in a graded sieve (Brun 1920), and the quantity the caps
  bound is Brun-sieve territory.`

CONFIDENCE HIGH on the absence of citations in §7A, MEDIUM-HIGH on Maier being the
right one to add there.

## Section 3: places the papers are less honest than the notes

Ranked. This section is about the direction of error, not about trimming: every item
here is a place where a research note volunteers a limitation and the paper does not.

1. **Door 2 (P-1).** The strongest instance in the suite. The cited file says its own
   certified column is not a certificate; the corrected file says the route is
   structurally dead at x = 11. The paper reports an 18% near-miss. Nothing in the
   paper tells the reader either fact.
2. **The K* law (P-9).** The home withdraws the word "law" in its closing line, "six
   points are not a law", and states that K* depends on the moduli pool. The paper
   keeps the word and drops the pool.
3. **The certified floors (P-10).** `paper/staircase-note.md` prints floor and truth in
   adjacent columns and opens its honesty item with "The floors are weak against the
   truth". §7A prints the floor.
4. **§8's anchored calm (S-3).** The paper's own §7A refutes what §8 asserts. The
   refutation is the honest reading and it is present in the paper; the stale
   pre-refutation reading is also present, which is worse than either alone.
5. **Face 4 omits the theta ladder's central negative result.** `research/theta-ladder.md`
   and `research/sift-limit-attack.md`:38-53 measure the exact full-period suprema of
   the window exponent at 1.9524, 1.9477, 2.0018, 2.0476 for z = 19, 23, 29, 31, with a
   4·10⁹-position prefix supremum above 2.05 through z = 71, and conclude: "the
   requirement fits inside the zone budget only at the two smallest points available and
   misses by at least half again from z = 43 on … **Priced honestly, it is an exponent
   programme and not a route to TPC.**" Face 4 reports the pilot's positive certificate
   and not the supremum ladder that prices it. The paper is not false here, since it
   says the payoff is 2.649 rather than below 2, but it omits the measurement that
   makes the route's ceiling concrete. SUGGESTED ADDITION after the pilot sentence:
   `The same ladder prices the route's ceiling: the exact full-period supremum of the
   window exponent at which the certificate is positive at every position reads 1.9524,
   1.9477, 2.0018, 2.0476 at z = 19, 23, 29, 31, so the all-positions requirement
   crosses 2 by z = 29 and does not come back. This is an exponent programme, not a
   route to the conjecture.` CONFIDENCE HIGH.
6. **Face 1 drops the level scope that §8 keeps on the same number.** `:743-744` writes
   "from +1.05 at x = 7 to −22,633 at x = 37 **across the nine levels where the ensemble
   variance is certified**"; `:540-541` writes the same ladder with no such clause. §8's
   version is the correct one and the fix is to copy it into Face 1. CONFIDENCE HIGH.
7. **Face 1 drops the quantified parity block.** `paper/anchored-note.md`:344-346 prices
   it: "two-class sieves carry a parity floor of 2 **against the needed constant 1.28 at
   @17**". §7A Face 1 says only "a positive-proportion lower bound of exactly the kind
   the parity floor 2 blocks". The measured gap between 2 and 1.28 is the content.
   CONFIDENCE HIGH, low risk.

Recorded positively, because the brief asked: `paper/moire-primes.md`:592-599 (the two
K* reversals, both left standing) and :306-314 (the refuted "divergent enrichment"
reading, retained in place) are the best passages of this kind in the suite and nothing
in this report touches them. §4's parenthetical at :289-292, which volunteers that the
statistical law does not begin until p = 17 and that 11's band is enriched against the
law, is the same practice applied to a number, and it is the model the findings above
ask §§7 and 7A to match.

## Section 4: CHRIS-DECIDES structural items

Kept separate from the correctness findings. None of these is a defect.

1. **Does Door 2 survive as a door?** P-1 removes its headline number and reverses its
   verdict. The honest version is shorter and more negative: a route whose certificates
   are real per prime and dead in aggregate. It could stay as a door with the corrected
   text, or be folded into Door 1 (both are inclusion-exclusion bookkeeping) with the
   Fourier material kept as the per-prime regularity tool `natal-cap-02` reading 5 says
   it is. Sequencing and prominence are yours.
2. **Where does the Lemma V material live?** `paper/PAPERS.md`:141-148 already recommends
   that the Lemma V map belongs in Paper II's "what would move it" section rather than
   in a paper of its own. Face 4 currently carries a compressed version of it. If Paper
   II takes it, Face 4 shrinks to the exponent, the band, and the positivity finding,
   and the correction in P-3 has to land in whichever of the two carries it.
3. **Should §7A become the paper's spine?** `paper/PAPERS.md`:104-113 already proposes
   this and notes the Holt sweep moved most of §§2-4 to attributed rediscovery. This
   report's findings are concentrated in §§7 and 7A, which is consistent with that
   proposal: the most original section is also the least audited one.
4. **Rename or annotate our "fusion" (P-8)?** Annotating keeps the vocabulary and adds a
   clause. Renaming (the fused window becomes, say, the glued window) removes the
   collision permanently at the cost of changing a term used across
   `natal-cap-19`, `-23`, `-26` and the glossary. This is a vocabulary decision.
5. **Does the abstract carry the Hardy-Littlewood equivalence?** `paper/PAPERS.md`:130-133
   recommends it for the anchored note if that note is published. §7A Face 1 already
   carries it in the flagship. Whether the flagship's abstract should too is a
   positioning call: it is the single sentence that most changes how a referee reads the
   paper.
6. **Does the suite cite Klein-Koukoulopoulos-Lemieux (P-11)?** Citing it is correct and
   it is also an admission that the two theorems currently cited do not apply. Since KKL
   gives no numeric constant at s = 2, the honest version of Door 5 is weaker than the
   current one. Correctness says cite it; how much weight Door 5 then carries is yours.

## Section 5: checked and found sound

Recorded so coverage is known and nothing here is re-checked.

**§7, sound:**
- Door 1's numbers, all of them, against `research/03-legendre-error-budget.js`'s
  embedded output: 2·3ⁿ term count, ±1,062,882 at pₙ = 41, signal 50, budget/main
  20,577×, and the "within ~2" cancellation reading. Only the "at every level" scope
  needs the word "computed" (P-14).
- Door 3's 1.6 × 10⁻⁴ at p = 19 and the 57× beat, against `research/ATTACKS.md`:17 and
  `research/attack-07-certificate-ceiling.js`. Kurtosis 2.9 confirmed at
  `ATTACKS.md`:13. Only the per-degree rate is wrong (P-15). Note this is the window
  ensemble and is a different object from Face 2's rotation ensemble; the paper does not
  conflate them.
- Door 4 in full, against `research/removal-ledger.js`: 34 removers for T₁₃ (q = 17 to
  173), 1,699 kill events against a census of 1,485, the 1.14× ratio, the 2 ln x growth,
  670 of 1,699 wasted on overlap, ~37,000 removers and Σ2/q ≈ 2.66× the family at T₃₁,
  survivors = census·∏(1−2/q), the identification of the route as Brun (1919), the
  thin-band variant's reversal into the equidistribution problem, and the folder-17
  provenance. This is the best-sourced door in the section.
- The §7 closing paragraph: exact CRT independence of Grain and Scour, the ~10⁷³ joint
  tile and the ~10⁻⁶⁹ sliver, and "misaligned on average is a theorem, misaligned in
  every window is the conjecture", all verbatim from
  `research/two-moire-argument.md`:20-35 and corroborated at `GLOSSARY.md`:113-114.
- The 8% parity-step figure at :490, against `research/attack-09-chen-theta.js` reading
  1. The word "loses" is loose in both places (N(0.9)/N(1) = 1.08, so the sieve-reachable
  set is 8% larger than the truth), but the paper matches its home and the number is
  right.

**§7A, sound:**
- Face 1's β table, all ten values through x = 41, and W = 3.04 × 10¹⁴, against
  `paper/anchored-note.md`:118-130.
- Face 1's conditional theorem and Proposition 2, word-diffed against
  `paper/anchored-note.md` §§7-8. No hypothesis is missing in either direction: "if
  liminf β > 0" is exactly Assumption A, and the weak form is Proposition 2 verbatim in
  substance. The calibration "proven in part, measured in part" on Proposition 1 matches
  the home's own split of part (i) exact and part (ii) assuming two measured trends.
- S = 256,725,962,834 at x = 41 against the needed 1 (`anchored-note.md`:331), the
  factor 81 at x = 19, and the ln²W growth of the gap.
- The sharp form β → e^{2γ}/4 = 0.793055 and its algebraic equivalence to
  Hardy-Littlewood on the 11/17 comb, against `paper/anchored-note.md`:341-346. The
  paper correctly presents the limit as conjectured and the equivalence as algebraic.
- Face 2's rank 2 of 510,510, corr(VR, S) ≈ 0, the X-floor restatement of Assumption A,
  and the 39,782,707,965 quadruples, against `natal-cap-31-calm-vs-kill.md` and
  `natal-cap-27-t4-at13.js`.
- Face 3's 31,327 floor at x = 29, the history-blindness definition word for word
  against `paper/staircase-note.md`:328-331, the two reversals and their resolution, and
  the "monotonically at every depth beyond 3%" figure against
  `research/natal-cap-24-boundK-curve.js`:329-332.
- Face 4's θ = 1.2417 break-even, 2(1+√e) = 5.297 coupled value, 1 + √e ≈ 2.649
  decoupled value, the 9,699,690-position exhaustive pilot, and the cancellation exponent
  0.23 to 0.33 against 1.0, all against `research/sift-limit-attack.md`:230-310. The
  "five discard points" and the positivity-not-distribution finding are correctly marked
  as an analysis of the method rather than a theorem.

**Rest of the suite, sound:**
- `paper/variance-note.md` is the best-calibrated document in the suite. Its abstract
  states its own calibration split ("Everything in §§2-5 and Corollary 3 is proven or
  exactly computed; §6 and the fits of §7 are explicitly empirical"), §4 attaches
  "for every computed level" to the occupancy bound and then volunteers that the result
  "says nothing about the one anchored window that the twin prime conjecture needs", and
  §6 is headed "(empirical)". The 99.87% figure quoted in the flagship is the p_n = 97
  row (empty fraction ≤ 1.26 × 10⁻³) and carries its level in both places. No finding.
- `paper/beta2-note.md`: the theorem statement is headed "conditional on the cited
  sieve", the sieve input is verified line by line with page numbers, β₂ is given to 20
  decimals with its source, the ε and C(ε) are both explicit, and §5 states the
  four-order slack against the data and refuses the sharpness claim. Its exponent
  estimate carries the control that debiases it (1.801 raw, 1.54 ± 0.09 corrected, with
  the one-class control at 1.282 against a true exponent of 1). No finding. This is the
  document the others should be measured against.
- `paper/moire-primes.md` §§1-4 attribution: Holt inline at :79, :137-138, :158,
  :324-325; Petersen et al. and Davies and Ventrella at :57-63; Pritchard at :66;
  Schemmel and A059861 at :154 and :347; Buchstab at :299; Táfula at :311; Maier and
  Granville-Soundararajan at :787-790. §9's correspondence table matches
  `PRIOR-ART.md`'s row for row. The provenance paragraph at :87-96 says outright that
  most of §§2-4 turned out to be Holt's. Nothing in §§1-4 claims prior art as ours.
- The Zone Equivalence rendering at `:377-384` is correct and needs no change: it is
  called a Proposition, and the paper says "Logically lightweight, we present it as a
  framing device", which is exactly what `PRIOR-ART.md`:51 asks for. qc-status C-3 found
  the same. The three defective sites are all outside `paper/moire-primes.md`, except
  `paper/PAPERS.md`:18, which lists it among "the spine theorems".
- §3's genealogy: the no-orphans claim is scoped to four levels and 1,638 slots, the
  Seam Lemma has a proof and is verified at six levels, the three-houses one-third claim
  is exact and carries its T₃₁ instance, and the novelty claim is hedged as "as far as
  the audit could find". Sound.
- §4's Unification Law: qc-status B-1 already called `:294-305` the best form in the
  corpus and I confirm it. It carries "verified to ~1% at every grid point tested",
  "the derivation is Hardy-Littlewood-conditional", Buchstab named at point of use, and
  two of our own refuted readings retained in place. §4's stratum parenthetical at
  :289-292 volunteers that the law does not begin until p = 17.
- §8 apart from S-3: the G₂ ladder, the exponent estimate with its control, the
  Ziller-Morack comparison with the 348-against-570 instance, the two-sided bound, the
  open band, the refuted "universal constant ≈ 0.2" reading retained, the seam
  enrichment corrected by its own data ("a prediction of ours the data corrected"), and
  the three questions moved to results. Well calibrated throughout.

## Unresolved / needs a decision

1. **Is the X-limitation theorem proven for all x ≥ 13, or extrapolated from two
   enumerated levels?** `research/natal-cap-31-calm-vs-kill.md` Theorem 2 derives the
   bound "From L1-L2 and **the enumerated ensemble maximum of VR**", and the enumerated
   maxima are 2.78 / 2.35 / 2.14 at @11 / @13 / @17 only. For the conclusion to hold at
   every x ≥ 13 something must bound VRmax at every level, and I did not find that
   statement. The home writes "From @13 on the strike channel is provably too small",
   `paper/moire-primes.md`:553 writes "proven from x = 13 upward", and
   `paper/anchored-note.md`:416 writes "from @13 on", so all three agree with each other
   and qc-status B-3 recorded the paper as correct on this. My reading is that the
   proof-as-written covers @13 and @17 and the "upward" is an extrapolation, which would
   make this a scope defect in the HOME as well as the paper. I did not open
   `natal-cap-31-calm-vs-kill.js`. QUESTION: is there a level-uniform bound on VRmax? If
   not, all three sites should read "proven at x = 13 and x = 17, where the ensemble
   maximum of VR is enumerated". CONFIDENCE that there is a question here: HIGH.
   CONFIDENCE in the answer: none, which is why it is in this section.
2. **Door 5's two-class shortfall arithmetic (P-12).** The p/ln²p figure follows from
   the measured h₂ law (c ≈ 1.90, `research/covering-dive.md` §4.2 and
   `research/two-class-lower-bounds.md` §6), which is MEASURED over 21 exact terms rather
   than proven. The numbers axis should confirm the exponent arithmetic before the
   replacement sentence is used, and someone should decide whether a measured
   construction law belongs in a sentence about what the adversary can provably do.
3. **Citing Klein-Koukoulopoulos-Lemieux (P-11).** Correct to cite, but their Theorem 3
   gives no numeric constant at s = 2, so the honest Door 5 is weaker than the current
   one. This is the one finding in the report where fixing the error costs the paper a
   claim rather than repairing one, and it should go past an expert before Door 5 is
   rewritten.
4. **The @29 custody question, inherited from qc-status Unresolved 1 and now sharper.**
   S-4 confirms `paper/anchored-note.md` carries the five-level count, so the decision
   qc-status asked for now has a paper draft attached to it: may the @29 row be written
   into two markdown files and one paper on the strength of the script's embedded output,
   or does `--at29` get re-run first (18.5 min)? My reading of the house rule is the same
   as qc-status's, that the embedded output is the record, but S-4 adds a reason to
   settle it: the six-level data **reverses** a reading the paper currently prints ("the
   deepest level also the lowest"), so leaving it unsettled leaves a false sentence in
   the anchored note.
5. **Corrections to the brief and to qc-status, for the record.**
   - qc-status B-4 states that "matching" has exactly two occurrences in the corpus.
     There are three; the third is `paper/PAPERS.md`:30 (S-1). The brief inherited the
     count of two.
   - The brief says finding B-4's paper instance "sits in the opening positioning
     paragraph". It sits in the closing sentence of the abstract, which is the same
     exposure but a different sentence; the opening positioning paragraph is :14-24 and
     is clean.
   - The brief asked me to check whether the two known dropped-hypothesis cases "landed".
     Neither the G2-STATE nor the loose-end case is in the paper suite, so there was
     nothing to verify there; what I found instead is that the pattern recurs four more
     times in the papers, at P-2 (moment order), P-5 (which ensemble), P-11 (distinct
     moduli), S-2 (p ≥ 17), plus the pool dependence at P-9 and the degree step at P-15.
     Six instances of one defect class in two sections is the report's main structural
     finding, and it supports the brief's instruction to word-diff rather than read:
     every one of the six survived every check that was not a diff, exactly as predicted.
   - The brief describes §7A as "four faces with coordinates" and it is. But §7's five
     doors and §7A's four faces are not disjoint: Door 4's overlap credit is Face 2's
     X-channel under a different name, and Door 3's moment certificates are Face 2's
     closing paragraph in a different ensemble. Whether that is duplication or
     deliberate re-entry from a different angle is a structural question (Section 4),
     not a correctness one, but a reader of §7A does not currently learn that Face 2 is
     Door 4 revisited.
6. **Coverage gap in this report, stated plainly.** §§7 and 7A were audited claim by
   claim and every mathematical statement in them was traced to a home. Outside those two
   sections I audited every abstract, every theorem statement I could find by heading
   grep, the positioning paragraphs, and the numbers that qc-status or the homes flagged
   as caveated. NOT audited: `paper/moire-primes.md` §2 proofs line by line (the spine
   theorems, which qc-status covered on the status axis), §5's census tables against
   their scripts, `paper/staircase-note.md` §§2-6 (Theorems 3 to 7 and their proofs),
   `paper/variance-note.md` §§2-3 and §7's algebra, `paper/anchored-note.md` §§1-6 and
   §11, and every reference-list entry in every paper against `PRIOR-ART.md`'s
   "should be cited" list at :376-390, where qc-status already noted that none of the
   four named references (Erdős 1962, Clement 1949, Fan-Pomerance 2024, Weingartner 2026)
   appears in any paper file. **Correction to qc-status on this point, and it is wrong on
   three of the four.** Erdős 1962 is cited in §9 at `paper/moire-primes.md`:831 and
   carried in the References block at :905. Fan-Pomerance 2024 and Weingartner
   arXiv:2604.22058 are both cited at `paper/staircase-note.md`:442-448, where the note
   names exactly what substituting Fan-Pomerance for the Rosser-Schoenfeld closed form
   would buy. Only **Clement 1949** is absent from every paper file, and the Weingartner
   comparison that `PRIOR-ART.md`:386-390 calls "available and has not been made" is
   still not made, though the reference is now in place to make it with.
   A third pass should start with `paper/staircase-note.md` §§2-6, because it is the
   document PAPERS.md ranks as most likely to be published first and its theorem
   statements are the only ones in the suite I did not diff against a research home.
