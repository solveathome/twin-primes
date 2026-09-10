# Displaced prose: `research/README.md` as it stood, 2026-08-13 to 2026-08-17

*(Written by partition D of the 2026-08-17 consistency campaign. `research/README.md`
was repurposed into the research directory's router, per Chris's ruling recorded in
`qc-CAMPAIGN.md`. The prose below is what the router displaced. It is an **accurate
dated summary of the work as of 2026-08-13**, which is why it was moved here rather
than deleted: every claim in it was true when written, and the sections it duplicated
are each owned by a document written later. The parent session files this into
`research/history/` at the location it judges right — a dated summary document beside
`CHRONICLE.md`, or an appendix to it.*

**Where each section's content now lives.**

| displaced section | current owner |
|---|---|
| Definitions used throughout | `research/GLOSSARY.md` |
| The proven spine | `research/THE-LENS.md` §§1-2 for the mathematics, `research/G2-STATE.md` §8 for the attribution |
| The wall, honestly | `research/THE-LENS.md` §5, `research/ZONE-POSTULATE.md` §5, `paper/moire-primes.md` §7A |
| The ten attacks | `research/ATTACKS.md` |
| Prior art & novelty | `research/PRIOR-ART.md` |
| Provenance | `research/history/CHRONICLE.md` (the 26 folders), `paper/moire-primes.md` §9 (the rediscovery list) |
| The measurements (six-script table) | **kept in the router**, with the script filenames added; it is the only index of scripts 01-06 |

---

## Definitions used throughout

**Full adopted vocabulary: [GLOSSARY.md](GLOSSARY.md)** (tile, fold, seam,
stratum, zone, frontier, family — adopted 2026-08-14; files written earlier
use older words, readings stand). The essentials:

- **Tile Tₚ** — the repeating unit at prime p, width P# = 2·3·…·p (canonical
  alias: the primorial wheel). Each new prime **folds** the tile p times, then
  strikes its residues.
- **Hole / candidate** — a position untouched by every stacked prime's beats.
- **Twin slot** — r with both r and r+2 holes; **census Dₚ = ∏(q−2)** per tile.
- **Zone / frontier** — the quiet stretch (p, p²); below p² the tile is
  crystallized — holes are real primes, twin slots real twin primes, final forever.
- **G₂(n)** — largest gap between consecutive twin slots in the tile (the "twin
  Jacobsthal function").

## The proven spine (each provable in a paragraph; proofs to appear in the paper)

1. **Redundancy Lemma.** A new prime p's *new* kills are exactly p × (old
   survivor set) — a p-magnified copy of the hole pattern itself, starting at p².
   Per new period: φ(old period) new kills (measured 2020–2025 in the
   original research corpus as 1, 1, 2, 8, …).
2. **Crystallization.** Below p², possible = actual, permanently (script 04: 8/8).
3. **Copying Theorem.** Adding p copies every twin slot p times and kills
   exactly 2 copies: D_{n+1} = D_n·(p−2). Created/destroyed = (p−1)/2 → ∞.
   Slot counts ∏(p−2) verified exactly up to 6.5·10⁹ (script 05b).
4. **Euclid-in-moiré.** The mirror edges P#±1 survive every stacking; any
   survivor's smallest prime factor is new. Primes are infinite. (Euclid's
   construction, rediscovered as the edge of the mirror.)
5. **Zone Equivalence.** Twin Prime Conjecture ⟺ infinitely many guaranteed
   zones contain a twin slot.
6. **Gap Reformulation.** If G₂(n) < p_{n+1}² − p_n infinitely often, TPC follows.
7. **Variance Theorem** (script 06; full note in paper/variance-note.md). The
   pattern is a CRT product, so window-count variance is *exactly* computable.
   Verified against brute force; yields per-level certified bounds: ≥ 99.87% of
   all length-p_{next}² windows mod P_97# contain a twin slot. The pattern is
   provably **sub-Poisson** at every computed level and window exponent.
   Var/E is not a constant: it drifts with the level (0.25 → 0.32 at zone
   scale, limit unknown), and the stable empirical structure is
   ln(Var/E) ≈ −(0.24u² + 0.13u) in the window exponent u, with the limit
   posed as an open question.

*(Campaign note, for whoever reads this later: items 1-4 are classical and the
router now says so at the point of use — Holt and Rudd arXiv:1408.6002 Thm 2.3
for 1 and 3, Pritchard 1982 for 2, Euclid IX.20 for 4. Item 5 is a framing
biconditional rather than a spine theorem, per `PRIOR-ART.md`.)*

## The wall, honestly

All lower-bound routes to "the zone contains a twin" run through the **parity
problem** (Selberg): sieve counting cannot distinguish numbers with an odd vs
even number of prime factors. History's breaches all imported outside
structure: Chen (almost-primes), Friedlander–Iwaniec (algebraic bilinear
structure), Zhang/Maynard (equidistribution). In this framework the wall has
two sharp faces:

- **Gap face:** extend Iwaniec's g(q) ≪ ln²q (one forbidden residue per prime —
  exactly the critical exponent) to two forbidden residues with exponent < 2.
- **Window face:** certify in *the* zone the √-cancellation that scripts 03/04
  measure everywhere.

The Twin Prime Conjecture, in this language: *the moiré contains no conspiracy.*
Measured out to 10⁸: no conspiracy ever strays past one standard deviation.

## The ten attacks (see ATTACKS.md + attack-NN-*.js)

Ten systematic assaults on the wall, all executed 2026-08-13. What they yielded:

- **A theorem (attack 8, unconditional):** every zone (p, p²) contains two
  primes at distance ≤ 2(1+o(1))·ln p — crystallization + Chebyshev +
  pigeonhole; certified constant already 2.00 at p=1009. TPC compressed into:
  *remove one logarithm from an elementary bound.*
- **Decoupling (attack 1):** the pattern's monster gaps migrate deep into the
  period; the zone only inherits the frozen actual-twin gap structure. Deep
  G₂ growth cannot threaten the zone.
- **The anchored origin (attacks 2, 10):** head windows live a three-phase
  life — exactly fair until p³ reaches them (new empirical law), a trough with
  asymptotic depth e^{2γ}/4 = 0.79305 at the zone edge, then enrichment that
  is **bounded by e^{2γ} = 3.172 and mortal**, crashing to 0 as p_n → x
  (`anchored-windows.md` §3). "Anchored vs random windows" is this framework's
  most original open formalization. What the origin does not have is a general
  advantage: at S = x'² it carries 21% LESS than mean density.
- **A new object (attack 6):** the map d ↦ G_d. Equal-density differences
  split (G_8 = 198 > G_2 = 150 at 19#): extremal gaps depend on offset
  arithmetic beyond the Hardy–Littlewood density. Unstudied per our audit.
- **The wall, priced (attacks 3, 4, 7, 9):** Gaussian moments (kurt 2.9);
  Fourier budget grows ~2ⁿ vs Legendre's 3ⁿ and misses certifying the p=11
  zone by 18%; optimal quartic certificates beat Chebyshev 57× with parity
  surviving every polynomial degree at geometric cost; the parity step itself
  skims only 8% of candidates (spf > p^0.9 vs prime), and Chen territory holds
  exactly 2.0× the twins — the linear sieve's factor of 2, visible raw. The
  statistics show no cliff at "prime": the wall exists only in certification.
- **Zero exceptions (attack 5):** all ~1,229 prime-square annuli below 10⁸
  contain twin primes; the annulus-induction ladder is uncracked.

*(Campaign note, and it is a retraction rather than a caveat: the attack-4
Fourier-budget numbers in the fifth bullet — the 2ⁿ growth and the 18% near-miss
at p = 11 — are outputs of the column that
`research/attack-04-fourier-budget.js`'s own banner calls "NOT a valid
certificate". **The corrected artifact `natal-cap-02-fourier-budget.js` reverses
the conclusion**: at x = 11 even an oracle fails, cap 117.3 against N = 90, and
the per-prime union bound is structurally dead from there on. The real near-miss
is 15% at x = 7 and it is moot. That is finding P-1 of the campaign, the reason
this block is history rather than body, and the reason nothing carrying an 18%
survives into the router.)*

## Prior art & novelty

A three-agent literature audit (2026-08-13) checked every claim above against
the published record — see **[PRIOR-ART.md](PRIOR-ART.md)** for the full verdict
table with sources. Summary: the classical spine is exactly that (classical,
now properly cited, from H.J.S. Smith 1857 to Iwaniec 1978 to Táfula 2015);
the wave/superposition framing is published up to PRL 2019 and must be cited;
three things survived as candidate novelties — the difference-2 twin Jacobsthal
function G₂ (sequence not in OEIS; reduction refines Ziller–Morack 2017), the
exact two-class window-variance formula with its sub-Poisson scaling law, and
the moiré/palindrome pedagogical synthesis. The open problem behind the Gap
Reformulation is sharp: **no Iwaniec-type upper bound is published for two
omitted residue classes per prime** — Ziller–Morack's bound is conjectural, and
the 2021 FKMPT "long gaps in sieved sets" machinery does not cover this case.
The lower side is not open: G₂(x#) ≥ g(x#) pointwise imports the whole
Erdős–Rankin literature for free (`two-class-lower-bounds.md` §§1, 3).
A large part of the fold apparatus is prior art: Holt and Rudd own the cycle
of gaps, the fold recursion, fusions, the closure theorem, the transfer
operator, the population models, the interval of survival and the one-class
discrepancy; Maier owns the tile-as-matrix; Buchstab owns the survival curve
ω(u). See **[PRIOR-ART.md](PRIOR-ART.md)**.

## Provenance

Built on a 2020–2026 corpus of experiments (26 folders) that independently
rediscovered: wheel factorization, φ(P#) = ∏(p−1), the Euler product density,
the wheel palindrome, ∏(p−2) twin-slot counts (the Hardy–Littlewood local
factors), Fermat's factorization (three ways), and CRT residue lifting. The
framing throughout: independent rediscovery as evidence the moiré lens works,
with canonical names attached wherever they exist.
