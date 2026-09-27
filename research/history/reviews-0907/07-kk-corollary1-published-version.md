# Corollary 1's printed proof in the published Izvestiya version (2026-09-07)

Agent report. Question: does the CRT-representative slip found by the red team
(06, finding 6) in arXiv:2302.00459v2's proof of Corollary 1 survive in the
published version, Izvestiya: Mathematics 88:2 (2024) 225-235, DOI
10.4213/im9467e?

- Repository record: research/history/staging/lit-pdf-kalmynin-konyagin.md
  artifact C (no md5 recorded; no local copy). The recorded curl now returns a
  stub without a browser User-Agent; with one, both mathnet full-text
  endpoints serve PDFs: English edition md5 9e7f3c54b1979cdfb505c14b4576c4e0
  (631,607 bytes, 11 pages, created 3 Apr 2024, matching every recorded
  field); Russian-edition endpoint md5 871d344ee9cbb53bfc04e631e8bd8040
  (English body). arXiv v2 md5 b5d7d2a23ffd902415057adebfe430b1 re-confirmed.
- Published proof of Corollary 1, p. 228 (PDF page 4), same text as arXiv v2
  apart from copy-edits ("it is easily seen", "Corollary is proved"): the
  product prod_{p<=z} prod_{r in Omega_p}(P(z;p) n + r Q(z;p)) with
  Q(z;p) = P(z;p) mod p, Q(z;p) = -1 mod P(z;p). Same representative choice.
- Independent finite check at z=5, Omega_2={0}, Omega_3={0,1}, Omega_5={0,3},
  n<=30: 3 avoid Omega directly ({11,17,29}); 0 satisfy gcd(m,30)=1 under the
  printed encoding; 3 under the repaired representatives r'=r mod p,
  r'=1 mod P(z;p), and those are exactly the n avoiding -Omega ({1,13,19}).
- Status: published version READ at extracted text (not page image); gap
  present; Corollary 1's statement unaffected.
