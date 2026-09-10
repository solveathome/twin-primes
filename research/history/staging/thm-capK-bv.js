#!/usr/bin/env node
'use strict';
// ============================================================================
// THM-CAPK-BV — scratchpad checks for the fundamental-lemma + BV assembly
// behind the prime-regime cap_K asymptotic (bv-import-survey.md §3.2,
// TODO item 11 third prize). Companion to
// research/history/staging/thm-capK-bv.md. Nothing here is a proof; the four
// blocks each test one hypothesis of the theorem written in that note.
//
// BLOCK 1  the sifting set is CONTIGUOUS: {wheel primes 7..x} u {first K
//          scour primes} = all primes in [7, q_K], and q_K < min tail prime.
//          If this fails, the fundamental lemma's dimension condition has to
//          be checked on a gappy set instead of on an interval of primes.
// BLOCK 2  the dimension constant K_dim of Friedlander-Iwaniec Opera de Cribro
//          Lemma 6.8(iii) for h(p) = 1/(p-1) supported on [7, z]: the least K
//          with prod_{w<=p<z1}(1-h(p))^{-1} <= K (ln z1/ln w)^1 for all
//          z1 >= w >= 2. K_dim enters the error as K_dim^10, so it decides the
//          sifting variable s at which the lemma first says anything.
// BLOCK 3  the sifting variable u = ln D / ln q_K in the tail, D = T^{1/3} and
//          D = T^{1/2}, T = sqrt(W) (the worst tail case). Reports the first
//          level x at which u clears the FI threshold 9k+10 ln K_dim.
// BLOCK 4  exact prime-regime cap_K cofactor counts, FULL wheel, against the
//          product main term, at @17/@19/@23 and K in {0,1,2,4,8}. Two
//          predictors: cap-28's dP*(pi(A)-pi(q-1)) form, and the theorem's
//          form with the mod-30 count taken exactly.
// BLOCK 5  the deep ladder: cap-28's K* at @97 in the u coordinate.
//
// Definitions follow paper/staircase-note.md §7 (side conditions, freshness
// conditions, cap_K) and research/natal-cap-28-analytic-certificate.js
// RESULT 1 (comb_A/comb_B, dP). Freshness uses ONE excluded class per q_i,
// per research/history/staging/thm-mod30-tail.md §5(i).
// ============================================================================

const L = (s) => console.log(s);

// ---- primes ----------------------------------------------------------------
function sieve(n) {
  const c = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) {
    if (!c[i]) { out.push(i); for (let j = i * i; j <= n; j += i) c[j] = 1; }
  }
  return out;
}
const SMALL = sieve(200000);
const isP = (n) => { if (n < 2) return false; for (const p of SMALL) { if (p * p > n) break; if (n % p === 0) return false; } return true; };
const nextPrime = (n) => { let k = n + 1; while (!isP(k)) k++; return k; };

// ---- level data ------------------------------------------------------------
function level(x) {
  const wheel = SMALL.filter((p) => p >= 7 && p <= x);
  let W = 1; for (const p of SMALL) { if (p > x) break; W *= p; }
  const lnW = SMALL.filter((p) => p <= x).reduce((a, p) => a + Math.log(p), 0);
  const scour = []; let q = nextPrime(x);
  while (q * q <= W && scour.length < 12) { scour.push(q); q = nextPrime(q); }
  return { x, W, lnW, wheel, scour };
}

L('=== BLOCK 1: the sifting set is the primes in [7, q_K], contiguous ===');
L('P = {wheel 7..x} u {first K scour primes}; checked against all primes in [7,q_K].');
for (const x of [11, 13, 17, 19, 23, 29]) {
  const lv = level(x);
  const qmin = nextPrime(Math.floor(Math.cbrt(lv.W + 1)));
  const rows = [];
  for (const K of [0, 1, 2, 4, 8]) {
    const P = lv.wheel.concat(lv.scour.slice(0, K));
    const zK = P[P.length - 1];
    const contig = SMALL.filter((p) => p >= 7 && p <= zK);
    const ok = contig.length === P.length && contig.every((p, i) => p === P[i]);
    rows.push(`K=${K}: q_K=${zK} contiguous=${ok ? 'YES' : 'NO'} q_K<q_min=${zK < qmin ? 'YES' : 'NO'}`);
  }
  L(`@${x}: W=${lv.W} lnW=theta(x)=${lv.lnW.toFixed(3)} x/lnW=${(x / lv.lnW).toFixed(3)} tail starts at q_min=${qmin} (W^{1/3}=${Math.cbrt(lv.W).toFixed(1)}, sqrt W=${Math.sqrt(lv.W).toFixed(1)})`);
  L('     ' + rows.join(' | '));
}

L('');
L('=== BLOCK 2: FI Opera de Cribro Lemma 6.8(iii) dimension constant, kappa=1 ===');
L('h(p)=1/(p-1) on p in [7,z], 0 elsewhere. K_dim = sup_{2<=w<z1} prod(1-h)^{-1} / (ln z1/ln w).');
{
  const PS = SMALL.filter((p) => p >= 7);
  // sup is attained with w at a prime (or 2) and z1 just above a prime.
  const eps = 1e-9;
  let best = 0, bw = 0, bz = 0;
  const ws = [2, 3, 5].concat(PS.slice(0, 4000));
  for (const w of ws) {
    let prod = 1;
    for (const p of PS) {
      if (p < w) continue;
      if (p > 100000) break;
      prod *= (p - 1) / (p - 2);
      const z1 = p + eps;                       // z1 just above p: p is included
      const r = prod / (Math.log(z1) / Math.log(w));
      if (r > best) { best = r; bw = w; bz = p; }
    }
  }
  const Kdim = best;
  L(`K_dim (numerical sup over w<=4000th prime, z1<=1e5) = ${Kdim.toFixed(6)}  at w=${bw}, z1=${bz}+`);
  for (const target of [1, 0.5, 0.01]) {
    // FI error factor e^{9k-s} K^10 <= target  =>  s >= 9 + 10 ln K - ln target
    const s0 = Math.max(10, 9 + 10 * Math.log(Kdim) - Math.log(target));
    L(`  s needed for FI error factor <= ${target}: s >= ${s0.toFixed(2)}  (floor 9k+1 = 10)`);
  }
}

L('');
L('=== BLOCK 3: the sifting variable u = ln D / ln q_K in the tail ===');
L('worst tail case T = W/q at q = sqrt(W), i.e. ln T = lnW/2. z = q_K.');
{
  const rows = [];
  for (const x of [11, 13, 17, 19, 23, 29, 97, 199, 401, 1009, 10007]) {
    const lnW = SMALL.filter((p) => p <= x).reduce((a, p) => a + Math.log(p), 0);
    const lnT = lnW / 2;
    const q0 = nextPrime(x);           // K=0 -> z = x^+ ; K=8 -> 8th scour prime
    let q8 = q0; for (let i = 1; i < 8; i++) q8 = nextPrime(q8);
    const u = (frac, z) => (frac * lnT) / Math.log(z);
    rows.push(`x=${String(x).padStart(5)} lnW=${lnW.toFixed(1).padStart(8)}  K=0: u(D=T^1/3)=${u(1 / 3, x).toFixed(2).padStart(6)} u(D=T^1/2)=${u(1 / 2, x).toFixed(2).padStart(6)}   K=8 (q_8=${String(q8).padStart(6)}): u(1/3)=${u(1 / 3, q8).toFixed(2).padStart(6)} u(1/2)=${u(1 / 2, q8).toFixed(2).padStart(6)}`);
  }
  rows.forEach((r) => L(r));
  // first level clearing s>=10 and s>=12 at K=0, D=T^{1/2}
  for (const thr of [10, 12]) {
    let x = 7, lnW = 0, found = 0;
    while (x < 4000) {
      x = nextPrime(x);
      lnW = SMALL.filter((p) => p <= x).reduce((a, p) => a + Math.log(p), 0);
      if ((0.5 * lnW / 2) / Math.log(x) >= thr) { found = x; break; }
    }
    L(`  first level x with u >= ${thr} at K=0, D=T^{1/2}, T=sqrt(W): x = ${found}  (lnW = ${lnW.toFixed(0)}, W ~ 10^${(lnW / Math.LN10).toFixed(0)})`);
  }
}

L('');
L('=== BLOCK 4: exact prime-regime cap_K cofactors vs the product main term ===');
L('FULL wheel 7<=p<=x plus K freshness primes; A-side v=11,17 (30) & v!=-2 (p);');
L('B-side v=13,19 (30) & v!=2 (p). pred1 = dP_K*(pi(A)-pi(q-1)+pi(B)-pi(q-1));');
L('pred2 = wheelprod*freshprod*(exact count of primes in [q,A] and [q,B] in the');
L('two mod-30 classes) -- pred2 removes the mod-30 equidistribution from the test.');
const KS = [0, 1, 2, 4, 8];
for (const x of [17, 19, 23]) {
  const lv = level(x);
  const W = lv.W;
  const qmin = nextPrime(Math.floor(Math.cbrt(W + 1)));
  const qmax = Math.floor(Math.sqrt(W));
  const Amax = Math.floor((W + 1) / qmin);
  const pr = sieve(Amax + 10);
  const pc = new Int32Array(Amax + 2);       // pc[n] = pi(n)
  { let j = 0; for (let n = 0; n <= Amax + 1; n++) { while (j < pr.length && pr[j] <= n) j++; pc[n] = j; } }
  const tail = pr.filter((q) => q >= qmin && q <= qmax);
  const wheel = lv.wheel;
  const fresh = lv.scour.slice(0, 8);
  const mods = [30].concat(wheel).concat(fresh);
  const res = new Map();                      // residues of every prime m
  for (const m of mods) { const a = new Int32Array(pr.length); for (let i = 0; i < pr.length; i++) a[i] = pr[i] % m; res.set(m, a); }
  const r30 = res.get(30);
  const wheelProd = wheel.reduce((a, p) => a * (1 - 1 / (p - 1)), 1);
  const dP0 = 0.25 * wheelProd;

  const exact = KS.map(() => 0);
  let cls30A = 0, cls30B = 0;
  let pred1 = KS.map(() => 0), pred2 = KS.map(() => 0);
  const freshProd = (K) => fresh.slice(0, K).reduce((a, p) => a * (1 - 1 / (p - 1)), 1);

  for (const q of tail) {
    const A = Math.floor((W - 1) / q), B = Math.floor((W + 1) / q);
    const nbelow = pc[q - 1];
    const piA = pc[A], piB = pc[B];
    for (let k = 0; k < KS.length; k++) {
      pred1[k] += dP0 * freshProd(KS[k]) * ((piA - nbelow) + (piB - nbelow));
    }
    const q30 = q % 30;
    const qw = wheel.map((p) => q % p);
    const qf = fresh.map((p) => q % p);
    // start index: first prime >= q
    let lo = 0, hi = pr.length - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (pr[mid] < q) lo = mid + 1; else hi = mid; }
    let c30 = 0;
    for (let i = lo; i < pr.length; i++) {
      const m = pr[i]; if (m > B) break;
      const v30 = (q30 * r30[i]) % 30;
      const sideA = (m <= A) && (v30 === 11 || v30 === 17);
      const sideB = (v30 === 13 || v30 === 19);
      if (!sideA && !sideB) continue;
      c30++; if (sideA) cls30A++; else cls30B++;
      const bad = sideA ? -2 : 2;
      let ok = true;
      for (let j = 0; j < wheel.length; j++) {
        const p = wheel[j];
        if ((qw[j] * res.get(p)[i]) % p === ((bad % p) + p) % p) { ok = false; break; }
      }
      if (!ok) continue;
      let depth = 0;
      for (let j = 0; j < fresh.length; j++) {
        const p = fresh[j];
        if (p >= q) { depth = fresh.length; break; }
        if ((qf[j] * res.get(p)[i]) % p === ((bad % p) + p) % p) break;
        depth++;
      }
      for (let k = 0; k < KS.length; k++) if (KS[k] <= depth) exact[k]++;
    }

    for (let k = 0; k < KS.length; k++) pred2[k] += wheelProd * freshProd(KS[k]) * c30;
  }
  const N = 2 * wheel.reduce((a, p) => a * (p - 2), 1);
  let sSum = 0; for (const q of tail) if ([11, 13, 17, 19].includes(q % 30)) sSum++;
  L(`@${x}: W=${W} N=${N} tailPrimes=${tail.length} Sigma s(q) over tail=${sSum} wheelProd=${wheelProd.toFixed(6)} dP=${dP0.toFixed(6)}`);
  L(`      primes in [q,A] / [q,B] in the two mod-30 classes per side, summed over the tail: A=${cls30A} B=${cls30B} (sibling thm-mod30-tail.js A-side K=0 base: 5336 at @17, 90501 at @19)`);
  for (let k = 0; k < KS.length; k++) {
    L(`      K=${String(KS[k]).padStart(2)}: exact=${String(exact[k]).padStart(8)}  pred1=${pred1[k].toFixed(1).padStart(10)} (exact/pred1=${(exact[k] / pred1[k]).toFixed(4)})  pred2=${pred2[k].toFixed(1).padStart(10)} (exact/pred2=${(exact[k] / pred2[k]).toFixed(4)})  (exact+s)/N=${((exact[k] + sSum) / N).toFixed(4)}`);
  }
}

L('');
L('=== BLOCK 5: the deep ladder in the u coordinate ===');
L('cap-28 READINGS, @97: K* = 7.41e8 with q* = 1.67e10 (central calibration).');
{
  const x = 97;
  const lnW = SMALL.filter((p) => p <= x).reduce((a, p) => a + Math.log(p), 0);
  const lnT = lnW / 2;
  for (const [name, qK] of [['K=0 (wheel only)', 97], ['K=8', 139], ['K*=7.41e8 (q*=1.67e10)', 1.67e10], ['K0.9=2.98e13', 6.7e14]]) {
    L(`  @97 lnW=${lnW.toFixed(1)} lnT>=${lnT.toFixed(1)}: ${name}: ln q_K=${Math.log(qK).toFixed(2)}  ln q_K/ln T=${(Math.log(qK) / lnT).toFixed(3)}  u(D=T^{1/3})=${(lnT / 3 / Math.log(qK)).toFixed(2)}  u(D=T^{1/2})=${(lnT / 2 / Math.log(qK)).toFixed(2)}`);
  }
  L('  (q for K0.9 estimated by the PNT from K0.9=2.98e13; order of magnitude only)');
}
L('');
L('done');
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/thm-capK-bv.js
//   invocation:  node research/history/staging/thm-capK-bv.js
//   code-sha256: fff18ac8e5414a8fabee1fb02d735dc62c1a46a89937bd8503624ee64b83948c
//   out-sha256:  895e5c4005db1870a436e1f98c6011af6169c3c31c2e766917ed03149849bda9
//   body-lines:  74
//   forced:      2026-08-28, 0 of 202 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     1.1 s
// ============================================================================
// === BLOCK 1: the sifting set is the primes in [7, q_K], contiguous ===
// P = {wheel 7..x} u {first K scour primes}; checked against all primes in [7,q_K].
// @11: W=2310 lnW=theta(x)=7.745 x/lnW=1.420 tail starts at q_min=17 (W^{1/3}=13.2, sqrt W=48.1)
//      K=0: q_K=11 contiguous=YES q_K<q_min=YES | K=1: q_K=13 contiguous=YES q_K<q_min=YES | K=2: q_K=17 contiguous=YES q_K<q_min=NO | K=4: q_K=23 contiguous=YES q_K<q_min=NO | K=8: q_K=41 contiguous=YES q_K<q_min=NO
// @13: W=30030 lnW=theta(x)=10.310 x/lnW=1.261 tail starts at q_min=37 (W^{1/3}=31.1, sqrt W=173.3)
//      K=0: q_K=13 contiguous=YES q_K<q_min=YES | K=1: q_K=17 contiguous=YES q_K<q_min=YES | K=2: q_K=19 contiguous=YES q_K<q_min=YES | K=4: q_K=29 contiguous=YES q_K<q_min=YES | K=8: q_K=43 contiguous=YES q_K<q_min=NO
// @17: W=510510 lnW=theta(x)=13.143 x/lnW=1.293 tail starts at q_min=83 (W^{1/3}=79.9, sqrt W=714.5)
//      K=0: q_K=17 contiguous=YES q_K<q_min=YES | K=1: q_K=19 contiguous=YES q_K<q_min=YES | K=2: q_K=23 contiguous=YES q_K<q_min=YES | K=4: q_K=31 contiguous=YES q_K<q_min=YES | K=8: q_K=47 contiguous=YES q_K<q_min=YES
// @19: W=9699690 lnW=theta(x)=16.088 x/lnW=1.181 tail starts at q_min=223 (W^{1/3}=213.3, sqrt W=3114.4)
//      K=0: q_K=19 contiguous=YES q_K<q_min=YES | K=1: q_K=23 contiguous=YES q_K<q_min=YES | K=2: q_K=29 contiguous=YES q_K<q_min=YES | K=4: q_K=37 contiguous=YES q_K<q_min=YES | K=8: q_K=53 contiguous=YES q_K<q_min=YES
// @23: W=223092870 lnW=theta(x)=19.223 x/lnW=1.196 tail starts at q_min=607 (W^{1/3}=606.5, sqrt W=14936.3)
//      K=0: q_K=23 contiguous=YES q_K<q_min=YES | K=1: q_K=29 contiguous=YES q_K<q_min=YES | K=2: q_K=31 contiguous=YES q_K<q_min=YES | K=4: q_K=41 contiguous=YES q_K<q_min=YES | K=8: q_K=59 contiguous=YES q_K<q_min=YES
// @29: W=6469693230 lnW=theta(x)=22.590 x/lnW=1.284 tail starts at q_min=1867 (W^{1/3}=1863.4, sqrt W=80434.4)
//      K=0: q_K=29 contiguous=YES q_K<q_min=YES | K=1: q_K=31 contiguous=YES q_K<q_min=YES | K=2: q_K=37 contiguous=YES q_K<q_min=YES | K=4: q_K=43 contiguous=YES q_K<q_min=YES | K=8: q_K=61 contiguous=YES q_K<q_min=YES
//
// === BLOCK 2: FI Opera de Cribro Lemma 6.8(iii) dimension constant, kappa=1 ===
// h(p)=1/(p-1) on p in [7,z], 0 elsewhere. K_dim = sup_{2<=w<z1} prod(1-h)^{-1} / (ln z1/ln w).
// K_dim (numerical sup over w<=4000th prime, z1<=1e5) = 1.200000  at w=7, z1=7+
//   s needed for FI error factor <= 1: s >= 10.82  (floor 9k+1 = 10)
//   s needed for FI error factor <= 0.5: s >= 11.52  (floor 9k+1 = 10)
//   s needed for FI error factor <= 0.01: s >= 15.43  (floor 9k+1 = 10)
//
// === BLOCK 3: the sifting variable u = ln D / ln q_K in the tail ===
// worst tail case T = W/q at q = sqrt(W), i.e. ln T = lnW/2. z = q_K.
// x=   11 lnW=     7.7  K=0: u(D=T^1/3)=  0.54 u(D=T^1/2)=  0.81   K=8 (q_8=    41): u(1/3)=  0.35 u(1/2)=  0.52
// x=   13 lnW=    10.3  K=0: u(D=T^1/3)=  0.67 u(D=T^1/2)=  1.00   K=8 (q_8=    43): u(1/3)=  0.46 u(1/2)=  0.69
// x=   17 lnW=    13.1  K=0: u(D=T^1/3)=  0.77 u(D=T^1/2)=  1.16   K=8 (q_8=    47): u(1/3)=  0.57 u(1/2)=  0.85
// x=   19 lnW=    16.1  K=0: u(D=T^1/3)=  0.91 u(D=T^1/2)=  1.37   K=8 (q_8=    53): u(1/3)=  0.68 u(1/2)=  1.01
// x=   23 lnW=    19.2  K=0: u(D=T^1/3)=  1.02 u(D=T^1/2)=  1.53   K=8 (q_8=    59): u(1/3)=  0.79 u(1/2)=  1.18
// x=   29 lnW=    22.6  K=0: u(D=T^1/3)=  1.12 u(D=T^1/2)=  1.68   K=8 (q_8=    61): u(1/3)=  0.92 u(1/2)=  1.37
// x=   97 lnW=    83.7  K=0: u(D=T^1/3)=  3.05 u(D=T^1/2)=  4.58   K=8 (q_8=   137): u(1/3)=  2.84 u(1/2)=  4.25
// x=  199 lnW=   188.6  K=0: u(D=T^1/3)=  5.94 u(D=T^1/2)=  8.91   K=8 (q_8=   251): u(1/3)=  5.69 u(1/2)=  8.53
// x=  401 lnW=   376.7  K=0: u(D=T^1/3)= 10.48 u(D=T^1/2)= 15.71   K=8 (q_8=   449): u(1/3)= 10.28 u(1/2)= 15.42
// x= 1009 lnW=   963.2  K=0: u(D=T^1/3)= 23.21 u(D=T^1/2)= 34.81   K=8 (q_8=  1051): u(1/3)= 23.07 u(1/2)= 34.61
// x=10007 lnW=  9905.2  K=0: u(D=T^1/3)=179.23 u(D=T^1/2)=268.84   K=8 (q_8= 10091): u(1/3)=179.06 u(1/2)=268.60
//   first level x with u >= 10 at K=0, D=T^{1/2}, T=sqrt(W): x = 239  (lnW = 221, W ~ 10^96)
//   first level x with u >= 12 at K=0, D=T^{1/2}, T=sqrt(W): x = 283  (lnW = 271, W ~ 10^118)
//
// === BLOCK 4: exact prime-regime cap_K cofactors vs the product main term ===
// FULL wheel 7<=p<=x plus K freshness primes; A-side v=11,17 (30) & v!=-2 (p);
// B-side v=13,19 (30) & v!=2 (p). pred1 = dP_K*(pi(A)-pi(q-1)+pi(B)-pi(q-1));
// pred2 = wheelprod*freshprod*(exact count of primes in [q,A] and [q,B] in the
// two mod-30 classes) -- pred2 removes the mod-30 equidistribution from the test.
// @17: W=510510 N=14850 tailPrimes=105 Sigma s(q) over tail=51 wheelProd=0.644531 dP=0.161133
//       primes in [q,A] / [q,B] in the two mod-30 classes per side, summed over the tail: A=5336 B=5396 (sibling thm-mod30-tail.js A-side K=0 base: 5336 at @17, 90501 at @19)
//       K= 0: exact=    6938  pred1=    6903.6 (exact/pred1=1.0050)  pred2=    6917.1 (exact/pred2=1.0030)  (exact+s)/N=0.4706
//       K= 1: exact=    6564  pred1=    6520.0 (exact/pred1=1.0067)  pred2=    6532.8 (exact/pred2=1.0048)  (exact+s)/N=0.4455
//       K= 2: exact=    6248  pred1=    6223.7 (exact/pred1=1.0039)  pred2=    6235.9 (exact/pred2=1.0019)  (exact+s)/N=0.4242
//       K= 4: exact=    5819  pred1=    5801.4 (exact/pred1=1.0030)  pred2=    5812.7 (exact/pred2=1.0011)  (exact+s)/N=0.3953
//       K= 8: exact=    5262  pred1=    5251.6 (exact/pred1=1.0020)  pred2=    5261.9 (exact/pred2=1.0000)  (exact+s)/N=0.3578
// @19: W=9699690 N=252450 tailPrimes=396 Sigma s(q) over tail=194 wheelProd=0.608724 dP=0.152181
//       primes in [q,A] / [q,B] in the two mod-30 classes per side, summed over the tail: A=90501 B=90633 (sibling thm-mod30-tail.js A-side K=0 base: 5336 at @17, 90501 at @19)
//       K= 0: exact=  110245  pred1=  110258.6 (exact/pred1=0.9999)  pred2=  110260.6 (exact/pred2=0.9999)  (exact+s)/N=0.4375
//       K= 1: exact=  105224  pred1=  105246.9 (exact/pred1=0.9998)  pred2=  105248.8 (exact/pred2=0.9998)  (exact+s)/N=0.4176
//       K= 2: exact=  101480  pred1=  101488.1 (exact/pred1=0.9999)  pred2=  101489.9 (exact/pred2=0.9999)  (exact+s)/N=0.4027
//       K= 4: exact=   95328  pred1=   95380.0 (exact/pred1=0.9995)  pred2=   95381.7 (exact/pred2=0.9994)  (exact+s)/N=0.3784
//       K= 8: exact=   86979  pred1=   87100.0 (exact/pred1=0.9986)  pred2=   87101.5 (exact/pred2=0.9986)  (exact+s)/N=0.3453
// @23: W=223092870 N=5301450 tailPrimes=1638 Sigma s(q) over tail=821 wheelProd=0.581055 dP=0.145264
//       primes in [q,A] / [q,B] in the two mod-30 classes per side, summed over the tail: A=1824591 B=1825111 (sibling thm-mod30-tail.js A-side K=0 base: 5336 at @17, 90501 at @19)
//       K= 0: exact= 2120470  pred1= 2120667.7 (exact/pred1=0.9999)  pred2= 2120676.5 (exact/pred2=0.9999)  (exact+s)/N=0.4001
//       K= 1: exact= 2044980  pred1= 2044929.6 (exact/pred1=1.0000)  pred2= 2044938.0 (exact/pred2=1.0000)  (exact+s)/N=0.3859
//       K= 2: exact= 1976810  pred1= 1976765.3 (exact/pred1=1.0000)  pred2= 1976773.4 (exact/pred2=1.0000)  (exact+s)/N=0.3730
//       K= 4: exact= 1874130  pred1= 1873808.8 (exact/pred1=1.0002)  pred2= 1873816.5 (exact/pred2=1.0002)  (exact+s)/N=0.3537
//       K= 8: exact= 1725506  pred1= 1724758.2 (exact/pred1=1.0004)  pred2= 1724765.2 (exact/pred2=1.0004)  (exact+s)/N=0.3256
//
// === BLOCK 5: the deep ladder in the u coordinate ===
// cap-28 READINGS, @97: K* = 7.41e8 with q* = 1.67e10 (central calibration).
//   @97 lnW=83.7 lnT>=41.9: K=0 (wheel only): ln q_K=4.57  ln q_K/ln T=0.109  u(D=T^{1/3})=3.05  u(D=T^{1/2})=4.58
//   @97 lnW=83.7 lnT>=41.9: K=8: ln q_K=4.93  ln q_K/ln T=0.118  u(D=T^{1/3})=2.83  u(D=T^{1/2})=4.24
//   @97 lnW=83.7 lnT>=41.9: K*=7.41e8 (q*=1.67e10): ln q_K=23.54  ln q_K/ln T=0.562  u(D=T^{1/3})=0.59  u(D=T^{1/2})=0.89
//   @97 lnW=83.7 lnT>=41.9: K0.9=2.98e13: ln q_K=34.14  ln q_K/ln T=0.815  u(D=T^{1/3})=0.41  u(D=T^{1/2})=0.61
//   (q for K0.9 estimated by the PNT from K0.9=2.98e13; order of magnitude only)
//
// done
// ============================================================================
// READINGS
//
