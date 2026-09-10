# CHANGELOG entries from wave-2 partition C (`paper/`)

<!-- ledger
id: Q-changelog-add-C
status: ANSWERED
todo: none
question: What history left wave-2 partition C's paper-suite files, and what has to be staged for the CHANGELOG?
verdict: Staged: Door 2's two load-bearing numbers are RETRACTED because the column they came from was disclaimed by its own script's correction banner, the corrected artifact reverses the conclusion, the OEIS term count is corrected to twelve, the matching lower bound is retired, and Zone Equivalence is demoted from spine theorem to framing device.
-->

*(Staged for the parent to merge into `research/history/CHANGELOG.md`. House
form: dated, newest first, grouped by the document changed.)*

---

## 2026-08-17, wave 2: the paper suite corrected against its own research layer

### paper/moire-primes.md

**Door 2 of §7, both load-bearing numbers.** RETRACTED and replaced. The door
claimed the certified window-discrepancy budget "grows like 2ⁿ" and missed
certifying the p = 11 zone "by only 18%", citing `research/attack-04`. Both
numbers came from that script's `certified` column, which its own correction
banner of 2026-08-14 disclaims: it indexed local factors at k mod p and omitted
the CRT twist y_p = (W/p)^{−1} mod p, moving pointwise |S| by up to N/2, so the
column was not a certificate. The corrected artifact
`research/natal-cap-02-fourier-budget.js` reverses the conclusion: at x = 11 a
perfect per-window oracle already fails (cap 117.3 against a census of 90), from
x = 13 the gross strike total alone exceeds the census (1,135 against 990), and
the real near miss is 15% at x = 7 and is moot. The door now states the
mechanism, the per-prime toll it does certify (deviation below N/q for every
q ≤ 263 at x = 17; gross(19) ≤ 1,685 against a true 1,563), and where it stops,
with the retraction left visible in place. Forced by
`research/natal-cap-02-fourier-budget.js` readings 1 to 5, carried as a standing
note in `research/NATAL-CAP-CAMPAIGN.md` since 2026-08-14 and never inherited by
the paper. This was the campaign's only false claim as opposed to an internal
inconsistency.

**Door 5 of §7, the covering theorems.** CORRECTED. Hough (2015) and BBMST
(2022) require **distinct** moduli and our classes {0, −2 mod q} use each
modulus twice, so neither theorem applies to our object. The door now cites
Klein–Koukoulopoulos–Lemieux (2024), Theorem 3, which covers multiplicity s = 2
explicitly and gives **no numeric constant at s = 2**, and marks our translation
inferred. The two-class shortfall is now p/ln²p from Ziller and Morack's
measured law 1.90·x·ln²x rather than the one-class p/ln p, and the "covering
phenomenon of a fundamentally new kind" claim is reduced to what an ABSENT
marker supports. A visible note asks for an expert read. Forced by
`research/covering-dive.md` §§3.1, 3.3, 4.2.

**§7 preamble, "five independent routes, each rigorous until its last step".**
SUPERSEDED. Doors 1 and 4 are one classical object at two truncation depths
(Door 4's union bound is the first line of Brun 1919), and Door 2 fails
structurally at x = 11 rather than at a last step. All five doors are now stated
in three labelled parts, mechanism / toll / where it stops, each with its own
calibration, so a door can no longer lend the authority of its mechanism to its
toll. Same fix to the abstract's "five independent doors".

**§7A Face 4, "missing exactly one ingredient, which we name Lemma V".**
SUPERSEDED. At the working point the ladder measures, s/u ≈ 1.2 is outside the
range s ≤ u that Lemma V is stated in, so the operative assumption is an
unproven Gaussian maximal law for the sawtooth, which is the whole price of the
route. The phrase "maximal law" had appeared in no paper file. Face 4 also now
carries the ladder's ceiling (exact full-period suprema 1.9524, 1.9477, 2.0018,
2.0476 at z = 19, 23, 29, 31) and drops "nothing in print blocks it" for the
κ = 2 sifting limit that does. Forced by `research/sift-limit-attack.md` §§3,
4.5 and `research/theta-ladder.md`.

**§8's "an unexplained structural bias in the helpful direction".** RETIRED. The
anchored calm's mechanism is proven and the calm is uncorrelated with survival,
which §7A Face 2 already said forty lines earlier. Forced by
`research/natal-cap-31-calm-vs-kill.md` reading 1 and
`research/natal-cap-19-calm-lemma.md`.

**The abstract's "the matching lower bound".** RETIRED at all three corpus
sites (this one and `paper/PAPERS.md`:30; `README.md`:28 belongs to another
partition). The bounds are exponent 4.2665 against 1 + o(1). The note itself
says "The point of this note is not sharpness".

**The abstract's one novelty theorem.** The hypothesis p ≥ 17 had been dropped,
and an o(1) inequality was quantified over each p. Both statements, abstract and
§6, now give the finite form (p² − p)/(K − 1) with K = π(p²) − π(p) and derive
the (2 + o(1))·ln p reading from it.

**Six further dropped hypotheses and scopes**, all invisible to anything but a
word diff: the 4,190× certificate at x = 11 needs moments through order 6 and
not degree 4 (degree 4 gives 80×); Face 2's z = −0.30 and −2.71 are the diagonal
ensemble, not Face 1's window ensemble; corr(X, S) = 0.99 and the 97% hold at
x = 17, the ladder being 0.48, 0.91, 0.99; "the anchor is in deficit" printed a
45% surplus as its first value; K* is a function of the moduli pool as well as
of x and its home withdraws the word "law"; the certificate ladder costs 5μ per
**two** degrees, only even degrees existing.

**Attribution.** FKMPT's Remark 7, not FGKMT's; arXiv:1402.1970 is Holt **and
Rudd**; Klein–Koukoulopoulos–Lemieux and Brun added to the references, and the
FKMPT corrigendum (JEMS 25 (2023), 2483–2485) cited beside the paper;
H. J. S. Smith 1857 now carries PRIOR-ART's "per Dickson's *History*" hedge;
our "fusion" is distinguished from Holt's; Maier (1985) and Brun (1920) cited at
their points of use in §7A, which had cited nothing outside this repository.

**Honesty items the notes carried and the flagship did not.** The certified
floor at x = 29 now prints the truth beside it (31,327 against 12,307,838, being
0.25%); Face 1 gains the parity floor's measured gap (2 against the needed 1.28
at x = 17) and the z-ladder's nine-level scope; the §7A preamble now states that
the faces overlap the doors, Face 2 being Door 4's overlap credit and Door 3's
certificates seen again.

### paper/anchored-note.md

**§10's "the anchored-calm lemma, two legs from closed" and its five-level
ladder.** SUPERSEDED. The certified aggregate 30-skeleton bound now reads six
levels, @11 through @29, at 0.2132, 0.1113, 0.1011, 0.1259, 0.0945, 0.1176, the
@29 row reproduced during this campaign, so the leg is a theorem for x ≤ 29 and
no longer for x ≤ 23. The reading "the deepest level also the lowest" is
**false** at six levels, the minimum being 0.0945 at @23, and the worry it
softened is back. The paragraph no longer names a lemma, since its parts carry
four calibrations, and it now states that the uniform-in-q form of the
anticorrelation is **refuted** (595 of 599 scour primes anticorrelate; four
cataloged exceptions) and that only the aggregate form is claimed. Forced by
`research/natal-cap-36-skeleton-door.js --at29` and
`research/natal-cap-23-covadj-proof.md`:175-179.

**The X-limitation theorem, "from @13 on".** SCOPE CORRECTED at both paper
sites. `research/natal-cap-31-calm-vs-kill.js` reading 3 marks the proof
"per level, from L2 + enumerated max VR", and the enumerated maxima exist at @11,
@13 and @17 only. The theorem is stated as proven at @13 and @17, with the
extension upward resting on two measured trends (max VR bounded at 2.78, 2.35,
2.14; the driver S̄/√(K·V̄) growing 3.1, 4.9, 9.8).

**§7's "the entire Twin Prime Conjecture lives inside that single ratio".**
QUALIFIED: positivity suffices, no converse is claimed, so Assumption A is at
least as strong as the conjecture and may be strictly stronger.

**§11's "the proven layer around it (… Proposition 1 …)".** CORRECTED to
Proposition 1's part (i), part (ii) being an extrapolation of two measured
trends, which the same section says four lines later.

### paper/staircase-note.md

**§9's quotation of Fan and Pomerance.** CORRECTED. The source reads
Φ(x,y) < .6x/log y when y ≤ √x; the note printed 6x/log y for y ≤ x, a dropped
decimal point and a dropped square root, in a bound the note leans on. Forced by
the arXiv:2306.03339 text quoted in `research/history/staging/qc-refs.md` W5.

**Honesty item 1, "four finite computations".** CORRECTED to six; the note's own
Theorem 8 table has had six rows since 2026-08-15.

**The title's name.** The status block now states that "the Staircase Theorem"
names Theorem 3 and nothing else, the certified floors being Theorem 8 at six
levels and the tail bound Theorem 6, the note's one non-elementary ingredient.

### paper/beta2-note.md

**Two "FGKMT Remark 7" attributions.** CORRECTED to FKMPT (Ford, Konyagin,
Maynard, **Pomerance**, Tao, *Long gaps in sieved sets*), one of them at :152
which the reference audit did not list. The corrigendum is now cited beside it.

### paper/PAPERS.md

**Paper II's title.** The note governs: "An upper bound for the twin Jacobsthal
function", replacing "Two-sided bounds for …", with the reason recorded in
place.

**"Iwaniec's contested transfer lemma".** The word DROPPED. One unanswered 2016
MathOverflow post is not a controversy. Replaced by the note that the route
avoids the lemma entirely and that an explicit-constant or formalised exposition
of it would be useful.

**"the matching lower bound".** Retired, as in the flagship.

**Zone Equivalence listed among "the spine theorems".** CORRECTED to a framing
device presented as a proposition, which is what `research/PRIOR-ART.md` asks
for and what `paper/moire-primes.md` §6 already does.

**"OEIS: G₂ sequence (drafted, 11 terms)".** CORRECTED to twelve, through
a(12) = G₂(37#) = 528.

**The Lemma V map's positioning.** Now carries the qualification that travels
with it: the operative assumption at the measured working point is the Gaussian
maximal law, not Lemma V.
