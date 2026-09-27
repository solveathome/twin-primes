// ============================================================================
// ATTACK2-05 + ATTACK2-07 — THE FOSSIL INTEGRAL and THE SEAM LADDER
// ============================================================================
//
// -------------------------- ATTACK 5: THE FOSSIL INTEGRAL -------------------
//
// CLAIM TO TEST: the zone-edge constant e^{2gamma}/4 ~ 0.793 is the
// ACCUMULATED effect of the fossil strata — each prime p <= sqrt(x) denting
// the territory near x as its kill-image head swept past.
//
// FORMALIZATION. Fix a location x. Define the local relative density
//   rho(x, y) = (density near x of pairs (r, r+2) with both members free of
//                prime factors <= y) / delta(y),
// where delta(y) = (1/2) prod_{2<p<=y} (1 - 2/p) is the naive wheel density.
// Parametrize by u = ln x / ln y (so y = x^{1/u}; u = 2 is the zone edge,
// u = 1 means sieving all the way to x).
//
// DERIVATION FOR 1 <= u <= 2 (exact, elementary): below y^2 the y-rough
// numbers are exactly 1 and the primes, so rough pairs near x are TWIN
// PRIMES, density 2*C2/ln^2(x) (Hardy-Littlewood). Meanwhile
// delta(y) -> 2*C2*e^{-2gamma}/ln^2(y) (Mertens + the C2 product identity).
// Hence
//   rho(u) -> [2C2/ln^2 x] / [2C2 e^{-2gamma}/ln^2 y] = e^{2gamma}/u^2.
// This ONE formula unifies everything we measured separately:
//   u=1:   rho = e^{2gamma}      ~ 3.17  (the anchored-window cap, attack 10)
//   u=2:   rho = e^{2gamma}/4    ~ 0.793 (the zone-edge trough, attack 2)
//   u in [2, 2+eps]: the KILL SHADOW band — rho between 0.79 and 1,
//          averaging ~0.85 over [y^2, 2y^2]  (anchored-windows.md)
//   u>=3:  rho ~ 1 (the p^3 equidistribution law, attack 2)
//
// FOR 2 <= u <= 3 the dent accumulates via the fossil flux: when level y
// ignites, its new kills near x are y*(rough numbers near x/y) — the
// delay structure of Buchstab's equation. For SINGLE primes the classical
// solution is rho_1(u) = e^{gamma} * omega(u), omega(u) = (1+ln(u-1))/u on
// [2,3]. CONJECTURE (independence of the two coordinates): the pair version
// is the square, rho_2(u) ~ (e^{gamma} omega(u))^2 on [2,3].
//   That predicts: rho(3) ~ 1.01, rho(2.2) ~ 0.92, rho(2.05) ~ 0.83, and
//   rho(2) = (e^gamma/2)^2 = e^{2gamma}/4 — CONTINUOUS with the exact
//   u<=2 branch. The kill shadow depth ~0.85 is then just the average of
//   this curve over the band u in [2, 2 + ln2/ln y].
//
// TEST: measure rho(x, y) directly in windows near x = 1e6, 1e7, 1e8 at a
// grid of u values, against both predictions. (Finite-size drift expected:
// at these x the u=2 value sits ~0.9 and drifts toward 0.793, exactly as
// script 01 measured for zones.)
//
// --------------------------- ATTACK 7: THE SEAM LADDER ----------------------
//
// The Seam Lemma guarantees p-2 seam twin-slot pairs (kP-1, kP+1) per level
// forever. A seam pair that survives ALL levels is an actual twin prime pair
// k*P# +- 1. Define the seam ladder function
//   m(n) = min{ k >= 1 : k*P_n# - 1 and k*P_n# + 1 are both prime }.
// Hardy-Littlewood for the two linear forms k*P +- 1: every prime q | P is
// automatically avoided (local factor 1/(1-1/q)^2), q = 2 contributes 4,
// odd q not dividing P contribute the usual twin factor. Working it out:
//   expected #twins among k <= K  ~  K * S / ln^2(K*P),
//   S = 4*C2 * prod_{2<q<=p_n} 1/(1-2/q)  ~  e^{2gamma} * ln^2(p_n).
// So the expected ladder height is
//   m(n) ~ ln^2(P_n#) / S ~ (ln P_n# / (e^{gamma} ln p_n))^2
//        ~ (p_n / (e^{gamma} ln p_n))^2   [Chebyshev: ln P_n# ~ p_n]
// — quadratic over log-squared, very reachable. We compute m(n) for
// n = 1..35 (P_35# ~ 10^57) with BigInt Miller-Rabin and compare.
// The wall-form, honestly: proving m(n) finite for infinitely many n IS a
// twin-prime-type statement; the ladder is new DATA, not a new proof route.
// ============================================================================

const GAMMA = 0.5772156649015329;

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}

// ---------------------------------------------------------------------------
// Part A: measure rho(x, y) = local rough-pair density / delta(y)
// ---------------------------------------------------------------------------
console.log('=== ATTACK 5: the fossil integral — rho(u) measured vs predicted ===');
const bigPrimes = primesUpTo(5_000_000); // for delta(y) products up to y ~ 4.7e6

function deltaNaive(y){
  let d = 0.5;
  for (const p of bigPrimes){ if (p === 2) continue; if (p > y) break; d *= (p - 2)/p; }
  return d;
}
const omega = (u) => (1 + Math.log(u - 1))/u; // Buchstab on [2,3]

for (const {x, D} of [{x:1e6, D:2e5}, {x:1e7, D:1e6}, {x:1e8, D:1e6}]){
  const hi = x + D + 2, sq = Math.floor(Math.sqrt(hi));
  const spf = new Uint32Array(D + 3); // 0 = no prime factor <= sq (i.e. prime)
  for (const p of bigPrimes){
    if (p > sq) break;
    let start = Math.ceil(x/p)*p;
    for (let m = start; m <= hi; m += p){ const i = m - x; if (!spf[i]) spf[i] = p; }
  }
  const rows = [];
  for (const u of [3.0, 2.8, 2.6, 2.4, 2.2, 2.1, 2.05, 2.0, 1.8, 1.6, 1.4, 1.2]){
    const y = Math.pow(x, 1/u);
    let c = 0;
    for (let i = 0; i < D; i++){
      const a = spf[i], b = spf[i+2];
      if ((a === 0 || a > y) && (b === 0 || b > y)) c++;
    }
    const rho = (c/D)/deltaNaive(y);
    const pred = u <= 2 ? Math.exp(2*GAMMA)/(u*u)
                        : Math.pow(Math.exp(GAMMA)*omega(u), 2);
    rows.push(`u=${u.toFixed(2)} y=${Math.round(y)} rho=${rho.toFixed(3)} pred=${pred.toFixed(3)}`);
  }
  console.log(`x=${x.toExponential(0)} D=${D.toExponential(0)}:\n  ` + rows.join('\n  '));
}

// ---------------------------------------------------------------------------
// Part B: the seam ladder m(n)
// ---------------------------------------------------------------------------
console.log('\n=== ATTACK 7: the seam ladder m(n) = min k with k*Pn# +- 1 twin primes ===');

function modPow(b, e, m){ let r = 1n; b %= m; while (e > 0n){ if (e & 1n) r = r*b % m; b = b*b % m; e >>= 1n; } return r; }
const MR_BASES = [2n,3n,5n,7n,11n,13n,17n,19n,23n,29n,31n,37n,41n,43n,47n,53n];
function isPrime(n){
  if (n < 2n) return false;
  for (const p of [2n,3n,5n,7n,11n,13n]) { if (n === p) return true; if (n % p === 0n) return false; }
  let d = n - 1n, s = 0n;
  while ((d & 1n) === 0n){ d >>= 1n; s++; }
  outer: for (const a of MR_BASES){
    if (a >= n) continue;
    let x = modPow(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    for (let i = 1n; i < s; i++){ x = x*x % n; if (x === n - 1n) continue outer; }
    return false;
  }
  return true; // deterministic to 3.3e24 with these bases; strong-probable beyond
}

const pr = primesUpTo(200);
let P = 1n, lnP = 0;
const ms = [];
for (let n = 1; n <= 35; n++){
  const p = pr[n-1];
  P *= BigInt(p); lnP += Math.log(p);
  let m = -1;
  for (let k = 1n; k <= 100000n; k++){
    if (isPrime(k*P - 1n) && isPrime(k*P + 1n)){ m = Number(k); break; }
  }
  const mp = Math.pow(lnP/(Math.exp(GAMMA)*Math.log(p)), 2);
  ms.push(m);
  console.log(`n=${n} p=${p} m=${m} predictedScale=${mp.toFixed(1)} m/pred=${(m/mp).toFixed(2)}`);
}
console.log('sequence m(n): ' + ms.join(', '));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack2-05-07-integral-ladder.js
//   invocation:  node research/attack2-05-07-integral-ladder.js
//   code-sha256: ce0d990d57fa84dd1e6df4bf10ba43b345a181faadb733f86eb672202de1eff2
//   out-sha256:  6d1e8d8b6805ff2222070964d2493d2bde45dd817991a611f0dd24652d193acb
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.5 s
// ============================================================================
// === ATTACK 5: the fossil integral — rho(u) measured vs predicted ===
// x=1e+6 D=2e+5:
//   u=3.00 y=100 rho=1.007 pred=1.010
//   u=2.80 y=139 rho=1.013 pred=1.020
//   u=2.60 y=203 rho=1.015 pred=1.014
//   u=2.40 y=316 rho=0.995 pred=0.984
//   u=2.20 y=534 rho=0.938 pred=0.916
//   u=2.10 y=720 rho=0.898 pred=0.863
//   u=2.05 y=845 rho=0.874 pred=0.830
//   u=2.00 y=1000 rho=0.852 pred=0.793
//   u=1.80 y=2154 rho=1.019 pred=0.979
//   u=1.60 y=5623 rho=1.284 pred=1.239
//   u=1.40 y=19307 rho=1.674 pred=1.618
//   u=1.20 y=100000 rho=2.278 pred=2.203
// x=1e+7 D=1e+6:
//   u=3.00 y=215 rho=1.000 pred=1.010
//   u=2.80 y=316 rho=1.011 pred=1.020
//   u=2.60 y=492 rho=1.007 pred=1.014
//   u=2.40 y=825 rho=0.982 pred=0.984
//   u=2.20 y=1520 rho=0.921 pred=0.916
//   u=2.10 y=2154 rho=0.866 pred=0.863
//   u=2.05 y=2598 rho=0.838 pred=0.830
//   u=2.00 y=3162 rho=0.802 pred=0.793
//   u=1.80 y=7743 rho=0.978 pred=0.979
//   u=1.60 y=23714 rho=1.235 pred=1.239
//   u=1.40 y=100000 rho=1.612 pred=1.618
//   u=1.20 y=681292 rho=2.194 pred=2.203
// x=1e+8 D=1e+6:
//   u=3.00 y=464 rho=1.008 pred=1.010
//   u=2.80 y=720 rho=1.016 pred=1.020
//   u=2.60 y=1194 rho=1.009 pred=1.014
//   u=2.40 y=2154 rho=0.974 pred=0.984
//   u=2.20 y=4329 rho=0.906 pred=0.916
//   u=2.10 y=6449 rho=0.856 pred=0.863
//   u=2.05 y=7988 rho=0.824 pred=0.830
//   u=2.00 y=10000 rho=0.788 pred=0.793
//   u=1.80 y=27826 rho=0.972 pred=0.979
//   u=1.60 y=100000 rho=1.229 pred=1.239
//   u=1.40 y=517947 rho=1.605 pred=1.618
//   u=1.20 y=4641589 rho=2.184 pred=2.203
//
// === ATTACK 7: the seam ladder m(n) = min k with k*Pn# +- 1 twin primes ===
// n=1 p=2 m=2 predictedScale=0.3 m/pred=6.34
// n=2 p=3 m=1 predictedScale=0.8 m/pred=1.19
// n=3 p=5 m=1 predictedScale=1.4 m/pred=0.71
// n=4 p=7 m=2 predictedScale=2.4 m/pred=0.84
// n=5 p=11 m=1 predictedScale=3.3 m/pred=0.30
// n=6 p=13 m=6 predictedScale=5.1 m/pred=1.18
// n=7 p=17 m=8 predictedScale=6.8 m/pred=1.18
// n=8 p=19 m=11 predictedScale=9.4 m/pred=1.17
// n=9 p=23 m=4 predictedScale=11.8 m/pred=0.34
// n=10 p=29 m=16 predictedScale=14.2 m/pred=1.13
// n=11 p=31 m=22 predictedScale=18.1 m/pred=1.22
// n=12 p=37 m=4 predictedScale=21.2 m/pred=0.19
// n=13 p=41 m=74 predictedScale=25.4 m/pred=2.91
// n=14 p=43 m=24 predictedScale=30.7 m/pred=0.78
// n=15 p=47 m=37 predictedScale=35.7 m/pred=1.04
// n=16 p=53 m=28 predictedScale=40.4 m/pred=0.69
// n=17 p=59 m=14 predictedScale=45.5 m/pred=0.31
// n=18 p=61 m=11 predictedScale=52.6 m/pred=0.21
// n=19 p=67 m=242 predictedScale=58.6 m/pred=4.13
// n=20 p=71 m=11 predictedScale=65.8 m/pred=0.17
// n=21 p=73 m=91 predictedScale=74.3 m/pred=1.22
// n=22 p=79 m=20 predictedScale=81.5 m/pred=0.25
// n=23 p=83 m=83 predictedScale=90.0 m/pred=0.92
// n=24 p=89 m=91 predictedScale=98.0 m/pred=0.93
// n=25 p=97 m=35 predictedScale=105.6 m/pred=0.33
// n=26 p=101 m=80 predictedScale=115.5 m/pred=0.69
// n=27 p=103 m=48 predictedScale=126.9 m/pred=0.38
// n=28 p=107 m=47 predictedScale=137.7 m/pred=0.34
// n=29 p=109 m=226 predictedScale=150.0 m/pred=1.51
// n=30 p=113 m=2 predictedScale=161.7 m/pred=0.01
// n=31 p=127 m=12 predictedScale=168.3 m/pred=0.07
// n=32 p=131 m=203 predictedScale=180.9 m/pred=1.12
// n=33 p=137 m=30 predictedScale=192.9 m/pred=0.16
// n=34 p=139 m=38 predictedScale=207.6 m/pred=0.18
// n=35 p=149 m=356 predictedScale=218.2 m/pred=1.63
// sequence m(n): 2, 1, 1, 2, 1, 6, 8, 11, 4, 16, 22, 4, 74, 24, 37, 28, 14, 11, 242, 11, 91, 20, 83, 91, 35, 80, 48, 47, 226, 2, 12, 203, 30, 38, 356
// READINGS.
// A5-1. THE FOSSIL INTEGRAL CLOSES. The exact branch rho(u) = e^{2gamma}/u^2
//   (u <= 2) is verified within 1% at x=1e8 over the whole range u=1.2..2.0.
//   The [2,3] branch matches the PAIR-BUCHSTAB-SQUARED conjecture
//   rho ~ (e^{gamma} omega(u))^2 within ~1% at every grid point. ONE curve
//   now unifies four separately-measured phenomena: the anchored cap
//   e^{2gamma} (u=1), the zone trough e^{2gamma}/4 (u=2), the kill shadow
//   ~0.85 (the average of rho over the band u in [2, 2+ln2/ln y]), and the
//   p^3 equidistribution law (u >= 3, where rho pins to 1). The accumulated
//   dent of the fossil strata IS (the pair version of) Buchstab's delay
//   integral — the strata are its discrete increments. Centerpiece-grade
//   for the paper; the [2,3] independence-squared step remains a conjecture
//   (exact on [1,2]).
// A5-2. The kill shadow is no longer a separate object: its ~0.85 depth is
//   the integral of this curve over the first octave past the zone edge.
//   One formula, whole geography.
// A7-1. THE SEAM LADDER IS KNOWN: m(n) is exactly OEIS A060256 (Labos
//   Elemer 2001; b-file to n=500 by Pierre CAMI) — all 35 computed terms
//   match. So no new-sequence submission here; cite A060256. (A384545 is
//   the smooth-multiplier variant, differing first at n=29.)
// A7-2. WHAT IS NEW: A060256 carries no formula or asymptotic. Our
//   HL-derived scale m(n) ~ (ln P_n# / (e^{gamma} ln p_n))^2
//   ~ (p_n/(e^{gamma} ln p_n))^2 tracks the data (median ratio ~0.8 with
//   the expected waiting-time scatter). Contributable as a comment/formula
//   to A060256 — a smaller but real OEIS opportunity.
// A7-3. Honesty: the ladder is another wall-form — "m(n) finite for all n"
//   is a twin-prime-type statement; the data is new, the proof route is not.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// TOKENIZER ARTIFACT, not a figure: 060256 and 384545 are the digit tails of
// the OEIS identifiers A060256 and A384545 cited in reading A7-1.
//
// LITERATURE / CITATION metadata: "b-file to n=500 by Pierre CAMI" in reading
// A7-1 describes the extent of the OEIS entry's own b-file. It is a property of
// A060256 as published, not of any run here; this script computes 35 terms.
// ---------------------------------------------------------------------------
