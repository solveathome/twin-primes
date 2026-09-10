'use strict';
// ============================================================================
// ADVERSARY WAVE 2 / 01 — THE KILL SHADOW, ATTACKED
// (2026-08-19. Refute-first verification of research/history/staging/
//  shadow-buchstab.md and its pre-registration shadow-prereg.md.)
// ============================================================================
// STANCE. This file exists to BREAK the shadow claim, not to confirm it. Four
// attacks, each of which can only fail in the claim's favour:
//
//  (A) IS 0.5573 DERIVED OR FITTED? shadow-buchstab-01-candidate.js hardcodes
//      0.5573013 and calls it derived. The band average is
//        B_x(y) = int_0^1 rho(2 + w s) ln2 2^s ds,   w = ln2/ln y,
//      and rho(2+e) = rho(2)(1 + e + O(e^2)) because omega'(2) = 1/4 and
//      rho = e^{2gamma} omega^2. So the coefficient is the FIRST MOMENT of the
//      x-weight on the band,
//        int_0^1 s ln2 2^s ds = 2 - 1/ln2 = 0.5573049591...,
//      a closed form the record does not state. This part derives it three
//      ways (closed form, quadrature, and the exact integral's own slope) and
//      checks the hardcoded constant against it.
//
//  (B) DOES THE MEASUREMENT REPRODUCE? shadow-buchstab-02-instrument.js sieves
//      the band by marking r = 0 and r = -2 (mod p) directly. This file uses
//      the OTHER formulation: sieve a y-rough flag array once and AND it with
//      itself shifted by 2. Different loop, different marking, same object. All
//      ten pre-registered clusters are re-measured, slot counts included.
//
//  (C) IS THE D2 TREND MONOTONE, OR CHERRY-BINNED? The record's ten clusters
//      are the author's own centres. This part re-bins the SAME object on a
//      binning the record never used — single levels on a fixed geometric
//      ladder, one prime per rung, no pooling — and counts monotonicity
//      violations. It also tests something D2's sign test cannot see: whether
//      the SIZE of the measured drift matches the size the law predicts.
//
//  (D) IS THE EXACT INVARIANCE LEMMA CRT-COMPLETE? The lemma of
//      attack2-03-09-depth-formula.js is checked at a (band, level) pair that
//      file never used, and the place where band position COULD interact with
//      the new primes' classes is isolated and measured: the per-class
//      retention count, which the proof needs to be constant over classes.
// ============================================================================

function primesUpTo(n){ const s = new Uint8Array(n+1), o = []; for (let i = 2; i <= n; i++){ if (!s[i]){ o.push(i); for (let j = i*i; j <= n; j += i) s[j] = 1; } } return o; }
const ALL = primesUpTo(40000);
const isPrime = (n) => { if (n < 2) return false; for (let d = 2; d*d <= n; d++) if (n % d === 0) return false; return true; };

const GAMMA = 0.5772156649015329;
const E2G = Math.exp(2 * GAMMA);
const rho = (u) => (u <= 2 ? E2G/(u*u) : Math.pow(Math.exp(GAMMA) * (1 + Math.log(u-1))/u, 2));
function delta(y){ let d = 0.5; for (const p of ALL){ if (p === 2) continue; if (p > y) break; d *= (p-2)/p; } return d; }

// x-weighted band average, by substitution t = y^u: exact to printed precision
function bandX(y, u0){
  const w = Math.LN2/Math.log(y), n = 4000, h = 1/n;
  let s = 0;
  for (let i = 0; i <= n; i++){
    const t = i*h, wt = (i === 0 || i === n) ? 1 : (i % 2 ? 4 : 2);
    s += wt * rho(u0 + w*t) * Math.LN2 * Math.pow(2, t);
  }
  return s*h/3;
}

// --------------------------------------------------------------------------
console.log('=== (A) the drift coefficient: closed form, not a fit ===');
const CLOSED = 2 - 1/Math.LN2;
let q = 0; const NQ = 4000000;
for (let i = 0; i < NQ; i++){ const s = (i + 0.5)/NQ; q += s * Math.LN2 * Math.pow(2, s); }
q /= NQ;
console.log('  first moment of the x-weight, closed form  2 - 1/ln2 = ' + CLOSED.toFixed(10));
console.log('  same by midpoint quadrature (4e6 panels)             = ' + q.toFixed(10));
console.log('  shadow-buchstab-01 hardcodes                           0.5573013');
console.log('  hardcoded minus closed form                          = ' + (0.5573013 - CLOSED).toExponential(3));
{
  const h = 1e-7;
  console.log('  relative slope of rho at u=2 from the right           = ' + ((rho(2+h)/rho(2) - 1)/h).toFixed(6) + '   (the proof needs exactly 1)');
  console.log('  relative slope of rho at u=2 from the left            = ' + ((rho(2-h)/rho(2) - 1)/(-h)).toFixed(6) + '   (a V, not a smooth minimum)');
}
console.log('  coefficient read off the exact integral, (B_x/rho(2) - 1)/w:');
for (const y of [1e3, 1e6, 1e12, 1e30, 1e80]){
  const w = Math.LN2/Math.log(y);
  console.log(`    y = 1e${String(Math.round(Math.log10(y))).padEnd(3)} w = ${w.toFixed(6)}  ->  ${(((bandX(y,2)/rho(2)) - 1)/w).toFixed(8)}`);
}
console.log('  VERDICT A: the coefficient is DERIVED and equals 2 - 1/ln2 exactly;');
console.log('             the record states it only to four figures and the producer');
console.log('             hardcodes a value wrong in the sixth decimal.');

// --------------------------------------------------------------------------
console.log('\n=== (B) the ten clusters, re-measured by the complementary sieve ===');
const SEG = 1 << 23;
const rough = new Uint8Array(SEG + 2);
// count r in [lo,hi) with r and r+2 both free of every prime <= y, into `bins`
// equal-length bins.  Marking is on the ROUGH flag, then a shift-by-2 AND.
function bandCount(y, lo, hi, bins){
  const out = new Float64Array(bins), width = (hi - lo)/bins;
  for (let base = lo; base < hi; base += SEG){
    const top = Math.min(base + SEG, hi), len = top - base;
    rough.fill(1, 0, len + 2);
    for (const p of ALL){ if (p > y) break; let s = base % p; s = (p - s) % p; for (let j = s; j < len + 2; j += p) rough[j] = 0; }
    for (let i = 0; i < len; i++) if (rough[i] && rough[i+2]){ let b = Math.floor((base + i - lo)/width); if (b >= bins) b = bins - 1; out[b]++; }
  }
  return out;
}

const CENTRES = [1000, 1400, 2000, 2900, 4200, 6000, 8500, 12000, 18000, 26000];
const BUDGET = 4.0e8;
const PUB = {   // research/history/staging/shadow-buchstab.md section 1 and the producer's part (B)
  1000:[0.85004,0.83365,266735], 1400:[0.84124,0.83192,591384], 2000:[0.83285,0.83025,1417269],
  2900:[0.83212,0.82886,2219418], 4200:[0.82830,0.82756,2052941], 6000:[0.82690,0.82629,1868376],
  8500:[0.82741,0.82512,1945202], 12000:[0.82325,0.82401,1785182], 18000:[0.82315,0.82279,1840503],
  26000:[0.82279,0.82177,1779677] };
console.log('  cluster  levels  y range        measured   published  slots        published    B_x(pred)  residual');
const mine = [];
for (const y0 of CENTRES){
  const pool = ALL.filter(p => p >= 0.88*y0 && p <= 1.12*y0);
  const ys = []; let tot = 0;
  for (const p of pool){ if (tot > BUDGET && ys.length) break; ys.push(p); tot += p*p; }
  let Ntot = 0; const ms = [], ps = [];
  for (const y of ys){
    const Y = y*y, d = delta(y), b = bandCount(y, Y, 2*Y, 1);
    Ntot += b[0]; ms.push(b[0]/(Y*d)); ps.push(bandX(y, 2));
  }
  const mean = (a) => a.reduce((x,z)=>x+z,0)/a.length;
  const m = mean(ms), P = mean(ps);
  mine.push({ y0, ys, m, P, N: Ntot });
  const [pm, pp, pn] = PUB[y0];
  console.log(`  ${String(y0).padEnd(9)}${String(ys.length).padStart(4)}   ${(ys[0]+'-'+ys[ys.length-1]).padEnd(14)}${m.toFixed(5).padStart(9)}  ${pm.toFixed(5).padStart(9)}  ${String(Ntot).padStart(9)}  ${String(pn).padStart(9)}   ${P.toFixed(5).padStart(9)}  ${(m-P>=0?'+':'')+(m-P).toFixed(5)}`);
}
{
  let bad = 0;
  for (const r of mine){ const [pm,pp,pn] = PUB[r.y0]; if (Math.abs(r.m - pm) > 5e-6 || r.N !== pn || Math.abs(r.P - pp) > 5e-6) bad++; }
  console.log(`  clusters whose measured ratio, slot count and prediction all reproduce: ${mine.length - bad} of ${mine.length}`);
}

// --------------------------------------------------------------------------
console.log('\n=== (C) D2 on a binning the record never used, and the SIZE of the drift ===');
console.log('  one prime per rung, no pooling, rungs fixed geometrically at 1000*2^(k/3)');
console.log('  y        w         measured   B_x(pred)  residual   step vs previous');
const LADDER = [];
for (let k = 0; k <= 14; k++){ let t = Math.round(1000*Math.pow(2, k/3)); while (!isPrime(t)) t++; LADDER.push(t); }
const solo = [];
for (const y of LADDER){
  const Y = y*y, d = delta(y), b = bandCount(y, Y, 2*Y, 1);
  const m = b[0]/(Y*d), P = bandX(y, 2);
  const step = solo.length ? m - solo[solo.length-1].m : NaN;
  solo.push({ y, m, P });
  console.log(`  ${String(y).padEnd(9)}${(Math.LN2/Math.log(y)).toFixed(6)}  ${m.toFixed(5).padStart(9)}  ${P.toFixed(5).padStart(9)}  ${((m-P>=0?'+':'')+(m-P).toFixed(5)).padStart(9)}   ${isNaN(step) ? '   -' : ((step<0?'fall ':'RISE ')+step.toFixed(5))}`);
}
{
  let rises = 0; for (let i = 1; i < solo.length; i++) if (solo[i].m > solo[i-1].m) rises++;
  console.log(`  monotonicity violations on this binning: ${rises} of ${solo.length-1} steps`);
  console.log(`  (the record's own binning reports 1 of 9)`);
  const dm = solo[solo.length-1].m - solo[0].m, dp = solo[solo.length-1].P - solo[0].P;
  console.log(`  drift over the ladder: measured ${dm.toFixed(5)}  predicted ${dp.toFixed(5)}  ratio ${(dm/dp).toFixed(3)}`);
  const c = mine[mine.length-1], a = mine[0];
  console.log(`  drift over the record's own clusters: measured ${(c.m-a.m).toFixed(5)}  predicted ${(c.P-a.P).toFixed(5)}  ratio ${((c.m-a.m)/(c.P-a.P)).toFixed(3)}`);
  const b2 = mine[2], b9 = mine[9];
  console.log(`  same, restricted to y >= 2000: measured ${(b9.m-b2.m).toFixed(5)}  predicted ${(b9.P-b2.P).toFixed(5)}  ratio ${((b9.m-b2.m)/(b9.P-b2.P)).toFixed(3)}`);
}

// --------------------------------------------------------------------------
console.log('\n=== (D) the Exact Invariance Lemma, at a pair attack2-03-09 did not use ===');
// The lemma: the in-period depth of a set of residue classes mod P_b is exactly
// invariant under adding further primes.  The step the proof needs is that EVERY
// class mod P_b retains exactly prod(p-2) of its prod(p) lifts -- uniformly, so
// that band position cannot interact with the new primes' killed classes.
{
  const base = [2,3,5,7,11,13];            // P_b = 30030, b = 13
  const Pb = base.reduce((a,z)=>a*z, 1);
  const add = [17, 19];                     // the primes added
  const M = add.reduce((a,z)=>a*z, 1);
  // per-class retention, over ALL Pb classes, not just the band's
  const counts = new Map();
  for (let off = 0; off < Pb; off++){
    let keep = 0;
    for (let k = 0; k < M; k++){
      const r = k*Pb + off; let ok = true;
      for (const p of add) if (r % p === 0 || (r + 2) % p === 0){ ok = false; break; }
      if (ok) keep++;
    }
    counts.set(keep, (counts.get(keep) || 0) + 1);
  }
  const expect = add.reduce((a,z)=>a*(z-2), 1);
  console.log(`  classes mod ${Pb}, lifts each = ${M}; retention histogram: ` +
    [...counts.entries()].sort((x,z)=>x[0]-z[0]).map(([k,n])=>`${k} lifts x ${n} classes`).join(', '));
  console.log(`  identity predicts every class keeps prod(p-2) = ${expect}: ` +
    (counts.size === 1 && counts.has(expect) ? 'UNIFORM over all classes, no exception' : 'NOT UNIFORM'));
  // and the depth of an arbitrary band, before and after
  const band = []; for (let r = 169; r < 338; r++) band.push(r % Pb);   // [13^2, 2*13^2)
  const twin = (r, ps) => ps.every(p => r % p !== 0 && (r + 2) % p !== 0);
  let bBefore = 0; for (const off of band) if (twin(off, base.filter(p=>p>2))) bBefore++;
  let gBefore = 0; for (let r = 0; r < Pb; r++) if (twin(r, base.filter(p=>p>2))) gBefore++;
  let bAfter = 0, gAfter = 0;
  const all = base.concat(add).filter(p => p > 2), Pl = Pb*M;
  for (const off of band) for (let k = 0; k < M; k++) if (twin(k*Pb + off, all)) bAfter++;
  for (let r = 0; r < Pl; r++) if (twin(r, all)) gAfter++;
  const dBefore = (bBefore/band.length)/(gBefore/Pb), dAfter = (bAfter/(band.length*M))/(gAfter/Pl);
  console.log(`  band [169,338) depth at level 13 = ${dBefore.toFixed(10)}   at level 19 = ${dAfter.toFixed(10)}`);
  console.log(`  invariant to 1e-12: ${Math.abs(dBefore - dAfter) < 1e-12}`);
  // where position COULD interact: the killed classes of a new prime, seen from the band
  const hit = add.map(p => { let n = 0; for (const off of band) if (off % p === 0 || (off + 2) % p === 0) n++; return `${p}: ${n}/${band.length} band classes are themselves killed`; });
  console.log(`  the band is NOT uniform against the new primes as INTEGERS (${hit.join('; ')}),`);
  console.log('  and that is the step that does not matter: the lemma acts on LIFTS of each');
  console.log('  class mod P_b, where gcd(P_b, p) = 1 forces k*P_b + off to hit every residue');
  console.log('  mod p equally often as k runs, uniformly in off.  Position cannot enter.');
}

// --------------------------------------------------------------------------
console.log('\n=== (E) the score, read by the letter of shadow-prereg.md ===');
{
  const tol = 0.011;
  const d1fail = mine.filter(r => Math.abs(r.m - r.P) > tol);
  let d2fail = 0; for (let i = 1; i < mine.length; i++) if (mine[i].m >= mine[i-1].m) d2fail++;
  console.log(`  prereg D1: "|B_x(y) - measured(y)| <= 0.011 at EVERY deciding level"`);
  console.log(`    deciding levels are y >= 997; clusters violating it: ${d1fail.length} (${d1fail.map(r=>'y~'+r.y0).join(', ') || 'none'})`);
  console.log(`  prereg D2: "the measured band ratio also falls with y"; steps that rise: ${d2fail}`);
  console.log(`  prereg verdicts: DERIVED needs D1 AND D2 AND D3; SHAPE-ONLY is D3 with D1 or D2 failing.`);
  console.log(`  By the letter of the pre-registration the verdict is ${(d1fail.length === 0 && d2fail === 0) ? 'DERIVED' : 'SHAPE-ONLY'}, not DERIVED.`);
  console.log(`  "DERIVED above y ~ 1400" restricts the deciding set AFTER the measurement,`);
  console.log(`  which the pre-registration's own last line forbids.`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --node-flag --max-old-space-size=6144 research/adversary-wave2-01-shadow.js
//   invocation:  node --max-old-space-size=6144 research/adversary-wave2-01-shadow.js
//   code-sha256: 6cb512c5722e6c7cc03df5f430ec134f9a50797edb65ad7a85bfe073e6aac01c
//   out-sha256:  8ac49fb1d4d6ec88c8cb644e4f7657b06a45a043bc0b35e51431e2eda560870f
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     15.9 s
// ============================================================================
// === (A) the drift coefficient: closed form, not a fit ===
//   first moment of the x-weight, closed form  2 - 1/ln2 = 0.5573049591
//   same by midpoint quadrature (4e6 panels)             = 0.5573049591
//   shadow-buchstab-01 hardcodes                           0.5573013
//   hardcoded minus closed form                          = -3.659e-6
//   relative slope of rho at u=2 from the right           = 1.000000   (the proof needs exactly 1)
//   relative slope of rho at u=2 from the left            = -1.000000   (a V, not a smooth minimum)
//   coefficient read off the exact integral, (B_x/rho(2) - 1)/w:
//     y = 1e3   w = 0.100343  ->  0.51018312
//     y = 1e6   w = 0.050172  ->  0.53323406
//     y = 1e12  w = 0.025086  ->  0.54514177
//     y = 1e30  w = 0.010034  ->  0.55240906
//     y = 1e80  w = 0.003763  ->  0.55546422
//   VERDICT A: the coefficient is DERIVED and equals 2 - 1/ln2 exactly;
//              the record states it only to four figures and the producer
//              hardcodes a value wrong in the sixth decimal.
//
// === (B) the ten clusters, re-measured by the complementary sieve ===
//   cluster  levels  y range        measured   published  slots        published    B_x(pred)  residual
//   1000       36   881-1117        0.85004    0.85004     266735     266735     0.83365  +0.01639
//   1400       45   1237-1567       0.84124    0.84124     591384     591384     0.83192  +0.00932
//   2000       59   1777-2239       0.83285    0.83285    1417269    1417269     0.83025  +0.00260
//   2900       53   2557-2963       0.83212    0.83212    2219418    2219418     0.82886  +0.00326
//   4200       28   3697-3919       0.82830    0.82830    2052941    2052941     0.82756  +0.00074
//   6000       14   5281-5413       0.82690    0.82690    1868376    1868376     0.82629  +0.00061
//   8500        8   7481-7529       0.82741    0.82741    1945202    1945202     0.82512  +0.00229
//   12000       4   10567-10601     0.82325    0.82325    1785182    1785182     0.82401  -0.00075
//   18000       2   15859-15877     0.82315    0.82315    1840503    1840503     0.82279  +0.00036
//   26000       1   22901-22901     0.82279    0.82279    1779677    1779677     0.82177  +0.00102
//   clusters whose measured ratio, slot count and prediction all reproduce: 10 of 10
//
// === (C) D2 on a binning the record never used, and the SIZE of the drift ===
//   one prime per rung, no pooling, rungs fixed geometrically at 1000*2^(k/3)
//   y        w         measured   B_x(pred)  residual   step vs previous
//   1009     0.100213    0.85431    0.83361   +0.02071      -
//   1277     0.096913    0.84311    0.83238   +0.01073   fall -0.01120
//   1597     0.093975    0.83805    0.83129   +0.00676   fall -0.00506
//   2003     0.091175    0.83232    0.83024   +0.00208   fall -0.00573
//   2521     0.088497    0.83246    0.82924   +0.00322   RISE 0.00013
//   3181     0.085946    0.83118    0.82827   +0.00291   fall -0.00127
//   4001     0.083569    0.82851    0.82737   +0.00114   fall -0.00267
//   5051     0.081285    0.82598    0.82650   -0.00052   fall -0.00254
//   6353     0.079156    0.82460    0.82568   -0.00109   fall -0.00138
//   8009     0.077116    0.82688    0.82490   +0.00198   RISE 0.00229
//   10079    0.075193    0.82400    0.82416   -0.00016   fall -0.00289
//   12703    0.073352    0.82368    0.82345   +0.00023   fall -0.00032
//   16001    0.071603    0.82306    0.82277   +0.00029   fall -0.00062
//   20161    0.069934    0.82274    0.82212   +0.00062   fall -0.00032
//   25409    0.068338    0.82224    0.82150   +0.00075   fall -0.00050
//   monotonicity violations on this binning: 2 of 14 steps
//   (the record's own binning reports 1 of 9)
//   drift over the ladder: measured -0.03207  predicted -0.01211  ratio 2.648
//   drift over the record's own clusters: measured -0.02726  predicted -0.01188  ratio 2.295
//   same, restricted to y >= 2000: measured -0.01006  predicted -0.00848  ratio 1.186
//
// === (D) the Exact Invariance Lemma, at a pair attack2-03-09 did not use ===
//   classes mod 30030, lifts each = 323; retention histogram: 255 lifts x 30030 classes
//   identity predicts every class keeps prod(p-2) = 255: UNIFORM over all classes, no exception
//   band [169,338) depth at level 13 = 0.9572649573   at level 19 = 0.9572649573
//   invariant to 1e-12: true
//   the band is NOT uniform against the new primes as INTEGERS (17: 19/169 band classes are themselves killed; 19: 18/169 band classes are themselves killed),
//   and that is the step that does not matter: the lemma acts on LIFTS of each
//   class mod P_b, where gcd(P_b, p) = 1 forces k*P_b + off to hit every residue
//   mod p equally often as k runs, uniformly in off.  Position cannot enter.
//
// === (E) the score, read by the letter of shadow-prereg.md ===
//   prereg D1: "|B_x(y) - measured(y)| <= 0.011 at EVERY deciding level"
//     deciding levels are y >= 997; clusters violating it: 1 (y~1000)
//   prereg D2: "the measured band ratio also falls with y"; steps that rise: 1
//   prereg verdicts: DERIVED needs D1 AND D2 AND D3; SHAPE-ONLY is D3 with D1 or D2 failing.
//   By the letter of the pre-registration the verdict is SHAPE-ONLY, not DERIVED.
//   "DERIVED above y ~ 1400" restricts the deciding set AFTER the measurement,
//   which the pre-registration's own last line forbids.
// ============================================================================
// READINGS
// A1. THE 0.5573 IS DERIVED, AND IT HAS A CLOSED FORM THE RECORD DOES NOT STATE.
//   The band average's first-order coefficient is the first moment of the
//   x-weight over the band, int_0^1 s ln2 2^s ds = 2 - 1/ln2 = 0.5573049591,
//   reproduced by quadrature to ten digits and approached by the exact integral
//   from below as w -> 0. It is not fitted. Two corrections follow:
//   `shadow-buchstab-01-candidate.js` hardcodes 0.5573013, which is wrong in the
//   sixth decimal, and the drift law should be published with the coefficient in
//   closed form as `rho(2) (1 + (2 - 1/ln2) ln2/ln y + O(1/ln^2 y))`.
// A2. THE MEASUREMENT REPRODUCES EXACTLY, 10 OF 10 CLUSTERS. A sieve written on
//   the complementary formulation (y-rough flags ANDed with themselves shifted
//   by 2, rather than marking 0 and -2 mod p) returns the same ratio to five
//   decimals AND the same integer slot count at every one of the ten clusters,
//   including 1779677 at y ~ 26000. The instrument of `shadow-buchstab-02` is
//   sound; nothing in part (B) is a defect.
// A3. D2 IS NOT CHERRY-BINNED, AND THE SIGN TEST HIDES THE REAL MISMATCH. On a
//   binning the record never used -- one prime per rung of a fixed geometric
//   ladder, no pooling -- the fall is violated 2 times in 14 steps against the
//   record's 1 in 9, so the trend is a property of the object and not of the
//   author's cluster centres. But the SIZE of the drift is not what the law
//   predicts: measured -0.03207 against predicted -0.01211 over the ladder, a
//   ratio of 2.648, and 2.295 on the record's own clusters. Restricted to
//   y >= 2000 the ratio falls to 1.186. So the drift law's FORM is right and its
//   AMPLITUDE is not yet, exactly as the record's own small-y residual says --
//   but the record does not report the amplitude ratio, and it should.
// A4. THE EXACT INVARIANCE LEMMA IS CRT-COMPLETE. The step the proof needs is
//   that every class mod P_b keeps exactly prod(p-2) of its prod(p) lifts. Over
//   all 30030 classes and 323 lifts each, the retention histogram has ONE entry:
//   255 lifts for every class, no exception. The band's depth is invariant to
//   1e-12 across a level change the lemma was not previously tested on. The
//   place where band position could interact is isolated and shown not to: the
//   band is emphatically NOT uniform against the new primes as integers (19 and
//   18 of its 169 classes are themselves killed), and the lemma does not care,
//   because it acts on the LIFTS of each class, where gcd(P_b, p) = 1 forces
//   equidistribution uniformly in the class. The attack fails; the lemma holds.
// A5. BY THE LETTER OF THE PRE-REGISTRATION THE VERDICT IS SHAPE-ONLY. D1 is
//   written "at every deciding level" and the deciding set is "y >= 997"; the
//   y ~ 1000 cluster misses the tolerance, at a residual of +0.01639 against
//   0.011. D2 is written as a fall and one
//   step rises. The prereg's DERIVED requires D1 and D2 and D3. "DERIVED above
//   y ~ 1400" narrows the deciding set after the measurement, which the
//   prereg's own closing line -- "no other statistic will be promoted to a
//   verdict after the fact" -- was written to prevent. The evidence is strong
//   and the label is one grade too high.
