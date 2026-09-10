# Source re-read of arXiv:2302.00459 for kk-lower-bound §11.1 and §11.2 (2026-09-07)

Agent report. Artifacts: arXiv:2302.00459v2 PDF (3 Dec 2023), md5
b5d7d2a23ffd902415057adebfe430b1 (same as the repo's recorded artifact A), READ pp. 1-7
line by line; Richert, Lectures on Sieve Methods (Tata 1976), md5
d2915a3eca4436a760dfaf50e1a1c335, READ Ch. 9 definitions, Ch. 11 Theorems 11.1-11.8 and
the chapter notes; Ford, Sieve methods lecture notes 2023, READ §2.1-2.2, §3.2.
Halberstam--Richert 1974 Theorem 2.2: UNREACHABLE (archive.org copy access-restricted;
two searches for verbatim restatements; arXiv 2211.11012 cites HR 3.1/3.2 only;
Koukoulopoulos URLs 404; Ford cites HR only as Theorem 2.5).

Lemma 1 (p. 4): "Suppose that kappa > 0, z >= 2. Assume that {a_n} is a sequence of
non-negative real numbers such that for all d | P(z) we have sum_{n = 0 (mod d)} a_n =
g(d)X/d + r_d, where g(d) is a multiplicative function with g(p) <= kappa, g(p) < p for
all primes p, |r_d| <= g(d) and z << X. Then S(a,z) = sum_{(n,P(z))=1} a_n <<_kappa X V(z),
V(z) = prod_{p<=z}(1 - g(p)/p)." Proof: "a version of the fundamental lemma of sieve
theory. See, for example, [5, Theorem 2.2]" ([5] = Halberstam--Richert).

Corollary 1 (p. 4): "Let kappa, z, g(d), V(z) and X be as above. Suppose that for any
p <= z the set Omega_p subset Z/pZ contains g(p) elements. Let S(X, Omega) be the number
of n <= X such that n mod p not in Omega_p for all p <= z. Then S(X, Omega) << XV(z)."
Its four-sentence proof encodes avoidance by a CRT change of variable and ends
"Conditions of Lemma 1 also clearly hold."

R1 CONFIRMED: Corollary 1 places no hypothesis on the shape of Omega_p; f does not
appear in Lemma 1, Corollary 1 or its proof. A free per-prime Omega_p = {a_p, a_p-2} is
permitted with g(p) = |Omega_p|.
R2 CONFIRMED: p. 5 defines Omega^{II}_p = {t mod p : exists non-linear irreducible factor
q(x) of f(x) with q(t) = 0 (mod p)}; empty for x(x+2); h_f = 0.
Polynomial structure is consumed only in the proof of Theorem 1 (trichotomy p. 6;
evaluation of sum g(p)/p pp. 6-7), which the manuscript replaces by its §3-§5. The
manuscript's Omega^{III}_p = {1, -1} is not a fibre of f; it is the free-translate case
R1 covers.

HR Theorem 2.2 identification: Richert's Ch. 11 notes: "Theorem 11.3: cf. l.c. Theorem
2.2." Theorem 11.3 (p. 135): "(Omega_1), (Omega_2(kappa)), (R): For any A > 0,
S(A, p, z) << X prod_{p<z}(1 - omega(p)/p) if z <= X^A, where the <<-constant depends at
most on A, A_1, A_2 and kappa"; available under (Omega_0) omega(p) <= A_0 in place of
(Omega_2(kappa)); (R) is |R_d| <= omega(d) for squarefree d. No remainder sum, no support
parameter. This matches Lemma 1 term for term. The Selberg-shape remainder
sum_{d<=xi^2} 3^{omega(d)}|R_d| analysed in the manuscript's §6.2 is Richert's Theorems
11.1 / 11.5-11.7 (HR 4.1 family), where the printed condition is tau = log xi^2/log z >= 2,
i.e. xi >= z. Calibration: identification through Richert's own cross-reference in a
secondary text; the 1974 page remains unread.
