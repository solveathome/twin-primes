// ============================================================================
// IMPORT B-FREE 01 — THE TWIN COMB IN B-FREE / TOEPLITZ COORDINATES
// ============================================================================
// FOREIGN-IMPORT ATTACK 5: the ergodic theory of B-free systems (Sarnak's
// programme: Mirsky measures, Toeplitz structure, tautness, heredity, entropy)
// applied to the twin comb. This script computes the four things the dictionary
// needs to be checked against, and nothing else. It proves nothing on its own;
// it supplies the exact numbers that the staging note
// `research/history/staging/import-bfree.md` reasons over.
//
// THE OBJECT. At level x the comb is
//        C_x = { n : p does not divide n(n+2) for every prime p <= x },
// a periodic subset of Z of period x# and density prod_{p<=x} (1 - 2/p) for
// p >= 3 times 1/2 at p = 2. This is the tile's twin-slot set. In B-free
// language it is the "window set" of the profinite window
//        W_x = prod_{p<=x} ( Z/pZ \ {0, -2} )  subset of  prod_{p<=x} Z/pZ,
// and the limit object is the weak model set with window W = prod_{all p}.
//
// FOUR STAGES.
//
// STAGE A — THE LIMIT WINDOW IS NULL, VERIFIED. The B-free dynamics literature
// runs on Erdos B (pairwise coprime, sum 1/b < infinity), which makes the
// B-free set have positive density and the Mirsky measure a genuine measure.
// Ours has sum 2/p = infinity by Mertens. Stage A verifies by brute force what
// the two-line argument says: the limit comb C_infinity is the single point
// {-1}, so the limit sequence eta is one 1 in an ocean of 0s, is NOT a Toeplitz
// sequence, and generates a subshift of entropy 0 whose only invariant measure
// is the point mass at 0^infinity. Anything the ergodic theory says about the
// limit is therefore vacuous, and the whole import has to live at finite level.
//
// STAGE B — WORD COMPLEXITY OF THE LEVEL-x COMB, AND ITS SATURATION LENGTH.
// The level-x comb is a periodic point, so its orbit closure is one finite
// cycle: topological entropy 0, and the complexity function p_x(n) (number of
// distinct binary words of length n occurring in the comb) is nondecreasing and
// saturates at x# — the full period — from some length R_x onward. R_x is the
// "recognizability radius" of the tile: the shortest window that determines the
// position modulo x#. Two elementary facts tie it to the corpus's own object:
//   (i)  a record gap G_2 contains 0^{G_2 - 1}, hence contains 0^{G_2 - 2} at
//        two distinct positions, so R_x >= G_2 - 1;
//   (ii) so any upper bound on R_x is an upper bound on G_2 + 1, and
//        R_x < x'^2 - 3 implies the Zone Postulate at x.
// The measurement here is how much bigger than G_2 the recognizability radius
// actually is, which prices route (ii) exactly.
//
// ALGORITHM. Classical rank-refinement over the cyclic word. cls[i] is the
// class of position i under "equal length-n window"; the number of classes is
// p_x(n). One refinement step appends a single BIT (the symbol at offset n), so
// each class splits into at most two, and a step is one stable two-bucket pass
// over the positions in class order: O(N) per step, no sorting and no hashing.
// Runs until every class is a singleton, which is n = R_x.
//
// STAGE C — MIRSKY IS EXACT ON POSITIVE CYLINDERS AND ABSENT ON NEGATIVE ONES.
// The Mirsky measure of a B-free system is the push-forward of Haar measure on
// the odometer. Here that is exactly the CRT product measure the corpus already
// uses. Stage C checks the two halves of that separately:
//   (C1) for a POSITIVE pattern (a finite set D of offsets, all required to be
//        comb members) the count in one period is exactly
//        prod_{p<=x} ( p - #{ -d, -d-2 : d in D } mod p ), an identity, so the
//        Mirsky prediction is not an approximation and carries no error term;
//   (C2) for a MIXED pattern (some offsets required NOT to be comb members) no
//        product formula exists: "not a member" is a union over p, so the exact
//        evaluation is an inclusion-exclusion with 3^{pi(x)} terms — the same
//        ceiling `discrepancy-two-class.md` already carries. Stage C measures
//        the error of the naive independence prediction on such patterns.
// Gaps are negative events. That is the whole reason the import buys limits and
// not rates.
//
// STAGE D — THE ENTROPY COORDINATES. Prints (a) the level-x comb density, which
// is the B-free "hereditary closure" entropy divided by log 2, together with
// its limit 0; (b) the nondegenerate two-class cousin that the B-free theory
// DOES cover, the squarefree values of n(n+2), whose density is computed to
// high accuracy with an explicit tail bound; (c) the finite-level complexity
// entropies max_n log p_x(n) / n, which is the only nonzero entropy-like number
// the finite comb has.
//
// REPRODUCTION.
//   node research/import-bfree-01-toeplitz.js            # levels 3..17, ~1 min
//   BIG=1 node research/import-bfree-01-toeplitz.js      # adds level 19
// ============================================================================

'use strict';

const BIG = !!process.env.BIG;

function primesUpTo(n) {
  const s = new Uint8Array(n + 1);
  const out = [];
  for (let i = 2; i <= n; i++) {
    if (!s[i]) { out.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; }
  }
  return out;
}

// ---------------------------------------------------------------------------
// STAGE A — the limit window is null
// ---------------------------------------------------------------------------
function stageA() {
  console.log('=== STAGE A — the limit comb, by brute force ===');
  // n is in C_infinity iff no prime divides n(n+2). Over |n| <= LIM, find them.
  const LIM = 2000000;
  const P = primesUpTo(LIM + 4);
  // mark n in [-LIM, LIM] killed if some prime <= LIM+2 divides n(n+2)
  const off = LIM;
  const killed = new Uint8Array(2 * LIM + 1);
  for (const p of P) {
    // n = 0 mod p  or  n = -2 mod p
    for (const r of [0, p - 2 % p]) {
      const rr = ((r % p) + p) % p;
      let start = -LIM;
      start += ((rr - (start % p) + p) % p);
      for (let n = start; n <= LIM; n += p) killed[n + off] = 1;
    }
  }
  const survivors = [];
  for (let n = -LIM; n <= LIM; n++) if (!killed[n + off]) survivors.push(n);
  console.log(`  window |n| <= ${LIM}, primes sieved up to ${LIM + 2}`);
  console.log(`  survivors of every prime: [${survivors.join(', ')}]`);
  const ok = survivors.length === 1 && survivors[0] === -1;
  console.log(`  C_infinity = {-1} : ${ok ? 'VERIFIED' : 'FAILED'}`);
  if (!ok) { console.error('STAGE A FAILED'); process.exit(1); }
  // and the density product, showing the collapse rate
  const marks = [10, 100, 1000, 10000, 100000, 1000000];
  let prod = 1, mi = 0;
  const rows = [];
  for (const p of P) {
    prod *= p === 2 ? 0.5 : 1 - 2 / p;
    while (mi < marks.length && p >= marks[mi]) {
      rows.push([marks[mi], prod]); mi++;
    }
    if (mi >= marks.length) break;
  }
  console.log('  density prod_{p<=x}(1-2/p) [p=2 term is 1/2]:');
  for (const [x, d] of rows) console.log(`    x = ${String(x).padStart(8)}   d_x = ${d.toExponential(6)}`);
  console.log('  Erdos condition sum 2/p diverges (Mertens), so d_x -> 0: the');
  console.log('  limit window has Haar measure 0 and the Mirsky measure is delta_{0^inf}.');
  console.log('');
  return { survivors };
}

// ---------------------------------------------------------------------------
// Build the level-x comb over one period, both classes and one class
// ---------------------------------------------------------------------------
function buildComb(primes, twoClass) {
  let N = 1;
  for (const p of primes) N *= p;
  const bits = new Uint8Array(N); // 1 = member
  bits.fill(1);
  for (const p of primes) {
    const classes = twoClass ? [0, ((-2 % p) + p) % p] : [0];
    const seen = new Set(classes);
    for (const r of seen) {
      for (let n = r; n < N; n += p) bits[n] = 0;
    }
  }
  return { N, bits };
}

function gapStats(N, bits) {
  const pos = [];
  for (let i = 0; i < N; i++) if (bits[i]) pos.push(i);
  let g = 0, gi = -1;
  for (let k = 0; k < pos.length; k++) {
    const a = pos[k], b = k + 1 < pos.length ? pos[k + 1] : pos[0] + N;
    if (b - a > g) { g = b - a; gi = a; }
  }
  // second largest DISTINCT-position gap value
  const gaps = [];
  for (let k = 0; k < pos.length; k++) {
    const a = pos[k], b = k + 1 < pos.length ? pos[k + 1] : pos[0] + N;
    gaps.push(b - a);
  }
  gaps.sort((u, v) => v - u);
  return { count: pos.length, maxGap: g, maxGapAt: gi, secondGap: gaps[1], first: pos[0] };
}

// ---------------------------------------------------------------------------
// STAGE B — cyclic word complexity by rank refinement
// ---------------------------------------------------------------------------
function complexity(N, bits, cap) {
  // cls[i] : class id of position i under equal length-n window
  let cls = new Int32Array(N);
  let order = new Int32Array(N);
  let tmp = new Int32Array(N);
  let newcls = new Int32Array(N);

  // n = 1
  let c0 = 0;
  for (let i = 0; i < N; i++) if (!bits[i]) c0++;
  // stable order: zeros then ones
  let a = 0, b = c0;
  for (let i = 0; i < N; i++) { if (!bits[i]) order[a++] = i; else order[b++] = i; }
  for (let i = 0; i < N; i++) cls[i] = bits[i] ? 1 : 0;
  let k = (c0 === 0 || c0 === N) ? 1 : 2;
  const pn = [k]; // pn[j] = p(j+1)
  let n = 1;

  while (k < N && n < cap) {
    // refine by symbol at offset n
    // walk order in groups of equal cls, stable-split by bits[(i+n) mod N]
    let w = 0;
    let s = 0;
    while (s < N) {
      let e = s + 1;
      const cc = cls[order[s]];
      while (e < N && cls[order[e]] === cc) e++;
      // pass 1: bit 0
      for (let t = s; t < e; t++) {
        const i = order[t];
        let j = i + n; if (j >= N) j -= N;
        if (!bits[j]) tmp[w++] = i;
      }
      // pass 2: bit 1
      for (let t = s; t < e; t++) {
        const i = order[t];
        let j = i + n; if (j >= N) j -= N;
        if (bits[j]) tmp[w++] = i;
      }
      s = e;
    }
    // assign new class ids
    let id = 0;
    {
      let prevCls = -1, prevBit = -1;
      for (let t = 0; t < N; t++) {
        const i = tmp[t];
        let j = i + n; if (j >= N) j -= N;
        const bcur = bits[j];
        const ccur = cls[i];
        if (t === 0 || ccur !== prevCls || bcur !== prevBit) { if (t > 0) id++; }
        newcls[i] = id;
        prevCls = ccur; prevBit = bcur;
      }
    }
    const kNew = id + 1;
    // swap
    const t1 = cls; cls = newcls; newcls = t1;
    const t2 = order; order = tmp; tmp = t2;
    k = kNew;
    n++;
    pn.push(k);
  }
  return { R: k === N ? n : null, pn, saturated: k === N };
}

// ---------------------------------------------------------------------------
// STAGE C — Mirsky exactness on positive cylinders, failure on negative ones
// ---------------------------------------------------------------------------
function positiveCylinderCheck(primes, N, bits, D) {
  // exact count of n in [0,N) with n+d a comb member for every d in D
  let cnt = 0;
  for (let n = 0; n < N; n++) {
    let ok = 1;
    for (const d of D) { let j = n + d; if (j >= N) j -= N; if (!bits[j]) { ok = 0; break; } }
    cnt += ok;
  }
  // CRT product prediction
  let pred = 1;
  for (const p of primes) {
    const S = new Set();
    for (const d of D) { S.add(((-d % p) + p) % p); S.add((((-d - 2) % p) + p) % p); }
    pred *= (p - S.size) / p;
  }
  return { cnt, dens: cnt / N, pred, exact: Math.abs(cnt / N - pred) < 1e-12 * Math.max(1, cnt / N) };
}

function mixedCylinderCheck(N, bits, D, E) {
  // n+d a member for d in D, n+e NOT a member for e in E
  let cnt = 0;
  for (let n = 0; n < N; n++) {
    let ok = 1;
    for (const d of D) { let j = n + d; if (j >= N) j -= N; if (!bits[j]) { ok = 0; break; } }
    if (ok) for (const e of E) { let j = n + e; if (j >= N) j -= N; if (bits[j]) { ok = 0; break; } }
    cnt += ok;
  }
  return cnt / N;
}

// ---------------------------------------------------------------------------
// STAGE D — the nondegenerate cousin's density
// ---------------------------------------------------------------------------
function squarefreeValuesDensity() {
  // D = { n : p^2 does not divide n(n+2) for every p }
  // p = 2 : 4 | n(n+2) iff n even -> local density 1/2
  // p odd : p^2 | n(n+2) iff p^2 | n or p^2 | n+2 -> local density 1 - 2/p^2
  const LIM = 50000000;
  const P = primesUpTo(100000);
  let d = 0.5;
  for (const p of P) { if (p === 2) continue; d *= 1 - 2 / p / p; }
  // tail: prod_{p > 1e5} (1 - 2/p^2) = 1 - 2*sum_{p>1e5} 1/p^2 + ...
  // sum_{p > X} 1/p^2 < integral_X^inf dt/(t^2 ln t) < 1/(X ln X)
  const tailBound = 2 / (100000 * Math.log(100000));
  return { d, tailBound, LIM };
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------
function main() {
  const t0 = Date.now();
  stageA();

  const LEVELS = BIG ? [3, 5, 7, 11, 13, 17, 19] : [3, 5, 7, 11, 13, 17];
  const allPrimes = primesUpTo(50);

  console.log('=== STAGE B — word complexity of the level-x comb ===');
  console.log("  R_x = recognizability radius = least n with p_x(n) = x#.");
  console.log("  x'^2 is the zone budget. The Zone Postulate follows from R_x < x'^2 - 3.");
  console.log("  x      x#        slots     G2    R_x   R_x-G2  R_x/G2   x'^2   R_x/x'^2  zone?");
  const stageB = {};
  for (const x of LEVELS) {
    const primes = allPrimes.filter((p) => p <= x);
    const { N, bits } = buildComb(primes, true);
    const gs = gapStats(N, bits);
    const t = Date.now();
    const cx = complexity(N, bits, 40000);
    const secs = (Date.now() - t) / 1000;
    let best = 0, bestn = 0;
    for (let i = 1; i < cx.pn.length; i++) {
      const v = Math.log(cx.pn[i]) / (i + 1);
      if (v > best) { best = v; bestn = i + 1; }
    }
    const xp = allPrimes.find((p) => p > x);
    const zone = xp * xp;
    stageB[x] = { N, gs, R: cx.R, pn: cx.pn, best, bestn, secs, xp, zone };
    console.log(
      `  ${String(x).padStart(2)}  ${String(N).padStart(9)}  ${String(gs.count).padStart(8)}  ` +
      `${String(gs.maxGap).padStart(5)}  ` +
      `${String(cx.R).padStart(5)}  ${String(cx.R - gs.maxGap).padStart(6)}  ` +
      `${(cx.R / gs.maxGap).toFixed(4).padStart(7)}  ${String(zone).padStart(6)}  ` +
      `${(cx.R / zone).toFixed(4).padStart(8)}  ${cx.R < zone - 3 ? 'CERTIFIES' : 'FAILS'}   [${secs.toFixed(1)}s]`
    );
  }
  console.log('  the lemma R_x >= G2 - 1 (a record gap contains 0^{G2-2} twice):');
  for (const x of LEVELS) {
    const ok = stageB[x].R >= stageB[x].gs.maxGap - 1;
    console.log(`    x = ${String(x).padStart(2)}   R_x = ${String(stageB[x].R).padStart(5)}  G2 - 1 = ${String(stageB[x].gs.maxGap - 1).padStart(5)}   ${ok ? 'holds' : 'FAILS'}`);
  }
  console.log('  fraction of positions still unresolved at the zone budget,');
  console.log("  1 - p_x(x'^2 - 2)/x#  (how far the complexity route is from certifying):");
  for (const x of LEVELS) {
    const b = stageB[x];
    const idx = Math.min(b.pn.length, Math.max(1, b.zone - 2)) - 1;
    console.log(`    x = ${String(x).padStart(2)}   p_x(${b.zone - 2}) = ${String(b.pn[idx]).padStart(9)} of ${String(b.N).padStart(9)}   deficit ${(1 - b.pn[idx] / b.N).toExponential(4)}`);
  }
  console.log("  the Toeplitz REGULARITY analogue: the fraction of one period on which");
  console.log("  level-x information is final is the crystallized head x'^2 / x# ->");
  for (const x of LEVELS) {
    const b = stageB[x];
    console.log(`    x = ${String(x).padStart(2)}   x'^2 / x# = ${(b.zone / b.N).toExponential(6)}`);
  }

  console.log('');
  console.log('  ONE-CLASS CONTROL (reduced residues mod x#, the published B-free shape):');
  console.log('  x      x#        slots     g      R_x   R_x-g   R_x/g');
  const stageB1 = {};
  for (const x of LEVELS) {
    const primes = allPrimes.filter((p) => p <= x);
    const { N, bits } = buildComb(primes, false);
    const gs = gapStats(N, bits);
    const cx = complexity(N, bits, 40000);
    stageB1[x] = { N, gs, R: cx.R };
    console.log(
      `  ${String(x).padStart(2)}  ${String(N).padStart(9)}  ${String(gs.count).padStart(8)}  ` +
      `${String(gs.maxGap).padStart(5)}  ` +
      `${String(cx.R).padStart(5)}  ${String(cx.R - gs.maxGap).padStart(6)}  ` +
      `${(cx.R / gs.maxGap).toFixed(4).padStart(7)}`
    );
  }
  console.log('  R_x sequences for an OEIS search (two-class, then one-class):');
  console.log('    ' + LEVELS.map((x) => stageB[x].R).join(', '));
  console.log('    ' + LEVELS.map((x) => stageB1[x].R).join(', '));

  console.log('');
  console.log('  THE COMPLEXITY CURVE p_x(n), level x = 13 (x# = 30030):');
  {
    const pn = stageB[13].pn;
    const marks = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 66, 70, 80, 90, 100];
    const line = marks.filter((m) => m <= pn.length).map((m) => `${m}:${pn[m - 1]}`).join('  ');
    console.log('    ' + line);
    console.log(`    p_13(n) reaches the full period ${stageB[13].N} at n = ${stageB[13].R}`);
  }

  console.log('');
  console.log('=== STAGE C — Mirsky/CRT on positive vs mixed cylinders ===');
  const patterns = [
    { name: 'D={0}', D: [0] },
    { name: 'D={0,6}', D: [0, 6] },
    { name: 'D={0,4}', D: [0, 4] },
    { name: 'D={0,6,12}', D: [0, 6, 12] },
    { name: 'D={0,2,6,8}', D: [0, 2, 6, 8] },
    { name: 'D={0,30}', D: [0, 30] },
  ];
  console.log('  (C1) POSITIVE cylinders: exact count vs the CRT product, level x = 13');
  {
    const primes = allPrimes.filter((p) => p <= 13);
    const { N, bits } = buildComb(primes, true);
    for (const pat of patterns) {
      const r = positiveCylinderCheck(primes, N, bits, pat.D);
      console.log(
        `    ${pat.name.padEnd(14)} count ${String(r.cnt).padStart(7)}  density ${r.dens.toExponential(9)}  ` +
        `CRT ${r.pred.toExponential(9)}  ${r.exact ? 'IDENTITY' : 'DIFFERS'}`
      );
    }
  }
  console.log('  (C2) MIXED cylinders: exact density vs the naive independence product,');
  console.log('       level x = 13. "naive" = d^{|D|} (1-d)^{|E|} with d the comb density.');
  {
    const primes = allPrimes.filter((p) => p <= 13);
    const { N, bits } = buildComb(primes, true);
    const gs = gapStats(N, bits);
    const d = gs.count / N;
    const mixed = [
      { D: [0, 6], E: [2] },
      { D: [0, 6], E: [2, 4] },
      { D: [0, 12], E: [2, 4, 6, 8, 10] },
      { D: [0, 30], E: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28] },
      { D: [0, 66], E: Array.from({ length: 32 }, (_, i) => 2 * i + 2) },
    ];
    for (const m of mixed) {
      const t = mixedCylinderCheck(N, bits, m.D, m.E);
      const naive = Math.pow(d, m.D.length) * Math.pow(1 - d, m.E.length);
      console.log(
        `    |D|=${m.D.length} span ${String(m.D[m.D.length - 1]).padStart(3)} |E|=${String(m.E.length).padStart(2)}  ` +
        `exact ${t.toExponential(6)}  naive ${naive.toExponential(6)}  ratio ${(naive > 0 ? t / naive : NaN).toExponential(4)}`
      );
    }
    console.log(`    comb density at x = 13 : d = ${d.toFixed(10)}`);
  }

  console.log('');
  console.log('=== STAGE E — the return-time process (H\'\' in dynamical coordinates) ===');
  console.log("  The gap sequence of the comb IS the return-time process of the induced");
  console.log("  map on the comb. H'' asserts a conditional exponential tail for it.");
  console.log("  A Toeplitz/odometer system is RIGID, not mixing, so the dynamics predicts");
  console.log("  no decay of correlations at all. What the comb actually does:");
  for (const x of LEVELS) {
    const primes = allPrimes.filter((p) => p <= x);
    const { N, bits } = buildComb(primes, true);
    const pos = [];
    for (let i = 0; i < N; i++) if (bits[i]) pos.push(i);
    const G = [];
    for (let k = 0; k < pos.length; k++) G.push((k + 1 < pos.length ? pos[k + 1] : pos[0] + N) - pos[k]);
    const n = G.length;
    if (n < 20) { console.log(`  x = ${x}: only ${n} gaps, skipped`); continue; }
    const mean = G.reduce((a, b) => a + b, 0) / n;
    let v = 0; for (const g of G) v += (g - mean) * (g - mean);
    const sd = Math.sqrt(v / n);
    const acf = [];
    for (let lag = 1; lag <= 6; lag++) {
      let c = 0;
      for (let i = 0; i < n; i++) c += (G[i] - mean) * (G[(i + lag) % n] - mean);
      acf.push(c / n / (sd * sd));
    }
    const tails = [];
    for (const mult of [2, 3, 4]) {
      const th = mult * mean;
      let a = 0, b = 0;
      for (let i = 0; i < n; i++) {
        if (G[i] >= th) { a++; if (G[(i + 1) % n] >= th) b++; }
      }
      const pmarg = a / n;
      tails.push(a === 0 ? NaN : (b / a) / (pmarg || 1));
    }
    console.log(
      `    x = ${String(x).padStart(2)}  gaps ${String(n).padStart(7)}  mbar ${mean.toFixed(3).padStart(9)}  sd/mbar ${(sd / mean).toFixed(4)}  ` +
      `acf(1..6) ${acf.map((a) => a.toFixed(4)).join(' ')}`
    );
    console.log(
      `            P(g'>=t | g>=t)/P(g>=t) at t = 2,3,4 mbar : ` +
      tails.map((t) => (Number.isNaN(t) ? 'n/a' : t.toFixed(4))).join('  ')
    );
  }

  console.log('');
  console.log('  the scale separation that makes every dynamical statement vacuous here:');
  console.log("  the comb is EXACTLY equidistributed over one period x#, and the corpus");
  console.log("  needs a statement at window x'^2. The ratio:");
  for (const x of LEVELS) {
    const b = stageB[x];
    console.log(`    x = ${String(x).padStart(2)}   x'^2 / x# = ${(b.zone / b.N).toExponential(6)}   ln(x#)/ln(x'^2) = ${(Math.log(b.N) / Math.log(b.zone)).toFixed(4)}`);
  }

  console.log('');
  console.log('=== STAGE D — entropy coordinates ===');
  console.log('  (D1) the level-x comb subshift is a single periodic orbit:');
  console.log('       h_top = 0 and p_x(n) = x# for n >= R_x, at every finite x.');
  console.log('  (D2) the LIMIT comb is {-1} (Stage A): h_top = 0, unique invariant');
  console.log('       measure delta_{0^inf}, and eta is NOT a Toeplitz sequence.');
  console.log('  (D3) B-free hereditary-closure entropy analogue, h = d_x * log 2:');
  for (const x of LEVELS) {
    const d = stageB[x].gs.count / stageB[x].N;
    console.log(`       x = ${String(x).padStart(2)}   d_x = ${d.toExponential(8)}   d_x*log2 = ${(d * Math.LN2).toExponential(8)}`);
  }
  console.log('       and d_x -> 0, so the limit of this entropy is 0.');
  {
    const sf = squarefreeValuesDensity();
    console.log('  (D4) the nondegenerate two-class cousin the B-free theory DOES cover:');
    console.log('       D = { n : p^2 does not divide n(n+2) for all p }');
    console.log(`       density = ${sf.d.toFixed(12)}  (primes to 1e5; tail factor within ${sf.tailBound.toExponential(3)})`);
    console.log(`       hereditary-closure entropy analogue = density * log 2 = ${(sf.d * Math.LN2).toFixed(12)}`);
    console.log(`       compare the one-class squarefree flow: 6/pi^2 = ${(6 / Math.PI / Math.PI).toFixed(12)},`);
    console.log(`       (6/pi^2)*log 2 = ${((6 / Math.PI / Math.PI) * Math.LN2).toFixed(12)}`);
  }
  console.log('  (D5) finite-level complexity entropy max_n log p_x(n)/n (the only');
  console.log('       nonzero entropy-like number the finite comb carries):');
  for (const x of LEVELS) {
    console.log(`       x = ${String(x).padStart(2)}   max = ${stageB[x].best.toFixed(8)} nats at n = ${stageB[x].bestn}   log(x#)/R_x = ${(Math.log(stageB[x].N) / stageB[x].R).toFixed(8)}`);
  }

  console.log('');
  console.log(`total ${(Date.now() - t0) / 1000} s`);
}

main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both --env BIG=1 --node-flag --max-old-space-size=6000 research/import-bfree-01-toeplitz.js
//   invocation:  BIG=1 node --max-old-space-size=6000 research/import-bfree-01-toeplitz.js
//   code-sha256: a8ecebb9c166673337e75c9d2d4a69aa4c03e0df8e65db214bdbba03f7b36a22
//   out-sha256:  52ac7f248e35c65053376559f8198131e0b5e97b459196c85b8f8a2910ec302f
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     528.7 s
// ============================================================================
// === STAGE A — the limit comb, by brute force ===
//   window |n| <= 2000000, primes sieved up to 2000002
//   survivors of every prime: [-1]
//   C_infinity = {-1} : VERIFIED
//   density prod_{p<=x}(1-2/p) [p=2 term is 1/2]:
//     x =       10   d_x = 5.844156e-2
//     x =      100   d_x = 1.876934e-2
//     x =     1000   d_x = 8.639157e-3
//     x =    10000   d_x = 4.893438e-3
//     x =   100000   d_x = 3.138147e-3
//     x =  1000000   d_x = 2.180463e-3
//   Erdos condition sum 2/p diverges (Mertens), so d_x -> 0: the
//   limit window has Haar measure 0 and the Mirsky measure is delta_{0^inf}.
//
// === STAGE B — word complexity of the level-x comb ===
//   R_x = recognizability radius = least n with p_x(n) = x#.
//   x'^2 is the zone budget. The Zone Postulate follows from R_x < x'^2 - 3.
//   x      x#        slots     G2    R_x   R_x-G2  R_x/G2   x'^2   R_x/x'^2  zone?
//    3          6         1      6      5      -1   0.8333      25    0.2000  CERTIFIES   [0.0s]
//    5         30         3     12     24      12   2.0000      49    0.4898  CERTIFIES   [0.0s]
//    7        210        15     30     66      36   2.2000     121    0.5455  CERTIFIES   [0.0s]
//   11       2310       135     42    186     144   4.4286     169    1.1006  FAILS   [0.0s]
//   13      30030      1485     66    312     246   4.7273     289    1.0796  FAILS   [0.1s]
//   17     510510     22275    108    918     810   8.5000     361    2.5429  FAILS   [4.5s]
//   19    9699690    378675    150   1098     948   7.3200     529    2.0756  FAILS   [386.2s]
//   the lemma R_x >= G2 - 1 (a record gap contains 0^{G2-2} twice):
//     x =  3   R_x =     5  G2 - 1 =     5   holds
//     x =  5   R_x =    24  G2 - 1 =    11   holds
//     x =  7   R_x =    66  G2 - 1 =    29   holds
//     x = 11   R_x =   186  G2 - 1 =    41   holds
//     x = 13   R_x =   312  G2 - 1 =    65   holds
//     x = 17   R_x =   918  G2 - 1 =   107   holds
//     x = 19   R_x =  1098  G2 - 1 =   149   holds
//   fraction of positions still unresolved at the zone budget,
//   1 - p_x(x'^2 - 2)/x#  (how far the complexity route is from certifying):
//     x =  3   p_x(23) =         6 of         6   deficit 0.0000e+0
//     x =  5   p_x(47) =        30 of        30   deficit 0.0000e+0
//     x =  7   p_x(119) =       210 of       210   deficit 0.0000e+0
//     x = 11   p_x(167) =      2263 of      2310   deficit 2.0346e-2
//     x = 13   p_x(287) =     29830 of     30030   deficit 6.6600e-3
//     x = 17   p_x(359) =    470613 of    510510   deficit 7.8151e-2
//     x = 19   p_x(527) =   9169041 of   9699690   deficit 5.4708e-2
//   the Toeplitz REGULARITY analogue: the fraction of one period on which
//   level-x information is final is the crystallized head x'^2 / x# ->
//     x =  3   x'^2 / x# = 4.166667e+0
//     x =  5   x'^2 / x# = 1.633333e+0
//     x =  7   x'^2 / x# = 5.761905e-1
//     x = 11   x'^2 / x# = 7.316017e-2
//     x = 13   x'^2 / x# = 9.623710e-3
//     x = 17   x'^2 / x# = 7.071360e-4
//     x = 19   x'^2 / x# = 5.453783e-5
//
//   ONE-CLASS CONTROL (reduced residues mod x#, the published B-free shape):
//   x      x#        slots     g      R_x   R_x-g   R_x/g
//    3          6         2      4      4       0   1.0000
//    5         30         8      6     14       8   2.3333
//    7        210        48     10     38      28   3.8000
//   11       2310       480     14     66      52   4.7143
//   13      30030      5760     22    138     116   6.2727
//   17     510510     92160     26    238     212   9.1538
//   19    9699690   1658880     34    366     332  10.7647
//   R_x sequences for an OEIS search (two-class, then one-class):
//     5, 24, 66, 186, 312, 918, 1098
//     4, 14, 38, 66, 138, 238, 366
//
//   THE COMPLEXITY CURVE p_x(n), level x = 13 (x# = 30030):
//     1:2  2:3  3:4  4:5  5:6  6:7  8:11  10:15  12:19  16:31  20:49  24:73  32:153  40:313  48:577  56:1095  64:1851  66:2082  70:2546  80:4108  90:6060  100:8512
//     p_13(n) reaches the full period 30030 at n = 312
//
// === STAGE C — Mirsky/CRT on positive vs mixed cylinders ===
//   (C1) POSITIVE cylinders: exact count vs the CRT product, level x = 13
//     D={0}          count    1485  density 4.945054945e-2  CRT 4.945054945e-2  IDENTITY
//     D={0,6}        count     189  density 6.293706294e-3  CRT 6.293706294e-3  IDENTITY
//     D={0,4}        count       0  density 0.000000000e+0  CRT 0.000000000e+0  IDENTITY
//     D={0,6,12}     count       0  density 0.000000000e+0  CRT 0.000000000e+0  IDENTITY
//     D={0,2,6,8}    count       0  density 0.000000000e+0  CRT 0.000000000e+0  IDENTITY
//     D={0,30}       count     756  density 2.517482517e-2  CRT 2.517482517e-2  IDENTITY
//   (C2) MIXED cylinders: exact density vs the naive independence product,
//        level x = 13. "naive" = d^{|D|} (1-d)^{|E|} with d the comb density.
//     |D|=2 span   6 |E|= 1  exact 6.293706e-3  naive 2.324433e-3  ratio 2.7076e+0
//     |D|=2 span   6 |E|= 2  exact 6.293706e-3  naive 2.209488e-3  ratio 2.8485e+0
//     |D|=2 span  12 |E|= 5  exact 1.678322e-2  naive 1.897649e-3  ratio 8.8442e+0
//     |D|=2 span  30 |E|=14  exact 8.991009e-3  naive 1.202232e-3  ratio 7.4786e+0
//     |D|=2 span  66 |E|=32  exact 3.996004e-4  naive 4.825398e-4  ratio 8.2812e-1
//     comb density at x = 13 : d = 0.0494505495
//
// === STAGE E — the return-time process (H'' in dynamical coordinates) ===
//   The gap sequence of the comb IS the return-time process of the induced
//   map on the comb. H'' asserts a conditional exponential tail for it.
//   A Toeplitz/odometer system is RIGID, not mixing, so the dynamics predicts
//   no decay of correlations at all. What the comb actually does:
//   x = 3: only 1 gaps, skipped
//   x = 5: only 3 gaps, skipped
//   x = 7: only 15 gaps, skipped
//     x = 11  gaps     135  mbar    17.111  sd/mbar 0.5491  acf(1..6) -0.1177 0.2690 0.0062 -0.1781 -0.2476 -0.2536
//             P(g'>=t | g>=t)/P(g>=t) at t = 2,3,4 mbar : 0.0000  n/a  n/a
//     x = 13  gaps    1485  mbar    20.222  sd/mbar 0.5950  acf(1..6) -0.0622 0.1196 -0.0939 -0.2136 -0.2332 -0.2439
//             P(g'>=t | g>=t)/P(g>=t) at t = 2,3,4 mbar : 1.0876  0.0000  n/a
//     x = 17  gaps   22275  mbar    22.919  sd/mbar 0.6364  acf(1..6) -0.0397 0.0212 -0.1623 -0.2016 -0.1790 -0.0455
//             P(g'>=t | g>=t)/P(g>=t) at t = 2,3,4 mbar : 0.9712  0.0000  0.0000
//     x = 19  gaps  378675  mbar    25.615  sd/mbar 0.6700  acf(1..6) -0.0421 -0.0446 -0.1728 -0.1706 -0.0785 0.0301
//             P(g'>=t | g>=t)/P(g>=t) at t = 2,3,4 mbar : 0.8764  0.1710  0.0000
//
//   the scale separation that makes every dynamical statement vacuous here:
//   the comb is EXACTLY equidistributed over one period x#, and the corpus
//   needs a statement at window x'^2. The ratio:
//     x =  3   x'^2 / x# = 4.166667e+0   ln(x#)/ln(x'^2) = 0.5566
//     x =  5   x'^2 / x# = 1.633333e+0   ln(x#)/ln(x'^2) = 0.8739
//     x =  7   x'^2 / x# = 5.761905e-1   ln(x#)/ln(x'^2) = 1.1150
//     x = 11   x'^2 / x# = 7.316017e-2   ln(x#)/ln(x'^2) = 1.5098
//     x = 13   x'^2 / x# = 9.623710e-3   ln(x#)/ln(x'^2) = 1.8195
//     x = 17   x'^2 / x# = 7.071360e-4   ln(x#)/ln(x'^2) = 2.2319
//     x = 19   x'^2 / x# = 5.453783e-5   ln(x#)/ln(x'^2) = 2.5654
//
// === STAGE D — entropy coordinates ===
//   (D1) the level-x comb subshift is a single periodic orbit:
//        h_top = 0 and p_x(n) = x# for n >= R_x, at every finite x.
//   (D2) the LIMIT comb is {-1} (Stage A): h_top = 0, unique invariant
//        measure delta_{0^inf}, and eta is NOT a Toeplitz sequence.
//   (D3) B-free hereditary-closure entropy analogue, h = d_x * log 2:
//        x =  3   d_x = 1.66666667e-1   d_x*log2 = 1.15524530e-1
//        x =  5   d_x = 1.00000000e-1   d_x*log2 = 6.93147181e-2
//        x =  7   d_x = 7.14285714e-2   d_x*log2 = 4.95105129e-2
//        x = 11   d_x = 5.84415584e-2   d_x*log2 = 4.05086015e-2
//        x = 13   d_x = 4.94505495e-2   d_x*log2 = 3.42765089e-2
//        x = 17   d_x = 4.36328378e-2   d_x*log2 = 3.02439785e-2
//        x = 19   d_x = 3.90399075e-2   d_x*log2 = 2.70604018e-2
//        and d_x -> 0, so the limit of this entropy is 0.
//   (D4) the nondegenerate two-class cousin the B-free theory DOES cover:
//        D = { n : p^2 does not divide n(n+2) for all p }
//        density = 0.322634616605  (primes to 1e5; tail factor within 1.737e-6)
//        hereditary-closure entropy analogue = density * log 2 = 0.223633274851
//        compare the one-class squarefree flow: 6/pi^2 = 0.607927101854,
//        (6/pi^2)*log 2 = 0.421382956636
//   (D5) finite-level complexity entropy max_n log p_x(n)/n (the only
//        nonzero entropy-like number the finite comb carries):
//        x =  3   max = 0.54930614 nats at n = 2   log(x#)/R_x = 0.35835189
//        x =  5   max = 0.54930614 nats at n = 2   log(x#)/R_x = 0.14171656
//        x =  7   max = 0.54930614 nats at n = 2   log(x#)/R_x = 0.08101678
//        x = 11   max = 0.54930614 nats at n = 2   log(x#)/R_x = 0.04163980
//        x = 13   max = 0.54930614 nats at n = 2   log(x#)/R_x = 0.03304472
//        x = 17   max = 0.54930614 nats at n = 2   log(x#)/R_x = 0.01431717
//        x = 19   max = 0.54930614 nats at n = 2   log(x#)/R_x = 0.01465173
//
// total 528.645 s
// ============================================================================
// READINGS
// ============================================================================
//
// [1] THE LIMIT OBJECT IS A SINGLE POINT, AND THAT IS THE WHOLE IMPORT'S FIRST
//     ANSWER. The survivor list of every prime over |n| <= 2000000 is exactly
//     [-1]. So the limit comb's characteristic sequence is one 1 in an ocean of
//     0s: not a Toeplitz sequence (position -1 is on no constant progression),
//     topological entropy 0, and the only invariant measure is the point mass
//     at 0^inf. The density product 5.844156e-2, 1.876934e-2, 8.639157e-3,
//     4.893438e-3, 3.138147e-3, 2.180463e-3 at x = 10 to 1e6 is the collapse in
//     progress, and Mertens is what makes it inevitable. Every ergodic
//     statement about the limit is therefore true and vacuous.
//
// [2] THE RECOGNIZABILITY RADIUS IS A NEW INVARIANT AND IT CLOSES ITS OWN
//     ROUTE. R_x reads 5, 24, 66, 186, 312, 918, 1098 at x = 3..19 against G2
//     of 6, 12, 30, 42, 66, 108, 150. The lemma R_x >= G2 - 1 holds at all
//     seven levels, so bounding R_x is strictly harder than bounding G2, and
//     R_x/x'^2 reads 0.2000, 0.4898, 0.5455, 1.1006, 1.0796, 2.5429, 2.0756:
//     the complexity reformulation of the Zone Postulate certifies only to
//     x = 7 and FAILS at x = 11, 13, 17 and 19. The deficit at the zone budget,
//     1 - p_x(x'^2-2)/x#, is 2.0346e-2, 6.6600e-3, 7.8151e-2, 5.4708e-2 there.
//
// [3] THE G2 LADDER REPRODUCES FROM AN ENGINE THAT SHARES NO CODE WITH THE
//     CORPUS'S, WHICH IS THIS RUN'S CALIBRATION. 42, 66, 108, 150 at T_11 to
//     T_19, and the one-class control returns A048670's 4, 6, 10, 14, 22, 26,
//     34. A run that got those wrong would have nothing else worth reading.
//
// [4] THE COMB IS THE EXTREME OPPOSITE OF A REGULAR TOEPLITZ SEQUENCE. The
//     fraction of one period on which level-x information is final is
//     x'^2 / x# = 7.316017e-2, 9.623710e-3, 7.071360e-4, 5.453783e-5 at
//     x = 11..19, falling like e^{-x}. Regularity is the hypothesis under which
//     the Toeplitz machinery delivers unique ergodicity and a clean spectrum,
//     and it wants this fraction to tend to 1. Ours tends to 0 as fast as
//     anything in the subject.
//
// [5] MIRSKY IS AN IDENTITY ON POSITIVE CYLINDERS AND HAS NOTHING TO SAY ABOUT
//     NEGATIVE ONES. At x = 13 the exact count and the CRT product agree to
//     every printed digit at all six positive patterns, including the three
//     inadmissible ones that give 0 on both sides. On mixed patterns the naive
//     independence value is out by factors 2.7076, 2.8485, 8.8442, 7.4786 and
//     8.2812e-1. Gaps are negative events, and there is no product formula for
//     them: the exact evaluation is the 3^{pi(x)} inclusion-exclusion the
//     corpus already carries.
//
// [6] THE RETURN-TIME PROCESS IS MEMORYLESS AND THE DYNAMICS CANNOT SEE IT.
//     Lag-1 autocorrelation of the gap sequence reads -0.1177, -0.0622,
//     -0.0397, -0.0421 at x = 11..19, and the ratio of conditional to marginal
//     tail at 2*mbar reads 0.0000, 1.0876, 0.9712, 0.8764. That is the shape
//     H'' asks for. But the system is a periodic orbit, which has no mixing of
//     any kind, so the observed memorylessness is a property of the arithmetic
//     inside one period rather than of the dynamics of the orbit. A dynamical
//     framework cannot even suggest H'', let alone supply it.
//
// [7] THE SCALE SEPARATION IS THE WHOLE STORY, IN ONE COLUMN. The comb is
//     EXACTLY equidistributed over one period, and the corpus needs a statement
//     at window x'^2, which is 5.453783e-5 of the period at x = 19 and shrinks
//     like e^{-x}. So the gap between the import and the corpus is not speed of
//     convergence on a shared statement. It is that the ergodic statement is
//     exact where it applies and silent everywhere the corpus works.
//
// [8] THE ONLY NONZERO ENTROPY IN SIGHT BELONGS TO A DIFFERENT OBJECT. The
//     nondegenerate two-class cousin { n : p^2 does not divide n(n+2) } has
//     density 0.322634616605 and hereditary-closure entropy 0.223633274851
//     nats, against the square-free flow's 6/pi^2 = 0.607927101854 and
//     0.421382956636. Both numbers are new here and neither is about twin
//     slots. The comb's own entropy is 0 at every finite level and in the
//     limit.
//
// [9] WHAT THIS DOES NOT SHOW. No bound on G2 anywhere. R_x was computed to
//     x = 19 only and R_x/x'^2 is not monotone over the seven levels, so the
//     route is closed but not described. Stage E's statistics are one-tile
//     numbers at populations 135 to 378675 and are consistent with H'' rather
//     than a test of it at the scale H'' is stated for. The squarefree-values
//     density uses primes to 1e5 with the tail bounded by 1.737e-6, so its last
//     digits are not certified.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). One figure
// here is not in the OUTPUT block. No number above was changed.
//
// NOT A FIGURE: 048670 is the tail of the OEIS identifier A048670, which the
//   figure scanner reads as a number. The sequence's terms 4, 6, 10, 14, 22,
//   26 are printed above.
// ---------------------------------------------------------------------------
