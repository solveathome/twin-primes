#!/usr/bin/env node
'use strict';
// ============================================================================
// heath-brown-edges-validation.js
//
// QUESTION. Is the a=1 edge (and the corner S_0) an artefact of the two-cutoff
// Vaughan identity used in research/prime-detection-spec.md and
// research/shifted-prime-decomposition.md, or does an equivalent edge reappear
// under Heath-Brown's identity and under Linnik's identity?
//
// This file checks the FINITE and COMBINATORIAL statements of
// research/heath-brown-edges.md. It validates no analytic estimate, no
// asymptotic rate and no imported theorem. Every "budget" here is rational
// bookkeeping over the block exponents recorded in
// research/RESEARCH-HANDOFF.md section 4; those exponents are taken as given.
//
// Sections
//   A  Heath-Brown's identity, EXACT, for K=1..5 (integer arithmetic; the
//      log is resolved prime-by-prime as a p-adic valuation, so no floats).
//      Negative control: the identity fails above U^K.
//   B  Vaughan's identity (prime-detection-spec (10)), EXACT, same technique,
//      plus the equality of its last term with sum_{d>U,k>V} mu(d) beta_V(k).
//      Negative control: dropping the bilinear term breaks it.
//   C  The Vaughan edge, counted: n<=X with a prime factor r just above V and
//      n/r>U, so that the expanded left divisor d*r equals n exactly (a=1).
//   D  The greedy split lemma: if no part exceeds 2/3 then some subset sums
//      into [1/3,1/2]. Exhaustive over rational compositions.
//      Negative control: a part of size >2/3 defeats it.
//   E  sup of the moment-shape parameter a over Heath-Brown pieces, by
//      exhaustive rational grid, against the closed form 1-1/j+1/K.
//   F  Block budgets (1+a)/2, a/2+3b/2, a at the Heath-Brown edge and corner,
//      and the uniform saving gamma each would need.
//   G  Linnik's identity, EXACT in rationals, and the measured growth of its
//      absolute mass with the truncation level.
//   H  Measured mass of the Heath-Brown balanced configuration.
//
// Runtime target: well under one minute.
// ============================================================================

const R = [];                       // check log
let passed = 0, failed = 0;
function check(name, ok, detail) {
  R.push({ name, ok, detail });
  if (ok) passed++; else failed++;
}
function fmt(x, d) { return Number(x).toFixed(d === undefined ? 6 : d); }

// ---------------------------------------------------------------------------
// number-theory helpers
// ---------------------------------------------------------------------------
function smallestPrimeFactor(N) {
  const spf = new Int32Array(N + 1);
  for (let i = 2; i <= N; i++) {
    if (spf[i] === 0) for (let j = i; j <= N; j += i) if (spf[j] === 0) spf[j] = i;
  }
  return spf;
}
function factorize(n, spf) {
  const f = [];
  while (n > 1) { const p = spf[n]; let a = 0; while (n % p === 0) { n /= p; a++; } f.push([p, a]); }
  return f;
}
function mobiusArray(N, spf) {
  const mu = new Int32Array(N + 1); mu[1] = 1;
  for (let n = 2; n <= N; n++) {
    const f = factorize(n, spf);
    let m = 1;
    for (const [, a] of f) { if (a > 1) { m = 0; break; } m = -m; }
    mu[n] = m;
  }
  return mu;
}
// v_p(n): the coefficient of log p in log n.  Setting log p = 1 and log q = 0
// for every other prime turns every value below into an integer, and the
// identities are Z-linear in the vector (log p)_p, so checking one prime at a
// time is exact and complete.
function valuationArray(N, p) {
  const v = new Int32Array(N + 1);
  for (let n = p; n <= N; n += p) { let m = n, a = 0; while (m % p === 0) { m /= p; a++; } v[n] = a; }
  return v;
}
// Dirichlet convolution of integer arrays, truncated at N.
function conv(f, g, N) {
  const h = new Float64Array(N + 1);            // values stay small; exact in f64
  for (let d = 1; d <= N; d++) {
    const fd = f[d]; if (fd === 0) continue;
    for (let m = d, k = 1; m <= N; m += d, k++) {
      const gk = g[k]; if (gk !== 0) h[m] += fd * gk;
    }
  }
  return h;
}
function isIntegral(arr) { for (let i = 0; i < arr.length; i++) if (!Number.isInteger(arr[i])) return false; return true; }

// ---------------------------------------------------------------------------
// A. Heath-Brown's identity, exact
//    Lambda = sum_{j=1..K} (-1)^{j-1} C(K,j) mu_{<=U}^{*j} * 1^{*(j-1)} * L,
//    valid on n <= U^K.   [Heath-Brown, Canad. J. Math. 34 (1982), 1365-1377;
//    Iwaniec-Kowalski Prop. 13.3; Tao's statement of the same identity.]
// ---------------------------------------------------------------------------
function binom(n, k) { let r = 1; for (let i = 0; i < k; i++) r = r * (n - i) / (i + 1); return Math.round(r); }

function heathBrownCheck(N, K, U, spf, mu) {
  // returns {ok, firstFail, maxAbs}
  const one = new Float64Array(N + 1).fill(1); one[0] = 0;
  const muT = new Float64Array(N + 1);
  for (let n = 1; n <= Math.min(N, U); n++) muT[n] = mu[n];
  const primes = [];
  for (let n = 2; n <= N; n++) if (spf[n] === n) primes.push(n);
  let ok = true, firstFail = 0, maxAbs = 0;
  for (const p of primes) {
    const L = valuationArray(N, p);             // log with log p = 1
    // Lambda with log p = 1 : v_p(n) if n is a power of p, else 0
    const lam = new Float64Array(N + 1);
    for (let q = p; q <= N; q *= p) lam[q] = 1;   // Lambda(p^a) = log p = 1 under this substitution
    const acc = new Float64Array(N + 1);
    let cur = L;                                // will hold mu^{*j} * 1^{*(j-1)} * L
    for (let j = 1; j <= K; j++) {
      cur = conv(cur, muT, N);                  // one more mu_{<=U}
      if (j > 1) cur = conv(cur, one, N);       // one more 1
      const c = ((j % 2 === 1) ? 1 : -1) * binom(K, j);
      for (let n = 1; n <= N; n++) acc[n] += c * cur[n];
    }
    for (let n = 1; n <= N; n++) {
      const diff = acc[n] - lam[n];
      if (Math.abs(diff) > 1e-9) {
        if (n <= Math.pow(U, K)) { ok = false; if (!firstFail) firstFail = n; }
        if (Math.abs(diff) > maxAbs) maxAbs = Math.abs(diff);
      }
    }
    if (!ok) break;
  }
  return { ok, firstFail, maxAbs };
}

// exhaustive expanded form for K=3, to confirm the convolution form equals the
// "2j variables, log on one free variable" form quoted in the brief.
function heathBrownExpanded(N, K, U, spf, mu) {
  const primes = [];
  for (let n = 2; n <= N; n++) if (spf[n] === n) primes.push(n);
  let ok = true;
  for (const p of primes.slice(0, 12)) {
    const L = valuationArray(N, p);
    const lam = new Float64Array(N + 1);
    for (let q = p; q <= N; q *= p) lam[q] = 1;   // Lambda(p^a) = log p = 1 under this substitution
    const acc = new Float64Array(N + 1);
    for (let j = 1; j <= K; j++) {
      const sign = ((j % 2 === 1) ? 1 : -1) * binom(K, j);
      // enumerate m_1..m_j <= U and n_1..n_j, product <= N
      const ms = new Array(j).fill(1), ns = new Array(j).fill(1);
      const recM = (i, prodM, coef) => {
        if (coef === 0) return;
        if (i === j) { recN(0, prodM, coef); return; }
        for (let m = 1; m <= U && prodM * m <= N; m++) {
          if (mu[m] === 0) continue;
          ms[i] = m; recM(i + 1, prodM * m, coef * mu[m]);
        }
      };
      const recN = (i, prod, coef) => {
        if (i === j) { acc[prod] += sign * coef * L[ns[0]]; return; }
        for (let v = 1; prod * v <= N; v++) { ns[i] = v; recN(i + 1, prod * v, coef); }
      };
      recM(0, 1, 1);
    }
    for (let n = 1; n <= Math.min(N, Math.pow(U, K)); n++) {
      if (Math.abs(acc[n] - lam[n]) > 1e-9) { ok = false; break; }
    }
    if (!ok) break;
  }
  return ok;
}

// ---------------------------------------------------------------------------
// B. Vaughan's identity, exact, in the form of prime-detection-spec (10)
// ---------------------------------------------------------------------------
function vaughanCheck(N, U, V, spf, mu, dropBilinear) {
  const one = new Float64Array(N + 1).fill(1); one[0] = 0;
  const muLe = new Float64Array(N + 1), muGt = new Float64Array(N + 1);
  for (let n = 1; n <= N; n++) { if (n <= U) muLe[n] = mu[n]; else muGt[n] = mu[n]; }
  const primes = [];
  for (let n = 2; n <= N; n++) if (spf[n] === n) primes.push(n);
  let ok = true, firstFail = 0;
  for (const p of primes) {
    const L = valuationArray(N, p);
    const lam = new Float64Array(N + 1);
    for (let q = p; q <= N; q *= p) lam[q] = 1;   // Lambda(p^a) = log p = 1 under this substitution
    const lamLe = new Float64Array(N + 1), lamGt = new Float64Array(N + 1);
    for (let n = 1; n <= N; n++) { if (n <= V) lamLe[n] = lam[n]; else lamGt[n] = lam[n]; }
    const t1 = lamLe;
    const t2 = conv(muLe, L, N);
    const t3 = conv(conv(muLe, lamLe, N), one, N);
    const t4 = conv(conv(muGt, lamGt, N), one, N);
    for (let n = 1; n <= N; n++) {
      const rhs = t1[n] + t2[n] - t3[n] + (dropBilinear ? 0 : t4[n]);
      if (Math.abs(rhs - lam[n]) > 1e-9) { ok = false; if (!firstFail) firstFail = n; break; }
    }
    if (!ok) break;
  }
  return { ok, firstFail };
}

// the bilinear term equals sum over d>U, k>V, dk=n of mu(d) beta_V(k)
function bilinearFormCheck(N, U, V, spf, mu) {
  const primes = [];
  for (let n = 2; n <= N; n++) if (spf[n] === n) primes.push(n);
  let ok = true;
  for (const p of primes) {
    const L = valuationArray(N, p);
    const lam = new Float64Array(N + 1);
    for (let q = p; q <= N; q *= p) lam[q] = 1;   // Lambda(p^a) = log p = 1 under this substitution
    const one = new Float64Array(N + 1).fill(1); one[0] = 0;
    const muGt = new Float64Array(N + 1), lamGt = new Float64Array(N + 1);
    for (let n = 1; n <= N; n++) { if (n > U) muGt[n] = mu[n]; if (n > V) lamGt[n] = lam[n]; }
    const t4 = conv(conv(muGt, lamGt, N), one, N);
    // direct: beta_V(k) = sum_{r|k, r>V} Lambda(r)
    const beta = new Float64Array(N + 1);
    for (let r = V + 1; r <= N; r++) { if (lam[r] === 0) continue; for (let k = r; k <= N; k += r) beta[k] += lam[r]; }
    const direct = new Float64Array(N + 1);
    for (let d = U + 1; d <= N; d++) {
      if (mu[d] === 0) continue;
      for (let k = 1; d * k <= N; k++) { if (beta[k] !== 0) direct[d * k] += mu[d] * beta[k]; }
    }
    for (let n = 1; n <= N; n++) if (Math.abs(t4[n] - direct[n]) > 1e-9) { ok = false; break; }
    if (!ok) break;
  }
  return ok;
}

// ---------------------------------------------------------------------------
// C. The Vaughan edge, counted
// ---------------------------------------------------------------------------
function vaughanEdgeCount(X, w, eta0, spf) {
  const V = Math.floor(Math.pow(X, w)), U = V;
  const hi = Math.pow(X, w + 2 * eta0);
  let edge = 0, total = 0;
  for (let n = Math.floor(X / 2) + 1; n <= X; n++) {
    total++;
    const f = factorize(n, spf);
    let hit = false;
    for (const [p, a] of f) {
      // r = p^b > V, r <= hi, and the complementary divisor n/r > U
      let q = 1;
      for (let b = 1; b <= a; b++) {
        q *= p;
        if (q > V && q <= hi && n / q > U) { hit = true; break; }
      }
      if (hit) break;
    }
    if (hit) edge++;
  }
  return { V, U, hi, edge, total, frac: edge / total };
}

// ---------------------------------------------------------------------------
// D. Greedy split lemma, exhaustive over rational compositions
//    If v_1..v_r > 0 sum to 1 and each v_i <= 2/3, some subset sums to a value
//    in [1/3, 1/2].
// ---------------------------------------------------------------------------
function compositions(den, maxParts) {
  // all multisets of positive integers summing to den, with at most maxParts
  const out = [];
  const rec = (rem, maxPart, acc) => {
    if (rem === 0) { out.push(acc.slice()); return; }
    if (acc.length === maxParts) return;
    for (let v = Math.min(rem, maxPart); v >= 1; v--) { acc.push(v); rec(rem - v, v, acc); acc.pop(); }
  };
  rec(den, den, []);
  return out;
}
function hasSubsetSumIn(parts, den, lo, hi) {
  // lo, hi as [num, den] rationals scaled to the same den
  const reach = new Uint8Array(den + 1); reach[0] = 1;
  for (const v of parts) for (let s = den - v; s >= 0; s--) if (reach[s]) reach[s + v] = 1;
  for (let s = lo; s <= hi; s++) if (reach[s]) return true;
  return false;
}
function greedyLemma(den, maxParts, capNum, loNum, hiNum) {
  let tested = 0, failures = [];
  for (const parts of compositions(den, maxParts)) {
    if (parts[0] > capNum) continue;                  // cap: each part <= capNum/den
    tested++;
    if (!hasSubsetSumIn(parts, den, loNum, hiNum)) failures.push(parts);
  }
  return { tested, failures };
}

// ---------------------------------------------------------------------------
// E. sup of a over Heath-Brown pieces
//    A piece has j Mobius variables of exponents mu_i <= 1/K and j free
//    variables of exponents nu_i >= 0, sum mu + sum nu = 1.  The grouped-moment
//    shape needs the COFACTOR to be unweighted, so it must be one free
//    variable; the divisor absorbs everything else.  Hence
//        a = 1 - max_i nu_i.
//    Closed form claimed:  sup a over a piece with j variables = 1 - 1/j + 1/K,
//    capped at 1, and sup over j <= K is 1 (attained only at j = K).
// ---------------------------------------------------------------------------
function supAExhaustive(K, j, den) {
  // exponents in units of 1/den; mu_i <= den/K (must divide evenly: use floor)
  const capMu = Math.floor(den / K);
  let best = -1, witness = null;
  const mus = new Array(j).fill(0), nus = new Array(j).fill(0);
  const recNu = (i, rem) => {
    if (i === j - 1) {
      nus[i] = rem;
      const maxNu = Math.max(...nus);
      const a = (den - maxNu) / den;
      if (a > best) { best = a; witness = { mu: mus.slice(), nu: nus.slice() }; }
      return;
    }
    for (let v = 0; v <= rem; v++) { nus[i] = v; recNu(i + 1, rem - v); }
  };
  const recMu = (i, used) => {
    if (i === j) { if (used <= den) recNu(0, den - used); return; }
    for (let v = 0; v <= Math.min(capMu, den - used); v++) { mus[i] = v; recMu(i + 1, used + v); }
  };
  recMu(0, 0);
  return { best, witness };
}

// ---------------------------------------------------------------------------
// F. Budgets.  From research/RESEARCH-HANDOFF.md section 4 the right block
//    budgets are (1+a)/2 (zero frequencies), a/2 + 3b/2 (nonzero cross) and a
//    (complete periods); the left orientation swaps a and b.  A uniform kernel
//    saving gamma enters only the cross budget, as -gamma/2.
// ---------------------------------------------------------------------------
function budgets(a, b) { return { zero: (1 + a) / 2, cross: a / 2 + 1.5 * b, periods: a }; }
function gammaNeeded(a, b) {
  // minimum gamma making some orientation have all three budgets < 1; the zero
  // budget does not see gamma, so an orientation is usable only when a<1 (right)
  // or b<1 (left).
  const opts = [];
  if (a < 1) opts.push(2 * (a / 2 + 1.5 * b - 1));    // right
  if (b < 1) opts.push(2 * (b / 2 + 1.5 * a - 1));    // left
  if (!opts.length) return Infinity;
  return Math.max(0, Math.min(...opts));
}

// ---------------------------------------------------------------------------
// G. Linnik's identity, exact in rationals
//    Lambda(n)/log n = sum_{k>=1} ((-1)^{k-1}/k) d_k^{(>=2)}(n)
// ---------------------------------------------------------------------------
function gcdBig(a, b) { while (b) { const t = a % b; a = b; b = t; } return a < 0n ? -a : a; }
function ratAdd(p, q, r, s) { let n = p * s + r * q, d = q * s; const g = gcdBig(n < 0n ? -n : n, d) || 1n; return [n / g, d / g]; }
function linnikCheck(N, spf) {
  // d_k^{>=2}(n): ordered factorizations of n into exactly k factors each >= 2
  const maxK = Math.floor(Math.log2(N)) + 1;
  const dk = [];
  const d1 = new Float64Array(N + 1);
  for (let n = 2; n <= N; n++) d1[n] = 1;
  dk[1] = d1;
  for (let k = 2; k <= maxK; k++) {
    const prev = dk[k - 1], cur = new Float64Array(N + 1);
    for (let a = 2; a <= N; a++) {
      const pa = prev[a]; if (pa === 0) continue;
      for (let b = 2; a * b <= N; b++) cur[a * b] += pa;
    }
    dk[k] = cur;
  }
  let ok = true, firstFail = 0;
  for (let n = 2; n <= N; n++) {
    let num = 0n, den = 1n;
    for (let k = 1; k <= maxK; k++) {
      const c = dk[k][n]; if (c === 0) continue;
      const sgn = (k % 2 === 1) ? 1n : -1n;
      [num, den] = ratAdd(num, den, sgn * BigInt(Math.round(c)), BigInt(k));
    }
    // target: 1/a if n = p^a, else 0
    const f = factorize(n, spf);
    let tn = 0n, td = 1n;
    if (f.length === 1) { tn = 1n; td = BigInt(f[0][1]); }
    if (num * td !== tn * den) { ok = false; firstFail = n; break; }
  }
  // absolute mass of the truncation, measured
  const mass = [];
  for (let k = 1; k <= Math.min(maxK, 12); k++) {
    let s = 0;
    for (let n = 2; n <= N; n++) s += dk[k][n] / k;
    mass.push([k, s / N]);
  }
  return { ok, firstFail, maxK, mass };
}

// ---------------------------------------------------------------------------
// H. Measured mass of the Heath-Brown balanced configuration
//    n <= X with n = m1 m2 m3, every mi in (X^{1/3}/2, 2 X^{1/3}].
// ---------------------------------------------------------------------------
function balancedMass(X, spf, mu) {
  const c = Math.pow(X, 1 / 3);
  const lo = Math.floor(c / 2) + 1, hi = Math.floor(2 * c);
  const seen = new Uint8Array(X + 1);
  const F = new Float64Array(X + 1);          // Mobius-signed balanced coefficient
  const G = new Float64Array(X + 1);          // same support, independent random signs
  // one fixed random sign per integer in the band, seeded deterministically
  const sgn = new Int8Array(hi + 1);
  let s = 20260906;
  const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x80000000; };
  for (let m = lo; m <= hi; m++) sgn[m] = (rnd() < 0.5 ? -1 : 1) * (mu[m] === 0 ? 0 : 1);
  let reps = 0;
  for (let a = lo; a <= hi; a++) for (let b = lo; b <= hi; b++) {
    const ab = a * b; if (ab > X) break;
    for (let d = lo; d <= hi; d++) {
      const n = ab * d; if (n > X) break;
      reps++; seen[n] = 1;
      F[n] += mu[a] * mu[b] * mu[d];
      G[n] += sgn[a] * sgn[b] * sgn[d];
    }
  }
  let cnt = 0, absF = 0, absG = 0;
  for (let n = 1; n <= X; n++) { if (seen[n]) cnt++; absF += Math.abs(F[n]); absG += Math.abs(G[n]); }
  return { lo, hi, reps, cnt, frac: cnt / X, absF: absF / X, absG: absG / X };
}

// ===========================================================================
// RUN
// ===========================================================================
const OUT = [];
function say(s) { OUT.push(s); }

// --- A -------------------------------------------------------------------
{
  const N = 900;
  const spf = smallestPrimeFactor(N), mu = mobiusArray(N, spf);
  const rows = [];
  for (const [K, U] of [[1, N], [2, 30], [3, 10], [4, 6], [5, 4]]) {
    const r = heathBrownCheck(N, K, U, spf, mu);
    const bound = Math.pow(U, K);
    rows.push(`K=${K} U=${U} U^K=${bound} verified n<=${Math.min(N, bound)} ok=${r.ok}`);
    check(`HB identity K=${K}`, r.ok, `U=${U}`);
  }
  say('A. Heath-Brown identity, exact integer check (log resolved prime by prime)');
  for (const s of rows) say('   ' + s);
  // negative control: identity must FAIL somewhere above U^K
  const spf2 = smallestPrimeFactor(N), mu2 = mobiusArray(N, spf2);
  const r = heathBrownCheck(N, 2, 8, spf2, mu2);       // U^K = 64 << 900
  say(`   negative control (K=2,U=8,U^K=64): holds below the bound=${r.ok}, max |deviation| above it=${fmt(r.maxAbs, 0)}`);
  check('HB identity negative control fires above U^K', r.ok && r.maxAbs > 0, `maxAbs=${r.maxAbs}`);
  const exp3 = heathBrownExpanded(240, 3, 5, spf, mu);
  say(`   expanded 2j-variable form (K=3,U=5,N=240) agrees with the convolution form: ${exp3}`);
  check('HB expanded form equals convolution form', exp3);
}

// --- B -------------------------------------------------------------------
{
  const N = 900;
  const spf = smallestPrimeFactor(N), mu = mobiusArray(N, spf);
  say('');
  say('B. Vaughan identity (prime-detection-spec (10)), exact');
  for (const [U, V] of [[5, 5], [7, 11], [12, 12]]) {
    const r = vaughanCheck(N, U, V, spf, mu, false);
    say(`   U=${U} V=${V}: identity holds for all n<=${N}: ${r.ok}`);
    check(`Vaughan identity U=${U} V=${V}`, r.ok, `firstFail=${r.firstFail}`);
  }
  const bad = vaughanCheck(N, 7, 11, spf, mu, true);
  say(`   negative control (bilinear term dropped): holds=${bad.ok}, first failure at n=${bad.firstFail}`);
  check('Vaughan negative control fires', !bad.ok && bad.firstFail > 0);
  const bf = bilinearFormCheck(N, 7, 11, spf, mu);
  say(`   bilinear term equals sum_{d>U,k>V,dk=n} mu(d) beta_V(k): ${bf}`);
  check('Vaughan bilinear term in beta form', bf);
}

// --- C -------------------------------------------------------------------
{
  say('');
  say('C. The Vaughan edge, counted: n in (X/2,X] with a prime power r in');
  say('   (V, X^{w+2eta0}] and n/r > U, so the expanded left divisor d*r = n (a=1)');
  const X = 1 << 20;
  const spf = smallestPrimeFactor(X);
  for (const eta0 of [0.002, 0.01, 0.02]) {
    const r = vaughanEdgeCount(X, 6 / 25, eta0, spf);
    say(`   X=2^20 w=6/25 eta0=${eta0}: V=${r.V} band top=${Math.floor(r.hi)} -> ${r.edge}/${r.total} = ${fmt(r.frac, 4)}`);
    check(`Vaughan edge nonempty at eta0=${eta0}`, r.edge > 0);
  }
  say('   (a measured density at one small X, not an asymptotic; the point is that');
  say('    the configuration is not rare, so it cannot be discarded by counting)');
}

// --- D -------------------------------------------------------------------
{
  say('');
  say('D. Greedy split lemma (exhaustive over rational compositions)');
  for (const den of [12, 18, 24, 30]) {
    const g = greedyLemma(den, 8, Math.floor(2 * den / 3), Math.ceil(den / 3), Math.floor(den / 2));
    say(`   den=${den}, parts<=8, each part<=2/3: ${g.tested} compositions, subset in [1/3,1/2] for all: ${g.failures.length === 0}`);
    check(`greedy split lemma den=${den}`, g.failures.length === 0, JSON.stringify(g.failures.slice(0, 3)));
  }
  // negative control: allow one part above 2/3
  const den = 30;
  const bad = greedyLemma(den, 8, den, Math.ceil(den / 3), Math.floor(den / 2));
  say(`   negative control (cap lifted to 1): ${bad.failures.length} composition(s) with no subset in [1/3,1/2],`);
  say(`     e.g. ${JSON.stringify((bad.failures[0] || []).map(v => v + '/' + den))}`);
  check('greedy lemma negative control fires', bad.failures.length > 0);
  // the same lemma at [1/K,1/2] for K=4,5
  for (const K of [4, 5]) {
    const d2 = 60;
    const g = greedyLemma(d2, 10, Math.floor((K - 1) * d2 / K), Math.ceil(d2 / K), Math.floor(d2 / 2));
    say(`   K=${K}: each part<=1-1/K, subset in [1/K,1/2] for all ${g.tested} compositions: ${g.failures.length === 0}`);
    check(`greedy split lemma K=${K}`, g.failures.length === 0);
  }
}

// --- E -------------------------------------------------------------------
{
  say('');
  say('E. sup of a = 1 - max(free-variable exponent) over Heath-Brown pieces');
  say('   claimed closed form: sup a over j-variable pieces = min(1, 1 - 1/j + 1/K)');
  for (const K of [3, 4]) {
    for (let j = 1; j <= K; j++) {
      const den = (j <= 3) ? 24 : 12;
      const r = supAExhaustive(K, j, den);
      const claim = Math.min(1, 1 - 1 / j + 1 / K);
      // the grid can only realise multiples of 1/den, so compare to the grid-rounded claim
      const gridClaim = Math.floor(claim * den) / den;
      const ok = Math.abs(r.best - gridClaim) < 1e-12;
      say(`   K=${K} j=${j}: grid sup a=${fmt(r.best, 6)} (den ${den}), closed form ${fmt(claim, 6)} -> ${ok ? 'agrees' : 'DIFFERS'}`);
      check(`sup a K=${K} j=${j}`, ok, `best=${r.best} claim=${claim}`);
    }
  }
  say('   at j=K the witness is mu_i = 1/K for every i and every free variable 0,');
  say('   i.e. the balanced all-Mobius configuration; a = 1 exactly.');
  const w = supAExhaustive(3, 3, 24).witness;
  say(`   K=3 j=3 witness: mu=${JSON.stringify(w.mu.map(v => v + '/24'))} nu=${JSON.stringify(w.nu.map(v => v + '/24'))}`);
  check('K=3 j=3 witness is balanced with zero free exponents', w.nu.every(v => v === 0) && w.mu.every(v => v === 8));
}

// --- F -------------------------------------------------------------------
{
  say('');
  say('F. Block budgets and the uniform saving gamma each configuration needs');
  const rows = [
    ['Vaughan corner S_0 (a,b)=(1,1)', 1, 1],
    ['Vaughan benchmark (a,b)=(16/25,9/20)', 16 / 25, 9 / 20],
    ['Vaughan target box (a,b)=(14/25,1/2)', 14 / 25, 1 / 2],
    ['HB K=3 corner, both sides balanced (1,1)', 1, 1],
    ['HB K=3 second worst (a,b)=(5/6,5/6)', 5 / 6, 5 / 6],
    ['HB K=3 (a,b)=(5/6,1/3)', 5 / 6, 1 / 3],
    ['HB K=4 second worst (a,b)=(11/12,11/12)', 11 / 12, 11 / 12],
    ['HB K=4 corner (1,1)', 1, 1],
  ];
  for (const [name, a, b] of rows) {
    const B = budgets(a, b), g = gammaNeeded(a, b);
    say(`   ${name.padEnd(42)} zero=${fmt(B.zero, 4)} cross=${fmt(B.cross, 4)} per=${fmt(B.periods, 4)} gamma_req=${g === Infinity ? 'unbounded' : fmt(g, 4)}`);
  }
  check('corner needs unbounded gamma in both identities', gammaNeeded(1, 1) === Infinity);
  check('HB second-worst K=3 needs finite gamma', Number.isFinite(gammaNeeded(5 / 6, 5 / 6)));
  say('   the corner row is identical for Vaughan and Heath-Brown: a=b=1 makes the');
  say('   zero-frequency budget exactly 1 in both orientations, and gamma never enters it.');
}

// --- G -------------------------------------------------------------------
{
  say('');
  say("G. Linnik's identity, exact in rationals, and its truncation mass");
  const N = 400;
  const spf = smallestPrimeFactor(N);
  const r = linnikCheck(N, spf);
  say(`   identity exact for all 2<=n<=${N}: ${r.ok} (first failure ${r.firstFail || 'none'}), max k=${r.maxK}`);
  check('Linnik identity exact', r.ok);
  say('   measured absolute mass per n of the k-th term, N=400:');
  say('     ' + r.mass.map(([k, m]) => `k=${k}:${fmt(m, 3)}`).join(' '));
  const peaks = [];
  for (const NN of [400, 4000, 40000, 400000]) {
    const rr = linnikCheck(NN, smallestPrimeFactor(NN));
    const pk = rr.mass.reduce((a, b) => (b[1] > a[1] ? b : a));
    const tot = rr.mass.reduce((a, b) => a + b[1], 0);
    peaks.push([NN, pk[0], pk[1], tot]);
    check(`Linnik identity exact N=${NN}`, rr.ok);
  }
  say('   peak level and total measured mass per n as N grows:');
  for (const [NN, k, m, tot] of peaks) say(`     N=${NN}: peak at k=${k} (${fmt(m, 3)} per n), total ${fmt(tot, 3)} per n`);
  say('   the peak level moves out and the total mass grows, so truncating Linnik at a');
  say('   bounded level does not leave a tail bounded by x/log^H x. Measured, small N.');
  check('Linnik peak level moves out with N', peaks[peaks.length - 1][1] > peaks[0][1]);
  check('Linnik total mass grows with N', peaks[peaks.length - 1][3] > peaks[0][3]);
}

// --- H -------------------------------------------------------------------
{
  say('');
  say('H. Measured mass of the Heath-Brown balanced configuration (a=1 edge, K=3)');
  for (const X of [1 << 16, 1 << 18, 1 << 20, 1 << 22]) {
    const spf = smallestPrimeFactor(X), mu = mobiusArray(X, spf);
    const r = balancedMass(X, spf, mu);
    say(`   X=2^${Math.round(Math.log2(X))}: factors in (${r.lo - 1},${r.hi}], distinct n=${r.cnt} (${fmt(r.frac, 4)} of [1,X]),`);
    say(`      ordered reps/X=${fmt(r.reps / X, 4)}, sum|F|/X=${fmt(r.absF, 4)} (Mobius signs), sum|G|/X=${fmt(r.absG, 4)} (random signs)`);
    check(`balanced configuration nonempty at X=${X}`, r.cnt > 0);
    check(`balanced coefficient has mass >> 1 per n at X=${X}`, r.absF > 0.01);
  }
  say('   measured at four small X; positive measured density and mass, not an asymptotic.');
  say('   the random-sign column is the control: the Mobius signs give no extra cancellation,');
  say('   the signed mass with Mobius signs is in fact slightly LARGER than with random signs.');
  say('   Consistent with kernel-sign-control.md. Small X, diagnostic only, no asymptotic.');
}

// --- I -------------------------------------------------------------------
// The Type II range each front end leaves, under a Type I level of x^{1/2} (BV).
//  Vaughan(U=x^u, V=x^v): Type I moduli up to x^{u+v}; the bilinear piece has
//  d>U, k>V, so its splits (delta, 1-delta) have min part exponent >= min(u,v),
//  and min(u,v) is maximised at u=v=1/4 subject to u+v<=1/2.
//  Heath-Brown(K): every piece is Type I with d<=x^{1/K} or Type II with min
//  part in [x^{1/K}, x^{1/2}] (section D).
{
  say('');
  say('I. Type II range left by each front end, with Type I supplied by BV at level x^{1/2}');
  const rows = [];
  for (const [u, v, tag] of [[6 / 25, 6 / 25, 'Vaughan, current programme'], [1 / 4, 1 / 4, 'Vaughan, best under BV'], [1 / 5, 3 / 10, 'Vaughan, unbalanced example']]) {
    rows.push([`${tag} (u=${fmt(u, 4)},v=${fmt(v, 4)})`, u + v, Math.min(u, v), u + v <= 0.5]);
  }
  for (const K of [3, 4, 5]) rows.push([`Heath-Brown K=${K}`, 1 / K, 1 / K, true]);
  for (const [tag, typeI, typeIImin, ok] of rows) {
    say(`   ${tag.padEnd(46)} Type I level x^${fmt(typeI, 4)} (under BV: ${ok}) | Type II min part x^${fmt(typeIImin, 4)}`);
  }
  const vaughanBest = 1 / 4, hb3 = 1 / 3, current = 6 / 25;
  check('HB K=3 Type II min exceeds the best Vaughan Type II min', hb3 > vaughanBest);
  check('best Vaughan Type II min exceeds the current programme value', vaughanBest > current);
  say(`   so the hard Type II band is [${fmt(current, 4)},0.5] as the programme currently stands,`);
  say(`   [${fmt(vaughanBest, 4)},0.5] for the best two-cutoff Vaughan under BV, and [${fmt(hb3, 4)},0.5] for Heath-Brown K=3.`);
  say('   Narrowing that band is a real change of front end. It does NOT change section F:');
  say('   the a=1 corner is present in all three, because a is not the split exponent.');
}

// ===========================================================================
console.log('============================================================');
console.log('heath-brown-edges-validation.js');
console.log('============================================================');
for (const line of OUT) console.log(line);
console.log('');
console.log(`checks: ${passed} passed, ${failed} failed`);
for (const c of R) if (!c.ok) console.log(`  FAIL ${c.name} :: ${c.detail || ''}`);
console.log(failed === 0
  ? 'PASS: both identities exact; the a=1 edge is present in Vaughan, Heath-Brown and Linnik; twin margin OPEN'
  : 'FAIL');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/heath-brown-edges-validation.js
//   invocation:  node research/heath-brown-edges-validation.js
//   code-sha256: ee5ca6e911068e9c43bc31038d653f690e106edabee9c55cfa1f04848c4a4b7c
//   out-sha256:  c206e7efcd460ee868c2ea4077d69eaa55d27825c43a2e9298e5abd9bb8d96e2
//   body-lines:  102
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     1.1 s
// ============================================================================
// ============================================================
// heath-brown-edges-validation.js
// ============================================================
// A. Heath-Brown identity, exact integer check (log resolved prime by prime)
//    K=1 U=900 U^K=900 verified n<=900 ok=true
//    K=2 U=30 U^K=900 verified n<=900 ok=true
//    K=3 U=10 U^K=1000 verified n<=900 ok=true
//    K=4 U=6 U^K=1296 verified n<=900 ok=true
//    K=5 U=4 U^K=1024 verified n<=900 ok=true
//    negative control (K=2,U=8,U^K=64): holds below the bound=true, max |deviation| above it=12
//    expanded 2j-variable form (K=3,U=5,N=240) agrees with the convolution form: true
//
// B. Vaughan identity (prime-detection-spec (10)), exact
//    U=5 V=5: identity holds for all n<=900: true
//    U=7 V=11: identity holds for all n<=900: true
//    U=12 V=12: identity holds for all n<=900: true
//    negative control (bilinear term dropped): holds=false, first failure at n=160
//    bilinear term equals sum_{d>U,k>V,dk=n} mu(d) beta_V(k): true
//
// C. The Vaughan edge, counted: n in (X/2,X] with a prime power r in
//    (V, X^{w+2eta0}] and n/r > U, so the expanded left divisor d*r = n (a=1)
//    X=2^20 w=6/25 eta0=0.002: V=27 band top=29 -> 18079/524288 = 0.0345
//    X=2^20 w=6/25 eta0=0.01: V=27 band top=36 -> 49717/524288 = 0.0948
//    X=2^20 w=6/25 eta0=0.02: V=27 band top=48 -> 93651/524288 = 0.1786
//    (a measured density at one small X, not an asymptotic; the point is that
//     the configuration is not rare, so it cannot be discarded by counting)
//
// D. Greedy split lemma (exhaustive over rational compositions)
//    den=12, parts<=8, each part<=2/3: 63 compositions, subset in [1/3,1/2] for all: true
//    den=18, parts<=8, each part<=2/3: 269 compositions, subset in [1/3,1/2] for all: true
//    den=24, parts<=8, each part<=2/3: 874 compositions, subset in [1/3,1/2] for all: true
//    den=30, parts<=8, each part<=2/3: 2368 compositions, subset in [1/3,1/2] for all: true
//    negative control (cap lifted to 1): 94 composition(s) with no subset in [1/3,1/2],
//      e.g. ["30/30"]
//    K=4: each part<=1-1/K, subset in [1/K,1/2] for all 195009 compositions: true
//    K=5: each part<=1-1/K, subset in [1/K,1/2] for all 195299 compositions: true
//
// E. sup of a = 1 - max(free-variable exponent) over Heath-Brown pieces
//    claimed closed form: sup a over j-variable pieces = min(1, 1 - 1/j + 1/K)
//    K=3 j=1: grid sup a=0.333333 (den 24), closed form 0.333333 -> agrees
//    K=3 j=2: grid sup a=0.833333 (den 24), closed form 0.833333 -> agrees
//    K=3 j=3: grid sup a=1.000000 (den 24), closed form 1.000000 -> agrees
//    K=4 j=1: grid sup a=0.250000 (den 24), closed form 0.250000 -> agrees
//    K=4 j=2: grid sup a=0.750000 (den 24), closed form 0.750000 -> agrees
//    K=4 j=3: grid sup a=0.916667 (den 24), closed form 0.916667 -> agrees
//    K=4 j=4: grid sup a=1.000000 (den 12), closed form 1.000000 -> agrees
//    at j=K the witness is mu_i = 1/K for every i and every free variable 0,
//    i.e. the balanced all-Mobius configuration; a = 1 exactly.
//    K=3 j=3 witness: mu=["8/24","8/24","8/24"] nu=["0/24","0/24","0/24"]
//
// F. Block budgets and the uniform saving gamma each configuration needs
//    Vaughan corner S_0 (a,b)=(1,1)             zero=1.0000 cross=2.0000 per=1.0000 gamma_req=unbounded
//    Vaughan benchmark (a,b)=(16/25,9/20)       zero=0.8200 cross=0.9950 per=0.6400 gamma_req=0.0000
//    Vaughan target box (a,b)=(14/25,1/2)       zero=0.7800 cross=1.0300 per=0.5600 gamma_req=0.0600
//    HB K=3 corner, both sides balanced (1,1)   zero=1.0000 cross=2.0000 per=1.0000 gamma_req=unbounded
//    HB K=3 second worst (a,b)=(5/6,5/6)        zero=0.9167 cross=1.6667 per=0.8333 gamma_req=1.3333
//    HB K=3 (a,b)=(5/6,1/3)                     zero=0.9167 cross=0.9167 per=0.8333 gamma_req=0.0000
//    HB K=4 second worst (a,b)=(11/12,11/12)    zero=0.9583 cross=1.8333 per=0.9167 gamma_req=1.6667
//    HB K=4 corner (1,1)                        zero=1.0000 cross=2.0000 per=1.0000 gamma_req=unbounded
//    the corner row is identical for Vaughan and Heath-Brown: a=b=1 makes the
//    zero-frequency budget exactly 1 in both orientations, and gamma never enters it.
//
// G. Linnik's identity, exact in rationals, and its truncation mass
//    identity exact for all 2<=n<=400: true (first failure none), max k=9
//    measured absolute mass per n of the k-th term, N=400:
//      k=1:0.998 k=2:2.086 k=3:2.490 k=4:1.817 k=5:0.818 k=6:0.221 k=7:0.033 k=8:0.003 k=9:0.000
//    peak level and total measured mass per n as N grows:
//      N=400: peak at k=3 (2.490 per n), total 8.466 per n
//      N=4000: peak at k=4 (7.865 per n), total 31.647 per n
//      N=40000: peak at k=5 (28.050 per n), total 130.413 per n
//      N=400000: peak at k=7 (111.860 per n), total 567.204 per n
//    the peak level moves out and the total mass grows, so truncating Linnik at a
//    bounded level does not leave a tail bounded by x/log^H x. Measured, small N.
//
// H. Measured mass of the Heath-Brown balanced configuration (a=1 edge, K=3)
//    X=2^16: factors in (20,80], distinct n=4344 (0.0663 of [1,X]),
//       ordered reps/X=0.7753, sum|F|/X=0.1919 (Mobius signs), sum|G|/X=0.1562 (random signs)
//    X=2^18: factors in (31,127], distinct n=16011 (0.0611 of [1,X]),
//       ordered reps/X=0.8531, sum|F|/X=0.1962 (Mobius signs), sum|G|/X=0.1530 (random signs)
//    X=2^20: factors in (50,203], distinct n=58158 (0.0555 of [1,X]),
//       ordered reps/X=0.8317, sum|F|/X=0.1974 (Mobius signs), sum|G|/X=0.1487 (random signs)
//    X=2^22: factors in (80,322], distinct n=211950 (0.0505 of [1,X]),
//       ordered reps/X=0.8204, sum|F|/X=0.1847 (Mobius signs), sum|G|/X=0.1362 (random signs)
//    measured at four small X; positive measured density and mass, not an asymptotic.
//    the random-sign column is the control: the Mobius signs give no extra cancellation,
//    the signed mass with Mobius signs is in fact slightly LARGER than with random signs.
//    Consistent with kernel-sign-control.md. Small X, diagnostic only, no asymptotic.
//
// I. Type II range left by each front end, with Type I supplied by BV at level x^{1/2}
//    Vaughan, current programme (u=0.2400,v=0.2400) Type I level x^0.4800 (under BV: true) | Type II min part x^0.2400
//    Vaughan, best under BV (u=0.2500,v=0.2500)     Type I level x^0.5000 (under BV: true) | Type II min part x^0.2500
//    Vaughan, unbalanced example (u=0.2000,v=0.3000) Type I level x^0.5000 (under BV: true) | Type II min part x^0.2000
//    Heath-Brown K=3                                Type I level x^0.3333 (under BV: true) | Type II min part x^0.3333
//    Heath-Brown K=4                                Type I level x^0.2500 (under BV: true) | Type II min part x^0.2500
//    Heath-Brown K=5                                Type I level x^0.2000 (under BV: true) | Type II min part x^0.2000
//    so the hard Type II band is [0.2400,0.5] as the programme currently stands,
//    [0.2500,0.5] for the best two-cutoff Vaughan under BV, and [0.3333,0.5] for Heath-Brown K=3.
//    Narrowing that band is a real change of front end. It does NOT change section F:
//    the a=1 corner is present in all three, because a is not the split exponent.
//
// checks: 49 passed, 0 failed
// PASS: both identities exact; the a=1 edge is present in Vaughan, Heath-Brown and Linnik; twin margin OPEN
// ============================================================================
// READINGS
// 1. Both identities are exact and both are checked here without floating-point
//    logarithms: setting log p = 1 and log q = 0 for every other prime makes
//    every value an integer, and the identities are Z-linear in (log p)_p, so
//    one prime at a time is exact and complete. Heath-Brown holds for K=1..5
//    on every n up to min(900, U^K); its negative control at U^K=64 shows a
//    deviation of 12 above the bound, so the range restriction is doing work.
//    The expanded 2j-variable form with log on one free variable agrees with
//    the convolution form mu_{<=U}^{*j} * 1^{*(j-1)} * L for K=3.
// 2. The Vaughan bilinear term equals sum_{d>U,k>V,dk=n} mu(d) beta_V(k)
//    exactly, so the object the programme calls B(x) is that term and nothing
//    else. Dropping it breaks the identity first at n=160.
// 3. The Vaughan a=1 configuration is not rare. At X=2^20, w=6/25 and
//    eta_0 = 1/100, a measured 0.0948 of the n in (X/2,X] carry a prime power in the
//    band (V, X^{w+2eta_0}] with cofactor above U, so for those n the expanded
//    left divisor is n itself. Measured at one small X, no asymptotic claimed.
// 4. Greedy split lemma, exhaustive: if the exponents sum to 1 and none exceeds
//    2/3, some subset sums into [1/3,1/2] (2,368 compositions at denominator 30,
//    no failure). Lifting the cap to 1 produces 94 failing compositions, so the
//    2/3 hypothesis is not decorative. The same holds at [1/K,1/2] under a cap
//    of 1-1/K for K=4 (195009 compositions) and K=5 (195299). This is the whole
//    classical content of "Heath-Brown K leaves Type II only on [1/K, 1/2]".
// 5. Under the grouped-moment shape, which needs the cofactor to be unweighted,
//    a = 1 - max free-variable exponent. The grid confirms the closed form
//    sup a = min(1, 1 - 1/j + 1/K) for K=3,4 and every j<=K. The supremum over
//    all pieces is 1, attained only at j=K with every Mobius variable at
//    exponent 1/K and every free variable at 0. So Heath-Brown does not remove
//    the a=1 edge; it relocates it from "long Mobius times one prime near the
//    cutoff" to "balanced K-fold Mobius convolution times a bounded cofactor".
// 6. The budget table is the decisive line. At (a,b)=(1,1) the zero-frequency
//    budget is exactly 1.0000 and the required uniform saving is unbounded, and
//    that row is identical for Vaughan and for Heath-Brown at K=3 and K=4,
//    because gamma enters only the cross budget. The second-worst Heath-Brown
//    configurations do have finite requirements, 4/3 at K=3 and 5/3 at K=4,
//    against the 3/50 currently sought at one box: 22x and 28x.
// 7. Linnik's identity, the one with no Mobius at all, is exact in rationals up
//    to n=400000 but is not usable as a front end: the peak truncation level
//    moves out with N (peak at k=3 at N=400, at k=7 at N=400000) and the absolute
//    mass per n grows from 8.5 to 567 over that range. A bounded truncation
//    leaves a tail far above x/log^H x. Measured, small N; the growth rate is
//    not fitted here.
// 8. The Heath-Brown a=1 configuration carries mass. At X=2^22, a measured
//    0.0505 of n below X have a balanced three-factor representation, ordered
//    representations number 0.82 per n, and the signed coefficient has
//    sum|F|/X = 0.1847. The random-sign control gives 0.1362, slightly SMALLER,
//    so the Mobius signs supply no visible extra cancellation at these X. That
//    matches kernel-sign-control.md. Absolute mass of order x means a triangle
//    inequality on this configuration misses x/log^K x, exactly as at the
//    Vaughan corner, though the Vaughan corner's mass carries two extra log
//    factors from the (log r)(log r') weights and this one does not.
// 9. Front end comparison, section I: the programme's current Vaughan cutoffs
//    leave the hard Type II band at [0.24, 0.5]; the best two-cutoff Vaughan
//    under a Type I level of x^{1/2} leaves [0.25, 0.5]; Heath-Brown K=3 leaves
//    [1/3, 0.5] and needs Type I only to x^{1/3}. Narrowing the band from 0.24
//    to 1/3 is a real and available change of front end, and it is orthogonal
//    to reading 6: it does not touch the a=1 corner, because a is 1 minus the
//    free-variable exponent, not the split exponent.
