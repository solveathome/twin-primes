#!/usr/bin/env node
// ============================================================================
// corner-correlation-validation.js
//
// Finite EXACT identity checks for the corner S_0 of the residual domain, as
// specified in research/corner-correlation.md.
//
// WHAT THIS TESTS (and only this): the four representations of R restricted to
// the corner agree exactly, as formal integer combinations of log(r)*log(r'):
//   A  direct four-variable enumeration over n in J_x
//   B  the fiber / CRT parametrisation d = d_0 + (T/g) m, e = e_0 + (K/g) m
//   C  the prime-band form (**): K = r s, T = r' s', with r, r' the unique
//      prime powers above the two cutoffs
//   D  the two-point form  sum_n mu(n) mu(n-2) G(n) G'(n-2)  plus an
//      independently computed non-squarefree remainder
// It also reports the derived class sizes (proper prime powers, s>1, s'>1) and
// the s=s'=1 sub-family, whose weight is nonnegative.
//
// WHAT THIS DOES NOT TEST: any asymptotic rate, any cancellation, any saving,
// and the density subtraction (which is an asymptotic statement).
// At reachable x the asymptotic exponent windows (6/25, 1/20) are degenerate
// (Z = floor(x^(1/20)) is 2 or 3), so the structural cases use larger cutoff
// exponents w, v chosen so that the s>1, s'>1 and prime-power branches are
// actually populated. The finite corner is defined intrinsically, as
//     V < k <= V*Delta   and   Z < t <= Z*Delta,
// the finite analogue of "both cofactors within x^(2 eta_0) of their own
// thresholds"; Delta plays the role of x^(2 eta_0).
//
// NEGATIVE CONTROLS (each must CHANGE the value; a control that agrees is a
// failed test):
//   C1 use the un-reduced modulus T in place of T/g in the progression of B
//   C2 keep only s = s' = 1 in C
//   C3 use the shift 4 instead of the shift 2 in A
//   C4 drop the mu(k) sign inside G in D
//   C5 widen the right corner cut from Z*Delta to Z*(Delta+1) in A
// ============================================================================

'use strict';

// ---------------------------------------------------------------- sieves ----
function sieves(N) {
  const spf = new Int32Array(N + 1);
  for (let i = 2; i <= N; i++) {
    if (spf[i] === 0) for (let j = i; j <= N; j += i) if (spf[j] === 0) spf[j] = i;
  }
  const mu = new Int8Array(N + 1);
  mu[1] = 1;
  for (let i = 2; i <= N; i++) {
    const p = spf[i], m = i / p;
    mu[i] = (m % p === 0) ? 0 : -mu[m];
  }
  return { spf, mu };
}

function primePowerExp(n, spf) {          // exponent if n is a prime power, else 0
  if (n < 2) return 0;
  const p = spf[n];
  let m = n, e = 0;
  while (m % p === 0) { m /= p; e++; }
  return m === 1 ? e : 0;
}

// ------------------------------------------------- symbolic (r,r') sums -----
// A value is a Map from "r,rp" to an integer coefficient; the real number it
// denotes is sum coeff * log(r) * log(rp).
function symAdd(map, key, c) {
  if (c === 0) return;
  const v = (map.get(key) || 0) + c;
  if (v === 0) map.delete(key); else map.set(key, v);
}
function symEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const [k, v] of a) if (b.get(k) !== v) return false;
  return true;
}
function symDiffKeys(a, b) {
  const keys = new Set([...a.keys(), ...b.keys()]);
  let n = 0;
  for (const k of keys) if ((a.get(k) || 0) !== (b.get(k) || 0)) n++;
  return n;
}
function symValue(map) {
  let s = 0;
  for (const [k, v] of map) {
    const i = k.indexOf(',');
    s += v * Math.log(+k.slice(0, i)) * Math.log(+k.slice(i + 1));
  }
  return s;
}
function symAdd2(dst, src) {
  for (const [k, v] of src) symAdd(dst, k, v);
}

// ------------------------------------------------------------- one case ----
function runCase(cfg, S) {
  const { x, w, v, Delta } = cfg;
  const { spf, mu } = S;

  const U = Math.floor(Math.pow(x, w)), V = U;
  const Y = Math.floor(Math.pow(x, v)), Z = Y;
  const D0 = Math.floor(x / (V + 1));
  const E0 = Math.floor((x - 2) / (Z + 1));
  const Kmax = Math.floor(V * Delta);              // corner: V < k <= V*Delta
  const Tmax = Math.floor(Z * Delta);              // corner: Z < t <= Z*Delta
  const TmaxWide = Math.floor(Z * (Delta + 1));    // control C5
  const nLo = Math.floor(x / 2) + 1;

  // beta_W(k) as the ascending list of prime powers r > W dividing k
  function betaList(k, W) {
    const out = [];
    for (let a = 1; a * a <= k; a++) {
      if (k % a) continue;
      const cands = (a * a === k) ? [a] : [a, k / a];
      for (const c of cands) {
        if (c <= W) continue;
        if (primePowerExp(c, spf) > 0) out.push(c);
      }
    }
    out.sort((p, q) => p - q);
    return out;
  }
  const bK = new Array(Kmax + 1), bT = new Array(TmaxWide + 1);
  let multiPP = 0, properPPk = 0, properPPt = 0;
  for (let k = 0; k <= Kmax; k++) {
    bK[k] = (k > V) ? betaList(k, V) : [];
    if (bK[k].length > 1) multiPP++;
    for (const r of bK[k]) if (primePowerExp(r, spf) > 1) properPPk++;
  }
  for (let t = 0; t <= TmaxWide; t++) {
    bT[t] = (t > Z) ? betaList(t, Z) : [];
    if (t <= Tmax && bT[t].length > 1) multiPP++;
    if (t <= Tmax) for (const r of bT[t]) if (primePowerExp(r, spf) > 1) properPPt++;
  }
  // ------------------------------------------------- one pass over J_x -----
  const A = new Map();          // direct corner sum, shift 2
  const C3 = new Map();         // control: shift 4
  const C5 = new Map();         // control: widened right cut
  const Dmain = new Map();      // squarefree two-point part
  const Drem = new Map();       // independently computed non-squarefree part
  const C4 = new Map();         // control: mu(k) dropped inside G
  const S11 = new Map();        // the s = s' = 1 sub-family
  let mass = 0, quads = 0, massS1 = 0, massSgt1 = 0, massSpgt1 = 0;
  let nonSqfMass = 0;

  const lk = [], rtT = [], rt4 = [];
  for (let n = nLo; n <= x; n++) {
    lk.length = 0;
    for (let k = V + 1; k <= Kmax; k++) {
      if (n % k) continue;
      if (bK[k].length === 0) continue;
      const d = n / k;
      if (d <= U || d > D0) continue;
      if (mu[d] === 0) continue;
      lk.push(k, d);
    }
    if (lk.length === 0) continue;

    const n2 = n - 2;
    rtT.length = 0;
    for (let t = Z + 1; t <= TmaxWide; t++) {
      if (n2 % t) continue;
      if (bT[t].length === 0) continue;
      const e = n2 / t;
      if (e <= Y || e > E0) continue;
      if (mu[e] === 0) continue;
      rtT.push(t, e);
    }
    const n4 = n - 4;
    rt4.length = 0;
    if (n4 > 0) {
      for (let t = Z + 1; t <= Tmax; t++) {
        if (n4 % t) continue;
        if (bT[t].length === 0) continue;
        const e = n4 / t;
        if (e <= Y || e > E0) continue;
        if (mu[e] === 0) continue;
        rt4.push(t, e);
      }
    }

    for (let i = 0; i < lk.length; i += 2) {
      const k = lk[i], d = lk[i + 1], md = mu[d];
      const bk = bK[k];
      // ---- shift 4 control
      for (let j = 0; j < rt4.length; j += 2) {
        const e = rt4[j + 1], me = mu[e];
        for (const r of bk) for (const rp of bT[rt4[j]]) symAdd(C3, r + ',' + rp, md * me);
      }
      // ---- shift 2, both cuts
      for (let j = 0; j < rtT.length; j += 2) {
        const t = rtT[j], e = rtT[j + 1], me = mu[e];
        const bt = bT[t];
        const inCorner = (t <= Tmax);
        for (const r of bk) {
          for (const rp of bt) {
            const key = r + ',' + rp;
            symAdd(C5, key, md * me);
            if (!inCorner) continue;
            symAdd(A, key, md * me);
            mass += Math.log(r) * Math.log(rp); quads++;
            if (k === r && t === rp) { symAdd(S11, key, md * me); massS1 += Math.log(r) * Math.log(rp); }
            if (k !== r) massSgt1 += Math.log(r) * Math.log(rp);
            if (t !== rp) massSpgt1 += Math.log(r) * Math.log(rp);
            if (mu[n] !== 0 && mu[n2] !== 0) {
              symAdd(Dmain, key, mu[n] * mu[n2] * mu[k] * mu[t]);
              symAdd(C4, key, mu[n] * mu[n2]);
            } else {
              symAdd(Drem, key, md * me);
              nonSqfMass += Math.log(r) * Math.log(rp);
            }
          }
        }
      }
    }
  }
  const Dtot = new Map(Dmain); symAdd2(Dtot, Drem);

  // ------------------------------------------------------- B and C --------
  function modInverse(a, m) {
    a = ((a % m) + m) % m;
    let g = m, xx = 0, x1 = 1, m1 = m;
    let b = a;
    while (b !== 0) { const q = Math.floor(g / b); [g, b] = [b, g - q * b]; [xx, x1] = [x1, xx - q * x1]; }
    if (g !== 1) return -1;
    return ((xx % m1) + m1) % m1;
  }
  function fiberSum(useGcdReduction) {
    const out = new Map();
    for (let K = V + 1; K <= Kmax; K++) {
      if (bK[K].length === 0) continue;
      for (let T = Z + 1; T <= Tmax; T++) {
        if (bT[T].length === 0) continue;
        let g = K, b = T; while (b) { const q = g % b; g = b; b = q; }
        if (2 % g !== 0) continue;
        // control C1 uses the un-reduced modulus T in place of T/g, which
        // reaches only one of the g residue classes when g = 2.
        const Kg = K / g, Tg = useGcdReduction ? T / g : T, two = 2 / g;
        let d0 = 0;
        if (Tg > 1) {
          if (useGcdReduction) {
            const inv = modInverse(Kg, Tg);
            if (inv < 0) continue;
            d0 = ((two % Tg) * inv) % Tg;
          } else {
            d0 = -1;
            for (let z = 0; z < Tg; z++) if ((K * z - 2) % Tg === 0) { d0 = z; break; }
            if (d0 < 0) continue;
          }
        }
        const dMin = Math.max(U + 1, Math.floor(x / (2 * K)) + 1);
        const dMax = Math.min(D0, Math.floor(x / K));
        const jLo = Math.ceil((dMin - d0) / Tg), jHi = Math.floor((dMax - d0) / Tg);
        for (let m = jLo; m <= jHi; m++) {
          const d = d0 + Tg * m;
          if (d <= U || d > D0) continue;
          const n = d * K;
          if (n <= x / 2 || n > x) continue;
          if ((n - 2) % T !== 0) continue;
          const e = (n - 2) / T;
          if (e <= Y || e > E0) continue;
          const md = mu[d], me = mu[e];
          if (md === 0 || me === 0) continue;
          for (const r of bK[K]) for (const rp of bT[T]) symAdd(out, r + ',' + rp, md * me);
        }
      }
    }
    return out;
  }
  function bandSum(onlyS1) {
    const out = new Map();
    for (let K = V + 1; K <= Kmax; K++) {
      for (const r of bK[K]) {
        const s = K / r;
        if (!Number.isInteger(s)) continue;
        if (onlyS1 && s !== 1) continue;
        for (let T = Z + 1; T <= Tmax; T++) {
          for (const rp of bT[T]) {
            const sp = T / rp;
            if (!Number.isInteger(sp)) continue;
            if (onlyS1 && sp !== 1) continue;
            let g = K, b = T; while (b) { const q = g % b; g = b; b = q; }
            if (2 % g !== 0) continue;
            const Kg = K / g, Tg = T / g, two = 2 / g;
            let d0 = 0;
            if (Tg > 1) {
              const inv = modInverse(Kg, Tg);
              if (inv < 0) continue;
              d0 = ((two % Tg) * inv) % Tg;
            }
            const dMin = Math.max(U + 1, Math.floor(x / (2 * K)) + 1);
            const dMax = Math.min(D0, Math.floor(x / K));
            const jLo = Math.ceil((dMin - d0) / Tg), jHi = Math.floor((dMax - d0) / Tg);
            for (let m = jLo; m <= jHi; m++) {
              const d = d0 + Tg * m;
              if (d <= U || d > D0) continue;
              const n = d * K;
              if (n <= x / 2 || n > x) continue;
              if ((n - 2) % T !== 0) continue;
              const e = (n - 2) / T;
              if (e <= Y || e > E0) continue;
              if (mu[d] === 0 || mu[e] === 0) continue;
              symAdd(out, r + ',' + rp, mu[d] * mu[e]);
            }
          }
        }
      }
    }
    return out;
  }

  const B = fiberSum(true);
  const C = bandSum(false);
  const c1 = fiberSum(false);
  const c2 = bandSum(true);

  return {
    cfg: { x, w: +w.toFixed(6), v: +v.toFixed(6), Delta },
    params: { U, V, Y, Z, D0, E0, Kmax, Tmax, TmaxWide },
    classes: {
      cofactorsWithTwoPrimePowersAboveCutoff: multiPP,
      properPrimePowerSlotsLeft: properPPk,
      properPrimePowerSlotsRight: properPPt,
    },
    identities: {
      'A == B  (fiber/CRT parametrisation)': symEqual(A, B),
      'A == C  (prime-band form (**))': symEqual(A, C),
      'A == D_squarefree + D_nonsquarefree  (two-point form)': symEqual(A, Dtot),
      'C2 control == S11 sub-family computed in the direct pass': symEqual(c2, S11),
    },
    corner: {
      signedValue: +symValue(A).toFixed(6),
      distinctPrimePairKeys: A.size,
      termwiseAbsoluteMass: +mass.toFixed(6),
      contributingQuadruples: quads,
      massWith_s_eq_1_and_sp_eq_1: +massS1.toFixed(6),
      massWith_s_gt_1: +massSgt1.toFixed(6),
      massWith_sp_gt_1: +massSpgt1.toFixed(6),
      massWith_n_or_nMinus2_nonsquarefree: +nonSqfMass.toFixed(6),
      signedValue_s1sp1_subfamily: +symValue(S11).toFixed(6),
      signedValue_squarefreePart: +symValue(Dmain).toFixed(6),
      signedValue_nonsquarefreePart: +symValue(Drem).toFixed(6),
      ratio_absSigned_over_mass: mass > 0 ? +(Math.abs(symValue(A)) / mass).toFixed(6) : null,
    },
    controls: {
      'C1 use modulus T instead of T/g': { differs: !symEqual(A, c1), changedKeys: symDiffKeys(A, c1) },
      "C2 keep only s=s'=1": { differs: !symEqual(A, c2), changedKeys: symDiffKeys(A, c2) },
      'C3 shift 4 instead of 2': { differs: !symEqual(A, C3), changedKeys: symDiffKeys(A, C3) },
      'C4 drop mu(k) inside G': { differs: !symEqual(Dmain, C4), changedKeys: symDiffKeys(Dmain, C4) },
      'C5 widen right corner cut': { differs: !symEqual(A, C5), changedKeys: symDiffKeys(A, C5) },
    },
  };
}

// ------------------------------------------------------------------ main ---
const CASES = [
  { x: 1 << 22, w: 0.24, v: 0.18, Delta: 4 },      // structural: s>1, s'>1 populated
  { x: 1 << 22, w: 6 / 25, v: 1 / 20, Delta: 3 },  // the actual cutoff exponents
  { x: 1 << 20, w: 0.30, v: 0.22, Delta: 5 },      // second structural case
];

const t0 = Date.now();
const S = sieves(Math.max(...CASES.map(c => c.x)));
const results = CASES.map(c => runCase(c, S));

let allIdent = true, allCtl = true;
const inactive = [];
for (const r of results) {
  for (const ok of Object.values(r.identities)) if (!ok) allIdent = false;
  for (const [name, c] of Object.entries(r.controls)) {
    if (!c.differs) { allCtl = false; inactive.push({ case: r.cfg, control: name }); }
  }
}

const lines = [];
lines.push('scope: exact finite identity checks on the corner S_0 only; no asymptotic rate, saving or cancellation is measured');
lines.push('corner: V<k<=V*Delta and Z<t<=Z*Delta inside U<d<=D0, Y<e<=E0, dk-et=2, dk in (x/2,x]; Delta stands for x^(2*eta_0)');
for (const r of results) {
  const c = r.cfg, p = r.params, q = r.corner, cl = r.classes;
  lines.push(`case x=${c.x} w=${c.w} v=${c.v} Delta=${c.Delta}: U=V=${p.V} Y=Z=${p.Z} D0=${p.D0} E0=${p.E0} Kmax=${p.Kmax} Tmax=${p.Tmax}`);
  lines.push(`  identities: ${Object.entries(r.identities).map(([k, ok]) => `${ok ? 'OK' : 'FAIL'} ${k}`).join('; ')}`);
  lines.push(`  corner: quadruples=${q.contributingQuadruples} keys=${q.distinctPrimePairKeys} signed=${q.signedValue} termwise-absolute-mass=${q.termwiseAbsoluteMass} |signed|/mass=${q.ratio_absSigned_over_mass}`);
  lines.push(`  classes: mass(s=s'=1)=${q.massWith_s_eq_1_and_sp_eq_1} mass(s>1)=${q.massWith_s_gt_1} mass(s'>1)=${q.massWith_sp_gt_1} mass(n or n-2 nonsquarefree)=${q.massWith_n_or_nMinus2_nonsquarefree}`);
  lines.push(`  split: signed(s=s'=1)=${q.signedValue_s1sp1_subfamily} signed(squarefree)=${q.signedValue_squarefreePart} signed(nonsquarefree)=${q.signedValue_nonsquarefreePart}`);
  lines.push(`  cofactor classes: two-prime-powers-above-cutoff=${cl.cofactorsWithTwoPrimePowersAboveCutoff} proper-prime-power slots left=${cl.properPrimePowerSlotsLeft} right=${cl.properPrimePowerSlotsRight}`);
  lines.push(`  controls: ${Object.entries(r.controls).map(([k, v2]) => `${v2.differs ? 'ACTIVE' : 'INACTIVE'}(${v2.changedKeys}) ${k}`).join('; ')}`);
}
lines.push(`summary: allIdentitiesHold=${allIdent} everyControlActiveInEveryCase=${allCtl} inactive=${inactive.map(i => `${i.control}@x=${i.case.x},v=${i.case.v}`).join(',') || 'none'}`);
lines.push(`runtime: ${((Date.now() - t0) / 1000).toFixed(2)} s`);
console.log(lines.join('\n'));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/corner-correlation-validation.js
//   invocation:  node research/corner-correlation-validation.js
//   code-sha256: 30f9ea2fb2420f482c1f9ee9b421adfd4a11ad60ad66e23944163946c4307dec
//   out-sha256:  ae29d80e4b1da5268aadf496c4daf46c1c2fef146efedb39a1f55c6a3c5045e8
//   body-lines:  25
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     1.9 s
// ============================================================================
// scope: exact finite identity checks on the corner S_0 only; no asymptotic rate, saving or cancellation is measured
// corner: V<k<=V*Delta and Z<t<=Z*Delta inside U<d<=D0, Y<e<=E0, dk-et=2, dk in (x/2,x]; Delta stands for x^(2*eta_0)
// case x=4194304 w=0.24 v=0.18 Delta=4: U=V=38 Y=Z=15 D0=107546 E0=262143 Kmax=152 Tmax=60
//   identities: OK A == B  (fiber/CRT parametrisation); OK A == C  (prime-band form (**)); OK A == D_squarefree + D_nonsquarefree  (two-point form); OK C2 control == S11 sub-family computed in the direct pass
//   corner: quadruples=285453 keys=434 signed=4441.443071 termwise-absolute-mass=3809775.329067 |signed|/mass=0.001166
//   classes: mass(s=s'=1)=2141861.043698 mass(s>1)=998643.399203 mass(s'>1)=1068458.326151 mass(n or n-2 nonsquarefree)=2713808.613862
//   split: signed(s=s'=1)=970.149338 signed(squarefree)=1709.106114 signed(nonsquarefree)=2732.336956
//   cofactor classes: two-prime-powers-above-cutoff=2 proper-prime-power slots left=9 right=9
//   controls: ACTIVE(87) C1 use modulus T instead of T/g; ACTIVE(261) C2 keep only s=s'=1; ACTIVE(462) C3 shift 4 instead of 2; ACTIVE(68) C4 drop mu(k) inside G; ACTIVE(312) C5 widen right corner cut
// case x=4194304 w=0.24 v=0.05 Delta=3: U=V=38 Y=Z=2 D0=107546 E0=1398100 Kmax=114 Tmax=6
//   identities: OK A == B  (fiber/CRT parametrisation); OK A == C  (prime-band form (**)); OK A == D_squarefree + D_nonsquarefree  (two-point form); OK C2 control == S11 sub-family computed in the direct pass
//   corner: quadruples=272715 keys=55 signed=858.125273 termwise-absolute-mass=1453572.789588 |signed|/mass=0.00059
//   classes: mass(s=s'=1)=1085523.152627 mass(s>1)=258357.574736 mass(s'>1)=168594.537226 mass(n or n-2 nonsquarefree)=1026735.438522
//   split: signed(s=s'=1)=834.276566 signed(squarefree)=-915.935097 signed(nonsquarefree)=1774.060371
//   cofactor classes: two-prime-powers-above-cutoff=0 proper-prime-power slots left=4 right=1
//   controls: ACTIVE(11) C1 use modulus T instead of T/g; ACTIVE(25) C2 keep only s=s'=1; ACTIVE(62) C3 shift 4 instead of 2; INACTIVE(0) C4 drop mu(k) inside G; ACTIVE(50) C5 widen right corner cut
// case x=1048576 w=0.3 v=0.22 Delta=5: U=V=63 Y=Z=21 D0=16384 E0=47662 Kmax=315 Tmax=105
//   identities: OK A == B  (fiber/CRT parametrisation); OK A == C  (prime-band form (**)); OK A == D_squarefree + D_nonsquarefree  (two-point form); OK C2 control == S11 sub-family computed in the direct pass
//   corner: quadruples=79096 keys=1218 signed=-2837.314782 termwise-absolute-mass=1358424.838681 |signed|/mass=0.002089
//   classes: mass(s=s'=1)=662805.127815 mass(s>1)=439493.388255 mass(s'>1)=451713.026803 mass(n or n-2 nonsquarefree)=955040.290175
//   split: signed(s=s'=1)=-4449.85917 signed(squarefree)=-1853.366317 signed(nonsquarefree)=-983.948466
//   cofactor classes: two-prime-powers-above-cutoff=5 proper-prime-power slots left=17 right=14
//   controls: ACTIVE(247) C1 use modulus T instead of T/g; ACTIVE(767) C2 keep only s=s'=1; ACTIVE(1288) C3 shift 4 instead of 2; ACTIVE(235) C4 drop mu(k) inside G; ACTIVE(684) C5 widen right corner cut
// summary: allIdentitiesHold=true everyControlActiveInEveryCase=false inactive=C4 drop mu(k) inside G@x=4194304,v=0.05
// runtime: 1.78 s
// ============================================================================
// READINGS
// 1. The four representations of the corner sum agree exactly, as integer
//    combinations of log(r)log(r'), in every case: the fiber/CRT progression,
//    the prime-band form (**) and the two-point form with its independently
//    computed non-squarefree remainder are the same sum as the direct
//    four-variable enumeration.
// 2. Four of the five negative controls change the value in every case. The
//    fifth, C4, is inactive at w=0.24, v=0.05, where s=s'=1 is forced on the
//    squarefree class, so mu(k)mu(t)=1 identically there; it is active in the
//    other two cases.
// 3. The non-squarefree class carries most of the term-wise mass at these
//    parameters, so the clean mu(n)mu(n-2) reading covers a minority of the
//    corner unless the s=s'=1 sub-family is isolated first.
// 4. |signed|/mass is small in all three cases. This is a finite observation
//    at non-asymptotic cutoffs; it measures no rate and implies no saving.
