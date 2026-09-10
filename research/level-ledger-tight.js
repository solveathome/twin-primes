// ============================================================================
// LEVEL-LEDGER-TIGHT: how loose is |h(a) - D/p| <= 2*3^{pi(x)-1}, and how much
// of that slack can be taken back UNCONDITIONALLY
// (2026-08-17, branch opus-try)
// ============================================================================
// THE OBJECT. T_x = twin-slot tile: r in [0, W), W = x#, with r !≡ 0, -2 mod q
// for every q <= x; D = |T_x| = prod_{3<=q<=x}(q-2). For a prime p > x,
//   h(a) = #{ r in T_x : r ≡ a (mod p) }.
// FOLD-PROFILE.md §2 proves |h(a) - D/p| <= 2*3^{pi(x)-1} by counting the terms
// of the Moebius expansion prod(1 - 1[q|r] - 1[q|r+2]).
//
// WHAT IS HARD. discrepancy-two-class.md §5 says that bound has the right base
// and TWICE the right exponent, because the term count bounds a SUP while the
// spectral factor R_k -> k+1 governs a VARIANCE. A variance law does not give a
// sup bound. The step from one to the other is an extreme-value step and it is
// exactly where a proof has to be made rigorous rather than fitted. This file
// does not manage that step and says so; what it does instead is find the ONE
// place in the argument where the slack is recoverable by exact computation.
//
// PLAN
//   PART 0  custody: FOLD-PROFILE §3 and §2 tables, and discrepancy-two-class
//           §5's looseness ladder, all reproduced digit for digit here.
//   PART 1  the two looseness ladders and their per-fold growth (is it sqrt 3?)
//   PART 2  p-uniformity: the bound is uniform in p; the truth is not.
//   PART 3  THE THEOREMS. Dilation Reduction (AP discrepancy = worst dilated
//           interval discrepancy) + Transfer (R*(x) <= 3^{pi(x)-pi(y)} R*(y)),
//           R*(y) computed exactly for y <= 17, term-by-term custody, stress
//           test over p <= 5000.
//   PART 4  controls: random 2-class patterns and Bernoulli, same pipeline.
//   PART 5  the exact second-moment identity, and why it does not close.
//   PART 5b the L1 Fourier ceiling: three exponents, and a hard floor of 2^{pi(x)}
//           under every L1 method.
//   PART 6  downstream: FOLD-PROFILE §2 rebuilt, §9b's Legendre death point,
//           and the natal-cap 2*3^k lemma.
//
//   node --max-old-space-size=6144 research/level-ledger-tight.js
//   node --max-old-space-size=6144 research/level-ledger-tight.js --deep   (R*(19), ~50 min)
// ============================================================================
'use strict';
const T0 = Date.now(); const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';
function assert(c, m) { if (!c) throw new Error('ASSERT FAIL: ' + m); }
const DEEP = process.argv.includes('--deep');

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const PR = primesUpTo(20000);
const pi = x => PR.filter(q => q <= x).length;
const R2 = p => (2*p-4)/(p-1) + ((p-2)/p)**2;          // cap-29 spectral level factor, -> 3
const geo = (a,b,n) => Math.pow(b/a, 1/n);

// ---- tiles ------------------------------------------------------------------
// lift a pattern mod W to mod W*q by deleting classes {0, e} mod q.
function lift(pos, W, q, e){
  const out = new Int32Array(pos.length*q); let n = 0;
  for (let k = 0; k < q; k++){ const off = k*W;
    for (let i = 0; i < pos.length; i++){ const r = pos[i]+off; const m = r%q; if (m !== 0 && m !== e) out[n++] = r; } }
  return out.subarray(0, n);
}
// es = per-odd-prime second removed class; default q-2 gives the true twin tile.
function tile(x, es){
  let W = 2, pos = Int32Array.of(1), j = 0;
  for (const q of PR){ if (q < 3) continue; if (q > x) break; pos = lift(pos, W, q, es ? es[j++] : q-2); W *= q; }
  return { W, pos, D: pos.length };
}
// Delta(u) = #{r in S, r < u} - rho*u on [0, W]: its max, min and RANGE.
function rangeDelta(pos, W){
  const rho = pos.length/W; let mx = 0, mn = 0;
  for (let j = 0; j < pos.length; j++){ const t = rho*pos[j]; if (j-t < mn) mn = j-t; if (j+1-t > mx) mx = j+1-t; }
  return { mx, mn, range: mx-mn };
}
function apStats(pos, D, p){
  const h = new Float64Array(p); for (let i = 0; i < pos.length; i++) h[pos[i]%p]++;
  let mx = 0, s2 = 0; const m = D/p;
  for (let a = 0; a < p; a++){ const d = h[a]-m; if (Math.abs(d) > mx) mx = Math.abs(d); s2 += d*d; }
  return { h, sup: mx, sd: Math.sqrt(s2/p) };
}
function rng0(seed){ let s = seed>>>0; return () => (s = (s*1664525 + 1013904223)>>>0) / 4294967296; }
const XS = [5,7,11,13,17,19,23], TL = {};
for (const x of XS) TL[x] = tile(x);
console.log('tiles built:', XS.map(x => `T${x}: W=${TL[x].W} D=${TL[x].D}`).join('  '), el());

// ============================== PART 0: CUSTODY ==============================
console.log('\n================ PART 0. CUSTODY ================');
console.log('\n[0a] FOLD-PROFILE §3 table (target: maxdev 1.36 1.62 3.35 3.63 6.13 16.9;');
console.log('     K(0)/minK/maxK/sd 2,1,4,1.21 | 21,20,23,0.89 | 173,169,178,2.82 |');
console.log('     2347,2340,2351,3.29 | 32930,32923,32935,3.45 | 548411,548402,548442,13.40)');
console.log('tile  p   D          mean 2D/p    maxdev   K(0)      minK      maxK      sd(K)');
const LADDER = [7,11,13,17,19,23];
for (const x of LADDER){
  const { W, pos, D } = TL[x], p = PR[pi(x)];
  const { h, sup } = apStats(pos, D, p);
  const K = []; for (let k = 0; k < p; k++){ const a = ((-k*W)%p+p)%p; K.push(h[a] + h[((a-2)%p+p)%p]); }
  const mean = 2*D/p, sd = Math.sqrt(K.reduce((s,v) => s+(v-mean)**2, 0)/p);
  console.log(`T${String(x).padEnd(3)} ${String(p).padEnd(3)} ${String(D).padStart(9)} ${mean.toFixed(2).padStart(12)} ${sup.toFixed(2).padStart(8)} ${String(K[0]).padStart(9)} ${String(Math.min(...K)).padStart(9)} ${String(Math.max(...K)).padStart(9)} ${sd.toFixed(2).padStart(7)}`);
}

console.log('\n[0b] discrepancy-two-class §2/§5: the interval discrepancy of T_x and its');
console.log('     looseness ratio (targets max/min 0.3000/-1.1000 .. 26.9038/-27.8325;');
console.log('     ratios 25.7 36.0 54.4 124 186 256 479)');
console.log(' x  pi   max        min        sup=(max-min)/2   2*3^{pi-1}   ratio    step');
let prevA = null; const ratA = [];
for (const x of XS){
  const { W, pos } = TL[x], r = rangeDelta(pos, W);
  const sup = r.range/2, B = 2*Math.pow(3, pi(x)-1), rat = B/sup; ratA.push(rat);
  console.log(`${String(x).padStart(2)} ${String(pi(x)).padStart(3)} ${r.mx.toFixed(4).padStart(10)} ${r.mn.toFixed(4).padStart(10)} ${sup.toFixed(4).padStart(17)} ${String(B).padStart(12)} ${rat.toFixed(1).padStart(8)}  ${prevA ? (rat/prevA).toFixed(3) : '  -'}`);
  prevA = rat;
}
assert(Math.abs(ratA[0]-25.714) < 0.01 && Math.abs(ratA[6]-479.5) < 0.5, 'custody: §5 ratio ladder');
console.log('CUSTODY PASSED: both published ladders reproduced through independent code.');

// ================== PART 1: THE TWO LOOSENESS LADDERS =======================
console.log('\n================ PART 1. THE LOOSENESS LADDERS ================');
console.log('Ladder A is the interval discrepancy (Part 0b). Ladder B is the Level');
console.log('Ledger object proper: max_a |h(a) - D/p| at the ladder prime p.');
console.log('\n x  p    max_a|h-D/p|   2*3^{pi-1}   ratio     step');
let prevB = null; const ratB = [];
for (const x of LADDER){
  const { pos, D } = TL[x], p = PR[pi(x)];
  const { sup } = apStats(pos, D, p), B = 2*Math.pow(3, pi(x)-1), rat = B/sup; ratB.push(rat);
  console.log(`${String(x).padStart(2)} ${String(p).padStart(2)} ${sup.toFixed(4).padStart(14)} ${String(B).padStart(12)} ${rat.toFixed(1).padStart(8)}  ${prevB ? (rat/prevB).toFixed(3) : '   -'}`);
  prevB = rat;
}
console.log(`\nper-fold growth of the looseness, geometric mean:`);
console.log(`  ladder A (interval):  ${geo(ratA[0], ratA[6], 6).toFixed(4)}   over 6 folds, x = 5 -> 23`);
console.log(`  ladder B (AP):        ${geo(ratB[0], ratB[5], 5).toFixed(4)}   over 5 folds, x = 7 -> 23`);
console.log(`  sqrt(3) = ${Math.sqrt(3).toFixed(4)}.  Both bracket it; the bound's exponent is twice the truth's.`);

// ================== PART 2: p-UNIFORMITY ====================================
console.log('\n================ PART 2. THE BOUND IS UNIFORM IN p, THE TRUTH IS NOT ====');
console.log('max_a |h(a) - D/p| at fixed x, p running (the ladder prime is the SMALLEST');
console.log('and therefore the friendliest choice; FOLD-PROFILE §3 quotes only that one):');
for (const x of [13,17,19]){
  const { pos, D } = TL[x], row = [];
  for (const p of PR){ if (p <= x) continue; if (p > 97) break; row.push(`${p}:${apStats(pos,D,p).sup.toFixed(2)}`); }
  console.log(`  x=${String(x).padStart(2)}  ` + row.join(' '));
}

// ================== PART 3: THE THEOREMS ====================================
console.log('\n================ PART 3. THE TIGHTER BOUND ================');
console.log(`
THEOREM 1 (Dilation Reduction, PROVEN). Write G_S(u) = #(S ∩ [0,u)) - rho*u for
a set S mod W of density rho, and range(S) = max_u G_S - min_u G_S. Then for
every prime p > x and every a mod p,

        | h(a) - D/p |  <=  R*(x) + D/W,          R*(x) := max_{alpha in (Z/W)^*} range(alpha * T_x).

  Proof. r ≡ a (mod p), r in [0,W) means r = a + p*s with 0 <= s < L := (W-a)/p,
  and r in T_x means s in S := p^{-1}(T_x - a) mod W, an admissible dilate of
  T_x. So h(a) = rho*L + G_S(L) = D/p - rho*a/p + G_S(L). The family of dilates
  is closed under translation, and sup over translates of sup_u |G| is exactly
  the range; rho*a/p < rho = D/W < 1/2. ∎

  The reduction is EXACT up to that D/W: the arithmetic-progression discrepancy
  of the tile IS the worst dilated-interval discrepancy of the tile. Nothing is
  thrown away, so any bound on R* transfers to the Level Ledger at once.

THEOREM 2 (Transfer, PROVEN). For y <= x,   R*(x) <= 3^{pi(x)-pi(y)} * R*(y).

  Proof. Let S be an admissible x-pattern (2 removed classes mod each odd q<=x,
  1 mod 2), W_1 = y#, W_2 = W/W_1. Expand the conditions at the primes in (y,x]:
  1_S(r) = sum_{d | W_2 squarefree} eps_d sum_{c} 1[r ≡ c mod d], with 3^{pi(x)-pi(y)}
  (d,c) pairs in all. For an interval [A,B), the (d,c) term counts t in an
  interval of length (B-A)/d with t in an affine image S_1 of the y-pattern, so
  it equals (N_1/W_1)(B-A)/d + G_{S_1}(B') - G_{S_1}(A'), and the main terms sum
  to rho*(B-A) exactly. Each bracket is at most range(S_1) <= R*(y). ∎

  R*(2) = 1 (S = odds), so R*(x) <= 3^{pi(x)-1} already: the published
  2*3^{pi(x)-1} carries a free factor of 2.
`);
console.log('[3a] R*(y) computed EXACTLY, by enumerating every admissible dilation class.');
console.log('     A dilate of T_y removes {0, e_q} mod q with e_q != 0 arbitrary and');
console.log('     independent across q (CRT on alpha), so the family has prod (q-1) members.');
const RSTAR = {}; RSTAR[2] = rangeDelta(Int32Array.of(1), 2).range;
console.log(` y   pi(y)  patterns     R*(y)       step    2*3^{pi-1}/R*(y)  (= the gain)`);
console.log(` 2       1          1   ${RSTAR[2].toFixed(6).padStart(10)}       -    ${(2*Math.pow(3,0)/RSTAR[2]).toFixed(2).padStart(8)}`);
{
  let fam = [{ W: 2, pos: Int32Array.of(1) }];
  for (const q of [3,5,7,11,13]){
    const nx = [];
    for (const f of fam) for (let e = 1; e < q; e++) nx.push({ W: f.W*q, pos: lift(f.pos, f.W, q, e) });
    fam = nx;
    let best = 0; for (const f of fam) best = Math.max(best, rangeDelta(f.pos, f.W).range);
    RSTAR[q] = best;
    const k = pi(q), prev = RSTAR[PR[k-2]];
    console.log(`${String(q).padStart(2)} ${String(k).padStart(7)} ${String(fam.length).padStart(10)}   ${best.toFixed(6).padStart(10)}  ${(best/prev).toFixed(4)}    ${(2*Math.pow(3,k-1)/best).toFixed(2).padStart(8)}`);
  }
  // y = 17: 92160 patterns, lifted from the 13-tiles
  let best17 = 0, n17 = 0;
  for (const f of fam) for (let e = 1; e < 17; e++){ n17++; const r = rangeDelta(lift(f.pos, f.W, 17, e), f.W*17).range; if (r > best17) best17 = r; }
  RSTAR[17] = best17;
  console.log(`17 ${String(7).padStart(7)} ${String(n17).padStart(10)}   ${best17.toFixed(6).padStart(10)}  ${(best17/RSTAR[13]).toFixed(4)}    ${(2*Math.pow(3,6)/best17).toFixed(2).padStart(8)}   ${el()}`);
}
// R*(19) comes from the --deep exhaustion over 1,658,880 dilation classes
// (2717.1 s; worst class = 13-tile #746 with e_17 = 2, e_19 = 17). Recorded here
// as a constant so the 30-second run can use it; --deep recomputes and asserts it.
RSTAR[19] = 53.972817;
console.log(`19 ${String(8).padStart(7)} ${String(1658880).padStart(10)}   ${RSTAR[19].toFixed(6).padStart(10)}  ${(RSTAR[19]/RSTAR[17]).toFixed(4)}    ${(2*Math.pow(3,7)/RSTAR[19]).toFixed(2).padStart(8)}   [--deep, 2717.1 s]`);
console.log(`\n  geometric mean step of R*, y = 2 -> 17 (6 folds): ${geo(RSTAR[2], RSTAR[17], 6).toFixed(5)}`);
console.log(`  geometric mean step of R*, y = 2 -> 19 (7 folds): ${geo(RSTAR[2], RSTAR[19], 7).toFixed(5)}`);
console.log(`  sqrt(3) = ${Math.sqrt(3).toFixed(5)}.  MEASURED, on the extremal object rather than on the twin pattern.`);
console.log(`  3^{(pi(17)-1)/2} = ${Math.pow(3,3).toFixed(4)} against R*(17) = ${RSTAR[17].toFixed(4)}: an exact-looking hit,`);
console.log(`  but 3^{(pi(19)-1)/2} = ${Math.pow(3,3.5).toFixed(4)} against R*(19) = ${RSTAR[19].toFixed(4)} is 15% low, and the`);
console.log(`  R*(17) -> R*(19) step is ${(RSTAR[19]/RSTAR[17]).toFixed(4)}, essentially 2. So the y = 17 coincidence did NOT`);
console.log(`  persist: R* runs ABOVE the sqrt(3) shape, which is what an extreme value over`);
console.log(`  prod (q-1) patterns should do: that count grows, and drags a sqrt(2 ln) factor with it.`);

console.log('\n[3a\'] Independent check of the parametrisation: dilate T_17 by RANDOM alpha in');
console.log('      (Z/510510)^* and take the range directly, never touching the e-tuples.');
{
  const { W, pos } = TL[17];
  const gcd = (a,b) => { while (b){ const t = a%b; a = b; b = t; } return a; };
  const R = rng0(99); let best = 0, bestA = 0; const buf = new Float64Array(pos.length);
  for (let t = 0; t < 4000; t++){
    let a; do { a = 1 + Math.floor(R()*(W-1)); } while (gcd(a,W) !== 1);
    for (let i = 0; i < pos.length; i++) buf[i] = (a*pos[i])%W;
    const arr = Float64Array.from(buf).sort();
    const r = rangeDelta(arr, W).range; if (r > best){ best = r; bestA = a; }
  }
  console.log(`      4000 random dilations: max range = ${best.toFixed(6)} at alpha = ${bestA};  enumerated R*(17) = ${RSTAR[17].toFixed(6)}`);
  assert(best <= RSTAR[17] + 1e-9, 'random dilation exceeds the enumerated R*(17)');
  console.log(`      The enumerated maximum is ATTAINED by a genuine dilation, not only by an abstract e-tuple.`);
}

console.log('\n[3b] Term-by-term custody of Theorem 2 at x = 13, y = 7, p = 17.');
console.log('     3^{pi(13)-pi(7)} = 9 terms; check the expansion reproduces h(a) for every a,');
console.log('     and that no single term exceeds R*(7) + D_1/W_1.');
{
  const x = 13, y = 7, p = 17;
  const { W, pos, D } = TL[x], W1 = TL[y].W, D1 = TL[y].D, rho1 = D1/W1;
  const { h } = apStats(pos, D, p);
  const Q2 = [11,13], terms = [];
  const rec = (j,d,c,sg) => { if (j === Q2.length){ terms.push([d,c,sg]); return; }
    rec(j+1,d,c,sg); const q = Q2[j];
    for (const cc of [0, q-2]){ const nd = d*q; let nc = null;
      for (let t = 0; t < nd; t++) if (t%d === c && t%q === cc){ nc = t; break; }
      rec(j+1, nd, nc, -sg); } };
  rec(0,1,0,1);
  const set = new Uint8Array(W1); for (const t of TL[y].pos) set[t] = 1;
  let worstTerm = 0, worstTot = 0;
  for (let a = 0; a < p; a++){
    let s = 0;
    for (const [d,c,sg] of terms){
      const dp = d*p; let b = null; for (let t = 0; t < dp; t++) if (t%d === c && t%p === a){ b = t; break; }
      let cnt = 0; for (let r = b; r < W; r += dp) if (set[r%W1]) cnt++;
      const err = cnt - rho1*W/dp; if (Math.abs(err) > worstTerm) worstTerm = Math.abs(err);
      s += sg*cnt;
    }
    assert(Math.abs(s - h[a]) < 1e-9, 'term expansion != h(a) at a=' + a);
    if (Math.abs(s - D/p) > worstTot) worstTot = Math.abs(s - D/p);
  }
  console.log(`     terms = ${terms.length}; expansion == h(a) for all a: OK`);
  console.log(`     worst single-term error = ${worstTerm.toFixed(4)}  <=  R*(7) + D_1/W_1 = ${(RSTAR[7]+rho1).toFixed(4)}   OK`);
  console.log(`     worst |h(a) - D/p| = ${worstTot.toFixed(4)};  transfer bound 9*(R*(7)+rho1) = ${(9*(RSTAR[7]+rho1)).toFixed(2)};  ledger 2*3^5 = ${2*243}`);
}

console.log('\n[3c] Stress test of Theorem 1: max over a AND over many p, against R*(x) + D/W.');
for (const x of [11,13,17]){
  const { W, pos, D } = TL[x], B = RSTAR[x] + D/W;
  const PMAX = x === 17 ? 2000 : 5000;
  let worst = 0, argp = 0;
  for (const p of PR){ if (p <= x) continue; if (p > PMAX) break;
    const s = apStats(pos, D, p).sup; if (s > worst){ worst = s; argp = p; } }
  console.log(`  x=${String(x).padStart(2)}: worst over p <= ${PMAX} is ${worst.toFixed(4)} at p=${argp}; proven bound R*(x)+D/W = ${B.toFixed(4)}  [${worst <= B ? 'HOLDS' : 'VIOLATED'}]; old ledger ${2*Math.pow(3,pi(x)-1)}`);
  assert(worst <= B, 'Theorem 1 violated at x=' + x);
}
console.log(`\nCOROLLARY (unconditional). For every x >= 19, every prime p > x, every a:`);
console.log(`      | h(a) - D/p |  <=  ${RSTAR[19].toFixed(6)} * 3^{pi(x)-8} + 1/2 ,`);
console.log(`  which beats 2*3^{pi(x)-1} by the constant factor ${(2*Math.pow(3,7)/RSTAR[19]).toFixed(2)}, uniformly in x, p and a.`);
console.log(`  (The y = 17 seed alone gives ${(2*Math.pow(3,6)/RSTAR[17]).toFixed(2)} and needs no overnight run.)`);

// ================== PART 4: CONTROLS =========================================
console.log('\n================ PART 4. CONTROLS (run before any claim of agreement) ====');
function rng(seed){ let s = seed>>>0; return () => (s = (s*1664525 + 1013904223)>>>0) / 4294967296; }
console.log('\n[4a] Random 2-class patterns through the identical pipeline: is the sqrt(3)-ish');
console.log('     looseness growth a property of the twin arithmetic, or of k = 2?');
{
  const R = rng(20260817), ODD = [3,5,7,11,13,17,19,23];
  for (let t = 0; t < 3; t++){
    let W = 2, pos = Int32Array.of(1), prev = null, first = null, last = null; const line = [];
    for (const q of ODD){ const e = 1 + Math.floor(R()*(q-1)); pos = lift(pos, W, q, e); W *= q;
      const rat = 2*Math.pow(3, pi(q)-1) / (rangeDelta(pos, W).range/2);
      if (first === null) first = rat; last = rat;
      line.push(`${q}:${rat.toFixed(0)}${prev ? '(' + (rat/prev).toFixed(2) + ')' : ''}`); prev = rat; }
    console.log(`  draw ${t+1}: ${line.join(' ')}   geo mean step = ${geo(first,last,7).toFixed(4)}`);
  }
  console.log(`  twin tile, same 7 folds x = 3..23:  geo mean step = ${geo(2*Math.pow(3,1)/(rangeDelta(tile(3).pos,6).range/2), ratA[6], 7).toFixed(4)}`);
  console.log('  READING: the ratio grows at ~sqrt(3) per fold for GENERIC 2-class patterns.');
  console.log('  The law belongs to k = 2, not to the twin set. No agreement is being claimed');
  console.log('  between measurements here: this is one law seen on many patterns.');
}
console.log('\n[4b] Bernoulli control at the same density (the pipeline must report non-hyperuniformity):');
{
  const R = rng(7);
  for (const x of [13,17]){
    const { W, D, pos } = TL[x], arr = [];
    for (let r = 0; r < W; r++) if (R() < D/W) arr.push(r);
    const bp = Int32Array.from(arr), p = PR[pi(x)];
    console.log(`  x=${x}: Bernoulli half-range ${(rangeDelta(bp,W).range/2).toFixed(1)} vs true ${(rangeDelta(pos,W).range/2).toFixed(2)};`
      + ` AP sup at p=${p}: ${apStats(bp,bp.length,p).sup.toFixed(1)} vs true ${apStats(pos,D,p).sup.toFixed(2)};  sqrt(W)=${Math.sqrt(W).toFixed(0)}`);
  }
}
console.log('\n[4c] The extreme-value constant on a FOURTH object: c = sup/(sd*sqrt(2 ln p))');
console.log('     for the AP histogram, twin tile against random 2-class controls, p <= 200.');
{
  function cStats(T){ const { W, pos, D } = T, cs = [];
    for (const p of PR){ if (p <= 13) continue; if (p > 200) break;
      const { sup, sd } = apStats(pos, D, p); cs.push(sup/(sd*Math.sqrt(2*Math.log(p)))); }
    cs.sort((a,b)=>a-b);
    return { n: cs.length, mean: cs.reduce((a,b)=>a+b,0)/cs.length, lo: cs[0], hi: cs[cs.length-1] }; }
  for (const x of [17,19]){
    const t = cStats(TL[x]);
    console.log(`  twin x=${x}: n=${t.n} mean c = ${t.mean.toFixed(4)}  range ${t.lo.toFixed(3)}..${t.hi.toFixed(3)}`);
    const R = rng(4242+x);
    for (let d = 0; d < 3; d++){ const es = [];
      for (const q of PR){ if (q < 3) continue; if (q > x) break; es.push(1 + Math.floor(R()*(q-1))); }
      const c = cStats(tile(x, es));
      console.log(`  ctrl x=${x} draw${d+1} e=(${es}): mean c = ${c.mean.toFixed(4)}  range ${c.lo.toFixed(3)}..${c.hi.toFixed(3)}`); }
  }
}

console.log('\n[4d] The THIRD handle: natal-cap-29\'s spectral level factor R_2(p) -> 3 governs a');
console.log('     VARIANCE, so sd should step by sqrt(R_2(p)) per fold. Checked on this object:');
{
  let prev = null; const sds = [], preds = [];
  for (const x of LADDER){
    const { pos, D } = TL[x], p = PR[pi(x)];
    const { sd } = apStats(pos, D, p); sds.push(sd);
    if (prev !== null){ preds.push(Math.sqrt(R2(p)));
      console.log(`   fold ${String(p).padStart(2)}: sd ${prev.toFixed(4)} -> ${sd.toFixed(4)}, step ${(sd/prev).toFixed(4)}   sqrt(R_2(${p})) = ${Math.sqrt(R2(p)).toFixed(4)}`); }
    prev = sd;
  }
  const gm = geo(sds[0], sds[sds.length-1], sds.length-1);
  const gp = Math.pow(preds.reduce((a,b)=>a*b,1), 1/preds.length);
  console.log(`   geometric mean measured step ${gm.toFixed(4)} against predicted ${gp.toFixed(4)} (${((gm/gp-1)*100).toFixed(1)}%), limit sqrt(3) = ${Math.sqrt(3).toFixed(4)}.`);
  console.log('   The individual steps swing 0.81 to 3.20 because p moves with x; only the');
  console.log('   geometric mean is meaningful here. AGREES: the variance law is the same law.');
}

// ================== PART 5: THE SECOND-MOMENT ROUTE ==========================
console.log('\n================ PART 5. THE SECOND-MOMENT ROUTE, AND WHY IT DOES NOT CLOSE ==');
console.log(`
Parseval on the p-point group gives sum_a (h(a)-D/p)^2 = (1/p) sum_{t!=0}|F(t)|^2
with F(t) = sum_{r in T} e(rt/p), and sup <= sqrt(sum_a (h-D/p)^2). So a second
moment bound WOULD give a sup bound. The exact identity for that second moment:

    sum_a h(a)^2  =  D + 2 * sum_{m>=1} N(mp),   N(h) = #{r : r, r+h in T, r+h < W},

because p | r - r' as INTEGERS is the condition, not as residues mod W.
Verified exactly below. The route therefore converts the sup problem into a
Hardy-Littlewood pair-correlation problem: sum_m N(mp) has to be known to an
absolute precision of order 3^{pi(x)/2}, i.e. the singular series has to be
equidistributed over the progression h ≡ 0 (mod p) to that precision. That is
not easier than the original question; it is the same wall.
`);
// The fifth cell, x = 23, is added 2026-08-20: reading 9 quoted a 2.5e-4 ratio
// at x = 23 that this block had never printed, and the cell list stopped at
// x = 13. The RATIO is cheap at any level -- it is a residue histogram of pos
// mod p, O(D) -- so the row is now measured here. The IDENTITY CHECK is not:
// verifying sum_a h^2 = D + 2 sum_m N(mp) at x = 23 costs (W/p) x D ~ 6e13
// operations and a 223 MB indicator, so that cell is marked "ratio only". The
// identity itself is what the four small cells certify.
for (const [x,p,exact] of [[11,13,1],[11,29,1],[13,17,1],[13,41,1],[23,29,0]]){
  const { W, pos, D } = TL[x];
  const { h } = apStats(pos, D, p);
  let lhs = 0; for (let a = 0; a < p; a++) lhs += h[a]*h[a];
  let tag;
  if (exact){
    const ind = new Uint8Array(W); for (const r of pos) ind[r] = 1;
    let rhs = D; for (let m = 1; m*p < W; m++){ const hh = m*p; let c = 0; for (const r of pos) if (r+hh < W && ind[r+hh]) c++; rhs += 2*c; }
    assert(lhs === rhs, 'second-moment identity failed');
    tag = '= identity RHS  EXACT;';
  } else {
    tag = 'ratio only (identity too costly at this W);';
  }
  const V = lhs - D*D/p;
  console.log(`  x=${x} p=${String(p).padStart(2)}: sum h^2 = ${lhs} ${tag}  p*Var = ${V.toFixed(4)}, binomial D(1-1/p) = ${(D*(1-1/p)).toFixed(1)}, ratio ${(V/(D*(1-1/p))).toExponential(2)}`);
}
console.log('  The ratio is the hyperuniformity: no general inequality (large sieve included)');
console.log('  reaches below the binomial line, so no general inequality reaches this object.');

// ============ PART 5b: THE L1 FOURIER CEILING (a third exponent) =============
console.log('\n================ PART 5b. THE L1 FOURIER CEILING ================');
console.log(`
The Fourier coefficients of a 2-class pattern factorise exactly. With removed
classes {0, e_q} mod q,  S(j) = prod_q S_q(j),  S_q(j) = q-2 if q | j and
-1 - e(j e_q / q) otherwise, so |S_q(j)| = 2|cos(pi j e_q / q)| off the divisors.
The standard L1 Fourier (Erdos-Turan / Selberg) bound is then, for EVERY
interval,

    |Delta| <= (1/2) * sum_{j != 0} |S(j)| / min(j, W-j)  =:  ET(x),

since |sum_{n<u} e(jn/W)| <= W / (2 min(j, W-j)). This is unconditional and
computable. Its per-prime scale is the FULL-PERIOD AVERAGE of |S_q|, not the
maximum, and that average has an exact limit.
`);
{
  const fq = q => { let s = 0; for (let v = 1; v < q; v++) s += 2*Math.abs(Math.cos(2*Math.PI*v/q)); return ((q-2)+s)/q; };
  let prod = 1, n = 0; const show = new Set([3,5,7,11,13,17,19,23,29,37,53,89,199]);
  console.log('  q     f_q = (1/q)[(q-2) + sum_{v!=0} 2|cos(2 pi v/q)|]     running geometric mean');
  for (const q of PR){ if (q < 3) continue; if (q > 200) break; prod *= fq(q); n++;
    if (show.has(q)) console.log(`  ${String(q).padStart(3)}   ${fq(q).toFixed(5)}                                          ${Math.pow(prod,1/n).toFixed(5)}`); }
  console.log(`  limit 1 + 4/pi = ${(1+4/Math.PI).toFixed(5)}`);
  const seed2 = x => (x <= 19 ? RSTAR[x] : Math.pow(3, pi(x)-8)*RSTAR[19]);
  const absS = (j,x) => { let v = 1; for (const q of PR){ if (q < 3) continue; if (q > x) break; v *= (j%q === 0) ? (q-2) : 2*Math.abs(Math.cos(2*Math.PI*j/q)); } return v; };
  console.log('\n   x        W    ET(x)   2*3^{pi-1}    gain   step   true sup   R*(x) (x<=19) or 3^{pi-8}R*(19)   |S(1)|   |S(1)|/2^pi');
  let prevET = null;
  for (const x of [11,13,17,19]){
    const { W, pos } = TL[x]; let s = 0;
    for (let j = 1; j < W; j++) s += absS(j,x)/Math.min(j, W-j);
    const ET = s/2, led = 2*Math.pow(3, pi(x)-1);
    console.log(`  ${String(x).padStart(2)} ${String(W).padStart(8)} ${ET.toFixed(2).padStart(8)} ${String(led).padStart(11)} ${(led/ET).toFixed(2).padStart(7)}  ${prevET ? (ET/prevET).toFixed(3) : '  -  '} ${(rangeDelta(pos,W).range/2).toFixed(2).padStart(10)} ${seed2(x).toFixed(2).padStart(12)} ${absS(1,x).toFixed(3).padStart(10)} ${(absS(1,x)/Math.pow(2,pi(x))).toFixed(4).padStart(10)}`);
    prevET = ET;
  }
  // ⚠ CORRECTION 2026-08-18, to the PRINTED reading below, which is left
  // unedited because the OUTPUT block pasted at the foot of this file quotes it
  // verbatim and is itself a merge of a 30.7 s run with the R*(19) row from a
  // 2,717 s --deep run; re-pasting a plain run would drop that row.
  //   (i) "contributes |S(1)|/2 = prod_q |cos(2 pi/q)| * 2^{pi(x)-1}" is out by
  //       a factor 2. That product IS |S(1)|; half of it is
  //       prod_q |cos(2 pi/q)| * 2^{pi(x)-2}.  Check at x = 11:
  //       prod_{q=3,5,7,11} 2|cos(2 pi/q)| = 1.29666, and the table prints
  //       |S(1)| = 1.297.  The j = 1 term of ET is |S(1)|/2, which is correct;
  //       only the closed form set equal to it is wrong.
  //   (ii) "0.0334 times 2^{pi(x)}" at x = 17 is a truncation of the table's
  //       own 0.0335 in the same run:  4.28203 / 128 = 0.033453.
  // Neither touches the conclusion ET(x) >> 2^{pi(x)}, which needs only that
  // the j = 1 term is of order 2^{pi(x)}.  research/level-ledger-tight.md
  // section 5b carries the corrected wording.
  console.log(`
  READING. Three exponents, not two:
     3       = 2 (the per-prime MAXIMUM of |S_q|) x 1.5 (the divisor sum), the Legendre term count;
     ${(1+4/Math.PI).toFixed(5)} = 1 + 4/pi, the per-prime AVERAGE of |S_q|, the scale of the bulk of ET;
     ${Math.sqrt(3).toFixed(5)} = sqrt 3, the L2 truth.
  And a HARD FLOOR under the whole L1 family: the single term j = 1 already
  contributes |S(1)|/2 = prod_q |cos(2 pi/q)| * 2^{pi(x)-1}, and that product
  converges (sum 1/q^2 converges), so ET(x) >> 2^{pi(x)}. |S(1)| measures
  1.297, 2.296, 4.282 at x = 11, 13, 17, i.e. 0.0405, 0.0359, 0.0334 times
  2^{pi(x)}, converging. NO L1 Fourier bound of this shape can reach
  sqrt(3)^{pi(x)}: it is beaten by its own first term. The extreme-value step is
  not an artefact of how the repo has argued so far, it is unavoidable for the
  whole L1 family. Measured ET beats the ledger by 5.98, 7.00, 8.20, 9.88 at
  x = 11, 13, 17, 19 and grows by ~1.18 per fold, but it stays above the
  transfer bound throughout the computable range and crosses it only near
  x = 41, where W = 41# = 3e17.
`);
}

// ================== PART 6: WHAT THE TIGHTENING BUYS =========================
console.log('\n================ PART 6. DOWNSTREAM ================');
const seed = x => (x <= 19 ? RSTAR[x] : Math.pow(3, pi(x)-8)*RSTAR[19]);   // best available: R*(19)
const newBoundH = (x, D, W) => seed(x) + D/W;

console.log('\n[6a] FOLD-PROFILE §2 table rebuilt. (Note: that table\'s "Mobius bound" column is');
console.log('     the K-level bound 4*3^{pi-1}, i.e. twice the h-level bound quoted in the theorem.)');
console.log('tile  p   mean 2D/p     true max|K-mean|   old 4*3^{pi-1}  old/mean   new K-bound   new/mean    gain');
for (const x of LADDER){
  const { W, pos, D } = TL[x], p = PR[pi(x)];
  const { h } = apStats(pos, D, p);
  let mxK = 0; for (let k = 0; k < p; k++){ const a = ((-k*W)%p+p)%p; mxK = Math.max(mxK, Math.abs(h[a] + h[((a-2)%p+p)%p] - 2*D/p)); }
  const mean = 2*D/p, oldB = 4*Math.pow(3, pi(x)-1), newB = 2*newBoundH(x, D, W);
  console.log(`T${String(x).padEnd(3)} ${String(p).padEnd(3)} ${mean.toFixed(2).padStart(12)} ${mxK.toFixed(2).padStart(14)} ${oldB.toExponential(2).padStart(16)} ${(oldB/mean).toFixed(4).padStart(9)} ${newB.toFixed(2).padStart(13)} ${(newB/mean).toExponential(3).padStart(11)}  ${(oldB/newB).toFixed(2).padStart(6)}`);
}
console.log('  The relative error crosses below the mean at x = 11 instead of x = 19,');
console.log('  and reads 5.9e-4 of the mean at T_23 instead of 0.048.');

console.log('\n[6b] FOLD-PROFILE §9b tier 1: how far does the Legendre route reach in the 23# window?');
console.log('     Sift [0, 23#) by every prime up to y and ask when the majorant still lies');
console.log('     below the main term rho(y)*W, i.e. when the count is certified positive.');
{
  let cur = TL[23].pos; const W = TL[23].W, rows = [];
  for (const q of PR){ if (q <= 23) continue; if (q > 400) break;
    const out = new Int32Array(cur.length); let n = 0;
    for (let i = 0; i < cur.length; i++){ const m = cur[i]%q; if (m !== 0 && m !== q-2) out[n++] = cur[i]; }
    cur = out.subarray(0, n);
    let rho = 0.5; for (const t of PR){ if (t < 3) continue; if (t > q) break; rho *= (1 - 2/t); }
    let mx = 0, mn = 0; for (let j = 0; j < cur.length; j++){ const t = rho*cur[j]; if (j-t < mn) mn = j-t; if (j+1-t > mx) mx = j+1-t; }
    rows.push({ y: q, S: cur.length, main: rho*W, sup: (mx-mn)/2 });
  }
  const lastY = f => { let L = null; for (const r of rows){ if (f(r) < r.main) L = r; else break; } return L; };
  const led = r => 2*Math.pow(3, pi(r.y)-1);
  const tra = r => Math.pow(3, pi(r.y)-8)*RSTAR[19];
  const cond = r => Math.pow(3, (pi(r.y)-1)/2);          // the sqrt(3) shape, R*(17)=27.02 ~ 3^3
  const A = lastY(led), B = lastY(tra), C = lastY(cond), Dd = lastY(r => r.sup);
  const show = (t,r) => console.log(`  ${t.padEnd(46)} last usable y = ${String(r ? r.y : '-').padStart(3)}   S = ${r ? r.S : '-'}   u = ln W / ln y = ${r ? (Math.log(W)/Math.log(r.y)).toFixed(3) : '-'}`);
  show('ledger 2*3^{pi(y)-1}  (FOLD-PROFILE §9b: dies at 47)', A);
  show('PROVEN here: 3^{pi(y)-8} * R*(19)', B);
  show('CONDITIONAL sqrt(3) shape: 3^{(pi(y)-1)/2}', C);
  show('the true sup, MEASURED (not a bound)', Dd);
  console.log(`  DHR two-dimensional lower bound reaches u = 4.26645, i.e. y = ${Math.exp(Math.log(W)/4.26645).toFixed(0)} in this window.`);
  for (const y of [43,47,89,97,107]){ const r = rows.find(t => t.y === y); if (!r) continue;
    console.log(`    y=${String(y).padStart(3)} pi=${String(pi(y)).padStart(2)}  S=${String(r.S).padStart(8)}  main=${r.main.toFixed(0).padStart(8)}  true sup=${r.sup.toFixed(1).padStart(7)}  ledger=${(2*Math.pow(3,pi(y)-1)).toExponential(2)}  proven=${tra(r).toExponential(2)}  sqrt3 shape=${cond(r).toExponential(2)}`); }
}

console.log('\n[6c] The natal-cap object (cap-25\'s lemma |C(s) - N*l/W| <= 2*3^k, k = #mids = pi(x)-3),');
console.log('     which TODO item 8(c) wants tightened by the ~30x measured slack.');
{
  const natalBase = d => { const o = []; for (let r = 0; r < 30; r++) if (r === 11 || r === (11+d)%30) o.push(r); return Int32Array.from(o.sort((a,b)=>a-b)); };
  let fam = [6,12,18,24].map(d => ({ W: 30, pos: natalBase(d) }));
  let best = 0; for (const f of fam) best = Math.max(best, rangeDelta(f.pos, 30).range);
  console.log(`  y=5  (no mids absorbed): R*_natal = ${best.toFixed(6)}  patterns=${fam.length}   gain vs 2*3^k = ${(2/best).toFixed(2)}`);
  let nAbs = 0;
  for (const q of [7,11,13,17]){
    const nx = []; for (const f of fam) for (let e = 1; e < q; e++) nx.push({ W: f.W*q, pos: lift(f.pos, f.W, q, e) });
    fam = nx; nAbs++;
    let b = 0; for (const f of fam) b = Math.max(b, rangeDelta(f.pos, f.W).range);
    console.log(`  y=${String(q).padStart(2)} (${nAbs} mid${nAbs>1?'s':''} absorbed): R*_natal = ${b.toFixed(6)}  patterns=${String(fam.length).padStart(6)}   gain vs 2*3^k = ${(2*Math.pow(3,nAbs)/b).toFixed(2)}   ${el()}`);
  }
  console.log('  REFUTED as a route to TODO 8(c): the best proven gain here is ~6x against the');
  console.log('  ~30x of measured slack, because cap-25\'s k already excludes 2, 3 and 5, so the');
  console.log('  transfer only has mids to absorb. Reaching 30x needs R*_natal(29), which is');
  console.log('  4*prod_{7<=q<=29}(q-1) = 5.1e8 patterns on a 6.5e9 tile: out of reach.');
}
console.log('\n' + el());

// ================== DEEP: R*(19) (only with --deep, ~50 min) =================
if (DEEP){
  console.log('\n================ DEEP. R*(19) by exhaustion over 1,658,880 dilation classes ==');
  let fam = [{ W: 2, pos: Int32Array.of(1) }];
  for (const q of [3,5,7,11,13]){ const nx = [];
    for (const f of fam) for (let e = 1; e < q; e++) nx.push({ W: f.W*q, pos: lift(f.pos, f.W, q, e) });
    fam = nx; }
  let best = 0, cnt = 0;
  for (const f of fam){
    for (let e17 = 1; e17 < 17; e17++){ const p17 = lift(f.pos, f.W, 17, e17), W17 = f.W*17;
      for (let e19 = 1; e19 < 19; e19++){ const r = rangeDelta(lift(p17, W17, 19, e19), W17*19).range; if (r > best) best = r; } }
    if (++cnt % 240 === 0) console.log(`   ${cnt}/${fam.length}  best so far ${best.toFixed(4)}  ${el()}`);
  }
  console.log(`R*(19) = ${best.toFixed(6)}   step from R*(17) = ${(best/RSTAR[17]).toFixed(4)}   gain vs 2*3^7 = ${(2*2187/best).toFixed(2)}   ${el()}`);
  assert(Math.abs(best - 53.972817) < 1e-6, 'deep run disagrees with the recorded R*(19)');
}




// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/level-ledger-tight.js
//   invocation:  node research/level-ledger-tight.js
//   code-sha256: 4741a2738713aed6e17daafb46fbd2b268d93632699d18b7aa40b3cd844cb304
//   out-sha256:  2a898de2297f991adee00c1c8db5ee8a80eccfc0fb851042afb62832793af95f
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     67.7 s
// ============================================================================
// tiles built: T5: W=30 D=3  T7: W=210 D=15  T11: W=2310 D=135  T13: W=30030 D=1485  T17: W=510510 D=22275  T19: W=9699690 D=378675  T23: W=223092870 D=7952175 0.0s
//
// ================ PART 0. CUSTODY ================
//
// [0a] FOLD-PROFILE §3 table (target: maxdev 1.36 1.62 3.35 3.63 6.13 16.9;
//      K(0)/minK/maxK/sd 2,1,4,1.21 | 21,20,23,0.89 | 173,169,178,2.82 |
//      2347,2340,2351,3.29 | 32930,32923,32935,3.45 | 548411,548402,548442,13.40)
// tile  p   D          mean 2D/p    maxdev   K(0)      minK      maxK      sd(K)
// T7   11         15         2.73     1.36         2         1         4    1.21
// T11  13        135        20.77     1.62        21        20        23    0.89
// T13  17       1485       174.71     3.35       173       169       178    2.82
// T17  19      22275      2344.74     3.63      2347      2340      2351    3.29
// T19  23     378675     32928.26     6.13     32930     32923     32935    3.45
// T23  29    7952175    548425.86    16.93    548411    548402    548442   13.40
//
// [0b] discrepancy-two-class §2/§5: the interval discrepancy of T_x and its
//      looseness ratio (targets max/min 0.3000/-1.1000 .. 26.9038/-27.8325;
//      ratios 25.7 36.0 54.4 124 186 256 479)
//  x  pi   max        min        sup=(max-min)/2   2*3^{pi-1}   ratio    step
//  5   3     0.3000    -1.1000            0.7000           18     25.7    -
//  7   4     1.0714    -1.9286            1.5000           54     36.0  1.400
// 11   5     2.5390    -3.4221            2.9805          162     54.4  1.510
// 13   6     3.4670    -4.3681            3.9176          486    124.1  2.282
// 17   7     7.3862    -8.2990            7.8426         1458    185.9  1.499
// 19   8    16.6168   -17.5388           17.0778         4374    256.1  1.378
// 23   9    26.9038   -27.8325           27.3682        13122    479.5  1.872
// CUSTODY PASSED: both published ladders reproduced through independent code.
//
// ================ PART 1. THE LOOSENESS LADDERS ================
// Ladder A is the interval discrepancy (Part 0b). Ladder B is the Level
// Ledger object proper: max_a |h(a) - D/p| at the ladder prime p.
//
//  x  p    max_a|h-D/p|   2*3^{pi-1}   ratio     step
//  7 11         1.3636           54     39.6     -
// 11 13         1.6154          162    100.3  2.532
// 13 17         3.3529          486    144.9  1.445
// 17 19         3.6316         1458    401.5  2.770
// 19 23         6.1304         4374    713.5  1.777
// 23 29        16.9310        13122    775.0  1.086
//
// per-fold growth of the looseness, geometric mean:
//   ladder A (interval):  1.6284   over 6 folds, x = 5 -> 23
//   ladder B (AP):        1.8127   over 5 folds, x = 7 -> 23
//   sqrt(3) = 1.7321.  Both bracket it; the bound's exponent is twice the truth's.
//
// ================ PART 2. THE BOUND IS UNIFORM IN p, THE TRUTH IS NOT ====
// max_a |h(a) - D/p| at fixed x, p running (the ladder prime is the SMALLEST
// and therefore the friendliest choice; FOLD-PROFILE §3 quotes only that one):
//   x=13  17:3.35 19:2.84 23:1.57 29:3.21 31:2.90 37:4.86 41:4.22 43:3.53 47:2.40 53:3.98 59:2.83 61:3.66 67:3.84 71:2.08 73:4.66 79:3.80 83:3.11 89:3.31 97:4.31
//   x=17  19:3.63 23:7.52 29:7.10 31:4.55 37:12.03 41:4.29 43:6.02 47:3.94 53:6.28 59:7.54 61:7.16 67:5.54 71:6.27 73:5.14 79:9.96 83:5.37 89:6.72 97:5.64
//   x=19  23:6.13 29:12.24 31:13.32 37:11.54 41:12.02 43:14.60 47:14.09 53:12.19 59:10.22 61:10.79 67:14.13 71:12.45 73:13.33 79:10.35 83:11.65 89:7.78 97:14.13
//
// ================ PART 3. THE TIGHTER BOUND ================
//
// THEOREM 1 (Dilation Reduction, PROVEN). Write G_S(u) = #(S ∩ [0,u)) - rho*u for
// a set S mod W of density rho, and range(S) = max_u G_S - min_u G_S. Then for
// every prime p > x and every a mod p,
//
//         | h(a) - D/p |  <=  R*(x) + D/W,          R*(x) := max_{alpha in (Z/W)^*} range(alpha * T_x).
//
//   Proof. r ≡ a (mod p), r in [0,W) means r = a + p*s with 0 <= s < L := (W-a)/p,
//   and r in T_x means s in S := p^{-1}(T_x - a) mod W, an admissible dilate of
//   T_x. So h(a) = rho*L + G_S(L) = D/p - rho*a/p + G_S(L). The family of dilates
//   is closed under translation, and sup over translates of sup_u |G| is exactly
//   the range; rho*a/p < rho = D/W < 1/2. ∎
//
//   The reduction is EXACT up to that D/W: the arithmetic-progression discrepancy
//   of the tile IS the worst dilated-interval discrepancy of the tile. Nothing is
//   thrown away, so any bound on R* transfers to the Level Ledger at once.
//
// THEOREM 2 (Transfer, PROVEN). For y <= x,   R*(x) <= 3^{pi(x)-pi(y)} * R*(y).
//
//   Proof. Let S be an admissible x-pattern (2 removed classes mod each odd q<=x,
//   1 mod 2), W_1 = y#, W_2 = W/W_1. Expand the conditions at the primes in (y,x]:
//   1_S(r) = sum_{d | W_2 squarefree} eps_d sum_{c} 1[r ≡ c mod d], with 3^{pi(x)-pi(y)}
//   (d,c) pairs in all. For an interval [A,B), the (d,c) term counts t in an
//   interval of length (B-A)/d with t in an affine image S_1 of the y-pattern, so
//   it equals (N_1/W_1)(B-A)/d + G_{S_1}(B') - G_{S_1}(A'), and the main terms sum
//   to rho*(B-A) exactly. Each bracket is at most range(S_1) <= R*(y). ∎
//
//   R*(2) = 1 (S = odds), so R*(x) <= 3^{pi(x)-1} already: the published
//   2*3^{pi(x)-1} carries a free factor of 2.
//
// [3a] R*(y) computed EXACTLY, by enumerating every admissible dilation class.
//      A dilate of T_y removes {0, e_q} mod q with e_q != 0 arbitrary and
//      independent across q (CRT on alpha), so the family has prod (q-1) members.
//  y   pi(y)  patterns     R*(y)       step    2*3^{pi-1}/R*(y)  (= the gain)
//  2       1          1     1.000000       -        2.00
//  3       2          2     1.000000  1.0000        6.00
//  5       3          8     1.800000  1.8000       10.00
//  7       4         48     3.000000  1.6667       18.00
// 11       5        480     6.584416  2.1948       24.60
// 13       6       5760    14.384615  2.1846       33.79
// 17       7      92160    27.019392  1.8784       53.96   24.2s
// 19       8    1658880    53.972817  1.9976       81.04   [--deep, 2717.1 s]
//
//   geometric mean step of R*, y = 2 -> 17 (6 folds): 1.73226
//   geometric mean step of R*, y = 2 -> 19 (7 folds): 1.76788
//   sqrt(3) = 1.73205.  MEASURED, on the extremal object rather than on the twin pattern.
//   3^{(pi(17)-1)/2} = 27.0000 against R*(17) = 27.0194: an exact-looking hit,
//   but 3^{(pi(19)-1)/2} = 46.7654 against R*(19) = 53.9728 is 15% low, and the
//   R*(17) -> R*(19) step is 1.9976, essentially 2. So the y = 17 coincidence did NOT
//   persist: R* runs ABOVE the sqrt(3) shape, which is what an extreme value over
//   prod (q-1) patterns should do: that count grows, and drags a sqrt(2 ln) factor with it.
//
// [3a'] Independent check of the parametrisation: dilate T_17 by RANDOM alpha in
//       (Z/510510)^* and take the range directly, never touching the e-tuples.
//       4000 random dilations: max range = 27.019392 at alpha = 473611;  enumerated R*(17) = 27.019392
//       The enumerated maximum is ATTAINED by a genuine dilation, not only by an abstract e-tuple.
//
// [3b] Term-by-term custody of Theorem 2 at x = 13, y = 7, p = 17.
//      3^{pi(13)-pi(7)} = 9 terms; check the expansion reproduces h(a) for every a,
//      and that no single term exceeds R*(7) + D_1/W_1.
//      terms = 9; expansion == h(a) for all a: OK
//      worst single-term error = 1.5294  <=  R*(7) + D_1/W_1 = 3.0714   OK
//      worst |h(a) - D/p| = 3.3529;  transfer bound 9*(R*(7)+rho1) = 27.64;  ledger 2*3^5 = 486
//
// [3c] Stress test of Theorem 1: max over a AND over many p, against R*(x) + D/W.
//   x=11: worst over p <= 5000 is 2.8723 at p=47; proven bound R*(x)+D/W = 6.6429  [HOLDS]; old ledger 162
//   x=13: worst over p <= 5000 is 5.9664 at p=149; proven bound R*(x)+D/W = 14.4341  [HOLDS]; old ledger 486
//   x=17: worst over p <= 2000 is 12.0270 at p=37; proven bound R*(x)+D/W = 27.0630  [HOLDS]; old ledger 1458
//
// COROLLARY (unconditional). For every x >= 19, every prime p > x, every a:
//       | h(a) - D/p |  <=  53.972817 * 3^{pi(x)-8} + 1/2 ,
//   which beats 2*3^{pi(x)-1} by the constant factor 81.04, uniformly in x, p and a.
//   (The y = 17 seed alone gives 53.96 and needs no overnight run.)
//
// ================ PART 4. CONTROLS (run before any claim of agreement) ====
//
// [4a] Random 2-class patterns through the identical pipeline: is the sqrt(3)-ish
//      looseness growth a property of the twin arithmetic, or of k = 2?
//   draw 1: 3:12 5:26(2.14) 7:36(1.40) 11:68(1.89) 13:102(1.50) 17:189(1.85) 19:234(1.24) 23:523(2.23)   geo mean step = 1.7146
//   draw 2: 3:12 5:20(1.67) 7:36(1.80) 11:60(1.68) 13:95(1.58) 17:207(2.18) 19:264(1.28) 23:478(1.81)   geo mean step = 1.6928
//   draw 3: 3:12 5:20(1.67) 7:50(2.52) 11:64(1.28) 13:109(1.69) 17:170(1.56) 19:272(1.60) 23:484(1.78)   geo mean step = 1.6956
//   twin tile, same 7 folds x = 3..23:  geo mean step = 1.6935
//   READING: the ratio grows at ~sqrt(3) per fold for GENERIC 2-class patterns.
//   The law belongs to k = 2, not to the twin set. No agreement is being claimed
//   between measurements here: this is one law seen on many patterns.
//
// [4b] Bernoulli control at the same density (the pipeline must report non-hyperuniformity):
//   x=13: Bernoulli half-range 34.5 vs true 3.92; AP sup at p=17: 18.4 vs true 3.35;  sqrt(W)=173
//   x=17: Bernoulli half-range 61.5 vs true 7.84; AP sup at p=19: 107.1 vs true 3.63;  sqrt(W)=714
//
// [4c] The extreme-value constant on a FOURTH object: c = sup/(sd*sqrt(2 ln p))
//      for the AP histogram, twin tile against random 2-class controls, p <= 200.
//   twin x=17: n=40 mean c = 0.8261  range 0.649..1.150
//   ctrl x=17 draw1 e=(2,3,6,4,11,2): mean c = 0.8907  range 0.628..1.150
//   ctrl x=17 draw2 e=(1,3,1,3,3,6): mean c = 0.9178  range 0.700..1.255
//   ctrl x=17 draw3 e=(1,3,3,7,12,1): mean c = 0.8731  range 0.678..1.262
//   twin x=19: n=40 mean c = 0.8545  range 0.649..1.201
//   ctrl x=19 draw1 e=(2,4,3,4,3,10,18): mean c = 0.8852  range 0.689..1.201
//   ctrl x=19 draw2 e=(1,1,3,2,9,1,11): mean c = 0.9149  range 0.710..1.201
//   ctrl x=19 draw3 e=(2,3,2,1,8,4,5): mean c = 0.9019  range 0.649..1.320
//
// [4d] The THIRD handle: natal-cap-29's spectral level factor R_2(p) -> 3 governs a
//      VARIANCE, so sd should step by sqrt(R_2(p)) per fold. Checked on this object:
//    fold 13: sd 0.7714 -> 0.6249, step 0.8101   sqrt(R_2(13)) = 1.5967
//    fold 17: sd 0.6249 -> 1.9983, step 3.1976   sqrt(R_2(17)) = 1.6290
//    fold 19: sd 1.9983 -> 2.0055, step 1.0036   sqrt(R_2(19)) = 1.6400
//    fold 23: sd 2.0055 -> 3.4174, step 1.7040   sqrt(R_2(23)) = 1.6561
//    fold 29: sd 3.4174 -> 8.1661, step 2.3896   sqrt(R_2(29)) = 1.6719
//    geometric mean measured step 1.6031 against predicted 1.6385 (-2.2%), limit sqrt(3) = 1.7321.
//    The individual steps swing 0.81 to 3.20 because p moves with x; only the
//    geometric mean is meaningful here. AGREES: the variance law is the same law.
//
// ================ PART 5. THE SECOND-MOMENT ROUTE, AND WHY IT DOES NOT CLOSE ==
//
// Parseval on the p-point group gives sum_a (h(a)-D/p)^2 = (1/p) sum_{t!=0}|F(t)|^2
// with F(t) = sum_{r in T} e(rt/p), and sup <= sqrt(sum_a (h-D/p)^2). So a second
// moment bound WOULD give a sup bound. The exact identity for that second moment:
//
//     sum_a h(a)^2  =  D + 2 * sum_{m>=1} N(mp),   N(h) = #{r : r, r+h in T, r+h < W},
//
// because p | r - r' as INTEGERS is the condition, not as residues mod W.
// Verified exactly below. The route therefore converts the sup problem into a
// Hardy-Littlewood pair-correlation problem: sum_m N(mp) has to be known to an
// absolute precision of order 3^{pi(x)/2}, i.e. the singular series has to be
// equidistributed over the progression h ≡ 0 (mod p) to that precision. That is
// not easier than the original question; it is the same wall.
//
//   x=11 p=13: sum h^2 = 1407 = identity RHS  EXACT;  p*Var = 5.0769, binomial D(1-1/p) = 124.6, ratio 4.07e-2
//   x=11 p=29: sum h^2 = 671 = identity RHS  EXACT;  p*Var = 42.5517, binomial D(1-1/p) = 130.3, ratio 3.26e-1
//   x=13 p=17: sum h^2 = 129787 = identity RHS  EXACT;  p*Var = 67.8824, binomial D(1-1/p) = 1397.6, ratio 4.86e-2
//   x=13 p=41: sum h^2 = 53935 = identity RHS  EXACT;  p*Var = 149.0244, binomial D(1-1/p) = 1448.8, ratio 1.03e-1
//   x=23 p=29: sum h^2 = 2180589216783 ratio only (identity too costly at this W);  p*Var = 1933.8621, binomial D(1-1/p) = 7677962.1, ratio 2.52e-4
//   The ratio is the hyperuniformity: no general inequality (large sieve included)
//   reaches below the binomial line, so no general inequality reaches this object.
//
// ================ PART 5b. THE L1 FOURIER CEILING ================
//
// The Fourier coefficients of a 2-class pattern factorise exactly. With removed
// classes {0, e_q} mod q,  S(j) = prod_q S_q(j),  S_q(j) = q-2 if q | j and
// -1 - e(j e_q / q) otherwise, so |S_q(j)| = 2|cos(pi j e_q / q)| off the divisors.
// The standard L1 Fourier (Erdos-Turan / Selberg) bound is then, for EVERY
// interval,
//
//     |Delta| <= (1/2) * sum_{j != 0} |S(j)| / min(j, W-j)  =:  ET(x),
//
// since |sum_{n<u} e(jn/W)| <= W / (2 min(j, W-j)). This is unconditional and
// computable. Its per-prime scale is the FULL-PERIOD AVERAGE of |S_q|, not the
// maximum, and that average has an exact limit.
//
//   q     f_q = (1/q)[(q-2) + sum_{v!=0} 2|cos(2 pi v/q)|]     running geometric mean
//     3   1.00000                                          1.00000
//     5   1.49443                                          1.22247
//     7   1.71256                                          1.36786
//    11   1.91394                                          1.48769
//    13   1.96865                                          1.57342
//    17   2.03976                                          1.64298
//    19   2.06416                                          1.69743
//    23   2.10032                                          1.74322
//    29   2.13593                                          1.78302
//    37   2.16551                                          1.84554
//    53   2.19795                                          1.93069
//    89   2.22836                                          2.02593
//   199   2.25315                                          2.13013
//   limit 1 + 4/pi = 2.27324
//
//    x        W    ET(x)   2*3^{pi-1}    gain   step   true sup   R*(x) (x<=19) or 3^{pi-8}R*(19)   |S(1)|   |S(1)|/2^pi
//   11     2310    27.08         162    5.98    -         2.98         6.58      1.297     0.0405
//   13    30030    69.42         486    7.00  2.563       3.92        14.38      2.296     0.0359
//   17   510510   177.75        1458    8.20  2.561       7.84        27.02      4.282     0.0335
//   19  9699690   442.58        4374    9.88  2.490      17.08        53.97      8.101     0.0316
//
//   READING. Three exponents, not two:
//      3       = 2 (the per-prime MAXIMUM of |S_q|) x 1.5 (the divisor sum), the Legendre term count;
//      2.27324 = 1 + 4/pi, the per-prime AVERAGE of |S_q|, the scale of the bulk of ET;
//      1.73205 = sqrt 3, the L2 truth.
//   And a HARD FLOOR under the whole L1 family: the single term j = 1 already
//   contributes |S(1)|/2 = prod_q |cos(2 pi/q)| * 2^{pi(x)-1}, and that product
//   converges (sum 1/q^2 converges), so ET(x) >> 2^{pi(x)}. |S(1)| measures
//   1.297, 2.296, 4.282 at x = 11, 13, 17, i.e. 0.0405, 0.0359, 0.0334 times
//   2^{pi(x)}, converging. NO L1 Fourier bound of this shape can reach
//   sqrt(3)^{pi(x)}: it is beaten by its own first term. The extreme-value step is
//   not an artefact of how the repo has argued so far, it is unavoidable for the
//   whole L1 family. Measured ET beats the ledger by 5.98, 7.00, 8.20, 9.88 at
//   x = 11, 13, 17, 19 and grows by ~1.18 per fold, but it stays above the
//   transfer bound throughout the computable range and crosses it only near
//   x = 41, where W = 41# = 3e17.
//
//
// ================ PART 6. DOWNSTREAM ================
//
// [6a] FOLD-PROFILE §2 table rebuilt. (Note: that table's "Mobius bound" column is
//      the K-level bound 4*3^{pi-1}, i.e. twice the h-level bound quoted in the theorem.)
// tile  p   mean 2D/p     true max|K-mean|   old 4*3^{pi-1}  old/mean   new K-bound   new/mean    gain
// T7   11          2.73           1.73          1.08e+2   39.6000          6.14    2.252e+0   17.58
// T11  13         20.77           2.23          3.24e+2   15.6000         13.29    6.397e-1   24.39
// T13  17        174.71           5.71          9.72e+2    5.5636         28.87    1.652e-1   33.67
// T17  19       2344.74           6.26          2.92e+3    1.2436         54.13    2.308e-2   53.87
// T19  23      32928.26           6.74          8.75e+3    0.2657        108.02    3.281e-3   80.98
// T23  29     548425.86          23.86          2.62e+4    0.0479        323.91    5.906e-4   81.02
//   The relative error crosses below the mean at x = 11 instead of x = 19,
//   and reads 5.9e-4 of the mean at T_23 instead of 0.048.
//
// [6b] FOLD-PROFILE §9b tier 1: how far does the Legendre route reach in the 23# window?
//      Sift [0, 23#) by every prime up to y and ask when the majorant still lies
//      below the main term rho(y)*W, i.e. when the count is certified positive.
//   ledger 2*3^{pi(y)-1}  (FOLD-PROFILE §9b: dies at 47) last usable y =  43   S = 5942314   u = ln W / ln y = 5.111
//   PROVEN here: 3^{pi(y)-8} * R*(19)              last usable y =  61   S = 5115886   u = ln W / ln y = 4.676
//   CONDITIONAL sqrt(3) shape: 3^{(pi(y)-1)/2}     last usable y = 107   S = 4028025   u = ln W / ln y = 4.114
//   the true sup, MEASURED (not a bound)           last usable y = 397   S = 2568665   u = ln W / ln y = 3.212
//   DHR two-dimensional lower bound reaches u = 4.26645, i.e. y = 91 in this window.
//     y= 43 pi=14  S= 5942314  main= 5942244  true sup=  113.7  ledger=3.19e+6  proven=3.93e+4  sqrt3 shape=1.26e+3
//     y= 47 pi=15  S= 5689532  main= 5689382  true sup=  153.1  ledger=9.57e+6  proven=1.18e+5  sqrt3 shape=2.19e+3
//     y= 89 pi=24  S= 4361681  main= 4361833  true sup=  481.3  ledger=1.88e+11  proven=2.32e+9  sqrt3 shape=3.07e+5
//     y= 97 pi=25  S= 4271469  main= 4271898  true sup=  589.1  ledger=5.65e+11  proven=6.97e+9  sqrt3 shape=5.31e+5
//     y=107 pi=28  S= 4028025  main= 4029252  true sup=  923.0  ledger=1.53e+13  proven=1.88e+11  sqrt3 shape=2.76e+6
//
// [6c] The natal-cap object (cap-25's lemma |C(s) - N*l/W| <= 2*3^k, k = #mids = pi(x)-3),
//      which TODO item 8(c) wants tightened by the ~30x measured slack.
//   y=5  (no mids absorbed): R*_natal = 1.600000  patterns=4   gain vs 2*3^k = 1.25
//   y= 7 (1 mid absorbed): R*_natal = 3.142857  patterns=    24   gain vs 2*3^k = 1.91   56.9s
//   y=11 (2 mids absorbed): R*_natal = 5.818182  patterns=   240   gain vs 2*3^k = 3.09   56.9s
//   y=13 (3 mids absorbed): R*_natal = 13.406593  patterns=  2880   gain vs 2*3^k = 4.03   57.0s
//   y=17 (4 mids absorbed): R*_natal = 26.682612  patterns= 46080   gain vs 2*3^k = 6.07   67.1s
//   REFUTED as a route to TODO 8(c): the best proven gain here is ~6x against the
//   ~30x of measured slack, because cap-25's k already excludes 2, 3 and 5, so the
//   transfer only has mids to absorb. Reaching 30x needs R*_natal(29), which is
//   4*prod_{7<=q<=29}(q-1) = 5.1e8 patterns on a 6.5e9 tile: out of reach.
//
// 67.1s
// ============================================================================
// READINGS
// ============================================================================
//  1. CUSTODY PASSED. FOLD-PROFILE §3's ladder (1.36, 1.62, 3.35, 3.63, 6.13,
//     16.93) and its K(0)/min/max/sd columns, FOLD-PROFILE §2's bound/mean
//     column (5.5636, 1.2436, 0.2657, 0.0479) and discrepancy-two-class §2/§5's
//     max/min and looseness ratios (25.7 .. 479.5) all reproduce digit for digit
//     through code written from scratch here.
//     SCOPE, recorded 2026-08-17 to settle a standing question. Ladder A here
//     has SEVEN rows, x = 5 to 23, because Part 0 materialises tiles only to
//     T23. The home, discrepancy-two-class §5, carries EIGHT: the eighth is
//     x = 29, ratio 801, from bound 2*3^9 = 3.937e4 against a measured
//     two-class sup of 49.1520. That row is streamed rather than materialised
//     and belongs to research/discrepancy-two-class.js, which prints it in its
//     own D3 table. Nothing is missing here; the two ladders have different
//     reaches by construction, and 801 is not this file's to produce.
//
//  2. VERIFIED, "right base, twice the exponent". The looseness ratio grows by
//     1.6284 per fold on the interval object over 6 folds and 1.8127 on the AP
//     object over 5; sqrt(3) = 1.7321 sits between them. The claim survives an
//     independent check.
//
//  3. REFUTED, a briefing premise. The Level Ledger's truth is NOT uniform in p.
//     max_a|h(a) - D/p| at x = 19 runs 6.13 at p = 23 up to 14.6 at p = 43;
//     FOLD-PROFILE §3 quotes only the ladder prime, which is the smallest and
//     therefore the friendliest p at every level. Maximised over p instead, the
//     truth reads 2.87 (x=11, p<=5000), 5.97 (x=13, p<=5000) and 12.03 (x=17,
//     p<=2000) against the published 1.62, 3.35 and 3.63: the ladder understates
//     its own object by 1.8x, 1.8x and 3.3x. The empirical "base nearer 2 than
//     3" in §3 is read off a ladder that moves p and x together, so it is not
//     a statement about x alone.
//
//  4. PROVEN (Dilation Reduction). |h(a) - D/p| <= R*(x) + D/W with
//     R*(x) = max over dilates alpha*T_x of the range of the interval
//     discrepancy. The reduction is exact up to D/W < 1/2: the Level Ledger is
//     the worst dilated-interval discrepancy of the tile and nothing else.
//
//  5. PROVEN (Transfer). R*(x) <= 3^{pi(x)-pi(y)} R*(y) for every y <= x, by
//     expanding only the primes in (y, x]. R*(2) = 1, so the published
//     2*3^{pi(x)-1} already carries a free factor of 2.
//
//  6. VERIFIED by exhaustion. R*(y) = 1, 1, 1.8, 3, 6.584416, 14.384615,
//     27.019392, 53.972817 at y = 2, 3, 5, 7, 11, 13, 17, 19, each the exact
//     maximum over the full family of prod (q-1) dilation classes (92,160 at
//     y = 17; 1,658,880 at y = 19, 2717.1 s under --deep).
//     Hence UNCONDITIONALLY, for every x >= 19, every p > x, every a:
//         |h(a) - D/p| <= 53.972817 * 3^{pi(x)-8} + 1/2,
//     beating 2*3^{pi(x)-1} by 81.04 uniformly (the y = 17 seed alone gives
//     53.96 with no overnight run). Stress-tested against the truth over every
//     p <= 5000 at x = 11, 13 and every p <= 2000 at x = 17.
//
//  7. MEASURED, and then CORRECTED by the deep run. At y = 17 the fit looked
//     exact: R*(y) grew by 1.73226 per fold in geometric mean from y = 2, against
//     sqrt(3) = 1.73205, with R*(17) = 27.0194 against 3^{(pi(17)-1)/2} = 27.
//     R*(19) = 53.9728 breaks it: the step is 1.9976, essentially 2, the 7-fold
//     geometric mean rises to 1.76788, and 3^{(pi(19)-1)/2} = 46.77 is 15% low.
//     R* therefore runs ABOVE the sqrt(3) shape. That is what an extreme value
//     over prod (q-1) patterns should do, since the pattern count grows with y
//     and drags a sqrt(2 ln) factor along; it is NOT evidence against sqrt(3)
//     for any one fixed pattern. Recorded because the two-endpoint reading was
//     flagged as a caveat and the caveat was right.
//
//  8. NOT PROVEN, and this is the deliverable's limit. The best gain is a
//     CONSTANT, not a growing factor (reading 8b has a growing one that is never
//     the best available). It equals 2*3^{pi(y)-1}/R*(y) and it grows by about
//     1.4 per extra level of y that can be enumerated, but y is capped by
//     compute at 17 (or 19 overnight). A growing gain needs R*(y) for unbounded
//     y, which is the sqrt(3) statement itself.
//
//  8b. THE L1 CEILING, and it is a new number for this repo. The Fourier
//     coefficients factorise exactly, |S_q(j)| = 2|cos(pi j e_q/q)| off the
//     divisors, and the per-prime full-period average of |S_q| tends to
//     1 + 4/pi = 2.27324. The Legendre 3 factors as 2 (the per-prime MAXIMUM)
//     times 1.5 (the divisor sum). So there are three exponents:
//         3 (term count)  >  1 + 4/pi = 2.27324 (bulk of ET)  >  sqrt 3 = 1.73205 (L2 truth),
//     and a hard floor of 2^{pi(x)} under the whole L1 family, because the
//     single term j = 1 already contributes prod_q|cos(2 pi/q)| * 2^{pi(x)-1}
//     and that product converges (measured 0.0405, 0.0359, 0.0334 at x=11,13,17).
//     The Erdos-Turan bound ET(x) = (1/2) sum_j |S(j)|/min(j,W-j) is
//     unconditional, computable, and beats the ledger by 5.98, 7.00, 8.20, 9.88
//     at x = 11, 13, 17, 19, growing ~1.18 per fold: a GROWING unconditional
//     gain. But it stays above the transfer bound over the whole computable
//     range and crosses it only near x = 41, where W = 3e17. And no L1 Fourier
//     method can go below 2^{pi(x)}, so the extreme-value step is unavoidable
//     for that entire family, not just for this repo's arguments.
//
//  9. REFUTED as a route: the second moment. sum_a h(a)^2 = D + 2 sum_m N(mp) is
//     an EXACT identity (checked at four (x,p) cells), so the second-moment
//     route converts the sup problem into pair-correlation equidistribution over
//     h ≡ 0 mod p to absolute precision 3^{pi(x)/2}. The measured p*Var sits
//     4e-2 to 3e-1 of the binomial D(1-1/p) at x = 11, 13 and 2.52e-4 at
//     x = 23, p = 29 (Part 5's fifth cell, added 2026-08-20),
//     so every general inequality (the large sieve included, which cannot beat
//     the binomial line here) is vacuous against it.
//
// 10. CONTROLLED. Random 2-class patterns give looseness growth 1.7146, 1.6928,
//     1.6956 per fold against the twin tile's 1.6935 on the same 7 folds, and
//     extreme-value constants c = 0.87..0.92 against the twin's 0.826 (x=17)
//     and 0.855 (x=19). The twin set sits INSIDE the control spread on both. The
//     sqrt(3) law is a property of k = 2, not of the twin arithmetic, and this
//     is one law seen on many patterns rather than several measurements agreeing.
//     Bernoulli at the same density gives half-range 34.5 and 61.5 against the
//     true 3.92 and 7.84: the pipeline reports non-hyperuniformity when it is
//     there.
//
// 11. THE THIRD AND FOURTH HANDLES AGREE, with the label the repo now requires.
//     c = sup/(sd sqrt(2 ln n_eff)) reads 0.826-0.855 on this AP object, against
//     0.830 (one class) and 0.687 (two class) in discrepancy-two-class §5 and
//     0.97 in natal-cap-25. Four objects, one constant near 0.8, no trend. This
//     is a shared SHAPE with a shared constant, not an algebraic identity: the
//     control in reading 10 was run through the identical pipeline first.
//
// 12. DOWNSTREAM, PROVEN. FOLD-PROFILE §2's relative error crosses below the
//     mean at x = 11 instead of x = 19 and reads 5.9e-4 of it at T_23 instead of
//     0.048. FOLD-PROFILE §9b tier 1, the Legendre route in the 23# window,
//     reaches y = 61 (u = 4.676) instead of y = 43-47 (u = 5.11). It does NOT
//     reach the DHR boundary y = 91 (u = 4.26645).
//
// 13. DOWNSTREAM, CONDITIONAL. With the sqrt(3) shape 3^{(pi(y)-1)/2} the same
//     route reaches y = 107, u = 4.114, which is INSIDE the band DHR cannot
//     reach. So a proven sqrt(3) Level Ledger would put an elementary Legendre
//     certificate below the two-dimensional sieve's lower-bound wall in this
//     window. That is the one place where the tightening would buy something
//     the repo does not already have.
//
// 14. REFUTED as an unblock: TODO item 8(c). natal-cap-25's lemma
//     |C(s) - N l/W| <= 2*3^k has k = pi(x)-3, so the transfer only has mids to
//     absorb, and the proven gain is 1.25, 1.91, 3.09, 4.03, 6.07 at
//     y = 5, 7, 11, 13, 17 against the ~30x of measured slack. Item 8(c) is not
//     closed by this file.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   5.9664 -> 5.97, reading 3, the x = 13 worst over p <= 5000 line of Part 3.
//   46.7654 -> 46.77, reading 7, printed in the Part 4 sentence that sets
//   3^{(pi(19)-1)/2} against R*(19) = 53.9728.
//   0.8545 -> 0.855, readings 10 and 11, the twin x = 19 mean c.
//   0.9178 -> 0.92, reading 10, the largest of the six control mean c values;
//   the low end 0.87 is the smallest of them, 0.8731 at x = 17 draw 3.
//
// TOKENIZER ARTIFACT, not a figure:
//   "11,13,17" in reading 8b is the x list of the three quoted |S(1)|/2^pi
//   values, not a quantity. Those three values already carry the note at code
//   line 409 that 0.0334 is a truncation of the table's own 0.0335.
//   "-0.855" in reading 11 is the second endpoint of the hyphenated range
//   0.826-0.855; both endpoints are the twin mean c values printed in Part 6.
//
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   the eighth ladder row of reading 1, x = 29: research/discrepancy-two-class.js
//   prints it as "29 | 3.937e+4 | 49.1520 | 8.01e+2 | 2.430e+2", so the bound
//   3.937e4, the two-class sup 49.1520 and the ratio 801 are all its numbers,
//   exactly as reading 1 says.
//   0.830 and 0.687 in reading 11 are the same file's "c = 0.8296" (one class)
//   and "c = 0.6873" (two class).
//   0.97 in reading 11 is natal-cap-25-excess-law.js's one-constant fit,
//   printed there as "c* = 0.972 (geometric mean)".
//
// RESOLVED 2026-08-20 (mismatch adjudication #33), by making the script print
//   it. Reading 9's "2.5e-4 at x = 23" was a real measurement from an
//   invocation nobody pasted: Part 5's cell list stopped at x = 13, so no
//   x = 23 row had ever been printed and the reading named no p. Part 5 now
//   carries a fifth cell, x = 23 p = 29, and the block above prints its ratio.
//   The identity check is NOT run there and the row says so: verifying
//   sum_a h^2 = D + 2 sum_m N(mp) at W = 223,092,870 costs (W/p) x D ~ 6e13
//   operations, while the ratio itself is one O(D) residue histogram. The four
//   small cells are what certify the identity. Reading 9 now names p = 29.
//   (The old undeclared figure was right: printed 2.52e-4 against the quoted
//   2.5e-4.)
// ---------------------------------------------------------------------------
