// ============================================================================
// REDTEAM 0828 — INDEPENDENT RE-DERIVATIONS FOR THE SIX 2026-08-28 NOTES
// ============================================================================
// Companion producer for research/history/staging/redteam-0828-litimports.md.
// SCRATCHPAD-GRADE. Nothing here is a proof; every number is a measurement or
// an exact finite evaluation, and each PART names what it is attacking.
//
// Written to share NO code with the producers under audit. The record-process
// null is re-implemented from the Kourbatov-Wolf definition with a different
// RNG (sfc32, not mulberry32), a different seed family, a different block
// discretisation, and a different record-detection loop. The pair-correlation
// factors are re-derived by brute-force residue counting, not read off
// variance-note.md Theorem 1. The floor identities are re-checked in BigInt on
// an independently enumerated branch/prime list.
//
//   node research/history/staging/redteam-0828-litimports.js
// ============================================================================
'use strict';
const fs = require('fs'), path = require('path');
const T0 = Date.now();
const C2 = 0.6601618158468696;
const F = (x, d) => Number(x).toFixed(d);
const log = (s) => console.log(s);
const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
const sd = (a) => { const m = mean(a); return Math.sqrt(mean(a.map(x => (x - m) * (x - m)))); };
const med = (a) => { const s = a.slice().sort((p, q) => p - q); const n = s.length;
  return n % 2 ? s[(n - 1) / 2] : 0.5 * (s[n / 2 - 1] + s[n / 2]); };

// --- my own RNG: sfc32, seeded from a string, NOT the producers' mulberry32 --
function sfc32(a, b, c, d) {
  return function () {
    a |= 0; b |= 0; c |= 0; d |= 0;
    const t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11); c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}
function seeded(tag, k) {
  let h1 = 0x9e3779b9 ^ k, h2 = 0x85ebca6b, h3 = 0xc2b2ae35, h4 = 0x27d4eb2f ^ (k * 2654435761);
  for (let i = 0; i < tag.length; i++) {
    const ch = tag.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2246822519); h2 = Math.imul(h2 ^ ch, 3266489917);
    h3 = Math.imul(h3 ^ ch, 668265263);  h4 = Math.imul(h4 ^ ch, 374761393);
  }
  const r = sfc32(h1, h2, h3, h4);
  for (let i = 0; i < 20; i++) r();
  return r;
}

log('REDTEAM 0828 — independent re-derivations. SCRATCHPAD-GRADE.');
log('');

// ============================================================================
// PART A. THE RECORD LADDER, PARSED INDEPENDENTLY
// ============================================================================
const LSRC = fs.readFileSync(path.join(__dirname, '..', '..', 'a113274-gap-records.js'), 'utf8');
function grab(name) {
  const m = LSRC.match(new RegExp('\\b' + name + '\\s*=\\s*\\[([\\s\\S]*?)\\]'));
  if (!m) throw new Error('array ' + name + ' not found');
  return m[1].match(/\d+/g).map(s => Number(s));
}
const GAP = grab('GAP'), START = grab('START');
if (GAP.length !== 82 || START.length !== 82) throw new Error('ladder length');
// zonegap-03 convention: E = greater member of the ending pair
const E = START.map((s, i) => s + GAP[i] + 2);
// Kourbatov convention: index by the LESSER prime of the ending pair
const P_K = START.map((s, i) => s + GAP[i]);

const abar = (x) => Math.log(x) * Math.log(x) / (2 * C2);
const trend = (x) => abar(x) * Math.log(x / abar(x));
const zOf = (g, e) => (g - trend(e)) / abar(e);
const loadOf = (g, e) => g / trend(e);

log('PART A. Ladder parsed independently: 82 records, E = START+GAP+2.');
log('  1/(2*C2) = ' + (1 / (2 * C2)).toFixed(16) + '   (Kourbatov a = C_2 log^2 p, C_2 = 0.75739)');
log('  A1. Kourbatov C_2 vs repo 1/(2*C2): agree to ' +
    (Math.abs(1 / (2 * C2) - 0.75739) < 5e-6 ? '5 decimals, the printed precision' : 'DISAGREE'));
log('');

// ============================================================================
// PART B. THE CORRECTED NULL, RE-DERIVED AT 2,000 REPS WITH MY OWN SEED
// ============================================================================
// Kourbatov-Wolf process: consecutive gaps ~ Exp(mean abar(x)), records tracked.
// Exact gap-by-gap to XE; above it, block maxima in ln x. My block scheme uses
// a DIFFERENT bin width and a different Gumbel parameterisation from the
// producer's, so the discretisation is a control rather than a shared step.
function runNull(rnd, XE, XTOP, dLn) {
  const recs = []; let x = 100, rm = 0;
  while (x < XE) {
    const g = -Math.log(1 - rnd()) * abar(x);
    x += g;
    if (g > rm) { rm = g; recs.push({ e: x, g }); }
  }
  for (let L = Math.log(XE); L < Math.log(XTOP); L += dLn) {
    const xl = Math.exp(L), xh = Math.exp(Math.min(L + dLn, Math.log(XTOP)));
    const xm = Math.sqrt(xl * xh);                       // geometric midpoint
    const a = abar(xm), N = (xh - xl) / a;
    if (N < 2) continue;
    let u = rnd(); if (u <= 1e-13) u = 1e-13; if (u >= 1 - 1e-13) u = 1 - 1e-13;
    // max of N iid Exp(1): P(max<=m) = (1-e^-m)^N; invert exactly, not Gumbel.
    // 1 - u^(1/N) = -expm1(ln u / N), computed that way so large N does not
    // round u^(1/N) to 1 and send the draw to infinity.
    const m = -Math.log(-Math.expm1(Math.log(u) / N));
    const g = a * m;
    if (g > rm) { rm = g; recs.push({ e: xm, g }); }
  }
  return recs;
}
const WLO = 1e4, EMAX = E[81];
function statsOn(recs, lo, hi) {
  const w = recs.filter(r => r.e >= lo && r.e <= hi);
  return { n: w.length, A: w.length ? mean(w.map(r => loadOf(r.g, r.e))) : NaN,
           z: w.map(r => zOf(r.g, r.e)), ln: w.map(r => Math.log(r.e)),
           load: w.map(r => loadOf(r.g, r.e)) };
}
const dataAll = statsOn(E.map((e, i) => ({ e, g: GAP[i] })), WLO, EMAX);
log('PART B. THE CORRECTED NULL, re-derived. 2,000 reps, sfc32, my own seeds,');
log('  exact-max inversion instead of the Gumbel form, geometric block centres.');
log('  DATA on [1e4, ' + EMAX.toExponential(2) + ']: n = ' + dataAll.n +
    ', A = ' + F(dataAll.A, 4) + ', z mean = ' + F(mean(dataAll.z), 4) +
    ', z sd = ' + F(sd(dataAll.z), 4) + ', z median = ' + F(med(dataAll.z), 4));

const REPS = 2000;
function ensemble(dLn, tag) {
  const out = [];
  for (let r = 0; r < REPS; r++) out.push(statsOn(runNull(seeded(tag, r), 1e7, EMAX, dLn), WLO, EMAX));
  return out;
}
const ens = ensemble(0.005, 'redteam-0828-A');
const ensFine = ensemble(0.001, 'redteam-0828-B');   // 5x finer blocks: discretisation control
for (const [nm, EN, dl] of [['dLn=0.005', ens, 0.005], ['dLn=0.001 (control)', ensFine, 0.001]]) {
  const A = EN.map(o => o.A), N = EN.map(o => o.n);
  log('  ' + nm.padEnd(20) + ' null A = ' + F(mean(A), 4) + ' +- ' + F(sd(A), 4) +
      ', null N = ' + F(mean(N), 1) + ' +- ' + F(sd(N), 1) +
      ',  N0 z = ' + F((dataAll.A - mean(A)) / sd(A), 2) +
      ',  deficit ' + F(100 * (1 - dataAll.A / mean(A)), 2) + '%');
}
{
  // N1 independence sigma
  const sInd = sd(dataAll.load) / Math.sqrt(dataAll.n);
  const A = ens.map(o => o.A);
  log('  N1. sd(g/T)/sqrt(n) = ' + F(sInd, 5) + ' against ensemble sd ' + F(sd(A), 5) +
      '  ->  ensemble/independence = ' + F(sd(A) / sInd, 3) +
      ', independence z = ' + F((dataAll.A - mean(A)) / sInd, 2));
  // N2 conditional on N
  const N = ens.map(o => o.n), mn = mean(N), ma = mean(A);
  let sxy = 0, sxx = 0;
  for (let i = 0; i < REPS; i++) { sxy += (N[i] - mn) * (A[i] - ma); sxx += (N[i] - mn) ** 2; }
  const b = sxy / sxx, corr = sxy / Math.sqrt(sxx * REPS * sd(A) ** 2);
  const resid = A.map((a, i) => a - (ma + b * (N[i] - mn)));
  const condM = ma + b * (dataAll.n - mn);
  log('  N2. corr(A,N) = ' + F(corr, 3) + ', slope ' + F(b, 5) + '/record, E[A|N=72] = ' +
      F(condM, 4) + ' +- ' + F(sd(resid), 4) + '  ->  deficit ' +
      F(100 * (1 - dataAll.A / condM), 2) + '%, z = ' + F((dataAll.A - condM) / sd(resid), 2));
  // N3 per-height marginal divided out, 15 bins in ln e
  const LO = Math.log(WLO), HI = Math.log(EMAX), NB = 15, WB = (HI - LO) / NB;
  const s = new Array(NB).fill(0), c = new Array(NB).fill(0);
  for (const o of ens) for (let i = 0; i < o.n; i++) {
    const k = Math.min(NB - 1, Math.floor((o.ln[i] - LO) / WB)); s[k] += o.load[i]; c[k]++;
  }
  const mu = s.map((v, i) => v / c[i]);
  const marg = (o) => mean(o.load.map((v, i) =>
    v / mu[Math.min(NB - 1, Math.floor((o.ln[i] - LO) / WB))]));
  const dM = marg(dataAll), nM = ens.map(marg);
  log('  N3. data ' + F(dM, 4) + ' vs null ' + F(mean(nM), 4) + ' +- ' + F(sd(nM), 4) +
      '  ->  deficit ' + F(100 * (1 - dM / mean(nM)), 2) + '%, z = ' +
      F((dM - mean(nM)) / sd(nM), 2) + ', MC tail ' + nM.filter(v => v <= dM).length + '/' + REPS);
  log('  N3 marginals mu(ln e): ' + mu.map(v => F(v, 3)).join(' '));
  log('  B-note. n_eff DEFLATION (n -> n_eff < n) WIDENS sd(g/T)/sqrt(n_eff) and');
  log('    therefore SHRINKS |z|. The independence z above is the UNCORRECTED');
  log('    reading, not a deflated one; deflating N0 cannot reach it.');
}
log('');

// ============================================================================
// PART C. KOURBATOV'S b — THE FOUR-DIGIT MATCH, AND THE TWO ESTIMATORS
// ============================================================================
log('PART C. Kourbatov b. Median-unbiased b = -median(g*) by his footnote 5.');
{
  const rows = E.map((e, i) => ({ e, p: P_K[i], g: GAP[i] }));
  const cut = (lo, hi, key) => rows.filter(r => r[key] >= lo && r[key] < hi);
  for (const [tag, set] of [
    ['e < 1e15 (repo index)', cut(0, 1e15, 'e')],
    ['p < 1e15 (Kourbatov index)', cut(0, 1e15, 'p')],
    ['e in [1e4, 1e15)', cut(1e4, 1e15, 'e')],
  ]) {
    const z = set.map(r => zOf(r.g, r.e));
    log('  ' + tag.padEnd(28) + ' n = ' + String(z.length).padStart(3) +
        '  median z = ' + F(med(z), 4) + '  -> b = ' + F(-med(z), 4) +
        '   mean z = ' + F(mean(z), 4));
  }
  // cut sensitivity
  log('  cut sensitivity of median z (repo index e):');
  for (const c of [1e14, 5e14, 1e15, 2e15, 1e16, EMAX]) {
    const z = rows.filter(r => r.e < c).map(r => zOf(r.g, r.e));
    log('    e < ' + c.toExponential(0).padEnd(6) + '  n = ' + String(z.length).padStart(3) +
        '  median z = ' + F(med(z), 4));
  }
  const z15 = rows.filter(r => r.e < 1e15).map(r => zOf(r.g, r.e)).sort((a, b) => a - b);
  log('  order statistics around the 1e15 median (n = ' + z15.length + '): ' +
      z15.slice(33, 38).map(v => F(v, 4)).join('  '));

  // THE TWO ESTIMATORS OF b ON THE SAME WINDOW
  const win = rows.filter(r => r.e >= WLO && r.e <= EMAX);
  const Lk = win.map(r => Math.log(r.e / abar(r.e)));
  const invL = mean(Lk.map(v => 1 / v));
  const A = mean(win.map(r => loadOf(r.g, r.e)));
  const bFromA = (1 - A) / invL;
  const bFromZmean = -mean(win.map(r => zOf(r.g, r.e)));
  log('  C2. TWO ESTIMATORS OF b ON [1e4, EMAX], n = ' + win.length + ':');
  log('     mean(1/L_k) = ' + F(invL, 5));
  log('     b from A   (A(b) = 1 - b*mean(1/L)):  ' + F(bFromA, 4));
  log('     b from mean z:                        ' + F(bFromZmean, 4));
  log('     b from median z:                      ' + F(-med(win.map(r => zOf(r.g, r.e))), 4));
  log('     ratio (z-mean b)/(A b) = ' + F(bFromZmean / bFromA, 3) +
      '  -> the A-normalisation and the z-normalisation do NOT');
  log('     estimate the same number on this ladder; the A route reads ' +
      F(bFromA, 3) + ', close to the b ~ 2/k = 1 default.');
  // reproduce the note's A(b) table
  log('  C3. A(b) table re-derived (A_null = 0.9895 cited, not recomputed):');
  for (const bv of [1, 1.0818, 1.2597]) {
    const Ab = 1 - bv * invL;
    log('     b = ' + String(bv).padEnd(7) + ' A(b) = ' + F(Ab, 4) +
        '  deficit vs 0.9895 = ' + F(100 * (1 - Ab / 0.9895), 2) + '%');
  }
  log('     data A = ' + F(A, 4) + '  deficit = ' + F(100 * (1 - A / 0.9895), 2) + '%');
}
log('');

// ============================================================================
// PART D. THE PAIR CORRELATION g(d), DERIVED FROM RESIDUE COUNTING
// ============================================================================
// A twin slot at n needs n and n+2 coprime to every p <= x. Two slots at
// distance d need n, n+2, n+d, n+d+2 all coprime to every p <= x. Counting
// residue classes directly gives both densities with no appeal to any repo
// theorem.
function primesTo(N) {
  const s = new Uint8Array(N + 1), out = [];
  for (let i = 2; i <= N; i++) { if (!s[i]) { out.push(i); for (let j = i * i; j <= N; j += i) s[j] = 1; } }
  return out;
}
const PR = primesTo(1000003);
function classesExcluded(p, offs) {
  const seen = new Set();
  for (const o of offs) seen.add(((-o) % p + p) % p);
  return seen.size;
}
function gDirect(d, x) {                       // brute residue count, no formula
  let g = 1;
  for (const p of PR) {
    if (p > x) break;
    const c1 = p - classesExcluded(p, [0, 2]);
    const c2 = p - classesExcluded(p, [0, 2, d, d + 2]);
    if (c2 === 0) return 0;
    g *= (c2 * p) / (c1 * c1);
  }
  return g;
}
// same count, no Set allocation: for the exhaustive sweep only
function gFast(d, plist, c1) {
  let g = 1;
  for (let i = 0; i < plist.length; i++) {
    const p = plist[i];
    const a = 0, b = ((-2) % p + p) % p, c = ((-d) % p + p) % p, e = ((-d - 2) % p + p) % p;
    let n = 1;
    if (b !== a) n++;
    if (c !== a && c !== b) n++;
    if (e !== a && e !== b && e !== c) n++;
    const c2 = p - n;
    if (c2 === 0) return 0;
    g *= (c2 * p) / (c1[i] * c1[i]);
  }
  return g;
}
const gRow15 = (x) => { let v = 6; for (const p of PR) { if (p > x) break; if (p >= 5) v *= (1 - 4 / p) / (1 - 2 / p) ** 2; } return v; };
const gRep   = (x) => { let v = 6; for (const p of PR) { if (p > x) break; if (p >= 5) v *= (1 - 4 / ((p - 2) * (p - 2))); } return v; };
log('PART D. g(d) from residue counting. The two published closed forms are');
log('  algebraically identical: (1-4/p)/(1-2/p)^2 = p(p-4)/(p-2)^2 = 1-4/(p-2)^2.');
log('   x     g(6) direct      row15 form      repulsive form   max abs diff');
let worst = 0;
for (const x of [5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 101, 1009]) {
  const a = gDirect(6, x), b = gRow15(x), c = gRep(x);
  worst = Math.max(worst, Math.abs(a - b), Math.abs(b - c));
  log('  ' + String(x).padStart(4) + '   ' + F(a, 9).padStart(12) + '   ' + F(b, 9).padStart(14) +
      '   ' + F(c, 9).padStart(14) + '   ' + (Math.max(Math.abs(a - b), Math.abs(b - c))).toExponential(1));
}
log('  worst disagreement over the twelve levels: ' + worst.toExponential(1));
log('  D2. g(2) = ' + gDirect(2, 1009) + ' (mod 3: n=2, n+2=1, n+4=0 -> forced)');
log('  D3. support. g(d) != 0 for d in 1..60 at x = 1009: ' +
    Array.from({ length: 60 }, (_, i) => i + 1).filter(d => gDirect(d, 1009) > 0).join(','));
{
  let inf = 6; for (const p of PR) if (p >= 5) inf *= (1 - 4 / ((p - 2) * (p - 2)));
  log('  D4. 6*prod_{5<=p<=1e6}(1-4/(p-2)^2) = ' + F(inf, 7) +
      '   (note claims 2.3812822 to p <= 1e7)');
  // exhaustive minimum over the support at a deep level
  const x = 1009; let mn = Infinity, mnd = 0, mx = 0, mxd = 0, inOpen = 0;
  const pl = PR.filter(p => p <= x), c1 = pl.map(p => p - classesExcluded(p, [0, 2]));
  for (let d = 6; d <= 2000000; d += 6) {
    const g = gFast(d, pl, c1);
    if (g > 0 && g < 1) inOpen++;
    if (g < mn) { mn = g; mnd = d; }
    if (g > mx) { mx = g; mxd = d; }
  }
  log('  D5. exhaustive over 6 | d, d <= 2e6, x = 1009: min ' + F(mn, 6) + ' at d = ' + mnd +
      ', max ' + F(mx, 4) + ' at d = ' + mxd + ', values in (0,1): ' + inOpen);
  log('     PROOF the enumeration only illustrates: every p >= 5 factor is one of');
  log('     p/(p-2) > 1, p(p-3)/(p-2)^2 = 1 + (p-4)/(p-2)^2 >= 1, or 1-4/(p-2)^2 < 1,');
  log('     so g(d) >= 6*prod(1-4/(p-2)^2) on the support, uniformly in the level.');
  // the one-class analogue and the import-map-construction formula
  let bad = 1, good = 2;
  for (const p of PR) { if (p > 11) break; bad *= (1 - 2 / p) / (1 - 1 / p) ** 2; }
  for (const p of PR) { if (p > 11) break; if (p > 2) good *= (1 - 1 / ((p - 1) * (p - 1))); }
  log('  D6. import-map-construction §1 product as literally written, x = 11: ' + F(bad, 6) +
      '   (p = 2 factor is 1 - 2/2 = 0)');
  log('     the correct one-class value g1(2) = 2*prod_{2<p<=11}(1-1/(p-1)^2) = ' + F(good, 6));
}
log('');

// ============================================================================
// PART E. THE FLOOR IDENTITIES OF ROW 15 / IMPORT-FRACPARTS, RE-DERIVED
// ============================================================================
log('PART E. Floor identities, BigInt, independently enumerated.');
{
  const lvl = 17;
  const base = PR.filter(p => p <= lvl);
  let W = 1n; for (const p of base) W *= BigInt(p);
  const sq = (n) => { let a = n, b = (n + 1n) / 2n; while (b < a) { a = b; b = (b + n / b) / 2n; } return a; };
  const rootW = sq(W);
  const scour = PR.filter(p => p > lvl && BigInt(p) <= rootW);
  // branch moduli: 30 * product over subsets of {7,...,lvl}
  const rest = base.filter(p => p >= 7);
  const subsets = [];
  for (let m = 0; m < (1 << rest.length); m++) {
    let Mv = 30n; for (let i = 0; i < rest.length; i++) if (m & (1 << i)) Mv *= BigInt(rest[i]);
    subsets.push(Mv);
  }
  let bad1 = 0, bad2 = 0, bad3 = 0, pairs = 0, covered = 0, sub = 0;
  for (const M of subsets) {
    if (M <= rootW) covered++;
    for (const q of scour) {
      const Q = BigInt(q); pairs++;
      const Wp = W / M;                                   // W' = W/M, integer
      const floorWq = W / Q;
      // (i) floor(W/q) === floor(M*{W'/q}) (mod M)
      const r = Wp % Q;
      if (((floorWq % M) + M) % M !== (M * r) / Q) bad1++;
      // (ii) M > lB  <=>  floor(W/q) < M  <=>  q > W'
      const lB = (W + 1n) / Q;
      const a = M > lB, b = floorWq < M, c = Q > Wp;
      if (a !== b || b !== c) bad2++;
      // (iii) M <= sqrt(W) implies M <= lB
      if (M <= rootW) { sub++; if (!(M <= lB)) bad3++; }
    }
  }
  log('  @' + lvl + ': W = ' + W + ', floor(sqrt W) = ' + rootW + ', ' + subsets.length +
      ' branches, ' + scour.length + ' scour primes, ' + pairs + ' pairs.');
  log('  E1. floor(W/q) = floor(M*{W\'/q}) mod M : exceptions ' + bad1 + '/' + pairs);
  log('  E2. M > lB  <=>  floor(W/q) < M  <=>  q > W\' : exceptions ' + bad2 + '/' + pairs);
  log('  E3. {M <= sqrt W} subset {M <= lB} : exceptions ' + bad3 + '/' + sub +
      '  (strict: ' + sub + ' of ' + pairs + ' pairs)');
  log('  E4. branches with M <= sqrt(W): ' + covered + ' of ' + subsets.length);
}
{
  // E5: the coverage counts and the (branch, prime) pair totals, all levels
  log('  E5. coverage condition M_T <= sqrt(W), and pair totals, per level:');
  let tot = 0;
  for (const lvl of [13, 17, 19, 23, 29, 31, 37]) {
    const base = PR.filter(p => p <= lvl);
    let W = 1n; for (const p of base) W *= BigInt(p);
    const sq = (n) => { let a = n, b = (n + 1n) / 2n; while (b < a) { a = b; b = (b + n / b) / 2n; } return a; };
    const rootW = sq(W);
    const nScour = PR.filter(p => p > lvl && BigInt(p) <= rootW).length;
    const rest = base.filter(p => p >= 7);
    let cov = 0, maxCovM = 0n, maxDep = -1;
    for (let m = 0; m < (1 << rest.length); m++) {
      let Mv = 30n, dep = 0;
      for (let i = 0; i < rest.length; i++) if (m & (1 << i)) { Mv *= BigInt(rest[i]); dep++; }
      if (Mv <= rootW) { cov++; if (Mv > maxCovM) maxCovM = Mv; if (dep > maxDep) maxDep = dep; }
    }
    const nb = 1 << rest.length, prs = nb * nScour;
    if (lvl <= 29) tot += prs;
    log('     @' + String(lvl).padEnd(3) + ' branches ' + String(nb).padStart(4) +
        '  covered ' + String(cov).padStart(4) + '  frac ' + F(cov / nb, 3) +
        '  max covered M ' + String(maxCovM).padStart(7) + ' (depth ' + maxDep + ')' +
        '  scour primes ' + String(nScour).padStart(6) + '  pairs ' + String(prs).padStart(8));
  }
  log('     total (branch, scour prime) pairs at @13..@29: ' + tot +
      '   (import-fracparts E3 claims 1,133,872)');
}
log('');

// ============================================================================
// PART F. SAFFARI-VAUGHAN THEOREM 10's RANGE CONDITION, WITH THE PAGE'S 6/11
// ============================================================================
// The page reads x^{6/11+eps} < y <= x (the remark derives 6/11 = c/(c+2) at
// c = 12/5, and says the density hypothesis c = 2 would give 1/2). Both notes
// under audit record 1/11. Under the dictionary x_SV = W/M, y = sqrt(W):
//   upper  y <= x  <=>  M <= sqrt(W)          (unchanged)
//   lower  (W/M)^{6/11+eps} < sqrt(W)  <=>  M > W^{(1 - 11/(12+22 eps))}
//          -> at eps -> 0,  M > W^{1/12}
log('PART F. Theorem 10 range condition at the page exponent 6/11.');
log('  lower condition (W/M)^{6/11} < sqrt(W)  <=>  M > W^{1/12}.');
log('  level        W            sqrt(W)        W^(1/12)   min branch M   binds?');
for (const lvl of [13, 17, 19, 23, 29, 31, 37]) {
  let W = 1; for (const p of PR) { if (p > lvl) break; W *= p; }
  const r = Math.sqrt(W), t = Math.pow(W, 1 / 12);
  log('  @' + String(lvl).padEnd(4) + ' ' + W.toExponential(3).padStart(10) + '   ' +
      r.toExponential(3).padStart(10) + '   ' + F(t, 3).padStart(8) + '        30            ' +
      (30 > t ? 'no' : 'YES'));
}
{
  const lvl = 19; let W = 1; for (const p of PR) { if (p > lvl) break; W *= p; }
  const lw = Math.log(W);
  for (const M of [30, 210, 2310]) {
    const epsMax = 0.5 * lw / (lw - Math.log(M)) - 6 / 11;
    log('  @19, M = ' + String(M).padStart(4) + ': admissible eps < ' + F(epsMax, 4) +
        (epsMax > 0 ? '  (an eps exists)' : '  (NO admissible eps)'));
  }
  log('  Both notes derive "eps < 9/22 = 0.409" (import-fracparts §3) or "eps < 0.39"');
  log('  (row 15 §6(b)) from the 1/11 reading. At 6/11 the margin at M = 30 is ' +
      F(0.5 * lw / (lw - Math.log(30)) - 6 / 11, 4) + '.');
  log('  ASYMPTOTIC CONSEQUENCE, fixed M, W -> infinity: (W/M)^{6/11} / W^{1/2}');
  log('  -> infinity, so the hypothesis FAILS. The fixed-M theorem banked in');
  log('  import-fracparts §6 has no instance at large W.');
}
{
  log('  F2. error-term reach, corrected to exp(-C(log x/log log x)^{1/3}):');
  log('     level   exp((log W)^{1/3})   exp((log W/log log W)^{1/3})');
  for (const lvl of [17, 19, 23, 29, 31, 37]) {
    let W = 1; for (const p of PR) { if (p > lvl) break; W *= p; }
    const lw = Math.log(W), llw = Math.log(lw);
    log('     @' + String(lvl).padEnd(5) + F(Math.exp(Math.pow(lw, 1 / 3)), 2).padStart(12) +
        '        ' + F(Math.exp(Math.pow(lw / llw, 1 / 3)), 2).padStart(10));
  }
  log('     Both columns are below M = 30 at every level: the direction of the');
  log('     note\'s E2 conclusion survives, its magnitudes are ~3x too generous.');
}
log('');

// ============================================================================
// PART G. THE THOMAS WITNESS ARITHMETIC
// ============================================================================
{
  const first8 = [2, 3, 5, 7, 11, 13, 17, 19];
  log('PART G. Thomas Cor 1.2 witness size at l = 4: 2^{l-1} = ' + Math.pow(2, 3) +
      ' distinct primes, smallest product = ' + first8.reduce((a, b) => a * b, 1));
  log('  pi(79) = ' + PR.filter(p => p <= 79).length + ', floor(log2 pi(79)) = ' +
      Math.floor(Math.log2(PR.filter(p => p <= 79).length)));
  log('  2 log2 79 = ' + F(2 * Math.log2(79), 2) + '  (import-vc-nets trivial ceiling 12.61)');
  log('  log2 ln(79^4.2665) = ' + F(Math.log2(Math.log(Math.pow(79, 4.2665))), 2) +
      '  (the lemma\'s 4.22)');
}
log('');
log('done in ' + F((Date.now() - T0) / 1000, 1) + ' s');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0828-litimports.js
//   invocation:  node research/history/staging/redteam-0828-litimports.js
//   code-sha256: 07e47e1f4b23b96d760c3004a50e3a857096ffa4d2410fea7455d7d49edb9d48
//   out-sha256:  7a91e1df5a4e91ad5223e34fe8bd2e0ab7209dfb34495ed28f55a35d8c1a1607
//   body-lines:  121
//   inputs:      research/history@c5b6ecc62124
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     14.6 s
// ============================================================================
// REDTEAM 0828 — independent re-derivations. SCRATCHPAD-GRADE.
//
// PART A. Ladder parsed independently: 82 records, E = START+GAP+2.
//   1/(2*C2) = 0.7573900640687455   (Kourbatov a = C_2 log^2 p, C_2 = 0.75739)
//   A1. Kourbatov C_2 vs repo 1/(2*C2): agree to 5 decimals, the printed precision
//
// PART B. THE CORRECTED NULL, re-derived. 2,000 reps, sfc32, my own seeds,
//   exact-max inversion instead of the Gumbel form, geometric block centres.
//   DATA on [1e4, 7.05e+16]: n = 72, A = 0.9295, z mean = -1.2981, z sd = 1.0213, z median = -1.3159
//   dLn=0.005            null A = 0.9883 +- 0.0174, null N = 68.6 +- 7.6,  N0 z = -3.39,  deficit 5.96%
//   dLn=0.001 (control)  null A = 0.9889 +- 0.0178, null N = 68.5 +- 7.9,  N0 z = -3.35,  deficit 6.01%
//   N1. sd(g/T)/sqrt(n) = 0.00876 against ensemble sd 0.01739  ->  ensemble/independence = 1.985, independence z = -6.72
//   N2. corr(A,N) = -0.699, slope -0.00160/record, E[A|N=72] = 0.9828 +- 0.0124  ->  deficit 5.43%, z = -4.30
//   N3. data 0.9415 vs null 1.0014 +- 0.0176  ->  deficit 5.97%, z = -3.40, MC tail 0/2000
//   N3 marginals mu(ln e): 0.992 0.988 0.985 0.983 0.985 0.984 0.985 0.988 0.987 0.987 0.987 0.988 0.988 0.989 0.988
//   B-note. n_eff DEFLATION (n -> n_eff < n) WIDENS sd(g/T)/sqrt(n_eff) and
//     therefore SHRINKS |z|. The independence z above is the UNCORRECTED
//     reading, not a deflated one; deflating N0 cannot reach it.
//
// PART C. Kourbatov b. Median-unbiased b = -median(g*) by his footnote 5.
//   e < 1e15 (repo index)        n =  71  median z = -1.2597  -> b = 1.2597   mean z = -1.2006
//   p < 1e15 (Kourbatov index)   n =  71  median z = -1.2597  -> b = 1.2597   mean z = -1.2006
//   e in [1e4, 1e15)             n =  61  median z = -1.3980  -> b = 1.3980   mean z = -1.3727
//   cut sensitivity of median z (repo index e):
//     e < 1e+14   n =  65  median z = -1.3090
//     e < 5e+14   n =  70  median z = -1.2607
//     e < 1e+15   n =  71  median z = -1.2597
//     e < 2e+15   n =  73  median z = -1.2597
//     e < 1e+16   n =  75  median z = -1.2118
//     e < 7e+16   n =  81  median z = -1.2118
//   order statistics around the 1e15 median (n = 71): -1.3090  -1.2618  -1.2597  -1.2118  -1.1891
//   C2. TWO ESTIMATORS OF b ON [1e4, EMAX], n = 72:
//      mean(1/L_k) = 0.06269
//      b from A   (A(b) = 1 - b*mean(1/L)):  1.1251
//      b from mean z:                        1.2981
//      b from median z:                      1.3159
//      ratio (z-mean b)/(A b) = 1.154  -> the A-normalisation and the z-normalisation do NOT
//      estimate the same number on this ladder; the A route reads 1.125, close to the b ~ 2/k = 1 default.
//   C3. A(b) table re-derived (A_null = 0.9895 cited, not recomputed):
//      b = 1       A(b) = 0.9373  deficit vs 0.9895 = 5.27%
//      b = 1.0818  A(b) = 0.9322  deficit vs 0.9895 = 5.79%
//      b = 1.2597  A(b) = 0.9210  deficit vs 0.9895 = 6.92%
//      data A = 0.9295  deficit = 6.07%
//
// PART D. g(d) from residue counting. The two published closed forms are
//   algebraically identical: (1-4/p)/(1-2/p)^2 = p(p-4)/(p-2)^2 = 1-4/(p-2)^2.
//    x     g(6) direct      row15 form      repulsive form   max abs diff
//      5    3.333333333      3.333333333      3.333333333   4.4e-16
//      7    2.800000000      2.800000000      2.800000000   0.0e+0
//     11    2.661728395      2.661728395      2.661728395   4.4e-16
//     13    2.573737374      2.573737374      2.573737374   4.4e-16
//     17    2.527982043      2.527982043      2.527982043   4.4e-16
//     19    2.492992672      2.492992672      2.492992672   4.4e-16
//     23    2.470380493      2.470380493      2.470380493   4.4e-16
//     29    2.456825594      2.456825594      2.456825594   4.4e-16
//     31    2.445140335      2.445140335      2.445140335   4.4e-16
//     37    2.437156203      2.437156203      2.437156203   4.4e-16
//    101    2.398088201      2.398088201      2.398088201   1.3e-15
//   1009    2.382485258      2.382485258      2.382485258   4.9e-15
//   worst disagreement over the twelve levels: 4.9e-15
//   D2. g(2) = 0 (mod 3: n=2, n+2=1, n+4=0 -> forced)
//   D3. support. g(d) != 0 for d in 1..60 at x = 1009: 6,12,18,24,30,36,42,48,54,60
//   D4. 6*prod_{5<=p<=1e6}(1-4/(p-2)^2) = 2.3812828   (note claims 2.3812822 to p <= 1e7)
//   D5. exhaustive over 6 | d, d <= 2e6, x = 1009: min 2.382485 at d = 6, max 23.7825 at d = 1021020, values in (0,1): 0
//      PROOF the enumeration only illustrates: every p >= 5 factor is one of
//      p/(p-2) > 1, p(p-3)/(p-2)^2 = 1 + (p-4)/(p-2)^2 >= 1, or 1-4/(p-2)^2 < 1,
//      so g(d) >= 6*prod(1-4/(p-2)^2) on the support, uniformly in the level.
//   D6. import-map-construction §1 product as literally written, x = 11: 0.000000   (p = 2 factor is 1 - 2/2 = 0)
//      the correct one-class value g1(2) = 2*prod_{2<p<=11}(1-1/(p-1)^2) = 1.353516
//
// PART E. Floor identities, BigInt, independently enumerated.
//   @17: W = 510510, floor(sqrt W) = 714, 16 branches, 120 scour primes, 1920 pairs.
//   E1. floor(W/q) = floor(M*{W'/q}) mod M : exceptions 0/1920
//   E2. M > lB  <=>  floor(W/q) < M  <=>  q > W' : exceptions 0/1920
//   E3. {M <= sqrt W} subset {M <= lB} : exceptions 0/600  (strict: 600 of 1920 pairs)
//   E4. branches with M <= sqrt(W): 5 of 16
//   E5. coverage condition M_T <= sqrt(W), and pair totals, per level:
//      @13  branches    8  covered    1  frac 0.125  max covered M      30 (depth 0)  scour primes     34  pairs      272
//      @17  branches   16  covered    5  frac 0.313  max covered M     510 (depth 1)  scour primes    120  pairs     1920
//      @19  branches   32  covered    8  frac 0.250  max covered M    2730 (depth 2)  scour primes    435  pairs    13920
//      @23  branches   64  covered   22  frac 0.344  max covered M   13110 (depth 2)  scour primes   1739  pairs   111296
//      @29  branches  128  covered   40  frac 0.313  max covered M   79170 (depth 3)  scour primes   7863  pairs  1006464
//      @31  branches  256  covered   90  frac 0.352  max covered M  406410 (depth 3)  scour primes  37534  pairs  9608704
//      @37  branches  512  covered  180  frac 0.352  max covered M 2698410 (depth 4)  scour primes  78487  pairs 40185344
//      total (branch, scour prime) pairs at @13..@29: 1133872   (import-fracparts E3 claims 1,133,872)
//
// PART F. Theorem 10 range condition at the page exponent 6/11.
//   lower condition (W/M)^{6/11} < sqrt(W)  <=>  M > W^{1/12}.
//   level        W            sqrt(W)        W^(1/12)   min branch M   binds?
//   @13     3.003e+4     1.733e+2      2.361        30            no
//   @17     5.105e+5     7.145e+2      2.990        30            no
//   @19     9.700e+6     3.114e+3      3.821        30            no
//   @23     2.231e+8     1.494e+4      4.963        30            no
//   @29     6.470e+9     8.043e+4      6.570        30            no
//   @31    2.006e+11     4.478e+5      8.747        30            no
//   @37    7.421e+12     2.724e+6     11.818        30            no
//   @19, M =   30: admissible eps < 0.0886  (an eps exists)
//   @19, M =  210: admissible eps < 0.2035  (an eps exists)
//   @19, M = 2310: admissible eps < 0.4187  (an eps exists)
//   Both notes derive "eps < 9/22 = 0.409" (import-fracparts §3) or "eps < 0.39"
//   (row 15 §6(b)) from the 1/11 reading. At 6/11 the margin at M = 30 is 0.0886.
//   ASYMPTOTIC CONSEQUENCE, fixed M, W -> infinity: (W/M)^{6/11} / W^{1/2}
//   -> infinity, so the hypothesis FAILS. The fixed-M theorem banked in
//   import-fracparts §6 has no instance at large W.
//   F2. error-term reach, corrected to exp(-C(log x/log log x)^{1/3}):
//      level   exp((log W)^{1/3})   exp((log W/log log W)^{1/3})
//      @17          10.59              5.59
//      @19          12.48              6.02
//      @23          14.57              6.47
//      @29          16.89              6.92
//      @31          19.36              7.38
//      @37          22.08              7.85
//      Both columns are below M = 30 at every level: the direction of the
//      note's E2 conclusion survives, its magnitudes are ~3x too generous.
//
// PART G. Thomas Cor 1.2 witness size at l = 4: 2^{l-1} = 8 distinct primes, smallest product = 9699690
//   pi(79) = 22, floor(log2 pi(79)) = 4
//   2 log2 79 = 12.61  (import-vc-nets trivial ceiling 12.61)
//   log2 ln(79^4.2665) = 4.22  (the lemma's 4.22)
//
// done in 14.5 s
// ============================================================================
// READINGS
// ============================================================================
