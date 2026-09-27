# Adversarial code-versus-definition review of centered-discrepancy-measurement.js (2026-09-07)

Reviewer: Fable agent, read-only, one development run at j=22. Against
moving-cutoff-parity.md (3)-(4), (9)-(13).

## Findings

1. DEFECT (diagnostic column and check (ii) only; headline numbers unaffected):
   `Eeven = T2all - acc1 - P` was off by -P; the printed E_even column equalled
   E_even - P, and the "exact T2 - acc1 - P - Eeven" check was a tautology, so the
   header's control (ii) was not performed. True E_even at j=22 is the single term
   n = 2^21+2 = 2*17*61681, E_even = -log2*log17 = -1.964. FIXED before the full run:
   E_even now accumulated directly from even e, check is T2 = acc1 + E_even; header
   says D_y is formed through (10) and the only definition-level check of (9) is the
   naive reimplementation.
2. RISK: F2 reported YES vacuously when no j >= 26 existed (empty `every`). FIXED
   (requires >= 3 rows). The 2% tolerance in "non-decreasing" disagreed with the header;
   FIXED (strict).
3. NOTE: the seeded sign mixes the segment's high word, so an n = 0 mod 2^32 at a
   segment end could take the previous block's mix; such n are divisible by 4, hence
   off the support. No effect.
4. NOTE: y = ceil(2^(0.48 j)) equals ceil((2^j)^(12/25)) at every j in 16..38,
   including j=25 (exactly 4096).

## Verified, no defect

Open endpoint a_e via e <= (n-1)/y; Delta_e from x/2 exclusive; density term P with
cumulative sums recorded through n = e*y and the e*y <= x/2 fallback; divisor
enumeration complete for T1 (all d <= y), T2 (all e with e*y < n), Agrid (odd e <= Q),
with sound pruning; prime powers and E_pp; grid bucket exactness; random-sign control
flips only f(n) with mu(e) kept; floating point safe at j=38; memory ~2.3 GB per worker
at j=38 (operational, not correctness). S = T1 + T2 + E_pp is a genuine identity check
and held to 1e-8 x at j=22.
