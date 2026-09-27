# Literature and data search: shifted-prime Mobius and Liouville sums (2026-09-07)

Agent report, verbatim in substance. Question: has anyone computed or tabulated
(1) sum_{n<=x} Lambda(n-2)mu(n), sum_{p<=x} mu(p+-2), sum lambda(p+-2);
(2) their distribution in progressions or any BV-type numerics for Lambda(n)mu(n+h);
(3) two-point Chowla sums lambda(n)lambda(n+2), mu(n)mu(n+2) at x >= 1e9;
(4) datasets of mu(p+h), lambda(p+h) for small h?

## Bottom line

Nothing at x >= 10^8 was found for any of the four sums. The largest scale of any
published number seen for these objects is x = 10^4 (Carella, Liouville two-point at
shift 1). No OEIS sequence tabulates mu(prime(n)+2), mu(prime(n)-2), lambda(prime(n)+-2),
or partial sums of mu(n)mu(n+2) / lambda(n)lambda(n+2).

## Item 1

Not found at any scale >= 10^8. Closest: N. A. Carella, arXiv:2206.12956 (math.GM), whose
section 7 calls R(a,x) = sum_{p<=x} mu(p+a) "currently viewed as an intractable problem"
with only Lichtman's double average in the literature; numerics only for
sum_{n<=x} lambda(n)lambda(n+1) at x = 10^4 (value 112) and a short interval at 10^7.
J. D. Lichtman, arXiv:2009.08969 / QJM 73 (2022): theoretical; states the folklore
conjecture sum_{p<=X} mu(p+h) = o(pi(X)) traces to Hildebrand 1989. OEIS: A267067
(primes with mu(p-2)=1, b-file to p <= 307537), A049229/31/32/33 (p+-2 squarefree or not),
A089495 = mu(prime(n)+1) (118 terms), A089451 = mu(prime(n)-1). Direct searches for
mu(prime(n)+-2), A008683(A000040(n)+2), A008836(A000040(n)+2), liouville(prime(n)+2):
no match.

## Item 2

Not found. Murty--Vatwani JNT 180 (2017): Queen's PDF link 404s; abstracts describe
EH_{mu_h} only. Vatwani Math. Z. 2018 (abstract), Cantarini arXiv:2607.09110,
T. Smith arXiv:2511.14810: no numerics on PDF grep.

## Item 3

Not found at x >= 10^9. J. D. Cook blog 2017-10-21 "Empirically testing Chowla
conjecture": shifts 1..99, N = 10^4. Carella (above): shift 1, x = 10^4. Tao's Chowla
posts, Guo arXiv:2608.23500, Pilatte 2310.19357, Helfgott--Radziwill, MRT 1503.05121,
Tao 1509.05422, Ramare's note: no tables. OEIS: no partial-sum sequences; sign-pattern
sequences only (A064148, A114180, A173695, A221281/2, A063838).

## Item 4

Not found. Nearest: Humphries--Shekatkar--Wong arXiv:1704.07979, Liouville-type functions
restricted to primes in progressions to 10^11; not shifted primes.

## Caveats

OEIS via curl (WebFetch 403); MathOverflow / math.SE via api.stackexchange.com only
(no relevant threads); Google Scholar not queried. Terms used were the literature's:
"Mobius on shifted primes", "Chowla two-point", "Elliott--Halberstam twisted by Mobius".
Queries run are listed in the session transcript; the convention row is in
SEARCH-CONVENTIONS.md.
