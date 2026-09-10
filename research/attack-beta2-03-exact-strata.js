// ============================================================================
// DP3: RE-INSERTING EXACT BUCHSTAB STRATA INTO THE TWO-CLASS INTERVAL SIFT
//
// `research/sift-limit-attack.md` §1 names five discard points in the
// Diamond-Halberstam Theorem 9.1 pipeline. DP3 is the truncated Buchstab
// recursion S(A,z) = S(A,z1) - sum_{z1<=p<z} S(A_p,p), in which every
// discarded stratum is priced at its worst case (0 from below, the density
// envelope from above). That file says beta_2 = 4.26645 is the point where the
// accumulated worst-case losses swallow the main term, that for OUR sequence
// every discarded stratum is itself a two-class interval sift at a smaller
// scale, and that no published sieve re-inserts exact strata. This script
// re-inserts them and measures what the positivity threshold becomes.
//
// A = { r(r+2) : x < r <= x+H }.  Sifting primes p_1 < ... < p_k.
// T_j       = the tile sifted by p_1..p_j (positions r with r != 0, -2 mod p_i)
// N_j(x,H)  = |T_j intersect (x, x+H]|
// Str_i(x,H)= #{ r in (x,x+H] : r in T_{i-1} and p_i | r(r+2) }
//           = #{ r in (x,x+H] : the LEAST prime dividing r(r+2) is p_i }
//
// Buchstab, exactly:   N_k = N_j - sum_{i>j} Str_i        (checked in §1b).
//
// THE CUT FAMILY. For every j the inequality
//     min_x N_k(x,H)  >=  min_x N_j(x,H) - sum_{i>j} max_x Str_i(x,H)
// is a valid all-positions lower bound. j = k is the untruncated identity (a
// tautology: it returns the true G2). j = 0 keeps nothing and prices every
// stratum at its exact maximum. j interpolates. u*(j) = log H*/log p_k for the
// least H* making the bound positive is the positivity threshold, to be read
// against beta_2 = 4.26645028414864191641 and against log G2 / log p_k.
//
// Every max and min below is over a FULL PERIOD, so exact, never sampled.
// Runtime about 25 s.
// ============================================================================
'use strict';

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23];
const BETA2 = 4.26645028414864191641;
const EULER = 0.5772156649015328606;

// The exact G2 ladder. x <= 43 from research/exact-g2-ladder.js (this repo's
// own enumerations). x = 47..79 from OEIS A144311 under the conversion
// a(n) = G2 - 1, m = r + 1; not re-derived here, and their maximality is
// established in research/history/staging/attack-beta2-05-covering-pruning-bound.md.
// The levels this script actually uses (x <= 23) are recomputed from scratch
// in §1b, census and max gap both.
const G2_LADDER = [
  [2, 2], [3, 6], [5, 12], [7, 30], [11, 42], [13, 66], [17, 108], [19, 150],
  [23, 204], [29, 258], [31, 348], [37, 528], [41, 546], [43, 618],
  [47, 708], [53, 870], [59, 966], [61, 1080], [67, 1284], [71, 1398],
  [73, 1530], [79, 1710],
];

const gcd = (a, b) => { while (b) { const t = a % b; a = b; b = t; } return a; };
const invMod = (a, m) => { let r = 1 % m; for (let i = 1; i < m; i++) if ((i * a) % m === r) return i; return NaN; };

// ---------------------------------------------------------------------------
// Tiles and strata as sorted cyclic position lists. Folding T_{j-1} by p_j
// tiles the old pattern p_j times and deletes exactly the two classes 0 and -2
// (the Copying Theorem); the deleted set IS the stratum.
// ---------------------------------------------------------------------------
function buildTilesAndStrata(primes) {
  const tiles = [Int32Array.from([0])], periods = [1], strata = [null];
  for (let j = 0; j < primes.length; j++) {
    const p = primes[j], Qold = periods[j], L = tiles[j];
    const keep = new Int32Array(Math.max(p - 2, 1) * L.length);
    const cut = new Int32Array(2 * L.length);
    let nk = 0, nc = 0;
    const dead = p === 2 ? -1 : p - 2;              // -2 mod p; for p=2 it is 0
    for (let a = 0; a < p; a++) {
      const off = a * Qold;
      for (let t = 0; t < L.length; t++) {
        const r = L[t] + off, m = r % p;
        if (m === 0 || m === dead) cut[nc++] = r; else keep[nk++] = r;
      }
    }
    tiles.push(keep.subarray(0, nk));
    strata.push(cut.subarray(0, nc));
    periods.push(Qold * p);
  }
  return { tiles, strata, periods };
}

// Exact max / min number of list elements in a window of H consecutive
// integers, over ALL window positions; list cyclic with period Q. O(n).
function windowExtremes(list, Q, H) {
  const n = list.length, full = Math.floor(H / Q), rem = H - full * Q;
  if (rem === 0) return { max: full * n, min: full * n };
  let hi = 0, b = 0;
  for (let a = 0; a < n; a++) {
    const base = list[a];
    while (b < a + n && (b < n ? list[b] : list[b - n] + Q) - base <= rem - 1) b++;
    if (b - a > hi) hi = b - a;
  }
  let lo = n; b = 0;
  for (let a = 0; a < n; a++) {
    const base = list[a];
    while (b < a + n && (b < n ? list[b] : list[b - n] + Q) - base <= rem) b++;
    if (b - a - 1 < lo) lo = b - a - 1;
  }
  return { max: full * n + hi, min: full * n + lo };
}

function maxGap(list, Q) {
  let g = list[0] + Q - list[list.length - 1];
  for (let i = 1; i < list.length; i++) { const d = list[i] - list[i - 1]; if (d > g) g = d; }
  return g;
}

function dilate(list, Q, m) {
  const out = new Int32Array(list.length);
  for (let i = 0; i < list.length; i++) out[i] = (m * list[i]) % Q;
  out.sort();
  return out;
}

// ===========================================================================
console.log('=== 1. THE STRUCTURE: WHAT A DISCARDED STRATUM IS ===================');
console.log('');
console.log('STRATUM DILATION. Fix a sifting prime p; let T- be the tile sifted by all');
console.log('primes q < p, of period Q-. Then as subsets of Z/(p*Q-),');
console.log('    { r : r = 0  mod p, r in T- } = p * A_p,  A_p = p^{-1} . T-');
console.log('    { r : r = -2 mod p, r in T- } = p * B_p - 2, B_p = -p^{-1} . T-');
console.log('A_p is again a two-class tile at level p-, cut by the class pair');
console.log('{0, -2/p mod q} at every q < p; B_p by {0, +2/p mod q}. So a discarded');
console.log('stratum is EXACTLY two two-class interval sifts, at length H/p, level p-,');
console.log('same dimension kappa = 2, same local densities omega(q) = 2 -- but with');
console.log('the class offset DIVIDED BY p. Iterating, the offset vector transforms as');
console.log('c -> c/p, so the family generated from the twin tile c_q = -2 is');
console.log('{ c_q = -2/m mod q }, indexed by squarefree m built from sifting primes,');
console.log('and every member is the multiplicative dilate m^{-1}.T of the twin tile.');
console.log('The identity is verified below.');
console.log('');

const B = buildTilesAndStrata(PRIMES);
const K = PRIMES.length;
{
  console.log('p    Q(p-)      |T-|     p^{-1} mod Q(p-)  branch = p*(p^{-1}.T-)  class offsets -2/p mod q');
  for (let j = 1; j < K; j++) {
    const p = PRIMES[j], Qm = B.periods[j], Tm = B.tiles[j];
    const inv = invMod(p % Qm, Qm);
    const A = new Set(); for (const t of Tm) A.add((inv * t) % Qm);
    const branch = [];
    for (let a = 0; a < p; a++) for (const t of Tm) { const r = t + a * Qm; if (r % p === 0) branch.push(r); }
    let ok = branch.length === Tm.length;
    for (const r of branch) if (!A.has(r / p)) ok = false;
    const offs = PRIMES.filter(q => q < p).map(q => ((-2 * invMod(p % q, q)) % q + q) % q);
    console.log(String(p).padEnd(5) + String(Qm).padEnd(11) + String(Tm.length).padEnd(9) +
      String(inv).padEnd(18) + (ok ? 'VERIFIED' : 'FAILED <--').padEnd(24) + '[' + offs.join(', ') + ']');
  }
}
console.log('');
console.log('The twin tile has c_q = -2 at EVERY q. The stratum tiles have c_q = -2/p,');
console.log('a different residue at every q. The two are carried onto each other by');
console.log('multiplication by p mod Q, a bijection of Z/Q taking slots to slots --');
console.log('and one that does not preserve intervals. The self-similarity is exact');
console.log('for the tile as a set with congruence structure and FALSE for the tile as');
console.log('a set with order, and the sieve only ever asks order questions. §2 sizes');
console.log('the damage.');

// ===========================================================================
console.log('');
console.log('=== 1b. THE LADDER AND THE IDENTITY, RECOMPUTED FROM SCRATCH =========');
console.log('');
console.log('j  p_j  Q_j          |T_j|     prod(p-2)  maxgap  G2(p_j#)  |Str_j|   match');
{
  let D = 1n, allOk = true;
  for (let j = 1; j <= K; j++) {
    const p = PRIMES[j - 1];
    D *= BigInt(p === 2 ? 1 : p - 2);
    const g = maxGap(B.tiles[j], B.periods[j]);
    const lad = G2_LADDER.find(e => e[0] === p)[1];
    const ok = BigInt(B.tiles[j].length) === D && g === lad;
    allOk = allOk && ok;
    console.log(String(j).padEnd(3) + String(p).padEnd(5) + String(B.periods[j]).padEnd(13) +
      String(B.tiles[j].length).padEnd(10) + String(D).padEnd(11) + String(g).padEnd(8) +
      String(lad).padEnd(10) + String(B.strata[j].length).padEnd(10) + (ok ? 'YES' : 'NO <-- FAILED'));
  }
  console.log('census = Schemmel product and maxgap = the G2 ladder, all levels: ' + allOk);
}
{
  console.log('');
  console.log('Buchstab identity N_k(x,H) = N_j(x,H) - sum_{i>j} Str_i(x,H), spot check:');
  const sets = B.tiles.map(t => { const S = new Set(); for (const v of t) S.add(v); return S; });
  const ssets = B.strata.map(t => { if (!t) return null; const S = new Set(); for (const v of t) S.add(v); return S; });
  const cnt = (S, Q, x, H) => { let c = 0; for (let r = x + 1; r <= x + H; r++) if (S.has(((r % Q) + Q) % Q)) c++; return c; };
  let allOk = true;
  for (const [x, H, j] of [[0, 500, 0], [12345, 700, 3], [999983, 1000, 5], [50000000, 250, 7], [77, 3000, 2], [223092869, 900, 8]]) {
    const lhs = cnt(sets[K], B.periods[K], x, H);
    let rhs = cnt(sets[j], B.periods[j], x, H);
    for (let i = j + 1; i <= K; i++) rhs -= cnt(ssets[i], B.periods[i], x, H);
    const ok = lhs === rhs; allOk = allOk && ok;
    console.log(`  x=${String(x).padEnd(10)} H=${String(H).padEnd(5)} j=${j}  N_k=${String(lhs).padEnd(5)} rhs=${String(rhs).padEnd(5)} ${ok ? 'OK' : 'MISMATCH <-- FAILED'}`);
  }
  console.log('  identity holds at every spot checked: ' + allOk);
}

// ===========================================================================
console.log('');
console.log('=== 2. THE OBSTRUCTION: IS THE TWIN TILE SPECIAL IN ITS OWN FAMILY? ==');
console.log('');
console.log('The strata live on the dilates m^{-1}.T. If those are as regular as T,');
console.log('exactness transfers. If they are worse, exact re-insertion must pay the');
console.log('FAMILY supremum, not the twin value. m = p^{-1} for p the next primes');
console.log('above the level are the dilates the recursion actually produces.');
console.log('');
for (const lvl of [13, 17, 19]) {
  const idx = PRIMES.indexOf(lvl) + 1, T = B.tiles[idx], Q = B.periods[idx];
  const Ls = [6 * lvl, 12 * lvl, 24 * lvl];
  const named = [{ tag: '1 (TWIN TILE)', m: 1 }];
  for (const p of [23, 29, 31, 37, 41, 43]) if (p > lvl) named.push({ tag: `${p}^-1`, m: invMod(p % Q, Q) });
  console.log(`level p <= ${lvl}:  Q = ${Q}   |T| = ${T.length}   density ${(T.length / Q).toFixed(6)}`);
  console.log('  m               maxgap   ' + Ls.map(L => ('maxcnt@' + L).padEnd(12)).join(''));
  const gapOf = {};
  for (const e of named) {
    const Tm = e.m === 1 ? T : dilate(T, Q, e.m);
    const g = maxGap(Tm, Q); gapOf[e.tag] = g;
    console.log('  ' + e.tag.padEnd(16) + String(g).padEnd(9) +
      Ls.map(L => String(windowExtremes(Tm, Q, L).max).padEnd(12)).join(''));
  }
  const samp = [];
  for (let t = 1; t <= 60; t++) {
    const m = (t * 2654435761) % Q;
    if (gcd(m, Q) !== 1) continue;
    const Tm = dilate(T, Q, m);
    samp.push({ g: maxGap(Tm, Q), c: Ls.map(L => windowExtremes(Tm, Q, L).max) });
  }
  const gs = samp.map(s => s.g).sort((a, b) => a - b);
  console.log('  ' + `${samp.length} random m`.padEnd(16) +
    `${gs[0]}/${gs[gs.length >> 1]}/${gs[gs.length - 1]}`.padEnd(9) +
    Ls.map((L, q) => { const c = samp.map(s => s.c[q]).sort((a, b) => a - b); return `${c[0]}/${c[c.length >> 1]}/${c[c.length - 1]}`.padEnd(12); }).join('') + '  (min/median/max)');
  const tw = gapOf['1 (TWIN TILE)'];
  console.log(`  twin maxgap ${tw} = G2; of the ${samp.length} random dilates, ` +
    `${gs.filter(g => g < tw).length} have a SMALLER max gap and ${gs.filter(g => g > tw).length} a LARGER one.`);
  console.log('');
}

// ===========================================================================
console.log('=== 3. THE THRESHOLDS ===============================================');
console.log('');
console.log('u*(j) = log H*/log p_k, H* = least H on the grid with');
console.log('   min_x N_j(x,H) - sum_{i>j} max_x Str_i(x,H) > 0');
console.log('AND the bound positive at every larger grid point. The bound is NOT');
console.log('monotone in H, so the FIRST crossing is reported separately, and the first');
console.log('crossing is the operative one: positivity at a single H already proves');
console.log('G2(p_k#) <= H, because every window of H consecutive integers then meets');
console.log('the tile. Grid: every integer to 700 (so every first crossing below is');
console.log('unit-exact), then geometric with ratio 1.02 (du = 0.0067 at p_k = 19).');
console.log('j = k is the untruncated identity: it must return H* = G2 exactly.');
console.log('');

const GRID = (() => {
  const g = []; for (let H = 1; H <= 700; H++) g.push(H);
  let H = 701; while (H < 1.2e6) { g.push(H); H = Math.max(H + 1, Math.round(H * 1.02)); }
  return g;
})();
// one sweep: min-counts of every T_j (j < K) and max-counts of every stratum
const MN = B.tiles.map(() => new Int32Array(GRID.length));
const MX = B.strata.map(() => new Int32Array(GRID.length));
for (let a = 0; a < GRID.length; a++) {
  const H = GRID[a];
  for (let j = 0; j < K; j++) MN[j][a] = windowExtremes(B.tiles[j], B.periods[j], H).min;
  for (let i = 1; i <= K; i++) MX[i][a] = windowExtremes(B.strata[i], B.periods[i], H).max;
}

for (const lvl of [7, 11, 13, 17, 19, 23]) {
  const kk = PRIMES.indexOf(lvl) + 1;
  const G2 = G2_LADDER.find(e => e[0] === lvl)[1];
  console.log(`--- sifting primes p <= ${lvl}   (k = ${kk}, Q = ${B.periods[kk]}, G2 = ${G2}, ` +
    `u_true = ${(Math.log(G2) / Math.log(lvl)).toFixed(4)}) ---`);
  console.log('  j  cut at  H* stable  u*(j)    H* first  u* first  verdict');
  for (let j = 0; j <= kk; j++) {
    let stable = null, first = null;
    if (j === kk) { stable = first = G2; }          // identity: analytic, = max gap
    else {
      const v = new Int32Array(GRID.length);
      for (let a = 0; a < GRID.length; a++) {
        let s = MN[j][a];
        for (let i = j + 1; i <= kk; i++) s -= MX[i][a];
        v[a] = s;
      }
      for (let a = 0; a < GRID.length; a++) if (v[a] > 0) { first = GRID[a]; break; }
      for (let a = GRID.length - 1; a >= 0; a--) {
        if (v[a] <= 0) { stable = a + 1 < GRID.length ? GRID[a + 1] : null; break; }
        if (a === 0) stable = GRID[0];
      }
    }
    const us = stable === null ? NaN : Math.log(stable) / Math.log(lvl);
    const uf = first === null ? NaN : Math.log(first) / Math.log(lvl);
    const verdict = j === kk ? 'IDENTITY (tautology: returns G2)'
      : stable === null ? 'never positive on the grid'
        : us < BETA2 ? `BELOW beta_2 by ${(BETA2 - us).toFixed(3)}` : `above beta_2 by ${(us - BETA2).toFixed(3)}`;
    console.log('  ' + String(j).padEnd(3) + String(j === 0 ? '-' : PRIMES[j - 1]).padEnd(8) +
      String(stable === null ? '-' : stable).padEnd(11) + (isNaN(us) ? '-' : us.toFixed(4)).padEnd(9) +
      String(first === null ? '-' : first).padEnd(10) + (isNaN(uf) ? '-' : uf.toFixed(4)).padEnd(10) + verdict);
  }
  console.log('');
}

// ===========================================================================
console.log('=== 4. WHAT DHR PAYS FOR THE SAME STRATA ============================');
console.log('');
console.log('The sieve cannot see max_x Str_i. It sees the axioms, and prices the');
console.log('stratum at main_i * F_2(u_i), with F_2 the DHR upper function and u_i =');
console.log('log(H/p_i)/log(p_{i-1}) the stratum parameter. Measured ratio vs F_2(u_i):');
console.log('');

// DHR sigma_2 (Ankeny-Onishi) and the (F_2, f_2) system, by the method of steps.
function dhrFunctions() {
  const h = 1e-4, UMAX = 30, N = Math.round(UMAX / h);
  const ALPHA = 5.35772744559446184227, BETA = BETA2;
  const A0 = Math.pow(2 * Math.exp(EULER), -2) / 2;      // Gamma(1+kappa) = 2
  const g = new Float64Array(N + 1);
  for (let n = 0; n <= N; n++) {
    const u = n * h;
    if (u <= 2) { g[n] = A0; continue; }
    const um = u - h / 2, nm = Math.round((um - 2) / h);
    g[n] = g[n - 1] + h * (-2 * Math.pow(um, -3) * Math.pow(um - 2, 2) * g[Math.max(nm, 0)]);
  }
  const F = new Float64Array(N + 1), f = new Float64Array(N + 1);
  for (let n = 1; n <= N; n++) { const u = n * h; if (u <= ALPHA) F[n] = 1 / (u * u * g[n]); }
  const at = (arr, u) => { const n = Math.round(u / h); return n <= 0 ? 0 : arr[Math.min(n, N)]; };
  for (let n = Math.round(BETA / h) + 1; n <= N; n++) {
    const u = n * h, um = u - h / 2, up = u - h;
    if (u > BETA) f[n] = (up * up * f[n - 1] + h * 2 * um * at(F, um - 1)) / (u * u);
    if (u > ALPHA) F[n] = (up * up * F[n - 1] + h * 2 * um * at(f, um - 1)) / (u * u);
  }
  return { F: u => at(F, u), f: u => at(f, u) };
}
const DHR = dhrFunctions();
console.log('solver validation (F_2 and f_2 must both decrease/increase to 1):');
console.log('  u      F_2(u)     f_2(u)');
for (const u of [2, 3, 4.2, 4.5, 5, 6, 8, 12, 20, 28])
  console.log('  ' + String(u).padEnd(7) + DHR.F(u).toFixed(6).padEnd(11) + DHR.f(u).toFixed(6));
console.log('');

for (const lvl of [19, 23]) {
  const kk = PRIMES.indexOf(lvl) + 1;
  for (const uu of [2.0, BETA2]) {
    const H = Math.round(Math.pow(lvl, uu));
    console.log(`p <= ${lvl}, H = round(${lvl}^${uu.toFixed(4)}) = ${H}`);
    console.log('  i  p_i  main_i        max_x Str_i   exact ratio  u_i      F_2(u_i)     DHR overpays');
    let sm = 0, sx = 0, sd = 0;
    for (let i = 1; i <= kk; i++) {
      const p = PRIMES[i - 1], sub = i >= 2 ? PRIMES[i - 2] : null;
      const main = (p === 2 ? 1 : 2) * H * (B.tiles[i - 1].length / B.periods[i - 1]) / p;
      const mx = windowExtremes(B.strata[i], B.periods[i], H).max;
      const ui = sub ? Math.log(H / p) / Math.log(sub) : NaN;
      const Fu = sub ? DHR.F(ui) : 1;
      sm += main; sx += mx; sd += main * Fu;
      console.log('  ' + String(i).padEnd(3) + String(p).padEnd(5) + main.toFixed(4).padEnd(14) +
        String(mx).padEnd(14) + (mx / main).toFixed(4).padEnd(13) +
        (sub ? ui.toFixed(3) : 'n/a').padEnd(9) + (sub ? Fu.toFixed(4) : '-').padEnd(13) +
        (sub ? (main * Fu / mx).toFixed(2) + 'x' : '-'));
    }
    const HV = H * B.tiles[kk].length / B.periods[kk];
    console.log(`  sum main = ${sm.toFixed(1)}   sum exact max = ${sx}   sum DHR envelope = ${sd.toFixed(1)}   H*V(z) = ${HV.toFixed(2)}`);
    console.log(`  depth-1 bound: exact strata H - ${sx} = ${(H - sx).toFixed(1)};   DHR envelope H - ${sd.toFixed(1)} = ${(H - sd).toFixed(1)}`);
    console.log('');
  }
}

// ---------------------------------------------------------------------------
console.log('=== 4b. THE SAME BOUND UNDER ENVELOPE PRICING =======================');
console.log('');
console.log('The cut-family bound rerun with the strata priced at main_i * F_2(u_i)');
console.log('instead of their exact maxima. Only the stratum pricing changes, so the');
console.log('difference in u* is DP3 and nothing else. NOTE: F_2 is the asymptotic');
console.log('envelope; Theorem 9.1 carries an unquantified o(1) that is large at these');
console.log('z, so this column is a SURROGATE for what the sieve pays, not a rigorous');
console.log('finite-z bound. The rigorous asymptotic answer for the whole method is');
console.log('beta_2 = 4.26645.');
console.log('');
console.log('  p_k  j   u* exact strata   u* envelope-priced   DP3 costs (exponent)');
for (const lvl of [13, 17, 19, 23]) {
  const kk = PRIMES.indexOf(lvl) + 1;
  for (const j of [0, kk - 1]) {
    const thr = (envelope) => {
      let stable = null;
      const v = new Float64Array(GRID.length);
      for (let a = 0; a < GRID.length; a++) {
        const H = GRID[a];
        let s = MN[j][a];
        for (let i = j + 1; i <= kk; i++) {
          if (!envelope) { s -= MX[i][a]; continue; }
          const p = PRIMES[i - 1], sub = i >= 2 ? PRIMES[i - 2] : null;
          const main = (p === 2 ? 1 : 2) * H * (B.tiles[i - 1].length / B.periods[i - 1]) / p;
          s -= main * (sub ? DHR.F(Math.log(Math.max(H / p, 1.0001)) / Math.log(sub)) : 1);
        }
        v[a] = s;
      }
      for (let a = GRID.length - 1; a >= 0; a--) {
        if (v[a] <= 0) { stable = a + 1 < GRID.length ? GRID[a + 1] : null; break; }
        if (a === 0) stable = GRID[0];
      }
      return stable === null ? NaN : Math.log(stable) / Math.log(lvl);
    };
    const ue = thr(false), uv = thr(true);
    console.log('  ' + String(lvl).padEnd(5) + String(j).padEnd(4) + ue.toFixed(4).padEnd(18) +
      (isNaN(uv) ? '> grid' : uv.toFixed(4)).padEnd(21) + (isNaN(uv) ? '-' : (uv - ue).toFixed(4)));
  }
}

// ---------------------------------------------------------------------------
console.log('');
console.log('=== 5. THE MEASURED (F, f) OF THE NATAL TILE AGAINST (F_2, f_2) =====');
console.log('');
console.log('Same normalisation the sieve uses. For the tile at level y and a window');
console.log('of L = y^u consecutive integers, over the FULL period:');
console.log('   F_meas(y,u) = max_x count / (L*V(y))     f_meas(y,u) = min_x count / (L*V(y))');
console.log('f_meas is 0 exactly while L < G2(y#), so the sequence\'s OWN sifting limit');
console.log('is log G2 / log y. That is the number beta_2 = 4.26645 is bounding.');
console.log('');
for (const u of [1.2, 1.5, 1.7, 2.0, 2.5, 3.0]) {
  console.log(`u = ${u.toFixed(2)}   F_2 = ${DHR.F(u).toFixed(3)}   f_2 = ${DHR.f(u).toFixed(3)}`);
  console.log('   y     L        F_meas   F_2/F_meas   f_meas   trend of F_meas in y');
  let prev = null;
  for (const y of [7, 11, 13, 17, 19, 23]) {
    const idx = PRIMES.indexOf(y) + 1, T = B.tiles[idx], Q = B.periods[idx];
    const L = Math.round(Math.pow(y, u)), main = L * T.length / Q;
    const w = windowExtremes(T, Q, L);
    const Fm = w.max / main, fm = w.min / main;
    console.log('   ' + String(y).padEnd(6) + String(L).padEnd(9) + Fm.toFixed(3).padEnd(9) +
      (DHR.F(u) / Fm).toFixed(2).padEnd(13) + fm.toFixed(3).padEnd(9) +
      (prev === null ? '-' : (Fm > prev ? '+' : Fm < prev ? '-' : '=') + (Fm - prev).toFixed(3)));
    prev = Fm;
  }
  console.log('');
}
console.log('And the same F_meas for the DILATED tiles the strata actually live on');
console.log('(level y = 19, 40 multipliers m coprime to Q, exact over the full period):');
{
  const y = 19, idx = PRIMES.indexOf(y) + 1, T = B.tiles[idx], Q = B.periods[idx];
  const dens = T.length / Q, ms = [];
  for (let t = 1; t <= 60 && ms.length < 40; t++) { const m = (t * 2654435761) % Q; if (gcd(m, Q) === 1) ms.push(m); }
  const dil = ms.map(m => dilate(T, Q, m));
  console.log('  u       L      twin F_meas   dilates F_meas (min .. max)   F_2(u)');
  for (const u of [1.2, 1.5, 1.7, 2.0, 2.5, 3.0]) {
    const L = Math.round(Math.pow(y, u)), main = L * dens;
    const tw = windowExtremes(T, Q, L).max / main;
    const rs = dil.map(d => windowExtremes(d, Q, L).max / main);
    console.log('  ' + u.toFixed(2).padEnd(8) + String(L).padEnd(7) + tw.toFixed(3).padEnd(14) +
      `${Math.min(...rs).toFixed(3)} .. ${Math.max(...rs).toFixed(3)}`.padEnd(30) + DHR.F(u).toFixed(3));
  }
}

// ---------------------------------------------------------------------------
console.log('');
console.log('=== 6. THE DECOUPLING EXCESS: THE WHOLE COST OF DP3, ISOLATED =======');
console.log('');
console.log('With exact strata the ONLY remaining loss is that the maxima are taken at');
console.log('independent positions. Since sum_i Str_i(x) = H - N_k(x) identically,');
console.log('   D(H) := sum_i max_x Str_i(x,H) - max_x sum_i Str_i(x,H)');
console.log('        =  sum_i max_x Str_i(x,H) - H + min_x N_k(x,H)   >= 0');
console.log('and the depth-1 bound is positive exactly when min_x N_k(H) > D(H). So');
console.log('the threshold is the crossing of the true survivor floor against D.');
console.log('');
for (const lvl of [13, 17, 19, 23]) {
  const kk = PRIMES.indexOf(lvl) + 1, G2 = G2_LADDER.find(e => e[0] === lvl)[1];
  console.log(`p <= ${lvl} (G2 = ${G2}):`);
  console.log('   H       min_x N_k   sum max Str   D(H)   min_x N_k - D(H)');
  for (const H of [G2, Math.round(G2 * 1.5), G2 * 2, G2 * 3, G2 * 5, G2 * 10, G2 * 30]) {
    const mn = windowExtremes(B.tiles[kk], B.periods[kk], H).min;
    let sx = 0;
    for (let i = 1; i <= kk; i++) sx += windowExtremes(B.strata[i], B.periods[i], H).max;
    const D = sx - H + mn;
    console.log('   ' + String(H).padEnd(8) + String(mn).padEnd(12) + String(sx).padEnd(14) +
      String(D).padEnd(7) + String(mn - D));
  }
  console.log('');
}

console.log('=== 7. THE LADDER EXPONENT, FOR REFERENCE ===========================');
console.log('');
console.log('x    G2      log G2/log x   local slope');
for (let i = 0; i < G2_LADDER.length; i++) {
  const [x, g] = G2_LADDER[i];
  const sl = i === 0 ? '-' : ((Math.log(g) - Math.log(G2_LADDER[i - 1][1])) /
    (Math.log(x) - Math.log(G2_LADDER[i - 1][0]))).toFixed(4);
  console.log(String(x).padEnd(5) + String(g).padEnd(8) + (Math.log(g) / Math.log(x)).toFixed(4).padEnd(15) + sl);
}

// ============================================================================
// PASTED OUTPUT (node research/attack-beta2-03-exact-strata.js, 2026-08-18)
// ============================================================================
// === 1. THE STRUCTURE: WHAT A DISCARDED STRATUM IS ===================
//
// STRATUM DILATION. Fix a sifting prime p; let T- be the tile sifted by all
// primes q < p, of period Q-. Then as subsets of Z/(p*Q-),
//     { r : r = 0  mod p, r in T- } = p * A_p,  A_p = p^{-1} . T-
//     { r : r = -2 mod p, r in T- } = p * B_p - 2, B_p = -p^{-1} . T-
// A_p is again a two-class tile at level p-, cut by the class pair
// {0, -2/p mod q} at every q < p; B_p by {0, +2/p mod q}. So a discarded
// stratum is EXACTLY two two-class interval sifts, at length H/p, level p-,
// same dimension kappa = 2, same local densities omega(q) = 2 -- but with
// the class offset DIVIDED BY p. Iterating, the offset vector transforms as
// c -> c/p, so the family generated from the twin tile c_q = -2 is
// { c_q = -2/m mod q }, indexed by squarefree m built from sifting primes,
// and every member is the multiplicative dilate m^{-1}.T of the twin tile.
// The identity is verified below.
//
// p    Q(p-)      |T-|     p^{-1} mod Q(p-)  branch = p*(p^{-1}.T-)  class offsets -2/p mod q
// 3    2          1        1                 VERIFIED                [0]
// 5    6          1        5                 VERIFIED                [0, 2]
// 7    30         3        13                VERIFIED                [0, 1, 4]
// 11   210        15       191               VERIFIED                [0, 2, 3, 3]
// 13   2310       135      1777              VERIFIED                [0, 1, 1, 2, 10]
// 17   30030      1485     3533              VERIFIED                [0, 2, 4, 4, 7, 6]
// 19   510510     22275    26869             VERIFIED                [0, 1, 2, 1, 8, 4, 16]
// 23   9699690    378675   1265177           VERIFIED                [0, 2, 1, 6, 9, 5, 11, 9]
//
// The twin tile has c_q = -2 at EVERY q. The stratum tiles have c_q = -2/p,
// a different residue at every q. The two are carried onto each other by
// multiplication by p mod Q, a bijection of Z/Q taking slots to slots --
// and one that does not preserve intervals. The self-similarity is exac
// for the tile as a set with congruence structure and FALSE for the tile as
// a set with order, and the sieve only ever asks order questions. §2 sizes
// the damage.
//
// === 1b. THE LADDER AND THE IDENTITY, RECOMPUTED FROM SCRATCH =========
//
// j  p_j  Q_j          |T_j|     prod(p-2)  maxgap  G2(p_j#)  |Str_j|   match
// 1  2    2            1         1          2       2         1         YES
// 2  3    6            1         1          6       6         2         YES
// 3  5    30           3         3          12      12        2         YES
// 4  7    210          15        15         30      30        6         YES
// 5  11   2310         135       135        42      42        30        YES
// 6  13   30030        1485      1485       66      66        270       YES
// 7  17   510510       22275     22275      108     108       2970      YES
// 8  19   9699690      378675    378675     150     150       44550     YES
// 9  23   223092870    7952175   7952175    204     204       757350    YES
// census = Schemmel product and maxgap = the G2 ladder, all levels: true
//
// Buchstab identity N_k(x,H) = N_j(x,H) - sum_{i>j} Str_i(x,H), spot check:
//   x=0          H=500   j=0  N_k=20    rhs=20    OK
//   x=12345      H=700   j=3  N_k=25    rhs=25    OK
//   x=999983     H=1000  j=5  N_k=37    rhs=37    OK
//   x=50000000   H=250   j=7  N_k=10    rhs=10    OK
//   x=77         H=3000  j=2  N_k=101   rhs=101   OK
//   x=223092869  H=900   j=8  N_k=32    rhs=32    OK
//   identity holds at every spot checked: true
//
// === 2. THE OBSTRUCTION: IS THE TWIN TILE SPECIAL IN ITS OWN FAMILY? ==
//
// The strata live on the dilates m^{-1}.T. If those are as regular as T,
// exactness transfers. If they are worse, exact re-insertion must pay the
// FAMILY supremum, not the twin value. m = p^{-1} for p the next primes
// above the level are the dilates the recursion actually produces.
//
// level p <= 13:  Q = 30030   |T| = 1485   density 0.049451
//   m               maxgap   maxcnt@78   maxcnt@156  maxcnt@312
//   1 (TWIN TILE)   66       7           11          20
//   23^-1           84       7           11          20
//   29^-1           78       7           11          19
//   31^-1           84       7           11          20
//   37^-1           78       7           12          19
//   41^-1           90       8           11          20
//   43^-1           84       7           11          20
//   12 random m     60/84/1206/7/8       11/11/12    19/19/20      (min/median/max)
//   twin maxgap 66 = G2; of the 12 random dilates, 1 have a SMALLER max gap and 11 a LARGER one.
//
// level p <= 17:  Q = 510510   |T| = 22275   density 0.043633
//   m               maxgap   maxcnt@102  maxcnt@204  maxcnt@408
//   1 (TWIN TILE)   108      8           13          23
//   23^-1           120      9           13          23
//   29^-1           120      8           14          22
//   31^-1           132      9           13          23
//   37^-1           108      9           13          23
//   41^-1           138      8           14          23
//   43^-1           138      8           14          23
//   11 random m     90/120/1628/9/9       13/14/14    22/23/24      (min/median/max)
//   twin maxgap 108 = G2; of the 11 random dilates, 2 have a SMALLER max gap and 8 a LARGER one.
//
// level p <= 19:  Q = 9699690   |T| = 378675   density 0.039040
//   m               maxgap   maxcnt@114  maxcnt@228  maxcnt@456
//   1 (TWIN TILE)   150      9           15          26
//   23^-1           174      9           15          26
//   29^-1           168      9           15          25
//   31^-1           180      9           15          26
//   37^-1           174      9           15          25
//   41^-1           180      9           15          26
//   43^-1           198      9           16          25
//   10 random m     150/180/2049/9/9       15/15/15    24/25/26      (min/median/max)
//   twin maxgap 150 = G2; of the 10 random dilates, 0 have a SMALLER max gap and 9 a LARGER one.
//
// === 3. THE THRESHOLDS ===============================================
//
// u*(j) = log H*/log p_k, H* = least H on the grid with
//    min_x N_j(x,H) - sum_{i>j} max_x Str_i(x,H) > 0
// AND the bound positive at every larger grid point. The bound is NOT
// monotone in H, so the FIRST crossing is reported separately, and the firs
// crossing is the operative one: positivity at a single H already proves
// G2(p_k#) <= H, because every window of H consecutive integers then meets
// the tile. Grid: every integer to 700 (so every first crossing below is
// unit-exact), then geometric with ratio 1.02 (du = 0.0067 at p_k = 19).
// j = k is the untruncated identity: it must return H* = G2 exactly.
//
// --- sifting primes p <= 7   (k = 4, Q = 210, G2 = 30, u_true = 1.7479) ---
//   j  cut at  H* stable  u*(j)    H* first  u* first  verdic
//   0  -       64         2.1372   30        1.7479    BELOW beta_2 by 2.129
//   1  2       64         2.1372   30        1.7479    BELOW beta_2 by 2.129
//   2  3       48         1.9894   30        1.7479    BELOW beta_2 by 2.277
//   3  5       30         1.7479   30        1.7479    BELOW beta_2 by 2.519
//   4  7       30         1.7479   30        1.7479    IDENTITY (tautology: returns G2)
//
// --- sifting primes p <= 11   (k = 5, Q = 2310, G2 = 42, u_true = 1.5587) ---
//   j  cut at  H* stable  u*(j)    H* first  u* first  verdic
//   0  -       106        1.9448   72        1.7835    BELOW beta_2 by 2.322
//   1  2       106        1.9448   72        1.7835    BELOW beta_2 by 2.322
//   2  3       96         1.9035   72        1.7835    BELOW beta_2 by 2.363
//   3  5       72         1.7835   72        1.7835    BELOW beta_2 by 2.483
//   4  7       66         1.7472   66        1.7472    BELOW beta_2 by 2.519
//   5  11      42         1.5587   42        1.5587    IDENTITY (tautology: returns G2)
//
// --- sifting primes p <= 13   (k = 6, Q = 30030, G2 = 66, u_true = 1.6334) ---
//   j  cut at  H* stable  u*(j)    H* first  u* first  verdic
//   0  -       154        1.9638   132       1.9037    BELOW beta_2 by 2.303
//   1  2       154        1.9638   132       1.9037    BELOW beta_2 by 2.303
//   2  3       144        1.9376   132       1.9037    BELOW beta_2 by 2.329
//   3  5       144        1.9376   132       1.9037    BELOW beta_2 by 2.329
//   4  7       138        1.9210   126       1.8855    BELOW beta_2 by 2.345
//   5  11      108        1.8254   96        1.7795    BELOW beta_2 by 2.441
//   6  13      66         1.6334   66        1.6334    IDENTITY (tautology: returns G2)
//
// --- sifting primes p <= 17   (k = 7, Q = 510510, G2 = 108, u_true = 1.6526) ---
//   j  cut at  H* stable  u*(j)    H* first  u* first  verdic
//   0  -       274        1.9812   174       1.8209    BELOW beta_2 by 2.285
//   1  2       274        1.9812   174       1.8209    BELOW beta_2 by 2.285
//   2  3       186        1.8445   174       1.8209    BELOW beta_2 by 2.422
//   3  5       174        1.8209   174       1.8209    BELOW beta_2 by 2.446
//   4  7       174        1.8209   174       1.8209    BELOW beta_2 by 2.446
//   5  11      168        1.8085   168       1.8085    BELOW beta_2 by 2.458
//   6  13      156        1.7824   138       1.7391    BELOW beta_2 by 2.484
//   7  17      108        1.6526   108       1.6526    IDENTITY (tautology: returns G2)
//
// --- sifting primes p <= 19   (k = 8, Q = 9699690, G2 = 150, u_true = 1.7017) ---
//   j  cut at  H* stable  u*(j)    H* first  u* first  verdic
//   0  -       364        2.0028   210       1.8160    BELOW beta_2 by 2.264
//   1  2       364        2.0028   210       1.8160    BELOW beta_2 by 2.264
//   2  3       354        1.9933   210       1.8160    BELOW beta_2 by 2.273
//   3  5       354        1.9933   210       1.8160    BELOW beta_2 by 2.273
//   4  7       348        1.9875   210       1.8160    BELOW beta_2 by 2.279
//   5  11      330        1.9695   210       1.8160    BELOW beta_2 by 2.297
//   6  13      204        1.8062   204       1.8062    BELOW beta_2 by 2.460
//   7  17      198        1.7960   198       1.7960    BELOW beta_2 by 2.470
//   8  19      150        1.7017   150       1.7017    IDENTITY (tautology: returns G2)
//
// --- sifting primes p <= 23   (k = 9, Q = 223092870, G2 = 204, u_true = 1.6961) ---
//   j  cut at  H* stable  u*(j)    H* first  u* first  verdic
//   0  -       574        2.0260   420       1.9264    BELOW beta_2 by 2.240
//   1  2       574        2.0260   420       1.9264    BELOW beta_2 by 2.240
//   2  3       528        1.9994   420       1.9264    BELOW beta_2 by 2.267
//   3  5       522        1.9958   420       1.9264    BELOW beta_2 by 2.271
//   4  7       516        1.9921   420       1.9264    BELOW beta_2 by 2.274
//   5  11      450        1.9484   420       1.9264    BELOW beta_2 by 2.318
//   6  13      378        1.8928   366       1.8825    BELOW beta_2 by 2.374
//   7  17      372        1.8877   348       1.8664    BELOW beta_2 by 2.379
//   8  19      282        1.7994   282       1.7994    BELOW beta_2 by 2.467
//   9  23      204        1.6961   204       1.6961    IDENTITY (tautology: returns G2)
//
// === 4. WHAT DHR PAYS FOR THE SAME STRATA ============================
//
// The sieve cannot see max_x Str_i. It sees the axioms, and prices the
// stratum at main_i * F_2(u_i), with F_2 the DHR upper function and u_i =
// log(H/p_i)/log(p_{i-1}) the stratum parameter. Measured ratio vs F_2(u_i):
//
// solver validation (F_2 and f_2 must both decrease/increase to 1):
//   u      F_2(u)     f_2(u)
//   2      6.344438   0.000000
//   3      2.916437   0.000000
//   4.2    1.716509   0.000000
//   4.5    1.570435   0.240221
//   5      1.392835   0.578942
//   6      1.113599   0.884324
//   8      1.002642   0.997296
//   12     0.999974   0.999972
//   20     0.999973   0.999973
//   28     0.999973   0.999973
//
// p <= 19, H = round(19^2.0000) = 361
//   i  p_i  main_i        max_x Str_i   exact ratio  u_i      F_2(u_i)     DHR overpays
//   1  2    180.5000      181           1.0028       n/a      -            -
//   2  3    120.3333      121           1.0055       6.911    1.0242       1.02x
//   3  5    24.0667       25            1.0388       3.895    1.9079       1.84x
//   4  7    10.3143       12            1.1634       2.450    4.2486       3.65x
//   5  11   4.6883        7             1.4931       1.794    7.8851       5.28x
//   6  13   3.2458        6             1.8486       1.386    13.2069      7.14x
//   7  17   2.1002        5             2.3807       1.191    17.8818      7.51x
//   8  19   1.6580        4             2.4125       1.039    23.4948      9.74x
//   sum main = 346.9   sum exact max = 361   sum DHR envelope = 549.8   H*V(z) = 14.09
//   depth-1 bound: exact strata H - 361 = 0.0;   DHR envelope H - 549.8 = -188.8
//
// p <= 19, H = round(19^4.2665) = 285587
//   i  p_i  main_i        max_x Str_i   exact ratio  u_i      F_2(u_i)     DHR overpays
//   1  2    142793.5000   142794        1.0000       n/a      -            -
//   2  3    95195.6667    95196         1.0000       16.539   1.0000       1.00x
//   3  5    19039.1333    19040         1.0000       9.970    1.0000       1.00x
//   4  7    8159.6286     8160          1.0000       6.596    1.0426       1.04x
//   5  11   3708.9221     3713          1.0011       5.223    1.3330       1.33x
//   6  13   2567.7153     2572          1.0017       4.169    1.7337       1.73x
//   7  17   1661.4628     1669          1.0045       3.793    1.9844       1.98x
//   8  19   1311.6812     1325          1.0102       3.395    2.3620       2.34x
//   sum main = 274437.7   sum exact max = 274469   sum DHR envelope = 281323.7   H*V(z) = 11149.29
//   depth-1 bound: exact strata H - 274469 = 11118.0;   DHR envelope H - 281323.7 = 4263.3
//
// p <= 23, H = round(23^2.0000) = 529
//   i  p_i  main_i        max_x Str_i   exact ratio  u_i      F_2(u_i)     DHR overpays
//   1  2    264.5000      265           1.0019       n/a      -            -
//   2  3    176.3333      177           1.0038       7.462    1.0082       1.00x
//   3  5    35.2667       36            1.0208       4.243    1.6932       1.66x
//   4  7    15.1143       17            1.1248       2.687    3.5635       3.17x
//   5  11   6.8701        9             1.3100       1.990    6.4058       4.89x
//   6  13   4.7562        8             1.6820       1.546    10.6247      6.32x
//   7  17   3.0776        7             2.2745       1.340    14.1270      6.21x
//   8  19   2.4297        5             2.0579       1.174    18.4095      8.95x
//   9  23   1.7958        5             2.7842       1.065    22.3787      8.04x
//   sum main = 510.1   sum exact max = 529   sum DHR envelope = 778.8   H*V(z) = 18.86
//   depth-1 bound: exact strata H - 529 = 0.0;   DHR envelope H - 778.8 = -249.8
//
// p <= 23, H = round(23^4.2665) = 645274
//   i  p_i  main_i        max_x Str_i   exact ratio  u_i      F_2(u_i)     DHR overpays
//   1  2    322637.0000   322637        1.0000       n/a      -            -
//   2  3    215091.3333   215092        1.0000       17.715   1.0000       1.00x
//   3  5    43018.2667    43019         1.0000       10.712   1.0000       1.00x
//   4  7    18436.4000    18438         1.0001       7.103    1.0168       1.02x
//   5  11   8380.1818     8383          1.0003       5.642    1.1969       1.20x
//   6  13   5801.6643     5805          1.0006       4.509    1.5665       1.57x
//   7  17   3754.0181     3761          1.0019       4.111    1.7674       1.76x
//   8  19   2963.6985     2975          1.0038       3.682    2.0756       2.07x
//   9  23   2190.5598     2210          1.0089       3.478    2.2704       2.25x
//   sum main = 622273.1   sum exact max = 622320   sum DHR envelope = 636364.4   H*V(z) = 23000.88
//   depth-1 bound: exact strata H - 622320 = 22954.0;   DHR envelope H - 636364.4 = 8909.6
//
// === 4b. THE SAME BOUND UNDER ENVELOPE PRICING =======================
//
// The cut-family bound rerun with the strata priced at main_i * F_2(u_i)
// instead of their exact maxima. Only the stratum pricing changes, so the
// difference in u* is DP3 and nothing else. NOTE: F_2 is the asymptotic
// envelope; Theorem 9.1 carries an unquantified o(1) that is large at these
// z, so this column is a SURROGATE for what the sieve pays, not a rigorous
// finite-z bound. The rigorous asymptotic answer for the whole method is
// beta_2 = 4.26645.
//
//   p_k  j   u* exact strata   u* envelope-priced   DP3 costs (exponent)
//   13   0   1.9638            3.6892               1.7254
//   13   5   1.8254            2.8783               1.0529
//   17   0   1.9812            3.6963               1.7152
//   17   6   1.7824            2.6198               0.8374
//   19   0   2.0028            3.8459               1.8431
//   19   7   1.7960            2.6486               0.8525
//   23   0   2.0260            3.8452               1.8192
//   23   8   1.7994            2.4935               0.6942
//
// === 5. THE MEASURED (F, f) OF THE NATAL TILE AGAINST (F_2, f_2) =====
//
// Same normalisation the sieve uses. For the tile at level y and a window
// of L = y^u consecutive integers, over the FULL period:
//    F_meas(y,u) = max_x count / (L*V(y))     f_meas(y,u) = min_x count / (L*V(y))
// f_meas is 0 exactly while L < G2(y#), so the sequence's OWN sifting limi
// is log G2 / log y. That is the number beta_2 = 4.26645 is bounding.
//
// u = 1.20   F_2 = 17.623   f_2 = 0.000
//    y     L        F_meas   F_2/F_meas   f_meas   trend of F_meas in y
//    7     10       2.800    6.29         0.000    -
//    11    18       1.901    9.27         0.000    --0.899
//    13    22       2.758    6.39         0.000    +0.856
//    17    30       2.292    7.69         0.000    --0.466
//    19    34       3.014    5.85         0.000    +0.722
//    23    43       3.262    5.40         0.000    +0.249
//
// u = 1.50   F_2 = 11.279   f_2 = 0.000
//    y     L        F_meas   F_2/F_meas   f_meas   trend of F_meas in y
//    7     19       2.211    5.10         0.000    -
//    11    36       1.901    5.93         0.000    --0.309
//    13    47       2.151    5.24         0.000    +0.250
//    17    70       2.292    4.92         0.000    +0.141
//    19    83       2.160    5.22         0.000    --0.132
//    23    110      2.295    4.91         0.000    +0.135
//
// u = 1.70   F_2 = 8.781   f_2 = 0.000
//    y     L        F_meas   F_2/F_meas   f_meas   trend of F_meas in y
//    7     27       1.556    5.65         0.000    -
//    11    59       1.740    5.05         0.290    +0.185
//    13    78       1.815    4.84         0.259    +0.075
//    17    124      1.663    5.28         0.185    --0.151
//    19    149      1.891    4.64         0.000    +0.228
//    23    207      1.762    4.98         0.136    --0.129
//
// u = 2.00   F_2 = 6.344   f_2 = 0.000
//    y     L        F_meas   F_2/F_meas   f_meas   trend of F_meas in y
//    7     49       1.714    3.70         0.571    -
//    11    121      1.414    4.49         0.566    --0.300
//    13    169      1.436    4.42         0.598    +0.022
//    17    289      1.427    4.44         0.634    --0.008
//    19    361      1.490    4.26         0.497    +0.063
//    23    529      1.538    4.13         0.424    +0.048
//
// u = 2.50   F_2 = 4.086   f_2 = 0.000
//    y     L        F_meas   F_2/F_meas   f_meas   trend of F_meas in y
//    7     130      1.185    3.45         0.754    -
//    11    401      1.152    3.55         0.853    --0.032
//    13    609      1.129    3.62         0.830    --0.023
//    17    1192     1.134    3.60         0.846    +0.005
//    19    1574     1.188    3.44         0.830    +0.054
//    23    2537     1.161    3.52         0.851    --0.027
//
// u = 3.00   F_2 = 2.916   f_2 = 0.000
//    y     L        F_meas   F_2/F_meas   f_meas   trend of F_meas in y
//    7     343      1.102    2.65         0.898    -
//    11    1331     1.067    2.73         0.951    --0.035
//    13    2197     1.040    2.80         0.948    --0.027
//    17    4913     1.040    2.80         0.956    +0.000
//    19    6859     1.049    2.78         0.952    +0.009
//    23    12167    1.042    2.80         0.952    --0.007
//
// And the same F_meas for the DILATED tiles the strata actually live on
// (level y = 19, 40 multipliers m coprime to Q, exact over the full period):
//   u       L      twin F_meas   dilates F_meas (min .. max)   F_2(u)
//   1.20    34     3.014         3.014 .. 3.014                17.623
//   1.50    83     2.160         2.160 .. 2.469                11.279
//   1.70    149    1.891         1.719 .. 1.891                8.781
//   2.00    361    1.490         1.490 .. 1.561                6.344
//   2.50    1574   1.188         1.155 .. 1.237                4.086
//   3.00    6859   1.049         1.046 .. 1.064                2.916
//
// === 6. THE DECOUPLING EXCESS: THE WHOLE COST OF DP3, ISOLATED =======
//
// With exact strata the ONLY remaining loss is that the maxima are taken a
// independent positions. Since sum_i Str_i(x) = H - N_k(x) identically,
//    D(H) := sum_i max_x Str_i(x,H) - max_x sum_i Str_i(x,H)
//         =  sum_i max_x Str_i(x,H) - H + min_x N_k(x,H)   >= 0
// and the depth-1 bound is positive exactly when min_x N_k(H) > D(H). So
// the threshold is the crossing of the true survivor floor against D.
//
// p <= 13 (G2 = 66):
//    H       min_x N_k   sum max Str   D(H)   min_x N_k - D(H)
//    66      1           68            3      -2
//    99      2           101           4      -2
//    132     2           131           1      1
//    198     6           193           1      5
//    330     12          321           3      9
//    660     29          634           3      26
//    1980    93          1891          4      89
//
// p <= 17 (G2 = 108):
//    H       min_x N_k   sum max Str   D(H)   min_x N_k - D(H)
//    108     1           111           4      -3
//    162     2           162           2      0
//    216     5           213           2      3
//    324     8           320           4      4
//    540     17          528           5      12
//    1080    40          1045          5      35
//    3240    133         3115          8      125
//
// p <= 19 (G2 = 150):
//    H       min_x N_k   sum max Str   D(H)   min_x N_k - D(H)
//    150     1           153           4      -3
//    225     3           228           6      -3
//    300     6           300           6      0
//    450     9           445           4      5
//    750     21          736           7      14
//    1500    49          1461          10     39
//    4500    163         4347          10     153
//
// p <= 23 (G2 = 204):
//    H       min_x N_k   sum max Str   D(H)   min_x N_k - D(H)
//    204     1           208           5      -4
//    306     3           310           7      -4
//    408     5           408           5      0
//    612     12          608           8      4
//    1020    25          1006          11     14
//    2040    59          1993          12     47
//    6120    203         5932          15     188
//
// === 7. THE LADDER EXPONENT, FOR REFERENCE ===========================
//
// x    G2      log G2/log x   local slope
// 2    2       1.0000         -
// 3    6       1.6309         2.7095
// 5    12      1.5440         1.3569
// 7    30      1.7479         2.7232
// 11   42      1.5587         0.7444
// 13   66      1.6334         2.7056
// 17   108     1.6526         1.8358
// 19   150     1.7017         2.9535
// 23   204     1.6961         1.6094
// 29   258     1.6491         1.0131
// 31   348     1.7042         4.4870
// 37   528     1.7362         2.3563
// 41   546     1.6972         0.3266
// 43   618     1.7086         2.6008
// 47   708     1.7045         1.5285
// 53   870     1.7048         1.7150
// 59   966     1.6856         0.9760
// 61   1080    1.6991         3.3463
// 67   1284    1.7023         1.8442
// 71   1398    1.6991         1.4669
// 73   1530    1.7091         3.2479
// 79   1710    1.7037         1.4081

// ============================================================================
// READINGS
// ============================================================================
// NORMALISATION, STATED FIRST BECAUSE EVERY NUMBER BELOW DEPENDS ON IT.
// u = log H / log p_k with p_k the LARGEST SIFTED PRIME, the same convention as
// research/exact-g2-ladder.js and paper/beta2-note.md (G2(n) << p_n^{beta2+eps}).
// DHR's own parameter uses the sifting bound z = p_k + 1; at p_k = 23 that is a
// 1.4% difference in log and it vanishes asymptotically. Do not mix in log of
// the NEXT prime, which at these levels would move u by 7%.
//
// 1. THE STRATUM IS EXACTLY A SMALLER INSTANCE, AND IT IS A THREE-LINE PROOF.
//    For every odd sifting prime p, as subsets of Z/(p*Q-):
//      { r = 0  mod p, r in T- } = p * (p^{-1} . T-)
//      { r = -2 mod p, r in T- } = p * (-p^{-1} . T-) - 2
//    verified as exact set identities at all eight levels (§1). So the
//    discarded stratum S(A_p,p) is exactly TWO two-class interval sifts, at
//    length H/p and level p-, with the same dimension kappa = 2 and the same
//    local densities omega(q) = 2. The recursion acts on the class-offset
//    vector by c -> c/p, so the family generated from the twin tile c_q = -2 is
//    exactly the multiplicative dilates m^{-1}.T. The claim in
//    sift-limit-attack.md §1 that "the strata are dilated kill images" is
//    CORRECT, and it can now be stated as a transformation law.
//
// 2. AND THAT IS WHERE THE ANALOGY BREAKS: THE DILATION IS AN ISOMORPHISM OF
//    THE TILE AS A SET WITH CONGRUENCE STRUCTURE AND NOT AS A SET WITH ORDER.
//    Multiplication by p mod Q carries slots to slots and destroys intervals.
//    Every question a sieve asks about a stratum is an interval question (how
//    many survivors in a window), so the exact self-similarity transfers none
//    of the twin tile's interval statistics to its strata by fiat. It has to be
//    measured, and §2 and §5 measure it.
//
// 3. THE FAMILY IS UNIFORM FROM ABOVE AND IS NOT UNIFORM FROM BELOW. Max window
//    count -- the upper function, the one a lower-bound sieve needs for its
//    strata -- spreads at most about 15% across 40 dilates at level 19, and the
//    twin tile sits sometimes at the top of that range (u = 1.2, 1.7) and
//    sometimes at the bottom (u = 1.5, 2.0). Max GAP is the opposite: the twin
//    tile is the family MINIMUM. Of 10 sampled dilates NONE has a smaller max
//    gap and 9 have a larger one, running to 198 against G2 = 150 (+32%); the
//    recursion's own dilates 23^-1 .. 43^-1 give 168 to 198. So exact
//    re-insertion of stratum UPPER bounds is family-robust, and anything
//    resting on the lower side of the family is not.
//
// 4. THE THRESHOLD WITH EXACT STRATA IS ABOUT 1.8 TO 2.0, AGAINST beta_2 =
//    4.26645. Full-period exact, no sampling, j = 0 (every stratum priced at its
//    exact maximum, nothing retained):
//      p_k                7       11      13      17      19      23
//      u* first crossing  1.7479  1.7835  1.9037  1.8209  1.8160  1.9264
//      u* stable          2.1372  1.9448  1.9638  1.9812  2.0028  2.0260
//      u_true             1.7479  1.5587  1.6334  1.6526  1.7017  1.6961
//    The first crossing is the operative one, because positivity at a single H
//    already proves G2 <= H. Every first crossing above is unit-exact (the grid
//    is every integer to 700). The stable column, which is the sifting-limit
//    reading, rises monotonically from p_k = 11 and crosses 2 at p_k = 19. It is
//    2.24 below beta_2 at p_k = 23, and it is NOT trending below 2.
//
//    What the certificates actually assert: G2(19#) <= 210 (true 150) and
//    G2(23#) <= 420 (true 204). Valid, independently checkable, and a factor
//    1.4 to 2.1 weaker than the enumerations that produced the ladder.
//
// 5. THE VALUE OF EXACTNESS IS CONCENTRATED AT THE TOP OF THE RECURSION, WHICH
//    IS THE WORST PLACE FOR IT. At p_k = 23 the stable cut ladder runs
//      j       0       1       2       3       4       5       6       7       8       9
//      u*(j)   2.0260  2.0260  1.9994  1.9958  1.9921  1.9484  1.8928  1.8877  1.7994  1.6961
//    Retaining the single largest prime exactly (j = 8 -> 9) buys 0.103 of
//    exponent; retaining the first FIVE primes exactly buys 0.078 in total. The
//    exactness that pays is the exactness whose sub-problem is nearly the whole
//    problem. Cheap low strata are worth almost nothing.
//
// 6. WITH EXACT STRATA THE ENTIRE REMAINING COST OF DP3 IS AN O(1) DECOUPLING
//    EXCESS. Because sum_i Str_i(x) = H - N_k(x) identically, the only loss left
//    is that the maxima are taken at independent positions:
//      D(H) = sum_i max_x Str_i - H + min_x N_k >= 0,
//    and the bound is positive exactly when min_x N_k(H) > D(H). Measured D runs
//    1 to 15 over everything computed (H from G2 to 30*G2, p_k = 13 to 23), and
//    grows slowly in both H and p_k. Four levels is not a trend line, but the
//    order of magnitude is unambiguous: DP3 with exact strata costs a handful of
//    elements, where DP3 with the envelope costs a FACTOR on every stratum.
//
// 7. SAME BOUND, ONLY THE PRICING SWAPPED: DP3 COSTS 1.72 TO 1.84 OF EXPONENT.
//      p_k          13      17      19      23
//      u* exact     1.9638  1.9812  2.0028  2.0260
//      u* envelope  3.6892  3.6963  3.8459  3.8452
//    The envelope column applies F_2(u_i) pointwise and is a SURROGATE, not a
//    rigorous finite-z bound: Theorem 9.1's o(1) is O((log log y)^2/(log y)^{1/6})
//    and is not small at these z, and this decoupled one-step bound is not DHR's
//    truncation. Do not quote 3.85 as "what DHR gives". What the pair is good
//    for is the DIFFERENCE, which isolates the stratum pricing and nothing else.
//    Per stratum at the working point (p <= 19, H = 19^2) the envelope overpays
//    3.65x at p_i = 7 and 9.74x at p_i = 19: the loss is entirely on the deep
//    strata, at u_i near 1.
//
// 8. THE ASYMPTOTIC DIAGNOSTIC, AND IT LEANS NEGATIVE. F_meas(y,u) = max_x count
//    / (L*V(y)) at L = y^u is the exact upper sieve function of the natal tile.
//    At u = 3 it is flat at 1.04 to 1.07 across y = 7..23. At the parameters
//    where the strata actually sit it RISES with y:
//      u = 2.0:  1.414  1.436  1.427  1.490  1.538   (y = 11,13,17,19,23)
//      u = 1.2:  1.901  2.758  2.292  3.014  3.262
//    F_2 at those parameters is 6.344 and 17.623, so the envelope runs 4.1x to
//    9.3x the truth across these points and the ratio is CLOSING as y grows (at
//    u = 2, F_2/F_meas falls 4.49, 4.42, 4.44, 4.26, 4.13). Six points cannot
//    decide whether F_meas converges to a constant below F_2 or climbs to it.
//    What they do decide is that NO CONSTANT-FACTOR re-insertion is supported by
//    the data in the accessible range: the quantity being re-inserted is not
//    observed to be stable where it matters.
//
// 9. FULL RE-INSERTION IS A TAUTOLOGY, AND THE SCRIPT PROVES IT ON ITSELF. Row
//    j = k of every threshold table returns H* = G2 exactly, at all six levels.
//    Buchstab with every stratum exact IS the identity N_k = N_k. Anyone who
//    reports "exact strata give exponent 1.70" has reported G2 back to itself.
//    PARTIAL re-insertion (j < k) is a different matter and is NOT circular:
//    every input is a strictly smaller problem, the computation terminates, and
//    "every window of 210 consecutive integers meets T(19)" is a true and
//    independently checkable statement. It is simply weaker than the direct
//    enumeration that produced G2 = 150, and costs a full-period computation of
//    the same order. As a proof technique it fails on an infinite REGRESS and
//    not on circularity: to make u*(0) hold for all z you need an asymptotic
//    bound on max_x Str_i at u_i near 1, which by reading 1 IS the upper sieve
//    function of a dilated tile one level down, and the only proven bound for
//    that is F_2 -- the very thing the exactness was to replace. The regress
//    terminates at every finite z and at no uniform z. That is exactly why the
//    finite certificates exist and the theorem does not.

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-beta2-03-exact-strata.js
//   invocation:  node research/attack-beta2-03-exact-strata.js
//   code-sha256: fbf726efc6a56004f04a86a19b4e7e2a0caa8530a7ae4fd93b67ae9e6c695eac
//   out-sha256:  b118a6384472dc47daae34eb85881e44d7bc024dc18995d8fb1540a4e0b01f5a
//   body-lines:  414
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     22.2 s
// ============================================================================
// === 1. THE STRUCTURE: WHAT A DISCARDED STRATUM IS ===================
//
// STRATUM DILATION. Fix a sifting prime p; let T- be the tile sifted by all
// primes q < p, of period Q-. Then as subsets of Z/(p*Q-),
//     { r : r = 0  mod p, r in T- } = p * A_p,  A_p = p^{-1} . T-
//     { r : r = -2 mod p, r in T- } = p * B_p - 2, B_p = -p^{-1} . T-
// A_p is again a two-class tile at level p-, cut by the class pair
// {0, -2/p mod q} at every q < p; B_p by {0, +2/p mod q}. So a discarded
// stratum is EXACTLY two two-class interval sifts, at length H/p, level p-,
// same dimension kappa = 2, same local densities omega(q) = 2 -- but with
// the class offset DIVIDED BY p. Iterating, the offset vector transforms as
// c -> c/p, so the family generated from the twin tile c_q = -2 is
// { c_q = -2/m mod q }, indexed by squarefree m built from sifting primes,
// and every member is the multiplicative dilate m^{-1}.T of the twin tile.
// The identity is verified below.
//
// p    Q(p-)      |T-|     p^{-1} mod Q(p-)  branch = p*(p^{-1}.T-)  class offsets -2/p mod q
// 3    2          1        1                 VERIFIED                [0]
// 5    6          1        5                 VERIFIED                [0, 2]
// 7    30         3        13                VERIFIED                [0, 1, 4]
// 11   210        15       191               VERIFIED                [0, 2, 3, 3]
// 13   2310       135      1777              VERIFIED                [0, 1, 1, 2, 10]
// 17   30030      1485     3533              VERIFIED                [0, 2, 4, 4, 7, 6]
// 19   510510     22275    26869             VERIFIED                [0, 1, 2, 1, 8, 4, 16]
// 23   9699690    378675   1265177           VERIFIED                [0, 2, 1, 6, 9, 5, 11, 9]
//
// The twin tile has c_q = -2 at EVERY q. The stratum tiles have c_q = -2/p,
// a different residue at every q. The two are carried onto each other by
// multiplication by p mod Q, a bijection of Z/Q taking slots to slots --
// and one that does not preserve intervals. The self-similarity is exact
// for the tile as a set with congruence structure and FALSE for the tile as
// a set with order, and the sieve only ever asks order questions. §2 sizes
// the damage.
//
// === 1b. THE LADDER AND THE IDENTITY, RECOMPUTED FROM SCRATCH =========
//
// j  p_j  Q_j          |T_j|     prod(p-2)  maxgap  G2(p_j#)  |Str_j|   match
// 1  2    2            1         1          2       2         1         YES
// 2  3    6            1         1          6       6         2         YES
// 3  5    30           3         3          12      12        2         YES
// 4  7    210          15        15         30      30        6         YES
// 5  11   2310         135       135        42      42        30        YES
// 6  13   30030        1485      1485       66      66        270       YES
// 7  17   510510       22275     22275      108     108       2970      YES
// 8  19   9699690      378675    378675     150     150       44550     YES
// 9  23   223092870    7952175   7952175    204     204       757350    YES
// census = Schemmel product and maxgap = the G2 ladder, all levels: true
//
// Buchstab identity N_k(x,H) = N_j(x,H) - sum_{i>j} Str_i(x,H), spot check:
//   x=0          H=500   j=0  N_k=20    rhs=20    OK
//   x=12345      H=700   j=3  N_k=25    rhs=25    OK
//   x=999983     H=1000  j=5  N_k=37    rhs=37    OK
//   x=50000000   H=250   j=7  N_k=10    rhs=10    OK
//   x=77         H=3000  j=2  N_k=101   rhs=101   OK
//   x=223092869  H=900   j=8  N_k=32    rhs=32    OK
//   identity holds at every spot checked: true
//
// === 2. THE OBSTRUCTION: IS THE TWIN TILE SPECIAL IN ITS OWN FAMILY? ==
//
// The strata live on the dilates m^{-1}.T. If those are as regular as T,
// exactness transfers. If they are worse, exact re-insertion must pay the
// FAMILY supremum, not the twin value. m = p^{-1} for p the next primes
// above the level are the dilates the recursion actually produces.
//
// level p <= 13:  Q = 30030   |T| = 1485   density 0.049451
//   m               maxgap   maxcnt@78   maxcnt@156  maxcnt@312
//   1 (TWIN TILE)   66       7           11          20
//   23^-1           84       7           11          20
//   29^-1           78       7           11          19
//   31^-1           84       7           11          20
//   37^-1           78       7           12          19
//   41^-1           90       8           11          20
//   43^-1           84       7           11          20
//   12 random m     60/84/1206/7/8       11/11/12    19/19/20      (min/median/max)
//   twin maxgap 66 = G2; of the 12 random dilates, 1 have a SMALLER max gap and 11 a LARGER one.
//
// level p <= 17:  Q = 510510   |T| = 22275   density 0.043633
//   m               maxgap   maxcnt@102  maxcnt@204  maxcnt@408
//   1 (TWIN TILE)   108      8           13          23
//   23^-1           120      9           13          23
//   29^-1           120      8           14          22
//   31^-1           132      9           13          23
//   37^-1           108      9           13          23
//   41^-1           138      8           14          23
//   43^-1           138      8           14          23
//   11 random m     90/120/1628/9/9       13/14/14    22/23/24      (min/median/max)
//   twin maxgap 108 = G2; of the 11 random dilates, 2 have a SMALLER max gap and 8 a LARGER one.
//
// level p <= 19:  Q = 9699690   |T| = 378675   density 0.039040
//   m               maxgap   maxcnt@114  maxcnt@228  maxcnt@456
//   1 (TWIN TILE)   150      9           15          26
//   23^-1           174      9           15          26
//   29^-1           168      9           15          25
//   31^-1           180      9           15          26
//   37^-1           174      9           15          25
//   41^-1           180      9           15          26
//   43^-1           198      9           16          25
//   10 random m     150/180/2049/9/9       15/15/15    24/25/26      (min/median/max)
//   twin maxgap 150 = G2; of the 10 random dilates, 0 have a SMALLER max gap and 9 a LARGER one.
//
// === 3. THE THRESHOLDS ===============================================
//
// u*(j) = log H*/log p_k, H* = least H on the grid with
//    min_x N_j(x,H) - sum_{i>j} max_x Str_i(x,H) > 0
// AND the bound positive at every larger grid point. The bound is NOT
// monotone in H, so the FIRST crossing is reported separately, and the first
// crossing is the operative one: positivity at a single H already proves
// G2(p_k#) <= H, because every window of H consecutive integers then meets
// the tile. Grid: every integer to 700 (so every first crossing below is
// unit-exact), then geometric with ratio 1.02 (du = 0.0067 at p_k = 19).
// j = k is the untruncated identity: it must return H* = G2 exactly.
//
// --- sifting primes p <= 7   (k = 4, Q = 210, G2 = 30, u_true = 1.7479) ---
//   j  cut at  H* stable  u*(j)    H* first  u* first  verdict
//   0  -       64         2.1372   30        1.7479    BELOW beta_2 by 2.129
//   1  2       64         2.1372   30        1.7479    BELOW beta_2 by 2.129
//   2  3       48         1.9894   30        1.7479    BELOW beta_2 by 2.277
//   3  5       30         1.7479   30        1.7479    BELOW beta_2 by 2.519
//   4  7       30         1.7479   30        1.7479    IDENTITY (tautology: returns G2)
//
// --- sifting primes p <= 11   (k = 5, Q = 2310, G2 = 42, u_true = 1.5587) ---
//   j  cut at  H* stable  u*(j)    H* first  u* first  verdict
//   0  -       106        1.9448   72        1.7835    BELOW beta_2 by 2.322
//   1  2       106        1.9448   72        1.7835    BELOW beta_2 by 2.322
//   2  3       96         1.9035   72        1.7835    BELOW beta_2 by 2.363
//   3  5       72         1.7835   72        1.7835    BELOW beta_2 by 2.483
//   4  7       66         1.7472   66        1.7472    BELOW beta_2 by 2.519
//   5  11      42         1.5587   42        1.5587    IDENTITY (tautology: returns G2)
//
// --- sifting primes p <= 13   (k = 6, Q = 30030, G2 = 66, u_true = 1.6334) ---
//   j  cut at  H* stable  u*(j)    H* first  u* first  verdict
//   0  -       154        1.9638   132       1.9037    BELOW beta_2 by 2.303
//   1  2       154        1.9638   132       1.9037    BELOW beta_2 by 2.303
//   2  3       144        1.9376   132       1.9037    BELOW beta_2 by 2.329
//   3  5       144        1.9376   132       1.9037    BELOW beta_2 by 2.329
//   4  7       138        1.9210   126       1.8855    BELOW beta_2 by 2.345
//   5  11      108        1.8254   96        1.7795    BELOW beta_2 by 2.441
//   6  13      66         1.6334   66        1.6334    IDENTITY (tautology: returns G2)
//
// --- sifting primes p <= 17   (k = 7, Q = 510510, G2 = 108, u_true = 1.6526) ---
//   j  cut at  H* stable  u*(j)    H* first  u* first  verdict
//   0  -       274        1.9812   174       1.8209    BELOW beta_2 by 2.285
//   1  2       274        1.9812   174       1.8209    BELOW beta_2 by 2.285
//   2  3       186        1.8445   174       1.8209    BELOW beta_2 by 2.422
//   3  5       174        1.8209   174       1.8209    BELOW beta_2 by 2.446
//   4  7       174        1.8209   174       1.8209    BELOW beta_2 by 2.446
//   5  11      168        1.8085   168       1.8085    BELOW beta_2 by 2.458
//   6  13      156        1.7824   138       1.7391    BELOW beta_2 by 2.484
//   7  17      108        1.6526   108       1.6526    IDENTITY (tautology: returns G2)
//
// --- sifting primes p <= 19   (k = 8, Q = 9699690, G2 = 150, u_true = 1.7017) ---
//   j  cut at  H* stable  u*(j)    H* first  u* first  verdict
//   0  -       364        2.0028   210       1.8160    BELOW beta_2 by 2.264
//   1  2       364        2.0028   210       1.8160    BELOW beta_2 by 2.264
//   2  3       354        1.9933   210       1.8160    BELOW beta_2 by 2.273
//   3  5       354        1.9933   210       1.8160    BELOW beta_2 by 2.273
//   4  7       348        1.9875   210       1.8160    BELOW beta_2 by 2.279
//   5  11      330        1.9695   210       1.8160    BELOW beta_2 by 2.297
//   6  13      204        1.8062   204       1.8062    BELOW beta_2 by 2.460
//   7  17      198        1.7960   198       1.7960    BELOW beta_2 by 2.470
//   8  19      150        1.7017   150       1.7017    IDENTITY (tautology: returns G2)
//
// --- sifting primes p <= 23   (k = 9, Q = 223092870, G2 = 204, u_true = 1.6961) ---
//   j  cut at  H* stable  u*(j)    H* first  u* first  verdict
//   0  -       574        2.0260   420       1.9264    BELOW beta_2 by 2.240
//   1  2       574        2.0260   420       1.9264    BELOW beta_2 by 2.240
//   2  3       528        1.9994   420       1.9264    BELOW beta_2 by 2.267
//   3  5       522        1.9958   420       1.9264    BELOW beta_2 by 2.271
//   4  7       516        1.9921   420       1.9264    BELOW beta_2 by 2.274
//   5  11      450        1.9484   420       1.9264    BELOW beta_2 by 2.318
//   6  13      378        1.8928   366       1.8825    BELOW beta_2 by 2.374
//   7  17      372        1.8877   348       1.8664    BELOW beta_2 by 2.379
//   8  19      282        1.7994   282       1.7994    BELOW beta_2 by 2.467
//   9  23      204        1.6961   204       1.6961    IDENTITY (tautology: returns G2)
//
// === 4. WHAT DHR PAYS FOR THE SAME STRATA ============================
//
// The sieve cannot see max_x Str_i. It sees the axioms, and prices the
// stratum at main_i * F_2(u_i), with F_2 the DHR upper function and u_i =
// log(H/p_i)/log(p_{i-1}) the stratum parameter. Measured ratio vs F_2(u_i):
//
// solver validation (F_2 and f_2 must both decrease/increase to 1):
//   u      F_2(u)     f_2(u)
//   2      6.344438   0.000000
//   3      2.916437   0.000000
//   4.2    1.716509   0.000000
//   4.5    1.570435   0.240221
//   5      1.392835   0.578942
//   6      1.113599   0.884324
//   8      1.002642   0.997296
//   12     0.999974   0.999972
//   20     0.999973   0.999973
//   28     0.999973   0.999973
//
// p <= 19, H = round(19^2.0000) = 361
//   i  p_i  main_i        max_x Str_i   exact ratio  u_i      F_2(u_i)     DHR overpays
//   1  2    180.5000      181           1.0028       n/a      -            -
//   2  3    120.3333      121           1.0055       6.911    1.0242       1.02x
//   3  5    24.0667       25            1.0388       3.895    1.9079       1.84x
//   4  7    10.3143       12            1.1634       2.450    4.2486       3.65x
//   5  11   4.6883        7             1.4931       1.794    7.8851       5.28x
//   6  13   3.2458        6             1.8486       1.386    13.2069      7.14x
//   7  17   2.1002        5             2.3807       1.191    17.8818      7.51x
//   8  19   1.6580        4             2.4125       1.039    23.4948      9.74x
//   sum main = 346.9   sum exact max = 361   sum DHR envelope = 549.8   H*V(z) = 14.09
//   depth-1 bound: exact strata H - 361 = 0.0;   DHR envelope H - 549.8 = -188.8
//
// p <= 19, H = round(19^4.2665) = 285587
//   i  p_i  main_i        max_x Str_i   exact ratio  u_i      F_2(u_i)     DHR overpays
//   1  2    142793.5000   142794        1.0000       n/a      -            -
//   2  3    95195.6667    95196         1.0000       16.539   1.0000       1.00x
//   3  5    19039.1333    19040         1.0000       9.970    1.0000       1.00x
//   4  7    8159.6286     8160          1.0000       6.596    1.0426       1.04x
//   5  11   3708.9221     3713          1.0011       5.223    1.3330       1.33x
//   6  13   2567.7153     2572          1.0017       4.169    1.7337       1.73x
//   7  17   1661.4628     1669          1.0045       3.793    1.9844       1.98x
//   8  19   1311.6812     1325          1.0102       3.395    2.3620       2.34x
//   sum main = 274437.7   sum exact max = 274469   sum DHR envelope = 281323.7   H*V(z) = 11149.29
//   depth-1 bound: exact strata H - 274469 = 11118.0;   DHR envelope H - 281323.7 = 4263.3
//
// p <= 23, H = round(23^2.0000) = 529
//   i  p_i  main_i        max_x Str_i   exact ratio  u_i      F_2(u_i)     DHR overpays
//   1  2    264.5000      265           1.0019       n/a      -            -
//   2  3    176.3333      177           1.0038       7.462    1.0082       1.00x
//   3  5    35.2667       36            1.0208       4.243    1.6932       1.66x
//   4  7    15.1143       17            1.1248       2.687    3.5635       3.17x
//   5  11   6.8701        9             1.3100       1.990    6.4058       4.89x
//   6  13   4.7562        8             1.6820       1.546    10.6247      6.32x
//   7  17   3.0776        7             2.2745       1.340    14.1270      6.21x
//   8  19   2.4297        5             2.0579       1.174    18.4095      8.95x
//   9  23   1.7958        5             2.7842       1.065    22.3787      8.04x
//   sum main = 510.1   sum exact max = 529   sum DHR envelope = 778.8   H*V(z) = 18.86
//   depth-1 bound: exact strata H - 529 = 0.0;   DHR envelope H - 778.8 = -249.8
//
// p <= 23, H = round(23^4.2665) = 645274
//   i  p_i  main_i        max_x Str_i   exact ratio  u_i      F_2(u_i)     DHR overpays
//   1  2    322637.0000   322637        1.0000       n/a      -            -
//   2  3    215091.3333   215092        1.0000       17.715   1.0000       1.00x
//   3  5    43018.2667    43019         1.0000       10.712   1.0000       1.00x
//   4  7    18436.4000    18438         1.0001       7.103    1.0168       1.02x
//   5  11   8380.1818     8383          1.0003       5.642    1.1969       1.20x
//   6  13   5801.6643     5805          1.0006       4.509    1.5665       1.57x
//   7  17   3754.0181     3761          1.0019       4.111    1.7674       1.76x
//   8  19   2963.6985     2975          1.0038       3.682    2.0756       2.07x
//   9  23   2190.5598     2210          1.0089       3.478    2.2704       2.25x
//   sum main = 622273.1   sum exact max = 622320   sum DHR envelope = 636364.4   H*V(z) = 23000.88
//   depth-1 bound: exact strata H - 622320 = 22954.0;   DHR envelope H - 636364.4 = 8909.6
//
// === 4b. THE SAME BOUND UNDER ENVELOPE PRICING =======================
//
// The cut-family bound rerun with the strata priced at main_i * F_2(u_i)
// instead of their exact maxima. Only the stratum pricing changes, so the
// difference in u* is DP3 and nothing else. NOTE: F_2 is the asymptotic
// envelope; Theorem 9.1 carries an unquantified o(1) that is large at these
// z, so this column is a SURROGATE for what the sieve pays, not a rigorous
// finite-z bound. The rigorous asymptotic answer for the whole method is
// beta_2 = 4.26645.
//
//   p_k  j   u* exact strata   u* envelope-priced   DP3 costs (exponent)
//   13   0   1.9638            3.6892               1.7254
//   13   5   1.8254            2.8783               1.0529
//   17   0   1.9812            3.6963               1.7152
//   17   6   1.7824            2.6198               0.8374
//   19   0   2.0028            3.8459               1.8431
//   19   7   1.7960            2.6486               0.8525
//   23   0   2.0260            3.8452               1.8192
//   23   8   1.7994            2.4935               0.6942
//
// === 5. THE MEASURED (F, f) OF THE NATAL TILE AGAINST (F_2, f_2) =====
//
// Same normalisation the sieve uses. For the tile at level y and a window
// of L = y^u consecutive integers, over the FULL period:
//    F_meas(y,u) = max_x count / (L*V(y))     f_meas(y,u) = min_x count / (L*V(y))
// f_meas is 0 exactly while L < G2(y#), so the sequence's OWN sifting limit
// is log G2 / log y. That is the number beta_2 = 4.26645 is bounding.
//
// u = 1.20   F_2 = 17.623   f_2 = 0.000
//    y     L        F_meas   F_2/F_meas   f_meas   trend of F_meas in y
//    7     10       2.800    6.29         0.000    -
//    11    18       1.901    9.27         0.000    --0.899
//    13    22       2.758    6.39         0.000    +0.856
//    17    30       2.292    7.69         0.000    --0.466
//    19    34       3.014    5.85         0.000    +0.722
//    23    43       3.262    5.40         0.000    +0.249
//
// u = 1.50   F_2 = 11.279   f_2 = 0.000
//    y     L        F_meas   F_2/F_meas   f_meas   trend of F_meas in y
//    7     19       2.211    5.10         0.000    -
//    11    36       1.901    5.93         0.000    --0.309
//    13    47       2.151    5.24         0.000    +0.250
//    17    70       2.292    4.92         0.000    +0.141
//    19    83       2.160    5.22         0.000    --0.132
//    23    110      2.295    4.91         0.000    +0.135
//
// u = 1.70   F_2 = 8.781   f_2 = 0.000
//    y     L        F_meas   F_2/F_meas   f_meas   trend of F_meas in y
//    7     27       1.556    5.65         0.000    -
//    11    59       1.740    5.05         0.290    +0.185
//    13    78       1.815    4.84         0.259    +0.075
//    17    124      1.663    5.28         0.185    --0.151
//    19    149      1.891    4.64         0.000    +0.228
//    23    207      1.762    4.98         0.136    --0.129
//
// u = 2.00   F_2 = 6.344   f_2 = 0.000
//    y     L        F_meas   F_2/F_meas   f_meas   trend of F_meas in y
//    7     49       1.714    3.70         0.571    -
//    11    121      1.414    4.49         0.566    --0.300
//    13    169      1.436    4.42         0.598    +0.022
//    17    289      1.427    4.44         0.634    --0.008
//    19    361      1.490    4.26         0.497    +0.063
//    23    529      1.538    4.13         0.424    +0.048
//
// u = 2.50   F_2 = 4.086   f_2 = 0.000
//    y     L        F_meas   F_2/F_meas   f_meas   trend of F_meas in y
//    7     130      1.185    3.45         0.754    -
//    11    401      1.152    3.55         0.853    --0.032
//    13    609      1.129    3.62         0.830    --0.023
//    17    1192     1.134    3.60         0.846    +0.005
//    19    1574     1.188    3.44         0.830    +0.054
//    23    2537     1.161    3.52         0.851    --0.027
//
// u = 3.00   F_2 = 2.916   f_2 = 0.000
//    y     L        F_meas   F_2/F_meas   f_meas   trend of F_meas in y
//    7     343      1.102    2.65         0.898    -
//    11    1331     1.067    2.73         0.951    --0.035
//    13    2197     1.040    2.80         0.948    --0.027
//    17    4913     1.040    2.80         0.956    +0.000
//    19    6859     1.049    2.78         0.952    +0.009
//    23    12167    1.042    2.80         0.952    --0.007
//
// And the same F_meas for the DILATED tiles the strata actually live on
// (level y = 19, 40 multipliers m coprime to Q, exact over the full period):
//   u       L      twin F_meas   dilates F_meas (min .. max)   F_2(u)
//   1.20    34     3.014         3.014 .. 3.014                17.623
//   1.50    83     2.160         2.160 .. 2.469                11.279
//   1.70    149    1.891         1.719 .. 1.891                8.781
//   2.00    361    1.490         1.490 .. 1.561                6.344
//   2.50    1574   1.188         1.155 .. 1.237                4.086
//   3.00    6859   1.049         1.046 .. 1.064                2.916
//
// === 6. THE DECOUPLING EXCESS: THE WHOLE COST OF DP3, ISOLATED =======
//
// With exact strata the ONLY remaining loss is that the maxima are taken at
// independent positions. Since sum_i Str_i(x) = H - N_k(x) identically,
//    D(H) := sum_i max_x Str_i(x,H) - max_x sum_i Str_i(x,H)
//         =  sum_i max_x Str_i(x,H) - H + min_x N_k(x,H)   >= 0
// and the depth-1 bound is positive exactly when min_x N_k(H) > D(H). So
// the threshold is the crossing of the true survivor floor against D.
//
// p <= 13 (G2 = 66):
//    H       min_x N_k   sum max Str   D(H)   min_x N_k - D(H)
//    66      1           68            3      -2
//    99      2           101           4      -2
//    132     2           131           1      1
//    198     6           193           1      5
//    330     12          321           3      9
//    660     29          634           3      26
//    1980    93          1891          4      89
//
// p <= 17 (G2 = 108):
//    H       min_x N_k   sum max Str   D(H)   min_x N_k - D(H)
//    108     1           111           4      -3
//    162     2           162           2      0
//    216     5           213           2      3
//    324     8           320           4      4
//    540     17          528           5      12
//    1080    40          1045          5      35
//    3240    133         3115          8      125
//
// p <= 19 (G2 = 150):
//    H       min_x N_k   sum max Str   D(H)   min_x N_k - D(H)
//    150     1           153           4      -3
//    225     3           228           6      -3
//    300     6           300           6      0
//    450     9           445           4      5
//    750     21          736           7      14
//    1500    49          1461          10     39
//    4500    163         4347          10     153
//
// p <= 23 (G2 = 204):
//    H       min_x N_k   sum max Str   D(H)   min_x N_k - D(H)
//    204     1           208           5      -4
//    306     3           310           7      -4
//    408     5           408           5      0
//    612     12          608           8      4
//    1020    25          1006          11     14
//    2040    59          1993          12     47
//    6120    203         5932          15     188
//
// === 7. THE LADDER EXPONENT, FOR REFERENCE ===========================
//
// x    G2      log G2/log x   local slope
// 2    2       1.0000         -
// 3    6       1.6309         2.7095
// 5    12      1.5440         1.3569
// 7    30      1.7479         2.7232
// 11   42      1.5587         0.7444
// 13   66      1.6334         2.7056
// 17   108     1.6526         1.8358
// 19   150     1.7017         2.9535
// 23   204     1.6961         1.6094
// 29   258     1.6491         1.0131
// 31   348     1.7042         4.4870
// 37   528     1.7362         2.3563
// 41   546     1.6972         0.3266
// 43   618     1.7086         2.6008
// 47   708     1.7045         1.5285
// 53   870     1.7048         1.7150
// 59   966     1.6856         0.9760
// 61   1080    1.6991         3.3463
// 67   1284    1.7023         1.8442
// 71   1398    1.6991         1.4669
// 73   1530    1.7091         3.2479
// 79   1710    1.7037         1.4081
// ============================================================================
// READINGS
// ============================================================================
