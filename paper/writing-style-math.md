# Primeoire Writing Style Guide: the math edition

Adapted 2026-08-14 from Chris's general guide
(`~/Files/Git/mba/notes/writing-style-guide.md`). That file governs his voice
everywhere else. This file governs the primeoire papers, notes, and any prose
that behaves like mathematics. Where the two disagree in a math context, this
one wins.

## The one-sentence version

A serious math paper in plain language: precise, honest about what is proven
versus measured versus hoped, and free of AI tells.

If you only remember three things:

1. **Claim exactly what is proven, no more.** The calibration ladder is
   fixed: proven, verified computationally, measured, conjectured, refuted.
   Never let a sentence blur two rungs.
2. **Authorial "we" is correct here.** This is math convention, not a
   headcount. "We prove", "we verify", "we refute our own earlier claim."
3. **Refutations stay visible.** Our own killed claims appear in the record
   with the same prominence as the wins. They are part of the method.

## 1. Who is writing

Sole author Chris, with AI assistance disclosed in the standard statement
(see PAPERS.md). Six years of independent work; the framework, vocabulary,
and driving questions are his. The reader is a mathematician who has seen a
hundred amateur twin-prime manuscripts and trusts none of them. Earn it by
calibration, citations, and verifiable computation, not by enthusiasm.

## 2. Voice

- Precise, not stiff. Plain words carrying exact meaning.
- Honest by default. The wall gets named early and priced exactly. Nothing of
  ours implies a TPC proof, ever.
- Positioned correctly: "a new framework and vocabulary over classical
  sieve-theoretic objects, a new lens." Independent rediscovery stated as
  credential, with the canonical names cited (Schemmel 1869, Brun 1919,
  Iwaniec 1978, and so on). Never "new theory of primes."
- Show the work. Every number traces to a script in research/; every cap is
  machine-asserted; every literature claim has a primary source or is
  flagged unverified.

## 3. Person and terms (the math inversions)

Two rules invert from the general guide:

- **"We", not "I".** Authorial we throughout: "we prove", "we compute",
  "we could not close this step." The AI-disclosure statement handles who
  did what; the prose does not.
- **Technical words with real referents stay.** "Framework", "variance",
  "robust" (as a statistics term), "fundamental lemma" (as the sieve-theory
  name) are content here, not decoration. The ban applies to these words as
  *ornament*: a "robust result" is banned, "the robust statistics
  literature" is fine.

Everything else in the general guide's banned lists holds. No leverage, no
delve, no pivotal, no crucial, no comprehensive, no tapestry, no landscape,
no harness, no unlock. A theorem does not need an adjective.

## 4. Register

| Document | Tone | Notes |
|---|---|---|
| **Theorem notes** (staircase, β₂, variance) | Terse, complete | Statement, proof, verification, limits. Related-work paragraph. Weakest step named in its own subsection. |
| **The flagship** (Paper I) | Expository but calibrated | Teaches the lens; every claim still carries its rung on the ladder. The wall chapter leads with what we cannot do. |
| **Research scripts** (research/*.js) | Code, then output, then readings | Header states the question and the honest doubt. OUTPUT is pasted real output. READINGS are numbered, calibrated, and include the refutations. |
| **OEIS / micro** | House style of the venue | Minimal prose, exact definitions, b-file discipline. |

## 5. Structure

- **Sentences:** short declaratives are still the backbone. Definitions and
  theorem statements may run long when precision demands it; nothing else may.
- **Opens:** concrete. A section opens with its object or its claim, not
  with a warm-up. "Fix a tile of width W = x#." beats any preamble.
- **Closes:** a paper section closes on the sharpest true statement, a
  limitation, or the next question. Never a recap.
- **Headers:** descriptive. "The tail theorem", not "Taming the tail".
- **Notation:** defined once, used consistently, glossary-aligned (tile,
  fold, census, Scour, natal set). First use states the canonical alias
  once: "the tile (classically: the primorial wheel mod p#)".
- **Numbers:** exact where we have them (11,751 of 14,850), with the
  generating script named. Rounded numbers only for asymptotics.
- **Proofs:** every step either standard (cited), elementary (shown), or
  honestly gapped (flagged in place, not in a footnote).

## 6. The three honesty rules (math form)

1. **Name the wall first.** Any document touching the twin question states
   up front what it does not prove and where parity blocks it. The honest
   boundary is the most original part of this work; lead with it.
2. **Real numbers, including failures.** The certificate that misses (−30 at
   z₀=47) appears next to the one that lands (+220 at z₀=53). Predictions go
   on record before the run; misses stay in the text.
3. **Calibration is grammar.** "We prove" only before a proof. "We verify"
   only with the script named. "We measure" for empirics. "We expect" for
   heuristics, with the assumption named. "We were wrong" gets a full
   sentence, not a parenthesis.

## 7. Banned words

The general guide's lists apply unchanged (fancy synonyms, dramatic
adjectives, AI nouns, AI verbs, filler adverbs), with the technical-referent
exception of §3. Additions for math prose:

- **Hype adjacent:** "beautiful", "elegant", "striking", "remarkable",
  "surprising" as claim decoration. If a result is surprising, show the
  expectation it broke and let the reader be surprised.
- **Vague quantifiers:** "many", "most", "a large class" where a number or
  a set exists. We usually have the number.
- **"Novel" / "new" self-labels** beyond the positioning sentence and the
  prior-art audit. The audit proves novelty; adjectives do not.

## 8. Banned phrases

All of the general guide's list, plus the amateur-manuscript tells that get
twin-prime papers deleted unread:

- "This may have implications for the Riemann Hypothesis"
- "Surprisingly simple proof" / "elementary proof of a famous conjecture"
- "To our knowledge, no one has noticed" (the prior-art audit speaks instead)
- "It is easy to see" for anything that took us a session to see
- "Clearly" / "obviously" anywhere near a gap

## 9. Banned patterns (the AI tells, math form)

1. **Em dashes.** None. Body, titles, captions. Colons and commas do the
   work. (This file and every paper file get grepped for them.)
2. **The "Not X. Y." reframe.** Once per paper at most. The material tempts
   it constantly ("not a kill, a twin found"); write it as a plain
   definition instead.
3. **Rule of three.** Vary groupings: two, four, one.
4. **Aphoristic closers.** The material generates quotable lines ("the tile
   is scoured by its own image"). One per paper, in the introduction or the
   discussion, doing real expository work. Zero in proofs.
5. **Perfect parallelism** in prose. In displayed math and tables, symmetry
   is content and stays.
6. **Summary paragraphs.** The abstract summarizes; nothing else does.
7. **Semicolons:** rare in prose. In math display ("for p = 7, 11, 13;
   q > √W") they are punctuation of notation and fine.
8. **Uniform rhythm.** Mix sentence lengths. Proofs may be steady; prose
   around them may not.

## 10. Before → After (from our own drafts)

| Before (tell) | Why it fails | After |
|---|---|---|
| "The Scour never sleeps — it strikes every tile." | Em dash, drama | "The Scour strikes every tile: each prime q removes its 2/q share." |
| "This is not a coincidence. It is a theorem." | "Not X. Y." mirror | "This looked like a coincidence; it is the Copying Theorem." (or just state the theorem) |
| "Remarkably, the constant is exactly e^{2γ}/4." | Claim decoration | "The constant is e^{2γ}/4, the square of the Mertens ratio; the framework predicts its own correction." |
| "Proven. Verified. Exact." | One-word chain | "Proven, and verified to 10⁻⁶ against brute force at two levels." |
| "We believe this opens a path to the conjecture." | Amateur tell, overclaim | "This does not approach the conjecture; the parity obstruction is quantified in §6." |

## 11. The 60-second test (math form)

1. Does every claim carry its calibration rung, and is the wall named?
2. Any em dashes? Any "Not X. Y."? Any three-in-a-row? Any "clearly"?
3. Does every number trace to a named script or a cited source?
4. Would a skeptical number theorist keep reading past the abstract?
5. Is "we" authorial and consistent, with the AI statement in place?
6. Are our refuted claims present and visible?
7. Read the introduction aloud. Rewrite anything that sounds like either a
   press release or a crank letter. The target is a working seminar voice.
