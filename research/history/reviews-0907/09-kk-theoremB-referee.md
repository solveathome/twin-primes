# Referee report: Theorem B of paper/kk-lower-bound.md, as it stands after the 2026-09-07 demotion of §6.2

Read-only. No repository file was edited. Line numbers refer to
`~/Files/Git/primeoire/paper/kk-lower-bound.md` at HEAD 5eae48c (1180 lines).

## 0. Scope, what was read, and at what custody

Scope per `research/review-request-0907.md`: ranked claim 1 (Lemma 1 is the Brun-form bound, Theorem B consumes Corollary 1 at z = sqrt(y) with hypotheses discharged, §6.2 not consumed), and unverified items 2 (Richert 11.3 proved as stated) and 6 (segmented sieves) only where they touch Theorem B. Item 6 does not touch Theorem B and is not discussed.

Read in full: `review-request-0907.md`; `paper/kk-lower-bound.md` (all 1180 lines); `research/history/reviews-0907/04`, `05`, `06`, `07`. Read in part: `research/attack-kk-substitution.js` (geom(), the H1 to H6 block, lines 125 to 145 and 505 to 530); `research/verify-kk-substitution.js` (testProp, lines 81 to 112); `paper/proposals/PROPOSALS.md` legend (lines 78 to 92); `paper/proposals/prop-kk-lower-bound.md` lines 25 to 45, 140 to 150; CHANGELOG 2026-09-07 entry.

Read at source, by me, from the extractions the earlier session left on disk (scratchpad `kk/`, `kk.txt` from the arXiv v2 PDF whose md5 the manuscript records; `richert.txt` from the Tata 1976 PDF): Lemma 1, Corollary 1 and its printed proof (kk.txt lines 165 to 217); the source's own trichotomy and sieve step at p. 6 (kk.txt lines 295 to 345); Richert condition (R), Theorem 11.3 and the (Omega_0) remark (richert.txt lines 6740 to 6775); the chapter note "Theorem 11.3: cf. l.c. Theorem 2.2" (richert.txt line 7414). Text extraction, not page images. Halberstam and Richert 1974 not read; nobody here has.

Numerical checks below were done by hand and confirmed in a throwaway node one-liner in the scratchpad (not a repo script, not embedded); they are checks of the manuscript's arithmetic, not new measurements.

## 1. Verdict in one paragraph

Theorem B's argument is sound at the level of its statement and the demotion of §6.2 left the sieve step consistent: every computation in §§5 to 8 runs at z = sqrt(y), the consumed statement (Corollary 1) carries no support parameter, and every hypothesis of Lemma 1 is discharged in §6.1 for the substituted sequence at z = sqrt(y). I found one false inequality printed inside the proof of Proposition 3 (Case 1, line 381; DEFECT, repair is one character and moves nothing), one internal contradiction in §11.2 about whether Theorem A shares the Halberstam and Richert residual (lines 840 to 843 versus 890 to 893; DEFECT of consistency, not of mathematics), and one inconsistency between H5 as tabulated and the budget the proof text actually uses (line 622 versus 588; the slack is 17 in the logarithm, so y_0 does not move). The remaining findings are wording. The grade INFERRED for Theorem B as a whole is defensible under the registry legend, but the reason printed for it (lines 256 to 259, 675, 35 to 36) is no longer accurate and the asymmetry with Theorem A is now mis-stated.

## 2. Dependency chain of Theorem B

| link | what is consumed | kind | hypotheses discharged in text? | my check |
|---|---|---|---|---|
| Theorem B (242) <- m + 1 <= G_2 | Proposition 1 (185): covering of [1, m] by pairs {a_p, a_p - 2} gives a twin-free run | derivation here, CRT | yes, proof at 191 to 199 | re-derived; OK |
| cover of [1, m] | bands 1, 2 (table 307 to 311) plus band 3 (§7) | construction (K-K's §2, instantiated) | n/a | OK |
| every i <= m killed | Proposition 3 (364): unkilled after bands 1, 2 implies (a) or (b) or (c) | derivation here | (5.1) is the only input; z_1 < sqrt(y) (H3) is needed silently for (c) to charge all of band 2 | Case 1 line 381 contains a false strict inequality (finding 1); otherwise OK |
| Proposition 3 finite content | brute force at y = 2e5, z_1 = 300, m = 4e6, z_0 in {100, 60, 45, 30, 20, 10} | finite computation (`verify-kk-substitution.js`) | scope is the stated (y, z_0, z_1, m), not the asymptotic parameters; band 2 = (100, 300] non-empty there | testProp's branch (c) matches the manuscript's Omega_p (Omega^III only for z_0 < p <= min(z_1, sqrt y)); the 2(m+2)/y correction of finding 1 is 40.00002 against z_0 >= 45 on the clean rows, so the table stands |
| (6.1) R <= S + O(sqrt y) + 2 Psi(m+2, z_1) | counting the three branches | derivation here | yes | OK |
| S(m, Omega) <= C_kappa m V(sqrt y) | K-K Corollary 1 at X = m, z = sqrt(y), kappa = 4 | published statement (arXiv v2 p. 4; Izvestiya p. 228), read here at text | g multiplicative (defined 478); g(p) <= 4 (474); g(p) < p via H1 (475 to 478); r_d <= g(d) for all d | P(z) by CRT (478 to 482); z << X (483) | all discharged; the r_d discharge is the manuscript's own and is correct with no size restriction on d |
| Corollary 1 <- Lemma 1 | source's four-sentence CRT proof | published proof, defective at the representative choice when 0 in Omega_p (06 finding 6, 07) | recorded at 845 to 859 with the repair | statement stands; the manuscript consumes the statement |
| Lemma 1 <- "[5, Theorem 2.2]" | Halberstam and Richert 1974 | citation inside a refereed paper; page UNREAD | identification via Richert Tata 11.3 + chapter note | 11.3 statement and note read here at text: (Omega_1), (Omega_2(kappa)), (R): S << X prod_{p<z}(1 - omega(p)/p) for z <= X^A, constant depending on A, A_1, A_2, kappa. Matches Lemma 1 term for term. Note the product is over p < z, V(z) over p <= z; one factor >= 1 - 4/sqrt(y), harmless. Richert's proof ("one readily obtains from Theorem 9.1 and (11.5)") NOT re-derived by anyone here; the support reduction in 06 finding 1 is a reviewer's reconstruction |
| ledger (6.3) | Mertens' second theorem, twice, plus the identified constant | published statement + arithmetic | needs z_0 < z_1 (H2) and z_1 <= sqrt(y) (H3) | constant -2 ln 2 + 2M - 5/3 = -2.529967 re-computed; OK. The Rosser-Schoenfeld Theorem 20 material (536 to 541) is illustrative and not consumed by the proof |
| assembly (6.4) | algebra in ll, lll, llll | derivation here | yes | ln ln z_0 = ln A + lll and ln ln z_1 = llll + ll - lll - ln A re-derived; sum = 4 ll - 4 lll + 2 llll - 4 ln A + O(1); m times exp(-sum) = A^4 y/(B ln y); every coefficient cancels. prod(1 - g/p) <= exp(-sum g/p) is the right direction for an upper bound. OK |
| S <= y/(4 ln y) | choose B large against A | absorbs C_kappa, the ledger O(1), A^4 | "constant depends on kappa alone" (466, 561): under Richert 11.3 it depends on A (the exponent in z <= X^A, here 1), A_1 = kappa + 1, A_2(kappa), kappa; none depends on the manuscript's A or B | OK. With constants set to 1 the step needs B >= 4 e^{1.363} A^4 = 4200 at A = 4.05, not the B = 10 the script uses; nothing in §8 moves (finding 8) |
| 2 Psi(m+2, z_1) = o(y/ln y) | Psi(x, z) << x rho(u) in Hildebrand's range; de Bruijn for rho | published statement, [MEMORY], no bibliographic entry (1028 to 1030) | ln z_1/(ln ln m)^{5/3} -> infinity checked numerically | u ln u = A ll (1 + (ln A - llll)/lll), so Psi = m (ln y)^{-A + o(1)}, not m (ln y)^{-A}; the requirement 3 - A < -1 is still exactly A > 4 (finding 9, wording) |
| R <= y/(3 ln y) | y/(4 ln y) + o(y/ln y) | arithmetic | for y >= y_0 | OK; H5 as tabulated does not encode this budget (finding 3) |
| band 3 | pi(y) - pi(y/2) > y/ln y - 0.62753 y/(ln y - ln 2) | Rosser-Schoenfeld 1962: pi(x) > x/ln x (x >= 17), pi(x) < 1.25506 x/ln x (x > 1); 1.25506/2 = 0.62753 | valid for y >= 17, implied by H6 | L_0 = (2/3) ln 2 / (2/3 - 0.62753) = 0.462098/0.039137 = 11.8073; e^{11.807294} = 1.3423e5. OK |
| y_0 = 10^{134.1} | H1 to H6 bisected with constants 1 | finite computation | see findings 3, 4, 8 | H2 at A = 4.05, L = 308.67: A^2 ln^2 L = 538.969 vs L ln ln L = 538.972; binding as stated |

Nothing in this chain consumes a support parameter, a remainder sum, a lower-bound sieve, or an asymptotic for S. §6.2 is consumed by nothing (05 §3, 06 findings 2, 4, 5; confirmed by my own grep and read of §§5 to 8).

## 3. Findings

Numbering is mine. Labels: DEFECT (wrong as written), WORDING (unpolished, inconsistent or misleading, mathematics unaffected), OK.

**1. DEFECT, line 381 (Proposition 3, Case 1).** The text reads "k/P <= (m+2)/(y/2) < 2m/y". Since (m+2)/(y/2) = 2(m+2)/y = 2m/y + 4/y, the strict inequality "< 2m/y" is false. What the argument needs: k/P is a positive integer whose prime factors all exceed z_0, so if k/P > 1 then k/P > z_0; the contradiction requires k/P <= z_0, which follows from 2(m+2)/y <= z_0. As printed, (5.1) reads 2m/y < z_0, which does not by itself give 2(m+2)/y <= z_0. Consequence: none at scale (the gap is 4/y; H4 changes by ln(1 + 2/m), about 10^{-130} at y_0) and none for the brute force (2(m+2)/y = 40.00002 against z_0 >= 45 on every counterexample-free row). Repair in §7 below.

**2. DEFECT (consistency), lines 840 to 843 versus 890 to 893.** §11.2 paragraph 1 says the unread 1974 page "is shared with Theorem A, whose step 1 consumes the same statement at kappa = 2", and line 888 says "the outcome would reach Theorem A equally". §11.2's last paragraph says "Theorem A does not carry this residual. It consumes Corollary 1 at its statement". After the demotion, Theorem B's sieve step consumes Corollary 1 at its statement in exactly the same way (line 455: "The result consumed is Kalmynin and Konyagin's Corollary 1"), so the last paragraph is both self-contradictory within the section and asserts an asymmetry that no longer exists. Replace it (§7).

**3. WORDING (table inconsistent with the proof), line 622 (H5) versus line 588.** H5 is coded as ln 2 + ln(m/y) + ln rho(u) + ln 3 + ln L < 0, that is 2 m rho(u) < y/(3 ln y). The proof text's budget is R <= y/(4 ln y) + [O(sqrt y) + 2 Psi] <= y/(3 ln y), so the smooth term's budget is y/(12 ln y) - sqrt(y) - 2, not y/(3 ln y). At L = 308.67, A = 4.05, B = 10: ln m = 317.695, ln z_1 = 23.216, u = 13.684, de Bruijn ln rho(u) = -35.278, H5's left side = 0.693 + 9.025 - 35.278 + 1.099 + 5.732 = -18.73; with comparator 12 in place of 3 it is -17.34. Slack either way, H2 still binds, y_0 unchanged. But the table claims "every hypothesis used above is an explicit inequality", and H5 as written is not the inequality used. Note also that de Bruijn's ln rho(u) = -u(ln u + ln ln u - 1) with the o(1) dropped is an approximation to rho, not an upper bound, so H5 is approximate even with "constants set to 1"; the floor caveat at 643 to 648 covers this but should name it.

**4. WORDING, line 620 (H3's "where it is used").** H3 is z_1 < sqrt(y). The table attributes it to "§4, bands 2 and 3 disjoint", which needs only z_1 < y/2. What z_1 < sqrt(y) is actually used for is the ledger (6.3): the second term charges band 2 in full only if all of band 2 lies in the sieve range p <= sqrt(y) (line 517 to 519), and Proposition 3(c) quantifies over p <= sqrt(y). Attribute H3 to §6.3 and Proposition 3(c).

**5. WORDING, §8 table (lines 616 to 623): the z << X hypothesis is missing.** §6.1 line 483 discharges z = sqrt(y) << m asymptotically; §8 claims to list every hypothesis as an explicit inequality. The row is derived in §4 below; it is slack by 163 in the logarithm at y_0 and cannot bind. Report 05 proposed the row with a formula error; report 06 corrected it; my derivation agrees with 06.

**6. WORDING, lines 636 to 637: "B ... enters only H4".** B enters H4 and H5 (through ln(m/y) = -ln B + 3 ln L + 2 ln lll - 4 ln ll, `geom()` line 140) and the missing z << X row. All three are slack, so the conclusion "B does not move y_0" is right; the reason is wrong.

**7. WORDING, line 505 to 506 (§6.2 remark): xi is used before it is named.** The display Sum_{d <= xi^2, d | P(z)} 3^{omega(d)} |r_d| appears one line before "at the naive support xi = sqrt(y)". Introduce xi as "a support parameter xi" in the sentence before the display. K is gone (grep for `\bK\b` hits only "K. Ford"); C is defined at 508. No undefined symbol remains.

**8. WORDING, §8 and §6.4: the value of B is never stated and the step S <= y/(4 ln y) is not consistent with B = 10 at constants 1.** The script bisects at B = 10 (line 328 and the H-block). With every implied constant set to 1, S <= exp(-C_full) A^4 y/(B ln y) where C_full = -2 ln 2 + 2M - 1/2 = -1.3633 is the full ledger constant (script line 152), so S <= 3.91 A^4 y/(B ln y) = 1052 y/(B ln y) at A = 4.05, and S <= y/(4 ln y) needs B >= 4200. This is not a row in the table because B is a free parameter; but "every implied constant set to 1" plus B = 10 is not a consistent instantiation of §6.4. Since larger B only loosens H4 and H5 and tightens the z << X row (which binds only at ln B > 163), y_0 is unaffected. State B, and state that the table is B-independent for 1 <= B <= 10^{70}.

**9. WORDING, line 573: "Psi(m, z_1) ≈ m (ln y)^{-A}".** With u = ln m/ln z_1 = A ll/lll (1 + O(ln L/L)), u ln u = A ll + A ll (ln A - llll)/lll, and the second term is unbounded (of size ll llll/lll), so rho(u) = (ln y)^{-A + o(1)} with o(1) of order llll/lll, not (ln y)^{-A} times a constant. The conclusion A > 4 is unaffected since 3 - A + o(1) < -1 holds eventually for every fixed A > 4. Write "(ln y)^{-A + o(1)}".

**10. WORDING, line 878: dangling reference to the old §6.2.** "the opposite direction from the 'xi < z' that §6.2 repairs" describes the demoted argument (xi = sqrt(y)/(ln y)^7 below z = sqrt(y)). The remark now says "sieving at z = xi", so xi = z, and it repairs nothing. Also "the 'one sieve dimension wide' margin stated above" (878 to 879) points at a claim the section now records only as withdrawn history (837 to 839). Both sentences should refer to "the earlier text of §6.2".

**11. WORDING, §11.2 lines 836 to 839 and 861 to 888.** Roughly half of §11.2 is now a narrative of what the section used to say and how it changed. The project's document convention (body = current understanding, history to CHANGELOG) would move 836 to 839 and the "On its strength, after a dependency review and a red team ... was demoted" sentence (884 to 887) to the CHANGELOG, which already carries them. Not a mathematical point.

**12. WORDING, equation labels.** (6.1) at 446 and (6.3) at 519 with no (6.2). A referee will look for it. Either relabel (6.3) -> (6.2) and update the two references at 646 ("the O(1) of (6.3)") and 551 ("so (6.3) reads"), or leave a one-line note.

**13. WORDING, line 464 to 466.** The list of hypotheses imported by "as above" omits |r_d| <= g(d), which the manuscript then discharges at 478 to 482. Add it to the list so the discharge paragraph matches the list.

**14. WORDING, lines 35 to 36, 256 to 259, 675 to 676 (the reason given for INFERRED).** See §5 below.

**15. OK, §6.1 hypothesis discharge (474 to 485).** g(2) = 1 ({0, -2} = {0} mod 2), g(3) = 2 ({0, 1} mod 3), g(p) = 2 on band 1 for p >= 5, g(p) = 4 on band 2 (disjointness: 0 = 1, 0 = -1, -2 = -1 need p | 1; -2 = 1 needs p | 3; so only p = 3 overlaps, matching Res = -3 at 342). g(p) < p for all p given H1. r_d <= g(d) for every squarefree d by CRT (g(d) classes mod d, each with floor((X-a)/d) + 1 in [X/d - 1, X/d + 1] elements). z = sqrt(y) <= m for y >= y_0. All correct.

**16. OK, §6.2 as a remark (487 to 512).** Internally consistent with Richert 11.3 as read here; the C > 3 kappa/2 arithmetic (3 kappa - 1 - 2C < -1) is right; C = 7 at kappa = 4 gives exponent -3, C = 10 at kappa = 6 gives -3; V(xi)/V(sqrt y) = (1 - 2C ll/L)^{-2}(1 + o(1)) -> 1 given z_1 < xi (slack: ln z_1 = 23.2 against ln xi = 154.3 - 7 x 5.73 = 114.2 at y_0). The sentence "happens inside the proof of the theorem cited and is booked as the A-dependence of its constant" is a reviewer's reconstruction (06 finding 1) of a proof Richert does not print; the remark presents it as fact. Calibrate it as "presumably" or cite 06.

**17. OK, occurrence audit for (a).** See §4a below; every remaining occurrence is consistent with §6.2 being a remark, except the two dangling phrases in finding 10.

**18. OK, direction of every sieve use.** Every consumer uses an upper bound on a count that must be small (446, 556 to 563, 588, 601); band 3 uses a lower bound on a prime count from Rosser and Schoenfeld, not a sieve. No lower-bound sieve or asymptotic anywhere in Theorem B. (Agrees with 05 §4.)

**19. OK, §7 arithmetic.** 0.62753 L/(L - ln 2) < 2/3 iff L (2/3 - 0.62753) > (2/3) ln 2 iff L > 0.462098/0.0391367 = 11.8073; e^{11.807294} = 1.3423e5. The bound used is pi(y) > y/ln y (Rosser and Schoenfeld, x >= 17) minus pi(y/2) < 1.25506 (y/2)/ln(y/2); the validity range x >= 17 is implied by H6. Band 3's extra kills (p <= y < m, so a_p = i mod p hits several points of [1, m]) are harmless and the text says so.

**20. OK, the brute force scope.** `testProp` tests exactly Proposition 3 as stated, at free (y, z_0, z_1, m) with z_1 = 300 < sqrt(2e5) = 447 (H3 holds) and band 2 = (z_0, 300] non-empty for z_0 <= 100. It tests nothing about the asymptotic parameters z_0 = (ln y)^A, z_1 = exp(...), and the manuscript says so at 650 to 657.

## 4. The specific checks requested

### 4a. Every remaining occurrence of xi, "support", "(6.2)", "3^{omega(d)}", "load-bearing"

| line | text | consistent with §6.2 as a remark? |
|---|---|---|
| 472 | "This reading is load-bearing and §11.1 flags it as such" | yes; refers to R1 (cardinality-only dependence), which is still load-bearing |
| 487 | "### 6.2 Remark: no support parameter is consumed" | yes |
| 493 | "no remainder sum and no support parameter" | yes |
| 497 | "from a Selberg bound at support z" | yes |
| 505 to 510 | xi, 3^{omega(d)}, C in the alternative route | yes, but xi is used one line before it is named (finding 7) |
| 512 | "as the earlier text of this subsection did not" | yes; history in the body, acceptable in a remark |
| 783 | "empirical support for Theorem B" | English "support", not the sieve parameter; fine |
| 801 | "The two load-bearing readings of the source" | yes; R1, R2 |
| 837 to 839 | "carried a Selberg-form support correction ... the claim that kappa = 4 was load-bearing" | past tense, consistent; convention question (finding 11) |
| 871 | "no remainder sum and no support parameter xi" | yes |
| 875 to 878 | "analysed in §6.2 belongs to a different theorem ... the 'xi < z' that §6.2 repairs" | the first half yes; "that §6.2 repairs" is dangling (finding 10) |
| 881 | "without a support restriction" | yes |
| 940 | §11.4 row for HR 2.2 | yes |
| 1095 | Appendix A row "§6.2 (remark)" | yes |
| equation label (6.2) | absent | label gap (finding 12) |
| K | absent | OK |
| C | defined at 508 | OK |

### 4b. The slack row z << X, verified from the definition of m at line 298

m = (y/B) (ln y)^3 (ln ln ln y)^2 / (ln ln y)^4. With L = ln y, ll = ln L, lll = ln ll (the manuscript's ℓℓ = ln ln y = ln L and ℓℓℓ = ln ln ln y = ln ln L):

    ln m = L - ln B + 3 ln L + 2 ln(lll) - 4 ln(ll)
         = L - ln B + 3 ln L + 2 ln ln ln L - 4 ln ln L.

(`geom()` line 140 codes exactly this as lnmMinusL.) The hypothesis with constant 1 is sqrt(y) <= m, i.e. L/2 <= ln m, i.e.

    ln B + 4 ln ln L - 3 ln L - 2 ln ln ln L <= L/2,

which in the table's own notation (compare H4, which writes "2 ln ℓℓℓ - 4 ln ℓℓ") reads

    ln B + 4 ln ℓℓ - 3 ln L - 2 ln ℓℓℓ < L/2.

This is the formula in the task and in report 06 finding 7; report 05's version had one ln too many in two terms. At L = 308.67, B = 10: ln L = 5.7323, ln ln L = 1.7461, ln ln ln L = 0.5574; left side = 2.3026 + 6.9844 - 17.1969 - 1.1148 = -9.0247; right side = 154.335. Slack by 163; it binds only for ln B > 163. Yes, the row should be added, marked slack, attributed to "§6.1, the z << X discharge", and it does not change the y_0 table.

### 4c. Grade and residuals: see §5.

### 4d. What is wrong, not merely unpolished

Only finding 1 (a false printed inequality inside a proof; one-character repair; no downstream effect) and finding 2 (§11.2 contradicts itself about Theorem A). Everything else is wording or table hygiene. I found no error in the mathematics of Theorem B that survives its own repair, and no step that the demotion of §6.2 left unsupported.

## 5. The grade of Theorem B and the honest residual list

Registry legend (PROPOSALS.md 84 to 88): PROVEN = "a proof is in hand, or it is a published theorem cited to its source"; INFERRED = "our deduction from sourced facts, complete but not refereed".

What the manuscript says (256 to 259): Theorem B "is INFERRED throughout: it re-derives the inside of someone else's published proof rather than consuming its statements, which is a weaker form of custody than Theorem A's". Repeated at 35 to 36 and 675 to 676 ("Theorem B reads the inside of a published proof. Theorem A does not").

Assessment. The reason is no longer accurate. After the demotion, Theorem B's sieve step consumes Corollary 1 at its printed statement, exactly as Theorem A's step 1 does; the trichotomy (Proposition 3) and the ledger are not readings of the source's proof but derivations written out here, with their own proofs, checked twice and brute-forced; the source's proof of Theorem 1 is followed as a template, which is not custody of anything. What genuinely separates B from A is different from what the paragraph says:

- B consumes one published estimate with no artifact and no bibliographic entry: Psi(x, z) << x rho(u) in Hildebrand's range (line 1028 to 1030, [MEMORY]). A consumes only Corollary 1, Mertens, PNT and CRT.
- B's threshold is a floor with constants set to 1 (§8); A's constant is effective (713).
- B's construction cannot be exhibited at any computable scale (650 to 657); A's was replayed clean (726 to 735).
- B's composition is longer (trichotomy, ledger, smooth step, band 3) and the smooth step's leading-term claim is loose (finding 9).

Under the legend, "INFERRED at the composition" is the right rung for both theorems; "PROVEN at every ingredient" holds for A and fails for B at exactly one ingredient (the Psi bound), and that failure is one of provenance (no source cited to its page), not of truth. So the label INFERRED can stay, but the sentence that justifies it must change (edit E5 in §7), and the asymmetry paragraph at 890 to 893 must go (edit E2).

Honest residual list for Theorem B after this session, in the order a referee would weigh them:

1. Halberstam and Richert 1974 Theorem 2.2 unread at the page. Identified with Richert Tata Theorem 11.3 through the author's own chapter note, which I re-read at extracted text and confirm. Shared with Theorem A.
2. Richert Theorem 11.3's proof not re-derived by anyone here (text says "one readily obtains from Theorem 9.1 and (11.5)"); the support reduction that makes it hold for z <= X^A is a reviewer's reconstruction (06 finding 1), stated in the manuscript's remark as fact (finding 16). Shared with A. This is unverified item 2 of the review request; it stands.
3. Corollary 1's printed proof mis-chooses CRT representatives when 0 in Omega_p (holds here at every p); repair recorded at 845 to 859, finite check 3/0/3 reproduced in 07 against the published version. The statement consumed is the standard Brun bound for sifting g(p) classes per prime. A self-contained proof of that statement from Richert 11.3 via the repaired shift is not written in the manuscript. Shared with A.
4. The smooth-number estimate is consumed from memory with no reference entry and no artifact. B only.
5. Rosser and Schoenfeld: the two pi bounds are consumed at their statements as carried by the record, theorem numbering [MEMORY]; the x >= 17 validity range of pi(x) > x/ln x is not stated but is implied by H6. B only (A uses the PNT).
6. Implied constants unpriced; y_0 = 10^{134.1} is a floor; H5 is an approximation to the proof's budget (finding 3) and B is unstated (finding 8). B only.
7. No finite exhibition of the three-band construction is possible; the only empirical content is the brute force of Proposition 3 at free parameters. B only.
8. Finding 1 (Case 1 inequality) until repaired. B only.
9. Not refereed. Both.
10. The zero-citation prior-art negative is dated 2026-08-19 and expires (923 to 925). Both.

None of these is a defect in the statement of Theorem B; items 1 to 3 are the same for Theorem A and the manuscript should say so once, in one place.

## 6. What was not checked

Halberstam and Richert 1974 at the page (unreachable). Richert 11.3's proof. The source's Theorem 1 statement against v1/published (recorded as done 2026-08-18, not repeated). The 30-triple exponent-assembly run and the y_0 bisection were not re-run; I re-derived the algebra and recomputed the single point L = 308.67 by hand. The claim at 638 to 639 that the source's construction has the same y_0 at the same A follows from the manuscript's statement that z_0 and z_1 are the source's displays (300 to 301), which 04 confirms at text; I did not re-read the displays. Page images of either PDF were not inspected in this pass.

## 7. Proposed edits, old -> new, not made

**E1 (finding 1), line 381 to 386.**
Old: `$k/P \le (m+2)/(y/2) < 2m/y$, while every prime factor of $k/P$ exceeds $z_0$, so under the inequality $$2m/y < z_0 \tag{5.1}$$ the cofactor $k/P$ has no prime factor at all.`
New: `$k/P \le (m+2)/(y/2) = 2(m+2)/y$, while every prime factor of $k/P$ exceeds $z_0$, so that $k/P > z_0$ unless $k/P = 1$. Under the inequality $$2(m+2)/y \le z_0 \tag{5.1}$$ the cofactor $k/P$ therefore has no prime factor at all.`
And line 384 to 419, 621, the H4 row: `2m/y` -> `2(m+2)/y` where (5.1) is quoted (lines 402, 418 to 419, 621 "H4, Case 1"); at 418 to 419 the brute-force threshold becomes `z_0 \ge 2(m+2)/y = 40.00002`, which changes no row of the table. In H4 the correction is `\ln(1 + 2/m)`, below 10^{-100} at every tabulated L; state that and keep the row.

**E2 (finding 2), lines 890 to 893.**
Old: `Theorem A does not carry this residual. It consumes Corollary 1 at its statement, and Lemma 1's proof by citation to Halberstam and Richert sits inside a refereed paper, which is what "published theorem consumed as a theorem" means.`
New: `Both theorems consume Corollary 1 at its statement, Theorem A at $\kappa = 2$ and $z = \sqrt{m}$, Theorem B at $\kappa = 4$ and $z = \sqrt{y}$, and Lemma 1's proof by citation to Halberstam and Richert sits inside a refereed paper, which is what "published theorem consumed as a theorem" means. The residuals of this subsection are therefore common to the two theorems.`

**E3 (finding 3), line 622.**
Old: `| H5, smooth count | $\ln 2 + \ln(m/y) + \ln\rho(u) + \ln 3 + \ln L < 0$ | §6.5 |`
New: `| H5, smooth count | $\ln 2 + \ln(m/y) + \ln\rho(u) + \ln 12 + \ln L < 0$, with $\rho$ by de Bruijn's asymptotic | §6.5 and the budget $y/(4\ln y) + 2\Psi + O(\sqrt y) \le y/(3 \ln y)$ of §6.5's last line |`
(and update `attack-kk-substitution.js` line 328 and 522, `Math.log(3)` -> `Math.log(12)`, re-embed; the table's five y_0 values will not change, since H2 binds and H5's slack is 17.3 in the logarithm at A = 4.05).

**E4 (finding 4), line 620.**
Old: `| H3, $z_1 < \sqrt{y}$ | $2\ln\ln L < A \ln L$ | §4, bands 2 and 3 disjoint |`
New: `| H3, $z_1 < \sqrt{y}$ | $2\ln\ln L < A \ln L$ | §6.3, band 2 lies inside the sieve range $p \le \sqrt y$ of (6.3) and of Proposition 3(c) |`

**E5 (finding 14), lines 256 to 259.**
Old: `Theorem B is INFERRED throughout: it re-derives the inside of someone else's published proof rather than consuming its statements, which is a weaker form of custody than Theorem A's, and it must never be quoted without the derivation named.`
New: `Theorem B is INFERRED at the composition, like Theorem A, and its sieve step consumes the same printed statement (Corollary 1). It sits below Theorem A on three counts: one ingredient, the smooth-number estimate of §6.5, is consumed without an artifact (§12, [MEMORY]); its threshold is a floor with every implied constant set to 1 (§8); and its construction cannot be exhibited at any computable scale (§10). It must never be quoted without the derivation named.`
Matching changes: line 35 to 37, `and the argument re-derives the inside of a published proof rather than consuming its statements` -> `and the argument follows the source's construction while proving each step here, consuming the source's Corollary 1 at its statement`; line 675 to 676, `Theorem B reads the inside of a published proof. Theorem A does not: every ingredient is consumed at its printed statement` -> `Theorem B follows a published construction and proves each step here, consuming one estimate without an artifact. Theorem A consumes every ingredient at its printed statement`.

**E6 (finding 5), after line 623.**
Add: `| H7, $z \ll X$ as $\sqrt{y} \le m$ | $\ln B + 4 \ln\ell\ell - 3 \ln L - 2 \ln\ell\ell\ell < L/2$ | §6.1, the $z \ll X$ discharge; slack by 163 at $L = 308.67$, binds only for $\ln B > 163$ |`
and at line 625, `all six hold` -> `all seven hold`; line 614, `Every hypothesis used above is an explicit inequality` stands.

**E7 (finding 6), lines 636 to 637.**
Old: `because it enters only H4, which is slack.`
New: `because it enters only H4, H5 and H7, all of which are slack; the table is the same for every $B$ with $1 \le B \le 10^{70}$, and the runs use $B = 10$.`

**E8 (finding 8), line 561 to 563.**
Old: `taking $B$ large against $A$ gives $S(m, \Omega) \le y/(4 \ln y)$.`
New: `taking $B$ large against $A$ gives $S(m, \Omega) \le y/(4 \ln y)$; with the ledger constant $-2\ln 2 + 2M - 1/2 = -1.3633$ and the implied constant set to 1, this asks $B \ge 4 e^{1.3633} A^4$, about $4.2 \times 10^3$ at $A = 4.05$, and §8 shows that no tabulated threshold depends on $B$ in that range.`

**E9 (finding 7), line 504 to 506.**
Old: `A Selberg-form bound (Richert Theorem 11.1, Halberstam and Richert Theorem 4.1) would instead carry $\sum_{d \le \xi^2,\ d \mid P(z)} 3^{\omega(d)} |r_d| \ll \xi^2 (\ln \xi)^{3\kappa - 1}$ and, at the naive support $\xi = \sqrt{y}$,`
New: `A Selberg-form bound (Richert Theorem 11.1, Halberstam and Richert Theorem 4.1), sieving at a level $z = \xi$, would instead carry the remainder $\sum_{d \le \xi^2,\ d \mid P(\xi)} 3^{\omega(d)} |r_d| \ll \xi^2 (\ln \xi)^{3\kappa - 1}$ and, at the naive choice $\xi = \sqrt{y}$,`

**E10 (finding 9), line 573.**
Old: `so $\Psi(m, z_1) \approx m (\ln y)^{-A}$`
New: `so $\Psi(m, z_1) = m (\ln y)^{-A + o(1)}$, the $o(1)$ of order $\ln\ln\ln\ln y/\ln\ln\ln y$,`

**E11 (finding 10), lines 877 to 879.**
Old: `the opposite direction from the "$\xi < z$" that §6.2 repairs), and the "one sieve dimension wide" margin stated above is not a property of the theorem actually consumed:`
New: `the opposite direction from the "$\xi < z$" the earlier text of §6.2 imposed), and the "one sieve dimension wide" margin that text claimed is not a property of the theorem actually consumed:`

**E12 (finding 16), lines 497 to 501.**
Old: `happens inside the proof of the theorem cited and is booked as the $A$-dependence of its constant.`
New: `is, on the reconstruction in `research/history/reviews-0907/06` finding 1, internal to the proof of the theorem cited, where Richert's text says only "one readily obtains", and appears as the $A$-dependence of its constant.`

**E13 (finding 13), line 464 to 466.**
Old: `$g$ multiplicative, $g(p) \le \kappa$, $g(p) < p$ for all primes, $z \ll X$, and an implied constant depending on $\kappa$ alone.`
New: `$g$ multiplicative, $g(p) \le \kappa$, $g(p) < p$ for all primes, $|r_d| \le g(d)$ for every $d \mid P(z)$, $z \ll X$, and an implied constant depending on $\kappa$ alone.`

**E14 (finding 12).** Relabel `\tag{6.3}` at 519 as `\tag{6.2}` and the two citations at 551 and 646; or leave with a note. Either is fine.

**E15 (finding 11), optional.** Move lines 836 to 839 and the sentence at 884 to 887 ("On its strength, after a dependency review and a red team ... demoted to a remark on 2026-09-07") to the CHANGELOG, which already carries them; keep in §11.2 only the current state and the pointer to `reviews-0907/05`, `06`.

## 8. Disposition of the ranked claim and the two unverified items, within scope

- Ranked claim 1: VERIFIED within stated scope. Lemma 1 and Corollary 1 read here at extracted text carry no support parameter and no remainder sum; Richert 11.3 and the chapter note read here at extracted text match Lemma 1 term for term; Theorem B's sieve step consumes Corollary 1 at z = sqrt(y) with every hypothesis discharged (finding 15); §6.2 is consumed by nothing (findings 17, 18). Conditional on the unread 1974 page, as the manuscript says. The consequence column of the review request ("Theorem A is affected equally") is correct, and the manuscript contradicts it at 890 to 893 (finding 2).
- Unverified item 2 (Richert 11.3 proved as stated): UNRESOLVED and unchanged. The statement is confirmed; the proof is a pointer to Theorem 9.1 and (11.5); the manuscript's remark states the reconstruction as fact (finding 16, edit E12).
- Unverified item 6: does not touch Theorem B.
