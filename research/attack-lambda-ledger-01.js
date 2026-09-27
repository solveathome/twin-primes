// ============================================================================
// ATTACK — THE LAMBDA-WEIGHTED FOLD LEDGER: DOES PARITY INFORMATION SURVIVE
// IN THE OBJECT THE FOLD LEDGER IS? (PRE-REGISTERED, THRESHOLD FIXED FIRST)
// ============================================================================
// THE QUESTION. The fold ledger (research/fold-ledger-01.js, TODO Z5b) counts
// surviving pairs and nothing else, so it is PARITY-BLIND BY CONSTRUCTION.
// The parity obstruction is exactly the statement that count-tracking cannot
// separate Omega odd from Omega even. Attach the Liouville weight and ask
// whether anything survives: instead of counting the pairs (n, n+h) alive at
// sieve depth p, sum lambda(n)lambda(n+h), lambda(n) = (-1)^Omega(n).
//
// THE PRE-REGISTRATION was written to research/history/staging/
// attack-lambda-ledger.md BEFORE this file existed. Its gates, restated:
//   PREREG-1  accept only if |Cov| >= 5 sigma_rand on the top band at some depth
//   PREREG-2  and |Cov_2|/sigma >= 2 * max over h in {4,6,8} of |Cov_h|/sigma
//   PREREG-3  and sign(Cov_2) agrees across 3 disjoint sub-bands, |Cov|/sigma>=3
//   PREREG-4  report |Lambda_added|/sqrt(added); <= 4 means "consistent with
//             Chowla and uninformative", and must be called that.
// Cov(p) = mean[lam(a)lam(a+h)] - mean[lam(a)]*mean[lam(a+h)] over the pairs
// alive at depth p. Subtracting the marginals is what strips the deterministic
// Omega-composition effect, which is NOT pair-parity information.
//
// THE STRETCH DEFINITION IS EXTRACTED, NOT RE-INVENTED: S_q = [q^2, q'^2),
// openers = a with gcd(a,30)=gcd(a+h,30)=1 and a+h < q'^2, destroyer =
// min of the two smallest-prime-factors in fold-activation order. At h = 2
// that rule reproduces fold-ledger-01's a % 30 in {11,17,29} exactly, and
// the recomputed count ledger is ASSERTED ROW-IDENTICAL against the committed
// research/fold-ledger-01.csv, PARSED AT RUNTIME (no transcription).
//
// EXACT OMEGA, CHEAPLY: inside [q^2, q'^2) divide out every prime <= q with
// multiplicity; the cofactor is q-rough and < q'^2, hence 1 or prime. So
// Omega(a) = (multiplicities of primes <= q) + (cofactor > 1 ? 1 : 0), exact.
//
// WIDTH AUDIT: tops <= 10007^2 = 100,140,049 < 2^31; window offsets < 2^20;
// all arithmetic in Numbers/Int32, no bit shifts on values.
// NO TPC CLAIM OF ANY KIND. A covariance is a measurement; Chowla at shift 2
// is open and nothing here touches it. Route B stays closed.
// ============================================================================
'use strict';
const T0 = Date.now();
const fs = require('fs');

let failures = 0;
function assertEq(tag, got, want) {
  if (got !== want) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; }
  return true;
}
function assertTrue(tag, cond) { if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]`); } return cond; }
function f0(x) { return (Number.isFinite(x) ? x.toFixed(0) : 'n/a'); }
function f2(x) { return (Number.isFinite(x) ? x.toFixed(2) : 'n/a'); }
function f3(x) { return (Number.isFinite(x) ? x.toFixed(3) : 'n/a'); }
function f4(x) { return (Number.isFinite(x) ? x.toFixed(4) : 'n/a'); }
function sci(x) { return (Number.isFinite(x) ? x.toExponential(2) : 'n/a'); }

// ---------------------------------------------------------------- primes ---
const QMAX = 9973;
const PLIM = 10100;
const flag = new Uint8Array(PLIM + 1); flag[0] = flag[1] = 1;
for (let p = 2; p * p <= PLIM; p++) if (!flag[p]) for (let m = p * p; m <= PLIM; m += p) flag[m] = 1;
const PRIMES = []; for (let n = 2; n <= PLIM; n++) if (!flag[n]) PRIMES.push(n);
const ACT = PRIMES.filter(p => p >= 7 && p <= QMAX);      // the fold sequence
const NACT = ACT.length;
const QTOP = PRIMES[PRIMES.findIndex(p => p > QMAX)];
assertEq('next prime above QMAX', QTOP, 10007);
assertEq('width audit: top < 2^31', QTOP * QTOP < 2 ** 31, true);
const PIDX = new Int32Array(PLIM + 2).fill(-1);
ACT.forEach((p, i) => { PIDX[p] = i; });
const SURV = NACT;                 // bucket for "no prime factor <= q"
const NB = NACT + 1;

// coprime-to-30 table (the ledger's opener class, stated generally)
const cop30 = new Uint8Array(30);
for (let c = 0; c < 30; c++) cop30[c] = (c % 2 && c % 3 && c % 5) ? 1 : 0;
{ // the general rule reproduces fold-ledger-01's isOpen30 at shift 2
  const got = []; for (let c = 0; c < 30; c++) if (cop30[c] && cop30[(c + 2) % 30]) got.push(c);
  assertEq('opener class at shift 2 == {11,17,29}', got.join(','), '11,17,29');
}

const SHIFTS = [2, 4, 6, 8];
const NS = SHIFTS.length;
const HMAX = 8;

// ------------------------------------------------------------ the bands ---
// bands 0..5 are fold-ledger-01's own bands; 6..8 are the disjoint sub-bands
// of the top band that PREREG-3 requires.
const BANDS = [[7, 31], [37, 97], [101, 313], [317, 997], [1009, 3163], [3167, 9973],
               [3167, 4999], [5003, 7499], [7507, 9973]];
const NBND = BANDS.length;
const RAND_BANDS = [5, 6, 7, 8];    // where the i.i.d. random-sign control runs
const TR = 32;                       // random-sign trials (all 32 bits of one hash)

// ------------------------------------------------ the committed CSV table ---
const CSVPATH = 'research/fold-ledger-01.csv';
const csvRow = new Map();
{
  const txt = fs.readFileSync(CSVPATH, 'utf8').trim().split('\n');
  const head = txt[0].split(',');
  const ix = (n) => { const i = head.indexOf(n); if (i < 0) { failures++; console.log(`  ASSERT FAIL [csv column ${n}]`); } return i; };
  const cq = ix('q'), cw = ix('width'), ca = ix('added_pairs'), cr = ix('removed_total'),
        cn = ix('removed_by_new_prime'), co = ix('removed_by_old_moire'),
        ct = ix('net_new_twins'), cc = ix('both_composite_pairs');
  for (let i = 1; i < txt.length; i++) {
    const f = txt[i].split(',').map(Number);
    csvRow.set(f[cq], { width: f[cw], added: f[ca], removed: f[cr], byNew: f[cn], byOld: f[co], twins: f[ct], cc: f[cc] });
  }
  assertEq('CSV rows parsed', csvRow.size, 1226);
}

// ------------------------------------------------------------- workspace ---
let maxW = 0;
{ let prev = 7; for (const p of PRIMES) { if (p < 7) continue; if (p > QTOP) break; if (p > prev) maxW = Math.max(maxW, p * p - prev * prev); prev = p; } }
const EXT = HMAX + 4;
const spf = new Int32Array(maxW + EXT);      // smallest prime factor >= 7, else 0
const rem = new Int32Array(maxW + EXT);      // cofactor after removing primes <= q
const omg = new Uint8Array(maxW + EXT);      // Omega restricted to primes <= q
const rnd = new Uint32Array(maxW + EXT);     // one hash per integer -> TR trials

// The control's signs must have no residual structure between n and n+h, or the
// measured sigma_rand stops being the noise floor. A short mixer failed that test
// (sigma/N^-0.5 read 1.69 at the shallowest depth); this is a full murmur3
// finalizer plus a second avalanche round, and SEC 5(a)'s ratio column is the
// check that it passes. Left and right members of a shift-2 opener pair live in
// DISJOINT classes mod 30 ({11,17,29} vs {13,19,1}), so the pair products are
// independent and the floor is exactly 1/sqrt(N).
function hash32(x) {
  let z = (x + 0x9e3779b9) | 0;
  z = Math.imul(z ^ (z >>> 16), 0x85ebca6b);
  z = Math.imul(z ^ (z >>> 13), 0xc2b2ae35);
  z ^= z >>> 16;
  z = Math.imul(z ^ (z >>> 15), 0x2545f491);
  return (z ^ (z >>> 13)) >>> 0;
}

// per-stretch buckets, flat: [shift][bucket]
const pc = new Float64Array(NS * NB), pll = new Float64Array(NS * NB),
      pla = new Float64Array(NS * NB), plb = new Float64Array(NS * NB);
// per-stretch random buckets (shift 2 only): [trial][bucket]
const rll = new Float64Array(TR * NB), rla = new Float64Array(TR * NB), rlb = new Float64Array(TR * NB);

// global depth profiles, suffix-summed at each fold: [band][shift][depthIdx]
const gN = new Float64Array(NBND * NS * NB), gLL = new Float64Array(NBND * NS * NB),
      gLa = new Float64Array(NBND * NS * NB), gLb = new Float64Array(NBND * NS * NB);
// POOLED-WITHIN-FOLD covariance numerator, sum over folds of (LL_s - N_s r_a^s r_b^s).
// Added AFTER the pre-registered run, as a diagnostic: at a fixed depth p the sieve
// parameter u = 2 ln q / ln p still varies across a band, so pooling the MARGINALS
// (the pre-registered statistic) carries a between-fold term. This one does not.
const gCW = new Float64Array(NBND * NS * NB);
const gF = new Float64Array(NBND * NB), gLnQ = new Float64Array(NBND * NB);
// global random profiles: [bandSlot][trial][depthIdx]
const gRLL = new Float64Array(RAND_BANDS.length * TR * NB),
      gRLa = new Float64Array(RAND_BANDS.length * TR * NB),
      gRLb = new Float64Array(RAND_BANDS.length * TR * NB),
      gRCW = new Float64Array(RAND_BANDS.length * TR * NB);

// per-fold lambda ledger rows (shift 2, at the fold's own depth q)
const LROWS = [];
const sufN0 = new Float64Array(NB);   // this fold's shift-2 survivor count at each depth

// ============================================================================
console.log('SEC 1 — THE LAMBDA-WEIGHTED LEDGER (bound to the committed CSV, parsed at runtime)');
// ============================================================================
for (let Qi = 0; Qi < NACT; Qi++) {
  const q = ACT[Qi], qn = Qi + 1 < NACT ? ACT[Qi + 1] : QTOP;
  const lo = q * q, hi = qn * qn, width = hi - lo;
  const span = width + EXT;
  spf.fill(0, 0, span); omg.fill(0, 0, span);
  for (let j = 0; j < span; j++) rem[j] = lo + j;
  for (let ri = 0; ri <= Qi; ri++) {
    const r = ACT[ri];
    for (let v = Math.ceil(lo / r) * r; v < lo + span; v += r) {
      const j = v - lo;
      if (spf[j] === 0) spf[j] = r;
      let x = rem[j], k = 0;
      while (x % r === 0) { x /= r; k++; }
      rem[j] = x; omg[j] += k;
    }
  }

  const bandOf = [];
  for (let b = 0; b < NBND; b++) if (q >= BANDS[b][0] && q <= BANDS[b][1]) bandOf.push(b);
  const randSlots = bandOf.filter(b => RAND_BANDS.includes(b)).map(b => RAND_BANDS.indexOf(b));
  const doRand = randSlots.length > 0;

  pc.fill(0); pll.fill(0); pla.fill(0); plb.fill(0);
  if (doRand) { rll.fill(0); rla.fill(0); rlb.fill(0); for (let j = 0; j < span; j++) rnd[j] = hash32(lo + j); }

  let ccCount = 0, ccLam = 0;      // both-composite column, shift 2
  let c = lo % 30;
  for (let a = lo; a < hi; a++, c = (c === 29 ? 0 : c + 1)) {
    if (!cop30[c]) continue;
    const ja = a - lo;
    const da = spf[ja];
    const la = 1 - 2 * ((omg[ja] + (rem[ja] > 1 ? 1 : 0)) & 1);
    for (let s = 0; s < NS; s++) {
      const h = SHIFTS[s], b = a + h;
      if (b >= hi) continue;
      const cb = (c + h) % 30;
      if (!cop30[cb]) continue;
      const jb = b - lo;
      const db = spf[jb];
      const lb = 1 - 2 * ((omg[jb] + (rem[jb] > 1 ? 1 : 0)) & 1);
      let bk;
      if (da === 0 && db === 0) bk = SURV;
      else if (da === 0) bk = PIDX[db];
      else if (db === 0) bk = PIDX[da];
      else bk = PIDX[da < db ? da : db];
      const o = s * NB + bk;
      pc[o]++; pll[o] += la * lb; pla[o] += la; plb[o] += lb;
      if (s === 0) {
        if (da !== 0 && db !== 0) { ccCount++; ccLam += la * lb; }
        if (doRand) {
          const x = rnd[ja] ^ rnd[jb];
          for (let t = 0; t < TR; t++) {
            const sa = 1 - 2 * ((rnd[ja] >>> t) & 1);
            const sb = 1 - 2 * ((rnd[jb] >>> t) & 1);
            const oo = t * NB + bk;
            rll[oo] += 1 - 2 * ((x >>> t) & 1); rla[oo] += sa; rlb[oo] += sb;
          }
        }
      }
    }
  }

  // ---- the ledger's own columns at the fold's own depth q, count and lambda
  let added = 0, Ladded = 0;
  for (let k = 0; k < NB; k++) { added += pc[k]; Ladded += pll[k]; }
  const twins = pc[SURV], Ltwins = pll[SURV];
  const byNew = pc[Qi], LbyNew = pll[Qi];
  const removed = added - twins, Lremoved = Ladded - Ltwins;
  const byOld = removed - byNew, LbyOld = Lremoved - LbyNew;

  // CALIBRATION GATE: row-identical to the committed CSV
  const R = csvRow.get(q);
  if (!R) { failures++; console.log(`  ASSERT FAIL [csv row missing q=${q}]`); }
  else if (R.width !== width || R.added !== added || R.removed !== removed ||
           R.byNew !== byNew || R.byOld !== byOld || R.twins !== twins || R.cc !== ccCount) {
    failures++;
    console.log(`  ASSERT FAIL [csv row q=${q}] got ${[width, added, removed, byNew, byOld, twins, ccCount]} want ${[R.width, R.added, R.removed, R.byNew, R.byOld, R.twins, R.cc]}`);
  }
  // THE STRUCTURAL IDENTITY: every survivor at depth q is a prime pair, so
  // lambda(a)lambda(a+2) = +1 on the whole net column.
  assertEq(`Lambda_net == net at q=${q}`, Ltwins, twins);
  // AND THE SECOND PINNING: a by_new kill has one member q*m with m prime (m is
  // q-rough and m < q'^2/q < q^2), so Omega = 2 there, and the partner cannot also
  // be divisible by q (q does not divide h), so the partner is prime. Hence
  // lambda*lambda = -1 on EVERY by_new pair, and Lambda_by_new = -by_new exactly.
  assertEq(`Lambda_by_new == -by_new at q=${q}`, LbyNew, -byNew);

  LROWS.push({ q, added, Ladded, removed, Lremoved, byNew, LbyNew, byOld, LbyOld, twins, Ltwins, cc: ccCount, Lcc: ccLam });

  // ---- suffix sums -> depth profiles, aggregated into every band this fold is in
  for (let s = 0; s < NS; s++) {
    let n = 0, ll = 0, aa = 0, bb = 0;
    for (let k = NB - 1; k >= 0; k--) {
      const o = s * NB + k;
      n += pc[o]; ll += pll[o]; aa += pla[o]; bb += plb[o];
      if (s === 0) sufN0[k] = n;
      // depth p = ACT[k-1]; the suffix ABOVE k is the survivor set at that depth.
      // record at index k meaning "sieved by every active < ACT[k]" == depth ACT[k-1]
      if (k === 0) continue;
      const cw = n ? ll - aa * bb / n : 0;
      for (const bd of bandOf) {
        const g = (bd * NS + s) * NB + k;
        gN[g] += n; gLL[g] += ll; gLa[g] += aa; gLb[g] += bb; gCW[g] += cw;
      }
    }
  }
  for (const bd of bandOf) for (let k = 1; k < NB; k++) { gF[bd * NB + k]++; gLnQ[bd * NB + k] += Math.log(q); }
  if (doRand) {
    for (const sl of randSlots) {
      for (let t = 0; t < TR; t++) {
        let ll = 0, aa = 0, bb = 0;
        for (let k = NB - 1; k >= 1; k--) {
          const o = t * NB + k;
          ll += rll[o]; aa += rla[o]; bb += rlb[o];
          const g = (sl * TR + t) * NB + k;
          gRLL[g] += ll; gRLa[g] += aa; gRLb[g] += bb;
          gRCW[g] += sufN0[k] ? ll - aa * bb / sufN0[k] : 0;
        }
      }
    }
  }
}
console.log(`  ${LROWS.length} folds recomputed, q = 7..${QMAX}; every row asserted row-identical to ${CSVPATH} (parsed at runtime);`);
console.log(`  Lambda_net == net asserted at every one of the ${LROWS.length} folds.`);

// ============================================================================
console.log('\nSEC 2 — THE LAMBDA LEDGER BY BAND (count column, then its lambda-weighted twin)');
// ============================================================================
{
  console.log('  band            added   L_added   removed   L_removed   by_new  L_by_new    by_old   L_by_old      net    L_net       cc     L_cc');
  for (let b = 0; b < 6; b++) {
    const rs = LROWS.filter(r => r.q >= BANDS[b][0] && r.q <= BANDS[b][1]);
    const S = (k) => rs.reduce((x, r) => x + r[k], 0);
    console.log(`  [${String(BANDS[b][0]).padStart(4)},${String(BANDS[b][1]).padStart(5)}] ${String(S('added')).padStart(8)} ${String(S('Ladded')).padStart(9)} ${String(S('removed')).padStart(9)} ${String(S('Lremoved')).padStart(11)} ${String(S('byNew')).padStart(8)} ${String(S('LbyNew')).padStart(9)} ${String(S('byOld')).padStart(9)} ${String(S('LbyOld')).padStart(10)} ${String(S('twins')).padStart(8)} ${String(S('Ltwins')).padStart(8)} ${String(S('cc')).padStart(8)} ${String(S('Lcc')).padStart(8)}`);
  }
  const T = (k) => LROWS.reduce((x, r) => x + r[k], 0);
  console.log(`  TOTAL          ${String(T('added')).padStart(8)} ${String(T('Ladded')).padStart(9)} ${String(T('removed')).padStart(9)} ${String(T('Lremoved')).padStart(11)} ${String(T('byNew')).padStart(8)} ${String(T('LbyNew')).padStart(9)} ${String(T('byOld')).padStart(9)} ${String(T('LbyOld')).padStart(10)} ${String(T('twins')).padStart(8)} ${String(T('Ltwins')).padStart(8)} ${String(T('cc')).padStart(8)} ${String(T('Lcc')).padStart(8)}`);
  console.log('  PREREG-4 (Chowla calibration of the unsifted added column): |L_added| / sqrt(added)');
  let worst = 0;
  for (let b = 0; b < 6; b++) {
    const rs = LROWS.filter(r => r.q >= BANDS[b][0] && r.q <= BANDS[b][1]);
    const ad = rs.reduce((x, r) => x + r.added, 0), la = rs.reduce((x, r) => x + r.Ladded, 0);
    const z = Math.abs(la) / Math.sqrt(ad); worst = Math.max(worst, z);
    console.log(`    [${String(BANDS[b][0]).padStart(4)},${String(BANDS[b][1]).padStart(5)}]  added ${String(ad).padStart(8)}  L_added ${String(la).padStart(8)}  |L|/sqrt(added) = ${f2(z)}`);
  }
  console.log(`    worst band ratio ${f2(worst)}; PREREG-4 threshold 4 -> ${worst <= 4 ? 'CONSISTENT WITH CHOWLA, UNINFORMATIVE' : 'EXCEEDS the O(1) band'}`);
}

// ============================================================================
console.log('\nSEC 3 — WHY net IS PINNED: THE STRETCH FORCES Omega = 1 ON EVERY SURVIVOR');
// ============================================================================
{
  // direct check of the argument, not just its consequence: at the fold's own
  // depth every surviving member has Omega exactly 1 (is prime).
  let checked = 0, viol = 0;
  const sample = [7, 11, 13, 101, 1009, 3167, 9973];
  for (const q of sample) {
    const Qi = PIDX[q], qn = Qi + 1 < NACT ? ACT[Qi + 1] : QTOP;
    const lo = q * q, hi = qn * qn, span = hi - lo + EXT;
    spf.fill(0, 0, span); omg.fill(0, 0, span);
    for (let j = 0; j < span; j++) rem[j] = lo + j;
    for (let ri = 0; ri <= Qi; ri++) {
      const r = ACT[ri];
      for (let v = Math.ceil(lo / r) * r; v < lo + span; v += r) {
        const j = v - lo; if (spf[j] === 0) spf[j] = r;
        let x = rem[j], k = 0; while (x % r === 0) { x /= r; k++; } rem[j] = x; omg[j] += k;
      }
    }
    let cc2 = lo % 30;
    for (let a = lo; a + 2 < hi; a++, cc2 = (cc2 === 29 ? 0 : cc2 + 1)) {
      if (!cop30[cc2] || !cop30[(cc2 + 2) % 30]) continue;
      const ja = a - lo, jb = ja + 2;
      if (spf[ja] !== 0 || spf[jb] !== 0) continue;
      checked += 2;
      const Oa = omg[ja] + (rem[ja] > 1 ? 1 : 0), Ob = omg[jb] + (rem[jb] > 1 ? 1 : 0);
      if (Oa !== 1 || Ob !== 1) viol++;
    }
  }
  assertEq('every survivor member at its own fold has Omega = 1', viol, 0);
  console.log(`  Direct check at q = ${sample.join(', ')}: ${checked} surviving members, all with Omega exactly 1 (${viol} violations).`);
  console.log('  The argument (PROVEN, one line): a survivor a lies in [q^2, q\'^2) and is q-rough;');
  console.log('  if a were composite its smallest factor would be >= q\', forcing a >= q\'^2. So a is prime,');
  console.log('  lambda(a) = -1, and lambda(a)lambda(a+h) = +1 on the WHOLE net column, at every fold,');
  console.log('  for EVERY even shift h. The ledger\'s sieve parameter is u = log(q^2)/log(q) = 2 exactly,');
  console.log('  and u = 2 is precisely where Omega is pinned and the parity weight is constant.');
  console.log('  SECOND PINNING (PROVEN, asserted at all 1226 folds): a by_new kill has one member');
  console.log('  q*m with m q-rough and m < q\'^2/q < q^2, so m is prime and Omega(q*m) = 2; and q');
  console.log('  cannot divide the partner too (q does not divide h), so the partner is prime.');
  console.log('  So lambda*lambda = -1 on every by_new pair and Lambda_by_new = -by_new EXACTLY.');
  console.log('  Two of the ledger\'s six columns are therefore constants under the weight, by proof.');
}

// ============================================================================
console.log('\nSEC 4 — THE DEPTH SWEEP: DOES THE LAMBDA SUM HAVE ITS OWN MULTIPLIER?');
// ============================================================================
// At depth index k the survivor set is "sieved by every active < ACT[k]", i.e.
// depth p = ACT[k-1]. The count multiplier there is m_N = N(k)/N(k-1) ~ 1-2/p.
function prof(b, s, k) {
  const g = (b * NS + s) * NB + k;
  const n = gN[g]; return { n, ll: gLL[g], la: gLa[g], lb: gLb[g],
    R: n ? gLL[g] / n : NaN, ra: n ? gLa[g] / n : NaN, rb: n ? gLb[g] / n : NaN,
    cov: n ? gLL[g] / n - (gLa[g] / n) * (gLb[g] / n) : NaN,
    covw: n ? gCW[g] / n : NaN };
}
function randVals(slot, k, n, within) {
  const vals = [];
  for (let t = 0; t < TR; t++) {
    const g = (slot * TR + t) * NB + k;
    if (!n) return null;
    vals.push(within ? gRCW[g] / n : gRLL[g] / n - (gRLa[g] / n) * (gRLb[g] / n));
  }
  return vals;
}
function sdOf(vals) {
  if (!vals) return NaN;
  const m = vals.reduce((a, x) => a + x, 0) / vals.length;
  return Math.sqrt(vals.reduce((a, x) => a + (x - m) * (x - m), 0) / (vals.length - 1));
}
function randSigma(slot, k, n) { return sdOf(randVals(slot, k, n, false)); }
function randSigmaW(slot, k, n) { return sdOf(randVals(slot, k, n, true)); }
const TOP = 5, TOPSLOT = RAND_BANDS.indexOf(5);
const sweepK = [];
{
  // depths p = ACT[k-1] with p < 3167 (so every top-band stretch contributes)
  const kmax = PIDX[3163] + 1;
  const want = [7, 13, 23, 47, 97, 199, 401, 797, 1601, 3163];
  for (const p of want) { let pp = p; while (pp > 7 && PIDX[pp] < 0) pp--; const k = PIDX[pp] + 1; if (k >= 1 && k <= kmax) sweepK.push(k); }
}
{
  console.log('  band [3167,9973], 782 folds. p = sieve depth; u_eff = 2 ln q / ln p (mean over the band).');
  console.log('       p   u_eff       N(p)      m_N     1-2/p      R_pair       r_a       r_b       Cov    sigma_r   Cov/sig    m_Lam   m_Lam_hat  ratio');
  for (const k of sweepK) {
    const p = ACT[k - 1];
    const cur = prof(TOP, 0, k), prv = k >= 2 ? prof(TOP, 0, k - 1) : null;
    const ueff = 2 * (gLnQ[TOP * NB + k] / gF[TOP * NB + k]) / Math.log(p);
    const sg = randSigma(TOPSLOT, k, cur.n);
    const mN = prv && prv.n ? cur.n / prv.n : NaN;
    const mL = prv && prv.ll ? cur.ll / prv.ll : NaN;
    const mLhat = prv ? mN * (cur.ra * cur.rb) / (prv.ra * prv.rb) : NaN;
    console.log(`  ${String(p).padStart(6)}  ${f2(ueff).padStart(5)} ${String(cur.n).padStart(10)}  ${f4(mN).padStart(7)}  ${f4(1 - 2 / p).padStart(7)}  ${f4(cur.R).padStart(9)} ${f4(cur.ra).padStart(9)} ${f4(cur.rb).padStart(9)} ${f4(cur.cov).padStart(9)}  ${sci(sg).padStart(9)}  ${f2(cur.cov / sg).padStart(7)}  ${f4(mL).padStart(8)}  ${f4(mLhat).padStart(9)}  ${f3(mL / mLhat)}`);
  }
  console.log('  (m_Lam is the raw lambda-sum multiplier; m_Lam_hat is the PARITY-FREE prediction');
  console.log('   m_N * (r_a r_b)(p) / (r_a r_b)(p_prev) -- counting plus the single-variable marginals only.)');
  console.log('\n  DIAGNOSTIC ADDED AFTER THE PRE-REGISTERED RUN (not a re-scored gate): the band pools');
  console.log('  folds whose u = 2 ln q / ln p differ at a fixed p, so Cov above carries a BETWEEN-FOLD');
  console.log('  term. Cov_w subtracts each fold\'s OWN marginals before pooling; it has no such term.');
  console.log('       p   u_spread          Cov     Cov/sig        Cov_w   Cov_w/sig_w   between-fold share');
  for (const k of sweepK) {
    const p = ACT[k - 1], cur = prof(TOP, 0, k);
    const sg = randSigma(TOPSLOT, k, cur.n), sgw = randSigmaW(TOPSLOT, k, cur.n);
    const uLo = 2 * Math.log(BANDS[TOP][0]) / Math.log(p), uHi = 2 * Math.log(BANDS[TOP][1]) / Math.log(p);
    console.log(`  ${String(p).padStart(6)}  ${f2(uLo)}-${f2(uHi)}  ${f4(cur.cov).padStart(11)}  ${f2(cur.cov / sg).padStart(8)}  ${f4(cur.covw).padStart(11)}  ${f2(cur.covw / sgw).padStart(11)}   ${f2(1 - cur.covw / cur.cov).padStart(6)}`);
  }
}

// ============================================================================
console.log('\nSEC 5 — CONTROLS: (a) i.i.d. RANDOM SIGNS, (b) NON-TWIN SHIFTS h = 4,6,8');
// ============================================================================
let prereg1 = false, prereg2 = false, prereg3 = false;
let best = { z: 0, k: -1, p: 0 };
{
  console.log('  (a) random-sign control validation: measured sigma of Cov vs the 1/sqrt(N) noise floor');
  console.log(`      (${TR} trials, so the ratio itself carries ~${f0(100 / Math.sqrt(2 * (TR - 1)))}% estimator noise, and the depths are`);
  console.log('       nested suffix sums so their ratios move together, not independently)');
  console.log('       p       N(p)     sigma_rand   1/sqrt(N)   ratio    mean(Cov_rand)');
  for (const k of sweepK) {
    const p = ACT[k - 1], cur = prof(TOP, 0, k);
    const sg = randSigma(TOPSLOT, k, cur.n);
    let m = 0; for (let t = 0; t < TR; t++) { const g = (TOPSLOT * TR + t) * NB + k; m += gRLL[g] / cur.n - (gRLa[g] / cur.n) * (gRLb[g] / cur.n); }
    m /= TR;
    console.log(`  ${String(p).padStart(6)} ${String(cur.n).padStart(10)}   ${sci(sg).padStart(10)}  ${sci(1 / Math.sqrt(cur.n)).padStart(10)}   ${f2(sg * Math.sqrt(cur.n)).padStart(5)}    ${sci(m)}`);
  }
  console.log('\n  (b) matched non-twin shifts, same stretches, same buckets: Cov_h and Cov_h/sigma');
  console.log('       p      Cov_h2   z_h2     Cov_h4   z_h4     Cov_h6   z_h6     Cov_h8   z_h8');
  for (const k of sweepK) {
    const p = ACT[k - 1];
    const line = [];
    for (let s = 0; s < NS; s++) {
      const cur = prof(TOP, s, k);
      const sg = randSigma(TOPSLOT, k, cur.n);   // same N-scaled noise floor
      line.push(`${f4(cur.cov).padStart(9)} ${f2(cur.cov / sg).padStart(6)}`);
      if (s === 0 && Math.abs(cur.cov / sg) > Math.abs(best.z)) best = { z: cur.cov / sg, k, p, cov: cur.cov, sg };
    }
    console.log(`  ${String(p).padStart(6)}  ${line.join('  ')}`);
  }
  console.log('  same, on the between-fold-free statistic Cov_w:');
  console.log('       p     Cov_w_h2   z_h2   Cov_w_h4   z_h4   Cov_w_h6   z_h6   Cov_w_h8   z_h8');
  for (const k of sweepK) {
    const p = ACT[k - 1];
    const line = [];
    for (let s = 0; s < NS; s++) {
      const cur = prof(TOP, s, k);
      const sgw = randSigmaW(TOPSLOT, k, cur.n);
      line.push(`${f4(cur.covw).padStart(9)} ${f2(cur.covw / sgw).padStart(6)}`);
    }
    console.log(`  ${String(p).padStart(6)}  ${line.join('  ')}`);
  }
  prereg1 = Math.abs(best.z) >= 5;
  {
    const k = best.k;
    let mx = 0;
    for (let s = 1; s < NS; s++) { const cur = prof(TOP, s, k); const sg = randSigma(TOPSLOT, k, cur.n); mx = Math.max(mx, Math.abs(cur.cov / sg)); }
    prereg2 = Math.abs(best.z) >= 2 * mx;
    console.log(`\n  strongest twin-shift depth in the sweep: p = ${best.p}, Cov_2 = ${f4(best.cov)}, |Cov_2|/sigma = ${f2(Math.abs(best.z))};`);
    console.log(`  matched non-twin best at the same depth: |Cov_h|/sigma = ${f2(mx)}.`);
  }
  console.log('\n  (c) PREREG-3 stability across the three disjoint sub-bands, at that depth');
  console.log('       sub-band          N(p)        Cov_2   sigma_rand   Cov/sigma       Cov_w_2   Cov_w/sig_w');
  {
    let ok = true, sgn = 0;
    for (let i = 1; i < RAND_BANDS.length; i++) {
      const bd = RAND_BANDS[i], sl = i, k = best.k;
      const cur = prof(bd, 0, k);
      const sg = randSigma(sl, k, cur.n), sgw = randSigmaW(sl, k, cur.n);
      const z = cur.cov / sg;
      console.log(`    [${String(BANDS[bd][0]).padStart(4)},${String(BANDS[bd][1]).padStart(5)}] ${String(cur.n).padStart(11)}   ${f4(cur.cov).padStart(9)}   ${sci(sg).padStart(10)}   ${f2(z).padStart(8)}    ${f4(cur.covw).padStart(10)}   ${f2(cur.covw / sgw).padStart(10)}`);
      if (Math.abs(z) < 3) ok = false;
      if (sgn === 0) sgn = Math.sign(z); else if (Math.sign(z) !== sgn) ok = false;
    }
    prereg3 = ok;
  }
}

// ============================================================================
console.log('\nSEC 6 — PREREG SCORING (thresholds fixed in staging/attack-lambda-ledger.md before this file existed)');
// ============================================================================
{
  console.log(`  PREREG-1  |Cov_2| >= 5 sigma_rand somewhere in the sweep .......... ${prereg1 ? 'PASS' : 'FAIL'}  (best |z| = ${f2(Math.abs(best.z))})`);
  console.log(`  PREREG-2  twin excess >= 2x the best non-twin shift ............... ${prereg2 ? 'PASS' : 'FAIL'}`);
  console.log(`  PREREG-3  sign stable across 3 disjoint sub-bands, |z| >= 3 each .. ${prereg3 ? 'PASS' : 'FAIL'}`);
  const accept = prereg1 && prereg2 && prereg3;
  console.log(`  VERDICT: ${accept ? 'ACCEPT -- parity information visible in the fold ledger' : 'REJECT -- the fold ledger is parity-blind on this evidence'}`);

  // the sweep's reach, so a later session knows what was and was not looked at
  const k0 = sweepK[0], k1 = sweepK[sweepK.length - 1];
  const uHi = 2 * Math.log(BANDS[TOP][1]) / Math.log(ACT[k0 - 1]);
  const uLo = 2 * Math.log(BANDS[TOP][0]) / Math.log(ACT[k1 - 1]);
  console.log(`  SWEEP REACH: depths p = ${ACT[k0 - 1]}..${ACT[k1 - 1]} on q in [${BANDS[TOP][0]},${BANDS[TOP][1]}], sieve parameter u from ${f2(uLo)} to ${f2(uHi)},`);
  console.log(`  N(p) from ${prof(TOP, 0, k1).n} to ${prof(TOP, 0, k0).n} pairs; ${sweepK.length} depths x ${NS} shifts = ${sweepK.length * NS} cells scored.`);

  // multiple-comparison honesty on the between-fold-free statistic
  let mx2 = 0, mxAll = 0, mxAllTag = '';
  for (const k of sweepK) for (let s = 0; s < NS; s++) {
    const cur = prof(TOP, s, k), sgw = randSigmaW(TOPSLOT, k, cur.n);
    const z = Math.abs(cur.covw / sgw);
    if (s === 0) mx2 = Math.max(mx2, z);
    if (z > mxAll) { mxAll = z; mxAllTag = `h=${SHIFTS[s]}, p=${ACT[k - 1]}`; }
  }
  const cells = sweepK.length * NS;
  const expMax = Math.sqrt(2 * Math.log(cells));   // Gaussian max-of-cells scale
  console.log(`  On the between-fold-free Cov_w: max |z| at the twin shift = ${f2(mx2)}; max |z| over all ${cells} cells = ${f2(mxAll)} (${mxAllTag}).`);
  console.log(`  Scale of the largest of ${cells} independent standard normals ~ sqrt(2 ln ${cells}) = ${f2(expMax)}, so neither exceeds chance.`);
}

// ============================================================================
console.log('\nSEC 7 — READINGS-IN-RUN (calibrated)');
// ============================================================================
console.log('  1. DISCONFIRMING FIRST: the pre-registered pooled statistic DOES reach 6.03 sigma at');
console.log('     p = 3163, and PREREG-1 passes. It is not a signal. At the same depth the h = 6');
console.log('     control reaches 13.10 sigma, more than twice the twin reading, so PREREG-2 fails');
console.log('     the way REFUTED.md row 32 says twin-specific claims fail here; the three disjoint');
console.log('     sub-bands read 0.72, 0.66, -0.80, so PREREG-3 fails on sign; and the after-the-fact');
console.log('     between-fold diagnostic attributes 1.13 of the pooled reading (113%) to pooling');
console.log('     folds of different u at one p. VERDICT REJECT: the fold ledger is parity-blind.');
console.log('  2. [PROVEN, and asserted at all 1226 folds] TWO of the ledger\'s six columns are');
console.log('     constants under the weight, structurally rather than statistically. L_net is');
console.log('     IDENTICALLY net (a survivor at its own fold is q-rough in [q^2, q\'^2), hence');
console.log('     prime, hence Omega = 1, so lambda*lambda = +1), and L_by_new is IDENTICALLY');
console.log('     -by_new (one member q*m with m prime, the partner prime). Both hold for EVERY');
console.log('     even shift. The ledger sits at sieve parameter u = 2 exactly, which is where');
console.log('     Omega is pinned; there is no measurement to make on those columns at all.');
console.log('  3. [MEASURED] The lambda sum does have its own per-fold multiplier off u = 2, and it');
console.log('     is NOT (1-2/p) -- but the whole of the difference is the PARITY-FREE prediction');
console.log('     m_Lam_hat (counting plus single-variable marginals). Their ratio reads 1.000 at');
console.log('     p = 1601 and 3163 and 1.002 at p = 401, where Lambda is large enough for the');
console.log('     ratio to mean anything; at shallower depths Lambda is at the noise floor and the');
console.log('     ratio is not interpretable. Pair parity adds nothing on top.');
console.log('  4. [MEASURED] On the between-fold-free statistic the twin shift never leaves the');
console.log('     noise: max |z| = 0.86 over the sweep, against 2.72 for the largest of 40');
console.log('     independent normals. The control itself is validated -- SEC 5(a) puts');
console.log('     sigma_rand within 0.82 to 1.04 of the 1/sqrt(N) floor at 13% estimator noise.');
console.log('  5. [CALIBRATION] The unsifted L_added column is a Chowla sum at shift 2 and Chowla');
console.log('     is OPEN. Worst band |L_added|/sqrt(added) = 0.75, so it is consistent with');
console.log('     Chowla and uninformative, and must be called that. NO TPC claim is made here.');
console.log(`\ndone in ${((Date.now() - T0) / 1000).toFixed(1)}s; assertion failures: ${failures}`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-lambda-ledger-01.js
//   invocation:  node research/attack-lambda-ledger-01.js
//   code-sha256: 2aa661f3ced3bade55a865c8dbf0c478d909a6bec5f1ff8014e1f768c3344996
//   out-sha256:  65690e5b11215bfbe8b74e2916097e368bca357ef0f2f8dd0741ab8d5a9f1b35
//   body-lines:  157
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-26
//   elapsed:     4.0 s
// ============================================================================
// SEC 1 — THE LAMBDA-WEIGHTED LEDGER (bound to the committed CSV, parsed at runtime)
//   1226 folds recomputed, q = 7..9973; every row asserted row-identical to research/fold-ledger-01.csv (parsed at runtime);
//   Lambda_net == net asserted at every one of the 1226 folds.
//
// SEC 2 — THE LAMBDA LEDGER BY BAND (count column, then its lambda-weighted twin)
//   band            added   L_added   removed   L_removed   by_new  L_by_new    by_old   L_by_old      net    L_net       cc     L_cc
//   [   7,   31]      124        -6        84         -46        4        -4        80        -42       40       40       17       11
//   [  37,   97]      869        -1       705        -165        3        -3       702       -162      164      164      264      110
//   [ 101,  313]     8989       -71      7972       -1088       18       -18      7954      -1070     1017     1017     3738      878
//   [ 317,  997]    91656      -154     84570       -7240       29       -29     84541      -7211     7086     7086    46123     6675
//   [1009, 3163]   900902       612    850075      -50215       71       -71    850004     -50144    50827    50827   511932    49494
//   [3167, 9973]  9010234      -726   8628503     -382457      202      -202   8628301    -382255   381731   381731  5565304   380576
//   TOTAL          10012774      -346   9571909     -441211      327      -327   9571582    -440884   440865   440865  6127378   437744
//   PREREG-4 (Chowla calibration of the unsifted added column): |L_added| / sqrt(added)
//     [   7,   31]  added      124  L_added       -6  |L|/sqrt(added) = 0.54
//     [  37,   97]  added      869  L_added       -1  |L|/sqrt(added) = 0.03
//     [ 101,  313]  added     8989  L_added      -71  |L|/sqrt(added) = 0.75
//     [ 317,  997]  added    91656  L_added     -154  |L|/sqrt(added) = 0.51
//     [1009, 3163]  added   900902  L_added      612  |L|/sqrt(added) = 0.64
//     [3167, 9973]  added  9010234  L_added     -726  |L|/sqrt(added) = 0.24
//     worst band ratio 0.75; PREREG-4 threshold 4 -> CONSISTENT WITH CHOWLA, UNINFORMATIVE
//
// SEC 3 — WHY net IS PINNED: THE STRETCH FORCES Omega = 1 ON EVERY SURVIVOR
//   Direct check at q = 7, 11, 13, 101, 1009, 3167, 9973: 5648 surviving members, all with Omega exactly 1 (0 violations).
//   The argument (PROVEN, one line): a survivor a lies in [q^2, q'^2) and is q-rough;
//   if a were composite its smallest factor would be >= q', forcing a >= q'^2. So a is prime,
//   lambda(a) = -1, and lambda(a)lambda(a+h) = +1 on the WHOLE net column, at every fold,
//   for EVERY even shift h. The ledger's sieve parameter is u = log(q^2)/log(q) = 2 exactly,
//   and u = 2 is precisely where Omega is pinned and the parity weight is constant.
//   SECOND PINNING (PROVEN, asserted at all 1226 folds): a by_new kill has one member
//   q*m with m q-rough and m < q'^2/q < q^2, so m is prime and Omega(q*m) = 2; and q
//   cannot divide the partner too (q does not divide h), so the partner is prime.
//   So lambda*lambda = -1 on every by_new pair and Lambda_by_new = -by_new EXACTLY.
//   Two of the ledger's six columns are therefore constants under the weight, by proof.
//
// SEC 4 — THE DEPTH SWEEP: DOES THE LAMBDA SUM HAVE ITS OWN MULTIPLIER?
//   band [3167,9973], 782 folds. p = sieve depth; u_eff = 2 ln q / ln p (mean over the band).
//        p   u_eff       N(p)      m_N     1-2/p      R_pair       r_a       r_b       Cov    sigma_r   Cov/sig    m_Lam   m_Lam_hat  ratio
//        7   8.97    6435923      n/a   0.7143    -0.0003   -0.0013   -0.0012   -0.0003    4.11e-4    -0.83       n/a        n/a  n/a
//       13   6.81    4455481   0.8461   0.8462     0.0000   -0.0024   -0.0024   -0.0000    4.57e-4    -0.00   -0.0158     1.6642  -0.009
//       23   5.57    3211571   0.9130   0.9130    -0.0001   -0.0053   -0.0052   -0.0002    4.55e-4    -0.37    1.9191     1.5283  1.256
//       47   4.54    2297766   0.9575   0.9574     0.0003   -0.0148   -0.0146    0.0001    5.99e-4     0.11    0.9063     1.2919  0.702
//       97   3.82    1724158   0.9792   0.9794     0.0014   -0.0414   -0.0416   -0.0003    6.38e-4    -0.52    1.1764     1.1458  1.027
//      199   3.30    1284200   0.9901   0.9899     0.0126   -0.1117   -0.1119    0.0001    7.77e-4     0.18    1.0743     1.0529  1.020
//      401   2.91    1037971   0.9954   0.9950     0.0460   -0.2127   -0.2129    0.0007    9.79e-4     0.68    1.0228     1.0210  1.002
//      797   2.61     842873   0.9973   0.9975     0.1209   -0.3452   -0.3455    0.0017    1.10e-3     1.53    1.0087     1.0077  1.001
//     1601   2.37     668080   0.9984   0.9988     0.2650   -0.5104   -0.5102    0.0046    1.26e-3     3.64    1.0030     1.0031  1.000
//     3163   2.17     523646   0.9990   0.9994     0.5052   -0.7054   -0.7054    0.0076    1.25e-3     6.03    1.0014     1.0014  1.000
//   (m_Lam is the raw lambda-sum multiplier; m_Lam_hat is the PARITY-FREE prediction
//    m_N * (r_a r_b)(p) / (r_a r_b)(p_prev) -- counting plus the single-variable marginals only.)
//
//   DIAGNOSTIC ADDED AFTER THE PRE-REGISTERED RUN (not a re-scored gate): the band pools
//   folds whose u = 2 ln q / ln p differ at a fixed p, so Cov above carries a BETWEEN-FOLD
//   term. Cov_w subtracts each fold's OWN marginals before pooling; it has no such term.
//        p   u_spread          Cov     Cov/sig        Cov_w   Cov_w/sig_w   between-fold share
//        7  8.28-9.46      -0.0003     -0.83      -0.0003        -0.81     0.02
//       13  6.29-7.18      -0.0000     -0.00       0.0000         0.04   217.28
//       23  5.14-5.87      -0.0002     -0.37      -0.0002        -0.35     0.07
//       47  4.19-4.78       0.0001      0.11       0.0001         0.09     0.18
//       97  3.52-4.03      -0.0003     -0.52      -0.0005        -0.75    -0.43
//      199  3.05-3.48       0.0001      0.18      -0.0005        -0.67     4.79
//      401  2.69-3.07       0.0007      0.68      -0.0008        -0.86     2.26
//      797  2.41-2.76       0.0017      1.53      -0.0009        -0.81     1.53
//     1601  2.18-2.50       0.0046      3.64      -0.0000        -0.03     1.01
//     3163  2.00-2.28       0.0076      6.03      -0.0010        -0.76     1.13
//
// SEC 5 — CONTROLS: (a) i.i.d. RANDOM SIGNS, (b) NON-TWIN SHIFTS h = 4,6,8
//   (a) random-sign control validation: measured sigma of Cov vs the 1/sqrt(N) noise floor
//       (32 trials, so the ratio itself carries ~13% estimator noise, and the depths are
//        nested suffix sums so their ratios move together, not independently)
//        p       N(p)     sigma_rand   1/sqrt(N)   ratio    mean(Cov_rand)
//        7    6435923      4.11e-4     3.94e-4    1.04    -7.34e-5
//       13    4455481      4.57e-4     4.74e-4    0.96    -4.89e-5
//       23    3211571      4.55e-4     5.58e-4    0.82    -1.15e-4
//       47    2297766      5.99e-4     6.60e-4    0.91    -1.53e-4
//       97    1724158      6.38e-4     7.62e-4    0.84    -2.20e-4
//      199    1284200      7.77e-4     8.82e-4    0.88    -3.50e-4
//      401    1037971      9.79e-4     9.82e-4    1.00    -3.17e-4
//      797     842873      1.10e-3     1.09e-3    1.01    -4.19e-4
//     1601     668080      1.26e-3     1.22e-3    1.03    -3.76e-4
//     3163     523646      1.25e-3     1.38e-3    0.91    -2.62e-4
//
//   (b) matched non-twin shifts, same stretches, same buckets: Cov_h and Cov_h/sigma
//        p      Cov_h2   z_h2     Cov_h4   z_h4     Cov_h6   z_h6     Cov_h8   z_h8
//        7    -0.0003  -0.83    -0.0003  -0.79    -0.0003  -1.38    -0.0004  -0.86
//       13    -0.0000  -0.00    -0.0005  -1.20    -0.0003  -1.51    -0.0001  -0.15
//       23    -0.0002  -0.37    -0.0007  -1.54    -0.0002  -1.00    -0.0002  -0.37
//       47     0.0001   0.11    -0.0014  -2.37    -0.0003  -1.14     0.0001   0.15
//       97    -0.0003  -0.52    -0.0011  -1.76    -0.0005  -1.45     0.0002   0.30
//      199     0.0001   0.18    -0.0006  -0.75    -0.0006  -1.57     0.0003   0.39
//      401     0.0007   0.68     0.0008   0.82     0.0003   0.63     0.0011   1.16
//      797     0.0017   1.53     0.0021   1.87     0.0021   3.74     0.0020   1.81
//     1601     0.0046   3.64     0.0047   3.75     0.0044   6.98     0.0041   3.26
//     3163     0.0076   6.03     0.0082   6.51     0.0082  13.10     0.0077   6.11
//   same, on the between-fold-free statistic Cov_w:
//        p     Cov_w_h2   z_h2   Cov_w_h4   z_h4   Cov_w_h6   z_h6   Cov_w_h8   z_h8
//        7    -0.0003  -0.81    -0.0003  -0.77    -0.0003  -1.52    -0.0003  -0.84
//       13     0.0000   0.04    -0.0005  -1.18    -0.0004  -1.67    -0.0001  -0.14
//       23    -0.0002  -0.35    -0.0007  -1.53    -0.0003  -1.17    -0.0002  -0.36
//       47     0.0001   0.09    -0.0014  -2.41    -0.0004  -1.35     0.0001   0.13
//       97    -0.0005  -0.75    -0.0013  -1.98    -0.0006  -2.01     0.0001   0.11
//      199    -0.0005  -0.67    -0.0012  -1.54    -0.0013  -3.29    -0.0004  -0.46
//      401    -0.0008  -0.86    -0.0007  -0.73    -0.0012  -2.49    -0.0004  -0.37
//      797    -0.0009  -0.81    -0.0005  -0.47    -0.0005  -0.87    -0.0006  -0.56
//     1601    -0.0000  -0.03     0.0001   0.11    -0.0002  -0.38    -0.0007  -0.53
//     3163    -0.0010  -0.76    -0.0004  -0.32    -0.0003  -0.54    -0.0011  -0.84
//
//   strongest twin-shift depth in the sweep: p = 3163, Cov_2 = 0.0076, |Cov_2|/sigma = 6.03;
//   matched non-twin best at the same depth: |Cov_h|/sigma = 13.10.
//
//   (c) PREREG-3 stability across the three disjoint sub-bands, at that depth
//        sub-band          N(p)        Cov_2   sigma_rand   Cov/sigma       Cov_w_2   Cov_w/sig_w
//     [3167, 4999]       80793      0.0020      2.72e-3       0.72       -0.0008        -0.30
//     [5003, 7499]      180424      0.0015      2.20e-3       0.66        0.0002         0.08
//     [7507, 9973]      262429     -0.0013      1.66e-3      -0.80       -0.0018        -1.07
//
// SEC 6 — PREREG SCORING (thresholds fixed in staging/attack-lambda-ledger.md before this file existed)
//   PREREG-1  |Cov_2| >= 5 sigma_rand somewhere in the sweep .......... PASS  (best |z| = 6.03)
//   PREREG-2  twin excess >= 2x the best non-twin shift ............... FAIL
//   PREREG-3  sign stable across 3 disjoint sub-bands, |z| >= 3 each .. FAIL
//   VERDICT: REJECT -- the fold ledger is parity-blind on this evidence
//   SWEEP REACH: depths p = 7..3163 on q in [3167,9973], sieve parameter u from 2.00 to 9.46,
//   N(p) from 523646 to 6435923 pairs; 10 depths x 4 shifts = 40 cells scored.
//   On the between-fold-free Cov_w: max |z| at the twin shift = 0.86; max |z| over all 40 cells = 3.29 (h=6, p=199).
//   Scale of the largest of 40 independent standard normals ~ sqrt(2 ln 40) = 2.72, so neither exceeds chance.
//
// SEC 7 — READINGS-IN-RUN (calibrated)
//   1. DISCONFIRMING FIRST: the pre-registered pooled statistic DOES reach 6.03 sigma at
//      p = 3163, and PREREG-1 passes. It is not a signal. At the same depth the h = 6
//      control reaches 13.10 sigma, more than twice the twin reading, so PREREG-2 fails
//      the way REFUTED.md row 32 says twin-specific claims fail here; the three disjoint
//      sub-bands read 0.72, 0.66, -0.80, so PREREG-3 fails on sign; and the after-the-fact
//      between-fold diagnostic attributes 1.13 of the pooled reading (113%) to pooling
//      folds of different u at one p. VERDICT REJECT: the fold ledger is parity-blind.
//   2. [PROVEN, and asserted at all 1226 folds] TWO of the ledger's six columns are
//      constants under the weight, structurally rather than statistically. L_net is
//      IDENTICALLY net (a survivor at its own fold is q-rough in [q^2, q'^2), hence
//      prime, hence Omega = 1, so lambda*lambda = +1), and L_by_new is IDENTICALLY
//      -by_new (one member q*m with m prime, the partner prime). Both hold for EVERY
//      even shift. The ledger sits at sieve parameter u = 2 exactly, which is where
//      Omega is pinned; there is no measurement to make on those columns at all.
//   3. [MEASURED] The lambda sum does have its own per-fold multiplier off u = 2, and it
//      is NOT (1-2/p) -- but the whole of the difference is the PARITY-FREE prediction
//      m_Lam_hat (counting plus single-variable marginals). Their ratio reads 1.000 at
//      p = 1601 and 3163 and 1.002 at p = 401, where Lambda is large enough for the
//      ratio to mean anything; at shallower depths Lambda is at the noise floor and the
//      ratio is not interpretable. Pair parity adds nothing on top.
//   4. [MEASURED] On the between-fold-free statistic the twin shift never leaves the
//      noise: max |z| = 0.86 over the sweep, against 2.72 for the largest of 40
//      independent normals. The control itself is validated -- SEC 5(a) puts
//      sigma_rand within 0.82 to 1.04 of the 1/sqrt(N) floor at 13% estimator noise.
//   5. [CALIBRATION] The unsifted L_added column is a Chowla sum at shift 2 and Chowla
//      is OPEN. Worst band |L_added|/sqrt(added) = 0.75, so it is consistent with
//      Chowla and uninformative, and must be called that. NO TPC claim is made here.
//
// done in 3.9s; assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
//
