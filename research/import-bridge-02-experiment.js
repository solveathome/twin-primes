#!/usr/bin/env node
// ============================================================================
// IMPORT-BRIDGE, part 2 of 2 — THE PRE-REGISTERED EXPERIMENT
// does  collision bound -> Bridge  certify one number the corpus lacks?
// ============================================================================
// PRE-REGISTERED at research/history/staging/import-bridge-prereg.md, committed
// alone before either producer was written. Write-up: staging/import-bridge.md.
// Part 1 (research/import-bridge-01-verify.js) proved-by-measurement that both
// lemmas hold on our tile. This file asks whether the chain BUYS anything.
//
// THE INCUMBENTS (prereg sec.2), all from research/level-ledger-tight.md:
//   LL(x)  = R*(x) + D/W        Thm 1 + the sec.3 exhaustion table; certified
//            bound on max_a |h_q(a) - D/q|, uniform in every prime q > x.
//            R* = 1, 1, 1.8, 3, 6.584416, 14.384615, 27.019392, 53.972817
//                 at x = 2, 3, 5, 7, 11, 13, 17, 19  (sec.3, exhaustive)
//            LL(23) uses Thm 2's transfer R*(23) <= 3 R*(19); x = 23 is not
//            exhaustible (36,495,360 dilation classes).
//   TRI(x,q) = 2 (p-1) LL(x)    the triangle inequality over the 2(p-1) residue
//            counts the window identity exposes: the incumbent bound on
//            | B_q - 2|U_x|/q |.
//   PAR(x,q) = sqrt(D_x(q))     level-ledger-tight.md sec.4(a)'s Parseval sup
//            route, already the corpus's; the sup-channel incumbent.
//
// SECTIONS
//   S1  THE CERTIFIED VERDICT. chain' = CERTD -> Bridge, against TRI. The ratio
//       is predicted to be the identity sqrt(q/(p-1)) >= 1 (prereg P4).
//   S2  THE MEASURED-INPUT CHAIN. exact D_x(q) -> Bridge, against TRI and
//       against the truth; the per-prime slack; the x = 23 crossover (P5).
//   S3  THE SUP CHANNEL. PAR against LL against the true sup. The Bridge does
//       not produce a sup bound at all; the s = 1 member of its own family is
//       PAR (P6).
//   S4  SUMMING OVER PRIMES. The composite-d generalisation of the Bridge (new
//       here, same three-line proof), verified, then summed: the level of
//       distribution it delivers on the interval object.
//   S5  THE RIDER. sum_L L D_x(L) and the forced 0/1 occupancy (P8).
//
//   node research/import-bridge-02-experiment.js
//   node research/import-bridge-02-experiment.js --quick     (drops x = 23)
// ============================================================================
'use strict';
const path = require('path');
const T0 = Date.now(); const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';
const QUICK = process.argv.includes('--quick');

function primesTo(n){ const s=[]; for(let i=2;i<=n;i++){ let ok=true; for(let j=2;j*j<=i;j++) if(i%j===0){ok=false;break;} if(ok) s.push(i);} return s; }
function isPrime(n){ if(n<2) return false; for(let j=2;j*j<=n;j++) if(n%j===0) return false; return true; }
function nextPrime(n){ let m=n+1; while(!isPrime(m)) m++; return m; }
function tile(x){
  let slots = Float64Array.from([5]), W = 6;
  for(const q of primesTo(x)){ if(q < 5) continue;
    const Dn = slots.length, rs = new Int32Array(Dn);
    for(let i=0;i<Dn;i++) rs[i] = slots[i] % q;
    const wq = W % q, out = new Float64Array(Dn*(q-2)); let n = 0;
    for(let k=0;k<q;k++){ const off = k*W, kw = (k*wq)%q, a0 = (q-kw)%q, a2 = (2*q-2-kw)%q;
      for(let i=0;i<Dn;i++) if(rs[i]!==a0 && rs[i]!==a2) out[n++] = slots[i] + off; }
    slots = out; W *= q; }
  slots.sort(); return { slots, W, D: slots.length, x };
}
function apCounts(T, q){
  const h = new Float64Array(q), s = T.slots, D = T.D;
  for(let i=0;i<D;i++) h[s[i] % q]++;
  let sq = 0, mx = 0; const mean = D/q;
  for(let r=0;r<q;r++){ sq += h[r]*h[r]; const d = Math.abs(h[r]-mean); if(d>mx) mx=d; }
  return { h, sumsq: sq, Dvar: sq - D*D/q, maxdev: mx };
}

// R*(y): QUOTED from research/level-ledger-tight.md sec.3, not recomputed here.
const RSTAR = {2:1, 3:1, 5:1.8, 7:3, 11:6.584416, 13:14.384615, 17:27.019392, 19:53.972817};
function LL(T){                                  // certified sup on |h_q(a) - D/q|
  const x = T.x;
  if(RSTAR[x] !== undefined) return { v: RSTAR[x] + T.D/T.W, src: `R*(${x}) exhaustive + D/W` };
  return { v: 3*RSTAR[19] + T.D/T.W, src: 'Thm 2 transfer 3 R*(19) + D/W' };   // x = 23
}

console.log('IMPORT-BRIDGE part 2 --- does  collision bound -> Bridge  certify a number we lack?\n');
const LEVELS = QUICK ? [5,7,11,13,17,19] : [5,7,11,13,17,19,23];
const NQ = 40;
const T = {}, P = {}, Q = {}, LLv = {};
for(const x of LEVELS){ T[x] = tile(x); P[x] = nextPrime(x); LLv[x] = LL(T[x]);
  const qs = []; for(let q=P[x]; qs.length<NQ; q=nextPrime(q)) if(T[x].W % q !== 0) qs.push(q); Q[x] = qs; }
console.log(`  levels ${LEVELS.join(', ')};  ${NQ} moduli each;  tiles built  [${el()}]`);
console.log('   x |  p |         D | LL(x) certified | source');
for(const x of LEVELS) console.log(`  ${String(x).padStart(2)} | ${String(P[x]).padStart(2)} | ${String(T[x].D).padStart(9)} | ${LLv[x].v.toFixed(6).padStart(15)} | ${LLv[x].src}`);

// -------------------------------------------------------- measure everything once
const M = {};
for(const x of LEVELS){
  const t = T[x], p = P[x], rows = [];
  for(const q of Q[x]){
    const A = apCounts(t, q);
    const wq = t.W % q; let B = 0;
    for(let b=1;b<=p-1;b++){ const s = (b*wq)%q; B += A.h[(q-s)%q] + A.h[(2*q-2-s)%q]; }
    const main = 2*(p-1)*t.D/q;
    rows.push({ q, B, main, TRUE: Math.abs(B-main), Dvar: A.Dvar, maxdev: A.maxdev,
                bridgeMeas: 2*Math.sqrt(p-1)*Math.sqrt(A.Dvar),
                bridgeCert: 2*Math.sqrt((p-1)*q)*LLv[x].v,
                TRI: 2*(p-1)*LLv[x].v,
                PAR: Math.sqrt(A.Dvar),
                binom: t.D*(1-1/q) });
  }
  M[x] = rows;
}
console.log(`  all D_x(q), B_q, max-dev measured  [${el()}]`);

// ================================================== S1  THE CERTIFIED VERDICT
console.log('\nS1  THE CERTIFIED VERDICT --- chain\' = ( CERTD = q LL^2 ) -> Bridge, against TRI');
console.log('    BRIDGE_cert = 2 sqrt((p-1) q) LL(x)      TRI = 2 (p-1) LL(x)');
console.log('   x |    q range | BRIDGE_cert/TRI at q_min | at q_max | predicted sqrt(q/(p-1)) | max |dev| | wins');
let totalWins = 0, worstIdentityDev = 0;
for(const x of LEVELS){
  const rows = M[x], p = P[x]; let wins = 0, dev = 0;
  for(const r of rows){ const got = r.bridgeCert/r.TRI, want = Math.sqrt(r.q/(p-1));
    dev = Math.max(dev, Math.abs(got-want)); if(r.bridgeCert < r.TRI) wins++; }
  totalWins += wins; worstIdentityDev = Math.max(worstIdentityDev, dev);
  const a = rows[0], z = rows[rows.length-1];
  console.log(`  ${String(x).padStart(2)} | ${String(a.q).padStart(4)}..${String(z.q).padStart(4)} | ${(a.bridgeCert/a.TRI).toFixed(6).padStart(24)} | ${(z.bridgeCert/z.TRI).toFixed(6).padStart(8)} | ${('sqrt(q/'+(p-1)+')').padStart(23)} | ${dev.toExponential(2).padStart(9)} | ${wins}`);
}
console.log(`\n  BRIDGE_cert/TRI = sqrt(q/(p-1)) to ${worstIdentityDev.toExponential(2)} over all ${LEVELS.length*NQ} pairs.`);
console.log(`  Admissible q always satisfies q >= p > p-1, so the ratio never drops to 1.`);
console.log(`  NEW CERTIFIED NUMBERS FROM THE CHAIN: ${totalWins} of ${LEVELS.length*NQ}.`);
console.log('\n  And the best certified L^2 input available anywhere in the corpus, the binomial');
console.log('  ceiling D_x(q) <= D, fed through the Bridge instead:');
console.log('   x | 2 sqrt((p-1) D)  (binomial-fed Bridge) |  TRI = 2(p-1)LL |  beats TRI');
for(const x of LEVELS){ const p = P[x], b = 2*Math.sqrt((p-1)*T[x].D), tri = 2*(p-1)*LLv[x].v;
  console.log(`  ${String(x).padStart(2)} | ${b.toFixed(2).padStart(38)} | ${tri.toFixed(2).padStart(15)} | ${b<tri?'YES':'no'}`); }

// =========================================== S2  THE MEASURED-INPUT CHAIN
console.log('\nS2  THE MEASURED-INPUT CHAIN --- exact D_x(q) -> Bridge (prereg calls this SECONDARY:');
console.log('    D_x(q) costs O(D) to compute exactly and so does B_q, so nothing is certified');
console.log('    here that exhaustion does not certify better. It measures the ROOM.)');
console.log('   x |   q |    D_x(q) | D_x(q)/D(1-1/q) |     TRUE     | BRIDGE_meas | slack | TRI/BRIDGE_meas');
for(const x of LEVELS){
  const rows = M[x];
  for(const r of [rows[0], rows[3], rows[9], rows[19], rows[39]]){
    if(!r) continue;
    console.log(`  ${String(x).padStart(2)} | ${String(r.q).padStart(3)} | ${r.Dvar.toExponential(3).padStart(9)} | ${(r.Dvar/r.binom).toExponential(3).padStart(15)} | ${r.TRUE.toExponential(4).padStart(12)} | ${r.bridgeMeas.toExponential(3).padStart(11)} | ${(r.bridgeMeas/r.TRUE).toFixed(2).padStart(5)} | ${(r.TRI/r.bridgeMeas).toFixed(3).padStart(15)}`);
  }
}
console.log('\n   x | slack BRIDGE_meas/TRUE: min / median / max | pairs where BRIDGE_meas < TRI | crossover D_x(q)');
for(const x of LEVELS){
  const rows = M[x], sl = rows.filter(r=>r.TRUE>0).map(r=>r.bridgeMeas/r.TRUE).sort((a,b)=>a-b);
  const beats = rows.filter(r=>r.bridgeMeas < r.TRI).length;
  const cross = (P[x]-1)*LLv[x].v*LLv[x].v;
  console.log(`  ${String(x).padStart(2)} | ${sl[0].toFixed(2).padStart(7)} / ${sl[Math.floor(sl.length/2)].toFixed(2).padStart(6)} / ${sl[sl.length-1].toFixed(2).padStart(8)}   | ${String(beats+' of '+rows.length).padStart(29)} | D_x(q) = ${cross.toExponential(3)}  (= ${(cross/T[x].D).toExponential(2)} x D)`);
}
console.log(`  [${el()}]`);

console.log('\nS2b THE CROSSOVER HUNT --- prereg P5 says the measured-input chain stops beating TRI');
console.log('    once D_x(q) >= (p-1) LL(x)^2. The 40 smallest moduli never get there, so the');
console.log('    modulus is pushed up geometrically until it does.');
console.log('   x | crossover needs D_x(q) >= | first sampled q past it | D_x(q) there | D_x(q)/D | BRIDGE/TRI there');
for(const x of LEVELS){
  const t = T[x], p = P[x], need = (p-1)*LLv[x].v*LLv[x].v, tri = 2*(p-1)*LLv[x].v;
  const qs = []; let q = P[x], step = 1.35;
  let target = P[x];
  while(q < 200000 && qs.length < 70){ q = nextPrime(Math.max(q, Math.floor(target))); qs.push(q); target = q*step; }
  let hit = null;
  for(const qq of qs){ const A = apCounts(t, qq); const bm = 2*Math.sqrt(p-1)*Math.sqrt(A.Dvar);
    if(A.Dvar >= need){ hit = {q:qq, Dvar:A.Dvar, bm}; break; } }
  if(hit) console.log(`  ${String(x).padStart(2)} | ${need.toExponential(3).padStart(25)} | ${String(hit.q).padStart(23)} | ${hit.Dvar.toExponential(3).padStart(12)} | ${(hit.Dvar/t.D).toFixed(4).padStart(8)} | ${(hit.bm/tri).toFixed(4).padStart(16)}`);
  else console.log(`  ${String(x).padStart(2)} | ${need.toExponential(3).padStart(25)} | ${'none below 200000'.padStart(23)} | ${'-'.padStart(12)} | ${'-'.padStart(8)} | ${'-'.padStart(16)}`);
}
console.log(`  [${el()}]`);

// ================================================== S3  THE SUP CHANNEL
console.log('\nS3  THE SUP CHANNEL --- what actually bounds max_a |h_q(a) - D/q|.');
console.log('    PAR = sqrt(D_x(q))  is level-ledger-tight.md sec.4(a), ALREADY OURS.');
console.log('    The Bridge produces no sup bound: its LHS is an aggregate over 2(p-1) classes.');
console.log('   x |   q | true sup |    PAR    | PAR/true | LL(x) certified | LL/true | PAR < LL');
for(const x of LEVELS){
  for(const r of [M[x][0], M[x][9], M[x][39]]){ if(!r) continue;
    console.log(`  ${String(x).padStart(2)} | ${String(r.q).padStart(3)} | ${r.maxdev.toFixed(4).padStart(8)} | ${r.PAR.toFixed(4).padStart(9)} | ${(r.PAR/r.maxdev).toFixed(3).padStart(8)} | ${LLv[x].v.toFixed(4).padStart(15)} | ${(LLv[x].v/r.maxdev).toFixed(2).padStart(7)} | ${r.PAR<LLv[x].v?'yes':'no'}`); }
}
console.log('\n   x | PAR/true sup: min/median/max | LL/true sup: min/max | PAR beats LL at');
for(const x of LEVELS){
  const rows = M[x], a = rows.map(r=>r.PAR/r.maxdev).sort((u,v)=>u-v), b = rows.map(r=>LLv[x].v/r.maxdev).sort((u,v)=>u-v);
  const n = rows.filter(r=>r.PAR<LLv[x].v).length;
  console.log(`  ${String(x).padStart(2)} | ${a[0].toFixed(3)} / ${a[Math.floor(a.length/2)].toFixed(3)} / ${a[a.length-1].toFixed(3)}      | ${b[0].toFixed(2)} / ${b[b.length-1].toFixed(2)}      | ${n} of ${rows.length} moduli`);
}

// ================================================== S4  SUMMING OVER PRIMES
console.log('\nS4  SUMMING OVER MODULI --- the composite-d generalisation, then the level it buys.');
console.log('    GENERALISED BRIDGE (same three lines, ω(d) classes instead of 2):');
console.log('      | B_d - 2^w(d) |U_x|/d |  <=  2^w(d) sqrt(p-1) sqrt(D_x(d)),  d squarefree, (d,W)=1');
console.log('   x |       d | w(d) |   B_d    |  2^w|U|/d  |    LHS     |    RHS     | LHS/RHS | holds');
let gViol = 0, gN = 0, gMax = 0;
for(const x of LEVELS){
  const t = T[x], p = P[x], qs = Q[x];
  const ds = [ {f:[qs[0],qs[1]]}, {f:[qs[0],qs[2]]}, {f:[qs[1],qs[3]]}, {f:[qs[0],qs[1],qs[2]]}, {f:[qs[0],qs[2],qs[4]]} ];
  for(const rec of ds){
    const d = rec.f.reduce((a,b)=>a*b,1); if(d > 3e6) continue;
    const A = apCounts(t, d), w = rec.f.length;
    // S_d by CRT over the prime factors: each factor contributes class 0 or -2
    let S = [0]; let mod = 1;
    for(const f of rec.f){ const S2 = [];
      for(const s of S) for(const c of [0, f-2]){ // solve y ≡ s mod `mod`, y ≡ c mod f
        let y = s; while(y % f !== c % f) y += mod; S2.push(y); }
      S = S2; mod *= f; }
    const wq = t.W % d; let B = 0;
    for(const s of S) for(let b=1;b<=p-1;b++){ B += A.h[(((s - b*wq) % d) + d) % d]; }
    const main = Math.pow(2,w)*(p-1)*t.D/d;
    const lhs = Math.abs(B-main), rhs = Math.pow(2,w)*Math.sqrt(p-1)*Math.sqrt(A.Dvar);
    gN++; const ok = lhs <= rhs + 1e-9; if(!ok) gViol++; if(rhs>0) gMax = Math.max(gMax, lhs/rhs);
    console.log(`  ${String(x).padStart(2)} | ${String(d).padStart(7)} | ${String(w).padStart(4)} | ${B.toExponential(3).padStart(8)} | ${main.toExponential(3).padStart(10)} | ${lhs.toExponential(3).padStart(10)} | ${rhs.toExponential(3).padStart(10)} | ${(lhs/rhs).toFixed(5).padStart(7)} | ${ok?'yes':'NO'}`);
  }
}
console.log(`  ${gN} composite-d cases, ${gViol} violations, max LHS/RHS = ${gMax.toFixed(6)}`);

console.log('\n    THE LEVEL OF DISTRIBUTION IT BUYS. Sieve U_x by the primes in (x, z]. Remainder');
console.log('    budget R(z) = sum_{d<=z, sf, (d,W)=1} 2^w(d) * 2 sqrt(p-1) sqrt(D_x(d)), main term');
console.log('    M(z) = |U_x| prod_{x<q<=z} (1-2/q). D_x(d) <= D is used, which is OPTIMISTIC for');
console.log('    the Bridge (measured D_x(d)/D runs far below 1 at small d), so z_max is an upper');
console.log('    bound on what the summed Bridge can reach.');
console.log('   x |  |U_x|  |     pW      | z_max | R/M at z_max | ln z / ln|U_x| | ln z / ln(pW) | twins need');
for(const x of LEVELS){
  const t = T[x], p = P[x], U = (p-1)*t.D, N = p*t.W;
  const ZCAP = 4000000;
  const mu = new Int8Array(ZCAP+1).fill(1), spf = new Int32Array(ZCAP+1);
  for(let i=2;i<=ZCAP;i++) if(spf[i]===0) for(let j=i;j<=ZCAP;j+=i) if(spf[j]===0) spf[j]=i;
  let acc = 0, prod = 1, zmax = 0, rAtZ = 0, nextP = 2;
  const w2 = 2*Math.sqrt(p-1)*Math.sqrt(t.D);
  for(let d=2; d<=ZCAP; d++){
    // squarefree, coprime to W ?
    let m = d, w = 0, sf = true, cop = true;
    while(m > 1){ const q = spf[m]; let e = 0; while(m % q === 0){ m/=q; e++; } if(e>1){ sf=false; break; }
      if(t.W % q === 0){ cop = false; } w++; }
    if(sf && cop) acc += Math.pow(2,w)*w2;
    if(isPrime(d) && d > x) prod *= (1 - 2/d);
    const Mz = U*prod;
    if(acc <= Mz/2){ zmax = d; rAtZ = acc/Mz; }
  }
  console.log(`  ${String(x).padStart(2)} | ${U.toExponential(2).padStart(7)} | ${N.toExponential(3).padStart(11)} | ${String(zmax).padStart(5)} | ${rAtZ.toFixed(4).padStart(12)} | ${(Math.log(zmax)/Math.log(U)).toFixed(4).padStart(14)} | ${(Math.log(zmax)/Math.log(N)).toFixed(4).padStart(13)} | 0.5 of ln(pW)`);
}
console.log('    ln z_max / ln|U_x| is the exponent the summed Bridge reaches against the CANDIDATE');
console.log('    count it sieves; the asymptote is 1/2, since R(z) ~ 2 sqrt|U_x| sum_{d<=z} 2^w(d)');
console.log('    ~ 2 sqrt|U_x| (6/pi^2) z ln z against M(z) ~ |U_x| 8 C2 / ln^2 z. Level 1/2 with no');
console.log('    averaging over the residue class is the trivial level.');
console.log(`  [${el()}]`);

// ================================================== S5  THE DIVERGENCE RIDER
console.log('\nS5  THE RIDER --- sum_L L D_x(L) diverges, and the 0/1 occupancy that forces it.');
console.log('    ojaroudi-read.md sec.7 records the observation and notes the corpus has not.');
console.log('    sum_r h_L(r)^2 = D + 2 #{pairs a<a\' in T_x with L | a\'-a}, computed from the');
console.log('    full difference multiset, so every L up to 3W is exact.');
console.log('    His family is (L, F_i) = 1, so the scan below is restricted to gcd(L, W) = 1.');
console.log('   x |      W |     D | max diff | L* = 1+maxdiff | L*/W | persistent onset L0 of D_x(L) >= 0.9 D(1-1/L) | L0/D | L0/W');
const RIDE = QUICK ? [5,7,11,13] : [5,7,11,13,17];
const ride = {};
for(const x of RIDE){
  const t = tile(x), D = t.D, W = t.W, s = t.slots;
  const cnt = new Float64Array(W);
  for(let i=0;i<D;i++) for(let j=i+1;j<D;j++) cnt[s[j]-s[i]]++;
  let maxdiff = 0; for(let d=W-1; d>=1; d--) if(cnt[d]>0){ maxdiff = d; break; }
  const LMAX = 3*W;
  const Dv = new Float64Array(LMAX+1), cop = new Uint8Array(LMAX+1);
  let allOne = 2, onset = 2;
  for(let L=2; L<=LMAX; L++){
    let pairs = 0; for(let k=L; k<W; k+=L) pairs += cnt[k];
    const sumsq = D + 2*pairs; Dv[L] = sumsq - D*D/L;
    let g = 1, a = L, b = W; while(b){ const r = a % b; a = b; b = r; } g = a;
    cop[L] = (g === 1) ? 1 : 0;
    if(cop[L] && Dv[L] < 0.9*D*(1-1/L)) onset = L+1;      // persistent: last failure + 1
    if(pairs > 0) allOne = L+1;
  }
  ride[x] = {t, Dv, cop, LMAX, maxdiff, onset, allOne};
  console.log(`  ${String(x).padStart(2)} | ${String(W).padStart(6)} | ${String(D).padStart(5)} | ${String(maxdiff).padStart(8)} | ${String(maxdiff+1).padStart(14)} | ${((maxdiff+1)/W).toFixed(4)} | ${String(onset).padStart(44)} | ${(onset/D).toFixed(2).padStart(4)} | ${(onset/W).toFixed(4)}`);
}
console.log('\n    (L* is the least L beyond which occupancy is forced 0/1 for EVERY larger L; it');
console.log('     equals 1 + (max T_x - min T_x) exactly, and the read\'s "L > F_i" is that, up to');
console.log('     the 12 the tile\'s endpoints give up. The PERSISTENT ONSET of the binomial line');
console.log('     is the number that matters for the divergence, and it arrives far earlier.)');
console.log('\n    The partial sums over the coprime family.  Q(L) = sum_{L\' <= L, (L\',W)=1} L\' D_x(L\').');
console.log('    Asymptote: L D_x(L) = LD - D^2 exactly for L > L*, so Q(L) ~ (D L^2/2 - D^2 L) x 1/zeta-density.');
console.log('   x |     L     |   Q(L)     | Q/(rho D L^2/2) | Q/(rho(D L^2/2 - D^2 L)) | D_x(L)/D(1-1/L) | occupancy');
for(const x of RIDE){
  const R = ride[x], D = R.t.D, W = R.t.W;
  let rho = 1; for(const q of primesTo(x)) rho *= (1 - 1/q);      // density of L coprime to W
  const co = (v)=>{ let L=Math.min(v,R.LMAX); while(L>2 && !R.cop[L]) L--; return L; };
  let Qs = 0; const marks = [W>>4, W>>2, W, 2*W, 3*W].filter(v=>v>=2 && v<=R.LMAX).map(co);
  let mi = 0;
  for(let L=2; L<=R.LMAX; L++){ if(R.cop[L]) Qs += L*R.Dv[L];
    if(mi<marks.length && L===marks[mi]){
      const ratio = R.cop[L] ? R.Dv[L]/(D*(1-1/L)) : NaN;
      const occ = (L > R.maxdiff) ? 'forced 0/1' : 'collisions possible';
      console.log(`  ${String(x).padStart(2)} | ${String(L).padStart(9)} | ${Qs.toExponential(4).padStart(10)} | ${(Qs/(rho*D*L*L/2)).toFixed(6).padStart(15)} | ${(Qs/(rho*(D*L*L/2 - D*D*L))).toFixed(6).padStart(24)} | ${(isNaN(ratio)?'n/a':ratio.toFixed(6)).padStart(15)} | ${occ.padStart(19)}`);
      mi++; }
  }
}
console.log('\n    The unweighted Q(L) therefore grows like D L^2 / 2: it diverges, and the linear');
console.log('    regime L D_x(L) = LD - D^2 is exact for every L > L*. Recorded because the');
console.log('    corpus has nowhere written it down.');
console.log(`\ndone  [${el()}]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/import-bridge-02-experiment.js
//   invocation:  node research/import-bridge-02-experiment.js
//   code-sha256: c8f372cc93fe66d35193b5d28ef30553476ff89b2560d26d2c83efb18f5895d9
//   out-sha256:  066ce1b099de65ddebf4dd7fe64b2e2428ad70be5e8aa651c801ac692319c52c
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     23.6 s
// ============================================================================
// IMPORT-BRIDGE part 2 --- does  collision bound -> Bridge  certify a number we lack?
//
//   levels 5, 7, 11, 13, 17, 19, 23;  40 moduli each;  tiles built  [0.1s]
//    x |  p |         D | LL(x) certified | source
//    5 |  7 |         3 |        1.900000 | R*(5) exhaustive + D/W
//    7 | 11 |        15 |        3.071429 | R*(7) exhaustive + D/W
//   11 | 13 |       135 |        6.642858 | R*(11) exhaustive + D/W
//   13 | 17 |      1485 |       14.434066 | R*(13) exhaustive + D/W
//   17 | 19 |     22275 |       27.063025 | R*(17) exhaustive + D/W
//   19 | 23 |    378675 |       54.011857 | R*(19) exhaustive + D/W
//   23 | 29 |   7952175 |      161.954096 | Thm 2 transfer 3 R*(19) + D/W
//   all D_x(q), B_q, max-dev measured  [10.1s]
//
// S1  THE CERTIFIED VERDICT --- chain' = ( CERTD = q LL^2 ) -> Bridge, against TRI
//     BRIDGE_cert = 2 sqrt((p-1) q) LL(x)      TRI = 2 (p-1) LL(x)
//    x |    q range | BRIDGE_cert/TRI at q_min | at q_max | predicted sqrt(q/(p-1)) | max |dev| | wins
//    5 |    7.. 191 |                 1.080123 | 5.642104 |               sqrt(q/6) |  8.88e-16 | 0
//    7 |   11.. 193 |                 1.048809 | 4.393177 |              sqrt(q/10) |  8.88e-16 | 0
//   11 |   13.. 197 |                 1.040833 | 4.051749 |              sqrt(q/12) |  8.88e-16 | 0
//   13 |   17.. 199 |                 1.030776 | 3.526684 |              sqrt(q/16) |  4.44e-16 | 0
//   17 |   19.. 211 |                 1.027402 | 3.423773 |              sqrt(q/18) |  4.44e-16 | 0
//   19 |   23.. 223 |                 1.022475 | 3.183766 |              sqrt(q/22) |  8.88e-16 | 0
//   23 |   29.. 227 |                 1.017700 | 2.847304 |              sqrt(q/28) |  4.44e-16 | 0
//
//   BRIDGE_cert/TRI = sqrt(q/(p-1)) to 8.88e-16 over all 280 pairs.
//   Admissible q always satisfies q >= p > p-1, so the ratio never drops to 1.
//   NEW CERTIFIED NUMBERS FROM THE CHAIN: 0 of 280.
//
//   And the best certified L^2 input available anywhere in the corpus, the binomial
//   ceiling D_x(q) <= D, fed through the Bridge instead:
//    x | 2 sqrt((p-1) D)  (binomial-fed Bridge) |  TRI = 2(p-1)LL |  beats TRI
//    5 |                                   8.49 |           22.80 | YES
//    7 |                                  24.49 |           61.43 | YES
//   11 |                                  80.50 |          159.43 | YES
//   13 |                                 308.29 |          461.89 | YES
//   17 |                                1266.41 |          974.27 | no
//   19 |                                5772.64 |         2376.52 | no
//   23 |                               29843.65 |         9069.43 | no
//
// S2  THE MEASURED-INPUT CHAIN --- exact D_x(q) -> Bridge (prereg calls this SECONDARY:
//     D_x(q) costs O(D) to compute exactly and so does B_q, so nothing is certified
//     here that exhaustion does not certify better. It measures the ROOM.)
//    x |   q |    D_x(q) | D_x(q)/D(1-1/q) |     TRUE     | BRIDGE_meas | slack | TRI/BRIDGE_meas
//    5 |   7 |  1.714e+0 |        6.667e-1 |    8.5714e-1 |    6.414e+0 |  7.48 |           3.555
//    5 |  17 |  2.471e+0 |        8.750e-1 |    1.1176e+0 |    7.700e+0 |  6.89 |           2.961
//    5 |  41 |  2.780e+0 |        9.500e-1 |    1.2195e-1 |    8.169e+0 | 66.99 |           2.791
//    5 |  83 |  2.892e+0 |        9.756e-1 |    4.3373e-1 |    8.331e+0 | 19.21 |           2.737
//    5 | 191 |  2.953e+0 |        9.895e-1 |    8.1152e-1 |    8.418e+0 | 10.37 |           2.708
//    7 |  11 |  6.545e+0 |        4.800e-1 |    7.2727e-1 |    1.618e+1 | 22.25 |           3.796
//    7 |  19 |  3.158e+0 |        2.222e-1 |    7.8947e-1 |    1.124e+1 | 14.24 |           5.466
//    7 |  43 |  9.767e+0 |        6.667e-1 |    2.3256e-2 |    1.977e+1 | 849.94 |           3.108
//    7 |  89 |  1.247e+1 |        8.409e-1 |    6.2921e-1 |    2.234e+1 | 35.50 |           2.750
//    7 | 193 |  1.383e+1 |        9.271e-1 |    1.5544e+0 |    2.352e+1 | 15.13 |           2.611
//   11 |  13 |  5.077e+0 |        4.074e-2 |    2.3077e-1 |    1.561e+1 | 67.65 |          10.213
//   11 |  23 |  2.261e+1 |        1.751e-1 |    8.6957e-1 |    3.294e+1 | 37.88 |           4.840
//   11 |  47 |  6.123e+1 |        4.634e-1 |    1.9362e+0 |    5.421e+1 | 28.00 |           2.941
//   11 |  97 |  4.511e+1 |        3.377e-1 |    1.5979e+0 |    4.653e+1 | 29.12 |           3.426
//   11 | 197 |  7.849e+1 |        5.844e-1 |    4.4670e-1 |    6.138e+1 | 137.41 |           2.597
//   13 |  17 |  6.788e+1 |        4.857e-2 |    1.7059e+0 |    6.591e+1 | 38.64 |           7.008
//   13 |  29 |  1.248e+2 |        8.701e-2 |    4.3793e+0 |    8.936e+1 | 20.40 |           5.169
//   13 |  53 |  1.730e+2 |        1.187e-1 |    3.3962e+0 |    1.052e+2 | 30.98 |           4.390
//   13 | 101 |  2.271e+2 |        1.545e-1 |    4.9505e-1 |    1.206e+2 | 243.52 |           3.831
//   13 | 199 |  3.155e+2 |        2.135e-1 |    5.7940e+0 |    1.421e+2 | 24.52 |           3.251
//   17 |  19 |  7.642e+1 |        3.621e-3 |    2.2632e+0 |    7.418e+1 | 32.78 |          13.134
//   17 |  31 |  2.217e+2 |        1.028e-2 |    6.2581e+0 |    1.263e+2 | 20.19 |           7.712
//   17 |  59 |  3.646e+2 |        1.665e-2 |    5.2542e-1 |    1.620e+2 | 308.38 |           6.013
//   17 | 103 |  6.479e+2 |        2.937e-2 |    2.5631e+0 |    2.160e+2 | 84.27 |           4.511
//   17 | 211 |  1.774e+3 |        8.001e-2 |    4.4739e+0 |    3.574e+2 | 79.88 |           2.726
//   19 |  23 |  2.686e+2 |        7.416e-4 |    1.7391e+0 |    1.537e+2 | 88.40 |          15.458
//   19 |  37 |  6.992e+2 |        1.898e-3 |    1.0784e+1 |    2.480e+2 | 23.00 |           9.581
//   19 |  61 |  1.048e+3 |        2.814e-3 |    1.4377e+1 |    3.037e+2 | 21.13 |           7.825
//   19 | 107 |  1.484e+3 |        3.956e-3 |    1.0822e+1 |    3.614e+2 | 33.39 |           6.576
//   19 | 223 |  4.835e+3 |        1.283e-2 |    4.1435e+0 |    6.523e+2 | 157.42 |           3.643
//   23 |  29 |  1.934e+3 |        2.519e-4 |    1.4862e+1 |    4.654e+2 | 31.31 |          19.488
//   23 |  41 |  1.218e+3 |        1.570e-4 |    2.6829e+0 |    3.694e+2 | 137.68 |          24.553
//   23 |  67 |  4.870e+3 |        6.217e-4 |    1.2970e+1 |    7.385e+2 | 56.94 |          12.280
//   23 | 109 |  5.331e+3 |        6.766e-4 |    1.7899e+1 |    7.727e+2 | 43.17 |          11.737
//   23 | 227 |  1.320e+4 |        1.667e-3 |    4.9559e+0 |    1.216e+3 | 245.32 |           7.460
//
//    x | slack BRIDGE_meas/TRUE: min / median / max | pairs where BRIDGE_meas < TRI | crossover D_x(q)
//    5 |    6.47 /  12.99 /    73.97   |                      40 of 40 | D_x(q) = 2.166e+1  (= 7.22e+0 x D)
//    7 |   11.62 /  32.76 /  1755.11   |                      40 of 40 | D_x(q) = 9.434e+1  (= 6.29e+0 x D)
//   11 |   13.04 /  42.03 /  2245.44   |                      40 of 40 | D_x(q) = 5.295e+2  (= 3.92e+0 x D)
//   13 |    6.00 /  82.14 /   967.64   |                      40 of 40 | D_x(q) = 3.333e+3  (= 2.24e+0 x D)
//   17 |   20.19 / 148.28 /  1034.75   |                      40 of 40 | D_x(q) = 1.318e+4  (= 5.92e-1 x D)
//   19 |   14.91 /  93.63 /   922.80   |                      40 of 40 | D_x(q) = 6.418e+4  (= 1.69e-1 x D)
//   23 |   29.05 / 163.66 / 51952.48   |                      40 of 40 | D_x(q) = 7.344e+5  (= 9.24e-2 x D)
//   [10.1s]
//
// S2b THE CROSSOVER HUNT --- prereg P5 says the measured-input chain stops beating TRI
//     once D_x(q) >= (p-1) LL(x)^2. The 40 smallest moduli never get there, so the
//     modulus is pushed up geometrically until it does.
//    x | crossover needs D_x(q) >= | first sampled q past it | D_x(q) there | D_x(q)/D | BRIDGE/TRI there
//    5 |                  2.166e+1 |       none below 200000 |            - |        - |                -
//    7 |                  9.434e+1 |       none below 200000 |            - |        - |                -
//   11 |                  5.295e+2 |       none below 200000 |            - |        - |                -
//   13 |                  3.333e+3 |       none below 200000 |            - |        - |                -
//   17 |                  1.318e+4 |                   24967 |     1.501e+4 |   0.6740 |           1.0672
//   19 |                  6.418e+4 |                   15737 |     7.279e+4 |   0.1922 |           1.0650
//   23 |                  7.344e+5 |                   95327 |     8.205e+5 |   0.1032 |           1.0570
//   [15.0s]
//
// S3  THE SUP CHANNEL --- what actually bounds max_a |h_q(a) - D/q|.
//     PAR = sqrt(D_x(q))  is level-ledger-tight.md sec.4(a), ALREADY OURS.
//     The Bridge produces no sup bound: its LHS is an aggregate over 2(p-1) classes.
//    x |   q | true sup |    PAR    | PAR/true | LL(x) certified | LL/true | PAR < LL
//    5 |   7 |   0.5714 |    1.3093 |    2.291 |          1.9000 |    3.33 | yes
//    5 |  41 |   0.9268 |    1.6675 |    1.799 |          1.9000 |    2.05 | yes
//    5 | 191 |   0.9843 |    1.7184 |    1.746 |          1.9000 |    1.93 | yes
//    7 |  11 |   1.3636 |    2.5584 |    1.876 |          3.0714 |    2.25 | yes
//    7 |  43 |   0.6512 |    3.1253 |    4.800 |          3.0714 |    4.72 | no
//    7 | 193 |   0.9223 |    3.7194 |    4.033 |          3.0714 |    3.33 | no
//   11 |  13 |   1.6154 |    2.2532 |    1.395 |          6.6429 |    4.11 | yes
//   11 |  47 |   2.8723 |    7.8252 |    2.724 |          6.6429 |    2.31 | no
//   11 | 197 |   1.3147 |    8.8593 |    6.739 |          6.6429 |    5.05 | no
//   13 |  17 |   3.3529 |    8.2391 |    2.457 |         14.4341 |    4.30 | yes
//   13 |  53 |   3.9811 |   13.1522 |    3.304 |         14.4341 |    3.63 | yes
//   13 | 199 |   3.5377 |   17.7614 |    5.021 |         14.4341 |    4.08 | no
//   17 |  19 |   3.6316 |    8.7419 |    2.407 |         27.0630 |    7.45 | yes
//   17 |  59 |   7.5424 |   19.0957 |    2.532 |         27.0630 |    3.59 | yes
//   17 | 211 |   8.4313 |   42.1160 |    4.995 |         27.0630 |    3.21 | no
//   19 |  23 |   6.1304 |   16.3893 |    2.673 |         54.0119 |    8.81 | yes
//   19 |  61 |  10.7869 |   32.3764 |    3.001 |         54.0119 |    5.01 | yes
//   19 | 223 |  12.9058 |   69.5343 |    5.388 |         54.0119 |    4.19 | no
//   23 |  29 |  16.9310 |   43.9757 |    2.597 |        161.9541 |    9.57 | yes
//   23 |  67 |  17.1791 |   69.7843 |    4.062 |        161.9541 |    9.43 | yes
//   23 | 227 |  22.3921 |  114.8830 |    5.131 |        161.9541 |    7.23 | yes
//
//    x | PAR/true sup: min/median/max | LL/true sup: min/max | PAR beats LL at
//    5 | 1.746 / 1.764 / 2.291      | 1.93 / 3.33      | 40 of 40 moduli
//    7 | 1.736 / 4.124 / 5.023      | 2.03 / 5.17      | 5 of 40 moduli
//   11 | 1.395 / 4.313 / 7.890      | 2.31 / 6.46      | 11 of 40 moduli
//   13 | 2.236 / 4.000 / 6.604      | 2.42 / 9.22      | 21 of 40 moduli
//   17 | 2.324 / 4.053 / 6.325      | 2.25 / 7.45      | 23 of 40 moduli
//   19 | 2.227 / 4.310 / 5.903      | 3.70 / 8.81      | 29 of 40 moduli
//   23 | 2.597 / 4.240 / 6.311      | 6.85 / 15.44      | 40 of 40 moduli
//
// S4  SUMMING OVER MODULI --- the composite-d generalisation, then the level it buys.
//     GENERALISED BRIDGE (same three lines, ω(d) classes instead of 2):
//       | B_d - 2^w(d) |U_x|/d |  <=  2^w(d) sqrt(p-1) sqrt(D_x(d)),  d squarefree, (d,W)=1
//    x |       d | w(d) |   B_d    |  2^w|U|/d  |    LHS     |    RHS     | LHS/RHS | holds
//    5 |      77 |    2 | 2.000e+0 |   9.351e-1 |   1.065e+0 |   1.664e+1 | 0.06401 | yes
//    5 |      91 |    2 | 1.000e+0 |   7.912e-1 |   2.088e-1 |   1.669e+1 | 0.01251 | yes
//    5 |     187 |    2 | 1.000e+0 |   3.850e-1 |   6.150e-1 |   1.683e+1 | 0.03653 | yes
//    5 |    1001 |    3 | 0.000e+0 |   1.439e-1 |   1.439e-1 |   3.389e+1 | 0.00424 | yes
//    5 |    1729 |    3 | 0.000e+0 |   8.329e-2 |   8.329e-2 |   3.391e+1 | 0.00246 | yes
//    7 |     143 |    2 | 3.000e+0 |   4.196e+0 |   1.196e+0 |   4.635e+1 | 0.02580 | yes
//    7 |     187 |    2 | 2.000e+0 |   3.209e+0 |   1.209e+0 |   4.698e+1 | 0.02572 | yes
//    7 |     247 |    2 | 1.000e+0 |   2.429e+0 |   1.429e+0 |   4.748e+1 | 0.03010 | yes
//    7 |    2431 |    3 | 0.000e+0 |   4.936e-1 |   4.936e-1 |   9.768e+1 | 0.00505 | yes
//    7 |    4301 |    3 | 0.000e+0 |   2.790e-1 |   2.790e-1 |   9.781e+1 | 0.00285 | yes
//   11 |     221 |    2 | 3.100e+1 |   2.932e+1 |   1.679e+0 |   1.164e+2 | 0.01443 | yes
//   11 |     247 |    2 | 2.800e+1 |   2.623e+1 |   1.765e+0 |   1.435e+2 | 0.01230 | yes
//   11 |     391 |    2 | 1.700e+1 |   1.657e+1 |   4.271e-1 |   1.303e+2 | 0.00328 | yes
//   11 |    4199 |    3 | 4.000e+0 |   3.086e+0 |   9.136e-1 |   3.168e+2 | 0.00288 | yes
//   11 |    7163 |    3 | 1.000e+0 |   1.809e+0 |   8.093e-1 |   3.189e+2 | 0.00254 | yes
//   13 |     323 |    2 | 2.930e+2 |   2.942e+2 |   1.241e+0 |   3.085e+2 | 0.00402 | yes
//   13 |     391 |    2 | 2.440e+2 |   2.431e+2 |   9.309e-1 |   3.817e+2 | 0.00244 | yes
//   13 |     551 |    2 | 1.730e+2 |   1.725e+2 |   5.136e-1 |   3.435e+2 | 0.00150 | yes
//   13 |    7429 |    3 | 2.700e+1 |   2.559e+1 |   1.414e+0 |   1.103e+3 | 0.00128 | yes
//   13 |   12121 |    3 | 1.200e+1 |   1.568e+1 |   3.682e+0 |   1.155e+3 | 0.00319 | yes
//   17 |     437 |    2 | 3.671e+3 |   3.670e+3 |   9.771e-1 |   6.968e+2 | 0.00140 | yes
//   17 |     551 |    2 | 2.910e+3 |   2.911e+3 |   7.078e-1 |   9.583e+2 | 0.00074 | yes
//   17 |     713 |    2 | 2.253e+3 |   2.249e+3 |   3.631e+0 |   6.861e+2 | 0.00529 | yes
//   17 |   12673 |    3 | 2.470e+2 |   2.531e+2 |   6.105e+0 |   3.409e+3 | 0.00179 | yes
//   17 |   20387 |    3 | 1.530e+2 |   1.573e+2 |   4.336e+0 |   3.665e+3 | 0.00118 | yes
//   19 |     667 |    2 | 4.995e+4 |   4.996e+4 |   8.120e+0 |   1.838e+3 | 0.00442 | yes
//   19 |     713 |    2 | 4.675e+4 |   4.674e+4 |   1.511e+1 |   1.783e+3 | 0.00848 | yes
//   19 |    1073 |    2 | 3.105e+4 |   3.106e+4 |   1.129e+1 |   2.968e+3 | 0.00380 | yes
//   19 |   20677 |    3 | 3.216e+3 |   3.223e+3 |   7.234e+0 |   1.162e+4 | 0.00062 | yes
//   19 |   29233 |    3 | 2.295e+3 |   2.280e+3 |   1.515e+1 |   1.121e+4 | 0.00135 | yes
//   23 |     899 |    2 | 9.907e+5 |   9.907e+5 |   1.222e+1 |   4.728e+3 | 0.00258 | yes
//   23 |    1073 |    2 | 8.301e+5 |   8.300e+5 |   4.660e-2 |   4.953e+3 | 0.00001 | yes
//   23 |    1271 |    2 | 7.007e+5 |   7.007e+5 |   6.408e+0 |   4.199e+3 | 0.00153 | yes
//   23 |   33263 |    3 | 5.355e+4 |   5.355e+4 |   3.901e-1 |   2.828e+4 | 0.00001 | yes
//   23 |   46139 |    3 | 3.861e+4 |   3.861e+4 |   7.025e+0 |   3.313e+4 | 0.00021 | yes
//   35 composite-d cases, 0 violations, max LHS/RHS = 0.064011
//
//     THE LEVEL OF DISTRIBUTION IT BUYS. Sieve U_x by the primes in (x, z]. Remainder
//     budget R(z) = sum_{d<=z, sf, (d,W)=1} 2^w(d) * 2 sqrt(p-1) sqrt(D_x(d)), main term
//     M(z) = |U_x| prod_{x<q<=z} (1-2/q). D_x(d) <= D is used, which is OPTIMISTIC for
//     the Bridge (measured D_x(d)/D runs far below 1 at small d), so z_max is an upper
//     bound on what the summed Bridge can reach.
//    x |  |U_x|  |     pW      | z_max | R/M at z_max | ln z / ln|U_x| | ln z / ln(pW) | twins need
//    5 | 1.80e+1 |    2.100e+2 |     6 |       0.0000 |         0.6199 |        0.3351 | 0.5 of ln(pW)
//    7 | 1.50e+2 |    2.310e+3 |    12 |       0.3992 |         0.4959 |        0.3208 | 0.5 of ln(pW)
//   11 | 1.62e+3 |    3.003e+4 |    22 |       0.4463 |         0.4183 |        0.2998 | 0.5 of ln(pW)
//   13 | 2.38e+4 |    5.105e+5 |    52 |       0.4529 |         0.3922 |        0.3006 | 0.5 of ln(pW)
//   17 | 4.01e+5 |    9.700e+6 |   150 |       0.4772 |         0.3884 |        0.3115 | 0.5 of ln(pW)
//   19 | 8.33e+6 |    2.231e+8 |   568 |       0.4995 |         0.3980 |        0.3299 | 0.5 of ln(pW)
//   23 | 2.23e+8 |    6.470e+9 |  2152 |       0.4993 |         0.3993 |        0.3397 | 0.5 of ln(pW)
//     ln z_max / ln|U_x| is the exponent the summed Bridge reaches against the CANDIDATE
//     count it sieves; the asymptote is 1/2, since R(z) ~ 2 sqrt|U_x| sum_{d<=z} 2^w(d)
//     ~ 2 sqrt|U_x| (6/pi^2) z ln z against M(z) ~ |U_x| 8 C2 / ln^2 z. Level 1/2 with no
//     averaging over the residue class is the trivial level.
//   [22.7s]
//
// S5  THE RIDER --- sum_L L D_x(L) diverges, and the 0/1 occupancy that forces it.
//     ojaroudi-read.md sec.7 records the observation and notes the corpus has not.
//     sum_r h_L(r)^2 = D + 2 #{pairs a<a' in T_x with L | a'-a}, computed from the
//     full difference multiset, so every L up to 3W is exact.
//     His family is (L, F_i) = 1, so the scan below is restricted to gcd(L, W) = 1.
//    x |      W |     D | max diff | L* = 1+maxdiff | L*/W | persistent onset L0 of D_x(L) >= 0.9 D(1-1/L) | L0/D | L0/W
//    5 |     30 |     3 |       18 |             19 | 0.6333 |                                           20 | 6.67 | 0.6667
//    7 |    210 |    15 |      198 |            199 | 0.9476 |                                          140 | 9.33 | 0.6667
//   11 |   2310 |   135 |     2292 |           2293 | 0.9926 |                                         1340 | 9.93 | 0.5801
//   13 |  30030 |  1485 |    30012 |          30013 | 0.9994 |                                        14838 | 9.99 | 0.4941
//   17 | 510510 | 22275 |   510480 |         510481 | 0.9999 |                                       222738 | 10.00 | 0.4363
//
//     (L* is the least L beyond which occupancy is forced 0/1 for EVERY larger L; it
//      equals 1 + (max T_x - min T_x) exactly, and the read's "L > F_i" is that, up to
//      the 12 the tile's endpoints give up. The PERSISTENT ONSET of the binomial line
//      is the number that matters for the divergence, and it arrives far earlier.)
//
//     The partial sums over the coprime family.  Q(L) = sum_{L' <= L, (L',W)=1} L' D_x(L').
//     Asymptote: L D_x(L) = LD - D^2 exactly for L > L*, so Q(L) ~ (D L^2/2 - D^2 L) x 1/zeta-density.
//    x |     L     |   Q(L)     | Q/(rho D L^2/2) | Q/(rho(D L^2/2 - D^2 L)) | D_x(L)/D(1-1/L) | occupancy
//    5 |         7 |  1.2000e+1 |        0.612245 |                 4.285714 |        0.666667 | collisions possible
//    5 |        29 |  2.9400e+2 |        0.873960 |                 1.101949 |        0.928571 |          forced 0/1
//    5 |        59 |  1.3020e+3 |        0.935076 |                 1.040934 |        0.965517 |          forced 0/1
//    5 |        89 |  3.0300e+3 |        0.956319 |                 1.025450 |        0.977273 |          forced 0/1
//    7 |        13 |  1.9800e+2 |        0.683432 |                -0.522624 |        0.700000 | collisions possible
//    7 |        47 |  2.8620e+3 |        0.755772 |                 2.089487 |        0.695652 | collisions possible
//    7 |       209 |  6.5682e+4 |        0.877143 |                 1.024151 |        0.932692 |          forced 0/1
//    7 |       419 |  2.8168e+5 |        0.935940 |                 1.008120 |        0.966507 |          forced 0/1
//    7 |       629 |  6.4888e+5 |        0.956712 |                 1.004627 |        0.977707 |          forced 0/1
//   11 |       139 |  1.1294e+5 |        0.416752 |                -0.442202 |        0.491573 | collisions possible
//   11 |       577 |  3.1461e+6 |        0.673724 |                 1.266249 |        0.767361 | collisions possible
//   11 |      2309 |  6.6747e+7 |        0.892591 |                 1.010786 |        0.941941 |          forced 0/1
//   11 |      4619 |  2.8253e+8 |        0.944142 |                 1.002758 |        0.970983 |          forced 0/1
//   11 |      6929 |  6.4800e+8 |        0.962283 |                 1.001301 |        0.980658 |          forced 0/1
//   13 |      1873 |  2.4296e+8 |        0.486286 |                -0.830278 |        0.588613 | collisions possible
//   13 |      7507 |  5.7669e+9 |        0.718534 |                 1.188899 |        0.802292 | collisions possible
//   13 |     30029 | 1.1665e+11 |        0.908291 |                 1.007985 |        0.950579 |          forced 0/1
//   13 |     60059 | 4.8924e+11 |        0.952364 |                 1.001910 |        0.975291 |          forced 0/1
//   13 |     90089 | 1.1187e+12 |        0.967847 |                 1.000842 |        0.983527 |          forced 0/1
//   17 |     31903 | 1.0983e+12 |        0.536685 |                -1.353829 |        0.653685 | collisions possible
//   17 |    127627 | 2.4592e+13 |        0.750894 |                 1.153561 |        0.825474 | collisions possible
//   17 |    510509 | 4.8155e+14 |        0.918985 |                 1.006848 |        0.956369 |          forced 0/1
//   17 |   1021019 | 2.0078e+15 |        0.957931 |                 1.001635 |        0.978185 |          forced 0/1
//   17 |   1531529 | 4.5821e+15 |        0.971607 |                 1.000716 |        0.985456 |          forced 0/1
//
//     The unweighted Q(L) therefore grows like D L^2 / 2: it diverges, and the linear
//     regime L D_x(L) = LD - D^2 is exact for every L > L*. Recorded because the
//     corpus has nowhere written it down.
//
// done  [23.5s]
// ============================================================================
// READINGS
// ============================================================================
//
// 1. THE HEADLINE IS NEGATIVE AND IT IS AN IDENTITY. BRIDGE_cert/TRI is
//    sqrt(q/(p-1)) to 8.88e-16 over all 280 (x,q) pairs. Every admissible q
//    satisfies q >= p, so the ratio starts at 1.080123, 1.048809, 1.040833,
//    1.030776, 1.027402, 1.022475, 1.017700 at the smallest modulus of each
//    level and climbs to 5.642104 .. 2.847304 at the largest. NEW CERTIFIED
//    NUMBERS FROM THE CHAIN: 0 of 280. The Bridge trades a factor (p-1) for a
//    factor sqrt((p-1)q), and on certified inputs that trade is always a loss.
//
// 2. THE REASON IS THAT THE ONLY CERTIFIED L^2 INPUT WE HAVE IS THE LEDGER'S OWN
//    SUP. CERTD = q LL(x)^2 is Theorem 1 applied q times, so feeding it back
//    through Cauchy-Schwarz cannot recover what Cauchy-Schwarz gave away. The
//    chain is not weak, it is circular.
//
// 3. AND EVEN THE STRONGEST PLAUSIBLE L^2 INPUT LOSES, FROM x = 17 ON. Feeding
//    the binomial ceiling D_x(q) <= D (measured true everywhere here, PROVEN
//    nowhere) gives 8.49, 24.49, 80.50, 308.29, 1266.41, 5772.64, 29843.65
//    against TRI = 22.80, 61.43, 159.43, 461.89, 974.27, 2376.52, 9069.43. It
//    beats TRI at x = 5..13 and loses at x = 17, 19, 23, by a widening margin.
//    TRI grows like 3^pi(x) and 2 sqrt((p-1)D) like sqrt(W), so the crossover at
//    x = 17 is permanent.
//
// 4. THE MEASURED-INPUT CHAIN HAS ROOM, AND THE ROOM CLOSES. With exact D_x(q),
//    BRIDGE_meas beats TRI at 40 of 40 moduli at every level, by TRI/BRIDGE_meas
//    = 15.458 down to 3.643 at x = 19 and 3.555 .. 2.708 at x = 5. But the
//    crossover threshold D_x(q) >= (p-1) LL(x)^2 falls from 7.22 x D at x = 5 to
//    9.24e-2 x D at x = 23, and S2b finds the crossing: first sampled q past it
//    is 24967 (x = 17), 15737 (x = 19), 95327 (x = 23), where BRIDGE/TRI is
//    1.0672, 1.0650, 1.0570. At x <= 13 the threshold exceeds D and no crossing
//    can exist. So the room is a small-modulus, small-level phenomenon.
//
// 5. AND EVEN INSIDE THE ROOM THE BOUND IS 20x TO 160x THE TRUTH. The slack
//    BRIDGE_meas/TRUE has median 12.99, 32.76, 42.03, 82.14, 148.28, 93.63,
//    163.66 at x = 5..23 and maxima up to 51952.48. The read's "factor ~3 loose
//    per prime", read off his max ratio 0.31, is the best case at the smallest
//    level; the typical case two orders worse.
//
// 6. THE SUP CHANNEL WAS ALREADY OURS AND IS BETTER THAN THE LEDGER AT MOST
//    MODULI. PAR = sqrt(D_x(q)), which is level-ledger-tight.md sec.4(a), sits
//    at median 1.764, 4.124, 4.313, 4.000, 4.053, 4.310, 4.240 times the true
//    sup, against LL(x)/true running 1.93 to 15.44. PAR beats LL at 40, 5, 11,
//    21, 23, 29, 40 of 40 moduli at x = 5..23 -- almost always at x = 23. The
//    Bridge contributes nothing here: its LHS is an aggregate over 2(p-1)
//    classes, and the s = 1 member of its own family IS PAR.
//
// 7. THE COMPOSITE-d GENERALISATION IS FREE AND IT IS WHAT A SIEVE WOULD NEED.
//    |B_d - 2^w(d)|U_x|/d| <= 2^w(d) sqrt(p-1) sqrt(D_x(d)) is the same three
//    lines with 2^w(d) admissible classes instead of 2; 35 cases, 0 violations,
//    max LHS/RHS 0.064011. It is looser than the prime case by another order.
//
// 8. SUMMED, IT REACHES THE TRIVIAL LEVEL AND NOTHING MORE. With the optimistic
//    D_x(d) <= D, the largest z whose remainder budget stays under half the main
//    term is 6, 12, 22, 52, 150, 568, 2152 at x = 5..23, and ln z/ln|U_x| is
//    0.6199, 0.4959, 0.4183, 0.3922, 0.3884, 0.3980, 0.3993 -- settling onto
//    1/2, the level any remainder bound without cancellation gives. Against the
//    interval object the same z is ln z/ln(pW) = 0.3351 .. 0.3397, and twins
//    need 0.5 of ln(pW). The per-prime nature is not what stops it; the missing
//    square-root cancellation in the modulus sum is.
//
// 9. THE RIDER, VERIFIED AND SHARPENED. Occupancy is forced 0/1 for every
//    L > L* = 1 + (max T_x - min T_x) = 19, 199, 2293, 30013, 510481 at
//    x = 5..17, i.e. L*/W = 0.6333, 0.9476, 0.9926, 0.9994, 0.9999: the read's
//    "L > F_i" is exactly this, up to the 12 the tile's endpoints give up. There
//    L D_x(L) = LD - D^2 exactly, and Q(L)/(rho(D L^2/2 - D^2 L)) reads 1.025450,
//    1.004627, 1.001301, 1.000842, 1.000716 at L = 3W. The sum diverges.
//
// 10. AND THE DIVERGENCE STARTS WELL BEFORE F_i. The persistent onset of the
//    binomial line, the last coprime L at which D_x(L) < 0.9 D(1-1/L), is 20,
//    140, 1340, 14838, 222738 at x = 5..17 -- that is L0/D = 6.67, 9.33, 9.93,
//    9.99, 10.00, so L0 -> 10D is the 0.9 threshold read against the exact
//    forced form D - D^2/L, and L0/W falls 0.6667, 0.6667, 0.5801, 0.4941,
//    0.4363. From x = 13 on the onset is strictly inside the collisions-possible
//    range. The divergence is governed by |T_x|, not by F_i.
// ============================================================================
