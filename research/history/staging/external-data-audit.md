# External-data audit: where the corpus is limited by data it could adopt

<!-- ledger
id: Q-external-data-audit
status: ANSWERED
todo: none
question: Where is the corpus limited by external data it could simply adopt?
verdict: Findings are candidates, not verdicts: the highest settles an open reading for free, since dividing the two now-trusted series moves the G2/h ladder maximum from x = 37 to x = 79 and reverses the fall at x = 53, killing "peaks at x = 37"; the rest tighten quoted constants or retire stale limitation sentences.
-->

*(2026-08-20. Audit under the series rule of 2026-08-20; pattern file
`research/a144311-full-ladder.js`. Findings are CANDIDATES, not verdicts.
Every number quoted from an OEIS entry was fetched today (entry text and
b-files, saved in the session scratchpad); nothing below was recomputed
beyond division on trusted terms.)*

## HIGH — settles an open reading for free

**H1. The h/G2 ratio trend question dies the moment the two trusted series
are divided.** `research/G2-STATE.md` §5 (lines 246–253): the G2/h ratio
"peaks at x = 37 and then falls twice ... read it as 'no trend established'
rather than as a turn" — an open reading held on the 14 custody terms.
Both inputs are now trusted external series: A144311 (adopted 2026-08-20)
and A048670 (entry face, 58 terms). The eight new quotients, x = 47..79:
7.08, 8.21, 8.19, 8.18, 8.45, 8.03, 8.05, **8.55** — the fall reverses at
x = 53 and the ladder maximum moves from 37 to 79. "Peaks at x = 37" is a
two-term dip, not a turn. Effort: eight divisions (checked in this audit);
one G2-STATE edit plus the same row in `research/PRIOR-ART.md` (the h/G2
ratio row `exponent-control.md`:29 names as custody).

**H2. G2 ≤ h2 extends from 14 to all 21 shared terms, and it is a free
cross-series custody guard.** `research/G2-STATE.md` §5: "G2 ≤ h2(x#)
(VERIFIED at all fourteen shared terms)"; `research/THE-DIALS.md`:284 "ten
shared terms". A288815 (21 terms, x ≤ 73, re-fetched today, unchanged) vs
the trusted A144311+1 tail: holds at all seven new levels, h2/G2 = 1.63 to
1.81 (checked here). Beyond hygiene this is the same kind of rationality
check as the full-ladder script's custody-overlap assert — two independent
third-party series confirming each other's plausibility on seven levels
neither we nor the two teams ever cross-checked. Effort: seven divisions
plus edits.

**H3. The A060256 growth-scale reading sits on 35 in-house terms while a
500-term b-file exists and the corpus knows it.** `research/ATTACKS2.md`
row 7: "m(n) computed to n=35; growth **tracks** the HL scale ...
m/predictedScale fluctuates 0.01 to 4.1 ... 'Matches' overstates a ratio
spanning two and a half orders of magnitude", and the doc itself notes
"A060256 already has a 500-term b-file by Pierre Cami" — cited only to
disclaim novelty, never adopted. TODO.md:695 queues "comment contributions —
A060256 growth scale" for OEIS. Validating the scale m(n) ~ (p_n/(e^γ ln
p_n))² on 500 trusted terms instead of 35 is exactly what that planned
contribution needs, and the corpus's own caveat (scatter too wide at 35
terms) is the open question it settles. Effort: one short script, log-space
doubles, minutes. Side note: covering-dive.md:56 records neighbour A384545
(Clements, 1000-term b-file, smooth-multiplier variant) — a second dataset
for the same seam-ladder family, currently unused.

## MEDIUM — tightens a quoted constant, curve, or guard

**M1. A048670's b-file has 64 terms; the corpus uses 58 everywhere.**
`research/exponent-control.md`:21 "OEIS A048670 gives 58 terms, out to
p = 271"; `research/audit-numbers.js`:558 asserts exactly 58;
`research/G2-STATE.md`:701 says "all 50 exact terms" for the same object
(internally inconsistent with the 58). Fetched today: the entry face shows
58 terms but the b-file (Andrzej Bozek) runs to n = 64, a(59)..a(64) =
978, 1002, 1030, 1058, 1098, 1110 (p = 277..311); none of these values
appears anywhere in the working tree (grepped by value). Adoption extends:
the control-estimator bias curve ("58 terms, true exponent 1, measured
1.282" — exponent-control §1 and its line 263 comparison), maxgap-law.md's
diagonal drift c1 ~ (log p)^{0.12±0.03} on "the top 41 exact terms", and
G2-STATE:701's monotone-fall calibration claim. Guard needed: 58/58 overlap
assert plus a provenance note — a(59)-a(64) are single-witness (Bozek,
"Gerbicz's table with added a(58)-a(64)"). A058989 (= A048670 − 1) shows
the same 64-term state. Effort: extend one constant list + re-run.

**M2. A113274's b-file holds 82 twin-gap records to ~2e19; the anchored
guard is argued on 11 in-house decades plus four quoted decade-slopes.**
`research/ZONE-POSTULATE.md` (the margin table ends at 10^10; "The largest
seen anywhere in the run is 8,042, at p = 65,095,731,749"; "nothing in
eleven decades hints at the postulate being tight"), and the retraction
block quotes only Kourbatov's four slopes to 10^15. The b-file (a(73)-a(75)
Oliveira e Silva, a(76)-a(82) Raab; largest record 35,640) extends the
guard check — every record < 0.76 ln³p, margin running away like
p²/polylog — by eight decades of trusted data, record-exact instead of
slope-summarised. Effort: trivial script over 82 rows; touches
ZONE-POSTULATE §"the guard" and the max-A band sentence (also quoted at
PRIOR-ART.md:258).

**M3. The natal-cap-04 diameter ladder was never compared at its owning
convention, and the owning entry's terms are published.**
`research/NATAL-CAP-CAMPAIGN.md` row 4: the two-class k-pair diameters
2, 8, 32, 38, 62, 86, 116, … "returned nothing on an exact-term OEIS search
**in our own wording** ... the owning convention ... is A008407, and the
ladder was never re-run there or at an offset." The doc already knows the
fix; the data (A008407 terms and b-file) is free. Effort: minutes — an
offset/shift comparison in the A008407 frame, closing an open ABSENT-class
claim one way or the other.

## LOW — hygiene: a limitation sentence that outlived the adoption

**L1.** `research/two-class-lower-bounds.md`:33–34: the Y2 ladder's
"fidelity is measured only up to x = 41, and the search budget that makes
it exact there is unaffordable above about x = 100". Superseded:
`research/greedy-oracle-validation.js` already measures fidelity against
A144311's eight published terms to x = 79 (oracle exact to x ≈ 53,
−0.024/level beyond — TODO.md closed-routes block). The sentence should
cite the adopted set and the measured degradation instead of x = 41.

**L2.** `research/G2-STATE.md` §5's table and relations stop at 43# /
"fourteen shared terms" with no pointer to the adopted 22-term set;
`research/THE-DIALS.md`:76 uses "nineteen terms of Ziller-Morack's h₂"
where 21 exist and are used elsewhere (THE-DIALS:302, U-FRAME §6a). Doc
convention says body = latest understanding; one-line cites fix both.

**L3.** Wang's unpublished A144311 a(23) ≥ 1859 witness (PRIOR-ART.md:472,
revision-log only, not in DATA or b-file) is known but unused. It is below
DATA-grade trust, but as a certified-floor-style input (the way
attack-fekete-1d-01 used the greedy floor at 47#) it offers one x = 83
lower-bound point for c2' and defect probes. Optional; flag provenance.

**L4.** OBSERVATIONS.md:670 marks "where the first maximal gap sits" as
"never examined". For the one-class control that question is answered in
print: Gerbicz's linked table on A048670 publishes the positions u(n) for
n = 1..57 (A049300 = smallest such u). The two-class half stays in-house —
and note `research/exact-g2-ladder.js` already records `pos` at all 14
custody levels, so the observation is also limited by forgotten in-house
data.

## Checked today — no upgrade available (denominators for the negatives)

- **A288815 / A072753**: re-fetched; still 21 / 19 terms (to p = 73). The
  c2 fit's 17 terms x in [11,73] already consume every published term in
  range; no h2 exists at 79 to sharpen "h2 dominates G2"; extension is
  priced and rightly declined (`research/h2-scoping.md` — 3.4 machine-months
  per term). The limitation is the literature's, not a refusal.
- **A091592**: still 12 terms; the external 1e7 verification (Wesolowski)
  is already cited in ZONE-POSTULATE §5.
- **A059861**: closed form prod(p−2); computed exactly in-house; b-file
  adds nothing. A023192: already checked 13/13 against its b-file.
- **A049296, A005250-class prime-gap records**: not cited in any working
  doc; no live reading needs them.
- **pi2 anchors (Nicely-class)**: audit-numbers.js already carries
  pi2(1e10) = 27,412,679 and the anchor upgrade is separately planned; no
  other live reading found pi2-limited (anchored-windows works at x = 1e4).
- **Kourbatov 2013 paper data**: slopes, ceiling and A113274 identification
  already integrated (ZONE-POSTULATE, PRIOR-ART) — M2 is the b-file tail
  only. Ziller-Morack ancillary tables (psi2min): algorithmic aid only.
- **attack-fekete-1d / import-interp / greedy-oracle-validation**: already
  adopted the full 22-term A144311 set; the exponent-control 22-term refit
  is queued elsewhere and is not re-reported here.

## Not swept

`research/history/` (excluded by brief, except staging files named by live
docs); `web/`, `attestation/`, `wave7-logs/`, `t37-partials/`; the ~200
research/*.js beyond their A-number hits, vocabulary hits, and the ~15
files read in full — READINGS blocks were not read file-by-file;
`paper/proposals/` beyond grep; the qc engine. External channels: only
oeis.org entry texts and b-files were fetched (plus values cross-greps on
disk); Kourbatov's site, arXiv PDFs, and Bozek's independent verification
status were not fetched — M1's tail is single-witness until checked.
Convention flips were verified for every comparison made (A144311 = G2−1;
A048670 = h exactly; A288815 = h2 exactly; A058989 = h−1).

