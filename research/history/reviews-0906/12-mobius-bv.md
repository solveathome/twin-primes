# 12 — Möbius Bombieri–Vinogradov: provenance repair

Date 2026-09-06. Bounded task: replace the exercise-sheet provenance of
equation (4) in `research/shifted-prime-decomposition.md`.

## The exact question

Is there a PUBLISHED theorem statement of

    sum_{q <= T^(1/2)/(log T)^B} max_{(a,q)=1} | sum_{m <= T, m = a (mod q)} mu(m) |  <<_A  T/(log T)^A ,

and, if not, does that estimate follow from published theorems by a derivation
whose every hypothesis is checked?

## Calibration, first

- **Nothing about the twin-prime estimate moved.** This is provenance only.
- The derivation written today is **derived from published theorems, not
  published, and not reviewed outside this repository.** It had one adversarial
  pass, by its author.
- The Koukoulopoulos numbering is read from the **author's preliminary version**
  of GSM 203 (posted with AMS permission), **not checked against the printed
  book**. If the printed book renumbers, the citation numbers move.
- The negative in §"published source" below is a negative about **five channels
  on one day**, not a proof that no published statement exists. The two most
  likely carriers were not opened.

## Published-source finding: none located

Searched in the owning convention of `SEARCH-CONVENTIONS.md §1` ("Möbius
function in arithmetic progressions", "Bombieri–Vinogradov", "Vaughan identity").
This confirms the earlier scout's finding and adds byte-level checks.

| source | what it actually contains | status |
|---|---|---|
| Granville–Shao, Adv. Math. 350 (2019) 304–358, p. 2 | Own byte-level read of arXiv:1703.06865: *"The analogous result is known to hold when f = µ, the Mobius function, and when f is the characteristic function for the y-smooth numbers [16, 23]"*. [16], [23] = Fouvry–Tenenbaum and Harper, both **smooth-number** papers; **no locator attached to the µ half**. Same paragraph cites "chapter 28 of [8]" (Davenport) and "Theorems 9.16, 9.17, and 9.18 of [18]" (Opera de Cribro) for **the prime case**. | published *assertion*, no proof locator |
| Koukoulopoulos, *The Distribution of Prime Numbers*, AMS GSM 203 (2019) | Full text of the author's preliminary version searched. Ch. 26 proves BV for primes; Exercises 26.1–26.5 contain no µ version. It **does** contain every input needed (see below). | **byte-level negative in the source that has all the inputs** |
| Iwaniec–Kowalski, AMS Colloq. 53 | Ch. 17 "Primes in Arithmetic Progressions", §17.2 "Bilinear forms in arithmetic progressions" p. 421, §17.3 p. 423 — confirmed byte-level in the AMS-hosted `coll053-endmatter.pdf`. Theorem text (the statement usually cited as Thm 17.4) **could not be opened**. | NOT REACHED |
| Friedlander–Iwaniec, *Opera de Cribro*, Thms 9.16–9.18 | closed access on every channel tried | NOT REACHED |
| Davenport, MNT ch. 28 "Bombieri's Theorem" | title confirmed at the publisher's chapter listing; text behind a login; cited by Granville–Shao for the prime case | NOT REACHED |
| Tao, 254A Notes 3, Thm 16 | general bilinear BV, statement fetched and read; µ appears only in Exercise 14, which is the **BDH L² statement**, not the max-over-a, L¹-in-q one | blog, not published |
| Le Boudec EPFL Sheet III Ex. 4 | states the estimate, without the max over y | teaching material (the defect) |

What would settle it: page access to IK §17.2 and Opera de Cribro §9.

## The derivation, and its decisive inequalities

Written to `research/mobius-bv-derivation.md`. Every input is a numbered result
in one published book (Koukoulopoulos GSM 203):

- **K1 = Corollary 13.4** (Siegel–Walfisz for µ): for q ≤ (log x)^C and
  ω(m) ≤ exp{(log x)^{1−ε}}, `sum_{n<=x, (n,m)=1, n=a (q)} mu(n) <<_{eps,A,C} x/(log x)^A`.
  Arbitrary class a, coprimality to m included. **Ineffective** (runs through
  Siegel's theorem).
- **K2 = Theorem 26.2** (Type I): f supported on [1,y] gives
  `|Delta_{f*1}(x;q,a)| <= 2 sum_{k<=y} |f(k)|`, uniform in x and in a coprime to q.
- **K3 = Theorem 26.6** (Type II large sieve over primitive characters, with the
  max over y ≤ x already inside, via Perron):
  `sum*_{q<=P, chi (q)} (q/phi(q)) max_{y<=x} |sum_{n<=y} (f*g)(n) chi(n)|
   << (sqrt(MN) + sqrt(M)P + sqrt(N)P + P^2)(log x)||f||_2||g||_2`.
- **K4 = equation (26.3)**: the character expansion of Δ_f, valid for any f.

Identity used (written out, proved in three lines, checked numerically):

    mu = mu_{>U} * mu_{>V} * 1  -  mu_{<=U} * mu_{<=V} * 1  +  mu_{<=U} + mu_{<=V}

for all U,V >= 1 and **all n** (no range restriction, unlike Vaughan for Λ).
Proof: expand (µ−µ_{≤U})∗(µ−µ_{≤V})∗1 and use µ∗1 = δ three times. It is
Exercise 23.4(a) of the same book; the three-line proof makes the exercise
status irrelevant. Because 1_{(n,r)=1} is multiplicative, the identity survives
the coprimality restriction factor by factor.

Parameters: U = V = T^{1/5}, L = log T.

1. **Type I.** K2 with v=0, f = µ_{≤U}∗µ_{≤V} supported on [1,UV] with |f| ≤ τ:
   `|Delta| <= 2 sum_{k<=UV} tau(k) <= 2UV(log UV + 1) << T^{2/5} L`, so the whole
   Type I contribution over q ≤ Q ≤ T^{1/2} is `<< T^{9/10} L`.
2. **Character reduction** (K4, primitive ξ mod d, q = dr, φ(q) ≥ φ(d)φ(r)).
3. **Small conductors d ≤ L^C.** Runs the identity backwards: µ'' = µ + µ' −
   µ_{≤U} − µ_{≤V}. K1 applied class by class mod d (with m = r; hypotheses:
   d ≤ (log y)^{2C} for y ≥ T/L^{A''}, ω(r) ≪ log T ≤ exp{(log T)^{1/2}}) gives
   `<< d y/(log y)^{A''}`; the Type I part gets `<< tau(r) d T^{2/5} L` from
   |Σ_{l≤z} ξ(l)| ≤ d. Total `<< T L^{2C+2}/L^{A''}`, so A'' = A + 2C + 2.
4. **Large conductors d > L^C.** Dyadic split (verified exact numerically),
   ‖α_j‖₂ ≤ 2^{j/2}, ‖β_j‖₂ ≪ (T/2^j)^{1/2}L^{3/2}, so ‖α_j‖₂‖β_j‖₂ ≪ T^{1/2}L^{3/2};
   K3 then summed over j and over dyadic conductor blocks P = 2^i gives
   `<< T L^{11/2}/L^C + T^{9/10} L^{13/2} + Q sqrt(T) L^{11/2}`.
5. **Conclusion.** C = A + 6 and Q ≤ T^{1/2}/L^{A+6} give the estimate, with the
   subtracted main term removed by K1 at modulus 1 with m = q. **B(A) = A + 6**,
   not optimised. The derived statement carries `max_{y<=T}` inside, which the
   note's own mesh argument had to construct by hand; that argument is now
   unnecessary (not wrong).

Scope: reduced classes only; level exactly 1/2 with a log saving; constant
ineffective, so no downstream explicit-constant claim may cite it.

## Numerical check

`research/mobius-bv-validation.js`, output embedded via `node research/qc/embed.js`
(never hand-pasted). Exact integer arithmetic, n ≤ 10^5, eight (U,V,r) sets,
three with r > 1: 800000 pointwise identity checks, 800000 support checks,
1600000 size checks, 800000 dyadic-split checks, all exact. This tests the
identity and the support/size/split claims only; it tests **no** distribution
estimate.

## Two small source discrepancies recorded

- The final display of the book's Ch. 26 prints `x(log x)^5/min{U,V}` where its
  own Corollary 26.7 gives `sqrt(U)`, `sqrt(V)`. Harmless there (they take
  U=V=e^{√log x}) and irrelevant here (the derivation uses Theorem 26.6 directly).
- Granville–Shao's µ assertion was read in the arXiv PDF, not the journal version.

## Files touched

- **new** `research/mobius-bv-derivation.md` (ledger: `Q-mobius-bv-derivation`,
  ANSWERED, todo C, parity line present).
- **new** `research/mobius-bv-validation.js` (embedded output + readings).
- **edited, provenance sentence only** `research/shifted-prime-decomposition.md`
  lines ~66–80: statement (4) unchanged; provenance now points at the new note
  and the published inputs, with the EPFL sheet kept as a teaching reference.

`node research/qc.js`: all 14 checks clean **except one** —
`ledger-todo-unlisted`: TODO.md item C's `Ledger:` line does not list
`Q-mobius-bv-derivation`. TODO.md is off-limits under this brief, so **someone
with the TODO must add that id**; the gate will keep flagging it until then.

## What could not be reached

Iwaniec–Kowalski Ch. 17 text (Theorem 17.4's statement), Opera de Cribro
Theorems 9.16–9.18, Davenport ch. 28 text, and the printed GSM 203 numbering.
