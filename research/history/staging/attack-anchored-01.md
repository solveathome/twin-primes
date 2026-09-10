# Anchored-arguments attack, first move: the three mechanics unified at @11 — the self-strike folds into the cofactor injection, and the floor family runs 36 to 45

<!-- ledger
id: Q-anchored-unify
status: ANSWERED
todo: A
question: Can the three anchored mechanics be unified at @11, and what floor family does the unified cap certify?
verdict: MEASURED and PROVEN-here but HELD: extending the staircase's cofactor injection to m = 1 folds the self-strike allowance into the count, the unified-cap lemma gives fresh <= capU_K <= cap_K at every depth and prime at @11 and @13, and the floor family runs 36 to 45; the x = 37 secondary is a clean negative.
-->

*(2026-08-20. First move of TODO's TOP ATTACK. Producer
`research/attack-anchored-01-unify.js`, formally embedded
(`node research/qc/embed.js research/attack-anchored-01-unify.js`, 0.4 s run,
`--check` passes), all self-tests pass; every cited number is in its OUTPUT
block or named to its source artifact in the CITED block. Legend as in
`research/sift-limit-attack.md`: **[PROVEN]** derived theorem; **[VERIFIED]**
checked computationally here; **[MEASURED]** empirical, finite range. This is
a HELD headline awaiting its adversarial pass: no live document was touched.)*

---

## HEADLINE

**The composition asked for exists, and it is one move: extend the staircase's
cofactor injection to m = 1, so the self-strike allowance s(q) disappears into
the count and starts reading the comb and the freshness conditions like every
other victim.** The resulting unified ladder is a hard per-prime cap family
(fresh ≤ capU_K ≤ cap_K asserted at every depth, every prime, @11 and @13),
its conclusion reads the anchored classes — which per the corrected quantifier
(redteam-0820-structural §2d) is exactly what escapes the advmin ceiling — and
it certifies:

| | @11 | @13 |
|---|---|---|
| class-blind ceiling (advmin) | 16 | ≤ 152 |
| published staircase floor (Thm 8) | 34 | 110 |
| **unified floor at K = 0** | **36** | **115** |
| **unified floor at full depth** | **45 = truth** (first at K = 8) | **307 = truth** (first at K = 28) |
| classic ladder's plateau, any K | 41 | 296 |

Every unified floor at @11 (36 through 45) exceeds 16, so this is **a floor
family that class-uniform caps provably cannot reach** — the win condition's
shape — and the staircase's remaining 34 → 45 gap is now fully accounted for:
the classic ladder's permanent shortfall is exactly the s(q) allowance's two
blind spots, **wheel-excluded self slots** (q = 13 and 47 at @11: slots 11 and
47 fail comb congruences mod 11 and mod 7 and never existed) and
**twin-collision shadows** (q = 19 and 43 allowance-shadow the one slot each
of 17 and 41). Waste accounting closes on the digit: 41 = 45 − 4 at @11;
17 allowances − 6 realized self slots = 11 = 307 − 296 at @13.

Second headline, the frame's own number: **the forcing ladder**. The exact
adversarial minimum with the first j scour primes anchored runs

16 → 20 → 20 → 22 → 23 → 25 → 30 → 35 → 38 → 42 → 45  (j = 0..10),

exact minima, branch-and-bound with proven union pruning, calibrated at three
externally certified points (16 two disjoint stacks; j = 1's 20 = the embedded
shard row's a = 0 cell; j = 10's 45 = the anchored truth). Anchoring q = 13
alone costs the adversary +4; every single prime costs at least +1; the
adversarial witness avoids the divisibility classes {0, 2, w, w+2} at **all
ten primes**. "Sparse but mechanically forced" now has a curve, not a slogan.

## 1. The mechanism table at @11 (task a), one line each

- **Cofactor Rigidity pins the low comb.** Below the Scour's protection
  radius 13² − 2 = 167 an anchored strike can only be a self-strike, so all
  6 comb slots there ([17, 41, 71, 101, 107, 137]) are genuine twins, and the
  anchored kills below 167 are exactly the fresh self-strikes {17, 41}.
  [PROVEN via staircase Lemma 1; VERIFIED slot by slot]
- **The mirror is exception-free on this comb.** σ(r) = W−2−r is a free
  involution on the 90 slots (45 pairs, House 11 ↔ 17, max slot 2291 =
  σ(17)), and the strike-set covariance σ(K_q(a)) = K_q(w−a) holds for **all
  300 classes of all 10 scour primes, no specials**. This upgrades the
  Mirror-Sweep Lemma's "away from at most four specials" to exact: no comb
  slot wraps. [PROVEN, one line; VERIFIED 300/300]
- **The birth canal contributes negative space.** Its carrier — the edge slot
  W−1 = 2309, House 29 — is excluded by the Natal@5 comb's construction, and
  that exclusion is exactly *why* the comb mirror is special-free. The
  one-sidedness has nothing to act on at the origin. [VERIFIED]

## 2. The unified-cap lemma (the one new mathematical step) [PROVEN]

Staircase-note Theorem 3 handles the self-strike by the additive allowance
s(q) = [q mod 30 ∈ {11, 13, 17, 19}]. But the injections r ↦ r/q (A-side)
and r ↦ (r+2)/q (B-side) extend verbatim to m = 1: a self-strike *is* the
m = 1 case, P⁻(m) is vacuous there, and the side conditions and depth-K
freshness conditions apply to v = q unchanged. Define capU_K(q) =
#A_K(m ≥ 1) + #B_K(m ≥ 1), no s(q) term. Then

  fresh(q) ≤ capU_K(q) ≤ cap_K(q)  for every K,

the first inequality by Theorem 3's own injection with m = 1 admitted, the
second because the m = 1 term passes its side conditions only when s(q) = 1.
At full depth the injection is a bijection and capU(q) = fresh(q) exactly —
asserted per prime at both levels. The m = 1 term now reads the comb (killing
blind spot (a) at K = 0 — this is why the floor moves 34 → 36 and 110 → 115
before any freshness modulus is spent) and reads the freshness conditions
(killing blind spot (b) once q − 2 enters the pool).

## 3. What the mirror does and does not certify (task b/c, refutations first)

- **REFUTED as an improvement channel:** symmetrization max(F(a), F(σa))
  gains identically 0 — every cap family here is itself mirror-covariant
  (the co-anchored point's fresh vector is identical per prime; 500/500
  seeded random class vectors verify survivors(a) = survivors(σa)).
- What covariance **does** give, verified: the embedded advmin shard row
  [20,17,18,18,18,18,18,18,17,20,16,21,16] is a perfect palindrome under
  a ↦ 9 − a mod 13 (13/13 cells — sitting unremarked in that artifact); the
  witness pairs with a second 16-survivor witness; the unique mirror-fixed
  assignment (2a_q ≡ w_q) scores 48, so no mirror-symmetric adversary
  attains the optimum; and counts transfer while sets do not (anchored
  survivor set ∩ its σ-image = 26 of 45; 13 of 45 mirror pairs twin-twin).
- **The rigidity-free control:** class-reading caps without the cofactor
  parametrization floor at 17 (anchored, K = 0) vs the unified 36 — rigidity
  is worth 19 of the depth-0 floor. (Even so, 17 > 16: naive class-counting
  at the origin already clears the class-blind ceiling by 1.) Valid
  everywhere, weak everywhere (floor 5 at the witness); not the route.
- **DOA test passed by the survivor:** the unified/general family
  instantiated at the witness's classes reproduces the witness's own truth,
  16, at full depth, and its finite-K floors never exceed it — checked slot
  by slot (the witness's 16 survivors are listed in the OUTPUT block; only
  1 of them lies below the protection radius, against 4 anchored survivors
  there: the adversary kills low slots rigidity protects).

## 4. Honest limit, stated plainly

At full depth capU(q) = fresh(q): the family degenerates into the march,
exactly as staircase-note §7 predicts for cap_∞. "Certifies the truth" is an
exactness statement about the proof *form* — per-prime, history-blind caps
suffice with the whole scour as moduli, and nothing is left on the table —
not a cheap certificate. The non-degenerate content is the finite-K curve
(36 > 34 at K = 0, where nothing is march-like), the named-and-priced
blocking structure of the classic ladder, and the forcing ladder.

## 5. The x = 37 secondary: a clean negative [MEASURED, from cited curves]

The three instruments (c₂′(37) = 0.5939 with 0 of 10 later terms above it;
G₂/h = 8.00; h₂/G₂ = 1.341) flag the *level*; the anchored/mirror structure
at the fold does not carry it. w(31→37) = 11 (w/p = 0.297, unremarkable;
BigInt cross-check reproduces all 9 cited holesweep w values), |specials| = 4
(generic — only 5→7 has 3), the record classes {15, 33} avoid both the seam
{10, 12} and the mirror-fixed class 24, and the eye-catching seam split 90
(vs ≤ 12 at every other fold) normalizes to 0.71 of the fold's own spread
126 — adjacent to 13→17's 0.67. It is a spike-tier effect: 510 sits in the
second tier {12, 14, 34, 36}, which contains seam a = 12 *and* its mirror
36. **Verdict: the anchored/mirror layer is unexceptional at 37; the c₂′
spike is not explained here.**

## 6. NOT REACHED

- advmin@13 exact: stays parked at [21, 152]; untouched.
- The unified ladder at @17 and above (the lemma applies verbatim; the
  levels need the segmented-march engines).
- A cheap-K certificate reaching truth: K = 8 of 10 (@11) and 28 of 34
  (@13) are most of the scour; whether the depth-cost curve improves with
  level is open.
- Whether the forcing ladder's shape (the early flat 20 → 20, the late
  slope) carries a law — ten points at one level are not a law.
- Any m ≥ 2 statement; anything at the @13 witness beyond replay.

## 7. Reproduction and custody

```
node research/attack-anchored-01-unify.js                 # 0.4 s, one process
node research/qc/embed.js --check research/attack-anchored-01-unify.js
```

Custody inside the run: SEC 0 aborts unless eight artifact anchors reproduce
exactly (staircase sums 288/56/880, floors 34/110, truths 45/307, witness
replays 16/152); every cap is asserted ≥ fresh and ≤ its classic counterpart
at every K; full-depth equality capU = fresh is asserted per prime; the B&B
is calibrated at three externally certified values and budget-capped; the
mirror checks are exhaustive (300/300 classes, 500 random vectors); the nine
quoted holesweep w values are re-derived from BigInt primorials. Quoted
constants carry their source tags ([ADV], [STC], [HSW], [LAD]) at the CITED
block per the standing compute rule. The tail carries code-sha256/out-sha256
and the exact invocation.

**Integration note for the orchestrator (not acted on here):** if the
unified-cap lemma survives its adversarial pass, staircase-note §§3–4 and 7
(s(q), Lemma 2's role, the Thm 8 table) and the GLOSSARY's Mirror-Sweep note
have held correction candidates; the TODO TOP ATTACK block should also gain
the forcing curve as the frame's quantitative statement. This report edits
none of them.
