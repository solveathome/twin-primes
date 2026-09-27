#!/usr/bin/env node
// ============================================================================
// corner-log-average-validation.js
//
// Finite checks for research/corner-log-average.md, which asks whether the
// logarithmically averaged two-point machinery (Tao arXiv:1509.05422 v4;
// Helfgott-Radziwill arXiv:2103.06853 v2; Pilatte arXiv:2310.19357 v3) can be
// pointed at the corner sum
//        sum_{n in J_x} mu(n) mu(n-2) L(n) L'(n-2)
// of research/corner-correlation.md (5).
//
// The note distinguishes TWO weights that agree in spirit and not in law:
//   Lw  the corner's own weight, with the COFACTOR WINDOW D_1 < n/r <= D_0
//   Lb  the scale-free PRIME BAND weight, V < r <= V*Delta with no window
// The dilation step n -> p n that drives every one of those proofs needs the
// second; the corner supplies the first. This script tests four things.
//
// Review rider: these are finite proxy diagnostics only. A window can retain
// terms under dilation; nonzero violations do not mean every support point
// leaves it. T4's predictor is retained for comparison, not as a proved
// natural-average constant. T6 prices one displayed parameter choice and one
// sufficient uniform-prefix conversion, not a universal method ceiling.
// T1  DILATION LAW.  For every prime p strictly below the band, Lb(p n) =
//     Lb(n) exactly (as a float, because the marking loop adds log r in
//     increasing r for every multiple, so an equal prime set gives an equal
//     bit pattern).  The same test on Lw must have some failures. Both directions
//     are asserted in the note and both are checked.
// T2  CONTROL.  For a prime p INSIDE the band the Lb identity must break, or
//     T1 is testing nothing.
// T3  MOEBIUS COST.  mu(p n) = mu(p) mu(n) fails exactly on the multiples of
//     p, i.e. with density 1/p. This is the "p | n exceptional set" the note
//     prices at O(1/p) per prime.
// T4  THE SWAP COST.  The absolute mass of the DIFFERENCE between the corner's
//     window weight and the scale-free band weight, on the squarefree class,
//     measured against x and against the band mass. The dictionary between the
//     finite runs and the asymptotic regime is Delta <-> x^(2 eta_0), so
//     log Delta <-> 2 eta_0 log x: the derived edge fraction of the band is
//     log(2)/(2 log Delta), which at Delta = x^(2 eta_0) reads
//     log(2)/(4 eta_0 log x) and turns the band mass 4 eta_0^2 x log^2 x into a
//     swap cost of order eta_0 (log 2) x log x. That is a factor log x ABOVE
//     the o(x) target, so the two weights may not be exchanged inside it. The
//     runs test the finite form of the edge fraction, not its x-asymptotics.
//
// Also computed, as plain arithmetic with no arithmetic input at all:
// T5  the sharpness of "logarithmic-average bound B implies block bound << xB"
//     (the witness a_n = 1_{J_x}), and
// T6  the maximum over eps_1 of Pilatte's exponent c_0(eps_1) = eps_1^2
//     log(1/(2 eps_1)) from his Lemma 2.3(d), which caps the saving exponent
//     his section 2.3 chain can produce.
//
// WHAT THIS DOES NOT TEST: any asymptotic rate, any cancellation, any saving,
// any statement about the literature. T1-T4 are finite identity and mass
// measurements at non-asymptotic cutoffs; T5-T6 are arithmetic on published
// formulas. Nothing here is evidence for or against the conjecture.
// ============================================================================

'use strict';

const t0 = Date.now();
const out = [];
const say = (s) => out.push(s);

// ------------------------------------------------------------- sieves ------
function primesUpTo(n) {
  const c = new Uint8Array(n + 1);
  const ps = [];
  for (let i = 2; i <= n; i++) {
    if (!c[i]) { ps.push(i); for (let j = i * i; j <= n; j += i) c[j] = 1; }
  }
  return ps;
}

// mobius by linear sieve
function mobiusUpTo(n) {
  const mu = new Int8Array(n + 1);
  const spf = new Int32Array(n + 1);
  const primes = [];
  mu[1] = 1;
  for (let i = 2; i <= n; i++) {
    if (spf[i] === 0) { spf[i] = i; primes.push(i); mu[i] = -1; }
    for (let k = 0; k < primes.length; k++) {
      const p = primes[k];
      if (p > spf[i] || i * p > n) break;
      spf[i * p] = p;
      mu[i * p] = (p === spf[i]) ? 0 : -mu[i];
    }
  }
  return mu;
}

// band weight arrays: for band primes r in (lo, hi],
//   Lb[m] += log r   for every multiple m of r
//   Lw[m] += log r   only when the cofactor m/r lies in (c1, c0]
function bandWeights(x, lo, hi, c1, c0) {
  const Lb = new Float32Array(x + 1);
  const Lw = new Float32Array(x + 1);
  const band = [];
  for (const r of primesUpTo(hi)) if (r > lo) band.push(r);
  for (const r of band) {
    const lr = Math.log(r);
    for (let m = r; m <= x; m += r) {
      Lb[m] += lr;
      const cof = m / r;
      if (cof > c1 && cof <= c0) Lw[m] += lr;
    }
  }
  return { Lb, Lw, band };
}

// ------------------------------------------------------------- cases -------
// w  left band exponent (stands for 6/25), v right band exponent (1/20);
// D  the finite stand-in for x^(2 eta_0), the band's multiplicative width.
const CASES = [
  { j: 21, w: 0.26, v: 0.13, D: 4 },
  { j: 22, w: 0.26, v: 0.13, D: 4 },
  { j: 23, w: 0.26, v: 0.13, D: 4 },
  { j: 23, w: 0.30, v: 0.16, D: 3 },
];

for (const cs of CASES) {
  const x = 2 ** cs.j;
  const V = Math.floor(Math.pow(x, cs.w));
  const Z = Math.floor(Math.pow(x, cs.v));
  const Vhi = V * cs.D, Zhi = Z * cs.D;
  const D0 = Math.floor(x / (V + 1)), D1 = Math.floor(D0 / cs.D);
  const E0 = Math.floor((x - 2) / (Z + 1)), E1 = Math.floor(E0 / cs.D);

  const left = bandWeights(x, V, Vhi, D1, D0);
  const right = bandWeights(x, Z, Zhi, E1, E0);
  const mu = mobiusUpTo(x);

  say(`case x=2^${cs.j} w=${cs.w} v=${cs.v} Delta=${cs.D}: ` +
      `left band (${V},${Vhi}] |B|=${left.band.length}  ` +
      `right band (${Z},${Zhi}] |B'|=${right.band.length}  ` +
      `D1=${D1} D0=${D0} E1=${E1} E0=${E0}`);

  // ---- T4: masses on J_x, squarefree class only -----------------------
  let massBand = 0, massWin = 0, massDiff = 0, nSq = 0;
  const lo = Math.floor(x / 2) + 1;
  for (let n = lo; n <= x; n++) {
    if (mu[n] === 0 || mu[n - 2] === 0) continue;
    nSq++;
    const b = left.Lb[n] * right.Lb[n - 2];
    const w = left.Lw[n] * right.Lw[n - 2];
    massBand += b; massWin += w; massDiff += Math.abs(b - w);
  }
  const pred = Math.log(2) / (2 * Math.log(cs.D));
  say(`  T4 masses on J_x (squarefree pairs=${nSq}): band=${massBand.toExponential(6)} ` +
      `window=${massWin.toExponential(6)} |band-window|=${massDiff.toExponential(6)}`);
  say(`  T4 ratios: band/x=${(massBand / x).toFixed(4)} window/x=${(massWin / x).toFixed(4)} ` +
      `diff/x=${(massDiff / x).toFixed(4)} diff/band=${(massDiff / massBand).toFixed(6)} ` +
      `predicted log(2)/(2*log Delta)=${pred.toFixed(6)} measured/predicted=${(massDiff / massBand / pred).toFixed(3)}`);

  // ---- T1/T2/T3: the dilation law -------------------------------------
  const smallP = [2, 3, 5, 7, 11, 13];
  const rows = [];
  for (const p of smallP) {
    if (p > V) continue;              // must be strictly below both bands
    let badB = 0, badW = 0, badMu = 0, tot = 0;
    const top = Math.floor(x / p);
    for (let n = 2; n <= top; n++) {
      tot++;
      if (left.Lb[p * n] !== left.Lb[n]) badB++;
      if (left.Lw[p * n] !== left.Lw[n]) badW++;
      const rhs = (n % p === 0) ? 0 : -mu[n];   // mu(p)= -1 for prime p
      if (mu[p * n] !== rhs) badMu++;
    }
    rows.push(`p=${p}: Lb-violations=${badB} Lw-violations=${badW}` +
              ` (${(badW / tot * 100).toFixed(1)}% of n)` +
              ` mu-identity-violations=${badMu}` +
              ` |{n: p|n}|/n=${(1 / p).toFixed(4)} measured=${(countMult(top, p) / tot).toFixed(4)}`);
  }
  for (const r of rows) say('  T1/T3 ' + r);

  // control: a prime inside the band must break the Lb identity
  const pin = left.band[0];
  let ctl = 0;
  const topc = Math.floor(x / pin);
  for (let n = 2; n <= topc; n++) if (left.Lb[pin * n] !== left.Lb[n]) ctl++;
  say(`  T2 control p=${pin} INSIDE the band: Lb-violations=${ctl} ` +
      `(must be > 0; ${ctl > 0 ? 'CONTROL FIRES' : 'CONTROL DEAD'})`);
}

function countMult(top, p) { return Math.floor(top / p) - 0; }

// ---- T5: sharpness of the log-average to block conversion ---------------
{
  const x = 2 ** 22, lo = Math.floor(x / 2) + 1;
  let logAvg = 0;
  for (let n = lo; n <= x; n++) logAvg += 1 / n;
  const block = x - lo + 1;
  say(`T5 witness a_n = 1_{J_x} at x=2^22: log-average sum a_n/n = ${logAvg.toFixed(6)} ` +
      `(log 2 = ${Math.log(2).toFixed(6)}), block sum = ${block} = ${(block / x).toFixed(6)} * x. ` +
      `A log-average bound B forces only a block bound of order x*B, and this witness attains it.`);
}

// ---- T6: the cap on Pilatte's saving exponent ---------------------------
{
  const c0 = (e) => e * e * Math.log(1 / (2 * e));
  let best = 0, arg = 0;
  for (let i = 1; i < 500000; i++) { const e = i / 1000000; const v = c0(e); if (v > best) { best = v; arg = e; } }
  say(`T6 c_0(eps1) = eps1^2*log(1/(2*eps1)) (Pilatte Lemma 2.3(d)): max = ${best.toFixed(6)} ` +
      `at eps1 = ${arg.toFixed(6)} (closed form exp(-1/2)/2 = ${(Math.exp(-0.5) / 2).toFixed(6)}). ` +
      `Section 2.3 sets log x = (log H)^6, so V^{-J/2} = (log x)^{-c_0/12}: ` +
      `saving exponent c <= ${(best / 12).toFixed(6)} before the e^{O(J)} loss.`);
  say(`T6 sufficient exponents for the uniform-prefix conversion: >1 to beat the triangle inequality on one dyadic block, ` +
      `>3 to reach o(x). Displayed-choice comparison ratio >= ${(3 / (best / 12)).toFixed(0)}.`);
}

say(`runtime: ${((Date.now() - t0) / 1000).toFixed(2)} s`);
console.log(out.join('\n'));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/corner-log-average-validation.js
//   invocation:  node research/corner-log-average-validation.js
//   code-sha256: 67451c49d9732598af76c8a81393c0625a787a5433df4297b9985b69fd9f439e
//   out-sha256:  454d26e4706af300b800828eec5f4b20d44a7a3d6be91832a79c07de747e2018
//   body-lines:  44
//   forced:      2026-09-06, 0 of 111 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.6 s
// ============================================================================
// case x=2^21 w=0.26 v=0.13 Delta=4: left band (44,176] |B|=26  right band (6,24] |B'|=6  D1=11650 D0=46603 E1=74898 E0=299592
//   T4 masses on J_x (squarefree pairs=338274): band=4.427143e+5 window=3.030073e+5 |band-window|=1.397069e+5
//   T4 ratios: band/x=0.2111 window/x=0.1445 diff/x=0.0666 diff/band=0.315569 predicted log(2)/(2*log Delta)=0.250000 measured/predicted=1.262
//   T1/T3 p=2: Lb-violations=0 Lw-violations=90344 (8.6% of n) mu-identity-violations=0 |{n: p|n}|/n=0.5000 measured=0.5000
//   T1/T3 p=3: Lb-violations=0 Lw-violations=80199 (11.5% of n) mu-identity-violations=0 |{n: p|n}|/n=0.3333 measured=0.3333
//   T1/T3 p=5: Lb-violations=0 Lw-violations=50337 (12.0% of n) mu-identity-violations=0 |{n: p|n}|/n=0.2000 measured=0.2000
//   T1/T3 p=7: Lb-violations=0 Lw-violations=35911 (12.0% of n) mu-identity-violations=0 |{n: p|n}|/n=0.1429 measured=0.1429
//   T1/T3 p=11: Lb-violations=0 Lw-violations=22735 (11.9% of n) mu-identity-violations=0 |{n: p|n}|/n=0.0909 measured=0.0909
//   T1/T3 p=13: Lb-violations=0 Lw-violations=19286 (12.0% of n) mu-identity-violations=0 |{n: p|n}|/n=0.0769 measured=0.0769
//   T2 control p=47 INSIDE the band: Lb-violations=43670 (must be > 0; CONTROL FIRES)
// case x=2^22 w=0.26 v=0.13 Delta=4: left band (52,208] |B|=31  right band (7,28] |B'|=5  D1=19784 D0=79137 E1=131071 E0=524287
//   T4 masses on J_x (squarefree pairs=676634): band=7.279320e+5 window=5.252014e+5 |band-window|=2.027305e+5
//   T4 ratios: band/x=0.1736 window/x=0.1252 diff/x=0.0483 diff/band=0.278502 predicted log(2)/(2*log Delta)=0.250000 measured/predicted=1.114
//   T1/T3 p=2: Lb-violations=0 Lw-violations=184678 (8.8% of n) mu-identity-violations=0 |{n: p|n}|/n=0.5000 measured=0.5000
//   T1/T3 p=3: Lb-violations=0 Lw-violations=166788 (11.9% of n) mu-identity-violations=0 |{n: p|n}|/n=0.3333 measured=0.3333
//   T1/T3 p=5: Lb-violations=0 Lw-violations=106941 (12.7% of n) mu-identity-violations=0 |{n: p|n}|/n=0.2000 measured=0.2000
//   T1/T3 p=7: Lb-violations=0 Lw-violations=76206 (12.7% of n) mu-identity-violations=0 |{n: p|n}|/n=0.1429 measured=0.1429
//   T1/T3 p=11: Lb-violations=0 Lw-violations=48309 (12.7% of n) mu-identity-violations=0 |{n: p|n}|/n=0.0909 measured=0.0909
//   T1/T3 p=13: Lb-violations=0 Lw-violations=40864 (12.7% of n) mu-identity-violations=0 |{n: p|n}|/n=0.0769 measured=0.0769
//   T2 control p=53 INSIDE the band: Lb-violations=77643 (must be > 0; CONTROL FIRES)
// case x=2^23 w=0.26 v=0.13 Delta=4: left band (63,252] |B|=36  right band (7,28] |B'|=5  D1=32768 D0=131072 E1=262143 E0=1048575
//   T4 masses on J_x (squarefree pairs=1353202): band=1.433418e+6 window=1.018081e+6 |band-window|=4.153366e+5
//   T4 ratios: band/x=0.1709 window/x=0.1214 diff/x=0.0495 diff/band=0.289753 predicted log(2)/(2*log Delta)=0.250000 measured/predicted=1.159
//   T1/T3 p=2: Lb-violations=0 Lw-violations=344043 (8.2% of n) mu-identity-violations=0 |{n: p|n}|/n=0.5000 measured=0.5000
//   T1/T3 p=3: Lb-violations=0 Lw-violations=308953 (11.0% of n) mu-identity-violations=0 |{n: p|n}|/n=0.3333 measured=0.3333
//   T1/T3 p=5: Lb-violations=0 Lw-violations=196958 (11.7% of n) mu-identity-violations=0 |{n: p|n}|/n=0.2000 measured=0.2000
//   T1/T3 p=7: Lb-violations=0 Lw-violations=140527 (11.7% of n) mu-identity-violations=0 |{n: p|n}|/n=0.1429 measured=0.1429
//   T1/T3 p=11: Lb-violations=0 Lw-violations=89067 (11.7% of n) mu-identity-violations=0 |{n: p|n}|/n=0.0909 measured=0.0909
//   T1/T3 p=13: Lb-violations=0 Lw-violations=75373 (11.7% of n) mu-identity-violations=0 |{n: p|n}|/n=0.0769 measured=0.0769
//   T2 control p=67 INSIDE the band: Lb-violations=123334 (must be > 0; CONTROL FIRES)
// case x=2^23 w=0.3 v=0.16 Delta=3: left band (119,357] |B|=41  right band (12,36] |B'|=6  D1=23301 D0=69905 E1=215092 E0=645277
//   T4 masses on J_x (squarefree pairs=1353202): band=1.148936e+6 window=7.241695e+5 |band-window|=4.247666e+5
//   T4 ratios: band/x=0.1370 window/x=0.0863 diff/x=0.0506 diff/band=0.369704 predicted log(2)/(2*log Delta)=0.315465 measured/predicted=1.172
//   T1/T3 p=2: Lb-violations=0 Lw-violations=256110 (6.1% of n) mu-identity-violations=0 |{n: p|n}|/n=0.5000 measured=0.5000
//   T1/T3 p=3: Lb-violations=0 Lw-violations=199565 (7.1% of n) mu-identity-violations=0 |{n: p|n}|/n=0.3333 measured=0.3333
//   T1/T3 p=5: Lb-violations=0 Lw-violations=119713 (7.1% of n) mu-identity-violations=0 |{n: p|n}|/n=0.2000 measured=0.2000
//   T1/T3 p=7: Lb-violations=0 Lw-violations=85535 (7.1% of n) mu-identity-violations=0 |{n: p|n}|/n=0.1429 measured=0.1429
//   T1/T3 p=11: Lb-violations=0 Lw-violations=54440 (7.1% of n) mu-identity-violations=0 |{n: p|n}|/n=0.0909 measured=0.0909
//   T1/T3 p=13: Lb-violations=0 Lw-violations=46060 (7.1% of n) mu-identity-violations=0 |{n: p|n}|/n=0.0769 measured=0.0769
//   T2 control p=127 INSIDE the band: Lb-violations=65531 (must be > 0; CONTROL FIRES)
// T5 witness a_n = 1_{J_x} at x=2^22: log-average sum a_n/n = 0.693147 (log 2 = 0.693147), block sum = 2097152 = 0.500000 * x. A log-average bound B forces only a block bound of order x*B, and this witness attains it.
// T6 c_0(eps1) = eps1^2*log(1/(2*eps1)) (Pilatte Lemma 2.3(d)): max = 0.045985 at eps1 = 0.303265 (closed form exp(-1/2)/2 = 0.303265). Section 2.3 sets log x = (log H)^6, so V^{-J/2} = (log x)^{-c_0/12}: saving exponent c <= 0.003832 before the e^{O(J)} loss.
// T6 sufficient exponents for the uniform-prefix conversion: >1 to beat the triangle inequality on one dyadic block, >3 to reach o(x). Displayed-choice comparison ratio >= 783.
// runtime: 0.58 s
// ============================================================================
// READINGS
// ============================================================================
// 1. T1 is the note's central positive check and it passes without exception:
//    for every prime p strictly below the band, Lb(p*n) = Lb(n) with 0
//    violations in every case. The scale-free band weight is exactly invariant
//    under dilation by a small prime, which is the property the entropy
//    decrement and its successors consume. The corner's own weight is not:
//    Lw(p*n) differs from Lw(n) on 6.1% to 12.7% of n, at every p tested.
// 2. T2 fires in all four cases (43670, 77643, 123334, 65531 violations), so
//    T1's zeros are a property of p being below the band and not an artefact
//    of the test.
// 3. T3 shows that replacing lambda by mu costs exactly the multiples of p:
//    mu(p*n) = mu(p)mu(n)*1_{p does not divide n} holds with 0 violations, and
//    the exceptional set has the measured density 1/p to four places at every
//    p tested. That is the O(1/p) per prime the note prices, and it is
//    affordable inside the parameter hierarchy.
// 4. T4 reports finite proxy masses against the old diagnostic predictor.
//    The predictor is not the corrected natural-average constant. No fixed-eta
//    asymptotic or signed lower bound follows from those measurements.
// 5. T5 witnesses the worst-case uniform-prefix Abel conversion loss; it does
//    not exclude a stronger conversion for a structured arithmetic family.
// 6. T6 computes one displayed parameter choice and sufficient conversion
//    exponents. It is not a universal ceiling or a necessary rate theorem.
// 7. These finite checks establish no asymptotic cancellation or twin margin.
