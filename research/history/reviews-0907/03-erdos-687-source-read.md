# Erdős #687 lower bound, read at source (2026-09-07)

Agent report. Summary: the new bound on #687 is not from a paper or an arXiv preprint.
It is an anonymous, unrefereed, AI-authored 48-page PDF hosted on GitHub, posted
2026-08-26, whose covering theorem has been formalised in Lean by Boris Alexeev. Our
record's phrase "credited to a 2026 result" was inaccurate and has been replaced. The
bound is exactly the one-class primorial statement and transfers verbatim via G2 >= g.

1. https://www.erdosproblems.com/687 (last edited 31 August 2026), verbatim: "The best
   known upper bound is due to Iwaniec [Iw78], Y(x) << x^2. The best lower bound is due to
   GPT 5.6 Pro (see [4]) Y(x) >> (log x / logloglog x) x, improving on a previous bound of
   Ford, Green, Konyagin, Maynard, and Tao [FGKMT18]." "[4]" links to Erdős Problem #4.
   The LaTeX source lists only Er80, FGKMT18, Iw78. The history page shows the 2026-08-31
   12:02:33 revision replaced the Rankin/FGKMT text.
2. Source: #4 proof-claims thread, claim 224, submitted 2026-08-26 by user
   DottedCalculator; PDF https://github.com/DottedCalculator/ai-math/blob/main/Erdos_4_GPT_5.6_Sol.pdf
   (commit 9ed1cea5, 2026-08-26T01:30:55Z), title "A Tilted Residue-Class Construction
   for Long Prime-Free Intervals", author field "Anonymous manuscript - revised edition",
   48 pages. No arXiv version exists (API searches). A later claim 250 (OpenAI, "GPT-6
   Astra", 2026-09-04, 2-page PDF + Lean repo openai/LongGapsBetweenPrimes) proves
   G(X) >> log X (log_2 X)^2 log_4 X/(log_3 X)^2, prime gaps only; it does not bound Y(x).
3. Main theorem (p. 3): "Covering theorem. There is an effective constant c_0 > 0 such
   that, for every sufficiently large X, Y(X) >= c_0 X log X / log_3 X." Y(z) = largest N
   with one class a_p mod p per prime p <= z covering {1,...,N}. Unconditional as stated;
   inputs PNT, Mertens, BV, Maynard weights, FGKMT hypergraph covering. One-class
   Jacobsthal, primorial normalisation (Y(X) = j(X#) - 1). Status: unrefereed preprint,
   anonymous AI author. Ben Green (2026-08-27): "more or less convinced this is correct";
   Alexeev (2026-08-27): "formalized unconditionally in Lean":
   https://github.com/plby/lean-proofs/blob/main/src/latest/ErdosProblems/Erdos4Tilted.lean,
   `theorem covering_theorem`, guarded axioms propext/Classical.choice/Quot.sound, no
   sorry in the fetched top-level files; build NOT reproduced here.
   Method: multiplicative tilt f(p) = p^{-t/log x} on classes for w < p <= x/2 so the
   survival probability of rough composites is A e^{-t}; then an all-fiber block
   construction on half the primes in (x/2, x] and the FGKMT Maynard-weight covering on
   the other half; leftovers matched greedily to primes in (x, Cx].
4. New/FGKMT ratio = log_2 x/(log_3 x)^2 -> infinity.
5. Transfer: exactly g(x#); G2(x#) >> x log x/log_3 x at the source's calibration
   (formalised in Lean, not refereed, not on arXiv).

Scratch copies of every fetched artifact were kept in the session scratchpad only.
