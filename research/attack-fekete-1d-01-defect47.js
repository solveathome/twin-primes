// attack-fekete-1d-01-defect47.js
//
// TODO 1d, THE BOUNDED-DEFECT FEKETE ROUTE, PROBED AT 47#.
//
// THE QUESTION. The live 1d lead is the candidate  Ghat(st) <= C*Ghat(s)*Ghat(t)
// on integer s,t >= 2, whose defect is IDENTICALLY the Overshoot slack's
// superadditivity defect, D(s,t) = S(s)+S(t)-S(st), S(x) = ln(x^2/Ghat(x))
// (import-interp.md 3, PROVEN one line). 47# is the first ladder term that is
// literature-only: A144311 says G2(47#) = 708, the corpus greedy certifies
// G2(47#) >= 705 (a replay-verified covering of [1,704],
// greedy-oracle-validation.md 3), and the exact enumeration is priced at 1.49
// days PER RUN, two runs required (phase1-T2b-exact-ladder.md) -- out of
// session reach, so this file PROBES rather than enumerates. Three questions:
//   (a) WHAT IS THE DEFECT AT 47#, exactly -- every integer pair st in [47,53),
//       and where the 47-window sits among all 21 windows of the ladder;
//   (b) IS ANY 1d READING SENSITIVE to the one unverified term -- readings at
//       G47 = 705 (certified floor) vs 708 (published), and the flip values;
//   (c) IS THE DEFECT BOUNDED on the reachable range -- a per-window sup
//       instrument, calibrated on two synthetic nulls run in the same pass
//       (POW: defect exactly constant in the continuous limit; LOG: defect
//       genuinely DECREASING toward a constant, proving the instrument can
//       move), on the custody-only ladder and on the full one.
//
// HONEST DOUBT. A probe cannot settle what only the enumeration settles: if
// A144311's 708 is wrong UPWARD by 32 or more (>= 740), the reachable sup C
// moves to the 47-window. The boundedness instrument carries a known
// step-sampling artifact (a constant-defect null reads "growing",
// import-interp.md 5), so no slope here is read without its null; and the
// custody-only ladder has 14 terms, so its slopes are weak. Finally, the
// threshold verdicts below lean on the greedy floors at 47/53/59 being
// certified lower bounds; they are replay-verified in the embedded artifact,
// but they are one instrument's output.
//
// CUSTODY. The 14 exact terms are PARSED from research/exact-g2-ladder.js
// (never retyped); the 22-term A144311 column is PARSED from
// research/import-interp-01-bgt-defect.js, the corpus's keeper of that list;
// the two are cross-checked term by term on the shared 14. Headline numbers of
// import-interp-01 (sup R = 2.9333, ln C = 1.0761, threshold 1.3946 at b = 66)
// are recomputed here as cross-checks of THIS engine, and must match.
//
// ARITHMETIC NOTE. Everything here is small: values <= 1710, products
// <= 1710*900 < 2^31 << 2^53. No BigInt is needed and no shift operator is
// used anywhere in this file.
//
// usage: node research/attack-fekete-1d-01-defect47.js

'use strict';

const fs = require('fs');
const path = require('path');
const T0 = Date.now();
const F = (v, d = 4) => (Number.isFinite(v) ? (v >= 0 ? ' ' : '') + v.toFixed(d) : '  n/a');
const pad = (s, n) => String(s).padStart(n);
let FAILS = 0;
function check(label, ok, detail) {
  if (!ok) { FAILS++; console.log('  FAIL  ' + label + (detail ? '   ' + detail : '')); }
  else console.log('  ok    ' + label + (detail ? '   ' + detail : ''));
}

// ------------------------------------------------------- A. custody: the ladders
const HERE = path.join(__dirname);
const srcLadder = fs.readFileSync(path.join(HERE, 'exact-g2-ladder.js'), 'utf8');
const srcInterp = fs.readFileSync(path.join(HERE, 'import-interp-01-bgt-defect.js'), 'utf8');

// 14 exact terms: parse { x: N, g: N, ... } rows of LADDER
const EXACT = [];
{
  const re = /\{ x: (\d+),\s+g: (\d+),/g;
  let m;
  while ((m = re.exec(srcLadder)) !== null) EXACT.push({ x: +m[1], g: +m[2] });
}
// 22 published-column terms: parse A144311 from the corpus keeper
let A144311 = null;
{
  const m = srcInterp.match(/const A144311 = \[([^\]]+)\]/s);
  A144311 = m[1].split(',').map((s) => parseInt(s.trim(), 10));
}
const PR = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];
const G2FULL = A144311.map((v) => v + 1);

console.log('=== A. CUSTODY ======================================================');
console.log('exact-g2-ladder.js parsed terms : ' + EXACT.length);
console.log('A144311 parsed terms            : ' + A144311.length);
check('14 exact terms parsed', EXACT.length === 14);
check('22 A144311 terms parsed', A144311.length === 22);
let agree = true;
for (let i = 0; i < 14; i++) agree = agree && EXACT[i].x === PR[i] && EXACT[i].g === G2FULL[i];
check('exact ladder == A144311+1 on all 14 shared terms', agree);

// certified greedy floors (greedy-oracle-validation.md 3, replay-verified
// coverings; a covering of [1,m] gives G2 >= m+1 by the CRT identity)
const GREEDY_FLOOR = { 47: 705, 53: 870, 59: 954, 61: 1075 };
console.log('greedy certified floors (G2 >=) : 47#:705  53#:870  59#:954  61#:1075');
console.log('  (from replay-verified coverings 704/869/953/1074, CITED not rerun)');

// ------------------------------------------------------- B. the engine
// A "ladder" here is (primes, values); Ghat(t) = value at the largest listed
// prime <= t, defined on [2, cap) with cap = the prime after the last listed.
function mkG(pr, vals, cap) {
  return {
    pr, vals, cap,
    at(t) { let k = -1; for (let i = 0; i < pr.length; i++) if (pr[i] <= t) k = i; return k < 0 ? null : vals[k]; },
  };
}
const NEXTP = { 43: 47, 47: 53, 53: 59, 59: 61, 61: 67, 79: 83 };
const LFULL = mkG(PR, G2FULL, 83);                       // published-inclusive
const LCUST = mkG(PR.slice(0, 14), G2FULL.slice(0, 14), 47);  // custody-only
const mkFull47 = (g47) => mkG(PR, G2FULL.map((v, i) => (i === 14 ? g47 : v)), 83);
const LCUST47 = (g47) => mkG(PR.slice(0, 15), G2FULL.slice(0, 14).concat([g47]), 53);

const Sof = (L, b) => Math.log(b * b / L.at(b));
const Dof = (L, s, t) => Math.log(L.at(s * t) / (L.at(s) * L.at(t)));

// all integer pairs 2 <= s <= t with st < cap (and optionally st <= hardCap)
function pairs(L, stMax) {
  const out = [];
  const M = Math.min(stMax, L.cap - 1);
  for (let s = 2; s * s <= M; s++) for (let t = s; s * t <= M; t++) {
    out.push({ s, t, st: s * t, R: L.at(s * t) / (L.at(s) * L.at(t)), D: Dof(L, s, t) });
  }
  return out;
}

console.log('');
console.log('=== B. ENGINE SELF-TESTS ============================================');
// (1) exactly-multiplicative function => D identically 0 (not a step ladder:
//     value defined at every integer, so the step artifact is absent by design)
{
  const SQ = { cap: 1e9, at: (t) => t * t };
  let worst = 0;
  for (let s = 2; s <= 30; s++) for (let t = s; t <= 30; t++) worst = Math.max(worst, Math.abs(Dof(SQ, s, t)));
  check('negative control: G*(t)=t^2 gives D == 0', worst < 1e-12, 'max |D| = ' + worst.toExponential(2));
}
// (2) the identity D = S(s)+S(t)-S(st) on the full ladder, every pair
{
  let worst = 0;
  for (const q of pairs(LFULL, 82)) worst = Math.max(worst, Math.abs(q.D - (Sof(LFULL, q.s) + Sof(LFULL, q.t) - Sof(LFULL, q.s * q.t))));
  check('identity D = S+S-S at every reachable pair', worst < 1e-12, 'max dev = ' + worst.toExponential(2) + ' (import-interp-01: 8.88e-16)');
}
// (3) cross-checks against import-interp-01's embedded headline numbers
{
  const P79 = pairs(LFULL, 79);
  check('pair count at st <= 79 == 104 (import-interp-01 convention)', P79.length === 104, 'got ' + P79.length);
  const sup2 = Math.max(...P79.map((q) => q.R));
  check('integer sup R (floor 2, st <= 79) = 2.9333', Math.abs(sup2 - 2.9333) < 5e-4, F(sup2) + '  ln = ' + F(Math.log(sup2)));
  const sup7 = Math.max(...P79.filter((q) => q.s >= 7).map((q) => q.R));
  check('integer sup R (floor 7, st <= 79) = 1.5533', Math.abs(sup7 - 1.5533) < 5e-4, F(sup7));
  let thr = -1; let thrB = 0;
  for (let b = 2; b < 83; b++) { const v = Sof(LFULL, b); if (v > thr) { thr = v; thrB = b; } }
  check('integer threshold max_b S(b) = 1.3946 at b = 66', Math.abs(thr - 1.3946) < 5e-4 && thrB === 66, F(thr) + ' @ b=' + thrB);
}

// ------------------------------------------------------- C. the pair table
console.log('');
console.log('=== C. THE DEFECT, FULL PAIR TABLE ==================================');
const PALL = pairs(LFULL, 82);   // widest legal domain: Ghat known on [2,83)
console.log('pairs with st <= 82 (widest legal domain): ' + PALL.length);
for (const floor of [2, 3, 5, 7]) {
  const sub = PALL.filter((q) => q.s >= floor && q.t >= floor);
  const best = sub.reduce((a, b) => (b.R > a.R ? b : a));
  console.log('  floor ' + floor + ':  sup R = ' + F(best.R) + '  ln = ' + F(best.D) + '  at (' + best.s + ',' + best.t + ') st=' + best.st + '   [' + sub.length + ' pairs]');
}
console.log('NOTE the floor-7 sup on st <= 82 vs the recorded 1.5533 on st <= 79:');
{
  const w = PALL.filter((q) => q.s >= 7 && q.st > 79).sort((a, b) => b.R - a.R)[0];
  console.log('  the widest domain admits (' + w.s + ',' + w.t + ') st=' + w.st + ' with R = ' + F(w.R) + ', matching the REAL-form 1.9000;');
  console.log('  the 1.5533 was a domain-cap artifact (st <= 79), not a structural gap.');
}
const supFull = PALL.reduce((a, b) => (b.R > a.R ? b : a));
const PCUST = pairs(LCUST, 46);
const supCust = PCUST.reduce((a, b) => (b.R > a.R ? b : a));
console.log('custody-only pairs (st <= 46): ' + PCUST.length + '   sup R = ' + F(supCust.R) + '  ln = ' + F(supCust.D) + '  at (' + supCust.s + ',' + supCust.t + ')');
check('the reachable sup C rests on CUSTODY terms alone', supFull.R === supCust.R && supFull.s === supCust.s && supFull.t === supCust.t,
  '(4,10): Ghat(40)=G2(37#)=528 exact, Ghat(4)=6, Ghat(10)=30 exact');

console.log('');
console.log('--- the 47-window, every integer pair with st in [47, 53) ----------');
console.log('  (s,t)    st   Ghat(st)  R = Ghat(st)/(Ghat s * Ghat t)      D (nats)');
const W47 = PALL.filter((q) => q.st >= 47 && q.st < 53).sort((a, b) => b.R - a.R);
for (const q of W47) console.log('  (' + q.s + ',' + pad(q.t, 2) + ')  ' + pad(q.st, 4) + '   ' + pad(LFULL.at(q.st), 5) + '     ' + F(q.R) + '                          ' + F(q.D));
const w47max = W47[0];

// ------------------------------------------------------- D. threshold columns
console.log('');
console.log('=== D. THE TPC THRESHOLD, AND WHAT 47# CAN AND CANNOT MOVE =========');
// TPC-implication: candidate with explicit C implies beta < 2 iff
// ln C < S(b) at some ladder-KNOWN integer b (import-interp.md 4).
function thrOf(L) {
  let best = -1; let bb = 0;
  for (let b = 2; b < L.cap; b++) { const v = Sof(L, b); if (v > best) { best = v; bb = b; } }
  return { thr: best, b: bb };
}
const tFull = thrOf(LFULL);
const tCust = thrOf(LCUST);
const tC47pub = thrOf(LCUST47(708));
const tC47flo = thrOf(LCUST47(705));
console.log('threshold column max_b S(b) = ln(b^2/Ghat(b)), integer bases:');
console.log('  full 22-term (8 literature terms) : ' + F(tFull.thr) + '  at b = ' + tFull.b + '   [rests on A144311 a(18), G2(61#)=1080, Wang 2024]');
console.log('  custody-only (14 exact terms)     : ' + F(tCust.thr) + '  at b = ' + tCust.b + '   [rests on G2(13#)=66, S(16)=ln(256/66)]');
console.log('  custody + 47# verified at 708     : ' + F(tC47pub.thr) + '  at b = ' + tC47pub.b);
console.log('  custody + 47# at the floor 705    : ' + F(tC47flo.thr) + '  at b = ' + tC47flo.b);
check('47# VERIFIED AT 708 DOES NOT RAISE the custody threshold', tC47pub.thr === tCust.thr && tC47pub.b === 16,
  'S(52)@708 = ' + F(Math.log(52 * 52 / 708)) + ' < S(16) = ' + F(tCust.thr));

// the certified freeze: the greedy floors CAP each window's best S from above,
// because S(b) falls as G2 rises: S(p_next - 1) <= ln((p_next-1)^2 / floor).
console.log('');
console.log('--- the freeze: window-best S capped by the certified greedy floors -');
console.log('  window     best base   cap = ln(b^2/floor)   beats S(16)=' + F(tCust.thr) + '?');
for (const p of [47, 53, 59, 61]) {
  const b = NEXTP[p] - 1;
  const cap = Math.log(b * b / GREEDY_FLOOR[p]);
  console.log('  [' + p + ',' + NEXTP[p] + ')   b = ' + pad(b, 3) + '      ' + F(cap) + '               ' + (cap > tCust.thr ? 'CAN raise it' : 'CANNOT, certified'));
}
console.log('  (b = 52 reads S(52) = ln(2704/G2(47#)), so the floor 705 caps it at 1.3443)');
console.log('the b = 66 riser fires iff the verified G2(61#) <= ' + Math.floor(66 * 66 / Math.exp(tCust.thr)) + '  (published: 1080)');
console.log('so 47#, 53#, 59# are certified UNABLE to raise the integer threshold');
console.log('whatever their exact values turn out to be; the first term that can');
console.log('is x = 61 (published value would set ' + F(Math.log(66 * 66 / 1080)) + ' at b = 66), and a 61#');
console.log('enumeration is ~47*53*59 = ' + (47 * 53 * 59).toLocaleString() + 'x the 43# run (~1 h on ten cores).');

// ------------------------------------------------------- E. sensitivity at 47
console.log('');
console.log('=== E. SENSITIVITY OF EVERY 1d READING TO THE 47 TERM ==============');
const shift = Math.log(708 / 705);
console.log('max possible |dD| from the 704-vs-708 discrepancy: ln(708/705) = ' + F(shift, 5) + ' nats');
for (const [name, g47] of [['floor 705', 705], ['published 708', 708]]) {
  const L = mkFull47(g47);
  const P = pairs(L, 82);
  const sup = P.reduce((a, b) => (b.R > a.R ? b : a));
  const t = thrOf(L);
  console.log('  ' + name.padEnd(15) + ': sup R = ' + F(sup.R) + ' at (' + sup.s + ',' + sup.t + ')   threshold = ' + F(t.thr) + ' at b = ' + t.b);
}
const flipC = Math.ceil(supFull.R * LFULL.at(4) * LFULL.at(12));
console.log('flip value for the reachable sup C: the 47-window\'s best pair (4,12)');
console.log('  overtakes (4,10) iff G2(47#) >= ' + flipC + ', i.e. A144311 low by >= ' + (flipC - 708) + ' (' + F(100 * (flipC - 708) / 708, 1) + '%).');
console.log('margins, in nats, against the discrepancy ' + F(shift, 5) + ':');
console.log('  threshold vs ln C          : ' + F(tCust.thr - supCust.D) + '   (' + F((tCust.thr - supCust.D) / shift, 0) + 'x the discrepancy)');
console.log('  sup-pair D gap (4,10)-(4,12): ' + F(supFull.D - w47max.D) + '   (' + F((supFull.D - w47max.D) / shift, 0) + 'x)');

// ------------------------------------------------------- F. boundedness, calibrated
console.log('');
console.log('=== F. IS THE DEFECT BOUNDED? PER-WINDOW SUP, NULLS IN-PASS ========');
// Instrument: Wmax(p) = max D over integer pairs with st in [p, p_next).
// Under ANY law Ghat ~ c x^beta (ln x)^delta the continuous-limit Wmax tends
// to the CONSTANT delta*ln(1/ln 2) - ln c: every power-log law has a BOUNDED
// defect on this instrument, because the sup is driven by small-s pairs and
// the diagonal (both arguments large), where an unbounded defect would live,
// is out of every reachable ladder's range (import-interp.md 5, 9). So the
// test is a CONSISTENCY test, not an exclusion: G2 is consistent with a
// bounded defect iff its Wmax trend is indistinguishable from POW's -- and
// the step-sampling artifact inflates both (import-interp.md 5), which is why
// the nulls run in the same pass on the same primes.
//   POW  v = 1.84 * p^1.546      continuous-limit defect EXACTLY constant
//   LOG  v = 1.016 * p * ln^2 p  defect decreasing toward a constant (the
//                                moving null: proves the reading is not pinned)
const mkNull = (f, n) => mkG(PR.slice(0, n), PR.slice(0, n).map(f), n === 22 ? 83 : 47);
const POWf = (p) => 1.84 * Math.pow(p, 1.546);
const LOGf = (p) => 1.016 * p * Math.log(p) ** 2;

function windowSup(L) {
  const rows = [];
  for (let i = 0; i < L.pr.length; i++) {
    const lo = L.pr[i];
    const hi = (i + 1 < L.pr.length) ? L.pr[i + 1] : L.cap;
    let best = null;
    for (let s = 2; s * s < hi; s++) for (let t = s; s * t < hi; t++) {
      const st = s * t;
      if (st < lo || st >= hi) continue;
      const d = Dof(L, s, t);
      if (best === null || d > best.D) best = { s, t, st, D: d };
    }
    if (best) rows.push({ p: lo, ...best });
  }
  return rows;
}
function ols(xs, ys) {
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0;
  for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
  const b = sxy / sxx, a = my - b * mx;
  let ss = 0; for (let i = 0; i < n; i++) ss += (ys[i] - a - b * xs[i]) ** 2;
  return { b, se: Math.sqrt((ss / Math.max(1, n - 2)) / sxx) };
}
const G2rows = windowSup(LFULL);
console.log('G2, per-window sup of D (nats), window named by its prime:');
console.log('  p     : ' + G2rows.map((r) => pad(r.p, 6)).join(''));
console.log('  Wmax  : ' + G2rows.map((r) => pad(r.D.toFixed(3), 6)).join(''));
console.log('  at st : ' + G2rows.map((r) => pad(r.st, 6)).join(''));
{
  const sorted = [...G2rows].sort((a, b) => b.D - a.D);
  const rank47 = sorted.findIndex((r) => r.p === 47) + 1;
  console.log('the 47-window ranks ' + rank47 + ' of ' + G2rows.length + ' windows (sup ' + F(sorted[0].D) + ' at p=' + sorted[0].p + ', 47-window ' + F(G2rows.find((r) => r.p === 47).D) + ')');
  let run = -Infinity; let stab = null;
  for (const r of G2rows) if (r.D > run) { run = r.D; stab = r.p; }
  console.log('running sup last rises at the p = ' + stab + ' window and is flat over the ' + G2rows.filter((r) => r.p > stab).length + ' windows after it');
}
console.log('');
console.log('slope of Wmax against ln p, each ladder beside its nulls (same primes,');
console.log('same construction, same windows; skip the empty [2,3) and [3,5) rows):');
console.log('  ladder          n(terms)  slope      se        sign at 1 sigma');
const FITS = {};
for (const [name, L, n] of [
  ['G2 full', LFULL, 22], ['POW null 22', mkNull(POWf, 22), 22], ['LOG null 22', mkNull(LOGf, 22), 22],
  ['G2 custody', LCUST, 14], ['POW null 14', mkNull(POWf, 14), 14], ['LOG null 14', mkNull(LOGf, 14), 14],
]) {
  const rows = windowSup(L).filter((r) => r.p >= 5);
  const fit = ols(rows.map((r) => Math.log(r.p)), rows.map((r) => r.D));
  FITS[name] = fit;
  const sign = fit.b - fit.se > 0 ? 'positive' : (fit.b + fit.se < 0 ? 'negative' : 'zero');
  console.log('  ' + name.padEnd(15) + pad(n, 5) + '     ' + F(fit.b) + '  ' + F(fit.se) + '   ' + sign);
}
console.log('(the POW row is the calibration: whatever it reads IS what a bounded');
console.log(' defect looks like on this instrument at this range; the LOG row');
console.log(' reads negative, so the instrument is not pinned to positive)');
console.log('');
console.log('the discriminating statistic, G2 slope minus POW slope (same primes):');
for (const [g, p0] of [['G2 full', 'POW null 22'], ['G2 custody', 'POW null 14']]) {
  const d = FITS[g].b - FITS[p0].b;
  const se = Math.sqrt(FITS[g].se ** 2 + FITS[p0].se ** 2);
  console.log('  ' + g.padEnd(12) + ': ' + F(d) + ' +- ' + F(se) + '   -> ' + (Math.abs(d) < se ? 'CONSISTENT with a bounded defect' : (d > 0 ? 'reads above the bounded null' : 'reads BELOW the bounded null')));
}

// ------------------------------------------------------- G. wrap
console.log('');
console.log('=== G. SUMMARY NUMBERS =============================================');
console.log('S(16) custody threshold            : ' + F(tCust.thr));
console.log('reachable integer ln C (custody)   : ' + F(supCust.D));
console.log('the TPC window for the candidate   : C in [' + F(supCust.R) + ', ' + F(Math.exp(tCust.thr)) + ')  i.e. ln C in [' + F(supCust.D) + ', ' + F(tCust.thr) + ')');
console.log('47-window max D (published 708)    : ' + F(w47max.D) + '  at (' + w47max.s + ',' + w47max.t + ')');
console.log('discrepancy bound on any D         : ' + F(shift, 5));
console.log('');
console.log('self-test failures: ' + FAILS + (FAILS ? '   <-- DO NOT TRUST THIS OUTPUT' : '   (all checks passed)'));
console.log('total ' + ((Date.now() - T0) / 1000).toFixed(1) + ' s');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-fekete-1d-01-defect47.js
//   invocation:  node research/attack-fekete-1d-01-defect47.js
//   code-sha256: 45554df4c6fab3d2ab5d1da276d30ed7dd2cf1fed21949fe34e62cf82bf943ed
//   out-sha256:  afc6d1902f41f3f9e70a7d2cf947e4212d68b2088c56217a40ecafb4227181cd
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     0.1 s
// ============================================================================
// === A. CUSTODY ======================================================
// exact-g2-ladder.js parsed terms : 14
// A144311 parsed terms            : 22
//   ok    14 exact terms parsed
//   ok    22 A144311 terms parsed
//   ok    exact ladder == A144311+1 on all 14 shared terms
// greedy certified floors (G2 >=) : 47#:705  53#:870  59#:954  61#:1075
//   (from replay-verified coverings 704/869/953/1074, CITED not rerun)
//
// === B. ENGINE SELF-TESTS ============================================
//   ok    negative control: G*(t)=t^2 gives D == 0   max |D| = 0.00e+0
//   ok    identity D = S+S-S at every reachable pair   max dev = 5.55e-16 (import-interp-01: 8.88e-16)
//   ok    pair count at st <= 79 == 104 (import-interp-01 convention)   got 104
//   ok    integer sup R (floor 2, st <= 79) = 2.9333    2.9333  ln =  1.0761
//   ok    integer sup R (floor 7, st <= 79) = 1.5533    1.5533
//   ok    integer threshold max_b S(b) = 1.3946 at b = 66    1.3946 @ b=66
//
// === C. THE DEFECT, FULL PAIR TABLE ==================================
// pairs with st <= 82 (widest legal domain): 111
//   floor 2:  sup R =  2.9333  ln =  1.0761  at (4,10) st=40   [111 pairs]
//   floor 3:  sup R =  2.9333  ln =  1.0761  at (4,10) st=40   [71 pairs]
//   floor 5:  sup R =  2.7738  ln =  1.0202  at (6,12) st=72   [29 pairs]
//   floor 7:  sup R =  1.9000  ln =  0.6419  at (8,10) st=80   [9 pairs]
// NOTE the floor-7 sup on st <= 82 vs the recorded 1.5533 on st <= 79:
//   the widest domain admits (8,10) st=80 with R =  1.9000, matching the REAL-form 1.9000;
//   the 1.5533 was a domain-cap artifact (st <= 79), not a structural gap.
// custody-only pairs (st <= 46): 50   sup R =  2.9333  ln =  1.0761  at (4,10)
//   ok    the reachable sup C rests on CUSTODY terms alone   (4,10): Ghat(40)=G2(37#)=528 exact, Ghat(4)=6, Ghat(10)=30 exact
//
// --- the 47-window, every integer pair with st in [47, 53) ----------
//   (s,t)    st   Ghat(st)  R = Ghat(st)/(Ghat s * Ghat t)      D (nats)
//   (4,12)    48     708      2.8095                           1.0330
//   (5,10)    50     708      1.9667                           0.6763
//   (6, 8)    48     708      1.9667                           0.6763
//   (3,16)    48     708      1.7879                           0.5810
//   (4,13)    52     708      1.7879                           0.5810
//   (2,24)    48     708      1.7353                           0.5512
//   (2,25)    50     708      1.7353                           0.5512
//   (2,26)    52     708      1.7353                           0.5512
//   (3,17)    51     708      1.0926                           0.0886
//   (7, 7)    49     708      0.7867                          -0.2400
//
// === D. THE TPC THRESHOLD, AND WHAT 47# CAN AND CANNOT MOVE =========
// threshold column max_b S(b) = ln(b^2/Ghat(b)), integer bases:
//   full 22-term (8 literature terms) :  1.3946  at b = 66   [rests on A144311 a(18), G2(61#)=1080, Wang 2024]
//   custody-only (14 exact terms)     :  1.3555  at b = 16   [rests on G2(13#)=66, S(16)=ln(256/66)]
//   custody + 47# verified at 708     :  1.3555  at b = 16
//   custody + 47# at the floor 705    :  1.3555  at b = 16
//   ok    47# VERIFIED AT 708 DOES NOT RAISE the custody threshold   S(52)@708 =  1.3400 < S(16) =  1.3555
//
// --- the freeze: window-best S capped by the certified greedy floors -
//   window     best base   cap = ln(b^2/floor)   beats S(16)= 1.3555?
//   [47,53)   b =  52       1.3443               CANNOT, certified
//   [53,59)   b =  58       1.3524               CANNOT, certified
//   [59,61)   b =  60       1.3280               CANNOT, certified
//   [61,67)   b =  66       1.3992               CAN raise it
//   (b = 52 reads S(52) = ln(2704/G2(47#)), so the floor 705 caps it at 1.3443)
// the b = 66 riser fires iff the verified G2(61#) <= 1123  (published: 1080)
// so 47#, 53#, 59# are certified UNABLE to raise the integer threshold
// whatever their exact values turn out to be; the first term that can
// is x = 61 (published value would set  1.3946 at b = 66), and a 61#
// enumeration is ~47*53*59 = 146,969x the 43# run (~1 h on ten cores).
//
// === E. SENSITIVITY OF EVERY 1d READING TO THE 47 TERM ==============
// max possible |dD| from the 704-vs-708 discrepancy: ln(708/705) =  0.00425 nats
//   floor 705      : sup R =  2.9333 at (4,10)   threshold =  1.3946 at b = 66
//   published 708  : sup R =  2.9333 at (4,10)   threshold =  1.3946 at b = 66
// flip value for the reachable sup C: the 47-window's best pair (4,12)
//   overtakes (4,10) iff G2(47#) >= 740, i.e. A144311 low by >= 32 ( 4.5%).
// margins, in nats, against the discrepancy  0.00425:
//   threshold vs ln C          :  0.2794   ( 66x the discrepancy)
//   sup-pair D gap (4,10)-(4,12):  0.0431   ( 10x)
//
// === F. IS THE DEFECT BOUNDED? PER-WINDOW SUP, NULLS IN-PASS ========
// G2, per-window sup of D (nats), window named by its prime:
//   p     :      3     5     7    11    13    17    19    23    29    31    37    41    43    47    53    59    61    67    71    73    79
//   Wmax  :  0.405 0.000 0.916 0.560 0.606 0.588 0.916 1.041 0.670 0.969 1.076 0.599 0.897 1.033 0.882 0.987 1.003 0.684 1.020 0.658 0.770
//   at st :      4     6     8    12    16    18    20    24    30    32    40    42    44    48    54    60    64    68    72    75    80
// the 47-window ranks 3 of 21 windows (sup  1.0761 at p=37, 47-window  1.0330)
// running sup last rises at the p = 37 window and is flat over the 10 windows after it
//
// slope of Wmax against ln p, each ladder beside its nulls (same primes,
// same construction, same windows; skip the empty [2,3) and [3,5) rows):
//   ladder          n(terms)  slope      se        sign at 1 sigma
//   G2 full           22      0.1661   0.0637   positive
//   POW null 22       22      0.2075   0.0558   positive
//   LOG null 22       22     -0.2415   0.0554   negative
//   G2 custody        14      0.2526   0.1094   positive
//   POW null 14       14      0.2715   0.0976   positive
//   LOG null 14       14     -0.1433   0.0999   negative
// (the POW row is the calibration: whatever it reads IS what a bounded
//  defect looks like on this instrument at this range; the LOG row
//  reads negative, so the instrument is not pinned to positive)
//
// the discriminating statistic, G2 slope minus POW slope (same primes):
//   G2 full     : -0.0414 +-  0.0846   -> CONSISTENT with a bounded defect
//   G2 custody  : -0.0188 +-  0.1466   -> CONSISTENT with a bounded defect
//
// === G. SUMMARY NUMBERS =============================================
// S(16) custody threshold            :  1.3555
// reachable integer ln C (custody)   :  1.0761
// the TPC window for the candidate   : C in [ 2.9333,  3.8788)  i.e. ln C in [ 1.0761,  1.3555)
// 47-window max D (published 708)    :  1.0330  at (4,12)
// discrepancy bound on any D         :  0.00425
//
// self-test failures: 0   (all checks passed)
// total 0.0 s
// ============================================================
// READINGS
// ============================================================

// 1. THE DEFECT AT 47#, exactly. Ten integer pairs land in [47, 53). The
//    largest defect is D = 1.0330 nats at (4,12) -- the SECOND largest pair
//    value on the whole 111-pair table, 0.0431 nats under the global sup
//    1.0761 at (4,10) -- and the smallest is NEGATIVE, -0.2400 at (7,7), the
//    one all-prime pair in the window. The 47-window's sup ranks 3rd of 21
//    windows (behind p = 37's 1.0761, which IS the global sup, and just above
//    p = 71's 1.0202). Nothing about the window is extreme. [VERIFIED]
//
// 2. THE 704-vs-708 DISCREPANCY IS IMMATERIAL TO 1d. The certified greedy
//    floor gives G2(47#) >= 705; A144311 says 708. The worst shift any defect
//    reading can take from that bracket is ln(708/705) = 0.00425 nats, which
//    is 66x below the threshold-vs-lnC margin (0.2794) and 10x below the
//    sup-pair gap (0.0431). Both endpoints of the bracket leave the reachable
//    sup C = 2.9333 at (4,10) and every threshold unmoved. For A144311's
//    value to matter AT ALL it would have to be low by >= 32 (G2(47#) >= 740,
//    a 4.5% error), at which point (4,12) overtakes (4,10). [VERIFIED]
//
// 3. REFUTATION, and it is the sharpest thing in this file: 1c's stated win
//    "each new ladder-known x raises 1d's TPC threshold" is FALSE at 47#, and
//    not just at the published value -- CERTIFIED false whatever the
//    enumeration returns. The custody-only integer threshold is S(16) =
//    ln(256/66) = 1.3555, a 13#-fact. The best the 47-window can ever
//    contribute is S(52) = ln(2704/G2(47#)) <= ln(2704/705) = 1.3443 < 1.3555,
//    because the greedy floor caps it from above (S falls as G2 rises). The
//    same freeze holds at 53# (cap 1.3524) and 59# (cap 1.3280). The FIRST
//    ladder term that can raise the integer threshold is x = 61 (published
//    G2(61#) = 1080 would set S(66) = 1.3946; any verified value <= 1123
//    raises it), and a 61# enumeration is ~146,969x the 43# run's ~1 h.
//    So 1d's integer TPC threshold is EFFECTIVELY FROZEN: 1.3555 on custody
//    terms, 1.3946 if Wang 2024's a(18) is trusted. 1c's 47# probe verifies a
//    published term and settles the x = 37 outlier question; it buys 1d
//    nothing. [VERIFIED at the published values; the freeze is certified by
//    the replay-verified greedy floors]
//
// 4. THE REACHABLE SUP RESTS ON CUSTODY TERMS ALONE. C = 2.9333 (ln C =
//    1.0761) is attained at (4,10), st = 40, using G2(7#) = 30 and
//    G2(37#) = 528, both corpus-exact. Dropping all eight literature terms
//    changes neither the sup nor its pair. Combined with reading 3, the whole
//    1d position -- candidate window C in [2.9333, 3.8788), ln C in
//    [1.0761, 1.3555) -- now stands on custody terms only: any proof of the
//    candidate with C < 3.8788 is TPC-implying via G2(13#) = 66 alone, and
//    the reachable pairs already force C >= 2.9333. The gap a proof must
//    thread is 0.2794 nats wide. [VERIFIED]
//
// 5. ONE DOMAIN-CAP ARTIFACT IN THE RECORD, repaired in passing: the floor-7
//    integer sup was recorded as 1.5533 (import-interp.md 4) under the
//    convention st <= 79. Ghat is known on [2, 83), and the widest legal
//    domain admits (8,10), st = 80, with R = 1.9000 -- equal to the recorded
//    REAL-form floor-7 sup, so the real/integer distinction at floor 7 was an
//    artifact of capping st at the largest ladder prime, not structure. Floors
//    2, 3, 5 and every threshold are unaffected. [VERIFIED]
//
// 6. THE DEFECT READS BOUNDED, by consistency and not by exclusion. On the
//    per-window sup instrument, G2's slope against ln p is +0.1661 +- 0.0637
//    (full) and +0.2526 +- 0.1094 (custody-only) -- but the constant-defect
//    null POW reads +0.2075 +- 0.0558 on the same primes, so a positive slope
//    of that size IS what a bounded defect looks like here (the step artifact,
//    import-interp.md 5, reproduced on a second instrument). The
//    discriminating statistic G2-minus-POW reads -0.0414 +- 0.0846 (full) and
//    -0.0188 +- 0.1466 (custody): consistent with bounded on both, and the
//    custody-only reading shows the verdict does not lean on the eight
//    literature terms. The moving null LOG reads -0.24 +- 0.06, so the
//    instrument is not pinned. The running sup last rises at the p = 37
//    window and is flat over the ten windows after it. [MEASURED]
//
// 7. WHAT THE INSTRUMENT CANNOT SEE, stated as a limit and not a footnote:
//    every power-log law Ghat ~ c x^beta (ln x)^delta has a BOUNDED window-sup
//    defect (continuous limit delta*ln(1/ln 2) - ln c), because the sup is
//    driven by small-s pairs. An unbounded defect would live on the diagonal
//    (both arguments large), and the largest sqrt(x) any ladder offers is
//    ~9. So "bounded" is the supported reading on the reachable range under
//    every law this corpus entertains, and it is NOT a demonstrated fact
//    about G2's true defect. That gap is exactly why the Fekete prize is
//    limit existence with an UNNAMED constant (import-interp.md 7).
//    [INFERRED, from MEASURED ingredients]
