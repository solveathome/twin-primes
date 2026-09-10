// ============================================================================
// QC / LEDGERS — which findings has a human already ruled on, and why?
// ============================================================================
// Three of the eight checks raise findings that a human can settle but no rule
// can. A near-duplicate pair is either a lost hypothesis or a restatement that
// earns its tokens. A reference whose target is missing is either a dead link or
// a forward reference doing its job. An absence claim is either still true or
// has been falsified by a file that appeared since. Someone opens both sides,
// decides, and writes down the reason. This file is those decisions.
//
// WHY IT IS NOT IN checks.js. The checks are the engine, and the engine is now
// free of this project's vocabulary; qc/README.md draws that boundary. A verdict
// is the opposite of engine. It is about THIS corpus's sentences, on a date, by a
// person, and it means nothing anywhere else. Split apart, a second body of work
// takes checks.js and corpus.js unchanged and starts this file EMPTY. Inheriting
// somebody else's adjudications would suppress findings nobody there had ever
// looked at, which is the only failure a suppression list can have.
//
// WHY NOT IN corpus.js EITHER. corpus.js states things that are true whether or
// not a check ever runs: where the repo is, which files are generated, what a
// shorthand resolves to. Every entry here exists only because a check fired.
// Porting rewrites the config and empties the ledgers, and those are different
// jobs, so they are different files.
//
// THE REASONS ARE THE ASSET, not the keys. A bare list of hashes would suppress
// exactly as well and would deserve no trust at all, because nothing would
// distinguish a verdict that was paid for from one added to make the gate green.
// Never add an entry without its reason and its date, and never shorten one.
//
// HOW A SUPPRESSION LAPSES is different for all three and is the first thing
// stated with each. Read it before adding an entry, because only one of the
// three re-opens itself. `transfers` is keyed on content, so editing either
// passage brings the pair back. `refs` goes inert on its own, because the
// exemption is only ever consulted while the target is missing. `absence` can do
// neither, and that is the trap recorded below.
// ============================================================================

'use strict';

// ---------------------------------------------------------------------------
// refs — targets that are missing on purpose.
// Lapses when: the target appears. The check consults this list only for a path
// that does not resolve, so an entry whose file gets written stops mattering
// without anyone touching it. A stale entry here is dead weight, never a
// blindfold.
// ---------------------------------------------------------------------------
/**
 * References that are correct as written even though the target does not exist,
 * with the reason each is exempt. This is an allowlist and not a mute: a
 * reference earns a place here only when pointing at a missing file is the
 * intended meaning.
 *
 * Keeping this in code rather than in prose matters. The alternative, a note in
 * qc/README.md saying "these two are known false positives", itself contains the
 * paths and so trips the very check it documents, which is how four findings
 * appeared where there is one fact.
 */
const INTENDED_MISSING = new Map([
  ['web/script.md', 'web/PROPOSAL.md names it as an artifact the proposal plans to build'],
  ['web/build-data.js', 'web/PROPOSAL.md names it as an artifact the proposal plans to build'],
  // Not a forward reference: a RECORDED custody gap. research/anchored-windows.md
  // cited this session scratchpad for tables nothing in the repo can regenerate,
  // which partition S2 found by reading and the relative-path check then
  // reproduced. The file is spent and its header now states the gap, prices the
  // fix and forbids quoting the affected sections. Naming the path is the point
  // of that header, so the header trips the check it exists to answer, which is
  // the same reason this list lives in code rather than in prose.
  ['scratchpad/anchored-check.js', 'research/anchored-windows.md is SPENT and its header records this as an open custody gap, priced; the reference is deliberate'],
]);

// ---------------------------------------------------------------------------
// transfers — near-duplicate pairs already word-diffed.
// Lapses when: either passage is edited. The key is content, so the pair
// returns for re-adjudication by itself.
// ---------------------------------------------------------------------------
/**
 * Pairs a human has word-diffed and ruled KEEP, with the reason.
 *
 * `transfers` is the highest-value check and the noisiest, and its noise does
 * not decay: an adjudicated pair reappears on every run forever and costs every
 * future agent the same read. Chris's goal is correctness at the smallest token
 * window, so a verdict that has been paid for once should be recorded once.
 *
 * The key is a CONTENT FINGERPRINT of both passages, never a line number. That
 * is the whole safety property: edit either side and the fingerprint changes,
 * the suppression lapses, and the pair comes back for re-adjudication. A ledger
 * keyed on file and line would go on hiding the pair after someone quietly
 * dropped a hypothesis from it, which is the exact defect this check exists to
 * catch. Run with QC_FINGERPRINTS=1 to print the fingerprints of live findings.
 */
const ADJUDICATED = new Map([
  // 2026-08-28: the full K–K write-up restates three passages of its own short draft.
  ['6f902a:c77387', '2026-08-28 KEEP. paper/kk-lower-bound.md §5 vs draft-kk-lower-bound.md: the sieve-set sentence at z = sqrt y, identical up to LaTeX versus backtick notation; word-diffed, no hypothesis dropped.'],
  ['a21abc:c8cba9', '2026-08-28 KEEP. paper/kk-lower-bound.md \'What Case 2 takes with it\' vs draft-kk-lower-bound.md: same paragraph, \'our Omega^III_p\' became \'the substituted Omega^III_p\' and \'Roughly half the paper\' became \'About half of the source paper\'; word-diffed, no hypothesis dropped.'],
  ['10919f:b4202e', '2026-08-28 KEEP. paper/kk-lower-bound.md Proposition 3 brute-force table vs draft-kk-lower-bound.md: identical six rows; header cell \'(5.1)\' names the same inequality 2m/y < z0; word-diffed.'],
  // Wave 3, 2026-08-17. All thirteen were extracted to files and run through
  // `git diff --no-index --word-diff`; the diffs are in
  // research/history/staging/qc-transfers-J.md. Eleven were KEEP on Chris's rule
  // that restatement adding context earns its tokens; two were defects and were
  // repaired before being recorded here.
  ['b8b425:fdc63d', 'F1 KEEP. anchored-note and staircase-note both define the comb N_x in full. Difference is a blockquote marker, a wrap and a comma. Home is staircase-note §1, which anchored-note names in the surrounding prose and says what the home adds. A self-contained paper cannot define its central object by reference.'],
  ['206ebe:3d2bbb', 'F3 KEEP. covering-dive §2.3 vs two-class-lower-bounds §2. Re-checked for FKMPT: the constant is 6 in both, both name arXiv v4 and the JEMS 25 (2023) 2483-2485 corrigendum, and the backwards 6-to-4 correction has not re-entered.'],
  ['8ed7a4:f60beb', 'F4 KEEP. G2-STATE §4c vs LOCALIZED-GAP §4, the obvious repair. Same PROVEN marker, same numbers, universal quantifier on both sides. Each adds what the other omits: LOCALIZED-GAP the reach of the principle, G2-STATE the four hypotheses and three escapes.'],
  ['80faf0:8e9443', 'F5 KEEP. G2-STATE §4c vs LOCALIZED-GAP §4, Traverse Bound and chain survival.'],
  ['3e2e16:59bd97', 'F6 KEEP. G2-STATE §4b vs LOCALIZED-GAP §3, the Localized Merge Lemma.'],
  ['2b34c8:a87e40', 'F7 KEEP. G2-STATE §4d vs LOCALIZED-GAP, the maxsum growth law.'],
  ['0d0efe:7b011c', 'F8 KEEP. G2-STATE §5 vs ZONE-POSTULATE, the elementary-literature floor.'],
  ['60811b:c68b81', 'F9 KEEP, and it was the one that needed real work. G2-STATE drops "which is the only side this note is about", but the scope survives in the verdict line itself and the §9 caveat is carried in full seventy lines above, with the citation. Not a flattening.'],
  ['017762:151db7', 'F10 KEEP. PRIOR-ART vs U-FRAME §6a, the A288815 comment.'],
  ['1dbeb5:46d3ce', 'F11 was DEFECT D-1 and is REPAIRED. gate-multiplies §6 called the copy theorem an identity with no marker; it now carries the home\'s VERIFIED 40 of 40 over five folds and m <= 8, and names the unproven no-straddling clause the identity rests on.'],
  // 2026-08-18, the search-convention queue. F12 and F13 lapsed BY DESIGN when
  // the `search-convention` check fired on "nobody has tried it directly" in all
  // three copies of this passage. That phrase reads as a literature absence and
  // is not one: the ABSENCE_VERIFIED entries below already record it as a claim
  // about an ARGUMENT this repository has never attempted. Each copy now says so
  // in its own words, so each fingerprint moved and the pairs returned. Re-read
  // and re-adjudicated rather than re-keyed: what the original F12/F13 verdicts
  // protected -- the VERIFIED 40 of 40 marker, the range "five folds and m <= 8",
  // and the no-straddling clause -- is present on all three sides, unchanged.
  ['46d3ce:670601', 'F12b KEEP, re-adjudicated 2026-08-18 (was 46d3ce:76b9a4). U-FRAME §5a step 2 vs gate-multiplies §9. Word-diffed: the only difference introduced since F12 is the scoping sentence appended to each, saying the "nobody" is this repository rather than the literature. Marker, range and no-straddling clause identical on both sides.'],
]);

// ---------------------------------------------------------------------------
// absence — claims of non-existence that a human went and checked.
// Lapses when: never, and that is the danger. Keyed on file and phrase, an entry
// survives the world changing underneath it. Re-verify by hand.
// ---------------------------------------------------------------------------
// THE TRAP, stated because it is subtle and it is how R-1 happened: an absence
// claim can be falsified WITHOUT ITS SENTENCE CHANGING, by a new artifact
// appearing. A content fingerprint therefore does NOT make a verification
// permanent, unlike the transfers ledger where both sides are text. Re-verify
// these whenever a wave adds scripts. The check says so on every run.

const ABSENCE_VERIFIED = new Map([
  ['TODO.md|never computed', '2026-08-17: Var@41. TRUE. paper/anchored-note.md\'s own z table prints "not yet (Var@41 uncomputed)" at x = 41.'],
  ['TODO.md|never started', '2026-08-17: the @17 rerun. TRUE. natal-cap-32 computed T4@17 to ±4e−4 and says in its own output that the identity needs ~3e−9 relative and is "NOT certifiable", so the bound does not exist.'],
  ['TODO.md|was never attempted', '2026-08-17: @23 in the x-multiplicity channel. TRUE. natal-cap-35-x-multiplicity.js hardcodes for(const x of [11,13,17,19]), which does not include 23.'],
  ['TODO.md|nobody has tried', '2026-08-17: bounding the residue-deleted maxsum directly. TRUE. No script in research/ mentions a residue-deleted maxsum; the eight that compute maxsum all go through a kill count. This is a claim about an ARGUMENT never attempted rather than a file never written, so it can go stale without any artifact appearing: re-read it whenever the u-frame branch is worked.'],
  ['research/U-FRAME.md|nobody has tried', '2026-08-17: the same claim as TODO 0c, same evidence, and U-FRAME cites TODO 0c for it rather than asserting it independently. Not a second witness.'],
  ['research/exponent-control.md|does not exist', '2026-09-04 re-verified (still a mathematical non-existence with the sketch attached, no artifact class to list; first 2026-08-17): "a head window does not exist for h2, since by CRT an adversarial cover can be placed anywhere". This is a MATHEMATICAL non-existence with a proof sketch attached, not a missing file, and no directory listing bears on it. Kept in the ledger rather than pattern-excluded because "X does not exist" plus a reason is a shape a future edit could easily turn into an artifact claim.'],
  ['TODO.md|not computed', '2026-08-18: σ_X at @19, in the X-limitation entry. TRUE, and checked at both producers. natal-cap-31-calm-vs-kill.js line 184 is for(const x of [11,13,17]), so the full-scour σ_X stops at @17. natal-cap-35-x-multiplicity.js does run @19, but its part0 opens with CAP31[L.x]; if(!c) return null and @19 has no CAP31 entry, so no sweep and no σ_X happens there; its own reading 7 states this in terms ("there is no CUSTODY line for @19, because part0 runs only for x <= 17"). Note cap-35\'s sweep is also truncated to min(K,20) primes, so even where it runs it is not the full-scour σ_X cap-31 reports. Re-verify if any script gains an @19 full sweep.'],
  ['research/natal-cap-31-calm-vs-kill.md|not computed', '2026-09-04 re-verified (natal-cap-31-calm-vs-kill.js:184 still for(const x of [11,13,17]); grep c_obs still the same three files plus this ledger; first 2026-08-18): c_obs at @19, in the overlap-floor candidate. TRUE. grep -rl c_obs over research/ returns exactly three files: this .md, its own .js, and staging/qc-scope-T.md. The producing script is this file\'s own .js, whose driver is for(const x of [11,13,17]), so no c_obs exists at @19. cap-38 computes S̄, K, V̄ and max VR at @19 but not c_obs, which needs the per-rotation X sweep this file could not afford at that level.'],
  ['research/two-class-lower-bounds.md|nobody has run', '2026-09-04 re-verified (still true in the narrowed form; the scripts naming Maier-Pomerance since then (attack-kk-substitution.js and the growth-law family) are the section 4 accounting itself and fits, none a second dimension-2 ledger; first 2026-08-18): "Nobody has run THIS accounting in dimension 2", where "this" is Maier-Pomerance\'s three-entry ledger. TRUE only in the narrowed form, and the narrowing is the whole content. The blanket form was FALSE and was refuted the same day by pulling Kalmynin-Konyagin, Izv. Math. 88:2 (2024) 225-235 = arXiv:2302.00459, who publish a multi-class Erdos-Rankin construction and do run a dimension-2 Mertens ledger. covering-dive.md §4.2 had recorded that on 2026-08-17 and handed the correction back to this file by name, where it sat unapplied while four other places kept asserting absence. The surviving claim is that MAIER-POMERANCE\'s decomposition specifically has not been run there; K-K\'s ledger is their own and is not that one. Re-verify if any dimension-2 Rankin paper appears that cites Maier-Pomerance: this absence is about one particular published accounting, so a single new citation kills it.'],
  ['TODO.md|not run', '2026-09-04 re-verified (the key now ALSO matches TODO.md:696 the z = 41 sup, NOT RUN: measure-0830-rho-sup-z41.js tails 3 and 4 still read reserved for a stage B segment; and TODO.md:802 the @43 engine, not run: engine-0830-at43-bigint.md says the @41 march was not run and @43 is priced only; first 2026-08-19): the u_sup ladder in the (h,m) basis. VERIFIED TRUE in the morning and KILLED THE SAME DAY, which is exactly what the original entry predicted would happen ("it goes stale the moment anyone attaches the weights"). research/attack-hm-basis.js attached them: K_h(m) = sum over q_i=m of (w_i/q_i) e(-h c_i/m), validated by sum_m K_0(m) = M to 7.7e-15 and by rebuilding Theta_e(a) to 3.12e-16 over 2309 frequencies. The claim in TODO.md that this corpus has not run it is therefore RETIRED and the item is closed; the surviving phrase in that file is historical. Kept in the ledger rather than deleted, because an absence that was true, was recorded with its own expiry condition, and then expired on schedule is the best evidence this framework has that the discipline works.'],
  // RETIRED 2026-08-27, SAME DAY IT WAS WRITTEN, ON ITS OWN STATED EXPIRY
  // CONDITION. The entry below recorded that a run scoring the main term
  // against the ln y*/ln h band means had been dispatched and that the entry
  // would die when it landed. It landed the same afternoon
  // (history/staging/u2-engine-depth.md, scratchpad-grade: the drift
  // reproduces as 0.923 -> 0.984 against the exact partial product, with the
  // Mertens-asymptotic comparator drifting the other way as a control), and a
  // second file reached the same mechanism independently
  // (import-rough-anatomy.md). The TODO sentence was rewritten to state what
  // ran rather than what had not, so the phrase no longer appears and this key
  // no longer matches anything. Kept here, not deleted: an absence that was
  // verified true, recorded with its own expiry condition, and expired on
  // schedule within the hour is the cleanest evidence this framework has that
  // the discipline works -- and it is the second such case in the ledger.
  //   ['TODO.md|has not been run', '2026-08-27: the comparison of the MEASURED
  //   ln y*/ln h band means against the main term's own prediction of them, in
  //   Z2's caveat block. VERIFIED TRUE by hand at the time of writing.']
  ['research/h2-scoping.md|nobody has tried', '2026-09-04 re-verified (sentence still negated and about the OEIS author, not this repository; first 2026-08-17): NEGATED, and about other people. The sentence reads "because its author, who wrote the algorithms, ran out of compute at 245 days for the last term, not because nobody has tried." It asserts the opposite of an absence, about the OEIS community rather than this repository. Recorded rather than pattern-excluded: a negation guard would silently drop real claims that happen to sit near the word "not".'],
]);

// ---------------------------------------------------------------------------
// transfers — RETIRED adjudications. Keys that once matched a live pair and no
// longer do: every one below was superseded by a re-key when its passage was
// edited (the fingerprints moved by design), and the replacement entry lives
// in ADJUDICATED above. NOTHING consults this map for suppression — it exists
// because the reasons are the asset and deleting them would erase the record
// of what was ruled and why. The `adjudicated-pair-vanished` check (added
// 2026-08-20) is what forces a vanished key to move here rather than sit in
// ADJUDICATED suppressing nothing and auditing nothing.
// ---------------------------------------------------------------------------
const ADJUDICATED_RETIRED = new Map([
  ['06fe86:f4e5dd', '2026-09-08 KEEP. research/RESEARCH-EXECUTION.md lane B question vs research/joint-factor-estimate.md ledger block: the note answers the board question and must carry it verbatim (question ledger convention); the verdict and parity lines are the note\'s own. Word-diffed by the handler; no hypothesis dropped. Retired 2026-09-09: the completed execution question was replaced by a closeout board and candidate obligations. Reviewed old and new passages: the original question and full signed C3 scope remain in joint-factor-estimate.md; the board links that owner and still requires its paid complement. No mathematical hypothesis was removed.'],
  // Moved 2026-09-05 after reviewing both revised passages. CRT realizes
  // every joint translated pair configuration; the non-compounding premise
  // was false, rather than a hypothesis to preserve in duplicate prose.
  ['2bdffa:4b8099', 'F2 KEEP. ATTACKS3 vs THE-LENS §3 on the misalignment principle. Retired 2026-09-05: both passages replace that premise by the exact CRT covering identity; see history/staging/review-0905.md §2D.'],
  // Moved 2026-08-22: the TODO rebuild around the Z2-vs-window target
  // condensed item 0c far below the similarity threshold; the U-FRAME
  // §5a statement side is unchanged and 0c still carries the marker, the
  // range and the no-straddling clause in condensed form.
  ['46d3ce:d1d9ea', 'KEEP 2026-08-20 (fifth re-key; the 0c first move was re-priced on the streaming engine T_11..T_31 in the same sweep). Statement side unchanged; no hypothesis dropped.'],
  ['d1d9ea:46d3ce', 'KEEP 2026-08-20 (same pair, opposite key order).'],
  // Moved 2026-08-20 by the gate-repair finale: all eight are superseded
  // re-keys of the TODO-0c / U-FRAME §5a / gate-multiplies passages, whose
  // live keys remain in ADJUDICATED above.
  ['46d3ce:f0c666', 'KEEP 2026-08-19. TODO 0c paraphrases U-FRAME §5a step 2 faithfully (copy theorem + no-straddling clause + 40/40); the 0c×0e rider edit lapsed the prior fingerprint. No hypothesis dropped on either side.'],
  ['200522:46d3ce', 'KEEP 2026-08-19 (re-keyed after the angle-5 price-rider edit). TODO 0c still paraphrases U-FRAME §5a step 2 faithfully; the edited text is the absence/price paragraphs below the theorem statement, which is unchanged. No hypothesis dropped on either side.'],
  ['46d3ce:da3c7a', 'KEEP 2026-08-19 (third re-key; the pair lapses every time 0c gains a rider, by design). TODO 0c still paraphrases U-FRAME §5a step 2 faithfully; the latest edit is the maxsum-law dispute flag below the statement. No hypothesis dropped on either side.'],
  ['46d3ce:d23cd6', 'KEEP 2026-08-20 (fourth re-key, by design). TODO 0c still paraphrases U-FRAME §5a step 2 faithfully; this edit replaced the maxsum-law dispute flag with its outcome — both factors dead, seven levels, twice-blind rule kill — and updated the script count to thirty-one on both sides. No hypothesis dropped on either side.'],
  ['d23cd6:46d3ce', 'KEEP 2026-08-20 (same pair, opposite key order).'],
  ['46d3ce:76b9a4', 'F12 was DEFECT D-1 and is REPAIRED. gate-multiplies §9 kept VERIFIED 40 of 40 but dropped the range; the range and the no-straddling clause are both restored.'],
  ['113946:46d3ce', 'F13 KEEP. TODO 0c vs U-FRAME §5a step 2. TODO 0c was the control case throughout wave 3: it is the only downstream copy that already carried the marker, the range and the no-straddling clause together.'],
  ['46d3ce:90a9ec', 'F13b KEEP, re-adjudicated 2026-08-18 (was 113946:46d3ce). TODO 0c vs U-FRAME §5a step 2. Same edit, same verdict: TODO 0c still carries the marker, the range and the no-straddling clause together, which is why it was the wave-3 control case, and it now also carries the scope of its own "nobody".'],
]);

module.exports = { INTENDED_MISSING, ADJUDICATED, ADJUDICATED_RETIRED, ABSENCE_VERIFIED };
