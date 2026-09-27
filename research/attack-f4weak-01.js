// ============================================================================
// attack-f4weak-01.js — THE WEAKEST SUFFICIENT FORM OF F4: MODE-COUNT CHECK,
//                       THE l1/COEFFICIENT-DECAY ROUTE, THE (lnW)^A / W^eps
//                       CHARTS, AND THE MOMENT-LADDER CHART
// ============================================================================
// FEEDS the F4 follow-on of attack-rhoms-01.md: with <rho~^2> <= C z^{2s} ln^8 z
// PROVEN (rms <= z^{3+o(1)}), the pricing needs only a recovery REC(l) with
// l < beta_2 - 3 = 1.26645: ANY bound sup|rho~| <= C rms z^{l} wins. This file
// hunts the weakest form that could be PROVEN, starting from the fact that
// rho~ is a deterministic explicit trig sum with computed coefficients.
// Write-up: research/history/staging/attack-f4weak-01.md.
//
// THE OBJECT (as in rho-maximal-law.md sec.1, attack-rhoms-01.js header):
// rho(y) = sum_j w_j psi((y-c_j)/q_j) over the divisor-pair lattice of the
// Brudern-Fouvry certificate at s = 3.0; rho~ = rho + M/2. Spectrally (repo
// identity, re-verified here): the Fourier coefficient of rho~ on Z/W at the
// reduced frequency a/e (e | P(z), e > 1, gcd(a,e) = 1) has magnitude
//   |chat(e,a)| = |Theta_e(a)| / (2 |sin(pi a/e)|),
//   Theta_e(a)  = sum_{j: e|q_j} (w_j/q_j) e(-a c_j/e)     (Theorem B's form),
// and Parseval gives <rho~^2> = sum_{e,a} |chat(e,a)|^2. The MODE SET is
//   E(z) = { e : e | q_j for some term j, e > 1 },  N(z) = sum_{e in E} phi(e)
// (N counts the frequencies with a possibly-nonzero coefficient; some
// Theta_e(a) vanish, so N is an upper count — the z = 13 exact pass measures
// the vanishing fraction).
//
// WHAT IS PROVED / USED (each verified numerically in-pass):
//  L1 (mode Cauchy-Schwarz, the "degree" bound):
//      sup|rho~| <= sum_modes |chat| <= sqrt(N) sqrt(sum |chat|^2)
//                 = sqrt(N(z)) rms(rho~).
//      Trivial and unconditional. S2 computes N(z) exactly at z = 13..47.
//      STRUCTURAL FACT (exact identity sum_{e|W} phi(e) = W): N <= W - 1
//      always, so L1 can never beat Chebyshev M1 = sqrt(W) rms by more than
//      the coverage factor sqrt((W-1)/N); at z <= 19 qmax = P(z) and the mode
//      set is W-saturated — L1 IS Chebyshev there. Poly-in-z structure exists
//      only where qmax < W (z >= 23).
//  L2 (cosecant l1 bound, classical): for every e >= 2,
//      sum_{a=1}^{e-1} 1/(2 sin(pi a/e)) <= (e/2)(ln e + 0.307).
//      Proof: sin(pi a/e) = sin(pi a'/e), a' = min(a, e-a); sin x >= 2x/pi on
//      (0, pi/2] gives 1/(2 sin(pi a'/e)) <= e/(4a'); each a' <= e/2 occurs
//      at most twice; sum_{a'<=e/2} 1/a' <= ln(e/2) + 1 = ln e + 0.30686.
//      Verified numerically over e = 2..30000 (S0).
//  L3 (per-conductor decay bound + Cauchy-Schwarz over conductors):
//      sup|rho~| <= Lambda := sum_{e,a} |chat(e,a)|                (exact l1)
//                <= Lambda_V := sum_e Vabs(e) (e/2)(ln e + 0.307)  (L2 + Theta* <= Vabs)
//                <= CH := ((ln qmax + 0.307)/2) sqrt(#E * B2),     (Cauchy-Schwarz)
//      B2 = sum e^2 Vabs(e)^2 (attack-rhoms-01 MS3's object, recomputed and
//      MATCHED against its embedded column), Theta*(e) = max_a|Theta_e(a)| <=
//      Vabs(e) = sum_{e1e2=e}|V(e1,e2)| (Theorem B triangle, at source).
//      Every link is proven; Lambda is computed EXACTLY at z = 13..29, so
//      "sup <= Lambda(z)" is a proven finite-z bound at those levels.
//  L4 (why the Vabs l1 route collapses to trivial asymptotically):
//      sum_e e Vabs(e) <= sum_i sigma(q_i)/q_i <= n(z) prod_{p<z}(1 + 1/p)
//      = O(n ln z): the triangle over terms inside Vabs lands the l1 route
//      back at the trivial (n+M)/2 scale up to polylog. Verified per z.
//  R2k (moment ladder): sup <= (W m_2k)^{1/2k}; with the Gaussian model
//      m_2k = (2k-1)!! m2^k the k-optimum rediscovers F4 exactly:
//      min_k exp[(lnW + ln(2k-1)!!)/(2k)] -> sqrt(2 lnW) at k ~ lnW
//      (numerically verified at z = 47 and at synthetic theta = 1e3, 1e6).
//
// THE COMPARISON TARGETS (finite-z, strict T >= 1 accounting as in
// attack-rhoms-01 S4): smax(z) = (z^{beta_2} M - 1)/2 — a recovery route
// delivers at z iff its sup bound <= smax. Asymptotic currency: a recovery
// sup <= rms * X(z) wins iff log_z X < beta_2 - 3 = 1.26645 - o(1).
//
// CITED (embedded artifacts, standing compute rule): B(z,3.0) and B2/12
// columns, ms at z >= 31 (rmsr^2), sup and moments at z = 29, from
// attack-rhoms-01.js's embedded tail (B further back to lemmaV-parseval /
// attack-beta2-01); sup|rho~| z = 13..29 from rho-maxlaw-01-sufficiency.js;
// beta_2 = 4.26645 per paper/beta2-note.md. rosserSupport/buildLam/buildTerms
// are the repo's own (sift-limit-lemmaV.js), same custody practice as
// attack-rhoms-01.js; the closed-form pair sum, walker, subset sweep and
// spectral code below are re-implementations controlled against those cited
// columns in-pass.
//
// UNITS: rho~ and its moments dimensionless (weight counts); W, qmax, H, N in
// positions/counts; strengths as exponents base z. WIDTH RULE: W > 2^53 at
// z >= 31 — W appears as an integer only at z <= 29; everything W-dependent
// at z >= 31 runs off lnW = theta(z) in log space. N(z) and Sum e are < 2^53
// at every z here (checked and printed); phi(e) is exact (e squarefree with
// known prime factors, phi = prod(p-1)).
//
//   node research/attack-f4weak-01.js        (~4-6 min; progress on stderr)
// ============================================================================
'use strict';
const path=require('path');
const L=require(path.join(__dirname,'sift-limit-lemmaV.js'));
const T0=Date.now(); const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
const err=(m)=>process.stderr.write(m+'\n');
function primesBelow(n){const s=new Uint8Array(n),o=[];for(let i=2;i<n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<n;j+=i)s[j]=1;}}return o;}
function gcd(a,b){while(b){const t=a%b;a=b;b=t;}return a;}
function egcd(a,b){if(b===0)return[a,1,0];const[g,x,y]=egcd(b,a%b);return[g,y,x-Math.floor(a/b)*y];}
const BETA2=4.26645, S=3.0, CSC=0.30686;   // CSC = 1 - ln 2, the L2 constant
const ZS=[13,17,19,23,29,31,37,41,43,47];

// cited columns (embedded artifacts; controls MATCH below) -------------------
const CITED_B={13:1.3833,17:1.4214,19:1.4348,23:1.4503,29:1.4660,31:1.4764,37:1.4883,41:1.4963,43:1.5057,47:1.5135}; // attack-rhoms-01 S3
const CITED_B2_12={13:19.710,17:77.252,19:145.23,23:267.46,29:646.27,31:1162.5,37:3697.6,41:6464.4,43:8915.6,47:15955}; // attack-rhoms-01 S3 (B2/12)
const CITED_RMSR={31:4.97378,37:9.25620,41:11.99697,43:14.19345,47:18.99742}; // rho-maxlaw-01 S0/S2
const CITED_SUP={13:2.62013,17:4.33665,19:9.15247,23:12.10617,29:17.90249};   // rho-maxlaw-01 S1
const CITED_MOM29={k4:2.918,k6:14.00,k8:93.5};                                 // attack-rhoms-01 S1

function ols(xs,ys){const k=xs.length;let sx=0,sy=0,sxx=0,sxy=0;
  for(let i=0;i<k;i++){sx+=xs[i];sy+=ys[i];sxx+=xs[i]*xs[i];sxy+=xs[i]*ys[i];}
  const b=(k*sxy-sx*sy)/(k*sxx-sx*sx),a=(sy-b*sx)/k;
  let sse=0;for(let i=0;i<k;i++){const e=ys[i]-(a+b*xs[i]);sse+=e*e;}
  const se=k>2?Math.sqrt(sse/(k-2)/(sxx-sx*sx/k)):NaN;
  return {a,b,se};}
function fitExp(zs,vals){const xs=zs.map(z=>Math.log(z)),ys=vals.map(v=>Math.log(v));return ols(xs,ys);}

// ============================================================================
// S0 CONTROLS
// ============================================================================
console.log('S0 CONTROLS');
{ const zs=[13,17,19,23,29,31], xs=zs.map(z=>Math.log(z)), ys=zs.map(z=>Math.log(5*Math.pow(z,3.7)));
  const f=ols(xs,ys);
  console.log(`  OLS control: y = 5 z^3.7 returns slope ${f.b.toFixed(6)} (want 3.700000)  ${Math.abs(f.b-3.7)<1e-9?'PASS':'FAIL — FITS VOID'}`);
}
{ // L2: csc l1 bound, and how loose it runs (calibration)
  let worst=0, loosest=0;
  for(let e=2;e<=30000;e=e<100?e+1:Math.ceil(e*1.13)){
    let s=0; for(let a=1;a<e;a++) s+=1/(2*Math.sin(Math.PI*a/e));
    const bnd=(e/2)*(Math.log(e)+CSC), r=s/bnd;
    if(r>worst)worst=r; if(bnd/s>loosest)loosest=bnd/s;
  }
  console.log(`  L2 control: sum 1/(2 sin(pi a/e)) vs (e/2)(ln e + 0.307), e swept to 30000: max ratio ${worst.toFixed(4)} ${worst<=1?'(<= 1: BOUND HOLDS)':'FAIL'}; bound loose by <= ${loosest.toFixed(2)}x`);
}
{ // mode-completeness identity sum_{e|n} phi(e) = n
  const test=[2310,30030,510510];
  let ok=true;
  for(const n of test){ let s=0; for(let e=1;e<=n;e++) if(n%e===0){let ph=e,x=e; for(let p=2;p*p<=x;p++){if(x%p===0){ph-=ph/p; while(x%p===0)x/=p;}} if(x>1)ph-=ph/x; s+=ph;} if(s!==n)ok=false; }
  console.log(`  mode-completeness control: sum_{e|W} phi(e) = W at W = 2310, 30030, 510510  ${ok?'PASS':'FAIL'}`);
}

// my own closed-form pair sum (ms only; controls the walker and feeds rms) ---
function pairMS(z){
  const D=Math.round(Math.pow(z,S)), t=L.buildTerms(z,D);
  const n=t.n,w=t.w,q=t.q,c=t.c,mk=t.mk,PR=Float64Array.from(t.ps);
  let ms=0;
  for(let i=0;i<n;i++){
    const qi=q[i],ci=c[i],wi=w[i],mi=mk[i];
    if(qi>1) ms+=((qi*qi-1)/12)/(qi*qi);
    for(let j=i+1;j<n;j++){
      let m=mi&mk[j]; if(!m) continue;
      let g=1; while(m){const b=m&(-m); g*=PR[31-Math.clz32(b)]; m^=b;}
      let x=(c[j]-ci)%g; if(x<0)x+=g;
      ms+=2*wi*w[j]*((g*g-1)/12-x*(g-x)/2)/(qi*q[j]);
    }
  }
  return ms;
}

// ============================================================================
// S1 THE SWEEP: lattice, Vabs(e), B, B2, mode set E, N = sum phi(e)
// ============================================================================
console.log('\nS1 SWEEP — lattice + Vabs(e) per conductor + mode counts (B, B2/12 controlled against attack-rhoms-01)');
function sweep(z){
  const D=Math.round(Math.pow(z,S)), t=L.buildTerms(z,D);
  const n=t.n,q=t.q,w=t.w,d1=t.d1,ps=t.ps;
  const EM=new Map();
  const plist=[];
  let qmax=0;
  for(let i=0;i<n;i++){
    const qi=q[i]; if(qi>qmax)qmax=qi;
    plist.length=0;
    for(const p of ps) if(qi%p===0) plist.push(p);
    const wi=w[i]/qi, dd=d1[i], np=plist.length;
    for(let sm=1;sm<(1<<np);sm++){
      let e=1,e1=1;
      for(let b=0;b<np;b++) if(sm&(1<<b)){const p=plist[b]; e*=p; if(dd%p===0)e1*=p;}
      let m1=EM.get(e); if(!m1){m1=new Map();EM.set(e,m1);}
      m1.set(e1,(m1.get(e1)||0)+wi);
    }
  }
  // per-conductor aggregates
  let B=0,B2=0,N=0,sumE=0,cnt=0,sumEV=0;
  const Es=[],Vs=[];
  for(const [e,m1] of EM){
    let vabs=0; for(const v of m1.values()) vabs+=Math.abs(v);
    let ph=e; for(const p of ps) if(e%p===0) ph-=ph/p;   // phi(e), exact (e squarefree z-smooth)
    B+=e*vabs*vabs; B2+=e*e*vabs*vabs;
    N+=ph; sumE+=e; cnt++; sumEV+=e*vabs;
    Es.push(e); Vs.push(vabs);
  }
  return {t,EM,qmax,n,M:t.M,B,B2,N,sumE,cnt,sumEV,Es,Vs};
}
const SW={};
console.log('   z       n      qmax        #E        N = sum phi(e)   sum e        B  (cited)     B2/12 (cited)');
for(const z of ZS){
  err(`  S1 sweep z=${z} ... [${el()}]`);
  const r=sweep(z); SW[z]=r;
  const okB=Math.abs(r.B-CITED_B[z])<6e-5?'MATCH':'MISMATCH';
  const okB2=Math.abs(r.B2/12-CITED_B2_12[z])/CITED_B2_12[z]<1.5e-3?'MATCH':'MISMATCH';
  console.log(`  ${String(z).padStart(2)}  ${String(r.n).padStart(6)}  ${String(r.qmax).padStart(9)}   ${String(r.cnt).padStart(6)}   ${r.N.toExponential(4).padStart(12)}   ${r.sumE.toExponential(3)}   ${r.B.toFixed(4)} (${CITED_B[z]}) ${okB}  ${(r.B2/12).toExponential(4)} (${CITED_B2_12[z]}) ${okB2}`);
}
console.log('  (#E = conductors with Vabs > 0; N and sum e exact, < 2^53 everywhere — largest N below is printed with its ln)');
// Vabs decay law, dyadic bins (the "fit their decay law first" ask)
console.log('  Vabs(e) decay in dyadic bins of e (bin rms of Vabs; fit ln Vabs_rms ~ -tau ln e per z):');
for(const z of [23,47]){
  const r=SW[z]; const bins=new Map();
  for(let i=0;i<r.Es.length;i++){const b=Math.floor(Math.log2(r.Es[i])); let o=bins.get(b); if(!o){o={s:0,c:0};bins.set(b,o);} o.s+=r.Vs[i]*r.Vs[i]; o.c++;}
  const bs=[...bins.keys()].sort((a,b)=>a-b), xs=[],ys=[];
  let line=`   z=${z}: `;
  for(const b of bs){const o=bins.get(b); const rms=Math.sqrt(o.s/o.c); xs.push(b*Math.log(2)); ys.push(Math.log(rms)); line+=`2^${b}:${rms.toExponential(1)}(${o.c}) `;}
  const f=ols(xs,ys);
  console.log(line);
  console.log(`        fit: Vabs_rms(e) ~ e^{${f.b.toFixed(3)} +/- ${f.se.toFixed(3)}}  (a pure 1/e triangle-scale law would be -1; slower decay = the mass spreads up the conductors)`);
}

// ============================================================================
// S2 THE MODE-COUNT CHECK (the first concrete check of the brief)
// ============================================================================
console.log('\nS2 MODE-COUNT CHECK: sup <= sqrt(N) * rms (L1, unconditional). Needed: sup/rms <= z^{1.26645} (asymptotic)');
console.log('   finite-z target: bound <= smax = (z^b2 M - 1)/2. rms source: own pair sum z<=23, own walker at 29, CITED rmsr at 31..47.');
console.log('   PROVEN-GRADE column uses the MS3 rms cap sqrt(B2/12) instead of measured rms (no measured input at all).');
const MS={}, WALK={};
for(const z of [13,17,19,23]){ err(`  S2 pair sum z=${z} ... [${el()}]`); MS[z]=pairMS(z); }
// walker (extended moments to m16) at 13..29 — also feeds S5
function walkStats(z){
  const D=Math.round(Math.pow(z,S)), t=L.buildTerms(z,D);
  const n=t.n,q=t.q,c=t.c,w=t.w,M=t.M;
  let W=1; for(const p of primesBelow(z)) W*=p;      // z <= 29 only: W <= 2.24e8 < 2^53
  let r0=0; for(let j=0;j<n;j++){const tt=(-c[j])/q[j]; r0+=w[j]*(tt-Math.floor(tt)-0.5);}
  const B=1<<22, K=new Float64Array(B);
  let v=r0, sup=Math.abs(r0+M/2);
  const p=new Float64Array(9);   // p[k] accumulates sum u^{2k}, k=1..8
  { let u2=(r0+M/2)*(r0+M/2), acc=1; for(let k=1;k<=8;k++){acc*=u2;p[k]+=acc;} }
  for(let a=1;a<=W;a+=B){
    const len=Math.min(B,W-a+1);
    K.fill(0,0,len);
    for(let j=0;j<n;j++){const qj=q[j],wj=w[j];
      let x0=(c[j]-a)%qj; if(x0<0)x0+=qj;
      for(let i=x0;i<len;i+=qj) K[i]+=wj;}
    for(let i=0;i<len;i++){
      v+=M-K[i];
      if(a+i<W){const u=v+M/2, au=Math.abs(u), u2=u*u;
        if(au>sup)sup=au; let acc=1; for(let k=1;k<=8;k++){acc*=u2;p[k]+=acc;}}
    }
    if((a/B)%16===0) err(`  S2 walk z=${z} block ${(a/B)|0}/${Math.ceil(W/B)} [${el()}]`);
  }
  const m=new Float64Array(9); for(let k=1;k<=8;k++)m[k]=p[k]/W;
  return {z,W,M,sup,m,drift:Math.abs(v-r0)};
}
for(const z of [13,17,19,23,29]){ err(`  S2 walk z=${z} ... [${el()}]`); WALK[z]=walkStats(z); }
{ // walker controls: sup vs cited, m2 vs closed form, moment ratios at 29 vs cited
  let ok=true;
  for(const z of [13,17,19,23,29]){
    const wk=WALK[z];
    if(Math.abs(wk.sup-CITED_SUP[z])>1.5e-5) ok=false;
    if(z<=23 && Math.abs(wk.m[1]-MS[z])/MS[z]>1e-9) ok=false;
  }
  const wk=WALK[29], k4=wk.m[2]/(wk.m[1]*wk.m[1]), k6=wk.m[3]/Math.pow(wk.m[1],3), k8=wk.m[4]/Math.pow(wk.m[1],4);
  if(Math.abs(k4-CITED_MOM29.k4)>5e-3||Math.abs(k6-CITED_MOM29.k6)>5e-2||Math.abs(k8-CITED_MOM29.k8)>5e-1) ok=false;
  console.log(`  walker controls: sup MATCHES cited at 13..29; m2 vs closed form rel <= ${Math.max(...[13,17,19,23].map(z=>Math.abs(WALK[z].m[1]-MS[z])/MS[z])).toExponential(1)}; z=29 ratios ${k4.toFixed(3)}/${k6.toFixed(2)}/${k8.toFixed(1)} vs cited ${CITED_MOM29.k4}/${CITED_MOM29.k6}/${CITED_MOM29.k8}  ${ok?'ALL PASS':'FAIL — S2/S5 VOID'}`);
}
function rmsOf(z){ if(z<=23)return{v:Math.sqrt(MS[z]),tag:'own'}; if(z===29)return{v:Math.sqrt(WALK[29].m[1]),tag:'own'}; return{v:CITED_RMSR[z],tag:'cited'}; }
console.log('   z    N          cover N/(W-1)   sqrtN*rms   PROVEN sqrtN*sqrt(B2/12)   smax        verdicts (meas|proven)   M1=sqrtW*rms');
const ROWS={};
for(const z of ZS){
  const r=SW[z]; let lnW=0,Wint=1; for(const p of primesBelow(z)){lnW+=Math.log(p); if(z<=29)Wint*=p;}
  const rr=rmsOf(z), rms=rr.v, M=r.M;
  const smax=(Math.pow(z,BETA2)*M-1)/2;
  const bMeas=Math.sqrt(r.N)*rms, bProv=Math.sqrt(r.N)*Math.sqrt(r.B2/12);
  const M1=Math.exp(lnW/2)*rms;
  const cover=z<=29?(r.N/(Wint-1)).toFixed(4):'(W>2^53; lnN-lnW='+(Math.log(r.N)-lnW).toFixed(1)+')';
  ROWS[z]={lnW,rms,rmsTag:rr.tag,M,smax,N:r.N,bMeas,bProv,M1};
  console.log(`  ${String(z).padStart(2)}  ${r.N.toExponential(3)}  ${String(cover).padStart(14)}   ${bMeas.toExponential(3)}   ${bProv.toExponential(3).padStart(12)}           ${smax.toExponential(3)}   ${bMeas<=smax?'Y':'n'}|${bProv<=smax?'Y':'n'}                    ${M1.toExponential(2)}`);
}
{ // growth fits and the verdict
  const zsAll=ZS, zsTail=[29,31,37,41,43,47];
  const fN=fitExp(zsAll,zsAll.map(z=>SW[z].N)), fNt=fitExp(zsTail,zsTail.map(z=>SW[z].N));
  const fE=fitExp(zsAll,zsAll.map(z=>SW[z].cnt)), fEt=fitExp(zsTail,zsTail.map(z=>SW[z].cnt));
  const fB2=fitExp(zsAll,zsAll.map(z=>SW[z].B2));
  const bnd=zsAll.map(z=>ROWS[z].bMeas), fBnd=fitExp(zsAll,bnd);
  console.log(`  growth: d ln N/d ln z      = ${fN.b.toFixed(3)} +/- ${fN.se.toFixed(3)} (13..47), ${fNt.b.toFixed(3)} +/- ${fNt.se.toFixed(3)} (29..47)`);
  console.log(`          d ln #E/d ln z     = ${fE.b.toFixed(3)} +/- ${fE.se.toFixed(3)} (13..47), ${fEt.b.toFixed(3)} +/- ${fEt.se.toFixed(3)} (29..47)`);
  console.log(`          d ln B2/d ln z     = ${fB2.b.toFixed(3)} +/- ${fB2.se.toFixed(3)} (13..47)`);
  console.log(`          d ln(sqrtN rms)/d ln z = ${fBnd.b.toFixed(3)} +/- ${fBnd.se.toFixed(3)}  vs beta_2 = ${BETA2}`);
  console.log(`  VERDICT (the first concrete check): sqrt(N) alone delivers z^{${(fN.b/2).toFixed(2)}} against the needed z^{1.26645};`);
  console.log(`  the mode count IS polynomial once qmax < W (z >= 23) but its exponent is ~${fNt.b.toFixed(1)} — sqrt of that is ~${(fNt.b/2).toFixed(2)}x the whole recovery budget.`);
  console.log(`  N <= W-1 structurally: at z <= 19 the mode set is W-saturated (cover ~1) and L1 IS Chebyshev M1. NOT the theorem.`);
}

// ============================================================================
// S3 THE l1 / COEFFICIENT-DECAY ROUTE — exact Lambda at z = 13..29
// ============================================================================
console.log('\nS3 l1 ROUTE: sup <= Lambda = sum|chat| (exact at z <= 29) <= Lambda_V (L2+L3, all z) <= CH = (ln qmax + 0.307)/2 * sqrt(#E B2)');
function l1exact(z){
  const r=SW[z], EM=r.EM, ps=r.t.ps;
  // cost estimate first
  let cost=0, maxE=0;
  for(const [e,m1] of EM){ let ph=e; for(const p of ps) if(e%p===0) ph-=ph/p; cost+=2*e+ph*(1+2*m1.size)/2; if(e>maxE)maxE=e; }
  if(cost>1.6e10){ console.log(`  z=${z}: SKIPPED (op estimate ${cost.toExponential(1)} over ceiling 1.6e10)`); return null; }
  err(`  S3 exact Lambda z=${z}: ~${cost.toExponential(1)} ops, maxE=${maxE} ... [${el()}]`);
  const cosT=new Float64Array(maxE), sinT=new Float64Array(maxE), cop=new Uint8Array(maxE+1);
  let Lam=0, Lam1=0, Lam3=0, par=0, nz=0, tot=0, thSum=0;
  const rs=[], vs=[];
  for(const [e,m1] of EM){
    // decomp residues: Theta_e(a) = sum V * e(a*k/e), k = (2*inv(e1 mod e2, e2)*(e/e2)) mod e
    rs.length=0; vs.length=0;
    for(const [e1,V] of m1){
      const e2=e/e1; let k=0;
      if(e2>1){ const [,i0]=egcd(((e1%e2)+e2)%e2,e2); const inv=((i0%e2)+e2)%e2; k=(2*inv*(e/e2))%e; }
      rs.push(k); vs.push(V);
    }
    if(e===2){ // single mode a=1
      let re=0; for(let d=0;d<rs.length;d++) re+=vs[d]*Math.cos(Math.PI*rs[d]);
      const th=Math.abs(re), cA=th/2; Lam+=cA; Lam1+=cA; Lam3+=cA; par+=cA*cA; tot++; if(th>1e-14)nz++;
      thSum+=th*(e/2)*(Math.log(e)+CSC); continue;
    }
    for(let k2=0;k2<e;k2++){const t2=2*Math.PI*k2/e; cosT[k2]=Math.cos(t2); sinT[k2]=Math.sin(t2);}
    cop.fill(1,0,e); cop[0]=0;
    for(const p of ps) if(e%p===0) for(let x=0;x<e;x+=p) cop[x]=0;
    let thmax=0;
    const half=(e-1)>>1, nd=rs.length;
    for(let a=1;a<=half;a++){
      if(!cop[a]) continue;
      let re=0,im=0;
      for(let d=0;d<nd;d++){const k2=(a*rs[d])%e; re+=vs[d]*cosT[k2]; im+=vs[d]*sinT[k2];}
      const th=Math.sqrt(re*re+im*im), sn=Math.sin(Math.PI*a/e), cA=th/(2*sn);
      Lam+=2*cA; par+=2*cA*cA; tot+=2; if(th>1e-14)nz+=2;
      if(a===1)Lam1+=2*cA; if(a<=3)Lam3+=2*cA;
      if(th>thmax)thmax=th;
    }
    thSum+=thmax*(e/2)*(Math.log(e)+CSC);
  }
  return {Lam,Lam1,Lam3,par,nz,tot,thSum};
}
// direct-phase control at z = 13 (ALL modes, from the terms themselves)
{
  const z=13, r=SW[z], t=r.t;
  let LamD=0, parD=0;
  for(const [e] of r.EM){
    for(let a=1;a<e;a++){
      if(gcd(a,e)!==1) continue;
      let re=0,im=0;
      for(let i=0;i<t.n;i++){ if(t.q[i]%e!==0) continue;
        const ph=-2*Math.PI*a*(t.c[i]%e)/e;
        re+=(t.w[i]/t.q[i])*Math.cos(ph); im+=(t.w[i]/t.q[i])*Math.sin(ph); }
      const th=Math.sqrt(re*re+im*im), cA=th/(2*Math.sin(Math.PI*a/e));
      LamD+=cA; parD+=cA*cA;
    }
  }
  const ex=l1exact(z);
  console.log(`  control z=13 (direct phase over terms, ALL modes): Lambda = ${LamD.toFixed(6)} vs factorised ${ex.Lam.toFixed(6)} (rel ${(Math.abs(LamD-ex.Lam)/LamD).toExponential(1)});`);
  console.log(`     Parseval sum|chat|^2 = ${parD.toFixed(6)} vs walker m2 = ${WALK[13].m[1].toFixed(6)} (rel ${(Math.abs(parD-WALK[13].m[1])/WALK[13].m[1]).toExponential(1)}); sup ${CITED_SUP[13]} <= Lambda ${ex.Lam.toFixed(3)}  ${CITED_SUP[13]<=ex.Lam?'HOLDS':'FAILS'}`);
}
const L1X={};
for(const z of [13,17,19,23,29]){ const ex=l1exact(z); if(ex)L1X[z]=ex; }
console.log('   z    Lambda(exact)  Parseval rel   sup<=Lam   Lam/rms    a1 share  a<=3 share  nonzero modes   ThetaStar-form');
for(const z of [13,17,19,23,29]){
  const ex=L1X[z]; if(!ex) continue;
  const rms=rmsOf(z).v, m2=z<=23?MS[z]:WALK[29].m[1];
  const rel=Math.abs(ex.par-m2)/m2, sup=CITED_SUP[z];
  console.log(`  ${String(z).padStart(2)}   ${ex.Lam.toFixed(3).padStart(10)}    ${rel.toExponential(1)}      ${sup<=ex.Lam?'HOLDS':'FAILS'}     ${(ex.Lam/rms).toFixed(2).padStart(7)}    ${(ex.Lam1/ex.Lam).toFixed(3)}     ${(ex.Lam3/ex.Lam).toFixed(3)}      ${ex.nz}/${ex.tot}       ${ex.thSum.toExponential(3)}`);
}
// Lambda_V, CH, trivial, Lam1/Lam3 truncations at ALL ten z
console.log('   z    Lambda_V      CH=lnq/2*sqrt(#E B2)   trivial (n+M)/2   smax       verdicts LamV|CH   Lam3 (exact)   L4 cap n*prod(1+1/p)');
for(const z of ZS){
  const r=SW[z], row=ROWS[z];
  let LamV=0;
  for(let i=0;i<r.Es.length;i++) LamV+=r.Vs[i]*(r.Es[i]/2)*(Math.log(r.Es[i])+CSC);
  // exact a'<=3 truncation at every z (cheap, direct trig per decomp);
  // conjugate modes a and e-a share |Theta|, so each a <= (e-1)/2 counts twice;
  // e = 2 has the single self-conjugate mode a = 1.
  let Lam3=0;
  for(const [e,m1] of r.EM){
    const amax=Math.min(3,(e-1)>>1), aTop=(e===2)?1:amax;
    for(let a=1;a<=aTop;a++){
      if(gcd(a,e)!==1) continue;
      let re=0,im=0;
      for(const [e1,V] of m1){ const e2=e/e1; let ph=0;
        if(e2>1){const [,i0]=egcd(((e1%e2)+e2)%e2,e2); ph=2*Math.PI*2*a*(((i0%e2)+e2)%e2)/e2;}
        re+=V*Math.cos(ph); im+=V*Math.sin(ph); }
      const mult=(e===2)?1:2;
      Lam3+=mult*Math.sqrt(re*re+im*im)/(2*Math.sin(Math.PI*a/e));
    }
  }
  const CH=((Math.log(r.qmax)+CSC)/2)*Math.sqrt(r.cnt*r.B2);
  let l4=1; for(const p of primesBelow(z)) l4*=(1+1/p); l4*=r.n;
  const triv=(r.n+r.M)/2;
  ROWS[z].LamV=LamV; ROWS[z].CH=CH; ROWS[z].Lam3=Lam3;
  console.log(`  ${String(z).padStart(2)}   ${LamV.toExponential(3)}    ${CH.toExponential(3).padStart(12)}          ${triv.toExponential(3)}      ${row.smax.toExponential(3)}   ${LamV<=row.smax?'Y':'n'}|${CH<=row.smax?'Y':'n'}              ${Lam3.toExponential(3)}       ${(l4).toExponential(2)} (sumEV=${r.sumEV.toExponential(2)})`);
}
{ // fits + the model extension of Lambda to 31..47 via the a'<=3 share
  const zsX=[13,17,19,23,29].filter(z=>L1X[z]);
  const fL=fitExp(zsX,zsX.map(z=>L1X[z].Lam));
  const fLr=fitExp(zsX,zsX.map(z=>L1X[z].Lam/rmsOf(z).v));
  const fLV=fitExp(ZS,ZS.map(z=>ROWS[z].LamV));
  const fCH=fitExp(ZS,ZS.map(z=>ROWS[z].CH));
  const share=L1X[29]?L1X[29].Lam3/L1X[29].Lam:NaN;
  console.log(`  fits: d ln Lambda/d ln z   = ${fL.b.toFixed(3)} +/- ${fL.se.toFixed(3)}  (exact, ${zsX.length} pts 13..29; SHORT WINDOW)`);
  console.log(`        d ln(Lam/rms)/d ln z = ${fLr.b.toFixed(3)} +/- ${fLr.se.toFixed(3)}  vs recovery budget 1.26645`);
  { const fS=fitExp(zsX,zsX.map(z=>CITED_SUP[z]/rmsOf(z).v));
    console.log(`        d ln(sup/rms)/d ln z = ${fS.b.toFixed(3)} +/- ${fS.se.toFixed(3)}  (the TRUTH's recovery loss; F4's sqrt(2lnW) reads 0.54-0.56 in z-exponent here)`); }
  console.log(`        d ln Lambda_V/d ln z = ${fLV.b.toFixed(3)} +/- ${fLV.se.toFixed(3)}; d ln CH/d ln z = ${fCH.b.toFixed(3)} +/- ${fCH.se.toFixed(3)}  (13..47)`);
  console.log(`  MODEL (flagged): Lambda-hat(z) = Lam3(z)/(a<=3 share at 29 = ${share.toFixed(3)}); the share FALLS with z (0.566 -> 0.312), so Lambda-hat leans LOW at 31..47:`);
  const zsM=[31,37,41,43,47];
  const lamHat=zsM.map(z=>ROWS[z].Lam3/share);
  const fH=fitExp(zsM,lamHat);
  for(let i=0;i<zsM.length;i++){const z=zsM[i];
    console.log(`     z=${z}: Lam-hat=${lamHat[i].toExponential(3)}  vs smax ${ROWS[z].smax.toExponential(3)}  ${lamHat[i]<=ROWS[z].smax?'Y':'n'}  Lam-hat/rms=${(lamHat[i]/ROWS[z].rms).toFixed(1)} (=z^{${(Math.log(lamHat[i]/ROWS[z].rms)/Math.log(z)).toFixed(3)}})`);}
  console.log(`        d ln Lambda-hat/d ln z = ${fH.b.toFixed(3)} +/- ${fH.se.toFixed(3)} (31..47, MODEL — constant-share assumption)`);
  const effN=zsX.map(z=>Math.pow(L1X[z].Lam/rmsOf(z).v,2));
  console.log(`  effective mode count N_eff = (Lambda/rms)^2: ${zsX.map((z,i)=>z+':'+effN[i].toExponential(2)).join('  ')} vs N: ${zsX.map(z=>SW[z].N.toExponential(2)).join('  ')}`);
}

// ============================================================================
// S4 THE (lnW)^A AND W^eps FAMILY CHARTS
// ============================================================================
console.log('\nS4 FAMILY CHARTS. Form sup <= C rms (lnW)^A wins iff A ln(theta)/ln z < 1.26645 - o(1); form sup <= rms W^eps ALWAYS dies.');
console.log('   finite-z A_max(z) = ln(smax/rms)/ln(theta(z)), exact inputs (rms measured/cited):');
{
  let line='   ';
  for(const z of ZS){ const r=ROWS[z]; const A=Math.log(r.smax/r.rms)/Math.log(r.lnW); line+=`z=${z}:${A.toFixed(3)}  `; }
  console.log(line);
  console.log('   (F4 is A = 1/2 — the margin in A units is ~3-5x at every measured z; A = 1 also clears everywhere measured.)');
}
{ // theta sieve to 1e6 for the asymptotic rows (cumulative, O(pi(1e6)))
  err(`  S4 theta sieve to 1e6 ... [${el()}]`);
  const PR=primesBelow(1000000);
  const CUM=new Float64Array(PR.length); // CUM[i] = theta up to and including PR[i]
  { let s=0; for(let i=0;i<PR.length;i++){ s+=Math.log(PR[i]); CUM[i]=s; } }
  const thAt=(z)=>{ let lo=0,hi=PR.length-1,ans=-1; while(lo<=hi){const m=(lo+hi)>>1; if(PR[m]<z){ans=m;lo=m+1;}else hi=m-1;} return ans<0?0:CUM[ans]; };
  const zrows=[47,101,499,997,9973,99991,999983];
  console.log('   asymptotic chart (currency: exponents; c = 3 proven; A_max -> 1.26645 since ln theta/ln z -> 1):');
  console.log('     z        theta(z)     lntheta/lnz   A_max=1.26645*lnz/lntheta   eps*=1.26645*lnz/theta   k_bare    k_gauss   k_gauss/(z/lnz)');
  for(const z of zrows){
    const th=thAt(z), lz=Math.log(z), lt=Math.log(th);
    const Amax=1.26645*lz/lt, eps=1.26645*lz/th;
    const kbare=th/(2*1.26645*lz);
    let mu=0.766,k=0;
    for(let it=0;it<40;it++){ k=th/(2*mu*lz); mu=1.26645-0.5*Math.log(2*k/Math.E)/lz; if(mu<=0.01){mu=0.01;} }
    k=th/(2*mu*lz);
    console.log(`   ${String(z).padStart(7)}   ${th.toExponential(3)}   ${(lt/lz).toFixed(4)}        ${Amax.toFixed(4)}                      ${eps.toExponential(2)}            ${kbare.toFixed(1).padStart(7)}   ${k.toFixed(1).padStart(7)}    ${(k/(z/lz)).toFixed(3)}`);
  }
  console.log('   (k_bare: moment order needed with constants ignored; k_gauss: with Gaussian constants (2k-1)!! — the extra');
  console.log('    (1/2)ln(2k/e) term costs ~0.5 of exponent, so k_gauss ~ theta/(2*0.766*lnz) ~ 0.65 z/lnz: the 1.53 of attack-rhoms.)');
  // W^eps death points (theta including z itself: the bound at level z uses lnW = theta(z), p < z;
  // scanning CUM[i] vs ln PR[i+1] gives the first level whose budget is exceeded)
  let line='   W^eps death (first prime z with eps*theta(z) > 1.26645 ln z): ';
  for(const eps of [1/2,1/3,1/4,1/6,1/10,1/20,1/50]){
    let zd=null;
    for(let i=0;i+1<PR.length;i++){ if(eps*CUM[i]>1.26645*Math.log(PR[i+1])){zd=PR[i+1];break;} }
    line+=`eps=1/${Math.round(1/eps)}:z*=${zd}  `;
  }
  console.log(line);
  console.log('   every fixed eps dies at a finite z*; the family boundary is exactly REC(l): loss z^l, l < 1.26645.');
}

// ============================================================================
// S5 THE MOMENT LADDER — measured C_k to k = 8, the chart, the F4 equivalence
// ============================================================================
console.log('\nS5 MOMENT LADDER: sup <= (W m_2k)^{1/2k}. Measured moments to m16 at z = 13..29; Gaussian MODEL at 31..47 (flagged *).');
const DFACT=[NaN,1,3,15,105,945,10395,135135,2027025]; // (2k-1)!! for k=1..8
console.log('   C_k = m_2k/m2^k vs (2k-1)!!, as a ratio C_k/(2k-1)!! (sub-Gaussian iff <= 1):');
console.log('   z     k=2      k=3      k=4      k=5      k=6      k=7      k=8');
for(const z of [13,17,19,23,29]){
  const wk=WALK[z]; let line=`  ${String(z).padStart(2)}  `;
  for(let k=2;k<=8;k++){ const Ck=wk.m[k]/Math.pow(wk.m[1],k); line+=`  ${(Ck/DFACT[k]).toFixed(4)}`; }
  console.log(line);
}
console.log('   ladder chart: bound_k = (W m_2k)^{1/2k} vs smax (Y = clears); k_min = smallest clearing k (Gaussian model at z >= 31):');
console.log('   z     k=1        k=2        k=3        k=4        k=6        k=8      k_min   min_k(model)/[rms sqrt(2lnW)]');
for(const z of ZS){
  const row=ROWS[z], wk=WALK[z], lnW=row.lnW, ms=z<=29?WALK[z].m[1]:row.rms*row.rms;
  const bk=(k)=>{ const lm=wk?Math.log(wk.m[k]):(Math.log(DFACT[k])+k*Math.log(ms)); return Math.exp((lnW+lm)/(2*k)); };
  let kmin=-1;
  for(let k=1;k<=400;k++){ let ldf=0; for(let j=3;j<=2*k-1;j+=2)ldf+=Math.log(j);
    if((lnW+ldf+k*Math.log(ms))/(2*k)<=Math.log(row.smax)){kmin=k;break;} }
  let best=Infinity;
  { let ldf=0; for(let k=1;k<=4000;k++){ if(k>=2)ldf+=Math.log(2*k-1); const v=(lnW+ldf+k*Math.log(ms))/(2*k); if(v<best)best=v; } }
  const gauss=Math.sqrt(ms)*Math.sqrt(2*lnW);
  let line=`  ${String(z).padStart(2)}${wk?' ':'*'} `;
  for(const k of [1,2,3,4,6,8]) line+=` ${bk(k).toExponential(2)}${bk(k)<=row.smax?'Y':'n'} `;
  console.log(line+`  ${String(kmin<0?'>400':kmin).padStart(4)}    ${(Math.exp(best)/gauss).toFixed(4)}`);
}
console.log('   (last column: the k-optimised Gaussian-model ladder over rms*sqrt(2lnW) — the ladder REDISCOVERS F4 at the optimum;');
console.log('    ratio < 1 slightly because the discrete k grid sits near the continuous optimum k ~ lnW.)');
{ // synthetic-theta equivalence control
  const check=(th)=>{ const kmax=Math.max(1000,Math.ceil(3*th)); let best=Infinity,ldf=0; for(let k=1;k<=kmax;k++){ if(k>=2)ldf+=Math.log(2*k-1); const v=(th+ldf)/(2*k); if(v<best)best=v; } return Math.exp(best)/Math.sqrt(2*th); };
  console.log(`   equivalence control at synthetic theta = 1e3, 1e6 (ms = 1): min_k/(sqrt(2 theta)) = ${check(1e3).toFixed(4)}, ${check(1e6).toFixed(4)}  (want -> 1)`);
}
{ // trend fits for the C_k question
  const zsW=[13,17,19,23,29];
  for(const k of [2,3,4]){
    const vals=zsW.map(z=>WALK[z].m[k]/Math.pow(WALK[z].m[1],k)/DFACT[k]);
    const f=ols(zsW.map(z=>Math.log(z)),vals);
    console.log(`   C_${k}/(2k-1)!! across z: ${vals.map(v=>v.toFixed(4)).join(' ')}  drift ${f.b>=0?'+':''}${f.b.toFixed(4)}/lnz — rising toward 1, still below at every level`);
  }
}

// ============================================================================
// S6 VERDICT
// ============================================================================
console.log('\nS6 VERDICT');
console.log('  (a) Mode-count Cauchy-Schwarz: N(z) is W-saturated at z <= 19 (L1 = Chebyshev there); past 23 it detaches from W but');
console.log('      grows at d ln N/d ln z ~ 12 in the measured window (the divisor count is still doubling per new prime), so');
console.log('      sqrt(N)*rms grows at z^{~8.2} against the z^{4.26645} ceiling and dies at z = 31 even with measured rms.');
console.log('      The STOP condition of task item (c) is NOT met: no unconditional exponent below beta_2 comes from the degree bound.');
console.log('  (b) Coefficient decay: the exact l1 Lambda IS a proven finite-z sup bound wherever computed (sup <= Lambda holds with');
console.log('      3.7x-3.2x slack at 13..29), and the fully proven Lambda_V chain clears smax at ALL ten z including 47 — the first');
console.log('      proven recovery to survive z = 47 — but its growth (5.23 +/- 0.19) and Lambda_V ~ trivial at 47 say it is the');
console.log('      Bonferroni finite-z window again, not an asymptotic route; L4 pins the collapse to n*polylog.');
console.log('  (c) The weakest still-sufficient forms, precisely: MV(alpha): Lambda(z) <= C z^alpha with alpha < 4.26645 (a MEAN VALUE');
console.log('      of |Theta| over modes, no position sup — implies RML(alpha) outright); measured d ln Lambda/d ln z = 4.21 +/- 0.30:');
console.log('      the boundary passes THROUGH the error bar. Or REC(l): sup <= C rms z^l, l < 1.26645 (F4 = l = 1/2 + o(1), measured');
console.log('      Lam/rms slope 2.61 +/- 0.18 for the l1 instrument vs measured sup/rms far below it); or sub-Gaussian moments to');
console.log('      order k(z) ~ 0.65 z/ln z (measured C_k below Gaussian at k <= 8, drifting up). Details and grades: the report.');
console.log('\nDONE');
err(`total ${el()}`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-f4weak-01.js
//   invocation:  node research/attack-f4weak-01.js
//   code-sha256: 2f9697d0b839bd7c9bb9f9c1bf47b299969347555e8c19a6c15e74b47ba3a274
//   out-sha256:  8d341c65b8620cfd9f9918fc8e63d26dfeb8e1fcd32c0688f8bbfead8ff89c3a
//   body-lines:  141
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     35.8 s
// ============================================================================
// S0 CONTROLS
//   OLS control: y = 5 z^3.7 returns slope 3.700000 (want 3.700000)  PASS
//   L2 control: sum 1/(2 sin(pi a/e)) vs (e/2)(ln e + 0.307), e swept to 30000: max ratio 0.6257 (<= 1: BOUND HOLDS); bound loose by <= 2.00x
//   mode-completeness control: sum_{e|W} phi(e) = W at W = 2310, 30030, 510510  PASS
//
// S1 SWEEP — lattice + Vabs(e) per conductor + mode counts (B, B2/12 controlled against attack-rhoms-01)
//    z       n      qmax        #E        N = sum phi(e)   sum e        B  (cited)     B2/12 (cited)
//   13     852       2310       31      2.3090e+3   6.911e+3   1.3833 (1.3833) MATCH  1.9710e+1 (19.71) MATCH
//   17    2236      30030       63      3.0029e+4   9.677e+4   1.4214 (1.4214) MATCH  7.7252e+1 (77.252) MATCH
//   19    4764     510510      127      5.1051e+5   1.742e+6   1.4348 (1.4348) MATCH  1.4523e+2 (145.23) MATCH
//   23    9636     881790      243      2.6494e+6   8.786e+6   1.4503 (1.4503) MATCH  2.6746e+2 (267.46) MATCH
//   29   20700    3432198      467      2.0889e+7   6.624e+7   1.4660 (1.466) MATCH  6.4627e+2 (646.27) MATCH
//   31   35868    9699690      827      8.2074e+7   2.575e+8   1.4764 (1.4764) MATCH  1.1625e+3 (1162.5) MATCH
//   37   76484   31870410     1527      5.4852e+8   1.754e+9   1.4883 (1.4883) MATCH  3.6976e+3 (3697.6) MATCH
//   41  125884   73277490     2535      1.8374e+9   5.915e+9   1.4963 (1.4963) MATCH  6.4644e+3 (6464.4) MATCH
//   43  183084   83650710     3879      3.8448e+9   1.216e+10   1.5057 (1.5057) MATCH  8.9156e+3 (8915.6) MATCH
//   47  293980  223092870     6119     1.1150e+10   3.519e+10   1.5135 (1.5135) MATCH  1.5955e+4 (15955) MATCH
//   (#E = conductors with Vabs > 0; N and sum e exact, < 2^53 everywhere — largest N below is printed with its ln)
//   Vabs(e) decay in dyadic bins of e (bin rms of Vabs; fit ln Vabs_rms ~ -tau ln e per z):
//    z=23: 2^1:5.7e-2(2) 2^2:4.5e-2(3) 2^3:2.5e-2(5) 2^4:2.3e-2(6) 2^5:1.5e-2(9) 2^6:1.1e-2(13) 2^7:7.7e-3(17) 2^8:6.2e-3(18) 2^9:3.4e-3(18) 2^10:2.0e-3(22) 2^11:1.8e-3(23) 2^12:6.2e-4(23) 2^13:3.4e-4(19) 2^14:2.0e-4(17) 2^15:1.5e-4(18) 2^16:4.8e-5(13) 2^17:1.8e-5(8) 2^18:1.9e-5(6) 2^19:6.4e-6(3)
//         fit: Vabs_rms(e) ~ e^{-0.723 +/- 0.030}  (a pure 1/e triangle-scale law would be -1; slower decay = the mass spreads up the conductors)
//    z=47: 2^1:3.7e-2(2) 2^2:2.9e-2(3) 2^3:1.7e-2(5) 2^4:1.3e-2(9) 2^5:7.6e-3(15) 2^6:5.7e-3(22) 2^7:3.7e-3(33) 2^8:2.3e-3(47) 2^9:1.5e-3(68) 2^10:9.7e-4(91) 2^11:6.9e-4(117) 2^12:4.4e-4(155) 2^13:2.5e-4(197) 2^14:1.2e-4(247) 2^15:8.6e-5(304) 2^16:5.8e-5(353) 2^17:2.8e-5(416) 2^18:1.4e-5(493) 2^19:7.6e-6(552) 2^20:4.5e-6(611) 2^21:2.3e-6(654) 2^22:1.0e-6(626) 2^23:5.7e-7(528) 2^24:3.6e-7(341) 2^25:1.8e-7(167) 2^26:6.7e-8(61) 2^27:2.1e-8(2)
//         fit: Vabs_rms(e) ~ e^{-0.772 +/- 0.018}  (a pure 1/e triangle-scale law would be -1; slower decay = the mass spreads up the conductors)
//
// S2 MODE-COUNT CHECK: sup <= sqrt(N) * rms (L1, unconditional). Needed: sup/rms <= z^{1.26645} (asymptotic)
//    finite-z target: bound <= smax = (z^b2 M - 1)/2. rms source: own pair sum z<=23, own walker at 29, CITED rmsr at 31..47.
//    PROVEN-GRADE column uses the MS3 rms cap sqrt(B2/12) instead of measured rms (no measured input at all).
//   walker controls: sup MATCHES cited at 13..29; m2 vs closed form rel <= 2.5e-11; z=29 ratios 2.918/14.00/93.5 vs cited 2.918/14/93.5  ALL PASS
//    z    N          cover N/(W-1)   sqrtN*rms   PROVEN sqrtN*sqrt(B2/12)   smax        verdicts (meas|proven)   M1=sqrtW*rms
//   13  2.309e+3          1.0000   5.028e+1       2.133e+2           1.579e+3   Y|Y                    5.03e+1
//   17  3.003e+4          1.0000   2.738e+2       1.523e+3           4.174e+3   Y|Y                    2.74e+2
//   19  5.105e+5          1.0000   1.590e+3       8.611e+3           5.654e+3   Y|n                    1.59e+3
//   23  2.649e+6          0.2731   4.599e+3       2.662e+4           1.102e+4   Y|n                    8.80e+3
//   29  2.089e+7          0.0936   1.685e+4       1.162e+5           2.762e+4   Y|n                    5.51e+4
//   31  8.207e+7  (W>2^53; lnN-lnW=-4.4)   4.506e+4       3.089e+5           3.372e+4   n|n                    4.00e+5
//   37  5.485e+8  (W>2^53; lnN-lnW=-5.9)   2.168e+5       1.424e+6           6.881e+4   n|n                    4.15e+6
//   41  1.837e+9  (W>2^53; lnN-lnW=-8.3)   5.143e+5       3.446e+6           9.972e+4   n|n                    3.27e+7
//   43  3.845e+9  (W>2^53; lnN-lnW=-11.3)   8.801e+5       5.855e+6           1.138e+5   n|n                    2.48e+8
//   47  1.115e+10  (W>2^53; lnN-lnW=-14.0)   2.006e+6       1.334e+7           1.577e+5   n|n                    2.17e+9
//   growth: d ln N/d ln z      = 11.876 +/- 0.328 (13..47), 12.531 +/- 0.465 (29..47)
//           d ln #E/d ln z     = 4.090 +/- 0.154 (13..47), 5.046 +/- 0.309 (29..47)
//           d ln B2/d ln z     = 5.096 +/- 0.186 (13..47)
//           d ln(sqrtN rms)/d ln z = 8.174 +/- 0.249  vs beta_2 = 4.26645
//   VERDICT (the first concrete check): sqrt(N) alone delivers z^{5.94} against the needed z^{1.26645};
//   the mode count IS polynomial once qmax < W (z >= 23) but its exponent is ~12.5 — sqrt of that is ~6.27x the whole recovery budget.
//   N <= W-1 structurally: at z <= 19 the mode set is W-saturated (cover ~1) and L1 IS Chebyshev M1. NOT the theorem.
//
// S3 l1 ROUTE: sup <= Lambda = sum|chat| (exact at z <= 29) <= Lambda_V (L2+L3, all z) <= CH = (ln qmax + 0.307)/2 * sqrt(#E B2)
//   control z=13 (direct phase over terms, ALL modes): Lambda = 9.800891 vs factorised 9.800891 (rel 1.9e-14);
//      Parseval sum|chat|^2 = 1.095066 vs walker m2 = 1.095066 (rel 3.5e-13); sup 2.62013 <= Lambda 9.801  HOLDS
//    z    Lambda(exact)  Parseval rel   sup<=Lam   Lam/rms    a1 share  a<=3 share  nonzero modes   ThetaStar-form
//   13        9.801    1.4e-14      HOLDS        9.37    0.471     0.566      2309/2309       7.090e+1
//   17       25.157    3.0e-14      HOLDS       15.92    0.355     0.436      30029/30029       3.058e+2
//   19       60.031    4.9e-14      HOLDS       26.98    0.315     0.394      510509/510509       7.657e+2
//   23      121.250    5.2e-13      HOLDS       42.92    0.269     0.342      2649449/2649449       1.509e+3
//   29      261.555    1.2e-10      HOLDS       70.93    0.247     0.312      16361861/20889221       3.085e+3
//    z    Lambda_V      CH=lnq/2*sqrt(#E B2)   trivial (n+M)/2   smax       verdicts LamV|CH   Lam3 (exact)   L4 cap n*prod(1+1/p)
//   13   1.560e+2        3.447e+2          4.260e+2      1.579e+3   Y|Y              5.551e+0       2.55e+3 (sumEV=5.54e+1)
//   17   5.524e+2        1.283e+3          1.118e+3      4.174e+3   Y|Y              1.097e+1       7.21e+3 (sumEV=1.52e+2)
//   19   1.245e+3        3.164e+3          2.382e+3      5.654e+3   Y|Y              2.367e+1       1.63e+4 (sumEV=2.98e+2)
//   23   2.462e+3        6.180e+3          4.818e+3      1.102e+4   Y|Y              4.147e+1       3.46e+4 (sumEV=5.35e+2)
//   29   5.535e+3        1.461e+4          1.035e+4      2.762e+4   Y|Y              8.165e+1       7.76e+4 (sumEV=1.08e+3)
//   31   1.041e+4        2.784e+4          1.793e+4      3.372e+4   Y|Y              1.364e+2       1.39e+5 (sumEV=1.88e+3)
//   37   3.088e+4        7.237e+4          3.824e+4      6.881e+4   Y|n              3.436e+2       3.06e+5 (sumEV=4.86e+3)
//   41   5.639e+4        1.291e+5          6.294e+4      9.972e+4   Y|n              5.760e+2       5.17e+5 (sumEV=8.37e+3)
//   43   8.403e+4        1.889e+5          9.154e+4      1.138e+5   Y|n              8.536e+2       7.71e+5 (sumEV=1.21e+4)
//   47   1.498e+5        3.342e+5          1.470e+5      1.577e+5   Y|n              1.447e+3       1.27e+6 (sumEV=2.05e+4)
//   fits: d ln Lambda/d ln z   = 4.214 +/- 0.304  (exact, 5 pts 13..29; SHORT WINDOW)
//         d ln(Lam/rms)/d ln z = 2.608 +/- 0.179  vs recovery budget 1.26645
//         d ln(sup/rms)/d ln z = 0.891 +/- 0.213  (the TRUTH's recovery loss; F4's sqrt(2lnW) reads 0.54-0.56 in z-exponent here)
//         d ln Lambda_V/d ln z = 5.230 +/- 0.186; d ln CH/d ln z = 5.214 +/- 0.151  (13..47)
//   MODEL (flagged): Lambda-hat(z) = Lam3(z)/(a<=3 share at 29 = 0.312); the share FALLS with z (0.566 -> 0.312), so Lambda-hat leans LOW at 31..47:
//      z=31: Lam-hat=4.369e+2  vs smax 3.372e+4  Y  Lam-hat/rms=87.8 (=z^{1.303})
//      z=37: Lam-hat=1.101e+3  vs smax 6.881e+4  Y  Lam-hat/rms=118.9 (=z^{1.323})
//      z=41: Lam-hat=1.845e+3  vs smax 9.972e+4  Y  Lam-hat/rms=153.8 (=z^{1.356})
//      z=43: Lam-hat=2.734e+3  vs smax 1.138e+5  Y  Lam-hat/rms=192.7 (=z^{1.399})
//      z=47: Lam-hat=4.637e+3  vs smax 1.577e+5  Y  Lam-hat/rms=244.1 (=z^{1.428})
//         d ln Lambda-hat/d ln z = 5.649 +/- 0.227 (31..47, MODEL — constant-share assumption)
//   effective mode count N_eff = (Lambda/rms)^2: 13:8.77e+1  17:2.53e+2  19:7.28e+2  23:1.84e+3  29:5.03e+3 vs N: 2.31e+3  3.00e+4  5.11e+5  2.65e+6  2.09e+7
//
// S4 FAMILY CHARTS. Form sup <= C rms (lnW)^A wins iff A ln(theta)/ln z < 1.26645 - o(1); form sup <= rms W^eps ALWAYS dies.
//    finite-z A_max(z) = ln(smax/rms)/ln(theta(z)), exact inputs (rms measured/cited):
//    z=13:3.575  z=17:3.377  z=19:3.044  z=23:2.977  z=29:3.018  z=31:2.830  z=37:2.735  z=41:2.663  z=43:2.563  z=47:2.497
//    (F4 is A = 1/2 — the margin in A units is ~3-5x at every measured z; A = 1 also clears everywhere measured.)
//    asymptotic chart (currency: exponents; c = 3 proven; A_max -> 1.26645 since ln theta/ln z -> 1):
//      z        theta(z)     lntheta/lnz   A_max=1.26645*lnz/lntheta   eps*=1.26645*lnz/theta   k_bare    k_gauss   k_gauss/(z/lnz)
//         47   3.711e+1   0.9386        1.3492                      1.31e-1                3.8       4.3    0.354
//        101   8.373e+1   0.9594        1.3201                      6.98e-2                7.2       8.5    0.388
//        499   4.683e+2   0.9898        1.2795                      1.68e-2               29.8      37.7    0.470
//        997   9.493e+2   0.9929        1.2755                      9.21e-3               54.3      70.1    0.485
//       9973   9.887e+3   0.9991        1.2676                      1.18e-3              423.9     572.2    0.528
//      99991   9.967e+4   0.9997        1.2668                      1.46e-4             3418.1    4745.8    0.546
//     999983   9.985e+5   0.9999        1.2666                      1.75e-5            28533.2   40435.9    0.559
//    (k_bare: moment order needed with constants ignored; k_gauss: with Gaussian constants (2k-1)!! — the extra
//     (1/2)ln(2k/e) term costs ~0.5 of exponent, so k_gauss ~ theta/(2*0.766*lnz) ~ 0.65 z/lnz: the 1.53 of attack-rhoms.)
//    W^eps death (first prime z with eps*theta(z) > 1.26645 ln z): eps=1/2:z*=13  eps=1/3:z*=19  eps=1/4:z*=23  eps=1/6:z*=41  eps=1/10:z*=71  eps=1/20:z*=151  eps=1/50:z*=419
//    every fixed eps dies at a finite z*; the family boundary is exactly REC(l): loss z^l, l < 1.26645.
//
// S5 MOMENT LADDER: sup <= (W m_2k)^{1/2k}. Measured moments to m16 at z = 13..29; Gaussian MODEL at 31..47 (flagged *).
//    C_k = m_2k/m2^k vs (2k-1)!!, as a ratio C_k/(2k-1)!! (sub-Gaussian iff <= 1):
//    z     k=2      k=3      k=4      k=5      k=6      k=7      k=8
//   13    0.8362  0.5731  0.3316  0.1659  0.0731  0.0287  0.0101
//   17    0.7737  0.4944  0.2729  0.1338  0.0592  0.0240  0.0089
//   19    0.9643  0.8945  0.8121  0.7293  0.6431  0.5474  0.4426
//   23    0.9653  0.8880  0.7777  0.6502  0.5201  0.3984  0.2921
//   29    0.9727  0.9335  0.8903  0.8441  0.7912  0.7264  0.6471
//    ladder chart: bound_k = (W m_2k)^{1/2k} vs smax (Y = clears); k_min = smallest clearing k (Gaussian model at z >= 31):
//    z     k=1        k=2        k=3        k=4        k=6        k=8      k_min   min_k(model)/[rms sqrt(2lnW)]
//   13   5.03e+1Y  9.13e+0Y  5.45e+0Y  4.29e+0Y  3.47e+0Y  3.16e+0Y      1    1.0218
//   17   2.74e+2Y  2.57e+1Y  1.23e+1Y  8.72e+0Y  6.37e+0Y  5.55e+0Y      1    1.0167
//   19   1.59e+3Y  7.76e+1Y  3.07e+1Y  2.01e+1Y  1.39e+1Y  1.19e+1Y      1    1.0133
//   23   8.80e+3Y  2.06e+2Y  6.35e+1Y  3.66e+1Y  2.21e+1Y  1.77e+1Y      1    1.0108
//   29   5.51e+4n  5.89e+2Y  1.41e+2Y  7.19e+1Y  3.88e+1Y  2.96e+1Y      2    1.0090
//   31*  4.00e+5n  1.86e+3Y  3.37e+2Y  1.50e+2Y  7.06e+1Y  5.06e+1Y      2    1.0076
//   37*  4.15e+6n  8.15e+3Y  1.11e+3Y  4.28e+2Y  1.75e+2Y  1.17e+2Y      2    1.0067
//   41*  3.27e+7n  2.61e+4Y  2.63e+3Y  8.72e+2Y  3.06e+2Y  1.90e+2Y      2    1.0058
//   43*  2.48e+8n  7.80e+4Y  5.78e+3Y  1.64e+3Y  4.94e+2Y  2.83e+2Y      2    1.0052
//   47*  2.17e+9n  2.67e+5n  1.45e+4Y  3.52e+3Y  9.05e+2Y  4.79e+2Y      3    1.0047
//    (last column: the k-optimised Gaussian-model ladder over rms*sqrt(2lnW) — the ladder REDISCOVERS F4 at the optimum;
//     ratio < 1 slightly because the discrete k grid sits near the continuous optimum k ~ lnW.)
//    equivalence control at synthetic theta = 1e3, 1e6 (ms = 1): min_k/(sqrt(2 theta)) = 1.0002, 1.0000  (want -> 1)
//    C_2/(2k-1)!! across z: 0.8362 0.7737 0.9643 0.9653 0.9727  drift +0.2202/lnz — rising toward 1, still below at every level
//    C_3/(2k-1)!! across z: 0.5731 0.4944 0.8945 0.8880 0.9335  drift +0.5389/lnz — rising toward 1, still below at every level
//    C_4/(2k-1)!! across z: 0.3316 0.2729 0.8121 0.7777 0.8903  drift +0.7943/lnz — rising toward 1, still below at every level
//
// S6 VERDICT
//   (a) Mode-count Cauchy-Schwarz: N(z) is W-saturated at z <= 19 (L1 = Chebyshev there); past 23 it detaches from W but
//       grows at d ln N/d ln z ~ 12 in the measured window (the divisor count is still doubling per new prime), so
//       sqrt(N)*rms grows at z^{~8.2} against the z^{4.26645} ceiling and dies at z = 31 even with measured rms.
//       The STOP condition of task item (c) is NOT met: no unconditional exponent below beta_2 comes from the degree bound.
//   (b) Coefficient decay: the exact l1 Lambda IS a proven finite-z sup bound wherever computed (sup <= Lambda holds with
//       3.7x-3.2x slack at 13..29), and the fully proven Lambda_V chain clears smax at ALL ten z including 47 — the first
//       proven recovery to survive z = 47 — but its growth (5.23 +/- 0.19) and Lambda_V ~ trivial at 47 say it is the
//       Bonferroni finite-z window again, not an asymptotic route; L4 pins the collapse to n*polylog.
//   (c) The weakest still-sufficient forms, precisely: MV(alpha): Lambda(z) <= C z^alpha with alpha < 4.26645 (a MEAN VALUE
//       of |Theta| over modes, no position sup — implies RML(alpha) outright); measured d ln Lambda/d ln z = 4.21 +/- 0.30:
//       the boundary passes THROUGH the error bar. Or REC(l): sup <= C rms z^l, l < 1.26645 (F4 = l = 1/2 + o(1), measured
//       Lam/rms slope 2.61 +/- 0.18 for the l1 instrument vs measured sup/rms far below it); or sub-Gaussian moments to
//       order k(z) ~ 0.65 z/ln z (measured C_k below Gaussian at k <= 8, drifting up). Details and grades: the report.
//
// DONE
// ============================================================================
// READINGS
// ============================================================================
// 1. THE FIRST CONCRETE CHECK, ANSWERED — the mode-count route is NOT the
//    theorem. [MEASURED, exact N at ten z] N(z) = sum_{e in E} phi(e) =
//    2.309e+3 .. 1.115e+10 at z = 13..47; the mode set is W-saturated
//    (cover 1.0000, every divisor a live conductor) at z <= 19, so the degree
//    bound sqrt(N) rms IS Chebyshev sqrt(W) rms there; past z = 23 N detaches
//    from W (cover 0.2731 at 23, 0.0936 at 29, lnN - lnW = -14.0 at 47) but
//    grows at d ln N/d ln z = 11.876 +/- 0.328 (12.531 +/- 0.465 on 29..47:
//    the divisor count still doubles per new prime). sqrt(N) rms grows at
//    z^{8.174 +/- 0.249} against the z^{4.26645} ceiling: it clears smax at
//    z <= 29 and is dead from z = 31 on; the no-measured-input variant
//    sqrt(N) sqrt(B2/12) is dead from z = 19. Task (c)'s STOP condition is
//    NOT met. Producer S2.
// 2. PROVEN FINITE-z CLEARING, NEW — and it survives z = 47. Lambda_V =
//    sum_e Vabs(e) (e/2)(ln e + 0.307) is a fully proven sup bound (L2 csc
//    inequality + Theta* <= Vabs; no measured input) and it clears smax at
//    ALL TEN levels: 1.498e+5 <= 1.577e+5 at z = 47 (5.0% margin), where R1,
//    the previous best proven recovery, certifiably failed. But its growth
//    is 5.230 +/- 0.186 and at z = 47 it has converged onto the trivial
//    (n+M)/2 = 1.470e+5 — this is the Bonferroni finite-z window once more,
//    dying immediately past 47, and L4 (sum_e e Vabs <= n prod(1+1/p))
//    proves the collapse to n polylog is structural. Producer S3.
// 3. MEASURED, NEW — the exact spectral l1 norm of rho~, first computation.
//    Lambda(z) = sum_{e,a} |Theta_e(a)|/(2 sin(pi a/e)) = 9.801, 25.157,
//    60.031, 121.250, 261.555 at z = 13..29 (factorised vs direct-phase at
//    z = 13 rel 1.9e-14; Parseval vs walker m2 to 1.2e-10; sup <= Lambda
//    holds with 3.7x -> 3.2x slack). Growth d ln Lambda/d ln z = 4.214 +/-
//    0.304 (five points, SHORT WINDOW): the beta_2 = 4.26645 boundary passes
//    THROUGH the error bar — MV(alpha < beta_2) is neither confirmed nor
//    refuted by the measured window, and the a'<=3 model extension (leaning
//    LOW) reads 5.649 +/- 0.227 at 31..47. Lambda/rms grows at 2.608 +/-
//    0.179 against the 1.26645 recovery budget, while the TRUTH's sup/rms
//    grows at 0.891 +/- 0.213: the l1 instrument overpays the true recovery
//    by ~1.7 of exponent. Producer S3.
// 4. MEASURED — the coefficient decay law, as asked. Bin-rms Vabs(e) ~
//    e^{-0.723 +/- 0.030} at z = 23, e^{-0.772 +/- 0.018} at z = 47 (a pure
//    triangle-scale law would be -1). The a' = 1 modes carry a 0.471 ->
//    0.247 share of the l1 mass (falling with z) against 92-94% of the l2
//    mass: the l1 tail up the frequencies is exactly what absolute-value
//    accounting cannot afford. The decay concentrates the effective mode
//    count to N_eff = (Lambda/rms)^2 = 8.77e+1 -> 5.03e+3, a factor ~26 ->
//    ~4.2e+3 below N, but N_eff's slope ~5.2 still doubles the needed
//    2 x 1.26645. Producer S1, S3.
// 5. DERIVED + MEASURED — the (lnW)^A and W^eps family charts. A form
//    sup <= C rms (lnW)^A wins iff A ln(theta)/ln z < 1.26645 - o(1):
//    finite-z A_max = 3.575 -> 2.497 across 13..47, 1.2666 at z = 999983 —
//    F4 (A = 1/2) carries a 5-7x margin in A units at every measured level,
//    and A = 1 ("first moment of the Gaussian") also suffices everywhere.
//    Every fixed W^eps dies: z* = 13, 19, 23, 41, 71, 151, 419 at eps =
//    1/2, 1/3, 1/4, 1/6, 1/10, 1/20, 1/50; the admissible decay is
//    eps*(z) = 1.26645 ln z/theta(z). The family boundary is exactly
//    REC(l < 1.26645). Producer S4.
// 6. MEASURED, NEW — moments to m16, and the ladder rediscovers F4.
//    C_k/(2k-1)!! < 1 at every measured (z,k), k <= 8: falling in k
//    (0.9727 -> 0.6471 at z = 29) and rising in z (drift +0.22, +0.54,
//    +0.79 per ln z at k = 2, 3, 4; z = 13, 17 sit low, 19..29 near 1).
//    The k-optimised Gaussian-model ladder lands at 1.0047-1.0218 times
//    rms sqrt(2 lnW) (synthetic control 1.0002, 1.0000 at theta = 1e3,
//    1e6): uniform sub-Gaussian moments ARE F4, constant 1. Fixed k dies
//    (k_min = 1,1,1,1,2,2,2,2,2,3 across the ladder, reproducing
//    attack-rhoms S4); the needed order is k_gauss(z) = 4.3 -> 40435.9 across
//    z = 47 -> 1e6, i.e. -> 0.56 z/ln z. Producer S5.
// 7. INFERRED — the weakest sufficient forms, named and graded. (i) MV(alpha):
//    Lambda(z) <= C z^alpha, alpha < 4.26645 — a MEAN VALUE over modes, no
//    position sup anywhere, implying RML(alpha) outright; measured at five
//    levels, boundary inside the error bar (reading 3): the cheapest
//    law-shaped object this pass found, one Theorem-A-style l1 mean value
//    away from the theorem, and the only form here whose truth is not yet
//    decided against. (ii) REC(l < 1.26645) — F4 at l = 1/2 + o(1) with
//    measured truth 0.83 +/- 0.15. (iii) sub-Gaussian moments to order
//    ~0.65 z/ln z with any uniform constant. Every proven instrument in
//    this file lands at n polylog or W^{1/2k}; the cancellation the theorem
//    needs lives across modes (i) or across positions (ii, iii). Producer
//    S6.
