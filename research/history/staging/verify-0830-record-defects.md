# Three record defects verified at the producer: the mis-doubled X2 group CONFIRMED to every digit, the tail's "R + 1/2" AMENDED (right for the head, wrong for the tail, and the tail's own constant is not 3 either), the head's 5.3 percent CONFIRMED as a pooling artefact with the mechanism half-derived and the half-decade "alternating sign" not surviving the same de-pooling

<!-- ledger
id: Q-verify-record-defects-0830
status: ANSWERED
todo: Z4, 9
question: Do the three defect claims of 2026-08-30 (attack-0830-varE-identification.md sec.8 on the doubled X2 column; attack-0830-tail-derivation.md sec.7 on the corpus's "R + 1/2"; attack-0830-head-remainder.md sec.1 on the decade-pooled Delta = 0.6214) reproduce on independent code from the definitions, and which of the corrections they list apply?
verdict: Claim 1 CONFIRMED: the corpus delta*X2 column is the positive half of the p | h-2 pattern doubled, that pattern's mirror is the p | h+2 pattern (W-(-h) = W+(h) exactly, W-(h) != W-(-h) at 9 to 900,679 shifts), the group sum 2X2 reads -0.5603 .. 0.1846 at x = 7..19 against 5.7147 .. 5.3266, and Xmix is overstated 2.305x at x = 19 (6.9x at x = 7); X, X1 untouched. Claim 2 AMENDED: R + 5/2 and R + 3 are exact for the tail convention (all and odd origins, asserted at x = 7..23) and t/(R + 3) = 1.0228, but head-residual-factor.md:70 is the HEAD's forward convention where R + 1/2 and R + 1 are exact, so that correction does not apply; and p'^2 is 1 mod 6, where the tail constant is 5 (t/(R + 5) = 1.0181), with the class null (1.0157) the matched figure, so 1.0228 is one unmatched convention replacing another. Claim 3 CONFIRMED as an artefact, AMENDED on mechanism and on the half-decade reading: 0.6214 pooled against 0.6592, 0.6705, 0.6736 at 2, 4, 8 sub-windows; the between-slope (Simpson) piece the note derives is half of the pooling term (0.0187 of 0.0378 at halves, 0.0261 of 0.0522 at eighths), the other half is the within slope's own fall with height weighted by Var(g); and re-reading the halves from their eighths puts HL BELOW the measurement at 5 of 6 half-decades by 2.5 to 3.4 percent at the top decade, so "within 1.6 s.e., sign alternating" is itself a pooled statement.
-->

> **RIDER 2026-08-30 (orchestrator, from `redteam-0830-slack.md`, which
> reproduced every recomputable figure of this note on independent code with
> 0 assertion failures).** Four sentences do not survive as written.
> (1) REFUTED: §316's replacement queued for `head-residual-hl3.md` §0, "the
> pooled value sits 0.038 to 0.052 below the sub-window mean at all three
> decades", is the TOP decade's range only; measured −0.0455/−0.0592/−0.0655
> at [1e6, 1e7) and −0.0524/−0.0706/−0.0757 at [1e5, 1e6). This note's own
> falsifier row §372 has the right range; the wrong half is the one that was
> queued. Corrected in the rider on that note.
> (2) §379's un-measured "+0.005" residual inside the eighths measures
> +0.0004 at sixteenths, which firms up the conclusion.
> (3) The "class null is the matched figure" ruling is matched on residue
> class only, not on roughness, which is the property the record's surplus is
> attributed to: p′² is coprime to every q ≤ p′, and E_rc − R reads 5.6714 →
> 7.5357 at x = 7..29 against the class null's 6.0336.
> (4) §207-214's DO-NOT-APPLY ruling on `head-residual-factor.md`:70 STANDS,
> re-checked at the record.

*(2026-08-30, staging. Producer:
`research/history/staging/verify-0830-record-defects.js`, embedded via
`qc/embed.js`, 75 output lines. No existing file edited, no git command run.
Every number below is in the producer's OUTPUT block (cited as OUTPUT and a
line of the `.js`) or is quoted from an embedded artifact by file and line.
Calibration per claim: PROVEN, VERIFIED, MEASURED, HEURISTIC, OPEN, REFUTED.
The producer shares no line with `varE-theta2-step.js`, `zone-tail-02.js`,
`head-residual-hl3.js` or the three attack producers: W(h) is built from the
per-prime pair counts of `varE-spectral.md` §1 and checked against a
brute-force pair count on the 990-tooth comb mod 30030; the tile is sieved
from gcd(a(a+2), x#) = 1 and every origin is visited; the head window is a
full sieve to 1e8 + 4.)*

## 0. The rulings first, with what they do not do

| claim | verdict | the number on each side | replacement, target |
|---|---|---|---|
| 1. `varE-theta2-step.js` doubles the positive half of one shift pattern; 2X2 is O(1) and small; Xmix overstated ~2.3x | **CONFIRMED** (VERIFIED at x = 7..19 to every printed digit) | corpus column delta*X2 = 0.094199 .. 0.011379 reproduced by the doubled half; group sum delta*X2 = -0.009235, 0.004509, 0.001365, 0.000736, 0.000394; 2X2 = -0.5603, 0.5304, 0.2694, 0.2314, 0.1846 against 2X2c = 5.7147 .. 5.3266; corpus Xmix / true Xmix = 6.92, 2.87, 3.02, 2.58, 2.31 (OUTPUT lines 316-328) | §1.3, five targets graded |
| 2. "R + 1/2" is the a ≤ o convention; the tail's constants are 5/2 and 3; t/R re-reads 1.0228 | **AMENDED** | tail (a + 2 < o): all origins R + 2.5000, odd R + 3.0000, origins 1 mod 6 R + 5.0000, classes {1,19} mod 30 R + 5.6000 .. 6.0078; head (a > o): all R + 0.5000, odd R + 1.0000; t/(R+1/2) = 1.0286, t/(R+3) = 1.0228, t/(R+5) = 1.0181, t/classNull = 1.0157 (OUTPUT lines 342-350) | §2.3: `zone-tail-02.js:500/799` AMEND; `head-residual-factor.md:70` DO NOT APPLY; the tail note's own sentence AMEND |
| 3. Delta_meas = 0.6214 is a decade-pooling artefact; halves 0.6848, 0.6500; quarters 0.7203 → 0.6565; HL within 1.6 s.e. at half-decade resolution, sign alternating | **CONFIRMED** as artefact, **AMENDED** on mechanism and on the half-decade reading | pooled 0.6214 ± 0.0060; halves 0.6848 ± 0.0111, 0.6500 ± 0.0070; quarters 0.7203, 0.6842, 0.6677, 0.6565; eighths' mean 0.6736; pooling term -0.0378, -0.0491, -0.0522 at 2, 4, 8 sub-windows, of which the between-slope piece is 0.0187, 0.0245, 0.0261; halves re-read from eighths 0.7005 and 0.6638 against HL 0.6768 and 0.6472 (OUTPUT lines 373-382) | §3.3: hl3 §0 and §6 replacements; `destroyer-census-01.md` §6 carries no Delta sentence, no edit |

- **Nothing here moves an exponent, opens a route, or changes any ledger
  verdict on Z2.** All three objects are off the critical path (the theta = 2
  identification step of lim Var/E; the tail's and the head's origin
  constants).
- **What this verification does not do.** It does not rebuild the attack
  note's conductor-band split (its PART C: the "82 % below 2L" and the "18 %"
  clauses), does not read Henriot, and does not rerun HL's pipeline; the
  half-decade Delta_HL values are quoted from
  `attack-0830-head-remainder.js:848-878`. x = 23 is not rebuilt for claim 1
  (per-h route, 3.7e7 shifts by 1745 primes).

## 1. Claim 1: the doubled half

### 1.1 The definitions used, and the custody

From `varE-spectral.md` §1 (lines 79-86) and `varE-theta2-step.md` §1, §3, not
from the code under test: the comb survives in E_2 = {1}, E_3 = {2}, E_5 =
{1, 2}, E_p = Z_p \ {0, −2} for 7 ≤ p ≤ y; f_p(h) = p·ρ_p(h)/|E_p|² with
ρ_p(h) = #{a ∈ E_p : a + h ∈ E_p}; W(h) = Π_p f_p(h);
X = Σ_{|h|<L} (1 − |h|/L)(W(h) − 1). The producer counts ρ_p per prime by
brute force and checks, at x = 7, that M·ρ(h)/|E|² on the full 990-tooth comb
mod M = 30030 equals Π_p f_p(h) at every h mod M, to 3.6e-15 (OUTPUT line
312). Then, for p ≥ 7, f_p(h) = f_p^gen·(1 + A_p[p | h] + B_p[p | h−2] +
B_p[p | h+2]) with A_p, B_p read off the counted tables (f_p(2) = f_p(−2)
asserted at every prime), and the three groups of `varE-theta2-step.md` §3
are the products that keep one bracket each: W1 = (small-prime pattern)·D·
Π_{p|h}(1 + A_p), W− = …·Π_{p|h−2}(1 + B_p), W+ = …·Π_{p|h+2}(1 + B_p),
each summed with its own mean (β1, β2) subtracted over every |h| < L. The
step note's §3 names "X2 each of the two groups where every prime takes
p | h−2 or p | h+2", so X2− = Σ(1 − |h|/L)(W−(h) − β2) over ALL |h| < L is
the group as defined, and X2+ likewise. δ·X reproduces the corpus column at
all five levels to the printed digit (0.152075, 0.256267, 0.299499, 0.326772,
0.347302, asserted at 2e-6) and so does δ·X1 (0.205517 .. 0.363348), OUTPUT
lines 316-320. The corpus X_dec is Σ(1 − |h|/L)(V(h) − 1) with V even
(`varE-theta2-step.md` §1) and passes through no shift group; not
recomputed, not affected.

### 1.2 The measurement

1. **The doubling reproduces the corpus column, and is not a group.**
   X2c = [h = 0] + 2·Σ_{h>0}(1 − h/L)(W−(h) − β2) gives δ·X2c = 0.094199,
   0.047843, 0.027019, 0.017012, 0.011379 at x = 7..19, the corpus column to
   six decimals (OUTPUT lines 316-320). The mirror identity W−(−h) = W+(h)
   holds exactly (max |W−(−h) − W+(h)| = 0.0e+0), and W−(h) ≠ W−(−h) at 9,
   159, 2444, 45296, 900679 of the L/6 − 1 positive shifts. So the doubled
   half is Σ_{h>0} W− + Σ_{h<0} W+, as the attack note says (its §2). VERIFIED.
2. **The group sums.** X2− = X2+ (asserted, mirror symmetry); δ·X2 =
   −0.009235, 0.004509, 0.001365, 0.000736, 0.000394; 2X2 = −0.5603, 0.5304,
   0.2694, 0.2314, 0.1846, against 2X2c = 5.7147, 5.6281, 5.3331, 5.3519,
   5.3266 (OUTPUT lines 316-328). Every figure of the attack note's §2 table
   (X2c, X2, δ·X2) reproduces to the printed digit. VERIFIED.
3. **Xmix.** The corpus-style Xmix = X − X1 − 2X2c reproduces the corpus
   column (−0.241840 .. −0.038804, asserted at 2e-6); the true Xmix = X − X1
   − X2− − X2+ reads δ·Xmix = −0.034971, −0.046368, −0.025439, −0.020542,
   −0.016835, corpus/true = 6.92, 2.87, 3.02, 2.58, 2.31, and Xmix/ln y =
   −0.4136, −0.7084, −0.4872, −0.4923, −0.4900 (OUTPUT lines 324-328). The
   attack note's "overstated ~2.3x" is the x = 19 ratio; at x = 7 it is 6.9x,
   and "−0.49 ln y" is the three top levels, with x = 11 at −0.71, so the
   coefficient is MEASURED on three levels, not settled.
4. **The bound.** |2X2| ≤ 60·Π p(p−3)/(p−2)² (`varE-theta2-proof.md` §3,
   its bound column 137.73, 173.68, 211.82 at x = 13, 17, 19, lines 199-201,
   reproduced here) is loose by 511.2, 750.6, 1147.6 against the group sum
   and by 25.8, 32.5, 39.8 against the doubled half (OUTPUT lines 331-335);
   the corpus's "14 to 48" is the doubled-half column at x = 7..23.
   MEASURED; the bound itself is not touched.

### 1.3 The five corrections, graded

1. **`varE-theta2-step.js` PART 3, `varE-theta2-step.md` §5 (lines 222-225)
   and §8 row "X2 = O(1), Xmix the slow half": APPLY.** Replacement for
   lines 222-225: "The two shift groups separately: the group sum `delta*X2`
   reads −0.009235, 0.004509, 0.001365, 0.000736, 0.000394 at x = 7..19
   (`2X2` = −0.5603 .. 0.1846, O(1) and falling; the column this note first
   carried, 0.094199 .. 0.007968, doubled the positive half of one pattern
   and is withdrawn, `verify-0830-record-defects.md` §1); `delta*Xmix` runs
   −0.034971 .. −0.016835 over the same levels, `Xmix = −0.49 ln y` on the
   top three, and is the slower of the two." The x = 23 entries of both
   columns are NOT recomputed here; the producer's one-line fix (sum the two
   patterns instead of doubling one) and a re-embed give them. The §8 row's
   rung is unchanged (MEASURED, no derivation).
2. **`varE-theta2-proof.md` §0, §3, §5, §7 (lines 61, 204-205, 314, 431,
   457): APPLY, AMENDED numbers.** "loose by a factor 14 to 48 against the
   measured 2X2 = 5.3" → "loose by a factor 511 to 1148 against the measured
   group sum 2X2 = 0.2694, 0.2314, 0.1846 at x = 13, 17, 19 (the earlier
   5.3 was a doubled half-pattern, `verify-0830-record-defects.md` §1)";
   "flat near 5.3, so the truth is O(1)" → "O(1) and falling, 0.27 → 0.18
   over x = 13..19"; line 314's "Xmix = −9.78 against ln y = 9.611" → "Xmix
   = −3.94 at x = 19 against ln y = 8.042, coefficient −0.49 on three levels;
   the x = 23 value is not recomputed". The PROVEN status of the bound is
   untouched.
3. **`paper/variance-note.md` §10, lines 771-772: APPLY** the same
   replacement as item 2 for "loose by a factor 14 to 48 against the measured
   2X_2 = 5.3". The second half of the attack note's item 3 (the §6 display's
   n > 2L restriction "would close 18 % of the measured remainder") is NOT
   RULED HERE: it rests on the conductor-band split of that note's PART C,
   which this verification did not rebuild. AMEND to cite it as that note's
   measurement, unverified.
4. **`lit-scourfield-2008.md` §1 and `SEARCH-CONVENTIONS.md` row 69 (the
   moduli range): NOT RULED HERE.** Not an X2 matter; it depends on the
   conductor-band split and on Henriot's corollary, neither reached.
5. **`varE-spectral.md` ledger and §0 ("TWO open steps"): APPLY.**
   `research/history/staging/varE-limit-theorem.md` exists and its ledger
   (lines 3-9) states "Step 2 of the two is CLOSED: the decoupled model's
   limit is exactly Pr[GD(2) > u] with NO correction term"; the spectral
   note's line 8 and its §8 row (line 442) should cite it. Whether that
   theorem survives review is that note's HELD status, not this
   verification's.

## 2. Claim 2: whose convention is "R + 1/2"

### 2.1 The constants by hand, one line each

Openers a_1 < … < a_D mod W, gaps g_i, Σ g_i = W, R = Σ g_i²/2W. Every
opener is odd and 2 mod 3, so a_i ≡ 5 mod 6 and 6 | g_i (x ≥ 5).

- Tail, a + 2 < o, all origins: gap i serves o = a_i + 3, …, a_i + 2 + g_i,
  distances 3..g_i + 2, so E = Σ g_i(g_i + 5)/2 / W = R + 5/2.
- Tail, odd origins: distances 4, 6, …, g_i + 2, count g_i/2, mean g_i/2 + 3,
  so E = Σ (g_i/2)(g_i/2 + 3)/(W/2) = R + 3.
- Tail, origins ≡ 1 mod 6 (the class p'² occupies for p' ≥ 5): o − a_i ≡ 2
  mod 6, distances 8, 14, …, g_i + 2, count g_i/6, mean g_i/2 + 5, so
  E = R + 5.
- Head, a > o (the head's convention, `head-residual-factor.md` §1: "the
  first twin opener strictly above p, minus p"), all origins: o ∈ [a_i,
  a_{i+1}), distances 1..g_i, E = R + 1/2; odd origins: 2, 4, …, g_i, E = R + 1.
- Backward a < o ≤ a': distances 1..g, R + 1/2; backward a ≤ o < a':
  0..g − 1, R − 1/2.

So "R + 1/2" is exact for two conventions (forward strict, all integers;
backward a < o, all integers) and for neither tail population.

### 2.2 The direct summation

The producer sieves T_x for x = 7..23 (D = 15 .. 7,952,175 openers, asserted
= Π(q − 2)), walks every origin o in [0, W) with a pointer into the opener
list, and accumulates the backward distance under a + 2 < o, a < o, a ≤ o and
the forward distance under a > o, by origin class. Asserted at every level to
1e-9: tail,all = R + 2.5; tail,odd = R + 3; tail,1 mod 6 = R + 5; head,all =
R + 0.5; head,odd = R + 1; backward a < o = R + 0.5; a ≤ o = R − 0.5 (OUTPUT
lines 342-348). The class-{1,19}-mod-30 tail mean reproduces the tail note's
§4 table at all six levels to four decimals (14.4286, 16.8442, 19.5235,
22.0136, 24.5294, 26.7880; E_cls − R = 5.6000 → 6.0078), which is that
note's own custody check passed on a second implementation. The rough
(coprime-to-W) tail origin reads R + 4.9214 → 5.9604, printed, not used.
VERIFIED, all of it; the identities are PROVEN by the one-line sums above.

On the record's top band (t = 447.26, R_shell = 434.31, classNull = 440.36,
`zone-tail-02.js:796-798`): t/R_shell = 1.0298, t/(R + 1/2) = 1.0286 (shift
0.0012, the figure line 799 prints), t/(R + 5/2) = 1.0239, t/(R + 3) = 1.0228
(shift 0.0071), t/(R + 5) = 1.0181, t/classNull = 1.0157 with classNull − R =
6.05 (OUTPUT line 350).

### 2.3 Sentence by sentence

**Verdict: AMENDED.** The arithmetic of the claim is right (5/2, 3, 1.0228)
and its two targets are not the same case.

- **`zone-tail-02.js:500`, printed at :799**: "R + 1/2, the discrete-
  consistent continuum correction: it shifts t/R by 0.0012 at this R, which
  is below the fourth digit." The object there is the tail (t/R), whose
  origin p'² is odd, ≡ 1 mod 6 and in {1, 19} mod 30, and whose convention is
  a + 2 < o. R + 1/2 is not that correction under any of the tail's
  populations; the "below the fourth digit" conclusion fails (0.0071 at R + 3,
  0.0116 at R + 5). The record itself already carries the matched comparator
  on the same line block (classNull, t/classNull = 1.0157) and already
  records the 0.5 ground as failed (`zone-tail-02-0829.md:546-548`). AMEND;
  the sentence is generated by code line 500, so the edit is to the code and
  needs a re-embed, or a rider in `zone-tail-02-0829.md` §7 pointing here.
  Replacement: "R + c, the discrete correction for the tail's origin: c = 1/2
  is the all-integer a < o convention and is not the tail's; under a + 2 < o
  the constant is 5/2 for all origins, 3 for odd origins, 5 for origins
  1 mod 6, and the class null carries the matched value (classNull − R_shell =
  6.05). t/R re-reads 1.0228 against R + 3 and 1.0181 against R + 5; the
  matched figure is t/classNull = 1.0157 (`verify-0830-record-defects.md`
  §2)."
- **`head-residual-factor.md:70`** ("A discrete uniform integer origin sees
  R + 1/2 exactly, an odd origin R + 1"): **DO NOT APPLY.** The sentence is
  about F(p), the head's forward distance under the head's own strict
  convention (its line 60-61), and R + 1/2, R + 1 are exact there at every
  level (§2.2). The tail note's §7 item 5 misnames this target; the same
  sentence recurs in `destroyer-census-01.md:215` and
  `attack-0830-head-remainder.md` §2a ("the uniform-integer origin is R + 1/2
  exactly at every level (asserted)"), both about the head, both correct.
- **The tail note's own text**, §2a lines 129-131 ("Under the convention
  a ≤ o the distances are 1, …, g_i and the constant is 1/2") and §7 item 5:
  AMEND. Distances 1..g belong to a < o ≤ a' (a ≤ o < a' gives 0..g − 1 and
  −1/2); strike `head-residual-factor.md:70` from item 5; and add to §0's
  "t/(R_shell + 3) = 1.0228" (lines 76-77) that the odd-origin constant is
  not the tail's matched one either: p'² ≡ 1 mod 6 gives R + 5 and 1.0181,
  and the class null, which the note's own §4 derives (E_cls − R → 6.03),
  gives 1.0157. The ledger verdict's last clause ("under the tail's own the
  constants are 5/2 and 3") is true as stated and incomplete in the same way.

## 3. Claim 3: the pooled intercept

### 3.1 The estimator, reproduced

Read from `head-residual-hl3.md` §2 and `head-residual-factor.md` §1, and
matched to `head-residual-hl3.js:86-140` only for the window convention:
gaps between consecutive twin openers with both openers in [lo, hi); n_i =
primes in [a_i, a_{i+1}) (the pair included); unweighted OLS of n on g; Delta
= 2 − β; the classical intercept standard error. On a fresh full sieve to
1e8 + 4 the three decades give Delta = 0.6899 ± 0.0355, 0.6862 ± 0.0148,
0.6214 ± 0.0060 on 6944, 50810, 381331 gaps, the record's figures to the
printed digit (asserted at 1.5e-4), and the record's half- and
quarter-decades of the top window likewise (0.6848 ± 0.0111 on 101,137 gaps,
0.6500 ± 0.0070 on 280,193; 0.7203, 0.6842, 0.6677, 0.6565), OUTPUT lines
373-380. VERIFIED. Eighths of [1e7,1e8): 0.7384, 0.7103, 0.6894, 0.6856,
0.6838, 0.6620, 0.6565, 0.6614; gap-weighted means at 2, 4, 8 sub-windows
0.6592, 0.6705, 0.6736, converging from below (steps 0.011, 0.003) while the
pooled decade stays at 0.6214. The same at [1e6,1e7): 0.7316, 0.7453, 0.7516
against 0.6862; at [1e5,1e6): 0.7423, 0.7605, 0.7656 against 0.6899. The
prime density ratio across a decade is ln(1e7)/ln(1e8) = 0.8750.

### 3.2 The pooling term, decomposed exactly, and the linear-gradient derivation

Sub-windows k with gap shares w_k, means m_k = E[g], μ_k = E[n], within
variances v_k, within slopes α_k. Exact identities, asserted in the producer
against the direct pooled OLS (2 − β_pool from the identity equals the direct
value to 4 decimals at every split; the gaps straddling a cut, 1, 3, 7, are
the residual):

    α_pool = (Σ w_k α_k v_k + Σ w_k (μ_k − μ̄)(m_k − m̄)) / (V_w + B),
    V_w = Σ w_k v_k,  B = Σ w_k (m_k − m̄)²,
    Delta_pool − Σ w_k Delta_k = −[ Σ w_k α_k (m_k − m̄) + m̄ (Σ w_k α_k − α_pool) ].

**The linear-gradient derivation, by hand.** Across heights E[n] = λ E[g]
with λ ∝ 1/ln p and E[g] ∝ ln²p, so μ ∝ √m and the between-slope is
s_B = dμ/dm = λ/2. With every within slope equal to α, the pooled slope is
α − (α − λ/2)·B/(V_w + B) < α, and the intercept rises by m̄ (α − λ/2)
B/(V_w + B), so Delta_pool − Delta̅ = −m̄ (α − λ/2) B/(V_w + B) ≈
−(E[n]/2)(B/V_w) when α ≈ λ. Sign: negative, PROVEN under the two
proportionalities. Size at [1e7,1e8): −0.0190, −0.0247, −0.0262 at 2, 4, 8
sub-windows (B/(V_w + B) = 0.00358, 0.00464, 0.00493; measured between slope
0.02867, 0.02848, 0.02848 against λ/2 = 0.02836, 0.02838, 0.02838, so the
λ/2 law is VERIFIED to 1 %).

**What the derivation misses.** The measured pooling term is −0.0378, −0.0491,
−0.0522 at the same splits, twice the derived size. The producer splits the
exact bracket into the between-slope piece m̄ (α_w − s_B) B/(V_w + B) =
0.0187, 0.0245, 0.0261 and a remainder 0.0191, 0.0246, 0.0262 (OUTPUT lines
375-381). The remainder is the within slope's own gradient: α_k falls
0.05339 → 0.05018 across the halves and 0.05523 → 0.04939 across the eighths
(α ∝ λ ∝ 1/ln p), and the pooled OLS weights each sub-window's slope by its
Var(g) ∝ E[g]², so the high, low-slope sub-windows dominate, α_pool sits
below the plain mean of the α_k, and the intercept rises again by about the
same amount. Same sign, same origin (the height gradient), same order; the
attack note's §1 derivation ("the between-window slope is λ/2, half the
within slope") accounts for half of the term at every split and every decade
(0.0254/0.0524 .. 0.0353/0.0757 at [1e5,1e6); 0.0225/0.0455 .. 0.0314/0.0655
at [1e6,1e7)). MEASURED; the two-piece decomposition is an exact identity.

**The half-decade reading, de-pooled one step.** Re-reading each half-decade
as the gap-weighted mean of its four eighths (removing the half's own pooling
term to eighth resolution, with a residual of order B/V_w at eighths, about
+0.005 more): at [1e7,1e8) 0.7005 and 0.6638 against the record's half-decade
Delta_HL 0.6768 and 0.6472 (`attack-0830-head-remainder.js:872,878`), HL −
local = −0.0237 and −0.0166, i.e. HL 3.4 % and 2.5 % BELOW the measurement,
2.1 and 2.4 half-decade standard errors; at [1e6,1e7) 0.8000, 0.7337 against
0.7385, 0.7039 (−0.0615, −0.0298); at [1e5,1e6) 0.8543, 0.7320 against
0.8298, 0.7786 (−0.0245, +0.0466, the 5,035-gap window) (OUTPUT lines 362,
372, 382). Five of six half-decades put HL below the de-pooled measurement.
The half-decade comparison itself (z = −0.72, −0.39 at the top; −1.19, −0.77;
+0.10, +1.60) reproduces the attack note's "within 1.6 s.e., sign
alternating" (OUTPUT lines 357, 367, 377), and that statement inherits the
same bias the note diagnoses one level down; the note's §1 last sentence and
§3 already say the halves are "about 0.01 low". HL's pipeline pools linearly
to 0.0006 to 0.0013 on the quoted figures (gap-weighted mean of the halves
against the pooled Delta_HL), so the comparison is one-sided as claimed.

### 3.3 Sentence by sentence

**Verdict: CONFIRMED as an estimator artefact; AMENDED on the mechanism's
size and on what replaces the 5.3 %.** "5.3 % remainder, same sign across
three decades" does not survive: the decade intercepts sit 0.038 to 0.052
below their own sub-window means at every decade, and the local value at
the top decade is 0.67-0.68, above HL's 0.6545, not below it.

- **`head-residual-hl3.md` §0 lines 27-33.** Replace "HL over-predicts the
  deficit, and the miss does not shrink … 0.6545 against a measured 0.6214
  ± 0.0060, a ratio of 1.053, so HL over-predicts by 5.3 percent … the sign
  of the miss is the same at every window" with: "The decade-pooled OLS
  intercept, 0.6214 ± 0.0060 at [1e7,1e8), carries a height-gradient term:
  the decade's half-, quarter- and eighth-decade intercepts average 0.6592,
  0.6705, 0.6736, and the pooled value sits 0.038 to 0.052 below the
  sub-window mean at all three decades (`attack-0830-head-remainder.md` §1,
  `verify-0830-record-defects.md` §3). Against HL's 0.6545, which pools
  linearly, the decade ratio 1.053 is that term and not a miss. At half-decade
  resolution HL reads 0.6768, 0.6472 against 0.6848 ± 0.0111, 0.6500 ± 0.0070
  (within 0.7 s.e.); de-pooled one step further, to eighths, the measurement
  reads 0.7005, 0.6638 and HL sits 2.5 to 3.4 percent below it at about 2 s.e.
  The sign of the residual is not established at this height; its size is
  under 4 percent either way."
- **`head-residual-hl3.md` §6 lines 270-271** ("What HL leaves is 0.033 out
  of 0.621 at [1e7,1e8), 5.3 percent, same sign at three windows and at four
  cuts"): replace with "What HL leaves after the pooling term is removed is
  under 4 percent of Delta at [1e7,1e8), of undetermined sign (HL 2.5 to 3.4
  percent below the eighth-resolution measurement at about 2 s.e.;
  `verify-0830-record-defects.md` §3.2)". The ledger clause "priced by HL to
  5.3 percent with nothing fitted" → "priced by HL to under 4 percent once
  the decade-pooling term is removed". The §3 table's Delta_meas column and
  the profile figures are pooled numbers and should say so.
- **`destroyer-census-01.md` §6.** No sentence there states Delta, 0.6214 or
  the 5.3 percent; its h/R figures are ratio-of-sums per window, not the OLS
  intercept, and its (b) already carries the range-composition caveat for its
  own half-decade bands. No edit. The attack note's "owed … to
  `destroyer-census-01.md`'s reading of the record" has no target sentence
  that this verification can find.
- **`attack-0830-head-remainder.md`** itself, §1 lines 115-119 and the
  falsifier row at line 337 ("At half-decade resolution HL is within 1.6 s.e.
  at every window, sign alternating … YES"): AMEND to "at half-decade
  resolution, on values that still carry about half the eighth-resolution
  correction; de-pooled to eighths HL sits below the measurement at five of
  six windows, 2.5 to 3.4 percent at the top decade". Its §1 derivation
  ("the between-window slope … λ/2, half the within slope … about +0.03")
  gains the rider "this piece is half of the measured term at every split;
  the other half is the within slope's own fall with height, weighted by
  Var(g) in the pooled OLS". Its §3 anchoring column already reads the
  de-pooled direction (+0.024, +0.048 at the top two rows) and is consistent
  with this.

## 4. Brief errors, falsifiers, and what was not reached

**Brief checked at its records.** "−0.56 to 0.18 at x = 7..19 against the
column's 5.7 to 5.3": checks (−0.5603, 0.1846; 5.7147, 5.3266). "overstated
~2.3x": the x = 19 ratio, 2.305; 6.9x at x = 7. "E_all = R + 5/2 and E_odd =
R + 3 … asserted by direct summation over every origin at x ≤ 23": checks
here at x ≤ 23. "t/R then re-reads 1.0228": checks as arithmetic, and is the
odd-origin convention, not the matched one (§2.3). "prime density falls 10 %":
12.5 % by 1/ln p. "half-decades read 0.6848 and 0.6500, quarter-decades 0.7203
→ 0.6565": check. "between-height slope λ/2 against within slope λ": the
between slope is 0.02867 against λ/2 = 0.02836, checks; the mechanism is half
the term (§3.2). "HL is within 1.6 se at all six windows with alternating
sign": reproduces at half-decade resolution and is itself pooled. The brief's
"(Simpson-type …)" label is apt for the between-slope piece only.

| falsifier | run? |
|---|---|
| a level x ≤ 19 where the doubled half is not the corpus column, or where X2− ≠ X2+ | RUN, none; x = 23 NOT RUN |
| a tile level where any of the seven asserted constants fails at 1e-9 | RUN at x = 7..23, none |
| a decade whose pooled Delta is at or above its sub-window mean | RUN, none of three; the three decades below by 0.038 to 0.076 |
| the between-slope piece accounting for the whole term at some split | RUN at nine splits, it is 46 to 50 % at every one |
| the eighth-resolution halves landing on HL within 1 s.e. at the top decade | RUN, they do not (2.1, 2.4 s.e., HL below) |

**Not reached.** The x = 23 rebuild for claim 1 and any bound on the true
Xmix; the conductor-band split (the "82 %", "18 %" and moduli-range clauses);
HL's pipeline at eighth resolution (the half-decade Delta_HL is quoted, not
recomputed); the residual pooling term inside the eighths (order +0.005,
estimated from the 2 → 4 → 8 steps, not measured); anything at 1e12.

*Gate: `node research/qc.js --full` result recorded in the closing report;
the producer's tail verifies under `qc/embed.js --check`.*
