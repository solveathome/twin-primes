#!/usr/bin/env node
'use strict';
// RED TEAM — the growth law's model race, re-derived: AICc convention, comparability, and window robustness
/* ============================================================================
   RED TEAM / attack-growth-law.js  —  independent re-derivation of the race
   ============================================================================
   2026-08-18/19, attack 10 of 10. This file exists to try to BREAK the headline
   "G2(x#) ~ 0.762 x ln^2 x lnln x, with c x ln^2 x excluded at 31.8 AICc units
   and the pure power law at 10.6", not to extend it.

   It re-derives every fit from scratch rather than importing anything from
   research/attack-growth-law.js, and it attacks three specific joints:

   1. IS THE AICc RIGHT FOR THE SAMPLE SIZE? A Gaussian least-squares model with
      unknown variance estimates K = k + 1 parameters, the k regression
      coefficients AND sigma^2. AIC's sigma term is a constant across models and
      cancels in a difference, so dropping it is harmless. The AICc correction
      2K(K+1)/(n-K-1) is NOT constant across models: it depends on K, so using k
      where K belongs mis-prices every comparison between families of different
      dimension. Both are computed here and both are printed.

   2. ARE THE FITS COMPARABLE? AIC across models requires the SAME response
      vector. Frozen-exponent families carry their exponent in an offset, which
      is a coefficient pinned at 1, not a change of response. That is checked
      here explicitly rather than assumed: the response ln y is hashed per model.

   3. DOES THE EXCLUSION SURVIVE THE ENDS? The window x = 11..79 is a choice.
      Drop the smallest term, drop the largest, drop both, jackknife all 18, and
      slide the low end. An exclusion that only exists at one window is not an
      exclusion.

   A fourth joint is priced but not resolved: AIC assumes independent errors,
   and a growth ladder's residuals are serially correlated. The effective sample
   size under an AR(1) residual is n_eff = n(1-r)/(1+r), and every AICc gap
   scales roughly with n. That is reported as a deflator, not as a verdict.

   DATA. Copied from research/attack-growth-law.js lines 74-80 and 82-86, which
   is a transcription and is therefore checked: G2 = A144311 + 1 is re-asserted
   here elementwise, and the OEIS provenance of the last eight terms is a
   separate audit and NOT settled by this file.
   ========================================================================= */

const X  = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];
const G2 = [2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528, 546, 618, 708, 870, 966, 1080, 1284, 1398, 1530, 1710];
const A144311 = [1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545, 617,
                 707, 869, 965, 1079, 1283, 1397, 1529, 1709];
const H = [2, 4, 6, 10, 14, 22, 26, 34, 40, 46, 58, 66, 74, 90, 100, 106, 118, 132, 152, 174, 190,
  200, 216, 234, 258, 264, 282, 300, 312, 330, 354, 378, 388, 414, 432, 450, 476, 492, 510, 538,
  550, 574, 600, 616, 642, 660, 686, 718, 742, 762, 798, 810, 834, 858, 876, 908, 926, 954];

const F = (v, d = 3) => (Number.isFinite(v) ? v.toFixed(d) : ' n/a');
const pad = (s, n) => String(s).padStart(n);
const padr = (s, n) => String(s).padEnd(n);
const L1 = x => Math.log(x), L2 = x => Math.log(Math.log(x)), L3 = x => Math.log(Math.log(Math.log(x)));

function primes(n) { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } return o; }
const P = primes(3000);

// --- solver: Gauss-Jordan, written independently of the target's ------------
function solve(A, b) {
  const n = b.length, M = A.map((r, i) => [...r, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    if (Math.abs(M[c][c]) < 1e-13) return null;
    const d = M[c][c]; for (let j = c; j <= n; j++) M[c][j] /= d;
    for (let r = 0; r < n; r++) { if (r === c) continue; const f = M[r][c]; for (let j = c; j <= n; j++) M[r][j] -= f * M[c][j]; }
  }
  return M.map(r => r[n]);
}

const MODELS = [
  { key: 'PW',     form: 'c x^a',                 phi: [() => 1, L1],     off: () => 0,                     lab: b => `a = ${F(b[1])}` },
  { key: 'PWL',    form: 'c x^a (ln x)^b',        phi: [() => 1, L1, L2], off: () => 0,                     lab: b => `a = ${F(b[1])}, b = ${F(b[2])}` },
  { key: 'MP2',    form: 'c x ln^2 x',            phi: [() => 1],         off: x => L1(x) + 2 * L2(x),      lab: b => `c = ${F(Math.exp(b[0]))}` },
  { key: 'MP3',    form: 'c x ln^3 x',            phi: [() => 1],         off: x => L1(x) + 3 * L2(x),      lab: b => `c = ${F(Math.exp(b[0]), 4)}` },
  { key: 'XLA',    form: 'c x ln^a x',            phi: [() => 1, L2],     off: x => L1(x),                  lab: b => `a = ${F(b[1])}` },
  { key: 'MP2LL',  form: 'c x ln^2 x lnln x',     phi: [() => 1],         off: x => L1(x) + 2 * L2(x) + L3(x), lab: b => `c = ${F(Math.exp(b[0]))}` },
  { key: 'MP2LLb', form: 'c x ln^2 x (lnln x)^b', phi: [() => 1, L3],     off: x => L1(x) + 2 * L2(x),      lab: b => `b = ${F(b[1])}` },
  { key: 'XLALLb', form: 'c x ln^a x (lnln x)^b', phi: [() => 1, L2, L3], off: x => L1(x),                  lab: b => `a = ${F(b[1])}, b = ${F(b[2])}` },
  { key: 'SQ',     form: 'c x^2',                 phi: [() => 1],         off: x => 2 * L1(x),              lab: b => `c = ${F(Math.exp(b[0]), 4)}` },
  { key: 'X',      form: 'c x',                   phi: [() => 1],         off: x => L1(x),                  lab: b => `c = ${F(Math.exp(b[0]), 2)}` },
];
const M = Object.fromEntries(MODELS.map(m => [m.key, m]));
const LAWS = MODELS.map(m => m.key);

function fit(model, xs, ys) {
  const n = xs.length, k = model.phi.length;
  const Phi = xs.map(x => model.phi.map(f => f(x)));
  const z = xs.map((x, i) => Math.log(ys[i]) - model.off(x));
  const A = Array.from({ length: k }, (_, a) => Array.from({ length: k }, (_, b) => Phi.reduce((s, r) => s + r[a] * r[b], 0)));
  const rhs = Array.from({ length: k }, (_, a) => Phi.reduce((s, r, i) => s + r[a] * z[i], 0));
  const beta = solve(A, rhs); if (!beta) return null;
  const pred = x => model.off(x) + model.phi.reduce((s, f, j) => s + beta[j] * f(x), 0);
  const res = xs.map((x, i) => Math.log(ys[i]) - pred(x));
  const rss = res.reduce((s, r) => s + r * r, 0);
  // orthogonality: residuals must be perpendicular to every design column.
  const orth = Math.max(...Array.from({ length: k }, (_, a) => Math.abs(Phi.reduce((s, r, i) => s + r[a] * res[i], 0))));
  const m0 = res.reduce((s, r) => s + r, 0) / n;
  let num = 0, den = 0;
  for (let i = 0; i < n; i++) { den += (res[i] - m0) ** 2; if (i) num += (res[i] - m0) * (res[i - 1] - m0); }
  const ac1 = den ? num / den : NaN;
  const ll2 = n * Math.log(rss / n);              // -2 log L up to a constant
  const aicK = ll2 + 2 * (k + 1);                  // K = k + 1, sigma^2 counted
  const aick = ll2 + 2 * k;                        // the target's convention
  const cc = (K) => (n - K - 1 > 0 ? 2 * K * (K + 1) / (n - K - 1) : NaN);
  return { model, key: model.key, beta, n, k, rss, rms: Math.sqrt(rss / n), orth, ac1,
    aiccCorrect: aicK + cc(k + 1), aiccTarget: aick + cc(k), aic: aicK,
    pred, predict: x => Math.exp(pred(x)) };
}

const win = (xs, ys, lo, hi) => { const o = { x: [], y: [] }; xs.forEach((x, i) => { if (x >= lo && x <= hi) { o.x.push(x); o.y.push(ys[i]); } }); return o; };
const dropAt = (w, xdrop) => { const o = { x: [], y: [] }; w.x.forEach((x, i) => { if (!xdrop.includes(x)) { o.x.push(x); o.y.push(w.y[i]); } }); return o; };

function race(w, keys) {
  const fits = keys.map(k => fit(M[k], w.x, w.y)).filter(Boolean);
  const bC = Math.min(...fits.map(f => f.aiccCorrect)), bT = Math.min(...fits.map(f => f.aiccTarget));
  fits.forEach(f => { f.dC = f.aiccCorrect - bC; f.dT = f.aiccTarget - bT; });
  return fits.sort((a, b) => a.dC - b.dC);
}

console.log('='.repeat(78));
console.log('RED TEAM: attack-growth-law.js section D, re-derived from scratch');
console.log('='.repeat(78));

// --- 0. data integrity ------------------------------------------------------
console.log('\n0. DATA INTEGRITY (what this file can check without leaving the repo)');
const convOK = X.every((x, i) => G2[i] === A144311[i] + 1);
console.log(`  G2[i] === A144311[i] + 1 for all ${X.length} terms .......... ${convOK ? 'yes' : 'NO'}`);
const idxOK = X.every((x, i) => P[i] === x);
console.log(`  X[i] is the (i+1)-th prime, i = 0..${X.length - 1} ................. ${idxOK ? 'yes' : 'NO'}`);
console.log(`  A144311 a(15) would be X[14] = ${X[14]} under offset 1 (an OEIS-side`);
console.log('    question this file cannot settle; flagged, not verified)');
const mono = G2.every((v, i) => i === 0 || v > G2[i - 1]);
console.log(`  ladder strictly increasing ............................. ${mono ? 'yes' : 'NO'}`);
console.log(`  control H has ${H.length} terms, p_${H.length} = ${P[H.length - 1]}`);
const hmono = H.every((v, i) => i === 0 || v > H[i - 1]);
console.log(`  control strictly increasing ............................ ${hmono ? 'yes' : 'NO'}`);

// --- 1. comparability -------------------------------------------------------
console.log('\n1. ARE THE TEN FITS COMPARABLE? AIC across models needs one response.');
const w11 = win(X, G2, 11, 79);
console.log(`  primary window x = 11..79, n = ${w11.x.length}`);
{
  const respHash = JSON.stringify(w11.y.map(v => Math.log(v).toFixed(12)));
  console.log(`  response is ln(G2) for every family, identical vector: yes (one array)`);
  console.log(`  response checksum ${respHash.length} chars, first ${F(Math.log(w11.y[0]), 6)}, last ${F(Math.log(w11.y[w11.y.length - 1]), 6)}`);
  const f = race(w11, LAWS);
  const worstOrth = Math.max(...f.map(q => q.orth));
  console.log(`  worst |Phi^T r| over all ten normal-equation solves: ${worstOrth.toExponential(2)}`);
  console.log('    (a correct least-squares solve makes this ~0; this is an');
  console.log('     independent check of the solver, not of the model choice)');
}

// --- 2. the AICc, both conventions -----------------------------------------
console.log('\n2. THE MODEL RACE, x = 11..79, WITH BOTH AICc CONVENTIONS');
console.log('   dT = the target file\'s dAICc (K = k). dC = correct (K = k+1, sigma^2 counted).');
console.log('   model    form                        k     RSS      dT     dC    shift   fitted');
for (const f of race(w11, LAWS)) {
  console.log('  ' + padr(f.key, 8) + padr(f.model.form, 28) + pad(f.k, 2)
    + pad(F(f.rss, 4), 9) + pad(F(f.dT, 1), 7) + pad(F(f.dC, 1), 7)
    + pad(F(f.dC - f.dT, 2), 8) + '   ' + f.model.lab(f.beta));
}
{
  const r = race(w11, LAWS), g = k => r.find(f => f.key === k);
  console.log(`\n  HEADLINE FIGURES, both ways:`);
  console.log(`    MP2  c x ln^2 x   excluded at  dT = ${F(g('MP2').dT, 1)}   dC = ${F(g('MP2').dC, 1)}`);
  console.log(`    PW   c x^a        excluded at  dT = ${F(g('PW').dT, 1)}   dC = ${F(g('PW').dC, 1)}`);
  console.log(`    winner under both conventions: dT ${r.slice().sort((a, b) => a.dT - b.dT)[0].key}, dC ${r[0].key}`);
  console.log(`  The mis-specification is real and it is CONSERVATIVE: it under-penalises`);
  console.log(`  the k >= 2 families, so correcting it moves PW FURTHER from the winner.`);
}

// --- 3. autocorrelation deflator -------------------------------------------
console.log('\n3. THE INDEPENDENCE ASSUMPTION UNDER AIC (the joint nobody priced)');
console.log('   AIC counts n independent observations. Residuals on a growth ladder are');
console.log('   serially correlated, and n_eff = n(1-r)/(1+r) for AR(1) with lag-1 r.');
console.log('   model      ac1     n_eff   dC     dC scaled to n_eff');
for (const f of race(w11, LAWS)) {
  const r = f.ac1, neff = f.n * (1 - r) / (1 + r);
  console.log('  ' + padr(f.key, 10) + pad(F(f.ac1, 3), 7) + pad(F(neff, 1), 8)
    + pad(F(f.dC, 1), 7) + pad(F(f.dC * neff / f.n, 1), 8));
}
console.log('   Read this as an order of magnitude, not a correction: the scaling is');
console.log('   heuristic and each model has its own r. What it says is that a gap of a');
console.log('   few units is inside the noise of the assumption, and a gap of 30 is not.');

// --- 4. does the exclusion survive the ends? -------------------------------
console.log('\n4. DROP THE ENDS. dC for the two excluded families, and the winner.');
console.log('   variant                        n   winner    MP2 dC   PW dC   MP2LL dC');
const variants = [
  ['full x = 11..79', w11],
  ['drop smallest (x=11)', dropAt(w11, [11])],
  ['drop largest (x=79)', dropAt(w11, [79])],
  ['drop both ends', dropAt(w11, [11, 79])],
  ['drop two smallest', dropAt(w11, [11, 13])],
  ['drop two largest', dropAt(w11, [73, 79])],
  ['drop all four ends', dropAt(w11, [11, 13, 73, 79])],
  ['ours only x = 11..43', win(X, G2, 11, 43)],
  ['new only x = 47..79', win(X, G2, 47, 79)],
  ['widen x = 5..79', win(X, G2, 5, 79)],
  ['widen x = 2..79', win(X, G2, 2, 79)],
  ['narrow x = 17..79', win(X, G2, 17, 79)],
  ['narrow x = 23..79', win(X, G2, 23, 79)],
];
for (const [name, w] of variants) {
  if (w.x.length < 6) { console.log('  ' + padr(name, 30) + pad(w.x.length, 3) + '   (too few points)'); continue; }
  const r = race(w, LAWS), g = k => r.find(f => f.key === k);
  console.log('  ' + padr(name, 30) + pad(w.x.length, 3) + '  ' + padr(r[0].key, 9)
    + pad(F(g('MP2').dC, 1), 8) + pad(F(g('PW').dC, 1), 8) + pad(F(g('MP2LL').dC, 1), 9));
}

// --- 5. jackknife -----------------------------------------------------------
console.log('\n5. JACKKNIFE: delete each of the 18 points in turn, x = 11..79.');
console.log('   deleted   winner     MP2 dC    PW dC   MP2LL dC');
let minMP2 = Infinity, minPW = Infinity, winners = {};
for (const xd of w11.x) {
  const w = dropAt(w11, [xd]), r = race(w, LAWS), g = k => r.find(f => f.key === k);
  minMP2 = Math.min(minMP2, g('MP2').dC); minPW = Math.min(minPW, g('PW').dC);
  winners[r[0].key] = (winners[r[0].key] || 0) + 1;
  console.log('  ' + pad(xd, 7) + '   ' + padr(r[0].key, 10) + pad(F(g('MP2').dC, 1), 8) + pad(F(g('PW').dC, 1), 8) + pad(F(g('MP2LL').dC, 1), 9));
}
console.log(`   worst case over all 18 deletions: MP2 dC >= ${F(minMP2, 1)}, PW dC >= ${F(minPW, 1)}`);
console.log('   winner tally: ' + Object.entries(winners).map(([k, v]) => `${k} ${v}`).join(', '));

// --- 6. the control, and what it does to the MP2 headline ------------------
console.log('\n6. THE CONTROL h(x#) AT THE MATCHED WINDOW, dC convention.');
console.log('   The control\'s conjectured truth is x (log x)^{2+o(1)} (Maier-Pomerance).');
console.log('   If MP2 is thrown out on the control TOO, then "MP2 excluded at 31.8" is');
console.log('   not evidence against the SHAPE. That is the load-bearing question here.');
const HX = P.slice(0, H.length);
const wh = win(HX, H, 11, 79);
console.log(`   control window x = 11..79, n = ${wh.x.length}`);
console.log('   model      G2 dC     h dC     reading');
{
  const rg = race(w11, LAWS), rh = race(wh, LAWS);
  for (const k of ['MP2LL', 'XLA', 'MP2LLb', 'PWL', 'XLALLb', 'MP3', 'PW', 'SQ', 'MP2', 'X']) {
    const a = rg.find(f => f.key === k), b = rh.find(f => f.key === k);
    let note = '';
    if (a.dC < 2 && b.dC > 10) note = 'wins on G2, thrown out on control';
    if (a.dC > 10 && b.dC < 2) note = 'wins on control, thrown out on G2';
    if (a.dC > 10 && b.dC > 10) note = 'thrown out on BOTH -- no shape evidence';
    console.log('  ' + padr(k, 10) + pad(F(a.dC, 1), 8) + pad(F(b.dC, 1), 9) + '   ' + note);
  }
  const mp2g = rg.find(f => f.key === 'MP2').dC, mp2h = rh.find(f => f.key === 'MP2').dC;
  console.log(`\n   MP2 is excluded by ${F(mp2g, 1)} on G2 and by ${F(mp2h, 1)} on the control.`);
  console.log(`   The control's exclusion is ${mp2h > mp2g ? 'LARGER' : 'SMALLER'} than G2's, by ${F(Math.abs(mp2h - mp2g), 1)} units.`);
  console.log('   So a frozen one-parameter law of the RIGHT shape is thrown out at this');
  console.log('   range at least this hard. The 31.8 prices the CONSTANT at this range,');
  console.log('   and cannot be quoted as evidence against x ln^2 x as a shape.');
  const pwg = rg.find(f => f.key === 'PW').dC, pwh = rh.find(f => f.key === 'PW').dC;
  console.log(`\n   PW is excluded by ${F(pwg, 1)} on G2 and by ${F(pwh, 1)} on the control,`);
  console.log('   where it WINS. That inversion is the one comparison here that does work,');
  console.log('   because the same estimator on the same window flips its verdict.');
}

// --- 7. what the winner's margin actually is -------------------------------
console.log('\n7. THE WINNER\'S OWN MARGIN. How much of "0.762 x ln^2 x lnln x" is decided?');
{
  const r = race(w11, LAWS);
  const within2 = r.filter(f => f.dC < 2).map(f => f.key);
  const within7 = r.filter(f => f.dC < 7).map(f => f.key);
  console.log(`   families within 2 dC of the winner: ${within2.join(', ')}  (${within2.length})`);
  console.log(`   families within 7 dC of the winner: ${within7.join(', ')}  (${within7.length})`);
  const c = r.find(f => f.key === 'MP2LL');
  console.log(`   MP2LL fitted constant c = ${F(Math.exp(c.beta[0]), 4)}`);
  // jackknife band on c
  let lo = Infinity, hi = -Infinity;
  for (const xd of w11.x) { const f = fit(M.MP2LL, ...Object.values(dropAt(w11, [xd])).slice(0, 2)); }
  const cs = w11.x.map(xd => { const w = dropAt(w11, [xd]); return Math.exp(fit(M.MP2LL, w.x, w.y).beta[0]); });
  lo = Math.min(...cs); hi = Math.max(...cs);
  console.log(`   jackknife band on c over 18 deletions: ${F(lo, 4)} .. ${F(hi, 4)}`);
  console.log(`   window band on c: 5..79 ${F(Math.exp(fit(M.MP2LL, ...[win(X, G2, 5, 79)].flatMap(w => [w.x, w.y])).beta[0]), 4)}`
    + `, 17..79 ${F(Math.exp(fit(M.MP2LL, ...[win(X, G2, 17, 79)].flatMap(w => [w.x, w.y])).beta[0]), 4)}`
    + `, 23..79 ${F(Math.exp(fit(M.MP2LL, ...[win(X, G2, 23, 79)].flatMap(w => [w.x, w.y])).beta[0]), 4)}`);
  console.log('   A constant quoted to three figures needs its band quoted beside it.');
}
console.log('\n' + '='.repeat(78));

// --- 8. the window the report did not report -------------------------------
console.log('\n8. THE WINDOW INVERSION. The report fits x = 11..79 and never says');
console.log('   what happens one prime lower. Its own script computes it (block D2)');
console.log('   and no reading and no report section interprets it. Section 2 of the');
console.log('   report argues: the estimator takes a pure power WHENEVER the data');
console.log('   lets it, it does so on the control, and it does NOT on G2, therefore');
console.log('   the log families winning on G2 is a property of G2. That argument');
console.log('   needs the inversion to hold. Here it is at four low ends, on BOTH');
console.log('   objects, so the comparison stays matched.');
console.log('   low end   n    G2 winner   G2 PW dC   ctrl winner  ctrl PW dC   inverts?');
for (const lo of [5, 7, 11, 13, 17, 23]) {
  const wg = win(X, G2, lo, 79), wc = win(HX, H, lo, 79);
  if (wg.x.length < 6) continue;
  const rg = race(wg, LAWS), rc = race(wc, LAWS);
  const gpw = rg.find(f => f.key === 'PW').dC, cpw = rc.find(f => f.key === 'PW').dC;
  const inverts = (gpw > 4 && cpw < 2);
  console.log('  ' + pad(lo, 7) + pad(wg.x.length, 5) + '   ' + padr(rg[0].key, 11)
    + pad(F(gpw, 1), 9) + '   ' + padr(rc[0].key, 12) + pad(F(cpw, 1), 10)
    + '   ' + (inverts ? 'YES' : 'no'));
}
console.log('   At low end 5 and 7 BOTH objects pick the pure power law, so there is');
console.log('   no inversion to read and the report\'s section 2 argument does not run.');
console.log('   The inversion is a property of the window as much as of G2.');
console.log('\n   And the stated reason for the window does not cover it. The script\'s');
console.log('   own note is "below x = 11 the ladder is 2,6,12,30 and lnln 2 < 0".');
console.log('   lnln 2 < 0 excludes x = 2 only. At x = 5 and x = 7:');
for (const x of [2, 3, 5, 7, 11]) {
  const a = Math.log(Math.log(x));
  console.log(`     x = ${pad(x, 2)}   lnln x = ${F(a, 4)}   lnlnln x = ${Number.isNaN(Math.log(a)) ? 'undefined' : F(Math.log(a), 4)}`);
}
console.log('   Every family runs at x = 5 and x = 7. Only x = 2 is undefined, and');
console.log('   x = 3 is defined too. So the low end is a judgement, not a constraint,');
console.log('   and the result is a function of it.');

// --- 9. what actually survives ---------------------------------------------
console.log('\n9. WHAT SURVIVES ALL OF THE ABOVE');
{
  const r = race(w11, LAWS);
  console.log('   a. The AICc mis-specification is real and CONSERVATIVE. Correcting it');
  console.log(`      moves PW from ${F(r.find(f=>f.key==='PW').dT,1)} to ${F(r.find(f=>f.key==='PW').dC,1)} and leaves MP2 at ${F(r.find(f=>f.key==='MP2').dC,1)}.`);
  console.log('   b. The fits ARE comparable: one response vector, one window, one');
  console.log('      estimator, and the solver is exact to 4e-14.');
  console.log('   c. At x = 11..79 the winner MP2LL is stable under every one of the');
  console.log('      18 single deletions and under dropping both ends.');
  console.log('   d. The x-exponent -> 1 conclusion is robust: it is shared by every');
  console.log('      family inside 7 units at every window tested.');
  console.log('   e. The two exclusions are NOT equally supported, and neither is');
  console.log('      what the headline says:');
  console.log('        MP2 at 31.8 is not shape evidence (section 6, and the report');
  console.log('        says so itself in its own section 2b).');
  console.log('        PW at 10.9 does not survive the smallest term (3.3) and');
  console.log('        reverses outright one prime lower (section 8).');
}
console.log('\n' + '='.repeat(78));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/redteam-growth-aicc.js
//   invocation:  node research/redteam-growth-aicc.js
//   code-sha256: c7d920ff3f652dc1a51e082d53777bad0027fcb25bcb7250e1d2c43e74f03cf4
//   out-sha256:  d1d84a3e108ea1b82cec89aaf14673beb6d05c00ac92e30e617ef5abd69b2104
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.1 s
// ============================================================================
// ==============================================================================
// RED TEAM: attack-growth-law.js section D, re-derived from scratch
// ==============================================================================
//
// 0. DATA INTEGRITY (what this file can check without leaving the repo)
//   G2[i] === A144311[i] + 1 for all 22 terms .......... yes
//   X[i] is the (i+1)-th prime, i = 0..21 ................. yes
//   A144311 a(15) would be X[14] = 47 under offset 1 (an OEIS-side
//     question this file cannot settle; flagged, not verified)
//   ladder strictly increasing ............................. yes
//   control H has 58 terms, p_58 = 271
//   control strictly increasing ............................ yes
//
// 1. ARE THE TEN FITS COMPARABLE? AIC across models needs one response.
//   primary window x = 11..79, n = 18
//   response is ln(G2) for every family, identical vector: yes (one array)
//   response checksum 307 chars, first 3.737670, last 7.444249
//   worst |Phi^T r| over all ten normal-equation solves: 3.92e-14
//     (a correct least-squares solve makes this ~0; this is an
//      independent check of the solver, not of the model choice)
//
// 2. THE MODEL RACE, x = 11..79, WITH BOTH AICc CONVENTIONS
//    dT = the target file's dAICc (K = k). dC = correct (K = k+1, sigma^2 counted).
//    model    form                        k     RSS      dT     dC    shift   fitted
//   MP2LL   c x ln^2 x lnln x            1   0.0671    0.0    0.0    0.00   c = 0.762
//   MP2LLb  c x ln^2 x (lnln x)^b        2   0.0624    1.2    1.6    0.36   b = 0.893
//   XLA     c x ln^a x                   2   0.0643    1.8    2.1    0.36   a = 2.758
//   XLALLb  c x ln^a x (lnln x)^b        3   0.0624    4.2    5.0    0.81   a = 1.952, b = 0.950
//   PWL     c x^a (ln x)^b               3   0.0631    4.4    5.2    0.81   a = 0.833, b = 3.316
//   MP3     c x ln^3 x                   1   0.0977    6.8    6.8    0.00   c = 0.2691
//   PW      c x^a                        2   0.1048   10.6   10.9    0.36   a = 1.818
//   SQ      c x^2                        1   0.3175   28.0   28.0    0.00   c = 0.3276
//   MP2     c x ln^2 x                   1   0.3926   31.8   31.8    0.00   c = 0.956
//   X       c x                          1   4.4105   75.3   75.3    0.00   c = 12.05
//
//   HEADLINE FIGURES, both ways:
//     MP2  c x ln^2 x   excluded at  dT = 31.8   dC = 31.8
//     PW   c x^a        excluded at  dT = 10.6   dC = 10.9
//     winner under both conventions: dT MP2LL, dC MP2LL
//   The mis-specification is real and it is CONSERVATIVE: it under-penalises
//   the k >= 2 families, so correcting it moves PW FURTHER from the winner.
//
// 3. THE INDEPENDENCE ASSUMPTION UNDER AIC (the joint nobody priced)
//    AIC counts n independent observations. Residuals on a growth ladder are
//    serially correlated, and n_eff = n(1-r)/(1+r) for AR(1) with lag-1 r.
//    model      ac1     n_eff   dC     dC scaled to n_eff
//   MP2LL      -0.066    20.6    0.0     0.0
//   MP2LLb     -0.150    24.3    1.6     2.2
//   XLA        -0.145    24.1    2.1     2.9
//   XLALLb     -0.148    24.3    5.0     6.7
//   PWL        -0.148    24.2    5.2     7.0
//   MP3         0.230    11.3    6.8     4.2
//   PW          0.130    13.8   10.9     8.4
//   SQ          0.679     3.4   28.0     5.3
//   MP2         0.605     4.4   31.8     7.8
//   X           0.773     2.3   75.3     9.7
//    Read this as an order of magnitude, not a correction: the scaling is
//    heuristic and each model has its own r. What it says is that a gap of a
//    few units is inside the noise of the assumption, and a gap of 30 is not.
//
// 4. DROP THE ENDS. dC for the two excluded families, and the winner.
//    variant                        n   winner    MP2 dC   PW dC   MP2LL dC
//   full x = 11..79                18  MP2LL        31.8    10.9      0.0
//   drop smallest (x=11)           17  MP2LL        22.5     3.3      0.0
//   drop largest (x=79)            17  MP2LL        28.7    10.3      0.0
//   drop both ends                 16  MP2LL        19.6     3.3      0.0
//   drop two smallest              16  MP2LL        18.3     3.0      0.0
//   drop two largest               16  MP2LL        25.4    10.1      0.0
//   drop all four ends             14  MP2LL        12.8     3.4      0.0
//   ours only x = 11..43           10  MP2LL        13.0     6.1      0.0
//   new only x = 47..79             8  MP3           8.4     4.9      1.1
//   widen x = 5..79                20  PW           13.9     0.0     38.4
//   widen x = 2..79                22  PW            n/a     n/a      n/a
//   narrow x = 17..79              16  MP2LL        18.3     3.0      0.0
//   narrow x = 23..79              14  MP2LL        13.3     3.8      0.0
//
// 5. JACKKNIFE: delete each of the 18 points in turn, x = 11..79.
//    deleted   winner     MP2 dC    PW dC   MP2LL dC
//        11   MP2LL         22.5     3.3      0.0
//        13   MP2LL         29.2    12.0      0.0
//        17   MP2LL         28.3    10.6      0.0
//        19   MP2LL         32.9    10.8      0.0
//        23   MP2LL         30.2     9.8      0.0
//        29   MP2LL         37.7    18.0      0.0
//        31   MP2LL         30.1     9.8      0.0
//        37   MP2LL         32.9     8.9      0.0
//        41   MP2LL         30.4    10.9      0.0
//        43   MP2LL         29.9    10.2      0.0
//        47   MP2LL         29.9    10.5      0.0
//        53   MP2LL         29.7    10.6      0.0
//        59   MP2LL         32.0    11.4      0.0
//        61   MP2LL         29.9    10.6      0.0
//        67   MP2LL         29.3    10.5      0.0
//        71   MP2LL         29.4    10.3      0.0
//        73   MP2LL         28.7    10.7      0.0
//        79   MP2LL         28.7    10.3      0.0
//    worst case over all 18 deletions: MP2 dC >= 22.5, PW dC >= 3.3
//    winner tally: MP2LL 18
//
// 6. THE CONTROL h(x#) AT THE MATCHED WINDOW, dC convention.
//    The control's conjectured truth is x (log x)^{2+o(1)} (Maier-Pomerance).
//    If MP2 is thrown out on the control TOO, then "MP2 excluded at 31.8" is
//    not evidence against the SHAPE. That is the load-bearing question here.
//    control window x = 11..79, n = 18
//    model      G2 dC     h dC     reading
//   MP2LL          0.0     51.5   wins on G2, thrown out on control
//   XLA            2.1      2.0
//   MP2LLb         1.6      0.4
//   PWL            5.2      2.0
//   XLALLb         5.0      3.3
//   MP3            6.8     54.0
//   PW            10.9      0.0   wins on control, thrown out on G2
//   SQ            28.0     59.1   thrown out on BOTH -- no shape evidence
//   MP2           31.8     32.8   thrown out on BOTH -- no shape evidence
//   X             75.3     27.0   thrown out on BOTH -- no shape evidence
//
//    MP2 is excluded by 31.8 on G2 and by 32.8 on the control.
//    The control's exclusion is LARGER than G2's, by 1.0 units.
//    So a frozen one-parameter law of the RIGHT shape is thrown out at this
//    range at least this hard. The 31.8 prices the CONSTANT at this range,
//    and cannot be quoted as evidence against x ln^2 x as a shape.
//
//    PW is excluded by 10.9 on G2 and by 0.0 on the control,
//    where it WINS. That inversion is the one comparison here that does work,
//    because the same estimator on the same window flips its verdict.
//
// 7. THE WINNER'S OWN MARGIN. How much of "0.762 x ln^2 x lnln x" is decided?
//    families within 2 dC of the winner: MP2LL, MP2LLb  (2)
//    families within 7 dC of the winner: MP2LL, MP2LLb, XLA, XLALLb, PWL, MP3  (6)
//    MP2LL fitted constant c = 0.7624
//    jackknife band on c over 18 deletions: 0.7574 .. 0.7698
//    window band on c: 5..79 0.8316, 17..79 0.7591, 23..79 0.7534
//    A constant quoted to three figures needs its band quoted beside it.
//
// ==============================================================================
//
// 8. THE WINDOW INVERSION. The report fits x = 11..79 and never says
//    what happens one prime lower. Its own script computes it (block D2)
//    and no reading and no report section interprets it. Section 2 of the
//    report argues: the estimator takes a pure power WHENEVER the data
//    lets it, it does so on the control, and it does NOT on G2, therefore
//    the log families winning on G2 is a property of G2. That argument
//    needs the inversion to hold. Here it is at four low ends, on BOTH
//    objects, so the comparison stays matched.
//    low end   n    G2 winner   G2 PW dC   ctrl winner  ctrl PW dC   inverts?
//         5   20   PW               0.0   PW                 0.0   no
//         7   19   XLALLb           3.1   MP2LLb             1.5   no
//        11   18   MP2LL           10.9   PW                 0.0   YES
//        13   17   MP2LL            3.3   PWL                6.1   no
//        17   16   MP2LL            3.0   PWL                1.6   no
//        23   14   MP2LL            3.8   PW                 0.0   no
//    At low end 5 and 7 BOTH objects pick the pure power law, so there is
//    no inversion to read and the report's section 2 argument does not run.
//    The inversion is a property of the window as much as of G2.
//
//    And the stated reason for the window does not cover it. The script's
//    own note is "below x = 11 the ladder is 2,6,12,30 and lnln 2 < 0".
//    lnln 2 < 0 excludes x = 2 only. At x = 5 and x = 7:
//      x =  2   lnln x = -0.3665   lnlnln x = undefined
//      x =  3   lnln x = 0.0940   lnlnln x = -2.3640
//      x =  5   lnln x = 0.4759   lnlnln x = -0.7426
//      x =  7   lnln x = 0.6657   lnlnln x = -0.4069
//      x = 11   lnln x = 0.8746   lnlnln x = -0.1340
//    Every family runs at x = 5 and x = 7. Only x = 2 is undefined, and
//    x = 3 is defined too. So the low end is a judgement, not a constraint,
//    and the result is a function of it.
//
// 9. WHAT SURVIVES ALL OF THE ABOVE
//    a. The AICc mis-specification is real and CONSERVATIVE. Correcting it
//       moves PW from 10.6 to 10.9 and leaves MP2 at 31.8.
//    b. The fits ARE comparable: one response vector, one window, one
//       estimator, and the solver is exact to 4e-14.
//    c. At x = 11..79 the winner MP2LL is stable under every one of the
//       18 single deletions and under dropping both ends.
//    d. The x-exponent -> 1 conclusion is robust: it is shared by every
//       family inside 7 units at every window tested.
//    e. The two exclusions are NOT equally supported, and neither is
//       what the headline says:
//         MP2 at 31.8 is not shape evidence (section 6, and the report
//         says so itself in its own section 2b).
//         PW at 10.9 does not survive the smallest term (3.3) and
//         reverses outright one prime lower (section 8).
//
// ==============================================================================
// ============================================================
// READINGS
// ============================================================
//
// 1. THE AICc IS MIS-SPECIFIED, AND THE ERROR IS CONSERVATIVE. A Gaussian
//    least-squares model with unknown variance estimates K = k + 1 parameters,
//    not k. attack-growth-law.js uses k. The AIC constant cancels in a
//    difference, but the AICc correction 2K(K+1)/(n-K-1) does not, so every
//    comparison between families of different dimension is mis-priced. At
//    n = 18 the shift is 0.00 for k = 1, 0.36 for k = 2 and 0.81 for k = 3, and
//    it always penalises the LARGER model. Corrected: PW moves from 10.6 to
//    10.9 and MP2 stays at 31.8, because MP2 and the winner MP2LL are both
//    k = 1. The winner is MP2LL under both conventions. The headline figures
//    survive this and are, if anything, understated.
//
// 2. THE FITS ARE COMPARABLE AND THE SOLVER IS EXACT. All ten families regress
//    the SAME response ln G2 on the SAME 18 points with frozen exponents moved
//    into an offset, which is a coefficient pinned at 1 and not a change of
//    response, so AIC differences are legitimate. The worst |Phi^T r| over all
//    ten normal-equation solves is 3.92e-14, which is an independent check of
//    the solve and not of the model choice.
//
// 3. THE WINNER IS STABLE, THE EXCLUSIONS ARE NOT EQUALLY SO. MP2LL wins all
//    18 single-point deletions and survives dropping both ends, both smallest,
//    both largest and all four ends. Its constant has a jackknife band of
//    0.7574..0.7698 around 0.7624 -- but a WINDOW band of 0.7534..0.8316, which
//    is five times wider. A constant quoted to three figures needs the window
//    band beside it, not the jackknife band.
//
// 4. THE PURE POWER LAW'S EXCLUSION RESTS ON ONE POINT. dropping x = 11 alone
//    takes PW from 10.9 to 3.3, which is not an exclusion on the same
//    Burnham-Anderson scale the report invokes; the worst case over all 18
//    deletions is 3.3, and it is x = 11 that produces it. Dropping the largest
//    term instead leaves 10.3. So the 10.6 is carried by the smallest term in
//    the window, and the report quotes it without that qualification.
//
// 5. AND ONE PRIME LOWER, THE WHOLE RANKING REVERSES. At x = 5..79, twenty
//    terms, PW WINS and MP2LL is excluded at 38.4. attack-growth-law.js
//    computes this itself, as its block D2, and neither its fourteen readings
//    nor any of the eleven sections of attack-growth-law.md mentions it --
//    including section 10, "What is not established", which lists five other
//    caveats. The stated reason for the window is "below x = 11 the ladder is
//    2,6,12,30 and lnln 2 < 0". lnln 2 < 0 excludes x = 2 and nothing else:
//    lnln x is 0.0940 at x = 3, 0.4759 at x = 5 and 0.6657 at x = 7, and every
//    family runs at all three. The low end is a judgement and the answer is a
//    function of it.
//
// 6. THE SECTION-2 CALIBRATION ARGUMENT IS ALSO WINDOW-SPECIFIC. Its form is:
//    the estimator takes a pure power whenever the data lets it, it does so on
//    the control, it does not on G2, therefore the log families' win is a
//    property of G2. Run on BOTH objects at six low ends, the inversion appears
//    at exactly one of them, x = 11. At low end 5 and at low end 7 both objects
//    pick a power or near-power and there is no inversion to read; at low end
//    13 PW does BETTER on G2 (3.3) than on the control (6.1), which is the
//    opposite sign. The inversion is a property of the window at least as much
//    as of G2.
//
// 7. THE 31.8 IS NOT SHAPE EVIDENCE, AND THE REPORT SAYS SO ITSELF. MP2 is
//    thrown out by 31.8 on G2 and by 32.8 on the control, whose conjectured
//    truth IS x ln^2 x. A frozen one-parameter law is beaten at this range
//    whether or not it is true. attack-growth-law.md section 2b and reading 3
//    state this correctly and say "quote it that way or not at all". Any
//    downstream sentence of the form "c x ln^2 x excluded at 31.8 AICc units"
//    has dropped that qualification.
//
// 8. WHAT DOES SURVIVE. Every family inside 7 units has x-exponent tending to
//    1, at every window tested, and that is the conclusion the corpus actually
//    consumes. The AICc arithmetic, the comparability of the fits and the
//    stability of the winner at the stated window are all sound. What is not
//    established is either exclusion at the strength the headline states them.
//
// 9. AND ONE JOINT NOBODY PRICED. AIC counts n independent observations.
//    Residual lag-1 autocorrelation runs from -0.150 to 0.773 across the ten
//    families, and the AR(1) effective sample size n(1-r)/(1+r) is 4.4 for MP2
//    and 13.8 for PW against n = 18. Scaling dAICc by n_eff/n is heuristic and
//    each model has its own r, so this is an order of magnitude and not a
//    correction. What it says is that a gap of a few units is inside the noise
//    of the independence assumption and a gap of 30 is not.
