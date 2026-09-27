# VERIFY: the Kalmynin–Konyagin substitution (attack 4), adversarially

<!-- ledger
id: Q-kk-substitution
status: ANSWERED
todo: none
question: Does the Kalmynin-Konyagin construction survive substituting the two-class set Omega_p = {a_p, a_p - 2}, and what lower bound does it give?
verdict: STANDS WITH CORRECTIONS: G2(P(y)) >> y (ln y)^3 (lnlnln y)^2 / (lnln y)^4 for y >= y0 survives every attack made here, including an exhaustive brute force of the Proposition itself over four million values of i; five corrections follow and none touches the exponent.
-->

*2026-08-18/19, overnight wave. Target:
`research/history/staging/attack-kk-substitution.md`, producer
`research/attack-kk-substitution.js`. Verifier's producer:
`research/verify-kk-substitution.js` (seven sections V1–V7, 3.5 s, OUTPUT block
written by `research/qc/embed.js`; `--check` matches on both hashes). Written
headline-first and appended to as the check ran. Brief: break it, and default to
"cannot verify" over "verified".*

---

## VERDICT

**STANDS WITH CORRECTIONS.** The theorem

> `G₂(P(y)) ≫ y (ln y)³ (lnlnln y)² / (lnln y)⁴` for `y ≥ y₀`

survives every attack made on it here, including an **exhaustive brute-force of
the Proposition itself** over four million values of `i`. Five corrections
follow, none of which touches the exponent; one of them is a number with no run
behind it, one is a hypothesis checked in the wrong place, two are claims that
are true in the body and over-stated in the headline and the draft CHANGELOG,
and one is a limit on what a numerical collapse can test.

I could not break it. That is not the same as it being refereed, and §4 below
lists exactly what I imported rather than reconstructed.

---

## 1. Custody

**Same document.** `curl -sL https://arxiv.org/pdf/2302.00459` →
148,566 bytes, md5 `b5d7d2a23ffd902415057adebfe430b1`, 12 pages, left-margin
stamp `arXiv:2302.00459v2 [math.NT] 3 Dec 2023`. **Identical to the report's
stated PDF of record and to artifact A of
`research/history/staging/lit-pdf-kalmynin-konyagin.md` §0.** §2 is pages 3–7,
as stated.

**Read twice, and the second reading mattered.** Everything below was first read
from `pdftotext -layout`, then every display this verification leans on — `m`,
`z₀`, `z₁`, the `S(m,Ω)` line, and `π(y) − π(y/2)` — was re-read from a 200 dpi
`pdftoppm` page image. One of those five reads reversed a finding (§3.5).

---

## 2. What I independently reconstructed, and it holds

### 2a. The bridge to `G₂` is sound

`two-class-lower-bounds.md` §1: `G₂(x#) − 1` is the longest `[1,m]` coverable by
choosing `a_p` per prime and deleting `{a_p, a_p − 2}`. Re-derived: `x + i` is a
twin start iff `(x+i, N) = (x+i+2, N) = 1`, so `i` is killed iff
`i ≡ −x` or `i ≡ −x−2 (mod p)`, and CRT makes `a_p = −x mod p` free. The report
uses it correctly, and correctly says in §1b that `j_f` at `f = x(x+2)` is a
**different object** (fixed centre, varying separation) and is not being invoked.

### 2b. Corollary 1 sees `Ω_p` only through `|Ω_p|` — verified at the source

K–K v2 p. 4, verbatim: *"Suppose that for any `p ≤ z` the set `Ω_p ⊂ Z/pZ`
contains `g(p)` elements … Then `S(X, Ω) ≪ XV(z)`."* **This is the single fact
that makes the substitution legal**, because it is indifferent to whether the
classes are fibres of a polynomial or a free translate. The report's §4 table
asserts it; it is true as printed.

### 2c. Case 2 really is vacuous, checked at the source

K–K v2 p. 6 define
`Ω^II_p = {t : ∃ non-linear irreducible factor q(x) of f(x) with q(t) ≡ 0}`.
`x(x+2)` is a product of two linear factors over `ℤ` and has no non-linear
irreducible factor, so `h_f = 0`, `Ω^II_p = ∅` at every prime, and Case 2's
hypothesis quantifies over the empty set. Lemma 2 and Chebotarev enter the ledger
**only** through the `Σ_h r_p(q_h)/p` term, which is an empty sum. Confirmed at
the source, not at the paraphrase.

### 2d. `κ = 4` is valid, and `κ = 6` was never a requirement

`g(p) = |Ω^I_p ∪ Ω^III_p| ≤ 4` everywhere, with 4 attained only on band 2.
V2 enumerates every prime to 1000: `p = 2` and `p = 3` are the **only** primes
where `{0,−2}` and `{1,−1}` fail to be disjoint pairs of size 2, so `p₀ = 3`
(first good prime 5) and `g(p) < p` for `p ≥ 5`. Band 2 starts above
`z₀ = (ln y)^A`, so 2 and 3 are in band 1 where `g(2) = 1`, `g(3) = 2`.
K–K's `κ = 3 deg f = 6` is a *uniform crude bound over all `f`*, and Lemma 1's
implied constant is the only thing `κ` touches. **Invoking it at `κ = 4` is a
tightening, not a weakening.** Brief's suspicion 2: not sustained.

### 2e. Case 1, re-derived — and then brute-forced, which is the strongest result here

Re-derivation: `k ∈ {i, i+2}`, `p | k`, `p ≤ √y`. If `k = p` then `i ≤ √y + 2`.
Else `k` is composite; unkilled at step 1 forces every prime factor of `k` into
`(z₀, z₁] ∪ [y/2, ∞)`. If the largest `P ≥ y/2` then `k/P < 2m/y`, and every
prime factor of `k/P` exceeds `z₀`, so **`2m/y < z₀` forces `k/P = 1`**, making
`k = P` prime and contradicting composite. Hence `P ≤ z₁` and `k` is `z₁`-smooth.

**V1 then tests the Proposition exhaustively**, which is possible because the
Proposition is a finite statement for any `(y, z₀, z₁, m)`. At `y = 200000`,
`z₁ = 300`, `m = 4·10⁶` (so the threshold is `2m/y = 40`):

| `z₀` | `2m/y < z₀` | unkilled `i ≤ m` | by (a) | by (b) | by (c) | **counterexamples** |
|---|---|---|---|---|---|---|
| 100 | yes | 16985 | 10 | 240 | 16735 | **0** |
| 60 | yes | 14381 | 9 | 798 | 13574 | **0** |
| 45 | yes | 13164 | 8 | 1064 | 12092 | **0** |
| 30 | NO | 11228 | 8 | 1355 | 9630 | 235 |
| 20 | NO | 10372 | 7 | 1446 | 8120 | 799 |
| 10 | NO | 9086 | 6 | 2200 | 3959 | 2921 |

The Proposition holds with zero exceptions exactly when the report says it holds,
and breaks the moment its one stated hypothesis breaks. **The report's claim that
Case 1 consumes "one inequality, `2m/y < z₀`, and nothing else" is not just
re-derivable, it is necessary and sufficient at finite scale.** Brief's
suspicion 3: not sustained (but see correction 4 for the `A > 3` framing).

### 2f. The covering-form / sieve-form trap is not sprung

Brief's suspicion 4 is the one I expected to land. It does not.

`Ω^I_p = {0,−2}` is charged at **every** `p ≤ √y`, including the band-2 primes
where the construction actually kills `{1,−1}` instead. That is not double-use of
the freedom: `S(m,Ω)` bounds **only** branch (c), and any `i` that lands in
`Ω^I_p` at a band-2 prime is removed by branch (a) or (b) via Case 1. The
trichotomy is a genuine disjunction over all unkilled `i`, so nothing is counted
twice and band 1's primes are never re-used as free. V1's exhaustive run is a
direct test of exactly this: a leak would appear as a counterexample, and at
`2m/y < z₀` there are none. `research/qc/units.js` §5's error 7 does not recur.

### 2g. The Mertens ledger and both `O(1)` constants

Independently: `Σ_{5≤p≤√y} 2/p − 2 lnln y → −2 ln 2 + 2M − 2(1/2+1/3) =
−2.529967`, measured residual-minus-constant `0.00787636, 0.00247186, 0.00060922,
0.00007794, 0.00001915` at `√y = 10³…10⁷` — the report's §F1 digits.
The second constant, `−2 ln 2 + 2M − 1/2 = −1.363300`, is the residual of the
**full band-aware sum from `p = 2`**, not of the same sum; the two are different
objects and both are right. No inconsistency.

### 2h. The exponent assembly, hand-derived

```
lnln z₀ = lnA + lll                     lnln z₁ = llll + ll − lll − lnA
SUM = 2ll + 2(lnln z₁ − lnln z₀) + O(1) = 4ll − 4lll + 2llll − 4lnA + O(1)
exp(−SUM) = (ln y)^−4 (ll)^4 (lll)^−2 A^4
m·exp(−SUM) = (y/B)(L³ lll²/ll⁴)·L^−4 ll⁴ lll^−2 A⁴ = A⁴ y/(B ln y)
```

which is K–K's own displayed `A^{2M(f)−2h_f} y/(B ln y)`, **confirmed on the
rendered page 7**, at `M(f) = 2, h_f = 0`. Evaluated at 21 `(L,A,B)` triples out
to `L = 10³⁰⁰`: ratio 1 to `4.547e-13`.

### 2i. `y₀` and the D4 retirement

Bisecting `A² ln²L < L lnln L` independently gives `L₀ = 3.0867e+2, 4.0795e+2,
5.3747e+2, 1.2733e+3, 3.1008e+3` at `A = 4.05, 4.5, 5, 7, 10` — every figure of
the report's table, with `z₀ < z₁` binding. At `y = 4001`, `z₁ = 2.07` and
`z₀ = 5.26e+3` at `A = 4.05`, so band 2 is empty at every `A > 4` and the
construction does not exist there. **The consequential claim is sound**: attack
I's D4 comparison at `y = 4001` was not a test of this construction. Brief's
suspicion 6: not sustained on substance (see correction 1 on the number).

### 2j. The calibration in §6 is right, and it limits the claim

K–K's own p. 2 quotes `j(P(y)) ≫ y ln y lnlnln y / lnln y` (FGKT). Their
Theorem 1 at `f(x) = x` (`ℓ_f = 1, h_f = 0, M(f) = 1`) gives
`y ln y lnlnln y / (lnln y)²`. **Weaker by exactly one `lnln y` than the bound
they cite in their own introduction**, so the transferred two-class bound
inherits the same slack. Confirmed at the source. The report is right to call its
result a floor on the method rather than a ceiling.

---

## 3. CORRECTIONS

**1. `§5`'s "1.5e6" is not a computed number.** The report says *"at `y = 4001`
… `z₀ = (ln y)^A` with `A > 4` is already `1.5e6`, past `y`."* At `y = 4001`,
`ln y = 8.29430`, so `z₀ = 4.7328e+3` at `A = 4` and `5.2609e+3` at `A = 4.05`.
`1.5e6` requires `A = 6.722`. It appears in no section of the producer's OUTPUT
block. The conclusion is unaffected (`z₀` already exceeds `y = 4001`, and
`z₁ = 2.07 < z₀`), but the figure is 285× off and is quoted as if measured.

**2. Corollary 1's load-bearing hypothesis is checked in the wrong place.**
K–K's Lemma 1 (v2 p. 3) lists `g(p) ≤ κ`, `g(p) < p`, `|r_d| ≤ g(d)` and
`z ≪ X`, and concludes `S ≪ XV(z)` with **no remainder term**. An upper-bound
sieve with support `ξ` carries `Σ_{d≤ξ², d|P(z)} 3^{ω(d)}|r_d| ≪ ξ²(ln ξ)^{11}`,
and `z ≪ X` constrains `ξ` not at all. §3a checks the hypotheses **as written**
(*"`z ≪ X`: `√y ≪ m`, immediate"*) and inherits the omission.
**The missing hypothesis does hold**, so the theorem is untouched: at the naive
support `ξ = z = √y` the remainder is `y(ln y)^{11}` against a main term
`y/(B ln y)`, too big by `(ln y)^{12}`; at `ξ = √y/(ln y)⁷` it is `y(ln y)^{−3}`,
i.e. `(ln y)^{−2}` of the main term, while the main term loses only
`(1 − 2K lnln y/ln y)^κ → 1`. **What is missing is the check, not the fact**, and
the report should say which support it is using.

**3. The headline mis-routes half of K–K §3.** Headline 2 reads *"Case 2 is
vacuous because `h_f = 0`, so Lemma 2, Chebotarev, **Theorem 2, Lemma 3**
(Birch–Swinnerton-Dyer) and every Galois group … drop out."* Lemma 2 and
Chebotarev do drop for that reason. **Theorem 2, Lemma 3 and the Galois groups
compute `M(f)`**, which drops for the *Case 3* reason — `|Ω^III_p| = 2` exactly
rather than on logarithmic average. §3b states this correctly; the headline and
the draft CHANGELOG entry do not. Both reasons hold, so "all of §3 unconsumed"
stands; only the attribution is wrong.

**4. The draft CHANGELOG drops a hypothesis the body carries.** It reads
*"Case 1 reduces to the single inequality `2m/y < z₀`, needing `A > 3` where
K–K need `A > 4`"* with no qualifier. §1c fixes `A > 4`, and §3d says plainly
*"the substituted proof needs `A > 4`"* because the smooth count asks for
`A > ℓ_f − 1 + M(f) + 1 = 4`. The `A > 3` is true **for that step only**. As
drafted the CHANGELOG line is the exact signature `qc.js transfers` exists to
catch: a result copied upward keeping its numbers and losing a hypothesis. It
should read *"`A > 3` for that step, against their `A > 4`; the proof as a whole
still needs `A > 4` from the smooth count."*

**5. The numerical collapse tests less than the headline implies.** Headline 3
pairs the identified `O(1)` with *"the exponent assembly … collapses to zero
coefficient by coefficient"* and quotes `5.7e-13`. The collapse happens because
the `O(1)` is dropped on **both** sides — `2 lnln √y` is replaced by `2 ll`. It
tests coefficient bookkeeping and **cannot test the `O(1)` at all**. §F1 and §F4
test the `O(1)` separately and pass. Both halves are sound; the headline reads as
one check when it is two.

---

## 4. What I did NOT reconstruct

Named, per the brief, rather than waved past.

- **Lemma 1 itself.** Imported by K–K from Halberstam–Richert Thm 2.2; I did not
  read that source. Correction 2 is about its *application*, not its truth.
- **`G(z^u) ≫_{κ,u} V(z)^{−1}`**, used in correction 2's repair. Standard for a
  bounded-dimension sieve; asserted here, not proved.
- **`Ψ(x,z) ≪ x ρ(u)` in Hildebrand's range.** Imported, exactly as K–K import
  it. The report's §E range-slack measurement was not re-run.
- **§7's novelty probes.** Not re-run. `research/qc/units.js` and the campaign
  lessons both record that an absence claim is the one thing no check can test;
  §7's calibrations are the right shape, and that is all I can say. Note the
  report's own §7f keeps the claim narrow ([INFERRED], construction credited to
  K–K), which is the correct calibration.
- **`two-class-lower-bounds.md` §4b's INFERRED analogue**, which §8(b) says is
  superseded. I checked the arithmetic of the ratio (`ln x · lnlnln x/(lnln x)³`,
  worth 1.56 at `L = 10²`, which the report states) but not §4b's own derivation.

---

## 5. Gate

```
node research/verify-kk-substitution.js
node research/qc/embed.js --check research/verify-kk-substitution.js   # both hashes match
node research/qc.js
```

Script tail: `code-sha256 524c4f9c89a6203a…`, `out-sha256 d84216d0138bb8b6…`,
237 lines of output, 3.5 s. `node research/qc.js` reports **0 findings for this
file and for `attack-kk-substitution.js`**; the gate's one remaining finding is
`tail-does-not-belong-to-this-code` on `research/attack-bonferroni-degree.js`,
another agent's concurrent script, and is not mine to fix.

I also re-ran the report's own custody claim: `node research/qc/embed.js --check
research/attack-kk-substitution.js` matches on both hashes.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
