// ============================================================================
// IMPORT-THINNING 01 — THE NULL MODEL FOR THE FOLD, EXACTLY
// ============================================================================
// FOREIGN-IMPORT ATTACK 3 of 5, 2026-08-19. Target: H'' of
// `research/a3-05-bound-L.md` s8, the unproven conditional-tail law for the
// gap word of T_x, whose empirical two-parameter form r = A*exp(-c*theta/mbar)
// is MEASURED and predictive and whose one-parameter form is REFUTED
// (`history/staging/attack-foldL-06-scaling.md`). Three independent attacks
// name H'' as the wall. The import is point-process thinning and interval
// coalescence.
//
// WHAT THIS SCRIPT DOES, AND WHAT IT DOES NOT. It builds the NULL MODEL for
// the fold recursion -- independent Bernoulli(2/p) thinning of the slot set --
// solves it in closed form, and scores its ZERO-PARAMETER predictions against
// the record's TWO-PARAMETER fit and against fresh measurement. It proves
// nothing about H''. Its job is to say exactly how much of the measured law is
// already forced by thinning alone, and to isolate the residue that is not.
//
// THE NULL MODEL, AND ITS SOURCE. Deleting each point of a renewal process
// independently with probability r leaves a renewal process whose interval is
// a geometric compound of the old one: the number of old intervals swallowed
// is K ~ Geom(q) on {1,2,...} with q = 1-r, so the new pgf is
//     phi_new(w) = q*phi(w) / (1 - r*phi(w)).
// This is classical. It is the thinning of a renewal process (Daley and
// Vere-Jones, "An Introduction to the Theory of Point Processes"), the
// compound-geometric / defective-renewal tail (Feller vol II, renewal theory),
// and the Cramer-Lundberg exponent solving E[e^{kappa G}] = 1/r (Embrechts,
// Kluppelberg and Mikosch, "Modelling Extremal Events"). CALIBRATION: those
// three attributions are written from memory, no copy of any of them is on this
// disk, and no chapter or section number is given here because none was
// checked. The derivation below is self-contained and does not rest on them;
// they are named so a reader knows the null model is textbook, not invented.
// NO PRIOR-ART SEARCH WAS RUN on the composed form below, so nothing here
// claims novelty for it. `research/SEARCH-CONVENTIONS.md` governs, and the
// owning convention for "an infinite composition of Bernoulli thinnings of a
// lattice renewal process" has not been identified, let alone searched.
//
// THE CLOSED FORM (derived here, elementary). Write the gap in units of the
// mod-6 comb, kappa = G/6, so the base tile has kappa == 1 identically. The
// thinning map on the pgf, w |-> q*w/(1-(1-q)*w), is a Mobius transformation
// FIXING BOTH 0 AND 1. Reparameterised by alpha = 1/q it reads
//     M_alpha(w) = w / (alpha - (alpha-1) w),
// and a two-line computation gives  M_a o M_b = M_{ab}.  The maps therefore
// form a one-parameter multiplicative GROUP, and the whole fold ladder from
// the mod-6 comb up to T_x collapses to a SINGLE map with
//     alpha(x) = prod_{5<=q<=x} q/(q-2) = mbar(x)/6.
// M_alpha applied to w (the pgf of the point mass at kappa = 1) is the pgf of
// the GEOMETRIC law on {1,2,...} with mean alpha. So:
//
//   NULL LAW. Under independent thinning the gap word of T_x has
//   P(kappa = k) = (1/alpha)*rho^{k-1}, rho = 1 - 1/alpha = 1 - 6/mbar,
//   EXACTLY, at every level of the ladder, with no error term and no limit.
//   Its tail is P(G >= theta) = rho^{theta/6 - 1}, i.e. exponential with
//     c_null = (mbar/6) * ln(1/(1-6/mbar)) = 1 + 3/mbar + O(mbar^-2)
//   in the record's theta/mbar units. The geometric family is the FIXED
//   FAMILY of the fold map; c_null -> 1 from above as the ladder climbs.
//
// The amplitude is forced too. By `a3-05-bound-L.md` Lemma 2 the qualifying
// values at fold p are three arithmetic progressions of modulus 6p with least
// members theta = 2p-2eta (cheap), 4p+2eta (expensive) and 6p (class 0), so
// under the null law the adjacent-kill-pair density is, with zero free
// parameters,
//     r_null(p) = ( 2 rho^{p-1} + rho^{kc-1} + rho^{ke-1} ) / (2 alpha (1-rho^p))
// with kc = (2p-2eta)/6, ke = (4p+2eta)/6. Its leading term is
// (3/mbar)*exp(-c_null*theta/mbar): the prefactor the record calls "of order
// 6/mbar ... the right order but not a prediction" is DERIVED here, and it is
// 3/mbar, not 6/mbar.
//
// PRE-REGISTRATION, written before Stage C or Stage D was ever run, and
// printed by Stage B so it cannot be quietly revised:
//  R1 SHAPE. c_null computed from mbar alone, with the record's own model-2
//     form fitted to the null's r values over the same folds p >= 100, will
//     land within 10% of the record's FITTED c = 1.0818 +- 0.0317. The record
//     needed two free parameters to reach a number the null model has none.
//  R2 AMPLITUDE. A_null will exceed the record's fitted A = 2.4312e-2, by a
//     factor between 1.5 and 5, because A and c are 0.987-correlated in the
//     record's own fit and a slightly smaller c must be paid for with a
//     smaller A.
//  R3 THE RESIDUE, AND ITS SIGN. The null is a model of INDEPENDENT deletion
//     applied to an INDEPENDENT (geometric) gap law. Predicted: it OVERSHOOTS
//     the measured adjacent-pair count, i.e. the true fold makes FEWER
//     adjacent kill pairs than the null, by a factor between 2 and 4 at
//     Y = 2e9 over folds p >= 100. Direction matters more than size: an
//     overshoot means the true process is NEGATIVELY associated relative to
//     the null, which is the safe direction for H''.
//  R4 EXTINCTION. The zero-parameter null will bracket the measured
//     extinction fold at Y = 2e9 (measured 421) but will MISS it high at
//     Y = 2e10 (measured 457), because an overshoot in the pair rate pushes
//     the last pair deeper.
//  R5 DECOMPOSITION. The overshoot will split into a TAIL factor (the true
//     one-point gap tail at theta ~ 2p is lighter than geometric) and a
//     HAZARD factor (given g >= theta, how much of that mass sits exactly on
//     the qualifying values, which under the geometric law is the constant
//     discrete hazard 1/alpha = 6/mbar). Predicted: the tail factor carries
//     most of it and the hazard factor sits within 30% of 1, because the
//     qualifying values are an AP of modulus 6p and there is no arithmetic
//     reason for the gap word to prefer one AP of multiples of 6 to another.
//
// FRAMES. Two, and they are different objects. The TILE frame is the exact
// cyclic word of T_x mod x#, built here from the mod-6 comb by the fold
// recursion and never sieved; its custody check is G2 = 12, 30, 42, 66, 108,
// 150, 204, 258 and N = prod(q-2). The WINDOW frame is the localized object of
// `attack-foldL-04-localized.js` and `attack-foldL-06-scaling.js`, conventions
// verbatim: [0, Y), n = 5 (mod 6), key(n) = min{q prime >= 5 : q | n(n+2)},
// key 0 for survivors of every fold <= 1499, X_p = kills - runs, mbar_before.
// Stage D asserts 24 figures of the foldL-06 embedded tail digit for digit and
// aborts on any disagreement.
//
// Reproduction:
//   node --max-old-space-size=6000 research/import-thinning-01-nullmodel.js
//   WINY=2e8 node --max-old-space-size=4000 research/import-thinning-01-nullmodel.js
//   STAGE=predict node research/import-thinning-01-nullmodel.js   # A+B only
// ============================================================================

'use strict';
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1);
const say = (s) => console.log(s);
const WINY = Number(process.env.WINY || 2e9);
const QMAX = 1499;
const PREDICT_ONLY = process.env.STAGE === 'predict';
let FAIL = 0;
function assertEq(label, got, rec) {
  const ok = String(got) === String(rec);
  if (!ok) FAIL++;
  say(`  ${ok ? 'OK  ' : 'FAIL'}  ${label.padEnd(42)} got ${String(got).padStart(11)}   record ${String(rec).padStart(11)}`);
}

function primesTo(n) {
  const c = new Uint8Array(n + 1), s = [];
  for (let i = 2; i <= n; i++) { if (!c[i]) { s.push(i); for (let j = i * i; j <= n; j += i) c[j] = 1; } }
  return s;
}
const PR = primesTo(QMAX).filter(p => p >= 5);

// ---------------------------------------------------------------- null model
// mbar_before(p) for every fold, from the exact Mertens-type product.
const MB = new Map();          // p -> mbar BEFORE folding by p
{ let a = 1; for (const p of PR) { MB.set(p, 6 * a); a *= p / (p - 2); } }

function nullRate(p, mbar) {           // r_null(p): adjacent kill pairs per kill
  const alpha = mbar / 6, rho = 1 - 1 / alpha;
  const eta = (p % 6 === 1) ? 1 : -1;
  const kc = (2 * p - 2 * eta) / 6, ke = (4 * p + 2 * eta) / 6;
  const den = 1 - Math.pow(rho, p);
  const Q0 = Math.pow(rho, p - 1) / (alpha * den);
  const Qc = Math.pow(rho, kc - 1) / (alpha * den);
  const Qe = Math.pow(rho, ke - 1) / (alpha * den);
  return { r: (2 * Q0 + Qc + Qe) / 2, Q0, Qc, Qe, theta: 2 * p - 2 * eta, eta };
}
function cNull(mbar) { return (mbar / 6) * Math.log(1 / (1 - 6 / mbar)); }

// ============================================================ STAGE A
say('='.repeat(78));
say('STAGE A — THE NULL MODEL, SOLVED IN CLOSED FORM (VERIFIED)');
say('='.repeat(78));
say('A1. the thinning map is a Mobius transformation fixing 0 and 1, and the');
say('    maps compose multiplicatively: M_a o M_b = M_{ab}, a = 1/q.');
{
  const M = (a, w) => w / (a - (a - 1) * w);
  let worst = 0;
  for (const w of [0.11, 0.37, 0.6, 0.93]) for (const a of [1.3, 2.7, 5.1]) for (const b of [1.1, 3.3, 8.0]) {
    const lhs = M(a, M(b, w)), rhs = M(a * b, w);
    worst = Math.max(worst, Math.abs(lhs - rhs) / Math.abs(rhs));
  }
  say(`    worst relative discrepancy over 36 (w,a,b) triples: ${worst.toExponential(3)}`);
  if (worst > 1e-12) { FAIL++; say('    FAIL: group law does not hold numerically'); }
}
say('');
say('A2. iterating the EXACT compound-geometric pmf recursion from the mod-6');
say('    comb reproduces Geometric(1/alpha) at every level, alpha = mbar/6.');
say('    f_new(k) = q*f(k) + r*sum_{j<k} f(j)*f_new(k-j),  f_0 = delta_1.');
{
  let f = new Float64Array(2001); f[1] = 1;
  let alpha = 1;
  for (const p of [5, 7, 11, 13, 17, 19, 23, 29]) {
    const q = 1 - 2 / p, r = 2 / p, K = 2000, g = new Float64Array(K + 1);
    for (let k = 1; k <= K; k++) { let s = 0; for (let j = 1; j < k; j++) s += f[j] * g[k - j]; g[k] = q * f[k] + r * s; }
    f = g; alpha *= p / (p - 2);
    const rho = 1 - 1 / alpha;
    let dev = 0, mean = 0;
    for (let k = 1; k <= K; k++) { mean += k * f[k]; if (k <= 60) { const pr = Math.pow(rho, k - 1) / alpha; dev = Math.max(dev, Math.abs(f[k] - pr) / pr); } }
    say(`    T_${String(p).padStart(2)}: alpha = ${alpha.toFixed(8)}  mbar = ${(6 * alpha).toFixed(6)}  mean(kappa) = ${mean.toFixed(8)}  max rel dev (k<=60) = ${dev.toExponential(2)}`);
    if (dev > 1e-9) { FAIL++; say('    FAIL: null iterate is not geometric'); }
  }
}
say('');
say('A3. the derived exponent and amplitude, no fitted parameter anywhere.');
say('     fold |   mbar    | c_null = (mbar/6)ln(1/rho) | 3/mbar    | r_null(p)  | theta/mbar');
for (const p of [7, 13, 29, 101, 211, 421, 1009, 1499]) {
  const mb = MB.get(p), nr = nullRate(p, mb);
  say(`    ${String(p).padStart(5)} | ${mb.toFixed(4).padStart(9)} | ${cNull(mb).toFixed(6).padStart(26)} | ${(3 / mb).toExponential(3)} | ${nr.r.toExponential(3)} | ${(nr.theta / mb).toFixed(3).padStart(10)}`);
}

// ============================================================ STAGE B
say('');
say('='.repeat(78));
say('STAGE B — PRE-REGISTRATION (printed before any measurement in C or D)');
say('='.repeat(78));
const sub = PR.filter(p => p >= 100);
let fitA, fitC, fitAw, fitCw;
{
  let n = 0, su = 0, sy = 0, suu = 0, suy = 0;
  let W = 0, wu = 0, wy = 0, wuu = 0, wuy = 0;
  for (const p of sub) {
    const mb = MB.get(p), nr = nullRate(p, mb), u = nr.theta / mb, y = Math.log(nr.r);
    n++; su += u; sy += y; suu += u * u; suy += u * y;
    const w = (WINY / mb) * (2 / p) * nr.r;
    W += w; wu += w * u; wy += w * y; wuu += w * u * u; wuy += w * u * y;
  }
  fitC = -(n * suy - su * sy) / (n * suu - su * su); fitA = Math.exp((sy + fitC * su) / n);
  fitCw = -(W * wuy - wu * wy) / (W * wuu - wu * wu); fitAw = Math.exp((wy + fitCw * wu) / W);
}
say(`B1. the record's own model-2 form  r = A*exp(-c*theta/mbar)  fitted to the`);
say(`    NULL's r values over the same ${sub.length} folds p >= 100:`);
say(`      unweighted (OLS in log)          A = ${fitA.toExponential(4)}   c = ${fitC.toFixed(4)}`);
say(`      weighted by expected pair count  A = ${fitAw.toExponential(4)}   c = ${fitCw.toFixed(4)}`);
say(`      RECORD, fitted by Poisson MLE    A = 2.4312e-2   c = 1.0818 +- 0.0317`);
say(`      (attack-foldL-06-scaling.md s3.1 / A3 of its embedded tail)`);
say(`    R1 shape:      |c_null - 1.0818| / 1.0818 = ${(Math.abs(fitC - 1.0818) / 1.0818 * 100).toFixed(1)}%  (pre-registered: < 10%)`);
say(`    R2 amplitude:  A_null / A_record = ${(fitA / 2.4312e-2).toFixed(2)}  (pre-registered: 1.5 to 5)`);
say('');
say('B2. zero-parameter predictions for the four windows of foldL-06.');
say('    Y      | E[pairs, p>=100] | E[N2, p>=100] | extinction median p* | 10-90% band');
const nullWindow = (Y) => {
  const EX = [];
  let tot = 0, N2 = 0;
  for (const p of PR) {
    const mb = MB.get(p), nr = nullRate(p, mb);
    const e = (Y / mb) * (2 / p) * nr.r;
    EX.push({ p, e });
    if (p >= 100) { tot += e; N2 += 1 - Math.exp(-e); }
  }
  let suf = 0; const surv = new Array(EX.length);
  for (let i = EX.length - 1; i >= 0; i--) { suf += EX[i].e; surv[i] = { p: EX[i].p, S: 1 - Math.exp(-suf) }; }
  const at = (t) => (surv.find(s => s.S <= t) || { p: '>1499' }).p;
  return { tot, N2, med: at(0.5), lo: at(0.9), hi: at(0.1), EX };
};
const NW = {};
for (const Y of [2e7, 2e8, 2e9, 2e10]) {
  const w = nullWindow(Y); NW[Y] = w;
  say(`    ${Y.toExponential(0).padStart(6)} | ${w.tot.toFixed(1).padStart(16)} | ${w.N2.toFixed(1).padStart(13)} | ${String(w.med).padStart(20)} | [${w.lo}, ${w.hi}]`);
}
say('    measured (foldL-06 s4):  last L>=2 fold 181 / 331 / 421 / 457;  N2 = 8 / 21 / 37 / 50;');
say('                             adjacent pairs at Y=2e9 over p>=100 = 2006.');
say(`    R3 residue:    E[pairs]/measured at Y=2e9 = ${(NW[2e9].tot / 2006).toFixed(2)}  (pre-registered: overshoot, factor 2 to 4)`);
say(`    R4 extinction: Y=2e9 band [${NW[2e9].lo}, ${NW[2e9].hi}] contains 421? ${NW[2e9].lo <= 421 && 421 <= NW[2e9].hi ? 'YES' : 'NO'};  Y=2e10 band [${NW[2e10].lo}, ${NW[2e10].hi}] contains 457? ${NW[2e10].lo <= 457 && 457 <= NW[2e10].hi ? 'YES' : 'NO'}`);
if (PREDICT_ONLY) { say(`\n[predict-only stop, ${el()}s]`); process.exit(FAIL ? 1 : 0); }

// ============================================================ STAGE C — tiles
say('');
say('='.repeat(78));
say('STAGE C — TILE FRAME: the exact cyclic word, null vs truth, one-point');
say('='.repeat(78));
function foldTile(T, p) {
  const { gap, N, W, s0 } = T;
  const res = new Int32Array(N); { let r = s0 % p; for (let i = 0; i < N; i++) { res[i] = r; r = (r + gap[i]) % p; } }
  const Wm = W % p;
  const out = new Uint16Array((p - 2) * N); let o = 0;
  let sK = -1, sI = -1;
  outer: for (let k = 0; k < p; k++) {
    const d = ((-k * Wm) % p + p) % p, dm = (d - 2 + p) % p;
    for (let i = 0; i < N; i++) if (res[i] !== d && res[i] !== dm) { sK = k; sI = i; break outer; }
  }
  let s0n = s0 + sK * W; for (let i = 0; i < sI; i++) s0n += gap[i];
  let acc = 0, first = true;
  for (let t = 0; t < p; t++) {
    const k = (sK + t) % p, d = ((-k * Wm) % p + p) % p, dm = (d - 2 + p) % p;
    for (let i = (t === 0 ? sI : 0); i < N; i++) {
      if (res[i] !== d && res[i] !== dm) { if (!first) out[o++] = acc; first = false; acc = 0; }
      acc += gap[i];
    }
  }
  { const d = ((-sK * Wm) % p + p) % p, dm = (d - 2 + p) % p;
    for (let i = 0; i < sI; i++) { if (res[i] !== d && res[i] !== dm) { out[o++] = acc; acc = 0; } acc += gap[i]; } }
  out[o++] = acc;
  return { gap: out, N: o, W: W * p, s0: s0n, p };
}
function census(T, p) {
  let Q0 = 0, Qp = 0, Qm = 0;
  const g = T.gap;
  for (let i = 0; i < T.N; i++) { const r = g[i] % p; if (r === 0) Q0++; else if (r === 2) Qp++; else if (r === p - 2) Qm++; }
  return { Q0, Qp, Qm, X: 2 * Q0 + Qp + Qm };
}
say('C1. custody: N = prod(q-2) and the published G2 ladder, from the fold');
say('    recursion on the mod-6 comb, no sieve anywhere.');
const LAD = { 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258 };
let T = { gap: Uint16Array.from([6]), N: 1, W: 6, s0: 5, p: 3 };
const tiles = {};
let Nexp = 1;
for (const p of [5, 7, 11, 13, 17, 19, 23, 29]) {
  T = foldTile(T, p); Nexp *= (p - 2);
  let G2 = 0, S = 0; for (let i = 0; i < T.N; i++) { if (T.gap[i] > G2) G2 = T.gap[i]; S += T.gap[i]; }
  assertEq(`T_${p}  N`, T.N, Nexp);
  assertEq(`T_${p}  G2`, G2, LAD[p]);
  if (S !== T.W) { FAIL++; say(`  FAIL sum of gaps ${S} != W ${T.W}`); }
  tiles[p] = { gap: T.gap, N: T.N, W: T.W, G2 };
}
say(`    [tiles built, ${el()}s]`);
say('');
say('C2. the one-point test on the tile: X measured against the null law.');
say('    X = 2*Q0 + Q+ + Q- is the Consumption Identity of');
say('    `history/staging/attack-foldL-04-amortized.md` s2 (PROVEN there).');
say('    X_null = N * (2*Q0 + Qc + Qe) under P(kappa=k) = rho^{k-1}/alpha.');
say('    X_indep = 4N/p is the SAME fold under independent Bernoulli(2/p)');
say('    deletion of the p*N slot copies, with no residue structure at all.');
say('');
say('     fold | tile |        N |   theta | th/mbar |    X meas |    X null | meas/null |   X indep | meas/indep');
const tileRows = [];
{
  const order = [5, 7, 11, 13, 17, 19, 23, 29];
  for (let i = 0; i < order.length; i++) {
    const x = order[i], p = (i + 1 < order.length) ? order[i + 1] : 31;
    const t = tiles[x];
    const mb = t.W / t.N;
    const c = census(t, p), nr = nullRate(p, mb);
    const Xnull = t.N * (2 * nr.Q0 + nr.Qc + nr.Qe);
    const Xind = 4 * t.N / p;
    tileRows.push({ x, p, N: t.N, mb, theta: nr.theta, X: c.X, Xnull, Xind, c });
    say(`    ${String(p).padStart(5)} | T_${String(x).padEnd(2)} | ${String(t.N).padStart(8)} | ${String(nr.theta).padStart(7)} | ${(nr.theta / mb).toFixed(3).padStart(7)} | ${String(c.X).padStart(9)} | ${Xnull.toExponential(3).padStart(9)} | ${(Xnull > 0 ? (c.X / Xnull).toFixed(3) : '-').padStart(9)} | ${Xind.toExponential(3).padStart(9)} | ${(c.X / Xind).toExponential(2).padStart(10)}`);
  }
}
say('');
say('C3. R5 decomposition on the tile: (tail factor) x (hazard factor).');
say('    tail factor   = #{g >= theta} measured / N*rho^{theta/6-1}');
say('    hazard factor = [X/#{g>=theta}] measured / [X_null/(N*rho^{theta/6-1})].');
say('    Under the null law the discrete hazard P(g=theta | g>=theta) is the');
say('    constant 1/alpha = 6/mbar, so this factor is 1 exactly under the null.');
say('     fold | #{g=theta} | #{g>=theta} | null #{g>=th} | tail factor | hazard factor | product | X meas/null');
{
  const order = [5, 7, 11, 13, 17, 19, 23, 29];
  for (let i = 0; i < order.length; i++) {
    const x = order[i], p = (i + 1 < order.length) ? order[i + 1] : 31;
    const t = tiles[x], mb = t.W / t.N, alpha = mb / 6, rho = 1 - 1 / alpha;
    const nr = nullRate(p, mb);
    let tail = 0, atTh = 0; for (let j = 0; j < t.N; j++) { if (t.gap[j] >= nr.theta) tail++; if (t.gap[j] === nr.theta) atTh++; }
    const tailNull = t.N * Math.pow(rho, nr.theta / 6 - 1);
    const X = census(t, p).X, Xnull = t.N * (2 * nr.Q0 + nr.Qc + nr.Qe);
    const tf = tail / tailNull;
    const rf = tail > 0 ? (X / tail) / (Xnull / tailNull) : NaN;
    say(`    ${String(p).padStart(5)} | ${String(atTh).padStart(10)} | ${String(tail).padStart(11)} | ${tailNull.toExponential(3).padStart(13)} | ${tf.toFixed(4).padStart(11)} | ${(isNaN(rf) ? '-' : rf.toFixed(4)).padStart(13)} | ${(isNaN(rf) ? '-' : (tf * rf).toFixed(4)).padStart(7)} | ${(Xnull > 0 ? (X / Xnull).toFixed(4) : '-').padStart(11)}`);
  }
}

// ============================================================ STAGE D — window
say('');
say('='.repeat(78));
say(`STAGE D — WINDOW FRAME, Y = ${WINY.toExponential(0)}, 237 folds to ${QMAX}`);
say('='.repeat(78));
const M = Math.floor(WINY / 6);
say(`D0. sieving key(n) for ${M} slots ...`);
const key = new Uint16Array(M);
{
  for (const q of PR) {
    const inv6 = (() => { let v = 1; while ((6 * v) % q !== 1) v++; return v; })();
    for (const c of [((-5 % q) + q) % q, ((-7 % q) + q) % q]) {
      let i0 = (c * inv6) % q;
      for (let i = i0; i < M; i += q) if (key[i] === 0) key[i] = q;
    }
  }
  say(`    [sieve done, ${el()}s]`);
}
// one left-to-right pass with a stack of strictly decreasing keys
const kills = new Map(), Xp = new Map(), Lp = new Map(), Nafter = new Map();
{
  const st = new Int32Array(64), stRun = new Int32Array(64);
  let sp = 0;
  const cnt = new Map();
  for (const p of PR) { kills.set(p, 0); Xp.set(p, 0); Lp.set(p, 1); }
  for (let i = 0; i < M; i++) {
    const k = key[i] === 0 ? 65535 : key[i];
    let adj = false, prevRun = 0;
    while (sp > 0 && st[sp - 1] < k) sp--;
    if (sp > 0 && st[sp - 1] === k) { adj = true; prevRun = stRun[sp - 1]; sp--; }
    const run = adj ? prevRun + 1 : 1;
    if (k !== 65535) {
      kills.set(k, kills.get(k) + 1);
      if (adj) Xp.set(k, Xp.get(k) + 1);
      if (run > Lp.get(k)) Lp.set(k, run);
    }
    st[sp] = k; stRun[sp] = run; sp++;
  }
  let N = M;
  for (const p of PR) { N -= kills.get(p); Nafter.set(p, N); }
  say(`    [stack pass done, ${el()}s]`);
}
say('');
say('D1. calibration against the embedded tail of attack-foldL-06-scaling.js');
if (WINY === 2e9) {
  const Nbef = new Map(); { let N = M; for (const p of PR) { Nbef.set(p, N); N -= kills.get(p); } }
  assertEq('slots (n = 5 mod 6)', M, 333333333);
  assertEq('fold 5   N after', Nafter.get(5), 200000000);
  assertEq('fold 5   kills', kills.get(5), 133333333);
  assertEq('fold 5   X', Xp.get(5), 0);
  assertEq('fold 5   L', Lp.get(5), 1);
  assertEq('fold 7   N after', Nafter.get(7), 142857143);
  assertEq('fold 7   kills', kills.get(7), 57142857);
  assertEq('fold 7   runs', kills.get(7) - Xp.get(7), 38095238);
  assertEq('fold 7   X', Xp.get(7), 19047619);
  assertEq('fold 7   L', Lp.get(7), 2);
  assertEq('fold 23  kills', kills.get(23), 6789558);
  assertEq('fold 23  X', Xp.get(23), 106418);
  assertEq('fold 23  L', Lp.get(23), 3);
  assertEq('fold 29  N after', Nafter.get(29), 66373676);
  assertEq('fold 29  X', Xp.get(29), 75336);
  assertEq('fold 421 N after', Nafter.get(421), 22433554);
  assertEq('fold 421 kills', kills.get(421), 105790);
  assertEq('fold 421 runs', kills.get(421) - Xp.get(421), 105789);
  assertEq('fold 421 X', Xp.get(421), 1);
  assertEq('fold 421 L', Lp.get(421), 2);
  assertEq('fold 1451 N after', Nafter.get(1451), 15852743);
  assertEq('fold 1451 kills', kills.get(1451), 21565);
  let lastL2 = 0, nL2 = 0, maxL = 0, sumL1 = 0, sumX = 0;
  for (const p of PR) { if (Lp.get(p) >= 2) { lastL2 = p; nL2++; } maxL = Math.max(maxL, Lp.get(p)); sumL1 += Lp.get(p) - 1; sumX += Xp.get(p); }
  assertEq('last fold with L >= 2', lastL2, 421);
  assertEq('folds with L >= 2', nL2, 58);
  assertEq('max L over all folds', maxL, 3);
  assertEq('sum over folds of (L-1)', sumL1, 64);
  assertEq('sum over folds of X', sumX, 20317943);
  say(`    ${FAIL === 0 ? 'CALIBRATION CLEAN: 24 of 24 figures reproduced by a third engine.' : 'CALIBRATION DIRTY — ' + FAIL + ' disagreement(s); nothing below is trustworthy.'}`);
} else {
  say(`    skipped: calibration figures exist only at Y = 2e9 (this run used ${WINY.toExponential(0)}).`);
}
say('');
say('D2. measured X_p against the zero-parameter null, by decade of p.');
const Nbef = new Map(); { let N = M; for (const p of PR) { Nbef.set(p, N); N -= kills.get(p); } }
say('    decade      | folds | mean th/mbar | X meas    | X null    | meas/null | kills meas | kills null');
const DEC = [[5, 10], [10, 30], [30, 100], [100, 300], [300, 1000], [1000, 1500]];
let totMeas100 = 0, totNull100 = 0;
for (const [a, b] of DEC) {
  let f = 0, su = 0, xm = 0, xn = 0, km = 0, kn = 0;
  for (const p of PR) {
    if (p < a || p >= b) continue;
    const mb = WINY / Nbef.get(p), nr = nullRate(p, mb);
    f++; su += nr.theta / mb; xm += Xp.get(p); xn += kills.get(p) * nr.r; km += kills.get(p); kn += (WINY / mb) * (2 / p);
  }
  if (a >= 100) { totMeas100 += xm; totNull100 += xn; }
  say(`    [${String(a).padStart(4)},${String(b).padStart(5)}) | ${String(f).padStart(5)} | ${(su / f).toFixed(3).padStart(12)} | ${String(xm).padStart(9)} | ${xn.toExponential(3).padStart(9)} | ${(xn > 0 ? (xm / xn).toFixed(4) : '-').padStart(9)} | ${String(km).padStart(10)} | ${kn.toExponential(3)}`);
}
say(`    p >= 100 totals: X meas = ${totMeas100}, X null = ${totNull100.toFixed(1)}, meas/null = ${(totMeas100 / totNull100).toFixed(4)}`);
say(`    R3 verdict: null overshoots by ${(totNull100 / totMeas100).toFixed(2)}x  (pre-registered 2 to 4, overshoot)`);
say('');
say('D3. the deep folds one by one, where the extinction event lives.');
say('     fold |   mbar | theta/mbar |    kills | X meas | X null    | L');
for (const p of PR) {
  if (p < 200 || p > 700) continue;
  const mb = WINY / Nbef.get(p), nr = nullRate(p, mb);
  if (Xp.get(p) === 0 && kills.get(p) * nr.r < 1e-3) continue;
  say(`    ${String(p).padStart(5)} | ${mb.toFixed(2).padStart(6)} | ${(nr.theta / mb).toFixed(3).padStart(10)} | ${String(kills.get(p)).padStart(8)} | ${String(Xp.get(p)).padStart(6)} | ${(kills.get(p) * nr.r).toExponential(3).padStart(9)} | ${Lp.get(p)}`);
}
say('');
say('D4. R5 decomposition in the window, at four deep levels. The level-p word');
say('    is materialised directly and its one-point tail measured. The hazard');
say('    column is P(g = theta | g >= theta) measured against the null constant');
say('    1/alpha = 6/mbar, which is what the geometric law forces it to be.');
say('     fold |   theta | #{g=theta} | #{g>=theta} | null #{g>=th} | tail factor | hazard meas | hazard null | hazard factor | X meas | X null');
for (const p of [101, 211, 421, 1009]) {
  const nb = Nbef.get(p), mb = WINY / nb, alpha = mb / 6, rho = 1 - 1 / alpha;
  const nr = nullRate(p, mb);
  let prev = -1, tail = 0, atTh = 0, ng = 0, Q0 = 0, Qp2 = 0, Qm2 = 0;
  for (let i = 0; i < M; i++) {
    const k = key[i];
    if (k !== 0 && k < p) continue;
    if (prev >= 0) { const g = 6 * (i - prev); ng++; if (g >= nr.theta) tail++; if (g === nr.theta) atTh++; const rr = g % p; if (rr === 0) Q0++; else if (rr === 2) Qp2++; else if (rr === p - 2) Qm2++; }
    prev = i;
  }
  const Xw = 2 * Q0 + Qp2 + Qm2;
  const tailNull = ng * Math.pow(rho, nr.theta / 6 - 1);
  const XnullW = ng * (2 * nr.Q0 + nr.Qc + nr.Qe);
  say(`    ${String(p).padStart(5)} | ${String(nr.theta).padStart(7)} | ${String(atTh).padStart(10)} | ${String(tail).padStart(11)} | ${tailNull.toExponential(3).padStart(13)} | ${(tail / tailNull).toFixed(4).padStart(11)} | ${(tail > 0 ? (atTh / tail).toFixed(5) : '-').padStart(11)} | ${(1 / alpha).toFixed(5).padStart(11)} | ${(tail > 0 ? ((Xw / tail) / (XnullW / tailNull)).toFixed(4) : '-').padStart(13)} | ${String(Xw).padStart(6)} | ${XnullW.toExponential(3)}`);
}
say('');
say('D5. extinction: measured last fold with L >= 2, against the null band.');
{
  let lastL2 = 0, nL2 = 0;
  for (const p of PR) if (Lp.get(p) >= 2) { lastL2 = p; if (p >= 100) nL2++; }
  const w = nullWindow(WINY);
  say(`    measured last L >= 2 fold = ${lastL2};  null median ${w.med}, band [${w.lo}, ${w.hi}];  in band: ${w.lo <= lastL2 && lastL2 <= w.hi ? 'YES' : 'NO'}`);
  say(`    measured N2(p >= 100) = ${nL2};  null E[N2] = ${w.N2.toFixed(1)};  ratio ${(nL2 / w.N2).toFixed(3)}`);
}
say('');
say(`TOTAL FAILURES: ${FAIL}   elapsed ${el()}s`);
process.exit(FAIL ? 1 : 0);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both --node-flag --max-old-space-size=8000 research/import-thinning-01-nullmodel.js
//   invocation:  node --max-old-space-size=8000 research/import-thinning-01-nullmodel.js
//   code-sha256: a5de24ef2f556aadb243572882ce845e32ed721c0c0c3669b20c07e970f08582
//   out-sha256:  e3ac1b3037eea0011f3402a48675e4bd6124d079c98fc30eab48b97f8a0d70fa
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     20.4 s
// ============================================================================
// ==============================================================================
// STAGE A — THE NULL MODEL, SOLVED IN CLOSED FORM (VERIFIED)
// ==============================================================================
// A1. the thinning map is a Mobius transformation fixing 0 and 1, and the
//     maps compose multiplicatively: M_a o M_b = M_{ab}, a = 1/q.
//     worst relative discrepancy over 36 (w,a,b) triples: 1.356e-15
//
// A2. iterating the EXACT compound-geometric pmf recursion from the mod-6
//     comb reproduces Geometric(1/alpha) at every level, alpha = mbar/6.
//     f_new(k) = q*f(k) + r*sum_{j<k} f(j)*f_new(k-j),  f_0 = delta_1.
//     T_ 5: alpha = 1.66666667  mbar = 10.000000  mean(kappa) = 1.66666667  max rel dev (k<=60) = 4.42e-16
//     T_ 7: alpha = 2.33333333  mbar = 14.000000  mean(kappa) = 2.33333333  max rel dev (k<=60) = 3.41e-15
//     T_11: alpha = 2.85185185  mbar = 17.111111  mean(kappa) = 2.85185185  max rel dev (k<=60) = 9.21e-16
//     T_13: alpha = 3.37037037  mbar = 20.222222  mean(kappa) = 3.37037037  max rel dev (k<=60) = 4.99e-15
//     T_17: alpha = 3.81975309  mbar = 22.918519  mean(kappa) = 3.81975309  max rel dev (k<=60) = 4.36e-15
//     T_19: alpha = 4.26913580  mbar = 25.614815  mean(kappa) = 4.26913580  max rel dev (k<=60) = 2.98e-15
//     T_23: alpha = 4.67572016  mbar = 28.054321  mean(kappa) = 4.67572016  max rel dev (k<=60) = 1.02e-14
//     T_29: alpha = 5.02206981  mbar = 30.132419  mean(kappa) = 5.02206981  max rel dev (k<=60) = 3.64e-15
//
// A3. the derived exponent and amplitude, no fitted parameter anywhere.
//      fold |   mbar    | c_null = (mbar/6)ln(1/rho) | 3/mbar    | r_null(p)  | theta/mbar
//         7 |   10.0000 |                   1.527151 | 3.000e-1 | 1.304e-1 |      1.200
//        13 |   17.1111 |                   1.231379 | 1.753e-1 | 5.572e-2 |      1.403
//        29 |   28.0543 |                   1.125138 | 1.069e-1 | 1.393e-2 |      2.139
//       101 |   52.2234 |                   1.062263 | 5.745e-2 | 1.042e-3 |      3.906
//       211 |   70.1143 |                   1.045396 | 4.279e-2 | 8.939e-5 |      5.990
//       421 |   88.6842 |                   1.035436 | 3.383e-2 | 1.997e-6 |      9.472
//      1009 |  115.5226 |                   1.026905 | 2.597e-2 | 4.516e-10 |     17.451
//      1499 |  129.4535 |                   1.023916 | 2.317e-2 | 1.203e-12 |     23.174
//
// ==============================================================================
// STAGE B — PRE-REGISTRATION (printed before any measurement in C or D)
// ==============================================================================
// B1. the record's own model-2 form  r = A*exp(-c*theta/mbar)  fitted to the
//     NULL's r values over the same 214 folds p >= 100:
//       unweighted (OLS in log)          A = 4.7843e-2   c = 1.0577
//       weighted by expected pair count  A = 9.3439e-2   c = 1.1601
//       RECORD, fitted by Poisson MLE    A = 2.4312e-2   c = 1.0818 +- 0.0317
//       (attack-foldL-06-scaling.md s3.1 / A3 of its embedded tail)
//     R1 shape:      |c_null - 1.0818| / 1.0818 = 2.2%  (pre-registered: < 10%)
//     R2 amplitude:  A_null / A_record = 1.97  (pre-registered: 1.5 to 5)
//
// B2. zero-parameter predictions for the four windows of foldL-06.
//     Y      | E[pairs, p>=100] | E[N2, p>=100] | extinction median p* | 10-90% band
//       2e+7 |             54.8 |          16.2 |                  251 | [199, 337]
//       2e+8 |            548.2 |          31.7 |                  359 | [293, 457]
//       2e+9 |           5481.9 |          48.9 |                  479 | [419, 593]
//      2e+10 |          54819.1 |          68.1 |                  617 | [541, 733]
//     measured (foldL-06 s4):  last L>=2 fold 181 / 331 / 421 / 457;  N2 = 8 / 21 / 37 / 50;
//                              adjacent pairs at Y=2e9 over p>=100 = 2006.
//     R3 residue:    E[pairs]/measured at Y=2e9 = 2.73  (pre-registered: overshoot, factor 2 to 4)
//     R4 extinction: Y=2e9 band [419, 593] contains 421? YES;  Y=2e10 band [541, 733] contains 457? NO
//
// ==============================================================================
// STAGE C — TILE FRAME: the exact cyclic word, null vs truth, one-point
// ==============================================================================
// C1. custody: N = prod(q-2) and the published G2 ladder, from the fold
//     recursion on the mod-6 comb, no sieve anywhere.
//   OK    T_5  N                                     got           3   record           3
//   OK    T_5  G2                                    got          12   record          12
//   OK    T_7  N                                     got          15   record          15
//   OK    T_7  G2                                    got          30   record          30
//   OK    T_11  N                                    got         135   record         135
//   OK    T_11  G2                                   got          42   record          42
//   OK    T_13  N                                    got        1485   record        1485
//   OK    T_13  G2                                   got          66   record          66
//   OK    T_17  N                                    got       22275   record       22275
//   OK    T_17  G2                                   got         108   record         108
//   OK    T_19  N                                    got      378675   record      378675
//   OK    T_19  G2                                   got         150   record         150
//   OK    T_23  N                                    got     7952175   record     7952175
//   OK    T_23  G2                                   got         204   record         204
//   OK    T_29  N                                    got   214708725   record   214708725
//   OK    T_29  G2                                   got         258   record         258
//     [tiles built, 1.1s]
//
// C2. the one-point test on the tile: X measured against the null law.
//     X = 2*Q0 + Q+ + Q- is the Consumption Identity of
//     `history/staging/attack-foldL-04-amortized.md` s2 (PROVEN there).
//     X_null = N * (2*Q0 + Qc + Qe) under P(kappa=k) = rho^{k-1}/alpha.
//     X_indep = 4N/p is the SAME fold under independent Bernoulli(2/p)
//     deletion of the p*N slot copies, with no residue structure at all.
//
//      fold | tile |        N |   theta | th/mbar |    X meas |    X null | meas/null |   X indep | meas/indep
//         7 | T_5  |        3 |      12 |   1.200 |         2 |  7.821e-1 |     2.557 |  1.714e+0 |    1.17e+0
//        11 | T_7  |       15 |      24 |   1.714 |         0 |  1.474e+0 |     0.000 |  5.455e+0 |    0.00e+0
//        13 | T_11 |      135 |      24 |   1.403 |         6 |  1.504e+1 |     0.399 |  4.154e+1 |    1.44e-1
//        17 | T_13 |     1485 |      36 |   1.780 |        72 |  9.225e+1 |     0.781 |  3.494e+2 |    2.06e-1
//        19 | T_17 |    22275 |      36 |   1.571 |      1088 |  1.485e+3 |     0.733 |  4.689e+3 |    2.32e-1
//        23 | T_19 |   378675 |      48 |   1.874 |     11870 |  1.635e+4 |     0.726 |  6.586e+4 |    1.80e-1
//        29 | T_23 |  7952175 |      60 |   2.139 |    243822 |  2.216e+5 |     1.100 |  1.097e+6 |    2.22e-1
//        31 | T_29 | 214708725 |      60 |   1.991 |   8025014 |  6.415e+6 |     1.251 |  2.770e+7 |    2.90e-1
//
// C3. R5 decomposition on the tile: (tail factor) x (hazard factor).
//     tail factor   = #{g >= theta} measured / N*rho^{theta/6-1}
//     hazard factor = [X/#{g>=theta}] measured / [X_null/(N*rho^{theta/6-1})].
//     Under the null law the discrete hazard P(g=theta | g>=theta) is the
//     constant 1/alpha = 6/mbar, so this factor is 1 exactly under the null.
//      fold | #{g=theta} | #{g>=theta} | null #{g>=th} | tail factor | hazard factor | product | X meas/null
//         7 |          2 |           2 |      1.200e+0 |      1.6667 |        1.5343 |  2.5572 |      2.5572
//        11 |          0 |           2 |      2.799e+0 |      0.7146 |        0.0000 |  0.0000 |      0.0000
//        13 |          6 |          36 |      3.696e+1 |      0.9739 |        0.4095 |  0.3988 |      0.3988
//        17 |         60 |         188 |      2.555e+2 |      0.7358 |        1.0608 |  0.7805 |      0.7805
//        19 |       1022 |        4126 |      4.883e+3 |      0.8450 |        0.8670 |  0.7326 |      0.7326
//        23 |      10462 |       37676 |      5.847e+4 |      0.6444 |        1.1270 |  0.7262 |      0.7262
//        29 |     243370 |      745674 |      9.119e+5 |      0.8177 |        1.3454 |  1.1002 |      1.1002
//        31 |    7815766 |    25507880 |      2.910e+7 |      0.8764 |        1.4273 |  1.2510 |      1.2510
//
// ==============================================================================
// STAGE D — WINDOW FRAME, Y = 2e+9, 237 folds to 1499
// ==============================================================================
// D0. sieving key(n) for 333333333 slots ...
//     [sieve done, 6.4s]
//     [stack pass done, 17.1s]
//
// D1. calibration against the embedded tail of attack-foldL-06-scaling.js
//   OK    slots (n = 5 mod 6)                        got   333333333   record   333333333
//   OK    fold 5   N after                           got   200000000   record   200000000
//   OK    fold 5   kills                             got   133333333   record   133333333
//   OK    fold 5   X                                 got           0   record           0
//   OK    fold 5   L                                 got           1   record           1
//   OK    fold 7   N after                           got   142857143   record   142857143
//   OK    fold 7   kills                             got    57142857   record    57142857
//   OK    fold 7   runs                              got    38095238   record    38095238
//   OK    fold 7   X                                 got    19047619   record    19047619
//   OK    fold 7   L                                 got           2   record           2
//   OK    fold 23  kills                             got     6789558   record     6789558
//   OK    fold 23  X                                 got      106418   record      106418
//   OK    fold 23  L                                 got           3   record           3
//   OK    fold 29  N after                           got    66373676   record    66373676
//   OK    fold 29  X                                 got       75336   record       75336
//   OK    fold 421 N after                           got    22433554   record    22433554
//   OK    fold 421 kills                             got      105790   record      105790
//   OK    fold 421 runs                              got      105789   record      105789
//   OK    fold 421 X                                 got           1   record           1
//   OK    fold 421 L                                 got           2   record           2
//   OK    fold 1451 N after                          got    15852743   record    15852743
//   OK    fold 1451 kills                            got       21565   record       21565
//   OK    last fold with L >= 2                      got         421   record         421
//   OK    folds with L >= 2                          got          58   record          58
//   OK    max L over all folds                       got           3   record           3
//   OK    sum over folds of (L-1)                    got          64   record          64
//   OK    sum over folds of X                        got    20317943   record    20317943
//     CALIBRATION CLEAN: 24 of 24 figures reproduced by a third engine.
//
// D2. measured X_p against the zero-parameter null, by decade of p.
//     decade      | folds | mean th/mbar | X meas    | X null    | meas/null | kills meas | kills null
//     [   5,   10) |     2 |        1.600 |  19047619 |  7.449e+6 |    2.5572 |  190476190 | 1.905e+8
//     [  10,   30) |     6 |        1.747 |   1087762 |  3.161e+6 |    0.3441 |   76483467 | 7.648e+7
//     [  30,  100) |    15 |        2.904 |    180556 |  1.963e+5 |    0.9200 |   28075341 | 2.808e+7
//     [ 100,  300) |    37 |        5.674 |      2003 |  5.467e+3 |    0.3664 |   13231803 | 1.320e+7
//     [ 300, 1000) |   106 |       12.588 |         3 |  1.962e+1 |    0.1529 |    7575792 | 7.796e+6
//     [1000, 1500) |    71 |       20.606 |         0 |  1.512e-4 |    0.0000 |    1828063 | 1.909e+6
//     p >= 100 totals: X meas = 2006, X null = 5486.4, meas/null = 0.3656
//     R3 verdict: null overshoots by 2.73x  (pre-registered 2 to 4, overshoot)
//
// D3. the deep folds one by one, where the extinction event lives.
//      fold |   mbar | theta/mbar |    kills | X meas | X null    | L
//       211 |  70.15 |      5.987 |   271868 |     29 |  2.437e+1 | 2
//       223 |  70.82 |      6.269 |   254567 |      0 |  1.686e+1 | 1
//       227 |  71.47 |      6.380 |   247858 |      5 |  1.451e+1 | 2
//       229 |  72.11 |      6.324 |   243642 |      8 |  1.502e+1 | 2
//       233 |  72.75 |      6.433 |   237468 |      8 |  1.297e+1 | 2
//       239 |  73.38 |      6.541 |   229412 |      2 |  1.112e+1 | 2
//       241 |  74.00 |      6.486 |   225324 |      1 |  1.149e+1 | 2
//       251 |  74.63 |      6.754 |   214538 |      2 |  8.219e+0 | 2
//       257 |  75.23 |      6.859 |   208003 |      1 |  7.094e+0 | 2
//       263 |  75.82 |      6.964 |   201700 |      2 |  6.130e+0 | 2
//       269 |  76.41 |      7.068 |   195354 |      2 |  5.297e+0 | 2
//       271 |  76.98 |      7.015 |   192438 |      3 |  5.480e+0 | 2
//       277 |  77.55 |      7.118 |   186698 |      2 |  4.749e+0 | 2
//       281 |  78.12 |      7.220 |   182595 |      0 |  4.153e+0 | 1
//       283 |  78.68 |      7.168 |   180050 |      0 |  4.296e+0 | 1
//       293 |  79.24 |      7.420 |   172576 |      1 |  3.151e+0 | 2
//       307 |  79.79 |      7.670 |   163651 |      0 |  2.291e+0 | 1
//       311 |  80.31 |      7.770 |   160377 |      0 |  2.015e+0 | 1
//       313 |  80.83 |      7.720 |   158211 |      0 |  2.084e+0 | 1
//       317 |  81.35 |      7.818 |   155078 |      1 |  1.836e+0 | 2
//       331 |  81.87 |      8.062 |   147314 |      1 |  1.347e+0 | 2
//       337 |  82.37 |      8.159 |   143796 |      0 |  1.183e+0 | 1
//       347 |  82.86 |      8.400 |   138735 |      0 |  8.846e-1 | 1
//       349 |  83.34 |      8.352 |   137101 |      0 |  9.152e-1 | 1
//       353 |  83.81 |      8.447 |   134735 |      0 |  8.111e-1 | 1
//       359 |  84.29 |      8.542 |   131460 |      0 |  7.144e-1 | 1
//       367 |  84.76 |      8.636 |   127908 |      0 |  6.277e-1 | 1
//       373 |  85.22 |      8.730 |   124774 |      0 |  5.532e-1 | 1
//       379 |  85.68 |      8.824 |   122312 |      0 |  4.902e-1 | 1
//       383 |  86.13 |      8.917 |   120244 |      0 |  4.359e-1 | 1
//       389 |  86.58 |      9.009 |   117741 |      0 |  3.864e-1 | 1
//       397 |  87.02 |      9.101 |   114429 |      0 |  3.401e-1 | 1
//       401 |  87.46 |      9.193 |   112668 |      0 |  3.033e-1 | 1
//       409 |  87.89 |      9.284 |   110025 |      0 |  2.685e-1 | 1
//       419 |  88.32 |      9.511 |   106629 |      0 |  2.050e-1 | 1
//       421 |  88.73 |      9.467 |   105790 |      1 |  2.123e-1 | 2
//       431 |  89.15 |      9.691 |   102702 |      0 |  1.628e-1 | 1
//       433 |  89.56 |      9.647 |   101556 |      0 |  1.680e-1 | 1
//       439 |  89.97 |      9.736 |   100032 |      0 |  1.503e-1 | 1
//       443 |  90.38 |      9.825 |    98044 |      0 |  1.340e-1 | 1
//       449 |  90.78 |      9.914 |    96242 |      0 |  1.196e-1 | 1
//       457 |  91.18 |     10.002 |    94283 |      0 |  1.066e-1 | 1
//       461 |  91.57 |     10.090 |    92994 |      0 |  9.570e-2 | 1
//       463 |  91.96 |     10.047 |    91998 |      0 |  9.867e-2 | 1
//       467 |  92.35 |     10.135 |    90941 |      0 |  8.884e-2 | 1
//       479 |  92.74 |     10.351 |    88154 |      0 |  6.866e-2 | 1
//       487 |  93.12 |     10.438 |    86180 |      0 |  6.120e-2 | 1
//       491 |  93.50 |     10.524 |    85215 |      0 |  5.519e-2 | 1
//       499 |  93.87 |     10.610 |    83527 |      0 |  4.936e-2 | 1
//       503 |  94.24 |     10.696 |    82253 |      0 |  4.437e-2 | 1
//       509 |  94.61 |     10.781 |    80981 |      0 |  3.988e-2 | 1
//       521 |  94.97 |     10.993 |    78429 |      0 |  3.097e-2 | 1
//       523 |  95.33 |     10.952 |    77997 |      0 |  3.204e-2 | 1
//       541 |  95.68 |     11.287 |    75107 |      0 |  2.176e-2 | 1
//       547 |  96.03 |     11.371 |    73911 |      0 |  1.958e-2 | 1
//       557 |  96.37 |     11.580 |    72434 |      0 |  1.543e-2 | 1
//       563 |  96.71 |     11.664 |    71169 |      0 |  1.388e-2 | 1
//       569 |  97.04 |     11.747 |    70148 |      0 |  1.252e-2 | 1
//       571 |  97.37 |     11.707 |    69415 |      0 |  1.288e-2 | 1
//       577 |  97.70 |     11.791 |    68513 |      0 |  1.164e-2 | 1
//       587 |  98.03 |     11.996 |    66957 |      0 |  9.182e-3 | 1
//       593 |  98.36 |     12.079 |    66106 |      0 |  8.306e-3 | 1
//       599 |  98.68 |     12.161 |    65187 |      0 |  7.507e-3 | 1
//       601 |  98.99 |     12.122 |    64534 |      0 |  7.722e-3 | 1
//       607 |  99.31 |     12.204 |    63844 |      0 |  7.004e-3 | 1
//       613 |  99.63 |     12.286 |    63010 |      0 |  6.340e-3 | 1
//       617 |  99.94 |     12.367 |    62476 |      0 |  5.767e-3 | 1
//       619 | 100.25 |     12.329 |    61764 |      0 |  5.921e-3 | 1
//       631 | 100.57 |     12.529 |    60602 |      0 |  4.715e-3 | 1
//       641 | 100.87 |     12.729 |    59337 |      0 |  3.750e-3 | 1
//       643 | 101.18 |     12.691 |    58826 |      0 |  3.859e-3 | 1
//       647 | 101.48 |     12.771 |    58362 |      0 |  3.517e-3 | 1
//       653 | 101.78 |     12.851 |    57558 |      0 |  3.187e-3 | 1
//       659 | 102.08 |     12.931 |    56868 |      0 |  2.895e-3 | 1
//       661 | 102.38 |     12.894 |    56449 |      0 |  2.981e-3 | 1
//       673 | 102.67 |     13.090 |    55262 |      0 |  2.379e-3 | 1
//       677 | 102.96 |     13.170 |    54618 |      0 |  2.162e-3 | 1
//       683 | 103.25 |     13.249 |    54031 |      0 |  1.968e-3 | 1
//       691 | 103.54 |     13.328 |    53208 |      0 |  1.783e-3 | 1
//
// D4. R5 decomposition in the window, at four deep levels. The level-p word
//     is materialised directly and its one-point tail measured. The hazard
//     column is P(g = theta | g >= theta) measured against the null constant
//     1/alpha = 6/mbar, which is what the geometric law forces it to be.
//      fold |   theta | #{g=theta} | #{g>=theta} | null #{g>=th} | tail factor | hazard meas | hazard null | hazard factor | X meas | X null
//       101 |     204 |      26361 |      304983 |      6.824e+5 |      0.4470 |     0.08643 |     0.11490 |        0.7442 |  26557 | 7.984e+4
//       211 |     420 |       4669 |       19422 |      5.965e+4 |      0.3256 |     0.24040 |     0.08553 |        2.8057 |   4669 | 5.111e+3
//       421 |     840 |         42 |         220 |      1.338e+3 |      0.1644 |     0.19091 |     0.06762 |        2.8232 |     42 | 9.048e+1
//      1009 |    2016 |          0 |           1 |      2.518e-1 |      3.9709 |     0.00000 |     0.05247 |        0.0000 |      0 | 1.321e-2
//
// D5. extinction: measured last fold with L >= 2, against the null band.
//     measured last L >= 2 fold = 421;  null median 479, band [419, 593];  in band: YES
//     measured N2(p >= 100) = 37;  null E[N2] = 48.9;  ratio 0.757
//
// TOTAL FAILURES: 0   elapsed 20.3s
// ============================================================================
// READINGS
// ============================================================================
//
// [1] THE FOLD IS AN EXACTLY SOLVABLE THINNING, AND ITS FIXED FAMILY IS THE
//     GEOMETRIC. The thinning map on gap pgfs is a Mobius transformation
//     fixing 0 and 1; reparameterised by alpha = 1/q the maps compose
//     multiplicatively (worst relative discrepancy 1.356e-15 over 36 triples),
//     so the WHOLE ladder from the mod-6 comb to T_x collapses to ONE map with
//     alpha = mbar/6. A2 confirms it by brute force: iterating the exact pmf
//     recursion from delta_1 through folds 5 to 29 reproduces Geometric(1/alpha)
//     to a max relative deviation of 1.02e-14, with mean(kappa) equal to alpha
//     to eight places at every level. This is not an asymptotic statement and
//     has no error term. Under independent thinning the gap law of T_x IS
//     geometric, exactly, at every rung.
//
// [2] THE RECORD'S TWO FITTED PARAMETERS ARE BOTH DERIVABLE, AND THE EXPONENT
//     IS RIGHT TO 2.2%. The null forces c_null = (mbar/6) ln(1/rho), which is
//     1.527151 at fold 7 and falls monotonically to 1.023916 at fold 1499: the
//     exponent tends to 1 FROM ABOVE as the ladder climbs. Fitting the record's
//     own model-2 form to the null's r values over the same 214 folds p >= 100
//     gives c = 1.0577 against the record's FITTED c = 1.0818 +- 0.0317, a 2.2%
//     gap, and A = 4.7843e-2 against 2.4312e-2, a factor 1.97. R1 and R2 both
//     hold as pre-registered. The record's "prefactor of order 6/mbar ... the
//     right order but not a prediction" is derived here as 3/mbar exactly,
//     which is 3.383e-2 at fold 421.
//
// [3] THE NULL OVERSHOOTS, EVERYWHERE IT MATTERS, BY 2.73. Over the 214 folds
//     p >= 100 at Y = 2e9 the window makes 2006 adjacent kill pairs against the
//     null's 5486.4, a ratio of 0.3656. R3 holds as pre-registered, direction
//     and size. The decade breakdown 2.5572 / 0.3441 / 0.9200 / 0.3664 / 0.1529
//     shows it is not a uniform scale error: the ratio falls with depth, so the
//     true process is progressively FURTHER below independent thinning the
//     deeper the fold. That is the safe direction for H''.
//
// [4] THE EXTINCTION PREDICTION, FROM ZERO PARAMETERS, IS WORTH ABOUT AS MUCH
//     AS THE RECORD'S TWO. The null puts the last adjacent pair at 251 / 359 /
//     479 / 617 for Y = 2e7 / 2e8 / 2e9 / 2e10 against measured 181 / 331 /
//     421 / 457. It brackets the truth at 2e8 and 2e9 and misses high at 2e7
//     and 2e10, exactly the pattern R4 pre-registered from the overshoot. At
//     Y = 2e9 the measurement 421 sits inside [419, 593] with two folds to
//     spare, and N2(p >= 100) = 37 against a predicted 48.9, ratio 0.757 --
//     the same hotness on counts the record's own fitted model already discloses.
//
// [5] ON THE EXACT TILE THE NULL IS RIGHT WITHIN A FACTOR 2.5, AND CRT THINNING
//     IS 3 TO 7 TIMES QUIETER THAN INDEPENDENT THINNING. X measured against
//     X_null reads 0.399, 0.781, 0.733, 0.726, 1.100, 1.251 at folds 13 to 31,
//     straddling 1. Against INDEPENDENT Bernoulli(2/p) deletion of the same pN
//     slot copies it reads 1.44e-1 to 2.90e-1 over the same folds. So almost
//     all of the null's accuracy comes from putting the CRT residue structure
//     back in: the geometric gap law is a good model of the WORD, and
//     independent deletion is a bad model of the FOLD.
//
// [6] R5 IS REFUTED, AND THE REFUTATION IS THE USEFUL PART. The overshoot does
//     NOT split into a tail factor near 1 times a hazard factor near 1. In the
//     window the tail factor is 0.4470, 0.3256, 0.1644 at folds 101, 211, 421 --
//     the true one-point tail at theta ~ 2p is three to six times LIGHTER than
//     geometric and getting lighter -- while the hazard factor runs 0.7442,
//     2.8057, 2.8232, i.e. the measured P(g = theta | g >= theta) reaches 0.19
//     at fold 421 against the null's constant 0.06762. Those two are not
//     independent: a tail that falls faster than geometric puts more of its
//     conditional mass on the threshold itself. What the pair says together is
//     that the gap word above 2p is NOT geometric, it is steeper, and the
//     steepness is what the amplitude A was silently absorbing.
//
// [7] CUSTODY. The tile ladder is rebuilt from the mod-6 comb by the fold
//     recursion with no sieve anywhere and reproduces N = prod(q-2) and
//     G2 = 12, 30, 42, 66, 108, 150, 204, 258 at 8 of 8 levels, and the window
//     engine reproduces 24 figures of the attack-foldL-06-scaling.js embedded
//     tail digit for digit, including fold 421's kills = 105790, X = 1 and the
//     window totals 58 folds with L >= 2, sum X = 20317943. Three engines, one
//     object.
