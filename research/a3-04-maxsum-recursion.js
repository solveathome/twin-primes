// ============================================================================
// A4 (ATTACKS3): a fold recursion for the FAMILY maxsum_m.
//
// maxsum_m(T) = largest sum of m consecutive gaps in the cyclic twin-slot gap
// word of tile T. maxsum_1 = G2, the twin Jacobsthal. U-FRAME 5a proves the
// two-sided bound maxsum_2(old) <= G2(new) <= maxsum_{L+1}(old) with L the
// longest run of adjacent kills; the open dependence on L is the single hole.
// If the whole family is closed under folding we get a system of recursions
// instead of one inequality with an unbounded parameter.
//
// Structure of the computation:
//   0. custody: rebuild T5..T23, reproduce G2 = 42, 66, 108, 150, 204.
//   1. maxsum_m, m = 1..M, at every level, plus maxsum_m/m.
//   2. the merge word: each new gap is a merge of c old gaps (c = 1 + number
//      of slots killed inside it). K(m) = maxsum_m of the c-word = the largest
//      number of old gaps that m consecutive new gaps can span. Then
//         maxsum_m(new) <= maxsum_{K(m)}(old)      [EXACT, by construction]
//      and the whole question is how big K(m) is.
//   3. candidate relations, each tested at every fold and every m:
//         R1  maxsum_{m+1}(old) <= maxsum_m(new)            (lower)
//         R2  maxsum_m(new) <= maxsum_{m+L}(old)            (the natural guess)
//         R3  the excess maxsum_m(new) - maxsum_{m+1}(old), in old mean gaps
//         R4  K(m) <= m + L
//         R5  maxsum_m(new) <= maxsum_{m+1}(old) + G2(old)  (no L at all)
//      plus j*(m), the SHARP shift: smallest j with new_m <= old_{m+j}.
//   4. the copy theorem for the family: is
//         maxsum_m(new) = max over the p 2-sets {a,a-2} of maxsum_m of the old
//         tile with those residue classes deleted?
//      (Step 2 of U-FRAME 5a is the m = 1 case, verified at six folds.)
//   5. self-similarity, the step-4 slope, and the R1 chain down the ladder.
//   6. the deep fold T23 -> T29, 214.7M slots, streamed (--t29).
//   7. L rescanned: research/killrun.js overcounts it at fold 29.
// ============================================================================
'use strict';

const M = 12;                    // how many m we report
const M2 = 48;                   // how many m we carry (K(m) can reach past M)
const FOLD_PRIMES = [7, 11, 13, 17, 19, 23];
const DO29 = process.argv.includes('--t29');

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';

// ---- rolling maximum window sums, m = 1..M, one pass ------------------------
function makeRoller(M) {
  const w = new Float64Array(M + 1), best = new Float64Array(M + 1);
  const bestPos = new Int32Array(M + 1);
  let n = 0;
  return {
    push(g) {
      n++;
      const lim = n < M ? n : M;
      for (let j = lim; j >= 2; j--) {
        const v = w[j - 1] + g; w[j] = v;
        if (v > best[j]) { best[j] = v; bestPos[j] = n; }
      }
      w[1] = g; if (g > best[1]) { best[1] = g; bestPos[1] = n; }
    },
    best, bestPos, get n() { return n; }
  };
}

// ---- tiles ------------------------------------------------------------------
// T5 = twin slots mod 30; fold by each prime in turn, keeping every level.
function buildLevels() {
  const levels = [];
  let W = 30, S = Float64Array.from([11, 17, 29]);
  levels.push({ x: 5, W, S });
  for (const p of FOLD_PRIMES) {
    const D = S.length, out = new Float64Array(D * (p - 2));
    let m = 0;
    for (let k = 0; k < p; k++) {
      for (let i = 0; i < D; i++) {
        const r = S[i] + k * W;
        if (r % p !== 0 && (r + 2) % p !== 0) out[m++] = r;   // already sorted
      }
    }
    W *= p; S = out.subarray(0, m);
    levels.push({ x: p, W, S });
    console.log(`  built T${p}: width ${W}, ${m} slots  [${el()}]`);
  }
  return levels;
}

// maxsum_m of a stored tile's cyclic gap word
function maxsumsOfTile(S, W, M) {
  const D = S.length, R = makeRoller(M), head = [];
  for (let i = 0; i < D; i++) {
    const g = (i + 1 < D ? S[i + 1] : S[0] + W) - S[i];
    R.push(g);
    if (head.length < M - 1) head.push(g);
  }
  for (const g of head) R.push(g);     // close the cycle
  return R;
}

console.log('== 0. custody: build the tiles ==');
const levels = buildLevels();
const byX = new Map(levels.map(L => [L.x, L]));

// ---- 1. the maxsum table ----------------------------------------------------
console.log('\n== 1. maxsum_m, m = 1..' + M + ' (maxsum_1 must be 12, 42, 66, 108, 150, 204) ==');
const pad = (s, n) => String(s).padStart(n);
console.log('tile  D          mbar   ' + Array.from({ length: M }, (_, j) => pad('m=' + (j + 1), 7)).join(''));
for (const L of levels) {
  L.ms = Array.from(maxsumsOfTile(L.S, L.W, M2).best);   // ms[m], m = 1..M2
  L.mbar = L.W / L.S.length;
}
// T5 has only 3 slots, so windows of m > 3 gaps wrap it; it is dropped from the
// tables (its G2 = 12 and maxsum_2 = 24 are still used by the chain in 5b).
const shown = levels.filter(L => L.S.length > M);
for (const L of shown) {
  console.log(pad('T' + L.x, 4) + pad(L.S.length, 11) + pad(L.mbar.toFixed(2), 8) + '   ' +
    L.ms.slice(1, M + 1).map(v => pad(v, 7)).join(''));
}
console.log('  [' + el() + ']');

console.log('\n-- maxsum_m / m (max AVERAGE gap over m consecutive; must fall in m) --');
console.log('tile  mbar    ' + Array.from({ length: M }, (_, j) => pad('m=' + (j + 1), 8)).join(''));
for (const L of shown) {
  console.log(pad('T' + L.x, 4) + pad(L.mbar.toFixed(2), 7) + '  ' +
    L.ms.slice(1, M + 1).map((v, j) => pad((v / (j + 1)).toFixed(2), 8)).join(''));
}
console.log('\n-- the same, normalised by mbar: (maxsum_m/m)/mbar --');
console.log('tile  ' + Array.from({ length: M }, (_, j) => pad('m=' + (j + 1), 8)).join(''));
for (const L of shown) {
  console.log(pad('T' + L.x, 4) + '  ' +
    L.ms.slice(1, M + 1).map((v, j) => pad((v / (j + 1) / L.mbar).toFixed(3), 8)).join(''));
}

// U-FRAME 5a step 4 approximates maxsum_{L+1} = G2 + L*mbar. Measure the real
// slope: (maxsum_j - G2) / ((j-1) * mbar).
console.log('\n-- the step-4 slope: (maxsum_j - maxsum_1) / ((j-1) * mbar), should be 1 --');
console.log('tile  ' + Array.from({ length: M - 1 }, (_, j) => pad('j=' + (j + 2), 8)).join(''));
for (const L of shown) {
  if (L.S.length <= 60) continue;
  console.log(pad('T' + L.x, 4) + '  ' + Array.from({ length: M - 1 }, (_, j) =>
    pad(((L.ms[j + 2] - L.ms[1]) / ((j + 1) * L.mbar)).toFixed(2), 8)).join(''));
}

// subadditivity is what makes maxsum_m/m converge (Fekete); check it
{
  let bad = 0;
  for (const L of levels) for (let a = 1; a <= 8; a++) for (let b = 1; b <= 8; b++)
    if (L.S.length > a + b && L.ms[a + b] > L.ms[a] + L.ms[b] + 1e-9) bad++;
  console.log(`\nsubadditivity maxsum_{a+b} <= maxsum_a + maxsum_b, a,b <= 8: ${bad} violations`);
}

// ---- 2/3. fold analysis ----------------------------------------------------
// Stream the fold of `old` by p in sorted order. Return the new tile's maxsums,
// the maxsums of the MERGE word c (c_i = number of old gaps inside new gap i),
// and L = max(c) - 1 = the longest adjacent-kill run.
function streamFold(old, p, MM, label) {
  const S = old.S, W = old.W, D = S.length, w = W % p;
  const res = new Int32Array(D);
  for (let i = 0; i < D; i++) res[i] = S[i] % p;
  const Rg = makeRoller(MM), Rc = makeRoller(MM);
  const headG = [], headC = [];
  let prev = -1, first = 0, skips = 0, lead = 0, nSlots = 0, maxc = 0;
  const t = Date.now(); let nextTick = 8;
  for (let k = 0; k < p; k++) {
    const a = ((-k * w) % p + p) % p, a2 = (a + p - 2) % p;
    const off = k * W;
    for (let i = 0; i < D; i++) {
      const r = res[i];
      if (r === a || r === a2) { skips++; continue; }
      const pos = S[i] + off; nSlots++;
      if (prev < 0) { first = pos; lead = skips; skips = 0; prev = pos; continue; }
      const g = pos - prev, c = 1 + skips;
      if (c > maxc) maxc = c;
      Rg.push(g); Rc.push(c);
      if (headG.length < MM - 1) { headG.push(g); headC.push(c); }
      skips = 0; prev = pos;
    }
    if (D > 1e5 && k >= nextTick) { nextTick = k + 4; console.log(`    ...${label} copy ${k}/${p}, ${nSlots} slots [${el()}]`); }
  }
  const g = first + W * p - prev, c = 1 + skips + lead;
  if (c > maxc) maxc = c;
  Rg.push(g); Rc.push(c);
  for (let i = 0; i < headG.length; i++) { Rg.push(headG[i]); Rc.push(headC[i]); }
  return { ms: Array.from(Rg.best), K: Array.from(Rc.best), L: maxc - 1, D: nSlots,
           secs: (Date.now() - t) / 1000 };
}

// One copy of the fold: delete residue classes {a, a-2} mod p from the old tile
// and read the resulting cyclic gap word. Returns maxsums and the longest run.
function afterDelete(S, W, p, a, MM) {
  const D = S.length, a2 = ((a - 2) % p + p) % p;
  let i0 = -1;
  for (let i = 0; i < D; i++) { const r = S[i] % p; if (r !== a && r !== a2) { i0 = i; break; } }
  if (i0 < 0) return null;
  const R = makeRoller(MM), head = [];
  let prev = S[i0], run = 0, maxrun = 0;
  for (let t = 1; t <= D; t++) {
    const j = i0 + t, i = j >= D ? j - D : j, r = S[i] % p;
    if (r === a || r === a2) { if (++run > maxrun) maxrun = run; continue; }
    const pos = S[i] + (j >= D ? W : 0), g = pos - prev;
    R.push(g); if (head.length < MM - 1) head.push(g);
    run = 0; prev = pos;
  }
  for (const g of head) R.push(g);
  return { ms: Array.from(R.best), maxrun };
}

console.log('\n== 2/3. the fold: merge word, L, and the candidate relations ==');
const folds = [];
for (let n = 1; n < levels.length; n++) {
  const old = levels[n - 1], nw = levels[n], p = nw.x;
  const F = streamFold(old, p, M2, `T${old.x}->T${p}`);
  // custody: the streamed fold must reproduce the built tile exactly
  let ok = F.D === nw.S.length;
  const lim = Math.min(M2, F.D - 1);
  for (let m = 1; m <= lim && ok; m++) if (F.ms[m] !== nw.ms[m]) ok = false;
  F.old = old; F.nw = nw; F.p = p;
  folds.push(F);
  console.log(`  T${old.x} -> T${p}: D ${F.D}, L(fold) = ${F.L}, ` +
    `stream reproduces built tile: ${ok ? 'YES' : 'NO'}  [${F.secs.toFixed(2)}s]`);
}

const MR = 8;                       // m range for the relation tables
function relTable(list) {
  console.log('\n-- K(m): most old gaps that m consecutive new gaps can span --');
  console.log('fold          L   ' + Array.from({ length: MR }, (_, j) => pad('m=' + (j + 1), 6)).join('') +
    '   K(m)-m');
  for (const F of list) {
    const K = F.K.slice(1, MR + 1);
    console.log(pad(`T${F.old.x}->T${F.p}`, 11) + pad(F.L, 4) + '   ' +
      K.map(v => pad(v, 6)).join('') + '   ' + K.map((v, j) => v - (j + 1)).join(','));
  }

  console.log('\n-- R1 (lower)  maxsum_{m+1}(old) <= maxsum_m(new) ?  ' +
    'shown: maxsum_m(new) / maxsum_{m+1}(old), * = FAILS --');
  console.log('fold          ' + Array.from({ length: MR }, (_, j) => pad('m=' + (j + 1), 8)).join(''));
  for (const F of list) {
    const row = [];
    for (let m = 1; m <= MR; m++) {
      const a = F.ms[m], b = F.old.ms[m + 1];
      row.push(pad((a / b).toFixed(3) + (a < b ? '*' : ' '), 8));
    }
    console.log(pad(`T${F.old.x}->T${F.p}`, 11) + '  ' + row.join(''));
  }

  console.log('\n-- R2 (the natural guess)  maxsum_m(new) <= maxsum_{m+L}(old) ?  ' +
    'shown: ratio new/old_{m+L}, * = FAILS --');
  console.log('fold          ' + Array.from({ length: MR }, (_, j) => pad('m=' + (j + 1), 8)).join(''));
  for (const F of list) {
    const row = [];
    for (let m = 1; m <= MR; m++) {
      const a = F.ms[m], b = F.old.ms[m + F.L];
      row.push(pad((a / b).toFixed(3) + (a > b ? '*' : ' '), 8));
    }
    console.log(pad(`T${F.old.x}->T${F.p}`, 11) + '  ' + row.join(''));
  }

  console.log('\n-- R3  excess over the lower bound, in old mean gaps: ' +
    '(maxsum_m(new) - maxsum_{m+1}(old)) / mbar(old) --');
  console.log('fold        mbar  ' + Array.from({ length: MR }, (_, j) => pad('m=' + (j + 1), 8)).join(''));
  for (const F of list) {
    const row = [];
    for (let m = 1; m <= MR; m++)
      row.push(pad(((F.ms[m] - F.old.ms[m + 1]) / F.old.mbar).toFixed(2), 8));
    console.log(pad(`T${F.old.x}->T${F.p}`, 11) + pad(F.old.mbar.toFixed(1), 6) + '  ' + row.join(''));
  }

  console.log('\n-- R4  K(m) <= m + L ?  (excess K(m) - m - L, negative or 0 = holds) --');
  for (const F of list) {
    const row = [];
    for (let m = 1; m <= MR; m++) row.push(F.K[m] - m - F.L);
    const bad = row.filter(v => v > 0).length;
    console.log(pad(`T${F.old.x}->T${F.p}`, 11) + '  ' + row.map(v => pad(v, 4)).join('') +
      '    ' + (bad ? `FAILS at ${bad} of ${MR}` : 'holds'));
  }

  console.log('\n-- the exact bound maxsum_m(new) <= maxsum_{K(m)}(old) (must hold), ' +
    'with its slack --');
  console.log('fold          ' + Array.from({ length: MR }, (_, j) => pad('m=' + (j + 1), 8)).join(''));
  for (const F of list) {
    const row = [];
    for (let m = 1; m <= MR; m++) {
      const a = F.ms[m], b = F.old.ms[F.K[m]];
      row.push(pad((a / b).toFixed(3) + (a > b ? '*' : ' '), 8));
    }
    console.log(pad(`T${F.old.x}->T${F.p}`, 11) + '  ' + row.join(''));
  }

  console.log('\n-- j*(m): the SHARP shift, smallest j with maxsum_m(new) <= maxsum_{m+j}(old) --');
  console.log('fold          L   ' + Array.from({ length: MR }, (_, j) => pad('m=' + (j + 1), 5)).join('') +
    '   max j*');
  for (const F of list) {
    const row = [], js = [];
    for (let m = 1; m <= MR; m++) {
      let j = 0; while (m + j <= M2 && F.old.ms[m + j] < F.ms[m]) j++;
      js.push(j);
      row.push(j + (F.old.ms[m + j] === F.ms[m] ? '=' : ' '));   // = means exact hit
    }
    console.log(pad(`T${F.old.x}->T${F.p}`, 11) + pad(F.L, 4) + '   ' +
      row.map(v => pad(v, 5)).join('') + pad(Math.max(...js), 8));
  }

  console.log('\n-- R5  maxsum_m(new) <= maxsum_{m+1}(old) + G2(old) ?  ' +
    'shown: (new_m - old_{m+1}) / G2(old), * = FAILS (>1) --');
  console.log('fold          ' + Array.from({ length: MR }, (_, j) => pad('m=' + (j + 1), 8)).join(''));
  for (const F of list) {
    const row = [];
    for (let m = 1; m <= MR; m++) {
      const v = (F.ms[m] - F.old.ms[m + 1]) / F.old.ms[1];
      row.push(pad(v.toFixed(3) + (v > 1 ? '*' : ' '), 8));
    }
    console.log(pad(`T${F.old.x}->T${F.p}`, 11) + '  ' + row.join(''));
  }
}
relTable(folds.filter(F => F.old.S.length > 60));

// ---- 4. the copy theorem for the whole family ------------------------------
// m = 1 is U-FRAME 5a Step 2, verified at six folds. Does it survive for m > 1,
// or do windows that straddle two copies (two different kill sets) win?
console.log('\n== 4. copy theorem for the family: is maxsum_m(new) = max over the ' +
  'p 2-sets of maxsum_m(old minus {a,a-2})? ==');
function copyTheorem(F, MM) {
  const S = F.old.S, W = F.old.W, p = F.p, best = new Float64Array(MM + 1);
  let maxrun = 0;
  for (let a = 0; a < p; a++) {
    const r = afterDelete(S, W, p, a, MM);
    if (!r) continue;
    if (r.maxrun > maxrun) maxrun = r.maxrun;
    for (let m = 1; m <= MM; m++) if (r.ms[m] > best[m]) best[m] = r.ms[m];
    if (S.length > 1e6) console.log(`    ...2-set ${a + 1}/${p} [${el()}]`);
  }
  return { best, maxrun };
}
console.log('fold        L(copy) L(fold)  ' +
  Array.from({ length: MR }, (_, j) => pad('m=' + (j + 1), 7)).join('') + '   verdict');
for (const F of folds) {
  if (F.old.S.length <= 60) continue;
  const C = copyTheorem(F, MR);
  const row = [], bad = [];
  for (let m = 1; m <= MR; m++) {
    row.push(pad(C.best[m] === F.ms[m] ? '=' : `${C.best[m]}/${F.ms[m]}`, 7));
    if (C.best[m] !== F.ms[m]) bad.push(m);
  }
  console.log(pad(`T${F.old.x}->T${F.p}`, 11) + pad(C.maxrun, 5) + pad(F.L, 8) + '  ' + row.join('') +
    '   ' + (bad.length ? `single-copy formula FAILS at m = ${bad.join(',')}` : 'EXACT for all m'));
}
console.log('  [' + el() + ']');

// ---- 5. R5 pushed until it breaks, and the chained lower bound --------------
console.log('\n== 5a. R5 pushed to m = ' + M + ': (maxsum_m(new) - maxsum_{m+1}(old)) / G2(old) ==');
console.log('fold          ' + Array.from({ length: M }, (_, j) => pad('m=' + (j + 1), 7)).join(''));
for (const F of folds) {
  if (F.old.S.length <= 60) continue;
  const row = [];
  for (let m = 1; m <= M; m++) {
    const v = (F.ms[m] - F.old.ms[m + 1]) / F.old.ms[1];
    row.push(pad(v.toFixed(2) + (v > 1 ? '*' : ' '), 7));
  }
  console.log(pad(`T${F.old.x}->T${F.p}`, 11) + '  ' + row.join(''));
}

console.log('\n== 5c. self-similarity: maxsum_m(new) / maxsum_m(old) ==');
console.log('fold          ' + Array.from({ length: M }, (_, j) => pad('m=' + (j + 1), 7)).join(''));
for (const F of folds) {
  if (F.old.S.length <= 60) continue;
  console.log(pad(`T${F.old.x}->T${F.p}`, 11) + '  ' +
    Array.from({ length: M }, (_, j) => pad((F.ms[j + 1] / F.old.ms[j + 1]).toFixed(3), 7)).join(''));
}

console.log('\n== 5b. chained lower bound from R1: G2(T_x) >= maxsum_{1+d}(T_{x-d folds}) ==');
console.log('  (each step down the ladder costs one index in m)');
for (const L of shown) {
  if (L.S.length <= 60) continue;
  const chain = [];
  let d = 0;
  for (let i = levels.indexOf(L); i >= 0; i--, d++) {
    if (d + 1 >= levels[i].S.length) break;
    chain.push(`maxsum_${d + 1}(T${levels[i].x}) = ${levels[i].ms[d + 1]}`);
  }
  console.log(`  G2(T${L.x}) = ${L.ms[1]} >= ` + chain.slice(1).join(' >= '));
}

// ---- 6. the deep fold T23 -> T29 (214.7M slots), only with --t29 ------------
if (DO29) {
  console.log('\n== 6. the deep fold T23 -> T29 ==');
  const T23 = byX.get(23);
  const F = streamFold(T23, 29, 20, 'T23->T29');
  F.old = T23; F.p = 29;
  console.log(`  T23 -> T29: D = ${F.D} (expect 214708725), L(fold) = ${F.L}, ` +
    `G2 = ${F.ms[1]}  [${F.secs.toFixed(1)}s]`);
  console.log('  maxsum_m(T29), m = 1..8: ' + F.ms.slice(1, 9).join(', '));
  relTable([F]);
  const C = copyTheorem(F, MR);
  const bad = [];
  for (let m = 1; m <= MR; m++) if (C.best[m] !== F.ms[m]) bad.push(`m=${m}: ${C.best[m]} vs ${F.ms[m]}`);
  console.log('  copy theorem at T23->T29: ' + (bad.length ? 'FAILS ' + bad.join('; ') : 'EXACT for m = 1..8') +
    `, L(copy) = ${C.maxrun}  [${el()}]`);
}
// ---- 7. correction: the longest adjacent-kill run, scanned properly ---------
// research/killrun.js streams residues and keeps (prev, other) for the current
// 2-set, but `prev` holds the FIRST value of the run, not the previous element,
// so when a third value arrives it tests the wrong pair. Sequence a, a+2, a-2
// is scored as a run of 2 on {a, a-2} although the last two elements differ by
// 4 and no 2-set contains them. That overcounts. Correct detector below, with
// `last` tracked explicitly; validated against exhaustive search.
// Exact: for each position walk back while the suffix still fits one 2-set.
// The walk is O(current run length), so O(1) amortised in practice.
function maxKillRun(next, p, CAP = 64) {
  const ok = (a, b) => { if (a === b) return true; const d = Math.abs(a - b); return d === 2 || d === p - 2; };
  const buf = new Int32Array(CAP);
  let t = 0, best = 0;
  for (;;) {
    const r = next();
    if (r < 0) break;
    buf[t % CAP] = r;
    let u = r, v = -1, len = 1;
    for (let j = 1; j < CAP && j <= t; j++) {
      const x = buf[(t - j) % CAP];
      if (x === u || x === v) { len = j + 1; continue; }
      if (v === -1 && ok(u, x)) { v = x; len = j + 1; continue; }
      break;
    }
    if (len > best) best = len;
    t++;
  }
  return best;
}

console.log('\n== 7. the adjacent-kill run L, rescanned (killrun.js overcounts) ==');
for (const F of folds) {
  if (F.old.S.length <= 60) continue;
  const S = F.old.S, p = F.p; let i = 0;
  const run = maxKillRun(() => (i < S.length ? S[i++] % p : -1), p);
  console.log(`  fold p=${p} on T${F.old.x}: fixed scan L = ${run}, ` +
    `from the actual fold L = ${F.L}  ${run === F.L ? 'AGREE' : 'DISAGREE'}`);
}
{ // fold 29 on T23: killrun.js reports 3. Fixed scan, plus an exhaustive check.
  const T23 = byX.get(23), S = T23.S, D = S.length, p = 29;
  let i = 0;
  const run = maxKillRun(() => (i < D ? S[i++] % p : -1), p);
  const okset = (a, b, c) => {
    const u = [...new Set([a, b, c])];
    if (u.length > 2) return false;
    if (u.length < 2) return true;
    const d = Math.abs(u[0] - u[1]); return d === 2 || d === p - 2;
  };
  let triples = 0;
  for (let j = 0; j < D; j++)
    if (okset(S[j] % p, S[(j + 1) % D] % p, S[(j + 2) % D] % p)) triples++;
  console.log(`  fold p=29 on T23: fixed scan L = ${run} (killrun.js reported 3); ` +
    `exhaustive count of killable TRIPLES of consecutive slots = ${triples}, so L = 2 is right`);
}
if (DO29) {
  const T23 = byX.get(23), W = T23.W, S = T23.S, D = S.length, pf = 29, pn = 31;
  const res = new Int32Array(D); for (let i = 0; i < D; i++) res[i] = S[i] % pf;
  const resn = new Int32Array(D); for (let i = 0; i < D; i++) resn[i] = S[i] % pn;
  const wn = W % pn;
  let k = 0, i = 0, n = 0;
  const next = () => {
    for (;;) {
      if (k >= pf) return -1;
      const a = ((-k * (W % pf)) % pf + pf) % pf, a2 = (a + pf - 2) % pf;
      const r = res[i], rn = (resn[i] + k * wn) % pn;
      i++; if (i >= D) { i = 0; k++; if (n && k < pf) console.log(`    ...T29 mod 31 copy ${k}/${pf} [${el()}]`); }
      if (r !== a && r !== a2) { n++; return rn; }
    }
  };
  const run = maxKillRun(next, pn);
  console.log(`  fold p=31 on T29: fixed scan L = ${run} (killrun.js reported 4), ${n} slots [${el()}]`);
}
console.log('\ndone [' + el() + ']');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/a3-04-maxsum-recursion.js -- --t29
//   invocation:  node research/a3-04-maxsum-recursion.js --t29
//   code-sha256: f57d20569cd748bfb83ff51fd1211d9e2c2e1714ed1eedc7a767aa7d1b783cbb
//   out-sha256:  3c46a0c3da70b4f58d309d7221f1e937d9e1d5d49633a434fbc2a994e1ec79d5
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     72.3 s
// ============================================================================
// == 0. custody: build the tiles ==
//   built T7: width 210, 15 slots  [0.0s]
//   built T11: width 2310, 135 slots  [0.0s]
//   built T13: width 30030, 1485 slots  [0.0s]
//   built T17: width 510510, 22275 slots  [0.0s]
//   built T19: width 9699690, 378675 slots  [0.0s]
//   built T23: width 223092870, 7952175 slots  [0.8s]
//
// == 1. maxsum_m, m = 1..12 (maxsum_1 must be 12, 42, 66, 108, 150, 204) ==
// tile  D          mbar       m=1    m=2    m=3    m=4    m=5    m=6    m=7    m=8    m=9   m=10   m=11   m=12
//   T7         15   14.00        30     42     66     78     96    108    126    138    150    162    174    180
//  T11        135   17.11        42     66     96    108    138    156    168    180    192    204    210    240
//  T13       1485   20.22        66     96    138    156    168    186    204    228    240    282    300    330
//  T17      22275   22.92       108    150    168    198    210    240    258    288    348    372    384    390
//  T19     378675   25.61       150    186    210    228    282    300    348    378    390    462    498    528
//  T23    7952175   28.05       204    234    300    348    390    462    498    528    540    570    582    612
//   [1.5s]
//
// -- maxsum_m / m (max AVERAGE gap over m consecutive; must fall in m) --
// tile  mbar         m=1     m=2     m=3     m=4     m=5     m=6     m=7     m=8     m=9    m=10    m=11    m=12
//   T7  14.00     30.00   21.00   22.00   19.50   19.20   18.00   18.00   17.25   16.67   16.20   15.82   15.00
//  T11  17.11     42.00   33.00   32.00   27.00   27.60   26.00   24.00   22.50   21.33   20.40   19.09   20.00
//  T13  20.22     66.00   48.00   46.00   39.00   33.60   31.00   29.14   28.50   26.67   28.20   27.27   27.50
//  T17  22.92    108.00   75.00   56.00   49.50   42.00   40.00   36.86   36.00   38.67   37.20   34.91   32.50
//  T19  25.61    150.00   93.00   70.00   57.00   56.40   50.00   49.71   47.25   43.33   46.20   45.27   44.00
//  T23  28.05    204.00  117.00  100.00   87.00   78.00   77.00   71.14   66.00   60.00   57.00   52.91   51.00
//
// -- the same, normalised by mbar: (maxsum_m/m)/mbar --
// tile       m=1     m=2     m=3     m=4     m=5     m=6     m=7     m=8     m=9    m=10    m=11    m=12
//   T7     2.143   1.500   1.571   1.393   1.371   1.286   1.286   1.232   1.190   1.157   1.130   1.071
//  T11     2.455   1.929   1.870   1.578   1.613   1.519   1.403   1.315   1.247   1.192   1.116   1.169
//  T13     3.264   2.374   2.275   1.929   1.662   1.533   1.441   1.409   1.319   1.395   1.349   1.360
//  T17     4.712   3.272   2.443   2.160   1.833   1.745   1.608   1.571   1.687   1.623   1.523   1.418
//  T19     5.856   3.631   2.733   2.225   2.202   1.952   1.941   1.845   1.692   1.804   1.767   1.718
//  T23     7.272   4.170   3.565   3.101   2.780   2.745   2.536   2.353   2.139   2.032   1.886   1.818
//
// -- the step-4 slope: (maxsum_j - maxsum_1) / ((j-1) * mbar), should be 1 --
// tile       j=2     j=3     j=4     j=5     j=6     j=7     j=8     j=9    j=10    j=11    j=12
//  T11      1.40    1.58    1.29    1.40    1.33    1.23    1.15    1.10    1.05    0.98    1.05
//  T13      1.48    1.78    1.48    1.26    1.19    1.14    1.14    1.08    1.19    1.16    1.19
//  T17      1.83    1.31    1.31    1.11    1.15    1.09    1.12    1.31    1.28    1.20    1.12
//  T19      1.41    1.17    1.02    1.29    1.17    1.29    1.27    1.17    1.35    1.36    1.34
//  T23      1.07    1.71    1.71    1.66    1.84    1.75    1.65    1.50    1.45    1.35    1.32
//
// subadditivity maxsum_{a+b} <= maxsum_a + maxsum_b, a,b <= 8: 0 violations
//
// == 2/3. the fold: merge word, L, and the candidate relations ==
//   T5 -> T7: D 15, L(fold) = 2, stream reproduces built tile: YES  [0.00s]
//   T7 -> T11: D 135, L(fold) = 1, stream reproduces built tile: YES  [0.00s]
//   T11 -> T13: D 1485, L(fold) = 2, stream reproduces built tile: YES  [0.00s]
//   T13 -> T17: D 22275, L(fold) = 2, stream reproduces built tile: YES  [0.05s]
//   T17 -> T19: D 378675, L(fold) = 2, stream reproduces built tile: YES  [0.08s]
//     ...T19->T23 copy 8/23, 3111728 slots [2.4s]
//     ...T19->T23 copy 12/23, 4494707 slots [2.7s]
//     ...T19->T23 copy 16/23, 5877694 slots [3.0s]
//     ...T19->T23 copy 20/23, 7260680 slots [3.2s]
//   T19 -> T23: D 7952175, L(fold) = 3, stream reproduces built tile: YES  [1.47s]
//
// -- K(m): most old gaps that m consecutive new gaps can span --
// fold          L      m=1   m=2   m=3   m=4   m=5   m=6   m=7   m=8   K(m)-m
//    T11->T13   2        3     4     5     6     8     9    10    12   2,2,2,2,3,3,3,4
//    T13->T17   2        3     4     5     7     8     9    10    12   2,2,2,3,3,3,3,4
//    T17->T19   2        3     4     6     7     8     9    10    12   2,2,3,3,3,3,3,4
//    T19->T23   3        4     6     7     8    10    11    12    13   3,4,4,4,5,5,5,5
//
// -- R1 (lower)  maxsum_{m+1}(old) <= maxsum_m(new) ?  shown: maxsum_m(new) / maxsum_{m+1}(old), * = FAILS --
// fold               m=1     m=2     m=3     m=4     m=5     m=6     m=7     m=8
//    T11->T13    1.000   1.000   1.278   1.130   1.077   1.107   1.133   1.188
//    T13->T17    1.125   1.087   1.077   1.179   1.129   1.176   1.132   1.200
//    T17->T19    1.000   1.107   1.061   1.086   1.175   1.163   1.208   1.086
//    T19->T23    1.097   1.114   1.316   1.234   1.300   1.328   1.317   1.354
//
// -- R2 (the natural guess)  maxsum_m(new) <= maxsum_{m+L}(old) ?  shown: ratio new/old_{m+L}, * = FAILS --
// fold               m=1     m=2     m=3     m=4     m=5     m=6     m=7     m=8
//    T11->T13    0.688   0.889   1.000   1.000   1.000   1.033*  1.063*  1.118*
//    T13->T17    0.783   0.962   1.000   1.065*  1.029*  1.053*  1.075*  1.021*
//    T17->T19    0.893   0.939   1.000   0.950   1.093*  1.042*  1.000   1.016*
//    T19->T23    0.895   0.830   1.000   1.000   1.032*  1.185*  1.078*  1.060*
//
// -- R3  excess over the lower bound, in old mean gaps: (maxsum_m(new) - maxsum_{m+1}(old)) / mbar(old) --
// fold        mbar       m=1     m=2     m=3     m=4     m=5     m=6     m=7     m=8
//    T11->T13  17.1      0.00    0.00    1.75    1.05    0.70    1.05    1.40    2.10
//    T13->T17  20.2      0.59    0.59    0.59    1.48    1.19    1.78    1.48    2.37
//    T17->T19  22.9      0.00    0.79    0.52    0.79    1.83    1.83    2.62    1.31
//    T19->T23  25.6      0.70    0.94    2.81    2.58    3.51    4.45    4.68    5.39
//
// -- R4  K(m) <= m + L ?  (excess K(m) - m - L, negative or 0 = holds) --
//    T11->T13     0   0   0   0   1   1   1   2    FAILS at 4 of 8
//    T13->T17     0   0   0   1   1   1   1   2    FAILS at 5 of 8
//    T17->T19     0   0   1   1   1   1   1   2    FAILS at 6 of 8
//    T19->T23     0   1   1   1   2   2   2   2    FAILS at 7 of 8
//
// -- the exact bound maxsum_m(new) <= maxsum_{K(m)}(old) (must hold), with its slack --
// fold               m=1     m=2     m=3     m=4     m=5     m=6     m=7     m=8
//    T11->T13    0.688   0.889   1.000   1.000   0.933   0.969   1.000   0.950
//    T13->T17    0.783   0.962   1.000   0.971   0.921   1.000   0.915   0.873
//    T17->T19    0.893   0.939   0.875   0.884   0.979   0.862   0.935   0.969
//    T19->T23    0.895   0.780   0.862   0.921   0.844   0.928   0.943   0.978
//
// -- j*(m): the SHARP shift, smallest j with maxsum_m(new) <= maxsum_{m+j}(old) --
// fold          L     m=1  m=2  m=3  m=4  m=5  m=6  m=7  m=8   max j*
//    T11->T13   2      1=   1=   2=   2=   2=   3    3=   4        4
//    T13->T17   2      2    2    2=   3    3    3=   3    3        3
//    T17->T19   2      1=   2    2=   2    3    3    2=   3        3
//    T19->T23   3      2    3    3=   3=   4=   4=   4=   4=       4
//
// -- R5  maxsum_m(new) <= maxsum_{m+1}(old) + G2(old) ?  shown: (new_m - old_{m+1}) / G2(old), * = FAILS (>1) --
// fold               m=1     m=2     m=3     m=4     m=5     m=6     m=7     m=8
//    T11->T13    0.000   0.000   0.714   0.429   0.286   0.429   0.571   0.857
//    T13->T17    0.182   0.182   0.182   0.455   0.364   0.545   0.455   0.727
//    T17->T19    0.000   0.167   0.111   0.167   0.389   0.389   0.556   0.278
//    T19->T23    0.120   0.160   0.480   0.440   0.600   0.760   0.800   0.920
//
// == 4. copy theorem for the family: is maxsum_m(new) = max over the p 2-sets of maxsum_m(old minus {a,a-2})? ==
// fold        L(copy) L(fold)      m=1    m=2    m=3    m=4    m=5    m=6    m=7    m=8   verdict
//    T11->T13    2       2        =      =      =      =      =      =      =      =   EXACT for all m
//    T13->T17    2       2        =      =      =      =      =      =      =      =   EXACT for all m
//    T17->T19    2       2        =      =      =      =      =      =      =      =   EXACT for all m
//    T19->T23    3       3        =      =      =      =      =      =      =      =   EXACT for all m
//   [4.0s]
//
// == 5a. R5 pushed to m = 12: (maxsum_m(new) - maxsum_{m+1}(old)) / G2(old) ==
// fold              m=1    m=2    m=3    m=4    m=5    m=6    m=7    m=8    m=9   m=10   m=11   m=12
//    T11->T13    0.00   0.00   0.71   0.43   0.29   0.43   0.57   0.86   0.86   1.71*  1.43*  1.71*
//    T13->T17    0.18   0.18   0.18   0.45   0.36   0.55   0.45   0.73   1.00   1.09*  0.82   0.64
//    T17->T19    0.00   0.17   0.11   0.17   0.39   0.39   0.56   0.28   0.17   0.72   1.00   0.72
//    T19->T23    0.12   0.16   0.48   0.44   0.60   0.76   0.80   0.92   0.52   0.48   0.36   0.48
//
// == 5c. self-similarity: maxsum_m(new) / maxsum_m(old) ==
// fold              m=1    m=2    m=3    m=4    m=5    m=6    m=7    m=8    m=9   m=10   m=11   m=12
//    T11->T13    1.571  1.455  1.438  1.444  1.217  1.192  1.214  1.267  1.250  1.382  1.429  1.375
//    T13->T17    1.636  1.563  1.217  1.269  1.250  1.290  1.265  1.263  1.450  1.319  1.280  1.182
//    T17->T19    1.389  1.240  1.250  1.152  1.343  1.250  1.349  1.313  1.121  1.242  1.297  1.354
//    T19->T23    1.360  1.258  1.429  1.526  1.383  1.540  1.431  1.397  1.385  1.234  1.169  1.159
//
// == 5b. chained lower bound from R1: G2(T_x) >= maxsum_{1+d}(T_{x-d folds}) ==
//   (each step down the ladder costs one index in m)
//   G2(T11) = 42 >= maxsum_2(T7) = 42
//   G2(T13) = 66 >= maxsum_2(T11) = 66 >= maxsum_3(T7) = 66
//   G2(T17) = 108 >= maxsum_2(T13) = 96 >= maxsum_3(T11) = 96 >= maxsum_4(T7) = 78
//   G2(T19) = 150 >= maxsum_2(T17) = 150 >= maxsum_3(T13) = 138 >= maxsum_4(T11) = 108 >= maxsum_5(T7) = 96
//   G2(T23) = 204 >= maxsum_2(T19) = 186 >= maxsum_3(T17) = 168 >= maxsum_4(T13) = 156 >= maxsum_5(T11) = 138 >= maxsum_6(T7) = 108
//
// == 6. the deep fold T23 -> T29 ==
//     ...T23->T29 copy 8/29, 66633738 slots [10.7s]
//     ...T23->T29 copy 12/29, 96248725 slots [14.7s]
//     ...T23->T29 copy 16/29, 125863736 slots [19.0s]
//     ...T23->T29 copy 20/29, 155478747 slots [23.5s]
//     ...T23->T29 copy 24/29, 185093750 slots [27.8s]
//     ...T23->T29 copy 28/29, 214708725 slots [31.6s]
//   T23 -> T29: D = 214708725 (expect 214708725), L(fold) = 2, G2 = 258  [26.9s]
//   maxsum_m(T29), m = 1..8: 258, 330, 390, 420, 510, 540, 552, 582
//
// -- K(m): most old gaps that m consecutive new gaps can span --
// fold          L      m=1   m=2   m=3   m=4   m=5   m=6   m=7   m=8   K(m)-m
//    T23->T29   2        3     5     6     7     9    10    11    12   2,3,3,3,4,4,4,4
//
// -- R1 (lower)  maxsum_{m+1}(old) <= maxsum_m(new) ?  shown: maxsum_m(new) / maxsum_{m+1}(old), * = FAILS --
// fold               m=1     m=2     m=3     m=4     m=5     m=6     m=7     m=8
//    T23->T29    1.103   1.100   1.121   1.077   1.104   1.084   1.045   1.078
//
// -- R2 (the natural guess)  maxsum_m(new) <= maxsum_{m+L}(old) ?  shown: ratio new/old_{m+L}, * = FAILS --
// fold               m=1     m=2     m=3     m=4     m=5     m=6     m=7     m=8
//    T23->T29    0.860   0.948   1.000   0.909   1.024*  1.023*  1.022*  1.021*
//
// -- R3  excess over the lower bound, in old mean gaps: (maxsum_m(new) - maxsum_{m+1}(old)) / mbar(old) --
// fold        mbar       m=1     m=2     m=3     m=4     m=5     m=6     m=7     m=8
//    T23->T29  28.1      0.86    1.07    1.50    1.07    1.71    1.50    0.86    1.50
//
// -- R4  K(m) <= m + L ?  (excess K(m) - m - L, negative or 0 = holds) --
//    T23->T29     0   1   1   1   2   2   2   2    FAILS at 7 of 8
//
// -- the exact bound maxsum_m(new) <= maxsum_{K(m)}(old) (must hold), with its slack --
// fold               m=1     m=2     m=3     m=4     m=5     m=6     m=7     m=8
//    T23->T29    0.860   0.846   0.844   0.843   0.944   0.947   0.948   0.951
//
// -- j*(m): the SHARP shift, smallest j with maxsum_m(new) <= maxsum_{m+j}(old) --
// fold          L     m=1  m=2  m=3  m=4  m=5  m=6  m=7  m=8   max j*
//    T23->T29   2      2    2    2=   2    3    3=   3    3=       3
//
// -- R5  maxsum_m(new) <= maxsum_{m+1}(old) + G2(old) ?  shown: (new_m - old_{m+1}) / G2(old), * = FAILS (>1) --
// fold               m=1     m=2     m=3     m=4     m=5     m=6     m=7     m=8
//    T23->T29    0.118   0.147   0.206   0.147   0.235   0.206   0.118   0.206
//     ...2-set 1/29 [32.2s]
//     ...2-set 2/29 [32.9s]
//     ...2-set 3/29 [33.4s]
//     ...2-set 4/29 [33.9s]
//     ...2-set 5/29 [34.7s]
//     ...2-set 6/29 [35.2s]
//     ...2-set 7/29 [36.0s]
//     ...2-set 8/29 [36.7s]
//     ...2-set 9/29 [37.4s]
//     ...2-set 10/29 [38.1s]
//     ...2-set 11/29 [38.8s]
//     ...2-set 12/29 [39.5s]
//     ...2-set 13/29 [40.0s]
//     ...2-set 14/29 [40.5s]
//     ...2-set 15/29 [41.1s]
//     ...2-set 16/29 [41.8s]
//     ...2-set 17/29 [42.4s]
//     ...2-set 18/29 [43.4s]
//     ...2-set 19/29 [44.0s]
//     ...2-set 20/29 [44.7s]
//     ...2-set 21/29 [45.5s]
//     ...2-set 22/29 [46.1s]
//     ...2-set 23/29 [46.8s]
//     ...2-set 24/29 [47.6s]
//     ...2-set 25/29 [48.4s]
//     ...2-set 26/29 [49.2s]
//     ...2-set 27/29 [50.1s]
//     ...2-set 28/29 [50.8s]
//     ...2-set 29/29 [51.8s]
//   copy theorem at T23->T29: EXACT for m = 1..8, L(copy) = 2  [51.8s]
//
// == 7. the adjacent-kill run L, rescanned (killrun.js overcounts) ==
//   fold p=13 on T11: fixed scan L = 2, from the actual fold L = 2  AGREE
//   fold p=17 on T13: fixed scan L = 2, from the actual fold L = 2  AGREE
//   fold p=19 on T17: fixed scan L = 2, from the actual fold L = 2  AGREE
//   fold p=23 on T19: fixed scan L = 3, from the actual fold L = 3  AGREE
//   fold p=29 on T23: fixed scan L = 2 (killrun.js reported 3); exhaustive count of killable TRIPLES of consecutive slots = 0, so L = 2 is right
//     ...T29 mod 31 copy 1/29 [60.8s]
//     ...T29 mod 31 copy 2/29 [61.2s]
//     ...T29 mod 31 copy 3/29 [61.4s]
//     ...T29 mod 31 copy 4/29 [61.7s]
//     ...T29 mod 31 copy 5/29 [62.1s]
//     ...T29 mod 31 copy 6/29 [62.3s]
//     ...T29 mod 31 copy 7/29 [62.9s]
//     ...T29 mod 31 copy 8/29 [63.2s]
//     ...T29 mod 31 copy 9/29 [63.7s]
//     ...T29 mod 31 copy 10/29 [64.1s]
//     ...T29 mod 31 copy 11/29 [64.6s]
//     ...T29 mod 31 copy 12/29 [65.0s]
//     ...T29 mod 31 copy 13/29 [65.5s]
//     ...T29 mod 31 copy 14/29 [65.8s]
//     ...T29 mod 31 copy 15/29 [66.1s]
//     ...T29 mod 31 copy 16/29 [66.5s]
//     ...T29 mod 31 copy 17/29 [66.8s]
//     ...T29 mod 31 copy 18/29 [67.3s]
//     ...T29 mod 31 copy 19/29 [67.9s]
//     ...T29 mod 31 copy 20/29 [68.4s]
//     ...T29 mod 31 copy 21/29 [68.8s]
//     ...T29 mod 31 copy 22/29 [69.4s]
//     ...T29 mod 31 copy 23/29 [69.9s]
//     ...T29 mod 31 copy 24/29 [70.4s]
//     ...T29 mod 31 copy 25/29 [70.6s]
//     ...T29 mod 31 copy 26/29 [71.0s]
//     ...T29 mod 31 copy 27/29 [71.5s]
//     ...T29 mod 31 copy 28/29 [71.8s]
//   fold p=31 on T29: fixed scan L = 4 (killrun.js reported 4), 214708725 slots [72.0s]
//
// done [72.0s]
// ============================================================================
// READINGS
//
// 1. CUSTODY, first. maxsum_1 reproduces the twin Jacobsthal at every level:
//    12, 30, 42, 66, 108, 150, 204 at T5 through T23, and 258 at T29. The
//    streamed fold reproduces the independently built tile exactly at every
//    level, for all m up to 48, and the deep fold lands on D(T29) =
//    214,708,725 = 3 * prod_{7<=q<=29}(q-2) on the nose. The T23 -> T29 stream
//    takes 26.9s for 214.7M slots. Independent cross-check: the maxsum_m table
//    for m = 1..8 at T11 through T29 agrees digit for digit with the one
//    computed by a different route in research/a3-02-diagonal-f.js reading 8.
//
// 2. THE FRAMEWORK IS AN IDENTITY, NOT A BOUND, AND IT SHOWS WHERE L REALLY
//    LIVES. Any m consecutive gaps of the new tile are, read in the periodic
//    old gap word, exactly ell consecutive old gaps, where
//        ell = m + (number of old slots killed strictly inside the window).
//    This is true across copy boundaries too, since every new slot sits at
//    s + kW and consecutive new slots are consecutive surviving old positions.
//    Writing kappa(m) for the largest kill count inside m consecutive new gaps,
//        maxsum_m(new) <= maxsum_{m + kappa(m)}(old),   kappa(1) = L,
//    with equality of the index whenever the record window is the one that
//    absorbs the most kills. So the family IS closed under folding, but the
//    single unknown L is not eliminated: it becomes a sequence kappa(m). That
//    is the honest answer to A4's question.
//
// 3. THE LOWER RECURSION R1 HOLDS EVERYWHERE:
//        maxsum_{m+1}(old) <= maxsum_m(new)
//    at all five folds and all m = 1..8, 40 cases out of 40, with ratios from
//    1.000 to 1.354 and equality at three places (T11->T13 at m = 1 and 2,
//    T17->T19 at m = 1). This is the m > 1 extension of the proven lower half
//    of U-FRAME 5a step 3, and it chains down the ladder:
//        G2(T23) = 204 >= maxsum_2(T19) = 186 >= maxsum_3(T17) = 168
//                      >= maxsum_4(T13) = 156 >= maxsum_5(T11) = 138
//                      >= maxsum_6(T7)  = 108.
//    Each fold costs one index in m, so the record gap high in the ladder is
//    controlled from below by the deep tail of a small tile. The proof of R1
//    is the same as the m = 1 proof and inherits the same caveat: we need one
//    interior slot of the record window killed in a copy that spares both
//    endpoints, which holds unless the flanking gaps are congruent to 0 or
//    +-2 mod p. Verified, not proven.
//
// 4. R2, THE NATURAL GUESS, IS REFUTED. maxsum_m(new) <= maxsum_{m+L}(old)
//    holds for m <= 3 or 4 and then fails at every single fold:
//        T11->T13, L=2, m=6:  186 > maxsum_8(T11)  = 180
//        T13->T17, L=2, m=4:  198 > maxsum_6(T13)  = 186
//        T17->T19, L=2, m=5:  282 > maxsum_7(T17)  = 258
//        T19->T23, L=3, m=6:  462 > maxsum_9(T19)  = 390   (ratio 1.185)
//        T23->T29, L=2, m=5:  510 > maxsum_7(T23)  = 498
//    The reason is reading 2: L is kappa(1), and kappa grows with m.
//
// 5. R4, kappa(m) <= L, IS REFUTED FOR THE SAME REASON, but kappa grows very
//    slowly. Measured kappa(1..8):
//        T11->T13 (L=2)  2,2,2,2,3,3,3,4
//        T13->T17 (L=2)  2,2,2,3,3,3,3,4
//        T17->T19 (L=2)  2,2,3,3,3,3,3,4
//        T19->T23 (L=3)  3,4,4,4,5,5,5,5
//        T23->T29 (L=2)  2,3,3,3,4,4,4,4
//    So kappa(m) <= L + 2 for all m <= 8 at all five folds, and kappa(8) is
//    only 1 or 2 above kappa(1). kappa is an extreme of a sum of m rare
//    indicators (each new gap swallows a kill with probability about 2/(p-2)),
//    which is why adding seven more gaps to the window barely moves it. The
//    useful reformulation of A5 is therefore: bound kappa(m), not just L.
//
// 6. R5, THE ADDITIVE CANDIDATE WITH NO L, SURVIVES TO m = 8 AND THEN DIES.
//        maxsum_m(new) <= maxsum_{m+1}(old) + G2(old)
//    holds at all five folds for m <= 8, worst case 0.92 of the allowance
//    (T19->T23, m = 8). Pushed to m = 12 it fails:
//        T11->T13, m=10:  maxsum_10(T13) = 282 > 210 + 42 = 252
//        T13->T17, m=10:  maxsum_10(T17) = 372 > 300 + 66 = 366
//    Kept visible as a refuted candidate. In old mean gaps the excess
//    (new_m - old_{m+1})/mbar runs 0.0 to 5.4 and grows with both m and level,
//    so no constant allowance can be right.
//
// 7. THE SHARP SHIFT j*(m) IS SMALLER THAN L, WHICH IS THE MOST USEFUL
//    NUMBER HERE. j*(m) is the smallest j with maxsum_m(new) <= maxsum_{m+j}(old):
//        T11->T13 (L=2)  1,1,2,2,2,3,3,4
//        T13->T17 (L=2)  2,2,2,3,3,3,3,3
//        T17->T19 (L=2)  1,2,2,2,3,3,2,3
//        T19->T23 (L=3)  2,3,3,3,4,4,4,4
//        T23->T29 (L=2)  2,2,2,2,3,3,3,3
//    At m = 1, j* = 1, 2, 1, 2, 2 against L = 2, 2, 2, 3, 2: strictly below L
//    at three of five folds and never above. The next fold down, which we did
//    not stream here, says the same thing more loudly: a3-02-diagonal-f.js
//    measures G2(T31) = 348, and maxsum_2(T29) = 330 < 348 <= maxsum_3(T29) =
//    390, so j*(1) = 2 at fold 31 while L = 4 there. R1 holds at that fold
//    too. So U-FRAME 5a step 3's upper
//    bound G2(new) <= maxsum_{L+1}(old) is loose at the folds we can see, and
//    the L route is bounding something strictly larger than it needs to. Over
//    all five folds and all m <= 8 the sharp shift never exceeds 4, so
//        maxsum_m(new) <= maxsum_{m+4}(old)   for m <= 8
//    holds throughout, with no reference to L. That is measured at five folds,
//    not proven, and it cannot be a law forever: kappa(m) must eventually
//    drift up with the same log D / log(1/f) mechanism that moves L.
//    Exactness is common: maxsum_m(new) equals maxsum_{m+j*}(old) exactly in
//    20 of the 40 cases (marked = in the table), which is the A10 exactness
//    phenomenon showing up across the whole family, not only at m = 1.
//
// 8. THE COPY THEOREM EXTENDS TO THE WHOLE FAMILY, EXACTLY. For every fold and
//    every m = 1..8,
//        maxsum_m(new) = max over the p 2-sets {a, a-2} of maxsum_m of the old
//                        tile with those two residue classes deleted.
//    Checked at T11->T13, T13->T17, T17->T19, T19->T23 and T23->T29: equality
//    in all 40 cases. No window that straddles two copies, and therefore sees
//    two different kill sets, ever beats the best single-copy window. This is
//    the real closure result of A4: the entire family is computable from the
//    old tile by p residue-class deletions, at O(pD) with no new tile in
//    memory. It is closure at the residue level, which is what the misalignment
//    principle predicts, and it does not give a recursion on the NUMBERS
//    maxsum_j(old) alone.
//
// 9. maxsum_m / m FALLS FAST BUT IS NOT MONOTONE. In units of the mean gap, at
//    T23 it runs 7.27, 4.17, 3.57, 3.10, 2.78, 2.75, 2.54, 2.35, 2.14, 2.03,
//    1.89, 1.82, so the max average over 12 consecutive gaps is only 1.8 times
//    the mean while the single record gap is 7.3 times it. That collapse is
//    exactly why the maxsum bound beats the naive (L+1)*G2. But the sequence
//    rises in places: T11 goes 19.09 at m = 11 to 20.00 at m = 12, T13 goes
//    26.67 at m = 9 to 28.20 at m = 10, T17 goes 36.00 at m = 8 to 38.67 at
//    m = 9. The expectation that it must decrease is wrong. What is true is
//    that maxsum is subadditive, maxsum_{a+b} <= maxsum_a + maxsum_b (checked,
//    0 violations over a, b <= 8 at every level), so maxsum_m/m converges by
//    Fekete's lemma to its infimum, without being monotone on the way.
//
// 10. THE STEP-4 SLOPE IS NOT 1. U-FRAME 5a step 4 approximates
//     maxsum_{L+1} = G2 + L*mbar. Measured, (maxsum_j - G2)/((j-1)*mbar) is
//     1.40, 1.58, 1.29, ... at T11 and 1.07, 1.71, 1.71, 1.66, 1.84, 1.75,
//     1.65 at T23. The increment per index is about 1.3 mean gaps at T11 and
//     about 1.7 at T23, and it is rising with the level, not falling. The
//     neighbours of a record gap are not typical gaps: they are drawn from the
//     tail, because large gaps cluster. The additive chain should therefore be
//     read as G2(x#) <~ 12 + c * sum_p L(p)*mbar(p) with c about 1.7 and
//     drifting up, which does not change step 4's shape but does change its
//     constant.
//
// 11. CORRECTION, and it touches a recorded number. research/killrun.js
//     reports the longest adjacent-kill run at fold 29 on T23 as 3. It is 2.
//     The scanner keeps a pair (prev, other) for the current 2-set but never
//     updates prev to the previous ELEMENT, so when a third value arrives it
//     tests the wrong pair: the sequence a, a+2, a-2 is scored as a run of 2
//     on {a, a-2} although its last two elements differ by 4 and no 2-set
//     contains them. Three independent checks give 2: the merge word of the
//     actual fold, a corrected scanner, and an exhaustive count of killable
//     triples of consecutive T23 slots, which is exactly 0. The corrected
//     scanner agrees with the actual fold at every fold we can cross-check
//     (13, 17, 19, 23) and reproduces 4 at fold 31 on T29. So the diagonal in
//     U-FRAME 5a step 6 should read
//         fold  7 11 13 17 19 23 29 31
//         L     2  1  2  2  2  3  2  4
//     and L is NOT monotone in the fold: it dips back to 2 at p = 29. Any
//     reading of L against f (A2, A5) has to use the corrected series.
//
// 12. VERDICT ON A4. The win condition, a closed recursion that replaces the
//     open dependence on L, is NOT met. The family is closed under folding,
//     but in the residue-level sense of reading 8, and the L parameter
//     generalises rather than disappears: it becomes kappa(m), with kappa(1)
//     = L. Every candidate that removes L outright is refuted with explicit
//     counterexamples (R2 in reading 4, R4 in reading 5, R5 in reading 6).
//     What the wave does buy is three things. First, the exact statement of
//     what must be bounded, kappa(m), a quantity with far better tail
//     structure than a longest run. Second, R1, an exact lower recursion for
//     the whole family and a chain that carries a small tile's deep maxsum up
//     the ladder. Third, the measurement that j*(1) < L at three of five
//     folds, which says the current upper bound is not tight and that a proof
//     aimed at L is aiming past the target.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   3.565 -> 3.57, 2.745 -> 2.75, 2.536 -> 2.54, 1.886 -> 1.89, 1.818 -> 1.82.
//   All five sit in the T23 row of the normalised (maxsum_m/m)/mbar table in
//   section 1, quoted to two places in reading 9.
//   214708725 slots -> "214.7M slots" in reading 1.
// TOKENIZER ARTIFACT, not a figure: the four comma lists in reading 7,
//   1,1,2,2,2,3,3,4 and 2,2,2,3,3,3,3,3 and 1,2,2,2,3,3,2,3 and
//   2,2,2,2,3,3,3,3, are the j*(m) rows for T11->T13, T13->T17, T17->T19 and
//   T23->T29 rewritten as one comma list each. The OUTPUT prints the same
//   eight cells space separated with an = marker on the exact cases, for
//   example T11->T13 as "1=  1=  2=  2=  2=  3  3=  4". Values agree cell for
//   cell. The scanner reads each list as a single unknown number.
// DERIVED IN THIS READING by arithmetic over printed values:
//   252 = maxsum_11(T11) 210 + G2(T11) 42, against maxsum_10(T13) = 282.
//   366 = maxsum_11(T13) 300 + G2(T13) 66, against maxsum_10(T17) = 372.
//   Both addends and both left sides are in the section 1 table. Checked.
// IN-CODE: 214.7 also appears as the label "214.7M slots" in the header
//   comment and in the section 6 banner of the code above.
// CORRECTED 2026-08-20 (mismatch adjudication #7): reading 1's "takes 14.4s
//   for 214.7M slots" is now 26.9s (old -> new: 14.4s -> 26.9s). The embedded
//   run prints "T23 -> T29: D = 214708725 ... [26.9s]" for that fold, and
//   [31.6s] of wall clock at the last copy; 14.4s was a timing from an
//   invocation that was never pasted here. It is a machine speed, load-bearing
//   on nothing, but a reading may not contradict the block above it, and the
//   reading now quotes the fold's own printed elapsed.
// ---------------------------------------------------------------------------
