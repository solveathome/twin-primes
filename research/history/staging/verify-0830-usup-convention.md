# u_sup's level convention, adjudicated: `lemmaV-sup-extension.md` and `attack-0829n-rml-proof.md` §4.1 bound the same object, and the correction in passing stands against three sentences, not against the verdict

<!-- ledger
id: Q-usup-convention-0830
status: ANSWERED
todo: 0
question: Are lemmaV-sup-extension.md's u_sup and u_sat and attack-0829n-rml-proof.md sec.4.1's CAP(z) statements about the same object (level D = z^s at s = 3.0, same moduli, weights and normalisation), so that the sec.4.1 correction in passing applies, or does a level-convention mismatch void it?
verdict: SAME object, VERIFIED at the code: both notes build the lattice through buildTerms(z, z^3), the modulus sets and Vabs(e) agree to 6.9e-18 at z = 13..23 and the count convention matches at all ten levels, the cited Ssat and u_sat reproduce on the RML lattice to every printed digit at z = 13..19 and the full-level alternative does not (19.544 against 19.602 at z = 13, 45.827 against 50.314 at z = 17); so the PROVEN cap Ssat <= CAP <= z^{2s+o(1)} applies and refutes lemmaV-sup-extension.md's asymptotic prose at lines 485-486 and 508-516 (2^pi(z) moduli, a C^pi(z) theorem as the reachable end), while sec.4.1's attribution sentence overreaches by calling that note's "reading" a shape it lists as one of two indistinguishable fits and flags as its likeliest error; neither ledger verdict line changes.
-->

*(2026-08-30, staging. Producer:
`research/history/staging/verify-0830-usup-convention.js`, embedded via
`qc/embed.js`. No existing file edited, no git command run. Every
number below is in the producer's OUTPUT block or is quoted from an
embedded artifact by file and line. Calibration per claim: PROVEN, VERIFIED,
MEASURED, HEURISTIC, OPEN, REFUTED. Abbreviations: LSE =
`research/history/staging/lemmaV-sup-extension.md` with producer
`research/lemmaV-sup-extension.js`; RML =
`research/history/staging/attack-0829n-rml-proof.md` with producer
`research/history/staging/attack-0829n-rml-proof.js`.)*

## 0. The ruling first, with what it does not do

- **Nothing here moves an exponent, opens a route, or changes either note's
  ledger verdict.** RML's ledger verdict does not mention LSE; LSE's verdict
  ("plateau above β₂, or divergence, the same verdict") keeps its bottom line
  (§4 below).
- **The suspected level-convention mismatch is REFUTED at the code.** Both
  notes bound the same object at the same level: the divisor-pair lattice of
  `sift-limit-lemmaV.js` `buildTerms(z, D)` at D = z³ (s = 3.0 fixed before
  z), the same moduli, the same weights V(e₁,e₂), the same Vabs(e), the same
  main term M. LSE's cited Ssat and u_sat reproduce on RML's lattice to every
  printed digit at z = 13, 17, 19, and do not reproduce at full level (§2).
- **So RML §4.1's correction stands in substance, and is mis-aimed in its
  wording.** The PROVEN cap Ssat ≤ CAP(z) ≤ z^{2s}(2s ln z + 1)·6Π(1+2/p)²
  refutes three asymptotic sentences in LSE §4 (lines 485-486, 491-492 in
  its asymptotic clause, 508-516), and confirms the worry LSE itself put
  first under "where I am most likely wrong" (lines 690-695). It does not
  refute a "reading" of u_sup's growth as π(z)/ln z, because LSE's stated
  conclusion (THE VERDICT item 3, lines 50-56, and §3(3), lines 326-331) is that four rising shapes
  are indistinguishable on nine points; the π(z) shape is one of them, and
  the note's own text calls fixed C "not what the data show" (lines 455-456).
  §3 gives the sentence-level replacements on both sides.
- **One brief error recorded.** The brief's parenthetical "moduli e | P(z)
  with e ≤ D" is not either note's modulus set: the moduli are e | qᵢ =
  [d₁,d₂] with d₁, d₂ ≤ D, so e ≤ min(D², P(z)), and at z = 13, 17, 19 the
  set is every divisor of P(z) (max e = P(z), OUTPUT S0). The brief's other
  numbers and quotations check at their records (§5).

## 1. The two objects, side by side, quoted by line

| item | LSE | RML | same? (rung) |
|---|---|---|---|
| level | `S_LEVEL = 3.0` (`lemmaV-sup-extension.js`:93, "the level attack 1 measured at"); note lines 186-189: "e must divide some q_i = [d1,d2] with both d1, d2 ≤ D = z^s"; line 671: "Only s = 3.0 for u_sup" | `S = 3.0` (`attack-0829n-rml-proof.js`:64); note line 54: "Fix s = 3.0 ... D = z^s" | yes, VERIFIED: D = 2197, 4913, 6859, 12167 on both paths at z = 13..23 (OUTPUT S0) |
| lattice | `lemmaV-parseval.js`:104-106, `REPO.buildTerms(z, round(z^s))` | `attack-0829n-rml-proof.js`:143, `L.buildTerms(z, Math.pow(z, S))` | same function, `sift-limit-lemmaV.js`:91-106; n = 852, 2236, 4764, 9636 and M equal on both paths (S0) |
| modulus set | e \| P(z) carrying at least one V(e₁,e₂) ≠ 0 (`lemmaV-parseval.js`:117-130, the `v===0` skip); note line 418 writes "sum_{e \| P(z), e>1}" | every e \| qᵢ for some lattice term (`attack-0829n-rml-proof.js`:82-106) | equal on {Vabs(e) > 0}: sets equal at all ten levels z = 13..47 (S0, S3 "set=LSE recs"); RML's count exceeds LSE's from z = 29 (467 against 448; 6119 against 6035 at z = 47) and the excess is exactly-zero moduli, contributing 0 to Ssat and to CAP alike |
| weights | V(e₁,e₂) = Σ_{i: e \| qᵢ, gcd(e,d₁)=e₁} wᵢ/qᵢ (note line 420); Vabs(e) = Σ\|V(e₁,e₂)\| (`lemmaV-parseval.js`:54, Theorem B) | the same V; Vabs via Theorem B (note line 218) | yes, VERIFIED: max\|ΔVabs\| = 3.469e-18, 6.939e-18, 1.735e-18, 1.735e-18 at z = 13..23 (S0) |
| bounded quantity | Ssat = Σ_e Σ*_a \|Θ_e(a)\|/\|sin(πa/e)\| (note line 418); Ssup(H) with \|S_H(a/e)\| in place of 1/\|sin\| (`lemmaV-sup-extension.js`:17-18) | CAP(z) = Σ_e Vabs(e)·e·(ln e + 1) (note lines 215-216) | one chain: sup\|R_H\| ≤ Ssup(H) ≤ Ssat ≤ CAP, the last step by \|Θ_e(a)\| ≤ Vabs(e) and Σ_a 1/sin(πa/e) ≤ e(ln e + 1); Ssat ≤ CAP measured true at all ten levels (S1, S3), 0 frequencies with \|Θ\| > Vabs at z = 13..19 (S1) |
| normalisation | u_sat = ln(Ssat/M)/ln z; u_sup = ln H_sup/ln z, H_sup the first window with H·M > Ssup(H) (`lemmaV-sup-extension.js`:21-22; note lines 201-211) | u_cap = log_z((CAP + 1)/M) (note line 230) | same M; u_sat recomputed here 2.2850, 2.4623, 2.7228 = the cited column, u_cap recomputed 3.4103, 3.5850, 3.7797 = RML's S2 column (S1) |

So the level is D = z³ in both, with s fixed before z. The brief's alternative,
"s there is ln P(z)/ln z", is what the S2 column of the producer instantiates,
and LSE's numbers are not that column (§2, reading 3).

## 2. The measurement

1. **S0, the lattices are one.** Same D, n, M; modulus sets equal; per-modulus
   Vabs agreeing to 6.9e-18 or better. At z = 13, 17, 19 the modulus set is
   every divisor of P(z) (max e = 2.310e+3, 3.003e+4, 5.105e+5 = P(z), 31, 63,
   127 moduli = 2^{π(z)} − 1); at z = 23 it is 243 of 255 divisors with max e =
   8.818e+5 against P(23) = 9.700e+6 and D² = 1.480e+8. VERIFIED.
2. **S1, the objects evaluated on RML's lattice.** Ssat computed here from the
   raw terms, with no peel and no fast sine, is 1.9602e+1, 5.0314e+1, 1.2006e+2
   at z = 13, 17, 19: equal to LSE's own `supBoundTable` path and to its cited
   column to every printed digit. CAP here is 350.4593 and 1209.9555 at z = 13,
   17, RML's cited figures. Ssat ≤ CAP at every level, CAP/Ssat = 17.88, 24.05,
   22.46. VERIFIED.
3. **S2, the full-level alternative, instantiated and rejected as either
   note's object.** With every Rosser condition vacuous (D_full = P(z)·z³, so
   both supports are all divisors of P(z)), s_full = ln P(z)/ln z reads 3.0196
   and 3.6390 at z = 13, 17, and Ssat_full = 1.9544e+1, 4.5827e+1 against the
   cited 1.9602e+1, 5.0314e+1; u_sat_full = 2.2661, 2.4113 against the cited
   2.2850, 2.4623. At z = 13 the two levels nearly coincide (D = 2197 against
   P(13) = 2310), which is why the figures are close there; at z = 17 they
   part. The cap holds at full level too (CAP_full = 4.7171e+2, 1.6998e+3),
   and its exponent there, 2 s_full = 6.0391, 7.2779, is indeed of order
   z/ln z as the brief supposed; that level is used by neither note. VERIFIED.
4. **S3, the cap against the H-free exponent at all ten levels.** u_cap ≥
   u_sat at every level, 3.4103 → 4.2652 against 2.2850 → 3.4306 (z = 13..47);
   RML §4.1 had compared against u_sup to z = 37 only. The explicit bound
   z^{2s}(2s ln z + 1)·6Π(1+2/p)² sits 1.218e+9 to 2.583e+10 above the cited
   Ssat, which is why nothing in the measured range sees it. The modulus
   count is 6119 against 2^{π(z)} − 1 = 16383 at z = 47; 2^{π(z)} first
   exceeds z^{2s} at z = 223, and a fixed per-prime factor C = 2.0516 first
   breaches the proven cap at z = 331. MEASURED; the two crossings are
   arithmetic on the cited constant and the proven bound.

## 3. The ruling, sentence by sentence

**Verdict: SAME object. The correction applies. Its substance stands; its
attribution overreaches.**

### 3.1 RML §4.1, lines 241-246, and reading 3, lines 432-433

Quoted: "`lemmaV-sup-extension.md` reads u_sup's growth as "π(z)/ln z" from a
per-prime factor ~2.05 on ten points. The lemma above caps u_sup at 2s + o(1)
for every fixed s, so that growth cannot continue; the closure verdict there
("plateau above β₂, or divergence — the same verdict") is unaffected, since
2s ≥ 2(1 + √e) > β₂ at every admissible s."

- "The lemma above caps u_sup at 2s + o(1) for every fixed s": STANDS,
  PROVEN. Exactly for u_sat (Ssat ≤ CAP, §1); for u_sup up to the grid
  protocol, since every H ≥ (CAP + 1)/M has H·M > CAP ≥ Ssup(H), so the
  protocol's first closing grid point is at most one grid ratio above it,
  o(1) in the exponent.
- "reads u_sup's growth as "π(z)/ln z" ... on ten points": OVERREACHES as
  attribution. LSE line 390 lists u ~ (ln C)·π(z)/ln z as one of "two shapes
  the data cannot separate"; lines 455-456 say "C fixed is not what the data
  show either"; lines 690-695 put "the geometric-in-π(z) reading of Ssat"
  first under "where I am most likely wrong". The factor is 2.0516, the
  geometric mean of nine ratios over ten levels (line 442), and it is a
  factor on Ssat, hence on u_sat (line 452), not on u_sup directly.
- "the closure verdict there ... is unaffected": STANDS (§4).

Replacement for lines 241-246: "`lemmaV-sup-extension.md` §4 describes
Ssat's growth over z = 13..47 as geometric in π(z) (per-prime factor 2.0516,
its line 442), says the e-sum "has 2^π(z) terms" (lines 485-486), and writes
the reachable theorem as Ssat ≤ A·C^{π(z)}, hence G₂(P(z)) ≤
exp((ln C)(1+o(1)) z/ln z), "superpolynomial in z" (lines 508-516). At fixed
s the lemma above refutes the last two: the e-sum has at most z^{2s} moduli,
Ssat ≤ CAP ≤ z^{2s+o(1)}, and the reachable theorem is G₂(P(z)) ≤
z^{2s+o(1)}, polynomial, the trivial-level exponent, which is what that
note's §7 first bullet anticipated. Its measured tables stand as
measurements and its closure verdict ("plateau above β₂, or divergence —
the same verdict") is unaffected, since 2s ≥ 2(1 + √e) > β₂ at every
admissible s; the divergence disjunct is now refuted at fixed s."

Replacement for lines 432-433: "`lemmaV-sup-extension.md`'s asymptotic
prose at lines 485-486 and 508-516 (2^{π(z)} moduli; a C^{π(z)} theorem as
the reachable end) cannot hold at fixed s; its verdict does."

### 3.2 LSE, the sentences the cap refutes, each with its replacement

- **Lines 485-486**, "the e-sum has 2^π(z) terms": REFUTED at fixed s as an
  asymptotic; true as a count at z ≤ 19 and within a factor 2.7 at z = 47
  (S3). Replace with: "the e-sum runs over the divisors of some qᵢ ≤ D²,
  at most min(2^{π(z)}, z^{2s}) moduli: every divisor of P(z) at z ≤ 19,
  6035 of 16383 at z = 47, polynomially many from z = 223 on
  (`verify-0830-usup-convention.md` S3)."
- **Lines 491-492**, "the moment it is only a mean value it is too weak by a
  factor exponential in π(z)": the asymptotic clause is REFUTED at fixed s
  (the loss Ssat/sup|R| ≤ CAP/sup|R| ≤ z^{2s+o(1)}, polynomial); the
  measurement it summarises (loss growing 1.35× to 1.5× per prime over
  z = 13..47, LSE §2, §5) stands. Replace "exponential in π(z)" with
  "measured to grow geometrically over z = 13..47 and bounded at fixed s by
  z^{2s+o(1)} (`attack-0829n-rml-proof.md` §4.1)".
- **Lines 508-516**, "What is reachable as a theorem is a bound of the shape
  Ssat ≤ A·C^{π(z)} ... superpolynomial in z": REFUTED. This is the sentence
  the correction is actually about. Replace with: "What is reachable as a
  theorem at fixed s is Ssat ≤ CAP(z) ≤ z^{2s}(2s ln z + 1)·6Π_{p<z}(1+2/p)²
  (`attack-0829n-rml-proof.md` §4.1, PROVEN), giving G₂(P(z)) ≤ z^{2s+o(1)}:
  polynomial in z, exponent 6 at s = 3.0 and 2(1+√e) = 5.2974 at s ↓ 1+√e,
  the trivial-level exponent (`attack-0829n-rml-proof.md` §2 C3-triv, §4.1),
  above β₂ = 4.26645 at every admissible s. A bound of the shape Ssat ≤
  A·C^{π(z)} is weaker than this from z = 331 on at C = 2.0516 and is not
  the end of the route." The sentence that follows, "incomparably weaker
  than β₂", survives with "superpolynomial" struck: 5.2974 is above β₂ but
  not incomparably.
- **Lines 448-453**, "a per-prime factor that settles at any fixed C > 1
  gives u_sat ~ (ln C)π(z)/ln z ... which diverges": a correct conditional
  whose antecedent is now PROVEN false at fixed s (ln Ssat ≤ 2s ln z +
  O(ln ln z), so (ln Ssat)/π(z) → 0 and the average per-prime factor → 1).
  No replacement; a rider "(antecedent refuted at fixed s, `attack-0829n-
  rml-proof.md` §4.1)" suffices.
- **Lines 471-475**, "prove that d ln Ssat/d ln z falls below β₂ and stays
  there ... 4.99 rising to 6.20": stands as measured. The cap gives the
  cumulative slope from any fixed z₀ as at most 2s + o(1) = 6 + o(1), which
  a local 6.20 over five points does not contradict; it does not give
  "below β₂". No edit.

### 3.3 What in LSE is untouched

THE VERDICT items 1-4 (lines 36-66), the ladder (§2), the fits and the
asymptote profile (§3), the two-representation comparison (§5), corrections
C1-C6 (§6) and the §7 coverage bullets are measurements and extrapolations
at z ≤ 47 and are not touched by an asymptotic cap. One consistency, HEURISTIC
and one-sided: LSE §3(4)'s bounded-model asymptotes, A = 5.4635 for u_sup and
5.5649 for u_sat with "every limit compatible with the data to within a
factor 3 in RSS ... between about 4.8 and 6.2" (lines 350-352), all sit under
the proven cap 6 + o(1) at s = 3; the cap is an upper bound and says nothing
about where under it the limit lies.

## 4. Ledger verdicts

- **RML, `Q-rml-proof-0829n`: unchanged.** Its verdict line does not mention
  LSE; the parenthesis "term-by-term accounting is capped at 2s + o(1)" is
  the PROVEN lemma and is correct.
- **LSE, `Q-lemmaV-usup`: bottom line unchanged, status ANSWERED stands.** Of
  its closing disjunction "plateau above beta2, or divergence", the
  divergence disjunct is REFUTED at fixed s (u_sat ≤ 2s + o(1)); the
  "plateau above β₂" disjunct remains MEASURED only (8.70× in RSS to force
  the limit to β₂, LSE line 342; no lower bound on the limit is proven
  anywhere). The route's verdict, that this instrument does not reach below
  β₂, is what the line says and it is the same after the cap. If the
  orchestrator sharpens it, the minimal edit is to append "(divergence since
  REFUTED at fixed s by `attack-0829n-rml-proof.md` §4.1)"; no edit is
  required by this adjudication.

## 5. The brief checked at its records

- CAP(z) ≤ z^{2s}·(2s ln z + 1)·6·Π_{p<z}(1 + 2/p)²: RML lines 215-217, as
  quoted. Checks.
- "D = z^s is the level ... (moduli e | P(z) with e ≤ D ...)": BRIEF ERROR.
  The moduli are e | qᵢ = [d₁,d₂] with d₁, d₂ ≤ D, so e ≤ min(D², P(z)); at
  z = 23 max e = 8.818e+5 exceeds D = 12167 (S0).
- "concludes u_sup is capped at 2s + o(1) for every fixed s": RML line 244.
  Checks.
- "reads u_sup's growth as π(z)/ln z from a per-prime factor ~2.05 on ten
  points": RML lines 241-243 say this; the factor at LSE line 442 is 2.0516
  over nine ratios spanning ten levels. Checks as a quotation of RML.
- LSE lines 390, 452, 512: `u ~ (ln C)·π(z)/ln z`, `u_sat = ln(Ssat/M)/ln z
  ~ (ln C) pi(z)/ln z + ...`, `G2(P(z)) <= z^{(ln C) pi(z)/ln z + o(1)}` are
  at those lines. Checks.
- "'s' there is ln P(z)/ln z ~ z/ln z and the cap 2s + o(1) is itself of
  order z/ln z": the arithmetic is right at full level (2 s_full = 6.0391,
  7.2779 at z = 13, 17, S2) and the premise is REFUTED: LSE is at s = 3.0
  (§1), and its figures reproduce at s = 3.0 and not at full level (§2.3).

## 6. What would falsify this ruling, and what was not reached

- **A modulus with Vabs > 0 in one note's set and absent from the other's**
  at some z ≤ 47: RUN, none (S0, S3). At z > 47: NOT RUN, and the code gives
  no mechanism for one (both paths enumerate the divisors of the same qᵢ).
- **LSE's cited Ssat failing to reproduce on RML's lattice**: RUN at z = 13,
  17, 19, reproduces to every printed digit (S1). NOT RUN at z ≥ 23 (the
  direct sum over primitive frequencies is the cost LSE's peel removes; the
  S0 identity of the lattices makes it redundant).
- **Ssat > CAP at some level**: RUN at all ten levels, none (S3).
- **A reading of LSE under which its §4 asymptotics are at a level other
  than D = z³**: none found; every figure in LSE §2-§5 is produced at
  `S_LEVEL = 3.0`, and its §7 says "Only s = 3.0 for u_sup" (line 671).
- Not reached: how loose the cap is asymptotically (CAP/Ssat = 17.88 to
  24.05 at z = 13..19, the explicit bound 1e9 to 1e10 above Ssat; whether
  lim sup u_sat at s = 3 is 6 or something under it is OPEN in both
  directions); u_cap itself passes 4.2652 at z = 47, still under β₂ =
  4.26645, and the level where it crosses was not computed, since it says
  nothing about the truth.

*Gate: `node research/qc.js --full` result recorded in the closing report;
the producer's tail verifies under `qc/embed.js --check`.*
