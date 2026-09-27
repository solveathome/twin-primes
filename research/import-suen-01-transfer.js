#!/usr/bin/env node
// ============================================================================
// IMPORT-SUEN 01 — THE CORRELATION-INEQUALITY TRANSFER AT THE ANCHOR
// (2026-08-19, foreign-import attack 2 of 5: Suen / Janson / Lovász Local
//  Lemma against the anchored dependence term δ)
// ============================================================================
// THE HOLE THIS FIRES AT. `research/history/staging/verify-cofactor-convolution.md`
// §9 says verbatim: "No proof that δ = O(Σ_{q>x} q^{−2}): the averaging over
// mixed patterns is uncontrolled and the @19 sign flip is unexplained."
// δ is defined in that file's §7 by S(0) = N̄·p₀·q₀·(1 + δ), and the report
// measures |δ| = 0.29%..2.02% against a "forced CRT scale"
// F = ∏(1−1/q)²/∏(1−2/q) − 1 = Σ_q 1/(q(q−2)) + … = 0.88%..2.11%.
//
// OBJECTS, from `paper/anchored-note.md` §1, imported by definition and not by
// code. Level x; tile W = x#; the Natal@5 comb
//   N = { r ∈ [0,W) : r ≡ 11 or 17 (mod 30), r mod p ∉ {0, p−2} for 7 ≤ p ≤ x },
// |N| = N̄ = 2·∏_{7≤p≤x}(p−2); scour depth y = largest prime ≤ √W; scour primes
// are the primes q with x < q ≤ y. At the anchor t = 0 the prime q strikes r iff
// q | r or q | r+2. Write ω_s(r) = #{scour q : q | r}. Then
//   L0 = #{r ∈ N : ω_s(r) = 0},  R0 = #{r ∈ N : ω_s(r+2) = 0},
//   S0 = #{r ∈ N : ω_s(r) = ω_s(r+2) = 0} = S(0),
//   p₀ = L0/N̄,  q₀ = R0/N̄,  1 + δ = S0·N̄ / (L0·R0).
// A natal r has no prime factor ≤ x, and a composite natal r < W must have a
// prime factor ≤ y (two factors above y would exceed y'² > W). So
//   ω_s(r) = 0  ⟺  r is prime AND r > y,
// the second clause because a natal prime r ≤ y IS a scour prime and q = r
// strikes r. That clause is the whole difference between 47 and the published
// S(11) = 45; dropping it was this file's first draft and it is recorded here
// because the wrong version looks right. Likewise ω_s(r+2) = 0 ⟺ r+2 prime and
// r+2 > y. So L0, R0, S0 are prime counts on the comb and this file computes
// them by a segmented odd-only sieve — no import from
// research/natal-cap-35-x-multiplicity.js, whose figures this file re-derives.
//
// THE MAPPING (stage 1). Ground set: for each scour prime q the residue
// X_q = r mod q. Bad events A_q^L = {X_q = 0}, A_q^R = {X_q = −2}. For r uniform
// modulo ∏_q q the X_q are EXACTLY independent by CRT, and the natal condition
// lives mod x#, which is coprime to every scour prime, so the natal comb is
// exactly independent of the whole scour vector. On that product measure ν:
//   • two bad events are dependent iff they share a PRIME, never a slot;
//   • the dependency graph is a perfect matching on 2K vertices, max degree 1;
//   • every edge is a mutual exclusion (q | r and q | r+2 would force q | 2), so
//     Janson's Δ = Σ_{i∼j} P(B_i ∧ B_j) = 0 EXACTLY.
// Hence on ν every member of the family (Janson, Suen, lopsided LLL, Harris) is
// exactly tight and adds nothing: P_ν(no strike) = ∏(1−2/q) by factorisation.
// PART B measures that vacuity rather than asserting it.
//
// AND JANSON DOES NOT MERELY GO VACUOUS, IT DOES NOT APPLY. Janson's inequality
// (Alon-Spencer Thm 8.1.1) is stated for events B_i = {A_i ⊆ R} on a random
// subset R with independent inclusions, i.e. for INCREASING events, and it
// asserts ∏P(B̄_i) ≤ P(∧B̄_i) as its lower half. Here P(∧B̄) = ∏(1−2/q) is
// SMALLER than ∏P(B̄_i) = ∏(1−1/q)², by exactly the factor 1/(1+F), so the
// lower half is false for our events. The reason is structural and is worth one
// line: two nonempty up-sets in a finite product lattice always share the top
// element, so two DISJOINT nonempty increasing events cannot exist. A_q^L and
// A_q^R are disjoint and nonempty. No choice of ground set puts the two strike
// orientations into Janson form. The mutual exclusion that makes the problem's
// arithmetic pleasant is exactly what puts it outside the theorem.
//
// PART E therefore runs the one member of the family that does NOT need a
// product space — Suen's inequality on a superdependency digraph, Janson (1998),
// "New versions of Suen's correlation inequality", RSA 13, 467-483, Theorems 2,
// 3 and 8 — against the anchored measure, where the only valid dependency graph
// is the complete one, and prints how vacuous each bound is.
//
// THE TRANSFER (stage 2). The anchored measure is r uniform on N ⊂ [0,W), and
// its scour-residue vector is NOT the product measure, because W = x# is smaller
// than ∏_{x<q≤y} q by a factor e^{y(1+o(1))}. PART C splits δ exactly against ν:
//   (1 + δ)(1 + F) = 1 + ρ,   ρ := β/(π_L·π_R) − 1,
// with β = S0/(N̄∏(1−2/q)), π_L = p₀/∏(1−1/q), π_R = q₀/∏(1−1/q) the three
// normalised sieve ratios `anchored-note.md` §3 and the verify report §7 tabulate.
// So the forced scale F is exactly the ν-part of δ and ρ is exactly the rest.
//
// PRE-REGISTRATION, written before any figure in PART B or C was computed:
//   (PR1) Δ_Janson on the true (matching) dependency graph is 0, not F. It will
//         not match the forced scale, because F is a sum of per-coordinate
//         COVARIANCES and Δ is a sum of pair PROBABILITIES.
//   (PR2) Forcing the family onto one event per prime, A_q = {q | r(r+2)}, makes
//         the graph complete and Δ = (Σ2/q)² − Σ4/q², which is O(1)–O(10): two
//         to three orders of magnitude ABOVE F. So neither reading of Δ matches
//         the forced scale, and Janson's e^{−Δ/2} is a constant-factor tool, not
//         a percent-level one.
//   (PR3) ρ will be of the same order as F but will NOT be bounded by it at
//         every level, and will not be monotone; if it were, δ = O(F) would be
//         a theorem, and PART D argues no importable inequality can supply one.
//   (PR4) Under Hardy–Littlewood plus PNT in progressions, 1 + δ → ∏_{p>x}
//         (1 − 1/(p−1)²), which is 1/(1+F) up to the q > y tail. So the honest
//         prediction for δ is −F/(1+F): the forced scale with a MINUS sign and
//         no free constant. Measured δ is smaller than that at four of five
//         levels, so ρ > 0 is expected at every level.
//
// THE WALL (stage 4). PART D puts the covering question — "some slot in a window
// of length H survives all q ≤ x" — in local-lemma coordinates. The lopsided LLL
// hypothesis is P(A_q | ∩_{q'∈S} Ā_{q'}) ≤ x_q ∏_{q'∼q}(1−x_{q'}) quantified over
// ALL subsets S of the non-neighbours of q. Verifying it for a window of length H
// needs equidistribution of that window modulo ∏_{q'∈S} q'. PART D computes the
// three thresholds this produces.
// ============================================================================

'use strict';

const f = (v, d = 4) => Number.isFinite(v) ? v.toFixed(d) : String(v);
const pct = (v, d = 4) => Number.isFinite(v) ? (100 * v).toFixed(d) + '%' : String(v);

function primesUpTo(n) {
  const s = new Uint8Array(n + 1), o = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return o;
}

// ---------------------------------------------------------------------------
// PART A — exact anchored counts, by segmented odd-only sieve
// ---------------------------------------------------------------------------
// For level x we need, for every natal r ∈ [0, W): is r prime, is r+2 prime.
// Odd-only segmentation; the natal mask is sieved in the same segment rather
// than tested by division, so the cost is O(W loglog W) with a small constant.

function anchoredCounts(x) {
  const base = primesUpTo(x).filter(p => p >= 7);       // the wheel primes 7..x
  let W = 30;
  for (const p of base) W *= p;
  const Nbar = 2 * base.reduce((a, p) => a * (p - 2), 1);

  const root = Math.floor(Math.sqrt(W + 2));
  const bps = primesUpTo(root).filter(p => p > 2);      // odd base primes for the sieve
  const y = bps[bps.length - 1];                        // largest prime ≤ √W
  const scour = primesUpTo(y).filter(q => q > x);

  const SEGO = 1 << 22;                                 // odds per segment
  const comp = new Uint8Array(SEGO + 2);                // primality of the segment's odds (+2 slack)
  const nat = new Uint8Array(SEGO + 1);                 // 0 = natal, 1 = not
  let Ncheck = 0, L0 = 0, R0 = 0, S0 = 0;

  const nseg = Math.ceil(W / (2 * SEGO));
  for (let s = 0; s < nseg; s++) {
    const lo = 1 + 2 * s * SEGO;                        // first odd of the segment
    const hiOdd = lo + 2 * SEGO;                        // one past, as an odd
    comp.fill(0);
    // 1 and any odd < 2 handled below by the explicit r ≥ 7 natal filter.
    for (const p of bps) {
      let start = p * p;
      if (start < lo) { start = Math.ceil(lo / p) * p; if ((start & 1) === 0) start += p; }
      if (start >= hiOdd + 2) continue;
      for (let i = (start - lo) / 2; i <= SEGO + 1; i += p) comp[i] = 1;
    }
    // natal mask: start "not natal" everywhere, clear the 11 and 17 mod 30 odds,
    // then re-mark the two forbidden classes of every wheel prime.
    nat.fill(1);
    for (const c of [11, 17]) {
      let v = lo + ((c - (lo % 30)) % 30 + 30) % 30;    // first ≡ c (mod 30) at or after lo
      for (let i = (v - lo) / 2; i < SEGO; i += 15) nat[i] = 0;
    }
    for (const p of base) {
      const iv = (p + 1) / 2;                           // inverse of 2 mod p
      for (const cls of [0, p - 2]) {
        // r = lo + 2i ≡ cls (mod p)  ⟺  i ≡ (cls − lo)·iv (mod p)
        let i0 = ((((cls - lo) % p) + p) % p) * iv % p;
        for (let i = i0; i < SEGO; i += p) nat[i] = 1;
      }
    }
    const lim = Math.min(SEGO, Math.ceil((W - lo) / 2));
    for (let i = 0; i < lim; i++) {
      if (nat[i]) continue;
      Ncheck++;
      const r = lo + 2 * i;
      const a = !comp[i] && r > y, b = !comp[i + 1] && r + 2 > y;   // survives the scour
      if (a) L0++;
      if (b) R0++;
      if (a && b) S0++;
    }
  }
  return { x, W, Nbar, Ncheck, y, K: scour.length, scour, L0, R0, S0 };
}

// ---------------------------------------------------------------------------
// PART B/C helpers — the product measure ν and the split
// ---------------------------------------------------------------------------
function nuStats(scour) {
  let lnP1 = 0, lnP2 = 0, lnF = 0, s_q2 = 0, s_qm1 = 0, s_qqm2 = 0, mu = 0, s4q2 = 0;
  for (const q of scour) {
    lnP1 += Math.log(1 - 1 / q);                        // ∏(1−1/q)
    lnP2 += Math.log(1 - 2 / q);                        // ∏(1−2/q)
    lnF += Math.log(1 + 1 / (q * (q - 2)));             // ∏(1−1/q)²/∏(1−2/q)
    s_q2 += 1 / (q * q);
    s_qm1 += 1 / ((q - 1) * (q - 1));
    s_qqm2 += 1 / (q * (q - 2));
    mu += 2 / q;
    s4q2 += 4 / (q * q);
  }
  return {
    P1: Math.exp(lnP1), P2: Math.exp(lnP2),
    F: Math.expm1(lnF),                                 // the forced scale, exactly
    s_q2, s_qm1, s_qqm2, mu,
    DeltaMatch: 0,                                      // true dependency graph: mutual exclusion
    DeltaComplete: mu * mu - s4q2,                      // one-event-per-prime reading
  };
}

// tail ∏_{p>y}(1 − 1/(p−1)²) as 1 − Σ_{p>y} 1/(p−1)², estimated by ∫ dt/(t ln t · t)
function tailProd(y) { return 1 - 1 / (y * Math.log(y)); }

// ---------------------------------------------------------------------------
// PART D — the wall in local-lemma coordinates
// ---------------------------------------------------------------------------
// (i) PAIRWISE HORIZON. Draw the dependency graph the way one draws it: join q,
//     q' iff the window of length H fails to equidistribute mod q·q', i.e. iff
//     q·q' > H. With H ≥ x² no pair of primes ≤ x is joined and the graph is
//     EMPTY, so the LLL would certify a survivor at H = x². That is exactly the
//     p² rule. The hypothesis, however, quantifies over all SETS S.
// (ii) SET-WISE / COMPLETE GRAPH. If no set beyond a pair can be verified, the
//     graph must be taken complete and the asymmetric LLL condition
//     2/q ≤ x_q ∏_{q'≠q}(1−x_{q'}) with x_q = c/q becomes 2 ≤ c·∏_{p≤x}(1−c/p),
//     which is the Mertens wall. Reported below as the largest feasible x.
// (iii) THE ADMISSIBLE REPAIR. Verify the hypothesis only for sets S with
//     ∏_{q∈S} q ≤ H, i.e. |S| ≤ m ≈ ln H/ln x. That is Bonferroni truncation at
//     depth m, i.e. Brun's pure sieve, and the exponent it certifies is computed
//     below and compared with `research/sift-limit-attack.md` §7's β_pure.
function lllWall() {
  const rows = [];
  for (const x of [5, 7, 11, 13, 17, 19, 23, 29, 101, 199, 227, 229, 439, 1009, 1000003]) {
    const ps = primesUpTo(x).filter(p => p >= 5);
    // (ii) complete-graph asymmetric LLL with weights c/p: max_c c·∏(1−c/p) vs 2
    let best = 0, bestc = 0;
    for (let c = 0.01; c <= 8.0001; c += 0.01) {
      let lg = 0, ok = true, worst = -Infinity;
      for (const p of ps) { if (c / p >= 1) { ok = false; break; } lg += Math.log(1 - c / p); worst = Math.max(worst, Math.log(1 - c / p)); }
      if (!ok) continue;
      // condition for every p: 2 <= c * prod_{p' != p}(1 - c/p'); the binding p is
      // the one whose own factor is largest, i.e. the largest prime.
      const v = c * Math.exp(lg - worst);
      if (v > best) { best = v; bestc = c; }
    }
    const mert = ps.reduce((a, p) => a + 2 / p, 0);
    // (iii) Bonferroni depth: smallest even m with e_{m+1} < ∏(1−2/p), e_j the
    // elementary symmetric functions of {2/p}. Computed exactly, not by Stirling.
    let e = [1];
    for (const p of ps) {
      const t = 2 / p, ne = e.slice();
      ne.push(0);
      for (let j = e.length; j >= 1; j--) ne[j] = e[j - 1] * t + (e[j] || 0);
      e = ne;
    }
    const prod2 = ps.reduce((a, p) => a * (1 - 2 / p), 1);
    while (e.length < 4) e.push(0);
    let m0 = -1;
    for (let m = 0; m + 1 < e.length; m += 2) { if (e[m + 1] < prod2) { m0 = m; break; } }
    // exponent: the depth-m error term is Σ_{j≤m} 2^j C(π,j) ≈ (2π(x))^m/m!, so
    // ln H ≥ ln(that / main), and θ = ln H / ln x.
    let theta = NaN;
    if (m0 >= 0) {
      const pi = ps.length;
      let lnErr = 0;
      for (let j = 1; j <= m0; j++) lnErr = Math.max(lnErr, j * Math.log(2 * pi / j) + j);
      theta = (lnErr - Math.log(Math.max(prod2 - e[m0 + 1], 1e-300))) / Math.log(x);
    }
    rows.push({ x, mert, bestc, best, feasible: best >= 2, m0, theta, pairwise: 2 });
  }
  return rows;
}

// ---------------------------------------------------------------------------
// PART E — Suen's inequality, actually applied, on the anchored measure
// ---------------------------------------------------------------------------
// Janson (1998) Thm 2:  P(S=0) ≤ exp(−μ + Δ·e^{2δ})
//              Thm 3:  P(S=0) ≤ exp(−min(μ²/8Δ, μ/6δ, μ/2))
//              Thm 8:  P(S=0) ≥ (1 − Δ₀*·e^{Δ*})·∏(1−p_k)
// with one event per scour prime, I_q = 1{q | r(r+2)}, p_q = 2/q; μ = Σp_q;
// Δ = Σ_{{i,j}: i∼j} E(I_iI_j) over UNORDERED pairs (Janson's Remark 4 warns of
// the factor-2 convention); δ = max_i Σ_{j∼i} p_j.
//
// THE GRAPH MUST BE COMPLETE. Janson's Remark 3 requires a dependency graph in
// the STRONG sense and gives an explicit counterexample for the pairwise notion.
// On the anchored measure the residues (r mod q) of r ∈ [0,W) are jointly
// dependent for every subset of scour primes with ∏q > W, so no proper subgraph
// is admissible and the complete graph is the only valid choice. Then
// ∏_{k∼{i,j}}(1−p_k)^{−1} = (1−p_i)(1−p_j)/∏_k(1−p_k), which is what makes
// Thm 8's Δ* explode. E(I_iI_j) is taken at its ν value p_ip_j; the true
// anchored pair correlations differ by percents and the vacuity margin below is
// tens of orders of magnitude, so the substitution changes nothing.
function suen(scour, P2) {
  let mu = 0, s2 = 0;
  for (const q of scour) { mu += 2 / q; s2 += 4 / (q * q); }
  const Delta = (mu * mu - s2) / 2;                    // unordered pairs
  const dmax = mu - 2 / scour[scour.length - 1];       // max_i sum_{j~i} p_j
  // Δ* and Δ₀* with the complete graph: weight (1-p_i)(1-p_j)/P2 on each pair.
  // Σ_{i<j} p_i p_j (1-p_i)(1-p_j) = ((Σ p(1-p))² − Σ p²(1-p)²)/2
  let a = 0, b = 0;
  for (const q of scour) { const pq = 2 / q; a += pq * (1 - pq); b += pq * pq * (1 - pq) * (1 - pq); }
  const DeltaStar = ((a * a - b) / 2) / P2;
  const Delta0Star = DeltaStar;                        // Δ₀ ≤ Δ here; same order
  return {
    mu, Delta, dmax, DeltaStar, Delta0Star,
    t2: -mu + Delta * Math.exp(2 * dmax),              // Thm 2 exponent
    t3: -Math.min(mu * mu / (8 * Delta), mu / (6 * dmax), mu / 2),
    t8: 1 - Delta0Star * Math.exp(DeltaStar),          // Thm 8 bracket
  };
}

// ---------------------------------------------------------------------------
// RUN
// ---------------------------------------------------------------------------
const LEVELS = (process.argv[2] ? process.argv[2].split(',').map(Number) : [11, 13, 17, 19, 23]);

console.log('IMPORT-SUEN 01 — correlation inequalities against the anchored dependence δ');
console.log('levels: ' + LEVELS.join(', '));

console.log('\n=== PART A — exact anchored counts (independent segmented sieve) ===');
console.log('x  |  W          | N̄        | y     | K     | L0       | R0       | S0       | N̄ ok');
const A = [];
for (const x of LEVELS) {
  const a = anchoredCounts(x);
  A.push(a);
  console.log([
    String(x).padStart(2), String(a.W).padStart(11), String(a.Nbar).padStart(9),
    String(a.y).padStart(5), String(a.K).padStart(5), String(a.L0).padStart(8),
    String(a.R0).padStart(8), String(a.S0).padStart(8),
    (a.Ncheck === a.Nbar ? 'PASS' : 'FAIL ' + a.Ncheck)
  ].join(' | '));
}

console.log('\n=== PART B — the product measure ν: dependency structure and Janson Δ ===');
console.log('true dependency graph: perfect matching on 2K vertices, max degree 1,');
console.log('every edge a mutual exclusion, so Janson Δ_match = 0 exactly at every level.');
console.log('x  | K     | mu=Σ2/q | Δ_match | Δ_complete | F (forced scale) | Σ1/(q(q−2)) | Σ1/q²    | Σ1/(q−1)²');
const B = [];
for (const a of A) {
  const n = nuStats(a.scour);
  B.push(n);
  console.log([
    String(a.x).padStart(2), String(a.K).padStart(5), f(n.mu, 5).padStart(7),
    f(n.DeltaMatch, 1).padStart(7), f(n.DeltaComplete, 4).padStart(10),
    pct(n.F, 4).padStart(16), pct(n.s_qqm2, 4).padStart(11),
    pct(n.s_q2, 4).padStart(8), pct(n.s_qm1, 4).padStart(9)
  ].join(' | '));
}
console.log('ratio Δ_complete / F, i.e. how far Janson\'s error term sits from the forced scale:');
console.log('  ' + A.map((a, i) => `@${a.x}: ${f(B[i].DeltaComplete / B[i].F, 1)}×`).join('   '));

console.log('\n=== PART C — the exact split (1+δ)(1+F) = 1+ρ, and the HL prediction ===');
console.log('x  | δ measured | F forced  | δ_HL=−F/(1+F) | ρ = β/(π_Lπ_R)−1 | ρ/F   | ρ−F      | identity');
const C = [];
for (let i = 0; i < A.length; i++) {
  const a = A[i], n = B[i];
  const delta = (a.S0 * a.Nbar) / (a.L0 * a.R0) - 1;
  const rho = (1 + delta) * (1 + n.F) - 1;
  const dHL = 1 / (1 + n.F) - 1;
  const dHLtail = tailProd(a.y) / (1 + n.F) - 1;
  C.push({ delta, rho, dHL, dHLtail, F: n.F });
  console.log([
    String(a.x).padStart(2), pct(delta, 4).padStart(10), pct(n.F, 4).padStart(9),
    pct(dHL, 4).padStart(13), pct(rho, 4).padStart(16),
    f(rho / n.F, 3).padStart(5),
    pct(rho - n.F, 4).padStart(9),
    ((rho > n.F) === (delta > 0) ? 'ok' : 'ARITHMETIC FAIL')
  ].join(' | '));
}
console.log('cross-check against the three published ratios (β, π_L, π_R) — computed here, not imported:');
console.log('x  | β = S0/(N̄∏(1−2/q)) | π_L      | π_R      | π_L·π_R  | β/(π_Lπ_R)−1 = ρ');
for (let i = 0; i < A.length; i++) {
  const a = A[i], n = B[i];
  const beta = a.S0 / (a.Nbar * n.P2);
  const pL = (a.L0 / a.Nbar) / n.P1, pR = (a.R0 / a.Nbar) / n.P1;
  console.log([
    String(a.x).padStart(2), f(beta, 5).padStart(19), f(pL, 5).padStart(8),
    f(pR, 5).padStart(8), f(pL * pR, 5).padStart(8),
    pct(beta / (pL * pR) - 1, 4).padStart(16)
  ].join(' | '));
}
console.log('HL prediction with the q > y tail restored, δ_HL = ∏_{p>x}(1−1/(p−1)²) − 1:');
console.log('  ' + A.map((a, i) => `@${a.x}: ${pct(C[i].dHLtail, 4)}`).join('   '));
console.log('measured δ minus HL-predicted δ (this difference IS the HL relative error at W = x#):');
console.log('  ' + A.map((a, i) => `@${a.x}: ${pct(C[i].delta - C[i].dHLtail, 4)}`).join('   '));

console.log('\n=== PART E — Suen (Janson 1998) applied, complete graph, anchored measure ===');
console.log('x  | mu      | Δ (unord) | δ=max_i Σ_{j~i}p_j | Δ*        | Thm2 exponent | Thm3 bound | Thm8 bracket | truth S0/N̄');
for (let i = 0; i < A.length; i++) {
  const a = A[i], n = B[i];
  const S = suen(a.scour, n.P2);
  console.log([
    String(a.x).padStart(2), f(S.mu, 5).padStart(7), f(S.Delta, 4).padStart(9),
    f(S.dmax, 5).padStart(18), f(S.DeltaStar, 3).padStart(9),
    ('+' + f(S.t2, 1)).padStart(13), f(Math.exp(S.t3), 5).padStart(10),
    S.t8.toExponential(2).padStart(12), f(a.S0 / a.Nbar, 6).padStart(11)
  ].join(' | '));
}
console.log('Thm 2 exponent is positive at every level, so its bound exceeds 1 and says nothing.');
console.log('Thm 3 is an UPPER bound on the survival probability, the wrong direction for');
console.log('Assumption A, and it is loose by the ratio printed next:');
console.log('  ' + A.map((a, i) => `@${a.x}: ${f(Math.exp(suen(a.scour, B[i].P2).t3) / (a.S0 / a.Nbar), 2)}×`).join('   '));
console.log('Thm 8 is the lower bound the programme needs. Its bracket 1 − Δ₀*e^{Δ*} is');
console.log('positive only at @11 and negative from @13 on, by the magnitudes printed next');
console.log('(a negative bracket means the theorem asserts P(S=0) >= a negative number):');
console.log('  ' + A.map((a, i) => { const S = suen(a.scour, B[i].P2); return `@${a.x}: 10^${f(Math.log10(Math.abs(S.t8)), 1)}`; }).join('   '));

console.log('\n=== PART D — the wall in local-lemma coordinates ===');
console.log('(i)  pairwise horizon: graph empty iff q·q\' ≤ H for all q,q\' ≤ x, i.e. H ≥ x². θ = 2.');
console.log('(ii) complete graph (set-wise hypothesis unverifiable): need max_c c·∏_{5≤p≤x}(1−c/p) ≥ 2.');
console.log('(iii) admissible repair: |S| ≤ m with x^m ≤ H, i.e. Bonferroni depth m, i.e. Brun pure sieve.');
console.log('x       | Σ_{5≤p≤x}2/p | best c | max c∏(1−c/p) | (ii) feasible | m₀ (depth) | θ_pure = lnH/lnx');
for (const r of lllWall()) {
  console.log([
    String(r.x).padStart(7), f(r.mert, 4).padStart(12), f(r.bestc, 2).padStart(6),
    f(r.best, 5).padStart(13), (r.feasible ? 'yes' : 'NO').padStart(13),
    String(r.m0).padStart(10), f(r.theta, 3).padStart(16)
  ].join(' | '));
}
console.log('θ targets for comparison: pairwise horizon 2 (= the p² rule); best published');
console.log('dimension-2 sifting limit β₂ = 4.26645028414864191641 (research/SEARCH-CONVENTIONS.md §4).');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/import-suen-01-transfer.js -- 11,13,17,19,23,29,31
//   invocation:  node research/import-suen-01-transfer.js 11,13,17,19,23,29,31
//   code-sha256: 53704d51d57452346168d4d407e5534cdef6c17e3ce8f34e12ba58c2e5b12eed
//   out-sha256:  eb59337f2721dbfe5ec8706d9b06d9c54258f3abd891a83b14e5d2c0e646c5c9
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     576.1 s
// ============================================================================
// IMPORT-SUEN 01 — correlation inequalities against the anchored dependence δ
// levels: 11, 13, 17, 19, 23, 29, 31
//
// === PART A — exact anchored counts (independent segmented sieve) ===
// x  |  W          | N̄        | y     | K     | L0       | R0       | S0       | N̄ ok
// 11 |        2310 |        90 |    47 |    10 |       62 |       64 |       45 | PASS
// 13 |       30030 |       990 |   173 |    34 |      558 |      547 |      307 | PASS
// 17 |      510510 |     14850 |   709 |   120 |     6813 |     6775 |     3099 | PASS
// 19 |     9699690 |    252450 |  3109 |   435 |    98340 |    98245 |    38380 | PASS
// 23 |   223092870 |   5301450 | 14929 |  1739 |  1784710 |  1783974 |   597475 | PASS
// 29 |  6469693230 | 143139150 | 80429 |  7863 | 42074348 | 42072589 | 12307838 | PASS
// 31 | 200560490130 | 4151035350 | 447829 | 37534 | 1087136413 | 1087113427 | 283449187 | PASS
//
// === PART B — the product measure ν: dependency structure and Janson Δ ===
// true dependency graph: perfect matching on 2K vertices, max degree 1,
// every edge a mutual exclusion, so Janson Δ_match = 0 exactly at every level.
// x  | K     | mu=Σ2/q | Δ_match | Δ_complete | F (forced scale) | Σ1/(q(q−2)) | Σ1/q²    | Σ1/(q−1)²
// 11 |    10 | 0.78909 |     0.0 |     0.5483 |          2.1086% |     2.0908% |  1.8586% |   2.0826%
// 13 |    34 | 1.14676 |     0.0 |     1.2525 |          1.7084% |     1.6956% |  1.5632% |   1.6922%
// 17 |   120 | 1.49379 |     0.0 |     2.1798 |          1.3856% |     1.3771% |  1.2902% |   1.3752%
// 19 |   435 | 1.78566 |     0.0 |     3.1475 |          1.0878% |     1.0824% |  1.0281% |   1.0814%
// 23 |  1739 | 2.05259 |     0.0 |     4.1795 |          0.8819% |     0.8783% |  0.8420% |   0.8778%
// 29 |  7863 | 2.30539 |     0.0 |     5.2859 |          0.7537% |     0.7511% |  0.7236% |   0.7507%
// 31 | 37534 | 2.52361 |     0.0 |     6.3438 |          0.6419% |     0.6399% |  0.6196% |   0.6397%
// ratio Δ_complete / F, i.e. how far Janson's error term sits from the forced scale:
//   @11: 26.0×   @13: 73.3×   @17: 157.3×   @19: 289.3×   @23: 473.9×   @29: 701.3×   @31: 988.3×
//
// === PART C — the exact split (1+δ)(1+F) = 1+ρ, and the HL prediction ===
// x  | δ measured | F forced  | δ_HL=−F/(1+F) | ρ = β/(π_Lπ_R)−1 | ρ/F   | ρ−F      | identity
// 11 |    2.0665% |   2.1086% |      -2.0651% |          4.2187% | 2.001 |   2.1101% | ok
// 13 |   -0.4246% |   1.7084% |      -1.6797% |          1.2765% | 0.747 |  -0.4319% | ok
// 17 |   -0.2988% |   1.3856% |      -1.3667% |          1.0827% | 0.781 |  -0.3030% | ok
// 19 |    0.2859% |   1.0878% |      -1.0761% |          1.3767% | 1.266 |   0.2890% | ok
// 23 |   -0.5149% |   0.8819% |      -0.8742% |          0.3625% | 0.411 |  -0.5194% | ok
// 29 |   -0.4770% |   0.7537% |      -0.7481% |          0.2732% | 0.362 |  -0.4806% | ok
// 31 |   -0.4428% |   0.6419% |      -0.6378% |          0.1963% | 0.306 |  -0.4456% | ok
// cross-check against the three published ratios (β, π_L, π_R) — computed here, not imported:
// x  | β = S0/(N̄∏(1−2/q)) | π_L      | π_R      | π_L·π_R  | β/(π_Lπ_R)−1 = ρ
// 11 |             1.14581 |  1.03202 |  1.06531 |  1.09943 |          4.2187%
// 13 |             1.00893 |  1.00809 |  0.98822 |  0.99622 |          1.2765%
// 17 |             0.95486 |  0.97464 |  0.96921 |  0.94463 |          1.0827%
// 19 |             0.92613 |  0.95626 |  0.95534 |  0.91355 |          1.3767%
// 23 |             0.89305 |  0.94350 |  0.94311 |  0.88982 |          0.3625%
// 29 |             0.87515 |  0.93424 |  0.93420 |  0.87277 |          0.2732%
// 31 |             0.86259 |  0.92786 |  0.92784 |  0.86090 |          0.1963%
// HL prediction with the q > y tail restored, δ_HL = ∏_{p>x}(1−1/(p−1)²) − 1:
//   @11: -2.6063%   @13: -1.7900%   @17: -1.3879%   @19: -1.0800%   @23: -0.8749%   @29: -0.7482%   @31: -0.6378%
// measured δ minus HL-predicted δ (this difference IS the HL relative error at W = x#):
//   @11: 4.6728%   @13: 1.3654%   @17: 1.0891%   @19: 1.3659%   @23: 0.3600%   @29: 0.2712%   @31: 0.1950%
//
// === PART E — Suen (Janson 1998) applied, complete graph, anchored measure ===
// x  | mu      | Δ (unord) | δ=max_i Σ_{j~i}p_j | Δ*        | Thm2 exponent | Thm3 bound | Thm8 bracket | truth S0/N̄
// 11 | 0.78909 |    0.2742 |            0.74654 |     0.518 |          +0.4 |    0.83848 |      1.31e-1 |    0.500000
// 13 | 1.14676 |    0.6263 |            1.13520 |     1.826 |          +4.9 |    0.84505 |     -1.03e+1 |    0.310101
// 17 | 1.49379 |    1.0899 |            1.49097 |     4.654 |         +20.0 |    0.84621 |     -4.88e+2 |    0.208687
// 19 | 1.78566 |    1.5737 |            1.78502 |     9.157 |         +54.1 |    0.84643 |     -8.68e+4 |    0.152030
// 23 | 2.05259 |    2.0897 |            2.05246 |    16.027 |        +124.7 |    0.84647 |     -1.46e+8 |    0.112700
// 29 | 2.30539 |    2.6429 |            2.30537 |    26.235 |        +263.5 |    0.84648 |    -6.50e+12 |    0.085985
// 31 | 2.52361 |    3.1719 |            2.52360 |    39.292 |        +491.0 |    0.84648 |    -4.56e+18 |    0.068284
// Thm 2 exponent is positive at every level, so its bound exceeds 1 and says nothing.
// Thm 3 is an UPPER bound on the survival probability, the wrong direction for
// Assumption A, and it is loose by the ratio printed next:
//   @11: 1.68×   @13: 2.73×   @17: 4.05×   @19: 5.57×   @23: 7.51×   @29: 9.84×   @31: 12.40×
// Thm 8 is the lower bound the programme needs. Its bracket 1 − Δ₀*e^{Δ*} is
// positive only at @11 and negative from @13 on, by the magnitudes printed next
// (a negative bracket means the theorem asserts P(S=0) >= a negative number):
//   @11: 10^-0.9   @13: 10^1.0   @17: 10^2.7   @19: 10^4.9   @23: 10^8.2   @29: 10^12.8   @31: 10^18.7
//
// === PART D — the wall in local-lemma coordinates ===
// (i)  pairwise horizon: graph empty iff q·q' ≤ H for all q,q' ≤ x, i.e. H ≥ x². θ = 2.
// (ii) complete graph (set-wise hypothesis unverifiable): need max_c c·∏_{5≤p≤x}(1−c/p) ≥ 2.
// (iii) admissible repair: |S| ≤ m with x^m ≤ H, i.e. Bonferroni depth m, i.e. Brun pure sieve.
// x       | Σ_{5≤p≤x}2/p | best c | max c∏(1−c/p) | (ii) feasible | m₀ (depth) | θ_pure = lnH/lnx
//       5 |       0.4000 |   5.00 |       5.00000 |           yes |          0 |            1.000
//       7 |       0.6857 |   2.50 |       1.25000 |            NO |          2 |            2.176
//      11 |       0.8675 |   1.92 |       0.85832 |            NO |          2 |            2.213
//      13 |       1.0214 |   1.68 |       0.71831 |            NO |          2 |            2.418
//      17 |       1.1390 |   1.51 |       0.63031 |            NO |          2 |            2.488
//      19 |       1.2443 |   1.41 |       0.57626 |            NO |          2 |            2.750
//      23 |       1.3312 |   1.32 |       0.53495 |            NO |          2 |            3.444
//      29 |       1.4002 |   1.26 |       0.50497 |            NO |          4 |            3.322
//     101 |       1.9588 |   0.94 |       0.36180 |            NO |          4 |            3.864
//     199 |       2.2314 |   0.84 |       0.31917 |            NO |          6 |            4.672
//     227 |       2.2587 |   0.83 |       0.31541 |            NO |          6 |            4.642
//     229 |       2.2674 |   0.82 |       0.31426 |            NO |          6 |            4.661
//     439 |       2.4841 |   0.76 |       0.28795 |            NO |          6 |            4.836
//    1009 |       2.7315 |   0.70 |       0.26292 |            NO |          8 |            5.915
// 1000003 |       4.1080 |   0.48 |       0.17713 |            NO |         12 |            9.442
// θ targets for comparison: pairwise horizon 2 (= the p² rule); best published
// dimension-2 sifting limit β₂ = 4.26645028414864191641 (research/SEARCH-CONVENTIONS.md §4).
// ==========================================================================
// READINGS
//
// 1. THE INSTRUMENT AGREES WITH EVERYTHING IT SHOULD, AND EXTENDS IT ONE LEVEL.
//    PART A reproduces paper/anchored-note.md §3's S(19) = 38,380,
//    S(23) = 597,475, S(29) = 12,307,838 and S(31) = 283,449,187 to the unit,
//    and its L0 at @23 is
//    1,784,710, the exact figure verify-cofactor-convolution.md §2 reports for
//    the repaired i = 0 cell. PART C's β, π_L and π_R reproduce that report's
//    §7 table to all five printed digits at all five of its levels. Nothing here
//    imports a number from natal-cap-35-x-multiplicity.js or from any
//    natal-cap-* file; the sieve is written from anchored-note.md §1's
//    definitions alone.
//
// 2. JANSON'S Δ IS ZERO, EXACTLY, AT EVERY LEVEL, AND THAT IS THE WHOLE STORY
//    ON THE PRODUCT MEASURE. The dependency graph of the 2K strike events is a
//    perfect matching, one edge per scour prime, and every edge is a mutual
//    exclusion because q | r and q | r+2 would force q | 2. So Δ = 0 and every
//    bound in the family collapses to the exact product ∏(1−2/q). PART B's
//    Δ_match column is that, level by level. There is no slack for an
//    inequality to occupy.
//
// 3. THE PRE-REGISTERED ANSWER ON Δ VERSUS THE FORCED SCALE IS CONFIRMED, AND
//    THE MISMATCH GROWS. Forcing one event per prime instead — the only reading
//    under which Δ is nonzero — gives Δ_complete = 0.5483 to 6.3438 across
//    @11..@31 against a forced scale F of 2.1086% down to 0.6419%, a ratio
//    running 26.0×, 73.3×, 157.3×, 289.3×, 473.9×, 701.3×, 988.3×. The
//    pre-registration said two to three orders of magnitude; at @11 it is 1.4
//    orders, so PR2 is optimistic at the shallow end. Janson's e^{−Δ/2} is
//    a constant-factor instrument aimed at a sub-percent target, and the aim
//    gets worse with x, not better.
//
// 4. THE FORCED SCALE IS THE HARDY-LITTLEWOOD PREDICTION FOR δ, NOT A BOUND ON
//    IT. The identity (1+δ)(1+F) = 1+ρ is exact by construction, and the
//    δ_HL = −F/(1+F) column is what δ must become if ρ → 0. Measured δ minus
//    HL-predicted δ falls 4.6728%, 1.3654%, 1.0891%, 1.3659%, 0.3600%, 0.2712%,
//    0.1950% across the seven levels. So δ is the forced scale with a MINUS sign plus a
//    residual that is decaying, and the report's reading of |δ| ≲ F as evidence
//    of near-independence has the sign of the main term backwards.
//
// 5. δ IS NOT BOUNDED BY THE FORCED SCALE. ρ/F = 2.001, 0.747, 0.781, 1.266,
//    0.411, 0.362, 0.306. At @11 and @19 the residual exceeds the forced scale, and
//    since δ = ρ − F to second order that is exactly where δ comes out positive:
//    +2.0665% at @11 and +0.2859% at @19 against negatives elsewhere.
//
// 6. THE @19 SIGN FLIP NEEDS NO MECHANISM. δ is a difference of two positive
//    quantities of the same order, one of them (F) smooth and monotone
//    decreasing, the other (ρ) an error term measured at 4.2187%, 1.2765%,
//    1.0827%, 1.3767%, 0.3625%, 0.2732%, 0.1963%. ρ rises from @17 to @19 and
//    crosses F;
//    that is the flip, and it is the second crossing, the first being between
//    @11 and @13. A sign-definite δ would have been the anomaly.
//
// 7. SUEN'S INEQUALITY, ACTUALLY APPLIED, IS VACUOUS FROM @13 ONWARD, AND THE
//    NUMBER IS 10^18.7 AT @31. PART E runs Janson (1998) Theorems 2, 3 and 8 on
//    the anchored measure, where Remark 3 forces the complete dependency graph.
//    Theorem 2's exponent is +0.4, +4.9, +20.0, +54.1, +124.7, +263.5, +491.0 —
//    positive at every level, so the bound exceeds 1. Theorem 3 gives 0.83848 to
//    0.84648, an upper bound on survival that is loose by 1.68× to 12.40× and
//    points the wrong way for Assumption A anyway. Theorem 8, the lower bound the
//    programme actually needs, has bracket 1 − Δ₀*e^{Δ*} positive only at @11,
//    at 1.31e-1, and negative from @13 on at -1.03e+1, -4.88e+2, -8.68e+4,
//    -1.46e+8, -6.50e+12, -4.56e+18. The tool the brief named
//    first has exactly one level of content and it is the smallest one.
//
// 8. THE LOCAL LEMMA'S PAIRWISE HORIZON IS EXACTLY H = x², THE TARGET. Join
//    q ∼ q' iff a window of length H fails to equidistribute mod q·q'. At
//    H ≥ x² no pair of primes ≤ x is joined, the graph is empty, and the local
//    lemma would certify a survivor at H = x², which is the p² rule and the twin
//    prime conjecture. The step that fails is the quantifier: Erdős-Spencer's
//    lopsidependency asks for P(A_i | ∧_{j∈S} Ā_j) ≤ x_i ∏(1−x_j) for ALL
//    S ⊆ [n]∖(N(i)∪{i}), and verifying that needs equidistribution modulo
//    ∏_{q∈S} q, which at |S| = π(x) is x# and not x².
//
// 9. THE SET-WISE VERSION DIES AT x = 7, EARLIER THAN THE UNION BOUND. PART D's
//    (ii) column: max_c c·∏_{p≠q}(1−c/p) reads 5.00000, 1.25000, 0.85832,
//    0.71831, 0.63031, 0.57626, 0.53495, 0.50497 at x = 5..29 against a required
//    2. The Mertens sum Σ_{5≤p≤x}2/p crosses 1 between x = 11 and x = 13, which
//    is where sift-limit-attack.md §7's covering economy dies; the local lemma's
//    condition is strictly stronger and dies two primes earlier. This is the
//    same wall, reached from a new direction, and nothing in REFUTED.md's
//    covering-economy row is re-opened by it.
//
// 10. THE ADMISSIBLE REPAIR IS BRUN'S PURE SIEVE AND IT LANDS AT Θ(lnln x).
//     Truncating the hypothesis to sets with ∏_{q∈S}q ≤ H is Bonferroni at
//     depth m = ln H/ln x. The exact depths are 2, 2, 2, 2, 4, 4, 6, 6, 8, 12 at
//     x = 11..10⁶ and the exponents 2.213, 2.418, 2.488, 2.750, 3.444, 3.322,
//     3.864, 4.672, 4.836, 5.915, 9.442. The crossing of the published
//     dimension-2 sifting limit happens between
//     x = 101 and x = 199 and never reverses. These are the same object
//     sift-limit-attack.md §7 tables as β_pure, computed from a different
//     starting point with a cruder error accounting, agreeing to about 10% and
//     diverging identically.
//
// 11. WHAT BLOCKS THE WALL IS NEITHER DEGREE NOR EXPECTED KILLS. Degree is 0 at
//     the pairwise horizon. The expected kill count μ = Σ2/q is 2.05259 at @23
//     and 2.52361 at @31, comfortable for any of these theorems. The binding
//     quantity is the admissible conditioning-set modulus ∏_{q∈S} q ≤ H, which
//     caps |S| at ln H/ln x. Every exponent in reading 10 is that cap priced.
//
// 12. REACH. Seven levels, @11..@31, in 576.1 s, of which @31 (W = 2.0e11) is
//     nearly all. @37 is 37× @31 and was not attempted. PART D's LLL sweep runs to
//     x = 10⁶ and is arithmetic, not enumeration, so it carries no level ceiling
//     of its own. Every Suen quantity in PART E uses ν-values p_ip_j for the
//     pair expectations; the true anchored pair correlations differ by percents
//     and the vacuity margins are up to 10^18.7, so nothing turns on it.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). One figure
// here is not in the OUTPUT block. No number above was changed.
//
// ROUNDING of a value this file's own OUTPUT prints: W at @31 is printed in
//   full as 200560490130 and quoted as 2.0e11.
// ---------------------------------------------------------------------------
