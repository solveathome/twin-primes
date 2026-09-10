// attack-barrier-kappa2.js — scratchpad-grade support for
// research/history/staging/attack-barrier-kappa2.md
//
// Three checks, none of them a proof of anything:
//
//  (A) The pair correlation of a real primitive character at shift 2 is exactly
//      computable over a full period:  sum_{n mod q} chi(n)chi(n+2) = -1 for q an
//      odd prime not dividing 2.  This is the sum the brief guessed was available
//      without a Chowla hypothesis.  It is available.  Section 6 of the note says
//      why it is the wrong object.
//
//  (B) The mixed-sign class set J = { j mod q : chi(j) = -1, chi(j+2) = +1 } has
//      density -> 1/4.  So the construction is non-vacuous on an arithmetic
//      progression, and J is a positive proportion of residues, which is why it
//      cannot be reached by removing one class per prime dividing q (the
//      interval-transfer obstruction of section 4).
//
//  (C) The candidate extremal set, measured with lambda in place of chi (they
//      agree on z-rough n under the hypothesis, section 2).  For x = z^u, count
//      z-rough pairs (n, n+2) by the sign pattern (lambda(n), lambda(n+2)) and
//      report the fraction carrying the mixed pattern (-1, +1).  The claim under
//      test is the section 5 ceiling: the fraction is 0 for u < 2 and positive
//      for u > 2, so the candidate stops being extremal at exactly u = 2.
//      SMALL x.  This is an illustration at log x ~ 17, not an asymptotic.

'use strict';

// ---------- (A) and (B): exact character sums -------------------------------

function legendre(a, p) {
  a = ((a % p) + p) % p;
  if (a === 0) return 0;
  let r = 1n, b = BigInt(a), e = BigInt((p - 1) / 2), m = BigInt(p);
  while (e > 0n) { if (e & 1n) r = (r * b) % m; b = (b * b) % m; e >>= 1n; }
  return r === 1n ? 1 : -1;
}

const primes = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 101, 103, 1009, 10007];
console.log('(A)(B) real primitive chi = Legendre symbol mod q, shift 2');
console.log('   q     sum_n chi(n)chi(n+2)     |J|/q      (J = chi(j)=-1, chi(j+2)=+1)');
for (const q of primes) {
  let s = 0, j = 0;
  for (let n = 0; n < q; n++) {
    s += legendre(n, q) * legendre(n + 2, q);
    if (legendre(n, q) === -1 && legendre(n + 2, q) === 1) j++;
  }
  console.log(String(q).padStart(6), String(s).padStart(18), (j / q).toFixed(6).padStart(12));
}

// ---------- (C): the candidate set, measured with lambda ---------------------

const N = 20000000;
console.log('\n(C) sign patterns of z-rough pairs (n, n+2), n <= x = ' + N);

const spf = new Int32Array(N + 3);
const par = new Uint8Array(N + 3);      // parity of Omega(n); par[1] = 0
const pr = [];
for (let i = 2; i <= N + 2; i++) {
  if (spf[i] === 0) { spf[i] = i; par[i] = 1; pr.push(i); }
  for (let k = 0; k < pr.length; k++) {
    const p = pr[k];
    if (p > spf[i] || i * p > N + 2) break;
    spf[i * p] = p;
    par[i * p] = par[i] ^ 1;
  }
}
spf[1] = N + 10;                         // 1 is rough at every level
par[1] = 0;                              // lambda(1) = +1

// control: an independent Eratosthenes count of twin prime pairs, so the rows at
// u <= 2 can be checked against a number computed by other code.  At u <= 2 a
// z-rough pair is exactly a twin prime pair with n > z, since a rough n with two
// or more prime factors exceeds z^2 >= x.
{
  const c = new Uint8Array(N + 3);
  for (let i = 2; i * i <= N + 2; i++) if (!c[i]) for (let j = i * i; j <= N + 2; j += i) c[j] = 1;
  let t = 0;
  for (let n = 2; n + 2 <= N; n++) if (!c[n] && !c[n + 2]) t++;
  let below = 0;
  const z2 = Math.pow(N, 0.5);
  for (let n = 2; n <= z2 && n + 2 <= N; n++) if (!c[n] && !c[n + 2]) below++;
  console.log('    control: twin pairs n+2 <= x = ' + t +
              ';  with n <= sqrt(x) = ' + below +
              ';  difference = ' + (t - below) + ' must equal the u = 2.0 row');
}

const us = [1.6, 1.8, 1.9, 2.0, 2.1, 2.2, 2.5, 3.0, 3.5, 4.0, 5.0, 6.0];
console.log('    u        z    rough pairs   (-,+)      (+,-)      (-,-)      (+,+)   frac(-,+)');
for (const u of us) {
  const z = Math.pow(N, 1 / u);
  let tot = 0, mp = 0, pm = 0, mm = 0, pp = 0;
  for (let n = 1; n + 2 <= N; n++) {
    if (spf[n] <= z) continue;
    if (spf[n + 2] <= z) continue;
    tot++;
    const a = par[n], b = par[n + 2];     // 1 means lambda = -1
    if (a === 1 && b === 0) mp++;
    else if (a === 0 && b === 1) pm++;
    else if (a === 1 && b === 1) mm++;
    else pp++;
  }
  console.log(
    u.toFixed(1).padStart(6),
    z.toFixed(0).padStart(9),
    String(tot).padStart(13),
    String(mp).padStart(10), String(pm).padStart(10),
    String(mm).padStart(10), String(pp).padStart(10),
    (tot ? mp / tot : 0).toFixed(6).padStart(11));
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/attack-barrier-kappa2.js
//   invocation:  node research/history/staging/attack-barrier-kappa2.js
//   code-sha256: e0446ae8f91bbf37817952baa7df50b11b0e3b8bae1a96c6660751b14b4aedfb
//   out-sha256:  d0d9b90aa250f499cf5deb576528f25977c1a0544d8a2de1f20878d1895c4ec5
//   body-lines:  32
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     0.9 s
// ============================================================================
// (A)(B) real primitive chi = Legendre symbol mod q, shift 2
//    q     sum_n chi(n)chi(n+2)     |J|/q      (J = chi(j)=-1, chi(j+2)=+1)
//     11                 -1     0.272727
//     13                 -1     0.230769
//     17                 -1     0.235294
//     19                 -1     0.263158
//     23                 -1     0.217391
//     29                 -1     0.241379
//     31                 -1     0.225806
//     37                 -1     0.243243
//     41                 -1     0.243902
//     43                 -1     0.255814
//    101                 -1     0.247525
//    103                 -1     0.242718
//   1009                 -1     0.249752
//  10007                 -1     0.249925
//
// (C) sign patterns of z-rough pairs (n, n+2), n <= x = 20000000
//     control: twin pairs n+2 <= x = 107407;  with n <= sqrt(x) = 116;  difference = 107291 must equal the u = 2.0 row
//     u        z    rough pairs   (-,+)      (+,-)      (-,-)      (+,+)   frac(-,+)
//    1.6     36572        106852          0          0     106852          0    0.000000
//    1.8     11380        107180          0          0     107180          0    0.000000
//    1.9      6961        107245          0          0     107245          0    0.000000
//    2.0      4472        107291          0          0     107291          0    0.000000
//    2.1      2997        113259       2917       2841     107326        175    0.025755
//    2.2      2083        126188       8902       8772     107344       1170    0.070546
//    2.5       833        176077      29592      29517     107374       9594    0.168063
//    3.0       271        261012      59283      59550     107389      34790    0.227127
//    3.5       122        348497      85016      85482     111715      66284    0.243950
//    4.0        67        458424     113941     114046     128347     102090    0.248549
//    5.0        29        712897     178114     177935     184020     172828    0.249845
//    6.0        16        989011     247464     247086     250862     243599    0.250214
// ============================================================================
// READINGS
//
// 1. (A) The pair correlation of a real primitive character at shift 2 is exactly
//    -1 over a full period, at all fourteen prime moduli tried, 11 through 10007.
//    The evaluation is elementary, not Weil: the sum is
//    sum_n chi(n(n+2)) = sum_m chi(m^2 - 1), which is -1 for every odd prime
//    modulus not dividing the discriminant.  So the two-point input the corpus's
//    mixed-sign sketch could not get for lambda IS available for chi, and it is
//    available unconditionally.  Section 6 of the note is why that does not help.
//
// 2. (B) The mixed-sign class set has density 0.249752 at q = 1009 and 0.249925
//    at q = 10007, converging on 1/4.  The construction is therefore non-vacuous
//    on an arithmetic progression: classes a with chi(a) = -1 and chi(a+2) = +1
//    exist in quantity.  It is also a quarter of all residues, not a bounded
//    number of classes, which is the section 4 reason it cannot be imposed on an
//    interval by removing one class per prime dividing q.
//
// 3. (C) control.  107407 twin prime pairs with n+2 <= 2*10^7, of which 116 have
//    n <= sqrt(x), difference 107291, which is exactly the u = 2.0 row.  The
//    sieve reproduces an independently computed count, so the sign-pattern table
//    rests on a checked enumeration.
//
// 4. (C) The ceiling.  Every sign pattern with a +1 coordinate is EMPTY at
//    u = 1.6, 1.8, 1.9 and 2.0, and nonempty at 2.1 and above.  The (-,+) count
//    goes 0, 0, 0, 0, 2917, 8902, 29592.  This is the section 5 arithmetic seen
//    directly: a z-rough integer with lambda = +1 has at least two prime factors,
//    each above z, so it exceeds z^2, and z^2 >= x exactly when u <= 2.
//
// 5. (C) Above the ceiling the candidate is not extremal, it is a fixed share of
//    the sifted set.  frac(-,+) is 0.025755 at u = 2.1, 0.168063 at 2.5,
//    0.227127 at 3.0 and 0.248549 at 4.0, approaching 1/4.  A barrier needs this
//    share to be o(1) in the kappa = 2 normalisation.  It is not o(1) here.
//    CAVEAT, and it is the size of the caveat that matters: at this x the natural
//    logarithm of x is under seventeen, so z at u = 2.5 is 833 and the asymptotic
//    regime is nowhere near.  This table is an illustration of the mechanism, not a measurement of
//    the limit.  It cannot rule out that the share tends to 0 as x grows, and no
//    check in this repository has looked for that.
//
// 6. (C) The pattern the interval transfer actually delivers, (-,-), is the
//    opposite of extremal.  It holds 107374 of the 176077 rough pairs at u = 2.5
//    and 107389 of 261012 at u = 3.0, that is every twin prime pair in range,
//    because for u < 3 a rough integer with lambda = -1 is prime.  Choosing
//    chi(a) = -1 selects the largest piece of the sifted set, not the smallest.
