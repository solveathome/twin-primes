# Halberstam–Richert Theorem 2.2: access attempts and the statement as reached (2026-09-07)

Agent report. Goal: the verbatim 1974 statement behind Kalmynin–Konyagin's
Lemma 1. Printed page image NOT reached; the statement is reached through
the OCR search-inside index of the Dover reprint and through two secondary
sources by the same authors.

Routes:
- archive.org item sievemethods0000halb: access-restricted; search-inside,
  djvu.xml and _djvu.txt endpoints all refused (401/"Item not available").
  No Dover scan exists there.
- Google Books: Dover 2011/2013 volumes keKvAAAAQBAJ and sU_fhcpaL-IC
  (unabridged republication, 364 pp.) have a search-inside OCR index; the
  1974 Academic Press volume pwXvAAAAMAAJ has none; page images are not in
  preview; the Books API was at quota.
- HathiTrust: 403 to every request.
- arXiv restatements: none found that quote Theorem 2.2.

Statement, OCR of Dover p. 68 (Chapter 2 §5 "A general upper bound
O-result"), reconstructed from the served snippet with uncertain tokens
noted:

    THEOREM 2.2. (Ω1), (Ω2(κ)), (R): For any A (>0),
      S(A;P,z) ≤ B · X ∏_{p<z}(1 − ω(p)/p)   if z ≤ X^A,        (5.1)
      S(A;P,z) ≤ B5 · X ∏_{p<X}(1 − ω(p)/p)  if z ≥ X^{1/A}.    (5.2)
    † B5 = B5(A, A1, A2, κ).
    Remark. By virtue of Lemma 2.2, condition (Ω2(κ)) may be replaced by (Ω).

Uncertain in the OCR: the constant label in (5.1) and the superscripts
(rendered "X ^", "X4", "X1/4"); the p. 69 proof text "S(A;P,z) ≪ XW(z) for
z ≤ X^{1/A} (5.3) ... S(A;P,z) ≤ S(A;P,X^{1/A}) ... W(X^{1/A})/W(X^A) = O(1)
by (3.5)" fixes the reading. Hypotheses as the book defines them (same
index): (Ω1) p. 29, 0 ≤ ω(p)/p ≤ 1 − 1/A1; (Ω2(κ)) p. 52,
Σ_{w≤p<z} ω(p) log p/p ≤ κ log(z/w) + A2; (R) p. 30, |R_d| ≤ ω(d) if
μ(d) ≠ 0, (d, P̄) = 1. Cross-references in the same index: p. 130 "Theorem
2.2 ... could be derived equally well from Theorem 4.1 below, after applying
condition (R)"; p. 154 "Theorem 5.2 still has a remainder term ... whereas
Theorem 5.1 has not; ... condition (R) ... has had the effect of keeping the
remainder term fairly small."

Secondary, same authors:
- Halberstam–Richert, "A new look at Brun's sieve", Mém. SMF 25 (1971)
  97–106, p. 100, Theorem 3: under (Ω), (Ω1), (R), for any μ > 0,
  S(A;P,z) = O(XW(z)) if z ≤ X^μ and = O(XW(X)) if z ≥ X^{1/μ}, constants
  depending on μ; with the sentence that "by Brun's sieve it follows" in the
  literature is generally justified by this theorem. Its footnote says the
  lecture will appear in expanded form in the forthcoming book.
- Richert, Tata lectures (1976), Theorem 11.3 p. 135 and the chapter note
  "Theorem 11.3: cf. l.c. Theorem 2.2", whose second sentence is clause (5.2).

Verdict: Brun form. Pointwise |R_d| ≤ ω(d), no remainder sum, no level or
support parameter; the reduction to a smaller sifting level is inside the
proof (p. 69) and is booked as the A-dependence of the constant. The printed
1974 page itself remains UNREAD; the Dover reprint is described as
unabridged with the same pagination.
