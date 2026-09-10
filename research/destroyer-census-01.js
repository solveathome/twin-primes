// ============================================================================
// DESTROYER CENSUS 01 — EVERY DESTROYED CHANNEL PAIR TO 1e8 ASSIGNED ITS
// DESTROYER; THE CRT NULL DERIVED FIRST; THE PER-ZONE KILL BUDGET VS PAIR
// CAPACITY, EXACT AT EVERY ZONE IN REACH; THE FREEZE SHELLS; THE INTRA-ZONE
// STAIRCASE; AND THE HALF-LEVEL HEAD TEST
// ============================================================================
// THE QUESTION (Chris's finality frame, 2026-08-21). Only primes q with
// q^2 <= n+2 can destroy the twin-channel pair at opener n (fresh-kill
// theorem, natal-onset-01 §0; red-teamed CONFIRMED). So every destroyed pair
// has a unique DESTROYER — the lpf of its first-killed member — and every
// zone (p, p'^2) has an exact kill budget spendable against its pair
// capacity. This producer:
//   SEC 1  the census: destroyer of every destroyed channel pair, openers
//          <= 1e8; kill-shares vs the DERIVED CRT null (never the naive
//          2/q); first-mover excess and its decay; A/B split per destroyer
//          vs the proven live-level identity; concentration of the
//          destruction work in the small primes.
//   SEC 2  the entry-fee ledger: the guaranteed natal strike (q^2-2, q^2);
//          the k-th-youngest active prime's kills per zone, measured and
//          derived; a fixed prime's kill rate per unit of newly frozen
//          territory; the per-zone per-prime budget decomposition.
//   SEC 3  THE OBJECT: budget B(p) vs capacity C(p) at every zone with
//          p'^2 <= 1e8. B <= C-1 forces an unconditional twin (pigeonhole);
//          computed exactly, crossover located, closed form derived.
//   SEC 4  the freeze shells [p^2, p'^2): they PARTITION the line (zones
//          overlap; shells do not); per-shell twin counts, minimum, empties.
//   SEC 5  the intra-zone staircase: destroyer count vs zone position u;
//          destruction density vs the deterministic tread curve
//          S(n) = prod_{7<=q<=sqrt(n)}(1-2/q); tread size vs spacing.
//   SEC 6  the half-level head hypothesis: head(p) as a level-sqrt(p)
//          object — frozen-level equivalence per zone, the renewal
//          (forward-recurrence) null for the 0.72 ln^2 p coefficient, and
//          head mod 30 structure.
// Everything is exact counting over a finite range; NO first-moment TPC
// claim anywhere (Route B is CLOSED, research/REFUTED.md).
//
// CONVENTIONS (zonegap-01 §0 + natal-onset-01 §0, restated once):
//   pair        (a, a+2), opener a ≡ 11, 17, 29 (mod 30) — the A-side /
//               opener classes; closers ≡ 13, 19, 1 — B-side. Channel
//               member classes mod 30: {11,13,17,19,29,1}, 6 of the 8
//               coprime classes; every channel integer is a member of
//               exactly ONE pair (opener and closer classes are disjoint).
//   death       a member dies at its own coordinate iff composite; killer =
//               its lpf; a prime never dies (self-strike = twin found).
//   destroyer   lpf of the pair's FIRST-killed member: lpf(a) if a is
//               composite (A-side; time a beats time a+2), else lpf(a+2)
//               (B-side; opener prime, so this is always a LIVE kill).
//               A same-q tie is impossible: q | a and q | a+2 force q | 2.
//   zone p      openers a with p < a and a+2 < p'^2 (both strict).
//   shell p     pairs with p^2 <= a+2 < p'^2 (the stretch fold p freezes;
//               kills are assigned to shells by the CLOSER's position).
//   budget B(p) composite channel members among zone pairs — equivalently
//               in-zone channel members with lpf <= p (in the zone,
//               composite <=> lpf <= p), i.e. the total fresh channel
//               kills the active set {q <= p} lands in the zone.
//   capacity    C(p) = channel pairs in the zone.  T(p) = twins in it.
//   head(p)     first twin opener a_first > p, head = a_first - p.
//   units       positions/gaps in integers; shares in percent; head/gap
//               coefficients in units of ln^2(height).
// WIDTH AUDIT: all positions <= 1e8 + 2 < 2^31; products q*m <= ~1e8;
// accumulated sums (Sum h^2 ~ 7e11, Sum ln^2 ~ 2e9) far below 2^53; all
// arithmetic in doubles is exact where integer.
//
// PRIOR ART ON DISK (cited, extended, not re-derived):
//   research/natal-onset-01.js        the 10k-window instrument; its window
//                                     totals and destroyer counts are
//                                     CALIBRATION anchors here (abort).
//   research/zonegap-02-reduction.js  Zone Restriction Lemma; the onset-
//                                     shell ledger freshZone(q) (§3.4) and
//                                     the D3 youngest-prime counts —
//                                     calibration anchors; SEC 2 extends
//                                     the ledger to the k-th youngest and
//                                     to channel restriction.
//   research/zonegap-01.js            zone conventions; head mean 0.7229
//                                     ln^2 p and HL 0.7574 (cited).
//   research/ZONE-POSTULATE.md §2     weak form <=> TPC (cited in the
//                                     freeze-frame reading).
//   research/origin-excess.md         e^{2gamma}/4 = 0.79305 — the derived
//                                     truth/Mertens ratio the staircase
//                                     comparison must approach (SEC 5).
//   research/scour-into-fixed-tile.js the tile-global q^2 rule.
// ============================================================================
'use strict';
const T0 = Date.now();

// ---------- toolbox (exact, elementary) ----------
function isqrt(n) { let r = Math.floor(Math.sqrt(n)); while ((r + 1) * (r + 1) <= n) r++; while (r * r > n) r--; return r; }
let failures = 0;
function assertEq(tag, got, want) {
  if (got !== want) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; }
  return true;
}
function assertTrue(tag, cond) { if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]`); } return cond; }
function pct(x) { return (100 * x).toFixed(2); }
function f3(x) { return x.toFixed(3); }
function f4(x) { return x.toFixed(4); }

// ---------- prime tables ----------
const XOPEN = 100_000_000;            // openers a <= XOPEN; members to XOPEN+2
const SMALLN = 110_000;               // small exact pass + pi lookups (1e8/997 < 110000)
// full sieve to 10^4 (marking primes for the big segmented sieve), and lpf +
// prime flags + pi to SMALLN for the small pass and pi lookups
const lpfS = new Int32Array(SMALLN + 3);
for (let p = 2; p * p <= SMALLN + 2; p++) {
  if (lpfS[p] !== 0) continue;
  for (let m = p * p; m <= SMALLN + 2; m += p) if (lpfS[m] === 0) lpfS[m] = p;
}
// lpfS above marks from p*p — for lpf we need multiples from 2p. Redo exactly:
lpfS.fill(0);
for (let p = 2; p * p <= SMALLN + 2; p++) {
  let isP = true; for (let d = 2; d * d <= p; d++) if (p % d === 0) { isP = false; break; }
  if (!isP) continue;
  for (let m = 2 * p; m <= SMALLN + 2; m += p) if (lpfS[m] === 0) lpfS[m] = p;
}
const isPrS = (n) => n >= 2 && lpfS[n] === 0;   // valid to SMALLN+2
const piS = new Int32Array(SMALLN + 3);
for (let n = 2; n <= SMALLN + 2; n++) piS[n] = piS[n - 1] + (isPrS(n) ? 1 : 0);
const P = [];                                   // all primes <= 10^4
for (let n = 2; n <= 10_000; n++) if (isPrS(n)) P.push(n);
const P7 = P.filter(q => q >= 7);               // scour primes
const K7 = P7.length;
const qIdx = new Map(); P7.forEach((q, i) => qIdx.set(q, i));
// CRT kill density per side, per channel position: s(q) = (1/q) prod_{7<=r<q}(1-1/r)
const sArr = new Float64Array(K7);
{ let prod = 1; for (let i = 0; i < K7; i++) { sArr[i] = prod / P7[i]; prod *= (1 - 1 / P7[i]); } }
// conditional opener-primality factor given lpf(a+2) = q: the closer being a
// fresh q-kill forces a ≡ -2 (mod q) — coprime, gain q/(q-1) — and a+2
// coprime to every r in [7, q), i.e. a ≢ -2 (mod r), which removes one
// NONZERO residue and costs r(r-2)/(r-1)^2 — the Hardy-Littlewood local
// factor of r. cf(q) = (q/(q-1)) * prod_{7<=r<q} r(r-2)/(r-1)^2. The product
// converges to C2/((3*1/4)(5*3/16)) = 0.93890.
const cfArr = new Float64Array(K7);
{ let prod = 1; for (let i = 0; i < K7; i++) { const q = P7[i]; cfArr[i] = (q / (q - 1)) * prod; prod *= q * (q - 2) / ((q - 1) * (q - 1)); } }
// staircase survival among channel pairs: S(q) = prod_{7<=r<=q}(1-2/r)
const SArr = new Float64Array(K7);
{ let prod = 1; for (let i = 0; i < K7; i++) { prod *= (1 - 2 / P7[i]); SArr[i] = prod; } }
// constants, derived not fitted
const GAMMA = 0.5772156649015329, C2 = 0.6601618158468696;
const HLCOEFF = 1 / (2 * C2);                       // mean twin gap, ln^2 units: 0.757374
const MERTENS_RATIO = Math.exp(2 * GAMMA) / 4;      // truth/staircase ratio: 0.793052
// trial-division primality for n <= 1e8+2 (sqrt <= 10^4)
function isPrimeBig(n) {
  if (n <= SMALLN + 2) return isPrS(n);
  for (let i = 0; i < P.length; i++) { const p = P[i]; if (p * p > n) break; if (n % p === 0) return false; }
  return true;
}
const OPENER = new Set([11, 17, 29]);

// ============================================================================
// CALIBRATION — abort before printing anything else on any mismatch
// ============================================================================
console.log('CALIBRATION (abort on mismatch)');
{
  // (A) natal-onset-01's 10k window: openers 11..9998
  let pairs = 0, dest = 0, twins = 0, compA = 0, compB = 0, destA = 0, destBlive = 0;
  const dq = new Map([[7, 0], [11, 0], [13, 0], [17, 0], [19, 0]]);
  for (let a = 11; a <= 9998; a += 2) {
    const r = a % 30; if (!OPENER.has(r)) continue;
    pairs++;
    const La = lpfS[a], Lb = lpfS[a + 2];
    if (La === 0 && Lb === 0) { twins++; continue; }
    dest++;
    if (La !== 0) compA++;
    if (Lb !== 0) compB++;
    if (La !== 0) { destA++; if (dq.has(La)) dq.set(La, dq.get(La) + 1); }
    else { destBlive++; if (dq.has(Lb)) dq.set(Lb, dq.get(Lb) + 1); }
  }
  assertEq('natal pairs', pairs, 999); assertEq('natal destroyed', dest, 796);
  assertEq('natal survivors', twins, 203);
  assertEq('natal compA', compA, 539); assertEq('natal compB', compB, 543);
  assertEq('natal destA', destA, 539); assertEq('natal destBlive', destBlive, 257);
  assertEq('natal dest7', dq.get(7), 219); assertEq('natal dest11', dq.get(11), 120);
  assertEq('natal dest13', dq.get(13), 86); assertEq('natal dest17', dq.get(17), 57);
  assertEq('natal dest19', dq.get(19), 55);
  console.log(`  [natal 10k window] 999/796/203, kill-level 539:543, live A:B 539:257 (${f3(539 / 257)}), destroyer counts 7:219 11:120 13:86 17:57 19:55  OK`);
}
{
  // (B) zonegap-02 SEC A: in-zone twin counts at p = 7, 11, 13, 17, 23
  const want = new Map([[7, 8], [11, 9], [13, 16], [17, 17], [23, 29]]);
  for (const [p, w] of want) {
    let pp = p + 1; while (!isPrS(pp)) pp++;
    let t = 0;
    for (let a = p + 1; a + 2 < pp * pp; a++) {
      if (!OPENER.has(a % 30)) continue;
      if (lpfS[a] === 0 && lpfS[a + 2] === 0) t++;
    }
    assertEq(`zone twins p=${p}`, t, w);
  }
  console.log('  [zone twins] T(7)=8 T(11)=9 T(13)=16 T(17)=17 T(23)=29  OK');
}
{
  // (C) zonegap-02 SEC D3: youngest active prime's whole-zone fresh kills,
  // pi-formula pi((p'^2-1)/p) - pi(p-1), p = 7..97
  const want = { 7: 4, 11: 2, 13: 3, 17: 2, 19: 2, 23: 3, 29: 2, 31: 4, 37: 3, 41: 2, 43: 2, 47: 3, 53: 3, 59: 2, 61: 4, 67: 3, 71: 2, 73: 3, 79: 2, 83: 2, 89: 4, 97: 3 };
  for (const key of Object.keys(want)) {
    const p = +key;
    let pp = p + 1; while (!isPrS(pp)) pp++;
    const got = piS[Math.floor((pp * pp - 1) / p)] - piS[p - 1];
    assertEq(`D3 youngest kills p=${p}`, got, want[key]);
  }
  console.log('  [D3 youngest-prime zone kills, 22 levels 7..97]  OK');
}
if (failures > 0) { console.log(`CALIBRATION FAILED (${failures}) — aborting before any measurement.`); process.exit(1); }
console.log('');

// ============================================================================
// zone list: primes p >= 7 with p'^2 - 1 <= 1e8 (every zone fully in reach)
// ============================================================================
const zones = [];
for (let i = 0; i < P.length; i++) {
  const p = P[i]; if (p < 7) continue;
  const pp = P[i + 1]; if (pp === undefined || pp * pp - 1 > XOPEN) break;
  zones.push({ p, pp, i7: qIdx.get(p) });
}
const NZ = zones.length;

// ============================================================================
// SEC 2a — THE ENTRY FEE: the natal strike (q^2-2, q^2) per prime q
// ============================================================================
// q^2 is always a B-side channel kill (q^2 ≡ 1 or 19 mod 30); it destroys a
// LIVE pair iff q^2-2 is prime. Count that entry live-kill per q-band.
console.log('SEC 2a — ENTRY FEE: q\'s guaranteed first kill (q^2-2, q^2); live iff q^2-2 prime');
{
  const bands = [[7, 97], [101, 997], [1009, 9973]];
  let n97 = 0, y97 = 0;
  for (const [lo, hi] of bands) {
    let n = 0, y = 0;
    for (const q of P7) {
      if (q < lo || q > hi) continue;
      n++; if (isPrimeBig(q * q - 2)) y++;
    }
    if (hi === 97) { n97 = n; y97 = y; }
    console.log(`  q in [${lo}, ${hi}]: ${y} of ${n} primes have q^2-2 prime (${pct(y / n)}%) — entry kill destroys a live pair`);
  }
  assertEq('natal entry-live 10/22', y97, 10); assertEq('natal entry-n 22', n97, 22);
}
console.log('');

// ============================================================================
// SEC 2b — THE k-TH-YOUNGEST ACTIVE PRIME'S KILLS PER ZONE, k = 1..8
// ============================================================================
// Fresh kills of q in zone (p, p'^2): positions q*m, lpf(m) >= q,
// p/q < m <= (p'^2-1)/q — enumerated exactly (the ledger freshZone(q) of
// zonegap-02 §3.4 with both Phi* ends), plus the pi-formula cross-assert in
// the prime regime q^3 > p'^2-1, plus the channel restriction (q*m mod 30 in
// the 6 member classes, i.e. not in {7, 23}).
console.log('SEC 2b — k-TH-YOUNGEST LEDGER (zones with p >= 100; exact enumeration; null = 1 + (U-q)/ln((q+U)/2))');
{
  const stats = [];
  for (let k = 1; k <= 8; k++) stats.push({ n: 0, s: 0, s2: 0, min: Infinity, max: -Infinity, sChan: 0, sNull: 0 });
  let piChecks = 0;
  for (const z of zones) {
    if (z.p < 100) continue;
    const iP = P.indexOf(z.p);
    const top = z.pp * z.pp - 1;
    for (let k = 1; k <= 8; k++) {
      const q = P[iP - k + 1];
      if (q === undefined || q < 7) continue;
      const U = Math.floor(top / q), lo = Math.floor(z.p / q);
      let kills = 0, chan = 0;
      for (let m = lo + 1; m <= U; m++) {
        const L = lpfS[m]; const rough = (L === 0) ? (m >= q) : (L >= q);
        if (!rough) continue;
        kills++;
        const r = (q % 30) * (m % 30) % 30;
        if (r !== 7 && r !== 23) chan++;
      }
      if (q * q * q > top) {           // prime regime: pi-formula must agree
        const viaPi = piS[U] - piS[Math.max(q - 1, lo)];
        if (kills !== viaPi) { failures++; console.log(`  ASSERT FAIL [pi-formula p=${z.p} k=${k}]`); }
        piChecks++;
      }
      const st = stats[k - 1];
      st.n++; st.s += kills; st.s2 += kills * kills;
      if (kills < st.min) st.min = kills; if (kills > st.max) st.max = kills;
      st.sChan += chan;
      st.sNull += 1 + (U - q) / Math.log((q + U) / 2);
    }
  }
  console.log('  k | zones | mean kills | sd | min..max | mean channel | mean null | meas/null');
  const means = [];
  for (let k = 1; k <= 8; k++) {
    const st = stats[k - 1];
    const m = st.s / st.n, sd = Math.sqrt(st.s2 / st.n - m * m), mn = st.sNull / st.n;
    means.push(m);
    console.log(`  ${k} | ${st.n} | ${f3(m)} | ${f3(sd)} | ${st.min}..${st.max} | ${f3(st.sChan / st.n)} | ${f3(mn)} | ${f3(m / mn)}`);
  }
  // slope of mean kills against k (least squares, k = 1..8)
  let sx = 0, sy = 0, sxy = 0, sxx = 0;
  for (let k = 1; k <= 8; k++) { sx += k; sy += means[k - 1]; sxy += k * means[k - 1]; sxx += k * k; }
  const slope = (8 * sxy - sx * sy) / (8 * sxx - sx * sx);
  console.log(`  slope of mean kills per seniority step k: ${f3(slope)} (derivation: interval (p/q_k, p'^2/q_k] has length ~2(p'-q_k), so ~2 kills per step; ${piChecks} pi-formula cross-asserts in the prime regime)`);
}
console.log('');

// ============================================================================
// SEC 2c — PER-ZONE PER-PRIME BUDGET DECOMPOSITION AT p = 7, 11, 13
// ============================================================================
// budget_q(p) = channel members of zone pairs with lpf = q, vs the CRT
// expectation 2*C(p)*s(q). Exact small-window fluctuation on display.
console.log('SEC 2c — BUDGET DECOMPOSITION, exact vs CRT 2*C*s(q) (zones p = 7, 11, 13)');
const smallZoneBudget = new Map();   // p -> B(p) for the big-walk cross-assert
for (const p of [7, 11, 13]) {
  let pp = p + 1; while (!isPrS(pp)) pp++;
  const bq = new Map(); let C = 0, B = 0;
  for (let a = p + 1; a + 2 < pp * pp; a++) {
    if (!OPENER.has(a % 30)) continue;
    C++;
    for (const m of [a, a + 2]) {
      const L = lpfS[m];
      if (L !== 0) { B++; bq.set(L, (bq.get(L) || 0) + 1); }
    }
  }
  smallZoneBudget.set(p, B);
  const parts = [];
  let sum = 0;
  for (const q of P7) {
    if (q > p) break;
    const got = bq.get(q) || 0; sum += got;
    parts.push(`q=${q}: ${got} (crt ${(2 * C * sArr[qIdx.get(q)]).toFixed(1)})`);
  }
  assertEq(`decomp sums to B p=${p}`, sum, B);
  console.log(`  p=${p}: C=${C} B=${B}  ${parts.join('  ')}`);
}
console.log('');

// ============================================================================
// THE BIG WALK — segmented lpf sieve, openers 11..1e8, everything in one pass
// ============================================================================
// thresholds: cumulative counters are snapshotted at value v the moment the
// walk passes it (cums then cover exactly the coprime positions <= v).
const thr = [];
for (let zi = 0; zi < NZ; zi++) {
  const z = zones[zi];
  z.snap = { ud: new Array(11).fill(null) };
  thr.push({ v: z.p, zi, kind: 'zs' });
  thr.push({ v: z.pp * z.pp - 3, zi, kind: 'ze' });
  thr.push({ v: z.p * z.p - 3, zi, kind: 'ss' });
  const w = z.pp * z.pp - z.p;
  for (let j = 1; j <= 9; j++) thr.push({ v: z.p + Math.floor(j * w / 10), zi, kind: 'ud', j });
}
const qqSnap = new Array(K7).fill(null);       // per-q cutoff snapshots at q^2-3
for (let i = 0; i < K7; i++) thr.push({ v: P7[i] * P7[i] - 3, zi: -1, kind: 'qq', qi: i });
thr.sort((x, y) => x.v - y.v);
const thrN = thr.length;

// cumulative counters
let cumPairs = 0, cumDest = 0, cumTwins = 0, cumComp = 0, cumS = 0, cumInvLn = 0, cumPrimesAll = 0;
let cumF7 = 0, cumF11 = 0, cumF31 = 0;
function takeSnap(t) {
  const s = { pairs: cumPairs, dest: cumDest, twins: cumTwins, comp: cumComp, S: cumS, invLn: cumInvLn, f7: cumF7, f11: cumF11, f31: cumF31, primes: cumPrimesAll };
  if (t.kind === 'qq') qqSnap[t.qi] = s;
  else if (t.kind === 'ud') zones[t.zi].snap.ud[t.j] = s;
  else zones[t.zi].snap[t.kind] = s;
}

// per-q census arrays
const destCnt = new Float64Array(K7), destAq = new Float64Array(K7);
const bFresh = new Float64Array(K7), bLive = new Float64Array(K7), sumInvLnB = new Float64Array(K7);
// windows: 0 = [11, 1e4), 1..4 = decades [1e4,1e5) .. [1e7,1e8]
const NW = 5;
const dPairs = new Float64Array(NW), dDest = new Float64Array(NW), dSumInvLn = new Float64Array(NW);
const NQ_SMALL = 22;                              // q = 7..97
const dDestQ = []; for (let w = 0; w < NW; w++) dDestQ.push(new Float64Array(NQ_SMALL));
// tread bins (pair assigned by largest q with q^2 <= a+2)
const treadPairs = new Float64Array(K7), treadAlive = new Float64Array(K7);
let prePairs = 0, preAlive = 0;                   // a+2 < 49: no tread yet
// head/gap ensembles per window (window of p / of the gap's left opener)
const hN = new Float64Array(NW), hSum = new Float64Array(NW), hSum2 = new Float64Array(NW), hLn2 = new Float64Array(NW);
const gN = new Float64Array(NW), gSum = new Float64Array(NW), gSum2 = new Float64Array(NW), gLn2 = new Float64Array(NW);
const headMod30 = new Float64Array(30), pClassTot = new Float64Array(30), aClassTot = new Float64Array(30);
let pending = [], prevTw = -1, maxDestRatio = 0, sameLpfTies = 0;

function winOf(n) { return n < 1e4 ? 0 : n < 1e5 ? 1 : n < 1e6 ? 2 : n < 1e7 ? 3 : 4; }

const SEG = 6_000_000;
const OFFS = [1, 7, 11, 13, 17, 19, 23, 29];
const IS_OPEN = { 11: true, 17: true, 29: true };
let treadIdx = -1, Scur = 1, tPtr = 0;
const NEND = XOPEN;                                // walk positions n <= 1e8
for (let segLo = 0; segLo <= NEND; segLo += SEG) {
  const segHi = Math.min(segLo + SEG, NEND + 1);   // positions [segLo, segHi)
  const arr = new Int32Array(segHi - segLo + 2);   // lpf record to segHi+1
  for (let i = 0; i < K7; i++) {
    const p = P7[i];
    let m = Math.max(2 * p, Math.ceil(segLo / p) * p);
    for (; m < segHi + 2; m += p) if (arr[m - segLo] === 0) arr[m - segLo] = p;
  }
  const b0 = 30 * Math.floor(segLo / 30);
  for (let b = b0; b < segHi; b += 30) {
    for (let oi = 0; oi < 8; oi++) {
      const n = b + OFFS[oi];
      if (n < segLo || n < 7 || n >= segHi) continue;
      while (tPtr < thrN && thr[tPtr].v < n) takeSnap(thr[tPtr++]);
      const L = arr[n - segLo];
      const isP = (L === 0);
      if (isP) cumPrimesAll++;
      const r = OFFS[oi];
      if (IS_OPEN[r]) {
        const a = n, Lb = arr[a + 2 - segLo];
        while (treadIdx + 1 < K7 && P7[treadIdx + 1] * P7[treadIdx + 1] <= a + 2) { treadIdx++; Scur = SArr[treadIdx]; }
        const w = winOf(a), invLnA = 1 / Math.log(a);
        cumPairs++; cumS += Scur; cumInvLn += invLnA;
        dPairs[w]++; dSumInvLn[w] += invLnA;
        if (treadIdx >= 0) treadPairs[treadIdx]++; else prePairs++;
        if (L === 0 && Lb === 0) {
          cumTwins++;
          if (treadIdx >= 0) treadAlive[treadIdx]++; else preAlive++;
          if (prevTw > 0) {
            const g = a - prevTw, wg = winOf(prevTw), lg = Math.log(prevTw);
            gN[wg]++; gSum[wg] += g; gSum2[wg] += g * g; gLn2[wg] += lg * lg;
          }
          prevTw = a;
          for (let pi = 0; pi < pending.length; pi++) {
            const p = pending[pi], h = a - p, wp = winOf(p), lp = Math.log(p);
            hN[wp]++; hSum[wp] += h; hSum2[wp] += h * h; hLn2[wp] += lp * lp;
            headMod30[h % 30]++; pClassTot[p % 30]++; aClassTot[a % 30]++;
          }
          pending.length = 0;
        } else {
          cumDest++; dDest[w]++;
          if (L !== 0 && Lb !== 0 && L === Lb) sameLpfTies++;
          let q, side;
          if (L !== 0) { q = L; side = 0; const rr = q * q / a; if (rr > maxDestRatio) maxDestRatio = rr; }
          else { q = Lb; side = 1; const rr = q * q / (a + 2); if (rr > maxDestRatio) maxDestRatio = rr; }
          const qi = qIdx.get(q);
          destCnt[qi]++;
          if (side === 0) { destAq[qi]++; cumComp++; if (q === 7) cumF7++; else if (q === 11) cumF11++; else if (q === 31) cumF31++; }
          else bLive[qi]++;
          if (Lb !== 0) {
            const qb = qIdx.get(Lb);
            bFresh[qb]++; sumInvLnB[qb] += invLnA;
            cumComp++; if (Lb === 7) cumF7++; else if (Lb === 11) cumF11++; else if (Lb === 31) cumF31++;
          }
          if (qi < NQ_SMALL) dDestQ[w][qi]++;
        }
      }
      if (isP) pending.push(n);
    }
  }
  console.error(`  [progress] segment ${segLo}..${segHi} done, ${((Date.now() - T0) / 1000).toFixed(1)} s`);
}
while (tPtr < thrN) takeSnap(thr[tPtr++]);
const totPairs = cumPairs, totDest = cumDest, totTwins = cumTwins, totInvLn = cumInvLn;
const droppedPending = pending.length;

// ============================================================================
// SEC 1 — THE DESTROYER CENSUS
// ============================================================================
console.log('SEC 1 — DESTROYER CENSUS, channel openers 11..1e8');
assertEq('channel pair count', totPairs, 9_999_999);
assertEq('walk reproduces natal pairs in W0', dPairs[0], 999);
assertEq('walk reproduces natal destroyed in W0', dDest[0], 796);
assertEq('walk reproduces natal dest7 in W0', dDestQ[0][0], 219);
assertEq('same-lpf tie impossible', sameLpfTies, 0);
assertTrue('destroyer set is {q: q^2 <= n+2}', maxDestRatio <= 1);
assertEq('survivors = pi2(1e8) - 2 (A007508: 440312, minus (3,5),(5,7))', totTwins, 440_310);
console.log(`  pairs ${totPairs}, destroyed ${totDest}, survivors ${totTwins}; max q^2/member over all destroyers = ${f4(maxDestRatio)} (<= 1: no destroyer ever exceeds sqrt of its kill)`);

// derived null per q, all parts derived BEFORE measuring:
//   null(q) = s(q) * ( #pairs with a+2 >= q^2                        [A side]
//                    + 3.75 * cf(q) * sum 1/ln a over them )         [B side]
// A side: CRT exact density of lpf(a) = q among channel openers. B side: the
// same density on the closer, times the opener-prime density — PNT in the
// fixed coprime class, (30/phi(30))/ln a = 3.75/ln a — times the derived
// conditional factor cf(q) (residue exclusion + HL local factors; header).
const nullCnt = new Float64Array(K7);
let nullTotal = 0;
for (let i = 0; i < K7; i++) {
  const snap = qqSnap[i];
  const pairsAbove = totPairs - (snap ? snap.pairs : 0);
  const invAbove = totInvLn - (snap ? snap.invLn : 0);
  nullCnt[i] = sArr[i] * (pairsAbove + 3.75 * cfArr[i] * invAbove);
  nullTotal += nullCnt[i];
}
console.log(`  sum of derived nulls / measured destroyed = ${f4(nullTotal / totDest)} (the deficit sits in the large-q tail, where the asymptotic CRT density misprices the short window above q^2 — closed exactly below)`);
console.log('  q | dest | share% | null% | dest/null | Afresh | Bfresh | A/B fresh | Blive | f_meas | Blive_pred | meas/pred');
for (let i = 0; i < K7; i++) {
  const q = P7[i];
  if (!(q <= 53 || q === 71 || q === 97 || q === 199 || q === 499 || q === 997 || q === 3163 + 4 || q === 9973)) continue;
  const bp = 3.75 * cfArr[i] * sumInvLnB[i];
  console.log(`  ${q} | ${destCnt[i]} | ${pct(destCnt[i] / totDest)} | ${pct(nullCnt[i] / nullTotal)} | ${f3(destCnt[i] / nullCnt[i])} | ${destAq[i]} | ${bFresh[i]} | ${f3(destAq[i] / bFresh[i])} | ${bLive[i]} | ${f4(bLive[i] / bFresh[i])} | ${bp.toFixed(1)} | ${f3(bLive[i] / bp)}`);
}

// prime-regime closure for the big destroyers (q^3 > 1e8+2, i.e. q >= 467):
// every fresh kill of q is q x prime (the ledger's prime regime, zonegap-02
// §3.4), so the census columns must EQUAL enumerated prime counts.
{
  for (const q of [997, 3167, 9973]) {
    const i = qIdx.get(q);
    let af = 0, bf = 0;
    for (let m = q; m <= Math.floor((XOPEN + 2) / q); m++) {
      if (!isPrS(m)) continue;
      const r = (q % 30) * (m % 30) % 30;
      if ((r === 11 || r === 17 || r === 29) && q * m <= XOPEN) af++;
      if (r === 13 || r === 19 || r === 1) bf++;
    }
    assertEq(`prime-regime Afresh q=${q}`, destAq[i], af);
    assertEq(`prime-regime Bfresh q=${q}`, bFresh[i], bf);
  }
  console.log('  prime-regime closure: for q in {997, 3167, 9973} the measured Afresh/Bfresh EQUAL the enumerated counts of primes m with q*m in the opener/closer classes (asserted) — a big destroyer\'s every kill is q x prime');
}

// first-mover excess and its decay: meas/null per window, small q
{
  // W0 exact q^2 cutoffs from the small pass
  const w0pairs = new Float64Array(NQ_SMALL), w0inv = new Float64Array(NQ_SMALL);
  for (let a = 11; a <= 9998; a += 2) {
    if (!OPENER.has(a % 30)) continue;
    const inv = 1 / Math.log(a);
    for (let i = 0; i < NQ_SMALL; i++) if (P7[i] * P7[i] <= a + 2) { w0pairs[i]++; w0inv[i] += inv; }
  }
  console.log('  first-mover: destroyer count / derived null, per window (decay of the excess)');
  console.log('  q | [11,1e4) | [1e4,1e5) | [1e5,1e6) | [1e6,1e7) | [1e7,1e8)');
  for (let i = 0; i < 6; i++) {
    const cells = [];
    for (let w = 0; w < NW; w++) {
      const nb = (w === 0) ? sArr[i] * (w0pairs[i] + 3.75 * cfArr[i] * w0inv[i])
                           : sArr[i] * (dPairs[w] + 3.75 * cfArr[i] * dSumInvLn[w]);
      cells.push(f3(dDestQ[w][i] / nb));
    }
    console.log(`  ${P7[i]} | ${cells.join(' | ')}`);
  }
}

// concentration of the destruction work
{
  console.log('  concentration: share of ALL destruction done by destroyers q <= 1e8^eps (measured | derived null)');
  const lnX = Math.log(XOPEN);
  for (const eps of [0.125, 0.167, 0.2, 0.25, 0.333, 0.4, 0.5]) {
    const y = Math.pow(XOPEN, eps);
    let cm = 0, cn = 0, np = 0;
    for (let i = 0; i < K7; i++) if (P7[i] <= y) { cm += destCnt[i]; cn += nullCnt[i]; np++; }
    console.log(`  eps=${f3(eps)} (q <= ${Math.round(y)}): ${pct(cm / totDest)}% | ${pct(cn / nullTotal)}% — ${np} of ${K7} destroyer primes (${pct(np / K7)}%)`);
  }
  let cm = 0;
  const marks = [[0.5, null], [0.9, null], [0.99, null]];
  for (let i = 0; i < K7; i++) {
    cm += destCnt[i] / totDest;
    for (const mk of marks) if (mk[1] === null && cm >= mk[0]) mk[1] = P7[i];
  }
  for (const [lvl, y] of marks) console.log(`  ${pct(lvl)}% of destruction is done by q <= ${y} (eps = ${f3(Math.log(y) / lnX)}, ${piS[y] - 3} of ${K7} primes)`);
}
console.log('');

// ============================================================================
// SEC 2d — A FIXED PRIME'S KILL RATE PER UNIT OF NEWLY FROZEN TERRITORY
// ============================================================================
console.log('SEC 2d — FIXED-q CHANNEL KILL RATE PER UNIT FROZEN TERRITORY (shells p in [1000, 9967]; derived rate s(q)/5)');
for (const [q, get] of [[7, s => s.f7], [11, s => s.f11], [31, s => s.f31]]) {
  let n = 0, rate = 0;
  for (const z of zones) {
    if (z.p < 1000) continue;
    n++;
    rate += (get(z.snap.ze) - get(z.snap.ss)) / (z.pp * z.pp - z.p * z.p);
  }
  const pred = sArr[qIdx.get(q)] / 5;
  console.log(`  q=${q}: mean rate ${(rate / n).toExponential(3)} kills per unit length over ${n} shells; derived s(q)/5 = ${pred.toExponential(3)}; ratio ${f4(rate / n / pred)}`);
}
console.log('');

// ============================================================================
// SEC 3 — BUDGET VS CAPACITY, EVERY ZONE IN REACH
// ============================================================================
console.log('SEC 3 — ZONE KILL BUDGET B(p) VS PAIR CAPACITY C(p) (B <= C-1 forces a twin, pigeonhole; B is computable from the actives alone)');
{
  const zstat = [];
  for (const z of zones) {
    const s0 = z.snap.zs, s1 = z.snap.ze;
    const C = s1.pairs - s0.pairs, D = s1.dest - s0.dest, T = s1.twins - s0.twins, B = s1.comp - s0.comp;
    const dPi = s1.primes - s0.primes;
    assertTrue(`zone identity C=D+T p=${z.p}`, C === D + T);
    zstat.push({ p: z.p, pp: z.pp, C, D, T, B, dPi });
  }
  for (const p of [7, 11, 13]) {
    const zs = zstat.find(z => z.p === p);
    assertEq(`big-walk B(${p}) == direct small-pass B(${p})`, zs.B, smallZoneBudget.get(p));
  }
  // the crossover table
  console.log('  p | C | B | C-B | T | budget<capacity?');
  for (const z of zstat) {
    if (z.p > 200) break;
    console.log(`  ${z.p} | ${z.C} | ${z.B} | ${z.C - z.B} | ${z.T} | ${z.B <= z.C - 1 ? 'CERT' : 'no'}`);
  }
  // the pigeonhole is sharper than occupancy: destroyed pairs absorb DISTINCT
  // composite members (every channel integer belongs to exactly one pair), so
  // D <= B and T = C - D >= C - B: the budget arithmetic forces a twin COUNT.
  let tightZones = 0;
  for (const z of zstat) {
    assertTrue(`T >= C - B p=${z.p}`, z.T >= z.C - z.B);
    if (z.T === z.C - z.B) tightZones++;
  }
  const certs = zstat.filter(z => z.B <= z.C - 1);
  const lastCert = certs.length ? certs[certs.length - 1].p : null;
  const firstFail = zstat.find(z => z.B > z.C - 1);
  const strag = certs.filter(z => z.p > 60).map(z => z.p);
  console.log(`  T >= C - B holds at every zone (asserted); the bound is TIGHT (every destroyed pair used exactly one composite member) in ${tightZones} zones`);
  console.log(`  zones with B <= C-1 (unconditional occupancy certificate, ${certs.length} zones); forced twin count C-B in parens: ${certs.map(z => z.p + '(' + (z.C - z.B) + ')').join(' ')}`);
  console.log(`  last certified zone p = ${lastCert}; first failing zone p = ${firstFail ? firstFail.p : 'none'}; certified zones past p = 60: ${strag.length ? strag.join(' ') : 'NONE'}`);
  console.log(`  derived crossover: B < C  <=>  prime members > C  <=>  channel prime density > 1/2  <=>  (30/8)/ln(height) > 1/2 at height ~ p^2  <=>  ln p < 15/4, p* = e^{15/4} = ${Math.exp(15 / 4).toFixed(2)}`);
  // closed form and band means
  console.log('  closed form B(p) = (p\'^2 - p)/5 - (3/4) dPi (dPi = primes in (p, p\'^2-3]); sample zones:');
  for (const psel of [97, 997, 9967]) {
    const z = zstat.find(s => s.p === psel);
    const closed = (z.pp * z.pp - z.p) / 5 - 0.75 * z.dPi;
    console.log(`  p=${z.p}: C=${z.C} B=${z.B} closedB=${closed.toFixed(1)} (rel err ${pct((closed - z.B) / z.B)}%) B/C=${f4(z.B / z.C)} vs 2 - 15/(4 ln p) = ${f4(2 - 15 / (4 * Math.log(z.p)))}`);
  }
  const bands = [[7, 100], [100, 1000], [1000, 3163], [3163, 10000]];
  for (const [lo, hi] of bands) {
    let n = 0, sBC = 0, sPred = 0;
    for (const z of zstat) if (z.p >= lo && z.p < hi) { n++; sBC += z.B / z.C; sPred += 2 - 15 / (4 * Math.log(z.p)); }
    console.log(`  band p in [${lo}, ${hi}): mean B/C = ${f4(sBC / n)}, mean 2 - 15/(4 ln p) = ${f4(sPred / n)} (${n} zones)`);
  }
  // a-priori CRT main-term version (no zone data at all)
  let prod = 1, lastCRT = null;
  for (const q of P7) { prod *= (1 - 1 / q); if (2 * (1 - prod) < 1) lastCRT = q; else if (lastCRT !== null) break; }
  console.log(`  a-priori CRT main term 2(1 - prod_{7<=q<=p}(1-1/q)) stays < 1 up to p = ${lastCRT} — but it is a density, not a bound over a p^2 window; making it one is the standard sieve remainder problem`);
}
console.log('');

// ============================================================================
// SEC 4 — THE FREEZE SHELLS [p^2, p'^2): partition, occupancy, minima
// ============================================================================
console.log('SEC 4 — FREEZE SHELLS (fold p freezes pairs with p^2 <= a+2 < p\'^2; shells PARTITION [49, 1e8), zones overlap)');
{
  let minT = Infinity, minP = null, sum = 0;
  const lows = [];
  for (const z of zones) {
    const t = z.snap.ze.twins - z.snap.ss.twins;
    sum += t;
    if (t < minT) { minT = t; minP = z.p; }
    if (t <= 2) lows.push(`${z.p}:${t}`);
    z.shellT = t;
  }
  const first = zones[0], last = zones[NZ - 1];
  assertEq('shells partition (telescoping twins)', sum, last.snap.ze.twins - first.snap.ss.twins);
  console.log(`  ${NZ} shells, ${sum} twins frozen in them; minimum per shell = ${minT} (at p = ${minP}); EMPTY shells: ${zones.filter(z => z.shellT === 0).length}`);
  console.log(`  shells freezing <= 2 pairs (p:count): ${lows.length ? lows.join(' ') : 'none'}`);
}
console.log('');

// ============================================================================
// SEC 5 — THE INTRA-ZONE STAIRCASE
// ============================================================================
console.log('SEC 5 — INTRA-ZONE STAIRCASE (active destroyers of position n: {q: q^2 <= n+2} — pi(sqrt) inside the zone)');
for (const psel of [97, 997, 9967]) {
  const z = zones.find(s => s.p === psel);
  const w = z.pp * z.pp - z.p, cells = [];
  for (const u of [0, 0.25, 0.5, 0.75, 1]) {
    const n = z.p + u * w;
    cells.push(`u=${u}: ${piS[isqrt(Math.round(n + 2))] - 3}`);
  }
  console.log(`  zone p=${z.p}: active destroyer count ${cells.join('  ')} (pi(sqrt p)-3 at entry to pi(p')-3 at frontier)`);
}
{
  console.log('  treads: pair bin [q^2, q\'^2) by closer; S(q) = prod_{7<=r<=q}(1-2/r); truth/S must approach e^{2gamma}/4 = ' + f4(MERTENS_RATIO) + ' (origin-excess constant)');
  console.log('  q | pairs | alive% | S% | alive/S | tread kill share 2/q | tread spacing q\'^2-q^2');
  console.log(`  [11,49) | ${prePairs} | ${pct(preAlive / prePairs)} | 100.00 | 1.000 | - | - (pre-scour head, 100% alive by construction)`);
  for (const q of [7, 11, 13, 17, 19, 23, 29, 31, 53, 97, 199, 499, 997, 3167, 9973]) {
    const i = qIdx.get(q);
    const al = treadAlive[i] / treadPairs[i];
    const spacing = (i + 1 < K7) ? P7[i + 1] * P7[i + 1] - q * q : '- (truncated at 1e8)';
    console.log(`  ${q} | ${treadPairs[i]} | ${pct(al)} | ${pct(SArr[i])} | ${f3(al / SArr[i])} | ${(2 / q).toExponential(2)} | ${spacing}`);
  }
}
{
  console.log('  u-deciles per band: destroyed fraction measured | staircase-predicted 1 - mean S | alive/S ratio');
  const bands = [[100, 1000], [1000, 3163], [3163, 10000]];
  for (const [lo, hi] of bands) {
    const rows = [];
    for (let j = 1; j <= 10; j++) {
      let pj = 0, dj = 0, sj = 0;
      for (const z of zones) {
        if (z.p < lo || z.p >= hi) continue;
        const s1 = (j === 10) ? z.snap.ze : z.snap.ud[j];
        const s0 = (j === 1) ? z.snap.zs : z.snap.ud[j - 1];
        pj += s1.pairs - s0.pairs; dj += s1.dest - s0.dest; sj += s1.S - s0.S;
      }
      rows.push(`u${(j / 10).toFixed(1)}: ${pct(dj / pj)}|${pct(1 - sj / pj)}|${f3((1 - dj / pj) / (sj / pj))}`);
    }
    console.log(`  band [${lo},${hi}): ${rows.join('  ')}`);
  }
}
console.log('');

// ============================================================================
// SEC 6 — THE HALF-LEVEL HEAD HYPOTHESIS
// ============================================================================
console.log('SEC 6 — THE HALF-LEVEL HEAD (head(p) as a level-sqrt(p) object)');
{
  // (a) frozen-level equivalence, per zone, exact
  let nz = 0, differ = 0, treadPresent = 0;
  const bandCnt = new Map();
  let hZoneSum = 0, hZoneLn2 = 0, nB3 = 0;
  for (const z of zones) {
    const x0 = isqrt(z.p);
    let aF = 0, aFr = 0;
    for (let a = z.p + 1; a < SMALLN - 2; a++) {
      if (!OPENER.has(a % 30)) continue;
      const La = lpfS[a], Lb = lpfS[a + 2];
      if (aFr === 0 && (La === 0 || La > x0) && (Lb === 0 || Lb > x0)) aFr = a;
      if (La === 0 && Lb === 0) { aF = a; break; }
    }
    assertTrue(`head found p=${z.p}`, aF > 0 && aF + 2 < z.pp * z.pp);
    nz++;
    if (aFr !== aF) differ++;
    if (piS[isqrt(aF + 2)] - piS[x0] > 0) treadPresent++;
    const bd = z.p < 100 ? 0 : z.p < 1000 ? 1 : z.p < 3163 ? 2 : 3;
    if (!bandCnt.has(bd)) bandCnt.set(bd, [0, 0, 0]);
    const bc = bandCnt.get(bd); bc[0]++; if (aFr !== aF) bc[1]++; if (piS[isqrt(aF + 2)] - piS[x0] > 0) bc[2]++;
    if (bd === 3) { nB3++; hZoneSum += aF - z.p; hZoneLn2 += Math.log(z.p) ** 2; }
  }
  console.log(`  (a) frozen-level test over ${nz} zones: head(p) = first survivor of the FROZEN sqrt(p)-level sieve in ${nz - differ} zones (${pct((nz - differ) / nz)}%); a tread q^2 falls inside the head window in ${treadPresent} zones, and CHANGES the head in ${differ}`);
  const bn = ['[7,100)', '[100,1000)', '[1000,3163)', '[3163,1e4)'];
  for (const [bd, bc] of [...bandCnt.entries()].sort((a, b) => a[0] - b[0]))
    console.log(`      band ${bn[bd]}: ${bc[1]} of ${bc[0]} zones differ (${pct(bc[1] / bc[0])}%), tread present in ${bc[2]}`);
  console.log(`      zone-head coefficient, band [3163,1e4): ${f4(hZoneSum / hZoneLn2)} ln^2 p over ${nB3} zones (zonegap-01 measured 0.7229 at its own, higher, levels — cited, not recomputed)`);
}
{
  // (b) the renewal null: is mean head the forward-recurrence functional of
  // the twin-gap process at the same height?
  console.log('  (b) renewal test per window: meanGap g | gap coeff (HL 0.7574) | R = E[g^2]/2E[g] | meanHead h | h/R | h/g');
  console.log('      derived-constant chain: staircase-Mertens forward density gives coeff e^{2g}/(8 C2) = ' + f4(HLCOEFF * MERTENS_RATIO) + '; HL truth replaces it by 1/(2 C2) = ' + f4(HLCOEFF) + '; exponential gaps would force h = g');
  const wn = ['[11,1e4)', '[1e4,1e5)', '[1e5,1e6)', '[1e6,1e7)', '[1e7,1e8)'];
  for (let w = 0; w < NW; w++) {
    const mg = gSum[w] / gN[w], cg = gSum[w] / gLn2[w], R = gSum2[w] / (2 * gSum[w]);
    const mh = hSum[w] / hN[w], ch = hSum[w] / hLn2[w];
    console.log(`      ${wn[w]}: g=${f3(mg)} coeff ${f4(cg)} | R=${f3(R)} | h=${f3(mh)} coeff ${f4(ch)} | h/R=${f4(mh / R)} | h/g=${f4(mh / mg)} (${gN[w]} gaps, ${hN[w]} prime origins)`);
  }
  console.log(`      (${droppedPending} primes at the range end never saw their next twin: censored, excluded)`);
}
{
  // (c) head mod 30 vs the class-independence null
  let tot = 0; for (let c = 0; c < 30; c++) tot += headMod30[c];
  const nullV = new Float64Array(30);
  // h = a - p mod 30: null[c] = sum_i P(p ≡ i) P(a ≡ i + c)
  let settles = 0; for (let c = 0; c < 30; c++) settles += pClassTot[c];
  for (let c = 0; c < 30; c++) {
    let s = 0;
    for (let i = 0; i < 30; i++) s += (pClassTot[i] / settles) * (aClassTot[(i + c) % 30] / settles);
    nullV[c] = s * tot;
  }
  const rows = [];
  for (let c = 0; c < 30; c++) if (headMod30[c] > 0) rows.push([c, headMod30[c], nullV[c], headMod30[c] / nullV[c]]);
  rows.sort((x, y) => Math.abs(y[3] - 1) - Math.abs(x[3] - 1));
  console.log('  (c) head mod 30 vs class-independence null, 6 most deviant residues (residue: meas/null):');
  console.log('      ' + rows.slice(0, 6).map(r => `${r[0]}: ${f3(r[3])}`).join('  ') + `  (over ${tot} heads; deviations are the early-tread/small-h correlation, not new structure)`);
}
console.log('');

// ============================================================================
console.log(`elapsed ${((Date.now() - T0) / 1000).toFixed(1)} s`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/destroyer-census-01.js
//   invocation:  node research/destroyer-census-01.js
//   code-sha256: d20621038fa3a01491967bd77daed45e30f25ebb9d77c1be44cd7b294bfa2507
//   out-sha256:  1c286cc8e278a4ff6b80d02ddca4a070de0bb5e39ade72a3f3358c0954c49a43
//   body-lines:  187
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     2.0 s
// ============================================================================
// CALIBRATION (abort on mismatch)
//   [natal 10k window] 999/796/203, kill-level 539:543, live A:B 539:257 (2.097), destroyer counts 7:219 11:120 13:86 17:57 19:55  OK
//   [zone twins] T(7)=8 T(11)=9 T(13)=16 T(17)=17 T(23)=29  OK
//   [D3 youngest-prime zone kills, 22 levels 7..97]  OK
//
// SEC 2a — ENTRY FEE: q's guaranteed first kill (q^2-2, q^2); live iff q^2-2 prime
//   q in [7, 97]: 10 of 22 primes have q^2-2 prime (45.45%) — entry kill destroys a live pair
//   q in [101, 997]: 39 of 143 primes have q^2-2 prime (27.27%) — entry kill destroys a live pair
//   q in [1009, 9973]: 207 of 1061 primes have q^2-2 prime (19.51%) — entry kill destroys a live pair
//
// SEC 2b — k-TH-YOUNGEST LEDGER (zones with p >= 100; exact enumeration; null = 1 + (U-q)/ln((q+U)/2))
//   k | zones | mean kills | sd | min..max | mean channel | mean null | meas/null
//   1 | 1203 | 2.825 | 1.015 | 2..8 | 2.274 | 3.016 | 0.937
//   2 | 1203 | 4.781 | 1.395 | 3..11 | 3.766 | 5.033 | 0.950
//   3 | 1203 | 6.743 | 1.645 | 4..14 | 5.234 | 7.055 | 0.956
//   4 | 1203 | 8.720 | 1.858 | 5..16 | 6.730 | 9.085 | 0.960
//   5 | 1203 | 10.758 | 2.025 | 6..18 | 8.238 | 11.124 | 0.967
//   6 | 1203 | 12.781 | 2.236 | 7..22 | 9.735 | 13.178 | 0.970
//   7 | 1203 | 14.823 | 2.418 | 9..25 | 11.277 | 15.239 | 0.973
//   8 | 1203 | 16.890 | 2.574 | 10..27 | 12.829 | 17.312 | 0.976
//   slope of mean kills per seniority step k: 2.010 (derivation: interval (p/q_k, p'^2/q_k] has length ~2(p'-q_k), so ~2 kills per step; 9624 pi-formula cross-asserts in the prime regime)
//
// SEC 2c — BUDGET DECOMPOSITION, exact vs CRT 2*C*s(q) (zones p = 7, 11, 13)
//   p=7: C=11 B=3  q=7: 3 (crt 3.1)
//   p=11: C=15 B=7  q=7: 6 (crt 4.3)  q=11: 1 (crt 2.3)
//   p=13: C=27 B=12  q=7: 7 (crt 7.7)  q=11: 3 (crt 4.2)  q=13: 2 (crt 3.2)
//
// SEC 1 — DESTROYER CENSUS, channel openers 11..1e8
//   pairs 9999999, destroyed 9559689, survivors 440310; max q^2/member over all destroyers = 1.0000 (<= 1: no destroyer ever exceeds sqrt of its kill)
//   sum of derived nulls / measured destroyed = 0.9670 (the deficit sits in the large-q tail, where the asymptotic CRT density misprices the short window above q^2 — closed exactly below)
//   q | dest | share% | null% | dest/null | Afresh | Bfresh | A/B fresh | Blive | f_meas | Blive_pred | meas/pred
//   7 | 1788684 | 18.71 | 19.35 | 1.000 | 1428571 | 1428572 | 1.000 | 360113 | 0.2521 | 360138.1 | 1.000
//   11 | 959162 | 10.03 | 10.38 | 1.000 | 779220 | 779220 | 1.000 | 179942 | 0.2309 | 180068.7 | 0.999
//   13 | 734485 | 7.68 | 7.94 | 1.000 | 599400 | 599400 | 1.000 | 135085 | 0.2254 | 135051.0 | 1.000
//   17 | 515966 | 5.40 | 5.58 | 1.000 | 423106 | 423106 | 1.000 | 92860 | 0.2195 | 92848.0 | 1.000
//   19 | 433682 | 4.54 | 4.69 | 1.000 | 356301 | 356299 | 1.000 | 77381 | 0.2172 | 77372.6 | 1.000
//   23 | 338540 | 3.54 | 3.66 | 1.000 | 278844 | 278845 | 1.000 | 59696 | 0.2141 | 59788.7 | 0.998
//   29 | 256513 | 2.68 | 2.77 | 1.001 | 211539 | 211536 | 1.000 | 44974 | 0.2126 | 44841.2 | 1.003
//   31 | 231378 | 2.42 | 2.50 | 1.000 | 191065 | 191064 | 1.000 | 40313 | 0.2110 | 40356.3 | 0.999
//   37 | 187486 | 1.96 | 2.03 | 1.000 | 154911 | 154914 | 1.000 | 32575 | 0.2103 | 32509.0 | 1.002
//   41 | 164502 | 1.72 | 1.78 | 1.000 | 136019 | 136013 | 1.000 | 28483 | 0.2094 | 28443.8 | 1.001
//   43 | 152915 | 1.60 | 1.65 | 1.000 | 126519 | 126522 | 1.000 | 26396 | 0.2086 | 26411.4 | 0.999
//   47 | 136517 | 1.43 | 1.48 | 0.999 | 113067 | 113052 | 1.000 | 23450 | 0.2074 | 23539.1 | 0.996
//   53 | 118603 | 1.24 | 1.28 | 1.001 | 98134 | 98128 | 1.000 | 20469 | 0.2086 | 20372.1 | 1.005
//   71 | 82654 | 0.86 | 0.89 | 1.001 | 68550 | 68555 | 1.000 | 14104 | 0.2057 | 14146.1 | 0.997
//   97 | 56809 | 0.59 | 0.61 | 1.003 | 47163 | 47167 | 1.000 | 9646 | 0.2045 | 9684.9 | 0.996
//   199 | 23220 | 0.24 | 0.26 | 0.981 | 19264 | 19243 | 1.001 | 3956 | 0.2056 | 3926.2 | 1.008
//   499 | 8119 | 0.08 | 0.09 | 1.003 | 6724 | 6698 | 1.004 | 1395 | 0.2083 | 1368.3 | 1.020
//   997 | 4219 | 0.04 | 0.04 | 1.163 | 3547 | 3547 | 1.000 | 672 | 0.1895 | 721.5 | 0.931
//   3167 | 1346 | 0.01 | 0.01 | 1.514 | 1112 | 1105 | 1.006 | 234 | 0.2118 | 220.9 | 1.059
//   9973 | 1 | 0.00 | 0.00 | 0.680 | 1 | 1 | 1.000 | 0 | 0.0000 | 0.2 | 0.000
//   prime-regime closure: for q in {997, 3167, 9973} the measured Afresh/Bfresh EQUAL the enumerated counts of primes m with q*m in the opener/closer classes (asserted) — a big destroyer's every kill is q x prime
//   first-mover: destroyer count / derived null, per window (decay of the excess)
//   q | [11,1e4) | [1e4,1e5) | [1e5,1e6) | [1e6,1e7) | [1e7,1e8)
//   7 | 1.000 | 0.995 | 1.000 | 1.000 | 1.000
//   11 | 1.045 | 1.000 | 1.000 | 0.999 | 1.000
//   13 | 0.987 | 0.995 | 1.004 | 1.000 | 1.000
//   17 | 0.948 | 1.016 | 1.000 | 0.999 | 1.000
//   19 | 1.099 | 0.979 | 1.001 | 1.000 | 1.000
//   23 | 1.046 | 0.976 | 0.999 | 1.001 | 1.000
//   concentration: share of ALL destruction done by destroyers q <= 1e8^eps (measured | derived null)
//   eps=0.125 (q <= 10): 18.71% | 19.35% — 1 of 1226 destroyer primes (0.08%)
//   eps=0.167 (q <= 22): 46.36% | 47.94% — 5 of 1226 destroyer primes (0.41%)
//   eps=0.200 (q <= 40): 56.97% | 58.91% — 9 of 1226 destroyer primes (0.73%)
//   eps=0.250 (q <= 100): 70.43% | 72.82% — 22 of 1226 destroyer primes (1.79%)
//   eps=0.333 (q <= 461): 84.13% | 87.26% — 86 of 1226 destroyer primes (7.01%)
//   eps=0.400 (q <= 1585): 91.96% | 94.44% — 247 of 1226 destroyer primes (20.15%)
//   eps=0.500 (q <= 10000): 100.00% | 100.00% — 1226 of 1226 destroyer primes (100.00%)
//   50.00% of destruction is done by q <= 29 (eps = 0.183, 7 of 1226 primes)
//   90.00% of destruction is done by q <= 1153 (eps = 0.383, 188 of 1226 primes)
//   99.00% of destruction is done by q <= 6131 (eps = 0.473, 796 of 1226 primes)
//
// SEC 2d — FIXED-q CHANNEL KILL RATE PER UNIT FROZEN TERRITORY (shells p in [1000, 9967]; derived rate s(q)/5)
//   q=7: mean rate 2.857e-2 kills per unit length over 1060 shells; derived s(q)/5 = 2.857e-2; ratio 1.0000
//   q=11: mean rate 1.558e-2 kills per unit length over 1060 shells; derived s(q)/5 = 1.558e-2; ratio 1.0000
//   q=31: mean rate 3.820e-3 kills per unit length over 1060 shells; derived s(q)/5 = 3.821e-3; ratio 0.9998
//
// SEC 3 — ZONE KILL BUDGET B(p) VS PAIR CAPACITY C(p) (B <= C-1 forces a twin, pigeonhole; B is computable from the actives alone)
//   p | C | B | C-B | T | budget<capacity?
//   7 | 11 | 3 | 8 | 8 | CERT
//   11 | 15 | 7 | 8 | 9 | CERT
//   13 | 27 | 12 | 15 | 16 | CERT
//   17 | 33 | 20 | 13 | 17 | CERT
//   19 | 50 | 33 | 17 | 21 | CERT
//   23 | 81 | 61 | 20 | 29 | CERT
//   29 | 92 | 73 | 19 | 30 | CERT
//   31 | 133 | 113 | 20 | 41 | CERT
//   37 | 164 | 142 | 22 | 48 | CERT
//   41 | 180 | 161 | 19 | 50 | CERT
//   43 | 216 | 196 | 20 | 61 | CERT
//   47 | 275 | 257 | 18 | 74 | CERT
//   53 | 342 | 330 | 12 | 87 | CERT
//   59 | 365 | 355 | 10 | 91 | CERT
//   61 | 442 | 441 | 1 | 110 | CERT
//   67 | 497 | 503 | -6 | 121 | no
//   71 | 525 | 538 | -13 | 123 | no
//   73 | 616 | 641 | -25 | 138 | no
//   79 | 680 | 714 | -34 | 152 | no
//   83 | 783 | 840 | -57 | 166 | no
//   89 | 931 | 1013 | -82 | 187 | no
//   97 | 1010 | 1101 | -91 | 202 | no
//   101 | 1050 | 1153 | -103 | 208 | no
//   103 | 1134 | 1259 | -125 | 218 | no
//   107 | 1176 | 1313 | -137 | 223 | no
//   109 | 1265 | 1418 | -153 | 234 | no
//   113 | 1601 | 1821 | -220 | 276 | no
//   127 | 1703 | 1954 | -251 | 288 | no
//   131 | 1863 | 2146 | -283 | 315 | no
//   137 | 1917 | 2218 | -301 | 320 | no
//   139 | 2205 | 2571 | -366 | 365 | no
//   149 | 2264 | 2642 | -378 | 374 | no
//   151 | 2449 | 2873 | -424 | 394 | no
//   157 | 2641 | 3123 | -482 | 411 | no
//   163 | 2772 | 3286 | -514 | 432 | no
//   167 | 2975 | 3553 | -578 | 455 | no
//   173 | 3186 | 3826 | -640 | 480 | no
//   179 | 3257 | 3912 | -655 | 492 | no
//   181 | 3629 | 4394 | -765 | 541 | no
//   191 | 3705 | 4488 | -783 | 547 | no
//   193 | 3861 | 4696 | -835 | 567 | no
//   197 | 3939 | 4799 | -860 | 574 | no
//   199 | 4431 | 5435 | -1004 | 626 | no
//   T >= C - B holds at every zone (asserted); the bound is TIGHT (every destroyed pair used exactly one composite member) in 1 zones
//   zones with B <= C-1 (unconditional occupancy certificate, 15 zones); forced twin count C-B in parens: 7(8) 11(8) 13(15) 17(13) 19(17) 23(20) 29(19) 31(20) 37(22) 41(19) 43(20) 47(18) 53(12) 59(10) 61(1)
//   last certified zone p = 61; first failing zone p = 67; certified zones past p = 60: 61
//   derived crossover: B < C  <=>  prime members > C  <=>  channel prime density > 1/2  <=>  (30/8)/ln(height) > 1/2 at height ~ p^2  <=>  ln p < 15/4, p* = e^{15/4} = 42.52
//   closed form B(p) = (p'^2 - p)/5 - (3/4) dPi (dPi = primes in (p, p'^2-3]); sample zones:
//   p=97: C=1010 B=1101 closedB=1100.5 (rel err -0.04%) B/C=1.0901 vs 2 - 15/(4 ln p) = 1.1803
//   p=997: C=101708 B=143676 closedB=143670.3 (rel err -0.00%) B/C=1.4126 vs 2 - 15/(4 ln p) = 1.4569
//   p=9967: C=9945076 B=15592286 closedB=15592008.1 (rel err -0.00%) B/C=1.5678 vs 2 - 15/(4 ln p) = 1.5927
//   band p in [7, 100): mean B/C = 0.8528, mean 2 - 15/(4 ln p) = 0.9202 (22 zones)
//   band p in [100, 1000): mean B/C = 1.3218, mean 2 - 15/(4 ln p) = 1.3785 (143 zones)
//   band p in [1000, 3163): mean B/C = 1.4663, mean 2 - 15/(4 ln p) = 1.5037 (278 zones)
//   band p in [3163, 10000): mean B/C = 1.5419, mean 2 - 15/(4 ln p) = 1.5698 (782 zones)
//   a-priori CRT main term 2(1 - prod_{7<=q<=p}(1-1/q)) stays < 1 up to p = 59 — but it is a density, not a bound over a p^2 window; making it one is the standard sieve remainder problem
//
// SEC 4 — FREEZE SHELLS (fold p freezes pairs with p^2 <= a+2 < p'^2; shells PARTITION [49, 1e8), zones overlap)
//   1225 shells, 438186 twins frozen in them; minimum per shell = 2 (at p = 11); EMPTY shells: 0
//   shells freezing <= 2 pairs (p:count): 11:2 17:2 29:2
//
// SEC 5 — INTRA-ZONE STAIRCASE (active destroyers of position n: {q: q^2 <= n+2} — pi(sqrt) inside the zone)
//   zone p=97: active destroyer count u=0: 1  u=0.25: 12  u=0.5: 17  u=0.75: 20  u=1: 23 (pi(sqrt p)-3 at entry to pi(p')-3 at frontier)
//   zone p=997: active destroyer count u=0: 8  u=0.25: 93  u=0.5: 124  u=0.75: 147  u=1: 166 (pi(sqrt p)-3 at entry to pi(p')-3 at frontier)
//   zone p=9967: active destroyer count u=0: 22  u=0.25: 664  u=0.5: 903  u=0.75: 1072  u=1: 1226 (pi(sqrt p)-3 at entry to pi(p')-3 at frontier)
//   treads: pair bin [q^2, q'^2) by closer; S(q) = prod_{7<=r<=q}(1-2/r); truth/S must approach e^{2gamma}/4 = 0.7931 (origin-excess constant)
//   q | pairs | alive% | S% | alive/S | tread kill share 2/q | tread spacing q'^2-q^2
//   [11,49) | 4 | 100.00 | 100.00 | 1.000 | - | - (pre-scour head, 100% alive by construction)
//   7 | 7 | 57.14 | 71.43 | 0.800 | 2.86e-1 | 72
//   11 | 5 | 40.00 | 58.44 | 0.684 | 1.82e-1 | 48
//   13 | 12 | 58.33 | 49.45 | 1.180 | 1.54e-1 | 120
//   17 | 7 | 28.57 | 43.63 | 0.655 | 1.18e-1 | 72
//   19 | 17 | 23.53 | 39.04 | 0.603 | 1.05e-1 | 168
//   23 | 31 | 25.81 | 35.65 | 0.724 | 8.70e-2 | 312
//   29 | 12 | 16.67 | 33.19 | 0.502 | 6.90e-2 | 120
//   31 | 41 | 26.83 | 31.05 | 0.864 | 6.45e-2 | 408
//   53 | 67 | 19.40 | 24.54 | 0.791 | 3.77e-2 | 672
//   97 | 79 | 18.99 | 19.15 | 0.992 | 2.06e-2 | 792
//   199 | 492 | 10.57 | 14.26 | 0.741 | 1.01e-2 | 4920
//   499 | 401 | 6.98 | 10.60 | 0.658 | 4.01e-3 | 4008
//   997 | 2407 | 7.94 | 8.66 | 0.917 | 2.01e-3 | 24072
//   3167 | 1267 | 5.60 | 6.39 | 0.877 | 6.32e-4 | 12672
//   9973 | 53927 | 3.93 | 4.89 | 0.803 | 2.01e-4 | - (truncated at 1e8)
//   u-deciles per band: destroyed fraction measured | staircase-predicted 1 - mean S | alive/S ratio
//   band [100,1000): u0.1: 86.27|82.93|0.804  u0.2: 89.45|86.89|0.804  u0.3: 90.38|88.00|0.802  u0.4: 90.90|88.64|0.801  u0.5: 91.30|89.10|0.798  u0.6: 91.60|89.44|0.796  u0.7: 91.81|89.71|0.796  u0.8: 91.99|89.94|0.796  u0.9: 92.15|90.13|0.795  u1.0: 92.26|90.29|0.797
//   band [1000,3163): u0.1: 91.00|88.73|0.799  u0.2: 92.77|91.01|0.805  u0.3: 93.28|91.66|0.806  u0.4: 93.60|92.05|0.804  u0.5: 93.81|92.31|0.806  u0.6: 94.00|92.52|0.801  u0.7: 94.14|92.68|0.800  u0.8: 94.25|92.82|0.800  u0.9: 94.34|92.93|0.801  u1.0: 94.42|93.03|0.801
//   band [3163,10000): u0.1: 93.59|92.01|0.802  u0.2: 94.75|93.42|0.799  u0.3: 95.09|93.83|0.797  u0.4: 95.29|94.08|0.796  u0.5: 95.43|94.25|0.795  u0.6: 95.54|94.38|0.794  u0.7: 95.62|94.49|0.794  u0.8: 95.69|94.58|0.795  u0.9: 95.76|94.66|0.794  u1.0: 95.81|94.72|0.794
//
// SEC 6 — THE HALF-LEVEL HEAD (head(p) as a level-sqrt(p) object)
//   (a) frozen-level test over 1225 zones: head(p) = first survivor of the FROZEN sqrt(p)-level sieve in 1184 zones (96.65%); a tread q^2 falls inside the head window in 105 zones, and CHANGES the head in 41
//       band [7,100): 2 of 22 zones differ (9.09%), tread present in 7
//       band [100,1000): 9 of 143 zones differ (6.29%), tread present in 30
//       band [1000,3163): 16 of 278 zones differ (5.76%), tread present in 23
//       band [3163,1e4): 14 of 782 zones differ (1.79%), tread present in 45
//       zone-head coefficient, band [3163,1e4): 0.6693 ln^2 p over 782 zones (zonegap-01 measured 0.7229 at its own, higher, levels — cited, not recomputed)
//   (b) renewal test per window: meanGap g | gap coeff (HL 0.7574) | R = E[g^2]/2E[g] | meanHead h | h/R | h/g
//       derived-constant chain: staircase-Mertens forward density gives coeff e^{2g}/(8 C2) = 0.6007; HL truth replaces it by 1/(2 C2) = 0.7574; exponential gaps would force h = g
//       [11,1e4): g=49.241 coeff 0.7723 | R=42.929 | h=46.896 coeff 0.7064 | h/R=1.0924 | h/g=0.9524 (203 gaps, 1226 prime origins)
//       [1e4,1e5): g=88.463 coeff 0.7687 | R=76.990 | h=82.994 coeff 0.7177 | h/R=1.0780 | h/g=0.9382 (1019 gaps, 8363 prime origins)
//       [1e5,1e6): g=129.573 coeff 0.7633 | R=118.438 | h=123.368 coeff 0.7236 | h/R=1.0416 | h/g=0.9521 (6945 gaps, 68906 prime origins)
//       [1e6,1e7): g=177.129 coeff 0.7531 | R=164.022 | h=169.718 coeff 0.7192 | h/R=1.0347 | h/g=0.9582 (50811 gaps, 586081 prime origins)
//       [1e7,1e8): g=236.014 coeff 0.7579 | R=223.520 | h=229.199 coeff 0.7344 | h/R=1.0254 | h/g=0.9711 (381331 gaps, 5096856 prime origins)
//       (20 primes at the range end never saw their next twin: censored, excluded)
//   (c) head mod 30 vs class-independence null, 6 most deviant residues (residue: meas/null):
//       12: 1.074  0: 0.927  6: 1.053  28: 0.950  4: 1.044  10: 1.036  (over 5761432 heads; deviations are the early-tread/small-h correlation, not new structure)
//
// elapsed 2.0 s
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================================
// 1. THE CENSUS IS FULLY DERIVED — THE FIRST-MOVER EXCESS DISSOLVES INTO THE
//    NULL. Every destroyed pair to 1e8 (9,559,689 of 9,999,999 channel
//    pairs; survivors 440,310 = A007508's pi2(1e8) minus the two non-channel
//    pairs) carries a unique destroyer, and per-q counts sit at dest/null =
//    1.000 (q <= 97, worst 1.003) against a null derived BEFORE measuring:
//    CRT kill density s(q) = (1/q) prod_{7<=r<q}(1-1/r) per side, PNT opener
//    density (30/8)/ln a, times cf(q) — the residue exclusion q/(q-1) and the
//    Hardy-Littlewood local factors r(r-2)/(r-1)^2 of the primes below q.
//    The per-window ratio table is 1.000 everywhere from [1e5,1e6) on: the
//    "first-mover advantage" natal-onset-01 measured against the naive 2/q
//    was entirely the naive null's error, not a mechanism.
// 2. THE A/B IDENTITY QUANTIFIED: Afresh/Bfresh = 1.000 at every q (CRT's 3
//    A-classes vs 3 B-classes, e.g. 1,428,571 : 1,428,572 at q = 7), and the
//    live B share is the opener-prime fraction exactly as the proven
//    identity requires, with f_meas/f_pred = 1.000 once cf(q) is in the
//    null (the q = 7 residual under the bare PNT null is exactly 7/6 —
//    the destroyer's own residue exclusion).
// 3. BIG DESTROYERS ARE PRIME-REGIME EXACT: for q^3 > 1e8 every fresh kill
//    is q x prime, and the measured census columns EQUAL the enumerated
//    prime counts (asserted at q = 997, 3167, 9973; the ledger's
//    prime-regime formula, zonegap-02 §3.4, closing the large-q tail that
//    the asymptotic CRT density misprices — the 0.9670 null total).
// 4. CONCENTRATION: half of ALL destruction is done by the 7 primes <= 29
//    (eps = 0.183 of the range's log); 90% by q <= 1153 (15% of the
//    destroyer primes); the top prime alone (7) owns 18.71%. The census-
//    window share of 7 falls from natal's 27.51% at 1e4 (cited) to 18.71%
//    at 1e8, and
//    the derived cumulative null tracks the whole curve.
// 5. THE ZONE KILL BUDGET HAS A CLOSED FORM AND A CROSSOVER AT p = 61/67
//    (SEC 3, the object): B(p) = 2C(p) - (prime members) =
//    (p'^2-p)/5 - (3/4)(primes in the zone), relative error < 0.1% by
//    p = 97. Pigeonhole, one line: destroyed pairs absorb DISTINCT
//    composite members, so T >= C - B — a twin COUNT forced by counting
//    alone, computable from the actives {q <= p} with no primality input
//    beyond p. It certifies 15 zones, p = 7 .. 61 (forced counts 8, 8, 15,
//    ..., 10, 1 — tight at p = 7 where all 8 twins are forced), and DIES at
//    p = 67 (B = 503 against C = 497), never to return: B/C climbs toward
//    2 like 2 - 15/(4 ln p) (band means 0.8528, 1.3218, 1.4663, 1.5419 vs
//    predicted 0.9202, 1.3785, 1.5037, 1.5698). The crossover e^{15/4} = 42.52
//    underestimates the die-off (finite-height prime excess); the a-priori
//    CRT main term crosses at p = 59. Beyond 67 budget exceeds capacity
//    forever and PLACEMENT — the max wall — is again the whole question.
// 6. THE FREEZE SHELLS PARTITION AND NONE IS EMPTY IN REACH: 1,225 shells
//    [p^2, p'^2) to 1e8, minimum 2 frozen pairs (p = 11, 17, 29), zero
//    empty. Shells telescope exactly (438,186 frozen twins assert-equal the
//    endpoint difference). Zones overlap; shells are the partition-clean
//    finality object.
// 7. THE INTRA-ZONE STAIRCASE CARRIES THE ORIGIN-EXCESS CONSTANT,
//    EVERYWHERE: measured alive fraction / staircase S(q) sits at
//    0.794-0.806 in EVERY u-decile of every band (single treads noisier,
//    e.g. 0.877 at 3167) — the derived e^{2gamma}/4 = 0.7931
//    (origin-excess.md's rho(2)) with no u-dependence left over: the
//    within-zone destruction profile is the deterministic tread curve times
//    one constant. Tread violence falls as 2/q against spacing ~2q ln q:
//    early treads rare and violent (2/7 of survivors at 49), late treads
//    dense and negligible (2.01e-4 at 9973), exactly as Chris framed it.
// 8. THE HALF-LEVEL HEAD HYPOTHESIS IS CONFIRMED AS AN EXACT STATEMENT WITH
//    A VANISHING CORRECTION: head(p) IS the first survivor of the FROZEN
//    sqrt(p)-level sieve in 96.65% of zones, the correction (a tread inside
//    the head window that changes the head) falling 9.09% -> 1.79% across
//    bands. The 0.72 ln^2 p coefficient does NOT derive zero-parameter: the
//    Mertens forward density gives 0.6007, HL truth 0.7574, and the honest
//    renewal decomposition h = R x (prime-origin factor) measures h/R =
//    1.09 -> 1.03, falling with height (R = E[g^2]/2E[g], the uniform-
//    origin forward recurrence of the same window's twin gaps). The head
//    field is the gap process's renewal functional times a decaying
//    prime-origin excess — derived up to the gap shape and that excess,
//    not further. Head mod 30 deviates from class independence by at most
//    7.4% (residue 12), the small-h class correlation.
// ============================================================================
// FIGURE PROVENANCE. Calibration anchors are CITED from their producers and
// asserted, never re-derived: the 10k-window totals and destroyer counts
// (research/natal-onset-01.js), the zone twin counts and D3 youngest-kill
// list (research/zonegap-02-reduction.js), pi2(1e8) = 440,312 (OEIS
// A007508), zonegap-01's head coefficients 0.7229/0.7574 (quoted in SEC 6
// as context, not recomputed), natal's 27.51% share of 7 in its window
// (natal-onset-01.md §3). e^{2gamma}/4 = 0.79305 is origin-excess.md's
// constant, rederived here only as an arithmetic expression; 0.79305 is
// its 5-digit form. pi2(1e8) = 440,312 is the cited A007508 value.
// ---------------------------------------------------------------------------
