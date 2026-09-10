# Review specification: the 2026-09-07 measurement and source-reading session

> Public mirror edition: repository-internal working instructions were removed. See MIRROR.md.

<!-- ledger
id: Q-review-request-0907
status: ANSWERED
todo: Z0
parity: Review specification only. The two measurements are residue-only finite censuses with no arithmetic estimate; the source readings assert no new bound. Claims to be reviewed carry their own parity lines in their owning notes.
question: Which claims of the 2026-09-07 session should an independent math agent check, in what order, against which records, and what must the review return?
verdict: Reviewed 2026-09-08 by an outside reader (history/reviews-0907/10): ranked claims 1 (conditional on the unread 1974 page), 2, 4, 5, 6 verified within stated scope; claim 3 verified with its quoted tolerances corrected (max deviation 1.8e-4, not 1e-4 or 1e-5); the Corollary 1 slip sharpened (fails for every representative other than 1, and mis-signs even then); ASSUMED items 4 and 6 discharged, 2 partially, 1, 3, 5 not. Twin-prime infinitude and every sufficient signed margin remain OPEN. Ranked below: the §6.2 demotion in the two-class manuscript (a change to a proof's dependency), the D_y identity reading (a change to what a census can show), the Erdős #687 attribution, and the two measurement artifacts. Twin-prime infinitude and every sufficient signed margin remain OPEN.
-->

## 1. What to read, in order

1. [history/CHANGELOG.md](history/CHANGELOG.md), entry 2026-09-07, for the
   claim as it stood and what replaced it, per document.
2. The owning records, in dependency order:
   [../paper/kk-lower-bound.md](../paper/kk-lower-bound.md) §6.1, §6.2,
   §11.1, §11.2 (the demotion and its riders);
   [centered-discrepancy-measurement.md](centered-discrepancy-measurement.md)
   §3 item 3 (the identity reading);
   [shifted-prime-mobius-sums.md](shifted-prime-mobius-sums.md) §2 (the
   constant correction) and §3;
   [G2-STATE.md](G2-STATE.md) PROVEN list, second bullet, and
   [../paper/two-class-jacobsthal.md](../paper/two-class-jacobsthal.md) §3
   caution (the #687 attribution).
3. The session's agent reports, verbatim, in
   [history/reviews-0907/](history/reviews-0907/README.md), only after
   forming your own view. Report 06 is the red team of report 05; read 05
   first, then attack it yourself, then read 06.
4. The outcome entries under Q-centered-discrepancy-measurement and
   Q-shifted-prime-mobius-sums in [OUTCOMES.md](OUTCOMES.md).

## 2. The claims, ranked by leverage

| rank | claim | calibration | owning record | consequence of a defect |
|---|---|---|---|---|
| 1 | Kalmynin–Konyagin's Lemma 1 is the Brun-form upper bound (pointwise remainder, no support parameter), identified with Halberstam–Richert Theorem 2.2 through Richert's Tata lectures Theorem 11.3; Theorem B of the manuscript consumes Corollary 1 at z = √y with every hypothesis discharged; §6.2 is not consumed | source identification through a secondary text by the same author, corroborated by the Dover OCR index (p. 68) and the 1971 Mémoire (report 08); dependency review plus red team; the 1974 page image UNREAD | kk-lower-bound §6.2, §11.2; reviews-0907/04, 05, 06 | §6.2 returns to an argument and the "one sieve dimension of margin" risk returns; Theorem A is affected equally, since its step 1 consumes the same statement |
| 2 | Corollary 1's printed proof mis-chooses CRT representatives (fails when 0 ∈ Ω_p; repaired by r' ≡ r mod p, r' ≡ 1 mod P(z;p), proving the bound for −Ω with the same count); present in arXiv v2 and in the published Izvestiya version | read at extracted text and arXiv TeX; finite check 3 / 0 / 3 reproduced twice | kk-lower-bound §11.2; reviews-0907/06 finding 6, 07 | if the printed encoding is in fact correct, the residual on the source disappears; if the repair is wrong, Corollary 1 as consumed needs its own proof here |
| 3 | At the measured x = 2^j, 30 ≤ j ≤ 38, D_y/x differs from −(T1/x − C2) by at most 2e-4; the classical term dominates this finite comparison | measured from the identity columns of one script; the identities S = T1 + T2 + E_pp and T2 = acc1 + E_even hold to 1.3e-5 absolute; the naive reimplementation agrees at j ≤ 20 | centered-discrepancy-measurement §3.3; reviews-0907/02 | the do-not-rerun in README Status, lane A and moving-cutoff-parity §5 would be withdrawn; no proof consequence |
| 4 | The Erdős #687 bound x log x/log₃x is an anonymous AI-authored GitHub PDF, Lean-formalised by a third party, unrefereed, in the one-class primorial form; it transfers through G₂ ≥ g at that calibration | read at the page, the thread, the PDF and the Lean file; the Lean build NOT reproduced | G2-STATE; two-class-jacobsthal §3; reviews-0907/03 | wording only; the manuscript's Theorems 2b, 2c sit above it either way |
| 5 | The four shifted-prime sums sit at random-sign size to 2^38; the +2 sums' full-window sign run is matched by one draw of the mu- control, not by any draw in the +2 columns | measured; controls fired; π(2^j) matches A007053 | shifted-prime-mobius-sums §3; reviews-0907/01 | none for any proof; the table is data |
| 6 | The constant A2 = ∏_{p>2}(1 − 1/(p(p−1))) equals 2 × Artin's constant = 0.7479116, and the first-run value 0.7364 was wrong | the measured density 0.747911 and the certified interval in moving-cutoff-parity (15) both exclude 0.7364 | shifted-prime-mobius-sums §2 | a wrong printed threshold line in either script's block |

## 3. ASSUMED-UNVERIFIED, in priority order

1. Halberstam and Richert 1974, Theorem 2.2, at the printed page image.
   Reached so far through Richert 1976 (Theorem 11.3 and its "cf. l.c.
   Theorem 2.2" note), through the OCR search-inside index of the Dover
   reprint (Chapter 2 §5, p. 68, two clauses (5.1) for z ≤ X^A and (5.2)
   for z ≥ X^{1/A}, hypotheses (Ω1), (Ω2(κ)), (R) with pointwise
   |R_d| ≤ ω(d), proof on p. 69 by reduction to z = X^{1/A}), and through
   the authors' 1971 Mémoire Theorem 3, which states the same two-clause
   bound; [history/reviews-0907/08](history/reviews-0907/08-halberstam-richert-thm22-access.md).
   All three agree on the Brun form. If a reader holds the book, quote the
   page verbatim; the OCR's constant labels and superscripts are the
   uncertain tokens.
2. That Richert's Theorem 11.3 is proved as stated in the Tata lectures
   (its proof was not re-derived; only its statement and the chapter note
   cross-reference were read).
3. The Lean formalisation of the #687 covering theorem: axioms and absence
   of sorry were read from the repository files, not from a build.
4. The extracted-text readings of both K–K PDFs at the Corollary 1 proof:
   the TeX source was also read, which fixes the formula, but no page
   image was inspected in this session.
5. That the four-seed random-sign control in the D_y script is the right
   null for the comparison in §3.3 of its note: the reading there does not
   depend on the control, only on the identity columns, but the control's
   size is quoted.
6. That the two scripts' segmented sieves agree with each other beyond the
   one M value compared at j = 24 (the naive checks are at j ≤ 26 only).

Disposition so far: a referee pass on ranked claim 1 restricted to Theorem B
([history/reviews-0907/09](history/reviews-0907/09-kk-theoremB-referee.md))
returned VERIFIED within stated scope, conditional on the unread 1974 page,
and found two defects outside the claim (a false strict inequality in
Proposition 3, Case 1, repaired; a self-contradiction in §11.2 about Theorem
A, repaired); its edits E1 to E13 were applied on 2026-09-07, E3 including
the H5 constant in `research/attack-kk-substitution.js` (re-embedded with
the override; no HOLDS/fails status and no y_0 row changed; audit-numbers
251/251). Not applied: the optional relabelling E14 and the history move
E15. Independent review 2026-09-08: [history/reviews-0907/10](history/reviews-0907/10-independent-review-0908.md),
dispositions applied to the owning records the same day. The embed.js
--check of §4 re-runs the recorded invocation and spawned the 2^38 census;
use node research/qc.js embeds for static verification. Do not start a
census merely to read its static verdict.

## 4. What the review must return

One report under `history/reviews-0907/` at the next free number, with:
disposition per ranked claim (verified within stated scope; correction
required; conditional on a named input; unresolved); exactly what was
checked and what was not; any finite counterexample with its inputs; and
proposed corrections to the owning records, which the integrator applies.
Do not edit the owning notes directly. A green mechanical gate is not a
review. For static custody checks use node research/qc.js embeds. The
following command deliberately reruns the full recorded invocation and is
appropriate only for an intended, budgeted reproduction: `node research/qc/embed.js --check`.

## 5. What is not being asked

Not asked: any new estimate for D_y or the residual; any extension of
either table; any opinion on the twin conjecture. The review's scope is the
six rows above and the six unverified items.
