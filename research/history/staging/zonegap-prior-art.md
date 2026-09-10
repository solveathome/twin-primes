# zonegap-prior-art — the owning-convention survey for Z₂(p), run BEFORE results land

<!-- ledger
id: Q-zonegap-prior-art
status: ANSWERED
todo: none
question: Who owns Z2(p), the maximal twin-prime gap below a quadratic cutoff, in the owning conventions?
verdict: Kourbatov (2013) and Kourbatov-Wolf (2019) own maximal twin-prime gaps, with heuristics and records and nothing proven; the zone form (p, p′^2) has five neighbours and no owner, and the per-zone quadratic-cutoff object appears absent on channels calibrated in the same session.
-->

*(Literature recon, 2026-08-21. Commissioned with the Z₂ measurement sweep
(`research/zonegap-01.js`, a sibling agent's; its data are not presumed
anywhere below). Own new file only; PRIOR-ART additions are PROPOSED in §6,
not applied. Nothing committed, nothing pushed.)*

**The object.** Z₂(p): the largest gap between consecutive twin-prime pairs
inside the zone (p, p′²) — one number per zone; since zone survivors are
certified prime, a statement about maximal twin-prime gaps below a quadratic
cutoff (`research/GLOSSARY.md`, Zone gap entry).

**Channels used and calibrated this session** (per
`research/SEARCH-CONVENTIONS.md`): WebSearch (calibration: the two known
positives arXiv:1301.2242 and arXiv:1901.03785 both returned on first query);
the OEIS text API `oeis.org/search?fmt=text` (calibration in the same minutes:
`2,6,18,30,66,150,192,258` → A288815 and `2,4,6,10,14,22,26,34,40,46,58,66` →
A048670, both correct); arXiv PDFs fetched via `export.arxiv.org` and read
with `pdftotext -layout` (page-image reads, sha256s in §5). Reverse-citation
walks: the full 18-sequence reverse-citation set of A113274 was enumerated and
every `%N` read.

## 1. Who owns "maximal gaps between twin primes" — verdict: Kourbatov (2013) and Kourbatov–Wolf (2019), heuristics + records, nothing proven

The owning convention is **"maximal gaps between prime k-tuples"**, fitted
against `log^{k+1} p` (`SEARCH-CONVENTIONS.md` §1, the A113274 row). The two
governing papers, both now read at page image (the 2013 paper was already
verified verbatim, `lit-pdf-kourbatov-grob.md`; the 2019 paper was read this
session, §5):

**Kourbatov 2013** (JIS 16, 13.5.2 = arXiv:1301.2242) — the corpus's existing
bullets stand unchanged: Table 1's four rising decade slopes 0.4576 → 0.5628
against log³p, the heuristic ceiling *"Maximal gaps between twin primes are
less than 0.76 log³ p"*, `a = 0.75739 log² p`, `E3 = a log p`, the
"not a 'one-slope-fits-all'" caveat, statement (B) with `M_k ≈ C_k` and note
5's `M_k = C_k = H_k^{−1}`. Nothing here is a theorem; (B) sits under a
heading that says "Conjectures", and his §6 records that the analogous k = 1
bound is conjecturally VIOLATED on an infinite subsequence (Granville's
`2e^{−γ} = 1.1229` against Cramér), with nothing ruling out the same
correction for twins.

**Kourbatov–Wolf 2019**, *Predicting maximal gaps in sets of primes*,
arXiv:1901.03785 = Mathematics 7 (2019) 400 (read in full this session,
sha256 §5). The general setting is P_c(q, r, H): primes `p ≡ r (mod q)`
starting a k-tuple of pattern H. The published growth-law statements, exact
forms:

- **Trend (abstract, and Definitions 4–5):** for k ≥ 2,
  `G_c(x) ∼ (x/π_c(x))·(log π_c(x) + O_k(1))`; the "upper trend" is
  `T̄_c(x) = ā_c(x)·log(x/ā_c(x))` with expected average gap
  `ā_c(x) = (ϕ_{k,H}(q)/C_{k,H})·log^k x` (Golubev's totient ϕ; C_{2,H} =
  2∏p(p−2)/(p−1)² ≈ **1.32032363**, their Appendix — this is our 2C₂, his
  2013 H₂; the notation-collision warning in `ZONE-POSTULATE.md` §4 covers
  it).
- **Generalized Cramér conjecture (their heading):** ALMOST ALL maximal gaps
  satisfy `G_c(p) < C_{k,H}^{−1} ϕ_{k,H}(q) log^{k+1} p`. For plain twins
  (q = 2, ϕ = 1) that is `G(p) < 0.7574 log³ p` — the 2013 ceiling again, now
  explicitly an almost-all statement, not an all-records one.
- **Generalized Shanks conjecture:** almost all maximal gaps satisfy
  `G_c(p) ∼ C_{k,H}^{−1} ϕ_{k,H}(q) log^{k+1} p` — the constant is not just a
  bound but the conjectured asymptote of the record sizes themselves.
- **Trend conjecture:** a positive proportion of maximal gaps sit between the
  lower and upper trends, and `G_c(x) − T̄_c(x)` changes sign infinitely
  often. Rescaled maximal gaps approach the Gumbel distribution; the number
  of maximal gaps below x is conjectured `O_k(log x)`.

**What is PROVEN in this literature: nothing, verified.** The string
"Theorem" does not occur in the 2019 paper (grep over the full pdftotext
extraction, both modes); every growth statement is under "Heuristics and
Conjectures" and rests on their k-tuple infinitude + equidistribution
conjectures, which they derive from Bateman–Horn. The only proven items
quoted are one-class (FGKMT lower bounds, BHP `x^{0.525}`). This mirrors the
corpus's standing position: no unconditional upper bound of ANY exponent on
actual twin gaps exists — that would imply TPC.

**Data ranges certified:** 2013 — records to 10¹⁵ (Fischer's computation, his
Table 2); 2019 — "extensive computations for primes up to 10¹⁴" (abstract;
residue-class sweeps at q up to 16001, twins at q = 313 to 10¹²); the
A113274 b-file — 82 records, starts to 7.05·10¹⁶ (Raab; Luhn's page says
"below 1.00·10¹⁷"), single-witness tails, adopted with that caveat in
`research/a113274-gap-records.js`.

## 2. The zone form (p, p′²): five neighbors found, none owns it

The "twin analogue of the between-p-and-p² tradition" exists in print in
several Legendre-type shapes, one refereed. Ranked by weight:

**(i) Kourbatov 2013 §7, "Corollaries: Legendre-type conjectures" — REFEREED,
and already page-verified in this corpus** (`lit-pdf-kourbatov-grob.md` Item
3, "Bonus"): from statement (B) he derives *"For each integer n > 122, there
are twin primes between n² and (n+1)². (A091592)"* and *"For each integer
n > 0, there are twin primes between n³ and (n+1)³."* His argument — any
positive power of x beats any power of log x, plus a computer check for small
n — is exactly the Zone Postulate's margin argument at linear windows. This
is the closest refereed statement to the postulate's neighborhood, and it is
conditional on (B) by its own §7 heading.

**(ii) OEIS A192870 (Kourbatov, 2011)** — the threshold form: "the maximum
integer M such that there are no prime n-tuplets between M² and (M+1)²";
a(2) = 122 for twins. Its comment (edited Pfoertner 2021) states the
difficulty exactly: *"there is no proof that the greatest integer M exists —
not even for a subset of values of n. If one could find a constructive
existence proof, then Twin Prime Conjecture as well as Legendre's Conjecture
would require just a trivial additional step."* And the HL comment carries
the envelope argument: assuming the k-tuple conjecture, average k-tuple
spacing grows slower than the distance between consecutive squares —
"an indication (but not a proof)".

**(iii) A091592 / A091591 (Pfoertner, Jan 2004)** — already in
`ZONE-POSTULATE.md` §5a. New provenance detail from the entry read this
session: the first 7 terms come from a **de.sci.mathematik newsgroup thread,
"Primzahlen zwischen (2x−1)² und (2x+1)²"** (Ernst Jung, with Hermann Kremer
and Rainer Rosenthal), so the German newsgroup tradition posed the odd-square
twin window before the OEIS entry existed. The entry links Korevaar's
prime-pair survey (Indag. Math. 23 (2012) 269–299; not reachable at page
level this session) and Pfoertner's own "Illustration of record gaps between
pairs of twin primes" PDF.

**(iv) "Majid's Conjecture" — primepuzzles.net Conjecture 86 (Majid Azimi,
Oct 2020):** *"There is at least one couple of twin primes between the square
of consecutive odd number, (2n−1)² and (2n+1)², for n ≥ 1"* — tested by the
proposer to n ≤ 10⁹, with Kourbatov himself commenting (Dec 2020) and citing
his §7 + A192870. Unrefereed puzzle-site conjecture, but NAMED, dated, and
the exact odd-square window of the 2004 newsgroup thread.

**(v) The Brocard-style twin variant on prime squares — the nearest statement
to ours, and it is in a WITHDRAWN preprint.** Jens Oehlschlägel, *Reasoning
about Primes (II)*, arXiv:1411.6582v1 (Nov 2014; v2 Aug 2015 withdrew the
paper for "a crucial error in Lemma 8.4"), Conjecture 4.1, read verbatim this
session (§5): **"(Twin recursion conjecture). There exists at least one pair
of twin primes {p̂, p̂+2} between the squares p² and p′² of two successive
primes p and p′."** Since (p², p′²) ⊂ (p, p′²), this conjecture — if adopted
— strictly IMPLIES the strong Zone Postulate at every p. It is unrefereed,
withdrawn, and proposes no gap object, no growth law, and no data beyond
plots; but it is a named conjecture with 2014 priority on the
twin-pair-between-consecutive-prime-squares statement, and honesty requires
it in PRIOR-ART.

Two weaker adjacencies, both math.GM: Giulio Morpurgo, arXiv:2210.15487
(2022/23), conjectures twins in ((p_n−2)², p_n²) — a shifted-square window,
with counting heuristics; Shaon Sahoo, arXiv:2204.08435 (2022), a
power-mean criterion implying a twin pair in (x, x^β], β = 1 + c/log²x — a
linear-scale window, not quadratic. Informal older instance: a 2005
PhysicsForums post (user jnorris) asks for a twin pair q in
(p², (p+2)²−2) between consecutive twin-pair squares. None of these is
citable as owning anything; they are recorded so the next sweep does not
mistake them for finds.

**What no found statement does:** tie the window to (p, p′²) — every neighbor
uses squares-to-squares. The zone's lower end p (not p²), which is what makes
Z₂ a per-tile object with the certification link (every zone hole is prime),
appears in none of them. The (p, p²) interval for TWINS was searched in the
owning convention's own vocabulary ("twin primes between p and p²",
Legendre/Brocard/Oppermann twin analogues) on the calibrated WebSearch
channel: the only surfaced instances of the exact (p, p²) form are a viXra
PDF and forum posts, i.e., nothing in the citable literature; this absence is
recorded with that denominator, per `research/SEARCH-CONVENTIONS.md`.

## 3. The quadratic-cutoff maximal-gap form — the per-zone object appears absent

The question was whether anyone studies **max twin gap below p² as a function
of p** — Z₂'s envelope — or the per-zone max-gap object itself. Searched in
the owning convention (maximal/record gaps between twin primes / prime
k-tuples, per `SEARCH-CONVENTIONS.md` §1), on the calibrated channels of the
header, including the complete 18-sequence reverse-citation set of A113274
(every referencing sequence's `%N` read: the k-tuple record family
A200503/A201051/…, the first-occurrence family A036062/A036063/A052350/
A340573, A091592, A113275, A261701/A261731) and A091592's own
cross-references: **no instance found of a maximal twin gap indexed by a
quadratic cutoff, and no per-zone (one-number-per-p) gap object at all.**
What exists instead, and how close each comes:

- **Kourbatov 2013 §7 / A192870** compare the maximal-gap LAW against the
  square window to conclude occupancy — the envelope ARGUMENT, run once,
  globally, never as a function studied in its own right.
- **Kourbatov–Wolf 2019** index everything by x with the gap's own scale
  log^{k+1} x; no windowed or localized variant appears anywhere in the
  paper (checked: "square" occurs only as squares of functions; "Legendre"
  occurs zero times).
- **Holt's stated open problem** (arXiv:2603.25915, already in
  `research/PRIOR-ART.md`): situate large gaps of the cycle G(p_k#) relative
  to *"the horizon of survival p_{k+1}²"* — the zone frame for ONE-CLASS
  gaps, proposed and not pursued. This remains the nearest published
  intention to the zone-gap object, and it is not about twins.
- The first-occurrence tradition (Wolf's 1996–97 preprints, TOS's F(g)/T(g)
  table, Kourbatov–Wolf JIS 23 (2020) on first occurrences in residue
  classes) indexes gaps by SIZE (when does gap g first appear), the inverse
  of our indexing — the convention-flip lesson says record that adjacency
  explicitly: Z₂'s envelope read at record points is the record ladder, and
  the record ladder is owned; Z₂ as a function of the zone is not.

## 4. The data carriers (task c): who holds the twin-gap tables

The sibling sweep already settled the Nicely question in its own header
(`research/zonegap-01.js`): **trnicely.net carries first-occurrence PRIME
gaps and twin COUNTS only** (verified there against the archived site) — the
twin-gap first-occurrence table is **Oliveira e Silva's** (sweet.ua.pt/tos),
adopted as `research/tos-twin-gaps-1e16.txt` under the series rule:
exhaustive F(g)/T(g) to 10¹⁶, table dated 2013-08-05, with the 75
record-starred rows required to equal A113274 records 1..75 on pain of
voiding trust. Nothing to re-adopt; recorded here so this survey and the
sweep point at the same custody.

Independently found this session: **Norman Luhn's pzktupel.de
(`RecordGaps/GAP02.php`)** carries the same 82-record ladder "below
1.00·10¹⁷" with per-record discoverer credits — Rathbun (1998), Wolf (1999),
Fischer (2008), Oliveira e Silva (2013), R. Smith / T. Ritschel (2019), Raab
(2019–2021) — and links the mersenneforum thread (t=24303) where the
post-2019 records were produced. This is the live continuation channel of
A113274 and the natural first stop when the record ladder next needs
extending.

## 5. Artifacts read at page image this session

All fetched to the session scratchpad, extracted with `pdftotext -layout`
and cross-read in raw mode; quotes above come from these files, not from
search snippets or abstract pages.

| artifact | source | sha256 |
|---|---|---|
| Kourbatov–Wolf 2019, 30 pp. (arXiv:1901.03785, = Mathematics 7:400) | `arxiv.org/pdf/1901.03785` | `7d69b3564c38a0d0525eeb6a2184bd0375682d2cc61d619b6c1d9398e8767509` |
| Oehlschlägel 2014, arXiv:1411.6582**v1** (v2 = withdrawal notice) | `export.arxiv.org/pdf/1411.6582v1` | `f2e29048fc1ad3e23d7b47362d54b8112f992bd96edc9557c1aab85479a39908` |
| Morpurgo, arXiv:2210.15487v2 (math.GM, 4 pp.) | `export.arxiv.org/pdf/2210.15487` | `5515b8377080c94d46f287b79bd7a87d5ccf106fd32001cc9d4a57fcdf51253f` |
| Sahoo, arXiv:2204.08435v2 (math.GM, 6 pp.) | `export.arxiv.org/pdf/2204.08435` | `e31865500f7479ade1c505945f774614aa08b69856c85d4211894f04b64198ea` |

OEIS entries read via the text API (`fmt=text`, full internal format):
A091592 (incl. the newsgroup provenance comment), A113274 (full %H/%E),
A192870 (full comments incl. the Raab sextuplet bound a(6) > 3005845357 and
his order-of-magnitude estimates a(7)..a(10)). Web pages read through the
fetch tool: primepuzzles Conjecture 86, pzktupel.de GAP02, the 2005
PhysicsForums thread. Kourbatov 2013 was NOT re-fetched: the corpus already
holds a verbatim page-image verification (`lit-pdf-kourbatov-grob.md`,
md5s recorded there), and the standing compute rule says cite it.

## 6. Proposed PRIOR-ART additions (not applied)

Proposed for the maintainer of `research/PRIOR-ART.md`, as additions near
the existing Kourbatov bullet:

1. **Kourbatov–Wolf 2019 bullet** (§1 above): the generalized
   Cramér/Shanks forms with `C_{2,H} = 1.32032`, the almost-all
   qualification, Gumbel, `O_k(log x)` maximal gaps below x, nothing proven,
   data to 10¹⁴. The 2013 bullet currently carries the whole load; the 2019
   paper is the same authors' own successor and sharpens what "the law" is.
2. **A Legendre-type-twin-conjectures bullet** (§2 above): Kourbatov 2013 §7
   (refereed, conditional on (B)); A192870 with its TPC+Legendre comment;
   A091592's newsgroup provenance; Majid's Conjecture 86 (2020); and the
   withdrawn Oehlschlägel "Twin recursion conjecture" (arXiv:1411.6582v1,
   2014) with its exact statement and its implication of the strong Zone
   Postulate. These OWN the postulate's square-window neighborhood; the
   (p, p′²) lower end and the per-zone gap object remain outside all of
   them.
3. **A data-carriers line**: Luhn's pzktupel.de GAP02 as A113274's live
   continuation channel (§4 above).

## NOT-REACHED

Recorded so the next wave spends budget on what is left, per
`SEARCH-CONVENTIONS.md` §3's discipline.

- **Guy, UPINT §A8 "Gaps between primes. Twin primes" — not read at page
  level.** Its existence and scope were confirmed (2nd ed. pp. 19–23 via the
  ToC scan); whether it records a named twin-between-squares conjecture or a
  maximal-twin-gap law is unverified. Same for **Ribenboim** (New Book of
  Prime Number Records, twin chapter). Both are books with no reachable page
  text on this session's channels.
- **Korevaar, Indag. Math. 23 (2012) 269–299** (linked from A091592):
  ScienceDirect returned 403. Whether the prime-pair survey states an
  interval-between-squares result is unverified.
- **Wolf's 1990s preprints** ("On the twin and cousin primes" 1996, "First
  occurrence of a given gap between consecutive primes" 1997): known only
  through citations; not fetched. They are the origin of the first-occurrence
  twin-gap heuristics that KW 2019 supersedes.
- **OEIS numeric search for a Z₂ ladder** — deliberately deferred: the
  sibling sweep owns the values, and the ±1/±2/three-offsets flip search
  (`SEARCH-CONVENTIONS.md` §2) can only be run once its ladder is embedded.
  Until that search is run and recorded, no "Z₂'s value ladder is not in
  OEIS" claim may be written anywhere.
- **MathSciNet/zbMATH sweeps** for "gaps between twin primes" bibliographic
  records: not run this session (the mrlookup channel exists and is
  calibrated per `SEARCH-CONVENTIONS.md` §5, but was not exercised here).
  The absences claimed in §3 rest on the calibrated WebSearch + OEIS
  channels and the reverse-citation walk only.
- **Kourbatov's remaining papers** (1309.4053 record-gap tables, 1401.6959
  Cramér-model distribution, 1610.03340 residue-class maximal gaps, JIS 23
  (2020) first occurrences): abstracts/citations only; none was read at page
  image. 1309.4053 in particular may carry certified record tables worth
  adopting if the paper phase needs a second witness for A113274's middle
  range.

---

*History layer: process record, staging. See `research/history/CHANGELOG.md` for the corpus rule.*
