// ============================================================================
// ZONEGAP 03 — THE STAIRCASE-AWARE MODEL: Z2(p) = env(p) + D(p), AND D IS
// IDENTICALLY ZERO — THE PER-ZONE FIELD IS PURE CUSTODY, PROVEN AND VERIFIED
// ============================================================================
// THE QUESTION (the zonegap-01 NOT-REACHED, 2026-08-21). zonegap-01 measured
// Z2(p) at all 27,292 zones to X = 1e11 and posed the right model: Z2 =
// envelope-at-p'^2 plus a below-record correction field D(p) <= 0, with the
// three prereg misses all blamed on record correlation. This file EXTRACTS
// that model and finds the strongest possible form: D(p) = 0 AT EVERY ZONE.
//
// THE ONE-PARAGRAPH THEOREM (conditional only on the adopted record ladder
// being the true running max, which zonegap-01's CUSTODY 1/2 verified
// in-range). Let env(p) = the largest A113274 record wholly below p'^2
// (endpoint s_k + g_k + 2 < p'^2). (<=) Every in-zone gap is a gap between
// consecutive twin pairs lying wholly below p'^2, and the largest twin gap
// wholly below any bound is by definition the last record before it: so
// Z2(p) <= env(p). (>=) If the env record's start satisfies s_k > p, the two
// pairs bounding it are both in-zone and consecutive there, so Z2(p) >=
// g_k = env(p). The premise s_k > p holds at ALL 27,292 swept zones
// (verified below) and propagates through the whole published ladder
// (s_k^2 > e_{k+1} checked for all 82 records below), so the identity
// Z2(p) = env(p) holds at every zone any reachable sweep will ever close.
// Hence: the per-zone series is 100% redundant given the ladder + the
// primes; the "correlated staircase" is not approximately a staircase, it
// IS the staircase; and every distributional quantity zonegap-01 measured
// (band c3, u position, deciles, the power-fit exponent) is a DETERMINISTIC
// functional of trusted published data, recomputable in milliseconds with
// no sieve. This file re-derives every one of them and asserts equality
// against zonegap-01's embedded OUTPUT, digit for digit.
//
// WHAT THIS FILE DOES (parsing + fitting + controls ONLY — no twin sieve,
// no re-run of the 315.7 s sweep; compute budget LIGHT):
//   1. Parses the embedded OUTPUT block of research/zonegap-01.js (the
//      27,292-zone dataset's only carrier) with self-tested extraction.
//   2. Rebuilds the per-zone field from the ADOPTED tables alone (A113274/
//      A113275 ladder + a base prime sieve to 1e6, milliseconds) and
//      asserts every embedded aggregate is reproduced EXACTLY: 6 band c3
//      means and sds, band mean u and frac u>0.8, the 10 u-decile counts,
//      mean u, the power-fit exponent, and all 39 envelope-step rows.
//   3. Explains the u-histogram's mid-dip bimodality deterministically
//      (the record-spacing spectrum; per-step decomposition printed).
//   4. Does the record-process statistics RIGHT (the only statistical
//      object left): rate, spacings, rescaled exceedances of the 82-record
//      ladder against a matched Kourbatov-Wolf Gumbel null ensemble, with
//      in-pass controls run BEFORE the data is read (deterministic
//      recovery, injection sensitivity, null calibration).
//   5. Prints the PREREG FEEDER: every deterministic prediction for the
//      unswept decade [1e11, 1e12] (zone count, 8 new envelope steps with
//      exact u, envelope 11,388 at the top, band c3/u for the new band,
//      whole-sweep exponent and deciles at 1e12) plus the honest
//      statistical predictions (head field, pair count, worst head load)
//      with sigma models. Sealed in
//      research/history/staging/zonegap-03-prereg.md.
//
// UNITS. Gaps and heads in integers (opener-to-opener, the A113274
// convention); logs natural; u dimensionless in (0,1); c3 = Z2/ln^3 p.
//
// WIDTH AUDIT. All zone arithmetic <= 1e12 < 2^53: exact in doubles.
// Record starts 76..82 exceed 2^53: kept as BigInt, converted to Number
// only inside Math.log (relative error ~1e-16, far under quoted figures).
//
// PRIOR ART ON DISK (cited, not re-derived): research/zonegap-01.js (the
// dataset + custody); research/a113274-gap-records.js (the 82-record
// adopted ladder, transcribed verbatim); research/tos-twin-gaps-1e16.txt
// (adopted, used through zonegap-01's custody 2 — not re-parsed here);
// research/history/staging/zonegap-prior-art.md (Kourbatov-Wolf 2019:
// trend, Gumbel, O_k(log x) records below x — the null's shape);
// research/history/staging/attack-c2drift-01.md (the house standard this
// file follows: controls in-pass, on the same grid, before the data read).
//
// Usage:  node research/zonegap-03-model.js
// ============================================================================
'use strict';
const fs = require('fs');
const path = require('path');
const t0 = Date.now();
const C2 = 0.6601618158468696;      // Hardy-Littlewood twin constant (OUR notation; 2C2 = KW's C_{2,H})
const log = (s) => console.log(s);
const fail = (s) => { console.log('FAIL: ' + s); process.exit(1); };
const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
const sd = (a) => { const m = mean(a); return Math.sqrt(mean(a.map(x => (x - m) * (x - m)))); };

// ----------------------------------------------------------------------------
// TRUSTED DATA — A113274/A113275, all 82 records, transcribed verbatim from
// research/a113274-gap-records.js (adopted 2026-08-20; its guards re-run).
// ----------------------------------------------------------------------------
const GAP = [
  2n, 6n, 12n, 18n, 30n, 36n, 72n, 150n, 168n, 210n,
  282n, 372n, 498n, 630n, 924n, 930n, 1008n, 1452n, 1512n, 1530n,
  1722n, 1902n, 2190n, 2256n, 2832n, 2868n, 3012n, 3102n, 3180n, 3480n,
  3804n, 4770n, 5292n, 6030n, 6282n, 6474n, 6552n, 6648n, 7050n, 7980n,
  8040n, 8994n, 9312n, 9318n, 10200n, 10338n, 10668n, 10710n, 11388n, 11982n,
  12138n, 12288n, 12630n, 13050n, 14262n, 14436n, 14952n, 15396n, 15720n, 16362n,
  16422n, 16590n, 16896n, 17082n, 18384n, 19746n, 19992n, 20532n, 21930n, 22548n,
  23358n, 23382n, 25230n, 26268n, 28842n, 31302n, 31482n, 31512n, 31920n, 33042n,
  34692n, 35640n
];
const START = [
  3n, 5n, 17n, 41n, 71n,
  311n, 347n, 659n, 2381n, 5879n,
  13397n, 18539n, 24419n, 62297n, 187907n,
  687521n, 688451n, 850349n, 2868959n, 4869911n,
  9923987n, 14656517n, 17382479n, 30752231n, 32822369n,
  96894041n, 136283429n, 234966929n, 248641037n, 255949949n,
  390817727n, 698542487n, 2466641069n, 4289385521n, 19181736269n,
  24215097497n, 24857578817n, 40253418059n, 42441715487n, 43725662621n,
  65095731749n, 134037421667n, 198311685749n, 223093059731n, 353503437239n,
  484797803249n, 638432376191n, 784468515221n, 794623899269n, 1246446371789n,
  1344856591289n, 1496875686461n, 2156652267611n, 2435613754109n, 4491437003327n,
  13104143169251n, 14437327538267n, 18306891187511n, 18853633225211n, 23275487664899n,
  23634280586867n, 38533601831027n, 43697538391391n, 56484333976919n, 74668675816277n,
  116741875898981n, 136391104728629n, 221346439666109n, 353971046703347n, 450811253543219n,
  742914612256169n, 1121784847637957n, 1149418981410179n, 2543288406389231n, 2797282815481499n,
  12914226879316517n, 16155559543324757n, 37338553629118097n, 37962553054417547n, 38617975949216087n,
  52000545890760149n, 70478530884377381n
];
if (GAP.length !== 82 || START.length !== 82) fail('ladder term counts');
for (let i = 1; i < 82; i++) {
  if (GAP[i] % 6n !== 0n) fail('a(' + (i + 1) + ') not 0 mod 6');
  if (GAP[i] <= GAP[i - 1] || START[i] <= START[i - 1]) fail('ladder not increasing at n=' + (i + 1));
}
// Endpoints e_k = s_k + g_k + 2 (opener of the arriving pair, +2 for its upper
// member is NOT added: the zone condition is a+2 < p'^2 with a = s_k + g_k,
// so the "wholly below" cut is s_k + g_k + 2 < p'^2, matching zonegap-01).
const E = START.map((s, i) => s + GAP[i] + 2n);
const lnE = E.map(e => Math.log(Number(e)));
// records with everything < 2^53 as Numbers (recs 1..75; enough to 5.5e15):
const recG = GAP.slice(0, 75).map(Number), recS = START.slice(0, 75).map(Number),
      recE = E.slice(0, 75).map(Number);

// THE THEOREM'S FORWARD PREMISE: s_k^2 > e_{k+1} for every k — then any zone
// whose env is record k has p < sqrt(e_{k+1}) < s_k, i.e. the record is
// wholly IN zone and the identity Z2 = env holds through the whole ladder.
{
  let worst = Infinity, at = 0;
  for (let k = 2; k < 81; k++) {     // k >= 3 (0-based 2); rungs 1-2 own only
    const ratio = Number(START[k]) * Number(START[k]) / Number(E[k + 1]);
    if (ratio < worst) { worst = ratio; at = k + 1; }
    if (START[k] * START[k] <= E[k + 1]) fail('premise s_k^2 > e_{k+1} FAILS at k=' + (k + 1));
  }
  log('THEOREM PREMISE: s_k^2 > e_{k+1} holds at all 79 ladder transitions from');
  log('  record 3 on, tightest at record ' + at + ' (s_k^2/e_{k+1} = ' + worst.toFixed(2) + '); records 1-2');
  log('  fail it (9 < 13, 25 < 31) but own only the zones p = 2 and p = 3, where');
  log('  s_k > p is checked directly below. So Z2(p) = env(p) IDENTICALLY at');
  log('  every zone, for every sweep bound the published ladder covers');
  log('  (e_82 = 7.05e16).');
}

// ----------------------------------------------------------------------------
// PARSE the embedded OUTPUT block of research/zonegap-01.js — the formally
// embedded 27,292-zone dataset (sha-bound; embed.js records this file's
// dependency on it). Self-tested extraction: counts asserted before use.
// ----------------------------------------------------------------------------
const SRC = fs.readFileSync(path.join(__dirname, 'zonegap-01.js'), 'utf8');
const OUT = (() => {
  const i = SRC.indexOf('// OUTPUT — EMBEDDED');
  if (i < 0) fail('no OUTPUT banner in zonegap-01.js');
  return SRC.slice(i).split('\n').map(l => l.replace(/^\/\/ ?/, ''));
})();
const P01 = {};
{
  const bandNames = ['10^0', '10^1', '10^2', '10^3', '10^4', '1e5-p.5'];
  P01.bands = [];
  for (const line of OUT) {
    let m;
    if ((m = line.match(/^SWEEP: X = 1\.0e\+11, ([\d,]+) twin pairs, (\d+) zones \(p = 2 \.\. (\d+)\)/))) {
      P01.pairs = Number(m[1].replace(/,/g, '')); P01.zones = Number(m[2]); P01.pmax = Number(m[3]);
    }
    for (const bn of bandNames) {
      if (line.startsWith('  ' + bn) &&
          (m = line.slice(2 + bn.length).match(/^\s*(\d+)\s+[\d.e+]+\s+([\d.]+) ± ([\d.]+)\s+[\d.]+\s+1\/[\d.e+]+\s+([\d.]+)\s+\d+\s+[\d.]+\s+([\d.]+)\s+([\d.]+)/)))
        P01.bands.push({ name: bn, n: Number(m[1]), c3m: m[2], c3sd: m[3],
          headM: Number(m[4]), um: m[5], uTop: m[6] });
    }
    if ((m = line.match(/^  measured exponent e = ([\d.]+)/))) P01.fitE = m[1];
    if ((m = line.match(/^POSITION of the max gap.*?(\d+) zones \(p >= 100\)/))) P01.uN = Number(m[1]);
    if ((m = line.match(/^  decile counts \[0\.0-0\.1 \.\. 0\.9-1\.0\]: ([\d ]+)$/)))
      P01.deciles = m[1].trim().split(/\s+/).map(Number);
    if ((m = line.match(/^  mean u = ([\d.]+)/))) P01.meanU = m[1];
    if ((m = line.match(/Mean head\/ln\^2 p = ([\d.]+) over (\d+) zones/)))
      { P01.headMean = Number(m[1]); P01.headN = Number(m[2]); }
    if ((m = line.match(/^ {2,}(\d+)\s+(\d+)\s+(\d+)\s+([\d.]+)\s+(\d+)\s*$/)))
      (P01.steps = P01.steps || []).push({ p: +m[1], z2: +m[2], gs: +m[3], u: m[4], rec: +m[5] });
  }
}
if (P01.zones !== 27292 || P01.pairs !== 224376048 || P01.pmax !== 316219) fail('parse: SWEEP line');
if (P01.bands.length !== 6) fail('parse: bands ' + P01.bands.length);
if (!P01.steps || P01.steps.length !== 39) fail('parse: envelope steps ' + (P01.steps || []).length);
if (!P01.deciles || P01.deciles.length !== 10) fail('parse: deciles');
if (P01.deciles.reduce((a, b) => a + b, 0) !== P01.uN || P01.uN !== 27267) fail('parse: decile sum');
if (P01.bands.reduce((a, b) => a + b.n, 0) !== 27292) fail('parse: band zone total');
log('');
log('PARSED research/zonegap-01.js embedded OUTPUT: 27,292 zones, 224,376,048');
log('  pairs, 6 band rows, 39 envelope steps, 10 u-deciles (sum 27,267 = zones');
log('  with p >= 100), fit e = ' + P01.fitE + ' — all extraction counts asserted.');

// ----------------------------------------------------------------------------
// REBUILD the per-zone field from ADOPTED TABLES ALONE. Base prime sieve to
// 1e6 + 200 (needed for zones of both X = 1e11 and the prereg's X = 1e12);
// this enumerates zone boundaries only — no twin data is sieved anywhere.
// ----------------------------------------------------------------------------
const LIM = 1000200;
const bp = [];
{
  const s = new Uint8Array(LIM + 1);
  for (let i = 2; i <= LIM; i++) if (!s[i]) { bp.push(i); for (let j = i * i; j <= LIM; j += i) s[j] = 1; }
}
function buildZones(X) {
  // env by endpoint-sorted scan; per-zone: env gap, its start, u, in-zone flag.
  const Z = [];
  let ri = 0;
  for (let i = 0; i + 1 < bp.length; i++) {
    const p = bp[i], bound = bp[i + 1] * bp[i + 1];
    if (bound > X) break;
    while (ri < recE.length && recE[ri] < bound) ri++;
    const k = ri - 1;                       // env record index (0-based)
    if (k < 0) fail('no record below bound at p=' + p);
    Z.push({ p, bound, k, env: recG[k], gs: recS[k],
             u: (recS[k] - p) / (bound - p), inzone: recS[k] > p });
  }
  return Z;
}
const Z11 = buildZones(1e11);
if (Z11.length !== 27292 || Z11[Z11.length - 1].p !== 316219) fail('zone rebuild: count/pmax');
const notIn = Z11.filter(z => !z.inzone);
if (notIn.length) fail('in-zone premise fails at p=' + notIn.map(z => z.p).join(','));
log('');
log('MODEL REBUILD: 27,292 zones enumerated from the base sieve; env record');
log('  wholly in-zone (s_k > p) at ALL 27,292 zones — the theorem applies, so');
log('  the model predicts Z2(p) = env(p), D(p) = 0, at every single zone.');

// ----------------------------------------------------------------------------
// VERDICT (a): assert every embedded aggregate is reproduced digit-for-digit.
// ----------------------------------------------------------------------------
const l3 = (p) => Math.pow(Math.log(p), 3);
const fitPow = (rows) => {          // same estimator as zonegap-01 (p >= 100)
  let n = 0, sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (const z of rows) {
    const x = Math.log(Math.log(z.p)), y = Math.log(z.env);
    n++; sx += x; sy += y; sxx += x * x; sxy += x * y;
  }
  return (n * sxy - sx * sy) / (n * sxx - sx * sx);
};
{
  const edges = { '10^0': [1, 10], '10^1': [10, 100], '10^2': [100, 1000],
    '10^3': [1000, 10000], '10^4': [10000, 100000], '1e5-p.5': [100000, 316228] };
  let checks = 0;
  log('');
  log('VERDICT (a) — the decomposition Z2 = env + D, quantified:');
  log('  band     zones  model c3 (mean ± sd)   meas c3        model meanU/frac>.8  meas');
  for (const b of P01.bands) {
    const [lo, hi] = edges[b.name];
    const rows = Z11.filter(z => z.p >= lo && z.p < hi);
    const c3 = rows.map(z => z.env / l3(z.p));
    const us = rows.map(z => z.u);
    const mc3 = mean(c3).toFixed(3), sc3 = sd(c3).toFixed(3);
    const mu = mean(us).toFixed(3), ft = (us.filter(u => u > 0.8).length / us.length).toFixed(3);
    if (rows.length !== b.n) fail('band ' + b.name + ' zone count ' + rows.length + ' != ' + b.n);
    if (mc3 !== b.c3m || sc3 !== b.c3sd) fail('band ' + b.name + ' c3 ' + mc3 + '±' + sc3 + ' != ' + b.c3m + '±' + b.c3sd);
    if (mu !== b.um || ft !== b.uTop) fail('band ' + b.name + ' u ' + mu + '/' + ft + ' != ' + b.um + '/' + b.uTop);
    checks += 6;
    log('  ' + b.name.padEnd(8) + String(b.n).padStart(5) + '  ' + (mc3 + ' ± ' + sc3).padStart(14) +
      '   ' + (b.c3m + ' ± ' + b.c3sd).padStart(14) + '   ' + (mu + ' / ' + ft).padStart(13) +
      '   ' + b.um + ' / ' + b.uTop);
  }
  // envelope steps: p, Z2, gapStart and u to 4 dp, all 39 rows
  const stepRows = [];
  let env = 0;
  for (const z of Z11) if (z.env > env) { env = z.env; stepRows.push(z); }
  if (stepRows.length !== 39) fail('model envelope steps ' + stepRows.length + ' != 39');
  for (let i = 0; i < 39; i++) {
    const a = stepRows[i], b = P01.steps[i];
    if (a.p !== b.p || a.env !== b.z2 || a.gs !== b.gs || a.u.toFixed(4) !== b.u)
      fail('envelope step ' + (i + 1) + ': model (' + a.p + ',' + a.env + ',' + a.gs + ',' +
        a.u.toFixed(4) + ') != embedded (' + b.p + ',' + b.z2 + ',' + b.gs + ',' + b.u + ')');
    checks += 4;
  }
  // u deciles, mean u, power fit (p >= 100)
  const r = Z11.filter(z => z.p >= 100);
  const hist = new Array(10).fill(0);
  for (const z of r) hist[Math.min(9, Math.floor(z.u * 10))]++;
  for (let i = 0; i < 10; i++) if (hist[i] !== P01.deciles[i]) fail('decile ' + i + ': ' + hist[i] + ' != ' + P01.deciles[i]);
  const mu = mean(r.map(z => z.u)).toFixed(4);
  if (mu !== P01.meanU) fail('mean u ' + mu + ' != ' + P01.meanU);
  const e = fitPow(r).toFixed(3);
  if (e !== P01.fitE) fail('power fit ' + e + ' != ' + P01.fitE);
  checks += 12;
  log('  envelope steps: all 39 rows (p, Z2, gapStart, u to 4 dp) EXACT');
  log('  u deciles: [' + hist.join(' ') + '] EXACT; mean u = ' + mu + ' EXACT');
  log('  power-fit exponent on the staircase alone: e = ' + e + ' EXACT (this is');
  log('    zonegap-01\'s "measured" 3.192 — it was never a measurement of twin');
  log('    data at all, it is a deterministic functional of the record ladder)');
  log('  TOTAL: ' + checks + ' digit-for-digit equality assertions, 0 failures.');
  log('');
  log('  D(p) = Z2(p) - env(p): point mass at 0. Zones with Z2 = env exactly:');
  log('  27292/27292 = 1.0000 (fraction 1; every aggregate zonegap-01 printed');
  log('  about Z2 is reproduced with ZERO free parameters and no twin data).');
  log('  Distribution of D: degenerate; dependence on distance-to-next-record:');
  log('  vacuous. The model claim lands at full strength: env is pure trusted');
  log('  data + record theory, and D is not small — it is zero.');
}

// ----------------------------------------------------------------------------
// VERDICT (d) — the u-distribution's mid-dip bimodality, explained.
// Within the step owned by record k, u(p) = (s_k - p)/(p'^2 - p) sweeps DOWN
// from ~1 (zone boundary just past e_k) to a FLOOR r_k ~ s_k/e_{k+1} (zone
// boundary about to pass e_{k+1}), and the zone density per unit u is
// ~ p/(2u ln p): it RISES toward each step's floor. So the histogram is a
// deterministic mixture of floor-weighted step sweeps, and its shape is the
// SPECTRUM OF RECORD SPACING RATIOS r_k — no randomness anywhere.
// ----------------------------------------------------------------------------
{
  log('');
  log('VERDICT (d) — bimodality decomposition (zones with p >= 100):');
  log('  rec#  zones   floor r_k=s_k/e_{k+1}   u range in data      mass u<0.4  0.4-0.6  >0.6');
  const byRec = new Map();
  for (const z of Z11) {
    if (z.p < 100) continue;
    if (!byRec.has(z.k)) byRec.set(z.k, []);
    byRec.get(z.k).push(z.u);
  }
  let dipTotal = 0, humpTotal = 0, topTotal = 0;
  const recsSorted = [...byRec.keys()].sort((a, b) => a - b);
  for (const k of recsSorted) {
    const us = byRec.get(k);
    const floor = k + 1 < recE.length ? recS[k] / recE[k + 1] : NaN;
    const lo = us.filter(u => u < 0.4).length, mid = us.filter(u => u >= 0.4 && u < 0.6).length,
          hi = us.length - lo - mid;
    dipTotal += mid; humpTotal += lo; topTotal += hi;
    log('  ' + String(k + 1).padStart(4) + String(us.length).padStart(7) + '   ' +
      floor.toFixed(3).padStart(8) + '            ' +
      (Math.min(...us).toFixed(3) + '-' + Math.max(...us).toFixed(3)).padStart(13) + '        ' +
      String(lo).padStart(6) + String(mid).padStart(9) + String(hi).padStart(7));
  }
  log('  totals: u<0.4 ' + humpTotal + ', dip 0.4-0.6 ' + dipTotal + ', u>0.6 ' + topTotal +
    ' (sum ' + (humpTotal + dipTotal + topTotal) + ')');
  const deep = recsSorted.filter(k => recS[k] / recE[k + 1] < 0.4);
  const highF = recsSorted.filter(k => Math.min(...byRec.get(k)) > 0.6);
  const nHigh = highF.reduce((a, k) => a + byRec.get(k).length, 0);
  const dDeepLo = deep.reduce((a, k) => a + byRec.get(k).filter(u => u < 0.4).length, 0);
  const dDeepMid = deep.reduce((a, k) => a + byRec.get(k).filter(u => u >= 0.4 && u < 0.6).length, 0);
  log('  MECHANISM, quantified from the table. Zone density inside a step rises');
  log('  toward its floor like u^(-3/2) (p ~ sqrt(s_k/u), density p/(2u ln p)).');
  log('  Three deterministic facts make the dip: (i) ' + highF.length + ' steps never reach');
  log('  below u = 0.6 and own ' + nHigh + ' of the 27,267 zones — over half the mass');
  log('  cannot touch the dip band; (ii) the ' + deep.length + ' deep steps (floor r_k < 0.4)');
  log('  overweight their own floor band ' + dDeepLo + ' : ' + dDeepMid + ' (the u^(-3/2) pile-up),');
  log('  feeding the u = 0.2-0.4 hump ~1.5x harder than the dip; (iii) only the');
  log('  few mid-floored steps pad 0.4-0.6. The zonegap-01 open question is');
  log('  CLOSED: the bimodality is deterministic record-spacing structure, with');
  log('  zero randomness and zero free parameters. The brief\'s candidate reading');
  log('  ("env-binding zones deep-loaded, D-binding zones elsewhere") is moot at');
  log('  its second half: there are no D-binding zones anywhere.');
}

// ----------------------------------------------------------------------------
// (b) THE HONEST STATISTICS — the record process itself, the ONLY statistical
// object left after (a). Framework: Kourbatov-Wolf 2019 (zonegap-prior-art.md
// §1): twin gaps ~ Exp with local mean abar(x) = ln^2(x)/(2C2); records of
// that process; number of records below x conjectured O(ln x); rescaled
// records Gumbel-ish. Estimators are read on the ADOPTED 82-record ladder in
// the window e in [1e4, e_82 = 7.05e16] (72 records; below 1e4 the local-mean
// model is not credible). CONTROLS RUN FIRST, per attack-c2drift-01.md.
// ----------------------------------------------------------------------------
const abar = (x) => Math.log(x) * Math.log(x) / (2 * C2);
const trend = (x) => abar(x) * Math.log(x / abar(x));      // KW upper trend T(x)
const EMAX = Number(E[81]);
const WLO = 1e4;
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
// Estimators on a ladder [{e, g}] restricted to the window:
function estimators(recs) {
  const w = recs.filter(r => r.e >= WLO && r.e <= EMAX);
  const n = w.length;
  const ln = w.map(r => Math.log(r.e));
  // OLS of record index on ln e -> records per unit ln x
  let sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (let i = 0; i < n; i++) { const x = ln[i], y = i + 1; sx += x; sy += y; sxx += x * x; sxy += x * y; }
  const rate = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const d = []; for (let i = 1; i < n; i++) d.push(ln[i] - ln[i - 1]);
  const z = w.map(r => (r.g - trend(r.e)) / abar(r.e));
  const A = mean(w.map(r => r.g / trend(r.e)));
  const dec = w.filter(r => r.e > 1e11 && r.e <= 1e12).length;
  return { n, rate, dMean: mean(d), dCV: sd(d) / mean(d), zMean: mean(z), zSd: sd(z),
           zMin: Math.min(...z), zMax: Math.max(...z), A, dec };
}
// Matched null: gap-by-gap Exp draws to 1e7, then Gumbel block maxima
// (delta = 0.005 in ln x; block max of N Exp(mean abar) = abar*(ln N + Gumbel)).
function simulate(rnd, aFac) {
  const recs = [];
  let x = 100, rm = 0;
  while (x < 1e7) {
    const g = -Math.log(1 - rnd()) * aFac * abar(x);
    x += g;
    if (g > rm) { rm = g; recs.push({ e: x, g }); }
  }
  const dLn = 0.005, Lhi = Math.log(EMAX);
  for (let L = Math.log(1e7); L < Lhi; L += dLn) {
    const xl = Math.exp(L), xh = Math.exp(L + dLn), xm = Math.exp(L + dLn / 2);
    const N = (xh - xl) / (aFac * abar(xm));
    let u = rnd(); if (u < 1e-12) u = 1e-12; if (u > 1 - 1e-12) u = 1 - 1e-12;
    const m = aFac * abar(xm) * (Math.log(N) - Math.log(-Math.log(u)));
    if (m > rm) { rm = m; recs.push({ e: xm, g: m }); }
  }
  return recs;
}
{
  log('');
  log('(b) RECORD-PROCESS STATISTICS. Window e in [1e4, 7.05e16]; abar(x) =');
  log('  ln^2(x)/(2C2) (KW\'s expected gap, 2C2 = 1.3203); trend T(x) =');
  log('  abar ln(x/abar); z = (g - T(e))/abar(e); A = mean g/T(e).');
  log('');
  // CONTROL 1 — deterministic recovery: a ladder ON the trend must read
  // A = 1, z = 0 exactly (plumbing + formula identity).
  // Full 82-record ladder as Numbers: starts 76..82 exceed 2^53 but enter
  // only through logs (width audit above); gaps are exact integers.
  const L82 = GAP.map((g, k) => ({ e: Number(E[k]), g: Number(g) }));
  const detLadder = L82.map(r => ({ e: r.e, g: trend(r.e) }));
  const detR = estimators(detLadder);
  const c1ok = Math.abs(detR.A - 1) < 1e-12 && Math.abs(detR.zMean) < 1e-12 && Math.abs(detR.zSd) < 1e-12;
  log('  CONTROL 1 (deterministic recovery): trend-valued ladder at the data\'s');
  log('    own endpoints reads A = ' + detR.A.toFixed(6) + ', z mean/sd = ' + detR.zMean.toFixed(6) +
    '/' + detR.zSd.toFixed(6) + ': ' + (c1ok ? 'PASS' : 'FAIL'));
  if (!c1ok) fail('control 1');
  // CONTROL 2 — null ensemble, generated BEFORE the data is read.
  const REPS = 200;
  const nulls = [];
  for (let r = 0; r < REPS; r++) nulls.push(estimators(simulate(mulberry32(0xC0FFEE + r), 1)));
  const nstat = (f) => { const v = nulls.map(f); return { m: mean(v), s: sd(v), v }; };
  const nN = nstat(o => o.n), nRate = nstat(o => o.rate), nCV = nstat(o => o.dCV),
        nZm = nstat(o => o.zMean), nZs = nstat(o => o.zSd), nA = nstat(o => o.A),
        nDec = nstat(o => o.dec);
  log('  CONTROL 2 (matched KW null, ' + REPS + ' reps, same window, same estimators,');
  log('    seeded): N = ' + nN.m.toFixed(1) + ' ± ' + nN.s.toFixed(1) + ', rate = ' + nRate.m.toFixed(3) +
    ' ± ' + nRate.s.toFixed(3) + ' per ln x, spacing CV = ' + nCV.m.toFixed(3) + ' ± ' + nCV.s.toFixed(3) + ',');
  log('    z mean = ' + nZm.m.toFixed(3) + ' ± ' + nZm.s.toFixed(3) + ', z sd = ' + nZs.m.toFixed(3) +
    ' ± ' + nZs.s.toFixed(3) + ', A = ' + nA.m.toFixed(4) + ' ± ' + nA.s.toFixed(4));
  // CONTROL 3 — injection sensitivity: doubled twin density (abar/2) must
  // halve A read with the STANDARD abar; verifies the estimator moves 1:1.
  const inj = [];
  for (let r = 0; r < 40; r++) inj.push(estimators(simulate(mulberry32(0xBEEF00 + r), 0.5)).A);
  const injRatio = mean(inj) / nA.m;
  const c3ok = injRatio > 0.45 && injRatio < 0.55;
  log('  CONTROL 3 (injection): abar halved in-sim reads A ratio ' + injRatio.toFixed(3) +
    ' vs null (truth 0.500): ' + (c3ok ? 'PASS' : 'FAIL'));
  if (!c3ok) fail('control 3');
  // DATA READ — after the controls.
  const data = estimators(L82);
  const pct = (v, arr) => arr.filter(x => x <= v).length / arr.length;
  log('');
  log('  DATA (A113274, ' + data.n + ' records in window) vs null percentile:');
  const row = (name, v, ns, digits) => {
    const p = pct(v, ns.v);
    const grade = p >= 0.025 && p <= 0.975 ? 'in null 95%' : 'OUTSIDE null 95%';
    log('    ' + name.padEnd(22) + v.toFixed(digits).padStart(8) + '   null ' +
      ns.m.toFixed(digits) + ' ± ' + ns.s.toFixed(digits) + '   pctile ' + (100 * p).toFixed(1).padStart(5) +
      '%  ' + grade);
    return p;
  };
  row('record count N', data.n, nN, 0);
  row('rate (per ln x)', data.rate, nRate, 3);
  row('spacing CV', data.dCV, nCV, 3);
  row('z mean', data.zMean, nZm, 3);
  row('z sd', data.zSd, nZs, 3);
  row('trend load A', data.A, nA, 4);
  log('    (z range in data: ' + data.zMin.toFixed(2) + ' .. ' + data.zMax.toFixed(2) + ')');
  log('  DECADE COUNTS, the sigma model for records-per-decade: null gives');
  log('    ' + nDec.m.toFixed(2) + ' ± ' + nDec.s.toFixed(2) + ' records with endpoint in (1e11, 1e12]; the');
  log('    published ladder has ' + data.dec + ' there (records 42..49), i.e. ' +
    ((data.dec - nDec.m) / nDec.s).toFixed(1) + ' null-sd high —');
  log('    a dense patch, priced by the null, not by a Poisson guess.');
  log('  READ: the null\'s SHAPE fits — count, rate, spacing CV, z sd all inside');
  log('  the 95% band — but its LOCATION does not: the published records run');
  log('  ~1.1 abar BELOW the pure-Exp record process (A = 0.9295 vs null');
  log('  0.9895 ± 0.0182, z mean -1.298 vs -0.212 ± 0.244). Real twin gaps at');
  log('  finite height are not exact exponentials (KW fit their own a(x); the');
  log('  0.76 ln^3 ceiling is calibrated to data, not to the Poisson model);');
  log('  that deficit is measured here at 6.0% of trend, 3.3 null-sd. Prereg');
  log('  consequence: none of the sealed [1e11, 1e12] quantities depends on the');
  log('  location; the decade-count sigma uses only the shape, which fits.');
}

// ----------------------------------------------------------------------------
// (c) PREREG FEEDER — the unswept decade [1e11, 1e12], every prediction the
// model can make NOW, before the ~1 h sweep runs on the new box. The
// deterministic block is THEOREM + ADOPTED TABLES ONLY (sigma = 0; any miss
// is a custody event, not model noise). The statistical block carries its
// sigma model. Sealed in research/history/staging/zonegap-03-prereg.md.
// ----------------------------------------------------------------------------
{
  log('');
  log('(c) PREREG FEEDER for X = 1e12 (fitted on the <= 1e11 sweep + adopted');
  log('  tables only; nothing below touches unpublished data):');
  const Z12 = buildZones(1e12);
  const bad = Z12.filter(z => !z.inzone);
  if (bad.length) fail('1e12 in-zone premise fails at p=' + bad[0].p);
  const last = Z12[Z12.length - 1];
  if (last.env !== Number(GAP[48])) fail('env at 1e12 top is ' + last.env + ' != record 49');
  const nNew = Z12.length - Z11.length;
  log('  T1. zones: ' + Z12.length + ' (p = 2 .. ' + last.p + '); ' + nNew + ' new zones (p in [' +
    Z12[Z11.length].p + ', ' + last.p + ']); in-zone premise s_k > p holds at ALL of them.');
  log('  T2. new envelope steps (first zone attaining each new record), exact:');
  log('       p        Z2     gapStart        u      rec#');
  {
    let env = 0, shown = 0;
    for (const z of Z12) {
      if (z.env > env) {
        env = z.env;
        if (z.k >= 41) {
          log('    ' + String(z.p).padStart(7) + '  ' + String(z.env).padStart(6) + '  ' +
            String(z.gs).padStart(12) + '  ' + z.u.toFixed(4).padStart(7) + '  ' +
            String(z.k + 1).padStart(5));
          shown++;
        }
      }
    }
    if (shown !== 8) fail('new envelope steps ' + shown + ' != 8');
    log('    (8 new steps, records 42..49; running-max ladder at 1e12 = A113274');
    log('    records 1..49; envelope value at the sweep top = ' + last.env + ')');
  }
  const r12 = Z12.filter(z => z.p >= 100);
  const hist12 = new Array(10).fill(0);
  for (const z of r12) hist12[Math.min(9, Math.floor(z.u * 10))]++;
  log('  T3. whole-sweep staircase functionals at 1e12 (p >= 100, ' + r12.length + ' zones):');
  log('    power-fit exponent e = ' + fitPow(r12).toFixed(3) + '; mean u = ' +
    mean(r12.map(z => z.u)).toFixed(4) + ';');
  log('    u deciles = [' + hist12.join(' ') + ']');
  const bandStats = (lo, hi) => {
    const rows = Z12.filter(z => z.p >= lo && z.p < hi);
    const c3 = rows.map(z => z.env / l3(z.p)), us = rows.map(z => z.u);
    return { n: rows.length, c3m: mean(c3), c3sd: sd(c3), um: mean(us),
             uTop: us.filter(u => u > 0.8).length / us.length,
             worstMargin: Math.max(...rows.map(z => z.env / (z.bound - z.p))) };
  };
  const bOld = bandStats(1e5, 316228);
  const joiners = Z12.slice(Z11.length).filter(z => z.p < 316228);
  if (bOld.n !== 17700 + joiners.length) fail('band [1e5,316228) count at 1e12');
  const bNew = bandStats(316228, 1e6), bDec = bandStats(1e5, 1e6);
  log('  T4. bands at 1e12. The 1e5-p.5 band is NOT an identical reprint: zone');
  log('    p = ' + joiners.map(z => z.p).join(', ') + ' (bound > 1e11) joins it, making ' + bOld.n + ' zones,');
  log('    c3 = ' + bOld.c3m.toFixed(3) + ' ± ' + bOld.c3sd.toFixed(3) + ', mean u = ' + bOld.um.toFixed(3) +
    ', frac u>0.8 = ' + bOld.uTop.toFixed(3) + '.');
  log('    NEW band [316228, 1e6): ' + bNew.n + ' zones,');
  log('    c3 = ' + bNew.c3m.toFixed(3) + ' ± ' + bNew.c3sd.toFixed(3) + ', mean u = ' + bNew.um.toFixed(3) +
    ', frac u>0.8 = ' + bNew.uTop.toFixed(3) + ',');
  log('    worst Z2/width = 1/' + (1 / bNew.worstMargin).toExponential(2) + '. Full decade [1e5, 1e6): ' +
    bDec.n + ' zones,');
  log('    c3 = ' + bDec.c3m.toFixed(3) + ' ± ' + bDec.c3sd.toFixed(3) + ', mean u = ' + bDec.um.toFixed(3) +
    ', frac u>0.8 = ' + bDec.uTop.toFixed(3) + '.');
  log('  T5. Z2 = env at ALL ' + Z12.length + ' zones (fraction 1.0000, sigma = 0). A zone');
  log('    with Z2 > env is a MISSED PUBLISHED RECORD (adoption void, report');
  log('    upstream); Z2 < env is impossible while s_42 = 1.34e11 >> p_max = 1e6.');
  // --- statistical block ---
  // Correlation model, stated: the head field is RUN-CORRELATED — pair
  // density in the new range is ~1 per 10 primes, so ~10 consecutive zones
  // share the same first pair and their heads are shifted copies. Marginals
  // are unchanged (memoryless next-pair distance) but the effective sample
  // size for means and maxima is the PAIR count, not the zone count.
  const HL2 = (x) => {          // 2C2 * int_2^x dt/ln^2 t, Simpson in v = ln t
    const a = Math.log(2), b = Math.log(x), n = 20000, h = (b - a) / n;
    let acc = 0;
    const f = (v) => Math.exp(v) / (v * v);
    for (let i = 0; i <= n; i++) acc += f(a + i * h) * (i === 0 || i === n ? 1 : (i % 2 ? 4 : 2));
    return 2 * C2 * acc * h / 3;
  };
  const lnp = (rows) => mean(rows.map(z => Math.log(z.p)));
  const HLC = 1 / (2 * C2);
  const bandRows = (lo, hi) => Z11.filter(z => z.p >= lo && z.p < hi);
  const A3 = [[1e3, 1e4], [1e4, 1e5], [1e5, 316228]].map(([lo, hi], i) => {
    const meas = P01.bands[3 + i].headM;
    return { L: lnp(bandRows(lo, hi)), A: (HLC - meas) * lnp(bandRows(lo, hi)), meas };
  });
  const Ahat = (A3[1].A + A3[2].A) / 2;         // the two well-measured bands
  const sigA = Math.max(0.15, Math.abs(A3[1].A - A3[2].A));  // floor covers 10^3's scatter
  const newRows = Z12.slice(Z11.length);
  const Lnew = lnp(newRows);
  const hNew = HLC - Ahat / Lnew;
  const nEff = HL2(1e6) - HL2(newRows[0].p);      // expected pairs in the new range
  const runLen = nNew / nEff;                     // zones per shared head, ~10
  const sigNew = Math.sqrt(Math.pow(sigA / Lnew, 2) + Math.pow(HLC / Math.sqrt(nEff), 2));
  log('  S1. head model (statistical). Deficit fit (1/(2C2) - head/ln^2 p) *');
  log('    <ln p>: A = ' + A3.map(a => a.A.toFixed(3)).join(', ') + ' on bands 10^3/10^4/top;');
  log('    Ahat = ' + Ahat.toFixed(3) + ' ± ' + sigA.toFixed(3) + '. NEW band [316228, 1e6) (<ln p> = ' +
    Lnew.toFixed(2) + '):');
  log('    predicted mean head/ln^2 p = ' + hNew.toFixed(4) + ' ± ' + sigNew.toFixed(4) +
    ' (3-sigma [' + (hNew - 3 * sigNew).toFixed(3) + ', ' + (hNew + 3 * sigNew).toFixed(3) + ']);');
  log('    sigma uses n_eff = ' + Math.round(nEff) + ' pairs (run length ~' + runLen.toFixed(1) +
    ' zones share a head), NOT the ' + nNew + '-zone count.');
  const nOld = P01.headN, hOld = P01.headMean, nAll = nOld + nNew;
  const hAll = (nOld * hOld + nNew * hNew) / nAll;
  const sigAll = sigNew * nNew / nAll;
  log('  S2. whole-sweep (p >= 100) mean head/ln^2 p at 1e12: ' + hAll.toFixed(4) + ' ± ' +
    sigAll.toFixed(4) + ' (3-sigma [' + (hAll - 3 * sigAll).toFixed(3) + ', ' + (hAll + 3 * sigAll).toFixed(3) + ']).');
  // worst head load among NEW zones: heads ~ Exp(mean h(p) ln^2 p) =>
  // load ~ Exp(mean h(p)/(0.76 ln p)); max over zones solved from the product CDF.
  {
    const mu = newRows.map(z => {
      const L = Math.log(z.p);
      return (HLC - Ahat / L) / (0.76 * L);
    });
    const cdf = (t) => mu.reduce((a, m) => a + Math.log1p(-Math.exp(-t / m)), 0) / runLen;
    const solve = (q) => {
      let lo = 0.1, hi = 5;
      for (let i = 0; i < 80; i++) { const mid = (lo + hi) / 2; if (cdf(mid) < Math.log(q)) lo = mid; else hi = mid; }
      return (lo + hi) / 2;
    };
    const q025 = solve(0.025), q50 = solve(0.5), q975 = solve(0.975);
    log('  S3. worst head vs the 0.76 ln^3 p ceiling at height p, NEW zones only');
    log('    (Exp-head model, run-corrected to n_eff): median ' + q50.toFixed(3) + ', 95% band [' +
      q025.toFixed(3) + ', ' + q975.toFixed(3) + ']. Whole-sweep');
    const pKeep = Math.exp(cdf(0.7218));
    log('    worst at 1e12 = max(0.7218, the above): P(stays 0.7218) = ' + pKeep.toFixed(2) + ';');
    log('    the guard (< 1) holds unless the head field breaks the Exp model.');
  }
  // pair count: HL2 + two-point calibration (1e10 count from the sha-bound
  // stage-1 output quoted in zonegap-01-prereg.md; 1e11 from the embedded
  // OUTPUT parsed above).
  {
    const HL2 = (x) => {          // 2C2 * int_2^x dt/ln^2 t, Simpson in v = ln t
      const a = Math.log(2), b = Math.log(x), n = 20000, h = (b - a) / n;
      let s = 0;
      const f = (v) => Math.exp(v) / (v * v);
      for (let i = 0; i <= n; i++) s += f(a + i * h) * (i === 0 || i === n ? 1 : (i % 2 ? 4 : 2));
      return 2 * C2 * s * h / 3;
    };
    const N10 = 27412679, N11 = P01.pairs;
    const r10 = N10 / HL2(1e10), r11 = N11 / HL2(1e11);
    const r12 = r11 + (r11 - r10), sig = Math.abs(r11 - r10);
    const H12 = HL2(1e12);
    log('  S4. twin pairs to 1e12: HL2 calibration ratio ' + r10.toFixed(6) + ' (1e10) -> ' +
      r11.toFixed(6) + ' (1e11),');
    log('    extrapolated ' + r12.toFixed(6) + '; predicted count ' + Math.round(r12 * H12).toLocaleString('en-US') +
      ' ± ' + Math.round(sig * H12).toLocaleString('en-US'));
    log('    (4-sigma [' + Math.round((r12 - 4 * sig) * H12).toLocaleString('en-US') + ', ' +
      Math.round((r12 + 4 * sig) * H12).toLocaleString('en-US') + ']; pi2(1e12) is published in the');
    log('    literature but sits in NO adopted table of this corpus — the seal');
    log('    tests the sigma machinery, and the prereg says so).');
  }
  log('  S5. postulate: minimum in-zone pair count stays 2 (at p = 2) and');
  log('    single-pair zones stay 0 at 1e12 (conjecture-grade, not statistics).');
}
log('');
log('done in ' + ((Date.now() - t0) / 1000).toFixed(1) + ' s total');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/zonegap-03-model.js
//   invocation:  node research/zonegap-03-model.js
//   code-sha256: 94361acf23fa9c5a9265581f5cb499a4a7c3a33c37dc9785918057865657c59c
//   out-sha256:  805cbcbeda6fdbfbb7ce522e1165492cb902cf7e9b5844fce25866c57787dffc
//   body-lines:  164
//   inputs:      research/zonegap-01.js@44b4e461df16
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     1.2 s
// ============================================================================
// THEOREM PREMISE: s_k^2 > e_{k+1} holds at all 79 ladder transitions from
//   record 3 on, tightest at record 3 (s_k^2/e_{k+1} = 4.74); records 1-2
//   fail it (9 < 13, 25 < 31) but own only the zones p = 2 and p = 3, where
//   s_k > p is checked directly below. So Z2(p) = env(p) IDENTICALLY at
//   every zone, for every sweep bound the published ladder covers
//   (e_82 = 7.05e16).
//
// PARSED research/zonegap-01.js embedded OUTPUT: 27,292 zones, 224,376,048
//   pairs, 6 band rows, 39 envelope steps, 10 u-deciles (sum 27,267 = zones
//   with p >= 100), fit e = 3.192 — all extraction counts asserted.
//
// MODEL REBUILD: 27,292 zones enumerated from the base sieve; env record
//   wholly in-zone (s_k > p) at ALL 27,292 zones — the theorem applies, so
//   the model predicts Z2(p) = env(p), D(p) = 0, at every single zone.
//
// VERDICT (a) — the decomposition Z2 = env + D, quantified:
//   band     zones  model c3 (mean ± sd)   meas c3        model meanU/frac>.8  meas
//   10^0        4   4.370 ± 1.119    4.370 ± 1.119   0.267 / 0.000   0.267 / 0.000
//   10^1       21   2.708 ± 0.726    2.708 ± 0.726   0.587 / 0.190   0.587 / 0.190
//   10^2      143   3.426 ± 0.497    3.426 ± 0.497   0.623 / 0.315   0.623 / 0.315
//   10^3     1061   3.681 ± 0.362    3.681 ± 0.362   0.672 / 0.308   0.672 / 0.308
//   10^4     8363   4.022 ± 0.243    4.022 ± 0.243   0.668 / 0.274   0.668 / 0.274
//   1e5-p.5 17700   3.930 ± 0.219    3.930 ± 0.219   0.728 / 0.462   0.728 / 0.462
//   envelope steps: all 39 rows (p, Z2, gapStart, u to 4 dp) EXACT
//   u deciles: [0 0 1767 2105 1516 1424 4071 5544 5365 5475] EXACT; mean u = 0.7071 EXACT
//   power-fit exponent on the staircase alone: e = 3.192 EXACT (this is
//     zonegap-01's "measured" 3.192 — it was never a measurement of twin
//     data at all, it is a deterministic functional of the record ladder)
//   TOTAL: 204 digit-for-digit equality assertions, 0 failures.
//
//   D(p) = Z2(p) - env(p): point mass at 0. Zones with Z2 = env exactly:
//   27292/27292 = 1.0000 (fraction 1; every aggregate zonegap-01 printed
//   about Z2 is reproduced with ZERO free parameters and no twin data).
//   Distribution of D: degenerate; dependence on distance-to-next-record:
//   vacuous. The model claim lands at full strength: env is pure trusted
//   data + record theory, and D is not small — it is zero.
//
// VERDICT (d) — bimodality decomposition (zones with p >= 100):
//   rec#  zones   floor r_k=s_k/e_{k+1}   u range in data      mass u<0.4  0.4-0.6  >0.6
//     10      4      0.430              0.456-0.550             0        4      0
//     11      3      0.708              0.712-0.829             0        0      3
//     12      4      0.744              0.751-0.959             0        0      4
//     13     16      0.388              0.418-0.919             0        7      9
//     14     31      0.330              0.331-0.989             7       11     13
//     15     61      0.273              0.273-0.975            21       22     18
//     17     12      0.808              0.815-0.978             0        0     12
//     18    107      0.296              0.296-0.985            33       36     38
//     19     65      0.589              0.589-0.996             0        2     63
//     20    117      0.491              0.495-0.994             0       33     84
//     21     85      0.677              0.679-0.992             0        0     85
//     22     42      0.843              0.847-0.998             0        0     42
//     23    159      0.565              0.568-0.996             0       23    136
//     24     21      0.937              0.941-0.996             0        0     21
//     25    461      0.339              0.339-0.997            89      186    186
//     26    186      0.711              0.713-0.998             0        0    186
//     27    390      0.580              0.581-0.999             0       31    359
//     28     49      0.945              0.945-1.000             0        0     49
//     29     23      0.971              0.972-0.999             0        0     23
//     30    376      0.655              0.655-1.000             0        0    376
//     31    665      0.559              0.560-0.999             0       93    572
//     32   2197      0.283              0.283-1.000           731      725    741
//     33   1439      0.575              0.575-1.000             0      116   1323
//     34   6346      0.224              0.224-1.000          2991     1651   1704
//     35   1440      0.792              0.792-1.000             0        0   1440
//     36    169      0.974              0.974-1.000             0        0    169
//     37   3539      0.618              0.618-1.000             0        0   3539
//     38    432      0.948              0.948-1.000             0        0    432
//     39    260      0.971              0.971-1.000             0        0    260
//     40   3728      0.672              0.672-1.000             0        0   3728
//     41   4840      0.486              0.651-1.000             0        0   4840
//   totals: u<0.4 3872, dip 0.4-0.6 2940, u>0.6 20455 (sum 27267)
//   MECHANISM, quantified from the table. Zone density inside a step rises
//   toward its floor like u^(-3/2) (p ~ sqrt(s_k/u), density p/(2u ln p)).
//   Three deterministic facts make the dip: (i) 17 steps never reach
//   below u = 0.6 and own 15209 of the 27,267 zones — over half the mass
//   cannot touch the dip band; (ii) the 7 deep steps (floor r_k < 0.4)
//   overweight their own floor band 3872 : 2638 (the u^(-3/2) pile-up),
//   feeding the u = 0.2-0.4 hump ~1.5x harder than the dip; (iii) only the
//   few mid-floored steps pad 0.4-0.6. The zonegap-01 open question is
//   CLOSED: the bimodality is deterministic record-spacing structure, with
//   zero randomness and zero free parameters. The brief's candidate reading
//   ("env-binding zones deep-loaded, D-binding zones elsewhere") is moot at
//   its second half: there are no D-binding zones anywhere.
//
// (b) RECORD-PROCESS STATISTICS. Window e in [1e4, 7.05e16]; abar(x) =
//   ln^2(x)/(2C2) (KW's expected gap, 2C2 = 1.3203); trend T(x) =
//   abar ln(x/abar); z = (g - T(e))/abar(e); A = mean g/T(e).
//
//   CONTROL 1 (deterministic recovery): trend-valued ladder at the data's
//     own endpoints reads A = 1.000000, z mean/sd = 0.000000/0.000000: PASS
//   CONTROL 2 (matched KW null, 200 reps, same window, same estimators,
//     seeded): N = 68.4 ± 7.9, rate = 2.356 ± 0.304 per ln x, spacing CV = 0.944 ± 0.100,
//     z mean = -0.212 ± 0.244, z sd = 1.264 ± 0.177, A = 0.9895 ± 0.0182
//   CONTROL 3 (injection): abar halved in-sim reads A ratio 0.525 vs null (truth 0.500): PASS
//
//   DATA (A113274, 72 records in window) vs null percentile:
//     record count N              72   null 68 ± 8   pctile  71.5%  in null 95%
//     rate (per ln x)          2.562   null 2.356 ± 0.304   pctile  74.0%  in null 95%
//     spacing CV               0.908   null 0.944 ± 0.100   pctile  38.0%  in null 95%
//     z mean                  -1.298   null -0.212 ± 0.244   pctile   0.0%  OUTSIDE null 95%
//     z sd                     1.021   null 1.264 ± 0.177   pctile   7.5%  in null 95%
//     trend load A            0.9295   null 0.9895 ± 0.0182   pctile   0.0%  OUTSIDE null 95%
//     (z range in data: -3.58 .. 1.58)
//   DECADE COUNTS, the sigma model for records-per-decade: null gives
//     5.33 ± 2.11 records with endpoint in (1e11, 1e12]; the
//     published ladder has 8 there (records 42..49), i.e. 1.3 null-sd high —
//     a dense patch, priced by the null, not by a Poisson guess.
//   READ: the null's SHAPE fits — count, rate, spacing CV, z sd all inside
//   the 95% band — but its LOCATION does not: the published records run
//   ~1.1 abar BELOW the pure-Exp record process (A = 0.9295 vs null
//   0.9895 ± 0.0182, z mean -1.298 vs -0.212 ± 0.244). Real twin gaps at
//   finite height are not exact exponentials (KW fit their own a(x); the
//   0.76 ln^3 ceiling is calibrated to data, not to the Poisson model);
//   that deficit is measured here at 6.0% of trend, 3.3 null-sd. Prereg
//   consequence: none of the sealed [1e11, 1e12] quantities depends on the
//   location; the decade-count sigma uses only the shape, which fits.
//
// (c) PREREG FEEDER for X = 1e12 (fitted on the <= 1e11 sweep + adopted
//   tables only; nothing below touches unpublished data):
//   T1. zones: 78497 (p = 2 .. 999979); 51205 new zones (p in [316223, 999979]); in-zone premise s_k > p holds at ALL of them.
//   T2. new envelope steps (first zone attaining each new record), exact:
//        p        Z2     gapStart        u      rec#
//      366103    8994  134037421667   0.9999     42
//      445321    9312  198311685749   0.9999     43
//      472319    9318  223093059731   1.0000     44
//      594551   10200  353503437239   1.0000     45
//      696271   10338  484797803249   1.0000     46
//      799003   10668  638432376191   1.0000     47
//      885679   10710  784468515221   1.0000     48
//      891409   11388  794623899269   1.0000     49
//     (8 new steps, records 42..49; running-max ladder at 1e12 = A113274
//     records 1..49; envelope value at the sweep top = 11388)
//   T3. whole-sweep staircase functionals at 1e12 (p >= 100, 78472 zones):
//     power-fit exponent e = 3.332; mean u = 0.7913;
//     u deciles = [0 0 1767 2105 1935 3878 8013 14607 23082 23085]
//   T4. bands at 1e12. The 1e5-p.5 band is NOT an identical reprint: zone
//     p = 316223 (bound > 1e11) joins it, making 17701 zones,
//     c3 = 3.930 ± 0.219, mean u = 0.728, frac u>0.8 = 0.462.
//     NEW band [316228, 1e6): 51204 zones,
//     c3 = 4.182 ± 0.132, mean u = 0.836, frac u>0.8 = 0.690,
//     worst Z2/width = 1/1.24e+7. Full decade [1e5, 1e6): 68905 zones,
//     c3 = 4.117 ± 0.193, mean u = 0.808, frac u>0.8 = 0.631.
//   T5. Z2 = env at ALL 78497 zones (fraction 1.0000, sigma = 0). A zone
//     with Z2 > env is a MISSED PUBLISHED RECORD (adoption void, report
//     upstream); Z2 < env is impossible while s_42 = 1.34e11 >> p_max = 1e6.
//   S1. head model (statistical). Deficit fit (1/(2C2) - head/ln^2 p) *
//     <ln p>: A = 0.618, 0.401, 0.395 on bands 10^3/10^4/top;
//     Ahat = 0.398 ± 0.150. NEW band [316228, 1e6) (<ln p> = 13.34):
//     predicted mean head/ln^2 p = 0.7275 ± 0.0155 (3-sigma [0.681, 0.774]);
//     sigma uses n_eff = 5076 pairs (run length ~10.1 zones share a head), NOT the 51205-zone count.
//   S2. whole-sweep (p >= 100) mean head/ln^2 p at 1e12: 0.7259 ± 0.0101 (3-sigma [0.696, 0.756]).
//   S3. worst head vs the 0.76 ln^3 p ceiling at height p, NEW zones only
//     (Exp-head model, run-corrected to n_eff): median 0.640, 95% band [0.520, 0.879]. Whole-sweep
//     worst at 1e12 = max(0.7218, the above): P(stays 0.7218) = 0.80;
//     the guard (< 1) holds unless the head field breaks the Exp model.
//   S4. twin pairs to 1e12: HL2 calibration ratio 1.000046 (1e10) -> 1.000032 (1e11),
//     extrapolated 1.000018; predicted count 1,870,593,490 ± 26,264
//     (4-sigma [1,870,488,435, 1,870,698,545]; pi2(1e12) is published in the
//     literature but sits in NO adopted table of this corpus — the seal
//     tests the sigma machinery, and the prereg says so).
//   S5. postulate: minimum in-zone pair count stays 2 (at p = 2) and
//     single-pair zones stay 0 at 1e12 (conjecture-grade, not statistics).
//
// done in 1.1 s total
// ============================================================================
// READINGS
// ============================================================================
// 1. D IS ZERO, AND THAT IS A THEOREM, NOT A FIT. The zonegap-01 model
//    question "Z2 = envelope + below-record correction field" closes at
//    full strength: Z2(p) = env(p) at 27292/27292 zones, fraction 1.0000.
//    Both directions are one-liners given the adopted ladder (any in-zone
//    gap is a twin gap wholly below p'^2, so Z2 <= env; the env record's
//    start satisfies s_k > p at every swept zone, so its gap IS an in-zone
//    gap and Z2 >= env), and the premise s_k^2 > e_{k+1} holds at all 79
//    transitions from record 3 on (tightest 4.74), so the identity runs
//    through the entire published ladder to e_82 = 7.05e16. 204
//    digit-for-digit equality assertions against zonegap-01's embedded
//    output block — six band c3 means AND sds, all 39 envelope-step rows with u
//    to 4 decimals, the exact u-decile vector, mean u = 0.7071, and the
//    power-fit e = 3.192 — pass with ZERO free parameters and no twin
//    data. zonegap-01's "law" was never a measurement of twin data: every
//    Z2 aggregate it printed is a deterministic functional of A113274 +
//    the primes, recomputable in about a second.
// 2. THE PREREG-MISS MECHANISM IS NOW FULLY RESOLVED. The per-zone series
//    is not "heavily correlated" — it is 100% redundant given the ladder.
//    Fitting Z2(p) as data was fitting the record staircase's arithmetic;
//    the honest statistical objects are (i) the record process itself and
//    (ii) the boundary fields (head, tail), and nothing else.
// 3. THE BIMODALITY IS CLOSED (zonegap-01 NOT-REACHED item 4). The u
//    histogram is a deterministic mixture of per-record sweeps: each step
//    floors at r_k = s_k/e_{k+1} with zone density rising toward the floor
//    like u^(-3/2). 17 steps never reach below u = 0.6 and own 15209 of
//    the 27,267 zones; the 7 deep steps (r_k < 0.4) overweight their floor
//    band 3872 : 2638; only the few mid-floored steps pad 0.4-0.6. Dip
//    explained; no null model needed because there is no randomness.
// 4. THE RECORD PROCESS IS THE ONE LIVE STATISTICAL OBJECT, AND THE KW
//    NULL'S SHAPE FITS WHILE ITS LOCATION FAILS. Against a matched
//    exponential-gap/Gumbel-block null (200 seeded reps, controls run and
//    passed BEFORE the data read: deterministic recovery A = 1.000000,
//    injection ratio 0.525 vs truth 0.500): record count 72 (null 68 ± 8),
//    rate 2.562 per ln x (null 2.356 ± 0.304), spacing CV 0.908 (null
//    0.944 ± 0.100), z sd 1.021 (null 1.264 ± 0.177) — all inside the 95%
//    band. But z mean = -1.298 vs null -0.212 ± 0.244 and trend load
//    A = 0.9295 vs null 0.9895 ± 0.0182: the published records run about
//    1.1 abar BELOW the pure-Exp record process, a 3+ null-sd location
//    deficit. Real twin gaps at finite height are not exact exponentials;
//    the deficit is now measured, in-house, at 6.0% of trend.
// 5. THE COMPUTE GAP IS PRICED: records-per-decade sigma. The null puts
//    5.33 ± 2.11 record endpoints in (1e11, 1e12]; the published ladder
//    has 8 (records 42..49), a dense patch at 1.3 null-sd. This is the
//    sigma model the prereg uses for record counts — ensemble-calibrated,
//    not a Poisson guess.
// 6. EVERYTHING THE BRIEF ASKED TO PREDICT IS PROMOTED FROM STATISTICS TO
//    CUSTODY. For X = 1e12: 78497 zones, 8 new envelope steps with exact
//    (p, Z2, gapStart, u) rows, envelope 11388 at the top, whole-sweep
//    power-fit e = 3.332, mean u = 0.7913, exact u deciles, new-band
//    c3 = 4.182 ± 0.132 — all sigma = 0, any miss a custody event. Note
//    the 1e5-p.5 band is NOT an identical reprint at 1e12: zone p = 316223
//    joins it (17701 zones), same printed c3 = 3.930 ± 0.219.
// 7. THE RESIDUAL STATISTICS ARE THE BOUNDARY FIELDS, WITH THE CORRELATION
//    STATED THIS TIME. Heads are run-correlated (~10.1 zones share a first
//    pair), so sigma models use n_eff = 5076 pairs, not 51205 zones:
//    new-band mean head/ln^2 p = 0.7275 ± 0.0155, whole-sweep
//    0.7259 ± 0.0101, worst head load median 0.640 with P(whole-sweep
//    worst stays 0.7218) = 0.80, and pi2(1e12) = 1,870,593,490 ± 26,264
//    from the two-point HL calibration drift 1.000046 -> 1.000032.
// 8. LIMITS. The theorem is conditional on the adopted ladder being the
//    true running max (custody-verified in-range by zonegap-01, single-
//    witness beyond); the record-process read beyond our sweep rests on
//    the same trust. The tail field was not modeled (no per-zone tail data
//    in the embedded output beyond band means). No blind record-process
//    prediction exists below e_82 = 7.05e16 — the ladder covers the whole
//    reachable range, which is exactly why the per-zone object was worth
//    building and exactly why its statistics collapse to custody.
// ============================================================================
