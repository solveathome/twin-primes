'use strict';
// ============================================================================
// THE TAIL-DEFICIT FACTOR FROM ZERO PARAMETERS
// (2026-08-29; note research/history/staging/measure-tail-deficit-0829.md)
// run: node research/measure-tail-deficit-0829.js
//      embed: node research/qc/embed.js research/measure-tail-deficit-0829.js
//             --timeout 7200
// ============================================================================
// THE QUESTION (object-models-read-0829.md section 7, C3). gap-spectrum-01.md
// measures the tile's twin-slot gap maximum at a factor 2.241 (@29) and 2.087
// (@31) BELOW the renewal maximum mbar*lnD, so the deficit factor
// delta = G2/(mbar*lnD) reads 0.446 and 0.479. That note classifies the finding
// RESIDUE-LEVEL by INFERENCE, on the ground that CRT merges only at qualifying
// gaps g = 0, +/-2 (mod q) while independent thinning "manufactures a tail out
// of nothing" (import-thinning.md section 2.1, 2.2). Nobody has computed the
// prediction. This file computes it: the exact compound-geometric thinning of
// the previous level's own histogram, once WITHOUT the qualifying-gap
// constraint (M1, the control) and once WITH it carried through exactly (M2,
// the model), both at zero free parameters, iterated up the ladder from the
// exact T_13 histogram, and read against the measured delta at every level.
//
// THE DOUBT, written first and it is structural. delta is ALREADY 0.4468 at
// x = 13, the seed. A model iterated from the exact T_13 histogram therefore
// starts at the answer, and reproducing 0.446 and 0.479 is weak evidence on its
// own. The discriminating quantity is the SEPARATION between M2 and M1 from the
// same seed: if the qualifying-gap constraint does not move delta, the test is
// vacuous however well M2 does. That is pre-registered in the note as the
// dominating falsifier and is printed here beside every reading.
//
// Second doubt: M2's only approximation is that the old grain is an i.i.d. word
// drawn from the old histogram. The true grain is correlated (mode at 12 not 6,
// and it never contains "6,6"), so M2 is the exact CRT thinning of the WRONG
// word. Section 5 measures that residual directly by running the same fold from
// the true word through the exact operator.
//
// Nothing here is a bound. Everything is a statement about the SIZE
// distribution of the tile's gaps and is silent about PLACEMENT (label (i)).
// ============================================================================

const T0 = Date.now();
let failures = 0;
function assertEq(tag, got, want) {
  if (got !== want) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; }
  return true;
}
function assertNear(tag, got, want, tol) {
  const d = Math.abs(got - want);
  if (!(d <= tol)) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want} (|d| = ${d} > ${tol})`); return false; }
  return true;
}
function assertTrue(tag, cond, detail) {
  if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]${detail ? ': ' + detail : ''}`); }
  return cond;
}
const F = (v, d) => (Number.isFinite(v) ? v.toFixed(d) : 'n/a');
const E = (v, d) => (Number.isFinite(v) ? v.toExponential(d) : 'n/a');
const R = (s, w) => String(s).padStart(w);
const P = (s, w) => String(s).padEnd(w);
function rule(t) { console.log('\n' + '='.repeat(78) + '\n' + t + '\n' + '='.repeat(78)); }
function sub(t) { console.log('\n' + '-'.repeat(78) + '\n' + t + '\n' + '-'.repeat(78)); }
const el = () => ((Date.now() - T0) / 1000);

// progress: one line per 30 s inside any long loop, never more often. It goes to
// STDERR on purpose. A clock-gated line is not reproducible run to run, and
// embed.js binds STDOUT, so putting progress on stdout would make the embedded
// block fail its own out-sha256 check. Progress is still printed and still
// visible in a terminal; it is simply not part of the bound artefact.
let lastTick = 0;
function tick(msg) {
  const now = Date.now();
  if (now - lastTick < 30000) return;
  lastTick = now;
  console.error(`  ... ${msg}   (elapsed ${F(el(), 1)}s)`);
}

// the exact ladder, research/G2-STATE.md section 2 (A144311 + 1)
const LADDER = { 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258, 31: 348 };
const LEVELS = [5, 7, 11, 13, 17, 19, 23, 29, 31];
const MAXLEVEL = Number(process.env.TDMAX || 31);

function primesTo(n) { const s = []; for (let i = 2; i <= n; i++) { let p = true; for (let j = 2; j * j <= i; j++) if (i % j === 0) { p = false; break; } if (p) s.push(i); } return s; }
function tileWD(x) { let D = 1, W = 1; for (const p of primesTo(x)) { W *= p; if (p >= 5) D *= (p - 2); } return { W, D }; }
function inv(a, m) { a = ((a % m) + m) % m; for (let i = 1; i < m; i++) if ((a * i) % m === 1) return i; return NaN; }
// n = 6j + 5.  n = 0 mod p  <=>  j = -5*inv6 mod p ;  n + 2 = 0 mod p  <=>  j = -7*inv6 mod p
function badResidues(p) { const i6 = inv(6, p); return [(((-5 * i6) % p) + p) % p, (((-7 * i6) % p) + p) % p]; }

// ---------------------------------------------------------------------------
// 1. THE TILE, BY DIRECT SEGMENTED SIEVE. Returns the exact gap histogram
//    (index = gap/6) and, on request, the whole cyclic grain as a Uint8Array of
//    gap/6. Independent of the transfer operator in every line.
// ---------------------------------------------------------------------------
const SEGJ = 1 << 22;
const HB = 4096;

function sieveTile(x, keepWord) {
  const { W, D } = tileWD(x);
  const M = W / 6;
  const ps = primesTo(x).filter(p => p >= 5);
  const patP = ps.filter(p => p <= 19);
  const restP = ps.filter(p => p > 19);
  let PAT = 1; for (const p of patP) PAT *= p;
  const pat = new Uint8Array(PAT);
  for (const p of patP) for (const r of badResidues(p)) for (let k = r; k < PAT; k += p) pat[k] = 1;
  const restRes = restP.map(p => ({ p, r: badResidues(p) }));

  const segLen = Math.min(SEGJ, Math.max(4, M));
  const buf = new Uint8Array(segLen);
  const hist = new Float64Array(HB);
  const word = keepWord ? new Uint8Array(D) : null;

  let nSlots = 0, sumGaps = 0, maxGap = 0, firstJ = -1, prevJ = -1, nw = 0;
  for (let lo = 0; lo < M; lo += segLen) {
    const hi = Math.min(M, lo + segLen), len = hi - lo;
    // small primes by pattern copy
    let o = lo % PAT;
    for (let done = 0; done < len;) {
      const take = Math.min(len - done, PAT - o);
      buf.set(pat.subarray(o, o + take), done);
      done += take; o += take; if (o === PAT) o = 0;
    }
    for (const { p, r } of restRes) for (const rr of r) {
      let s = rr - (lo % p); if (s < 0) s += p;
      for (let k = s; k < len; k += p) buf[k] = 1;
    }
    for (let k = 0; k < len; k++) {
      if (buf[k]) continue;
      const j = lo + k;
      nSlots++;
      if (prevJ < 0) { firstJ = j; } else {
        const g6 = j - prevJ;                 // gap/6, in j units
        sumGaps += g6; if (g6 > maxGap) maxGap = g6;
        hist[g6] += 1; if (word) word[nw++] = g6;
      }
      prevJ = j;
    }
    tick(`sieve @${x}: ${(100 * hi / M).toFixed(1)}%`);
  }
  // the grain is cyclic: the wrap gap closes it
  const wrap = firstJ + M - prevJ;
  sumGaps += wrap; if (wrap > maxGap) maxGap = wrap;
  hist[wrap] += 1; if (word) word[nw++] = wrap;

  assertEq(`sieve @${x} slots = prod(p-2)`, nSlots, D);
  assertEq(`sieve @${x} gaps = D`, nw || nSlots, D);
  assertEq(`sieve @${x} sum of gaps = W`, sumGaps * 6, W);
  assertEq(`sieve @${x} max = ladder G2`, maxGap * 6, LADDER[x]);
  return { x, W, D, hist, maxGap, word, mbar: W / D };
}

// ---------------------------------------------------------------------------
// 2. THE EXACT HISTOGRAM TRANSFER OPERATOR (U-FRAME section 11, PROVEN there;
//    ported from research/a3-09-histogram-operator.js, which is the record's
//    implementation). Takes the old grain WORD and q; returns the exact new
//    histogram. It is an exact simulator, not a model and not a bound.
// ---------------------------------------------------------------------------
function foldHistExact(g8, D, q) {
  const h = new Float64Array(HB);
  let total = 0, maxL = 0;
  for (let i = 0; i < D; i++) {
    if ((i & 0xFFFFF) === 0) tick(`operator q=${q}: ${(100 * i / D).toFixed(1)}%`);
    let d = g8[i] * 6;
    const G1 = d % q;
    let nu = (G1 === 0) ? q - 2 : (G1 === 2 || G1 === q - 2) ? q - 3 : q - 4;
    h[d / 6] += nu; total += nu;
    let a0 = G1, a1 = (G1 + 2) % q, n = 2;
    const b0 = (a0 === 0 || a0 === 2), b1 = (a1 === 0 || a1 === 2);
    if (b0 && b1) n = 0;
    else if (b0) { a0 = a1; n = 1; }
    else if (b1) n = 1;
    let L = 1, j = i;
    while (n > 0) {
      j++; d += g8[j % D] * 6;
      const Gn = d % q, e2 = (Gn + 2) % q;
      let v = 0;
      if (a0 !== Gn && a0 !== e2) v++;
      if (n === 2 && a1 !== Gn && a1 !== e2) v++;
      if (v) { h[d / 6] += v; total += v; if (L > maxL) maxL = L; }
      const k0 = (a0 === Gn || a0 === e2), k1 = (n === 2) && (a1 === Gn || a1 === e2);
      if (k0 && k1) { /* both stay */ }
      else if (k0) { n = 1; }
      else if (k1) { a0 = a1; n = 1; }
      else { n = 0; }
      L++;
      if (L > 5000) throw new Error('runaway run');
    }
  }
  return { h, total, maxL };
}

// explicit fold producing the new grain WORD (a3-09's foldWord; needs W and s0)
function foldWord(g8, D, W, s0, q, out) {
  const w = W % q, t = new Uint8Array(D);
  let s = s0 % q;
  for (let i = 0; i < D; i++) { t[i] = s; s = (s + g8[i] * 6) % q; }
  let n = 0, acc = 0, started = false, leading = 0, kw = 0;
  const b2 = q - 2;
  for (let k = 0; k < q; k++) {
    for (let i = 0; i < D; i++) {
      const u = (t[i] + kw) % q;
      if (u !== 0 && u !== b2) { if (started) out[n++] = acc / 6; else { started = true; leading = acc; } acc = 0; }
      acc += g8[i] * 6;
    }
    kw = (kw + w) % q;
    tick(`foldWord q=${q}: copy ${k + 1}/${q}`);
  }
  out[n++] = (acc + leading) / 6;
  return n;
}

// ---------------------------------------------------------------------------
// 3. THE TWO MODELS. Both act on a pmf over gap sizes indexed by k = gap/6 and
//    both are exact given their own assumption; neither has a free parameter.
// ---------------------------------------------------------------------------
const NB = 1200;                      // model support: gaps to 7200

function pmfFromHist(hist, D) {
  const f = new Float64Array(NB);
  for (let k = 1; k < HB && k < NB; k++) if (hist[k]) f[k] = hist[k] / D;
  return f;
}

// M1: independent thinning. Each slot copy dies with probability r = 2/q,
// independently; a new gap is the span of a maximal run of deaths, so the run
// length is Geometric and the new law solves f = (1-r)h + r(h*f) exactly.
// (import-thinning.md section 2.2's reference law, and section 1.1's classical
// compound-geometric thinning of a renewal process.)
function foldM1(h, q) {
  const r = 2 / q, s = 1 - r;
  const f = new Float64Array(NB);
  const sup = []; for (let k = 1; k < NB; k++) if (h[k] > 0) sup.push(k);
  for (let k = 1; k < NB; k++) {
    let acc = s * h[k];
    for (const j of sup) { if (j >= k) break; acc += r * h[j] * f[k - j]; }
    f[k] = acc;
  }
  return f;
}

// M2: CRT-constrained thinning. The multiplicity is the PROVEN one
// (U-FRAME section 5a/11, a3-09): for a run of L deaths after a surviving slot,
//   nu_q = #{a' in Z/q : G_j in {a', a'-2} (mod q) for j = 1..L;
//                        a' not in {0,2}; G_{L+1} not in {a', a'-2}}.
// G_j is the accumulated new gap, so the run-continuation test is a test on the
// accumulated gap mod q alone, and a run of length >= 2 forces every interior
// old gap to be 0 or +/-2 (mod q): the qualifying-gap constraint, carried
// exactly. The ONLY approximation is that the old grain is i.i.d. from h.
function foldM2(h, q) {
  const out = new Float64Array(NB);
  const A = new Float64Array(NB);
  const sup = []; for (let k = 1; k < NB; k++) if (h[k] > 0) sup.push(k);
  const res = new Int32Array(NB); for (let k = 0; k < NB; k++) res[k] = (6 * k) % q;
  let emitted = 0;
  for (let ap = 0; ap < q; ap++) {
    if (ap === 0 || ap === 2) continue;
    const s0 = ap, s1 = ((ap - 2) % q + q) % q;
    A.fill(0);
    for (let k = 1; k < NB; k++) {
      let acc = h[k];
      for (const j of sup) { if (j >= k) break; if (A[k - j] > 0) acc += A[k - j] * h[j]; }
      const rm = res[k];
      if (rm === s0 || rm === s1) A[k] = acc; else { out[k] += acc; emitted += acc; }
    }
  }
  for (let k = 0; k < NB; k++) out[k] /= (q - 2);
  return { f: out, emitted: emitted / (q - 2) };
}

// ---------------------------------------------------------------------------
// 4. READERS. The maximum convention is the one that returns the TRUE G2 when
//    applied to the TRUE histogram: the largest d whose expected count at or
//    above d is at least 1.
// ---------------------------------------------------------------------------
function tailCounts(f, D) {                 // S[k] = D * P(gap >= 6k)
  const S = new Float64Array(NB + 1);
  for (let k = NB - 1; k >= 0; k--) S[k] = S[k + 1] + D * f[k];
  return S;
}
function maxAtCount1(f, D) {
  const S = tailCounts(f, D);
  for (let k = NB - 1; k >= 1; k--) if (S[k] >= 1) return 6 * k;
  return 0;
}
// the count-1 threshold read continuously, by linear interpolation in ln(count),
// so that the M1 -> M2 -> truth split is not quantised to the 6-unit bin
function maxAtCount1Interp(f, D) {
  const S = tailCounts(f, D);
  for (let k = NB - 1; k >= 1; k--) {
    if (S[k] >= 1) {
      if (k + 1 >= NB || S[k + 1] <= 0) return 6 * k;
      const a = Math.log(S[k]), b = Math.log(S[k + 1]);
      return 6 * (k + (a - 0) / (a - b));
    }
  }
  return 0;
}
function meanOf(f) { let m = 0; for (let k = 1; k < NB; k++) m += 6 * k * f[k]; return m; }
function massOf(f) { let m = 0; for (let k = 1; k < NB; k++) m += f[k]; return m; }
function lnDof(x) { let s = 0; for (const p of primesTo(x)) if (p >= 5) s += Math.log(p - 2); return s; }
function tailGT(f, D, t) { let s = 0; for (let k = NB - 1; k >= 1; k--) { if (6 * k <= t) break; s += f[k]; } return D * s; }
function histTailGT(hist, t) { let s = 0; for (let k = 1; k < HB; k++) if (6 * k > t) s += hist[k]; return s; }

function shuffleInPlace(a, n, seed) {          // xorshift32, so the run reproduces
  let s = seed >>> 0;
  const rnd = () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
    if ((i & 0xFFFFFF) === 0) tick(`shuffle: ${n - i}/${n}`);
  }
}

// ================================================================== main ====
rule('THE TAIL-DEFICIT FACTOR FROM ZERO PARAMETERS: CRT-CONSTRAINED THINNING');
console.log('Producer for research/history/staging/measure-tail-deficit-0829.md.');
console.log('Everything below is label (i): the SIZE distribution of the tile gaps,');
console.log('silent about PLACEMENT. No object here is a bound on G2.');

// ------------------------------------------------------------------------
sub('0. PRE-REGISTRATION, echoed before any measurement is taken.');
// ------------------------------------------------------------------------
console.log('  Registered in measure-tail-deficit-0829.md section 1 before this file existed:');
console.log('  R1  M1 (independent thinning, the control): delta point 0.90, band [0.72, 0.95]');
console.log('      at @23, @29, @31.');
console.log('  R2  M2 (CRT-constrained): delta point 0.45 (@23), 0.44 (@29), 0.44 (@31),');
console.log('      band [0.38, 0.55]; and M2 must sit BELOW M1 at every level, widening.');
console.log('  R3  M2 cannot reproduce the level-to-level jitter (0.4577 -> 0.4463 -> 0.4791).');
console.log('  R4  M2 run one fold from the TRUE previous histogram OVERSHOOTS the true far');
console.log('      tail by a factor in [1, 3]; the sign is the registered part.');
console.log('  R5  the exact operator on a SHUFFLED true grain must agree with M2 analytic');
console.log('      at every bin whose count exceeds 100. A validation, not a prediction.');
console.log('  FALSIFIER, dominating: if M1 and M2 agree to within 0.05 in delta at @29 and');
console.log('      @31, the constraint carries no information and the test is VACUOUS.');
console.log('');
console.log('  The measured target, from research/gap-spectrum-01.js OUTPUT null/true:');
console.log('    x  = 13     17     19     23     29     31');
console.log('    null/true  2.238  2.124  2.193  2.185  2.241  2.087');
console.log('    delta      (reciprocals; recomputed exactly below, not transcribed)');

// ------------------------------------------------------------------------
rule('1. CUSTODY A: THE EXACT TILE BY DIRECT SEGMENTED SIEVE');
// ------------------------------------------------------------------------
console.log('  Gates, each aborting: slot count = prod(p-2) (A059861), gap count = D,');
console.log('  sum of gaps = W exactly, maximum = the exact ladder G2(x#) (G2-STATE section 2).');
console.log('  The word is retained at x <= 29 only; T_31 would need 6.2 GB.\n');
const KEEPW = new Set([13, 17, 19, 23, 29]);
const TILE = {};
console.log('   x |            W |            D |    mbar |  G2 | ln D  |  mbar*lnD | delta = G2/(mbar lnD) | secs');
for (const x of LEVELS) {
  if (x > MAXLEVEL) continue;
  const t0 = Date.now();
  const T = sieveTile(x, KEEPW.has(x));
  T.lnD = lnDof(x); T.g2null = T.mbar * T.lnD; T.delta = LADDER[x] / T.g2null;
  T.secs = (Date.now() - t0) / 1000;
  TILE[x] = T;
  console.log(`  ${R(x, 2)} | ${R(T.W, 12)} | ${R(T.D, 12)} | ${R(F(T.mbar, 4), 7)} | ${R(LADDER[x], 3)} | ${R(F(T.lnD, 3), 5)} | ${R(F(T.g2null, 3), 9)} | ${R(F(T.delta, 4), 21)} | ${R(F(T.secs, 1), 7)}`);
}
console.log(`\n  Total sieve time ${F(el(), 1)} s. delta is the reciprocal of gap-spectrum-01's`);
console.log('  null/true column and is recomputed here from W, D and the ladder, not transcribed.');

// ------------------------------------------------------------------------
rule('2. CUSTODY B: THE EXACT TRANSFER OPERATOR AGAINST THE SIEVE');
// ------------------------------------------------------------------------
console.log('  U-FRAME section 11 / a3-09: the new histogram is a function of the old grain');
console.log('  WORD and q and of nothing else. Two independent engines must agree bin for bin.\n');
console.log('   fold | bins compared | bins disagreeing | max |diff| | total = D(q-2) | max gap');
const OPFOLDS = [[13, 17], [17, 19], [19, 23], [23, 29], [29, 31]];
const OPHIST = {};
for (const [xo, q] of OPFOLDS) {
  if (q > MAXLEVEL || !TILE[xo] || !TILE[xo].word) continue;
  const { h, total, maxL } = foldHistExact(TILE[xo].word, TILE[xo].D, q);
  OPHIST[q] = h;
  let bad = 0, mx = 0, mg = 0;
  const truth = TILE[q] ? TILE[q].hist : null;
  for (let k = 1; k < HB; k++) {
    if (h[k] > 0) mg = k;
    if (truth) { const d = Math.abs(h[k] - truth[k]); if (d > 0) bad++; if (d > mx) mx = d; }
  }
  const want = TILE[xo].D * (q - 2);
  assertEq(`operator ${xo}->${q} total`, total, want);
  if (truth) assertEq(`operator ${xo}->${q} bins agree`, bad, 0);
  assertEq(`operator ${xo}->${q} max gap`, 6 * mg, LADDER[q]);
  console.log(`  ${R(xo + '->' + q, 6)} | ${R(truth ? HB : 0, 13)} | ${R(truth ? bad : 'n/a', 16)} | ${R(truth ? mx : 'n/a', 9)} | ${R(total === want ? 'exact' : 'MISMATCH', 14)} | ${R(6 * mg, 7)}  (longest run L = ${maxL})`);
}
console.log('\n  The operator is PROVEN (U-FRAME section 11) and is used here as an exact');
console.log('  simulator and a custody check, never as a prediction.');

// ------------------------------------------------------------------------
rule('3. R5: THE MODEL M2 AGAINST A SHUFFLED-GRAIN REALISATION OF ITSELF');
// ------------------------------------------------------------------------
console.log('  A shuffled true grain has the same histogram and no correlation, so the EXACT');
console.log('  operator applied to it is one Monte Carlo draw of exactly what M2 computes in');
console.log('  closed form. Disagreement at large counts means M2 is implemented wrongly and');
console.log('  nothing after this section may be read.\n');
const SHUF = {};
console.log('   fold | bins with count > 100 | max |M2/shuffle - 1| | max Poisson z | max gap shuffle | max gap M2 | max gap true');
for (const [xo, q] of [[19, 23], [23, 29], [29, 31]]) {
  if (q > MAXLEVEL || !TILE[xo] || !TILE[xo].word) continue;
  const w = Uint8Array.from(TILE[xo].word);
  shuffleInPlace(w, TILE[xo].D, 0x9E3779B9 ^ xo);
  const sh = foldHistExact(w, TILE[xo].D, q).h;
  const m2 = foldM2(pmfFromHist(TILE[xo].hist, TILE[xo].D), q).f;
  const Dn = TILE[xo].D * (q - 2);
  let n100 = 0, worst = 0, worstz = 0, mgs = 0, mgm = 0;
  for (let k = 1; k < HB; k++) {
    if (sh[k] > 0) mgs = k;
    const pred = k < NB ? m2[k] * Dn : 0;
    if (sh[k] > 100) {
      n100++;
      const rel = Math.abs(pred / sh[k] - 1); if (rel > worst) worst = rel;
      const z = Math.abs(pred - sh[k]) / Math.sqrt(sh[k]); if (z > worstz) worstz = z;
    }
  }
  for (let k = NB - 1; k >= 1; k--) if (m2[k] * Dn >= 1) { mgm = k; break; }
  console.log(`  ${R(xo + '->' + q, 6)} | ${R(n100, 21)} | ${R(F(worst, 5), 20)} | ${R(F(worstz, 3), 12)} | ${R(6 * mgs, 15)} | ${R(6 * mgm, 10)} | ${R(LADDER[q], 12)}`);
  assertTrue(`R5 shuffle vs M2 ${xo}->${q}`, worstz < 6, `worst Poisson z ${F(worstz, 3)} at counts > 100`);
  SHUF[xo + '->' + q] = { mgs: 6 * mgs, mgm: 6 * mgm, truth: LADDER[q], h: sh };
}

// ------------------------------------------------------------------------
rule('4. THE TWO MODELS ITERATED FROM THE EXACT T_13 HISTOGRAM');
// ------------------------------------------------------------------------
console.log('  Seed: the exact T_13 gap histogram. No parameter is touched at any fold.');
console.log('  delta_model = (largest d whose predicted count at or above d is at least 1)');
console.log('              / (mbar * ln D), the SAME convention that returns the true G2 when');
console.log('  applied to the true histogram (checked in the "truth" column).\n');

function iterate(seedX, foldFn, label) {
  let f = pmfFromHist(TILE[seedX].hist, TILE[seedX].D);
  const out = { };
  const chain = LEVELS.filter(x => x > seedX && x <= MAXLEVEL);
  for (const q of chain) {
    const r = foldFn(f, q);
    f = r.f ? r.f : r;
    const T = TILE[q];
    const mass = massOf(f), mean = meanOf(f);
    assertNear(`${label} seed${seedX} @${q} mass`, mass, 1, 1e-9);
    assertNear(`${label} seed${seedX} @${q} mean = W/D`, mean, T.mbar, 1e-6 * T.mbar);
    out[q] = { f: Float64Array.from(f), gmax: maxAtCount1(f, T.D), gmaxI: maxAtCount1Interp(f, T.D), mass, mean };
    out[q].delta = out[q].gmax / T.g2null;
  }
  return out;
}

const M1SEED13 = iterate(13, foldM1, 'M1');
const M2SEED13 = iterate(13, foldM2, 'M2');
console.log('   x |  truth G2 | delta truth | M1 gmax | delta M1 | M2 gmax | delta M2 | M1 - M2 | M2 - truth');
for (const x of LEVELS) {
  if (x <= 13 || x > MAXLEVEL) continue;
  const T = TILE[x], a = M1SEED13[x], b = M2SEED13[x];
  console.log(`  ${R(x, 2)} | ${R(LADDER[x], 9)} | ${R(F(T.delta, 4), 11)} | ${R(a.gmax, 7)} | ${R(F(a.delta, 4), 8)} | ${R(b.gmax, 7)} | ${R(F(b.delta, 4), 8)} | ${R(F(a.delta - b.delta, 4), 7)} | ${R(F(b.delta - T.delta, 4), 10)}`);
}

sub('4b. Seed sensitivity: M2 iterated from each of T_13, T_17, T_19, T_23.');
const M2BY = { 13: M2SEED13 };
for (const s of [17, 19, 23]) if (s < MAXLEVEL) M2BY[s] = iterate(s, foldM2, 'M2');
console.log('   x | delta truth | seed 13 | seed 17 | seed 19 | seed 23 | spread across seeds');
for (const x of LEVELS) {
  if (x <= 13 || x > MAXLEVEL) continue;
  const vals = [];
  const row = [13, 17, 19, 23].map(s => {
    if (!M2BY[s] || !M2BY[s][x]) return '   .   ';
    vals.push(M2BY[s][x].delta); return R(F(M2BY[s][x].delta, 4), 7);
  });
  const sp = vals.length > 1 ? Math.max(...vals) - Math.min(...vals) : NaN;
  console.log(`  ${R(x, 2)} | ${R(F(TILE[x].delta, 4), 11)} | ${row.join(' | ')} | ${R(F(sp, 4), 19)}`);
}
console.log('\n  The spread across seeds is the model\'s own dispersion in delta, and it is the');
console.log('  number the falsifier in section 1c is read against, together with the one-bin');
console.log('  resolution of the count-1 threshold (6 units, i.e. 6/(mbar lnD) in delta).');

// ------------------------------------------------------------------------
rule('5. ONE FOLD AT A TIME FROM THE TRUE PREVIOUS HISTOGRAM, AND THE SPLIT');
// ------------------------------------------------------------------------
console.log('  Iterating from T_13 accumulates the model error over five folds. Here each fold');
console.log('  starts from the TRUE previous histogram, so the residual is one fold\'s worth.');
console.log('  The three-way split at each fold, in gmax and in delta:');
console.log('    M1 -> M2   is what the qualifying-gap constraint buys, at fixed histogram;');
console.log('    M2 -> truth is what the grain\'s own CORRELATION buys, which no');
console.log('               histogram-only model can see.\n');
console.log('  gmax for M1 and M2 is the count-1 threshold read continuously (interpolated in');
console.log('  ln count) so that the split is not quantised to the 6-unit bin; the truth column');
console.log('  is the exact ladder G2, which needs no interpolation.\n');
console.log('   fold | M1 gmax | M2 gmax | true G2 | delta M1 | delta M2 | delta true | constraint share of M1-truth');
const ONESTEP = {};
for (const [xo, q] of OPFOLDS) {
  if (q > MAXLEVEL || !TILE[xo]) continue;
  const h = pmfFromHist(TILE[xo].hist, TILE[xo].D);
  const f1 = foldM1(h, q), f2 = foldM2(h, q).f;
  const T = TILE[q];
  const g1 = maxAtCount1Interp(f1, T.D), g2 = maxAtCount1Interp(f2, T.D);
  const d1 = g1 / T.g2null, d2 = g2 / T.g2null, dt = T.delta;
  const share = (d1 - d2) / (d1 - dt);
  ONESTEP[q] = { f1, f2, g1, g2, d1, d2, dt, share };
  console.log(`  ${R(F(g1, 1), 7)} | ${R(F(g2, 1), 7)} | ${R(LADDER[q], 7)} | ${R(F(d1, 4), 8)} | ${R(F(d2, 4), 8)} | ${R(F(dt, 4), 10)} | ${R(F(100 * share, 1) + ' %', 28)}`.padStart(0) && `  ${R(xo + '->' + q, 6)} | ${R(F(g1, 1), 7)} | ${R(F(g2, 1), 7)} | ${R(LADDER[q], 7)} | ${R(F(d1, 4), 8)} | ${R(F(d2, 4), 8)} | ${R(F(dt, 4), 10)} | ${R(F(100 * share, 1) + ' %', 28)}`);
}

// ------------------------------------------------------------------------
rule('6. TAIL COUNTS ON gap-spectrum-01 GRID: TRUTH, M1, M2, RENEWAL NULL');
// ------------------------------------------------------------------------
console.log('  #{g > t} on the abscissa t/mbar, one fold from the true previous histogram.');
console.log('  The renewal null is D*exp(-t/mbar) (gap-spectrum-01.md section 1, N1).\n');
for (const q of [23, 29, 31]) {
  if (q > MAXLEVEL || !ONESTEP[q]) continue;
  const T = TILE[q], O = ONESTEP[q];
  console.log(`  x = ${q}   (D = ${T.D}, mbar = ${F(T.mbar, 4)}, G2 = ${LADDER[q]})`);
  console.log('   t/mbar |     t |     truth | M1 predicted | M2 predicted | renewal null | M2/truth | M1/truth');
  for (let u = 1; u <= 10; u++) {
    const t = u * T.mbar;
    const trTrue = (() => { let s = 0; for (let k = 1; k < HB; k++) if (6 * k > t) s += T.hist[k]; return s; })();
    const a = tailGT(O.f1, T.D, t), b = tailGT(O.f2, T.D, t), nl = T.D * Math.exp(-u);
    if (trTrue === 0 && b < 1e-3 && a < 1e-3) break;
    console.log(`  ${R(F(u, 2), 7)} | ${R(F(t, 1), 5)} | ${R(trTrue, 9)} | ${R(E(a, 4), 12)} | ${R(E(b, 4), 12)} | ${R(E(nl, 4), 12)} | ${R(trTrue > 0 ? F(b / trTrue, 4) : 'inf', 8)} | ${R(trTrue > 0 ? F(a / trTrue, 4) : 'inf', 8)}`);
  }
  console.log('');
}

// ------------------------------------------------------------------------
rule('6b. THE LOG-TAIL DEFICIT, SPLIT INTO ITS THREE STAGES');
// ------------------------------------------------------------------------
console.log('  At a fixed abscissa t = u*mbar, the whole distance from the renewal null down to');
console.log('  the truth is ln(null/truth). It is split into three consecutive stages:');
console.log('    A  null -> M1     the shape ALREADY carried by the previous level\'s histogram,');
console.log('                      inherited rather than explained by this fold;');
console.log('    B  M1 -> M2       what the qualifying-gap constraint buys at fixed histogram;');
console.log('    C  M2 -> truth    what the grain\'s own correlation buys, invisible to any');
console.log('                      histogram-only model.');
console.log('  Rows are printed only where the truth count is at least 1, so no ratio is infinite.\n');
console.log('   x | u | null #{g>t} | M1 #{g>t} | M2 #{g>t} | truth | ln(null/truth) |  A share |  B share |  C share');
for (const q of [23, 29, 31]) {
  if (q > MAXLEVEL || !ONESTEP[q]) continue;
  const T = TILE[q], O = ONESTEP[q];
  for (let u = 4; u <= 9; u++) {
    const t = u * T.mbar;
    let tr = 0; for (let k = 1; k < HB; k++) if (6 * k > t) tr += T.hist[k];
    if (tr < 1) continue;
    const a = tailGT(O.f1, T.D, t), b = tailGT(O.f2, T.D, t), nl = T.D * Math.exp(-u);
    const tot = Math.log(nl / tr);
    const sA = Math.log(nl / a) / tot, sB = Math.log(a / b) / tot, sC = Math.log(b / tr) / tot;
    console.log(`  ${R(q, 2)} | ${R(u, 1)} | ${R(E(nl, 3), 11)} | ${R(E(a, 3), 9)} | ${R(E(b, 3), 9)} | ${R(tr, 5)} | ${R(F(tot, 3), 14)} | ${R(F(100 * sA, 1) + ' %', 8)} | ${R(F(100 * sB, 1) + ' %', 8)} | ${R(F(100 * sC, 1) + ' %', 8)}`);
  }
}

// ------------------------------------------------------------------------
rule('7. THE PRE-REGISTERED READINGS, SCORED');
// ------------------------------------------------------------------------
const rows = [];
for (const q of [23, 29, 31]) {
  if (q > MAXLEVEL || !M2SEED13[q]) continue;
  rows.push({ q, dt: TILE[q].delta, m1: M1SEED13[q].delta, m2: M2SEED13[q].delta,
              sep: M1SEED13[q].delta - M2SEED13[q].delta, res: M2SEED13[q].delta - TILE[q].delta });
}
console.log('   x | delta truth | delta M1 (R1 band [0.72,0.95]) | delta M2 (R2 band [0.38,0.55]) | M1-M2 (vacuity < 0.05) | M2-truth');
for (const r of rows) {
  console.log(`  ${R(r.q, 2)} | ${R(F(r.dt, 4), 11)} | ${R(F(r.m1, 4) + (r.m1 >= 0.72 && r.m1 <= 0.95 ? '  HELD' : '  MISSED'), 30)} | ${R(F(r.m2, 4) + (r.m2 >= 0.38 && r.m2 <= 0.55 ? '  HELD' : '  MISSED'), 30)} | ${R(F(r.sep, 4) + (r.sep >= 0.05 ? '  informative' : '  VACUOUS'), 22)} | ${R(F(r.res, 4), 9)}`);
}
console.log('\n  R2 falsifier arms: delta M2 ABOVE delta truth means the model predicts a tail');
console.log('  HEAVIER than measured, which is the "classification was wrong" arm as registered.');


// ---------------------------------------------------------------------------
// THE FIRST-ORDER MARKOV WORD (note section 7; added after section 6 named it).
// Count the true grain's adjacent pairs cyclically, normalise to a transition
// matrix, sample a word of the same length from it starting in the true
// marginal, and push THAT through the same exact operator. Zero fitted
// parameters: the matrix is a count, not a fit. The chain's stationary law is
// the true marginal by construction, so the histogram and the pair structure
// are preserved in expectation and everything of order three and above is
// destroyed.
// ---------------------------------------------------------------------------
const MK = 96;                                  // states = gap/6; max is 43 at T_29
function markovWord(g8, D, seed, out) {
  const N = new Float64Array(MK * MK), row = new Float64Array(MK);
  for (let i = 0; i < D; i++) {
    const a = g8[i], b = g8[(i + 1) % D];
    if (a >= MK || b >= MK) throw new Error('MK too small');
    N[a * MK + b] += 1; row[a] += 1;
    if ((i & 0xFFFFFF) === 0) tick(`markov pair count: ${i}/${D}`);
  }
  const cum = new Float64Array(MK * MK);
  for (let a = 0; a < MK; a++) { let c = 0; for (let b = 0; b < MK; b++) { c += N[a * MK + b]; cum[a * MK + b] = row[a] > 0 ? c / row[a] : 1; } }
  const marg = new Float64Array(MK); { let c = 0; for (let a = 0; a < MK; a++) { c += row[a] / D; marg[a] = c; } }
  let s = seed >>> 0;
  const rnd = () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
  const draw = (arr, base) => {                 // binary search in a cumulative row
    const u = rnd(); let lo = 0, hi = MK - 1;
    while (lo < hi) { const m = (lo + hi) >> 1; if (u <= arr[base + m]) hi = m; else lo = m + 1; }
    return lo;
  };
  let a = draw(marg, 0);
  for (let i = 0; i < D; i++) {
    out[i] = a; a = draw(cum, a * MK);
    if ((i & 0xFFFFFF) === 0) tick(`markov sample: ${i}/${D}`);
  }
  return { N, row };
}

// ------------------------------------------------------------------------
rule('8. THE EXACT OPERATOR OVER A FIRST-ORDER MARKOV WORD');
// ------------------------------------------------------------------------
console.log('  Pre-registered in measure-tail-deficit-0829.md section 7a before this section');
console.log('  existed: M-P1 the Markov maximum sits STRICTLY between the true G2 and the');
console.log('  shuffled maximum at all three folds; M-P2 the captured order share');
console.log('  c = (shuffled - markov)/(shuffled - true) has point 40 % and band [10, 80] %,');
console.log('  i.e. maxima 247 in [218,269] (19->23), 316 in [277,344] (23->29), 395 in');
console.log('  [364,418] (29->31); M-P3 a gate, the sampled marginal must reproduce the true');
console.log('  histogram to sampling error and the gap sum must be within 1e-3 relative of W.\n');
console.log('  M-P3 GATES first (the section is not read if either fails):');
console.log('   fold | sum/W - 1 | max |marginal ratio - 1| (true count > 1000) | max |pair ratio - 1| (true pair > 1000)');
const MKW = {};
for (const [xo, q] of [[19, 23], [23, 29], [29, 31]]) {
  if (q > MAXLEVEL || !TILE[xo] || !TILE[xo].word) continue;
  const D = TILE[xo].D;
  const w = new Uint8Array(D);
  const { N, row } = markovWord(TILE[xo].word, D, 0x85EBCA6B ^ (xo * 2654435761), w);
  // gates
  let sum = 0; const mh = new Float64Array(HB);
  for (let i = 0; i < D; i++) { sum += w[i]; mh[w[i]] += 1; }
  const sumRel = (6 * sum) / TILE[xo].W - 1;
  let margWorst = 0;
  for (let k = 1; k < HB; k++) if (TILE[xo].hist[k] > 1000) { const r = Math.abs(mh[k] / TILE[xo].hist[k] - 1); if (r > margWorst) margWorst = r; }
  const Nm = new Float64Array(MK * MK);
  for (let i = 0; i < D; i++) Nm[w[i] * MK + w[(i + 1) % D]] += 1;
  let pairWorst = 0;
  for (let a = 0; a < MK; a++) for (let b = 0; b < MK; b++) if (N[a * MK + b] > 1000) { const r = Math.abs(Nm[a * MK + b] / N[a * MK + b] - 1); if (r > pairWorst) pairWorst = r; }
  console.log(`  ${R(xo + '->' + q, 6)} | ${R(E(sumRel, 3), 9)} | ${R(F(margWorst, 5), 46)} | ${R(F(pairWorst, 5), 39)}`);
  assertTrue(`M-P3 sum gate ${xo}->${q}`, Math.abs(sumRel) < 1e-3, `sum/W - 1 = ${E(sumRel, 3)}`);
  assertTrue(`M-P3 marginal gate ${xo}->${q}`, margWorst < 0.05, `worst marginal ratio ${F(margWorst, 5)}`);
  assertTrue(`M-P3 pair gate ${xo}->${q}`, pairWorst < 0.10, `worst pair ratio ${F(pairWorst, 5)}`);
  const { h, total } = foldHistExact(w, D, q);
  assertEq(`markov ${xo}->${q} operator mass`, total, D * (q - 2));
  let mg = 0; for (let k = 1; k < HB; k++) if (h[k] > 0) mg = k;
  MKW[xo + '->' + q] = { max: 6 * mg, sumRel, margWorst, pairWorst, h };
}
console.log('\n  THE READING. Bracket: true G2 below, the shuffled word above.\n');
console.log('   fold | true G2 | Markov max | shuffled max | M2 count-1 | delta true | delta Markov | delta shuffled | captured order share c');
for (const [xo, q] of [[19, 23], [23, 29], [29, 31]]) {
  const key = xo + '->' + q; if (!MKW[key] || !SHUF[key]) continue;
  const T = TILE[q], mk = MKW[key].max, sh = SHUF[key].mgs, tr = LADDER[q];
  const c = (sh - mk) / (sh - tr);
  console.log(`  ${R(key, 6)} | ${R(tr, 7)} | ${R(mk, 10)} | ${R(sh, 12)} | ${R(SHUF[key].mgm, 10)} | ${R(F(tr / T.g2null, 4), 10)} | ${R(F(mk / T.g2null, 4), 12)} | ${R(F(sh / T.g2null, 4), 14)} | ${R(F(100 * c, 1) + ' %', 22)}`);
}
console.log('\n  The maximum is ONE gap of one realisation and moves by a bin or two between');
console.log('  draws, so the same comparison is repeated on tail COUNTS, which average over');
console.log('  the whole far tail. c_tail = ln(shuffled/markov) / ln(shuffled/truth) at the');
console.log('  abscissa t = u*mbar, on the folded histograms themselves.\n');
console.log('   fold | u | truth #{g>t} | shuffled #{g>t} | markov #{g>t} | ln(shuf/truth) | c_tail');
for (const [xo, q] of [[19, 23], [23, 29], [29, 31]]) {
  const key = xo + '->' + q; if (!MKW[key] || !SHUF[key]) continue;
  const T = TILE[q];
  for (let u = 4; u <= 9; u++) {
    const t = u * T.mbar;
    let tr = 0, sh = 0, mk = 0;
    for (let k = 1; k < HB; k++) if (6 * k > t) { tr += T.hist[k]; sh += SHUF[key].h[k]; mk += MKW[key].h[k]; }
    if (tr < 1 || mk < 1) continue;
    const tot = Math.log(sh / tr), ct = Math.log(sh / mk) / tot;
    console.log(`  ${R(key, 6)} | ${R(u, 1)} | ${R(tr, 12)} | ${R(E(sh, 4), 15)} | ${R(E(mk, 4), 13)} | ${R(F(tot, 4), 14)} | ${R(F(100 * ct, 1) + ' %', 8)}`);
  }
}
console.log('\n  Falsifier arms as registered: c >= 90 % (or the Markov max within one bin of');
console.log('  G2) means first-order correlation carries essentially the whole order effect;');
console.log('  10 % <= c < 90 % means it carries part and higher-order structure is needed;');
console.log('  c < 10 %, or a Markov max at or above the shuffled one, closes this route.');


// ---------------------------------------------------------------------------
// THE SECOND-ORDER MARKOV WORD, AND MULTI-DRAW STATISTICS (note section 9).
// Two things at once. (a) The single maximum is noise-dominated, which red team
// C measured, so every bracket below is a draw MEAN with an sd beside it.
// (b) The word is also built from the true adjacent-TRIPLE counts, so the chain
// state is the ordered pair (g_i, g_{i+1}) and the step is P(g_{i+2} | g_i,
// g_{i+1}). It starts from a true adjacent pair and steps by an observed
// conditional, so it never leaves the set of observed pairs. Zero fitted
// parameters in either: both tables are counts.
// ---------------------------------------------------------------------------
const P2 = MK * MK;
function xorshift(seed) {
  let s = seed >>> 0; if (s === 0) s = 0x9E3779B9;
  return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
}
function bsearch(arr, base, n, u) { let lo = 0, hi = n - 1; while (lo < hi) { const m = (lo + hi) >> 1; if (u <= arr[base + m]) hi = m; else lo = m + 1; } return lo; }

function fit1(g8, D) {                          // first-order table, fitted once per fold
  const N = new Float64Array(P2), row = new Float64Array(MK);
  for (let i = 0; i < D; i++) { const a = g8[i], b = g8[(i + 1) % D]; N[a * MK + b] += 1; row[a] += 1; }
  const cum = new Float64Array(P2);
  for (let a = 0; a < MK; a++) { let c = 0; for (let b = 0; b < MK; b++) { c += N[a * MK + b]; cum[a * MK + b] = row[a] > 0 ? c / row[a] : 1; } }
  const marg = new Float64Array(MK); { let c = 0; for (let a = 0; a < MK; a++) { c += row[a] / D; marg[a] = c; } }
  return { N, cum, marg };
}
function fit2(g8, D) {                          // second-order table, fitted once per fold
  const cnt = new Float64Array(P2 * MK), pair = new Float64Array(P2);
  for (let i = 0; i < D; i++) {
    const a = g8[i], b = g8[(i + 1) % D], c = g8[(i + 2) % D];
    cnt[(a * MK + b) * MK + c] += 1; pair[a * MK + b] += 1;
    if ((i & 0xFFFFFF) === 0) tick(`fit2 triple count: ${i}/${D}`);
  }
  const cum = new Float64Array(P2 * MK);
  for (let s2 = 0; s2 < P2; s2++) { const base = s2 * MK; let c = 0; for (let k = 0; k < MK; k++) { c += cnt[base + k]; cum[base + k] = pair[s2] > 0 ? c / pair[s2] : 1; } }
  const pcum = new Float64Array(P2); { let c = 0; for (let s2 = 0; s2 < P2; s2++) { c += pair[s2] / D; pcum[s2] = c; } }
  return { cnt, pair, cum, pcum };
}
function gen1(t1, D, seed, out) {
  const rnd = xorshift(seed);
  let a = bsearch(t1.marg, 0, MK, rnd());
  for (let i = 0; i < D; i++) { out[i] = a; a = bsearch(t1.cum, a * MK, MK, rnd()); }
}
function gen2(t2, D, seed, out) {
  const rnd = xorshift(seed);
  let s2 = bsearch(t2.pcum, 0, P2, rnd());
  let a = (s2 / MK) | 0, b = s2 % MK;
  out[0] = a; out[1] = b;
  for (let i = 2; i < D; i++) {
    const c = bsearch(t2.cum, (a * MK + b) * MK, MK, rnd());
    out[i] = c; a = b; b = c;
  }
}
function maxOfHist(h) { let mg = 0; for (let k = 1; k < HB; k++) if (h[k] > 0) mg = k; return 6 * mg; }
function stats(v) {
  const n = v.length, m = v.reduce((a, b) => a + b, 0) / n;
  const sd = n > 1 ? Math.sqrt(v.reduce((a, b) => a + (b - m) * (b - m), 0) / (n - 1)) : 0;
  return { n, m, sd, lo: Math.min(...v), hi: Math.max(...v) };
}
function pct(v, x) { let below = 0, eq = 0; for (const y of v) { if (y < x) below++; else if (y === x) eq++; } return 100 * (below + 0.5 * eq) / v.length; }
function tailOf(h, D, t, scale) { let s = 0; for (let k = 1; k < HB; k++) if (6 * k > t) s += h[k]; return s / scale; }

const NDRAW = { 23: 40, 29: 20, 31: 10 };
const DRAWS = {};
for (const [xo, q] of [[19, 23], [23, 29], [29, 31]]) {
  if (q > MAXLEVEL || !TILE[xo] || !TILE[xo].word) continue;
  const D = TILE[xo].D, n = NDRAW[q], key = xo + '->' + q;
  const t1 = fit1(TILE[xo].word, D), t2 = fit2(TILE[xo].word, D);
  const w = new Uint8Array(D);
  const rec = {};
  for (const kind of ['shuffled', 'markov1', 'markov2']) {
    const maxima = [], agg = new Float64Array(HB);
    let g = null;
    for (let d = 0; d < n; d++) {
      const seed = (0xC2B2AE35 ^ (xo * 1000003) ^ (d * 2246822519)) >>> 0;
      if (kind === 'shuffled') { w.set(TILE[xo].word); shuffleInPlace(w, D, seed); }
      else if (kind === 'markov1') gen1(t1, D, seed, w);
      else gen2(t2, D, seed, w);
      if (d === 0) {                                     // A-P3 gates, on the first draw
        let sum = 0; const mh = new Float64Array(HB);
        for (let i = 0; i < D; i++) { sum += w[i]; mh[w[i]] += 1; }
        const Nm = new Float64Array(P2), Tm = new Float64Array(P2 * MK);
        for (let i = 0; i < D; i++) { const a = w[i], b = w[(i + 1) % D], c = w[(i + 2) % D]; Nm[a * MK + b] += 1; Tm[(a * MK + b) * MK + c] += 1; }
        let mw = 0, pw = 0, tw = 0;
        for (let k = 1; k < HB; k++) if (TILE[xo].hist[k] > 1000) { const r = Math.abs(mh[k] / TILE[xo].hist[k] - 1); if (r > mw) mw = r; }
        for (let i = 0; i < P2; i++) if (t1.N[i] > 1000) { const r = Math.abs(Nm[i] / t1.N[i] - 1); if (r > pw) pw = r; }
        for (let i = 0; i < P2 * MK; i++) if (t2.cnt[i] > 1000) { const r = Math.abs(Tm[i] / t2.cnt[i] - 1); if (r > tw) tw = r; }
        g = { sumRel: (6 * sum) / TILE[xo].W - 1, mw, pw, tw };
      }
      const h = foldHistExact(w, D, q).h;
      maxima.push(maxOfHist(h));
      for (let k = 0; k < HB; k++) agg[k] += h[k];
      tick(`${key} ${kind}: draw ${d + 1}/${n}`);
    }
    rec[kind] = { maxima, agg, n, gate: g, st: stats(maxima) };
  }
  DRAWS[key] = rec;
}

// ------------------------------------------------------------------------
rule('9. CUSTODY: RED TEAM C\'s SCRATCHPAD FIGURES, RECOMPUTED INSIDE THIS BLOCK');
// ------------------------------------------------------------------------
console.log('  redteam-0829-measure-c.md section 1b reports, from 40 draws at 19->23 with an');
console.log('  independently written sampler: shuffled maximum 296.1 sd 29.1 over [246, 384],');
console.log('  Markov maximum 264.0 sd 18.4 over [234, 324], this note\'s single 276 at the');
console.log('  32.5th percentile of the shuffled law and its 288 at the 90th of the Markov');
console.log('  law, share from the draw means 34.9 %. Nothing in this producer computed any');
console.log('  of that. Below is this producer\'s own 40 draws, differently seeded. The test');
console.log('  registered in note section 9a: agreement to within one sd of each figure.\n');
{
  const key = '19->23', rec = DRAWS[key];
  if (rec) {
    const S = rec.shuffled.st, M = rec.markov1.st, tr = LADDER[23];
    console.log('   word     | draws | mean max | sd     | range        | red team C mean | red team C sd | |diff| in sd');
    const rows = [['shuffled', S, 296.1, 29.1], ['markov1', M, 264.0, 18.4]];
    for (const [nm, st, rm, rs] of rows) {
      const dsd = Math.abs(st.m - rm) / rs;
      console.log(`  ${P(nm, 8)} | ${R(st.n, 5)} | ${R(F(st.m, 1), 8)} | ${R(F(st.sd, 1), 6)} | ${R('[' + st.lo + ', ' + st.hi + ']', 12)} | ${R(F(rm, 1), 15)} | ${R(F(rs, 1), 13)} | ${R(F(dsd, 2), 12)}`);
      assertTrue(`Q-B agreement ${nm}`, dsd <= 1, `|diff| = ${F(dsd, 2)} sd`);
    }
    const sh276 = pct(rec.shuffled.maxima, 276), mk288 = pct(rec.markov1.maxima, 288);
    const share = (S.m - M.m) / (S.m - tr);
    console.log(`\n  percentile of this file's single 276 in this producer's shuffled law: ${F(sh276, 1)}   (red team C: 32.5)`);
    console.log(`  percentile of this file's single 288 in this producer's markov1 law:  ${F(mk288, 1)}   (red team C: 90.0)`);
    console.log(`  share from this producer's two draw means: ${F(100 * share, 1)} %   (red team C: 34.9 %)`);
    console.log(`  registered band for the share is [10, 80] % with point 40: ${share >= 0.10 && share <= 0.80 ? 'INSIDE' : 'OUTSIDE'}`);
    console.log(`  M-P1 on draw means, markov strictly between true ${tr} and shuffled ${F(S.m, 1)}: ${M.m > tr && M.m < S.m ? 'HOLDS' : 'FAILS'}`);
  }
}
console.log('\n  E11, the arithmetic applied-0829-measure-c.md wrote into note section 7a.');
console.log(`  The registered M-P2 point maximum at 29->31 is 395 and mbar*lnD there is ${F(TILE[31] ? TILE[31].g2null : NaN, 3)},`);
console.log(`  so the delta it corresponds to is 395/${F(TILE[31] ? TILE[31].g2null : NaN, 3)} = ${TILE[31] ? F(395 / TILE[31].g2null, 4) : 'n/a'}.`);

// ------------------------------------------------------------------------
rule('10. THE SECOND-ORDER MARKOV WORD');
// ------------------------------------------------------------------------
console.log('  Pre-registered in measure-tail-deficit-0829.md section 9a before this section');
console.log('  existed: A-P1 r = (c2 - c1)/(1 - c1) has point 0.30 and band [0.15, 0.55] at');
console.log('  each fold, so second order carries a MINORITY of what first order left;');
console.log('  A-P2 c2 > c1 at every fold on both statistics; A-P3 the marginal, pair and');
console.log('  TRIPLE counts and the gap sum are gates.\n');
console.log('  A-P3 GATES, on the first draw of each kind:');
console.log('   fold | word     | sum/W - 1 | max |marginal ratio - 1| | max |pair ratio - 1| | max |triple ratio - 1|');
for (const [xo, q] of [[19, 23], [23, 29], [29, 31]]) {
  const key = xo + '->' + q; if (!DRAWS[key]) continue;
  for (const kind of ['shuffled', 'markov1', 'markov2']) {
    const g = DRAWS[key][kind].gate;
    console.log(`  ${R(key, 6)} | ${P(kind, 8)} | ${R(E(g.sumRel, 3), 9)} | ${R(F(g.mw, 5), 24)} | ${R(F(g.pw, 5), 20)} | ${R(F(g.tw, 5), 22)}`);
    if (kind === 'markov2') { assertTrue(`A-P3 triple gate ${key}`, g.tw < 0.15, `worst triple ratio ${F(g.tw, 5)}`); assertTrue(`A-P3 pair gate m2 ${key}`, g.pw < 0.10, `worst pair ratio ${F(g.pw, 5)}`); }
    assertTrue(`A-P3 sum gate ${key} ${kind}`, Math.abs(g.sumRel) < 1e-3, `sum/W - 1 = ${E(g.sumRel, 3)}`);
  }
}
console.log('\n  THE MAXIMUM, as a draw mean with its sd. c1 and c2 are the shares of the');
console.log('  shuffled-to-true bracket carried by first and second order; r is the share of');
console.log('  the FIRST-ORDER RESIDUAL that second order closes.\n');
console.log('   fold | draws | true G2 | shuffled mean (sd) | markov1 mean (sd) | markov2 mean (sd) |    c1 |    c2 |     r | A-P1 | A-P2');
for (const [xo, q] of [[19, 23], [23, 29], [29, 31]]) {
  const key = xo + '->' + q; if (!DRAWS[key]) continue;
  const S = DRAWS[key].shuffled.st, M1 = DRAWS[key].markov1.st, M2s = DRAWS[key].markov2.st, tr = LADDER[q];
  const c1 = (S.m - M1.m) / (S.m - tr), c2 = (S.m - M2s.m) / (S.m - tr), r = (c2 - c1) / (1 - c1);
  console.log(`  ${R(key, 6)} | ${R(S.n, 5)} | ${R(tr, 7)} | ${R(F(S.m, 1) + ' (' + F(S.sd, 1) + ')', 18)} | ${R(F(M1.m, 1) + ' (' + F(M1.sd, 1) + ')', 17)} | ${R(F(M2s.m, 1) + ' (' + F(M2s.sd, 1) + ')', 17)} | ${R(F(100 * c1, 1), 5)} | ${R(F(100 * c2, 1), 5)} | ${R(F(r, 3), 5)} | ${R(r >= 0.15 && r <= 0.55 ? 'HELD' : 'MISSED', 6)} | ${R(c2 > c1 ? 'HELD' : 'MISSED', 6)}`);
}
console.log('\n  THE TAIL-COUNT SHARE, on the histograms AGGREGATED over all draws (so the');
console.log('  counts below are per-draw averages and the statistic is not one realisation).');
console.log('  c_tail = ln(shuffled/word) / ln(shuffled/truth) at t = u*mbar.\n');
console.log('   fold | u | truth #{g>t} | shuffled | markov1 | markov2 | ln(shuf/truth) | c1_tail | c2_tail |     r');
for (const [xo, q] of [[19, 23], [23, 29], [29, 31]]) {
  const key = xo + '->' + q; if (!DRAWS[key]) continue;
  const T = TILE[q], R0 = DRAWS[key];
  for (let u = 5; u <= 9; u++) {
    const t = u * T.mbar;
    let tr = 0; for (let k = 1; k < HB; k++) if (6 * k > t) tr += T.hist[k];
    const sh = tailOf(R0.shuffled.agg, 0, t, R0.shuffled.n);
    const m1 = tailOf(R0.markov1.agg, 0, t, R0.markov1.n);
    const m2 = tailOf(R0.markov2.agg, 0, t, R0.markov2.n);
    if (tr < 1 || m2 < 1 || sh <= tr) continue;
    const tot = Math.log(sh / tr), c1 = Math.log(sh / m1) / tot, c2 = Math.log(sh / m2) / tot;
    console.log(`  ${R(key, 6)} | ${R(u, 1)} | ${R(tr, 12)} | ${R(E(sh, 3), 8)} | ${R(E(m1, 3), 7)} | ${R(E(m2, 3), 7)} | ${R(F(tot, 4), 14)} | ${R(F(100 * c1, 1), 7)} | ${R(F(100 * c2, 1), 7)} | ${R(F((c2 - c1) / (1 - c1), 3), 5)}`);
  }
}
console.log('\n  Falsifier arms as registered: r >= 0.5 at all three folds means second order');
console.log('  carries MOST of the remainder and A-P1 is refuted; 0.05 <= r < 0.5 means it');
console.log('  carries part; r < 0.05 or c2 <= c1 means it carries none.');

console.log(`\n  ASSERTION FAILURES: ${failures}`);
console.log(`  elapsed ${F(el(), 1)} s`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/measure-tail-deficit-0829.js
//   invocation:  node research/measure-tail-deficit-0829.js
//   code-sha256: f315395371306c70d035d787ad856c74dc6a2f92f90676b3fc5139b2a413859f
//   out-sha256:  9693499c58fe9149729633cf31e73a4d843b4534a35855ec6729aebd4c105506
//   body-lines:  345
//   forced:      2026-08-29, 1 of 517 figures in the replaced block not reproduced (first: 110.0)
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     453.4 s
// ============================================================================
//
// ==============================================================================
// THE TAIL-DEFICIT FACTOR FROM ZERO PARAMETERS: CRT-CONSTRAINED THINNING
// ==============================================================================
// Producer for research/history/staging/measure-tail-deficit-0829.md.
// Everything below is label (i): the SIZE distribution of the tile gaps,
// silent about PLACEMENT. No object here is a bound on G2.
//
// ------------------------------------------------------------------------------
// 0. PRE-REGISTRATION, echoed before any measurement is taken.
// ------------------------------------------------------------------------------
//   Registered in measure-tail-deficit-0829.md section 1 before this file existed:
//   R1  M1 (independent thinning, the control): delta point 0.90, band [0.72, 0.95]
//       at @23, @29, @31.
//   R2  M2 (CRT-constrained): delta point 0.45 (@23), 0.44 (@29), 0.44 (@31),
//       band [0.38, 0.55]; and M2 must sit BELOW M1 at every level, widening.
//   R3  M2 cannot reproduce the level-to-level jitter (0.4577 -> 0.4463 -> 0.4791).
//   R4  M2 run one fold from the TRUE previous histogram OVERSHOOTS the true far
//       tail by a factor in [1, 3]; the sign is the registered part.
//   R5  the exact operator on a SHUFFLED true grain must agree with M2 analytic
//       at every bin whose count exceeds 100. A validation, not a prediction.
//   FALSIFIER, dominating: if M1 and M2 agree to within 0.05 in delta at @29 and
//       @31, the constraint carries no information and the test is VACUOUS.
//
//   The measured target, from research/gap-spectrum-01.js OUTPUT null/true:
//     x  = 13     17     19     23     29     31
//     null/true  2.238  2.124  2.193  2.185  2.241  2.087
//     delta      (reciprocals; recomputed exactly below, not transcribed)
//
// ==============================================================================
// 1. CUSTODY A: THE EXACT TILE BY DIRECT SEGMENTED SIEVE
// ==============================================================================
//   Gates, each aborting: slot count = prod(p-2) (A059861), gap count = D,
//   sum of gaps = W exactly, maximum = the exact ladder G2(x#) (G2-STATE section 2).
//   The word is retained at x <= 29 only; T_31 would need 6.2 GB.
//
//    x |            W |            D |    mbar |  G2 | ln D  |  mbar*lnD | delta = G2/(mbar lnD) | secs
//    5 |           30 |            3 | 10.0000 |  12 | 1.099 |    10.986 |                1.0923 |     0.0
//    7 |          210 |           15 | 14.0000 |  30 | 2.708 |    37.913 |                0.7913 |     0.0
//   11 |         2310 |          135 | 17.1111 |  42 | 4.905 |    83.935 |                0.5004 |     0.0
//   13 |        30030 |         1485 | 20.2222 |  66 | 7.303 |   147.686 |                0.4469 |     0.0
//   17 |       510510 |        22275 | 22.9185 | 108 | 10.011 |   229.442 |                0.4707 |     0.0
//   19 |      9699690 |       378675 | 25.6148 | 150 | 12.844 |   329.008 |                0.4559 |     0.0
//   23 |    223092870 |      7952175 | 28.0543 | 204 | 15.889 |   445.754 |                0.4577 |     0.2
//   29 |   6469693230 |    214708725 | 30.1324 | 258 | 19.185 |   578.084 |                0.4463 |     3.0
//   31 | 200560490130 |   6226553025 | 32.2105 | 348 | 22.552 |   726.414 |                0.4791 |   117.2
//
//   Total sieve time 120.5 s. delta is the reciprocal of gap-spectrum-01's
//   null/true column and is recomputed here from W, D and the ladder, not transcribed.
//
// ==============================================================================
// 2. CUSTODY B: THE EXACT TRANSFER OPERATOR AGAINST THE SIEVE
// ==============================================================================
//   U-FRAME section 11 / a3-09: the new histogram is a function of the old grain
//   WORD and q and of nothing else. Two independent engines must agree bin for bin.
//
//    fold | bins compared | bins disagreeing | max |diff| | total = D(q-2) | max gap
//   13->17 |          4096 |                0 |         0 |          exact |     108  (longest run L = 2)
//   17->19 |          4096 |                0 |         0 |          exact |     150  (longest run L = 2)
//   19->23 |          4096 |                0 |         0 |          exact |     204  (longest run L = 3)
//   23->29 |          4096 |                0 |         0 |          exact |     258  (longest run L = 2)
//   29->31 |          4096 |                0 |         0 |          exact |     348  (longest run L = 4)
//
//   The operator is PROVEN (U-FRAME section 11) and is used here as an exact
//   simulator and a custody check, never as a prediction.
//
// ==============================================================================
// 3. R5: THE MODEL M2 AGAINST A SHUFFLED-GRAIN REALISATION OF ITSELF
// ==============================================================================
//   A shuffled true grain has the same histogram and no correlation, so the EXACT
//   operator applied to it is one Monte Carlo draw of exactly what M2 computes in
//   closed form. Disagreement at large counts means M2 is implemented wrongly and
//   nothing after this section may be read.
//
//    fold | bins with count > 100 | max |M2/shuffle - 1| | max Poisson z | max gap shuffle | max gap M2 | max gap true
//   19->23 |                    31 |              0.15309 |        2.713 |             276 |        264 |          204
//   23->29 |                    42 |              0.15735 |        2.670 |             354 |        318 |          258
//   29->31 |                    57 |              0.09408 |        2.107 |             426 |        432 |          348
//
// ==============================================================================
// 4. THE TWO MODELS ITERATED FROM THE EXACT T_13 HISTOGRAM
// ==============================================================================
//   Seed: the exact T_13 gap histogram. No parameter is touched at any fold.
//   delta_model = (largest d whose predicted count at or above d is at least 1)
//               / (mbar * ln D), the SAME convention that returns the true G2 when
//   applied to the true histogram (checked in the "truth" column).
//
//    x |  truth G2 | delta truth | M1 gmax | delta M1 | M2 gmax | delta M2 | M1 - M2 | M2 - truth
//   17 |       108 |      0.4707 |     144 |   0.6276 |     138 |   0.6015 |  0.0262 |     0.1308
//   19 |       150 |      0.4559 |     222 |   0.6748 |     204 |   0.6200 |  0.0547 |     0.1641
//   23 |       204 |      0.4577 |     318 |   0.7134 |     288 |   0.6461 |  0.0673 |     0.1884
//   29 |       258 |      0.4463 |     426 |   0.7369 |     390 |   0.6746 |  0.0623 |     0.2283
//   31 |       348 |      0.4791 |     552 |   0.7599 |     510 |   0.7021 |  0.0578 |     0.2230
//
// ------------------------------------------------------------------------------
// 4b. Seed sensitivity: M2 iterated from each of T_13, T_17, T_19, T_23.
// ------------------------------------------------------------------------------
//    x | delta truth | seed 13 | seed 17 | seed 19 | seed 23 | spread across seeds
//   17 |      0.4707 |  0.6015 |    .    |    .    |    .    |                 n/a
//   19 |      0.4559 |  0.6200 |  0.6018 |    .    |    .    |              0.0182
//   23 |      0.4577 |  0.6461 |  0.6461 |  0.6461 |    .    |              0.0000
//   29 |      0.4463 |  0.6746 |  0.6643 |  0.6643 |  0.5709 |              0.1038
//   31 |      0.4791 |  0.7021 |  0.6938 |  0.6938 |  0.6608 |              0.0413
//
//   The spread across seeds is the model's own dispersion in delta, and it is the
//   number the falsifier in section 1c is read against, together with the one-bin
//   resolution of the count-1 threshold (6 units, i.e. 6/(mbar lnD) in delta).
//
// ==============================================================================
// 5. ONE FOLD AT A TIME FROM THE TRUE PREVIOUS HISTOGRAM, AND THE SPLIT
// ==============================================================================
//   Iterating from T_13 accumulates the model error over five folds. Here each fold
//   starts from the TRUE previous histogram, so the residual is one fold's worth.
//   The three-way split at each fold, in gmax and in delta:
//     M1 -> M2   is what the qualifying-gap constraint buys, at fixed histogram;
//     M2 -> truth is what the grain's own CORRELATION buys, which no
//                histogram-only model can see.
//
//   gmax for M1 and M2 is the count-1 threshold read continuously (interpolated in
//   ln count) so that the split is not quantised to the 6-unit bin; the truth column
//   is the exact ladder G2, which needs no interpolation.
//
//    fold | M1 gmax | M2 gmax | true G2 | delta M1 | delta M2 | delta true | constraint share of M1-truth
//   13->17 |   146.1 |   142.0 |     108 |   0.6367 |   0.6188 |     0.4707 |                       10.8 %
//   17->19 |   215.8 |   198.8 |     150 |   0.6560 |   0.6042 |     0.4559 |                       25.9 %
//   19->23 |   293.7 |   290.3 |     204 |   0.6589 |   0.6512 |     0.4577 |                        3.8 %
//   23->29 |   377.2 |   335.8 |     258 |   0.6525 |   0.5809 |     0.4463 |                       34.7 %
//   29->31 |   473.9 |   457.2 |     348 |   0.6524 |   0.6294 |     0.4791 |                       13.3 %
//
// ==============================================================================
// 6. TAIL COUNTS ON gap-spectrum-01 GRID: TRUTH, M1, M2, RENEWAL NULL
// ==============================================================================
//   #{g > t} on the abscissa t/mbar, one fold from the true previous histogram.
//   The renewal null is D*exp(-t/mbar) (gap-spectrum-01.md section 1, N1).
//
//   x = 23   (D = 7952175, mbar = 28.0543, G2 = 204)
//    t/mbar |     t |     truth | M1 predicted | M2 predicted | renewal null | M2/truth | M1/truth
//      1.00 |  28.1 |   3785324 |    3.7309e+6 |    3.7492e+6 |    2.9254e+6 |   0.9905 |   0.9856
//      2.00 |  56.1 |    745674 |    7.4356e+5 |    7.2877e+5 |    1.0762e+6 |   0.9773 |   0.9972
//      3.00 |  84.2 |    130618 |    1.3967e+5 |    1.3190e+5 |    3.9592e+5 |   1.0098 |   1.0693
//      4.00 | 112.2 |     23230 |    2.9742e+4 |    2.5373e+4 |    1.4565e+5 |   1.0923 |   1.2803
//      5.00 | 140.3 |      2358 |    5.4548e+3 |    3.9961e+3 |    5.3581e+4 |   1.6947 |   2.3133
//      6.00 | 168.3 |       152 |    9.9187e+2 |    7.1133e+2 |    1.9711e+4 |   4.6798 |   6.5254
//      7.00 | 196.4 |         6 |    2.5921e+2 |    1.8386e+2 |    7.2514e+3 |  30.6441 |  43.2024
//      8.00 | 224.4 |         0 |    4.5967e+1 |    3.5750e+1 |    2.6677e+3 |      inf |      inf
//      9.00 | 252.5 |         0 |    8.0958e+0 |    6.7474e+0 |    9.8138e+2 |      inf |      inf
//     10.00 | 280.5 |         0 |    1.9639e+0 |    1.5567e+0 |    3.6103e+2 |      inf |      inf
//
//   x = 29   (D = 214708725, mbar = 30.1324, G2 = 258)
//    t/mbar |     t |     truth | M1 predicted | M2 predicted | renewal null | M2/truth | M1/truth
//      1.00 |  30.1 |  69421588 |    6.9436e+7 |    6.9812e+7 |    7.8987e+7 |   1.0056 |   1.0002
//      2.00 |  60.3 |  17692114 |    1.7839e+7 |    1.7474e+7 |    2.9058e+7 |   0.9877 |   1.0083
//      3.00 |  90.4 |   3661622 |    3.9180e+6 |    3.7990e+6 |    1.0690e+7 |   1.0375 |   1.0700
//      4.00 | 120.5 |    812930 |    8.6796e+5 |    8.2215e+5 |    3.9325e+6 |   1.0113 |   1.0677
//      5.00 | 150.7 |     88988 |    1.4946e+5 |    1.3135e+5 |    1.4467e+6 |   1.4760 |   1.6795
//      6.00 | 180.8 |      6758 |    2.9122e+4 |    2.2146e+4 |    5.3221e+5 |   3.2770 |   4.3093
//      7.00 | 210.9 |       166 |    6.0433e+3 |    3.9172e+3 |    1.9579e+5 |  23.5977 |  36.4053
//      8.00 | 241.1 |         2 |    1.2352e+3 |    6.1741e+2 |    7.2027e+4 | 308.7045 | 617.6171
//      9.00 | 271.2 |         0 |    2.4305e+2 |    8.3363e+1 |    2.6497e+4 |      inf |      inf
//     10.00 | 301.3 |         0 |    4.7215e+1 |    9.6106e+0 |    9.7478e+3 |      inf |      inf
//
//   x = 31   (D = 6226553025, mbar = 32.2105, G2 = 348)
//    t/mbar |     t |     truth | M1 predicted | M2 predicted | renewal null | M2/truth | M1/truth
//      1.00 |  32.2 | 2219321470 |    2.2185e+9 |    2.2283e+9 |    2.2906e+9 |   1.0040 |   0.9996
//      2.00 |  64.4 | 636577674 |    6.4239e+8 |    6.3273e+8 |    8.4267e+8 |   0.9940 |   1.0091
//      3.00 |  96.6 | 119983472 |    1.2420e+8 |    1.2161e+8 |    3.1000e+8 |   1.0135 |   1.0351
//      4.00 | 128.8 |  31805298 |    3.2703e+7 |    3.1600e+7 |    1.1404e+8 |   0.9936 |   1.0282
//      5.00 | 161.1 |   4438018 |    6.3548e+6 |    5.9108e+6 |    4.1954e+7 |   1.3318 |   1.4319
//      6.00 | 193.3 |    266574 |    1.0005e+6 |    8.4108e+5 |    1.5434e+7 |   3.1552 |   3.7531
//      7.00 | 225.5 |     20388 |    2.2652e+5 |    1.8083e+5 |    5.6779e+6 |   8.8695 |  11.1103
//      8.00 | 257.7 |      2126 |    5.2132e+4 |    3.8705e+4 |    2.0888e+6 |  18.2057 |  24.5211
//      9.00 | 289.9 |       218 |    8.2830e+3 |    5.4522e+3 |    7.6842e+5 |  25.0102 |  37.9955
//     10.00 | 322.1 |        38 |    1.8324e+3 |    1.1242e+3 |    2.8269e+5 |  29.5839 |  48.2207
//
//
// ==============================================================================
// 6b. THE LOG-TAIL DEFICIT, SPLIT INTO ITS THREE STAGES
// ==============================================================================
//   At a fixed abscissa t = u*mbar, the whole distance from the renewal null down to
//   the truth is ln(null/truth). It is split into three consecutive stages:
//     A  null -> M1     the shape ALREADY carried by the previous level's histogram,
//                       inherited rather than explained by this fold;
//     B  M1 -> M2       what the qualifying-gap constraint buys at fixed histogram;
//     C  M2 -> truth    what the grain's own correlation buys, invisible to any
//                       histogram-only model.
//   Rows are printed only where the truth count is at least 1, so no ratio is infinite.
//
//    x | u | null #{g>t} | M1 #{g>t} | M2 #{g>t} | truth | ln(null/truth) |  A share |  B share |  C share
//   23 | 4 |    1.456e+5 |  2.974e+4 |  2.537e+4 | 23230 |          1.836 |   86.5 % |    8.7 % |    4.8 %
//   23 | 5 |    5.358e+4 |  5.455e+3 |  3.996e+3 |  2358 |          3.123 |   73.1 % |   10.0 % |   16.9 %
//   23 | 6 |    1.971e+4 |  9.919e+2 |  7.113e+2 |   152 |          4.865 |   61.4 % |    6.8 % |   31.7 %
//   23 | 7 |    7.251e+3 |  2.592e+2 |  1.839e+2 |     6 |          7.097 |   46.9 % |    4.8 % |   48.2 %
//   29 | 4 |    3.933e+6 |  8.680e+5 |  8.222e+5 | 812930 |          1.576 |   95.8 % |    3.4 % |    0.7 %
//   29 | 5 |    1.447e+6 |  1.495e+5 |  1.313e+5 | 88988 |          2.789 |   81.4 % |    4.6 % |   14.0 %
//   29 | 6 |    5.322e+5 |  2.912e+4 |  2.215e+4 |  6758 |          4.366 |   66.5 % |    6.3 % |   27.2 %
//   29 | 7 |    1.958e+5 |  6.043e+3 |  3.917e+3 |   166 |          7.073 |   49.2 % |    6.1 % |   44.7 %
//   29 | 8 |    7.203e+4 |  1.235e+3 |  6.174e+2 |     2 |         10.492 |   38.8 % |    6.6 % |   54.6 %
//   31 | 4 |    1.140e+8 |  3.270e+7 |  3.160e+7 | 31805298 |          1.277 |   97.8 % |    2.7 % |   -0.5 %
//   31 | 5 |    4.195e+7 |  6.355e+6 |  5.911e+6 | 4438018 |          2.246 |   84.0 % |    3.2 % |   12.8 %
//   31 | 6 |    1.543e+7 |  1.000e+6 |  8.411e+5 | 266574 |          4.059 |   67.4 % |    4.3 % |   28.3 %
//   31 | 7 |    5.678e+6 |  2.265e+5 |  1.808e+5 | 20388 |          5.629 |   57.2 % |    4.0 % |   38.8 %
//   31 | 8 |    2.089e+6 |  5.213e+4 |  3.871e+4 |  2126 |          6.890 |   53.6 % |    4.3 % |   42.1 %
//   31 | 9 |    7.684e+5 |  8.283e+3 |  5.452e+3 |   218 |          8.168 |   55.5 % |    5.1 % |   39.4 %
//
// ==============================================================================
// 7. THE PRE-REGISTERED READINGS, SCORED
// ==============================================================================
//    x | delta truth | delta M1 (R1 band [0.72,0.95]) | delta M2 (R2 band [0.38,0.55]) | M1-M2 (vacuity < 0.05) | M2-truth
//   23 |      0.4577 |                 0.7134  MISSED |                 0.6461  MISSED |    0.0673  informative |    0.1884
//   29 |      0.4463 |                   0.7369  HELD |                 0.6746  MISSED |    0.0623  informative |    0.2283
//   31 |      0.4791 |                   0.7599  HELD |                 0.7021  MISSED |    0.0578  informative |    0.2230
//
//   R2 falsifier arms: delta M2 ABOVE delta truth means the model predicts a tail
//   HEAVIER than measured, which is the "classification was wrong" arm as registered.
//
// ==============================================================================
// 8. THE EXACT OPERATOR OVER A FIRST-ORDER MARKOV WORD
// ==============================================================================
//   Pre-registered in measure-tail-deficit-0829.md section 7a before this section
//   existed: M-P1 the Markov maximum sits STRICTLY between the true G2 and the
//   shuffled maximum at all three folds; M-P2 the captured order share
//   c = (shuffled - markov)/(shuffled - true) has point 40 % and band [10, 80] %,
//   i.e. maxima 247 in [218,269] (19->23), 316 in [277,344] (23->29), 395 in
//   [364,418] (29->31); M-P3 a gate, the sampled marginal must reproduce the true
//   histogram to sampling error and the gap sum must be within 1e-3 relative of W.
//
//   M-P3 GATES first (the section is not read if either fails):
//    fold | sum/W - 1 | max |marginal ratio - 1| (true count > 1000) | max |pair ratio - 1| (true pair > 1000)
//   19->23 |  7.318e-4 |                                        0.01626 |                                 0.04241
//   23->29 |  3.270e-4 |                                        0.02290 |                                 0.05745
//   29->31 | -2.822e-5 |                                        0.01801 |                                 0.06777
//
//   THE READING. Bracket: true G2 below, the shuffled word above.
//
//    fold | true G2 | Markov max | shuffled max | M2 count-1 | delta true | delta Markov | delta shuffled | captured order share c
//   19->23 |     204 |        288 |          276 |        264 |     0.4577 |       0.6461 |         0.6192 |                -16.7 %
//   23->29 |     258 |        294 |          354 |        318 |     0.4463 |       0.5086 |         0.6124 |                 62.5 %
//   29->31 |     348 |        390 |          426 |        432 |     0.4791 |       0.5369 |         0.5864 |                 46.2 %
//
//   The maximum is ONE gap of one realisation and moves by a bin or two between
//   draws, so the same comparison is repeated on tail COUNTS, which average over
//   the whole far tail. c_tail = ln(shuffled/markov) / ln(shuffled/truth) at the
//   abscissa t = u*mbar, on the folded histograms themselves.
//
//    fold | u | truth #{g>t} | shuffled #{g>t} | markov #{g>t} | ln(shuf/truth) | c_tail
//   19->23 | 4 |        23230 |       2.5242e+4 |     2.4016e+4 |         0.0831 |   59.9 %
//   19->23 | 5 |         2358 |       3.9200e+3 |     2.7480e+3 |         0.5083 |   69.9 %
//   19->23 | 6 |          152 |       7.2600e+2 |     3.8200e+2 |         1.5637 |   41.1 %
//   19->23 | 7 |            6 |       1.8400e+2 |     7.1000e+1 |         3.4232 |   27.8 %
//   23->29 | 4 |       812930 |       8.2287e+5 |     8.1371e+5 |         0.0122 |   92.1 %
//   23->29 | 5 |        88988 |       1.3155e+5 |     9.2178e+4 |         0.3908 |   91.0 %
//   23->29 | 6 |         6758 |       2.2342e+4 |     8.1450e+3 |         1.1957 |   84.4 %
//   23->29 | 7 |          166 |       3.9630e+3 |     6.6700e+2 |         3.1728 |   56.2 %
//   23->29 | 8 |            2 |       7.0600e+2 |     9.3000e+1 |         5.8665 |   34.6 %
//   29->31 | 4 |     31805298 |       3.1599e+7 |     3.1536e+7 |        -0.0065 |  -30.8 %
//   29->31 | 5 |      4438018 |       5.9130e+6 |     4.4953e+6 |         0.2870 |   95.5 %
//   29->31 | 6 |       266574 |       8.4195e+5 |     3.1721e+5 |         1.1501 |   84.9 %
//   29->31 | 7 |        20388 |       1.8114e+5 |     3.7218e+4 |         2.1843 |   72.4 %
//   29->31 | 8 |         2126 |       3.8705e+4 |     6.3580e+3 |         2.9017 |   62.2 %
//   29->31 | 9 |          218 |       5.5310e+3 |     7.4500e+2 |         3.2336 |   62.0 %
//
//   Falsifier arms as registered: c >= 90 % (or the Markov max within one bin of
//   G2) means first-order correlation carries essentially the whole order effect;
//   10 % <= c < 90 % means it carries part and higher-order structure is needed;
//   c < 10 %, or a Markov max at or above the shuffled one, closes this route.
//
// ==============================================================================
// 9. CUSTODY: RED TEAM C's SCRATCHPAD FIGURES, RECOMPUTED INSIDE THIS BLOCK
// ==============================================================================
//   redteam-0829-measure-c.md section 1b reports, from 40 draws at 19->23 with an
//   independently written sampler: shuffled maximum 296.1 sd 29.1 over [246, 384],
//   Markov maximum 264.0 sd 18.4 over [234, 324], this note's single 276 at the
//   32.5th percentile of the shuffled law and its 288 at the 90th of the Markov
//   law, share from the draw means 34.9 %. Nothing in this producer computed any
//   of that. Below is this producer's own 40 draws, differently seeded. The test
//   registered in note section 9a: agreement to within one sd of each figure.
//
//    word     | draws | mean max | sd     | range        | red team C mean | red team C sd | |diff| in sd
//   shuffled |    40 |    292.5 |   22.5 |   [258, 354] |           296.1 |          29.1 |         0.12
//   markov1  |    40 |    263.1 |   17.4 |   [228, 312] |           264.0 |          18.4 |         0.05
//
//   percentile of this file's single 276 in this producer's shuffled law: 30.0   (red team C: 32.5)
//   percentile of this file's single 288 in this producer's markov1 law:  87.5   (red team C: 90.0)
//   share from this producer's two draw means: 33.2 %   (red team C: 34.9 %)
//   registered band for the share is [10, 80] % with point 40: INSIDE
//   M-P1 on draw means, markov strictly between true 204 and shuffled 292.5: HOLDS
//
//   E11, the arithmetic applied-0829-measure-c.md wrote into note section 7a.
//   The registered M-P2 point maximum at 29->31 is 395 and mbar*lnD there is 726.414,
//   so the delta it corresponds to is 395/726.414 = 0.5438.
//
// ==============================================================================
// 10. THE SECOND-ORDER MARKOV WORD
// ==============================================================================
//   Pre-registered in measure-tail-deficit-0829.md section 9a before this section
//   existed: A-P1 r = (c2 - c1)/(1 - c1) has point 0.30 and band [0.15, 0.55] at
//   each fold, so second order carries a MINORITY of what first order left;
//   A-P2 c2 > c1 at every fold on both statistics; A-P3 the marginal, pair and
//   TRIPLE counts and the gap sum are gates.
//
//   A-P3 GATES, on the first draw of each kind:
//    fold | word     | sum/W - 1 | max |marginal ratio - 1| | max |pair ratio - 1| | max |triple ratio - 1|
//   19->23 | shuffled |  0.000e+0 |                  0.00000 |              1.61370 |                0.97866
//   19->23 | markov1  |  9.081e-4 |                  0.04122 |              0.05314 |                0.95431
//   19->23 | markov2  |  8.425e-4 |                  0.04935 |              0.05611 |                0.06942
//   23->29 | shuffled |  0.000e+0 |                  0.00000 |              2.93189 |                4.26068
//   23->29 | markov1  |  2.381e-4 |                  0.02429 |              0.06816 |                2.16383
//   23->29 | markov2  |  2.215e-4 |                  0.02372 |              0.05491 |                0.07043
//   29->31 | shuffled |  0.000e+0 |                  0.00000 |             16.83270 |               11.76346
//   29->31 | markov1  | -1.638e-5 |                  0.03644 |              0.06801 |               16.22297
//   29->31 | markov2  | -1.963e-5 |                  0.04661 |              0.07143 |                0.07350
//
//   THE MAXIMUM, as a draw mean with its sd. c1 and c2 are the shares of the
//   shuffled-to-true bracket carried by first and second order; r is the share of
//   the FIRST-ORDER RESIDUAL that second order closes.
//
//    fold | draws | true G2 | shuffled mean (sd) | markov1 mean (sd) | markov2 mean (sd) |    c1 |    c2 |     r | A-P1 | A-P2
//   19->23 |    40 |     204 |       292.5 (22.5) |      263.1 (17.4) |       205.7 (4.5) |  33.2 |  98.1 | 0.972 | MISSED |   HELD
//   23->29 |    20 |     258 |       341.4 (18.1) |       302.1 (9.2) |       255.3 (6.6) |  47.1 | 103.2 | 1.061 | MISSED |   HELD
//   29->31 |    10 |     348 |       469.2 (23.8) |      426.6 (20.7) |       348.0 (0.0) |  35.1 | 100.0 | 1.000 | MISSED |   HELD
//
//   THE TAIL-COUNT SHARE, on the histograms AGGREGATED over all draws (so the
//   counts below are per-draw averages and the statistic is not one realisation).
//   c_tail = ln(shuffled/word) / ln(shuffled/truth) at t = u*mbar.
//
//    fold | u | truth #{g>t} | shuffled | markov1 | markov2 | ln(shuf/truth) | c1_tail | c2_tail |     r
//   19->23 | 5 |         2358 | 4.013e+3 | 2.756e+3 | 2.348e+3 |         0.5317 |    70.7 |   100.8 | 1.026
//   19->23 | 6 |          152 | 7.079e+2 | 3.595e+2 | 1.660e+2 |         1.5384 |    44.0 |    94.3 | 0.897
//   19->23 | 7 |            6 | 1.851e+2 | 6.125e+1 | 6.575e+0 |         3.4291 |    32.3 |    97.3 | 0.961
//   23->29 | 5 |        88988 | 1.313e+5 | 9.169e+4 | 8.926e+4 |         0.3890 |    92.3 |    99.2 | 0.896
//   23->29 | 6 |         6758 | 2.214e+4 | 8.137e+3 | 6.713e+3 |         1.1867 |    84.4 |   100.6 | 1.036
//   23->29 | 7 |          166 | 3.917e+3 | 6.730e+2 | 1.648e+2 |         3.1610 |    55.7 |   100.2 | 1.005
//   23->29 | 8 |            2 | 6.183e+2 | 8.725e+1 | 2.250e+0 |         5.7337 |    34.2 |    97.9 | 0.969
//   29->31 | 5 |      4438018 | 5.911e+6 | 4.505e+6 | 4.442e+6 |         0.2865 |    94.8 |    99.7 | 0.946
//   29->31 | 6 |       266574 | 8.409e+5 | 3.158e+5 | 2.669e+5 |         1.1488 |    85.3 |    99.9 | 0.993
//   29->31 | 7 |        20388 | 1.807e+5 | 3.707e+4 | 2.027e+4 |         2.1817 |    72.6 |   100.3 | 1.010
//   29->31 | 8 |         2126 | 3.881e+4 | 6.448e+3 | 2.119e+3 |         2.9045 |    61.8 |   100.1 | 1.003
//   29->31 | 9 |          218 | 5.478e+3 | 7.713e+2 | 2.002e+2 |         3.2239 |    60.8 |   102.6 | 1.067
//
//   Falsifier arms as registered: r >= 0.5 at all three folds means second order
//   carries MOST of the remainder and A-P1 is refuted; 0.05 <= r < 0.5 means it
//   carries part; r < 0.05 or c2 <= c1 means it carries none.
//
//   ASSERTION FAILURES: 0
//   elapsed 453.3 s
// ============================================================================
// READINGS
// ==============================================================================
//
//  1. [VERIFIED] CUSTODY HOLDS ON BOTH ENGINES AND AT EVERY LEVEL. The direct
//     segmented sieve returns the slot count prod(p-2), the gap count D, the
//     gap sum W and the maximum equal to the exact ladder G2 at all nine
//     levels, and the exact transfer operator run on that same grain
//     reproduces the sieve's histogram BIN FOR BIN at five folds, 0 of 4096
//     bins disagreeing at every one including 29->31, with the mass identity
//     total = D(q-2) exact. ASSERTION FAILURES: 0. The deficit factor
//     recomputed from W, D and the ladder reads 0.4469, 0.4707, 0.4559,
//     0.4577, 0.4463, 0.4791 at x = 13..31, which are the reciprocals of
//     gap-spectrum-01's null/true column and are the target of this file.
//
//  2. [VERIFIED] THE MODEL IS IMPLEMENTED CORRECTLY, SO ITS FAILURE IS ITS
//     OWN. R5 held: the exact operator applied to a SHUFFLED true grain, which
//     is one Monte Carlo draw of exactly what M2 computes in closed form,
//     agrees with M2 to a maximum Poisson z of 2.713, 2.670 and 2.107 over
//     31, 42 and 57 bins carrying counts above 100. The mass and first-moment
//     gates on every model fold passed with no failure, so the model histogram
//     carries mass 1 and mean W/D at every level by computation.
//
//  3. [MEASURED] THE REGISTERED "HEAVIER THAN MEASURED" ARM FIRES AT EVERY
//     LEVEL. M2 iterated from the exact T_13 histogram reads delta 0.6461
//     (@23), 0.6746 (@29) and 0.7021 (@31) against the measured 0.4577,
//     0.4463 and 0.4791. R2's registered band [0.38, 0.55] is MISSED at all
//     three, and the miss is in the direction of a HEAVIER tail: M2 - truth
//     reads 0.1884, 0.2283 and 0.2230. The zero-parameter CRT-constrained
//     thinning does not reproduce the tail deficit.
//
//  4. [MEASURED] THE CONTROL BEHAVED AS REGISTERED. R1 held at @29 and @31,
//     M1 reading 0.7369 and 0.7599 inside the registered [0.72, 0.95], and
//     missed low at @23 at 0.7134. So the unconstrained thinning does sit near
//     the geometric fixed point the null law predicts, and the seed does pull
//     it down, as R1 said it would.
//
//  5. [MEASURED] THE CONSTRAINT IS INFORMATIVE AND SMALL. M1 - M2 reads
//     0.0673, 0.0623 and 0.0578 at @23, @29 and @31, above the 0.05 vacuity
//     threshold at all three, so the dominating falsifier does NOT fire and the
//     comparison is not vacuous. One fold at a time from the true previous
//     histogram the constraint's share of the M1-to-truth distance in delta
//     reads 10.8, 25.9, 3.8, 34.7 and 13.3 percent across the five folds, a
//     column with no trend and a spread of a factor 9.
//
//  6. [MEASURED] THE LOG-TAIL SPLIT LOCATES THE DEFICIT, AND IT IS NOT IN THE
//     CONSTRAINT. At the deepest abscissa each level resolves, the
//     qualifying-gap constraint carries B share 4.8 percent (@23, u = 7), 6.6
//     percent (@29, u = 8) and 5.1 percent (@31, u = 9) of ln(null/truth),
//     while the grain's own correlation carries C share 48.2, 54.6 and 39.4
//     percent and the inherited shape of the previous level's histogram carries
//     A share 46.9, 38.8 and 55.5 percent. B never exceeds 10.0 percent
//     anywhere in the table.
//
//  7. [MEASURED] THE SAME STATEMENT WITHOUT ANY MODEL IN IT. Applying the
//     EXACT operator to a shuffled true grain returns a maximum gap of 276,
//     354 and 426 against the true 204, 258 and 348 at the folds 19->23,
//     23->29 and 29->31. The shuffle preserves the histogram exactly and
//     destroys only the order, so this is exact arithmetic on an exactly
//     specified word and carries no modelling assumption: most of the tile's
//     tail deficit is carried by the ORDER of the grain, not by its size
//     distribution together with the qualifying-gap rule.
//
//  8. [MEASURED] R4's SIGN HELD AND ITS SIZE DID NOT. M2 one fold from the
//     true previous histogram overshoots the far tail by 30.6441 (@23, u = 7),
//     308.7045 (@29, u = 8) and 29.5839 (@31, u = 10) against a registered
//     band of [1, 3]. The body is reproduced closely at the same time:
//     M2/truth reads 0.9905, 1.0056 and 1.0040 at u = 1 and stays inside
//     0.9773 to 1.0375 out to u = 3 at all three levels. The model is right
//     about the bulk and wrong about the tail by one to two orders of
//     magnitude.
//
//  9. [MEASURED] NO SEED CHOICE INSIDE THE RECORD RESCUES M2. The spread of
//     delta across the four seeds T_13, T_17, T_19, T_23 is 0.0000 (@23),
//     0.1038 (@29) and 0.0413 (@31), and the most favourable variant, seed 23
//     at @29, still reads 0.5709 against a measured 0.4463. The model's own
//     dispersion is therefore smaller than its miss at @29 and @31.
//
// 10. [OPEN] WHAT THIS DOES NOT SAY. Nothing here is a bound: the proven
//     exponent gap of G2-STATE section 0 is untouched and no object in this
//     file is an upper bound on G2. Every reading is over x <= 31. The model's one
//     approximation, an i.i.d. grain, is exactly the thing readings 6 and 7
//     measure as carrying the effect, so the miss is diagnosed rather than
//     unexplained; and the grain's ORDER is itself a function of the CRT
//     product alone, so nothing here moves the object from residue-level to
//     interval-level. What fails is the specific constructive route, not the
//     classification.
//
// 11. [VERIFIED] THE MARKOV WORD IS THE WORD IT CLAIMS TO BE. M-P3's gates hold
//     at all three folds: the sampled gap sum sits at 7.318e-4, 3.270e-4 and
//     -2.822e-5 relative to W; the sampled marginal reproduces the true
//     histogram to a worst ratio of 0.01626, 0.02290 and 0.01801 over the bins
//     carrying more than 1000 counts; and the sampled adjacent-pair counts
//     reproduce the true ones to 0.04241, 0.05745 and 0.06777 on the same
//     footing. ASSERTION FAILURES stays 0. So the histogram and the
//     adjacent-pair structure are carried and everything of order three and
//     above is destroyed, which is what the section is for.
//
// 12. [MEASURED] THE MIDDLE ARM FIRES: FIRST-ORDER CORRELATION CARRIES PART OF
//     THE ORDER EFFECT AND NOT ALL OF IT. On tail counts, which average over
//     the whole far tail rather than resting on one gap, c_tail declines with
//     the abscissa inside every fold: 69.9 to 27.8 percent (19->23, u = 5 to
//     7), 92.1 to 34.6 percent (23->29, u = 4 to 8) and 95.5 to 62.0 percent
//     (29->31, u = 5 to 9). At the deepest abscissa each fold resolves the
//     share is 27.8, 34.6 and 62.0 percent. Neither registered extreme is
//     reached: c is not above 90 percent at the far tail and it is not below 10
//     percent anywhere the truth resolves past u = 4.
//
// 13. [MEASURED] THE MAXIMUM-BASED SHARE IS DOMINATED BY REALISATION NOISE, AND
//     M-P1 FAILS ONLY ON THE SINGLE DRAW TAKEN HERE. The share read off the
//     single maximum is -16.7, 62.5 and 46.2 percent, and at 19->23 the Markov
//     maximum 288 sits ABOVE the shuffled 276, which no positive share can
//     produce; that fold's truth is 204 and its whole bracket is 72 units wide,
//     so two bins of draw scatter swamp it.
//
//     THE SCATTER IS NOW MEASURED IN THIS BLOCK AND IT REVERSES THE VERDICT
//     THIS READING ORIGINALLY CARRIED. Section 9 takes 40 draws of each word at
//     19->23: the shuffled maximum is 292.5 (sd 22.5, range [258, 354]) and the
//     first-order Markov maximum 263.1 (sd 17.4, range [228, 312]). This run's
//     276 is the 30.0th percentile of the shuffled law and its 288 the 87.5th
//     of the Markov law, and the share formed from the two draw MEANS is 33.2
//     percent, inside the registered band [10, 80] and beside the registered
//     point 40. So M-P1 and M-P2 hold at ALL THREE folds once the statistic is
//     averaged over draws; section 10's draw means give 33.2, 47.1 and 35.1
//     percent for the first-order share, against the single-draw -16.7, 62.5
//     and 46.2. The single-draw shuffled maxima are LOW: at 29->31 the draw
//     mean is 469.2 (sd 23.8) against the single 426. The tail-count column of
//     reading 12 is the one to read; the maximum column of section 8 is printed
//     so nobody reads it as a second measurement.
//
// 14. [OPEN] THE FIRST-ORDER ROUTE IS NARROWED AND SECOND ORDER CLOSES IT. The
//     residual left by first order at the deepest abscissa of each fold is 100
//     percent minus 27.8, 34.6 and 62.0 on the single draw, and 32.3, 34.2 and
//     60.8 on section 10's aggregates, which agree. What that residual IS, is
//     now measured: see reading 16. The second draw this reading once called
//     NOT RUN has been taken, inside this producer, at 40, 20 and 10 draws per
//     fold.
//
// 15. [VERIFIED] THE SCRATCHPAD FIGURES ARE CONFIRMED INSIDE OUTPUT CUSTODY.
//     Red team C's 40-draw run at 19->23 used an independently written sampler
//     on a scratchpad. This producer's own 40 draws, differently seeded, give a
//     shuffled mean maximum of 292.5 against its 296.1 and a Markov mean of
//     263.1 against its 264.0, agreeing at 0.12 and 0.05 sd, inside the
//     one-sd test note section 9a registered. The percentiles read 30.0 and
//     87.5 against 32.5 and 90.0 and the share 33.2 percent against 34.9. E11
//     is arithmetic and reproduces: 395 / 726.414 = 0.5438. What this
//     establishes is that a second implementation reproduces the first, not
//     that red team C's own run is bound; that run stays outside this file.
//
// 16. [MEASURED] A-P1 IS REFUTED AND SECOND ORDER CARRIES ESSENTIALLY ALL OF
//     WHAT FIRST ORDER LEFT. The registered point was r = 0.30 in a band
//     [0.15, 0.55], on the reasoning that a run of L = 4 spans five consecutive
//     gaps while a second-order chain controls three. Measured r is 0.972,
//     1.061 and 1.000 on the draw-mean maximum and 0.896 to 1.067 on every one
//     of the twelve tail rows. c2 reads 98.1, 103.2 and 100.0 percent on the
//     maximum and 94.3 to 102.6 percent on the tail. The first falsifier arm
//     fires at all three folds and at every abscissa the truth resolves. The
//     gate table shows the surrogates doing what they claim: the shuffled word
//     destroys pairs and triples (worst ratios 1.61370 to 16.83270), the
//     first-order word keeps pairs to 0.06816 and destroys triples (0.95431 to
//     16.22297), the second-order word keeps all three to 0.07350.
//
// 17. [OPEN] WHAT READING 16 DOES NOT SAY, AND THE NUMBER TO DISTRUST IN IT.
//     At 29->31 the second-order maximum is 348.0 with sd 0.0 over 10 draws:
//     every draw returned exactly the true G2. A standard deviation of exactly
//     zero should be distrusted before it is believed, and 10 draws is 10; what
//     argues against a copy of the true grain is the gate, which puts that
//     word's marginal, pair and triple counts 0.04661, 0.07143 and 0.07350 away
//     from the true ones, multinomial noise at counts near 1000 rather than
//     zero. MORE DRAWS AT 29->31 WERE NOT TAKEN. Beyond that, every row of
//     section 10 is a surrogate for ONE fold seeded on the TRUE previous grain,
//     so it consumes the truth it is compared against: it is not iterated, it
//     predicts no delta at zero parameters, and it does NOT revive C3, whose
//     failure was that a histogram-only model iterated from T_13 misses delta by
//     0.1884, 0.2283 and 0.2230. Whether a second-order surrogate ITERATED up the ladder, its
//     triple table re-fitted at each level from the previous surrogate rather
//     than from the truth, reproduces delta is OPEN and NOT RUN.
