# Paper III restructured: the spectral form, the model's limit theorem, the identification as a conjecture, and the 0.611 refutation demoted to a calibration paragraph

<!-- ledger
id: Q-paper-iii-restructure
status: ANSWERED
todo: 9
question: Is Paper III restructured around the proven model theorem?
verdict: Yes. paper/variance-note.md now carries four new sections in place of its fit narrative: sec.8 the proven spectral form (Var/E = delta X, delta ln^2 W -> 16 C_2 e^{-2gamma}/3 = 1.109905, the Montgomery-Soundararajan main term exactly L prime by prime, so all of Var/E is discrepancy), sec.9 the decoupled model with Theorems 7 and 8 and Lemmas 9-11 written out with proofs and the closed form lambda_2(2) = 1 - e^{-2gamma}(9/2 - 4 ln 2) = 0.45546 plus the theta = 1 identity with Gorodetsky, sec.10 Conjecture 1 (delta(X - X_dec) -> 0) with eight exact ratios, two of three lag groups closed and the third named as a divisor-distribution statement not yet searched, and sec.11 the 0.611 refutation as a short calibration paragraph; sections 1-5 are untouched, the abstract and section 6's open question are rewritten to match, and the "u = 2 exactly" defect in section 7 is corrected.
-->

*Staging note, 2026-08-28. TODO item 9. Editorial pass, nothing measured: every
number written into the paper is cited from an embedded producer and none was
recomputed here, per the standing compute rule. Sources read: `paper/PAPERS.md`,
`paper/writing-style-math.md`, and in `research/history/staging/`
`varE-asymptotic.md`, `varE-spectral.md`, `varE-theta2-step.md`,
`varE-theta2-proof.md`, `varE-limit-theorem.md`, `varE-exact-ladder-01.md`,
`redteam-0828-varE.md`, `applied-0828-varE.md`, `lit-dickman-variance.md`, plus
`research/GLOSSARY.md`'s Var/E entry. The only file edited is
`paper/variance-note.md`. No script was run except `node research/qc.js quotes
refs`, no git command was run.*

## 0. Verdict, and what did not move

**Nothing was proven here and no number moved.** This is a writing pass. The
mathematics it carries into the live layer is the corpus's, at the rung the
corpus assigns it, and two of those rungs are load-bearing: §9's theorems are
this project's own derivations with no external referee's pass, and §10's
conjecture is the one unproven link between them and the variance of §7's
table. The paper says both, in those words.

**The claim the paper no longer makes.** Its old abstract and §7 closing put the
open question at "a single constant, near 0.611". The abstract now says no value
of the limit is measured anywhere in the note, and §11 carries the control that
refutes the inference on both halves of its protocol.

**One defect corrected in passing.** §7's "so that $u = \ln L/\ln y = 2$
exactly" was false at every finite level, since $y$ is the largest prime *below*
$\sqrt W$. It now reads "2 in the limit, and 2.0847, 2.0116, then 2.000x from
$x = 13$ up", with the load stated (`redteam-0828-varE.md` §2). This was one of
the seven live-doc sentences `applied-0828-varE.md` §5 left at the door.

**Three of those seven sentences are now applied and four are not.** Applied:
the abstract, the §7 closing, and the §7 "Calibration" wording, all of which the
restructure absorbs. Not applied, and outside this pass's fence:
`research/GLOSSARY.md` (already carries its corrected entry, whose closing
parenthesis "paper/variance-note.md §7 still carries the older reading pending
its edit" is now stale), `research/README.md` row 06, `TODO.md` item 9, and
`research/QUESTIONS.md`, which is generated and needs
`node research/qc.js --index`.

## 1. Section by section: old reading to new reading

| section | old reading | new reading |
|---|---|---|
| header block | three companion scripts named | the same three, plus the eight producers behind §§8–11, each also named at the number it produced |
| abstract, closing half | "the ninth level separates the two candidate drift laws by a factor of ten and reduces the open question to the value of a single constant", then the control caveat | the limit is open and stays open; §8's decomposition (proven), §9's model limit theorem and closed form (proven), §10's identification (conjectured, with the ratio at eight levels and the divisor-distribution residual), §11's refutation of the fitted reading |
| §§1–5 | unchanged | unchanged, not one character |
| §6, drift paragraph | "the shape of that drift, and with it the value of the limit, is settled far more sharply on the comb-restricted diagonal of §7 ... read §7" | the diagonal is the object that carries the drift to deep levels; the reader is pointed at §§8–11, and "settled" is dropped |
| §6, open question | the question, with Montgomery–Soundararajan and Gorodetsky named as the natural routes and the limit "a conjecture-shaped hole" | the question, still open, plus the three things that moved: the MS main term is exactly $L$ so that route has nothing to extract (§8), the Gorodetsky route is an identity at one class (§9), and the model has a proven limit while the identification stays conjectural (§10) |
| §7, "The diagonal" | "$u = \ln L/\ln y = 2$ exactly" | "$= 2$ in the limit", with the nine computed values and the statement that from $x = 13$ up the coordinate error moves $\lambda_2$ by less than 0.001 |
| §7, "The ninth point separates the fits" | two fitted forms, their rms, the refit, the 10:1 forecast separation | deleted from §7; the part §11 needs is in §11 |
| §7, "Calibration, stated plainly" | model comparison, the short lever arm, the cost of $x = 41$, and the call for a derivation | deleted from §7; replaced by two sentences pointing at §§8–11 and at §10's pricing of $x = 41$ |
| §8 (new) | absent | the normalisation $\operatorname{Var}/\mathbb{E} = \delta X$ with the $x = 7$ check to 2e−16; Proposition 4, $\delta\ln^2W \to \kappa = 1.109905$ with proof and the nine-level column; Proposition 5, the main term is exactly $L$ prime by prime, with the identity $p(p-4)+4 = (p-2)^2$ and the consequence for the MS route; Lemma 6 with proof, the inert conductors, the single-prime band at 1.1e−11; the sharp-cutoff model $X \asymp \ln^3W$ refuted by a falling $X/\ln^3W$, and the $\ln^2W$ to $\ln^2W\ln\ln W$ bracket |
| §9 (new) | absent | the decoupling replacement named and priced (exact at one class, mean-against-maximum as the missing logarithm); the model stated exactly with $\pi_p$, $g(n)$, $\mathbb{E}[n] = 1/\delta$ and $\mathbb{E}[1/n] = \delta$; **Theorem 7** ($D_y \to GD(2)$, transform rate $O_s(\ln\ln y/\ln y)$) with proof in four steps; **Theorem 8** ($\mathbb{E}[g] \to \lambda_2(u)$, no correction term) with the three-band proof; **Lemmas 9 and 10** (block bound, local bound) and **Proposition 11** (both transition bands $O_u(1/\ln y)$) with proofs; the closed form $\lambda_2(2) = 0.45545648$ with its three confirming routes and the tail table; the $\theta = 1$ identity with Gorodetsky's $\lambda(u)$, cited to Math. Z. 308 (2024) no. 4 Paper 59, eqs (1.5)/(1.6) p. 2 and Lemma 1.5 p. 5; the three bands exact at nine levels; the model against twenty-two points with no fitted parameter; and the two things not proven, the Esseen conversion and any rate for the model |
| §10 (new) | absent | **Conjecture 1**, $\delta(X - X_{\rm dec}) \to 0$, stated precisely, with the five-link chain and the one open link; the exact form of the error in real space; the eight exact ratios falling to 1.000471 at $x = 31$, with the warning that the net is a difference of two terms fifty times its size and carries no coefficient; the two closed lag groups at their rung (the project's own, unreviewed) and the vacuous rate on the second; the exact lag kernel $R_n(c)$ and the finding that no exponential sum is involved; the residual as a $y$-smooth-divisors-of $C(C^2-4)$ statement with Ford, Hooley and Erdős named as the owning conventions and the search flagged NOT RUN; the flat/active split measured lossy; the falsifier and whether it has run |
| §11 (new) | §7's fit narrative | the same evidence condensed to one calibration section: the two forms and the frozen forecast, the two corrections to the account (the fit sets were six and seven points, and a wider family fits as well), the control on both halves, the a-priori bound on the bias-corrected cluster, and the closing statement that no value of the limit is measured anywhere in the note |
| Authorship and AI disclosure | the standard statement | the standard statement, plus a paragraph placing §§8–11 at the same disclosure, naming the five results that have had no external referee's pass, and naming the two readings the project's own red team corrected |
| References | nine entries | eleven: Aryan gains the Mathematika citation, Gorodetsky gains the Math. Z. citation, Pinsky arXiv:1611.07207v3 is added for $GD(\theta)$, and the project-artifact entry gains the eight §§8–11 producers |

## 2. Where each new number comes from

Every figure in §§8–11 is cited from an embedded producer and none was
recomputed in this pass.

| figure | producer |
|---|---|
| $X$ at nine levels, $\delta\ln^2W$, $X/\ln^3W$, the inert Mertens shares, the single-prime band | `research/history/staging/varE-asymptotic.js` |
| the model, $\lambda_2(u)$ and its tail table, the $\theta = 1$ identity at three $(y,H)$, the $u$-sweep and level-sweep comparisons | `research/history/staging/varE-spectral.js` |
| $\Pr[n\mid L]$, $P_>$, $R$, $B$, $\mathbb{E}[g]$ at nine levels, $B\ln y$, $(\lambda_2 - \mathbb{E}[g])\ln y$ | `research/history/staging/varE-limit-theorem.js` |
| $X/X_{\rm dec}$ and $\delta(X - X_{\rm dec})\ln y$ at $x \le 23$ | `research/history/staging/varE-theta2-step.js` |
| $R_n(c)$, the $\pm2$ group bound, the $c = 0$ group, the flat/active split | `research/history/staging/varE-theta2-proof.js` |
| $x = 29, 31$ exact ratios, the witness spread on $\mathbb{E}[g]$ | `research/varE-exact-ladder-01.js` |
| the three routes to 0.45545648, the fit control on both halves, the $u_y$ column, the main-term identity over 1,117,922 primes | `research/history/staging/redteam-0828-varE.js` |
| Gorodetsky's pages and Aryan's status | `lit-dickman-variance.md` §§1–2, `redteam-0828-varE.md` §3 |

## 3. What the restructure does not do

- It does not raise any rung. §10 is CONJECTURED in the paper because it is
  CONJECTURED in the corpus, and §9's theorems are labelled as unreviewed.
- It does not claim novelty. $GD(\theta)$ is published probability, the
  $\theta = 1$ case is Gorodetsky's published theorem, the successor search at
  $\theta \ge 2$ is owed four channels, and the §10 divisor reduction has not
  been searched in the Ford/Hooley convention. The paper says all four.
- It does not touch the conjecture the programme is aimed at.
  `variance-note.md` §4 already records that Var/E is a statement about a
  uniformly random window and says nothing about the one anchored window the
  twin problem needs, and §§8–11 add nothing there.
- It does not run the gate. `node research/qc.js quotes refs` was run and its
  result is in §5; the full gate was not.

## 4. CHANGELOG entry text

For `research/history/CHANGELOG.md`, to be appended by whoever runs the commit:

> ## 2026-08-28 — Paper III restructured around the model limit theorem
>
> `paper/variance-note.md` §§1–5 are unchanged. Its second half now states what
> is established, at its rung, in four sections. §8 is the exact spectral form
> on the diagonal: Var/E = δX, δ ln²W → 16C₂e^{−2γ}/3 = 1.109905, and the
> Montgomery–Soundararajan main term equal to L prime by prime, so all of Var/E
> is discrepancy and that route has no main term to extract (PROVEN). §9 states
> the decoupled model and proves its limit theorem: ln n/ln y → GD(2) with an
> explicit transform rate, E[g] → λ₂(u) with no correction term, both
> transition bands O(1/ln y), and the closed form
> λ₂(2) = 1 − e^{−2γ}(9/2 − 4 ln 2) = 0.45546, with the θ = 1 case an identity
> with Gorodetsky's λ(u) (Math. Z. 308 (2024) no. 4, Paper 59). §10 states the
> identification of the true variance with the model as Conjecture 1,
> δ(X − X_dec) → 0, with the exact ratios at eight levels (1.000471 at x = 31),
> two of three lag groups closed unconditionally, and the third reduced to a
> divisor-distribution statement about y-smooth divisors of C(C²−4) that has
> not been searched in the Ford/Hooley convention. §11 keeps the refutation of
> the 0.611 fit inference as a calibration paragraph. The abstract and §6's
> open question are rewritten to match, and §7's "u = ln L/ln y = 2 exactly" is
> corrected to "2 in the limit" with the nine computed values. What left the
> live layer: §7's fit tables and the reading that the open question was "down
> to one constant, near 0.611". Record:
> `research/history/staging/paper-iii-restructure.md`.

## 5. Gate

`node research/qc.js quotes refs` was run after the edit, and both checks read
clean: `QUOTES 0 finding(s)` over 216 quoted spans and `REFS 0 finding(s)`,
total 0. That is the fast syntactic gate only. It certifies that every pointer
written into §§8–11 resolves to a file and a section and that no quotation was
broken. It certifies nothing about the arithmetic, and the full gate
(`node research/qc.js --full`, plus `audit-numbers.js`) was not run in this
pass. Separately, `diff` confirms §§1–5 are byte-identical to the committed
version.

## 6. What would falsify this pass, and whether the check has run

| claim | rung | falsifier | has the check run |
|---|---|---|---|
| every number in §§8–11 is transcribed from a named producer | asserted | a figure in the paper absent from the producer that names it | PARTLY. Each figure was copied from its source note in this session and each is cited; no producer was re-run |
| §§1–5 are unchanged | checkable | a diff hunk inside them | YES, the file was rebuilt from the original lines |
| the paper's rungs match the corpus's | asserted | a sentence claiming more than `G2-STATE.md` §0 | PARTLY. Checked by hand against `G2-STATE.md` §0's HEURISTIC block and `GLOSSARY.md`'s Var/E entry; not machine-checked |
| the citations resolve | checkable | `qc.js quotes refs` failing | YES, §5 |
| §9's theorems are correct | NOT ESTABLISHED HERE | any error in the proofs | NO. They are the corpus's own derivations, unreviewed, and the paper says so |

---

*History layer: process record, staging. See `research/history/CHANGELOG.md`
for the corpus rule. This note edited no file other than
`paper/variance-note.md` and ran no git command.*
