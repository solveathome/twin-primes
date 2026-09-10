// ============================================================================
// attack-b2mean-01.js — THE MEAN VALUE OF B2: WHERE ITS MASS SITS, THE
//                       PRIMITIVE-MODE REPAIR, AND A PROVEN qmax ln^7 z BOUND
// ============================================================================
// FEEDS attack-rhoms-01.md's NOT-REACHED item "a mean-value bound on
// B2 = sum e^2 Vabs(e)^2 below its qmax B ceiling". Write-up:
// research/history/staging/attack-b2mean-01.md.
//
// THE OBJECT. For the Brudern-Fouvry certificate lattice at s = 3.0
// (rho-maximal-law.md sec.1; terms via sift-limit-lemmaV.js buildTerms),
// Vabs(e) = sum_{e1 e2 = e} |V(e1,e2)| with V the signed Rosser sublattice
// sums (Theorem A's coefficient family, attack-beta2-01-lemmaV-meansquare.md
// sec.1), and
//   B  = sum_{e|P(z), e>1} e   Vabs(e)^2   (Theorem A's constant)
//   B2 = sum_{e|P(z), e>1} e^2 Vabs(e)^2   (MS3's constant: <rho~^2> <= B2/12).
// MS3 sits 18x-48x above the truth (attack-rhoms-01 S3) and its only known
// ceiling was the trivial B2 <= qmax B (through e <= qmax). This file measures
// WHERE B2 lives and proves what the corpus's own machinery can prove about it.
// UNITS: Vabs, T dimensionless (weight counts); e, qmax, W positions;
// strengths as exponents base z. WIDTH: e <= qmax <= 2.24e8 is exact; e^2 and
// J2(e) reach 5e16 > 2^53 and are held as floats — they enter only products
// with float Vabs^2, rel err ~1e-16, stated. All W-dependence at z >= 31 runs
// in log space off lnW = theta(z).
//
// WHAT IS PROVED HERE (derivations here; every step verified numerically).
//  LEMMA J (the primitive-mode repair; classical, proof one Mobius line):
//    For e > 1:  sum_{a: gcd(a,e)=1, 0<a<e} 1/(4 sin^2(pi a/e)) = J2(e)/12,
//    J2(e) = e^2 prod_{p|e}(1 - 1/p^2)  (Jordan totient).
//    Proof: group a != 0 mod e by g = gcd(a,e); a/e = a'/(e/g) with a'
//    primitive, and 4 sin^2(pi a/e) = 4 sin^2(pi a'/(e/g)), so the classical
//    cosecant identity (attack-rhoms-01 S0) reads (e^2-1)/12 =
//    sum_{f|e, f>1} Phi(f), Phi(f) := the primitive sum at modulus f. Mobius
//    inversion over the divisor lattice: Phi(e) = sum_{f|e} mu(e/f)(f^2-1)/12
//    = J2(e)/12 for e > 1 (the -1 dies: sum_{f|e} mu(e/f) = 0). Verified
//    directly at e = 2..200 below.
//  THEOREM MS3' (strict sharpening of MS3; no new hypothesis):
//    <rho~^2> = sum_e sum*_a |Theta_e(a)|^2/(4 sin^2(pi a/e))     [L3/L5]
//            <= sum_e Theta*(e)^2 J2(e)/12                        [Lemma J]
//            <= B2J/12,  B2J := sum_{e>1} J2(e) Vabs(e)^2         [Theorem B]
//    with B2J < B2 termwise (J2(e) < e^2 strictly for e > 1). The gain
//    B2/B2J is capped by prod_{p<z}(1-1/p^2)^{-1} < zeta(2) = 1.6449 and is
//    realized near the cap iff the mass sits at highly smooth e (S1 measures
//    where). MS3 extended the primitive sum to ALL a != 0 to use (e^2-1)/12;
//    Lemma J prices exactly the imprimitive modes MS3 paid for at each e and
//    never owned — they are already counted at their true denominator.
//  THEOREM MV (the mean-value ladder below the trivial shapes):
//    With T(e) := sum_{i: e|q_i} |w_i|/q_i and Theorem 1's verified steps
//    (attack-AB-bounded.md sec.1.1): Vabs(e) <= T(e) <= 3 A(z) rho(e),
//    rho(e) = prod_{p|e} r(p), r(2) = 3/5, r(p) = 2/(p+2),
//    A(z) = (5/2) prod_{2<p<z}(1+2/p). Every e with Vabs(e) != 0 divides
//    some q_i, so e <= qmax. Hence the proven ladder
//      B2 <= MV0 := sum_e e^2 T(e)^2                    (exact enumeration)
//         <= MV1 := 9 A(z)^2 S(z),  S(z) = sum_{1<e<=qmax, e|P(z)} f(e),
//                   f = prod_{p|e} f(p), f(2) = 36/25, f(p) = 4p^2/(p+2)^2
//         <= MV2 := 9 A(z)^2 qmax prod_{p<z}(1 + h(p)/p),  h = f - 1 >= 0.
//    The MV1 -> MV2 step is the divisor trick, one log below Rankin: f = h*1
//    on squarefree e, so sum_{e<=X, e|P(z)} f(e) = sum_{d|P(z), d<=X} h(d)
//    #{e <= X: d|e|P(z)} <= X sum_d h(d)/d <= X prod_{p<z}(1+h(p)/p).
//    h(p) -> 3, so prod(1+h/p) = O(ln^3 z) by Mertens and
//      B2 <= C qmax ln^7 z    (9A^2 = O(ln^4 z) times ln^3 z),
//    one logarithm below the trivial qmax B <= qmax 9A^2(E-1) = O(qmax ln^8 z)
//    (E-1 = O(ln^4 z)), and a factor ~qmax below the qmax^2 sum Vabs^2 shape.
//    The J2-weighted forms MV0J/MV1J (f_J(2) = 27/25, f_J(p) =
//    4(p^2-1)/(p+2)^2) bound B2J the same way; MV1J drives the sharpest
//    fully-analytic per-z cap in S4.
//  WHERE THE PROOF STALLS, NAMED: MV0/B2 is the price of the ONE sign-discard
//    step Vabs <= T (the within-class triangle) under the e^2 weight — the
//    same "irreducibly mean-value" object attack-AB-bounded sec.1.4 names for
//    B = O(1), now measured in the B2 currency (S3 table). No corpus tool
//    bounds a signed Rosser class sum below its triangle value; Theorem A and
//    the l1/l2 identity (import-l1l2.md) live on the Theta side and only reach
//    Vabs objects through Theta* <= Vabs, the wrong direction for a ceiling.
//
// CITED (embedded artifacts, standing compute rule — used as controls, not
// re-derived): B(z,3.0) and B2/12 at z = 13..47, truth <rho~^2> at 13..31
// (exact pair sums) and 37..47 (rmsr^2, custody-bound via theta-ladder), the
// cap3 column — all attack-rhoms-01.js OUTPUT; A(z) and Theorem 1's steps
// from attack-AB-bounded.md (steps re-verified per-e here, now through
// z = 47); beta_2 per paper/beta2-note.md. The sweep machinery is
// attack-rhoms-01.js's sweepB extended in place (same subset enumeration,
// plus T(e) and per-e metadata). Literature-standard inputs enter ONLY the S4
// all-z formula scan, flagged there: theta(z) < 1.01624 z and
// prod_{p<=x}(1-1/p)^{-1} < e^gamma ln x (1+1/ln^2 x) (Rosser-Schoenfeld
// 1962, x >= 285), and the M >= c_M/ln^2 z main-term rider (redteam-0821
// sec.1.4 — literature-standard vector-sieve positivity, not corpus-proven).
//
//   node research/attack-b2mean-01.js        (~1 min; progress on stderr)
// ============================================================================
'use strict';
const path=require('path');
const L=require(path.join(__dirname,'sift-limit-lemmaV.js'));
const T0=Date.now(); const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
const err=(m)=>process.stderr.write(m+'\n');
function primesBelow(n){const s=new Uint8Array(n),o=[];for(let i=2;i<n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<n;j+=i)s[j]=1;}}return o;}
function gcd(a,b){while(b){const t=a%b;a=b;b=t;}return a;}
function egcd(a,b){if(b===0)return[a,1,0];const[g,x,y]=egcd(b,a%b);return[g,y,x-Math.floor(a/b)*y];}
const BETA2=4.26645, S=3.0, GAMMA=0.5772156649015329;
const ZS=[13,17,19,23,29,31,37,41,43,47];
const r_=(p)=>p===2?3/5:2/(p+2);
const f_=(p)=>{const x=p*r_(p);return x*x;};          // (p r(p))^2
const fJ_=(p)=>(p*p-1)*r_(p)*r_(p);                   // (p^2-1) r(p)^2

console.log('S0 CONTROLS');
{ // estimator control before any fit is believed
  const zs=[13,17,19,23,29,31], xs=zs.map(z=>Math.log(z)), ys=zs.map(z=>Math.log(5*Math.pow(z,3.7)));
  const f=ols(xs,ys);
  console.log(`  OLS control: y = 5 z^3.7 at 6 z returns slope ${f.b.toFixed(6)} (want 3.700000)  ${Math.abs(f.b-3.7)<1e-9?'PASS':'FAIL — FITS VOID'}`);
}
{ // 2-regressor estimator control: y = 2.3 - 1.7 x1 + 0.9 x2 on 40 points
  const x1=[],x2=[],ys=[];
  for(let i=0;i<40;i++){x1.push(Math.log(2+i));x2.push((i*7)%5);ys.push(2.3-1.7*x1[i]+0.9*x2[i]);}
  const f=ols2(x1,x2,ys);
  const ok=Math.abs(f.a-2.3)<1e-9&&Math.abs(f.b+1.7)<1e-9&&Math.abs(f.c-0.9)<1e-9;
  console.log(`  OLS2 control: returns (a,b,c) = (${f.a.toFixed(6)}, ${f.b.toFixed(6)}, ${f.c.toFixed(6)}) (want 2.3, -1.7, 0.9)  ${ok?'PASS':'FAIL — FITS VOID'}`);
}
{ // LEMMA J control: primitive cosecant sum vs J2(e)/12, general e = 2..200
  let worst=0, at=0;
  for(let e=2;e<=200;e++){
    let s=0; for(let a=1;a<e;a++){ if(gcd(a,e)!==1)continue;
      const sn=Math.sin(Math.PI*a/e); s+=1/(4*sn*sn); }
    const ref=J2of(e)/12, d=Math.abs(s-ref)/ref;
    if(d>worst){worst=d;at=e;}
  }
  console.log(`  LEMMA J control: sum over primitive a of 1/(4 sin^2(pi a/e)) vs J2(e)/12, e = 2..200: worst rel ${worst.toExponential(1)} at e=${at}  ${worst<1e-11?'PASS':'FAIL'}`);
}
function J2of(e){ // J2(e) = e^2 prod_{p|e}(1-1/p^2), general e
  let J=e*e, m=e;
  for(let p=2;p*p<=m;p++){ if(m%p===0){ J=J/(p*p)*(p*p-1); while(m%p===0)m/=p; } }
  if(m>1) J=J/(m*m)*(m*m-1);
  return J;
}
function ols(xs,ys){const k=xs.length;let sx=0,sy=0,sxx=0,sxy=0;
  for(let i=0;i<k;i++){sx+=xs[i];sy+=ys[i];sxx+=xs[i]*xs[i];sxy+=xs[i]*ys[i];}
  const b=(k*sxy-sx*sy)/(k*sxx-sx*sx),a=(sy-b*sx)/k;
  let sse=0;for(let i=0;i<k;i++){const e=ys[i]-(a+b*xs[i]);sse+=e*e;}
  const se=k>2?Math.sqrt(sse/(k-2)/(sxx-sx*sx/k)):NaN;
  return {a,b,se};}
function ols2(x1,x2,ys){ // y = a + b x1 + c x2 by Gauss-Jordan on the normal equations
  const k=ys.length;let s1=0,s2=0,sy=0,s11=0,s22=0,s12=0,s1y=0,s2y=0;
  for(let i=0;i<k;i++){s1+=x1[i];s2+=x2[i];sy+=ys[i];s11+=x1[i]*x1[i];
    s22+=x2[i]*x2[i];s12+=x1[i]*x2[i];s1y+=x1[i]*ys[i];s2y+=x2[i]*ys[i];}
  const M=[[k,s1,s2,sy],[s1,s11,s12,s1y],[s2,s12,s22,s2y]];
  for(let c=0;c<3;c++){let pv=c;for(let r=c+1;r<3;r++)if(Math.abs(M[r][c])>Math.abs(M[pv][c]))pv=r;
    const t=M[c];M[c]=M[pv];M[pv]=t;
    for(let r=0;r<3;r++){if(r===c)continue;const g=M[r][c]/M[c][c];
      for(let cc=c;cc<4;cc++)M[r][cc]-=g*M[c][cc];}}
  const a=M[0][3]/M[0][0],b=M[1][3]/M[1][1],c2=M[2][3]/M[2][2];
  let sse=0;for(let i=0;i<k;i++){const e=ys[i]-(a+b*x1[i]+c2*x2[i]);sse+=e*e;}
  return {a,b,c:c2,rmse:Math.sqrt(sse/k)};}

// cited rows (attack-rhoms-01.js OUTPUT block; MS3 = B2/12 to 5 figures) ----
const CITED_B={13:1.3833,17:1.4214,19:1.4348,23:1.4503,29:1.4660,31:1.4764,37:1.4883,41:1.4963,43:1.5057,47:1.5135};
const CITED_MS3={13:1.9710e1,17:7.7252e1,19:1.4523e2,23:2.6746e2,29:6.4627e2,31:1.1625e3,37:3.6976e3,41:6.4644e3,43:8.9156e3,47:1.5955e4};
const CITED_MS={13:1.095066,17:2.496563,19:4.952375,23:7.982480,29:13.595974,31:24.738489};
const CITED_RMSR={37:9.25620,41:11.99697,43:14.19345,47:18.99742};   // truth at 37..47 = rmsr^2 (custody-bound)
const CITED_CAP3={13:2.5104,17:2.6252,19:2.7326,23:2.7427,29:2.7323,31:2.8129,37:2.8664,41:2.8979,43:2.9386,47:2.9740};
const truthOf=(z)=>CITED_MS[z]!==undefined?CITED_MS[z]:CITED_RMSR[z]*CITED_RMSR[z];

// ---- the sweep: attack-rhoms-01 sweepB, extended with T(e) + per-e metadata
function sweepB2(z){
  const D=Math.round(Math.pow(z,S)), t=L.buildTerms(z,D);
  const n=t.n,q=t.q,w=t.w,d1=t.d1,ps=t.ps;
  const EM=new Map(), TA=new Map();     // e -> Map(e1 -> signed V);  e -> T(e)
  const plist=[];
  for(let i=0;i<n;i++){
    plist.length=0;
    const qi=q[i];
    for(const p of ps) if(qi%p===0) plist.push(p);
    const wi=w[i]/qi, ai=Math.abs(w[i])/qi, dd=d1[i], np=plist.length;
    for(let sMask=1;sMask<(1<<np);sMask++){
      let e=1,e1=1;
      for(let b=0;b<np;b++) if(sMask&(1<<b)){const p=plist[b]; e*=p; if(dd%p===0)e1*=p;}
      let m1=EM.get(e); if(!m1){m1=new Map();EM.set(e,m1);}
      m1.set(e1,(m1.get(e1)||0)+wi);
      TA.set(e,(TA.get(e)||0)+ai);
    }
  }
  let qmax=0; for(let i=0;i<n;i++) if(q[i]>qmax)qmax=q[i];
  const rec=[];
  let B=0,B2=0,B2J=0,SV=0,MV0=0,MV0J=0;
  for(const [e,m1] of EM){
    let vabs=0; for(const v of m1.values()) vabs+=Math.abs(v);
    const T=TA.get(e);
    let om=0,J2=1,gpf=0;
    for(const p of ps) if(e%p===0){om++;J2*=(p*p-1);gpf=p;}
    const e2=e*e;                       // e^2, J2 up to 5e16: floats, rel ~1e-16 (stated in header)
    B+=e*vabs*vabs; B2+=e2*vabs*vabs; B2J+=J2*vabs*vabs; SV+=vabs*vabs;
    MV0+=e2*T*T; MV0J+=J2*T*T;
    rec.push({e,om,J2,gpf,vabs,T});
  }
  return {t,EM,rec,B,B2,B2J,SV,MV0,MV0J,qmax,n};
}

const SW={};
console.log('  sweep control vs the cited attack-rhoms-01 columns (B to 4-5 digits, B2/12 to 5 figures):');
console.log('   z      B      cited        B2/12      cited        #e supported');
for(const z of ZS){
  err(`  S0 sweep z=${z} ... [${el()}]`);
  const r=sweepB2(z); SW[z]=r;
  const okB=Math.abs(r.B-CITED_B[z])<6e-5?'MATCH':'MISMATCH';
  const ok2=Math.abs(r.B2/12-CITED_MS3[z])/CITED_MS3[z]<1e-4?'MATCH':'MISMATCH';
  console.log(`  ${String(z).padStart(2)}   ${r.B.toFixed(4)}  ${CITED_B[z].toFixed(4)} ${okB}   ${(r.B2/12).toExponential(4)}  ${CITED_MS3[z].toExponential(4)} ${ok2}   ${r.rec.length}`);
}

// ============================================================================
// S1 STRUCTURE — the decay law of Vabs(e), and where B2's mass sits
// ============================================================================
console.log('\nS1 STRUCTURE — Vabs(e) vs e, exact at z = 13..23; B2 mass profiles at all ten z');
{ // fit calibration on a synthetic law over the REAL support of z = 13
  const rc=SW[13].rec, x1=[],x2=[],ys=[];
  for(const r of rc){x1.push(Math.log(r.e));x2.push(r.om);ys.push(Math.log(7)-Math.log(r.e)+Math.LN2*r.om);}
  const f=ols2(x1,x2,ys);
  const ok=Math.abs(f.a-Math.log(7))<1e-9&&Math.abs(f.b+1)<1e-9&&Math.abs(f.c-Math.LN2)<1e-9;
  console.log(`  synthetic control: Vabs = 7 2^omega/e on the real z=13 support returns (lnC,b,c) = (${f.a.toFixed(4)}, ${f.b.toFixed(4)}, ${f.c.toFixed(4)}) (want ${Math.log(7).toFixed(4)}, -1, ${Math.LN2.toFixed(4)})  ${ok?'PASS':'FAIL — FITS VOID'}`);
}
console.log('  fits of ln Vabs (all supported e): F1 = a + b ln e;  F2 = a + b ln e + c omega(e)');
console.log('   z    F1 slope b (se)        F2: b        c       c/ln2    rmse   sup phi2=e Vabs/2^om (at e)   B2-wtd rms phi2');
for(const z of [13,17,19,23]){
  const rc=SW[z].rec, x1=[],x2=[],ys=[];
  for(const r of rc){ if(r.vabs<=0)continue; x1.push(Math.log(r.e));x2.push(r.om);ys.push(Math.log(r.vabs)); }
  const f1=ols(x1,ys), f2=ols2(x1,x2,ys);
  let sup=0,supE=0,wr=0;
  for(const r of rc){ const ph=r.e*r.vabs/Math.pow(2,r.om);
    if(ph>sup){sup=ph;supE=r.e;} wr+=(r.e*r.e*r.vabs*r.vabs/SW[z].B2)*ph*ph; }
  console.log(`  ${String(z).padStart(2)}   ${f1.b.toFixed(4)} (${f1.se.toFixed(4)})      ${f2.b.toFixed(4)}   ${f2.c.toFixed(4)}   ${(f2.c/Math.LN2).toFixed(3)}   ${f2.rmse.toFixed(3)}     ${sup.toFixed(4)} (e=${supE})          ${Math.sqrt(wr).toFixed(4)}`);
}
console.log('  (F2 reading: b ~ -1 with c ~ ln2 would be the divisor-weighted law Vabs ~ C 2^omega(e)/e — the shape');
console.log('   of Theorem 1\'s envelope 3A rho(e); ln e and omega are collinear, so the fixed-omega slopes decide.)');
{ // e-dependence at FIXED omega (collinearity control for F2)
  for(const z of [23,47]){
    const by=new Map();
    for(const r of SW[z].rec){ if(r.vabs<=0)continue;
      if(!by.has(r.om))by.set(r.om,[[],[]]);
      const o=by.get(r.om); o[0].push(Math.log(r.e)); o[1].push(Math.log(r.vabs)); }
    const parts=[];
    for(const k of [...by.keys()].sort((a,b)=>a-b)){ const[xs,ys]=by.get(k);
      if(xs.length<8)continue; const f=ols(xs,ys); parts.push(`om=${k}: ${f.b.toFixed(2)}+/-${f.se.toFixed(2)} (${xs.length} e)`); }
    console.log(`  z=${z} fixed-omega slopes d ln Vabs/d ln e: `+parts.join('  '));
  }
}
console.log('  B2 mass profile (share of B2):');
console.log('   z   #supp/#possible    top e (factored)      top1%   top8%   N90   sh(om>=max-1)   sh(e>qmax/8)   sh(2*3|e)');
for(const z of ZS){
  const sw=SW[z], rc=sw.rec.slice().sort((a,b)=>b.e*b.vabs*b.vabs*b.e-a.e*a.vabs*a.vabs*a.e);
  // #possible = divisors of P(z) that are <= qmax (DFS count)
  const ps=sw.t.ps; let poss=0;
  (function cnt(i,prod){ if(i===ps.length){ if(prod>1)poss++; return; }
    cnt(i+1,prod); if(prod*ps[i]<=sw.qmax) cnt(i+1,prod*ps[i]); })(0,1);
  const c2=(r)=>r.e*r.e*r.vabs*r.vabs;
  let omax=0; for(const r of rc) if(r.om>omax)omax=r.om;
  let top1=c2(rc[0]), top8=0, run=0, n90=0, shOm=0, shBig=0, sh6=0;
  for(let i=0;i<Math.min(8,rc.length);i++) top8+=c2(rc[i]);
  for(const r of rc){ run+=c2(r); n90++; if(run>=0.90*sw.B2)break; }
  for(const r of rc){ const c=c2(r);
    if(r.om>=omax-1)shOm+=c; if(r.e>sw.qmax/8)shBig+=c; if(r.e%6===0)sh6+=c; }
  const fac=(e)=>{const o=[];for(const p of ps)if(e%p===0)o.push(p);return o.join('.');};
  console.log(`  ${String(z).padStart(2)}   ${String(rc.length).padStart(5)}/${String(poss).padStart(5)}   ${fac(rc[0].e).padEnd(22)}  ${(100*top1/sw.B2).toFixed(1).padStart(5)}   ${(100*top8/sw.B2).toFixed(1).padStart(5)}   ${String(n90).padStart(4)}      ${(100*shOm/sw.B2).toFixed(1).padStart(5)}          ${(100*shBig/sw.B2).toFixed(1).padStart(5)}        ${(100*sh6/sw.B2).toFixed(1).padStart(5)}`);
}
{ // the omega ladder at the two ends of the walkable range
  for(const z of [23,47]){
    const sw=SW[z], by=new Map();
    for(const r of sw.rec){ const c=r.e*r.e*r.vabs*r.vabs;
      const o=by.get(r.om)||{n:0,c:0}; o.n++; o.c+=c; by.set(r.om,o); }
    const ks=[...by.keys()].sort((a,b)=>a-b);
    console.log(`  z=${z} B2 share by omega(e): `+ks.map(k=>`om=${k}: ${(100*by.get(k).c/sw.B2).toFixed(1)}% (${by.get(k).n} e)`).join('  '));
  }
}

// ============================================================================
// S2 MODE-EXACT DECOMPOSITION at z = 13, 17, 19 — the chain after the repair
// ============================================================================
console.log('\nS2 MODE-EXACT at z = 13, 17, 19: spectral mass per e, and the MS3\' chain');
console.log('   spec = <rho~^2> (all primitive modes), hyp-l2 = sum_e ||Theta_e||_2^2 / (4 sin^2(pi/e))');
console.log('   (hyp-l2 is NOT a proven bound — it is what a residue-class l2 mean value would buy)');
for(const z of [13,17,19]){
  err(`  S2 modes z=${z} ... [${el()}]`);
  const sw=SW[z], EM=sw.EM, ps=sw.t.ps;
  let spec=0, ms3T=0, ms3Tp=0, hyp=0;
  const perE=[];
  for(const [e,m1] of EM){
    // precompute per-class phase multipliers: Theta_e(a) = sum_cls V e(2 a inv(e1 mod e2)/e2)
    const cls=[];
    for(const [e1,V] of m1){ const e2=e/e1;
      if(e2===1){ cls.push([V,0,1]); continue; }
      const [,inv]=egcd(((e1%e2)+e2)%e2,e2);
      cls.push([V,((inv%e2)+e2)%e2,e2]);
    }
    let se=0,l2=0,th2max=0;
    for(let a=1;a<e;a++){
      if(gcd(a,e)!==1) continue;
      let re=0,im=0;
      for(const [V,inv,e2] of cls){
        const ph=e2===1?0:2*Math.PI*((2*(a%e2)*inv)%e2)/e2;  // 2 a inv <= 2 e2^2 < 2^53 at z <= 19: exact
        re+=V*Math.cos(ph); im+=V*Math.sin(ph); }
      const th2=re*re+im*im;
      const sn=Math.sin(Math.PI*a/e);
      se+=th2/(4*sn*sn); l2+=th2; if(th2>th2max)th2max=th2;
    }
    const J2=J2of(e);
    spec+=se; ms3T+=th2max*(e*e-1)/12; ms3Tp+=th2max*J2/12;
    const s1=Math.sin(Math.PI/e); hyp+=l2/(4*s1*s1);
    perE.push({e,se,l2,th2max});
  }
  const truth=truthOf(z), b2J=sw.B2J/12, b2=sw.B2/12;
  const holds=spec<=ms3Tp+1e-9&&ms3Tp<=b2J+1e-9&&b2J<=b2+1e-9;
  console.log(`  z=${z}: spec = ${spec.toFixed(6)} vs cited truth ${truth.toFixed(6)} (rel ${(Math.abs(spec-truth)/truth).toExponential(1)})`);
  console.log(`        chain: spec ${spec.toFixed(3)} <= sum Theta*^2 J2/12 = ${ms3Tp.toFixed(3)} <= B2J/12 = ${b2J.toFixed(3)} <= B2/12 = ${b2.toFixed(3)}  ${holds?'HOLDS':'FAILS'}`);
  console.log(`        step costs after the repair: max_a = ${(ms3Tp/spec).toFixed(2)}x (was ${(ms3T/spec).toFixed(2)}x), triangle = ${(b2J/ms3Tp).toFixed(2)}x, total ${(b2J/spec).toFixed(2)}x (was ${(b2/spec).toFixed(2)}x)`);
  console.log(`        hyp-l2 route would read ${hyp.toFixed(3)} = ${(hyp/spec).toFixed(2)}x truth (needs an UNOWNED bound on sum_a* |Theta_e(a)|^2)`);
  perE.sort((a,b)=>b.se-a.se);
  console.log(`        top spectral moduli: `+perE.slice(0,4).map(r=>`e=${r.e}: ${(100*r.se/spec).toFixed(1)}%`).join('  '));
}

// ============================================================================
// S3 THEOREM MV — the proven ladder, each step verified, all ten z
// ============================================================================
console.log('\nS3 THEOREM MV: B2 <= MV0 <= MV1 <= MV2, and the step-1 viol check Vabs <= T <= 3 A rho');
const MV={};
for(const z of ZS){
  const sw=SW[z], ps=sw.t.ps;
  let A=2.5; for(const p of ps) if(p>2) A*=1+2/p;
  let E=43/25; for(const p of ps) if(p>2) E*=1+4*p/((p+2)*(p+2));
  let P3=1,P3J=1; for(const p of ps){ P3*=1+(f_(p)-1)/p; P3J*=1+(fJ_(p)-1)/p; }
  // viol checks (Theorem 1 steps, re-verified on this lattice through z = 47)
  let w1=0,w2=0;
  for(const r of sw.rec){
    if(r.T>0&&r.vabs/r.T>w1)w1=r.vabs/r.T;
    let rho=1; for(const p of ps) if(r.e%p===0) rho*=r_(p);
    const rat=r.T/(3*A*rho); if(rat>w2)w2=rat;
  }
  // S(z), S_J(z): DFS over squarefree e | P(z), e <= qmax
  let Ssum=0,SJ=0;
  (function dfs(i,prod,fv,fj){ if(i===ps.length){ if(prod>1){Ssum+=fv;SJ+=fj;} return; }
    dfs(i+1,prod,fv,fj);
    if(prod*ps[i]<=sw.qmax) dfs(i+1,prod*ps[i],fv*f_(ps[i]),fj*fJ_(ps[i])); })(0,1,1,1);
  const MV1=9*A*A*Ssum, MV1J=9*A*A*SJ, MV2=9*A*A*sw.qmax*P3;
  MV[z]={A,E,P3,P3J,Ssum,SJ,MV1,MV1J,MV2,w1,w2};
  const chain=sw.B2<=sw.MV0+1e-9&&sw.MV0<=MV1*(1+1e-12)&&MV1<=MV2*(1+1e-12)&&Ssum<=sw.qmax*P3;
  console.log(`  z=${String(z).padStart(2)}  max Vabs/T=${w1.toFixed(4)} ${w1<=1+1e-12?'OK':'VIOL'}  max T/(3A rho)=${w2.toFixed(4)} ${w2<=1+1e-12?'OK':'VIOL'}  A=${A.toFixed(3)}  S=${Ssum.toExponential(3)}  chain B2<=MV0<=MV1<=MV2 ${chain?'HOLDS':'FAILS'}`);
}
console.log('  the ladder against the trivial shapes (all PROVEN columns except B2 itself, which is exact):');
console.log('   z      B2 (exact)    MV0=sum e^2 T^2   MV1=9A^2 S    MV2=9A^2 qmax P3   qmax*B (meas)   qmax*9A^2(E-1)   qmax^2 sumV^2    MV0/B2  MV1/B2  MV2/qmaxB');
for(const z of ZS){
  const sw=SW[z], m=MV[z];
  const qB=sw.qmax*sw.B, qBp=sw.qmax*9*m.A*m.A*(m.E-1), q2=sw.qmax*sw.qmax*sw.SV;
  console.log(`  ${String(z).padStart(2)}   ${sw.B2.toExponential(4)}    ${sw.MV0.toExponential(4)}     ${m.MV1.toExponential(4)}    ${m.MV2.toExponential(4)}      ${qB.toExponential(4)}     ${qBp.toExponential(4)}      ${q2.toExponential(4)}     ${(sw.MV0/sw.B2).toExponential(1)}  ${(m.MV1/sw.B2).toExponential(1)}   ${(m.MV2/qB).toExponential(1)}`);
}
{ // growth of the ladder vs B2 (calibrated OLS on ln-ln)
  const xs=ZS.map(z=>Math.log(z));
  const fB2=ols(xs,ZS.map(z=>Math.log(SW[z].B2)));
  const f0=ols(xs,ZS.map(z=>Math.log(SW[z].MV0)));
  const f1=ols(xs,ZS.map(z=>Math.log(MV[z].MV1)));
  const fq=ols(xs,ZS.map(z=>Math.log(SW[z].qmax*SW[z].B)));
  console.log(`  window slopes 13..47 (local, rising with z — quote no single power): d ln B2/d ln z = ${fB2.b.toFixed(3)} +/- ${fB2.se.toFixed(3)},`);
  console.log(`    MV0: ${f0.b.toFixed(3)} +/- ${f0.se.toFixed(3)},  MV1: ${f1.b.toFixed(3)} +/- ${f1.se.toFixed(3)},  qmax B: ${fq.b.toFixed(3)} +/- ${fq.se.toFixed(3)}`);
  console.log(`  asymptotics (proven): MV2 = O(qmax ln^7 z) — one log below qmax*B's proven O(qmax ln^8 z);`);
  console.log(`  the sign-discard price MV0/B2 is the named missing mean value (Vabs <= T under the e^2 weight).`);
}

// ============================================================================
// S4 THE PRICE — caps re-priced at z = 13..47, and the proven all-z window
// ============================================================================
console.log('\nS4 CAPS: cap = log_z(2 sqrt(2 lnW * bound/12)/M), bound in {B2 (=MS3, cited control), B2J (MS3\'), MV1J (analytic)}');
console.log('   z    cap3 (cited)      cap3\'   -beta2     capMV1J  -beta2    MS3/truth  MS3\'/truth   gain B2/B2J (zeta2 cap this z)');
for(const z of ZS){
  const sw=SW[z], m=MV[z];
  let lnW=0; for(const p of sw.t.ps) lnW+=Math.log(p);
  const M=sw.t.M, lz=Math.log(z);
  const cap=(bnd)=>(Math.log(2)+0.5*Math.log(2*lnW*bnd/12)-Math.log(M))/lz;
  const c3=cap(sw.B2), c3p=cap(sw.B2J), cMV=cap(m.MV1J);
  const okc=Math.abs(c3-CITED_CAP3[z])<6e-4?'MATCH':'MISMATCH';
  let zcap=1; for(const p of sw.t.ps) zcap*=1/(1-1/(p*p));
  const truth=truthOf(z);
  console.log(`  ${String(z).padStart(2)}   ${c3.toFixed(4)} (${CITED_CAP3[z].toFixed(4)}) ${okc}  ${c3p.toFixed(4)}  ${(c3p-BETA2).toFixed(4)}   ${cMV.toFixed(4)}  ${(cMV-BETA2>=0?'+':'')}${(cMV-BETA2).toFixed(4)}    ${(sw.B2/12/truth).toFixed(1).padStart(5)}      ${(sw.B2J/12/truth).toFixed(1).padStart(5)}        ${(sw.B2/sw.B2J).toFixed(4)} (${zcap.toFixed(4)})`);
}
console.log('  capMV1J is FULLY ANALYTIC per z: no enumerated Vabs anywhere — only A(z), the f_J subset sum, qmax, lnW, M (all exact).');

console.log('\n  all-z window scans (M = 0.35/ln^2 z, the flagged literature-rider model; sensitivity below):');
{ // (i) exact-prime scan of the MV2-proven crude cap (qmax -> min(P(z), z^6))
  const P=primesBelow(150000);
  let th=0, lA=Math.log(2.5), lP3J=0;      // at z = p: th = theta(p), lA = ln A(p), lP3J = sum over q < p
  let lo=0,hi=0,mx=0,mz=0,capEnd=0;
  for(const p of P){
    if(p>2){ const z=p, lz=Math.log(z);
      const lnQ=Math.min(2*S*lz,th);
      const lnMV2=Math.log(9)+2*lA+lnQ+lP3J;                 // J2-weighted P3 (sharper, still proven)
      const lnM=Math.log(0.35)-2*Math.log(lz);
      const cap=(Math.log(2)+0.5*(Math.log(2*th)+lnMV2-Math.log(12))-lnM)/lz;
      if(cap>BETA2){ if(!lo)lo=z; hi=z; } if(cap>mx){mx=cap;mz=z;} capEnd=cap;
    }
    th+=Math.log(p);
    if(p>2){ lA+=Math.log(1+2/p); }
    lP3J+=Math.log(1+(fJ_(p)-1)/p);
  }
  console.log(`  exact-prime scan (true theta, A, P3J to z = 150000): proven cap > beta_2 on [${lo}, ${hi}]; peak ${mx.toFixed(3)} at z=${mz}; at scan end cap = ${capEnd.toFixed(3)} — window OPEN at 1.5e5`);
}
{ // (ii) Rosser-Schoenfeld formula scan: locate the proven re-entry z*
  // theta(z) < 1.01624 z; prod_{p<=x}(1-1/p)^{-1} < e^g lnx (1+1/ln^2x), x>=285:
  //   A(z) <= (5/8) [e^g lnz (1+1/ln^2z)]^2,  prod(1+h_J/p) <= [e^g lnz (1+1/ln^2z)]^3, qmax <= z^6
  const capRS=(lz,cM)=>{
    const mer=GAMMA+Math.log(lz)+Math.log(1+1/(lz*lz));
    const lA=Math.log(5/8)+2*mer, lP3=3*mer;
    const lnMV2=Math.log(9)+2*lA+6*lz+lP3;
    const lnTh=Math.log(1.01624)+lz;
    const lnM=Math.log(cM)-2*Math.log(lz);
    return (Math.log(2)+0.5*(Math.log(2)+lnTh+lnMV2-Math.log(12))-lnM)/lz;
  };
  for(const cM of [0.35,0.1,0.01]){
    let last=0;
    for(let lz=6;lz<=150;lz+=0.005) if(capRS(lz,cM)>BETA2) last=lz;
    console.log(`  RS formula scan, c_M = ${cM}: proven cap re-enters below beta_2 at ln z* = ${last.toFixed(2)}, z* = ${Math.exp(last).toExponential(2)}  (stays below for all larger z: cap -> 3.5)`);
  }
  // control: the RS formula must dominate the exact scan where both exist
  const P=primesBelow(150000); let th=0,lA=Math.log(2.5),lP3J=0,ok=true,worst=0;
  for(const p of P){
    if(p>2&&p>=285){ const lz=Math.log(p);
      const lnQ=Math.min(2*S*lz,th);
      const ex=(Math.log(2)+0.5*(Math.log(2*th)+Math.log(9)+2*lA+lnQ+lP3J-Math.log(12))-(Math.log(0.35)-2*Math.log(lz)))/lz;
      const rs=capRS(lz,0.35);
      if(rs<ex-1e-9){ok=false;} if(ex-rs>worst)worst=ex-rs;
    }
    th+=Math.log(p); if(p>2)lA+=Math.log(1+2/p); lP3J+=Math.log(1+(fJ_(p)-1)/p);
  }
  console.log(`  control: RS formula >= exact scan at every prime 285..150000: ${ok?'PASS':'FAIL'} (RS is an upper envelope by construction)`);
}
console.log('\nDONE '+el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-b2mean-01.js
//   invocation:  node research/attack-b2mean-01.js
//   code-sha256: 5803e1d6a16fbceba7b2897807a9b1c88f14f8477ced24237c4d3ce5e9b6d624
//   out-sha256:  cf9fbb9bf19a759f7f363585f91bf0f1435321217a2bc146d532d74442e799a6
//   body-lines:  113
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     6.4 s
// ============================================================================
// S0 CONTROLS
//   OLS control: y = 5 z^3.7 at 6 z returns slope 3.700000 (want 3.700000)  PASS
//   OLS2 control: returns (a,b,c) = (2.300000, -1.700000, 0.900000) (want 2.3, -1.7, 0.9)  PASS
//   LEMMA J control: sum over primitive a of 1/(4 sin^2(pi a/e)) vs J2(e)/12, e = 2..200: worst rel 2.9e-14 at e=198  PASS
//   sweep control vs the cited attack-rhoms-01 columns (B to 4-5 digits, B2/12 to 5 figures):
//    z      B      cited        B2/12      cited        #e supported
//   13   1.3833  1.3833 MATCH   1.9710e+1  1.9710e+1 MATCH   31
//   17   1.4214  1.4214 MATCH   7.7252e+1  7.7252e+1 MATCH   63
//   19   1.4348  1.4348 MATCH   1.4523e+2  1.4523e+2 MATCH   127
//   23   1.4503  1.4503 MATCH   2.6746e+2  2.6746e+2 MATCH   243
//   29   1.4660  1.4660 MATCH   6.4627e+2  6.4627e+2 MATCH   467
//   31   1.4764  1.4764 MATCH   1.1625e+3  1.1625e+3 MATCH   827
//   37   1.4883  1.4883 MATCH   3.6976e+3  3.6976e+3 MATCH   1527
//   41   1.4963  1.4963 MATCH   6.4644e+3  6.4644e+3 MATCH   2535
//   43   1.5057  1.5057 MATCH   8.9156e+3  8.9156e+3 MATCH   3879
//   47   1.5135  1.5135 MATCH   1.5955e+4  1.5955e+4 MATCH   6119
//
// S1 STRUCTURE — Vabs(e) vs e, exact at z = 13..23; B2 mass profiles at all ten z
//   synthetic control: Vabs = 7 2^omega/e on the real z=13 support returns (lnC,b,c) = (1.9459, -1.0000, 0.6931) (want 1.9459, -1, 0.6931)  PASS
//   fits of ln Vabs (all supported e): F1 = a + b ln e;  F2 = a + b ln e + c omega(e)
//    z    F1 slope b (se)        F2: b        c       c/ln2    rmse   sup phi2=e Vabs/2^om (at e)   B2-wtd rms phi2
//   13   -0.5138 (0.0842)      -1.3005   1.4387   2.076   0.537     0.4545 (e=105)          0.3621
//   17   -0.5720 (0.0516)      -1.3408   1.5418   2.224   0.551     0.4087 (e=1155)          0.3280
//   19   -0.7522 (0.0392)      -1.5592   1.7584   2.537   0.771     0.3874 (e=1155)          0.2730
//   23   -0.8283 (0.0276)      -1.5665   1.6794   2.423   0.824     0.4180 (e=2310)          0.2466
//   (F2 reading: b ~ -1 with c ~ ln2 would be the divisor-weighted law Vabs ~ C 2^omega(e)/e — the shape
//    of Theorem 1's envelope 3A rho(e); ln e and omega are collinear, so the fixed-omega slopes decide.)
//   z=23 fixed-omega slopes d ln Vabs/d ln e: om=1: -0.97+/-0.15 (8 e)  om=2: -1.26+/-0.08 (28 e)  om=3: -1.49+/-0.07 (56 e)  om=4: -1.64+/-0.08 (70 e)  om=5: -1.81+/-0.13 (54 e)  om=6: -1.57+/-0.31 (23 e)
//   z=47 fixed-omega slopes d ln Vabs/d ln e: om=1: -0.99+/-0.07 (14 e)  om=2: -1.24+/-0.03 (91 e)  om=3: -1.28+/-0.02 (364 e)  om=4: -1.30+/-0.01 (1001 e)  om=5: -1.58+/-0.06 (1763 e)  om=6: -1.48+/-0.07 (1753 e)  om=7: -1.44+/-0.03 (876 e)  om=8: -2.08+/-0.06 (172 e)
//   B2 mass profile (share of B2):
//    z   #supp/#possible    top e (factored)      top1%   top8%   N90   sh(om>=max-1)   sh(e>qmax/8)   sh(2*3|e)
//   13      31/   31   2.3.5.7.11               27.1    91.2      8       79.3           57.1         77.8
//   17      63/   63   2.3.5.7.11               18.4    72.8     15       65.2           29.2         75.9
//   19     127/  127   2.3.5.7.11                8.8    54.5     31       27.8            3.9         74.7
//   23     243/  248   2.3.5.7.11.13             6.5    42.0     53       40.7            9.9         75.6
//   29     467/  483   2.3.5.7.11.13             7.4    32.9     88       59.2           12.5         76.5
//   31     827/  910   2.3.5.7.11.13             4.3    24.8    147       17.2            4.7         77.1
//   37    1527/ 1722   2.3.5.7.11.13.17          2.9    14.0    307       44.3           12.3         76.1
//   41    2535/ 3112   2.3.5.7.11.13.17          1.7     9.8    514       51.8           13.0         76.0
//   43    3879/ 5094   2.3.5.7.11.13.17          1.2     7.4    774       53.7           16.2         76.6
//   47    6119/ 9003   2.3.5.7.11.13.17.19       0.8     5.0   1233       13.9            9.1         76.2
//   z=23 B2 share by omega(e): om=1: 0.0% (8 e)  om=2: 0.1% (28 e)  om=3: 2.1% (56 e)  om=4: 14.9% (70 e)  om=5: 42.2% (54 e)  om=6: 38.1% (23 e)  om=7: 2.6% (4 e)
//   z=47 B2 share by omega(e): om=1: 0.0% (14 e)  om=2: 0.0% (91 e)  om=3: 0.1% (364 e)  om=4: 0.8% (1001 e)  om=5: 7.5% (1775 e)  om=6: 30.7% (1795 e)  om=7: 47.0% (906 e)  om=8: 13.9% (172 e)  om=9: 0.0% (1 e)
//
// S2 MODE-EXACT at z = 13, 17, 19: spectral mass per e, and the MS3' chain
//    spec = <rho~^2> (all primitive modes), hyp-l2 = sum_e ||Theta_e||_2^2 / (4 sin^2(pi/e))
//    (hyp-l2 is NOT a proven bound — it is what a residue-class l2 mean value would buy)
//   z=13: spec = 1.095066 vs cited truth 1.095066 (rel 4.4e-7)
//         chain: spec 1.095 <= sum Theta*^2 J2/12 = 2.275 <= B2J/12 = 13.283 <= B2/12 = 19.710  HOLDS
//         step costs after the repair: max_a = 2.08x (was 3.05x), triangle = 5.84x, total 12.13x (was 18.00x)
//         hyp-l2 route would read 61.139 = 55.83x truth (needs an UNOWNED bound on sum_a* |Theta_e(a)|^2)
//         top spectral moduli: e=2310: 43.8%  e=210: 32.7%  e=330: 3.0%  e=110: 2.8%
//   z=17: spec = 2.496563 vs cited truth 2.496563 (rel 1.9e-7)
//         chain: spec 2.497 <= sum Theta*^2 J2/12 = 15.085 <= B2J/12 = 51.942 <= B2/12 = 77.252  HOLDS
//         step costs after the repair: max_a = 6.04x (was 8.94x), triangle = 3.44x, total 20.81x (was 30.94x)
//         hyp-l2 route would read 1660.719 = 665.20x truth (needs an UNOWNED bound on sum_a* |Theta_e(a)|^2)
//         top spectral moduli: e=2310: 49.2%  e=10010: 12.2%  e=210: 10.6%  e=231: 2.2%
//   z=19: spec = 4.952375 vs cited truth 4.952375 (rel 7.9e-8)
//         chain: spec 4.952 <= sum Theta*^2 J2/12 = 33.443 <= B2J/12 = 97.846 <= B2/12 = 145.235  HOLDS
//         step costs after the repair: max_a = 6.75x (was 9.97x), triangle = 2.93x, total 19.76x (was 29.33x)
//         hyp-l2 route would read 27706.319 = 5594.55x truth (needs an UNOWNED bound on sum_a* |Theta_e(a)|^2)
//         top spectral moduli: e=2310: 21.4%  e=46410: 10.9%  e=5610: 8.0%  e=10010: 5.6%
//
// S3 THEOREM MV: B2 <= MV0 <= MV1 <= MV2, and the step-1 viol check Vabs <= T <= 3 A rho
//   z=13  max Vabs/T=0.0901 OK  max T/(3A rho)=0.9927 OK  A=8.864  S=2.382e+2  chain B2<=MV0<=MV1<=MV2 HOLDS
//   z=17  max Vabs/T=0.1111 OK  max T/(3A rho)=0.9918 OK  A=10.227  S=9.569e+2  chain B2<=MV0<=MV1<=MV2 HOLDS
//   z=19  max Vabs/T=0.3333 OK  max T/(3A rho)=0.9838 OK  A=11.430  S=4.024e+3  chain B2<=MV0<=MV1<=MV2 HOLDS
//   z=23  max Vabs/T=0.3333 OK  max T/(3A rho)=0.9772 OK  A=12.634  S=1.340e+4  chain B2<=MV0<=MV1<=MV2 HOLDS
//   z=29  max Vabs/T=0.3333 OK  max T/(3A rho)=0.9768 OK  A=13.732  S=4.592e+4  chain B2<=MV0<=MV1<=MV2 HOLDS
//   z=31  max Vabs/T=0.3333 OK  max T/(3A rho)=0.9716 OK  A=14.679  S=1.365e+5  chain B2<=MV0<=MV1<=MV2 HOLDS
//   z=37  max Vabs/T=0.3333 OK  max T/(3A rho)=0.9758 OK  A=15.626  S=4.204e+5  chain B2<=MV0<=MV1<=MV2 HOLDS
//   z=41  max Vabs/T=0.3333 OK  max T/(3A rho)=0.9727 OK  A=16.471  S=1.080e+6  chain B2<=MV0<=MV1<=MV2 HOLDS
//   z=43  max Vabs/T=0.3333 OK  max T/(3A rho)=0.9675 OK  A=17.275  S=2.010e+6  chain B2<=MV0<=MV1<=MV2 HOLDS
//   z=47  max Vabs/T=0.3333 OK  max T/(3A rho)=0.9664 OK  A=18.078  S=5.032e+6  chain B2<=MV0<=MV1<=MV2 HOLDS
//   the ladder against the trivial shapes (all PROVEN columns except B2 itself, which is exact):
//    z      B2 (exact)    MV0=sum e^2 T^2   MV1=9A^2 S    MV2=9A^2 qmax P3   qmax*B (meas)   qmax*9A^2(E-1)   qmax^2 sumV^2    MV0/B2  MV1/B2  MV2/qmaxB
//   13   2.3652e+2    1.1658e+5     1.6844e+5    3.8831e+6      3.1953e+3     8.2968e+6      2.9497e+5     4.9e+2  7.1e+2   1.2e+3
//   17   9.2703e+2    4.2846e+5     9.0083e+5    7.7571e+7      4.2684e+4     1.8332e+8      3.7260e+7     4.6e+2  9.7e+2   1.8e+3
//   19   1.7428e+3    9.9027e+5     4.7323e+6    1.8606e+9      7.3247e+5     4.7392e+9      8.2812e+9     5.7e+2  2.7e+3   2.5e+3
//   23   3.2096e+3    2.2326e+6     1.9254e+7    4.3960e+9      1.2788e+6     1.1942e+10      1.9189e+10     7.0e+2  6.0e+3   3.4e+3
//   29   7.7553e+3    5.9061e+6     7.7937e+7    2.2312e+10      5.0316e+6     6.3856e+10      2.4178e+11     7.6e+2  1.0e+4   4.4e+3
//   31   1.3949e+4    1.0469e+7     2.6473e+8    7.8267e+10      1.4321e+7     2.3337e+11      1.6320e+12     7.5e+2  1.9e+4   5.5e+3
//   37   4.4371e+4    2.7573e+7     9.2394e+8    3.1520e+11      4.7434e+7     9.7585e+11      1.6093e+13     6.2e+2  2.1e+4   6.6e+3
//   41   7.7573e+4    4.6519e+7     2.6359e+9    8.6176e+11      1.0965e+8     2.7528e+12      7.5260e+13     6.0e+2  3.4e+4   7.9e+3
//   43   1.0699e+5    6.6432e+7     5.3973e+9    1.1517e+12      1.2595e+8     3.7831e+12      8.5552e+13     6.2e+2  5.0e+4   9.1e+3
//   47   1.9146e+5    1.1246e+8     1.4802e+10    3.5713e+12      3.3766e+8     1.2044e+13      5.5496e+14     5.9e+2  7.7e+4   1.1e+4
//   window slopes 13..47 (local, rising with z — quote no single power): d ln B2/d ln z = 5.096 +/- 0.186,
//     MV0: 5.282 +/- 0.100,  MV1: 8.763 +/- 0.267,  qmax B: 8.464 +/- 0.489
//   asymptotics (proven): MV2 = O(qmax ln^7 z) — one log below qmax*B's proven O(qmax ln^8 z);
//   the sign-discard price MV0/B2 is the named missing mean value (Vabs <= T under the e^2 weight).
//
// S4 CAPS: cap = log_z(2 sqrt(2 lnW * bound/12)/M), bound in {B2 (=MS3, cited control), B2J (MS3'), MV1J (analytic)}
//    z    cap3 (cited)      cap3'   -beta2     capMV1J  -beta2    MS3/truth  MS3'/truth   gain B2/B2J (zeta2 cap this z)
//   13   2.5104 (2.5104) MATCH  2.4335  -1.8330   3.7368  -0.5296     18.0       12.1        1.4838 (1.6083)
//   17   2.6252 (2.6252) MATCH  2.5551  -1.7113   3.7898  -0.4767     30.9       20.8        1.4873 (1.6179)
//   19   2.7326 (2.7326) MATCH  2.6655  -1.6010   4.0272  -0.2392     29.3       19.8        1.4843 (1.6235)
//   23   2.7427 (2.7427) MATCH  2.6798  -1.5866   4.0864  -0.1801     33.5       22.6        1.4832 (1.6280)
//   29   2.7323 (2.7323) MATCH  2.6733  -1.5931   4.0617  -0.2047     47.5       32.0        1.4871 (1.6311)
//   31   2.8129 (2.8129) MATCH  2.7554  -1.5111   4.2104  -0.0560     47.0       31.7        1.4845 (1.6331)
//   37   2.8664 (2.8664) MATCH  2.8116  -1.4548   4.2084  -0.0581     43.2       29.0        1.4858 (1.6348)
//   41   2.8979 (2.8979) MATCH  2.8449  -1.4216   4.2696  +0.0031     44.9       30.3        1.4831 (1.6360)
//   43   2.9386 (2.9386) MATCH  2.8863  -1.3801   4.3463  +0.0799     44.3       29.9        1.4815 (1.6369)
//   47   2.9740 (2.9740) MATCH  2.9232  -1.3433   4.4050  +0.1385     44.2       29.9        1.4793 (1.6378)
//   capMV1J is FULLY ANALYTIC per z: no enumerated Vabs anywhere — only A(z), the f_J subset sum, qmax, lnW, M (all exact).
//
//   all-z window scans (M = 0.35/ln^2 z, the flagged literature-rider model; sensitivity below):
//   exact-prime scan (true theta, A, P3J to z = 150000): proven cap > beta_2 on [13, 149993]; peak 5.695 at z=31; at scan end cap = 4.702 — window OPEN at 1.5e5
//   RS formula scan, c_M = 0.35: proven cap re-enters below beta_2 at ln z* = 28.65, z* = 2.77e+12  (stays below for all larger z: cap -> 3.5)
//   RS formula scan, c_M = 0.1: proven cap re-enters below beta_2 at ln z* = 30.80, z* = 2.39e+13  (stays below for all larger z: cap -> 3.5)
//   RS formula scan, c_M = 0.01: proven cap re-enters below beta_2 at ln z* = 34.65, z* = 1.12e+15  (stays below for all larger z: cap -> 3.5)
//   control: RS formula >= exact scan at every prime 285..150000: PASS (RS is an upper envelope by construction)
//
// DONE 6.3s
// ============================================================================
// READINGS
//
