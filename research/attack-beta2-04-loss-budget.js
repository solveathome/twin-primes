// ============================================================================
// CORRECTION 2026-08-19 (monotonicity sweep, history/staging/monotonicity-sweep.md):
// Section 6's H1 bisection (lines with `while (hi - lo > 1)` over sumMax) bisects
// on a predicate that is NOT upward-closed in H (15 to 146 revivals per level
// measured above the first success). Its "min H" column is wrong at 3 of 5
// levels: reported 36 / 72 / 144 / 174 / 354, true first-crossings
// 30 / 72 / 132 / 174 / 210 (consecutive scan, reproduced independently and
// agreeing with attack-beta2-03-exact-strata.js's j = 0 row, which computes the
// same object correctly and says why). READINGS 6's "factor 1.2 to 2.4, penalty
// about 0.25" is therefore "factor 1.00 to 2.00, penalty 0 to 0.27 and falling
// with x"; at x = 7 the certificate is sharp (H1 = G2 = 30). Nothing live
// consumes the wrong column: the beta floor 3.195/3.3152 comes from section7's
// level-D LP, which does not touch section 6. The tail below is the custody
// record of the defective run and is retained unedited.
// ============================================================================
// ============================================================================
// ATTACK BETA2-04 — THE LOSS BUDGET: instrumenting the DHR dimension-2
// pipeline stage by stage, at z where the truth is computable
// (2026-08-18; report in research/history/staging/attack-beta2-04-loss-budget.md)
// ============================================================================
// QUESTION. paper/beta2-note.md certifies G2(x#) << x^{4.26645+eps}. The truth
// sits near x^{1+o(1)}: the bound is loose by about x^{3.27} and nobody has
// measured WHERE that is lost. research/sift-limit-attack.md names five
// discard points DP1-DP5 but prices none of them. This script prices them.
//
// The spine is one identity. The certified exponent is
//        E  =  beta_kappa / theta,
// beta the sifting limit of the positivity method (DP3) and theta the level
// exponent, level = H^theta (DP4). Everything else is a constant or a log.
// DHR runs at beta = 4.26645, theta = 1, so E = 4.26645. Truth is E = 1.
//
// EIGHT INSTRUMENTS, each exact over a full period or exact by enumeration:
//   1. the truth ladder, exhaustive to x = 23 at both dimensions, cross-checked
//      against all 22 known two-class terms (OEIS A144311 convention);
//   2. DP2, the density envelope: V(z), the exact Omega(kappa,L) constant, the
//      effective dimension, and what V costs in powers of z;
//   3. DP3 asymptotic: the DHR delay-differential system solved numerically,
//      validated at kappa = 1 against the closed form, then read at kappa = 2;
//   4. the certified threshold with EXACT remainder sums over the divisors of
//      the primorial, all 22 levels, against the true G2;
//   5. DP4, remainders: how tight |r_d| <= omega(d) is, and how much signed
//      cancellation sits above theta = 1;
//   6. DP3 finite: Buchstab strata priced at their own worst case over a full
//      period, plus Brun depth-truncation levels for scale;
//   7. THE ONE THAT DECIDES IT: the exact level-D linear program, which gives
//      the best main term ANY one-point minorant can carry, calibrated against
//      the proven beta_1 = 2 at dimension one;
//   8. the budget and the elasticities.
//
//   node research/attack-beta2-04-loss-budget.js     (~2 min, ~400 MB peak)
// ============================================================================
'use strict';

const ALLP = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];

// The 22 exact terms. x <= 43 are this repository's (research/exact-g2-ladder.js);
// x = 47..79 are OEIS A144311 a(15)-a(22) read through the a(n) = G2 - 1
// convention established in research/covering-dive.md.
const G2TRUE = new Map([
  [2, 2], [3, 6], [5, 12], [7, 30], [11, 42], [13, 66], [17, 108], [19, 150],
  [23, 204], [29, 258], [31, 348], [37, 528], [41, 546], [43, 618], [47, 708],
  [53, 870], [59, 966], [61, 1080], [67, 1284], [71, 1398], [73, 1530], [79, 1710],
]);

const BETA2 = 4.26645028414864191641;   // Booker-Browning, rigorous truncation
const ALPHA2 = 5.35772744559446184227;  // same source
const EULER = 0.5772156649015328606;
const C2 = 0.6601618158468695739278121; // twin-prime constant

const primesTo = x => ALLP.filter(p => p <= x);
const omega = (p, kappa) => (kappa === 2 && p > 2 ? 2 : 1);
const fmt = (v, d = 4) => (Number.isFinite(v) ? v.toFixed(d) : String(v));
const rule = s => console.log('\n' + '='.repeat(76) + '\n' + s + '\n' + '='.repeat(76));

// ---------------------------------------------------------------------------
// === 1. THE TRUTH LADDER ====================================================
// Exhaustive full-period max gap. kappa = 2 is the two-class object G2 (r and
// r+2 both coprime to x#); kappa = 1 is Jacobsthal g(x#), the one-class
// control whose sifting limit beta_1 = 2 is PROVEN optimal (Selberg), which is
// what makes it the calibration for everything below.
// ---------------------------------------------------------------------------
function maxGapExhaustive(x, kappa) {
  const ps = primesTo(x);
  let P = 1;
  for (const p of ps) P *= p;
  const killed = new Uint8Array(P);
  for (const p of ps) {
    for (let r = 0; r < P; r += p) killed[r] = 1;
    if (kappa === 2 && p > 2) {
      for (let r = (p - 2) % p; r < P; r += p) killed[r] = 1;
    }
  }
  let first = -1, last = -1, maxg = 0, n = 0;
  for (let r = 0; r < P; r++) {
    if (killed[r]) continue;
    n++;
    if (first < 0) first = r; else { const g = r - last; if (g > maxg) maxg = g; }
    last = r;
  }
  const wrap = P - last + first;
  if (wrap > maxg) maxg = wrap;
  return { P, n, maxg };
}

function section1() {
  rule('1. THE TRUTH LADDER — exhaustive, both dimensions, and the 22-term check');
  console.log('x    kappa  period        survivors    maxgap   OEIS/repo  ln(gap)/ln(x)');
  const truth1 = new Map();
  for (const x of [2, 3, 5, 7, 11, 13, 17, 19, 23]) {
    for (const kappa of [1, 2]) {
      const t0 = Date.now();
      const { P, n, maxg } = maxGapExhaustive(x, kappa);
      const known = kappa === 2 ? G2TRUE.get(x) : '-';
      const mark = kappa === 2 ? (maxg === known ? 'MATCH' : 'MISMATCH ' + known) : '(A048670)';
      if (kappa === 1) truth1.set(x, maxg);
      console.log(`${String(x).padEnd(5)}${kappa}      ${String(P).padEnd(14)}${String(n).padEnd(13)}${String(maxg).padEnd(9)}${mark.padEnd(11)}` +
        `${fmt(Math.log(maxg) / Math.log(x), 4)}   [${((Date.now() - t0) / 1000).toFixed(1)}s]`);
    }
  }

  console.log('\n1b. The full 22-term ladder and its apparent exponents (x <= 23 verified above).');
  console.log('x     G2      G2/x      G2/(x ln^2 x)  ln(G2)/ln(x)   local slope');
  let prevX = null, prevG = null;
  for (const x of ALLP) {
    const g = G2TRUE.get(x);
    const slope = prevX ? Math.log(g / prevG) / Math.log(x / prevX) : NaN;
    console.log(`${String(x).padEnd(6)}${String(g).padEnd(8)}${fmt(g / x, 3).padEnd(10)}${fmt(g / (x * Math.log(x) ** 2), 4).padEnd(15)}` +
      `${fmt(Math.log(g) / Math.log(x), 4).padEnd(15)}${Number.isFinite(slope) ? fmt(slope, 3) : '-'}`);
    prevX = x; prevG = g;
  }
  // regressions
  const reg = (lo, hi) => {
    const xs = ALLP.filter(x => x >= lo && x <= hi);
    let sx = 0, sy = 0, sxx = 0, sxy = 0;
    for (const x of xs) { const a = Math.log(x), b = Math.log(G2TRUE.get(x)); sx += a; sy += b; sxx += a * a; sxy += a * b; }
    const nn = xs.length;
    return (nn * sxy - sx * sy) / (nn * sxx - sx * sx);
  };
  console.log(`\n  log-log regression slope, x in [11,43]  (14-term era):  ${fmt(reg(11, 43), 4)}`);
  console.log(`  log-log regression slope, x in [11,79]  (all 18):       ${fmt(reg(11, 79), 4)}`);
  console.log(`  log-log regression slope, x in [47,79]  (the new 8):    ${fmt(reg(47, 79), 4)}`);
  console.log(`  log-log regression slope, x in [2,79]   (everything):   ${fmt(reg(2, 79), 4)}`);
  console.log('  kappa=1 control, ln(g)/ln(x) at x = 19, 23:            ' +
    `${fmt(Math.log(truth1.get(19)) / Math.log(19), 4)}, ${fmt(Math.log(truth1.get(23)) / Math.log(23), 4)}`);
  return truth1;
}

// ---------------------------------------------------------------------------
// === 2. DP2 — THE DENSITY ENVELOPE ==========================================
// Omega(kappa,L):  prod_{z1<=p<z2} (1 - omega(p)/p)^{-1} < (ln z2/ln z1)^kappa
//                                                          (1 + L/ln z1).
// Three exact readings: the constant L our omega actually needs; the effective
// dimension over every dyadic range; and what V(z) costs in POWERS of z, which
// is the only currency the exponent question is denominated in.
// ---------------------------------------------------------------------------
function sievePrimes(n) {
  const c = new Uint8Array(n + 1);
  const out = [];
  for (let i = 2; i <= n; i++) {
    if (c[i]) continue;
    out.push(i);
    for (let j = i * i; j <= n; j += i) c[j] = 1;
  }
  return out;
}

function section2() {
  rule('2. DP2 — THE DENSITY ENVELOPE, EXACTLY');
  const ZMAX = 4000000;
  const pr = sievePrimes(ZMAX);
  // V(w) = prod_{p < w} (1 - omega(p)/p); logV as a step function on prime breaks
  const build = kappa => {
    const lv = new Float64Array(pr.length + 1);
    for (let i = 0; i < pr.length; i++) lv[i + 1] = lv[i] + Math.log(1 - omega(pr[i], kappa) / pr[i]);
    return lv;
  };
  const lv2 = build(2), lv1 = build(1);
  // logV at a real cut w: number of primes < w
  const idxBelow = w => { let lo = 0, hi = pr.length; while (lo < hi) { const m = (lo + hi) >> 1; if (pr[m] < w) lo = m + 1; else hi = m; } return lo; };

  console.log('2a. V(z) log^2 z against its limit 2 C2 e^{-2gamma}, and V in powers of z.');
  const lim = 2 * C2 * Math.exp(-2 * EULER);
  console.log(`    limit 2*C2*e^{-2gamma} = ${lim.toFixed(6)}   (the corpus digit is 0.41621)`);
  console.log('z          V(z)          V(z)ln^2 z   ratio to limit   ln(1/V)/ln z  (= powers of z DP2 costs)');
  for (const z of [11, 23, 47, 80, 1e3, 1e5, 1e7, 1e12, 1e30, 1e100]) {
    let lV;
    if (z <= ZMAX) lV = lv2[idxBelow(z)];
    else { // Mertens continuation: V(z) = lim / ln^2 z  (asymptotic, flagged in the printout)
      lV = Math.log(lim) - 2 * Math.log(Math.log(z));
    }
    const V = Math.exp(lV), L = Math.log(z);
    console.log(`${z.toExponential(1).padEnd(11)}${V.toExponential(4).padEnd(14)}${fmt(V * L * L, 5).padEnd(13)}${fmt(V * L * L / lim, 5).padEnd(17)}${fmt(-lV / L, 4)}` +
      (z > ZMAX ? '   [Mertens continuation]' : ''));
  }

  console.log('\n2b. The exact Omega(kappa,L) constant our omega needs. The sup over all pairs');
  console.log('    2 <= z1 < z2 is attained at breakpoints (z1 = p exactly, z2 = q + 0), so a');
  console.log(`    suffix-max over the ${pr.length} primes below ${ZMAX} settles it exactly in that range.`);
  for (const [kappa, lv] of [[1, lv1], [2, lv2]]) {
    // maximise  lnV(z1) - lnV(z2) + k lnln z1 - k lnln z2  over z2 > z1
    const M = new Float64Array(pr.length);
    for (let j = 0; j < pr.length; j++) M[j] = -lv[j + 1] - kappa * Math.log(Math.log(pr[j]));
    const suf = new Float64Array(pr.length);
    const argj = new Int32Array(pr.length);
    suf[pr.length - 1] = M[pr.length - 1]; argj[pr.length - 1] = pr.length - 1;
    for (let j = pr.length - 2; j >= 0; j--) {
      if (M[j] >= suf[j + 1]) { suf[j] = M[j]; argj[j] = j; } else { suf[j] = suf[j + 1]; argj[j] = argj[j + 1]; }
    }
    let best = -Infinity, arg = null;
    for (let i = 0; i < pr.length - 1; i++) {
      const z1 = pr[i], l1 = Math.log(z1);
      const val = (Math.exp(lv[i] + kappa * Math.log(l1) + suf[i]) - 1) * l1;
      if (val > best) { best = val; arg = [z1, pr[argj[i]]]; }
    }
    console.log(`    kappa = ${kappa}:  L* = ${fmt(best, 5)}   attained at (z1, z2) = (${arg[0]}, ${arg[1]}+)`);
  }

  console.log('\n2c. Effective dimension kappa_eff(z1,z2) = ln(V(z1)/V(z2)) / ln(ln z2/ln z1).');
  console.log('    Convergence to kappa is O(1/ln z1), so narrow high ranges wobble; the');
  console.log('    anchored column [2, z] is the stable one.');
  console.log('range                     kappa_eff (our omega)   kappa_eff (one-class control)');
  for (const [a, b] of [[2, 11], [2, 23], [2, 79], [2, 1e3], [2, 1e5], [2, 4e6], [11, 79], [79, 1e3], [1e3, 4e6]]) {
    const ke = lv => (lv[idxBelow(a)] - lv[idxBelow(b)]) / Math.log(Math.log(b) / Math.log(a));
    console.log(`[${String(a).padEnd(7)}, ${String(b).padEnd(11)}]     ${fmt(ke(lv2), 4).padEnd(24)}${fmt(ke(lv1), 4)}`);
  }
  console.log('\n2d. VERDICT ON DP2. The envelope holds with a small absolute L, the effective');
  console.log('    dimension is 2 to within the O(1/ln z) that Mertens forces, and V(z) costs');
  console.log('    2 lnln z / ln z powers of z, which tends to 0. DP2 costs ZERO exponent.');
  console.log('    The finite-z caveat is the fourth column of 2a: at every z in the exactly');
  console.log('    known range V(z) is worth roughly ONE FULL POWER of z, not a log factor.');
  return { lv2, lv1, idxBelow, pr };
}

// ---------------------------------------------------------------------------
// === 3. DP3 ASYMPTOTIC — THE DHR DELAY-DIFFERENTIAL SYSTEM ==================
// sigma_kappa (Ankeny-Onishi):  u^{-k} sigma(u) = (2e^g)^{-k}/Gamma(1+k), u<=2
//                               d/du (u^{-k}sigma(u)) = -k u^{-k-1}sigma(u-2)
// F = 1/sigma on (0,alpha],  f = 0 on (0,beta],
//   (u^k F)' = k u^{k-1} f(u-1),  u > alpha;  (u^k f)' = k u^{k-1} F(u-1), u > beta.
// Statement source: Booker-Browning Thm 3.1, quoted in research/dhr-verification.md
// section 1.1. Validated below at kappa = 1 against F = 2e^g/u on [1,3] and
// f = 2e^g ln(u-1)/u on [2,4], which the same system must reproduce exactly.
// ---------------------------------------------------------------------------
function solveDDE(kappa, alpha, beta, UMAX, h) {
  const N = Math.round(UMAX / h) + 1;
  const i1 = Math.round(1 / h), i2 = Math.round(2 / h);
  const G = new Float64Array(N);   // g(u) = u^{-k} sigma(u)
  const F = new Float64Array(N);
  const f = new Float64Array(N);
  const gam = kappa === 1 ? 1 : 2;   // Gamma(1+kappa) for kappa in {1,2}
  const A = Math.pow(2 * Math.exp(EULER), -kappa) / gam;
  for (let i = 0; i <= i2 && i < N; i++) G[i] = A;
  const dg = i => { const u = i * h; return u <= 2 ? 0 : -kappa * Math.pow(u, -kappa - 1) * Math.pow(u - 2, kappa) * G[i - i2]; };
  for (let i = i2 + 1; i < N; i++) G[i] = G[i - 1] + 0.5 * h * (dg(i - 1) + dg(i));
  const sigma = i => Math.pow(i * h, kappa) * G[i];

  const ia = Math.floor(alpha / h), ib = Math.floor(beta / h);
  for (let i = 1; i <= ia && i < N; i++) F[i] = 1 / sigma(i);
  F[0] = Infinity;
  for (let i = 0; i <= ib && i < N; i++) f[i] = 0;

  // forward march. At index i both delayed values (i - i1) are already set.
  let PF = Math.pow(ia * h, kappa) * F[ia];
  let Pf = 0;
  const start = Math.min(ia, ib) + 1;
  for (let i = start; i < N; i++) {
    const u = i * h, um = (i - 1) * h;
    if (i > ib) {
      Pf += 0.5 * h * (kappa * Math.pow(um, kappa - 1) * F[i - 1 - i1] + kappa * Math.pow(u, kappa - 1) * F[i - i1]);
      f[i] = Pf / Math.pow(u, kappa);
    }
    if (i > ia) {
      PF += 0.5 * h * (kappa * Math.pow(um, kappa - 1) * f[i - 1 - i1] + kappa * Math.pow(u, kappa - 1) * f[i - i1]);
      F[i] = PF / Math.pow(u, kappa);
    }
  }
  const at = (arr, u) => { const t = u / h, i = Math.floor(t); if (i < 0 || i + 1 >= N) return NaN; const w = t - i; return arr[i] * (1 - w) + arr[i + 1] * w; };
  return { F: u => at(F, u), f: u => at(f, u), sigma: u => at(G, u) * Math.pow(u, kappa), N, h };
}

function section3(quiet) {
  const say = quiet ? () => {} : (...a) => console.log(...a);
  if (!quiet) rule('3. DP3 ASYMPTOTIC — the DHR system solved, validated at kappa = 1, read at kappa = 2');
  const h = 1e-5, UMAX = 22;
  const s1 = solveDDE(1, 2, 2, UMAX, h);
  say('3a. VALIDATION at kappa = 1 (alpha = beta = 2). Closed forms: F = 2e^g/u on');
  say('    [1,3]; f = 2e^g ln(u-1)/u on [2,4]. Both must fall out of the same march.');
  const twoEg = 2 * Math.exp(EULER);
  say('u       F computed     F closed       rel.err        f computed     f closed       rel.err');
  for (const u of [1.5, 2.0, 2.5, 3.0, 3.5, 4.0]) {
    const Fc = s1.F(u), Ft = u <= 3 ? twoEg / u : NaN;
    const fc = s1.f(u), ft = u >= 2 && u <= 4 ? twoEg * Math.log(u - 1) / u : NaN;
    say(`${fmt(u, 2).padEnd(8)}${fmt(Fc, 8).padEnd(15)}${(Number.isFinite(Ft) ? fmt(Ft, 8) : '-').padEnd(15)}` +
      `${(Number.isFinite(Ft) ? (Math.abs(Fc / Ft - 1)).toExponential(2) : '-').padEnd(15)}` +
      `${fmt(fc, 8).padEnd(15)}${(Number.isFinite(ft) ? fmt(ft, 8) : '-').padEnd(15)}` +
      `${(Number.isFinite(ft) && ft > 0 ? (Math.abs(fc / ft - 1)).toExponential(2) : '-')}`);
  }
  say(`    far field (the shooting condition):  F1(20) = ${fmt(s1.F(20), 8)}, f1(20) = ${fmt(s1.f(20), 8)}   [both must -> 1]`);

  const s2 = solveDDE(2, ALPHA2, BETA2, UMAX, h);
  say('\n3b. kappa = 2 with the Booker-Browning (alpha,beta). The far field is an');
  say('    INDEPENDENT check of the pair: a wrong beta does not converge to 1.');
  say(`    F2(20) = ${fmt(s2.F(20), 8)},  f2(20) = ${fmt(s2.f(20), 8)}`);
  for (const db of [-0.15, -0.05, 0.05, 0.15]) {
    const bad = solveDDE(2, ALPHA2, BETA2 + db, UMAX, h);
    say(`      beta2 ${db > 0 ? '+' : ''}${db}: f2(20) = ${fmt(bad.f(20), 6)}, F2(20) = ${fmt(bad.F(20), 6)}`);
  }
  // shoot on beta with alpha held at the published value: an independent recovery
  let blo = 3.8, bhi = 4.8;
  for (let k = 0; k < 40; k++) {
    const bm = (blo + bhi) / 2;
    if (solveDDE(2, ALPHA2, bm, UMAX, 2e-4).f(20) > 1) blo = bm; else bhi = bm;
  }
  say(`    shooting on beta (alpha fixed, f2(20) = 1): beta2 recovered = ${fmt((blo + bhi) / 2, 5)}` +
    `   vs Booker-Browning ${fmt(BETA2, 5)}   (rel. ${(Math.abs((blo + bhi) / 2 / BETA2 - 1)).toExponential(2)})`);

  say('\n3c. THE RETENTION CURVE. f_kappa(u) is the fraction of the true main term');
  say('    H V(z) that the certificate keeps at level z^u. This IS the DP3 price.');
  say('u        f2(u)      F2(u)      f1(u)      F1(u)     f2/f1');
  for (const u of [4.2665, 4.3, 4.5, 5.0, 5.3577, 6, 7, 8, 10, 12, 16, 20]) {
    say(`${fmt(u, 4).padEnd(9)}${fmt(Math.max(0, s2.f(u)), 6).padEnd(11)}${fmt(s2.F(u), 6).padEnd(11)}` +
      `${fmt(Math.max(0, s1.f(u)), 6).padEnd(11)}${fmt(s1.F(u), 6).padEnd(10)}${fmt(s2.f(u) / s1.f(u), 4)}`);
  }
  const cross = (fn, target) => { let lo = 1, hi = UMAX - 2; for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (fn(m) < target) lo = m; else hi = m; } return (lo + hi) / 2; };
  say('\n    retention level    u at kappa=2     u at kappa=1     ratio');
  for (const t of [1e-6, 0.01, 0.1, 0.25, 0.5, 0.75, 0.9, 0.99]) {
    const u2 = cross(s2.f, t), u1 = cross(s1.f, t);
    say(`    f >= ${String(t).padEnd(14)}${fmt(u2, 4).padEnd(17)}${fmt(u1, 4).padEnd(17)}${fmt(u2 / u1, 4)}`);
  }
  return { s1, s2 };
}

// ---------------------------------------------------------------------------
// === 4. THE CERTIFIED THRESHOLD WITH EXACT REMAINDERS =======================
// Theorem 9.1 lower bound, all constants explicit except the O(.):
//   S(A,z) >= H V(z) [ f_kappa(ln y/ln z) - o(1) ] - 2 sum_{m|P(z), m<y} 4^nu(m)|r_m|
// with the trivial |r_m| <= omega(m). Every piece here is computed exactly:
// the divisor sum runs over the actual divisors of the primorial, not over an
// asymptotic y log^7 y. The o(1) is set to 0 (i.e. we grant the theorem its
// most favourable possible constant) and is priced separately in 4c.
// ---------------------------------------------------------------------------
function divisorProfile(x, kappa) {
  const ps = primesTo(x);
  const NB = 9000, DB = 0.02;           // bins in ln d, resolution 0.02
  const bins = new Float64Array(NB);    // sum of 4^nu(m) * omega(m)
  const cnt = new Float64Array(NB);
  const n = ps.length;
  const total = 1 << n;
  for (let mask = 0; mask < total; mask++) {
    let ld = 0, w = 1, nu = 0;
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) { ld += Math.log(ps[i]); w *= omega(ps[i], kappa); nu++; }
    }
    const b = Math.min(NB - 1, Math.floor(ld / DB));
    bins[b] += Math.pow(4, nu) * w;
    cnt[b] += 1;
  }
  for (let i = 1; i < NB; i++) { bins[i] += bins[i - 1]; cnt[i] += cnt[i - 1]; }
  return { bins, cnt, DB, NB, lnP: ps.reduce((a, p) => a + Math.log(p), 0) };
}

function section4(dde) {
  rule('4. THE CERTIFIED THRESHOLD, EXACT REMAINDERS, ALL 22 LEVELS');
  const { s2 } = dde;
  console.log('4a. Constant-free comparison: the asymptotic shape x^{beta2} against truth.');
  console.log('x     G2        x^beta2        ratio          log_x(ratio)');
  for (const x of ALLP) {
    const g = G2TRUE.get(x), b = Math.pow(x, BETA2);
    console.log(`${String(x).padEnd(6)}${String(g).padEnd(10)}${b.toExponential(4).padEnd(15)}${(b / g).toExponential(3).padEnd(15)}${fmt(Math.log(b / g) / Math.log(x), 4)}`);
  }

  console.log('\n4b. The threshold the theorem ACTUALLY certifies at each finite z, with the');
  console.log('    exact divisor remainder sum and the o(1) generously set to zero.');
  console.log('    H*(z) = min H such that some level y makes H V(z) f2(ln y/ln z) > 2 sum_{m<y} 4^nu omega.');
  console.log('x     ln z    V(z)        u* (opt)  ln H*      H*             log_x(H*)   H*/G2       overhead ln H* - beta2 ln z');
  const rows = [];
  for (const x of ALLP) {
    const ps = primesTo(x);
    const z = x + 1, lnz = Math.log(z);
    let V = 1;
    for (const p of ps) V *= 1 - omega(p, 2) / p;
    const prof = divisorProfile(x, 2);
    const remAt = lny => { const b = Math.min(prof.NB - 1, Math.max(0, Math.floor(lny / prof.DB))); return 2 * prof.bins[b]; };
    // The bound is positive iff H > R(y) / (V f2(ln y / ln z)) for some y, so
    // ln H* = min over y of [ ln R(y) - ln V - ln f2 ]. One scan, no bisection.
    let lnH = Infinity, bestU = NaN;
    for (let lny = BETA2 * lnz; lny < prof.NB * prof.DB; lny += prof.DB) {
      const u = lny / lnz, ff = s2.f(u);
      if (!(ff > 0)) continue;
      const R = remAt(lny);
      if (!(R > 0)) continue;
      const c = Math.log(R) - Math.log(V) - Math.log(ff);
      if (c < lnH) { lnH = c; bestU = u; }
    }
    const g = G2TRUE.get(x);
    rows.push({ x, lnH, V, lnz, bestU });
    console.log(`${String(x).padEnd(6)}${fmt(lnz, 3).padEnd(8)}${V.toExponential(3).padEnd(12)}${fmt(bestU, 3).padEnd(9)}${fmt(lnH, 2).padEnd(11)}` +
      `${Math.exp(lnH).toExponential(3).padEnd(15)}${fmt(lnH / Math.log(x), 3).padEnd(12)}${(Math.exp(lnH) / g).toExponential(2).padEnd(12)}${fmt(lnH - BETA2 * lnz, 2)}`);
  }

  console.log('\n4c. The sixth discard nobody named: the o(1). Theorem 9.1 carries');
  console.log('    O((ln ln y)^2 / (ln y)^{1/(2k+2)}) = O((ln ln y)^2/(ln y)^{1/6}) at k=2.');
  console.log('    It costs ZERO in the exponent and is larger than f2 <= 1 at every');
  console.log('    computable z. Where does it first drop below 1 (implied constant 1)?');
  console.log('ln z          ln y = beta2 ln z    (lnln y)^2/(ln y)^{1/6}    f2 usable?');
  for (const lnz of [4.37, 10, 100, 1e3, 1e6, 1e12, 1e16, 1e18, 1.6e20, 1e22]) {
    const lny = BETA2 * lnz, E = Math.log(lny) ** 2 / Math.pow(lny, 1 / 6);
    console.log(`${lnz.toExponential(2).padEnd(14)}${lny.toExponential(3).padEnd(21)}${E.toExponential(3).padEnd(26)}${E < 1 ? 'yes' : 'no'}`);
  }
  return rows;
}

// ---------------------------------------------------------------------------
// === 5. DP4 — THE REMAINDERS ================================================
// (a) how tight is |r_d| <= omega(d) over a full period, exactly;
// (b) signed vs absolute at level D, which is the only thing standing between
//     theta = 1 and theta > 1.
// ---------------------------------------------------------------------------
function classesMod(d, ps, kappa) {
  // CRT the classes {0} (kappa=1) or {0,-2} (kappa=2) mod each p | d
  let cls = [0], mod = 1;
  for (const p of ps) {
    if (d % p !== 0) continue;
    const local = kappa === 2 && p > 2 ? [0, p - 2] : [0];
    const next = [];
    for (const c of cls) for (const l of local) {
      // solve y = c mod mod, y = l mod p
      let y = c;
      while (y % p !== l) y += mod;
      next.push(y);
    }
    cls = next; mod *= p;
  }
  return cls;
}

// exact max over ALL window positions of |r_d(t)|, for one divisor and one H
function maxRemainder(d, cls, H) {
  const w = cls.length, rho = H % d;
  if (rho === 0) return 0;
  const s = cls.slice().sort((a, b) => a - b);
  let kmax = 0, kmin = w;
  for (const c of s) for (const anchor of [c, (c + 1) % d]) {
    let k = 0;
    for (const cc of s) if (((cc - anchor) % d + d) % d < rho) k++;
    if (k > kmax) kmax = k;
    if (k < kmin) kmin = k;
  }
  const mean = w * rho / d;
  return Math.max(kmax - mean, mean - kmin);
}

function section5() {
  rule('5. DP4 — THE REMAINDERS, EXACTLY OVER A FULL PERIOD');
  const x = 19, kappa = 2, ps = primesTo(x);
  console.log(`5a. Tightness of the trivial bound |r_d| <= omega(d), all ${1 << ps.length} divisors of ${x}#,`);
  console.log('    exact max over every window position of the full period. The sieve only');
  console.log('    ever uses d < y, so the d <= H column is the one that prices DP4.');
  console.log('H        max over d <= H     max over ALL d      #d<=H with ratio > 0.8   mean ratio, d <= H');
  const divs = [];
  for (let mask = 0; mask < (1 << ps.length); mask++) {
    let d = 1, nu = 0;
    for (let i = 0; i < ps.length; i++) if (mask & (1 << i)) { d *= ps[i]; nu++; }
    divs.push({ d, nu, cls: classesMod(d, ps, kappa) });
  }
  for (const H of [150, 1000, 10000, 100000]) {
    let wAll = 0, wLo = 0, near = 0, sum = 0, n = 0;
    for (const D of divs) {
      const ratio = maxRemainder(D.d, D.cls, H) / D.cls.length;
      if (ratio > wAll) wAll = ratio;
      if (D.d <= H) {
        if (ratio > wLo) wLo = ratio;
        if (ratio > 0.8) near++;
        sum += ratio; n++;
      }
    }
    console.log(`${String(H).padEnd(9)}${fmt(wLo, 6).padEnd(19)}${fmt(wAll, 6).padEnd(20)}${String(near + ' of ' + n).padEnd(25)}${fmt(sum / n, 5)}`);
  }

  console.log('\n5b. Signed against absolute at level D. Theorem 9.1 charges');
  console.log('    2 sum_{m<y} 4^nu(m) |r_m|. The identity sum_{d|P(z)} mu(d) r_d(t) =');
  console.log('    N(t) - H V(z) says the SIGNED object is the count deviation itself.');
  console.log('    Both sides are computed exactly over the whole period below.');
  console.log('x   H      D=H    #d<=D  DP4 charge 2*4^nu   sum max|r_d|   max_t|signed|   signed/charge   gamma=ln(sgn)/ln D   theta=1/gamma');
  for (const xx of [13, 17, 19]) {
    const pp = primesTo(xx);
    let PP = 1; for (const p of pp) PP *= p;
    const dv = [];
    for (let mask = 0; mask < (1 << pp.length); mask++) {
      let d = 1, nu = 0;
      for (let i = 0; i < pp.length; i++) if (mask & (1 << i)) { d *= pp[i]; nu++; }
      dv.push({ d, nu, mu: nu % 2 ? -1 : 1, cls: classesMod(d, pp, 2) });
    }
    for (const H of [G2TRUE.get(xx), 4 * G2TRUE.get(xx), 16 * G2TRUE.get(xx)]) {
      const D = H;
      const use = dv.filter(o => o.d <= D);
      const m = new Int16Array(PP);
      for (const o of use) for (const c of o.cls) for (let r = c; r < PP; r += o.d) m[r] += o.mu;
      let s = 0;
      for (let r = 0; r < H; r++) s += m[r];
      let mainD = 0;
      for (const o of use) mainD += o.mu * o.cls.length / o.d;
      let mx = Math.abs(s - H * mainD);
      for (let t = 1; t < PP; t++) {
        s -= m[t - 1]; s += m[(t - 1 + H) % PP];
        const v = Math.abs(s - H * mainD);
        if (v > mx) mx = v;
      }
      let sAbs = 0, charge = 0;
      for (const o of use) {
        const mr = maxRemainder(o.d, o.cls, H);
        sAbs += mr; charge += 2 * Math.pow(4, o.nu) * mr;
      }
      const gam = Math.log(Math.max(mx, 1.0000001)) / Math.log(D);
      console.log(`${String(xx).padEnd(4)}${String(H).padEnd(7)}${String(D).padEnd(7)}${String(use.length).padEnd(7)}` +
        `${fmt(charge, 1).padEnd(20)}${fmt(sAbs, 2).padEnd(15)}${fmt(mx, 2).padEnd(16)}` +
        `${(mx / charge).toExponential(2).padEnd(16)}${fmt(gam, 4).padEnd(21)}${fmt(1 / gam, 4)}`);
    }
  }
  console.log('\n5c. VERDICT ON DP4. Per term the trivial bound is nearly attained, so nothing');
  console.log('    is lost there. What is lost is the SIGN: the signed sum over the divisor');
  console.log('    lattice is D^gamma with gamma near 1/2 at every scale checkable here,');
  console.log('    while the charge is D^1 times a 4^nu weight. gamma = 1/2 exactly would');
  console.log('    put theta = 2, which is the vector sieve full-decoupling target.');
}

// ---------------------------------------------------------------------------
// === 6. DP3 FINITE — WORST-CASING THE STRATA, AND BRUN FOR SCALE ============
// The Buchstab step that DP3 truncates:
//     N(t) = H - sum_i B_i(t),   B_i(t) = # r in window first killed by p_i.
// A sieve that keeps the strata but prices each at its own worst case over
// window position certifies  N >= H - sum_i max_t B_i(t).  That threshold is
// exactly computable over a full period, and it is an upper bound on what any
// stratum-worst-casing scheme (which is what DP3 is) can achieve.
// ---------------------------------------------------------------------------
function section6() {
  rule('6. DP3 FINITE — Buchstab strata priced at their own worst case, exactly');
  console.log('x    G2    H1 = min H with sum_i max_t B_i < H    H1/G2   log_x(H1)   log_x(G2)');
  for (const x of [7, 11, 13, 17, 19]) {
    const ps = primesTo(x);
    let P = 1; for (const p of ps) P *= p;
    const strat = new Uint8Array(P);   // 0 = survivor, else 1-based index of first killer
    for (let i = ps.length - 1; i >= 0; i--) {
      const p = ps[i];
      for (let r = 0; r < P; r += p) strat[r] = i + 1;
      if (p > 2) for (let r = (p - 2) % p; r < P; r += p) strat[r] = i + 1;
    }
    const m = ps.length;
    const sumMax = H => {
      const cnt = new Int32Array(m + 1), mx = new Int32Array(m + 1);
      for (let r = 0; r < H; r++) cnt[strat[r]]++;
      for (let i = 0; i <= m; i++) mx[i] = cnt[i];
      let minSurv = cnt[0];
      for (let t = 1; t < P; t++) {
        const a = strat[t - 1]; cnt[a]--;
        const b = strat[(t - 1 + H) % P]; cnt[b]++;
        if (cnt[b] > mx[b]) mx[b] = cnt[b];
        if (cnt[0] < minSurv) minSurv = cnt[0];
      }
      let s = 0; for (let i = 1; i <= m; i++) s += mx[i];
      return { s, minSurv };
    };
    let lo = 1, hi = 1 << 22;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (sumMax(mid).s < mid) hi = mid; else lo = mid; }
    const g = G2TRUE.get(x);
    console.log(`${String(x).padEnd(5)}${String(g).padEnd(6)}${String(hi).padEnd(38)}${fmt(hi / g, 2).padEnd(8)}${fmt(Math.log(hi) / Math.log(x), 4).padEnd(12)}${fmt(Math.log(g) / Math.log(x), 4)}`);
  }

  console.log('\n6b. Brun depth truncation for scale: the crudest valid truncation. rho_k =');
  console.log('    (sum_{j<=k} (-1)^j e_j) / V is the retention at Bonferroni depth k; the');
  console.log('    level is the product of the k largest primes <= x.');
  console.log('x     kappa   min odd k with rho_k > 0    level exponent s = ln D_k / ln x    ln ln x');
  for (const x of [19, 43, 79, 200, 1000, 10000]) {
    const pr = x <= 79 ? primesTo(x) : sievePrimes(x);
    for (const kappa of [1, 2]) {
      const a = pr.map(p => omega(p, kappa) / p);
      // elementary symmetric polynomials
      let e = [1];
      for (const v of a) { const ne = e.slice(); ne.push(0); for (let j = e.length; j >= 1; j--) ne[j] += e[j - 1] * v; e = ne; }
      let V = 1; for (const v of a) V *= 1 - v;
      let partial = 0, kfound = null;
      for (let j = 0; j < e.length; j++) {
        partial += (j % 2 ? -1 : 1) * e[j];
        if (j % 2 === 1 && partial > 0) { kfound = j; break; }
      }
      let lnD = 0;
      if (kfound !== null) for (let i = 0; i < kfound; i++) lnD += Math.log(pr[pr.length - 1 - i]);
      console.log(`${String(x).padEnd(6)}${kappa}       ${String(kfound === null ? 'none <= pi(x)' : kfound).padEnd(27)}` +
        `${(kfound === null ? '-' : fmt(lnD / Math.log(x), 3)).padEnd(35)}${fmt(Math.log(Math.log(x)), 3)}`);
    }
  }
}

// ---------------------------------------------------------------------------
// === 7. THE EXACT LEVEL-D OPTIMUM — HOW MUCH DP3 ACTUALLY GIVES AWAY ========
// The sharpest question the discard map raises: at level D, what is the BEST
// main term any level-D minorant can carry? That is a finite linear program,
// and at small z it is small enough to solve exactly.
//
//   min y_0  subject to  sum_{S superset T} y_S = g(T) for every T with
//   prod T <= D,  y >= 0,
//
// where g(T) = prod_{p in T} omega(p)/p and y_S is the density of elements
// whose prime support below z is exactly S. By LP duality the optimum is the
// value of the best level-D sieve weight vector, so
//   rho*(z,D) = (LP optimum)/V(z)
// is the exact finite-z analogue of f_kappa(ln D/ln z), computed for OUR
// omega rather than for the adversarial one DHR must survive. It is therefore
// an UPPER bound on what any repair of DP3 could deliver at that level.
//
// Two self-checks pin the solver: rho*(z, x#) must be exactly 1 (all moments
// present, Mobius inversion is the unique feasible point) and rho*(z, 1) must
// be exactly 0. Both are asserted below.
// ---------------------------------------------------------------------------
// Two-phase revised-tableau simplex, Bland's rule (the moment LP is massively
// degenerate, so anti-cycling is not optional). Both reduced-cost rows are
// carried through every pivot, which is what makes pi = 9 affordable.
function simplexMin(A, b, c, m, n) {
  const N = n + m, TOL = 1e-9, MAXIT = 400000;
  const T = [];
  for (let i = 0; i < m; i++) {
    const row = new Float64Array(N + 1);
    for (let j = 0; j < n; j++) row[j] = A[i][j];
    row[n + i] = 1; row[N] = b[i];
    T.push(row);
  }
  const basis = new Int32Array(m);
  for (let i = 0; i < m; i++) basis[i] = n + i;
  const r1 = new Float64Array(N + 1);   // phase 1: z_j - c_j, c = 1 on artificials
  for (let i = 0; i < m; i++) for (let k = 0; k <= N; k++) r1[k] += T[i][k];
  for (let j = n; j < N; j++) r1[j] -= 1;
  const r2 = new Float64Array(N + 1);   // phase 2, rebuilt from the basis after phase 1
  const pivot = (r, j) => {
    const pv = T[r][j], inv = 1 / pv, row = T[r];
    for (let k = 0; k <= N; k++) row[k] *= inv;
    for (let i = 0; i < m; i++) {
      if (i === r) continue;
      const f = T[i][j];
      if (f === 0) continue;
      const ri = T[i];
      for (let k = 0; k <= N; k++) ri[k] -= f * row[k];
    }
    for (const cr of [r1, r2]) {
      const f = cr[j];
      if (f === 0) continue;
      for (let k = 0; k <= N; k++) cr[k] -= f * row[k];
    }
    basis[r] = j;
  };
  const run = (cr, jmax) => {
    for (let it = 0; it < MAXIT; it++) {
      let enter = -1;
      for (let j = 0; j < jmax; j++) if (cr[j] > TOL) { enter = j; break; }
      if (enter < 0) return true;
      let leave = -1, best = Infinity;
      for (let i = 0; i < m; i++) {
        if (T[i][enter] <= TOL) continue;
        const r = T[i][N] / T[i][enter];
        if (r < best - 1e-12 || (Math.abs(r - best) <= 1e-12 && (leave < 0 || basis[i] < basis[leave]))) { best = r; leave = i; }
      }
      if (leave < 0) return false;
      pivot(leave, enter);
    }
    return false;
  };
  if (!run(r1, N)) return { status: 'phase1-fail' };
  if (Math.abs(r1[N]) > 1e-7) return { status: 'infeasible' };
  // drive artificials out of the basis (all sit at 0, so any nonzero pivot is safe);
  // a row with no nonzero structural entry is a redundant constraint and goes inert.
  for (let i = 0; i < m; i++) {
    if (basis[i] < n) continue;
    let j = -1;
    for (let k = 0; k < n; k++) if (Math.abs(T[i][k]) > 1e-9) { j = k; break; }
    if (j >= 0) pivot(i, j); else for (let k = 0; k <= N; k++) T[i][k] = 0;
  }
  for (let i = 0; i < m; i++) if (basis[i] >= n && Math.abs(T[i][N]) > 1e-7) return { status: 'artificial-residue' };
  // phase-2 cost row from the current basis; c has a single nonzero (variable 0)
  for (let j = 0; j <= N; j++) r2[j] = 0;
  for (let i = 0; i < m; i++) {
    const cb = basis[i] < n ? c[basis[i]] : 0;
    if (cb === 0) continue;
    for (let k = 0; k <= N; k++) r2[k] += cb * T[i][k];
  }
  for (let j = 0; j < n; j++) r2[j] -= c[j];
  if (!run(r2, n)) return { status: 'phase2-fail' };
  let val = 0;
  for (let i = 0; i < m; i++) if (basis[i] < n) val += c[basis[i]] * T[i][N];
  return { status: 'ok', value: val };
}

function levelOptimum(x, D, kappa) {
  const ps = primesTo(x), pi = ps.length, n = 1 << pi;
  const prod = new Float64Array(n), g = new Float64Array(n);
  for (let S = 0; S < n; S++) {
    let pd = 1, gg = 1;
    for (let i = 0; i < pi; i++) if (S & (1 << i)) { pd *= ps[i]; gg *= omega(ps[i], kappa) / ps[i]; }
    prod[S] = pd; g[S] = gg;
  }
  const Ts = [];
  for (let Tt = 0; Tt < n; Tt++) if (prod[Tt] <= D) Ts.push(Tt);
  const m = Ts.length;
  const A = [];
  for (let i = 0; i < m; i++) {
    const row = new Float64Array(n);
    for (let S = 0; S < n; S++) if ((S & Ts[i]) === Ts[i]) row[S] = 1;
    A.push(row);
  }
  const b = Ts.map(t => g[t]);
  const cvec = new Float64Array(n); cvec[0] = 1;
  const r = simplexMin(A, b, cvec, m, n);
  return { status: r.status, value: r.value, m };
}

function section7() {
  rule('7. THE EXACT LEVEL-D OPTIMUM — the finite-z analogue of f_kappa');
  console.log('7a. Retention curves. The kappa = 1 column is the CALIBRATION: its asymptotic');
  console.log('    sifting limit beta_1 = 2 is proven optimal (Selberg), so whatever the');
  console.log('    finite-z instrument reads there is its bias, and the kappa = 2 reading');
  console.log('    must be corrected by the same bias before it means anything.');
  const summary = [];
  for (const x of [7, 11, 13, 17, 19, 23]) {
    const ps = primesTo(x);
    let P = 1;
    for (const p of ps) P *= p;
    const V = k => { let v = 1; for (const p of ps) v *= 1 - omega(p, k) / p; return v; };
    const seen = new Set(), Ds = [];
    for (let S = 0; S < (1 << ps.length); S++) {
      let pd = 1;
      for (let i = 0; i < ps.length; i++) if (S & (1 << i)) pd *= ps[i];
      if (!seen.has(pd)) { seen.add(pd); Ds.push(pd); }
    }
    Ds.sort((a, b) => a - b);
    const line = { x, lnP: Math.log(P) / Math.log(x) };
    let bad = false;
    for (const kappa of [1, 2]) {
      const Vk = V(kappa);
      const full = levelOptimum(x, P, kappa), none = levelOptimum(x, 1, kappa);
      const ok = full.status === 'ok' && Math.abs(full.value / Vk - 1) < 1e-6 &&
        none.status === 'ok' && Math.abs(none.value) < 1e-9;
      if (!ok) { bad = true; console.log(`  x = ${x}, kappa = ${kappa}: SELF-CHECK FAILED (${full.status}/${none.status}), suppressed`); continue; }
      const rho = new Map();
      const at = D => {
        if (rho.has(D)) return rho.get(D);
        const r = levelOptimum(x, D, kappa);
        const v = r.status === 'ok' ? r.value / Vk : NaN;
        rho.set(D, v);
        return v;
      };
      // rho* is nondecreasing in D (a larger level only adds constraints to a
      // minimisation), so the thresholds come out of a bisection on the D list.
      const cross = t => {
        let lo = 0, hi = Ds.length - 1;
        if (!(at(Ds[hi]) >= t)) return NaN;
        while (lo < hi) { const mid = (lo + hi) >> 1; if (at(Ds[mid]) >= t) hi = mid; else lo = mid + 1; }
        return Math.log(Ds[lo]) / Math.log(x);
      };
      line['k' + kappa] = { sStar: cross(1e-9), s50: cross(0.5), s90: cross(0.9), s99: cross(0.99), at };
    }
    if (bad) continue;
    summary.push(line);
    console.log(`\n  x = ${x}  (ln(x#)/ln x = ${fmt(line.lnP, 3)}, so levels above that do not exist)   self-checks PASS both kappa`);
    console.log('    D          s=lnD/lnx   rho*(kappa=1)   rho*(kappa=2)   f2(s) DHR    f1(s) DHR');
    const picks = [];
    for (const D of Ds) if (picks.length === 0 || D / picks[picks.length - 1] > 1.6) picks.push(D);
    if (picks[picks.length - 1] !== Ds[Ds.length - 1]) picks.push(Ds[Ds.length - 1]);
    for (const D of picks) {
      const s = Math.log(D) / Math.log(x);
      console.log(`    ${String(D).padEnd(11)}${fmt(s, 4).padEnd(12)}${fmt(line.k1.at(D), 6).padEnd(16)}${fmt(line.k2.at(D), 6).padEnd(16)}` +
        `${fmt(Math.max(0, section7.f2 ? section7.f2(s) : NaN), 6).padEnd(13)}${fmt(Math.max(0, section7.f1 ? section7.f1(s) : NaN), 6)}`);
    }
  }
  console.log('\n7b. THE CALIBRATED READING. s* is the smallest level exponent at which the');
  console.log('    exact one-point optimum is positive at all; s50/s90/s99 are where it');
  console.log('    reaches half, nine tenths and 99 per cent of the true density.');
  console.log('    CALIBRATION: at kappa = 1 the asymptotic answer is beta_1 = 2, PROVEN');
  console.log('    optimal. Whichever column reproduces 2 there is the column to read at');
  console.log('    kappa = 2 against beta_2 = 4.26645.');
  console.log('x     s*(k=1)  s50(k=1) s90(k=1) s99(k=1)   s*(k=2)  s50(k=2) s90(k=2) s99(k=2)   s90 ratio');
  for (const L of summary) {
    console.log(`${String(L.x).padEnd(6)}${fmt(L.k1.sStar, 4).padEnd(9)}${fmt(L.k1.s50, 4).padEnd(9)}${fmt(L.k1.s90, 4).padEnd(9)}${fmt(L.k1.s99, 4).padEnd(11)}` +
      `${fmt(L.k2.sStar, 4).padEnd(9)}${fmt(L.k2.s50, 4).padEnd(9)}${fmt(L.k2.s90, 4).padEnd(9)}${fmt(L.k2.s99, 4).padEnd(11)}${fmt(L.k2.s90 / L.k1.s90, 4)}`);
  }
  console.log('\n7c. THE CALIBRATED ONE-POINT FLOOR. Each statistic at kappa = 2, rescaled by');
  console.log('    the factor that statistic needs at kappa = 1 to reproduce the PROVEN');
  console.log('    beta_1 = 2. Four independent rescalings of the same LP.');
  console.log('x       via s*     via s50    via s90    via s99      spread');
  const all = [];
  for (const L of summary) {
    const est = ['sStar', 's50', 's90', 's99'].map(k => L.k2[k] * 2 / L.k1[k]);
    if (L.x >= 13) all.push(...est);
    console.log(`${String(L.x).padEnd(8)}${est.map(e => fmt(e, 4).padEnd(11)).join('')}${fmt(Math.max(...est) - Math.min(...est), 4)}`);
  }
  const mean = all.reduce((a, b) => a + b, 0) / all.length;
  console.log(`\n    Pooled over x = 13..23 (${all.length} readings): mean ${fmt(mean, 3)}, ` +
    `range ${fmt(Math.min(...all), 3)} to ${fmt(Math.max(...all), 3)}, against DHR beta_2 = ${fmt(BETA2, 4)}.`);
  section7.floor = mean;
  section7.floorLo = Math.min(...all);
  section7.floorHi = Math.max(...all);
  console.log('\n  READ THIS AS: rho* is the best ANY level-D one-point minorant can do for');
  console.log('  our exact density at that z, parity adversary included (the LP is free to');
  console.log('  put all its mass on cells of one Omega-parity). Where rho* > f the DHR');
  console.log('  truncation is leaving main term on the table. The kappa = 1 column says how');
  console.log('  much of that gap is finite-z bias rather than method slack. HONEST LIMIT:');
  console.log('  s90 and s99 at kappa = 2 are still rising at x = 23 while their kappa = 1');
  console.log('  counterparts converged by x = 13, so the rescaling is the only thing making');
  console.log('  these comparable, and it is a calibration, not a theorem.');
}

// ---------------------------------------------------------------------------
// === 8. THE BUDGET AND THE ELASTICITIES =====================================
// ---------------------------------------------------------------------------
function section8() {
  rule('8. THE LOSS BUDGET AND THE ELASTICITY OF THE EXPONENT');
  const E = (b, th) => b / th;
  const FLOOR = section7.floor, LO = section7.floorLo, HI = section7.floorHi;
  const VEC = 2 * (1 + Math.sqrt(Math.E));       // 2(1 + sqrt e), the vector-sieve beta
  console.log('The certified exponent is E = beta / theta: beta the sifting limit of the');
  console.log('positivity method, theta the level exponent (level = H^theta). DHR runs at');
  console.log(`beta = ${fmt(BETA2, 5)}, theta = 1. Truth is E = 1 asymptotically and`);
  console.log('log_x(G2) = 1.70, flat, everywhere in the exactly known range.\n');
  console.log('8a. THE BUDGET. Every line is a number this script computed.');
  console.log('line                                     exponent   cumulative   basis');
  const rows = [
    ['truth (asymptotic belief)', 1.0, 1.0, 'x ln^a x; log_x G2 = 1.70 flat at x <= 79 (sec 1)'],
    ['DP1: the one-point / level-D floor', FLOOR - 1.0, FLOOR, `exact LP, calibrated on proven beta_1 = 2 (sec 7c); bracket ${fmt(LO, 2)}-${fmt(HI, 2)}`],
    ['DP2+DP3: adversarial omega + truncation', BETA2 - FLOOR, BETA2, 'residual: DHR beta_2 minus the measured floor'],
    ['DP2 alone: envelope validity', 0.0, BETA2, `L* = 2.19722 exact, kappa_eff = 2.05, V costs 2lnln z/ln z -> 0 (sec 2)`],
    ['DP4 at theta = 1', 0.0, BETA2, 'max|r_d|/omega(d) = 0.88 attained; level H^{1-eps} free (sec 5a)'],
    ['DP6: the o(1) (unnamed in the discard map)', 0.0, BETA2, 'zero in the exponent; +2.80 at x = 79 (sec 4b, 4c)'],
  ];
  for (const [name, ex, cum, basis] of rows) {
    console.log(`${name.padEnd(41)}${(ex >= 0 ? '+' : '') + fmt(ex, 4).padEnd(10)} ${fmt(cum, 4).padEnd(13)}${basis}`);
  }
  console.log(`RESIDUAL after all lines: ${fmt(BETA2 - rows[rows.length - 1][2], 6)}  (zero by construction; the`);
  console.log('  honest uncertainty is entirely in the DP1 line, whose bracket is +-0.4).');
  console.log('\n  The two big lines, said plainly:');
  console.log(`  * ${fmt(FLOOR - 1, 2)} of the ${fmt(BETA2 - 1, 2)} is the ONE-POINT FLOOR itself. No sieve of any kind that`);
  console.log('    reads only divisor-class counts gets under it, at any level. At least 1.00');
  console.log('    of it is the parity adversary, which the LP contains explicitly.');
  console.log(`  * ${fmt(BETA2 - FLOOR, 2)} is what DHR pays ON TOP of that floor: the price of a truncation`);
  console.log('    that must survive every omega in Omega(kappa,L), not just ours. That is the');
  console.log('    only piece a better positivity method could recover, and it is small.');

  console.log('\n8b. ELASTICITIES at the working point (beta, theta) = (4.26645, 1).');
  console.log(`  dE/dbeta  = 1/theta       = ${fmt(1, 4)}    per unit of beta`);
  console.log(`  dE/dtheta = -beta/theta^2 = ${fmt(-BETA2, 4)}   per unit of theta`);
  console.log('  dlnE/dlnbeta = +1,  dlnE/dlntheta = -1: per PROPORTIONAL improvement the two');
  console.log('  knobs are EXACTLY equal. A factor c in either divides the exponent by c.');
  console.log('  So the ranking is decided by HEADROOM and by whether a consumer exists.\n');
  console.log('rank  knob                        headroom              E at the limit   consumer');
  console.log(`1     theta (DP4 absolute values) 1 -> 2 (measured)     ${fmt(E(BETA2, 2), 4).padEnd(17)}vector sieve + Lemma V`);
  console.log(`2     beta  (DP2+DP3 truncation)  ${fmt(BETA2, 3)} -> ${fmt(FLOOR, 3)}        ${fmt(E(FLOOR, 1), 4).padEnd(17)}none in the literature`);
  console.log(`3     DP1   (one-point data)      ${fmt(FLOOR, 3)} -> 1 (parity)   ${fmt(1, 4).padEnd(17)}none; this is the wall`);
  console.log(`4     DP2 envelope L, DP6 o(1)    none                  ${fmt(E(BETA2, 1), 4).padEnd(17)}elasticity exactly 0`);
  console.log('\n  Both knobs at their measured limits: beta = ' + fmt(FLOOR, 3) + ', theta = 2 gives E = ' + fmt(E(FLOOR, 2), 4) + '.');
  console.log('  The measured truth exponent over the same range is 1.70. Those two numbers');
  console.log('  agree to ' + fmt(100 * Math.abs(E(FLOOR, 2) / 1.7037 - 1), 1) + ' per cent, which is the strongest single check in this file.');

  console.log('\n8c. THE COUPLING nobody prices: the two knobs are not independent. The one');
  console.log('    mechanism that buys theta = 2 (Brudern-Fouvry) factors the two-class');
  console.log('    condition into two LINEAR sieves, so it pays for theta in beta:');
  console.log(`      beta ${fmt(BETA2, 4)} -> ${fmt(VEC, 4)} = 2(1+sqrt e)   (a ${fmt(100 * (VEC / BETA2 - 1), 1)} per cent penalty)`);
  console.log(`      theta 1 -> 2                          (a 100.0 per cent gain)`);
  console.log(`      net E ${fmt(BETA2, 4)} -> ${fmt(VEC / 2, 4)}                 (gain ${fmt(BETA2 - VEC / 2, 4)})`);
  console.log(`    Partial decoupling: any theta > ${fmt(VEC / BETA2, 4)} already beats 4.26645.`);

  console.log('\n8d. WHAT EACH TARGET COSTS, as the factor c needed in either knob.');
  console.log('target                             E        c = 4.26645/E   beta must reach   or theta must reach');
  for (const [name, target] of [['beat 4.26645 at all', 4.2664], ['the measured one-point floor', FLOOR],
  ['vector sieve, full decoupling', VEC / 2], ['TPC-equivalent line', 2], ['the measured law', 1.7037], ['truth', 1]]) {
    const c = BETA2 / target;
    console.log(`${name.padEnd(35)}${fmt(target, 4).padEnd(9)}${fmt(c, 4).padEnd(16)}${fmt(BETA2 / c, 4).padEnd(18)}${fmt(c, 4)}`);
  }
  console.log('\n  Reading the last two rows: reaching exponent 2 needs c = 2.13 and reaching');
  console.log('  1 needs c = 4.27. The measured theta headroom is c = 2 and the measured beta');
  console.log(`  headroom is c = ${fmt(BETA2 / FLOOR, 3)}. Their product is ${fmt(2 * BETA2 / FLOOR, 3)}, which lands at E = ${fmt(FLOOR / 2, 3)}: the two`);
  console.log('  knobs together reach the measured law and stop short of exponent 1.');
}

// ---------------------------------------------------------------------------
function main() {
  const t0 = Date.now();
  const want = process.argv.slice(2).filter(a => /^[1-8]$/.test(a)).map(Number);
  if (want.includes(8) && !want.includes(7)) want.push(7);   // 8 reads section 7's floor
  const run = k => want.length === 0 || want.includes(k);
  if (run(1)) section1();
  if (run(2)) section2();
  const dde = (run(3) || run(4) || run(7)) ? section3(!run(3)) : null;
  if (dde) { section7.f2 = dde.s2.f; section7.f1 = dde.s1.f; }
  if (run(4)) section4(dde);
  if (run(5)) section5();
  if (run(6)) section6();
  if (run(7)) section7();
  if (run(8)) section8();
  console.log(`\n[total ${((Date.now() - t0) / 1000).toFixed(1)} s]`);
}

main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-beta2-04-loss-budget.js
//   invocation:  node research/attack-beta2-04-loss-budget.js
//   code-sha256: b289acea0b62b1bc2bf2bf29a36d410866e118dd34800a111a146d5dd867fc6b
//   out-sha256:  b657ec20a0f407bdae30c58a11c1dc40c9175ecade6981d068858091b547d2e2
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     13.0 s
// ============================================================================
//
// ============================================================================
// 1. THE TRUTH LADDER — exhaustive, both dimensions, and the 22-term check
// ============================================================================
// x    kappa  period        survivors    maxgap   OEIS/repo  ln(gap)/ln(x)
// 2    1      2             1            2        (A048670)  1.0000   [0.0s]
// 2    2      2             1            2        MATCH      1.0000   [0.0s]
// 3    1      6             2            4        (A048670)  1.2619   [0.0s]
// 3    2      6             1            6        MATCH      1.6309   [0.0s]
// 5    1      30            8            6        (A048670)  1.1133   [0.0s]
// 5    2      30            3            12       MATCH      1.5440   [0.0s]
// 7    1      210           48           10       (A048670)  1.1833   [0.0s]
// 7    2      210           15           30       MATCH      1.7479   [0.0s]
// 11   1      2310          480          14       (A048670)  1.1006   [0.0s]
// 11   2      2310          135          42       MATCH      1.5587   [0.0s]
// 13   1      30030         5760         22       (A048670)  1.2051   [0.0s]
// 13   2      30030         1485         66       MATCH      1.6334   [0.0s]
// 17   1      510510        92160        26       (A048670)  1.1500   [0.0s]
// 17   2      510510        22275        108      MATCH      1.6526   [0.0s]
// 19   1      9699690       1658880      34       (A048670)  1.1976   [0.0s]
// 19   2      9699690       378675       150      MATCH      1.7017   [0.0s]
// 23   1      223092870     36495360     40       (A048670)  1.1765   [0.8s]
// 23   2      223092870     7952175      204      MATCH      1.6961   [0.9s]
//
// 1b. The full 22-term ladder and its apparent exponents (x <= 23 verified above).
// x     G2      G2/x      G2/(x ln^2 x)  ln(G2)/ln(x)   local slope
// 2     2       1.000     2.0814         1.0000         -
// 3     6       2.000     1.6571         1.6309         2.710
// 5     12      2.400     0.9265         1.5440         1.357
// 7     30      4.286     1.1318         1.7479         2.723
// 11    42      3.818     0.6640         1.5587         0.744
// 13    66      5.077     0.7717         1.6334         2.706
// 17    108     6.353     0.7914         1.6526         1.836
// 19    150     7.895     0.9106         1.7017         2.953
// 23    204     8.870     0.9022         1.6961         1.609
// 29    258     8.897     0.7846         1.6491         1.013
// 31    348     11.226    0.9520         1.7042         4.487
// 37    528     14.270    1.0945         1.7362         2.356
// 41    546     13.317    0.9657         1.6972         0.327
// 43    618     14.372    1.0159         1.7086         2.601
// 47    708     15.064    1.0162         1.7045         1.528
// 53    870     16.415    1.0414         1.7048         1.715
// 59    966     16.373    0.9848         1.6856         0.976
// 61    1080    17.705    1.0477         1.6991         3.346
// 67    1284    19.164    1.0840         1.7023         1.844
// 71    1398    19.690    1.0836         1.6991         1.467
// 73    1530    20.959    1.1386         1.7091         3.248
// 79    1710    21.646    1.1337         1.7037         1.408
//
//   log-log regression slope, x in [11,43]  (14-term era):  1.9190
//   log-log regression slope, x in [11,79]  (all 18):       1.8182
//   log-log regression slope, x in [47,79]  (the new 8):    1.7249
//   log-log regression slope, x in [2,79]   (everything):   1.7892
//   kappa=1 control, ln(g)/ln(x) at x = 19, 23:            1.1976, 1.1765
//
// ============================================================================
// 2. DP2 — THE DENSITY ENVELOPE, EXACTLY
// ============================================================================
// 2a. V(z) log^2 z against its limit 2 C2 e^{-2gamma}, and V in powers of z.
//     limit 2*C2*e^{-2gamma} = 0.416215   (the corpus digit is 0.41621)
// z          V(z)          V(z)ln^2 z   ratio to limit   ln(1/V)/ln z  (= powers of z DP2 costs)
// 1.1e+1     7.1429e-2     0.41071      0.98677          1.1006
// 2.3e+1     3.9040e-2     0.38381      0.92215          1.0343
// 4.7e+1     2.6636e-2     0.39484      0.94864          0.9417
// 8.0e+1     2.0495e-2     0.39355      0.94554          0.8872
// 1.0e+3     8.6563e-3     0.41305      0.99241          0.6876
// 1.0e+5     3.1382e-3     0.41596      0.99939          0.5007
// 1.0e+7     1.6021e-3     0.41621      1.00000          0.3993   [Mertens continuation]
// 1.0e+12    5.4516e-4     0.41621      1.00000          0.2720   [Mertens continuation]
// 1.0e+30    8.7225e-5     0.41621      1.00000          0.1353   [Mertens continuation]
// 1.0e+100   7.8503e-6     0.41621      1.00000          0.0511   [Mertens continuation]
//
// 2b. The exact Omega(kappa,L) constant our omega needs. The sup over all pairs
//     2 <= z1 < z2 is attained at breakpoints (z1 = p exactly, z2 = q + 0), so a
//     suffix-max over the 283146 primes below 4000000 settles it exactly in that range.
//     kappa = 1:  L* = 0.69315   attained at (z1, z2) = (2, 2+)
//     kappa = 2:  L* = 2.19722   attained at (z1, z2) = (3, 3+)
//
// 2c. Effective dimension kappa_eff(z1,z2) = ln(V(z1)/V(z2)) / ln(ln z2/ln z1).
//     Convergence to kappa is O(1/ln z1), so narrow high ranges wobble; the
//     anchored column [2, z] is the stable one.
// range                     kappa_eff (our omega)   kappa_eff (one-class control)
// [2      , 11         ]     2.1264                  1.1892
// [2      , 23         ]     2.1488                  1.1700
// [2      , 79         ]     2.0976                  1.1249
// [2      , 1000       ]     2.0657                  1.0933
// [2      , 100000     ]     2.0513                  1.0751
// [2      , 4000000    ]     2.0465                  1.0682
// [11     , 79         ]     2.0380                  0.9919
// [79     , 1000       ]     1.9378                  0.9664
// [1000   , 4000000    ]     1.9904                  0.9951
//
// 2d. VERDICT ON DP2. The envelope holds with a small absolute L, the effective
//     dimension is 2 to within the O(1/ln z) that Mertens forces, and V(z) costs
//     2 lnln z / ln z powers of z, which tends to 0. DP2 costs ZERO exponent.
//     The finite-z caveat is the fourth column of 2a: at every z in the exactly
//     known range V(z) is worth roughly ONE FULL POWER of z, not a log factor.
//
// ============================================================================
// 3. DP3 ASYMPTOTIC — the DHR system solved, validated at kappa = 1, read at kappa = 2
// ============================================================================
// 3a. VALIDATION at kappa = 1 (alpha = beta = 2). Closed forms: F = 2e^g/u on
//     [1,3]; f = 2e^g ln(u-1)/u on [2,4]. Both must fall out of the same march.
// u       F computed     F closed       rel.err        f computed     f closed       rel.err
// 1.50    2.37476322     2.37476322     0.00e+0        0.00000000     -              -
// 2.00    1.78107242     1.78107242     2.22e-16       0.00001781     0.00000000     -
// 2.50    1.42485793     1.42485793     2.22e-16       0.57774443     0.57773018     2.47e-5
// 3.00    1.18738161     1.18738161     2.50e-11       0.82304209     0.82303022     1.44e-5
// 3.50    1.06519583     -              -              0.93257026     0.93256009     1.09e-5
// 4.00    1.02164516     -              -              0.97836293     0.97835402     9.10e-6
//     far field (the shooting condition):  F1(20) = 1.00000619, f1(20) = 1.00000629   [both must -> 1]
//
// 3b. kappa = 2 with the Booker-Browning (alpha,beta). The far field is an
//     INDEPENDENT check of the pair: a wrong beta does not converge to 1.
//     F2(20) = 0.99999949,  f2(20) = 0.99999949
//       beta2 -0.15: f2(20) = 1.060889, F2(20) = 1.060849
//       beta2 -0.05: f2(20) = 1.019998, F2(20) = 1.019985
//       beta2 +0.05: f2(20) = 0.980280, F2(20) = 0.980293
//       beta2 +0.15: f2(20) = 0.941878, F2(20) = 0.941918
//     shooting on beta (alpha fixed, f2(20) = 1): beta2 recovered = 4.26660   vs Booker-Browning 4.26645   (rel. 3.51e-5)
//
// 3c. THE RETENTION CURVE. f_kappa(u) is the fraction of the true main term
//     H V(z) that the certificate keeps at level z^u. This IS the DP3 price.
// u        f2(u)      F2(u)      f1(u)      F1(u)     f2/f1
// 4.2665   0.000059   1.680938   0.988671   1.011557  0.0001
// 4.3000   0.038803   1.663753   0.989564   1.010655  0.0392
// 4.5000   0.240280   1.570435   0.993638   1.006482  0.2418
// 5.0000   0.578997   1.392835   0.998249   1.001745  0.5800
// 5.3577   0.727507   1.301512   0.999344   1.000663  0.7280
// 6.0000   0.884369   1.113607   0.999902   1.000111  0.8845
// 7.0000   0.979737   1.020502   1.000002   1.000011  0.9797
// 8.0000   0.997329   1.002663   1.000006   1.000006  0.9973
// 10.0000  0.999976   1.000023   1.000006   1.000006  1.0000
// 12.0000  0.999999   1.000000   1.000006   1.000006  1.0000
// 16.0000  0.999999   0.999999   1.000006   1.000006  1.0000
// 20.0000  0.999999   0.999999   1.000006   1.000006  1.0000
//
//     retention level    u at kappa=2     u at kappa=1     ratio
//     f >= 0.000001      4.2665           2.0000           2.1332
//     f >= 0.01          4.2750           2.0056           2.1315
//     f >= 0.1           4.3558           2.0595           2.1150
//     f >= 0.25          4.5110           2.1640           2.0845
//     f >= 0.5           4.8554           2.4007           2.0225
//     f >= 0.75          5.4266           2.8050           1.9346
//     f >= 0.9           6.0971           3.3047           1.8450
//     f >= 0.99          7.3650           4.3174           1.7059
//
// ============================================================================
// 4. THE CERTIFIED THRESHOLD, EXACT REMAINDERS, ALL 22 LEVELS
// ============================================================================
// 4a. Constant-free comparison: the asymptotic shape x^{beta2} against truth.
// x     G2        x^beta2        ratio          log_x(ratio)
// 2     2         1.9246e+1      9.623e+0       3.2665
// 3     6         1.0855e+2      1.809e+1       2.6355
// 5     12        9.5967e+2      7.997e+1       2.7225
// 7     30        4.0324e+3      1.344e+2       2.5186
// 11    42        2.7736e+4      6.604e+2       2.7077
// 13    66        5.6570e+4      8.571e+2       2.6330
// 17    108       1.7768e+5      1.645e+3       2.6139
// 19    150       2.8559e+5      1.904e+3       2.5647
// 23    204       6.4527e+5      3.163e+3       2.5703
// 29    258       1.7348e+6      6.724e+3       2.6174
// 31    348       2.3058e+6      6.626e+3       2.5622
// 37    528       4.9052e+6      9.290e+3       2.5303
// 41    546       7.6008e+6      1.392e+4       2.5693
// 43    618       9.3135e+6      1.507e+4       2.5578
// 47    708       1.3612e+7      1.923e+4       2.5620
// 53    870       2.2727e+7      2.612e+4       2.5617
// 59    966       3.5913e+7      3.718e+4       2.5808
// 61    1080      4.1402e+7      3.834e+4       2.5674
// 67    1284      6.1781e+7      4.812e+4       2.5641
// 71    1398      7.9123e+7      5.660e+4       2.5673
// 73    1530      8.9079e+7      5.822e+4       2.5573
// 79    1710      1.2478e+8      7.297e+4       2.5627
//
// 4b. The threshold the theorem ACTUALLY certifies at each finite z, with the
//     exact divisor remainder sum and the o(1) generously set to zero.
//     H*(z) = min H such that some level y makes H V(z) f2(ln y/ln z) > 2 sum_{m<y} 4^nu omega.
// x     ln z    V(z)        u* (opt)  ln H*      H*             log_x(H*)   H*/G2       overhead ln H* - beta2 ln z
// 2     1.099   5.000e-1    13.624   3.00       2.000e+1       4.322       1.00e+1     -1.69
// 3     1.386   1.667e-1    13.615   6.29       5.400e+2       5.727       9.00e+1     0.38
// 5     1.792   1.000e-1    13.620   9.00       8.100e+3       5.592       6.75e+2     1.36
// 7     2.079   7.143e-2    13.615   11.53      1.021e+5       5.927       3.40e+3     2.66
// 11    2.485   5.844e-2    13.619   13.93      1.123e+6       5.810       2.67e+4     3.33
// 13    2.639   4.945e-2    13.618   16.30      1.194e+7       6.353       1.81e+5     5.04
// 17    2.890   4.363e-2    13.622   18.62      1.218e+8       6.571       1.13e+6     6.29
// 19    2.996   3.904e-2    5.128    20.80      1.077e+9       7.063       7.18e+6     8.02
// 23    3.178   3.565e-2    4.889    22.28      4.755e+9       7.107       2.33e+7     8.72
// 29    3.401   3.319e-2    4.725    23.60      1.768e+10      7.007       6.85e+7     9.08
// 31    3.466   3.105e-2    4.636    24.46      4.190e+10      7.123       1.20e+8     9.67
// 37    3.638   2.937e-2    4.552    25.52      1.208e+11      7.067       2.29e+8     10.00
// 41    3.738   2.794e-2    4.555    26.31      2.662e+11      7.084       4.87e+8     10.36
// 43    3.784   2.664e-2    4.552    26.85      4.589e+11      7.139       7.43e+8     10.71
// 47    3.871   2.550e-2    4.525    27.48      8.632e+11      7.138       1.22e+9     10.97
// 53    3.989   2.454e-2    4.517    28.20      1.760e+12      7.102       2.02e+9     11.18
// 59    4.094   2.371e-2    4.520    28.84      3.353e+12      7.073       3.47e+9     11.37
// 61    4.127   2.293e-2    4.514    29.19      4.762e+12      7.101       4.41e+9     11.58
// 67    4.220   2.225e-2    4.518    29.75      8.299e+12      7.075       6.46e+9     11.74
// 71    4.277   2.162e-2    4.514    30.15      1.240e+13      7.073       8.87e+9     11.90
// 73    4.304   2.103e-2    4.494    30.43      1.648e+13      7.093       1.08e+10    12.07
// 79    4.382   2.049e-2    4.490    30.89      2.592e+13      7.069       1.52e+10    12.19
//
// 4c. The sixth discard nobody named: the o(1). Theorem 9.1 carries
//     O((ln ln y)^2 / (ln y)^{1/(2k+2)}) = O((ln ln y)^2/(ln y)^{1/6}) at k=2.
//     It costs ZERO in the exponent and is larger than f2 <= 1 at every
//     computable z. Where does it first drop below 1 (implied constant 1)?
// ln z          ln y = beta2 ln z    (lnln y)^2/(ln y)^{1/6}    f2 usable?
// 4.37e+0       1.864e+1             5.256e+0                  no
// 1.00e+1       4.266e+1             7.536e+0                  no
// 1.00e+2       4.266e+2             1.337e+1                  no
// 1.00e+3       4.266e+3             1.735e+1                  no
// 1.00e+6       4.266e+6             1.830e+1                  no
// 1.00e+12      4.266e+12            6.641e+0                  no
// 1.00e+16      4.266e+16            2.481e+0                  no
// 1.00e+18      4.266e+18            1.445e+0                  no
// 1.60e+20      6.826e+20            7.756e-1                  yes
// 1.00e+22      4.266e+22            4.593e-1                  yes
//
// ============================================================================
// 5. DP4 — THE REMAINDERS, EXACTLY OVER A FULL PERIOD
// ============================================================================
// 5a. Tightness of the trivial bound |r_d| <= omega(d), all 256 divisors of 19#,
//     exact max over every window position of the full period. The sieve only
//     ever uses d < y, so the d <= H column is the one that prices DP4.
// H        max over d <= H     max over ALL d      #d<=H with ratio > 0.8   mean ratio, d <= H
// 150      0.823529           0.823529            2 of 42                  0.34683
// 1000     0.823529           0.823529            1 of 91                  0.30589
// 10000    0.882353           0.882353            2 of 165                 0.26879
// 100000   0.846154           0.846154            3 of 222                 0.22529
//
// 5b. Signed against absolute at level D. Theorem 9.1 charges
//     2 sum_{m<y} 4^nu(m) |r_m|. The identity sum_{d|P(z)} mu(d) r_d(t) =
//     N(t) - H V(z) says the SIGNED object is the count deviation itself.
//     Both sides are computed exactly over the whole period below.
// x   H      D=H    #d<=D  DP4 charge 2*4^nu   sum max|r_d|   max_t|signed|   signed/charge   gamma=ln(sgn)/ln D   theta=1/gamma
// 13  66     66     22     711.6               16.72          5.45            7.65e-3         0.4045               2.4719
// 13  264    264    36     3933.3              39.57          8.92            2.27e-3         0.3924               2.5483
// 13  1056   1056   50     11490.6             65.82          6.73            5.85e-4         0.2737               3.6530
// 17  108    108    32     1829.3              35.31          7.62            4.16e-3         0.4337               2.3057
// 17  432    432    55     7085.3              68.27          9.62            1.36e-3         0.3731               2.6805
// 17  1728   1728   79     25650.0             124.84         15.01           5.85e-4         0.3634               2.7520
// 19  150    150    42     2532.6              46.45          11.39           4.50e-3         0.4854               2.0600
// 19  600    600    78     12462.8             101.33         16.00           1.28e-3         0.4335               2.3070
// 19  2400   2400   119    41312.5             181.30         19.30           4.67e-4         0.3803               2.6294
//
// 5c. VERDICT ON DP4. Per term the trivial bound is nearly attained, so nothing
//     is lost there. What is lost is the SIGN: the signed sum over the divisor
//     lattice is D^gamma with gamma near 1/2 at every scale checkable here,
//     while the charge is D^1 times a 4^nu weight. gamma = 1/2 exactly would
//     put theta = 2, which is the vector sieve full-decoupling target.
//
// ============================================================================
// 6. DP3 FINITE — Buchstab strata priced at their own worst case, exactly
// ============================================================================
// x    G2    H1 = min H with sum_i max_t B_i < H    H1/G2   log_x(H1)   log_x(G2)
// 7    30    36                                    1.20    1.8416      1.7479
// 11   42    72                                    1.71    1.7835      1.5587
// 13   66    144                                   2.18    1.9376      1.6334
// 17   108   174                                   1.61    1.8209      1.6526
// 19   150   354                                   2.36    1.9933      1.7017
//
// 6b. Brun depth truncation for scale: the crudest valid truncation. rho_k =
//     (sum_{j<=k} (-1)^j e_j) / V is the retention at Bonferroni depth k; the
//     level is the product of the k largest primes <= x.
// x     kappa   min odd k with rho_k > 0    level exponent s = ln D_k / ln x    ln ln x
// 19    1       3                          2.833                              1.080
// 19    2       5                          4.309                              1.080
// 43    1       3                          2.947                              1.325
// 43    2       7                          6.372                              1.325
// 79    1       5                          4.861                              1.475
// 79    2       7                          6.702                              1.475
// 200   1       5                          4.962                              1.667
// 200   2       9                          8.841                              1.667
// 1000  1       5                          4.988                              1.933
// 1000  2       11                         10.940                             1.933
// 10000 1       7                          6.996                              2.220
// 10000 2       13                         12.988                             2.220
//
// ============================================================================
// 7. THE EXACT LEVEL-D OPTIMUM — the finite-z analogue of f_kappa
// ============================================================================
// 7a. Retention curves. The kappa = 1 column is the CALIBRATION: its asymptotic
//     sifting limit beta_1 = 2 is proven optimal (Selberg), so whatever the
//     finite-z instrument reads there is its bias, and the kappa = 2 reading
//     must be corrected by the same bias before it means anything.
//
//   x = 7  (ln(x#)/ln x = 2.748, so levels above that do not exist)   self-checks PASS both kappa
//     D          s=lnD/lnx   rho*(kappa=1)   rho*(kappa=2)   f2(s) DHR    f1(s) DHR
//     1          0.0000      0.000000        0.000000        0.000000     0.000000
//     2          0.3562      0.000000        0.000000        0.000000     0.000000
//     5          0.8271      0.000000        0.000000        0.000000     0.000000
//     10         1.1833      0.395833        0.000000        0.000000     0.000000
//     21         1.5646      0.708333        0.000000        0.000000     0.000000
//     35         1.8271      0.854167        0.066667        0.000000     0.000000
//     70         2.1833      0.958333        0.733333        0.000000     0.274610
//     210        2.7479      1.000000        1.000000        0.000000     0.723880
//
//   x = 11  (ln(x#)/ln x = 3.230, so levels above that do not exist)   self-checks PASS both kappa
//     D          s=lnD/lnx   rho*(kappa=1)   rho*(kappa=2)   f2(s) DHR    f1(s) DHR
//     1          0.0000      0.000000        0.000000        0.000000     0.000000
//     2          0.2891      0.000000        0.000000        0.000000     0.000000
//     5          0.6712      0.000000        0.000000        0.000000     0.000000
//     10         0.9603      0.000000        0.000000        0.000000     0.000000
//     21         1.2697      0.341667        0.000000        0.000000     0.000000
//     35         1.4827      0.720833        0.000000        0.000000     0.000000
//     66         1.7472      0.908333        0.377778        0.000000     0.000000
//     110        1.9603      0.931250        0.377778        0.000000     0.000000
//     210        2.2299      0.968750        0.703704        0.000000     0.330600
//     385        2.4827      0.983333        0.911111        0.000000     0.565123
//     770        2.7718      0.997917        0.911111        0.000000     0.735088
//     2310       3.2299      1.000000        1.000000        0.000000     0.884465
//
//   x = 13  (ln(x#)/ln x = 4.020, so levels above that do not exist)   self-checks PASS both kappa
//     D          s=lnD/lnx   rho*(kappa=1)   rho*(kappa=2)   f2(s) DHR    f1(s) DHR
//     1          0.0000      0.000000        0.000000        0.000000     0.000000
//     2          0.2702      0.000000        0.000000        0.000000     0.000000
//     5          0.6275      0.000000        0.000000        0.000000     0.000000
//     10         0.8977      0.000000        0.000000        0.000000     0.000000
//     21         1.1870      0.000000        0.000000        0.000000     0.000000
//     35         1.3861      0.580382        0.000000        0.000000     0.000000
//     65         1.6275      0.704514        0.000000        0.000000     0.000000
//     105        1.8144      0.875174        0.000000        0.000000     0.000000
//     182        2.0289      0.890972        0.000000        0.000000     0.050025
//     330        2.2609      0.944965        0.558249        0.000000     0.365267
//     546        2.4572      0.975000        0.765657        0.000000     0.545850
//     910        2.6564      0.987500        0.765657        0.000000     0.676709
//     2002       2.9638      0.993403        0.830303        0.000000     0.811129
//     4290       3.2609      0.998785        0.962290        0.000000     0.891135
//     10010      3.5912      0.999653        0.989226        0.000000     0.944432
//     30030      4.0196      1.000000        1.000000        0.000000     0.979361
//
//   x = 17  (ln(x#)/ln x = 4.639, so levels above that do not exist)   self-checks PASS both kappa
//     D          s=lnD/lnx   rho*(kappa=1)   rho*(kappa=2)   f2(s) DHR    f1(s) DHR
//     1          0.0000      0.000000        0.000000        0.000000     0.000000
//     2          0.2447      0.000000        0.000000        0.000000     0.000000
//     5          0.5681      0.000000        0.000000        0.000000     0.000000
//     10         0.8127      0.000000        0.000000        0.000000     0.000000
//     17         1.0000      0.000000        0.000000        0.000000     0.000000
//     30         1.2005      0.290809        0.000000        0.000000     0.000000
//     51         1.3878      0.585623        0.000000        0.000000     0.000000
//     85         1.5681      0.740571        0.000000        0.000000     0.000000
//     143        1.7517      0.821257        0.000000        0.000000     0.000000
//     231        1.9209      0.878624        0.000000        0.000000     0.000000
//     374        2.0910      0.906272        0.183300        0.000000     0.148392
//     663        2.2931      0.949045        0.598114        0.000000     0.399286
//     1105       2.4734      0.968533        0.598114        0.000000     0.558171
//     1785       2.6426      0.976693        0.697059        0.000000     0.669009
//     3003       2.8262      0.988683        0.843591        0.000000     0.759094
//     4862       2.9963      0.994444        0.898002        0.000000     0.821862
//     7854       3.1656      0.997895        0.954209        0.000000     0.869498
//     13090      3.3459      0.998492        0.954209        0.000000     0.907785
//     23205      3.5480      0.999316        0.963367        0.000000     0.939042
//     39270      3.7336      0.999718        0.984916        0.000000     0.959453
//     72930      3.9521      0.999913        0.997845        0.000000     0.975716
//     170170     4.2512      0.999989        0.997845        0.000000     0.988239
//     510510     4.6390      1.000000        1.000000        0.354700     0.995517
//
//   x = 19  (ln(x#)/ln x = 5.464, so levels above that do not exist)   self-checks PASS both kappa
//     D          s=lnD/lnx   rho*(kappa=1)   rho*(kappa=2)   f2(s) DHR    f1(s) DHR
//     1          0.0000      0.000000        0.000000        0.000000     0.000000
//     2          0.2354      0.000000        0.000000        0.000000     0.000000
//     5          0.5466      0.000000        0.000000        0.000000     0.000000
//     10         0.7820      0.000000        0.000000        0.000000     0.000000
//     17         0.9622      0.000000        0.000000        0.000000     0.000000
//     30         1.1551      0.000000        0.000000        0.000000     0.000000
//     51         1.3353      0.464286        0.000000        0.000000     0.000000
//     85         1.5088      0.627842        0.000000        0.000000     0.000000
//     143        1.6855      0.764301        0.000000        0.000000     0.000000
//     231        1.8484      0.824855        0.000000        0.000000     0.000000
//     374        2.0120      0.864297        0.000000        0.000000     0.021163
//     627        2.1875      0.919705        0.398851        0.000000     0.279853
//     1045       2.3610      0.946137        0.398851        0.000000     0.465025
//     1729       2.5320      0.959147        0.480737        0.000000     0.600135
//     2805       2.6963      0.974334        0.698887        0.000000     0.698172
//     4522       2.8585      0.984358        0.811057        0.000000     0.772348
//     7293       3.0208      0.991182        0.850119        0.000000     0.829587
//     12155      3.1943      0.995875        0.899555        0.000000     0.876378
//     19635      3.3572      0.997409        0.918949        0.000000     0.909831
//     33915      3.5428      0.998568        0.932597        0.000000     0.938374
//     57057      3.7195      0.999296        0.969103        0.000000     0.958132
//     92378      3.8831      0.999580        0.984662        0.000000     0.971358
//     149226     4.0460      0.999800        0.991761        0.000000     0.980639
//     248710     4.2195      0.999915        0.991761        0.000000     0.987293
//     440895     4.4139      0.999935        0.994296        0.159438     0.992119
//     746130     4.5926      0.999985        0.998437        0.318578     0.994959
//     1385670    4.8028      0.999996        0.999408        0.467976     0.997057
//     3233230    5.0906      0.999999        0.999831        0.622342     0.998628
//     9699690    5.4637      1.000000        1.000000        0.761437     0.999515
//
//   x = 23  (ln(x#)/ln x = 6.131, so levels above that do not exist)   self-checks PASS both kappa
//     D          s=lnD/lnx   rho*(kappa=1)   rho*(kappa=2)   f2(s) DHR    f1(s) DHR
//     1          0.0000      0.000000        0.000000        0.000000     0.000000
//     2          0.2211      0.000000        0.000000        0.000000     0.000000
//     5          0.5133      0.000000        0.000000        0.000000     0.000000
//     10         0.7344      0.000000        0.000000        0.000000     0.000000
//     17         0.9036      0.000000        0.000000        0.000000     0.000000
//     30         1.0847      0.000000        0.000000        0.000000     0.000000
//     51         1.2540      0.352500        0.000000        0.000000     0.000000
//     85         1.4169      0.523491        0.000000        0.000000     0.000000
//     138        1.5714      0.710449        0.000000        0.000000     0.000000
//     221        1.7216      0.773756        0.000000        0.000000     0.000000
//     357        1.8746      0.823850        0.000000        0.000000     0.000000
//     595        2.0375      0.881776        0.030253        0.000000     0.064375
//     966        2.1921      0.923332        0.192886        0.000000     0.285494
//     1547       2.3422      0.936932        0.282571        0.000000     0.447653
//     2530       2.4991      0.954219        0.462520        0.000000     0.577111
//     4186       2.6597      0.971024        0.663846        0.000000     0.678559
//     6783       2.8136      0.981031        0.756833        0.000000     0.753727
//     11305      2.9766      0.989967        0.834210        0.000000     0.815416
//     18354      3.1311      0.994274        0.855451        0.000000     0.860817
//     29393      3.2813      0.996221        0.863737        0.000000     0.895347
//     48070      3.4382      0.997856        0.910696        0.000000     0.923398
//     79534      3.5988      0.998658        0.945799        0.000000     0.945329
//     129030     3.7531      0.999243        0.971552        0.000000     0.961210
//     213486     3.9137      0.999600        0.979184        0.000000     0.973369
//     345345     4.0671      0.999774        0.983513        0.000000     0.981602
//     559130     4.2208      0.999852        0.987745        0.000000     0.987332
//     903210     4.3737      0.999933        0.994497        0.118709     0.991294
//     1448655    4.5244      0.999964        0.997026        0.261718     0.994015
//     2348346    4.6784      0.999984        0.998519        0.383971     0.995946
//     3913910    4.8414      0.999992        0.999149        0.491649     0.997338
//     6374082    4.9969      0.999996        0.999252        0.577435     0.998235
//     10623470   5.1598      0.999998        0.999437        0.652629     0.998864
//     17160990   5.3128      0.999999        0.999831        0.711901     0.999256
//     31870410   5.5102      1.000000        0.999976        0.775120     0.999576
//     74364290   5.7804      1.000000        0.999976        0.842405     0.999808
//     223092870  6.1308      1.000000        1.000000        0.905053     0.999936
//
// 7b. THE CALIBRATED READING. s* is the smallest level exponent at which the
//     exact one-point optimum is positive at all; s50/s90/s99 are where it
//     reaches half, nine tenths and 99 per cent of the true density.
//     CALIBRATION: at kappa = 1 the asymptotic answer is beta_1 = 2, PROVEN
//     optimal. Whichever column reproduces 2 there is the column to read at
//     kappa = 2 against beta_2 = 4.26645.
// x     s*(k=1)  s50(k=1) s90(k=1) s99(k=1)   s*(k=2)  s50(k=2) s90(k=2) s99(k=2)   s90 ratio
// 7     1.1833   1.3562   1.9208   2.7479     1.7479   1.9208   2.7479   2.7479     1.4306
// 11    1.1006   1.2891   1.7472   2.5587     1.7472   2.2299   2.4184   3.2299     1.3841
// 13    1.2051   1.3260   2.0558   2.8326     2.0847   2.2609   3.0196   4.0196     1.4688
// 17    1.1500   1.3192   2.0468   2.8368     2.0468   2.2005   3.0468   3.7926     1.4886
// 19    1.1976   1.4229   2.1174   2.9885     2.0262   2.5428   3.2562   3.9885     1.5379
// 23    1.1601   1.3895   2.1197   2.9782     2.0238   2.5234   3.4092   4.2881     1.6083
//
// 7c. THE CALIBRATED ONE-POINT FLOOR. Each statistic at kappa = 2, rescaled by
//     the factor that statistic needs at kappa = 1 to reproduce the PROVEN
//     beta_1 = 2. Four independent rescalings of the same LP.
// x       via s*     via s50    via s90    via s99      spread
// 7       2.9542     2.8326     2.8612     2.0000     0.9542
// 11      3.1751     3.4597     2.7683     2.5246     0.9351
// 13      3.4597     3.4100     2.9376     2.8381     0.6217
// 17      3.5598     3.3360     2.9771     2.6739     0.8859
// 19      3.3837     3.5741     3.0758     2.6692     0.9049
// 23      3.4889     3.6321     3.2166     2.8797     0.7524
//
//     Pooled over x = 13..23 (16 readings): mean 3.195, range 2.669 to 3.632, against DHR beta_2 = 4.2665.
//
//   READ THIS AS: rho* is the best ANY level-D one-point minorant can do for
//   our exact density at that z, parity adversary included (the LP is free to
//   put all its mass on cells of one Omega-parity). Where rho* > f the DHR
//   truncation is leaving main term on the table. The kappa = 1 column says how
//   much of that gap is finite-z bias rather than method slack. HONEST LIMIT:
//   s90 and s99 at kappa = 2 are still rising at x = 23 while their kappa = 1
//   counterparts converged by x = 13, so the rescaling is the only thing making
//   these comparable, and it is a calibration, not a theorem.
//
// ============================================================================
// 8. THE LOSS BUDGET AND THE ELASTICITY OF THE EXPONENT
// ============================================================================
// The certified exponent is E = beta / theta: beta the sifting limit of the
// positivity method, theta the level exponent (level = H^theta). DHR runs at
// beta = 4.26645, theta = 1. Truth is E = 1 asymptotically and
// log_x(G2) = 1.70, flat, everywhere in the exactly known range.
//
// 8a. THE BUDGET. Every line is a number this script computed.
// line                                     exponent   cumulative   basis
// truth (asymptotic belief)                +1.0000     1.0000       x ln^a x; log_x G2 = 1.70 flat at x <= 79 (sec 1)
// DP1: the one-point / level-D floor       +2.1945     3.1945       exact LP, calibrated on proven beta_1 = 2 (sec 7c); bracket 2.67-3.63
// DP2+DP3: adversarial omega + truncation  +1.0719     4.2665       residual: DHR beta_2 minus the measured floor
// DP2 alone: envelope validity             +0.0000     4.2665       L* = 2.19722 exact, kappa_eff = 2.05, V costs 2lnln z/ln z -> 0 (sec 2)
// DP4 at theta = 1                         +0.0000     4.2665       max|r_d|/omega(d) = 0.88 attained; level H^{1-eps} free (sec 5a)
// DP6: the o(1) (unnamed in the discard map)+0.0000     4.2665       zero in the exponent; +2.80 at x = 79 (sec 4b, 4c)
// RESIDUAL after all lines: 0.000000  (zero by construction; the
//   honest uncertainty is entirely in the DP1 line, whose bracket is +-0.4).
//
//   The two big lines, said plainly:
//   * 2.19 of the 3.27 is the ONE-POINT FLOOR itself. No sieve of any kind that
//     reads only divisor-class counts gets under it, at any level. At least 1.00
//     of it is the parity adversary, which the LP contains explicitly.
//   * 1.07 is what DHR pays ON TOP of that floor: the price of a truncation
//     that must survive every omega in Omega(kappa,L), not just ours. That is the
//     only piece a better positivity method could recover, and it is small.
//
// 8b. ELASTICITIES at the working point (beta, theta) = (4.26645, 1).
//   dE/dbeta  = 1/theta       = 1.0000    per unit of beta
//   dE/dtheta = -beta/theta^2 = -4.2665   per unit of theta
//   dlnE/dlnbeta = +1,  dlnE/dlntheta = -1: per PROPORTIONAL improvement the two
//   knobs are EXACTLY equal. A factor c in either divides the exponent by c.
//   So the ranking is decided by HEADROOM and by whether a consumer exists.
//
// rank  knob                        headroom              E at the limit   consumer
// 1     theta (DP4 absolute values) 1 -> 2 (measured)     2.1332           vector sieve + Lemma V
// 2     beta  (DP2+DP3 truncation)  4.266 -> 3.195        3.1945           none in the literature
// 3     DP1   (one-point data)      3.195 -> 1 (parity)   1.0000           none; this is the wall
// 4     DP2 envelope L, DP6 o(1)    none                  4.2665           elasticity exactly 0
//
//   Both knobs at their measured limits: beta = 3.195, theta = 2 gives E = 1.5973.
//   The measured truth exponent over the same range is 1.70. Those two numbers
//   agree to 6.2 per cent, which is the strongest single check in this file.
//
// 8c. THE COUPLING nobody prices: the two knobs are not independent. The one
//     mechanism that buys theta = 2 (Brudern-Fouvry) factors the two-class
//     condition into two LINEAR sieves, so it pays for theta in beta:
//       beta 4.2665 -> 5.2974 = 2(1+sqrt e)   (a 24.2 per cent penalty)
//       theta 1 -> 2                          (a 100.0 per cent gain)
//       net E 4.2665 -> 2.6487                 (gain 1.6177)
//     Partial decoupling: any theta > 1.2417 already beats 4.26645.
//
// 8d. WHAT EACH TARGET COSTS, as the factor c needed in either knob.
// target                             E        c = 4.26645/E   beta must reach   or theta must reach
// beat 4.26645 at all                4.2664   1.0000          4.2664            1.0000
// the measured one-point floor       3.1945   1.3355          3.1945            1.3355
// vector sieve, full decoupling      2.6487   1.6108          2.6487            1.6108
// TPC-equivalent line                2.0000   2.1332          2.0000            2.1332
// the measured law                   1.7037   2.5042          1.7037            2.5042
// truth                              1.0000   4.2665          1.0000            4.2665
//
//   Reading the last two rows: reaching exponent 2 needs c = 2.13 and reaching
//   1 needs c = 4.27. The measured theta headroom is c = 2 and the measured beta
//   headroom is c = 1.336. Their product is 2.671, which lands at E = 1.597: the two
//   knobs together reach the measured law and stop short of exponent 1.
//
// [total 12.8 s]
// ============================================================================
// READINGS
// ============================================================================
// 0. THE ABRIDGED SUMMARY OF THE 2026-08-18 RUN, kept verbatim.
//    This eight-section summary stood INSIDE the OUTPUT region until
//    2026-08-19, where it was the only thing there: it was written by hand
//    from the run's 531 printed lines, and nothing printed it. It is moved
//    here unchanged so that the OUTPUT block above can be what it claims to
//    be, a recording of a run. PROVENANCE: every figure below is a rounding
//    or a transcription of a figure the run prints (0.8824 for 0.882353,
//    0.8462 for 0.846154, 2.2e-16 for 2.2204e-16, and columns quoted as
//    ranges such as 1.20 to 2.36 and 2.55-2.57); nothing here is computed
//    outside this script. Section 1 of the header banner records the defect
//    in the run's section 6, which this summary reproduces unedited.
//
//    "OUTPUT (2026-08-18, node, 10.3 s end to end, ~250 MB peak; abridged —
//    the full 531 lines come out of a plain re-run)"
//
// 1. TRUTH. All nine exhaustive kappa=2 values MATCH the ladder: 2, 6, 12, 30,
//    42, 66, 108, 150, 204 through the complete periods of 2# .. 23#. The
//    kappa=1 control reproduces A048670: 2, 4, 6, 10, 14, 22, 26, 34, 40.
//    log-log regression slopes: 1.9190 (x<=43), 1.8182 (x in [11,79]),
//    1.7249 (x in [47,79]) — the three numbers the brief quotes, reproduced.
//    But POINTWISE log_x(G2) is FLAT at 1.65-1.74 from x = 7 to x = 79
//    (1.7017, 1.6961, 1.6491, ..., 1.7091, 1.7037). kappa=1: 1.18, flat.
//
// 2. DP2.  V(z) ln^2 z -> 0.416215 = 2 C2 e^{-2gamma}; ratio to the limit
//    0.9455 at z = 80, 0.9992 at z = 1000.
//    Exact envelope constant: kappa=1 L* = 0.69315 at (2, 2+);
//                             kappa=2 L* = 2.19722 at (3, 3+).
//    kappa_eff on [2, 4e6]: 2.0465 (ours) / 1.0682 (one-class control).
//    ln(1/V)/ln z = 1.1006 (z=11), 0.8872 (z=80), 0.3993 (z=1e7), 0.0511 (1e100).
//
// 3. DP3 ASYMPTOTIC.  kappa=1 validation against the closed forms: F to
//    2.2e-16, f to 2.5e-5. Far field F1(20) = 1.00000619, f1(20) = 1.00000629.
//    kappa=2 with Booker-Browning (alpha,beta): F2(20) = f2(20) = 0.99999949.
//    Shooting on beta with alpha fixed recovers beta2 = 4.26660 against the
//    published 4.26645028414864191641 — relative 3.5e-5, an INDEPENDENT
//    computation of the sifting limit.
//    u        f2(u)      f1(u)        f>= level    u(kappa=2)  u(kappa=1)  ratio
//    4.2665   0.000059   0.988671     1e-6         4.2665      2.0000      2.1332
//    4.5000   0.240280   0.993638     0.25         4.5110      2.1640      2.0845
//    5.0000   0.578997   0.998249     0.50         4.8554      2.4007      2.0225
//    6.0000   0.884369   0.999902     0.90         6.0971      3.3047      1.8450
//    8.0000   0.997329   1.000006     0.99         7.3650      4.3174      1.7059
//
// 4. THE CERTIFIED THRESHOLD, exact divisor remainder sums, o(1) set to zero:
//    x     ln H*   H*          log_x(H*)  H*/G2      overhead ln H* - beta2 ln z
//    19    20.80   1.077e+9    7.063      7.18e+6    8.02
//    43    26.85   4.589e+11   7.139      7.43e+8    10.71
//    79    30.89   2.592e+13   7.069      1.52e+10   12.19
//    Constant-free x^beta2 / G2 = 7.297e+4 at x = 79, i.e. x^2.5627; the
//    log_x(x^beta2/G2) column sits at 2.55-2.57 for every x >= 19.
//    The o(1): (lnln y)^2/(ln y)^{1/6} at y = z^beta2 first drops below 1 at
//    ln z ~ 1.6e20. Peak value 18.3 at ln z = 1e6.
//
// 5. DP4.  max over d <= H of max_t |r_d|/omega(d) = 0.8235, 0.8235, 0.8824,
//    0.8462 at H = 150, 1e3, 1e4, 1e5 (19#, every window position).
//    Signed against the Theorem 9.1 charge, whole period:
//    x   H      charge     sum max|r_d|  max_t|signed|  gamma  theta = 1/gamma
//    19  150    2532.6     46.45         11.39          0.4854 2.0600
//    19  600    12462.8    101.33        16.00          0.4335 2.3070
//    19  2400   41312.5    181.30        19.30          0.3803 2.6294
//
// 6. DP3 FINITE. Exact Buchstab strata, each priced at its own worst case over
//    the whole period:  H1 = 36, 72, 144, 174, 354 at x = 7, 11, 13, 17, 19,
//    against G2 = 30, 42, 66, 108, 150. Ratio 1.20 to 2.36. log_x(H1) = 1.78
//    to 1.99 against log_x(G2) = 1.56 to 1.75.
//    Brun depth truncation, for scale: kappa=2 needs level exponent 4.31, 6.37,
//    6.70, 8.84, 10.94, 12.99 at x = 19, 43, 79, 200, 1e3, 1e4 — unbounded.
//
// 7. THE LEVEL-D LINEAR PROGRAM. Self-checks rho*(x#) = 1 and rho*(1) = 0 PASS
//    at all six x and both dimensions.
//    x     s*(k=1) s50(k=1) s90(k=1) s99(k=1)  s*(k=2) s50(k=2) s90(k=2) s99(k=2)
//    13    1.2051  1.3260   2.0558   2.8326    2.0847  2.2609   3.0196   4.0196
//    17    1.1500  1.3192   2.0468   2.8368    2.0468  2.2005   3.0468   3.7926
//    19    1.1976  1.4229   2.1174   2.9885    2.0262  2.5428   3.2562   3.9885
//    23    1.1601  1.3895   2.1197   2.9782    2.0238  2.5234   3.4092   4.2881
//    Calibrated on the PROVEN beta_1 = 2, pooled over x = 13..23, 16 readings:
//    the one-point floor at dimension 2 is 3.195, range 2.669 to 3.632.
//
// 8. THE BUDGET (exponent, cumulative):
//    truth                                    1.0000   1.0000
//    DP1, the one-point / level-D floor      +2.1945   3.1945   [+-0.4]
//    DP2+DP3, adversarial omega + truncation +1.0719   4.2665
//    DP2 envelope validity                   +0.0000   4.2665
//    DP4 at theta = 1                        +0.0000   4.2665
//    DP6, the o(1)                           +0.0000   4.2665   [+2.80 at x=79]
//    residual 0.000000.
//    Elasticities: dE/dbeta = 1.0000, dE/dtheta = -4.2665; dlnE/dlnbeta = +1,
//    dlnE/dlntheta = -1, so a factor c in EITHER knob divides E by exactly c.
//    Both knobs at their measured limits (beta = 3.195, theta = 2): E = 1.597,
//    against the measured log_x(G2) = 1.70. Agreement 6.2 per cent.
//
// 1. THE LOSS IS NOT WHERE THE DISCARD MAP PUTS IT. sift-limit-attack.md calls
//    DP3 "where the dimension-2 price is actually paid". Measured, DP3's own
//    truncation is the SMALL half. The exact level-D linear program — the best
//    main term any minorant reading only divisor-class counts can carry, with
//    the parity adversary explicitly inside it — puts the one-point floor at
//    3.195 (bracket 2.67 to 3.63) after calibration against the proven
//    beta_1 = 2. So of the 3.2665 between DHR and truth, 2.19 is the one-point
//    floor and only 1.07 is anything a better positivity method could recover.
//    DP1 is not "the master discard whose refinements are DP2-DP4"; it is
//    two thirds of the entire loss, by measurement.
//
// 2. DP2 IS FREE, VERIFIED RATHER THAN ASSUMED. The envelope our omega needs
//    is Omega(2, 2.19722) with the sup attained at the degenerate pair
//    (3, 3+); kappa_eff = 2.0465 on [2, 4e6]; V(z) costs 2 lnln z / ln z powers
//    of z, which is 0.0511 at z = 1e100. Elasticity of the exponent to L is
//    exactly zero. The file's prediction holds. One finite-z caveat it does
//    not make: at every z in the exactly known range V(z) is worth about ONE
//    FULL POWER of z (1.1006 at z = 11, 0.8872 at z = 80), not a log factor.
//
// 3. DP4 IS FREE PER TERM AND SATURATED, WHICH IS NOT THE SAME AS FREE. The
//    trivial |r_d| <= omega(d) is attained to 0.88 at the worst divisor over
//    every window position of 19#, so no sharper absolute bound exists. But
//    that is exactly what caps theta at 1, and theta is the denominator of the
//    whole exponent. The signed sum over the divisor lattice measures
//    D^gamma with gamma = 0.27 to 0.49 across all nine rows, which is
//    theta = 2.06 to 3.65, the smallest reading being 2.06: square-root
//    cancellation, the vector sieve's full-decoupling target, visible in the
//    data. Calling DP4 "free" hides the largest single derivative in the
//    problem, dE/dtheta = -4.2665.
//
// 4. WORST-CASING THE STRATA IS CHEAP; NOT KNOWING THEM IS EVERYTHING. Price
//    every Buchstab stratum at its own worst case over the entire period and
//    the certificate lands at 1.20 to 2.36 times the true G2 — an exponent
//    penalty of about 0.25, not 2.5. The dimension-2 price is therefore not
//    the worst-casing; it is the truncation, i.e. having to bound strata you
//    cannot compute. Brun's crude version prices that at an UNBOUNDED level
//    exponent (4.31 at x = 19 rising to 12.99 at x = 1e4), so DHR's constant
//    4.26645 is already the large win over the naive truncation.
//
// 5. A SIXTH DISCARD, AND IT IS THE ONLY ONE THAT BITES AT COMPUTABLE SCALE.
//    Theorem 9.1's O((lnln y)^2/(ln y)^{1/6}) costs zero in the exponent and
//    exceeds f2 <= 1 until ln z ~ 1.6e20. With that term generously set to
//    zero and every remaining constant computed exactly, the certified
//    threshold is log_x(H*) = 7.07 at x = 79, not 4.27, and H*/G2 = 1.5e10.
//    No computation will ever witness this theorem; the whole finite-range
//    picture is the log^9 overhead, which is 12.19 in ln H* at x = 79.
//
// 6. THE EXPONENT IS beta/theta AND THE TWO KNOBS ARE COUPLED. Per proportional
//    improvement the elasticities are exactly equal (+1 and -1), so the ranking
//    is headroom times availability: theta first (headroom 2x measured, one
//    consumer in print), beta second (headroom 1.34x measured, no consumer),
//    DP2 and the o(1) never. And the two are not independent: the only
//    mechanism that buys theta = 2 pays 24.2 per cent of it back in beta
//    (4.26645 -> 5.29744), netting E = 2.6487.
//
// 7. WHERE THE MAP NOW SAYS TO AIM. Both measured knobs at their limits give
//    E = 3.195/2 = 1.597 against the measured log_x(G2) = 1.70 — 6.2 per cent
//    apart, from two computations that share no code. That is the arithmetic
//    ceiling of the whole positivity programme as this file can measure it,
//    and it clears the TPC-equivalent line at 2 with room. What does not
//    exist is the mechanism: no published sieve reaches the one-point floor,
//    and theta = 2 rests on an unproven maximal inequality. Exponent 1 needs
//    c = 4.2665 and the measured knobs together supply only c = 2.67.
//
// 8. HONEST LIMITS. (a) The LP is solved at x <= 23 (512 cells); its kappa = 1
//    control converged by x = 13 but its kappa = 2 columns s90 and s99 were
//    still rising at x = 23, so the floor 3.195 rests on the calibration, not
//    on convergence. Pushing to x = 43 needs 2^14 cells and a sparse solver.
//    (b) The LP knows OUR exact omega; beta_2 is a supremum over the whole
//    Omega(kappa,L) class, so the 1.07 residual mixes DHR's truncation with
//    its adversarial quantification and this file cannot separate them.
//    (c) The truth exponent 1.70 is a finite-range reading at x <= 79, not an
//    asymptotic law. (d) gamma near 1/2 is measured at toy D and is not
//    evidence for Lemma V, which is a statement uniform in window position at
//    product level beyond H.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). This file
// already states its own case: the summary declares that every figure the run
// "does not produce" is that summary's own rounding of a printed one, and the
// thirty-first-pass CHANGELOG entry confirmed it carries no sourceless figure.
// Fifteen figures still sit outside the OUTPUT block, and this is what they
// are. No number above was changed.
//
// SELF-DECLARED ROUNDINGS, quoted by the summary in the act of declaring them:
//   0.8824 for 0.882353, 0.8462 for 0.846154, 2.2e-16 for 2.2204e-16, and the
//   ranges 1.20 to 2.36, 1.65-1.74 and 2.55-2.57. The last three are also
//   TOKENIZER ARTIFACTS: a hyphenated range makes the scanner see -1.74 and
//   -2.57 as figures.
//
// FURTHER ROUNDINGS of a printed value (printed first): 2.47e-5 -> 2.5e-5,
//   3.51e-5 -> 3.5e-5, 12.988 -> 12.99, 1.52e+10 -> 1.5e10.
//
// SAME VALUE, DIFFERENT NOTATION: 1e100 [printed 1.0e+100], 1.6e20
//   [1.60e+20], 18.3 [1.830e+1].
//
// IN-CODE / LITERATURE: beta_2 = 4.26645028414864191641 is the published
//   constant, carried as a literal above the banner and independently
//   reproduced here to 3.5e-5; 5.29744 and E = 2.6487 = 1 + sqrt(e) are the
//   same family, and 5.29744 is also in research/attack-ford-halberstam.js,
//   research/attack-sqrt-cancellation.js and research/attack-theta-margin.js.
// ---------------------------------------------------------------------------
