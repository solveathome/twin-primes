// ============================================================================
// ATTACK Z3 IMMUNE 01 — THE QR REFINEMENT SCORED AGAINST ITS OWN GUARDRAIL:
// THE IMMUNE OFFSET CLASSES OF THE SQUARE ANCHOR, THEIR SURVIVOR SURPLUS,
// THE PLACEMENT OF THE FIRST SURVIVOR, AND WHAT THEY DO TO K*
// ============================================================================
// THE QUESTION (TODO item Z3, verbatim). "The transplant's caps are
// anchor-blind within the window; stretch-01 §4's proven structure (kill
// classes are QR-determined; immune offset classes exist at every square
// anchor; redistribution-only guardrail) is unused. Immune classes are
// positions no active prime in a QR-blocked class can ever kill; do they
// lower K* or concentrate the floor?"
//
// THE PREREGISTRATION. research/history/staging/attack-z3-immune-01.md §1,
// written 2026-08-28T10:51:41Z BEFORE this file existed and before any
// number below was computed. The seal is UNSEALED: no git command may be
// run in this session, so nothing timestamps §1 ahead of this producer
// except the order of writing inside one session. Every band, null and
// precondition scored in SEC 4 is quoted from §1 as written. TWO disclosed
// deviations, both forced by the arithmetic and both recorded in the note:
//   (D1) §1's control origin N = Q^2 - w is a PERFECT SQUARE at some
//        anchors (Q = 113 gives N = 9409 = 97^2, a prime square, which is
//        the very structure the control must not have). The producer
//        therefore steps N down by 30 until it is not a square, keeping the
//        width, the active set and the finality property; the number of
//        anchors stepped is printed.
//   (D2) §1's registered estimator-calibration precondition FIRES (SEC 2):
//        the analytic null mu_Q = sum nu^2 / sum nu is the with-replacement
//        mean and the realised survivor set is a fixed-size sample, so the
//        two differ at order T/C, which is far above one s.e. §1's own
//        remedy is then binding: the analytic primary is VOID and only the
//        MC-corrected form is read. SEC 2b computes the exact
//        without-replacement null per anchor by Monte Carlo and SEC 4
//        scores the corrected statistic against §1's unchanged bands.
//
// THE GUARDRAIL, FIRST (stretch-01 §4, PROVEN). Summing the kill incidence
// over the r offset classes gives exactly 2(r-1) — the generic ensemble
// mean 2/r. The QR structure REDISTRIBUTES kills over offsets and removes
// none. Route B is CLOSED (research/REFUTED.md) and nothing here reopens
// it: the redistribution factor is this run's NULL, not its finding.
//
// SETTING.
//   anchor     prime Q, successor Q'; stretch S_Q = [Q^2, Q'^2), width
//              w = Q'^2 - Q^2; offset t = a - Q^2.
//   window     HALF-OPEN with BOTH members inside: the pair (a, a+2) is in
//              S_Q iff Q^2 <= a and a+2 < Q'^2 (quadpoint-identity-01.md,
//              load-bearing convention).
//   pair       opener a = 11, 17, 29 (mod 30); closer a+2 = 13, 19, 1.
//   actives    primes 7 <= r <= Q (freeze S1, stretch-01 §1); survivors of
//              the actives are EXACTLY the twin openers (finality S2).
//   kill law   active r kills Q^2 + t iff t = -alpha or -alpha-2 (mod r),
//              alpha = (Q mod r)^2 a NONZERO quadratic residue
//              (stretch-01 §4(i), PROVEN, verified r = 7..31 to Q = 2000).
//   immune     I_r = { c : neither -c nor -c-2 is a nonzero QR mod r },
//              killable by r at NO square anchor. R* = {7..31}, i_r sizes
//              2,3,4,4,5,6,8,8 (stretch-01.js SEC C1; re-derived and
//              asserted here against the published lists).
//   weight     nu(t) = prod_{r in R*} f_r(t), f_r = r/(r-2) when t is
//              immune to r, else [(r-i_r-2)/(r-i_r)]*[r/(r-2)]. The
//              guardrail forces E[f_r] = 1 on uniform t EXACTLY; asserted.
//   caps       attack-quadpoint-01.js verbatim: capU_K(r) counts
//              candidates v = r*m in the window with lpf(m) >= r passing
//              the other-member freshness conditions of the first K
//              actives below r; floor_K = C - sum_r capU_K(r);
//              K* = least K with floor_K >= 1.
//   restricted M_A = openers immune to every r in A (A inside {7,11,13});
//              floor_K^A = C_A - sum_{r not in A} capU_K^A(r) with the pool
//              taken over actives below r EXCLUDING A. Sound: primes in A
//              kill nothing in M_A, so floor_K^A >= 1 certifies a twin in
//              S_Q. K*_A < K* would be a REAL reduction of the depth cost.
//   comparator (POST HOC, SEC 6, carries no preregistered verdict) the
//              QR-BLIND restriction N_A = openers not killed by 7, 11, 13
//              AT THIS ANCHOR, density prod (1-2/r) = 0.494 against M_A's
//              prod i_r/r = 0.024. Same certificate, same soundness; it is
//              the exact-head-plus-caps object whose use as a PROOF
//              technique is CLOSED (attack-beta2-03-exact-strata.md,
//              infinite regress) and which stands here only as the
//              finite-range yardstick the QR refinement has to beat.
//   control    the NON-SQUARE family W_Q = [N, N + w) ending at Q^2, origin
//              N = Q^2 - w stepped down by 30 while N is a perfect square
//              (deviation D1). Every composite below Q^2 has lpf below Q,
//              so the active set and finality are identical; N is asserted
//              non-square, so its kill classes {-N, -N-2} mod r carry no QR
//              constraint. Pseudo-immune J_r: a seeded Fisher-Yates
//              permutation of Z_r supplies the first i_r classes avoiding
//              K_r(N), so |J_r| = i_r and pseudo-immunity implies survival
//              of r exactly as true immunity does. Same code path, same
//              null, QR-ness stripped and nothing else.
//
// WIDTH AUDIT (the levels this RUNS at). Registered level QMAX = 10007, next
// prime 10009, top window hi <= 10009^2 = 100,180,081 < 2^31; everything —
// statistics, control, Monte Carlo, certificates — runs there. Statistics-only
// extension QEXT = 31607, next prime 31627, hi <= 31627^2 = 1,000,267,129
// < 2^31 (asserted), which is the same audit attack-quadpoint-02.js carries
// for its own pre-committed escalation; the certificate engine is NOT run at
// that level. The control window runs
// DOWN from Q^2, low end N >= 37^2 - 72 - 30k > 0 at every anchor used
// (asserted positive). Candidates v = r*m <= hi < 2^31. Window offsets
// < 2^23 for the mask arrays. Counts
// < 2^31. nu is a product of 8 factors, range [0.5960, 3.2211], and every
// sum of nu is below 10^7, so all doubles are far inside exact range. No
// bit shifts on values above 2^30. Anything past Q = 31607 needs a fresh
// audit and does not run here; the full decade Q ~ 10^5 would put
// hi ~ 10^10 past 2^31 and, by measured scaling of the Q^2 sieved range,
// near 19 minutes, past the ten-minute rule.
//
// PRIOR ART ON DISK (cited, extended, never re-derived):
//   research/stretch-01.js SEC C1        the QR kill law, the immune class
//                                        lists, the 2(r-1) guardrail.
//   research/history/staging/stretch-01.md §4  the proven structure and the
//                                        "structure, not advantage" verdict.
//   research/attack-quadpoint-01.js      the transplant, caps, floor, K*;
//                                        its embedded OUTPUT is the
//                                        calibration authority in SEC 3.
//   research/attack-quadpoint-02.js      the segmented engine and KCAP = 64.
//   research/history/staging/quadpoint-identity-01.md  the half-open window
//                                        convention, load-bearing.
//   research/history/staging/attack-beta2-03-exact-strata.md  the exact-head
//                                        technique, CLOSED as a proof route.
//   research/REFUTED.md                  Route B, closed.
// ============================================================================
'use strict';
const T0 = Date.now();

let failures = 0;
function assertEq(tag, got, want) {
  if (got !== want) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; }
  return true;
}
function assertTrue(tag, cond) { if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]`); } return cond; }
function assertNear(tag, got, want, tol) { if (!(Math.abs(got - want) <= tol)) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want} +/- ${tol}`); return false; } return true; }
const f2 = (x) => x.toFixed(2);
const f3 = (x) => x.toFixed(3);
const f4 = (x) => x.toFixed(4);
const f5 = (x) => x.toFixed(5);
const f1 = (x) => x.toFixed(1);
const sgn = (x) => (x >= 0 ? '+' : '');

// ---------- prime tables ----------
const PLIM = 31700;
const flag = new Uint8Array(PLIM + 1); flag[0] = flag[1] = 1;
for (let p = 2; p * p <= PLIM; p++) if (!flag[p]) for (let m = p * p; m <= PLIM; m += p) flag[m] = 1;
const PRIMES = []; for (let n = 2; n <= PLIM; n++) if (!flag[n]) PRIMES.push(n);
const ACT = PRIMES.filter(p => p >= 7);
const QMAX = 10007;             // the registered level: bands, verdicts, certificates
const QEXT = 31607;             // statistics-only extension (hi = 31627^2 < 2^31)
const ANCHORS = ACT.filter(p => p <= QEXT);
const NREG = ANCHORS.filter(p => p <= QMAX).length;
const nextPrime = (n) => PRIMES[PRIMES.findIndex(p => p > n)];
assertEq('next prime above QMAX', nextPrime(QMAX), 10009);
assertEq('width audit: top window < 2^31', 10009 * 10009 < 2 ** 31, true);

const KCAP = 64;          // pool-scan cap above the v1 overlap (quadpoint-02)
const CALMAX = 1499;      // v1 overlap: uncapped pool, full-depth bijection
const QSTAT = 37;         // statistics floor: every r in R* active and < Q
const MCB = 40;           // Monte Carlo replicates per anchor (deviation D2)
const isOpen30 = (c) => c === 11 || c === 17 || c === 29;
const isClose30 = (c) => c === 13 || c === 19 || c === 1;

// ============================================================================
console.log('SEC 0 — CALIBRATION (abort on any mismatch)');
// ============================================================================
{
  let fp = 122; while (flag[fp]) fp++;
  assertEq('hand anchor: first prime above 121', fp, 127);
  fp = 170; while (flag[fp]) fp++;
  assertEq('hand anchor: first prime above 169', fp, 173);
}
const RSTAR = [7, 11, 13, 17, 19, 23, 29, 31];
const PUBLISHED_IMMUNE = {   // stretch-01.js SEC C1 embedded OUTPUT, cited
  7: '0,2', 11: '1,3,9', 13: '0,5,6,11', 17: '3,5,10,12',
  19: '4,5,7,9,17', 23: '0,1,2,4,6,16', 29: '0,8,10,12,15,17,19,27',
  31: '0,2,5,7,8,14,16,18',
};
const immFlag = {}, iCnt = {}, fImm = {}, fNon = {};
for (const r of RSTAR) {
  const qr = new Set(); for (let u = 1; u < r; u++) qr.add((u * u) % r);
  const roots = (a) => { a = ((a % r) + r) % r; return a === 0 ? 0 : (qr.has(a) ? 2 : 0); };
  const fl = new Uint8Array(r); let inc = 0; const lst = [];
  for (let c = 0; c < r; c++) { const f = roots(-c) + roots(-c - 2); inc += f; if (f === 0) { fl[c] = 1; lst.push(c); } }
  assertEq(`guardrail incidence r=${r}`, inc, 2 * (r - 1));
  assertEq(`immune list r=${r} vs stretch-01`, lst.join(','), PUBLISHED_IMMUNE[r]);
  immFlag[r] = fl; iCnt[r] = lst.length;
  fImm[r] = r / (r - 2);
  fNon[r] = ((r - lst.length - 2) / (r - lst.length)) * (r / (r - 2));
  const mean = (lst.length / r) * fImm[r] + ((r - lst.length) / r) * fNon[r];
  assertNear(`E[f_r] = 1 at r=${r}`, mean, 1, 1e-13);
}
console.log('  immune class lists reproduce stretch-01.js SEC C1 digit-exact at r = ' + RSTAR.join(', '));
console.log('  sizes i_r = ' + RSTAR.map(r => iCnt[r]).join(', ') + '; kill incidence = 2(r-1) at every r; E[f_r] = 1 exactly at every r');
console.log('  immune factor r/(r-2)  = ' + RSTAR.map(r => f3(fImm[r])).join(', '));
console.log('  non-immune factor      = ' + RSTAR.map(r => f3(fNon[r])).join(', '));
{
  let hi = 1, lo = 1; for (const r of RSTAR) { hi *= fImm[r]; lo *= fNon[r]; }
  console.log(`  nu range: all-immune ${f4(hi)}, none-immune ${f4(lo)}; mean immunity index sum(i_r/r) = ${f3(RSTAR.reduce((s, r) => s + iCnt[r] / r, 0))}`);
}

// ---------- scratch buffers ----------
let maxW = 0;
{ let prev = 7; for (const p of ACT) { if (p > 31627) break; if (p > prev) maxW = Math.max(maxW, p * p - prev * prev); prev = p; } }
assertTrue('width audit: extension top window < 2^31', 31627 * 31627 < 2 ** 31);
const OBUF = Math.ceil(maxW / 10) + 512;
const comp = new Uint8Array(maxW + 8);
const dead = new Uint8Array(maxW + 8);
const NU = new Float64Array(OBUF);     // immune weight per opener
const NI = new Uint8Array(OBUF);       // immunity index per opener
const MM = new Uint8Array(OBUF);       // M_A membership bitmask per opener
const TWF = new Uint8Array(OBUF);      // twin flag per opener
const CDF = new Float64Array(OBUF);    // cumulative nu, for the MC null
const SEEN = new Int32Array(OBUF);     // MC scratch: replicate stamp
const PICK = new Int32Array(OBUF);

// mask bit 0 all, 1 immune to 7, 2 immune to {7,11}, 3 immune to {7,11,13}
function mMask(t) {
  let m = 1;
  if (immFlag[7][t % 7]) { m |= 2; if (immFlag[11][t % 11]) { m |= 4; if (immFlag[13][t % 13]) m |= 8; } }
  return m;
}
const isSquare = (n) => { const s = Math.round(Math.sqrt(n)); return s * s === n; };

// ---------- one window, both families ----------
// [lo, hi) half-open, both members inside; offsets are taken from lo.
function windowStats(lo, hi, Qact, map, checkImmunity) {
  const w = hi - lo;
  comp.fill(0, 0, w + 4);
  for (const p of PRIMES) { if (p > Qact) break; let v = Math.ceil(lo / p) * p; for (; v < hi; v += p) comp[v - lo] = 1; }
  let C = 0, T = 0, S1 = 0, S2 = 0, Tsum = 0, CH = 0, TH = 0, SH = 0, firstIdx = -1, chk = 0;
  const clsImm = new Int32Array(8);
  for (let a = lo; a + 2 < hi; a++) {
    if (!isOpen30(a % 30)) continue;
    const t = a - lo;
    let nu = 1, n = 0;
    for (let k = 0; k < 8; k++) { const r = RSTAR[k]; if (map[r][t % r]) { nu *= fImm[r]; n++; } else nu *= fNon[r]; }
    const tw = (!comp[a - lo] && !comp[a + 2 - lo]) ? 1 : 0;
    NU[C] = nu; NI[C] = n; TWF[C] = tw; MM[C] = mMask(t);
    S1 += nu; S2 += nu * nu;
    if (n >= 3) { CH++; SH += nu; if (tw) TH++; }
    if (tw) { T++; Tsum += nu; if (firstIdx < 0) firstIdx = C; for (let k = 0; k < 8; k++) if (map[RSTAR[k]][t % RSTAR[k]]) clsImm[k]++; }
    if (checkImmunity && chk < 400) {
      chk++;
      for (const r of RSTAR) if (map[r][t % r] && (a % r === 0 || (a + 2) % r === 0)) assertTrue(`immunity implies no kill (lo=${lo}, r=${r}, t=${t})`, false);
    }
    C++;
  }
  if (T === 0 || C === 0) return null;
  return { C, T, S1, S2, mu: S2 / S1, rho: (Tsum / T) / (S2 / S1), Tsum, clsImm,
    CH, TH, SH, pH: SH / S1, firstN: NI[firstIdx],
    lam2: (CH > 0 && TH > 0) ? Math.log((TH / CH) / (T / C)) - Math.log((SH / CH) / (S1 / C)) : NaN };
}

// ---------- the exact without-replacement null, by Monte Carlo ----------
// Successive sampling: draw T distinct openers, each draw proportional to nu
// among those not yet taken (implemented by draw-and-reject, which realises
// exactly that design). Returns the null means of every quantity scored.
let MCSEED = 20260828 >>> 0;
function mcRand() { MCSEED ^= MCSEED << 13; MCSEED >>>= 0; MCSEED ^= MCSEED >>> 17; MCSEED ^= MCSEED << 5; MCSEED >>>= 0; return (MCSEED + 1) / 4294967297; }
let MCSTAMP = 0;
function mcNull(C, T, B) {
  let c = 0; for (let i = 0; i < C; i++) { c += NU[i]; CDF[i] = c; }
  const tot = c;
  let accMean = 0, accH = 0, accFirstH = 0, accM = [0, 0, 0];
  for (let bb = 1; bb <= B; bb++) {
    const b = ++MCSTAMP;
    let got = 0, sv = 0, nH = 0, first = 1 << 30;
    const m = [0, 0, 0];
    let guard = 0;
    while (got < T && guard < 200 * T + 1000) {
      guard++;
      const x = mcRand() * tot;
      let a = 0, z = C - 1;
      while (a < z) { const mid = (a + z) >> 1; if (CDF[mid] < x) a = mid + 1; else z = mid; }
      if (SEEN[a] === b) continue;
      SEEN[a] = b; PICK[got++] = a;
      sv += NU[a]; if (NI[a] >= 3) nH++; if (a < first) first = a;
      const mm = MM[a];
      if (mm & 2) m[0]++; if (mm & 4) m[1]++; if (mm & 8) m[2]++;
    }
    accMean += sv / got; accH += nH; if (NI[first] >= 3) accFirstH++;
    for (let k = 0; k < 3; k++) accM[k] += m[k];
  }
  return { mean: accMean / B, H: accH / B, firstH: accFirstH / B,
    MA: [accM[0] / B, accM[1] / B, accM[2] / B] };
}

// ---------- the control's pseudo-immune map ----------
function pseudoMap(Q, N) {
  const map = {};
  for (const r of RSTAR) {
    let s = (Q * 2654435761 + r * 40503) >>> 0;
    const rnd = () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
    const perm = []; for (let c = 0; c < r; c++) perm.push(c);
    for (let i = r - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const tmp = perm[i]; perm[i] = perm[j]; perm[j] = tmp; }
    const k1 = ((-N % r) + r) % r, k2 = ((-(N + 2) % r) + r) % r;
    const fl = new Uint8Array(r); let got = 0;
    for (const c of perm) { if (got >= iCnt[r]) break; if (c === k1 || c === k2) continue; fl[c] = 1; got++; }
    assertEq(`pseudo-immune count r=${r} Q=${Q}`, got, iCnt[r]);
    assertTrue(`pseudo-immune avoids kills r=${r} Q=${Q}`, fl[k1] === 0 && fl[k2] === 0);
    map[r] = fl;
  }
  return map;
}

// ============================================================================
console.log('\nSEC 1 — THE PER-ANCHOR RUN: treatment (square anchor) and matched control');
// ============================================================================
const stat = [];
let stepped = 0, nAssert = 0;
for (let Qi = 0; Qi < NREG; Qi++) {
  const Q = ANCHORS[Qi];
  if (Q < QSTAT) continue;
  const Qp = Qi + 1 < ANCHORS.length ? ANCHORS[Qi + 1] : nextPrime(Q);
  const lo = Q * Q, hi = Qp * Qp, w = hi - lo;
  const full = Q <= CALMAX;
  const tre = windowStats(lo, hi, Q, immFlag, full);
  const treMC = tre ? mcNull(tre.C, tre.T, MCB) : null;
  // control (deviation D1): step the origin down by 30 while it is a square
  let N = lo - w, k = 0;
  while (isSquare(N)) { N -= 30; k++; }
  if (k) stepped++;
  assertTrue(`control origin non-square Q=${Q}`, !isSquare(N));
  assertTrue(`control origin positive Q=${Q}`, N > 0);
  assertTrue(`control window below the anchor Q=${Q}`, N + w <= lo);
  nAssert += 3;
  const ctl = windowStats(N, N + w, Q, pseudoMap(Q, N), false);
  const ctlMC = ctl ? mcNull(ctl.C, ctl.T, MCB) : null;
  stat.push({ Q, w, tre, treMC, ctl, ctlMC });
}
console.log(`  anchors with statistics: ${stat.length} (Q = ${stat[0].Q}..${stat[stat.length - 1].Q}); ${nAssert} control-origin asserts pass`);
console.log(`  control origins stepped off a perfect square (deviation D1): ${stepped}`);
console.log(`  anchors dropped for an empty twin set: treatment ${stat.filter(s => s.tre === null).length}, control ${stat.filter(s => s.ctl === null).length}`);
console.log(`  Monte Carlo null: ${MCB} replicates per anchor per family, successive sampling proportional to nu`);

// ============================================================================
console.log('\nSEC 2 — ESTIMATOR CALIBRATION (registered PRECONDITION of §1, read before the primary)');
// ============================================================================
function meanSd(xs) {
  const n = xs.length; if (!n) return { n: 0, m: NaN, sd: NaN, se: NaN };
  const m = xs.reduce((s, x) => s + x, 0) / n;
  const v = n > 1 ? xs.reduce((s, x) => s + (x - m) * (x - m), 0) / (n - 1) : 0;
  return { n, m, sd: Math.sqrt(v), se: Math.sqrt(v / n) };
}
const useT = stat.filter(s => s.tre !== null), useC = stat.filter(s => s.ctl !== null);
const rhoAnalytic = meanSd(useT.map(s => s.tre.rho));
let MCBIAS = NaN;
{
  console.log('  §1 registered 12 spread anchors; the run computes the MC null at EVERY anchor, so the');
  console.log('  12 below are a printed window on the same numbers, not a separate calculation.');
  console.log('        Q      C      T   analytic mu   MC null mean   (MC - analytic)/analytic');
  const idx = []; for (let k = 0; k < 12; k++) idx.push(Math.floor((k + 0.5) * useT.length / 12));
  for (const i of idx) {
    const s = useT[i];
    console.log(`     ${String(s.Q).padStart(5)}  ${String(s.tre.C).padStart(5)}  ${String(s.tre.T).padStart(5)}   ${f5(s.tre.mu)}        ${f5(s.treMC.mean)}        ${sgn(s.treMC.mean / s.tre.mu - 1)}${f5(s.treMC.mean / s.tre.mu - 1)}`);
  }
  MCBIAS = meanSd(useT.map(s => s.treMC.mean / s.tre.mu - 1)).m;
  console.log(`  MC null bias, mean over ALL ${useT.length} anchors: ${sgn(MCBIAS)}${f5(MCBIAS)}; one s.e. of the primary = ${f5(rhoAnalytic.se)}`);
  const pass = Math.abs(MCBIAS) <= rhoAnalytic.se;
  console.log(`  **PRECONDITION: ${pass ? 'PASS — the analytic primary is read as registered' : 'FIRES — the analytic primary is VOID; §1\'s own remedy binds and only the MC-corrected form is read'}**`);
}

// ============================================================================
console.log('\nSEC 3 — THE CERTIFICATE ENGINE: baseline K* (v1 reproduction) and the restricted K*_A');
// ============================================================================
// variants: 0 baseline; 1..3 the immune restrictions M_A; 4 the POST HOC
// QR-blind comparator N_A (openers not killed by 7, 11, 13 at this anchor).
const VAR = [{ name: 'base', A: [], bit: 1 }, { name: 'M{7}', A: [7], bit: 2 },
  { name: 'M{7,11}', A: [7, 11], bit: 4 }, { name: 'M{7,11,13}', A: [7, 11, 13], bit: 8 },
  { name: 'N{7,11,13}', A: [7, 11, 13], bit: 16 }];
const NV = VAR.length;
const inAv = VAR.map(V => [0, 1, 2].map(k => (V.A.indexOf(ACT[k]) >= 0 ? 1 : 0)));
const IDXV = new Int32Array(NV), DONEV = new Int32Array(NV);

function certAnchor(Qi) {
  const Q = ANCHORS[Qi], Qp = Qi + 1 < ANCHORS.length ? ANCHORS[Qi + 1] : nextPrime(Q);
  const lo = Q * Q, hi = Qp * Qp, w = hi - lo, nR = Qi + 1;
  const kEff = Q <= CALMAX ? nR : KCAP;
  // this anchor's kill classes for the QR-blind comparator
  const kill = {}; for (const r of [7, 11, 13]) { const al = (Q % r) * (Q % r) % r; kill[r] = [((r - al) % r), ((2 * r - al - 2) % r)]; }
  const notKilled = (t) => { for (const r of [7, 11, 13]) { const c = t % r; if (c === kill[r][0] || c === kill[r][1]) return false; } return true; };
  const fullMask = (t) => mMask(t) | (notKilled(t) ? 16 : 0);
  comp.fill(0, 0, w + 4); dead.fill(0, 0, w + 4);
  for (const p of PRIMES) { if (p > Q) break; let v = Math.ceil(lo / p) * p; for (; v < hi; v += p) comp[v - lo] = 1; }
  const Cv = new Int32Array(NV), Tv = new Int32Array(NV);
  for (let a = lo; a + 2 < hi; a++) {
    if (!isOpen30(a % 30)) continue;
    const t = a - lo, tw = (!comp[a - lo] && !comp[a + 2 - lo]) ? 1 : 0;
    const m = fullMask(t);
    for (let v = 0; v < NV; v++) if (m & VAR[v].bit) { Cv[v]++; if (tw) Tv[v]++; }
  }
  // the march (independent truth check + fresh counts)
  const fresh = new Int32Array(nR);
  for (let ri = 0; ri < nR; ri++) {
    const r = ACT[ri]; let v = Math.ceil(lo / r) * r;
    for (; v < hi; v += r) {
      const c = v % 30;
      if (isOpen30(c)) { if (v + 2 < hi && !dead[v - lo]) { dead[v - lo] = 1; fresh[ri]++; } }
      else if (isClose30(c)) { const a = v - 2; if (a >= lo && !dead[a - lo]) { dead[a - lo] = 1; fresh[ri]++; } }
    }
  }
  let Tmarch = 0; for (let a = lo; a + 2 < hi; a++) if (isOpen30(a % 30) && !dead[a - lo]) Tmarch++;
  assertEq(`independent T recount at Q=${Q}`, Tmarch, Tv[0]);
  // an anchored check of the QR kill law itself, at this anchor
  if (Q <= CALMAX) {
    for (let a = lo; a + 2 < hi && a < lo + 3000; a++) {
      if (!isOpen30(a % 30)) continue;
      const t = a - lo;
      for (const r of [7, 11, 13]) {
        const c = t % r, k = (a % r === 0) || ((a + 2) % r === 0);
        if (k !== (c === kill[r][0] || c === kill[r][1])) assertTrue(`QR kill law at Q=${Q}, r=${r}, t=${t}`, false);
      }
    }
  }
  // caps, every variant in one candidate pass
  const sumCap = []; const finiteByD = [];
  for (let v = 0; v < NV; v++) { sumCap.push(new Float64Array(kEff + 1)); finiteByD.push(new Int32Array(kEff + 2)); }
  const nCand = new Int32Array(NV);
  let freshViol = false, fullViol = false;
  const scanLim = kEff + 3;
  for (let ri = 0; ri < nR; ri++) {
    const r = ACT[ri];
    for (let v = 0; v < NV; v++) { nCand[v] = 0; finiteByD[v].fill(0); }
    const scanTo = Math.min(ri, scanLim);
    let vv = Math.ceil(lo / r) * r;
    for (; vv < hi; vv += r) {
      const c = vv % 30;
      let side = 0;
      if (isOpen30(c)) { if (vv + 2 < hi) side = 1; }
      else if (isClose30(c)) { if (vv - 2 >= lo) side = 2; }
      if (!side) continue;
      const m = vv / r;
      let ok = true;
      for (let k = 0; k < ri; k++) { const p2 = ACT[k]; if (p2 * p2 > m) break; if (m % p2 === 0) { ok = false; break; } }
      if (!ok) continue;
      const t = side === 1 ? vv - lo : vv - 2 - lo;
      let live = fullMask(t);
      if (ri < 3) for (let v = 0; v < NV; v++) if (inAv[v][ri]) live &= ~VAR[v].bit;
      if (!live) continue;
      let remaining = 0;
      for (let v = 0; v < NV; v++) if (live & VAR[v].bit) { nCand[v]++; IDXV[v] = 0; DONEV[v] = 0; remaining++; }
      for (let k = 0; k < scanTo && remaining > 0; k++) {
        const p2 = ACT[k];
        const fires = side === 1 ? (vv % p2 === p2 - 2) : (vv % p2 === 2);
        for (let v = 0; v < NV; v++) {
          if (!(live & VAR[v].bit) || DONEV[v]) continue;
          if (k < 3 && inAv[v][k]) continue;
          const ix = ++IDXV[v];
          if (fires) { if (ix <= kEff) finiteByD[v][ix]++; DONEV[v] = 1; remaining--; }
          else if (ix >= kEff) { DONEV[v] = 1; remaining--; }
        }
      }
    }
    for (let v = 0; v < NV; v++) {
      let excluded = 0;
      for (let K = 0; K <= kEff; K++) {
        if (K >= 1) excluded += finiteByD[v][K];
        const capK = nCand[v] - excluded;
        if (v === 0 && capK < fresh[ri]) freshViol = true;
        sumCap[v][K] += capK;
      }
      if (v === 0 && Q <= CALMAX) { let e = 0; for (let K = 1; K <= kEff; K++) e += finiteByD[0][K]; if (nCand[0] - e !== fresh[ri]) fullViol = true; }
    }
  }
  assertTrue(`capU >= fresh at every depth, Q=${Q}`, !freshViol);
  if (Q <= CALMAX) assertTrue(`full-depth capU = fresh (bijection), Q=${Q}`, !fullViol);
  const out = { Q, Qp, width: w, nR, twinQ: Qp - Q === 2, C: Cv[0], T: Tv[0], K: [], F0: [], CA: [], TA: [] };
  for (let v = 0; v < NV; v++) {
    let Ks = -1;
    for (let K = 0; K <= kEff; K++) if (Cv[v] - sumCap[v][K] >= 1) { Ks = K; break; }
    out.K.push(Ks); out.F0.push(Cv[v] - sumCap[v][0]); out.CA.push(Cv[v]); out.TA.push(Tv[v]);
    if (Q <= CALMAX) assertEq(`full-depth floor = truth, ${VAR[v].name}, Q=${Q}`, Cv[v] - sumCap[v][kEff], Tv[v]);
  }
  return out;
}

const V1ROWS = [   // attack-quadpoint-01.js embedded OUTPUT, cited: Q width C T pool floor0 K*
  [61, 768, 76, 19, 15, -9, 1], [67, 552, 54, 11, 16, -6, 1], [71, 288, 28, 3, 17, -6, 4],
  [101, 408, 40, 7, 23, -10, 2], [149, 600, 59, 10, 32, -10, 2], [199, 4920, 491, 52, 43, -143, 4],
  [293, 8400, 839, 88, 59, -283, 5], [401, 6480, 647, 54, 76, -244, 7], [499, 4008, 400, 28, 92, -171, 9],
  [601, 7248, 724, 52, 107, -291, 8], [701, 11280, 1127, 79, 123, -488, 9], [809, 3240, 323, 19, 137, -147, 16],
  [907, 7272, 726, 59, 152, -313, 7], [1009, 8088, 808, 54, 166, -370, 10], [1103, 13272, 1326, 89, 182, -627, 11],
  [1201, 28968, 2896, 194, 194, -1379, 12], [1301, 5208, 520, 32, 209, -242, 13], [1399, 28080, 2807, 174, 219, -1383, 13],
  [1499, 36120, 3611, 224, 236, -1742, 13],
];
const cert = [];
for (let Qi = 0; Qi < NREG; Qi++) { if (ANCHORS[Qi] < QSTAT) continue; cert.push(certAnchor(Qi)); }
for (const [Q, w, C, T, pool, fl0, Ks] of V1ROWS) {
  const r = cert.find(x => x.Q === Q);
  assertTrue(`v1 row Q=${Q}`, !!r && r.width === w && r.C === C && r.T === T && r.nR === pool && r.F0[0] === fl0 && r.K[0] === Ks);
}
console.log(`  baseline engine reproduces attack-quadpoint-01.js digit-exact on ${V1ROWS.length} shown rows (width, C, T, pool, floor_0, K*)`);
console.log(`  QR kill law re-verified inside the window at every anchor Q <= ${CALMAX}, r = 7, 11, 13`);
console.log(`  anchors run through the certificate engine: ${cert.length}`);

// ============================================================================
console.log('\nSEC 4 — SCORING AGAINST THE PREREGISTRATION (§1 as written)');
// ============================================================================
const BANDS = [['A', QSTAT, 997], ['B', 1009, 3163], ['C', 3167, QMAX]];
function rhoCorr(s, key) { const k = key === 'tre' ? 'treMC' : 'ctlMC'; return (s[key].Tsum / s[key].T) / s[k].mean; }
console.log('  4a. PRIMARY: D = mean(rho) - 1. rho = (mean nu over twins) / (null mean of the same).');
console.log('      Analytic null = the nu-size-biased mean (VOID per SEC 2); MC null = the exact');
console.log('      without-replacement null, which §1\'s remedy makes the one that carries the verdict.');
console.log('      family      null       band   Q-range           n         D         s.e.     D/s.e.');
function report(key, which) {
  const rows = key === 'tre' ? useT : useC;
  const val = (s) => (which === 'an' ? s[key].rho : rhoCorr(s, key));
  const out = [];
  const all = meanSd(rows.map(val));
  out.push(['ALL', QSTAT, QMAX, all]);
  for (const [b, a1, b1] of BANDS) out.push([b, a1, b1, meanSd(rows.filter(s => s.Q >= a1 && s.Q <= b1).map(val))]);
  const nm = key === 'tre' ? 'treatment' : 'control  ';
  const nn = which === 'an' ? 'analytic' : 'MC      ';
  for (const [b, a1, b1, s] of out) {
    console.log(`      ${nm}   ${nn}    ${b.padEnd(3)}  [${String(a1).padStart(5)}, ${String(b1).padStart(5)}]  ${String(s.n).padStart(5)}  ${sgn(s.m - 1)}${f5(s.m - 1)}   ${f5(s.se)}   ${f2((s.m - 1) / s.se).padStart(7)}`);
  }
  return out;
}
const anT = report('tre', 'an'), anC = report('ctl', 'an');
const mcT = report('tre', 'mc'), mcC = report('ctl', 'mc');
{
  const all = mcT[0][3], ctl = mcC[0][3];
  const signs = mcT.slice(1).map(([, , , s]) => Math.sign(s.m - 1));
  const z = (all.m - 1) / all.se, zc = (ctl.m - 1) / ctl.se;
  const ctrlOK = Math.abs(zc) <= 3;
  const kill = z > 3 && signs.every(x => x > 0);
  const rev = z < -3 && signs.every(x => x < 0);
  console.log(`      log form of the MC primary: ln mean(rho) = ${sgn(Math.log(all.m))}${f5(Math.log(all.m))} (readability only)`);
  console.log(`      control precondition: |D_ctrl / s.e.| = ${f2(Math.abs(zc))} <= 3  =>  ${ctrlOK ? 'CONTROL READS 0, treatment verdict stands' : 'CONTROL FAILS, treatment verdict VOID'}`);
  console.log(`      treatment band signs (A, B, C) = ${signs.join(', ')}`);
  console.log(`      **PRIMARY VERDICT (MC form, per §1's remedy): ${!ctrlOK ? 'VOID (control)' : kill ? 'KILL — surplus beyond redistribution' : rev ? 'REVERSED — deficit' : 'HOLD — inside +/-3 s.e., or band signs disagree'}**`);
}
console.log('  4b. REGISTERED SECONDARY (no independent verdict): Lambda2, the n >= 3 split log-ratio');
for (const key of ['tre', 'ctl']) {
  const rows = key === 'tre' ? useT : useC;
  const s = meanSd(rows.filter(x => Number.isFinite(x[key].lam2)).map(x => x[key].lam2));
  const mcKey = key === 'tre' ? 'treMC' : 'ctlMC';
  const s2 = meanSd(rows.filter(x => x[key].TH > 0 && x[mcKey].H > 0).map(x => Math.log(x[key].TH / x[mcKey].H)));
  console.log(`      ${key === 'tre' ? 'treatment' : 'control  '}  analytic  n ${String(s.n).padStart(5)}  mean ${sgn(s.m)}${f5(s.m)}  s.e. ${f5(s.se)}  ratio ${f2(s.m / s.se).padStart(6)}`);
  console.log(`      ${key === 'tre' ? 'treatment' : 'control  '}  MC        n ${String(s2.n).padStart(5)}  mean ${sgn(s2.m)}${f5(s2.m)}  s.e. ${f5(s2.se)}  ratio ${f2(s2.m / s2.se).padStart(6)}`);
}
console.log('  4c. PLACEMENT: does the first survivor above the origin sit in H = {n(t) >= 3}?');
{
  console.log('      family      null       band   Q-range           n    obs   expected        Z');
  const agg = (rows, key, which) => {
    const mk = key === 'tre' ? 'treMC' : 'ctlMC';
    let X = 0, P = 0, V = 0;
    for (const s of rows) { const p = which === 'an' ? s[key].pH : s[mk].firstH; X += s[key].firstN >= 3 ? 1 : 0; P += p; V += p * (1 - p); }
    return { n: rows.length, X, P, Z: (X - P) / Math.sqrt(V) };
  };
  const table = {};
  for (const key of ['tre', 'ctl']) for (const which of ['an', 'mc']) {
    const rows = key === 'tre' ? useT : useC;
    const nm = key === 'tre' ? 'treatment' : 'control  ', nn = which === 'an' ? 'analytic' : 'MC      ';
    const a = agg(rows, key, which); table[key + which] = { all: a, bands: [] };
    console.log(`      ${nm}   ${nn}    ALL  [${String(QSTAT).padStart(5)}, ${String(QMAX).padStart(5)}]  ${String(a.n).padStart(5)}  ${String(a.X).padStart(5)}  ${f2(a.P).padStart(9)}  ${sgn(a.Z)}${f2(a.Z)}`);
    for (const [b, a1, b1] of BANDS) {
      const s = agg(rows.filter(x => x.Q >= a1 && x.Q <= b1), key, which);
      table[key + which].bands.push(s);
      console.log(`      ${nm}   ${nn}    ${b.padEnd(3)}  [${String(a1).padStart(5)}, ${String(b1).padStart(5)}]  ${String(s.n).padStart(5)}  ${String(s.X).padStart(5)}  ${f2(s.P).padStart(9)}  ${sgn(s.Z)}${f2(s.Z)}`);
    }
  }
  const t = table.tremc, c = table.ctlmc;
  const signs = t.bands.map(s => Math.sign(s.X - s.P));
  const ctrlOK = Math.abs(c.all.Z) <= 3;
  const kill = Math.abs(t.all.Z) > 3 && (signs.every(x => x > 0) || signs.every(x => x < 0));
  console.log(`      control precondition: |Z_ctrl| = ${f2(Math.abs(c.all.Z))} <= 3  =>  ${ctrlOK ? 'CONTROL READS 0' : 'CONTROL FAILS, verdict VOID'}`);
  console.log(`      treatment band signs (A, B, C) = ${signs.join(', ')}`);
  console.log(`      **PLACEMENT VERDICT (MC form): ${!ctrlOK ? 'VOID (control)' : kill ? 'KILL — the floor concentrates in immune classes' : 'HOLD — inside +/-3, or band signs disagree'}**`);
}

// ============================================================================
console.log('\nSEC 5 — K*: DOES THE IMMUNE RESTRICTION BUY DEPTH BACK? (§1d)');
// ============================================================================
{
  console.log('  5a. the restricted subset, against the DESIGN-FREE redistribution expectation');
  console.log('      The null that needs no sampling model: twin openers equidistribute over the r-2');
  console.log('      classes mod r no active prime kills, so E[T_A] = T * prod_{r in A} i_r/(r-2) exactly,');
  console.log('      with binomial variance T*q(1-q). q for M{7}, M{7,11}, M{7,11,13} = 0.4000, 0.1333, 0.0485.');
  console.log('      variant       density   mean C_A   mean T_A   anchors T_A = 0   sum T_A   design-free E[T_A]   obs/exp      Z');
  for (let v = 0; v < NV; v++) {
    const dens = v === 4 ? VAR[v].A.reduce((s, r) => s * ((r - 2) / r), 1) : VAR[v].A.reduce((s, r) => s * (iCnt[r] / r), 1);
    const q = v === 4 ? 1 : VAR[v].A.reduce((s, r) => s * (iCnt[r] / (r - 2)), 1);
    const mC = cert.reduce((s, r) => s + r.CA[v], 0) / cert.length;
    const mT = cert.reduce((s, r) => s + r.TA[v], 0) / cert.length;
    const z0 = cert.filter(r => r.TA[v] === 0).length;
    const obs = cert.reduce((s, r) => s + r.TA[v], 0);
    const exp = v === 4 ? NaN : cert.reduce((s, r) => s + r.T * q, 0);
    const va = v === 4 ? NaN : cert.reduce((s, r) => s + r.T * q * (1 - q), 0);
    const Z = (obs - exp) / Math.sqrt(va);
    console.log(`      ${VAR[v].name.padEnd(11)}  ${f4(dens)}   ${f2(mC).padStart(8)}   ${f2(mT).padStart(8)}   ${String(z0).padStart(15)}   ${String(obs).padStart(7)}   ${Number.isFinite(exp) ? f1(exp).padStart(17) : '              n/a'}   ${Number.isFinite(exp) ? f4(obs / exp) : '  n/a  '}   ${Number.isFinite(Z) ? sgn(Z) + f2(Z) : ' n/a'}`);
  }
  console.log('  5b. K*_A vs K*: §1d registered K*_A >= K* at >= 90% of anchors, median difference >= 0');
  console.log('      Anchors where the restricted subset holds NO twin (T_A = 0) have NO restricted');
  console.log('      certificate at any depth; they are counted separately and never scored as a reduction.');
  for (const [lab, qa, qb] of [['Q <= 1499', QSTAT, 1499], ['Q <= 10007', QSTAT, QMAX]]) {
    const rs = cert.filter(r => r.Q >= qa && r.Q <= qb);
    console.log(`      ${lab}  (n = ${rs.length}, mean baseline K* = ${f2(rs.reduce((s, r) => s + r.K[0], 0) / rs.length)})`);
    console.log('        variant       T_A = 0   K* > KCAP   comparable   mean K*_A   share >= K*   K*_A < K*   median diff   best reduction');
    for (let v = 1; v < NV; v++) {
      const bad = rs.filter(r => r.K[v] < 0 && r.TA[v] === 0).length;
      const over = rs.filter(r => r.K[v] < 0 && r.TA[v] > 0).length;
      const cmp = rs.filter(r => r.K[v] >= 0);
      const d = cmp.map(r => r.K[v] - r.K[0]).sort((a, b) => a - b);
      const ge = d.filter(x => x >= 0).length, lt = d.filter(x => x < 0).length;
      const med = d.length ? d[Math.floor(d.length / 2)] : NaN;
      const mKA = cmp.length ? cmp.reduce((s, r) => s + r.K[v], 0) / cmp.length : NaN;
      console.log(`        ${VAR[v].name.padEnd(11)}   ${String(bad).padStart(7)}   ${String(over).padStart(9)}   ${String(cmp.length).padStart(10)}   ${f2(mKA).padStart(9)}   ${f3(d.length ? ge / d.length : NaN).padStart(11)}   ${String(lt).padStart(9)}   ${String(med).padStart(11)}   ${String(d.length ? d[0] : NaN).padStart(14)}`);
    }
  }
  console.log('  5c. the K = 0 certificate under restriction (floor_0 >= 1: does the restriction revive counting-only?)');
  for (let v = 0; v < NV; v++) {
    const ok = cert.filter(r => r.F0[v] >= 1);
    const okQ = ok.map(r => r.Q);
    console.log(`      ${VAR[v].name.padEnd(11)}  floor_0 >= 1 at ${String(okQ.length).padStart(4)} of ${cert.length} anchors${okQ.length ? '; largest such Q = ' + okQ[okQ.length - 1] : ''}${okQ.length && okQ.length <= 10 ? ' (' + okQ.join(', ') + ')' : ''}`);
  }
}

// ============================================================================
console.log('\nSEC 6 — POST HOC (invented after the data; carries NO preregistered verdict)');
// ============================================================================
{
  console.log('  6a. the QR-blind comparator N{7,11,13}: the same certificate on openers this anchor\'s');
  console.log('      7, 11 and 13 do not kill, a restriction that needs no quadratic residue at all.');
  console.log('      Its density is prod (1-2/r) = 0.4941 against M{7,11,13}\'s prod i_r/r = 0.0240.');
  for (const [lab, qa, qb] of [['Q <= 1499', QSTAT, 1499], ['Q <= 10007', QSTAT, QMAX]]) {
    const rs = cert.filter(r => r.Q >= qa && r.Q <= qb);
    const dM = rs.filter(r => r.K[3] >= 0).map(r => r.K[3] - r.K[0]);
    const dN = rs.filter(r => r.K[4] >= 0).map(r => r.K[4] - r.K[0]);
    const mean = (xs) => xs.reduce((s, x) => s + x, 0) / xs.length;
    console.log(`      ${lab}: M{7,11,13} certifies ${dM.length}/${rs.length} anchors, mean K* change ${sgn(mean(dM))}${f2(mean(dM))};`);
    console.log(`                  N{7,11,13} certifies ${dN.length}/${rs.length} anchors, mean K* change ${sgn(mean(dN))}${f2(mean(dN))}`);
  }
  const bothQ = cert.filter(r => r.K[3] >= 0 && r.K[4] >= 0);
  const nBeat = bothQ.filter(r => r.K[3] < r.K[4]).length;
  const mM = bothQ.reduce((a, r) => a + r.K[3], 0) / bothQ.length, mN = bothQ.reduce((a, r) => a + r.K[4], 0) / bothQ.length;
  console.log(`      head to head on the ${bothQ.length} anchors where BOTH certify: mean K* is ${f2(mM)} for M{7,11,13} against ${f2(mN)} for N{7,11,13};`);
  console.log(`      the QR restriction has the lower K* at ${nBeat} of them, and it is the only one of the two that fails outright`);
  console.log(`      (T_A = 0 at ${cert.filter(r => r.TA[3] === 0).length} anchors, K* past the engine cap at ${cert.filter(r => r.K[3] < 0 && r.TA[3] > 0).length} more), against 0 failures for the QR-blind restriction.`);
  console.log('  6b. the immune subset\'s emptiness, by band (the reason 5b has a "no certificate" column)');
  for (const [b, a1, b1] of BANDS) {
    const rs = cert.filter(r => r.Q >= a1 && r.Q <= b1);
    console.log(`      band ${b} [${a1}, ${b1}]  n ${String(rs.length).padStart(4)}   T_A = 0 at: M{7} ${rs.filter(r => r.TA[1] === 0).length}, M{7,11} ${rs.filter(r => r.TA[2] === 0).length}, M{7,11,13} ${rs.filter(r => r.TA[3] === 0).length}, N{7,11,13} ${rs.filter(r => r.TA[4] === 0).length}`);
  }
  console.log('  6c. THE DESIGN-FREE PER-PRIME CLASS TEST, the reading that survives the SEC 4 defect.');
  console.log('      Null, exact and model-free: twin openers equidistribute over the r-2 classes mod r');
  console.log('      that this anchor does not kill; i_r of them are immune, so the immune share of twins');
  console.log('      is i_r/(r-2) against the immune share of openers i_r/r — ratio r/(r-2), the');
  console.log('      redistribution factor itself. Binomial pooling with per-anchor expectations.');
  console.log('        r    treatment: obs      expected       Z    overdisp     control: obs      expected       Z');
  for (let k = 0; k < 8; k++) {
    const r = RSTAR[k], q = iCnt[r] / (r - 2);
    let oT = 0, eT = 0, vT = 0, oC = 0, eC = 0, vC = 0;
    const perT = [];
    for (const s of stat) {
      if (s.tre) { oT += s.tre.clsImm[k]; eT += s.tre.T * q; vT += s.tre.T * q * (1 - q); perT.push(s.tre.clsImm[k] - s.tre.T * q); }
      if (s.ctl) { oC += s.ctl.clsImm[k]; eC += s.ctl.T * q; vC += s.ctl.T * q * (1 - q); }
    }
    const chi = perT.reduce((a, x) => a + x * x, 0) / vT;
    console.log(`      ${String(r).padStart(3)}    ${String(oT).padStart(12)}  ${f1(eT).padStart(12)}  ${(sgn((oT - eT) / Math.sqrt(vT)) + f2((oT - eT) / Math.sqrt(vT))).padStart(6)}  ${f3(chi).padStart(9)}    ${String(oC).padStart(12)}  ${f1(eC).padStart(12)}  ${(sgn((oC - eC) / Math.sqrt(vC)) + f2((oC - eC) / Math.sqrt(vC))).padStart(6)}`);
  }
  {
    let oT = 0, eT = 0, vT = 0, oC = 0, eC = 0, vC = 0;
    for (const s of stat) for (let k = 0; k < 8; k++) {
      const r = RSTAR[k], q = iCnt[r] / (r - 2);
      if (s.tre) { oT += s.tre.clsImm[k]; eT += s.tre.T * q; vT += s.tre.T * q * (1 - q); }
      if (s.ctl) { oC += s.ctl.clsImm[k]; eC += s.ctl.T * q; vC += s.ctl.T * q * (1 - q); }
    }
    console.log(`      all 8 combined (the 8 tests are not independent; quoted as a summary only)`);
    console.log(`        treatment Z = ${sgn((oT - eT) / Math.sqrt(vT))}${f2((oT - eT) / Math.sqrt(vT))}, control Z = ${sgn((oC - eC) / Math.sqrt(vC))}${f2((oC - eC) / Math.sqrt(vC))}`);
  }
  console.log('  6d. the registered primary DIFFERENCED against its own matched control, which is what');
  console.log('      the common design bias of SEC 4 cancels in.');
  for (const which of ['an', 'mc']) {
    const byQ = new Map(); for (const s of useC) byQ.set(s.Q, s);
    const xs = [];
    for (const s of useT) { const c = byQ.get(s.Q); if (!c) continue; xs.push((which === 'an' ? s.tre.rho : rhoCorr(s, 'tre')) - (which === 'an' ? c.ctl.rho : rhoCorr(c, 'ctl'))); }
    const m = meanSd(xs);
    console.log(`      ${which === 'an' ? 'analytic null' : 'MC null      '}  n ${String(m.n).padStart(5)}  treatment - control = ${sgn(m.m)}${f5(m.m)}  s.e. ${f5(m.se)}  ratio ${f2(m.m / m.se).padStart(6)}`);
  }
}

// ============================================================================
console.log(`\nSEC 7 — EXTENSION, STATISTICS ONLY: Q in (${QMAX}, ${QEXT}]`);
// ============================================================================
// Beyond §1's registered bands, so this carries NO preregistered verdict; it
// extends the design-free class test and the placement indicator only. The
// certificate engine is NOT run here: quadpoint-02's own forecast puts the
// band max of K*/pool past KCAP = 64 at this level, so K* would be cap-bound
// and uninformative, and raising the cap costs more than the ten-minute rule
// allows. The full decade Q ~ 10^5 is NOT run either: the sieved range grows
// as Q^2, which measured scaling puts near 19 minutes, and hi ~ 10^10 breaks
// this producer's < 2^31 width audit.
const ext = [];
for (let Qi = NREG; Qi < ANCHORS.length; Qi++) {
  const Q = ANCHORS[Qi];
  const Qp = Qi + 1 < ANCHORS.length ? ANCHORS[Qi + 1] : nextPrime(Q);
  const lo = Q * Q, hi = Qp * Qp, w = hi - lo;
  const tre = windowStats(lo, hi, Q, immFlag, false);
  let N = lo - w; while (isSquare(N)) N -= 30;
  assertTrue(`ext control origin non-square Q=${Q}`, !isSquare(N));
  const ctl = windowStats(N, N + w, Q, pseudoMap(Q, N), false);
  ext.push({ Q, tre, ctl });
}
{
  console.log(`  anchors added: ${ext.length} (Q = ${ext[0].Q}..${ext[ext.length - 1].Q}); twins in the added range: ${ext.reduce((a, s) => a + (s.tre ? s.tre.T : 0), 0)}`);
  const all = stat.concat(ext);
  console.log('  7a. design-free per-prime class test, the added band D and then the whole run');
  console.log('        r    band D: obs      expected       Z       full run: obs      expected       Z    control Z');
  for (let k = 0; k < 8; k++) {
    const r = RSTAR[k], q = iCnt[r] / (r - 2);
    const acc = (rows, key) => { let o = 0, e = 0, v = 0; for (const s of rows) if (s[key]) { o += s[key].clsImm[k]; e += s[key].T * q; v += s[key].T * q * (1 - q); } return { o, e, Z: (o - e) / Math.sqrt(v) }; };
    const d = acc(ext, 'tre'), f = acc(all, 'tre'), c = acc(all, 'ctl');
    console.log(`      ${String(r).padStart(3)}   ${String(d.o).padStart(11)}  ${f1(d.e).padStart(12)}  ${(sgn(d.Z) + f2(d.Z)).padStart(6)}   ${String(f.o).padStart(15)}  ${f1(f.e).padStart(12)}  ${(sgn(f.Z) + f2(f.Z)).padStart(6)}  ${(sgn(c.Z) + f2(c.Z)).padStart(9)}`);
  }
  {
    const acc = (rows, key) => { let o = 0, e = 0, v = 0; for (const s of rows) if (s[key]) for (let k = 0; k < 8; k++) { const r = RSTAR[k], q = iCnt[r] / (r - 2); o += s[key].clsImm[k]; e += s[key].T * q; v += s[key].T * q * (1 - q); } return (o - e) / Math.sqrt(v); };
    console.log(`      all 8 combined over the whole run: treatment Z = ${sgn(acc(all, 'tre'))}${f2(acc(all, 'tre'))}, control Z = ${sgn(acc(all, 'ctl'))}${f2(acc(all, 'ctl'))}`);
  }
  console.log('  7b. placement of the first survivor, band D and the whole run (analytic null)');
  const pl = (rows, key) => { let X = 0, P = 0, V = 0, n = 0; for (const s of rows) if (s[key]) { n++; X += s[key].firstN >= 3 ? 1 : 0; P += s[key].pH; V += s[key].pH * (1 - s[key].pH); } return { n, X, P, Z: (X - P) / Math.sqrt(V) }; };
  for (const [lab, rows] of [['band D', ext], ['whole run', all]]) {
    const t = pl(rows, 'tre'), c = pl(rows, 'ctl');
    console.log(`      ${lab.padEnd(10)}  treatment n ${String(t.n).padStart(5)}  obs ${String(t.X).padStart(5)}  exp ${f2(t.P).padStart(9)}  Z ${sgn(t.Z)}${f2(t.Z)}     control  obs ${String(c.X).padStart(5)}  exp ${f2(c.P).padStart(9)}  Z ${sgn(c.Z)}${f2(c.Z)}`);
  }
}

// ============================================================================
console.log('\nSEC 8 — READINGS (mechanical; the adjudication text belongs to the note)');
// ============================================================================
console.log('  1. [VERIFIED] The immune classes, the 2(r-1) guardrail and E[f_r] = 1 reproduce');
console.log('     stretch-01.js SEC C1 exactly; the QR kill law re-verifies inside every window to');
console.log('     Q = 1499; immunity implies no kill at every checked opener; the baseline');
console.log('     certificate engine reproduces attack-quadpoint-01.js digit-exact.');
console.log('  2. [MEASURED] SEC 4 scores the two preregistered tests against §1 as written, with the');
console.log('     matched non-square control and the estimator calibration as preconditions.');
console.log('  3. [MEASURED] SEC 5 is §1d\'s registered K* prediction; SEC 6 and SEC 7 are post hoc or');
console.log('     outside the registered bands and carry no verdict. Nothing here is asymptotic,');
console.log('     nothing bounds Z2, Route B stays closed and rho(2) stays adverse.');
console.log(`\ndone in ${((Date.now() - T0) / 1000).toFixed(1)}s; assertion failures: ${failures}`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-z3-immune-01.js
//   invocation:  node research/attack-z3-immune-01.js
//   code-sha256: 679cbb816c7a62e9833d90702875d4796ac41801ffb14b848710adb47912ae48
//   out-sha256:  a12703c6c7ca816464caf02bfbb715975a6d694adb975db9beab828b0c718dbe
//   body-lines:  188
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     31.6 s
// ============================================================================
// SEC 0 — CALIBRATION (abort on any mismatch)
//   immune class lists reproduce stretch-01.js SEC C1 digit-exact at r = 7, 11, 13, 17, 19, 23, 29, 31
//   sizes i_r = 2, 3, 4, 4, 5, 6, 8, 8; kill incidence = 2(r-1) at every r; E[f_r] = 1 exactly at every r
//   immune factor r/(r-2)  = 1.400, 1.222, 1.182, 1.133, 1.118, 1.095, 1.074, 1.069
//   non-immune factor      = 0.840, 0.917, 0.919, 0.959, 0.958, 0.966, 0.972, 0.976
//   nu range: all-immune 3.2211, none-immune 0.5960; mean immunity index sum(i_r/r) = 2.159
//
// SEC 1 — THE PER-ANCHOR RUN: treatment (square anchor) and matched control
//   anchors with statistics: 1219 (Q = 37..10007); 3657 control-origin asserts pass
//   control origins stepped off a perfect square (deviation D1): 1
//   anchors dropped for an empty twin set: treatment 0, control 0
//   Monte Carlo null: 40 replicates per anchor per family, successive sampling proportional to nu
//
// SEC 2 — ESTIMATOR CALIBRATION (registered PRECONDITION of §1, read before the primary)
//   §1 registered 12 spread anchors; the run computes the MC null at EVERY anchor, so the
//   12 below are a printed window on the same numbers, not a separate calculation.
//         Q      C      T   analytic mu   MC null mean   (MC - analytic)/analytic
//        293    839     88   1.11952        1.11588        -0.00325
//        971   1168     81   1.12275        1.11768        -0.00452
//       1697    678     35   1.11939        1.11392        -0.00489
//       2477  12947    711   1.11949        1.11162        -0.00702
//       3329   1331     65   1.12149        1.11828        -0.00286
//       4139  11608    568   1.11897        1.11589        -0.00275
//       5011  10031    425   1.11903        1.11263        -0.00572
//       5869  11747    525   1.11929        1.11718        -0.00189
//       6793  13595    565   1.11920        1.11470        -0.00401
//       7699   6160    258   1.11875        1.10962        -0.00816
//       8663  10398    410   1.11939        1.11506        -0.00386
//       9533  11442    446   1.11935        1.11596        -0.00303
//   MC null bias, mean over ALL 1219 anchors: -0.00397; one s.e. of the primary = 0.00093
//   **PRECONDITION: FIRES — the analytic primary is VOID; §1's own remedy binds and only the MC-corrected form is read**
//
// SEC 3 — THE CERTIFICATE ENGINE: baseline K* (v1 reproduction) and the restricted K*_A
//   baseline engine reproduces attack-quadpoint-01.js digit-exact on 19 shown rows (width, C, T, pool, floor_0, K*)
//   QR kill law re-verified inside the window at every anchor Q <= 1499, r = 7, 11, 13
//   anchors run through the certificate engine: 1219
//
// SEC 4 — SCORING AGAINST THE PREREGISTRATION (§1 as written)
//   4a. PRIMARY: D = mean(rho) - 1. rho = (mean nu over twins) / (null mean of the same).
//       Analytic null = the nu-size-biased mean (VOID per SEC 2); MC null = the exact
//       without-replacement null, which §1's remedy makes the one that carries the verdict.
//       family      null       band   Q-range           n         D         s.e.     D/s.e.
//       treatment   analytic    ALL  [   37, 10007]   1219  +0.00220   0.00093      2.36
//       treatment   analytic    A    [   37,   997]    157  +0.00632   0.00538      1.17
//       treatment   analytic    B    [ 1009,  3163]    279  +0.00110   0.00197      0.56
//       treatment   analytic    C    [ 3167, 10007]    783  +0.00176   0.00067      2.61
//       control     analytic    ALL  [   37, 10007]   1219  +0.00180   0.00087      2.07
//       control     analytic    A    [   37,   997]    157  +0.00917   0.00488      1.88
//       control     analytic    B    [ 1009,  3163]    279  +0.00228   0.00186      1.22
//       control     analytic    C    [ 3167, 10007]    783  +0.00015   0.00065      0.23
//       treatment   MC          ALL  [   37, 10007]   1219  +0.00623   0.00096      6.50
//       treatment   MC          A    [   37,   997]    157  +0.01410   0.00558      2.53
//       treatment   MC          B    [ 1009,  3163]    279  +0.00546   0.00197      2.78
//       treatment   MC          C    [ 3167, 10007]    783  +0.00493   0.00069      7.15
//       control     MC          ALL  [   37, 10007]   1219  +0.00577   0.00087      6.63
//       control     MC          A    [   37,   997]    157  +0.01617   0.00477      3.39
//       control     MC          B    [ 1009,  3163]    279  +0.00680   0.00187      3.64
//       control     MC          C    [ 3167, 10007]    783  +0.00331   0.00067      4.95
//       log form of the MC primary: ln mean(rho) = +0.00621 (readability only)
//       control precondition: |D_ctrl / s.e.| = 6.63 <= 3  =>  CONTROL FAILS, treatment verdict VOID
//       treatment band signs (A, B, C) = 1, 1, 1
//       **PRIMARY VERDICT (MC form, per §1's remedy): VOID (control)**
//   4b. REGISTERED SECONDARY (no independent verdict): Lambda2, the n >= 3 split log-ratio
//       treatment  analytic  n  1219  mean +0.00221  s.e. 0.00259  ratio   0.86
//       treatment  MC        n  1219  mean +0.01006  s.e. 0.00263  ratio   3.82
//       control    analytic  n  1219  mean -0.00132  s.e. 0.00288  ratio  -0.46
//       control    MC        n  1219  mean +0.00628  s.e. 0.00289  ratio   2.18
//   4c. PLACEMENT: does the first survivor above the origin sit in H = {n(t) >= 3}?
//       family      null       band   Q-range           n    obs   expected        Z
//       treatment   analytic    ALL  [   37, 10007]   1219    589     585.20  +0.22
//       treatment   analytic    A    [   37,   997]    157     78      74.97  +0.48
//       treatment   analytic    B    [ 1009,  3163]    279    125     133.02  -0.96
//       treatment   analytic    C    [ 3167, 10007]    783    386     377.21  +0.63
//       treatment   MC          ALL  [   37, 10007]   1219    589     580.50  +0.49
//       treatment   MC          A    [   37,   997]    157     78      71.82  +1.01
//       treatment   MC          B    [ 1009,  3163]    279    125     131.97  -0.85
//       treatment   MC          C    [ 3167, 10007]    783    386     376.70  +0.67
//       control     analytic    ALL  [   37, 10007]   1219    612     591.77  +1.16
//       control     analytic    A    [   37,   997]    157     73      76.57  -0.57
//       control     analytic    B    [ 1009,  3163]    279    126     135.33  -1.12
//       control     analytic    C    [ 3167, 10007]    783    413     379.87  +2.37
//       control     MC          ALL  [   37, 10007]   1219    612     584.90  +1.59
//       control     MC          A    [   37,   997]    157     73      75.13  -0.35
//       control     MC          B    [ 1009,  3163]    279    126     131.13  -0.63
//       control     MC          C    [ 3167, 10007]    783    413     378.65  +2.51
//       control precondition: |Z_ctrl| = 1.59 <= 3  =>  CONTROL READS 0
//       treatment band signs (A, B, C) = 1, -1, 1
//       **PLACEMENT VERDICT (MC form): HOLD — inside +/-3, or band signs disagree**
//
// SEC 5 — K*: DOES THE IMMUNE RESTRICTION BUY DEPTH BACK? (§1d)
//   5a. the restricted subset, against the DESIGN-FREE redistribution expectation
//       The null that needs no sampling model: twin openers equidistribute over the r-2
//       classes mod r no active prime kills, so E[T_A] = T * prod_{r in A} i_r/(r-2) exactly,
//       with binomial variance T*q(1-q). q for M{7}, M{7,11}, M{7,11,13} = 0.4000, 0.1333, 0.0485.
//       variant       density   mean C_A   mean T_A   anchors T_A = 0   sum T_A   design-free E[T_A]   obs/exp      Z
//       base         1.0000    8217.11     361.76                 0    440985            440985.0   1.0000    n/a
//       M{7}         0.2857    2348.49     145.25                 0    177061            176394.0   1.0038   +2.05
//       M{7,11}      0.0779     639.96      48.62                 8     59262             58798.0   1.0079   +2.06
//       M{7,11,13}   0.0240     197.15      17.71                38     21583             21381.1   1.0094   +1.42
//       N{7,11,13}   0.4945    4063.23     361.76                 0    440985                 n/a     n/a      n/a
//   5b. K*_A vs K*: §1d registered K*_A >= K* at >= 90% of anchors, median difference >= 0
//       Anchors where the restricted subset holds NO twin (T_A = 0) have NO restricted
//       certificate at any depth; they are counted separately and never scored as a reduction.
//       Q <= 1499  (n = 228, mean baseline K* = 8.36)
//         variant       T_A = 0   K* > KCAP   comparable   mean K*_A   share >= K*   K*_A < K*   median diff   best reduction
//         M{7}                0           0          228        7.83         0.364         145            -1               -6
//         M{7,11}             8           0          220        8.61         0.332         147            -2              -10
//         M{7,11,13}         32           0          196       10.11         0.352         127            -3              -13
//         N{7,11,13}          0           0          228        5.50         0.009         226            -3               -3
//       Q <= 10007  (n = 1219, mean baseline K* = 22.61)
//         variant       T_A = 0   K* > KCAP   comparable   mean K*_A   share >= K*   K*_A < K*   median diff   best reduction
//         M{7}                0           1         1218       21.87         0.388         746            -1              -12
//         M{7,11}             8          10         1201       21.82         0.380         745            -2              -24
//         M{7,11,13}         38          55         1126       22.20         0.373         706            -3              -24
//         N{7,11,13}          0           0         1219       19.64         0.002        1217            -3               -3
//   5c. the K = 0 certificate under restriction (floor_0 >= 1: does the restriction revive counting-only?)
//       base         floor_0 >= 1 at    2 of 1219 anchors; largest such Q = 43 (37, 43)
//       M{7}         floor_0 >= 1 at    9 of 1219 anchors; largest such Q = 97 (37, 41, 47, 53, 59, 61, 67, 79, 97)
//       M{7,11}      floor_0 >= 1 at   21 of 1219 anchors; largest such Q = 431
//       M{7,11,13}   floor_0 >= 1 at   39 of 1219 anchors; largest such Q = 2141
//       N{7,11,13}   floor_0 >= 1 at   28 of 1219 anchors; largest such Q = 419
//
// SEC 6 — POST HOC (invented after the data; carries NO preregistered verdict)
//   6a. the QR-blind comparator N{7,11,13}: the same certificate on openers this anchor's
//       7, 11 and 13 do not kill, a restriction that needs no quadratic residue at all.
//       Its density is prod (1-2/r) = 0.4941 against M{7,11,13}'s prod i_r/r = 0.0240.
//       Q <= 1499: M{7,11,13} certifies 196/228 anchors, mean K* change +1.44;
//                   N{7,11,13} certifies 228/228 anchors, mean K* change -2.87
//       Q <= 10007: M{7,11,13} certifies 1126/1219 anchors, mean K* change -0.63;
//                   N{7,11,13} certifies 1219/1219 anchors, mean K* change -2.98
//       head to head on the 1126 anchors where BOTH certify: mean K* is 22.20 for M{7,11,13} against 19.84 for N{7,11,13};
//       the QR restriction has the lower K* at 527 of them, and it is the only one of the two that fails outright
//       (T_A = 0 at 38 anchors, K* past the engine cap at 55 more), against 0 failures for the QR-blind restriction.
//   6b. the immune subset's emptiness, by band (the reason 5b has a "no certificate" column)
//       band A [37, 997]  n  157   T_A = 0 at: M{7} 0, M{7,11} 8, M{7,11,13} 26, N{7,11,13} 0
//       band B [1009, 3163]  n  279   T_A = 0 at: M{7} 0, M{7,11} 0, M{7,11,13} 11, N{7,11,13} 0
//       band C [3167, 10007]  n  783   T_A = 0 at: M{7} 0, M{7,11} 0, M{7,11,13} 1, N{7,11,13} 0
//   6c. THE DESIGN-FREE PER-PRIME CLASS TEST, the reading that survives the SEC 4 defect.
//       Null, exact and model-free: twin openers equidistribute over the r-2 classes mod r
//       that this anchor does not kill; i_r of them are immune, so the immune share of twins
//       is i_r/(r-2) against the immune share of openers i_r/r — ratio r/(r-2), the
//       redistribution factor itself. Binomial pooling with per-anchor expectations.
//         r    treatment: obs      expected       Z    overdisp     control: obs      expected       Z
//         7          177061      176394.0   +2.05      0.752          176380      176504.0   -0.38
//        11          147186      146995.0   +0.61      0.787          147212      147086.7   +0.40
//        13          160455      160358.2   +0.30      0.708          160736      160458.2   +0.87
//        17          117823      117596.0   +0.77      0.792          118025      117669.3   +1.21
//        19          129625      129701.5   -0.25      0.753          129842      129782.4   +0.20
//        23          125970      125995.7   -0.09      0.821          126423      126074.3   +1.16
//        29          130536      130662.2   -0.42      0.809          130439      130743.7   -1.00
//        31          121537      121651.0   -0.38      0.785          121891      121726.9   +0.55
//       all 8 combined (the 8 tests are not independent; quoted as a summary only)
//         treatment Z = +0.97, control Z = +1.04
//   6d. the registered primary DIFFERENCED against its own matched control, which is what
//       the common design bias of SEC 4 cancels in.
//       analytic null  n  1219  treatment - control = +0.00040  s.e. 0.00127  ratio   0.31
//       MC null        n  1219  treatment - control = +0.00046  s.e. 0.00127  ratio   0.36
//
// SEC 7 — EXTENSION, STATISTICS ONLY: Q in (10007, 31607]
//   anchors added: 2171 (Q = 10009..31607); twins in the added range: 2984289
//   7a. design-free per-prime class test, the added band D and then the whole run
//         r    band D: obs      expected       Z       full run: obs      expected       Z    control Z
//         7       1194555     1193715.6   +0.99           1371616     1370109.6   +1.66      +0.76
//        11        994750      994763.0   -0.02           1141936     1141758.0   +0.20      +0.24
//        13       1085928     1085196.0   +0.88           1246383     1245554.2   +0.93      +0.79
//        17        795190      795810.4   -0.81            913013      913406.4   -0.48      +1.86
//        19        877484      877732.1   -0.32           1007109     1007433.5   -0.38      +1.29
//        23        852519      852654.0   -0.17            978489      978649.7   -0.19      +0.56
//        29        884070      884233.8   -0.21           1014606     1014896.0   -0.34      +1.06
//        31        823682      823252.1   +0.56            945219      944903.2   +0.38      +2.39
//       all 8 combined over the whole run: treatment Z = +0.69, control Z = +3.12
//   7b. placement of the first survivor, band D and the whole run (analytic null)
//       band D      treatment n  2171  obs  1095  exp   1052.49  Z +1.83     control  obs  1012  exp   1053.09  Z -1.76
//       whole run   treatment n  3390  obs  1684  exp   1637.69  Z +1.59     control  obs  1624  exp   1644.86  Z -0.72
//
// SEC 8 — READINGS (mechanical; the adjudication text belongs to the note)
//   1. [VERIFIED] The immune classes, the 2(r-1) guardrail and E[f_r] = 1 reproduce
//      stretch-01.js SEC C1 exactly; the QR kill law re-verifies inside every window to
//      Q = 1499; immunity implies no kill at every checked opener; the baseline
//      certificate engine reproduces attack-quadpoint-01.js digit-exact.
//   2. [MEASURED] SEC 4 scores the two preregistered tests against §1 as written, with the
//      matched non-square control and the estimator calibration as preconditions.
//   3. [MEASURED] SEC 5 is §1d's registered K* prediction; SEC 6 and SEC 7 are post hoc or
//      outside the registered bands and carry no verdict. Nothing here is asymptotic,
//      nothing bounds Z2, Route B stays closed and rho(2) stays adverse.
//
// done in 31.6s; assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================
// 1. THE INSTRUMENT IS SOUND [VERIFIED]. The immune class lists, the
//    2(r-1) kill incidence and the weight-coordinate guardrail E[f_r] = 1
//    reproduce stretch-01.js SEC C1 exactly at r = 7..31; the QR kill law
//    re-verifies inside the window at every anchor to Q = 1499 for
//    r = 7, 11, 13; immunity implies no kill at every checked opener; the
//    baseline certificate engine reproduces attack-quadpoint-01.js
//    digit-exact on 19 rows (width, C, T, pool, floor_0, K*), with the
//    full-depth bijection asserted for all five variants at every anchor
//    Q <= 1499 and an independent T recount at every anchor of the run.
// 2. THE REGISTERED PRIMARY IS VOID, ON ITS OWN CONTROL [as preregistered].
//    SEC 2's estimator-calibration precondition FIRES: the MC null sits
//    -0.00397 below the analytic one against one s.e. of 0.00093, so §1's
//    remedy binds and the MC form carries the verdict. That form then reads
//    +0.00623 at 6.50 s.e. in the treatment and +0.00577 at 6.63 s.e. in the
//    MATCHED CONTROL, where no class is QR-immune. §1's control clause is
//    binding: the treatment verdict is VOID and the reading is an instrument
//    defect — a common bias of the ratio-of-means statistic at the 0.6%
//    level, present with and without the quadratic point. Differencing the
//    two (SEC 6d, post hoc) leaves +0.00046 +/- 0.00127, 0.36 s.e.
// 3. THE PLACEMENT TEST HOLDS [MEASURED, preregistered, control clean].
//    The first survivor above Q^2 lands in H = {n(t) >= 3} at 589 of 1219
//    anchors against 580.50 expected, Z = +0.49, with the control at
//    Z = +1.59 (inside its own +/-3 clause) and the treatment band signs
//    +, -, + so the band condition fails as well. Extended to Q = 31607
//    (SEC 7b, outside the registered bands): 1684 of 3390 against 1637.69,
//    Z = +1.59, control Z = -0.72. No concentration of the floor.
// 4. THE DESIGN-FREE READING, WHICH IS THE ONE THAT SURVIVES [MEASURED, post
//    hoc, SEC 6c and SEC 7a]. Twin openers must equidistribute over the r-2
//    classes mod r this anchor does not kill; the immune share of twins is
//    then i_r/(r-2) against the openers' i_r/r, ratio r/(r-2) — the
//    redistribution factor, and nothing else. Over the run's twin openers
//    (440,985 to Q = 10007 and 2,984,289 more to Q = 31607) the per-prime Z
//    runs -0.48 to +1.66, control -0.38 to +2.39, with per-anchor dispersion
//    0.708 to 0.821 of binomial. The immune classes
//    deliver the guardrail's factor to within 0.1% and deliver nothing past
//    it. Restriction-set form (SEC 5a, Q <= 10007): obs/exp = 1.0038,
//    1.0079, 1.0094 at Z = +2.05, +2.06, +1.42 for M{7}, M{7,11}, M{7,11,13}.
// 5. K* [MEASURED]. §1d's registered prediction is FALSIFIED as stated:
//    K*_A >= K* at only 0.388 / 0.380 / 0.373 of comparable anchors, well
//    under the registered 90%, and the median difference is -1, -2, -3. But
//    the family is not usable, for two reasons the prediction did not
//    anticipate. The immune subset holds NO twin at 38 anchors, where the
//    restricted certificate does not exist at any depth, and 55 more run
//    past the engine's KCAP = 64 unresolved — 93 of 1219 anchors with no
//    certificate, against a baseline that certifies all 1219. And the
//    QR-BLIND comparator N{7,11,13} — openers this anchor's 7, 11, 13 simply
//    do not kill, density 0.4941 against the immune 0.0240, no quadratic
//    residue used anywhere — certifies 1219 of 1219, lowers K* at 1217 of
//    them, and has the lower mean K* head to head (19.84 against 22.20 on
//    the 1126 anchors where both certify). The QR refinement is dominated by
//    the restriction that ignores it.
// 6. WHAT THIS BUYS: a clean negative. There is no survivor surplus beyond
//    redistribution, no concentration of the floor, and no usable reduction
//    of the depth cost that the anchor's quadratic residues buy over simply
//    naming the two classes each small prime kills. stretch-01 §4's
//    "structure, not advantage" now extends from the density to the
//    CERTIFICATE. NO CLAIM: nothing here is asymptotic, nothing bounds Z2 or
//    G2, occupancy was never in doubt over this range (certified to 9.0e15
//    from adopted data, stretch-01 §3), Route B stays closed and rho(2)
//    stays adverse.
// ============================================================
// FIGURE PROVENANCE. Cited and asserted, never re-derived: the immune class
// lists and the 2(r-1) guardrail (stretch-01.js SEC C1 embedded OUTPUT); the
// 19 v1 rows, the KCAP = 64 convention and the escalation width audit
// (attack-quadpoint-01.js and attack-quadpoint-02.js embedded OUTPUT); the
// hand anchors 121 -> 127 and 169 -> 173 (stretch-01 §0); occupancy to
// 9.0e15 and rho(2) adverse (stretch-01 §3); the half-open window convention
// (quadpoint-identity-01.md). Every other figure above is from this
// producer's own OUTPUT block.
// ============================================================
