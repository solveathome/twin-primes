# 03 — Kernel separation: report

**Question.** Does reciprocity separate the j<=x^(1/20) kernel of
grouped-divisor-moment (21) at (delta,nu)=(8/25,9/20), and do the
Duke-Friedlander-Iwaniec / Bettin-Chandee and Kuznetsov interfaces then supply
the required saving?

**Calibration.** DERIVED separation, DERIVED negative pricings for three
interfaces; global payoff is nil — nothing is added to the controlled region,
E_dagger and cut set (19)-(20) are unchanged, and (21) plus the global twin
margin remain OPEN.

Owning note: `research/small-divisor-kernel.md`.
Validator: `research/small-divisor-kernel-validation.js` (embedded via
`node research/qc/embed.js`, 0.5 s, deterministic),
artifact `research/small-divisor-kernel-validation.json`.

## Caveat first

The interface pricing below is a set of failed upper bounds. It says nothing
about the size or sign of the actual correlation, and it does not close the
DFI/BC or spectral methods — only the specific displayed statements at this
box. The one genuinely reusable output is a reduction, not an estimate.

## Result, with quantifiers

Fix the box: M<<x^(14/25), N<<x^(1/2), harmonic bands A<=x^(3/50)+, so
a=14/25, b=1/2, top band alpha=3/50 and v=Ax/(MN)<=1. Constants depend only on
epsilon and the fixed power bounding the lengths; everything below is uniform
over both gcd branches g in {1,2}, both endpoint conventions, all coefficient
sectors (low, squarefree, repeated-prime, prime-2), arbitrary harmonic subsets,
and the divisor twists of residual-coverage §4.

1. **Reciprocity splits index by index, exactly.** For (m,u)=1,
   (a m + b u - 1)/(mu) is an integer (a = inverse of m mod u, b = inverse of u
   mod m), so e_u(sigma theta h mbar) = e(sigma theta h/(mu)) e_m(-sigma theta
   h ubar). Applying this to each index of a pair gives, exactly,
   theta R cbar = theta h1 u1bar - theta h2 u2bar (mod m) and
   theta R/(mc) = theta h1/(m u1) - theta h2/(m u2).
   So yes: the small-j kernel is exactly the pair expansion of the left
   orientation with modulus m. Also, the correction phase merges with the
   endpoint factor and **interchanges the two endpoint conventions**
   (native x/2, z <-> reciprocal x/2-2, z-2), a consistency check on the
   sign conventions in residual-coverage.
2. **The correction phase is negligible here**: sup norm and total m-variation
   both O(A/(MN)) = O(1/x); removing it costs O(N^2 M/x) = O(x^(14/25))
   absolutely, far under every budget.
3. **Separation of F from the phase costs x^epsilon.** Mellin on y = h/(mu)
   gives y^(-s) = h^(-it) m^(it) u^(it) — unimodular, so all L2 norms and the
   twist uniformity survive; the L1 mass of the Mellin weight is
   << f = min(1,v) and the truncation height is (1+v)x^epsilon. Separation in u
   is therefore free despite u sitting in the denominator, *because* v<=1 at
   this box. Bettin-Chandee Remark 1 gives the same O(1) cost independently
   (X = Ax, factor (1+v)^(1/2)).
4. **Consequence.** The whole block reduces, up to x^epsilon and the factor f,
   to the pure trilinear Kloosterman fraction
   T = sum_{m~M,u~N,h in H} alpha_m beta_u nu_h 1_{(m,u)=1} e(sigma theta h
   mbar/u), with ||alpha||<<M^(1/2)log x, ||beta||<<B N^(1/2) log x,
   ||nu||<<C A^(-1/2). Trivial bound x^(53/50).

## Decisive inequality

On the transition band the prefactor ||alpha|| ||beta|| ||nu|| f is exactly
x^(1/2), and both Bettin-Chandee bracket exponents increase in the band
exponent, so the top band binds:

    1/2 + (7/20)(28/25) + (1/4)(14/25) = 129/125 > 1.

Required: < 1. Classical Weil/completion budget at this box: 103/100. Trivial:
53/50. So BC is 4/125 short of what is needed and 1/500 **worse than
classical**. Its second bracket term alone would give 399/400 < 1; the first
term, (AMN)^(7/20)(M+N)^(1/4), is the entire failure.

DFI (1.1) with the harmonic band summed trivially: 1267/1200 — weaker still.

## Failed step, and what would need to change

Failed step: Bettin-Chandee Theorem 1's first bracket term. Holding the other
exponent fixed, the box closes iff (M+N)^(1/4) improves to (M+N)^kappa with
kappa < 27/140, or (AMN)^(7/20) improves to (AMN)^gamma with gamma < 9/28.
Note 9/28 < 1/3: an (AMN)^(1/3) first term would still not suffice.

**Region.** BC's top-band conditions are (7/10)(a+b)+(1/4)max(a,b)<17/20 and
(7/8)(a+b)+(1/8)max(a,b)<1. On a 19005-point rational grid over
delta in [6/25,19/25], nu in [1/20,19/20], the 3218 boxes BC controls are all
inside the 7004 already controlled; 0 outside; 3786 already-controlled boxes lie
outside BC. **This interface adds no region.**

## Imported theorems

- **Bettin-Chandee, "Trilinear forms with Kloosterman fractions",
  arXiv:1502.00769v1 (3 Feb 2015; published Adv. Math.), Theorem 1 + Remark 1.**
  Read 2026-09-06 via the ar5iv rendering of v1 (the arXiv PDF fetch returned
  undecoded binary). Hypotheses CHECKED against our sum: dyadic supports,
  (m,n)=1 with m inverted mod n — matches our (m,u)=1 exactly; vartheta =
  sigma*theta in {-2,-1,1,2} nonzero; arbitrary complex coefficients (so sharp
  interval, arbitrary harmonic subset, all sectors and unimodular twists are
  admissible); Remark 1's C^1 derivative shape matched with X = Ax. **No
  hypothesis fails — the theorem applies; it is simply not strong enough here.**
- **DFI, Invent. Math. 128 (1997), 23-43, bound (1.1).** Read only as reproduced
  in BC's paper (Springer page not fetchable). SECONDARY READING, flagged.
- **Pascadi arXiv:2404.04239v3, Theorem 3** (spectral large sieve for
  dispersion coefficients). Translation INHERITED from
  structural-literature-audit §3A, not re-derived. Its extra factor is
  max(1,H^2/L) with H=A=x^(3/50), L=N/J: trivial for every J<=x^(19/50), which
  covers the whole remaining J<=x^(1/20) range with margin. The structured
  spectral advantage is absent exactly where the deficit sits.
- **Deshouillers-Iwaniec, Invent. Math. 70 (1982)** — NOT reachable this
  session; no theorem number cited. The obligation is stated structurally: both
  available completions produce modulus-dependent coefficients (completing u
  mod m gives hat-beta_m(t); completing m mod c gives hat-F and r both tied to
  the factorisation c = j l1 l2), which is what a DI-type large sieve forbids.
  ASSUMED dependency, explicitly flagged as unchecked.
- **Blomer-Pascadi arXiv:2607.24311v1 Thm 1.1 / Pascadi GAFA Thms 1.1-1.2
  (§3B).** Not applicable: no separated short bilinear subexpression exists.
  Equation (7) has no complete Kloosterman sum; the only one, in the completed
  form (3), pairs t mod c (full length c) against r, with c itself a summation
  variable. At B=c the displayed savings exceed one. The balanced factorisation
  c = l1 l2 at j=1 *is* present — the missing input is a short separated
  coefficient pair against a fixed modulus. Constructing one is the only §3B
  route this note does not close.
- **Dong-Robles-Zeindler arXiv:2601.00292** (claimed 1/12 balanced saving):
  **WITHDRAWN** by the authors after an error in eq. (2.53). Do not import.
- **Wright arXiv:2604.25177v2, Theorem 2.1** (BC with a fixed factor R in the
  denominator). Read only through a fetched rendering — SECONDARY, unverified.
  At R=1 its asymmetric bracket prices to 1023/1000 at this box, still >1. Our
  modulus is an arbitrary expanded divisor; a canonical smooth-part
  factorisation does create a fixed R, but the R=1 class survives and dominates.

## Where the pressure actually is (item 4)

Block exponents at this box: equal frequency R=0 (grouped (5)) 39/50;
complete periods (11) 14/25; nonzero R with j>x^(1/20) (12) 397/400; nonzero R
with j<=x^(1/20) (10) 103/100. Only the last exceeds 1. Its majorant on a band
j~J is N^3/J^(3/2), so the single band j in [1,2) carries 64.6% of the summed
majorant and no fixed cutoff j<=J1 lowers the exponent below 3/2.
**Sharpening: the entire 3/50 deficit is present at j=1 alone — this is a
coprime-pair problem, not a small-common-divisor problem.** "Small common
divisor" names where (12) stops, not where the mass sits.

## Uncontrolled sectors / error terms

Everything that was uncontrolled before still is: (21) at this box; the
complement E_dagger of (19); the global signed margin of RESEARCH-HANDOFF §3.
Not addressed here: the centered-dispersion (§3C) and divisibility-graph (§3E)
reformulations; a Kuznetsov formulation with modulus-independent coefficients;
a short separated bilinear form for §3B; the possibility that a bound better
than (M+N)^(1/4) / (AMN)^(7/20) exists in the Kloosterman-fraction literature
beyond the four papers checked here.

## Repo state

- New: `research/small-divisor-kernel.md`,
  `research/small-divisor-kernel-validation.js` (+ .json artifact).
- No existing file edited; no git state changed.
- `node research/qc.js`: 4 findings, **all integrator-owned and expected** —
  crosslinks (this note and a concurrent agent's `kernel-sign-control.md` are
  not yet cited from a router/owning note) and ledger (TODO.md item C's
  `Ledger:` line must list `Q-small-divisor-kernel`, and
  `Q-kernel-sign-control`). `node research/qc/selftest.js`: 58/58 positives
  fire, 47/47 controls silent. QUESTIONS.md not regenerated, per instruction.
- OUTCOMES.md entry not written (forbidden to edit); the integrator should add
  one under `Q-small-divisor-kernel` recording: reusable = the reciprocity
  split (9), the O(1/x) correction bound, the free Mellin separation whenever
  A<=MN/x, and the reduction to the trilinear form (7); failed = BC/DFI/Wright
  pricing 129/125, 1267/1200, 1023/1000 against the required <1, plus the §3A
  and §3B non-applicability with their reasons.
