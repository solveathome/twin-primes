// ============================================================================
// LIT-KOURBATOV-SHORTFALL — IS THE 6.0% RECORD-LOCATION DEFICIT KOURBATOV'S
// PUBLISHED FINITE-HEIGHT SHORTFALL b? SCRATCHPAD-GRADE, NOT FORMALLY EMBEDDED.
// ============================================================================
// THE QUESTION. record-location-null.md sec 7/8 flags one unchecked exposure:
// whether the in-house 6.0% trend-load deficit of the A113274 record ladder
// against a matched pure-Exp null is the same fact as Kourbatov's documented
// shortfall of maximal k-tuple gaps below a*log(p/a), in another normalisation.
//
// THE NORMALISATION MAP (read at page image, sources in the .md):
//   Kourbatov, JIS 16 (2013) 13.5.2 = arXiv:1301.2242, sect. 5.2, standardizes
//     g*_k = (g_k(p) - a log(p/a)) / a,  a = C_k log^k p,  C_2 = 0.75739.
//   The repo (zonegap-03-model.js) uses
//     abar(x) = ln^2 x/(2C2) = log^2 x/1.32032 = Kourbatov's a at k = 2,
//     trend(x) = abar*ln(x/abar)             = Kourbatov's E2 = a log(p/a),
//     z = (g - trend(e))/abar(e)             = Kourbatov's g*_2.
//   So z IS g*_2. No re-normalisation is needed; only the reference level
//   differs (Kourbatov references zero, the repo references a simulated null).
//   Kourbatov's estimator E1 = a log(p/a) - b*a puts the shortfall in b, and
//   A = mean g/trend relates to a constant-b model by
//     A(b) = mean_k (1 - b/L_k),   L_k = ln(e_k/abar(e_k)).
//
// PUBLISHED b VALUES FOR TWINS (k = 2), all cited, none recomputed:
//   b = 2/k = 1        arXiv:1309.4053 p.1 (and 1301.2242 Fig. 1 caption)
//   b = 1.2597         1301.2242 sect. 5.1 obs. 1, median-unbiased, p < 1e15
//   b = -(mu* + gamma) 1301.2242 sect. 5.2 Note, mu* = -1.659 at k = 2, p < 1e15
//
// ALSO COMPUTED: Kourbatov-Wolf 2019 (arXiv:1901.03785) Defs 4-5 lower/upper
// trend separation at the ladder's own heights, and the fraction of our records
// below their lower trend T_c, against their sect. 3.1 statement that for k = 2
// "approximately half" sit below T_c.
//
// CITED, NOT RECOMPUTED (standing compute rule): the null level
// A_null = 0.9895 +- 0.0182 and z_null = -0.212 +- 0.244 from
// zonegap-03-model.js sect.(b); the deficit 6.06% and its sigma 1.84% from
// record-location-null.js.
//
//   node research/history/staging/lit-kourbatov-shortfall.js
// ============================================================================
'use strict';
const fs = require('fs'), path = require('path');
const T0 = Date.now();
const C2 = 0.6601618158468696;                 // Hardy-Littlewood twin constant
const CKH = 2 * C2;                            // KW's C_{2,H} = 1.32032363
const GAMMA = 0.5772156649015329;
const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
const sd = (a) => { const m = mean(a); return Math.sqrt(mean(a.map(x => (x - m) * (x - m)))); };
const med = (a) => { const s = a.slice().sort((x, y) => x - y), n = s.length;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const log = (s) => console.log(s);
const fail = (s) => { console.log('FAIL: ' + s); process.exit(1); };
const F = (x, d) => x.toFixed(d);

// ---- ladder, extracted from the adopted producer's source (never transcribed)
const LSRC = fs.readFileSync(path.join(__dirname, '..', '..', 'a113274-gap-records.js'), 'utf8');
function extractArray(name) {
  const m = LSRC.match(new RegExp(name + String.raw` = \[([\s\S]*?)\];`));
  if (!m) fail('array ' + name + ' not found in ladder source');
  return m[1].match(/\d+/g).map(BigInt);
}
const GAP = extractArray('GAP'), START = extractArray('START');
if (GAP.length !== 82 || START.length !== 82) fail('ladder term counts');
const E = START.map((s, i) => s + GAP[i] + 2n);            // zonegap-03 convention
const L82 = GAP.map((g, k) => ({ e: Number(E[k]), g: Number(g) }));

// ---- zonegap-03-model.js's estimator, verbatim ------------------------------
const abar  = (x) => Math.log(x) * Math.log(x) / (2 * C2);
const trend = (x) => abar(x) * Math.log(x / abar(x));      // = Kourbatov E2

// ---- KW 2019 Defs 2 and 4: a_c(x) = x/(C_{2,H} Li_2(x)), T_c = a_c log(pi_c)
function Li2(x) {                                          // Simpson in v = ln t
  const v0 = Math.log(2), v1 = Math.log(x), n = 20000, h = (v1 - v0) / n;
  let s = 0;
  for (let i = 0; i <= n; i++) {
    const v = v0 + i * h, f = Math.exp(v) / (v * v);
    s += f * (i === 0 || i === n ? 1 : (i % 2 ? 4 : 2));
  }
  return s * h / 3;
}
const pic  = (x) => CKH * Li2(x);
const a_c  = (x) => x / pic(x);
const T_c  = (x) => a_c(x) * Math.log(pic(x));

function panel(recs, label) {
  const z  = recs.map(r => (r.g - trend(r.e)) / abar(r.e));   // = Kourbatov g*_2
  const A  = mean(recs.map(r => r.g / trend(r.e)));
  const iL = recs.map(r => 1 / Math.log(r.e / abar(r.e)));    // 1/L_k
  const zm = mean(z), zs = sd(z);
  const alpha = zs * Math.sqrt(6) / Math.PI, mu = zm - GAMMA * alpha;
  log('');
  log('  [' + label + ']  n = ' + recs.length);
  log('    A = mean g/T          ' + F(A, 4) + '        (1 - A = ' + F(1 - A, 4) + ')');
  log('    z = g*_2: mean        ' + F(zm, 4) + '   median ' + F(med(z), 4) + '   sd ' + F(zs, 4));
  log('    implied Gumbel        scale alpha = ' + F(alpha, 4) + ', mode mu = ' + F(mu, 4));
  log('    mean 1/L_k            ' + F(mean(iL), 5) + '   (L_k = ln(e_k/abar))');
  return { A, zm, zs, mu, alpha, mL: mean(iL), z, recs };
}

log('LIT-KOURBATOV-SHORTFALL — the 6.0% deficit against Kourbatov\'s published b.');
log('SCRATCHPAD-GRADE. Ladder: A113274/A113275 as adopted, 82 records.');
log('');
log('(a) GATE — reproduce the two published in-house readings on the same window.');
const W = L82.filter(r => r.e >= 1e4);
const full = panel(W, 'window [1e4, 7.05e16], zonegap-03 window');
if (Math.abs(full.A - 0.9295) > 5e-4) fail('A gate: ' + F(full.A, 4) + ' vs published 0.9295');
if (Math.abs(full.zm + 1.298) > 5e-3) fail('z-mean gate: ' + F(full.zm, 4) + ' vs published -1.298');
if (Math.abs(full.zs - 1.021) > 5e-3) fail('z-sd gate: ' + F(full.zs, 4) + ' vs published 1.021');
if (W.length !== 72) fail('n gate: ' + W.length);
log('    GATE PASS: A 0.9295, z mean -1.298, z sd 1.021, n 72 all reproduced.');

log('');
log('(b) KOURBATOV\'S WINDOW — records below 1e15, the window of his Fig. 4 (k=2)');
log('    and of the median-unbiased b = 1.2597. His fit is to ALL records below');
log('    1e15; the [1e4, .] cut is shown too so the two effects are separable.');
const K15  = L82.filter(r => r.e < 1e15);
const K15w = L82.filter(r => r.e < 1e15 && r.e >= 1e4);
const kAll = panel(K15,  'all records, e < 1e15');
const kWin = panel(K15w, 'e in [1e4, 1e15)');

log('');
log('(c) THE COMPARISON, in the repo\'s A-normalisation.');
log('    A(b) = mean_k (1 - b/L_k) for a constant-b model; null level A_null =');
log('    0.9895 +- 0.0182 and deficit 6.06% +- 1.84% are CITED, not recomputed.');
const A_NULL = 0.9895, SIG = 0.0182;
const bTable = [
  ['b = 1        (2/k, arXiv:1309.4053 p.1; 1301.2242 Fig.1)', 1],
  ['b = 1.0818   (-(mu*+gamma), mu* = -1.659, 1301.2242 5.2)', 1.659 - GAMMA],
  ['b = 1.2597   (median-unbiased, 1301.2242 5.1 obs.1)     ', 1.2597],
];
log('');
log('    model                                                   A(b)    deficit vs null   z');
for (const [lab, b] of bTable) {
  const A = 1 - b * full.mL, d = (A_NULL - A) / A_NULL;
  log('    ' + lab + '  ' + F(A, 4) + '  ' + F(100 * d, 2) + '%'
      + '            ' + F((A - A_NULL) / SIG, 2));
}
{
  const d = (A_NULL - full.A) / A_NULL;
  log('    IN-HOUSE DATA (record-location-null.md sect.2)             ' + F(full.A, 4)
      + '  ' + F(100 * d, 2) + '%            ' + F((full.A - A_NULL) / SIG, 2));
}
log('');
log('    Same comparison read the other way, in Kourbatov\'s own b units:');
log('      b implied by the in-house z mean, [1e4, 7.05e16]   ' + F(-full.zm, 4));
log('      b implied by the in-house z median, same window    ' + F(-med(full.z), 4));
log('      b implied by the in-house z mean, e < 1e15         ' + F(-kAll.zm, 4));
log('      b implied by the in-house z median, e < 1e15       ' + F(-med(kAll.z), 4)
    + '   (Kourbatov 1.2597, same window, median-unbiased)');
log('      in-house Gumbel mode mu, e < 1e15                  ' + F(kAll.mu, 4)
    + '   (Kourbatov mu* = -1.659, same window)');

log('');
log('(d) KW 2019 (arXiv:1901.03785) Defs 4-5: where their LOWER trend T_c sits');
log('    in the same normalisation, and their sect. 3.1 k=2 claim tested here.');
const rows = W.map(r => ({ ...r, Tb: trend(r.e), Tc: T_c(r.e), ab: abar(r.e) }));
const ratio = mean(rows.map(r => r.Tc / r.Tb));
const sep   = mean(rows.map(r => (r.Tb - r.Tc) / r.ab));
const below = rows.filter(r => r.g < r.Tc).length;
log('    mean T_c/T_bar over the 72 records          ' + F(ratio, 4));
log('    mean (T_bar - T_c)/abar (KW eq (17): -> k = 2)  ' + F(sep, 4));
log('    records below T_c: ' + below + ' of ' + rows.length + ' = ' + F(100 * below / rows.length, 1)
    + '%   (KW 3.1: "approximately half" for k = 2)');
log('    deficit of T_c against the null level        ' + F(100 * (A_NULL - ratio) / A_NULL, 2) + '%');

log('');
log('(e) HEIGHT PROFILE of the implied b, four disjoint bands (profile only).');
const bands = [[1e4, 1e8], [1e8, 1e11], [1e11, 1e14], [1e14, 8e16]];
for (const [lo, hi] of bands) {
  const s = W.filter(r => r.e >= lo && r.e < hi);
  if (!s.length) continue;
  const z = s.map(r => (r.g - trend(r.e)) / abar(r.e));
  log('    [' + lo.toExponential(0) + ', ' + hi.toExponential(0) + ')  n = '
      + String(s.length).padStart(2) + '   b = ' + F(-mean(z), 4)
      + '   A = ' + F(mean(s.map(r => r.g / trend(r.e))), 4));
}
log('');
log('runtime ' + ((Date.now() - T0) / 1000).toFixed(1) + ' s');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/lit-kourbatov-shortfall.js
//   invocation:  node research/history/staging/lit-kourbatov-shortfall.js
//   code-sha256: 46236c5a6a9cec202ac1ded85bd138bd73661ba2f2e3588c525e70b446b0e0c4
//   out-sha256:  ec4bd242895e061e55b42770dcc4f13a350cfe044bb90d6873fa0696f769bd27
//   body-lines:  59
//   inputs:      research/history@c5b6ecc62124
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     0.1 s
// ============================================================================
// LIT-KOURBATOV-SHORTFALL — the 6.0% deficit against Kourbatov's published b.
// SCRATCHPAD-GRADE. Ladder: A113274/A113275 as adopted, 82 records.
//
// (a) GATE — reproduce the two published in-house readings on the same window.
//
//   [window [1e4, 7.05e16], zonegap-03 window]  n = 72
//     A = mean g/T          0.9295        (1 - A = 0.0705)
//     z = g*_2: mean        -1.2981   median -1.3159   sd 1.0213
//     implied Gumbel        scale alpha = 0.7963, mode mu = -1.7577
//     mean 1/L_k            0.06269   (L_k = ln(e_k/abar))
//     GATE PASS: A 0.9295, z mean -1.298, z sd 1.021, n 72 all reproduced.
//
// (b) KOURBATOV'S WINDOW — records below 1e15, the window of his Fig. 4 (k=2)
//     and of the median-unbiased b = 1.2597. His fit is to ALL records below
//     1e15; the [1e4, .] cut is shown too so the two effects are separable.
//
//   [all records, e < 1e15]  n = 71
//     A = mean g/T          0.9271        (1 - A = 0.0729)
//     z = g*_2: mean        -1.2006   median -1.2597   sd 1.0387
//     implied Gumbel        scale alpha = 0.8099, mode mu = -1.6681
//     mean 1/L_k            0.13842   (L_k = ln(e_k/abar))
//
//   [e in [1e4, 1e15)]  n = 61
//     A = mean g/T          0.9220        (1 - A = 0.0780)
//     z = g*_2: mean        -1.3727   median -1.3980   sd 0.9890
//     implied Gumbel        scale alpha = 0.7711, mode mu = -1.8178
//     mean 1/L_k            0.06798   (L_k = ln(e_k/abar))
//
// (c) THE COMPARISON, in the repo's A-normalisation.
//     A(b) = mean_k (1 - b/L_k) for a constant-b model; null level A_null =
//     0.9895 +- 0.0182 and deficit 6.06% +- 1.84% are CITED, not recomputed.
//
//     model                                                   A(b)    deficit vs null   z
//     b = 1        (2/k, arXiv:1309.4053 p.1; 1301.2242 Fig.1)  0.9373  5.27%            -2.87
//     b = 1.0818   (-(mu*+gamma), mu* = -1.659, 1301.2242 5.2)  0.9322  5.79%            -3.15
//     b = 1.2597   (median-unbiased, 1301.2242 5.1 obs.1)       0.9210  6.92%            -3.76
//     IN-HOUSE DATA (record-location-null.md sect.2)             0.9295  6.07%            -3.30
//
//     Same comparison read the other way, in Kourbatov's own b units:
//       b implied by the in-house z mean, [1e4, 7.05e16]   1.2981
//       b implied by the in-house z median, same window    1.3159
//       b implied by the in-house z mean, e < 1e15         1.2006
//       b implied by the in-house z median, e < 1e15       1.2597   (Kourbatov 1.2597, same window, median-unbiased)
//       in-house Gumbel mode mu, e < 1e15                  -1.6681   (Kourbatov mu* = -1.659, same window)
//
// (d) KW 2019 (arXiv:1901.03785) Defs 4-5: where their LOWER trend T_c sits
//     in the same normalisation, and their sect. 3.1 k=2 claim tested here.
//     mean T_c/T_bar over the 72 records          0.9114
//     mean (T_bar - T_c)/abar (KW eq (17): -> k = 2)  1.4830
//     records below T_c: 32 of 72 = 44.4%   (KW 3.1: "approximately half" for k = 2)
//     deficit of T_c against the null level        7.89%
//
// (e) HEIGHT PROFILE of the implied b, four disjoint bands (profile only).
//     [1e+4, 1e+8)  n = 16   b = 0.7133   A = 0.9301
//     [1e+8, 1e+11)  n = 15   b = 1.8161   A = 0.8881
//     [1e+11, 1e+14)  n = 24   b = 1.6197   A = 0.9280
//     [1e+14, 8e+16)  n = 17   b = 0.9372   A = 0.9674
//
// runtime 0.0 s
// ============================================================================
// READINGS
// ============================================================================
