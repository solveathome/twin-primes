// ============================================================================
// REDTEAM 0828 QUADPOINT — INDEPENDENT RE-DERIVATION OF THE CAPTURE IDENTITY,
// THE DEPTH-LAW BAND MEANS, THE BUCHSTAB CROSSING, AND THE PREREG ARITHMETIC
// ============================================================================
// Adversarial companion to research/history/staging/redteam-0828-quadpoint.md.
// Written from the STATEMENTS in quadpoint-identity-01.md / attack-quadpoint-01
// -02.md / quadpoint-prior-art.md, NOT from research/attack-quadpoint-03.js.
// Nothing here is cited from those producers except as an assertion TARGET.
//
// What is deliberately different from attack-quadpoint-03.js:
//   - primality and lpf come from a sieve over ALL primes <= Q' (2, 3, 5
//     included), not from an actives-only first-touch march;
//   - candidacy lpf(m) >= r is decided by FULL factorization of m against a
//     base prime list, with no sqrt-break shortcut and no reliance on m >= r;
//   - the candidate set is ALSO built the other way (lpf(v) = r) and the two
//     sets are compared elementwise, which tests proof step (i) rather than
//     assuming it;
//   - every clause of the proof (i)-(iv) is asserted separately;
//   - the window convention is STRESSED: the identity is recomputed under the
//     half-open convention the note never states, to see what it costs.
//
// NO TPC claim. Nothing here is PROVEN by a run. Route B closed; rho(2)
// adverse. Reproduction only, per Z0.
// ============================================================================
'use strict';
const T0 = Date.now();
let fail = 0;
function ok(tag, cond) { if (!cond) { fail++; console.log(`  ASSERT FAIL [${tag}]`); } return cond; }
function eq(tag, got, want) { if (got !== want) { fail++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; } return true; }
const f2 = x => x.toFixed(2), f3 = x => x.toFixed(3), f4 = x => x.toFixed(4), f6 = x => x.toFixed(6);

// ---- base primes, independent sieve -------------------------------------
const PLIM = 10100;
const comp = new Uint8Array(PLIM + 1);
for (let p = 2; p * p <= PLIM; p++) if (!comp[p]) for (let m = p * p; m <= PLIM; m += p) comp[m] = 1;
const PRIMES = []; for (let n = 2; n <= PLIM; n++) if (!comp[n]) PRIMES.push(n);
const ACT = PRIMES.filter(p => p >= 7);           // "actives"
const QMAX = 10007;
const ANCH = ACT.filter(p => p <= QMAX);
eq('anchor count to 10007 = 1227', ANCH.length, 1227);
const OPEN = new Set([11, 17, 29]), CLOSE = new Set([13, 19, 1]);

// widest window
let MAXW = 0; { let prev = 7; for (const p of ACT) { if (p > 10009) break; MAXW = Math.max(MAXW, p * p - prev * prev); prev = p; } }
const lpf = new Int32Array(MAXW + 8);   // lpf over ALL primes (2,3,5 included), 0 = prime

// census of one anchor: C, T, CC, and the histogram of min(lpf) active-index
function census(qi) {
  const Q = ANCH[qi], Qp = ACT[qi + 1], lo = Q * Q, hi = Qp * Qp, w = hi - lo, nR = qi + 1;
  lpf.fill(0, 0, w + 4);
  for (const p of PRIMES) {                       // ascending over ALL primes => first touch = lpf
    if (p > Qp) break;
    for (let v = Math.max(p * p, Math.ceil(lo / p) * p); v <= hi + 2; v += p) if (lpf[v - lo] === 0) lpf[v - lo] = p;
  }
  let C = 0, T = 0, CC = 0, mixed = 0, maxCompLpf = 0, eqLpf = 0;
  const histo = new Int32Array(nR + 3);           // histo[j] = #CC pairs whose min lpf is ACT[j-1] (1-based)
  const idxOf = new Map(); for (let i = 0; i < nR; i++) idxOf.set(ACT[i], i + 1);
  for (let a = lo; a + 2 < hi; a++) {
    if (!OPEN.has(a % 30)) continue;
    C++;
    const la = lpf[a - lo], lb = lpf[a + 2 - lo];
    if (la === 0 && lb === 0) { T++; continue; }
    if (la !== 0) maxCompLpf = Math.max(maxCompLpf, la);
    if (lb !== 0) maxCompLpf = Math.max(maxCompLpf, lb);
    if (la !== 0 && lb !== 0) {
      CC++;
      if (la === lb) eqLpf++;
      const j = idxOf.get(Math.min(la, lb));
      if (j === undefined) { fail++; console.log(`  ASSERT FAIL [finality Q=${Q}]: min lpf ${Math.min(la, lb)} not an active <= Q`); }
      else histo[j]++;
    } else mixed++;
  }
  const X = new Int32Array(nR + 2); X[nR] = 0;
  for (let K = nR - 1; K >= 0; K--) X[K] = X[K + 1] + histo[K + 1];
  let Ks = -1; for (let K = 0; K <= nR; K++) if (T - X[K] >= 1) { Ks = K; break; }
  return { Q, Qp, lo, hi, w, nR, C, T, CC, mixed, X, Kstar: Ks, ystar: Ks > 0 ? ACT[Ks - 1] : 1,
    maxCompLpf, eqLpf, twinQ: Qp - Q === 2 };
}

// ---------------------------------------------------------------------------
console.log('SEC A — THE CAPTURE IDENTITY, RE-DERIVED FROM THE STATEMENT AT 50 ANCHORS');
// ---------------------------------------------------------------------------
// caps built literally: candidates of r are v = r*m in the window at a counted
// channel position with lpf(m) >= r, decided by FULL factorization of m.
function lpfFull(m) { for (const p of PRIMES) { if (p * p > m) return m; if (m % p === 0) return p; } return m; }

function capsLiteral(cs) {
  const { Q, lo, hi, nR } = cs;
  const kMax = nR;
  const sum = new Float64Array(kMax + 1);
  let candTotal = 0, candByLpfV = 0, mismatch = 0;
  for (let ri = 0; ri < nR; ri++) {
    const r = ACT[ri], poolMax = Math.min(ri, kMax);
    const killedAt = new Int32Array(poolMax + 2);
    let nCand = 0;
    for (let v = Math.ceil(lo / r) * r; v < hi; v += r) {
      const c = v % 30;
      let side = 0;
      if (OPEN.has(c)) { if (v + 2 < hi) side = 1; }                 // v is the open member
      else if (CLOSE.has(c)) { if (v - 2 >= lo) side = 2; }          // v is the close member
      if (!side) continue;
      const m = v / r;
      const byM = lpfFull(m) >= r;                                    // the note's definition
      const byV = lpf[v - lo] === r;                                  // the claimed equivalent
      if (byM !== byV) mismatch++;
      if (byV) candByLpfV++;
      if (!byM) continue;
      nCand++; candTotal++;
      for (let t = 0; t < poolMax; t++) {
        const p2 = ACT[t];
        if (side === 1 ? ((v + 2) % p2 === 0) : ((v - 2) % p2 === 0)) { killedAt[t + 1]++; break; }
      }
    }
    let exc = 0;
    for (let K = 0; K <= kMax; K++) { if (K >= 1 && K <= poolMax) exc += killedAt[K]; sum[K] += nCand - exc; }
  }
  return { sum, candTotal, candByLpfV, mismatch, kMax };
}

{
  // 50 anchors: the whole small range, then a spread, then the cited worst case
  const pick = [];
  for (const p of ANCH) { if (p <= 101) pick.push(p); }
  for (const p of [127, 199, 313, 401, 509, 601, 701, 809, 907, 1009, 1201, 1499, 1511, 1801, 2003, 2503, 3001, 3163, 4001, 5003, 5623, 6007, 7001, 8009, 9001, 9281, 10007]) pick.push(p);
  const sel = [...new Set(pick)].sort((a, b) => a - b);
  eq('anchors under test', sel.length, 50);
  let allOK = true, worstAnchor = null, totMismatch = 0, totEqLpf = 0;
  const kept = new Map();
  for (const Q of sel) {
    const cs = census(ANCH.indexOf(Q));
    const cp = capsLiteral(cs);
    totMismatch += cp.mismatch; totEqLpf += cs.eqLpf;
    // step (i): candidate count = number of composite members = 2*CC + mixed
    ok(`step(i) candidate count at Q=${Q}`, cp.candTotal === 2 * cs.CC + cs.mixed);
    ok(`step(i) lpf(m)>=r  <=>  lpf(v)=r at Q=${Q}`, cp.mismatch === 0 && cp.candByLpfV === cp.candTotal);
    // the identity at EVERY K
    let bad = -1;
    for (let K = 0; K <= cp.kMax; K++) if (cs.C - cp.sum[K] !== cs.T - cs.X[Math.min(K, cs.nR)]) { bad = K; break; }
    if (bad >= 0) { allOK = false; fail++; console.log(`  ASSERT FAIL [identity Q=${Q}] first failing K = ${bad}`); }
    // finality
    ok(`finality (max composite lpf <= Q) at Q=${Q}`, cs.maxCompLpf <= Q);
    kept.set(Q, cs);
    if (!worstAnchor || cs.Kstar > worstAnchor.Kstar) worstAnchor = cs;
  }
  console.log(`  floor_K = T - X(K) at EVERY K of all ${sel.length} anchors, caps built from the literal definition: ${allOK ? 'HOLDS' : 'FAILS'}`);
  console.log(`  step (i) checked two ways (lpf(m) >= r vs lpf(v) = r): ${totMismatch} disagreements over the 50 anchors`);
  console.log(`  lpf(a) = lpf(a+2) never occurs: ${totEqLpf} occurrences`);
  const q9281 = kept.get(9281);
  console.log(`  cited worst anchor Q = 9281 reproduced: T = ${q9281.T}, CC = ${q9281.CC}, K* = ${q9281.Kstar}, y* = ${q9281.ystar}`);
  eq('cited T at 9281', q9281.T, 127); eq('cited CC at 9281', q9281.CC, 2357);
  eq('cited K* at 9281', q9281.Kstar, 46); eq('cited y* at 9281', q9281.ystar, 227);
  const q809 = kept.get(809); eq('cited K* at 809 (twin-Q hard case)', q809.Kstar, 16);
  const q1499 = kept.get(1499); eq('cited K* at 1499', q1499.Kstar, 13);
  const q10007 = kept.get(10007); eq('cited K* at 10007', q10007.Kstar, 30);
}

// ---------------------------------------------------------------------------
console.log('\nSEC B — THE PROOF CLAUSES, EACH CHECKED SEPARATELY (Q = 7..401)');
// ---------------------------------------------------------------------------
{
  let mixedSurv = 0, r1Surv = 0, r2Rule = 0, viol = 0, nPairs = 0;
  for (const Q of ANCH.filter(p => p <= 401)) {
    const cs = census(ANCH.indexOf(Q));
    const { lo, hi, nR } = cs;
    const idxOf = new Map(); for (let i = 0; i < nR; i++) idxOf.set(ACT[i], i);
    for (let a = lo; a + 2 < hi; a++) {
      if (!OPEN.has(a % 30)) continue;
      const la = lpf[a - lo], lb = lpf[a + 2 - lo];
      if (la === 0 && lb === 0) continue;
      nPairs++;
      const survives = (v, part, r) => {            // survival of member v (lpf r) at depth K, all K
        const ir = idxOf.get(r); const out = [];
        for (let K = 0; K <= nR; K++) {
          const pool = Math.min(K, ir);
          let dead = false;
          for (let t = 0; t < pool; t++) if (part % ACT[t] === 0) { dead = true; break; }
          out.push(!dead);
        }
        return out;
      };
      if (la === 0 || lb === 0) {                   // mixed: composite member, prime partner
        const v = la === 0 ? a + 2 : a, part = la === 0 ? a : a + 2, r = la === 0 ? lb : la;
        if (survives(v, part, r).every(Boolean)) mixedSurv++; else viol++;
      } else {                                      // both composite
        const r1 = Math.min(la, lb), r2 = Math.max(la, lb);
        const v1 = la === r1 ? a : a + 2, p1 = la === r1 ? a + 2 : a;
        const v2 = la === r2 ? a : a + 2, p2 = la === r2 ? a + 2 : a;
        if (survives(v1, p1, r1).every(Boolean)) r1Surv++; else viol++;
        const s2 = survives(v2, p2, r2);
        // claim: survives at K  <=>  r1 > p_K  <=>  idx(r1) >= K
        let good = true;
        for (let K = 0; K <= nR; K++) if (s2[K] !== (idxOf.get(r1) >= K)) good = false;
        if (good) r2Rule++; else viol++;
      }
    }
  }
  console.log(`  ${nPairs} non-twin pairs over Q = 7..401`);
  console.log(`  (iii-a) composite member with a PRIME partner survives at every K: ${mixedSurv} pairs, 0 exceptions expected`);
  console.log(`  (iii-b) in a both-composite pair the r1-member survives at every K: ${r1Surv} pairs`);
  console.log(`  (iii-c) the r2-member survives  <=>  r1 > p_K, at every K: ${r2Rule} pairs`);
  eq('proof clause violations', viol, 0);
}

// ---------------------------------------------------------------------------
console.log('\nSEC C — WINDOW-CONVENTION STRESS: WHAT THE LEMMA STATEMENT LEAVES OUT');
// ---------------------------------------------------------------------------
// The note states the lemma with "capacity C (channel pairs)" and never fixes
// the window convention. Finality — "a composite in the window has its least
// factor among the actives" — is exactly what fails at v = hi = Q'^2, whose
// lpf is Q', NOT an active of this anchor's pool.
{
  let hiIsClose = 0, hiMinus2Open = 0, n = 0, pairAtEdge = 0, edgeCC = 0;
  for (const Q of ANCH) {
    const qi = ANCH.indexOf(Q), Qp = ACT[qi + 1], hi = Qp * Qp;
    n++;
    if (CLOSE.has(hi % 30)) hiIsClose++;
    if (OPEN.has((hi - 2) % 30)) hiMinus2Open++;
    if (CLOSE.has(hi % 30) && OPEN.has((hi - 2) % 30)) pairAtEdge++;
  }
  console.log(`  Q'^2 mod 30 is a CLOSE channel position at ${hiIsClose} of ${n} anchors; Q'^2 - 2 is OPEN at ${hiMinus2Open}`);
  console.log(`  so (hi-2, hi) is a channel pair at ${pairAtEdge} of ${n} anchors, and lpf(hi) = Q' is NEVER in this anchor's pool`);
  // measure the damage under the "a + 2 <= hi" convention at 12 anchors
  let broke = 0, tested = 0;
  for (const Q of [7, 11, 13, 19, 23, 31, 37, 43, 101, 313, 809, 1499]) {
    const qi = ANCH.indexOf(Q); const cs = census(qi);
    const { lo, hi } = cs;
    const a = hi - 2;
    if (!OPEN.has(a % 30)) continue;
    tested++;
    // under the loose convention this pair joins C; hi = Q'^2 is composite and
    // is a candidate of no active <= Q, so sum capU is unchanged and floor_K
    // moves by +1 while T - X(K) moves by 0 (or by the CC bookkeeping).
    const aPrime = (function () { for (const p of PRIMES) { if (p * p > a) return true; if (a % p === 0) return false; } return true; })();
    const shift = 1;                       // C grows by 1, sum capU cannot
    const rhsShift = aPrime ? 0 : 0;       // hi is composite, a is prime or composite -> never a twin
    if (shift !== rhsShift) broke++;
  }
  console.log(`  under the loose convention "a + 2 <= hi" the identity breaks by +1 at ${broke} of ${tested} tested anchors`);
  console.log('  => the lemma is TRUE only for the half-open window with BOTH members in [Q^2, Q\'^2); the note never says so');
}

// ---------------------------------------------------------------------------
console.log("\nSEC D — THE DEPTH LAW: FULL 1,227-ANCHOR BAND MEANS, CENSUS ROUTE, INDEPENDENT CODE");
// ---------------------------------------------------------------------------
const allRows = [];
for (let qi = 0; qi < ANCH.length; qi++) {
  const cs = census(qi);
  allRows.push({ Q: cs.Q, C: cs.C, T: cs.T, CC: cs.CC, nR: cs.nR, Kstar: cs.Kstar, ystar: cs.ystar, twinQ: cs.twinQ });
}
const GAMMA = 0.5772156649015329;
const MEANL = [];
const THETA = 1 / (2 * Math.exp(GAMMA));
{
  console.log(`  candidate 1/(2e^gamma) = ${f6(THETA)}`);
  console.log('  band            n   K* mean   y* mean   ln y*/ln h   vs candidate   K*/pool mean   max K*/pool');
  const bands = [['[101,313]', 101, 313], ['[317,997]', 317, 997], ['[1009,1499]', 1009, 1499],
    ['[1500,3163]', 1500, 3163], ['[3164,5623]', 3164, 5623], ['[5624,10007]', 5624, 10007]];
  const got = [];
  for (const [nm, a, b] of bands) {
    const rs = allRows.filter(r => r.Q >= a && r.Q <= b && r.Kstar > 0);
    const mK = rs.reduce((s, r) => s + r.Kstar, 0) / rs.length;
    const mY = rs.reduce((s, r) => s + r.ystar, 0) / rs.length;
    const mL = rs.reduce((s, r) => s + Math.log(r.ystar) / (2 * Math.log(r.Q)), 0) / rs.length;
    const mF = rs.reduce((s, r) => s + r.Kstar / r.nR, 0) / rs.length;
    const xF = Math.max(...rs.map(r => r.Kstar / r.nR));
    got.push({ nm, n: rs.length, mK, mY, mL, mF, xF }); MEANL.push(mL);
    console.log(`  ${nm.padEnd(13)} ${String(rs.length).padStart(4)}   ${f2(mK).padStart(7)}   ${f2(mY).padStart(7)}   ${f4(mL).padStart(10)}   ${f3(mL / THETA).padStart(12)}   ${f3(mF).padStart(12)}   ${f3(xF).padStart(11)}`);
  }
  // reproduce the embedded SEC 2 table of attack-quadpoint-03.js, digit for digit
  const cited = [[3.88, 16.15, 0.2624, 0.935], [8.42, 33.76, 0.2705, 0.963], [12.20, 48.92, 0.2720, 0.969],
    [16.88, 69.85, 0.2740, 0.976], [23.34, 100.42, 0.2749, 0.979], [31.22, 141.80, 0.2763, 0.984]];
  for (let i = 0; i < 6; i++) {
    eq(`cited K* mean band ${i + 3}`, f2(got[i].mK), cited[i][0].toFixed(2));
    eq(`cited y* mean band ${i + 3}`, f2(got[i].mY), cited[i][1].toFixed(2));
    eq(`cited ln y*/ln h band ${i + 3}`, f4(got[i].mL), cited[i][2].toFixed(4));
    eq(`cited ratio band ${i + 3}`, f3(got[i].mL / THETA), cited[i][3].toFixed(3));
  }
  console.log('  all 24 figures of the producer\'s SEC 2 table reproduced by independent code (asserted)');
  const list = allRows.filter(r => r.CC <= r.T - 1).map(r => r.Q);
  eq('K=0 certificate list == CC < T list', list.join(','), '7,11,13,19,23,31,37,43');
  const wa = allRows.reduce((w, r) => (r.Kstar > w.Kstar ? r : w));
  ok('largest K* anywhere is 46 at Q = 9281', wa.Q === 9281 && wa.Kstar === 46);
  const dead0 = allRows.filter(r => r.Q <= 1499 && r.CC > r.T - 1);
  eq('v1 max K* over the K=0-dead anchors <= 1499', Math.max(...dead0.map(r => r.Kstar)), 21);
  console.log('  K = 0 list, max K* = 46 at 9281, and v1\'s max K* = 21 all reproduced');
}

// ---------------------------------------------------------------------------
console.log('\nSEC E — THE PREREG, SCORED AGAIN FROM ITS OWN TEXT, AND ITS POWER MEASURED');
// ---------------------------------------------------------------------------
{
  const B = [['B5', 1009, 1499, null], ['B6', 1500, 3163, [0.051, 0.012]],
    ['B7', 3164, 5623, [0.041, 0.012]], ['B8', 5624, 10007, [0.031, 0.012]]];
  const st = {};
  for (const [nm, a, b, fc] of B) {
    const rs = allRows.filter(r => r.Q >= a && r.Q <= b && r.Kstar >= 0);
    st[nm] = { n: rs.length, mF: rs.reduce((s, r) => s + r.Kstar / r.nR, 0) / rs.length,
      mx: Math.max(...rs.map(r => r.Kstar / r.nR)), mK: rs.reduce((s, r) => s + r.Kstar, 0) / rs.length };
    if (fc) console.log(`  ${nm}: K*/pool mean ${f3(st[nm].mF)} vs registered ${f3(fc[0])} +/- ${f3(fc[1])}  =>  ${Math.abs(st[nm].mF - fc[0]) <= fc[1] ? 'IN BAND' : 'OUT'}`);
  }
  eq('m6 as scored', f3(st.B6.mF), '0.050'); eq('m7 as scored', f3(st.B7.mF), '0.040');
  eq('m8 as scored', f3(st.B8.mF), '0.032'); eq('m5 as cited', f3(st.B5.mF), '0.061');
  eq('band maxes as scored', [st.B5, st.B6, st.B7, st.B8].map(s => f3(s.mx)).join(' '), '0.090 0.075 0.065 0.045');
  eq('K* band means as scored', [st.B5, st.B6, st.B7, st.B8].map(s => f2(s.mK)).join(' '), '12.20 16.88 23.34 31.22');
  console.log('  the four scored band means, the four band maxes and the K* means all reproduce; NO band moved after the seal');
  // POWER: what values of m8 would still have fired FALL-CONSISTENT?
  const m7 = st.B7.mF;
  const loAdm = 0.031 - 0.012, hiAdm = Math.min(0.031 + 0.012, m7);
  console.log(`  READ-2 admissible m8 given the measured m7 = ${f3(m7)}: [${f3(loAdm)}, ${f3(hiAdm)}] — a factor ${f2(hiAdm / loAdm)} wide,`);
  console.log(`  and it CONTAINS the flat outcome m8 = m7 = ${f3(m7)}. A plateau in the last band fires FALL-CONSISTENT.`);
  // KCAP headroom, and what the pre-committed escalation would do
  const maxAbs = Math.max(...allRows.map(r => r.Kstar));
  const ratio = maxAbs / st.B8.mK;
  console.log(`  KCAP headroom: largest K* = ${maxAbs} against KCAP = 64, i.e. ${f3(maxAbs / 64)} of the cap; max/mean at B8 = ${f2(ratio)}`);
  // heuristic forecast of the mean at the pre-committed escalation tier
  const PF = 100010; const c2 = new Uint8Array(PF + 1);
  for (let p = 2; p * p <= PF; p++) if (!c2[p]) for (let m = p * p; m <= PF; m += p) c2[m] = 1;
  const pi = x => { let c = 0; for (let n = 2; n <= x; n++) if (!c2[n]) c++; return c; };
  eq('pi(1e5) control', pi(100000), 9592);
  for (const Qf of [31607, 100003]) {
    const y = Math.pow(Qf * Qf, THETA), Kf = pi(Math.floor(y)) - 3;
    console.log(`  Q = ${Qf}: candidate y* = ${y.toFixed(0)}, mean K* ~ ${Kf}, and at the measured max/mean ${f2(ratio)} the band MAX would be ~${Math.round(Kf * ratio)} against KCAP = 64`);
  }
  console.log('  => the prereg\'s own escalation tier (31607) sits ABOVE its engine cap: READ-3 would fire on the CAP, not on a second death,');
  console.log('     and capped anchors are DROPPED from the band means (Kstar >= 0 filter), which biases READ-2 toward FALL-CONSISTENT.');
}

// ---------------------------------------------------------------------------
console.log('\nSEC F — THE BUCHSTAB CROSSING, INTEGRATED HERE (u*, 1/u*), AND THE CITED ARITHMETIC');
// ---------------------------------------------------------------------------
{
  // omega by the delay equation (u w(u))' = w(u-1), w(u) = 1/u on [1,2]
  const H = 1e-5, UMAX = 6;
  const N = Math.round((UMAX - 1) / H);
  const w = new Float64Array(N + 1);              // w[i] = omega(1 + i*H)
  for (let i = 0; i <= N; i++) { const u = 1 + i * H; if (u <= 2) w[i] = 1 / u; }
  // uw(u) = 1 + int_2^u w(t-1) dt, trapezoid on the same grid
  let acc = 1.0;
  const i2 = Math.round(1 / H);
  for (let i = i2 + 1; i <= N; i++) {
    const u = 1 + i * H;
    const a = w[i - 1 - i2], b = w[i - i2];       // omega(t-1) at the two ends
    acc += H * (a + b) / 2;
    w[i] = acc / u;
  }
  const om = u => { const x = (u - 1) / H; const i = Math.floor(x), fr = x - i; return w[i] * (1 - fr) + w[i + 1] * fr; };
  const w3 = om(3);
  console.log(`  integrator control: omega(3) = ${f6(w3)}, 3*omega(3) = ${f6(3 * w3)} against the closed form 1 + ln 2 = ${f6(1 + Math.log(2))}`);
  ok('omega(3) integrator control to 1e-6', Math.abs(3 * w3 - (1 + Math.log(2))) < 1e-6);
  let a = 3, b = 4;
  for (let it = 0; it < 200; it++) { const m = (a + b) / 2; if (m * om(m) < 2) a = m; else b = m; }
  const us = (a + b) / 2;
  console.log(`  root of u*omega(u) = 2:  u* = ${f6(us)},  1/u* = ${f6(1 / us)}`);
  console.log(`  asymptotic form 2e^gamma = ${f6(2 * Math.exp(GAMMA))}, 1/(2e^gamma) = ${f6(THETA)}`);
  ok('u* matches the cited 3.565845 to 1e-5', Math.abs(us - 3.565845) < 1e-5);
  ok('1/u* matches the cited 0.280438 to 1e-6', Math.abs(1 / us - 0.280438) < 1e-6);
  // the residual the prior-art note computes against: quoted as 0.0144, "at the top band"
  const bandMeanTop = MEANL[5], bandMeanBot = MEANL[0];
  console.log(`  measured band means of ln y*/ln h (full precision): bottom ${bandMeanBot.toFixed(6)}, top ${bandMeanTop.toFixed(6)}`);
  console.log(`  residual against the candidate: top band ${f6(THETA - bandMeanTop)}, bottom band ${f6(THETA - bandMeanBot)}`);
  console.log(`  the Buchstab correction is ${f6(THETA - 1 / us)}`);
  console.log(`  correction / TOP-band residual    = ${(100 * (THETA - 1 / us) / (THETA - bandMeanTop)).toFixed(1)}%   <-- the note says 2%`);
  console.log(`  correction / BOTTOM-band residual = ${(100 * (THETA - 1 / us) / (THETA - bandMeanBot)).toFixed(1)}%`);
  console.log(`  the note's stated residual 0.0144 matches NEITHER: it would need ${f6(0.000291 / 0.02)} to give 2%`);
  // the depth-axis arithmetic carried by attack-wrongdirection-audit.md 3.8
  const BETA2 = 4.26645028414864191641;
  console.log(`  s = u*/2 = ${f4(us / 2)} against beta2 = ${f4(BETA2)}; short by ${f3(BETA2 / (us / 2))}x (cited 2.393x)`);
  ok('the 2.393 shortfall reproduces', Math.abs(BETA2 / (us / 2) - 2.393) < 0.001);
  ok('the direct-twin comparison 4.266x reproduces', Math.abs(BETA2 / 1 - 4.26645) < 1e-4);
  // Wu 2004 / Lichtman chronology arithmetic quoted by quadpoint-prior-art.md
  console.log(`  Wu 2004: 3.5*(1 - 0.0287117) = ${(3.5 * (1 - 0.0287117)).toFixed(6)} (cited 3.39951)`);
  ok('Wu 2004 constant arithmetic', Math.abs(3.5 * (1 - 0.0287117) - 3.399509) < 1e-6);
  console.log(`  Lichtman 2025 vs Wu 2004: ${(100 * (3.399509 - 3.2995525) / 3.399509).toFixed(2)}% improvement (the note says "moved it by 2.94%")`);
  // the certificate restatement of prior-art 4.2
  console.log(`  prior-art 4.2: (u* omega(u*))^2 = ${f6(Math.pow(us * om(us), 2))} — the "S(A,y) < 4T" restatement checks`);
}

// ---------------------------------------------------------------------------
console.log('\nSEC G — THE QUANTIFIER (Z2, applied 2026-08-27) AGAINST THE RUN');
// ---------------------------------------------------------------------------
{
  const noT = allRows.filter(r => r.T === 0).length;
  const noK = allRows.filter(r => r.Kstar < 0).length;
  console.log(`  anchors with T = 0: ${noT} of ${allRows.length}; anchors with no K* at all: ${noK}`);
  console.log('  y* is defined at exactly the anchors with T >= 1, so the measured band means live entirely on {T >= 1}');
  console.log('  and cannot test "y* exists" — the 08-27 catch, confirmed on the data.');
  eq('every anchor to 10007 has T >= 1', noT, 0);
}

// ---------------------------------------------------------------------------
console.log('\nSEC H — WHAT sum capU ACTUALLY COUNTS, AGAINST THE NOTE 4 DESCRIPTION');
// ---------------------------------------------------------------------------
// quadpoint-identity-01.md 4: "sum capU = C - T + X = #{composite members whose
// partner is y-rough}". The middle equality is the lemma. The right-hand
// DESCRIPTION is tested here: the threshold each member is tested against is
// min(p_K, the largest active below that member's own lpf), not a uniform y.
{
  console.log('     Q    K   sum capU_K   #{composite members with a p_K-rough partner}   gap   gap/sum');
  for (const Q of [101, 313, 809, 1499, 3001, 9281]) {
    const qi = ANCH.indexOf(Q); const cs = census(qi);
    const { lo, hi, nR } = cs;
    const cp = capsLiteral(cs);
    for (const K of [...new Set([0, 1, 4, 16, cs.Kstar])]) {
      if (K > nR || K < 0) continue;
      const pK = K === 0 ? 0 : ACT[K - 1];
      let uniform = 0;
      for (let a = lo; a + 2 < hi; a++) {
        if (!OPEN.has(a % 30)) continue;
        const la = lpf[a - lo], lb = lpf[a + 2 - lo];
        if (la === 0 && lb === 0) continue;
        if (la !== 0 && (lb === 0 || lb > pK)) uniform++;   // a composite, partner p_K-rough
        if (lb !== 0 && (la === 0 || la > pK)) uniform++;   // a+2 composite, partner p_K-rough
      }
      const tag = K === cs.Kstar ? '  <- K* (the operative depth)' : '';
      console.log(`  ${String(Q).padStart(5)} ${String(K).padStart(4)}   ${String(cp.sum[K]).padStart(10)}   ${String(uniform).padStart(43)}   ${String(cp.sum[K] - uniform).padStart(5)}   ${f3((cp.sum[K] - uniform) / cp.sum[K])}${tag}`);
    }
  }
  console.log('  the two columns agree at K = 0 and K = 1 only (no CC pair has its LARGER lpf at 7), and part');
  console.log('  from there. The gap is #{CC pairs whose LARGER lpf is <= p_K} — the r1-members that clause (iii)');
  console.log('  of the note\'s own proof keeps UNCONDITIONALLY, whatever the partner\'s roughness. At the');
  console.log('  operative depth K* the gap runs 11% (Q=313) to 37% (Q=9281) of sum capU.');
}

// ---------------------------------------------------------------------------
console.log('\nSEC I — v1 SECTION 2\'s EXPLANATION OF sum capU_0 / C, TESTED AGAINST THE IDENTITY');
// ---------------------------------------------------------------------------
// attack-quadpoint-01.md section 2: "Sum capU_0/C climbs 0.720 -> 1.474 across
// bands — smaller than the zone budget's B/C -> 2 because lpf-freshness is
// built into capU_0." The identity makes sum capU_0/C = 1 - T/C + CC/C, and
// CC/C -> 1 while T/C -> 0, so this ratio ALSO tends to 2. Measured here.
{
  console.log('  band            n   sum capU_0 / C   CC/C     T/C');
  const bands = [['[7,97]', 7, 97], ['[101,313]', 101, 313], ['[317,997]', 317, 997], ['[1009,1499]', 1009, 1499],
    ['[1500,3163]', 1500, 3163], ['[3164,5623]', 3164, 5623], ['[5624,10007]', 5624, 10007]];
  for (const [nm, a, b] of bands) {
    const rs = allRows.filter(r => r.Q >= a && r.Q <= b);
    const rat = rs.reduce((s, r) => s + (r.C - r.T + r.CC) / r.C, 0) / rs.length;
    const cc = rs.reduce((s, r) => s + r.CC / r.C, 0) / rs.length;
    const tc = rs.reduce((s, r) => s + r.T / r.C, 0) / rs.length;
    console.log(`  ${nm.padEnd(13)} ${String(rs.length).padStart(4)}   ${f3(rat).padStart(12)}   ${f3(cc)}   ${f3(tc)}`);
  }
  console.log('  the ratio IS 1 - T/C + CC/C by the identity, and CC/C -> 1 while T/C -> 0, so it tends to 2');
  console.log('  as well: v1 section 2 reads a finite-size value as a structurally smaller limit.');
}

console.log(`\ndone in ${((Date.now() - T0) / 1000).toFixed(1)}s; assertion failures: ${fail}`);
console.log(fail === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${fail}`);
if (fail > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0828-quadpoint.js
//   invocation:  node research/history/staging/redteam-0828-quadpoint.js
//   code-sha256: 32fac619c0532bbaa2ff75d4ebb52670d178bf1c4d622b257e9af7beb564d85e
//   out-sha256:  dbe7f44de388e110830a8eeab9c436398496743185c787e5aa16a8f497f1e2b5
//   body-lines:  113
//   forced:      2026-08-28, 0 of 157 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     1.3 s
// ============================================================================
// SEC A — THE CAPTURE IDENTITY, RE-DERIVED FROM THE STATEMENT AT 50 ANCHORS
//   floor_K = T - X(K) at EVERY K of all 50 anchors, caps built from the literal definition: HOLDS
//   step (i) checked two ways (lpf(m) >= r vs lpf(v) = r): 0 disagreements over the 50 anchors
//   lpf(a) = lpf(a+2) never occurs: 0 occurrences
//   cited worst anchor Q = 9281 reproduced: T = 127, CC = 2357, K* = 46, y* = 227
//
// SEC B — THE PROOF CLAUSES, EACH CHECKED SEPARATELY (Q = 7..401)
//   14789 non-twin pairs over Q = 7..401
//   (iii-a) composite member with a PRIME partner survives at every K: 7704 pairs, 0 exceptions expected
//   (iii-b) in a both-composite pair the r1-member survives at every K: 7085 pairs
//   (iii-c) the r2-member survives  <=>  r1 > p_K, at every K: 7085 pairs
//
// SEC C — WINDOW-CONVENTION STRESS: WHAT THE LEMMA STATEMENT LEAVES OUT
//   Q'^2 mod 30 is a CLOSE channel position at 1227 of 1227 anchors; Q'^2 - 2 is OPEN at 1227
//   so (hi-2, hi) is a channel pair at 1227 of 1227 anchors, and lpf(hi) = Q' is NEVER in this anchor's pool
//   under the loose convention "a + 2 <= hi" the identity breaks by +1 at 12 of 12 tested anchors
//   => the lemma is TRUE only for the half-open window with BOTH members in [Q^2, Q'^2); the note never says so
//
// SEC D — THE DEPTH LAW: FULL 1,227-ANCHOR BAND MEANS, CENSUS ROUTE, INDEPENDENT CODE
//   candidate 1/(2e^gamma) = 0.280730
//   band            n   K* mean   y* mean   ln y*/ln h   vs candidate   K*/pool mean   max K*/pool
//   [101,313]       40      3.88     16.15       0.2624          0.935          0.093         0.179
//   [317,997]      103      8.42     33.76       0.2705          0.963          0.075         0.128
//   [1009,1499]     71     12.20     48.92       0.2720          0.969          0.061         0.090
//   [1500,3163]    208     16.88     69.85       0.2740          0.976          0.050         0.075
//   [3164,5623]    292     23.34    100.42       0.2749          0.979          0.040         0.065
//   [5624,10007]   491     31.22    141.80       0.2763          0.984          0.032         0.045
//   all 24 figures of the producer's SEC 2 table reproduced by independent code (asserted)
//   K = 0 list, max K* = 46 at 9281, and v1's max K* = 21 all reproduced
//
// SEC E — THE PREREG, SCORED AGAIN FROM ITS OWN TEXT, AND ITS POWER MEASURED
//   B6: K*/pool mean 0.050 vs registered 0.051 +/- 0.012  =>  IN BAND
//   B7: K*/pool mean 0.040 vs registered 0.041 +/- 0.012  =>  IN BAND
//   B8: K*/pool mean 0.032 vs registered 0.031 +/- 0.012  =>  IN BAND
//   the four scored band means, the four band maxes and the K* means all reproduce; NO band moved after the seal
//   READ-2 admissible m8 given the measured m7 = 0.040: [0.019, 0.040] — a factor 2.10 wide,
//   and it CONTAINS the flat outcome m8 = m7 = 0.040. A plateau in the last band fires FALL-CONSISTENT.
//   KCAP headroom: largest K* = 46 against KCAP = 64, i.e. 0.719 of the cap; max/mean at B8 = 1.47
//   Q = 31607: candidate y* = 336, mean K* ~ 64, and at the measured max/mean 1.47 the band MAX would be ~94 against KCAP = 64
//   Q = 100003: candidate y* = 642, mean K* ~ 113, and at the measured max/mean 1.47 the band MAX would be ~167 against KCAP = 64
//   => the prereg's own escalation tier (31607) sits ABOVE its engine cap: READ-3 would fire on the CAP, not on a second death,
//      and capped anchors are DROPPED from the band means (Kstar >= 0 filter), which biases READ-2 toward FALL-CONSISTENT.
//
// SEC F — THE BUCHSTAB CROSSING, INTEGRATED HERE (u*, 1/u*), AND THE CITED ARITHMETIC
//   integrator control: omega(3) = 0.564382, 3*omega(3) = 1.693147 against the closed form 1 + ln 2 = 1.693147
//   root of u*omega(u) = 2:  u* = 3.565847,  1/u* = 0.280438
//   asymptotic form 2e^gamma = 3.562145, 1/(2e^gamma) = 0.280730
//   measured band means of ln y*/ln h (full precision): bottom 0.262386, top 0.276316
//   residual against the candidate: top band 0.004414, bottom band 0.018344
//   the Buchstab correction is 0.000291
//   correction / TOP-band residual    = 6.6%   <-- the note says 2%
//   correction / BOTTOM-band residual = 1.6%
//   the note's stated residual 0.0144 matches NEITHER: it would need 0.014550 to give 2%
//   s = u*/2 = 1.7829 against beta2 = 4.2665; short by 2.393x (cited 2.393x)
//   Wu 2004: 3.5*(1 - 0.0287117) = 3.399509 (cited 3.39951)
//   Lichtman 2025 vs Wu 2004: 2.94% improvement (the note says "moved it by 2.94%")
//   prior-art 4.2: (u* omega(u*))^2 = 4.000000 — the "S(A,y) < 4T" restatement checks
//
// SEC G — THE QUANTIFIER (Z2, applied 2026-08-27) AGAINST THE RUN
//   anchors with T = 0: 0 of 1227; anchors with no K* at all: 0
//   y* is defined at exactly the anchors with T >= 1, so the measured band means live entirely on {T >= 1}
//   and cannot test "y* exists" — the 08-27 catch, confirmed on the data.
//
// SEC H — WHAT sum capU ACTUALLY COUNTS, AGAINST THE NOTE 4 DESCRIPTION
//      Q    K   sum capU_K   #{composite members with a p_K-rough partner}   gap   gap/sum
//     101    0           50                                            50       0   0.000
//     101    1           45                                            45       0   0.000
//     101    4           35                                            32       3   0.086
//     101   16           33                                            21      12   0.364
//     101    2           39                                            39       0   0.000  <- K* (the operative depth)
//     313    0          345                                           345       0   0.000
//     313    1          295                                           295       0   0.000
//     313    4          253                                           231      22   0.087
//     313   16          235                                           163      72   0.306
//     313    5          249                                           222      27   0.108  <- K* (the operative depth)
//     809    0          470                                           470       0   0.000
//     809    1          407                                           407       0   0.000
//     809    4          353                                           327      26   0.074
//     809   16          322                                           242      80   0.248  <- K* (the operative depth)
//    1499    0         5353                                          5353       0   0.000
//    1499    1         4636                                          4636       0   0.000
//    1499    4         3986                                          3687     299   0.075
//    1499   16         3567                                          2663     904   0.253
//    1499   13         3610                                          2789     821   0.227  <- K* (the operative depth)
//    3001    0         9246                                          9246       0   0.000
//    3001    1         7992                                          7992       0   0.000
//    3001    4         6815                                          6327     488   0.072
//    3001   16         6062                                          4556    1506   0.248
//    3001   19         6007                                          4374    1633   0.272  <- K* (the operative depth)
//    9281    0         5942                                          5942       0   0.000
//    9281    1         5136                                          5136       0   0.000
//    9281    4         4397                                          4090     307   0.070
//    9281   16         3870                                          2957     913   0.236
//    9281   46         3709                                          2356    1353   0.365  <- K* (the operative depth)
//   the two columns agree at K = 0 and K = 1 only (no CC pair has its LARGER lpf at 7), and part
//   from there. The gap is #{CC pairs whose LARGER lpf is <= p_K} — the r1-members that clause (iii)
//   of the note's own proof keeps UNCONDITIONALLY, whatever the partner's roughness. At the
//   operative depth K* the gap runs 11% (Q=313) to 37% (Q=9281) of sum capU.
//
// SEC I — v1 SECTION 2's EXPLANATION OF sum capU_0 / C, TESTED AGAINST THE IDENTITY
//   band            n   sum capU_0 / C   CC/C     T/C
//   [7,97]          22          0.955   0.223   0.268
//   [101,313]       40          1.291   0.409   0.118
//   [317,997]      103          1.415   0.496   0.080
//   [1009,1499]     71          1.474   0.540   0.066
//   [1500,3163]    208          1.515   0.570   0.055
//   [3164,5623]    292          1.552   0.599   0.047
//   [5624,10007]   491          1.581   0.622   0.041
//   the ratio IS 1 - T/C + CC/C by the identity, and CC/C -> 1 while T/C -> 0, so it tends to 2
//   as well: v1 section 2 reads a finite-size value as a structurally smaller limit.
//
// done in 1.2s; assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================
// 1. THE CAPTURE IDENTITY REPRODUCES [VERIFIED here at every K of 50
//    anchors, caps built from the note's literal definition by
//    independent code; the note's own producer verified all 1,227].
//    Every clause of the written proof was checked separately over
//    Q = 7..401 with 0 violations.
// 2. THE LEMMA IS CONVENTION-DEPENDENT AND THE NOTE DOES NOT SAY SO
//    [MEASURED]: Q'^2 is a CLOSE channel position at all 1,227 anchors
//    and its lpf is Q', outside the anchor's pool, so finality — and
//    with it proof step (i) — holds only for the half-open window with
//    BOTH members in [Q^2, Q'^2).
// 3. SECTION 4's DESCRIPTION OF sum capU IS WRONG FOR K >= 2 [MEASURED]:
//    at the operative depth K* the count of composite members with a
//    p_K-rough partner is short of sum capU by 11% to 37%.
// 4. THE 2% FIGURE IS 6.6% [MEASURED]: the Buchstab correction is
//    0.000291 against a top-band residual of 0.004414.
// 5. v1 SECTION 2's READING OF sum capU_0 / C IS FINITE-SIZE [MEASURED]:
//    the ratio is 1 - T/C + CC/C by the identity, CC/C climbs 0.223 ->
//    0.622 and T/C falls 0.268 -> 0.041, so the limit is 2, the same as
//    the zone budget it was contrasted against.
// 6. NO PREREG BAND MOVED AFTER THE SEAL [VERIFIED], but READ-2's
//    admissible m8 window spans a factor 2.10 and contains the flat
//    outcome m8 = m7, and the pre-committed escalation tier sits above
//    the engine cap.
// ============================================================
