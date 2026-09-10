// ============================================================================
// varE-limit-theorem.js — the SECOND open step of varE-spectral.md, attacked:
// the decoupled model's own limit theorem, and the n <= L band it never
// evaluated.
// ============================================================================
// WHAT THIS IS. varE-spectral.md section 3 proves (given its decoupling step)
//
//     Var/E  ~=  E[ {L/n} (1 - {L/n}) n/L ],   Pr[p | n] = pi_p = (p-alpha_p)/(p-1)
//
// independently over primes p <= y, with alpha_2 = alpha_3 = 1, alpha_5 = 2,
// alpha_p = p-2 for 7 <= p <= y. Its section 5 then ASSERTS that this tends to
// Pr[GD(2) > u], u = ln L / ln y, and its section 4 says the n <= L band is
// "O(1/ln W)" and is "not evaluated here". redteam-0828-varE.md section 0 calls
// that the second of the two open steps.
//
// THE DECOMPOSITION THIS FILE COMPUTES EXACTLY. Write g(n) = {L/n}(1-{L/n})n/L.
//   n | L      : g = 0 EXACTLY (r_n = 0).                       band A
//   n < L      : 0 <= g <= n/(4L).                               band B
//   n > L      : {L/n} = L/n, so g = 1 - L/n EXACTLY.            band C
// Hence, with P> = Pr[n > L] and R = E[(L/n) 1_{n>L}],
//
//     E[g]  =  P>  -  R  +  B,      B = E[g 1_{n<L}].
//
// Every one of the four quantities is computed here in exact-support arithmetic
// by enumerating the model's support BELOW L (squarefree y-smooth n <= L; the
// support is contained in 6Z because pi_2 = pi_3 = 1), using two closed forms:
//     E[1/n] = prod_{p<=y} (1 - pi_p + pi_p/p) = prod_{p<=y} alpha_p/p = delta
//     P> = 1 - Pr[n <= L],   R = L (delta - sum_{n<=L} w(n)/n).
// The first is an identity (PART 0 checks it to 1e-15 at every level); it is
// the size-bias dual of varE-spectral section 3's E_Theta[n] = 1/delta.
//
//   PART 0  the model, its two exact identities, and E[g] against the corpus's
//           exact delta*X_dec (x = 7..23, varE-theta2-step.md section 4) and
//           against its Monte-Carlo model column (x = 29, 31, 37).
//   PART 1  the three-band decomposition, nine levels.
//   PART 2  the bands against their heuristic 1/ln y coefficients.
//   PART 3  GD(2): the delay equation, the closed form, lambda_2(u_y).
//   PART 4  the Laplace transform of ln n / ln y against GD(2)'s, with the
//           measured rate (Theorem A of the note).
//   PART 5  the local bound Pr[ln n in (T-1,T]] * ln y, sup over T (Theorem C).
//
// COST. ~30 min, dominated by x = 37 (1.2e11 enumerated conductors). The x<=31
// ladder alone is ~50 s.
//   node research/history/staging/varE-limit-theorem.js
// ============================================================================
'use strict';
const T0 = Date.now(); const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';
function assert(c, m) { if (!c) throw new Error('ASSERT FAIL: ' + m); }
function primesUpTo(n) { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } } return o; }
class Kah { constructor() { this.s = 0; this.c = 0; } add(v) { const y = v - this.c, t = this.s + y; this.c = (t - this.s) - y; this.s = t; } get() { return this.s; } }

// The nine diagonal levels of variance-note.md section 7: L = x#, y the largest
// prime <= sqrt(L). `dec` is the corpus's EXACT delta*X_dec where it has one
// (varE-theta2-step.md section 4), `mc` its Monte-Carlo model column
// (varE-spectral.md section 6a / redteam-0828-varE.md section 4).
const LEVELS = [
  { x: 7,  dec: 0.178193, mc: null      },
  { x: 11, dec: 0.266839, mc: null      },
  { x: 13, dec: 0.296592, mc: null      },
  { x: 17, dec: 0.325504, mc: null      },
  { x: 19, dec: 0.346800, mc: null      },
  { x: 23, dec: 0.363842, mc: null      },
  { x: 29, dec: null,     mc: 0.37695   },
  { x: 31, dec: null,     mc: 0.38740   },
  { x: 37, dec: null,     mc: 0.39643   },
];

// ---------------------------------------------------------------------------
// GD(theta): density f_theta, delay equation t f' = (theta-1) f - theta f(t-1),
// f_theta(t) = e^{-theta gamma} t^{theta-1}/Gamma(theta) on (0,1]. At theta = 2,
// f_2(t) = e^{-2gamma} t on (0,1] and e^{-2gamma}[t(3-2 ln t) - 2] on (1,2].
// Integrated on a uniform grid by RK4 with the lagged term read off the grid.
// ---------------------------------------------------------------------------
const GAMMA = 0.57721566490153286061;
const E2G = Math.exp(-2 * GAMMA);
const H = 1 / 200000, TMAX = 8;
const NG = Math.round(TMAX / H);
const f2 = new Float64Array(NG + 1);
for (let i = 0; i <= NG; i++) { const t = i * H; if (t <= 1) f2[i] = E2G * t; }
const lag = (t) => { if (t <= 0) return 0; if (t <= 1) return E2G * t; const j = t / H; const j0 = Math.floor(j); const fr = j - j0; return f2[j0] * (1 - fr) + f2[j0 + 1] * fr; };
{ // RK4 on f' = (f - 2 f(t-1))/t for t > 1
  const der = (t, f) => (f - 2 * lag(t - 1)) / t;
  const i1 = Math.round(1 / H);
  for (let i = i1; i < NG; i++) {
    const t = i * H, f = f2[i];
    const k1 = der(t, f), k2 = der(t + H / 2, f + H * k1 / 2), k3 = der(t + H / 2, f + H * k2 / 2), k4 = der(t + H, f + H * k3);
    f2[i + 1] = f + H * (k1 + 2 * k2 + 2 * k3 + k4) / 6;
  }
}
const F2 = new Float64Array(NG + 1); // CDF by trapezoid
for (let i = 1; i <= NG; i++) F2[i] = F2[i - 1] + H * (f2[i - 1] + f2[i]) / 2;
const lam2 = (u) => { if (u <= 0) return 1; if (u >= TMAX) return 0; const j = u / H, j0 = Math.floor(j), fr = j - j0; return 1 - (F2[j0] * (1 - fr) + F2[j0 + 1] * fr); };
const f2at = (u) => { if (u <= 0) return 0; if (u >= TMAX) return 0; const j = u / H, j0 = Math.floor(j), fr = j - j0; return f2[j0] * (1 - fr) + f2[j0 + 1] * fr; };
const LAM2_CLOSED = 1 - E2G * (4.5 - 4 * Math.log(2));

// I = int_1^inf {v}(1-{v}) v^{-2} dv, the heuristic B coefficient's shape factor
let IB = 0;
for (let k = 1; k <= 200000; k++) { // exact per unit cell: int_k^{k+1} (v-k)(k+1-v)/v^2 dv
  const a = k, b = k + 1;
  const F = (v) => -v + (2 * k + 1) * Math.log(v) + (k * (k + 1)) / v;
  IB += F(b) - F(a);
}

// ---------------------------------------------------------------------------
// The ladder
// ---------------------------------------------------------------------------
const ROWS = [];
for (const lv of LEVELS) {
  const t0 = Date.now();
  let L = 1; for (const p of primesUpTo(lv.x)) L *= p;
  const rt = Math.floor(Math.sqrt(L));
  const below = primesUpTo(rt); const y = below[below.length - 1];
  const allp = primesUpTo(y);
  const alpha = (p) => (p === 2 || p === 3) ? 1 : (p === 5 ? 2 : p - 2);
  const pi = (p) => (p - alpha(p)) / (p - 1);
  let delta = 1, Einv = 1;
  for (const p of allp) { delta *= alpha(p) / p; Einv *= (1 - pi(p)) + pi(p) / p; }
  // support: n = 6m, m squarefree coprime to 6, y-smooth. weight
  // w(n) = Cy * prod_{p|n, p>=5} rho_p with rho_p = pi_p/(1-pi_p).
  let Cy = 1; const ps = [], rho = [], lg = [];
  for (const p of allp) { if (p < 5) continue; const q = pi(p); Cy *= (1 - q); ps.push(p); rho.push(q / (1 - q)); lg.push(Math.log(p)); }
  const NP = ps.length, lnL = Math.log(L), lny = Math.log(y), ln6 = Math.log(6), invL = 1 / L;
  const NB = Math.ceil(lnL) + 2; const hist = new Float64Array(NB); // Pr[ln n in (T-1,T]] bins
  const psA = Float64Array.from(ps), rhoA = Float64Array.from(rho), lgA = Float64Array.from(lg);
  const Ple = new Kah(), S = new Kah(); let B = 0, Bmax = 0, Adiv = 0, cnt = 0;
  (function rec(i, m, w, lm) {
    const n = 6 * m; cnt++;
    const invn = 1 / n, nl = n * invL;
    Ple.add(w); S.add(w * invn);
    const r = L % n;
    if (r !== 0) { const q = r * invn; B += w * q * (1 - q) * nl; } else Adiv += w;
    Bmax += w * nl;
    hist[Math.ceil(lm)] += w;
    const lim = L / (6 * m);
    for (let j = i; j < NP; j++) { const p = psA[j]; if (p > lim) break; rec(j + 1, m * p, w * rhoA[j], lm + lgA[j]); }
  })(0, 1, Cy, ln6);
  // band A: n | L, i.e. every prime factor of n is <= x. Summing over subsets
  // of {5 <= p <= x} factorises: Pr[n | L] = Cy * prod_{5<=p<=x} (1 + rho_p).
  let A = Cy; for (let j = 0; j < NP && ps[j] <= lv.x; j++) A *= (1 + rho[j]);
  const Pgt = 1 - Ple.get();
  const R = L * (Einv - S.get());
  const Eg = Pgt - R + B;
  const uy = lnL / lny;
  let sup = 0, supT = 0;
  const bL = Math.ceil(lnL);
  for (let b = 2; b < bL; b++) if (hist[b] * lny > sup) { sup = hist[b] * lny; supT = b; }
  const atL = hist[bL - 1] * lny;
  ROWS.push({ x: lv.x, L, y, cnt, delta, Einv, Cy, A, Adiv, Bmax, Pgt, R, B, Eg, uy, lny, sup, supT, atL,
              dec: lv.dec, mc: lv.mc, secs: (Date.now() - t0) / 1000, NP });
  process.stderr.write(`  x=${lv.x} done ${((Date.now() - t0) / 1000).toFixed(1)}s (${el()} total)\n`);
}

// ---------------------------------------------------------------------------
const pad = (s, n) => String(s).padStart(n);
console.log('=== PART 0: the model, its two identities, and E[g] against the corpus ===');
console.log('  pi_p = (p-alpha_p)/(p-1); alpha_2=alpha_3=1, alpha_5=2, alpha_p=p-2 (p>=7)');
console.log('  identity checked: E[1/n] = prod_p (1 - pi_p + pi_p/p) = prod_p alpha_p/p = delta');
console.log('   x |         L |       y |  conductors n<=L |   E[1/n]/delta - 1 |     E[g] exact | corpus delta*X_dec | corpus MC model');
for (const r of ROWS) {
  console.log('  ' + pad(r.x, 2) + ' | ' + pad(r.L.toExponential(3), 9) + ' | ' + pad(r.y, 7) + ' | ' + pad(r.cnt, 16)
    + ' | ' + pad((r.Einv / r.delta - 1).toExponential(2), 18) + ' | ' + pad(r.Eg.toFixed(9), 14)
    + ' | ' + pad(r.dec === null ? '(none)' : r.dec.toFixed(6), 18) + ' | ' + pad(r.mc === null ? '-' : r.mc.toFixed(5), 15));
}

console.log('\n=== PART 1: the three bands, exact ===');
console.log('  E[g] = P>  -  R  +  B     with P> = Pr[n>L], R = E[(L/n)1_{n>L}], B = E[g 1_{n<L}]');
console.log('  band A (n | L) contributes EXACTLY 0; its mass is printed two ways, closed');
console.log('  form Cy*prod_{5<=p<=x}(1+rho_p) against the enumerated r_n = 0 nodes');
console.log('   x |  Pr[n|L] closed | Pr[n|L] enumerated |          P> |           R |           B |     E[g] exact | resid');
for (const r of ROWS) {
  const s = r.Pgt - r.R + r.B;
  console.log('  ' + pad(r.x, 2) + ' | ' + pad(r.A.toFixed(9), 15) + ' | ' + pad(r.Adiv.toFixed(9), 18) + ' | ' + pad(r.Pgt.toFixed(9), 11) + ' | ' + pad(r.R.toFixed(9), 11)
    + ' | ' + pad(r.B.toFixed(9), 11) + ' | ' + pad(r.Eg.toFixed(9), 14) + ' | ' + pad((s - r.Eg).toExponential(1), 8));
}

console.log('\n=== PART 2: the two transition bands against 1/ln y ===');
console.log('  heuristic (local density f_2(u)/ln y): R*ln y -> f_2(u), B*ln y -> f_2(u)*I');
console.log('  with I = int_1^inf {v}(1-{v}) v^-2 dv = ' + IB.toFixed(9));
console.log('  Theorem C bounds B by (1/4) E[(n/L)1_{n<L}], printed as Bmax/4');
console.log('   x |    ln y |    u_y |     R*ln y |   f_2(u_y) |     B*ln y | f_2(u_y)*I |  B/(R*I) |  Bmax/4 | Bmax*ln y/4');
for (const r of ROWS) {
  const f = f2at(r.uy);
  console.log('  ' + pad(r.x, 2) + ' | ' + pad(r.lny.toFixed(4), 7) + ' | ' + pad(r.uy.toFixed(4), 6) + ' | ' + pad((r.R * r.lny).toFixed(6), 10)
    + ' | ' + pad(f.toFixed(6), 10) + ' | ' + pad((r.B * r.lny).toFixed(6), 10) + ' | ' + pad((f * IB).toFixed(6), 10)
    + ' | ' + pad((r.B / (r.R * IB)).toFixed(5), 8) + ' | ' + pad((r.Bmax / 4).toFixed(6), 8) + ' | ' + pad((r.Bmax * r.lny / 4).toFixed(6), 11));
}

console.log('\n=== PART 3: GD(2), and P> against its tail ===');
console.log('  delay equation t f\' = f - 2 f(t-1), f(t) = e^{-2gamma} t on (0,1], h = ' + H);
console.log('  total mass ' + F2[NG].toFixed(9) + ' (target 1), lambda_2(2) numeric ' + lam2(2).toFixed(9)
  + ' vs closed form 1 - e^{-2gamma}(9/2 - 4 ln 2) = ' + LAM2_CLOSED.toFixed(9));
console.log('   x |    u_y | lambda_2(u_y) |          P> | lambda_2 - P> | (lambda_2-P>)*ln y |     E[g] | lambda_2(u_y) - E[g]');
for (const r of ROWS) {
  const lam = lam2(r.uy);
  console.log('  ' + pad(r.x, 2) + ' | ' + pad(r.uy.toFixed(4), 6) + ' | ' + pad(lam.toFixed(9), 13) + ' | ' + pad(r.Pgt.toFixed(9), 11)
    + ' | ' + pad((lam - r.Pgt).toFixed(9), 13) + ' | ' + pad(((lam - r.Pgt) * r.lny).toFixed(6), 18)
    + ' | ' + pad(r.Eg.toFixed(6), 8) + ' | ' + pad((lam - r.Eg).toFixed(6), 20));
}

console.log('\n=== PART 4: Laplace transform of ln n / ln y against GD(2) ===');
console.log('  model: prod_{p<=y} (1 - pi_p + pi_p p^{-s/ln y});  GD(2): exp(2 sum_k (-s)^k/(k k!))');
const EinNeg = (s) => { let t = 1, acc = 0; for (let k = 1; k <= 200; k++) { t *= (-s) / k; acc += t / k; } return acc; };
for (const s of [0.5, 1, 2, 4]) {
  const tgt = Math.exp(2 * EinNeg(s));
  let line = '  s = ' + s.toFixed(1) + '  GD(2) = ' + tgt.toFixed(9) + ' | model:';
  const errs = [];
  for (const r of ROWS) {
    let prod = 1;
    for (const p of primesUpTo(r.y)) { const a = (p === 2 || p === 3) ? 1 : (p === 5 ? 2 : p - 2); const q = (p - a) / (p - 1); prod *= (1 - q) + q * Math.exp(-s * Math.log(p) / r.lny); }
    errs.push({ x: r.x, e: prod - tgt, lny: r.lny });
  }
  console.log(line);
  console.log('        x=' + errs.map(e => `${e.x}:${(e.e).toFixed(6)}`).join(' '));
  console.log('        err*ln y/lnln y: ' + errs.map(e => (e.e * e.lny / Math.log(e.lny)).toFixed(5)).join(' '));
}

console.log('\n=== PART 5: the local bound, sup_T ln y * Pr[ln n in (T-1,T]] ===');
console.log('  (over the enumerated band ln n <= ln L; Theorem C bounds this by an absolute constant)');
console.log('   x |    ln y | sup_T ln y*Pr | at T | ln y*Pr, top full bin');
for (const r of ROWS) {
  console.log('  ' + pad(r.x, 2) + ' | ' + pad(r.lny.toFixed(4), 7) + ' | ' + pad(r.sup.toFixed(6), 13) + ' | ' + pad(r.supT, 4)
    + ' | ' + pad(r.atL.toFixed(6), 17));
}

console.log('\n  runtimes: ' + ROWS.map(r => `x=${r.x}:${r.secs.toFixed(1)}s`).join(' '));
console.log('  done ' + el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --node-flag --stack-size=4000 research/history/staging/varE-limit-theorem.js
//   invocation:  node --stack-size=4000 research/history/staging/varE-limit-theorem.js
//   code-sha256: d304fa596d9a1e1bece87b6c16fd02c0cad029be422a82a1c0d4f27ddc0b2156
//   out-sha256:  bf65a2605502b9b255d577a2945e1d1e504be772d28e054515db165ef266ce5f
//   body-lines:  88
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     4929.5 s
// ============================================================================
// === PART 0: the model, its two identities, and E[g] against the corpus ===
//   pi_p = (p-alpha_p)/(p-1); alpha_2=alpha_3=1, alpha_5=2, alpha_p=p-2 (p>=7)
//   identity checked: E[1/n] = prod_p (1 - pi_p + pi_p/p) = prod_p alpha_p/p = delta
//    x |         L |       y |  conductors n<=L |   E[1/n]/delta - 1 |     E[g] exact | corpus delta*X_dec | corpus MC model
//    7 |  2.100e+2 |      13 |                6 |           2.22e-16 |    0.178192918 |           0.178193 |               -
//   11 |  2.310e+3 |      47 |               49 |           2.22e-16 |    0.266838875 |           0.266839 |               -
//   13 |  3.003e+4 |     173 |              548 |           4.44e-16 |    0.296591623 |           0.296592 |               -
//   17 |  5.105e+5 |     709 |             8920 |           8.88e-16 |    0.325503912 |           0.325504 |               -
//   19 |  9.700e+6 |    3109 |           165650 |          -7.77e-16 |    0.346799547 |           0.346800 |               -
//   23 |  2.231e+8 |   14929 |          3757347 |            0.00e+0 |    0.363842423 |           0.363842 |               -
//   29 |  6.470e+9 |   80429 |        107819335 |          -2.44e-15 |    0.377144569 |             (none) |         0.37695
//   31 | 2.006e+11 |  447829 |       3316279246 |           6.66e-16 |    0.387407034 |             (none) |         0.38740
//   37 | 7.421e+12 | 2724079 |     121901832970 |          -1.25e-14 |    0.395653458 |             (none) |         0.39643
//
// === PART 1: the three bands, exact ===
//   E[g] = P>  -  R  +  B     with P> = Pr[n>L], R = E[(L/n)1_{n>L}], B = E[g 1_{n<L}]
//   band A (n | L) contributes EXACTLY 0; its mass is printed two ways, closed
//   form Cy*prod_{5<=p<=x}(1+rho_p) against the enumerated r_n = 0 nodes
//    x |  Pr[n|L] closed | Pr[n|L] enumerated |          P> |           R |           B |     E[g] exact | resid
//    7 |     0.666666667 |        0.666666667 | 0.283333333 | 0.108197358 | 0.003056943 |    0.178192918 |   0.0e+0
//   11 |     0.417387328 |        0.417387328 | 0.335525028 | 0.081053290 | 0.012367138 |    0.266838875 |   0.0e+0
//   13 |     0.296671934 |        0.296671934 | 0.350725586 | 0.066478692 | 0.012344728 |    0.296591623 |   0.0e+0
//   17 |     0.212414912 |        0.212414912 | 0.368116926 | 0.052466671 | 0.009853657 |    0.325503912 |   0.0e+0
//   19 |     0.160547361 |        0.160547361 | 0.382620145 | 0.043864663 | 0.008044066 |    0.346799547 |   0.0e+0
//   23 |     0.123952461 |        0.123952461 | 0.394436926 | 0.037234816 | 0.006640313 |    0.363842423 |   0.0e+0
//   29 |     0.096758571 |        0.096758571 | 0.403580143 | 0.032052128 | 0.005616554 |    0.377144569 |   0.0e+0
//   31 |     0.078138150 |        0.078138150 | 0.410607924 | 0.028055939 | 0.004855050 |    0.387407034 |   0.0e+0
//   37 |     0.063810103 |        0.063810103 | 0.416225089 | 0.024823834 | 0.004252203 |    0.395653458 |   0.0e+0
//
// === PART 2: the two transition bands against 1/ln y ===
//   heuristic (local density f_2(u)/ln y): R*ln y -> f_2(u), B*ln y -> f_2(u)*I
//   with I = int_1^inf {v}(1-{v}) v^-2 dv = 0.162122045
//   Theorem C bounds B by (1/4) E[(n/L)1_{n<L}], printed as Bmax/4
//    x |    ln y |    u_y |     R*ln y |   f_2(u_y) |     B*ln y | f_2(u_y)*I |  B/(R*I) |  Bmax/4 | Bmax*ln y/4
//    7 |  2.5649 | 2.0847 |   0.277521 |   0.375559 |   0.007841 |   0.060886 |  0.17427 | 0.061389 |    0.157459
//   11 |  3.8501 | 2.0116 |   0.312067 |   0.385490 |   0.047615 |   0.062496 |  0.94114 | 0.028294 |    0.108935
//   13 |  5.1533 | 2.0007 |   0.342584 |   0.386845 |   0.063616 |   0.062716 |  1.14540 | 0.020460 |    0.105435
//   17 |  6.5639 | 2.0024 |   0.344384 |   0.386638 |   0.064678 |   0.062682 |  1.15844 | 0.015306 |    0.100464
//   19 |  8.0421 | 2.0004 |   0.352762 |   0.386872 |   0.064691 |   0.062721 |  1.13115 | 0.012388 |    0.099629
//   23 |  9.6111 | 2.0001 |   0.357866 |   0.386913 |   0.063820 |   0.062727 |  1.10001 | 0.010224 |    0.098267
//   29 | 11.2951 | 2.0000 |   0.362033 |   0.386924 |   0.063440 |   0.062729 |  1.08086 | 0.008651 |    0.097716
//   31 | 13.0122 | 2.0000 |   0.365069 |   0.386925 |   0.063175 |   0.062729 |  1.06740 | 0.007479 |    0.097314
//   37 | 14.8176 | 2.0000 |   0.367831 |   0.386925 |   0.063008 |   0.062729 |  1.05658 | 0.006551 |    0.097069
//
// === PART 3: GD(2), and P> against its tail ===
//   delay equation t f' = f - 2 f(t-1), f(t) = e^{-2gamma} t on (0,1], h = 0.000005
//   total mass 0.999990778 (target 1), lambda_2(2) numeric 0.455456480 vs closed form 1 - e^{-2gamma}(9/2 - 4 ln 2) = 0.455456480
//    x |    u_y | lambda_2(u_y) |          P> | lambda_2 - P> | (lambda_2-P>)*ln y |     E[g] | lambda_2(u_y) - E[g]
//    7 | 2.0847 |   0.423157222 | 0.283333333 |   0.139823889 |           0.358641 | 0.178193 |             0.244964
//   11 | 2.0116 |   0.450971828 | 0.335525028 |   0.115446800 |           0.444487 | 0.266839 |             0.184133
//   13 | 2.0007 |   0.455203553 | 0.350725586 |   0.104477967 |           0.538405 | 0.296592 |             0.158612
//   17 | 2.0024 |   0.454545812 | 0.368116926 |   0.086428886 |           0.567307 | 0.325504 |             0.129042
//   19 | 2.0004 |   0.455288498 | 0.382620145 |   0.072668353 |           0.584403 | 0.346800 |             0.108489
//   23 | 2.0001 |   0.455417153 | 0.394436926 |   0.060980227 |           0.586085 | 0.363842 |             0.091575
//   29 | 2.0000 |   0.455451877 | 0.403580143 |   0.051871735 |           0.585898 | 0.377145 |             0.078307
//   31 | 2.0000 |   0.455455045 | 0.410607924 |   0.044847122 |           0.583558 | 0.387407 |             0.068048
//   37 | 2.0000 |   0.455456016 | 0.416225089 |   0.039230928 |           0.581310 | 0.395653 |             0.059803
//
// === PART 4: Laplace transform of ln n / ln y against GD(2) ===
//   model: prod_{p<=y} (1 - pi_p + pi_p p^{-s/ln y});  GD(2): exp(2 sum_k (-s)^k/(k k!))
//   s = 0.5  GD(2) = 0.411607869 | model:
//         x=7:0.023784 11:0.038595 13:0.040593 17:0.036006 19:0.031645 23:0.027453 29:0.023927 31:0.021075 37:0.018712
//         err*ln y/lnln y: 0.06477 0.11022 0.12758 0.12561 0.12208 0.11660 0.11148 0.10687 0.10285
//   s = 1.0  GD(2) = 0.203274256 | model:
//         x=7:0.005906 11:0.026164 13:0.031720 17:0.029872 19:0.027202 23:0.024181 29:0.021460 31:0.019158 37:0.017193
//         err*ln y/lnln y: 0.01608 0.07472 0.09969 0.10421 0.10494 0.10270 0.09998 0.09716 0.09450
//   s = 2.0  GD(2) = 0.071466483 | model:
//         x=7:-0.011125 11:0.005462 13:0.012412 17:0.013967 19:0.013979 23:0.013204 29:0.012237 31:0.011272 37:0.010363
//         err*ln y/lnln y: -0.03029 0.01560 0.03901 0.04872 0.05393 0.05608 0.05701 0.05716 0.05696
//   s = 4.0  GD(2) = 0.019553935 | model:
//         x=7:-0.010814 11:-0.004238 13:-0.000047 17:0.002158 19:0.003332 23:0.003867 29:0.004074 31:0.004087 37:0.004001
//         err*ln y/lnln y: -0.02945 -0.01210 -0.00015 0.00753 0.01285 0.01643 0.01898 0.02073 0.02199
//
// === PART 5: the local bound, sup_T ln y * Pr[ln n in (T-1,T]] ===
//   (over the enumerated band ln n <= ln L; Theorem C bounds this by an absolute constant)
//    x |    ln y | sup_T ln y*Pr | at T | ln y*Pr, top full bin
//    7 |  2.5649 |      0.997480 |    4 |          0.128247
//   11 |  3.8501 |      0.749935 |    4 |          0.430153
//   13 |  5.1533 |      0.594548 |    4 |          0.388697
//   17 |  6.5639 |      0.474950 |   10 |          0.395823
//   19 |  8.0421 |      0.439211 |   11 |          0.394282
//   23 |  9.6111 |      0.439692 |   13 |          0.390114
//   29 | 11.2951 |      0.427448 |   17 |          0.393066
//   31 | 13.0122 |      0.420507 |   19 |          0.384880
//   37 | 14.8176 |      0.417147 |   23 |          0.390133
//
//   runtimes: x=7:0.0s x=11:0.0s x=13:0.0s x=17:0.0s x=19:0.0s x=23:0.1s x=29:4.0s x=31:132.9s x=37:4792.0s
//   done 4929.3s
// ============================================================================
// READINGS
//
// 1. THE MODEL'S TWO IDENTITIES HOLD AT EVERY LEVEL. E[1/n] = prod_p alpha_p/p
//    = delta to between 2.22e-16 and 1.25e-14 (PART 0), and Pr[n|L] from the
//    closed form Cy prod_{5<=p<=x}(1 + rho_p) equals the enumerated r_n = 0
//    mass to every printed digit at all nine levels (PART 1). The first is
//    what lets P> and R be computed without enumerating one conductor above L.
// 2. THE BAND DECOMPOSITION IS EXACT. P> - R + B recomposes E[g] with residual
//    0.0e+0 at all nine levels (PART 1), and E[g] reproduces the corpus's
//    exact delta*X_dec at x = 7..23 to every printed digit: 0.178193,
//    0.266839, 0.296592, 0.325504, 0.346800, 0.363842.
// 3. THREE NEW EXACT MODEL VALUES, WHERE THE CORPUS HAD MONTE CARLO.
//    0.377144569, 0.387407034 and 0.395653458 at x = 29, 31, 37 against the
//    quoted 0.37695, 0.38740, 0.39643. Three witnesses now exist at each:
//    research/varE-exact-ladder-01.js SEC 2's independent descent reads
//    0.377144535, 0.387403848, 0.395666501 and its SEC 1 sieve 0.377144494 and
//    0.387404967, and redteam-0828-varE.md sec.4's Monte Carlo reads
//    0.395567 +- 0.000106 at x = 37. The witness spread is 7.5e-8, 3.2e-6 and
//    1.3e-5, so the honest quotes are 0.3771445, 0.387405 and 0.39566, and the
//    quoted 0.39643 is 0.0008 high, which is larger than any residual that
//    column is used to discuss.
// 4. THE n <= L BAND IS O(1/ln y), WITH A COEFFICIENT THAT SETTLES. B runs
//    0.003057, 0.012367, 0.012345, 0.009854, 0.008044, 0.006640, 0.005617,
//    0.004855, 0.004252 and B*ln y runs 0.007841, 0.047615, 0.063616,
//    0.064678, 0.064691, 0.063820, 0.063440, 0.063175, 0.063008 (PART 2):
//    bounded on nine levels, and settling on 0.0630 from above over the top
//    five. This is the band varE-spectral.md sec.4 states as O(1/ln W) and
//    does not evaluate.
// 5. THE TWO TRANSITION BANDS ARE THE SAME LOCAL DENSITY. R*ln y climbs
//    0.277521 -> 0.367831 toward f_2(2) = 0.386925, and B/(R*I) with
//    I = 0.162122045 falls 1.14540 -> 1.05658 toward 1 (PART 2). That is what
//    a local density f_2(u)/ln y at the threshold predicts for both bands.
//    Neither limit is reached on nine levels, and neither is proven here.
// 6. THE LOCAL BOUND IS BOUNDED AND FALLING. sup_T ln y*Pr[ln n in (T-1,T]]
//    reads 0.997480 at x = 7 falling to 0.417147 at x = 37 (PART 5), with the
//    top full bin at 0.390133 against f_2(2) = 0.386925. Lemma C2 of the note
//    bounds this quantity by an absolute constant; nine levels are consistent
//    with a constant near 0.4 and do not establish one.
// 7. THE TRANSFORM CONVERGES, AND THE LEVELS DO NOT PIN THE RATE'S CONSTANT.
//    err*ln y/lnln y is bounded at all four s on all nine levels (PART 4). At
//    s = 0.5 and s = 1 it rises then falls, 0.12758 -> 0.10285 and
//    0.10494 -> 0.09450; at s = 2 and s = 4 it is still rising at x = 37,
//    0.05696 and 0.02199. Bounded is the reading. Settled is not.
// 8. THE FLOAT FLOOR, AND THE ONE PLACE IT BITES. R = L(E[1/n] - sum_{n<=L}
//    w(n)/n) subtracts two quantities of size L*delta, which is 9.38e9 at
//    x = 37, and PART 0's E[1/n]/delta - 1 column measures the products'
//    mutual inconsistency at -1.25e-14 there. That bounds R's absolute error
//    by about 1e-4 at x = 37; the witness spread of reading 3 puts the actual
//    disagreement at 1.3e-5, and research/varE-exact-ladder-01.js carries the
//    better value there because its delta*L is BigInt-exact. B, P> and
//    Pr[n|L] are direct sums with no cancellation and carry only their own
//    1e-14 relative, and they agree with the sibling to every printed digit.
// 9. THE MODEL'S OWN APPROACH TO ITS LIMIT IS 0.886/ln y. Adding PART 3's
//    (lambda_2 - P>)*ln y to PART 2's R*ln y and subtracting B*ln y gives
//    (lambda_2(2) - E[g])*ln y = 0.817373, 0.847013, 0.872474, 0.880131,
//    0.884491, 0.885452, 0.886133 at x = 13..37, settling on 0.886. At
//    x = 41, where ln y = 16.674, that predicts 0.40231 against
//    redteam-0828-varE.md sec.4's Monte-Carlo model value 0.402364 +-
//    0.000075, and it explains varE-spectral.md sec.5's "0.053 short at
//    x = 41" as 0.886/16.674 = 0.0531.
// 10. WHAT IS NOT SHOWN. No bound on |Pr[D_y > u_y] - lambda_2(u)| is derived
//    anywhere here; PART 3's column measures it and the note's sec.5 records
//    that the Esseen conversion is not done. Nothing here computes the TRUE
//    Var/E at x = 29, 31, 37, so nothing here prices the decoupling step at
//    those levels; research/varE-exact-ladder-01.js SEC 1 is the pass that
//    does, and it reads delta*X = 0.377418 and 0.387588 there against these
//    model values, so the decoupling error is +0.000273 and +0.000183.
//
// FIGURE PROVENANCE. Readings quote the block above verbatim except:
//   reading 3's 0.0008 = 0.39643 - 0.39566, and its comparison values
//     0.377144535, 0.387403848, 0.395666501, 0.377144494, 0.387404967, cited
//     from research/varE-exact-ladder-01.js SEC 1 and SEC 2, plus
//     0.395567 +- 0.000106 and reading 9's 0.402364 +- 0.000075 cited from
//     redteam-0828-varE.md sec.4; none of these is a figure of this run, and
//     the three spreads 7.5e-8, 3.2e-6, 1.3e-5 are differences of them;
//   reading 10's 0.377418, 0.387588, +0.000273, +0.000183, from that
//     sibling's SEC 1;
//   reading 8's L*delta = 9.38e9 is variance-note.md sec.7's E[N_W] at x = 37,
//     not a figure of this run;
//   reading 9's seven numbers, each the sum of three printed columns of its
//     own row, and its ln y = 16.674 and 0.40231, which use L = x# at x = 41
//     from the diagonal's own definition and are not figures of this run.
