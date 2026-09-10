#!/usr/bin/env node
// ============================================================================
// corner-measurement.js
//
// FINITE MEASUREMENT of the corner two-point correlation of
// research/corner-correlation.md (5), on the s=s'=1 sub-family:
//
//     K(x) = sum_{x/2 < n <= x} mu(n) mu(n-2) L(n) L'(n-2),
//     L(n)  = sum over primes r | n, r > V, dlo < n/r <= D0, of log r,
//     L'(m) = sum over primes r'| m, r'> Z, elo < m/r' <= E0, of log r',
//
// with V = floor(x^w), Z = floor(x^v), D0 = floor(x/(V+1)),
// E0 = floor((x-2)/(Z+1)), dlo = max(V, D1), elo = max(Z, E1) and
// D1 = floor(x^(1-w-2*eta0)), E1 = floor(x^(1-v-2*eta0)) in "eta" mode, or
// D1 = E1 = 0 with the band capped at r <= 2V, r' <= 2Z in "dyadic" mode.
//
// THIS IS A MEASUREMENT, NOT A PROOF. Every number below is a finite count at
// one dyadic x. A finite ratio measures no asymptotic rate, no saving and no
// cancellation, and a monotone finite trend is not an asymptotic statement.
//
// PRE-REGISTERED FALSIFIER (fixed before the first run; see the companion
// note research/corner-measurement.md §2):
//   Fit slope s = d log(|K|/mass) / d log x by least squares over the j with a
//   non-empty r' band. If s >= 0 within the spread of the random-sign control,
//   the run gives NO heuristic support for cancellation in the corner
//   correlation at these scales. If s < 0, the reading is "consistent with"
//   cancellation at most, and s is compared with the random-sign control's own
//   measured slope (a sqrt-count control decays like -1/2 in log-count, i.e.
//   the reading is only about arithmetic if |K|/mass falls FASTER than the
//   control's |K_rand|/mass).
//
// NEGATIVE CONTROLS, all computed here and printed:
//   (i)   shift 4 in place of shift 2 must give a different signed value
//   (ii)  replacing mu(n)mu(n-2) by the constant 1 must reproduce the
//         unrestricted mass sum_{n} L(n) L'(n-2) exactly
//   (iii) the 16 seeded random-sign draws must have a mean within a few
//         standard deviations of zero
//   (iv)  a variant whose r band is empty must give K = 0 and count = 0
//
// SECOND BLOCK: at small j an exact enumeration over (d, e, k, t) of the
// corner, checking (a) the two-point identity of corner-correlation (5)
// term by term, (b) the split of the s=s'=1 absolute mass into its squarefree
// part and the non-squarefree class of corner-correlation §1.4, and (c) the
// share of the FULL corner mass (all s, s') carried by s=s'=1.
// ============================================================================

'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

// ------------------------------------------------------------------ config --
const JMIN = 20;
const JMAX = Number(process.argv[2] || 36);            // optional argv override
const SEGLG = 20;
const DRAWS = 16;
const SEED = 0x5eed1234;
const C2 = 0.6601618158468695739;    // twin prime constant, product_{p>2}(1-1/(p-1)^2)
const ENUM_J = [20, 22, 24];

// w = 6/25 throughout (the actual left cutoff exponent). v and the band rule vary.
const VARIANTS = [
  { key: 'A-eta100',  w: 6 / 25, v: 1 / 20, mode: 'eta', eta0: 1 / 100,
    label: 'actual cutoffs, eta0=1/100', shift4: true,  enumerate: true },
  { key: 'B-eta40',   w: 6 / 25, v: 1 / 20, mode: 'eta', eta0: 1 / 40,
    label: 'actual cutoffs, eta0=1/40',  shift4: false, enumerate: true  },
  { key: 'C-dyadic',  w: 6 / 25, v: 1 / 20, mode: 'dyadic', eta0: null,
    label: 'actual cutoffs, one dyadic band (V,2V] and (Z,2Z]', shift4: false, enumerate: false },
  { key: 'D-scaled',  w: 6 / 25, v: 1 / 8,  mode: 'eta', eta0: 1 / 100,
    label: 'MODEL not the corner: v=1/8, eta0=1/100', shift4: true, enumerate: true },
  { key: 'E-empty',   w: 6 / 25, v: 1 / 20, mode: 'eta', eta0: 1 / 100,
    label: 'control (iv): r band forcibly emptied', shift4: false, enumerate: false,
    emptyR: true },
];

// ------------------------------------------------------------------ sieves --
function basePrimes(N) {
  const s = new Uint8Array(N + 1), out = [];
  for (let i = 2; i <= N; i++) { if (!s[i]) { out.push(i); for (let j = i * i; j <= N; j += i) s[j] = 1; } }
  return out;
}
// Segmented Mobius on [lo, lo+len). One Float64Array: the sign carries mu, the
// magnitude carries the unremoved cofactor, 0 marks a square factor.
function sieveMu(lo, len, primes, rem, mus) {
  for (let i = 0; i < len; i++) rem[i] = lo + i;
  const hi = lo + len;
  for (let pi = 0; pi < primes.length; pi++) {
    const p = primes[pi];
    let st = lo % p; st = st === 0 ? 0 : p - st;
    for (let i = st; i < len; i += p) rem[i] = -rem[i] / p;
    const pp = p * p; if (pp >= hi) continue;
    let s2 = lo % pp; s2 = s2 === 0 ? 0 : pp - s2;
    for (let i = s2; i < len; i += pp) rem[i] = 0;
  }
  for (let i = 0; i < len; i++) {
    const v = rem[i];
    mus[i] = v === 0 ? 0 : (v === 1 ? 1 : (v === -1 ? -1 : (v > 0 ? -1 : 1)));
  }
}
function fullMu(N, primes) {
  const rem = new Float64Array(N + 1), mus = new Int8Array(N + 1);
  for (let i = 0; i <= N; i++) rem[i] = i;
  for (const p of primes) {
    if (p * p > N) break;
    for (let i = p; i <= N; i += p) rem[i] = -rem[i] / p;
    const pp = p * p; for (let i = pp; i <= N; i += pp) rem[i] = 0;
  }
  for (let i = 1; i <= N; i++) {
    const v = rem[i];
    mus[i] = v === 0 ? 0 : (v === 1 ? 1 : (v === -1 ? -1 : (v > 0 ? -1 : 1)));
  }
  return mus;
}
// deterministic 32-bit mixer (splitmix-style); bits used as independent signs
function h32(z) {
  z = (z + 0x9E3779B9) | 0;
  z = Math.imul(z ^ (z >>> 16), 0x21f0aaad);
  z = Math.imul(z ^ (z >>> 15), 0x735a2d97);
  return (z ^ (z >>> 15)) >>> 0;
}
// Neumaier compensated accumulator
function acc() { return { s: 0, c: 0 }; }
function addTo(a, v) {
  const t = a.s + v;
  a.c += Math.abs(a.s) >= Math.abs(v) ? (a.s - t) + v : (v - t) + a.s;
  a.s = t;
}
const val = a => a.s + a.c;

// ------------------------------------------------------------ band geometry --
function params(j, V0) {
  const x = Math.pow(2, j);
  const V = Math.floor(Math.pow(2, j * V0.w));
  const Z = Math.floor(Math.pow(2, j * V0.v));
  const D0 = Math.floor(x / (V + 1));
  const E0 = Math.floor((x - 2) / (Z + 1));
  let D1, E1, rHi, rpHi;
  if (V0.mode === 'eta') {
    D1 = Math.floor(Math.pow(2, j * (1 - V0.w - 2 * V0.eta0)));
    E1 = Math.floor(Math.pow(2, j * (1 - V0.v - 2 * V0.eta0)));
    rHi = Math.floor(x / (D1 + 1));
    rpHi = Math.floor((x - 2) / (E1 + 1));
  } else { D1 = 0; E1 = 0; rHi = 2 * V; rpHi = 2 * Z; }
  const dlo = Math.max(V, D1), elo = Math.max(Z, E1);
  return { x, V, Z, D0, E0, D1, E1, rHi, rpHi, dlo, elo };
}

// ------------------------------------------------- the measurement at one j --
function measure(j, ALLP) {
  const t0 = Date.now();
  const x = Math.pow(2, j), nlo = x / 2 + 1, nhi = x;
  const sq = Math.floor(Math.sqrt(nhi));
  const primes = [];
  for (const p of ALLP) { if (p > sq) break; primes.push(p); }
  const SEG = 1 << SEGLG;

  const rem = new Float64Array(SEG + 4), mus = new Int8Array(SEG + 4);
  const L = new Float64Array(SEG), cand = new Int32Array(SEG);

  const st = VARIANTS.map((V0, vi) => {
    const P = params(j, V0);
    const rBand = V0.emptyR ? [] : ALLP.filter(p => p > P.V && p <= P.rHi);
    const rpBand = ALLP.filter(p => p > P.Z && p <= P.rpHi);
    return {
      V0, vi, P, rBand, rpBand,
      logR: rBand.map(Math.log), logRp: rpBand.map(Math.log),
      K: acc(), mass: acc(), massAll: acc(), sw2: acc(), count: 0,
      K4: acc(), mass4: acc(), count4: 0,
      rnd: Array.from({ length: DRAWS }, acc),
      seed: h32(SEED ^ (j * 1000003) ^ (vi * 7919)),
    };
  });

  for (let a = nlo; a <= nhi; a += SEG) {
    const len = Math.min(SEG, nhi - a + 1);
    sieveMu(a - 4, len + 4, primes, rem, mus);   // mus[k] = mu(a-4+k)
    const aLow = (a % 4294967296) >>> 0, aHi = Math.floor(a / 4294967296);
    const hiMix = Math.imul(aHi, 0x9E3779B1) | 0;

    for (const s of st) {
      if (!s.rBand.length || !s.rpBand.length) continue;
      const { dlo, D0, elo, E0 } = s.P;
      let nc = 0;
      for (let k = 0; k < s.rBand.length; k++) {
        const r = s.rBand[k], lr = s.logR[k];
        let m0 = a % r; m0 = a + (m0 === 0 ? 0 : r - m0);
        for (let m = m0; m <= a + len - 1; m += r) {
          const d = m / r;
          if (d > dlo && d <= D0) { const i = m - a; if (L[i] === 0) cand[nc++] = i; L[i] += lr; }
        }
      }
      // residues of a-2 and a-4 modulo each right-band prime, so the inner
      // test is an int32 modulo rather than a float remainder
      const res2 = s.rpBand.map(rp => ((a - 2) % rp) | 0);
      const res4 = s.rpBand.map(rp => ((a - 4) % rp) | 0);
      const nrp = s.rpBand.length;
      let lK = 0, lmass = 0, lmassAll = 0, lsw2 = 0, lK4 = 0, lmass4 = 0;
      const lr16 = new Float64Array(DRAWS);
      for (let c = 0; c < nc; c++) {
        const i = cand[c], Li = L[i];
        L[i] = 0;                                   // reset as we consume
        let b2 = 0;
        for (let q = 0; q < nrp; q++) {
          const rp = s.rpBand[q];
          if ((res2[q] + i) % rp !== 0) continue;
          const e = (a + i - 2) / rp;
          if (e > elo && e <= E0) b2 += s.logRp[q];
        }
        if (b2 !== 0) {
          const w = Li * b2;
          lmassAll += w;
          const sg = mus[i + 4] * mus[i + 2];
          if (sg !== 0) {
            lmass += w; lK += sg * w; lsw2 += w * w; s.count++;
            const h = h32((((aLow + i) >>> 0) ^ hiMix ^ s.seed) | 0);
            for (let d2 = 0; d2 < DRAWS; d2++) if ((h >>> d2) & 1) lr16[d2] += w;
          }
        }
        if (s.V0.shift4) {
          let b4 = 0;
          for (let q = 0; q < nrp; q++) {
            const rp = s.rpBand[q];
            if ((res4[q] + i) % rp !== 0) continue;
            const e = (a + i - 4) / rp;
            if (e > elo && e <= E0) b4 += s.logRp[q];
          }
          if (b4 !== 0) {
            const w4 = Li * b4, sg4 = mus[i + 4] * mus[i];
            if (sg4 !== 0) { lmass4 += w4; lK4 += sg4 * w4; s.count4++; }
          }
        }
      }
      addTo(s.K, lK); addTo(s.mass, lmass); addTo(s.massAll, lmassAll);
      addTo(s.sw2, lsw2); addTo(s.K4, lK4); addTo(s.mass4, lmass4);
      for (let d2 = 0; d2 < DRAWS; d2++) addTo(s.rnd[d2], lr16[d2]);
    }
  }

  return st.map(s => {
    const mass = val(s.mass), K = val(s.K), sw2 = val(s.sw2);
    // acc[d] holds the sum of w over n whose bit d is set; the signed draw is
    // 2*that - mass, because sign = 2*bit - 1
    const draws = s.rnd.map(r => 2 * val(r) - mass);
    const rmean = draws.reduce((u, v2) => u + v2, 0) / DRAWS;
    const rsd = Math.sqrt(draws.reduce((u, v2) => u + (v2 - rmean) ** 2, 0) / (DRAWS - 1));
    return {
      j, key: s.V0.key, label: s.V0.label, ...s.P,
      rBandPrimes: s.rBand.length <= 12 ? s.rBand.slice() : [s.rBand[0], '..', s.rBand[s.rBand.length - 1]],
      rBandCount: s.rBand.length,
      rpBandPrimes: s.rpBand.length <= 12 ? s.rpBand.slice() : [s.rpBand[0], '..', s.rpBand[s.rpBand.length - 1]],
      rpBandCount: s.rpBand.length,
      availablePairs: s.rBand.length * s.rpBand.length,
      count: s.count, mass, massAll: val(s.massAll), K,
      ratio: mass > 0 ? Math.abs(K) / mass : null,
      KoverC2x: K / (C2 * x),
      theorySd: Math.sqrt(sw2),
      randMean: rmean, randSd: rsd,
      randMaxAbs: Math.max(...draws.map(Math.abs), 0),
      shift4: s.V0.shift4 ? { K4: val(s.K4), mass4: val(s.mass4), count4: s.count4 } : null,
      seconds: null,
    };
  }).map(r => (r.seconds = (Date.now() - t0) / 1000, r));
}

// --------------------------------------- exact small-j corner enumeration ----
function enumerate(j, V0, ALLP, mus) {
  const P = params(j, V0), x = P.x;
  const Kmax = V0.mode === 'eta' ? Math.floor(x / (P.dlo + 1)) : 2 * P.V;
  const Tmax = V0.mode === 'eta' ? Math.floor((x - 2) / (P.elo + 1)) : 2 * P.Z;
  // beta_W(k) and the "k is itself a prime power above W" flag
  function bands(W, Mx) {
    const beta = new Float64Array(Mx + 1), pp = new Uint8Array(Mx + 1), pr = new Uint8Array(Mx + 1);
    for (let k = 2; k <= Mx; k++) {
      let m = k, b = 0, nf = 0, lastPow = 0;
      for (const p of ALLP) {
        if (p * p > m) break;
        if (m % p) continue;
        let q = 1; while (m % p === 0) { m /= p; q *= p; }
        nf++; lastPow = q; if (q > W) b += Math.log(p);
      }
      if (m > 1) { nf++; lastPow = m; if (m > W) b += Math.log(m); }
      beta[k] = b;
      if (nf === 1 && lastPow > W) { pp[k] = 1; if (lastPow === k && ALLP.includes(k)) pr[k] = 1; }
    }
    return { beta, pp, pr };
  }
  const BV = bands(P.V, Math.max(2, Kmax)), BZ = bands(P.Z, Math.max(2, Tmax));
  const o = {
    j, key: V0.key, V: P.V, Z: P.Z, dlo: P.dlo, D0: P.D0, elo: P.elo, E0: P.E0,
    Kmax, Tmax, quadruples: 0, occurringPairs: 0,
    fullSigned: 0, fullMass: 0, s11Signed: 0, s11Mass: 0,
    s11PrimeSigned: 0, s11PrimeMass: 0,
    twoPointSigned: 0, twoPointMass: 0, nonSqfSigned: 0, nonSqfMass: 0,
    directTwoPoint: 0, identityHolds: true, signIdentityChecks: 0,
  };
  const pairSeen = new Set();
  const ks = [], ds = [], ts = [], es = [];
  for (let n = x / 2 + 1; n <= x; n++) {
    let nk = 0;
    for (let k = P.V + 1; k <= Kmax; k++) {
      if (n % k) continue;
      const d = n / k;
      if (d > P.dlo && d <= P.D0 && BV.beta[k] > 0 && mus[d] !== 0) { ks[nk] = k; ds[nk] = d; nk++; }
    }
    if (!nk) continue;
    let nt = 0;
    for (let t = P.Z + 1; t <= Tmax; t++) {
      if ((n - 2) % t) continue;
      const e = (n - 2) / t;
      if (e > P.elo && e <= P.E0 && BZ.beta[t] > 0 && mus[e] !== 0) { ts[nt] = t; es[nt] = e; nt++; }
    }
    if (!nt) continue;
    const sqf = mus[n] !== 0 && mus[n - 2] !== 0;
    let Ln = 0, Lpn = 0;
    for (let ii = 0; ii < nk; ii++) if (BV.pr[ks[ii]]) Ln += Math.log(ks[ii]);
    for (let jj = 0; jj < nt; jj++) if (BZ.pr[ts[jj]]) Lpn += Math.log(ts[jj]);
    if (sqf) o.directTwoPoint += mus[n] * mus[n - 2] * Ln * Lpn;
    for (let ii = 0; ii < nk; ii++) for (let jj = 0; jj < nt; jj++) {
      const k = ks[ii], d = ds[ii], t = ts[jj], e = es[jj];
      const term = mus[d] * mus[e] * BV.beta[k] * BZ.beta[t];
      o.quadruples++; o.fullSigned += term; o.fullMass += Math.abs(term);
      if (BV.pp[k] && BZ.pp[t]) {
        o.s11Signed += term; o.s11Mass += Math.abs(term);
        if (BV.pr[k] && BZ.pr[t]) {
          o.s11PrimeSigned += term; o.s11PrimeMass += Math.abs(term);
          pairSeen.add(k * 100000 + t);
          if (sqf) {
            // corner-correlation (5): mu(d)mu(e) = mu(n)mu(n-2) on this class
            if (mus[d] * mus[e] !== mus[n] * mus[n - 2]) o.identityHolds = false;
            o.signIdentityChecks++;
            o.twoPointSigned += term; o.twoPointMass += Math.abs(term);
          } else { o.nonSqfSigned += term; o.nonSqfMass += Math.abs(term); }
        }
      }
    }
  }
  o.occurringPairs = pairSeen.size;
  o.twoPointVsDirect = Math.abs(o.directTwoPoint - o.twoPointSigned);
  o.splitExact = Math.abs(o.s11PrimeSigned - (o.twoPointSigned + o.nonSqfSigned));
  o.s11ShareOfFullMass = o.fullMass > 0 ? o.s11Mass / o.fullMass : null;
  o.nonSqfShareOfS11PrimeMass = o.s11PrimeMass > 0 ? o.nonSqfMass / o.s11PrimeMass : null;
  return o;
}

// ------------------------------------------------------------------- main ---
const T0 = Date.now();
const ALLP = basePrimes(1 << Math.ceil(JMAX / 2));
const rows = [];
for (let j = JMIN; j <= JMAX; j++) rows.push(...measure(j, ALLP));

const enums = [];
for (const j of ENUM_J) {
  const mus = fullMu(Math.pow(2, j), ALLP);
  for (const V0 of VARIANTS) if (V0.enumerate) enums.push(enumerate(j, V0, ALLP, mus));
}

// slope of log(|K|/mass) against log x, and the same for the random control
function slope(pts) {
  if (pts.length < 3) return null;
  const n = pts.length;
  const mx = pts.reduce((a, p) => a + p[0], 0) / n, my = pts.reduce((a, p) => a + p[1], 0) / n;
  let sxy = 0, sxx = 0;
  for (const [X, Y] of pts) { sxy += (X - mx) * (Y - my); sxx += (X - mx) ** 2; }
  return sxx > 0 ? sxy / sxx : null;
}
const fits = {};
for (const V0 of VARIANTS) {
  const rs = rows.filter(r => r.key === V0.key && r.count > 0 && r.mass > 0 && r.K !== 0);
  const lx = r => Math.log(r.x);
  fits[V0.key] = {
    nPoints: rs.length,
    jUsed: rs.map(r => r.j),
    slopeSignedOverMass: slope(rs.map(r => [lx(r), Math.log(Math.abs(r.K) / r.mass)])),
    slopeRandSdOverMass: slope(rs.filter(r => r.randSd > 0).map(r => [lx(r), Math.log(r.randSd / r.mass)])),
    slopeTheorySdOverMass: slope(rs.filter(r => r.theorySd > 0).map(r => [lx(r), Math.log(r.theorySd / r.mass)])),
    slopeAbsK: slope(rs.map(r => [lx(r), Math.log(Math.abs(r.K))])),
    slopeMass: slope(rs.map(r => [lx(r), Math.log(r.mass)])),
    signs: rs.map(r => (r.K > 0 ? '+' : '-')).join(''),
    anyBelowMinusC2x: rs.some(r => r.K < -C2 * r.x),
    maxAbsKoverC2x: rs.length ? Math.max(...rs.map(r => Math.abs(r.KoverC2x))) : null,
    medianKoverTheorySd: rs.length
      ? rs.map(r => Math.abs(r.K) / (r.theorySd || Infinity)).sort((a, b) => a - b)[Math.floor(rs.length / 2)]
      : null,
  };
}

// controls
const ctl = {
  emptyBand_K_zero: rows.filter(r => r.key === 'E-empty').every(r => r.K === 0 && r.count === 0),
  muReplacedByOne_reproducesMass: rows.every(r => r.massAll >= r.mass - 1e-6),
  massAllStrictlyExceedsMassSomewhere: rows.some(r => r.massAll > r.mass + 1e-6),
  shift4_differs: rows.filter(r => r.shift4 && r.count > 0)
    .every(r => r.shift4.K4 !== r.K),
  shift4_rows: rows.filter(r => r.shift4 && r.count > 0).length,
  randMeanWithin4sd: rows.filter(r => r.count > 0 && r.randSd > 0)
    .every(r => Math.abs(r.randMean) <= 4 * r.randSd / Math.sqrt(DRAWS) + 1e-9),
  enumIdentityHolds: enums.every(e => e.identityHolds),
  enumTwoPointMatchesDirect: enums.every(e => e.twoPointVsDirect < 1e-6 * (1 + e.twoPointMass)),
  enumSplitExact: enums.every(e => e.splitExact < 1e-6 * (1 + e.s11PrimeMass)),
  enumMatchesSegmentedK: enums.every(e => {
    const r = rows.find(z => z.j === e.j && z.key === e.key);
    return r && Math.abs(r.K - e.twoPointSigned) < 1e-6 * (1 + Math.abs(r.K));
  }),
  enumRowsChecked: enums.length,
};

// ------------------------------------------------------------------ print ---
const F = (v, k = 6) => (v === null || v === undefined ? 'n/a' : (typeof v === 'number' ? (Number.isFinite(v) ? v.toPrecision(k) : String(v)) : String(v)));
const out = [];
out.push('scope: FINITE MEASUREMENT of the corner two-point sum K(x)=sum_{x/2<n<=x} mu(n)mu(n-2)L(n)L\'(n-2); no rate, saving or cancellation is proved');
out.push(`config: j=${JMIN}..${JMAX}, seglen=2^${SEGLG}, draws=${DRAWS}, seed=0x${SEED.toString(16)}, C2=${C2}`);
for (const V0 of VARIANTS) out.push(`variant ${V0.key}: w=${V0.w.toFixed(4)} v=${V0.v.toFixed(4)} mode=${V0.mode} eta0=${V0.eta0 === null ? 'n/a' : V0.eta0} -- ${V0.label}`);
out.push('');
out.push('TABLE  j | V | Z | rband | rpband | pairs | count | mass | K | |K|/mass | K/(C2 x) | randMean | randSd | theorySd | sec');
for (const V0 of VARIANTS) {
  out.push(`-- ${V0.key} (${V0.label})`);
  for (const r of rows.filter(z => z.key === V0.key)) {
    out.push([
      String(r.j).padStart(2), r.V, r.Z,
      `(${r.V},${r.rHi}]:${r.rBandCount}${r.rBandCount <= 12 ? '=' + JSON.stringify(r.rBandPrimes) : ''}`,
      `(${r.Z},${r.rpHi}]:${r.rpBandCount}${r.rpBandCount <= 12 ? '=' + JSON.stringify(r.rpBandPrimes) : ''}`,
      r.availablePairs, r.count, F(r.mass), F(r.K), F(r.ratio), F(r.KoverC2x),
      F(r.randMean), F(r.randSd), F(r.theorySd), r.seconds.toFixed(1),
    ].join(' | '));
  }
}
out.push('');
out.push('SHIFT-4 CONTROL (i)  j | K(shift2) | K(shift4) | count2 | count4');
for (const r of rows.filter(z => z.shift4 && z.count > 0)) {
  out.push(`${r.key} j=${r.j} | ${F(r.K)} | ${F(r.shift4.K4)} | ${r.count} | ${r.shift4.count4}`);
}
out.push('');
out.push('FITS  key | nPts | jUsed | slope log(|K|/mass) | slope log(randSd/mass) | slope log(theorySd/mass) | slope log|K| | slope log mass | signs of K | anyK<-C2x | max|K/(C2x)| | median |K|/theorySd');
for (const [k, f] of Object.entries(fits)) {
  out.push([k, f.nPoints, `${f.jUsed[0] ?? '-'}..${f.jUsed[f.jUsed.length - 1] ?? '-'}`,
    F(f.slopeSignedOverMass, 4), F(f.slopeRandSdOverMass, 4), F(f.slopeTheorySdOverMass, 4),
    F(f.slopeAbsK, 4), F(f.slopeMass, 4), f.signs || '-', f.anyBelowMinusC2x,
    F(f.maxAbsKoverC2x, 4), F(f.medianKoverTheorySd, 4)].join(' | '));
}
out.push('');
out.push('EXACT SMALL-j CORNER ENUMERATION  j key | quadruples | occurring (r,rp) pairs | fullMass | s11Mass | s11 share of full mass | s11-prime mass | nonsqf mass | nonsqf share | twoPoint signed | identity | direct-vs-quad | split');
for (const e of enums) {
  out.push([`j=${e.j} ${e.key}`, e.quadruples, e.occurringPairs, F(e.fullMass), F(e.s11Mass),
    F(e.s11ShareOfFullMass, 4), F(e.s11PrimeMass), F(e.nonSqfMass), F(e.nonSqfShareOfS11PrimeMass, 4),
    F(e.twoPointSigned), e.identityHolds ? 'OK' : 'FAIL', F(e.twoPointVsDirect, 3), F(e.splitExact, 3)].join(' | '));
}
out.push('');
out.push(`CONTROLS: ${Object.entries(ctl).map(([k, v]) => `${k}=${v}`).join('; ')}`);
out.push(`runtime: ${((Date.now() - T0) / 1000).toFixed(1)} s total`);
console.log(out.join('\n'));

fs.writeFileSync(path.join(__dirname, 'corner-measurement.json'),
  JSON.stringify({
    schema: 1,
    scope: 'Finite measurement of the corner two-point Mobius correlation. Measures no asymptotic rate, saving or cancellation.',
    config: { JMIN, JMAX, SEGLG, DRAWS, SEED, C2, ENUM_J },
    variants: VARIANTS, rows, fits, enums, controls: ctl,
    totalSeconds: (Date.now() - T0) / 1000,
  }, null, 2) + '\n');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/corner-measurement.js
//   invocation:  node research/corner-measurement.js
//   code-sha256: e18ddee9436f1ef3a36a51430ecc5ff500bc719ab82d8e5d9f797b37cd2f477c
//   out-sha256:  14f55dae22052d02b4dcb070f533491bb2bf35280deb861564de3d174fe8d1b5
//   body-lines:  150
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     1393.4 s
// ============================================================================
// scope: FINITE MEASUREMENT of the corner two-point sum K(x)=sum_{x/2<n<=x} mu(n)mu(n-2)L(n)L'(n-2); no rate, saving or cancellation is proved
// config: j=20..36, seglen=2^20, draws=16, seed=0x5eed1234, C2=0.6601618158468696
// variant A-eta100: w=0.2400 v=0.0500 mode=eta eta0=0.01 -- actual cutoffs, eta0=1/100
// variant B-eta40: w=0.2400 v=0.0500 mode=eta eta0=0.025 -- actual cutoffs, eta0=1/40
// variant C-dyadic: w=0.2400 v=0.0500 mode=dyadic eta0=n/a -- actual cutoffs, one dyadic band (V,2V] and (Z,2Z]
// variant D-scaled: w=0.2400 v=0.1250 mode=eta eta0=0.01 -- MODEL not the corner: v=1/8, eta0=1/100
// variant E-empty: w=0.2400 v=0.0500 mode=eta eta0=0.01 -- control (iv): r band forcibly emptied
//
// TABLE  j | V | Z | rband | rpband | pairs | count | mass | K | |K|/mass | K/(C2 x) | randMean | randSd | theorySd | sec
// -- A-eta100 (actual cutoffs, eta0=1/100)
// 20 | 27 | 2 | (27,36]:2=[29,31] | (2,2]:0=[] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 0.0
// 21 | 32 | 2 | (32,44]:3=[37,41,43] | (2,2]:0=[] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 0.1
// 22 | 38 | 2 | (38,52]:3=[41,43,47] | (2,2]:0=[] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 0.1
// 23 | 45 | 2 | (45,63]:4=[47,53,59,61] | (2,3]:1=[3] | 4 | 940 | 4232.03 | -131.827 | 0.0311497 | -0.0000238047 | 42.8055 | 169.322 | 139.749 | 0.1
// 24 | 54 | 2 | (54,75]:5=[59,61,67,71,73] | (2,3]:1=[3] | 5 | 6516 | 30697.8 | 984.409 | 0.0320677 | 0.0000888802 | -72.2789 | 434.314 | 385.344 | 0.2
// 25 | 64 | 2 | (64,90]:6=[67,71,73,79,83,89] | (2,3]:1=[3] | 6 | 21312 | 103513 | -1211.03 | 0.0116993 | -0.0000546705 | 150.411 | 744.510 | 718.164 | 0.3
// 26 | 75 | 2 | (75,108]:7=[79,83,89,97,101,103,107] | (2,3]:1=[3] | 7 | 46435 | 233445 | 1144.18 | 0.00490127 | 0.0000258263 | 88.4053 | 979.321 | 1094.94 | 0.6
// 27 | 89 | 2 | (89,129]:7=[97,101,103,107,109,113,127] | (2,3]:1=[3] | 7 | 121367 | 633710 | -381.711 | 0.000602343 | -0.00000430798 | 31.0164 | 1042.40 | 1838.60 | 1.2
// 28 | 105 | 2 | (105,155]:9=[107,109,113,127,131,137,139,149,151] | (2,3]:1=[3] | 9 | 263917 | 1.41738e+6 | 1507.63 | 0.00106368 | 0.00000850757 | -68.4535 | 2879.77 | 2789.05 | 2.4
// 29 | 124 | 2 | (124,186]:12=[127,131,137,139,149,151,157,163,167,173,179,181] | (2,4]:1=[3] | 12 | 651832 | 3.64390e+6 | -4808.72 | 0.00131966 | -0.0000135678 | -270.918 | 4555.24 | 4568.41 | 5.1
// 30 | 147 | 2 | (147,222]:13 | (2,4]:1=[3] | 13 | 1465733 | 8.46438e+6 | -6207.37 | 0.000733352 | -0.00000875704 | 95.0333 | 7712.86 | 7080.29 | 10.5
// 31 | 173 | 2 | (173,266]:16 | (2,4]:1=[3] | 16 | 2689218 | 1.60473e+7 | 4312.85 | 0.000268758 | 0.00000304218 | 4476.73 | 9421.13 | 9899.04 | 21.5
// 32 | 205 | 3 | (205,319]:20 | (3,4]:0=[] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 38.8
// 33 | 242 | 3 | (242,382]:22 | (3,4]:0=[] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 77.1
// 34 | 286 | 3 | (286,458]:27 | (3,5]:1=[5] | 27 | 2536891 | 2.48969e+7 | -16592.7 | 0.000666456 | -0.00000146301 | 2766.01 | 14620.9 | 15879.8 | 160.4
// 35 | 337 | 3 | (337,548]:33 | (3,5]:1=[5] | 33 | 11247485 | 1.13179e+8 | 1534.82 | 0.0000135610 | 6.76640e-8 | -6107.59 | 39720.4 | 34302.6 | 346.1
// 36 | 398 | 3 | (398,657]:41 | (3,5]:1=[5] | 41 | 32345791 | 3.33793e+8 | 54562.1 | 0.000163461 | 0.00000120271 | 7925.49 | 44676.9 | 59626.3 | 703.6
// -- B-eta40 (actual cutoffs, eta0=1/40)
// 20 | 27 | 2 | (27,55]:7=[29,31,37,41,43,47,53] | (2,3]:1=[3] | 7 | 3444 | 14489.7 | -38.4913 | 0.00265647 | -0.0000556048 | 120.584 | 215.917 | 254.665 | 0.0
// 21 | 32 | 2 | (32,68]:8=[37,41,43,47,53,59,61,67] | (2,4]:1=[3] | 8 | 6685 | 29343.6 | 200.507 | 0.00683310 | 0.000144827 | 216.445 | 371.736 | 367.619 | 0.1
// 22 | 38 | 2 | (38,83]:11=[41,43,47,53,59,61,67,71,73,79,83] | (2,4]:1=[3] | 11 | 16836 | 77360.4 | -363.154 | 0.00469431 | -0.000131154 | 87.6570 | 616.595 | 613.306 | 0.1
// 23 | 45 | 2 | (45,101]:12=[47,53,59,61,67,71,73,79,83,89,97,101] | (2,4]:1=[3] | 12 | 35273 | 169156 | -989.974 | 0.00585244 | -0.000178765 | -127.617 | 923.450 | 925.273 | 0.1
// 24 | 54 | 2 | (54,124]:14 | (2,5]:2=[3,5] | 28 | 82468 | 445190 | 2033.22 | 0.00456708 | 0.000183575 | 444.444 | 1190.09 | 1648.70 | 0.2
// 25 | 64 | 2 | (64,152]:18 | (2,5]:2=[3,5] | 36 | 190524 | 1.12920e+6 | 1779.26 | 0.00157567 | 0.0000803227 | 407.372 | 3076.22 | 2800.68 | 0.3
// 26 | 75 | 2 | (75,186]:21 | (2,6]:2=[3,5] | 42 | 398385 | 2.56245e+6 | -4222.08 | 0.00164767 | -0.0000953007 | -1878.07 | 5618.80 | 4426.64 | 0.6
// 27 | 89 | 2 | (89,227]:25 | (2,6]:2=[3,5] | 50 | 843497 | 5.82271e+6 | 1561.13 | 0.000268110 | 0.0000176188 | -2857.85 | 5795.81 | 6939.30 | 1.2
// 28 | 105 | 2 | (105,278]:32 | (2,6]:2=[3,5] | 64 | 1838874 | 1.34617e+7 | -14313.4 | 0.00106326 | -0.0000807703 | 161.033 | 10242.0 | 10892.2 | 2.4
// 29 | 124 | 2 | (124,340]:38 | (2,7]:3=[3,5,7] | 114 | 4160431 | 3.36284e+7 | -7985.81 | 0.000237472 | -0.0000225320 | 1031.09 | 20426.9 | 18418.1 | 5.1
// 30 | 147 | 2 | (147,415]:46 | (2,7]:3=[3,5,7] | 138 | 8986679 | 7.87389e+7 | -26985.7 | 0.000342724 | -0.0000380700 | 4212.88 | 26535.1 | 29581.2 | 10.5
// 31 | 173 | 2 | (173,508]:56 | (2,8]:3=[3,5,7] | 168 | 18258218 | 1.71678e+8 | 152199 | 0.000886533 | 0.000107357 | 9727.52 | 41044.3 | 45360.7 | 21.5
// 32 | 205 | 3 | (205,621]:68 | (3,9]:2=[5,7] | 136 | 19078947 | 2.14140e+8 | 36214.2 | 0.000169115 | 0.0000127723 | -12429.4 | 51486.1 | 52353.6 | 38.8
// 33 | 242 | 3 | (242,760]:81 | (3,9]:2=[5,7] | 162 | 41611557 | 4.85683e+8 | -10517.6 | 0.0000216552 | -0.00000185471 | -7146.09 | 92690.4 | 80480.7 | 77.1
// 34 | 286 | 3 | (286,929]:97 | (3,10]:2=[5,7] | 194 | 87433110 | 1.06189e+9 | 105363 | 0.0000992223 | 0.00000929006 | -4529.19 | 108520 | 121474 | 160.4
// 35 | 337 | 3 | (337,1136]:121 | (3,11]:3=[5,7,11] | 363 | 192536207 | 2.45879e+9 | 25215.3 | 0.0000102552 | 0.00000111164 | 69334.8 | 129434 | 190823 | 346.1
// 36 | 398 | 3 | (398,1389]:143 | (3,12]:3=[5,7,11] | 429 | 413855192 | 5.61743e+9 | 125446 | 0.0000223316 | 0.00000276521 | 12997.8 | 331819 | 299855 | 703.6
// -- C-dyadic (actual cutoffs, one dyadic band (V,2V] and (Z,2Z])
// 20 | 27 | 2 | (27,54]:7=[29,31,37,41,43,47,53] | (2,4]:1=[3] | 7 | 7927 | 34093.8 | -227.525 | 0.00667350 | -0.000328684 | -40.5632 | 530.059 | 396.284 | 0.0
// 21 | 32 | 2 | (32,64]:7=[37,41,43,47,53,59,61] | (2,4]:1=[3] | 7 | 13191 | 59181.0 | -151.330 | 0.00255707 | -0.000109306 | -130.279 | 497.264 | 530.320 | 0.1
// 22 | 38 | 2 | (38,76]:9=[41,43,47,53,59,61,67,71,73] | (2,4]:1=[3] | 9 | 28974 | 136173 | -645.094 | 0.00473732 | -0.000232977 | -210.503 | 446.881 | 826.396 | 0.1
// 23 | 45 | 2 | (45,90]:10=[47,53,59,61,67,71,73,79,83,89] | (2,4]:1=[3] | 10 | 54197 | 265286 | -234.981 | 0.000885765 | -0.0000424319 | -16.7451 | 1196.82 | 1175.21 | 0.1
// 24 | 54 | 2 | (54,108]:12=[59,61,67,71,73,79,83,89,97,101,103,107] | (2,4]:1=[3] | 12 | 107886 | 552125 | 195.186 | 0.000353518 | 0.0000176229 | -425.277 | 1641.59 | 1733.94 | 0.2
// 25 | 64 | 2 | (64,128]:13 | (2,4]:1=[3] | 13 | 206083 | 1.08390e+6 | -827.848 | 0.000763769 | -0.0000373723 | -1284.61 | 2809.50 | 2460.04 | 0.3
// 26 | 75 | 2 | (75,150]:14 | (2,4]:1=[3] | 14 | 375221 | 2.03903e+6 | -3495.86 | 0.00171448 | -0.0000789086 | -594.001 | 3708.76 | 3421.71 | 0.6
// 27 | 89 | 2 | (89,178]:16 | (2,4]:1=[3] | 16 | 723727 | 4.07189e+6 | 2084.38 | 0.000511894 | 0.0000235243 | -611.533 | 5976.82 | 4916.41 | 1.2
// 28 | 105 | 2 | (105,210]:19 | (2,4]:1=[3] | 19 | 1466767 | 8.53079e+6 | -8455.95 | 0.000991226 | -0.0000477169 | -1751.60 | 8780.92 | 7240.17 | 2.4
// 29 | 124 | 2 | (124,248]:23 | (2,4]:1=[3] | 23 | 3005536 | 1.80995e+7 | -12272.6 | 0.000678063 | -0.0000346272 | 2309.83 | 9764.78 | 10740.1 | 5.1
// 30 | 147 | 2 | (147,294]:28 | (2,4]:1=[3] | 28 | 6152123 | 3.83522e+7 | 7214.64 | 0.000188116 | 0.0000101780 | 2110.88 | 15551.9 | 15920.2 | 10.5
// 31 | 173 | 2 | (173,346]:28 | (2,4]:1=[3] | 28 | 10666613 | 6.78504e+7 | 31352.5 | 0.000462084 | 0.0000221153 | -276.464 | 17314.3 | 21308.8 | 21.5
// 32 | 205 | 3 | (205,410]:34 | (3,6]:1=[5] | 34 | 13034273 | 1.25729e+8 | -23422.7 | 0.000186295 | -0.00000826088 | 6381.09 | 40161.5 | 35728.9 | 38.8
// 33 | 242 | 3 | (242,484]:39 | (3,6]:1=[5] | 39 | 25274940 | 2.50733e+8 | -20675.1 | 0.0000824584 | -0.00000364592 | -11515.8 | 53984.8 | 51133.5 | 77.1
// 34 | 286 | 3 | (286,572]:44 | (3,6]:1=[5] | 44 | 48335946 | 4.92258e+8 | 360.354 | 7.32045e-7 | 3.17731e-8 | -18588.4 | 82255.1 | 72520.2 | 160.4
// 35 | 337 | 3 | (337,674]:54 | (3,6]:1=[5] | 54 | 101044616 | 1.05857e+9 | -83068.1 | 0.0000784716 | -0.00000366213 | -27683.4 | 108170 | 107985 | 346.1
// 36 | 398 | 3 | (398,796]:60 | (3,6]:1=[5] | 60 | 193085514 | 2.06854e+9 | 85558.0 | 0.0000413615 | 0.00000188595 | -21443.7 | 161952 | 152487 | 703.6
// -- D-scaled (MODEL not the corner: v=1/8, eta0=1/100)
// 20 | 27 | 5 | (27,36]:2=[29,31] | (5,7]:1=[7] | 2 | 172 | 1171.08 | 6.16313 | 0.00526280 | 0.00000890330 | 17.1840 | 99.2274 | 90.4805 | 0.0
// 21 | 32 | 6 | (32,44]:3=[37,41,43] | (6,8]:1=[7] | 3 | 523 | 3779.71 | -43.2011 | 0.0114297 | -0.0000312043 | -10.2571 | 145.985 | 166.689 | 0.1
// 22 | 38 | 6 | (38,52]:3=[41,43,47] | (6,9]:1=[7] | 3 | 1988 | 14789.8 | 243.658 | 0.0164747 | 0.0000879977 | 97.2044 | 403.053 | 334.515 | 0.1
// 23 | 45 | 7 | (45,63]:4=[47,53,59,61] | (7,10]:0=[] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 0.1
// 24 | 54 | 8 | (54,75]:5=[59,61,67,71,73] | (8,11]:1=[11] | 5 | 474 | 4883.27 | -530.135 | 0.108562 | -0.0000478648 | -92.1500 | 210.346 | 227.122 | 0.2
// 25 | 64 | 8 | (64,90]:6=[67,71,73,79,83,89] | (8,12]:1=[11] | 6 | 6287 | 66559.4 | 751.991 | 0.0112980 | 0.0000339478 | -145.423 | 957.750 | 850.007 | 0.3
// 26 | 75 | 9 | (75,108]:7=[79,83,89,97,101,103,107] | (9,13]:2=[11,13] | 14 | 20558 | 233810 | 687.416 | 0.00294007 | 0.0000155163 | 86.2628 | 1415.12 | 1666.32 | 0.6
// 27 | 89 | 10 | (89,129]:7=[97,101,103,107,109,113,127] | (10,15]:2=[11,13] | 14 | 61721 | 745391 | -6409.57 | 0.00859894 | -0.0000723384 | 139.846 | 2682.10 | 3081.14 | 1.2
// 28 | 105 | 11 | (105,155]:9=[107,109,113,127,131,137,139,149,151] | (11,16]:1=[13] | 9 | 64962 | 815288 | -1277.24 | 0.00156662 | -0.00000720747 | -145.498 | 4318.24 | 3234.46 | 2.4
// 29 | 124 | 12 | (124,186]:12=[127,131,137,139,149,151,157,163,167,173,179,181] | (12,18]:2=[13,17] | 24 | 217944 | 2.97261e+6 | 1076.61 | 0.000362177 | 0.00000303766 | -3183.82 | 5764.96 | 6519.49 | 5.1
// 30 | 147 | 13 | (147,222]:13 | (13,20]:2=[17,19] | 26 | 282199 | 4.36579e+6 | 4192.96 | 0.000960414 | 0.00000591521 | 69.0300 | 7451.46 | 8410.85 | 10.5
// 31 | 173 | 14 | (173,266]:16 | (14,22]:2=[17,19] | 32 | 775093 | 1.24764e+7 | -6186.65 | 0.000495870 | -0.00000436391 | 716.761 | 15692.5 | 14517.9 | 21.5
// 32 | 205 | 16 | (205,319]:20 | (16,24]:3=[17,19,23] | 60 | 2114902 | 3.61187e+7 | 40807.4 | 0.00112981 | 0.0000143923 | -7793.02 | 24636.6 | 25615.9 | 38.8
// 33 | 242 | 17 | (242,382]:22 | (17,27]:2=[19,23] | 44 | 2869531 | 5.11805e+7 | -25406.8 | 0.000496417 | -0.00000448034 | 258.050 | 30633.4 | 30886.3 | 77.1
// 34 | 286 | 19 | (286,458]:27 | (19,30]:2=[23,29] | 54 | 3314212 | 6.38190e+7 | -36260.2 | 0.000568172 | -0.00000319712 | -15759.1 | 28772.5 | 35682.5 | 160.4
// 35 | 337 | 20 | (337,548]:33 | (20,33]:3=[23,29,31] | 99 | 12110961 | 2.49031e+8 | -18257.8 | 0.0000733151 | -8.04910e-7 | -20827.3 | 74477.9 | 73546.1 | 346.1
// 36 | 398 | 22 | (398,657]:41 | (22,37]:4=[23,29,31,37] | 164 | 31130966 | 6.67635e+8 | -38174.3 | 0.0000571784 | -8.41475e-7 | 51845.8 | 111746 | 123299 | 703.6
// -- E-empty (control (iv): r band forcibly emptied)
// 20 | 27 | 2 | (27,36]:0=[] | (2,2]:0=[] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 0.0
// 21 | 32 | 2 | (32,44]:0=[] | (2,2]:0=[] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 0.1
// 22 | 38 | 2 | (38,52]:0=[] | (2,2]:0=[] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 0.1
// 23 | 45 | 2 | (45,63]:0=[] | (2,3]:1=[3] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 0.1
// 24 | 54 | 2 | (54,75]:0=[] | (2,3]:1=[3] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 0.2
// 25 | 64 | 2 | (64,90]:0=[] | (2,3]:1=[3] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 0.3
// 26 | 75 | 2 | (75,108]:0=[] | (2,3]:1=[3] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 0.6
// 27 | 89 | 2 | (89,129]:0=[] | (2,3]:1=[3] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 1.2
// 28 | 105 | 2 | (105,155]:0=[] | (2,3]:1=[3] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 2.4
// 29 | 124 | 2 | (124,186]:0=[] | (2,4]:1=[3] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 5.1
// 30 | 147 | 2 | (147,222]:0=[] | (2,4]:1=[3] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 10.5
// 31 | 173 | 2 | (173,266]:0=[] | (2,4]:1=[3] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 21.5
// 32 | 205 | 3 | (205,319]:0=[] | (3,4]:0=[] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 38.8
// 33 | 242 | 3 | (242,382]:0=[] | (3,4]:0=[] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 77.1
// 34 | 286 | 3 | (286,458]:0=[] | (3,5]:1=[5] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 160.4
// 35 | 337 | 3 | (337,548]:0=[] | (3,5]:1=[5] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 346.1
// 36 | 398 | 3 | (398,657]:0=[] | (3,5]:1=[5] | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | 0.00000 | 0.00000 | 703.6
//
// SHIFT-4 CONTROL (i)  j | K(shift2) | K(shift4) | count2 | count4
// D-scaled j=20 | 6.16313 | -145.582 | 172 | 258
// D-scaled j=21 | -43.2011 | 476.584 | 523 | 783
// D-scaled j=22 | 243.658 | -29.6152 | 1988 | 2989
// A-eta100 j=23 | -131.827 | 146.559 | 940 | 1406
// A-eta100 j=24 | 984.409 | 422.988 | 6516 | 9802
// D-scaled j=24 | -530.135 | 440.426 | 474 | 718
// A-eta100 j=25 | -1211.03 | -461.317 | 21312 | 31987
// D-scaled j=25 | 751.991 | -1565.53 | 6287 | 9427
// A-eta100 j=26 | 1144.18 | -1802.77 | 46435 | 69704
// D-scaled j=26 | 687.416 | -2178.01 | 20558 | 30816
// A-eta100 j=27 | -381.711 | -367.525 | 121367 | 182000
// D-scaled j=27 | -6409.57 | 4073.12 | 61721 | 92609
// A-eta100 j=28 | 1507.63 | 1615.54 | 263917 | 395943
// D-scaled j=28 | -1277.24 | 2421.52 | 64962 | 97423
// A-eta100 j=29 | -4808.72 | -6104.35 | 651832 | 977743
// D-scaled j=29 | 1076.61 | -14198.9 | 217944 | 326905
// A-eta100 j=30 | -6207.37 | 5595.20 | 1465733 | 2198685
// D-scaled j=30 | 4192.96 | -1441.77 | 282199 | 423164
// A-eta100 j=31 | 4312.85 | 3129.36 | 2689218 | 4033896
// D-scaled j=31 | -6186.65 | -6380.63 | 775093 | 1162777
// D-scaled j=32 | 40807.4 | 7096.45 | 2114902 | 3172457
// D-scaled j=33 | -25406.8 | 63059.4 | 2869531 | 4304403
// A-eta100 j=34 | -16592.7 | 12820.4 | 2536891 | 3805456
// D-scaled j=34 | -36260.2 | 13870.8 | 3314212 | 4971469
// A-eta100 j=35 | 1534.82 | 52113.7 | 11247485 | 16871882
// D-scaled j=35 | -18257.8 | 111753 | 12110961 | 18166556
// A-eta100 j=36 | 54562.1 | -69693.3 | 32345791 | 48520449
// D-scaled j=36 | -38174.3 | -159409 | 31130966 | 46697600
//
// FITS  key | nPts | jUsed | slope log(|K|/mass) | slope log(randSd/mass) | slope log(theorySd/mass) | slope log|K| | slope log mass | signs of K | anyK<-C2x | max|K/(C2x)| | median |K|/theorySd
// A-eta100 | 12 | 23..36 | -0.6658 | -0.5145 | -0.5003 | 0.4338 | 1.100 | -+-+-+--+-++ | false | 0.00008888 | 0.9433
// B-eta40 | 17 | 20..36 | -0.5412 | -0.5188 | -0.5173 | 0.6174 | 1.159 | -+--++-+---++-+++ | false | 0.0001836 | 0.6353
// C-dyadic | 17 | 20..36 | -0.4872 | -0.4461 | -0.4546 | 0.5083 | 0.9955 | ----+--+--++--+-+ | false | 0.0003287 | 0.5611
// D-scaled | 16 | 20..36 | -0.4962 | -0.5450 | -0.5347 | 0.6819 | 1.178 | +-+-++--++-+---- | false | 0.00008800 | 0.4985
// E-empty | 0 | -..- | n/a | n/a | n/a | n/a | n/a | - | false | n/a | n/a
//
// EXACT SMALL-j CORNER ENUMERATION  j key | quadruples | occurring (r,rp) pairs | fullMass | s11Mass | s11 share of full mass | s11-prime mass | nonsqf mass | nonsqf share | twoPoint signed | identity | direct-vs-quad | split
// j=20 A-eta100 | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | n/a | 0.00000 | OK | 0.00 | 0.00
// j=20 B-eta40 | 6870 | 7 | 21677.7 | 21677.7 | 1.000 | 19831.7 | 5342.06 | 0.2694 | -38.4913 | OK | 8.53e-14 | 8.53e-14
// j=20 D-scaled | 355 | 2 | 1579.63 | 1579.63 | 1.000 | 1382.70 | 211.625 | 0.1531 | 6.16313 | OK | 1.78e-15 | 1.42e-14
// j=22 A-eta100 | 0 | 0 | 0.00000 | 0.00000 | n/a | 0.00000 | 0.00000 | n/a | 0.00000 | OK | 0.00 | 0.00
// j=22 B-eta40 | 43689 | 11 | 148600 | 147904 | 0.9953 | 105185 | 27824.2 | 0.2645 | -363.154 | OK | 1.36e-12 | 3.67e-12
// j=22 D-scaled | 5032 | 3 | 24022.7 | 24022.7 | 1.000 | 17318.8 | 2528.97 | 0.1460 | 243.658 | OK | 0.00 | 2.84e-14
// j=24 A-eta100 | 12170 | 5 | 43948.0 | 43948.0 | 1.000 | 41591.2 | 10893.3 | 0.2619 | 984.409 | OK | 0.00 | 4.55e-12
// j=24 B-eta40 | 228703 | 28 | 855325 | 843180 | 0.9858 | 593948 | 148758 | 0.2505 | 2033.22 | OK | 2.27e-12 | 1.66e-11
// j=24 D-scaled | 9696 | 5 | 37200.4 | 37200.4 | 1.000 | 5414.08 | 530.814 | 0.09804 | -530.135 | OK | 0.00 | 1.14e-13
//
// CONTROLS: emptyBand_K_zero=true; muReplacedByOne_reproducesMass=true; massAllStrictlyExceedsMassSomewhere=true; shift4_differs=true; shift4_rows=28; randMeanWithin4sd=true; enumIdentityHolds=true; enumTwoPointMatchesDirect=true; enumSplitExact=true; enumMatchesSegmentedK=true; enumRowsChecked=9
// runtime: 1393.3 s total
// ============================================================================
// READINGS
// 1. DISCONFIRMING FIRST, on the measurement itself: at every j reached the
//    actual right cutoff Z=floor(x^(1/20)) admits AT MOST ONE prime in its
//    band, and none at j=20, j=21, j=22, j=32 and j=33. The A-eta100 rows
//    are therefore not
//    a measurement of the asymptotic corner; they are a sum whose right prime
//    is the single fixed prime 3 (j=23..31) or 5 (j=34..36). D-scaled raises
//    the right exponent to 1/8 to populate the band and is a MODEL of the
//    corner's shape, not the corner.
// 2. FALSIFIER VERDICT: |K|/mass falls with x in all four live variants, but
//    in none of them faster than the matched random-sign control. Slopes of
//    log(|K|/mass) against log x are -0.6658 (A-eta100, 12 points), -0.5412
//    (B-eta40, 17), -0.4872 (C-dyadic, 17), -0.4962 (D-scaled, 16); the exact
//    null sqrt(sum w^2)/mass has slopes -0.5003, -0.5173, -0.4546, -0.5347 on
//    the same points. Two variants fall marginally faster than their null and
//    two marginally slower. The pre-registered rule says a decay no faster
//    than random is not evidence of arithmetic structure, so THE RUNS GIVE NO
//    EVIDENCE OF CANCELLATION IN THE CORNER CORRELATION AT THESE SCALES.
// 3. The same statement without a fit: the median of |K|/sqrt(sum w^2) is
//    0.9433, 0.6353, 0.5611 and 0.4985 in the four variants. K sits at the
//    size of a random-sign sum on its own support, no smaller.
// 4. K changes sign erratically (the sign strings in the FITS block show no
//    run longer than four), and K is never below -C2*x: the largest
//    |K/(C2 x)| reached is 0.0003287 in C-dyadic. Finite scales cannot settle
//    the asymptotic, and corner-correlation section 2.2 derives that the
//    one-sided statement, given the complement, IS the theorem.
// 5. Every control fires: emptyBand_K_zero, muReplacedByOne_reproducesMass
//    with massAllStrictlyExceedsMassSomewhere, shift4_differs over 28 rows,
//    randMeanWithin4sd. The independent full-sieve enumeration at j=20, j=22
//    and j=24
//    reproduces the segmented pipeline's K exactly (enumMatchesSegmentedK)
//    and verifies mu(d)mu(e)=mu(n)mu(n-2) term by term (enumIdentityHolds).
// 6. The s=s'=1 share of the full corner mass is 1.000 wherever
//    x^(2*eta0) < 2, because a cofactor below 2V with a prime power above V
//    dividing it must equal that prime power. Only B-eta40 at j=22 and j=24
//    clears the threshold, giving 0.9953 and 0.9858. The s>1 branch is
//    essentially unmeasured here. The non-squarefree class of
//    corner-correlation section 1.4 carries 0.2694, 0.2645, 0.2619, 0.2505,
//    0.1531, 0.1460 and 0.09804 of the s=s'=1 prime-class mass at the rows
//    where it is populated.
// 7. NOT MEASURED, and not measurable this way: any asymptotic rate, the
//    log^(2+eps) x absolute target of corner-correlation section 2.2, the
//    eta0 dependence of the section 1.5 mass asymptotic (the bands are too
//    degenerate to test it), and anything about the complement W_dagger\S_0.
//    No number here may be cited as an input to any estimate.
// ============================================================================
