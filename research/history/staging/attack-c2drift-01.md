# The c2' drift is a diagonal-frame property, not a G2 anomaly — and its shape splits two survivors

<!-- ledger
id: Q-c2prime-drift
status: PARTIAL
todo: 1c (retired)
question: Why does c2' drift on the 22-term ladder?
verdict: The twin-specific mechanism for the drift is closed (cited as such by c2prime-refit-22.md).
-->

*(2026-08-21. Producer `research/attack-c2drift-01.js`, embedded (1.5 s,
`--check` passes, 11 self-tests). Every number below is in its OUTPUT block.
Instrument-first per `exponent-control.md`: every p-value is a rank in a
4000-replicate null ensemble generated in the same pass on the same grid from
a truth whose answer is known, never a textbook standard error.)*

## 0. The question

The A144311 adoption left a new open question: c2' = G2/(m·lnD) runs
[0.4463, 0.5004] on the custody band x = 11..31 and [0.4842, 0.5337] on the
trusted tail x >= 41. Why does it drift upward? Three candidates: (i) a
constant plus a slowly-vanishing finite-size correction, (ii) genuine growth
like a power of lnD or of lnlnD, (iii) the maxgap-law §7a ledger's own
next-order term r(x)·ln₃x/(ln₂x)², scored zero-parameter. And the cheapest
decisive discriminator, run first: does the one-class column c1 = h/(m1·lnD1)
over A048670's 64 published terms drift the same way?

## 1. The h-side discriminator: YES — the drift is a property of the diagonal frame

c1 has the same signature as c2', point for point in shape: a high head
(0.4712 at x = 11), a dip (minimum 0.3359 at x = 59), then a slow rise to
0.3756 at x = 311. Post-dip the rise is decisive and survives both noise
models:

| window (c1) | n | b per ln ln x | p (lognormal null) | p (Gumbel/lnD null) |
|---|---|---|---|---|
| x >= 11 | 60 | −0.1091 ± 0.0335 | 0.9968 | 0.9527 |
| x >= 17 | 58 | +0.0238 ± 0.0256 | 0.1790 | 0.3643 |
| x >= 59 | 48 | **+0.1553 ± 0.0261** | **0.0000** | **0.0000** |
| x >= 101 | 39 | +0.1524 ± 0.0182 | 0.0000 | 0.0000 |
| x >= 179 | 24 | +0.2187 ± 0.0442 | 0.0000 | 0.0000 |

(The negative full-range slope is the x = 11..13 head, maxgap-law §6's known
outlier structure.) This independently confirms maxgap-law's (log p)^0.12 with
a different regressor and the full 64 terms, and it settles the question's
shape: **whatever drives the drift acts on one class and two classes alike.
Every twin-specific explanation of "why does c2' drift" is dead on arrival**;
the object under study is the diagonal law's constant in both sieve
dimensions, and the c2' version is just the shorter, noisier copy (post-head
rates: c2' 0.23–0.43 per ln ln x against c1's 0.16–0.22 — same direction,
same order, wide errors on the short ladder).

## 2. The instrument, calibrated before the data was read

- **Deterministic recovery** (rounding-only, real 18-term grid): a flat truth
  reads b_PLNX = −0.0140 (no spurious drift from discretisation); a true
  (ln x)^1.0 reads 0.9903; the ledger shape reads b_LEDG = 0.9956. The
  estimator sees what is there.
- **The bias runs DOWN here, not up.** A pure Gumbel finite-size truth
  (c ∝ 1 + γ/lnD) reads b_PLNX = −0.1341: a Gumbel head term biases the drift
  estimator negative, so the measured drifts are conservative. (The corpus's
  one-class lesson — positive log inside the truth biases a power fit up —
  applies to exponent fits on g itself; on the ratio column the danger
  inverts, and it is now priced.)
- **Cross-talk, load-bearing:** ln lnD and ln ln x are nearly collinear
  on-range (lnD ≈ θ(x) ≈ x). A true (lnD)^0.12 reads as (ln x)^0.50, a true
  (ln x)^0.30 reads as (lnD)^0.07. **Candidate (ii)'s two subforms cannot be
  separated by shape on any reachable range; only the per-frame rate is
  measurable.**
- **Power:** against a true (ln x)^0.30 drift at the 5% level, the c2' grid
  (n = 18) has 92.8% power, the c1 grid (n = 60) has 100.0%. Nothing weaker
  than s ≈ 0.3 was detectable on the c2' side — the h-side is where the power
  lives, which is why §1 leads.

## 3. The calibrated verdict on the three candidates

**c2's own drift is real:** x >= 17 slope 0.3351 ± 0.1098 with p_logn =
0.0053 and p_EV = 0.0075 (significant under both noise models); full-range
n = 18 is noise-model-dependent (0.0092 vs 0.1737 — the EV null's slope sd is
0.2056 at that n, honestly reported, not resolved). Deleting the x = 37
outlier leaves b = 0.2219 ± 0.0578: the outlier does not carry the drift.

| candidate | verdict | the numbers |
|---|---|---|
| (i) EV/Gumbel finite-size, c∞·(1 + γ/lnD) | **SIGN-REFUTED** | predicts b_FS = +0.577 (falling column); every fitted b_FS is negative (−0.597 c2' full, −3.52 c1 long lever) |
| (i)' empirical mirror: negative deficit, c → c∞ from below | **ALIVE, narrowly ahead on the longest lever** | on c1 x >= 59, FS beats both powers (ΔAICc 1.1 vs 6.3–7.2); implied limits c1∞ = 0.3799, c2'∞ = 0.5345, i.e. G2 → 1.28·x·ln²x |
| (ii) genuine polylog growth | **ALIVE, wins the c2' table** | COMP (γ-term fixed + (ln x)^s) is AICc-best on c2' x >= 17 at s = 0.4335; post-head windows s = 0.23–0.43 ≡ (lnD)^{0.05–0.08}; subforms unresolvable (§2) |
| (iii) ledger shape, zero-parameter | **REFUTED globally, wins one deep window** | anchored on the custody band it overshoots the trusted tail 5.5× (rms(ln) 0.5874 vs 0.1066 flat; predicts +13.2% over 41→79 against +3.1% observed); fitted shape exponent 0.0894 (c2') and −0.0574 (c1) against the required 1 — yet on c1 x >= 59 the same k = 1 anchored shape is the outright AICc winner (−392.1) |

The ledger reading deserves its sentence: it fails exactly where its own
derivation warns (the shape vanishes at x = e^e = 15.15 and is steepest just
above), and becomes the best zero-shape-parameter description precisely in
the deep window — maxgap-law §7a's "the flatness is a property of where the
data sits on ln₃x/(ln₂x)²" survives in exactly the regime it claims.

Between (i)' and (ii) this data cannot decide (1.1 AICc units on the best
lever). The cheapest future discriminator is on the ONE-CLASS side, not ours:
under (i)' c1 saturates at its fitted 0.3799 (c1(311) = 0.3756 is already
99% of the way); under (ii) it climbs through it.

## 4. The 1d compatibility algebra, exact

G2/x² = c2'·(m·lnD/x²) identically. Measured over the ladder 11 → 79:

    Δln(G2/x²) = Δln c2' + Δln(m·lnD/x²)
      −0.2365  =  +0.0540  +  (−0.2905)

The drift consumes 18.6% of the frame factor's fall. Since d(ln lnD)/d(ln x)
≈ 1 on the diagonal, the PLND slope IS the per-ln-x growth rate of c2', and
G2/x² keeps falling exactly while b_PLND < −dln(m·lnD/x²)/dln x — a threshold
measured at 0.147 on-range and rising to 1 − 2·lnln x/ln x → 1 asymptotically
(m·lnD → 2.40·x·ln²x). Measured b_PLND = 0.052: a third of the on-range
threshold, far below the asymptotic one. Consequences:

- **Every fixed polylog drift keeps G2/x² → 0** — c2' ~ (ln x)^s gives
  G2 ~ x·ln^{2+s}x for any s, the full Maier-Pomerance s = 1 included.
- **The two trusted drifts are in no tension anywhere in candidate space.**
  They jointly pin the correction between m·lnD and x² to polylog size,
  ln^{2+s}x with s between 0.23 and 0.43 on this range; only a near-unit
  POWER of lnD ≈ x could reverse 1d's lean, and the measured lnD-exponent is
  0.05–0.08, two orders of structure away.
- Under candidate (i)' the correction CONVERGES: G2 → 0.5345·m·lnD ≈
  1.28·x·ln²x, a constant diagonal law with a vanishing deficit — the
  strongest possible "G2/x² falls" reading. Under (ii) the polylog compounds
  without limit and still never reaches x². 1d's central question is
  narrowed, not settled: the correction is polylog either way; whether it
  saturates is exactly the (i)'-vs-(ii) split.

## 5. What was NOT reached

- **(i)' vs (ii) is undecided** — 1.1 AICc units on the best lever; the
  designed test (does c1 pass 0.3799?) needs A048670 terms past p = 311,
  which no one has computed.
- **(ii)'s subforms (lnD-power vs lnlnD-power) are unresolvable on-range** by
  the collinearity of §2 — this is an instrument ceiling, not a data
  shortfall; no reachable ladder length fixes it.
- **Full-range c2' significance stays noise-model-dependent** (p_EV = 0.17 at
  n = 18); the x >= 17 window verdict (significant under both) is the honest
  quotable.
- **The ledger's r-driven growth was never testable:** r(x) = 2 everywhere
  reachable (checked at every grid point to 311), so only its T1 shape was
  scored; the r-ladder's predicted breaks live at x ~ 1e6 and beyond.
- **Mechanism.** Nothing here says WHY the frame drifts — only that the why
  must be class-count-blind, that it is not the Gumbel mean, and that its
  size sits at a tenth of Maier-Pomerance's requirement on both columns.
- 8 of the 18 c2' terms and the last 6 c1 terms are single-witness
  (Alekseyev/Wang; Bozek); in-house verification remains the paper-phase
  deliverable it already was.

---

*This is a history/staging record: a process document, superseded-in-place by
later work. The live claims travel with the producer's READINGS block.*
