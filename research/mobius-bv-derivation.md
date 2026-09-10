# Möbius Bombieri–Vinogradov: published inputs and a self-contained derivation

<!-- ledger
id: Q-mobius-bv-derivation
status: ANSWERED
todo: C
parity: Classical input only. The estimate is residue-level equidistribution of the Mobius function to moduli below the square root, imported from published Siegel-Walfisz, Type I and large-sieve theorems. No new arithmetic estimate, no cancellation beyond what those theorems already supply, and no bearing on the parity obstruction.
question: Is there a published theorem statement of Bombieri-Vinogradov for the Mobius function at level T^(1/2)/log^B T with a maximum over coprime classes, and if not, does that estimate follow from published theorems by a derivation whose every hypothesis is checked?
verdict: No published theorem statement was located in five channels searched in the owning convention named in research/SEARCH-CONVENTIONS.md; the closest is Granville-Shao's published assertion that the result is known, which carries no proof locator for the Mobius case. The estimate is derived here from four numbered results of Koukoulopoulos, GSM 203 (Corollary 13.4, Theorem 26.2, Theorem 26.6, equation (26.3)) plus Vaughan's identity for mu, with B(A)=A+6 and an ineffective constant. This is a derivation from published theorems, not a refereed theorem, and it is read from the author's preliminary version of that book.
-->

Internal note, 2026-09-06. Provenance repair only. **Nothing about the twin-prime
estimate moves here.** The estimate below is classical and was already used in
[shifted-prime-decomposition.md §2](shifted-prime-decomposition.md); the defect
recorded in [chain-review-0906.md](chain-review-0906.md) was that its only cited
source was an exercise sheet. Finite checks of the identity and of the support
claims are in [mobius-bv-validation.js](mobius-bv-validation.js).

**Local readiness review:** review 21 rechecked the full local derivation
and the author-preliminary source statements K1--K4. In the small-y
split of §3, apply K1 only for y>=T/log^D T, so log y is comparable to
log T and the excluded-prime condition holds with y itself; below this
threshold use the trivial bound. Source theorems remain imports.

## 1. The statement

For every fixed A>0 there is B=B(A)>0 such that, uniformly for T≥3 and
Q≤T^(1/2)/(log T)^B,

$$
 \sum_{q\le Q}\ \max_{(a,q)=1}\ \max_{y\le T}
   \Bigl|\sum_{n\le y,\ n\equiv a\ (q)}\mu(n)\Bigr|
        \ \ll_A\ \frac{T}{(\log T)^{A}}.                              \tag{M}
$$

(M) is the statement labelled (4) in `shifted-prime-decomposition.md`, with the
maximum over y≤T added. The added maximum is free in the derivation below and
makes that note's mesh argument for interval endpoints unnecessary, since a sum
over a subinterval is a difference of two terms of the kind bounded in (M).
The mesh argument there is not wrong; it is simply no longer needed.
Calibration: **derived here from published theorems, not itself published, and
not reviewed by anyone outside this repository.**

## 2. Is there a published theorem statement? No, in five channels

Searched in the owning convention recorded in
[SEARCH-CONVENTIONS.md §1](SEARCH-CONVENTIONS.md) ("Möbius function in
arithmetic progressions", "Bombieri–Vinogradov", "Vaughan identity"), 2026-09-06.

| source | what it actually contains | status |
|---|---|---|
| Granville–Shao, *Bombieri–Vinogradov for multiplicative functions, and beyond the x^(1/2)-barrier*, Adv. Math. **350** (2019) 304–358 | p. 2, read byte-level in the arXiv PDF ([1703.06865](https://arxiv.org/pdf/1703.06865)): "The analogous result is known to hold when f = µ, the Mobius function, and when f is the characteristic function for the y-smooth numbers [16, 23]". References [16] and [23] are Fouvry–Tenenbaum and Harper, both **smooth-number** papers; no locator is attached to the µ half of the sentence. The same paragraph points at "chapter 28 of [8]" (Davenport) and "Theorems 9.16, 9.17, and 9.18 of [18]" (Friedlander–Iwaniec, *Opera de Cribro*) for proofs of **the original** theorem, that is for primes. | published **assertion** that µ is known; **no proof locator**. Read in the arXiv PDF, not in the journal version |
| Koukoulopoulos, *The Distribution of Prime Numbers*, AMS GSM **203** (2019) | Full text of the author's preliminary version searched. Chapter 26 proves Bombieri–Vinogradov for primes; its Exercises 26.1–26.5 do not include µ. What the book does contain for µ is listed in §3 below. | no µ Bombieri–Vinogradov statement; **byte-level negative in a source that has every input** |
| Iwaniec–Kowalski, *Analytic Number Theory*, AMS Colloq. **53** (2004) | Chapter 17 "Primes in Arithmetic Progressions", §17.2 "Bilinear forms in arithmetic progressions" (p. 421), §17.3 "Proof of the Bombieri–Vinogradov Theorem" (p. 423): section titles and page numbers confirmed byte-level in the AMS-hosted `coll053-endmatter.pdf`. The theorem text of §17.2, including the statement usually cited as Theorem 17.4, **could not be opened**. | **NOT REACHED**; a general bilinear theorem there would be the natural published carrier |
| Friedlander–Iwaniec, *Opera de Cribro*, AMS Colloq. **57** (2010), Theorems 9.16–9.18 | Cited by Granville–Shao as an elegant proof of the prime case. Text closed access on every channel tried. | **NOT REACHED** |
| Davenport, *Multiplicative Number Theory*, ch. 28 | Chapter title "Bombieri's Theorem" confirmed at the publisher's chapter listing; text behind a login. Cited by Granville–Shao for the prime case. | **NOT REACHED**; no reason to expect a µ statement |
| Tao, 254A Notes 3, Theorem 16 | General bilinear Bombieri–Vinogradov, statement fetched and read (§3 below). µ appears only in Exercise 14, which is the Barban–Davenport–Halberstam L² statement, not (M). | blog, not published |
| Le Boudec, EPFL Exercise Sheet III, Exercise 4 | States (M) without the maximum over y. | teaching material; the defect being repaired |

So: **no published theorem statement of (M) was located**, searching the owning
convention of [SEARCH-CONVENTIONS.md §1](SEARCH-CONVENTIONS.md). That is a
negative about five channels searched on one day, not a proof that none exists; the two
most likely carriers (Iwaniec–Kowalski §17.2 and *Opera de Cribro* §9) were not
opened, and either could contain a general theorem that covers µ once a Vaughan
decomposition is supplied. What would settle it: page access to those two.

## 3. The published inputs used below

All four are numbered results in Koukoulopoulos, *The Distribution of Prime
Numbers*, AMS Graduate Studies in Mathematics **203** (2019). Read in the
[author's preliminary version](https://dms.umontreal.ca/~koukoulo/documents/publications/primes.pdf),
posted with the publisher's permission. **Caveat: numbering is from that
preliminary version and was not checked against the printed book.** Throughout,

$$
 \Delta_f(y;q,a)=\sum_{n\le y,\ n\equiv a\ (q)}f(n)
   -\frac1{\varphi(q)}\sum_{n\le y,\ (n,q)=1}f(n).
$$

**K1 (Corollary 13.4).** Fix A,C≥1 and ε∈(0,1/2]. For x≥2 and q,m∈N with
q≤(log x)^C and ω(m)≤exp{(log x)^(1−ε)},

$$
 \sum_{n\le x,\ (n,m)=1,\ n\equiv a\ (q)}\mu(n)\ \ll_{\varepsilon,A,C}\ x/(\log x)^{A}.
$$

This is the Siegel–Walfisz input for µ. Three features are used below and all
three are in the statement: a is arbitrary (the proof splits off d=(a,q)), the
coprimality condition to m is included, and the modulus range is a fixed power
of the logarithm. The constant is ineffective, since the proof runs through the
book's Theorem 12.1, which uses Siegel's theorem (Theorem 12.10).

**K2 (Theorem 26.2).** Let v≥0 and let f be supported on [1,y]. For x≥2, q∈N,
a∈(Z/qZ)*, |Δ_{f∗log^v}(x;q,a)| ≤ 2(log x)^v Σ_{k≤y}|f(k)|. Only v=0 is used,
so log^v is the constant function 1 and the bound is 2Σ_{k≤y}|f(k)|, uniform in
x and in the reduced class a.

**K3 (Theorem 26.6).** Let f, g be supported on [1,M], [1,N]. For x,P≥1,

$$
 \sum^{*}_{q\le P,\ \chi\ (q)}\frac q{\varphi(q)}
   \max_{y\le x}\Bigl|\sum_{n\le y}(f*g)(n)\chi(n)\Bigr|
 \ll\bigl(\sqrt{MN}+\sqrt MP+\sqrt NP+P^2\bigr)(\log x)\,\|f\|_2\|g\|_2,
$$

the star restricting to primitive χ. The maximum over y is inside, obtained in
the book by Perron inversion; this is where (M)'s maximum over y comes from.

**K4 (equation (26.3)).** For any arithmetic function f, q∈N and a∈(Z/qZ)*,
Δ_f(y;q,a) = φ(q)^(−1) Σ_{χ (q), χ≠χ0} χ̄(a) Σ_{n≤y} f(n)χ(n).

An alternative to K2+K3+K4 is [Tao, 254A Notes 3, Theorem 16](https://terrytao.wordpress.com/2015/01/10/254a-notes-3-the-large-sieve-and-the-bombieri-vinogradov-theorem/),
read 2026-09-06: for α on [1,M], β on [1,N], MN≪x, with Σ|α(m)|²≪M log^O(1)x,
Σ|β(n)|²≪N log^O(1)x and the Siegel–Walfisz property Δ(β·1_{(·,s)=1};a(r))
≪_A N log^(−A)x for all A, all primitive a(r) and all 1≤s≤x, one has
Σ_{q≤Q} sup_a |Δ(α∗β;a(q))| ≪_A x log^(−A)x for Q≤x^(1/2)log^(−B)x and
M,N≥log^B x. That theorem is stated for a single bilinear pair and is a blog
source; K2–K4 are preferred because they are in a published book and because
the Type I piece is handled without a Siegel–Walfisz hypothesis on it.

## 4. Vaughan's identity for µ

For any U,V≥1, with µ_{≤U}(n)=µ(n)1_{n≤U} and µ_{>U}=µ−µ_{≤U},

$$
 \mu=\mu_{>U}*\mu_{>V}*1-\mu_{\le U}*\mu_{\le V}*1+\mu_{\le U}+\mu_{\le V}. \tag{V}
$$

Proof: expand µ_{>U}∗µ_{>V}∗1 = (µ−µ_{≤U})∗(µ−µ_{≤V})∗1 and use µ∗1=δ three
times, giving µ − µ_{≤V} − µ_{≤U} + µ_{≤U}∗µ_{≤V}∗1. Rearranging gives (V). No
range restriction on n is needed, in contrast with Vaughan's identity for Λ.
(V) is Exercise 23.4(a) of the same book; the two-line proof above makes the
exercise status irrelevant. Because 1_{(n,r)=1} is multiplicative, (V) survives
multiplication by it with the restriction applied to each factor separately.
Measured, not proven: [mobius-bv-validation.js](mobius-bv-validation.js) checks
(V) pointwise at every n≤10^5 for eight (U,V,r), three of them with r>1, and
checks the support and size claims used in §5 and the exactness of §5's dyadic
split. Finite checks say nothing about the asymptotics.

## 5. The derivation

Fix A≥1, write L=log T, and take U=V=T^(1/5). Split (V) as µ = µ″ − µ′ +
µ_{≤U} + µ_{≤V} with µ′=(µ_{≤U}∗µ_{≤V})∗1 and µ″=µ_{>U}∗(µ_{>V}∗1). Set
f=µ_{≤U}∗µ_{≤V}, supported on [1,UV] with |f|≤τ, and g=µ_{>V}∗1, supported on
(V,∞) with |g|≤τ.

**(a) Type I.** By K2 with v=0, for all y, q and a∈(Z/qZ)*,
|Δ_{µ′}(y;q,a)| ≤ 2Σ_{k≤UV}|f(k)| ≤ 2Σ_{k≤UV}τ(k) = 2Σ_{d≤UV}⌊UV/d⌋
≤ 2UV(log(UV)+1) ≪ T^(2/5)L. Trivially |Δ_{µ_{≤U}}| ≤ U/q+1+U/φ(q). Hence

$$
 \sum_{q\le Q}\max_{(a,q)=1}\max_{y\le T}
   \bigl|\Delta_{\mu'}+\Delta_{\mu_{\le U}}+\Delta_{\mu_{\le V}}\bigr|
   \ \ll\ QT^{2/5}L+QU\ \ll\ T^{9/10}L .
$$

**(b) Character reduction of the Type II part.** By K4, and writing each
non-principal χ mod q through the primitive ξ mod d inducing it, with d|q, d>1,
q=dr and χ(n)=ξ(n)1_{(n,r)=1}, and using φ(q)≥φ(d)φ(r),

$$
 \sum_{q\le Q}\max_{(a,q)=1}\max_{y\le T}|\Delta_{\mu''}(y;q,a)|
 \le\sum_{r\le Q}\frac1{\varphi(r)}\sum_{1<d\le Q/r}\frac1{\varphi(d)}
      \sum^{*}_{\xi\ (d)}S_r(\xi),                              \tag{5.1}
$$

$$
 S_r(\xi)=\max_{y\le T}\Bigl|\sum_{n\le y}\mu''(n)\xi(n)1_{(n,r)=1}\Bigr|.
$$

**(c) Small conductors d≤L^C.** Here µ″ = µ + µ′ − µ_{≤U} − µ_{≤V} is used in
reverse, so that K1 can be applied to µ itself. First,
Σ_{n≤y}µ(n)ξ(n)1_{(n,r)=1} = Σ_{b mod d} ξ(b) Σ_{n≤y, n≡b (d), (n,r)=1} µ(n),
which by K1 with modulus d, m=r and ε=1/2 is ≪ d·y/(log y)^{A″} once
y≥T/L^{A″} (for smaller y the trivial bound y suffices). The hypotheses hold:
d≤(log T)^C≤(log y)^{2C} for large T, and ω(r)≪log T≤exp{(log T)^(1/2)}.
Second, for non-principal ξ mod d, |Σ_{l≤z}ξ(l)|≤d, so writing
1_{(l,r)=1}=Σ_{e|(l,r)}µ(e),

$$
 \Bigl|\sum_{n\le y}\mu'(n)\xi(n)1_{(n,r)=1}\Bigr|
 =\Bigl|\sum_{k\le UV}f(k)\xi(k)1_{(k,r)=1}\sum_{l\le y/k}\xi(l)1_{(l,r)=1}\Bigr|
 \ll\tau(r)\,d\,T^{2/5}L .
$$

The two short terms contribute ≤2T^(1/5). Feeding these into (5.1), using at
most d primitive characters mod d and Σ_{d≤D}d²/φ(d)≪D²log D, the
small-conductor part of (5.1) is
≪ T L^{2C+2}/L^{A″} + T^(2/5)L^{2C+5}, which is ≪ T/L^A on taking
A″=A+2C+2.

**(d) Large conductors d>L^C.** For n≤T,
µ″(n)1_{(n,r)=1} = Σ_{U<2^j≤2T/V} (α_j∗β_j)(n) with
α_j(k)=µ(k)1_{k>U}1_{2^(j−1)<k≤2^j}1_{(k,r)=1} and
β_j(l)=g(l)1_{l≤T/2^(j−1)}1_{(l,r)=1}; the split is exact because every
factorisation n=kl of the Type II term has k>U and l>V, hence k≤T/V. Then
‖α_j‖₂ ≤ 2^(j/2) and ‖β_j‖₂ ≪ (T/2^j)^(1/2)L^(3/2) by Σ_{l≤z}τ(l)²≪z log³z, so
‖α_j‖₂‖β_j‖₂ ≪ T^(1/2)L^(3/2). K3 with M=2^j, N=T/2^(j−1) and any P≥1 gives

$$
 \sum^{*}_{q\le P,\ \chi\ (q)}\frac q{\varphi(q)}\max_{y\le T}
   \Bigl|\sum_{n\le y}(\alpha_j*\beta_j)(n)\chi(n)\Bigr|
 \ll\bigl(T+2^{j/2}T^{1/2}P+T2^{-j/2}P+P^2T^{1/2}\bigr)L^{7/2},
$$

and summing over the ≪L admissible j, with 2^j>U and 2^j≤2T/V,

$$
 \sum^{*}_{q\le P,\ \chi\ (q)}\frac q{\varphi(q)}\max_{y\le T}
   \Bigl|\sum_{n\le y}\mu''(n)\chi(n)1_{(n,r)=1}\Bigr|
 \ll\Bigl(T+\frac{TP}{\sqrt U}+\frac{TP}{\sqrt V}+P^2\sqrt T\Bigr)L^{9/2}. \tag{5.2}
$$

Splitting the conductors into dyadic blocks 2^i and applying (5.2) with P=2^i,

$$
 \sum_{L^C<d\le Q/r}\frac1{\varphi(d)}\sum^{*}_{\xi\ (d)}S_r(\xi)
 \ \ll\ \Bigl(\frac T{L^{C}}+\frac{TL}{\sqrt U}+\frac{TL}{\sqrt V}
        +\frac{Q\sqrt T}r\Bigr)L^{9/2},
$$

using Σ_{2^i>L^C}2^(−i)≪L^(−C), Σ_{2^i≤2Q/r}1≪L and Σ_{2^i≤2Q/r}2^i≪Q/r.
Summing over r≤Q with weight 1/φ(r), so that Σ_r 1/φ(r)≪L and
Σ_r 1/(rφ(r))≪1, the large-conductor part of (5.1) is

$$
 \ll\ \frac{T L^{11/2}}{L^{C}}+T^{9/10}L^{13/2}+Q\sqrt T\,L^{11/2}.      \tag{5.3}
$$

**(e) Conclusion.** Take C=A+6. The first term of (5.3) is ≪T/L^A, the second
is ≪T/L^A for large T, and the third is ≪T/L^A as soon as
Q≤T^(1/2)/L^(A+6). With (a) and (c) this gives

$$
 \sum_{q\le Q}\max_{(a,q)=1}\max_{y\le T}|\Delta_\mu(y;q,a)|\ \ll_A\ T/L^{A},
 \qquad Q\le T^{1/2}/(\log T)^{A+6}.                                   \tag{5.4}
$$

Finally K1 with modulus 1 and m=q bounds the subtracted term:
|Σ_{n≤y,(n,q)=1}µ(n)| ≪_A T/L^(A+1) uniformly in q≤T (trivially for
y≤T/L^(A+1)), so Σ_{q≤Q}φ(q)^(−1)·T/L^(A+1) ≪ T/L^A. Adding this to (5.4)
gives (M) with **B(A)=A+6**. No attempt was made to optimise B.

## 6. What this does and does not settle

- The constant in (M) is **ineffective** for A above an absolute threshold,
  because K1 runs through Siegel's theorem. Every downstream use in this
  corpus is qualitative, so nothing currently depends on effectivity. Any
  future explicit-constant claim must not cite (M).
- (M) covers **reduced classes only**. Non-reduced classes are not derived here
  and are not needed: `shifted-prime-decomposition.md §3` reduces every
  congruence it meets to a primitive class before applying the estimate.
- The level is exactly 1/2 with a logarithmic saving. Nothing here touches the
  x^(1/2) barrier, and the Granville–Shao paper is about going past it for
  multiplicative f with a fixed residue class, which is a different statement.
- Calibration of the whole note: the mathematics is standard and every step is
  a named published theorem or a two-line verification, but **the assembly is
  ours and has had one adversarial pass only, by its author.** The failure mode
  to look for is a hypothesis of K1 or K3 used outside its range; the ranges
  are stated inline at each application for that reason.
- Two small discrepancies noticed in the source and recorded so they are not
  rediscovered: the final display of the book's Chapter 26 prints
  x(log x)^5/min{U,V} where its own Corollary 26.7 gives the square roots
  √U, √V; the conclusion there is unaffected because that proof takes
  U=V=e^(√log x). The derivation above uses Theorem 26.6 directly and does not
  depend on either form.

<!-- Provenance of the reachability claims in §2: Granville-Shao read in the
arXiv PDF; Iwaniec-Kowalski section titles in the AMS coll053 endmatter PDF;
Koukoulopoulos in the author's preliminary version; Tao Notes 3 fetched from
the blog. Opera de Cribro, Davenport ch. 28 and the Iwaniec-Kowalski chapter
text were not opened. -->
