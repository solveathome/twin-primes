#!/usr/bin/env node
'use strict';
// ============================================================================
// ATTACK-0830-TAIL-DERIVATION — THE ENSEMBLE TAIL OF THE TILE, EXACT AT
// x = 7..29, AGAINST THE ANCHORED TAIL THE RECORD MEASURED
// ============================================================================
// TASK. TODO Z4, tail half, derivation step. Companion of
// research/history/staging/attack-0830-tail-derivation.md. The record
// (research/zone-tail-02.js, 27,292 zones to 1e11) measures the zone's tail
// tail(p) = p'^2 - a_last at c = 0.7522 ln^2(p'^2) in the top band, and a
// surplus over the exactly matched class null of 1.0157. This file computes
// the object whose expectation DERIVES with no prime input, the ensemble
// version of the same functional over all x# translates, and the exact
// conditionals a "rough origin" mechanism would have to explain.
//
// THE OBJECT. T_x is the twin-slot tile: positions a in [0, W), W = x#, with
// a and a+2 coprime to W; there are D = prod_{5<=q<=x}(q-2) of them and their
// gaps g_i sum to W. For an integer origin o (mod W) define, in the record's
// own convention (zone-tail-01.md section 1: a_last is the largest opener with
// a + 2 < origin, strict),
//
//     tau(o) = o - max{ a opener : a + 2 < o }.
//
// By the Zone Restriction Lemma (zonegap-02-reduction.md section 1, PROVEN)
// the record's tail(p) is EXACTLY tau(p'^2) read on T_p at phase zero: the
// in-zone twin slots ARE the in-zone twin primes. So tail(p) is one member
// of the ensemble {tau(o)}, and the ensemble means below are the derivable
// part of the law.
//
// IDENTITIES (one line each, asserted per level by direct summation):
//   E_all[tau]  over all o in Z/W          = R + 5/2,   R := Sum g^2 / (2 W)
//   E_odd[tau]  over odd o                 = R + 3
//   (the corpus's "R + 1/2" is the convention a <= o without the strict +2;
//    under the record's tail convention the constants are 5/2 and 3.)
// CONDITIONALS, exact, no closed form:
//   E_class     o = 1, 19 (mod 30), all such integers   [the record's classNull population]
//   E_rough     o coprime to W (a hole of T_x)          [p'^2 is coprime to p#]
//   E_rc        o coprime to W AND o = 1, 19 (mod 30)   [both properties p'^2 has]
//   E_sq        o a square unit mod W: a QR mod every odd q <= x [p'^2 is a square]
// The record's surplus t/classNull = 1.0157 is an anchored measurement; the
// ensemble analogues are E_rc/E_class and E_sq/E_class, exact.
//
// CUSTODY, before any new number. (i) D, mbar = W/D and G2 at every level are
// asserted against research/gap-spectrum-01.js's bound block; (ii) the
// phase-zero zone statistics (pairs, head, tail, Z2, width) at p = 7..23 are
// asserted against research/zonegap-02-reduction.js's bound block; (iii) the
// record's top-band figures are PARSED from research/zone-tail-02.js's bound
// block and printed, never typed; (iv) 1/(2 C2) is recomputed and asserted
// against the 0.757390 the red team recomputed (redteam-0829-measure-b.md
// section 1c C6).
//
// WIDTH AUDIT. Runs at x <= 29 by default. W(29) = 6,469,693,230 < 2^33,
// D(29) = 214,708,725, Sum g^2 <= D * G2^2 = 2.15e8 * 258^2 = 1.43e13 < 2^53,
// per-gap class sums k*(n0 - prevA) + 15k(k-1) < 2*G2^2, exact; all sums of
// distances over o are < W * G2 = 1.7e12 < 2^53. Positions are held in a
// Uint8Array segment of 2^24, so no position index is narrower than a double.
// --to 31 is accepted (W = 2.0e11 < 2^38, Sum g^2 < 6.3e9 * 348^2 = 7.6e14,
// exact) but is NOT the embedded invocation; gap-spectrum-01.js's scan at
// @31 took 1280 s and this file does more per hole.
//
// stdout carries no timing; progress goes to stderr.
// ============================================================================

const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..', '..');
const argv = process.argv.slice(2);
const optOf = (n, d) => { const i = argv.indexOf('--' + n); return i === -1 ? d : argv[i + 1]; };
const XMAX = Number(optOf('to', 29));
const LEVELS = [7, 11, 13, 17, 19, 23, 29, 31].filter(x => x <= XMAX);

const log = (s = '') => console.log(s);
const err = (s) => process.stderr.write(s + '\n');
let failures = 0;
function assertEq(name, got, want, tol) {
  const ok = tol === undefined ? got === want : Math.abs(got - want) <= tol;
  if (!ok) { failures++; log(`  ASSERTION FAILED [${name}]: got ${got}, want ${want}`); }
  return ok;
}
const F = (v, d) => Number(v).toFixed(d);
const GAMMA = 0.5772156649015329;
const CLS = [1, 19];

function primesTo(n) {
  const s = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { out.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return out;
}

// ---------------------------------------------------------------------------
// SEC 0 — CONSTANTS, recomputed
// ---------------------------------------------------------------------------
log('SEC 0 — CONSTANTS (recomputed here, asserted against the corpus)');
let C2 = 1;
for (const q of primesTo(20000000)) if (q > 2) C2 *= 1 - 1 / ((q - 1) * (q - 1));
const HL = 1 / (2 * C2);
const RHO2 = Math.exp(2 * GAMMA) / 4;
const ENS = Math.exp(2 * GAMMA) / (8 * C2);
log(`  C2 = ${F(C2, 7)} (product to 2e7); 1/(2 C2) = ${F(HL, 6)}; e^{2gamma}/4 = ${F(RHO2, 6)}; e^{2gamma}/(8 C2) = ${F(ENS, 6)}`);
log(`  identity: e^{2gamma}/(8 C2) = (1/(2 C2)) x (e^{2gamma}/4): ${F(HL * RHO2, 6)}`);
assertEq('1/(2C2) vs redteam-0829-measure-b C6 0.757390', HL, 0.757390, 2e-6);
assertEq('e^{2gamma}/4 vs origin-excess 0.79305', RHO2, 0.79305, 1e-5);
log();

// ---------------------------------------------------------------------------
// SEC 1 — CUSTODY: the record's figures, PARSED from the bound blocks
// ---------------------------------------------------------------------------
log('SEC 1 — CUSTODY: figures parsed from bound OUTPUT blocks (never typed)');
// only the BOUND block of each producer is read: everything above its
// OUTPUT banner is code, and the code repeats the section titles.
function boundBlock(rel) {
  const src = fs.readFileSync(path.join(REPO, rel), 'utf8');
  const i = src.indexOf('// OUTPUT — EMBEDDED');
  if (i < 0) throw new Error('no bound block in ' + rel);
  return src.slice(i);
}
const ZT2 = boundBlock('research/zone-tail-02.js');
const GS1 = boundBlock('research/gap-spectrum-01.js');
const ZR2 = boundBlock('research/zonegap-02-reduction.js');

function block(src, secTag, nextTag) {
  const i = src.indexOf(secTag); const j = src.indexOf(nextTag, i + 1);
  if (i < 0 || j < 0) throw new Error('block not found ' + secTag);
  return src.slice(i, j);
}
const secC = block(ZT2, '// SEC C — THE TAIL LAW', '// SEC D');
const secE = block(ZT2, '// SEC E — RENEWAL COMPARATOR', '// SEC F');
const mC = /1e5-p\.5\s+(\d+)\s+([\d.]+)\s+([\d.]+)\s+\[([\d.]+),([\d.]+)\]\s+([\d.]+)\s+([\d.]+)/.exec(secC);
const mE = /1e5-p\.5\s+(\d+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/.exec(secE);
const mB1 = /t\/R_shell = ([\d.]+), bootstrap \[([\d.]+), ([\d.]+)\]/.exec(secE);
const mB2 = /t\/classNull bootstrap \[([\d.]+), ([\d.]+)\]/.exec(secE);
if (!mC || !mE || !mB1 || !mB2) throw new Error('zone-tail-02.js bound block did not parse');
const rec = {
  zones: Number(mC[1]), meanTail: Number(mC[2]), cLocal: Number(mC[3]), cLo: Number(mC[4]), cHi: Number(mC[5]), cP: Number(mC[6]), cOverHL: Number(mC[7]),
  Rshell: Number(mE[3]), tRshell: Number(mE[4]), Rbin: Number(mE[5]), tRbin: Number(mE[6]), Rband: Number(mE[7]), tRband: Number(mE[8]), classNull: Number(mE[9]), tClass: Number(mE[10]),
  bsShellLo: Number(mB1[2]), bsShellHi: Number(mB1[3]), bsClassLo: Number(mB2[1]), bsClassHi: Number(mB2[2]),
};
assertEq('SEC E mean tail equals SEC C mean tail', Number(mE[2]), rec.meanTail);
log(`  zone-tail-02.js SEC C, top band 1e5-p.5: zones ${rec.zones}, mean tail ${F(rec.meanTail, 2)}, c_local ${F(rec.cLocal, 4)} [${F(rec.cLo, 4)}, ${F(rec.cHi, 4)}], c_p ${F(rec.cP, 4)}, c_local/HL ${F(rec.cOverHL, 4)}`);
log(`  zone-tail-02.js SEC E, top band: R_shell ${F(rec.Rshell, 2)}, t/R_shell ${F(rec.tRshell, 4)} [${F(rec.bsShellLo, 4)}, ${F(rec.bsShellHi, 4)}]; classNull ${F(rec.classNull, 2)}, t/classNull ${F(rec.tClass, 4)} [${F(rec.bsClassLo, 4)}, ${F(rec.bsClassHi, 4)}]`);
log(`  derived from the parsed figures (arithmetic on the record, not new data):`);
const meanLn2 = rec.meanTail / rec.cLocal;
const RoverLn2 = rec.Rshell / meanLn2;
const classOverLn2 = rec.classNull / meanLn2;
log(`    mean ln^2(p'^2) over the band = mean tail / c_local = ${F(meanLn2, 2)}`);
log(`    R_shell / ln^2(p'^2) = ${F(RoverLn2, 4)} = ${F(RoverLn2 / HL, 4)} x HL's ${F(HL, 4)}`);
log(`    classNull / ln^2(p'^2) = ${F(classOverLn2, 4)}; classNull - R_shell = ${F(rec.classNull - rec.Rshell, 2)}; (classNull - R_shell)/R_shell = ${F((rec.classNull - rec.Rshell) / rec.Rshell, 4)}`);
log(`    c_local = (R_shell/ln^2) x (t/R_shell): ${F(RoverLn2 * rec.tRshell, 4)} against the parsed ${F(rec.cLocal, 4)}`);
log(`    c_local = (classNull/ln^2) x (t/classNull): ${F(classOverLn2 * rec.tClass, 4)} against the parsed ${F(rec.cLocal, 4)}`);
log(`    if the band's twin density were exactly HL, (1 + CV^2)/2 of the zone's twin gaps would read R_shell/(HL ln^2) = ${F(RoverLn2 / HL, 4)}, CV^2 = ${F(2 * RoverLn2 / HL - 1, 4)};`);
log(`    the finite-height HL density factor and the gap-shape factor are NOT separable from the record's figures (stated in the note).`);
log(`    the surplus re-read against the convention-correct discrete constants of SEC 2 (tail convention a + 2 < o, strict):`);
log(`      t/(R_shell + 5/2) [all integer origins] = ${F(rec.meanTail / (rec.Rshell + 2.5), 4)};  t/(R_shell + 3) [odd origins] = ${F(rec.meanTail / (rec.Rshell + 3), 4)};  against t/R_shell = ${F(rec.tRshell, 4)} and t/classNull = ${F(rec.tClass, 4)}`);
const mD = /10\^1\s+(\d+)\s+(\d+)\s+[\d.]+\s+[\d.]+\s+[\d.e+-]+\s+[\d.]+/.exec(block(ZT2, '// SEC D — WORST CASE', '//   GLOBAL'));
if (!mD) throw new Error('zone-tail-02.js SEC D 10^1 row did not parse');
const recMaxTail29 = { tail: Number(mD[1]), p: Number(mD[2]) };
log(`  zone-tail-02.js SEC D, band 10^1: max tail ${recMaxTail29.tail} at p = ${recMaxTail29.p} (asserted against the tile's phase-zero zone at x = 29 in SEC 3)`);

const gsRows = {};
for (const m of GS1.matchAll(/x = (\d+)\s+\(D = (\d+), mbar = ([\d.]+), G2 = (\d+)\)/g)) if (!gsRows[m[1]]) gsRows[m[1]] = { D: Number(m[2]), mbar: Number(m[3]), G2: Number(m[4]) };
const zrRows = {};
for (const m of ZR2.matchAll(/p=(\d+): width (\d+) = head (\d+) \+ sumGaps (\d+) \+ tail (\d+); Z2 (\d+) \(pairs (\d+)\)/g)) zrRows[m[1]] = { width: Number(m[2]), head: Number(m[3]), sumGaps: Number(m[4]), tail: Number(m[5]), Z2: Number(m[6]), pairs: Number(m[7]) };
log(`  gap-spectrum-01.js rows parsed: x = ${Object.keys(gsRows).join(', ')}; zonegap-02-reduction.js rows parsed: p = ${Object.keys(zrRows).join(', ')}`);
log();

// ---------------------------------------------------------------------------
// SEC 2 — THE ENSEMBLE OBJECT, one streaming pass per level
// ---------------------------------------------------------------------------
function level(x) {
  const ps = primesTo(x);
  let W = 1; for (const q of ps) W *= q;
  const SEG = 1 << 24;
  const seg = new Uint8Array(SEG + 2);
  const oddQ = ps.filter(q => q > 2);
  const isQR = {};
  for (const q of oddQ) { const t = new Uint8Array(q); for (let r = 1; r < q; r++) t[(r * r) % q] = 1; isQR[q] = t; }

  // gap accumulators
  let D = 0, sumG = 0, sumG2 = 0, maxG = 0;
  let prevA = -1, firstA = -1;
  // closed-form origin sums per gap
  let allD = 0, allC = 0, oddD = 0, oddC = 0, clsD = 0, clsC = 0;
  // per-hole accumulators (rough, rough&class, square-unit)
  let rghD = 0, rghC = 0, rcD = 0, rcC = 0, sqD = 0, sqC = 0, holes = 0;
  // direct all-origin check at small levels
  const direct = W <= (1 << 28);
  let dirD = 0, dirC = 0;
  // openers found but not yet effective (a + 2 < o)
  const pend = [];
  let pendHead = 0;
  let effA = null; // effective prevA for per-position work
  const early = []; // positions before the first effective opener: [o, isHole, isClass, isSq]

  function onGap(g, a0) {
    // gap from opener a0 to the next opener a0 + g; origins o in [a0 + 3, a0 + 2 + g]
    D++; sumG += g; sumG2 += g * g; if (g > maxG) maxG = g;
    allD += g * (g + 5) / 2; allC += g;
    oddD += g * (g + 6) / 4; oddC += g / 2;
    const lo = a0 + 3, hi = a0 + 2 + g;
    for (let ci = 0; ci < 2; ci++) {
      const c = CLS[ci];
      const n0 = lo + ((c - (lo % 30)) % 30 + 30) % 30;
      if (n0 <= hi) { const k = Math.floor((hi - n0) / 30) + 1; clsD += k * (n0 - a0) + 15 * k * (k - 1); clsC += k; }
    }
  }
  function holeAt(o) { // o in [0, W)
    let r = o % 2; if (r === 0) return false;
    for (let i = 1; i < ps.length; i++) if (o % ps[i] === 0) return false;
    return true;
  }
  function tallyOrigin(o, isHole, isCls, isSq, pa) {
    const d = o - pa;
    if (direct) { dirD += d; dirC++; }
    if (isHole) {
      holes++; rghD += d; rghC++;
      if (isCls) { rcD += d; rcC++; }
      if (isSq) { sqD += d; sqC++; }
    }
  }
  const t0 = Date.now();
  for (let lo = 0; lo < W; lo += SEG) {
    const hi = Math.min(lo + SEG, W); // exclusive
    const len = hi - lo;
    seg.fill(0, 0, len + 2);
    for (const q of ps) {
      let m = Math.ceil(lo / q) * q;
      for (; m < hi + 2; m += q) seg[m - lo] = 1;
    }
    for (let i = 0; i < len; i++) {
      const o = lo + i;
      if (seg[i]) {
        // not a hole: only the direct all-origin check needs it
        if (direct) {
          while (pendHead < pend.length && pend[pendHead] + 2 < o) { effA = pend[pendHead++]; }
          if (effA === null) early.push([o, false, false, false]); else { dirD += o - effA; dirC++; }
        }
        continue;
      }
      // hole at o. Is it an opener? need hole at o + 2 (mod W)
      let h2;
      if (o + 2 < W) h2 = !seg[i + 2]; else h2 = holeAt(o + 2 - W);
      if (h2) {
        if (prevA >= 0) onGap(o - prevA, prevA); else firstA = o;
        prevA = o; pend.push(o);
      }
      // per-position work for this hole
      while (pendHead < pend.length && pend[pendHead] + 2 < o) { effA = pend[pendHead++]; }
      if (pendHead > 4096) { pend.splice(0, pendHead); pendHead = 0; }
      const r30 = o % 30;
      const isCls = (r30 === 1 || r30 === 19);
      let isSq = true;
      for (const q of oddQ) if (!isQR[q][o % q]) { isSq = false; break; }
      if (effA === null) { early.push([o, true, isCls, isSq]); continue; }
      tallyOrigin(o, true, isCls, isSq, effA);
    }
    if (W > SEG) err(`  [@${x}] ${(100 * hi / W).toFixed(0)}%  ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  }
  // wrap gap: from the last opener to the first opener + W
  const lastA = prevA;
  onGap(firstA + W - lastA, lastA);
  // early positions: those in (lastA + 2 - W, ...] belong to the wrap gap; the
  // ones at or below lastA + 2 - W (positions 0, 1 when lastA = W - 1) belong
  // to the gap before it, whose opener is the second-to-last one.
  let secondLastA = -1;
  { // the second-to-last opener: scan backwards from lastA - 1 (a few hundred positions at most)
    for (let a = lastA - 2; a > lastA - 4000; a -= 2) if (holeAt(a) && holeAt(a + 2)) { secondLastA = a; break; }
    if (secondLastA < 0) throw new Error('second-to-last opener not found');
  }
  early.sort((u, v) => u[0] - v[0]);
  for (const [o, isHole, isCls, isSq] of early) {
    const pa = (lastA + 2 < o + W) ? lastA - W : secondLastA - W;
    if (isHole) tallyOrigin(o, true, isCls, isSq, pa); else { dirD += o - pa; dirC++; }
  }
  const mbar = W / D;
  const M2 = sumG2 / D;
  const R = sumG2 / (2 * W);
  const CV2 = M2 / (mbar * mbar) - 1;
  return {
    x, W, D, mbar, M2, R, CV2, G2: maxG, firstA, lastA,
    E_all: allD / allC, n_all: allC, E_odd: oddD / oddC, E_cls: clsD / clsC, n_cls: clsC,
    E_rgh: rghD / rghC, n_rgh: rghC, E_rc: rcD / rcC, n_rc: rcC, E_sq: sqD / sqC, n_sq: sqC, holes,
    direct, E_dir: direct ? dirD / dirC : NaN, n_dir: dirC,
  };
}

// phase-zero zone statistics of T_x, from the tile itself (no prime table)
function zoneOf(x) {
  const ps = primesTo(x);
  const coprime = (n) => { for (const q of ps) if (n % q === 0) return false; return true; };
  let pp = x + 1; while (!coprime(pp)) pp++;         // first hole above 1 is p' (ZRL supporting clause)
  const top = pp * pp;
  const openers = [];
  for (let a = x + 1; a + 2 < top; a++) if (coprime(a) && coprime(a + 2)) openers.push(a);
  let Z2 = 0; for (let i = 1; i < openers.length; i++) Z2 = Math.max(Z2, openers[i] - openers[i - 1]);
  return { p: x, pp, top, width: top - x, pairs: openers.length, head: openers[0] - x, tail: top - openers[openers.length - 1], Z2 };
}

log('SEC 2 — THE ENSEMBLE OBJECT tau(o) = o - max{a : a + 2 < o} ON T_x, EXACT, ONE PASS PER LEVEL');
log('  Custody rows first: D, mbar, G2 against gap-spectrum-01.js; identities E_all = R + 5/2 and E_odd = R + 3 by direct summation where W <= 2^28.');
const rows = [];
for (const x of LEVELS) {
  err(`level ${x} ...`);
  const r = level(x);
  rows.push(r);
  const gs = gsRows[String(x)];
  if (gs) { assertEq(`D@${x} vs gap-spectrum-01`, r.D, gs.D); assertEq(`mbar@${x} vs gap-spectrum-01`, r.mbar, gs.mbar, 5e-5); assertEq(`G2@${x} vs gap-spectrum-01`, r.G2, gs.G2); }
  let Dform = 1; for (const q of primesTo(x)) if (q >= 5) Dform *= q - 2;
  assertEq(`D@${x} = prod(q-2)`, r.D, Dform);
  assertEq(`sum g = W @${x}`, r.n_all, r.W);
  assertEq(`E_all = R + 5/2 @${x}`, r.E_all, r.R + 2.5, 1e-9 * r.R);
  assertEq(`E_odd = R + 3 @${x}`, r.E_odd, r.R + 3, 1e-9 * r.R);
  if (r.direct) { assertEq(`direct all-origin sum = closed form @${x}`, r.E_dir, r.E_all, 1e-9 * r.R); assertEq(`direct origin count = W @${x}`, r.n_dir, r.W); }
  let phi = 1; for (const q of primesTo(x)) phi *= q - 1;
  assertEq(`holes = phi(W) @${x}`, r.holes, phi);
  assertEq(`rough origins = phi(W) @${x}`, r.n_rgh, phi);
  let sqCount = 1; for (const q of primesTo(x)) if (q > 2) sqCount *= (q - 1) / 2;
  assertEq(`square units = prod (q-1)/2 @${x}`, r.n_sq, sqCount);
  log(`  x = ${x}: W = ${r.W}, D = ${r.D}, mbar = ${F(r.mbar, 4)}, G2 = ${r.G2}, holes = ${r.holes}, square units = ${r.n_sq}; custody ${gs ? 'asserted' : 'no gap-spectrum row'}`);
}
log();
log('  2(a) — THE TILE\'S GAP MOMENTS AND THE ENSEMBLE MEAN (exact; R = Sum g^2 / 2W)');
log('  x     mbar        M2=E[g^2]     CV^2      R         E_all=R+5/2   E_odd=R+3   R/mbar=(1+CV^2)/2');
for (const r of rows) log(`  ${String(r.x).padStart(2)}  ${F(r.mbar, 4).padStart(9)}  ${F(r.M2, 3).padStart(12)}  ${F(r.CV2, 4).padStart(7)}  ${F(r.R, 4).padStart(9)}  ${F(r.E_all, 4).padStart(11)}  ${F(r.E_odd, 4).padStart(10)}  ${F(r.R / r.mbar, 4).padStart(9)}`);
log();
log('  2(b) — THE CONDITIONALS, exact (E_cls: all integers = 1, 19 mod 30; E_rgh: coprime to W; E_rc: both; E_sq: square unit mod W)');
log('  x     E_cls       E_cls-R   E_rgh       E_rc        E_sq        E_cls/E_odd  E_rgh/E_odd  E_rc/E_cls  E_sq/E_cls  E_sq/E_rc   n_cls        n_rc         n_sq');
for (const r of rows) log(`  ${String(r.x).padStart(2)}  ${F(r.E_cls, 4).padStart(9)}  ${F(r.E_cls - r.R, 4).padStart(8)}  ${F(r.E_rgh, 4).padStart(9)}  ${F(r.E_rc, 4).padStart(9)}  ${F(r.E_sq, 4).padStart(9)}  ${F(r.E_cls / r.E_odd, 4).padStart(10)}  ${F(r.E_rgh / r.E_odd, 4).padStart(10)}  ${F(r.E_rc / r.E_cls, 4).padStart(9)}  ${F(r.E_sq / r.E_cls, 4).padStart(9)}  ${F(r.E_sq / r.E_rc, 4).padStart(9)}  ${String(r.n_cls).padStart(11)}  ${String(r.n_rc).padStart(11)}  ${String(r.n_sq).padStart(9)}`);
log();

// ---------------------------------------------------------------------------
// SEC 3 — THE ANCHORED MEMBER: the phase-zero zone, against the ensemble
// ---------------------------------------------------------------------------
log('SEC 3 — THE ANCHORED MEMBER tail(p) = tau(p\'^2) AT PHASE ZERO, from the tile (Zone Restriction Lemma), against zonegap-02-reduction.js');
log('  p    p\'   width   pairs  head  tail   Z2    tail/E_rc   tail/E_all   zone density / tile density   custody');
for (const r of rows) {
  const z = zoneOf(r.x);
  const zr = zrRows[String(r.x)];
  let cust = 'no hand-verified row';
  if (r.x === recMaxTail29.p) { cust = assertEq(`zone tail@${r.x} vs zone-tail-02.js SEC D max tail`, z.tail, recMaxTail29.tail) ? 'IDENTICAL (zone-tail-02 SEC D)' : 'MISMATCH'; }
  if (zr) {
    const ok = assertEq(`zone pairs@${r.x}`, z.pairs, zr.pairs) & assertEq(`zone head@${r.x}`, z.head, zr.head) & assertEq(`zone tail@${r.x}`, z.tail, zr.tail) & assertEq(`zone Z2@${r.x}`, z.Z2, zr.Z2) & assertEq(`zone width@${r.x}`, z.width, zr.width);
    cust = ok ? 'IDENTICAL' : 'MISMATCH';
  }
  const dens = (z.pairs / z.width) / (r.D / r.W);
  log(`  ${String(z.p).padStart(2)}   ${String(z.pp).padStart(2)}   ${String(z.width).padStart(5)}   ${String(z.pairs).padStart(4)}   ${String(z.head).padStart(3)}   ${String(z.tail).padStart(3)}   ${String(z.Z2).padStart(3)}   ${F(z.tail / r.E_rc, 4).padStart(8)}   ${F(z.tail / r.E_all, 4).padStart(9)}   ${F(dens, 4).padStart(12)}                 ${cust}`);
}
log('  (one anchored draw per level; the anchored COEFFICIENT is a cross-p average and lives in the record, not here)');
log();

// ---------------------------------------------------------------------------
// SEC 4 — THE ENSEMBLE COEFFICIENT AND ITS ASYMPTOTIC FORM
// ---------------------------------------------------------------------------
log('SEC 4 — THE ENSEMBLE COEFFICIENT c_ens(x) = E_rc / ln^2(p\'^2), and the Mertens form of mbar');
log('  Mertens form: mbar ~ e^{2gamma} ln^2 x / (2 C2) = 4 e^{2gamma}/(8 C2) ln^2 x; in local units ln^2(p\'^2) = 4 ln^2 p\' the ensemble mean gap coefficient is e^{2gamma}/(8 C2) x (ln x / ln p\')^2.');
log('  x   p\'   ln^2(p\'^2)   mbar/(e^{2g}ln^2x/2C2)   E_all/ln^2(p\'^2)   E_rc/ln^2(p\'^2)   (1+CV^2)/2 x ENS x (ln x/ln p\')^2   [ENS = e^{2gamma}/(8C2)]');
for (const r of rows) {
  const z = zoneOf(r.x);
  const L = Math.log(z.pp * z.pp) ** 2;
  const mert = r.mbar / (Math.exp(2 * GAMMA) * Math.log(r.x) ** 2 / (2 * C2));
  const asym = ((1 + r.CV2) / 2) * ENS * (Math.log(r.x) / Math.log(z.pp)) ** 2;
  log(`  ${String(r.x).padStart(2)}  ${String(z.pp).padStart(2)}   ${F(L, 3).padStart(9)}   ${F(mert, 4).padStart(18)}   ${F(r.E_all / L, 4).padStart(15)}   ${F(r.E_rc / L, 4).padStart(14)}   ${F(asym, 4).padStart(28)}`);
}
log();
log('  THE SPLIT AT THE RECORD (arithmetic on SEC 0 constants and SEC 1 parsed figures; nothing here is a new measurement):');
log(`    HL coefficient 1/(2 C2)                         = ${F(HL, 4)}`);
log(`    ensemble asymptotic mean-gap coefficient ENS      = ${F(ENS, 4)} = HL x rho(2), rho(2) = e^{2gamma}/4 = ${F(RHO2, 4)}`);
log(`    record c_local (top band)                         = ${F(rec.cLocal, 4)}, bootstrap [${F(rec.cLo, 4)}, ${F(rec.cHi, 4)}]`);
log(`    c_local / ENS                                     = ${F(rec.cLocal / ENS, 4)}  (the anchoring the coefficient needs, against 1/rho(2) = ${F(1 / RHO2, 4)} at CV^2 = 1)`);
log(`    c_local / HL                                      = ${F(rec.cLocal / HL, 4)}`);
log(`    record's own factorisation c = (R/ln^2) x (t/R)   = ${F(RoverLn2, 4)} x ${F(rec.tRshell, 4)}; R/ln^2 = ${F(RoverLn2 / HL, 4)} x HL`);
log(`    ensemble analogue of t/classNull, E_rc/E_cls at x = ${rows.map(r => r.x).join(', ')}: ${rows.map(r => F(r.E_rc / r.E_cls, 4)).join(', ')}; record t/classNull = ${F(rec.tClass, 4)} [${F(rec.bsClassLo, 4)}, ${F(rec.bsClassHi, 4)}]`);
log(`    ensemble class offset (E_cls - R)/R at the same x: ${rows.map(r => F((r.E_cls - r.R) / r.R, 4)).join(', ')}; record (classNull - R_shell)/R_shell = ${F((rec.classNull - rec.Rshell) / rec.Rshell, 4)}`);
log(`    ensemble class offset E_cls - R in units:         ${rows.map(r => F(r.E_cls - r.R, 3)).join(', ')}; record classNull - R_shell = ${F(rec.classNull - rec.Rshell, 2)}`);
log();
log(`VERDICT LINE: ${failures} assertion failures; levels ${LEVELS.join(',')}; ensemble identities exact; conditionals exact; anchored coefficient not derived here`);
if (failures) process.exitCode = 1;

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/attack-0830-tail-derivation.js
//   invocation:  node research/history/staging/attack-0830-tail-derivation.js
//   code-sha256: beda1d9a70a4d8c8c9a95b32136ce84184a366573be3147d62e1c907750610cb
//   out-sha256:  b151f8a165bb27536aa23a1285b90dab50916c9ec2921c221bd39ebe94b457dd
//   body-lines:  84
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     380.7 s
// ============================================================================
// SEC 0 — CONSTANTS (recomputed here, asserted against the corpus)
//   C2 = 0.6601618 (product to 2e7); 1/(2 C2) = 0.757390; e^{2gamma}/4 = 0.793055; e^{2gamma}/(8 C2) = 0.600652
//   identity: e^{2gamma}/(8 C2) = (1/(2 C2)) x (e^{2gamma}/4): 0.600652
//
// SEC 1 — CUSTODY: figures parsed from bound OUTPUT blocks (never typed)
//   zone-tail-02.js SEC C, top band 1e5-p.5: zones 17700, mean tail 447.26, c_local 0.7522 [0.7410, 0.7630], c_p 3.0088, c_local/HL 0.9931
//   zone-tail-02.js SEC E, top band: R_shell 434.31, t/R_shell 1.0298 [1.0156, 1.0443]; classNull 440.36, t/classNull 1.0157 [1.0013, 1.0308]
//   derived from the parsed figures (arithmetic on the record, not new data):
//     mean ln^2(p'^2) over the band = mean tail / c_local = 594.60
//     R_shell / ln^2(p'^2) = 0.7304 = 0.9644 x HL's 0.7574
//     classNull / ln^2(p'^2) = 0.7406; classNull - R_shell = 6.05; (classNull - R_shell)/R_shell = 0.0139
//     c_local = (R_shell/ln^2) x (t/R_shell): 0.7522 against the parsed 0.7522
//     c_local = (classNull/ln^2) x (t/classNull): 0.7522 against the parsed 0.7522
//     if the band's twin density were exactly HL, (1 + CV^2)/2 of the zone's twin gaps would read R_shell/(HL ln^2) = 0.9644, CV^2 = 0.9288;
//     the finite-height HL density factor and the gap-shape factor are NOT separable from the record's figures (stated in the note).
//     the surplus re-read against the convention-correct discrete constants of SEC 2 (tail convention a + 2 < o, strict):
//       t/(R_shell + 5/2) [all integer origins] = 1.0239;  t/(R_shell + 3) [odd origins] = 1.0228;  against t/R_shell = 1.0298 and t/classNull = 1.0157
//   zone-tail-02.js SEC D, band 10^1: max tail 80 at p = 29 (asserted against the tile's phase-zero zone at x = 29 in SEC 3)
//   gap-spectrum-01.js rows parsed: x = 5, 7, 11, 13, 17, 19, 23, 29, 31; zonegap-02-reduction.js rows parsed: p = 7, 11, 13, 17, 23
//
// SEC 2 — THE ENSEMBLE OBJECT tau(o) = o - max{a : a + 2 < o} ON T_x, EXACT, ONE PASS PER LEVEL
//   Custody rows first: D, mbar, G2 against gap-spectrum-01.js; identities E_all = R + 5/2 and E_odd = R + 3 by direct summation where W <= 2^28.
//   x = 7: W = 210, D = 15, mbar = 14.0000, G2 = 30, holes = 48, square units = 6; custody asserted
//   x = 11: W = 2310, D = 135, mbar = 17.1111, G2 = 42, holes = 480, square units = 30; custody asserted
//   x = 13: W = 30030, D = 1485, mbar = 20.2222, G2 = 66, holes = 5760, square units = 180; custody asserted
//   x = 17: W = 510510, D = 22275, mbar = 22.9185, G2 = 108, holes = 92160, square units = 1440; custody asserted
//   x = 19: W = 9699690, D = 378675, mbar = 25.6148, G2 = 150, holes = 1658880, square units = 12960; custody asserted
//   x = 23: W = 223092870, D = 7952175, mbar = 28.0543, G2 = 204, holes = 36495360, square units = 142560; custody asserted
//   x = 29: W = 6469693230, D = 214708725, mbar = 30.1324, G2 = 258, holes = 1021870080, square units = 1995840; custody asserted
//
//   2(a) — THE TILE'S GAP MOMENTS AND THE ENSEMBLE MEAN (exact; R = Sum g^2 / 2W)
//   x     mbar        M2=E[g^2]     CV^2      R         E_all=R+5/2   E_odd=R+3   R/mbar=(1+CV^2)/2
//    7    14.0000       247.200   0.2612     8.8286      11.3286     11.8286     0.6306
//   11    17.1111       381.067   0.3015    11.1351      13.6351     14.1351     0.6508
//   13    20.2222       553.721   0.3540    13.6909      16.1909     16.6909     0.6770
//   17    22.9185       738.019   0.4051    16.1009      18.6009     19.1009     0.7025
//   19    25.6148       950.646   0.4489    18.5566      21.0566     21.5566     0.7244
//   23    28.0543      1165.953   0.4814    20.7803      23.2803     23.7803     0.7407
//   29    30.1324      1367.674   0.5063    22.6944      25.1944     25.6944     0.7532
//
//   2(b) — THE CONDITIONALS, exact (E_cls: all integers = 1, 19 mod 30; E_rgh: coprime to W; E_rc: both; E_sq: square unit mod W)
//   x     E_cls       E_cls-R   E_rgh       E_rc        E_sq        E_cls/E_odd  E_rgh/E_odd  E_rc/E_cls  E_sq/E_cls  E_sq/E_rc   n_cls        n_rc         n_sq
//    7    14.4286    5.6000    13.7500    14.5000    13.0000      1.2198      1.1624     1.0050     0.9010     0.8966           14           12          6
//   11    16.8442    5.7091    16.3875    17.2000    16.2000      1.1917      1.1594     1.0211     0.9618     0.9419          154          120         30
//   13    19.5235    5.8326    19.1812    20.2083    18.3667      1.1697      1.1492     1.0351     0.9407     0.9089         2002         1440        180
//   17    22.0136    5.9127    21.7729    22.9659    20.9375      1.1525      1.1399     1.0433     0.9511     0.9117        34034        23040       1440
//   19    24.5294    5.9728    24.3829    25.6618    23.5523      1.1379      1.1311     1.0462     0.9602     0.9178       646646       414720      12960
//   23    26.7880    6.0078    26.7407    28.1268    27.2983      1.1265      1.1245     1.0500     1.0190     0.9705     14872858      9123840     142560
//   29    28.7280    6.0336    28.7525    30.2300    29.0998      1.1181      1.1190     1.0523     1.0129     0.9626    431312882    255467520    1995840
//
// SEC 3 — THE ANCHORED MEMBER tail(p) = tau(p'^2) AT PHASE ZERO, from the tile (Zone Restriction Lemma), against zonegap-02-reduction.js
//   p    p'   width   pairs  head  tail   Z2    tail/E_rc   tail/E_all   zone density / tile density   custody
//    7   11     114      8     4    14    30     0.9655      1.2358         0.9825                 IDENTICAL
//   11   13     158      9     6    20    30     1.1628      1.4668         0.9747                 IDENTICAL
//   13   17     276     16     4     8    30     0.3959      0.4941         1.1723                 IDENTICAL
//   17   19     344     17    12    14    36     0.6096      0.7527         1.1326                 IDENTICAL
//   19   23     510     21    10     8    72     0.3117      0.3799         1.0547                 no hand-verified row
//   23   29     818     29     6    14   150     0.4977      0.6014         0.9946                 IDENTICAL
//   29   31     932     30    12    80   150     2.6464      3.1753         0.9699                 IDENTICAL (zone-tail-02 SEC D)
//   (one anchored draw per level; the anchored COEFFICIENT is a cross-p average and lives in the record, not here)
//
// SEC 4 — THE ENSEMBLE COEFFICIENT c_ens(x) = E_rc / ln^2(p'^2), and the Mertens form of mbar
//   Mertens form: mbar ~ e^{2gamma} ln^2 x / (2 C2) = 4 e^{2gamma}/(8 C2) ln^2 x; in local units ln^2(p'^2) = 4 ln^2 p' the ensemble mean gap coefficient is e^{2gamma}/(8 C2) x (ln x / ln p')^2.
//   x   p'   ln^2(p'^2)   mbar/(e^{2g}ln^2x/2C2)   E_all/ln^2(p'^2)   E_rc/ln^2(p'^2)   (1+CV^2)/2 x ENS x (ln x/ln p')^2   [ENS = e^{2gamma}/(8C2)]
//    7  11      23.000               1.5389            0.4926           0.6304                         0.2494
//   11  13      26.316               1.2386            0.5181           0.6536                         0.3416
//   13  17      32.108               1.2793            0.5043           0.6294                         0.3333
//   17  19      34.679               1.1884            0.5364           0.6622                         0.3907
//   19  23      39.325               1.2297            0.5354           0.6526                         0.3837
//   23  29      45.355               1.1877            0.5133           0.6202                         0.3858
//   29  31      47.169               1.1061            0.5341           0.6409                         0.4350
//
//   THE SPLIT AT THE RECORD (arithmetic on SEC 0 constants and SEC 1 parsed figures; nothing here is a new measurement):
//     HL coefficient 1/(2 C2)                         = 0.7574
//     ensemble asymptotic mean-gap coefficient ENS      = 0.6007 = HL x rho(2), rho(2) = e^{2gamma}/4 = 0.7931
//     record c_local (top band)                         = 0.7522, bootstrap [0.7410, 0.7630]
//     c_local / ENS                                     = 1.2523  (the anchoring the coefficient needs, against 1/rho(2) = 1.2609 at CV^2 = 1)
//     c_local / HL                                      = 0.9931
//     record's own factorisation c = (R/ln^2) x (t/R)   = 0.7304 x 1.0298; R/ln^2 = 0.9644 x HL
//     ensemble analogue of t/classNull, E_rc/E_cls at x = 7, 11, 13, 17, 19, 23, 29: 1.0050, 1.0211, 1.0351, 1.0433, 1.0462, 1.0500, 1.0523; record t/classNull = 1.0157 [1.0013, 1.0308]
//     ensemble class offset (E_cls - R)/R at the same x: 0.6343, 0.5127, 0.4260, 0.3672, 0.3219, 0.2891, 0.2659; record (classNull - R_shell)/R_shell = 0.0139
//     ensemble class offset E_cls - R in units:         5.600, 5.709, 5.833, 5.913, 5.973, 6.008, 6.034; record classNull - R_shell = 6.05
//
// VERDICT LINE: 0 assertion failures; levels 7,11,13,17,19,23,29; ensemble identities exact; conditionals exact; anchored coefficient not derived here
// ============================================================================
// READINGS
// ============================================================================
// 1. CUSTODY. 0 assertion failures at x = 7..29: D, mbar, G2 against
//    gap-spectrum-01.js at every level; the phase-zero zones at p = 7, 11, 13,
//    17, 23 IDENTICAL to zonegap-02-reduction.js and the max tail 80 at p = 29
//    IDENTICAL to zone-tail-02.js SEC D; the record's top-band rows parsed
//    from its bound block (c_local 0.7522 [0.7410, 0.7630], t/R_shell 1.0298,
//    t/classNull 1.0157).
// 2. THE IDENTITIES HOLD EXACTLY. E_all = R + 5/2 and E_odd = R + 3 by direct
//    summation over every origin at x <= 23; the corpus's "R + 1/2" is the
//    a <= o convention. Re-read against odd origins the surplus is 1.0228,
//    not 1.0298.
// 3. THE TILE'S SHAPE FACTOR DOES NOT SETTLE. (1 + CV^2)/2 = 0.6306 -> 0.7532
//    over seven levels, rising at every step. The ensemble constant
//    e^{2gamma}/(8 C2) = 0.600652 is PROVEN (Mertens); the limit of CV^2 is not.
// 4. THE CLASS OFFSET DERIVES. E_cls - R = 5.600 -> 6.034 exact, against the
//    record's measured classNull - R_shell = 6.05; the prereg's 0.5 and the
//    note's 7.5 were both the wrong constant.
// 5. THE ROUGH-ORIGIN CONDITIONAL HAS THE RIGHT SIGN AND THE WRONG SIZE.
//    E_rc/E_cls = 1.0050 -> 1.0523, rising, against the anchored 1.0157
//    [1.0013, 1.0308]; E_sq/E_rc = 0.8966 -> 0.9626, below 1 at every level,
//    so squareness shortens rather than lengthens. Not identified.
// 6. THE ANCHORED COEFFICIENT IS NOT DERIVED HERE. c_local/ENS = 1.2523
//    against 1/rho(2) = 1.2609; the record's 0.7522 = 0.7304 x 1.0298 with
//    0.7304 = 0.9644 x HL. Every route to HL's 0.7574 passes through rho(2)
//    and CV^2_zone -> 1, both HL-strength (the note, sections 3 and 6).
