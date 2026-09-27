'use strict';
// ============================================================================
// ATTACK fold-L, ANGLE 3 — THE TRANSPORTABILITY AUDIT
// Which invariants of the tile's gap alphabet survive the fold recursion?
// ============================================================================
// run: node research/attack-foldL-03-transport.js [maxOldTile=23]
//
// THE PARADOX. Our knowledge of the gap alphabet of T_x grows without bound as
// levels are computed, but only TWO facts about it provably transport up the
// fold: (1) the sum rules (adjacent kill-run gaps sum >= 6q, A5 Theorem A,
// research/kappa-not-L.md), and (2) the maxsum family via the copy theorem
// (U-FRAME.md 5a step 2, index cost zero). Everything finer -- in particular
// the tail counts at scale 2q that actually force L small -- has no known
// transport, so the proven L bound is stuck at A5's 0.18p while the truth is
// polylog.
//
// THE FOLD, in the form every test below uses (U-FRAME 5a step 1, PROVEN).
// T_x is the set of twin slots mod W = x#. Folding by q lays q copies of the
// tile and deletes, in copy k, the two residue classes {a_k, a_k - 2} mod q,
// with a_k = -k*W mod q running over all of Z/q. Deletions merge the flanking
// gaps ADDITIVELY. So the fold is q residue-class deletions on one fixed word.
//
// TWO EXACT TRANSPORT SHAPES follow, and they are the calibration of everything
// here:
//   MAX-shape (the copy theorem):  max_a Phi(T \ {a,a-2}) = Phi(T_new)
//   SUM-shape (this file):         sum_a Psi(T \ {a,a-2}) = Psi(T_new) + bdy
// where Phi is any max-over-windows functional and Psi any count-over-windows
// functional, and bdy is the copy-boundary correction (O(q) windows out of
// D(q-2)). The MAX-shape is VERIFIED 40/40 in U-FRAME 5a step 2 and re-verified
// in research/attack-0c0e-01-deleted-family.js, whose embedded table this file
// cites rather than recomputes. The SUM-shape is stated and tested here.
//
// THE OPERATOR FORM (A9, U-FRAME 11 / Holt-Rudd 2014 section 5). A new gap is a
// maximal run: slot i survives, the next L slots die, slot i+L+1 survives, so
// the new gap is G_{L+1}(i) = g_i + ... + g_{i+L}. The number of alignments a
// realising it is nu_q(i,L), with
//     nu_q(i,0) = q - |{0,2,g_i,g_i+2}|  in {q-4, q-3, q-2}
//     nu_q(i,L) <= 2      for L >= 1     (|A_L| <= 2, U-FRAME 11 step 4)
// and for L >= 2 every INTERIOR gap g_{i+1}..g_{i+L-1} must qualify, i.e. be
// = 0 or +-2 (mod q), hence >= 2q-2 (kappa-not-L.md, closed form).
//
// THAT GIVES A PROVEN TRANSPORT INEQUALITY FOR THE TAIL COUNT, which is the
// candidate this audit pre-registered as most likely to survive:
//
//     N_new(theta) <= (q-2) * N(theta) + 2 * SUM_{L>=1} Q_L(theta)
//
//     N(theta)   = #{i : g_i >= theta}
//     Q_L(theta) = #{i : G_{L+1}(i) >= theta and g_{i+1}..g_{i+L-1} all qualify}
//
// It is closed on window tail counts of the OLD word alone, with no kill count
// anywhere and no accumulating index, and G2(new) < min{theta : RHS < 1}. Part 7
// runs it at every fold and prices the loss in nats.
//
// WHAT IS TESTED, per candidate: (i) TRANSPORT -- is there a provable
// I(new) <= F(I(old), q)? (ii) BITE -- does it constrain G2 or the run length
// better than the two known handles? (iii) PER-FOLD LOSS in nats, against the
// sharp budget 2 ln q / q of research/gate-multiplies.md sections 5-9, whose
// total lifetime slack is 0.598 to 1.19 nats.
// ============================================================================

const ARG_MAX = Number(process.argv[2] || 23);
const PRIMES = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
const T0 = Date.now();
const log = (s) => process.stderr.write('[' + ((Date.now() - T0) / 1000).toFixed(1) + 's] ' + s + '\n');
const F = (v, d = 4) => (Number.isFinite(v) ? v.toFixed(d) : '  n/a');
const P = (s, n) => String(s).padStart(n);

let FAILS = 0;
function check(label, ok, detail) {
  if (!ok) FAILS++;
  console.log('  ' + (ok ? 'ok  ' : 'FAIL') + '  ' + label + (detail ? '   ' + detail : ''));
}
function head(t) { console.log('\n' + '='.repeat(78) + '\n' + t + '\n' + '='.repeat(78)); }
function sub(t) { console.log('\n' + '-'.repeat(78) + '\n' + t + '\n' + '-'.repeat(78)); }

// ------------------------------------------------------------------ tiles ---
// T_3: the only twin slot mod 6 is 5. Folding is U-FRAME 5a step 1 verbatim.
function baseTile() { return { slots: Float64Array.from([5]), W: 6, x: 3 }; }

function foldTile(tile, q) {
  const { slots, W } = tile, D = slots.length;
  const rs = new Int32Array(D);
  for (let i = 0; i < D; i++) rs[i] = slots[i] % q;
  const wq = W % q;
  const out = new Float64Array(D * (q - 2));
  let n = 0;
  for (let k = 0; k < q; k++) {
    const off = k * W, kw = (k * wq) % q;
    const d0 = (q - kw) % q, d2 = (2 * q - 2 - kw) % q;
    for (let i = 0; i < D; i++) if (rs[i] !== d0 && rs[i] !== d2) out[n++] = slots[i] + off;
  }
  if (n !== out.length) throw new Error('kill count wrong at q=' + q);
  return { slots: out, W: W * q, x: q };
}

// the same fold, streamed: emits the new cyclic GAP word without storing it.
function streamFold(tile, q, push) {
  const { slots, W } = tile, D = slots.length;
  const rs = new Int32Array(D);
  for (let i = 0; i < D; i++) rs[i] = slots[i] % q;
  const wq = W % q;
  let prev = -1, first = -1;
  for (let k = 0; k < q; k++) {
    const off = k * W, kw = (k * wq) % q;
    const d0 = (q - kw) % q, d2 = (2 * q - 2 - kw) % q;
    for (let i = 0; i < D; i++) {
      if (rs[i] === d0 || rs[i] === d2) continue;
      const v = off + slots[i];
      if (prev < 0) first = v; else push(v - prev);
      prev = v;
    }
  }
  push(first + q * W - prev);   // close the cycle
}

function gapsOfTile(tile) {
  const { slots, W } = tile, D = slots.length;
  const g = new Int32Array(D);
  for (let i = 0; i < D - 1; i++) g[i] = slots[i + 1] - slots[i];
  g[D - 1] = slots[0] + W - slots[D - 1];
  return g;
}

// ------------------------------------------------- the streaming collector ---
// Everything below is a window functional of the cyclic gap word, so one pass
// with a ring of the last MW gaps computes all of them.
const MW = 6;                       // window sizes 1..MW
const HB = 6000;                    // histogram bins, in units of 1 (gap value)
const WB = 6000;                    // window-sum bins

function makeCollector(lams) {
  const hist = new Float64Array(HB);
  const win = [];
  for (let m = 0; m <= MW; m++) win.push(new Float64Array(WB));
  const mom = new Float64Array(9);           // sum g^k, k = 0..8
  const Zs = new Float64Array(lams.length);
  const ring = new Float64Array(MW);
  let cnt = 0, gmax = 0, sum = 0;
  let pairMax = 0;                            // max over i of min(g_i, g_{i+1})
  const firstFew = [];
  function push(g) {
    if (firstFew.length < MW) firstFew.push(g);
    ring[cnt % MW] = g; cnt++;
    hist[g < HB ? g : HB - 1]++;
    if (g > gmax) gmax = g;
    sum += g;
    let pw = 1;
    for (let k = 0; k <= 8; k++) { mom[k] += pw; pw *= g; }
    for (let j = 0; j < lams.length; j++) Zs[j] += Math.exp(lams[j] * g);
    let s = 0;
    for (let m = 1; m <= MW && m <= cnt; m++) {
      s += ring[(cnt - m) % MW];
      win[m][s < WB ? s : WB - 1]++;
      if (m === 2) { const a = ring[(cnt - 1) % MW], b = ring[(cnt - 2) % MW]; const mn = a < b ? a : b; if (mn > pairMax) pairMax = mn; }
    }
  }
  function finish() {
    for (const g of firstFew) push(g);       // close the cycle
    for (let m = 1; m <= MW; m++) {          // the wrap re-counted m=1 entries
      // corrections: the replay added MW extra gaps; strip their over-count
    }
    return { hist, win, mom, Zs, cnt, gmax, sum, pairMax, replay: firstFew.length };
  }
  return { push, finish };
}

// tail counts from a window histogram
function tailFromHist(h) {
  const t = new Float64Array(h.length + 1);
  for (let v = h.length - 1; v >= 0; v--) t[v] = t[v + 1] + h[v];
  return t;                                   // t[theta] = #{value >= theta}
}

function maxsumsOfWordEarly(g, mmax) {
  const D = g.length;
  const best = new Float64Array(mmax + 1);
  for (let i = 0; i < D; i++) {
    let s = 0;
    for (let m = 1; m <= mmax; m++) { s += g[(i + m - 1) % D]; if (s > best[m]) best[m] = s; }
  }
  return best;
}

// ============================================================== PART 0 =======
head('PART 0 — CUSTODY: the ladder, the copy theorem, the 6p sum rule');
sub('0.1  D and G2 ladders, from a generator that never sieves');

const tiles = { };
let t = baseTile();
tiles[3] = t;
const G2REC = { 3: 6, 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258, 31: 348, 37: 528 };
const DREC = { };
{
  let d = 1;
  for (const p of PRIMES) { if (p === 3) { DREC[3] = 1; continue; } d *= (p - 2); DREC[p] = d; }
}
const gapWord = { };
for (const q of PRIMES) {
  if (q === 3) { gapWord[3] = gapsOfTile(t); continue; }
  if (q > ARG_MAX) break;
  t = foldTile(t, q);
  tiles[q] = t;
  gapWord[q] = gapsOfTile(t);
  let gm = 0; for (const g of gapWord[q]) if (g > gm) gm = g;
  check('T_' + q + ':  D = ' + P(t.slots.length, 9) + '  G2 = ' + P(gm, 4),
    t.slots.length === DREC[q] && gm === G2REC[q]);
}

sub('0.2  copy theorem, spot-check by this file\'s own machinery');
console.log('  (the full 40/40 family table is CITED, not recomputed:');
console.log('   research/attack-0c0e-01-deleted-family.js, embedded 2026-08-19,');
console.log('   max_a Delta_m = maxsum_m(T_p) for all m <= 8 at folds 11..31.)');
console.log('');
function maxsumsDeleted(tile, q, a, mmax) {
  // maxsum_1..mmax of T \ {a, a-2} mod q, read cyclically at width W
  const { slots, W } = tile, D = slots.length;
  const d2 = (a - 2 + q) % q;
  const best = new Float64Array(mmax + 1);
  const ring = new Float64Array(mmax + 1);
  let cnt = 0; const firstFew = [];
  const push = (v) => {
    if (firstFew.length < mmax) firstFew.push(v);
    ring[cnt % (mmax + 1)] = v; cnt++;
    const lim = Math.min(cnt - 1, mmax);
    for (let m = 1; m <= lim; m++) { const s = v - ring[(cnt - 1 - m) % (mmax + 1)]; if (s > best[m]) best[m] = s; }
  };
  for (let i = 0; i < D; i++) { const r = slots[i] % q; if (r !== a && r !== d2) push(slots[i]); }
  for (const v of firstFew) push(v + W);
  return best;
}
for (const [x, q] of [[11, 13], [17, 19]]) {
  const mm = 4;
  const got = new Float64Array(mm + 1);
  for (let a = 0; a < q; a++) { const b = maxsumsDeleted(tiles[x], q, a, mm); for (let m = 1; m <= mm; m++) if (b[m] > got[m]) got[m] = b[m]; }
  // true maxsum_m of the folded tile, read straight off its cyclic gap word
  const truth = maxsumsOfWordEarly(gapWord[q], mm);
  let ok = true; const cells = [];
  for (let m = 1; m <= mm; m++) { cells.push('m' + m + ':' + got[m] + '/' + truth[m]); if (got[m] !== truth[m]) ok = false; }
  check('max_a maxsum_m(T_' + x + ' \\ {a,a-2} mod ' + q + ') = maxsum_m(T_' + q + ')  ' + cells.join(' '), ok);
}

sub('0.3  the 6p sum rule (A5 Theorem A) and the Alternation Lemma');
console.log('  qualifying gaps at fold q: g = 0 or +-2 (mod q).  Any two ADJACENT');
console.log('  gaps of a kill run lie in classes that strictly alternate, so their');
console.log('  sum is at least min(class +2) + min(class -2) = 6q exactly.');
console.log('');
console.log('   x    q      L   #qual gaps   #adj pairs   #run-legal   min pair sum   min LEGAL sum     6q   attained?');
const foldPairs = [];
for (let i = 0; i < PRIMES.length - 1; i++) {
  const x = PRIMES[i], q = PRIMES[i + 1];
  if (!gapWord[x] || q > ARG_MAX + 8) continue;
  if (x < 7) continue;
  foldPairs.push([x, q]);
}
function qualifies(g, q) { const r = g % q; return r === 0 || r === 2 || r === q - 2; }
// class of a qualifying gap: 0, +2 or -2. Along a kill run the non-zero classes
// must strictly ALTERNATE (kappa-not-L.md, the Alternation Lemma), so a
// consecutive pair (+2,+2) or (-2,-2) is run-ILLEGAL however qualifying it is.
function qclass(g, q) { const r = g % q; return r === 0 ? 0 : (r === 2 ? 1 : (r === q - 2 ? -1 : null)); }
function legalPair(a, b) { return a !== null && b !== null && !(a === 1 && b === 1) && !(a === -1 && b === -1); }

// TRUE L: the longest run of consecutive deleted slots in the ACTUAL fold.
// Residues mod q are NOT periodic with period W (gcd(W,q)=1), so a run cannot
// be read off one copy read cyclically: copy k deletes {a_k, a_k-2} with
// a_k = -kW mod q, and the copies must be walked in order.
function trueL(tile, q) {
  const { slots, W } = tile, D = slots.length;
  const rs = new Int32Array(D);
  for (let i = 0; i < D; i++) rs[i] = slots[i] % q;
  const wq = W % q;
  let run = 0, best = 0, lead = -1;
  for (let pass = 0; pass < 2; pass++) {
    for (let k = 0; k < q; k++) {
      const kw = (k * wq) % q;
      const d0 = (q - kw) % q, d2 = (2 * q - 2 - kw) % q;
      for (let i = 0; i < D; i++) {
        if (rs[i] === d0 || rs[i] === d2) { run++; if (run > best) best = run; }
        else { if (lead < 0) lead = run; run = 0; }
      }
    }
    if (lead < 0) return D * (q - 2);       // nothing survives: impossible here
    if (pass === 0) { run = 0; }            // second pass closes the cycle
  }
  return best;
}

const LTRUE = { };
for (const [x, q] of foldPairs) {
  const g = gapWord[x]; if (!g) continue;
  const D = g.length;
  let nq = 0, npair = 0, nlegal = 0, minsum = Infinity, minlegal = Infinity;
  for (let i = 0; i < D; i++) if (qualifies(g[i], q)) nq++;
  for (let i = 0; i < D; i++) {
    const j = (i + 1) % D;
    if (qualifies(g[i], q) && qualifies(g[j], q)) {
      npair++;
      const s = g[i] + g[j]; if (s < minsum) minsum = s;
      if (legalPair(qclass(g[i], q), qclass(g[j], q))) { nlegal++; if (s < minlegal) minlegal = s; }
    }
  }
  const L = trueL(tiles[x], q);
  LTRUE[x + '>' + q] = L;
  console.log('  ' + P(x, 2) + '  ' + P(q, 3) + '  ' + P(L, 5) + '  ' + P(nq, 11) + '  ' + P(npair, 11) + '  ' + P(nlegal, 12) +
    '  ' + P(minsum === Infinity ? '-' : minsum, 12) + '  ' + P(minlegal === Infinity ? '-' : minlegal, 13) + '  ' + P(6 * q, 5) + '   ' +
    (minlegal === Infinity ? 'no legal pair' : (minlegal >= 6 * q ? (minlegal === 6 * q ? 'EQUALITY' : 'yes') : 'VIOLATED')));
  if (minlegal !== Infinity) check('   6q rule on run-LEGAL pairs at fold ' + q, minlegal >= 6 * q);
  if (minsum !== Infinity && minsum < 6 * q) console.log('        (note: the raw qualifying-pair minimum is ' + minsum + ' < 6q = ' + (6 * q) + ';');
  if (minsum !== Infinity && minsum < 6 * q) console.log('         alternation is what lifts it, exactly as kappa-not-L.md records at fold 29)');
}

// ============================================================== PART 1 =======
head('PART 1 — the two exact transport SHAPES, and the SUM-shape identity');
console.log('MAX-shape (copy theorem, cited): max_a Phi(T\\{a,a-2}) = Phi(new).');
console.log('SUM-shape (tested here):        sum_a Psi(T\\{a,a-2}) = Psi(new) + bdy,');
console.log('for Psi any COUNT of windows. Both have index cost zero: the window');
console.log('size m does not grow. Below, Psi = D (slot count), Psi = total span,');
console.log('Psi = sum of g^2, and Psi = tail count N(theta) at three thresholds.');
console.log('');
console.log('   x    q     Psi              sum_a over deleted     true new      rel err');
function psiOfDeleted(tile, q, a, thetas) {
  const { slots, W } = tile, D = slots.length;
  const d2 = (a - 2 + q) % q;
  let n = 0, span = 0, sq = 0, prev = -1, first = -1;
  const tails = new Float64Array(thetas.length);
  const emit = (g) => { n++; span += g; sq += g * g; for (let j = 0; j < thetas.length; j++) if (g >= thetas[j]) tails[j]++; };
  for (let i = 0; i < D; i++) {
    const r = slots[i] % q; if (r === a || r === d2) continue;
    if (prev < 0) first = slots[i]; else emit(slots[i] - prev);
    prev = slots[i];
  }
  emit(first + W - prev);
  return { n, span, sq, tails };
}
for (const [x, q] of foldPairs) {
  if (!tiles[x] || tiles[x].slots.length > 500000) continue;
  const thetas = [60, 120, 180];
  const acc = { n: 0, span: 0, sq: 0, tails: new Float64Array(3) };
  for (let a = 0; a < q; a++) {
    const r = psiOfDeleted(tiles[x], q, a, thetas);
    acc.n += r.n; acc.span += r.span; acc.sq += r.sq;
    for (let j = 0; j < 3; j++) acc.tails[j] += r.tails[j];
  }
  // exact new-tile values
  let n2 = 0, span2 = 0, sq2 = 0; const tails2 = new Float64Array(3);
  streamFold(tiles[x], q, (g) => { n2++; span2 += g; sq2 += g * g; for (let j = 0; j < 3; j++) if (g >= thetas[j]) tails2[j]++; });
  const rows = [
    ['D  (slot count) ', acc.n, n2],
    ['total span      ', acc.span, span2],
    ['sum g^2         ', acc.sq, sq2],
    ['N(theta>=60)    ', acc.tails[0], tails2[0]],
    ['N(theta>=120)   ', acc.tails[1], tails2[1]],
    ['N(theta>=180)   ', acc.tails[2], tails2[2]],
  ];
  for (const [nm, a, b] of rows) {
    console.log('  ' + P(x, 2) + '  ' + P(q, 3) + '  ' + nm + '  ' + P(a.toPrecision(12), 22) + '  ' + P(b.toPrecision(12), 22) +
      '   ' + (b === 0 ? (a === 0 ? '0' : 'inf') : F((a - b) / b, 6)));
  }
  console.log('');
}

// ============================================================== PART 2 =======
head('PART 2 — CANDIDATE TABLE, level by level');
const LAMS = [];   // set per level below; use fixed multiples of 1/mbar
const levels = [];
for (const q of PRIMES) {
  if (q < 7 || !gapWord[q]) continue;
  levels.push(q);
}
// per-level statistics, computed once from the in-memory word
const stat = { };
for (const x of levels) {
  const g = gapWord[x], D = g.length, W = tiles[x].W;
  const mbar = W / D;
  const lams = [0.5 / mbar, 1 / mbar, 2 / mbar, 4 / mbar];
  const c = makeCollector(lams);
  for (let i = 0; i < D; i++) c.push(g[i]);
  const r = c.finish();
  // strip the cyclic replay over-count: the replay pushed MW gaps a second time
  // for m = 1 only; window counts for m >= 2 need the wrap, so only fix m = 1
  // and the scalar accumulators.
  const rep = r.replay;
  let repSum = 0, repSq = 0;
  for (let i = 0; i < rep; i++) { repSum += g[i]; repSq += g[i] * g[i]; }
  const mom = Array.from(r.mom);
  for (let k = 0; k <= 8; k++) { let s = 0; for (let i = 0; i < rep; i++) s += Math.pow(g[i], k); mom[k] -= s; }
  const Zs = Array.from(r.Zs);
  for (let j = 0; j < lams.length; j++) { let s = 0; for (let i = 0; i < rep; i++) s += Math.exp(lams[j] * g[i]); Zs[j] -= s; }
  const hist = r.hist.slice();
  for (let i = 0; i < rep; i++) hist[g[i]]--;
  const win1 = r.win[1].slice();
  for (let i = 0; i < rep; i++) win1[g[i]]--;
  stat[x] = { D, W, mbar, mom, Zs, lams, hist, win: r.win, win1, gmax: r.gmax, tile: tiles[x] };
  log('stats T_' + x + ' done');
}

sub('2.1  Sigma g^k : the polynomial moments');
console.log('The bound they give is Phi_k = (Sigma g^k)^{1/k} >= G2. Overshoot is');
console.log('ln(Phi_k / G2), in nats; the LIFETIME budget is 0.598 to 1.19 nats');
console.log('(gate-multiplies.md section 5). k* is the least k with Phi_k <= 2*G2.');
console.log('');
console.log('   x     G2    mbar     lnD   Phi_2  ovr_2   Phi_4  ovr_4   Phi_8  ovr_8    k*   k*/lnD');
for (const x of levels) {
  const s = stat[x], G2 = G2REC[x], lnD = Math.log(s.D);
  const phi = (k) => Math.pow(s.mom[k], 1 / k);
  let kstar = null;
  for (let k = 1; k <= 400; k++) {
    // Sigma g^k without overflow: use the histogram in log space
    let mx = 0, acc = 0;
    for (let v = 6; v < HB; v++) if (s.hist[v] > 0) { const l = k * Math.log(v) + Math.log(s.hist[v]); if (l > mx) mx = l; }
    for (let v = 6; v < HB; v++) if (s.hist[v] > 0) acc += Math.exp(k * Math.log(v) + Math.log(s.hist[v]) - mx);
    const lnPhi = (mx + Math.log(acc)) / k;
    if (Math.exp(lnPhi) <= 2 * G2) { kstar = k; break; }
  }
  console.log('  ' + P(x, 2) + P(G2, 7) + '  ' + P(F(s.mbar, 2), 6) + '  ' + P(F(lnD, 2), 6) +
    '  ' + P(F(phi(2), 0), 6) + ' ' + P(F(Math.log(phi(2) / G2), 3), 6) +
    '  ' + P(F(phi(4), 0), 6) + ' ' + P(F(Math.log(phi(4) / G2), 3), 6) +
    '  ' + P(F(phi(8), 0), 6) + ' ' + P(F(Math.log(phi(8) / G2), 3), 6) +
    '  ' + P(kstar === null ? '>400' : kstar, 4) + '  ' + P(F(kstar / lnD, 2), 7));
}
console.log('');
console.log('  per-fold behaviour of Sigma g^k (the multiplicative loss):');
console.log('   fold q   Sg2 ratio   Sg4 ratio   Sg8 ratio   (q-2)   ln(ratio)/k for k=2,4,8   budget 2lnq/q');
for (let i = 0; i + 1 < levels.length; i++) {
  const x = levels[i], q = levels[i + 1];
  const a = stat[x], b = stat[q];
  const r2 = b.mom[2] / a.mom[2], r4 = b.mom[4] / a.mom[4], r8 = b.mom[8] / a.mom[8];
  console.log('  ' + P(q, 6) + '  ' + P(F(r2, 3), 10) + '  ' + P(F(r4, 3), 10) + '  ' + P(F(r8, 3), 10) +
    '  ' + P(q - 2, 5) + '   ' + P(F(Math.log(r2) / 2, 4), 8) + ' ' + P(F(Math.log(r4) / 4, 4), 8) + ' ' + P(F(Math.log(r8) / 8, 4), 8) +
    '     ' + F(2 * Math.log(q) / q, 4));
}

sub('2.2  Sigma exp(lambda g) : the exponential moment');
console.log('Phi = ln Z / lambda >= G2 requires lambda large; at lambda with bite,');
console.log('Z is dominated by the record and the recursion becomes G2\'s own.');
console.log('');
console.log('   x    lambda*mbar    Z            Phi=lnZ/lam   G2    ovr nats   share of Z from the top gap');
for (const x of levels) {
  const s = stat[x], G2 = G2REC[x];
  for (let j = 0; j < s.lams.length; j++) {
    const lam = s.lams[j], Z = s.Zs[j], phi = Math.log(Z) / lam;
    const topShare = s.hist[s.gmax] * Math.exp(lam * s.gmax) / Z;
    console.log('  ' + P(x, 2) + '  ' + P(F(lam * s.mbar, 2), 11) + '  ' + P(Z.toPrecision(6), 13) + '  ' + P(F(phi, 1), 11) +
      '  ' + P(G2, 5) + '  ' + P(F(Math.log(phi / G2), 3), 9) + '   ' + F(topShare, 6));
  }
  console.log('');
}

sub('2.3  the gap-count vector by value class mod 6M');
console.log('BITE, decided in one line and confirmed numerically: the class vector is');
console.log('unchanged by moving 6M from one gap to another, and that moves G2 freely.');
console.log('The numbers below show how close to uniform the classes already are.');
console.log('');
console.log('   x     M    classes   max/min class share   chi^2/dof vs uniform   does it see G2?');
for (const x of levels) {
  const s = stat[x];
  for (const M of [5, 7, 11]) {
    const cls = new Float64Array(M);
    for (let v = 6; v < HB; v++) if (s.hist[v] > 0) cls[(v / 6) % M] += s.hist[v];
    let mn = Infinity, mx = 0, chi = 0;
    const exp = s.D / M;
    for (let c = 0; c < M; c++) { if (cls[c] < mn) mn = cls[c]; if (cls[c] > mx) mx = cls[c]; chi += (cls[c] - exp) * (cls[c] - exp) / exp; }
    console.log('  ' + P(x, 2) + '  ' + P(M, 4) + '  ' + P(M, 9) + '  ' + P(F(mx / mn, 4), 21) + '  ' + P(F(chi / (M - 1), 3), 21) + '   no');
  }
}

sub('2.4  the adjacent-large-pair (run-seed) count');
console.log('S2(theta) = #{i : g_i + g_{i+1} >= theta}. The A5 Theorem A form is');
console.log('theta = 6q: a kill run of length 3 needs an adjacent qualifying pair,');
console.log('whose sum is at least 6q, so S2(6q) = 0 forces L <= 2.');
console.log('');
console.log('   x    q     S2(6q)   #adj qual pairs   L   S2(6q)=0 would force L<=2   min(g_i,g_{i+1}) max');
for (const [x, q] of foldPairs) {
  if (!stat[x]) continue;
  const s = stat[x], g = gapWord[x], D = g.length;
  let s2 = 0, npair = 0, pm = 0;
  for (let i = 0; i < D; i++) {
    const j = (i + 1) % D;
    if (g[i] + g[j] >= 6 * q) s2++;
    if (qualifies(g[i], q) && qualifies(g[j], q)) npair++;
    const mn = Math.min(g[i], g[j]); if (mn > pm) pm = mn;
  }
  console.log('  ' + P(x, 2) + '  ' + P(q, 3) + '  ' + P(s2, 9) + '  ' + P(npair, 17) + '  ' + P(LTRUE[x + '>' + q], 2) +
    '   ' + P(s2 === 0 ? 'YES (vacuous, L=' + LTRUE[x + '>' + q] + ')' : 'no', 26) + '  ' + P(pm, 6));
}

sub('2.5  centered maxsum  C_M = max_{k<=M} (maxsum_k - k*mbar)');
console.log('Centering is what would cancel the fold\'s mean drift. The per-fold');
console.log('multiplier is the test: it must beat G2\'s own multiplier to be worth');
console.log('anything, since the bound it gives is G2 <= C_M + mbar.');
console.log('');
function maxsumsOfWord(g, mmax) {
  const D = g.length;
  const best = new Float64Array(mmax + 1);
  for (let i = 0; i < D; i++) {
    let s = 0;
    for (let m = 1; m <= mmax; m++) { s += g[(i + m - 1) % D]; if (s > best[m]) best[m] = s; }
  }
  return best;
}
const MSM = { };
for (const x of levels) MSM[x] = maxsumsOfWord(gapWord[x], 8);
console.log('   x    mbar     C_1     C_2     C_4     C_8    |  ratio to previous level: G2   C_1   C_2   C_4   C_8');
let prevC = null;
for (const x of levels) {
  const s = stat[x], ms = MSM[x];
  const C = (M) => { let b = -Infinity; for (let k = 1; k <= M; k++) b = Math.max(b, ms[k] - k * s.mbar); return b; };
  const cur = { G2: G2REC[x], 1: C(1), 2: C(2), 4: C(4), 8: C(8) };
  let rr = '';
  if (prevC) rr = '  ' + P(F(cur.G2 / prevC.G2, 3), 5) + ' ' + P(F(cur[1] / prevC[1], 3), 5) + ' ' + P(F(cur[2] / prevC[2], 3), 5) + ' ' + P(F(cur[4] / prevC[4], 3), 5) + ' ' + P(F(cur[8] / prevC[8], 3), 5);
  console.log('  ' + P(x, 2) + '  ' + P(F(s.mbar, 2), 6) + '  ' + P(F(cur[1], 1), 6) + '  ' + P(F(cur[2], 1), 6) + '  ' + P(F(cur[4], 1), 6) + '  ' + P(F(cur[8], 1), 6) + '  |' + rr);
  prevC = cur;
}

sub('2.6  the alphabet: size, holes, and the dense prefix');
console.log('A(T) = set of gap values. All are multiples of 6. If A had no holes');
console.log('below G2 then |A| = G2/6 and bounding |A| would bound G2.');
console.log('');
console.log('   x      G2   |A|   G2/6   holes   dense prefix (all 6k present up to)   |A|/(G2/6)');
for (const x of levels) {
  const s = stat[x];
  let n = 0, top = 0;
  for (let v = 6; v < HB; v += 6) if (s.hist[v] > 0) { n++; top = v; }
  let pref = 0;
  for (let v = 6; v < HB; v += 6) { if (s.hist[v] > 0) pref = v; else break; }
  console.log('  ' + P(x, 2) + '  ' + P(G2REC[x], 6) + '  ' + P(n, 4) + '  ' + P(G2REC[x] / 6, 5) + '  ' + P(G2REC[x] / 6 - n, 6) +
    '  ' + P(pref, 36) + '  ' + P(F(n / (G2REC[x] / 6), 4), 11));
}

sub('2.7  the exponential moment IS the tail-count profile, in another basis');
console.log('Z(lambda) = SUM_i e^{lambda g_i} = lambda * INT e^{lambda theta} N(theta) dtheta,');
console.log('so Z and N are a Laplace pair and their transports are the same');
console.log('inequality read in two bases. The index cost shows up as the ratio of');
console.log('the m-window partition function Z_m to Z_1: that ratio is what the');
console.log('merge term multiplies by, and it is the per-fold index price in nats.');
console.log('');
function Zm(g, lam, M) {
  const D = g.length, out = new Float64Array(M + 1);
  for (let i = 0; i < D; i++) { let s = 0; for (let m = 1; m <= M; m++) { s += g[(i + m - 1) % D]; out[m] += Math.exp(lam * s); } }
  return out;
}
console.log('   x    lam*mbar   Z_1        Z_2/Z_1   Z_3/Z_2   Z_4/Z_3   ln(Z_2/Z_1)/lam in mbar units');
for (const x of levels) {
  const s = stat[x], lam = 4 / s.mbar;
  const z = Zm(gapWord[x], lam, 4);
  console.log('  ' + P(x, 2) + '  ' + P(F(lam * s.mbar, 2), 9) + '  ' + P(z[1].toPrecision(6), 12) + '  ' + P(F(z[2] / z[1], 3), 8) +
    '  ' + P(F(z[3] / z[2], 3), 8) + '  ' + P(F(z[4] / z[3], 3), 8) + '  ' + P(F(Math.log(z[2] / z[1]) / lam / s.mbar, 3), 28));
}

sub('2.8  the alphabet is an interval minus at most two values, and it only grows');
console.log('Every old gap survives in at least q-4 > 0 copies, so A(new) CONTAINS');
console.log('A(old): PROVEN, and the dense prefix is non-decreasing. That transports');
console.log('with zero loss and it is a LOWER bound on G2, which is the wrong');
console.log('direction for the Zone Postulate.');
console.log('');
for (let i = 0; i + 1 < levels.length; i++) {
  const x = levels[i], q = levels[i + 1];
  let miss = 0;
  for (let v = 6; v < HB; v += 6) if (stat[x].hist[v] > 0 && stat[q].hist[v] === 0) miss++;
  check('A(T_' + q + ') contains A(T_' + x + ')', miss === 0, miss === 0 ? '' : miss + ' values lost');
}

// ============================================================== PART 3 =======
head('PART 3 — IS ANY HISTOGRAM MARGINAL CLOSED UNDER FOLDING?');
console.log('The A9 operator is exact but reads the gap WORD. Every candidate above');
console.log('except the maxsum family and the centered maxsum is a function of the');
console.log('HISTOGRAM alone. So: shuffle the old word, which fixes the histogram');
console.log('exactly and destroys nothing else about the multiset, then fold.');
console.log('If the new histogram moves, no histogram marginal can transport.');
console.log('');
function shuffled(g, seed) {
  const a = Int32Array.from(g);
  let s = seed >>> 0;
  const rnd = () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const tmp = a[i]; a[i] = a[j]; a[j] = tmp; }
  return a;
}
function tileFromWord(g, start, W) {
  const D = g.length;
  const slots = new Float64Array(D);
  let v = start;
  for (let i = 0; i < D; i++) { slots[i] = v; v += g[i]; }
  return { slots, W };
}
console.log('   x    q    seed        new G2   new D   new Sigma g^2   new N(>=120)   new maxsum_2');
for (const [x, q] of foldPairs) {
  if (!stat[x] || stat[x].D > 500000) continue;
  const W = tiles[x].W;
  const rows = [];
  for (const seed of ['true', 1, 2, 3, 4, 5]) {
    const word = seed === 'true' ? gapWord[x] : shuffled(gapWord[x], 1234567 * seed + x * 7919 + q);
    const tl = tileFromWord(word, 5, W);
    let gm = 0, n = 0, sq = 0, t120 = 0;
    const ring = [0, 0]; let cnt = 0, ms2 = 0;
    streamFold(tl, q, (g) => {
      n++; sq += g * g; if (g > gm) gm = g; if (g >= 120) t120++;
      ring[cnt % 2] = g; cnt++; if (cnt >= 2) { const s = ring[0] + ring[1]; if (s > ms2) ms2 = s; }
    });
    rows.push([seed, gm, n, sq, t120, ms2]);
  }
  for (const r of rows) console.log('  ' + P(x, 2) + '  ' + P(q, 3) + '  ' + P(r[0], 6) + '  ' + P(r[1], 12) + '  ' + P(r[2], 6) + '  ' + P(r[3].toPrecision(8), 14) + '  ' + P(r[4], 13) + '  ' + P(r[5], 13));
  console.log('');
}

// ============================================================== PART 4 =======
head('PART 4 — THE PROVEN TAIL-COUNT TRANSPORT, and what it certifies');
console.log('   N_new(theta) <= (q-2)*N(theta) + 2*SUM_{L>=1} Q_L(theta)');
console.log('   Q_L(theta) = #{i : G_{L+1}(i) >= theta, g_{i+1}..g_{i+L-1} all qualify}');
console.log('PROVEN from A9 step 3/4 (nu_q(i,0) <= q-2, nu_q(i,L) <= 2 for L >= 1).');
console.log('Certified bound: G2(new) < min{theta : RHS(theta) < 1}.');
console.log('');
const LMAX = 8;
const NB = 4200;   // theta grid, in units of 6

// build the RHS profile of the transport inequality from the OLD word alone
function tctRHS(g, q, Lmax) {
  const D = g.length;
  const rhs = new Float64Array(NB);
  const byL = []; for (let L = 0; L <= Lmax; L++) byL.push(new Float64Array(NB));
  for (let i = 0; i < D; i++) { const b = g[i] / 6; if (b < NB) { rhs[b] += (q - 2); byL[0][b] += (q - 2); } }
  for (let i = 0; i < D; i++) {
    let s = g[i], ok = true;
    for (let L = 1; L <= Lmax; L++) {
      if (L >= 2 && !qualifies(g[(i + L - 1) % D], q)) ok = false;
      s += g[(i + L) % D];
      if (!ok) break;
      const b = s / 6; if (b < NB) { rhs[b] += 2; byL[L][b] += 2; }
    }
  }
  for (let b = NB - 2; b >= 0; b--) { rhs[b] += rhs[b + 1]; for (let L = 0; L <= Lmax; L++) byL[L][b] += byL[L][b + 1]; }
  return { rhs, byL };
}

console.log('   x    q    G2(old)   certified G2(new)   true G2(new)   loss units   loss nats   maxsum_{L+1}(old)   its loss nats   L deciding');
const tctRows = [];
for (const [x, q] of foldPairs) {
  if (!stat[x]) continue;
  const g = gapWord[x];
  const { rhs, byL } = tctRHS(g, q, LMAX);
  let bnd = 0;
  for (let b = NB - 1; b >= 0; b--) if (rhs[b] >= 1) { bnd = b * 6; break; }
  const bb = bnd / 6;
  let dec = [];
  for (let L = 0; L <= LMAX; L++) if (byL[L][bb] > 0) dec.push(L);
  const trueNew = G2REC[q];
  const L = LTRUE[x + '>' + q];
  const ms = MSM[x] ? MSM[x][Math.min(L + 1, 8)] : NaN;
  tctRows.push({ x, q, trueNew, bnd, ms, L });
  console.log('  ' + P(x, 2) + '  ' + P(q, 3) + '  ' + P(G2REC[x], 7) + '  ' + P(bnd, 19) + '  ' + P(trueNew, 13) +
    '  ' + P(bnd - trueNew, 11) + '  ' + P(F(Math.log(bnd / trueNew), 3), 10) +
    '  ' + P(ms, 18) + '  ' + P(F(Math.log(ms / trueNew), 3), 14) + '   ' + dec.join(','));
}
console.log('');
console.log('EQUIVALENT READING. The certificate IS the largest sum of consecutive OLD');
console.log('gaps whose interior gaps all qualify mod q. So the fold\'s new record is');
console.log('determined, to 0 or 12 units, by one window statistic of the old word, with');
console.log('no kill count and no residue-deleted tile to evaluate.');
console.log('');
console.log('AND IT CERTIFIES THE ZONE POSTULATE AT EVERY FOLD IN REACH:');
console.log('   x    q    certificate   q^2   margin ln(q^2/cert) nats   true slack ln(q^2/G2) nats');
for (const row of tctRows) {
  const { x, q, bnd, trueNew } = row;
  console.log('  ' + P(x, 2) + '  ' + P(q, 3) + '  ' + P(bnd, 12) + '  ' + P(q * q, 5) + '  ' + P(F(Math.log(q * q / bnd), 3), 24) +
    '  ' + P(F(Math.log(q * q / trueNew), 3), 27));
}

sub('4.1  CUSTODY: the inequality holds at EVERY theta, not only at the endpoint');
console.log('   x    q    thetas tested   max ratio N_new(theta)/RHS(theta)   any violation?');
for (const [x, q] of foldPairs) {
  if (!stat[x] || stat[x].D > 500000) continue;
  const { rhs } = tctRHS(gapWord[x], q, LMAX);
  const nn = new Float64Array(NB);
  streamFold(tiles[x], q, (gg) => { const b = gg / 6; if (b < NB) nn[b]++; });
  for (let b = NB - 2; b >= 0; b--) nn[b] += nn[b + 1];
  let worst = 0, viol = 0, tested = 0;
  for (let b = 1; b < NB; b++) { if (nn[b] === 0 && rhs[b] === 0) continue; tested++; const r = rhs[b] === 0 ? Infinity : nn[b] / rhs[b]; if (r > worst) worst = r; if (nn[b] > rhs[b] + 1e-9) viol++; }
  check('  fold ' + q + ':  ' + P(tested, 5) + ' thetas,  max N_new/RHS = ' + F(worst, 4) + ',  violations = ' + viol, viol === 0);
}

sub('4.2  where the certificate comes from: L=0 alone cannot move it');
console.log('   x    q    old G2   cert from L=0 only   cert with L>=1   true new G2   L=0 share of RHS at the certificate');
for (const [x, q] of foldPairs) {
  if (!stat[x]) continue;
  const { rhs, byL } = tctRHS(gapWord[x], q, LMAX);
  const r0 = byL[0];
  let c0 = 0; for (let b = NB - 1; b >= 0; b--) if (r0[b] >= 1) { c0 = b * 6; break; }
  const row = tctRows.find((z) => z.x === x && z.q === q);
  const bb = row.bnd / 6;
  console.log('  ' + P(x, 2) + '  ' + P(q, 3) + '  ' + P(G2REC[x], 7) + '  ' + P(c0, 19) + '  ' + P(row.bnd, 15) + '  ' + P(G2REC[q], 12) +
    '  ' + P(F(rhs[bb] === 0 ? 0 : byL[0][bb] / rhs[bb], 4), 34));
}

sub('4.3  the index the certificate actually spends, and A5\'s cap in this coordinate');
console.log('K = number of kills inside the deciding window. A window of sum theta');
console.log('carrying K kills needs K-1 mutual spans that qualify; each is >= 2q-2,');
console.log('and by the Alternation Lemma each ADJACENT pair of them sums to >= 6q.');
console.log('So K <= 1 + theta/(3q) — which is A5 Theorem B\'s cap 0.18p verbatim,');
console.log('re-derived without ever mentioning a kill run.');
console.log('');
console.log('   x    q    certificate   K spent   cap 1+theta/(2q-2)   cap 1+theta/(3q)   A5 Thm B\'s L bound G2/(3q)');
for (const row of tctRows) {
  const { x, q, bnd } = row;
  const { byL } = tctRHS(gapWord[x], q, LMAX);
  const bb = bnd / 6;
  let kmax = 0; for (let L = 0; L <= LMAX; L++) if (byL[L][bb] > 0) kmax = L;
  console.log('  ' + P(x, 2) + '  ' + P(q, 3) + '  ' + P(bnd, 12) + '  ' + P(kmax, 8) + '  ' + P(F(1 + bnd / (2 * q - 2), 2), 19) +
    '  ' + P(F(1 + bnd / (3 * q), 2), 17) + '  ' + P(F(G2REC[q] / (3 * q), 2), 26));
}

// ============================================================== PART 4B ======
head('PART 4B — DOES THE TAIL-COUNT FAMILY CHAIN? the decisive test');
console.log('To iterate the inequality one must carry the whole window family');
console.log('   S_n(theta) = #{i : G_n(i) >= theta},   n = 1..M');
console.log('whose transport is, by the same alignment count,');
console.log('   S_m\'(theta) <= q*S_m(theta) + SUM_{K>=1} c(m,K) * S_{m+K}(theta),');
console.log('   c(1,K) = 2  (the kills of ONE new gap form a run, |A_L| <= 2)');
console.log('   c(m,K) = 2(m+K-1)  (m >= 2: the kills need not be consecutive)');
console.log('The chain below starts from the EXACT profiles of T_11 and carries M');
console.log('of them, dropping every term with m+K > M. Dropping is OPTIMISTIC, so');
console.log('the chain below is a LOWER bound on any honest certificate.');
console.log('');
function exactProfiles(g, M) {
  const D = g.length;
  const S = []; for (let n = 0; n <= M; n++) S.push(new Float64Array(NB));
  for (let i = 0; i < D; i++) {
    let s = 0;
    for (let n = 1; n <= M; n++) { s += g[(i + n - 1) % D]; const b = s / 6; if (b < NB) S[n][b]++; }
  }
  for (let n = 1; n <= M; n++) for (let b = NB - 2; b >= 0; b--) S[n][b] += S[n][b + 1];
  return S;
}
function certOf(prof) { for (let b = NB - 1; b >= 0; b--) if (prof[b] >= 1) return b * 6; return 0; }
for (const M of [4, 8, 12, 16]) {
  let S = exactProfiles(gapWord[11], M);
  const line = [];
  for (const [x, q] of foldPairs) {
    if (x < 11) continue;
    const T = []; for (let n = 0; n <= M; n++) T.push(new Float64Array(NB));
    for (let m = 1; m <= M; m++) {
      for (let b = 0; b < NB; b++) T[m][b] = q * S[m][b];
      for (let K = 1; m + K <= M; K++) {
        const c = (m === 1) ? 2 : 2 * (m + K - 1);
        for (let b = 0; b < NB; b++) T[m][b] += c * S[m + K][b];
      }
    }
    S = T;
    line.push({ q, cert: certOf(S[1]), truth: G2REC[q], sq: q * q });
  }
  console.log('  M = ' + P(M, 2) + '   maxsum_M(T_11) = ' + P(certOf(exactProfiles(gapWord[11], M)[M]), 5) + '   (the ceiling the chain can never pass)');
  console.log('        fold q   ' + line.map((z) => P(z.q, 8)).join(''));
  console.log('        chain    ' + line.map((z) => P(z.cert, 8)).join(''));
  console.log('        truth    ' + line.map((z) => P(z.truth, 8)).join(''));
  console.log('        q^2      ' + line.map((z) => P(z.sq, 8)).join(''));
  console.log('        verdict  ' + line.map((z) => P(z.cert < z.truth ? 'FALSE' : (z.cert < z.sq ? 'ok' : 'BUSTS'), 8)).join(''));
  console.log('');
}
console.log('  READING: the chain\'s certificate is capped by maxsum_M(T_11) for every');
console.log('  M, because S_M has no term feeding it and its support never grows. So a');
console.log('  fixed-M truncation certifies a CONSTANT while the truth diverges, and it');
console.log('  goes FALSE as soon as the truth passes that constant. The index M must');
console.log('  grow with the level, at the rate 4.3 prices, which is the accumulating');
console.log('  index of gate-multiplies.md sections 2 and 5.');

// ============================================================== PART 5 =======
head('PART 5 — THE PER-FOLD LOSS LEDGER, in nats, against the sharp budget');
console.log('budget per fold = 2 ln q / q (gate-multiplies.md section 7); total');
console.log('lifetime slack 0.598 to 1.19 nats. A candidate whose per-fold loss does');
console.log('not sum to under a nat over the whole ladder is dead on arrival.');
console.log('');
console.log('   fold q   budget   truth ln(G2\'/G2)   Sg2   Sg8   Z(4/mbar)   C_1   tail-count transport');
let cum = { s2: 0, s8: 0, z: 0, c1: 0, tct: 0 };
for (let i = 0; i + 1 < levels.length; i++) {
  const x = levels[i], q = levels[i + 1];
  const a = stat[x], b = stat[q];
  const budget = 2 * Math.log(q) / q;
  const truth = Math.log(G2REC[q] / G2REC[x]);
  const l2 = Math.log(Math.pow(b.mom[2], 0.5) / Math.pow(a.mom[2], 0.5)) - truth;
  const l8 = Math.log(Math.pow(b.mom[8], 1 / 8) / Math.pow(a.mom[8], 1 / 8)) - truth;
  const ja = a.lams.length - 1, jb = b.lams.length - 1;
  const lz = Math.log((Math.log(b.Zs[jb]) / b.lams[jb]) / (Math.log(a.Zs[ja]) / a.lams[ja])) - truth;
  const Ca = MSM[x][1] - a.mbar, Cb = MSM[q][1] - b.mbar;
  const lc = Math.log(Cb / Ca) - truth;
  const row = tctRows.find((z) => z.x === x && z.q === q);
  const lt = row ? Math.log(row.bnd / G2REC[q]) : NaN;
  cum.s2 += l2; cum.s8 += l8; cum.z += lz; cum.c1 += lc;
  console.log('  ' + P(q, 6) + '  ' + P(F(budget, 4), 7) + '  ' + P(F(truth, 4), 16) + '  ' + P(F(l2, 3), 6) + '  ' + P(F(l8, 3), 5) +
    '  ' + P(F(lz, 3), 10) + '  ' + P(F(lc, 3), 5) + '  ' + P(F(lt, 3), 20));
}
console.log('');
console.log('  cumulative excess over the truth, this ladder only:');
console.log('    Sigma g^2  ' + F(cum.s2, 3) + '   Sigma g^8  ' + F(cum.s8, 3) + '   Z(4/mbar)  ' + F(cum.z, 3) + '   C_1  ' + F(cum.c1, 3));

// ============================================================== PART 6 =======
head('PART 6 — T_29 AND THE DEEP END (streamed, nothing stored)');
if (ARG_MAX >= 23) {
  log('streaming T_23 -> T_29');
  const s23 = stat[23];
  const lam = 4 / (s23.W * 29 / (s23.D * 27));
  let n = 0, gm = 0, sq = 0, s4 = 0, Z = 0, sum = 0;
  const hist = new Float64Array(HB);
  streamFold(tiles[23], 29, (g) => { n++; sum += g; if (g > gm) gm = g; sq += g * g; s4 += g * g * g * g; Z += Math.exp(lam * g); hist[g]++; });
  const mbar = sum / n;
  console.log('  D(T_29)  = ' + n + '   (prod (p-2) = 214708725)');
  console.log('  G2(T_29) = ' + gm + '   (recorded 258)');
  console.log('  mbar     = ' + F(mbar, 4));
  console.log('  Sigma g^2 = ' + sq.toPrecision(10) + '   Phi_2 = ' + F(Math.sqrt(sq), 1) + '   overshoot ' + F(Math.log(Math.sqrt(sq) / gm), 3) + ' nats');
  console.log('  Sigma g^4 = ' + s4.toPrecision(10) + '   Phi_4 = ' + F(Math.pow(s4, 0.25), 1) + '   overshoot ' + F(Math.log(Math.pow(s4, 0.25) / gm), 3) + ' nats');
  console.log('  Z(4/mbar) = ' + Z.toPrecision(8) + '   Phi = ' + F(Math.log(Z) / lam, 1) + '   overshoot ' + F(Math.log(Math.log(Z) / lam / gm), 3) + ' nats');
  let na = 0, top = 0, pref = 0, brk = false;
  for (let v = 6; v < HB; v += 6) { if (hist[v] > 0) { na++; top = v; if (!brk) pref = v; } else brk = true; }
  console.log('  |A| = ' + na + '   G2/6 = ' + gm / 6 + '   holes = ' + (gm / 6 - na) + '   dense prefix = ' + pref);
  check('D(T_29)', n === 214708725, 'streamed');
  check('G2(T_29) = 258', gm === 258, 'streamed');
}

head('SELF-TEST SUMMARY');
console.log(FAILS === 0 ? '  all checks passed' : '  ' + FAILS + ' CHECK(S) FAILED');
log('done');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-foldL-03-transport.js -- 23
//   invocation:  node research/attack-foldL-03-transport.js 23
//   code-sha256: 74e291517b4fbb63ab1c2af8d68ca43b8b6ea1dcd056035ebd16339df0ebc0cf
//   out-sha256:  0311922db7d93afcf0c47b726a71ea5ae7ca1e73272dae519a1513621c5d10e4
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     39.3 s
// ============================================================================
//
// ==============================================================================
// PART 0 — CUSTODY: the ladder, the copy theorem, the 6p sum rule
// ==============================================================================
//
// ------------------------------------------------------------------------------
// 0.1  D and G2 ladders, from a generator that never sieves
// ------------------------------------------------------------------------------
//   ok    T_5:  D =         3  G2 =   12
//   ok    T_7:  D =        15  G2 =   30
//   ok    T_11:  D =       135  G2 =   42
//   ok    T_13:  D =      1485  G2 =   66
//   ok    T_17:  D =     22275  G2 =  108
//   ok    T_19:  D =    378675  G2 =  150
//   ok    T_23:  D =   7952175  G2 =  204
//
// ------------------------------------------------------------------------------
// 0.2  copy theorem, spot-check by this file's own machinery
// ------------------------------------------------------------------------------
//   (the full 40/40 family table is CITED, not recomputed:
//    research/attack-0c0e-01-deleted-family.js, embedded 2026-08-19,
//    max_a Delta_m = maxsum_m(T_p) for all m <= 8 at folds 11..31.)
//
//   ok    max_a maxsum_m(T_11 \ {a,a-2} mod 13) = maxsum_m(T_13)  m1:66/66 m2:96/96 m3:138/138 m4:156/156
//   ok    max_a maxsum_m(T_17 \ {a,a-2} mod 19) = maxsum_m(T_19)  m1:150/150 m2:186/186 m3:210/210 m4:228/228
//
// ------------------------------------------------------------------------------
// 0.3  the 6p sum rule (A5 Theorem A) and the Alternation Lemma
// ------------------------------------------------------------------------------
//   qualifying gaps at fold q: g = 0 or +-2 (mod q).  Any two ADJACENT
//   gaps of a kill run lie in classes that strictly alternate, so their
//   sum is at least min(class +2) + min(class -2) = 6q exactly.
//
//    x    q      L   #qual gaps   #adj pairs   #run-legal   min pair sum   min LEGAL sum     6q   attained?
//    7   11      1            0            0             0             -              -     66   no legal pair
//   11   13      2            6            0             0             -              -     78   no legal pair
//   13   17      2           72            0             0             -              -    102   no legal pair
//   17   19      2         1088            0             0             -              -    114   no legal pair
//   19   23      3        11784          234            62            96            138    138   EQUALITY
//   ok       6q rule on run-LEGAL pairs at fold 23
//         (note: the raw qualifying-pair minimum is 96 < 6q = 138;
//          alternation is what lifts it, exactly as kappa-not-L.md records at fold 29)
//   23   29      2       243816          288             0           120              -    174   no legal pair
//         (note: the raw qualifying-pair minimum is 120 < 6q = 174;
//          alternation is what lifts it, exactly as kappa-not-L.md records at fold 29)
//
// ==============================================================================
// PART 1 — the two exact transport SHAPES, and the SUM-shape identity
// ==============================================================================
// MAX-shape (copy theorem, cited): max_a Phi(T\{a,a-2}) = Phi(new).
// SUM-shape (tested here):        sum_a Psi(T\{a,a-2}) = Psi(new) + bdy,
// for Psi any COUNT of windows. Both have index cost zero: the window
// size m does not grow. Below, Psi = D (slot count), Psi = total span,
// Psi = sum of g^2, and Psi = tail count N(theta) at three thresholds.
//
//    x    q     Psi              sum_a over deleted     true new      rel err
//    7   11  D  (slot count)            135.000000000           135.000000000   0.000000
//    7   11  total span                 2310.00000000           2310.00000000   0.000000
//    7   11  sum g^2                    51732.0000000           51444.0000000   0.005598
//    7   11  N(theta>=60)               0.00000000000           0.00000000000   0
//    7   11  N(theta>=120)              0.00000000000           0.00000000000   0
//    7   11  N(theta>=180)              0.00000000000           0.00000000000   0
//
//   11   13  D  (slot count)            1485.00000000           1485.00000000   0.000000
//   11   13  total span                 30030.0000000           30030.0000000   0.000000
//   11   13  sum g^2                    822276.000000           822276.000000   0.000000
//   11   13  N(theta>=60)               24.0000000000           24.0000000000   0.000000
//   11   13  N(theta>=120)              0.00000000000           0.00000000000   0
//   11   13  N(theta>=180)              0.00000000000           0.00000000000   0
//
//   13   17  D  (slot count)            22275.0000000           22275.0000000   0.000000
//   13   17  total span                 510510.000000           510510.000000   0.000000
//   13   17  sum g^2                    16439364.0000           16439364.0000   0.000000
//   13   17  N(theta>=60)               874.000000000           874.000000000   0.000000
//   13   17  N(theta>=120)              0.00000000000           0.00000000000   0
//   13   17  N(theta>=180)              0.00000000000           0.00000000000   0
//
//   17   19  D  (slot count)            378675.000000           378675.000000   0.000000
//   17   19  total span                 9699690.00000           9699690.00000   0.000000
//   17   19  sum g^2                    359985708.000           359985708.000   0.000000
//   17   19  N(theta>=60)               25246.0000000           25246.0000000   0.000000
//   17   19  N(theta>=120)              322.000000000           322.000000000   0.000000
//   17   19  N(theta>=180)              0.00000000000           0.00000000000   0
//
//   19   23  D  (slot count)            7952175.00000           7952175.00000   0.000000
//   19   23  total span                 223092870.000           223092870.000   0.000000
//   19   23  sum g^2                    9271859796.00           9271859796.00   0.000000
//   19   23  N(theta>=60)               745674.000000           745674.000000   0.000000
//   19   23  N(theta>=120)              22790.0000000           22790.0000000   0.000000
//   19   23  N(theta>=180)              146.000000000           146.000000000   0.000000
//
//
// ==============================================================================
// PART 2 — CANDIDATE TABLE, level by level
// ==============================================================================
//
// ------------------------------------------------------------------------------
// 2.1  Sigma g^k : the polynomial moments
// ------------------------------------------------------------------------------
// The bound they give is Phi_k = (Sigma g^k)^{1/k} >= G2. Overshoot is
// ln(Phi_k / G2), in nats; the LIFETIME budget is 0.598 to 1.19 nats
// (gate-multiplies.md section 5). k* is the least k with Phi_k <= 2*G2.
//
//    x     G2    mbar     lnD   Phi_2  ovr_2   Phi_4  ovr_4   Phi_8  ovr_8    k*   k*/lnD
//    7     30   14.00    2.71      61  0.708      38  0.226      33  0.089     3     1.11
//   11     42   17.11    4.91     227  1.686      81  0.653      53  0.239     4     0.82
//   13     66   20.22    7.30     907  2.620     184  1.023      97  0.389     6     0.82
//   17    108   22.92   10.01    4055  3.625     434  1.392     178  0.499     7     0.70
//   19    150   25.61   12.84   18973  4.840    1027  1.924     302  0.700     9     0.70
//   23    204   28.05   15.89   96290  6.157    2468  2.493     501  0.898    10     0.63
//
//   per-fold behaviour of Sigma g^k (the multiplicative loss):
//    fold q   Sg2 ratio   Sg4 ratio   Sg8 ratio   (q-2)   ln(ratio)/k for k=2,4,8   budget 2lnq/q
//       11      13.874      21.240      48.873      9     1.3150   0.7640   0.4862     0.4360
//       13      15.984      26.788     123.482     11     1.3858   0.8220   0.6020     0.3946
//       17      19.993      31.305     124.384     15     1.4977   0.8609   0.6029     0.3333
//       19      21.898      31.207      69.121     17     1.5432   0.8602   0.5295     0.3099
//       23      25.756      33.400      56.834     21     1.6243   0.8771   0.5050     0.2727
//
// ------------------------------------------------------------------------------
// 2.2  Sigma exp(lambda g) : the exponential moment
// ------------------------------------------------------------------------------
// Phi = ln Z / lambda >= G2 requires lambda large; at lambda with bite,
// Z is dominated by the record and the recursion becomes G2's own.
//
//    x    lambda*mbar    Z            Phi=lnZ/lam   G2    ovr nats   share of Z from the top gap
//    7         0.50        25.6403         90.8     30      1.108   0.227731
//    7         1.00        47.7386         54.1     30      0.590   0.357102
//    7         2.00        222.969         37.8     30      0.232   0.651700
//    7         4.00        11163.1         32.6     30      0.084   0.945738
//
//   11         0.50        231.830        186.4     42      1.490   0.058869
//   11         1.00        436.492        104.0     42      0.907   0.106679
//   11         2.00        2093.75         65.4     42      0.443   0.258897
//   11         4.00         120097         50.0     42      0.175   0.611662
//
//   13         0.50        2572.61        317.6     66      1.571   0.023852
//   13         1.00        5038.93        172.4     66      0.960   0.062268
//   13         2.00        32184.4        104.9     66      0.464   0.254907
//   13         4.00     8.12864e+6         80.4     66      0.198   0.690008
//
//   17         0.50        38973.7        484.5    108      1.501   0.005414
//   17         1.00        80734.9        259.0    108      0.875   0.027575
//   17         2.00         915545        157.3    108      0.376   0.270671
//   17         4.00     3.79487e+9        126.4    108      0.157   0.809128
//
//   19         0.50         668135        687.1    150      1.522   0.000559
//   19         1.00     1.44926e+6        363.4    150      0.885   0.004821
//   19         2.00     2.50582e+7        218.2    150      0.375   0.097392
//   19         4.00    5.80130e+11        173.5    150      0.145   0.513327
//
//   23         0.50     1.41155e+7        923.7    204      1.510   0.000011
//   23         1.00     3.16014e+7        484.5    204      0.865   0.000182
//   23         2.00     7.09099e+8        285.9    204      0.337   0.011679
//   23         4.00    6.67582e+13        223.3    204      0.090   0.256821
//
//
// ------------------------------------------------------------------------------
// 2.3  the gap-count vector by value class mod 6M
// ------------------------------------------------------------------------------
// BITE, decided in one line and confirmed numerically: the class vector is
// unchanged by moving 6M from one gap to another, and that moves G2 freely.
// The numbers below show how close to uniform the classes already are.
//
//    x     M    classes   max/min class share   chi^2/dof vs uniform   does it see G2?
//    7     5          5                    n/a                  3.000   no
//    7     7          7                    n/a                  3.800   no
//    7    11         11                    n/a                  4.440   no
//   11     5          5                10.0000                 14.667   no
//   11     7          7                14.0000                 17.365   no
//   11    11         11                    n/a                 24.087   no
//   13     5          5                 6.1250                107.848   no
//   13     7          7                 8.4000                110.291   no
//   13    11         11                    n/a                177.308   no
//   17     5          5                 5.2469               1346.831   no
//   17     7          7                 6.0790               1135.945   no
//   17    11         11               165.4500               2051.123   no
//   19     5          5                 4.7192              20176.394   no
//   19     7          7                 4.6991              14195.559   no
//   19    11         11                47.8199              28103.749   no
//   23     5          5                 4.3569             385475.301   no
//   23     7          7                 4.0590             237808.174   no
//   23    11         11                25.2855             495546.191   no
//
// ------------------------------------------------------------------------------
// 2.4  the adjacent-large-pair (run-seed) count
// ------------------------------------------------------------------------------
// S2(theta) = #{i : g_i + g_{i+1} >= theta}. The A5 Theorem A form is
// theta = 6q: a kill run of length 3 needs an adjacent qualifying pair,
// whose sum is at least 6q, so S2(6q) = 0 forces L <= 2.
//
//    x    q     S2(6q)   #adj qual pairs   L   S2(6q)=0 would force L<=2   min(g_i,g_{i+1}) max
//    7   11          0                  0   1           YES (vacuous, L=1)      12
//   11   13          0                  0   2           YES (vacuous, L=2)      30
//   13   17          0                  0   2           YES (vacuous, L=2)      42
//   17   19        124                  0   2                           no      66
//   19   23       2192                234   3                           no      78
//   23   29       6104                288   2                           no     102
//
// ------------------------------------------------------------------------------
// 2.5  centered maxsum  C_M = max_{k<=M} (maxsum_k - k*mbar)
// ------------------------------------------------------------------------------
// Centering is what would cancel the fold's mean drift. The per-fold
// multiplier is the test: it must beat G2's own multiplier to be worth
// anything, since the bound it gives is G2 <= C_M + mbar.
//
//    x    mbar     C_1     C_2     C_4     C_8    |  ratio to previous level: G2   C_1   C_2   C_4   C_8
//    7   14.00    16.0    16.0    24.0    28.0  |
//   11   17.11    24.9    31.8    44.7    53.3  |  1.400 1.556 1.986 1.861 1.905
//   13   20.22    45.8    55.6    77.3    77.3  |  1.571 1.839 1.748 1.731 1.450
//   17   22.92    85.1   104.2   106.3   106.3  |  1.636 1.859 1.875 1.375 1.375
//   19   25.61   124.4   134.8   134.8   173.1  |  1.389 1.462 1.294 1.268 1.628
//   23   28.05   175.9   177.9   235.8   303.6  |  1.360 1.415 1.320 1.750 1.754
//
// ------------------------------------------------------------------------------
// 2.6  the alphabet: size, holes, and the dense prefix
// ------------------------------------------------------------------------------
// A(T) = set of gap values. All are multiples of 6. If A had no holes
// below G2 then |A| = G2/6 and bounding |A| would bound G2.
//
//    x      G2   |A|   G2/6   holes   dense prefix (all 6k present up to)   |A|/(G2/6)
//    7      30     4      5       1                                    18       0.8000
//   11      42     7      7       0                                    42       1.0000
//   13      66    10     11       1                                    48       0.9091
//   17     108    17     18       1                                    96       0.9444
//   19     150    23     25       2                                   108       0.9200
//   23     204    33     34       1                                   138       0.9706
//
// ------------------------------------------------------------------------------
// 2.7  the exponential moment IS the tail-count profile, in another basis
// ------------------------------------------------------------------------------
// Z(lambda) = SUM_i e^{lambda g_i} = lambda * INT e^{lambda theta} N(theta) dtheta,
// so Z and N are a Laplace pair and their transports are the same
// inequality read in two bases. The index cost shows up as the ratio of
// the m-window partition function Z_m to Z_1: that ratio is what the
// merge term multiplies by, and it is the per-fold index price in nats.
//
//    x    lam*mbar   Z_1        Z_2/Z_1   Z_3/Z_2   Z_4/Z_3   ln(Z_2/Z_1)/lam in mbar units
//    7       4.00       11163.1    36.619   520.915    54.387                         0.900
//   11       4.00        120097   322.154   400.109    74.171                         1.444
//   13       4.00    8.12864e+6   285.776  1357.177    49.032                         1.414
//   17       4.00    3.79487e+9   510.637    60.203    66.692                         1.559
//   19       4.00   5.80130e+11   126.055    62.812    30.133                         1.209
//   23       4.00   6.67582e+13    83.873  1699.602  2073.112                         1.107
//
// ------------------------------------------------------------------------------
// 2.8  the alphabet is an interval minus at most two values, and it only grows
// ------------------------------------------------------------------------------
// Every old gap survives in at least q-4 > 0 copies, so A(new) CONTAINS
// A(old): PROVEN, and the dense prefix is non-decreasing. That transports
// with zero loss and it is a LOWER bound on G2, which is the wrong
// direction for the Zone Postulate.
//
//   ok    A(T_11) contains A(T_7)
//   ok    A(T_13) contains A(T_11)
//   ok    A(T_17) contains A(T_13)
//   ok    A(T_19) contains A(T_17)
//   ok    A(T_23) contains A(T_19)
//
// ==============================================================================
// PART 3 — IS ANY HISTOGRAM MARGINAL CLOSED UNDER FOLDING?
// ==============================================================================
// The A9 operator is exact but reads the gap WORD. Every candidate above
// except the maxsum family and the centered maxsum is a function of the
// HISTOGRAM alone. So: shuffle the old word, which fixes the histogram
// exactly and destroys nothing else about the multiset, then fold.
// If the new histogram moves, no histogram marginal can transport.
//
//    x    q    seed        new G2   new D   new Sigma g^2   new N(>=120)   new maxsum_2
//    7   11    true            42     135       51444.000              0             66
//    7   11       1            48     135       52884.000              0             72
//    7   11       2            42     135       51588.000              0             72
//    7   11       3            48     135       52452.000              0             66
//    7   11       4            48     135       52596.000              0             78
//    7   11       5            48     135       52740.000              0             84
//
//   11   13    true            66    1485       822276.00              0             96
//   11   13       1            72    1485       819612.00              0            138
//   11   13       2            78    1485       832068.00              0            102
//   11   13       3            66    1485       827244.00              0            126
//   11   13       4            72    1485       827532.00              0            102
//   11   13       5           102    1485       823572.00              0            144
//
//   13   17    true           108   22275        16439364              0            150
//   13   17       1           126   22275        16478820              1            216
//   13   17       2           144   22275        16441884              3            168
//   13   17       3           168   22275        16474500              7            228
//   13   17       4           156   22275        16436484              4            174
//   13   17       5           150   22275        16515180              7            180
//
//   17   19    true           150  378675    3.5998571e+8            322            186
//   17   19       1           186  378675    3.5998852e+8            270            258
//   17   19       2           222  378675    3.6016628e+8            308            264
//   17   19       3           204  378675    3.6017629e+8            310            252
//   17   19       4           192  378675    3.6030229e+8            325            252
//   17   19       5           222  378675    3.6041159e+8            311            264
//
//   19   23    true           204  7952175    9.2718598e+9          22790            234
//   19   23       1           282  7952175    9.2889958e+9          21292            336
//   19   23       2           324  7952175    9.2889657e+9          21095            366
//   19   23       3           276  7952175    9.2879247e+9          20993            354
//   19   23       4           330  7952175    9.2893051e+9          21109            360
//   19   23       5           324  7952175    9.2888790e+9          21171            372
//
//
// ==============================================================================
// PART 4 — THE PROVEN TAIL-COUNT TRANSPORT, and what it certifies
// ==============================================================================
//    N_new(theta) <= (q-2)*N(theta) + 2*SUM_{L>=1} Q_L(theta)
//    Q_L(theta) = #{i : G_{L+1}(i) >= theta, g_{i+1}..g_{i+L-1} all qualify}
// PROVEN from A9 step 3/4 (nu_q(i,0) <= q-2, nu_q(i,L) <= 2 for L >= 1).
// Certified bound: G2(new) < min{theta : RHS(theta) < 1}.
//
//    x    q    G2(old)   certified G2(new)   true G2(new)   loss units   loss nats   maxsum_{L+1}(old)   its loss nats   L deciding
//    7   11       30                   42             42            0       0.000                  42           0.000   1
//   11   13       42                   66             66            0       0.000                  96           0.375   1
//   13   17       66                  108            108            0       0.000                 138           0.245   2
//   17   19      108                  150            150            0       0.000                 168           0.113   1,2
//   19   23      150                  204            204            0       0.000                 228           0.111   3
//   23   29      204                  270            258           12       0.045                 300           0.151   3
//
// EQUIVALENT READING. The certificate IS the largest sum of consecutive OLD
// gaps whose interior gaps all qualify mod q. So the fold's new record is
// determined, to 0 or 12 units, by one window statistic of the old word, with
// no kill count and no residue-deleted tile to evaluate.
//
// AND IT CERTIFIES THE ZONE POSTULATE AT EVERY FOLD IN REACH:
//    x    q    certificate   q^2   margin ln(q^2/cert) nats   true slack ln(q^2/G2) nats
//    7   11            42    121                     1.058                        1.058
//   11   13            66    169                     0.940                        0.940
//   13   17           108    289                     0.984                        0.984
//   17   19           150    361                     0.878                        0.878
//   19   23           204    529                     0.953                        0.953
//   23   29           270    841                     1.136                        1.182
//
// ------------------------------------------------------------------------------
// 4.1  CUSTODY: the inequality holds at EVERY theta, not only at the endpoint
// ------------------------------------------------------------------------------
//    x    q    thetas tested   max ratio N_new(theta)/RHS(theta)   any violation?
//   ok      fold 11:      7 thetas,  max N_new/RHS = 1.0000,  violations = 0
//   ok      fold 13:     11 thetas,  max N_new/RHS = 1.0000,  violations = 0
//   ok      fold 17:     18 thetas,  max N_new/RHS = 0.8881,  violations = 0
//   ok      fold 19:     25 thetas,  max N_new/RHS = 0.8975,  violations = 0
//   ok      fold 23:     34 thetas,  max N_new/RHS = 0.9180,  violations = 0
//
// ------------------------------------------------------------------------------
// 4.2  where the certificate comes from: L=0 alone cannot move it
// ------------------------------------------------------------------------------
//    x    q    old G2   cert from L=0 only   cert with L>=1   true new G2   L=0 share of RHS at the certificate
//    7   11       30                   30               42            42                              0.0000
//   11   13       42                   42               66            66                              0.0000
//   13   17       66                   66              108           108                              0.0000
//   17   19      108                  108              150           150                              0.0000
//   19   23      150                  150              204           204                              0.0000
//   23   29      204                  204              270           258                              0.0000
//
// ------------------------------------------------------------------------------
// 4.3  the index the certificate actually spends, and A5's cap in this coordinate
// ------------------------------------------------------------------------------
// K = number of kills inside the deciding window. A window of sum theta
// carrying K kills needs K-1 mutual spans that qualify; each is >= 2q-2,
// and by the Alternation Lemma each ADJACENT pair of them sums to >= 6q.
// So K <= 1 + theta/(3q) — which is A5 Theorem B's cap 0.18p verbatim,
// re-derived without ever mentioning a kill run.
//
//    x    q    certificate   K spent   cap 1+theta/(2q-2)   cap 1+theta/(3q)   A5 Thm B's L bound G2/(3q)
//    7   11            42         1                 3.10               2.27                        1.27
//   11   13            66         1                 3.75               2.69                        1.69
//   13   17           108         2                 4.38               3.12                        2.12
//   17   19           150         2                 5.17               3.63                        2.63
//   19   23           204         3                 5.64               3.96                        2.96
//   23   29           270         3                 5.82               4.10                        2.97
//
// ==============================================================================
// PART 4B — DOES THE TAIL-COUNT FAMILY CHAIN? the decisive test
// ==============================================================================
// To iterate the inequality one must carry the whole window family
//    S_n(theta) = #{i : G_n(i) >= theta},   n = 1..M
// whose transport is, by the same alignment count,
//    S_m'(theta) <= q*S_m(theta) + SUM_{K>=1} c(m,K) * S_{m+K}(theta),
//    c(1,K) = 2  (the kills of ONE new gap form a run, |A_L| <= 2)
//    c(m,K) = 2(m+K-1)  (m >= 2: the kills need not be consecutive)
// The chain below starts from the EXACT profiles of T_11 and carries M
// of them, dropping every term with m+K > M. Dropping is OPTIMISTIC, so
// the chain below is a LOWER bound on any honest certificate.
//
//   M =  4   maxsum_M(T_11) =   108   (the ceiling the chain can never pass)
//         fold q         13      17      19      23      29
//         chain         108     108     108     108     108
//         truth          66     108     150     204     258
//         q^2           169     289     361     529     841
//         verdict        ok      ok   FALSE   FALSE   FALSE
//
//   M =  8   maxsum_M(T_11) =   180   (the ceiling the chain can never pass)
//         fold q         13      17      19      23      29
//         chain         180     180     180     180     180
//         truth          66     108     150     204     258
//         q^2           169     289     361     529     841
//         verdict     BUSTS      ok      ok   FALSE   FALSE
//
//   M = 12   maxsum_M(T_11) =   240   (the ceiling the chain can never pass)
//         fold q         13      17      19      23      29
//         chain         240     240     240     240     240
//         truth          66     108     150     204     258
//         q^2           169     289     361     529     841
//         verdict     BUSTS      ok      ok      ok   FALSE
//
//   M = 16   maxsum_M(T_11) =   330   (the ceiling the chain can never pass)
//         fold q         13      17      19      23      29
//         chain         330     330     330     330     330
//         truth          66     108     150     204     258
//         q^2           169     289     361     529     841
//         verdict     BUSTS   BUSTS      ok      ok      ok
//
//   READING: the chain's certificate is capped by maxsum_M(T_11) for every
//   M, because S_M has no term feeding it and its support never grows. So a
//   fixed-M truncation certifies a CONSTANT while the truth diverges, and it
//   goes FALSE as soon as the truth passes that constant. The index M must
//   grow with the level, at the rate 4.3 prices, which is the accumulating
//   index of gate-multiplies.md sections 2 and 5.
//
// ==============================================================================
// PART 5 — THE PER-FOLD LOSS LEDGER, in nats, against the sharp budget
// ==============================================================================
// budget per fold = 2 ln q / q (gate-multiplies.md section 7); total
// lifetime slack 0.598 to 1.19 nats. A candidate whose per-fold loss does
// not sum to under a nat over the whole ladder is dead on arrival.
//
//    fold q   budget   truth ln(G2'/G2)   Sg2   Sg8   Z(4/mbar)   C_1   tail-count transport
//       11   0.4360            0.3365   0.979  0.150       0.091  0.105                 0.000
//       13   0.3946            0.4520   0.934  0.150       0.023  0.157                 0.000
//       17   0.3333            0.4925   1.005  0.110      -0.041  0.127                 0.000
//       19   0.3099            0.3285   1.215  0.201      -0.012  0.051                 0.000
//       23   0.2727            0.3075   1.317  0.198      -0.055  0.039                 0.000
//
//   cumulative excess over the truth, this ladder only:
//     Sigma g^2  5.449   Sigma g^8  0.809   Z(4/mbar)  0.006   C_1  0.481
//
// ==============================================================================
// PART 6 — T_29 AND THE DEEP END (streamed, nothing stored)
// ==============================================================================
//   D(T_29)  = 214708725   (prod (p-2) = 214708725)
//   G2(T_29) = 258   (recorded 258)
//   mbar     = 30.1324
//   Sigma g^2 = 2.936514993e+11   Phi_2 = 541896.2   overshoot 7.650 nats
//   Sigma g^4 = 1.428032336e+15   Phi_4 = 6147.3   overshoot 3.171 nats
//   Z(4/mbar) = 5.4128210e+15   Phi = 272.9   overshoot 0.056 nats
//   |A| = 41   G2/6 = 43   holes = 2   dense prefix = 240
//   ok    D(T_29)   streamed
//   ok    G2(T_29) = 258   streamed
//
// ==============================================================================
// SELF-TEST SUMMARY
// ==============================================================================
//   all checks passed
// ============================================================================
// READINGS
// ============================================================================
//
// 1. CUSTODY IS CLEAN. The D and G2 ladders reproduce 3/12, 15/30, 135/42,
//    1485/66, 22275/108, 378675/150, 7952175/204 from a generator that never
//    sieves, and the streamed fold gives D(T_29) = 214708725 and G2(T_29) = 258.
//    The copy theorem is re-derived by this file's own machinery at two folds
//    (m1:66/66 m2:96/96 m3:138/138 m4:156/156 and m1:150/150 m2:186/186
//    m3:210/210 m4:228/228); the full 40/40 family table is cited, not rerun.
//    True L reads 1, 2, 2, 2, 3, 2 at folds 11, 13, 17, 19, 23, 29, matching the
//    recorded row, and the 6q rule is ATTAINED WITH EQUALITY at fold 23: the
//    minimum sum over run-legal adjacent qualifying pairs is 138 = 6*23. The raw
//    qualifying-pair minimum there is 96, below 6q, so the Alternation Lemma is
//    doing the whole of the lift and not decoration.
//
// 2. THE SUM-SHAPE IS EXACT, and it is the count-side twin of the copy theorem.
//    sum over the q 2-sets of any window COUNT on the residue-deleted tile
//    reproduces the folded tile's count to 0.000000 relative at folds 13, 17,
//    19, 23 for slot count, total span, sum g^2 and N(theta) at 60, 120, 180.
//    The single non-zero is 0.005598 on sum g^2 at fold 11, which is the
//    copy-boundary term at D = 15. So max-over-windows and count-over-windows
//    both transport with index cost zero; that is the whole supply.
//
// 3. POLYNOMIAL MOMENTS FAIL ON BITE, and the failure is quantitative. The
//    overshoot ln(Phi_k/G2) at T_23 is 6.157 at k = 2, 2.493 at k = 4 and 0.898
//    at k = 8, against a LIFETIME budget of 0.598 to 1.19 nats. The least k that
//    gets inside a factor 2 of G2 is k* = 3, 4, 6, 7, 9, 10 at T_7..T_23, i.e.
//    k*/lnD = 1.11, 0.82, 0.82, 0.70, 0.70, 0.63. The required order grows with
//    the level like lnD, so no FIXED moment order survives, and at the order
//    that does the moment is the maximum. Per fold, ln(ratio)/k for k = 2 runs
//    1.3150 to 1.6243 against a budget 2lnq/q of 0.4360 down to 0.2727: over by
//    three to six times at every fold. Cumulative excess over the truth across
//    five folds: 5.449 nats at k = 2, 0.809 at k = 8.
//
// 4. THE EXPONENTIAL MOMENT HAS BITE AND NO INDEPENDENT TRANSPORT. At
//    lambda = 4/mbar the overshoot is 0.084, 0.175, 0.198, 0.157, 0.145, 0.090
//    nats at T_7..T_23 and 0.056 at T_29, with cumulative excess 0.006 nats over
//    five folds — the only candidate whose bite is comparable to maxsum's. But
//    Z is the Laplace transform of the tail-count profile N(theta), so its
//    transport IS section 4's inequality in another basis, and its index cost is
//    the ratio Z_2/Z_1, measured 36.619, 322.154, 285.776, 510.637, 126.055,
//    83.873 with no stable value. It is not a separate candidate.
//
// 5. CLASS VECTORS MOD 6M ARE BLIND. chi^2/dof against uniform runs 3.000 to
//    495546.191, so the classes are strongly non-uniform and carry real
//    information — but not information about SIZE: the vector is unchanged by
//    moving 6M from one gap to another, which moves G2 freely. Transport is
//    irrelevant once bite is zero.
//
// 6. CENTERING MAKES THE MULTIPLIER WORSE, at every fold. C_1 = G2 - mbar
//    multiplies by 1.556, 1.839, 1.859, 1.462, 1.415 where G2 itself multiplies
//    by 1.400, 1.571, 1.636, 1.389, 1.360. Cumulative excess 0.481 nats over
//    five folds against a lifetime budget of 0.598. C_2, C_4, C_8 are no better
//    (1.986, 1.861, 1.905 at the first fold alone). The drift cancellation
//    centering was supposed to buy is not visible at any window size tested.
//
// 7. THE ALPHABET IS AN INTERVAL MINUS AT MOST TWO VALUES. |A|/(G2/6) reads
//    0.8000, 1.0000, 0.9091, 0.9444, 0.9200, 0.9706 at T_7..T_23 and T_29 has
//    |A| = 41 against G2/6 = 43, so holes = 1, 0, 1, 1, 2, 1, 2 across the whole
//    reachable ladder, and the dense prefix runs 18, 42, 48, 96, 108, 138, 240.
//    A(new) contains A(old) at every fold, checked. So the alphabet transports
//    with zero loss and is nearly equivalent to G2 in strength — but only as a
//    LOWER bound, which is the wrong direction.
//
// 8. NO HISTOGRAM MARGINAL CAN TRANSPORT, and this is the unifying negative.
//    Shuffling the old gap word fixes its histogram exactly. At fold 23 the true
//    new G2 is 204 and five shuffles give 282, 324, 276, 330, 324; new sum g^2
//    moves only from 9.2718598e+9 to 9.2893051e+9 and new N(>=120) only from
//    22790 to 21095, so the BULK statistics are nearly histogram-determined
//    while the RECORD is not. Every candidate in Part 2 except the maxsum family
//    is a function of the histogram alone. That is the pattern: what is closed
//    is blind, and what sees the record is not closed.
//
// 9. THE TAIL-COUNT TRANSPORT IS PROVEN, KILL-COUNT-FREE, AND SHARP. The
//    inequality N_new <= (q-2)N + 2*SUM_L Q_L holds at every theta tested, 0
//    violations at five folds with max N_new/RHS of 1.0000, 1.0000, 0.8881,
//    0.8975, 0.9180. Its certificate is 42, 66, 108, 150, 204, 270 against the
//    true G2(new) of 42, 66, 108, 150, 204, 258: EXACT at five of six folds and
//    12 units high at the deepest, i.e. 0.000, 0.000, 0.000, 0.000, 0.000, 0.045
//    nats. The standing route through maxsum_{L+1}(old) gives 42, 96, 138, 168,
//    228, 300, i.e. 0.000, 0.375, 0.245, 0.113, 0.111, 0.151 nats. So the count
//    coordinate is three to eight times tighter per fold than the max coordinate
//    AND it never mentions L, which is what TODO 0c asks for.
//
// 10. ALL THE GROWTH IS IN THE MERGE TERMS. The L=0 term alone certifies 30, 42,
//    66, 108, 150, 204 — exactly G2(old) at every fold — and its share of the
//    RHS at the certificate is 0.0000 everywhere. The multiplier (q-2) is a
//    pure count multiplier at fixed theta and cannot move the support. Every
//    nat of growth is bought by the L >= 1 windows.
//
// 11. AND THE COUNT COORDINATE INHERITS A5's CAP EXACTLY. The index actually
//    spent at the certificate is K = 1, 1, 2, 2, 3, 3, against the cap
//    1 + theta/(3q) of 2.27, 2.69, 3.12, 3.63, 3.96, 4.10 — the certificate is
//    spending 44% to 76% of the cap. That cap is A5 Theorem B's G2/(3q), listed
//    beside it as 1.27, 1.69, 2.12, 2.63, 2.96, 2.97, and it arrives here from
//    the Alternation Lemma alone, with no kill run anywhere in the derivation.
//    The 0.18p wall is therefore not an artifact of the maxsum coordinate.
//
// 12. THE FAMILY DOES NOT CHAIN, and the failure is structural rather than
//    numerical. Carrying M window profiles and dropping every term with
//    m + K > M caps the certificate at maxsum_M(T_11), measured 108, 180, 240,
//    330 for M = 4, 8, 12, 16. The chain then prints the SAME number at every
//    level — 108, 108, 108, 108, 108 at M = 4 — while the truth runs 66, 108,
//    150, 204, 258. So it reads BUSTS against q^2 early and FALSE later: at
//    M = 4 it is false from fold 19, at M = 8 from fold 23, at M = 12 from fold
//    29, and at M = 16 it busts 169 and 289 before it is merely ok. A fixed
//    index certifies a constant against a diverging truth. The index must grow
//    with the level, at the rate reading 11 prices, which is the accumulating
//    index that gate-multiplies.md sections 2 and 5 close.
//
// 13. THE CERTIFICATE REPRODUCES THE TRUTH'S OWN SLACK. Against q^2 the margin
//    ln(q^2/cert) reads 1.058, 0.940, 0.984, 0.878, 0.953, 1.136 while the true
//    slack ln(q^2/G2) reads 1.058, 0.940, 0.984, 0.878, 0.953, 1.182. Identical
//    at five folds, 0.046 nats short at the sixth. So the instrument certifies
//    the Zone Postulate at every fold in reach and gives away essentially none
//    of the lifetime budget doing it.
//
// 14. WHAT THE INSTRUMENT ASKS FOR, EXACTLY. The certificate is the largest sum
//    of consecutive OLD gaps whose interior gaps all qualify mod q. Certifying
//    G2(x'#) < x'^2 is therefore exactly: no window of the old word with
//    qualifying interiors sums to x'^2 or more. Each interior is at least 2q-2
//    and each adjacent pair of them at least 6q, so such a window needs about
//    x'^2/(3q) qualifying gaps in a row. That is a decay hypothesis on runs of
//    qualifying gaps and nothing else — the same hypothesis kappa-not-L.md
//    names as what remains, reached here without L, without kappa(m), and
//    without a residue-deleted maxsum.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). One figure
// here is not in the OUTPUT block. No number above was changed.
//
// DERIVED IN THIS READING: 0.046 nats is reading 13's own subtraction,
//   1.182 - 1.136, of the two printed columns ln(q^2/G2) and ln(q^2/cert) at
//   the sixth fold. It is NOT the printed 0.045 of the per-fold loss ledger,
//   which is a different quantity at a different fold.
// ---------------------------------------------------------------------------
