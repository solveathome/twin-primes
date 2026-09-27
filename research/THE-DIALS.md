# The dials: every variable this programme can actually push

<!-- ledger
id: Q-the-dials
status: ANSWERED
todo: none
question: Which variables can this programme actually push, and which is Chris missing?
verdict: The square frontier constrains certification from roughness alone, not every arithmetic method. The current campaign uses long intervals, a classical Chen benchmark and an OPEN signed estimate; uniform maximum-gap control is a sufficient secondary target. Finite slopes do not determine an asymptotic exponent.
-->

*(2026-08-17, from Chris's question: which variables can be pushed to get over
the line, and which is he missing. This note is a map, not a result. Calibration
marked: PROVEN, MEASURED, OPEN.)*

**Scope.** This document owns the triage question — which variable a new idea
proposes to move, and whether that variable is attached to anything. It does not
own the state of any object (`G2-STATE.md`), the target and its logical status
(`ZONE-POSTULATE.md`), or the work queue (`../TODO.md`). Where it quotes a
number, the owning document is named. The 2026-09-05 realignment prioritizes
`chen-fold-benchmark.md` and `chen-signed-target.md`. Restrictions below that
come from certifying primality by roughness alone do not constrain every
argument with additional prime-distribution or signed arithmetic input.

## 0. Chris's two, adjudicated first

**Dial 1, window width. The zone's redundancy is a feature, not a defect.**
`research/GLOSSARY.md` records the pane's motivation as removing the
zone's redundancy: "consecutive instances overlap almost entirely, so a handful
of twins satisfies vast stretches of it." Chris's point is that for a formal
proof this redundancy is a feature, not a defect. A statement of the form

> for every x, the interval (x, g(x)) contains a twin prime

implies TPC for **any** finite g, however fast growing, because the twin found
is above x and x runs to infinity. Repeats across overlapping windows cost
nothing. Overlap only matters if the argument is a *count* summed over windows,
and no argument here is.

So the redundancy of the zone is a reason to PREFER it. This agrees with A7 from
the other direction: the pane, which removed the redundancy, came out strictly
harder, "4.2665 proven, 1 needed" against the zone's 2. The pane is closed twice
over now.

**But the width is not a free dial either, and the reason is sharp.** Widening
the window while keeping the sift level at p does not give twin primes. A p-rough
number below p^k can carry up to k−1 prime factors, so past the frontier the
survivor is an almost-prime, not a prime. **Certification pins the right endpoint
at the square of the sift level.** In sieve currency, with u = ln(window top) /
ln(sift level):

> **u = 2 is the square frontier for primality certified by roughness alone.**

This does not forbid working at shallower depth and retaining arithmetic
weights that distinguish factor counts. The long-interval Chen benchmark does
exactly that for prime-or-semiprime partners. The current dimension-two DHR
application gives positivity only above its achieved threshold 4.266450284…;
this is not a proved universal optimum.

**Dial 2, maximum-gap growth.** The achieved bound is
G₂(x#) ≪_ε x^(4.266450284…+ε). A fixed exponent below 2 suffices for twins;
at exponent 2 the constant and next-prime frontier matter. This remains a
sufficient secondary target, not the only possible research direction.

MEASURED, calibrated against the one-class control: the finite fitted slope is
**1.50 central on G₂'s own 22 trusted terms (h₂'s corrected figure is 1.57),
1.3 to 1.8 practical bracket, 1 as a hard floor**
(`research/exponent-control.md` §5). These are local slopes, not an estimate with asymptotic coverage. A positive
logarithmic factor can bias a finite power fit upward; the controls demonstrate
that bias over their measured ranges.

**Quote the control line whenever a ladder exponent is reported here.**
Fifty-eight terms of a quantity whose true exponent is 1 + o(1) return
1.282 ± 0.008 with no drift. A clean power-law fit with white residuals is worth
nothing on data this short: on the control it beats the family containing the
truth by 47 AIC units.

Current margins G₂(x#) against x′²:

| x | G₂(x#) | x′² | margin |
|---|---|---|---|
| 23 | 204 | 841 | 4.12 |
| 29 | 258 | 961 | 3.72 |
| 31 | 348 | 1,369 | 3.93 |
| 37 | 528 | 1,681 | 3.18 |

A factor of three or four in hand today. The margin does not visibly drift: on
nineteen terms of Ziller-Morack's h₂ (the fit's dataset, p in [5, 73], of the
21 published — `exponent-control.md` §6), which dominates G₂, the margin
against x′² is flat at 2.2 with slope +0.018 ± 0.045, its minimum of 1.880
sitting at x = 17 and never revisited.

## 1. The dials Chris did not list

**Dial 3, sifting parameter u. This is the master variable and every other choice
is just a way of moving it.** The ledger:

| target | what it needs | what is proven | verdict |
|---|---|---|---|
| Pane (n², (n+2)²) | u → 1 | u > 4.26645 | strictly harder than TPC (A7) |
| Zone (p, p′²) | u = 2 | u > 4.26645 | = TPC |
| almost-prime pairs | u ≈ 4.27 | proven | DONE, gives ≤ 4 factors each |
| Chen's theorem | weighted | proven | DONE, p and p+2 with ≤ 2 factors |

Every reformulation in THE-LENS §4 lands somewhere on this line. Reading a new
idea off as a value of u is the fastest triage available, and it costs minutes.

**Dial 4, "every" against "infinitely often". Priced slack: all four channels
closed.** (2026-08-19: the truth's oscillation is 0.3187 nats over the exact
ladder and falling; alignment freedom 2–11%; power-law instruments gain
nothing by PNT; the sieve depth carries no i.o. freedom because the max gap is
non-decreasing under inclusion of the sieve set; and the instrument-slack
channel is surveyed — across 23 instruments the loosest that bounds G₂
directly is `maxsum_{L+1}` at 0.3747 nats against a need of 6.700, no
sharp-level signature survives a permutation test at any of 19 instruments
(Šidák p = 0.8865), and the two signatures with a mechanism select finite
sets. Records: `history/staging/attack-0c0e-level-selection.md`,
`verify-monotone-depth.md`, `ioslack-survey.md`.)
`research/ZONE-POSTULATE.md` §2 proves the weak form (infinitely many zones
occupied) is EQUIVALENT to TPC in both directions, while the strong form (every
zone) is strictly stronger. Every G₂-based route proves the strong form, because
a gap bound is uniform by construction. **An argument allowed to fail on a sparse
set of p would be strictly weaker and still sufficient.** Two mechanisms were
looked for and both fail. An almost-all-positions bound cannot be steered to the
origin, because certification pins the anchor at 0 and there is exactly one
usable window per tile. Large prime gaps widen the window by 2(p′−p)/p → 0, when
a factor of three is needed. The slack is real and there is currently no route
that spends it.

**Dial 5, how prime the members must be.** This is where all the unconditional
wins are. Relaxing "both prime" to "one prime, one with at most two prime
factors" is Chen, proven since 1973. Relaxing to "at most four factors each" is
what u > β₂ hands over directly. The reason this works is that it moves u off 2,
which Dial 1 says is the only way anything ever moves.

**Dial 6, which d, and how many.** Fix d = 2 and parity blocks you. Ask instead
for *some* d drawn from an admissible set of size k and the obstruction lifts:
that is Zhang, Maynard, Tao, Polymath, and it is **the only dial anyone has ever
successfully pushed past the wall.** Bounded gaps are proven; k = 2, which is
d = 2 exactly, is still open. Worth knowing precisely where the wall was breached
and what the breach cost, namely the identity of d.

`research/attack-06b-difference-map.js` already measured our side of this: d = 2
is mid-pack, no bounded invariant predicts G_d, and the headroom survives for all
d ≤ 210. So the repo's objects do not distinguish d = 2 either, which is
consistent with the obstruction being about d being FIXED rather than about d
being 2.

**Dial 7, level of distribution. Inert where it counts, live where it does
not.** Bombieri-Vinogradov gives θ = 1/2 and Elliott-Halberstam would give
θ = 1. This is the standard dial in the literature and
`research/bv-import-survey.md` returned a split verdict, not a flat one.

*Inert on the target.* Assumption A in its weak form is parity-blocked at every
input including GEH, and the Buchstab transfer at bounded u is the κ = 2
sifting-limit problem rather than an equidistribution problem, so neither moves.
Those two legs are where "our statements contain no primes, only roughness" is
true, and they are the two the survey names when it says not to spend effort.

*Live on the machinery.* The prime-comb equidistribution ingredient IS a prime
count, so it is a Siegel-Walfisz theorem at fixed modulus and fixed depth, and a
Bombieri-Vinogradov theorem on the full wheel in the tail regime at depth
q_K = T^{o(1)}. Those retire named unproven ingredients of the certificate, and
one further item is provable now and elementarily. They are theorems waiting to
be written up rather than research; the queue is `TODO.md` item 11.

So the dial is worth nothing against the wall and worth three write-ups against
the heuristics, and a triage that reads it as flatly inert kills the write-ups.

## 2. The one that looks like a dial and is not

**Margin.** The zone heuristically holds about 2C₂p²/ln²p twin pairs and we need
one. The expected surplus is astronomical at every level and it has been
astronomical since p = 7. It buys nothing, because parity is a structural
obstruction rather than a quantitative one: an argument that establishes only a
large expected count, with no mechanism against parity, yields a lower bound of
exactly zero, not a small one.

This is the trap the repo has already walked into twice, in the pane's capacity
calculation and in A5's Markov bound, and both times the diagnosis was the same.
`research/a3-05-bound-L.md` states it sharply: no polynomial moment of any fixed
order can give the decay, only exponential moments will, and that is
quasi-independence, which is the thing being assumed.

## 3. Summary table

| # | dial | status | worth pushing? |
|---|---|---|---|
| 1 | window width | the square frontier applies to certification by roughness alone | long intervals remain available with explicitly imported arithmetic input |
| 2 | max gap growth | open, an exponent fight: 4.2665 proven, 2 needed, 1.50 measured (raw 1.78 corrected by the control's +0.28 bias over the 22 trusted terms to x = 79, OEIS A144311; bracket 1.3-1.8, floor 1); the target also implies an explicit constant-1 Jacobsthal bound (§6). **2026-08-18: The `u_sup` route was raised and CLOSED the same day — it rises at every step over z = 13..43 and its bounded asymptote is 5.46, above β₂. What moved is the loss MAP, not the gap: DP1 carries 71% of the 3.27; its one known mechanism was found on 2026-08-18 and CLOSED on 2026-08-19, provably dead for asymptotics with the required degree diverging. `sift-limit-attack.md` §7d, §7e** | secondary sufficient target; current REC route closed |
| 3 | sifting parameter u | the master variable | use as triage, not as a target |
| 4 | every vs infinitely often | infinitude needs only unbounded successful scales | retain this quantifier in the new signed estimate |
| 5 | almost-primes | classical Chen benchmark completed on long intervals | use as a benchmark before specifying the extra input for twins |
| 6 | which d / how many | the only breach ever made | not ours to redo |
| 7 | level of distribution | insufficient in the old certificate; explicitly imported in the Chen benchmark | match each theorem to its sequence and interval before using it |
| — | margin | not a dial | no |

## 4. The honest reading

The programme can study the uniform gap target or the anchored count target,
but neither has an established route to infinitude here. The current sequence
is the classical long-interval Chen benchmark followed by an exact signed
estimate sufficient for twins. The benchmark is complete using named theorem
inputs; the signed estimate remains open.

Finite measurements of slack in particular certificates do not exhaust all
infinitely-often arguments. Likewise the square frontier limits roughness-only
certification, not every use of longer intervals with arithmetic weights. The
specific failed bounds remain closed; a new argument must identify what it
estimates differently and how its error reaches the required scale.

## 5. Exceptions, and why the zone is the right window after all

*(2026-08-17, Chris: the narrow windows have genuine failures, the
(n², (n+1)²) family failing twelve times and last at 122, while the zone has no
known failure at all. Measured in `research/window-exceptions.js`, one sieve to
1e8. Custody: 440,312 twin pairs below 1e8, matching the published count, and
family A reproduces OEIS A091592 term for term without being told it.)*

| family | width | exceptions | last | min twin count | min count / HL expectation |
|---|---|---|---|---|---|
| A. (n², (n+1)²) | 2n+1 | **12** | 122 | 0 | **0.471** in the top band |
| B. (n², (n+2)²), the pane | 4n+4 | **1** | 26 | 0 | **0.575** in the top band |
| C. (p, p′²), the zone | ≈ p² | **0** | – | 2, at p = 2 | **1.13, 1.18, 1.13** by band |

**Chris's objection is right, and the measurement says something stronger than
he claimed.** It is not only that the zone has no failures. **The zone has never
once fallen below its own expectation.** Its worst case across all 1,228 windows
tested sits at 1.13 times the Hardy-Littlewood count, and since that form is
known to underestimate by about 12% at this height (measured independently in
FOLD-PROFILE §9, S/HL = 1.1238), the zone's minimum is essentially exactly its
mean. The count barely fluctuates in relative terms. The narrow families, by
contrast, have minima at 0.47 and 0.58 of an already-low estimate, which are
genuine tail events.

The mechanism is the obvious one and worth stating anyway: the zone carries
thousands to millions of twins, 8,278 at worst in the 1e6 to 1e8 band, so its
relative fluctuation is O(1/√count) and vanishes. The narrow windows carry tens,
so their relative fluctuation is O(1) and the minimum is drawn from the tail.
The exceptions are not anomalies, they are what an O(1) count does.

**Two consequences, one methodological and one cautionary.**

*Methodological, and it is the real reason to prefer the zone.* A finite
exception set is logically harmless: "for all n > 122" still implies TPC. But the
only tool this programme has is a **uniform** gap bound, G₂(x#) < x′², and a
uniform bound cannot prove a statement that has exceptions. So a window with
failures is not merely inelegant, it is **incompatible with the method**. The
zone is the widest window whose statement has the same shape as the tool.

*Cautionary.* The zone's safety is entirely margin, and §2 of this note already
recorded that margin is not a dial. Eight thousand twins where one is needed is
exactly the surplus that has bought nothing since p = 7. So the right reading of
the table is: the zone is the correct **target**, and its comfort is no evidence
whatever that it is **tractable**.


## 6. What a sufficient gap bound actually costs (2026-08-17)

*(Chris: if we can produce a formal max-gap bound smaller than the zone, are we
home free? Yes. This section prices it against what is proven.)*

**The reduction, restated (PROVEN, ZONE-POSTULATE §3).** The tile carries a twin
slot at its edge, since p# ± 1 are both coprime to p#, so reading forward from the
origin the first twin slot lies within G₂ of it, and the slot at r = 1 is never
live because 3 | p#. Hence

> **G₂(p#) < p′² − 2  ⇒  Zone Postulate at p  ⇒  TPC.**

Any of these suffice, and all are weaker than nailing a constant:
G₂(p#) = O((log p#)^α) for some α < 2; or ≤ C(log p#)² with C < 1; or simply
o(p²). And only infinitely many p are needed, so an asymptotic bound with an
unbounded exceptional set of density zero is still enough.

**The exact distance, and it is an exponent.**

| object | classes per prime | sieve dimension κ | sieve limit β_κ | proven Jacobsthal exponent |
|---|---|---|---|---|
| ordinary Jacobsthal g(p#) | 1 | 1 | **2** | **2**, Iwaniec 1978 |
| twin Jacobsthal G₂(p#) | 2 | 2 | **4.2665** | **4.2665**, `paper/beta2-note.md` |
| what the Zone Postulate needs | 2 | 2 | — | **2** |

*(The β_κ column is not one kind of number: 2 at κ = 1 is proven two-sided
(Selberg's examples), while 4.2665 at κ = 2 is the DHR sieve's value, an upper
bound on the sifting limit only; the best proven floor at κ = 2 is 2, with
1.8196 the best resting on a published inequality (Brady 2017). Added
2026-09-04, `research/history/staging/redteam-0904-sifting-limit.md`.)*

**How the sieve gives a Jacobsthal bound.** A lower-bound sieve with
threshold β_κ and a suitable remainder estimate supplies a survivor in every
interval of length z^(β_κ+ε), for fixed ε>0. This yields a Jacobsthal upper
bound at that exponent. It does not identify the optimal Jacobsthal exponent
with the sieve's threshold. Iwaniec supplies exponent 2 for the one-class
object; the current DHR application supplies 4.266450284… for the two-class
object. A fixed exponent below 2 would prove twins, but neither that upper
bound nor an impossibility theorem for other arguments follows from the
threshold comparison.

**And there is a second price, on the one-class object itself.** Twin slots are a
subset of holes, so G₂(x#) ≥ g(x#) pointwise (PROVEN, elementary; VERIFIED at all
22 shared terms of the trusted ladders, ratios 1.00 to 8.55,
`research/external-ladders-01.js`). A sufficient gap bound G₂(x#) < x′² − 2
therefore also proves g(x#) < x′² − 2, an explicit constant-1 form of the
Jacobsthal bound at primorials. Iwaniec 1978 gives g(x#) ≪ x² only with an
unspecified constant. The little-o target in Erdős problem #687 is different:
the constant comparison gives limsup g(x#)/x² ≤ 1, whereas a fixed
subquadratic power saving would give g(x#)=o(x²). These targets must be
distinguished
(`research/two-class-lower-bounds.md` §9). **And the floor does not collapse to
an explicit elementary bound.** Checked against the sources: Kanold gives
2^{√k}, Stevens k^{Θ(log k)} and Paseman k^{O(log log k)}, all far weaker than
exponent 2; the only exponent-2 statements are Vaughan 1977 for general n and
Iwaniec 1971 Thm 2 / 1978 at primorials, both with **inexplicit** constants, and
the constant is the whole question (`research/ZONE-POSTULATE.md` §6,
`research/G2-STATE.md` §9).

**What is encouraging, kept in proportion.** The band (2, 4.2665] is a proof gap
and not a truth gap. Calibrated against the one-class control the two-class
exponent reads 1.50 on the 22 trusted terms (1.57 is the h₂ control's own figure;
`research/G2-STATE.md` §6), bracket 1.3 to 1.8, and Ziller and Morack's adversarial
h₂, which dominates G₂ pointwise, measures 1.567 in the same frame over 21 terms.
So the object almost certainly sits below 2.

And `research/sift-limit-attack.md` records that nothing published blocks the
band, since no κ = 2 extremal example is known (Halberstam 2003 p. 117); the
published lower bounds on β₂, found 2026-09-04 in Selberg's reciprocal
convention, all sit at or below 2 (Brady 2017: 1.8196; β(2) ≥ 2 from the
one-sided dimension axiom), so they bound the band's lower endpoint and nothing
inside it. That search is tabled in `SEARCH-CONVENTIONS.md` §1 and §3 and β₂'s
own literature in §4. Nobody has moved β₂ in
forty years, but nobody has shown it cannot move for this problem either.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
