# A branch-preserving driver for the exact coefficients C(n) and C'(n-2)

<!-- ledger
id: Q-corner-branch-diagnostic
status: ANSWERED
todo: C
parity: Exact finite algebra of the stated identity on retained finite inputs, plus floating logarithmic sums labelled measured; no arithmetic estimate, sign trend, asymptotic saving or twin margin is inferred, and no residue or non-residue input is used beyond divisibility of the stored integers.
question: Can future experiments enumerate the full coefficients C(n) and C'(n-2) branch by branch, without silently dropping proper prime powers, cofactors s>1, non-squarefree inputs or either gcd branch?
verdict: The driver exists and its two independent constructions of each side agree exactly on 8192 retained sides and 1802 fixture sides; five deletion and reconstruction controls are ACTIVE in both runs. Its split by gcd(n,n-2) measures integer parity, not the per-term CRT gcd partition. The fixed-eta corner is empty on the retained prefix, and Elo exceeds E0 across the entire J_x, so the matrix is a proxy window. This is finite algebra and tool preparation, with no asymptotic estimate or twin margin.
-->

**The twin-prime margin C_2 x + E_dagger(x) >= c_0 x/(log x)^K remains OPEN,
and nothing in this note or in the driver's output touches it.** This is a
piece of tooling. It computes no estimate, and no sign trend, cancellation
rate, asymptotic saving or research closure may be inferred from any number
it prints. It is preparation for a later named mechanism, not another
sign search; [OUTCOMES Corner-measurement](OUTCOMES.md) already records that
a direct corner sieve is uninformative below x=2^70 and is not to be rerun.

Two facts are stated up front because they bound everything the driver can
be used for.

- **The actual fixed-eta corner S_0 is often empty at retained sizes.** A
  left summand needs Dlo<d and n/d>V, hence n>V*Dlo. With the archived
  window x=134217728 and eta_0=1/500 the corner cut is Dlo=1395160 against
  V=89, so a term needs n>1.24e8, while the retained prefix sits near
  9.946e7. The driver's `--probe-corner` reports exactly that: 0 integers
  n with both sides nonempty, 0 terms.
- **A proxy window is not the asymptotic corner.** The embedded run uses the
  handoff cuts Dlo=U=89, Elo=Y=2. That is the full residual's divisor range,
  not S_0. Its matrix says what the enumeration does on that range and
  nothing about S_0 or about x -> infinity.

## 1. The object

With Dlo=max(U,D1) the identity for one side is exact:

    C(n) = sum_{r|n, r>V, r a prime power} Lambda(r)
             * sum_{s|(n/r), Dlo < n/(r*s) <= D0} mu(n/(r*s)),

and the direct form is

    C(n) = sum_{d|n, Dlo<d<=D0} mu(d) beta_V(n/d),
    beta_V(k) = sum_{r|k, r>V, r a prime power} Lambda(r).

Repeated powers of one prime appear separately (r=p, p^2, ... each with
Lambda(r)=log p), because beta is a sum over prime powers. The right side
C'(n-2) is the same object with Y, Z, E1, E0 and the argument n-2. The full
corner is sum_n C(n) C'(n-2); multiplying the two coefficients keeps both
compatible gcd branches automatically. The s=s'=1, prime-r, prime-r' piece
is one subfamily of the nine
([corner-correlation.md](corner-correlation.md) 1.1-1.4).

Cutoffs, from [RESEARCH-HANDOFF.md](RESEARCH-HANDOFF.md) section 3 and
[corner-correlation.md](corner-correlation.md) section 0: x=2^j,
J_x=(x/2,x], U=V=floor(x^(6/25)), Y=Z=floor(x^(1/20)),
D0=floor(x/(V+1)), E0=floor((x-2)/(Z+1)),
D1=floor(x^(19/25-2*eta_0)), E1=floor(x^(19/20-2*eta_0)), 0<eta_0<1/400.

## 2. Arguments

[corner-branch-diagnostic.js](corner-branch-diagnostic.js) takes every
interval and cutoff explicitly and prints the parameters it used.

| Argument | Meaning |
|---|---|
| `--fixture` | toy mode with disclosed cuts, direct trial-division factorisation, finite algebra only |
| `--window=<q>` | archived window from `data-reuse/factor-windows.json`; q in {97, 997, 9973} |
| `--from=<A> --to=<B>` | the n interval; defaults to the window's own lo, hi |
| `--profile=handoff` | Dlo=U, Elo=Y: the full residual's divisor range |
| `--profile=corner` | Dlo=max(U,D1), Elo=max(Y,E1): the fixed-eta corner S_0 |
| `--eta0=<r>` | corner parameter, rejected unless 0<eta_0<1/400; default 1/500 |
| `--V= --Dlo= --D0= --Z= --Elo= --E0=` | explicit overrides of any derived cutoff |
| `--probe-corner` | additionally report the corner cuts and their support |

The cutoffs are always derived from the full x, never from the scanned
interval. The run prints |J_x|, the scanned count and the scanned fraction of
J_x, and labels the scanned range a prefix.

## 3. What each reported quantity is

For each n the driver forms the nine products C_a(n) C'_b(n-2), where a and b
range over the three categories of summand:

- **P**: r prime (e=1) and s=1;
- **S**: r prime (e=1) and s>1;
- **Q**: r=p^e a proper prime power (e>=2), any s.

Every summand falls in exactly one category, and P+S+Q is the whole
coefficient. For each of the nine cells and for the overall product the run
reports four separate quantities:

- **signed** = sum over n of C_a(n) C'_b(n-2);
- **absterm** = sum over n of (sum of |mu(d)| Lambda(r) over the a-summands at n)
  times the same over the b-summands at n-2, using Lambda(r)=log p for
  r=p^e, that is the term-wise absolute
  mass, not the absolute value of a grouped product;
- **groupedabs** = sum over n of |C_a(n) C'_b(n-2)|, the grouped absolute
  total, which is strictly smaller than absterm wherever anything cancels
  inside a coefficient;
- **support** = the number of n whose contribution is nonzero.

The overall groupedabs is *not* the sum of the nine cells' groupedabs; that
is the point of reporting both.

The same four quantities are reported for integer parity
(gcd(n,n-2)=1 exactly when n is odd, gcd=2 when n is even) and for the four
squarefree classes of the pair (n, n-2): both squarefree, n only, n-2 only,
neither.

This is not the per-term CRT-modulus or cofactor-gcd partition. Even n
can contain terms with either compatible gcd; the vectors have already
summed over those indices. [round-review-0906.md §4](round-review-0906.md)
gives explicit counterexamples. The total identity includes all terms,
but an application needing those separate gcd sums must enumerate them.

All of these are **floating logarithmic sums and are measured**, accumulated
with Neumaier compensation. The identity check itself does not use them: each
side is carried as an integer vector of prime-log coefficients (a map from
prime p to an integer), so the agreement of the two constructions is exact
integer equality, not a float comparison.

## 4. Controls

Five controls run in every mode and are printed ACTIVE or INACTIVE.

| Control | What it does | Fixture | Factor-reuse |
|---|---|---|---|
| C1 | delete category S, then compare with the direct divisor formula | ACTIVE, 504 n break | ACTIVE, 2816 n break |
| C2 | delete category Q, then compare with the direct divisor formula | ACTIVE, 409 n break | ACTIVE, 1473 n break |
| C3 | repeated powers of one base entered as separate r | ACTIVE, left 213 / right 212 | ACTIVE, left 42 / right 1194 |
| C4 | every input integer reconstructs as the product of its stored prime powers | ACTIVE, 1802 checked | ACTIVE, 8192 checked |
| C5 | P+S+Q equals the direct divisor formula, per n and in total | ACTIVE, 1802 checked | ACTIVE, 8192 checked |

C1 and C2 are genuine deletion controls: the reported count is the number of
n at which removing that category actually changes the integer coefficient
vector. An INACTIVE result would mean the category is empty or inert at those
parameters, and the run then prints a REJECTED line saying it is not a test
of that category. The same rejection is printed for any empty integer parity or
empty squarefree class. Neither embedded run prints a REJECTED line: all nine
cells, both parities and all four squarefree classes are populated in both.

Two further refusals are built in. If the archived window does not retain
factors for the whole requested range, including n-2, the driver prints
REFUSED, substitutes no proxy interval and computes nothing. If the two
constructions of a side ever disagree, the run stops at that n rather than
continuing to larger inputs, and reports the first mismatch.

Factor provenance is printed on every non-fixture run: the artefact's own
SHA-256, its recorded producer, its recorded source binding
`research/fold-ledger-01.csv` with that file's SHA-256, and a SHA-256 of the
selected window's retained factor block. The artefact is read and never
written.

## 5. The bounded factor-reuse run

Embedded as tail 2 of the driver, invocation

    node research/qc/embed.js --tail 2 research/corner-branch-diagnostic.js \
      -- --window=9973 --profile=handoff --probe-corner

Parameters: archived window q=9973, x=134217728, J_x=(67108864,134217728],
scanned n in [99460731, 99464826], 4096 integers, 6.104e-5 of J_x;
V=89, Dlo=89, D0=1491308, Z=2, Elo=2, E0=44739242; eta_0=1/500 giving
D1=1395160 and E1=48854902 for the probe. Runtime 0.13 s. The fixture run is
tail 1, invocation `node research/corner-branch-diagnostic.js --fixture`,
runtime 0.02 s, with disclosed toy cuts V=2, Dlo=3, D0=60, Z=2, Elo=3, E0=60
on n in [300,1200]. Total compute for this note is under five seconds; the
two-minute per-run and ten-minute total caps were not approached.

Both tails verify under `node research/qc/embed.js --check --tail <n>
research/corner-branch-diagnostic.js`. The fixture's overall signed total was
reproduced by a third, deliberately naive construction (a full d=1..n loop
with no factorisation reuse) run outside the repository.

## 6. Limits

- Nothing here is an arithmetic result. The identity is finite algebra and
  the totals are finite floating sums at one set of non-asymptotic cuts.
- The fixed-eta corner is empty on the retained prefix, measured as 0
  integers with both sides nonempty. The embedded matrix is taken at the
  handoff cuts and is a proxy window. It is not S_0 and not the asymptotic
  corner.
- At the recorded corner cuts Elo=48854902>E0=44739242, the right
  divisor interval is empty over the whole J_x, independently of the
  left-prefix support restriction. This is a finite floor/cutoff effect.
- 4096 integers is 6.104e-5 of J_x at that x. Prefix totals are not
  full-interval residuals, as
  [data-reuse-audit.md](data-reuse-audit.md) section 4 already records.
- The right cutoff Z=2 at this x is degenerate in the same way
  [OUTCOMES Corner-measurement](OUTCOMES.md) records for the corner bands.
  The right coefficient at these parameters is not a probe of the band
  structure.
- The driver does not know anything about E_dagger, the CRT endpoint sum or
  the sawtooth convention. It enumerates C and C' only.
- Larger runs need factors that the archived artefact does not retain. The
  driver refuses rather than proxying, and a larger census is out of scope
  here: [data-reuse-audit.md](data-reuse-audit.md) section 5 states the
  condition for commissioning one.
