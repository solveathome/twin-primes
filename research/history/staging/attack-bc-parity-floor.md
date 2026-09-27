# The census's 2 is the sifting dimension and the parity floor's 2 is not: the identification is refuted, and the constant that kills every counting grid here is 1

<!-- ledger
id: Q-bc-parity-floor
status: CLOSED
todo: none
question: Is the 2 that the census's B/C ratio limits to the same object as the parity floor's 2?
verdict: REFUTED at the first step, before any kappa-scan: the certificate dies where B/C crosses 1, not 2 (B = 503 against C = 497 at the death zone), the constant reads the sifting dimension while the threshold does not, and the parity floor's 2 cannot be this one.
-->

*(2026-08-26. Staging note; nothing here is integrated into a live document.
Producer, formally embedded: `research/attack-bc-parity-floor-01.js`
(1.3 s; code-sha256 ebb23e16..., out-sha256 871db771...,
`node research/qc/embed.js --check` green). The brief asked whether the 2 that
B/C limits to is the same object as the parity floor 2. The default position
was numerology and the default position won. Calibration per claim: PROVEN,
VERIFIED by exact computation, MEASURED, CITED.)*

**UNVERIFIED PREMISE, flagged as the brief requires.**
`history/staging/destroyer-census-01.md` is HELD and has never been red-teamed.
Its §3 is the object under test here. This note does not lean on it: the
producer recomputes §3 from an independent implementation and the recomputation
agrees (below, §1). `history/staging/attack-quadpoint-01.js` is likewise HELD
and is cited once, for a phrase, not for a number.

---

## 0. The verdict, and the number that gives it

**The identification is REFUTED.** It fails at its first step, before any
κ-scan is needed.

The brief's premise — *"Counting ends exactly where B/C reaches 2"* — is not
what happens. **[VERIFIED]** At the death zone the reading is `B = 503` against
`C = 497`, so `B/C = 1.0121`. The certificate dies where B/C crosses **1**,
which is the pigeonhole threshold and nothing else. The 2 is the ratio's
*limit*, approached long after the certificate is dead and never reached at all
inside the computable range: at the last zone in reach, `p = 9967`, the κ = 2
ratio still stands at 0.7839 of its own limit. A limit that the certified range
never reaches cannot be the thing that ends the certified range.

So the two constants are not even playing the same role. In the counting grid
the 2 is a **multiplier**; in the parity statement the 2 is a **floor on a
tool's accuracy**. That alone settles it, and the rest of this note is the
mechanism and the controls.

**What the identification would have bought if it had survived: an
explanation, not a passage.** Stated plainly, because it is the honest answer
and it is worth knowing before anyone spends another session on it — see §5.

---

## 1. The census recomputed independently, and it holds

Before testing anything, the producer rebuilds `destroyer-census-01.md` §3 from
scratch (own sieve to 1e8, own zone definition, no shared code) and aborts on
mismatch. **[VERIFIED, 5 of 5 calibration lines OK]**

- 1,225 zones with `p'² ≤ 1e8`, against the census's 1,225.
- Forced counts at `p = 7..61`: `8, 8, 15, 13, 17, 20, 19, 20, 22, 19, 20, 18,
  12, 10, 1` — identical to §3's list, all fifteen.
- `p = 67`: `B = 503`, `C = 497` — identical.
- Exactly 15 zones satisfy `B ≤ C − 1`, and the forced count is `≤` the true
  survivor count at every one of the 1,225 zones.

This is a partial independent verification of a HELD document's §3. It does not
red-team the rest of that file, and §3 is the only part touched here.

---

## 2. Where each factor of 2 enters, derived

**[PROVEN, elementary]** Let `H = {h_1 < … < h_κ}` be admissible, `A` the
residues mod 30 at which every member `n + h_i` is coprime to 30, `a = |A|`,
zone `p` = positions `n` with `p < n` and `n + h_max < p'²`, and `L = p'² − p`.
By the Zone Restriction Lemma a member in `(p, p'²)` is composite iff its least
prime factor is `≤ p`, so `B` is computable from the actives alone. Each
destroyed position owns κ member **slots**, at least one composite, and charges
one of its own — so `D ≤ B_slots` with no matching argument needed, and
`T ≥ C − B_slots`. Then

```
  C            = L·a/30
  member slots = κ·C
  prime slots  ≈ π(zone)·κ·a/8        (8 reduced classes mod 30)
  π(zone)      ≈ L/(2 ln p)
  ⇒ prime slots / C = 30κ/(8·2 ln p) = 15κ/(8 ln p)
  ⇒ B/C = κ·(1 − 15/(8 ln p))
```

At κ = 2 this is `2 − 15/(4 ln p)`, the census's closed form. **Every factor
tracked:**

| the number | what it is | does it scale with κ? |
|---|---|---|
| the leading `κ` (= 2 for twins) | members per tuple = classes removed per prime = the sifting dimension | **yes, by construction** |
| the `30` and the `8` | the mod-30 wheel and its reduced classes | no |
| the `2` inside `ln p² = 2 ln p` | the zone's height is `p²`, so its primes have log ≈ 2 ln p | no |
| the death threshold `1` | pigeonhole: `B ≥ C` means the budget can absorb every position | **no — it is 1 at every κ** |

There is no parity anywhere in that derivation. The leading 2 is the tuple
size; the other 2 is the exponent in `p²`.

---

## 3. The κ-scan the brief asked for: the constant reads κ, and the threshold does not

Five patterns on the same mod-30 wheel — `{0}`, `{0,2}`, `{0,2,6}`, `{0,2,8}`,
`{0,2,6,8}`, with `|A| = 8, 3, 2, 2, 1` — over all 1,225 zones.

**The collapse [MEASURED].** Dividing each pattern's `B/C` by its own κ puts
all five curves on one curve: worst cross-pattern spread **1.05%** at any
`p ≥ 101` (worst at `p = 113`). So the census's 2 **is** the sifting dimension,
exactly as the brief's mechanism test proposed — it reads 1 for the one-class
problem and 3 and 4 for the three- and four-class ones. That part of the
brief's hypothesis is confirmed.

*(Caveat on the formula, not the collapse: the derived curve `1 − 15/(8 ln p)`
is asymptotic and runs up to **8.09% high** at `p = 101`, converging by
`p = 997`. Quote the measurement, not the closed form, below `p ≈ 500`.)*

**The death points [VERIFIED].** Where each grid dies, and at what ratio:

| pattern | κ | valid zones | last valid p | first dead p | B, C there | **B/C there** | derived p* |
|---|---|---|---|---|---|---|---|
| `{0}` | 1 | **1225 (all)** | 9967 | — | — | — | ∞ |
| `{0,2}` | 2 | 15 | 61 | 67 | 503, 497 | **1.0121** | 42.5 |
| `{0,2,6}` | 3 | 4 | 17 | 19 | 33, 33 | **1.0000** | 16.7 |
| `{0,2,8}` | 3 | 5 | 19 | 23 | 60, 54 | **1.1111** | 16.7 |
| `{0,2,6,8}` | 4 | 2 | 11 | 13 | 8, 8 | **1.0000** | 12.2 |

Every death is at ratio ≈ 1. None is at 2, or at 3, or at 4. The derived death
point `ln p* = 15κ/(8(κ−1))` predicts the ordering and the rough location; the
measured deaths land late by the same finite-height factor the census already
noted at κ = 2 (67 against 42.5).

**The κ = 1 control is the cleanest separation [VERIFIED].** At κ = 1 the
certificate **never dies** — `B ≤ C − 1` at all 1,225 zones, minimum margin 26.
Meanwhile the parity floor at κ = 1 is still 2 (§4). Two numbers that agree at
κ = 2 and disagree at κ = 1 are not the same object. That is the refutation in
one line.

**And the κ = 1 certificate is an identity, not a rescue [VERIFIED].**
`C − B` equals the true survivor count `T` at all 1,225 zones exactly: the
one-class pigeonhole returns the prime count it was handed. Its immortality is
degeneracy, not strength.

**Restated in the form that makes the death obvious [MEASURED].** The
certificate demands that a fraction `(κ−1)/κ` of all member slots be **prime**.
The measured prime-slot fraction is pattern-blind — 0.2161 at `p = 9967` for
all five patterns, to four places — and `1/(2 ln p)`-shaped. The twin
certificate therefore dies exactly where half the member slots stop being
prime, between `p = 61` and `p = 67`; at `p = 9967` the needed/true ratio is
2.31 and rising like `ln p`. A gap that grows like `ln p` is not a factor 2.

**The second grid scans identically [VERIFIED].** `Σ_{5≤q≤x} κ/q` crosses 1 at
`x = 11` for κ = 2 (0.8675 there, 1.0214 at the next prime), at `x = 107` for
κ = 1, and at `x = 5` for κ = 3 and 4. Threshold 1 at every κ; only the
crossing point moves. Same verdict: the 2 in `Σ 2/p` is κ, the deciding
constant is 1. The block ladder's `2·Σ_{v<p≤v²} 1/p → 2 ln 2 = 1.386` is the
same shape — κ times a Mertens quantity, dead where the product passed 1, not
where it reached its limit.

**A pre-registration failed and is left failed.** PR5 banded `B/C` at the death
zone to `[1.00, 1.10]`; `{0,2,8}` reads **1.1111** at `p = 23` (`B = 60`,
`C = 54`), a zone small enough that one integer moves the ratio visibly. The
band was set too tight for small counts. It changes no reading above — 1.1111
is not 2 either — but re-banding after the fact is a named failure mode here,
so the FAIL stands in the output and the prereg score is **4 of 5**.

---

## 4. What the parity floor's 2 actually is, and why it cannot be this one

**[CITED, from the corpus's own sourcing at `natal-cap-10-sieve-cap.md` §1.5.]**
The parity floor 2 is a bound on the *accuracy of a tool*: "any upper bounds
must be off from the truth by a factor of 2 or more" (Tao 2007, fetched there),
forced by Selberg's examples `B_ν = {n : Ω(n) ≡ ν mod 2}` (via Wu 2004,
quoting Halberstam–Richert p. 239). The 2 there is the modulus of `Ω(n) mod 2`
— literally the two parity classes of the number of prime factors. Three
consequences, each fatal on its own:

1. **It does not scale with κ.** Selberg's `B_ν` construction is a κ = 1
   (linear sieve) object; the floor it forces is 2 at κ = 1. The counting
   grid's constant at κ = 1 is 1 (§3). Whatever the parity floor is, it is not
   the sifting dimension.
2. **The corpus's own κ-indexed parity constant is not 2 either.** The DHR
   sifting limit is `β₁ = 2` and `β₂ = 4.26645` (`dhr-verification.md`, quoting
   `α₁ = β₁ = 2` and `α_g > β_g > 2 for g > 1`). If anything in this corpus is
   "the parity constant at dimension κ", it is `β_κ`, and `β_2 = 4.2665`, not 2.
   The number 2 is the κ = 1 member of that family.
3. **The census cannot be parity-barred, because it uses no sieve upper
   bound.** `B` is an *exact* count of composite members. Parity limits how
   accurately a sieve can estimate; it says nothing about an exact count. The
   census dies because the true arithmetic goes the wrong way — the same class
   of death as the gross-cap door, which `natal-cap-10-sieve-cap.md` §4 already
   names precisely: *"even exact-truth caps fail"*, **Mertens-barred**, not
   parity-barred.

**Where a counting threshold and the parity floor genuinely do meet, and it is
already in the corpus.** `natal-cap-10-sieve-cap.md` §2, Regime 2: the
fresh-cap union bound needs a sieve constant `→ 1` (1.44 at @13, 1.28 at @17)
and the parity floor delivers 2, "with the gap → factor 2 exactly." That is the
real structure, and it is the *opposite shape* to the brief's hypothesis: the
counting requirement is **1** and the tool floor is **2**, and their ratio is 2
because counting always needs an asymptotically sharp upper bound and parity
forbids one. The census's B/C is not an instance of this — it is tool-free.

So the corpus already carries the true version of "counting dies where sieves
stop", correctly priced, at a different door.

---

## 5. What the surviving fragment buys, stated flatly

One sentence survives, **MEASURED**: in this frame a counting grid's
budget/capacity ratio is (sifting dimension) × (a prime-density factor tending
to 1), and the grid dies where that product crosses 1.

That is a **triage rule and not a passage.** It predicts that any new counting
grid invented in this frame dies at the same place, which is useful only for
deciding not to build one. It proves nothing about twins. It names no
obstruction the corpus did not already carry under "Mertens-barred"
(`natal-cap-10-sieve-cap.md` §4; `REFUTED.md` rows 43 and 55; `IMPORT-MAP.md`'s
Mertens threshold). And it has no parity content at all, for the reason in §4.3.

**No novelty is claimed and no absence is asserted**, so under
`SEARCH-CONVENTIONS.md`'s rule no literature search is owed and none was run.
Both ingredients are elementary and standard: that a first-order sieve count
loses its positivity once `Σ_{p≤z} κ/p ≥ 1` is the classical reason Brun's
sieve exists, and that `B/C → κ` is the statement that almost all integers are
composite. The brief's suggested search target — *"the pigeonhole/counting
threshold equals the sifting dimension"* — is not a thing to search for,
because it is false: the threshold is 1 and the dimension is a multiplier.

---

## 6. NOT REACHED, and one flag

- **Nothing above 1e8**, so the κ = 3 and κ = 4 death points rest on zones with
  `C` in the tens (`{0,2,6,8}` dies at `B = 8, C = 8`). The κ-collapse at
  `p ≥ 101` is on healthy counts; the death *locations* at high κ are not.
- **Only the mod-30 wheel was used.** A different wheel changes `15/8` and
  moves every death point. The claim that the leading constant is κ is tested
  across five wheels within mod 30; it is not tested across wheels.
- **`B_distinct` is reported and is not a theorem.** Where members are shared
  between positions (`{0,2,6}`: 6 slots per 30 against 5 distinct values), the
  distinct-value budget extends the last valid `p` from 17 to 29, and for
  `{0,2}` it *shrinks* it from 61 to 59. `D ≤ B_distinct` needs a system of
  distinct representatives that sharing can break, so the 17 stands and the 29
  does not. Recorded so the smaller column is not mistaken for a better
  certificate.
- **The parity floor 2 is rigorous folklore in this corpus, by its own
  admission** (`natal-cap-10-sieve-cap.md` §5 item 5: "no formal theorem
  located that excludes every conceivable sieve axiom system"). The
  identification was being proposed against a constant that is itself
  unformalised here. That does not change the verdict — it makes the verdict
  cheaper to reach.
- **A phrase worth fixing when someone next touches those files, not fixed
  here.** `attack-quadpoint-01.js` line 36 reads "dies permanently at p = 67
  (B/C -> 2)", and `destroyer-census-01.md` §3 reads "It DIES at p = 67 …
  B/C climbs toward 2". Both are literally true and both read as if 2 were the
  death threshold; that reading is what this attack was launched to test. The
  accurate phrasing is "dies at B/C = 1.0121, on a ratio whose limit is 2".
  No live file was edited for this note.

---

*Producer and custody: `research/attack-bc-parity-floor-01.js`, embedded
(`node research/qc/embed.js --check` green: code, body and out hashes all
match). Cited, never recomputed: `natal-cap-10-sieve-cap.md` §§1.5, 2, 4, 5;
`dhr-verification.md` (β₁ = 2, β₂ = 4.26645); `REFUTED.md` rows 43, 55;
`paper/wall-note.md` §2 Face 1. Recomputed on purpose, as a calibration:
`history/staging/destroyer-census-01.md` §3. History layer: process record,
staging. See `research/history/CHANGELOG.md` for the corpus rule.*
