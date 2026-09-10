// ============================================================================
// RED TEAM 2026-08-28 — INDEPENDENT RE-DERIVATION COMPANION FOR THE THREE
// HELD NOTES destroyer-census-01.md, stretch-01.md, records-placement-01.md
// ============================================================================
// Written from the definitions, not from the producers. Every engine here is
// a different code path from the note it checks:
//   - the census walks a segmented lpf array and flushes a `pending` list of
//     primes at each twin; this file sieves primality only and resolves heads
//     by a two-pointer scan over the twin-opener array.
//   - the census snapshots cumulative counters at sorted thresholds; this file
//     builds explicit per-class prefix counts and evaluates each zone directly.
//   - stretch-01 verifies the QR law by replaying its own kill test; this file
//     re-derives immune classes from Euler's criterion and then sieves three
//     whole stretches to see whether an immune class is ever hit.
//   - records-placement-01 extracts A113274/A113275 at runtime; this file
//     re-extracts independently and recomputes every fraction in BigInt.
// NO claim in this file is a theorem. Everything is MEASURED or exact
// counting. Route B stays closed; nothing here is a density argument.
// ============================================================================
'use strict';
const T0 = Date.now();
let failures = 0;
function ok(tag, cond) { if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]`); } return cond; }
function eq(tag, got, want) { const c = JSON.stringify(got) === JSON.stringify(want); if (!c) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${JSON.stringify(got)} want ${JSON.stringify(want)}`); } return c; }
const f2 = x => x.toFixed(2), f3 = x => x.toFixed(3), f4 = x => x.toFixed(4);

const N = 100_000_000;
const GAMMA = 0.5772156649015329;
const C2 = 0.6601618158468696;

// ---------------------------------------------------------------- primality
console.log('SEC 0 — ENGINES');
const comp = new Uint8Array(N + 3);
comp[0] = comp[1] = 1;
for (let p = 2; p * p <= N + 2; p++) if (!comp[p]) for (let m = p * p; m <= N + 2; m += p) comp[m] = 1;
const isP = n => n >= 2 && !comp[n];
// small lpf, exact, to 200000 (covers every zone head window and every zone
// with p <= 9967 whose head is sought below 110000)
const SM = 200_000;
const lpf = new Int32Array(SM + 3);
for (let p = 2; p * p <= SM + 2; p++) if (lpf[p] === 0) for (let m = 2 * p; m <= SM + 2; m += p) if (lpf[m] === 0) lpf[m] = p;
const isqrt = n => { let r = Math.floor(Math.sqrt(n)); while (r * r > n) r--; while ((r + 1) * (r + 1) <= n) r++; return r; };
console.log(`  primality sieve to ${N} and exact lpf to ${SM} built, ${((Date.now() - T0) / 1000).toFixed(1)} s`);

// twin openers in the channel (a = 11,17,29 mod 30), a >= 11
const OPEN = new Set([11, 17, 29]);
const twins = [];
let chanPairs = 0;
for (let b = 0; b <= N; b += 30) for (const r of [11, 17, 29]) {
  const a = b + r; if (a < 11 || a > N) continue;
  chanPairs++;
  if (!comp[a] && !comp[a + 2]) twins.push(a);
}
console.log(`  channel pairs a in [11,1e8]: ${chanPairs}; channel twins: ${twins.length}`);
eq('census SEC1 channel pairs 9,999,999', chanPairs, 9999999);
eq('census SEC1 survivors 440,310 = A007508(8) - 2', twins.length, 440310);

// ============================================================================
console.log('\nSEC 1 — THE DESTROYER CONVENTION: position-time vs fold-activation');
// ============================================================================
// The census attributes a destroyed pair to lpf(a) whenever a is composite,
// and to lpf(a+2) otherwise ("time a beats time a+2"). Fold-activation order
// attributes it to min over the composite members of lpf. Measured over the
// range where an exact lpf array is cheap.
{
  const LIM = 10_000_000;
  const lp = new Int32Array(LIM + 3);
  for (let p = 2; p * p <= LIM + 2; p++) if (lp[p] === 0) for (let m = 2 * p; m <= LIM + 2; m += p) if (lp[m] === 0) lp[m] = p;
  let dest = 0, bothComp = 0, differ = 0, differ7 = 0, ptShare7 = 0, faShare7 = 0;
  for (let b = 0; b <= LIM; b += 30) for (const r of [11, 17, 29]) {
    const a = b + r; if (a < 11 || a > LIM - 2) continue;
    const La = lp[a], Lb = lp[a + 2];
    if (La === 0 && Lb === 0) continue;
    dest++;
    const pt = (La !== 0) ? La : Lb;                     // census convention
    let fa;                                              // fold-activation
    if (La !== 0 && Lb !== 0) { fa = Math.min(La, Lb); bothComp++; }
    else fa = (La !== 0) ? La : Lb;
    if (pt !== fa) { differ++; if (pt === 7 || fa === 7) differ7++; }
    if (pt === 7) ptShare7++;
    if (fa === 7) faShare7++;
  }
  console.log(`  openers 11..1e7: destroyed ${dest}, both-composite ${bothComp}`);
  console.log(`  the two conventions name a DIFFERENT destroyer on ${differ} pairs = ${f2(100 * differ / dest)}% of all destroyed, ${f2(100 * differ / bothComp)}% of both-composite`);
  console.log(`  share of q = 7 as destroyer: position-time ${f2(100 * ptShare7 / dest)}%, fold-activation ${f2(100 * faShare7 / dest)}%`);
  ok('conventions disagree on a large minority of both-composite pairs', differ / bothComp > 0.3);
}

// ============================================================================
console.log('\nSEC 2 — THE ZONE CERTIFICATE B(p) vs C(p), re-derived by prefix counts');
// ============================================================================
// C(p) = # channel openers a with p < a and a+2 < p'^2.
// B(p) = 2C(p) - #(prime members). Members: openers (11,17,29 mod 30) and
// closers (13,19,1 mod 30). Each channel member lies in exactly one pair.
const zonesP = [];
{ for (let p = 7; p <= 9967; p++) if (isP(p)) zonesP.push(p); }
console.log(`  zones p = 7..9967: ${zonesP.length}`);
eq('census: 1,225 zones in reach', zonesP.length, 1225);
{
  // prefix counts sampled by one linear walk over the sorted query points
  const CL_O = new Set([11, 17, 29]), CL_C = new Set([13, 19, 1]);
  const pts = new Set();
  for (const p of zonesP) { const pp = nextPrime(p); pts.add(p); pts.add(pp * pp - 3); pts.add(p + 2); pts.add(pp * pp - 1); }
  const sorted = [...pts].sort((a, b) => a - b);
  const cumPair = new Map(), cumPO = new Map(), cumPC = new Map(), cumTw = new Map();
  let cp = 0, po = 0, pc = 0, tw = 0, qi = 0, tj = 0;
  const NMAXQ = sorted[sorted.length - 1];
  for (let n = 0; n <= NMAXQ; n++) {
    while (qi < sorted.length && sorted[qi] === n - 1) { cumPair.set(sorted[qi], cp); cumPO.set(sorted[qi], po); cumPC.set(sorted[qi], pc); cumTw.set(sorted[qi], tw); qi++; }
    const r = n % 30;
    if (CL_O.has(r) && n >= 11) { cp++; if (!comp[n] && !comp[n + 2]) tw++; }
    if (CL_O.has(r) && !comp[n]) po++;
    if (CL_C.has(r) && !comp[n]) pc++;
  }
  while (qi < sorted.length) { cumPair.set(sorted[qi], cp); cumPO.set(sorted[qi], po); cumPC.set(sorted[qi], pc); cumTw.set(sorted[qi], tw); qi++; }
  const forced = [], forcedP = []; let firstDeath = 0, lastAlive = 0, revivals = 0, wasDead = false;
  const bandSum = [0, 0, 0, 0], bandN = [0, 0, 0, 0];
  for (const p of zonesP) {
    const pp = nextPrime(p), hi = pp * pp;
    const C = cumPair.get(hi - 3) - cumPair.get(p);
    const primeOpen = cumPO.get(hi - 3) - cumPO.get(p);
    const primeClose = cumPC.get(hi - 1) - cumPC.get(p + 2);
    const B = 2 * C - primeOpen - primeClose;
    const T = cumTw.get(hi - 3) - cumTw.get(p);
    if (B <= C - 1) { forced.push(C - B); forcedP.push(p); lastAlive = p; if (wasDead) revivals++; wasDead = false; ok(`forced count <= truth at p=${p}`, C - B <= T); }
    else { if (!firstDeath) firstDeath = p; wasDead = true; }
    const bd = p < 100 ? 0 : p < 1000 ? 1 : p < 3163 ? 2 : 3;
    bandSum[bd] += B / C; bandN[bd]++;
    if (p === 7 || p === 61 || p === 67) console.log(`    p=${p}: C=${C} B=${B} C-B=${C - B} T=${T} => ${B <= C - 1 ? 'CERT' : 'no'}${C - B === T ? ' (TIGHT)' : ''}`);
  }
  console.log(`  certificate holds at ${forced.length} zones, p = ${forcedP[0]}..${forcedP[forcedP.length - 1]}: forced counts [${forced.join(', ')}]`);
  console.log(`  first death at p = ${firstDeath}; last certified p = ${lastAlive}; revivals after a death: ${revivals}`);
  console.log(`  B/C band means: ${bandSum.map((s, i) => f4(s / bandN[i])).join(' / ')}`);
  eq('census SEC3: 15 certified zones', forced.length, 15);
  eq('census SEC3: forced counts', forced, [8, 8, 15, 13, 17, 20, 19, 20, 22, 19, 20, 18, 12, 10, 1]);
  eq('census SEC3: dies at p = 67', firstDeath, 67);
  eq('census SEC3: never returns', revivals, 0);
  // the closed form and its crossover, re-derived
  const pStar = Math.exp(15 / 4);
  console.log(`  closed form B/C = 2 - 15/(4 ln p): density crossover at ln p = 3.75, p* = ${f2(pStar)}; note says 42.52`);
  ok('p* = e^{15/4} = 42.52', Math.abs(pStar - 42.52) < 0.01);
  // where the a-priori CRT main term crosses
  let cross = 0, prod = 1;
  for (const q of [7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67]) { prod *= (1 - 1 / q); if (!cross && 2 * (1 - prod) >= 1) cross = q; }
  console.log(`  a-priori CRT main term 2(1 - prod_{7<=q<=p}(1-1/q)) first reaches 1 at p = ${cross}; note says 59`);
  console.log(`  (the producer's OUTPUT says "stays < 1 up to p = 59"; that is the last p BELOW 1, and the crossing is at ${cross})`);
  eq('CRT main term first reaches 1 at p = 61', cross, 61);
}
function nextPrime(p) { let q = p + 1; while (comp[q]) q++; return q; }

// ============================================================================
console.log('\nSEC 3 — THE FREEZE SHELLS, re-derived');
// ============================================================================
{
  let tot = 0, minPairs = Infinity, minQ = 0, empty = 0, ns = 0;
  let ti = 0;
  const sortedTw = twins;                                    // ascending
  for (const p of zonesP) {
    const pp = nextPrime(p), lo = p * p, hi = pp * pp;        // shell on a+2
    ns++;
    // pairs with lo <= a+2 < hi  <=>  lo-2 <= a < hi-2
    let c = 0;
    while (ti < sortedTw.length && sortedTw[ti] + 2 < lo) ti++;
    let j = ti; while (j < sortedTw.length && sortedTw[j] + 2 < hi) { c++; j++; }
    tot += c;
    if (c < minPairs) { minPairs = c; minQ = p; }
    if (c === 0) empty++;
  }
  console.log(`  ${ns} shells to 1e8: frozen twins ${tot}; empty shells ${empty}; minimum ${minPairs} pairs (first at p = ${minQ})`);
  eq('census SEC4: 1,225 shells', ns, 1225);
  eq('census SEC4: 438,186 frozen twins', tot, 438186);
  eq('census SEC4: no empty shell, minimum 2', [empty, minPairs], [0, 2]);
}

// ============================================================================
console.log('\nSEC 4 — SEC 6(a): head vs the FROZEN sqrt(p)-level first survivor');
// ============================================================================
{
  let nz = 0, differ = 0, treadIn = 0;
  const bn = ['[7,100)', '[100,1000)', '[1000,3163)', '[3163,1e4)'];
  const bc = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];
  let hSumZ = 0, lnSumZ = 0, nB3 = 0;
  const headOf = [];
  for (const p of zonesP) {
    const x0 = isqrt(p);
    let aT = 0, aF = 0;
    for (let a = p + 1; a < SM - 2; a++) {
      if (!OPEN.has(a % 30)) continue;
      const La = lpf[a], Lb = lpf[a + 2];
      if (aF === 0 && (La === 0 || La > x0) && (Lb === 0 || Lb > x0)) aF = a;
      if (La === 0 && Lb === 0) { aT = a; break; }
    }
    ok(`head found at p=${p}`, aT > 0);
    nz++; headOf.push(aT - p);
    const bd = p < 100 ? 0 : p < 1000 ? 1 : p < 3163 ? 2 : 3;
    bc[bd][0]++;
    if (aF !== aT) { differ++; bc[bd][1]++; }
    // a tread q^2 inside the head window (p, aT+2]
    let tread = false;
    for (let q = x0 + 1; q * q <= aT + 2; q++) if (isP(q)) tread = true;
    if (tread) { treadIn++; bc[bd][2]++; }
    if (bd === 3) { nB3++; hSumZ += aT - p; lnSumZ += Math.log(p) ** 2; }
  }
  console.log(`  frozen-level test over ${nz} zones: identical in ${nz - differ} (${f2(100 * (nz - differ) / nz)}%); tread inside the head window in ${treadIn} zones, changes the head in ${differ}`);
  for (let i = 0; i < 4; i++) console.log(`    band ${bn[i]}: ${bc[i][1]} of ${bc[i][0]} differ (${f2(100 * bc[i][1] / bc[i][0])}%), tread present in ${bc[i][2]}`);
  eq('census SEC6(a): 1,184 of 1,225', [nz - differ, nz], [1184, 1225]);
  eq('census SEC6(a): tread present 105, changes 41', [treadIn, differ], [105, 41]);
  console.log(`  zone-head coefficient on band [3163,1e4): ${f4(hSumZ / lnSumZ)} ln^2 p over ${nB3} zones`);
}

// ============================================================================
console.log('\nSEC 5 — SEC 6(b): the renewal test, and the estimator');
// ============================================================================
{
  const wn = ['[7,1e4)', '[1e4,1e5)', '[1e5,1e6)', '[1e6,1e7)', '[1e7,1e8)'];
  const winOf = n => n < 1e4 ? 0 : n < 1e5 ? 1 : n < 1e6 ? 2 : n < 1e7 ? 3 : 4;
  const gN = [0, 0, 0, 0, 0], gS = [0, 0, 0, 0, 0], gS2 = [0, 0, 0, 0, 0], gL = [0, 0, 0, 0, 0];
  for (let i = 1; i < twins.length; i++) {
    const g = twins[i] - twins[i - 1], w = winOf(twins[i - 1]), l = Math.log(twins[i - 1]);
    gN[w]++; gS[w] += g; gS2[w] += g * g; gL[w] += l * l;
  }
  // heads by a two-pointer scan over the twin-opener array (different path)
  const hN = [0, 0, 0, 0, 0], hS = [0, 0, 0, 0, 0], hL = [0, 0, 0, 0, 0];
  const headMod30 = new Float64Array(30);
  const pCl = [], aCl = [];
  for (let w = 0; w < 5; w++) { pCl.push(new Float64Array(30)); aCl.push(new Float64Array(30)); }
  const last = twins[twins.length - 1];
  let j = 0, censored = 0;
  for (let n = 7; n <= N; n++) {
    if (comp[n]) continue;
    if (n >= last) { censored++; continue; }
    while (twins[j] <= n) j++;
    const a = twins[j], h = a - n, w = winOf(n);
    hN[w]++; hS[w] += h; hL[w] += Math.log(n) ** 2;
    headMod30[h % 30]++; pCl[w][n % 30]++; aCl[w][a % 30]++;
  }
  console.log('  window | meanGap g | R = E[g^2]/2E[g] | meanHead h | h/R | head coeff h/ln^2p');
  const HL = 1 / (2 * C2), MR = Math.exp(2 * GAMMA) / 4;
  const hr = [];
  for (let w = 0; w < 5; w++) {
    const R = gS2[w] / (2 * gS[w]), h = hS[w] / hN[w];
    hr.push(h / R);
    console.log(`    ${wn[w]}: g=${f3(gS[w] / gN[w])} | R=${f3(R)} | h=${f3(h)} | h/R=${f4(h / R)} | coeff ${f4(hS[w] / hL[w])} (${gN[w]} gaps, ${hN[w]} prime origins)`);
  }
  console.log(`  ${censored} primes past the last twin opener are censored`);
  // the coefficient estimator, on narrow half-decade bands: is 0.7064 -> 0.7344
  // a height trend, or range composition inside wide windows?
  {
    const edges = [1e3, 3.1623e3, 1e4, 3.1623e4, 1e5, 3.1623e5, 1e6, 3.1623e6, 1e7, 3.1623e7, 1e8];
    const hs = new Float64Array(edges.length - 1), ls = new Float64Array(edges.length - 1), ct = new Float64Array(edges.length - 1);
    let jp = 0;
    for (let n = 7; n <= N; n++) {
      if (comp[n]) continue; if (n >= last) break;
      while (twins[jp] <= n) jp++;
      const h = twins[jp] - n;
      let idx = -1;
      for (let e = 0; e < edges.length - 1; e++) if (n >= edges[e] && n < edges[e + 1]) { idx = e; break; }
      if (idx < 0) continue;
      hs[idx] += h; ls[idx] += Math.log(n) ** 2; ct[idx]++;
    }
    console.log('  head coefficient on HALF-DECADE bands (the same estimator, narrow ranges):');
    console.log('    ' + edges.slice(0, -1).map((e, i) => `${e.toExponential(1)}: ${f4(hs[i] / ls[i])}`).join('  '));
  }
  eq('census SEC6(b): h/R band values', hr.map(x => f4(x)), ['1.0924', '1.0780', '1.0416', '1.0347', '1.0254']);
  console.log(`  derived nulls: 1/(2 C2) = ${f4(HL)} (HL), e^{2gamma}/4 = ${f4(MR)}, product = ${f4(HL * MR)} = e^{2gamma}/(8 C2) (Mertens)`);
  ok('HL coefficient 0.7574', f4(HL) === '0.7574');
  ok('Mertens coefficient 0.6007', f4(HL * MR) === '0.6007');
  ok('ratio is e^{2gamma}/4', Math.abs((HL * MR) / HL - MR) < 1e-12);
  // ---- SEC 6(c) mod 30, pooled marginals vs per-window marginals -----------
  let tot = 0; for (let c = 0; c < 30; c++) tot += headMod30[c];
  const nullPool = new Float64Array(30), nullStrat = new Float64Array(30);
  const pAll = new Float64Array(30), aAll = new Float64Array(30);
  let settleAll = 0;
  for (let w = 0; w < 5; w++) for (let c = 0; c < 30; c++) { pAll[c] += pCl[w][c]; aAll[c] += aCl[w][c]; }
  for (let c = 0; c < 30; c++) settleAll += pAll[c];
  for (let c = 0; c < 30; c++) { let s = 0; for (let i = 0; i < 30; i++) s += (pAll[i] / settleAll) * (aAll[(i + c) % 30] / settleAll); nullPool[c] = s * tot; }
  for (let w = 0; w < 5; w++) {
    let sw = 0; for (let c = 0; c < 30; c++) sw += pCl[w][c];
    for (let c = 0; c < 30; c++) { let s = 0; for (let i = 0; i < 30; i++) s += (pCl[w][i] / sw) * (aCl[w][(i + c) % 30] / sw); nullStrat[c] += s * sw; }
  }
  const rows = [];
  for (let c = 0; c < 30; c++) if (headMod30[c] > 0) rows.push([c, headMod30[c] / nullPool[c], headMod30[c] / nullStrat[c]]);
  rows.sort((x, y) => Math.abs(y[1] - 1) - Math.abs(x[1] - 1));
  console.log(`  (c) head mod 30 over ${tot} heads — meas/null, pooled marginals then per-window marginals:`);
  console.log('      ' + rows.slice(0, 6).map(r => `${r[0]}: ${f3(r[1])} -> ${f3(r[2])}`).join('  '));
  const worstPool = Math.max(...rows.map(r => Math.abs(r[1] - 1)));
  const worstStrat = Math.max(...rows.map(r => Math.abs(r[2] - 1)));
  console.log(`  worst deviation: pooled ${f2(100 * worstPool)}%, per-window-stratified ${f2(100 * worstStrat)}% (the note quotes 7.4%)`);
}

// ============================================================================
console.log('\nSEC 6 — stretch-01 SEC C1: the QR kill law and the immune classes');
// ============================================================================
{
  for (const r of [7, 11, 13, 17, 19, 23, 29, 31]) {
    const qr = new Set(); for (let u = 1; u < r; u++) qr.add((u * u) % r);
    const isQR = a => { a = ((a % r) + r) % r; return a !== 0 && qr.has(a); };
    const immune = []; let inc = 0;
    for (let c = 0; c < r; c++) { const f = (isQR(-c) ? 2 : 0) + (isQR(-c - 2) ? 2 : 0); inc += f; if (f === 0) immune.push(c); }
    eq(`guardrail sum = 2(r-1) at r=${r}`, inc, 2 * (r - 1));
    if (r <= 13) console.log(`    r=${r}: immune classes {${immune.join(',')}} (${immune.length}/${r}); incidence ${inc} = 2(r-1)`);
  }
  // strengthening: at EVERY square anchor, r kills exactly 2 offset classes
  let allTwo = true;
  for (const r of [7, 11, 13, 17, 19, 23, 29, 31]) for (let q = r + 1; q <= 2000; q++) {
    if (!isP(q)) continue;
    const s = new Set(); for (let t = 0; t < r; t++) if ((q * q + t) % r === 0 || (q * q + t + 2) % r === 0) s.add(t);
    if (s.size !== 2) allTwo = false;
  }
  ok('every square anchor kills exactly 2 of r offset classes (so the ensemble mean is not the binding statement)', allTwo);
  console.log('    at every prime anchor q <= 2000 and every r in {7..31}: exactly 2 killed offset classes, deterministically');
  // immune classes never hit, checked by direct sieve of three whole stretches
  for (const q of [101, 1009, 9973]) {
    const qp = nextPrime(q), lo = q * q, hi = qp * qp;
    let viol = 0, tested = 0;
    for (const r of [7, 11, 13, 17, 19, 23, 29, 31]) {
      if (r >= q) continue;
      const qr = new Set(); for (let u = 1; u < r; u++) qr.add((u * u) % r);
      const isQR = a => { a = ((a % r) + r) % r; return a !== 0 && qr.has(a); };
      for (let c = 0; c < r; c++) {
        if ((isQR(-c) ? 2 : 0) + (isQR(-c - 2) ? 2 : 0) !== 0) continue;
        tested++;
        for (let t = c; lo + t < hi; t += r) { const a = lo + t; if (a % r === 0 || (a + 2) % r === 0) viol++; }
      }
    }
    console.log(`    anchor q=${q}: stretch [${lo},${hi}) width ${hi - lo}; ${tested} immune classes swept, r-kills inside them: ${viol}`);
    eq(`no immune-class kill at q=${q}`, viol, 0);
  }
}

// ============================================================================
console.log('\nSEC 7 — stretch-01 SEC 2: the A091592 arrow and its finite check');
// ============================================================================
{
  // A091592: n with no twin pair strictly inside (n^2, (n+1)^2)
  const exc = [];
  for (let n = 1; n <= 3000; n++) {
    let found = false;
    for (let a = n * n + 1; a + 2 < (n + 1) * (n + 1); a++) if (!comp[a] && !comp[a + 2]) { found = true; break; }
    if (!found) exc.push(n);
  }
  console.log(`  A091592 to n = 3000: ${exc.length} terms, last ${exc[exc.length - 1]} — [${exc.join(', ')}]`);
  eq('A091592 last term 122', exc[exc.length - 1], 122);
  // the finite check the chain needs: every S_q with q' - 1 <= 122 must be
  // verified directly, i.e. every prime q <= 113 whose stretch's top n-window
  // index is <= 122.  q = 113 has q' = 127 so it covers n = 123..126 and is
  // ALREADY covered by completeness; q = 109 is the last that is not.
  let lastNeeded = 0;
  for (let q = 2; q <= 200; q++) { if (!isP(q)) continue; const qp = nextPrime(q); if (qp - 1 <= 122) lastNeeded = q; }
  console.log(`  the largest prime q whose whole stretch lies inside the exceptional index range is q = ${lastNeeded} (note says the finite check is q <= 109)`);
  eq('finite check cutoff is 109', lastNeeded, 109);
  let unocc = [];
  for (let q = 2; q <= 113; q++) { if (!isP(q)) continue; const qp = nextPrime(q); let f = false; for (let a = q * q; a + 2 < qp * qp; a++) if (!comp[a] && !comp[a + 2]) { f = true; break; } if (!f) unocc.push(q); }
  console.log(`  direct occupancy of every stretch S_q, q prime <= 113: unoccupied ${unocc.length} [${unocc.join(',')}]`);
  eq('every stretch to q = 113 is occupied', unocc.length, 0);
}

// ============================================================================
console.log('\nSEC 8 — records-placement-01: the fractions, the bands, the power');
// ============================================================================
{
  const fs = require('fs');
  const src = fs.readFileSync('research/a113274-gap-records.js', 'utf8');
  const ex = name => { const m = src.match(new RegExp(name + String.raw` = \[([\s\S]*?)\];`)); return m[1].match(/\d+/g).map(BigInt); };
  const GAP = ex('GAP'), START = ex('START');
  eq('82 records extracted at runtime', [GAP.length, START.length], [82, 82]);
  const SPRIME = []; { const fl = new Uint8Array(16401); for (let p = 2; p * p <= 16400; p++) if (!fl[p]) for (let m = p * p; m <= 16400; m += p) fl[m] = 1; for (let n = 2; n <= 16400; n++) if (!fl[n]) SPRIME.push(n); }
  const isPrimeBig = n => { if (n < 2) return false; for (const p of SPRIME) { if (p * p > n) break; if (n % p === 0) return n === p; } return true; };
  const isqrtB = F => { let x = BigInt(Math.floor(Math.sqrt(Number(F)))); while (x * x > F) x--; while ((x + 1n) * (x + 1n) <= F) x++; return Number(x); };
  const frac = [];
  for (const F of START) {
    let q = isqrtB(F); while (q >= 2 && !isPrimeBig(q)) q--;
    let qp = q + 1; while (!isPrimeBig(qp)) qp++;
    const qB = BigInt(q), qpB = BigInt(qp);
    ok(`q^2 <= F < q'^2 at ${F}`, qB * qB <= F && F < qpB * qpB);
    frac.push(Number(F - qB * qB) / ((qp - q) * (qp + q)));
  }
  const m75 = frac.slice(0, 75).reduce((s, x) => s + x, 0) / 75;
  const fresh = frac.slice(75);
  const m7 = fresh.reduce((s, x) => s + x, 0) / 7;
  const m82 = frac.reduce((s, x) => s + x, 0) / 82;
  console.log(`  fresh fractions 76..82: ${fresh.map(x => f4(x)).join(', ')}`);
  console.log(`  75-record mean ${f4(m75)}; READ-1 mean-of-7 ${f4(m7)}; READ-3 pooled-82 ${f4(m82)}`);
  eq('records 76..82 fractions reproduce', fresh.map(x => f4(x)), ['0.5000', '0.5054', '0.3285', '0.6944', '0.0763', '0.8320', '0.2728']);
  eq('READ-1 / READ-3 / 75-mean reproduce', [f4(m7), f4(m82), f4(m75)], ['0.4585', '0.4773', '0.4790']);
  const outer = fresh.filter(x => x < 0.1 || x >= 0.9).length;
  console.log(`  READ-2 outer-decile count ${outer} (flag needs >= 4)`);
  eq('READ-2 count', outer, 1);
  // the sealed bands, re-derived from the prereg's own stated nulls
  const b1 = [0.5 - 2 / Math.sqrt(84), 0.5 + 2 / Math.sqrt(84)];
  const b3 = [0.5 - 2 / Math.sqrt(12 * 82), 0.5 + 2 / Math.sqrt(12 * 82)];
  let tail = 0; const ch = (n, k) => { let r = 1; for (let i = 0; i < k; i++) r = r * (n - i) / (i + 1); return r; };
  for (let k = 4; k <= 7; k++) tail += ch(7, k) * 0.2 ** k * 0.8 ** (7 - k);
  console.log(`  re-derived bands: READ-1 [${f3(b1[0])}, ${f3(b1[1])}] (sealed [0.282, 0.718]); READ-3 [${f3(b3[0])}, ${f3(b3[1])}] (sealed [0.436, 0.564]); READ-2 tail P(X>=4) = ${f4(tail)} (sealed 0.033)`);
  eq('sealed bands are exactly the prereg nulls, unmoved', [f3(b1[0]), f3(b1[1]), f3(b3[0]), f3(b3[1])], ['0.282', '0.718', '0.436', '0.564']);
  // POWER OF READ-3: the seven fresh fractions live in [0,1). What pooled
  // means are reachable at all?
  const s75 = frac.slice(0, 75).reduce((s, x) => s + x, 0);
  const lo82 = (s75 + 0) / 82, hi82 = (s75 + 7) / 82;
  console.log(`  READ-3 reachable range over ALL possible fresh data: [${f4(lo82)}, ${f4(hi82)}] against band [${f3(b3[0])}, ${f3(b3[1])}]`);
  const canFire = lo82 < b3[0] || hi82 > b3[1];
  console.log(`  => READ-3 could fire: ${canFire}. It is ${canFire ? 'a test' : 'VACUOUS: no assignment of the seven fractions could have moved it outside its band'}`);
  ok('READ-3 is vacuous (this is the finding, not a failure)', !canFire);
  // and how far a READ-1 shift could reach
  console.log(`  READ-1 reachable range: [0.0000, 1.0000] against band [${f3(b1[0])}, ${f3(b1[1])}] => READ-1 has power`);
  // decade arithmetic
  const dec = new Map();
  for (let i = 0; i < 82; i++) { const d = Math.floor(Math.log10(Number(START[i]))); dec.set(d, (dec.get(d) || 0) + 1); }
  const freshDec = new Set(); for (let i = 75; i < 82; i++) freshDec.add(Math.floor(Math.log10(Number(START[i]))));
  console.log(`  record-start decades occupied by all 82 records: ${[...dec.keys()].sort((a, b) => a - b).map(d => `1e${d}:${dec.get(d)}`).join(' ')}`);
  console.log(`  the seven fresh records occupy decade(s) {${[...freshDec].map(d => '1e' + d).join(',')}} — ${freshDec.size} decade, and extend the reach 2.8e15 -> 7.05e16 = ${f2(Math.log10(7.05e16 / 2.8e15))} decades`);
  eq('all seven fresh records sit in one decade', freshDec.size, 1);
  console.log(`  stretch-01 §3 "six decades past the sweep": direct sieve 1e8 -> straddle certificate 9.007e15 is ${f2(Math.log10(9.007e15 / 1e8))} decades; against the 1e11 zone sweep it is ${f2(Math.log10(9.007e15 / 1e11))}`);
}

console.log(`\nelapsed ${((Date.now() - T0) / 1000).toFixed(1)} s`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0828-census.js
//   invocation:  node research/history/staging/redteam-0828-census.js
//   code-sha256: 97c9480981bbb2c9bb95e403d0f3650579e814b7d4317b21fc97e24dd0221283
//   out-sha256:  ee8809c3935fc563863bfcaeb0923894c4d4b43cab280730ec33eb210ec9af24
//   body-lines:  75
//   inputs:      research/a113274-gap-records.js@b64796044e4b
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     2.8 s
// ============================================================================
// SEC 0 — ENGINES
//   primality sieve to 100000000 and exact lpf to 200000 built, 0.4 s
//   channel pairs a in [11,1e8]: 9999999; channel twins: 440310
//
// SEC 1 — THE DESTROYER CONVENTION: position-time vs fold-activation
//   openers 11..1e7: destroyed 941021, both-composite 560657
//   the two conventions name a DIFFERENT destroyer on 280288 pairs = 29.79% of all destroyed, 49.99% of both-composite
//   share of q = 7 as destroyer: position-time 19.60%, fold-activation 30.36%
//
// SEC 2 — THE ZONE CERTIFICATE B(p) vs C(p), re-derived by prefix counts
//   zones p = 7..9967: 1225
//     p=7: C=11 B=3 C-B=8 T=8 => CERT (TIGHT)
//     p=61: C=442 B=441 C-B=1 T=110 => CERT
//     p=67: C=497 B=503 C-B=-6 T=121 => no
//   certificate holds at 15 zones, p = 7..61: forced counts [8, 8, 15, 13, 17, 20, 19, 20, 22, 19, 20, 18, 12, 10, 1]
//   first death at p = 67; last certified p = 61; revivals after a death: 0
//   B/C band means: 0.8528 / 1.3218 / 1.4663 / 1.5419
//   closed form B/C = 2 - 15/(4 ln p): density crossover at ln p = 3.75, p* = 42.52; note says 42.52
//   a-priori CRT main term 2(1 - prod_{7<=q<=p}(1-1/q)) first reaches 1 at p = 61; note says 59
//   (the producer's OUTPUT says "stays < 1 up to p = 59"; that is the last p BELOW 1, and the crossing is at 61)
//
// SEC 3 — THE FREEZE SHELLS, re-derived
//   1225 shells to 1e8: frozen twins 438186; empty shells 0; minimum 2 pairs (first at p = 11)
//
// SEC 4 — SEC 6(a): head vs the FROZEN sqrt(p)-level first survivor
//   frozen-level test over 1225 zones: identical in 1184 (96.65%); tread inside the head window in 105 zones, changes the head in 41
//     band [7,100): 2 of 22 differ (9.09%), tread present in 7
//     band [100,1000): 9 of 143 differ (6.29%), tread present in 30
//     band [1000,3163): 16 of 278 differ (5.76%), tread present in 23
//     band [3163,1e4): 14 of 782 differ (1.79%), tread present in 45
//   zone-head coefficient on band [3163,1e4): 0.6693 ln^2 p over 782 zones
//
// SEC 5 — SEC 6(b): the renewal test, and the estimator
//   window | meanGap g | R = E[g^2]/2E[g] | meanHead h | h/R | head coeff h/ln^2p
//     [7,1e4): g=49.241 | R=42.929 | h=46.896 | h/R=1.0924 | coeff 0.7064 (203 gaps, 1226 prime origins)
//     [1e4,1e5): g=88.463 | R=76.990 | h=82.994 | h/R=1.0780 | coeff 0.7177 (1019 gaps, 8363 prime origins)
//     [1e5,1e6): g=129.573 | R=118.438 | h=123.368 | h/R=1.0416 | coeff 0.7236 (6945 gaps, 68906 prime origins)
//     [1e6,1e7): g=177.129 | R=164.022 | h=169.718 | h/R=1.0347 | coeff 0.7192 (50811 gaps, 586081 prime origins)
//     [1e7,1e8): g=236.014 | R=223.520 | h=229.199 | h/R=1.0254 | coeff 0.7344 (381331 gaps, 5096856 prime origins)
//   20 primes past the last twin opener are censored
//   head coefficient on HALF-DECADE bands (the same estimator, narrow ranges):
//     1.0e+3: 0.7494  3.2e+3: 0.6689  1.0e+4: 0.7526  3.2e+4: 0.7079  1.0e+5: 0.7250  3.2e+5: 0.7232  1.0e+6: 0.7160  3.2e+6: 0.7201  1.0e+7: 0.7336  3.2e+7: 0.7346
//   derived nulls: 1/(2 C2) = 0.7574 (HL), e^{2gamma}/4 = 0.7931, product = 0.6007 = e^{2gamma}/(8 C2) (Mertens)
//   (c) head mod 30 over 5761432 heads — meas/null, pooled marginals then per-window marginals:
//       12: 1.074 -> 1.074  0: 0.927 -> 0.927  6: 1.053 -> 1.053  28: 0.950 -> 0.950  4: 1.044 -> 1.044  10: 1.036 -> 1.036
//   worst deviation: pooled 7.41%, per-window-stratified 7.41% (the note quotes 7.4%)
//
// SEC 6 — stretch-01 SEC C1: the QR kill law and the immune classes
//     r=7: immune classes {0,2} (2/7); incidence 12 = 2(r-1)
//     r=11: immune classes {1,3,9} (3/11); incidence 20 = 2(r-1)
//     r=13: immune classes {0,5,6,11} (4/13); incidence 24 = 2(r-1)
//     at every prime anchor q <= 2000 and every r in {7..31}: exactly 2 killed offset classes, deterministically
//     anchor q=101: stretch [10201,10609) width 408; 40 immune classes swept, r-kills inside them: 0
//     anchor q=1009: stretch [1018081,1026169) width 8088; 40 immune classes swept, r-kills inside them: 0
//     anchor q=9973: stretch [99460729,100140049) width 679320; 40 immune classes swept, r-kills inside them: 0
//
// SEC 7 — stretch-01 SEC 2: the A091592 arrow and its finite check
//   A091592 to n = 3000: 12 terms, last 122 — [1, 9, 19, 26, 27, 30, 34, 39, 49, 53, 77, 122]
//   the largest prime q whose whole stretch lies inside the exceptional index range is q = 109 (note says the finite check is q <= 109)
//   direct occupancy of every stretch S_q, q prime <= 113: unoccupied 0 []
//
// SEC 8 — records-placement-01: the fractions, the bands, the power
//   fresh fractions 76..82: 0.5000, 0.5054, 0.3285, 0.6944, 0.0763, 0.8320, 0.2728
//   75-record mean 0.4790; READ-1 mean-of-7 0.4585; READ-3 pooled-82 0.4773
//   READ-2 outer-decile count 1 (flag needs >= 4)
//   re-derived bands: READ-1 [0.282, 0.718] (sealed [0.282, 0.718]); READ-3 [0.436, 0.564] (sealed [0.436, 0.564]); READ-2 tail P(X>=4) = 0.0333 (sealed 0.033)
//   READ-3 reachable range over ALL possible fresh data: [0.4381, 0.5235] against band [0.436, 0.564]
//   => READ-3 could fire: false. It is VACUOUS: no assignment of the seven fractions could have moved it outside its band
//   READ-1 reachable range: [0.0000, 1.0000] against band [0.282, 0.718] => READ-1 has power
//   record-start decades occupied by all 82 records: 1e0:2 1e1:3 1e2:3 1e3:2 1e4:4 1e5:4 1e6:3 1e7:5 1e8:6 1e9:2 1e10:7 1e11:8 1e12:6 1e13:10 1e14:6 1e15:4 1e16:7
//   the seven fresh records occupy decade(s) {1e16} — 1 decade, and extend the reach 2.8e15 -> 7.05e16 = 1.40 decades
//   stretch-01 §3 "six decades past the sweep": direct sieve 1e8 -> straddle certificate 9.007e15 is 7.95 decades; against the 1e11 zone sweep it is 4.95
//
// elapsed 2.7 s
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================================
// 1. Every decisive number in destroyer-census-01.md SEC 3, SEC 4 and SEC 6
//    reproduces exactly on this independent engine.
// 2. The census's destroyer convention is POSITIONAL, not temporal: the two
//    conventions name a different destroyer on 49.99% of both-composite pairs.
// 3. records-placement-01.md's READ-3 could not have fired on any possible
//    seven fresh fractions. It is vacuous as a test.
// ============================================================================
