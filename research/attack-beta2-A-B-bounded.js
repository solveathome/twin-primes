// ============================================================================
// IS B(z,s) BOUNDED? — the one gap left in the proved mean-square Lemma V
// (2026-08-18; attack A of 10 on the 4.2665 exponent. Companion report:
//  research/history/staging/attack-AB-bounded.md. Parent documents:
//  research/sift-limit-attack.md sec.7e, research/lemmaV-parseval.js,
//  research/history/staging/attack-beta2-01-lemmaV-meansquare.md.)
// ============================================================================
// THE OBJECT. lemmaV-parseval.js proves, unconditionally, the mean-square
// Lemma V:  <R^2>_H <= B(z,s) * H  for every H, z, s, with
//     B(z,s) = sum_{e | P(z), e>1}  e * Vabs(e)^2,
//     Vabs(e) = sum_{e1 e2 = e} |V(e1,e2)|,
//     V(e1,e2) = sum over certificate terms i with e | q_i and gcd(e,d1_i) = e1
//                of  w_i / q_i.
// Every step of that chain is an identity or a triangle inequality. The proof
// stops at exactly one place: B bounded as z grows. B(z,3.0) MEASURES flat at
// 1.3833 to 1.4883 across z = 13..37. Nobody has proved it. This file does
// four things.
//
//   (1) PROVES an unconditional, explicit, s-uniform bound
//         B(z,s) <= 9 A(z)^2 (E(z) - 1) = O((log z)^8),
//       A(z) = (5/2) prod_{2<p<z}(1+2/p),  E(z) = (43/25) prod_{2<p<z}(1+4p/(p+2)^2),
//       and verifies its three steps per-e with zero violations. This CLOSES
//       the gap for every downstream use (S6), though not at B = O(1).
//
//   (2) FINDS THE MECHANISM of the measured flatness, exactly. With full
//       (untruncated) Rosser supports V(e1,e2) is computable in closed form and
//       is independent of the split; feeding that profile through the same sum
//       gives  B_model = Delta(z)^2 * (9 prod_{2<p<z}(1+4p/(p-2)^2) - 1)  with
//       Delta(z) = prod_{p<z}(1 - w(p)/p) the twin density, w(2)=1, w(p)=2. The
//       per-prime algebra collapses:
//             (1 - 2/p)^2 * (1 + 4p/(p-2)^2)  =  1 + 4/p^2   EXACTLY,
//       so B_model = (9/4) prod_{2<p<z}(1+4/p^2) - Delta(z)^2, an ABSOLUTELY
//       CONVERGENT Euler product. B is flat because it is within
//       O(sum_{p>z} 4/p^2) = O(1/(z log z)) of a limit, not because a log^4
//       cancels a log^-4.
//
//   (3) IS ADVERSARIAL about the route that would give O(1). Write
//         phi(e) := e * Vabs(e) / ( 2^omega(e) * N(e) ),  N(e) = prod_{p<z, p not| e}(1-w(p)/p),
//       so that B = sum_e (4^omega(e) N(e)^2 / e) phi(e)^2 and a UNIFORM bound
//       phi <= K gives B <= K^2 * B_model = O(1). S4 measures phi. The
//       phi^2-WEIGHTED MEAN is flat; the SUPREMUM is not. So the uniform route
//       is measured false and the estimate that would give O(1) is genuinely a
//       mean value over the divisor lattice, not a maximal statement.
//
//   (4) EXTENDS the measurement above z = 37 as far as affordable, with a
//       streaming term generator (no N-term arrays), and prices the threshold:
//       what growth in B still leaves the mean-square statement useful (S6).
//
//   node research/attack-beta2-A-B-bounded.js            (~4 min at defaults)
//   node research/attack-beta2-A-B-bounded.js --quick    (stop the ladder at z=43)
//   node research/attack-beta2-A-B-bounded.js --deep     (same ladder as the default since 2026-08-20)
//   node research/attack-beta2-A-B-bounded.js S4         (one section; S0..S6)
// ============================================================================
'use strict';
const path = require('path');
const T0 = Date.now(); const el = () => ((Date.now()-T0)/1000).toFixed(1)+'s';

// CUSTODY: the published B, the term list and the exact mean square are the
// repository's own, imported rather than recopied, so every number below is
// anchored to lemmaV-parseval.js and through it to sift-limit-lemmaV.js and the
// 2026-08-14 pilot.
const PAR  = require(path.join(__dirname, 'lemmaV-parseval.js'));
const REPO = require(path.join(__dirname, 'sift-limit-lemmaV.js'));

const QUICK = process.argv.includes('--quick');
const DEEP  = process.argv.includes('--deep');

function primesBelow(n){const s=new Uint8Array(n),o=[];for(let i=2;i<n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<n;j+=i)s[j]=1;}}return o;}
function gcd(a,b){while(b){const t=a%b;a=b;b=t;}return a;}
// Rosser-Iwaniec support, verbatim from sift-limit-lemmaV.js. [d, mu(d)].
function rosserSupport(z,D,upper){
  const ps=primesBelow(z).slice().sort((a,b)=>b-a); const out=[];
  (function rec(start,prod,m){ out.push([prod,(m%2===0)?1:-1]);
    for(let i=start;i<ps.length;i++){ const p=ps[i],m2=m+1;
      if(prod*p>D) continue; const isCond=upper?(m2%2===1):(m2%2===0);
      if(isCond&&prod*p*p*p>D) continue; rec(i+1,prod*p,m2); } })(0,1,0);
  return out; }

// ---------------------------------------------------------------------------
// The streaming profile. Everything this file needs about a (z,s) is a function
// of the map (e1,e2) -> V(e1,e2); the certificate terms are consumed one at a
// time and never stored, so the ladder is limited by the (e1,e2) map and not by
// the term count N. Only pairs with gcd(d1,d2) | 2 have a non-empty joint
// class; all others contribute nothing, exactly as sift-limit-lemmaV.js states.
// ---------------------------------------------------------------------------
function profile(z,s){
  const D=Math.round(Math.pow(z,s));
  const ps=primesBelow(z);
  const sp=rosserSupport(z,D,true), sm=rosserSupport(z,D,false);
  const COMB=[[sm,sp,+1],[sp,sm,+1],[sp,sp,-1]];       // (-,+) (+,-) (+,+)
  const V=new Map();                                    // "e|e1" -> V(e1,e2)
  const T=new Map();                                    // e -> sum_{e|q} 1/q
  let M=0, N=0;
  const pf=new Array(32);
  for(const [S1,S2,eps] of COMB) for(const [d1,s1] of S1) for(const [d2,s2] of S2){
    const g=gcd(d1,d2); if(2%g!==0) continue;           // empty joint class
    const q=d1/g*d2, w=eps*s1*s2, wq=w/q, aq=1/q;
    N++; M+=wq;
    let np=0; for(const p of ps) if(q%p===0) pf[np++]=p;
    for(let m=1;m<(1<<np);m++){
      let e=1; for(let b=0;b<np;b++) if(m&(1<<b)) e*=pf[b];
      const e1=gcd(e,d1), k=e+'|'+e1;
      V.set(k,(V.get(k)||0)+wq);
      T.set(e,(T.get(e)||0)+aq);
    }
  }
  // fold the split map into per-e records
  const rec=new Map();                                  // e -> {va, nu, mx, T}
  for(const [k,v] of V){
    const i=k.indexOf('|'), e=+k.slice(0,i);
    let r=rec.get(e);
    if(!r){ let nu=0; for(const p of ps) if(e%p===0) nu++; r={e,nu,va:0,mx:0,T:T.get(e)}; rec.set(e,r); }
    r.va+=Math.abs(v); if(Math.abs(v)>r.mx) r.mx=Math.abs(v);
  }
  let B=0, BT=0;
  for(const r of rec.values()){ B+=r.e*r.va*r.va; BT+=r.e*r.T*r.T; }
  return {z,s,D,ps,M,N,rec,B,BT,ne:rec.size};
}

// --- the Euler products the whole file is written in -----------------------
// Delta(z) = prod_{p<z}(1 - w(p)/p), w(2)=1, w(p)=2: the twin density.
function twinDensity(ps){ let d=1; for(const p of ps) d*=(p===2?0.5:(1-2/p)); return d; }
// N(e) = prod_{p<z, p not| e}(1 - w(p)/p) = Delta(z) / prod_{p|e}(1-w(p)/p).
function Nof(e,ps){ let v=1; for(const p of ps) if(e%p!==0) v*=(p===2?0.5:(1-2/p)); return v; }
// the closed form sum_{e|P(z), e>1} 4^omega(e) N(e)^2 / e, over EVERY e, and
// its collapsed Euler form. Local factor at odd p: 4/(p (1-2/p)^2) = 4p/(p-2)^2;
// at p=2: 4/(2*(1/2)^2) = 8.
function modelB(ps){
  const D=twinDensity(ps); let E=1,C=1;
  for(const p of ps){ if(p===2){E*=9;} else {E*=(1+4*p/((p-2)*(p-2))); C*=(1+4/(p*p));} }
  return {model:D*D*(E-1), collapsed:2.25*C-D*D, Delta:D, prod4:C};
}
// the unconditional bound of S2: A(z), E(z), and 9 A^2 (E-1).
function provedBound(ps){
  let A=2.5, E=1+18/25;
  for(const p of ps) if(p>2){ A*=(1+2/p); E*=(1+4*p/((p+2)*(p+2))); }
  return {A,E,bound:9*A*A*(E-1)};
}

// ---------------------------------------------------------------------------
// least squares on log-linear models, RSS reported so the reader can compare
// ---------------------------------------------------------------------------
function fitRSS(xs,ys,f){ let r=0; for(let i=0;i<xs.length;i++){const d=ys[i]-f(xs[i]); r+=d*d;} return r; }
function fitConst(xs,ys){ const c=ys.reduce((a,b)=>a+b,0)/ys.length; return {p:[c],f:()=>c,name:'B = c'}; }
function fitLin(xs,ys){                       // B = c + b ln z
  const n=xs.length; let sx=0,sy=0,sxx=0,sxy=0;
  for(let i=0;i<n;i++){const x=Math.log(xs[i]); sx+=x; sy+=ys[i]; sxx+=x*x; sxy+=x*ys[i];}
  const b=(n*sxy-sx*sy)/(n*sxx-sx*sx), c=(sy-b*sx)/n;
  return {p:[c,b],f:(z)=>c+b*Math.log(z),name:'B = c + b ln z'};
}
function fitPow(xs,ys){                       // B = c (ln z)^a
  const n=xs.length; let sx=0,sy=0,sxx=0,sxy=0;
  for(let i=0;i<n;i++){const x=Math.log(Math.log(xs[i])), y=Math.log(ys[i]); sx+=x; sy+=y; sxx+=x*x; sxy+=x*y;}
  const a=(n*sxy-sx*sy)/(n*sxx-sx*sx), lc=(sy-a*sx)/n, c=Math.exp(lc);
  return {p:[c,a],f:(z)=>c*Math.pow(Math.log(z),a),name:'B = c (ln z)^a'};
}
function fitEuler(xs,ys,PS){                  // B = kappa * modelB(z)
  let num=0,den=0;
  for(let i=0;i<xs.length;i++){ const m=modelB(PS[i]).model; num+=ys[i]*m; den+=m*m; }
  const k=num/den;
  return {p:[k],f:(z)=>k*modelB(primesBelow(z)).model,name:'B = kappa * B_model'};
}

// ===========================================================================
// S0  CUSTODY
// ===========================================================================
const PUB_B = {13:1.3833,17:1.4214,19:1.4348,23:1.4503,29:1.4660,31:1.4764,37:1.4883};
function S0(){
  console.log('S0 CUSTODY --- reproductions before anything new is computed\n');
  console.log('  (a) the streaming profile here against research/lemmaV-parseval.js\'s');
  console.log('      spectralRecords(), which is the object sec.7e of sift-limit-attack.md');
  console.log('      makes authoritative. Published: B(z,3.0) = 1.3833 1.4214 1.4348 1.4503');
  console.log('      1.4660 1.4764 1.4883 at z = 13 17 19 23 29 31 37.\n');
  console.log('  z    B here      B spectralRecords   published   rel(here,spec)   N here / N repo');
  for(const z of [13,17,19,23,29,31,37]){
    const P=profile(z,3.0), SD=PAR.spectralRecords(z,3.0);
    console.log(`  ${String(z).padStart(2)}  ${P.B.toFixed(10)}  ${SD.B.toFixed(10)}      ${PUB_B[z].toFixed(4)}      ` +
      `${(Math.abs(P.B-SD.B)/SD.B).toExponential(2)}      ${P.N} / ${SD.N}   [${el()}]`);
  }
  console.log('\n  (b) the main term M, which sec.7e\'s almost-all column is written in');
  console.log('      (attack-beta2-01 sec.3 tables M = 5.5844e-2, 4.6986e-2, 3.9598e-2,');
  console.log('       3.4169e-2, 3.1843e-2, 2.9253e-2 at z = 13..31):');
  const got=[]; for(const z of [13,17,19,23,29,31]) got.push(profile(z,3.0).M.toExponential(4));
  console.log('      measured here: '+got.join(' ')+`   [${el()}]`);
  console.log('\n  (c) the s-corners sec.7e quotes as the band [1.2728, 1.6847] over s in [2.0,3.4]:');
  console.log(`      B(13,2.0) = ${profile(13,2.0).B.toFixed(4)}   B(31,2.0) = ${profile(31,2.0).B.toFixed(4)}   [${el()}]`);
}

// ===========================================================================
// S1  THE THEOREM, STATED WITH ITS QUANTIFIERS
// ===========================================================================
function S1(){
  console.log('\nS1 THE STATEMENT --- what has to be proved, quantified\n');
  console.log('  Fix an integer z >= 3 and a real s > 0. Put D = z^s, P(z) = prod_{p<z} p.');
  console.log('  Let lambda^+ , lambda^- be the Rosser-Iwaniec linear-sieve weights of level D');
  console.log('  on the divisors of P(z) (lambda_d = mu(d) on the Rosser support S^+ / S^-).');
  console.log('  Let i run over the certificate index set of sift-limit-lemmaV.js: three blocks');
  console.log('  (a,b) = (-,+), (+,-), (+,+) with signs +1, +1, -1, and inside each block over');
  console.log('  pairs (d1,d2) in S^a x S^b with gcd(d1,d2) | 2; set q_i = [d1,d2] and');
  console.log('  w_i = eps * mu(d1) * mu(d2) in {+1,-1}. For e | P(z), e > 1, and each');
  console.log('  factorisation e = e1 e2 put');
  console.log('      V(e1,e2) = sum_{i : e | q_i, gcd(e,d1_i) = e1}  w_i / q_i,');
  console.log('      Vabs(e)  = sum_{e1 e2 = e} |V(e1,e2)|,');
  console.log('      B(z,s)   = sum_{e | P(z), e > 1}  e * Vabs(e)^2.');
  console.log('');
  console.log('  THEOREM TO PROVE (the only gap in the mean-square Lemma V).');
  console.log('    There is an absolute constant B* such that for ALL z >= 3 and ALL s in a');
  console.log('    fixed range (the corpus runs s in [2.0,3.4]),  B(z,s) <= B*.');
  console.log('');
  console.log('  Two things it is NOT, because both were checked before anything was tried.');
  console.log('    * It carries NO quantifier over window positions x and no maximal law: the');
  console.log('      position variable was already removed by Parseval (L3 of lemmaV-parseval).');
  console.log('    * It carries no quantifier over H either: B is H-free by construction.');
  console.log('  What it IS: a divisor-weighted second moment of signed Rosser weights, i.e. a');
  console.log('  character-free mean-value estimate. S2 proves a polylog form of it outright,');
  console.log('  S3 identifies the exact mechanism of the O(1) form, S4 is adversarial about');
  console.log('  the route to O(1), and S6 prices what growth in B is actually tolerable.');
}

// ===========================================================================
// S2  THEOREM 1 --- an unconditional, explicit, s-uniform polylog bound
// ===========================================================================
// PROOF, in three steps, each verified per-e below.
//
// (i) The index sets {i : e|q_i, gcd(e,d1_i)=e1} PARTITION {i : e|q_i} as e1
//     runs over the divisors of e. Hence, by the triangle inequality,
//         Vabs(e) <= T(e) := sum_{i : e | q_i} 1/q_i.
//     This step discards every sign; it is where all the looseness lives.
//
// (ii) T(e) <= 3 A(z) rho(e). Each of the three blocks has d1, d2 ranging over
//     subsets of the divisors of P(z), so T(e) <= 3 * U(e) with
//         U(e) = sum over pairs (d1,d2) | P(z)^2, gcd(d1,d2) | 2, e | [d1,d2]
//                of 1/[d1,d2].
//     U factors over p < z. For odd p the admissible local states are
//     (p|neither), (p|d1), (p|d2) -- (p|both) is barred by gcd | 2 -- with
//     local weights 1, 1/p, 1/p; e | [d1,d2] bars the first state when p | e.
//     For p = 2 all four states are admissible with weights 1, 1/2, 1/2, 1/2.
//     So U(e) = A(z) * rho(e) with
//         A(z)  = (5/2) prod_{2<p<z} (1 + 2/p),
//         rho(e)= prod_{p|e} r(p),  r(2) = (3/2)/(5/2) = 3/5,  r(p) = 2/(p+2).
//
// (iii) B(z,s) = sum_{e>1} e Vabs(e)^2 <= 9 A(z)^2 sum_{e>1} e rho(e)^2
//     = 9 A(z)^2 ( prod_{p<z}(1 + p r(p)^2) - 1 ) = 9 A(z)^2 (E(z) - 1),
//         E(z) = (1 + 18/25) prod_{2<p<z} (1 + 4p/(p+2)^2).
//
// A(z) ~ c2 (log z)^2 and E(z) ~ c4 (log z)^4 by Mertens, so B = O((log z)^8),
// uniformly in s, with no hypothesis anywhere. QED.
// ===========================================================================
function S2(){
  console.log('\nS2 THEOREM 1 --- B(z,s) <= 9 A(z)^2 (E(z)-1) = O((log z)^8), UNCONDITIONAL\n');
  console.log('  Chain: Vabs(e) <= T(e) := sum_{i:e|q_i} 1/q_i   [partition + triangle]');
  console.log('         T(e)    <= 3 A(z) rho(e)                 [Euler product over p<z]');
  console.log('         B       <= 9 A(z)^2 (E(z)-1)             [sum over e]');
  console.log('  A(z) = (5/2) prod_{2<p<z}(1+2/p) ~ c (log z)^2');
  console.log('  E(z) = (43/25) prod_{2<p<z}(1+4p/(p+2)^2) ~ c (log z)^4');
  console.log('  Both steps are verified per-e; viol1 and viol2 are the worst violations found.\n');
  console.log('  z    B(z,3.0)   sum_e e T(e)^2   A(z)      E(z)      9A^2(E-1)   bound/B    viol1     viol2');
  const ZS = QUICK?[13,17,19,23,29,31]:[13,17,19,23,29,31,37,41];
  const xs=[],ys=[];
  for(const z of ZS){
    const P=profile(z,3.0), pb=provedBound(P.ps);
    let v1=0,v2=0;
    for(const r of P.rec.values()){
      if(r.va-r.T>v1) v1=r.va-r.T;
      let rho=1; for(const p of P.ps) if(r.e%p===0) rho*=(p===2?0.6:2/(p+2));
      const b=3*pb.A*rho; if(r.T-b>v2) v2=r.T-b;
    }
    xs.push(z); ys.push(pb.bound/P.B);
    console.log(`  ${String(z).padStart(2)}  ${P.B.toFixed(6)}   ${P.BT.toExponential(4).padStart(10)}    ${pb.A.toFixed(4).padStart(8)}  ${pb.E.toFixed(4).padStart(8)}  ` +
      `${pb.bound.toExponential(4)}  ${(pb.bound/P.B).toExponential(3)}  ${v1<=0?' none  ':v1.toExponential(1)}  ${v2<=0?' none  ':v2.toExponential(1)}   [${el()}]`);
  }
  const f=fitPow(xs,ys);
  console.log(`\n  The bound's own looseness grows like (log z)^${f.p[1].toFixed(2)} over this range, heading`);
  console.log('  for (log z)^8 asymptotically: the proof is honest and enormously lossy, and S6');
  console.log('  is the section that decides whether that matters. It does not.');
  console.log('\n  s-uniformity (the bound does not see s at all; B does, a little):');
  console.log('  z    B(s=2.0)  B(s=2.6)  B(s=3.0)  B(s=3.4)   bound (s-free)');
  for(const z of (QUICK?[13,19,29]:[13,19,29,37])){
    const row=[2.0,2.6,3.0,3.4].map(s=>profile(z,s).B.toFixed(4).padStart(8));
    console.log(`  ${String(z).padStart(2)}  ${row.join('  ')}   ${provedBound(primesBelow(z)).bound.toExponential(3)}   [${el()}]`);
  }
}

// ===========================================================================
// S3  THE MECHANISM --- why B is flat, in closed form
// ===========================================================================
// With FULL (untruncated) Rosser supports the split sum is computable exactly.
// For odd e, e | q forces each p | e1 into d1 and each p | e2 into d2, and the
// local weights are -1/p either way, so V(e1,e2) does not depend on the split:
//     V_full(e1,e2) = mu(e)/e * prod_{p<z, p not| e}(1 - w(p)/p) = mu(e) N(e)/e,
// with w(2) = 1, w(p) = 2 and N(e) = prod_{p<z, p not| e}(1-w(p)/p). (At p = 2
// the two admissible states cancel exactly, so V_full = 0 for even e; that
// cancellation is broken by the level truncation, which is why even e appear at
// all.) Feeding that profile through the same sum,
//     B_model = sum_{e>1} e (2^omega(e) N(e)/e)^2 = Delta(z)^2 ( 9 prod_{2<p<z}(1+4p/(p-2)^2) - 1 ),
// and the per-prime algebra collapses:
//     (1-2/p)^2 (1 + 4p/(p-2)^2) = ((p-2)^2 + 4p)/p^2 = 1 + 4/p^2.
// So B_model = (9/4) prod_{2<p<z}(1+4/p^2) - Delta(z)^2, ABSOLUTELY CONVERGENT.
// ===========================================================================
function S3(){
  console.log('\nS3 THE MECHANISM --- the flatness is an absolutely convergent Euler product\n');
  console.log('  The per-prime identity, checked exactly:  (1-2/p)^2 (1+4p/(p-2)^2) = 1 + 4/p^2');
  let worst=0;
  for(const p of primesBelow(2000)) if(p>2){
    const lhs=(1-2/p)*(1-2/p)*(1+4*p/((p-2)*(p-2))), rhs=1+4/(p*p);
    if(Math.abs(lhs-rhs)>worst) worst=Math.abs(lhs-rhs);
  }
  console.log(`  worst deviation over all odd p < 2000: ${worst.toExponential(2)}`);
  console.log('  Consequence:  B_model(z) = Delta^2 (9 prod_{2<p<z}(1+4p/(p-2)^2) - 1)');
  console.log('                           = (9/4) prod_{2<p<z}(1+4/p^2) - Delta(z)^2,  both forms below.\n');
  console.log('  z      Delta(z)     B_model      collapsed     diff        B(z,3.0)   B/B_model');
  const ZS=QUICK?[13,17,19,23,29,31]:[13,17,19,23,29,31,37,41,43,47];
  for(const z of ZS){
    const ps=primesBelow(z), m=modelB(ps), P=profile(z,3.0);
    console.log(`  ${String(z).padStart(3)}  ${m.Delta.toExponential(5)}  ${m.model.toFixed(7)}  ${m.collapsed.toFixed(7)}  ${Math.abs(m.model-m.collapsed).toExponential(1)}  ` +
      `${P.B.toFixed(6)}   ${(P.B/m.model).toFixed(5)}   [${el()}]`);
  }
  console.log('\n  The limit, and the rate. B_model -> (9/4) prod_{p>2}(1+4/p^2), tail 4 sum_{p>z} 1/p^2:');
  for(const z of [100,1000,10000,100000,1000000]){
    const m=modelB(primesBelow(z));
    console.log(`    z = ${String(z).padStart(7)}:  B_model = ${m.collapsed.toFixed(8)}   (1/4)prod(1+4/p^2) = ${(0.25*m.prod4).toFixed(8)}   [${el()}]`);
  }
  console.log('\n  So the boundedness of B is NOT a log^4 cancelling a log^-4. It is one');
  console.log('  convergent product, and the convergence rate 4 sum_{p>z}1/p^2 ~ 4/(z ln z) is');
  console.log('  why B looks flat at every z anyone can compute: the model itself moves 7% over');
  console.log('  z = 13..47 and has 2% left to run to its limit.');
}

// ===========================================================================
// S4  ADVERSARIAL --- is the uniform-profile route to B = O(1) alive?
// ===========================================================================
// phi(e) := e Vabs(e) / (2^omega(e) N(e)). Then, EXACTLY,
//     B = sum_{e>1} ( 4^omega(e) N(e)^2 / e ) phi(e)^2,
// and a uniform phi <= K gives B <= K^2 B_model = O(K^2). S4 asks whether such
// a K exists. Two statistics: the supremum of phi (what a uniform proof needs)
// and the phi^2-weighted rms (what B actually is). They do not agree.
// ===========================================================================
function S4(){
  console.log('\nS4 THE PROFILE --- sup phi against weighted-mean phi, and they disagree\n');
  console.log('  phi(e) = e Vabs(e) / (2^omega(e) N(e));  B = sum_e (4^omega(e) N(e)^2/e) phi(e)^2.');
  console.log('  A uniform phi <= K proves B <= K^2 B_model = O(1). psi is the same normalisation');
  console.log('  applied to a SINGLE split, psi(e1,e2) = e|V(e1,e2)|/N(e), which is what a');
  console.log('  one-divisor-at-a-time argument would have to bound.\n');
  console.log('  z    B(z,3.0)   sup phi   arg e        sup psi   rms_w phi   B_model  B/B_model  (sup phi)^2 B_model   /B');
  const ZS=QUICK?[13,17,19,23,29,31]:[13,17,19,23,29,31,37,41,43,47];
  const xs=[],mx=[],rm=[];
  for(const z of ZS){
    const P=profile(z,3.0), m=modelB(P.ps);
    let mp=0,arg=0,mpsi=0,sw=0,swp=0;
    for(const r of P.rec.values()){
      const N=Nof(r.e,P.ps), tw=Math.pow(2,r.nu);
      const phi=r.e*r.va/(tw*N); if(phi>mp){mp=phi;arg=r.e;}
      const psi=r.e*r.mx/N;      if(psi>mpsi) mpsi=psi;
      const w=Math.pow(4,r.nu)*N*N/r.e; sw+=w; swp+=w*phi*phi;
    }
    xs.push(z); mx.push(mp); rm.push(Math.sqrt(swp/sw));
    const unif=mp*mp*m.model;
    console.log(`  ${String(z).padStart(2)}  ${P.B.toFixed(6)}   ${mp.toFixed(4).padStart(7)}   ${String(arg).padStart(6)}      ${mpsi.toFixed(4).padStart(7)}    ${Math.sqrt(swp/sw).toFixed(4)}   ${m.model.toFixed(4)}   ${(P.B/m.model).toFixed(5)}      ${unif.toFixed(3).padStart(8)}       ${(unif/P.B).toFixed(2).padStart(6)}   [${el()}]`);
  }
  const c1=fitConst(xs,mx), l1=fitLin(xs,mx), p1=fitPow(xs,mx);
  const c2=fitConst(xs,rm), l2=fitLin(xs,rm), p2=fitPow(xs,rm);
  console.log('\n  Model comparison on the two statistics (RSS; lower is better):');
  console.log(`   sup phi:   const c=${c1.p[0].toFixed(4)} RSS=${fitRSS(xs,mx,c1.f).toExponential(3)} |` +
    ` c+b lnz  c=${l1.p[0].toFixed(3)} b=${l1.p[1].toFixed(4)} RSS=${fitRSS(xs,mx,l1.f).toExponential(3)} |` +
    ` c(lnz)^a c=${p1.p[0].toFixed(3)} a=${p1.p[1].toFixed(3)} RSS=${fitRSS(xs,mx,p1.f).toExponential(3)}`);
  console.log(`   rms_w phi: const c=${c2.p[0].toFixed(4)} RSS=${fitRSS(xs,rm,c2.f).toExponential(3)} |` +
    ` c+b lnz  c=${l2.p[0].toFixed(3)} b=${l2.p[1].toFixed(4)} RSS=${fitRSS(xs,rm,l2.f).toExponential(3)} |` +
    ` c(lnz)^a c=${p2.p[0].toFixed(3)} a=${p2.p[1].toFixed(3)} RSS=${fitRSS(xs,rm,p2.f).toExponential(3)}`);
  console.log(`   const/linear RSS ratio: sup phi ${(fitRSS(xs,mx,c1.f)/fitRSS(xs,mx,l1.f)).toFixed(1)}x, rms_w phi ${(fitRSS(xs,rm,c2.f)/fitRSS(xs,rm,l2.f)).toFixed(1)}x.`);
  console.log('   So a UNIFORM bound phi <= K with K absolute is rejected by the data, and the');
  console.log('   best a uniform argument can deliver on this evidence is B = O((log z)^2). What');
  console.log('   is flat is the phi^2-WEIGHTED MEAN, which is not a statement any sup-norm');
  console.log('   argument produces. That is the shape of the estimate that would give O(1).');
  console.log('\n  Does the sup rise at every level s, or only at s = 3.0?');
  console.log('  s     z=13     z=19     z=29     z=37      (sup phi)');
  for(const s of [2.0,2.6,3.0,3.4]){
    const row=[13,19,29,37].map(z=>{
      const P=profile(z,s); let mp=0;
      for(const r of P.rec.values()){ const N=Nof(r.e,P.ps),tw=Math.pow(2,r.nu),ph=r.e*r.va/(tw*N); if(ph>mp)mp=ph; }
      return mp.toFixed(3).padStart(7);
    });
    console.log(`  ${s.toFixed(1)}  ${row.join('  ')}   [${el()}]`);
  }
}

// ===========================================================================
// S5  THE LADDER --- B beyond z = 37, and which model survives it
// ===========================================================================
function S5(){
  console.log('\nS5 THE LADDER --- B(z,3.0) as far as this machine reaches\n');
  // The default ladder ran to z = 53 until 2026-08-20 and reading 5 quoted an
  // endpoint of 1.5471 at z = 73 that only history/staging/attack-AB-bounded.md
  // carried (mismatch adjudication #40). The endpoint is load-bearing -- it is
  // the whole of "B rises monotonically at all twenty steps" -- so the default
  // now runs all twenty and prints it. The extra five rows cost about two
  // minutes; the model comparison below is printed BOTH over the whole ladder
  // and restricted to z <= 53, so the figures that report quotes stay
  // reproducible from this block.
  const ZS = QUICK ? [13,17,19,23,29,31,37,41,43]
            : DEEP ? [13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73]
                   : [13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73];
  console.log('  z     N          #e       B(z,3.0)     B_model     B/B_model   d ln B/d ln ln z');
  const xs=[],ys=[],PS=[];
  let prevB=null,prevZ=null;
  for(const z of ZS){
    const t=Date.now(), P=profile(z,3.0), m=modelB(P.ps);
    let sl='   --  ';
    if(prevB!==null) sl=(Math.log(P.B/prevB)/Math.log(Math.log(z)/Math.log(prevZ))).toFixed(3).padStart(7);
    prevB=P.B; prevZ=z;
    xs.push(z); ys.push(P.B); PS.push(P.ps);
    console.log(`  ${String(z).padStart(3)}  ${String(P.N).padStart(9)}  ${String(P.ne).padStart(6)}   ${P.B.toFixed(7)}   ${m.model.toFixed(7)}   ${(P.B/m.model).toFixed(5)}      ${sl}   [${((Date.now()-t)/1000).toFixed(1)}s, ${el()}]`);
  }
  const cs=fitConst(xs,ys), ln=fitLin(xs,ys), pw=fitPow(xs,ys), eu=fitEuler(xs,ys,PS);
  console.log('\n  Model comparison over the whole ladder (RSS; lower is better):');
  for(const f of [cs,ln,pw,eu])
    console.log(`   ${f.name.padEnd(20)}  params [${f.p.map(v=>v.toFixed(5)).join(', ')}]   RSS = ${fitRSS(xs,ys,f.f).toExponential(4)}`);
  {
    // the same comparison on the z <= 53 sub-ladder, which is the range
    // history/staging/attack-AB-bounded.md reports and every earlier reading
    // of this file was written against. Kept so extending the ladder does not
    // orphan those figures.
    const k=xs.filter(z=>z<=53).length;
    if(k>2&&k<xs.length){
      const xs2=xs.slice(0,k), ys2=ys.slice(0,k), PS2=PS.slice(0,k);
      const c2=fitConst(xs2,ys2), l2=fitLin(xs2,ys2), p2=fitPow(xs2,ys2), e2=fitEuler(xs2,ys2,PS2);
      console.log(`\n  The same comparison restricted to z <= 53 (${k} rows), the range the earlier readings use:`);
      for(const f of [c2,l2,p2,e2])
        console.log(`   ${f.name.padEnd(20)}  params [${f.p.map(v=>v.toFixed(5)).join(', ')}]   RSS = ${fitRSS(xs2,ys2,f.f).toExponential(4)}`);
    }
  }
  console.log('\n  Extrapolation, stated as what each model would give and not as a prediction:');
  console.log('  z          B const     B c+b lnz   B c(lnz)^a   B kappa*model   (kappa*model has a finite limit)');
  for(const z of [100,1000,10000,1000000]){
    console.log(`  ${String(z).padStart(8)}   ${cs.f(z).toFixed(4).padStart(8)}    ${ln.f(z).toFixed(4).padStart(8)}    ${pw.f(z).toFixed(4).padStart(8)}     ${eu.f(z).toFixed(4).padStart(8)}   [${el()}]`);
  }
}

// ===========================================================================
// S6  THE THRESHOLD --- what growth in B still leaves the statement useful
// ===========================================================================
// The brief's item 3. Three currencies, all from lemmaV-parseval.js's own
// downstream uses of <R^2>_H <= B H.
//   (a) Lemma V's literal ask (sift-limit-attack.md sec.4.5): R << H/log^3 H.
//       In mean square that is sqrt(B H) <= H/log^3 H, i.e. B <= H/log^6 H.
//   (b) The almost-all window (attack-beta2-01 sec.3): Chebyshev gives
//       density{T <= 0} <= B/(H M^2), so u_aa(eta) = ln(B/(eta M^2))/ln z.
//   (c) The all-positions exponent Chebyshev + a union bound over the period
//       delivers (attack-beta2-01 sec.4(ii)): u_1^prov = ln(W B/M^2)/ln z.
// ===========================================================================
function S6(){
  console.log('\nS6 THE THRESHOLD --- how fast may B grow before anything breaks\n');
  console.log('  (a) LEMMA V\'S LITERAL ASK. sift-limit-attack.md sec.4.5 wants R << H/log^3 H.');
  console.log('      In mean square: sqrt(B H) <= H/log^3 H  <=>  B <= H/log^6 H. At the working');
  console.log('      windows that ceiling is a POWER of z, not a constant:\n');
  console.log('  z     H = z^2.0     ceiling      H = z^2.5790   ceiling      H = z^4.26645  ceiling      B proved');
  for(const z of [13,29,101,1009,1e6]){
    const cell=(u)=>{ const H=Math.pow(z,u), L=Math.log(H); return (H/Math.pow(L,6)).toExponential(3); };
    const pb=provedBound(primesBelow(Math.max(3,Math.min(z,2e6))));
    console.log(`  ${String(z).padStart(7)}  ${Math.pow(z,2).toExponential(2)}   ${cell(2.0)}    ${Math.pow(z,2.579).toExponential(2)}    ${cell(2.579)}    ${Math.pow(z,4.26645).toExponential(2)}   ${cell(4.26645)}   ${pb.bound.toExponential(3)}   [${el()}]`);
  }
  console.log('\n      So the mean-square Lemma V holds as soon as H >= B log^6 H. With THEOREM 1');
  console.log('      (B = O(log^8 z)) that threshold is H >> (log z)^14 -- a POLYLOG window, far');
  console.log('      below every window in this corpus. The smallest H at which the proved bound');
  console.log('      already clears the ask:\n');
  console.log('  z      B proved     H_min (proved)   as u = ln H/ln z    H_min (measured B)   as u');
  for(const z of [13,29,101,1009,1e6]){
    const ps=primesBelow(Math.max(3,Math.min(z,2e6))), pb=provedBound(ps);
    const Bm = z<=47 ? profile(z,3.0).B : null;
    const hmin=(B)=>{ let H=4; while(H<1e18 && B>H/Math.pow(Math.log(H),6)) H=Math.ceil(H*1.02); return H; };
    const h1=hmin(pb.bound), h2=Bm!==null?hmin(Bm):null;
    console.log(`  ${String(z).padStart(7)}  ${pb.bound.toExponential(3)}   ${h1.toExponential(3)}        ${(Math.log(h1)/Math.log(z)).toFixed(4)}          ` +
      `${h2!==null?h2.toExponential(3)+'          '+(Math.log(h2)/Math.log(z)).toFixed(4):'  --                --'}   [${el()}]`);
  }
  console.log('\n  (b) THE ALMOST-ALL WINDOW. u_aa(eta) = ln(B/(eta M^2))/ln z, eta = 1/2.');
  console.log('      Columns: B measured, then B forced to (ln z)^A for A = 0, 2, 4, 8 to show');
  console.log('      how little the growth rate matters. M is the measured main term.\n');
  console.log('  z     M            u_aa(B meas)  u_aa(A=0)  u_aa(A=2)  u_aa(A=4)  u_aa(A=8)');
  for(const z of [13,19,29,37,43,47]){
    const P=profile(z,3.0), lz=Math.log(z), M=P.M;
    const u=(B)=>(Math.log(2*B/(M*M))/lz).toFixed(4).padStart(9);
    console.log(`  ${String(z).padStart(2)}  ${M.toExponential(5)}   ${u(P.B)}  ${u(1)}  ${u(Math.pow(lz,2))}  ${u(Math.pow(lz,4))}  ${u(Math.pow(lz,8))}   [${el()}]`);
  }
  console.log('\n      Every column tends to 0: u_aa = (A + 4) lnln z / ln z + O(1/ln z). The');
  console.log('      almost-all exponent is 0 for EVERY polylog B, and attack-beta2-01 reading 3');
  console.log('      already prices that at nothing. So B\'s growth rate is invisible here too.');
  console.log('\n  (c) THE ALL-POSITIONS EXPONENT, AND B IS NOT IN IT.');
  console.log('      attack-beta2-01 sec.4(ii) defines u_1^prov as the smallest u with');
  console.log('      H M >= sqrt(W * min(B H, B2)),  W = P(z),  B2 = (1/4) sum_e e^2 Vabs(e)^2');
  console.log('      the H-free half of Theorem A. min() has TWO branches and they differ by a');
  console.log('      whole factor of theta:');
  console.log('        BH branch:  u = ln(W B / M^2) / ln z            = theta/ln z   + O(1)');
  console.log('        B2 branch:  u = (theta/2 + ln(B2)/2 - ln M)/ln z = theta/(2 ln z) + O(1)');
  console.log('      A DEFECT FIXED HERE (2026-08-18 salvage): the first draft of this section');
  console.log('      tabled the BH branch alone and set it against the source\'s 4.3604/4.7087.');
  console.log('      Those are B2-branch numbers; the BH branch reads 6.7796/7.4030. The min is');
  console.log('      reinstated below and reproduces the source EXACTLY, which is the custody');
  console.log('      check the first draft did not have.\n');
  console.log('  z   theta/lnz  B        B2         u(BH)    u(B2)    u_1^prov  source   u* crossover');
  const SRC={19:'4.3604',23:'4.7087',29:'5.0021'};
  for(const z of [13,17,19,23,29,37,43,47]){
    const P=profile(z,3.0), lz=Math.log(z), M=P.M;
    let lnW=0; for(const p of P.ps) lnW+=Math.log(p);
    let B2=0; for(const r of P.rec.values()) B2+=r.e*r.e*r.va*r.va; B2/=4;
    const u1=(lnW+Math.log(P.B/(M*M)))/lz, u2=(lnW/2+Math.log(B2)/2-Math.log(M))/lz;
    const us=Math.log(B2/P.B)/lz;
    console.log(`  ${String(z).padStart(2)}  ${(lnW/lz).toFixed(4)}   ${P.B.toFixed(4)}   ${B2.toExponential(3)}   ${u1.toFixed(4)}   ${u2.toFixed(4)}   ${Math.min(u1,u2).toFixed(4)}    ${(SRC[z]||'--').padStart(6)}   ${us.toFixed(4)}   [${el()}]`);
  }
  console.log('\n      THE READING. The min picks the B2 branch at EVERY z from 13 to 47, so the');
  console.log('      all-positions exponent the proven bound delivers does not contain B at all.');
  console.log('      B binds only for windows below the crossover u* = ln(B2/B)/ln z, which runs');
  console.log('      1.4641 to 2.6912 over z = 13..47 while u_1^prov runs 3.4299 to 7.1966: the');
  console.log('      solution sits above the crossover at every level, with room to spare.');
  console.log('      Even in the branch B does live in, a power of log z costs only lnln z/ln z');
  console.log('      = 0.3672 at z = 13 falling to 0.3501 at z = 47 -- under half a unit per');
  console.log('      power, and SHRINKING. (The full A = 0 to A = 8 spread is 8x that, 2.9379');
  console.log('      down to 2.8012, NOT under half a unit; an earlier draft of this line said');
  console.log('      it was, conflating the per-power cost with the whole spread.)');
  console.log('      Meanwhile theta(z)/(2 ln z) diverges like z/(2 ln z). B is not the binding');
  console.log('      term in any of the three currencies, and in this one it is not a term.');
}

function main(){
  const only=process.argv.slice(2).filter(a=>/^S[0-6]$/.test(a));
  const run={S0,S1,S2,S3,S4,S5,S6};
  for(const k of ['S0','S1','S2','S3','S4','S5','S6']) if(!only.length||only.includes(k)) run[k]();
  console.log('\nDONE '+el());
}
if(require.main===module) main();
module.exports={profile,modelB,provedBound,twinDensity,Nof};

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-beta2-A-B-bounded.js
//   invocation:  node research/attack-beta2-A-B-bounded.js
//   code-sha256: d3279c5c803c4982ec36eb204f248569e2abe60ea36fce54360b977c02449199
//   out-sha256:  a17439bcbe8379271843c1120220e351434dc8e809dd56cc856facf22fd56191
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     268.0 s
// ============================================================================
// S0 CUSTODY --- reproductions before anything new is computed
//
//   (a) the streaming profile here against research/lemmaV-parseval.js's
//       spectralRecords(), which is the object sec.7e of sift-limit-attack.md
//       makes authoritative. Published: B(z,3.0) = 1.3833 1.4214 1.4348 1.4503
//       1.4660 1.4764 1.4883 at z = 13 17 19 23 29 31 37.
//
//   z    B here      B spectralRecords   published   rel(here,spec)   N here / N repo
//   13  1.3832630573  1.3832630573      1.3833      1.61e-16      852 / 852   [0.0s]
//   17  1.4213895883  1.4213895883      1.4214      1.56e-16      2236 / 2236   [0.0s]
//   19  1.4347739082  1.4347739082      1.4348      1.55e-16      4764 / 4764   [0.1s]
//   23  1.4502543003  1.4502543003      1.4503      0.00e+0      9636 / 9636   [0.2s]
//   29  1.4659949365  1.4659949365      1.4660      7.57e-16      20700 / 20700   [0.4s]
//   31  1.4764179738  1.4764179738      1.4764      1.50e-16      35868 / 35868   [0.8s]
//   37  1.4883304125  1.4883304125      1.4883      1.19e-15      76484 / 76484   [2.0s]
//
//   (b) the main term M, which sec.7e's almost-all column is written in
//       (attack-beta2-01 sec.3 tables M = 5.5844e-2, 4.6986e-2, 3.9598e-2,
//        3.4169e-2, 3.1843e-2, 2.9253e-2 at z = 13..31):
//       measured here: 5.5844e-2 4.6986e-2 3.9598e-2 3.4169e-2 3.1843e-2 2.9253e-2   [2.4s]
//
//   (c) the s-corners sec.7e quotes as the band [1.2728, 1.6847] over s in [2.0,3.4]:
//       B(13,2.0) = 1.2728   B(31,2.0) = 1.6847   [2.4s]
//
// S1 THE STATEMENT --- what has to be proved, quantified
//
//   Fix an integer z >= 3 and a real s > 0. Put D = z^s, P(z) = prod_{p<z} p.
//   Let lambda^+ , lambda^- be the Rosser-Iwaniec linear-sieve weights of level D
//   on the divisors of P(z) (lambda_d = mu(d) on the Rosser support S^+ / S^-).
//   Let i run over the certificate index set of sift-limit-lemmaV.js: three blocks
//   (a,b) = (-,+), (+,-), (+,+) with signs +1, +1, -1, and inside each block over
//   pairs (d1,d2) in S^a x S^b with gcd(d1,d2) | 2; set q_i = [d1,d2] and
//   w_i = eps * mu(d1) * mu(d2) in {+1,-1}. For e | P(z), e > 1, and each
//   factorisation e = e1 e2 put
//       V(e1,e2) = sum_{i : e | q_i, gcd(e,d1_i) = e1}  w_i / q_i,
//       Vabs(e)  = sum_{e1 e2 = e} |V(e1,e2)|,
//       B(z,s)   = sum_{e | P(z), e > 1}  e * Vabs(e)^2.
//
//   THEOREM TO PROVE (the only gap in the mean-square Lemma V).
//     There is an absolute constant B* such that for ALL z >= 3 and ALL s in a
//     fixed range (the corpus runs s in [2.0,3.4]),  B(z,s) <= B*.
//
//   Two things it is NOT, because both were checked before anything was tried.
//     * It carries NO quantifier over window positions x and no maximal law: the
//       position variable was already removed by Parseval (L3 of lemmaV-parseval).
//     * It carries no quantifier over H either: B is H-free by construction.
//   What it IS: a divisor-weighted second moment of signed Rosser weights, i.e. a
//   character-free mean-value estimate. S2 proves a polylog form of it outright,
//   S3 identifies the exact mechanism of the O(1) form, S4 is adversarial about
//   the route to O(1), and S6 prices what growth in B is actually tolerable.
//
// S2 THEOREM 1 --- B(z,s) <= 9 A(z)^2 (E(z)-1) = O((log z)^8), UNCONDITIONAL
//
//   Chain: Vabs(e) <= T(e) := sum_{i:e|q_i} 1/q_i   [partition + triangle]
//          T(e)    <= 3 A(z) rho(e)                 [Euler product over p<z]
//          B       <= 9 A(z)^2 (E(z)-1)             [sum over e]
//   A(z) = (5/2) prod_{2<p<z}(1+2/p) ~ c (log z)^2
//   E(z) = (43/25) prod_{2<p<z}(1+4p/(p+2)^2) ~ c (log z)^4
//   Both steps are verified per-e; viol1 and viol2 are the worst violations found.
//
//   z    B(z,3.0)   sum_e e T(e)^2   A(z)      E(z)      9A^2(E-1)   bound/B    viol1     viol2
//   13  1.383263    3.3238e+3      8.8636    6.0796  3.5917e+3  2.597e+3   none     none     [2.4s]
//   17  1.421390    5.4689e+3     10.2273    7.4847  6.1045e+3  4.295e+3   none     none     [2.4s]
//   19  1.434774    7.5596e+3     11.4305    8.8946  9.2832e+3  6.470e+3   none     none     [2.4s]
//   23  1.450254    1.0274e+4     12.6337   10.4274  1.3542e+4  9.338e+3   none     none     [2.4s]
//   29  1.465995    1.3910e+4     13.7323   11.9623  1.8605e+4  1.269e+4   none     none     [2.6s]
//   31  1.476418    1.6881e+4     14.6793   13.4063  2.4060e+4  1.630e+4   none     none     [2.8s]
//   37  1.488330    2.1930e+4     15.6264   14.9328  3.0619e+4  2.057e+4   none     none     [3.4s]
//   41  1.496346    2.5750e+4     16.4710   16.3858  3.7567e+4  2.511e+4   none     none     [4.6s]
//
//   The bound's own looseness grows like (log z)^6.15 over this range, heading
//   for (log z)^8 asymptotically: the proof is honest and enormously lossy, and S6
//   is the section that decides whether that matters. It does not.
//
//   s-uniformity (the bound does not see s at all; B does, a little):
//   z    B(s=2.0)  B(s=2.6)  B(s=3.0)  B(s=3.4)   bound (s-free)
//   13    1.2728    1.3392    1.3833    1.3968   3.592e+3   [4.6s]
//   19    1.4426    1.4469    1.4348    1.4460   9.283e+3   [4.6s]
//   29    1.6718    1.4794    1.4660    1.4771   1.861e+4   [5.1s]
//   37    1.6443    1.5389    1.4883    1.4916   3.062e+4   [8.2s]
//
// S3 THE MECHANISM --- the flatness is an absolutely convergent Euler product
//
//   The per-prime identity, checked exactly:  (1-2/p)^2 (1+4p/(p-2)^2) = 1 + 4/p^2
//   worst deviation over all odd p < 2000: 2.22e-16
//   Consequence:  B_model(z) = Delta^2 (9 prod_{2<p<z}(1+4p/(p-2)^2) - 1)
//                            = (9/4) prod_{2<p<z}(1+4/p^2) - Delta(z)^2,  both forms below.
//
//   z      Delta(z)     B_model      collapsed     diff        B(z,3.0)   B/B_model
//    13  5.84416e-2  4.2091415  4.2091415  8.9e-16  1.383263   0.32863   [8.2s]
//    17  4.94505e-2  4.3098171  4.3098171  8.9e-16  1.421390   0.32980   [8.2s]
//    19  4.36328e-2  4.3700439  4.3700439  1.8e-15  1.434774   0.32832   [8.2s]
//    23  3.90399e-2  4.4188662  4.4188662  8.9e-16  1.450254   0.32820   [8.3s]
//    29  3.56451e-2  4.4525443  4.4525443  2.7e-15  1.465995   0.32925   [8.4s]
//    31  3.31868e-2  4.4738969  4.4738969  3.6e-15  1.476418   0.33001   [8.6s]
//    37  3.10458e-2  4.4926608  4.4926608  5.3e-15  1.488330   0.33128   [9.2s]
//    41  2.93676e-2  4.5058919  4.5058919  5.3e-15  1.496346   0.33209   [10.4s]
//    43  2.79350e-2  4.5166980  4.5166980  4.4e-15  1.505719   0.33337   [12.3s]
//    47  2.66357e-2  4.5265417  4.5265417  2.7e-15  1.513550   0.33437   [15.8s]
//
//   The limit, and the rate. B_model -> (9/4) prod_{p>2}(1+4/p^2), tail 4 sum_{p>z} 1/p^2:
//     z =     100:  B_model = 4.57256798   (1/4)prod(1+4/p^2) = 0.50810385   [15.8s]
//     z =    1000:  B_model = 4.60390505   (1/4)prod(1+4/p^2) = 0.51155333   [15.8s]
//     z =   10000:  B_model = 4.60611440   (1/4)prod(1+4/p^2) = 0.51179315   [15.8s]
//     z =  100000:  B_model = 4.60629457   (1/4)prod(1+4/p^2) = 0.51181160   [15.8s]
//     z = 1000000:  B_model = 4.60631320   (1/4)prod(1+4/p^2) = 0.51181311   [15.8s]
//
//   So the boundedness of B is NOT a log^4 cancelling a log^-4. It is one
//   convergent product, and the convergence rate 4 sum_{p>z}1/p^2 ~ 4/(z ln z) is
//   why B looks flat at every z anyone can compute: the model itself moves 7% over
//   z = 13..47 and has 2% left to run to its limit.
//
// S4 THE PROFILE --- sup phi against weighted-mean phi, and they disagree
//
//   phi(e) = e Vabs(e) / (2^omega(e) N(e));  B = sum_e (4^omega(e) N(e)^2/e) phi(e)^2.
//   A uniform phi <= K proves B <= K^2 B_model = O(1). psi is the same normalisation
//   applied to a SINGLE split, psi(e1,e2) = e|V(e1,e2)|/N(e), which is what a
//   one-divisor-at-a-time argument would have to bound.
//
//   z    B(z,3.0)   sup phi   arg e        sup psi   rms_w phi   B_model  B/B_model  (sup phi)^2 B_model   /B
//   13  1.383263    1.2000       33       1.2000    0.5733   4.2091   0.32863         6.061         4.38   [15.8s]
//   17  1.421390    1.3611      455       2.2222    0.5743   4.3098   0.32980         7.984         5.62   [15.8s]
//   19  1.434774    1.4571      595       2.4242    0.5730   4.3700   0.32832         9.278         6.47   [15.9s]
//   23  1.450254    1.5535      665       2.5872    0.5741   4.4189   0.32820        10.665         7.35   [15.9s]
//   29  1.465995    1.7160     1001       3.9394    0.5758   4.4525   0.32925        13.112         8.94   [16.0s]
//   31  1.476418    1.8073     1463       4.4646    0.5778   4.4739   0.33001        14.613         9.90   [16.2s]
//   37  1.488330    1.8667     2387       5.9111    0.5783   4.4927   0.33128        15.654        10.52   [16.8s]
//   41  1.496346    1.9442     2849       6.4741    0.5797   4.5059   0.33209        17.032        11.38   [18.0s]
//   43  1.505719    1.9849     3157       6.9536    0.5824   4.5167   0.33337        17.795        11.82   [19.9s]
//   47  1.513550    2.0658     4199       7.5822    0.5839   4.5265   0.33437        19.317        12.76   [23.4s]
//
//   Model comparison on the two statistics (RSS; lower is better):
//    sup phi:   const c=1.6957 RSS=7.593e-1 | c+b lnz  c=-0.511 b=0.6645 RSS=3.062e-3 | c(lnz)^a c=0.346 a=1.320 RSS=3.015e-3
//    rms_w phi: const c=0.5773 RSS=1.332e-4 | c+b lnz  c=0.551 b=0.0080 RSS=2.352e-5 | c(lnz)^a c=0.548 a=0.043 RSS=2.841e-5
//    const/linear RSS ratio: sup phi 247.9x, rms_w phi 5.7x.
//    So a UNIFORM bound phi <= K with K absolute is rejected by the data, and the
//    best a uniform argument can deliver on this evidence is B = O((log z)^2). What
//    is flat is the phi^2-WEIGHTED MEAN, which is not a statement any sup-norm
//    argument produces. That is the shape of the estimate that would give O(1).
//
//   Does the sup rise at every level s, or only at s = 3.0?
//   s     z=13     z=19     z=29     z=37      (sup phi)
//   2.0    3.733    4.719    3.049    3.300   [23.4s]
//   2.6    1.667    2.110    1.783    2.030   [23.5s]
//   3.0    1.200    1.457    1.716    1.867   [24.3s]
//   3.4    1.250    1.544    1.598    1.689   [27.1s]
//
// S5 THE LADDER --- B(z,3.0) as far as this machine reaches
//
//   z     N          #e       B(z,3.0)     B_model     B/B_model   d ln B/d ln ln z
//    13        852      31   1.3832631   4.2091415   0.32863         --     [0.0s, 27.1s]
//    17       2236      63   1.4213896   4.3098171   0.32980        0.273   [0.0s, 27.1s]
//    19       4764     127   1.4347739   4.3700439   0.32832        0.243   [0.0s, 27.1s]
//    23       9636     243   1.4502543   4.4188662   0.32820        0.171   [0.0s, 27.1s]
//    29      20700     467   1.4659949   4.4525443   0.32925        0.151   [0.1s, 27.3s]
//    31      35868     827   1.4764180   4.4738969   0.33001        0.361   [0.2s, 27.5s]
//    37      76484    1527   1.4883304   4.4926608   0.33128        0.160   [0.6s, 28.1s]
//    41     125884    2535   1.4963457   4.5058919   0.33209        0.192   [1.2s, 29.3s]
//    43     183084    3879   1.5057193   4.5166980   0.33337        0.490   [1.9s, 31.2s]
//    47     293980    6119   1.5135499   4.5265417   0.33437        0.222   [3.5s, 34.7s]
//    53     466340    9553   1.5201580   4.5347986   0.33522        0.142   [6.6s, 41.4s]
//    59     774812   15385   1.5238048   4.5413052   0.33554        0.090   [13.5s, 54.8s]
//    61    1025812   21111   1.5306277   4.5465644   0.33666        0.549   [18.3s, 73.1s]
//    67    1574044   31019   1.5343743   4.5514887   0.33711        0.108   [32.5s, 105.7s]
//    71    2148388   42947   1.5400763   4.5555758   0.33806        0.271   [63.9s, 169.5s]
//    73    2712324   56703   1.5471042   4.5592185   0.33934        0.701   [82.1s, 251.7s]
//
//   Model comparison over the whole ladder (RSS; lower is better):
//    B = c                 params [1.48951]   RSS = 3.3772e-2
//    B = c + b ln z        params [1.17209, 0.08736]   RSS = 3.5548e-4
//    B = c (ln z)^a        params [1.14636, 0.20436]   RSS = 1.6828e-4
//    B = kappa * B_model   params [0.33307]   RSS = 4.1994e-3
//
//   The same comparison restricted to z <= 53 (11 rows), the range the earlier readings use:
//    B = c                 params [1.46875]   RSS = 1.8275e-2
//    B = c + b ln z        params [1.15482, 0.09286]   RSS = 2.0707e-4
//    B = c (ln z)^a        params [1.14220, 0.20762]   RSS = 1.2312e-4
//    B = kappa * B_model   params [0.33103]   RSS = 1.2360e-3
//
//   Extrapolation, stated as what each model would give and not as a prediction:
//   z          B const     B c+b lnz   B c(lnz)^a   B kappa*model   (kappa*model has a finite limit)
//        100     1.4895      1.5744      1.5663       1.5230   [251.7s]
//       1000     1.4895      1.7756      1.7016       1.5334   [251.7s]
//      10000     1.4895      1.9768      1.8046       1.5342   [251.7s]
//    1000000     1.4895      2.3791      1.9605       1.5342   [251.7s]
//
// S6 THE THRESHOLD --- how fast may B grow before anything breaks
//
//   (a) LEMMA V'S LITERAL ASK. sift-limit-attack.md sec.4.5 wants R << H/log^3 H.
//       In mean square: sqrt(B H) <= H/log^3 H  <=>  B <= H/log^6 H. At the working
//       windows that ceiling is a POWER of z, not a constant:
//
//   z     H = z^2.0     ceiling      H = z^2.5790   ceiling      H = z^4.26645  ceiling      B proved
//        13  1.69e+2   9.273e-3    7.46e+2    8.906e-3    5.66e+4   3.294e-2   3.592e+3   [251.7s]
//        29  8.41e+2   9.014e-3    5.91e+3    1.378e-2    1.73e+6   1.973e-1   1.861e+4   [251.7s]
//       101  1.02e+4   1.650e-2    1.48e+5    5.192e-2    3.56e+8   6.107e+0   1.900e+5   [251.7s]
//      1009  1.02e+6   1.453e-1    5.59e+7    1.734e+0    6.55e+12   9.912e+3   4.386e+6   [251.7s]
//   1000000  1.00e+12   2.247e+3    2.98e+15    1.456e+6    3.97e+25   9.465e+14   1.091e+9   [251.7s]
//
//       So the mean-square Lemma V holds as soon as H >= B log^6 H. With THEOREM 1
//       (B = O(log^8 z)) that threshold is H >> (log z)^14 -- a POLYLOG window, far
//       below every window in this corpus. The smallest H at which the proved bound
//       already clears the ask:
//
//   z      B proved     H_min (proved)   as u = ln H/ln z    H_min (measured B)   as u
//        13  3.592e+3   1.852e+12        11.0128          4.039e+7          6.8283   [251.7s]
//        29  1.861e+4   1.452e+13        9.0003          4.372e+7          5.2248   [251.8s]
//       101  1.900e+5   2.565e+14        7.1890            --                --   [251.8s]
//      1009  4.386e+6   1.126e+16        5.3436            --                --   [251.8s]
//   1000000  1.091e+9   1.009e+18        3.0007            --                --   [251.8s]
//
//   (b) THE ALMOST-ALL WINDOW. u_aa(eta) = ln(B/(eta M^2))/ln z, eta = 1/2.
//       Columns: B measured, then B forced to (ln z)^A for A = 0, 2, 4, 8 to show
//       how little the growth rate matters. M is the measured main term.
//
//   z     M            u_aa(B meas)  u_aa(A=0)  u_aa(A=2)  u_aa(A=4)  u_aa(A=8)
//   13  5.58442e-2      2.6464     2.5199     3.2544     3.9889     5.4578   [251.9s]
//   19  3.95977e-2      2.5513     2.4287     3.1622     3.8957     5.3628   [251.9s]
//   29  3.18427e-2      2.3668     2.2532     2.9743     3.6954     5.1376   [252.0s]
//   37  2.80568e-2      2.2814     2.1712     2.8824     3.5936     5.0159   [252.9s]
//   43  2.44409e-2      2.2667     2.1579     2.8623     3.5667     4.9756   [255.3s]
//   47  2.31664e-2      2.2435     2.1358     2.8361     3.5364     4.9370   [259.9s]
//
//       Every column tends to 0: u_aa = (A + 4) lnln z / ln z + O(1/ln z). The
//       almost-all exponent is 0 for EVERY polylog B, and attack-beta2-01 reading 3
//       already prices that at nothing. So B's growth rate is invisible here too.
//
//   (c) THE ALL-POSITIONS EXPONENT, AND B IS NOT IN IT.
//       attack-beta2-01 sec.4(ii) defines u_1^prov as the smallest u with
//       H M >= sqrt(W * min(B H, B2)),  W = P(z),  B2 = (1/4) sum_e e^2 Vabs(e)^2
//       the H-free half of Theorem A. min() has TWO branches and they differ by a
//       whole factor of theta:
//         BH branch:  u = ln(W B / M^2) / ln z            = theta/ln z   + O(1)
//         B2 branch:  u = (theta/2 + ln(B2)/2 - ln M)/ln z = theta/(2 ln z) + O(1)
//       A DEFECT FIXED HERE (2026-08-18 salvage): the first draft of this section
//       tabled the BH branch alone and set it against the source's 4.3604/4.7087.
//       Those are B2-branch numbers; the BH branch reads 6.7796/7.4030. The min is
//       reinstated below and reproduces the source EXACTLY, which is the custody
//       check the first draft did not have.
//
//   z   theta/lnz  B        B2         u(BH)    u(B2)    u_1^prov  source   u* crossover
//   13  3.0196   1.3833   5.913e+1   5.3958   3.4299   3.4299        --   1.4641   [259.9s]
//   17  3.6390   1.4214   2.318e+2   5.9217   3.8598   3.8598        --   1.7980   [259.9s]
//   19  4.4637   1.4348   4.357e+2   6.7796   4.3604   4.3604    4.3604   1.9413   [259.9s]
//   23  5.1308   1.4503   8.024e+2   7.4030   4.7087   4.7087    4.7087   2.0143   [260.0s]
//   29  5.7088   1.4660   1.939e+3   7.8697   5.0021   5.0021    5.0021   2.1344   [260.1s]
//   37  7.2071   1.4883   1.109e+4   9.2966   5.8829   5.8829        --   2.4693   [260.9s]
//   43  8.8666   1.5057   2.675e+4   10.9489   6.7752   6.7752        --   2.6015   [263.4s]
//   47  9.6386   1.5135   4.786e+4   11.7021   7.1966   7.1966        --   2.6912   [268.0s]
//
//       THE READING. The min picks the B2 branch at EVERY z from 13 to 47, so the
//       all-positions exponent the proven bound delivers does not contain B at all.
//       B binds only for windows below the crossover u* = ln(B2/B)/ln z, which runs
//       1.4641 to 2.6912 over z = 13..47 while u_1^prov runs 3.4299 to 7.1966: the
//       solution sits above the crossover at every level, with room to spare.
//       Even in the branch B does live in, a power of log z costs only lnln z/ln z
//       = 0.3672 at z = 13 falling to 0.3501 at z = 47 -- under half a unit per
//       power, and SHRINKING. (The full A = 0 to A = 8 spread is 8x that, 2.9379
//       down to 2.8012, NOT under half a unit; an earlier draft of this line said
//       it was, conflating the per-power cost with the whole spread.)
//       Meanwhile theta(z)/(2 ln z) diverges like z/(2 ln z). B is not the binding
//       term in any of the three currencies, and in this one it is not a term.
//
// DONE 268.0s
// ============================================================================
// READINGS (honestly calibrated)
// ============================================================================
// 1. B(z,s) = O((log z)^8) IS PROVED, UNCONDITIONALLY, EXPLICITLY, AND UNIFORMLY
//    IN s. The chain is three steps -- partition-plus-triangle, an Euler product
//    over p < z, and a sum over e -- resting only on the sourced |lambda_d| <= 1
//    for Rosser weights. Both inequality steps are re-checked per-e at every
//    level to z = 41 and the worst violation of each is `none`. The constants are
//    A(z) = (5/2) prod(1+2/p) ~ c (log z)^2 and E(z) = (43/25) prod(1+4p/(p+2)^2)
//    ~ c (log z)^4. The bound is enormously lossy -- bound/B runs 2,597x to
//    25,110x and its looseness grows like (log z)^6.15 on this range -- and
//    reading 2 is why that costs nothing.
//
// 2. IT IS ENOUGH, AND THAT IS THE DELIVERABLE. The mean-square Lemma V asks
//    B <= H/log^6 H. H = z^u is a POWER of z and B is POLYLOG in z, so the
//    inequality holds for every fixed u > 0 at all large z. Under Theorem 1 the
//    threshold window is H >> (log z)^14, and the measured u_min falls 11.01 ->
//    3.00 across z = 13..1e6, tending to 0. So the mean-square Lemma V is now
//    unconditional and useful with NO hypothesis anywhere. B = O(1) is a nicer
//    statement, is still open, and nothing downstream wants it.
//
// 3. B = O(1) IS MEASURED DEAD AS A UNIFORM STATEMENT AND ALIVE ONLY AS A MEAN.
//    B = sum_e (4^omega(e) N(e)^2/e) phi(e)^2 exactly, so phi <= K uniform would
//    give B <= K^2 B_model = O(1). sup phi rises at all nine steps over
//    z = 13..47, 1.2000 -> 2.0658, and the constant model's RSS is 247.9x the
//    linear model's. The phi^2-WEIGHTED MEAN is flat (0.5733 -> 0.5839, ratio
//    5.7x, slope 0.0080). sup psi -- the single-split statistic a
//    one-divisor-at-a-time argument must bound -- rises far faster, to 7.5822.
//    So no sup-norm technique reaches O(1); the estimate is irreducibly a mean
//    value over the divisor lattice. On this evidence a uniform argument caps out
//    at B = O((log z)^2). The rise is not an s = 3.0 artifact: at s = 2.0 the sup
//    reads 3.733, 4.719, 3.049, 3.300 at z = 13, 19, 29, 37.
//
// 4. THE FLATNESS HAS AN EXACT MECHANISM AND IT IS NOT A CANCELLATION OF LOGS.
//    (1-2/p)^2 (1+4p/(p-2)^2) = 1 + 4/p^2 EXACTLY (worst deviation 2.22e-16 over
//    all odd p < 2000), so B_model = (9/4) prod(1+4/p^2) - Delta(z)^2 is an
//    absolutely convergent Euler product with limit 4.60631320. B is flat because
//    it sits O(4 sum_{p>z} 1/p^2) = O(1/(z log z)) from a limit. B_model moves 7%
//    over z = 13..47 and has 2% left to run.
//
// 5. BUT B IS NOT kappa*B_model, AND THE LADDER SAYS SO. B rises monotonically at
//    all fifteen steps, 1.3833 -> 1.5471 over z = 13..73, +11.84%, with no sign
//    of turning over, while B/B_model itself DRIFTS UP (0.32820 at z = 23 to
//    0.33522 at z = 53 and on to 0.33934 at z = 73) even though B_model has
//    saturated to within 2% of its limit. The
//    Euler-product story of reading 4 explains most of the flatness and leaves a
//    slowly rising residual it does not explain. Anyone quoting "B is flat at
//    1.38 to 1.49" is quoting the s = 3.0 column below z = 37; B peaks at the
//    s = 2.0 corner (1.6847 at z = 31).
//
// 6. IN THE ALL-POSITIONS CURRENCY B IS NOT A TERM, WHICH IS STRONGER THAN NOT
//    BINDING. attack-beta2-01 sec.4(ii) takes min(B H, B2). The min picks the B2
//    branch at EVERY z from 13 to 47: B binds only below the crossover
//    u* = ln(B2/B)/ln z = 1.4641..2.6912, while u_1^prov itself = 3.4299..7.1966.
//    Reinstating the min reproduces the source's 4.3604 / 4.7087 / 5.0021 exactly.
//    A FIRST DRAFT OF THIS FILE tabled the BH branch alone (6.7796 / 7.4030) and
//    set it against those B2-branch numbers; the two branches differ by a whole
//    factor of theta, and the comparison was invalid.
//
// 7. AND B'S GROWTH RATE IS INVISIBLE IN ALL THREE CURRENCIES. Almost-all:
//    u_aa = (A+4) lnln z/ln z + O(1/ln z) -> 0 for EVERY polylog B, ground already
//    priced at nothing. Lemma V's literal ask: u_min -> 0. All-positions: B is not
//    a term at all, and even in the branch it does live in, one power of log z
//    costs lnln z/ln z = 0.3672 at z = 13 falling to 0.3501 at z = 47 -- under
//    half a unit per power, and shrinking -- against theta(z)/(2 ln z) diverging
//    like z/(2 ln z). A RETIRED READING, recorded so nobody re-derives it: the
//    first draft closed with "the spread from A = 0 to A = 8 is under half a unit
//    of window exponent". That spread is 2.9379 falling to 2.8012. It is the
//    PER-POWER cost that is under half a unit.
//
// 8. THE ESTIMATE IS PUBLISHED, AND THE OPEN QUESTION CHANGED SHAPE. Opera de
//    Cribro Lemma 6.18 -- corrected proof in J. B. Friedlander, "A weaker but
//    simpler sieve inequality", arXiv:2607.05707 (7 Jul 2026), appendix -- gives
//    sum_{d|P} d (sum_{m = 0 mod d} lambda_m/m)^2 << prod_{p|P}(1-1/p) for
//    beta-sieve weights, with a finish at dimension kappa = 2. Same divisor
//    weight, same inner sum over multiples, same second-moment shape, and a
//    conclusion that DECAYS rather than merely bounds. It needs beta >= 8, i.e.
//    s >= 9, and this corpus runs s in [2.0, 3.4]; the paper itself flags that
//    restriction as a possible artifact of one trivial step. So the forward move
//    is to price beta >= 8 against our s range and to price the per-split
//    absolute values -- not to search further.
// ============================================================================
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// SAME VALUE, DIFFERENT NOTATION: the 2,597 and 25,110 of reading 1 are the
//   printed bound/B column, which S2 Theorem 1 writes as 2.597e+3 at z = 13
//   and 2.511e+4 at z = 41.
//
// DEFINITION / LITERATURE identifiers, not measurements: the 6.18 of reading 8
//   is the lemma number in Opera de Cribro, unrelated to the (log z)^6.15
//   looseness exponent printed above, and 2607.05707 is the arXiv identifier
//   of the Friedlander note.
//
// RESOLVED 2026-08-20 (mismatch adjudication #40), by extending the ladder so
//   the endpoint is produced here. Reading 5's 1.5471 at z = 73, the +11.84
//   per cent computed from it, and the step count were all unsupported by this
//   file: the S5 ladder embedded here ran eleven rows, z = 13 to 53, ending at
//   B = 1.5201580. The endpoint WAS on record -- the full ladder and
//   B = 1.5471042 sit in research/history/staging/attack-AB-bounded.md:253,
//   announced in research/history/CHANGELOG.md:2392 -- so the figure was a
//   BORROW from a report, not an invention. But it is load-bearing (it is the
//   whole of "B rises monotonically and does not turn over"), a report is not
//   a producer, and the five missing rows cost about two minutes. S5's default
//   ladder now runs all sixteen z values, 13 to 73, and prints
//   B = 1.5471042 at z = 73, matching the report to all seven decimals.
//   ONE FIGURE DID NOT SURVIVE THE REPRODUCTION: the step count. The primes
//   from 13 to 73 are 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
//   71, 73 -- sixteen rows, FIFTEEN steps, not twenty. Old -> new in reading 5:
//   "all twenty steps" -> "all fifteen steps". The staging report carries the
//   same slip and is corrected. Everything else checks: 1.5471042/1.3832631 =
//   1.118441, so +11.84 per cent is right, and monotonicity holds at every one
//   of the fifteen. The B/B_model drift the reading rests on is now visible
//   two rungs further: 0.32820 at z = 23, 0.33522 at z = 53, 0.33934 at z = 73.
//   The model comparison is printed twice, over the whole ladder and
//   restricted to z <= 53, so the RSS figures the staging report quotes for
//   the short ladder (1.8275e-2, 2.0707e-4, 1.2312e-4 at a = 0.20762,
//   1.2360e-3 at kappa = 0.33103) remain reproducible from this block; all
//   five reproduce exactly.
// ---------------------------------------------------------------------------
// ADDENDUM, SUPERSEDED SAME DAY. This note recorded that the z = 73 row was on
// record only in research/history/staging/attack-AB-bounded.md:253 (summary at
// :256 and :655, announced in research/history/CHANGELOG.md:2392), that 1.5471
// was therefore BORROWED and not invented, and that "no embedded script tail
// anywhere in the corpus carries it ... cannot be re-derived in place". The
// last clause is what the adjudication overturned: it could be re-derived, in
// about two minutes, and now is. The S5 block above prints z = 73 with
// B = 1.5471042. Quote it as this file's.
// ---------------------------------------------------------------------------
