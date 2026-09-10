// ============================================================================
// ATTACK 4 — THE UNIVERSAL PACKING CAP (two-class admissible tuples)
// natal-cap-04-packing-cap.js (2026-08-14)
// ============================================================================
// IDEA. Call S ⊆ [0,L) NATAL-ADMISSIBLE if (i) some shift puts every element
// in {11,17} mod 30, and (ii) for every prime p ≥ 7 some pair {c_p, c_p+2}
// mod p is disjoint from S. Let rho*5(L) = max |S|. Then (claim) every
// length-L window of every tile's natal pattern, at any level and rotation,
// holds ≤ rho*5(L) points — a level-independent cap — so the Scour obeys
// gross(q) ≤ 2·rho*5(W/q) for ALL tiles simultaneously.
//
// PIGEONHOLE CUTOFF (proved, used everywhere): S can FAIL condition (ii) at p
// only if every pair {c,c+2} meets S mod p, i.e. the occupied residues form a
// vertex cover of the p-cycle 0→2→4→…→p-2→0 (p odd ⇒ one cycle). A vertex
// cover of C_p needs ≥ ceil(p/2) vertices, so failure needs |S| ≥ ceil(p/2).
// Hence (ii) is automatic for p > 2|S|: only 7 ≤ p ≤ 2|S| ever matters.
// (Same role as the p ≤ k cutoff in classical admissible-tuple theory.)
//
// KEY STRUCTURAL FACT (tiles compute rho for us). If S is natal-admissible
// then for each p ≤ x it avoids some pair {c_p, c_p+2}; by CRT there is a
// translation carrying S into the standard natal pattern P_x (avoid {0,p-2}
// mod p, classes {11,17} mod 30). So S sits inside a length-L window of the
// CYCLIC pattern P_x, for EVERY level x at once:
//        rho*5(L) ≤ M_x(L) := max cyclic window count of tile @x.
// Conversely a maximizing window of P_x whose content is admissible for the
// primes in (x, 2k] IS natal-admissible ⇒ equality. Note the subtlety: a
// window's full content may be inadmissible while a proper SUBSET of size
// between LB and M_x is admissible — so a failed certificate leaves a
// bracket [LB, UB], not a value.
//
// HONEST QUESTIONS ASKED UP FRONT:
//  (a) Is distance-2 even the right universal family? The dilation r ↦ q⁻¹r
//      (mod W) that converts "strikes of q" into "window of a pattern" sends
//      avoid-{0,p-2}-mod-p to avoid-{0,-2q⁻¹}-mod-p: the avoided pair has
//      distance -2q⁻¹ mod p, NOT 2. And the mod-30 skeleton {11,17} maps to a
//      pair at distance 6q⁻¹ ∈ {±6,±12} mod 30. So windows of the DILATED
//      pattern live in a strictly larger family than rho*5's. We measure the
//      actual dilated window maxima against the distance-2 maxima.
//  (b) Even if the per-q cap is decent, does Σ_q 2·rho*5(W/q) stay below the
//      census |N_x|? Two independent dooms threaten: (i) Hensley–Richards
//      superdensity (best packings beat the natal mean by a constant), and
//      (ii) the overlap credit — Σ 2/q over the scour already exceeds 1, so
//      even MEAN-value caps overshoot the census (union bound dies first).
//
// PLAN: 1) exact rho*5 by branch-and-bound (Engelsma-style over avoided
// classes) for L ≤ ~480; 2) brackets beyond via greedy sieve + coordinate
// ascent (LB), admissible-full-window certificates on tiles @19/@23 (LB),
// and M_23 (UB, tile W=223,092,870 with 5,301,450 natal points); 3) compare
// with natal densities and true tile window maxima; 4) the scour ledger at
// x=13 and x=17: gross(q) vs mean 2N/q vs cap 2·rho*5(W/q), summed.
// ============================================================================
'use strict';
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';

function primesUpTo(n) {
  const s = new Uint8Array(n + 1), o = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return o;
}
const PR = primesUpTo(5000);
const P7 = PR.filter(p => p >= 7);

// ---------- natal patterns -------------------------------------------------
function natal(x) {
  const bps = P7.filter(p => p <= x);
  let W = 30; for (const p of bps) W *= p;
  const pts = [];
  for (let b = 0; b < W; b += 30) {
    outer: for (const c of [11, 17]) {
      const r = b + c;
      for (const p of bps) { const m = r % p; if (m === 0 || m === p - 2) continue outer; }
      pts.push(r);
    }
  }
  return { x, W, pts: Int32Array.from(pts) };
}

// ---------- cyclic sliding-window max --------------------------------------
function maxWindow(pts, W, L) {
  const n = pts.length;
  if (L >= W) return n;
  let j = 0, M = 0;
  for (let i = 0; i < n; i++) {
    if (j < i) j = i;
    while (j - i < n && (j < n ? pts[j] : pts[j - n] + W) < pts[i] + L) j++;
    if (j - i > M) M = j - i;
  }
  return M;
}

// ---------- admissibility test (condition ii, p in [pmin, 2|S|]) -----------
function blockPrime(S, pmin) { // 0 = admissible; else first blocking prime
  const k = S.length;
  for (const p of P7) {
    if (p > 2 * k) break;
    if (p < pmin) continue;
    const bl = new Uint8Array(p);
    for (let i = 0; i < k; i++) { const s = S[i]; bl[s % p] = 1; bl[((s - 2) % p + p) % p] = 1; }
    let free = false;
    for (let c = 0; c < p; c++) if (!bl[c]) { free = true; break; }
    if (!free) return p;
  }
  return 0;
}

// ---------- candidates of the mod-30 skeleton {a, a+6} in [0,L) ------------
function skeleton(L, a) {
  const b = (a + 6) % 30, o = [];
  for (let j = 0; j < L; j++) { const m = j % 30; if (m === a || m === b) o.push(j); }
  return o;
}

// ---------- greedy sieve + coordinate ascent (lower bound) -----------------
function greedyLB(L, a) {
  const C = skeleton(L, a), n = C.length;
  if (n === 0) return [];
  const kc = new Int32Array(n);
  const chosen = new Map(); // p -> c
  let k = n, li = 0;
  const hit = (i, p, c) => { const m = C[i] % p; return m === c || m === (c + 2) % p; };
  const apply = (p, c, d) => {
    for (let i = 0; i < n; i++) if (hit(i, p, c)) {
      if (d > 0) { if (kc[i] === 0) k--; kc[i]++; } else { kc[i]--; if (kc[i] === 0) k++; }
    }
  };
  const choose = (p) => { // best c given current kc (p's own contribution must be removed first)
    const h = new Int32Array(p);
    for (let i = 0; i < n; i++) if (kc[i] === 0) h[C[i] % p]++;
    let bc = 0, bv = Infinity;
    for (let c = 0; c < p; c++) { const v = h[c] + h[(c + 2) % p]; if (v < bv) { bv = v; bc = c; } }
    return bc;
  };
  const extend = () => { while (li < P7.length && P7[li] <= 2 * k) { const p = P7[li]; const c = choose(p); chosen.set(p, c); apply(p, c, 1); li++; } };
  extend();
  for (let round = 0; round < 3; round++) {
    for (const p of [...chosen.keys()]) {
      const cur = chosen.get(p);
      apply(p, cur, -1);
      const c2 = choose(p);
      chosen.set(p, c2); apply(p, c2, 1);
    }
    extend();
  }
  const S = []; for (let i = 0; i < n; i++) if (kc[i] === 0) S.push(C[i]);
  if (blockPrime(S, 7) !== 0) throw new Error('greedyLB produced inadmissible set');
  return S;
}
function greedyBest(L, nOffsets) {
  let best = [];
  for (let a = 0; a < nOffsets; a++) { const S = greedyLB(L, a); if (S.length > best.length) best = S; }
  return best;
}

// ---------- exact branch-and-bound -----------------------------------------
// Branch on the avoided class c_p, primes ascending; leaf when p > 2·|alive|.
// Dedupe branches with identical removal sets; visit small removals first;
// prune when |alive| ≤ best. Exact iff it finishes inside the budget.
//
// THE BUDGET IS A NODE COUNT, NOT A CLOCK (2026-08-20). Until today this
// function took a `budgetMs` and aborted on `Date.now() > deadline`, and three
// things downstream were decided by that timer: the length of the printed
// staircase, the `exact` label on every row of the rho table (hence the
// headline `exact for 83/184 lengths`), and the LOWER BOUNDS themselves, since
// a timeout at one L leaves `prevExact` behind and every larger L then inherits
// a weaker monotone floor. The numbers stayed valid bounds; they were simply
// hardware-dependent, and one of them is a proposed OEIS sequence whose term
// count was set by a 2000 ms timer. `attack2-rankin2d.js:136-139` already ran
// the same shape of exhaustive search against a deterministic `nodeBudget` and
// returned `exact: r.complete`; this is that, ported. No published number
// moves: the embedding run never timed out, and the budgets below are set well
// above the node counts that run actually uses (reported on stderr). The
// budgets keep the old 2:4:8 ratio at 1000 nodes to the millisecond, and the
// deepest search any of them actually needs is 288 nodes.
function rho5BB(L, seed, nodeBudget) {
  let best = seed, bestSet = null, timedOut = false, nodes = 0;
  for (let a = 0; a < 30; a++) {
    const C = skeleton(L, a), n = C.length;
    if (n <= best) continue;
    const plist = P7.filter(p => p <= 2 * n);
    // residue buckets per prime
    const buck = plist.map(p => {
      const B = Array.from({ length: p }, () => []);
      for (let i = 0; i < n; i++) B[C[i] % p].push(i);
      return B;
    });
    const alive = new Uint8Array(n).fill(1);
    const rec = (li, k) => {
      if (timedOut || k <= best) return;
      if (li >= plist.length || plist[li] > 2 * k) {
        best = k;
        bestSet = []; for (let i = 0; i < n; i++) if (alive[i]) bestSet.push(C[i]);
        return;
      }
      if (++nodes > nodeBudget) { timedOut = true; return; }
      const p = plist[li], B = buck[li];
      const seen = new Set(), opts = [];
      for (let c = 0; c < p; c++) {
        const rem = [];
        for (const i of B[c]) if (alive[i]) rem.push(i);
        for (const i of B[(c + 2) % p]) if (alive[i]) rem.push(i);
        const key = rem.join(',');
        if (!seen.has(key)) { seen.add(key); opts.push(rem); }
      }
      opts.sort((u, v) => u.length - v.length);
      for (const rem of opts) {
        if (k - rem.length <= best) continue;
        for (const i of rem) alive[i] = 0;
        rec(li + 1, k - rem.length);
        for (const i of rem) alive[i] = 1;
        if (timedOut) return;
      }
    };
    rec(0, n);
    if (timedOut) break;
  }
  if (nodes > BB_PEAK) BB_PEAK = nodes;
  return { val: best, set: bestSet, exact: !timedOut, nodes };
}
let BB_PEAK = 0;

// ---------- admissible-full-window certificate on a tile (LB; UB = M) ------
function windowScan(pts, W, L, pmin, budget) {
  const n = pts.length;
  const get = k => (k < n ? pts[k] : pts[k - n] + W);
  const cnt = new Int32Array(n);
  let j = 0, M = 0;
  for (let i = 0; i < n; i++) {
    if (j < i) j = i;
    while (j - i < n && get(j) < pts[i] + L) j++;
    cnt[i] = j - i; if (cnt[i] > M) M = cnt[i];
  }
  if (M > 130) return { M, lb: 0 };            // certificate hopeless & costly
  let tested = 0;
  for (let t = M; t >= Math.max(1, M - 8); t--) {
    for (let i = 0; i < n; i++) {
      if (cnt[i] !== t) continue;
      if (tested >= budget) return { M, lb: 0 };
      tested++;
      const S = new Array(t); for (let u = 0; u < t; u++) S[u] = get(i + u);
      if (blockPrime(S, pmin) === 0) return { M, lb: t };
    }
  }
  return { M, lb: 0 };
}

// ---------- modular inverse -------------------------------------------------
function modInv(a, m) {
  let [r0, r1] = [a % m, m], [s0, s1] = [1, 0];
  while (r1) { const q = Math.floor(r0 / r1); [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; }
  return ((s0 % m) + m) % m;
}

// ============================================================================
// MAIN
// ============================================================================
console.log(`[${el()}] building natal tiles @13 @17 @19 @23 ...`);
const T13 = natal(13), T17 = natal(17), T19 = natal(19), T23 = natal(23);
console.log(`[${el()}] |N| = ${T13.pts.length} @13, ${T17.pts.length} @17, ${T19.pts.length} @19, ${T23.pts.length} @23  (expect 990 / 14850 / 252450 / 5301450)`);

// scour prime lists and window lengths
function scourPrimes(T) { const s = Math.floor(Math.sqrt(T.W)); return PR.filter(q => q > T.x && q <= s); }
const SC13 = scourPrimes(T13), SC17 = scourPrimes(T17);
const Lof = (W, q) => Math.floor((W - 1) / q) + 1; // number of m with qm < W

const GRID = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480,
  540, 600, 660, 720, 840, 960, 1080, 1200, 1440, 1680, 1920, 2160, 2400, 2700, 3000];
const masterL = new Set(GRID);
for (const q of SC13) masterL.add(Lof(T13.W, q));
for (const q of SC17) masterL.add(Lof(T17.W, q));
const Ls = [...masterL].sort((a, b) => a - b);
console.log(`[${el()}] ${Ls.length} window lengths, L from ${Ls[0]} to ${Ls[Ls.length - 1]}`);

// rho table: per L collect lb/ub/exactness
const BB_LMAX = 480, BB_NODES = 4e6;   // deterministic; see rho5BB's header
const rho = new Map(); // L -> {lb, ub, exact, how}
let prevExact = 0;
for (const L of Ls) {
  const M13 = maxWindow(T13.pts, T13.W, L);
  const M17 = maxWindow(T17.pts, T17.W, L);
  const M19 = maxWindow(T19.pts, T19.W, L);
  const M23 = maxWindow(T23.pts, T23.W, L);
  if (!(M23 <= M19 && M19 <= M17 && M17 <= M13)) throw new Error(`monotonicity broken at L=${L}`);
  let lb = greedyBest(L, L <= 600 ? 30 : (L <= 3000 ? 6 : 2)).length;
  let how = 'greedy';
  if (L <= 3000) {
    const w19 = windowScan(T19.pts, T19.W, L, 23, 600);
    const w23 = windowScan(T23.pts, T23.W, L, 29, 600);
    if (w19.lb > lb) { lb = w19.lb; how = 'win@19'; }
    if (w23.lb > lb) { lb = w23.lb; how = 'win@23'; }
  }
  if (lb < prevExact) { lb = prevExact; how = 'monotone'; } // rho is monotone in L
  let ub = M23, exact = false;
  if (lb === ub) exact = true;
  if (!exact && L <= BB_LMAX) {
    const r = rho5BB(L, Math.max(lb - 1, 0), BB_NODES); // seed = lb-1 so a set of size lb is re-found (sanity)
    if (r.val > lb) { lb = r.val; how = 'bb'; }
    if (r.exact) { exact = true; ub = r.val === lb ? lb : ub; ub = lb; how = 'bb-exact'; }
  }
  if (lb > ub) throw new Error(`lb>ub at L=${L}: ${lb}>${ub}`);
  if (exact) prevExact = Math.max(prevExact, lb);
  rho.set(L, { lb, ub, exact, how, M13, M17, M19, M23 });
}
console.log(`[${el()}] rho table done; exact for ${[...rho.values()].filter(r => r.exact).length}/${Ls.length} lengths`);

// ---- print rho table on the grid ------------------------------------------
console.log('\n--- rho*5(L): exact / [LB,UB], vs tile window maxima and natal means ---');
console.log('  L   | rho*5        | M13 M17 M19 M23 | mean@13  mean@17 | rho/mean@13 rho/mean@17');
for (const L of Ls) {
  if (!GRID.includes(L) && L > 480) continue;
  const r = rho.get(L);
  const m13 = T13.pts.length * L / T13.W, m17 = T17.pts.length * L / T17.W;
  const v = r.exact ? `${r.lb} exact ` : `[${r.lb},${r.ub}] ${r.how}`;
  const mid = r.exact ? r.lb : (r.lb + r.ub) / 2;
  console.log(`${String(L).padStart(5)} | ${v.padEnd(12)} | ${String(r.M13).padStart(3)} ${String(r.M17).padStart(3)} ${String(r.M19).padStart(3)} ${String(r.M23).padStart(3)} | ${m13.toFixed(2).padStart(7)} ${m17.toFixed(2).padStart(8)} | ${(mid / m13).toFixed(3).padStart(9)} ${(mid / m17).toFixed(3).padStart(10)}`);
}

// ---- one concrete extremal set ---------------------------------------------
{
  const r300 = rho5BB(300, 0, 8e6);
  console.log(`\nrho*5(300) = ${r300.val}${r300.exact ? ' (exact)' : ' (LB, timed out)'}; witness: [${r300.set.join(', ')}]`);
  console.log(`witness admissible check (should be 0): ${blockPrime(r300.set, 7)}`);
}

// ============================================================================
// SCOUR LEDGERS @13 and @17: gross(q) vs mean vs universal cap
// ============================================================================
function scourLedger(T, SC, printAll) {
  const N = T.pts, n = N.length, W = T.W;
  console.log(`\n===== SCOUR @${T.x}: W=${W}, |N|=${n}, scour = ${SC.length} primes ${SC[0]}..${SC[SC.length - 1]} =====`);
  console.log('  q  |   L=W/q | gross | mean 2N/q | cap 2*rho [LB,UB] | cap/gross | dilMax excess');
  const killed = new Uint8Array(n);
  let Sg = 0, Sm = 0, ScL = 0, ScU = 0;
  let SgT = 0, SmT = 0, ScLT = 0, ScUT = 0; // tail q > W^(1/3)
  const Wthird = Math.cbrt(W);
  let dilExcessMax = -Infinity, dilOK = true;
  const rows = [];
  for (const q of SC) {
    let g = 0;
    for (let i = 0; i < n; i++) {
      const r = N[i];
      if (r % q === 0 || (r + 2) % q === 0) { g++; killed[i] = 1; }
    }
    const L = Lof(W, q), rr = rho.get(L), mean = 2 * n / q;
    // dilation identity + dilated-family window max (the honest family, per q)
    const inv = modInv(q, W);
    const d0 = new Float64Array(n), d2 = new Float64Array(n);
    for (let i = 0; i < n; i++) { d0[i] = (N[i] * inv) % W; d2[i] = ((N[i] + 2) * inv) % W; }
    d0.sort(); d2.sort();
    // identity check: strikes r≡0: m=r*inv in [0, L); strikes r≡-2: m=(r+2)*inv in [1, floor((W+1)/q)]
    let c0 = 0; for (let i = 0; i < n; i++) if (d0[i] < L) c0++;
    const hi2 = Math.floor((W + 1) / q);
    let c2 = 0; for (let i = 0; i < n; i++) if (d2[i] >= 1 && d2[i] <= hi2) c2++;
    if (c0 + c2 !== g) dilOK = false;
    const D = Math.max(maxWindow(Int32Array.from(d0), W, L), maxWindow(Int32Array.from(d2), W, L));
    const Mx = rr[`M${T.x}`]; // same-level distance-2 window max
    const excess = D - Mx;
    if (excess > dilExcessMax) dilExcessMax = excess;
    Sg += g; Sm += mean; ScL += 2 * rr.lb; ScU += 2 * rr.ub;
    if (q > Wthird) { SgT += g; SmT += mean; ScLT += 2 * rr.lb; ScUT += 2 * rr.ub; }
    rows.push({ q, L, g, mean, rr, D, Mx, excess });
  }
  for (let i = 0; i < rows.length; i++) {
    const R = rows[i];
    if (!printAll && !(R.q <= 100 || i % 4 === 0 || i >= rows.length - 3)) continue;
    const cap = R.rr.exact ? `${2 * R.rr.lb} exact` : `[${2 * R.rr.lb},${2 * R.rr.ub}]`;
    console.log(`${String(R.q).padStart(4)} | ${String(R.L).padStart(7)} | ${String(R.g).padStart(5)} | ${R.mean.toFixed(1).padStart(9)} | ${cap.padEnd(17)} | ${(2 * R.rr.lb / R.g).toFixed(2).padStart(6)}+ | D=${R.D} vs M@${T.x}=${R.Mx} (${R.excess >= 0 ? '+' : ''}${R.excess})`);
  }
  const defFail = rows.filter(R => R.g > 2 * R.rr.ub).map(R => R.q);
  const mayFail = rows.filter(R => R.g > 2 * R.rr.lb && R.g <= 2 * R.rr.ub).map(R => R.q);
  console.log(`  DEFINITIVE cap failures (gross > 2·rhoUB): ${defFail.length} primes ${defFail.length ? '[' + defFail.join(',') + ']' : ''}`);
  console.log(`  possible further failures inside bracket (2·rhoLB < gross ≤ 2·rhoUB): ${mayFail.length} primes ${mayFail.length ? '[' + mayFail.join(',') + ']' : ''}`);
  // empirically safe tail: largest suffix where cap holds already at the LB
  let si = rows.length;
  while (si > 0 && rows[si - 1].g <= 2 * rows[si - 1].rr.lb) si--;
  if (si < rows.length) {
    const qs = rows[si].q;
    let g2 = 0, cl2 = 0, cu2 = 0;
    for (let i2 = si; i2 < rows.length; i2++) { g2 += rows[i2].g; cl2 += 2 * rows[i2].rr.lb; cu2 += 2 * rows[i2].rr.ub; }
    console.log(`  SAFE TAIL q >= ${qs} (${rows.length - si} primes, L <= ${rows[si].L}): Σgross=${g2} Σcap=[${cl2},${cu2}]  capLB/gross=${(cl2 / g2).toFixed(3)} capUB/gross=${(cu2 / g2).toFixed(3)}`);
  }
  let surv = 0; for (let i = 0; i < n; i++) if (!killed[i]) surv++;
  console.log(`  dilation identity gross = c0+c2 verified for all q: ${dilOK}`);
  console.log(`  max over q of (dilated-family window max − distance-2 M@${T.x}): ${dilExcessMax}`);
  console.log(`  SUMS: census N=${n}; Σgross=${Sg} (${(Sg / n).toFixed(3)}·N); Σmean=${Sm.toFixed(0)} (${(Sm / n).toFixed(3)}·N)`);
  console.log(`        Σcap 2rho: LB=${ScL} (${(ScL / n).toFixed(3)}·N)  UB=${ScU} (${(ScU / n).toFixed(3)}·N)`);
  console.log(`  survivors (natal points untouched by scour) = ${surv};  net kills = ${n - surv};  overlap factor Σgross/net = ${(Sg / (n - surv)).toFixed(3)}`);
  console.log(`  TAIL q > W^(1/3)=${Wthird.toFixed(1)}: Σgross=${SgT} Σmean=${SmT.toFixed(0)} Σcap=[${ScLT},${ScUT}]  capLB/gross=${(ScLT / SgT).toFixed(2)}  capUB/gross=${(ScUT / SgT).toFixed(2)}`);
  return { Sg, Sm, ScL, ScU, surv };
}
const led13 = scourLedger(T13, SC13, true);
const led17 = scourLedger(T17, SC17, false);

// ---- superdensity at scour-relevant L: the Hensley–Richards question -------
console.log('\n--- superdensity: rho*5(L) vs the natal mean it must cap (e^gamma = 1.781) ---');
for (const q of [17, 19, 29, 47, 89, 173]) {
  if (!SC13.includes(q)) continue;
  const L = Lof(T13.W, q), r = rho.get(L), mean = T13.pts.length * L / T13.W;
  console.log(`@13 q=${String(q).padStart(3)}: L=${String(L).padStart(5)} rho=[${r.lb},${r.ub}]${r.exact ? ' exact' : ''}  natal mean/window=${mean.toFixed(1)}  ratio=[${(r.lb / mean).toFixed(3)},${(r.ub / mean).toFixed(3)}]`);
}
for (const q of [19, 23, 37, 79, 149, 293, 509, 709]) {
  if (!SC17.includes(q)) continue;
  const L = Lof(T17.W, q), r = rho.get(L), mean = T17.pts.length * L / T17.W;
  console.log(`@17 q=${String(q).padStart(3)}: L=${String(L).padStart(5)} rho=[${r.lb},${r.ub}]${r.exact ? ' exact' : ''}  natal mean/window=${mean.toFixed(1)}  ratio=[${(r.lb / mean).toFixed(3)},${(r.ub / mean).toFixed(3)}]`);
}
// ---- exact staircase of rho*5 and minimal twin-cluster widths --------------
// rho*5(L) for every L=1..400; w(k) = least L with rho*5(L) = k. In prime-
// tuple terms a size-k natal-admissible set is k twin pairs (2k-tuple), of
// diameter w(k)+1 (last upper member minus first lower member).
{
  console.log('\n--- exact staircase rho*5(L), L = 1..400 ---');
  let prev = 0; const jumps = [];
  for (let L = 1; L <= 400; L++) {
    const r = rho5BB(L, prev, 2e6);
    if (!r.exact) { console.log(`  (timed out at L=${L}; stopping staircase)`); break; }
    if (r.val > prev) { jumps.push([r.val, L]); prev = r.val; }
  }
  console.log('  k : minimal window w(k) : 2k-tuple diameter w(k)+1');
  console.log('  ' + jumps.map(([k, L]) => `${k}:${L}(${L + 1})`).join('  '));
  console.log('  diameters: ' + jumps.map(([k, L]) => L + 1).join(', '));
}
console.error(`  [budget] deepest single rho5BB search used ${BB_PEAK.toLocaleString('en-US')} nodes; the budgets are 2e6 / 4e6 / 8e6`);
console.log(`\n[${el()}] done.`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-04-packing-cap.js
//   invocation:  node research/natal-cap-04-packing-cap.js
//   code-sha256: f1c1a91966cd2d2b3ad5e76bf32eb320a1355ddea2a4184217acc420ae7c4960
//   out-sha256:  31e56ae743701aec8c266290e3e8ce052845c4185f4518c269a9ced64c6767a5
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     23.9 s
// ============================================================================
// [0.0s] building natal tiles @13 @17 @19 @23 ...
// [0.3s] |N| = 990 @13, 14850 @17, 252450 @19, 5301450 @23  (expect 990 / 14850 / 252450 / 5301450)
// [0.3s] 184 window lengths, L from 30 to 26869
// [23.2s] rho table done; exact for 83/184 lengths
//
// --- rho*5(L): exact / [LB,UB], vs tile window maxima and natal means ---
//   L   | rho*5        | M13 M17 M19 M23 | mean@13  mean@17 | rho/mean@13 rho/mean@17
//    30 | 2 exact      |   2   2   2   2 |    0.99     0.87 |     2.022      2.292
//    60 | 4 exact      |   4   4   4   4 |    1.98     1.75 |     2.022      2.292
//    90 | 6 exact      |   6   6   6   6 |    2.97     2.62 |     2.022      2.292
//   120 | 7 exact      |   7   7   7   7 |    3.96     3.49 |     1.769      2.005
//   150 | 8 exact      |   8   8   8   8 |    4.95     4.36 |     1.618      1.833
//   174 | 9 exact      |   9   9   9   9 |    5.74     5.06 |     1.569      1.778
//   180 | 9 exact      |   9   9   9   9 |    5.93     5.24 |     1.517      1.719
//   185 | 9 exact      |   9   9   9   9 |    6.10     5.38 |     1.476      1.672
//   192 | 10 exact     |  10  10  10  10 |    6.33     5.59 |     1.580      1.791
//   199 | 10 exact     |  10  10  10  10 |    6.56     5.79 |     1.524      1.728
//   202 | 10 exact     |  10  10  10  10 |    6.66     5.88 |     1.502      1.702
//   210 | 10 exact     |  10  10  10  10 |    6.92     6.11 |     1.444      1.637
//   217 | 11 exact     |  11  11  11  11 |    7.15     6.31 |     1.538      1.743
//   220 | 11 exact     |  11  11  11  11 |    7.25     6.40 |     1.517      1.719
//   230 | 11 exact     |  11  11  11  11 |    7.58     6.69 |     1.451      1.644
//   237 | 11 exact     |  11  11  11  11 |    7.81     6.89 |     1.408      1.596
//   240 | 11 exact     |  11  11  11  11 |    7.91     6.98 |     1.390      1.576
//   266 | 12 exact     |  13  12  12  12 |    8.77     7.74 |     1.368      1.551
//   270 | 12 exact     |  13  12  12  12 |    8.90     7.85 |     1.348      1.528
//   276 | 13 exact     |  13  13  13  13 |    9.10     8.03 |     1.429      1.619
//   281 | 13 exact     |  13  13  13  13 |    9.26     8.17 |     1.403      1.590
//   292 | 13 exact     |  13  13  13  13 |    9.63     8.49 |     1.350      1.531
//   298 | 13 exact     |  14  13  13  13 |    9.82     8.67 |     1.323      1.500
//   300 | 13 exact     |  14  13  13  13 |    9.89     8.73 |     1.314      1.490
//   310 | 14 exact     |  14  14  14  14 |   10.22     9.02 |     1.370      1.553
//   330 | 14 exact     |  14  14  14  14 |   10.88     9.60 |     1.287      1.458
//   338 | 15 exact     |  15  15  15  15 |   11.14     9.83 |     1.346      1.526
//   360 | 15 exact     |  15  15  15  15 |   11.87    10.47 |     1.264      1.432
//   362 | 16 exact     |  16  16  16  16 |   11.93    10.53 |     1.341      1.519
//   381 | 16 exact     |  16  16  16  16 |   12.56    11.08 |     1.274      1.444
//   390 | 16 exact     |  16  16  16  16 |   12.86    11.34 |     1.244      1.410
//   412 | 17 exact     |  17  17  17  17 |   13.58    11.98 |     1.252      1.419
//   420 | 17 exact     |  17  17  17  17 |   13.85    12.22 |     1.228      1.391
//   423 | 18 exact     |  18  18  18  18 |   13.95    12.30 |     1.291      1.463
//   449 | 18 exact     |  19  18  18  18 |   14.80    13.06 |     1.216      1.378
//   450 | 18 exact     |  19  18  18  18 |   14.84    13.09 |     1.213      1.375
//   480 | 20 exact     |  21  20  20  20 |   15.82    13.96 |     1.264      1.432
//   540 | 21 exact     |  22  21  21  21 |   17.80    15.71 |     1.180      1.337
//   600 | 22 exact     |  24  22  22  22 |   19.78    17.45 |     1.112      1.261
//   660 | 24 exact     |  26  25  24  24 |   21.76    19.20 |     1.103      1.250
//   720 | 26 exact     |  29  27  27  26 |   23.74    20.94 |     1.095      1.241
//   840 | 29 exact     |  33  31  30  29 |   27.69    24.43 |     1.047      1.187
//   960 | 32 exact     |  36  34  34  32 |   31.65    27.93 |     1.011      1.146
//  1080 | [35,36] win@23 |  41  38  38  36 |   35.60    31.42 |     0.997      1.130
//  1200 | [38,39] greedy |  45  42  41  39 |   39.56    34.91 |     0.973      1.103
//  1440 | [44,46] greedy |  53  49  47  46 |   47.47    41.89 |     0.948      1.074
//  1680 | [47,52] greedy |  60  56  54  52 |   55.38    48.87 |     0.894      1.013
//  1920 | [52,59] greedy |  69  63  61  59 |   63.30    55.85 |     0.877      0.994
//  2160 | [57,65] greedy |  76  70  68  65 |   71.21    62.83 |     0.857      0.971
//  2400 | [61,69] greedy |  83  75  72  69 |   79.12    69.81 |     0.822      0.931
//  2700 | [69,77] greedy |  92  84  81  77 |   89.01    78.54 |     0.820      0.929
//  3000 | [74,84] greedy | 103  95  90  84 |   98.90    87.27 |     0.799      0.905
//
// rho*5(300) = 13 (exact); witness: [0, 6, 30, 36, 60, 90, 120, 126, 156, 186, 210, 246, 270]
// witness admissible check (should be 0): 0
//
// ===== SCOUR @13: W=30030, |N|=990, scour = 34 primes 17..173 =====
//   q  |   L=W/q | gross | mean 2N/q | cap 2*rho [LB,UB] | cap/gross | dilMax excess
//   17 |    1767 |   115 |     116.5 | [98,108]          |   0.85+ | D=63 vs M@13=63 (+0)
//   19 |    1581 |   102 |     104.2 | [92,100]          |   0.90+ | D=56 vs M@13=57 (-1)
//   23 |    1306 |    87 |      86.1 | [82,86]           |   0.94+ | D=49 vs M@13=49 (+0)
//   29 |    1036 |    65 |      68.3 | [68,70]           |   1.05+ | D=39 vs M@13=39 (+0)
//   31 |     969 |    61 |      63.9 | 66 exact          |   1.08+ | D=36 vs M@13=37 (-1)
//   37 |     812 |    53 |      53.5 | 58 exact          |   1.09+ | D=31 vs M@13=32 (-1)
//   41 |     733 |    50 |      48.3 | 54 exact          |   1.08+ | D=29 vs M@13=29 (+0)
//   43 |     699 |    48 |      46.0 | 52 exact          |   1.08+ | D=28 vs M@13=28 (+0)
//   47 |     639 |    43 |      42.1 | 48 exact          |   1.12+ | D=26 vs M@13=26 (+0)
//   53 |     567 |    38 |      37.4 | 44 exact          |   1.16+ | D=23 vs M@13=23 (+0)
//   59 |     509 |    34 |      33.6 | 40 exact          |   1.18+ | D=22 vs M@13=22 (+0)
//   61 |     493 |    33 |      32.5 | 40 exact          |   1.21+ | D=20 vs M@13=21 (-1)
//   67 |     449 |    30 |      29.6 | 36 exact          |   1.20+ | D=18 vs M@13=19 (-1)
//   71 |     423 |    29 |      27.9 | 36 exact          |   1.24+ | D=18 vs M@13=18 (+0)
//   73 |     412 |    24 |      27.1 | 34 exact          |   1.42+ | D=18 vs M@13=17 (+1)
//   79 |     381 |    26 |      25.1 | 32 exact          |   1.23+ | D=16 vs M@13=16 (+0)
//   83 |     362 |    23 |      23.9 | 32 exact          |   1.39+ | D=16 vs M@13=16 (+0)
//   89 |     338 |    22 |      22.2 | 30 exact          |   1.36+ | D=16 vs M@13=15 (+1)
//   97 |     310 |    19 |      20.4 | 28 exact          |   1.47+ | D=14 vs M@13=14 (+0)
//  101 |     298 |    20 |      19.6 | 26 exact          |   1.30+ | D=15 vs M@13=14 (+1)
//  103 |     292 |    20 |      19.2 | 26 exact          |   1.30+ | D=14 vs M@13=13 (+1)
//  107 |     281 |    20 |      18.5 | 26 exact          |   1.30+ | D=13 vs M@13=13 (+0)
//  109 |     276 |    17 |      18.2 | 26 exact          |   1.53+ | D=13 vs M@13=13 (+0)
//  113 |     266 |    15 |      17.5 | 24 exact          |   1.60+ | D=12 vs M@13=13 (-1)
//  127 |     237 |    16 |      15.6 | 22 exact          |   1.38+ | D=11 vs M@13=11 (+0)
//  131 |     230 |    15 |      15.1 | 22 exact          |   1.47+ | D=10 vs M@13=11 (-1)
//  137 |     220 |    14 |      14.5 | 22 exact          |   1.57+ | D=11 vs M@13=11 (+0)
//  139 |     217 |    14 |      14.2 | 22 exact          |   1.57+ | D=12 vs M@13=11 (+1)
//  149 |     202 |    14 |      13.3 | 20 exact          |   1.43+ | D=9 vs M@13=10 (-1)
//  151 |     199 |    14 |      13.1 | 20 exact          |   1.43+ | D=10 vs M@13=10 (+0)
//  157 |     192 |    14 |      12.6 | 20 exact          |   1.43+ | D=9 vs M@13=10 (-1)
//  163 |     185 |    15 |      12.1 | 18 exact          |   1.20+ | D=10 vs M@13=9 (+1)
//  167 |     180 |    13 |      11.9 | 18 exact          |   1.38+ | D=9 vs M@13=9 (+0)
//  173 |     174 |    12 |      11.4 | 18 exact          |   1.50+ | D=9 vs M@13=9 (+0)
//   DEFINITIVE cap failures (gross > 2·rhoUB): 3 primes [17,19,23]
//   possible further failures inside bracket (2·rhoLB < gross ≤ 2·rhoUB): 0 primes
//   SAFE TAIL q >= 29 (31 primes, L <= 1036): Σgross=831 Σcap=[1028,1030]  capLB/gross=1.237 capUB/gross=1.239
//   dilation identity gross = c0+c2 verified for all q: true
//   max over q of (dilated-family window max − distance-2 M@13): 1
//   SUMS: census N=990; Σgross=1135 (1.146·N); Σmean=1135 (1.147·N)
//         Σcap 2rho: LB=1300 (1.313·N)  UB=1324 (1.337·N)
//   survivors (natal points untouched by scour) = 307;  net kills = 683;  overlap factor Σgross/net = 1.662
//   TAIL q > W^(1/3)=31.1: Σgross=705 Σmean=696 Σcap=[894,894]  capLB/gross=1.27  capUB/gross=1.27
//
// ===== SCOUR @17: W=510510, |N|=14850, scour = 120 primes 19..709 =====
//   q  |   L=W/q | gross | mean 2N/q | cap 2*rho [LB,UB] | cap/gross | dilMax excess
//   19 |   26869 |  1563 |    1563.2 | [796,1324]        |   0.51+ | D=791 vs M@17=791 (+0)
//   23 |   22197 |  1292 |    1291.3 | [694,1100]        |   0.54+ | D=657 vs M@17=653 (+4)
//   29 |   17604 |  1027 |    1024.1 | [572,878]         |   0.56+ | D=521 vs M@17=521 (+0)
//   31 |   16469 |   960 |     958.1 | [542,822]         |   0.56+ | D=487 vs M@17=488 (-1)
//   37 |   13798 |   805 |     802.7 | [466,692]         |   0.58+ | D=409 vs M@17=408 (+1)
//   41 |   12452 |   725 |     724.4 | [446,630]         |   0.62+ | D=371 vs M@17=371 (+0)
//   43 |   11873 |   691 |     690.7 | [424,600]         |   0.61+ | D=356 vs M@17=355 (+1)
//   47 |   10862 |   626 |     631.9 | [396,550]         |   0.63+ | D=324 vs M@17=324 (+0)
//   53 |    9633 |   559 |     560.4 | [362,492]         |   0.65+ | D=292 vs M@17=290 (+2)
//   59 |    8653 |   497 |     503.4 | [334,444]         |   0.67+ | D=262 vs M@17=260 (+2)
//   61 |    8370 |   488 |     486.9 | [318,426]         |   0.65+ | D=253 vs M@17=251 (+2)
//   67 |    7620 |   441 |     443.3 | [296,392]         |   0.67+ | D=232 vs M@17=229 (+3)
//   71 |    7191 |   418 |     418.3 | [288,372]         |   0.69+ | D=221 vs M@17=217 (+4)
//   73 |    6994 |   410 |     406.8 | [284,364]         |   0.69+ | D=212 vs M@17=212 (+0)
//   79 |    6463 |   378 |     375.9 | [266,338]         |   0.70+ | D=198 vs M@17=197 (+1)
//   83 |    6151 |   362 |     357.8 | [254,322]         |   0.70+ | D=187 vs M@17=189 (-2)
//   89 |    5737 |   331 |     333.7 | [240,302]         |   0.73+ | D=176 vs M@17=176 (+0)
//   97 |    5263 |   307 |     306.2 | [224,276]         |   0.73+ | D=162 vs M@17=159 (+3)
//  107 |    4772 |   275 |     277.6 | [210,256]         |   0.76+ | D=147 vs M@17=147 (+0)
//  131 |    3898 |   225 |     226.7 | [180,216]         |   0.80+ | D=120 vs M@17=122 (-2)
//  151 |    3381 |   196 |     196.7 | [160,190]         |   0.82+ | D=106 vs M@17=106 (+0)
//  173 |    2951 |   172 |     171.7 | [146,166]         |   0.85+ | D=94 vs M@17=93 (+1)
//  193 |    2646 |   150 |     153.9 | [134,152]         |   0.89+ | D=85 vs M@17=83 (+2)
//  223 |    2290 |   134 |     133.2 | [122,134]         |   0.91+ | D=73 vs M@17=72 (+1)
//  239 |    2137 |   126 |     124.3 | [118,130]         |   0.94+ | D=70 vs M@17=70 (+0)
//  263 |    1942 |   112 |     112.9 | [106,118]         |   0.95+ | D=62 vs M@17=64 (-2)
//  281 |    1817 |   103 |     105.7 | [98,112]          |   0.95+ | D=60 vs M@17=60 (+0)
//  311 |    1642 |    93 |      95.5 | [92,102]          |   0.99+ | D=55 vs M@17=54 (+1)
//  337 |    1515 |    89 |      88.1 | [92,98]           |   1.03+ | D=52 vs M@17=52 (+0)
//  359 |    1423 |    82 |      82.7 | [88,92]           |   1.07+ | D=49 vs M@17=49 (+0)
//  383 |    1333 |    81 |      77.5 | [82,86]           |   1.01+ | D=47 vs M@17=46 (+1)
//  409 |    1249 |    71 |      72.6 | [78,80]           |   1.10+ | D=43 vs M@17=44 (-1)
//  433 |    1180 |    65 |      68.6 | [76,78]           |   1.17+ | D=41 vs M@17=42 (-1)
//  457 |    1118 |    65 |      65.0 | [72,74]           |   1.11+ | D=40 vs M@17=40 (+0)
//  479 |    1066 |    60 |      62.0 | 70 exact          |   1.17+ | D=37 vs M@17=38 (-1)
//  503 |    1015 |    60 |      59.0 | [66,68]           |   1.10+ | D=35 vs M@17=35 (+0)
//  541 |     944 |    56 |      54.9 | 64 exact          |   1.14+ | D=34 vs M@17=34 (+0)
//  569 |     898 |    51 |      52.2 | 62 exact          |   1.22+ | D=34 vs M@17=33 (+1)
//  593 |     861 |    51 |      50.1 | 60 exact          |   1.18+ | D=33 vs M@17=32 (+1)
//  613 |     833 |    47 |      48.5 | 58 exact          |   1.23+ | D=29 vs M@17=31 (-2)
//  641 |     797 |    46 |      46.3 | 56 exact          |   1.22+ | D=30 vs M@17=29 (+1)
//  659 |     775 |    41 |      45.1 | 56 exact          |   1.37+ | D=29 vs M@17=29 (+0)
//  683 |     748 |    42 |      43.5 | 54 exact          |   1.29+ | D=28 vs M@17=28 (+0)
//  691 |     739 |    39 |      43.0 | 54 exact          |   1.38+ | D=27 vs M@17=28 (-1)
//  701 |     729 |    43 |      42.4 | 54 exact          |   1.26+ | D=28 vs M@17=28 (+0)
//  709 |     721 |    42 |      41.9 | 54 exact          |   1.29+ | D=27 vs M@17=28 (-1)
//   DEFINITIVE cap failures (gross > 2·rhoUB): 38 primes [19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,197,211]
//   possible further failures inside bracket (2·rhoLB < gross ≤ 2·rhoUB): 19 primes [193,199,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311]
//   SAFE TAIL q >= 313 (63 primes, L <= 1632): Σgross=3834 Σcap=[4370,4470]  capLB/gross=1.140 capUB/gross=1.166
//   dilation identity gross = c0+c2 verified for all q: true
//   max over q of (dilated-family window max − distance-2 M@17): 4
//   SUMS: census N=14850; Σgross=22132 (1.490·N); Σmean=22183 (1.494·N)
//         Σcap 2rho: LB=17032 (1.147·N)  UB=21092 (1.420·N)
//   survivors (natal points untouched by scour) = 3099;  net kills = 11751;  overlap factor Σgross/net = 1.883
//   TAIL q > W^(1/3)=79.9: Σgross=11252 Σmean=11301 Σcap=[10548,11668]  capLB/gross=0.94  capUB/gross=1.04
//
// --- superdensity: rho*5(L) vs the natal mean it must cap (e^gamma = 1.781) ---
// @13 q= 17: L= 1767 rho=[49,54]  natal mean/window=58.3  ratio=[0.841,0.927]
// @13 q= 19: L= 1581 rho=[46,50]  natal mean/window=52.1  ratio=[0.883,0.959]
// @13 q= 29: L= 1036 rho=[34,35]  natal mean/window=34.2  ratio=[0.995,1.025]
// @13 q= 47: L=  639 rho=[24,24] exact  natal mean/window=21.1  ratio=[1.139,1.139]
// @13 q= 89: L=  338 rho=[15,15] exact  natal mean/window=11.1  ratio=[1.346,1.346]
// @13 q=173: L=  174 rho=[9,9] exact  natal mean/window=5.7  ratio=[1.569,1.569]
// @17 q= 19: L=26869 rho=[398,662]  natal mean/window=781.6  ratio=[0.509,0.847]
// @17 q= 23: L=22197 rho=[347,550]  natal mean/window=645.7  ratio=[0.537,0.852]
// @17 q= 37: L=13798 rho=[233,346]  natal mean/window=401.4  ratio=[0.581,0.862]
// @17 q= 79: L= 6463 rho=[133,169]  natal mean/window=188.0  ratio=[0.707,0.899]
// @17 q=149: L= 3427 rho=[81,97]  natal mean/window=99.7  ratio=[0.813,0.973]
// @17 q=293: L= 1743 rho=[49,54]  natal mean/window=50.7  ratio=[0.966,1.065]
// @17 q=509: L= 1003 rho=[33,33] exact  natal mean/window=29.2  ratio=[1.131,1.131]
// @17 q=709: L=  721 rho=[27,27] exact  natal mean/window=21.0  ratio=[1.287,1.287]
//
// --- exact staircase rho*5(L), L = 1..400 ---
//   k : minimal window w(k) : 2k-tuple diameter w(k)+1
//   1:1(2)  2:7(8)  3:31(32)  4:37(38)  5:61(62)  6:85(86)  7:115(116)  8:127(128)  9:157(158)  10:187(188)  11:211(212)  12:241(242)  13:271(272)  14:301(302)  15:337(338)  16:361(362)  17:391(392)
//   diameters: 2, 8, 32, 38, 62, 86, 116, 128, 158, 188, 212, 242, 272, 302, 338, 362, 392
//
// [23.9s] done.
// ============================================================================
// READINGS (honestly calibrated)
// ============================================================================
// 1. THE CLAIMED UNIVERSAL CAP IS FALSE AT THE HEAD OF THE SCOUR — a
//    refutation, and we can say exactly why. The provable embedding runs the
//    OTHER way: rho*5(L) ≤ M_x(L) for EVERY level x (any natal-admissible S
//    translates into every tile pattern by CRT) — the tiles cap the packing,
//    not the packing the tiles. A length-L window of a level-x pattern
//    satisfies the pair conditions only for p ≤ x; long windows freely
//    violate them for larger p and get DENSER than any fully admissible set.
//    Concretely @13: M13(1767) = 63 > 54 = M23(1767) ≥ rho*5(1767), hence
//    gross(17) = 115 > 108 = 2·rho*5^UB(1767). Definitive failures
//    (gross > 2·rho UB): @13 q ∈ {17,19,23}; @17 all 38 primes q ≤ 211, with
//    19 more possible inside brackets up to q = 311. The head of the scour —
//    where the mass is — cannot be capped by ANY level-independent packing
//    bound: its windows are superdense relative to full admissibility.
// 2. THE FLIP SIDE IS REAL: A TAIL CAP WITH MODEST SLACK. For short windows
//    the tile maxima collapse onto rho*5 and the cap holds. @13, all q ≥ 29:
//    Σgross = 831 vs Σcap = 1028–1030 (24% slack). @17, all q ≥ 313:
//    Σgross = 3834 vs Σcap = 4370–4470 (14–17% slack; per-q 3–38%). Status:
//    provable level-independently once x ≥ 2·M_x(L) (then every maximizing
//    window is automatically fully admissible — pigeonhole); observed to hold
//    from L ≲ 1000–1600 already, i.e. earlier than the guarantee (at @17,
//    L=721, M17=28 > rho*5=27 yet the cap still held — empirical margin, not
//    theorem). This converts the tail of the scour ledger from the 2N/q
//    heuristic into a checkable deterministic bound — the salvageable piece.
// 3. EVEN A PERFECT CAP IS DOOMED BY THE SUMS (killer question, answered).
//    @13: Σgross = 1135 = 1.146·N — the raw strike count itself already
//    exceeds the census; @17: Σgross = 22132 = 1.490·N (and Σmean 2N/q
//    matches Σgross to 0.3% — the 2/q law in aggregate). Since Σ 2/q over
//    (x, √W] ≈ 2·ln(ln√W/ln x) grows with the level, no per-q cap — not
//    rho*5, not even the exact gross(q) itself — can make N − Σ positive.
//    Survival is carried entirely by the OVERLAP CREDIT: Σgross/net-kills =
//    1.662 @13, 1.883 @17 (survivors 307/990, 3099/14850). The packing
//    direction thus independently confirms removal-ledger.js: the hoped
//    "capacity < census" inequality is unfixable; salvation is overlap.
// 4. SUPERDENSITY, MEASURED (the Hensley–Richards analog). rho*5 beats the
//    level-x natal mean by exactly 2.022 as L→0 (skeleton saturation:
//    (2/30)/(|N13|/W13)), passes e^γ ≈ 1.781 near L ≈ 150–200, is ~1.29 at
//    L = 721, crosses 1 at L ≈ 1000–1100, and falls to 0.51–0.85 on the @17
//    head windows. The crossover is the moment full admissibility becomes a
//    harsher constraint than level-x natality — the structural reason for
//    reading 1. So HR-type superdensity inflates the (valid) tail cap by at
//    most ~1.5; the fatal term is reading 3, not superdensity.
// 5. DEFINITION AUDIT (dilation). The identity gross(q) = |q⁻¹N ∩ [0,L)| +
//    |q⁻¹(N+2) ∩ [1,⌊(W+1)/q⌋]| verified exactly for all 154 scour primes at
//    both levels. But dilation sends avoid-{0,p−2} to an avoided pair at
//    distance −2q⁻¹ mod p (skeleton distance 6q⁻¹ mod 30): the dilated
//    patterns live in a strictly larger family than distance-2. Measured
//    effect: dilated window maxima differ from same-level distance-2 maxima
//    by −2..+4 points (worst +4 on ~653, 0.6%). Small — but any future cap
//    lemma must be stated for the general two-avoided-classes family, or
//    carry this slack explicitly; rho*5's distance-2 family undercounts.
// 6. EXACT VALUES — AN APPARENTLY NEW OBJECT. rho*5(L) exact for every
//    L ≤ 400 (branch-and-bound staircase above) and at 83/184 sampled
//    lengths up to L = 960 via lb=ub certificates. Minimal 2k-tuple diameter
//    for k two-class twin pairs, k = 1..17:
//      2, 8, 32, 38, 62, 86, 116, 128, 158, 188, 212, 242, 272, 302, 338,
//      362, 392.
//    NOT in OEIS (value-searched both diameter and window forms; control
//    searches returned hits), and no two-class analog of rho* found in
//    print (see natal-cap-04-packing-notes.md). NB the two-class skeleton
//    is a real restriction: the classical densest 3-twin cluster
//    (11,13,17,19,29,31), diameter 20, is EXCLUDED — 29 is the seam class —
//    so two-class pays 32 where unrestricted twins pay 20. Comparisons with
//    Forbes-style twin-cluster tables must account for this.
// 7. NET VERDICT. As a route to "survivors > 0 at every level", the
//    universal packing cap is dead: killed per-q at the head (reading 1) and
//    in aggregate by the sums (reading 3). What survives and is worth
//    keeping: (i) the embedding lemma rho*5 ≤ M_x for all x — clean and
//    provable; (ii) the deterministic tail cap with 14–24% slack; (iii) the
//    exact rho*5 staircase, an apparently unpublished sequence (moratorium:
//    NOT submitted anywhere). Next step with the best odds: forget capping
//    the head with packings — quantify the overlap credit there (second
//    moment of strike multiplicities), and prove the stabilization threshold
//    M_x(L) = rho*5(L) for x ≥ 2·M_x(L) as the tail lemma it already is.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own run prints (printed value first):
//   1036 -> "1000" and 1632 -> "1600" in reading 2. The run prints the two safe
//   tails as "SAFE TAIL q >= 29 (31 primes, L <= 1036)" at @13 and
//   "SAFE TAIL q >= 313 (63 primes, L <= 1632)" at @17, so "L < ~ 1000-1600" is
//   the pair of tail ceilings quoted to two figures. The 154 candidate rounding
//   of the unrelated 153.9 in the staircase table is a coincidence, not a
//   source; see below.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   154 in reading 5 is the total scour-prime count over both levels: the run
//   prints "scour = 34 primes 17..173" at @13 and "scour = 120 primes 19..709"
//   at @17, and 34 + 120 = 154.
//
// TOKENIZER ARTIFACT, not a figure:
//   11,13,17,19,29,31 in reading 6 is the classical densest three-twin cluster
//   written as a tuple. It is a set of primes quoted from the twin-cluster
//   literature, not a measurement of this run.
// ---------------------------------------------------------------------------
