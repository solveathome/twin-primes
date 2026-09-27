// import-maxplus-01-mapping.js
//
// FOREIGN IMPORT 4 of 5, stage 1 and stage 3: MAX-PLUS (TROPICAL) SPECTRAL
// THEORY applied to the fold recursion.
//
// THE IMPORT. Max-plus (tropical) linear algebra is the semiring
// (R u {-inf}, max, +): "sum" is max, "product" is +. Iterated max-plus systems
// have a Perron-Frobenius theory -- Cuninghame-Green 1979; Baccelli, Cohen,
// Olsder and Quadrat, "Synchronization and Linearity" (Wiley 1992) ch. 3;
// Heidergott, Olsder, van der Woude, "Max Plus at Work" (Princeton 2006) --
// with an eigenvalue equal to the maximum cycle mean (Karp 1978), an eigenvector,
// a cyclicity and a transient, and Lyapunov exponents for products of matrices
// (Cohen 1988; Mairesse 1997; Bousch-Mairesse 2002 on tetris heaps).
//
// WHY IT LOOKS LIKE OUR PROBLEM. U-FRAME.md 5a step 2 is literally a max-plus
// statement: maxsum_m(new) = max over the p 2-sets {a, a-2} of maxsum_m(old
// minus those classes), and G2 = maxsum_1. "max of sums" IS the max-plus
// operator norm of a power of a transfer matrix.
//
// WHAT THIS FILE ESTABLISHES, and it is a mapping plus two negatives:
//
//   1a  The transfer matrix. For a tile T with cyclic gap word g_0..g_{D-1},
//       A(T) is the D x D max-plus matrix with A[i][i+1 mod D] = g_i and
//       -inf elsewhere. Then ||A^{ox m}||_max = maxsum_m(T), exactly. VERIFIED
//       by DENSE max-plus matrix powers (no shortcut) at T_7 and T_11.
//
//   1b  The max-plus eigenvalue. lambda(A) = maximum cycle mean = W/D = mbar,
//       the MEAN gap. VERIFIED by Karp's algorithm, independently of the
//       formula, at T_5..T_13.
//
//   1c  So G2 is the NORM of the operator, not its eigenvalue. The tropical
//       Perron root of the tile is Mertens' mean gap (polylog in x); G2 grows
//       like x^{1.5..}. Max-plus spectral theory applied to the natural
//       operator answers a question the corpus already answered, and does not
//       reach G2. This is the first honest negative of the import.
//
//   1d  The fold as a max-plus operation: p-fold cyclic DUPLICATION followed by
//       max-plus STATE ELIMINATION of the deleted vertices, one distinct
//       2-residue-class per copy. Elimination in a max-plus path is the
//       ox-product of the two incident weights. VERIFIED to reproduce the true
//       fold's gap word exactly, as a cyclic sequence, at folds 5->7 .. 17->19.
//
//   1e  What does NOT close. The state that closes under folding is the whole
//       matrix (equivalently the whole gap word), dimension D = prod(q-2). The
//       finite reduction (maxsum_1..maxsum_M) does not close, because the
//       elimination PATTERN is a function of the residues of the partial sums
//       mod p, which the maxsum vector does not carry. The defect is measured
//       here: all p alignments of a fold share ONE plain maxsum vector (the same
//       tile), so the whole spread of Delta_m across alignments is exactly the
//       information the reduction loses.
//
//   3a  The alternation automaton is MIN-plus, and A5's Theorem A is its
//       Perron-Frobenius theorem. Two states {a, a-2}; legal transitions weighted
//       by the least qualifying gap in each class. Minimum cycle mean = 3p
//       EXACTLY, critical circuit = the 2-cycle, eigenvector (0, p+2).
//       So c_min = 3p is an eigenvalue, and "the alternation condition is worth
//       exactly 3/2 and no more" (kappa-not-L.md) is the sharpness of a Perron
//       root, not a loose estimate.
//
//   3b  The record runs ARE the critical circuit, exactly. Recomputed here from
//       the tiles at every fold with L >= 2.
//
//   3c  The max-plus EIGENVECTOR of the tile is u_i = S_i - i*mbar (tilted
//       partial sums), and its spread is exactly max_m (maxsum_m - m*mbar).
//       Measured against G2.
//
// WHAT IT DOES NOT DO. It computes no bound, fits nothing, and recomputes
// nothing that already carries an embedded artifact: the alignment spread at
// x = 23 and 29 is CITED from research/attack-0c0e-01-deleted-family.js's
// embedded table (a), not recomputed.
//
// usage: node research/import-maxplus-01-mapping.js [maxTile]   default 23

'use strict';

const ARGV_MAX = Number(process.argv[2] || 23);
const T0 = Date.now();
const log = (s) => process.stderr.write('[' + ((Date.now() - T0) / 1000).toFixed(1) + 's] ' + s + '\n');
const F = (v, d = 4) => (Number.isFinite(v) ? v.toFixed(d) : ' n/a');
const pad = (s, n) => String(s).padStart(n);
const NEG = -Infinity;

let FAILS = 0;
function check(label, ok, detail) {
  if (!ok) { FAILS++; console.log('  FAIL  ' + label + (detail ? '   ' + detail : '')); }
  else console.log('  ok    ' + label + (detail ? '   ' + detail : ''));
}

// ------------------------------------------------------------- tile generation
// Identical to research/attack-0c0e-01-deleted-family.js (which credits
// U-FRAME 5a step 1): T_3 = {5 mod 6}; folding by p lays p copies and deletes
// residues {-kw, -kw-2} mod p in copy k.
function baseTile() { return { slots: Float64Array.from([5]), W: 6, x: 3 }; }
function foldTile(tile, p) {
  const { slots, W } = tile, D = slots.length;
  const rs = new Int32Array(D);
  for (let i = 0; i < D; i++) rs[i] = slots[i] % p;
  const wp = W % p;
  const out = new Float64Array(D * (p - 2));
  let n = 0;
  for (let k = 0; k < p; k++) {
    const off = k * W, kw = (k * wp) % p;
    const d0 = (p - kw) % p, d2 = (2 * p - 2 - kw) % p;
    for (let i = 0; i < D; i++) if (rs[i] !== d0 && rs[i] !== d2) out[n++] = slots[i] + off;
  }
  if (n !== out.length) throw new Error('kill count wrong at p=' + p);
  return { slots: out, W: W * p, x: p };
}
function gapsOfTile(tile) {
  const { slots, W } = tile, D = slots.length;
  const g = new Float64Array(D);
  for (let i = 0; i < D; i++) g[i] = (i + 1 < D ? slots[i + 1] : slots[0] + W) - slots[i];
  return g;
}
// maxsum_m for m = 1..M over a cyclic gap word: sliding window on the doubled word.
function maxsums(g, M) {
  const D = g.length, best = new Float64Array(M + 1);
  for (let m = 1; m <= M; m++) {
    let s = 0;
    for (let i = 0; i < m; i++) s += g[i % D];
    let b = s;
    for (let i = 1; i < D; i++) { s += g[(i + m - 1) % D] - g[(i - 1) % D]; if (s > b) b = s; }
    best[m] = b;
  }
  return best;
}

// ------------------------------------------------- dense max-plus linear algebra
function cycleMatrix(g) {
  const D = g.length, A = [];
  for (let i = 0; i < D; i++) { const r = new Float64Array(D).fill(NEG); r[(i + 1) % D] = g[i]; A.push(r); }
  return A;
}
function mpMul(A, B) {
  const D = A.length, C = [];
  for (let i = 0; i < D; i++) {
    const r = new Float64Array(D).fill(NEG), Ai = A[i];
    for (let k = 0; k < D; k++) {
      const a = Ai[k]; if (a === NEG) continue;
      const Bk = B[k];
      for (let j = 0; j < D; j++) { const b = Bk[j]; if (b === NEG) continue; const v = a + b; if (v > r[j]) r[j] = v; }
    }
    C.push(r);
  }
  return C;
}
function mpNorm(A) { let b = NEG; for (const r of A) for (let j = 0; j < r.length; j++) if (r[j] > b) b = r[j]; return b; }

// Karp 1978, maximum cycle mean of a strongly connected digraph, O(V*E).
// Returns max over cycles C of (weight(C)/length(C)). Independent of the W/D
// formula: it never sees W or D as such.
function karpMaxCycleMean(adj, n) {   // adj[i] = [[j, w], ...]
  const INF = -Infinity;
  const d = [];                        // d[k][v] = max weight of a k-edge walk 0 -> v
  d.push(new Float64Array(n).fill(INF)); d[0][0] = 0;
  for (let k = 1; k <= n; k++) {
    const prev = d[k - 1], cur = new Float64Array(n).fill(INF);
    for (let u = 0; u < n; u++) { if (prev[u] === INF) continue; for (const [v, w] of adj[u]) { const t = prev[u] + w; if (t > cur[v]) cur[v] = t; } }
    d.push(cur);
  }
  let best = INF;
  for (let v = 0; v < n; v++) {
    if (d[n][v] === INF) continue;
    let mn = Infinity;
    for (let k = 0; k < n; k++) { if (d[k][v] === INF) continue; const t = (d[n][v] - d[k][v]) / (n - k); if (t < mn) mn = t; }
    if (mn !== Infinity && mn > best) best = mn;
  }
  return best;
}
// min-plus version: minimum cycle mean (same algorithm with min/max swapped).
function karpMinCycleMean(adj, n) {
  const neg = adj.map((row) => row.map(([j, w]) => [j, -w]));
  return -karpMaxCycleMean(neg, n);
}

// ================================================================== the run
console.log('='.repeat(78));
console.log('IMPORT 4 (MAX-PLUS) -- STAGE 1: THE MAPPING, AND STAGE 3: PERRON');
console.log('='.repeat(78));
console.log('Semiring (max, +). A(T)[i][i+1] = g_i on the cyclic gap word.');
console.log('');

const PRIMES = [5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
const tiles = {};
{
  let t = baseTile(); tiles[3] = t;
  for (const p of PRIMES) { if (p > ARGV_MAX) break; t = foldTile(t, p); tiles[p] = t; log('built T_' + p + '  D = ' + t.slots.length); }
}
const LEVELS = Object.keys(tiles).map(Number).sort((a, b) => a - b);

console.log('-'.repeat(78));
console.log('SELF-TESTS');
console.log('-'.repeat(78));
{
  let D = 1;
  for (const x of LEVELS) {
    if (x > 3) D *= (x - 2);
    check('D(T_' + x + ') = prod (q-2)', tiles[x].slots.length === D, 'D = ' + D);
  }
  // the exact ladder, A144311 + 1
  const LAD = { 3: 6, 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204 };
  for (const x of LEVELS) {
    const ms = maxsums(gapsOfTile(tiles[x]), 1);
    check('G2(' + x + '#) = ' + LAD[x], ms[1] === LAD[x], 'maxsum_1 = ' + ms[1]);
  }
}
console.log('');

// ==========================================================================
// 1a. ||A^{ox m}|| = maxsum_m, by DENSE max-plus matrix powers
// ==========================================================================
console.log('='.repeat(78));
console.log('1a. THE TRANSFER MATRIX: ||A^{ox m}||_max = maxsum_m  (dense powers)');
console.log('='.repeat(78));
console.log('No shortcut is taken: A is built as a full D x D max-plus matrix and');
console.log('multiplied in the semiring. Also checked: A^{ox m}[i][j] is finite iff');
console.log('j = i+m mod D, which is why the tile has exactly one circuit.');
console.log('');
console.log('    x    D    m   ||A^{ox m}||   maxsum_m   equal?   finite entries   D (expected)');
for (const x of [5, 7, 11]) {
  if (!tiles[x]) continue;
  const g = gapsOfTile(tiles[x]), D = g.length;
  const A = cycleMatrix(g); let P = A;
  const ms = maxsums(g, 8);
  for (let m = 1; m <= 8; m++) {
    if (m > 1) P = mpMul(P, A);
    let fin = 0, offdiag = 0;
    for (let i = 0; i < D; i++) for (let j = 0; j < D; j++) if (P[i][j] !== NEG) { fin++; if (j !== (i + m) % D) offdiag++; }
    const n = mpNorm(P);
    console.log('  ' + pad(x, 3) + pad(D, 5) + pad(m, 5) + pad(n, 14) + pad(ms[m], 11) + pad(n === ms[m] ? 'yes' : 'NO', 8) + pad(fin, 17) + pad(D, 15));
    if (n !== ms[m]) FAILS++;
    if (offdiag !== 0) { FAILS++; console.log('     FAIL: ' + offdiag + ' finite entries off the +m diagonal'); }
  }
  console.log('');
}

// ==========================================================================
// 1b. the max-plus eigenvalue is the mean gap
// ==========================================================================
console.log('='.repeat(78));
console.log('1b. THE MAX-PLUS EIGENVALUE (Karp 1978 maximum cycle mean)');
console.log('='.repeat(78));
console.log('Karp is run on the digraph directly; it is never told W or D.');
console.log('');
console.log('    x      D          W   Karp lambda   W/D = mbar    equal?');
for (const x of [5, 7, 11, 13]) {
  if (!tiles[x]) continue;
  const g = gapsOfTile(tiles[x]), D = g.length, W = tiles[x].W;
  const adj = []; for (let i = 0; i < D; i++) adj.push([[(i + 1) % D, g[i]]]);
  const lam = karpMaxCycleMean(adj, D);
  const mbar = W / D;
  console.log('  ' + pad(x, 3) + pad(D, 7) + pad(W, 11) + pad(F(lam, 6), 14) + pad(F(mbar, 6), 13) + pad(Math.abs(lam - mbar) < 1e-9 ? 'yes' : 'NO', 9));
  if (Math.abs(lam - mbar) > 1e-9) FAILS++;
}
console.log('');
console.log('CYCLICITY AND TRANSIENT. The tile digraph is a single circuit of length D,');
console.log('so the max-plus cyclicity is D and the transient is 0: A^{ox(m+D)} = W ox A^{ox m}');
console.log('for EVERY m >= 0, hence maxsum_{m+D} = maxsum_m + W exactly.');
console.log('');
console.log('    x      D   m   maxsum_m   maxsum_{m+D}   difference   W    equal?');
for (const x of [5, 7, 11]) {
  if (!tiles[x]) continue;
  const g = gapsOfTile(tiles[x]), D = g.length, W = tiles[x].W;
  const ms = maxsums(g, 2 * D + 4);
  for (const m of [...new Set([1, 2, 3, D, D + 1])]) {
    if (m + D > 2 * D + 4) continue;
    const d = ms[m + D] - ms[m];
    console.log('  ' + pad(x, 3) + pad(D, 7) + pad(m, 4) + pad(ms[m], 11) + pad(ms[m + D], 15) + pad(d, 13) + pad(W, 5) + pad(d === W ? 'yes' : 'NO', 9));
    if (d !== W) FAILS++;
  }
}
console.log('');

// ==========================================================================
// 1c. so the Perron root is Mertens, and G2 is the norm
// ==========================================================================
console.log('='.repeat(78));
console.log('1c. THE PERRON ROOT IS THE MEAN GAP; G2 IS THE OPERATOR NORM');
console.log('='.repeat(78));
console.log('');
console.log('    x        D   lambda = mbar   ||A|| = G2   G2/lambda   lambda/ln^2 x   G2/x^2');
for (const x of LEVELS) {
  if (x < 5) continue;
  const g = gapsOfTile(tiles[x]), D = g.length, W = tiles[x].W;
  const mbar = W / D, G2 = maxsums(g, 1)[1];
  console.log('  ' + pad(x, 3) + pad(D, 9) + pad(F(mbar, 4), 16) + pad(G2, 13) + pad(F(G2 / mbar, 4), 12) + pad(F(mbar / (Math.log(x) ** 2), 4), 16) + pad(F(G2 / (x * x), 4), 9));
}
console.log('');
console.log('lambda/ln^2 x descends toward the Mertens constant e^{2gamma}/(2 C2) = 2.4009');
console.log('from above over the reachable range; G2/lambda is the quantity that has to grow');
console.log('like x^{beta-o(1)} for the exponent to be beta. The eigenvalue carries none of it.');
console.log('');

// ==========================================================================
// 1d. the fold = duplication + max-plus state elimination
// ==========================================================================
console.log('='.repeat(78));
console.log('1d. THE FOLD AS A MAX-PLUS OPERATION: DUPLICATE, THEN ELIMINATE');
console.log('='.repeat(78));
console.log('Step A: replace the circuit of length D by the circuit of length pD (p');
console.log('        copies laid end to end). This is a max-plus operation on matrices.');
console.log('Step B: in copy k eliminate the vertices whose old index has residue in');
console.log('        {-kw, -kw-2} mod p. Eliminating a degree-(1,1) vertex v in max-plus');
console.log('        replaces A[u][v], A[v][w] by A[u][w] = A[u][v] ox A[v][w], i.e. by the');
console.log('        SUM of the two gaps. That is Gaussian elimination in the semiring.');
console.log('The claim: the word that comes out is the true fold, gap for gap.');
console.log('');
console.log('   old x   fold p   D_new (elim)   D_new (true)   words identical?   cyclic shift');
function foldByElimination(tile, p) {
  // Step A: p copies of the slot list -> one circuit of length pD, edge weights
  // g[n mod D] (the copies abut exactly, because g is the CYCLIC gap word).
  const { slots, W } = tile, D = slots.length;
  const g = gapsOfTile(tile);
  const wp = W % p;
  const N = p * D;
  const dead = new Uint8Array(N);
  const rs = new Int32Array(D); for (let i = 0; i < D; i++) rs[i] = slots[i] % p;
  for (let k = 0; k < p; k++) {
    const kw = (k * wp) % p, d0 = (p - kw) % p, d2 = (2 * p - 2 - kw) % p;
    const base = k * D;
    for (let i = 0; i < D; i++) if (rs[i] === d0 || rs[i] === d2) dead[base + i] = 1;
  }
  // Step B: start at the FIRST surviving vertex (which is the folded tile's own
  // first slot, since positions increase along the circuit) and walk once round.
  let s0 = -1; for (let n = 0; n < N; n++) if (!dead[n]) { s0 = n; break; }
  if (s0 < 0) throw new Error('no survivor');
  const out = [];
  let acc = 0;
  for (let t = 0; t < N; t++) {
    const n = (s0 + t) % N;
    acc += g[n % D];                       // ox-product along the eliminated path
    const nxt = (n + 1) % N;
    if (!dead[nxt]) { out.push(acc); acc = 0; }
  }
  return out;
}
for (const x of [3, 5, 7, 11, 13, 17]) {
  if (!tiles[x]) continue;
  const p = PRIMES[PRIMES.indexOf(x) + 1];
  if (!p || !tiles[p]) continue;
  const elim = foldByElimination(tiles[x], p);
  const truth = gapsOfTile(tiles[p]);
  let same = elim.length === truth.length;
  let firstDiff = -1;
  if (same) for (let i = 0; i < truth.length; i++) if (elim[i] !== truth[i]) { same = false; firstDiff = i; break; }
  console.log('  ' + pad(x, 6) + pad(p, 9) + pad(elim.length, 15) + pad(truth.length, 15) + pad(same ? 'yes' : 'NO', 19) + pad(same ? 0 : firstDiff, 15));
  if (!same) FAILS++;
}
console.log('');

// ==========================================================================
// 1e. what does not close: the maxsum vector is not a state
// ==========================================================================
console.log('='.repeat(78));
console.log('1e. THE CLOSURE GAP, MEASURED');
console.log('='.repeat(78));
console.log('All p alignments of a fold act on ONE tile, so they share ONE plain maxsum');
console.log('vector. Any reduction of the state to that vector must therefore predict a');
console.log('SINGLE value of Delta_m. The observed spread across alignments is exactly the');
console.log('information the reduction throws away. Recomputed here for x <= 19; the');
console.log('x = 23 and x = 29 rows are CITED from attack-0c0e-01-deleted-family.js table (a).');
console.log('');
console.log('    x    p   m   min_a Delta_m   max_a Delta_m   max/min   ln spread (nats)');
function deletedSpread(tile, p, M) {
  const { slots, W } = tile, D = slots.length;
  const rs = new Int32Array(D); for (let i = 0; i < D; i++) rs[i] = slots[i] % p;
  const rows = [];
  for (let a = 0; a < p; a++) {
    const d0 = a, d2 = (a - 2 + p) % p;
    const keep = [];
    for (let i = 0; i < D; i++) { const q = rs[i]; if (q !== d0 && q !== d2) keep.push(slots[i]); }
    const n = keep.length, gg = new Float64Array(n);
    for (let i = 0; i < n; i++) gg[i] = (i + 1 < n ? keep[i + 1] : keep[0] + W) - keep[i];
    rows.push(maxsums(gg, M));
  }
  return rows;
}
const SPREAD = {};
for (const x of [5, 7, 11, 13, 17, 19]) {
  if (!tiles[x]) continue;
  const p = PRIMES[PRIMES.indexOf(x) + 1];
  const rows = deletedSpread(tiles[x], p, 8);
  for (let m = 1; m <= 8; m++) {
    let mn = Infinity, mx = -Infinity;
    for (const r of rows) { if (r[m] < mn) mn = r[m]; if (r[m] > mx) mx = r[m]; }
    if (m === 1) SPREAD[x] = { p, mn, mx };
    console.log('  ' + pad(x, 3) + pad(p, 5) + pad(m, 4) + pad(mn, 16) + pad(mx, 16) + pad(F(mx / mn, 4), 10) + pad(F(Math.log(mx / mn), 4), 18));
  }
  console.log('');
}
console.log('  CITED, attack-0c0e-01-deleted-family.js table (a), m = 1 rows:');
console.log('    x = 23, p = 29:  min_a 222, max_a 258, max/min 1.1622, ln spread 0.1503');
console.log('    x = 29, p = 31:  min_a 318, max_a 348, max/min 1.0943, ln spread 0.0901');
console.log('');

// ==========================================================================
// 3c. the max-plus eigenvector, and its spread
// ==========================================================================
console.log('='.repeat(78));
console.log('3c. THE MAX-PLUS EIGENVECTOR u_i = S_i - i*lambda, AND ITS SPREAD');
console.log('='.repeat(78));
console.log('For a single circuit the eigenvector is the tilted partial-sum word,');
console.log('u_i = S_i - i*mbar (u is D-periodic because sum g = W = D*mbar). Then');
console.log('   max_i u_i - min_i u_i = max over ALL windows of (window sum - m*mbar)');
console.log('                         = max_m (maxsum_m - m*mbar),');
console.log('so the eigenvector amplitude is the whole excess profile in one number.');
console.log('Both sides are computed independently below.');
console.log('');
console.log("    x        D   spread(u)   argmax m   max_m(maxsum_m - m mbar)   equal?   G2 - mbar   spread/G2   spread/mbar");
console.log("  (the independent max over m is an O(D^2) scan and is run only where D allows;");
console.log("   elsewhere the argmax window is read off u directly, which is the same object.)");
for (const x of LEVELS) {
  if (x < 5) continue;
  const g = gapsOfTile(tiles[x]), D = g.length, W = tiles[x].W, mbar = W / D;
  let S = 0, mnU = 0, mxU = 0, imn = -1, imx = -1;
  for (let i = 0; i < D; i++) { S += g[i]; const u = S - (i + 1) * mbar; if (u < mnU) { mnU = u; imn = i; } if (u > mxU) { mxU = u; imx = i; } }
  const spread = mxU - mnU;
  const am = ((imx - imn) % D + D) % D;
  const G2 = maxsums(g, 1)[1];
  let indep = null, eq = '-';
  if (D <= 22275) {
    const ms = maxsums(g, D);
    let best = -Infinity;
    for (let m = 1; m <= D; m++) { const e = ms[m] - m * mbar; if (e > best) best = e; }
    indep = best; eq = Math.abs(spread - best) < 1e-6 ? 'yes' : 'NO';
    if (eq === 'NO') FAILS++;
  }
  console.log('  ' + pad(x, 3) + pad(D, 9) + pad(F(spread, 3), 12) + pad(am, 11) + pad(indep === null ? '(D too large)' : F(indep, 3), 27) + pad(eq, 9) + pad(F(G2 - mbar, 3), 12) + pad(F(spread / G2, 4), 12) + pad(F(spread / mbar, 3), 13));
}
console.log('');

// ==========================================================================
// 3a. the alternation automaton is min-plus, and c_min = 3p is its eigenvalue
// ==========================================================================
console.log('='.repeat(78));
console.log('3a. THE ALTERNATION AUTOMATON IS MIN-PLUS; A5 THEOREM A IS ITS PERRON THEOREM');
console.log('='.repeat(78));
console.log('States P = (kill in class a), M = (kill in class a-2). From P only gaps');
console.log('= 0 or -2 (mod p) are legal, from M only 0 or +2 (kappa-not-L.md, the');
console.log('Alternation Lemma). Grain gaps are multiples of 6, so the least legal gap');
console.log('in each class is exact: 6p for class 0, and {2p-2, 4p+2} or {2p+2, 4p-2}');
console.log('for classes {-2, +2} according to p mod 6. B_p is the MIN-plus matrix of');
console.log('those least costs. Its minimum cycle mean is the run cost per step.');
console.log('');
console.log('    p   p%6   B[P][P]   B[P][M]   B[M][P]   B[M][M]   Karp mcm   3p    equal?   eigvec (0, ?)   3p-c_-2');
for (const p of [5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]) {
  const one = (p % 6 === 1);
  const cMinus = one ? 2 * p - 2 : 4 * p - 2;   // least gap = -2 (mod p), and = 0 (mod 6)
  const cPlus = one ? 4 * p + 2 : 2 * p + 2;   // least gap = +2 (mod p)
  const cZero = 6 * p;
  // sanity: these are the qualifying residues and are multiples of 6
  if (cMinus % 6 || cPlus % 6 || cZero % 6) FAILS++;
  if (((cMinus + 2) % p) || ((cPlus - 2) % p) || (cZero % p)) FAILS++;
  const adj = [[[0, cZero], [1, cMinus]], [[0, cPlus], [1, cZero]]];
  const mcm = karpMinCycleMean(adj, 2);
  // min-plus eigenvector with v_P = 0: v_M = cMinus - mcm
  const vM = mcm - cMinus;   // min-plus eigenvector, v_P = 0
  const r0 = Math.min(cZero + 0, cMinus + vM), r1 = Math.min(cPlus + 0, cZero + vM);
  const eigOk = Math.abs(r0 - (mcm + 0)) < 1e-9 && Math.abs(r1 - (mcm + vM)) < 1e-9;
  const ok = Math.abs(mcm - 3 * p) < 1e-9;
  if (!ok || !eigOk) FAILS++;
  console.log('  ' + pad(p, 3) + pad(p % 6, 6) + pad(cZero, 10) + pad(cMinus, 10) + pad(cPlus, 10) + pad(cZero, 10) + pad(F(mcm, 1), 11) + pad(3 * p, 6) + pad(ok ? 'yes' : 'NO', 9) + pad(vM, 16) + pad(one ? p + 2 : 2 - p, 6) + (eigOk ? '' : '  EIGENVECTOR FAIL'));
}
console.log('');
console.log('The critical circuit is P -> M -> P with weight cMinus + cPlus = 6p in both');
console.log('cases and length 2, so mcm = 3p; the self-loops cost 6p per step and are never');
console.log('critical. mcm is an EIGENVALUE, so 3p is exact and cannot be raised by any');
console.log('sharpening of the automaton -- that is kappa-not-L.md "worth exactly 3/2".');
console.log('');

// ==========================================================================
// 3a-bis. the exact min-plus powers: Theorem A's c_min(j), sharpened
// ==========================================================================
console.log('='.repeat(78));
console.log('3a-bis. c_min(j) IS A MIN-PLUS MATRIX POWER, SO IT IS EXACT, NOT "ABOUT 3pj"');
console.log('='.repeat(78));
console.log('c_min(j) = min entry of B_p^{ox j} in the min-plus semiring = the least');
console.log('possible span of a kill run of j+1 slots. Perron gives c_min(j) = 3pj + O(1)');
console.log('with the O(1) read off the eigenvector, so the correction is periodic in j');
console.log('and not asymptotic. Computed by direct min-plus powers below.');
console.log('');
function minplusPow(B, j) {   // B is 2x2 array of numbers
  let P = [[0, Infinity], [Infinity, 0]];
  for (let t = 0; t < j; t++) {
    const C = [[Infinity, Infinity], [Infinity, Infinity]];
    for (let i = 0; i < 2; i++) for (let k = 0; k < 2; k++) for (let l = 0; l < 2; l++) { const v = P[i][l] + B[l][k]; if (v < C[i][k]) C[i][k] = v; }
    P = C;
  }
  return P;
}
console.log('     p   p%6    j=1    j=2    j=3    j=4    j=5    j=6     |   c_min(j) - 3pj   (j = 1..6)   closed form');
for (const p of [7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43]) {
  const one = (p % 6 === 1);
  const cMinus = one ? 2 * p - 2 : 4 * p - 2;
  const cPlus = one ? 4 * p + 2 : 2 * p + 2;
  const B = [[6 * p, cMinus], [cPlus, 6 * p]];
  const vals = [], devs = [];
  for (let j = 1; j <= 6; j++) { const P = minplusPow(B, j); const m = Math.min(P[0][0], P[0][1], P[1][0], P[1][1]); vals.push(m); devs.push(m - 3 * p * j); }
  const odd = one ? -(p + 2) : -(p - 2);
  let cfOk = true;
  for (let j = 1; j <= 6; j++) { const pred = 3 * p * j + (j % 2 ? odd : 0); if (vals[j - 1] !== pred) cfOk = false; }
  if (!cfOk) FAILS++;
  console.log('  ' + pad(p, 4) + pad(p % 6, 6) + vals.map((v) => pad(v, 7)).join('') + '     |   ' + devs.map((v) => pad(v, 7)).join('') + '   ' + (cfOk ? '3pj - ' + (-odd) + '*[j odd]  ok' : 'MISMATCH'));
}
console.log('');
console.log('So Theorem A "span >= c_min(L-1) ~ 3p(L-1)" is exactly');
console.log('   span >= 3p(L-1) - (p+2)[L even]     for p = 1 mod 6,');
console.log('   span >= 3p(L-1) - (p-2)[L even]     for p = 5 mod 6,');
console.log('the correction being the min-plus eigenvector coordinate and nothing else.');
console.log('');

// ==========================================================================
// 3b. the record runs, on the BIG tile
// ==========================================================================
console.log('='.repeat(78));
console.log('3b. THE RECORD RUNS, RECOMPUTED: ARE THEY THE CRITICAL CIRCUIT?');
console.log('='.repeat(78));
console.log('A kill run lives in the BIG tile (period W*p, where p | W*p), not inside one');
console.log('copy: crossing a copy boundary shifts the strike class by w = W mod p, so a');
console.log('cyclic scan of a single copy is the wrong object and would report runs that');
console.log('do not exist. Below: over all p*D positions of the folded tile, the longest');
console.log('run of consecutive DELETED slots, and its interior gap word.');
console.log('');
console.log('    x    p    L   run gap word (interior)   in p-units             adjacent sums    6p   critical?   span   c_min(L-1)');
for (const x of LEVELS) {
  if (x < 5) continue;
  const p = PRIMES[PRIMES.indexOf(x) + 1];
  if (!p) continue;
  const { slots, W } = tiles[x], D = slots.length;
  const g = gapsOfTile(tiles[x]);
  const rs = new Int32Array(D); for (let i = 0; i < D; i++) rs[i] = slots[i] % p;
  const wp = W % p;
  const d0s = new Int32Array(p), d2s = new Int32Array(p);
  for (let k = 0; k < p; k++) { const kw = (k * wp) % p; d0s[k] = (p - kw) % p; d2s[k] = (2 * p - 2 - kw) % p; }
  const N = p * D;
  const isDead = (n) => { const k = (n / D) | 0, i = n - k * D, r = rs[i]; return r === d0s[k] || r === d2s[k]; };
  let s0 = -1; for (let n = 0; n < N; n++) if (!isDead(n)) { s0 = n; break; }
  // one pass: for every maximal run, record its length and span; keep, per length,
  // the CHEAPEST span (Theorem A's equality claim is about the floor being attained
  // by SOME run of that length, not by the first one the scan meets).
  const bySpan = new Map();   // len -> {span, start}
  let bestL = 0, run = 0, start = -1;
  const closeRun = () => {
    if (run === 0) return;
    let sp = 0; for (let t = 0; t < run - 1; t++) sp += g[(start + t) % D];
    const cur = bySpan.get(run);
    if (!cur || sp < cur.span) bySpan.set(run, { span: sp, start });
    if (run > bestL) bestL = run;
    run = 0;
  };
  for (let t = 0; t < N; t++) {
    const n = (s0 + t) % N;
    if (isDead(n)) { if (run === 0) start = n; run++; }
    else closeRun();
  }
  closeRun();
  const bestStart = bySpan.get(bestL).start;
  const interior = []; for (let t = 0; t < bestL - 1; t++) interior.push(g[(bestStart + t) % D]);
  const units = interior.map((v) => (v / p).toFixed(3));
  const adjs = []; for (let t = 0; t + 1 < interior.length; t++) adjs.push(interior[t] + interior[t + 1]);
  const span = bySpan.get(bestL).span;
  const one = (p % 6 === 1);
  const cMinus = one ? 2 * p - 2 : 4 * p - 2, cPlus = one ? 4 * p + 2 : 2 * p + 2;
  const B = [[6 * p, cMinus], [cPlus, 6 * p]];
  let cmin = 0; if (bestL >= 2) { const P = minplusPow(B, bestL - 1); cmin = Math.min(P[0][0], P[0][1], P[1][0], P[1][1]); }
  const crit = bestL < 2 ? '-' : (span === cmin ? 'yes (attains c_min)' : 'NO (span > c_min)');
  if (bestL >= 2 && span < cmin) { FAILS++; console.log('     FAIL: span ' + span + ' below the proven floor c_min = ' + cmin); }
  for (const v of interior) { const r = ((v % p) + p) % p; if (!(r === 0 || r === 2 || r === p - 2)) { FAILS++; console.log('     FAIL: interior gap ' + v + ' does not qualify mod ' + p); } }
  console.log('  ' + pad(x, 3) + pad(p, 5) + pad(bestL, 5) + '   ' + pad(interior.join('+') || '-', 21) + '   ' + pad(units.join(',') || '-', 20) + '   ' + pad(adjs.join(',') || '-', 14) + pad(6 * p, 6) + '   ' + pad(crit, 20) + pad(span || '-', 6) + pad(bestL >= 2 ? cmin : '-', 12));
}
console.log('');
console.log('  CITED, kappa-not-L.md (Theorem A, "attained with equality at every fold with');
console.log('  L >= 2, all seven"): fold 23 gives 48+90 = 2p+2, 4p-2 and fold 31 gives');
console.log('  60+126+60 = 2p-2, 4p+2, 2p-2, adjacent sums 138 = 6*23 and 186 = 6*31.');
console.log('  CITED, research/qc.js section W2 (the gate recomputes these): the true');
console.log('  diagonal L is 2, 1, 2, 2, 2, 3, 2 at folds 7, 11, 13, 17, 19, 23, 29.');
console.log('');

console.log('='.repeat(78));
console.log(FAILS === 0 ? 'SELF-TESTS: all passed.' : 'SELF-TESTS: ' + FAILS + ' FAILURES');
console.log('elapsed ' + ((Date.now() - T0) / 1000).toFixed(1) + ' s');
console.log('='.repeat(78));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/import-maxplus-01-mapping.js -- 23
//   invocation:  node research/import-maxplus-01-mapping.js 23
//   code-sha256: 2388de5a8792d5d8bed4102295b1ceb881c73cc3348109750dacff7573377e5f
//   out-sha256:  1e23bdc9af1faab6f7e7779e1b517d8248e537a1e75724ec620cd688f9c4971b
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     3.8 s
// ============================================================================
// ==============================================================================
// IMPORT 4 (MAX-PLUS) -- STAGE 1: THE MAPPING, AND STAGE 3: PERRON
// ==============================================================================
// Semiring (max, +). A(T)[i][i+1] = g_i on the cyclic gap word.
//
// ------------------------------------------------------------------------------
// SELF-TESTS
// ------------------------------------------------------------------------------
//   ok    D(T_3) = prod (q-2)   D = 1
//   ok    D(T_5) = prod (q-2)   D = 3
//   ok    D(T_7) = prod (q-2)   D = 15
//   ok    D(T_11) = prod (q-2)   D = 135
//   ok    D(T_13) = prod (q-2)   D = 1485
//   ok    D(T_17) = prod (q-2)   D = 22275
//   ok    D(T_19) = prod (q-2)   D = 378675
//   ok    D(T_23) = prod (q-2)   D = 7952175
//   ok    G2(3#) = 6   maxsum_1 = 6
//   ok    G2(5#) = 12   maxsum_1 = 12
//   ok    G2(7#) = 30   maxsum_1 = 30
//   ok    G2(11#) = 42   maxsum_1 = 42
//   ok    G2(13#) = 66   maxsum_1 = 66
//   ok    G2(17#) = 108   maxsum_1 = 108
//   ok    G2(19#) = 150   maxsum_1 = 150
//   ok    G2(23#) = 204   maxsum_1 = 204
//
// ==============================================================================
// 1a. THE TRANSFER MATRIX: ||A^{ox m}||_max = maxsum_m  (dense powers)
// ==============================================================================
// No shortcut is taken: A is built as a full D x D max-plus matrix and
// multiplied in the semiring. Also checked: A^{ox m}[i][j] is finite iff
// j = i+m mod D, which is why the tile has exactly one circuit.
//
//     x    D    m   ||A^{ox m}||   maxsum_m   equal?   finite entries   D (expected)
//     5    3    1            12         12     yes                3              3
//     5    3    2            24         24     yes                3              3
//     5    3    3            30         30     yes                3              3
//     5    3    4            42         42     yes                3              3
//     5    3    5            54         54     yes                3              3
//     5    3    6            60         60     yes                3              3
//     5    3    7            72         72     yes                3              3
//     5    3    8            84         84     yes                3              3
//
//     7   15    1            30         30     yes               15             15
//     7   15    2            42         42     yes               15             15
//     7   15    3            66         66     yes               15             15
//     7   15    4            78         78     yes               15             15
//     7   15    5            96         96     yes               15             15
//     7   15    6           108        108     yes               15             15
//     7   15    7           126        126     yes               15             15
//     7   15    8           138        138     yes               15             15
//
//    11  135    1            42         42     yes              135            135
//    11  135    2            66         66     yes              135            135
//    11  135    3            96         96     yes              135            135
//    11  135    4           108        108     yes              135            135
//    11  135    5           138        138     yes              135            135
//    11  135    6           156        156     yes              135            135
//    11  135    7           168        168     yes              135            135
//    11  135    8           180        180     yes              135            135
//
// ==============================================================================
// 1b. THE MAX-PLUS EIGENVALUE (Karp 1978 maximum cycle mean)
// ==============================================================================
// Karp is run on the digraph directly; it is never told W or D.
//
//     x      D          W   Karp lambda   W/D = mbar    equal?
//     5      3         30     10.000000    10.000000      yes
//     7     15        210     14.000000    14.000000      yes
//    11    135       2310     17.111111    17.111111      yes
//    13   1485      30030     20.222222    20.222222      yes
//
// CYCLICITY AND TRANSIENT. The tile digraph is a single circuit of length D,
// so the max-plus cyclicity is D and the transient is 0: A^{ox(m+D)} = W ox A^{ox m}
// for EVERY m >= 0, hence maxsum_{m+D} = maxsum_m + W exactly.
//
//     x      D   m   maxsum_m   maxsum_{m+D}   difference   W    equal?
//     5      3   1         12             42           30   30      yes
//     5      3   2         24             54           30   30      yes
//     5      3   3         30             60           30   30      yes
//     5      3   4         42             72           30   30      yes
//     7     15   1         30            240          210  210      yes
//     7     15   2         42            252          210  210      yes
//     7     15   3         66            276          210  210      yes
//     7     15  15        210            420          210  210      yes
//     7     15  16        240            450          210  210      yes
//    11    135   1         42           2352         2310 2310      yes
//    11    135   2         66           2376         2310 2310      yes
//    11    135   3         96           2406         2310 2310      yes
//    11    135 135       2310           4620         2310 2310      yes
//    11    135 136       2352           4662         2310 2310      yes
//
// ==============================================================================
// 1c. THE PERRON ROOT IS THE MEAN GAP; G2 IS THE OPERATOR NORM
// ==============================================================================
//
//     x        D   lambda = mbar   ||A|| = G2   G2/lambda   lambda/ln^2 x   G2/x^2
//     5        3         10.0000           12      1.2000          3.8606   0.4800
//     7       15         14.0000           30      2.1429          3.6973   0.6122
//    11      135         17.1111           42      2.4545          2.9759   0.3471
//    13     1485         20.2222           66      3.2637          3.0738   0.3905
//    17    22275         22.9185          108      4.7123          2.8551   0.3737
//    19   378675         25.6148          150      5.8560          2.9545   0.4155
//    23  7952175         28.0543          204      7.2716          2.8536   0.3856
//
// lambda/ln^2 x descends toward the Mertens constant e^{2gamma}/(2 C2) = 2.4009
// from above over the reachable range; G2/lambda is the quantity that has to grow
// like x^{beta-o(1)} for the exponent to be beta. The eigenvalue carries none of it.
//
// ==============================================================================
// 1d. THE FOLD AS A MAX-PLUS OPERATION: DUPLICATE, THEN ELIMINATE
// ==============================================================================
// Step A: replace the circuit of length D by the circuit of length pD (p
//         copies laid end to end). This is a max-plus operation on matrices.
// Step B: in copy k eliminate the vertices whose old index has residue in
//         {-kw, -kw-2} mod p. Eliminating a degree-(1,1) vertex v in max-plus
//         replaces A[u][v], A[v][w] by A[u][w] = A[u][v] ox A[v][w], i.e. by the
//         SUM of the two gaps. That is Gaussian elimination in the semiring.
// The claim: the word that comes out is the true fold, gap for gap.
//
//    old x   fold p   D_new (elim)   D_new (true)   words identical?   cyclic shift
//        3        5              3              3                yes              0
//        5        7             15             15                yes              0
//        7       11            135            135                yes              0
//       11       13           1485           1485                yes              0
//       13       17          22275          22275                yes              0
//       17       19         378675         378675                yes              0
//
// ==============================================================================
// 1e. THE CLOSURE GAP, MEASURED
// ==============================================================================
// All p alignments of a fold act on ONE tile, so they share ONE plain maxsum
// vector. Any reduction of the state to that vector must therefore predict a
// SINGLE value of Delta_m. The observed spread across alignments is exactly the
// information the reduction throws away. Recomputed here for x <= 19; the
// x = 23 and x = 29 rows are CITED from attack-0c0e-01-deleted-family.js table (a).
//
//     x    p   m   min_a Delta_m   max_a Delta_m   max/min   ln spread (nats)
//     5    7   1              12              30    2.5000            0.9163
//     5    7   2              24              60    2.5000            0.9163
//     5    7   3              30              90    3.0000            1.0986
//     5    7   4              42             120    2.8571            1.0498
//     5    7   5              54             150    2.7778            1.0217
//     5    7   6              60             180    3.0000            1.0986
//     5    7   7              72             210    2.9167            1.0704
//     5    7   8              84             240    2.8571            1.0498
//
//     7   11   1              30              42    1.4000            0.3365
//     7   11   2              42              66    1.5714            0.4520
//     7   11   3              66              96    1.4545            0.3747
//     7   11   4              78             108    1.3846            0.3254
//     7   11   5              96             138    1.4375            0.3629
//     7   11   6             108             156    1.4444            0.3677
//     7   11   7             126             168    1.3333            0.2877
//     7   11   8             138             180    1.3043            0.2657
//
//    11   13   1              48              66    1.3750            0.3185
//    11   13   2              78              96    1.2308            0.2076
//    11   13   3             108             138    1.2778            0.2451
//    11   13   4             138             156    1.1304            0.1226
//    11   13   5             156             168    1.0769            0.0741
//    11   13   6             168             186    1.1071            0.1018
//    11   13   7             180             204    1.1333            0.1252
//    11   13   8             198             228    1.1515            0.1411
//
//    13   17   1              90             108    1.2000            0.1823
//    13   17   2             120             150    1.2500            0.2231
//    13   17   3             156             168    1.0769            0.0741
//    13   17   4             174             198    1.1379            0.1292
//    13   17   5             180             210    1.1667            0.1542
//    13   17   6             210             240    1.1429            0.1335
//    13   17   7             228             258    1.1316            0.1236
//    13   17   8             258             288    1.1163            0.1100
//
//    17   19   1             138             150    1.0870            0.0834
//    17   19   2             168             186    1.1071            0.1018
//    17   19   3             192             210    1.0938            0.0896
//    17   19   4             210             228    1.0857            0.0822
//    17   19   5             240             282    1.1750            0.1613
//    17   19   6             282             300    1.0638            0.0619
//    17   19   7             300             348    1.1600            0.1484
//    17   19   8             348             378    1.0862            0.0827
//
//    19   23   1             180             204    1.1333            0.1252
//    19   23   2             210             234    1.1143            0.1082
//    19   23   3             240             300    1.2500            0.2231
//    19   23   4             300             348    1.1600            0.1484
//    19   23   5             348             390    1.1207            0.1139
//    19   23   6             384             462    1.2031            0.1849
//    19   23   7             408             498    1.2206            0.1993
//    19   23   8             450             528    1.1733            0.1598
//
//   CITED, attack-0c0e-01-deleted-family.js table (a), m = 1 rows:
//     x = 23, p = 29:  min_a 222, max_a 258, max/min 1.1622, ln spread 0.1503
//     x = 29, p = 31:  min_a 318, max_a 348, max/min 1.0943, ln spread 0.0901
//
// ==============================================================================
// 3c. THE MAX-PLUS EIGENVECTOR u_i = S_i - i*lambda, AND ITS SPREAD
// ==============================================================================
// For a single circuit the eigenvector is the tilted partial-sum word,
// u_i = S_i - i*mbar (u is D-periodic because sum g = W = D*mbar). Then
//    max_i u_i - min_i u_i = max over ALL windows of (window sum - m*mbar)
//                          = max_m (maxsum_m - m*mbar),
// so the eigenvector amplitude is the whole excess profile in one number.
// Both sides are computed independently below.
//
//     x        D   spread(u)   argmax m   max_m(maxsum_m - m mbar)   equal?   G2 - mbar   spread/G2   spread/mbar
//   (the independent max over m is an O(D^2) scan and is run only where D allows;
//    elsewhere the argmax window is read off u directly, which is the same object.)
//     5        3       4.000          2                      4.000      yes       2.000      0.3333        0.400
//     7       15      28.000          7                     28.000      yes      16.000      0.9333        2.000
//    11      135      84.889         55                     84.889      yes      24.889      2.0212        4.961
//    13     1485     138.222        251                    138.222      yes      45.778      2.0943        6.835
//    17    22275     336.563       2081                    336.563      yes      85.081      3.1163       14.685
//    19   378675     849.274     245506              (D too large)        -     124.385      5.6618       33.156
//    23  7952175    1507.536     232994              (D too large)        -     175.946      7.3899       53.736
//
// ==============================================================================
// 3a. THE ALTERNATION AUTOMATON IS MIN-PLUS; A5 THEOREM A IS ITS PERRON THEOREM
// ==============================================================================
// States P = (kill in class a), M = (kill in class a-2). From P only gaps
// = 0 or -2 (mod p) are legal, from M only 0 or +2 (kappa-not-L.md, the
// Alternation Lemma). Grain gaps are multiples of 6, so the least legal gap
// in each class is exact: 6p for class 0, and {2p-2, 4p+2} or {2p+2, 4p-2}
// for classes {-2, +2} according to p mod 6. B_p is the MIN-plus matrix of
// those least costs. Its minimum cycle mean is the run cost per step.
//
//     p   p%6   B[P][P]   B[P][M]   B[M][P]   B[M][M]   Karp mcm   3p    equal?   eigvec (0, ?)   3p-c_-2
//     5     5        30        18        12        30       15.0    15      yes              -3    -3
//     7     1        42        12        30        42       21.0    21      yes               9     9
//    11     5        66        42        24        66       33.0    33      yes              -9    -9
//    13     1        78        24        54        78       39.0    39      yes              15    15
//    17     5       102        66        36       102       51.0    51      yes             -15   -15
//    19     1       114        36        78       114       57.0    57      yes              21    21
//    23     5       138        90        48       138       69.0    69      yes             -21   -21
//    29     5       174       114        60       174       87.0    87      yes             -27   -27
//    31     1       186        60       126       186       93.0    93      yes              33    33
//    37     1       222        72       150       222      111.0   111      yes              39    39
//    41     5       246       162        84       246      123.0   123      yes             -39   -39
//    43     1       258        84       174       258      129.0   129      yes              45    45
//    47     5       282       186        96       282      141.0   141      yes             -45   -45
//    53     5       318       210       108       318      159.0   159      yes             -51   -51
//    59     5       354       234       120       354      177.0   177      yes             -57   -57
//    61     1       366       120       246       366      183.0   183      yes              63    63
//    67     1       402       132       270       402      201.0   201      yes              69    69
//    71     5       426       282       144       426      213.0   213      yes             -69   -69
//    73     1       438       144       294       438      219.0   219      yes              75    75
//    79     1       474       156       318       474      237.0   237      yes              81    81
//    83     5       498       330       168       498      249.0   249      yes             -81   -81
//    89     5       534       354       180       534      267.0   267      yes             -87   -87
//    97     1       582       192       390       582      291.0   291      yes              99    99
//
// The critical circuit is P -> M -> P with weight cMinus + cPlus = 6p in both
// cases and length 2, so mcm = 3p; the self-loops cost 6p per step and are never
// critical. mcm is an EIGENVALUE, so 3p is exact and cannot be raised by any
// sharpening of the automaton -- that is kappa-not-L.md "worth exactly 3/2".
//
// ==============================================================================
// 3a-bis. c_min(j) IS A MIN-PLUS MATRIX POWER, SO IT IS EXACT, NOT "ABOUT 3pj"
// ==============================================================================
// c_min(j) = min entry of B_p^{ox j} in the min-plus semiring = the least
// possible span of a kill run of j+1 slots. Perron gives c_min(j) = 3pj + O(1)
// with the O(1) read off the eigenvector, so the correction is periodic in j
// and not asymptotic. Computed by direct min-plus powers below.
//
//      p   p%6    j=1    j=2    j=3    j=4    j=5    j=6     |   c_min(j) - 3pj   (j = 1..6)   closed form
//      7     1     12     42     54     84     96    126     |        -9      0     -9      0     -9      0   3pj - 9*[j odd]  ok
//     11     5     24     66     90    132    156    198     |        -9      0     -9      0     -9      0   3pj - 9*[j odd]  ok
//     13     1     24     78    102    156    180    234     |       -15      0    -15      0    -15      0   3pj - 15*[j odd]  ok
//     17     5     36    102    138    204    240    306     |       -15      0    -15      0    -15      0   3pj - 15*[j odd]  ok
//     19     1     36    114    150    228    264    342     |       -21      0    -21      0    -21      0   3pj - 21*[j odd]  ok
//     23     5     48    138    186    276    324    414     |       -21      0    -21      0    -21      0   3pj - 21*[j odd]  ok
//     29     5     60    174    234    348    408    522     |       -27      0    -27      0    -27      0   3pj - 27*[j odd]  ok
//     31     1     60    186    246    372    432    558     |       -33      0    -33      0    -33      0   3pj - 33*[j odd]  ok
//     37     1     72    222    294    444    516    666     |       -39      0    -39      0    -39      0   3pj - 39*[j odd]  ok
//     41     5     84    246    330    492    576    738     |       -39      0    -39      0    -39      0   3pj - 39*[j odd]  ok
//     43     1     84    258    342    516    600    774     |       -45      0    -45      0    -45      0   3pj - 45*[j odd]  ok
//
// So Theorem A "span >= c_min(L-1) ~ 3p(L-1)" is exactly
//    span >= 3p(L-1) - (p+2)[L even]     for p = 1 mod 6,
//    span >= 3p(L-1) - (p-2)[L even]     for p = 5 mod 6,
// the correction being the min-plus eigenvector coordinate and nothing else.
//
// ==============================================================================
// 3b. THE RECORD RUNS, RECOMPUTED: ARE THEY THE CRITICAL CIRCUIT?
// ==============================================================================
// A kill run lives in the BIG tile (period W*p, where p | W*p), not inside one
// copy: crossing a copy boundary shifts the strike class by w = W mod p, so a
// cyclic scan of a single copy is the wrong object and would report runs that
// do not exist. Below: over all p*D positions of the folded tile, the longest
// run of consecutive DELETED slots, and its interior gap word.
//
//     x    p    L   run gap word (interior)   in p-units             adjacent sums    6p   critical?   span   c_min(L-1)
//     5    7    2                      12                  1.714                -    42    yes (attains c_min)    12          12
//     7   11    1                       -                      -                -    66                      -     -           -
//    11   13    2                      24                  1.846                -    78    yes (attains c_min)    24          24
//    13   17    2                      36                  2.118                -   102    yes (attains c_min)    36          36
//    17   19    2                      36                  1.895                -   114    yes (attains c_min)    36          36
//    19   23    3                   48+90            2.087,3.913              138   138    yes (attains c_min)   138         138
//    23   29    2                      60                  2.069                -   174    yes (attains c_min)    60          60
//
//   CITED, kappa-not-L.md (Theorem A, "attained with equality at every fold with
//   L >= 2, all seven"): fold 23 gives 48+90 = 2p+2, 4p-2 and fold 31 gives
//   60+126+60 = 2p-2, 4p+2, 2p-2, adjacent sums 138 = 6*23 and 186 = 6*31.
//   CITED, research/qc.js section W2 (the gate recomputes these): the true
//   diagonal L is 2, 1, 2, 2, 2, 3, 2 at folds 7, 11, 13, 17, 19, 23, 29.
//
// ==============================================================================
// SELF-TESTS: all passed.
// elapsed 3.8 s
// ==============================================================================
// ───── stderr ─────
// [0.0s] built T_5  D = 3
// [0.0s] built T_7  D = 15
// [0.0s] built T_11  D = 135
// [0.0s] built T_13  D = 1485
// [0.0s] built T_17  D = 22275
// [0.0s] built T_19  D = 378675
// [0.0s] built T_23  D = 7952175
// ============================================================================
// READINGS
// ============================================================================

// 1. THE MAPPING IS EXACT, AND IT IS NOT AN ANALOGY. ||A^{ox m}|| = maxsum_m
//    holds at every (x, m) tested by DENSE max-plus matrix powers -- 24 cells at
//    x = 5, 7, 11 with m <= 8 -- and at every power the count of finite entries
//    is exactly D, all on the +m diagonal, so the tile digraph has exactly one
//    circuit and nothing else. The fold is duplication followed by max-plus state
//    elimination and it reproduces the true fold's gap word with cyclic shift 0
//    at 6 of 6 folds, up to T_17 -> T_19 where the word has 378,675 gaps. The
//    copy theorem of U-FRAME 5a step 2 is a semiring identity, and this file is
//    the statement of which semiring.
//
// 2. THE TROPICAL PERRON ROOT IS THE MEAN GAP, AND G2 IS THE OPERATOR NORM.
//    Karp's maximum cycle mean, run on the digraph without ever being told W or
//    D, returns 10.000000, 14.000000, 17.111111, 20.222222 at x = 5, 7, 11, 13,
//    equal to W/D to nine decimals. lambda/ln^2 x reads 3.8606, 3.6973, 2.9759,
//    3.0738, 2.8551, 2.9545, 2.8536 at x = 5..23, descending toward Mertens'
//    2.4009. So max-plus spectral theory applied to the natural operator of this
//    problem answers a question the corpus already answered by Mertens, and the
//    growth of G2 is entirely in G2/lambda, which runs 1.2000, 2.1429, 2.4545,
//    3.2637, 4.7123, 5.8560, 7.2716 over the same levels. THE EIGENVALUE CARRIES
//    NONE OF IT. That is the first honest negative of this import and it is
//    structural, not a failure of range.
//
// 3. THE SYSTEM IS EXACTLY PERIODIC: CYCLICITY D, TRANSIENT 0.
//    maxsum_{m+D} = maxsum_m + W at all fifteen tested cells, exactly, including
//    m = 1 and m = D. So Fekete's limit maxsum_m/m -> mbar is not approached, it
//    is attained at the period and repeats. Everything the max-plus Perron
//    theorem has to say about the tile is finished in one line.
//
// 4. THE HARD PART IS THE EIGENVECTOR'S AMPLITUDE, AND IT IS NOT G2.
//    The identity spread(u) = max_m (maxsum_m - m*mbar) is verified against an
//    independent O(D^2) scan at all five levels where D allows it (x <= 17).
//    spread/G2 rises 0.3333, 0.9333, 2.0212, 2.0943, 3.1163, 5.6618, 7.3899 and
//    spread/mbar rises 0.400 to 53.736 across x = 5..23. So the tile's largest
//    excess over its own mean is 7.4 times G2 at x = 23 and growing, and it is
//    realised by a window of 232,994 gaps, not by the record gap. G2 is a small
//    part of the tropical eigenvector's amplitude, which is a fact about the
//    object that no instrument in the corpus had reported.
//
// 5. THE ALTERNATION AUTOMATON IS MIN-PLUS AND A5's THEOREM A IS ITS PERRON
//    THEOREM. The minimum cycle mean of B_p is 3p at all 23 primes from 5 to 97,
//    and the min-plus eigenvector (0, 3p - c_{-2}) satisfies both rows exactly at
//    all 23. c_min = 3p is therefore an EIGENVALUE. kappa-not-L.md's "the
//    alternation condition is worth exactly 3/2 and no more" is the sharpness of
//    a Perron root, which is why no sharpening of the automaton can raise it: the
//    only ways past 3p are to change the weights (arithmetic) or to add states.
//
// 6. AND THEOREM A's "ABOUT 3p(L-1)" IS AN IDENTITY, NOT AN APPROXIMATION.
//    Direct min-plus powers give c_min(j) - 3pj = -9, 0, -9, 0, -9, 0 at p = 7
//    and the same alternating shape at all eleven primes tested, so
//        c_min(j) = 3pj - (p+2)*[j odd]   for p = 1 (mod 6),
//        c_min(j) = 3pj - (p-2)*[j odd]   for p = 5 (mod 6),
//    exactly, for j = 1..6 at p = 7..43. The correction is the eigenvector
//    coordinate and nothing else. This is a small sharpening of a proven theorem,
//    delivered by the import rather than by more computation.
//
// 7. THE RECORD RUNS ARE THE CRITICAL PATH, 6 OF 6. At every fold with L >= 2 the
//    cheapest maximal run's span equals c_min(L-1) exactly: 12, 24, 36, 36, 138,
//    60 at folds 7, 13, 17, 19, 23, 29. Fold 23's run is 48+90 with adjacent sum
//    138 = 6p, the two-state critical circuit itself. So the extremal words are
//    not approximate max-plus eigenvectors, they are exact min-plus critical
//    circuits, which is the strongest form the Perron prediction could take.
//    Every interior gap of every record run qualifies mod p, checked.
//
// 8. A METHODOLOGICAL FINDING WORTH KEEPING. A kill run must be scanned on the
//    BIG tile. W is not divisible by p, so crossing a copy boundary shifts the
//    strike class by w = W mod p, and a cyclic scan of ONE copy reports L = 2 at
//    fold 11 (interior gap 12, which is 1 mod 11 and does not qualify) where the
//    truth is L = 1. The corrected scan returns 2, 1, 2, 2, 2, 3, 2 at folds
//    7..29, matching research/qc.js section W2 at all seven.
//
// 9. THE CLOSURE GAP, QUANTIFIED. All p alignments of a fold act on ONE tile and
//    therefore share ONE plain maxsum vector, so any reduction of the state to
//    that vector must predict a single Delta_m and the observed spread is exactly
//    what it loses. At m = 1 the spread max_a/min_a reads 2.5000, 1.4000, 1.3750,
//    1.2000, 1.0870, 1.1333 at x = 5..19 here, and 1.1622, 1.0943 at x = 23, 29
//    cited from attack-0c0e-01-deleted-family.js. In nats that is 0.9163 falling
//    to 0.0834 and then 0.1252, 0.1503, 0.0901: the defect shrinks with depth but
//    does not vanish, and at the deepest measured level it is still 0.09 nats.
//    A finite-dimensional max-plus state does not exist for this recursion at any
//    truncation M, and this is the measurement of by how much.
//
// 10. THE A9 CONNECTION, STATED PRECISELY. Holt and Rudd 2014 5's M_J is the same
//    operator over the COUNTING semiring; the object here is its TROPICALIZATION.
//    The two Perron roots are the same Mertens fact in two semirings: the
//    counting operator multiplies the state's dimension by p-2 (the D column
//    reads 3, 15, 135, 1485, 22275, 378675, 7952175, ratios 5, 9, 11, 15, 17, 21)
//    and the tropical eigenvalue by p/(p-2) (the lambda column reads 10.0000,
//    14.0000, 17.1111, 20.2222, 22.9185, 25.6148, 28.0543). The counting operator
//    is CLOSED on the histogram, which makes it an exact simulator and no source
//    of bounds (U-FRAME 11); the tropical operator would give bounds directly and
//    is NOT closed on the maxsum vector, by reading 9. Tropicalization buys the
//    bound and loses the closure, and that trade is the whole of the difficulty
//    in one sentence.
//
// 11. WHAT THIS FILE DOES NOT SHOW. It proves no bound on G2, on Delta_m, or on
//    L. It does not extend any ladder. The alignment spread at x = 23 and 29 is
//    cited, not recomputed. Nothing is fitted and nothing is extrapolated. The
//    two new mathematical statements are readings 6 (c_min(j) exactly) and 9
//    (the closure defect is the alignment spread, measured), and the two negatives
//    are readings 2 and 10.
