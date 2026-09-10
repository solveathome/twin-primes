# Audit staging: spine (2026-08-17)

<!-- ledger
id: Q-audit-spine
status: ANSWERED
todo: none
question: Do the spine documents - ZONE-POSTULATE, THE-DIALS, THE-LENS, GLOSSARY, OBSERVATIONS - state their objects correctly?
verdict: Findings per file, the leading one a frame error in ZONE-POSTULATE section 5: G2's own exponent measures 1.57 central, bracket 1.3 to 1.9, against a calibrated one-class control, while theta is above 2 and rising, so the two readings that sat on boundary exponent 2 resolve in opposite directions.
-->

Files: `research/ZONE-POSTULATE.md`, `research/THE-DIALS.md`, `research/THE-LENS.md`,
`research/GLOSSARY.md`, `research/OBSERVATIONS.md`.

### research/ZONE-POSTULATE.md

**§5, "Two measurements sat on the boundary exponent 2: window/G₂ above, and the
all-positions exponent θ."** FRAME ERROR plus a stale half. θ was already
corrected; window/G₂ was not. Replaced with both resolutions stated separately
and in opposite directions: G₂'s own exponent measures **1.57 central, bracket
1.3 to 1.9, floor 1** against a calibrated one-class control, with h₂ at 1.567
frame-matched over 21 terms; θ is above 2 and rising (1.9524, 1.9477, 2.0018,
2.0476 at z = 19, 23, 29, 31, then above 2.05 through z = 71). Forced by
`research/exponent-control.md` and `research/theta-ladder.md`.

**§5, "the asymptotic margin the Gap Reformulation depends on is not yet visible
in any data we have."** NARROWED. Still true of the full-tile margin, false of
everything adjacent to it. Added the two measurements that do move: the
certificate ladder gives x²/certificate = 3.8, 7.8, 18.1, 44.9 at
x = 37, 229, 1009, 4001, and the localized margin is **x²/(3.5 ln³x)**, from
`research/two-class-lower-bounds.md` §10 and `research/maxgap-law.md` §8. Also
disambiguated three normalisations that were being read as one: window/G₂ (3 to
4), x²/G₂ (1.63 to 3.26), and window/F.

**§6 route A, "Full decoupling would give 1 + √e ≈ 2.649, which halves the open
band."** ARITHMETIC. It removes about 71% of (2, 4.2665], not half.

**§6 route A, second difficulty floor.** ADDED, and de-blocked into prose. The
target G₂(x#) < x′² − 2 implies g(x#) < x′² − 2, an explicit constant-1
Jacobsthal bound at primorials; Iwaniec 1978 is inexplicit and Erdős #687 pays
$1000 for merely g(x#) = o(x²). Loose end kept: Kanold/Stevens/Paseman not
checked. `research/two-class-lower-bounds.md` §9.

**§6 route B, "This is where the new effort should go first."** RETIRED. Both
halves of route B are closed. The fold half by A6 (head-calm lemma plus the
first-slot recursion, which re-encodes the twin prime sequence). The density
half by the Origin Excess Lemma's expiry: its advantage is capped by an absolute
constant **~2.2** with measured maximum **1.372**, and at S = x′² it **reverses**,
the origin carrying about **21% less** than the ensemble mean with ceiling
ρ(2) = e^{2γ}/4 = 0.79305 (measured 0.79303 at x = 1487). Forced by
`research/origin-excess.md` and `research/maier-matrix.md` §4. Route B's
surviving content is counting inside the head, which is route C.

**§6, two correction blocks and one "see the correction in §5" pointer.** Removed
under the doc convention; their content is now the running text.

**§8 item 5, "Settling whether θ and window/G₂ really converge to exactly 2."**
RETIRED, both halves settled. Replaced by an origin-side item: anything that
survives past S = x′², since everything found so far expires at or before the
zone's own width.

**§8 item 4, window/G₂ unbounded.** NARROWED rather than closed. Kept as open,
with the two supporting measurements named and with the direction of inference
stated, since x²/certificate is an upper bound on x²/G₂ and does not by itself
prove divergence.

**§3.** Added the proven pointwise lower bound G₂(x#) ≥ g(x#) (VERIFIED, ten
shared terms, ratios 2.00 to 8.00) and the imported
Rankin-Pintz-FGKMT consequence.

**§4.** Named the margin column's normalisation, (p′² − p)/(distance to the first
twin above p), so it cannot be confused with window/F.

**§7.** Added that the triage rule's predicted failure mode was paid out by
Holt's Conjecture 2.1 "approximate uniformity" under 2603.25915 Theorem 3.3.

### research/THE-DIALS.md

**§4, "It says which two knobs are still attached to anything."** INTERNAL
CONTRADICTION with the corrected sentence above it, which already said one dial
is live. Dial 4 is slack with no mechanism, not a knob. Fixed to one, and dial 2
named explicitly rather than as a bare "(2)" that reads as the exponent.

**§6, the price of a sufficient gap bound.** ADDED the second price: G₂ ≥ g
pointwise means the target also proves an explicit constant-1 Jacobsthal bound,
prize-adjacent on the classical side. §3's dial 2 row updated to match.

**§0, "4.267 proven, 1 needed".** Normalised to 4.2665 to match every other
statement of β₂ in the file.

### research/THE-LENS.md

**§4, "u-frame | fold multiplier ≤ 1 + O(ln²u/u)".** REFUTED, and it was the
retired rate exactly. The sharp per-fold requirement is **ln c(p) ≤ 2 ln p / p**,
from differentiating the partial-sum condition rather than dividing it by π(u).
Replaced, with the measured spend: 0.77 to 2.14 times the rate on our ladder,
mean 1.06 on Ziller and Morack's dominating sequence, leaving a total lifetime
slack of 0.6 to 1.0 nats and no rate advantage. `research/gate-multiplies.md`.

**§4 reformulation table, no status column.** The Pane Bound and the u-frame were
listed beside three open routes as though all five were live. Added a status
column; both are marked CLOSED with their reasons.

**§6 Positioning, prior art.** OMISSION, and the most serious one in the file.
The note credited the primorial wheel, Schemmel and Ziller-Morack but not Holt
and Rudd, whose programme owns the tile (cycle of gaps), the fold (R1/R2/R3,
Lemma 2.1), the kills (fusions), the Copying and Redundancy Lemmas (Thm 2.3), the
census N2(p#), the zone (interval of survival) and the frontier (horizon of
survival), plus the transfer operator from 2014. Added with the correspondence
and the independent-arrival credential. `research/PRIOR-ART.md`.

**§5.** Added the Holt Conjecture 2.1 example as the triage rule's one payout.

### research/GLOSSARY.md

**Seam, "Seams are 10–20× twin-prime hotspots as points."** This is the trap the
convention warns about: commit dc5a7d0 added a prime-level correction as a
separate entry lower down and left the wrong claim in place, so the file asserted
both. Merged into one entry that states the honest version: the 10–20× is against
a random integer and is entirely slot-hood (a seam is ~25× more likely to be a
slot), and conditional on being a slot a seam is **not** more likely to be a twin
prime (survival 1.016, 0.980, 1.007, 0.986 times the tile mean, z = −1.41 to
+0.13; 1 genuine pair from 20 seam slots against 2.25 expected). The separate
correction entry is gone.

**Zone, "(p, p²)".** WRONG ENDPOINT, and it is the defining term the rest of the
corpus points at. ZONE-POSTULATE, THE-DIALS and THE-LENS all use (p, p′²). Fixed,
here and in the Frontier entry.

**Anchored bias β, "nine levels, 1.156 → 0.853 from @7 to @37".** STALE by one
level. The @41 march gives β = 0.8455306, so: ten levels, 1.156 → 0.846, @7 to
@41. Consistent with `paper/anchored-note.md` and OBSERVATIONS §6.

**Hyperuniformity, Var/E.** NARROWED. The entry gave a drift and a possible limit
but not the stable structure. Added ln(Var/E) ≈ −(0.24u² + 0.13u) in the window
exponent, and the note that no finite computation separates the 0.611 limit from
a slow decay.

**G₂ entry.** Bracketed on both sides: the proven 4.2665 + ε above with the 1.57
measured exponent, and the new proven lower bound G₂ ≥ g below, plus h₂/A288815
named as the adversarial dominating version.

**Corridor and overshoot, two "Correction of record" parentheticals.** Removed
under the doc convention; the reason each figure is what it is now reads as a
statement about the object (the slot set sees two of three twin residues mod 30;
both sides of the ratio must be counted on the comb).

**Grain, "This line previously read 'awaits a law'."** Removed.
**K*, "the earlier 'efficiency collapse' reading was an artifact."** Restated
without reference to the earlier reading.
**Pane Bound, "THE TARGET as originally framed"** and the verdict's date stamp.
Removed; "4.267" normalised to 4.2665.

**Prior art aliases added** to Tile (Holt's cycle of gaps), Fold (R1/R2/R3,
fusions), Census (N2(p#)), Zone (interval of survival), Frontier (horizon of
survival).

### research/OBSERVATIONS.md

**Triage rule.** The rule itself is sound and was left alone. Added its one
payout: it named Holt's failure mode in advance of finding the example.

**Entry 7, "(corrected 2026-08-16 by attack A7; first written 4.95...)."**
Removed under the doc convention, keeping the arithmetic reason for the factor
5 rather than 15/2.

The rest of OBSERVATIONS' worked examples were checked against current numbers
and stand: A048670 at 2, 4, 6, 10, 14, 22; 5·C₂ = 3.301; the Mertens crossing at
0.93125 through q = 23 and 1.0002 once 29 joins; the U = 30 certified floor of 4;
the β residual table against 0.8448944 at @41.
