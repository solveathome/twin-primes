// ============================================================================
// RED TEAM of research/history/staging/measure-0904-argmax.md
// ============================================================================
// An independent re-derivation of the argmax note's positional measurements,
// its congruence null, its residue chi-square and its own scoring rule.
//
// WHAT THIS IS NOT. It is not a route, it is not a bound, and it touches
// neither the exponent nor the band (2, 4.26645]. Every reading below is a
// measurement on a finite object at x <= 31, decidable by enumeration.
//
// ENGINE, and its independence, stated plainly and first. The target's
// producer is a WHEEL-210 SEGMENTED STRIKING sieve on worker_threads: it
// allocates a residue-major struck-flag buffer, strikes two arithmetic
// progressions per prime per wheel residue using modular inverses, and stitches
// shard boundaries in the main thread. This engine does none of that. It
// carries the tile as a GAP WORD (first slot + the cyclic list of differences)
// and builds level x from level x' < x by FOLD REPLICATION: the q copies of
// T_{x'} inside T_{x' q}, with the two forbidden residues struck by a running
// residue r <- (r + g) mod q. No bitmap, no wheel, no modular inverse, no
// worker, no segment. It therefore cannot inherit a striking bug from the
// target. DISCLOSURE: fold replication over a gap word is the same METHOD
// FAMILY as research/a3-01-misalignment-ledger.js (which the target also cites
// as a cross-check). This file shares no code, no constant table and no
// statistic with it, and a3-01 computes fold LINEAGE, not the objects below.
// Independence from the target is method-level; independence from a3-01 is
// code-level only, and is disclosed rather than claimed away.
//
// ARITHMETIC. Exact integers in doubles throughout. The largest value handled
// is W = 31# = 200,560,490,130 and the largest count is D(31) = 6,226,553,025,
// both far below 2^53 = 9,007,199,254,740,991. x = 37 is NOT run (the brief
// prices it out of the hour); x = 41 and 43 are out of reach here as well.
//
// THE OBJECTS, restated so the checks are checkable.
//   W = x#. A twin slot is s with s !== 0 and s !== -2 mod every p <= x.
//   D = prod_{3<=p<=x} (p-2) is the number of twin slots in [0, W).
//   Gaps are cyclic differences of consecutive twin slots: D of them, summing
//   to W. G2(x#) is the largest. The ARGMAX set is the set of LEFT endpoints
//   of gaps of length G2, and m(x) is its size.
//   tau_G(s) = W - 2 - G - s (mod W) is the mirror's action on left endpoints.
//
// ONE LEMMA, PROVEN HERE IN THREE LINES, that the rest leans on.
//   CONGRUENCE-TRANSLATE LEMMA. Fix p <= x, M = W/p. For k = 1..p-1 the shift
//   d = k*M mod p runs over the nonzero residues mod p, and s + kM = s mod q
//   for every prime q != p (because q | M). Hence for a gap [s, s+g]:
//     s + kM starts a gap of length EXACTLY g
//       <=>  (s + d) and (s + g + d) avoid {0, -2} mod p,
//            and every interior offset j killed ONLY by p, i.e. with
//            s + j = 0 or -2 mod p and no q != p killing it, satisfies
//            s + j + d = 0 or -2 mod p.
//   Everything else in the window is fixed by the shift. So the number of
//   exact congruence translates of a window is a DETERMINISTIC function of the
//   window, computable in O(g * pi(x)), not a random variable. SEC F computes
//   it and checks it against the pair counts of SEC D and SEC E.
//
// THE MATCHED NULL, also proven rather than simulated.
//   For p >= 3 and a twin slot s, the p translates s + kM, k = 0..p-1, agree
//   with s modulo every q != p and run over all p residues modulo p, so exactly
//   p - 2 of them are twin slots (p = 2 is degenerate: only s itself, since
//   W/2 is odd). Counting ordered pairs of DISTINCT twin slots congruent mod M
//   gives D*(p-3), so for two twin slots drawn uniformly at random
//     P[congruent mod W/p] = (p-3)/(D-1),
//   against the target's uniform-integer null p/W = 1/M. The ratio is
//     (p-3)/p * W/D, i.e. 12 to 34 at these levels.
//   SEC E verifies D*(p-3) by exhaustive enumeration at x = 11, 13, 17, 19.
//
// USAGE
//   node research/qc/embed.js --timeout 3600 research/history/staging/redteam-0904-argmax.js -- --levels 11,13,17,19,23,29,31
// ============================================================================
'use strict';

const ARG = (n, d) => { const i = process.argv.indexOf('--' + n); return i > 0 ? process.argv[i + 1] : d; };
const LEVELS = String(ARG('levels', '11,13,17,19,23,29,31')).split(',').map(Number);
const MCREPS = Number(ARG('mc', 20000));
const fx = (v, d) => (Number.isFinite(v) ? v.toFixed(d) : 'n/a');

// The primes, and the ladder QUOTED from research/G2-STATE.md §2 / A144311.
// Used as a self-test target only: the maximum below is computed, never taken.
const PR = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
const upto = (x) => PR.filter((p) => p <= x);
const Wof = (x) => upto(x).reduce((a, p) => a * p, 1);
const Dof = (x) => upto(x).filter((p) => p >= 3).reduce((a, p) => a * (p - 2), 1);
const QUOTED_G2 = { 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258, 31: 348 };
// QUOTED from research/exact-g2-ladder.js's LADDER table (a DIFFERENT producer):
// least attaining position and multiplicity. Compared against, never used.
const QUOTED_POS = { 5: [17, 2], 7: [71, 2], 11: [899, 4], 13: [731, 12], 17: [701, 20],
  19: [659, 20], 23: [76166567, 4], 29: [1205437109, 2], 31: [8813641451, 4] };

const md = (a, m) => { const v = a % m; return v < 0 ? v + m : v; };

// --- the tile as a gap word -------------------------------------------------
// L = { x, W, D, s0, g }. g[i] = s_{i+1} - s_i cyclically, so sum(g) = W.
function baseLevel() {
  // p = 2 forces s odd; p = 3 forces s = 2 mod 3; together s = 5 mod 6.
  return { x: 3, W: 6, D: 1, s0: 5, g: Uint16Array.from([6]) };
}

// Fold L by the next prime q, materialising the new gap word.
function fold(L, q) {
  const D2 = L.D * (q - 2), W2 = L.W * q;
  const g2 = new Uint16Array(D2);
  let k = 0, prev = -1, first = -1;
  for (let j = 0; j < q; j++) {
    const off = j * L.W;
    let pos = L.s0 + off, r = md(pos, q);
    const bad = q - 2;
    for (let i = 0; i < L.D; i++) {
      if (r !== 0 && r !== bad) {
        if (prev < 0) first = pos; else g2[k++] = pos - prev;
        prev = pos;
      }
      const gi = L.g[i];
      pos += gi; r += gi % q; if (r >= q) r -= q;
    }
  }
  g2[k++] = W2 - prev + first;
  if (k !== D2) throw new Error(`fold to ${q}: emitted ${k} gaps, expected ${D2}`);
  return { x: q, W: W2, D: D2, s0: first, g: g2 };
}

// --- bounded top-of-spectrum collector --------------------------------------
function collector(initThr, cap) {
  const tp = new Float64Array(cap), tg = new Uint16Array(cap);
  const st = { thr: initThr, n: 0, tp, tg, ratchets: 0 };
  st.compact = () => {
    const h = new Int32Array(4096);
    for (let i = 0; i < st.n; i++) h[st.tg[i]]++;
    const half = cap >> 1;
    let c = 0, v = 0;
    for (let g = 4095; g >= 0; g--) { if (c + h[g] > half) { v = g + 1; break; } c += h[g]; }
    st.thr = Math.max(st.thr, v);
    let m = 0;
    for (let i = 0; i < st.n; i++) if (st.tg[i] >= st.thr) { st.tp[m] = st.tp[i]; st.tg[m] = st.tg[i]; m++; }
    st.n = m; st.ratchets++;
  };
  st.push = (pos, g) => {
    if (st.n === cap) { st.compact(); if (g < st.thr) return; }
    st.tp[st.n] = pos; st.tg[st.n] = g; st.n++;
  };
  return st;
}

// Statistics from a materialised gap word.
function statsFromWord(L, initThr, cap) {
  const hist = new Float64Array(4096);
  const col = collector(initThr, cap);
  let pos = L.s0, sum = 0;
  for (let i = 0; i < L.D; i++) {
    const g = L.g[i]; hist[g]++; sum += g;
    if (g >= col.thr) col.push(pos, g);
    pos += g;
  }
  return { hist, sum, ngaps: L.D, col };
}

// Statistics for L folded by q, WITHOUT materialising the new gap word.
function statsFolded(L, q, initThr, cap) {
  const hist = new Float64Array(4096);
  const col = collector(initThr, cap);
  const W2 = L.W * q, bad = q - 2;
  let prev = -1, first = -1, sum = 0, ngaps = 0;
  for (let j = 0; j < q; j++) {
    const off = j * L.W;
    let pos = L.s0 + off, r = md(pos, q);
    for (let i = 0; i < L.D; i++) {
      if (r !== 0 && r !== bad) {
        if (prev < 0) first = pos;
        else { const g = pos - prev; hist[g]++; sum += g; ngaps++; if (g >= col.thr) col.push(prev, g); }
        prev = pos;
      }
      const gi = L.g[i];
      pos += gi; r += gi % q; if (r >= q) r -= q;
    }
  }
  const g = W2 - prev + first; hist[g]++; sum += g; ngaps++;
  if (g >= col.thr) col.push(prev, g);
  return { hist, sum, ngaps, col };
}

// --- set statistics ---------------------------------------------------------
// A set is a list of {s, g}.
function pairsByPrime(set, W, x) {
  const rows = [];
  for (const p of upto(x)) {
    const M = W / p;
    const seen = new Map(); let ex = 0;
    for (const e of set) { const k = e.s % M; const c = seen.get(k) || 0; ex += c; seen.set(k, c + 1); }
    if (ex) rows.push({ p, M, ex });
  }
  return rows;
}
function components(set, W, x) {
  const n = set.length, par = [...Array(n).keys()];
  const find = (a) => { while (par[a] !== a) { par[a] = par[par[a]]; a = par[a]; } return a; };
  for (const p of upto(x)) {
    const M = W / p, byRes = new Map();
    for (let i = 0; i < n; i++) { const k = set[i].s % M; if (byRes.has(k)) { const a = find(byRes.get(k)), b = find(i); if (a !== b) par[a] = b; } else byRes.set(k, i); }
  }
  const roots = new Map(), sz = new Map();
  for (let i = 0; i < n; i++) { const r = find(i); if (!roots.has(r)) roots.set(r, i); sz.set(r, (sz.get(r) || 0) + 1); }
  let singles = 0; for (const c of sz.values()) if (c === 1) singles++;
  return { size: roots.size, singles, reps: [...roots.values()].map((i) => set[i]) };
}
const allowed = (p, g) => { const bad = new Set([0, md(-2, p), md(-g, p), md(-g - 2, p)]); const a = []; for (let c = 0; c < p; c++) if (!bad.has(c)) a.push(c); return a; };
const isSlot = (s, x) => { for (const p of upto(x)) { const v = s % p; if (v === 0 || v === p - 2) return false; } return true; };

// SEC F: the deterministic translate count of one window under prime p.
function translateCount(s, g, p, x) {
  const onlyP = [];
  for (let j = 1; j < g; j++) {
    const v = md(s + j, p);
    if (v !== 0 && v !== p - 2) continue;              // p does not kill it
    let other = false;
    for (const q of upto(x)) { if (q === p) continue; const w = md(s + j, q); if (w === 0 || w === q - 2) { other = true; break; } }
    if (!other) onlyP.push(v);
  }
  let n = 0;
  const a = md(s, p), b = md(s + g, p);
  for (let d = 1; d < p; d++) {
    const u = md(a + d, p), w = md(b + d, p);
    if (u === 0 || u === p - 2 || w === 0 || w === p - 2) continue;
    let ok = true;
    for (const c of onlyP) { const z = md(c + d, p); if (z !== 0 && z !== p - 2) { ok = false; break; } }
    if (ok) n++;
  }
  return { n, onlyP: onlyP.length };
}

function translateCount2(s, g, p, x) {
  const classes = new Set();
  for (let j = 1; j < g; j++) {
    const v = md(s + j, p);
    if (v !== 0 && v !== p - 2) continue;
    let other = false;
    for (const q of upto(x)) { if (q === p) continue; const w = md(s + j, q); if (w === 0 || w === q - 2) { other = true; break; } }
    if (!other) classes.add(v);
  }
  const t = translateCount(s, g, p, x);
  return { n: t.n, onlyP: t.onlyP, both: classes.size === 2 };
}

// --- a seeded PRNG ----------------------------------------------------------
function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

// --- an independent residue chi-square, no mirror pairing -------------------
// Null: each s_i independent uniform on A_p(g_i). Cells are the union of the
// A_p(g_i). Statistic summed over 5 <= p <= x; p-value by Monte Carlo, so the
// asymptotic df question does not arise. Expected cell counts are REPORTED, so
// the reader can see how far below 5 they sit.
function chiTest(set, x, reps, rnd) {
  const ps = upto(x).filter((p) => p >= 5);
  const per = [];
  for (const p of ps) {
    const A = new Map();
    for (const e of set) if (!A.has(e.g)) A.set(e.g, allowed(p, e.g));
    const cells = [...new Set([].concat(...[...A.values()]))].sort((u, v) => u - v);
    if (cells.length < 2) continue;
    const idx = new Map(cells.map((c, i) => [c, i]));
    const E = new Float64Array(cells.length);
    for (const e of set) { const a = A.get(e.g); for (const c of a) E[idx.get(c)] += 1 / a.length; }
    const O = new Float64Array(cells.length);
    for (const e of set) O[idx.get(md(e.s, p))]++;
    let c2 = 0; for (let i = 0; i < cells.length; i++) if (E[i] > 0) c2 += (O[i] - E[i]) ** 2 / E[i];
    per.push({ p, c2, cells: cells.length, minE: Math.min(...E), A, idx, E });
  }
  const sim = per.map(() => []); const simTot = [];
  for (let r = 0; r < reps; r++) {
    let tot = 0;
    for (let k = 0; k < per.length; k++) {
      const q = per[k], O = new Float64Array(q.E.length);
      for (const e of set) { const a = q.A.get(e.g); O[q.idx.get(a[(rnd() * a.length) | 0])]++; }
      let c2 = 0; for (let i = 0; i < q.E.length; i++) if (q.E[i] > 0) c2 += (O[i] - q.E[i]) ** 2 / q.E[i];
      sim[k].push(c2); tot += c2;
    }
    simTot.push(tot);
  }
  const pv = (arr, obs) => { let c = 0; for (const v of arr) if (v >= obs - 1e-12) c++; return (c + 1) / (arr.length + 1); };
  const tot = per.reduce((a, q) => a + q.c2, 0);
  let worst = { p: 0, pp: 2 };
  per.forEach((q, k) => { const pp = pv(sim[k], q.c2); if (pp < worst.pp) worst = { p: q.p, pp }; q.pp = pp; });
  return { per, tot, pTot: pv(simTot, tot), worst, floor: 1 / (reps + 1) };
}
function drawMatched(x, W, G, n, rnd) {
  const out = []; let tries = 0;
  while (out.length < n && tries < 5e7) { tries++; const s = Math.floor(rnd() * W); if (isSlot(s, x) && isSlot(s + G, x)) out.push({ s, g: G }); }
  return out;
}

// ============================================================================
function main() {
  console.log(`redteam-0904-argmax.js --levels ${LEVELS.join(',')} --mc ${MCREPS}`);
  console.log('Target: research/history/staging/measure-0904-argmax.md (+ its producer).');
  console.log('');

  // Build the ladder of tiles by fold replication.
  const chain = [3, 5, 7, 11, 13, 17, 19, 23, 29];
  const need29 = LEVELS.some((v) => v >= 29);
  const need31 = LEVELS.includes(31);
  const store = new Map();
  let L = baseLevel();
  const maxStore = need29 || need31 ? 29 : Math.max(...LEVELS);
  for (let i = 1; i < chain.length; i++) {
    const q = chain[i];
    if (q > maxStore) break;
    L = fold(L, q);
    store.set(q, L);
    if (q >= 23) console.log(`  [build] T${q} folded: D = ${L.D}`);
  }
  console.log('');

  console.log('SEC A — SELF-TESTS. Every level exhaustive over the whole period.');
  console.log('  (no wall clock is printed anywhere below, so --check reproduces this block byte for');
  console.log('   byte; the elapsed time lives in the embed header, which is where a clock belongs.)');
  console.log('  x        W               D = prod(p-2)     count   sum g = W   ngaps = D   max   quoted   ok');
  const R = [];
  for (const x of LEVELS) {
    const W = Wof(x), D = Dof(x), Gq = QUOTED_G2[x];
    const initThr = Math.floor(0.70 * Gq);
    let st;
    if (x === 31) st = statsFolded(store.get(29), 31, initThr, 200000);
    else st = statsFromWord(store.get(x), initThr, 200000);
    let mx = 0; for (let g = 4095; g >= 0; g--) if (st.hist[g] > 0) { mx = g; break; }
    const ok = st.ngaps === D && st.sum === W && mx === Gq;
    console.log(`  ${String(x).padStart(2)}  ${String(W).padStart(15)}  ${String(D).padStart(15)}   ${st.ngaps === D ? 'yes' : 'NO '}     ${st.sum === W ? 'yes' : 'NO '}        ${st.ngaps === D ? 'yes' : 'NO '}      ${String(mx).padStart(4)}   ${String(Gq).padStart(5)}   ${ok ? 'ok' : 'FAIL'}`);
    // sets
    const am = [], all = [];
    for (let i = 0; i < st.col.n; i++) { const g = st.col.tg[i], s = st.col.tp[i]; all.push({ s, g }); if (g === mx) am.push({ s, g }); }
    am.sort((a, b) => a.s - b.s); all.sort((a, b) => a.s - b.s);
    // top-K under the TARGET's own rule: the largest threshold whose cumulative
    // count from the top is at least KTOP = 100, floored at the scan threshold.
    let cum = 0, topThr = mx;
    for (let g = 4095; g >= 0; g--) { cum += st.hist[g]; if (cum >= 100) { topThr = Math.max(g, st.col.thr); break; } }
    const top = all.filter((e) => e.g >= topThr);
    R.push({ x, W, D, G: mx, hist: st.hist, am, top, topThr, all, colThr: st.col.thr, colN: st.col.n, ratchets: st.col.ratchets });
  }
  console.log('  (the "quoted" column is research/G2-STATE.md §2, an INPUT to the test, never an output)');
  console.log('');

  console.log('SEC B — M1 REPRODUCED: multiplicity, the mirror, and the corpus ladder');
  console.log('  x    G2     m   even  tau-inv  fixed pts hit   least position          quoted least pos       quoted nmax   agree');
  for (const r of R) {
    const S = new Set(r.am.map((e) => e.s));
    const tau = (s) => md(r.W - 2 - r.G - s, r.W);
    const inv = r.am.every((e) => S.has(tau(e.s)));
    const f1 = (r.W - 2 - r.G) / 2, f2 = f1 + r.W / 2;
    const hit = r.am.filter((e) => e.s === f1 || e.s === f2).length;
    const q = QUOTED_POS[r.x];
    const agree = q ? (r.am[0].s === q[0] && r.am.length === q[1]) : null;
    console.log(`  ${String(r.x).padStart(2)}  ${String(r.G).padStart(5)}  ${String(r.am.length).padStart(4)}   ${r.am.length % 2 === 0 ? 'yes' : 'NO '}    ${inv ? 'yes' : 'NO '}        ${String(hit).padStart(3)}          ${String(r.am[0].s).padStart(15)}   ${String(q ? q[0] : '-').padStart(15)}   ${String(q ? q[1] : '-').padStart(6)}        ${agree === null ? '-' : (agree ? 'yes' : 'NO')}`);
  }
  console.log('');
  console.log('  The argmax left endpoints in full (up to 24 shown):');
  for (const r of R) console.log(`  x=${String(r.x).padStart(2)} m=${String(r.am.length).padStart(2)}: ${r.am.slice(0, 24).map((e) => e.s).join(', ')}${r.am.length > 24 ? ' …' : ''}`);
  console.log('');

  console.log('SEC C — F7 REPRODUCED: exact congruence pairs INSIDE the argmax set');
  console.log('  x    m    pairs by prime                                  total   components');
  for (const r of R) {
    const rows = pairsByPrime(r.am, r.W, r.x);
    const tot = rows.reduce((a, u) => a + u.ex, 0);
    const cc = components(r.am, r.W, r.x).size;
    console.log(`  ${String(r.x).padStart(2)}  ${String(r.am.length).padStart(3)}   ${(rows.length ? rows.map((u) => `p=${u.p}:${u.ex}`).join(' ') : 'none at any p <= x').padEnd(44)}  ${String(tot).padStart(5)}   ${String(cc).padStart(6)}`);
  }
  console.log('');

  console.log('SEC D — THE TOP-K SET, its definition made explicit, and its congruence structure');
  console.log('  Definition used, taken from the target producer: KTOP = 100, topThr = the largest');
  console.log('  gap value whose cumulative count from the top reaches 100; the set is EVERY gap');
  console.log('  of length >= topThr. K is therefore >= 100 and level-dependent.');
  console.log('  Two different counts, because the target reports only the first and words it as the second:');
  console.log('    K - components = redundant copies, i.e. total size minus one representative per family');
  console.log('    K - isolated   = windows that ACTUALLY have a congruence partner (the target\'s wording)');
  console.log('  x    topThr   topThr/G2   K     components   K - comps   pct(comps)   isolated   K - isolated   pct(partner)   collector thr / kept / ratchets');
  for (const r of R) {
    const cmp = components(r.top, r.W, r.x);
    const cc = cmp.size, iso = cmp.singles;
    console.log(`  ${String(r.x).padStart(2)}   ${String(r.topThr).padStart(6)}    ${fx(r.topThr / r.G, 4)}    ${String(r.top.length).padStart(4)}   ${String(cc).padStart(6)}      ${String(r.top.length - cc).padStart(6)}      ${fx(100 * (r.top.length - cc) / r.top.length, 1).padStart(5)}%     ${String(iso).padStart(5)}       ${String(r.top.length - iso).padStart(6)}        ${fx(100 * (r.top.length - iso) / r.top.length, 1).padStart(5)}%        ${r.colThr} / ${r.colN} / ${r.ratchets}`);
  }
  console.log('');
  console.log('  Exact congruence pairs among the top-K windows, per prime, with THREE nulls:');
  console.log('    null(unif)   = C(K,2)/M          the target\'s null: two uniform INTEGERS mod W');
  console.log('    null(slots)  = C(K,2)*(p-3)/(D-1)  two uniform TWIN SLOTS (proven in the header)');
  console.log('    ratio(unif), ratio(slots) = observed / null');
  console.log('  x    p    W/p                K    exact   null(unif)   ratio(unif)   null(slots)  ratio(slots)   slots/unif');
  for (const r of R) {
    const K = r.top.length, C = K * (K - 1) / 2;
    for (const row of pairsByPrime(r.top, r.W, r.x)) {
      const nu = C / row.M, ns = C * (row.p - 3) / (r.D - 1);
      console.log(`  ${String(r.x).padStart(2)}  ${String(row.p).padStart(3)}   ${String(row.M).padStart(15)}  ${String(K).padStart(4)}   ${String(row.ex).padStart(5)}   ${nu.toExponential(2)}     ${(row.ex / nu).toExponential(2)}     ${ns.toExponential(2)}    ${(row.ex / ns).toExponential(2)}      ${(nu > 0 ? (ns / nu).toFixed(1) : 'n/a').padStart(5)}`);
    }
  }
  console.log('');

  console.log('SEC E — THE MATCHED NULL, VERIFIED BY EXHAUSTIVE ENUMERATION');
  console.log('  Claim (header lemma): the number of ORDERED pairs of distinct twin slots congruent');
  console.log('  modulo W/p is exactly D*(p-3) for p >= 3, and 0 for p = 2. Enumerated in full at');
  console.log('  the levels where D is small enough to hold the whole slot list.');
  console.log('  x    p    D*(p-3) predicted   enumerated   agree');
  for (const r of R) {
    if (r.D > 4e5) continue;
    const Lw = store.get(r.x);
    const slots = new Float64Array(Lw.D); { let pos = Lw.s0; for (let i = 0; i < Lw.D; i++) { slots[i] = pos; pos += Lw.g[i]; } }
    for (const p of upto(r.x)) {
      const M = r.W / p, cnt = new Map();
      for (let i = 0; i < slots.length; i++) { const k = slots[i] % M; cnt.set(k, (cnt.get(k) || 0) + 1); }
      let ord = 0; for (const c of cnt.values()) ord += c * (c - 1);
      const pred = p === 2 ? 0 : r.D * (p - 3);
      console.log(`  ${String(r.x).padStart(2)}  ${String(p).padStart(3)}   ${String(pred).padStart(16)}   ${String(ord).padStart(10)}   ${ord === pred ? 'yes' : 'NO'}`);
    }
  }
  console.log('');

  console.log('SEC F — THE MECHANISM: the translate count is DETERMINISTIC, not a p-value');
  console.log('  For each window and each prime p <= x the header lemma gives the exact number of');
  console.log('  d in 1..p-1 whose translate is a gap of the SAME length. Summed over a set and');
  console.log('  halved it must equal that set\'s exact-pair count where the translate stays in the');
  console.log('  set; for the ARGMAX set that is automatic (same length = still maximal).');
  console.log('  x   set      n    sum translate counts / 2   observed exact pairs   agree   windows with >=1 translate');
  for (const r of R) {
    for (const [tag, set] of [['argmax', r.am], [`top-${r.top.length}`, r.top]]) {
      let s2 = 0, wpos = 0;
      for (const e of set) { let c = 0; for (const p of upto(r.x)) c += translateCount(e.s, e.g, p, r.x).n; s2 += c; if (c > 0) wpos++; }
      const obs = pairsByPrime(set, r.W, r.x).reduce((a, u) => a + u.ex, 0);
      const half = s2 / 2;
      console.log(`  ${String(r.x).padStart(2)}  ${tag.padEnd(9)} ${String(set.length).padStart(4)}   ${String(half).padStart(22)}   ${String(obs).padStart(20)}   ${tag === 'argmax' ? (half === obs ? 'yes' : 'NO ') : (half <= obs ? 'lower bd' : 'NO ')}    ${String(wpos).padStart(4)} of ${set.length}`);
    }
  }
  console.log('');
  console.log('  Why the argmax set has no translate from x = 23 up: per level, the number of');
  console.log('  (window, prime) cells in which SOME interior offset is killed by p ALONE.');
  console.log('  A single such offset with an incompatible class kills every translate at that p.');
  console.log('  If BOTH classes 0 and p-2 appear among the only-p interior kills, no nonzero shift can');
  console.log('  hold them both, so the translate count is forced to zero. That is the whole criterion.');
  console.log('  x   m    (window,p) cells   >=1 only-p kill   BOTH classes present (forced 0)   cells with a translate');
  for (const r of R) {
    let cells = 0, onlyp = 0, both = 0, surv = 0;
    for (const e of r.am) for (const p of upto(r.x)) {
      const t = translateCount2(e.s, e.g, p, r.x); cells++;
      if (t.onlyP > 0) onlyp++; if (t.both) both++; if (t.n > 0) surv++;
    }
    console.log(`  ${String(r.x).padStart(2)}  ${String(r.am.length).padStart(3)}   ${String(cells).padStart(14)}   ${String(onlyp).padStart(14)}   ${String(both).padStart(30)}   ${String(surv).padStart(21)}`);
  }
  console.log('');

  console.log('SEC G — THE EXTREME TAIL, and what the D^0.10 column is');
  console.log('  The target\'s F5 model is N(>= a*G2) ~ D^(1-a) from a Poisson tail with lambda =');
  console.log('  ln D / G2, so D^0.05 pairs with a = 0.95 and D^0.10 with a = 0.90. Thresholds are');
  console.log('  taken as g >= ceil(a*G2), which is the target\'s rule.');
  console.log('  x    G2   N(=G2)   N(>=.95G2)   N(>=.90G2)   D^0.05   D^0.10   obs/model(.90)   2nd, 3rd, 4th distinct');
  for (const r of R) {
    const N = (t) => { let c = 0; for (let g = Math.ceil(t); g < 4096; g++) c += r.hist[g]; return c; };
    const d = []; for (let g = 4095; g >= 0 && d.length < 4; g--) if (r.hist[g] > 0) d.push([g, r.hist[g]]);
    const m10 = Math.pow(r.D, 0.10);
    console.log(`  ${String(r.x).padStart(2)}  ${String(r.G).padStart(4)}  ${String(r.hist[r.G]).padStart(6)}   ${String(N(0.95 * r.G)).padStart(10)}   ${String(N(0.90 * r.G)).padStart(10)}   ${fx(Math.pow(r.D, 0.05), 2).padStart(6)}   ${fx(m10, 2).padStart(6)}   ${fx(N(0.90 * r.G) / m10, 2).padStart(13)}   ${d.slice(1).map(([g, c]) => `${g}x${c}`).join('  ')}`);
  }
  console.log('');
  console.log('  Drop from G2 to the second largest distinct gap (the target\'s F6):');
  for (const r of R) { const d = []; for (let g = 4095; g >= 0 && d.length < 2; g--) if (r.hist[g] > 0) d.push(g); console.log(`  x=${String(r.x).padStart(2)}  G2 = ${r.G}, second = ${d[1]}, drop = ${r.G - d[1]}`); }
  console.log('');

  console.log('SEC H — THE RESIDUE CHI-SQUARE: is it well posed, and does the rejection reproduce?');
  console.log('  Independent implementation: cells = union of A_p(g) over the set, E = sum 1/|A_p(g)|,');
  console.log('  statistic summed over 5 <= p <= x, p-value by Monte Carlo under "each s_i uniform on');
  console.log('  A_p(g_i)". NO mirror pairing (the target pairs mirror partners, which REDUCES the');
  console.log('  effective draws and so makes rejection harder; this test is the more liberal one).');
  console.log(`  MC floor is 1/(reps+1) = ${(1 / (MCREPS + 1)).toExponential(2)}: a printed p at the floor means "<= floor", not a value.`);
  console.log('  x   set          n    chi2 tot    p(tot)     worst p  p(prime)  0.05/pi(x)  min E   cells@worst  control p(tot)');
  for (const r of R) {
    const thin = components(r.top, r.W, r.x).reps;
    for (const [tag, set, sd] of [[`top-${r.top.length}`, r.top, 11], ['top-thin', thin, 13], ['argmax', r.am, 17]]) {
      if (set.length < 4) { console.log(`  ${String(r.x).padStart(2)}  ${tag.padEnd(12)} ${String(set.length).padStart(3)}   (n < 4, not tested)`); continue; }
      const res = chiTest(set, r.x, MCREPS, rng(90401 + r.x * 7 + sd));
      const wq = res.per.find((q) => q.p === res.worst.p);
      const ctl = drawMatched(r.x, r.W, r.G, set.length, rng(555 + r.x * 3 + sd));
      const cres = chiTest(ctl, r.x, Math.min(MCREPS, 4000), rng(999 + r.x * 3 + sd));
      console.log(`  ${String(r.x).padStart(2)}  ${tag.padEnd(12)} ${String(set.length).padStart(3)}   ${fx(res.tot, 2).padStart(9)}   ${fx(res.pTot, 5)}      p=${String(res.worst.p).padStart(2)}   ${fx(res.worst.pp, 5)}    ${fx(0.05 / upto(r.x).length, 5)}   ${fx(Math.min(...res.per.map((q) => q.minE)), 2).padStart(5)}   ${String(wq ? wq.cells : '-').padStart(6)}      ${fx(cres.pTot, 5)}`);
    }
  }
  console.log('');
  console.log('  Expected counts per cell, per prime, for the top-thin set (the row the target reads');
  console.log('  for pinning). The Pearson chi-square\'s asymptotic df is not used here, but a reader');
  console.log('  wanting the E >= 5 rule can see how far the table sits from it:');
  for (const r of R) {
    const thin = components(r.top, r.W, r.x).reps;
    const parts = [];
    for (const p of upto(r.x)) { if (p < 5) continue; const a = allowed(p, r.G); parts.push(`p${p}:${(thin.length / a.length).toFixed(2)}`); }
    console.log(`  x=${String(r.x).padStart(2)}  n=${String(thin.length).padStart(3)}  E per cell ~ ${parts.join(' ')}`);
  }
  console.log('');

  console.log('SEC I — MULTIPLE COMPARISONS ARITHMETIC (item f)');
  const nlev = R.length;
  console.log(`  Rows the target reports in its SEC D: 4 sets x 5 scored levels = 20 nominal tests,`);
  console.log('  of which it prints 14 (the n < 4 rows are skipped). Its per-prime guard is');
  console.log('  0.05/pi(x), a Bonferroni ACROSS PRIMES only; there is no correction across the');
  console.log('  4 sets or the 5 levels. A Bonferroni across all 14 printed rows would need');
  console.log(`  p <= 0.05/14 = ${(0.05 / 14).toExponential(3)}, and across 14 rows x pi(x) primes, p <= ${(0.05 / (14 * 10)).toExponential(3)}.`);
  console.log(`  This red team ran ${nlev} level(s) x 3 sets = ${nlev * 3} nominal tests in SEC H, and applies`);
  console.log('  the same arithmetic to itself: a Bonferroni across its own printed rows.');
  console.log('');

  console.log('SEC K — CUSTODY OF THE TARGET, checked mechanically rather than by eye');
  const fs = require('fs'), TF = require('../../qc/tailfmt.js');
  const tsrc = fs.readFileSync(__dirname + '/measure-0904-argmax.js', 'utf8');
  const tmd = fs.readFileSync(__dirname + '/measure-0904-argmax.md', 'utf8');
  const codeHash = TF.sha(TF.headTextAll(tsrc));
  const inFile = [...tsrc.matchAll(/code-sha256: ([0-9a-f]{64})/g)].map((m) => m[1]);
  const inNote = [...tmd.matchAll(/`([0-9a-f]{16})…`/g)].map((m) => m[1]);
  console.log(`  target producer, code-sha256 recomputed by research/qc/tailfmt.js: ${codeHash}`);
  console.log(`  code-sha256 recorded in each of its OUTPUT tails:                  ${[...new Set(inFile)].join(', ')}`);
  console.log(`  all tails carry the same code hash and it matches the bytes:       ${inFile.length === 3 && new Set(inFile).size === 1 && inFile[0] === codeHash ? 'yes' : 'NO'}`);
  console.log(`  16-hex prefixes quoted in the NOTE (§2 table and §5):              ${[...new Set(inNote)].join(', ')}`);
  console.log(`  the note's quoted code-sha256 prefix matches the file:             ${inNote.includes(codeHash.slice(0, 16)) ? 'yes' : 'NO — the note quotes a hash the producer does not carry'}`);
  const outs = [...tsrc.matchAll(/out-sha256:  ([0-9a-f]{64})/g)].map((m) => m[1]);
  console.log(`  out-sha256 prefixes in the file: ${outs.map((h) => h.slice(0, 16)).join(', ')}`);
  console.log(`  every out-sha256 prefix the note quotes is present in the file:    ${outs.map((h) => h.slice(0, 16)).every((h) => true) && inNote.filter((h) => !outs.map((u) => u.slice(0, 16)).includes(h) && h !== codeHash.slice(0, 16)).length === 0 ? 'yes' : 'no — ' + inNote.filter((h) => !outs.map((u) => u.slice(0, 16)).includes(h)).join(', ') + ' unaccounted'}`);
  console.log(`  the // widths-ok annotation §2 and §5(5) describe as STILL PRESENT: ${/widths-ok/.test(tsrc) ? 'present' : 'ABSENT — it was deleted, as the §2 rider says, so §2 body and §5(5) are stale'}`);
  console.log(`  tails stamped forced: ${[...tsrc.matchAll(/forced:      ([^\n]*)/g)].map((m) => m[1].trim()).join(' | ') || 'none'}`);
  console.log('');

  console.log('DONE');
}

main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0904-argmax.js -- --levels 11,13,17,19,23,29,31 --mc 20000
//   invocation:  node research/history/staging/redteam-0904-argmax.js --levels 11,13,17,19,23,29,31 --mc 20000
//   code-sha256: 2edf24a77e7ec0b889fdb106ea214d04fd6a9214efbdf6cc09e79cabe94fe3d7
//   out-sha256:  acd910a1635fc5684b7f9668f05e346d7364c9e8c061ccd30e7711f1201b87ca
//   body-lines:  255
//   inputs:      research/qc/tailfmt.js@ad688e4769b5
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-04
//   elapsed:     98.3 s
// ============================================================================
// redteam-0904-argmax.js --levels 11,13,17,19,23,29,31 --mc 20000
// Target: research/history/staging/measure-0904-argmax.md (+ its producer).
//
//   [build] T23 folded: D = 7952175
//   [build] T29 folded: D = 214708725
//
// SEC A — SELF-TESTS. Every level exhaustive over the whole period.
//   (no wall clock is printed anywhere below, so --check reproduces this block byte for
//    byte; the elapsed time lives in the embed header, which is where a clock belongs.)
//   x        W               D = prod(p-2)     count   sum g = W   ngaps = D   max   quoted   ok
//   11             2310              135   yes     yes        yes        42      42   ok
//   13            30030             1485   yes     yes        yes        66      66   ok
//   17           510510            22275   yes     yes        yes       108     108   ok
//   19          9699690           378675   yes     yes        yes       150     150   ok
//   23        223092870          7952175   yes     yes        yes       204     204   ok
//   29       6469693230        214708725   yes     yes        yes       258     258   ok
//   31     200560490130       6226553025   yes     yes        yes       348     348   ok
//   (the "quoted" column is research/G2-STATE.md §2, an INPUT to the test, never an output)
//
// SEC B — M1 REPRODUCED: multiplicity, the mirror, and the corpus ladder
//   x    G2     m   even  tau-inv  fixed pts hit   least position          quoted least pos       quoted nmax   agree
//   11     42     4   yes    yes          0                      899               899        4        yes
//   13     66    12   yes    yes          0                      731               731       12        yes
//   17    108    20   yes    yes          0                      701               701       20        yes
//   19    150    20   yes    yes          0                      659               659       20        yes
//   23    204     4   yes    yes          0                 76166567          76166567        4        yes
//   29    258     2   yes    yes          0               1205437109        1205437109        2        yes
//   31    348     4   yes    yes          0               8813641451        8813641451        4        yes
//
//   The argmax left endpoints in full (up to 24 shown):
//   x=11 m= 4: 899, 947, 1319, 1367
//   x=13 m=12: 731, 3851, 6581, 7211, 9941, 13061, 16901, 20021, 22751, 23381, 26111, 29231
//   x=17 m=20: 701, 3011, 33851, 36161, 128981, 185069, 197051, 199361, 230201, 232511, 277889, 280199, 311039, 313349, 325331, 381419, 474239, 476549, 507389, 509699
//   x=19 m=20: 659, 156269, 406169, 1020209, 1218029, 2239049, 2394659, 2644559, 2801639, 4659509, 5040029, 6897899, 7054979, 7304879, 7460489, 8481509, 8679329, 9293369, 9543269, 9698879
//   x=23 m= 4: 76166567, 108991247, 114101417, 146926097
//   x=29 m= 2: 1205437109, 5264255861
//   x=31 m= 4: 8813641451, 69494902091, 131065587689, 191746848329
//
// SEC C — F7 REPRODUCED: exact congruence pairs INSIDE the argmax set
//   x    m    pairs by prime                                  total   components
//   11    4   p=11:2                                            2        2
//   13   12   p=11:4 p=13:6                                    10        4
//   17   20   p=11:4 p=13:10                                   14        8
//   19   20   p=11:8 p=13:10 p=19:4                            22        4
//   23    4   none at any p <= x                                0        4
//   29    2   none at any p <= x                                0        2
//   31    4   none at any p <= x                                0        4
//
// SEC D — THE TOP-K SET, its definition made explicit, and its congruence structure
//   Definition used, taken from the target producer: KTOP = 100, topThr = the largest
//   gap value whose cumulative count from the top reaches 100; the set is EVERY gap
//   of length >= topThr. K is therefore >= 100 and level-dependent.
//   Two different counts, because the target reports only the first and words it as the second:
//     K - components = redundant copies, i.e. total size minus one representative per family
//     K - isolated   = windows that ACTUALLY have a congruence partner (the target's wording)
//   x    topThr   topThr/G2   K     components   K - comps   pct(comps)   isolated   K - isolated   pct(partner)   collector thr / kept / ratchets
//   11       29    0.6905      30        2          28       93.3%         0           30        100.0%        29 / 30 / 0
//   13       46    0.6970      44        8          36       81.8%         0           44        100.0%        46 / 44 / 0
//   17       78    0.7222     144       11         133       92.4%         0          144        100.0%        75 / 144 / 0
//   19      138    0.9200     106       19          87       82.1%         2          104         98.1%        105 / 1276 / 0
//   23      180    0.8824     146       44         102       69.9%         6          140         95.9%        142 / 2358 / 0
//   29      222    0.8605     128       44          84       65.6%         9          119         93.0%        180 / 17620 / 0
//   31      306    0.8793     118       50          68       57.6%        20           98         83.1%        243 / 3862 / 0
//
//   Exact congruence pairs among the top-K windows, per prime, with THREE nulls:
//     null(unif)   = C(K,2)/M          the target's null: two uniform INTEGERS mod W
//     null(slots)  = C(K,2)*(p-3)/(D-1)  two uniform TWIN SLOTS (proven in the header)
//     ratio(unif), ratio(slots) = observed / null
//   x    p    W/p                K    exact   null(unif)   ratio(unif)   null(slots)  ratio(slots)   slots/unif
//   11    5               462    30       4   9.42e-1     4.25e+0     6.49e+0    6.16e-1        6.9
//   11    7               330    30       8   1.32e+0     6.07e+0     1.30e+1    6.16e-1        9.9
//   11   11               210    30      78   2.07e+0     3.77e+1     2.60e+1    3.00e+0       12.5
//   13    5              6006    44       4   1.58e-1     2.54e+1     1.27e+0    3.14e+0        8.1
//   13    7              4290    44       8   2.21e-1     3.63e+1     2.55e+0    3.14e+0       11.6
//   13   11              2730    44      18   3.47e-1     5.19e+1     5.10e+0    3.53e+0       14.7
//   13   13              2310    44      20   4.10e-1     4.88e+1     6.37e+0    3.14e+0       15.6
//   17    5            102102   144       2   1.01e-1     1.98e+1     9.24e-1    2.16e+0        9.2
//   17    7             72930   144       9   1.41e-1     6.38e+1     1.85e+0    4.87e+0       13.1
//   17   11             46410   144     173   2.22e-1     7.80e+2     3.70e+0    4.68e+1       16.7
//   17   13             39270   144     268   2.62e-1     1.02e+3     4.62e+0    5.80e+1       17.6
//   17   17             30030   144      38   3.43e-1     1.11e+2     6.47e+0    5.87e+0       18.9
//   19   11            881790   106      30   6.31e-3     4.75e+3     1.18e-1    2.55e+2       18.6
//   19   13            746130   106      52   7.46e-3     6.97e+3     1.47e-1    3.54e+2       19.7
//   19   17            570570   106      30   9.75e-3     3.08e+3     2.06e-1    1.46e+2       21.1
//   19   19            510510   106      28   1.09e-2     2.57e+3     2.35e-1    1.19e+2       21.6
//   23   11          20281170   146      12   5.22e-4     2.30e+4     1.06e-2    1.13e+3       20.4
//   23   13          17160990   146      43   6.17e-4     6.97e+4     1.33e-2    3.23e+3       21.6
//   23   17          13123110   146      21   8.07e-4     2.60e+4     1.86e-2    1.13e+3       23.1
//   23   19          11741730   146      29   9.01e-4     3.22e+4     2.13e-2    1.36e+3       23.6
//   23   23           9699690   146      36   1.09e-3     3.30e+4     2.66e-2    1.35e+3       24.4
//   29    7         924241890   128       6   8.79e-6     6.82e+5     1.51e-4    3.96e+4       17.2
//   29   11         588153930   128       2   1.38e-5     1.45e+5     3.03e-4    6.60e+3       21.9
//   29   13         497668710   128      17   1.63e-5     1.04e+6     3.79e-4    4.49e+4       23.2
//   29   17         380570190   128      21   2.14e-5     9.83e+5     5.30e-4    3.96e+4       24.8
//   29   19         340510170   128      12   2.39e-5     5.03e+5     6.06e-4    1.98e+4       25.4
//   29   23         281291010   128      24   2.89e-5     8.31e+5     7.57e-4    3.17e+4       26.2
//   29   29         223092870   128      24   3.64e-5     6.59e+5     9.84e-4    2.44e+4       27.0
//   31    7       28651498590   118       2   2.41e-7     8.30e+6     4.43e-6    4.51e+5       18.4
//   31   13       15427730010   118       6   4.47e-7     1.34e+7     1.11e-5    5.41e+5       24.8
//   31   17       11797675890   118      20   5.85e-7     3.42e+7     1.55e-5    1.29e+6       26.5
//   31   19       10555815270   118      20   6.54e-7     3.06e+7     1.77e-5    1.13e+6       27.1
//   31   23        8720021310   118      15   7.92e-7     1.89e+7     2.22e-5    6.77e+5       28.0
//   31   29        6915878970   118       7   9.98e-7     7.01e+6     2.88e-5    2.43e+5       28.9
//   31   31        6469693230   118      16   1.07e-6     1.50e+7     3.10e-5    5.15e+5       29.1
//
// SEC E — THE MATCHED NULL, VERIFIED BY EXHAUSTIVE ENUMERATION
//   Claim (header lemma): the number of ORDERED pairs of distinct twin slots congruent
//   modulo W/p is exactly D*(p-3) for p >= 3, and 0 for p = 2. Enumerated in full at
//   the levels where D is small enough to hold the whole slot list.
//   x    p    D*(p-3) predicted   enumerated   agree
//   11    2                  0            0   yes
//   11    3                  0            0   yes
//   11    5                270          270   yes
//   11    7                540          540   yes
//   11   11               1080         1080   yes
//   13    2                  0            0   yes
//   13    3                  0            0   yes
//   13    5               2970         2970   yes
//   13    7               5940         5940   yes
//   13   11              11880        11880   yes
//   13   13              14850        14850   yes
//   17    2                  0            0   yes
//   17    3                  0            0   yes
//   17    5              44550        44550   yes
//   17    7              89100        89100   yes
//   17   11             178200       178200   yes
//   17   13             222750       222750   yes
//   17   17             311850       311850   yes
//   19    2                  0            0   yes
//   19    3                  0            0   yes
//   19    5             757350       757350   yes
//   19    7            1514700      1514700   yes
//   19   11            3029400      3029400   yes
//   19   13            3786750      3786750   yes
//   19   17            5301450      5301450   yes
//   19   19            6058800      6058800   yes
//
// SEC F — THE MECHANISM: the translate count is DETERMINISTIC, not a p-value
//   For each window and each prime p <= x the header lemma gives the exact number of
//   d in 1..p-1 whose translate is a gap of the SAME length. Summed over a set and
//   halved it must equal that set's exact-pair count where the translate stays in the
//   set; for the ARGMAX set that is automatic (same length = still maximal).
//   x   set      n    sum translate counts / 2   observed exact pairs   agree   windows with >=1 translate
//   11  argmax       4                        2                      2   yes       4 of 4
//   11  top-30      30                       59                     90   lower bd      30 of 30
//   13  argmax      12                       10                     10   yes      12 of 12
//   13  top-44      44                       34                     50   lower bd      44 of 44
//   17  argmax      20                       14                     14   yes      20 of 20
//   17  top-144    144                      358                    490   lower bd     144 of 144
//   19  argmax      20                       22                     22   yes      20 of 20
//   19  top-106    106                      128                    140   lower bd     104 of 106
//   23  argmax       4                        0                      0   yes       0 of 4
//   23  top-146    146                      122                    141   lower bd     128 of 146
//   29  argmax       2                        0                      0   yes       0 of 2
//   29  top-128    128                       86                    106   lower bd     114 of 128
//   31  argmax       4                        0                      0   yes       0 of 4
//   31  top-118    118                       72                     86   lower bd      94 of 118
//
//   Why the argmax set has no translate from x = 23 up: per level, the number of
//   (window, prime) cells in which SOME interior offset is killed by p ALONE.
//   A single such offset with an incompatible class kills every translate at that p.
//   If BOTH classes 0 and p-2 appear among the only-p interior kills, no nonzero shift can
//   hold them both, so the translate count is forced to zero. That is the whole criterion.
//   x   m    (window,p) cells   >=1 only-p kill   BOTH classes present (forced 0)   cells with a translate
//   11    4               20               20                               12                       4
//   13   12               72               72                               40                      20
//   17   20              140              140                               92                      28
//   19   20              160              160                               96                      44
//   23    4               36               36                               32                       0
//   29    2               20               20                               18                       0
//   31    4               44               44                               40                       0
//
// SEC G — THE EXTREME TAIL, and what the D^0.10 column is
//   The target's F5 model is N(>= a*G2) ~ D^(1-a) from a Poisson tail with lambda =
//   ln D / G2, so D^0.05 pairs with a = 0.95 and D^0.10 with a = 0.90. Thresholds are
//   taken as g >= ceil(a*G2), which is the target's rule.
//   x    G2   N(=G2)   N(>=.95G2)   N(>=.90G2)   D^0.05   D^0.10   obs/model(.90)   2nd, 3rd, 4th distinct
//   11    42       4            4            4     1.28     1.63            2.45   36x4  30x22  24x6
//   13    66      12           12           24     1.44     2.08           11.56   60x12  48x20  42x84
//   17   108      20           20           20     1.65     2.72            7.35   96x22  90x24  84x12
//   19   150      20           20          106     1.90     3.61           29.34   138x86  132x26  126x48
//   23   204       4            6           34     2.21     4.90            6.94   198x2  192x8  186x20
//   29   258       2            2           22     2.61     6.81            3.23   240x8  234x12  228x22
//   31   348       4            4           72     3.09     9.54            7.55   330x34  318x34  312x10
//
//   Drop from G2 to the second largest distinct gap (the target's F6):
//   x=11  G2 = 42, second = 36, drop = 6
//   x=13  G2 = 66, second = 60, drop = 6
//   x=17  G2 = 108, second = 96, drop = 12
//   x=19  G2 = 150, second = 138, drop = 12
//   x=23  G2 = 204, second = 198, drop = 6
//   x=29  G2 = 258, second = 240, drop = 18
//   x=31  G2 = 348, second = 330, drop = 18
//
// SEC H — THE RESIDUE CHI-SQUARE: is it well posed, and does the rejection reproduce?
//   Independent implementation: cells = union of A_p(g) over the set, E = sum 1/|A_p(g)|,
//   statistic summed over 5 <= p <= x, p-value by Monte Carlo under "each s_i uniform on
//   A_p(g_i)". NO mirror pairing (the target pairs mirror partners, which REDUCES the
//   effective draws and so makes rejection harder; this test is the more liberal one).
//   MC floor is 1/(reps+1) = 5.00e-5: a printed p at the floor means "<= floor", not a value.
//   x   set          n    chi2 tot    p(tot)     worst p  p(prime)  0.05/pi(x)  min E   cells@worst  control p(tot)
//   11  top-30        30       19.42   0.10654      p= 7   0.02155    0.01000    1.07        5      0.63009
//   11  top-thin       2   (n < 4, not tested)
//   11  argmax         4       10.00   0.68107      p= 7   0.23519    0.01000    0.50        5      0.46088
//   13  top-44        44       41.85   0.00615      p= 7   0.02475    0.00833    2.67        5      0.60085
//   13  top-thin       8       18.07   0.76146      p=11   0.36858    0.00833    0.33        9      0.28168
//   13  argmax        12       27.00   0.07590      p= 7   0.06880    0.00833    1.33        3      0.57761
//   17  top-144      144      387.97   0.00005      p= 7   0.00005    0.00714    6.00        5      0.61560
//   17  top-thin      11       36.26   0.46468      p=17   0.26809    0.00714    0.46       15      0.11122
//   17  argmax        20       74.60   0.00005      p=17   0.00010    0.00714    1.54       13      0.74381
//   19  top-106      106      525.21   0.00005      p= 7   0.00005    0.00625    1.25        4      0.70807
//   19  top-thin      19       70.79   0.04400      p= 7   0.01235    0.00625    0.19        4      0.02074
//   19  argmax        20      320.20   0.00005      p= 5   0.00005    0.00625    1.25        3      0.39315
//   23  top-146      146      436.19   0.00005      p=11   0.00005    0.00556    1.74        9      0.22419
//   23  top-thin      44      113.97   0.00140      p=23   0.00035    0.00556    0.72       21      0.55361
//   23  argmax         4       70.50   0.17919      p=23   0.01940    0.00556    0.21       19      0.02574
//   29  top-128      128      770.71   0.00005      p=11   0.00005    0.00500    1.74        9      0.32492
//   29  top-thin      44      248.70   0.00005      p=23   0.00005    0.00500    0.56       21      0.83879
//   29  argmax         2   (n < 4, not tested)
//   31  top-118      118      799.73   0.00005      p= 5   0.00005    0.00455    3.02        3      0.32667
//   31  top-thin      50      284.74   0.00005      p=23   0.00005    0.00455    1.22       21      0.12297
//   31  argmax         4      156.00   0.00630      p=23   0.01945    0.00455    0.15       19      0.34766
//
//   Expected counts per cell, per prime, for the top-thin set (the row the target reads
//   for pinning). The Pearson chi-square's asymptotic df is not used here, but a reader
//   wanting the E >= 5 rule can see how far the table sits from it:
//   x=11  n=  2  E per cell ~ p5:1.00 p7:0.40 p11:0.25
//   x=13  n=  8  E per cell ~ p5:8.00 p7:2.67 p11:0.89 p13:0.89
//   x=17  n= 11  E per cell ~ p5:5.50 p7:3.67 p11:1.38 p13:1.22 p17:0.85
//   x=19  n= 19  E per cell ~ p5:6.33 p7:6.33 p11:2.71 p13:2.11 p17:1.46 p19:1.19
//   x=23  n= 44  E per cell ~ p5:44.00 p7:14.67 p11:6.29 p13:4.89 p17:2.93 p19:2.93 p23:2.32
//   x=29  n= 44  E per cell ~ p5:22.00 p7:14.67 p11:6.29 p13:4.40 p17:3.38 p19:2.93 p23:2.32 p29:1.76
//   x=31  n= 50  E per cell ~ p5:25.00 p7:12.50 p11:7.14 p13:5.56 p17:3.85 p19:3.33 p23:2.63 p29:1.85 p31:1.85
//
// SEC I — MULTIPLE COMPARISONS ARITHMETIC (item f)
//   Rows the target reports in its SEC D: 4 sets x 5 scored levels = 20 nominal tests,
//   of which it prints 14 (the n < 4 rows are skipped). Its per-prime guard is
//   0.05/pi(x), a Bonferroni ACROSS PRIMES only; there is no correction across the
//   4 sets or the 5 levels. A Bonferroni across all 14 printed rows would need
//   p <= 0.05/14 = 3.571e-3, and across 14 rows x pi(x) primes, p <= 3.571e-4.
//   This red team ran 7 level(s) x 3 sets = 21 nominal tests in SEC H, and applies
//   the same arithmetic to itself: a Bonferroni across its own printed rows.
//
// SEC K — CUSTODY OF THE TARGET, checked mechanically rather than by eye
//   target producer, code-sha256 recomputed by research/qc/tailfmt.js: d53a3fd1ace221b8c95b0aad6cf5ce3b2afcc85a6af831a6e818accc3b3671d0
//   code-sha256 recorded in each of its OUTPUT tails:                  d53a3fd1ace221b8c95b0aad6cf5ce3b2afcc85a6af831a6e818accc3b3671d0
//   all tails carry the same code hash and it matches the bytes:       yes
//   16-hex prefixes quoted in the NOTE (§2 table and §5):              3019147f2faa358a, 561419f722de5a55, 7d77a93b06db6100, e3e990410c0b1aef
//   the note's quoted code-sha256 prefix matches the file:             NO — the note quotes a hash the producer does not carry
//   out-sha256 prefixes in the file: 561419f722de5a55, 7d77a93b06db6100, e3e990410c0b1aef
//   every out-sha256 prefix the note quotes is present in the file:    no — 3019147f2faa358a unaccounted
//   the // widths-ok annotation §2 and §5(5) describe as STILL PRESENT: ABSENT — it was deleted, as the §2 rider says, so §2 body and §5(5) are stale
//   tails stamped forced: 2026-09-04, 3 of 531 figures in the replaced block not reproduced (first: 13.6, 14.43e9, 5.86) | 2026-09-04, 3 of 88 figures in the replaced block not reproduced (first: 569.5, 13.03e9, 6.49)
//
// DONE
// ============================================================================
// READINGS
//
