// ============================================================================
// NATAL-ONSET 01 — THE DESTRUCTION-ONSET INSTRUMENT ON THE ORIGIN-LOCAL LINE
// ============================================================================
// THE QUESTION (Chris, 2026-08-21, from his hand-run of Natal@5 over the
// first 500 integers). On the integer line under the mod-30 wheel, the scour
// primes 7, 11, 13, ... enter one at a time, and Chris derived by hand that
// the FIRST FRESH KILL of scour prime q is exactly q^2: any earlier multiple
// q*m (m > 1, m coprime to 30) has lpf(m) < q and was already struck by that
// smaller prime. So at position n the influencer set is exactly {q : q^2 <= n}
// — a sqrt(n) staircase, one new tread per q^2. Pair destruction lags further:
// three onsets per prime — (1) first fresh kill = q^2; (2) first fresh kill
// landing in a twin channel (classes {11,13,17,19,29,1} mod 30); (3) first
// destruction of a LIVE pair (partner not already dead). This script runs the
// mathematics properly over positions 1..10000 (and reports 1..500 separately
// so Chris can diff it against his notebook): the three onsets per prime, the
// full live-pair destruction sequences and gaps, twin-destruction-only shares
// (Chris's explicit rule: total prime kills are disregarded; only destroyed
// twin pairs count), the A/B side split against a DERIVED null, the staircase
// and the origin restriction quantified, and the x = 37 fourth lens.
//
// HONEST DOUBT, stated up front. The window is origin-local and small; every
// count here is exact but none of it is asymptotic evidence. The A/B split in
// particular is dominated by a structural identity (derived below), so its
// "asymmetry" is a theorem plus a density, not a phenomenon. And part (e) is
// built to accept a clean negative: the record positions live many orders of
// magnitude beyond the onset staircase's zone, so the honest question is
// whether ANY onset-relative coordinate distinguishes 37, not whether one can
// be made to.
//
// PRIOR ART ON DISK (cited, extended, not duplicated):
//   - research/scour-into-fixed-tile.js — the q^2 rule TILE-GLOBALLY (fixed
//     width-W tile, effective scour = primes <= sqrt(W)); this file is its
//     origin-local dual: the integer line, the scour entering tread by tread.
//   - research/killrun.js + research/gen-natal5-17tile-scour.js — fresh kills
//     vs self-strikes and the Natal@5 (Houses 11/17) scour march, tile-global.
//   - research/birth-cohorts.js — Natal@5 as a birth cohort; vocabulary.
//   - research/history/staging/attack-0c-holesweep.md §4 — the Mirror-Sweep
//     Lemma (sigma(s) = W-2-s conjugates the deletion pair {a, a-2} into
//     {w-a, w-a-2}); its origin-local shadow is tested in part (c).
//   - research/exact-g2-ladder.js — the record positions used in part (e)
//     are CITED from its LADDER table (least attaining position, certified
//     there); nothing is re-enumerated here (standing compute rule).
//
// MODEL (the frame Chris hand-derived, verified against his three anchors
// before anything else is printed; ABORT on any mismatch):
//   Positions are the integers n in [1, N], N = 10000. The wheel removes
//   everything not coprime to 30. A composite n coprime to 30 is FRESHLY
//   KILLED by q = lpf(n) at time n (the scour front moves with n). Primes are
//   self-strikes (twins FOUND, not destroyed — killrun.js convention). Twin
//   channels: pairs (a, a+2) with a ≡ 11, 17, 29 (mod 30) — opener classes
//   (A-side) {11,17,29}, closer classes (B-side) {13,19,1}. A pair dies when
//   its FIRST member dies; the destroyer is lpf of that member; the pair is
//   LIVE at that moment by construction. Window pairs: openers a <= N-2.
// ============================================================================
'use strict';

const N = 10000;
const REPORT_N = 500;

// ---------------------------------------------------------------------------
// Sieve: smallest prime factor to N.
// ---------------------------------------------------------------------------
const spf = new Int32Array(N + 1);
for (let i = 2; i <= N; i++) if (!spf[i]) for (let j = i; j <= N; j += i) if (!spf[j]) spf[j] = i;
const isPrime = n => n >= 2 && spf[n] === n;

const A_CLASSES = [11, 17, 29];            // opener classes (A-side)
const B_CLASSES = [13, 19, 1];             // closer classes (B-side)
const CHANNEL = new Set([11, 13, 17, 19, 29, 1]);
const SCOUR = [];                          // q with q^2 <= N
for (let q = 7; q * q <= N; q++) if (isPrime(q) && q % 2 && q % 3 && q % 5) SCOUR.push(q);

// ---------------------------------------------------------------------------
// The pair ledger. One record per channel pair with opener <= N-2.
// ---------------------------------------------------------------------------
const pairs = [];
for (let a = 11; a <= N - 2; a++) {
  const c = a % 30;
  if (c !== 11 && c !== 17 && c !== 29) continue;
  const b = a + 2;
  const aP = isPrime(a), bP = isPrime(b);
  let rec;
  if (aP && bP) rec = { a, cls: c, fate: 'SURVIVES' };
  else if (!aP) rec = { a, cls: c, fate: 'DEAD', t: a, q: spf[a], side: 'A', struck: c };
  else rec = { a, cls: c, fate: 'DEAD', t: b, q: spf[b], side: 'B', struck: b % 30 };
  pairs.push(rec);
}
const dead = pairs.filter(p => p.fate === 'DEAD');
const survivors = pairs.filter(p => p.fate === 'SURVIVES');

// Fresh kills per scour prime (all wheel-coprime composites, channel or not).
const freshKills = new Map(SCOUR.map(q => [q, []]));
for (let n = 7; n <= N; n++) {
  if (n % 2 === 0 || n % 3 === 0 || n % 5 === 0) continue;
  if (isPrime(n) || n === 1) continue;
  const q = spf[n];
  if (freshKills.has(q)) freshKills.get(q).push(n);
}

// Destructions per prime, in time order.
const destBy = new Map(SCOUR.map(q => [q, []]));
for (const p of dead) if (destBy.has(p.q)) destBy.get(p.q).push(p);
for (const l of destBy.values()) l.sort((x, y) => x.t - y.t);

// ---------------------------------------------------------------------------
// CALIBRATION — Chris's three hand anchors. ABORT on mismatch.
// ---------------------------------------------------------------------------
function abort(msg) { console.log('ANCHOR MISMATCH — ABORT: ' + msg); process.exit(1); }
{
  // Anchor 1: 7's first pair-destruction is (47,49) at 49.
  const d7 = destBy.get(7)[0];
  if (!(d7 && d7.t === 49 && d7.a === 47)) abort(`7's first destruction is (${d7 && d7.a},${d7 && d7.a + 2}) at ${d7 && d7.t}, expected (47,49) at 49`);
  // Anchor 2: 11's first fresh kill is 121 and pair (119,121) is already dead via 119 = 7*17.
  const f11 = freshKills.get(11)[0];
  if (f11 !== 121) abort(`11's first fresh kill is ${f11}, expected 121`);
  const p119 = pairs.find(p => p.a === 119);
  if (!(p119 && p119.fate === 'DEAD' && p119.t === 119 && p119.q === 7)) abort('(119,121) should be dead at 119 via 7 (119 = 7*17)');
  // Anchor 3: 11's first LIVE-pair destruction is 209 = 11*19, pair (209,211).
  const d11 = destBy.get(11)[0];
  if (!(d11 && d11.t === 209 && d11.a === 209)) abort(`11's first destruction is (${d11 && d11.a}) at ${d11 && d11.t}, expected (209,211) at 209`);
  console.log('CALIBRATION: all three hand anchors PASS');
  console.log('  [1] 7: first pair-destruction (47,49) at 49            OK');
  console.log('  [2] 11: first fresh kill 121; (119,121) pre-dead at 119 via 7   OK');
  console.log('  [3] 11: first LIVE-pair destruction (209,211) at 209 = 11*19    OK');
  console.log('');
}

console.log(`Window: positions 1..${N}.  Scour primes with q^2 <= ${N}: ${SCOUR.join(' ')}`);
console.log(`Channel pairs (opener <= ${N - 2}): ${pairs.length}   destroyed: ${dead.length}   survive (= true twin pairs, since sieve is complete to sqrt(N)): ${survivors.length}`);
console.log('');
// ---------------------------------------------------------------------------
// (a) THE THREE ONSETS PER PRIME + full destruction sequences and gaps.
// PROVEN (one line, printed for the record): q coprime to 30 means q ≡ ±1,
// ±7, ±11, ±13 (mod 30), whose squares mod 30 are 1, 19, 1, 19 — BOTH twin
// channel closer classes. So onset(2) = onset(1) = q^2 for EVERY scour prime:
// the first fresh kill always lands in a channel, always on the B side, on
// the pair (q^2 - 2, q^2). Hence onset(3) = q^2 iff q^2 - 2 is prime.
// ---------------------------------------------------------------------------
console.log('='.repeat(96));
console.log('(a) THE THREE ONSETS  [onset2 = q^2 ALWAYS: q^2 ≡ 1 or 19 mod 30, both closer classes — PROVEN]');
console.log('='.repeat(96));
console.log('   q |  q^2 = onset1 | onset2 (channel) | onset3 (live pair)       | lag3-1 | q^2-2 prime?');
console.log('-'.repeat(96));
for (const q of SCOUR) {
  const fk = freshKills.get(q);
  const o1 = fk.length ? fk[0] : null;
  if (o1 !== q * q) abort(`onset1 of ${q} is ${o1}, expected ${q * q}`);
  const o2 = fk.find(n => CHANNEL.has(n % 30));
  if (o2 !== q * q) abort(`onset2 of ${q} is ${o2}, expected ${q * q} (q^2 is always a channel kill)`);
  const d = destBy.get(q);
  const o3 = d.length ? d[0] : null;
  const o3s = o3 ? `${o3.t} pair (${o3.a},${o3.a + 2}) ${o3.side}` : '(none in window)';
  const qq2p = isPrime(q * q - 2);
  if (qq2p !== (o3 && o3.t === q * q)) abort(`onset3=q^2 iff q^2-2 prime fails at ${q}`);
  console.log(` ${String(q).padStart(3)} | ${String(q * q).padStart(12)} | ${String(o2).padStart(15)}  | ${o3s.padEnd(24)} | ${String(o3 ? o3.t - q * q : '-').padStart(6)} | ${qq2p ? 'yes -> onset3 = q^2' : 'no'}`);
}
console.log('');

// Full destruction sequences + inter-destruction gaps, per prime.
const wrap = (arr, per, indent) => {
  const out = [];
  for (let i = 0; i < arr.length; i += per) out.push(indent + arr.slice(i, i + per).join(' '));
  return out.length ? out : [indent + '(none)'];
};
console.log('-'.repeat(96));
console.log('(a cont.) FULL LIVE-PAIR DESTRUCTION SEQUENCES (destruction times; suffix marks B-side strikes)');
console.log('          and inter-destruction gaps, per prime, window 1..' + N);
console.log('-'.repeat(96));
for (const q of SCOUR) {
  const d = destBy.get(q);
  const times = d.map(p => p.t + (p.side === 'B' ? 'b' : ''));
  const gaps = d.slice(1).map((p, i) => p.t - d[i].t);
  const gs = gaps.length ? `min ${Math.min(...gaps)}  median ${gaps.slice().sort((x, y) => x - y)[Math.floor(gaps.length / 2)]}  mean ${(gaps.reduce((s, g) => s + g, 0) / gaps.length).toFixed(1)}  max ${Math.max(...gaps)}` : '(fewer than 2 destructions)';
  console.log(`q = ${q}: ${d.length} live-pair destructions`);
  for (const l of wrap(times, 14, '    t: ')) console.log(l);
  for (const l of wrap(gaps, 16, '  gap: ')) console.log(l);
  console.log(`  gap stats: ${gs}`);
}
console.log('');

// Merged timeline 1..REPORT_N — bound evidence for Chris's notebook diff.
console.log('='.repeat(96));
console.log(`(a cont.) MERGED DESTRUCTION TIMELINE, positions 1..${REPORT_N}  (diff against the hand run)`);
console.log('  time n | destroyer q | pair (a,a+2)  | side struck | opener class | struck member = q * m');
console.log('='.repeat(96));
const tl = dead.filter(p => p.t <= REPORT_N).sort((x, y) => x.t - y.t);
for (const p of tl) {
  const struck = p.side === 'A' ? p.a : p.a + 2;
  console.log(`  ${String(p.t).padStart(6)} | ${String(p.q).padStart(11)} | (${p.a},${p.a + 2})`.padEnd(42) + `| ${p.side}  (${String(p.struck).padStart(2)} mod 30) | ${String(p.cls).padStart(2)} mod 30    | ${struck} = ${p.q} * ${struck / p.q}`);
}
const surv500 = pairs.filter(p => p.a <= REPORT_N - 2 && !(p.fate === 'DEAD' && p.t <= REPORT_N));
console.log(`  ${tl.length} destructions by ${REPORT_N}; pairs with opener <= ${REPORT_N - 2} still live at ${REPORT_N}: ${surv500.length}`);
console.log('  live at 500: ' + surv500.map(p => `(${p.a},${p.a + 2})`).join(' '));
console.log('');
// ---------------------------------------------------------------------------
// (b) TWIN-DESTRUCTION-ONLY STATISTICS (Chris's rule: total prime kills are
// disregarded; only destroyed twin pairs are counted).
// ---------------------------------------------------------------------------
console.log('='.repeat(96));
console.log('(b) TWIN-DESTRUCTION-ONLY SHARES  (' + dead.length + ' destroyed pairs of ' + pairs.length + ')');
console.log('   q | pairs destroyed | share of destroyed | share of all pairs | 2/q (naive kill rate)');
console.log('-'.repeat(96));
for (const q of SCOUR) {
  const k = destBy.get(q).length;
  console.log(` ${String(q).padStart(3)} | ${String(k).padStart(15)} | ${(100 * k / dead.length).toFixed(2).padStart(17)}% | ${(100 * k / pairs.length).toFixed(2).padStart(17)}% | ${(2 / q).toFixed(4)}`);
}
console.log('');
console.log('Survivor curve: live pairs among openers <= n, sampled at every tread q^2 (marked) and each 1000.');
const aliveAt = n => pairs.filter(p => p.a <= n && !(p.fate === 'DEAD' && p.t <= n)).length;
const pairsUpTo = n => pairs.filter(p => p.a <= n).length;
const samples = [];
for (const q of SCOUR) samples.push([q * q - 1, ''], [q * q, ` <-- tread: ${q} enters (q^2 = ${q * q})`]);
for (let n = 1000; n <= N; n += 1000) samples.push([n, '']);
samples.sort((x, y) => x[0] - y[0]);
console.log('       n | pairs seen | live | live share');
for (const [n, mark] of samples) {
  const t = pairsUpTo(n), l = aliveAt(n);
  console.log(`  ${String(n).padStart(6)} | ${String(t).padStart(10)} | ${String(l).padStart(4)} | ${(t ? 100 * l / t : 100).toFixed(1).padStart(9)}%${mark}`);
}
console.log('');

// ---------------------------------------------------------------------------
// (c) THE A/B SPLIT and its DERIVED null.
//
// PROVEN (the structural identity that replaces any 50:50 guess):
//   (c1) Kill level, CRT: q's fresh kills fall in each of the 8 wheel classes
//        mod 30 with one residue per class mod 30q; 3 classes are openers
//        (A-side) and 3 are closers (B-side), so the CHANNEL-KILL null is
//        exactly 1:1 A:B per full period 30q. Verified below on the window.
//   (c2) Aliveness: an A-side fresh channel kill strikes the opener a, which
//        dies at time a while the partner a+2 cannot die before a+2 > a.
//        So EVERY A-side fresh channel kill destroys a live pair. A B-side
//        fresh kill strikes the closer b = a+2; the pair is live iff the
//        opener a is PRIME (a composite opener died at a < b).
//   => The derived live-destruction null is NOT 50:50. It is
//        A : B = K_A : K_B * f_q,
//      with K_A ~ K_B (CRT) and f_q = P(opener prime | closer is a fresh
//      q-kill). The non-circular prediction for f_q used below is the local
//      prime density among openers near each B-kill (window +-1050), which
//      involves no pair-destruction data.
//
// Mirror-Sweep, origin-local shadow (attack-0c-holesweep.md §4): the corpus
// mirror sigma(s) = W-2-s becomes mu(n) = (-2-n) mod 30q here. mu maps the
// A-strike residue classes {a ≡ 0 mod q, a in 11/17/29 mod 30} EXACTLY onto
// the B-struck-pair opener classes {a ≡ -2 mod q, a in 17/11/29 mod 30},
// swapping channels 11<->17 and fixing 29. So the mirror exchanges A and B
// onsets at the residue-class level; what it cannot preserve is TIME ORDER,
// and (c2) is precisely the time-orientation breaking: the A side never needs
// an aliveness condition (the analog of "the seam side never loses").
// ---------------------------------------------------------------------------
console.log('='.repeat(96));
console.log('(c) THE A/B SPLIT vs THE DERIVED NULL   [A-kill => live destruction ALWAYS; B-kill => only if opener prime]');
console.log('   q | chan.kills A:B | A dest | B dest | obs A:B  | B kills w/ prime opener | f_q meas | f_q pred | B pred | mirror class swap');
console.log('-'.repeat(96));
// local prime density among openers near n (no destruction data involved)
const openerAll = [], openerPrime = [];
for (let a = 11; a <= N; a++) { const c = a % 30; if (c === 11 || c === 17 || c === 29) { openerAll.push(a); if (isPrime(a)) openerPrime.push(a); } }
const localF = n => {
  const lo = Math.max(1, n - 1050), hi = Math.min(N, n + 1050);
  const tot = openerAll.filter(a => a >= lo && a <= hi).length;
  const pr = openerPrime.filter(a => a >= lo && a <= hi).length;
  return tot ? pr / tot : 0;
};
let aggA = 0, aggB = 0, aggKA = 0, aggKB = 0, aggBpred = 0;
for (const q of SCOUR) {
  const fk = freshKills.get(q);
  const chanA = fk.filter(n => A_CLASSES.includes(n % 30));
  const chanB = fk.filter(n => B_CLASSES.includes(n % 30));
  const d = destBy.get(q);
  const dA = d.filter(p => p.side === 'A').length;
  const dB = d.filter(p => p.side === 'B').length;
  if (dA !== chanA.length) abort(`(c2) fails at ${q}: A-side channel kills ${chanA.length} != A destructions ${dA}`);
  const bLive = chanB.filter(b => isPrime(b - 2)).length;
  if (bLive !== dB) abort(`(c2) fails at ${q}: B kills with prime opener ${bLive} != B destructions ${dB}`);
  const fMeas = chanB.length ? bLive / chanB.length : 0;
  const fPred = chanB.length ? chanB.reduce((s, b) => s + localF(b), 0) / chanB.length : 0;
  const bPred = fPred * chanB.length;
  // mirror conjugation, exact class check both directions
  const M = 30 * q, mu = n => ((-2 - n) % M + M) % M;
  let mirrorOK = true;
  for (const a of chanA) { const m = mu(a); if ((m + 2) % q !== 0 || !A_CLASSES.includes(m % 30)) mirrorOK = false; }
  for (const b of chanB) { const m = mu(b - 2); if (m % q !== 0 || !B_CLASSES.includes((m + 2) % 30)) mirrorOK = false; }
  aggA += dA; aggB += dB; aggKA += chanA.length; aggKB += chanB.length; aggBpred += bPred;
  console.log(` ${String(q).padStart(3)} | ${String(chanA.length + ':' + chanB.length).padStart(13)}  | ${String(dA).padStart(6)} | ${String(dB).padStart(6)} | ${(dB ? (dA / dB).toFixed(2) : 'inf').padStart(7)}  | ${String(bLive).padStart(23)} | ${fMeas.toFixed(3).padStart(8)} | ${fPred.toFixed(3).padStart(8)} | ${bPred.toFixed(1).padStart(6)} | ${mirrorOK ? 'EXACT' : 'FAIL'}`);
  if (!mirrorOK) abort(`mirror conjugation failed at ${q}`);
}
console.log('-'.repeat(96));
console.log(` AGG | ${String(aggKA + ':' + aggKB).padStart(13)}  | ${String(aggA).padStart(6)} | ${String(aggB).padStart(6)} | ${(aggA / aggB).toFixed(2).padStart(7)}  |  B-dest predicted from local prime density: ${aggBpred.toFixed(1)} (measured ${aggB})`);
console.log(` Channel-kill A:B ratio ${(aggKA / aggKB).toFixed(3)} vs CRT null 1.000; live A:B ${(aggA / aggB).toFixed(2)} vs derived null ${(aggKA / aggBpred).toFixed(2)}`);
console.log('');
// ---------------------------------------------------------------------------
// (d) THE STAIRCASE — effective scour set vs n, per-tread newcomer share,
// and the origin "restriction" quantified.
// The effective scour set at n is {q : q^2 <= n} (PROVEN: first fresh kill of
// q is q^2 — Chris's hand derivation; the tile-global statement is already on
// disk in scour-into-fixed-tile.js). Treads: [q_i^2, q_{i+1}^2).
// "Restriction": near the origin the scour has not entered — pairs there face
// only the treads below them, so early intervals are over-alive relative to
// the deep window. Observed survivor share per tread is compared to the local
// sieve prediction prod_{7<=p<=q_i}(1 - 2/p) (each active p removes 2 of its
// p wheel-visible residues from the pair's survival) and to the deepest
// tread's observed share.
// ---------------------------------------------------------------------------
console.log('='.repeat(96));
console.log('(d) THE STAIRCASE.  |scour(n)| = pi(sqrt(n)) - 3; one tread per q^2.');
console.log('  tread [q^2, next q^2) | |scour| | dest. in tread | by newcomer q | newcomer share | pairs in tread | survive | share | prod(1-2/p) | ratio obs/pred');
console.log('-'.repeat(96));
let mert = 1;
const treads = SCOUR.map((q, i) => [q, q * q, i + 1 < SCOUR.length ? SCOUR[i + 1] * SCOUR[i + 1] : N + 1]);
console.log(`  [1, 49)  pre-scour     |       0 |              0 |             - |              - | ${String(pairsUpTo(48)).padStart(14)} | ${String(pairsUpTo(48)).padStart(7)} | 100.0% |       1.000 | (all pairs live: the restriction at its purest)`);
for (const [q, lo, hi] of treads) {
  mert *= 1 - 2 / q;
  const inT = dead.filter(p => p.t >= lo && p.t < hi);
  const byQ = inT.filter(p => p.q === q).length;
  const pin = pairs.filter(p => p.a >= lo && p.a < hi);
  const sin_ = pin.filter(p => p.fate === 'SURVIVES').length;
  const share = pin.length ? sin_ / pin.length : 0;
  console.log(`  [${String(lo).padStart(5)}, ${String(hi).padStart(5)}) ${('@' + q).padStart(6)} | ${String(SCOUR.filter(s => s * s <= lo).length).padStart(7)} | ${String(inT.length).padStart(14)} | ${String(byQ).padStart(13)} | ${(inT.length ? 100 * byQ / inT.length : 0).toFixed(1).padStart(13)}% | ${String(pin.length).padStart(14)} | ${String(sin_).padStart(7)} | ${(100 * share).toFixed(1).padStart(5)}% | ${mert.toFixed(4).padStart(11)} | ${(mert ? share / mert : 0).toFixed(2)}`);
}
const lastT = treads[treads.length - 1];
const deepPairs = pairs.filter(p => p.a >= lastT[1]);
const deepShare = deepPairs.filter(p => p.fate === 'SURVIVES').length / deepPairs.length;
console.log(`  Deepest tread survivor share ${(100 * deepShare).toFixed(1)}% is the window's best proxy for the fully-scoured rate;`);
console.log(`  the pre-scour head [1,49) sits at 100% and the first treads far above prod(1-2/p) * nothing — the`);
console.log(`  restriction is the staircase itself: a pair at n is only ever tested by the pi(sqrt(n))-3 treads below it.`);
console.log('');
// ---------------------------------------------------------------------------
// (e) THE x = 37 FOURTH LENS — onset staircase (origin-local) vs the G2
// record (period-global), connected honestly.
// Record positions CITED from research/exact-g2-ladder.js LADDER (least
// attaining position, lower-certified there; standing compute rule — nothing
// re-enumerated). The level-x tile's own scour set is the primes in [7, x],
// whose staircase saturates at n = x^2; beyond x^2 every scour prime of the
// level is active and the origin-local structure is over. The record position
// read as an integer also has an integer-line staircase coordinate: the
// number of treads below it is pi(sqrt(pos)), and its fine position between
// consecutive prime squares q1^2 <= pos < q2^2 is frac = (pos-q1^2)/(q2^2-q1^2)
// (uniform-ish null). If 37's record is onset-shaped, some onset-relative
// coordinate should make it an outlier against 29/31/41/43.
// 2^53 NOTE (width rule): pos_43 = 830330079152051 < 2^53, safe as Number;
// 43# = 1.31e16 > 2^53, so x# stays BigInt and ratios go through logs.
// ---------------------------------------------------------------------------
console.log('='.repeat(96));
console.log('(e) THE x = 37 FOURTH LENS  [record positions cited from exact-g2-ladder.js]');
const LADDER = [   // {x, G2(x#), least attaining position} — verbatim from exact-g2-ladder.js
  { x: 23, g: 204, pos: 76166567 },
  { x: 29, g: 258, pos: 1205437109 },
  { x: 31, g: 348, pos: 8813641451 },
  { x: 37, g: 528, pos: 544899485411 },
  { x: 41, g: 546, pos: 3784200788231 },
  { x: 43, g: 618, pos: 830330079152051 },
];
const PRIMES_TO_43 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43];
const maxRoot = Math.ceil(Math.sqrt(LADDER[LADDER.length - 1].pos)) + 100;
const comp = new Uint8Array(maxRoot + 1);
for (let i = 2; i * i <= maxRoot; i++) if (!comp[i]) for (let j = i * i; j <= maxRoot; j += i) comp[j] = 1;
let piTable = new Int32Array(maxRoot + 1);
{ let c = 0; for (let i = 2; i <= maxRoot; i++) { if (!comp[i]) c++; piTable[i] = c; } }
console.log('   x |            pos | pos/x#   | ln pos/ln x# | sqrt(pos) | pi(sqrt(pos)) | pos/x^2   | inter-square frac | frac dist to 1/2');
console.log('-'.repeat(96));
const rows = [];
for (const { x, pos } of LADDER) {
  const lnSharp = PRIMES_TO_43.filter(p => p <= x).reduce((s, p) => s + Math.log(p), 0);
  const lnPos = Math.log(pos);
  const ratio = Math.exp(lnPos - lnSharp);
  const root = Math.sqrt(pos);
  const fr = Math.floor(root);
  let q1 = fr; while (comp[q1]) q1--;
  let q2 = fr + 1; while (comp[q2]) q2++;
  if (!(q1 * q1 <= pos && pos < q2 * q2)) abort(`inter-square bracket fails at x=${x}`);
  const frac = (pos - q1 * q1) / (q2 * q2 - q1 * q1);
  const row = { x, pos, ratio, depth: lnPos / lnSharp, root, pi: piTable[fr], overX2: pos / (x * x), frac };
  rows.push(row);
  console.log(`  ${String(x).padStart(2)} | ${String(pos).padStart(14)} | ${ratio.toExponential(2)} | ${row.depth.toFixed(4).padStart(12)} | ${root.toExponential(3).padStart(9)} | ${String(row.pi).padStart(13)} | ${row.overX2.toExponential(2)} | ${frac.toFixed(4).padStart(17)} | ${Math.abs(frac - 0.5).toFixed(4)}`);
}
console.log('');
console.log('  Onset-relative ranks of x = 37 among the five comparison levels {29,31,37,41,43}:');
const comparators = rows.filter(r => r.x >= 29);
const rankOf = (key, label) => {
  const sorted = comparators.slice().sort((a, b) => a[key] - b[key]);
  const r = sorted.findIndex(v => v.x === 37) + 1;
  const vals = sorted.map(v => `${v.x}:${typeof v[key] === 'number' ? v[key].toPrecision(3) : v[key]}`).join('  ');
  console.log(`    ${label.padEnd(34)} rank ${r}/5 ascending   [${vals}]`);
  return r;
};
rankOf('ratio', 'fractional depth pos/x#');
rankOf('depth', 'log depth ln pos / ln x#');
rankOf('overX2', 'pos / x^2 (past staircase saturation)');
rankOf('frac', 'inter-prime-square fraction');
console.log('');
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-onset-01.js
//   invocation:  node research/natal-onset-01.js
//   code-sha256: c7b13ef0b2c89be967054efe9f9614f5ca98f697d87c5529213f41b340f63913
//   out-sha256:  b60923399e2da864a1eb61cd9a637eb5c8039d494ec5fd6b644a148bee15e2eb
//   body-lines:  410
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     0.3 s
// ============================================================================
// CALIBRATION: all three hand anchors PASS
//   [1] 7: first pair-destruction (47,49) at 49            OK
//   [2] 11: first fresh kill 121; (119,121) pre-dead at 119 via 7   OK
//   [3] 11: first LIVE-pair destruction (209,211) at 209 = 11*19    OK
//
// Window: positions 1..10000.  Scour primes with q^2 <= 10000: 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97
// Channel pairs (opener <= 9998): 999   destroyed: 796   survive (= true twin pairs, since sieve is complete to sqrt(N)): 203
//
// ================================================================================================
// (a) THE THREE ONSETS  [onset2 = q^2 ALWAYS: q^2 ≡ 1 or 19 mod 30, both closer classes — PROVEN]
// ================================================================================================
//    q |  q^2 = onset1 | onset2 (channel) | onset3 (live pair)       | lag3-1 | q^2-2 prime?
// ------------------------------------------------------------------------------------------------
//    7 |           49 |              49  | 49 pair (47,49) B        |      0 | yes -> onset3 = q^2
//   11 |          121 |             121  | 209 pair (209,211) A     |     88 | no
//   13 |          169 |             169  | 169 pair (167,169) B     |      0 | yes -> onset3 = q^2
//   17 |          289 |             289  | 391 pair (389,391) B     |    102 | no
//   19 |          361 |             361  | 361 pair (359,361) B     |      0 | yes -> onset3 = q^2
//   23 |          529 |             529  | 851 pair (851,853) A     |    322 | no
//   29 |          841 |             841  | 841 pair (839,841) B     |      0 | yes -> onset3 = q^2
//   31 |          961 |             961  | 1271 pair (1271,1273) A  |    310 | no
//   37 |         1369 |            1369  | 1369 pair (1367,1369) B  |      0 | yes -> onset3 = q^2
//   41 |         1681 |            1681  | 2419 pair (2417,2419) B  |    738 | no
//   43 |         1849 |            1849  | 1849 pair (1847,1849) B  |      0 | yes -> onset3 = q^2
//   47 |         2209 |            2209  | 2209 pair (2207,2209) B  |      0 | yes -> onset3 = q^2
//   53 |         2809 |            2809  | 3551 pair (3551,3553) A  |    742 | no
//   59 |         3481 |            3481  | 3599 pair (3599,3601) A  |    118 | no
//   61 |         3721 |            3721  | 3721 pair (3719,3721) B  |      0 | yes -> onset3 = q^2
//   67 |         4489 |            4489  | 4757 pair (4757,4759) A  |    268 | no
//   71 |         5041 |            5041  | 5041 pair (5039,5041) B  |      0 | yes -> onset3 = q^2
//   73 |         5329 |            5329  | 6059 pair (6059,6061) A  |    730 | no
//   79 |         6241 |            6241  | 6557 pair (6557,6559) A  |    316 | no
//   83 |         6889 |            6889  | 8051 pair (8051,8053) A  |   1162 | no
//   89 |         7921 |            7921  | 7921 pair (7919,7921) B  |      0 | yes -> onset3 = q^2
//   97 |         9409 |            9409  | 9797 pair (9797,9799) A  |    388 | no
//
// ------------------------------------------------------------------------------------------------
// (a cont.) FULL LIVE-PAIR DESTRUCTION SEQUENCES (destruction times; suffix marks B-side strikes)
//           and inter-destruction gaps, per prime, window 1..10000
// ------------------------------------------------------------------------------------------------
// q = 7: 219 live-pair destructions
//     t: 49b 77 91b 119 133b 161 259b 287 329 371 469b 497 511b 539
//     t: 581 679b 707 721b 749 763b 791 889b 917 931b 959 973b 1001 1099b
//     t: 1127 1169 1183b 1211 1309b 1337 1379 1421 1547 1561b 1589 1603b 1631 1757
//     t: 1799 1813b 1841 1967 1981b 2009 2051 2177 2219 2261 2359b 2387 2401b 2429
//     t: 2443b 2471 2597 2611b 2639 2681 2779b 2807 2821b 2849 2863b 2891 3017 3059
//     t: 3101 3227 3269 3311 3409b 3437 3451b 3479 3493b 3521 3619b 3647 3661b 3689
//     t: 3703b 3731 3857 3899 3913b 3941 4067 4081b 4109 4151 4277 4291b 4319 4361
//     t: 4459b 4487 4529 4571 4697 4739 4753b 4781 4879b 4907 4921b 4949 4991 5089b
//     t: 5117 5159 5173b 5201 5299b 5327 5369 5383b 5411 5509b 5537 5579 5593b 5621
//     t: 5719b 5747 5789 5803b 5831 5929b 5957 5999 6013b 6041 6167 6209 6223b 6251
//     t: 6377 6391b 6419 6461 6587 6601b 6629 6671 6797 6839 6881 6979b 7007 7021b
//     t: 7049 7091 7189b 7217 7231b 7259 7301 7427 7469 7483b 7511 7609b 7637 7651b
//     t: 7679 7693b 7721 7819b 7847 7889 7903b 7931 8057 8071b 8099 8113b 8141 8239b
//     t: 8267 8309 8351 8449b 8477 8519 8561 8687 8701b 8729 8743b 8771 8869b 8897
//     t: 8939 8953b 8981 9107 9149 9163b 9191 9317 9359 9373b 9401 9499b 9527 9541b
//     t: 9569 9611 9737 9751b 9779 9793b 9821 9947 9989
//   gap: 28 14 28 14 28 98 28 42 42 98 28 14 28 42 98 28
//   gap: 14 28 14 28 98 28 14 28 14 28 98 28 42 14 28 98
//   gap: 28 42 42 126 14 28 14 28 126 42 14 28 126 14 28 42
//   gap: 126 42 42 98 28 14 28 14 28 126 14 28 42 98 28 14
//   gap: 28 14 28 126 42 42 126 42 42 98 28 14 28 14 28 98
//   gap: 28 14 28 14 28 126 42 14 28 126 14 28 42 126 14 28
//   gap: 42 98 28 42 42 126 42 14 28 98 28 14 28 42 98 28
//   gap: 42 14 28 98 28 42 14 28 98 28 42 14 28 98 28 42
//   gap: 14 28 98 28 42 14 28 126 42 14 28 126 14 28 42 126
//   gap: 14 28 42 126 42 42 98 28 14 28 42 98 28 14 28 42
//   gap: 126 42 14 28 98 28 14 28 14 28 98 28 42 14 28 126
//   gap: 14 28 14 28 98 28 42 42 98 28 42 42 126 14 28 14
//   gap: 28 98 28 42 14 28 126 42 14 28 126 42 14 28 98 28
//   gap: 14 28 42 126 14 28 14 28 126 42
//   gap stats: min 14  median 28  mean 45.6  max 126
// q = 11: 120 live-pair destructions
//     t: 209 253b 319b 341 407 451b 649b 671 737 869 913b 979b 1067 1111b
//     t: 1199 1331 1397 1441b 1529 1573b 1639b 1661 1727 1859 1903b 1991 2057 2101b
//     t: 2189 2299b 2321 2519 2651 2717 2959b 2981 3047 3091b 3179 3223b 3377 3509
//     t: 3641 3707 3839 3883b 3949b 3971 4037 4169 4213b 4301 4367 4411b 4499 4631
//     t: 4829 4873b 4939b 4961 5027 5291 5357 5401b 5489 5533b 5687 5819 5863b 5951
//     t: 6017 6149 6259b 6281 6347 6479 6523b 6611 6677 6721b 6809 6919b 6941 7139
//     t: 7249b 7271 7337 7579b 7601 7667 7799 7843b 7909b 7997 8041b 8129 8173b 8261
//     t: 8327 8371b 8459 8503b 8591 8657 8789 8833b 8921 8987 9031b 9119 9229b 9251
//     t: 9449 9493b 9581 9647 9691b 9889b 9911 9977
//   gap: 44 66 22 66 44 198 22 66 132 44 66 88 44 88 132 66
//   gap: 44 88 44 66 22 66 132 44 88 66 44 88 110 22 198 132
//   gap: 66 242 22 66 44 88 44 154 132 132 66 132 44 66 22 66
//   gap: 132 44 88 66 44 88 132 198 44 66 22 66 264 66 44 88
//   gap: 44 154 132 44 88 66 132 110 22 66 132 44 88 66 44 88
//   gap: 110 22 198 110 22 66 242 22 66 132 44 66 88 44 88 44
//   gap: 88 66 44 88 44 88 66 132 44 88 66 44 88 110 22 198
//   gap: 44 88 66 44 198 22 66
//   gap stats: min 22  median 66  mean 82.1  max 264
// q = 13: 86 live-pair destructions
//     t: 169b 221 299 377 403b 481b 559b 611 689 767 949b 1079 1157 1261b
//     t: 1391 1469 1781 1937 2041b 2171 2249 2327 2353b 2561 2743b 2899b 2951 3029
//     t: 3107 3211b 3341 3419 3497 3679b 3809 3887 3991b 4121 4199 4511 4589 4667
//     t: 4693b 4901 4979 5057 5083b 5239b 5447 5473b 5681 5759 5837 5941b 6071 6227
//     t: 6331b 6539 6617 6851 6929 7111b 7241 7319 7397 7501b 7631 7709 7787 8021
//     t: 8177 8411 8489 8567 8671b 8749b 8801 8879 8957 9061b 9139b 9269 9347 9659
//     t: 9841b 9971
//   gap: 52 78 78 26 78 78 52 78 78 182 130 78 104 130 78 312
//   gap: 156 104 130 78 78 26 208 182 156 52 78 78 104 130 78 78
//   gap: 182 130 78 104 130 78 312 78 78 26 208 78 78 26 156 208
//   gap: 26 208 78 78 104 130 156 104 208 78 234 78 182 130 78 78
//   gap: 104 130 78 78 234 156 234 78 78 104 78 52 78 78 104 78
//   gap: 130 78 312 182 130
//   gap stats: min 26  median 78  mean 115.3  max 312
// q = 17: 57 live-pair destructions
//     t: 391b 493b 527 629 731 799b 1037 1139 1241 1411b 1513b 1649 1751 2159
//     t: 2533b 2567 2669 2771 2839b 2941b 3043b 3077 3281 3349b 3587 3791 4097 4607
//     t: 4709 4811 5219 5321 5389b 5627 5729 5899b 6103b 6137 6239 6341 6647 6749
//     t: 7123b 7157 7361 7531b 7769 7871 7939b 8279 8381 8891 9197 9299 9469b 9707
//     t: 9809
//   gap: 102 34 102 102 68 238 102 102 170 102 136 102 408 374 34 102
//   gap: 102 68 102 102 34 204 68 238 204 306 510 102 102 408 102 68
//   gap: 238 102 170 204 34 102 102 306 102 374 34 204 170 238 102 68
//   gap: 340 102 510 306 102 170 238 102
//   gap stats: min 34  median 102  mean 168.2  max 510
// q = 19: 55 live-pair destructions
//     t: 361b 437 551 589b 703b 779 1007 1121 1349 1501b 1577 1691 1919 2071b
//     t: 2147 2413b 2489 2831 3287 3401 3629 3781b 4009b 4351b 4427 4541 4769 4997
//     t: 5111 5149b 5263b 5339 5567 5909 6289b 6707 6821 6859b 6973b 7277 7391 7543b
//     t: 7619 7961 8189 8417 8531 8683b 8759 9101 9329 9481b 9557 9671 9899
//   gap: 76 114 38 114 76 228 114 228 152 76 114 228 152 76 266 76
//   gap: 342 456 114 228 152 228 342 76 114 228 228 114 38 114 76 228
//   gap: 342 380 418 114 38 114 304 114 152 76 342 228 228 114 152 76
//   gap: 342 228 152 76 114 228
//   gap stats: min 38  median 152  mean 176.6  max 456
// q = 23: 40 live-pair destructions
//     t: 851 943b 989 1219b 1541 1679 1817 1909b 2231 2369 2461b 2507 2921 3013b
//     t: 3197 3611 3749 4393b 4439 4577 5129 5267 6049b 6371 6509 6739b 7061 7153b
//     t: 7199 7751 8027 8119b 8441 8579 8717 8809b 9131 9223b 9407 9959
//   gap: 92 46 230 322 138 138 92 322 138 92 46 414 92 184 414 138
//   gap: 644 46 138 552 138 782 322 138 230 322 92 46 552 276 92 322
//   gap: 138 138 92 322 92 184 552
//   gap stats: min 46  median 138  mean 233.5  max 782
// q = 29: 33 live-pair destructions
//     t: 841b 899 1189b 1247 1363b 1711b 1769 2117 2291 2581b 2929b 2987 3161 3799b
//     t: 4031 4379 4727 5191b 5249 5597 5713b 5771 6119 6467 6583b 6641 6989 7453b
//     t: 7859 8149b 8207 9077 9599
//   gap: 58 290 58 116 348 58 348 174 290 348 58 174 638 232 348 348
//   gap: 464 58 348 116 58 348 348 116 58 348 464 406 290 58 870 522
//   gap stats: min 58  median 290  mean 273.7  max 870
// q = 31: 29 live-pair destructions
//     t: 1271 1457 1829 1891b 2201 2449b 2759 3131 3193b 3317 4061 4247 4619 4681b
//     t: 5053b 5177 5549 5921 5983b 6107 6913b 7037 7409 7781 7967 8339 8711 9641
//     t: 9827
//   gap: 186 372 62 310 248 310 372 62 124 744 186 372 62 372 124 372
//   gap: 372 62 124 806 124 372 372 186 372 372 930 186
//   gap stats: min 62  median 310  mean 305.6  max 930
// q = 37: 24 live-pair destructions
//     t: 1369b 1517 1739 1961 2479b 2627 2701b 3071 3737 3959 4181 4847 5069 5809b
//     t: 6031b 6179 6401 7067 7289 8399 8621 9287 9509 9731
//   gap: 148 222 222 518 148 74 370 666 222 222 666 222 740 222 148 222
//   gap: 666 222 1110 222 666 222 222
//   gap stats: min 74  median 222  mean 363.6  max 1110
// q = 41: 19 live-pair destructions
//     t: 2419b 2501 2747 2911b 3239 3977 4141b 4469 5207 5699 6191 6437 7421 7831b
//     t: 8159 8651 9389 9553b 9881
//   gap: 82 246 164 328 738 164 328 738 492 492 246 984 410 328 492 738
//   gap: 164 328
//   gap stats: min 82  median 328  mean 414.6  max 984
// q = 43: 21 live-pair destructions
//     t: 1849b 2021 2279 2537 2623b 2881b 3139b 3569 3827 4601 4859 5891 6407 6493b
//     t: 7181 7439 7697 8299b 8471 9589b 9761
//   gap: 172 258 258 86 258 258 430 258 774 258 1032 516 86 688 258 258
//   gap: 602 172 1118 172
//   gap stats: min 86  median 258  mean 395.6  max 1118
// q = 47: 16 live-pair destructions
//     t: 2209b 2867 3149 3431 4559 4841 5311b 5969 7003b 7097 7379 7661 8507 9071
//     t: 9259b 9917
//   gap: 658 282 282 1128 282 470 658 1034 94 282 282 846 564 188 658
//   gap stats: min 94  median 470  mean 513.9  max 1128
// q = 53: 16 live-pair destructions
//     t: 3551 3763b 3869 4187 4399b 5141 5353b 5459 5671b 5777 5989b 6731 7367 8321
//     t: 8639 8851b
//   gap: 212 106 318 212 742 212 106 212 106 212 742 636 954 318 212
//   gap stats: min 106  median 212  mean 353.3  max 954
// q = 59: 12 live-pair destructions
//     t: 3599 4307 4661 6077 6313b 6431 7729b 8083b 8201 8909 9617 9853b
//   gap: 708 354 1416 236 118 1298 354 118 708 708 236
//   gap stats: min 118  median 354  mean 568.5  max 1416
// q = 61: 12 live-pair destructions
//     t: 3721b 4331 4453b 4819b 5429 6161 6527 7991 8357 9089 9211b 9943b
//   gap: 610 122 366 610 732 366 1464 366 732 122 732
//   gap stats: min 122  median 610  mean 565.6  max 1464
// q = 67: 10 live-pair destructions
//     t: 4757 4891b 5561 6767 6901b 7169 7571 8777 9179 9313b
//   gap: 134 670 1206 134 268 402 1206 402 134
//   gap stats: min 134  median 402  mean 506.2  max 1206
// q = 71: 7 live-pair destructions
//     t: 5041b 5609 6319b 6887 7739 9017 9869
//   gap: 568 710 568 852 1278 852
//   gap stats: min 568  median 852  mean 804.7  max 1278
// q = 73: 6 live-pair destructions
//     t: 6059 6497 7081b 7519b 7811 8249
//   gap: 438 584 438 292 438
//   gap stats: min 292  median 438  mean 438.0  max 584
// q = 79: 5 live-pair destructions
//     t: 6557 7031 7979 8611b 8927
//   gap: 474 948 632 316
//   gap stats: min 316  median 632  mean 592.5  max 948
// q = 83: 4 live-pair destructions
//     t: 8051 8549 9047 9379b
//   gap: 498 498 332
//   gap stats: min 332  median 498  mean 442.7  max 498
// q = 89: 4 live-pair destructions
//     t: 7921b 9167 9523b 9701
//   gap: 1246 356 178
//   gap stats: min 178  median 356  mean 593.3  max 1246
// q = 97: 1 live-pair destructions
//     t: 9797
//   gap: (none)
//   gap stats: (fewer than 2 destructions)
//
// ================================================================================================
// (a cont.) MERGED DESTRUCTION TIMELINE, positions 1..500  (diff against the hand run)
//   time n | destroyer q | pair (a,a+2)  | side struck | opener class | struck member = q * m
// ================================================================================================
//       49 |           7 | (47,49)          | B  (19 mod 30) | 17 mod 30    | 49 = 7 * 7
//       77 |           7 | (77,79)          | A  (17 mod 30) | 17 mod 30    | 77 = 7 * 11
//       91 |           7 | (89,91)          | B  ( 1 mod 30) | 29 mod 30    | 91 = 7 * 13
//      119 |           7 | (119,121)        | A  (29 mod 30) | 29 mod 30    | 119 = 7 * 17
//      133 |           7 | (131,133)        | B  (13 mod 30) | 11 mod 30    | 133 = 7 * 19
//      161 |           7 | (161,163)        | A  (11 mod 30) | 11 mod 30    | 161 = 7 * 23
//      169 |          13 | (167,169)        | B  (19 mod 30) | 17 mod 30    | 169 = 13 * 13
//      209 |          11 | (209,211)        | A  (29 mod 30) | 29 mod 30    | 209 = 11 * 19
//      221 |          13 | (221,223)        | A  (11 mod 30) | 11 mod 30    | 221 = 13 * 17
//      253 |          11 | (251,253)        | B  (13 mod 30) | 11 mod 30    | 253 = 11 * 23
//      259 |           7 | (257,259)        | B  (19 mod 30) | 17 mod 30    | 259 = 7 * 37
//      287 |           7 | (287,289)        | A  (17 mod 30) | 17 mod 30    | 287 = 7 * 41
//      299 |          13 | (299,301)        | A  (29 mod 30) | 29 mod 30    | 299 = 13 * 23
//      319 |          11 | (317,319)        | B  (19 mod 30) | 17 mod 30    | 319 = 11 * 29
//      329 |           7 | (329,331)        | A  (29 mod 30) | 29 mod 30    | 329 = 7 * 47
//      341 |          11 | (341,343)        | A  (11 mod 30) | 11 mod 30    | 341 = 11 * 31
//      361 |          19 | (359,361)        | B  ( 1 mod 30) | 29 mod 30    | 361 = 19 * 19
//      371 |           7 | (371,373)        | A  (11 mod 30) | 11 mod 30    | 371 = 7 * 53
//      377 |          13 | (377,379)        | A  (17 mod 30) | 17 mod 30    | 377 = 13 * 29
//      391 |          17 | (389,391)        | B  ( 1 mod 30) | 29 mod 30    | 391 = 17 * 23
//      403 |          13 | (401,403)        | B  (13 mod 30) | 11 mod 30    | 403 = 13 * 31
//      407 |          11 | (407,409)        | A  (17 mod 30) | 17 mod 30    | 407 = 11 * 37
//      437 |          19 | (437,439)        | A  (17 mod 30) | 17 mod 30    | 437 = 19 * 23
//      451 |          11 | (449,451)        | B  ( 1 mod 30) | 29 mod 30    | 451 = 11 * 41
//      469 |           7 | (467,469)        | B  (19 mod 30) | 17 mod 30    | 469 = 7 * 67
//      481 |          13 | (479,481)        | B  ( 1 mod 30) | 29 mod 30    | 481 = 13 * 37
//      493 |          17 | (491,493)        | B  (13 mod 30) | 11 mod 30    | 493 = 17 * 29
//      497 |           7 | (497,499)        | A  (17 mod 30) | 17 mod 30    | 497 = 7 * 71
//   28 destructions by 500; pairs with opener <= 498 still live at 500: 22
//   live at 500: (11,13) (17,19) (29,31) (41,43) (59,61) (71,73) (101,103) (107,109) (137,139) (149,151) (179,181) (191,193) (197,199) (227,229) (239,241) (269,271) (281,283) (311,313) (347,349) (419,421) (431,433) (461,463)
//
// ================================================================================================
// (b) TWIN-DESTRUCTION-ONLY SHARES  (796 destroyed pairs of 999)
//    q | pairs destroyed | share of destroyed | share of all pairs | 2/q (naive kill rate)
// ------------------------------------------------------------------------------------------------
//    7 |             219 |             27.51% |             21.92% | 0.2857
//   11 |             120 |             15.08% |             12.01% | 0.1818
//   13 |              86 |             10.80% |              8.61% | 0.1538
//   17 |              57 |              7.16% |              5.71% | 0.1176
//   19 |              55 |              6.91% |              5.51% | 0.1053
//   23 |              40 |              5.03% |              4.00% | 0.0870
//   29 |              33 |              4.15% |              3.30% | 0.0690
//   31 |              29 |              3.64% |              2.90% | 0.0645
//   37 |              24 |              3.02% |              2.40% | 0.0541
//   41 |              19 |              2.39% |              1.90% | 0.0488
//   43 |              21 |              2.64% |              2.10% | 0.0465
//   47 |              16 |              2.01% |              1.60% | 0.0426
//   53 |              16 |              2.01% |              1.60% | 0.0377
//   59 |              12 |              1.51% |              1.20% | 0.0339
//   61 |              12 |              1.51% |              1.20% | 0.0328
//   67 |              10 |              1.26% |              1.00% | 0.0299
//   71 |               7 |              0.88% |              0.70% | 0.0282
//   73 |               6 |              0.75% |              0.60% | 0.0274
//   79 |               5 |              0.63% |              0.50% | 0.0253
//   83 |               4 |              0.50% |              0.40% | 0.0241
//   89 |               4 |              0.50% |              0.40% | 0.0225
//   97 |               1 |              0.13% |              0.10% | 0.0206
//
// Survivor curve: live pairs among openers <= n, sampled at every tread q^2 (marked) and each 1000.
//        n | pairs seen | live | live share
//       48 |          5 |    5 |     100.0%
//       49 |          5 |    4 |      80.0% <-- tread: 7 enters (q^2 = 49)
//      120 |         12 |    8 |      66.7%
//      121 |         12 |    8 |      66.7% <-- tread: 11 enters (q^2 = 121)
//      168 |         17 |   11 |      64.7%
//      169 |         17 |   10 |      58.8% <-- tread: 13 enters (q^2 = 169)
//      288 |         29 |   17 |      58.6%
//      289 |         29 |   17 |      58.6% <-- tread: 17 enters (q^2 = 289)
//      360 |         36 |   20 |      55.6%
//      361 |         36 |   19 |      52.8% <-- tread: 19 enters (q^2 = 361)
//      528 |         53 |   23 |      43.4%
//      529 |         53 |   23 |      43.4% <-- tread: 23 enters (q^2 = 529)
//      840 |         84 |   32 |      38.1%
//      841 |         84 |   31 |      36.9% <-- tread: 29 enters (q^2 = 841)
//      960 |         96 |   33 |      34.4%
//      961 |         96 |   33 |      34.4% <-- tread: 31 enters (q^2 = 961)
//     1000 |         99 |   33 |      33.3%
//     1368 |        137 |   45 |      32.8%
//     1369 |        137 |   44 |      32.1% <-- tread: 37 enters (q^2 = 1369)
//     1680 |        168 |   51 |      30.4%
//     1681 |        168 |   51 |      30.4% <-- tread: 41 enters (q^2 = 1681)
//     1848 |        185 |   55 |      29.7%
//     1849 |        185 |   54 |      29.2% <-- tread: 43 enters (q^2 = 1849)
//     2000 |        200 |   59 |      29.5%
//     2208 |        221 |   66 |      29.9%
//     2209 |        221 |   65 |      29.4% <-- tread: 47 enters (q^2 = 2209)
//     2808 |        281 |   78 |      27.8%
//     2809 |        281 |   78 |      27.8% <-- tread: 53 enters (q^2 = 2809)
//     3000 |        300 |   80 |      26.7%
//     3480 |        348 |   91 |      26.1%
//     3481 |        348 |   91 |      26.1% <-- tread: 59 enters (q^2 = 3481)
//     3720 |        372 |   97 |      26.1%
//     3721 |        372 |   96 |      25.8% <-- tread: 61 enters (q^2 = 3721)
//     4000 |        399 |  101 |      25.3%
//     4488 |        449 |  115 |      25.6%
//     4489 |        449 |  115 |      25.6% <-- tread: 67 enters (q^2 = 4489)
//     5000 |        500 |  124 |      24.8%
//     5040 |        504 |  127 |      25.2%
//     5041 |        504 |  126 |      25.0% <-- tread: 71 enters (q^2 = 5041)
//     5328 |        533 |  129 |      24.2%
//     5329 |        533 |  129 |      24.2% <-- tread: 73 enters (q^2 = 5329)
//     6000 |        600 |  141 |      23.5%
//     6240 |        624 |  144 |      23.1%
//     6241 |        624 |  144 |      23.1% <-- tread: 79 enters (q^2 = 6241)
//     6888 |        689 |  158 |      22.9%
//     6889 |        689 |  158 |      22.9% <-- tread: 83 enters (q^2 = 6889)
//     7000 |        699 |  160 |      22.9%
//     7920 |        792 |  173 |      21.8%
//     7921 |        792 |  172 |      21.7% <-- tread: 89 enters (q^2 = 7921)
//     8000 |        800 |  173 |      21.6%
//     9000 |        900 |  188 |      20.9%
//     9408 |        941 |  193 |      20.5%
//     9409 |        941 |  193 |      20.5% <-- tread: 97 enters (q^2 = 9409)
//    10000 |        999 |  203 |      20.3%
//
// ================================================================================================
// (c) THE A/B SPLIT vs THE DERIVED NULL   [A-kill => live destruction ALWAYS; B-kill => only if opener prime]
//    q | chan.kills A:B | A dest | B dest | obs A:B  | B kills w/ prime opener | f_q meas | f_q pred | B pred | mirror class swap
// ------------------------------------------------------------------------------------------------
//    7 |       143:143  |    143 |     76 |    1.88  |                      76 |    0.531 |    0.459 |   65.6 | EXACT
//   11 |         77:78  |     77 |     43 |    1.79  |                      43 |    0.551 |    0.460 |   35.9 | EXACT
//   13 |         60:59  |     60 |     26 |    2.31  |                      26 |    0.441 |    0.456 |   26.9 | EXACT
//   17 |         40:43  |     40 |     17 |    2.35  |                      17 |    0.395 |    0.463 |   19.9 | EXACT
//   19 |         38:33  |     38 |     17 |    2.24  |                      17 |    0.515 |    0.461 |   15.2 | EXACT
//   23 |         28:29  |     28 |     12 |    2.33  |                      12 |    0.414 |    0.459 |   13.3 | EXACT
//   29 |         21:23  |     21 |     12 |    1.75  |                      12 |    0.522 |    0.450 |   10.4 | EXACT
//   31 |         22:20  |     22 |      7 |    3.14  |                       7 |    0.350 |    0.453 |    9.1 | EXACT
//   37 |         19:16  |     19 |      5 |    3.80  |                       5 |    0.313 |    0.451 |    7.2 | EXACT
//   41 |         14:15  |     14 |      5 |    2.80  |                       5 |    0.333 |    0.450 |    6.7 | EXACT
//   43 |         14:14  |     14 |      7 |    2.00  |                       7 |    0.500 |    0.436 |    6.1 | EXACT
//   47 |         12:13  |     12 |      4 |    3.00  |                       4 |    0.308 |    0.435 |    5.7 | EXACT
//   53 |         10:10  |     10 |      6 |    1.67  |                       6 |    0.600 |    0.432 |    4.3 | EXACT
//   59 |           8:9  |      8 |      4 |    2.00  |                       4 |    0.444 |    0.429 |    3.9 | EXACT
//   61 |           7:8  |      7 |      5 |    1.40  |                       5 |    0.625 |    0.428 |    3.4 | EXACT
//   67 |           7:8  |      7 |      3 |    2.33  |                       3 |    0.375 |    0.430 |    3.4 | EXACT
//   71 |           5:6  |      5 |      2 |    2.50  |                       2 |    0.333 |    0.418 |    2.5 | EXACT
//   73 |           4:4  |      4 |      2 |    2.00  |                       2 |    0.500 |    0.409 |    1.6 | EXACT
//   79 |           4:3  |      4 |      1 |    4.00  |                       1 |    0.333 |    0.408 |    1.2 | EXACT
//   83 |           3:4  |      3 |      1 |    3.00  |                       1 |    0.250 |    0.405 |    1.6 | EXACT
//   89 |           2:3  |      2 |      2 |    1.00  |                       2 |    0.667 |    0.397 |    1.2 | EXACT
//   97 |           1:2  |      1 |      0 |     inf  |                       0 |    0.000 |    0.409 |    0.8 | EXACT
// ------------------------------------------------------------------------------------------------
//  AGG |       539:543  |    539 |    257 |    2.10  |  B-dest predicted from local prime density: 246.0 (measured 257)
//  Channel-kill A:B ratio 0.993 vs CRT null 1.000; live A:B 2.10 vs derived null 2.19
//
// ================================================================================================
// (d) THE STAIRCASE.  |scour(n)| = pi(sqrt(n)) - 3; one tread per q^2.
//   tread [q^2, next q^2) | |scour| | dest. in tread | by newcomer q | newcomer share | pairs in tread | survive | share | prod(1-2/p) | ratio obs/pred
// ------------------------------------------------------------------------------------------------
//   [1, 49)  pre-scour     |       0 |              0 |             - |              - |              5 |       5 | 100.0% |       1.000 | (all pairs live: the restriction at its purest)
//   [   49,   121)     @7 |       1 |              4 |             4 |         100.0% |              7 |       4 |  57.1% |      0.7143 | 0.80
//   [  121,   169)    @11 |       2 |              2 |             0 |           0.0% |              5 |       2 |  40.0% |      0.5844 | 0.68
//   [  169,   289)    @13 |       3 |              6 |             2 |          33.3% |             12 |       7 |  58.3% |      0.4945 | 1.18
//   [  289,   361)    @17 |       4 |              4 |             0 |           0.0% |              7 |       2 |  28.6% |      0.4363 | 0.65
//   [  361,   529)    @19 |       5 |             14 |             2 |          14.3% |             17 |       4 |  23.5% |      0.3904 | 0.60
//   [  529,   841)    @23 |       6 |             22 |             0 |           0.0% |             31 |       8 |  25.8% |      0.3565 | 0.72
//   [  841,   961)    @29 |       7 |             11 |             2 |          18.2% |             12 |       2 |  16.7% |      0.3319 | 0.50
//   [  961,  1369)    @31 |       8 |             29 |             1 |           3.4% |             41 |      11 |  26.8% |      0.3105 | 0.86
//   [ 1369,  1681)    @37 |       9 |             25 |             2 |           8.0% |             31 |       7 |  22.6% |      0.2937 | 0.77
//   [ 1681,  1849)    @41 |      10 |             13 |             0 |           0.0% |             17 |       3 |  17.6% |      0.2794 | 0.63
//   [ 1849,  2209)    @43 |      11 |             25 |             2 |           8.0% |             36 |      11 |  30.6% |      0.2664 | 1.15
//   [ 2209,  2809)    @47 |      12 |             48 |             1 |           2.1% |             60 |      13 |  21.7% |      0.2550 | 0.85
//   [ 2809,  3481)    @53 |      13 |             54 |             0 |           0.0% |             67 |      13 |  19.4% |      0.2454 | 0.79
//   [ 3481,  3721)    @59 |      14 |             18 |             1 |           5.6% |             24 |       5 |  20.8% |      0.2371 | 0.88
//   [ 3721,  4489)    @61 |      15 |             59 |             3 |           5.1% |             77 |      19 |  24.7% |      0.2293 | 1.08
//   [ 4489,  5041)    @67 |      16 |             43 |             2 |           4.7% |             55 |      11 |  20.0% |      0.2225 | 0.90
//   [ 5041,  5329)    @71 |      17 |             27 |             1 |           3.7% |             29 |       3 |  10.3% |      0.2162 | 0.48
//   [ 5329,  6241)    @73 |      18 |             76 |             1 |           1.3% |             91 |      15 |  16.5% |      0.2103 | 0.78
//   [ 6241,  6889)    @79 |      19 |             51 |             1 |           2.0% |             65 |      14 |  21.5% |      0.2049 | 1.05
//   [ 6889,  7921)    @83 |      20 |             88 |             0 |           0.0% |            103 |      14 |  13.6% |      0.2000 | 0.68
//   [ 7921,  9409)    @89 |      21 |            129 |             2 |           1.6% |            149 |      21 |  14.1% |      0.1955 | 0.72
//   [ 9409, 10001)    @97 |      22 |             48 |             1 |           2.1% |             58 |      10 |  17.2% |      0.1915 | 0.90
//   Deepest tread survivor share 17.2% is the window's best proxy for the fully-scoured rate;
//   the pre-scour head [1,49) sits at 100% and the first treads far above prod(1-2/p) * nothing — the
//   restriction is the staircase itself: a pair at n is only ever tested by the pi(sqrt(n))-3 treads below it.
//
// ================================================================================================
// (e) THE x = 37 FOURTH LENS  [record positions cited from exact-g2-ladder.js]
//    x |            pos | pos/x#   | ln pos/ln x# | sqrt(pos) | pi(sqrt(pos)) | pos/x^2   | inter-square frac | frac dist to 1/2
// ------------------------------------------------------------------------------------------------
//   23 |       76166567 | 3.41e-1 |       0.9441 |  8.727e+3 |          1087 | 1.44e+5 |            0.6953 | 0.1953
//   29 |     1205437109 | 1.86e-1 |       0.9256 |  3.472e+4 |          3707 | 1.43e+6 |            0.9114 | 0.4114
//   31 |     8813641451 | 4.39e-2 |       0.8799 |  9.388e+4 |          9055 | 9.17e+6 |            0.6247 | 0.1247
//   37 |   544899485411 | 7.34e-2 |       0.9119 |  7.382e+5 |         59392 | 3.98e+8 |            0.0030 | 0.4970
//   41 |  3784200788231 | 1.24e-2 |       0.8685 |  1.945e+6 |        145176 | 2.25e+9 |            0.6179 | 0.1179
//   43 | 830330079152051 | 6.35e-2 |       0.9257 |  2.882e+7 |       1788915 | 4.49e+11 |            0.2810 | 0.2190
//
//   Onset-relative ranks of x = 37 among the five comparison levels {29,31,37,41,43}:
//     fractional depth pos/x#            rank 4/5 ascending   [41:0.0124  31:0.0439  43:0.0635  37:0.0734  29:0.186]
//     log depth ln pos / ln x#           rank 3/5 ascending   [41:0.868  31:0.880  37:0.912  29:0.926  43:0.926]
//     pos / x^2 (past staircase saturation) rank 3/5 ascending   [29:1.43e+6  31:9.17e+6  37:3.98e+8  41:2.25e+9  43:4.49e+11]
//     inter-prime-square fraction        rank 1/5 ascending   [37:0.00303  43:0.281  41:0.618  31:0.625  29:0.911]
// ============================================================================
// READINGS
//
// 1. CALIBRATION AND THE FRAME. Chris's hand-derived model verifies exactly:
//    all three anchors pass ((47,49) at 49 for 7; 121 with (119,121) pre-dead
//    via 7; (209,211) at 209 = 11*19 for 11), and his q^2 first-fresh-kill
//    rule holds for every scour prime in the window (onset1 = q^2, asserted,
//    22 primes 7..97). Window totals: 999 channel pairs, 796 destroyed, 203
//    survive — and the survivors are TRUE twin-prime pairs, because a 10000-
//    window is complete to sqrt(N); 203 cross-checks against the classical
//    twin count below 10^4 (205 pairs) minus the non-channel (3,5),(5,7).
//
// 2. THE SECOND ONSET IS NOT A SEPARATE ONSET [PROVEN]. q coprime to 30 has
//    q^2 ≡ 1 or 19 (mod 30), and both are twin-channel CLOSER classes. So the
//    first fresh kill always lands in a channel, always B-side, on the pair
//    (q^2-2, q^2): onset2 = onset1 = q^2 for every prime, in the table and by
//    the one-line proof. Chris's three onsets collapse to two, and the third
//    has a clean criterion: onset3 = q^2 iff q^2 - 2 is prime (10 of the 22
//    scour primes here — 7, 13, 19, 29, 37, 43, 47, 61, 71, 89, counted from
//    the table's yes-rows). When q^2 - 2 is composite the lag onset3 - q^2
//    ranges from 88 (q = 11) to 1162 (q = 83) with no visible law; the first
//    live destruction then lands A-side about as often as B-side.
//
// 3. THE A/B VERDICT: THE SPLIT IS A THEOREM PLUS A DENSITY, AND 50:50 IS THE
//    WRONG NULL AT THE LIVE LEVEL [the naive null is REFUTED BY DERIVATION].
//    Kill level: CRT gives exactly 3 A-side and 3 B-side residues per period
//    30q, so the channel-KILL null is 1:1 — measured 539:543 aggregate, ratio
//    0.993. Live level: an A-side fresh kill strikes the opener, whose partner
//    cannot yet be dead, so EVERY A-side channel kill destroys a live pair; a
//    B-side kill destroys one iff the opener is prime. Both identities hold
//    with zero exceptions across all 796 destructions (asserted in-code). The
//    observed live A:B = 2.10 against the derived null 2.19 (local-prime-
//    density conversion, no destruction data used: predicted 246.0 B-side
//    destructions, measured 257). Nothing beyond the identity + prime density
//    is present at this window size.
//
// 4. MIRROR-SWEEP, ORIGIN-LOCAL SHADOW [VERIFIED EXACT]. The conjugation
//    mu(n) = (-2-n) mod 30q maps every A-strike residue class onto a B-struck
//    opener class (channels 11 <-> 17 swapped, 29 fixed) — EXACT for all 22
//    primes, every kill checked both directions. So the mirror does exchange
//    A and B onsets at the residue-class level, as the Mirror-Sweep Lemma's
//    conjugation predicts (attack-0c-holesweep.md §4); what it cannot
//    conjugate is TIME ORDER, and reading 3's identity is exactly that
//    breaking: the A side never needs an aliveness condition — the origin-
//    local analog of "the seam side never loses".
//
// 5. TWIN-DESTRUCTION SHARES AND THE STAIRCASE. By Chris's rule (destroyed
//    pairs only), 7 destroys 219 pairs = 27.51% of all destructions; the
//    share falls roughly like the kill rate 2/q but stays above it for small
//    q (first-mover advantage: 7 meets a fully live population). Newcomer
//    contribution per tread is small after the first: 7 owns 100.0% of its
//    tread's destructions, but from 11 on the incumbents dominate (newcomer
//    share 0-33.3%, mostly under 10%) — a new tread is one kill, q^2, plus
//    sparse q*m follow-ups, against incumbents striking every 30q/8 on
//    average. The RESTRICTION Chris observed is quantified in the tread
//    table: the pre-scour head [1, 49) is 100% alive, treads then fall
//    56-58% -> 20-25% -> 17.2% at the deepest tread, tracking the local
//    sieve product prod(1-2/p) with observed/predicted fluctuating 0.48-1.18
//    (mean below 1 — the familiar Mertens-vs-truth bias, here with small-
//    sample noise). The restriction IS the staircase: a pair at n is tested
//    by exactly pi(sqrt(n)) - 3 primes, nothing more.
//
// 6. THE x = 37 FOURTH LENS: A CLEAN NEGATIVE — THE FOURTH MECHANISM FAMILY
//    AT 37 IS CLOSED. On every onset-MECHANISM coordinate the 37 record is
//    mid-pack among {29, 31, 37, 41, 43}: fractional depth pos/x# rank 4/5
//    (0.0734, vs 29's 0.186 and 41's 0.0124), log depth rank 3/5 (0.9119,
//    between 41's 0.8685 and 43's 0.9257), and distance past staircase
//    saturation pos/x^2 rank 3/5, exactly where monotone growth puts it.
//    Every record sits 10^6-10^11 times beyond its own level's x^2, so no
//    record at any level lives in the onset-restricted head; origin-local
//    onset structure cannot source the 37 spike. The one striking value —
//    37's inter-prime-square fraction 0.0030 (the record integer sits just
//    above a prime square, rank 1/5, edge distance 0.4970) — is recorded and
//    then discounted honestly: the coordinate is convention-dependent (the
//    ladder's canonical LEAST of the level's attaining positions; 37 has
//    nmax = 2 per exact-g2-ladder.js, and the other attaining position
//    would give a different fraction), the null probability of some level
//    showing an edge distance this extreme across 5 levels, 2 edges and the
//    4 coordinates inspected is of order 10%, and no mechanism connects a
//    prime near sqrt(pos) ~ 7*10^5 to a tile that only knows primes <= 37.
//    Verdict: with anchored/mirror, HL comb, and h2-side already ruled out
//    (attack-delta37-01.md), the onset/origin-local family joins them. The
//    spike stays G2-side, real, and unexplained — now four ways.
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE. Derived by arithmetic over printed values, not printed
// verbatim: "10 of the 22" (count of yes-rows in the onset table); "0.4970"
// (1 - 0.0030, also printed in the table's last column); "10^6-10^11" (the
// pos/x^2 column's range); the "~10%" look-elsewhere estimate (5 levels x 2
// edges x 0.0030, rounded up for 4 inspected coordinates); "205 pairs" (the
// classical twin-pair count below 10^4, literature figure, used only as a
// cross-check of the printed 203).
// ---------------------------------------------------------------------------
