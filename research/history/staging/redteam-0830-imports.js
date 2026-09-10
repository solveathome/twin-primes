// ============================================================================
// redteam-0830-imports.js — independent re-derivations for redteam-0830-imports.md
// ============================================================================
// ADVERSARIAL. Every number the six 2026-08-30 notes under review put weight on
// is recomputed here on a code path written from the DEFINITIONS in their prose,
// not from their producers. No producer in research/ is required, imported or
// read by this file; the only files it opens are the five recon-0828 notes'
// ledger blocks (PART E), which is a text audit and is labelled so.
//
//  PART A  attack-0830-varE-identification.md, sections 0 and 4.
//          X = sum_{|h|<L} (1-|h|/L)(W(h)-1) split by BRANCH TYPE and by the
//          band n <= 2L, at x = 13 and 17, from the definitions of section 1:
//            W(h) = 6[6|h] f5(h) D_y sum_{n0|h, n+|h-2, n-|h+2} lam0 lam1 lam1.
//          COUNT is built by FACTORING h, h-2, h+2 with a smallest-prime-factor
//          sieve (the note's producer sieves the three residue progressions and
//          carries per-k index lists; this is a different path to the same set).
//          MAIN is built by ENUMERATING every squarefree y-smooth 7-rough
//          n <= 2L first and then splitting each n over the three slots (the
//          note's producer descends over primes); the all-band MAIN uses the
//          closed product form and is checked against the enumeration below 2L.
//          Checks: total REM = the corpus X to 1e-6 relative; MAIN sums to L.
//          Targets under test: the mixed remainder -2.51 (x=13), -3.23 (x=17);
//          its share below 2L 0.844 / 0.826; and the note's "82 %".
//  PART B  recon-0830-rec-killrun.md section 2. omega(u) from the delay
//          equation on an independent grid (Simpson on u omega(u) = 1 + int),
//          the deviation |omega(u)e^gamma - 1|, and the crossing z* solving
//          dev * sqrt(H P(z)) = z^{u/2 - eps} with P by Mertens, by bisection.
//          Targets: 0.8905362 at u=2, log10 z* = 33.53 at (3,0.10) and 68.80
//          at (4,0.10), 33.62 at (4,0.20).
//  PART C  decide-0830-skeleton-door.md SEC B/C at @13 and @17. The branch
//          numerator is evaluated from cap-36's DIRECT definition
//            Snum(F) = L(F(0) + 2 sum_{0<d<lA} G(d)) + 4 sum_{0<=e<lB}(lB-e)G(lA+e),
//          G(d) = Phi_T(q d mod W), NOT from Theorem A's collapsed
//          2 Pa (lA - lB + 2R) + 4B, so the split is independent of the identity
//          the note leans on and tests it at the same time. G30_agg comes from
//          an independent exact-BigInt NUMsk / (IVA+IVB) pass.
//          Targets: closable shares 9.2 % / -0.9 %, G30_agg 0.1113 / 0.1011,
//          closable part of G30_agg 0.0102 / -0.0009, open part 0.1010 / 0.1020.
//  PART D  engine-0830-at43-bigint.md sections 2 and 4. The parity claim that
//          the record's CRT anchor is exact at @43 is stated as a proposition
//          and checked on every scour class at @43 in BigInt (evenness AND the
//          2^54 bound AND double-vs-BigInt agreement, three separate columns);
//          then the same three columns at @47, where the claim must fail, with
//          an explicit witness. The cost arithmetic is redone from the printed
//          inputs, including the ratio the printed medians give.
//  PART E  The five recon-0828 ledger verdict counts, read out of the files.
//
// No wall-clock figure is printed on stdout.
//   node research/history/staging/redteam-0830-imports.js
// ============================================================================
'use strict';
function assert(c, m) { if (!c) throw new Error('ASSERT FAIL: ' + m); }
const f2 = v => v.toFixed(2), f3 = v => v.toFixed(3), f4 = v => v.toFixed(4), f6 = v => v.toFixed(6);
const pad = (s, n) => String(s).padStart(n);
function primesUpTo(n) { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } } return o; }
// Kahan, so a 30-million-term signed sum is not a rounding argument
class Kah { constructor() { this.s = 0; this.c = 0; } add(v) { const y = v - this.c, t = this.s + y; this.c = (t - this.s) - y; this.s = t; } get() { return this.s; } }

// ============================================================================
console.log('=== PART A: the varE mixed remainder, by branch type and by the 2L band, rebuilt ===');
console.log('  independent path: COUNT by SPF-factoring h, h-2, h+2; MAIN by enumerating every');
console.log('  squarefree y-smooth 7-rough n <= 2L and splitting it over the three slots.');
console.log('  corpus X read from attack-0830-varE-identification.js line 66-67 (a CITED constant, not recomputed here).');
const CORPUS_X = { 13: 29.557928, 17: 51.400255 };
const varEA = [];
for (const x of [13, 17]) {
  const ps0 = primesUpTo(x), L = ps0.reduce((a, b) => a * b, 1), K = L / 6;
  const y = (() => { let b = 2; for (const p of primesUpTo(Math.floor(Math.sqrt(L)) + 1)) if (p * p <= L) b = p; return b; })();
  const allp = primesUpTo(y), ps = allp.filter(p => p >= 7), np = ps.length, lny = Math.log(y);
  const idx = new Map(); ps.forEach((p, i) => idx.set(p, i));
  let delta = 1; for (const p of allp) { const a = (p === 2 || p === 3) ? 1 : (p === 5 ? 2 : p - 2); delta *= a / p; }
  let D = 1; for (const p of ps) D *= p * (p - 4) / ((p - 2) * (p - 2));
  const lam0 = ps.map(p => 2 / (p - 4)), lam1 = ps.map(p => 1 / (p - 4));

  // ---- smallest-prime-factor sieve to 3K+1, used to factor k, 3k-1, 3k+1 ----
  const NS = 3 * K + 2, spf = new Int32Array(NS + 1);
  for (let i = 2; i <= NS; i++) if (!spf[i]) for (let j = i; j <= NS; j += i) if (!spf[j]) spf[j] = i;
  const facs = (m) => { const o = []; while (m > 1) { const p = spf[m]; if (p >= 7 && p <= y) { const i = idx.get(p); if (i !== undefined) o.push(i); } while (m % p === 0) m /= p; } return o; };
  // subsets of a factor-index list, as [n, weight] pairs, against a given lambda
  const subs = (fs, lam) => { const out = [[1, 1]]; for (const i of fs) { const p = ps[i], w = lam[i], n0 = out.length; for (let s = 0; s < n0; s++) out.push([out[s][0] * p, out[s][1] * w]); } return out; };

  // ---- COUNT: over h = 6k, 0 < h < L, doubled for -h; h = 0 handled apart ----
  // type: 0 none, 1 c0 only, 2 pure (one of n+ n- only), 3 mix2a (n0 + one),
  //       4 mix2b (n+ and n-), 5 mix3.  band: 0 for n <= 2L, 1 above.
  const typeOf = (b0, bp, bm) => (!b0 && !bp && !bm) ? 0 : (b0 && !bp && !bm) ? 1 : (!b0 && (bp !== bm)) ? 2 : (b0 && (bp !== bm)) ? 3 : (!b0 && bp && bm) ? 4 : 5;
  const CNT = []; for (let t = 0; t < 6; t++) CNT.push([new Kah(), new Kah()]);
  // the unbalanced/balanced split of the mix2a cell below 2L (PART G of the note)
  const Q25 = Math.pow(L, 0.4);
  const CU = new Kah(), CB = new Kah();
  for (let k = 1; k < K; k++) {
    const r5 = k % 5, f5 = (r5 === 0) ? 2.5 : ((r5 === 1 || r5 === 4) ? 1.25 : 0); if (f5 === 0) continue;
    const h = 6 * k, base = 2 * (1 - h / L) * 6 * f5 * D;
    const S0 = subs(facs(k), lam0), SP = subs(facs(3 * k - 1), lam1), SM = subs(facs(3 * k + 1), lam1);
    for (const [a0, w0] of S0) for (const [ap, wp] of SP) for (const [am, wm] of SM) {
      const n = a0 * ap * am, t = typeOf(a0 > 1, ap > 1, am > 1);
      CNT[t][n <= 2 * L ? 0 : 1].add(base * w0 * wp * wm);
      if (t === 3 && n <= 2 * L) { const e = ap > 1 ? ap : am; (Math.min(a0, e) <= Q25 ? CU : CB).add(base * w0 * wp * wm); }
    }
  }
  // h = 0: every n0 divides 0; n+ | -2 and n- | 2 force n+ = n- = 1 (parts are 7-rough)
  let lam0tot = 1; for (const p of ps) lam0tot *= 1 + 2 / (p - 4);
  CNT[0][0].add(6 * 2.5 * D); CNT[1][0].add(6 * 2.5 * D * (lam0tot - 1));   // n0 = 1 is type 0

  // ---- MAIN: enumerate every squarefree y-smooth 7-rough n <= 2L, then split n ----
  // list of [n, [prime indices]] built by extending with each prime in turn
  let NL = [[1, []]];
  for (let i = 0; i < np; i++) {
    const p = ps[i], add = [];
    for (const [n, fs] of NL) { const n2 = n * p; if (n2 <= 2 * L) add.push([n2, fs.concat(i)]); }
    if (!add.length) break; NL = NL.concat(add);
  }
  const MN = []; for (let t = 0; t < 6; t++) MN.push([new Kah(), new Kah()]);
  const MU = new Kah(), MB = new Kah();
  for (const [n, fs] of NL) {
    const m = fs.length, pw = Math.pow(3, m);
    for (let code = 0; code < pw; code++) {
      let c = code, n0 = 1, npp = 1, nm = 1, w = 1;
      for (let j = 0; j < m; j++) { const slot = c % 3; c = (c - slot) / 3; const i = fs[j], p = ps[i]; if (slot === 0) { n0 *= p; w *= lam0[i]; } else if (slot === 1) { npp *= p; w *= lam1[i]; } else { nm *= p; w *= lam1[i]; } }
      const t = typeOf(n0 > 1, npp > 1, nm > 1);
      MN[t][0].add(L * D * w / n);
      if (t === 3) { const e = npp > 1 ? npp : nm; (Math.min(n0, e) <= Q25 ? MU : MB).add(L * D * w / n); }
    }
  }
  // MAIN over ALL n, by the closed product form; the >2L band is the difference
  const P = S => { let v = 1; for (let i = 0; i < np; i++) { const p = ps[i]; v *= 1 + (S.includes(0) ? lam0[i] / p : 0) + (S.includes(1) ? lam1[i] / p : 0) + (S.includes(2) ? lam1[i] / p : 0); } return v; };
  const TT = [1, P([0]) - 1, 2 * (P([1]) - 1), 2 * (P([0, 1]) - P([0]) - P([1]) + 1), P([1, 2]) - 2 * P([1]) + 1,
  P([0, 1, 2]) - P([0, 1]) - P([0, 2]) - P([1, 2]) + P([0]) + P([1]) + P([2]) - 1];
  assert(Math.abs(TT.reduce((a, b) => a + b, 0) * D - 1) < 1e-12, 'the six type totals sum to 1/D_y');
  for (let t = 0; t < 6; t++) MN[t][1].add(L * D * TT[t] - MN[t][0].get());

  const TNAM = ['n=1', 'c0', 'pure', 'mix2a', 'mix2b', 'mix3'];
  console.log('\n  x = ' + x + '   L = ' + L + '   y = ' + y + '   ln y = ' + f3(lny) + '   primes 7..y: ' + np + '   n<=2L enumerated: ' + NL.length + '   L^(2/5) = ' + f3(Q25));
  console.log('  ' + pad('type', 6) + ' | ' + pad('REM n<=2L', 12) + ' | ' + pad('REM n>2L', 12) + ' | ' + pad('REM all', 12));
  let tot = 0, totM = 0;
  const rem = [];
  for (let t = 0; t < 6; t++) {
    const r0 = CNT[t][0].get() - MN[t][0].get(), r1 = CNT[t][1].get() - MN[t][1].get();
    rem.push([r0, r1]); tot += r0 + r1; totM += MN[t][0].get() + MN[t][1].get();
    console.log('  ' + pad(TNAM[t], 6) + ' | ' + pad(f6(r0), 12) + ' | ' + pad(f6(r1), 12) + ' | ' + pad(f6(r0 + r1), 12));
  }
  console.log('  sum MAIN = ' + f6(totM) + ' (= L = ' + L + ', relerr ' + (Math.abs(totM - L) / L).toExponential(1) + ')');
  console.log('  sum REM  = ' + f6(tot) + '   corpus X = ' + CORPUS_X[x] + '   relerr ' + (Math.abs(tot - CORPUS_X[x]) / CORPUS_X[x]).toExponential(1));
  assert(Math.abs(totM - L) < 1e-6 * L, 'the main terms sum to L at x=' + x);
  assert(Math.abs(tot - CORPUS_X[x]) / CORPUS_X[x] < 2e-6, 'total REM reproduces the corpus X at x=' + x);
  const mix0 = rem[3][0] + rem[4][0] + rem[5][0], mix1 = rem[3][1] + rem[4][1] + rem[5][1], mixAll = mix0 + mix1;
  console.log('  MIXED (mix2a + mix2b + mix3): all bands ' + f4(mixAll) + ' = ' + f4(mixAll / lny) + ' * ln y;   n <= 2L ' + f4(mix0) + ';   SHARE BELOW 2L = ' + f4(mix0 / mixAll));
  console.log('  per type, all bands:  mix2a ' + f4(rem[3][0] + rem[3][1]) + '   mix2b ' + f4(rem[4][0] + rem[4][1]) + '   mix3 ' + f4(rem[5][0] + rem[5][1]));
  const cu = CU.get() - MU.get(), cb = CB.get() - MB.get(), cell = rem[3][0];
  console.log('  mix2a cell n <= 2L split on min(n0,e) <= L^(2/5):  UNBAL REM ' + f6(cu) + '   BAL REM ' + f6(cb) + '   sum ' + f6(cu + cb) + ' (cell ' + f6(cell) + ')   UNBAL SHARE = ' + f4(cu / cell));
  assert(Math.abs((cu + cb) - cell) < 1e-6 * Math.max(1, Math.abs(cell)), 'the balance split re-sums to the mix2a cell at x=' + x);
  varEA.push({ x, mixAll, mix0, share: mix0 / mixAll, unbal: cu / cell, lny });
}
console.log('\n  TARGETS (attack-0830-varE-identification.md:76-78, :87-88): mixed remainder -2.51 / -3.23 and -0.49 ln y;');
console.log('  share below 2L 0.844 / 0.826; unbalanced share of the mix2a cell 94.4 % / 98.7 %.');
for (const r of varEA) console.log('   x = ' + pad(r.x, 2) + '   mixed ' + f4(r.mixAll) + ' = ' + f4(r.mixAll / r.lny) + ' ln y   share<=2L ' + f4(r.share) + '   unbal ' + f4(100 * r.unbal) + ' %');

// ============================================================================
console.log('\n=== PART B: Buchstab omega, the origin deviation, and the crossing level z* ===');
const GAMMA = 0.5772156649015329, EG = Math.exp(GAMMA);
// omega on [1,2] is 1/u; for u > 2, (u omega(u))' = omega(u-1).  Grid + Simpson.
const STEP = 1e-5, UMAX = 5, NG = Math.round((UMAX - 1) / STEP);
const W = new Float64Array(NG + 1);                 // W[i] = omega(1 + i*STEP)
for (let i = 0; i <= NG; i++) { const u = 1 + i * STEP; if (u <= 2) W[i] = 1 / u; }
{ // integrate uw(u) = 2*omega(2) + int_2^u omega(t-1) dt = 1 + int_2^u omega(t-1) dt
  const i2 = Math.round(1 / STEP); let acc = 1;
  for (let i = i2; i < NG; i++) {
    const a = W[i - i2], b = W[i + 1 - i2], mid = 0.5 * (W[i - i2] + W[i + 1 - i2]); // omega(t-1) at the ends
    acc += STEP * (a + 4 * mid + b) / 6;            // Simpson with the midpoint approximated by the chord: exact for linear pieces
    const u = 1 + (i + 1) * STEP; W[i + 1] = acc / u;
  }
}
const om = u => W[Math.round((u - 1) / STEP)];
console.log('  self-check omega(3) against the closed form (1 + ln 2)/3 = ' + f6((1 + Math.LN2) / 3) + ':  grid ' + f6(om(3)) + '  (abs diff ' + Math.abs(om(3) - (1 + Math.LN2) / 3).toExponential(1) + ')');
console.log('  self-check omega(2) = 1/2: grid ' + f6(om(2)));
const US = [2, 3, 4, 4.26645];
console.log('   u        omega(u)     omega(u) e^gamma    deviation |. - 1|');
const DEV = {};
for (const u of US) { const v = om(u), oe = v * EG, d = Math.abs(oe - 1); DEV[u] = d; console.log('  ' + pad(u, 8) + '  ' + f6(v) + '     ' + f6(oe) + '           ' + d.toExponential(4)); }
console.log('  TARGET (recon-0830-rec-killrun.md:212): omega(u) e^gamma = 0.8905362, 1.0052059, 0.9999978, 1.0001078; deviations 1.0946e-1, 5.2059e-3, 2.2121e-6, 1.0775e-4');
// the crossing: dev * sqrt(H P) = z^{u/2 - eps}, H = z^u, P = e^{-gamma}/ln z (Mertens)
// => dev * z^{u/2} sqrt(e^{-gamma}/ln z) = z^{u/2-eps}  =>  z^eps = sqrt(ln z * e^gamma)/dev
const cross = (u, eps) => {
  const g = t => eps * t - 0.5 * Math.log(t * EG) + Math.log(DEV[u]);   // t = ln z; zero at the crossing
  let lo = 1, hi = 1e5; assert(g(lo) < 0 && g(hi) > 0, 'the crossing is bracketed');
  for (let it = 0; it < 300; it++) { const mid = 0.5 * (lo + hi); if (g(mid) < 0) lo = mid; else hi = mid; }
  return 0.5 * (lo + hi) / Math.LN10;
};
console.log('\n  crossing z*, solving  z^eps = sqrt(e^gamma ln z) / dev(u)   [P(z) = e^{-gamma}/ln z, Mertens]');
console.log('   (u, eps)        log10 z*     recon-0830-rec-killrun.md:233-235');
for (const [u, eps, tgt] of [[3, 0.10, '33.53'], [4, 0.10, '68.80'], [4, 0.20, '33.62'], [2, 0.10, '(not quoted)'], [3, 0.20, '(not quoted)']])
  console.log('   (' + u + ', ' + f2(eps) + ')        ' + pad(f2(cross(u, eps)), 8) + '     ' + tgt);
// the exact-P control: no Mertens, P(z) computed as the product, at the crossing's own z is impossible,
// so instead check the FINITE-z floor the note quotes at z = 37
for (const z of [37]) {
  let Pz = 1; for (const p of primesUpTo(z)) Pz *= 1 - 1 / p;
  for (const [u, eps] of [[3, 0.10], [4, 0.10]]) {
    const H = Math.pow(z, u), floor = DEV[u] * Math.sqrt(H * Pz), allow = Math.pow(z, u / 2 - eps);
    console.log('   z = ' + z + ', u = ' + u + ', eps = ' + f2(eps) + ':  P(z) = ' + f6(Pz) + '   floor dev*sqrt(HP) = ' + f3(floor) + '   allowance z^{u/2-eps} = ' + f1a(allow) + '   [note: 0.452 vs 156.8, 0.001 vs 954.1]');
  }
}
function f1a(v) { return v.toFixed(1); }

// ============================================================================
console.log('\n=== PART C: the skeleton door split, from cap-36\'s DIRECT Snum definition ===');
console.log('  Snum(F) = L(F(0) + 2 sum_{0<d<lA} G(d)) + 4 sum_{0<=e<lB} (lB-e) G(lA+e),  G(d) = Phi_T(q d mod W)');
console.log('  (the note evaluates Theorem A\'s collapsed 2 Pa (lA-lB+2R) + 4B instead; agreement tests the identity)');
for (const x of [13, 17]) {
  const mids = primesUpTo(x).filter(p => p >= 7), nm = mids.length;
  const W30 = 30 * mids.reduce((a, b) => a * b, 1);
  const N = 2 * mids.reduce((a, p) => a * (p - 2), 1);
  const qs = primesUpTo(Math.floor(Math.sqrt(W30)) + 1).filter(q => q > x && q * q <= W30);
  const rt = Math.sqrt(W30);
  // phi tables
  const mb30 = 4 / 900, t30 = new Float64Array(30);
  for (let u = 0; u < 30; u++) t30[u] = ((u === 0) ? 2 : (u === 6 || u === 24) ? 1 : 0) / 30 - mb30;
  const mbp = mids.map(p => ((p - 2) / p) ** 2);
  const tp = mids.map((p, i) => { const t = new Float64Array(p); for (let u = 0; u < p; u++) t[u] = ((u === 0) ? p - 2 : (u === 2 || u === p - 2) ? p - 3 : p - 4) / p - mbp[i]; return t; });
  // branch list: S subset of the mids; M_T = 30 * prod_{i in S} p_i; out = prod_{i not in S} mbar_i
  const BR = [];
  for (let S = 0; S < (1 << nm); S++) { let M = 30, out = 1, dep = 0; for (let i = 0; i < nm; i++) { if (S & (1 << i)) { M *= mids[i]; dep++; } else out *= mbp[i]; } BR.push({ S, M, out, dep }); }
  const nb = BR.length;
  const tot = new Array(nb).fill(0).map(() => new Kah());
  let SNUM = 0n, SV = 0n;
  const shK = new Kah(), covK = new Kah(), totK = new Kah();
  for (const q of qs) {
    const wm = W30 % q, k = (W30 - wm) / q, a = q - wm, lA = k + 1, lB = (a === 1) ? lA : k, LL = lA + lB;
    // --- branch numerators, direct definition, one pass over d = 0 .. LL-1 ---
    const acc = new Float64Array(nb);
    const rp = new Int32Array(nm), sp = new Int32Array(nm);
    for (let i = 0; i < nm; i++) sp[i] = q % mids[i];
    let r30 = 0; const s30 = q % 30;
    // d = 0 term: L * F(0), with F(0) = Phi_T(0)
    { const buf = new Float64Array(nb); phiSubsets(0); for (let b = 0; b < nb; b++) acc[b] += LL * buf[b];
      function phiSubsets(m) { const v30 = t30[0], vp = tp.map((t) => t[0]); fill(buf, v30, vp); } }
    for (let d = 1; d < LL; d++) {
      r30 += s30; if (r30 >= 30) r30 -= 30;
      const vp = new Array(nm);
      for (let i = 0; i < nm; i++) { let u = rp[i] + sp[i]; const p = mids[i]; if (u >= p) u -= p; rp[i] = u; vp[i] = tp[i][u]; }
      const buf = new Float64Array(nb); fill(buf, t30[r30], vp);
      if (d < lA) { for (let b = 0; b < nb; b++) acc[b] += 2 * LL * buf[b]; }
      if (d >= lA) { const w = 4 * (LL - d); for (let b = 0; b < nb; b++) acc[b] += w * buf[b]; }
    }
    function fill(buf, v30, vp) { for (let b = 0; b < nb; b++) { const B = BR[b]; let v = B.out * v30; for (let i = 0; i < nm; i++) if (B.S & (1 << i)) v *= vp[i]; buf[b] = v; } }
    for (let b = 0; b < nb; b++) { tot[b].add(acc[b]); totK.add(acc[b]); if (BR[b].M <= lB) { shK.add(acc[b]); if (BR[b].M <= rt) covK.add(acc[b]); } }
    // --- the exact BigInt NUMsk / IV pass, for G30_agg and as a control on the total ---
    { const rp2 = new Int32Array(nm); for (let i = 0; i < nm; i++) rp2[i] = 0;
      let r2 = 0; let SA = 0n, SB = 0n, TA = 0n, TB = 0n;
      for (let d = 1; d < LL; d++) {
        r2 += s30; if (r2 >= 30) r2 -= 30;
        let P = 1; for (let i = 0; i < nm; i++) { let u = rp2[i] + sp[i]; const p = mids[i]; if (u >= p) u -= p; rp2[i] = u; P *= u === 0 ? p - 2 : (u === 2 || u === p - 2) ? p - 3 : p - 4; }
        const c30 = r2 === 0 ? 2 : (r2 === 6 || r2 === 24) ? 1 : 0, C = c30 * P, Kk = 15 * C - 2 * P;
        if (d < lA) { SA += BigInt(Kk); if (C) TA += BigInt((lA - d) * C); }
        else SB += BigInt((LL - d) * Kk);
        if (d < lB && C) TB += BigInt((lB - d) * C);
      }
      const WB = BigInt(W30), NB = BigInt(N), lAB = BigInt(lA), lBB = BigInt(lB), LB = BigInt(LL);
      SNUM += LB * (14n * NB + 2n * SA) + 4n * SB;
      SV += (WB * (lAB * NB + 2n * TA) - NB * NB * lAB * lAB) + (WB * (lBB * NB + 2n * TB) - NB * NB * lBB * lBB);
    }
  }
  const cert = BigInt(W30) * SNUM < 15n * SV;
  const G = Number(BigInt(W30) * SNUM) / (2 * Number(15n * SV));
  const kernelTot = Number(SNUM) / (15 * W30);
  const T = totK.get(), sh = shK.get(), cov = covK.get();
  console.log('\n  @' + x + '  W = ' + W30 + '  scour primes ' + qs.length + '  branches ' + nb);
  console.log('    sum_T sum_q Snum_T (direct)  = ' + T.toExponential(4) + '     from the exact BigInt kernel, sum_q NUMsk/(15W) = ' + kernelTot.toExponential(4) + '   relerr ' + (Math.abs(T - kernelTot) / Math.abs(kernelTot)).toExponential(1));
  assert(Math.abs(T - kernelTot) < 1e-9 * Math.abs(kernelTot), 'the direct branch sum equals the collapsed kernel at @' + x);
  console.log('    W*sum NUMsk < 15*sum IV: ' + (cert ? 'CERTIFIED' : 'FALSE') + '   G30_agg = ' + f4(G) + '   margin ' + f4(0.5 - G));
  console.log('    closable M_T <= lB: ' + sh.toExponential(3) + ' = ' + (100 * sh / T).toFixed(1) + ' %      open M_T > lB: ' + (T - sh).toExponential(3) + ' = ' + (100 * (T - sh) / T).toFixed(1) + ' %      SV-covered M_T <= sqrt W: ' + (100 * cov / T).toFixed(1) + ' %');
  console.log('    closable part of G30_agg = ' + f4((sh / T) * G) + '     open part = ' + f4((1 - sh / T) * G));
  console.log('    TARGET (decide-0830-skeleton-door.js SEC B/C): @13 9.2 % / 0.1113 / 0.0102 / 0.1010;  @17 -0.9 % / 0.1011 / -0.0009 / 0.1020');
}

// ============================================================================
console.log('\n=== PART D: the @43 CRT-anchor parity claim, and the cost arithmetic ===');
const TWO53 = 2n ** 53n, TWO54 = 2n ** 54n;
function invMod(a, m) { let [o, r] = [BigInt(a) % BigInt(m), BigInt(m)], [x, y] = [1n, 0n]; while (o) { const qd = r / o; [r, o] = [o, r - qd * o]; [y, x] = [x, y - qd * x]; } return ((y % BigInt(m)) + BigInt(m)) % BigInt(m); }
function levelW(x) { let W = 1n; for (const p of primesUpTo(x)) W *= BigInt(p); return W; }
function isqrt(n) { if (n < 2n) return n; let r = BigInt(Math.floor(Math.sqrt(Number(n)))); while (r * r > n) r--; while ((r + 1n) * (r + 1n) <= n) r++; return r; }
// PROPOSITION (this pass). For a scour prime q at level x (q > x >= 43, q^2 <= x#),
// the record's anchor r = ((a-b) mod q) with a in {0, q-2}, b in {11, 17} is one of
// q-11, q-13, q-17, q-19; q is odd so r is EVEN; and r*inv30(q) < q^2 <= x#.
// If x# < 2^54 the product is an even integer below 2^54, hence exactly a double.
for (const x of [41, 43, 47]) {
  const W = levelW(x), qmax = isqrt(W);
  console.log('  x = ' + x + ':  x# = ' + W + '   x#/2^53 = ' + (Number(W) / Number(TWO53)).toFixed(4) + '   x# < 2^54: ' + (W < TWO54 ? 'YES' : 'NO') + '   x# even: ' + (W % 2n === 0n ? 'YES' : 'NO') + '   max scour prime <= ' + qmax);
}
{ // exhaustive check at @43 on every scour class, three separate columns
  const x = 43, W = levelW(x), qmax = Number(isqrt(W));
  const ps = primesUpTo(qmax);
  let tot = 0, odd = 0, over53 = 0, over54 = 0, mism = 0, maxProd = 0n;
  for (const q of ps) {
    if (q <= x) continue;
    const iv = Number(invMod(30, q));
    for (const b of [11, 17]) for (const a of [0, q - 2]) {
      const r = ((a - b) % q + q) % q; tot++;
      if (r % 2 !== 0) odd++;
      const exact = BigInt(r) * BigInt(iv);
      if (exact > maxProd) maxProd = exact;
      if (exact >= TWO53) over53++;
      if (exact >= TWO54) over54++;
      if (r * iv !== Number(exact)) mism++;            // the record's double multiply against BigInt
    }
  }
  console.log('  @43, all ' + tot + ' scour classes: anchors with ODD r: ' + odd + ';  products >= 2^53: ' + over53 + ';  products >= 2^54: ' + over54 + ';  double != BigInt: ' + mism + ';  largest product ' + maxProd);
  assert(odd === 0 && over54 === 0 && mism === 0, 'the @43 parity proposition holds on every scour class');
}
{ // @47: the same product can pass 2^54, where evenness alone no longer suffices
  const x = 47, W = levelW(x), qmax = isqrt(W);
  let wit = null, scanned = 0;
  for (let cand = Number(qmax) - (Number(qmax) % 2 === 0 ? 1 : 0); cand > Number(qmax) - 200000 && !wit; cand -= 2) {
    let pr = cand > 1; for (let d = 3; d * d <= cand; d += 2) if (cand % d === 0) { pr = false; break; }
    if (!pr) continue; scanned++;
    const q = cand, iv = Number(invMod(30, q));
    for (const b of [11, 17]) for (const a of [0, q - 2]) {
      const r = ((a - b) % q + q) % q, exact = BigInt(r) * BigInt(iv);
      if (exact >= TWO54 && exact % 4n === 2n) { wit = { q, b, a, r, iv, exact, dbl: r * iv }; break; }
    }
  }
  console.log('  @47: 47# = ' + W + ' > 2^54, max scour prime <= ' + qmax + '; searched ' + scanned + ' primes downward from it for a product >= 2^54 with product = 2 (mod 4)');
  if (wit) console.log('    WITNESS q = ' + wit.q + ', b = ' + wit.b + ', r = ' + wit.r + ', inv30 = ' + wit.iv + ':  exact = ' + wit.exact + '  (>= 2^54, = 2 mod 4)  double = ' + BigInt(wit.dbl) + '  ERROR ' + (BigInt(wit.dbl) - wit.exact));
  else console.log('    no witness found in the scanned band (the claim that the accident ends at @47 is then NOT confirmed here)');
}
console.log('  path M, the odd position 30k + b above 2^53:');
for (const b of [11, 17]) { const k0 = Math.ceil((Number(TWO53) - b) / 30); const pos = 30n * BigInt(k0) + BigInt(b); console.log('    b = ' + b + ': first k = ' + k0 + ', position ' + pos + ' (odd: ' + (pos % 2n === 1n ? 'YES' : 'NO') + '), the double 30*k+b evaluates to ' + BigInt(30 * k0 + b) + ', error ' + (BigInt(30 * k0 + b) - pos)); }
{ const M43 = Number(levelW(43) / 30n), k0 = Math.ceil((Number(TWO53) - 17) / 30); console.log('    @43 tile M = W/30 = ' + M43 + ';  share of the tile above the first inexact position = ' + (100 * (M43 - k0) / M43).toFixed(1) + ' %   [note: 31.2 %]'); }
console.log('  cost arithmetic from the printed inputs (engine-0830-at43-bigint.js OUTPUT lines 602-603):');
console.log('    6.035 h x 43.00 x 2.230 = ' + (6.035 * 43 * 2.230).toFixed(1) + ' h = ' + (6.035 * 43 * 2.230 / 24).toFixed(1) + ' days   [note: 579 h, 24.1 days]');
console.log('    6.035 h x 43.00 x 1.000 = ' + (6.035 * 43).toFixed(1) + ' h                       [note: 260 h]');
console.log('    the printed medians 4.89 / 2.19 give a ratio of ' + (4.89 / 2.19).toFixed(3) + ', not the printed 2.230; 6.035 x 43 x ' + (4.89 / 2.19).toFixed(3) + ' = ' + (6.035 * 43 * 4.89 / 2.19).toFixed(1) + ' h');
console.log('    strike-budget ratio 2.6896e15 / 5.9157e13 = ' + (2.6896e15 / 5.9157e13).toFixed(3) + '   [note: 45.465];  45.465 / 43.000 = ' + (45.465 / 43).toFixed(5) + ';  2.230 / that = ' + (2.230 / (45.465 / 43)).toFixed(3) + '   [note: per strike 2.109]');
console.log('    the brief\'s 13x would have given 6.035 x 13 = ' + (6.035 * 13).toFixed(1) + ' h   [note: 78 h]');

// ============================================================================
console.log('\n=== PART E: the five recon-0828 ledger verdict counts, read out of the files ===');
{
  const fs = require('fs'), path = require('path');
  const dir = __dirname;
  const words = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, 'twenty-one': 21, 'twenty-two': 22, 'twenty-three': 23 };
  let sum = 0;
  for (const nm of ['recon-0828-sieve.md', 'recon-0828-rough.md', 'recon-0828-covering.md', 'recon-0828-jacobsthal.md', 'recon-0828-farfields.md']) {
    const txt = fs.readFileSync(path.join(dir, nm), 'utf8');
    const v = (txt.match(/^verdict:.*$/m) || [''])[0];
    const m = v.match(/([A-Za-z-]+)\s+(?:angles|candidates)/i);
    const n = m ? (words[m[1].toLowerCase()] ?? NaN) : NaN;
    sum += n;
    console.log('  ' + nm.padEnd(28) + ' "' + (m ? m[0] : 'NO MATCH') + '"  ->  ' + n);
  }
  console.log('  SUM = ' + sum + '   [README §Status: "about seventy-five candidate applications"; recon-0830-rec-killrun.md §4 item 1: "21 + 10 + 15 + 13" = 59]');
  assert(sum === 75, 'the five recon-0828 verdict counts sum to 75');
}

// ============================================================================
console.log('\n=== PART F: the three identities the two varE notes rest on, re-derived and checked ===');
{
  const gcd = (a, b) => { while (b) { [a, b] = [b, a % b]; } return a; };
  const invm = (a, m) => { let [o, r, xx, yy] = [((a % m) + m) % m, m, 1, 0]; while (o) { const q = Math.floor(r / o); [r, o] = [o, r - q * o]; [yy, xx] = [xx, yy - q * xx]; } return ((yy % m) + m) % m; };
  // (i) the closed form of the Fejer-weighted class count against a direct sum
  const Rclosed = (L, n, c) => { const r = L % n; return (Math.max(0, r - c) + Math.max(0, r + c - n) - r * r / n) / L; };
  const Rdirect = (L, n, c) => { let s = 0; for (let h = -(L - 1); h < L; h++) if (((h % n) + n) % n === c) s += 1 - Math.abs(h) / L; return s - L / n; };
  let e1 = 0, e2 = 0;
  for (let t = 0; t < 400; t++) { const L = 200 + ((t * 37) % 800), n = 3 + ((t * 53) % 90), c = (t * 29) % n; e1 = Math.max(e1, Math.abs(Rclosed(L, n, c) - Rdirect(L, n, c))); }
  console.log('  (i) R_n(c) = [(r-c)^+ + (r+c-n)^+ - r^2/n]/L against the direct Fejer sum, 400 random (L,n,c): max |diff| = ' + e1.toExponential(2));
  assert(e1 < 1e-12, 'the closed form of R_n(c) is the Fejer-weighted count');
  // (ii) the mixed CRT class is a Kloosterman fraction (varE note PART A), re-derived here by
  //      partial fractions: c/n = sum over parts of c*inv(n/part, part)/part mod 1.
  let e3 = 0, cases = 0;
  const smallp = primesUpTo(200).filter(p => p >= 7);
  let seed = 20260830 >>> 0;
  const rnd = () => { seed = (seed * 1103515245 + 12345) >>> 0; return seed / 4294967296; };
  for (let t = 0; t < 3000; t++) {
    // draw three parts from DISJOINT prime sets, so the triple is coprime by construction
    const pool = smallp.slice(); for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    let at = 0; const take = () => { let v = 1, k = 1 + Math.floor(rnd() * 2); while (k--) v *= pool[at++]; return v; };
    const n0 = take(), np = take(), nm = take();
    if (gcd(n0, np) !== 1 || gcd(n0, nm) !== 1 || gcd(np, nm) !== 1) continue;
    if (np < 3 || nm < 3) continue;
    cases++;
    const n = n0 * np * nm;
    // the CRT class: c = 0 (n0), 2 (np), -2 (nm)
    let c = 0; for (const [m, a] of [[n0, 0], [np, 2 % np], [nm, ((-2) % nm + nm) % nm]]) { const M = n / m; c = (c + a * M * invm(M % m, m)) % n; }
    const kl = (2 * (invm((n0 * nm) % np, np) / np - invm((n0 * np) % nm, nm) / nm)) % 1;
    const d1 = Math.abs(((c / n - kl) % 1 + 1.5) % 1 - 0.5);
    e3 = Math.max(e3, d1);
  }
  console.log('  (ii) c/n = 2( inv(n0 n-, n+)/n+ - inv(n0 n+, n-)/n- ) mod 1 on ' + cases + ' coprime triples: max |diff mod 1| = ' + e3.toExponential(2));
  assert(e3 < 1e-9, 'the mixed CRT class is the stated Kloosterman fraction');
  // (iii) recon-0830-smooth-aps section 3.2 (iv): sum_{(j,d)=1} R_{de}(2+ej) = sum_{g|d} mu(g) R_{eg}(2)
  let e4 = 0, cnt = 0, maxRhs = 0;
  const mu = m => { let s = 1; for (let p = 2; p * p <= m; p++) if (m % p === 0) { m /= p; if (m % p === 0) return 0; s = -s; } if (m > 1) s = -s; return s; };
  for (let t = 0; t < 300; t++) {
    const d = 3 + ((t * 11) % 60), e = 5 + ((t * 17) % 80), L = 500 + ((t * 41) % 4000);
    if (gcd(d, e) !== 1) continue; cnt++;
    let lhs = 0; for (let j = 0; j < d; j++) if (gcd(j, d) === 1) { const c = (((2 + e * j) % (d * e)) + d * e) % (d * e); lhs += Rclosed(L, d * e, c); }
    let rhs = 0; for (let g = 1; g <= d; g++) if (d % g === 0) { const m = mu(g); if (m) rhs += m * Rclosed(L, e * g, 2 % (e * g)); }
    e4 = Math.max(e4, Math.abs(lhs - rhs)); maxRhs = Math.max(maxRhs, Math.abs(rhs));
  }
  console.log('  (iii) sum_{(j,d)=1} R_{de}(2+ej) = sum_{g|d} mu(g) R_{eg}(2) on ' + cnt + ' coprime (d,e) and random L: max |diff| = ' + e4.toExponential(2) + '  (largest |rhs| seen ' + f4(maxRhs) + ')');
  assert(e4 < 1e-9, 'the Mobius identity of recon-0830-smooth-aps section 3.2(iv) holds');
}
console.log('\nDONE');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0830-imports.js
//   invocation:  node research/history/staging/redteam-0830-imports.js
//   code-sha256: a9dc265b739e186d1ed3b3cb6d2c9dd1f9ac7326a328f5958d83aeb4223a89a8
//   out-sha256:  e7d16f5dd4f43e2b9e097dda21db53d4251a3095ac70c8ee355e5f7a69445078
//   body-lines:  108
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     3.9 s
// ============================================================================
// === PART A: the varE mixed remainder, by branch type and by the 2L band, rebuilt ===
//   independent path: COUNT by SPF-factoring h, h-2, h+2; MAIN by enumerating every
//   squarefree y-smooth 7-rough n <= 2L and splitting it over the three slots.
//   corpus X read from attack-0830-varE-identification.js line 66-67 (a CITED constant, not recomputed here).
//
//   x = 13   L = 30030   y = 173   ln y = 5.153   primes 7..y: 37   n<=2L enumerated: 1959   L^(2/5) = 61.805
//     type |    REM n<=2L |     REM n>2L |      REM all
//      n=1 |     0.000000 |     0.000000 |     0.000000
//       c0 |    31.912652 |    -0.113545 |    31.799107
//     pure |     0.290646 |    -0.021220 |     0.269426
//    mix2a |    -2.227234 |    -0.365751 |    -2.592985
//    mix2b |     0.068170 |    -0.003733 |     0.064437
//     mix3 |     0.040818 |    -0.022875 |     0.017943
//   sum MAIN = 30030.000000 (= L = 30030, relerr 4.8e-16)
//   sum REM  = 29.557928   corpus X = 29.557928   relerr 1.6e-9
//   MIXED (mix2a + mix2b + mix3): all bands -2.5106 = -0.4872 * ln y;   n <= 2L -2.1182;   SHARE BELOW 2L = 0.8437
//   per type, all bands:  mix2a -2.5930   mix2b 0.0644   mix3 0.0179
//   mix2a cell n <= 2L split on min(n0,e) <= L^(2/5):  UNBAL REM -2.101809   BAL REM -0.125425   sum -2.227234 (cell -2.227234)   UNBAL SHARE = 0.9437
//
//   x = 17   L = 510510   y = 709   ln y = 6.564   primes 7..y: 124   n<=2L enumerated: 40783   L^(2/5) = 191.956
//     type |    REM n<=2L |     REM n>2L |      REM all
//      n=1 |     0.000000 |     0.000000 |     0.000000
//       c0 |    54.580501 |    -0.180476 |    54.400025
//     pure |     0.260006 |    -0.028600 |     0.231407
//    mix2a |    -2.604028 |    -0.512654 |    -3.116682
//    mix2b |    -0.004926 |    -0.004917 |    -0.009842
//     mix3 |    -0.059130 |    -0.045523 |    -0.104652
//   sum MAIN = 510510.000000 (= L = 510510, relerr 1.7e-15)
//   sum REM  = 51.400255   corpus X = 51.400255   relerr 8.0e-9
//   MIXED (mix2a + mix2b + mix3): all bands -3.2312 = -0.4923 * ln y;   n <= 2L -2.6681;   SHARE BELOW 2L = 0.8257
//   per type, all bands:  mix2a -3.1167   mix2b -0.0098   mix3 -0.1047
//   mix2a cell n <= 2L split on min(n0,e) <= L^(2/5):  UNBAL REM -2.569000   BAL REM -0.035028   sum -2.604028 (cell -2.604028)   UNBAL SHARE = 0.9865
//
//   TARGETS (attack-0830-varE-identification.md:76-78, :87-88): mixed remainder -2.51 / -3.23 and -0.49 ln y;
//   share below 2L 0.844 / 0.826; unbalanced share of the mix2a cell 94.4 % / 98.7 %.
//    x = 13   mixed -2.5106 = -0.4872 ln y   share<=2L 0.8437   unbal 94.3686 %
//    x = 17   mixed -3.2312 = -0.4923 ln y   share<=2L 0.8257   unbal 98.6549 %
//
// === PART B: Buchstab omega, the origin deviation, and the crossing level z* ===
//   self-check omega(3) against the closed form (1 + ln 2)/3 = 0.564382:  grid 0.564382  (abs diff 2.1e-12)
//   self-check omega(2) = 1/2: grid 0.500000
//    u        omega(u)     omega(u) e^gamma    deviation |. - 1|
//          2  0.500000     0.890536           1.0946e-1
//          3  0.564382     1.005206           5.2059e-3
//          4  0.561458     0.999998           2.2124e-6
//    4.26645  0.561520     1.000108           1.0775e-4
//   TARGET (recon-0830-rec-killrun.md:212): omega(u) e^gamma = 0.8905362, 1.0052059, 0.9999978, 1.0001078; deviations 1.0946e-1, 5.2059e-3, 2.2121e-6, 1.0775e-4
//
//   crossing z*, solving  z^eps = sqrt(e^gamma ln z) / dev(u)   [P(z) = e^{-gamma}/ln z, Mertens]
//    (u, eps)        log10 z*     recon-0830-rec-killrun.md:233-235
//    (3, 0.10)           33.53     33.53
//    (4, 0.10)           68.80     68.80
//    (4, 0.20)           33.62     33.62
//    (2, 0.10)           19.07     (not quoted)
//    (3, 0.20)           15.96     (not quoted)
//    z = 37, u = 3, eps = 0.10:  P(z) = 0.148721   floor dev*sqrt(HP) = 0.452   allowance z^{u/2-eps} = 156.8   [note: 0.452 vs 156.8, 0.001 vs 954.1]
//    z = 37, u = 4, eps = 0.10:  P(z) = 0.148721   floor dev*sqrt(HP) = 0.001   allowance z^{u/2-eps} = 954.1   [note: 0.452 vs 156.8, 0.001 vs 954.1]
//
// === PART C: the skeleton door split, from cap-36's DIRECT Snum definition ===
//   Snum(F) = L(F(0) + 2 sum_{0<d<lA} G(d)) + 4 sum_{0<=e<lB} (lB-e) G(lA+e),  G(d) = Phi_T(q d mod W)
//   (the note evaluates Theorem A's collapsed 2 Pa (lA-lB+2R) + 4B instead; agreement tests the identity)
//
//   @13  W = 30030  scour primes 34  branches 8
//     sum_T sum_q Snum_T (direct)  = 2.9021e+1     from the exact BigInt kernel, sum_q NUMsk/(15W) = 2.9021e+1   relerr 1.1e-13
//     W*sum NUMsk < 15*sum IV: CERTIFIED   G30_agg = 0.1113   margin 0.3887
//     closable M_T <= lB: 2.667e+0 = 9.2 %      open M_T > lB: 2.635e+1 = 90.8 %      SV-covered M_T <= sqrt W: 0.2 %
//     closable part of G30_agg = 0.0102     open part = 0.1010
//     TARGET (decide-0830-skeleton-door.js SEC B/C): @13 9.2 % / 0.1113 / 0.0102 / 0.1010;  @17 -0.9 % / 0.1011 / -0.0009 / 0.1020
//
//   @17  W = 510510  scour primes 120  branches 16
//     sum_T sum_q Snum_T (direct)  = 2.2650e+2     from the exact BigInt kernel, sum_q NUMsk/(15W) = 2.2650e+2   relerr 4.4e-12
//     W*sum NUMsk < 15*sum IV: CERTIFIED   G30_agg = 0.1011   margin 0.3989
//     closable M_T <= lB: -2.004e+0 = -0.9 %      open M_T > lB: 2.285e+2 = 100.9 %      SV-covered M_T <= sqrt W: -0.9 %
//     closable part of G30_agg = -0.0009     open part = 0.1020
//     TARGET (decide-0830-skeleton-door.js SEC B/C): @13 9.2 % / 0.1113 / 0.0102 / 0.1010;  @17 -0.9 % / 0.1011 / -0.0009 / 0.1020
//
// === PART D: the @43 CRT-anchor parity claim, and the cost arithmetic ===
//   x = 41:  x# = 304250263527210   x#/2^53 = 0.0338   x# < 2^54: YES   x# even: YES   max scour prime <= 17442771
//   x = 43:  x# = 13082761331670030   x#/2^53 = 1.4525   x# < 2^54: YES   x# even: YES   max scour prime <= 114379899
//   x = 47:  x# = 614889782588491410   x#/2^53 = 68.2665   x# < 2^54: NO   x# even: YES   max scour prime <= 784149081
//   @43, all 26157448 scour classes: anchors with ODD r: 0;  products >= 2^53: 644256;  products >= 2^54: 0;  double != BigInt: 0;  largest product 12646626466403800
//   @47: 47# = 614889782588491410 > 2^54, max scour prime <= 784149081; searched 3 primes downward from it for a product >= 2^54 with product = 2 (mod 4)
//     WITNESS q = 784149071, b = 17, r = 784149054, inv30 = 496627745:  exact = 389430176431903230  (>= 2^54, = 2 mod 4)  double = 389430176431903232  ERROR 2
//   path M, the odd position 30k + b above 2^53:
//     b = 11: first k = 300239975158033, position 9007199254741001 (odd: YES), the double 30*k+b evaluates to 9007199254741000, error -1
//     b = 17: first k = 300239975158033, position 9007199254741007 (odd: YES), the double 30*k+b evaluates to 9007199254741008, error 1
//     @43 tile M = W/30 = 436092044389001;  share of the tile above the first inexact position = 31.2 %   [note: 31.2 %]
//   cost arithmetic from the printed inputs (engine-0830-at43-bigint.js OUTPUT lines 602-603):
//     6.035 h x 43.00 x 2.230 = 578.7 h = 24.1 days   [note: 579 h, 24.1 days]
//     6.035 h x 43.00 x 1.000 = 259.5 h                       [note: 260 h]
//     the printed medians 4.89 / 2.19 give a ratio of 2.233, not the printed 2.230; 6.035 x 43 x 2.233 = 579.4 h
//     strike-budget ratio 2.6896e15 / 5.9157e13 = 45.465   [note: 45.465];  45.465 / 43.000 = 1.05733;  2.230 / that = 2.109   [note: per strike 2.109]
//     the brief's 13x would have given 6.035 x 13 = 78.5 h   [note: 78 h]
//
// === PART E: the five recon-0828 ledger verdict counts, read out of the files ===
//   recon-0828-sieve.md          "Twenty-one angles"  ->  21
//   recon-0828-rough.md          "Ten angles"  ->  10
//   recon-0828-covering.md       "Fifteen angles"  ->  15
//   recon-0828-jacobsthal.md     "Thirteen angles"  ->  13
//   recon-0828-farfields.md      "sixteen candidates"  ->  16
//   SUM = 75   [README §Status: "about seventy-five candidate applications"; recon-0830-rec-killrun.md §4 item 1: "21 + 10 + 15 + 13" = 59]
//
// === PART F: the three identities the two varE notes rest on, re-derived and checked ===
//   (i) R_n(c) = [(r-c)^+ + (r+c-n)^+ - r^2/n]/L against the direct Fejer sum, 400 random (L,n,c): max |diff| = 1.14e-13
//   (ii) c/n = 2( inv(n0 n-, n+)/n+ - inv(n0 n+, n-)/n- ) mod 1 on 3000 coprime triples: max |diff mod 1| = 3.60e-12
//   (iii) sum_{(j,d)=1} R_{de}(2+ej) = sum_{g|d} mu(g) R_{eg}(2) on 130 coprime (d,e) and random L: max |diff| = 3.61e-15  (largest |rhs| seen 0.8518)
//
// DONE
// ============================================================================
// READINGS
// ============================================================================
// (in the companion note redteam-0830-imports.md; nothing is written here before the run)
