// attack-ioslack-survey.js
//
// TODO 0e, FIRST MOVE: THE INSTRUMENT-SLACK OSCILLATION SURVEY.
//
// WHY THIS EXISTS. `verify-monotone-depth.md` §2 formalized what an
// infinitely-often licence is worth. A route supplies, at levels x in some set
// S, a bound B(x) >= G2(x#). Writing thr(x) = x'^2 and
//
//     B/thr = C(x) * T(x),      C = B/G2 >= 1 (INSTRUMENT SLACK),
//                               T = G2/thr  (THE TRUTH),
//
// a uniform route needs sup_S ln(C*T) < 0 and an i.o. route needs
// inf_S ln(C*T) < 0. The licence is therefore worth amp(ln C + ln T), which is
// amp(ln T) = 0.3187 nats ONLY when the instrument's own looseness does not
// vary with the level. Three of dial 4's four channels are closed (truth
// oscillation 0.3187 falling; alignment 2-11%; power-law instruments -> 0;
// depth carries no freedom). The FOURTH and only open channel is an instrument
// sharp at infinitely many levels and loose elsewhere, whose i.o. value is
// amp(ln C) -- the oscillation of ITS OWN slack, which nothing measured bounds.
//
// The exemplar already on file is `maxsum_{L+1}`, whose slack oscillates 0.3747
// nats, MORE than the truth's 0.3187. This file surveys every G2-bounding (and
// L-bounding) instrument in the corpus that has per-level values on record,
// prices amp(ln C) for each, and asks the decision question:
//
//     does ANY instrument's SHARP-LEVEL SIGNATURE survive a permutation test
//     (detrend, permute, family-wise correct)?
//
// STANDING COMPUTE RULE. Every input number below is CITED from an embedded
// artifact and is NOT recomputed here. This is exactly the cite-don't-recompute
// case: the survey's content is the arithmetic ON those columns, not the
// columns. Each table carries its source file and section in the `src` field,
// and §0 re-checks the cross-file agreements that exist.
//
// usage: node research/attack-ioslack-survey.js
//
// ============================================================================
// PRE-REGISTRATION, written in full before any line below it was run.
// ============================================================================
// P1. amp(ln C) will EXCEED the truth's 0.3187 nats at a MAJORITY of the
//     instruments with >= 5 levels. Instrument slack is the larger channel and
//     the maxsum_{L+1} exemplar is not special.
// P2. The L-ceiling family (Theorem B, condition (i), forced, LR, LP, LV) will
//     be the loosest and the most oscillatory, because their truth (L) is a
//     small integer and a one-unit miss is a large log.
// P3. At least one instrument will read amp(ln C) = 0 EXACTLY (LVP, and the
//     alternation-refined tail-count certificate). PREDICTION ABOUT WHAT THAT
//     MEANS: a zero-slack instrument has NOTHING to be sharp-on-a-subsequence
//     with. Its i.o. value is 0, not infinity. It is the degenerate case and it
//     is the WRONG direction for dial 4 -- an exact instrument transfers its
//     whole difficulty to the object, which is why the tail-count transport is
//     recorded as "an exact simulator rather than a source of bounds".
// P4. Trends will be dominated by NOISE, not by a direction: on 5 to 8 levels
//     the LS slope of ln C on ln(level) will have |t| < 2 for most instruments.
// P5. THE DECISION QUESTION: NO instrument's sharp-level signature will survive
//     family-wise correction. Grounds, stated in advance so the prediction is
//     falsifiable: (a) the fold-L wave already measured p_FWE = 0.1396 for the
//     BEST of eleven rules on the 18-level G2 ladder, and every instrument here
//     has 5 to 8 levels, i.e. strictly less power; (b) the one instrument with
//     a NAMED mechanism for its sharp levels (maxsum_{L+1} is sharp exactly
//     when L = 1, i.e. when no gap of the old tile is ≡ 0, ±2 mod p) has a
//     signature that is provably EMPTY for large p, since the count of
//     qualifying gaps is ~3D/p and D grows like exp(theta(x)); (c) the greedy
//     oracle's sharp levels (x <= 43) are a compute-budget artifact, already
//     closed in REFUTED.md, not an arithmetic signature.
// P6. One candidate will look good on raw p and die on FWE: the "record gap
//     qualifies mod p" rule (a3-10's mechanism (S)), because it is the only
//     rule in the family that names an arithmetic accident recurring at
//     arbitrarily large p.
// ============================================================================

'use strict';

const F = (v, d = 4) => (Number.isFinite(v) ? v.toFixed(d) : '   n/a');
const pad = (s, n) => String(s).padStart(n);
const padr = (s, n) => String(s).padEnd(n);
let FAILS = 0;
const check = (label, ok, detail) => {
  if (!ok) FAILS++;
  console.log('  ' + (ok ? 'ok  ' : 'FAIL') + '  ' + padr(label, 52) + (detail || ''));
};

// Deterministic PRNG, same construction and discipline as
// attack-0c0e-02-level-selection.js: the permutation null must be reproducible
// byte for byte or the embedded tail cannot be re-verified. xorshift32.
const SEED = 20260819;
let _rng = SEED >>> 0;
function rnd() {
  _rng ^= _rng << 13; _rng >>>= 0;
  _rng ^= _rng >>> 17;
  _rng ^= _rng << 5; _rng >>>= 0;
  return _rng / 4294967296;
}
function reseed() { _rng = SEED >>> 0; }

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];
const isPrime = (n) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
const nextPrime = (n) => { let m = n + 1; while (!isPrime(m)) m++; return m; };
const piOf = (n) => PRIMES.filter(p => p <= n).length;
const thetaOf = (x) => PRIMES.filter(p => p <= x).reduce((s, p) => s + Math.log(p), 0);
const mbarOf = (x) => { let W = 1, D = 1; for (const q of PRIMES) { if (q > x) break; W *= q; if (q >= 3) D *= (q - 2); } return W / D; };
const frac = (v) => v - Math.floor(v);

// ---------------------------------------------------------------------------
// The exact G2 ladder, cited from research/exact-g2-ladder.js (which certifies
// every entry by exhibition + threshold safety) and A144311+1 for x >= 47 as
// recorded in G2-STATE.md line 902 ("ours to verify, not to claim").
// ---------------------------------------------------------------------------
const G2 = { 2: 2, 3: 6, 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258, 31: 348, 37: 528, 41: 546, 43: 618, 47: 708, 53: 870, 59: 966, 61: 1080, 67: 1284, 71: 1398, 73: 1530, 79: 1710 };

// ===========================================================================
// THE ROSTER. Every column is CITED, never recomputed.
//   kind: 'upper' -> C = bound/truth ; 'lower' -> C = truth/bound ;
//         'ratio' -> the column IS C already (a slack/overhead ratio on record)
//   axis: what indexes the levels ('fold p', 'level x', 'depth k', ...)
// ===========================================================================
const ROSTER = [
  {
    id: 'I1', name: 'maxsum_{L+1} step-3 (the exemplar)', kind: 'upper', axis: 'fold p',
    src: 'a3-10-lower-tightness.js OUTPUT §1 custody table; gate-multiplies.md §8',
    lev: [7, 11, 13, 17, 19, 23, 29],
    bound: [30, 42, 96, 138, 168, 228, 300],
    truth: [30, 42, 66, 108, 150, 204, 258],
    bounds: 'G2(new)',
  },
  {
    id: 'I2', name: 'A5 Theorem B ceiling on L', kind: 'upper', axis: "fold p'",
    src: 'a3-05-bound-L.md §5 reading 5; attack-foldL-01-census.md §2; attack-foldL-02-bridge.md §2',
    lev: [7, 11, 13, 17, 19, 23, 29, 31],
    bound: [2, 2, 2, 4, 4, 4, 5, 6],
    truth: [2, 1, 2, 2, 2, 3, 2, 4],
    bounds: 'L',
  },
  {
    id: 'I3', name: 'A5 condition-(i) ceiling (= L0)', kind: 'upper', axis: "fold p'",
    src: 'a3-05-bound-L.md §5 reading 5; attack-foldL-02-bridge.md §2 (L0)',
    lev: [7, 11, 13, 17, 19, 23, 29, 31],
    bound: [3, 2, 8, 5, 11, 8, 10, 13],
    truth: [2, 1, 2, 2, 2, 3, 2, 4],
    bounds: 'L',
  },
  {
    id: 'I4', name: 'forced ceiling (channel-compatible census)', kind: 'upper', axis: "fold p'",
    src: 'attack-foldL-01-census.md §2 ladder diagonal',
    lev: [7, 11, 13, 17, 19, 23, 29, 31],
    bound: [2, 1, 2, 4, 4, 4, 5, 6],
    truth: [2, 1, 2, 2, 2, 3, 2, 4],
    bounds: 'L',
  },
  {
    id: 'I5', name: 'LR = 1 + longest run of gaps >= theta', kind: 'upper', axis: "fold p'",
    src: 'attack-foldL-02-bridge.md §2 (a3-05 §8)',
    lev: [7, 11, 13, 17, 19, 23, 29, 31],
    bound: [3, 2, 4, 3, 5, 4, 5, 6],
    truth: [2, 1, 2, 2, 2, 3, 2, 4],
    bounds: 'L',
  },
  {
    id: 'I6', name: 'LP = LR + the 6p pair floor', kind: 'upper', axis: "fold p'",
    src: 'attack-foldL-02-bridge.md §2, §4',
    lev: [7, 11, 13, 17, 19, 23, 29, 31],
    bound: [2, 2, 2, 2, 3, 3, 3, 4],
    truth: [2, 1, 2, 2, 2, 3, 2, 4],
    bounds: 'L',
  },
  {
    id: 'I7', name: 'LV = value-qualifying run', kind: 'upper', axis: "fold p'",
    src: 'attack-foldL-02-bridge.md §2, §4',
    lev: [7, 11, 13, 17, 19, 23, 29, 31],
    bound: [3, 1, 2, 2, 2, 3, 3, 4],
    truth: [2, 1, 2, 2, 2, 3, 2, 4],
    bounds: 'L',
  },
  {
    id: 'I8', name: 'LVP = LV + the 6p pair floor', kind: 'upper', axis: "fold p'",
    src: 'attack-foldL-02-bridge.md §2, §4 ("slack zero at all eight cells")',
    lev: [7, 11, 13, 17, 19, 23, 29, 31],
    bound: [2, 1, 2, 2, 2, 3, 2, 4],
    truth: [2, 1, 2, 2, 2, 3, 2, 4],
    bounds: 'L',
  },
  {
    id: 'I9', name: 'Tail-Count certificate M_loose', kind: 'upper', axis: 'fold q',
    src: 'verify-tailcount-transport.md §(c) table; attack-foldL-03-transport.md §3',
    lev: [11, 13, 17, 19, 23, 29, 31],
    bound: [42, 66, 108, 150, 204, 270, 348],
    truth: [42, 66, 108, 150, 204, 258, 348],
    bounds: 'G2(new)',
  },
  {
    id: 'I10', name: 'Tail-Count certificate M_alt', kind: 'upper', axis: 'fold q',
    src: 'verify-tailcount-transport.md §(c) table',
    lev: [11, 13, 17, 19, 23, 29, 31],
    bound: [42, 66, 108, 150, 204, 258, 348],
    truth: [42, 66, 108, 150, 204, 258, 348],
    bounds: 'G2(new)',
  },
  {
    id: 'I11', name: 'Tail-Count certificate M_full', kind: 'upper', axis: 'fold q',
    src: 'verify-tailcount-transport.md §(c) ("identically the truth, all seven folds")',
    lev: [11, 13, 17, 19, 23, 29, 31],
    bound: [42, 66, 108, 150, 204, 258, 348],
    truth: [42, 66, 108, 150, 204, 258, 348],
    bounds: 'G2(new)',
  },
  {
    id: 'I12', name: 'depth-k counting ceiling at block 1 (T_5)', kind: 'upper', axis: 'depth k',
    src: 'attack-ab-coupling.md §4 (truth = exact search, 19 slots)',
    lev: [1, 2, 3, 4, 5, 6],
    bound: [62, 54, 39, 32, 22, 19],
    truth: [19, 19, 19, 19, 19, 19],
    bounds: 'L (slots)',
    note: 'DEPTH-indexed, not level-indexed: this is dial 4 channel 3, kept for contrast',
  },
  {
    id: 'I13', name: 'vector-sieve certificate need nP/z^2', kind: 'ratio', axis: 'sieve z',
    src: 'theta-selfconsistent.md §2 (exact complete-period rows only)',
    lev: [13, 17, 19, 23, 29, 31],
    ratio: [0.3550, 0.4360, 0.5485, 0.4877, 0.4637, 0.6119],
    bounds: "the zone budget z^2 (this column IS C*T, not C alone)", notSlack: true,
  },
  {
    id: 'I14a', name: 'threshold-m certificate H_cert/maxsum_m, m=1', kind: 'ratio', axis: 'sieve z',
    src: 'attack-foldL-05-maxsum-direct.md §4 R1 table',
    lev: [13, 17, 19, 23, 29],
    ratio: [1.4286, 1.9091, 1.8333, 1.7200, 1.9412],
    bounds: 'maxsum_1 = G2',
  },
  {
    id: 'I14b', name: 'threshold-m certificate H_cert/maxsum_m, m=4', kind: 'ratio', axis: 'sieve z',
    src: 'attack-foldL-05-maxsum-direct.md §4 R1 table',
    lev: [13, 17, 19, 23, 29],
    ratio: [1.1667, 1.1538, 1.5152, 1.6053, 1.5517],
    bounds: 'maxsum_4',
  },
  {
    id: 'I14c', name: 'threshold-m certificate H_cert/maxsum_m, m=8', kind: 'ratio', axis: 'sieve z',
    src: 'attack-foldL-05-maxsum-direct.md §4 R1 table',
    lev: [13, 17, 19, 23, 29],
    ratio: [1.0000, 1.1842, 1.4375, 1.2857, 1.2045],
    bounds: 'maxsum_8',
  },
  {
    id: 'I15', name: 'greedy oracle (LOWER instrument)', kind: 'ratio', axis: 'level x',
    src: 'greedy-oracle-validation.md §3 budget-A table, ratio column inverted',
    lev: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79],
    ratio: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 / 0.9958, 1, 1 / 0.9876, 1 / 0.9954, 1 / 0.9571, 1 / 0.9399, 1 / 0.9725, 1 / 0.9567],
    bounds: 'G2(x#)-1 from below',
  },
  {
    id: 'I16', name: 'bridge floor / u-frame need 0.31p/ln p', kind: 'ratio', axis: 'level x',
    src: 'attack-foldL-05-maxsum-direct.md §3, the eight EXACT rows only',
    lev: [11, 13, 17, 19, 23, 29, 37, 79],
    ratio: [1.406, 1.909, 1.613, 2.000, 1.759, 1.498, 1.889, 1.427],
    bounds: 'the u-frame requirement on L',
  },
  {
    id: 'I17', name: 'maxsum_2 step-3 LOWER bound on G2(new)', kind: 'lower', axis: 'fold p',
    src: 'a3-10-lower-tightness.js OUTPUT §1 custody table',
    lev: [7, 11, 13, 17, 19, 23, 29],
    bound: [24, 42, 66, 96, 150, 186, 234],
    truth: [30, 42, 66, 108, 150, 204, 258],
    bounds: 'G2(new)',
  },
  {
    id: 'I18', name: 'rho = overshoot coefficient, max over m<=8', kind: 'ratio', axis: 'tile T_x',
    src: 'gate-multiplies.md §8 tail ("max_{m<=8} rho(m) at T_11..T_29")',
    lev: [11, 13, 17, 19, 23, 29],
    ratio: [1.58, 1.78, 1.83, 1.41, 1.84, 2.39],
    bounds: 'the counting-bound overshoot, not a bound/truth ratio',
  },
  {
    id: 'I19', name: 'centered maxsum C_M per-fold multiplier over G2 s', kind: 'ratio', axis: 'fold q',
    src: 'attack-foldL-03-transport.md §3 (C_1 multipliers / G2 multipliers)',
    lev: [13, 17, 19, 23, 29],
    ratio: [1.556 / 1.400, 1.839 / 1.571, 1.859 / 1.636, 1.462 / 1.389, 1.415 / 1.360],
    bounds: 'per-fold growth of the centered-maxsum instrument',
  },
  {
    id: 'I20', name: 'alphabet |A| (LOWER instrument)', kind: 'ratio', axis: 'fold q',
    src: 'attack-foldL-03-transport.md §3 (|A|/(G2/6), inverted)',
    lev: [11, 13, 17, 19, 23, 29],
    ratio: [1 / 0.80, 1 / 1.00, 1 / 0.909, 1 / 0.944, 1 / 0.920, 1 / 0.971],
    bounds: 'G2/6 from below',
  },
  {
    id: 'I21', name: 'Sum exp(lambda g): index cost Z_2/Z_1', kind: 'ratio', axis: 'fold q',
    src: 'attack-foldL-03-transport.md §3 ("no stable value")',
    lev: [11, 13, 17, 19, 23, 29],
    ratio: [36.6, 322.2, 285.8, 510.6, 126.1, 83.9],
    bounds: 'an index cost, NOT a slack; included for the amp comparison only', notSlack: true,
  },
];

// The reference column: the TRUTH's own oscillation, the thing dial 4 was
// priced at. Cited from attack-0c0e-level-selection.md / verify-monotone-depth.md.
const TRUTH_AMP = 0.3187;
const TRUTH_INF = { x: 37, v: 3.1837 }, TRUTH_SUP = { x: 13, v: 4.3788 };

// ---------------------------------------------------------------------------
function slackOf(I) {
  if (I.kind === 'ratio') return I.ratio.slice();
  if (I.kind === 'upper') return I.bound.map((b, i) => b / I.truth[i]);
  return I.truth.map((t, i) => t / I.bound[i]);           // lower
}
function lsFit(xs, ys) {
  const n = xs.length; let sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (let i = 0; i < n; i++) { sx += xs[i]; sy += ys[i]; sxx += xs[i] * xs[i]; sxy += xs[i] * ys[i]; }
  const b = (n * sxy - sx * sy) / (n * sxx - sx * sx), a = (sy - b * sx) / n;
  const res = ys.map((y, i) => y - (a + b * xs[i]));
  const sse = res.reduce((s, v) => s + v * v, 0);
  const sxxc = sxx - sx * sx / n;
  const se = n > 2 ? Math.sqrt(sse / (n - 2) / sxxc) : NaN;
  return { a, b, res, sd: Math.sqrt(sse / n), t: b / se };
}
function spearman(xs, ys) {
  const rank = (a) => { const idx = a.map((v, i) => [v, i]).sort((u, v) => u[0] - v[0]); const r = new Array(a.length); let i = 0; while (i < idx.length) { let j = i; while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j++; const m = (i + j) / 2 + 1; for (let k = i; k <= j; k++) r[idx[k][1]] = m; i = j + 1; } return r; };
  const rx = rank(xs), ry = rank(ys), n = xs.length;
  const mx = rx.reduce((s, v) => s + v, 0) / n, my = ry.reduce((s, v) => s + v, 0) / n;
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < n; i++) { num += (rx[i] - mx) * (ry[i] - my); dx += (rx[i] - mx) ** 2; dy += (ry[i] - my) ** 2; }
  return num / Math.sqrt(dx * dy);
}

console.log('='.repeat(78));
console.log('TODO 0e FIRST MOVE — THE INSTRUMENT-SLACK OSCILLATION SURVEY');
console.log('='.repeat(78));
console.log('Licence value = amp(ln C) + amp(ln T) at most; amp(ln T) = ' + F(TRUTH_AMP) +
  ' nats (inf ' + F(TRUTH_INF.v) + ' @ x=' + TRUTH_INF.x + ', sup ' + F(TRUTH_SUP.v) + ' @ x=' + TRUTH_SUP.x + ').');
console.log('Every column below is CITED, not recomputed. Sources in §1.');
console.log('');

// ============================================================================
// §0. CROSS-FILE AGREEMENT ON THE CITED COLUMNS
// ============================================================================
console.log('='.repeat(78));
console.log('§0. CUSTODY — the cross-file agreements that exist among the cited columns');
console.log('='.repeat(78));
{
  const I1 = ROSTER.find(r => r.id === 'I1');
  // gate-multiplies.md §8 prints the same step-3 chain at p = 13..29
  const gm = { 13: [96, 66], 17: [138, 108], 19: [168, 150], 23: [228, 204], 29: [300, 258] };
  let ok = true;
  for (const [p, [b, t]] of Object.entries(gm)) {
    const i = I1.lev.indexOf(Number(p));
    if (I1.bound[i] !== b || I1.truth[i] !== t) ok = false;
  }
  check('I1 vs gate-multiplies.md §8 step-3 table', ok, '5 folds, bound and truth');

  // verify-monotone-depth.md §2 quotes C for I1 at p = 7..29
  const quoted = [1.0000, 1.0000, 1.4545, 1.2778, 1.1200, 1.1176, 1.1628];
  const mine = slackOf(I1);
  check('I1 slack vs verify-monotone-depth.md §2 quote', quoted.every((q, i) => Math.abs(q - mine[i]) < 5e-5),
    'max |diff| = ' + F(Math.max(...quoted.map((q, i) => Math.abs(q - mine[i]))), 6));

  // the L truth column is shared by I2..I8 and is a3-05-bound-L.md's line 185
  const trues = ROSTER.filter(r => r.bounds === 'L' && r.axis === "fold p'").map(r => r.truth.join(','));
  check('true-L column identical across I2..I8', new Set(trues).size === 1, trues[0]);

  // the G2 truth column of I9..I11 is the exact ladder
  const I9 = ROSTER.find(r => r.id === 'I9');
  check('I9..I11 truth column vs exact-g2-ladder.js', I9.lev.every((q, i) => G2[q] === I9.truth[i]),
    I9.truth.join(','));

  // A5 Theorem B >= forced ceiling at every cell (foldL-01 §3: equal at 68/71)
  const I2 = ROSTER.find(r => r.id === 'I2'), I4 = ROSTER.find(r => r.id === 'I4');
  check('Theorem B >= forced ceiling at all 8 diagonal cells', I2.bound.every((b, i) => b >= I4.bound[i]),
    'strict at ' + I2.bound.filter((b, i) => b > I4.bound[i]).length + ' of 8');

  // the bridge ladder L0 >= LB, LR >= LP >= LVP, LV >= LVP (foldL-02 reading 2)
  const g = (id) => ROSTER.find(r => r.id === id).bound;
  const mono = g('I3').every((v, i) => v >= g('I2')[i]) && g('I5').every((v, i) => v >= g('I6')[i]) &&
    g('I6').every((v, i) => v >= g('I8')[i]) && g('I7').every((v, i) => v >= g('I8')[i]);
  check('bridge ladder L0>=LB, LR>=LP>=LVP, LV>=LVP', mono, 'all 8 cells');

  // every bound is on the correct side of its truth
  let sideOk = true, cells = 0;
  for (const I of ROSTER) { if (I.notSlack) continue; const c = slackOf(I); for (const v of c) { cells++; if (v < 1 - 1e-9) sideOk = false; } }
  check('every slack C >= 1 (bound on the right side)', sideOk, cells + ' cells, I13 and I21 excluded (not bound/truth ratios)');
}
console.log('');

// ============================================================================
// §1. THE INSTRUMENT TABLE
// ============================================================================
console.log('='.repeat(78));
console.log('§1. THE INSTRUMENT TABLE — amp(ln C) per instrument');
console.log('='.repeat(78));
console.log('amp = max ln C - min ln C over the instrument\'s EXACT range.');
console.log('trend: LS slope of ln C on ln(level), with its t-statistic; rho_S is Spearman.');
console.log('sharp = cells with C = 1 exactly.');
console.log('');
console.log('  id     levels  n   amp lnC   sharp  min@       max@       slope   t      rho_S   vs 0.3187');
console.log('  ' + '-'.repeat(100));
const RESULTS = [];
for (const I of ROSTER) {
  const C = slackOf(I), ln = C.map(Math.log), n = C.length;
  const amp = Math.max(...ln) - Math.min(...ln);
  const iMin = ln.indexOf(Math.min(...ln)), iMax = ln.indexOf(Math.max(...ln));
  const sharp = C.filter(v => Math.abs(v - 1) < 1e-9).length;
  const fit = lsFit(I.lev.map(Math.log), ln);
  const rs = spearman(I.lev, ln);
  const verdict = amp > TRUTH_AMP ? 'ABOVE' : (amp === 0 ? 'ZERO' : 'below');
  RESULTS.push({ I, C, ln, amp, sharp, fit, rs, n });
  console.log('  ' + padr(I.id, 6) + pad(I.lev[0] + '..' + I.lev[n - 1], 7) + pad(n, 4) +
    pad(F(amp), 10) + pad(sharp + '/' + n, 8) + '  ' + padr(I.lev[iMin] + ' (' + F(C[iMin], 3) + ')', 11) +
    padr(I.lev[iMax] + ' (' + F(C[iMax], 3) + ')', 11) +
    pad(F(fit.b, 3), 7) + pad(F(fit.t, 2), 7) + pad(F(rs, 3), 8) + '  ' + verdict);
}
console.log('');
console.log('  names and sources:');
for (const I of ROSTER) console.log('    ' + padr(I.id, 6) + padr(I.name, 46) + I.src);
console.log('');
{
  const eligible = RESULTS.filter(r => r.n >= 5);
  const above = eligible.filter(r => r.amp > TRUTH_AMP).length;
  console.log('  P1 SCORED: instruments with n >= 5: ' + eligible.length + '; amp above the truth\'s 0.3187: ' +
    above + ' (' + F(100 * above / eligible.length, 1) + '%) -> P1 ' + (above * 2 > eligible.length ? 'RIGHT' : 'WRONG'));
  const zeros = RESULTS.filter(r => r.amp === 0).map(r => r.I.id);
  console.log('  P3 SCORED: amp exactly 0 at ' + zeros.length + ' instruments: ' + zeros.join(', ') +
    ' -> P3 ' + (zeros.length >= 1 ? 'RIGHT' : 'WRONG'));
  const Lfam = RESULTS.filter(r => r.I.bounds === 'L' && r.I.axis === "fold p'");
  const others = eligible.filter(r => !(r.I.bounds === 'L' && r.I.axis === "fold p'"));
  const mL = Lfam.reduce((s, r) => s + r.amp, 0) / Lfam.length;
  const mO = others.reduce((s, r) => s + r.amp, 0) / others.length;
  console.log('  P2 SCORED: mean amp of the L-ceiling family ' + F(mL) + ' against ' + F(mO) +
    ' for everything else -> P2 ' + (mL > mO ? 'RIGHT' : 'WRONG'));
  const weak = eligible.filter(r => Math.abs(r.fit.t) < 2).length;
  console.log('  P4 SCORED: |t| < 2 at ' + weak + ' of ' + eligible.length + ' instruments -> P4 ' +
    (weak * 2 > eligible.length ? 'RIGHT' : 'WRONG'));
}
console.log('');

// ============================================================================
// §2. DO THE HIGHS AND LOWS CORRELATE WITH ANYTHING CHECKABLE?
// ============================================================================
console.log('='.repeat(78));
console.log('§2. CORRELATES OF THE SLACK — every checkable the corpus already has');
console.log('='.repeat(78));
console.log('Each cell is Pearson r between ln C and the covariate over the instrument\'s');
console.log('own levels. n is small everywhere; |r| is reported without a p-value here');
console.log('because §3 is where significance is decided, under the correct null.');
console.log('');
const COVS = [
  ["ln(level)", (p) => Math.log(p)],
  ["next prime gap p'-p", (p) => nextPrime(p) - p],
  ["p is a lower twin", (p) => (isPrime(p + 2) ? 1 : 0)],
  ["p mod 4 == 1", (p) => (p % 4 === 1 ? 1 : 0)],
  ["p mod 6 == 1", (p) => (p % 6 === 1 ? 1 : 0)],
  ["pi(p) even", (p) => (piOf(p) % 2 === 0 ? 1 : 0)],
  ["frac(mbar_p)", (p) => frac(mbarOf(p))],
  ["theta(p)/p", (p) => thetaOf(p) / p],
  ["the truth's own ln margin", (p) => (G2[p] ? Math.log(nextPrime(p) ** 2 / G2[p]) : NaN)],
  ["record qualifies mod p (a3-10 (S))", (p) => { const g = G2[PRIMES[PRIMES.indexOf(p) - 1]]; return g === undefined ? NaN : ((g % p === 0 || (g - 2) % p === 0 || (g + 2) % p === 0) ? 1 : 0); }],
  ["ln rho of the old tile", (p) => { const RHO = { 11: 1.58, 13: 1.78, 17: 1.83, 19: 1.41, 23: 1.84, 29: 2.39 }; const x = PRIMES[PRIMES.indexOf(p) - 1]; const r = RHO[x] !== undefined ? RHO[x] : RHO[p]; return r === undefined ? NaN : Math.log(r); }],
];
function pearson(a, b) {
  const idx = a.map((v, i) => i).filter(i => Number.isFinite(a[i]) && Number.isFinite(b[i]));
  const n = idx.length; if (n < 3) return NaN;
  const ma = idx.reduce((s, i) => s + a[i], 0) / n, mb = idx.reduce((s, i) => s + b[i], 0) / n;
  let num = 0, da = 0, db = 0;
  for (const i of idx) { num += (a[i] - ma) * (b[i] - mb); da += (a[i] - ma) ** 2; db += (b[i] - mb) ** 2; }
  return (da === 0 || db === 0) ? NaN : num / Math.sqrt(da * db);
}
console.log('  id     ' + COVS.map(c => pad(c[0].slice(0, 9), 10)).join(''));
console.log('  ' + '-'.repeat(6 + 10 * COVS.length));
for (const R of RESULTS) {
  if (R.I.axis === 'depth k' || R.n < 5) continue;
  const row = COVS.map(([, f]) => pearson(R.ln, R.I.lev.map(f)));
  console.log('  ' + padr(R.I.id, 7) + row.map(v => pad(F(v, 3), 10)).join(''));
}
console.log('');
console.log('  legend of covariate columns, in order:');
COVS.forEach((c, i) => console.log('    ' + (i + 1) + '. ' + c[0]));
console.log('');

// ============================================================================
// §3. THE PERMUTATION TEST — the fold-L wave's methodology
// ============================================================================
console.log('='.repeat(78));
console.log('§3. THE DECISION QUESTION — permutation test with family-wise honesty');
console.log('='.repeat(78));
console.log('Method, identical in construction to attack-0c0e-02-level-selection.js §B:');
console.log('  (1) detrend ln C by least squares on ln(level), over exactly the levels');
console.log('      the instrument has, so "select the big levels" is not a rule;');
console.log('  (2) a rule selects a subset; its statistic is the MEAN DETRENDED ln C');
console.log('      with the sign flipped, so a SHARP-selecting rule scores POSITIVE;');
console.log('  (3) the per-rule p is the fraction of ' + 20000 + ' random subsets of the same');
console.log('      size scoring at least as high;');
console.log('  (4) the FAMILY-WISE p is the fraction of permutations whose BEST rule over');
console.log('      the whole family beats the observed best -- the sets are held fixed and');
console.log('      only the column is shuffled, so the rules keep their own sizes;');
console.log('  (5) a second, OUTER family-wise correction over the instruments themselves.');
console.log('A rule that knows nothing has p ~ 0.5. ORACLE rules read the answer and are');
console.log('excluded from the verdict but printed, because they bound the whole space.');
console.log('');
const RULES = [
  ["p' - p >= 4", (p) => nextPrime(p) - p >= 4, false],
  ["p' - p >= 6", (p) => nextPrime(p) - p >= 6, false],
  ['p is a lower twin', (p) => isPrime(p + 2), false],
  ['p = 1 mod 4', (p) => p % 4 === 1, false],
  ['p = 1 mod 6', (p) => p % 6 === 1, false],
  ['pi(p) even  (null control)', (p) => piOf(p) % 2 === 0, false],
  ['frac(mbar_p) above its median', null, false],
  ['theta(p)/p above its median', null, false],
  ['record qualifies mod p  (a3-10 (S))', (p) => { const g = G2[PRIMES[PRIMES.indexOf(p) - 1]]; return g !== undefined && (g % p === 0 || (g - 2) % p === 0 || (g + 2) % p === 0); }, false],
  ['G2(old)/(3p) < 1  (A5 structural cap)', (p) => { const g = G2[PRIMES[PRIMES.indexOf(p) - 1]]; return g !== undefined && g / (3 * p) < 1; }, false],
  ['level in the bottom half  [ORACLE-adjacent]', null, true],
];
const NPERM = 20000;
const PERTEST = [];
for (const R of RESULTS) {
  if (R.n < 5 || R.I.axis === 'depth k') continue;
  const n = R.n, lev = R.I.lev;
  const fit = lsFit(lev.map(Math.log), R.ln);
  const res = fit.res.map(v => -v);                 // sign flip: sharp = positive
  const med = (a) => { const q = a.slice().sort((u, v) => u - v); return q[Math.floor(q.length / 2)]; };
  const fr = lev.map(p => frac(mbarOf(p))), th = lev.map(p => thetaOf(p) / p);
  const preds = {
    'frac(mbar_p) above its median': (p, i) => fr[i] > med(fr),
    'theta(p)/p above its median': (p, i) => th[i] > med(th),
    'level in the bottom half  [ORACLE-adjacent]': (p, i) => i < n / 2,
  };
  const sels = [];
  for (const [name, fn, oracle] of RULES) {
    const sel = [];
    for (let i = 0; i < n; i++) { const ok = fn ? fn(lev[i]) : preds[name](lev[i], i); if (ok) sel.push(i); }
    if (!sel.length || sel.length === n) { sels.push({ name, sel: null, oracle }); continue; }
    sels.push({ name, sel, oracle, gain: sel.reduce((s, i) => s + res[i], 0) / sel.length });
  }
  const live = sels.filter(s => s.sel && !s.oracle);
  // per-rule p and the family-wise best-of statistic, one permutation stream for both
  reseed();
  const ge = new Array(sels.length).fill(0);
  const bestObs = live.length ? Math.max(...live.map(s => s.gain)) : NaN;
  let geFWE = 0;
  const perm = new Array(n);
  for (let t = 0; t < NPERM; t++) {
    for (let i = 0; i < n; i++) perm[i] = res[i];
    for (let i = n - 1; i > 0; i--) { const j = (rnd() * (i + 1)) | 0; const tmp = perm[i]; perm[i] = perm[j]; perm[j] = tmp; }
    let best = -Infinity;
    for (let k = 0; k < sels.length; k++) {
      const s = sels[k]; if (!s.sel) continue;
      const g = s.sel.reduce((a, i) => a + perm[i], 0) / s.sel.length;
      if (g >= s.gain) ge[k]++;
      if (!s.oracle && g > best) best = g;
    }
    if (live.length && best >= bestObs) geFWE++;
  }
  const pFWE = live.length ? geFWE / NPERM : NaN;
  const span = Math.max(...res) - Math.min(...res);
  console.log('  ' + R.I.id + '  ' + R.I.name + '   (n = ' + n + ', residual sd ' + F(fit.sd) +
    ', ORACLE ceiling: best level ' + F(Math.max(...res)) + ' nats sharp of trend, span ' + F(span) + ')');
  if (span === 0) { console.log('      DEGENERATE: zero slack at every level, nothing to select on.'); console.log(''); PERTEST.push({ id: R.I.id, pFWE: NaN, best: NaN, bestRule: 'degenerate' }); continue; }
  console.log('      rule                                        n   gain(nats)   p');
  let bestRule = '', bestGain = -Infinity;
  for (let k = 0; k < sels.length; k++) {
    const s = sels[k];
    if (!s.sel) { console.log('      ' + padr(s.name, 42) + '   (degenerate)'); continue; }
    console.log('      ' + padr(s.name, 42) + pad(s.sel.length, 3) + pad(F(s.gain), 13) + pad(F(ge[k] / NPERM), 9) + (s.oracle ? '   ORACLE' : ''));
    if (!s.oracle && s.gain > bestGain) { bestGain = s.gain; bestRule = s.name; }
  }
  console.log('      BEST non-oracle rule: "' + bestRule + '", gain ' + F(bestGain) +
    ' nats, FAMILY-WISE p = ' + F(pFWE) + (pFWE < 0.05 ? '   *** SURVIVES ***' : '   (does not survive)'));
  console.log('');
  PERTEST.push({ id: R.I.id, name: R.I.name, pFWE, best: bestGain, bestRule, span });
}

// outer family-wise correction over the instruments
{
  const live = PERTEST.filter(r => Number.isFinite(r.pFWE));
  const k = live.length;
  const minP = Math.min(...live.map(r => r.pFWE));
  const winner = live.find(r => r.pFWE === minP);
  const sidak = 1 - Math.pow(1 - minP, k);
  console.log('  OUTER FAMILY-WISE CORRECTION over the ' + k + ' instruments tested:');
  console.log('    smallest per-instrument p_FWE = ' + F(minP) + '  (' + winner.id + ', rule "' + winner.bestRule + '")');
  console.log('    Sidak over ' + k + ' instruments: p = 1-(1-' + F(minP) + ')^' + k + ' = ' + F(sidak));
  console.log('    Bonferroni over ' + k + ' instruments: p = ' + F(Math.min(1, minP * k)));
  console.log('    VERDICT: ' + (sidak < 0.05 ? 'A SIGNATURE SURVIVES' : 'NO SIGNATURE SURVIVES family-wise correction'));
  console.log('    P5 ' + (sidak < 0.05 ? 'WRONG' : 'RIGHT'));
}
console.log('');

// ============================================================================
// §4. THE MECHANISM CHECK — is any sharp-level signature non-empty at scale?
// ============================================================================
console.log('='.repeat(78));
console.log('§4. THE MECHANISM CHECK — a signature is only useful if it stays non-empty');
console.log('='.repeat(78));
console.log('A permutation test on 5 to 8 levels cannot see an asymptotic. So the second,');
console.log('and decisive, filter: for each instrument whose sharp levels have a NAMED');
console.log('mechanism, is the mechanism satisfiable at infinitely many levels?');
console.log('');
{
  // I1 is sharp exactly when the step-3 upper bound equals the truth. The
  // bound is maxsum_{L+1}, so it is sharp whenever L = 1 (bound = maxsum_2,
  // which is also the LOWER bound, so it is forced equal), and at p = 7 by
  // accident. L = 1 means NO gap of T_x is = 0, +-2 (mod p): the qualifying
  // count is 0. a3-10's own miss table prints the qualifying counts.
  const qual = [{ tile: 'T_5', p: 7, q: 2 }, { tile: 'T_11', p: 17, q: 4 }, { tile: 'T_11', p: 19, q: 4 },
  { tile: 'T_13', p: 17, q: 72 }, { tile: 'T_13', p: 19, q: 60 }, { tile: 'T_13', p: 23, q: 20 },
  { tile: 'T_17', p: 29, q: 380 }, { tile: 'T_17', p: 31, q: 380 }, { tile: 'T_17', p: 37, q: 64 },
  { tile: 'T_19', p: 23, q: 11784 }, { tile: 'T_19', p: 29, q: 9452 }, { tile: 'T_19', p: 31, q: 9500 },
  { tile: 'T_23', p: 29, q: 243816 }, { tile: 'T_23', p: 31, q: 248058 }, { tile: 'T_23', p: 37, q: 95896 }];
  console.log('  I1 (maxsum_{L+1}): sharp iff L = 1, i.e. NO gap of T_x is = 0, +-2 (mod p).');
  console.log('  Qualifying-gap counts, cited from a3-10-lower-tightness.js OUTPUT §3 miss table:');
  console.log('    ' + qual.map(r => r.tile + '@' + r.p + ':' + r.q).join('  '));
  console.log('  Expected count is ~3D/p with D = prod_{3<=q<=x}(q-2), so it grows like');
  console.log('  exp(theta(x))/p. Measured last row 248058 at T_23. The signature "L = 1"');
  console.log('  is EMPTY from T_11 onward and the emptiness is monotone in D.');
  console.log('  => I1 has a recognisable signature that no argument can select on,');
  console.log('     because the set it names is finite. [PROVEN-shaped, MEASURED at 15 cells]');
  console.log('');
  console.log('  I9 (Tail-Count M_loose): sharp at 6 of 7 folds; the ONE loss is at q = 29');
  console.log('  and verify-tailcount-transport.md §(c) names its cause exactly -- the');
  console.log('  ALTERNATION constraint, the only dropped condition that has ever cost');
  console.log('  anything. Adding it back (M_alt) makes the instrument exact at 7 of 7,');
  console.log('  i.e. amp(ln C) = 0. The sharp levels are not a subsequence: they are');
  console.log('  EVERY level, and the instrument does not chain (REFUTED.md, "chaining the');
  console.log('  Tail-Count Transport on the tile"). => nothing to select.');
  console.log('');
  console.log('  I15 (greedy oracle): sharp at x = 2..43 and loose at 47..79. That is a');
  console.log('  monotone break, not an oscillation, and REFUTED.md records it as a');
  console.log('  compute-budget/rule break with slope -0.0235 +- 0.007 per level. A');
  console.log('  signature that is an initial segment selects a FINITE set. => nothing.');
  console.log('');
  console.log('  I8 / I10 / I11 (LVP, M_alt, M_full): amp = 0 exactly. THE DEGENERATE CASE.');
  console.log('  A zero-slack instrument has nothing to be sharp-on-a-subsequence WITH:');
  console.log('  its i.o. value is 0, not unbounded. It is worth writing down why this is');
  console.log('  the wrong direction rather than the right one. If C = 1 identically then');
  console.log('  ln(C*T) = ln T, so the i.o. licence on that instrument is worth exactly');
  console.log('  amp(ln T) = ' + F(TRUTH_AMP) + ' nats and not one nat more -- channel 1, already');
  console.log('  priced and closed. An exact instrument transfers the WHOLE difficulty to');
  console.log('  the object: proving the bound is then literally proving the theorem. That');
  console.log('  is verify-tailcount-transport.md\'s "exact simulator rather than a source');
  console.log('  of bounds", and operator-and-pair-count.md before it.');
}
console.log('');

// ============================================================================
// §5. THE PRIZE CEILING — what the whole rule space could be worth
// ============================================================================
console.log('='.repeat(78));
console.log('§5. THE PRIZE, EVEN IF A SIGNATURE EXISTED');
console.log('='.repeat(78));
{
  const need = [6.700, 8.191, 9.637], at = [23, 43, 79];
  const grp = (f) => RESULTS.filter(r => r.n >= 5 && f(r.I)).sort((a, b) => b.amp - a.amp);
  const G = grp(I => I.bounds === 'G2(new)');
  const L = grp(I => I.bounds === 'L');
  const O = grp(I => I.bounds !== 'G2(new)' && I.bounds !== 'L');
  const show = (label, arr) => {
    console.log('  ' + label);
    for (const r of arr) console.log('    ' + padr(r.I.id, 6) + F(r.amp) + '  nats   ' + r.I.name);
  };
  console.log('  (a) instruments that bound G2 DIRECTLY -- the only ones whose slack');
  show('      enters the licence one for one:', G);
  console.log('');
  console.log('  (b) instruments that bound L -- their slack reaches G2 only through');
  show('      the bridge:', L);
  console.log('      and that bridge FLOORS at ~0.183x for ANY maxsum bound whatsoever');
  console.log('      (a3-05-bound-L.md §7; REFUTED.md "the maxsum bridge as a 0c->L');
  console.log('      converter"), so an L-slack of ' + F(L[0].amp) + ' nats does NOT deliver');
  console.log('      ' + F(L[0].amp) + ' nats of G2 slack, and cannot be counted as if it did.');
  console.log('');
  show('  (c) diagnostics that are not bound/truth ratios at all:', O);
  console.log('');
  const topG = G[0].amp, topAll = Math.max(...RESULTS.filter(r => r.n >= 5).map(r => r.amp));
  console.log('  THE HONEST HEADLINE: the largest slack oscillation of any DIRECT G2');
  console.log('  instrument in the corpus is ' + F(topG) + ' nats (' + G[0].I.id + ', ' + G[0].I.name + ').');
  console.log('  It is the exemplar verify-monotone-depth.md already named, and after a');
  console.log('  full survey of ' + RESULTS.length + ' instruments nothing beats it on the G2 axis.');
  console.log('');
  console.log('  Ceilings against the Zone Postulate need, cited from');
  console.log('  attack-0c0e-level-selection.md ((4.2665-2)*ln theta(x)):');
  console.log('    x    need     C-only(G2)  C+T(G2)   loosest-anything + T');
  for (let i = 0; i < need.length; i++) {
    console.log('    ' + pad(at[i], 2) + '   ' + F(need[i]) + '   ' + pad(F(100 * topG / need[i], 1) + '%', 10) +
      pad(F(100 * (topG + TRUTH_AMP) / need[i], 1) + '%', 10) + pad(F(100 * (topAll + TRUTH_AMP) / need[i], 1) + '%', 12));
  }
  console.log('  Even the last column -- an oracle that gets to pick the loosest object in');
  console.log('  the corpus, count its whole oscillation as free, AND add the truth\'s --');
  console.log('  never reaches half the need. And §3 and §4 both say the selection it');
  console.log('  assumes cannot be made.');
}
console.log('');

console.log('='.repeat(78));
console.log(FAILS === 0 ? 'ALL CUSTODY CHECKS PASSED' : FAILS + ' CUSTODY CHECK(S) FAILED');
console.log('='.repeat(78));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-ioslack-survey.js
//   invocation:  node research/attack-ioslack-survey.js
//   code-sha256: e1e3b8d4e582ed891b30fee5c324682650ef49739fcbdf82417692114f7c8780
//   out-sha256:  0d0990292c648d002d66f24854c860c8bdca95b79ac0482267562880983865a2
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.6 s
// ============================================================================
// ==============================================================================
// TODO 0e FIRST MOVE — THE INSTRUMENT-SLACK OSCILLATION SURVEY
// ==============================================================================
// Licence value = amp(ln C) + amp(ln T) at most; amp(ln T) = 0.3187 nats (inf 3.1837 @ x=37, sup 4.3788 @ x=13).
// Every column below is CITED, not recomputed. Sources in §1.
//
// ==============================================================================
// §0. CUSTODY — the cross-file agreements that exist among the cited columns
// ==============================================================================
//   ok    I1 vs gate-multiplies.md §8 step-3 table            5 folds, bound and truth
//   ok    I1 slack vs verify-monotone-depth.md §2 quote       max |diff| = 0.000047
//   ok    true-L column identical across I2..I8               2,1,2,2,2,3,2,4
//   ok    I9..I11 truth column vs exact-g2-ladder.js          42,66,108,150,204,258,348
//   ok    Theorem B >= forced ceiling at all 8 diagonal cells strict at 1 of 8
//   ok    bridge ladder L0>=LB, LR>=LP>=LVP, LV>=LVP          all 8 cells
//   ok    every slack C >= 1 (bound on the right side)        159 cells, I13 and I21 excluded (not bound/truth ratios)
//
// ==============================================================================
// §1. THE INSTRUMENT TABLE — amp(ln C) per instrument
// ==============================================================================
// amp = max ln C - min ln C over the instrument's EXACT range.
// trend: LS slope of ln C on ln(level), with its t-statistic; rho_S is Spearman.
// sharp = cells with C = 1 exactly.
//
//   id     levels  n   amp lnC   sharp  min@       max@       slope   t      rho_S   vs 0.3187
//   ----------------------------------------------------------------------------------------------------
//   I1      7..29   7    0.3747     2/7  7 (1.000)  13 (1.455)   0.085   0.72   0.378  ABOVE
//   I2      7..31   8    0.9163     2/8  7 (1.000)  29 (2.500)   0.342   1.43   0.393  ABOVE
//   I3      7..31   8    1.2993     0/8  7 (1.500)  19 (5.500)   0.594   2.22   0.619  ABOVE
//   I4      7..31   8    0.9163     3/8  7 (1.000)  29 (2.500)   0.508   2.45   0.700  ABOVE
//   I5      7..31   8    0.6286     0/8  23 (1.333) 19 (2.500)   0.055   0.28   0.012  ABOVE
//   I6      7..31   8    0.6931     5/8  7 (1.000)  11 (2.000)  -0.018  -0.08  -0.055  ABOVE
//   I7      7..31   8    0.4055     6/8  11 (1.000) 7 (1.500)   -0.077  -0.52  -0.126  ABOVE
//   I8      7..31   8    0.0000     8/8  7 (1.000)  7 (1.000)    0.000    n/a     n/a  ZERO
//   I9     11..31   7    0.0455     6/7  11 (1.000) 29 (1.047)   0.021   1.18   0.408  below
//   I10    11..31   7    0.0000     7/7  11 (1.000) 11 (1.000)   0.000    n/a     n/a  ZERO
//   I11    11..31   7    0.0000     7/7  11 (1.000) 11 (1.000)   0.000    n/a     n/a  ZERO
//   I12      1..6   6    1.1827     1/6  6 (1.000)  1 (3.263)   -0.679  -6.03  -1.000  ABOVE
//   I13    13..31   6    0.5445     0/6  13 (0.355) 31 (0.612)   0.431   2.31   0.771  ABOVE
//   I14a   13..29   5    0.3066     0/5  13 (1.429) 29 (1.941)   0.291   1.75   0.600  below
//   I14b   13..29   5    0.3302     0/5  17 (1.154) 23 (1.605)   0.439   2.48   0.800  ABOVE
//   I14c   13..29   5    0.3629     1/5  13 (1.000) 19 (1.438)   0.228   1.06   0.600  ABOVE
//   I15     2..79  22    0.0620   15/22  2 (1.000)  71 (1.064)   0.009   2.71   0.808  below
//   I16    11..79   8    0.3524     0/8  11 (1.406) 19 (2.000)  -0.048  -0.55  -0.048  ABOVE
//   I17     7..29   7    0.2231     3/7  11 (1.000) 7 (1.250)   -0.050  -0.68  -0.074  below
//   I18    11..29   6    0.5277     0/6  19 (1.410) 29 (2.390)   0.302   1.54   0.657  ABOVE
//   I19    13..29   5    0.1179     0/5  29 (1.040) 17 (1.171)  -0.116  -1.72  -0.700  below
//   I20    11..29   6    0.2231     1/6  13 (1.000) 11 (1.250)  -0.109  -1.16  -0.371  below
//   I21    11..29   6    2.6355     0/6  11 (36.600)19 (510.600)  0.255   0.19   0.029  ABOVE
//
//   names and sources:
//     I1    maxsum_{L+1} step-3 (the exemplar)            a3-10-lower-tightness.js OUTPUT §1 custody table; gate-multiplies.md §8
//     I2    A5 Theorem B ceiling on L                     a3-05-bound-L.md §5 reading 5; attack-foldL-01-census.md §2; attack-foldL-02-bridge.md §2
//     I3    A5 condition-(i) ceiling (= L0)               a3-05-bound-L.md §5 reading 5; attack-foldL-02-bridge.md §2 (L0)
//     I4    forced ceiling (channel-compatible census)    attack-foldL-01-census.md §2 ladder diagonal
//     I5    LR = 1 + longest run of gaps >= theta         attack-foldL-02-bridge.md §2 (a3-05 §8)
//     I6    LP = LR + the 6p pair floor                   attack-foldL-02-bridge.md §2, §4
//     I7    LV = value-qualifying run                     attack-foldL-02-bridge.md §2, §4
//     I8    LVP = LV + the 6p pair floor                  attack-foldL-02-bridge.md §2, §4 ("slack zero at all eight cells")
//     I9    Tail-Count certificate M_loose                verify-tailcount-transport.md §(c) table; attack-foldL-03-transport.md §3
//     I10   Tail-Count certificate M_alt                  verify-tailcount-transport.md §(c) table
//     I11   Tail-Count certificate M_full                 verify-tailcount-transport.md §(c) ("identically the truth, all seven folds")
//     I12   depth-k counting ceiling at block 1 (T_5)     attack-ab-coupling.md §4 (truth = exact search, 19 slots)
//     I13   vector-sieve certificate need nP/z^2          theta-selfconsistent.md §2 (exact complete-period rows only)
//     I14a  threshold-m certificate H_cert/maxsum_m, m=1  attack-foldL-05-maxsum-direct.md §4 R1 table
//     I14b  threshold-m certificate H_cert/maxsum_m, m=4  attack-foldL-05-maxsum-direct.md §4 R1 table
//     I14c  threshold-m certificate H_cert/maxsum_m, m=8  attack-foldL-05-maxsum-direct.md §4 R1 table
//     I15   greedy oracle (LOWER instrument)              greedy-oracle-validation.md §3 budget-A table, ratio column inverted
//     I16   bridge floor / u-frame need 0.31p/ln p        attack-foldL-05-maxsum-direct.md §3, the eight EXACT rows only
//     I17   maxsum_2 step-3 LOWER bound on G2(new)        a3-10-lower-tightness.js OUTPUT §1 custody table
//     I18   rho = overshoot coefficient, max over m<=8    gate-multiplies.md §8 tail ("max_{m<=8} rho(m) at T_11..T_29")
//     I19   centered maxsum C_M per-fold multiplier over G2 sattack-foldL-03-transport.md §3 (C_1 multipliers / G2 multipliers)
//     I20   alphabet |A| (LOWER instrument)               attack-foldL-03-transport.md §3 (|A|/(G2/6), inverted)
//     I21   Sum exp(lambda g): index cost Z_2/Z_1         attack-foldL-03-transport.md §3 ("no stable value")
//
//   P1 SCORED: instruments with n >= 5: 23; amp above the truth's 0.3187: 14 (60.9%) -> P1 RIGHT
//   P3 SCORED: amp exactly 0 at 3 instruments: I8, I10, I11 -> P3 RIGHT
//   P2 SCORED: mean amp of the L-ceiling family 0.6942 against 0.4556 for everything else -> P2 RIGHT
//   P4 SCORED: |t| < 2 at 14 of 23 instruments -> P4 RIGHT
//
// ==============================================================================
// §2. CORRELATES OF THE SLACK — every checkable the corpus already has
// ==============================================================================
// Each cell is Pearson r between ln C and the covariate over the instrument's
// own levels. n is small everywhere; |r| is reported without a p-value here
// because §3 is where significance is decided, under the correct null.
//
//   id      ln(level) next prim p is a lo p mod 4 = p mod 6 = pi(p) eve frac(mbar theta(p)/ the truth record qu ln rho of
//   --------------------------------------------------------------------------------------------------------------------
//   I1          0.307    -0.001    -0.071     0.804     0.144     0.164     0.410     0.308     0.034    -0.100     0.082
//   I2          0.504    -0.572     0.738     0.182    -0.580    -0.183     0.416    -0.136    -0.716    -0.206     0.256
//   I3          0.671     0.019    -0.067     0.359     0.142     0.398     0.278     0.556    -0.232    -0.617     0.296
//   I4          0.707    -0.255     0.369     0.369    -0.293     0.082     0.540     0.368    -0.795    -0.047     0.421
//   I5          0.113    -0.506     0.272     0.272     0.064     0.616     0.096    -0.104    -0.189    -0.462     0.056
//   I6         -0.033    -0.568     0.538    -0.160    -0.338     0.057    -0.075    -0.475    -0.161    -0.423    -0.115
//   I7         -0.209    -0.277     0.149     0.149     0.000     0.577    -0.421    -0.262     0.006     0.333     0.130
//   I8            n/a       n/a       n/a       n/a       n/a       n/a       n/a       n/a       n/a       n/a       n/a
//   I9          0.468    -0.420     0.471     0.471    -0.354     0.471    -0.263    -0.148    -0.156    -0.167     0.130
//   I10           n/a       n/a       n/a       n/a       n/a       n/a       n/a       n/a       n/a       n/a       n/a
//   I11           n/a       n/a       n/a       n/a       n/a       n/a       n/a       n/a       n/a       n/a       n/a
//   I13         0.757     0.461    -0.241    -0.797     0.183    -0.353    -0.036     0.712    -0.315    -0.232     0.636
//   I14a        0.711    -0.491     0.675    -0.082    -0.599    -0.231     0.382    -0.099    -0.850     0.376     0.590
//   I14b        0.820     0.397    -0.190    -0.671    -0.226     0.095    -0.531     0.604     0.030    -0.626    -0.105
//   I14c        0.522     0.203    -0.112    -0.781    -0.086    -0.112     0.207     0.681    -0.546    -0.105     0.231
//   I15         0.518    -0.018     0.011    -0.256     0.155     0.058     0.332     0.352     0.075    -0.215       n/a
//   I16        -0.218     0.539    -0.638     0.202     0.522     0.319    -0.134     0.278    -0.225    -0.107    -0.037
//   I17        -0.289     0.076    -0.045    -0.045    -0.017     0.065    -0.174    -0.087    -0.108     0.778     0.092
//   I18         0.609    -0.233     0.415     0.660    -0.511     0.124    -0.297    -0.114     0.042     0.075     0.106
//   I19        -0.705    -0.295     0.040     0.125     0.370    -0.146     0.919    -0.098    -0.513     0.681     0.362
//   I20        -0.501    -0.320     0.486    -0.562    -0.525    -0.740    -0.082    -0.671    -0.057     0.088    -0.242
//   I21         0.093     0.332    -0.588     0.221     0.723     0.437     0.653     0.721    -0.307     0.283     0.315
//
//   legend of covariate columns, in order:
//     1. ln(level)
//     2. next prime gap p'-p
//     3. p is a lower twin
//     4. p mod 4 == 1
//     5. p mod 6 == 1
//     6. pi(p) even
//     7. frac(mbar_p)
//     8. theta(p)/p
//     9. the truth's own ln margin
//     10. record qualifies mod p (a3-10 (S))
//     11. ln rho of the old tile
//
// ==============================================================================
// §3. THE DECISION QUESTION — permutation test with family-wise honesty
// ==============================================================================
// Method, identical in construction to attack-0c0e-02-level-selection.js §B:
//   (1) detrend ln C by least squares on ln(level), over exactly the levels
//       the instrument has, so "select the big levels" is not a rule;
//   (2) a rule selects a subset; its statistic is the MEAN DETRENDED ln C
//       with the sign flipped, so a SHARP-selecting rule scores POSITIVE;
//   (3) the per-rule p is the fraction of 20000 random subsets of the same
//       size scoring at least as high;
//   (4) the FAMILY-WISE p is the fraction of permutations whose BEST rule over
//       the whole family beats the observed best -- the sets are held fixed and
//       only the column is shuffled, so the rules keep their own sizes;
//   (5) a second, OUTER family-wise correction over the instruments themselves.
// A rule that knows nothing has p ~ 0.5. ORACLE rules read the answer and are
// excluded from the verdict but printed, because they bound the whole space.
//
//   I1  maxsum_{L+1} step-3 (the exemplar)   (n = 7, residual sd 0.1177, ORACLE ceiling: best level 0.1128 nats sharp of trend, span 0.3604)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                 4      -0.0156   0.6085
//       p' - p >= 6                                 1       0.0646   0.4309
//       p is a lower twin                           3       0.0208   0.4010
//       p = 1 mod 4                                 3      -0.0993   1.0000
//       p = 1 mod 6                                 3      -0.0424   0.7261
//       pi(p) even  (null control)                  4      -0.0206   0.6685
//       frac(mbar_p) above its median               3      -0.0988   0.9697
//       theta(p)/p above its median                 3      -0.0456   0.7944
//       record qualifies mod p  (a3-10 (S))         2      -0.0104   0.5804
//       G2(old)/(3p) < 1  (A5 structural cap)       2       0.0935   0.0464
//       level in the bottom half  [ORACLE-adjacent]  4      -0.0389   0.7438   ORACLE
//       BEST non-oracle rule: "G2(old)/(3p) < 1  (A5 structural cap)", gain 0.0935 nats, FAMILY-WISE p = 0.2423   (does not survive)
//
//   I2  A5 Theorem B ceiling on L   (n = 8, residual sd 0.2777, ORACLE ceiling: best level 0.3712 nats sharp of trend, span 0.7503)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                 5       0.1760   0.0176
//       p' - p >= 6                                 2       0.2707   0.1062
//       p is a lower twin                           3      -0.2933   1.0000
//       p = 1 mod 4                                 3      -0.0433   0.5608
//       p = 1 mod 6                                 4       0.1504   0.0847
//       pi(p) even  (null control)                  4       0.0170   0.4006
//       frac(mbar_p) above its median               3      -0.0171   0.5185
//       theta(p)/p above its median                 3       0.1164   0.1942
//       record qualifies mod p  (a3-10 (S))         2      -0.0353   0.6424
//       G2(old)/(3p) < 1  (A5 structural cap)       2      -0.1097   0.7804
//       level in the bottom half  [ORACLE-adjacent]  4      -0.0196   0.6300   ORACLE
//       BEST non-oracle rule: "p' - p >= 6", gain 0.2707 nats, FAMILY-WISE p = 0.3599   (does not survive)
//
//   I3  A5 condition-(i) ceiling (= L0)   (n = 8, residual sd 0.3112, ORACLE ceiling: best level 0.3111 nats sharp of trend, span 0.8373)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                 5      -0.0355   0.6767
//       p' - p >= 6                                 2       0.3008   0.0353
//       p is a lower twin                           3       0.0591   0.3409
//       p = 1 mod 4                                 3      -0.1389   0.7988
//       p = 1 mod 6                                 4      -0.1221   0.8700
//       pi(p) even  (null control)                  4      -0.2397   0.9860
//       frac(mbar_p) above its median               3      -0.2543   0.9476
//       theta(p)/p above its median                 3       0.0251   0.3945
//       record qualifies mod p  (a3-10 (S))         2       0.1883   0.2906
//       G2(old)/(3p) < 1  (A5 structural cap)       2       0.1707   0.3635
//       level in the bottom half  [ORACLE-adjacent]  4       0.0261   0.4880   ORACLE
//       BEST non-oracle rule: "p' - p >= 6", gain 0.3008 nats, FAMILY-WISE p = 0.1082   (does not survive)
//
//   I4  forced ceiling (channel-compatible census)   (n = 8, residual sd 0.2404, ORACLE ceiling: best level 0.2767 nats sharp of trend, span 0.5927)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                 5       0.0856   0.0851
//       p' - p >= 6                                 2       0.2598   0.0353
//       p is a lower twin                           3      -0.1426   0.9276
//       p = 1 mod 4                                 3      -0.1143   0.8767
//       p = 1 mod 6                                 4       0.0462   0.2708
//       pi(p) even  (null control)                  4      -0.0899   0.7998
//       frac(mbar_p) above its median               3      -0.1115   0.8383
//       theta(p)/p above its median                 3       0.0867   0.1944
//       record qualifies mod p  (a3-10 (S))         2      -0.1946   0.8974
//       G2(old)/(3p) < 1  (A5 structural cap)       2       0.0415   0.3622
//       level in the bottom half  [ORACLE-adjacent]  4       0.0020   0.5050   ORACLE
//       BEST non-oracle rule: "p' - p >= 6", gain 0.2598 nats, FAMILY-WISE p = 0.1082   (does not survive)
//
//   I5  LR = 1 + longest run of gaps >= theta   (n = 8, residual sd 0.2297, ORACLE ceiling: best level 0.3197 nats sharp of trend, span 0.6392)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                 5       0.0475   0.2630
//       p' - p >= 6                                 2       0.2691   0.0353
//       p is a lower twin                           3      -0.0791   0.7526
//       p = 1 mod 4                                 3      -0.0761   0.7300
//       p = 1 mod 6                                 4      -0.0206   0.6131
//       pi(p) even  (null control)                  4      -0.1492   0.9722
//       frac(mbar_p) above its median               3      -0.0839   0.7679
//       theta(p)/p above its median                 3       0.0729   0.2847
//       record qualifies mod p  (a3-10 (S))         2       0.1607   0.2176
//       G2(old)/(3p) < 1  (A5 structural cap)       2       0.0048   0.5368
//       level in the bottom half  [ORACLE-adjacent]  4       0.0194   0.4193   ORACLE
//       BEST non-oracle rule: "p' - p >= 6", gain 0.2691 nats, FAMILY-WISE p = 0.1082   (does not survive)
//
//   I6  LP = LR + the 6p pair floor   (n = 8, residual sd 0.2564, ORACLE ceiling: best level 0.2037 nats sharp of trend, span 0.7012)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                 5       0.1073   0.0874
//       p' - p >= 6                                 2       0.1799   0.3558
//       p is a lower twin                           3      -0.1789   0.9280
//       p = 1 mod 4                                 3       0.0512   0.3774
//       p = 1 mod 6                                 4       0.0885   0.1410
//       pi(p) even  (null control)                  4      -0.0125   0.5133
//       frac(mbar_p) above its median               3       0.0537   0.3048
//       theta(p)/p above its median                 3       0.0467   0.4979
//       record qualifies mod p  (a3-10 (S))         2       0.1958   0.0716
//       G2(old)/(3p) < 1  (A5 structural cap)       2      -0.1469   0.7441
//       level in the bottom half  [ORACLE-adjacent]  4       0.0217   0.3670   ORACLE
//       BEST non-oracle rule: "record qualifies mod p  (a3-10 (S))", gain 0.1958 nats, FAMILY-WISE p = 0.2044   (does not survive)
//
//   I7  LV = value-qualifying run   (n = 8, residual sd 0.1717, ORACLE ceiling: best level 0.1346 nats sharp of trend, span 0.4803)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                 5       0.0220   0.3512
//       p' - p >= 6                                 2       0.0661   0.5356
//       p is a lower twin                           3      -0.0367   0.6649
//       p = 1 mod 4                                 3      -0.0410   0.6947
//       p = 1 mod 6                                 4       0.0082   0.4251
//       pi(p) even  (null control)                  4      -0.0919   0.8516
//       frac(mbar_p) above its median               3       0.1050   0.0892
//       theta(p)/p above its median                 3       0.0748   0.3543
//       record qualifies mod p  (a3-10 (S))         2      -0.0675   0.6483
//       G2(old)/(3p) < 1  (A5 structural cap)       2      -0.0507   0.5748
//       level in the bottom half  [ORACLE-adjacent]  4       0.0303   0.2299   ORACLE
//       BEST non-oracle rule: "frac(mbar_p) above its median", gain 0.1050 nats, FAMILY-WISE p = 0.7641   (does not survive)
//
//   I8  LVP = LV + the 6p pair floor   (n = 8, residual sd 0.0000, ORACLE ceiling: best level 0.0000 nats sharp of trend, span 0.0000)
//       DEGENERATE: zero slack at every level, nothing to select on.
//
//   I9  Tail-Count certificate M_loose   (n = 7, residual sd 0.0141, ORACLE ceiling: best level 0.0164 nats sharp of trend, span 0.0468)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                 4       0.0079   0.0588
//       p' - p >= 6                                 2       0.0133   0.0464
//       p is a lower twin                           3      -0.0105   0.9704
//       p = 1 mod 4                                 3      -0.0093   0.9165
//       p = 1 mod 6                                 3       0.0071   0.1729
//       pi(p) even  (null control)                  3      -0.0086   0.8855
//       frac(mbar_p) above its median               3       0.0029   0.4644
//       theta(p)/p above its median                 3       0.0110   0.0277
//       record qualifies mod p  (a3-10 (S))         1       0.0040   0.5773
//       G2(old)/(3p) < 1  (A5 structural cap)       1      -0.0050   0.8557
//       level in the bottom half  [ORACLE-adjacent]  4       0.0009   0.4320   ORACLE
//       BEST non-oracle rule: "p' - p >= 6", gain 0.0133 nats, FAMILY-WISE p = 0.3258   (does not survive)
//
//   I10  Tail-Count certificate M_alt   (n = 7, residual sd 0.0000, ORACLE ceiling: best level 0.0000 nats sharp of trend, span 0.0000)
//       DEGENERATE: zero slack at every level, nothing to select on.
//
//   I11  Tail-Count certificate M_full   (n = 7, residual sd 0.0000, ORACLE ceiling: best level 0.0000 nats sharp of trend, span 0.0000)
//       DEGENERATE: zero slack at every level, nothing to select on.
//
//   I13  vector-sieve certificate need nP/z^2   (n = 6, residual sd 0.1127, ORACLE ceiling: best level 0.1661 nats sharp of trend, span 0.3502)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                 4      -0.0409   0.8649
//       p' - p >= 6                                 2      -0.0334   0.6664
//       p is a lower twin                           2       0.0818   0.1991
//       p = 1 mod 4                                 3       0.0836   0.0993
//       p = 1 mod 6                                 3      -0.0598   0.8992
//       pi(p) even  (null control)                  3       0.0231   0.3962
//       frac(mbar_p) above its median               2      -0.0933   0.9333
//       theta(p)/p above its median                 2      -0.1333   1.0000
//       record qualifies mod p  (a3-10 (S))         1      -0.0025   0.6675
//       G2(old)/(3p) < 1  (A5 structural cap)        (degenerate)
//       level in the bottom half  [ORACLE-adjacent]  3      -0.0331   0.7490   ORACLE
//       BEST non-oracle rule: "p = 1 mod 4", gain 0.0836 nats, FAMILY-WISE p = 0.7496   (does not survive)
//
//   I14a  threshold-m certificate H_cert/maxsum_m, m=1   (n = 5, residual sd 0.0782, ORACLE ceiling: best level 0.0885 nats sharp of trend, span 0.2117)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                 3       0.0358   0.1956
//       p' - p >= 6                                 1       0.0692   0.3998
//       p is a lower twin                           2      -0.0537   0.9034
//       p = 1 mod 4                                 3      -0.0063   0.6003
//       p = 1 mod 6                                 2       0.0191   0.3959
//       pi(p) even  (null control)                  3       0.0180   0.3012
//       frac(mbar_p) above its median               2      -0.0868   1.0000
//       theta(p)/p above its median                 2       0.0095   0.4982
//       record qualifies mod p  (a3-10 (S))         1      -0.1232   1.0000
//       G2(old)/(3p) < 1  (A5 structural cap)        (degenerate)
//       level in the bottom half  [ORACLE-adjacent]  3      -0.0283   0.7943   ORACLE
//       BEST non-oracle rule: "p' - p >= 6", gain 0.0692 nats, FAMILY-WISE p = 0.7988   (does not survive)
//
//   I14b  threshold-m certificate H_cert/maxsum_m, m=4   (n = 5, residual sd 0.0832, ORACLE ceiling: best level 0.1224 nats sharp of trend, span 0.2237)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                 3      -0.0610   1.0000
//       p' - p >= 6                                 1      -0.0752   0.8013
//       p is a lower twin                           2       0.0914   0.0990
//       p = 1 mod 4                                 3       0.0588   0.0985
//       p = 1 mod 6                                 2      -0.0538   0.8993
//       pi(p) even  (null control)                  3      -0.0157   0.6986
//       frac(mbar_p) above its median               2       0.0106   0.4995
//       theta(p)/p above its median                 2      -0.0882   1.0000
//       record qualifies mod p  (a3-10 (S))         1       0.1224   0.2009
//       G2(old)/(3p) < 1  (A5 structural cap)        (degenerate)
//       level in the bottom half  [ORACLE-adjacent]  3       0.0049   0.4991   ORACLE
//       BEST non-oracle rule: "record qualifies mod p  (a3-10 (S))", gain 0.1224 nats, FAMILY-WISE p = 0.4038   (does not survive)
//
//   I14c  threshold-m certificate H_cert/maxsum_m, m=8   (n = 5, residual sd 0.1010, ORACLE ceiling: best level 0.1018 nats sharp of trend, span 0.2764)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                 3      -0.0308   0.8004
//       p' - p >= 6                                 1      -0.0195   0.8013
//       p is a lower twin                           2       0.0462   0.2987
//       p = 1 mod 4                                 3       0.0647   0.0985
//       p = 1 mod 6                                 2      -0.0364   0.6966
//       pi(p) even  (null control)                  3       0.0086   0.4987
//       frac(mbar_p) above its median               2      -0.0904   0.8992
//       theta(p)/p above its median                 2      -0.0971   1.0000
//       record qualifies mod p  (a3-10 (S))         1      -0.0062   0.5990
//       G2(old)/(3p) < 1  (A5 structural cap)        (degenerate)
//       level in the bottom half  [ORACLE-adjacent]  3      -0.0263   0.5965   ORACLE
//       BEST non-oracle rule: "p = 1 mod 4", gain 0.0647 nats, FAMILY-WISE p = 0.9014   (does not survive)
//
//   I15  greedy oracle (LOWER instrument)   (n = 22, residual sd 0.0151, ORACLE ceiling: best level 0.0158 nats sharp of trend, span 0.0594)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                13       0.0026   0.1861
//       p' - p >= 6                                 6       0.0082   0.0519
//       p is a lower twin                           8      -0.0026   0.7215
//       p = 1 mod 4                                 9       0.0067   0.0377
//       p = 1 mod 6                                10      -0.0001   0.5153
//       pi(p) even  (null control)                 11      -0.0003   0.5379
//       frac(mbar_p) above its median              10      -0.0035   0.8213
//       theta(p)/p above its median                10      -0.0033   0.8059
//       record qualifies mod p  (a3-10 (S))         3      -0.0017   0.6223
//       G2(old)/(3p) < 1  (A5 structural cap)       4      -0.0034   0.7027
//       level in the bottom half  [ORACLE-adjacent] 11       0.0018   0.3018   ORACLE
//       BEST non-oracle rule: "p' - p >= 6", gain 0.0082 nats, FAMILY-WISE p = 0.3194   (does not survive)
//
//   I16  bridge floor / u-frame need 0.31p/ln p   (n = 8, residual sd 0.1271, ORACLE ceiling: best level 0.2104 nats sharp of trend, span 0.3786)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                 5      -0.0726   0.9641
//       p' - p >= 6                                 1      -0.0490   0.6180
//       p is a lower twin                           3       0.1210   0.0525
//       p = 1 mod 4                                 4      -0.0235   0.7010
//       p = 1 mod 6                                 4      -0.0785   0.9584
//       pi(p) even  (null control)                  5      -0.0427   0.8946
//       frac(mbar_p) above its median               3      -0.0051   0.5386
//       theta(p)/p above its median                 3      -0.0388   0.7106
//       record qualifies mod p  (a3-10 (S))         1       0.0521   0.5019
//       G2(old)/(3p) < 1  (A5 structural cap)       1       0.2104   0.1249
//       level in the bottom half  [ORACLE-adjacent]  4      -0.0023   0.5484   ORACLE
//       BEST non-oracle rule: "G2(old)/(3p) < 1  (A5 structural cap)", gain 0.2104 nats, FAMILY-WISE p = 0.3726   (does not survive)
//
//   I17  maxsum_2 step-3 LOWER bound on G2(new)   (n = 7, residual sd 0.0737, ORACLE ceiling: best level 0.0931 nats sharp of trend, span 0.2005)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                 4       0.0017   0.5064
//       p' - p >= 6                                 1      -0.0363   0.5740
//       p is a lower twin                           3      -0.0022   0.5213
//       p = 1 mod 4                                 3      -0.0050   0.5455
//       p = 1 mod 6                                 3       0.0143   0.3664
//       pi(p) even  (null control)                  4      -0.0026   0.6255
//       frac(mbar_p) above its median               3       0.0346   0.2612
//       theta(p)/p above its median                 3       0.0380   0.1716
//       record qualifies mod p  (a3-10 (S))         2      -0.0770   0.9529
//       G2(old)/(3p) < 1  (A5 structural cap)       2      -0.0072   0.6179
//       level in the bottom half  [ORACLE-adjacent]  4       0.0060   0.4220   ORACLE
//       BEST non-oracle rule: "theta(p)/p above its median", gain 0.0380 nats, FAMILY-WISE p = 0.9326   (does not survive)
//
//   I18  rho = overshoot coefficient, max over m<=8   (n = 6, residual sd 0.1284, ORACLE ceiling: best level 0.2549 nats sharp of trend, span 0.4001)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                 3       0.0695   0.1497
//       p' - p >= 6                                 1       0.0463   0.3340
//       p is a lower twin                           3      -0.0695   0.8981
//       p = 1 mod 4                                 3      -0.0924   1.0000
//       p = 1 mod 6                                 2       0.0811   0.2707
//       pi(p) even  (null control)                  3       0.0056   0.5050
//       frac(mbar_p) above its median               2       0.1077   0.2036
//       theta(p)/p above its median                 2       0.1506   0.0650
//       record qualifies mod p  (a3-10 (S))         1      -0.0394   0.6686
//       G2(old)/(3p) < 1  (A5 structural cap)       1      -0.0239   0.4938
//       level in the bottom half  [ORACLE-adjacent]  3      -0.0520   0.7982   ORACLE
//       BEST non-oracle rule: "theta(p)/p above its median", gain 0.1506 nats, FAMILY-WISE p = 0.6291   (does not survive)
//
//   I19  centered maxsum C_M per-fold multiplier over G2 s   (n = 5, residual sd 0.0318, ORACLE ceiling: best level 0.0378 nats sharp of trend, span 0.0831)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                 3       0.0117   0.1956
//       p' - p >= 6                                 1       0.0258   0.3998
//       p is a lower twin                           2      -0.0175   0.9034
//       p = 1 mod 4                                 3       0.0009   0.6003
//       p = 1 mod 6                                 2       0.0046   0.3959
//       pi(p) even  (null control)                  3       0.0065   0.3012
//       frac(mbar_p) above its median               2      -0.0369   1.0000
//       theta(p)/p above its median                 2      -0.0014   0.4982
//       record qualifies mod p  (a3-10 (S))         1      -0.0453   1.0000
//       G2(old)/(3p) < 1  (A5 structural cap)        (degenerate)
//       level in the bottom half  [ORACLE-adjacent]  3      -0.0120   0.7943   ORACLE
//       BEST non-oracle rule: "p' - p >= 6", gain 0.0258 nats, FAMILY-WISE p = 0.7988   (does not survive)
//
//   I20  alphabet |A| (LOWER instrument)   (n = 6, residual sd 0.0614, ORACLE ceiling: best level 0.1151 nats sharp of trend, span 0.2050)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                 3       0.0337   0.1653
//       p' - p >= 6                                 1      -0.0303   0.8340
//       p is a lower twin                           3      -0.0337   0.8510
//       p = 1 mod 4                                 3       0.0347   0.1446
//       p = 1 mod 6                                 2       0.0657   0.0692
//       pi(p) even  (null control)                  3       0.0432   0.0174
//       frac(mbar_p) above its median               2       0.0034   0.4682
//       theta(p)/p above its median                 2      -0.0071   0.6024
//       record qualifies mod p  (a3-10 (S))         1      -0.0095   0.6640
//       G2(old)/(3p) < 1  (A5 structural cap)       1      -0.0899   1.0000
//       level in the bottom half  [ORACLE-adjacent]  3       0.0053   0.4491   ORACLE
//       BEST non-oracle rule: "p = 1 mod 6", gain 0.0657 nats, FAMILY-WISE p = 0.6369   (does not survive)
//
//   I21  Sum exp(lambda g): index cost Z_2/Z_1   (n = 6, residual sd 0.8925, ORACLE ceiling: best level 1.3674 nats sharp of trend, span 2.4962)
//       rule                                        n   gain(nats)   p
//       p' - p >= 4                                 3      -0.5252   0.9476
//       p' - p >= 6                                 1       0.3184   0.4990
//       p is a lower twin                           3       0.5252   0.1001
//       p = 1 mod 4                                 3      -0.1857   0.7050
//       p = 1 mod 6                                 2      -0.9470   1.0000
//       pi(p) even  (null control)                  3      -0.3696   0.8478
//       frac(mbar_p) above its median               2      -0.8528   0.9323
//       theta(p)/p above its median                 2      -0.4052   0.7973
//       record qualifies mod p  (a3-10 (S))         1      -0.5769   0.6680
//       G2(old)/(3p) < 1  (A5 structural cap)       1       1.3674   0.1648
//       level in the bottom half  [ORACLE-adjacent]  3       0.0084   0.5040   ORACLE
//       BEST non-oracle rule: "G2(old)/(3p) < 1  (A5 structural cap)", gain 1.3674 nats, FAMILY-WISE p = 0.4988   (does not survive)
//
//   OUTER FAMILY-WISE CORRECTION over the 19 instruments tested:
//     smallest per-instrument p_FWE = 0.1082  (I3, rule "p' - p >= 6")
//     Sidak over 19 instruments: p = 1-(1-0.1082)^19 = 0.8865
//     Bonferroni over 19 instruments: p = 1.0000
//     VERDICT: NO SIGNATURE SURVIVES family-wise correction
//     P5 RIGHT
//
// ==============================================================================
// §4. THE MECHANISM CHECK — a signature is only useful if it stays non-empty
// ==============================================================================
// A permutation test on 5 to 8 levels cannot see an asymptotic. So the second,
// and decisive, filter: for each instrument whose sharp levels have a NAMED
// mechanism, is the mechanism satisfiable at infinitely many levels?
//
//   I1 (maxsum_{L+1}): sharp iff L = 1, i.e. NO gap of T_x is = 0, +-2 (mod p).
//   Qualifying-gap counts, cited from a3-10-lower-tightness.js OUTPUT §3 miss table:
//     T_5@7:2  T_11@17:4  T_11@19:4  T_13@17:72  T_13@19:60  T_13@23:20  T_17@29:380  T_17@31:380  T_17@37:64  T_19@23:11784  T_19@29:9452  T_19@31:9500  T_23@29:243816  T_23@31:248058  T_23@37:95896
//   Expected count is ~3D/p with D = prod_{3<=q<=x}(q-2), so it grows like
//   exp(theta(x))/p. Measured last row 248058 at T_23. The signature "L = 1"
//   is EMPTY from T_11 onward and the emptiness is monotone in D.
//   => I1 has a recognisable signature that no argument can select on,
//      because the set it names is finite. [PROVEN-shaped, MEASURED at 15 cells]
//
//   I9 (Tail-Count M_loose): sharp at 6 of 7 folds; the ONE loss is at q = 29
//   and verify-tailcount-transport.md §(c) names its cause exactly -- the
//   ALTERNATION constraint, the only dropped condition that has ever cost
//   anything. Adding it back (M_alt) makes the instrument exact at 7 of 7,
//   i.e. amp(ln C) = 0. The sharp levels are not a subsequence: they are
//   EVERY level, and the instrument does not chain (REFUTED.md, "chaining the
//   Tail-Count Transport on the tile"). => nothing to select.
//
//   I15 (greedy oracle): sharp at x = 2..43 and loose at 47..79. That is a
//   monotone break, not an oscillation, and REFUTED.md records it as a
//   compute-budget/rule break with slope -0.0235 +- 0.007 per level. A
//   signature that is an initial segment selects a FINITE set. => nothing.
//
//   I8 / I10 / I11 (LVP, M_alt, M_full): amp = 0 exactly. THE DEGENERATE CASE.
//   A zero-slack instrument has nothing to be sharp-on-a-subsequence WITH:
//   its i.o. value is 0, not unbounded. It is worth writing down why this is
//   the wrong direction rather than the right one. If C = 1 identically then
//   ln(C*T) = ln T, so the i.o. licence on that instrument is worth exactly
//   amp(ln T) = 0.3187 nats and not one nat more -- channel 1, already
//   priced and closed. An exact instrument transfers the WHOLE difficulty to
//   the object: proving the bound is then literally proving the theorem. That
//   is verify-tailcount-transport.md's "exact simulator rather than a source
//   of bounds", and operator-and-pair-count.md before it.
//
// ==============================================================================
// §5. THE PRIZE, EVEN IF A SIGNATURE EXISTED
// ==============================================================================
//   (a) instruments that bound G2 DIRECTLY -- the only ones whose slack
//         enters the licence one for one:
//     I1    0.3747  nats   maxsum_{L+1} step-3 (the exemplar)
//     I17   0.2231  nats   maxsum_2 step-3 LOWER bound on G2(new)
//     I9    0.0455  nats   Tail-Count certificate M_loose
//     I10   0.0000  nats   Tail-Count certificate M_alt
//     I11   0.0000  nats   Tail-Count certificate M_full
//
//   (b) instruments that bound L -- their slack reaches G2 only through
//         the bridge:
//     I3    1.2993  nats   A5 condition-(i) ceiling (= L0)
//     I2    0.9163  nats   A5 Theorem B ceiling on L
//     I4    0.9163  nats   forced ceiling (channel-compatible census)
//     I6    0.6931  nats   LP = LR + the 6p pair floor
//     I5    0.6286  nats   LR = 1 + longest run of gaps >= theta
//     I7    0.4055  nats   LV = value-qualifying run
//     I8    0.0000  nats   LVP = LV + the 6p pair floor
//       and that bridge FLOORS at ~0.183x for ANY maxsum bound whatsoever
//       (a3-05-bound-L.md §7; REFUTED.md "the maxsum bridge as a 0c->L
//       converter"), so an L-slack of 1.2993 nats does NOT deliver
//       1.2993 nats of G2 slack, and cannot be counted as if it did.
//
//     (c) diagnostics that are not bound/truth ratios at all:
//     I21   2.6355  nats   Sum exp(lambda g): index cost Z_2/Z_1
//     I12   1.1827  nats   depth-k counting ceiling at block 1 (T_5)
//     I13   0.5445  nats   vector-sieve certificate need nP/z^2
//     I18   0.5277  nats   rho = overshoot coefficient, max over m<=8
//     I14c  0.3629  nats   threshold-m certificate H_cert/maxsum_m, m=8
//     I16   0.3524  nats   bridge floor / u-frame need 0.31p/ln p
//     I14b  0.3302  nats   threshold-m certificate H_cert/maxsum_m, m=4
//     I14a  0.3066  nats   threshold-m certificate H_cert/maxsum_m, m=1
//     I20   0.2231  nats   alphabet |A| (LOWER instrument)
//     I19   0.1179  nats   centered maxsum C_M per-fold multiplier over G2 s
//     I15   0.0620  nats   greedy oracle (LOWER instrument)
//
//   THE HONEST HEADLINE: the largest slack oscillation of any DIRECT G2
//   instrument in the corpus is 0.3747 nats (I1, maxsum_{L+1} step-3 (the exemplar)).
//   It is the exemplar verify-monotone-depth.md already named, and after a
//   full survey of 23 instruments nothing beats it on the G2 axis.
//
//   Ceilings against the Zone Postulate need, cited from
//   attack-0c0e-level-selection.md ((4.2665-2)*ln theta(x)):
//     x    need     C-only(G2)  C+T(G2)   loosest-anything + T
//     23   6.7000         5.6%     10.3%       44.1%
//     43   8.1910         4.6%      8.5%       36.1%
//     79   9.6370         3.9%      7.2%       30.7%
//   Even the last column -- an oracle that gets to pick the loosest object in
//   the corpus, count its whole oscillation as free, AND add the truth's --
//   never reaches half the need. And §3 and §4 both say the selection it
//   assumes cannot be made.
//
// ==============================================================================
// ALL CUSTODY CHECKS PASSED
// ==============================================================================
// ============================================================================
// READINGS
//

// ============================================================================
// READINGS
// ============================================================================
//
// 1. THE EXEMPLAR IS THE CEILING, AND IT WAS ALREADY ON FILE. Across 23
//    instruments the largest slack oscillation of any instrument that bounds
//    G2 DIRECTLY is 0.3747 nats, and it is `maxsum_{L+1}` — the one
//    verify-monotone-depth.md already named. Nothing in the corpus beats it on
//    the G2 axis. The next largest is 0.2231 (the maxsum_2 lower bound) and
//    then 0.0455 (the loose tail-count certificate). So the fourth channel's
//    measured value is 0.3747 nats, not an unknown, and the survey's job was
//    to find out whether the corpus hides something bigger. It does not.
//
// 2. THE BIG AMPLITUDES ARE ALL ON THE WRONG AXIS. The five loosest columns —
//    2.6355 (the Laplace index cost), 1.2993 (condition (i) on L), 1.1827
//    (the depth-k counting ceiling), 0.9163 twice (Theorem B and the forced
//    ceiling) — are not G2 bounds. The L-ceilings reach G2 only through the
//    bridge, and the bridge floors at ≈ 0.183x for ANY maxsum bound whatsoever
//    (a3-05-bound-L.md §7). An L-slack of 1.30 nats therefore does not deliver
//    1.30 nats of G2 slack; it is spent before it arrives. The depth column is
//    dial 4's already-closed channel 3, kept here only for contrast, and it is
//    the one column with a real trend (t = -6.03, Spearman -1.000) because
//    depth is an index the prover chooses, not a level the ladder hands over.
//
// 3. THE ANSWER TO THE DECISION QUESTION IS NO, AND THE MARGIN IS NOT CLOSE.
//    Nineteen instruments, eleven rules each, permutation null of 20000 with a
//    best-of-family statistic: the smallest per-instrument p_FWE is 0.1082
//    (I3, "p' - p >= 6"), and the Sidak correction over the nineteen
//    instruments puts it at 0.8865. Not one instrument reaches 0.05 even
//    before the outer correction. Three instruments are degenerate — zero
//    slack at every level, nothing to select on — and the remaining sixteen
//    read between 0.20 and 0.93. The one rule that recurs as a per-instrument
//    best, "p' - p >= 6", is the large-gap mechanism that has been dead since
//    2026-08-17 and is priced at 0.033 to 0.054 nats on the long ladder.
//
// 4. THE ORACLE CEILINGS SAY THE SAME THING WITHOUT ANY RULE AT ALL. For each
//    instrument the run prints the best single level's distance from its own
//    trend. On the direct-G2 instruments that ceiling is 0.1128 nats (I1) and
//    0.0164 (I9). An argument allowed to CHEAT — to look at the answer and
//    pick the sharpest level — gains a tenth of a nat against a need of 6.700.
//    That bounds the whole rule space on the measured column, exactly as
//    attack-0c0e-02-level-selection.js reading 7 does for the truth.
//
// 5. THE ZERO-SLACK INSTRUMENTS ARE THE DEGENERATE CASE AND THEY POINT THE
//    WRONG WAY. LVP, M_alt and M_full all read amp(ln C) = 0.0000 exactly.
//    This is not an instrument that is sharp on a subsequence; it is one that
//    is sharp everywhere, and if C = 1 identically then ln(C·T) = ln T and the
//    i.o. licence on it is worth exactly amp(ln T) = 0.3187 nats — channel 1,
//    already priced and closed. A zero-slack instrument has NOTHING to be
//    sharp-on-a-subsequence with. What it has instead is the whole difficulty
//    of the object: proving M_full is literally proving the theorem, which is
//    verify-tailcount-transport.md's "exact simulator rather than a source of
//    bounds". Exactness and usefulness are in tension, and the survey measures
//    the tension: the three exact instruments are the three that transport
//    nothing (REFUTED.md, "chaining the Tail-Count Transport on the tile").
//
// 6. AND THE SHARP LEVELS THAT DO HAVE A MECHANISM NAME A FINITE SET. This is
//    the reading that closes the channel rather than merely failing to open
//    it, because a permutation test on 5 to 8 levels can never see an
//    asymptotic. `maxsum_{L+1}` is sharp exactly when L = 1, i.e. when NO gap
//    of the old tile is ≡ 0, ±2 (mod p). The qualifying-gap counts run
//    2, 4, 4, 72, 60, 20, 380, 380, 64, 11784, 9452, 9500, 243816, 248058,
//    95896 across a3-10's fifteen miss cells: the count is ≈ 3D/p with
//    D = prod_{3≤q≤x}(q-2), so it grows like exp(theta(x))/p and the condition
//    "L = 1" is already unsatisfiable at T_11. The greedy oracle's sharp
//    levels are the initial segment x ≤ 43, also finite, and REFUTED.md
//    already records the break as budget-and-rule rather than arithmetic. In
//    both cases the signature EXISTS and is recognisable — and the set it
//    recognises is finite, which is the one thing an infinitely-often argument
//    cannot use.
//
// 7. NO COVARIATE CARRIES THE SLACK EITHER. Of 11 covariates x 19 instruments,
//    the largest |r| on a direct-G2 instrument is 0.804 (I1 against p ≡ 1
//    mod 4, n = 7, which is one bit of information on seven points) and 0.778
//    (I17 against "the record qualifies mod p", which is the mechanism a3-10
//    NAMES for that instrument and is the only correlation in the table with a
//    reason). Neither survives §3. The truth's own excursions do not carry any
//    instrument's slack: the largest |r| against the truth's ln margin is
//    0.850 at I14a on five points and -0.795 at I4 on eight, both of the wrong
//    sign for the story an argument would want, and both inside noise at that
//    n. rho's non-monotonicity carries nothing: |r| against ln rho never
//    exceeds 0.64 and is under 0.14 on every direct-G2 instrument.
//
// 8. PRE-REGISTRATION SCORED 5 OF 6. P1 RIGHT (14 of 23 above the truth's
//    0.3187, but see reading 2 — the majority is carried by columns that are
//    not G2 bounds, so the prediction is right on its literal terms and
//    misleading on its intent, and this reading is the correction). P2 RIGHT
//    (L-family mean 0.6942 against 0.4556). P3 RIGHT (three exact zeros).
//    P4 RIGHT (|t| < 2 at 14 of 23). P5 RIGHT, and it is the verdict.
//    P6 WRONG: the "record qualifies mod p" rule was never even the best rule
//    on the instrument whose mechanism it names — it is best only at I6 and
//    I14b, at p = 0.0716 and 0.2009, and it scores -0.0770 at I17 where the
//    mechanism actually lives. The rule is real as a mechanism and useless as
//    a selector, which is a sharper statement than the one predicted.
//
// 9. WHAT THIS FILE DOES NOT SHOW. It does not enumerate every possible
//    instrument, only every one with per-level values on record; a method
//    nobody has built cannot be surveyed. It does not prove that no instrument
//    can have an oscillating slack — I1 has one, 0.3747 nats, and that is a
//    fact about a real instrument. What it shows is that (i) 0.3747 is the
//    ceiling across everything measured, (ii) it is a fifth of the smallest
//    need, (iii) no sharp-level signature in the corpus survives a permutation
//    test at any instrument, and (iv) the two signatures with a named
//    mechanism select finite sets. The ladders are 5 to 8 levels and no
//    statistical test on 5 to 8 levels excludes an asymptotic; reading 6, not
//    reading 3, is what carries the closure.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). One figure
// here is not in the OUTPUT block. No number above was changed.
//
// BORROWED, verified present in the named source: the price "0.033 to 0.054
//   nats on the long ladder" for the large-gap mechanism is
//   research/history/staging/attack-0c0e-level-selection.md line 335, where it
//   is stated against ln 3 and marked [MEASURED]. The 0.0537 this file prints
//   is an unrelated effect size on its own instrument table.
// ---------------------------------------------------------------------------
