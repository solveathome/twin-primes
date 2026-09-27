# Prime-research meta-analysis and claim corrections — 27 September 2026

<!-- ledger
id: Q-prime-meta-novelty
status: PARTIAL
todo: none
question: Which claims in the broad corpus survive comparison with the existing research on primes, and what must be corrected?
verdict: No new general law of actual primes is established. Qualitative quadratic-window occupancy follows from Aryan; G2 and 22 terms belong to A144311. The 83# lower-bound certificate independently reproduces Wang's 2024 OEIS witness. Specialized bounds and finite formulas remain useful, with priority and arithmetic-limit questions open.
parity: literature comparison and residue-only finite checking; no new prime-distribution input
-->

**Contributions:** [Benjaminsen](https://solveathome.org/@Benjaminsen) directed
and authorized publication of this work. **Codex (AI assistant)** performed
the source searches, mathematical comparisons, spot checks and drafting;
the exact model variant was not recorded. Original results and project
returns retain their named authors and recorded AI workers. See
[who did the research](RESEARCH-CONTRIBUTIONS-2026-09-27.md) for both this
meta-assessment and the subsequent OEIS reconciliation. Profile credit is
for direction/publication, not sole research authorship.

**Assessment:** this review did not establish a new general theorem about the distribution of actual primes. The corpus contains reproducible checks of known finite results, plausible specialized contributions about sieved sets, and unresolved conjectures that could become contributions. These categories should not be merged into a claim of a new law of primes.

**Attribution correction, 27 September 2026:** the initial version missed Wang's exact 83# witness in the 2024 OEIS revision discussion, although earlier corpus notes already recorded it. The interval is prior work, independently reproduced and checked here. Any implication that this was a new numerical addition is withdrawn. See the [OEIS proposal register](OEIS-PROPOSALS.md) for the primary-source locator and current proposal dispositions.

This is an author-issued research assessment, not an independent platform review verdict or proof that no relevant prior work exists. It records a bounded comparison and the resulting corrections to the living corpus.

**Scope.** I used the original `primeoire` research repository, its prior-art and search-convention records, the public project's 507-claim index and 220-question registry, and the 27 September dump's 169 research-route records. A live route listing supplied newer routes 170–172. I retrieved the 14-entry paper registry (13 available manuscripts), examined the principal mathematical candidates and their current review states, and read selected recent returns, including #1632, #1834, #1884 and #1896. This is a survey guided by the indexes, not a line-by-line rerefereeing of every manuscript, return, or transcript. Live records may change after this snapshot.

The external comparison used primary papers and OEIS, with full theorem/proof passages inspected where noted below. Abstract-only searches are not treated as completed proof-level comparisons. The initial assessment independently reran the interval certificate. During integration, the cyclic empty-window counting identity was also checked against direct enumeration in 24 small-modulus/length cases, and the corrected constant threshold was recomputed. The large research computations were not repeated.

| Candidate | What the evidence supports | Novelty assessment |
|---|---|---|
| Wheel/tile recursion, periodicity, candidate census, symmetry and wave interpretation | Exact descriptions of divisibility | Predominantly established mathematics; the project's organization and vocabulary do not establish mathematical priority |
| The object `G2(x#)` and its original 22-term ladder | `G2(p_n#) - 1 = A144311(n)` | Object and listed terms are prior work |
| `G2(83#) >= 1860` | An explicit interval certificate, independently checked in this assessment | Known certificate: Wang recorded the identical interval in the 2024 OEIS revision discussion; independent validation here, maximality open |
| `G2(x#) <<_epsilon x^(4.26645028...+epsilon)` | A reviewed project application of the DHR sieve | Potentially useful explicit corollary; no new sieve theorem or improved sifting exponent |
| Two-class lower bound of order `x log^3(x) (log log log x)^2 / (log log x)^4` | A written adaptation of a published covering construction | Strongest candidate here for a substantive specialized theorem; priority remains unestablished and source/referee qualifications remain |
| Exact finite twin-candidate correlation and variance formulas | Elementary exact identities, useful explicit constants and computations | Useful specialization; insufficient basis for claiming a new general principle |
| Generalized-Dickman prediction for variance/mean | A model theorem plus an unproved identification with the arithmetic object | A research conjecture, not an established new variance law |
| Linked four-tuple singular-series defect, route 107 | An exact reformulation, numerical evidence and incomplete asymptotic estimates | Plausible research target; the claimed asymptotic is still open |
| New bounded-prime-gap variational work | Exact finite certificates with unresolved support conditions; corrected capped witnesses miss the target | No new prime-gap theorem follows from the reviewed record |

**The finite certificate is a reproduction of prior work.** [OEIS A144311](https://oeis.org/A144311) currently lists 22 exact terms, ending at 1709 for the prime 79. Carter introduced the sequence in 2008; Alekseyev and Wang supplied extensions. For the next prime, 83, Wang's [revision-18 discussion of 26 November 2024](https://oeis.org/history?seq=A144311) already supplies the identical interval and hence

\[
A144311(23)\ge1859,\qquad G_2(83\#)\ge1860.
\]

This assessment independently checked every integer in the interval beginning at
`162791254787456816384305457582341` and containing 1859 integers. Each is congruent to `+1` or `-1` modulo a prime at most 83. Both adjacent integers fail that condition. This proves the stated lower bound and the exact length of this particular covered run. It does not prove that the run is globally longest. Shifting the proposed interval one place provides a failing negative control.

Original interval credit belongs to Jinyuan Wang (2024). Project reproduction and validation credit: [maxime-fleury’s return #1563](https://solveathome.org/projects/twin-primes/return/1563) (recorded model deepseek-v4-flash) reports the already available 309-position configuration; [nielsegberts’s #1632](https://solveathome.org/projects/twin-primes/return/1632) (gpt-6-astra) supplies the explicit integer interval used here; [Benjaminsen’s #1896](https://solveathome.org/projects/twin-primes/return/1896) (claude-opus-5-5) clarifies the translation/provenance. Credit for this meta-assessment and its direct check is separate from those contributions.

The source history matters: returns advertising prefixes 305, 307, 308 and 309 can encode translates of the same configuration. They are not four independent discoveries. #1896 explains this, and #1884 still records the next decision, 310 compressed positions, as unresolved. The certificate is absent from the displayed exact-term table but present in the older revision discussion. It is not a new term, lower-bound discovery or world record by this project.

**The two-sided bounds are the main theoretical candidates.** The [upper-bound paper](https://solveathome.org/projects/twin-primes/papers/beta2-note) applies the dimension-two lower sieve to an arbitrary interval. Its derivation uses a remainder of size `O(D log^7 D)` and a small power separation between the interval length and sieve level. The exponent comes from existing DHR machinery; the note itself says that it introduces no new idea into the sieve. I checked that application at the level of the manuscript, not by rereading the entire Diamond–Halberstam book. The earlier reviewed version had no required corrections; the current author revision still requires independent review. Treat it as a possibly unrecorded corollary, not an improvement to the general theory.

The [lower-bound paper](https://solveathome.org/projects/twin-primes/papers/kk-lower-bound) is more than substituting notation into a published theorem. [Kalmynin–Konyagin](https://arxiv.org/pdf/2302.00459) study translates of polynomial values; their local roots do not have the same fixed separation as our excluded pairs. The project instead adapts their three-band proof. I inspected the covering identity, exceptional smooth-number cases and Euler-product calculation in the current manuscript. Those identify a real specialized mathematical claim worth outside review. This pass did not independently discharge every imported analytic input. The manuscript retains source qualifications and does not claim priority. This integration corrects its numerical-constant sentence, source-record wording and disclosure in response to findings #2651–2653. These are author corrections requiring review of the revised text; earlier platform verdicts do not automatically cover them.

**One candidate can be classified more firmly as a consequence of prior work.** In [Aryan, Theorem 0.1](https://arxiv.org/pdf/1302.2296), specialize to `{0,2}` and the second gap moment. Writing `Q=x#`, `rho=phi(Q)/Q` and `g_i` for cyclic candidate gaps gives

\[
\sum_i g_i^2\ll Q\rho^{-2}.
\]

The number of empty length-`H` windows is `sum_i max(g_i-H,0)`, at most `H^{-1} sum_i g_i^2`. Consequently their fraction is

\[
\ll \frac{(\log x)^2}{H}.
\]

At `H=x^2` this tends to zero. Thus qualitative “almost all quadratic-length windows contain a twin candidate” already follows from this published theorem. This is this assessment’s deduction from the inspected statement, not a quotation. It neither supplies explicit finite constants nor controls the special window in which candidate pairs must be actual primes.

**Exact variance remains useful without supporting a broad novelty claim.** For any fixed admissible tuple `H`, let `nu_p(H)` count its distinct residues modulo `p`. CRT gives the joint density at separation `d` as

\[
J_H(d)=\prod_{p\mid Q}\left(1-\frac{\nu_p(H\cup(H+d))}{p}\right).
\]

Expanding the square of a window count then gives its exact variance. The twin formula is the case `H={0,2}`. This direct derivation explains why a new presentation of the formula need not constitute a new principle. Aryan's general tuple framework already provides the relevant broader setting. The project's explicit finite bounds and reproducible numerical evaluations can still be contributions.

The [variance manuscript](https://solveathome.org/projects/twin-primes/papers/variance-note) correctly separates a proved model limit from the conjecture connecting it to its comb-restricted arithmetic variance. Its proposed diagonal limit is approximately 0.45545648. The one-class comparison is already present in [Gorodetsky's Theorem 1.3](https://arxiv.org/pdf/2111.00853); the two-class identification is not proved here. [Bloom–Kuperberg](https://arxiv.org/abs/2312.09021) also belongs in any priority check concerning moment formulas, though this assessment did not rereferee that paper.

A source formerly marked inaccessible in some route records was readable in this pass: [Finite-Window Noncovering on Primorial Wheels](https://doi.org/10.20944/preprints202608.1299.v1), §3.4, Theorem 9 and Corollary 3. It states exact CRT Fourier factorization and correlation bounds for a related two-class pattern. This is an unrefereed preprint and not an established match for the project's full variance theorem; it does show why a priority claim based on the absence of exact Fourier formulas would require further comparison.

**The newest actual-prime claims remain incomplete or corrected.** Route 107 and [return #1834](https://solveathome.org/projects/twin-primes/return/1834) target the asymptotic of the linked family `{0,2,h,h+2}`. The return explicitly leaves the leading-coefficient lower bound and lower-order terms open, and labels its tail estimate a sketch. Interpreting such an asymptotic as actual twin-count variance would additionally require a suitably uniform Hardy–Littlewood hypothesis. This looks like a better novelty target than another wheel identity, but it is not a completed result.

Route 166 records that a claimed 5–19% discrepancy in twin-count dispersion was affected by an incorrectly constant mean across a changing density. Its proposed correction is itself partly a model. That observation supports repairing the experiment, not announcing a previously unknown prime law. Routes 157 and 167, and the live route 172, likewise do not establish a new bounded-gap result: the corrected capped witness remains below the required threshold, with further qualifications to its Gram-matrix construction.

**The broader structural lessons have precedents.** [Holt–Rudd](https://arxiv.org/abs/1408.6002) already study exact recursions on cycles of sieve gaps. [Holt's September 2026 revision](https://arxiv.org/abs/2608.26384v3) develops exact population models while explicitly assuming an additional distribution property when estimating surviving actual prime gaps. [Petersen et al.](https://arxiv.org/abs/1812.04203) encode primes and twins through wave superpositions. These sources limit claims to originality for periodic, recursive or wave-based interpretations themselves.

The research recommendation is to prioritize the specialized lower-bound manuscript for independent number-theory review, retain the 83# interval as a reproducible check of Wang's known certificate, and treat the linked-pair variance problem as an open candidate. The defensible present claim is that the programme has produced specialized derivations, finite certificates and better-specified open problems. A confirmed new general law of primes has not emerged from this assessment.

**Search limits.** Searches included the owning terms “tuples of reduced residues,” “variance of integers without small prime factors,” “two residue classes Jacobsthal,” “polynomial analogue of Jacobsthal,” “A144311,” and linked twin-pair singular series, with direct retrieval of identified primary sources. Several broad queries were noisy; negative results were not taken as evidence of absence. This was not an exhaustive MathSciNet/zbMATH or citation-network review. No author was contacted and no journal, arXiv or OEIS submission was made. This author-issued assessment is being incorporated into the project research record.

**Verification artifact:** [verify-prime-cover-83.py](verify-prime-cover-83.py). Run `python3 research/verify-prime-cover-83.py` from the research repository root. Its successful output is saved in [prime-cover-83-check.json](prime-cover-83-check.json).


## Claim withdrawals and manuscript disposition

The appropriate remedy is correction of the claims that the source comparison
changes. This audit does not establish a defect requiring withdrawal of an
entire manuscript. Earlier paper versions and their reviews remain in history.

- **Corrected contributor credit:** Benjaminsen directed and authorized these
  tasks; Codex performed their research, checks and writing. The six edited
  manuscripts no longer use blanket sole-author wording. Named external
  authors and recorded contributor accounts/models retain their source and
  revision credit; complete historical attribution remains partial.
- **Retracted novelty claim:** qualitative almost-all quadratic-length windows
  contain a twin candidate. Aryan Theorem 0.1 implies this; the explicit finite
  constants remain a separate contribution. The deduction is written out in
  [variance-note.md](../paper/variance-note.md), §§4–5.
- **Withdrawn priority assertions:** the suite's claims that the DHR application
  or the transferred bound G2 >= g are established first results. A bounded
  unsuccessful search, or absence from Holt's corpus, does not establish that.
  The upper-bound manuscript already acknowledges existing sieve ideas; its
  residual first-lower-bound wording in §5 and the companion wall note’s
  first-upper-bound wording are corrected in this integration.
- **Corrected empirical status:** the reported finite-range variance fit is
  not a proved scaling law. The model limit 0.45546 and the conjecture equating
  it to the arithmetic limit remain distinguished. The existing withdrawal of
  the fitted limit 0.611 remains in force.
- **Retained with qualifications:** the two-class lower-bound adaptation,
  exact finite formulas, explicit occupancy bounds and the 83# certificate.
  The latter is Wang's 2024 interval, reproduced by later project returns;
  this note supplies a direct independent check, not a new discovery claim.
- **Manuscript correction:** lower-bound §8 now uses any
  $0<c<1/(8C)\approx3.73\times10^{-4}$, for example $c=3.7\times10^{-4}$,
  conditional on the cited input. It removes an undefined $c_0$ and the
  incorrect inequality $1/(8C)<3.7\times10^{-4}$. Source-wording and disclosure
  corrections accompany it, without certifying the imported source anew.

The [paper suite](../paper/PAPERS.md) records document-by-document dispositions.
These edits are issued by the author and must not inherit independent-review
status from different manuscript hashes. Other papers are not cleared of their
existing findings by omission from this bounded audit.

## Checks that would change this assessment

A matched prior publication can narrow or remove a remaining priority
candidate. A proof defect in an imported analytic input or its application can
change a bound's status; this pass does not claim a full rerefereeing. A failed
integer divisibility or boundary check would invalidate the retained interval
certificate; the independent checker passed, including the negative control.
The almost-all deduction was checked against the primary theorem's fixed-tuple,
squarefree-modulus and second-moment hypotheses. It controls random translates,
so it supplies no inference about the special actual-prime window.
