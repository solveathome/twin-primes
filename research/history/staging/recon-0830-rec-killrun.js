// recon-0830-rec-killrun.js  --  the arithmetic behind recon-0830-rec-killrun.md
//
// THE QUESTION IT SERVES. The recon note asks whether any Maier-type theorem
// in print refutes REC(s, u0) (attack-0829n-rml-proof.md section 3). The
// literature answer is that the Maier family speaks about the COUNT, i.e. the
// full-level (D = W) remainder, and at one class the full-level analogue of
// REC is false. This producer computes the sizes in that statement so that
// the note quotes numbers from an embedded block rather than from prose
// arithmetic.
//
// WHAT IT COMPUTES, section by section:
//  A. Buchstab's omega(u) on [1, 5] from the delay equation
//     (u*omega(u))' = omega(u-1), omega(u) = 1/u on [1, 2], on a fine grid,
//     self-checked against the closed form omega(3) = (1 + ln 2)/3; then the
//     one-class ORIGIN ratio omega(u)*e^gamma at u = 2, 3, 4, 4.26645, i.e.
//     Phi(z^u, z) / (z^u * prod_{p<=z}(1 - 1/p)) in the limit, and its
//     deviation from 1. (Buchstab's asymptotic itself is CITED, not proved
//     here; PRIOR-ART.md "THE MAIER CHAIN" item 3 via Cheer-Goldston 1990.)
//  B. at the corpus's computable levels z = 19, 29, 31, 37 and u = 3, 4:
//     P(z) = prod_{p<=z}(1 - 1/p) exactly, H = z^u, the Poisson mean H*P,
//     its square root (the Montgomery-Vaughan 1986 full-period rms ceiling,
//     CITED at Gorodetsky arXiv:2111.00853v3 p. 6, display after (1.21)),
//     the one-class origin deviation |omega(u) e^gamma - 1| * H * P, the
//     ratio floor dev*sqrt(H*P) that a REC-shaped inequality at full level
//     would have to beat, and the REC allowance z^{u/2 - eps} at
//     eps = 0.05, 0.10, 0.20.
//  C. the crossing level: the z at which the one-class full-level Maier
//     floor dev*sqrt(H*P) first exceeds z^{u/2 - eps}, solved with the
//     Mertens approximation P(z) ~ e^{-gamma}/ln z (bisection in ln z), for
//     the Buchstab deviation at u = 3, 4 and for the FGHM proxy v^{-v}.
//
// Every figure is illustrative of SIZE: asymptotic constants are evaluated at
// finite z, which is exactly the caveat the note attaches to them. Nothing
// here is a theorem and nothing here touches REC as stated (level D = z^s).
// stdout is the deterministic record; no timing is printed.
'use strict';

const GAMMA = 0.5772156649015329;
const EG = Math.exp(GAMMA);
const BETA2 = 4.26645028414864191641;
let FAILS = 0;
function check(name, ok, detail) {
  console.log(`  ${ok ? 'ok   ' : 'FAIL '} ${name}${detail !== undefined ? '   ' + detail : ''}`);
  if (!ok) FAILS++;
}
function f(x, d) { return Number(x).toFixed(d); }
function e(x, d) { return Number(x).toExponential(d); }

// ---- A. Buchstab omega on a grid -------------------------------------------
const h = 1e-4;
const U_MAX = 5;
const N = Math.round((U_MAX - 1) / h);
const om = new Float64Array(N + 1);   // om[i] = omega(1 + i h)
const uAt = i => 1 + i * h;
for (let i = 0; i <= N; i++) om[i] = uAt(i) <= 2 ? 1 / uAt(i) : 0;
// u*omega(u) = 1 + integral_2^u omega(t-1) dt, trapezoid on the grid
let integ = 0;
const i2 = Math.round(1 / h);
for (let i = i2 + 1; i <= N; i++) {
  integ += 0.5 * h * (om[i - 1 - i2] + om[i - i2]);
  om[i] = (1 + integ) / uAt(i);
}
function omega(u) {
  const x = (u - 1) / h, i = Math.floor(x), t = x - i;
  return i >= N ? om[N] : om[i] * (1 - t) + om[i + 1] * t;
}
const om3 = (1 + Math.log(2)) / 3;
console.log('A. Buchstab omega(u), delay equation on a grid, h = ' + h);
check('omega(3) matches (1 + ln 2)/3 to 1e-7', Math.abs(omega(3) - om3) < 1e-7, `${f(omega(3), 9)} vs ${f(om3, 9)}`);
check('omega(2) = 1/2 exactly on the grid', Math.abs(omega(2) - 0.5) < 1e-12, f(omega(2), 9));
console.log('  e^gamma = ' + f(EG, 7) + '   e^-gamma = ' + f(1 / EG, 7));
console.log('  u        omega(u)     omega(u)*e^gamma   dev = |omega e^gamma - 1|');
const US = [2, 3, 4, BETA2];
const DEV = {};
for (const u of US) {
  const r = omega(u) * EG;
  DEV[u] = Math.abs(r - 1);
  console.log(`  ${f(u, 5).padEnd(8)} ${f(omega(u), 7).padStart(10)}   ${f(r, 7).padStart(14)}      ${e(DEV[u], 4)}`);
}
console.log('  FGHM proxy v^-v:  v = 3: ' + e(Math.pow(3, -3), 4) + '   v = 4: ' + e(Math.pow(4, -4), 4));

// ---- B. finite-z sizes ------------------------------------------------------
function primesUpTo(n) { const s = new Uint8Array(n + 1), out = []; for (let i = 2; i <= n; i++) { if (!s[i]) { out.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } } return out; }
function Pz(z) { let p = 1; for (const q of primesUpTo(z)) p *= 1 - 1 / q; return p; }
check('P(37) equals the twelve-factor product', Math.abs(Pz(37) - (1 / 2) * (2 / 3) * (4 / 5) * (6 / 7) * (10 / 11) * (12 / 13) * (16 / 17) * (18 / 19) * (22 / 23) * (28 / 29) * (30 / 31) * (36 / 37)) < 1e-15, f(Pz(37), 7));
console.log('B. one class, full level: origin deviation against the full-period rms ceiling');
console.log('   H = z^u, P = prod_{p<=z}(1-1/p) exact, mean = H P, rms <= sqrt(H P) [MV 1986], dev from A');
console.log('  z    u    P(z)       H           H*P        sqrt(HP)   dev*HP      floor=dev*sqrt(HP)  z^{u/2-.05}  z^{u/2-.10}  z^{u/2-.20}');
for (const u of [3, 4]) for (const z of [19, 29, 31, 37]) {
  const P = Pz(z), H = Math.pow(z, u), HP = H * P, s = Math.sqrt(HP), dev = DEV[u];
  const al = eps => Math.pow(z, u / 2 - eps);
  console.log(`  ${String(z).padEnd(4)} ${u}    ${f(P, 5)}    ${e(H, 3).padStart(9)}   ${e(HP, 3).padStart(9)}  ${f(s, 1).padStart(8)}   ${e(dev * HP, 3).padStart(9)}   ${f(dev * s, 3).padStart(10)}        ${f(al(0.05), 1).padStart(9)}   ${f(al(0.10), 1).padStart(9)}   ${f(al(0.20), 1).padStart(9)}`);
}

// ---- C. crossing level under Mertens ---------------------------------------
console.log('C. crossing level z* where dev*sqrt(z^u e^-gamma/ln z) = z^{u/2-eps}, i.e. z^eps = 1/(dev*sqrt(e^-gamma/ln z)); Mertens approximation');
console.log('  deviation source        u    eps     log10 z*');
function crossing(dev, eps) {
  // g(L) = eps*L - ln(1/dev) - 0.5*ln(L) + 0.5*(-GAMMA) ... solve g(L) = 0 for L = ln z
  const g = L => eps * L - Math.log(1 / dev) + 0.5 * (-GAMMA) - 0.5 * Math.log(L);
  let lo = 2, hi = 1e6;
  if (g(hi) < 0) return Infinity;
  for (let k = 0; k < 200; k++) { const m = 0.5 * (lo + hi); if (g(m) < 0) lo = m; else hi = m; }
  return 0.5 * (lo + hi) / Math.LN10;
}
for (const [name, dev, u] of [['Buchstab origin, u = 3', DEV[3], 3], ['Buchstab origin, u = 4', DEV[4], 4], ['FGHM proxy 3^-3', Math.pow(3, -3), 3], ['FGHM proxy 4^-4', Math.pow(4, -4), 4]])
  for (const eps of [0.05, 0.10, 0.20])
    console.log(`  ${name.padEnd(24)} ${u}    ${f(eps, 2)}    ${f(crossing(dev, eps), 2)}`);
check('crossing is monotone decreasing in eps for the u = 4 Buchstab row', crossing(DEV[4], 0.05) > crossing(DEV[4], 0.10) && crossing(DEV[4], 0.10) > crossing(DEV[4], 0.20));
console.log('self-test failures: ' + FAILS + (FAILS ? '   <-- DO NOT TRUST THIS OUTPUT' : '   (all checks passed)'));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/recon-0830-rec-killrun.js
//   invocation:  node research/history/staging/recon-0830-rec-killrun.js
//   code-sha256: 6e85c329a3660dd4b05ac5f1684df9a4e80b538cabcd072a03b21bad2a38d95a
//   out-sha256:  f901255f12503ca6cc79fb3d4c4e87d5a1d45642ede2a73bcdcd44df4d514521
//   body-lines:  38
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     0.1 s
// ============================================================================
// A. Buchstab omega(u), delay equation on a grid, h = 0.0001
//   ok    omega(3) matches (1 + ln 2)/3 to 1e-7   0.564382394 vs 0.564382394
//   ok    omega(2) = 1/2 exactly on the grid   0.500000000
//   e^gamma = 1.7810724   e^-gamma = 0.5614595
//   u        omega(u)     omega(u)*e^gamma   dev = |omega e^gamma - 1|
//   2.00000   0.5000000        0.8905362      1.0946e-1
//   3.00000   0.5643824        1.0052059      5.2059e-3
//   4.00000   0.5614582        0.9999978      2.2121e-6
//   4.26645   0.5615200        1.0001078      1.0775e-4
//   FGHM proxy v^-v:  v = 3: 3.7037e-2   v = 4: 3.9063e-3
//   ok    P(37) equals the twelve-factor product   0.1487210
// B. one class, full level: origin deviation against the full-period rms ceiling
//    H = z^u, P = prod_{p<=z}(1-1/p) exact, mean = H P, rms <= sqrt(H P) [MV 1986], dev from A
//   z    u    P(z)       H           H*P        sqrt(HP)   dev*HP      floor=dev*sqrt(HP)  z^{u/2-.05}  z^{u/2-.10}  z^{u/2-.20}
//   19   3    0.17102     6.859e+3    1.173e+3      34.2    6.107e+0        0.178             71.5        61.7        46.0
//   29   3    0.15795     2.439e+4    3.852e+3      62.1    2.005e+1        0.323            132.0       111.5        79.6
//   31   3    0.15285     2.979e+4    4.554e+3      67.5    2.371e+1        0.351            145.4       122.4        86.9
//   37   3    0.14872     5.065e+4    7.533e+3      86.8    3.922e+1        0.452            187.9       156.8       109.3
//   19   4    0.17102     1.303e+5    2.229e+4     149.3    4.930e-2        0.000            311.6       268.9       200.3
//   29   4    0.15795     7.073e+5    1.117e+5     334.2    2.471e-1        0.001            710.7       600.6       428.9
//   31   4    0.15285     9.235e+5    1.412e+5     375.7    3.123e-1        0.001            809.4       681.7       483.6
//   37   4    0.14872     1.874e+6    2.787e+5     527.9    6.166e-1        0.001           1142.9       954.1       664.9
// C. crossing level z* where dev*sqrt(z^u e^-gamma/ln z) = z^{u/2-eps}, i.e. z^eps = 1/(dev*sqrt(e^-gamma/ln z)); Mertens approximation
//   deviation source        u    eps     log10 z*
//   Buchstab origin, u = 3   3    0.05    70.27
//   Buchstab origin, u = 3   3    0.10    33.53
//   Buchstab origin, u = 3   3    0.20    15.96
//   Buchstab origin, u = 4   4    0.05    140.72
//   Buchstab origin, u = 4   4    0.10    68.80
//   Buchstab origin, u = 4   4    0.20    33.62
//   FGHM proxy 3^-3          3    0.05    51.91
//   FGHM proxy 3^-3          3    0.10    24.31
//   FGHM proxy 3^-3          3    0.20    11.32
//   FGHM proxy 4^-4          4    0.05    72.92
//   FGHM proxy 4^-4          4    0.10    34.86
//   FGHM proxy 4^-4          4    0.20    16.63
//   ok    crossing is monotone decreasing in eps for the u = 4 Buchstab row
// self-test failures: 0   (all checks passed)
// ============================================================================
// READINGS
//
// 1. The one-class origin ratio omega(u) e^gamma is a constant away from 1 at
//    every fixed u (section A), so at full level and one class the sup over
//    positions of |count - mean| is at least dev * H * P, a constant fraction
//    of the mean, while the full-period rms is at most sqrt(H P) (MV 1986).
//    The ratio floor dev * sqrt(H P) grows like z^{u/2} up to a log, which
//    exceeds the REC allowance z^{u/2 - eps} for every eps > 0 eventually.
// 2. At every computable level the floor sits far BELOW the allowance
//    (section B): the crossing is at log10 z* in the tens (section C). A
//    full-level, one-class REC that is false asymptotically would pass the
//    corpus's finite-z margin test at every z anyone can run.
// 3. None of this touches REC as stated (level D = z^s, two classes); it
//    calibrates what a finite-z margin can and cannot see.
