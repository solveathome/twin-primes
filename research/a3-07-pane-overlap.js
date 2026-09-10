'use strict';
// ============================================================================
// A3-07 — THE PANE BOUND THROUGH OVERLAP
// (2026-08-16, attacks-3 wave, ATTACKS3.md A7, marked [I] = interval)
// ============================================================================
// OBJECT. The PANE is the window (n^2, (n+2)^2), width W = 4n+4. Its SLOTS
// are the Natal@5 twin positions r ≡ 11 or 17 (mod 30) with the whole pair
// (r, r+2) strictly inside, about W/15 of them. A slot is KILLED by a prime q
// if r ≡ 0 or −2 (mod q). The PANE BOUND is a proven upper bound on the kill
// count lying strictly below the slot count; by pigeonhole it forces a
// survivor, and a survivor in a pane is a genuine twin pair.
//
// SETTLED ALREADY, not re-derived here:
//   capacity/slots = 2·Σ_{7≤q≤n} 1/q ≈ 2(lnln n − 0.772), verified at 1.32,
//   1.94, 2.33, 2.61, 2.89, 3.13 for n = 100 … 30000. It exceeds 1 and grows,
//   so the naive strike count overshoots and can never be the bound. What a
//   Pane Bound must therefore bound is OVERLAP: strikes landing on slots that
//   are already dead. Writing K for kills, S1 for capacity, Ω = S1 − K for
//   overlap, the target K < s is exactly
//                        Ω  >  S1 − s   =  s·(2Σ1/q − 1).
//   So the Pane Bound is a LOWER bound on overlap, and it must reach 2.13·s at
//   n = 3·10^4 and 2(lnln n − 0.772) − 1 → ∞ thereafter.
//
// COMPLETENESS OF THE SIEVE SET (PROVEN, and it is why q ≤ n suffices).
//   A killed slot needs a prime factor of r or r+2 that is ≤ n. Both lie below
//   (n+2)^2, so the least prime factor of a composite among them is ≤ n+1. The
//   only ways lpf = n+1 with the number below (n+2)^2 are (n+1)^2 and
//   (n+1)(n+2) with n+2 also having no factor below n+1. Squares mod 30 are
//   {0,1,4,6,9,10,15,16,19,21,24,25}, and 11, 13, 17, 19 are the residues our
//   slots and their partners occupy, so neither r nor r+2 can be (n+1)^2; and
//   (n+1)(n+2) needs n+1 and n+2 both prime, impossible above 3. Hence the
//   primes 7 ≤ q ≤ n destroy every non-twin slot, and slots + twins = kills is
//   an identity, not an approximation. The program checks it at every n.
//
// WHAT THIS FILE DOES.
//   E1  exact enumeration in the pane: slots, kills, twins, capacity, and the
//       full MULTIPLICITY DISTRIBUTION #{r : m(r) = j}, m(r) = how many of the
//       primes 7..n strike r. Checked against the 2026-08-16 ground truth.
//   E2  the CRT prediction of that distribution. By CRT the events "q strikes
//       r" are exactly independent with probability 2/q over a full period
//       Π q, so the predicted profile is the Poisson-binomial in {2/q}. The
//       pane is a window of width 4n+4 inside a period of size e^{n(1+o(1))},
//       so this is a HEURISTIC, and its j = 0 entry IS the twin count: taking
//       it as true is taking the conjecture as true. Measured against E1.
//   E3  the Bonferroni ladder. |∪A_q| ≤ S1 − S2 + S3 − … truncated after any
//       odd order is a genuine upper bound. Exact S_k = Σ_r C(m(r), k) from
//       E1; the required depth t*(n); and the remainder budget a proof would
//       have to pay at each depth.
//   E4  the affordable-sieve family. For any cutoff z,
//              K ≤ K_{≤z} + Σ_{z<q≤n} k_q,      i.e.   Ω ≥ Ω_{≤z},
//       a true inequality for every z. The provable overlap credit is exactly
//       the overlap among the primes one can afford to sieve with. Scanned
//       over all z: where does it first enter the corridor, and where do the
//       real sieve ceilings sit?
//   E5  the accessibility split. A pair (q, q') can only contribute overlap a
//       sieve can see if qq' ≤ W, since otherwise the four residue classes mod
//       qq' meet the pane in 0 or 1 points and no equidistribution statement is
//       available. Measures how much of the needed overlap is invisible.
//   E5b the de-duplicated version of E5: per slot, the graph on its strikers
//       with an edge when qq' <= W. Visible pairwise evidence can certify at
//       most m − c coincidences, c the component count, so sum(m − c) is a
//       CEILING on any credit a pairwise argument could ever extract.
//   E5c the affordable pair budget: a depth-2 term costs 8 classes each pinned
//       only to ±1, so at most floor(slots/8) pairs can be bought. Buys them
//       cheapest-product-first and prices what they earn.
// ============================================================================

const NS = [100, 300, 1000, 3000, 10000, 30000, 100000, 300000, 1000000, 3000000];
const GROUND = { // n : [slots, removals, twins]   (2026-08-16, exact)
  100: [28, 21, 7], 300: [80, 67, 13], 1000: [268, 246, 22],
  3000: [800, 773, 27], 10000: [2668, 2560, 108], 30000: [8000, 7748, 252],
};
const BETA2 = 4.2665;   // sifting limit, dimension 2 (Rosser-Iwaniec / Selberg)
const t0 = Date.now();
function say(s) { process.stderr.write(`[${((Date.now() - t0) / 1000).toFixed(1)}s] ${s}\n`); }

// ------------------------------------------------------------------ primes --
function primesUpTo(N) {
  const sm = new Uint8Array(N + 1), out = [];
  for (let i = 2; i <= N; i++) { if (!sm[i]) { out.push(i); for (let j = i * i; j <= N; j += i) sm[j] = 1; } }
  return out;
}
const ALL = primesUpTo(Math.max(...NS));

// ------------------------------------------------------- E1: exact anatomy --
function anatomy(n) {
  const lo = n * n, hi = (n + 2) * (n + 2), W = hi - lo;
  const idx = new Int32Array(W).fill(-1);
  const slots = [];
  const start30 = lo - (lo % 30);
  for (let b = start30 - 30; b < hi + 30; b += 30) {
    for (const c of [11, 17]) {
      const x = b + c;
      if (x > lo && x + 2 < hi) { idx[x - lo] = slots.length; slots.push(x); }
    }
  }
  slots.sort((a, b) => a - b);
  for (let i = 0; i < slots.length; i++) idx[slots[i] - lo] = i;

  const S = slots.length;
  const mult = new Int32Array(S);
  const strik = Array.from({ length: S }, () => []);
  const qs = [], kq = [];
  for (const q of ALL) {
    if (q < 7) continue;
    if (q > n) break;
    let c = 0;
    for (const res of [0, q - 2]) {
      let x = lo + (((res - lo) % q) + q) % q;
      if (x <= lo) x += q;
      for (; x < hi; x += q) { const i = idx[x - lo]; if (i >= 0) { mult[i]++; strik[i].push(q); c++; } }
    }
    qs.push(q); kq.push(c);
  }
  let S1 = 0, K = 0, maxm = 0;
  for (let i = 0; i < S; i++) { S1 += mult[i]; if (mult[i]) K++; if (mult[i] > maxm) maxm = mult[i]; }
  const hist = new Array(maxm + 1).fill(0);
  for (let i = 0; i < S; i++) hist[mult[i]]++;
  return { n, lo, hi, W, slots, S, mult, strik, qs, kq, S1, K, T: S - K, hist, maxm };
}

// ---------------------------------------- Poisson-binomial (the CRT model) --
function poissonBinomial(ps, KMAX) {
  let dp = new Float64Array(KMAX + 1); dp[0] = 1;
  for (const p of ps) {
    const nd = new Float64Array(KMAX + 1);
    for (let j = KMAX; j >= 0; j--) { if (!dp[j]) continue; nd[j] += dp[j] * (1 - p); if (j < KMAX) nd[j + 1] += dp[j] * p; }
    dp = nd;
  }
  return dp;
}
// elementary symmetric e_k of the same probabilities = E[C(m,k)] under CRT
function esym(ps, KMAX) {
  const e = new Float64Array(KMAX + 1); e[0] = 1;
  for (const p of ps) for (let j = Math.min(KMAX, 999); j >= 1; j--) e[j] += e[j - 1] * p;
  return e;
}
function binom(m, k) { if (k > m) return 0; let r = 1; for (let i = 0; i < k; i++) r = r * (m - i) / (i + 1); return Math.round(r); }

// ============================================================================
const R = {};
for (const n of NS) { say(`enumerating pane n=${n} …`); R[n] = anatomy(n); }
say('enumeration done');

console.log('='.repeat(78));
console.log('E1. EXACT ANATOMY OF THE PANE, and the ground-truth check');
console.log('='.repeat(78));
console.log('   n |     W |  slots | kills | twins |   capacity | cap/slots | 2*sum(1/q) | GT');
for (const n of NS) {
  const a = R[n];
  let sum = 0; for (const q of a.qs) sum += 1 / q;
  const g = GROUND[n];
  const ok = !g ? 'new' : (g[0] === a.S && g[1] === a.K && g[2] === a.T) ? 'OK' : `MISMATCH ${g}`;
  console.log(`${String(n).padStart(5)} | ${String(a.W).padStart(6)} | ${String(a.S).padStart(6)} | ${String(a.K).padStart(5)} | ${String(a.T).padStart(5)} | ${String(a.S1).padStart(10)} |     ${(a.S1 / a.S).toFixed(3)} |      ${(2 * sum).toFixed(3)} | ${ok}`);
}
console.log('\nCORRIDOR (twins/slots, the band a valid Pane Bound must land in):');
console.log('   ' + NS.map(n => `n=${n}: ${(100 * R[n].T / R[n].S).toFixed(2)}%`).join('   '));
console.log('OVERLAP NEEDED, in units of slots:  Omega > cap/slots - 1');
console.log('   ' + NS.map(n => `n=${n}: ${(R[n].S1 / R[n].S - 1).toFixed(3)}`).join('   '));
console.log('OVERLAP ACTUAL (S1-K)/slots, the thing a bound must reach:');
console.log('   ' + NS.map(n => `n=${n}: ${((R[n].S1 - R[n].K) / R[n].S).toFixed(3)}`).join('   '));
console.log('REQUIRED RELATIVE PRECISION on the overlap, (Omega_actual - Omega_needed)/Omega_needed');
console.log('   = twins/(capacity - slots). This IS the corridor, restated in the only');
console.log('   currency a Pane Bound can be paid in:');
for (const n of NS) {
  const a = R[n], need = a.S1 - a.S;
  console.log(`   n=${String(n).padStart(7)}   ${(100 * a.T / need).toFixed(3)}%   (x ln^2 n = ${(a.T / need * Math.log(n) * Math.log(n)).toFixed(2)})`);
}

console.log('\n' + '='.repeat(78));
console.log('E2. MULTIPLICITY DISTRIBUTION: exact enumeration vs the CRT model');
console.log('='.repeat(78));
console.log('CRT model: the m(r) are Poisson-binomial in {2/q : 7<=q<=n}, exact over a');
console.log('full period Prod q, heuristic in a window of width 4n+4. Its j=0 cell IS');
console.log('the twin count, so agreement there is the conjecture, not evidence for it.\n');
for (const n of NS) {
  const a = R[n];
  const ps = a.qs.map(q => 2 / q);
  const KM = a.maxm + 6;
  const pb = poissonBinomial(ps, KM);
  console.log(`--- n = ${n}   (slots ${a.S}, primes ${a.qs.length}, mean m = ${(a.S1 / a.S).toFixed(3)})`);
  let line1 = '  j       :', line2 = '  exact   :', line3 = '  CRT     :', line4 = '  ratio   :';
  for (let j = 0; j <= a.maxm; j++) {
    const ex = a.hist[j], cr = pb[j] * a.S;
    line1 += String(j).padStart(9); line2 += String(ex).padStart(9);
    line3 += cr.toFixed(1).padStart(9);
    line4 += (ex && cr ? (ex / cr).toFixed(3) : (ex === 0 && cr < 0.5 ? '-' : (ex / cr).toFixed(3))).padStart(9);
  }
  console.log(line1); console.log(line2); console.log(line3); console.log(line4);
  const chi = a.hist.reduce((s, ex, j) => { const cr = pb[j] * a.S; return cr > 0.5 ? s + (ex - cr) * (ex - cr) / cr : s; }, 0);
  const dof = a.maxm; // cells used, one constraint
  console.log(`  chi2 = ${chi.toFixed(1)} on ~${dof} cells;  twin cell: exact ${a.hist[0]} vs CRT ${(pb[0] * a.S).toFixed(1)}  (ratio ${(a.hist[0] / (pb[0] * a.S)).toFixed(3)})`);
}

console.log('\n' + '='.repeat(78));
console.log('E3. THE BONFERRONI LADDER: how deep must inclusion-exclusion go,');
console.log('    and what would each depth cost to make provable?');
console.log('='.repeat(78));
console.log('U_t = S1 - S2 + ... + S_t (t odd) is a genuine upper bound on kills.');
console.log('Provable remainder at depth t: each squarefree d = q1..qt gives 8 residue');
console.log('classes mod 30d, and a window of width W pins each to +-1, so the honest');
console.log('error budget is 8*C(pi,t). It must stay below the slot count W/15.\n');
for (const n of NS) {
  const a = R[n], KM = 24;
  const Sk = new Array(KM + 1).fill(0);
  for (let i = 0; i < a.S; i++) for (let k = 1; k <= Math.min(KM, a.mult[i]); k++) Sk[k] += binom(a.mult[i], k);
  const ps = a.qs.map(q => 2 / q);
  const ek = esym(ps, KM);
  let tstar = -1; const rows = [];
  let acc = 0;
  for (let t = 1; t <= KM; t++) {
    acc += (t % 2 ? 1 : -1) * Sk[t];
    if (t % 2 === 1) { rows.push([t, acc / a.S]); if (tstar < 0 && acc < a.S) tstar = t; }
  }
  const pi = a.qs.length;
  console.log(`--- n = ${n}   (pi = ${pi} primes in [7,n], slots ${a.S})`);
  console.log('   S_k/slots exact :  ' + [1, 2, 3, 4, 5, 6, 7, 8].map(k => (Sk[k] / a.S).toFixed(3)).join('  '));
  console.log('   S_k/slots CRT   :  ' + [1, 2, 3, 4, 5, 6, 7, 8].map(k => ek[k].toFixed(3)).join('  '));
  console.log('   U_t/slots (odd t):  ' + rows.slice(0, 8).map(([t, v]) => `t=${t}:${v.toFixed(3)}`).join(' '));
  console.log(`   FIRST t with U_t < slots:  t* = ${tstar < 0 ? '>' + KM : tstar}`);
  let lc = [];
  for (let t = 1; t <= Math.max(3, tstar < 0 ? 3 : tstar); t += 2) {
    let lb = 0; // log10 of 8*C(pi,t)
    lb = Math.log10(8); for (let i = 0; i < t; i++) lb += Math.log10((pi - i) / (i + 1));
    lc.push(`t=${t}: 1e${lb.toFixed(1)} vs slots ${a.S}  (x${Math.pow(10, lb - Math.log10(a.S)).toExponential(1)})`);
  }
  console.log('   remainder budget:  ' + lc.join(' | '));
  const wneed = 15 * 8 * pi * (pi - 1) / 2;
  console.log(`   width at which DEPTH 2 alone becomes affordable: W >= ${wneed.toExponential(2)}  (actual W = ${a.W.toExponential(2)}, short by x${(wneed / a.W).toExponential(1)});  the zone at this height is ~${(n * n).toExponential(1)}`);
}

console.log('\n' + '='.repeat(78));
console.log('E4. THE AFFORDABLE-SIEVE FAMILY:  K <= K_{<=z} + sum_{q>z} k_q');
console.log('='.repeat(78));
console.log('A true inequality for every z. Its overlap credit is exactly Omega_{<=z},');
console.log('the overlap among the primes one can afford to sieve with. z is capped by');
console.log('the level of distribution: a window of width W supports level D <= W, and a');
console.log('dimension-2 lower-bound sieve needs ln D / ln z > beta_2 = 4.2665, so');
console.log('z <= W^(1/4.2665). Parity-ideal would be beta = 2, giving z <= W^(1/2).');
console.log('Brun-pure (exact inclusion-exclusion, no analytic input) needs Prod q <= W.\n');
for (const n of NS) {
  const a = R[n];
  const minS = new Array(a.S).fill(Infinity);
  for (let i = 0; i < a.S; i++) if (a.strik[i].length) minS[i] = a.strik[i][0];
  // cumulative K_{<=z} and cumulative capacity
  let cumK = 0, cumC = 0, best = Infinity, bz = 0, zstar = -1;
  const byMin = new Map();
  for (const v of minS) if (v < Infinity) byMin.set(v, (byMin.get(v) || 0) + 1);
  const table = [];
  for (let j = 0; j < a.qs.length; j++) {
    const q = a.qs[j];
    cumK += byMin.get(q) || 0; cumC += a.kq[j];
    const bound = cumK + (a.S1 - cumC);
    table.push([q, bound]);
    if (bound < best) { best = bound; bz = q; }
    if (zstar < 0 && bound < a.S) zstar = q;
  }
  // ceilings
  let zbrun = 5, prod = 1;
  for (const q of a.qs) { if (prod * q > a.W) break; prod *= q; zbrun = q; }
  const zri = Math.pow(a.W, 1 / BETA2), zpar = Math.sqrt(a.W);
  const at = z => { let b = a.S1; for (let j = 0; j < a.qs.length; j++) if (a.qs[j] <= z) b = table[j][1]; return b; };
  const f = x => (x / a.S).toFixed(3);
  console.log(`--- n = ${n}  slots ${a.S}  kills ${a.K}  (target: bound/slots < 1, corridor width ${(a.T / a.S).toFixed(4)})`);
  console.log(`   z = 7          bound/slots ${f(table[0][1])}`);
  console.log(`   z = ${String(zbrun).padStart(6)}  Brun-pure ceiling (Prod q <= W)     bound/slots ${f(at(zbrun))}`);
  console.log(`   z = ${zri.toFixed(1).padStart(6)}  W^(1/4.2665), provable today       bound/slots ${f(at(zri))}`);
  console.log(`   z = ${zpar.toFixed(1).padStart(6)}  W^(1/2), parity-ideal, unreachable bound/slots ${f(at(zpar))}`);
  console.log(`   z* = ${zstar} is the FIRST z where the bound enters the corridor; ln z*/ln W = ${(Math.log(zstar) / Math.log(a.W)).toFixed(4)}, i.e. sifting parameter ln W/ln z* = ${(Math.log(a.W) / Math.log(zstar)).toFixed(4)}`);
  console.log(`   shortfall at the provable ceiling: bound - slots = ${(at(zri) - a.S).toLocaleString('en-US')} slots = ${((at(zri) - a.S) / a.S).toFixed(3)} x slots = ${((at(zri) - a.S) / a.T).toFixed(1)} corridor widths`);
  console.log(`   shortfall at the parity-ideal ceiling:            ${((at(zpar) - a.S) / a.S).toFixed(3)} x slots = ${((at(zpar) - a.S) / a.T).toFixed(1)} corridor widths`);
}
console.log('\nASYMPTOTIC of the shortfall (analytic, checked against the rows above):');
console.log('  bound(z)/slots - 1  =  2*sum_{z<q<=n} 1/q  -  Prod_{7<=q<=z}(1-2/q)');
console.log('                      ->  2*ln(ln n / ln z)  =  2 ln beta   as n -> infinity.');
console.log('  beta = 4.2665 gives 2 ln beta = ' + (2 * Math.log(BETA2)).toFixed(3) + ' ; beta = 2 gives ' + (2 * Math.log(2)).toFixed(3) + '.');
for (const n of NS) {
  const a = R[n];
  const zri = Math.pow(a.W, 1 / BETA2);
  let s1 = 0, pr = 1;
  for (const q of a.qs) { if (q <= zri) pr *= (1 - 2 / q); else s1 += 1 / q; }
  console.log(`   n=${String(n).padStart(5)}  2*sum_{z<q} 1/q = ${(2 * s1).toFixed(3)}   Prod(1-2/q) = ${pr.toFixed(4)}   predicted shortfall ${(2 * s1 - pr).toFixed(3)}`);
}

console.log('\n' + '='.repeat(78));
console.log('E5. ACCESSIBILITY: how much of the needed overlap is invisible to any');
console.log('    sieve that lives inside a window of width W?');
console.log('='.repeat(78));
console.log('A pair (q,q\') contributes overlap through 8 classes mod 30qq\'. If qq\' > W');
console.log('the pane meets those classes 0 or 1 times and no counting statement about');
console.log('them is available without assuming equidistribution of the slots, which is');
console.log('assuming the conjecture. Split S2 by qq\' <= W.\n');
console.log('   n |    S2 | S2 vis | S2 invis | vis share | Omega=S1-K | Omega needed | vis/needed');
for (const n of NS) {
  const a = R[n];
  let S2 = 0, vis = 0;
  for (let i = 0; i < a.S; i++) {
    const st = a.strik[i];
    for (let x = 0; x < st.length; x++) for (let y = x + 1; y < st.length; y++) { S2++; if (st[x] * st[y] <= a.W) vis++; }
  }
  const om = a.S1 - a.K, need = a.S1 - a.S;
  console.log(`${String(n).padStart(5)} | ${String(S2).padStart(5)} | ${String(vis).padStart(6)} | ${String(S2 - vis).padStart(8)} |    ${(vis / S2).toFixed(3)} | ${String(om).padStart(10)} | ${String(need).padStart(12)} |   ${(vis / need).toFixed(3)}`);
}

console.log('\nE5b. IS THE INFORMATION THERE?  For each slot build the graph on its');
console.log('strikers with an edge whenever qq\' <= W. Pairwise-visible evidence can at');
console.log('best certify m - c coincidences, c = number of components. Sum(m-c) is a');
console.log('CEILING on any credit derivable from visible pairs alone.');
console.log('   n | sum(m-c) | Omega=S1-K | needed S1-s | ceiling/needed | slots with c>1');
for (const n of NS) {
  const a = R[n];
  let tot = 0, split = 0;
  for (let i = 0; i < a.S; i++) {
    const st = a.strik[i], m = st.length;
    if (m === 0) continue;
    const par = new Array(m).fill(0).map((_, k) => k);
    const find = x => { while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; } return x; };
    for (let x = 0; x < m; x++) for (let y = x + 1; y < m; y++) if (st[x] * st[y] <= a.W) { const rx = find(x), ry = find(y); if (rx !== ry) par[rx] = ry; }
    let c = 0; for (let x = 0; x < m; x++) if (find(x) === x) c++;
    tot += m - c; if (c > 1) split++;
  }
  const need = a.S1 - a.S;
  console.log(`${String(n).padStart(7)} | ${String(tot).padStart(9)} | ${String(a.S1 - a.K).padStart(10)} | ${String(need).padStart(11)} |          ${(tot / need).toFixed(3)} | ${split} of ${a.K}   [ln n * (1 - ratio) = ${(Math.log(n) * (1 - tot / need)).toFixed(2)}]`);
}

console.log('\nE5c. THE AFFORDABLE PAIR BUDGET. A depth-2 term for the pair (q,q\') costs');
console.log('8 residue classes mod 30qq\', each pinned only to +-1 by a window of width W,');
console.log('so a proof may buy at most floor(slots/8) pairs before the error alone eats');
console.log('the whole slot count. Buy them cheapest-product-first and see what they earn.');
console.log('     n | budget | pairs bought |  max qq\' | exact co-strikes | net of error |  needed');
for (const n of NS) {
  const a = R[n];
  const cap = Math.max(400, Math.floor(a.W / 3));      // the cheapest slots/8 pairs sit well below this
  const cnt = new Map();
  for (let i = 0; i < a.S; i++) { const st = a.strik[i]; for (let x = 0; x < st.length; x++) { for (let y = x + 1; y < st.length; y++) { const pr = st[x] * st[y]; if (pr > cap) break; const k = st[x] * 10000000 + st[y]; cnt.set(k, (cnt.get(k) || 0) + 1); } } }
  const pairs = [];
  for (let x = 0; x + 1 < a.qs.length; x++) { if (a.qs[x] * a.qs[x + 1] > cap) break; for (let y = x + 1; y < a.qs.length; y++) { const pr = a.qs[x] * a.qs[y]; if (pr > cap) break; pairs.push([pr, a.qs[x], a.qs[y]]); } }
  pairs.sort((p, q) => p[0] - q[0]);
  const budget = Math.floor(a.S / 8);
  let earned = 0, used = 0, maxpr = 0;
  for (const [pr, q1, q2] of pairs) { if (used >= budget) break; earned += cnt.get(q1 * 10000000 + q2) || 0; used++; maxpr = pr; }
  const need = a.S1 - a.S;
  console.log(`${String(n).padStart(6)} | ${String(budget).padStart(6)} | ${String(used).padStart(12)} | ${String(maxpr).padStart(8)} | ${String(earned).padStart(16)} | ${String(earned - 8 * used).padStart(12)} | ${String(need).padStart(7)} | net/needed ${((earned - 8 * used) / need).toFixed(3)}${used < budget ? '  [BUDGET NOT FILLED, cap too low]' : ''}`);
  say(`E5c n=${n} done`);
}
say('done');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/a3-07-pane-overlap.js
//   invocation:  node research/a3-07-pane-overlap.js
//   code-sha256: a59020c73ca165f3e90f1940d4fecc31ba54d0c40e913272052eb0523f862014
//   out-sha256:  9c0e4db5252a2581939eecf4c947d3f4f8b7d7a43e80870d283786876e643c5e
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     4.0 s
// ============================================================================
// ==============================================================================
// E1. EXACT ANATOMY OF THE PANE, and the ground-truth check
// ==============================================================================
//    n |     W |  slots | kills | twins |   capacity | cap/slots | 2*sum(1/q) | GT
//   100 |    404 |     28 |    21 |     7 |         37 |     1.321 |      1.539 | OK
//   300 |   1204 |     80 |    67 |    13 |        155 |     1.938 |      1.959 | OK
//  1000 |   4004 |    268 |   246 |    22 |        625 |     2.332 |      2.329 | OK
//  3000 |  12004 |    800 |   773 |    27 |       2084 |     2.605 |      2.621 | OK
// 10000 |  40004 |   2668 |  2560 |   108 |       7702 |     2.887 |      2.899 | OK
// 30000 | 120004 |   8000 |  7748 |   252 |      25049 |     3.131 |      3.123 | OK
// 100000 | 400004 |  26668 | 26007 |   661 |      89141 |     3.343 |      3.344 | new
// 300000 | 1200004 |  80000 | 78297 |  1703 |     282006 |     3.525 |      3.526 | new
// 1000000 | 4000004 | 266668 | 262021 |  4647 |     988681 |     3.708 |      3.708 | new
// 3000000 | 12000004 | 800000 | 788042 | 11958 |    3088762 |     3.861 |      3.861 | new
//
// CORRIDOR (twins/slots, the band a valid Pane Bound must land in):
//    n=100: 25.00%   n=300: 16.25%   n=1000: 8.21%   n=3000: 3.38%   n=10000: 4.05%   n=30000: 3.15%   n=100000: 2.48%   n=300000: 2.13%   n=1000000: 1.74%   n=3000000: 1.49%
// OVERLAP NEEDED, in units of slots:  Omega > cap/slots - 1
//    n=100: 0.321   n=300: 0.938   n=1000: 1.332   n=3000: 1.605   n=10000: 1.887   n=30000: 2.131   n=100000: 2.343   n=300000: 2.525   n=1000000: 2.708   n=3000000: 2.861
// OVERLAP ACTUAL (S1-K)/slots, the thing a bound must reach:
//    n=100: 0.571   n=300: 1.100   n=1000: 1.414   n=3000: 1.639   n=10000: 1.927   n=30000: 2.163   n=100000: 2.367   n=300000: 2.546   n=1000000: 2.725   n=3000000: 2.876
// REQUIRED RELATIVE PRECISION on the overlap, (Omega_actual - Omega_needed)/Omega_needed
//    = twins/(capacity - slots). This IS the corridor, restated in the only
//    currency a Pane Bound can be paid in:
//    n=    100   77.778%   (x ln^2 n = 16.49)
//    n=    300   17.333%   (x ln^2 n = 5.64)
//    n=   1000   6.162%   (x ln^2 n = 2.94)
//    n=   3000   2.103%   (x ln^2 n = 1.35)
//    n=  10000   2.145%   (x ln^2 n = 1.82)
//    n=  30000   1.478%   (x ln^2 n = 1.57)
//    n= 100000   1.058%   (x ln^2 n = 1.40)
//    n= 300000   0.843%   (x ln^2 n = 1.34)
//    n=1000000   0.644%   (x ln^2 n = 1.23)
//    n=3000000   0.522%   (x ln^2 n = 1.16)
//
// ==============================================================================
// E2. MULTIPLICITY DISTRIBUTION: exact enumeration vs the CRT model
// ==============================================================================
// CRT model: the m(r) are Poisson-binomial in {2/q : 7<=q<=n}, exact over a
// full period Prod q, heuristic in a window of width 4n+4. Its j=0 cell IS
// the twin count, so agreement there is the conjecture, not evidence for it.
//
// --- n = 100   (slots 28, primes 22, mean m = 1.321)
//   j       :        0        1        2        3        4
//   exact   :        7       10        7        3        1
//   CRT     :      5.4      9.6      7.7      3.7      1.2
//   ratio   :    1.306    1.044    0.908    0.800    0.806
//   chi2 = 0.8 on ~4 cells;  twin cell: exact 7 vs CRT 5.4  (ratio 1.306)
// --- n = 300   (slots 80, primes 59, mean m = 1.938)
//   j       :        0        1        2        3        4        5        6
//   exact   :       13       22       21       10       11        1        2
//   CRT     :     10.0     22.2     22.9     14.9      6.8      2.4      0.6
//   ratio   :    1.295    0.991    0.915    0.673    1.618    0.425    3.108
//   chi2 = 8.9 on ~6 cells;  twin cell: exact 13 vs CRT 10.0  (ratio 1.295)
// --- n = 1000   (slots 268, primes 165, mean m = 2.332)
//   j       :        0        1        2        3        4        5        6        7
//   exact   :       22       65       75       48       37       12        5        4
//   CRT     :     23.2     59.9     73.7     57.8     32.6     14.1      4.9      1.4
//   ratio   :    0.948    1.085    1.018    0.831    1.137    0.850    1.018    2.826
//   chi2 = 7.8 on ~7 cells;  twin cell: exact 22 vs CRT 23.2  (ratio 0.948)
// --- n = 3000   (slots 800, primes 427, mean m = 2.605)
//   j       :        0        1        2        3        4        5        6        7        8
//   exact   :       27      159      243      167      113       65       22        3        1
//   CRT     :     51.7    148.7    205.5    182.6    117.7     58.9     23.8      8.0      2.3
//   ratio   :    0.522    1.069    1.182    0.914    0.960    1.104    0.924    0.373    0.433
//   chi2 = 25.6 on ~8 cells;  twin cell: exact 27 vs CRT 51.7  (ratio 0.522)
// --- n = 10000   (slots 2668, primes 1226, mean m = 2.887)
//   j       :        0        1        2        3        4        5        6        7        8        9
//   exact   :      108      441      663      553      463      281      105       44        9        1
//   CRT     :    130.6    411.8    628.5    620.5    447.0    251.1    114.7     43.9     14.4      4.1
//   ratio   :    0.827    1.071    1.055    0.891    1.036    1.119    0.915    1.001    0.625    0.243
//   chi2 = 24.6 on ~9 cells;  twin cell: exact 108 vs CRT 130.6  (ratio 0.827)
// --- n = 30000   (slots 8000, primes 3242, mean m = 3.131)
//   j       :        0        1        2        3        4        5        6        7        8        9       10
//   exact   :      252     1170     1790     1683     1367     1014      450      197       61       15        1
//   CRT     :    313.1   1057.3   1735.4   1850.1   1444.1    881.8    439.5    184.1     66.2     20.8      5.8
//   ratio   :    0.805    1.107    1.031    0.910    0.947    1.150    1.024    1.070    0.921    0.721    0.173
//   chi2 = 71.8 on ~10 cells;  twin cell: exact 252 vs CRT 313.1  (ratio 0.805)
// --- n = 100000   (slots 26668, primes 9589, mean m = 3.343)
//   j       :        0        1        2        3        4        5        6        7        8        9       10
//   exact   :      661     3262     5646     5581     4693     3642     1938      827      330       75       13
//   CRT     :    836.9   3011.2   5283.4   6040.0   5070.2   3338.6   1798.5    816.3    318.9    109.1     33.1
//   ratio   :    0.790    1.083    1.069    0.924    0.926    1.091    1.078    1.013    1.035    0.688    0.393
//   chi2 = 207.4 on ~10 cells;  twin cell: exact 661 vs CRT 836.9  (ratio 0.790)
// --- n = 300000   (slots 80000, primes 25994, mean m = 3.525)
//   j       :        0        1        2        3        4        5        6        7        8        9       10       11
//   exact   :     1703     8354    15745    16791    14496    11258     6542     3217     1392      419       76        7
//   CRT     :   2093.3   7912.3  14618.7  17636.2  15654.0  10918.9   6241.8   3010.8   1252.1    456.4    147.8     43.0
//   ratio   :    0.814    1.056    1.077    0.952    0.926    1.031    1.048    1.068    1.112    0.918    0.514    0.163
//   chi2 = 433.1 on ~11 cells;  twin cell: exact 1703 vs CRT 2093.3  (ratio 0.814)
// --- n = 1000000   (slots 266668, primes 78495, mean m = 3.708)
//   j       :        0        1        2        3        4        5        6        7        8        9       10       11       12
//   exact   :     4647    23938    48364    54763    49111    39764    25329    12586     5682     1971      455       55        3
//   CRT     :   5814.6  23038.4  44711.1  56764.3  53112.9  39115.1  23642.6  12075.1   5324.0   2060.1    708.8    219.2     61.4
//   ratio   :    0.799    1.039    1.082    0.965    0.925    1.017    1.071    1.042    1.067    0.957    0.642    0.251    0.049
//   chi2 = 1390.2 on ~12 cells;  twin cell: exact 4647 vs CRT 5814.6  (ratio 0.799)
// --- n = 3000000   (slots 800000, primes 216813, mean m = 3.861)
//   j       :        0        1        2        3        4        5        6        7        8        9       10       11       12       13
//   exact   :    11958    63725   134658   159980   148613   123559    82865    43847    20598     7748     2087      317       43        2
//   CRT     :  14968.6  61598.5 124351.0 164445.5 160473.9 123398.6  77963.2  41662.7  19238.3   7803.3   2816.7    914.5    269.4     72.5
//   ratio   :    0.799    1.035    1.083    0.973    0.926    1.001    1.063    1.052    1.071    0.993    0.741    0.347    0.160    0.028
//   chi2 = 3888.8 on ~13 cells;  twin cell: exact 11958 vs CRT 14968.6  (ratio 0.799)
//
// ==============================================================================
// E3. THE BONFERRONI LADDER: how deep must inclusion-exclusion go,
//     and what would each depth cost to make provable?
// ==============================================================================
// U_t = S1 - S2 + ... + S_t (t odd) is a genuine upper bound on kills.
// Provable remainder at depth t: each squarefree d = q1..qt gives 8 residue
// classes mod 30d, and a window of width W pins each to +-1, so the honest
// error budget is 8*C(pi,t). It must stay below the slot count W/15.
//
// --- n = 100   (pi = 22 primes in [7,n], slots 28)
//    S_k/slots exact :  1.321  0.786  0.250  0.036  0.000  0.000  0.000  0.000
//    S_k/slots CRT   :  1.539  1.086  0.468  0.139  0.030  0.005  0.001  0.000
//    U_t/slots (odd t):  t=1:1.321 t=3:0.786 t=5:0.750 t=7:0.750 t=9:0.750 t=11:0.750 t=13:0.750 t=15:0.750
//    FIRST t with U_t < slots:  t* = 3
//    remainder budget:  t=1: 1e2.2 vs slots 28  (x6.3e+0) | t=3: 1e4.1 vs slots 28  (x4.4e+2)
//    width at which DEPTH 2 alone becomes affordable: W >= 2.77e+4  (actual W = 4.04e+2, short by x6.9e+1);  the zone at this height is ~1.0e+4
// --- n = 300   (pi = 59 primes in [7,n], slots 80)
//    S_k/slots exact :  1.938  1.962  1.300  0.575  0.163  0.025  0.000  0.000
//    S_k/slots CRT   :  1.959  1.818  1.067  0.447  0.143  0.036  0.008  0.001
//    U_t/slots (odd t):  t=1:1.938 t=3:1.275 t=5:0.863 t=7:0.838 t=9:0.838 t=11:0.838 t=13:0.838 t=15:0.838
//    FIRST t with U_t < slots:  t* = 5
//    remainder budget:  t=1: 1e2.7 vs slots 80  (x5.9e+0) | t=3: 1e5.4 vs slots 80  (x3.3e+3) | t=5: 1e7.6 vs slots 80  (x5.0e+5)
//    width at which DEPTH 2 alone becomes affordable: W >= 2.05e+5  (actual W = 1.20e+3, short by x1.7e+2);  the zone at this height is ~9.0e+4
// --- n = 1000   (pi = 165 primes in [7,n], slots 268)
//    S_k/slots exact :  2.332  2.687  2.075  1.164  0.470  0.123  0.015  0.000
//    S_k/slots CRT   :  2.329  2.611  1.882  0.983  0.397  0.130  0.035  0.008
//    U_t/slots (odd t):  t=1:2.332 t=3:1.720 t=5:1.026 t=7:0.918 t=9:0.918 t=11:0.918 t=13:0.918 t=15:0.918
//    FIRST t with U_t < slots:  t* = 7
//    remainder budget:  t=1: 1e3.1 vs slots 268  (x4.9e+0) | t=3: 1e6.8 vs slots 268  (x2.2e+4) | t=5: 1e9.9 vs slots 268  (x2.9e+7) | t=7: 1e12.7 vs slots 268  (x1.7e+10)
//    width at which DEPTH 2 alone becomes affordable: W >= 1.62e+6  (actual W = 4.00e+3, short by x4.1e+2);  the zone at this height is ~1.0e+6
// --- n = 3000   (pi = 427 primes in [7,n], slots 800)
//    S_k/slots exact :  2.605  3.116  2.337  1.179  0.395  0.089  0.014  0.001
//    S_k/slots CRT   :  2.621  3.334  2.747  1.653  0.775  0.296  0.094  0.026
//    U_t/slots (odd t):  t=1:2.605 t=3:1.826 t=5:1.042 t=7:0.968 t=9:0.966 t=11:0.966 t=13:0.966 t=15:0.966
//    FIRST t with U_t < slots:  t* = 7
//    remainder budget:  t=1: 1e3.5 vs slots 800  (x4.3e+0) | t=3: 1e8.0 vs slots 800  (x1.3e+5) | t=5: 1e12.0 vs slots 800  (x1.2e+9) | t=7: 1e15.6 vs slots 800  (x4.9e+12)
//    width at which DEPTH 2 alone becomes affordable: W >= 1.09e+7  (actual W = 1.20e+4, short by x9.1e+2);  the zone at this height is ~9.0e+6
// --- n = 10000   (pi = 1226 primes in [7,n], slots 2668)
//    S_k/slots exact :  2.887  4.009  3.539  2.151  0.924  0.281  0.057  0.007
//    S_k/slots CRT   :  2.899  4.101  3.779  2.555  1.353  0.586  0.213  0.067
//    U_t/slots (odd t):  t=1:2.887 t=3:2.417 t=5:1.190 t=7:0.966 t=9:0.960 t=11:0.960 t=13:0.960 t=15:0.960
//    FIRST t with U_t < slots:  t* = 7
//    remainder budget:  t=1: 1e4.0 vs slots 2668  (x3.7e+0) | t=3: 1e9.4 vs slots 2668  (x9.2e+5) | t=5: 1e14.3 vs slots 2668  (x6.9e+10) | t=7: 1e18.8 vs slots 2668  (x2.4e+15)
//    width at which DEPTH 2 alone becomes affordable: W >= 9.01e+7  (actual W = 4.00e+4, short by x2.3e+3);  the zone at this height is ~1.0e+8
// --- n = 30000   (pi = 3242 primes in [7,n], slots 8000)
//    S_k/slots exact :  3.131  4.795  4.748  3.307  1.676  0.626  0.168  0.030
//    S_k/slots CRT   :  3.123  4.775  4.770  3.508  2.027  0.960  0.383  0.132
//    U_t/slots (odd t):  t=1:3.131 t=3:3.084 t=5:1.453 t=7:0.996 t=9:0.969 t=11:0.969 t=13:0.969 t=15:0.969
//    FIRST t with U_t < slots:  t* = 7
//    remainder budget:  t=1: 1e4.4 vs slots 8000  (x3.2e+0) | t=3: 1e10.7 vs slots 8000  (x5.7e+6) | t=5: 1e16.4 vs slots 8000  (x3.0e+12) | t=7: 1e21.8 vs slots 8000  (x7.4e+17)
//    width at which DEPTH 2 alone becomes affordable: W >= 6.30e+8  (actual W = 1.20e+5, short by x5.3e+3);  the zone at this height is ~9.0e+8
// --- n = 100000   (pi = 9589 primes in [7,n], slots 26668)
//    S_k/slots exact :  3.343  5.472  5.805  4.357  2.394  0.975  0.290  0.060
//    S_k/slots CRT   :  3.344  5.488  5.902  4.683  2.926  1.502  0.651  0.244
//    U_t/slots (odd t):  t=1:3.343 t=3:3.676 t=5:1.713 t=7:1.028 t=9:0.976 t=11:0.975 t=13:0.975 t=15:0.975
//    FIRST t with U_t < slots:  t* = 9
//    remainder budget:  t=1: 1e4.9 vs slots 26668  (x2.9e+0) | t=3: 1e12.1 vs slots 26668  (x4.4e+7) | t=5: 1e18.7 vs slots 26668  (x2.0e+14) | t=7: 1e25.1 vs slots 26668  (x4.4e+20) | t=9: 1e31.2 vs slots 26668  (x5.6e+26)
//    width at which DEPTH 2 alone becomes affordable: W >= 5.52e+9  (actual W = 4.00e+5, short by x1.4e+4);  the zone at this height is ~1.0e+10
// --- n = 300000   (pi = 25994 primes in [7,n], slots 80000)
//    S_k/slots exact :  3.525  6.115  6.928  5.625  3.390  1.530  0.511  0.122
//    S_k/slots CRT   :  3.526  6.113  6.956  5.850  3.881  2.117  0.977  0.390
//    U_t/slots (odd t):  t=1:3.525 t=3:4.337 t=5:2.102 t=7:1.083 t=9:0.981 t=11:0.979 t=13:0.979 t=15:0.979
//    FIRST t with U_t < slots:  t* = 9
//    remainder budget:  t=1: 1e5.3 vs slots 80000  (x2.6e+0) | t=3: 1e13.4 vs slots 80000  (x2.9e+8) | t=5: 1e20.9 vs slots 80000  (x9.9e+15) | t=7: 1e28.1 vs slots 80000  (x1.6e+23) | t=9: 1e35.1 vs slots 80000  (x1.5e+30)
//    width at which DEPTH 2 alone becomes affordable: W >= 4.05e+10  (actual W = 1.20e+6, short by x3.4e+4);  the zone at this height is ~9.0e+10
// --- n = 1000000   (pi = 78495 primes in [7,n], slots 266668)
//    S_k/slots exact :  3.708  6.761  8.040  6.861  4.369  2.107  0.765  0.204
//    S_k/slots CRT   :  3.708  6.772  8.130  7.223  5.069  2.929  1.434  0.608
//    U_t/slots (odd t):  t=1:3.708 t=3:4.987 t=5:2.494 t=7:1.153 t=9:0.987 t=11:0.983 t=13:0.983 t=15:0.983
//    FIRST t with U_t < slots:  t* = 9
//    remainder budget:  t=1: 1e5.8 vs slots 266668  (x2.4e+0) | t=3: 1e14.8 vs slots 266668  (x2.4e+9) | t=5: 1e23.3 vs slots 266668  (x7.4e+17) | t=7: 1e31.5 vs slots 266668  (x1.1e+26) | t=9: 1e39.4 vs slots 266668  (x9.3e+33)
//    width at which DEPTH 2 alone becomes affordable: W >= 3.70e+11  (actual W = 4.00e+6, short by x9.2e+4);  the zone at this height is ~1.0e+12
// --- n = 3000000   (pi = 216813 primes in [7,n], slots 800000)
//    S_k/slots exact :  3.861  7.345  9.124  8.160  5.475  2.807  1.100  0.326
//    S_k/slots CRT   :  3.861  7.351  9.211  8.549  6.274  3.795  1.946  0.865
//    U_t/slots (odd t):  t=1:3.861 t=3:5.640 t=5:2.956 t=7:1.249 t=9:0.995 t=11:0.985 t=13:0.985 t=15:0.985
//    FIRST t with U_t < slots:  t* = 9
//    remainder budget:  t=1: 1e6.2 vs slots 800000  (x2.2e+0) | t=3: 1e16.1 vs slots 800000  (x1.7e+10) | t=5: 1e25.5 vs slots 800000  (x4.0e+19) | t=7: 1e34.6 vs slots 800000  (x4.5e+28) | t=9: 1e43.4 vs slots 800000  (x2.9e+37)
//    width at which DEPTH 2 alone becomes affordable: W >= 2.82e+12  (actual W = 1.20e+7, short by x2.4e+5);  the zone at this height is ~9.0e+12
//
// ==============================================================================
// E4. THE AFFORDABLE-SIEVE FAMILY:  K <= K_{<=z} + sum_{q>z} k_q
// ==============================================================================
// A true inequality for every z. Its overlap credit is exactly Omega_{<=z},
// the overlap among the primes one can afford to sieve with. z is capped by
// the level of distribution: a window of width W supports level D <= W, and a
// dimension-2 lower-bound sieve needs ln D / ln z > beta_2 = 4.2665, so
// z <= W^(1/4.2665). Parity-ideal would be beta = 2, giving z <= W^(1/2).
// Brun-pure (exact inclusion-exclusion, no analytic input) needs Prod q <= W.
//
// --- n = 100  slots 28  kills 21  (target: bound/slots < 1, corridor width 0.2500)
//    z = 7          bound/slots 1.321
//    z =     11  Brun-pure ceiling (Prod q <= W)     bound/slots 1.286
//    z =    4.1  W^(1/4.2665), provable today       bound/slots 1.321
//    z =   20.1  W^(1/2), parity-ideal, unreachable bound/slots 1.071
//    z* = 43 is the FIRST z where the bound enters the corridor; ln z*/ln W = 0.6267, i.e. sifting parameter ln W/ln z* = 1.5956
//    shortfall at the provable ceiling: bound - slots = 9 slots = 0.321 x slots = 1.3 corridor widths
//    shortfall at the parity-ideal ceiling:            0.071 x slots = 0.3 corridor widths
// --- n = 300  slots 80  kills 67  (target: bound/slots < 1, corridor width 0.1625)
//    z = 7          bound/slots 1.938
//    z =     13  Brun-pure ceiling (Prod q <= W)     bound/slots 1.825
//    z =    5.3  W^(1/4.2665), provable today       bound/slots 1.938
//    z =   34.7  W^(1/2), parity-ideal, unreachable bound/slots 1.538
//    z* = 157 is the FIRST z where the bound enters the corridor; ln z*/ln W = 0.7128, i.e. sifting parameter ln W/ln z* = 1.4029
//    shortfall at the provable ceiling: bound - slots = 75 slots = 0.938 x slots = 5.8 corridor widths
//    shortfall at the parity-ideal ceiling:            0.537 x slots = 3.3 corridor widths
// --- n = 1000  slots 268  kills 246  (target: bound/slots < 1, corridor width 0.0821)
//    z = 7          bound/slots 2.332
//    z =     13  Brun-pure ceiling (Prod q <= W)     bound/slots 2.201
//    z =    7.0  W^(1/4.2665), provable today       bound/slots 2.332
//    z =   63.3  W^(1/2), parity-ideal, unreachable bound/slots 1.735
//    z* = 659 is the FIRST z where the bound enters the corridor; ln z*/ln W = 0.7825, i.e. sifting parameter ln W/ln z* = 1.2780
//    shortfall at the provable ceiling: bound - slots = 357 slots = 1.332 x slots = 16.2 corridor widths
//    shortfall at the parity-ideal ceiling:            0.735 x slots = 9.0 corridor widths
// --- n = 3000  slots 800  kills 773  (target: bound/slots < 1, corridor width 0.0338)
//    z = 7          bound/slots 2.605
//    z =     13  Brun-pure ceiling (Prod q <= W)     bound/slots 2.491
//    z =    9.0  W^(1/4.2665), provable today       bound/slots 2.605
//    z =  109.6  W^(1/2), parity-ideal, unreachable bound/slots 1.826
//    z* = 2551 is the FIRST z where the bound enters the corridor; ln z*/ln W = 0.8351, i.e. sifting parameter ln W/ln z* = 1.1974
//    shortfall at the provable ceiling: bound - slots = 1,284 slots = 1.605 x slots = 47.6 corridor widths
//    shortfall at the parity-ideal ceiling:            0.826 x slots = 24.5 corridor widths
// --- n = 10000  slots 2668  kills 2560  (target: bound/slots < 1, corridor width 0.0405)
//    z = 7          bound/slots 2.887
//    z =     17  Brun-pure ceiling (Prod q <= W)     bound/slots 2.712
//    z =   12.0  W^(1/4.2665), provable today       bound/slots 2.835
//    z =  200.0  W^(1/2), parity-ideal, unreachable bound/slots 1.918
//    z* = 7901 is the FIRST z where the bound enters the corridor; ln z*/ln W = 0.8469, i.e. sifting parameter ln W/ln z* = 1.1807
//    shortfall at the provable ceiling: bound - slots = 4,896 slots = 1.835 x slots = 45.3 corridor widths
//    shortfall at the parity-ideal ceiling:            0.918 x slots = 22.7 corridor widths
// --- n = 30000  slots 8000  kills 7748  (target: bound/slots < 1, corridor width 0.0315)
//    z = 7          bound/slots 3.131
//    z =     17  Brun-pure ceiling (Prod q <= W)     bound/slots 2.956
//    z =   15.5  W^(1/4.2665), provable today       bound/slots 3.015
//    z =  346.4  W^(1/2), parity-ideal, unreachable bound/slots 2.015
//    z* = 25439 is the FIRST z where the bound enters the corridor; ln z*/ln W = 0.8674, i.e. sifting parameter ln W/ln z* = 1.1529
//    shortfall at the provable ceiling: bound - slots = 16,122 slots = 2.015 x slots = 64.0 corridor widths
//    shortfall at the parity-ideal ceiling:            1.015 x slots = 32.2 corridor widths
// --- n = 100000  slots 26668  kills 26007  (target: bound/slots < 1, corridor width 0.0248)
//    z = 7          bound/slots 3.343
//    z =     19  Brun-pure ceiling (Prod q <= W)     bound/slots 3.108
//    z =   20.6  W^(1/4.2665), provable today       bound/slots 3.108
//    z =  632.5  W^(1/2), parity-ideal, unreachable bound/slots 2.045
//    z* = 85363 is the FIRST z where the bound enters the corridor; ln z*/ln W = 0.8803, i.e. sifting parameter ln W/ln z* = 1.1360
//    shortfall at the provable ceiling: bound - slots = 56,221 slots = 2.108 x slots = 85.1 corridor widths
//    shortfall at the parity-ideal ceiling:            1.045 x slots = 42.2 corridor widths
// --- n = 300000  slots 80000  kills 78297  (target: bound/slots < 1, corridor width 0.0213)
//    z = 7          bound/slots 3.525
//    z =     19  Brun-pure ceiling (Prod q <= W)     bound/slots 3.290
//    z =   26.6  W^(1/4.2665), provable today       bound/slots 3.237
//    z = 1095.4  W^(1/2), parity-ideal, unreachable bound/slots 2.083
//    z* = 259621 is the FIRST z where the bound enters the corridor; ln z*/ln W = 0.8906, i.e. sifting parameter ln W/ln z* = 1.1228
//    shortfall at the provable ceiling: bound - slots = 178,988 slots = 2.237 x slots = 105.1 corridor widths
//    shortfall at the parity-ideal ceiling:            1.083 x slots = 50.9 corridor widths
// --- n = 1000000  slots 266668  kills 262021  (target: bound/slots < 1, corridor width 0.0174)
//    z = 7          bound/slots 3.708
//    z =     19  Brun-pure ceiling (Prod q <= W)     bound/slots 3.473
//    z =   35.3  W^(1/4.2665), provable today       bound/slots 3.332
//    z = 2000.0  W^(1/2), parity-ideal, unreachable bound/slots 2.117
//    z* = 881317 is the FIRST z where the bound enters the corridor; ln z*/ln W = 0.9005, i.e. sifting parameter ln W/ln z* = 1.1105
//    shortfall at the provable ceiling: bound - slots = 621,966 slots = 2.332 x slots = 133.8 corridor widths
//    shortfall at the parity-ideal ceiling:            1.117 x slots = 64.1 corridor widths
// --- n = 3000000  slots 800000  kills 788042  (target: bound/slots < 1, corridor width 0.0149)
//    z = 7          bound/slots 3.861
//    z =     23  Brun-pure ceiling (Prod q <= W)     bound/slots 3.573
//    z =   45.6  W^(1/4.2665), provable today       bound/slots 3.381
//    z = 3464.1  W^(1/2), parity-ideal, unreachable bound/slots 2.143
//    z* = 2674381 is the FIRST z where the bound enters the corridor; ln z*/ln W = 0.9079, i.e. sifting parameter ln W/ln z* = 1.1014
//    shortfall at the provable ceiling: bound - slots = 1,904,451 slots = 2.381 x slots = 159.3 corridor widths
//    shortfall at the parity-ideal ceiling:            1.143 x slots = 76.5 corridor widths
//
// ASYMPTOTIC of the shortfall (analytic, checked against the rows above):
//   bound(z)/slots - 1  =  2*sum_{z<q<=n} 1/q  -  Prod_{7<=q<=z}(1-2/q)
//                       ->  2*ln(ln n / ln z)  =  2 ln beta   as n -> infinity.
//   beta = 4.2665 gives 2 ln beta = 2.902 ; beta = 2 gives 1.386.
//    n=  100  2*sum_{z<q} 1/q = 1.539   Prod(1-2/q) = 1.0000   predicted shortfall 0.539
//    n=  300  2*sum_{z<q} 1/q = 1.959   Prod(1-2/q) = 1.0000   predicted shortfall 0.959
//    n= 1000  2*sum_{z<q} 1/q = 2.329   Prod(1-2/q) = 1.0000   predicted shortfall 1.329
//    n= 3000  2*sum_{z<q} 1/q = 2.336   Prod(1-2/q) = 0.7143   predicted shortfall 1.621
//    n=10000  2*sum_{z<q} 1/q = 2.432   Prod(1-2/q) = 0.5844   predicted shortfall 1.848
//    n=30000  2*sum_{z<q} 1/q = 2.502   Prod(1-2/q) = 0.4945   predicted shortfall 2.007
//    n=100000  2*sum_{z<q} 1/q = 2.500   Prod(1-2/q) = 0.3904   predicted shortfall 2.109
//    n=300000  2*sum_{z<q} 1/q = 2.594   Prod(1-2/q) = 0.3565   predicted shortfall 2.238
//    n=1000000  2*sum_{z<q} 1/q = 2.643   Prod(1-2/q) = 0.3105   predicted shortfall 2.333
//    n=3000000  2*sum_{z<q} 1/q = 2.647   Prod(1-2/q) = 0.2664   predicted shortfall 2.381
//
// ==============================================================================
// E5. ACCESSIBILITY: how much of the needed overlap is invisible to any
//     sieve that lives inside a window of width W?
// ==============================================================================
// A pair (q,q') contributes overlap through 8 classes mod 30qq'. If qq' > W
// the pane meets those classes 0 or 1 times and no counting statement about
// them is available without assuming equidistribution of the slots, which is
// assuming the conjecture. Split S2 by qq' <= W.
//
//    n |    S2 | S2 vis | S2 invis | vis share | Omega=S1-K | Omega needed | vis/needed
//   100 |    22 |     10 |       12 |    0.455 |         16 |            9 |   1.111
//   300 |   157 |     84 |       73 |    0.535 |         88 |           75 |   1.120
//  1000 |   720 |    424 |      296 |    0.589 |        379 |          357 |   1.188
//  3000 |  2493 |   1572 |      921 |    0.631 |       1311 |         1284 |   1.224
// 10000 | 10697 |   6969 |     3728 |    0.651 |       5142 |         5034 |   1.384
// 30000 | 38361 |  25585 |    12776 |    0.667 |      17301 |        17049 |   1.501
// 100000 | 145929 | 100505 |    45424 |    0.689 |      63134 |        62473 |   1.609
// 300000 | 489226 | 344217 |   145009 |    0.704 |     203709 |       202006 |   1.704
// 1000000 | 1802950 | 1298219 |   504731 |    0.720 |     726660 |       722013 |   1.798
// 3000000 | 5875644 | 4300792 |  1574852 |    0.732 |    2300720 |      2288762 |   1.879
//
// E5b. IS THE INFORMATION THERE?  For each slot build the graph on its
// strikers with an edge whenever qq' <= W. Pairwise-visible evidence can at
// best certify m - c coincidences, c = number of components. Sum(m-c) is a
// CEILING on any credit derivable from visible pairs alone.
//    n | sum(m-c) | Omega=S1-K | needed S1-s | ceiling/needed | slots with c>1
//     100 |         8 |         16 |           9 |          0.889 | 8 of 21   [ln n * (1 - ratio) = 0.51]
//     300 |        67 |         88 |          75 |          0.893 | 16 of 67   [ln n * (1 - ratio) = 0.61]
//    1000 |       291 |        379 |         357 |          0.815 | 74 of 246   [ln n * (1 - ratio) = 1.28]
//    3000 |      1041 |       1311 |        1284 |          0.811 | 220 of 773   [ln n * (1 - ratio) = 1.52]
//   10000 |      4255 |       5142 |        5034 |          0.845 | 711 of 2560   [ln n * (1 - ratio) = 1.43]
//   30000 |     14672 |      17301 |       17049 |          0.861 | 2124 of 7748   [ln n * (1 - ratio) = 1.44]
//  100000 |     54990 |      63134 |       62473 |          0.880 | 6529 of 26007   [ln n * (1 - ratio) = 1.38]
//  300000 |    180302 |     203709 |      202006 |          0.893 | 18836 of 78297   [ln n * (1 - ratio) = 1.36]
// 1000000 |    652249 |     726660 |      722013 |          0.903 | 59846 of 262021   [ln n * (1 - ratio) = 1.33]
// 3000000 |   2088207 |    2300720 |     2288762 |          0.912 | 171670 of 788042   [ln n * (1 - ratio) = 1.31]
//
// E5c. THE AFFORDABLE PAIR BUDGET. A depth-2 term for the pair (q,q') costs
// 8 residue classes mod 30qq', each pinned only to +-1 by a window of width W,
// so a proof may buy at most floor(slots/8) pairs before the error alone eats
// the whole slot count. Buy them cheapest-product-first and see what they earn.
//      n | budget | pairs bought |  max qq' | exact co-strikes | net of error |  needed
//    100 |      3 |            3 |      119 |                2 |          -22 |       9 | net/needed -2.444
//    300 |     10 |           10 |      217 |               25 |          -55 |      75 | net/needed -0.733
//   1000 |     33 |           33 |      481 |              155 |         -109 |     357 | net/needed -0.305
//   3000 |    100 |          100 |     1133 |              720 |          -80 |    1284 | net/needed -0.062
//  10000 |    333 |          333 |     3127 |             3691 |         1027 |    5034 | net/needed 0.204
//  30000 |   1000 |         1000 |     8587 |            14965 |         6965 |   17049 | net/needed 0.409
// 100000 |   3333 |         3333 |    27377 |            65245 |        38581 |   62473 | net/needed 0.618
// 300000 |  10000 |        10000 |    81053 |           238845 |       158845 |  202006 | net/needed 0.786
// 1000000 |  33333 |        33333 |   270263 |           954826 |       688162 |  722013 | net/needed 0.953
// 3000000 | 100000 |       100000 |   819877 |          3295379 |      2495379 | 2288762 | net/needed 1.090
// ============================================================================
// READINGS
// ============================================================================
//
// 0. CUSTODY. The 2026-08-16 ground truth (n | slots | removals | twins) is
//    reproduced exactly at all six points, 100/300/1000/3000/10000/30000, and
//    the run extends it to n = 1e5, 3e5, 1e6, 3e6. The identity
//    slots = kills + twins holds at every n, which also confirms the header's
//    completeness argument: the primes 7 <= q <= n destroy every non-twin slot,
//    with no q = n+1 boundary case, because 11, 13, 17, 19 are not squares
//    mod 30. Capacity/slots matches the closed form 2*sum_{7<=q<=n} 1/q to
//    three digits at every n (3.861 vs 3.861 at n = 3e6).
//
// 1. THE CORRIDOR, RESTATED IN THE ONLY CURRENCY A PANE BOUND CAN BE PAID IN.
//    Since K < s is exactly Omega > S1 - s, a Pane Bound is a LOWER bound on
//    overlap, and the corridor is a RELATIVE PRECISION requirement on that
//    lower bound:
//        (Omega_actual - Omega_needed)/Omega_needed = twins/(capacity - slots).
//    MEASURED: 77.8%, 17.3%, 6.16%, 2.10%, 2.15%, 1.48%, 1.06%, 0.84%, 0.64%,
//    0.52% at n = 100 .. 3e6. Closed form, from reading 2 and the capacity law:
//        precision = (5*C2/ln^2 n) / (2*sum 1/q - 1) = 3.301/((lambda-1) ln^2 n),
//    lambda = capacity/slots. CHECKED: predicted 1.549, 1.409, 1.307, 1.219,
//    1.154 against measured 1.571, 1.402, 1.341, 1.228, 1.162 for
//    precision * ln^2 n at n = 3e4 .. 3e6. So the requirement is
//        overlap, to a relative accuracy of about 3.3/(2 lnln n * ln^2 n),
//    which is 0.52% at n = 3e6 and tightens faster than ln^-2.
//    That is the sharpest one-line statement of A7's difficulty found here. It
//    is stronger than "the corridor closes": the corridor closes in absolute
//    slot units AND the quantity that must be estimated is itself growing, so
//    the precision demand tightens twice over.
//
// 2. CORRECTION OF RECORD: the corridor constant is 5*C2 = 3.301/ln^2 n, not
//    4.95/ln^2 n. MEASURED twins/slots * ln^2 n = 3.348, 3.285, 3.386, 3.326,
//    3.325 at n = 3e4 .. 3e6, flat on 3.3008. Derivation: twins in the pane are
//    2*C2*W/ln^2(n^2) = 2*C2*W/(4 ln^2 n); the 11/17 slot set captures exactly
//    two of the three twin residues mod 30, so two thirds of them; slots are
//    W/15; the ratio is 15*(2/3)*2*C2/4 = 5*C2 = 3.3007. GLOSSARY's 4.95 is
//    that number without the 2/3, i.e. all twins measured against a slot count
//    that only sees 11 and 17. Note the constant is INVARIANT under adding the
//    29 mod 30 residue back (slots and twins both rise by 3/2), which is width
//    invariance appearing in the residue direction rather than the length one.
//
// 3. THE CRT MULTIPLICITY LAW: right in the bulk, wrong by a constant exactly
//    where it matters. By CRT the events "q strikes r" are exactly independent
//    with probability 2/q over a full period, so the multiplicity profile
//    should be the Poisson-binomial in {2/q : 7 <= q <= n}. MEASURED against
//    exact enumeration, at n = 3e6 the ratios exact/CRT for j = 1..9 are 1.035,
//    1.083, 0.973, 0.926, 1.001, 1.063, 1.052, 1.071, 0.993, so the bulk is
//    right to within about 8%. Two structured failures:
//      (a) THE j = 0 CELL, which is the twin count, sits at ratio 0.799, 0.805,
//          0.790, 0.814, 0.799, 0.799 for n = 1e4 .. 3e6. DEAD FLAT across
//          five decades, and it is exactly the classical dimension-2 constant:
//          truth/CRT = 5*C2 / (20*C2*e^{-2*gamma}) = e^{2*gamma}/4 = 0.79305.
//          PROVEN identification, MEASURED agreement to three digits.
//      (b) THE UPPER TAIL is under-populated and increasingly so: at n = 3e6,
//          j = 11, 12, 13 give ratios 0.347, 0.160, 0.028. The exact
//          distribution is UNDER-DISPERSED relative to CRT independence.
//          CONJECTURED mechanism: in a window of width W the strikes of one
//          prime cannot cluster the way independent Bernoullis allow, so the
//          pane suppresses both extremes; this is the pane analogue of the
//          twin-slot repulsion measured in grain-census.js.
//    CONSEQUENCE FOR A7, and it is decisive. The CRT law is off by 21% at the
//    exact cell a Pane Bound must control, against a tolerance of 0.52% at
//    n = 3e6 (reading 1). The gap between the model's error and the corridor's
//    tolerance is a factor 40 at n = 3e6 and grows like ln^2 n. So the copy
//    theorem does NOT describe the overlap exactly enough to be the engine,
//    even as a heuristic target. This answers A7's first move in the negative,
//    with a constant.
//
// 4. THE BONFERRONI LADDER: the required depth grows, the affordable depth
//    does not exist. With exact S_k the alternating sum terminates and equals
//    the kill count, so the ladder is an identity; the question is where the
//    odd partial sums U_t = S1 - S2 + ... + S_t first drop below the slot
//    count. MEASURED t* = 3, 5, 7, 7, 7, 7, 9, 9, 9, 9 for n = 100 .. 3e6,
//    consistent with t* ~ e*lambda where lambda = capacity/slots. The cost of
//    making depth t provable: a squarefree d = q1..qt puts 8 classes mod 30d
//    into a window of width W, each pinned only to +-1, so the honest error
//    budget is 8*C(pi(n), t) and it must stay below the slot count W/15.
//    MEASURED at n = 3e6: depth 1 already costs 2.2 slot counts (this is the
//    known 26% boundary term, seen here as the reason even S1 is not free),
//    depth 3 costs 1.7e10 slot counts, depth t* = 9 costs 2.9e37 slot counts.
//    THE WIDTH THAT WOULD BUY DEPTH 2: W >= 15*8*C(pi,2) ~ 60*(n/ln n)^2, i.e.
//    60/ln^2 n times the zone's width n^2. MEASURED requirement 2.8e12 against
//    the actual W = 1.2e7 at n = 3e6, short by a factor 2.4e5, while the ZONE
//    at that height is 9.0e12. The requirement and the zone stay within a
//    factor 3 either way across the whole table (2.77e4 vs 1.0e4 at n = 100,
//    2.82e12 vs 9.0e12 at n = 3e6, the ratio 60/ln^2 n drifting from 2.83 down
//    to 0.27). READING: the pane is precisely
//    the window that is too narrow to afford second-order inclusion-exclusion,
//    and the window wide enough to afford it is the zone. Since width
//    invariance says widening cannot close the pigeonhole, the two routes are
//    the two ends of one trade-off rather than two independent chances.
//
// 5. HOW TIGHT A PROVABLE OVERLAP BOUND GETS. Take the whole family
//        K <= K_{<=z} + sum_{z<q<=n} k_q,   equivalently   Omega >= Omega_{<=z},
//    true for every z, and grant the small-prime part PERFECT accuracy by
//    using the exactly enumerated K_{<=z}. This is an idealisation strictly in
//    the bound's favour: no real lower-bound sieve does better than exact
//    enumeration. The provable ceiling on z is the level of distribution. A
//    window of width W supports level D <= W, and a dimension-2 lower-bound
//    sieve needs ln D / ln z > beta_2 = 4.2665, giving z <= W^(1/4.2665).
//    MEASURED bound/slots at that ceiling: 1.32, 1.94, 2.33, 2.61, 2.84, 3.02,
//    3.11, 3.24, 3.33, 3.38 for n = 100 .. 3e6. At n = 3e6 the bound overshoots
//    the slot count by 2.381 slot counts, which is 159 corridor widths.
//    Granting the parity barrier as if it were reachable (beta = 2,
//    z <= W^(1/2)) the overshoot is 1.143 slot counts, 76.5 corridor widths.
//    ASYMPTOTICS, and this is the answer to "how far from the corridor":
//        bound(z)/slots - 1 = 2*sum_{z<q<=n} 1/q - prod_{7<=q<=z}(1-2/q)
//                           -> 2*ln(ln n / ln z) = 2*ln(beta),
//    a POSITIVE CONSTANT, while the corridor width goes to zero like
//    3.301/ln^2 n. beta = 4.2665 gives 2*ln(beta) = 2.902; beta = 2 gives
//    1.386. The measured shortfalls 2.381 and 1.143 at n = 3e6 are climbing
//    toward those limits from below. So the family fails by a constant and
//    misses by ln^2 n corridor widths, growing.
//
// 6. WHAT THE PANE BOUND ACTUALLY DEMANDS: SIFTING PARAMETER 1. Scanning z,
//    the first cutoff at which the family enters the corridor is
//        z* = 43, 157, 659, 2551, 7901, 25439, 85363, 259621, 881317, 2674381,
//    with ln W / ln z* = 1.596, 1.403, 1.278, 1.197, 1.181, 1.153, 1.136,
//    1.123, 1.111, 1.101, DECREASING toward 1. A Pane Bound therefore needs a
//    sieve run at sifting parameter s = ln D / ln z tending to 1. For
//    comparison: the classical twin problem over a full range sits at s = 2,
//    the parity floor, which is the exact statement that TPC is at the
//    barrier; dimension-2 sieves are proven only above beta_2 = 4.2665. The
//    pane asks for HALF the parity floor. READING: the Pane Bound is not
//    merely unproven, it lies below the barrier that is known to be sharp for
//    two-dimensional sieves, so no argument of this shape can produce it at
//    any n. This is the pane's version of the repo's standing "4.267 proven,
//    2 needed" ledger entry, and the pane's entry reads "4.267 proven, 1
//    needed", i.e. the pane is strictly harder in the sieve-exponent currency
//    than the zone route it was proposed as an alternative to.
//
// 7. IS THE INFORMATION EVEN PRESENT? A pair (q, q') can only be counted
//    inside the pane if qq' <= W; beyond that the 8 classes mod 30qq' meet the
//    pane 0 or 1 times and any count of them assumes equidistribution of the
//    slots, which is assuming the conjecture. MEASURED share of S2 that is
//    visible: 0.455, 0.535, 0.589, 0.631, 0.651, 0.667, 0.689, 0.704, 0.720,
//    0.732 for n = 100 .. 3e6, rising steadily, so a clear majority of pair
//    coincidences is countable in principle. But S2 counts coincidences with multiplicity. The
//    correct ceiling is the de-duplicated one: per slot, build the graph on
//    its strikers with an edge when qq' <= W; visible pairwise evidence can
//    certify at most m - c coincidences, c the number of components.
//    MEASURED sum(m-c) / (needed overlap): 0.889, 0.893, 0.815, 0.811, 0.845,
//    0.861, 0.880, 0.893, 0.903, 0.912. ALWAYS BELOW 1, rising like
//    1 - 1.31/ln n (the product ln n * (1 - ratio) measures 1.43, 1.44, 1.38,
//    1.36, 1.33, 1.31 over the last six points, flat). REFUTATION, and a clean
//    one: no argument using only pairwise coincidences visible inside the pane
//    can produce a Pane Bound, at any n in this range. The deficit is
//    1.31/ln n = 8.8% of the requirement at n = 3e6, against the tolerance of
//    0.52% from reading 1, so the miss is a factor 17 larger than the corridor
//    allows. Since the deficit falls like 1/ln n while the tolerance falls
//    faster than 1/ln^2 n, that factor GROWS: 16.9 corridor widths at n = 3e6
//    and widening.
//
// 8. THE TRAP, FLAGGED. Priced honestly, a proof may buy at most floor(s/8)
//    depth-2 terms before the +-1 per class eats the whole slot count. Buying
//    them cheapest-product-first, the raw co-strike mass they earn, net of the
//    error, is -2.44, -0.73, -0.31, -0.06, 0.20, 0.41, 0.62, 0.79, 0.95, 1.09
//    times the needed overlap. IT CROSSES 1 near n = 2e6. Anyone re-deriving
//    A7 will find this crossing and read it as the corridor closing. It does
//    not: that quantity is restricted S2, which counts coincidences with
//    multiplicity, and converting S2 into a lower bound on Omega costs S3
//    (Omega >= S2 - S3), with S3/slots = 9.12 against S2/slots = 7.35 at
//    n = 3e6. Reading 7 is the de-duplicated version of the same measurement
//    and it stays below 1. Recorded here so the crossing is not rediscovered
//    as a result.
//
// 9. WHERE THIS DERIVATION COULD HAVE ASSUMED THE CONJECTURE, and where it
//    does not. Three places, all named as the brief demanded.
//      (a) The CRT/Poisson-binomial model of reading 3 has the twin count as
//          its j = 0 cell. It is used ONLY as a comparison object, never as an
//          input to any bound, and reading 3 shows it is wrong there by a
//          constant 21% anyway.
//      (b) The identity |A_q ^ A_q'| = 4*s/(qq') is an equidistribution claim
//          the pane cannot support once qq' > W. No bound in readings 5, 6, 7
//          uses it: reading 5 enumerates the small-prime part exactly and pays
//          the large primes a term-free union bound, and reading 7 splits
//          precisely on qq' <= W.
//      (c) The E4 family is granted exact K_{<=z}, which is better than any
//          sieve can do. Its failure is therefore a fortiori, and the honest
//          reading is that the true provable bound is WORSE than the 2.381
//          slot counts reported, not better.
//
// 10. VERDICT ON A7. The corridor is not closed at any n reached here, and
//    the failure now has a named mechanism and a constant attached to it.
//    Provable bound at the dimension-2 ceiling: 3.381 slot counts at n = 3e6,
//    a shortfall of 2.381 slot counts or 159 corridor widths, tending to
//    2*ln(4.2665) = 2.902 slot counts. Parity-ideal bound: 2.143 slot counts,
//    76.5 corridor widths, tending to 2*ln(2) = 1.386. Both limits are
//    positive while the corridor width tends to zero like 3.301/ln^2 n, so the
//    miss in corridor units grows like ln^2 n. What A7 asked for exists only
//    at sifting parameter 1, below the parity floor. CALIBRATION: this
//    REFUTES a family of arguments (sieve exactly below z, union-bound above;
//    and separately, any bound built from pane-visible pairwise coincidences).
//    It does NOT refute the Pane Postulate, and it does not touch bounds that
//    use structure other than counting. The route left open is the one the
//    zone document already names as B, the anchored route: use the pane's
//    distinguished position rather than its slot census.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure above that the OUTPUT block does not contain verbatim actually is.
// No number above was changed. This file's 42 are unusually mechanical: most
// are the same value written in a different notation, or a rounding.
//
// SAME VALUE, DIFFERENT NOTATION — the reading drops the `+` the run prints in
//   its exponent, so a text search misses it while the number is right there:
//   1.7e10 [printed 1.7e+10], 2.9e37 [2.9e+37], 1.2e7 [1.20e+7],
//   2.4e5 [2.4e+5], 9.0e12 [9.0e+12], 2.77e4 [2.77e+4], 2.82e12 [2.82e+12],
//   1.0e4 [printed as the table's n column entry 10000].
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   77.778% -> 77.8, 17.333% -> 17.3, 6.162% -> 6.16, 2.103% -> 2.10,
//   1.478% -> 1.48 (the whole precision row of reading 1)
//   2.82e+12 -> 2.8e12    0.281 -> 0.27 is NOT a rounding, see DERIVED
//   3.015 -> 3.02, 3.237 -> 3.24, 2.826 -> 2.84 (the bound/slots row)
//   1.5956 -> 1.596, 1.4029 -> 1.403, 1.1807 -> 1.181, 1.1228 -> 1.123
//     (the ln W / ln z* row, printed as its reciprocal ln z*/ln W alongside)
//   -0.305 -> -0.31 (the net/needed column)
//   4.2665 -> 4.267 (beta_2, printed in the dimension-2 sieve line)
//
// DERIVED IN THIS READING by arithmetic over printed columns:
//   the predicted lambda row 1.549, 1.409, 1.307, 1.219, 1.154 and the
//     measured row 1.571, 1.402, 1.341, 1.228, 1.162 — precision times ln^2 n,
//     formed from the printed precision percentages and the printed
//     capacity/slots column.
//   the twins/slots x ln^2 n row 3.348, 3.285, 3.386, 3.326, 3.325.
//   0.27 in reading 3, and the corridor-width counts 16.9 and 3.301.
//
// DEFINITION / LITERATURE constants, not measured here:
//   3.3008 and 3.3007 are 5*C2 with C2 = 0.6601618158 the Hardy-Littlewood
//     twin constant (OEIS A005597); the reading derives them as
//     15*(2/3)*2*C2/4 and states the derivation.
//   0.79305 is e^{2*gamma}/4.
//   4.95 is GLOSSARY.md's constant, named there as such and contested by this
//     reading, which is the reading's point.
// ---------------------------------------------------------------------------
