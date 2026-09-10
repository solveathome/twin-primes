'use strict';
// ============================================================================
// measure-0904-argmax — WHERE THE MAXIMUM SITS INSIDE THE TILE, AND HOW OFTEN
// ============================================================================
// THE QUESTION (Q2 of history/staging/object-g2-read-0829.md §8, not posed in
// research/QUESTIONS.md; the grep for "argmax", "position of the max" and
// "multiplicity" returns Q-g2-43-term and Q-multiplicity3, and neither is this
// object):
//
//   G2(x#) is the largest gap between consecutive twin slots of the tile T_x
//   of width W = x#. Where inside the tile is it attained, with what
//   multiplicity, and how thick is the near-maximal tail?
//
// WHY IT IS WORTH A RUN. Killer 2 of the wall is a QUANTIFIER: every
// almost-all-intervals theorem is the wrong quantifier for a maximal gap.
// The multiplicity is that quantifier's own coordinate. A maximum attained at
// one position out of W is where an L1 count over positions is most lossy, and
// object-g2-read-0829.md §4a records that the l1 -> l2 conversion IS the sharp
// maximal law, so how lossy it is at the extreme is a descriptive question the
// corpus has never asked. Nothing here is a route and nothing here bears on
// the exponent or on any infinitude statement.
//
// THE OBJECT. A twin slot is s with gcd(s, W) = gcd(s + 2, W) = 1, i.e. s not
// congruent to 0 or -2 modulo any p <= x (modulo 2 the two classes coincide,
// modulo 3 they are 0 and 1). The census is D = prod_{3<=p<=x} (p - 2). The D
// gaps are taken cyclically and sum to W. G2(x#) = max gap.
//
// THE MIRROR, derived here because the parity forecast rests on it.
// sigma(s) = W - 2 - s carries twin slots to twin slots (Mirror-Sweep Lemma,
// PROVEN in the corpus: gcd(W-2-s, W) = gcd(s+2, W) and gcd(W-s, W) = gcd(s,W))
// and reverses the cyclic order, so it carries the gap [s, s+G] to the gap
// [W-2-G-s, W-2-s]. The induced action on LEFT endpoints is
// tau_G(s) = W - 2 - G - s (mod W). The set of left endpoints of gaps of any
// fixed length G is tau_G-invariant, and tau_G has exactly two fixed points
// mod W, at (W-2-G)/2 and that plus W/2, both integers since W and G are even.
//
// THE NULL, and why the obvious one is wrong. A left endpoint s of a gap of
// length g satisfies TWO slot conditions, not one: s is a twin slot AND s + g
// is a twin slot. So modulo p its residue avoids FOUR classes, 0, -2, -g and
// -g-2, not two. The minimal honest null is therefore uniform on
//   A_p(g) = Z/p minus {0, -2, -g, -g-2},
// independently across primes, which is exact by CRT for the two endpoint
// conditions. A_p(g) is closed under the involution c -> -2-g-c induced by
// tau_g, so the mirrored null is well defined on it. Testing against the
// two-class null instead would reject trivially, because s + g being a slot is
// part of the definition of a gap.
//
// WHAT THE NULL STILL IGNORES, stated so a rejection is not over-read. A_p
// carries the two ENDPOINT conditions and nothing about the window interior,
// which must be entirely non-slot. The interior condition depends on the phase
// s mod p through the elementary KILL COUNT
//   kill(p, c, g) = #{ 1 <= j <= g-1 : c + j == 0 or -2 (mod p) },
// a deterministic function of the phase, and phases with a higher kill count
// make a long gap easier. So a rejection of the A_p null is expected, and the
// question the run answers is whether the deviation is explained by kill(),
// which is elementary and carries no positional information beyond the class
// count, or whether it is pinning, which would be a coordinate.
//
// QUOTED CONSTANTS, not recomputed here (research/G2-STATE.md §2, the exact
// ladder; used as a threshold input and as a self-test, never as a claim):
//   G2(11#)=42  G2(13#)=66  G2(17#)=108 G2(19#)=150 G2(23#)=204
//   G2(29#)=258 G2(31#)=348 G2(37#)=528
// and the census law D = prod_{3<=p<=x}(p-2), OEIS A059861, GLOSSARY "Census".
//
// ---------------------------------------------------------------------------
// WHAT WAS ALREADY SEEN BEFORE THE SEAL, on record so no forecast is scored
// against a level that had been run. The engine below was validated against a
// brute-force full-period sieve in a scratchpad directory outside the
// repository at x = 7, 11, 13, 17 before the seal tail was bound. That
// validation agreed on the slot count, the whole gap histogram, the maximum
// and the argmax set at all four levels, and in doing so it PRINTED the
// multiplicities m(7#) = 2, m(11#) = 4, m(13#) = 12, m(17#) = 20 and the
// argmax positions at those four levels. Reading those positions showed that
// several argmax positions at x = 13 differ by exactly W/11 = 2730. Those four
// levels are therefore SEEN, and the forecasts below are scored only at
// x = 19, 23, 29, 31, 37. Levels 11..17 are still recomputed and printed, as
// the engine's self-test and as context. Nothing at x >= 19 was run in any
// form before the seal tail was bound.
// ---------------------------------------------------------------------------
//
// THE PRE-REGISTERED FORECASTS AND THEIR FALSIFIERS (printed verbatim by
// --stage seal, which computes nothing about positions; the seal tail is bound
// before the run tail, and embed.js hashes the bytes above the FIRST tail for
// every tail of a multi-tail file, so both tails carry the same code-sha256):
//
//  F1 parity. m(x) is even at every scored level, and no argmax left endpoint
//     equals a fixed point of tau_{G2}.
//     Falsifier: any odd m(x), or any argmax at a fixed point.
//
//  F2 size. m(x) <= 48 at each of x = 19, 23, 29, 31, and m is NOT increasing
//     at all three consecutive steps 19 -> 23 -> 29 -> 31. (Context, not a
//     forecast: 2, 4, 12, 20 at the seen levels and 8 at x = 43 from
//     Q-g2-43-term, so the sequence is already known to be non-monotone.)
//     Falsifier: m(x) > 48 at any scored level, or monotone increase across
//     all of 19, 23, 29, 31.
//
//  F3 residue classes. Against the A_p(g) null above, with a mirrored Monte
//     Carlo, the residues of the argmax set and of the top-K set are uniform.
//     Forecast: the summed chi-square p-value is at least 0.05 at every scored
//     level and no single prime is below 0.05/pi(x); and IF that fails, the
//     failure is explained by the kill count, in the sense that the Pearson
//     correlation between a class's observed count and kill(p, c, G2) is
//     positive at a majority of the primes at every scored level.
//     Falsifier of the generic reading: a summed p below 0.05 at three or more
//     scored levels WITH the kill-count correlation not positive at a majority
//     of primes. That is pinning, and it is the only positional coordinate an
//     argument could hold.
//     A THIRD row is reported and is the honest control: two argmax positions
//     differing by a multiple of W/p agree modulo every prime except p, so the
//     copying structure of F7 makes the residues DEPENDENT and can produce a
//     chi-square rejection on its own. `argmax-thin` keeps one representative
//     per congruence component and is the row to read for pinning.
//
//  F4 gross position. s/W over the top-K set is uniform on [0,1). Tested by a
//     Kolmogorov-Smirnov statistic against the mirrored uniform null, Monte
//     Carlo. The argmax set's MEAN position is forced to (W-2-G2)/2 by the
//     mirror and carries no information, so only the spread is tested.
//     Forecast: no KS p-value below 0.05 at three or more scored levels.
//     Falsifier: that.
//
//  F5 near-maximal tail. With lambda = ln D / G2 the Poisson tail model gives
//     N(>= a*G2) ~ D^(1-a). Forecast: N(>= 0.9*G2) in [3, 40] at x = 29 and
//     x = 31 (model 6.8 and 9.5), N(>= 0.95*G2) in [1, 12] there (model 2.9
//     and 3.1), and both counts rise overall from x = 11 to x = 31.
//     Falsifier: either count outside its band at x = 31, or a fall of more
//     than a factor 2 between consecutive levels above x = 17.
//
//  F6 isolation. G2 minus the second largest distinct gap value is at most 12
//     at every scored level.
//     Falsifier: a drop of 30 or more at any scored level. That is the outcome
//     that would matter: an isolated maximum standing 30 above a smooth tail
//     is a single distinguished position out of W, which is exactly where an
//     L1 count over positions is most lossy.
//
//  F7 the copying test, named in advance. T_x is the folded tile, so two
//     positions differing by a multiple of W/p agree modulo every prime except
//     p, and two wide gaps could sit at congruent places in two folds.
//     Statistic: pairs i < j in a set whose difference is an exact multiple of
//     W/p, for each prime p <= x, and the same within +- G2 of a multiple. The
//     null expectation for the near form is about C(n,2)*(2*G2+1)*p/W, which
//     is 5.3e-7 at x = 31, p = 31, n = 100.
//     Forecast, informed by the seen level x = 13: the exact form FIRES, with
//     at least one exact-multiple pair inside the argmax set at EACH of
//     x = 19, 23, 29, 31.
//     Falsifier: zero such pairs in the argmax set at two or more scored
//     levels.
//
//  F8 clustering at gross scale. Beyond the congruence structure of F7 the
//     top-K positions carry no clustering: the minimum spacing and the count
//     of spacings below W/(10n) agree with the mirrored uniform null.
//     Forecast: no Monte-Carlo p-value below 0.05 at three or more scored
//     levels.
//     Falsifier: that.
//
//  F9 reach. x = 37 is attempted; x = 41 and x = 43 are priced and not run.
//     Only F1 and F2 are scored at x = 37.
//
// WHAT IS NOT CLAIMED. A null result on F1..F8 is the expected outcome and
// would say that killer 2's own coordinate is generic, which is a description
// of a finite object, not a bound on it. A hit is a fact about a tile at
// x <= 37 and carries no infinitude content.
//
// METHOD. A wheel-210 segmented scan: only residues coprime to 2, 3, 5, 7 in
// the twin sense survive the wheel (15 of every 210 positions), and the primes
// 11..x are struck as two arithmetic progressions each, per wheel residue, per
// segment. Shards are contiguous block ranges handed to worker_threads; the
// gaps straddling a shard boundary and the wrap gap are stitched in the main
// thread. Self-tests at every level: the slot count against prod(p-2), the gap
// sum against W, the gap count against the slot count, the maximum against the
// quoted ladder, and the argmax set's invariance under tau. All arithmetic is
// exact integer arithmetic in doubles: the largest value handled is
// W = 37# = 7.42e12 and the largest count is D = 2.18e11, both far below
// 2^53 = 9.007e15. x = 43 is out of reach by this route because
// 43# = 1.31e16 exceeds 2^53.
// ============================================================================

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const os = require('os');

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43];
const primesUpTo = (x) => PRIMES.filter((p) => p <= x);
const primorial = (x) => primesUpTo(x).reduce((a, b) => a * b, 1);
const census = (x) => primesUpTo(x).filter((p) => p >= 3).reduce((a, p) => a * (p - 2), 1);

// quoted from research/G2-STATE.md §2, the exact ladder
const LADDER = { 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258, 31: 348, 37: 528, 41: 546, 43: 618 };
const SEEN = new Set([7, 11, 13, 17]);   // levels run before the seal, see the header
const KTOP = 100;
const MCREPS = 20000;
const MCPOS = 4000;

// --- the wheel --------------------------------------------------------------
const WM = 210;
const RES = (() => {
  const r = [];
  for (let a = 0; a < WM; a++) {
    if (a % 2 !== 1) continue;                 // p=2 removes class 0 only
    if (a % 3 !== 2) continue;                 // p=3 removes classes 0 and 1
    if (a % 5 === 0 || a % 5 === 3) continue;  // p=5 removes 0 and p-2=3
    if (a % 7 === 0 || a % 7 === 5) continue;  // p=7 removes 0 and p-2=5
    r.push(a);
  }
  return r;
})();
const NR = RES.length;   // 15

function invMod(a, m) {
  let oldR = ((a % m) + m) % m, r = m, oldS = 1, s = 0;
  while (r !== 0) { const q = Math.floor(oldR / r); [oldR, r] = [r, oldR - q * r]; [oldS, s] = [s, oldS - q * s]; }
  return ((oldS % m) + m) % m;
}

// --- the scan ---------------------------------------------------------------
// Blocks are indexed by k, position = 210*k + RES[i]. HIST is a Float64Array
// because the counts run to 2.18e11, exact in a double and NOT exact in a
// Uint32Array. BUF is a Uint8Array of 0/1 struck flags only.
function scanRange(x, kLo, kHi, thr, SEGB) {
  const ps = primesUpTo(x).filter((p) => p > 7);
  const inv = ps.map((p) => invMod(WM % p, p));
  const hist = new Float64Array(2048);
  const bigPos = []; const bigGap = [];
  let count = 0, first = -1, prev = -1;
  const buf = new Uint8Array(SEGB * NR);
  for (let seg = kLo; seg < kHi; seg += SEGB) {
    const nb = Math.min(SEGB, kHi - seg), len = nb * NR;
    buf.fill(0, 0, len);
    for (let pi = 0; pi < ps.length; pi++) {
      const p = ps[pi], ip = inv[pi], st = p * NR;
      for (let ci = 0; ci < 2; ci++) {
        const c = ci === 0 ? 0 : p - 2;
        for (let i = 0; i < NR; i++) {
          let t = ((c - RES[i]) % p + p) % p;
          t = (t * ip) % p;
          let k = t - (seg % p); if (k < 0) k += p;
          for (let j = k * NR + i; j < len; j += st) buf[j] = 1;
        }
      }
    }
    for (let j = 0; j < len; j++) {
      if (buf[j] === 0) {
        const r = WM * (seg + ((j / NR) | 0)) + RES[j % NR];
        count++;
        if (prev < 0) { first = r; } else {
          const g = r - prev;
          hist[g]++;
          if (g >= thr) { bigPos.push(prev); bigGap.push(g); }
        }
        prev = r;
      }
    }
  }
  return { count, first, last: prev, hist, bigPos, bigGap };
}

if (!isMainThread) {
  const { x, kLo, kHi, thr, SEGB } = workerData;
  parentPort.postMessage(scanRange(x, kLo, kHi, thr, SEGB));
} else {

// --- a seeded PRNG, so the Monte Carlo is reproducible ----------------------
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const argv = process.argv.slice(2);
const optOf = (n, d) => { const i = argv.indexOf('--' + n); return i === -1 ? d : argv[i + 1]; };
const STAGE = optOf('stage', 'seal');
const LEVELS = String(optOf('levels', '11,13,17,19,23,29,31')).split(',').map(Number);
const NW = Number(optOf('workers', Math.min(8, os.cpus().length)));
const SHARD_FROM = Number(optOf('shardfrom', 29));

const f = (v, d) => Number(v).toFixed(d);
const mod = (a, m) => ((a % m) + m) % m;

function stageSeal() {
  console.log('measure-0904-argmax.js --stage seal');
  console.log('');
  console.log('SEALED BEFORE THE RUN. Nothing about positions, multiplicities, residue classes');
  console.log('or near-maximal counts is computed in this stage. The forecasts are the header of');
  console.log('this file, reprinted here so the seal tail carries them as its own output.');
  console.log('');
  console.log('SEEN BEFORE THE SEAL (engine validation against a brute-force full-period sieve,');
  console.log('in a scratchpad outside the repository): x = 7, 11, 13, 17, with m = 2, 4, 12, 20');
  console.log('and the argmax sets printed, and W/11 = 2730 seen as a difference inside the');
  console.log('x = 13 argmax set. SCORED: x = 19, 23, 29, 31 for F1..F8; x = 37 for F1, F2.');
  console.log('');
  console.log('  F1 parity    m(x) even at every scored level; no argmax at a fixed point of tau.');
  console.log('               FALSIFIER any odd m(x), or an argmax at a fixed point.');
  console.log('  F2 size      m(x) <= 48 at x = 19, 23, 29, 31, and m not increasing at all three');
  console.log('               consecutive steps. FALSIFIER m > 48 anywhere scored, or monotone.');
  console.log('  F3 classes   against the A_p(g) endpoint null, summed chi-square MC p >= 0.05 at');
  console.log('               every scored level and no single prime below 0.05/pi(x); and if that');
  console.log('               fails, the kill-count correlation is positive at a majority of the');
  console.log('               primes. FALSIFIER of the generic reading: summed p < 0.05 at three');
  console.log('               or more levels WITHOUT the kill-count correlation. That is pinning.');
  console.log('               A third row, argmax-thin, keeps one representative per congruence');
  console.log('               component; the copying structure of F7 makes the unthinned residues');
  console.log('               dependent, so argmax-thin is the row to read for pinning.');
  console.log('  F4 position  KS of s/W against the mirrored uniform null: FALSIFIER p < 0.05 at');
  console.log('               three or more scored levels.');
  console.log('  F5 tail      N(>=0.90*G2) in [3, 40] and N(>=0.95*G2) in [1, 12] at x = 29 and');
  console.log('               x = 31; both rising over x = 11..31. FALSIFIER out of band at 31, or');
  console.log('               a fall of more than a factor 2 between consecutive levels above 17.');
  console.log('  F6 isolation G2 - (second largest distinct gap) <= 12 at every scored level.');
  console.log('               FALSIFIER a drop of 30 or more anywhere scored.');
  console.log('  F7 copying   at least one pair of argmax positions differing by an exact multiple');
  console.log('               of W/p, some prime p <= x, at EACH of x = 19, 23, 29, 31.');
  console.log('               FALSIFIER zero such pairs at two or more scored levels.');
  console.log('  F8 cluster   min spacing and short-spacing count of the top-K set agree with the');
  console.log('               mirrored uniform null. FALSIFIER MC p < 0.05 at three or more levels.');
  console.log('  F9 reach     x = 37 attempted; x = 41 and x = 43 priced, not run.');
  console.log('');
  console.log('CONSTANTS QUOTED, NOT RECOMPUTED (G2-STATE.md §2 ladder, A059861 census law):');
  console.log('  x    W                 D                 G2    mean gap   G2/mean');
  for (const x of [11, 13, 17, 19, 23, 29, 31, 37]) {
    const W = primorial(x), D = census(x), m = W / D;
    console.log(`  ${String(x).padStart(2)}   ${String(W).padStart(16)}  ${String(D).padStart(14)}  ${String(LADDER[x]).padStart(4)}   ${f(m, 4).padStart(8)}   ${f(LADDER[x] / m, 3).padStart(7)}`);
  }
  console.log('');
  console.log('MODEL FIGURES BEHIND F5, from lambda = ln D / G2 and N(>= a G2) = D^(1-a):');
  for (const x of [11, 13, 17, 19, 23, 29, 31, 37]) {
    const D = census(x), lam = Math.log(D) / LADDER[x];
    console.log(`  x=${String(x).padStart(2)}  lambda=${f(lam, 6)}  D^0.10=${f(Math.pow(D, 0.10), 2).padStart(6)}  D^0.05=${f(Math.pow(D, 0.05), 2).padStart(6)}`);
  }
  console.log('');
  console.log('THE NULL, printed so the seal fixes it: A_p(g) = Z/p minus {0, -2, -g, -g-2}.');
  console.log('  p    |A_p| at g = G2(31#) = 348      excluded classes');
  for (const p of primesUpTo(31)) {
    if (p < 5) continue;
    const ex = new Set([0, mod(-2, p), mod(-348, p), mod(-350, p)]);
    console.log(`  ${String(p).padStart(2)}   ${String(p - ex.size).padStart(3)} of ${String(p).padStart(2)}                     {${[...ex].sort((a, b) => a - b).join(', ')}}`);
  }
  console.log('');
  console.log('DONE (seal: no scan was run, no position was computed).');
}

// --- the endpoint null ------------------------------------------------------
function allowedA(p, g) {
  const ex = new Set([0, mod(-2, p), mod(-g, p), mod(-g - 2, p)]);
  const a = []; for (let c = 0; c < p; c++) if (!ex.has(c)) a.push(c);
  return a;
}
function killCount(p, c, g) {
  let n = 0; const t0 = 0, t2 = mod(-2, p);
  for (let j = 1; j <= g - 1; j++) { const v = mod(c + j, p); if (v === t0 || v === t2) n++; }
  return n;
}

// --- one level --------------------------------------------------------------
function runLevel(x, nw) {
  const W = primorial(x), D = census(x), G = LADDER[x], K = W / WM;
  const thr = 2 * Math.floor(0.55 * G / 2);
  const t0 = Date.now();
  const bnd = []; for (let i = 0; i <= nw; i++) bnd.push(Math.round(K * i / nw));
  return new Promise((resolve, reject) => {
    const parts = new Array(nw); let done = 0;
    for (let i = 0; i < nw; i++) {
      const w = new Worker(__filename, { workerData: { x, kLo: bnd[i], kHi: bnd[i + 1], thr, SEGB: 65536 } });
      w.on('error', reject);
      w.on('message', (m) => {
        parts[i] = m; done++;
        if (done !== nw) return;
        const hist = new Float64Array(2048);
        const pos = [], gap = [];
        let count = 0;
        for (const p of parts) {
          count += p.count;
          for (let g = 0; g < 2048; g++) hist[g] += p.hist[g];
          for (let j = 0; j < p.bigPos.length; j++) { pos.push(p.bigPos[j]); gap.push(p.bigGap[j]); }
        }
        for (let i2 = 0; i2 < nw; i2++) {          // stitch shard boundaries and the wrap
          const a = parts[i2].last;
          const b = (i2 + 1 < nw) ? parts[i2 + 1].first : parts[0].first + W;
          const g = b - a;
          hist[g]++;
          if (g >= thr) { pos.push(a); gap.push(g); }
        }
        resolve({ x, W, D, G, thr, count, hist, pos, gap, secs: (Date.now() - t0) / 1000 });
      });
    }
  });
}

// --- statistics -------------------------------------------------------------
// A SET here is a list of {s, g} pairs: a left endpoint and its gap length.
function chi2(set, x) {
  const out = []; let tot = 0;
  for (const p of primesUpTo(x)) {
    if (p < 5) continue;
    const A = new Map(), E = new Map();
    for (const { g } of set) if (!A.has(g)) A.set(g, allowedA(p, g));
    let cells = new Set();
    for (const [, a] of A) for (const c of a) cells.add(c);
    cells = [...cells].sort((a, b) => a - b);
    if (cells.length < 2) continue;
    for (const c of cells) E.set(c, 0);
    const O = new Map(cells.map((c) => [c, 0]));
    for (const { s, g } of set) {
      O.set(mod(s, p), O.get(mod(s, p)) + 1);
      const a = A.get(g); for (const c of a) E.set(c, E.get(c) + 1 / a.length);
    }
    let c2 = 0; for (const c of cells) { const e = E.get(c); if (e > 0) c2 += (O.get(c) - e) * (O.get(c) - e) / e; }
    out.push({ p, c2, cells, O, E });
    tot += c2;
  }
  return { per: out, tot };
}

function mirrorPairs(set, W) {
  // pair each element with its tau_g image inside the set
  const key = (s, g) => `${g}|${s}`;
  const idx = new Map(set.map((e, i) => [key(e.s, e.g), i]));
  const seen = new Array(set.length).fill(false);
  const pairs = [], singles = [];
  for (let i = 0; i < set.length; i++) {
    if (seen[i]) continue;
    const j = idx.get(key(mod(W - 2 - set[i].g - set[i].s, W), set[i].g));
    if (j === undefined || j === i) { singles.push(i); seen[i] = true; }
    else { pairs.push([i, j]); seen[i] = seen[j] = true; }
  }
  return { pairs, singles };
}

function mcChi2(set, x, W, rnd, reps) {
  const { pairs, singles } = mirrorPairs(set, W);
  const ps = primesUpTo(x).filter((p) => p >= 5);
  const tots = [], per = ps.map(() => []);
  const pre = ps.map((p) => {
    const A = new Map(); for (const { g } of set) if (!A.has(g)) A.set(g, allowedA(p, g));
    let cells = new Set(); for (const [, a] of A) for (const c of a) cells.add(c);
    cells = [...cells].sort((a, b) => a - b);
    const E = new Map(cells.map((c) => [c, 0]));
    for (const { g } of set) { const a = A.get(g); for (const c of a) E.set(c, E.get(c) + 1 / a.length); }
    return { p, A, cells, E, ok: cells.length >= 2 };
  });
  for (let rep = 0; rep < reps; rep++) {
    let tot = 0;
    for (let pi = 0; pi < ps.length; pi++) {
      const q = pre[pi]; if (!q.ok) { per[pi].push(0); continue; }
      const p = q.p;
      const O = new Map(q.cells.map((c) => [c, 0]));
      for (const [i, j] of pairs) {
        const g = set[i].g, a = q.A.get(g);
        const c = a[(rnd() * a.length) | 0];
        O.set(c, O.get(c) + 1);
        const cm = mod(-2 - g - c, p);
        O.set(cm, O.get(cm) + 1);
      }
      for (const i of singles) {
        const a = q.A.get(set[i].g); const c = a[(rnd() * a.length) | 0];
        O.set(c, O.get(c) + 1);
      }
      let c2 = 0; for (const c of q.cells) { const e = q.E.get(c); if (e > 0) c2 += (O.get(c) - e) * (O.get(c) - e) / e; }
      per[pi].push(c2); tot += c2;
    }
    tots.push(tot);
  }
  return { ps, tots, per, pre };
}

const pval = (sample, obs) => { let c = 0; for (const v of sample) if (v >= obs - 1e-12) c++; return (c + 1) / (sample.length + 1); };

function pearson(a, b) {
  const n = a.length; if (n < 3) return NaN;
  const ma = a.reduce((u, v) => u + v, 0) / n, mb = b.reduce((u, v) => u + v, 0) / n;
  let sa = 0, sb = 0, sab = 0;
  for (let i = 0; i < n; i++) { sa += (a[i] - ma) ** 2; sb += (b[i] - mb) ** 2; sab += (a[i] - ma) * (b[i] - mb); }
  return (sa === 0 || sb === 0) ? NaN : sab / Math.sqrt(sa * sb);
}

const ksStat = (u) => { const v = u.slice().sort((a, b) => a - b), n = v.length; let d = 0; for (let i = 0; i < n; i++) d = Math.max(d, Math.max((i + 1) / n - v[i], v[i] - i / n)); return d; };

function copyingRows(set, W, x, G) {
  const rows = [];
  for (const p of primesUpTo(x)) {
    const M = W / p; let exact = 0, near = 0;
    for (let i = 0; i < set.length; i++) for (let j = i + 1; j < set.length; j++) {
      let d = Math.abs(set[i].s - set[j].s) % M; d = Math.min(d, M - d);
      if (d === 0) exact++;
      if (d <= G) near++;
    }
    if (exact || near) rows.push({ p, M, exact, near });
  }
  return rows;
}

function congruenceRoots(set, W, x) {
  const n = set.length, par = [...Array(n).keys()];
  const find = (a) => { while (par[a] !== a) { par[a] = par[par[a]]; a = par[a]; } return a; };
  for (const p of primesUpTo(x)) {
    const M = W / p;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      let d = Math.abs(set[i].s - set[j].s) % M; d = Math.min(d, M - d);
      if (d === 0) { const a = find(i), b = find(j); if (a !== b) par[a] = b; }
    }
  }
  const seenR = new Set(), reps = [];
  for (let i = 0; i < n; i++) { const r = find(i); if (!seenR.has(r)) { seenR.add(r); reps.push(i); } }
  return { size: seenR.size, reps };
}
const congruenceComponents = (set, W, x) => congruenceRoots(set, W, x).size;
const congruenceThin = (set, W, x) => congruenceRoots(set, W, x).reps.map((i) => set[i]);

function drawControl(x, W, G, n, rnd) {
  // rejection-sampled real positions s with s and s+G both twin slots
  const ps = primesUpTo(x), out = [];
  let tries = 0;
  while (out.length < n && tries < 4e7) {
    tries++;
    const s = Math.floor(rnd() * W);
    let ok = true;
    for (const p of ps) { const v = s % p, w = (s + G) % p; if (v === 0 || v === p - 2 || w === 0 || w === p - 2) { ok = false; break; } }
    if (ok) out.push({ s, g: G });
  }
  return out;
}

async function stageRun() {
  console.log(`measure-0904-argmax.js --stage run --levels ${LEVELS.join(',')} --workers ${NW}`);
  console.log('');
  console.log('SEC A — SELF-TESTS, EVERY LEVEL EXHAUSTIVE OVER THE WHOLE PERIOD');
  console.log('  x    W                 D (slots)         count=D  sum g=W  ngaps=D   max  ladder   ok    secs');
  const results = [];
  for (const x of LEVELS) {
    const r = await runLevel(x, x >= SHARD_FROM ? NW : 1);
    let sum = 0, ng = 0, mx = 0;
    for (let g = 0; g < 2048; g++) if (r.hist[g] > 0) { sum += g * r.hist[g]; ng += r.hist[g]; mx = g; }
    const ok = (r.count === r.D) && (sum === r.W) && (ng === r.D) && (mx === r.G);
    console.log(`  ${String(x).padStart(2)}   ${String(r.W).padStart(16)}  ${String(r.D).padStart(14)}    ${r.count === r.D ? 'yes' : 'NO '}      ${sum === r.W ? 'yes' : 'NO '}     ${ng === r.D ? 'yes' : 'NO '}    ${String(mx).padStart(4)}  ${String(r.G).padStart(5)}    ${ok ? 'ok' : 'FAIL'}  ${f(r.secs, 1).padStart(7)}`);
    r.mx = mx;
    r.am = []; for (let i = 0; i < r.pos.length; i++) if (r.gap[i] === mx) r.am.push({ s: r.pos[i], g: mx });
    r.am.sort((a, b) => a.s - b.s);
    let tt = 0; for (let g = 2047; g >= 0; g--) { tt += r.hist[g]; if (tt >= KTOP) { r.topThr = Math.max(g, r.thr); break; } }
    r.top = []; for (let i = 0; i < r.pos.length; i++) if (r.gap[i] >= r.topThr) r.top.push({ s: r.pos[i], g: r.gap[i] });
    r.top.sort((a, b) => a.s - b.s);
    results.push(r);
  }
  console.log('');

  console.log('SEC B — M1: MULTIPLICITY OF THE MAXIMUM, AND THE MIRROR');
  console.log('  tau_G(s) = W - 2 - G - s (mod W). The argmax set must be tau-invariant.');
  console.log('  x    G2     m   even  tau-inv  mirror pairs  self-paired   fixed points of tau            status');
  for (const r of results) {
    const S = new Set(r.am.map((e) => e.s));
    const tau = (s) => mod(r.W - 2 - r.mx - s, r.W);
    const inv = r.am.every((e) => S.has(tau(e.s)));
    let self = 0; for (const e of r.am) if (tau(e.s) === e.s) self++;
    const fp1 = (r.W - 2 - r.mx) / 2, fp2 = fp1 + r.W / 2;
    const atFp = r.am.filter((e) => e.s === fp1 || e.s === fp2).length;
    console.log(`  ${String(r.x).padStart(2)}  ${String(r.mx).padStart(5)}  ${String(r.am.length).padStart(4)}   ${r.am.length % 2 === 0 ? 'yes' : 'NO '}    ${inv ? 'yes' : 'NO '}       ${String((r.am.length - self) / 2).padStart(5)}        ${String(self).padStart(4)}      ${fp1}, ${fp2} (${atFp} hit)   ${SEEN.has(r.x) ? 'SEEN' : 'scored'}`);
  }
  console.log('');
  console.log('  The argmax left endpoints in full, up to 48 per level:');
  for (const r of results) console.log(`  x=${r.x} m=${r.am.length}: ${r.am.slice(0, 48).map((e) => e.s).join(', ')}${r.am.length > 48 ? ', …' : ''}`);
  console.log('');

  console.log('SEC C — M2: GROSS POSITION OF THE ARGMAX SET');
  console.log('  x    min s/W    max s/W    mean s/W   forced mean   min |s/W - 1/2|   min s/W among top-K');
  for (const r of results) {
    const u = r.am.map((e) => e.s / r.W), ut = r.top.map((e) => e.s / r.W);
    console.log(`  ${String(r.x).padStart(2)}  ${f(Math.min(...u), 6)}  ${f(Math.max(...u), 6)}  ${f(u.reduce((a, b) => a + b, 0) / u.length, 6)}   ${f((r.W - 2 - r.mx) / 2 / r.W, 6)}      ${f(Math.min(...u.map((v) => Math.abs(v - 0.5))), 6)}          ${f(Math.min(...ut), 6)}`);
  }
  console.log('');
  console.log('  Residue counts of the argmax left endpoints per prime, over the cells of A_p(G2):');
  for (const r of results) {
    const rows = [];
    for (const p of primesUpTo(r.x)) {
      if (p < 5) continue;
      const A = allowedA(p, r.mx); const O = new Map(A.map((c) => [c, 0]));
      for (const e of r.am) if (O.has(mod(e.s, p))) O.set(mod(e.s, p), O.get(mod(e.s, p)) + 1);
      rows.push(`p${p}:[${A.map((c) => O.get(c)).join(',')}]`);
    }
    console.log(`  x=${String(r.x).padStart(2)}  ${rows.join(' ')}`);
  }
  console.log('');
  console.log('  Occupancy of A_p(G2) by the argmax set: cells, empty cells, and the naive expectation from m independent draws:');
  for (const r of results) {
    const rows = [];
    for (const p of primesUpTo(r.x)) {
      if (p < 5) continue;
      const A = allowedA(p, r.mx); if (A.length < 2) continue;
      const O = new Map(A.map((c) => [c, 0]));
      for (const e of r.am) if (O.has(mod(e.s, p))) O.set(mod(e.s, p), O.get(mod(e.s, p)) + 1);
      const emp = A.filter((c) => O.get(c) === 0).length;
      const expEmp = A.length * Math.pow(1 - 1 / A.length, r.am.length);
      rows.push(`p${p}:${emp}/${A.length}(exp ${f(expEmp, 1)})`);
    }
    console.log(`  x=${String(r.x).padStart(2)}  ${rows.join(' ')}`);
  }
  console.log('');

  console.log('SEC D — M2 TEST: CHI-SQUARE ON RESIDUE CLASSES AGAINST THE A_p(g) ENDPOINT NULL');
  console.log(`  ${MCREPS} mirrored replicates, seeded. Control = rejection-sampled real positions s`);
  console.log('  with s and s+G2 both twin slots, scored through the same pipeline.');
  console.log('  x   set          n    chi2 tot     p(tot)   worst p   p(prime)   0.05/pi(x)   kill-corr +/tot   control p(tot)');
  for (const r of results) {
    const thin = congruenceThin(r.am, r.W, r.x);
    const topThin = congruenceThin(r.top, r.W, r.x);
    const sets = [['argmax', r.am, 0], ['argmax-thin', thin, 5], [`top-${r.top.length}`, r.top, 7], [`top-thin`, topThin, 9]];
    for (const [tag, set, seed] of sets) {
      if (set.length < 4) { console.log(`  ${String(r.x).padStart(2)}  ${tag.padEnd(10)} ${String(set.length).padStart(4)}  (n < 4, not tested)`); continue; }
      const rnd = mulberry32(20260904 + r.x * 101 + seed);
      const obs = chi2(set, r.x);
      const mc = mcChi2(set, r.x, r.W, rnd, MCREPS);
      const pt = pval(mc.tots, obs.tot);
      let worst = { p: 0, pp: 2 };
      for (let i = 0; i < obs.per.length; i++) {
        const k = mc.ps.indexOf(obs.per[i].p);
        const pp = pval(mc.per[k], obs.per[i].c2);
        if (pp < worst.pp) worst = { p: obs.per[i].p, pp };
      }
      let pos = 0, tot = 0;
      for (const row of obs.per) {
        const cs = row.cells, o = cs.map((c) => row.O.get(c) - row.E.get(c)), kk = cs.map((c) => killCount(row.p, c, r.mx));
        const rho = pearson(o, kk); if (!Number.isNaN(rho)) { tot++; if (rho > 0) pos++; }
      }
      const ctl = drawControl(r.x, r.W, r.mx, set.length, mulberry32(777 + r.x));
      const cP = pval(mc.tots, chi2(ctl, r.x).tot);
      console.log(`  ${String(r.x).padStart(2)}  ${tag.padEnd(10)} ${String(set.length).padStart(4)}  ${f(obs.tot, 3).padStart(10)}   ${f(pt, 5)}     p=${String(worst.p).padStart(2)}    ${f(worst.pp, 5)}      ${f(0.05 / primesUpTo(r.x).length, 5)}      ${pos}/${tot}             ${f(cP, 5)}`);
    }
  }
  console.log('');

  console.log('SEC E — M2 TEST: GROSS POSITION, KS AGAINST THE MIRRORED UNIFORM NULL');
  console.log('  x   set          n    KS obs     p(KS)');
  for (const r of results) {
    for (const [tag, set] of [['argmax', r.am], [`top-${r.top.length}`, r.top]]) {
      const obs = ksStat(set.map((e) => e.s / r.W));
      const rnd = mulberry32(31337 + r.x * 13 + (tag === 'argmax' ? 0 : 3));
      const shift = (r.W - 2 - r.mx) / r.W, n = set.length, sample = [];
      for (let rep = 0; rep < MCPOS; rep++) {
        const v = [];
        for (let h = 0; h < Math.ceil(n / 2); h++) { const a = rnd(); v.push(a); if (v.length < n) { let b = shift - a; b -= Math.floor(b); v.push(b); } }
        sample.push(ksStat(v));
      }
      console.log(`  ${String(r.x).padStart(2)}  ${tag.padEnd(10)} ${String(n).padStart(4)}   ${f(obs, 5)}   ${f(pval(sample, obs), 5)}`);
    }
  }
  console.log('');

  console.log('SEC F — M3: THE EXTREME TAIL');
  console.log('  x    G2   N(=G2)   N(>=.95G2)   N(>=.90G2)   D^0.05   D^0.10    2nd, 3rd, 4th largest distinct (value x count)');
  for (const r of results) {
    const N = (t) => { let c = 0; for (let g = Math.ceil(t); g < 2048; g++) c += r.hist[g]; return c; };
    const d = []; for (let g = 2047; g >= 0 && d.length < 4; g--) if (r.hist[g] > 0) d.push([g, r.hist[g]]);
    console.log(`  ${String(r.x).padStart(2)}  ${String(r.mx).padStart(4)}  ${String(r.hist[r.mx]).padStart(6)}   ${String(N(0.95 * r.mx)).padStart(10)}   ${String(N(0.90 * r.mx)).padStart(10)}   ${f(Math.pow(r.D, 0.05), 2).padStart(6)}   ${f(Math.pow(r.D, 0.10), 2).padStart(6)}    ${d.slice(1).map(([g, c]) => `${g}x${c}`).join('  ')}`);
  }
  console.log('');
  console.log('  The whole top of the spectrum, G2 down by 60 in steps of 6 (all gaps are multiples of 6, since every twin slot is 5 mod 6) (value:count):');
  for (const r of results) {
    const spec = []; for (let g = r.mx; g >= r.mx - 60 && g >= 0; g -= 6) spec.push(`${g}:${r.hist[g]}`);
    console.log(`  x=${String(r.x).padStart(2)}  ${spec.join(' ')}`);
  }
  console.log('');

  console.log('SEC G — M4: THE COPYING TEST, PAIRS DIFFERING BY A MULTIPLE OF W/p');
  console.log('  Null expectation for the NEAR form on a set of size n: C(n,2)*(2*G2+1)*p/W.');
  console.log('  x   set          n   prime   W/p                exact  near   null(exact)  null(near)');
  for (const r of results) {
    for (const [tag, set] of [['argmax', r.am], [`top-${r.top.length}`, r.top]]) {
      const rows = copyingRows(set, r.W, r.x, r.mx);
      if (!rows.length) { console.log(`  ${String(r.x).padStart(2)}  ${tag.padEnd(10)} ${String(set.length).padStart(4)}   (no pair at any p <= x, exact or near)`); continue; }
      for (const row of rows) {
        const e0 = set.length * (set.length - 1) / 2 / row.M;
        const e = e0 * (2 * r.mx + 1);
        console.log(`  ${String(r.x).padStart(2)}  ${tag.padEnd(10)} ${String(set.length).padStart(4)}   ${String(row.p).padStart(4)}   ${String(row.M).padStart(16)}   ${String(row.exact).padStart(4)}  ${String(row.near).padStart(4)}   ${e0.toExponential(2)}    ${e.toExponential(2)}`);
      }
    }
  }
  console.log('');
  console.log('  Components of each set under congruence modulo W/p, p <= x. CAVEAT: at small x the');
  console.log('  modulus W/p is comparable to n*G2 and components merge by chance, so only the large');
  console.log('  levels carry information; the null(exact) column above prices the chance merging.');
  for (const r of results) {
    console.log(`  x=${String(r.x).padStart(2)}  argmax m=${String(r.am.length).padStart(4)} components=${String(congruenceComponents(r.am, r.W, r.x)).padStart(4)}   top-${r.top.length} components=${String(congruenceComponents(r.top, r.W, r.x)).padStart(4)}`);
  }
  console.log('');

  console.log('SEC H — M4: SPACING OF THE TOP-K WINDOWS AGAINST THE MIRRORED UNIFORM NULL');
  console.log('  x     n   min spacing/W    p(min)    #spacings < W/(10n)   p(count)');
  for (const r of results) {
    const set = r.top.map((e) => e.s).sort((a, b) => a - b), n = set.length;
    const sp = []; for (let i = 1; i < n; i++) sp.push(set[i] - set[i - 1]); sp.push(r.W - set[n - 1] + set[0]);
    const obsMin = Math.min(...sp) / r.W, obsCnt = sp.filter((v) => v < r.W / (10 * n)).length;
    const rnd = mulberry32(4242 + r.x), shift = (r.W - 2 - r.mx) / r.W;
    const sMin = [], sCnt = [];
    for (let rep = 0; rep < MCPOS; rep++) {
      const v = []; for (let h = 0; h < Math.ceil(n / 2); h++) { const a = rnd(); v.push(a); if (v.length < n) { let b = shift - a; b -= Math.floor(b); v.push(b); } }
      v.sort((a, b) => a - b);
      const q = []; for (let i = 1; i < n; i++) q.push(v[i] - v[i - 1]); q.push(1 - v[n - 1] + v[0]);
      sMin.push(-Math.min(...q)); sCnt.push(q.filter((z) => z < 1 / (10 * n)).length);
    }
    console.log(`  ${String(r.x).padStart(2)}  ${String(n).padStart(4)}   ${obsMin.toExponential(3)}      ${f(pval(sMin, -obsMin), 5)}    ${String(obsCnt).padStart(6)}                ${f(pval(sCnt, obsCnt), 5)}`);
  }
  console.log('');

  console.log('SEC I — PRICE OF THE LEVELS NOT RUN');
  const rate = results.reduce((a, r) => a + r.W, 0) / results.reduce((a, r) => a + r.secs, 0);
  console.log(`  aggregated throughput on this run: ${(rate / 1e9).toFixed(2)}e9 positions/s`);
  for (const x of [41, 43]) {
    const W = primorial(x);
    console.log(`  x=${x}  W=${W}  ${W > Number.MAX_SAFE_INTEGER ? 'EXCEEDS 2^53 = 9007199254740991: this engine cannot address it in doubles' : `${(W / rate / 3600).toFixed(2)} h at the measured rate`}`);
  }
  console.log('');
  console.log('DONE');
}

if (STAGE === 'seal') stageSeal(); else stageRun().catch((e) => { console.log('RUN FAILED: ' + e.message); process.exitCode = 1; });

}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --tail 1 research/history/staging/measure-0904-argmax.js -- --stage seal
//   invocation:  node research/history/staging/measure-0904-argmax.js --stage seal
//   code-sha256: d53a3fd1ace221b8c95b0aad6cf5ce3b2afcc85a6af831a6e818accc3b3671d0
//   out-sha256:  561419f722de5a55912f9195b063a5e3854f4dc6dcb328daf7c383ba1f6143aa
//   body-lines:  71
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-04
//   elapsed:     0.1 s
// ============================================================================
// measure-0904-argmax.js --stage seal
//
// SEALED BEFORE THE RUN. Nothing about positions, multiplicities, residue classes
// or near-maximal counts is computed in this stage. The forecasts are the header of
// this file, reprinted here so the seal tail carries them as its own output.
//
// SEEN BEFORE THE SEAL (engine validation against a brute-force full-period sieve,
// in a scratchpad outside the repository): x = 7, 11, 13, 17, with m = 2, 4, 12, 20
// and the argmax sets printed, and W/11 = 2730 seen as a difference inside the
// x = 13 argmax set. SCORED: x = 19, 23, 29, 31 for F1..F8; x = 37 for F1, F2.
//
//   F1 parity    m(x) even at every scored level; no argmax at a fixed point of tau.
//                FALSIFIER any odd m(x), or an argmax at a fixed point.
//   F2 size      m(x) <= 48 at x = 19, 23, 29, 31, and m not increasing at all three
//                consecutive steps. FALSIFIER m > 48 anywhere scored, or monotone.
//   F3 classes   against the A_p(g) endpoint null, summed chi-square MC p >= 0.05 at
//                every scored level and no single prime below 0.05/pi(x); and if that
//                fails, the kill-count correlation is positive at a majority of the
//                primes. FALSIFIER of the generic reading: summed p < 0.05 at three
//                or more levels WITHOUT the kill-count correlation. That is pinning.
//                A third row, argmax-thin, keeps one representative per congruence
//                component; the copying structure of F7 makes the unthinned residues
//                dependent, so argmax-thin is the row to read for pinning.
//   F4 position  KS of s/W against the mirrored uniform null: FALSIFIER p < 0.05 at
//                three or more scored levels.
//   F5 tail      N(>=0.90*G2) in [3, 40] and N(>=0.95*G2) in [1, 12] at x = 29 and
//                x = 31; both rising over x = 11..31. FALSIFIER out of band at 31, or
//                a fall of more than a factor 2 between consecutive levels above 17.
//   F6 isolation G2 - (second largest distinct gap) <= 12 at every scored level.
//                FALSIFIER a drop of 30 or more anywhere scored.
//   F7 copying   at least one pair of argmax positions differing by an exact multiple
//                of W/p, some prime p <= x, at EACH of x = 19, 23, 29, 31.
//                FALSIFIER zero such pairs at two or more scored levels.
//   F8 cluster   min spacing and short-spacing count of the top-K set agree with the
//                mirrored uniform null. FALSIFIER MC p < 0.05 at three or more levels.
//   F9 reach     x = 37 attempted; x = 41 and x = 43 priced, not run.
//
// CONSTANTS QUOTED, NOT RECOMPUTED (G2-STATE.md §2 ladder, A059861 census law):
//   x    W                 D                 G2    mean gap   G2/mean
//   11               2310             135    42    17.1111     2.455
//   13              30030            1485    66    20.2222     3.264
//   17             510510           22275   108    22.9185     4.712
//   19            9699690          378675   150    25.6148     5.856
//   23          223092870         7952175   204    28.0543     7.272
//   29         6469693230       214708725   258    30.1324     8.562
//   31       200560490130      6226553025   348    32.2105    10.804
//   37      7420738134810    217929355875   528    34.0511    15.506
//
// MODEL FIGURES BEHIND F5, from lambda = ln D / G2 and N(>= a G2) = D^(1-a):
//   x=11  lambda=0.116792  D^0.10=  1.63  D^0.05=  1.28
//   x=13  lambda=0.110654  D^0.10=  2.08  D^0.05=  1.44
//   x=17  lambda=0.092696  D^0.10=  2.72  D^0.05=  1.65
//   x=19  lambda=0.085630  D^0.10=  3.61  D^0.05=  1.90
//   x=23  lambda=0.077887  D^0.10=  4.90  D^0.05=  2.21
//   x=29  lambda=0.074360  D^0.10=  6.81  D^0.05=  2.61
//   x=31  lambda=0.064805  D^0.10=  9.54  D^0.05=  3.09
//   x=37  lambda=0.049446  D^0.10= 13.61  D^0.05=  3.69
//
// THE NULL, printed so the seal fixes it: A_p(g) = Z/p minus {0, -2, -g, -g-2}.
//   p    |A_p| at g = G2(31#) = 348      excluded classes
//    5     2 of  5                     {0, 2, 3}
//    7     4 of  7                     {0, 2, 5}
//   11     7 of 11                     {0, 2, 4, 9}
//   13     9 of 13                     {0, 1, 3, 11}
//   17    13 of 17                     {0, 7, 9, 15}
//   19    15 of 19                     {0, 11, 13, 17}
//   23    19 of 23                     {0, 18, 20, 21}
//   29    27 of 29                     {0, 27}
//   31    27 of 31                     {0, 22, 24, 29}
//
// DONE (seal: no scan was run, no position was computed).
// ============================================================================
// READINGS
//
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --tail 2 research/history/staging/measure-0904-argmax.js -- --stage run --levels 11,13,17,19,23,29,31
//   invocation:  node research/history/staging/measure-0904-argmax.js --stage run --levels 11,13,17,19,23,29,31
//   code-sha256: d53a3fd1ace221b8c95b0aad6cf5ce3b2afcc85a6af831a6e818accc3b3671d0
//   out-sha256:  7d77a93b06db61007eec386cb2e9df19009b9c5d4ab0e2aada7804ba1b135b17
//   body-lines:  215
//   forced:      2026-09-04, 3 of 531 figures in the replaced block not reproduced (first: 13.6, 14.43e9, 5.86)
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-04
//   elapsed:     22.3 s
// ============================================================================
// measure-0904-argmax.js --stage run --levels 11,13,17,19,23,29,31 --workers 8
//
// SEC A — SELF-TESTS, EVERY LEVEL EXHAUSTIVE OVER THE WHOLE PERIOD
//   x    W                 D (slots)         count=D  sum g=W  ngaps=D   max  ladder   ok    secs
//   11               2310             135    yes      yes     yes      42     42    ok      0.0
//   13              30030            1485    yes      yes     yes      66     66    ok      0.0
//   17             510510           22275    yes      yes     yes     108    108    ok      0.0
//   19            9699690          378675    yes      yes     yes     150    150    ok      0.0
//   23          223092870         7952175    yes      yes     yes     204    204    ok      0.1
//   29         6469693230       214708725    yes      yes     yes     258    258    ok      0.5
//   31       200560490130      6226553025    yes      yes     yes     348    348    ok     13.2
//
// SEC B — M1: MULTIPLICITY OF THE MAXIMUM, AND THE MIRROR
//   tau_G(s) = W - 2 - G - s (mod W). The argmax set must be tau-invariant.
//   x    G2     m   even  tau-inv  mirror pairs  self-paired   fixed points of tau            status
//   11     42     4   yes    yes           2           0      1133, 2288 (0 hit)   SEEN
//   13     66    12   yes    yes           6           0      14981, 29996 (0 hit)   SEEN
//   17    108    20   yes    yes          10           0      255200, 510455 (0 hit)   SEEN
//   19    150    20   yes    yes          10           0      4849769, 9699614 (0 hit)   scored
//   23    204     4   yes    yes           2           0      111546332, 223092767 (0 hit)   scored
//   29    258     2   yes    yes           1           0      3234846485, 6469693100 (0 hit)   scored
//   31    348     4   yes    yes           2           0      100280244890, 200560489955 (0 hit)   scored
//
//   The argmax left endpoints in full, up to 48 per level:
//   x=11 m=4: 899, 947, 1319, 1367
//   x=13 m=12: 731, 3851, 6581, 7211, 9941, 13061, 16901, 20021, 22751, 23381, 26111, 29231
//   x=17 m=20: 701, 3011, 33851, 36161, 128981, 185069, 197051, 199361, 230201, 232511, 277889, 280199, 311039, 313349, 325331, 381419, 474239, 476549, 507389, 509699
//   x=19 m=20: 659, 156269, 406169, 1020209, 1218029, 2239049, 2394659, 2644559, 2801639, 4659509, 5040029, 6897899, 7054979, 7304879, 7460489, 8481509, 8679329, 9293369, 9543269, 9698879
//   x=23 m=4: 76166567, 108991247, 114101417, 146926097
//   x=29 m=2: 1205437109, 5264255861
//   x=31 m=4: 8813641451, 69494902091, 131065587689, 191746848329
//
// SEC C — M2: GROSS POSITION OF THE ARGMAX SET
//   x    min s/W    max s/W    mean s/W   forced mean   min |s/W - 1/2|   min s/W among top-K
//   11  0.389177  0.591775  0.490476   0.490476      0.070996          0.030736
//   13  0.024342  0.973393  0.498868   0.498868      0.062804          0.017549
//   17  0.001373  0.998411  0.499892   0.499892      0.044336          0.001373
//   19  0.000068  0.999916  0.499992   0.499992      0.019607          0.000068
//   23  0.341412  0.658587  0.500000   0.500000      0.011453          0.010656
//   29  0.186321  0.813679  0.500000   0.500000      0.313679          0.002690
//   31  0.043945  0.956055  0.500000   0.500000      0.153497          0.016711
//
//   Residue counts of the argmax left endpoints per prime, over the cells of A_p(G2):
//   x=11  p5:[2,2] p7:[0,2,2,0,0] p11:[1,1,0,0,0,0,1,1]
//   x=13  p5:[12] p7:[8,2,2] p11:[2,0,2,2,2,2,0,2,0] p13:[3,0,3,0,0,0,3,0,3]
//   x=17  p5:[10,10] p7:[8,6,6] p11:[0,4,4,2,2,4,4,0] p13:[3,0,0,0,0,3,5,4,5] p17:[0,6,0,4,4,0,6,0,0,0,0,0,0]
//   x=19  p5:[0,0,20] p7:[20,0,0] p11:[0,6,4,0,0,4,6] p13:[0,0,0,0,5,5,5,5,0] p17:[0,0,10,0,0,0,0,0,0,0,10,0,0] p19:[0,0,2,0,8,0,0,0,0,0,0,8,0,2,0,0]
//   x=23  p5:[4] p7:[2,0,2] p11:[1,1,1,0,0,0,1] p13:[2,0,0,1,0,0,1,0,0] p17:[1,0,0,0,1,0,0,0,0,1,0,0,0,1,0] p19:[0,0,0,0,0,1,1,0,0,0,1,1,0,0,0] p23:[0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0]
//   x=29  p5:[1,1] p7:[1,0,1] p11:[0,0,0,0,1,1,0] p13:[0,0,0,0,1,1,0,0,0,0] p17:[0,0,0,1,0,0,0,1,0,0,0,0,0] p19:[0,0,0,0,0,1,0,0,0,0,0,0,0,0,1] p23:[0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0] p29:[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0]
//   x=31  p5:[2,2] p7:[2,0,0,2] p11:[0,2,0,0,0,0,2] p13:[0,2,0,0,0,0,0,2,0] p17:[0,2,0,0,2,0,0,0,0,0,0,0,0] p19:[0,0,0,0,0,0,0,0,0,0,0,2,0,2,0] p23:[0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0] p29:[0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0] p31:[0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0]
//
//   Occupancy of A_p(G2) by the argmax set: cells, empty cells, and the naive expectation from m independent draws:
//   x=11  p5:0/2(exp 0.1) p7:3/5(exp 2.0) p11:4/8(exp 4.7)
//   x=13  p7:0/3(exp 0.0) p11:3/9(exp 2.2) p13:5/9(exp 2.2)
//   x=17  p5:0/2(exp 0.0) p7:0/3(exp 0.0) p11:2/8(exp 0.6) p13:4/9(exp 0.9) p17:9/13(exp 2.6)
//   x=19  p5:2/3(exp 0.0) p7:2/3(exp 0.0) p11:3/7(exp 0.3) p13:5/9(exp 0.9) p17:11/13(exp 2.6) p19:12/16(exp 4.4)
//   x=23  p7:1/3(exp 0.6) p11:3/7(exp 3.8) p13:6/9(exp 5.6) p17:11/15(exp 11.4) p19:11/15(exp 11.4) p23:17/19(exp 15.3)
//   x=29  p5:0/2(exp 0.5) p7:1/3(exp 1.3) p11:5/7(exp 5.1) p13:8/10(exp 8.1) p17:11/13(exp 11.1) p19:13/15(exp 13.1) p23:17/19(exp 17.1) p29:23/25(exp 23.0)
//   x=31  p5:0/2(exp 0.1) p7:2/4(exp 1.3) p11:5/7(exp 3.8) p13:7/9(exp 5.6) p17:11/13(exp 9.4) p19:13/15(exp 11.4) p23:17/19(exp 15.3) p29:23/27(exp 23.2) p31:23/27(exp 23.2)
//
// SEC D — M2 TEST: CHI-SQUARE ON RESIDUE CLASSES AGAINST THE A_p(g) ENDPOINT NULL
//   20000 mirrored replicates, seeded. Control = rejection-sampled real positions s
//   with s and s+G2 both twin slots, scored through the same pipeline.
//   x   set          n    chi2 tot     p(tot)   worst p   p(prime)   0.05/pi(x)   kill-corr +/tot   control p(tot)
//   11  argmax        4      10.000   0.52062     p= 7    0.35713      0.01000      0/1             0.28344
//   11  argmax-thin    2  (n < 4, not tested)
//   11  top-36       36      19.362   0.08985     p= 7    0.03380      0.01000      0/2             0.58972
//   11  top-thin      1  (n < 4, not tested)
//   13  argmax       12      27.000   0.13649     p=13    0.15739      0.00833      0/1             0.56017
//   13  argmax-thin    4      19.500   0.37378     p=13    0.07655      0.00833      0/1             0.90370
//   13  top-128     128     107.664   0.00005     p= 7    0.00005      0.00833      0/1             0.59397
//   13  top-thin      4      22.167   0.49588     p=11    0.29799      0.00833      0/1             0.99835
//   17  argmax       20      74.600   0.00120     p=17    0.00160      0.00714      2/4             0.74231
//   17  argmax-thin    8      35.000   0.23099     p=17    0.15874      0.00714      2/4             0.63097
//   17  top-144     144     387.973   0.00005     p= 7    0.00005      0.00714      3/4             0.86371
//   17  top-thin     11      36.259   0.45443     p=17    0.26794      0.00714      2/4             0.47593
//   19  argmax       20     320.200   0.00005     p= 5    0.00005      0.00625      3/5             0.82396
//   19  argmax-thin    4      83.000   0.00135     p=19    0.02630      0.00625      4/5             0.83781
//   19  top-106     106     525.214   0.00005     p= 5    0.00005      0.00625      3/5             0.86511
//   19  top-thin     19      70.790   0.04060     p= 7    0.01165      0.00625      3/5             0.99480
//   23  argmax        4      70.500   0.21499     p=23    0.10219      0.00556      2/4             0.53257
//   23  argmax-thin    4      70.500   0.21939     p=23    0.10479      0.00556      2/4             0.53492
//   23  top-146     146     436.187   0.00005     p=11    0.00005      0.00556      2/5             0.48418
//   23  top-thin     44     113.967   0.00155     p=23    0.00055      0.00556      1/5             0.32103
//   29  argmax        2  (n < 4, not tested)
//   29  argmax-thin    2  (n < 4, not tested)
//   29  top-128     128     770.706   0.00005     p=13    0.00005      0.00500      2/7             0.95990
//   29  top-thin     44     248.704   0.00005     p=23    0.00005      0.00500      4/7             0.96895
//   31  argmax        4     156.000   0.01840     p=23    0.10049      0.00455      2/7             0.65137
//   31  argmax-thin    4     156.000   0.01760     p=23    0.10614      0.00455      2/7             0.65127
//   31  top-118     118     799.731   0.00005     p= 5    0.00005      0.00455      2/7             0.89556
//   31  top-thin     50     284.743   0.00005     p=23    0.00005      0.00455      3/7             0.94245
//
// SEC E — M2 TEST: GROSS POSITION, KS AGAINST THE MIRRORED UNIFORM NULL
//   x   set          n    KS obs     p(KS)
//   11  argmax        4   0.40823   0.10147
//   11  top-36       36   0.04913   0.99975
//   13  argmax       12   0.09321   0.96726
//   13  top-128     128   0.02700   0.99325
//   17  argmax       20   0.12917   0.45189
//   17  top-144     144   0.01974   1.00000
//   19  argmax       20   0.16116   0.20570
//   19  top-106     106   0.05812   0.45089
//   23  argmax        4   0.34141   0.19645
//   23  top-146     146   0.03457   0.85479
//   29  argmax        2   0.31368   0.74256
//   29  top-128     128   0.04470   0.64584
//   31  argmax        4   0.20605   0.79305
//   31  top-118     118   0.03158   0.95426
//
// SEC F — M3: THE EXTREME TAIL
//   x    G2   N(=G2)   N(>=.95G2)   N(>=.90G2)   D^0.05   D^0.10    2nd, 3rd, 4th largest distinct (value x count)
//   11    42       4            4            4     1.28     1.63    36x4  30x22  24x6
//   13    66      12           12           24     1.44     2.08    60x12  48x20  42x84
//   17   108      20           20           20     1.65     2.72    96x22  90x24  84x12
//   19   150      20           20          106     1.90     3.61    138x86  132x26  126x48
//   23   204       4            6           34     2.21     4.90    198x2  192x8  186x20
//   29   258       2            2           22     2.61     6.81    240x8  234x12  228x22
//   31   348       4            4           72     3.09     9.54    330x34  318x34  312x10
//
//   The whole top of the spectrum, G2 down by 60 in steps of 6 (all gaps are multiples of 6, since every twin slot is 5 mod 6) (value:count):
//   x=11  42:4 36:4 30:22 24:6 18:22 12:56 6:21 0:0
//   x=13  66:12 60:12 54:0 48:20 42:84 36:60 30:270 24:96 18:238 12:504 6:189
//   x=17  108:20 102:0 96:22 90:24 84:12 78:66 72:64 66:286 60:380 54:40 48:474
//   x=19  150:20 144:0 138:86 132:26 126:48 120:142 114:0 108:954 102:16 96:876 90:1236
//   x=23  204:4 198:2 192:8 186:20 180:112 174:6 168:322 162:170 156:310 150:1404 144:0
//   x=29  258:2 252:0 246:0 240:8 234:12 228:22 222:84 216:38 210:442 204:548 198:748
//   x=31  348:4 342:0 336:0 330:34 324:0 318:34 312:10 306:36 300:54 294:46 288:228
//
// SEC G — M4: THE COPYING TEST, PAIRS DIFFERING BY A MULTIPLE OF W/p
//   Null expectation for the NEAR form on a set of size n: C(n,2)*(2*G2+1)*p/W.
//   x   set          n   prime   W/p                exact  near   null(exact)  null(near)
//   11  argmax        4      5                462      0     3   1.30e-2    1.10e+0
//   11  argmax        4      7                330      0     1   1.82e-2    1.55e+0
//   11  argmax        4     11                210      2     2   2.86e-2    2.43e+0
//   11  top-36       36      2               1155      0    40   5.45e-1    4.64e+1
//   11  top-36       36      3                770      0    63   8.18e-1    6.95e+1
//   11  top-36       36      5                462     10   129   1.36e+0    1.16e+2
//   11  top-36       36      7                330     26   169   1.91e+0    1.62e+2
//   11  top-36       36     11                210     81   344   3.00e+0    2.55e+2
//   13  argmax       12      7               4290      0     2   1.54e-2    2.05e+0
//   13  argmax       12     11               2730      4     4   2.42e-2    3.22e+0
//   13  argmax       12     13               2310      6    14   2.86e-2    3.80e+0
//   13  top-128     128      2              15015      0    74   5.41e-1    7.20e+1
//   13  top-128     128      3              10010      0    76   8.12e-1    1.08e+2
//   13  top-128     128      5               6006     20   171   1.35e+0    1.80e+2
//   13  top-128     128      7               4290     24   234   1.89e+0    2.52e+2
//   13  top-128     128     11               2730    188   506   2.98e+0    3.96e+2
//   13  top-128     128     13               2310    260   912   3.52e+0    4.68e+2
//   17  argmax       20     11              46410      4     4   4.09e-3    8.88e-1
//   17  argmax       20     13              39270     10    18   4.84e-3    1.05e+0
//   17  top-144     144      3             170170      0     4   6.05e-2    1.31e+1
//   17  top-144     144      5             102102      2     8   1.01e-1    2.19e+1
//   17  top-144     144      7              72930      9    45   1.41e-1    3.06e+1
//   17  top-144     144     11              46410    173   266   2.22e-1    4.81e+1
//   17  top-144     144     13              39270    268   390   2.62e-1    5.69e+1
//   17  top-144     144     17              30030     38    68   3.43e-1    7.44e+1
//   19  argmax       20     11             881790      8     8   2.15e-4    6.49e-2
//   19  argmax       20     13             746130     10    10   2.55e-4    7.66e-2
//   19  argmax       20     19             510510      4     4   3.72e-4    1.12e-1
//   19  top-106     106      3            3233230      0     2   1.72e-3    5.18e-1
//   19  top-106     106     11             881790     30    32   6.31e-3    1.90e+0
//   19  top-106     106     13             746130     52    64   7.46e-3    2.25e+0
//   19  top-106     106     17             570570     30    40   9.75e-3    2.94e+0
//   19  top-106     106     19             510510     28    28   1.09e-2    3.28e+0
//   23  argmax        4   (no pair at any p <= x, exact or near)
//   23  top-146     146     11           20281170     12    16   5.22e-4    2.13e-1
//   23  top-146     146     13           17160990     43    52   6.17e-4    2.52e-1
//   23  top-146     146     17           13123110     21    26   8.07e-4    3.30e-1
//   23  top-146     146     19           11741730     29    30   9.01e-4    3.69e-1
//   23  top-146     146     23            9699690     36    36   1.09e-3    4.46e-1
//   29  argmax        2   (no pair at any p <= x, exact or near)
//   29  top-128     128      7          924241890      6     6   8.79e-6    4.55e-3
//   29  top-128     128     11          588153930      2     2   1.38e-5    7.14e-3
//   29  top-128     128     13          497668710     17    36   1.63e-5    8.44e-3
//   29  top-128     128     17          380570190     21    22   2.14e-5    1.10e-2
//   29  top-128     128     19          340510170     12    14   2.39e-5    1.23e-2
//   29  top-128     128     23          281291010     24    32   2.89e-5    1.49e-2
//   29  top-128     128     29          223092870     24    32   3.64e-5    1.88e-2
//   31  argmax        4   (no pair at any p <= x, exact or near)
//   31  top-118     118      7        28651498590      2     8   2.41e-7    1.68e-4
//   31  top-118     118     13        15427730010      6     6   4.47e-7    3.12e-4
//   31  top-118     118     17        11797675890     20    32   5.85e-7    4.08e-4
//   31  top-118     118     19        10555815270     20    26   6.54e-7    4.56e-4
//   31  top-118     118     23         8720021310     15    16   7.92e-7    5.52e-4
//   31  top-118     118     29         6915878970      7     8   9.98e-7    6.96e-4
//   31  top-118     118     31         6469693230     16    16   1.07e-6    7.44e-4
//
//   Components of each set under congruence modulo W/p, p <= x. CAVEAT: at small x the
//   modulus W/p is comparable to n*G2 and components merge by chance, so only the large
//   levels carry information; the null(exact) column above prices the chance merging.
//   x=11  argmax m=   4 components=   2   top-36 components=   1
//   x=13  argmax m=  12 components=   4   top-128 components=   4
//   x=17  argmax m=  20 components=   8   top-144 components=  11
//   x=19  argmax m=  20 components=   4   top-106 components=  19
//   x=23  argmax m=   4 components=   4   top-146 components=  44
//   x=29  argmax m=   2 components=   2   top-128 components=  44
//   x=31  argmax m=   4 components=   4   top-118 components=  50
//
// SEC H — M4: SPACING OF THE TOP-K WINDOWS AGAINST THE MIRRORED UNIFORM NULL
//   x     n   min spacing/W    p(min)    #spacings < W/(10n)   p(count)
//   11    36   1.299e-2      1.00000         0                1.00000
//   13   128   1.399e-3      1.00000         0                1.00000
//   17   144   3.173e-4      0.96776         8                0.91852
//   19   106   1.516e-4      0.57511         3                0.96901
//   23   146   3.752e-5      0.32692         8                0.92877
//   29   128   1.361e-4      0.67733        16                0.25069
//   31   118   3.041e-4      0.89203        16                0.16796
//
// SEC I — PRICE OF THE LEVELS NOT RUN
//   aggregated throughput on this run: 14.97e9 positions/s
//   x=41  W=304250263527210  5.65 h at the measured rate
//   x=43  W=13082761331670030  EXCEEDS 2^53 = 9007199254740991: this engine cannot address it in doubles
//
// DONE
// ============================================================================
// READINGS
//
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --tail 3 research/history/staging/measure-0904-argmax.js -- --stage run --levels 37
//   invocation:  node research/history/staging/measure-0904-argmax.js --stage run --levels 37
//   code-sha256: d53a3fd1ace221b8c95b0aad6cf5ce3b2afcc85a6af831a6e818accc3b3671d0
//   out-sha256:  e3e990410c0b1aefe64a39d53f12d3b55a2718d68b02eb1d1126b6d57c3a182a
//   body-lines:  73
//   forced:      2026-09-04, 3 of 88 figures in the replaced block not reproduced (first: 569.5, 13.03e9, 6.49)
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-04
//   elapsed:     525.8 s
// ============================================================================
// measure-0904-argmax.js --stage run --levels 37 --workers 8
//
// SEC A — SELF-TESTS, EVERY LEVEL EXHAUSTIVE OVER THE WHOLE PERIOD
//   x    W                 D (slots)         count=D  sum g=W  ngaps=D   max  ladder   ok    secs
//   37      7420738134810    217929355875    yes      yes     yes     528    528    ok    523.6
//
// SEC B — M1: MULTIPLICITY OF THE MAXIMUM, AND THE MIRROR
//   tau_G(s) = W - 2 - G - s (mod W). The argmax set must be tau-invariant.
//   x    G2     m   even  tau-inv  mirror pairs  self-paired   fixed points of tau            status
//   37    528     2   yes    yes           1           0      3710369067140, 7420738134545 (0 hit)   scored
//
//   The argmax left endpoints in full, up to 48 per level:
//   x=37 m=2: 544899485411, 6875838648869
//
// SEC C — M2: GROSS POSITION OF THE ARGMAX SET
//   x    min s/W    max s/W    mean s/W   forced mean   min |s/W - 1/2|   min s/W among top-K
//   37  0.073429  0.926571  0.500000   0.500000      0.426571          0.010620
//
//   Residue counts of the argmax left endpoints per prime, over the cells of A_p(G2):
//   x=37  p5:[1,1] p7:[2,0,0] p11:[0,0,1,0,0,1,0,0,0] p13:[0,0,0,0,0,2,0,0,0] p17:[0,0,0,0,1,0,0,0,1,0,0,0,0] p19:[0,0,0,1,0,0,0,0,0,0,0,0,1,0,0] p23:[0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0] p29:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1] p31:[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0] p37:[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
//
//   Occupancy of A_p(G2) by the argmax set: cells, empty cells, and the naive expectation from m independent draws:
//   x=37  p5:0/2(exp 0.5) p7:2/3(exp 1.3) p11:7/9(exp 7.1) p13:8/9(exp 7.1) p17:11/13(exp 11.1) p19:13/15(exp 13.1) p23:17/19(exp 17.1) p29:23/25(exp 23.0) p31:25/27(exp 25.0) p37:31/33(exp 31.0)
//
// SEC D — M2 TEST: CHI-SQUARE ON RESIDUE CLASSES AGAINST THE A_p(g) ENDPOINT NULL
//   20000 mirrored replicates, seeded. Control = rejection-sampled real positions s
//   with s and s+G2 both twin slots, scored through the same pipeline.
//   x   set          n    chi2 tot     p(tot)   worst p   p(prime)   0.05/pi(x)   kill-corr +/tot   control p(tot)
//   37  argmax        2  (n < 4, not tested)
//   37  argmax-thin    2  (n < 4, not tested)
//   37  top-124     124    1588.540   0.00005     p= 7    0.00005      0.00417      4/6             0.50112
//   37  top-thin     46     441.843   0.00005     p=37    0.00005      0.00417      4/6             0.21079
//
// SEC E — M2 TEST: GROSS POSITION, KS AGAINST THE MIRRORED UNIFORM NULL
//   x   set          n    KS obs     p(KS)
//   37  argmax        2   0.42657   0.28168
//   37  top-124     124   0.04777   0.58610
//
// SEC F — M3: THE EXTREME TAIL
//   x    G2   N(=G2)   N(>=.95G2)   N(>=.90G2)   D^0.05   D^0.10    2nd, 3rd, 4th largest distinct (value x count)
//   37   528       2            6            6     3.69    13.61    510x4  462x2  432x2
//
//   The whole top of the spectrum, G2 down by 60 in steps of 6 (all gaps are multiples of 6, since every twin slot is 5 mod 6) (value:count):
//   x=37  528:2 522:0 516:0 510:4 504:0 498:0 492:0 486:0 480:0 474:0 468:0
//
// SEC G — M4: THE COPYING TEST, PAIRS DIFFERING BY A MULTIPLE OF W/p
//   Null expectation for the NEAR form on a set of size n: C(n,2)*(2*G2+1)*p/W.
//   x   set          n   prime   W/p                exact  near   null(exact)  null(near)
//   37  argmax        2   (no pair at any p <= x, exact or near)
//   37  top-124     124      7      1060105447830      2     2   7.19e-9    7.60e-6
//   37  top-124     124     13       570826010370      8    14   1.34e-8    1.41e-5
//   37  top-124     124     17       436514007930      2     6   1.75e-8    1.85e-5
//   37  top-124     124     19       390565164990     19    20   1.95e-8    2.06e-5
//   37  top-124     124     23       322640788470      5     6   2.36e-8    2.50e-5
//   37  top-124     124     29       255887521890     34    36   2.98e-8    3.15e-5
//   37  top-124     124     31       239378649510     14    14   3.19e-8    3.37e-5
//   37  top-124     124     37       200560490130     14    16   3.80e-8    4.02e-5
//
//   Components of each set under congruence modulo W/p, p <= x. CAVEAT: at small x the
//   modulus W/p is comparable to n*G2 and components merge by chance, so only the large
//   levels carry information; the null(exact) column above prices the chance merging.
//   x=37  argmax m=   2 components=   2   top-124 components=  46
//
// SEC H — M4: SPACING OF THE TOP-K WINDOWS AGAINST THE MIRRORED UNIFORM NULL
//   x     n   min spacing/W    p(min)    #spacings < W/(10n)   p(count)
//   37   124   2.102e-5      0.14946        15                0.22744
//
// SEC I — PRICE OF THE LEVELS NOT RUN
//   aggregated throughput on this run: 14.17e9 positions/s
//   x=41  W=304250263527210  5.96 h at the measured rate
//   x=43  W=13082761331670030  EXCEEDS 2^53 = 9007199254740991: this engine cannot address it in doubles
//
// DONE
// ============================================================================
// READINGS
//
