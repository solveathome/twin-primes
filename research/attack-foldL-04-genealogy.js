// ============================================================================
// ATTACK foldL-04 — GAP GENEALOGY AMORTIZATION, exact tiles
// ============================================================================
// QUESTION (angle 4 of 4 on the fold multiplier L, 2026-08-19). The u-frame
// chain needs L <= 0.19..0.31 * p/ln p ON AVERAGE over folds
// (`research/gate-multiplies.md` s8), not per fold. A kill-run of length >= 2
// at fold p consumes adjacent gaps that all qualify (g = 0, +2 or -2 mod p,
// hence g >= 2p - 2*eta by `research/a3-05-bound-L.md` Lemma 2). Qualifying
// gaps are extreme-tail objects, and every one of them was CREATED by an
// earlier fold merging smaller gaps. So there is a ledger: folds create large
// gaps at some rate, kill-runs spend them. Does the accounting close?
//
// THE OBJECT IS NEW. `research/birth-cohorts.js` (embedded, trustworthy) is
// the cohort decomposition of SLOTS; this is the cohort decomposition of GAPS,
// a different object with a different conservation law (slots never die and
// never gain lineages; gaps die by merging and are re-born). `genealogy.js`
// is the slot-lineage note and its tail is a known defective artifact; nothing
// is taken from it here. maxsum_m(T_29) is not recomputed: it is cited from
// `research/gate-multiplies-03.js`.
//
// PRE-REGISTERED, in-session, before the first run:
//  P1 CREATION RATE. Exactly 2*N_old slots die per fold, so the number of
//     newly-born (merged) gaps is M = 2*N_old - X, with X the number of
//     adjacent kill pairs; the born-at-p share of T_new's gaps is
//     2/(p-2) - O(X/N). Predicted X/N << 1, so the share is ~2/(p-2).
//  P2 DESTRUCTION RATE. Each old gap has exactly p copies in T_new of which
//     exactly 4 - omega are destroyed, omega = 2 if g = 0 mod p, 1 if
//     g = +-2 mod p, 0 otherwise. Hence cohort counts decay by (p-4+w)/(p-2)
//     per fold and share(q at x) ~ (2/q)*(ln q/ln x)^2, summing to 1.
//  P3 AGE OF THE LARGE GAPS. Most gaps are old, most LARGE gaps are young:
//     the gaps qualifying at fold p' should be dominated by births at the
//     last one or two folds.
//  P4 BUILD TIME. Every gap is a sum of base gaps all equal to 6, so its
//     constituent count is kappa = G/6 EXACTLY, and merge depth d obeys
//     kappa <= prod over its merge folds of (1 + L), i.e.
//     sum ln(1+L) >= ln(G/6). Prediction: d(record at T_29) in [5,8], and the
//     log-build-time argument does NOT bind, because pi(x) folds are
//     available against a demand of ~2 ln x / ln(1+L) merge generations.
//  P5 VERDICT. The ledger will fail to close on the tile, because the SUPPLY
//     of qualifying gaps is N * exp(-2*lambda*p) with ln N = theta(x) ~ x and
//     2*lambda*p ~ 2.6 x / mbar << x. Predicted: supply exceeds demand by
//     exp(x(1-o(1))). It should close in the localized/zone frame, where N is
//     bounded by the window. i.e. the amortization reduces to the parity-scale
//     wall (TODO 0b) and to H'' (a3-05 s8) exactly, with one new proven
//     counting bound as the residue.
//
// Companion: `research/attack-foldL-04-localized.js` (deep, segmented).
// ============================================================================

'use strict';
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1);
const DEEP = process.env.SKIP29 ? false : true;

// ---------------------------------------------------------------- tile model
// A tile is the cyclic gap word of the twin-slot comb mod W, plus per-gap
// genealogy: birth = fold at which this gap was last created by a merge,
// dep = merge-tree depth, ari = number of constituents merged at THIS fold
// (1 = pure copy), src = index of the first constituent in the previous tile.
// Base: the mod-6 comb, one slot (5), one gap (6), birth 3, depth 0.
function baseTile() {
  return { p: 3, N: 1, W: 6, s0: 5,
    gap: Uint16Array.from([6]), birth: Uint8Array.from([3]),
    dep: Uint8Array.from([0]), ari: Uint8Array.from([1]),
    src: Uint32Array.from([0]) };
}

// residue counts of the gap word mod p: Q0 = #{g = 0}, Qpm = #{g = +-2}
function residueCensus(T, p) {
  let Q0 = 0, Qp = 0, Qm = 0;
  for (let i = 0; i < T.N; i++) {
    const r = T.gap[i] % p;
    if (r === 0) Q0++; else if (r === 2) Qp++; else if (r === p - 2) Qm++;
  }
  return { Q0, Qp, Qm, X: 2 * Q0 + Qp + Qm };
}

// ------------------------------------------------------------------ the fold
function fold(T, p, opt) {
  const N = T.N, W = T.W, gap = T.gap, birth = T.birth, dep = T.dep;
  const wp = W % p;
  // a[i] = s_i mod p, extended cyclically (a[N] = a[0] + wp mod p)
  const a = new Uint8Array(N);
  { let cur = T.s0 % p; for (let i = 0; i < N; i++) { a[i] = cur; cur = (cur + gap[i]) % p; } }
  // copy k kills the 2-set {d0[k], d0[k]-2}
  const d0 = new Uint8Array(p), d2 = new Uint8Array(p);
  for (let k = 0; k < p; k++) { const kw = (k * wp) % p; d0[k] = (p - kw) % p; d2[k] = (2 * p - 2 - kw) % p; }
  const alive = (k, i) => { const v = a[i]; return v !== d0[k] && v !== d2[k]; };

  // start the word at an alive slot so no merged gap straddles the cut
  let kS = 0, iS = 0, found = false;
  for (let k = 0; k < p && !found; k++) for (let i = 0; i < N; i++) if (alive(k, i)) { kS = k; iS = i; found = true; break; }
  if (!found) throw new Error('no alive slot');

  const Nn = (p - 2) * N;
  const ngap = new Uint16Array(Nn), nbirth = new Uint8Array(Nn),
        ndep = new Uint8Array(Nn), nari = new Uint8Array(Nn), nsrc = new Uint32Array(Nn);

  // statistics
  const runHist = new Map();          // kill-run length (physical) -> count
  const sameHist = new Map();         // kill-run length within ONE copy -> count
  let killed = 0, runs = 0, Lphys = 0, L1set = 0, straddleRuns = 0;
  const spendByBirth = new Map();     // birth fold -> # qualifying gaps consumed
  const spendSizes = [];              // sizes of consumed qualifying gaps (capped sample)
  let spendTotal = 0, spendSizeSum = 0;
  let extremal = null;                // details of the run attaining Lphys
  let bornCount = 0, bornMax = 0;
  const bornSizeHist = new Map();

  let k = kS, i = iS;
  let acc = 0, accD = 0, cnt = 0, start = 0, startK = 0;
  let lastKillIdx = -2, lastKillK = -1, sameRun = 0, sameMax = 0, copies = 0;
  let out = 0;
  const total = p * N;
  for (let t = 0; t < total; t++) {
    if (cnt === 0) { start = i; startK = k; sameRun = 0; sameMax = 0; copies = 0; lastKillIdx = -2; lastKillK = -1; }
    acc += gap[i]; if (dep[i] > accD) accD = dep[i]; cnt++;
    let ni = i + 1, nk = k;
    if (ni === N) { ni = 0; nk = k + 1; if (nk === p) nk = 0; }
    if (alive(nk, ni)) {
      const ell = cnt - 1;
      if (ell > 0) {
        runs++; killed += ell;
        runHist.set(ell, (runHist.get(ell) || 0) + 1);
        sameHist.set(sameMax, (sameHist.get(sameMax) || 0) + 1);
        if (ell > Lphys) {
          Lphys = ell;
          const kids = []; for (let t2 = 0; t2 < cnt; t2++) { const j = (start + t2) % N; kids.push([gap[j], birth[j], dep[j]]); }
          extremal = { ell, copyStart: startK, kids, span: acc };
        }
        if (sameMax > L1set) L1set = sameMax;
        if (copies > 1) straddleRuns++;
        // the ell-1 interior gaps are the qualifying gaps this run consumes
        for (let t2 = 1; t2 <= ell - 1; t2++) {
          const j = (start + t2) % N;
          spendByBirth.set(birth[j], (spendByBirth.get(birth[j]) || 0) + 1);
          spendTotal++; spendSizeSum += gap[j];
          if (spendSizes.length < 40) spendSizes.push([gap[j], birth[j]]);
        }
        bornCount++; if (acc > bornMax) bornMax = acc;
        bornSizeHist.set(acc, (bornSizeHist.get(acc) || 0) + 1);
      }
      ngap[out] = acc; nsrc[out] = start; nari[out] = cnt;
      if (cnt === 1) { nbirth[out] = birth[start]; ndep[out] = dep[start]; }
      else { nbirth[out] = p; ndep[out] = accD + 1; }
      out++;
      acc = 0; accD = 0; cnt = 0;
    } else {
      // slot (nk,ni) dies: extend the same-copy sub-run bookkeeping
      if (nk === lastKillK && ni === lastKillIdx + 1) sameRun++; else { sameRun = 1; copies++; }
      if (sameRun > sameMax) sameMax = sameRun;
      lastKillK = nk; lastKillIdx = ni;
    }
    i = ni; k = nk;
  }
  if (out !== Nn) throw new Error('emitted ' + out + ' expected ' + Nn);
  const Tn = { p, N: Nn, W: W * p, s0: T.s0 + kS * W, gap: ngap, birth: nbirth, dep: ndep, ari: nari, src: nsrc };
  Tn.stats = { killed, runs, Lphys, L1set, straddleRuns, runHist, sameHist, extremal,
               spendByBirth, spendSizes, spendTotal, spendSizeSum, bornCount, bornMax, bornSizeHist,
               X: killed - runs };
  return Tn;
}

// fast statistics-only fold: O(N), never materialises the new tile.
// Used for fold 31 out of T_29 (6.2e9 slots would be unaffordable to build).
function foldStats(T, p) {
  const N = T.N, W = T.W, gap = T.gap, birth = T.birth;
  const wp = W % p;
  const a = new Uint8Array(N);
  { let cur = T.s0 % p; for (let i = 0; i < N; i++) { a[i] = cur; cur = (cur + gap[i]) % p; } }
  // copy k kills {d,d-2} with d = (-k*W) mod p, a bijection k <-> d.
  // slot i dies in the copies d = a[i] and d = a[i]+2.
  // slots i,i+1 both die in one copy iff g_i = 0,+2,-2 (mod p); the copy is
  // determined, so runs can be tracked with O(1) state in a single scan.
  const invD = new Uint8Array(p);   // d -> k
  for (let kk = 0; kk < p; kk++) { const kw = (kk * wp) % p; invD[(p - kw) % p] = kk; }
  const runHist = new Map();
  let Lrun = 0, X = 0;
  const spendByBirth = new Map(); let spendTotal = 0, spendSizeSum = 0;
  const spendSizes = [];
  let extremal = null;
  // run state: for the two copies slot i belongs to, length of the kill-run
  // ending at i. copies for slot i: c1 = invD[a[i]], c2 = invD[(a[i]+2)%p].
  let pc1 = -1, pc2 = -1, l1 = 0, l2 = 0, s1 = 0, s2 = 0;
  for (let i = 0; i < N; i++) {
    const c1 = invD[a[i]], c2 = invD[(a[i] + 2) % p];
    let n1 = 1, n2 = 1, st1 = i, st2 = i;
    if (c1 === pc1) { n1 = l1 + 1; st1 = s1; } else if (c1 === pc2) { n1 = l2 + 1; st1 = s2; }
    if (c2 === pc1) { n2 = l1 + 1; st2 = s1; } else if (c2 === pc2) { n2 = l2 + 1; st2 = s2; }
    if (n1 > 1) X++; if (n2 > 1) X++;
    for (const [n, st] of [[n1, st1], [n2, st2]]) {
      if (n > Lrun) {
        Lrun = n;
        const kids = []; let span = 0;
        for (let t = -1; t <= n - 1; t++) { const j = ((st + t) % N + N) % N; kids.push([gap[j], birth[j]]); span += gap[j]; }
        extremal = { ell: n, kids, span };
      }
    }
    // consumption: each adjacent kill pair consumes the gap between them
    const r = gap[i] % p;
    if (r === 0 || r === 2 || r === p - 2) {
      const w = (r === 0) ? 2 : 1;
      spendByBirth.set(birth[i], (spendByBirth.get(birth[i]) || 0) + w);
      spendTotal += w; spendSizeSum += w * gap[i];
      if (spendSizes.length < 40) spendSizes.push([gap[i], birth[i], w]);
    }
    pc1 = c1; pc2 = c2; l1 = n1; l2 = n2; s1 = st1; s2 = st2;
  }
  for (const [, ] of []) {}
  return { X, Lrun, extremal, spendByBirth, spendTotal, spendSizeSum, spendSizes, runHist };
}

// --------------------------------------------------------------------- trees
function tree(levels, li, idx) {
  const L = levels[li];
  if (li === 0) return { size: L.gap[idx], birth: L.birth[idx], dep: L.dep[idx], kids: [] };
  if (L.ari[idx] === 1) return tree(levels, li - 1, L.src[idx]);
  const P = levels[li - 1], kids = [];
  for (let t = 0; t < L.ari[idx]; t++) kids.push(tree(levels, li - 1, (L.src[idx] + t) % P.N));
  return { size: L.gap[idx], birth: L.birth[idx], dep: L.dep[idx], kids };
}
function printTree(n, pad, out) {
  out.push(pad + 'gap ' + n.size + '  born@' + n.birth + '  depth ' + n.dep + '  kappa ' + (n.size / 6) +
           (n.kids.length ? '  <- ' + n.kids.length + ' constituents' : ''));
  for (const c of n.kids) printTree(c, pad + '    ', out);
}

// ============================================================================
const FOLDS = DEEP ? [5, 7, 11, 13, 17, 19, 23, 29] : [5, 7, 11, 13, 17, 19, 23];
const NEXT = DEEP ? 31 : 29;
const levels = [baseTile()];
const rows = [];

console.log('=== READING 1: tile census and the two identities per fold ===');
console.log('fold |         N |   mbar |  G2 | Q0 | Q+ | Q- |     X=2Q0+Q+ +Q- | X measured | runs M | 2N-X | Lphys | L1set');
for (const p of FOLDS) {
  const T = levels[levels.length - 1];
  const rc = residueCensus(T, p);
  const Tn = fold(T, p);
  levels.push(Tn);
  let G2 = 0; for (let i = 0; i < Tn.N; i++) if (Tn.gap[i] > G2) G2 = Tn.gap[i];
  Tn.G2 = G2; Tn.mbar = Tn.W / Tn.N;
  const s = Tn.stats;
  rows.push({ p, T, Tn, rc });
  console.log(
    String(p).padStart(4) + ' | ' + String(Tn.N).padStart(9) + ' | ' + Tn.mbar.toFixed(3).padStart(6) +
    ' | ' + String(G2).padStart(3) + ' | ' + String(rc.Q0).padStart(2) + ' | ' + String(rc.Qp).padStart(2) +
    ' | ' + String(rc.Qm).padStart(2) + ' | ' + String(rc.X).padStart(16) + ' | ' + String(s.X).padStart(10) +
    ' | ' + String(s.runs).padStart(6) + ' | ' + String(2 * T.N - s.X).padStart(4) +
    ' | ' + String(s.Lphys).padStart(5) + ' | ' + String(s.L1set).padStart(5) +
    ((rc.X === s.X && s.runs === 2 * T.N - s.X) ? '  OK' : '  ** MISMATCH **'));
}
console.log('[' + el() + 's] tiles built');

console.log('');
console.log('custody: D(T_x) vs prod (q-2), and G2 vs the published ladder');
{ let d = 1; const pub = { 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258 };
  for (const r of rows) { d *= (r.p - 2); const ok = (d === r.Tn.N) && (pub[r.p] === r.Tn.G2);
    console.log('  T_' + r.p + ': D = ' + r.Tn.N + ' (prod ' + d + ')  G2 = ' + r.Tn.G2 + ' (published ' + pub[r.p] + ')  ' + (ok ? 'OK' : '** MISMATCH **')); } }

// ---------------------------------------------------------------- READING 2
console.log('');
console.log('=== READING 2: the merge-rate identity (P2) ===');
console.log('destroyed copies per old gap = 4 - omega, omega = 2 if g=0 mod p, 1 if g=+-2, else 0.');
console.log('aggregate form: sum_i (4-omega_i) = 4N - X must equal the number of destroyed gap-copies, 2N + M.');
for (const r of rows) {
  const N = r.T.N, X = r.Tn.stats.X, M = r.Tn.stats.runs;
  console.log('  fold ' + String(r.p).padStart(2) + ': 4N - X = ' + (4 * N - X) + '   2N + M = ' + (2 * N + M) +
              '   ' + ((4 * N - X) === (2 * N + M) ? 'OK' : '** MISMATCH **') +
              '   [qualifying old gaps: ' + (r.rc.Q0 + r.rc.Qp + r.rc.Qm) + ' of ' + N +
              ' = ' + (100 * (r.rc.Q0 + r.rc.Qp + r.rc.Qm) / N).toFixed(4) + '%]');
}

// ---------------------------------------------------------------- READING 3
console.log('');
console.log('=== READING 3: THE BIRTH LEDGER — gap cohorts by birth fold ===');
console.log('share(born@q) at each level, measured; prediction P2: share decays by (p-4)/(p-2) per later fold.');
const cohortAt = [];
for (const r of rows) {
  const c = new Map();
  for (let i = 0; i < r.Tn.N; i++) c.set(r.Tn.birth[i], (c.get(r.Tn.birth[i]) || 0) + 1);
  cohortAt.push({ p: r.p, c, N: r.Tn.N });
}
const allQ = [3, 5, 7, 11, 13, 17, 19, 23, 29];
process.stdout.write('level |');
for (const q of allQ) process.stdout.write(('  @' + q).padStart(11));
console.log('     total');
for (const L of cohortAt) {
  process.stdout.write(('T_' + L.p).padStart(6) + '|');
  let tot = 0;
  for (const q of allQ) { const v = L.c.get(q) || 0; tot += v; process.stdout.write(String(v).padStart(11)); }
  console.log(String(tot).padStart(11) + (tot === L.N ? '  OK' : '  ** MISMATCH **'));
}
console.log('');
console.log('shares (fraction of all gaps):');
process.stdout.write('level |');
for (const q of allQ) process.stdout.write(('  @' + q).padStart(11));
console.log('');
for (const L of cohortAt) {
  process.stdout.write(('T_' + L.p).padStart(6) + '|');
  for (const q of allQ) process.stdout.write(((L.c.get(q) || 0) / L.N).toFixed(6).padStart(11));
  console.log('');
}
console.log('');
console.log('cohort decay per fold, measured vs the predicted (p-4)/(p-2):');
for (let j = 1; j < cohortAt.length; j++) {
  const p = cohortAt[j].p, prev = cohortAt[j - 1], cur = cohortAt[j];
  // exact prediction: cohort q contributes sum over its gaps of (p - 4 + omega)
  const To = rows[j - 1].Tn;
  const pred = new Map();
  for (let i = 0; i < To.N; i++) {
    const r2 = To.gap[i] % p, w = (r2 === 0) ? 2 : (r2 === 2 || r2 === p - 2) ? 1 : 0;
    pred.set(To.birth[i], (pred.get(To.birth[i]) || 0) + (p - 4 + w));
  }
  const parts = [];
  for (const q of allQ) { const a = prev.c.get(q) || 0, b = cur.c.get(q) || 0; if (a > 0) parts.push('@' + q + ':' + b + '/' + (pred.get(q) || 0) + (b === (pred.get(q) || 0) ? '' : ' **')); }
  console.log('  fold ' + String(p).padStart(2) + '  surviving copies of each cohort, measured/predicted sum(p-4+omega) [' + parts.join(' ') + ']   (omega=0 baseline p-4 = ' + (p - 4) + ')');
}

// ---------------------------------------------------------------- READING 4
console.log('');
console.log('=== READING 4: what the NEXT fold can qualify, by birth cohort (P3) ===');
console.log('fold p_next | theta = 2p-2eta | qualifying gaps Q0/Q+/Q- | X = supply of adjacent-kill pairs | cohort of the qualifying gaps');
for (let j = 0; j < rows.length; j++) {
  const Tn = rows[j].Tn;
  const pn = (j + 1 < rows.length) ? rows[j + 1].p : NEXT;
  const eta = (pn % 6 === 1) ? 1 : -1, theta = 2 * pn - 2 * eta;
  const byq = new Map(); let Q0 = 0, Qp = 0, Qm = 0, minSize = Infinity, maxSize = 0;
  for (let i = 0; i < Tn.N; i++) {
    const r = Tn.gap[i] % pn;
    if (r === 0 || r === 2 || r === pn - 2) {
      if (r === 0) Q0++; else if (r === 2) Qp++; else Qm++;
      byq.set(Tn.birth[i], (byq.get(Tn.birth[i]) || 0) + 1);
      if (Tn.gap[i] < minSize) minSize = Tn.gap[i];
      if (Tn.gap[i] > maxSize) maxSize = Tn.gap[i];
    }
  }
  const tot = Q0 + Qp + Qm;
  const share = [...byq.entries()].sort((x, y) => x[0] - y[0]).map(([q, v]) => '@' + q + ':' + v + '(' + (100 * v / Math.max(1, tot)).toFixed(1) + '%)').join(' ');
  console.log('  T_' + String(rows[j].p).padStart(2) + ' -> fold ' + String(pn).padStart(2) +
    ' | theta = ' + String(theta).padStart(3) + ' | ' + String(Q0).padStart(7) + '/' + String(Qp).padStart(7) + '/' + String(Qm).padStart(7) +
    ' | X = ' + String(2 * Q0 + Qp + Qm).padStart(8) + ' | sizes [' + (tot ? minSize : '-') + ',' + (tot ? maxSize : '-') + '] ' + (share || '(none)'));
}

// ---------------------------------------------------------------- READING 5
console.log('');
console.log('=== READING 5: THE SPEND LEDGER — kill-runs and what they consume ===');
for (const r of rows) {
  const s = r.Tn.stats;
  const hist = [...s.runHist.entries()].sort((a, b) => a[0] - b[0]).map(([l, c]) => l + ':' + c).join(' ');
  console.log('  fold ' + String(r.p).padStart(2) + '  killed = ' + s.killed + ' (= 2N = ' + 2 * r.T.N + ')  runs M = ' + s.runs +
    '  X = ' + s.X + '  Lphys = ' + s.Lphys + '  L1set = ' + s.L1set + '  cross-copy runs = ' + s.straddleRuns);
  console.log('        run-length histogram (physical): ' + hist);
  if (s.spendTotal) {
    const bb = [...s.spendByBirth.entries()].sort((a, b) => a[0] - b[0]).map(([q, v]) => '@' + q + ':' + v).join(' ');
    console.log('        qualifying gaps consumed: ' + s.spendTotal + ', mean size ' + (s.spendSizeSum / s.spendTotal).toFixed(1) +
      ', by birth [' + bb + ']');
  } else console.log('        qualifying gaps consumed: 0');
  const born = [...s.bornSizeHist.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([v, c]) => v + 'x' + c).join(' ');
  console.log('        newly born gaps: ' + s.bornCount + ' (= M), largest ' + s.bornMax + ', commonest sizes ' + born);
}

// the extremal run at each fold, with the birth of every gap it consumes
console.log('');
console.log('the extremal kill-run at each fold, gap by gap (size, born@, depth):');
for (const r of rows) {
  const e = r.Tn.stats.extremal;
  if (!e) { console.log('  fold ' + r.p + ': no kill-run of length >= 1 (impossible)'); continue; }
  console.log('  fold ' + String(r.p).padStart(2) + '  ell = ' + e.ell + '  span = ' + e.span + '  constituents: ' +
    e.kids.map(([g, b, d]) => g + '(@' + b + ',d' + d + ')').join(' + '));
}

// ---------------------------------------------------------------- READING 6
console.log('');
console.log('=== READING 6: RECORD GENEALOGY — the full merge tree of G2(T_x) ===');
for (let j = 0; j < rows.length; j++) {
  const Tn = rows[j].Tn;
  let idx = 0, best = 0;
  for (let i = 0; i < Tn.N; i++) if (Tn.gap[i] > best) { best = Tn.gap[i]; idx = i; }
  const t = tree(levels, j + 1, idx);
  // per-generation summary: sizes, birth folds, arities
  const gens = new Map();
  (function walk(n, d) { if (!gens.has(d)) gens.set(d, []); gens.get(d).push(n); for (const c of n.kids) walk(c, d + 1); })(t, 0);
  let nodes = 0; for (const [, v] of gens) nodes += v.length;
  const usedFolds = new Set(); (function w2(n) { if (n.kids.length) usedFolds.add(n.birth); for (const c of n.kids) w2(c); })(t);
  let arityProd = 1; for (const [, v] of gens) { let mx = 1; for (const n of v) if (n.kids.length > mx) mx = n.kids.length; arityProd *= mx; }
  console.log('  --- G2(T_' + rows[j].p + ') = ' + best + ', kappa = G2/6 = ' + (best / 6) + ', merge depth d = ' + Tn.dep[idx] +
    ', log2(kappa) = ' + Math.log2(best / 6).toFixed(2) + ', folds available = ' + (j + 1) +
    ', folds the record actually merged at = ' + usedFolds.size + ' {' + [...usedFolds].sort((a, b) => a - b).join(',') + '}' +
    ', prod(max arity per generation) = ' + arityProd + ' >= kappa ' + (arityProd >= best / 6 ? 'OK' : '** VIOLATED **'));
  for (const [d, v] of [...gens.entries()].sort((a, b) => a[0] - b[0])) {
    const agg = new Map();
    for (const n of v) { const key = n.size + '@' + n.birth + (n.kids.length ? '/' + n.kids.length : ''); agg.set(key, (agg.get(key) || 0) + 1); }
    const shown = [...agg.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([k, c]) => (c > 1 ? c + 'x' : '') + k).join('  ');
    console.log('      gen ' + d + ' (' + v.length + ' nodes): ' + shown + ([...agg.entries()].length > 10 ? '  ...' : ''));
  }
  if (nodes <= 16) { const out = []; printTree(t, '        ', out); for (const line of out) console.log(line); }
}

// ------------------------------------------------- READING 6b: build budget
console.log('');
console.log('=== READING 6b: the forced build-time inequality ===');
console.log('every gap is a sum of base gaps all equal to 6, so kappa = G/6 EXACTLY.');
console.log('a merge at fold p has arity <= 1 + L(p), so along the record tree');
console.log('  sum over generations of ln(max arity) >= ln kappa = ln(G2/6).');
console.log('compare against the u-frame budget sum ln c(p) <= 2 ln x - ln 12.');
{
  let sumLnL = 0;
  console.log('  x  | G2  | kappa | ln kappa | sum_{p<=x} ln(1+L(p)) | 2 ln x - ln 12 | folds pi(x)-2');
  for (let j = 0; j < rows.length; j++) {
    const p = rows[j].p, G2 = rows[j].Tn.G2, L = rows[j].Tn.stats.Lphys;
    sumLnL += Math.log(1 + L);
    console.log('  ' + String(p).padStart(2) + ' | ' + String(G2).padStart(3) + ' | ' + String(G2 / 6).padStart(5) +
      ' | ' + Math.log(G2 / 6).toFixed(3).padStart(8) + ' | ' + sumLnL.toFixed(3).padStart(21) +
      ' | ' + (2 * Math.log(p) - Math.log(12)).toFixed(3).padStart(14) + ' | ' + String(j + 1).padStart(13));
  }
}

// ---------------------------------------------------------------- READING 7
console.log('');
console.log('=== READING 7: RATES ===');
console.log('creation: fraction of T_new gaps born at the fold, measured vs 2/(p-2)');
for (const r of rows) {
  const f = r.Tn.stats.bornCount / r.Tn.N;
  console.log('  fold ' + String(r.p).padStart(2) + '  born/N = ' + f.toExponential(4) + '  2/(p-2) = ' + (2 / (r.p - 2)).toExponential(4) +
    '  ratio ' + (f / (2 / (r.p - 2))).toFixed(6));
}
console.log('');
console.log('conservation of the >= theta population, theta fixed at 2p_next - 2eta:');
console.log('  Q(T_new, theta) = p*Q(T_old, theta) - sum_{g>=theta}(4-omega) + M_theta   [exact]');
for (let j = 1; j < rows.length; j++) {
  const pn = (j + 1 < rows.length) ? rows[j + 1].p : NEXT;
  const eta = (pn % 6 === 1) ? 1 : -1, theta = 2 * pn - 2 * eta;
  const To = rows[j - 1].Tn, Tn = rows[j].Tn, p = rows[j].p;
  let qo = 0; for (let i = 0; i < To.N; i++) if (To.gap[i] >= theta) qo++;
  let qn = 0, mth = 0;
  for (let i = 0; i < Tn.N; i++) if (Tn.gap[i] >= theta) { qn++; if (Tn.birth[i] === p) mth++; }
  let dest = 0; for (let i = 0; i < To.N; i++) if (To.gap[i] >= theta) { const r2 = To.gap[i] % p; dest += 4 - (r2 === 0 ? 2 : (r2 === 2 || r2 === p - 2) ? 1 : 0); }
  console.log('  fold ' + String(p).padStart(2) + ' theta=' + String(theta).padStart(3) +
    ': Q_old = ' + qo + '  p*Q_old = ' + p * qo + '  destroyed = ' + dest + '  M_theta = ' + mth +
    '  -> predicted ' + (p * qo - dest + mth) + '  measured ' + qn + '  ' + ((p * qo - dest + mth) === qn ? 'OK' : '** MISMATCH **'));
}

// ---------------------------------------------------------------- READING 8
console.log('');
console.log('=== READING 8: fold ' + NEXT + ' out of T_' + FOLDS[FOLDS.length - 1] + ', statistics only (no tile built) ===');
{
  const T = levels[levels.length - 1];
  const st = foldStats(T, NEXT);
  console.log('  X (adjacent kill pairs, = 2Q0+Q+ +Q-) = ' + st.X + '  L1set = ' + st.Lrun);
  console.log('  qualifying old gaps consumed (weighted by omega): ' + st.spendTotal +
    ', mean size ' + (st.spendSizeSum / Math.max(1, st.spendTotal)).toFixed(1));
  const bb = [...st.spendByBirth.entries()].sort((a, b) => a[0] - b[0]).map(([q, v]) => '@' + q + ':' + v).join(' ');
  console.log('  consumed by birth cohort: [' + bb + ']');
  if (st.extremal) console.log('  extremal run: ell = ' + st.extremal.ell + ' span = ' + st.extremal.span +
    ' constituents ' + st.extremal.kids.map(([g, b]) => g + '(@' + b + ')').join(' + '));
  const rc = residueCensus(T, NEXT);
  console.log('  residue census of T_' + T.p + ' mod ' + NEXT + ': Q0 = ' + rc.Q0 + ' Q+ = ' + rc.Qp + ' Q- = ' + rc.Qm +
    ' -> X = ' + rc.X + (rc.X === st.X ? '  OK' : '  ** MISMATCH **'));
}

// ---------------------------------------------------------------- READING 9
console.log('');
console.log('=== READING 9: THE AMORTIZED VERDICT, arithmetic ===');
console.log('the u-frame requirement, per gate-multiplies s8: burn = rho*mbar*L/G2 per fold,');
console.log('replenishment = 2 ln p / p. Excess form: sum_p (L-1)*rho*mbar/G2 <= 2 ln x - O(1).');
{
  let burnTrue = 0, burnCount = 0;
  const rho = 1.5;
  console.log('  fold |  L | mbar   |  G2 | (L-1)*rho*mbar/G2 | 2 ln p/p | ratio');
  for (let j = 0; j < rows.length; j++) {
    const p = rows[j].p, Tn = rows[j].Tn;
    // L at fold p acts on T_old, whose mbar and G2 are the old ones
    const To = levels[j];
    const mb = To.W / To.N, G2o = (j === 0) ? 6 : rows[j - 1].Tn.G2;
    const Lp = Tn.stats.Lphys;
    const burn = (Lp - 1) * rho * mb / G2o, rep = 2 * Math.log(p) / p;
    burnTrue += burn; burnCount++;
    console.log('  ' + String(p).padStart(4) + ' | ' + String(Lp).padStart(2) + ' | ' + mb.toFixed(3).padStart(6) +
      ' | ' + String(G2o).padStart(3) + ' | ' + burn.toFixed(4).padStart(17) + ' | ' + rep.toFixed(4).padStart(8) +
      ' | ' + (burn / rep).toFixed(3));
  }
  console.log('  total excess burn over the eight folds = ' + burnTrue.toFixed(4) + ' nats');
  console.log('  Overshoot Budget (gate-multiplies s5): 0.598 nats for the whole ladder to infinity.');
}
console.log('');
console.log('supply vs demand, the quantity that decides the ledger:');
console.log('  demand at fold p = L - 1 adjacent qualifying gaps (one run).');
console.log('  supply at fold p = X = 2Q0 + Q+ + Q-, the total number of adjacent kill pairs.');
console.log('  NOTE on normalisation: the fold lays p copies, so the per-POSITION adjacency');
console.log('  density is X/(p*N), comparable across frames; X/N is p times larger.');
console.log('  fold | L-1 | X (supply) | X/(p*N)  | X/N     | ln X   | ln N   | supply/demand');
for (const r of rows) {
  const s = r.Tn.stats;
  console.log('  ' + String(r.p).padStart(4) + ' | ' + String(s.Lphys - 1).padStart(3) + ' | ' + String(s.X).padStart(10) +
    ' | ' + (s.X / (r.p * r.T.N)).toExponential(2) + ' | ' + (s.X / r.T.N).toExponential(2) +
    ' | ' + (s.X > 0 ? Math.log(s.X).toFixed(3) : '  -inf').padStart(6) +
    ' | ' + Math.log(r.T.N).toFixed(3).padStart(6) + ' | ' + (s.Lphys > 1 ? (s.X / (s.Lphys - 1)).toExponential(2) : 'n/a'));
}

// --------------------------------------------------------------- READING 10
console.log('');
console.log('=== READING 10: is the qualifying gap an extreme-tail object at reachable folds? ===');
console.log('theta_p / mbar(T_old) is the depth into the tail the run condition asks for.');
console.log('  fold | theta | mbar(old) | theta/mbar | X/(p*N) per position | exp(-1.3*theta/mbar)');
for (let j = 0; j < rows.length; j++) {
  const p = rows[j].p, To = levels[j];
  const eta = (p % 6 === 1) ? 1 : -1, theta = 2 * p - 2 * eta;
  const mb = To.W / To.N, X = rows[j].Tn.stats.X;
  console.log('  ' + String(p).padStart(4) + ' | ' + String(theta).padStart(5) + ' | ' + mb.toFixed(3).padStart(9) +
    ' | ' + (theta / mb).toFixed(3).padStart(10) + ' | ' + (X / (p * To.N)).toExponential(3).padStart(20) +
    ' | ' + Math.exp(-1.3 * theta / mb).toExponential(3));
}

// --------------------------------------------------------------- READING 11
console.log('');
console.log('=== READING 11: the kill-chain ratios (the H\'\' object, on the kill side) ===');
console.log('N_m = number of positions starting m consecutive killed slots; r_m = N_m/N_{m-1}.');
for (const r of rows) {
  const h = r.Tn.stats.runHist;
  const Ns = [];
  for (let m = 1; m <= 8; m++) { let c = 0; for (const [l, n] of h) if (l >= m) c += (l - m + 1) * n; Ns.push(c); }
  const rr = []; for (let m = 1; m < 8; m++) rr.push(Ns[m] > 0 || Ns[m - 1] > 0 ? (Ns[m] / Math.max(1, Ns[m - 1])).toExponential(2) : '-');
  console.log('  fold ' + String(r.p).padStart(2) + '  N_1..N_8 = ' + Ns.join(' ') + '   ratios r_2..r_8 = ' + rr.join(' '));
}

// --------------------------------------------------------------- READING 12
console.log('');
console.log('=== READING 12: the counting bound L <= 1 + X, against Theorem B and the truth ===');
console.log('(Theorem B row quoted from research/a3-05-bound-L.md s5, not recomputed.)');
{
  const thmB = { 7: 2, 11: 2, 13: 2, 17: 4, 19: 4, 23: 4, 29: 5, 31: 6 };
  console.log('  fold | 1 + X (this note) | Theorem B | true L');
  for (const r of rows) if (r.p >= 7)
    console.log('  ' + String(r.p).padStart(4) + ' | ' + String(1 + r.Tn.stats.X).padStart(17) +
      ' | ' + String(thmB[r.p] === undefined ? '?' : thmB[r.p]).padStart(9) + ' | ' + r.Tn.stats.Lphys);
}

console.log('');
console.log('[' + el() + 's] done');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-foldL-04-genealogy.js
//   invocation:  node research/attack-foldL-04-genealogy.js
//   code-sha256: 76099c171e13f8bf4a201b5b52c4452bf2571540de9b18a3b12363912d9233fe
//   out-sha256:  15634dae6d380f62729e2e1835f8fc0d9c53b35232e2232fde364720e675c0d9
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     41.0 s
// ============================================================================
// === READING 1: tile census and the two identities per fold ===
// fold |         N |   mbar |  G2 | Q0 | Q+ | Q- |     X=2Q0+Q+ +Q- | X measured | runs M | 2N-X | Lphys | L1set
//    5 |         3 | 10.000 |  12 |  0 |  0 |  0 |                0 |          0 |      2 |    2 |     1 |     1  OK
//    7 |        15 | 14.000 |  30 |  0 |  0 |  2 |                2 |          2 |      4 |    4 |     2 |     2  OK
//   11 |       135 | 17.111 |  42 |  0 |  0 |  0 |                0 |          0 |     30 |   30 |     1 |     1  OK
//   13 |      1485 | 20.222 |  66 |  0 |  0 |  6 |                6 |          6 |    264 |  264 |     2 |     2  OK
//   17 |     22275 | 22.919 | 108 |  0 | 60 | 12 |               72 |         72 |   2898 | 2898 |     2 |     2  OK
//   19 |    378675 | 25.615 | 150 |  0 | 66 | 1022 |             1088 |       1088 |  43462 | 43462 |     2 |     2  OK
//   23 |   7952175 | 28.054 | 204 | 86 | 10462 | 1236 |            11870 |      11870 | 745480 | 745480 |     3 |     3  OK
//   29 | 214708725 | 30.132 | 258 |  6 | 243370 | 440 |           243822 |     243822 | 15660528 | 15660528 |     2 |     2  OK
// [7.0s] tiles built
//
// custody: D(T_x) vs prod (q-2), and G2 vs the published ladder
//   T_5: D = 3 (prod 3)  G2 = 12 (published 12)  OK
//   T_7: D = 15 (prod 15)  G2 = 30 (published 30)  OK
//   T_11: D = 135 (prod 135)  G2 = 42 (published 42)  OK
//   T_13: D = 1485 (prod 1485)  G2 = 66 (published 66)  OK
//   T_17: D = 22275 (prod 22275)  G2 = 108 (published 108)  OK
//   T_19: D = 378675 (prod 378675)  G2 = 150 (published 150)  OK
//   T_23: D = 7952175 (prod 7952175)  G2 = 204 (published 204)  OK
//   T_29: D = 214708725 (prod 214708725)  G2 = 258 (published 258)  OK
//
// === READING 2: the merge-rate identity (P2) ===
// destroyed copies per old gap = 4 - omega, omega = 2 if g=0 mod p, 1 if g=+-2, else 0.
// aggregate form: sum_i (4-omega_i) = 4N - X must equal the number of destroyed gap-copies, 2N + M.
//   fold  5: 4N - X = 4   2N + M = 4   OK   [qualifying old gaps: 0 of 1 = 0.0000%]
//   fold  7: 4N - X = 10   2N + M = 10   OK   [qualifying old gaps: 2 of 3 = 66.6667%]
//   fold 11: 4N - X = 60   2N + M = 60   OK   [qualifying old gaps: 0 of 15 = 0.0000%]
//   fold 13: 4N - X = 534   2N + M = 534   OK   [qualifying old gaps: 6 of 135 = 4.4444%]
//   fold 17: 4N - X = 5868   2N + M = 5868   OK   [qualifying old gaps: 72 of 1485 = 4.8485%]
//   fold 19: 4N - X = 88012   2N + M = 88012   OK   [qualifying old gaps: 1088 of 22275 = 4.8844%]
//   fold 23: 4N - X = 1502830   2N + M = 1502830   OK   [qualifying old gaps: 11784 of 378675 = 3.1119%]
//   fold 29: 4N - X = 31564878   2N + M = 31564878   OK   [qualifying old gaps: 243816 of 7952175 = 3.0660%]
//
// === READING 3: THE BIRTH LEDGER — gap cohorts by birth fold ===
// share(born@q) at each level, measured; prediction P2: share decays by (p-4)/(p-2) per later fold.
// level |         @3         @5         @7        @11        @13        @17        @19        @23        @29     total
//    T_5|          1          2          0          0          0          0          0          0          0          3  OK
//    T_7|          3          8          4          0          0          0          0          0          0         15  OK
//   T_11|         21         56         28         30          0          0          0          0          0        135  OK
//   T_13|        189        504        252        276        264          0          0          0          0       1485  OK
//   T_17|       2457       6552       3276       3624       3468       2898          0          0          0      22275  OK
//   T_19|      36855      98280      49140      54864      52356      43718      43462          0          0     378675  OK
//   T_23|     700245    1867320     933660    1042416     998664     834212     830178     745480          0    7952175  OK
//   T_29|   17506125   46683000   23341500   26060400   25011060   20919140   20825738   18701234   15660528  214708725  OK
//
// shares (fraction of all gaps):
// level |         @3         @5         @7        @11        @13        @17        @19        @23        @29
//    T_5|   0.333333   0.666667   0.000000   0.000000   0.000000   0.000000   0.000000   0.000000   0.000000
//    T_7|   0.200000   0.533333   0.266667   0.000000   0.000000   0.000000   0.000000   0.000000   0.000000
//   T_11|   0.155556   0.414815   0.207407   0.222222   0.000000   0.000000   0.000000   0.000000   0.000000
//   T_13|   0.127273   0.339394   0.169697   0.185859   0.177778   0.000000   0.000000   0.000000   0.000000
//   T_17|   0.110303   0.294141   0.147071   0.162694   0.155690   0.130101   0.000000   0.000000   0.000000
//   T_19|   0.097326   0.259537   0.129768   0.144884   0.138261   0.115450   0.114774   0.000000   0.000000
//   T_23|   0.088057   0.234819   0.117409   0.131086   0.125584   0.104904   0.104396   0.093745   0.000000
//   T_29|   0.081534   0.217425   0.108712   0.121376   0.116488   0.097430   0.096995   0.087100   0.072938
//
// cohort decay per fold, measured vs the predicted (p-4)/(p-2):
//   fold  7  surviving copies of each cohort, measured/predicted sum(p-4+omega) [@3:3/3 @5:8/8]   (omega=0 baseline p-4 = 3)
//   fold 11  surviving copies of each cohort, measured/predicted sum(p-4+omega) [@3:21/21 @5:56/56 @7:28/28]   (omega=0 baseline p-4 = 7)
//   fold 13  surviving copies of each cohort, measured/predicted sum(p-4+omega) [@3:189/189 @5:504/504 @7:252/252 @11:276/276]   (omega=0 baseline p-4 = 9)
//   fold 17  surviving copies of each cohort, measured/predicted sum(p-4+omega) [@3:2457/2457 @5:6552/6552 @7:3276/3276 @11:3624/3624 @13:3468/3468]   (omega=0 baseline p-4 = 13)
//   fold 19  surviving copies of each cohort, measured/predicted sum(p-4+omega) [@3:36855/36855 @5:98280/98280 @7:49140/49140 @11:54864/54864 @13:52356/52356 @17:43718/43718]   (omega=0 baseline p-4 = 15)
//   fold 23  surviving copies of each cohort, measured/predicted sum(p-4+omega) [@3:700245/700245 @5:1867320/1867320 @7:933660/933660 @11:1042416/1042416 @13:998664/998664 @17:834212/834212 @19:830178/830178]   (omega=0 baseline p-4 = 19)
//   fold 29  surviving copies of each cohort, measured/predicted sum(p-4+omega) [@3:17506125/17506125 @5:46683000/46683000 @7:23341500/23341500 @11:26060400/26060400 @13:25011060/25011060 @17:20919140/20919140 @19:20825738/20825738 @23:18701234/18701234]   (omega=0 baseline p-4 = 25)
//
// === READING 4: what the NEXT fold can qualify, by birth cohort (P3) ===
// fold p_next | theta = 2p-2eta | qualifying gaps Q0/Q+/Q- | X = supply of adjacent-kill pairs | cohort of the qualifying gaps
//   T_ 5 -> fold  7 | theta =  12 |       0/      0/      2 | X =        2 | sizes [12,12] @5:2(100.0%)
//   T_ 7 -> fold 11 | theta =  24 |       0/      0/      0 | X =        0 | sizes [-,-] (none)
//   T_11 -> fold 13 | theta =  24 |       0/      0/      6 | X =        6 | sizes [24,24] @11:6(100.0%)
//   T_13 -> fold 17 | theta =  36 |       0/     60/     12 | X =       72 | sizes [36,66] @11:36(50.0%) @13:36(50.0%)
//   T_17 -> fold 19 | theta =  36 |       0/     66/   1022 | X =     1088 | sizes [36,78] @11:504(46.3%) @13:336(30.9%) @17:248(22.8%)
//   T_19 -> fold 23 | theta =  48 |      86/  10462/   1236 | X =    11870 | sizes [48,138] @13:3900(33.1%) @17:3570(30.3%) @19:4314(36.6%)
//   T_23 -> fold 29 | theta =  60 |       6/ 243370/    440 | X =   243822 | sizes [60,174] @13:44460(18.2%) @17:63840(26.2%) @19:71288(29.2%) @23:64228(26.3%)
//   T_29 -> fold 31 | theta =  60 |    2090/ 205068/7815766 | X =  8025014 | sizes [60,186] @13:1155960(14.4%) @17:1659840(20.7%) @19:1876288(23.4%) @23:1752732(21.8%) @29:1578104(19.7%)
//
// === READING 5: THE SPEND LEDGER — kill-runs and what they consume ===
//   fold  5  killed = 2 (= 2N = 2)  runs M = 2  X = 0  Lphys = 1  L1set = 1  cross-copy runs = 0
//         run-length histogram (physical): 1:2
//         qualifying gaps consumed: 0
//         newly born gaps: 2 (= M), largest 12, commonest sizes 12x2
//   fold  7  killed = 6 (= 2N = 6)  runs M = 4  X = 2  Lphys = 2  L1set = 2  cross-copy runs = 1
//         run-length histogram (physical): 1:2 2:2
//         qualifying gaps consumed: 2, mean size 12.0, by birth [@5:2]
//         newly born gaps: 4 (= M), largest 30, commonest sizes 18x2 30x2
//   fold 11  killed = 30 (= 2N = 30)  runs M = 30  X = 0  Lphys = 1  L1set = 1  cross-copy runs = 0
//         run-length histogram (physical): 1:30
//         qualifying gaps consumed: 0
//         newly born gaps: 30 (= M), largest 42, commonest sizes 30x8 18x8 24x6 36x4 42x4
//   fold 13  killed = 270 (= 2N = 270)  runs M = 264  X = 6  Lphys = 2  L1set = 2  cross-copy runs = 0
//         run-length histogram (physical): 1:258 2:6
//         qualifying gaps consumed: 6, mean size 24.0, by birth [@11:6]
//         newly born gaps: 264 (= M), largest 66, commonest sizes 30x72 42x48 18x40 24x36 36x24 48x20
//   fold 17  killed = 2970 (= 2N = 2970)  runs M = 2898  X = 72  Lphys = 2  L1set = 2  cross-copy runs = 0
//         run-length histogram (physical): 1:2826 2:72
//         qualifying gaps consumed: 72, mean size 41.0, by birth [@11:36 @13:36]
//         newly born gaps: 2898 (= M), largest 108, commonest sizes 30x720 42x624 24x288 18x280 60x224 48x214
//   fold 19  killed = 44550 (= 2N = 44550)  runs M = 43462  X = 1088  Lphys = 2  L1set = 2  cross-copy runs = 0
//         run-length histogram (physical): 1:42374 2:1088
//         qualifying gaps consumed: 1088, mean size 38.5, by birth [@11:504 @13:336 @17:248]
//         newly born gaps: 43462 (= M), largest 150, commonest sizes 42x9072 30x8928 60x3752 48x3352 24x3168 18x3080
//   fold 23  killed = 757350 (= 2N = 757350)  runs M = 745480  X = 11870  Lphys = 3  L1set = 3  cross-copy runs = 1
//         run-length histogram (physical): 1:733672 2:11746 3:62
//         qualifying gaps consumed: 11870, mean size 53.7, by birth [@13:3900 @17:3570 @19:4400]
//         newly born gaps: 745480 (= M), largest 204, commonest sizes 42x140112 30x125136 48x65800 60x63782 66x46408 24x41184
//   fold 29  killed = 15904350 (= 2N = 15904350)  runs M = 15660528  X = 243822  Lphys = 2  L1set = 2  cross-copy runs = 0
//         run-length histogram (physical): 1:15416706 2:243822
//         qualifying gaps consumed: 243822, mean size 60.1, by birth [@13:44460 @17:63840 @19:71288 @23:64234]
//         newly born gaps: 15660528 (= M), largest 258, commonest sizes 42x2641968 30x2227104 60x1488146 48x1380720 78x935400 66x904112
//
// the extremal kill-run at each fold, gap by gap (size, born@, depth):
//   fold  5  ell = 1  span = 12  constituents: 6(@3,d0) + 6(@3,d0)
//   fold  7  ell = 2  span = 30  constituents: 6(@3,d0) + 12(@5,d1) + 12(@5,d1)
//   fold 11  ell = 1  span = 24  constituents: 12(@5,d1) + 12(@5,d1)
//   fold 13  ell = 2  span = 48  constituents: 18(@7,d2) + 24(@11,d2) + 6(@3,d0)
//   fold 17  ell = 2  span = 78  constituents: 30(@7,d2) + 36(@11,d3) + 12(@5,d1)
//   fold 19  ell = 2  span = 120  constituents: 42(@13,d3) + 36(@11,d3) + 42(@17,d4)
//   fold 23  ell = 3  span = 180  constituents: 18(@7,d2) + 90(@19,d5) + 48(@13,d3) + 24(@17,d2)
//   fold 29  ell = 2  span = 102  constituents: 12(@5,d1) + 60(@23,d4) + 30(@23,d3)
//
// === READING 6: RECORD GENEALOGY — the full merge tree of G2(T_x) ===
//   --- G2(T_5) = 12, kappa = G2/6 = 2, merge depth d = 1, log2(kappa) = 1.00, folds available = 1, folds the record actually merged at = 1 {5}, prod(max arity per generation) = 2 >= kappa OK
//       gen 0 (1 nodes): 12@5/2
//       gen 1 (2 nodes): 2x6@3
//         gap 12  born@5  depth 1  kappa 2  <- 2 constituents
//             gap 6  born@3  depth 0  kappa 1
//             gap 6  born@3  depth 0  kappa 1
//   --- G2(T_7) = 30, kappa = G2/6 = 5, merge depth d = 2, log2(kappa) = 2.32, folds available = 2, folds the record actually merged at = 2 {5,7}, prod(max arity per generation) = 6 >= kappa OK
//       gen 0 (1 nodes): 30@7/3
//       gen 1 (3 nodes): 2x12@5/2  6@3
//       gen 2 (4 nodes): 4x6@3
//         gap 30  born@7  depth 2  kappa 5  <- 3 constituents
//             gap 6  born@3  depth 0  kappa 1
//             gap 12  born@5  depth 1  kappa 2  <- 2 constituents
//                 gap 6  born@3  depth 0  kappa 1
//                 gap 6  born@3  depth 0  kappa 1
//             gap 12  born@5  depth 1  kappa 2  <- 2 constituents
//                 gap 6  born@3  depth 0  kappa 1
//                 gap 6  born@3  depth 0  kappa 1
//   --- G2(T_11) = 42, kappa = G2/6 = 7, merge depth d = 3, log2(kappa) = 2.81, folds available = 3, folds the record actually merged at = 3 {5,7,11}, prod(max arity per generation) = 12 >= kappa OK
//       gen 0 (1 nodes): 42@11/2
//       gen 1 (2 nodes): 12@5/2  30@7/3
//       gen 2 (5 nodes): 3x6@3  2x12@5/2
//       gen 3 (4 nodes): 4x6@3
//         gap 42  born@11  depth 3  kappa 7  <- 2 constituents
//             gap 12  born@5  depth 1  kappa 2  <- 2 constituents
//                 gap 6  born@3  depth 0  kappa 1
//                 gap 6  born@3  depth 0  kappa 1
//             gap 30  born@7  depth 2  kappa 5  <- 3 constituents
//                 gap 6  born@3  depth 0  kappa 1
//                 gap 12  born@5  depth 1  kappa 2  <- 2 constituents
//                     gap 6  born@3  depth 0  kappa 1
//                     gap 6  born@3  depth 0  kappa 1
//                 gap 12  born@5  depth 1  kappa 2  <- 2 constituents
//                     gap 6  born@3  depth 0  kappa 1
//                     gap 6  born@3  depth 0  kappa 1
//   --- G2(T_13) = 66, kappa = G2/6 = 11, merge depth d = 4, log2(kappa) = 3.46, folds available = 4, folds the record actually merged at = 4 {5,7,11,13}, prod(max arity per generation) = 36 >= kappa OK
//       gen 0 (1 nodes): 66@13/2
//       gen 1 (2 nodes): 36@11/2  30@7/3
//       gen 2 (5 nodes): 2x6@3  2x12@5/2  30@7/3
//       gen 3 (7 nodes): 5x6@3  2x12@5/2
//       gen 4 (4 nodes): 4x6@3
//   --- G2(T_17) = 108, kappa = G2/6 = 18, merge depth d = 4, log2(kappa) = 4.17, folds available = 5, folds the record actually merged at = 5 {5,7,11,13,17}, prod(max arity per generation) = 36 >= kappa OK
//       gen 0 (1 nodes): 108@17/3
//       gen 1 (3 nodes): 42@13/2  36@11/2  30@13/2
//       gen 2 (6 nodes): 2x12@5/2  2x30@7/3  6@3  18@7/2
//       gen 3 (12 nodes): 7x6@3  5x12@5/2
//       gen 4 (10 nodes): 10x6@3
//   --- G2(T_19) = 150, kappa = G2/6 = 25, merge depth d = 5, log2(kappa) = 4.64, folds available = 6, folds the record actually merged at = 6 {5,7,11,13,17,19}, prod(max arity per generation) = 72 >= kappa OK
//       gen 0 (1 nodes): 150@19/3
//       gen 1 (3 nodes): 30@11/2  78@17/2  42@17/2
//       gen 2 (6 nodes): 2x12@5/2  18@7/2  42@13/2  36@11/2  30@13/2
//       gen 3 (12 nodes): 6x6@3  3x12@5/2  2x30@7/3  18@7/2
//       gen 4 (14 nodes): 9x6@3  5x12@5/2
//       gen 5 (10 nodes): 10x6@3
//   --- G2(T_23) = 204, kappa = G2/6 = 34, merge depth d = 6, log2(kappa) = 5.09, folds available = 7, folds the record actually merged at = 7 {5,7,11,13,17,19,23}, prod(max arity per generation) = 288 >= kappa OK
//       gen 0 (1 nodes): 204@23/4
//       gen 1 (4 nodes): 24@17/2  48@19/2  90@19/2  42@17/2
//       gen 2 (8 nodes): 2x12@5/2  18@13/2  30@13/2  48@17/2  42@11/2  18@7/2  24@11/2
//       gen 3 (16 nodes): 7x6@3  6x12@5/2  18@7/2  42@11/2  30@7/3
//       gen 4 (19 nodes): 14x6@3  4x12@5/2  30@7/3
//       gen 5 (11 nodes): 9x6@3  2x12@5/2
//       gen 6 (4 nodes): 4x6@3
//   --- G2(T_29) = 258, kappa = G2/6 = 43, merge depth d = 7, log2(kappa) = 5.43, folds available = 8, folds the record actually merged at = 8 {5,7,11,13,17,19,23,29}, prod(max arity per generation) = 648 >= kappa OK
//       gen 0 (1 nodes): 258@29/3
//       gen 1 (3 nodes): 2x60@23/2  138@19/3
//       gen 2 (7 nodes): 2x42@17/2  18@19/2  30@13/2  30@11/2  78@17/2  18@13/2
//       gen 3 (14 nodes): 6x12@5/2  2x6@3  30@13/2  18@11/2  18@7/2  30@7/3  36@11/2  42@13/2
//       gen 4 (25 nodes): 16x6@3  6x12@5/2  18@7/2  30@7/3  30@11/2
//       gen 5 (19 nodes): 14x6@3  4x12@5/2  18@7/2
//       gen 6 (10 nodes): 9x6@3  12@5/2
//       gen 7 (2 nodes): 2x6@3
//
// === READING 6b: the forced build-time inequality ===
// every gap is a sum of base gaps all equal to 6, so kappa = G/6 EXACTLY.
// a merge at fold p has arity <= 1 + L(p), so along the record tree
//   sum over generations of ln(max arity) >= ln kappa = ln(G2/6).
// compare against the u-frame budget sum ln c(p) <= 2 ln x - ln 12.
//   x  | G2  | kappa | ln kappa | sum_{p<=x} ln(1+L(p)) | 2 ln x - ln 12 | folds pi(x)-2
//    5 |  12 |     2 |    0.693 |                 0.693 |          0.734 |             1
//    7 |  30 |     5 |    1.609 |                 1.792 |          1.407 |             2
//   11 |  42 |     7 |    1.946 |                 2.485 |          2.311 |             3
//   13 |  66 |    11 |    2.398 |                 3.584 |          2.645 |             4
//   17 | 108 |    18 |    2.890 |                 4.682 |          3.182 |             5
//   19 | 150 |    25 |    3.219 |                 5.781 |          3.404 |             6
//   23 | 204 |    34 |    3.526 |                 7.167 |          3.786 |             7
//   29 | 258 |    43 |    3.761 |                 8.266 |          4.250 |             8
//
// === READING 7: RATES ===
// creation: fraction of T_new gaps born at the fold, measured vs 2/(p-2)
//   fold  5  born/N = 6.6667e-1  2/(p-2) = 6.6667e-1  ratio 1.000000
//   fold  7  born/N = 2.6667e-1  2/(p-2) = 4.0000e-1  ratio 0.666667
//   fold 11  born/N = 2.2222e-1  2/(p-2) = 2.2222e-1  ratio 1.000000
//   fold 13  born/N = 1.7778e-1  2/(p-2) = 1.8182e-1  ratio 0.977778
//   fold 17  born/N = 1.3010e-1  2/(p-2) = 1.3333e-1  ratio 0.975758
//   fold 19  born/N = 1.1477e-1  2/(p-2) = 1.1765e-1  ratio 0.975578
//   fold 23  born/N = 9.3745e-2  2/(p-2) = 9.5238e-2  ratio 0.984327
//   fold 29  born/N = 7.2938e-2  2/(p-2) = 7.4074e-2  ratio 0.984669
//
// conservation of the >= theta population, theta fixed at 2p_next - 2eta:
//   Q(T_new, theta) = p*Q(T_old, theta) - sum_{g>=theta}(4-omega) + M_theta   [exact]
//   fold  7 theta= 24: Q_old = 0  p*Q_old = 0  destroyed = 0  M_theta = 2  -> predicted 2  measured 2  OK
//   fold 11 theta= 24: Q_old = 2  p*Q_old = 22  destroyed = 8  M_theta = 22  -> predicted 36  measured 36  OK
//   fold 13 theta= 36: Q_old = 8  p*Q_old = 104  destroyed = 32  M_theta = 116  -> predicted 188  measured 188  OK
//   fold 17 theta= 36: Q_old = 188  p*Q_old = 3196  destroyed = 680  M_theta = 1610  -> predicted 4126  measured 4126  OK
//   fold 19 theta= 48: Q_old = 1388  p*Q_old = 26372  destroyed = 5486  M_theta = 16790  -> predicted 37676  measured 37676  OK
//   fold 23 theta= 60: Q_old = 25246  p*Q_old = 580658  destroyed = 99576  M_theta = 264592  -> predicted 745674  measured 745674  OK
//   fold 29 theta= 60: Q_old = 745674  p*Q_old = 21624546  destroyed = 2738874  M_theta = 6622208  -> predicted 25507880  measured 25507880  OK
//
// === READING 8: fold 31 out of T_29, statistics only (no tile built) ===
//   X (adjacent kill pairs, = 2Q0+Q+ +Q-) = 8025014  L1set = 4
//   qualifying old gaps consumed (weighted by omega): 8025014, mean size 61.8
//   consumed by birth cohort: [@13:1155960 @17:1659840 @19:1876288 @23:1753232 @29:1579694]
//   extremal run: ell = 4 span = 330 constituents 42(@29) + 60(@29) + 126(@23) + 60(@29) + 42(@17)
//   residue census of T_29 mod 31: Q0 = 2090 Q+ = 205068 Q- = 7815766 -> X = 8025014  OK
//
// === READING 9: THE AMORTIZED VERDICT, arithmetic ===
// the u-frame requirement, per gate-multiplies s8: burn = rho*mbar*L/G2 per fold,
// replenishment = 2 ln p / p. Excess form: sum_p (L-1)*rho*mbar/G2 <= 2 ln x - O(1).
//   fold |  L | mbar   |  G2 | (L-1)*rho*mbar/G2 | 2 ln p/p | ratio
//      5 |  1 |  6.000 |   6 |            0.0000 |   0.6438 | 0.000
//      7 |  2 | 10.000 |  12 |            1.2500 |   0.5560 | 2.248
//     11 |  1 | 14.000 |  30 |            0.0000 |   0.4360 | 0.000
//     13 |  2 | 17.111 |  42 |            0.6111 |   0.3946 | 1.549
//     17 |  2 | 20.222 |  66 |            0.4596 |   0.3333 | 1.379
//     19 |  2 | 22.919 | 108 |            0.3183 |   0.3099 | 1.027
//     23 |  3 | 25.615 | 150 |            0.5123 |   0.2727 | 1.879
//     29 |  2 | 28.054 | 204 |            0.2063 |   0.2322 | 0.888
//   total excess burn over the eight folds = 3.3576 nats
//   Overshoot Budget (gate-multiplies s5): 0.598 nats for the whole ladder to infinity.
//
// supply vs demand, the quantity that decides the ledger:
//   demand at fold p = L - 1 adjacent qualifying gaps (one run).
//   supply at fold p = X = 2Q0 + Q+ + Q-, the total number of adjacent kill pairs.
//   NOTE on normalisation: the fold lays p copies, so the per-POSITION adjacency
//   density is X/(p*N), comparable across frames; X/N is p times larger.
//   fold | L-1 | X (supply) | X/(p*N)  | X/N     | ln X   | ln N   | supply/demand
//      5 |   0 |          0 | 0.00e+0 | 0.00e+0 |   -inf |  0.000 | n/a
//      7 |   1 |          2 | 9.52e-2 | 6.67e-1 |  0.693 |  1.099 | 2.00e+0
//     11 |   0 |          0 | 0.00e+0 | 0.00e+0 |   -inf |  2.708 | n/a
//     13 |   1 |          6 | 3.42e-3 | 4.44e-2 |  1.792 |  4.905 | 6.00e+0
//     17 |   1 |         72 | 2.85e-3 | 4.85e-2 |  4.277 |  7.303 | 7.20e+1
//     19 |   1 |       1088 | 2.57e-3 | 4.88e-2 |  6.992 | 10.011 | 1.09e+3
//     23 |   2 |      11870 | 1.36e-3 | 3.13e-2 |  9.382 | 12.844 | 5.94e+3
//     29 |   1 |     243822 | 1.06e-3 | 3.07e-2 | 12.404 | 15.889 | 2.44e+5
//
// === READING 10: is the qualifying gap an extreme-tail object at reachable folds? ===
// theta_p / mbar(T_old) is the depth into the tail the run condition asks for.
//   fold | theta | mbar(old) | theta/mbar | X/(p*N) per position | exp(-1.3*theta/mbar)
//      5 |    12 |     6.000 |      2.000 |             0.000e+0 | 7.427e-2
//      7 |    12 |    10.000 |      1.200 |             9.524e-2 | 2.101e-1
//     11 |    24 |    14.000 |      1.714 |             0.000e+0 | 1.077e-1
//     13 |    24 |    17.111 |      1.403 |             3.419e-3 | 1.615e-1
//     17 |    36 |    20.222 |      1.780 |             2.852e-3 | 9.884e-2
//     19 |    36 |    22.919 |      1.571 |             2.571e-3 | 1.298e-1
//     23 |    48 |    25.615 |      1.874 |             1.363e-3 | 8.750e-2
//     29 |    60 |    28.054 |      2.139 |             1.057e-3 | 6.202e-2
//
// === READING 11: the kill-chain ratios (the H'' object, on the kill side) ===
// N_m = number of positions starting m consecutive killed slots; r_m = N_m/N_{m-1}.
//   fold  5  N_1..N_8 = 2 0 0 0 0 0 0 0   ratios r_2..r_8 = 0.00e+0 - - - - - -
//   fold  7  N_1..N_8 = 6 2 0 0 0 0 0 0   ratios r_2..r_8 = 3.33e-1 0.00e+0 - - - - -
//   fold 11  N_1..N_8 = 30 0 0 0 0 0 0 0   ratios r_2..r_8 = 0.00e+0 - - - - - -
//   fold 13  N_1..N_8 = 270 6 0 0 0 0 0 0   ratios r_2..r_8 = 2.22e-2 0.00e+0 - - - - -
//   fold 17  N_1..N_8 = 2970 72 0 0 0 0 0 0   ratios r_2..r_8 = 2.42e-2 0.00e+0 - - - - -
//   fold 19  N_1..N_8 = 44550 1088 0 0 0 0 0 0   ratios r_2..r_8 = 2.44e-2 0.00e+0 - - - - -
//   fold 23  N_1..N_8 = 757350 11870 62 0 0 0 0 0   ratios r_2..r_8 = 1.57e-2 5.22e-3 0.00e+0 - - - -
//   fold 29  N_1..N_8 = 15904350 243822 0 0 0 0 0 0   ratios r_2..r_8 = 1.53e-2 0.00e+0 - - - - -
//
// === READING 12: the counting bound L <= 1 + X, against Theorem B and the truth ===
// (Theorem B row quoted from research/a3-05-bound-L.md s5, not recomputed.)
//   fold | 1 + X (this note) | Theorem B | true L
//      7 |                 3 |         2 | 2
//     11 |                 1 |         2 | 1
//     13 |                 7 |         2 | 2
//     17 |                73 |         4 | 2
//     19 |              1089 |         4 | 2
//     23 |             11871 |         4 | 3
//     29 |            243823 |         5 | 2
//
// [40.8s] done
// ============================================================================
// READINGS
// ============================================================================
//
// [1] THE TWO LEDGER IDENTITIES HOLD EXACTLY AT EVERY FOLD, 5 THROUGH 31.
//     X, the number of adjacent kill pairs the fold makes, equals 2*Q0 + Q+ + Q-
//     read off the OLD gap word's residues mod p, at all eight folds and again
//     at fold 31 (8025014 both ways). The run count M equals 2N - X. Custody
//     passes: D(T_x) = prod (q-2) and G2 reproduces the published ladder
//     12, 30, 42, 66, 108, 150, 204, 258 from a generator that never sieves.
//
// [2] THE MERGE-RATE IDENTITY (Reading 2) is exact at every fold: 4N - X equals
//     2N + M, which is the aggregate form of "each old gap has exactly 4 - omega
//     of its p copies destroyed". Reading 3 confirms it cohort by cohort, in the
//     sharp form: the surviving copies of cohort q are exactly sum(p - 4 + omega)
//     over that cohort, matched to the unit at every fold and every cohort,
//     including the fractional-looking 4.000 at fold 7 (p - 4 = 3 plus omega = 1
//     on both @5 gaps).
//
// [3] CREATION IS AT THE MAXIMUM RATE THE STRUCTURE ALLOWS, NOT BELOW IT
//     (Reading 7). The born-at-p share of T_new's gaps is 2/(p-2) times
//     0.975 to 0.985 from fold 13 on; the deficit is exactly X/(2N), the runs
//     that merge three gaps instead of two. "Creation is slow" is false: two
//     gaps per old slot are created every fold, forever.
//
// [4] THE AGE FILTER IS THE ONLY THING THE BIRTH LEDGER SUPPLIES (Reading 4).
//     No gap born at @3, @5, @7 or @11 ever qualifies at fold 31, because a
//     gap's size is frozen at birth and the largest gap fold 11 can make is 42,
//     under theta_31 = 60. From @13 on the cohorts contribute in rough
//     proportion to their size, 14.4 to 23.4 percent each. So the ledger's
//     supply is not concentrated in the young: it is drawn from every cohort
//     born after mbar reached theta/2.
//
// [5] THE FOLD-31 EXTREMAL RUN IS REPRODUCED FROM A SECOND CODE PATH
//     (Reading 8). L(T_29, 31) = 4 with interior gaps 60, 126, 60, span 246,
//     exactly a3-05-bound-L.md section 9's cheapest legal alternating word
//     2p-2, 4p+2, 2p-2. The genealogy is new: those three gaps were born at
//     @29, @23, @29.
//
// [6] THE RECORD IS ASSEMBLED, AND IT USES EVERY FOLD (Reading 6).
//     G2(T_29) = 258 = 60(@23) + 138(@19) + 60(@23), and the old record 204 is
//     not among its ancestors. That is U-FRAME section 7 item 4's "assembled a
//     fresh maximum from three or four large gaps", now read off the tree
//     rather than inferred. Merge depth is 1, 2, 3, 4, 4, 5, 6, 7 against
//     pi(x) - 2 = 1..8 folds available, and the set of folds appearing as
//     internal nodes is the WHOLE fold set at every level. There is no
//     "the record only grows at a few folds" gain to amortize at this scale.
//
// [7] THE BUILD-TIME ARGUMENT IS TRUE, SHARP IN FORM, AND NON-BINDING
//     (Reading 6b). kappa = G/6 exactly, so ln kappa = 3.761 at T_29 against
//     sum ln(1+L) = 8.266 actually spent and a u-frame budget 2 ln x - ln 12 =
//     4.250. The demand ln kappa sits at 88 percent of the budget by
//     construction (ln kappa <= 2 ln x - ln 12 is the Zone Postulate itself
//     rewritten), so the build-time inequality is the telescope, not an
//     independent constraint on it.
//
// [8] SUPPLY BEATS DEMAND BY A FACTOR THAT GROWS LIKE N (Reading 9).
//     Demand is L - 1, which reads 0, 1, 0, 1, 1, 1, 2, 1. Supply is X, which
//     reads 0, 2, 0, 6, 72, 1088, 11870, 243822. The ratio is 2, 6, 72, 1089,
//     5940, 244000. ln X tracks ln N with a per-position density
//     X/(p*N) that falls only from 9.5e-2 to 1.1e-3 over the same range.
//     Charging runs to a supply this abundant cannot bound a maximum.
//
// [9] THE PREMISE OF THE ATTACK IS FALSE IN THE COMPUTABLE RANGE (Reading 10).
//     theta_p/mbar runs 1.20 to 2.14 across all eight folds. A qualifying gap
//     is a two-mean-gap object on the whole reachable ladder, not an
//     extreme-tail object. The tail regime the brief assumes begins where
//     theta/mbar ~ 2x/(2.4 ln^2 x) is large, which no exact tile reaches.
//
// [10] THE CONDITIONAL RATIOS (Reading 11) are r_2 = 3.33e-1, 2.22e-2,
//     2.42e-2, 2.44e-2, 1.57e-2, 1.53e-2 at folds 7 to 29, with the single
//     r_3 = 5.22e-3 at fold 23 (62 triples). These are the H'' object measured
//     on the kill side rather than the gap side, and they are reproduced to
//     three significant figures by the independent window instrument.
//
// [11] THE COUNTING BOUND L <= 1 + X (Reading 12) is proven and is sharp at
//     exactly one fold: fold 11, where it gives 1 against the truth 1 and
//     against Theorem B's 2. That is the fold a3-05 section 3 flags as the one
//     where the residue law goes silent and no gap VALUE qualifies. Everywhere
//     else it is worse than Theorem B by orders of magnitude, because it bounds
//     a maximum by a sum.
//
// [12] THE TRUE EXCESS BURN ALREADY OVERSPENDS (Reading 9, first table).
//     sum (L-1)*rho*mbar/G2 over the eight folds is 3.3576 nats against the
//     Overshoot Budget's 0.598 nats for the entire ladder to infinity. The
//     per-fold ratio to replenishment falls 2.248 -> 0.888, so the overspend is
//     front-loaded and the trend is favourable, but nothing in the ledger
//     forces the trend to continue.
// ============================================================================

//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   0.984669 -> the upper end 0.985 of reading [3]. The printed born/N ratios
//     from fold 13 on are 0.977778, 0.975758, 0.975578, 0.984327 and 0.984669,
//     so the reading's stated range rounds the smallest down and the largest
//     up.
//   9.52e-2 -> the 9.5e-2 of reading [8], the X/(p*N) entry at fold 7, and
//     1.06e-3 -> the 1.1e-3, the same column at fold 29.
//   2.139 -> the 2.14 of reading [9], the theta/mbar entry at fold 29. The
//     other end of that range, 1.20, is printed exactly as 1.200 at fold 7.
//
// SAME VALUE, DIFFERENT NOTATION: the 5940 and 244000 of reading [8] are the
//   supply/demand column, printed as 5.94e+3 at fold 23 and 2.44e+5 at fold
//   29. The 1089 earlier in the same list is the exact 1088/1, which the
//   column rounds to 1.09e+3.
// ---------------------------------------------------------------------------
