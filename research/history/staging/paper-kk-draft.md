# Record: the K–K two-class lower bound, written up as a refereeable draft

<!-- ledger
id: Q-paper-kk-draft
status: ANSWERED
todo: none
question: Is the K–K two-class lower bound written up as a refereeable draft?
verdict: Yes. paper/kk-lower-bound.md, self-contained at INFERRED grade, carrying Theorem B (the substitution), Theorem A (the published-ingredient x ln x chain) and Proposition 2 (the free G2 >= g transfer), with every constant, every consumed hypothesis, the y0 = 10^134.1 floor, the three residuals, and a per-number provenance appendix; nothing in it is new mathematics and nothing in it is refereed.
-->

*Written 2026-08-28. Two files were produced and no existing file was edited;
the registry updates this draft implies are listed in the draft's Appendix C
rather than made.*

## 0. What was done

`paper/kk-lower-bound.md` was written: a complete, self-contained draft of the
two-class Jacobsthal lower bound, at the rung the corpus gives it. It does not
supersede `paper/proposals/draft-kk-lower-bound.md`, which stays as the earlier
and shorter version; the new file is longer, adds the $y \ln y$ chain as a
second theorem with its own proof, adds the introduction placing the object
against the one-class literature, and adds the per-number provenance appendix
that the earlier draft did not carry.

Nothing was re-derived and nothing was recomputed. Every number in the draft
was lifted from a corpus file with the producing script named, per the standing
compute rule.

## 1. Claim-by-claim sources

| # | claim in the draft | corpus source |
|---|---|---|
| 1 | $G_2(P(y)) - 1$ equals the max coverable interval, one pair $\{a_p, a_p-2\}$ per prime (Prop 1) | `research/two-class-lower-bounds.md` §1, PROVEN elementary; earlier under the name PAIRED in `research/attack2-rankin2d.js` |
| 2 | $G_2 \ge g$ pointwise, and the FGKMT transfer (Prop 2) | `research/two-class-lower-bounds.md` §§1, 3; ratios at eleven levels there |
| 3 | $G_2(P(y)) \gg y \ln y$ from published statements only (Theorem A) | `research/history/staging/import-hypergraph.md` §4; adversarial confirmation `research/history/staging/redteam-0820-math.md` §3.3; finite echo §3.4; proposal `paper/proposals/prop-xlnx-lower-bound.md` |
| 4 | $G_2(P(y)) \gg y(\ln y)^3(\ln\ln\ln y)^2/(\ln\ln y)^4$ (Theorem B) | `research/two-class-lower-bounds.md` §4c; frozen derivation `research/history/staging/attack-kk-substitution.md`; proposal `paper/proposals/prop-kk-lower-bound.md`; earlier draft `paper/proposals/draft-kk-lower-bound.md` |
| 5 | the band structure, $z_0$, $z_1$, $m$ at $\ell_f = 2$, $h_f = 0$, $M(f) = 2$ | `research/covering-dive.md` §4.2 correction 2; source displays read at arXiv:2302.00459v2 pp. 3 and 6 |
| 6 | Corollary 1 sees $\Omega_p$ only through $\lvert\Omega_p\rvert$, verbatim | `research/covering-dive.md` §4.2; re-read at page image, `research/history/staging/redteam-0820-math.md` §3.3 |
| 7 | Lemma 1's hypothesis list, and its discharge at $\kappa = 2$ and $\kappa = 4$ | `research/history/staging/redteam-0820-math.md` §3.3 (for $\kappa = 2$); `research/attack-kk-substitution.js` (for $\kappa = 4$) |
| 8 | the trichotomy, Cases 1 to 3, and (5.1) $2m/y < z_0$ | `research/history/staging/attack-kk-substitution.md`; correction from $A > 3$ to $A > 4$ by `research/history/staging/verify-kk-substitution.md` |
| 9 | $\Omega^{\mathrm{II}} = \emptyset$, so their §3 apparatus is unused | `research/two-class-lower-bounds.md` §4c |
| 10 | the three resultants, and $a = \pm1$ optimal in band 2 | `research/attack-kk-substitution.js` §§C, D |
| 11 | the Selberg support repair $\xi = \sqrt y/(\ln y)^7$, $3\kappa - 1 = 11$, $\kappa = 4$ load-bearing | second adversarial pass, `research/history/CHANGELOG.md` 2026-08-19; restated `research/two-class-lower-bounds.md` §4c |
| 12 | the two-term Mertens ledger, its identified $O(1) = -2.529967$, and Rosser–Schoenfeld Thm 20 | `research/attack-kk-substitution.js`; `research/verify-kk-substitution.js` |
| 13 | the exponent assembly collapsing coefficient by coefficient, $5.684\times10^{-13}$ | `research/history/CHANGELOG.md` 2026-08-19, both passes |
| 14 | the smooth-number step and $A > 4$; Hildebrand slack | `research/attack-kk-substitution.js` |
| 15 | band 3 closes at $\ln y > 11.807294$ | `research/attack-kk-substitution.js` |
| 16 | the six inequalities H1–H6, the $y_0$ table, H2 binding | `research/attack-kk-substitution.js`, reproduced by the second pass |
| 17 | band 2 empty at $y = 4001$; the D4 factor is not evidence | `research/two-class-lower-bounds.md` §4c; `research/history/staging/attack-lower-bound.md` D4 |
| 18 | the method's own one-class shortfall, ratio 4.6052 to 20.7233 | `research/attack-kk-substitution.js` |
| 19 | the brute force of Prop 3, six rows, sufficient not necessary | `research/verify-kk-substitution.js`; live-layer reading in `research/two-class-lower-bounds.md` §4c |
| 20 | the upper bound $\ll_\varepsilon y^{4.26645+\varepsilon}$ and $\beta_2$'s digits | `paper/beta2-note.md`; `research/G2-STATE.md` §3a; `research/PRIOR-ART.md` (Booker–Browning for the digits, DHR p. 79 prints 4.266) |
| 21 | measured exponent $1.50 \pm 0.05$ and the $+0.28$ control bias | `research/exponent-control.md` §§1, 5 |
| 22 | certified 356,712 at $y = 4001$; 479,339 at $y = 5003$ | `research/G2-STATE.md` §3a; `research/two-class-lower-bounds.md` §0 |
| 23 | A144311 is the object, its wording, its contributors, no formula or reference line | `research/PRIOR-ART.md`; `research/SEARCH-CONVENTIONS.md` §§1, 2 |
| 24 | the prior-art position and the zero-citation finding, with what failed on the day | `paper/proposals/prop-kk-lower-bound.md` §4 |
| 25 | Holt and Rudd own the frame; priority theirs, cited where used | `research/PRIOR-ART.md`, Holt section |
| 26 | Iwaniec 1978, $\beta_1 = 2$, and the unanswered MO 245539 on his Lemma 1 | `research/covering-dive.md` Q5 and "where the proof breaks" item 1 |
| 27 | Halberstam–Richert Thm 2.2 unread; Cor 2.4.1 UNREACHABLE | `research/PRIOR-ART.md`, provenance section |
| 28 | the PDF of record: md5, 12 pages, 148,566 bytes | `research/history/staging/lit-pdf-kalmynin-konyagin.md` §0 |
| 29 | the three custody residuals in the frozen records (Appendix B) | `paper/proposals/prop-kk-lower-bound.md` §3 |
| 30 | authorship line and AI disclosure | `paper/PAPERS.md`, "Authorship & AI disclosure" |

## 2. Two things the draft says that no corpus file said in those words

Neither is new mathematics; both are presentational, and both are flagged in
the draft itself.

1. **The two theorems are stated in one $y$-frame.** The corpus states
   Theorem B in the $y$-frame (`P(y)`, $y$ the largest prime) and Theorem A in
   the $x$-frame ($x$ the largest prime, $y$ the covered length). The draft
   puts both in the $y$-frame with $m$ for the covered length. The arithmetic
   is unchanged: $m = c_0 y \ln y$, $\sqrt m = o(y/\ln y)$, and
   $m/\ln^2 m = c_0 y/\ln y$, which is step 3 of the original.
2. **The one-class bound quoted at the source's p. 2 is left unnamed.**
   `paper/proposals/prop-kk-lower-bound.md` §6 calls it FGKT and
   `paper/proposals/draft-kk-lower-bound.md` §6 calls it FGKMT. The page has
   not been re-read to settle it, so the draft states the comparison and
   declines the attribution, in Appendix A.

## 3. Registry updates NOT made (fenced), listed for the next session

- `paper/proposals/PROPOSALS.md`: point the `prop-kk-lower-bound.md` row at
  `paper/kk-lower-bound.md` as the draft of record. Grade unchanged at
  QUICK-DRAFT; nothing in this session moved evidence.
- `paper/proposals/PROPOSALS.md`: `prop-xlnx-lower-bound.md`'s first upgrade
  trigger has fired. Its text is *"upgrade to QUICK-DRAFT when the paper case
  is written: a short note whose point is the provenance trade, stating both
  this bound and the §4c reading with their grades."* The draft's §§3, 9 and 10
  do exactly that. PROPOSAL to QUICK-DRAFT, with the regrade recorded in
  `research/history/CHANGELOG.md` per the registry's regrade rule.
- `paper/proposals/prop-xlnx-lower-bound.md` §2's line *"what keeps it at
  PROPOSAL rather than QUICK-DRAFT: no draft exists"* is now false and should
  be rewritten.
- `paper/PAPERS.md`: the suite has no entry for a two-class lower-bound note.
  Fold into Paper II or add as Paper V. Chris's call; the draft's Appendix C
  states the case for folding.
- `research/G2-STATE.md` §3a and `research/two-class-lower-bounds.md` §4c: add
  a pointer to the draft. No grade or number changes.

## 4. What did not move

No mathematics moved. No number was recomputed, no check was re-run, and no
grade changed on evidence. The three residuals that keep Theorem B below
submission are exactly the three that stood on 2026-08-19: the two unrepeated
readings of the source, Halberstam and Richert Theorem 2.2 unread at source,
and the implied constants unset. `node research/qc.js` was not run, per the
fence on this session.
