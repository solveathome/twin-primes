# The anchored calm — the status table

<!-- ledger
id: Q-anchored-calm
status: PARTIAL
todo: none
question: What is proven about the anchored calm, and what is not?
verdict: The calm names a phenomenon and never a claim: the Mirror-Sibling, Fusion, Mirror-Phase Doubling and Minus-Half results are PROVEN at all x and all scour q, the phenomenon itself is MEASURED (the anchored rotation at rank 2 of 510,510 at @17), and two things stay unproven, of which the Skeleton Equidistribution Conjecture is one.
-->

**This document holds status and nothing else.** No proof, no identity and no
derivation lives here; every one of them lives in the leaf note named in the last
column. The reason this file exists is that the same status table was written four
times, in four leaf notes, at four different states of knowledge, so no summary
could copy it correctly. There is one table now, and it is here.

**"The anchored calm" names a phenomenon, never a claim.** It may not appear in
any list headed Proven, Theorems, or the proven spine. The phenomenon is the
measured fact that the anchored rotation sits in the extreme low tail of the
ensemble's strike-variance statistics — rank 2 of 510,510 at @17 on equal-weight
Z2, rank 14 of 9,699,690 at @19. What decomposes into claims is the explanation of
that fact, and the parts of the explanation carry four different calibrations.

**There is no "Fused-Window Calm Lemma".** The name is retired: it spanned a
proven mechanism, a six-level certificate, a refuted uniform form and an
unexplained measurement, so every summary that copied it either reproduced the
whole grading or said something false. `README.md` said "Proven". The nine objects
below already had their own proofs; the parent name added only the conjunction.

## Status

| sub-claim | status | scope | home |
|---|---|---|---|
| **Mirror-Sibling Identity** | PROVEN | all x, all scour q | [natal-cap-19-calm-lemma.md](natal-cap-19-calm-lemma.md) §Lemma 1 |
| **Fusion Identity** | PROVEN | all x, all scour q | [natal-cap-19-calm-lemma.md](natal-cap-19-calm-lemma.md) §Lemma 2 |
| **Mirror-Phase Doubling Lemma** | PROVEN | all x, all scour q | [natal-cap-19-calm-lemma.md](natal-cap-19-calm-lemma.md) §Lemma 3 |
| **Minus-Half Theorem** | PROVEN, exact, no error term | every level, every q coprime to 30 | [natal-cap-26-minus-half.md](natal-cap-26-minus-half.md) §Theorem 2, Props 3–4 |
| **Skeleton Collapse Theorem** | PROVEN | all x, all q | [natal-cap-30-skeleton-bound.md](natal-cap-30-skeleton-bound.md) §Theorem A |
| **Aggregate 30-Skeleton Bound (@11..@29)** | CERTIFIED, exact integer inequality | six computed levels only | [natal-cap-30-skeleton-bound.md](natal-cap-30-skeleton-bound.md) §Theorem B, [natal-cap-36-skeleton-door.md](natal-cap-36-skeleton-door.md) §Proposition E |
| **Skeleton Equidistribution Conjecture** | OPEN as a statement; the named door is CLOSED as a route (2026-08-30, `research/OUTCOMES.md`): over every scour prime it removes at most 0.0102 from a G30_agg whose open part is 0.094 to 0.126, and on the open side (moduli exceeding the window) the phase never wraps, so what remains is the inequality itself, suspected TPC-strength, unresolved | all x | [natal-cap-36-skeleton-door.md](natal-cap-36-skeleton-door.md) §Proposition C |
| **Uniform-in-q Anticorrelation** | **REFUTED** | six counterexample primes are known, of 10,201 scour primes over six levels | [natal-cap-23-covadj-proof.md](natal-cap-23-covadj-proof.md) §"Uniform-in-q Anticorrelation is refuted" |
| **Anchored Typicality Measurement** | MEASURED, no proof mechanism in sight | @13, @17, @19 | [natal-cap-19-calm-lemma.md](natal-cap-19-calm-lemma.md) §"What Lemmas 1–3 do and do not give" |

Read at a glance: the mechanism is proven at all x and all q, the size of the
mechanism's effect is certified at six computed levels, its uniform-in-q form is
false, its all-x form is open with its named door closed as a route (2026-08-30), and
the step that joins the mechanism to the anchor is a measurement with no proof
route.

**The two numbers the table stands on.** The Aggregate 30-Skeleton Bound is
G30_agg < 1/2, certified in exact BigInt by `natal-cap-30-skeleton-bound.js`
(reading 297; the same exact pass is re-read by `natal-cap-36-skeleton-door.js`) at 0.2132, 0.1113, 0.1011, 0.1259,
0.0945, 0.1176 for @11, @13, @17, @19, @23, @29, with margins 0.287 to 0.406 and
0.3824 at @29. The Anchored Typicality Measurement is Σdev(0,q)²/ΣV_fused = 0.935
at @13 and 0.939 at @17, with mean position percentiles 47.9% and 47.8%.

## What is not proven, said plainly

Two things, and they are of different kinds. The **Skeleton Equidistribution
Conjecture** is the all-x form of a statement certified at every level anyone has
computed; its door is named, analytic, and closed as a route, since the branches the
door governs carry a small aggregate share of the skeleton's mass **of either
sign** — 9.2%, −0.9%, 0.2% and 0.5% at @13, @17, @19 and @23 over every scour
prime (the −10.8% and +5.5% this paragraph carried until 2026-08-30 were
subsamples of 40 of 435 and 29 of 1,739 primes;
`history/staging/decide-0830-skeleton-door.md` SEC B) — so proving it
as named would move the bound by at most 0.0102 and close nothing; the door is
a closed route in `OUTCOMES.md` and the theorem and the six-level certificate
stand.

*(BAND CORRECTED 2026-08-18. This read "between 9% and 11%", which is a range
fitted to the two largest magnitudes and stated as if it covered the series:
only @13 lies inside it, @19 lies inside only in absolute value and with the
opposite sign, and @17 and @23 lie outside on either reading. The four values
are printed with their signs at `research/natal-cap-36-skeleton-door.md`:190-194
and in `research/wave7-logs/cap36-skeleton-door.log`:29/33/37/41, and the home's
own summary is the safe form: "the branches for which the door is a
fixed-modulus question carry essentially none of the skeleton. Their aggregate
is small and of either sign". This file exists because the same status table was
written four times and no summary could copy it correctly, so a band no other
copy carries is exactly the failure it was created to prevent.)* The **Anchored
Typicality Measurement** is the harder one: it says one arithmetic position is
typical of its own ensemble, which is the shape of statement that measure
arguments cannot finish, and its home says in terms that it has no proof mechanism
in sight. It is the calm's last wall.

Neither of them is a gap in a proof of anything. The calm is not a route to the
Twin Prime Conjecture and must not be read as one: `natal-cap-31-calm-vs-kill.md`
refutes the intervening step, since calm does not concentrate survivors
(corr(VR, S) ≈ 0). Calm is about strikes; survival is about the X-channel.

## The children, and what each owns

| home | sub-claims it owns |
|---|---|
| [natal-cap-19-calm-lemma.md](natal-cap-19-calm-lemma.md) | Mirror-Sibling Identity, Fusion Identity, Mirror-Phase Doubling Lemma, Anchored Typicality Measurement |
| [natal-cap-23-covadj-proof.md](natal-cap-23-covadj-proof.md) | the exact arithmetic of Cov_adj (Props 1–5), and the refutation of Uniform-in-q Anticorrelation |
| [natal-cap-26-minus-half.md](natal-cap-26-minus-half.md) | Minus-Half Theorem, and the reduction of the open leg to G30_agg < 1/2 |
| [natal-cap-30-skeleton-bound.md](natal-cap-30-skeleton-bound.md) | Skeleton Collapse Theorem, Aggregate 30-Skeleton Bound, the exception criterion |
| [natal-cap-36-skeleton-door.md](natal-cap-36-skeleton-door.md) | Skeleton Equidistribution Conjecture, the @29 certificate, and why the door is not the blocker |

Related, and not part of the calm: [natal-cap-31-calm-vs-kill.md](natal-cap-31-calm-vs-kill.md)
prices what the calm buys against annihilation, and the answer is the fence around
the strike channel rather than non-annihilation. The vocabulary is in
[GLOSSARY.md](GLOSSARY.md) under "Fused window", "The anchored calm", "The
skeleton" and "The X-channel".
