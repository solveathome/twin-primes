# Red team, 2026-08-30: the RML proof attempt, the u_sup convention ruling and the z = 41 measurement, re-derived against independent code

<!-- ledger
id: Q-redteam-0830-rml
status: ANSWERED
todo: 0
question: Do the three HELD notes of 2026-08-29 night and 2026-08-30 on the RML chain survive an adversarial pass — the six-arrow chain and the term-count cap lemma of attack-0829n-rml-proof.md, the same-object ruling and the applied replacement sentences of verify-0830-usup-convention.md, and the reflection identity, custody, pilot bounds and sealed forecast of measure-0830-rho-sup-z41.md?
verdict: The three load-bearing PROVEN claims survive independent re-derivation — the CAP lemma (every step, sine sum at worst ratio 0.585568, the constant 6, 0 per-modulus violations at z = 13, 17), the reflection identity rho~(W-3-y) = -rho~(y) (proved here and its two hypotheses verified at z = 13..37, residual <= 1.7e-10 at every position of z = 13, 17, 19), and the same-object ruling (an independent lattice reproduces the repository's term multiset exactly at z = 13..37 and its {Vabs > 0} set equals LSE's records at all ten levels); five of the seven cited exact sups and three of the five walked sup|R_H3| reproduce to <= 5.0e-7, and every figure of the sealed z = 41 forecast reproduces from the seven cited sups alone. Fourteen claims do not survive, none of them reopening a route. The load-bearing one is RML sec.2's ms_m/ask column: it measures the PROVEN mean-square BOUND sqrt(B H), not the <R_H^2>^{1/2} that REC names, the two differing by 36.53x to 200.45x on the tabled rows because <R_H^2> saturates in H while B H does not, so sec.5's ordering (ask below the Gaussian factor at u0 = 3.0 and 3.5) is an artifact and reverses at every row against the true mean square. "gauss -> 0" (sec.5) and "sup/rms <= sqrt(2 lnW) O(1) = z^{o(1)}" (sec.3) are the same error twice, against the note's own sec.0: sqrt(2 ln W) = z^{1/2+o(1)}, measured gauss 0.7905 at z = 19 falling to 0.5645 at z = 1e7, limit 1/2. "the recovery exponent is log_z(2 sup|rho~|/rms): about 0.99-1.29" quotes the truth column, which is log_z(2 sup|rho~|) alone; the quantity named measures 0.5628 to 0.6712. "REC would be moot rather than false" should read false. "u_cap -> 2s + o(1)" and "n ~ z^{2s}/polylog" are asserted where only "<=" is proven and the data cannot decide: u_cap is 4.2652 at z = 47, crosses beta_2 only at z = 53, reaches 4.4891 at z = 79, and passes u_triv from z = 53. "seven points spanning less than one octave" is 1.509 octaves, still uncorrected in three places including the ledger verdict. verify-0830's applied "polynomially many from z = 223 on" is true at every z >= 13, and its z = 331 crossover silently sets A = 1 (A fitted to LSE's own Ssat moves it to 337). No exponent moves, no route opens or closes, and no ledger verdict changes.
-->

*(Internal, HELD under the publication moratorium. Adversarial re-derivation
only: no existing file was edited and no git command was run. Producer
`research/history/staging/redteam-0830-rml.js`, formally embedded via
`qc/embed.js` (code-sha256 1bddce7e…, out-sha256 0735420c…, 185 body lines,
698.0 s); every figure below is in its OUTPUT block or is quoted from the note
under test by file and line. The producer re-implements the Rosser supports,
the CRT class, the divisor-pair lattice, V(e,e₁) and Vabs(e), Θ_e(a), CAP, the
exact period mean square, the full-period walk and the OLS fit from the
mathematics rather than from the repository's code; `sift-limit-lemmaV.js` is
loaded once, in S0, only so the two implementations can be compared term by
term. Calibration per claim: PROVEN, VERIFIED, MEASURED, WEAKENED, REFUTED.)*

## 0. VERDICT

**Four caveats first.**

1. **Nothing here moves an exponent, opens a route, closes one, or changes a
   ledger verdict.** RML(α) is open at every α and REC(s, u₀) at every (s, u₀),
   exactly where the three notes left them. The fourteen defects below are
   sentence-level; the one that is load-bearing (§1 row 5) makes a note's
   reading of its own table wrong in the **conservative** direction, so no
   claim anywhere is inflated by it.
2. **This pass could not buy the two most expensive custody rows.** The
   independent walk reaches z = 29 (W = 2.23e8). sup|ρ̃|(31) = 28.122062 and
   sup|ρ̃|(37) = 52.219092 were **not** re-derived here, and neither was
   sup|R_H3| at z = 31, 37. Five of seven and three of five is what the
   custody claim rests on after this pass.
3. **The seal on measure-0830's pre-registration is not verified, and cannot
   be by this method.** Every one of its numbers reproduces from the seven
   cited sups alone, which is consistent with pre-registration and is not
   evidence of when it was written. The out-sha256 binds the content, not the
   clock.
4. **The one genuinely new measurement here (u_cap past z = 47) supports the
   note it was built to break**, and its own calibration is the weaker of the
   two on offer: `verify-0830-usup-convention.md` §6 says the limit is "OPEN in
   both directions"; RML §4.1 writes "→ 2s + o(1)". The second is not proven,
   and the data reach z = 79.

**What survives.** The CAP lemma of RML §4.1 is PROVEN, every step, including
the one the note verified only numerically: Σ_{a=1}^{e−1} 1/sin(πa/e) ≤
e·H_{⌊(e−1)/2⌋} + 1 ≤ e(ln e + 1) follows from sin(πt) ≥ 2t on [0, ½] with the
even-e midpoint counted once, and it is violated at no e ≤ 20000 in either
form (S1(i); the note's own worst ratio 0.585568 at e = 20000 reproduces). The
reflection identity of `measure-0830-rho-sup-z41.md` §2(a) is PROVEN, and the
two hypotheses it needs — that the three-entry COMB list is closed under
(d₁, d₂) ↦ (d₂, d₁) with the weight fixed, and that the swapped class is
−2 − c mod q — hold at every term of z = 13..37 (S0). The same-object ruling
of `verify-0830-usup-convention.md` is VERIFIED from a second direction: a
lattice built here from the definitions reproduces the repository's multiset of
(w, q, c) exactly at all seven levels and its {Vabs(e) > 0} set matches LSE's
cited record counts at all ten (S0, S8).

**What does not.** Fourteen claims, tabled in §1 as rows 2-12, 17, 18 and 26.
The load-bearing one is the `ms_m`/`ask` column of RML §2: it is log_z √(B_meas·H) with B = Σ_e e·Vabs(e)²
the **proven Lemma V constant**, so it is the exponent of the proven *bound* on
the rms, not of the rms. Since ⟨R_H²⟩ saturates once H passes the correlation
length while B·H grows linearly in H, the two part by 36.53× to 200.45× on the
tabled rows (S3). Everything downstream that reads the column as an rms is off
by that factor, and §5's conclusion that "at u₀ = 3.0 and 3.5 [ask] does not
[exceed gauss]" reverses at **every** row when both sides are measured against
the same mean square.

---

## 1. The claims table

| # | claim, quoted, with file:line | re-derivation | verdict | replacement sentence |
|---|---|---|---|---|
| 1 | `attack-0829n-rml-proof.md`:215-228, the CAP lemma: "sup_x \|R_H(x)\| ≤ CAP(z) := Σ Vabs(e)·e·(ln e + 1), and CAP(z) ≤ z^{2s}·(2s ln z + 1)·6·Π(1 + 2/p)²" | every step re-derived. Sine sum: 0 violations of either form to e = 20000 (S1(i)). Σ Vabs ≤ Σ(τ−1)/q ≤ 6Π²: 0.944156→0.974695 against 79.08→242.86 against 301.686→937.665, chain holds at all seven levels (S1(ii)). e ≤ z^{2s} and #e ≤ z^{2s} at all seven. Per-modulus at z = 13, 17 and H = z³, z⁴: 0 violations; CAP/ℓ¹ = 28.62, 30.67, 36.83, 36.94 (S1(iii)) | **STANDS, PROVEN** | none |
| 2 | same:230, "u_cap = log_z((CAP + 1)/M) **→** 2s + o(1)"; :107, :109 "exponent u_triv → 2s + o(1)", "exponent u_cap → 2s + o(1)" | the proof gives ≤, not →. Measured u_cap 3.4103 (z = 13) → 4.2652 (47) → 4.4891 (79), still 1.51 under 2s; `verify-0830` §6 grades the same limit "OPEN in both directions" (S2) | **WEAKENED** | "u_cap = log_z((CAP + 1)/M) ≤ 2s + o(1); measured 3.4103 → 4.0593 at z = 13..37 and 4.2652 → 4.4891 at z = 47..79, with the limit OPEN in both directions (`verify-0830-usup-convention.md` §6)" |
| 3 | same:236-237, "the asymptote is set by the term count n ~ z^{2s}/polylog" | log_z n rises 2.6307 → 3.4678 over z = 13..79 and log_z(3\|S⁺\|\|S⁻\|) 2.9665 → 3.9031 over z = 13..211, 2.10 under 2s. At z = 211 the shortfall z^{2.10} = 7.6e4 sits under ln⁸z = 6.7e5, so the data neither confirm nor refute the shape (S2) | **WEAKENED** | "the asymptote is set by the term count, which is at most z^{2s} and is measured at z^{2.97} to z^{3.90} over z = 13..211; whether n z^{−2s} tends to a constant, to a polylog, or lower is not measured here" |
| 4 | same:117, 127-128, the `ms_m` column and "the proven mean square hands over an rms of z^{2.0551}; so the arrow must recover the sup from the rms within a factor z^{0.9553}" | ms_m = log_z √(B_meas H), B = Σ_e e Vabs(e)², reproduces the note's column to four places at all twelve rows. The **true** log_z⟨R_H²⟩^{1/2} at the same rows is 0.3162, 0.4567, 0.5089 (u₀ = 3) and 0.4245, 0.4942, 0.5732 (u₀ = 4); √(BH)/rms = 36.53 to 200.45 (S3) | **WEAKENED** | "the proven mean square hands over a bound on the rms of z^{2.0551}; the rms itself is z^{0.5732} at (3.0, 4.0, z = 31), the two parting by 163× because ⟨R_H²⟩ saturates in H while B·H does not; so the arrow must recover the sup within a factor z^{0.9553} of the **bound**, and within z^{2.3983} of the rms it names" |
| 5 | same:341-346, "the allowance ask exceeds the Gaussian factor gauss ... at every level from z = 19 at u₀ = 4.0 ... while at u₀ = 3.0 and 3.5 it does not ... So at computable z the u₀ ≤ 3.5 forms ask for less than Gaussian recovery and are the forms a sharp-law failure could touch" | with ask_b (the note's) the ordering reproduces exactly: gauss ≤ ask fails at u₀ = 3.0, 3.5 and holds at 4.0, 4.25. With ask_t = need − log_z⟨R_H²⟩^{1/2}, gauss ≤ ask at **every** row: 1.5859, 1.5193, 1.4623 (u₀ = 3) and 2.0550 (3.5) against gauss 0.7905, 0.7477, 0.7567 (S3) | **REFUTED** as a statement about the forms | "measured against the proven mean-square bound the u₀ ≤ 3.5 forms ask for less than Gaussian recovery; measured against the mean square itself they do not, at any level (ask 1.46–2.06 against gauss 0.74–0.79), so the ordering is a statement about the looseness of B·H at finite H and not about which forms a sharp-law failure could touch" |
| 6 | same:191-192, "The measured truth of the recovery exponent is log_z(2 sup\|ρ̃\|/rms): about 0.99–1.29 in the table of §2" | 0.99–1.29 is the `truth` column, log_z(2 sup\|ρ̃\|), with no rms in it. The quantity named measures 0.5628, 0.5684, 0.6003, 0.6012, 0.6393, 0.6059, 0.6646, 0.6712 across the computable rows (S3), and the walked sup\|R_H\|/rms is log_z 0.41 → 0.48 (`measure-0830-rho-sup-z41.md` §3) | **REFUTED** | "The measured truth of the recovery exponent, log_z(2 sup\|ρ̃\|/⟨R_H²⟩^{1/2}), is 0.56–0.67 over the computable rows, and the walked log_z(sup\|R_H\|/rms) is 0.41–0.48; both sit under the Gaussian 1/2 + o(1) line rather than above it" |
| 7 | same:348, "Asymptotically ask → u₀/2 − o(1) while **gauss → 0**"; same:167-168, F4 "supplies sup/rms ≤ √(2 lnW)·O(1) = **z^{o(1)}**" | ln W = θ(z) ≍ z, so 2√(2 ln W) = z^{1/2+o(1)} and gauss → 1/2. Measured 0.7905 (z = 19), 0.7392 (37), 0.6123 (10007), 0.5645 (1e7), against the closed form 0.5 + ln(2√2)/ln z to four places from z = 1e5 (S3). The note's own §0:31-32 says z^{1/2+o(1)} | **REFUTED**, twice, conclusion unaffected | ":348 → "while gauss → 1/2"; :167-168 → "it supplies sup/rms ≤ √(2 ln W)·O(1) = z^{1/2+o(1)}, against an allowance of z^{u₀/2−ε}, so F4 ⟹ REC for every fixed u₀ > 1"" |
| 8 | same:406-407, "if th(nP(z)) ever exceeded β₂, no law of any strength could deliver and REC would be **moot rather than false**" | nP(z) is a floor on the deliverable window (`rho-maximal-law.md` §2 rider 2), and REC(s, u₀) ⟹ G₂(z#) ≤ z^{u₀} by the note's own C4–C6. A floor above β₂ > u₀ contradicts that conclusion, so it falsifies REC. The bullet sits under the heading "What would falsify the arrow" | **REFUTED** | "if th(nP(z)) ever exceeded β₂, every REC(s, u₀) with u₀ < β₂ would be FALSE, since REC implies G₂(z#) ≤ z^{u₀} through C4–C6" |
| 9 | same:8 (ledger), :40, :380, "seven points spanning less than one octave of z" | log₂(37/13) = 1.5090 (S4). Already recorded as wrong by `measure-0830-rho-sup-z41.md` §0 and §7 and not applied anywhere | **REFUTED**, and the correction is two days unapplied including in `research/QUESTIONS.md` §1 | "seven points spanning 1.51 octaves of z" |
| 10 | same:166-167, "F3 = RML(α) with α < u₀ ⟹ REC (through \|R_H\| ≤ 2 sup\|ρ̃\|)" | the step needs ⟨R_H²⟩^{1/2} ≫ z^{u₀/2}, which is not in C1–C6 (C1 is an upper bound) and is false for the measured object: the rms is H-free once saturated, log_z rms = 0.5089 at (z, u₀) = (31, 3) against u₀/2 = 1.5 (S3). What holds is α ≤ u₀/2 + r − ε with r the rms exponent | **WEAKENED** | "F3 = RML(α) implies REC(s, u₀) whenever α ≤ u₀/2 + r − ε, r the exponent of ⟨R_H²⟩^{1/2}; no lower bound on r is proven anywhere, and log_z⟨R_H²⟩^{1/2} is measured at 0.3162–0.5732 over the eight computable rows of S3" |
| 11 | same:306-308, "Improving B to O(1) ... would change ms_m by O(ln ln z/ln z) and nothing in the ask column of §2" | the two halves name different B's. ms_m already uses B_meas: going to B = 1 moves it by 0.0632 → 0.0551 over z = 13..37. Going from the PROVEN 9A²(E−1) (3.592e+3 → 3.062e+4) to O(1) moves it by 1.5958 → 1.4303, which is not nothing (S3) | **WEAKENED** | "Improving the theorem's 9A²(E−1) to O(1) would move the proven rms exponent by 1.60 → 1.43 over z = 13..37; it would move ms_m, which already uses B_meas, by 0.063 → 0.055, and nothing material in the ask column" |
| 12 | same:290-292 and :445-446, "REC needs proving only for the moduli in (z^{u₀−δ}, z^{2s}]" | the ℓ¹ bound on CAP_{≤ z^{u₀−δ}} is PROVEN and reproduces (0.2199, 0.2738, 0.3948, 0.4402, 0.3884, 0.5067, 0.5346 of HM−1 at z = 13..37; the note's four figures at z = 19, 29, 31, 37 match to four places, S5). What it reduces is the consumer's form F2 (sup ≤ HM−1); REC's own statement is a ratio against ⟨R_H²⟩^{1/2} of the **whole** R_H and does not split | **WEAKENED** | "F2 needs proving only for the moduli in (z^{u₀−δ}, z^{2s}]; the rest is ℓ¹-controlled below HM − 1 for large z. REC itself is a ratio against the full remainder's mean square and does not split along the same line" |
| 13 | same:71, I3 legality: "REC at fixed u₀ ∈ (2, β₂) is legal; TPC-strength if u₀ ≤ 2 or stated uniformly in u down to 2" | matches `attack-wrongdirection-audit.md` row 10 ("the band (2, 4.2665] is genuinely legal ... both bridges transition at 2 and nowhere else") and `G2-STATE.md` §1b (G₂(x#) < x′² − 2 ⟹ TPC). The audit's own rider stands: legality "rests on the **measured** floor crossing in (31, 47], not on a proof" | **STANDS** | none |
| 14 | same:357-361 and :439, the F table and "the cap is loose by 28.62–36.94×" | F = (HM−1)/(2 sup\|ρ̃\|) reproduces to four significant figures at all rows (1.478e+1, 2.166e+1, 1.548e+1, 1.360e+1 at u₀ = 3; 2.819e+2, 6.290e+2, 4.803e+2, 5.035e+2 at u₀ = 4), as do the log_z F columns; the CAP/ℓ¹ range 28.62–36.94 is exact (S1(iii), S3) | **STANDS, MEASURED** | none |
| 15 | same:373-378, slope 2.7660 ± 0.2120, "1.10 se at u₀ = 3.0 ... 5.82 se at 4.0", leave-one-out 2.6180, control 2.500000, F4 envelope 2.5111 ± 0.1775 | reproduced exactly on the seven cited sups: 2.7660 ± 0.2120, 1.10 / 3.46 / 5.82 / 7.00 se, leave-one-out range [2.6180, 2.8598], control 2.500000, envelope 2.5111 ± 0.1775 (S4) | **STANDS, MEASURED** | none |
| 16 | `verify-0830-usup-convention.md`:30-33 and :56, the same-object ruling and "sets equal at all ten levels z = 13..47" | an independently built lattice matches the repository's (w, q, c) multiset and M exactly at z = 13..37, and #{e : Vabs(e) > 0} equals LSE's cited records at all ten levels (852, 2236, …, and 6035 of 6119 at z = 47) (S0, S8). LSE's cited **Ssat** values were not recomputed here | **STANDS, VERIFIED** | none |
| 17 | applied into `lemmaV-sup-extension.md`:485-486 via `verify-0830`:146-149, "at most min(2^{π(z)}, z^{2s}) moduli: every divisor of P(z) at z ≤ 19, 6035 of 16383 at z = 47, **polynomially many from z = 223 on**" | the counts check (6035 of 16383, S8) and z = 223 is the first prime where 2^{π(z)} passes z^{2s} (S8). But e ≤ z^{2s} for every e, so the count is at most z^{2s} at **every** z ≥ 13, measured #e/z^{2s} = 6.4e-6 → 5.7e-7 over z = 13..47 | **WEAKENED** | "…6035 of 16383 at z = 47, and at most z^{2s} at every level, which is the smaller of the two bounds from z = 223 on" |
| 18 | `verify-0830`:93-95 and applied at `lemmaV-sup-extension.md`:508-516, "a fixed per-prime factor C = 2.0516 first breaches the proven cap at z = 331" / "weaker than this from z = 331 on at C = 2.0516" | the crossover is A-dependent and A = 1 is silent. A = 1 gives z = 331; A = Ssat(47)/C^{π(47)} = 0.53934 and A = Ssat(13)/C^{π(13)} = 0.53931, the two data-fitted values, both give z = 337 (S8) | **WEAKENED** | "…is weaker than this from z = 331 on at C = 2.0516 and A = 1, or z = 337 at the A ≈ 0.539 that LSE's own Ssat column fixes" |
| 19 | `verify-0830`:245-247, "u_cap itself passes 4.2652 at z = 47, still under β₂ = 4.26645, and the level where it crosses was not computed" | computed here: u_cap = 4.2744 at z = 53, the first crossing, then 4.3138, 4.3689, 4.4007, 4.4303, 4.4756, 4.4891 to z = 79 (S2). It also passes u_triv from z = 53 (4.2744 against 4.2475), so beyond the measured range the cap is the weaker of the two proven substitutes | **STANDS**; the gap is filled here | "…u_cap passes 4.2652 at z = 47, crosses β₂ at z = 53 (4.2744) and reads 4.4891 at z = 79 (`redteam-0830-rml.js` S2)" |
| 20 | `measure-0830-rho-sup-z41.md`:73-87, the reflection identity ρ̃(W−3−y) = −ρ̃(y), marked PROVEN | re-derived independently: swap-pairing gives ρ(−y−2) = −ρ(y) − K(y), the walk recurrence ρ̃(y) − ρ̃(y−1) = M − K(y) turns it into ρ̃(−y−2) = −ρ̃(y−1). Both hypotheses hold at every term of z = 13..37. Checked at every position of z = 13, 17, 19: residual 1.9e-12, 4.2e-11, 1.7e-10, and the R_H form 9.4e-13, 2.1e-11, 8.4e-11 (S0, S6) | **STANDS, PROVEN** | none |
| 21 | same:82-84, "covers [0, W − 3] as soon as 2L ≥ W − 1" | the union of [0, L) and its image covers [0, W−3] iff 2L ≥ W − 2; the note's condition is one stronger, hence sufficient. At L = ⌈W/2⌉ + z⁴ + 4 the slack is 57132, 167052, 260652 at z = 13, 17, 19 (S6) | **STANDS** (conservative) | none |
| 22 | same:126-135 and §3 S1, the custody column and the walked sup\|R_H3\| | independent full-period walk reproduces sup\|ρ̃\| at z = 13, 17, 19, 23, 29 to 1.3e-7, 3.1e-7, 7.9e-8, 3.8e-7, 1.5e-7 (the cited values' own 6-dp rounding) and sup\|R_H3\| at z = 19, 23, 29 to 4.2e-8, 4.9e-7, 5.4e-8 (S7). z = 31 and 37 NOT BOUGHT here | **STANDS at five of seven / three of five** | none |
| 23 | same:150-151, "0.94, 1.30, 1.21, 1.05, 0.92 times sup\|ρ̃\| ... the factor 2 was 1.5 to 2.2× conservative" | 0.9397, 1.2999, 1.2072, 1.0503, 0.9161 from the two cited columns; 2/1.2999 = 1.539 and 2/0.9161 = 2.183 (S9); the first three reproduce from this pass's own walk | **STANDS** | none |
| 24 | same:225-248, the sealed pre-registration: 60.07, [47.25, 76.37], [37.16, 97.11], 1807.417, 903.71, "fifteen times", 92.36, [55.83, 77.69], [4.653, 6.476], 2.4522 ± 0.2095, 58.26, 262.53 | every figure reproduces from the seven cited sups and M(41) alone (S4), which is consistent with pre-registration and is not evidence of when it was sealed. Two roundings differ: the exclusion thresholds are 342.8 and 69.0 here against the note's 343.0 and 68.9 (0.06% and 0.14%); the pilot's 70.651250 clears 69.0 as it clears 68.9, so §6's one scored outcome is unaffected | **STANDS** | "…from above (slope + se ≤ 3.0) iff sup\|ρ̃\|(41) ≤ 69.0" |
| 25 | same:177-219 and §6, the cost extrapolation | every line reproduces to ≤ 1.2%: 19.223 h, 5.040 h, 5.417 h, 2.676 h, 4.776 h, 0.546 h, 5.360 h; pilot rate 4.523 ns; 12 segments overshoot the plan by 31,078,663 positions (the wrap chunk); half range plus wrap is 50.0001% of the period (S9) | **STANDS, MEASURED** | none |
| 26 | same:8, :37, :195, "above the 3.5 h rule" | the standing rule is ~4 h (`primeoire-compute-rule`, raised 2026-08-28), and `attack-0829n-rml-proof.md`:395 and :477 in the same wave says "the four-hour rule". Both figures, 4.8 h and 5.4 h, exceed both thresholds, so the decision is unchanged | **WEAKENED** (wording) | "above the four-hour rule" |

---

## 2. Ruling per note

### 2.1 `attack-0829n-rml-proof.md` — HELD, one PROVEN lemma confirmed, one reading refuted

**Ruling: the mathematics stands and the reading of §5 does not.** C1, C2, C5,
C6 are theorems the note does not re-prove and this pass did not re-examine
(C2 is `redteam-0829-theorem1.md`'s object; C6 is cited). C3 = REC(s, u₀) is
the only open arrow, and that identification survives. The §4.1 lemma is
PROVEN with its constant and its modulus count both correct, and the two
numerical checks the note leans on reproduce exactly (row 1). Its five named
deaths: 4.1 dies at an asymptote that is asserted, not shown (rows 2, 3); 4.2's
atom argument is elementary and correct as far as it goes, with "its best case
is already dominated" asserted rather than derived and no hypercontractive
theorem cited; 4.3's reduction is proven for the consumer's form, not for REC
(row 12), and its measured shares are exact; 4.4 confuses two constants (row
11); 4.5 is CITED throughout and was not re-priced here. What the pass changes
is §5: the ask column is an exponent against the proven bound, and the
comparison it draws against the Gaussian factor reverses when both sides are
put on the same mean square (rows 4, 5, 6, 7).

**Not changed:** the ledger verdict, except that "seven points under one
octave" in it is wrong (row 9).

### 2.2 `verify-0830-usup-convention.md` — HELD, ruling confirmed from a second implementation

**Ruling: SAME object, confirmed independently.** The note's central finding
does not depend on its own import of the repository's code: a lattice built
here from the definitions reproduces (w, q, c) and M exactly, and the modulus
set on {Vabs > 0} matches LSE's records at all ten levels (row 16). Its two
applied crossover sentences both need a rider (rows 17, 18), and the one gap it
left open — where u_cap crosses β₂ — is z = 53 (row 19). Its own §6
calibration of the u_sat limit as "OPEN in both directions" is the correct one
and is more conservative than RML §4.1's arrow.

### 2.3 `measure-0830-rho-sup-z41.md` — HELD, the engine's one PROVEN claim confirmed

**Ruling: the reflection identity is PROVEN, and the custody claim is
confirmed at every level this pass could buy.** The identity's derivation is
correct and its two hypotheses are properties of `buildTerms`'s COMB list, not
assumptions (row 20). The covering condition is conservative (row 21). The
custody column reproduces at z = 13..29 under an independently written walk
(row 22) and the z = 31, 37 rows are unre-derived here. The pre-registration
is arithmetically reproducible from public inputs; its timing is not checkable
by this method (row 24). The cost arithmetic is right; the threshold it is
compared against is misquoted (rows 25, 26). Its own correction of the octave
count is right and still unapplied upstream (row 9).

---

## 3. What would falsify this pass, and what was not reached

- **The load-bearing finding (row 5) is falsified** by a proven lower bound
  ⟨R_H²⟩ ≫ H at H = z^{u₀}, which would make √(B_meas·H) the right order for
  the rms after all. RUN in the negative direction only: the exact period mean
  square at z = 19, 29, 31 is 36.53× to 200.45× below B·H (S3), and the
  saturation mechanism (⟨R_H²⟩ → 2⟨ρ̃²⟩, H-free) is in
  `sift-limit-lemmaV.js`'s own header. NOT RUN at z ≥ 37 (O(n²) at n = 76484).
- **Rows 2 and 3 are falsified** by u_cap turning over below β₂ at some
  z > 79, or by a proven lower bound on CAP. NOT RUN above z = 79 (the lattice
  is 3.8e6 terms there and the enumeration is 2^{ω(q)} per term).
- **Row 20 is falsified** by one position where ρ̃(W−3−y) + ρ̃(y) exceeds the
  drift, or by one term whose swap is absent. RUN at every position of
  z = 13, 17, 19 and at every term of z = 13..37: none.
- **Row 22 is falsified** by an independent walk at z = 31 or 37 disagreeing
  with 28.122062 or 52.219092. NOT RUN; W = 6.47e9 and 2.01e11 against the
  2.23e8 this pass reached.
- **Row 16 is falsified** by a modulus with Vabs > 0 in one note's set and not
  the other's above z = 47. NOT RUN.
- **Not reached:** the C2 chain (L1–L5) itself, which this pass takes from
  `redteam-0829-theorem1.md`; §4.5's cited Kloosterman prices; the
  hypercontractivity literature behind §4.2; `⟨ρ̃⁴⟩`; the timing of the seal;
  and any statement about whether REC is true.

*Gate: `node research/qc.js --full` result recorded in the closing report; the
producer's tail is bound by `qc/embed.js` (code-sha256 1bddce7e…, out-sha256
0735420c…). Derived arithmetic in this note, done on embedded columns and not
by the script: the differences 2s − log_z n and 2s − u_cap, the comparison of
z^{2.10} at z = 211 against ln⁸(211) = 6.7e5 in row 3, the percentage gaps in
row 24, and the ranges quoted from the S3 columns. `embed.js --check` was NOT
bought: the re-run costs 698 s and would test determinism only, the static
code-sha256 and out-sha256 checks having already passed under `qc.js embeds`.
This note's ledger block names TODO item 0; adding
`Q-redteam-0830-rml` to that item's `Ledger:` line is the orchestrator's, since
this note may not edit `TODO.md`.*
