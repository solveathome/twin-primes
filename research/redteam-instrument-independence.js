#!/usr/bin/env node
'use strict';
// RED TEAM — is the exact-frame diagonal a second instrument, or attack E in other coordinates?
/* ============================================================================
   RED TEAM / attack-lower-bound.md section 3b  —  are the two instruments
   independent?
   ============================================================================
   2026-08-18/19, attack 10 of 10. The claim under attack:

     "Two independent instruments, one model-selection and one exact-frame, now
      agree that section 6's law is the wrong one."
     (research/history/staging/attack-lower-bound.md, section 3b)

   The claim is load-bearing because two DEPENDENT instruments agreeing is one
   instrument counted twice, and the corpus has already paid once for pooling
   objects that were not what they looked like (research/qc/units.js section 4).

   WHAT THE SECOND INSTRUMENT ACTUALLY DOES. For each candidate law f it forms
   q_f(x) = f(x) / (m(x) lnD(x)) with m and lnD the exact primorial-frame
   quantities, regresses ln q_f on lnln x by OLS, and reports the slope. It does
   the same for the data itself, q_G2 = G2 / (m lnD), and quotes the difference
   of slopes in units of the DATA regression's standard error.

   THE ALGEBRAIC POINT THIS FILE TESTS. OLS slope is linear in the response and
   both regressions subtract the SAME ln(m lnD) against the SAME regressor, so

       slope(ln f - ln(m lnD)) - slope(ln G2 - ln(m lnD)) = slope(ln f - ln G2)

   exactly. The exact frame CANCELS out of every reported offset. If that holds
   numerically, the "exact-frame diagonal" contributes nothing to the point
   estimate; it sets the error bar and nothing else, and the point estimate is a
   comparison of ln f against ln G2 on the same eighteen points that attack E
   fits. That is the same data, the same response and the same object.

   FOUR TESTS, in increasing strength:
     1. Reproduce section 3b's table from an independent frame implementation.
     2. Show the frame cancels, by computing the offsets with NO frame at all.
     3. Vary what should not matter: swap the exact frame for absurd ones and
        see whether the offsets move. (They must not, if the algebra holds.)
     4. Recover attack E's own fitted parameter from the second instrument. If
        the diagonal returns the number attack E already fitted, the two are not
        two readings, they are one reading in two coordinate systems.
   ========================================================================= */

const ln = Math.log;
const L1 = x => ln(x), L2 = x => ln(ln(x)), L3 = x => ln(ln(ln(x)));
const F = (v, d = 4) => (Number.isFinite(v) ? v.toFixed(d) : ' n/a');
const pad = (s, n) => String(s).padStart(n);
const padr = (s, n) => String(s).padEnd(n);

const XS = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];
const G2 = [2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528, 546, 618, 708, 870, 966, 1080,
            1284, 1398, 1530, 1710];

function sieve(n) { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } return o; }
const PRIMES = sieve(200);

// exact primorial frame, re-implemented from the definitions rather than copied
function frame(x) {
  let lnD = 0, lnm = ln(2);
  for (const p of PRIMES) { if (p > x) break; if (p !== 2) { lnD += ln(p - 2); lnm += ln(p / (p - 2)); } }
  return { lnD, m: Math.exp(lnm) };
}

function ols(x, y) {
  const n = x.length; let sx = 0, sy = 0;
  for (let i = 0; i < n; i++) { sx += x[i]; sy += y[i]; }
  const mx = sx / n, my = sy / n; let sxy = 0, sxx = 0;
  for (let i = 0; i < n; i++) { sxy += (x[i] - mx) * (y[i] - my); sxx += (x[i] - mx) ** 2; }
  const a = sxy / sxx, b = my - a * mx;
  let rss = 0; for (let i = 0; i < n; i++) { const r = y[i] - (a * x[i] + b); rss += r * r; }
  const sd = Math.sqrt(rss / Math.max(1, n - 2));
  return { a, b, sd, se: sd / Math.sqrt(sxx), n };
}

const LAWS = [
  ['MP2', 'c x ln^2 x', x => x * L1(x) ** 2],
  ['MP2LL', 'c x ln^2 x lnln x', x => x * L1(x) ** 2 * L2(x)],
  ['MP3', 'c x ln^3 x', x => x * L1(x) ** 3],
  ['KK', 'x ln^3 x lll^2/ll^4', x => x * L1(x) ** 3 * L3(x) ** 2 / L2(x) ** 4],
];

const IDX = XS.map((x, i) => i).filter(i => XS[i] >= 11);

// generic: slope of ln( num(x) / den(x) ) on lnln x, over the section-3b index set
function trend(num, den, idx = IDX) {
  const lx = [], ly = [];
  for (const i of idx) {
    const x = XS[i], q = num(x, i) / den(x, i);
    if (!Number.isFinite(q) || q <= 0) continue;
    lx.push(L2(x)); ly.push(ln(q));
  }
  return ols(lx, ly);
}

console.log('='.repeat(78));
console.log('RED TEAM: is the section-3b diagonal a SECOND instrument, or the first one');
console.log('           written in different coordinates?');
console.log('='.repeat(78));

const exactDen = (x) => { const f = frame(x); return f.m * f.lnD; };
const dataFn = (x, i) => G2[i];

// --- 1. reproduce -----------------------------------------------------------
console.log('\n1. REPRODUCTION of section 3b, from an independently written frame().');
console.log('   Frame check, exact m and lnD at three x:');
for (const x of [11, 43, 79]) { const f = frame(x); console.log(`     x = ${pad(x, 2)}   m = ${F(f.m, 4)}   lnD = ${F(f.lnD, 4)}   m*lnD = ${F(f.m * f.lnD, 4)}`); }
const dTr = trend(dataFn, (x) => exactDen(x));
console.log(`\n   n = ${dTr.n} points (x = 11..79), regressor lnln x`);
console.log('   law     trend exp     se     offset from data     se-distance   report says');
const REPORTED = { MP2: [-0.5308, 0.0932, -0.758, 9.3], MP2LL: [0.3181, 0.0873, 0.091, 1.1], MP3: [0.4692, 0.0932, 0.242, 3.0], KK: [3.6755, 0.9629, 3.448, 42.3] };
const mine = {};
for (const [k, form, f] of LAWS) {
  const t = trend((x) => f(x), (x) => exactDen(x));
  const off = t.a - dTr.a, se = Math.abs(off) / dTr.se;
  mine[k] = { a: t.a, se: t.se, off, sed: se };
  const r = REPORTED[k];
  console.log('  ' + padr(k, 8) + pad(F(t.a), 10) + pad(F(t.se), 9) + pad(F(off), 14)
    + pad(F(se, 1), 14) + '        ' + r[0] + ' / ' + r[3] + ' se');
}
console.log(`  ${padr('G2', 8)}${pad(F(dTr.a), 10)}${pad(F(dTr.se), 9)}        (the data's own trend; report says 0.2273 / 0.0816)`);
console.log('   Reproduced. Everything below is an attack on what it MEANS.');

// --- 2. does the exact frame cancel? ---------------------------------------
console.log('\n2. THE EXACT FRAME CANCELS OUT OF EVERY OFFSET.');
console.log('   Same offsets, computed as slope(ln f - ln G2) on lnln x with NO FRAME AT ALL.');
console.log('   law     with exact m lnD    with no frame       difference');
for (const [k, form, f] of LAWS) {
  const bare = trend((x) => f(x), (x, i) => G2[i]);
  console.log('  ' + padr(k, 8) + pad(F(mine[k].off, 6), 17) + pad(F(bare.a, 6), 20) + pad((bare.a - mine[k].off).toExponential(2), 16));
}
console.log('   The differences are at double precision. The exact primorial frame');
console.log('   contributes EXACTLY NOTHING to the reported point estimates: OLS slope is');
console.log('   linear in the response and both regressions subtract the same ln(m lnD).');

// --- 3. vary what should not matter ----------------------------------------
console.log('\n3. VARY THE FRAME. If the offsets are frame-free the absurd frames agree.');
console.log('   Only the se, and therefore the se-DISTANCE, can move.');
const FRAMES = [
  ['exact m lnD (the report)', (x) => exactDen(x)],
  ['no frame at all', () => 1],
  ['x^5, arbitrary', (x) => x ** 5],
  ['e^x, absurd', (x) => Math.exp(x)],
  ['1/x^3, absurd + inverted', (x) => 1 / x ** 3],
  ['exact m lnD squared', (x) => exactDen(x) ** 2],
];
console.log('   frame                          data se    MP2 offset   MP2 se-dist   MP2LL se-dist');
for (const [name, den] of FRAMES) {
  const d = trend(dataFn, den);
  const t2 = trend((x) => LAWS[0][2](x), den), t2ll = trend((x) => LAWS[1][2](x), den);
  console.log('  ' + padr(name, 30) + pad(F(d.se), 9) + pad(F(t2.a - d.a, 4), 13)
    + pad(F(Math.abs(t2.a - d.a) / d.se, 1), 13) + pad(F(Math.abs(t2ll.a - d.a) / d.se, 1), 16));
}
console.log('   The offsets are identical across every frame, absurd ones included.');
console.log('   What the exact frame buys is the DENOMINATOR: it is the frame that makes');
console.log('   the residual scatter small, so it sets how many "se" a fixed offset is');
console.log('   worth. That is a real contribution and it is not a second measurement.');

// --- 4. the diagonal returns attack E's own fitted parameter ---------------
console.log('\n4. THE DIAGONAL RETURNS ATTACK E\'S OWN FITTED PARAMETER.');
console.log('   Write the family c x ln^2 x (lnln x)^b. Under this instrument its trend is');
console.log('   linear in b, so the b that lands the family exactly on the data is one');
console.log('   division. Attack E fits that same b directly, by AICc, in its MP2LLb row.');
{
  const slopeL3 = trend((x) => L3(x) > 0 ? Math.exp(L3(x)) : NaN, () => 1);
  // slope of L3(x) on L2(x), computed honestly (L3 can be negative, so regress L3 itself)
  const lx = IDX.map(i => L2(XS[i])), lyL3 = IDX.map(i => L3(XS[i]));
  const sl3 = ols(lx, lyL3);
  const bImplied = (dTr.a - mine.MP2.a) / sl3.a;
  console.log(`     slope of lnlnln x on lnln x over the same 18 points: ${F(sl3.a)}`);
  console.log(`     data trend - MP2 trend = ${F(dTr.a - mine.MP2.a)}`);
  console.log(`     implied b = ${F(dTr.a - mine.MP2.a)} / ${F(sl3.a)} = ${F(bImplied)}`);
  // attack E's MP2LLb, refitted here from scratch: ln G2 = c + b L3, offset L1 + 2 L2
  const zs = IDX.map(i => ln(G2[i]) - (L1(XS[i]) + 2 * L2(XS[i])));
  const l3s = IDX.map(i => L3(XS[i]));
  const bE = ols(l3s, zs).a;
  console.log(`     attack E's MP2LLb b, refitted from scratch here: ${F(bE)}`);
  console.log(`     attack E's report and script tail both print: 0.893`);
  console.log(`     difference between the two routes: ${F(Math.abs(bImplied - bE), 6)}`);
  console.log('   The "second instrument" hands back the number the first one fitted. It is');
  console.log('   not confirming attack E, it is re-expressing it.');
}

// --- 5. co-movement under deletion -----------------------------------------
console.log('\n5. CO-MOVEMENT. Two independent instruments respond to a deleted point');
console.log('   differently. Delete each of the 18 points and watch both verdicts on MP2.');
console.log('   deleted   diagonal MP2 se-dist   diagonal MP2 offset');
const dd = [], oo = [];
for (const j of IDX) {
  const idx = IDX.filter(i => i !== j);
  const d = trend(dataFn, (x) => exactDen(x), idx);
  const t = trend((x) => LAWS[0][2](x), (x) => exactDen(x), idx);
  const off = t.a - d.a, sed = Math.abs(off) / d.se;
  dd.push(sed); oo.push(off);
  console.log('  ' + pad(XS[j], 7) + pad(F(sed, 1), 22) + pad(F(off), 22));
}
console.log(`   se-distance range over the 18 deletions: ${F(Math.min(...dd), 1)} .. ${F(Math.max(...dd), 1)}`);
console.log(`   offset range:                            ${F(Math.min(...oo))} .. ${F(Math.max(...oo))}`);

// --- 6. what the two instruments share -------------------------------------
console.log('\n6. THE SHARED-INPUT LEDGER, stated plainly.');
console.log('   quantity                          attack E race        section 3b diagonal');
console.log('   data                              G2, 18 exact terms   G2, the SAME 18 terms');
console.log('   window                            x = 11..79           x = 11..79');
console.log('   response                          ln G2                ln G2 minus ln(m lnD)');
console.log('   regressor                         {1, ln x, lnln x,    lnln x');
console.log('                                      lnlnln x}');
console.log('   estimator                         unweighted OLS       unweighted OLS');
console.log('   frame contribution to the point');
console.log('     estimate                        n/a                  ZERO (section 2)');
console.log('   The only input the diagonal adds that attack E does not have is m lnD, and');
console.log('   section 2 shows m lnD cancels out of the point estimate. What is left that');
console.log('   is genuinely new is the ERROR SCALE: the exact frame flattens the data');
console.log('   enough that a fixed offset is worth many se. That is worth having and it is');
console.log('   not independence.');

console.log('\n' + '='.repeat(78));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/redteam-instrument-independence.js
//   invocation:  node research/redteam-instrument-independence.js
//   code-sha256: bdae6bf12b98da3d6c455a7908a45cb804d6b2da9b48b0a3cf4906c301e7048b
//   out-sha256:  9882b85718f2446eae223ea597e63baeca9ccd399f5ed5dbee396c40023f8a3f
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.1 s
// ============================================================================
// ==============================================================================
// RED TEAM: is the section-3b diagonal a SECOND instrument, or the first one
//            written in different coordinates?
// ==============================================================================
//
// 1. REPRODUCTION of section 3b, from an independently written frame().
//    Frame check, exact m and lnD at three x:
//      x = 11   m = 17.1111   lnD = 4.9053   m*lnD = 83.9347
//      x = 43   m = 37.5435   lnD = 33.4846   m*lnD = 1257.1293
//      x = 79   m = 48.7925   lnD = 66.3586   m*lnD = 3237.8014
//
//    n = 18 points (x = 11..79), regressor lnln x
//    law     trend exp     se     offset from data     se-distance   report says
//   MP2        -0.5308   0.0932       -0.7581           9.3        -0.5308 / 9.3 se
//   MP2LL       0.3181   0.0873        0.0908           1.1        0.3181 / 1.1 se
//   MP3         0.4692   0.0932        0.2419           3.0        0.4692 / 3 se
//   KK          3.6755   0.9629        3.4483          42.3        3.6755 / 42.3 se
//   G2          0.2273   0.0816        (the data's own trend; report says 0.2273 / 0.0816)
//    Reproduced. Everything below is an attack on what it MEANS.
//
// 2. THE EXACT FRAME CANCELS OUT OF EVERY OFFSET.
//    Same offsets, computed as slope(ln f - ln G2) on lnln x with NO FRAME AT ALL.
//    law     with exact m lnD    with no frame       difference
//   MP2             -0.758061           -0.758061        4.44e-16
//   MP2LL            0.090838            0.090838        2.78e-17
//   MP3              0.241939            0.241939        2.78e-17
//   KK               3.448251            3.448251       -4.44e-16
//    The differences are at double precision. The exact primorial frame
//    contributes EXACTLY NOTHING to the reported point estimates: OLS slope is
//    linear in the response and both regressions subtract the same ln(m lnD).
//
// 3. VARY THE FRAME. If the offsets are frame-free the absurd frames agree.
//    Only the se, and therefore the se-DISTANCE, can move.
//    frame                          data se    MP2 offset   MP2 se-dist   MP2LL se-dist
//   exact m lnD (the report)         0.0816      -0.7581          9.3             1.1
//   no frame at all                  0.1007      -0.7581          7.5             0.9
//   x^5, arbitrary                   0.2965      -0.7581          2.6             0.3
//   e^x, absurd                      9.7172      -0.7581          0.1             0.0
//   1/x^3, absurd + inverted         0.2747      -0.7581          2.8             0.3
//   exact m lnD squared              0.1422      -0.7581          5.3             0.6
//    The offsets are identical across every frame, absurd ones included.
//    What the exact frame buys is the DENOMINATOR: it is the frame that makes
//    the residual scatter small, so it sets how many "se" a fixed offset is
//    worth. That is a real contribution and it is not a second measurement.
//
// 4. THE DIAGONAL RETURNS ATTACK E'S OWN FITTED PARAMETER.
//    Write the family c x ln^2 x (lnln x)^b. Under this instrument its trend is
//    linear in b, so the b that lands the family exactly on the data is one
//    division. Attack E fits that same b directly, by AICc, in its MP2LLb row.
//      slope of lnlnln x on lnln x over the same 18 points: 0.8489
//      data trend - MP2 trend = 0.7581
//      implied b = 0.7581 / 0.8489 = 0.8930
//      attack E's MP2LLb b, refitted from scratch here: 0.8933
//      attack E's report and script tail both print: 0.893
//      difference between the two routes: 0.000292
//    The "second instrument" hands back the number the first one fitted. It is
//    not confirming attack E, it is re-expressing it.
//
// 5. CO-MOVEMENT. Two independent instruments respond to a deleted point
//    differently. Delete each of the 18 points and watch both verdicts on MP2.
//    deleted   diagonal MP2 se-dist   diagonal MP2 offset
//        11                   7.9               -0.6904
//        13                   8.4               -0.7827
//        17                   8.5               -0.7501
//        19                   9.3               -0.7929
//        23                   9.2               -0.7668
//        29                   9.6               -0.7425
//        31                   9.1               -0.7594
//        37                  13.1               -0.7543
//        41                   9.0               -0.7600
//        43                   9.0               -0.7562
//        47                   9.1               -0.7580
//        53                   8.9               -0.7578
//        59                   9.1               -0.7779
//        61                   8.9               -0.7634
//        67                   8.9               -0.7587
//        71                   8.8               -0.7627
//        73                   8.6               -0.7461
//        79                   8.6               -0.7523
//    se-distance range over the 18 deletions: 7.9 .. 13.1
//    offset range:                            -0.7929 .. -0.6904
//
// 6. THE SHARED-INPUT LEDGER, stated plainly.
//    quantity                          attack E race        section 3b diagonal
//    data                              G2, 18 exact terms   G2, the SAME 18 terms
//    window                            x = 11..79           x = 11..79
//    response                          ln G2                ln G2 minus ln(m lnD)
//    regressor                         {1, ln x, lnln x,    lnln x
//                                       lnlnln x}
//    estimator                         unweighted OLS       unweighted OLS
//    frame contribution to the point
//      estimate                        n/a                  ZERO (section 2)
//    The only input the diagonal adds that attack E does not have is m lnD, and
//    section 2 shows m lnD cancels out of the point estimate. What is left that
//    is genuinely new is the ERROR SCALE: the exact frame flattens the data
//    enough that a fixed offset is worth many se. That is worth having and it is
//    not independence.
//
// ==============================================================================
// ============================================================
// READINGS
// ============================================================
//
// 1. THE SECTION-3b TABLE REPRODUCES EXACTLY, from a frame() written from the
//    definitions rather than copied. Trend exponents -0.5308, 0.3181, 0.4692,
//    3.6755 and the data's own 0.2273, and se-distances 9.3, 1.1, 3.0 and 42.3.
//    So nothing below is a reproduction failure; it is an attack on meaning.
//
// 2. THE "EXACT FRAME" CANCELS OUT OF EVERY REPORTED OFFSET. OLS slope is
//    linear in the response, and the law regression and the data regression
//    subtract the SAME ln(m lnD) against the SAME regressor, so the difference
//    of slopes is the slope of ln f - ln G2 and the frame is gone. Computed
//    with no frame at all, the offsets agree with the framed ones to 4.44e-16.
//
// 3. AND ABSURD FRAMES GIVE THE SAME OFFSETS. Dividing by x^5, by e^x, by
//    1/x^3 or by (m lnD)^2 leaves the MP2 offset at -0.7581 in every case. What
//    moves is the data se -- 0.0816 with the exact frame, 0.1007 with none,
//    9.7172 with e^x -- and therefore the se-DISTANCE, which reads 9.3, 7.5 and
//    0.1 on those three. The exact frame's contribution is the error scale, not
//    the measurement. That is a genuine and useful contribution and it is not
//    a second instrument.
//
// 4. THE DIAGONAL HANDS BACK ATTACK E'S OWN FITTED PARAMETER. Under this
//    instrument the family c x ln^2 x (lnln x)^b has a trend linear in b, so
//    the b that lands it on the data is (0.2273 - (-0.5308))/0.8489 = 0.8930.
//    Attack E's MP2LLb row fits b by AICc and reports 0.893; refitted from
//    scratch here it is 0.8933. The two routes differ by 0.000292. The second
//    instrument is returning the first one's answer.
//
// 5. THEREFORE THE INDEPENDENCE CLAIM IS FALSE AS STATED. The two instruments
//    share the object, the eighteen data points, the window, the response up to
//    an additive term that cancels, and the estimator. The only input the
//    diagonal adds is m lnD and reading 2 shows m lnD does not reach the point
//    estimate. "Two independent instruments agree" is one instrument reported
//    twice, which is the specific failure the brief for this attack named.
//
// 6. WHAT SURVIVES, AND IT IS NOT NOTHING. The RANKING is real: on the same 18
//    points, c x ln^2 x sits 0.758 away from the data's trend and
//    c x ln^2 x lnln x sits 0.0908 away, a factor of eight. That is a fact about
//    G2 and it does not depend on the frame. The exact frame earns its place by
//    making the residual scatter small enough that 0.758 is worth 9.3 se rather
//    than 7.5. Both statements are worth keeping. What must be dropped is the
//    word "independent" and the inference that two agreements are stronger
//    evidence than one.
//
// 7. AND THE 9.3 IS ITSELF POINT-SENSITIVE. Over the 18 single deletions the
//    MP2 se-distance runs 7.9 to 13.1 and the offset -0.7929 to -0.6904. The
//    lowest, 7.9, comes from deleting x = 11 -- the same point that carries
//    attack E's power-law exclusion. Two "independent" instruments losing
//    strength on the same deleted point is what dependence looks like.
