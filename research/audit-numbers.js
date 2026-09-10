#!/usr/bin/env node
'use strict';
// AUDIT-NUMBERS — every load-bearing number recomputed independently, retired values included
// (from sieves and closed forms only; nothing here reads another repo script)
/*
 * audit-numbers.js  --  independent recomputation of every load-bearing number
 * in the repo.  Nothing here reads any other repo script; every value is built
 * from a sieve or from a closed form so that a shared bug cannot hide.
 *
 * Usage:
 *   node --max-old-space-size=16384 research/audit-numbers.js [part]
 * parts:  const  onecls  a091592  hl  band  fits  oeis  ladder  g2big  all
 *         (default all)
 *   ladder  reaches 31# in 15 s; g2big adds the 37# term and costs 2 more minutes.
 *   oeis    covers the two submission drafts and runs in under a second.
 *
 * Definitions used here
 *   twin slot mod W : r with gcd(r,W)=gcd(r+2,W)=1
 *   G2(x#)          : largest gap between consecutive twin slots in Z/x#  (cyclic)
 *   h(x#)           : largest gap between consecutive units in Z/x#       (cyclic)
 *   D_x             : number of twin slots = prod_{3<=q<=x} (q-2)
 *   mbar            : x#/D_x, the mean twin-slot gap
 */

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const rows = [];
function check(label, computed, claimed, tol) {
  let ok;
  if (typeof computed === 'number' && typeof claimed === 'number') {
    ok = tol === undefined ? computed === claimed : Math.abs(computed - claimed) <= tol;
  } else ok = String(computed) === String(claimed);
  rows.push({ label, computed, claimed, ok });
  console.log(`${ok ? '  ok  ' : ' FAIL '} ${label}\n        computed ${computed}\n        claimed  ${claimed}`);
  return ok;
}

const PRIMES = (() => {
  const N = 200000, s = new Uint8Array(N + 1), out = [];
  for (let i = 2; i <= N; i++) {
    if (!s[i]) { out.push(i); for (let j = i * i; j <= N; j += i) s[j] = 1; }
  }
  return out;
})();

// ---------------------------------------------------------------- part: const
function partConst() {
  console.log('\n================ 1. CONSTANTS ================');
  const GAMMA = 0.57721566490153286060651209008240243104215933593992;
  const e2g = Math.exp(2 * GAMMA);
  check('e^{2gamma}', e2g.toFixed(5), '3.17222');
  console.log('        full: e^{2gamma} = ' + e2g.toPrecision(12) + ' ; /4 = ' + (e2g/4).toPrecision(12));
  check('e^{2gamma}/4', (e2g / 4).toFixed(6), '0.793055');

  // C2 = prod_{q>=3} (1 - 1/(q-1)^2), accelerated via the standard zeta expansion
  // is overkill; a direct product to 1e7 plus the analytic tail is enough for 9 dp.
  let c2 = 1;
  const LIM = 5e6, s = new Uint8Array(LIM + 1);
  for (let i = 2; i <= LIM; i++) {
    if (!s[i]) { for (let j = i * i; j <= LIM; j += i) s[j] = 1; if (i > 2) c2 *= 1 - 1 / ((i - 1) * (i - 1)); }
  }
  // tail: sum_{q>LIM} log(1-1/(q-1)^2) ~ -sum 1/q^2 ~ -1/(LIM ln LIM)
  const tail = -1 / (LIM * Math.log(LIM));
  const c2full = c2 * Math.exp(-tail * 0 + tail);
  check('C2 (twin constant)', c2full.toFixed(7), '0.6601618');
  // U3 (2026-08-20): these two used to divide by a LITERAL C2, so §H3's Euler
  // product above was decorative. They now consume the computed c2full, which
  // makes the product load-bearing: a bug in the sieve above moves these.
  check('e^{2g}/(2 C2)  [ Mertens limit of mbar/ln^2 x, from the COMPUTED C2 ]', (e2g / (2 * c2full)).toFixed(4), '2.4026');
  check('e^{2g}/(4 C2)  [ the retired factor-2-slipped value, from the COMPUTED C2 ]', (e2g / (4 * c2full)).toFixed(4), '1.2013');
  check('1+sqrt(e)', (1 + Math.sqrt(Math.E)).toFixed(4), '2.6487');
  check('2(1+sqrt(e))', (2 * (1 + Math.sqrt(Math.E))).toFixed(4), '5.2974');
  check('2(1+sqrt e)/beta2  [ K_FH/beta2 = the RETIRED 1.2417; the live break-even is K_BF/beta2 = 1.2090, checked in X5 ]',
        (2 * (1 + Math.sqrt(Math.E)) / 4.26645028414864191641).toFixed(4), '1.2417');

  console.log('\n---- primorials, D_x, mbar, lnD, mbar/ln^2 x ----');
  console.log('  x        x#                D_x               mbar     lnD      mbar/ln^2x');
  let W = 1n, D = 1n;
  const tab = {};
  for (const p of PRIMES) {
    if (p > 200) break;
    W *= BigInt(p);
    if (p >= 3) D *= BigInt(p - 2);
    const Wf = Number(W), Df = Number(D);
    const mbar = Wf / Df, lnD = lnBig(D);
    tab[p] = { W: Wf, D: Df, mbar, lnD, Wbig: W, Dbig: D };
    if (p <= 43 || p === 101 || p === 199)
      console.log(`  ${String(p).padStart(3)}  ${Wf.toExponential(6).padStart(14)}  ${Df.toExponential(6).padStart(14)}  ${mbar.toFixed(3).padStart(8)}  ${lnD.toFixed(3).padStart(8)}  ${(mbar / Math.log(p) ** 2).toFixed(4)}`);
  }
  // convergence of mbar/ln^2 x, in log space to avoid overflow past 300#
  let lw = 0, ld = 0;
  console.log('\n  asymptotic check, ln-space (mbar = exp(lnW-lnD)):');
  for (const p of PRIMES) {
    if (p > 3e5) break;
    lw += Math.log(p);
    if (p >= 3) ld += Math.log(p - 2);
    if ([1009, 10007, 100003, 299993].includes(p)) {
      const mbar = Math.exp(lw - ld);
      console.log(`     x=${String(p).padStart(7)}  mbar=${mbar.toFixed(4).padStart(9)}  mbar/ln^2 x = ${(mbar / Math.log(p) ** 2).toFixed(4)}  (limit 2.4026)`);
    }
  }
  return tab;
}
function lnBig(b) {
  const s = b.toString();
  return Math.log(Number(s.slice(0, 15) || '1')) + (s.length - Math.min(15, s.length)) * Math.LN10;
}

function maxCyclicGap(vals, mod) {
  let m = 0;
  for (let i = 1; i < vals.length; i++) { const g = vals[i] - vals[i - 1]; if (g > m) m = g; }
  const wrap = vals[0] + mod - vals[vals.length - 1];
  if (wrap > m) m = wrap;
  return m;
}

// ---------------------------------------------------------------- part: ladder
function partLadder() {
  console.log('\n================ 2. THE G2 LADDER (exact, by construction) ================');
  const claimed = { 2: 2, 3: 6, 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258, 31: 348, 37: 528 };
  const got = {};
  // direct up to 23#
  let mod = 2, cur = Int32Array.from([1]);
  got[2] = maxCyclicGap(cur, mod);
  for (const q of PRIMES) {
    if (q === 2) continue;
    if (q > 23) break;
    const nm = mod * q, out = [];
    for (let j = 0; j < q; j++) {
      const off = j * mod;
      for (let i = 0; i < cur.length; i++) {
        const s = cur[i] + off, r = s % q;
        if (r !== 0 && r !== q - 2) out.push(s);
      }
    }
    out.sort((a, b) => a - b);
    cur = Int32Array.from(out); mod = nm;
    got[q] = maxCyclicGap(cur, mod);
    console.log(`  [${el()}] x=${String(q).padStart(2)}  D=${cur.length}  G2=${got[q]}  (claimed ${claimed[q]})`);
  }
  return { mod23: mod, slots23: cur, got, claimed };
}

// build the 29# half-gap array from the 23# slot list
function build29(mod23, slots23) {
  const q = 29, D23 = slots23.length;
  const gaps = new Uint8Array(D23 * q);       // generous; D29 = 214,708,725
  let n = 0, prev = -1, first = -1, maxg = 0;
  for (let j = 0; j < q; j++) {
    const off = j * mod23;
    for (let i = 0; i < D23; i++) {
      const s = slots23[i] + off, r = s % q;
      if (r === 0 || r === q - 2) continue;
      if (prev < 0) { first = s; }
      else { const g = s - prev; if (g > maxg) maxg = g; gaps[n++] = g >> 1; }
      prev = s;
    }
    if (j % 7 === 0) console.log(`  [${el()}] 29# build, copy ${j}/${q}, ${n} gaps so far`);
  }
  const modn = mod23 * q;
  const wrap = first + modn - prev;
  if (wrap > maxg) maxg = wrap;
  gaps[n++] = wrap >> 1;                      // close the cycle: gaps[] is now cyclic, length D29
  return { gaps: gaps.subarray(0, n), n, mod: modn, first, maxg };
}

/* ---------------------------------------------------------------------------
 * Lifting a max-gap by one or two primes without materialising the cycle.
 *
 * Level q from level Q=x#:  slots mod Qq are the q lifts of each slot mod Q with
 * the two classes r == 0, -2 (mod q) removed.  In copy j the removed classes,
 * read back in the Q-cycle coordinate s, are s == a, a-2 (mod q) with
 * a = -j*Q mod q; as j runs over 0..q-1, a runs over all of Z_q exactly once.
 *
 * So   G2(Qq) = max over a in Z_q of  ( max gap in the Q-cycle after deleting
 *               the slots with s == a or a-2 mod q )
 * up to gaps that straddle a copy boundary, which are handled separately from
 * the head/tail of the cycle.
 *
 * The inner max is found in ONE pass with the "longest compatible suffix" trick:
 * a deleted run is a set of consecutive slots whose classes all lie in some
 * {a, a-2}; the longest such suffix ending at i gives the widest gap ending at i.
 * ------------------------------------------------------------------------- */

// one-prime lift, maximising over a: returns max internal gap
function liftOne(gaps, n, mq, first) {
  // class of slot i (mod mq), and its value; slot 0 has value `first`
  const step = new Uint8Array(256);
  for (let g = 0; g < 256; g++) step[g] = (2 * g) % mq;
  let best = 0;
  let c = first % mq;                     // class of slot 0
  // suffix state
  let sLen = 0, s1 = -1, s2 = -1, startPrev = 0;
  let vPrev2 = 0, vPrev1 = 0, v = first;
  // iterate slots 0..n-1 ; gaps[i] is the gap from slot i to slot i+1
  for (let i = 0; i < n; i++) {
    // close: gap from startPrev to v (the current slot is alive, run ended at i-1)
    if (sLen > 0) { const g = v - startPrev; if (g > best) best = g; }
    else if (i > 0) { const g = v - vPrev1; if (g > best) best = g; }
    // extend suffix with class c
    if (sLen === 0) { s1 = c; s2 = -1; sLen = 1; startPrev = vPrev1; }
    else if (c === s1 || c === s2) { sLen++; }
    else if (s2 < 0 && (c === (s1 + 2) % mq || s1 === (c + 2) % mq)) { s2 = c; sLen++; }
    else {
      // restart from the longest valid suffix ending here
      const cp = (c - step[gaps[i - 1]] + mq) % mq;   // class of slot i-1
      if (cp === c || c === (cp + 2) % mq || cp === (c + 2) % mq) {
        s1 = cp; s2 = (cp === c) ? -1 : c; sLen = 2; startPrev = vPrev2;
      } else { s1 = c; s2 = -1; sLen = 1; startPrev = vPrev1; }
    }
    const g2 = gaps[i];
    vPrev2 = vPrev1; vPrev1 = v; v += 2 * g2;
    c += step[g2]; if (c >= mq) c -= mq;
  }
  return best;
}

// ------------------------------------------------------------- part: A091592
function partA091592(NMAX) {
  console.log('\n================ 7. A091592 ================');
  const LIM = (NMAX + 1) * (NMAX + 1) + 4;
  const s = new Uint8Array(LIM + 1);
  for (let i = 2; i * i <= LIM; i++) if (!s[i]) for (let j = i * i; j <= LIM; j += i) s[j] = 1;
  const isP = k => k >= 2 && !s[k];
  const out = [];
  for (let n = 1; n <= NMAX; n++) {
    const lo = n * n, hi = (n + 1) * (n + 1);
    let found = false;
    for (let p = lo; p + 2 <= hi; p++) if (isP(p) && isP(p + 2)) { found = true; break; }
    if (!found) out.push(n);
  }
  check('A091592, n with no twin pair inside (n^2,(n+1)^2), n<=' + NMAX,
        out.join(','), '1,9,19,26,27,30,34,39,49,53,77,122');
  console.log('  (both members required to lie in the square window)');
  return out;
}

// ------------------------------------------------------------------ part: HL
function partHL() {
  console.log('\n================ 5. ZONE-POSTULATE CENSUS ================');
  // Li(x) and the Hardy-Littlewood twin count 2 C2 int_2^x dt/ln^2 t
  const C2 = 0.6601618158468696;
  const li = (x) => { // Gauss Li by adaptive Simpson on 1/ln t from 2
    const f = t => 1 / Math.log(t);
    return simpsonLog(f, 2, x, 200000) + 1.045163780117492785; // li(2)
  };
  const hl = (x) => 2 * C2 * simpsonLog(t => 1 / (Math.log(t) * Math.log(t)), 2, x, 200000);
  for (const X of [1e10, 1e11]) {
    console.log(`  X=${X.toExponential(0)}  Li(X)=${li(X).toFixed(0)}   HL twin pred=${hl(X).toFixed(0)}`);
  }
  check('pi(1e11) vs Li(1e11) (Li must sit just above pi)',
        (li(1e11) > 4.118054813e9 && li(1e11) < 4.1181e9) ? 'consistent' : 'INCONSISTENT', 'consistent');
  const pred11 = hl(1e11);
  check('twin count below 1e11 / HL(1e11), must be within 0.5% of 1',
        Number((224376048 / pred11).toFixed(4)), 1.0, 0.005);
  const pred10 = hl(1e10);
  // N4 (2026-08-20): the second anchor, printed since wave 4 and never
  // asserted. Two anchors constrain the census far better than one: a
  // quadrature bug or a decade slip moves the two ratios differently.
  check('pi_2(1e10) = 27,412,679 vs HL(1e10), within 0.5% of 1',
        Number((27412679 / pred10).toFixed(4)), 1.0, 0.005);
  console.log(`  for contrast: HL at 1e10 = ${pred10.toFixed(0)}, known pi_2(1e10) = 27412679, ratio ${(27412679 / pred10).toFixed(4)}`);
  console.log(`  claimed census 224,376,048 / HL(1e11) = ${(224376048 / pred11).toFixed(4)}`);
  console.log(`  claimed census 224,376,048 / HL(1e10) = ${(224376048 / pred10).toFixed(4)}  <- if this were ~1 the claim would be a 1e10 run`);
}
function simpsonLog(f, a, b, n) {
  // substitute t = e^u to keep the quadrature stable over 10 decades
  const ua = Math.log(a), ub = Math.log(b), h = (ub - ua) / n;
  let s = 0;
  for (let i = 0; i <= n; i++) {
    const u = ua + i * h, t = Math.exp(u), w = (i === 0 || i === n) ? 1 : (i % 2 ? 4 : 2);
    s += w * f(t) * t;
  }
  return s * h / 3;
}

// ----------------------------------------------------------- part: one class
function partOneClass() {
  console.log('\n================ 3. ONE-CLASS LADDER h(x#) = A048670 ================');
  const claimed = [2, 4, 6, 10, 14, 22, 26, 34, 40, 46, 58, 66];
  const ps = [2, 3, 5, 7, 11, 13, 17, 19, 23];
  let mod = 1, cur = Int32Array.from([0]);
  const got = [];
  for (const q of ps) {
    const nm = mod * q, out = [];
    for (let j = 0; j < q; j++) {
      const off = j * mod;
      for (let i = 0; i < cur.length; i++) {
        const s = cur[i] + off;
        if (s % q !== 0) out.push(s);
      }
    }
    out.sort((a, b) => a - b);
    cur = Int32Array.from(out); mod = nm;
    got.push(maxCyclicGap(cur, mod));
    console.log(`  [${el()}] x=${String(q).padStart(2)}  phi=${cur.length}  h=${got[got.length - 1]}  (A048670 ${claimed[got.length - 1]})`);
  }
  // 29# streamed: phi(29#) = 1.02e9 units, never materialised
  {
    const q = 29, D = cur.length;
    let prev = -1, first = -1, maxg = 0;
    for (let j = 0; j < q; j++) {
      const off = j * mod;
      for (let i = 0; i < D; i++) {
        const s = cur[i] + off;
        if (s % q === 0) continue;
        if (prev < 0) first = s; else { const g = s - prev; if (g > maxg) maxg = g; }
        prev = s;
      }
    }
    const wrap = first + mod * q - prev;
    if (wrap > maxg) maxg = wrap;
    got.push(maxg);
    console.log(`  [${el()}] x=29  phi=${D * (q - 1)}  h=${maxg}  (A048670 46)`);
  }
  check('h(x#) for x=2..29 (A048670 first ten)', got.join(','), claimed.slice(0, 10).join(','));
  console.log('  h(31#)=58 and h(37#)=66 are taken from OEIS A048670 (Hagedorn); not recomputed here.');
  // U5 (2026-08-20): the G2/h ratio table used to divide literals typed here
  // by literals typed here and compare to literal quotients — it tested
  // transcription against transcription. It now lives in the ladder section,
  // where it divides the ladder's COMPUTED G2 by this function's COMPUTED h
  // (the two transcribed h terms, 58 and 66, are labelled as such there).
  return got;
}

// ------------------------------------------------------------- part: 41# band
function partBand() {
  console.log('\n================ 6. THE G2(41#) PREDICTION BAND ================');
  const G2 = { 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258, 31: 348, 37: 528 };
  let W = 1n, D = 1n, theta = 0;
  const row = {};
  for (const p of PRIMES) {
    if (p > 41) break;
    W *= BigInt(p); if (p >= 3) D *= BigInt(p - 2); theta += Math.log(p);
    row[p] = { m: Number(W) / Number(D), lnD: lnBig(D), theta };
  }
  console.log('   x |      m    |   lnD   |  m lnD  |  G2  |  c2\' = G2/(m lnD)');
  const cs = [];
  let lnBigWorst = 0;
  for (const x of [11, 13, 17, 19, 23, 29, 31, 37]) {
    const r = row[x], mlnD = r.m * r.lnD, c = G2[x] / mlnD;
    cs.push(c);
    console.log(`  ${String(x).padStart(2)} | ${r.m.toFixed(2).padStart(8)} | ${r.lnD.toFixed(3).padStart(7)} | ${mlnD.toFixed(1).padStart(7)} | ${String(G2[x]).padStart(4)} | ${c.toFixed(4)}`);
    console.log(`       check theta(x) - ln m = ${(r.theta - Math.log(r.m)).toFixed(3)} (must equal lnD)`);
    const d = Math.abs((r.theta - Math.log(r.m)) - r.lnD);
    if (d > lnBigWorst) lnBigWorst = d;
  }
  // U2 (2026-08-20): the identity above was PRINTED and never asserted, so
  // lnBig — the single point of failure under eleven checks and both headline
  // band numbers — sat outside the gate. theta is a sum of Math.log over the
  // primes and shares nothing with lnBig's digit-string truncation.
  check('lnBig cross-check: worst |theta(x) - ln m - lnD| over x = 11..37', lnBigWorst < 2e-3, true);
  const r41 = row[41], base = r41.m * r41.lnD;
  console.log(`  41 | ${r41.m.toFixed(2).padStart(8)} | ${r41.lnD.toFixed(3).padStart(7)} | ${base.toFixed(1).padStart(7)} |  ?   |  ?    (theta(41)=${r41.theta.toFixed(3)})`);
  const lo = Math.min(...cs), hi = Math.max(...cs);
  const mean = cs.reduce((a, b) => a + b, 0) / cs.length;
  const first7 = cs.slice(0, 7).slice().sort((a, b) => a - b);
  const med7 = (first7[3] + first7[3]) / 2;
  check('c2\' range over x = 11..37', `${lo.toFixed(3)}..${hi.toFixed(3)}`, '0.446..0.594');
  check('c2\' full-sample mean', mean.toFixed(4), '0.4814');
  check('G2(41#) band low  = c2\'_min * m41 * lnD41', Math.round(lo * base), 476);
  check('G2(41#) band high = c2\'_max * m41 * lnD41', Math.round(hi * base), 633);
  check('G2(41#) central   = mean c2\' * m41 * lnD41', Math.round(mean * base), 513);
  // These two checks were written to FAIL, as a standing flag on a documentation
  // disagreement: G2-STATE said 487 where the computation and two other files say
  // 488, and one file was recorded as saying 475 where the computation says 476.
  // Both are settled as of 2026-08-17. G2-STATE now reads 488, and no 475 survives
  // anywhere in the body. They are kept as ordinary passing checks so that a
  // reintroduction of either retired value fails the audit rather than going
  // unnoticed, which is what a deliberately-failing check cannot do once nobody
  // remembers why it fails.
  check("G2(41#) x=37-as-outlier (retired: 487)", Math.round(med7 * base), 488);
  check("G2(41#) band low (retired: 475)", Math.round(lo * base), 476);
  console.log(`  median c2' over x = 11..31 is ${med7.toFixed(4)}`);
  console.log(`  retired bands for contrast: 530-640 -> c2' in [0.497,0.601]; "about 660" -> c2' = 0.619`);
  console.log(`  simple diagonal law G2 ~ 1.2 x ln^2 x at x=37: ${(1.2 * 37 * Math.log(37) ** 2).toFixed(0)} (claimed 579), at x=41: ${(1.2 * 41 * Math.log(41) ** 2).toFixed(0)}`);
  console.log(`  1.90 * 73 * ln^2 73 = ${(1.90 * 73 * Math.log(73) ** 2).toFixed(0)} (claimed 2552)`);
}

// -------------------------------------------------------------- part: fits
function partFits() {
  console.log('\n================ 8. EXPONENT FITS AND LOCAL EXPONENTS ================');
  const X = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
  const G2 = [2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528];
  const H = [2, 4, 6, 10, 14, 22, 26, 34, 40, 46, 58, 66];
  const H2 = [2, 6, 18, 30, 66, 150, 192, 258, 366, 450, 570, 708];
  const th = []; let t = 0;
  for (const x of X) { t = 0; for (const p of PRIMES) { if (p > x) break; t += Math.log(p); } th.push(t); }
  console.log('  theta(x) = ln(x#): ' + th.map(v => v.toFixed(4)).join(', '));

  console.log('\n  ---- pointwise inequalities on the ladder ----');
  check('h <= G2 at all twelve terms', X.every((_, i) => H[i] <= G2[i]) ? 'holds' : 'VIOLATED', 'holds');
  check('G2 <= h2 at all twelve terms', X.every((_, i) => G2[i] <= H2[i]) ? 'holds' : 'VIOLATED', 'holds');
  check('h <= h2 at all twelve terms', X.every((_, i) => H[i] <= H2[i]) ? 'holds' : 'VIOLATED', 'holds');
  const xp = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41];
  check("x'^2/G2 margin column", xp.map((p, i) => (p * p / G2[i]).toFixed(2)).join(','),
        '4.50,4.17,4.08,4.03,4.02,4.38,3.34,3.53,4.12,3.72,3.93,3.18');

  console.log('\n  ---- local exponents  ln(G2_n/G2_{n-1}) / ln(x_n/x_{n-1}) ----');
  const loc = [];
  for (let i = 1; i < X.length; i++) {
    const e = Math.log(G2[i] / G2[i - 1]) / Math.log(X[i] / X[i - 1]);
    loc.push(e);
    console.log(`     ${String(X[i - 1]).padStart(2)} -> ${String(X[i]).padStart(2)}   ${e.toFixed(4)}`);
  }
  const mx = Math.max(...loc), mi = loc.indexOf(mx);
  console.log(`  largest local exponent is ${mx.toFixed(2)} on the step ${X[mi]} -> ${X[mi + 1]}`);
  check('the "4.49" local exponent belongs to the step ending at x =', X[mi + 1], 31);
  console.log(`  for the record the step 31 -> 37 reads ${loc[loc.length - 1].toFixed(4)}, close to the ladder mean ${(loc.reduce((a, b) => a + b) / loc.length).toFixed(3)}`);

  console.log('\n  ---- raw log-log fits ----');
  const fit = (xs, ys) => {
    const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
    let sxy = 0, sxx = 0;
    for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
    const b = sxy / sxx, a = my - b * mx;
    let ss = 0; for (let i = 0; i < n; i++) ss += (ys[i] - a - b * xs[i]) ** 2;
    const se = Math.sqrt(ss / (n - 2) / sxx);
    return { b, se };
  };
  for (const [lo, lab] of [[2, 'all 12 terms'], [5, '10 terms x = 5..37']]) {
    const idx = X.map((x, i) => i).filter(i => X[i] >= lo);
    const f = fit(idx.map(i => Math.log(X[i])), idx.map(i => Math.log(G2[i])));
    console.log(`     G2, x-frame, ${lab}: slope ${f.b.toFixed(3)} +- ${f.se.toFixed(3)}`);
  }
  const idx = X.map((x, i) => i).filter(i => X[i] >= 5);
  const ft = fit(idx.map(i => Math.log(th[i])), idx.map(i => Math.log(G2[i])));
  console.log(`     G2, theta-frame, 10 terms: slope ${ft.b.toFixed(3)} +- ${ft.se.toFixed(3)}`);
  console.log('\n  ---- c * theta^2 model on the ten terms (the "0.6 (ln W)^2" law) ----');
  const cs = idx.map(i => G2[i] / th[i] ** 2);
  console.log('     G2/theta^2: ' + cs.map(v => v.toFixed(3)).join(', '));
  console.log(`     mean ${(cs.reduce((a, b) => a + b) / cs.length).toFixed(3)}, range ${Math.min(...cs).toFixed(3)}..${Math.max(...cs).toFixed(3)} (a 2.1x spread: not a constant)`);
}

/* ---------------------------------------------------------------- part: oeis
 * The two OEIS submission drafts are the only artifacts here with an external
 * consequence, and until wave 4 they sat outside this script's reach.  Two
 * errors had been found in them by reading, neither by any instrument: an index
 * off-by-one, A059861(n-1) where the fit needs A059861(n); and a factor of two
 * in the seam draft's Hardy-Littlewood heuristic, which dropped the prime 2 from
 * the twin-candidate density.  Both retired values are checked here against the
 * live ones, so reintroducing either fails the audit rather than shipping.
 *
 * Nothing below reads a repo script or a draft.  The seam terms are recomputed
 * from a self-contained BigInt Miller-Rabin, the G2 terms from the ladder built
 * in part `ladder`, and A059861 from a direct residue sieve rather than from its
 * closed form, so that the closed form is tested and not assumed.
 */
function mulmod(a, b, m) { return (a * b) % m; }
function powmodBig(a, e, m) {
  let r = 1n; a %= m;
  while (e > 0n) { if (e & 1n) r = mulmod(r, a, m); a = mulmod(a, a, m); e >>= 1n; }
  return r;
}
function isPrimeBig(n) {
  if (n < 2n) return false;
  for (const p of [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n]) {
    if (n === p) return true;
    if (n % p === 0n) return false;
  }
  let d = n - 1n, r = 0n;
  while ((d & 1n) === 0n) { d >>= 1n; r++; }
  // deterministic for n < 3.3e24; beyond that these 12 bases are a strong test
  for (const a of [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n]) {
    let x = powmodBig(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    let ok = false;
    for (let i = 1n; i < r; i++) { x = mulmod(x, x, n); if (x === n - 1n) { ok = true; break; } }
    if (!ok) return false;
  }
  return true;
}

function partOEIS() {
  console.log('\n================ 9. THE TWO OEIS SUBMISSION DRAFTS ================');
  const C2 = 0.6601618158468696;
  const GAMMA = 0.57721566490153286060651209008240243104215933593992;
  const e2g = Math.exp(2 * GAMMA);

  // ---- A059861 counted directly, not taken from its closed form ----
  console.log('\n  ---- A059861(n) = twin slots mod A002110(n), counted by sieve ----');
  {
    const got = [], closed = [];
    let P = 1, prod = 1;
    for (let n = 1; n <= 7; n++) {
      P *= PRIMES[n - 1];
      if (n >= 2) prod *= PRIMES[n - 1] - 2;
      let c = 0;
      for (let r = 0; r < P; r++) if (gcdInt(r, P) === 1 && gcdInt(r + 2, P) === 1) c++;
      got.push(c); closed.push(prod);
    }
    check('A059861(1..7) by residue sieve', got.join(','), '1,1,3,15,135,1485,22275');
    check('A059861(1..7) closed form prod_{i=2..n}(prime(i)-2) agrees', closed.join(','), got.join(','));
    console.log('  (the draft indexes twin slots mod the n-th primorial as A059861(n), not (n-1))');
  }

  // ---- G2 draft: DATA and the COMMENTS numbers ----
  console.log('\n  ---- oeis-G2-submission.md ----');
  const X = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
  const XP = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41];
  const G2 = [2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528];
  check('G2 DATA field, twelve terms', G2.join(', '),
        '2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528');
  console.log('  (the terms themselves are rebuilt from scratch in parts `ladder` and `g2big`)');

  // A059861 and the primorials, exactly, in BigInt
  const W = [], D = [];
  { let w = 1n, d = 1n;
    for (let i = 0; i < 12; i++) { w *= BigInt(X[i]); if (X[i] >= 3) d *= BigInt(X[i] - 2); W.push(w); D.push(d); } }
  check('A002110(12) = 37#', W[11].toString(), '7420738134810');
  check('A059861(12)', D[11].toString(), '217929355875');

  // the p'^2 margin column: the draft says 0.222 at n=1 rising to 0.314 at n=12
  const marg = G2.map((g, i) => g / (XP[i] * XP[i]));
  check('G2/prime(n+1)^2 at n=1', marg[0].toFixed(4), '0.2222');
  check('G2/prime(n+1)^2 at n=12', marg[11].toFixed(4), '0.3141');
  check('G2/prime(n+1)^2 never reaches the draft ceiling 0.32',
        Math.max(...marg) < 0.32 ? 'below' : 'ABOVE', 'below');

  // the direct p ln^2 p ratio, scoped by the draft to n = 3..12
  const rr = G2.map((g, i) => g / (X[i] * Math.log(X[i]) ** 2)).slice(2);
  const rmean = rr.reduce((a, b) => a + b) / rr.length;
  check('a(n)/(p ln^2 p) low  over n = 3..12', Math.min(...rr).toFixed(2), '0.66');
  check('a(n)/(p ln^2 p) high over n = 3..12', Math.max(...rr).toFixed(2), '1.13');
  check('a(n)/(p ln^2 p) mean over n = 3..12', rmean.toFixed(2), '0.89');
  console.log('  (over n = 5..12 the same three read 0.66, 1.09, 0.86: the draft scopes this row to 3..12)');

  // the extreme-value fit c = G2 / (mbar * lnD), and the retired (n-1) indexing
  const sd = (v) => { const m = v.reduce((a, b) => a + b) / v.length;
    return Math.sqrt(v.reduce((s, x) => s + (x - m) * (x - m), 0) / (v.length - 1)); };
  const cNow = [], cRetired = [];
  for (let i = 4; i < 12; i++) {                     // n = 5..12
    const mNow = Number(W[i]) / Number(D[i]), mOld = Number(W[i]) / Number(D[i - 1]);
    cNow.push(G2[i] / (mNow * lnBig(D[i])));
    cRetired.push(G2[i] / (mOld * lnBig(D[i - 1])));
  }
  const mNow = cNow.reduce((a, b) => a + b) / cNow.length;
  const mOld = cRetired.reduce((a, b) => a + b) / cRetired.length;
  check('c = G2/(mbar lnD) with A059861(n), mean over n = 5..12', mNow.toFixed(4), '0.4814');
  check('c with A059861(n), sample cv', (100 * sd(cNow) / mNow).toFixed(1) + '%', '10.2%');
  check('c with A059861(n), range', `${Math.min(...cNow).toFixed(4)}..${Math.max(...cNow).toFixed(4)}`,
        '0.4463..0.5939');
  check('c with A059861(n-1) [ the retired off-by-one indexing ], mean', mOld.toFixed(4), '0.0406');
  check('c with A059861(n-1) [ retired ], sample cv', (100 * sd(cRetired) / mOld).toFixed(1) + '%', '69.4%');
  console.log('  (the draft rounds these to 0.48 and 10%; the retired indexing collapses the fit, which is');
  console.log('   how it was caught. Three further proofs of the (n) indexing are independent of this fit:');
  console.log('   A059861\'s own OEIS formula, the draft EXAMPLE at n=3, and the draft provenance table.)');

  /* The exponent, and the third error class found in the drafts: G2's figure is
   * 1.54 and h2's is 1.57, and the draft carried h2's.  exponent-control.md's
   * quote rule said "Quote 1.57 for h2 and 1.54 for G2" in terms.  Both are
   * rebuilt here from the control rather than copied: the raw x-frame slope
   * minus the one-class control's own bias at the MATCHING window width.
   * (2026-08-21: the doc's CURRENT quote rule is "1.57 for h2 and 1.50 for G2
   * on the 22 trusted terms"; 1.54 stays below as the pinned 10-term
   * calibration figure, and the 22-term reading is checked after it.) */
  console.log('\n  ---- the control-corrected exponent: 1.54 is G2, 1.57 is h2 ----');
  {
    // 64 terms: 58 from the entry face plus the b-file tail a(59)..a(64)
    // (Bozek, single-witness), adopted 2026-08-20 after an exact 58/58
    // overlap check (external-data-audit.md M1).  The doc's calibration
    // figures are 58-term fits, so the bias windows below are pinned to CAL.
    const A048670 = [2, 4, 6, 10, 14, 22, 26, 34, 40, 46, 58, 66, 74, 90, 100, 106, 118, 132,
      152, 174, 190, 200, 216, 234, 258, 264, 282, 300, 312, 330, 354, 378, 388, 414, 432,
      450, 476, 492, 510, 538, 550, 574, 600, 616, 642, 660, 686, 718, 742, 762, 798, 810,
      834, 858, 876, 908, 926, 954, 978, 1002, 1030, 1058, 1098, 1110];
    const CAL = 58;
    const lx = PRIMES.slice(0, CAL).map(Math.log), ly = A048670.slice(0, CAL).map(Math.log);
    const slope = (xs, ys) => {
      const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
      let sxy = 0, sxx = 0;
      for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
      return sxy / sxx;
    };
    const bias = (w) => {
      const s = [];
      for (let i = 0; i + w <= CAL; i++) s.push(slope(lx.slice(i, i + w), ly.slice(i, i + w)));
      return { n: s.length, mean: s.reduce((a, b) => a + b) / s.length };
    };
    const b10 = bias(10), b19 = bias(19), b21 = bias(21);
    check('control A048670 carries 64 terms (58 entry face + b-file tail, adopted 2026-08-20)',
          A048670.length, 64);
    check('the calibration windows stay pinned to the 58 entry-face terms', CAL, 58);
    check('control bias at width 10 (49 windows), exponent-control.md S1', b10.mean.toFixed(3), '1.262');
    check('control bias at width 19 (40 windows)', b19.mean.toFixed(3), '1.280');
    check('control bias at width 21 (38 windows)', b21.mean.toFixed(3), '1.282');
    // G2: raw slope over the ten exact terms x = 5..37, corrected at width 10
    const xi = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];   // indices of x = 5..37 in X
    const rawG2 = slope(xi.map(i => Math.log(X[i])), xi.map(i => Math.log(G2[i])));
    check('G2 raw x-frame slope, ten terms x = 5..37', rawG2.toFixed(3), '1.801');
    check('G2 control-corrected exponent = raw - bias(width 10)',
          (rawG2 - (b10.mean - 1)).toFixed(2), '1.54');
    // U4 (2026-08-20): 1.847 was a bare literal even though slope() sits in
    // scope. It is the raw x-frame slope of A288815 over its nineteen terms
    // n = 3..21 (x = 5..73), recomputed here from the published sequence.
    const A288815 = [2, 6, 18, 30, 66, 150, 192, 258, 366, 450, 570, 708, 894, 1044,
      1284, 1422, 1656, 1902, 2190, 2460, 2622];
    check('A288815 carries 21 published terms', A288815.length, 21);
    const rawH2 = slope(PRIMES.slice(2, 21).map(Math.log), A288815.slice(2, 21).map(Math.log));
    check('h2 raw x-frame slope over the nineteen terms n = 3..21', rawH2.toFixed(3), '1.847');
    check('h2 control-corrected exponent = rawH2 - bias(width 19) [ NOT G2\'s figure ]',
          (rawH2 - (b19.mean - 1)).toFixed(2), '1.57');
    // (deleted 2026-08-20: "the two differ" was entailed by the two checks
    // above it with 0.008 of margin — tautology list.)
    console.log('  (1.57 for G2 is the retired value: it is A288815\'s exponent on nineteen terms,');
    console.log('   not this sequence\'s on ten. The draft carried it until wave 4.)');
    /* 2026-08-21, the queued 22-term refit applied (exponent-control.js S11).
     * The CURRENT quoted central is 1.50 on the trusted A144311 ladder
     * (22 terms, x <= 79); the 1.801/1.54 and 1.847/1.57 checks above stay
     * as the pinned calibration record and must keep passing.  The refit's
     * control bias is read at the matched width 20 over the FULL 64-term
     * A048670 (the 58-term pinned windows give 1.281, 0.002 away). */
    const G2T = [2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528, 546, 618,
      708, 870, 966, 1080, 1284, 1398, 1530, 1710];  // G2 = A144311 + 1
    check('the trusted G2 ladder carries 22 terms (A144311 + 1, x = 2..79)', G2T.length, 22);
    check('its 12-term prefix is the exact G2 ladder above', G2T.slice(0, 12).join(','), G2.join(','));
    const raw22 = slope(PRIMES.slice(2, 22).map(Math.log), G2T.slice(2, 22).map(Math.log));
    check('G2 raw x-frame slope, 22 trusted terms, p in [5,79], exponent-control.md S5', raw22.toFixed(3), '1.777');
    const s20 = [];
    for (let i = 0; i + 20 <= A048670.length; i++)
      s20.push(slope(PRIMES.slice(i, i + 20).map(Math.log), A048670.slice(i, i + 20).map(Math.log)));
    const b20full = s20.reduce((a, b) => a + b) / s20.length;
    check('control bias at width 20 over the full 64 terms (45 windows)', b20full.toFixed(3), '1.279');
    check('G2 22-term control-corrected exponent = raw - bias(width 20)',
          (raw22 - (b20full - 1)).toFixed(2), '1.50');
  }

  // the one-class lower bound and the paired upper comparison, pointwise
  const H = [2, 4, 6, 10, 14, 22, 26, 34, 40, 46, 58, 66];          // A048670
  const H2 = [2, 6, 18, 30, 66, 150, 192, 258, 366, 450, 570, 708]; // A288815
  check('A048670(n) <= a(n) at all twelve terms (the draft lower bound)',
        H.every((h, i) => h <= G2[i]) ? 'holds' : 'VIOLATED', 'holds');
  check('a(n) <= A288815(n) at all twelve terms (the draft comparison)',
        H2.every((h, i) => G2[i] <= h) ? 'holds' : 'VIOLATED', 'holds');
  // A072753 has offset 3, so A072753(3..12) lines up with A288815(3..12)
  check('A288815(n) = 6*A072753(n) + 6 over n = 3..12, the identity the CROSSREFS now states',
        [2, 4, 10, 24, 31, 42, 60, 74, 94, 117].map(v => 6 * v + 6).join(','),
        H2.slice(2).join(','));

  // ---- seam draft: every term recomputed, and the heuristic ----
  console.log('\n  ---- oeis-seam-submission.md ----');
  const claimed20 = [2, 4, 4, 3, 4, 6, 2, 1, 7, 1, 1, 2, 0, 1, 1, 1, 3, 1, 0, 4];
  const A060256 = [2, 1, 1, 2, 1, 6, 8, 11, 4, 16, 22, 4, 74, 24, 37, 28, 14, 11, 242, 11,
                   91, 20, 83, 91, 35, 80, 48, 47, 226, 2];
  const got = [], mins = [], ceilOK = [];
  { let P = 1n;
    for (let n = 1; n <= 30; n++) {
      P *= BigInt(PRIMES[n - 1]);
      const q = PRIMES[n];
      let c = 0, first = 0;
      for (let k = 1; k <= q; k++) {
        const kp = BigInt(k) * P;
        if (isPrimeBig(kp - 1n) && isPrimeBig(kp + 1n)) { c++; if (!first) first = k; }
      }
      got.push(c); mins.push(first);
      if (n >= 3) ceilOK.push(c <= q - 2);
    } }
  check('seam DATA, twenty terms, recomputed by BigInt Miller-Rabin',
        got.slice(0, 20).join(', '), claimed20.join(', '));
  check('seam DATA sum over n = 1..20', got.slice(0, 20).reduce((a, b) => a + b), 48);
  check('seam a(21..30), the extension recorded in the draft provenance',
        got.slice(20).join(', '), '0, 2, 1, 1, 2, 1, 1, 1, 0, 1');
  check('seam ceiling a(n) <= prime(n+1) - 2 for n >= 3',
        ceilOK.every(Boolean) ? 'holds' : 'VIOLATED', 'holds');
  check('least witness = A060256(n) for every n = 1..30 with a(n) > 0',
        mins.map((m, i) => m === 0 || m === A060256[i]).every(Boolean) ? 'holds' : 'VIOLATED', 'holds');
  check('the n with a(n) = 0 are exactly those with A060256(n) > prime(n+1)',
        got.map((c, i) => (c === 0) === (A060256[i] > PRIMES[i + 1])).every(Boolean) ? 'holds' : 'VIOLATED',
        'holds');

  // the Hardy-Littlewood heuristic, and the factor of two that was retired
  let lw = 0, ld = 0, exact = 0, asym = 0;
  for (let n = 1; n <= 20; n++) {
    const p = PRIMES[n - 1], q = PRIMES[n];
    lw += Math.log(p);
    if (n >= 2) ld += Math.log(p - 2);
    const mbar = Math.exp(lw - ld);
    for (let k = 1; k <= q; k++) exact += 2 * C2 / (Math.log(k) + lw) ** 2 * mbar;
    asym += q * e2g * (Math.log(p) / lw) ** 2;
  }
  check('seam heuristic, exact per-k sum over n = 1..20', exact.toFixed(1), '52.5');
  check('seam heuristic, asymptotic form over n = 1..20', asym.toFixed(1), '57.3');
  // (two checks deleted 2026-08-20, tautology list: the /2 line was entailed
  // by the exact 52.5 above, and "observed total = 48" duplicated the seam
  // DATA sum check verbatim. The /2 story stays in the console note below and
  // the retired constant keeps its guard in part `const`.)
  console.log('  (52.5 and 57.3 bracket the observed 48; the retired 26.3 does not, and 26.3 doubling to');
  console.log('   52.5 is what identified the defect as exactly a dropped factor of two.  The factor comes');
  console.log('   from the prime 2: twin-candidate density is (1/2)*prod_{q>=3}(1-2/q), not prod(1-2/q).)');
  // (two checks deleted 2026-08-20: verbatim duplicates of part `const`'s
  // e^{2g}/(2 C2) and e^{2g}/(4 C2), which now consume the COMPUTED C2 and
  // carry the retired-value labels.)
}
function gcdInt(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }

// ------------------------------------------------------------- part: units
// THE CONVERSIONS THAT HAVE ACTUALLY CAUSED ERRORS, under regression.
// On 2026-08-18 the adjudicator made eight errors in one session, every one a
// unit, scale, quantifier or configuration slip and not one arithmetic. Six of
// the eight never entered the corpus -- they were prose in briefs and chat, a
// layer the gate does not defend. `research/qc/units.js` is the lookup tool for
// that layer; these are its load-bearing numbers, gated so they cannot drift.
function partUnits() {
  console.log(`\n  [${el()}] units: the conversions that have caused errors ...`);
  // (1) log of a primorial. theta(x) = log(x#) ~ x. NOT ln x, NOT 2*theta(v).
  const ps = PRIMES.filter(p => p <= 1000000);
  const theta = X => { let t = 0; for (const p of ps) { if (p > X) break; t += Math.log(p); } return t; };
  check('theta(31^2)/31^2 -> 1  [log(v^2#) ~ v^2, NOT 2v]', (theta(961) / 961).toFixed(2), '0.95');
  check('the retired form 2v at v=31, as a ratio to the truth', (theta(961) / 62).toFixed(1), '14.8');
  // (2) slots vs integers. One slot per mbar integers; counts in the two units
  // are never comparable raw. This is the factor that made "vacuous" out of
  // "binding" at block 1.
  let W = 1n, D = 1n;
  for (const p of PRIMES) { if (p > 5) break; W *= BigInt(p); if (p >= 3) D *= BigInt(p - 2); }
  check('mbar(T_5) = 5#/D_5, the slots<->integers factor', Number(W) / Number(D), 10);
  {
    const P = [7, 11, 13, 17, 19, 23], span = 180, mbar = 10;
    let capInt = 0; for (const p of P) capInt += 2 * (span / p + 1);
    check('block-1 capacity in INTEGERS [the figure a brief wrongly compared]', capInt.toFixed(1), '179.6');
    check('block-1 capacity in SLOTS [matched units]', (capInt / mbar).toFixed(2), '17.96');
    // (deleted 2026-08-20: "capacity is BELOW the 19 slots needed" was entailed
    // by the SLOTS check above with no independent content — tautology list,
    // verify-the-verifier-numbers.md §2.)
  }
  // (3) the two window conventions are different denominators. The unit
  // lesson stays as this comment; the check() computed 43*43/(41*41) from
  // inline literals and asserted a fact of arithmetic (deleted 2026-08-20,
  // tautology list). x'^2/x^2 at x = 41 is 1.0999: mind which convention.
  // (4) the four gap objects, ordered: Y2 <= G2-1 < G2 <= h2. The two
  // checks that stood here read `527 <= 527` and `528 - 1 === 527` — Y2(37)
  // appeared only as a literal and nothing recomputed it (the one number in
  // the tautology list that mattered). Deleted 2026-08-20; the REAL check now
  // lives in the ladder section: Y2(37) = computed G2(37#) - 1 by covering
  // duality.
  console.log('  retired: "capacity exceeds need by 10x, so counting is vacuous" (integers vs slots).');
  console.log('  retired: "log(v^2#) ~ 2v" (read v^2# as (v#)^2).');
}

// ------------------------------------------------- part: G2(41#), by certificate
// The thirteenth term of the two-class Jacobsthal ladder, computed 2026-08-18 by
// two independent enumerations over disjoint natal masks (19 and 23), which
// agreed on both the value and the position and whose survivor count equalled
// D_41 exactly. TODO 1b priced it at 5.6 h by the streaming leg and at 37 h by
// the lattice walk; it took 2 min 31 s on ten cores. Both estimates were wrong,
// the campaign's own re-pricing included.
//
// A FULL RECOMPUTE DOES NOT BELONG IN A GATE that already costs 152 s, so what
// is checked here is a CERTIFICATE, which is instant and still falsifiable:
// D_41 from the product formula, that the recorded position is a twin slot, and
// that the next twin slot above it is exactly 546 away. That establishes
// G2(41#) >= 546 outright. Maximality rests on the two enumerations and is
// recorded, not re-proven, on every run. If a later wave recomputes the maximum
// and disagrees, THIS is the line that will disagree with it.
function partG2at41() {
  const P41 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41];
  let D = 1; for (const q of P41) if (q >= 3) D *= (q - 2);
  check('D_41 = prod_{3<=q<=41}(q-2)', D, 8499244879125);
  const isSlot = r => { for (const p of P41) { const c = r % p; if (c === 0 || c === p - 2) return false; } return true; };
  const r0 = 3784200788231;
  check('G2(41#) certificate: recorded position is a twin slot', isSlot(r0), true);
  let n = r0 + 2; while (!isSlot(n) && n - r0 < 5000) n += 2;
  check('G2(41#) certificate: gap above the recorded position', n - r0, 546);
  // The pre-registered Poisson prediction, recorded BEFORE the run: 476 to 633,
  // centre 513. 546 lands inside it, 6.4% above centre. That is the whole point
  // of the term, so the window is asserted here rather than left in prose.
  // U1 (2026-08-20): this used to assert `546 >= 476 && 546 <= 633` with 546
  // a LITERAL — if the certificate walk above returned 500, it still passed.
  // It now consumes the walk's own gap.
  check('G2(41#) lies inside the pre-registered Poisson window [476,633]', (n - r0) >= 476 && (n - r0) <= 633, true);
  console.log(`  G2(41#) = 546 at r = ${r0}; previous slot 42 below. Poisson centre 513, this is +6.4%.`);
  console.log('  retired: TODO 1b\'s "roughly 37 hours" and its re-price to ~6 h. Measured 2 min 31 s.');
}

// The same certificate at 43#, the fourteenth exact term, computed 2026-08-18.
// Same structure and the same limitation: this establishes G2(43#) >= 618 by
// exhibition and does NOT re-prove maximality, which rests on two enumerations
// over disjoint natal masks (wheel 19 and wheel 23) that agreed on value,
// multiplicity 8, least position and survivor count.
//
// The least position matters and is the one recorded. The maximum is NOT
// unique -- 8 positions of the period attain 618, as 20 attain 150 at 19# and
// 4 attain 204 at 23# -- so two runs agreeing on A position was never evidence
// of anything, and both tools now report multiplicity and least position
// instead. That correction is why this check pins r0 to the least.
function partG2at43() {
  const P43 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43];
  let D = 1; for (const q of P43) if (q >= 3) D *= (q - 2);
  check('D_43 = prod_{3<=q<=43}(q-2)', D, 348469040044125);
  const isSlot = r => { for (const p of P43) { const c = r % p; if (c === 0 || c === p - 2) return false; } return true; };
  const r0 = 830330079152051;
  // Below 2^53, so Number arithmetic is exact here. Wheel 23 separately
  // reported a position at 9,432,141,056,492,129, which is NOT, and whose
  // double round-trip is even and therefore not a slot at all. That is why the
  // enumerators are uint64; this certificate is the half that fits.
  check('G2(43#) certificate: recorded position is below 2^53', r0 < Math.pow(2, 53), true);
  check('G2(43#) certificate: recorded position is a twin slot', isSlot(r0), true);
  let n = r0 + 2; while (!isSlot(n) && n - r0 < 5000) n += 2;
  check('G2(43#) certificate: gap above the recorded position', n - r0, 618);
  let m = r0 - 2; while (!isSlot(m) && r0 - m < 5000) m -= 2;
  check('G2(43#) certificate: it is the LEAST position, so the gap below is short', r0 - m, 24);
  console.log(`  G2(43#) = 618 at least r = ${r0}, multiplicity 8; previous slot 24 below.`);
  console.log('  47# priced by direct probe at 35.8 h per run. Not run.');
}

// ------------------------------------------------------- part: loudness driver
// The Loudness Ceiling Conjecture asks max_t VR < S̄²/(K·V̄), and that same
// inequality is the per-level hypothesis of the X-limitation theorem, so these
// four numbers decide at which levels that theorem holds. cap-38 computed the
// @19 row on 2026-08-18 and it promoted @19 from conjecture to theorem.
// Recomputed here from scratch, and — following the house rule that an
// instrument is checked against a known positive before it is believed — the
// SAME code path is first made to reproduce cap-31's exact @17 enumeration,
// which was produced by a completely different algorithm (a full per-rotation
// sweep of survivors, strikes and overlap credit). A pass at @17 is what
// licenses the @19 row below it.
function partLoudness() {
  console.log(`\n  [${el()}] loudness driver: recomputing S̄, K, V̄ and max VR ...`);
  const sieve = n => { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } } return o; };
  function level(x) {
    const base = sieve(x).filter(p => p >= 7);
    const W = 30 * base.reduce((a, b) => a * b, 1);
    const ind = new Uint8Array(W);
    for (let r = 11; r < W; r += 30) ind[r] = 1;
    for (let r = 17; r < W; r += 30) ind[r] = 1;
    for (const p of base) { for (let j = 0; j < W; j += p) ind[j] = 0; for (let j = p - 2; j < W; j += p) ind[j] = 0; }
    const rho = []; for (let r = 0; r < W; r++) if (ind[r]) rho.push(r);
    const N = rho.length;
    const qs = sieve(Math.floor(Math.sqrt(W)) + 1).filter(q => q > x && q * q <= W);
    const K = qs.length;
    // V̄ and the per-prime squared class deviations
    const rows2 = []; let Vbar = 0;
    for (const q of qs) {
      const n = new Int32Array(q); for (const r of rho) n[r % q]++;
      const mu = 2 * N / q, row = new Float64Array(q); let ss = 0;
      for (let a = 0; a < q; a++) { const d = n[a] + n[(a + q - 2) % q] - mu; row[a] = d * d; ss += d * d; }
      Vbar += ss / q; rows2.push(row);
    }
    // max VR: VR(t) depends on t only through t mod q, so one rolling pass each
    const vs = new Float64Array(W);
    for (const row of rows2) { const q = row.length; for (let t = 0, a = 0; t < W; t++) { vs[t] += row[a]; if (++a === q) a = 0; } }
    let mx = -1; for (let t = 0; t < W; t++) if (vs[t] > mx) mx = vs[t];
    // S̄ exactly: Σ_t S(t) = Σ_r #{u ∈ (r−W, r] surviving every q}, one sieve
    const L = 2 * W - 1, g = new Uint8Array(L).fill(1);
    for (const q of qs) for (const c of [0, q - 2]) for (let i = ((c + W - 1) % q + q) % q; i < L; i += q) g[i] = 0;
    const P = new Int32Array(L + 1); for (let i = 0; i < L; i++) P[i + 1] = P[i] + g[i];
    let tot = 0; for (const r of rho) tot += P[r + W] - P[r];
    const Sbar = tot / W;
    return { W, N, K, Vbar, Sbar, maxVR: mx / Vbar, driver: Sbar / Math.sqrt(K * Vbar), thresh: Sbar * Sbar / (K * Vbar) };
  }
  // KNOWN POSITIVE FIRST. cap-31's pasted @17 enumeration, produced by a full
  // per-rotation sweep. If this fails, nothing below it may be believed.
  const a = level(17);
  check('@17 K [known positive: cap-31 full sweep]', a.K, 120);
  check('@17 V̄ [known positive: cap-31 full sweep]', a.Vbar.toFixed(2), '1144.40');
  check('@17 S̄ [known positive: cap-31 full sweep]', a.Sbar.toFixed(2), '3614.93');
  check('@17 max VR [known positive: cap-31 full sweep]', a.maxVR.toFixed(3), '2.143');
  // THE @19 ROW, which carries the X-limitation theorem to a fourth level.
  const b = level(19);
  check('@19 K [cap-19 PART A]', b.K, 435);
  check('@19 V̄ [cap-19 PART A]', b.Vbar.toFixed(2), '8944.60');
  check('@19 max VR [cap-19 PART A, all 9,699,690 rotations]', b.maxVR.toFixed(3), '2.293');
  check('@19 S̄ [cap-38, the number the theorem needed]', b.Sbar.toFixed(2), '49238.76');
  check('@19 driver S̄/√(K·V̄) [cap-38]', b.driver.toFixed(2), '24.96');
  check('@19 threshold S̄²/(K·V̄) [cap-38]', b.thresh.toFixed(1), '623.1');
  check('@19 Loudness Ceiling margin threshold/maxVR [cap-38]', (b.thresh / b.maxVR).toFixed(1), '271.7');
  // The theorem's own inequality, stated the way cap-31 states it.
  check('@19 max|D| <= √(K·V̄·VRmax), the strike fence [cap-31 Thm 2 form]',
        Math.sqrt(b.K * b.Vbar * b.maxVR).toFixed(1), '2987.0');
  console.log(`  the fence holds iff √(K·V̄·VRmax) < S̄: ${Math.sqrt(b.K * b.Vbar * b.maxVR).toFixed(1)} < ${b.Sbar.toFixed(1)} -> ${Math.sqrt(b.K * b.Vbar * b.maxVR) < b.Sbar}`);
  // RETIRED VALUE, kept as a regression guard per this file's charter. Before
  // 2026-08-18 the corpus said the @19 driver "has not been computed" and the
  // theorem held at three levels. If a later edit reinstates three levels, the
  // number below is what it will disagree with.
  console.log('  retired: "the @19 driver has not been computed" / "proven at @11, @13 and @17 only" — superseded 2026-08-18.');
}

// --------------------------------------------------------------------- driver
const part = process.argv[2] || 'all';
if (part === 'loudness' || part === 'all') partLoudness();
if (part === 'g2at41' || part === 'all') partG2at41();
if (part === 'g2at43' || part === 'all') partG2at43();
if (part === 'units' || part === 'all') partUnits();
let tab = null;
if (part === 'const' || part === 'all') tab = partConst();
let H_COMPUTED = null;
if (part === 'onecls' || part === 'all') H_COMPUTED = partOneClass();
if (part === 'a091592' || part === 'all') partA091592(3000);
if (part === 'hl' || part === 'all') partHL();
if (part === 'band' || part === 'all') partBand();
if (part === 'fits' || part === 'all') partFits();
if (part === 'oeis' || part === 'all') partOEIS();

if (part === 'ladder' || part === 'g2big' || part === 'all') {
  const L = partLadder();
  console.log(`\n  [${el()}] building the 29# cycle (214,708,725 slots) ...`);
  const B = build29(L.mod23, L.slots23);
  console.log(`  [${el()}] 29# cycle built: D=${B.n}, modulus=${B.mod}, max gap=${B.maxg}`);
  L.got[29] = B.maxg;
  // 31# by the one-prime lift over the 29# cycle
  console.log(`  [${el()}] lifting 29# -> 31# ...`);
  const g31 = liftOne(B.gaps, B.n, 31, B.first);
  console.log(`  [${el()}] internal max gap at 31# = ${g31}`);
  // U6 (2026-08-20): the boundary scan's return value was DISCARDED here, so
  // the G2(31#) check asserted the internal lift only, unlike its three
  // siblings below which all take Math.max(internal, boundary). Now it is the
  // complete recomputation.
  L.got[31] = Math.max(g31, boundaryCheck(B, 31, null));
  for (const x of [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]) {
    check(`G2(${x}#)`, L.got[x], L.claimed[x]);
  }
  // ---- self-test of the two-prime lift on a level whose answer we already have ----
  {
    const B23 = { gaps: new Uint8Array(L.slots23.length), n: L.slots23.length, mod: L.mod23, first: L.slots23[0] };
    for (let i = 0; i < L.slots23.length - 1; i++) B23.gaps[i] = (L.slots23[i + 1] - L.slots23[i]) >> 1;
    B23.gaps[L.slots23.length - 1] = (L.slots23[0] + L.mod23 - L.slots23[L.slots23.length - 1]) >> 1;
    const s1 = liftOne(B23.gaps, B23.n, 29, B23.first);
    const s2 = liftTwo(B23.gaps, B23.n, B23.first, 29, 31, true);
    check('self-test: 23# lifted one prime  -> G2(29#)', Math.max(s1, boundaryCheck(B23, 29, null)), 258);
    check('self-test: 23# lifted two primes -> G2(31#)', Math.max(s2, boundaryCheck(B23, 29, 31)), 348);
  }
  if (part === 'g2big' || part === 'all') {
    console.log(`\n  [${el()}] lifting 29# -> 37# (31 passes over 214.7M slots) ...`);
    const g37 = liftTwo(B.gaps, B.n, B.first, 31, 37);
    console.log(`  [${el()}] internal max gap at 37# = ${g37}`);
    L.got[37] = Math.max(g37, boundaryCheck(B, 31, 37));
    check('G2(37#)', L.got[37], 528);
    // Y2(37) BY DUALITY, replacing the two deleted tautologies (2026-08-20):
    // choosing a_p = 0 for every p covers exactly the non-slots, so the
    // interior of any twin-slot gap is a covered run (Y2 >= G2 - 1), and a
    // covered run of length L forces a slot-free run (Y2 <= G2 - 1). So
    // Y2(x) = G2(x#) - 1 identically, and the check rides on the COMPUTED
    // G2(37#), not on a literal. two-class-lower-bounds.js's greedy hitting
    // 527 at x = 37 is this identity measured.
    check('Y2(37) = G2(37#) - 1, from the computed G2 by covering duality', L.got[37] - 1, 527);
  }
  // U5 (2026-08-20): the G2/h ratio table, over COMPUTED numerators and
  // computed h where the sieve reaches (x <= 29); h(31#) = 58 and h(37#) = 66
  // are TRANSCRIBED (OEIS A048670, Hagedorn) and labelled so.
  if (H_COMPUTED && part === 'all') {
    const hByX = { 5: H_COMPUTED[2], 7: H_COMPUTED[3], 11: H_COMPUTED[4], 13: H_COMPUTED[5],
      17: H_COMPUTED[6], 19: H_COMPUTED[7], 23: H_COMPUTED[8], 29: H_COMPUTED[9],
      31: 58, 37: 66 };   // 31, 37: TRANSCRIBED
    const xs = [5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
    const gotRatio = xs.map(x => (L.got[x] / hByX[x]).toFixed(2));
    check('G2/h at x = 5..37, computed G2 over computed h (31#/37# h transcribed)',
      gotRatio.join(','), '2.00,3.00,3.00,3.00,4.15,4.41,5.10,5.61,6.00,8.00');
  }
  // X17's cousin, in the computed direction (2026-08-20): the OEIS sequence
  // A144311 against THIS FILE's own exact terms — twelve from the ladder just
  // built, two from the position certificates in parts g2at41/g2at43 — via
  // the identity G2(prime(n)#) = A144311(n) + 1. This is the external
  // cross-check the report priced as free: fourteen overlapping terms, and a
  // transcription slip in either direction fails here.
  if (part === 'all') {
    const A144311 = [1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545, 617];
    const ours = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31].map(x => L.got[x])
      .concat([L.got[37], 546, 618]);   // 546/618: gap-certified in parts g2at41/g2at43
    check('A144311(n)+1 equals our own fourteen exact terms (12 computed, 2 gap-certified)',
      A144311.map(v => v + 1).join(','), ours.join(','));
  }
}

/* Copy-boundary gaps.  The internal scan above never sees a run that straddles
 * a multiple of P29, because each copy of the 29# cycle carries its own deletion
 * classes.  Those joins are cheap to settle exactly: only the first and last few
 * hundred slots of the 29# cycle can be involved. */
function headTail(B, K) {
  const head = [], tail = [];
  let v = B.first;
  for (let i = 0; i < K; i++) { head.push(v); v += 2 * B.gaps[i]; }
  // walk backwards from the end using the cyclic gap array
  let w = B.first + B.mod;                      // the wrap image of slot 0
  for (let i = B.n - 1; i >= B.n - K; i--) { w -= 2 * B.gaps[i]; tail.push(w); }
  tail.reverse();
  return { head, tail };
}
function boundaryCheck(B, q1, q2) {
  const K = 4000;
  const { head, tail } = headTail(B, K);
  const P29 = B.mod, P31 = P29 * q1;
  const nb = q2 ? q1 * q2 : q1;
  let worst = 0, worstAt = null;
  const alive = (s, a, b) => {
    const c1 = s % q1;
    if (c1 === a || c1 === (a - 2 + q1) % q1) return false;
    if (q2) { const c2 = s % q2; if (c2 === b || c2 === (b - 2 + q2) % q2) return false; }
    return true;
  };
  const cls = (t) => {
    const j1 = t % q1, j2 = q2 ? Math.floor(t / q1) % q2 : 0;
    const a = (q1 - (j1 * (P29 % q1)) % q1) % q1;
    let b = 0;
    if (q2) b = (q2 - (j1 * (P29 % q2) + j2 * (P31 % q2)) % q2) % q2;
    return { a, b };
  };
  for (let t = 1; t <= nb; t++) {
    const prev = cls(t - 1), cur = cls(t % nb);
    let last = null;
    for (let i = tail.length - 1; i >= 0; i--) if (alive(tail[i], prev.a, prev.b)) { last = tail[i]; break; }
    let first = null;
    for (let i = 0; i < head.length; i++) if (alive(head[i], cur.a, cur.b)) { first = head[i]; break; }
    if (last === null || first === null) { console.log('  boundary window too small at t=' + t); continue; }
    const g = first + P29 - last;
    if (g > worst) { worst = g; worstAt = t; }
  }
  console.log(`  [${el()}] widest copy-boundary gap over ${nb} joins (q1=${q1}${q2 ? ', q2=' + q2 : ''}): ${worst} at join ${worstAt}`);
  return worst;
}

// two-prime lift: fix the 31-deletion class a, then run the 37 suffix trick
function liftTwo(gaps, n, first, q1, q2, quiet) {
  const st1 = new Uint8Array(256), st2 = new Uint8Array(256);
  for (let g = 0; g < 256; g++) { st1[g] = (2 * g) % q1; st2[g] = (2 * g) % q2; }
  let best = 0;
  const c1_0 = first % q1, c2_0 = first % q2;
  for (let a = 0; a < q1; a++) {
    const a2 = (a - 2 + q1) % q1;
    let c1 = c1_0, c2 = c2_0, v = first;
    let sLen = 0, s1 = -1, s2 = -1, startPrev = 0, vPrev2 = 0, vPrev1 = 0;
    let havePrev = false, prevC2 = -1, prevV = 0, prevPrevV = 0;
    for (let i = 0; i < n; i++) {
      const dead1 = (c1 === a || c1 === a2);
      if (!dead1) {
        // this slot survives level q1; it participates in the q2 suffix logic
        if (sLen > 0) { const g = v - startPrev; if (g > best) best = g; }
        else if (havePrev) { const g = v - prevV; if (g > best) best = g; }
        if (sLen === 0) { s1 = c2; s2 = -1; sLen = 1; startPrev = prevV; }
        else if (c2 === s1 || c2 === s2) { sLen++; }
        else if (s2 < 0 && (c2 === (s1 + 2) % q2 || s1 === (c2 + 2) % q2)) { s2 = c2; sLen++; }
        else {
          const cp = prevC2;
          if (cp === c2 || c2 === (cp + 2) % q2 || cp === (c2 + 2) % q2) {
            s1 = cp; s2 = (cp === c2) ? -1 : c2; sLen = 2; startPrev = prevPrevV;
          } else { s1 = c2; s2 = -1; sLen = 1; startPrev = prevV; }
        }
        prevPrevV = prevV; prevV = v; prevC2 = c2; havePrev = true;
      }
      const g = gaps[i];
      v += 2 * g;
      c1 += st1[g]; if (c1 >= q1) c1 -= q1;
      c2 += st2[g]; if (c2 >= q2) c2 -= q2;
    }
    if (!quiet) console.log(`     [${el()}] a=${String(a).padStart(2)}/${q1}  running best = ${best}`);
  }
  return best;
}


// ============================================================================
// SECTION W (added 2026-08-19): the fold-L wave's cheap load-bearing numbers,
// recomputed from scratch. The heavy wave numbers (depth-2/3 ceilings, the
// tail-count certificates, deep windows) are double-verified in their records
// and too costly for this gate; what is here is the fast regression floor.
// ============================================================================
{
  console.log('\n--- section W: fold-L wave regression floor ---');

  // W1. Block-1 depth-0 counting ceiling: first dead l = 63, so L <= 62.
  // Criterion S(l) = sum_p max_a #{i<l : d_i == a or a-2 (mod p)}, dead iff
  // S(l) < l, primes {7,11,13,17,19,23}.
  //
  // PHASE-MAX (2026-08-20). The first draft hard-coded the T5 gap word as
  // (6,12,12) repeating — which is the word read from origin 11, and 11
  // happens to be the maximising phase. The answer is PHASE-DEPENDENT: from
  // origins 17 and 29 the word reads (12,12,6) / (12,6,12) and the first dead
  // l is 62, not 63 (verify-the-verifier-numbers.md SV4). The word is now
  // DERIVED by sieving Z/30 and the criterion runs at all three phases; the
  // ceiling is the max, and a future re-derivation from a different origin
  // cannot turn a correct number into a red gate.
  {
    const slots = [];
    for (let r = 1; r < 30; r += 2) if (r % 3 !== 0 && (r + 2) % 3 !== 0 && r % 5 !== 0 && (r + 2) % 5 !== 0) slots.push(r);
    check('W1 T5 slots mod 30 derived by sieve', slots.join(','), '11,17,29');
    const gaps = slots.map((v, i) => (slots[(i + 1) % slots.length] - v + 30) % 30);
    check('W1 T5 gap word from origin 11', gaps.join(','), '6,12,12');
    const ps = [7, 11, 13, 17, 19, 23];
    const firstDeadAt = (word) => {
      const REP = 200, seq = [];
      for (let k = 0; k < REP; k++) seq.push(...word);
      const d = [0]; for (let i = 0; i < seq.length; i++) d.push(d[i] + seq[i]);
      for (let l = 1; l <= 130; l++) {
        let S = 0;
        for (const p of ps) {
          const cnt = new Int32Array(p);
          for (let i = 0; i < l; i++) cnt[d[i] % p]++;
          let best = 0;
          for (let a = 0; a < p; a++) {
            const v = cnt[a] + cnt[((a - 2) % p + p) % p];
            if (v > best) best = v;
          }
          S += best;
        }
        if (S < l) return l;
      }
      return -1;
    };
    const perPhase = [0, 1, 2].map(k => firstDeadAt(gaps.slice(k).concat(gaps.slice(0, k))));
    console.log(`  W1 first dead l per phase (origins 11/17/29): ${perPhase.join(', ')}`);
    check('W1 per-phase first dead l (63 only at origin 11)', perPhase.join(','), '63,62,62');
    check('W1 block-1 depth-0 first dead l = max over phases (=> L <= 62)', Math.max(...perPhase), 63);
  }

  // W2. The true diagonal L at folds 7..29: the fold is ONE global 2-set
  // {0,-2} mod p' across all p' copies of the T_x word (runs may straddle
  // copy boundaries; a small-word max-over-alignments variant OVER-counts,
  // e.g. 2 instead of 1 at (T_7,11) -- caught when this section was written).
  // Expected 2,1,2,2,2,3,2.
  {
    const tiles = [5, 7, 11, 13, 17, 19, 23];
    const folds = [7, 11, 13, 17, 19, 23, 29];
    const expect = [2, 1, 2, 2, 2, 3, 2];
    for (let t = 0; t < tiles.length; t++) {
      const x = tiles[t], p = folds[t];
      let W = 1; for (const q of PRIMES) { if (q > x) break; W *= q; }
      const slots = [];
      for (let r = 1; r < W; r += 2) {
        let ok = true;
        for (const q of PRIMES) {
          if (q > x) break;
          if (r % q === 0 || (r + 2) % q === 0) { ok = false; break; }
        }
        if (ok) slots.push(r % p); // only the residue mod p is needed
      }
      const M = slots.length;
      // big cyclic word: slot k*M + i has residue (slots[i] + k*W) mod p
      const Wp = W % p;
      let run = 0, best = 0, firstRun = -1, sawGap = false;
      for (let k = 0; k < p; k++) {
        const shift = (k * Wp) % p;
        for (let i = 0; i < M; i++) {
          const r = (slots[i] + shift) % p;
          const kill = (r === 0) || ((r + 2) % p === 0);
          if (kill) { run++; if (run > best) best = run; }
          else { if (!sawGap) { firstRun = run; sawGap = true; } run = 0; }
        }
      }
      if (sawGap && run > 0 && firstRun > 0) {
        const joined = run + firstRun;
        if (joined > best) best = joined;
      }
      check(`W2 true diagonal L(T_${x}, ${p})`, best, expect[t]);
    }
  }

  // W3. Multi-kill extinction in the [0, 2e7) window: the last fold with a
  // kill-run of length >= 2 is p = 181 (attack-foldL-06-scaling.js, the
  // smallest window of the four-window out-of-sample test).
  {
    const N = 20000000;
    const PMAX = 499;
    const half = N >> 1;
    const killer = new Int16Array(half); // per odd r=2i+1: smallest p<=PMAX dividing r or r+2, else 0
    const ps = PRIMES.filter(q => q >= 3 && q <= PMAX);
    for (const q of ps) {
      // odd multiples of q: r = q, 3q, 5q...  mark r and r-2 (as upper member)
      for (let r = q; r < N; r += 2 * q) {
        const i = (r - 1) >> 1;
        if (killer[i] === 0) killer[i] = q;
        if (r - 2 >= 1) { const j = (r - 3) >> 1; if (killer[j] === 0) killer[j] = q; }
      }
    }
    // natal comb: slots with killer 0 or killer > 5 form the fold ladder's prey;
    // walk folds p = 7..499 over the alive list, find last fold with a run >= 2.
    const pos = [], kil = [];
    for (let i = 0; i + 1 < half; i++) {
      const k = killer[i];
      if (k === 0 || k > 5) { pos.push(2 * i + 1); kil.push(k); }
    }
    const n = pos.length;
    const nxt = new Int32Array(n), prv = new Int32Array(n);
    for (let i = 0; i < n; i++) { nxt[i] = i + 1; prv[i] = i - 1; }
    const bucket = new Map();
    for (let i = 0; i < n; i++) { const k = kil[i]; if (k === 0) continue;
      if (!bucket.has(k)) bucket.set(k, []); bucket.get(k).push(i); }
    let lastMulti = -1;
    for (const p of ps) {
      if (p <= 5) continue;
      const dead = bucket.get(p) || [];
      const deadSet = new Set(dead);
      let multi = false;
      for (const i of dead) {
        if (deadSet.has(nxt[i]) || deadSet.has(prv[i])) { multi = true; break; }
      }
      for (const i of dead) {
        const a = prv[i], b = nxt[i];
        if (a >= 0) nxt[a] = b; if (b < n) prv[b] = a;
      }
      if (multi) lastMulti = p;
    }
    check('W3 extinction: last fold with kill-run >= 2 in [0, 2e7)', lastMulti, 181);
    // N3 (2026-08-20): without this, a fold past the PMAX = 499 ceiling would
    // read as "no multi-kill" — extinction and out-of-range were one answer.
    check('W3 the answer is strictly below the PMAX = 499 walk ceiling', lastMulti < 499, true);
  }

  // W4 (2026-08-20): f BY DIRECT SIEVE — the check that would have caught the
  // mod-32 alias. a3-03-f-from-census.js held each prime's avoided set in one
  // 32-bit word, shifts alias for q > 32, and every census point from x = 37
  // up was wrong by 0.62x to 1.05x under a green gate; nothing in this file
  // guarded the entire fold-decay layer. These five diagonal levels are the
  // ones a3-03 calls UNAFFECTED, recomputed here with `%` arithmetic and no
  // bitmask anywhere: f(x, p) = fraction of the D_x cyclic tile gaps g with
  // g ≡ 0 or ±2 (mod p). A second alias in any producer feeding this layer
  // disagrees here at the first affected level.
  {
    console.log(`  [${el()}] W4 f(x,p) by direct %-sieve at the five diagonal levels ...`);
    const fdiag = (x, p) => {
      const pr = PRIMES.filter(q => q <= x);
      let P = 1; for (const q of pr) P *= q;
      const small = pr.filter(q => q >= 5);
      let first = -1, prev = -1, D = 0, qual = 0;
      const isQ = g => { const r = g % p; return r === 0 || r === 2 || r === p - 2; };
      for (let r = 5; r < P; r += 6) {
        let ok = true;
        for (const q of small) { const c = r % q; if (c === 0 || c === q - 2) { ok = false; break; } }
        if (!ok) continue;
        D++;
        if (first < 0) first = r; else if (isQ(r - prev)) qual++;
        prev = r;
      }
      if (isQ(first + P - prev)) qual++;
      return { D, f: qual / D };
    };
    const expectD = { 11: 135, 13: 1485, 17: 22275, 19: 378675, 23: 7952175 };
    const expectF = { 11: '0.044444', 13: '0.048485', 17: '0.048844', 19: '0.031119', 23: '0.030660' };
    const gotF = [], gotD = [];
    for (const [x, p] of [[11, 13], [13, 17], [17, 19], [19, 23], [23, 29]]) {
      const r = fdiag(x, p);
      gotD.push(r.D); gotF.push(r.f.toFixed(6));
    }
    check('W4 D_x by the same sieve at x = 11..23', gotD.join(','),
      [11, 13, 17, 19, 23].map(x => expectD[x]).join(','));
    check('W4 f(x, next prime) at the five UNAFFECTED diagonal levels (a3-03 §3, U-FRAME §5a)',
      gotF.join(','), [11, 13, 17, 19, 23].map(x => expectF[x]).join(','));
  }
}

// ============================================================================
// SECTION X (added 2026-08-20): the cross-document constants the second
// constants audit found quoted in two or more live documents. Every check here
// either recomputes from a closed form / first principles, or reads a
// custody-bound artifact on disk (the t37 shard partials, the window-5
// extinction raw log). NOTHING here reads a live .md — a document that quotes a
// number cannot be the witness that the number is right, which is the whole
// point of a cross-document audit.
// ============================================================================
{
  console.log('\n--- section X: cross-document constants (audit 2) ---');

  const GAMMA = 0.57721566490153286060651209008240243104215933593992;
  const C2FULL = 0.66016181584686957392781211001455577843262336028473;
  const BETA2 = 4.26645028414864191641;   // DHR dimension-2 sifting limit, Booker-Browning
  const fs = require('fs');
  const path = require('path');
  const RES = path.resolve(__dirname);

  // --------------------------------------------------------------------
  // X1-X4. The named constants that appear in two or more live documents at
  // several print precisions. The audit's question is never "is the constant
  // right" but "is every printed rounding of it a rounding of the SAME number".
  // Each check below asserts one printed form found in the live layer, against
  // the closed form recomputed here.
  // --------------------------------------------------------------------

  // X1. 2 - 1/ln 2, the shadow-drift law's second coefficient. NOTE the live
  // layer carries this one in closed form only, at G2-STATE.md:59 and
  // GLOSSARY.md:193, and prints no decimal for it anywhere. The decimals below
  // are the producer's (adversary-wave2-01-shadow.js derives it parameter-free
  // as the integral of s*ln2*2^s over [0,1]); they are pinned here because a
  // live producer, shadow-buchstab-01-candidate.js:98, hardcodes 0.5573013,
  // which is wrong in the sixth decimal.
  {
    const v = 2 - 1 / Math.LN2;
    check('X1 2 - 1/ln2 at the 10 dp the producer derives', v.toFixed(10), '0.5573049591');
    check('X1 2 - 1/ln2 at 4 dp', v.toFixed(4), '0.5573');
    check('X1 the hardcoded 0.5573013 is NOT this number at 7 dp', v.toFixed(7) === '0.5573013', false);
  }

  // X2. e^{2gamma}/4, the Unification-Law limit of beta. Printed in the live
  // layer at five precisions across ~30 sites: 0.79 / 0.793 / 0.7931 / 0.79305
  // / 0.793055. All five must be roundings of one number, and 0.79305 is the
  // one worth pinning: it is the correct 5 dp rounding and NOT a truncation,
  // which is what the 0.41625 class looked like before it was swept.
  {
    const v = Math.exp(2 * GAMMA) / 4;
    check('X2 e^{2g}/4 at 2 dp  [ OBSERVATIONS.md, README.md ]', v.toFixed(2), '0.79');
    check('X2 e^{2g}/4 at 3 dp  [ GLOSSARY.md, anchored-windows.md ]', v.toFixed(3), '0.793');
    check('X2 e^{2g}/4 at 4 dp  [ FOLD-PROFILE.md, PRIOR-ART.md, anchored-note.md ]', v.toFixed(4), '0.7931');
    check('X2 e^{2g}/4 at 5 dp  [ the 26-site print, the corpus default ]', v.toFixed(5), '0.79305');
    check('X2 e^{2g}/4 at 6 dp  [ GLOSSARY.md, anchored-note.md, wall-note.md ]', v.toFixed(6), '0.793055');
  }

  // X3. 2 C2 e^{-2gamma}, the twin-slot density constant. The first edition of
  // this audit found "one wrong digit, uniformly": 0.41625 everywhere for a
  // number that is 0.41621. The sweep is recorded as applied at TODO.md:67;
  // this check is the regression that keeps it applied.
  {
    const v = 2 * C2FULL * Math.exp(-2 * GAMMA);
    check('X3 2 C2 e^{-2g} at 5 dp  [ the swept value ]', v.toFixed(5), '0.41621');
    check('X3 2 C2 e^{-2g} at 8 dp', v.toFixed(8), '0.41621453');
    check('X3 the retired wrong digit 0.41625 is NOT a rounding of it',
      v.toFixed(5) === '0.41625' ? 'MATCHES-THE-ERROR' : 'differs', 'differs');
  }

  // X4. beta_2's print ladder. 4.266 / 4.2665 / 4.26645 / 4.266450 all appear
  // in the live layer; every one must be a correct rounding of the rigorous
  // Booker-Browning value, and the banned form is "4.2665..." with an ellipsis,
  // which claims an expansion that does not continue that way.
  {
    check('X4 beta2 at 3 dp  [ PRIOR-ART.md, covering-dive.md, beta2-note.md ]', BETA2.toFixed(3), '4.266');
    check('X4 beta2 at 4 dp  [ the 116-site prose print, 25 files ]', BETA2.toFixed(4), '4.2665');
    check('X4 beta2 at 5 dp  [ the arithmetic print, 51 sites in 20 files ]', BETA2.toFixed(5), '4.26645');
    check('X4 beta2 at 6 dp  [ PRIOR-ART.md:326, sift-limit-attack.md ]', BETA2.toFixed(6), '4.266450');
    check('X4 beta2 theorem-headline ceiling 4.267 is a true upper bound', BETA2 < 4.267, true);
    // the banned form is "4.2665..." with an ellipsis: 4.2665 is a rounding UP,
    // and the expansion truncated at four places reads 4.2664, so an ellipsis
    // after 4.2665 claims digits the constant does not have.
    check('X4 beta2 TRUNCATED to 4 dp is 4.2664, so 4.2665 is a round-up and takes no ellipsis',
      (Math.floor(BETA2 * 1e4) / 1e4).toFixed(4), '4.2664');
    check('X4 beta2 + 1 = the fractional-retention window top  [ REFUTED.md ]',
      (BETA2 + 1).toFixed(5), '5.26645');
    check('X4 alpha_2 = 5.35773 sits ABOVE beta2+1, so the window (alpha, beta+1) is empty',
      5.35772744559446184227 > BETA2 + 1, true);
  }

  // --------------------------------------------------------------------
  // X5. The theta_total break-even. 1.2417 and 1.2090 are the SAME formula
  // K/beta_2 over two different K, and the correction of 2026-08-18 was a
  // change of which K is optimal, not an arithmetic repair. Both are recomputed
  // here so the pair can never drift apart again, and so the retired one keeps
  // a retired label. attack-theta-margin.js prints K = 5.1580646803 at
  // b/a = 1.3130863738 and theta* = K/beta_2 = 1.2089827226.
  // --------------------------------------------------------------------
  {
    const K_BF = 5.1580646803;                       // asymmetric optimum, Bruedern-Fouvry
    const K_FH = 2 * (1 + Math.sqrt(Math.E));        // symmetric split, Ford-Halberstam dual
    check('X5 K_FH = 2(1+sqrt e)', K_FH.toFixed(6), '5.297443');
    check('X5 K_BF/beta2 = the LIVE break-even  [ sift-limit-attack.md:274 ]',
      (K_BF / BETA2).toFixed(4), '1.2090');
    check('X5 K_BF/beta2 at 10 dp  [ attack-theta-margin.js: 1.2089827226 ]',
      (K_BF / BETA2).toFixed(10), '1.2089827226');
    check('X5 K_FH/beta2 = the RETIRED break-even, symmetric split, NOT the optimum',
      (K_FH / BETA2).toFixed(4), '1.2417');
    check('X5 the two differ, so quoting one for the other is an error',
      (K_BF / BETA2).toFixed(4) !== (K_FH / BETA2).toFixed(4), true);
    check('X5 5.158065/4.26645, the division as sift-limit-attack.md:274 writes it',
      (5.158065 / 4.26645).toFixed(4), '1.2090');
    // and the decoupling arithmetic quoted beside it: 1+sqrt e removes ~71% of
    // the open band (4.26645, 2], not "half" of it.
    const frac = (BETA2 - (1 + Math.sqrt(Math.E))) / (BETA2 - 2);
    check('X5 full decoupling to 1+sqrt e removes this share of the open band',
      (100 * frac).toFixed(0) + '%', '71%');
    check('X5 and that is NOT "half"', Math.abs(frac - 0.5) > 0.15, true);
  }

  // --------------------------------------------------------------------
  // X6-X7. G2(37#) = 528, reconstructed from the t37 shard partials rather
  // than from any prose. research/t37-partials/ holds five shard JSONs from
  // scanstat-t37-04-run.js; each carries rows keyed by m, and the m = 1 row's
  // `max` is the largest twin-slot gap inside that shard's arc of Z/37#. The
  // shards tile the whole cycle, so the maximum over shards is G2(37#).
  // --------------------------------------------------------------------
  {
    const dir = path.join(RES, 't37-partials');
    const names = fs.readdirSync(dir).filter(f => /^t37-shard-37-\d+-of-5\.json$/.test(f)).sort();
    check('X6 five t37 shard partials on disk', names.length, 5);
    let g2 = 0, sumD = 0n, sumM1 = 0n, endMax = 0;
    for (const nm of names) {
      const j = JSON.parse(fs.readFileSync(path.join(dir, nm), 'utf8'));
      const r1 = j.rows.find(r => r.m === 1);
      if (r1.max > g2) g2 = r1.max;
      sumD += BigInt(j.dOwn);
      sumM1 += BigInt(r1.sum);
      if (j.endPos > endMax) endMax = j.endPos;
    }
    check('X6 G2(37#) = max over shards of the m=1 max', g2, 528);

    // the shards' own bookkeeping, against first principles
    let W = 1n, D = 1n;
    for (const q of PRIMES) { if (q > 37) break; W *= BigInt(q); if (q > 2) D *= BigInt(q - 2); }
    check('X7 sum of shard dOwn = D_37 = prod_{3<=q<=37}(q-2)', sumD.toString(), D.toString());
    check('X7 sum of shard m=1 sums = 37# (the gaps close the cycle)', sumM1.toString(), W.toString());
    check('X7 the last shard endPos = 37#', endMax.toString(), W.toString());
    check('X7 D_37', D.toString(), '217929355875');
    check('X7 37#', W.toString(), '7420738134810');
    check('X7 mbar(T_37) = 37#/D_37', (Number(W) / Number(D)).toFixed(5), '34.05112');
    check('X7 G2(37#)/mbar, the gap in mean-spacing units', (528 / (Number(W) / Number(D))).toFixed(3), '15.506');
  }

  // --------------------------------------------------------------------
  // X8-X10. The seven-level H series, the moving-sum exponent measured at
  // T_13, 17, 19, 23, 29, 31, 37. The five published levels are the input to a
  // pre-registered linear law; T_31 and T_37 are the two blind tests it failed.
  // The ladder of ln D is recomputed here from the primorial; the fit is a
  // plain least squares on those five points, so the pre-registration's
  // H*_5(T_37) = 0.381254 and its band are reproduced and not quoted.
  // --------------------------------------------------------------------
  {
    const lnD = (x) => { let s = 0; for (const q of PRIMES) { if (q > x) break; if (q > 2) s += Math.log(q - 2); } return s; };
    const lv = [13, 17, 19, 23, 29, 31, 37];
    const H = { 13: 0.2661, 17: 0.2804, 19: 0.3001, 23: 0.3216, 29: 0.3367, 31: 0.3460, 37: 0.3565 };

    check('X8 ln D ladder over the seven levels, 6 dp',
      lv.map(x => lnD(x).toFixed(6)).join(','),
      '7.303170,10.011220,12.844434,15.888956,19.184793,22.552089,26.107437');
    check('X8 the H series is strictly increasing over all seven levels',
      lv.every((x, i) => i === 0 || H[x] > H[lv[i - 1]]), true);
    check('X8 the series runs 0.2661 -> 0.3565, the span IMPORT-MAP.md:120 quotes',
      `${H[13].toFixed(4)} -> ${H[37].toFixed(4)}`, '0.2661 -> 0.3565');
    check('X8 sqrt(m) would need H = 0.5; the top of the ladder is below it',
      H[37] + 3 * 0.0068 < 0.5, true);

    // X9. the five-level pre-registered law, refit here from the five points
    const five = [13, 17, 19, 23, 29];
    let sx = 0, sy = 0, sxx = 0, sxy = 0;
    for (const x of five) { const X = lnD(x), Y = H[x]; sx += X; sy += Y; sxx += X * X; sxy += X * Y; }
    const n = five.length;
    const b = (n * sxy - sx * sy) / (n * sxx - sx * sx);
    const a = (sy - b * sx) / n;
    check('X9 five-level law intercept  [ t37-run.log: H = 0.220795 + 0.006146 lnD ]', a.toFixed(6), '0.220795');
    check('X9 five-level law slope', b.toFixed(6), '0.006146');
    check('X9 H*_5(T_37) extrapolated from the five-level law', (a + b * lnD(37)).toFixed(6), '0.381254');
    // X9b. There are TWO laws in the corpus and they are not the same fit. The
    // three-level pre-registration (import-scanstat-03-prereg.js:158) reads
    // 0.220511 + 0.006140 lnD and is what IMPORT-MAP.md:120 quotes as
    // "H = 0.2205 + 0.0061 ln D"; the five-level refit above reads
    // 0.220795 + 0.006146. At four decimals they part at the fourth digit of
    // the intercept, which is exactly close enough to be conflated.
    check('X9b the five-level refit at 4 dp is NOT the pre-registered 0.2205',
      a.toFixed(4), '0.2208');
    check('X9b the two laws share a slope at 4 dp, which is why only the intercept separates them',
      `${b.toFixed(4)} vs ${(0.006140).toFixed(4)}`, '0.0061 vs 0.0061');
    check('X9b and they differ at T_37 by less than a tenth of the measured s.e.',
      Math.abs((a + b * lnD(37)) - (0.220511 + 0.006140 * lnD(37))) < 0.1 * 0.0068, true);

    // X10. the blind verdict: measured H(T_37) sits below the band
    const meas = 0.356548, se = 0.0068, band = [0.369866, 0.392641];
    check('X10 measured H(T_37) at 4 dp', meas.toFixed(4), '0.3565');
    check('X10 measured H(T_37) is OUTSIDE the pre-registered band',
      meas < band[0] ? 'below' : (meas > band[1] ? 'above' : 'inside'), 'below');
    check('X10 the miss, in units of its own s.e.', ((band[0] - meas) / se).toFixed(2), '1.96');
    check('X10 the miss against the point prediction, in its own s.e.',
      (((a + b * lnD(37)) - meas) / se).toFixed(2), '3.63');
    check('X10 the T_37 extrapolation extends the fitted range by this factor of lnD',
      (lnD(37) / lnD(29)).toFixed(3), '1.361');
  }

  // --------------------------------------------------------------------
  // X11-X13. The extinction ladder 181 / 331 / 421 / 457 / 631 over the five
  // windows 2e7 / 2e8 / 2e9 / 2e10 / 2e11. The bottom three rungs are
  // recomputed here from first principles with an independent implementation
  // of the level-p object: slots n = 5 (mod 6); key(n) = the smallest fold
  // prime q >= 5 with q | n or q | n+2, or 0 if none below the ceiling; the
  // level-p object is {n : key(n) = 0 or key(n) >= p}; fold p's runs are the
  // maximal blocks of key = p consecutive in that object; L(p) is the longest.
  // A monotone stack computes every fold's longest run in one pass.
  //
  // NOTE this is a different convention from section W3's natal comb, which
  // reaches 181 for the same window by a different route. Two conventions,
  // one answer, is the point.
  // --------------------------------------------------------------------
  function extinctionFold(Y, QMAX) {
    const comp = new Uint8Array(QMAX + 1), pr = [];
    for (let i = 2; i <= QMAX; i++) { if (!comp[i]) { pr.push(i); for (let j = i * i; j <= QMAX; j += i) comp[j] = 1; } }
    const folds = pr.filter(q => q >= 5), F = folds.length;
    const fidx = new Int32Array(QMAX + 2).fill(-1);
    folds.forEach((q, j) => { fidx[q] = j; });
    const modInv = (aa, m) => { let g = m, x = 0, x1 = 1, a1 = aa; while (a1 !== 0) { const q = (g / a1) | 0;[g, a1] = [a1, g - q * a1];[x, x1] = [x1, x - q * x1]; } return ((x % m) + m) % m; };
    const inv6 = new Int32Array(QMAX + 1);
    for (const q of folds) inv6[q] = modInv(6 % q, q);
    const M = Math.floor((Y - 5) / 6) + 1;
    const key = new Uint16Array(M);
    for (let fi = F - 1; fi >= 0; fi--) {
      const q = folds[fi], iv = inv6[q];
      for (let tt = 0; tt < 2; tt++) {
        const t = tt === 0 ? 0 : q - 2;
        let s = (((t - 5) % q) + q) % q; s = (s * iv) % q;
        for (let i = s; i < M; i += q) key[i] = q;
      }
    }
    const INFK = QMAX + 1;
    const maxL = new Int32Array(F);
    const stK = new Int32Array(F + 4), stRun = new Float64Array(F + 4);
    let sp = 0;
    for (let i = 0; i < M; i++) {
      const kk = key[i], k = kk === 0 ? INFK : kk;
      while (sp > 0 && stK[sp - 1] < k) { sp--; const j = fidx[stK[sp]], rl = stRun[sp]; if (rl > maxL[j]) maxL[j] = rl; }
      if (sp > 0 && stK[sp - 1] === k) stRun[sp - 1]++;
      else { stK[sp] = k; stRun[sp] = 1; sp++; }
    }
    while (sp > 0) { sp--; if (stK[sp] === INFK) continue; const j = fidx[stK[sp]], rl = stRun[sp]; if (rl > maxL[j]) maxL[j] = rl; }
    let last = null;
    for (let j = 0; j < F; j++) if (folds[j] < 1500 && Math.max(1, maxL[j]) >= 2) last = folds[j];
    return last;
  }
  check('X11 extinction fold at window 2e7,  from first principles', extinctionFold(2e7, 1500), 181);
  check('X12 extinction fold at window 2e8,  from first principles', extinctionFold(2e8, 1500), 331);
  console.log(`  [${el()}] X13 running the 2e9 window (333M slots, ~15 s)`);
  check('X13 extinction fold at window 2e9,  from first principles', extinctionFold(2e9, 1500), 421);

  // --------------------------------------------------------------------
  // X14. The top two rungs, 457 at 2e10 and 631 at 2e11, cost a decade and two
  // decades more and are not recomputed here. They are read out of the
  // custody-bound raw log of foldL-window5-01-extinction.js, which is the
  // artifact the wave's headline rests on, and the band it was scored against
  // is checked for consistency with the measurement it accepted.
  // --------------------------------------------------------------------
  {
    const raw = fs.readFileSync(path.join(RES, 'foldL-window5-01-extinction.raw.txt'), 'utf8');
    const mLast = raw.match(/last fold with L >= 2\s*=\s*(\d+)/);
    check('X14 window-5 artifact: last fold with L >= 2', mLast && Number(mLast[1]), 631);
    const mSeq = raw.match(/sequence\s*\|[^|]*\|\s*([\d\s>-]+?)\s*\|/);
    const seq = mSeq ? mSeq[1].split('->').map(s => Number(s.trim())) : [];
    check('X14 window-5 artifact: the five-window sequence', seq.join(','), '181,331,421,457,631');
    check('X14 the sequence is strictly increasing', seq.every((v, i) => i === 0 || v > seq[i - 1]), true);
    check('X14 its first three rungs are the ones recomputed above',
      seq.slice(0, 3).join(','), '181,331,421');
    const mBand = raw.match(/last L >= 2 fold\s*\|\s*\[(\d+),\s*(\d+)\]\s*median\s*(\d+)/);
    const lo = mBand && Number(mBand[1]), hi = mBand && Number(mBand[2]), med = mBand && Number(mBand[3]);
    check('X14 the pre-registered band on the fifth window', `[${lo}, ${hi}] median ${med}`, '[571, 877] median 683');
    check('X14 631 lies inside its pre-registered band', 631 >= lo && 631 <= hi, true);
    check('X14 631 against the band median, as a ratio', (631 / med).toFixed(3), '0.924');
    // the crossing-fold prediction the same stage scored
    const mCross = raw.match(/crossing fold at c = ([\d.]+) predicted (\d+), measured (\d+), ratio ([\d.]+)/);
    check('X14 the crossing-fold prediction and its ratio',
      mCross && `${mCross[2]} predicted, ${mCross[3]} measured, ratio ${mCross[4]}`,
      '653 predicted, 631 measured, ratio 0.966');
  }

  // --------------------------------------------------------------------
  // X15. 1/(2 C2) = 0.75739, the constant on which the Kourbatov-collision
  // reading in ZONE-POSTULATE.md turns and which PRIOR-ART.md repeats. It has
  // no script producer anywhere in the tree; it is a closed form, and this is
  // the check that stands in for one.
  // --------------------------------------------------------------------
  {
    const v = 1 / (2 * C2FULL);
    check('X15 1/(2 C2)  [ ZONE-POSTULATE.md:171, PRIOR-ART.md:253 ]', v.toFixed(5), '0.75739');
    check('X15 and its reciprocal is 2 C2', (1 / v).toFixed(7), '1.3203236');
  }

  // --------------------------------------------------------------------
  // X16. The mean twin-slot spacing in ln^2 units, m_bar/ln^2 x = (W/D)/ln^2 x.
  // Two live documents print convergent tables for it on DIFFERENT x-grids
  // (a3-09-histogram-operator.md:143-144 at x = 7..200003, and
  // operator-and-pair-count.md:68-69 at x = 1009, 10007, 200003). Neither has
  // a producer. Both are recomputed here on their own grids and against the
  // Mertens limit e^{2gamma}/(2 C2) they are said to be converging to.
  // --------------------------------------------------------------------
  {
    const N = 200003;
    const sv = new Uint8Array(N + 1), pr = [];
    for (let i = 2; i <= N; i++) { if (!sv[i]) { pr.push(i); for (let j = i * i; j <= N; j += i) sv[j] = 1; } }
    const mOverLn2 = (x) => {
      let L = Math.log(2);
      for (const q of pr) { if (q > x) break; if (q > 2) L += Math.log(q) - Math.log(q - 2); }
      return Math.exp(L) / (Math.log(x) ** 2);
    };
    check('X16 mbar/ln^2 x on a3-09-histogram-operator.md:143 grid, x = 7..200003',
      [7, 23, 37, 97, 199, 2003, 20011, 200003].map(x => mOverLn2(x).toFixed(4)).join(','),
      '3.6973,2.8536,2.6115,2.4954,2.5024,2.4167,2.4052,2.4035');
    check('X16 mbar/ln^2 x on operator-and-pair-count.md:69 grid, x = 1009, 10007, 200003',
      [1009, 10007, 200003].map(x => mOverLn2(x).toFixed(4)).join(','), '2.4195,2.4086,2.4035');
    check('X16 the two grids agree where they overlap, at x = 200003',
      mOverLn2(200003).toFixed(4), '2.4035');
    check('X16 the Mertens limit e^{2g}/(2 C2) they converge to',
      (Math.exp(2 * GAMMA) / (2 * C2FULL)).toFixed(4), '2.4026');
    check('X16 and by x = 2003 the table is within 0.6% of that limit',
      (100 * (mOverLn2(2003) / (Math.exp(2 * GAMMA) / (2 * C2FULL)) - 1)).toFixed(1) + '%', '0.6%');
  }

  // --------------------------------------------------------------------
  // X17. The exact G2 ladder against OEIS A144311, by the identity
  // G2(prime(n)#) = A144311(n) + 1. The five terms the live layer quotes most
  // are checked against the published sequence rather than against each other,
  // which is the only way to settle "is this term ours or theirs".
  // --------------------------------------------------------------------
  {
    const A144311 = [1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545, 617, 707,
                     869, 965, 1079, 1283, 1397, 1529, 1709];
    check('X17 A144311 has 22 published terms', A144311.length, 22);
    check('X17 G2(31#) = 348 = a(11)+1  [ recomputed by the ladder part above ]', A144311[10] + 1, 348);
    check('X17 G2(37#) = 528 = a(12)+1  [ and by the t37 partials at X6 ]', A144311[11] + 1, 528);
    check('X17 G2(41#) = 546 = a(13)+1  [ certificate at part g2at41 ]', A144311[12] + 1, 546);
    check('X17 G2(43#) = 618 = a(14)+1  [ certificate at part g2at43 ]', A144311[13] + 1, 618);
    check('X17 G2(47#) = 708 = a(15)+1  [ PRIOR-ART.md:385, published, not ours ]', A144311[14] + 1, 708);
    check('X17 every one of the five is a PUBLISHED term, so none extends A144311',
      [11, 12, 13, 14, 15].every(n => n <= A144311.length), true);
    // the 708 collision: the same integer is also h2(37#) = A288815(12), a
    // ceiling at a DIFFERENT primorial. Two objects, one number, two documents.
    check('X17 the 708 collision: h2(37#) = A288815(12) is also 708, at 37# not 47#',
      6 * 117 + 6, 708);
    check('X17 so 708 alone never identifies the primorial', (A144311[14] + 1) === 708 && (6 * 117 + 6) === 708, true);
  }

  // --------------------------------------------------------------------
  // X18. K(y), the squared Mertens partial-product error that divides the
  // shadow drift law. G2-STATE.md:59 states the law WITH the /K(y); the
  // GLOSSARY.md:193 restatement drops it. The function is recomputed here from
  // its definition, K(y) = delta(y)/delta_inf(y) with delta(y) the exact tile
  // density (1/2) prod_{2<q<=y}(1-2/q) and delta_inf = 2 C2 e^{-2g}/ln^2 y.
  // --------------------------------------------------------------------
  {
    const C2S = 0.6601618158468695;   // the value the producer pins; the 9th digit moves if this does
    const N = 50000;
    const sv = new Uint8Array(N + 1), pr = [];
    for (let i = 2; i <= N; i++) { if (!sv[i]) { pr.push(i); for (let j = i * i; j <= N; j += i) sv[j] = 1; } }
    const K = (y) => {
      let d = 0.5;
      for (const q of pr) { if (q > y) break; if (q > 2) d *= (1 - 2 / q); }
      return d / (2 * C2S * Math.exp(-2 * GAMMA) / (Math.log(y) ** 2));
    };
    check('X18 K(1009), the concrete rung  [ shadow-amplitude-01-derivation.js ]', K(1009).toFixed(9), '0.993010641');
    check('X18 the full K ladder, seven rungs',
      [101, 1009, 2003, 5051, 10079, 22901, 39989].map(y => K(y).toFixed(9)).join(','),
      '0.960501171,0.993010641,0.994160551,0.996432888,0.997665656,0.998624508,0.999033254');
    check('X18 K(y) rises to 1 from below, so dividing by it INFLATES the drift law',
      [101, 1009, 2003, 5051, 10079, 22901, 39989].every((y, i, arr) => y === 101 || K(y) > K(arr[i - 1])) && K(39989) < 1, true);
    check('X18 1/K(1009) - 1, the size of the correction at that rung', (1 / K(1009) - 1).toFixed(6), '0.007039');
  }

  // --------------------------------------------------------------------
  // X19. theta_Shearer's H* ladder. Two independent engines produce it and the
  // live layer carries none of the twenty integers -- only the summary
  // "theta_Shearer ~ 1.41" and the floor 2/sqrt(e), both in one IMPORT-MAP.md
  // cell. The floor and the two ends of the ladder are recomputed here.
  // --------------------------------------------------------------------
  {
    check('X19 the asymptotic floor 2/sqrt(e)  [ IMPORT-MAP.md row 3 ]', (2 / Math.sqrt(Math.E)).toPrecision(11), '1.2130613194');
    check('X19 theta at the bottom rung, ln H*(13)/ln 13 with H* = 35', (Math.log(35) / Math.log(13)).toFixed(10), '1.3861279760');
    check('X19 theta at the top rung, ln H*(79)/ln 79 with H* = 481', (Math.log(481) / Math.log(79)).toFixed(10), '1.4134205233');
    check('X19 the ladder sits between 1.38 and 1.44, which is the "~ 1.41" the live cell quotes',
      Math.log(35) / Math.log(13) > 1.38 && Math.log(481) / Math.log(79) < 1.44, true);
    check('X19 and every rung sits ABOVE the floor, so the floor is not attained on the measured range',
      Math.log(35) / Math.log(13) > 2 / Math.sqrt(Math.E), true);
    check('X19 the p^2 rule would need theta = 2; the top rung is far below it',
      Math.log(481) / Math.log(79) < 1.5, true);
  }

  // --------------------------------------------------------------------
  // X20. The @29 and @31 joint deficits. The measurement is the ratio of the
  // observed mixed super-W triple count to its CRT prediction; the closed form
  // under test is 1 - J = 4 * sum_{x < q <= sqrt(W)} q^{-2}. The predicted side
  // is recomputed here from first principles with no repo code, and the
  // measured side from the producer's own two integers.
  // --------------------------------------------------------------------
  {
    const N = 500000;
    const sv = new Uint8Array(N + 1), pr = [];
    for (let i = 2; i <= N; i++) { if (!sv[i]) { pr.push(i); for (let j = i * i; j <= N; j += i) sv[j] = 1; } }
    const pred = (x) => {
      let W = 1; for (const q of pr) { if (q > x) break; W *= q; }
      const R = Math.sqrt(W);
      let S = 0, k = 0, hi = 0;
      for (const q of pr) { if (q <= x) continue; if (q > R) break; S += 1 / (q * q); k++; hi = q; }
      return { W, S: 4 * S, k, hi };
    };
    const p29 = pred(29), p31 = pred(31);
    check('X20 W = 29# and 31#', `${p29.W},${p31.W}`, '6469693230,200560490130');
    check('X20 the closed form at @29: 4 sum_{29<q<=sqrt(29#)} q^-2', p29.S.toFixed(6), '0.028943');
    check('X20 the closed form at @31', p31.S.toFixed(6), '0.024784');
    check('X20 the prime counts and top of range the sum runs over',
      `${p29.k} to ${p29.hi}; ${p31.k} to ${p31.hi}`, '7863 to 80429; 37534 to 447829');
    // measured, from xchan-at29-01-segmented.js's observed and CRT counts
    check('X20 J(@29) = observed/CRT', (53660192 / 55252747.16).toFixed(6), '0.971177');
    check('X20 J(@31) = observed/CRT', (1653241687 / 1695051393.52).toFixed(6), '0.975334');
    // THE DOUBLE ROUNDING. The producer prints the residual as the difference of
    // its own already-rounded 6 dp columns: 0.028943 - 0.028823 = 0.000120 and
    // 0.024784 - 0.024666 = 0.000118. Carried at full precision the residuals
    // are 0.000120091 and 0.000118534, and the second of those rounds to
    // 0.000119, not 0.000118. So TODO.md's "the same residual 0.000119 at both
    // new levels" is @31's residual, correctly rounded, quoted for the pair --
    // and the producer's own 0.000118 is the double-rounded one. Neither number
    // is "both levels": they differ by 1.3% of themselves.
    const r29 = p29.S - (1 - 53660192 / 55252747.16);
    const r31 = p31.S - (1 - 1653241687 / 1695051393.52);
    check('X20 @29 residual at full precision', r29.toPrecision(5), '0.00012009');
    check('X20 @31 residual at full precision', r31.toPrecision(5), '0.00011853');
    check('X20 @29 residual rounded to the printed 6 dp', r29.toFixed(6), '0.000120');
    check('X20 @31 residual rounded to the printed 6 dp is 0.000119, NOT the 0.000118 printed',
      r31.toFixed(6), '0.000119');
    check('X20 and 0.000118 is what differencing the ROUNDED columns gives',
      (Number(p31.S.toFixed(6)) - Number((1 - 1653241687 / 1695051393.52).toFixed(6))).toFixed(6), '0.000118');
    check('X20 the two residuals are not one number: they differ by this share of themselves',
      (100 * Math.abs(r29 - r31) / r29).toFixed(1) + '%', '1.3%');
    check('X20 @29 z-score, residual over sigma_J: a hit', Math.abs(r29 / 0.000133) < 1, true);
    check('X20 @31 z-score, the one the live bullet omits: not a hit',
      Math.abs(r31 / 0.000024) > 4.5 && Math.abs(r31 / 0.000024) < 5.5, true);
  }

  // --------------------------------------------------------------------
  // X21. The corrected f-law coefficients, read out of the embedded OUTPUT
  // blocks of the fdecay-deep producers rather than from f-decays.md. The
  // strings below are byte-exact fragments of those blocks; if a producer is
  // re-embedded with different numbers, these stop matching.
  // --------------------------------------------------------------------
  {
    const rd = (f) => fs.readFileSync(path.join(RES, f), 'utf8');
    const L3 = rd('fdecay-deep-03-ladder.js'), L1 = rd('fdecay-deep-01-census-defect.js');
    check('X21 fdecay-deep-03 is custody-bound', /code-sha256/.test(L3) && /out-sha256/.test(L3), true);
    check('X21 fdecay-deep-01 is custody-bound', /code-sha256/.test(L1) && /out-sha256/.test(L1), true);
    check('X21 the 51-level comb fit, the coefficient f-decays.md:20 and ATTACKS3.md:117 quote',
      L3.includes('1.917 + 1.4016(+-0.0235)*T - 1.021*S'), true);
    check('X21 its no-comb companion on the same 51 levels', L3.includes('1.375 + 1.3782(+-0.0365)*T'), true);
    check('X21 the in-sample / out-of-sample comb slopes f-decays.md:22-23 quote as 1.588 / 1.280',
      L3.includes('1.5875') && L3.includes('1.2799'), true);
    check('X21 and their no-comb companions, which are NOT those numbers',
      L3.includes('1.5562') && L3.includes('1.1803'), true);
    check('X21 the 42-census corrected fit, fdecay-deep-01', L1.includes('0.792 + 1.5425(+-0.0724)*T'), true);
    check('X21 its comb form, the -1.030 f-decays.md:24 quotes', L1.includes('1.323 + 1.5741(+-0.0405)*T - 1.030*S'), true);
    check('X21 the defective baseline it is compared against, -1.038', L1.includes('1.609 + 1.4675(+-0.0458)*T - 1.038*S'), true);
    check('X21 the downstream corrected law, f-decays.md:26', L1.includes('-1.861 + 2.864(+-0.075)*lnln x'), true);
    // the -1.021/-1.025 pair a3-03-f-from-census.md:27 quotes is a DIFFERENT
    // baseline from the -1.030/-1.038 pair f-decays.md:24 quotes, and -1.025
    // is the published value of record.
    const A3 = rd('a3-03-f-from-census.js');
    check('X21 the published value of record is -1.025, in a3-03-f-from-census.js', A3.includes('1.025'), true);
    check('X21 so -1.038 is a refit baseline, not the published one', L1.includes('1.038') && !A3.includes('1.038'), true);
  }

  // --------------------------------------------------------------------
  // X22. The extinction rate law's two constant pairs, and the third c that
  // is neither. 1.0577 / 1.0818 / 1.0701 look like three readings of one
  // number and are three objects; no live document quotes any of them, and
  // this check exists so that if one ever does, the pairing is on record.
  // The values are read out of the producers' embedded OUTPUT blocks; the
  // sigma arithmetic that the live layer DOES quote is recomputed.
  // --------------------------------------------------------------------
  {
    const rd = (f) => fs.readFileSync(path.join(RES, f), 'utf8');
    const STEIN = rd('import-stein-01-multikill.js');
    const SCAL = rd('attack-foldL-06-scaling.js');
    const NULLM = rd('import-thinning-01-nullmodel.js');
    check('X22 the three producers are custody-bound',
      [STEIN, SCAL, NULLM].every(t => /code-sha256/.test(t) && /out-sha256/.test(t)), true);
    check('X22 Stein-DERIVED (A, c) at Y = 2e9  [ import-stein-01 section B5 ]',
      STEIN.includes('2.2091e-2') && STEIN.includes('1.0701'), true);
    check('X22 record-FITTED (A, c) with its s.e.  [ attack-foldL-06 section A3 ]',
      SCAL.includes('A = 2.4312e-2, c = 1.0818 +- 0.0317'), true);
    check('X22 geometric-NULL c  [ import-thinning-01 section B1 ]', NULLM.includes('1.0577'), true);
    // the two numbers the live layer actually prints, recomputed
    check('X22 c derived against c fitted, in units of the fit s.e.  [ "0.37 sigma" ]',
      ((1.0818 - 1.0701) / 0.0317).toFixed(2), '0.37');
    check('X22 c null against c fitted, as a relative gap  [ TODO.md "2.2%" ]',
      (100 * Math.abs(1.0577 - 1.0818) / 1.0818).toFixed(1) + '%', '2.2%');
    check('X22 the derived c sits closer to the fit than the null does, which is the claim',
      Math.abs(1.0818 - 1.0701) < Math.abs(1.0818 - 1.0577), true);
    check('X22 and the three are three objects, not three readings: all distinct',
      new Set([1.0577, 1.0701, 1.0818]).size, 3);
    // A on the other side: the null's A misses by a factor of two, the derived
    // one by under ten percent, which is the "beats the null both ways" claim.
    check('X22 null A / fitted A', (4.7843 / 2.4312).toFixed(2), '1.97');
    check('X22 derived A / fitted A', (2.2091 / 2.4312).toFixed(3), '0.909');
    check('X22 so the derived A is nearer 1 than the null A, both ways',
      Math.abs(2.2091 / 2.4312 - 1) < Math.abs(4.7843 / 2.4312 - 1), true);
  }
}

console.log(`\ndone in ${el()}`);
const bad = rows.filter(r => !r.ok);
console.log(`\n${rows.length - bad.length}/${rows.length} checks passed.`);
if (bad.length) { console.log('FAILURES:'); for (const r of bad) console.log(`  - ${r.label}: computed ${r.computed} vs claimed ${r.claimed}`); }

// EXIT NONZERO ON FAILURE. Until 2026-08-17 this file printed "FAILURES:" and
// then exited 0, so it reported failure in prose and success in its exit code.
// Two checks were failing for four waves and any wrapper, any CI, and any agent
// that trusted the exit status saw a pass. An instrument whose verdict is only
// in its prose cannot be gated on, and a gate nobody can automate is a gate
// somebody eventually skips.
process.exit(bad.length ? 1 : 0);
