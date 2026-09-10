// thm-sharp-sieve-range.js -- SCRATCHPAD-GRADE producer for
// research/history/staging/thm-sharp-sieve-range.md
//
// WHAT. The two sibling staging notes of 2026-08-28 --
//   research/history/staging/thm-capK-bv.md              (kappa = 1)
//   research/history/staging/thm-buchstab-transfer-shallow.md (kappa = 2)
// -- each proved a theorem and each found it EMPTY at every run level, because
// each used the crude fundamental lemma with its e^{9k-s} K^{10} error factor.
// This script asks what the SHARP sieve functions (F_kappa, f_kappa of
// Diamond-Halberstam Theorem 6.1, used through Theorem 9.1) certify at the same
// levels, and what the price of switching instruments is.
//
// NOT EMBEDDED. NOT qc-GATED. Every number below is SCRATCHPAD-GRADE.
// Command:  node research/history/staging/thm-sharp-sieve-range.js   (~2 s)
// Writes nothing. Reads nothing. node v22.
//
// The delay-differential solver `solveDDE` is COPIED VERBATIM (modulo the h
// grid) from research/attack-beta2-04-loss-budget.js section 3, which is an
// EMBEDDED, qc-gated producer (code-sha256 b289acea0b62b1bc..., out-sha256
// b657ec20a0f407bd..., embedded 2026-08-19).  SEC 0 below re-validates this
// copy against that artifact's own printed figures before anything is built on
// it, per the standing compute rule (reuse the artifact; recompute only to
// validate).  System statement: Booker-Browning Theorem 3.1, quoted verbatim in
// research/dhr-verification.md section 1.1.

'use strict';
const EULER = 0.5772156649015328606;
const TWOEG = 2 * Math.exp(EULER);
const A2 = 5.35772744559446184227;   // Booker-Browning, 20 d.p., rigorous
const B2 = 4.26645028414864191641;   // Booker-Browning, 20 d.p., rigorous

const f6 = (x, n) => (Number.isFinite(x) ? x.toFixed(n) : '-');
const pad = (s, n) => String(s).padEnd(n);
const rule = t => console.log('\n' + '='.repeat(78) + '\n' + t + '\n' + '='.repeat(78));

// ---------------------------------------------------------------------------
// solveDDE -- copied from research/attack-beta2-04-loss-budget.js section 3.
// sigma_kappa (Ankeny-Onishi):  u^{-k} sigma(u) = (2e^g)^{-k}/Gamma(1+k), u<=2
//                               d/du (u^{-k}sigma(u)) = -k u^{-k-1}sigma(u-2)
// F = 1/sigma on (0,alpha],  f = 0 on (0,beta],
//   (u^k F)' = k u^{k-1} f(u-1),  u > alpha;  (u^k f)' = k u^{k-1} F(u-1), u > beta.
// ---------------------------------------------------------------------------
function solveDDE(kappa, alpha, beta, UMAX, h) {
  const N = Math.round(UMAX / h) + 1;
  const i1 = Math.round(1 / h), i2 = Math.round(2 / h);
  const G = new Float64Array(N), F = new Float64Array(N), f = new Float64Array(N);
  const gam = kappa === 1 ? 1 : 2;
  const A = Math.pow(2 * Math.exp(EULER), -kappa) / gam;
  for (let i = 0; i <= i2 && i < N; i++) G[i] = A;
  const dg = i => { const u = i * h; return u <= 2 ? 0 : -kappa * Math.pow(u, -kappa - 1) * Math.pow(u - 2, kappa) * G[i - i2]; };
  for (let i = i2 + 1; i < N; i++) G[i] = G[i - 1] + 0.5 * h * (dg(i - 1) + dg(i));
  const sigma = i => Math.pow(i * h, kappa) * G[i];
  const ia = Math.floor(alpha / h), ib = Math.floor(beta / h);
  for (let i = 1; i <= ia && i < N; i++) F[i] = 1 / sigma(i);
  F[0] = Infinity;
  for (let i = 0; i <= ib && i < N; i++) f[i] = 0;
  let PF = Math.pow(ia * h, kappa) * F[ia], Pf = 0;
  const start = Math.min(ia, ib) + 1;
  for (let i = start; i < N; i++) {
    const u = i * h, um = (i - 1) * h;
    if (i > ib) { Pf += 0.5 * h * (kappa * Math.pow(um, kappa - 1) * F[i - 1 - i1] + kappa * Math.pow(u, kappa - 1) * F[i - i1]); f[i] = Pf / Math.pow(u, kappa); }
    if (i > ia) { PF += 0.5 * h * (kappa * Math.pow(um, kappa - 1) * f[i - 1 - i1] + kappa * Math.pow(u, kappa - 1) * f[i - i1]); F[i] = PF / Math.pow(u, kappa); }
  }
  const at = (arr, u) => { const t = u / h, i = Math.floor(t); if (i < 0 || i + 1 >= N) return NaN; const w = t - i; return arr[i] * (1 - w) + arr[i + 1] * w; };
  return { F: u => at(F, u), f: u => Math.max(0, at(f, u)) };
}

const H = 1e-4, UMAX = 22;
const S1 = solveDDE(1, 2, 2, UMAX, H);
const S2 = solveDDE(2, A2, B2, UMAX, H);

// ---------------------------------------------------------------------------
// primes and theta(x)
// ---------------------------------------------------------------------------
function primesTo(n) { const s = new Uint8Array(n + 1); const out = []; for (let i = 2; i <= n; i++) { if (!s[i]) { out.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } } return out; }
const PR = primesTo(200000);
const isP = new Set(PR);
function theta(x) { let t = 0; for (const p of PR) { if (p > x) break; t += Math.log(p); } return t; }
function nextPrime(n) { let m = n + 1; while (!isP.has(m)) m++; return m; }

// ===========================================================================
rule('SEC 0. VALIDATION of the copied solver against the embedded artifact');
// ===========================================================================
console.log('Reference figures: research/attack-beta2-04-loss-budget.js, EMBEDDED OUTPUT');
console.log('block section 3 (3a/3b/3c), embedded 2026-08-19. This copy runs at h = 1e-4;');
console.log('the artifact ran at h = 1e-5, so agreement to ~1e-5 is the most that is owed.');
console.log('');
console.log(pad('quantity', 22) + pad('this copy', 14) + pad('embedded', 14) + 'abs diff');
const REF = [
  ['F1(1.50) closed', S1.F(1.5), 2.37476322], ['F1(3.00)', S1.F(3.0), 1.18738161],
  ['f1(2.50)', S1.f(2.5), 0.57774443], ['f1(4.00)', S1.f(4.0), 0.97836293],
  ['F1(20) far field', S1.F(20), 1.00000619], ['f1(20) far field', S1.f(20), 1.00000629],
  ['F2(20) far field', S2.F(20), 0.99999949], ['f2(20) far field', S2.f(20), 0.99999949],
  ['f2(4.2665) = beta2', S2.f(4.2665), 0.000059], ['F2(4.2665)', S2.F(4.2665), 1.680938],
  ['f2(4.5000)', S2.f(4.5), 0.240280], ['F2(4.5000)', S2.F(4.5), 1.570435],
  ['f2(5.0000)', S2.f(5.0), 0.578997], ['F2(5.0000)', S2.F(5.0), 1.392835],
  ['f2(6.0000)', S2.f(6.0), 0.884369], ['F2(6.0000)', S2.F(6.0), 1.113607],
  ['f2(8.0000)', S2.f(8.0), 0.997329], ['F2(8.0000)', S2.F(8.0), 1.002663],
];
let worst = 0, worstNm = '';
for (const [nm, got, ref] of REF) { const d = Math.abs(got - ref); if (d > worst) { worst = d; worstNm = nm; } console.log(pad(nm, 22) + pad(f6(got, 8), 14) + pad(f6(ref, 8), 14) + d.toExponential(2)); }
console.log('');
console.log('worst absolute disagreement over the 18 reference figures: ' + worst.toExponential(2) + '  (at ' + worstNm + ')');
console.log(worst < 1e-4 ? 'VALIDATION PASSES at the 1e-4 absolute level. The copy reproduces the artifact.'
                         : 'VALIDATION FAILS. Do not use anything below.');
console.log('');
console.log('CAVEAT, and it is the one that matters for this note. The single worst row is');
console.log('f2 evaluated AT beta2 itself, where the two grids read 1.18e-4 and 5.90e-5 --');
console.log('a factor of two apart on a quantity that is zero in exact arithmetic. Both are');
console.log('the solver\'s numerical floor, not a value of f2. Nothing in this note may be');
console.log('read off f2 within about 0.02 of beta2; the first level column that is used');
console.log('below sits at s = 4.7088, which is 0.44 above beta2 and clear of the floor.');
console.log('');
console.log('Closed forms the kappa = 1 branch must also satisfy (independent of the march):');
console.log('  F1(u) = 2e^g/u on [1,3]      2e^g = ' + f6(TWOEG, 8));
for (const u of [1.16, 1.37, 1.53, 1.68, 2.5, 3.0]) console.log('    u=' + pad(f6(u, 4), 8) + 'march ' + pad(f6(S1.F(u), 8), 13) + 'closed ' + f6(TWOEG / u, 8) + '   rel ' + (Math.abs(S1.F(u) / (TWOEG / u) - 1)).toExponential(2));
console.log('  f1(u) = 2e^g ln(u-1)/u on [2,4]');
for (const u of [2.5, 3.0, 3.5, 4.0]) console.log('    u=' + pad(f6(u, 4), 8) + 'march ' + pad(f6(S1.f(u), 8), 13) + 'closed ' + f6(TWOEG * Math.log(u - 1) / u, 8) + '   rel ' + (Math.abs(S1.f(u) / (TWOEG * Math.log(u - 1) / u) - 1)).toExponential(2));
console.log('  F2(u) = Gamma(3)(2e^g/u)^2 = 2(2e^g/u)^2, and ONLY on (0,2]: above u = 2 the');
console.log('  Ankeny-Onishi sigma_2 leaves its initial data and F2 = 1/sigma_2 exceeds it.');
for (const u of [1.0, 1.5, 1.7829, 2.0]) console.log('    u=' + pad(f6(u, 4), 8) + 'march ' + pad(f6(S2.F(u), 8), 13) + 'closed ' + f6(2 * TWOEG * TWOEG / (u * u), 8) + '   rel ' + (Math.abs(S2.F(u) / (2 * TWOEG * TWOEG / (u * u)) - 1)).toExponential(2));
console.log('  and the SAME formula is only a LOWER bound above u = 2, which is the check');
console.log('  that the sigma continuation is actually being marched:');
for (const u of [2.5, 3.0, 4.2665, 5.0]) console.log('    u=' + pad(f6(u, 4), 8) + 'march ' + pad(f6(S2.F(u), 8), 13) + 'naive ' + pad(f6(2 * TWOEG * TWOEG / (u * u), 8), 13) + (S2.F(u) > 2 * TWOEG * TWOEG / (u * u) ? 'march > naive, as required' : 'FAILS'));
console.log('  f2 has NO elementary closed form anywhere it is positive. The integral');
console.log('  u^2 f2(u) = 2 int_{beta2}^{u} t F2(t-1) dt is elementary only while t-1 <= 2,');
console.log('  i.e. u <= 3, and beta2 = 4.26645 > 3. So every f2 figure below is marched.');

// ===========================================================================
rule('SEC 1. kappa = 1: the cap_K sieve of thm-capK-bv.md at its own s');
// ===========================================================================
console.log('s = ln D / ln z with D = T^{1/2} (the BV ceiling), z = x+1 at K = 0, and the');
console.log('worst tail case T = sqrt(W), so s = ln W / (4 ln x). The first column');
console.log('reproduces thm-capK-bv.md section 4\'s table as a cross-check.');
console.log('');
console.log('V(z) = prod_{7<=p<=x}(1 - 1/(p-1)) is the sieve density at K = 0; the upper');
console.log('bound X V(z) F1(s) is nontrivial (beats the trivial S <= X) iff V*F1 < 1.');
console.log('');
console.log(pad('level', 8) + pad('ln W', 10) + pad('s', 9) + pad('sib s', 8) + pad('V(z)', 9) + pad('F1(s)', 10) + pad('V*F1', 9) + pad('f1(s)', 10) + pad('F/f', 8) + 'verdict');
const SIB1 = { 11: 0.81, 13: 1.00, 17: 1.16, 19: 1.37, 23: 1.53, 29: 1.68, 97: 4.58, 199: 8.91, 401: 15.71, 1009: 34.81 };
const L1 = [11, 13, 17, 19, 23, 29, 53, 97, 199, 401, 1009];
for (const x of L1) {
  const lnW = theta(x), s = lnW / (4 * Math.log(x));
  const F = s >= 1 ? (s <= UMAX - 2 ? S1.F(s) : 1) : NaN;
  const f = s >= 1 ? (s <= UMAX - 2 ? S1.f(s) : 1) : NaN;
  let v;
  if (s < 1) v = 'EMPTY (s<1: DH 9.1 needs z<=y)';
  else if (!(f > 0)) v = 'UPPER ONLY (f=0, no lower bound)';
  else if (F / f < 1.05) v = 'ASYMPTOTIC-GRADE bracket';
  else v = 'BRACKETED';
  let V = 1; for (const p of PR) { if (p < 7) continue; if (p > x) break; V *= 1 - 1 / (p - 1); }
  if (Number.isFinite(F) && V * F >= 1) v = 'EMPTY (V*F1 >= 1: trivial)';
  console.log(pad('@' + x, 8) + pad(f6(lnW, 3), 10) + pad(f6(s, 4), 9) + pad(SIB1[x] !== undefined ? f6(SIB1[x], 2) : '-', 8) +
    pad(f6(V, 5), 9) + pad(Number.isFinite(F) ? f6(F, 5) : '-', 10) + pad(Number.isFinite(F) ? f6(V * F, 5) : '-', 9) +
    pad(Number.isFinite(f) ? f6(f, 5) : '-', 10) + pad(f > 0 ? f6(F / f, 4) : '-', 8) + v);
}
console.log('');
console.log('The same sieve at the engine\'s own depth K* at @97 (natal-cap-28 READINGS via');
console.log('thm-capK-bv.md section 0: ln q_{K*}/ln T = 0.562, and 0.815 at the 90% depth K_0.9).');
console.log(pad('depth', 14) + pad('lnq_K/lnT', 12) + pad('s at D=T^1/2', 14) + pad('s at D=T^1-e', 14) + 'F1 at the EH level');
for (const [nm, r] of [['K* (@97)', 0.562], ['K_0.9 (@97)', 0.815]]) {
  const sBV = 0.5 / r, sEH = 1 / r;
  console.log(pad(nm, 14) + pad(f6(r, 3), 12) + pad(f6(sBV, 4) + (sBV < 1 ? ' (<1)' : ''), 14) + pad(f6(sEH, 4), 14) + (sEH >= 1 ? f6(S1.F(sEH), 5) : 'none'));
}
console.log('BV caps D at T^{1/2}, so both deep rows are EMPTY under BV: s < 1, and the');
console.log('theorem has no statement at all below s = 1. EH would reach s = 1.78 / 1.23,');
console.log('an upper bound with factor F1 above, and still no lower bound (f1 = 0 below 2).');

// ===========================================================================
rule('SEC 2. kappa = 2: the conditioned freshness sieve of thm-buchstab-transfer-shallow.md');
// ===========================================================================
console.log('s_head = ln(W/q0)/ln q0 at the shallowest scour prime q0 = nextprime(x), the');
console.log('BEST case for the hypothesis; D = T^{1-e}, z = q. First columns reproduce that');
console.log('note\'s section 4 table. s falls to 1 at the deep end q ~ sqrt(W).');
console.log('');
console.log('V(z) = prod_{7<=p<=x}(1 - 2/p) at K = 0, q = q0 (the second product is empty).');
console.log('');
console.log(pad('level', 8) + pad('q0', 6) + pad('s_head', 9) + pad('sib', 8) + pad('V(z)', 9) + pad('F2', 9) + pad('V*F2', 9) + pad('f2', 10) + pad('F/f', 8) + 'verdict at q0');
const SIB2 = { 13: 2.639, 17: 3.464, 19: 4.131, 23: 4.709, 29: 5.578, 53: 10.019, 97: 17.142 };
const L2 = [13, 17, 19, 23, 29, 53, 97];
for (const x of L2) {
  const lnW = theta(x), q0 = nextPrime(x), s = (lnW - Math.log(q0)) / Math.log(q0);
  const F = s >= 1 ? (s <= UMAX - 2 ? S2.F(s) : 1) : NaN;
  const f = s >= 1 ? (s <= UMAX - 2 ? S2.f(s) : 1) : NaN;
  let v;
  if (s < 1) v = 'EMPTY';
  else if (s <= B2) v = 'UPPER ONLY (s<=beta2, f2=0)';
  else if (F / f < 1.05) v = 'ASYMPTOTIC-GRADE bracket';
  else v = 'BRACKETED';
  let V = 1; for (const p of PR) { if (p < 7) continue; if (p > x) break; V *= 1 - 2 / p; }
  if (Number.isFinite(F) && V * F >= 1) v = 'EMPTY (V*F2 >= 1: trivial)';
  console.log(pad('@' + x, 8) + pad(q0, 6) + pad(f6(s, 4), 9) + pad(f6(SIB2[x], 3), 8) + pad(f6(V, 5), 9) +
    pad(Number.isFinite(F) ? f6(F, 5) : '-', 9) + pad(Number.isFinite(F) ? f6(V * F, 5) : '-', 9) +
    pad(f > 0 ? f6(f, 6) : '0', 10) + pad(f > 0 ? f6(F / f, 4) : '-', 8) + v);
}
console.log('');
console.log('The same levels at the DEEP end of the scour, q ~ sqrt(W), where s -> 1:');
console.log('s(q) = ln W/ln q - 1, so s = 1 exactly at q = sqrt(W) at EVERY level, and');
console.log('F2(1) = 2(2e^g)^2 = ' + f6(2 * TWOEG * TWOEG, 5) + ', f2(1) = 0. V(z) there is the full');
console.log('two-class-to-x then one-class-to-q product, so V*F2 is what decides.');
console.log('V(sqrtW) is EXACT where sqrt(W) <= 2e5 (@13..@29) and Mertens-continued above');
console.log('it (@53, @97), flagged per row; see SEC 2b for the continuation used.');
console.log(pad('level', 8) + pad('sqrt(W)', 11) + pad('V(z)', 11) + pad('F2(1)', 10) + pad('V*F2', 10) + pad('f2', 9) + 'V');
{
  const PMAX = PR[PR.length - 1], lnP = Math.log(PMAX);
  const Vexact = (x, q) => { let V = 1; for (const p of PR) { if (p < 7) continue; if (p >= q) break; V *= (p <= x) ? 1 - 2 / p : 1 - 1 / p; } return V; };
  for (const x of L2) {
    const lnW = theta(x), lnq = lnW / 2, s = 1.0;
    const V = lnq <= lnP ? Vexact(x, Math.exp(lnq)) : Vexact(x, PMAX) * lnP / lnq;
    console.log(pad('@' + x, 8) + pad(Math.exp(lnq) < 1e9 ? f6(Math.exp(lnq), 0) : Math.exp(lnq).toExponential(2), 11) +
      pad(V.toExponential(3), 11) + pad(f6(S2.F(s), 5), 10) + pad(f6(V * S2.F(s), 5), 10) + pad(f6(S2.f(s), 6), 9) +
      (lnq <= lnP ? 'exact' : '[MERTENS-TAIL]'));
  }
}

// ===========================================================================
rule('SEC 2b. kappa = 2: how far down the scour the UPPER bound stays nontrivial');
// ===========================================================================
console.log('The upper bound X V(q) F2(s(q)) beats the trivial S <= X only while');
console.log('V(q) F2(s(q)) < 1. V(q) FALLS with q and F2 RISES (s(q) falls to 1), so the');
console.log('crossing has to be swept. V(q) = prod_{7<=p<=x}(1-2/p) prod_{x<p<q}(1-1/p) is');
console.log('EXACT while q <= 2e5 (the prime table\'s ceiling) and is continued above that');
console.log('by Mertens, V(q) = V(2e5) * ln(2e5)/ln q -- flagged [MERTENS-TAIL] per row.');
console.log('');
const PMAX = PR[PR.length - 1];
const Vexact = (x, q) => { let V = 1; for (const p of PR) { if (p < 7) continue; if (p >= q) break; V *= (p <= x) ? 1 - 2 / p : 1 - 1 / p; } return V; };
console.log(pad('level', 8) + pad('sqrt(W)', 12) + pad('deepest q, V*F2<1', 20) + pad('s there', 10) + pad('coverage', 11) + 'tail');
for (const x of L2) {
  const lnW = theta(x), lnqtop = lnW / 2, lnx = Math.log(x);
  const VP = Vexact(x, PMAX), lnP = Math.log(PMAX);
  const Vat = lnq => (lnq <= lnP ? Vexact(x, Math.exp(lnq)) : VP * lnP / lnq);
  let best = null;
  const M = 4000;
  for (let i = M; i >= 0; i--) {
    const lnq = lnx + (lnqtop - lnx) * i / M, sq = lnW / lnq - 1;
    if (sq < 1) continue;
    if (Vat(lnq) * S2.F(sq) < 1) { best = lnq; break; }
  }
  const cov = best === null ? 0 : (best - lnx) / (lnqtop - lnx);
  console.log(pad('@' + x, 8) + pad(Math.exp(lnqtop) < 1e9 ? f6(Math.exp(lnqtop), 0) : Math.exp(lnqtop).toExponential(2), 12) +
    pad(best === null ? 'none (trivial at every q)' : (Math.exp(best) < 1e9 ? f6(Math.exp(best), 0) : Math.exp(best).toExponential(2)), 20) +
    pad(best === null ? '-' : f6(lnW / best - 1, 3), 10) + pad(f6(100 * cov, 2) + '%', 11) +
    (best !== null && best > lnP ? '[MERTENS-TAIL]' : 'exact'));
}
console.log('');
console.log('Reading. The nontrivial upper-bound band is NOT the same as the lower-bound');
console.log('band and it behaves the other way round: it is a small head at @13..@29 (0%');
console.log('to 53% of the log-depth) and essentially the whole scour by @53 and @97. The');
console.log('reason is a race: V(q) falls like ln x/ln q while F2(s(q)) rises like');
console.log('2(2e^g/s)^2 as s falls to 1, and only at high levels does V fall fast enough.');
console.log('Nothing here is a lower bound: f2 = 0 at every one of these q.');

// ===========================================================================
rule('SEC 3. The bands: which scour primes each instrument reaches');
// ===========================================================================
console.log('Hypothesis s(q) >= s*  <=>  ln q <= ln W/(1+s*). Band = the scour primes');
console.log('q in (x, W^{1/(1+s*)}]. Coverage = fraction of the log-depth interval');
console.log('[ln x, ln sqrt(W)] the band covers. s* = 22.06 reproduces the sibling\'s');
console.log('fundamental-lemma band; s* = beta2 = 4.26645 is the DHR lower-bound band.');
console.log('');
for (const [nm, sstar] of [['fundamental lemma, delta=0.5', 22.06], ['DHR lower bound, s* = beta2', B2], ['DHR upper bound, s* = 1', 1.0]]) {
  let least = null;
  for (const x of PR) { if (x < 7 || x > 4000) continue; const lnW = theta(x); const cap = lnW / (1 + sstar); if (Math.log(nextPrime(x)) <= cap) { least = x; break; } }
  console.log(nm + ':  least level with a non-empty band = ' + (least === null ? 'none below 4000' : '@' + least));
  console.log(pad('  level', 10) + pad('band top q', 14) + pad('#primes in band', 18) + 'coverage of [ln x, ln sqrt W]');
  for (const x of [17, 19, 23, 29, 53, 97, 131, 199, 1009]) {
    const lnW = theta(x), cap = lnW / (1 + sstar), top = Math.exp(cap);
    let cnt = 0; for (const p of PR) { if (p <= x) continue; if (p > top) break; cnt++; }
    const cov = Math.max(0, (Math.min(cap, lnW / 2) - Math.log(x)) / (lnW / 2 - Math.log(x)));
    console.log(pad('  @' + x, 10) + pad(top < 1e9 ? f6(top, 1) : top.toExponential(2), 14) + pad(top > PR[PR.length - 1] ? '>' + cnt : String(cnt), 18) + f6(100 * cov, 2) + '%');
  }
  console.log('');
}

// ===========================================================================
rule('SEC 4. The price of the sharp instrument: DH Thm 9.1\'s own o(1)');
// ===========================================================================
console.log('DH Theorem 9.1 (VERBATIM at p.104, attestation photograph, recorded in');
console.log('research/history/staging/lit-pdf-halberstam-richert.md section 6.1) reads');
console.log('  S <= X V(z){F_k(log y/log z) + O((log log y)^2/(log y)^{1/(2k+2)})} + 2 sum 4^{nu(m)}|r|');
console.log('with "the constants implied by the O-notation depend at most on kappa and A".');
console.log('The constant is NOT WRITTEN. Below is the BARE SHAPE E(y) = (loglog y)^2/(log y)^{1/(2k+2)},');
console.log('i.e. what the o(1) is worth if its unwritten constant were exactly 1.');
console.log('');
console.log(pad('level', 9) + pad('log y (k=1)', 13) + pad('E, k=1', 11) + pad('log y (k=2)', 13) + pad('E, k=2', 11) + 'both must be << 1');
for (const x of [17, 19, 23, 29, 53, 97, 199, 1009, 10007]) {
  const lnW = theta(x);
  const y1 = lnW / 4;                                   // D = T^{1/2}, T = sqrt(W)
  const y2 = lnW - Math.log(nextPrime(x));              // D = T^{1-e} at q0
  const E = (L, k) => Math.pow(Math.log(L), 2) / Math.pow(L, 1 / (2 * k + 2));
  console.log(pad('@' + x, 9) + pad(f6(y1, 2), 13) + pad(f6(E(y1, 1), 3), 11) + pad(f6(y2, 2), 13) + pad(f6(E(y2, 2), 3), 11) + '');
}
console.log('');
console.log('Where the bare shape first drops below 1, and where it peaks (solve E\'=0:');
console.log('log log y = 2(2k+2), so the peak sits at log y = e^{4k+4}):');
for (const k of [1, 2]) {
  const E = L => Math.pow(Math.log(L), 2) / Math.pow(L, 1 / (2 * k + 2));
  const peakL = Math.exp(4 * k + 4);
  let lo = peakL, hi = 1e300; for (let i = 0; i < 300; i++) { const m = Math.sqrt(lo * hi); if (E(m) > 1) lo = m; else hi = m; }
  console.log('  kappa = ' + k + ':  peak E = ' + f6(E(peakL), 3) + ' at log y = ' + peakL.toExponential(3) +
    ';  E < 1 first at log y = ' + Math.sqrt(lo * hi).toExponential(3) + ', i.e. y = exp(' + Math.sqrt(lo * hi).toExponential(2) + ')');
}
console.log('');
console.log('For contrast, the crude fundamental lemma\'s factor is EXPLICIT: e^{9k-s}K^{10}.');
console.log('  kappa=1, K_dim=1.2000 (thm-capK-bv sec 5): below 1 at s >= ' + f6(9 + 10 * Math.log(1.2), 3) + ', reachable at x = 239.');
console.log('  kappa=2, K    =1.4    (thm-buchstab sec 3.4): below 1 at s >= ' + f6(18 + 10 * Math.log(1.4), 3) + ', and');
console.log('    below delta = 0.5 at s >= ' + f6(18 + 10 * Math.log(1.4) + Math.log(2), 3) + ' (the sibling\'s 22.06), reachable at x = 131.');

// ===========================================================================
rule('SEC 5. Axis cross-check against the standing wall figures');
// ===========================================================================
console.log('attack-wrongdirection-audit.md section 3.8 [ARITHMETIC, unstamped]: the census');
console.log('reformulation needs a kappa = 2 LOWER bound at s = u*/2 = 1.7829 against');
console.log('beta2 = 4.26645, "short by a factor 2.393". attack-roughpair-error.md section 5');
console.log('reports the operative window as s <~ 2.317 at B8 drifting to u*/2 = 1.7829,');
console.log('with slack 1.056 there and Xmain/T = 5.631 already at s = beta2.');
console.log('');
console.log('The 2.393 is a RATIO OF SIEVE COORDINATES, not a shortfall in a count:');
console.log('  beta2 / 1.7829 = ' + f6(B2 / 1.7829, 4) + '   (reproduced)');
console.log('  beta2 / 1.0    = ' + f6(B2 / 1.0, 4) + '   (the direct-twin comparison, "4.266")');
console.log('');
console.log('What the sharp sieve says AT those coordinates:');
console.log(pad('s', 10) + pad('F2(s)', 11) + pad('f2(s)', 11) + pad('F1(s)', 11) + pad('f1(s)', 11) + 'what it is');
for (const [s, tag] of [[1.0, 'deep end of the scour; direct-twin comparison'], [1.7829, 'u*/2, the census target'], [2.0, 'the identity point, = TPC at kappa=2'], [2.317, 'B8 crossing, roughpair sec 5'], [B2, 'beta2, the DHR sifting limit'], [4.709, '@23 s_head'], [17.142, '@97 s_head']]) {
  console.log(pad(f6(s, 4), 10) + pad(f6(S2.F(s), 5), 11) + pad(f6(S2.f(s), 6), 11) + pad(f6(S1.F(s), 5), 11) + pad(f6(S1.f(s), 6), 11) + tag);
}
console.log('');
console.log('f2 = 0 at every s at or below beta2, so the sharp sieve AGREES with the 2.393');
console.log('reading exactly and adds nothing to it: no kappa = 2 lower bound exists below');
console.log('beta2, and the sharp functions are the instrument that says so.');
console.log('');
console.log('One number the wall notes do not carry: the kappa = 2 UPPER bound at those');
console.log('coordinates. F2(1.7829) = ' + f6(S2.F(1.7829), 4) + ' and F2(2.317) = ' + f6(S2.F(2.317), 4) + ', against the');
console.log('roughpair slack of 1.056 at the crossing. Even the upper-bound sieve at the');
console.log('operative s is looser than the slack by a factor ' + f6(S2.F(2.317) / 1.056, 2) + ' to ' + f6(S2.F(1.7829) / 1.056, 2) + '.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/thm-sharp-sieve-range.js
//   invocation:  node research/history/staging/thm-sharp-sieve-range.js
//   code-sha256: 92a22c21cf1bca1eb4b112f0929bdc3a76af10ee9c782be228f2692fac9e41e8
//   out-sha256:  c51ccc2ca4d21a34fc3d44223f9f5530a4f2679cf38878d79c551d5ebefd6837
//   body-lines:  264
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     0.1 s
// ============================================================================
//
// ==============================================================================
// SEC 0. VALIDATION of the copied solver against the embedded artifact
// ==============================================================================
// Reference figures: research/attack-beta2-04-loss-budget.js, EMBEDDED OUTPUT
// block section 3 (3a/3b/3c), embedded 2026-08-19. This copy runs at h = 1e-4;
// the artifact ran at h = 1e-5, so agreement to ~1e-5 is the most that is owed.
//
// quantity              this copy     embedded      abs diff
// F1(1.50) closed       2.37476322    2.37476322    3.99e-9
// F1(3.00)              1.18738161    1.18738161    1.99e-9
// f1(2.50)              0.57773018    0.57774443    1.43e-5
// f1(4.00)              0.97835402    0.97836293    8.91e-6
// F1(20) far field      1.00000000    1.00000619    6.19e-6
// f1(20) far field      1.00000000    1.00000629    6.29e-6
// F2(20) far field      1.00001767    0.99999949    1.82e-5
// f2(20) far field      1.00001769    0.99999949    1.82e-5
// f2(4.2665) = beta2    0.00011803    0.00005900    5.90e-5
// F2(4.2665)            1.68093843    1.68093800    4.31e-7
// f2(4.5000)            0.24033275    0.24028000    5.27e-5
// F2(4.5000)            1.57043513    1.57043500    1.27e-7
// f2(5.0000)            0.57903994    0.57899700    4.29e-5
// F2(5.0000)            1.39283497    1.39283500    3.19e-8
// f2(6.0000)            0.88439859    0.88436900    2.96e-5
// F2(6.0000)            1.11361387    1.11360700    6.87e-6
// f2(8.0000)            0.99734901    0.99732900    2.00e-5
// F2(8.0000)            1.00267964    1.00266300    1.66e-5
//
// worst absolute disagreement over the 18 reference figures: 5.90e-5  (at f2(4.2665) = beta2)
// VALIDATION PASSES at the 1e-4 absolute level. The copy reproduces the artifact.
//
// CAVEAT, and it is the one that matters for this note. The single worst row is
// f2 evaluated AT beta2 itself, where the two grids read 1.18e-4 and 5.90e-5 --
// a factor of two apart on a quantity that is zero in exact arithmetic. Both are
// the solver's numerical floor, not a value of f2. Nothing in this note may be
// read off f2 within about 0.02 of beta2; the first level column that is used
// below sits at s = 4.7088, which is 0.44 above beta2 and clear of the floor.
//
// Closed forms the kappa = 1 branch must also satisfy (independent of the march):
//   F1(u) = 2e^g/u on [1,3]      2e^g = 3.56214484
//     u=1.1600  march 3.07081451   closed 3.07081451   rel 0.00e+0
//     u=1.3700  march 2.60010572   closed 2.60010572   rel 2.22e-16
//     u=1.5300  march 2.32819924   closed 2.32819924   rel 2.22e-16
//     u=1.6800  march 2.12032431   closed 2.12032431   rel 0.00e+0
//     u=2.5000  march 1.42485793   closed 1.42485793   rel 0.00e+0
//     u=3.0000  march 1.18738161   closed 1.18738161   rel 0.00e+0
//   f1(u) = 2e^g ln(u-1)/u on [2,4]
//     u=2.5000  march 0.57773018   closed 0.57773018   rel 1.14e-9
//     u=3.0000  march 0.82303022   closed 0.82303022   rel 9.02e-10
//     u=3.5000  march 0.93256009   closed 0.93256009   rel 7.64e-10
//     u=4.0000  march 0.97835402   closed 0.97835402   rel 6.74e-10
//   F2(u) = Gamma(3)(2e^g/u)^2 = 2(2e^g/u)^2, and ONLY on (0,2]: above u = 2 the
//   Ankeny-Onishi sigma_2 leaves its initial data and F2 = 1/sigma_2 exceeds it.
//     u=1.0000  march 25.37775167  closed 25.37775167   rel 0.00e+0
//     u=1.5000  march 11.27900074  closed 11.27900074   rel 0.00e+0
//     u=1.7829  march 7.98360742   closed 7.98360742   rel 2.22e-16
//     u=2.0000  march 6.34443792   closed 6.34443792   rel 0.00e+0
//   and the SAME formula is only a LOWER bound above u = 2, which is the check
//   that the sigma continuation is actually being marched:
//     u=2.5000  march 4.08613019   naive 4.06044027   march > naive, as required
//     u=3.0000  march 2.91643719   naive 2.81975019   march > naive, as required
//     u=4.2665  march 1.68093843   naive 1.39415045   march > naive, as required
//     u=5.0000  march 1.39283497   naive 1.01511007   march > naive, as required
//   f2 has NO elementary closed form anywhere it is positive. The integral
//   u^2 f2(u) = 2 int_{beta2}^{u} t F2(t-1) dt is elementary only while t-1 <= 2,
//   i.e. u <= 3, and beta2 = 4.26645 > 3. So every f2 figure below is marched.
//
// ==============================================================================
// SEC 1. kappa = 1: the cap_K sieve of thm-capK-bv.md at its own s
// ==============================================================================
// s = ln D / ln z with D = T^{1/2} (the BV ceiling), z = x+1 at K = 0, and the
// worst tail case T = sqrt(W), so s = ln W / (4 ln x). The first column
// reproduces thm-capK-bv.md section 4's table as a cross-check.
//
// V(z) = prod_{7<=p<=x}(1 - 1/(p-1)) is the sieve density at K = 0; the upper
// bound X V(z) F1(s) is nontrivial (beats the trivial S <= X) iff V*F1 < 1.
//
// level   ln W      s        sib s   V(z)     F1(s)     V*F1     f1(s)     F/f     verdict
// @11     7.745     0.8075   0.81    0.75000  -         -        -         -       EMPTY (s<1: DH 9.1 needs z<=y)
// @13     10.310    1.0049   1.00    0.68750  3.54482   2.43706  0.00000   -       EMPTY (V*F1 >= 1: trivial)
// @17     13.143    1.1597   1.16    0.64453  3.07150   1.97968  0.00000   -       EMPTY (V*F1 >= 1: trivial)
// @19     16.088    1.3659   1.37    0.60872  2.60785   1.58746  0.00000   -       EMPTY (V*F1 >= 1: trivial)
// @23     19.223    1.5327   1.53    0.58105  2.32410   1.35043  0.00000   -       EMPTY (V*F1 >= 1: trivial)
// @29     22.590    1.6772   1.68    0.56030  2.12388   1.19001  0.00000   -       EMPTY (V*F1 >= 1: trivial)
// @53     44.931    2.8292   -       0.48087  1.25908   0.60545  0.76031   1.6560  BRACKETED
// @97     83.728    4.5756   4.58    0.42440  1.00534   0.42667  0.99473   1.0107  ASYMPTOTIC-GRADE bracket
// @199    188.564   8.9058   8.91    0.36607  1.00000   0.36607  1.00000   1.0000  ASYMPTOTIC-GRADE bracket
// @401    376.727   15.7128  15.71   0.32701  1.00000   0.32701  1.00000   1.0000  ASYMPTOTIC-GRADE bracket
// @1009   963.162   34.8128  34.81   0.28482  1.00000   0.28482  1.00000   1.0000  ASYMPTOTIC-GRADE bracket
//
// The same sieve at the engine's own depth K* at @97 (natal-cap-28 READINGS via
// thm-capK-bv.md section 0: ln q_{K*}/ln T = 0.562, and 0.815 at the 90% depth K_0.9).
// depth         lnq_K/lnT   s at D=T^1/2  s at D=T^1-e  F1 at the EH level
// K* (@97)      0.562       0.8897 (<1)   1.7794        2.00193
// K_0.9 (@97)   0.815       0.6135 (<1)   1.2270        2.90315
// BV caps D at T^{1/2}, so both deep rows are EMPTY under BV: s < 1, and the
// theorem has no statement at all below s = 1. EH would reach s = 1.78 / 1.23,
// an upper bound with factor F1 above, and still no lower bound (f1 = 0 below 2).
//
// ==============================================================================
// SEC 2. kappa = 2: the conditioned freshness sieve of thm-buchstab-transfer-shallow.md
// ==============================================================================
// s_head = ln(W/q0)/ln q0 at the shallowest scour prime q0 = nextprime(x), the
// BEST case for the hypothesis; D = T^{1-e}, z = q. First columns reproduce that
// note's section 4 table. s falls to 1 at the deep end q ~ sqrt(W).
//
// V(z) = prod_{7<=p<=x}(1 - 2/p) at K = 0, q = q0 (the second product is empty).
//
// level   q0    s_head   sib     V(z)     F2       V*F2     f2        F/f     verdict at q0
// @13     17    2.6390   2.639   0.49451  3.68684  1.82316  0         -       EMPTY (V*F2 >= 1: trivial)
// @17     19    3.4637   3.464   0.43633  2.28589  0.99740  0         -       UPPER ONLY (s<=beta2, f2=0)
// @19     23    4.1308   4.131   0.39040  1.75570  0.68542  0         -       UPPER ONLY (s<=beta2, f2=0)
// @23     29    4.7088   4.709   0.35645  1.48779  0.53032  0.405614  3.6680  BRACKETED
// @29     31    5.5785   5.578   0.33187  1.21681  0.40382  0.794049  1.5324  BRACKETED
// @53     59    10.0190  10.019  0.24540  1.00004  0.24541  0.999996  1.0000  ASYMPTOTIC-GRADE bracket
// @97     101   17.1422  17.142  0.19149  1.00002  0.19149  1.000018  1.0000  ASYMPTOTIC-GRADE bracket
//
// The same levels at the DEEP end of the scour, q ~ sqrt(W), where s -> 1:
// s(q) = ln W/ln q - 1, so s = 1 exactly at q = sqrt(W) at EVERY level, and
// F2(1) = 2(2e^g)^2 = 25.37775, f2(1) = 0. V(z) there is the full
// two-class-to-x then one-class-to-q product, so V*F2 is what decides.
// V(sqrtW) is EXACT where sqrt(W) <= 2e5 (@13..@29) and Mertens-continued above
// it (@53, @97), flagged per row; see SEC 2b for the continuation used.
// level   sqrt(W)    V(z)       F2(1)     V*F2      f2       V
// @13     173        2.765e-1   25.37775  7.01654   0.000000 exact
// @17     714        2.054e-1   25.37775  5.21235   0.000000 exact
// @19     3114       1.590e-1   25.37775  4.03589   0.000000 exact
// @23     14936      1.272e-1   25.37775  3.22764   0.000000 exact
// @29     80434      1.044e-1   25.37775  2.64984   0.000000 exact
// @53     5.71e+9    4.506e-2   25.37775  1.14351   0.000000 [MERTENS-TAIL]
// @97     1.52e+18   2.134e-2   25.37775  0.54157   0.000000 [MERTENS-TAIL]
//
// ==============================================================================
// SEC 2b. kappa = 2: how far down the scour the UPPER bound stays nontrivial
// ==============================================================================
// The upper bound X V(q) F2(s(q)) beats the trivial S <= X only while
// V(q) F2(s(q)) < 1. V(q) FALLS with q and F2 RISES (s(q) falls to 1), so the
// crossing has to be swept. V(q) = prod_{7<=p<=x}(1-2/p) prod_{x<p<q}(1-1/p) is
// EXACT while q <= 2e5 (the prime table's ceiling) and is continued above that
// by Mertens, V(q) = V(2e5) * ln(2e5)/ln q -- flagged [MERTENS-TAIL] per row.
//
// level   sqrt(W)     deepest q, V*F2<1   s there   coverage   tail
// @13     173         none (trivial at every q)-         0.00%      exact
// @17     714         21                  3.346     5.10%      exact
// @19     3114        75                  2.724     26.97%     exact
// @23     14936       337                 2.302     41.48%     exact
// @29     80434       1922                1.988     52.90%     exact
// @53     5.71e+9     2.07e+9             1.094     94.52%     [MERTENS-TAIL]
// @97     1.52e+18    1.52e+18            1.000     100.00%    [MERTENS-TAIL]
//
// Reading. The nontrivial upper-bound band is NOT the same as the lower-bound
// band and it behaves the other way round: it is a small head at @13..@29 (0%
// to 53% of the log-depth) and essentially the whole scour by @53 and @97. The
// reason is a race: V(q) falls like ln x/ln q while F2(s(q)) rises like
// 2(2e^g/s)^2 as s falls to 1, and only at high levels does V fall fast enough.
// Nothing here is a lower bound: f2 = 0 at every one of these q.
//
// ==============================================================================
// SEC 3. The bands: which scour primes each instrument reaches
// ==============================================================================
// Hypothesis s(q) >= s*  <=>  ln q <= ln W/(1+s*). Band = the scour primes
// q in (x, W^{1/(1+s*)}]. Coverage = fraction of the log-depth interval
// [ln x, ln sqrt(W)] the band covers. s* = 22.06 reproduces the sibling's
// fundamental-lemma band; s* = beta2 = 4.26645 is the DHR lower-bound band.
//
// fundamental lemma, delta=0.5:  least level with a non-empty band = @131
//   level   band top q    #primes in band   coverage of [ln x, ln sqrt W]
//   @17     1.8           0                 0.00%
//   @19     2.0           0                 0.00%
//   @23     2.3           0                 0.00%
//   @29     2.7           0                 0.00%
//   @53     7.0           0                 0.00%
//   @97     37.7          0                 0.00%
//   @131    158.3         5                 0.35%
//   @199    3558.5        452               3.24%
//   @1009   1.38e+18      >17815            7.34%
//
// DHR lower bound, s* = beta2:  least level with a non-empty band = @23
//   level   band top q    #primes in band   coverage of [ln x, ln sqrt W]
//   @17     12.1          0                 0.00%
//   @19     21.2          0                 2.16%
//   @23     38.5          3                 7.95%
//   @29     72.9          10                11.63%
//   @53     5071.8        661               24.66%
//   @97     8028022.9     >17959            30.37%
//   @131    4.28e+9       >17952            32.33%
//   @199    3.55e+15      >17938            34.29%
//   @1009   2.67e+79      >17815            37.07%
//
// DHR upper bound, s* = 1:  least level with a non-empty band = @7
//   level   band top q    #primes in band   coverage of [ln x, ln sqrt W]
//   @17     714.5         120               100.00%
//   @19     3114.4        435               100.00%
//   @23     14936.3       1739              100.00%
//   @29     80434.4       7863              100.00%
//   @53     5.71e+9       >17968            100.00%
//   @97     1.52e+18      >17959            100.00%
//   @131    2.29e+25      >17952            100.00%
//   @199    8.83e+40      >17938            100.00%
//   @1009   1.41e+209     >17815            100.00%
//
//
// ==============================================================================
// SEC 4. The price of the sharp instrument: DH Thm 9.1's own o(1)
// ==============================================================================
// DH Theorem 9.1 (VERBATIM at p.104, attestation photograph, recorded in
// research/history/staging/lit-pdf-halberstam-richert.md section 6.1) reads
//   S <= X V(z){F_k(log y/log z) + O((log log y)^2/(log y)^{1/(2k+2)})} + 2 sum 4^{nu(m)}|r|
// with "the constants implied by the O-notation depend at most on kappa and A".
// The constant is NOT WRITTEN. Below is the BARE SHAPE E(y) = (loglog y)^2/(log y)^{1/(2k+2)},
// i.e. what the o(1) is worth if its unwritten constant were exactly 1.
//
// level    log y (k=1)  E, k=1     log y (k=2)  E, k=2     both must be << 1
// @17      3.29         1.051      10.20        3.662
// @19      4.02         1.368      12.95        4.281
// @23      4.81         1.664      15.86        4.818
// @29      5.65         1.944      19.16        5.330
// @53      11.23        3.196      40.85        7.417
// @97      20.93        4.324      79.11        9.221
// @199     47.14        5.666      183.21       11.393
// @1009    240.79       7.634      956.24       15.006
// @10007   2476.30      8.657      9895.99      18.266
//
// Where the bare shape first drops below 1, and where it peaks (solve E'=0:
// log log y = 2(2k+2), so the peak sits at log y = e^{4k+4}):
//   kappa = 1:  peak E = 8.661 at log y = 2.981e+3;  E < 1 first at log y = 2.149e+11, i.e. y = exp(2.15e+11)
//   kappa = 2:  peak E = 19.488 at log y = 1.628e+5;  E < 1 first at log y = 8.799e+19, i.e. y = exp(8.80e+19)
//
// For contrast, the crude fundamental lemma's factor is EXPLICIT: e^{9k-s}K^{10}.
//   kappa=1, K_dim=1.2000 (thm-capK-bv sec 5): below 1 at s >= 10.823, reachable at x = 239.
//   kappa=2, K    =1.4    (thm-buchstab sec 3.4): below 1 at s >= 21.365, and
//     below delta = 0.5 at s >= 22.058 (the sibling's 22.06), reachable at x = 131.
//
// ==============================================================================
// SEC 5. Axis cross-check against the standing wall figures
// ==============================================================================
// attack-wrongdirection-audit.md section 3.8 [ARITHMETIC, unstamped]: the census
// reformulation needs a kappa = 2 LOWER bound at s = u*/2 = 1.7829 against
// beta2 = 4.26645, "short by a factor 2.393". attack-roughpair-error.md section 5
// reports the operative window as s <~ 2.317 at B8 drifting to u*/2 = 1.7829,
// with slack 1.056 there and Xmain/T = 5.631 already at s = beta2.
//
// The 2.393 is a RATIO OF SIEVE COORDINATES, not a shortfall in a count:
//   beta2 / 1.7829 = 2.3930   (reproduced)
//   beta2 / 1.0    = 4.2665   (the direct-twin comparison, "4.266")
//
// What the sharp sieve says AT those coordinates:
// s         F2(s)      f2(s)      F1(s)      f1(s)      what it is
// 1.0000    25.37775   0.000000   3.56214    0.000000   deep end of the scour; direct-twin comparison
// 1.7829    7.98361    0.000000   1.99795    0.000000   u*/2, the census target
// 2.0000    6.34444    0.000000   1.78107    0.000000   the identity point, = TPC at kappa=2
// 2.3170    4.73619    0.000000   1.53740    0.423332   B8 crossing, roughpair sec 5
// 4.2665    1.68096    0.000059   1.01155    0.988661   beta2, the DHR sifting limit
// 4.7090    1.48770    0.405779   1.00378    0.996243   @23 s_head
// 17.1420   1.00002    1.000018   1.00000    1.000000   @97 s_head
//
// f2 = 0 at every s at or below beta2, so the sharp sieve AGREES with the 2.393
// reading exactly and adds nothing to it: no kappa = 2 lower bound exists below
// beta2, and the sharp functions are the instrument that says so.
//
// One number the wall notes do not carry: the kappa = 2 UPPER bound at those
// coordinates. F2(1.7829) = 7.9836 and F2(2.317) = 4.7362, against the
// roughpair slack of 1.056 at the crossing. Even the upper-bound sieve at the
// operative s is looser than the slack by a factor 4.49 to 7.56.
// ============================================================================
// READINGS
// ============================================================================
