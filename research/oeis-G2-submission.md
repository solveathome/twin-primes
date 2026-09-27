# OEIS submission draft: the twin Jacobsthal function G₂

<!-- ledger
id: Q-oeis-G2-submission
status: CLOSED
todo: none
question: Should the twin Jacobsthal function G2 be submitted to OEIS as a new sequence?
verdict: RETIRED: G2(p_n#) = A144311(n) + 1. The 22 exact terms and Wang's 2024 lower bound at n=23 are prior work; the independently checked 83# certificate does not extend the exact sequence. Retain source exposition and validation, not a new-sequence proposal.
-->

> **DO NOT SUBMIT as a new sequence: duplicate of OEIS A144311.**

Status: RETIRED — duplicate of A144311; the 83# certificate also reproduces Wang (2024), with maximality still open.

**Assessment updated 27 September 2026 by Codex (AI assistant), under
[Benjaminsen](https://solveathome.org/@Benjaminsen)'s direction.**
[Contribution and original-source record](RESEARCH-CONTRIBUTIONS-2026-09-27.md).
See the [proposal register](OEIS-PROPOSALS.md) and
[meta-research correction](prime-meta-research-2026-09-27.md).
This document replaces the obsolete submission instructions. Git and the
public document history retain the original draft; nothing has been submitted to OEIS.

Andrew Carter introduced [A144311](https://oeis.org/A144311) in 2008;
Max Alekseyev and Jinyuan Wang extended it. Translating our residue r to
m=r+1 turns the excluded classes {0,-2} into {1,-1}; a longest covered run
has length G2-1. It is the same fixed-difference object, not a new sequence.
The published entry and its b-file contain 22 exact terms through p=79.

The following DATA preserves the twelve-term historical draft for identification.
These terms are reproduced prior work, not new OEIS contributions.

**NAME**

Largest cyclic gap between residues r modulo P with gcd(r,P)=gcd(r+2,P)=1, where P=A002110(n); equals A144311(n)+1.

**DATA**

2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528

**OFFSET**

1

**COMMENTS**

Jinyuan Wang recorded an interval starting at
162791254787456816384305457582341 with 1859 covered integers in the
[A144311 revision discussion](https://oeis.org/history?seq=A144311),
revision 18, 26 November 2024, 10:42. This gives A144311(23)>=1859 and
G2(83#)>=1860. The project's later returns reproduce that certificate;
our [direct check](verify-prime-cover-83.py) also verifies both uncovered
neighbors and rejects a shifted-interval negative control. Neither the
bound nor the length of this particular run establishes the maximum.
Do not append 1859 (or 1860) as an exact next term or b-file extension.

Possible material for the existing entry is an explanatory twin-candidate
interpretation, a link to reproducible validation, or appropriate paired
Jacobsthal cross-references. These are exposition or validation, with
mathematical priority retained by the original authors. The existing b-file
already covers n=1..22 and A048670 is already a cross-reference. A genuine
extension would need a proved exact new term; a larger certified lower bound
would instead belong in a clearly labelled comment with its own source.

**CROSSREFS**

A144311 (same object minus one), A002110 (primorial), A059861 (residue census),
A048670 (one-class lower bound), A288815 and A072753 (paired Jacobsthal
functions allowing all even differences).

**LINKS**

- [OEIS A144311](https://oeis.org/A144311).
- [Wang's dated revision discussion](https://oeis.org/history?seq=A144311), revision 18.
- [Consolidated manuscript](https://solveathome.org/projects/twin-primes/papers/two-class-jacobsthal).
- [Independent certificate checker](https://solveathome.org/projects/twin-primes/docs/research/verify-prime-cover-83.py).

## Term provenance

The table records the original twelve-term computation; it is not the current
frontier. Fourteen terms were computed in-house and all 22 known exact terms
are tabulated in [G2-STATE.md](G2-STATE.md), with external credit.

| n | prime(n) | P = n-th primorial | a(n) | verified by |
|---|---|---|---|---|
| 1 | 2 | 2 | 2 | direct |
| 2 | 3 | 6 | 6 | direct |
| 3 | 5 | 30 | 12 | 05 + direct |
| 4 | 7 | 210 | 30 | 05 |
| 5 | 11 | 2310 | 42 | 05 |
| 6 | 13 | 30030 | 66 | 05 |
| 7 | 17 | 510510 | 108 | 05 |
| 8 | 19 | 9699690 | 150 | 05 |
| 9 | 23 | 223092870 | 204 | 05 |
| 10 | 29 | 6469693230 | 258 | 05b (segmented, ~3 min; slot count matched A059861 exactly) |
| 11 | 31 | 200560490130 | 348 | 05b method over 2.0e11 positions (~80 min; slot count matched A059861 = 6226553025 exactly; max gap at r=8813641451) |
| 12 | 37 | 7420738134810 | 528 | mod-30 lattice walk over 7.42e12 positions (~54 min; slot count matched A059861 = 217929355875 exactly; max gap at r=544899485411) |
