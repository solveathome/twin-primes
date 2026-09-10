// ============================================================================
// FIRST DEAD OR LAST ALIVE: ADJUDICATING L <= 62 AGAINST L <= 111
//
// `history/staging/attack-block-00-ADJUDICATION.md` overturned attack 3's
// `L <= 62` for `L <= 111` on the ground that "feasibility is non-monotone in
// L". `sift-limit-attack.md` section 7a reverses that, on the ground that
// coverability is DOWNWARD CLOSED, but flags itself INFERRED because the
// block-1 instrument was never re-run. This script re-runs it, and tests the
// closure argument in the block coordinate rather than assuming it transfers
// from the interval coordinate where it was checked.
//
// THE TWO OBJECTS THAT MUST NOT BE MERGED.
//   (i)  FEASIBILITY: "some run of l consecutive T_v slots is entirely deleted
//        by the block". This is a property of the sieved tile.
//   (ii) THE CRITERION: "sum over block primes p of K_p(l, f) >= l", the
//        counting necessary condition Theorem D imposes on (i).
// (ii) is a staircase and is NOT monotone in l: it dies at 63, revives, dies
// for good at 112. (i) is downward closed for a one-line reason: a run of
// length l+1 contains a run of length l. So the FIRST l at which the criterion
// fails kills every larger l, and the revivals above it are noise. The
// adjudication read the non-monotonicity of (ii) as non-monotonicity of (i).
//
// WHAT IS COMPUTED.
//   1. The block-1 object rebuilt from scratch: T_5 slots over 23#, folded at
//      every prime in (5, 25]. Survivors against D_23, mean killer count
//      against sum 2/p, the extremal run, its position and its span.
//   2. DOWNWARD CLOSURE IN THE BLOCK COORDINATE, tested and not assumed. The
//      achievable run lengths are determined independently at each l by a
//      full-period window scan, never derived from the maximum. Then repeated
//      over 63 sub-block instances (every non-empty subset of the six block
//      primes) whose truth is exactly computable, and on a second tile, T_7.
//   3. INSTRUMENT A, attack 3's Theorem D counting form, recomputed: the phase
//      sweep that produced 62 and 111, with a subadditivity certificate that
//      settles what happens above the end of the sweep.
//   4. INSTRUMENT B, the adjudication's own w-window instrument, recomputed
//      over all 22,309,287 positions of the full 23# period.
//   5. First-dead against last-alive, measured against exact truth wherever
//      the truth is known.
//   6. The interval-coordinate check section 7a quotes, reproduced: all 385
//      phase choices at {5, 7, 11}.
//   7. What each bound buys downstream, in maxsum units against 23^2.
//
// Runtime about 25 s, nearly all of it in section 4's window scan over the
// full period. Memory about 150 MB of typed arrays.
// ============================================================================
'use strict';

const f2 = (x, n) => Number(x).toFixed(n);

// ---------------------------------------------------------------------------
// Tiles. T_v = residues r mod v# with r and r+2 both coprime to v#.
// ---------------------------------------------------------------------------
const ALLP = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
function tile(v) {
  const ps = ALLP.filter(p => p <= v);
  const P = ps.reduce((a, p) => a * p, 1);
  const S = [];
  for (let r = 0; r < P; r++) {
    let ok = true;
    for (const p of ps) if (r % p === 0 || (r + 2) % p === 0) { ok = false; break; }
    if (ok) S.push(r);
  }
  const G = S.map((s, i) => (S[(i + 1) % S.length] - s + P) % P);
  return { v, P, S, G, n: S.length, mbar: P / S.length };
}
const T5 = tile(5), T7 = tile(7);
const BLOCK1 = ALLP.filter(p => p > 5 && p <= 25);
const BLOCK2 = ALLP.filter(p => p > 7 && p <= 49);

// slot index i of tile t -> the integer it sits at
const slotAt = (t, i) => t.P * Math.floor(i / t.n) + t.S[i % t.n];

// maxsum_m(T) = max over phase of m consecutive gaps
function maxsum(t, m) {
  let best = 0;
  for (let f = 0; f < t.n; f++) { let s = 0; for (let k = 0; k < m; k++) s += t.G[(f + k) % t.n]; if (s > best) best = s; }
  return best;
}

console.log('=== 1. THE BLOCK-1 OBJECT, REBUILT FROM SCRATCH =====================');
console.log(`T_5: residues ${T5.S.join(', ')} mod ${T5.P}; gap word ${T5.G.join(', ')}; mbar = ${T5.mbar}`);
console.log(`T_7: ${T7.n} residues mod ${T7.P}; gap word ${T7.G.join(',')}; mbar = ${f2(T7.mbar, 3)}`);
console.log(`block 1 = primes in (5, 25]  = ${BLOCK1.join(', ')}`);
console.log(`block 2 = primes in (7, 49]  = ${BLOCK2.join(', ')}`);

// The full block-1 period: T_5 slots over 23#. w(i) = how many block primes kill slot i.
const MOD23 = 223092870;
const N = 3 * (MOD23 / 30);                       // 22,309,287 T_5 slots
const w = new Uint8Array(N);
for (let i = 0; i < N; i++) {
  const s = 30 * ((i / 3) | 0) + T5.S[i % 3];
  let c = 0;
  for (let k = 0; k < BLOCK1.length; k++) { const p = BLOCK1[k], r = s % p; if (r === 0 || r === p - 2) c++; }
  w[i] = c;
}
let surv = 0, wsum = 0;
for (let i = 0; i < N; i++) { if (w[i] === 0) surv++; wsum += w[i]; }
const D23 = ALLP.filter(p => p >= 3 && p <= 23).reduce((a, p) => a * (p - 2), 1);
let twoOverP = 0; for (const p of BLOCK1) twoOverP += 2 / p;

// the extremal run, cyclically
let best = 0, bestStart = -1, cur = 0;
for (let i = 0; i < 2 * N; i++) {
  const j = i % N;
  if (w[j] > 0) { cur++; if (cur > best) { best = cur; bestStart = ((j - cur + 1) % N + N) % N; } } else cur = 0;
}
const L_TRUTH = best;
const runFirstInt = slotAt(T5, bestStart), runLastInt = slotAt(T5, bestStart + L_TRUTH - 1);

console.log('');
console.log('quantity                        computed              expected           ok');
const row = (name, got, want) => console.log(
  name.padEnd(32) + String(got).padEnd(22) + String(want).padEnd(19) +
  (String(got) === String(want) ? 'YES' : 'NO  <-- FAILED'));
row('T_5 slots in 23#', N, 3 * (MOD23 / 30));
row('survivors', surv, D23);
row('mean killers per slot', f2(wsum / N, 10), f2(twoOverP, 10));
row('combined L (longest dead run)', L_TRUTH, 19);
row('extremal run first integer', runFirstInt, 33638417);
row('span X of that run', runLastInt - runFirstInt, 180);
row('G2(23#) = maxsum_{L+1}(T_5)', maxsum(T5, L_TRUTH + 1), 204);
console.log('');
console.log('The last line is the covering identity: the exact G2 is the maxsum over one');
console.log('more gap than the run has slots. It is what makes L the object of interest.');

console.log('');
console.log('=== 2. DOWNWARD CLOSURE IN THE BLOCK COORDINATE, TESTED NOT ASSUMED =');
// For each l independently: does SOME window of l consecutive slots contain no
// survivor? Determined by its own scan of the full period, never inferred from
// the maximum, so a non-contiguous achievable set would show up if one existed.
function achievableLengths(dead, n, upto) {
  const out = [];
  for (let l = 1; l <= upto; l++) {
    let alive = 0, found = false;
    for (let i = 0; i < l; i++) if (!dead(i % n)) alive++;
    if (!alive) found = true;
    for (let i = 1; i < n && !found; i++) {
      if (!dead((i - 1) % n)) alive--;
      if (!dead((i + l - 1) % n)) alive++;
      if (!alive) found = true;
    }
    out.push(found ? l : null);
  }
  return out;
}
const ach = achievableLengths(i => w[i] > 0, N, L_TRUTH + 4).filter(x => x !== null);
console.log(`achievable dead-run lengths at block 1, each tested by its own full-period scan:`);
console.log(`  ${ach.join(', ')}`);
console.log(`  contiguous initial segment 1..${L_TRUTH}: ` +
            (ach.length === L_TRUTH && ach[0] === 1 && ach[ach.length - 1] === L_TRUTH ? 'YES' : 'NO  <-- FAILED'));

// Sub-runs of the extremal run: every contiguous piece is itself an all-dead run,
// and the piece starting j slots in has phase (f + j) mod 3. So restriction stays
// inside the object AND inside the three-phase family the instrument maximises over.
let subs = 0, subsDead = 0, subsSatisfy = 0, phaseSeen = new Set();
for (let j = 0; j < L_TRUTH; j++) for (let l = 1; l + j <= L_TRUTH; l++) {
  subs++;
  let allDead = true, kSum = 0;
  for (let t = 0; t < l; t++) { const x = w[(bestStart + j + t) % N]; if (x === 0) allDead = false; kSum += x; }
  if (allDead) subsDead++;
  if (kSum >= l) subsSatisfy++;
  phaseSeen.add((bestStart + j) % 3);
}
console.log(`contiguous sub-runs of the extremal 19-run: ${subs}`);
console.log(`  every one is itself an all-dead run ......................... ${subsDead === subs ? 'YES' : 'NO'}`);
console.log(`  every one satisfies the partition constraint sum k_p >= l ... ${subsSatisfy === subs ? 'YES' : 'NO'}`);
console.log(`  phases reached by restriction: {${[...phaseSeen].sort().join(', ')}} of {0, 1, 2}`);
console.log('The second line is the load-bearing one. If the constraint applied only to');
console.log('MAXIMAL runs, restriction would leave its domain and first-dead would be');
console.log('unsound. It does not: the constraint is stated for any deleted run.');

// ---------------------------------------------------------------------------
// INSTRUMENT A, reusable. K_p(l,f) = max over a of #{i < l : d_i = a or a-2 mod p}.
// Returns the sweep, the first l at which every phase fails, and the last l at
// which some phase still passes.
// ---------------------------------------------------------------------------
function instrumentA(t, primes, LMAX) {
  const S = [];
  for (let f = 0; f < t.n; f++) {
    const cnt = primes.map(p => new Int32Array(p));
    const rowv = new Int32Array(LMAX + 1);
    let d = 0;
    for (let l = 1; l <= LMAX; l++) {
      for (let k = 0; k < primes.length; k++) cnt[k][d % primes[k]]++;
      let tot = 0;
      for (let k = 0; k < primes.length; k++) {
        const p = primes[k], c = cnt[k];
        let m = 0;
        for (let a = 0; a < p; a++) { const v = c[a] + c[(a - 2 + p) % p]; if (v > m) m = v; }
        tot += m;
      }
      rowv[l] = tot;
      d += t.G[(f + l - 1) % t.n];
    }
    S.push(rowv);
  }
  const Smax = new Int32Array(LMAX + 1);
  for (let l = 1; l <= LMAX; l++) { let m = 0; for (let f = 0; f < t.n; f++) m = Math.max(m, S[f][l]); Smax[l] = m; }
  let first = 0, lastAlive = 0, maxT = -1e9;
  const alive = [];
  for (let l = 1; l <= LMAX; l++) {
    if (Smax[l] < l) { if (!first) first = l; } else { lastAlive = l; if (first) alive.push(l); }
    if (Smax[l] - l > maxT) maxT = Smax[l] - l;
  }
  const perPhase = S.map(rw => { for (let l = 1; l <= LMAX; l++) if (rw[l] < l) return l; return 0; });
  return { S, Smax, first, lastAlive, alive, maxT, TL: Smax[LMAX] - LMAX, LMAX, perPhase };
}

console.log('');
console.log('=== 3. INSTRUMENT A: ATTACK 3\'s THEOREM D COUNTING FORM, RECOMPUTED =');
console.log('K_p(l,f) = max over a of #{i < l : d_i = a or a-2 mod p};  S(l,f) = sum_p K_p.');
console.log('A run of l consecutive deleted slots at phase f forces S(l,f) >= l.');
const A1 = instrumentA(T5, BLOCK1, 1200);
console.log('');
console.log(' l   S(l,0)  S(l,1)  S(l,2)  max   l   verdict');
for (const l of [1, 6, 19, 23, 61, 62, 63, 64, 110, 111, 112, 113, 200]) {
  console.log(String(l).padStart(3) + '   ' +
    String(A1.S[0][l]).padEnd(8) + String(A1.S[1][l]).padEnd(8) + String(A1.S[2][l]).padEnd(8) +
    String(A1.Smax[l]).padEnd(6) + String(l).padEnd(4) +
    (A1.Smax[l] < l ? 'DEAD (no run of this length, at any phase)' : 'not excluded'));
}
console.log('');
console.log(`first l at which every phase fails ....... ${A1.first}   -> combined L <= ${A1.first - 1}`);
console.log(`first failing l, phase by phase ......... ${A1.perPhase.join(', ')}  -> L <= ${Math.max(...A1.perPhase) - 1} by the per-phase reading`);
console.log(`l still not excluded above that .......... ${A1.alive.length} values, the largest ${A1.lastAlive}`);
console.log(`  ${A1.alive.join(', ')}`);
console.log(`last l not excluded ...................... ${A1.lastAlive}   -> "L <= ${A1.lastAlive}" is the adjudication's reading`);

// Subadditivity certificate. A run of length a+b splits into runs of length a and
// b, so S is subadditive in l phase-wise, hence T(l) = Smax(l) - l is subadditive.
// T(n) <= floor(n/LMAX) T(LMAX) + max_{r<LMAX} T(r) < 0 for every n >= LMAX.
console.log('');
console.log('NO-REVIVAL CERTIFICATE, so the sweep length is not doing the work:');
console.log(`  T(l) = Smax(l) - l is SUBADDITIVE (a run of a+b splits into a and b).`);
console.log(`  T(${A1.LMAX}) = ${A1.TL},  max T(r) over r < ${A1.LMAX} = ${A1.maxT}`);
console.log(`  so T(n) <= T(${A1.LMAX}) + max T(r) = ${A1.TL + A1.maxT} < 0 for every n >= ${A1.LMAX}, ` +
            (A1.TL + A1.maxT < 0 ? 'PROVEN' : 'INCONCLUSIVE'));
console.log(`  and the sweep covers n < ${A1.LMAX} directly. So ${A1.lastAlive} really is the last l`);
console.log('  the criterion ever passes, and 62 really is the first it ever fails.');

const A2 = instrumentA(T7, BLOCK2, 3000);
console.log('');
console.log(`block 2 (v = 7, primes ${BLOCK2[0]}..${BLOCK2[BLOCK2.length - 1]}, ${T7.n} phases), same instrument:`);
console.log(`  first dead l = ${A2.first} -> L <= ${A2.first - 1};  last not excluded = ${A2.lastAlive};` +
            `  T(3000) = ${A2.TL}, max T = ${A2.maxT}, no revival above 3000: ${A2.TL + A2.maxT < 0}`);
console.log(`  attack 3 reported "L <= 659 (first dead l = 660)". Reproduced: ${A2.first === 660 ? 'YES' : 'NO'}`);

console.log('');
console.log('=== 4. INSTRUMENT B: THE ADJUDICATION\'s w-WINDOW, RECOMPUTED ========');
console.log('The adjudication computed L <= 111 a different way: w(i) = number of block');
console.log('primes killing slot i, and a run of l consecutive slots needs SOME window of');
console.log('l consecutive slots with sum(w) >= l. Taken at real positions over the full');
console.log('23# period, which it described as sharper than instrument A because A lets');
console.log('each prime pick its own best phase. Recomputed over all 22,309,287 windows.');
const BMAX = 400;
const Pw = new Int32Array(N + BMAX + 1);
for (let i = 0; i < N + BMAX; i++) Pw[i + 1] = Pw[i] + w[i % N];
const W = new Int32Array(BMAX + 1);
for (let l = 1; l <= BMAX; l++) {
  let m = 0;
  for (let i = 0; i < N; i++) { const v = Pw[i + l] - Pw[i]; if (v > m) m = v; }
  W[l] = m;
}
let bFirst = 0, bLastAlive = 0, bMaxT = -1e9;
for (let l = 1; l <= BMAX; l++) {
  if (W[l] < l) { if (!bFirst) bFirst = l; } else bLastAlive = l;
  if (W[l] - l > bMaxT) bMaxT = W[l] - l;
}
console.log('');
console.log(' l    max window sum(w)   l    verdict');
for (const l of [19, 62, 63, 110, 111, 112, 200, 400]) {
  console.log(String(l).padStart(4) + '  ' + String(W[l]).padEnd(19) + String(l).padEnd(5) +
    (W[l] < l ? 'DEAD' : 'not excluded'));
}
console.log('');
console.log(`first l at which the window sum falls short ... ${bFirst}   -> combined L <= ${bFirst - 1}`);
console.log(`last l not excluded .......................... ${bLastAlive}`);
console.log(`agreement with instrument A: first ${bFirst === A1.first ? 'AGREES' : 'DIFFERS'} (${bFirst} vs ${A1.first}), ` +
            `last ${bLastAlive === A1.lastAlive ? 'AGREES' : 'DIFFERS'} (${bLastAlive} vs ${A1.lastAlive})`);
console.log(`no-revival certificate: W(l) - l subadditive, T(${BMAX}) = ${W[BMAX] - BMAX}, ` +
            `max T = ${bMaxT}, sum ${W[BMAX] - BMAX + bMaxT} < 0: ${W[BMAX] - BMAX + bMaxT < 0}`);

// Stronger than agreement at two points: the two instruments are the SAME
// FUNCTION. K_p(l,f) is attained at some a_p; by CRT there is an s_0 in [0,23#)
// with s_0 = -a_p mod p for every block prime at once AND s_0 in the phase-f
// class mod 30, since gcd(30, 7*11*13*17*19*23) = 1. That s_0 is a T_5 slot and
// its window realises sum_p K_p(l,f). So the free-phase relaxation costs nothing
// over a full period, and W(l) = Smax(l) identically.
let diff = 0, firstDiff = 0;
for (let l = 1; l <= BMAX; l++) if (W[l] !== A1.Smax[l]) { diff++; if (!firstDiff) firstDiff = l; }
console.log('');
console.log(`W(l) vs Smax(l) at every l from 1 to ${BMAX}: ${diff} disagreements` +
            (diff ? ` (first at l = ${firstDiff})` : ' — THE TWO INSTRUMENTS ARE ONE INSTRUMENT'));
console.log('PROVEN, not measured: CRT realises every per-prime phase at a real T_5 slot');
console.log('inside one 23# period, so "at a single position" and "each prime its own best');
console.log('phase" are the same maximum here. The adjudication\'s independent recomputation');
console.log('recovered attack 3\'s own two numbers because it is attack 3\'s own instrument.');

console.log('');
console.log('=== 5. FIRST-DEAD vs LAST-ALIVE AGAINST EXACT TRUTH =================');
console.log('63 sub-block instances: every non-empty subset of the six block-1 primes,');
console.log('each over its own exact period 3*prod(Q) of T_5 slots, so the truth is known');
console.log('exactly in every one. Then the same on the T_7 tile, which has a different');
console.log('gap word (15 letters, mbar 14) and so a different block coordinate.');

function instanceTruth(t, Q) {
  const per = Q.reduce((a, p) => a * p, 1);
  const n = t.n * per;                                  // slots in one period
  const dead = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const s = slotAt(t, i);
    let c = 0;
    for (const p of Q) { const r = s % p; if (r === 0 || r === p - 2) { c = 1; break; } }
    dead[i] = c;
  }
  let b = 0, c2 = 0;
  for (let i = 0; i < 2 * n; i++) { if (dead[i % n]) { c2++; if (c2 > b) b = c2; } else c2 = 0; }
  const a = achievableLengths(i => dead[i] === 1, n, b + 2).filter(x => x !== null);
  const contiguous = a.length === b && a[0] === 1 && a[a.length - 1] === b;
  return { n, truth: b, contiguous };
}

function subsets(arr) {
  const out = [];
  for (let m = 1; m < (1 << arr.length); m++) out.push(arr.filter((_, k) => m & (1 << k)));
  return out;
}
const rows = [];
for (const Q of subsets(BLOCK1)) {
  const tr = instanceTruth(T5, Q);
  const inst = instrumentA(T5, Q, 600);
  rows.push({ tile: 'T_5', Q, ...tr, first: inst.first, lastAlive: inst.lastAlive });
}
for (const Q of [[11, 13], [11, 13, 17], [11, 13, 17, 19], [11, 13, 17, 19, 23]]) {
  const tr = instanceTruth(T7, Q);
  const inst = instrumentA(T7, Q, 900);
  rows.push({ tile: 'T_7', Q, ...tr, first: inst.first, lastAlive: inst.lastAlive });
}
const nBad = rows.filter(r => !r.contiguous).length;
const nUnsound = rows.filter(r => r.first && r.truth > r.first - 1).length;
const nUnsoundLast = rows.filter(r => r.lastAlive && r.truth > r.lastAlive).length;
console.log('');
console.log('tile  block primes                slots       truth  first-dead bound  last-alive bound  1..truth contiguous');
for (const r of rows.filter(r => r.Q.length >= 4 || r.tile === 'T_7')) {
  console.log(r.tile.padEnd(6) + r.Q.join(',').padEnd(28) + String(r.n).padEnd(12) +
    String(r.truth).padEnd(7) + String(r.first ? r.first - 1 : 'none').padEnd(18) +
    String(r.lastAlive || 'none').padEnd(18) + (r.contiguous ? 'YES' : 'NO  <-- FAILED'));
}
console.log('');
console.log(`instances: ${rows.length}   achievable-length set non-contiguous in: ${nBad}   ` +
            `first-dead bound violated in: ${nUnsound}   last-alive bound violated in: ${nUnsoundLast}`);
const ratios = rows.filter(r => r.first).map(r => (r.first - 1) / r.truth);
const ratiosL = rows.filter(r => r.lastAlive).map(r => r.lastAlive / r.truth);
console.log(`first-dead bound / truth: min ${f2(Math.min(...ratios), 2)}, max ${f2(Math.max(...ratios), 2)}`);
console.log(`last-alive bound / truth: min ${f2(Math.min(...ratiosL), 2)}, max ${f2(Math.max(...ratiosL), 2)}`);
console.log('Both readings are TRUE bounds everywhere. That is the whole point: last-alive');
console.log('is not wrong, it is weak. Only first-dead is the bound the criterion supports.');

console.log('');
console.log('=== 6. THE INTERVAL-COORDINATE CHECK SECTION 7a QUOTES, REPRODUCED ==');
{
  const P = [5, 7, 11], M = P.reduce((a, b) => a * b, 1);
  let mx = 0; const feas = new Set();
  for (let a5 = 0; a5 < 5; a5++) for (let a7 = 0; a7 < 7; a7++) for (let a11 = 0; a11 < 11; a11++) {
    const A = [a5, a7, a11], cov = new Uint8Array(M);
    for (let n = 0; n < M; n++) {
      let c = 0;
      for (let k = 0; k < 3; k++) { const p = P[k], r = ((n - A[k]) % p + p) % p; if (r === 0 || r === p - 2) { c = 1; break; } }
      cov[n] = c;
    }
    let cur2 = 0, m2 = 0;
    for (let i = 0; i < 2 * M; i++) { if (cov[i % M]) { cur2++; if (cur2 > m2) m2 = cur2; } else cur2 = 0; }
    if (m2 > mx) mx = m2;
    for (let l = 1; l <= m2; l++) feas.add(l);
  }
  const arr = [...feas].sort((a, b) => a - b);
  console.log(`all ${M} phase choices at {5, 7, 11}, two classes each, covering an interval:`);
  console.log(`  feasible L = ${arr.join(', ')}   contiguous 1..${mx}: ` +
              (arr.length === mx && arr[0] === 1 ? 'YES' : 'NO'));
  // the counting criterion in that coordinate
  const K = (p, l) => { const q = Math.floor(l / p), r = l % p; return r === 0 ? 2 * q : (r >= 3 ? 2 * q + 2 : 2 * q + 1); };
  let fd = 0, la = 0;
  for (let l = 1; l <= 100000; l++) { const s = K(5, l) + K(7, l) + K(11, l); if (s < l) { if (!fd) fd = l; } else la = l; }
  console.log(`  its counting criterion: first dead l = ${fd} -> L <= ${fd - 1}; last not excluded = ${la}`);
  console.log(`  ratios against the truth ${mx}: first-dead ${f2((fd - 1) / mx, 2)}x, last-alive ${f2(la / mx, 2)}x`);
  console.log('  NOTE: this toy has no revival at all, so it cannot illustrate the 62-vs-111');
  console.log('  dispute. The revival example section 7a cites is the free-phase one at');
  console.log('  x = 11 in attack-beta2-05-covering-prune.js section (D).');
}

console.log('');
console.log('=== 7. WHAT EACH BOUND BUYS DOWNSTREAM ==============================');
console.log('A block-1 bound L <= B gives G2(23#) <= maxsum_{B+1}(T_5), against the');
console.log('p^2-rule threshold 23^2 = 529.');
console.log('');
console.log('reading                     L bound   maxsum_{L+1}(T_5)   vs 23^2 = 529   overshoot');
for (const [nm, B] of [['truth', L_TRUTH], ['first-dead (attack 3)', A1.first - 1], ['last-alive (adjudication)', A1.lastAlive]]) {
  const ms = maxsum(T5, B + 1);
  console.log(nm.padEnd(28) + String(B).padEnd(10) + String(ms).padEnd(20) + String(529).padEnd(16) + f2(ms / 529, 2) + 'x');
}
console.log('');
console.log(`exact G2(23#) = ${maxsum(T5, L_TRUTH + 1)}, so the truth reading is an identity, not a bound.`);
console.log('Neither 62 nor 111 clears 529, so no p^2-rule conclusion follows from either.');
console.log('The difference between them is 1.19x against 2.12x on a threshold neither meets.');

// ============================================================================
// PASTED OUTPUT (node research/block-L-first-dead.js, 2026-08-18)
// ============================================================================
// === 1. THE BLOCK-1 OBJECT, REBUILT FROM SCRATCH =====================
// T_5: residues 11, 17, 29 mod 30; gap word 6, 12, 12; mbar = 10
// T_7: 15 residues mod 210; gap word 6,12,12,18,12,30,6,30,12,18,12,12,6,12,12; mbar = 14.000
// block 1 = primes in (5, 25]  = 7, 11, 13, 17, 19, 23
// block 2 = primes in (7, 49]  = 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47
//
// quantity                        computed              expected           ok
// T_5 slots in 23#                22309287              22309287           YES
// survivors                       7952175               7952175            YES
// mean killers per slot           0.9312453598          0.9312453598       YES
// combined L (longest dead run)   19                    19                 YES
// extremal run first integer      33638417              33638417           YES
// span X of that run              180                   180                YES
// G2(23#) = maxsum_{L+1}(T_5)     204                   204                YES
//
// The last line is the covering identity: the exact G2 is the maxsum over one
// more gap than the run has slots. It is what makes L the object of interest.
//
// === 2. DOWNWARD CLOSURE IN THE BLOCK COORDINATE, TESTED NOT ASSUMED =
// achievable dead-run lengths at block 1, each tested by its own full-period scan:
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
//   contiguous initial segment 1..19: YES
// contiguous sub-runs of the extremal 19-run: 190
//   every one is itself an all-dead run ......................... YES
//   every one satisfies the partition constraint sum k_p >= l ... YES
//   phases reached by restriction: {0, 1, 2} of {0, 1, 2}
// The second line is the load-bearing one. If the constraint applied only to
// MAXIMAL runs, restriction would leave its domain and first-dead would be
// unsound. It does not: the constraint is stated for any deleted run.
//
// === 3. INSTRUMENT A: ATTACK 3's THEOREM D COUNTING FORM, RECOMPUTED =
// K_p(l,f) = max over a of #{i < l : d_i = a or a-2 mod p};  S(l,f) = sum_p K_p.
// A run of l consecutive deleted slots at phase f forces S(l,f) >= l.
//
//  l   S(l,0)  S(l,1)  S(l,2)  max   l   verdict
//   1   6       6       6       6     1   not excluded
//   6   13      11      13      13    6   not excluded
//  19   23      23      23      23    19  not excluded
//  23   26      27      27      27    23  not excluded
//  61   61      61      61      61    61  not excluded
//  62   62      61      61      62    62  not excluded
//  63   62      62      62      62    63  DEAD (no run of this length, at any phase)
//  64   64      64      63      64    64  not excluded
// 110   108     110     110     110   110 not excluded
// 111   110     111     110     111   111 not excluded
// 112   111     111     110     111   112 DEAD (no run of this length, at any phase)
// 113   111     112     112     112   113 DEAD (no run of this length, at any phase)
// 200   192     192     192     192   200 DEAD (no run of this length, at any phase)
//
// first l at which every phase fails ....... 63   -> combined L <= 62
// first failing l, phase by phase ......... 63, 62, 62  -> L <= 62 by the per-phase reading
// l still not excluded above that .......... 39 values, the largest 111
//   64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 100, 102, 103, 110, 111
// last l not excluded ...................... 111   -> "L <= 111" is the adjudication's reading
//
// NO-REVIVAL CERTIFICATE, so the sweep length is not doing the work:
//   T(l) = Smax(l) - l is SUBADDITIVE (a run of a+b splits into a and b).
//   T(1200) = -77,  max T(r) over r < 1200 = 7
//   so T(n) <= T(1200) + max T(r) = -70 < 0 for every n >= 1200, PROVEN
//   and the sweep covers n < 1200 directly. So 111 really is the last l
//   the criterion ever passes, and 62 really is the first it ever fails.
//
// block 2 (v = 7, primes 11..47, 15 phases), same instrument:
//   first dead l = 660 -> L <= 659;  last not excluded = 757;  T(3000) = -67, max T = 20, no revival above 3000: true
//   attack 3 reported "L <= 659 (first dead l = 660)". Reproduced: YES
//
// === 4. INSTRUMENT B: THE ADJUDICATION's w-WINDOW, RECOMPUTED ========
// The adjudication computed L <= 111 a different way: w(i) = number of block
// primes killing slot i, and a run of l consecutive slots needs SOME window of
// l consecutive slots with sum(w) >= l. Taken at real positions over the full
// 23# period, which it described as sharper than instrument A because A lets
// each prime pick its own best phase. Recomputed over all 22,309,287 windows.
//
//  l    max window sum(w)   l    verdict
//   19  23                 19   not excluded
//   62  62                 62   not excluded
//   63  62                 63   DEAD
//  110  110                110  not excluded
//  111  111                111  not excluded
//  112  111                112  DEAD
//  200  192                200  DEAD
//  400  378                400  DEAD
//
// first l at which the window sum falls short ... 63   -> combined L <= 62
// last l not excluded .......................... 111
// agreement with instrument A: first AGREES (63 vs 63), last AGREES (111 vs 111)
// no-revival certificate: W(l) - l subadditive, T(400) = -22, max T = 7, sum -15 < 0: true
//
// W(l) vs Smax(l) at every l from 1 to 400: 0 disagreements — THE TWO INSTRUMENTS ARE ONE INSTRUMENT
// PROVEN, not measured: CRT realises every per-prime phase at a real T_5 slot
// inside one 23# period, so "at a single position" and "each prime its own best
// phase" are the same maximum here. The adjudication's independent recomputation
// recovered attack 3's own two numbers because it is attack 3's own instrument.
//
// === 5. FIRST-DEAD vs LAST-ALIVE AGAINST EXACT TRUTH =================
// 63 sub-block instances: every non-empty subset of the six block-1 primes,
// each over its own exact period 3*prod(Q) of T_5 slots, so the truth is known
// exactly in every one. Then the same on the T_7 tile, which has a different
// gap word (15 letters, mbar 14) and so a different block coordinate.
//
// tile  block primes                slots       truth  first-dead bound  last-alive bound  1..truth contiguous
// T_5   7,11,13,17                  51051       10     16                16                YES
// T_5   7,11,13,19                  57057       10     16                16                YES
// T_5   7,11,17,19                  74613       12     16                16                YES
// T_5   7,13,17,19                  88179       10     13                13                YES
// T_5   11,13,17,19                 138567      7      8                 8                 YES
// T_5   7,11,13,17,19               969969      14     30                36                YES
// T_5   7,11,13,23                  69069       10     16                16                YES
// T_5   7,11,17,23                  90321       10     16                16                YES
// T_5   7,13,17,23                  106743      12     13                15                YES
// T_5   11,13,17,23                 167739      7      8                 8                 YES
// T_5   7,11,13,17,23               1174173     14     36                36                YES
// T_5   7,11,19,23                  100947      10     16                16                YES
// T_5   7,13,19,23                  119301      12     13                13                YES
// T_5   11,13,19,23                 187473      7      8                 8                 YES
// T_5   7,11,13,19,23               1312311     13     36                36                YES
// T_5   7,17,19,23                  156009      12     12                12                YES
// T_5   11,17,19,23                 245157      6      8                 8                 YES
// T_5   7,11,17,19,23               1716099     14     29                29                YES
// T_5   13,17,19,23                 289731      6      8                 8                 YES
// T_5   7,13,17,19,23               2028117     13     20                27                YES
// T_5   11,13,17,19,23              3187041     9      12                16                YES
// T_5   7,11,13,17,19,23            22309287    19     62                111               YES
// T_7   11,13                       2145        3      4                 4                 YES
// T_7   11,13,17                    36465       5      7                 9                 YES
// T_7   11,13,17,19                 692835      8      13                13                YES
// T_7   11,13,17,19,23              15935205    13     26                26                YES
//
// instances: 67   achievable-length set non-contiguous in: 0   first-dead bound violated in: 0   last-alive bound violated in: 0
// first-dead bound / truth: min 1.00, max 3.26
// last-alive bound / truth: min 1.00, max 5.84
// Both readings are TRUE bounds everywhere. That is the whole point: last-alive
// is not wrong, it is weak. Only first-dead is the bound the criterion supports.
//
// === 6. THE INTERVAL-COORDINATE CHECK SECTION 7a QUOTES, REPRODUCED ==
// all 385 phase choices at {5, 7, 11}, two classes each, covering an interval:
//   feasible L = 1, 2, 3, 4, 5, 6, 7, 8, 9   contiguous 1..9: YES
//   its counting criterion: first dead l = 19 -> L <= 18; last not excluded = 18
//   ratios against the truth 9: first-dead 2.00x, last-alive 2.00x
//   NOTE: this toy has no revival at all, so it cannot illustrate the 62-vs-111
//   dispute. The revival example section 7a cites is the free-phase one at
//   x = 11 in attack-beta2-05-covering-prune.js section (D).
//
// === 7. WHAT EACH BOUND BUYS DOWNSTREAM ==============================
// A block-1 bound L <= B gives G2(23#) <= maxsum_{B+1}(T_5), against the
// p^2-rule threshold 23^2 = 529.
//
// reading                     L bound   maxsum_{L+1}(T_5)   vs 23^2 = 529   overshoot
// truth                       19        204                 529             0.39x
// first-dead (attack 3)       62        630                 529             1.19x
// last-alive (adjudication)   111       1122                529             2.12x
//
// exact G2(23#) = 204, so the truth reading is an identity, not a bound.
// Neither 62 nor 111 clears 529, so no p^2-rule conclusion follows from either.
// The difference between them is 1.19x against 2.12x on a threshold neither meets.
//
// ============================================================================
// READINGS
// ============================================================================
// 1. DOWNWARD CLOSURE HOLDS IN THE BLOCK COORDINATE, and it is not inherited
//    from the interval coordinate. It is the same triviality restated, because
//    the block object IS an interval: combined L is the number of consecutive
//    T_5 slots inside one G2 gap. The rebuild pins that identification on every
//    number independently — survivors 7,952,175 = D_23, L = 19, extremal run
//    starting at the integer 33,638,417, span 180, and G2(23#) = maxsum_20(T_5)
//    = 204 exactly. A contiguous piece of a contiguous run is a contiguous run,
//    so the achievable lengths are an initial segment. TESTED, not assumed: at
//    each l the existence of an all-dead run of length l was decided by its own
//    scan of all 22,309,287 windows, never inferred from the maximum, and the
//    achievable set is exactly 1..19. Repeated over 67 instances — all 63
//    non-empty subsets of the block-1 primes on T_5, and four on T_7, whose gap
//    word is 15 letters rather than 3 — with ZERO non-contiguous sets and ZERO
//    bound violations.
//
// 2. THE ONE WAY IT COULD HAVE FAILED, CHECKED. Closure is only usable if the
//    counting criterion binds NON-MAXIMAL runs. Had Theorem D's inequality used
//    the survivors that bound a maximal run, restriction would leave its domain
//    and first-dead would be unsound. It does not. All 190 contiguous sub-runs
//    of the extremal 19-run are themselves all-dead runs, every one satisfies
//    sum k_p >= l, and restriction reaches all three phases, which is the family
//    the instrument maximises over. Prefixes even preserve the phase exactly, so
//    the max over f is not load-bearing.
//
// 3. THE INSTRUMENT RE-RUN: 62 IS CONFIRMED. First dead l = 63, with S(63,f) =
//    62 at all three phases, so combined L <= 62. One refinement attack 3 did
//    not report: phase by phase the first failures are 63, 62, 62, so phases 1
//    and 2 die a step earlier. The bound is 62 under the max-over-phase reading
//    and 62 under the per-phase reading. Attack 3's block-2 figure reproduces
//    too: first dead l = 660, L <= 659 at v = 7.
//
// 4. THE ADJUDICATION'S INSTRUMENT IS ATTACK 3'S INSTRUMENT. W(l) = Smax(l) at
//    every l from 1 to 400, zero disagreements, and that is a theorem rather
//    than a coincidence: by CRT every choice of per-prime phase is realised at
//    an actual T_5 slot inside one 23# period, so "at a single position" and
//    "each prime picks its own best phase" have the same maximum here. The
//    adjudication's "computed here exactly" recovered 62 and 111 because it
//    recomputed the same function. There was never a second opinion, only a
//    second reading of one sweep.
//
// 5. 111 IS THE LAST l THE CRITERION PASSES, NOT A BOUND. The sweep length is
//    not doing the work: T(l) = Smax(l) - l is subadditive because a run of a+b
//    splits into runs of a and b, T(1200) = -77 and max T = 7, so T(n) < 0 for
//    every n >= 1200 and the sweep covers everything below. 111 is the last live
//    l forever, and 39 values in 64..111 are "not excluded". Not excluded is not
//    achievable: the achievable set stops at 19.
//
// 6. BOTH READINGS ARE TRUE BOUNDS. Across 67 instances neither reading was
//    ever violated (first-dead / truth in [1.00, 3.26]; last-alive / truth in
//    [1.00, 5.84]). So L <= 111 is not wrong — it is implied by L <= 62 and
//    weaker by 1.79x in L and 1.78x in the downstream maxsum. This is the whole
//    dispute: not a contradiction, a strength ordering.
//
// 7. WHAT IT BUYS. L <= 62 gives G2(23#) <= maxsum_63(T_5) = 630 against the
//    p^2-rule threshold 529, overshoot 1.19x; L <= 111 gives 1122, overshoot
//    2.12x. NEITHER clears 529, so no p^2-rule conclusion follows from either
//    and the qualitative finding — counting at block 1 is binding rather than
//    vacuous — is the same under both. The choice moves a margin on a threshold
//    that is not met.
//
// 8. THE {5,7,11} CHECK REPRODUCES AND IS THE WRONG WITNESS. All 385 phase
//    choices give feasible set exactly 1..9, contiguous, as section 7a says.
//    But its counting criterion has NO revival at all (first dead 19, last alive
//    18), so that toy cannot illustrate the 62-vs-111 dispute. The revival
//    witness section 7a actually quotes is the free-phase one at x = 11 in
//    attack-beta2-05-covering-prune.js, and there the quoted "last-dead gives
//    5854x" is the LAST DEAD l — the last l at which the criterion FAILS, which
//    is whatever the sweep limit happens to be. That script now sweeps to 40000
//    and prints 40000. The 62-vs-111 dispute turns on the LAST ALIVE reading,
//    the opposite quantity. Apples to apples at x = 11 the comparison is
//    first-dead 83 against last-alive 6*18+5 = 113, both against a truth of 41,
//    so 2.02x against 2.76x. The conclusion of section 7a is unaffected; its
//    supporting ratio measures the wrong quantity and its size is a sweep
//    artifact.

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/block-L-first-dead.js
//   invocation:  node research/block-L-first-dead.js
//   code-sha256: 846a9f46d62d777c0b1a82c8c2605f35760e75137a4177d95779c88e0902b7a9
//   out-sha256:  50568fd91f332ca053ced7bf0e2bd61a2f7e9539f8cdc5c837d78e5dd2d8566d
//   body-lines:  155
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     16.1 s
// ============================================================================
// === 1. THE BLOCK-1 OBJECT, REBUILT FROM SCRATCH =====================
// T_5: residues 11, 17, 29 mod 30; gap word 6, 12, 12; mbar = 10
// T_7: 15 residues mod 210; gap word 6,12,12,18,12,30,6,30,12,18,12,12,6,12,12; mbar = 14.000
// block 1 = primes in (5, 25]  = 7, 11, 13, 17, 19, 23
// block 2 = primes in (7, 49]  = 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47
//
// quantity                        computed              expected           ok
// T_5 slots in 23#                22309287              22309287           YES
// survivors                       7952175               7952175            YES
// mean killers per slot           0.9312453598          0.9312453598       YES
// combined L (longest dead run)   19                    19                 YES
// extremal run first integer      33638417              33638417           YES
// span X of that run              180                   180                YES
// G2(23#) = maxsum_{L+1}(T_5)     204                   204                YES
//
// The last line is the covering identity: the exact G2 is the maxsum over one
// more gap than the run has slots. It is what makes L the object of interest.
//
// === 2. DOWNWARD CLOSURE IN THE BLOCK COORDINATE, TESTED NOT ASSUMED =
// achievable dead-run lengths at block 1, each tested by its own full-period scan:
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
//   contiguous initial segment 1..19: YES
// contiguous sub-runs of the extremal 19-run: 190
//   every one is itself an all-dead run ......................... YES
//   every one satisfies the partition constraint sum k_p >= l ... YES
//   phases reached by restriction: {0, 1, 2} of {0, 1, 2}
// The second line is the load-bearing one. If the constraint applied only to
// MAXIMAL runs, restriction would leave its domain and first-dead would be
// unsound. It does not: the constraint is stated for any deleted run.
//
// === 3. INSTRUMENT A: ATTACK 3's THEOREM D COUNTING FORM, RECOMPUTED =
// K_p(l,f) = max over a of #{i < l : d_i = a or a-2 mod p};  S(l,f) = sum_p K_p.
// A run of l consecutive deleted slots at phase f forces S(l,f) >= l.
//
//  l   S(l,0)  S(l,1)  S(l,2)  max   l   verdict
//   1   6       6       6       6     1   not excluded
//   6   13      11      13      13    6   not excluded
//  19   23      23      23      23    19  not excluded
//  23   26      27      27      27    23  not excluded
//  61   61      61      61      61    61  not excluded
//  62   62      61      61      62    62  not excluded
//  63   62      62      62      62    63  DEAD (no run of this length, at any phase)
//  64   64      64      63      64    64  not excluded
// 110   108     110     110     110   110 not excluded
// 111   110     111     110     111   111 not excluded
// 112   111     111     110     111   112 DEAD (no run of this length, at any phase)
// 113   111     112     112     112   113 DEAD (no run of this length, at any phase)
// 200   192     192     192     192   200 DEAD (no run of this length, at any phase)
//
// first l at which every phase fails ....... 63   -> combined L <= 62
// first failing l, phase by phase ......... 63, 62, 62  -> L <= 62 by the per-phase reading
// l still not excluded above that .......... 39 values, the largest 111
//   64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 100, 102, 103, 110, 111
// last l not excluded ...................... 111   -> "L <= 111" is the adjudication's reading
//
// NO-REVIVAL CERTIFICATE, so the sweep length is not doing the work:
//   T(l) = Smax(l) - l is SUBADDITIVE (a run of a+b splits into a and b).
//   T(1200) = -77,  max T(r) over r < 1200 = 7
//   so T(n) <= T(1200) + max T(r) = -70 < 0 for every n >= 1200, PROVEN
//   and the sweep covers n < 1200 directly. So 111 really is the last l
//   the criterion ever passes, and 62 really is the first it ever fails.
//
// block 2 (v = 7, primes 11..47, 15 phases), same instrument:
//   first dead l = 660 -> L <= 659;  last not excluded = 757;  T(3000) = -67, max T = 20, no revival above 3000: true
//   attack 3 reported "L <= 659 (first dead l = 660)". Reproduced: YES
//
// === 4. INSTRUMENT B: THE ADJUDICATION's w-WINDOW, RECOMPUTED ========
// The adjudication computed L <= 111 a different way: w(i) = number of block
// primes killing slot i, and a run of l consecutive slots needs SOME window of
// l consecutive slots with sum(w) >= l. Taken at real positions over the full
// 23# period, which it described as sharper than instrument A because A lets
// each prime pick its own best phase. Recomputed over all 22,309,287 windows.
//
//  l    max window sum(w)   l    verdict
//   19  23                 19   not excluded
//   62  62                 62   not excluded
//   63  62                 63   DEAD
//  110  110                110  not excluded
//  111  111                111  not excluded
//  112  111                112  DEAD
//  200  192                200  DEAD
//  400  378                400  DEAD
//
// first l at which the window sum falls short ... 63   -> combined L <= 62
// last l not excluded .......................... 111
// agreement with instrument A: first AGREES (63 vs 63), last AGREES (111 vs 111)
// no-revival certificate: W(l) - l subadditive, T(400) = -22, max T = 7, sum -15 < 0: true
//
// W(l) vs Smax(l) at every l from 1 to 400: 0 disagreements — THE TWO INSTRUMENTS ARE ONE INSTRUMENT
// PROVEN, not measured: CRT realises every per-prime phase at a real T_5 slot
// inside one 23# period, so "at a single position" and "each prime its own best
// phase" are the same maximum here. The adjudication's independent recomputation
// recovered attack 3's own two numbers because it is attack 3's own instrument.
//
// === 5. FIRST-DEAD vs LAST-ALIVE AGAINST EXACT TRUTH =================
// 63 sub-block instances: every non-empty subset of the six block-1 primes,
// each over its own exact period 3*prod(Q) of T_5 slots, so the truth is known
// exactly in every one. Then the same on the T_7 tile, which has a different
// gap word (15 letters, mbar 14) and so a different block coordinate.
//
// tile  block primes                slots       truth  first-dead bound  last-alive bound  1..truth contiguous
// T_5   7,11,13,17                  51051       10     16                16                YES
// T_5   7,11,13,19                  57057       10     16                16                YES
// T_5   7,11,17,19                  74613       12     16                16                YES
// T_5   7,13,17,19                  88179       10     13                13                YES
// T_5   11,13,17,19                 138567      7      8                 8                 YES
// T_5   7,11,13,17,19               969969      14     30                36                YES
// T_5   7,11,13,23                  69069       10     16                16                YES
// T_5   7,11,17,23                  90321       10     16                16                YES
// T_5   7,13,17,23                  106743      12     13                15                YES
// T_5   11,13,17,23                 167739      7      8                 8                 YES
// T_5   7,11,13,17,23               1174173     14     36                36                YES
// T_5   7,11,19,23                  100947      10     16                16                YES
// T_5   7,13,19,23                  119301      12     13                13                YES
// T_5   11,13,19,23                 187473      7      8                 8                 YES
// T_5   7,11,13,19,23               1312311     13     36                36                YES
// T_5   7,17,19,23                  156009      12     12                12                YES
// T_5   11,17,19,23                 245157      6      8                 8                 YES
// T_5   7,11,17,19,23               1716099     14     29                29                YES
// T_5   13,17,19,23                 289731      6      8                 8                 YES
// T_5   7,13,17,19,23               2028117     13     20                27                YES
// T_5   11,13,17,19,23              3187041     9      12                16                YES
// T_5   7,11,13,17,19,23            22309287    19     62                111               YES
// T_7   11,13                       2145        3      4                 4                 YES
// T_7   11,13,17                    36465       5      7                 9                 YES
// T_7   11,13,17,19                 692835      8      13                13                YES
// T_7   11,13,17,19,23              15935205    13     26                26                YES
//
// instances: 67   achievable-length set non-contiguous in: 0   first-dead bound violated in: 0   last-alive bound violated in: 0
// first-dead bound / truth: min 1.00, max 3.26
// last-alive bound / truth: min 1.00, max 5.84
// Both readings are TRUE bounds everywhere. That is the whole point: last-alive
// is not wrong, it is weak. Only first-dead is the bound the criterion supports.
//
// === 6. THE INTERVAL-COORDINATE CHECK SECTION 7a QUOTES, REPRODUCED ==
// all 385 phase choices at {5, 7, 11}, two classes each, covering an interval:
//   feasible L = 1, 2, 3, 4, 5, 6, 7, 8, 9   contiguous 1..9: YES
//   its counting criterion: first dead l = 19 -> L <= 18; last not excluded = 18
//   ratios against the truth 9: first-dead 2.00x, last-alive 2.00x
//   NOTE: this toy has no revival at all, so it cannot illustrate the 62-vs-111
//   dispute. The revival example section 7a cites is the free-phase one at
//   x = 11 in attack-beta2-05-covering-prune.js section (D).
//
// === 7. WHAT EACH BOUND BUYS DOWNSTREAM ==============================
// A block-1 bound L <= B gives G2(23#) <= maxsum_{B+1}(T_5), against the
// p^2-rule threshold 23^2 = 529.
//
// reading                     L bound   maxsum_{L+1}(T_5)   vs 23^2 = 529   overshoot
// truth                       19        204                 529             0.39x
// first-dead (attack 3)       62        630                 529             1.19x
// last-alive (adjudication)   111       1122                529             2.12x
//
// exact G2(23#) = 204, so the truth reading is an identity, not a bound.
// Neither 62 nor 111 clears 529, so no p^2-rule conclusion follows from either.
// The difference between them is 1.19x against 2.12x on a threshold neither meets.
// ============================================================================
// READINGS
// ============================================================================
