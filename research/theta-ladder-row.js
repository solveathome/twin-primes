// ============================================================================
// THETA LADDER, one row -- research/theta-ladder.md sec 1 and 2 (2026-08-17)
// Drives the exported row() of sift-limit-lemmaV.js at fixed family s = 3.0 and
// prints the S6 all-positions line. Nothing is reimplemented here.
//   node research/theta-ladder-row.js 47
// Cost is O(N^2) in the divisor-pair count; see theta-ladder.md sec 9.
// NOTE: `need` and theta are H-FREE, so the u argument is inert (verified in
// theta-ladder.md sec 1). It is kept at 3.2 only to match TODO 00's wording.
// ============================================================================
'use strict';
const path = require('path');
const L = require(path.join(__dirname, 'sift-limit-lemmaV.js'));
const z = Number(process.argv[2]);
const t0 = Date.now();
const r = L.row(z, 3.2, 3.0);
const secs = (Date.now() - t0) / 1000;
const lnz = Math.log(z);
// EXACTLY the S6 all-positions line of sift-limit-lemmaV.js:
const need  = 2 * Math.sqrt(2 * r.lnW * r.plateau / 2) / r.M;
const theta = Math.log(need) / lnz;
const c     = need / (z * lnz * lnz);
const out = { z, u: r.u, s: r.s, H: r.H, D: r.D, N: r.N, np: r.np, nm: r.nm, M: r.M,
  HM: r.HM, ms: r.ms, rms: r.rms, plateau: r.plateau, rho2: r.plateau / 2,
  sqrtRho2: Math.sqrt(r.plateau / 2), lnW: r.lnW, Hstar: r.Hstar,
  HstarOverLn2: r.HstarOverLn2, ratio: r.ratio,
  gRms: r.gRms, gPlat: r.gPlat, gProv: r.gProv, need, theta, c, secs };
console.log('ROW ' + JSON.stringify(out));
console.log(`  z=${z} s=3.0 N=${r.N} M=${r.M.toExponential(4)} lnW=${r.lnW.toFixed(4)} sqrt(<rho^2>)=${Math.sqrt(r.plateau / 2).toFixed(6)}`);
console.log(`  -> H > ${need.toFixed(4)} = ${c.toFixed(6)} * z ln^2 z ;  theta = ${theta.toFixed(6)}   [${secs.toFixed(1)}s]`);
