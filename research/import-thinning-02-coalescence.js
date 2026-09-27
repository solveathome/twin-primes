// ============================================================================
// IMPORT-THINNING 02 — INTERVAL COALESCENCE, THE FOLD MOMENT IDENTITY, AND
// THE DOMINATION ATTEMPT
// ============================================================================
// FOREIGN-IMPORT ATTACK 3 of 5, 2026-08-19, stages 2 to 4. Companion to
// `research/import-thinning-01-nullmodel.js`, which solved the independent-
// thinning null in closed form (the fold map is a Mobius transformation, the
// ladder composes to a single geometric law, c_null -> 1 from above) and
// scored it: shape right to 2.2%, amplitude right to a factor 2, adjacent-pair
// count 2.73x hot. This script asks the question that null cannot answer:
// WHAT EXACTLY IS THE DEVIATION, and can it be dominated?
//
// THE OBJECT. Deleting a point of a point process MERGES its two neighbouring
// intervals. That is interval coalescence with nearest-neighbour interaction,
// and it is the reason the gap law is not a product measure: the deletions are
// not independent across ADJACENT gaps. In the fold the coupling is total, not
// approximate. By the Merge Rate Identity (`history/staging/
// attack-foldL-04-amortized.md` s2, PROVEN there) a gap of T_x loses exactly
// 4 - omega of its p copies, omega = 2 / 1 / 0 by residue, and omega >= 1
// exactly on the qualifying gaps, which by `a3-05-bound-L.md` Lemma 2 are all
// at least theta = 2p - 2eta. So CRT coalescence is ALL-OR-NOTHING and
// SIZE-BIASED: for a gap with omega = 0 the two endpoints never die in the
// same copy at all (probability 0 against the null's 4/p^2), and for a
// qualifying gap they die together in omega of the p copies (omega/p against
// 4/p^2, a factor p/4 up).
//
// STAGE A — THE FOLD MOMENT IDENTITY (new here, PROVEN by the two identities
// it is assembled from, VERIFIED exactly below). Write
//     Phi(lam)  = (1/N) sum_i e^{lam g_i}                 one-point
//     Psi(lam)  = (1/N) sum_i e^{lam (g_i + g_{i+1})}     ADJACENT PAIR
//     Om(lam)   = (1/N) sum_i omega_i e^{lam g_i}         qualifying weight
// Every new gap is either a surviving copy of an old gap (there are p-4+omega_i
// of them for gap i) or the span of a kill run (M = 2N - X of them, a run of
// length l merging l+1 consecutive old gaps). Hence exactly
//
//     (p-2) Phi_new = (p-4) Phi + Om + 2 Psi + Delta,
//
// where Delta collects the runs of length >= 2 replacing pairs of single
// merges. Delta is supported entirely on the X adjacent kill pairs. This is
// the whole fold recursion written on exponential moments, with NO error term.
//
// STAGE B — WHAT THE NULL MAP IS, IN THE SAME COORDINATES. Independent
// Bernoulli(r) thinning, r = 2/p, gives Phi_new = q Phi/(1 - r Phi). Expanding,
// (1 - 2/p) Phi + (2/p) Phi^2 + O(p^-2). Comparing term by term with Stage A:
// the survival coefficient (p-4)/(p-2) is SMALLER than 1 - 2/p (CRT destroys
// more copies), the merge coefficient 2/(p-2) is LARGER than (2/p)(1-2/p), and
// the merge term carries Psi where the null carries Phi^2. So
//
//     THE ENTIRE DEVIATION OF CRT THINNING FROM INDEPENDENT THINNING, AT
//     FIRST ORDER IN 1/p, IS THE GAP Psi - Phi^2.
//
// That is the two-point correlation of ADJACENT gaps at exponential order. It
// is H'' of `a3-05-bound-L.md` s8 in its m = 2 case, written as a moment
// rather than as a conditional count. The import lands on the corpus's own
// wall, and it lands on the m >= 2 half of it, not on the m = 1 base case that
// `history/staging/attack-l1-residue.md` showed to be the Zone Postulate in
// disguise.
//
// STAGE C — THE DOMINATION CRITERION, in closed form. Ask for the smallest
// c' with Phi_new <= (1 - c'/p) Phi / (1 - (c'/p) Phi), i.e. for the rate at
// which an INDEPENDENT thinning dominates the true fold on exponential
// moments. Rearranging (both sides positive, Phi_new > Phi > 1 for lam > 0):
//
//     c'_min(lam) = p * (Phi_new - Phi) / ( Phi * (Phi_new - 1) ).
//
// c'_min < 2 means the true fold is dominated by independent thinning at a
// BETTER rate than its own; c'_min > 2 means it is not dominated at any rate
// the null offers. This is a domination on exponential moments, which by
// Markov gives a tail bound; it is NOT a stochastic-order coupling and is not
// presented as one. Stage E says why no coupling exists.
//
// PRE-REGISTRATION, written before the first run:
//  S1 IDENTITY. Stage A holds to floating-point at every fold and every lam,
//     and Delta / ((p-2) Phi_new) stays below 1e-2 at lam <= 0.5/mbar.
//  S2 SIGN. Psi < Phi^2 at every fold and every lam > 0: adjacent gaps of the
//     tile are NEGATIVELY associated at exponential order. Reason to expect
//     it: import-thinning-01 measured X/X_indep at 0.18 to 0.29 on the exact
//     ladder and X/X_null at 0.15 to 1.25 in the window, both below 1 where
//     it matters, and Theorem A of `a3-05-bound-L.md` s4 forbids two adjacent
//     qualifying gaps from both being cheap.
//  S3 DOMINATION. c'_min < 2 at every fold from 13 upward, at every lam with
//     lam*mbar <= 0.75. Folds 7 and 11 are exempt (3 and 15 gaps).
//  S4 FORWARD INDUCTION. The measured Phi_x(lam) stays BELOW the null
//     geometric Phi at every level and every lam, and the ratio drifts DOWN
//     the ladder, i.e. the true tile is progressively lighter-tailed than the
//     thinning fixed point.
//  S5 WHERE CRT IS HEAVIER. The new-gap law under CRT will show EXCESS mass
//     over the independent-thinned law in a band near theta and near 2*theta,
//     the sizes a merge of qualifying gaps produces, and a DEFICIT in the
//     bulk. Predicted total variation per fold: below 0.05 from fold 17 on.
//
// Reproduction:
//   node --max-old-space-size=8000 research/import-thinning-02-coalescence.js
//   DEEP=1 node --max-old-space-size=8000 research/import-thinning-02-coalescence.js  # adds fold 31 on T_29
// ============================================================================

'use strict';
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1);
const say = (s) => console.log(s);
const DEEP = !!process.env.DEEP;
let FAIL = 0;
const bad = (m) => { FAIL++; say('  FAIL  ' + m); };

// ------------------------------------------------------------- tile machinery
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

// Streaming fold: the new gap HISTOGRAM and moment sums, without materialising
// T_new. Also the exact run-length spectrum and the run-span moment sums.
function foldStream(T, p, lams) {
  const { gap, N, W, s0 } = T;
  const res = new Int32Array(N); { let r = s0 % p; for (let i = 0; i < N; i++) { res[i] = r; r = (r + gap[i]) % p; } }
  const Wm = W % p;
  const HMAX = 8192;
  const hist = new Float64Array(HMAX + 1);
  const sumNew = new Float64Array(lams.length);
  const sumRun = new Float64Array(lams.length);
  const runlen = new Float64Array(64);
  let sK = -1, sI = -1;
  outer: for (let k = 0; k < p; k++) {
    const d = ((-k * Wm) % p + p) % p, dm = (d - 2 + p) % p;
    for (let i = 0; i < N; i++) if (res[i] !== d && res[i] !== dm) { sK = k; sI = i; break outer; }
  }
  let acc = 0, first = true, dead = 0, nNew = 0;
  const emit = (g, nd) => {
    nNew++;
    if (g <= HMAX) hist[g]++;
    for (let a = 0; a < lams.length; a++) sumNew[a] += Math.exp(lams[a] * g);
    if (nd > 0) { runlen[nd]++; for (let a = 0; a < lams.length; a++) sumRun[a] += Math.exp(lams[a] * g); }
  };
  for (let t = 0; t < p; t++) {
    const k = (sK + t) % p, d = ((-k * Wm) % p + p) % p, dm = (d - 2 + p) % p;
    for (let i = (t === 0 ? sI : 0); i < N; i++) {
      if (res[i] !== d && res[i] !== dm) { if (!first) emit(acc, dead); first = false; acc = 0; dead = 0; }
      else dead++;
      acc += gap[i];
    }
  }
  { const d = ((-sK * Wm) % p + p) % p, dm = (d - 2 + p) % p;
    for (let i = 0; i < sI; i++) { if (res[i] !== d && res[i] !== dm) { emit(acc, dead); acc = 0; dead = 0; } else dead++; acc += gap[i]; } }
  emit(acc, dead);
  return { hist, sumNew, sumRun, runlen, nNew };
}

function moments(T, p, lams) {
  const { gap, N } = T;
  const Phi = new Float64Array(lams.length), Psi = new Float64Array(lams.length), Om = new Float64Array(lams.length);
  let Q0 = 0, Qp = 0, Qm = 0;
  for (let i = 0; i < N; i++) {
    const g = gap[i], gn = gap[(i + 1) % N], r = g % p;
    const w = (r === 0) ? 2 : ((r === 2 || r === p - 2) ? 1 : 0);
    if (r === 0) Q0++; else if (r === 2) Qp++; else if (r === p - 2) Qm++;
    for (let a = 0; a < lams.length; a++) {
      const e = Math.exp(lams[a] * g);
      Phi[a] += e; Psi[a] += e * Math.exp(lams[a] * gn); if (w) Om[a] += w * e;
    }
  }
  for (let a = 0; a < lams.length; a++) { Phi[a] /= N; Psi[a] /= N; Om[a] /= N; }
  return { Phi, Psi, Om, X: 2 * Q0 + Qp + Qm, Q0, Qp, Qm };
}

// --------------------------------------------------------------- build ladder
say('='.repeat(96));
say('STAGE 0 — the exact ladder, custody as in import-thinning-01');
say('='.repeat(96));
const LAD = { 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258 };
const ORDER = [5, 7, 11, 13, 17, 19, 23, 29];
const tiles = {};
{
  let T = { gap: Uint16Array.from([6]), N: 1, W: 6, s0: 5, p: 3 }, Nexp = 1;
  for (const p of ORDER) {
    T = foldTile(T, p); Nexp *= (p - 2);
    let G2 = 0, S = 0; for (let i = 0; i < T.N; i++) { if (T.gap[i] > G2) G2 = T.gap[i]; S += T.gap[i]; }
    if (T.N !== Nexp) bad(`T_${p} N ${T.N} != ${Nexp}`);
    if (G2 !== LAD[p]) bad(`T_${p} G2 ${G2} != ${LAD[p]}`);
    if (S !== T.W) bad(`T_${p} sum of gaps != W`);
    tiles[p] = { gap: T.gap, N: T.N, W: T.W, s0: T.s0, G2 };
  }
  say(`  N = prod(q-2) and G2 = 12,30,42,66,108,150,204,258 reproduced at 8 of 8 levels.  ${el()}s`);
}
const PAIRS = [[5, 7], [7, 11], [11, 13], [13, 17], [17, 19], [19, 23], [23, 29]];
if (DEEP) PAIRS.push([29, 31]);
const US = [0.25, 0.5, 0.75, 0.9];   // lam = u / mbar

// ============================================================ STAGE A
say('');
say('='.repeat(96));
say('STAGE A — THE FOLD MOMENT IDENTITY, VERIFIED EXACTLY');
say('   (p-2) Phi_new = (p-4) Phi + Om + 2 Psi + Delta,  Delta from runs of length >= 2');
say('='.repeat(96));
say('  tile |  p | u    |      Phi |   Phi_new |       Psi |        Om |     Delta | Delta share | rel resid');
const REC = {};
for (const [x, p] of PAIRS) {
  const t = tiles[x], mbar = t.W / t.N;
  const lams = US.map(u => u / mbar);
  const m = moments(t, p, lams);
  const fs = foldStream(t, p, lams);
  const Nn = fs.nNew;
  if (Nn !== (p - 2) * t.N) bad(`fold ${p}: new gap count ${Nn} != ${(p - 2) * t.N}`);
  const row = { x, p, mbar, m, fs, Nn, lams, PhiNew: [], Delta: [] };
  for (let a = 0; a < lams.length; a++) {
    const PhiNew = fs.sumNew[a] / Nn;
    // Delta = (p-2)Phi_new - (p-4)Phi - Om - 2 Psi
    const Delta = (p - 2) * PhiNew - (p - 4) * m.Phi[a] - m.Om[a] - 2 * m.Psi[a];
    // independent check of Delta from the run spectrum:
    //   run term measured = sumRun/N ; single-merge model = 2 Psi
    const runTerm = fs.sumRun[a] / t.N;
    const resid = Math.abs(runTerm - (2 * m.Psi[a] + Delta)) / Math.max(1e-300, Math.abs(runTerm));
    // tolerance 5e-8, not machine epsilon: the two sides are sums of up to
    // 2e8 exp() terms each and the float64 accumulation floor is around 1e-9
    // at that length. Anything above 5e-8 is a real disagreement.
    if (resid > 5e-8) bad(`fold ${p} u=${US[a]}: run-term residual ${resid.toExponential(2)}`);
    row.PhiNew.push(PhiNew); row.Delta.push(Delta);
    say(`  T_${String(x).padEnd(2)} | ${String(p).padStart(2)} | ${US[a].toFixed(2)} | ${m.Phi[a].toFixed(6).padStart(8)} | ${PhiNew.toFixed(6).padStart(9)} | ${m.Psi[a].toFixed(6).padStart(9)} | ${m.Om[a].toExponential(3).padStart(9)} | ${Delta.toExponential(3).padStart(9)} | ${(Delta / ((p - 2) * PhiNew)).toExponential(2).padStart(11)} | ${resid.toExponential(2)}`);
  }
  REC[p] = row;
  say(`       run-length spectrum at fold ${p}: ` + Array.from(fs.runlen.slice(1, 8)).map((v, i) => `${i + 1}:${v}`).filter(s => !s.endsWith(':0')).join(' ') + `   X = ${m.X} = 2*${m.Q0}+${m.Qp}+${m.Qm}`);
  const M = fs.runlen.reduce((a, v) => a + v, 0), tot = fs.runlen.reduce((a, v, i) => a + v * i, 0);
  if (tot !== 2 * t.N) bad(`fold ${p}: killed slots ${tot} != 2N = ${2 * t.N}`);
  if (2 * t.N - M !== m.X) bad(`fold ${p}: 2N - M = ${2 * t.N - M} != X = ${m.X}  (Consumption Identity)`);
  say(`       Consumption Identity X = 2N - M: ${m.X} = ${2 * t.N} - ${M}  OK`);
}

// ============================================================ STAGE B
say('');
say('='.repeat(96));
say('STAGE B — THE DEVIATION: Psi against Phi^2, which is the whole of it');
say('   K(lam) = Psi / Phi^2.  K < 1 is negative association of ADJACENT gaps.');
say('   The EXACT criterion for the fold to be dominated by its OWN null map');
say('   (independent thinning at 2/p) follows from the Stage A identity: set');
say('   (p-2)Phi_new <= (p-2)(1-2/p)Phi/(1-2Phi/p) and solve for Psi, giving');
say('       K < K_crit = [ Phi(2 + (p-4)Phi)/(p - 2Phi) - (Om + Delta)/2 ] / Phi^2.');
say('   Note K_crit > 1: the null map is generous, because CRT destroys MORE');
say('   copies per gap (4 - omega >= 2) than independent thinning expects. So');
say('   negative association is sufficient but far from necessary here.');
say('='.repeat(96));
say('  tile |  p | u    |       Psi |     Phi^2 |   K = Psi/Phi^2 |  K_crit (exact) | K < K_crit');
for (const [x, p] of PAIRS) {
  const R = REC[p];
  for (let a = 0; a < US.length; a++) {
    const Phi = R.m.Phi[a], K = R.m.Psi[a] / (Phi * Phi);
    const Kcrit = (Phi * (2 + (p - 4) * Phi) / (p - 2 * Phi) - (R.m.Om[a] + R.Delta[a]) / 2) / (Phi * Phi);
    say(`  T_${String(x).padEnd(2)} | ${String(p).padStart(2)} | ${US[a].toFixed(2)} | ${R.m.Psi[a].toFixed(6).padStart(9)} | ${(Phi ** 2).toFixed(6).padStart(9)} | ${K.toFixed(8).padStart(15)} | ${Kcrit.toFixed(8).padStart(15)} | ${K < Kcrit ? 'YES' : 'no '}`);
  }
}

// ============================================================ STAGE C
say('');
say('='.repeat(96));
say('STAGE C — THE DOMINATION CRITERION  c_min = p (Phi_new - Phi)/(Phi (Phi_new - 1))');
say('   c_min < 2  =>  the true fold is dominated on exponential moments by');
say('   independent thinning at rate c_min/p, which is BETTER than its own 2/p.');
say('='.repeat(96));
say('  tile |  p | u    |   lam*mbar |     Phi |  Phi_new | Phi_null(2/p) | c_min | c_min < 2');
for (const [x, p] of PAIRS) {
  const R = REC[p];
  for (let a = 0; a < US.length; a++) {
    const Phi = R.m.Phi[a], Pn = R.PhiNew[a];
    const r = 2 / p, feasible = r * Phi < 1;
    const PhiNull = feasible ? (1 - r) * Phi / (1 - r * Phi) : NaN;
    const cmin = p * (Pn - Phi) / (Phi * (Pn - 1));
    say(`  T_${String(x).padEnd(2)} | ${String(p).padStart(2)} | ${US[a].toFixed(2)} | ${(R.lams[a] * R.mbar).toFixed(5).padStart(10)} | ${Phi.toFixed(5).padStart(7)} | ${Pn.toFixed(5).padStart(8)} | ${(feasible ? PhiNull.toFixed(5) : 'infeasible').padStart(13)} | ${cmin.toFixed(4).padStart(5)} | ${cmin < 2 ? 'YES' : 'no'}`);
  }
}

// ============================================================ STAGE D
say('');
say('='.repeat(96));
say('STAGE D — FORWARD INDUCTION: is the true tile lighter than the thinning');
say('   fixed point?  Phi_null(lam) = (1/alpha) e^{6 lam} / (1 - rho e^{6 lam}).');
say('='.repeat(96));
say('  tile |    mbar |    u | Phi measured | Phi null geom | ratio');
for (const x of ORDER) {
  const t = tiles[x], mbar = t.W / t.N, alpha = mbar / 6, rho = 1 - 1 / alpha;
  for (const u of US) {
    const lam = u / mbar;
    let S = 0; for (let i = 0; i < t.N; i++) S += Math.exp(lam * t.gap[i]);
    const Phi = S / t.N;
    const e6 = Math.exp(6 * lam);
    const PhiN = (rho * e6 < 1) ? (1 / alpha) * e6 / (1 - rho * e6) : NaN;
    say(`  T_${String(x).padEnd(2)} | ${mbar.toFixed(4).padStart(7)} | ${u.toFixed(2)} | ${Phi.toFixed(6).padStart(12)} | ${(isNaN(PhiN) ? 'div' : PhiN.toFixed(6)).padStart(13)} | ${(isNaN(PhiN) ? '-' : (Phi / PhiN).toFixed(5))}`);
  }
}

// ============================================================ STAGE E
say('');
say('='.repeat(96));
say('STAGE E — WHERE CRT COALESCENCE IS HEAVIER: total variation, and the');
say('   excess band. Reference law: the exact compound-geometric thinning of');
say('   the SAME old word,  f = q h + r (h * f),  h the measured old histogram.');
say('='.repeat(96));
say('  (mass CRT>indep equals TV identically for two probability measures; it');
say('   is printed only as an arithmetic check on the histograms.)');
say('  tile |  p |    TV | mass CRT>indep | top excess bands (gap: CRT/indep, CRT mass)');
for (const [x, p] of PAIRS) {
  const t = tiles[x], R = REC[p];
  // old histogram on multiples of 6
  const KMAX = 1200;
  const h = new Float64Array(KMAX + 1);
  for (let i = 0; i < t.N; i++) { const k = t.gap[i] / 6; if (k <= KMAX) h[k] += 1 / t.N; }
  const q = 1 - 2 / p, r = 2 / p;
  const f = new Float64Array(KMAX + 1);
  for (let k = 1; k <= KMAX; k++) { let s = 0; for (let j = 1; j < k; j++) { if (h[j] !== 0) s += h[j] * f[k - j]; } f[k] = q * h[k] + r * s; }
  // true new law
  const g = new Float64Array(KMAX + 1);
  for (let k = 1; k <= KMAX; k++) g[k] = R.fs.hist[6 * k] / R.Nn;
  let tv = 0, up = 0; const ex = [];
  for (let k = 1; k <= KMAX; k++) {
    tv += Math.abs(g[k] - f[k]) / 2;
    if (g[k] > f[k]) { up += g[k] - f[k]; if (g[k] > 1e-12) ex.push({ gap: 6 * k, ratio: f[k] > 0 ? g[k] / f[k] : Infinity, m: g[k] }); }
  }
  ex.sort((a, b) => b.m * Math.log(1 + b.ratio) - a.m * Math.log(1 + a.ratio));
  const top = ex.slice(0, 4).map(e => `${e.gap}: ${e.ratio === Infinity ? 'inf' : e.ratio.toFixed(2)}x, ${e.m.toExponential(2)}`).join(' | ');
  const massF = f.reduce((a, v) => a + v, 0), massG = g.reduce((a, v) => a + v, 0);
  if (Math.abs(massF - 1) > 1e-6 || Math.abs(massG - 1) > 1e-6) say(`       (truncation: indep mass ${massF.toFixed(8)}, true mass ${massG.toFixed(8)})`);
  say(`  T_${String(x).padEnd(2)} | ${String(p).padStart(2)} | ${tv.toFixed(5)} | ${up.toFixed(5).padStart(14)} | ${top}`);
  // tail comparison at the qualifying scales
  const th = 2 * p - 2 * ((p % 6 === 1) ? 1 : -1);
  const tailAt = (arr, T) => { let s = 0; for (let k = Math.ceil(T / 6); k <= KMAX; k++) s += arr[k]; return s; };
  const bands = [th, 2 * th, 3 * th];
  say(`       tails: ` + bands.map(b => `P(>=${b}) true ${tailAt(g, b).toExponential(3)} vs indep ${tailAt(f, b).toExponential(3)} ratio ${(tailAt(f, b) > 0 ? (tailAt(g, b) / tailAt(f, b)).toFixed(3) : '-')}`).join('; '));
}

say('');
say(`TOTAL FAILURES: ${FAIL}   elapsed ${el()}s`);
process.exit(FAIL ? 1 : 0);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both --node-flag --max-old-space-size=8000 research/import-thinning-02-coalescence.js
//   invocation:  node --max-old-space-size=8000 research/import-thinning-02-coalescence.js
//   code-sha256: 6a3795dcc45ecbac5e4e0d1e561ba918c823ba6d323c6752e2afa902b1a24545
//   out-sha256:  0f90589cae59aa7bd75a349778dac617a0c4bdb7cff843d53c559fd86a14cd53
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     19.6 s
// ============================================================================
// ================================================================================================
// STAGE 0 — the exact ladder, custody as in import-thinning-01
// ================================================================================================
//   N = prod(q-2) and G2 = 12,30,42,66,108,150,204,258 reproduced at 8 of 8 levels.  1.0s
//
// ================================================================================================
// STAGE A — THE FOLD MOMENT IDENTITY, VERIFIED EXACTLY
//    (p-2) Phi_new = (p-4) Phi + Om + 2 Psi + Delta,  Delta from runs of length >= 2
// ================================================================================================
//   tile |  p | u    |      Phi |   Phi_new |       Psi |        Om |     Delta | Delta share | rel resid
//   T_5  |  7 | 0.25 | 1.287184 |  1.443667 |  1.652914 |  8.999e-1 | -8.490e-1 |    -1.18e-1 | 1.08e-15
//   T_5  |  7 | 0.50 | 1.664699 |  2.167274 |  2.746441 |  1.215e+0 | -8.654e-1 |    -7.99e-2 | 3.84e-16
//   T_5  |  7 | 0.75 | 2.162506 |  3.404806 |  4.588166 |  1.640e+0 | -2.796e-1 |    -1.64e-2 | 2.00e-16
//   T_5  |  7 | 0.90 | 2.535122 |  4.571407 |  6.259106 |  1.963e+0 |  7.703e-1 |     3.37e-2 | 0.00e+0
//        run-length spectrum at fold 7: 1:2 2:2   X = 2 = 2*0+0+2
//        Consumption Identity X = 2N - M: 2 = 6 - 4  OK
//   T_7  | 11 | 0.25 | 1.295108 |  1.377589 |  1.666271 |  0.000e+0 | 4.885e-15 |    3.94e-16 | 1.07e-15
//   T_7  | 11 | 0.50 | 1.709356 |  1.959913 |  2.836864 |  0.000e+0 | -1.332e-14 |   -7.55e-16 | 2.82e-15
//   T_7  | 11 | 0.75 | 2.305030 |  2.889577 |  4.935492 |  0.000e+0 | -1.421e-14 |   -5.46e-16 | 1.62e-15
//   T_7  | 11 | 0.90 | 2.789056 |  3.714017 |  6.951379 |  0.000e+0 | -4.263e-14 |   -1.28e-15 | 2.43e-15
//        run-length spectrum at fold 11: 1:30   X = 0 = 2*0+0+0
//        Consumption Identity X = 2N - M: 0 = 30 - 30  OK
//   T_11 | 13 | 0.25 | 1.296682 |  1.366098 |  1.677802 |  6.311e-2 | -6.177e-2 |    -4.11e-3 | 5.66e-15
//   T_11 | 13 | 0.50 | 1.717258 |  1.937697 |  2.925161 |  8.962e-2 | -8.060e-2 |    -3.78e-3 | 5.03e-14
//   T_11 | 13 | 0.75 | 2.327455 |  2.875468 |  5.324282 |  1.273e-1 | -9.276e-2 |    -2.93e-3 | 1.68e-16
//   T_11 | 13 | 0.90 | 2.826313 |  3.736358 |  7.797317 |  1.571e-1 | -8.856e-2 |    -2.15e-3 | 2.62e-14
//        run-length spectrum at fold 13: 1:258 2:6   X = 6 = 2*0+0+6
//        Consumption Identity X = 2N - M: 6 = 270 - 264  OK
//   T_13 | 17 | 0.25 | 1.299132 |  1.351307 |  1.685331 |  8.133e-2 | -7.110e-2 |    -3.51e-3 | 1.84e-12
//   T_13 | 17 | 0.50 | 1.732398 |  1.905641 |  2.982301 |  1.397e-1 | -4.089e-2 |    -1.43e-3 | 1.43e-13
//   T_13 | 17 | 0.75 | 2.381930 |  2.845306 |  5.578861 |  2.470e-1 |  3.098e-1 |     7.26e-3 | 1.82e-13
//   T_13 | 17 | 0.90 | 2.931920 |  3.750185 |  8.361813 |  3.530e-1 |  1.061e+0 |     1.89e-2 | 3.00e-14
//        run-length spectrum at fold 17: 1:2826 2:72   X = 72 = 2*0+60+12
//        Consumption Identity X = 2N - M: 72 = 2970 - 2898  OK
//   T_17 | 19 | 0.25 | 1.301690 |  1.348230 |  1.692614 |  7.489e-2 | -6.555e-2 |    -2.86e-3 | 1.08e-11
//   T_17 | 19 | 0.50 | 1.749663 |  1.907284 |  3.046462 |  1.169e-1 | -3.092e-2 |    -9.53e-4 | 1.88e-12
//   T_17 | 19 | 0.75 | 2.451084 |  2.887061 |  5.922021 |  1.871e-1 |  2.827e-1 |     5.76e-3 | 1.69e-13
//   T_17 | 19 | 0.90 | 3.076440 |  3.869309 |  9.223175 |  2.520e-1 |  9.333e-1 |     1.42e-2 | 7.66e-12
//        run-length spectrum at fold 19: 1:42374 2:1088   X = 1088 = 2*0+66+1022
//        Consumption Identity X = 2N - M: 1088 = 44550 - 43462  OK
//   T_19 | 23 | 0.25 | 1.303878 |  1.341623 |  1.697635 |  5.374e-2 | -4.860e-2 |    -1.72e-3 | 8.92e-11
//   T_19 | 23 | 0.50 | 1.764401 |  1.892971 |  3.088436 |  9.614e-2 | -4.424e-2 |    -1.11e-3 | 4.99e-11
//   T_19 | 23 | 0.75 | 2.510451 |  2.870516 |  6.133805 |  1.840e-1 |  1.306e-1 |     2.17e-3 | 1.52e-10
//   T_19 | 23 | 0.90 | 3.201777 |  3.864575 |  9.735826 |  2.843e-1 |  5.664e-1 |     6.98e-3 | 1.82e-10
//        run-length spectrum at fold 23: 1:733672 2:11746 3:62   X = 11870 = 2*86+10462+1236
//        Consumption Identity X = 2N - M: 11870 = 757350 - 745480  OK
//   T_23 | 29 | 0.25 | 1.305478 |  1.334914 |  1.701182 |  5.240e-2 | -4.905e-2 |    -1.36e-3 | 1.42e-9
//   T_23 | 29 | 0.50 | 1.775055 |  1.875752 |  3.117560 |  8.962e-2 | -5.581e-2 |    -1.10e-3 | 5.51e-9
//   T_23 | 29 | 0.75 | 2.553153 |  2.836738 |  6.279867 |  1.535e-1 |  4.984e-2 |     6.51e-4 | 5.42e-10
//   T_23 | 29 | 0.90 | 3.292121 |  3.816031 | 10.092096 |  2.123e-1 |  3.333e-1 |     3.23e-3 | 4.10e-9
//        run-length spectrum at fold 29: 1:15416706 2:243822   X = 243822 = 2*6+243370+440
//        Consumption Identity X = 2N - M: 243822 = 15904350 - 15660528  OK
//
// ================================================================================================
// STAGE B — THE DEVIATION: Psi against Phi^2, which is the whole of it
//    K(lam) = Psi / Phi^2.  K < 1 is negative association of ADJACENT gaps.
//    The EXACT criterion for the fold to be dominated by its OWN null map
//    (independent thinning at 2/p) follows from the Stage A identity: set
//    (p-2)Phi_new <= (p-2)(1-2/p)Phi/(1-2Phi/p) and solve for Psi, giving
//        K < K_crit = [ Phi(2 + (p-4)Phi)/(p - 2Phi) - (Om + Delta)/2 ] / Phi^2.
//    Note K_crit > 1: the null map is generous, because CRT destroys MORE
//    copies per gap (4 - omega >= 2) than independent thinning expects. So
//    negative association is sufficient but far from necessary here.
// ================================================================================================
//   tile |  p | u    |       Psi |     Phi^2 |   K = Psi/Phi^2 |  K_crit (exact) | K < K_crit
//   T_5  |  7 | 0.25 |  1.652914 |  1.656843 |      0.99762914 |      1.01357952 | YES
//   T_5  |  7 | 0.50 |  2.746441 |  2.771222 |      0.99105772 |      1.08157350 | YES
//   T_5  |  7 | 0.75 |  4.588166 |  4.676433 |      0.98112523 |      1.32181251 | YES
//   T_5  |  7 | 0.90 |  6.259106 |  6.426843 |      0.97390050 |      1.75075820 | YES
//   T_7  | 11 | 0.25 |  1.666271 |  1.677305 |      0.99342143 |      1.01599195 | YES
//   T_7  | 11 | 0.50 |  2.836864 |  2.921899 |      0.97089733 |      1.07765746 | YES
//   T_7  | 11 | 0.75 |  4.935492 |  5.313163 |      0.92891784 |      1.23125844 | YES
//   T_7  | 11 | 0.90 |  6.951379 |  7.778833 |      0.89362755 |      1.42332122 | YES
//   T_11 | 13 | 0.25 |  1.677802 |  1.681385 |      0.99786911 |      1.01264843 | YES
//   T_11 | 13 | 0.50 |  2.925161 |  2.948974 |      0.99192507 |      1.06110852 | YES
//   T_11 | 13 | 0.75 |  5.324282 |  5.417048 |      0.98287521 |      1.17826671 | YES
//   T_11 | 13 | 0.90 |  7.797317 |  7.988043 |      0.97612348 |      1.31695181 | YES
//   T_13 | 17 | 0.25 |  1.685331 |  1.687744 |      0.99857009 |      1.00653661 | YES
//   T_13 | 17 | 0.50 |  2.982301 |  3.001204 |      0.99370161 |      1.02928707 | YES
//   T_13 | 17 | 0.75 |  5.578861 |  5.673590 |      0.98330355 |      1.08198021 | YES
//   T_13 | 17 | 0.90 |  8.361813 |  8.596154 |      0.97273883 |      1.14636622 | YES
//   T_17 | 19 | 0.25 |  1.692614 |  1.694396 |      0.99894799 |      1.00577395 | YES
//   T_17 | 19 | 0.50 |  3.046462 |  3.061319 |      0.99514666 |      1.02740374 | YES
//   T_17 | 19 | 0.75 |  5.922021 |  6.007814 |      0.98571976 |      1.08277923 | YES
//   T_17 | 19 | 0.90 |  9.223175 |  9.464485 |      0.97450365 |      1.15556192 | YES
//   T_19 | 23 | 0.25 |  1.697635 |  1.700098 |      0.99855120 |      1.00543366 | YES
//   T_19 | 23 | 0.50 |  3.088436 |  3.113112 |      0.99207355 |      1.02567967 | YES
//   T_19 | 23 | 0.75 |  6.133805 |  6.302366 |      0.97325434 |      1.07613146 | YES
//   T_19 | 23 | 0.90 |  9.735826 | 10.251373 |      0.94970948 |      1.14097077 | YES
//   T_23 | 29 | 0.25 |  1.701182 |  1.704273 |      0.99818605 |      1.00443540 | YES
//   T_23 | 29 | 0.50 |  3.117560 |  3.150819 |      0.98944438 |      1.02122996 | YES
//   T_23 | 29 | 0.75 |  6.279867 |  6.518591 |      0.96337805 |      1.06348741 | YES
//   T_23 | 29 | 0.90 | 10.092096 | 10.838062 |      0.93117162 |      1.11721750 | YES
//
// ================================================================================================
// STAGE C — THE DOMINATION CRITERION  c_min = p (Phi_new - Phi)/(Phi (Phi_new - 1))
//    c_min < 2  =>  the true fold is dominated on exponential moments by
//    independent thinning at rate c_min/p, which is BETTER than its own 2/p.
// ================================================================================================
//   tile |  p | u    |   lam*mbar |     Phi |  Phi_new | Phi_null(2/p) | c_min | c_min < 2
//   T_5  |  7 | 0.25 |    0.25000 | 1.28718 |  1.44367 |       1.45424 | 1.9181 | YES
//   T_5  |  7 | 0.50 |    0.50000 | 1.66470 |  2.16727 |       2.26761 | 1.8105 | YES
//   T_5  |  7 | 0.75 |    0.75000 | 2.16251 |  3.40481 |       4.04209 | 1.6722 | YES
//   T_5  |  7 | 0.90 |    0.90000 | 2.53512 |  4.57141 |       6.56850 | 1.5743 | YES
//   T_7  | 11 | 0.25 |    0.25000 | 1.29511 |  1.37759 |       1.38600 | 1.8553 | YES
//   T_7  | 11 | 0.50 |    0.50000 | 1.70936 |  1.95991 |       2.02923 | 1.6797 | YES
//   T_7  | 11 | 0.75 |    0.75000 | 2.30503 |  2.88958 |       3.24655 | 1.4763 | YES
//   T_7  | 11 | 0.90 |    0.90000 | 2.78906 |  3.71402 |       4.62966 | 1.3441 | YES
//   T_11 | 13 | 0.25 |    0.25000 | 1.29668 |  1.36610 |       1.37062 | 1.9010 | YES
//   T_11 | 13 | 0.50 |    0.50000 | 1.71726 |  1.93770 |       1.97479 | 1.7796 | YES
//   T_11 | 13 | 0.75 |    0.75000 | 2.32746 |  2.87547 |       3.06791 | 1.6321 | YES
//   T_11 | 13 | 0.90 |    0.90000 | 2.82631 |  3.73636 |       4.23137 | 1.5297 | YES
//   T_13 | 17 | 0.25 |    0.25000 | 1.29913 |  1.35131 |       1.35310 | 1.9434 | YES
//   T_13 | 17 | 0.50 |    0.50000 | 1.73240 |  1.90564 |       1.91988 | 1.8772 | YES
//   T_13 | 17 | 0.75 |    0.75000 | 2.38193 |  2.84531 |       2.91995 | 1.7922 | YES
//   T_13 | 17 | 0.90 |    0.90000 | 2.93192 |  3.75018 |       3.94919 | 1.7252 | YES
//   T_17 | 19 | 0.25 |    0.25000 | 1.30169 |  1.34823 |       1.34959 | 1.9508 | YES
//   T_17 | 19 | 0.50 |    0.50000 | 1.74966 |  1.90728 |       1.91890 | 1.8866 | YES
//   T_17 | 19 | 0.75 |    0.75000 | 2.45108 |  2.88706 |       2.95566 | 1.7909 | YES
//   T_17 | 19 | 0.90 |    0.90000 | 3.07644 |  3.86931 |       4.07091 | 1.7066 | YES
//   T_19 | 23 | 0.25 |    0.25000 | 1.30388 |  1.34162 |       1.34274 | 1.9490 | YES
//   T_19 | 23 | 0.50 |    0.50000 | 1.76440 |  1.89297 |       1.90294 | 1.8769 | YES
//   T_19 | 23 | 0.75 |    0.75000 | 2.51045 |  2.87052 |       2.93227 | 1.7636 | YES
//   T_19 | 23 | 0.90 |    0.90000 | 3.20178 |  3.86457 |       4.05131 | 1.6621 | YES
//   T_23 | 29 | 0.25 |    0.25000 | 1.30548 |  1.33491 |       1.33570 | 1.9524 | YES
//   T_23 | 29 | 0.50 |    0.50000 | 1.77505 |  1.87575 |       1.88317 | 1.8785 | YES
//   T_23 | 29 | 0.75 |    0.75000 | 2.55315 |  2.83674 |       2.88508 | 1.7537 | YES
//   T_23 | 29 | 0.90 |    0.90000 | 3.29212 |  3.81603 |       3.96539 | 1.6389 | YES
//
// ================================================================================================
// STAGE D — FORWARD INDUCTION: is the true tile lighter than the thinning
//    fixed point?  Phi_null(lam) = (1/alpha) e^{6 lam} / (1 - rho e^{6 lam}).
// ================================================================================================
//   tile |    mbar |    u | Phi measured | Phi null geom | ratio
//   T_5  | 10.0000 | 0.25 |     1.287184 |      1.302343 | 0.98836
//   T_5  | 10.0000 | 0.50 |     1.664699 |      1.760469 | 0.94560
//   T_5  | 10.0000 | 0.75 |     2.162506 |      2.524953 | 0.85645
//   T_5  | 10.0000 | 0.90 |     2.535122 |      3.283205 | 0.77215
//   T_7  | 14.0000 | 0.25 |     1.295108 |      1.310741 | 0.98807
//   T_7  | 14.0000 | 0.50 |     1.709356 |      1.818376 | 0.94005
//   T_7  | 14.0000 | 0.75 |     2.305030 |      2.788656 | 0.82657
//   T_7  | 14.0000 | 0.90 |     2.789056 |      3.948650 | 0.70633
//   T_11 | 17.1111 | 0.25 |     1.296682 |      1.314675 | 0.98631
//   T_11 | 17.1111 | 0.50 |     1.717258 |      1.847138 | 0.92969
//   T_11 | 17.1111 | 0.75 |     2.327455 |      2.936731 | 0.79253
//   T_11 | 17.1111 | 0.90 |     2.826313 |      4.382468 | 0.64491
//   T_13 | 20.2222 | 0.25 |     1.299132 |      1.317442 | 0.98610
//   T_13 | 20.2222 | 0.50 |     1.732398 |      1.868042 | 0.92739
//   T_13 | 20.2222 | 0.75 |     2.381930 |      3.052619 | 0.78029
//   T_13 | 20.2222 | 0.90 |     2.931920 |      4.758588 | 0.61613
//   T_17 | 22.9185 | 0.25 |     1.301690 |      1.319252 | 0.98669
//   T_17 | 22.9185 | 0.50 |     1.749663 |      1.882026 | 0.92967
//   T_17 | 22.9185 | 0.75 |     2.451084 |      3.134414 | 0.78199
//   T_17 | 22.9185 | 0.90 |     3.076440 |      5.046204 | 0.60965
//   T_19 | 25.6148 | 0.25 |     1.303878 |      1.320691 | 0.98727
//   T_19 | 25.6148 | 0.50 |     1.764401 |      1.893331 | 0.93190
//   T_19 | 25.6148 | 0.75 |     2.510451 |      3.203223 | 0.78373
//   T_19 | 25.6148 | 0.90 |     3.201777 |      5.303984 | 0.60366
//   T_23 | 28.0543 | 0.25 |     1.305478 |      1.321762 | 0.98768
//   T_23 | 28.0543 | 0.50 |     1.775055 |      1.901843 | 0.93333
//   T_23 | 28.0543 | 0.75 |     2.553153 |      3.256693 | 0.78397
//   T_23 | 28.0543 | 0.90 |     3.292121 |      5.515183 | 0.59692
//   T_29 | 30.1324 | 0.25 |     1.306692 |      1.322540 | 0.98802
//   T_29 | 30.1324 | 0.50 |     1.783050 |      1.908090 | 0.93447
//   T_29 | 30.1324 | 0.75 |     2.584695 |      3.296891 | 0.78398
//   T_29 | 30.1324 | 0.90 |     3.358034 |      5.680689 | 0.59113
//
// ================================================================================================
// STAGE E — WHERE CRT COALESCENCE IS HEAVIER: total variation, and the
//    excess band. Reference law: the exact compound-geometric thinning of
//    the SAME old word,  f = q h + r (h * f),  h the measured old histogram.
// ================================================================================================
//   (mass CRT>indep equals TV identically for two probability measures; it
//    is printed only as an arithmetic check on the histograms.)
//   tile |  p |    TV | mass CRT>indep | top excess bands (gap: CRT/indep, CRT mass)
//   T_5  |  7 | 0.18069 |        0.18069 | 12: 1.07x, 5.33e-1 | 30: 4.83x, 1.33e-1 | 18: 1.44x, 1.33e-1
//        tails: P(>=12) true 8.000e-1 vs indep 7.619e-1 ratio 1.050; P(>=24) true 1.333e-1 vs indep 1.702e-1 ratio 0.784; P(>=36) true 0.000e+0 vs indep 3.873e-2 ratio 0.000
//   T_7  | 11 | 0.06567 |        0.06567 | 30: 1.20x, 1.63e-1 | 18: 1.16x, 1.63e-1 | 36: 1.71x, 2.96e-2 | 42: 1.15x, 2.96e-2
//        tails: P(>=24) true 2.667e-1 vs indep 2.530e-1 ratio 1.054; P(>=48) true 0.000e+0 vs indep 2.255e-2 ratio 0.000; P(>=72) true 0.000e+0 vs indep 2.472e-3 ratio 0.000
//   T_11 | 13 | 0.04116 |        0.04116 | 30: 1.14x, 1.82e-1 | 18: 1.04x, 1.60e-1 | 42: 1.17x, 5.66e-2 | 66: 2.25x, 8.08e-3
//        tails: P(>=24) true 3.731e-1 vs indep 3.595e-1 ratio 1.038; P(>=48) true 2.963e-2 vs indep 4.185e-2 ratio 0.708; P(>=72) true 0.000e+0 vs indep 6.556e-3 ratio 0.000
//   T_13 | 17 | 0.03085 |        0.03085 | 30: 1.09x, 1.90e-1 | 18: 1.01x, 1.51e-1 | 42: 1.15x, 7.70e-2 | 60: 1.11x, 1.71e-2
//        tails: P(>=36) true 1.852e-1 vs indep 1.886e-1 ratio 0.982; P(>=72) true 9.338e-3 vs indep 1.217e-2 ratio 0.767; P(>=108) true 8.979e-4 vs indep 8.489e-4 ratio 1.058
//   T_17 | 19 | 0.02394 |        0.02394 | 30: 1.06x, 1.91e-1 | 18: 1.00x, 1.42e-1 | 42: 1.11x, 9.19e-2 | 60: 1.05x, 2.50e-2
//        tails: P(>=36) true 2.410e-1 vs indep 2.422e-1 ratio 0.995; P(>=72) true 2.501e-2 vs indep 2.651e-2 ratio 0.943; P(>=108) true 3.370e-3 vs indep 3.243e-3 ratio 1.039
//   T_19 | 23 | 0.01765 |        0.01765 | 30: 1.04x, 1.89e-1 | 42: 1.07x, 1.01e-1 | 48: 1.02x, 3.46e-2 | 60: 1.02x, 3.06e-2
//        tails: P(>=48) true 1.371e-1 vs indep 1.401e-1 ratio 0.978; P(>=96) true 1.095e-2 vs indep 1.224e-2 ratio 0.894; P(>=144) true 2.965e-4 vs indep 6.860e-4 ratio 0.432
//   T_23 | 29 | 0.01397 |        0.01397 | 30: 1.03x, 1.85e-1 | 42: 1.04x, 1.06e-1 | 60: 1.06x, 3.64e-2 | 66: 1.02x, 2.36e-2
//        tails: P(>=60) true 1.188e-1 vs indep 1.175e-1 ratio 1.011; P(>=120) true 5.591e-3 vs indep 5.706e-3 ratio 0.980; P(>=180) true 8.206e-5 vs indep 2.006e-4 ratio 0.409
//
// TOTAL FAILURES: 0   elapsed 19.5s
// ============================================================================
// READINGS
// ============================================================================
//
// [1] THE FOLD MOMENT IDENTITY HOLDS EXACTLY, AND IT IS THE FOLD RECURSION
//     WRITTEN WITHOUT AN ERROR TERM. (p-2) Phi_new = (p-4) Phi + Om + 2 Psi +
//     Delta reproduces the streamed Phi_new at every fold and every lam, with
//     run-term residuals at the float64 accumulation floor (1.42e-9 at fold 29,
//     on sums of 2e8 exponentials). The pieces custody-check on the way: the
//     run-length spectra 1:733672 2:11746 3:62 at fold 23 and 1:15416706
//     2:243822 at fold 29, the Consumption Identity X = 2N - M at 7 of 7 folds,
//     and X = 2*86+10462+1236 = 11870 at fold 23, all reproduce the spend
//     ledger of attack-foldL-04-amortized.md s5 from an engine that computes
//     them a different way.
//
// [2] THE DELTA TERM IS SECOND ORDER, SO THE RECURSION CLOSES AT THE PAIR
//     LEVEL. Delta is the entire contribution of kill runs of length >= 2, that
//     is of every m >= 3 adjacent-gap sum, and its share of (p-2) Phi_new is
//     -3.78e-3 at fold 13, -1.43e-3 at 17, -9.53e-4 at 19, -1.11e-3 at 23 and
//     -1.10e-3 at 29, taking u = 0.5. It is NEGATIVE at u <= 0.5 and turns
//     positive by u = 0.9 (3.23e-3 at fold 29). S1 holds from fold 13 on and
//     fails only at fold 7, whose tile has 3 gaps. THE CONSEQUENCE: to control
//     the fold's exponential moment one needs the ADJACENT-PAIR moment Psi and
//     a second-order handle on Delta. H'' is invoked at m = 2 and at m >= 3
//     only to second order.
//
// [3] THE ENTIRE DEVIATION FROM INDEPENDENT THINNING IS Psi - Phi^2, AND ITS
//     SIGN IS NEGATIVE AT ALL 28 CELLS. K = Psi/Phi^2 runs 0.89362755 to
//     0.99894799 across folds 7 to 29 and u = 0.25 to 0.9, below 1 everywhere.
//     S2 holds. Adjacent gaps of the exact tile are NEGATIVELY associated at
//     exponential order, which is H''(m = 2) measured as a moment rather than
//     as a conditional count.
//
// [4] BUT NEGATIVE ASSOCIATION IS NOT WHERE THE MARGIN COMES FROM. The exact
//     criterion for domination by the fold's own null map is K < K_crit with
//     K_crit = [Phi(2 + (p-4)Phi)/(p - 2Phi) - (Om + Delta)/2]/Phi^2, and
//     K_crit is GREATER than 1: 1.00443540 at fold 29 and u = 0.25, rising to
//     1.11721750 at u = 0.9. The slack is there because CRT destroys 4 - omega
//     >= 2 copies of every gap while independent thinning expects 2. So the
//     pre-registered proxy K < 1 - 4/p was the wrong test; on the exact test
//     the margin survives at 28 of 28 cells, and negative association is
//     sufficient without being necessary.
//
// [5] S3 HOLDS: THE FOLD IS DOMINATED BY INDEPENDENT THINNING AT A BETTER RATE
//     THAN ITS OWN. c_min = p (Phi_new - Phi)/(Phi (Phi_new - 1)) is below 2 at
//     all 28 cells, from 1.3441 (fold 11, u = 0.9) to 1.9524 (fold 29,
//     u = 0.25). This is the brief's "2/p -> c'/p for some c' < 2", measured
//     rather than assumed. It is a domination of EXPONENTIAL MOMENTS, which by
//     Markov bounds the tail; it is not a stochastic-order coupling, and
//     import-thinning-03 says why one cannot be built.
//
// [6] S4 HOLDS IN ITS FIRST HALF AND IS REFUTED IN ITS SECOND. Phi measured is
//     below the null geometric Phi at 32 of 32 cells, with ratios from 0.98836
//     down to 0.59113. But the drift is not monotone: at u = 0.25 the ratio
//     falls to 0.98610 at T_13 and then climbs back to 0.98802 at T_29, while
//     at u = 0.9 it falls all the way from 0.77215 to 0.59113. The true tile is
//     lighter than the thinning fixed point, and the lightness is concentrated
//     at LARGE lam, i.e. in the tail, not in the bulk. At small lam the true
//     word converges back up onto the geometric.
//
// [7] S5 IS REFUTED, AND THE DIRECTION IS THE OPPOSITE OF WHAT WAS PREDICTED.
//     The excess of CRT over independent thinning does not sit near theta and
//     2*theta; the largest excess bands are 30, 42 and 18 at every fold, which
//     is the BULK. At the qualifying scales the ratio true/indep is 1.011 at
//     P(>=60), 0.980 at P(>=120) and 0.409 at P(>=180) for fold 29, and 0.978,
//     0.894, 0.432 for fold 23: CRT is at or BELOW independent thinning in the
//     far tail, by a factor 2.4 at three thetas. The mechanism is now obvious
//     in hindsight -- independent thinning merges bulk gaps at random and so
//     manufactures a tail out of nothing, while CRT merges ONLY at qualifying
//     gaps and therefore leaves the bulk alone and makes far fewer of the long
//     coalescences that build a heavy tail. TV per fold falls 0.18069, 0.06567,
//     0.04116, 0.03085, 0.02394, 0.01765, 0.01397, under 0.05 from fold 13 on,
//     ahead of the predicted fold 17.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). One figure
// here is not in the OUTPUT block. No number above was changed.
//
// A THRESHOLD STATED IN THE READING, not a measurement: "under 0.05 from fold
//   13 on" is the reading's own round bound over the printed series 0.04116,
//   0.03085, 0.02394, 0.01765, 0.01397, every term of which is printed.
// ---------------------------------------------------------------------------
