# 08 — Left-divisor Möbius signs instead of the first Cauchy: report

**Question.** Can the Möbius structure of alpha_m = A_left(gm) (mu times an
indicator and a twist, plus the log-weighted A_1 sector) be used INSTEAD of the
first Cauchy inequality, so that the sqrt(M) loss is not paid, and what does that
buy at (i) the target box M ~ x^(14/25), N ~ x^(1/2), A <= x^(3/50) and (ii) the
corner a=b=1?

**Calibration and global payoff.** DERIVED (one pass, mine, not independently
reviewed), inheriting the wave-1 unreviewed upstream reduction; the global payoff
is nil — no region is added, W_dagger / E_dagger / grouped-divisor-moment (20) are
unchanged, the uniform product threshold stays every fixed exponent below 19/25,
and the sufficient margin C_2 x + E_dagger >= c_0 x/(log x)^K remains OPEN.

Owning note: `research/left-divisor-signs.md`.
Validator: `research/left-divisor-signs-validation.js` (embedded via
`node research/qc/embed.js --force`, 2.1 s, deterministic, 84 exact rational
assertions, 6 negative controls all firing).

## Caveat first

Everything below that is not the two lemmas is a **failed upper bound**. Nothing
here says the actual signed sums are large, and nothing here is an obstruction.
The one place the numbers move is a single block exponent at a single rectangle,
and that rectangle alone would not prove twins.

## Answer, short

**Partly, and not where it is needed.** A Heath-Brown identity does remove the
sqrt(M) loss on the pieces of mu(m) that carry a long *smooth* variable, and with
it the zero-frequency budget (1+a)/2 entirely. It does not remove it on the
balanced piece, and the balanced piece is where the deficit sits: there the only
available treatment is Cauchy in m again, with exactly the old budget 103/100.

The useful by-product is different from what was asked: **the left coefficient is
already a Type II convolution in exactly the deficit sector**, so one can Cauchy in
the *original* divisor d rather than in the expanded m = d·r, with no identity at
all. That lowers the worst target-box block exponent from 103/100 to **41/40** and
localises the deficit to a two-parameter corner of sector space.

## 1. Result, with quantifiers

Constants depend only on epsilon and the fixed power bounding the lengths.
Everything is uniform over both gcd branches g in {1,2}, both endpoint conventions,
arbitrary harmonic subsets H ⊆ [A,2A], all four coefficient sectors (low,
squarefree, repeated-prime, prime-2), and — for Lemma II — the divisor twists at
all Perron heights.

**Coefficient structure (derived, finitely checked).** From
grouped-divisor-moment (13) / endpoint-fourier (4)-(5): A_0 and the -mu·log term of
A_1 are supported *inside* the original interval I ⊂ (D,2D]. Only A_1's prime-power
term reaches to 2DW, and it is exactly the Dirichlet convolution
(mu·(.)^(-s)·1_I) * (Lambda·1_{[2,W]}). So parametrise blocks by the left prime
power r ~ x^rho (0<=rho<=6/25) and the right one q ~ x^sigma (0<=sigma<=1/20);
then a = delta+rho, b = nu+sigma, not the uniform top values used in (14).
g=2 costs a relabelling only (split r into powers of 2 and odd r).

**Lemma I (Type I; no zero-frequency budget).** For m = ab with a ~ A_1 carrying
divisor-bounded coefficients and b carrying a weight of bounded variation,
  block << x^eps f(1+v) B C [ A_1 N^(3/2) + M·1_{M>=N/2} ].
Budgets alpha_1 + 3b/2 and a. Proof: |Phi| << f, |Phi'| << f(1+v)/M (the two
displays behind (6)), partial summation, the completion bound (7) with
G = (sigma·theta·h, u) <= 2(h,u) since abar is a unit, then the gcd averages (9) at
alpha = 1/2 and 1. **The (1+a)/2 term is absent** because no second moment is
formed. Lemma I replaces the Cauchy factor sqrt(M) = x^(a/2) by A_1.

**Lemma II (Type II; uniform in the twist heights).** For m = ab, |x_a|,|y_b| <=
x^eps, B_2 < N,
  block << x^eps f(1+v)^(1/2) B C N [ A_2 B_2^(1/2) + A_2^(1/2) B_2 N^(1/4)
                                      + A_2 B_2 N^(-1/2) ].
Cauchy over a removes x_a and with it the twist a^(-s), so no weight of large
total variation survives; the remaining a-weight is F(a) = Phi(ab_1)conj(Phi(ab_2)),
which obeys (6). The diagonal forces b_1 = b_2 because B_2 < N <= u. Off the
diagonal, (bbar_1 - bbar_2, u) = (b_1 - b_2, u) *exactly*, so
G' <= 2(h,u)(b_1-b_2,u), and sum_{0<|n|<=B_2}(n,u)^(1/2) <= 4 B_2 tau(u).
Lemma II sums u and h absolutely: it uses no cancellation over the modulus.

## 2. Decisive inequalities at the target box (delta,nu) = (8/25, 9/20)

Sector budgets, exact rationals (all in the validator):

- grouped (14) sector-wise: zero 33/50+rho/2, cross 167/200+rho/2+3sigma/2,
  period 8/25+rho. Controlled iff **rho + 3sigma < 33/100**.
  At rho = 0 the cross budget is 91/100: **the A_0 and -mu·log sectors are
  already controlled**, whatever the right sector is.
- Lemma II with the split the coefficient supplies (A_2 = D = x^(8/25),
  B_2 = R = x^rho): E1 = 77/100+sigma+rho/2, E2 = 289/400+rho+5sigma/4,
  E3 = 109/200+rho+sigma/2. E1 and E3 are below one throughout, so controlled iff
  **rho + 5sigma/4 < 111/400**.

The two predicates cross at sigma = 3/100. Consequences:

- **Every sector with sigma < 3/100 is controlled** (at sigma=3/100, rho=6/25 both
  budgets equal exactly 1): the deficit needs the *right* prime power q to reach
  x^(3/100), against its ceiling x^(1/20).
- At sigma = 1/20 the surviving range is **43/200 <= rho <= 6/25** (was rho >= 9/50).
- On the surviving set the block exponent is min(grouped, Lemma II), whose supremum
  is **41/40 at (rho,sigma) = (6/25,1/20)**, versus 103/100. Deficit in block
  exponent falls from 3/100 to 1/40.

Lemma I is decisive at this box iff alpha_1 < 1/4 (against the Cauchy exponent
a/2 = 7/25 = 0.28): the identity buys the interval [1/4, 7/25) of short-block
lengths and no more. Lemma II's window is min(s_A,s_B) in (3/25, 19/100).
**Neither covers the balanced configuration** m = n_1 n_2 with both 1-variables of
exponent 7/25: no 1-variable exceeds 0.31, and the achievable subset sums are
{0, 0.28, 0.56}, none in (0.12,0.19). On that configuration one is back to Cauchy
in m with the same 103/100.

## 3. The corner a = b = 1

| route | block exponent |
|---|---|
| grouped (14), either orientation | 1 (zero), 2 (cross), 1 (period) |
| Lemma I, any A_1 >= 1 | >= 3/2 |
| Lemma II, best split | 15/8 |
| Bettin-Chandee / Wright Thm 2.1 | 15/8 |
| hypothetical per-block square-root cancellation in m, u,h summed trivially | 3/2 |

The last row is the decisive one and is new. Trivial summation over u ~ N and h
costs N, and u^(-eta') = x^(-eta' b) since u ~ x^b, so a per-block bound
M f u^(-eta') gives total exponent a + b - eta' b; sufficiency is
**eta' > (a+b-1)/b**, which is 3/25 at the target box (b=1/2) and **1 at the
corner** (b=1). Square-root cancellation is eta' = a/(2b): 14/25 and 1/2.
**So the corner needs twice the square-root ceiling** — no per-block
m-cancellation of any strength reaches it; it needs cancellation in the
u-aggregate. At the target box the requirement 3/25 sits inside the ceiling
14/25 with a factor 4.7 of room, so there the gap is proof strength, not a
ceiling. (The ceiling is heuristic; the exponent arithmetic is derived.)

**Level of distribution.** Target box: u = M^(25/28), the m-sum has ~x^(3/50)
complete periods modulo u — completion is marginally effective. Corner:
u = M^(1+o(1)), not one complete period, and Weil's sqrt(u) per (u,h) already
totals N·sqrt(u) = x^(3/2). Every method priced here gets its saving from
completing the m-sum; when the modulus equals the length there is nothing to
complete.

**Item 4, right-divisor Cauchy (left orientation).** Budgets (1+b)/2, b/2+3a/2, b.
Target box: 3/4, **109/100**, 1/2 — worse than 103/100. Corner: 1, 2, 1 —
*identical* to the right orientation. The U=V=x^(6/25) vs Y=Z=x^(1/20) asymmetry
enters only through a = delta+6/25, b = nu+1/20; at the corner both equal one by
definition and the asymmetry is invisible. Lemma II in the left orientation
(Cauchy in e, second moment over q, modulus m) gives 207/200, 39/40, 39/50 at the
target box: the q_1=q_2 diagonal alone is 1.035 because Q <= x^(1/20) is too short
to pay for it. Neither the swap nor the asymmetry helps at either place.

## 4. Imported theorems, versions, hypotheses checked vs assumed

- **Fouvry–Kowalski–Michel, "Algebraic trace functions over the primes", Duke
  Math. J. 163 (2014) = arXiv:1211.6043v3 (31 Mar 2014), Theorem 1.7.** Read at
  source (PDF text extracted 2026-09-06). Statement:
  sum_{n<=X} mu(n)K(n) << X(1+p/X)^(1/12) p^(-eta/2), any eta < 1/24, K an
  isotypic non-exceptional trace weight mod a **prime** p of bounded conductor.
  CHECKED: our K(m) = e_u(sigma·theta·h·mbar) has conductor O(1) and is not
  proportional to chi·psi (singularity at 0, not at infinity), so non-exceptional;
  X = M = p^(28/25) > p, so (1+p/X)^(1/12) = O(1) and X >= p^(3/4+eps) holds with
  room. FAILS: p prime — our u is an arbitrary expanded right divisor.
  PRICING even granting prime u: ceiling eta' < 1/48 against the required
  **3/25**; short by a factor **144/25 = 5.76**. It removes 1/96 of the 3/50
  deficit, leaving 119/2400. Its Remark 1.9 (Bourgain) gives o(X) for
  X >= p^(1/2+eps) with **no power saving** — a o(1) cannot pay a fixed power.
- **Wu–Xi (appendix by Sawin), arXiv:1603.07060v5 (19 Apr 2021).** Read at source.
  Moduli required **squarefree with all prime factors <= q^eta**; sums **short**
  (|I| < q); the word "Möbius" does not occur in the paper. Our u has no
  squarefreeness or friability guarantee and our m-sum is longer than u. Not
  applicable — this is the composite-modulus extension the brief asked about, and
  it does not cover general composite u.
- **FKMS arXiv:2511.09459v3 Thm 1.1 and Korolev–Shparlinski Thm 2.1**: already
  priced in structural-literature-audit §3D (prime modulus with monodromy
  hypotheses; logarithmic saving only). **Kowalski–Michel–Sawin Ann. of Math. 186
  (2017)** is recorded CLOSED in OUTCOMES. **What is new here** is only the
  numeric requirement eta' > 3/25 at the target box, eta' > 1 at the corner, and
  that the corner requirement is twice the square-root ceiling 1/2.
- **Wright, "Trilinear Kloosterman fractions II: subdyadic intervals and nearly
  balanced convolutions", arXiv:2608.27732v1 (27 Aug 2026), Theorem 2.1.** Read at
  source (HTML rendering, 2026-09-06). Statement:
  B << ||a||||b||||v|| X^eps (1+|theta|A/(NM))^(1/2)
     [ A^(1/2)(M^(1/2)N^(3/8)+M^(3/8)N^(1/2))
       + A^(7/20)(M^(3/5)N^(7/20)+M^(7/20)N^(3/5)) X^(-2eta/5) ],
  requiring each of the A-, M- and N-sets to be an interval or consecutive
  elements of a congruence class, with |M| << M X^(-eta) **and** |N| << N X^(-eta).
  Norms: ||alpha||_2 << M^(1/2)log x, ||beta||_2 << B N^(1/2)log x,
  ||nu||_2 << C A^(-1/2) (from |c_h| <= C/A on a band of at most A+1 harmonics),
  evaluated on the top band A ~ MN/x where f = 1 and (1+|theta|A/(NM))^(1/2) = O(1);
  the prefactor is x^(1/2) both at the target box and at the corner.
  At eta = 0 the display is exactly Bettin–Chandee Thm 1 rewritten, reproducing wave-1's
  129/125 (prefactor x^(1/2); first bracket 399/400; second bracket 129/125 — and
  the eta-saving attacks precisely the binding second bracket).
  **Why it does not apply.** The subdyadic hypothesis is on the two *inverted*
  variables m and u, NOT on the harmonic band — the short band A ~ x^(3/50) is
  irrelevant to it. Our m- and u-supports are full dyadic boxes, so eta = 0. The
  only structure making them subdyadic in the required congruence-class sense is
  fixing r and q; then the common X^(-eta) is limited by the smaller shortening
  1/q >= x^(-1/20), while the outer sum over r and q costs RQ = x^(29/100) against
  only (RQ)^(1/2) = x^(29/200) in the norms. The exponent goes
  129/125 = 1.032 → 29/100 + 71/200 + (133/250 - 1/50) = **1157/1000**: strictly
  worse. In general, manufacturing X^(-eta) by cutting both supports into K pieces
  costs K^2 applications against K^(-1) in the norms and K^(-2/5) in the bracket —
  a net loss K^(3/5). Required for sufficiency: X^(-eta) <= x^(-2/25) arising from
  the arithmetic, not from subdivision. At the corner Wright/BC gives 15/8.
- **Guria, arXiv:2410.10856v2 (19 Dec 2024), Theorems 1.2–1.3.** Read at source
  (PDF text, 2026-09-06). Thm 1.2: for arbitrary alpha(n) = O(n^eps) and nonzero r,
  S_r(X) = sum_{|a|,|b|,|p|,|d|<=X, ad-pb=r} alpha(a)
         = 8 sum_{a<=X} (alpha(a)/a) sum_{p<=X} int_1^X w((|r|+px)/a) dx
           + O(X^(7/4+eps) + r^(1/5) X^(1+11/20+eps)), p prime.
  Thm 1.3 specialises alpha to the prime indicator: 8 K_r li(X)^2 + O(X^(7/4+eps))
  for r <= X. Mechanism: Poisson in the unweighted variables + averaging
  Kloosterman fractions over the prime.
  **What fails when both remaining weights are Möbius.** (i) Guria needs **two
  variables of weight exactly 1** (b and d) — that is where Poisson is run. Our
  four weights are mu(d), beta_V(k), mu(e), beta_Z(t): no variable carries weight 1.
  Attaching mu(e) to the Poisson variable turns her main term into a Möbius sum
  over an interval in a progression — precisely the untwisted density that
  signed-divisor-grouping already subtracts. Her main term corresponds to the part
  of our problem that is done; the open part is her error term. (ii) Her prime
  variable is not ours: our analogue is the cofactor k = n/d carrying
  beta_V(k) = sum_{r|k, r>V} Lambda(r), supported on integers with a large
  prime-power divisor, not on primes, and coupled to d by dk in J_x. (iii) Scale:
  her box is [-X,X]^4 with ~X^2 solutions and error X^(7/4) (relative saving
  X^(1/4)); our residual has mass ~x and needs absolute error O(x/log^K x). Taking
  X = x gives x^(7/4), useless by x^(3/4). **Reusable direction, not a bound:**
  "average the Kloosterman fraction over one prime variable rather than Cauchy it
  away" is exactly the resource Lemma II throws away and the grouped moment spends
  on a second moment.

## 5. Uncontrolled sectors, obligations, and what would change each failure

**Obligation Lemma I does NOT discharge (new, and it matters).** The coupled cuts
are separated by truncated Perron at height T_P = x^10, giving twists d^(-s) with
|Im s| up to x^10. The moment (2) is uniform in those heights because Cauchy sees
only |A_left| <= 2 log l. Lemma I is **not**: its smooth variable carries b^(-s),
whose total variation over b ~ B is >> |Im s|. Subdividing costs the same. So any
route replacing the first Cauchy by cancellation in a smooth m-variable must first
redo the cut separation with twist heights x^(o(1)), or work only on boxes that do
not straddle a cut. Lemma II is free of this, because Cauchy removes x_a and with
it the twist.

**Failed steps and the strength that would fix each:**

| failed step | what would fix it |
|---|---|
| Lemma I on the balanced HB piece (m = n_1 n_2, both ~x^(7/25)) | a Type II estimate for two arbitrary sequences of length x^(7/25) against e_u(theta h mbar) with the u,h average retained, saving more than x^(1/40) over 41/40 |
| Lemma II's Weil term A_2^(1/2) B_2 N^(1/4) at A_2 = x^(8/25), B_2 = x^(6/25) | cancellation over u (Lemma II sums it absolutely), or better than sqrt(u) for the completed d-sum at a fixed nonzero numerator |
| Lemma I's twist-height dependence | a cut separation with twists of height x^(o(1)), or a boxwise argument avoiding cut-straddling boxes |
| BC / Wright first bracket at eta = 0 | genuinely subdyadic support on **both** m and u, X^(-eta) < x^(-2/25), arising from the arithmetic |
| FKM Thm 1.7 exponent 1/48, prime modulus | eta' > 3/25 for composite u: a factor 5.76 in the exponent plus the composite extension |
| everything, at the corner a = b = 1 | cancellation in the u-aggregate; no per-block bound suffices since eta' > 1 is twice the square-root value 1/2 |

**Still uncontrolled:** grouped-divisor-moment (21) at the target box (now with
the smaller deficit 1/40 in block exponent, on the sector
sigma > 3/100, rho >= 111/400 - 5sigma/4); the complement E_dagger of (19); the
corner set S_0 of the wave-1 reachability report; the global signed margin. Not
addressed here: centered dispersion (§3C), divisibility graphs (§3E), a Kuznetsov
formulation with modulus-independent coefficients, and whether a Poisson-plus-
prime-average argument à la Guria can be built for beta-weighted cofactors.

**Effect on the global consumer: none.** A whole box is controlled by Lemma II only
if its worst sector is, and Lemma II also assumes B_2 < N, i.e. nu > 19/100 for the
split used (B_2 = x^(6/25)); the target box nu = 9/20 satisfies it with room, so the
41/40 headline is unaffected. On a 191x191 rational grid over the full domain
delta in [6/25,19/25], nu in [1/20,19/20], the three inequalities hold on 9943
boxes, of which **5153 also satisfy nu > 19/100** and are genuinely controlled;
**0 boxes of either count lie outside** the region already controlled by
delta+nu<19/25, or 5delta+2nu<123/50, or (delta<19/25 and delta+3nu<161/100) — the
larger count ignores the hypothesis and is the conservative one for that
conclusion. W_dagger, E_dagger, the exact cuts (19) and the reduction (20) are
unchanged; so is the uniform product threshold.

## 6. Falsifiers, and whether they ran

(a) an error in Lemma I's or Lemma II's analytic derivation — exponent arithmetic
checked mechanically, the analytic steps **NOT** independently reviewed;
(b) a sector of the target box outside the (rho,sigma) parametrisation — the
support claim was checked finitely for four (D,W) pairs only, the proof is the two
displays in §1 and is mine;
(c) a box where Lemma II adds region — searched on the validator's rational grid,
zero returned; a grid is not a proof and boundary strips were not examined
separately;
(d) the upstream reduction to sum_m A_left(gm) Y(m), unreviewed here and in
wave-1's review.

## 7. Repo state

- New: `research/left-divisor-signs.md`,
  `research/left-divisor-signs-validation.js` (OUTPUT embedded, --force on the
  second embed after adding the BC/Wright pricing; 0 of 13 prior figures failed to
  reproduce).
- No existing file edited; no git state changed; QUESTIONS.md not regenerated.
- `node research/qc.js`: 6 findings, none a defect in this note's content. Two are
  integrator-owned and expected — `crosslinks/unreachable` for
  `research/left-divisor-signs.md` (no working document cites it yet) and
  `ledger/ledger-todo-unlisted` for TODO.md item C, which must add
  `Q-left-divisor-signs` to its `Ledger:` line. The other four belong to
  concurrent agents' files (`corner-correlation.md`, `reachability-validation.js`,
  `kernel-sign-control.js`). `node research/qc/selftest.js`: 58/58 positives fire,
  47/47 controls silent.
- OUTCOMES.md entry not written (forbidden to edit). The integrator should record
  under `Q-left-divisor-signs`: **reusable** = the coefficient sector split of §1
  (only A_1's prime-power term exceeds the original interval, and it is an exact
  mu * Lambda convolution), Lemma I (Type I, no zero-frequency budget, threshold
  alpha_1 < 1/4 at the target box, twist-height obligation), Lemma II (Type II,
  Cauchy in the original divisor, uniform in Perron heights), the localisation
  sigma > 3/100 and rho >= 43/200 with worst block exponent 41/40, and the
  per-block requirement eta' > (a+b-1)/b, i.e. 3/25 (target box) / 1 (corner),
  against the square-root ceilings a/(2b) = 14/25 / 1/2; **failed** = Heath-Brown does not cover the
  balanced range (explicit configuration), FKM Thm 1.7 short by 144/25 and prime-
  modulus only, Wu–Xi requires squarefree friable moduli and has no Möbius twist,
  Wright Thm 2.1 gives 1157/1000 here (worse than plain BC) because manufacturing
  subdyadicity costs K^(3/5), Guria Thms 1.2–1.3 need two unit-weight variables
  and a genuine prime and are off by x^(3/4) in scale, and the left-orientation
  swap gives 109/100 / 207/200 at the target box and nothing at the corner.
