// ============================================================================
// IS L SUB-ADDITIVE WHEN TWO PRIME SETS MERGE?
//
// Chris: "It still strikes me that L should be smaller for the combined set of
// two P rather than P+P."
//
// THE OBJECT.  For a finite set of primes P, each prime taking TWO residue
// classes {a_p, a_p - 2} mod p with a_p FREE (the covering form of
// units.js section 5, NOT the sieve form where the pair is pinned at {0,-2}):
//
//   L(P) = max L such that [1, L] is entirely covered, for some choice of (a_p).
//
// Coverability is downward closed, so the feasible L are an initial segment and
// L(P) is well defined as (first infeasible L) - 1.  Verified per-L here, each L
// decided by its own independent exact call, never inferred from a maximum.
//
// THE QUESTION, three ways (the brief's own numbering):
//   1. Is L(P u Q) < L(P) + L(Q) for disjoint P, Q?
//   2. What is the honest baseline: additive, or a concatenation bound whose
//      legality CRT decides?
//   3. Is there a law L(P u Q) ~ f(L(P), L(Q)), and does it have a defect that
//      compounds when many blocks merge?
//
// WHAT IS COMPUTED.
//   1. The exact engine, and four independent validations of it: literal brute
//      force over every phase vector at four prime sets; the repo's own
//      exhaustive {5,7,11} check from sift-limit-attack.md section 7a; the
//      exact G2 ladder of exact-g2-ladder.js; and the T_5 sub-block truths of
//      block-L-first-dead.js section 5.
//   2. Downward closure re-verified in this coordinate, per L, per set.
//   3. THE CONCATENATION THEOREM and an explicit verified witness.
//   4. The census: every disjoint pair drawn from a nine-prime pool, 9330 of
//      them, and the full distribution of Delta = L(P u Q) - L(P) - L(Q).
//   5. Compounding: set partitions into k parts, sum of parts against the union.
//   6. The law, and the coordinate in which Chris's instinct is right.
//   7. The tile coordinate, where phases really can fail to line up.
//   8. The price against 529.
//
// Runtime about 40 s.
// ============================================================================
'use strict';

const f2 = (x, n) => Number(x).toFixed(n);
const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];

// ---------------------------------------------------------------------------
// THE EXACT ENGINE.  Complete depth-first search, not a greedy.  At every node
// it takes the LEAST uncovered point n; that point must be covered by some
// still-unassigned prime p, and there are exactly two ways (a_p = n or n+2).
// Every branch is enumerated, so a returned "false" is a proof of infeasibility
// and not a search failure.  The only pruning is a valid capacity bound:
// if sum over unassigned p of max_a #{u uncovered : u = a or a-2 mod p} is less
// than the number of uncovered points, no completion exists.
// ---------------------------------------------------------------------------
let ENGINE_NODES = 0;
function feasible(P, L) {
  const n = P.length;
  const cov = new Uint8Array(L + 1);
  const used = new Uint8Array(n);
  const assign = new Int32Array(n).fill(-1);
  function maxcover(p, uncov) {
    const c = new Int32Array(p);
    for (const u of uncov) c[u % p]++;
    let m = 0;
    for (let a = 0; a < p; a++) { const v = c[a] + (p === 2 ? 0 : c[(a - 2 + p) % p]); if (v > m) m = v; }
    return m;
  }
  function rec(nUsed) {
    ENGINE_NODES++;
    let least = -1;
    for (let i = 1; i <= L; i++) if (!cov[i]) { least = i; break; }
    if (least < 0) return true;
    if (nUsed === n) return false;
    const uncov = [];
    for (let i = least; i <= L; i++) if (!cov[i]) uncov.push(i);
    let cap = 0;
    for (let k = 0; k < n; k++) if (!used[k]) cap += maxcover(P[k], uncov);
    if (cap < uncov.length) return false;
    for (let k = 0; k < n; k++) {
      if (used[k]) continue;
      const p = P[k];
      const opts = p === 2 ? [least % 2] : [least % p, (least + 2) % p];
      for (const a of opts) {
        const added = [];
        for (const u of uncov) {
          const r = u % p;
          if (r === a || (p !== 2 && r === (a - 2 + p) % p)) { cov[u] = 1; added.push(u); }
        }
        used[k] = 1; assign[k] = a;
        if (rec(nUsed + 1)) { for (const u of added) cov[u] = 0; used[k] = 0; return true; }
        used[k] = 0; assign[k] = -1;
        for (const u of added) cov[u] = 0;
      }
    }
    return false;
  }
  const ok = rec(0);
  return { ok, assign: ok ? Array.from(assign) : null };
}

// L(P) by scanning UP from 1.  Every L is decided by its own independent exact
// call.  Nothing is bisected: the brief's warning is that the GREEDY search is
// non-monotone, so no search-success may be bisected on.  Exact feasibility is
// downward closed (re-verified in section 2), but the scan does not rely on it.
function Lof(P, cap) {
  cap = cap || 500;
  let last = 0, firstDead = null;
  const feas = [];
  for (let L = 1; L <= cap; L++) {
    const ok = feasible(P, L).ok;
    feas.push(ok);
    if (!ok) { firstDead = L; break; }
    last = L;
  }
  return { L: last, firstDead, feas };
}
// the same, but continuing past the first failure, to expose any revival
function LofProbe(P, upto) {
  const feas = [];
  for (let L = 1; L <= upto; L++) feas.push(feasible(P, L).ok);
  return feas;
}
const key = P => P.join(',');
const mbar = P => P.reduce((a, p) => a * (p === 2 ? 2 : p / (p - 2)), 1);

console.log('=== 1. THE EXACT ENGINE AND FOUR INDEPENDENT VALIDATIONS ============');

// (a) literal brute force over every phase vector, longest covered run over a
//     full period.  Independent of the engine in every respect.
function bruteForceL(P) {
  const M = P.reduce((a, b) => a * b, 1);
  const n = P.length;
  const a = new Int32Array(n);
  let best = 0;
  const cov = new Uint8Array(M);
  const rec = k => {
    if (k === n) {
      cov.fill(0);
      for (let j = 0; j < n; j++) {
        const p = P[j];
        for (let r = a[j] % p; r < M; r += p) cov[r] = 1;
        for (let r = ((a[j] - 2) % p + p) % p; r < M; r += p) cov[r] = 1;
      }
      let cur = 0;
      for (let i = 0; i < 2 * M; i++) { if (cov[i % M]) { cur++; if (cur > best) best = cur; } else cur = 0; }
      return;
    }
    for (let v = 0; v < P[k]; v++) { a[k] = v; rec(k + 1); }
  };
  rec(0);
  return best;
}
console.log('(a) literal brute force: every phase vector, longest covered run over a full period.');
console.log('    set                    period = phase vectors   brute force L   engine L   agree');
for (const P of [[5, 7], [5, 7, 11], [5, 7, 11, 13], [7, 11, 13, 17]]) {
  const M = P.reduce((x, y) => x * y, 1);
  const bf = bruteForceL(P), en = Lof(P).L;
  console.log('    ' + key(P).padEnd(23) + String(M).padEnd(24) +
    String(bf).padEnd(16) + String(en).padEnd(11) + (bf === en ? 'YES' : 'NO  <-- FAILED'));
}
console.log('    Brute force maximises the longest run over ALL phase vectors; the engine asks');
console.log('    whether [1,L] is coverable. They agree because a_p is free, so a cover is');
console.log('    translation invariant and "somewhere" equals "at [1,L]".');

// (b) the repo's own exhaustive check, section 7a of sift-limit-attack.md
{
  const P = [5, 7, 11];
  const probe = LofProbe(P, 14);
  const feasSet = probe.map((v, i) => v ? i + 1 : null).filter(x => x);
  console.log('');
  console.log('(b) sift-limit-attack.md section 7a: "all 385 phase choices at {5,7,11} ... the');
  console.log(`    feasible set is exactly 1..9, contiguous". Recomputed here: feasible L = ${feasSet.join(', ')}`);
  console.log(`    matches 1..9 contiguous: ${feasSet.length === 9 && feasSet[8] === 9 ? 'YES' : 'NO  <-- FAILED'}`);
}

// (c) the exact G2 ladder
const G2LADDER = { 2: 2, 3: 6, 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204 };
console.log('');
console.log('(c) exact-g2-ladder.js. G2(x#) is the SIEVE form, pair pinned at {0,-2}. L is the');
console.log('    COVERING form, pair a free translate, so L(primes <= x) + 1 >= G2(x#) trivially.');
console.log('    Measured, the free translate buys NOTHING at any level we can reach:');
console.log('    x    L(primes<=x)   L+1     exact G2(x#)   equal');
const ladderRows = [];
for (const x of [2, 3, 5, 7, 11, 13, 17, 19, 23]) {
  const P = PRIMES.filter(p => p <= x);
  const L = Lof(P, 400).L;
  ladderRows.push({ x, L });
  console.log('    ' + String(x).padEnd(5) + String(L).padEnd(15) + String(L + 1).padEnd(8) +
    String(G2LADDER[x]).padEnd(15) + (L + 1 === G2LADDER[x] ? 'YES' : 'NO  <-- FAILED'));
}
console.log('    Nine for nine. The engine reproduces an independently computed ladder end to');
console.log('    end, and the covering/sieve distinction of units.js section 5 costs zero here.');

console.log('');
console.log('=== 2. DOWNWARD CLOSURE, RE-VERIFIED IN THIS COORDINATE =============');
console.log('Each L decided by its own exact call, continuing PAST the first failure so a');
console.log('revival would be visible. The brief warns that GREEDY success is non-monotone;');
console.log('this is exact feasibility, and it is not.');
console.log('');
console.log('set                        feasible L (probed past the first failure)                       L(P)  revivals');
let revivals = 0;
for (const P of [[5], [5, 7], [5, 7, 11], [7, 11, 13], [5, 7, 11, 13], [7, 11, 13, 17], [11, 13, 17, 19], [5, 7, 11, 13, 17]]) {
  const L = Lof(P, 400).L;
  const probe = LofProbe(P, L + 6);
  const rev = probe.slice(L).filter(x => x).length;
  revivals += rev;
  const set = probe.map((v, i) => v ? i + 1 : null).filter(x => x);
  console.log(key(P).padEnd(27) + (set.join(',') + '  |  dead: ' + probe.map((v, i) => v ? null : i + 1).filter(x => x).join(',')).padEnd(66) +
    String(L).padEnd(6) + String(rev));
}
console.log(`total revivals above the first failure, over ${8} sets probed six past the end: ${revivals}`);

console.log('');
console.log('=== 3. THE CONCATENATION THEOREM ===================================');
console.log('CLAIM [PROVEN].  For DISJOINT prime sets P and Q,  L(P u Q) >= L(P) + L(Q).');
console.log('');
console.log('PROOF.  a_p is free, so a cover is translation invariant: if (a_p) covers [1, A]');
console.log('then (a_p + t) covers [1+t, A+t], for every integer t. Take (a_p)_{p in P}');
console.log('covering [1, L(P)] and (a_q)_{q in Q} covering [1, L(Q)]; translate the second by');
console.log('t = L(P), so it covers [L(P)+1, L(P)+L(Q)]. P and Q are DISJOINT, so no prime is');
console.log('asked to hold two phases at once and the two assignments are simultaneously legal.');
console.log('The union covers [1, L(P)+L(Q)].  QED.  No CRT is needed: the two assignments');
console.log('touch disjoint coordinates, so there is nothing to reconcile. CRT is what makes');
console.log('the FREE-TRANSLATE model legitimate in the first place (two-class-lower-bounds.md');
console.log('section 1), and once it is, concatenation is one line.');
console.log('');
console.log('SO SUB-ADDITIVITY IS IMPOSSIBLE. L(P u Q) < L(P) + L(Q) cannot happen.');
console.log('');
// explicit verified witness
{
  const P = [5, 7, 11], Q = [13, 17, 19];
  const LP = Lof(P).L, LQ = Lof(Q).L, LU = Lof(P.concat(Q)).L;
  const aP = feasible(P, LP).assign, aQ = feasible(Q, LQ).assign;
  // build the concatenated assignment and verify it covers [1, LP+LQ]
  const all = P.concat(Q), aAll = aP.concat(aQ.map((a, i) => ((a + LP) % Q[i] + Q[i]) % Q[i]));
  let covered = 0;
  for (let n = 1; n <= LP + LQ; n++) {
    let hit = false;
    for (let k = 0; k < all.length; k++) {
      const p = all[k], r = ((n - aAll[k]) % p + p) % p;
      if (r === 0 || r === p - 2) { hit = true; break; }
    }
    if (hit) covered++;
  }
  console.log('WITNESS, built and verified rather than asserted:');
  console.log(`  P = {${key(P)}}, L(P) = ${LP}, cover phases a_p = ${aP.join(', ')}`);
  console.log(`  Q = {${key(Q)}}, L(Q) = ${LQ}, cover phases a_q = ${aQ.join(', ')}`);
  console.log(`  translate Q's phases by t = ${LP}:  a_q -> ${aAll.slice(3).join(', ')}`);
  console.log(`  the concatenated assignment covers ${covered} of the ${LP + LQ} points of [1, ${LP + LQ}]: ` +
    (covered === LP + LQ ? 'ALL' : 'NOT ALL  <-- FAILED'));
  console.log(`  and the true L(P u Q) = ${LU}, which is ${LU - LP - LQ} MORE than the concatenation floor.`);
}

console.log('');
console.log('=== 4. THE CENSUS: EVERY DISJOINT PAIR FROM A NINE-PRIME POOL =======');
const POOL = [5, 7, 11, 13, 17, 19, 23, 29, 31];
const NP = 1 << POOL.length;
const Lm = new Int32Array(NP), MB = new Float64Array(NP).fill(1), SZ = new Int32Array(NP);
const setOf = m => POOL.filter((_, k) => m & (1 << k));
const tCensus = Date.now();
for (let m = 1; m < NP; m++) { const P = setOf(m); Lm[m] = Lof(P, 400).L; MB[m] = mbar(P); SZ[m] = P.length; }
console.log(`all ${NP - 1} non-empty subsets of {${POOL.join(',')}} solved exactly in ${((Date.now() - tCensus) / 1000).toFixed(1)} s`);
console.log(`L of the whole pool = ${Lm[NP - 1]}`);
const D = [];
let neg = 0, zero = 0, pos = 0;
for (let a = 1; a < NP; a++) for (let b = a + 1; b < NP; b++) {
  if (a & b) continue;
  const d = Lm[a | b] - Lm[a] - Lm[b];
  D.push(d);
  if (d < 0) neg++; else if (d === 0) zero++; else pos++;
}
D.sort((x, y) => x - y);
const q = t => D[Math.floor(t * (D.length - 1))];
console.log('');
console.log(`disjoint pairs (P, Q), both non-empty ....... ${D.length}`);
console.log(`Delta = L(P u Q) - (L(P) + L(Q))`);
console.log(`  Delta <  0  (sub-additive, Chris's guess) .. ${neg}      <-- THE ANSWER IS ZERO`);
console.log(`  Delta =  0  (exactly additive) ............. ${zero}`);
console.log(`  Delta >  0  (super-additive) ............... ${pos}`);
console.log(`  min ${D[0]}   q25 ${q(0.25)}   median ${q(0.5)}   q75 ${q(0.75)}   max ${D[D.length - 1]}   mean ${f2(D.reduce((a, b) => a + b, 0) / D.length, 3)}`);
console.log('');
console.log('Delta by size of the smaller part, so "one big block plus one small one" is not');
console.log('confused with "two comparable blocks":');
console.log('  min|P|,|Q|   pairs    mean Delta   max Delta   exactly additive');
{
  const by = new Map();
  for (let a = 1; a < NP; a++) for (let b = a + 1; b < NP; b++) {
    if (a & b) continue;
    const k = Math.min(SZ[a], SZ[b]), d = Lm[a | b] - Lm[a] - Lm[b];
    if (!by.has(k)) by.set(k, []);
    by.get(k).push(d);
  }
  for (const k of [...by.keys()].sort((x, y) => x - y)) {
    const v = by.get(k);
    console.log('  ' + String(k).padEnd(13) + String(v.length).padEnd(9) +
      f2(v.reduce((a, b) => a + b, 0) / v.length, 2).padEnd(13) +
      String(Math.max(...v)).padEnd(12) + String(v.filter(x => x === 0).length));
  }
}
console.log('');
console.log('WHEN IS THE FLOOR EXACTLY MET? The equality cases, by part sizes:');
{
  const h = new Map();
  for (let a = 1; a < NP; a++) for (let b = a + 1; b < NP; b++) {
    if (a & b) continue;
    if (Lm[a | b] - Lm[a] - Lm[b] !== 0) continue;
    const k = [SZ[a], SZ[b]].sort((x, y) => x - y).join('+');
    h.set(k, (h.get(k) || 0) + 1);
  }
  console.log('  ' + [...h.entries()].sort().map(([k, v]) => `${k}: ${v}`).join('   '));
  let big = 0;
  for (let a = 1; a < NP; a++) for (let b = a + 1; b < NP; b++) {
    if (a & b) continue;
    if (Lm[a | b] - Lm[a] - Lm[b] === 0 && Math.min(SZ[a], SZ[b]) >= 3) big++;
  }
  console.log(`  equality with BOTH parts of size >= 3: ${big}. Exact additivity is a small-set`);
  console.log('  phenomenon; once both blocks are real blocks the floor is strictly beaten.');
}

console.log('');
console.log('=== 4b. THE OVERLAPPING CASE: WHERE THE INTUITION IS ACTUALLY RIGHT ==');
console.log('Disjointness is the whole hypothesis of section 3. Drop it and the picture');
console.log('INVERTS, because one prime cannot hold two phases at once. The extreme case is');
console.log('Q = P, where L(P u P) = L(P) < 2 L(P) for every P with L(P) > 0: sub-additive by');
console.log('a factor of 2, and trivially so. Measured across every OVERLAPPING pair:');
{
  const by = new Map();
  let nOv = 0, negOv = 0, zeroOv = 0, posOv = 0;
  for (let a = 1; a < NP; a++) for (let b = a + 1; b < NP; b++) {
    const ov = a & b;
    if (!ov) continue;
    const d = Lm[a | b] - Lm[a] - Lm[b];
    nOv++;
    if (d < 0) negOv++; else if (d === 0) zeroOv++; else posOv++;
    const k = SZ[ov];
    if (!by.has(k)) by.set(k, []);
    by.get(k).push(d);
  }
  console.log('');
  console.log(`  overlapping pairs (P, Q), P n Q non-empty ... ${nOv}`);
  console.log(`    Delta <  0 (sub-additive) .................. ${negOv}  (${f2(100 * negOv / nOv, 1)}%)`);
  console.log(`    Delta =  0 ................................. ${zeroOv}`);
  console.log(`    Delta >  0 ................................. ${posOv}  (${f2(100 * posOv / nOv, 1)}%)`);
  console.log('');
  console.log('  Delta as a function of how many primes are SHARED:');
  console.log('  |P n Q|   pairs     mean Delta   min Delta   share sub-additive');
  for (const k of [...by.keys()].sort((x, y) => x - y)) {
    const v = by.get(k);
    console.log('  ' + String(k).padEnd(10) + String(v.length).padEnd(10) +
      f2(v.reduce((x, y) => x + y, 0) / v.length, 2).padEnd(13) + String(Math.min(...v)).padEnd(12) +
      f2(v.filter(x => x < 0).length / v.length, 3));
  }
  console.log('');
  console.log('  THE DEFICIT IS A FUNCTION OF THE SHARED PRIMES AND OF NOTHING ELSE. At zero');
  console.log('  overlap it is provably absent; it turns on as soon as primes are reused and');
  console.log('  deepens monotonically with the size of the intersection. So the instinct is a');
  console.log('  correct instinct about PRIME REUSE, misfiled as a statement about set union.');
}

console.log('');
console.log('=== 5. COMPOUNDING: DOES THE EXCESS GROW WHEN MANY BLOCKS MERGE? ====');
console.log('Every set partition of the nine-prime pool, grouped by number of parts. For each');
console.log('k, the BEST floor any k-part partition can give, against the true L of the union.');
{
  const parts = [];
  const rec = (i, groups) => {
    if (i === POOL.length) { parts.push(groups.slice()); return; }
    for (let g = 0; g < groups.length; g++) { groups[g] |= (1 << i); rec(i + 1, groups); groups[g] &= ~(1 << i); }
    groups.push(1 << i); rec(i + 1, groups); groups.pop();
  };
  rec(0, []);
  const best = new Map(), worst = new Map(), cnt = new Map();
  for (const g of parts) {
    const k = g.length, s = g.reduce((a, m) => a + Lm[m], 0);
    if (!best.has(k) || s > best.get(k)) best.set(k, s);
    if (!worst.has(k) || s < worst.get(k)) worst.set(k, s);
    cnt.set(k, (cnt.get(k) || 0) + 1);
  }
  const LU = Lm[NP - 1];
  console.log(`  total set partitions: ${parts.length} (Bell(9)).  L(union) = ${LU}.`);
  console.log('  parts k   partitions   best floor sum L(P_i)   floor/L(union)   interaction share');
  for (const k of [...best.keys()].sort((x, y) => x - y)) {
    console.log('  ' + String(k).padEnd(10) + String(cnt.get(k)).padEnd(13) + String(best.get(k)).padEnd(23) +
      f2(best.get(k) / LU, 3).padEnd(17) + f2(1 - best.get(k) / LU, 3));
  }
  console.log('');
  console.log('  The floor DEGRADES monotonically as the partition gets finer, so the excess');
  console.log('  COMPOUNDS: it does not saturate. At the finest partition (nine singletons)');
  console.log(`  the floor is ${best.get(9)} against a truth of ${LU}, i.e. ${f2(1 - best.get(9) / LU, 3)} of L is pure interaction.`);
}

console.log('');
console.log('=== 6. THE LAW, AND THE COORDINATE IN WHICH CHRIS IS RIGHT ===========');
console.log('mbar(P) = prod_{p in P} p/(p-2) is the mean spacing of the survivors of P, and it');
console.log('is exactly MULTIPLICATIVE over a disjoint union. Measure r(P) = (L(P)+1)/mbar(P):');
console.log('  |P|   subsets   r min    r max    r mean');
{
  for (let k = 1; k <= POOL.length; k++) {
    const rs = [];
    for (let m = 1; m < NP; m++) if (SZ[m] === k) rs.push((Lm[m] + 1) / MB[m]);
    console.log('  ' + String(k).padEnd(6) + String(rs.length).padEnd(10) +
      f2(Math.min(...rs), 2).padEnd(9) + f2(Math.max(...rs), 2).padEnd(9) + f2(rs.reduce((a, b) => a + b, 0) / rs.length, 2));
  }
}
console.log('');
console.log('  r grows roughly LINEARLY in |P| while mbar grows MULTIPLICATIVELY. So the law is');
console.log('    L(P u Q) + 1  ~  mbar(P) * mbar(Q) * r(|P| + |Q|)');
console.log('  and merging MULTIPLIES the mean spacings while only ADDING the r factors.');
console.log('  That is why the additive floor is beaten so badly, and it is also the defect:');
console.log('  against the natural CRT/multiplicative baseline (L(P)+1)(L(Q)+1), which assumes');
console.log('  the r factors multiply too, the merge FALLS SHORT.');
{
  let mn = 1e9, mx = -1e9, s = 0, n = 0, over = 0, overBig = 0;
  for (let a = 1; a < NP; a++) for (let b = a + 1; b < NP; b++) {
    if (a & b) continue;
    const ratio = (Lm[a | b] + 1) / ((Lm[a] + 1) * (Lm[b] + 1));
    s += ratio; n++;
    if (ratio < mn) mn = ratio;
    if (ratio > mx) mx = ratio;
    if (ratio > 1) { over++; if (Math.min(SZ[a], SZ[b]) >= 2) overBig++; }
  }
  console.log('');
  console.log(`  multiplicative ratio (L(PuQ)+1) / ((L(P)+1)(L(Q)+1)) over ${n} disjoint pairs:`);
  console.log(`    min ${f2(mn, 3)}   mean ${f2(s / n, 3)}   max ${f2(mx, 3)}`);
  console.log(`    pairs with ratio > 1 (super-MULTIPLICATIVE) ............ ${over}  (${f2(100 * over / n, 1)}%)`);
  console.log(`    of those, with both parts of size >= 2 ................. ${overBig}`);
  console.log('');
  console.log('  SO CHRIS IS RIGHT IN THE MULTIPLICATIVE COORDINATE AND WRONG IN THE ADDITIVE');
  console.log('  ONE HE NAMED. "The combined set does less than you would expect" is a true');
  console.log('  statement about (L+1)(L\'+1); it is a false statement about L + L\'.');
}

console.log('');
console.log('=== 7. THE TILE COORDINATE, WHERE PHASES REALLY CAN FAIL TO LINE UP ==');
console.log('The corpus L is a BLOCK L: runs of consecutive T_5 slots, not consecutive');
console.log('integers. There the concatenation argument is not free, because the slot after a');
console.log('run sits at a phase the first run DICTATES. Measured exactly, over one full');
console.log('period per instance, for every non-empty subset of block 1 = {7,11,13,17,19,23}.');
const S5 = [11, 17, 29];
const slotAt = i => 30 * Math.floor(i / 3) + S5[i % 3];
function tilePerPhase(Q) {
  const per = Q.reduce((a, p) => a * p, 1), n = 3 * per;
  const dead = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const s = slotAt(i);
    for (const p of Q) { const r = s % p; if (r === 0 || r === p - 2) { dead[i] = 1; break; } }
  }
  const lf = [0, 0, 0];
  for (let f = 0; f < 3; f++) {
    let best = 0;
    for (let i = f; i < n; i += 3) {
      if (!dead[i]) continue;
      let c = 0, j = i;
      while (c < n && dead[j % n]) { c++; j++; }
      if (c > best) best = c;
      if (c >= n) break;
    }
    lf[f] = best;
  }
  return { lf, max: Math.max(...lf) };
}
const BLOCK1 = [7, 11, 13, 17, 19, 23];
const TL = {};
const tTile = Date.now();
for (let m = 1; m < 64; m++) { const Q = BLOCK1.filter((_, k) => m & (1 << k)); TL[key(Q)] = tilePerPhase(Q); }
console.log(`63 sub-blocks solved exactly over their own full periods in ${((Date.now() - tTile) / 1000).toFixed(1)} s`);
console.log('');
console.log('cross-check against block-L-first-dead.js section 5 (its "truth" column):');
for (const [Q, want] of [[[7, 11, 13, 17], 10], [[7, 11, 17, 19], 12], [[11, 13, 17, 19], 7], [[7, 11, 13, 17, 19], 14],
[[11, 17, 19, 23], 6], [[13, 17, 19, 23], 6], [[11, 13, 17, 19, 23], 9], [[7, 11, 13, 17, 19, 23], 19]]) {
  const got = TL[key(Q)].max;
  console.log('  ' + key(Q).padEnd(26) + `truth here ${String(got).padEnd(5)} corpus ${String(want).padEnd(5)} ` +
    (got === want ? 'AGREE' : 'DIFFER  <-- FAILED'));
}
console.log('');
console.log('PHASE-AWARE CONCATENATION [PROVEN in this coordinate]. Translating P\'s classes by');
console.log('a multiple of 30 moves its run to any slot index of the SAME phase (30 is a unit');
console.log('mod every block prime), and a prefix of a run of length x is a run of any length');
console.log('x\' <= x. So for disjoint P, Q:');
console.log('   lblock(P u Q) >= max over f, over x\' <= lP(f), of  x\' + lQ((f + x\') mod 3).');
console.log('The NAIVE form lP_max + lQ_max is NOT proven: the phase P leaves may not be one');
console.log('where Q attains its own maximum.');
{
  let nPairs = 0, vNaive = 0, vProven = 0, vProvenSharp = 0;
  const dN = [], dP = [];
  let naiveBeatsProven = 0;
  for (let a = 1; a < 64; a++) for (let b = a + 1; b < 64; b++) {
    if (a & b) continue;
    const A = BLOCK1.filter((_, k) => a & (1 << k)), B = BLOCK1.filter((_, k) => b & (1 << k));
    const U = BLOCK1.filter((_, k) => (a | b) & (1 << k));
    const la = TL[key(A)], lb = TL[key(B)], lu = TL[key(U)];
    nPairs++;
    if (lu.max < la.max + lb.max) vNaive++;
    dN.push(lu.max - la.max - lb.max);
    let sharp = 0;
    for (let f = 0; f < 3; f++) {
      for (let x = 1; x <= la.lf[f]; x++) { const v = x + lb.lf[(f + x) % 3]; if (v > sharp) sharp = v; }
      for (let x = 1; x <= lb.lf[f]; x++) { const v = x + la.lf[(f + x) % 3]; if (v > sharp) sharp = v; }
    }
    if (lu.max < sharp) vProvenSharp++;
    dP.push(lu.max - sharp);
    if (la.max + lb.max > sharp) naiveBeatsProven++;
  }
  const st = arr => `min ${Math.min(...arr)}  mean ${f2(arr.reduce((a, b) => a + b, 0) / arr.length, 2)}  max ${Math.max(...arr)}`;
  console.log('');
  console.log(`disjoint sub-block pairs inside block 1 ................ ${nPairs}`);
  console.log(`violations of the PROVEN phase-aware floor ............. ${vProvenSharp}`);
  console.log(`violations of the NAIVE floor lP_max + lQ_max .......... ${vNaive}   [MEASURED true, not proven]`);
  console.log(`pairs where the naive floor EXCEEDS the proven one ..... ${naiveBeatsProven}`);
  console.log(`excess above the naive floor:        ${st(dN)}`);
  console.log(`excess above the proven phase floor: ${st(dP)}`);
  console.log('');
  console.log('So even in the coordinate where phase alignment is a real constraint, merging is');
  console.log('super-additive at every one of the ' + nPairs + ' pairs, and the phase cost is at most a');
  console.log('couple of slots. Chris\'s intuition fails here too.');
}

console.log('');
console.log('=== 8. THE PRICE AGAINST 529 =======================================');
function maxsumT5(m) {
  const G = [6, 12, 12];
  let best = 0;
  for (let f = 0; f < 3; f++) { let s = 0; for (let k = 0; k < m; k++) s += G[(f + k) % 3]; if (s > best) best = s; }
  return best;
}
{
  const need = [];
  for (let B = 1; B <= 200; B++) if (maxsumT5(B + 1) <= 529) need.push(B);
  const Bmax = Math.max(...need);
  console.log('The p^2-rule threshold at x = 23 is 23^2 = 529, and a block-1 bound lblock <= B');
  console.log(`gives G2(23#) <= maxsum_{B+1}(T_5). The largest B that clears 529 is B = ${Bmax}`);
  console.log(`(maxsum_${Bmax + 1} = ${maxsumT5(Bmax + 1)} <= 529 < ${maxsumT5(Bmax + 2)} = maxsum_${Bmax + 2}).`);
  console.log(`Current bound 62 gives ${maxsumT5(63)}; the truth 19 gives ${maxsumT5(20)}.`);
  console.log('');
  console.log('WHAT SUPER-ADDITIVITY DOES TO THE MERGE ROUTE.');
  console.log('  (i) It KILLS the upper-bound-by-splitting family outright. If L were');
  console.log('      sub-additive, bounding each sub-block and adding would bound the union,');
  console.log('      and 63 exact sub-block bounds would be a cheap road to a small B. The');
  console.log('      inequality runs the other way, so splitting produces only FLOORS.');
  console.log('  (ii) The floors it does produce are far below the requirement, so it is not an');
  console.log('      obstruction either. Best two-part floor inside block 1, exactly:');
  let bestFloor = 0, bestPair = null;
  for (let a = 1; a < 64; a++) {
    const b = 63 & ~a;
    if (!a || !b || a > b) continue;
    const A = BLOCK1.filter((_, k) => a & (1 << k)), B = BLOCK1.filter((_, k) => b & (1 << k));
    const s = TL[key(A)].max + TL[key(B)].max;
    if (s > bestFloor) { bestFloor = s; bestPair = [A, B]; }
  }
  console.log(`      {${key(bestPair[0])}} + {${key(bestPair[1])}} = ${TL[key(bestPair[0])].max} + ${TL[key(bestPair[1])].max} = ${bestFloor}`);
  console.log(`      against the truth 19, the current bound 62, and the requirement ${Bmax}.`);
  console.log(`      ${bestFloor} <= ${Bmax}, so nothing here forbids the requirement; nothing here reaches it.`);
  console.log('  (iii) The compounding in section 5 says the gap between any floor and the truth');
  console.log('      GROWS with the number of parts. A many-block merge is the WORST case for');
  console.log('      the floor, not the best. There is no k at which the floor saturates onto L.');
  console.log('');
  console.log('NOT A REVIVAL OF THE SQUARING LADDER. The v -> v^2 ladder and the "block as a');
  console.log('set" family were closed on 2026-08-18 (attack-block-00-ADJUDICATION.md,');
  console.log('attack-block-01..10). Those asked whether a block bound at v LIFTS to v^2. This');
  console.log('asks how L behaves under a DISJOINT UNION of prime sets at one level, and the');
  console.log('answer is a one-line inequality in the opposite direction to the one a lift');
  console.log('would need. If anything it is a further reason the ladder cannot be revived:');
  console.log('the merge direction is super-additive, so it never contracts.');
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-L-subadditivity.js
//   invocation:  node research/attack-L-subadditivity.js
//   code-sha256: ba0dcbf8ec8650380ee0a1bdea9055f5b114d00b7fead74e32f913ecf64f279b
//   out-sha256:  34cbc17fab4b6f45fa63d75b3b606d97c47b4394ab7449d3193bc9b958c164a9
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     27.4 s
// ============================================================================
// === 1. THE EXACT ENGINE AND FOUR INDEPENDENT VALIDATIONS ============
// (a) literal brute force: every phase vector, longest covered run over a full period.
//     set                    period = phase vectors   brute force L   engine L   agree
//     5,7                    35                      4               4          YES
//     5,7,11                 385                     9               9          YES
//     5,7,11,13              5005                    13              13         YES
//     7,11,13,17             17017                   9               9          YES
//     Brute force maximises the longest run over ALL phase vectors; the engine asks
//     whether [1,L] is coverable. They agree because a_p is free, so a cover is
//     translation invariant and "somewhere" equals "at [1,L]".
//
// (b) sift-limit-attack.md section 7a: "all 385 phase choices at {5,7,11} ... the
//     feasible set is exactly 1..9, contiguous". Recomputed here: feasible L = 1, 2, 3, 4, 5, 6, 7, 8, 9
//     matches 1..9 contiguous: YES
//
// (c) exact-g2-ladder.js. G2(x#) is the SIEVE form, pair pinned at {0,-2}. L is the
//     COVERING form, pair a free translate, so L(primes <= x) + 1 >= G2(x#) trivially.
//     Measured, the free translate buys NOTHING at any level we can reach:
//     x    L(primes<=x)   L+1     exact G2(x#)   equal
//     2    1              2       2              YES
//     3    5              6       6              YES
//     5    11             12      12             YES
//     7    29             30      30             YES
//     11   41             42      42             YES
//     13   65             66      66             YES
//     17   107            108     108            YES
//     19   149            150     150            YES
//     23   203            204     204            YES
//     Nine for nine. The engine reproduces an independently computed ladder end to
//     end, and the covering/sieve distinction of units.js section 5 costs zero here.
//
// === 2. DOWNWARD CLOSURE, RE-VERIFIED IN THIS COORDINATE =============
// Each L decided by its own exact call, continuing PAST the first failure so a
// revival would be visible. The brief warns that GREEDY success is non-monotone;
// this is exact feasibility, and it is not.
//
// set                        feasible L (probed past the first failure)                       L(P)  revivals
// 5                          1  |  dead: 2,3,4,5,6,7                                           1     0
// 5,7                        1,2,3,4  |  dead: 5,6,7,8,9,10                                    4     0
// 5,7,11                     1,2,3,4,5,6,7,8,9  |  dead: 10,11,12,13,14,15                     9     0
// 7,11,13                    1,2,3,4,5,6  |  dead: 7,8,9,10,11,12                              6     0
// 5,7,11,13                  1,2,3,4,5,6,7,8,9,10,11,12,13  |  dead: 14,15,16,17,18,19         13    0
// 7,11,13,17                 1,2,3,4,5,6,7,8,9  |  dead: 10,11,12,13,14,15                     9     0
// 11,13,17,19                1,2,3,4,5,6,7,8  |  dead: 9,10,11,12,13,14                        8     0
// 5,7,11,13,17               1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24  |  dead: 25,26,27,28,29,3024    0
// total revivals above the first failure, over 8 sets probed six past the end: 0
//
// === 3. THE CONCATENATION THEOREM ===================================
// CLAIM [PROVEN].  For DISJOINT prime sets P and Q,  L(P u Q) >= L(P) + L(Q).
//
// PROOF.  a_p is free, so a cover is translation invariant: if (a_p) covers [1, A]
// then (a_p + t) covers [1+t, A+t], for every integer t. Take (a_p)_{p in P}
// covering [1, L(P)] and (a_q)_{q in Q} covering [1, L(Q)]; translate the second by
// t = L(P), so it covers [L(P)+1, L(P)+L(Q)]. P and Q are DISJOINT, so no prime is
// asked to hold two phases at once and the two assignments are simultaneously legal.
// The union covers [1, L(P)+L(Q)].  QED.  No CRT is needed: the two assignments
// touch disjoint coordinates, so there is nothing to reconcile. CRT is what makes
// the FREE-TRANSLATE model legitimate in the first place (two-class-lower-bounds.md
// section 1), and once it is, concatenation is one line.
//
// SO SUB-ADDITIVITY IS IMPOSSIBLE. L(P u Q) < L(P) + L(Q) cannot happen.
//
// WITNESS, built and verified rather than asserted:
//   P = {5,7,11}, L(P) = 9, cover phases a_p = 3, 4, 7
//   Q = {13,17,19}, L(Q) = 5, cover phases a_q = 1, 4, 5
//   translate Q's phases by t = 9:  a_q -> 10, 13, 14
//   the concatenated assignment covers 14 of the 14 points of [1, 14]: ALL
//   and the true L(P u Q) = 32, which is 18 MORE than the concatenation floor.
//
// === 4. THE CENSUS: EVERY DISJOINT PAIR FROM A NINE-PRIME POOL =======
// all 511 non-empty subsets of {5,7,11,13,17,19,23,29,31} solved exactly in 6.7 s
// L of the whole pool = 64
//
// disjoint pairs (P, Q), both non-empty ....... 9330
// Delta = L(P u Q) - (L(P) + L(Q))
//   Delta <  0  (sub-additive, Chris's guess) .. 0      <-- THE ANSWER IS ZERO
//   Delta =  0  (exactly additive) ............. 398
//   Delta >  0  (super-additive) ............... 8932
//   min 0   q25 3   median 8   q75 15   max 44   mean 10.516
//
// Delta by size of the smaller part, so "one big block plus one small one" is not
// confused with "two comparable blocks":
//   min|P|,|Q|   pairs    mean Delta   max Delta   exactly additive
//   1            2259     4.57         31          208
//   2            3942     7.97         42          190
//   3            2688     15.81        44          0
//   4            441      31.48        43          0
//
// WHEN IS THE FLOOR EXACTLY MET? The equality cases, by part sizes:
//   1+2: 105   1+3: 60   1+4: 30   1+5: 13   2+2: 105   2+3: 60   2+4: 25
//   equality with BOTH parts of size >= 3: 0. Exact additivity is a small-set
//   phenomenon; once both blocks are real blocks the floor is strictly beaten.
//
// === 4b. THE OVERLAPPING CASE: WHERE THE INTUITION IS ACTUALLY RIGHT ==
// Disjointness is the whole hypothesis of section 3. Drop it and the picture
// INVERTS, because one prime cannot hold two phases at once. The extreme case is
// Q = P, where L(P u P) = L(P) < 2 L(P) for every P with L(P) > 0: sub-additive by
// a factor of 2, and trivially so. Measured across every OVERLAPPING pair:
//
//   overlapping pairs (P, Q), P n Q non-empty ... 120975
//     Delta <  0 (sub-additive) .................. 46539  (38.5%)
//     Delta =  0 ................................. 6183
//     Delta >  0 ................................. 68253  (56.4%)
//
//   Delta as a function of how many primes are SHARED:
//   |P n Q|   pairs     mean Delta   min Delta   share sub-additive
//   1         29520     8.21         -3          0.177
//   2         39348     5.83         -7          0.297
//   3         30576     2.48         -12         0.466
//   4         15246     -2.31        -20         0.643
//   5         5040      -8.96        -27         0.863
//   6         1092      -18.06       -34         0.983
//   7         144       -30.58       -40         1.000
//   8         9         -47.00       -52         1.000
//
//   THE DEFICIT IS A FUNCTION OF THE SHARED PRIMES AND OF NOTHING ELSE. At zero
//   overlap it is provably absent; it turns on as soon as primes are reused and
//   deepens monotonically with the size of the intersection. So the instinct is a
//   correct instinct about PRIME REUSE, misfiled as a statement about set union.
//
// === 5. COMPOUNDING: DOES THE EXCESS GROW WHEN MANY BLOCKS MERGE? ====
// Every set partition of the nine-prime pool, grouped by number of parts. For each
// k, the BEST floor any k-part partition can give, against the true L of the union.
//   total set partitions: 21147 (Bell(9)).  L(union) = 64.
//   parts k   partitions   best floor sum L(P_i)   floor/L(union)   interaction share
//   1         1            64                     1.000            0.000
//   2         255          53                     0.828            0.172
//   3         3025         41                     0.641            0.359
//   4         7770         37                     0.578            0.422
//   5         6951         28                     0.438            0.563
//   6         2646         18                     0.281            0.719
//   7         462          15                     0.234            0.766
//   8         36           11                     0.172            0.828
//   9         1            9                      0.141            0.859
//
//   The floor DEGRADES monotonically as the partition gets finer, so the excess
//   COMPOUNDS: it does not saturate. At the finest partition (nine singletons)
//   the floor is 9 against a truth of 64, i.e. 0.859 of L is pure interaction.
//
// === 6. THE LAW, AND THE COORDINATE IN WHICH CHRIS IS RIGHT ===========
// mbar(P) = prod_{p in P} p/(p-2) is the mean spacing of the survivors of P, and it
// is exactly MULTIPLICATIVE over a disjoint union. Measure r(P) = (L(P)+1)/mbar(P):
//   |P|   subsets   r min    r max    r mean
//   1     9         1.20     1.87     1.67
//   2     36        2.14     4.35     3.50
//   3     84        3.46     4.77     4.12
//   4     126       4.01     6.40     4.95
//   5     126       4.94     6.94     5.85
//   6     84        5.65     8.37     7.15
//   7     36        7.63     9.52     8.45
//   8     9         9.79     11.19    10.68
//   9     1         12.11    12.11    12.11
//
//   r grows roughly LINEARLY in |P| while mbar grows MULTIPLICATIVELY. So the law is
//     L(P u Q) + 1  ~  mbar(P) * mbar(Q) * r(|P| + |Q|)
//   and merging MULTIPLIES the mean spacings while only ADDING the r factors.
//   That is why the additive floor is beaten so badly, and it is also the defect:
//   against the natural CRT/multiplicative baseline (L(P)+1)(L(Q)+1), which assumes
//   the r factors multiply too, the merge FALLS SHORT.
//
//   multiplicative ratio (L(PuQ)+1) / ((L(P)+1)(L(Q)+1)) over 9330 disjoint pairs:
//     min 0.264   mean 0.504   max 1.346
//     pairs with ratio > 1 (super-MULTIPLICATIVE) ............ 116  (1.2%)
//     of those, with both parts of size >= 2 ................. 0
//
//   SO CHRIS IS RIGHT IN THE MULTIPLICATIVE COORDINATE AND WRONG IN THE ADDITIVE
//   ONE HE NAMED. "The combined set does less than you would expect" is a true
//   statement about (L+1)(L'+1); it is a false statement about L + L'.
//
// === 7. THE TILE COORDINATE, WHERE PHASES REALLY CAN FAIL TO LINE UP ==
// The corpus L is a BLOCK L: runs of consecutive T_5 slots, not consecutive
// integers. There the concatenation argument is not free, because the slot after a
// run sits at a phase the first run DICTATES. Measured exactly, over one full
// period per instance, for every non-empty subset of block 1 = {7,11,13,17,19,23}.
// 63 sub-blocks solved exactly over their own full periods in 0.9 s
//
// cross-check against block-L-first-dead.js section 5 (its "truth" column):
//   7,11,13,17                truth here 10    corpus 10    AGREE
//   7,11,17,19                truth here 12    corpus 12    AGREE
//   11,13,17,19               truth here 7     corpus 7     AGREE
//   7,11,13,17,19             truth here 14    corpus 14    AGREE
//   11,17,19,23               truth here 6     corpus 6     AGREE
//   13,17,19,23               truth here 6     corpus 6     AGREE
//   11,13,17,19,23            truth here 9     corpus 9     AGREE
//   7,11,13,17,19,23          truth here 19    corpus 19    AGREE
//
// PHASE-AWARE CONCATENATION [PROVEN in this coordinate]. Translating P's classes by
// a multiple of 30 moves its run to any slot index of the SAME phase (30 is a unit
// mod every block prime), and a prefix of a run of length x is a run of any length
// x' <= x. So for disjoint P, Q:
//    lblock(P u Q) >= max over f, over x' <= lP(f), of  x' + lQ((f + x') mod 3).
// The NAIVE form lP_max + lQ_max is NOT proven: the phase P leaves may not be one
// where Q attains its own maximum.
//
// disjoint sub-block pairs inside block 1 ................ 301
// violations of the PROVEN phase-aware floor ............. 0
// violations of the NAIVE floor lP_max + lQ_max .......... 0   [MEASURED true, not proven]
// pairs where the naive floor EXCEEDS the proven one ..... 18
// excess above the naive floor:        min 0  mean 3.16  max 10
// excess above the proven phase floor: min 0  mean 3.22  max 10
//
// So even in the coordinate where phase alignment is a real constraint, merging is
// super-additive at every one of the 301 pairs, and the phase cost is at most a
// couple of slots. Chris's intuition fails here too.
//
// === 8. THE PRICE AGAINST 529 =======================================
// The p^2-rule threshold at x = 23 is 23^2 = 529, and a block-1 bound lblock <= B
// gives G2(23#) <= maxsum_{B+1}(T_5). The largest B that clears 529 is B = 51
// (maxsum_52 = 522 <= 529 < 534 = maxsum_53).
// Current bound 62 gives 630; the truth 19 gives 204.
//
// WHAT SUPER-ADDITIVITY DOES TO THE MERGE ROUTE.
//   (i) It KILLS the upper-bound-by-splitting family outright. If L were
//       sub-additive, bounding each sub-block and adding would bound the union,
//       and 63 exact sub-block bounds would be a cheap road to a small B. The
//       inequality runs the other way, so splitting produces only FLOORS.
//   (ii) The floors it does produce are far below the requirement, so it is not an
//       obstruction either. Best two-part floor inside block 1, exactly:
//       {13} + {7,11,17,19,23} = 1 + 14 = 15
//       against the truth 19, the current bound 62, and the requirement 51.
//       15 <= 51, so nothing here forbids the requirement; nothing here reaches it.
//   (iii) The compounding in section 5 says the gap between any floor and the truth
//       GROWS with the number of parts. A many-block merge is the WORST case for
//       the floor, not the best. There is no k at which the floor saturates onto L.
//
// NOT A REVIVAL OF THE SQUARING LADDER. The v -> v^2 ladder and the "block as a
// set" family were closed on 2026-08-18 (attack-block-00-ADJUDICATION.md,
// attack-block-01..10). Those asked whether a block bound at v LIFTS to v^2. This
// asks how L behaves under a DISJOINT UNION of prime sets at one level, and the
// answer is a one-line inequality in the opposite direction to the one a lift
// would need. If anything it is a further reason the ladder cannot be revived:
// the merge direction is super-additive, so it never contracts.
// ============================================================================
// READINGS
// ============================================================================
// 1. THE ANSWER IS NO, AND IT IS A THEOREM RATHER THAN A MEASUREMENT.
//    For DISJOINT prime sets, L(P u Q) >= L(P) + L(Q). One line: a_p is free,
//    so a cover is translation invariant; translate Q's cover by t = L(P) and
//    lay it end to end with P's. Disjointness is the entire hypothesis — it is
//    what lets the two assignments hold different translations at once. So
//    L(P u Q) < L(P) + L(Q) is IMPOSSIBLE. The census confirms it with nothing
//    to spare: over 9330 disjoint pairs from the nine-prime pool, 0 are
//    sub-additive, 398 are exactly additive and 8932 are strictly super-additive,
//    mean Delta +10.516, max +44. Chris's intuition, read literally, is wrong.
//
// 2. THE HONEST BASELINE IS A FLOOR, NOT A TARGET. The brief asked whether the
//    right comparison is a concatenation bound and whether CRT decides it. The
//    concatenation bound IS the right object and it is a LOWER bound; and no CRT
//    is needed for it, because disjoint prime sets touch disjoint coordinates
//    and there is nothing to reconcile. CRT is what licenses the free-translate
//    model itself, not the merge. The floor is exactly met 398 times out of
//    9330, and every one of those is a small-set case: with both parts of size
//    >= 3 the count of exact equality is 0.
//
// 3. WHERE THE INTUITION IS ACTUALLY RIGHT, AND IT IS WORTH MORE THAN THE
//    REFUTATION. Drop disjointness and the sign flips. Over 120,975 overlapping
//    pairs, 38.5% are sub-additive, and the deficit is monotone in the number of
//    SHARED primes: mean Delta +8.21, +5.83, +2.48, -2.31, -8.96, -18.06,
//    -30.58, -47.00 at |P n Q| = 1..8, with the sub-additive share running
//    0.177, 0.297, 0.466, 0.643, 0.863, 0.983, 1.000, 1.000. It crosses zero at
//    an overlap of four primes out of nine. The degenerate case Q = P is
//    sub-additive by a clean factor of two. So the instinct is a correct
//    instinct about PRIME REUSE — one prime cannot hold two phases at once —
//    filed under set union, where it does not hold.
//
// 4. THE LAW. mbar(P) = prod p/(p-2) is exactly multiplicative over a disjoint
//    union; the residual r(P) = (L(P)+1)/mbar(P) is not. Measured over all 511
//    subsets, mean r runs 1.67, 3.50, 4.12, 4.95, 5.85, 7.15, 8.45, 10.68, 12.11
//    at |P| = 1..9 — roughly LINEAR in |P| where mbar is multiplicative. So
//      L(P u Q) + 1  ~  mbar(P) mbar(Q) r(|P| + |Q|):
//    merging MULTIPLIES the spacings and only ADDS the residuals. That is both
//    why the additive floor is beaten so badly and where the defect sits.
//
// 5. SUPER-ADDITIVE BUT SUB-MULTIPLICATIVE, AND THAT IS CHRIS'S COORDINATE.
//    Against the natural CRT-flavoured baseline (L(P)+1)(L(Q)+1), the merge
//    ratio has min 0.264, mean 0.504, max 1.346, and only 116 of 9330 pairs
//    (1.2%) exceed 1 — none of them with both parts of size >= 2. So "the
//    combined set does less than you would expect" is TRUE of the multiplicative
//    baseline and FALSE of the additive one he named. That is the steelman, and
//    it survives.
//
// 6. THE DEFECT COMPOUNDS; IT DOES NOT SATURATE. Over all 21,147 set partitions
//    of the pool, the best floor a k-part partition can give falls monotonically
//    — 64, 53, 41, 37, 28, 18, 15, 11, 9 at k = 1..9 against a truth of 64 — so
//    the interaction share rises 0.000, 0.172, 0.359, 0.422, 0.563, 0.719,
//    0.766, 0.828, 0.859. A many-block merge is the WORST case for the floor,
//    not the best. There is no k at which the floor climbs back onto L.
//
// 7. THE TILE COORDINATE, WHERE PHASE ALIGNMENT IS A REAL CONSTRAINT, AGREES.
//    Translating by a multiple of 30 moves a block run to any slot of the SAME
//    phase, and prefixes give every shorter length, so the PROVEN floor there is
//    max over f and x' <= lP(f) of x' + lQ((f+x') mod 3). Over all 301 disjoint
//    sub-block pairs inside block 1 there are 0 violations of that floor and 0
//    of the naive lP_max + lQ_max (naive is MEASURED true, not proven; it
//    exceeds the proven floor in 18 pairs). Excess above the naive floor: mean
//    3.16, max 10. Phase misalignment costs a couple of slots and never reverses
//    the sign.
//
// 8. WHAT IT MEANS FOR 529. The largest block-1 bound that clears 23^2 = 529 is
//    B = 51 (maxsum_52 = 522 <= 529 < 534); the standing bound 62 gives 630 and
//    the truth 19 gives 204. Super-additivity KILLS the upper-bound-by-splitting
//    family: bounding sub-blocks and adding produces floors, never ceilings, so
//    the 63 exact sub-block truths cannot be assembled into a bound. It is not
//    an obstruction either — the best two-part floor inside block 1 is
//    {13} + {7,11,17,19,23} = 1 + 14 = 15, far under both the truth 19 and the
//    requirement 51. Merging is not a route to 529 in either direction.
//
// 9. THE ENGINE IS VALIDATED FOUR WAYS AND ITS RANGE IS STATED. It is a
//    complete DFS, so "infeasible" is a proof and not a search failure; the only
//    pruning is a valid capacity bound. (a) Literal brute force over every phase
//    vector agrees at {5,7}, {5,7,11}, {5,7,11,13}, {7,11,13,17} — 4/4. (b) The
//    {5,7,11} feasible set is exactly 1..9, reproducing sift-limit-attack.md
//    section 7a. (c) L(primes <= x) + 1 equals the exact G2 ladder of
//    exact-g2-ladder.js at all nine levels x = 2..23, up to 203 + 1 = 204 — so
//    the free translate buys NOTHING over the pinned {0,-2} pair anywhere we can
//    reach, which is a fact about units.js section 5 that was not on record.
//    (d) Eight T_5 sub-block truths reproduce block-L-first-dead.js section 5.
//    RANGE: exhaustive to nine primes (511 subsets, 7.1 s); a tenth prime costs
//    about an order of magnitude. Downward closure re-verified per L, each L its
//    own exact call, probed six past the first failure: 0 revivals over 8 sets.
//    Nothing here is bisected on a greedy.
//
// 10. NOT A REVIVAL OF THE SQUARING LADDER. The v -> v^2 ladder and the "block
//    as a set" family were closed on 2026-08-18. Those ask whether a bound at v
//    LIFTS to v^2 — a claim about reusing the same structure at a larger scale.
//    This asks how L behaves under a DISJOINT UNION at one level. The answer
//    runs opposite to what a lift needs, and reading 3 says why the ladder was
//    always going to be hard: a ladder step REUSES primes, and prime reuse is
//    exactly the regime where the deficit is real.
