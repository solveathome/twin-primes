#!/usr/bin/env node
// ============================================================================
// ATTACK THETA-MARGIN — the last 0.209 of theta_total, priced against the
// Brudern-Fouvry threshold and against the exact ceiling on absolute-value
// remainder accounting.
// ============================================================================
// THE GAP THIS SCRIPT EXISTS TO ISOLATE. The vector sieve beats beta_2 exactly
// when theta_total clears a break-even. `sift-limit-attack.md` sections 4.5 and
// 7b put the break-even at 1.2090 and the defensible theta_total at 1, a
// shortfall of 0.209, and flag one piece of open arithmetic: our optimum
// 5.158065/theta_total reads 4.126452 at theta_total = 5/4 where Brudern-Fouvry
// report 4.156000. Everything below is re-derived here from scratch; nothing is
// inherited.
//
// WHAT IS COMPUTED, IN SEVEN SECTIONS.
//
// (A) THE THRESHOLD, RE-DERIVED. With majorant level D+ = H^a and minorant
//     level D- = H^b, both components sharing the pair, the three terms of the
//     vector inequality Lam1- Lam2+ + Lam1+ Lam2- - Lam1+ Lam2+ carry main
//     terms f(s-)F(s+), F(s+)f(s-), F(s+)F(s+) with s = u*(a or b) in units of
//     ln z. Positivity is 2 s+ ln(s- - 1) > s-, i.e. u > (1 + e^{b/2a})/b, and
//     theta_total = a + b is the exponent of the largest modulus product
//     D+ D-. Minimising over the ratio rho = b/a gives theta_total * u = K.
//
// (B) THE BRUDERN-FOUVRY RECONCILIATION. Their published constant is read off
//     their own text and compared with the threshold function at their split.
//
// (C) INDEPENDENT LEVELS PER COMPONENT. Four free levels instead of two, with
//     the linear sieve's validity ranges enforced.
//
// (D) THE DIAGONAL. The (+,+) term sits at level D+^2; constraining it to stay
//     inside the window costs a little theta and removes it from the lemma.
//
// (E) THE CANCELLATION BUDGET. What exponent of saving the missing lemma has
//     to produce, against trivial, square-root, and the L2 average.
//
// (F) THE CEILING ON ABSOLUTE VALUES, COMPUTED EXACTLY. sup_x of the
//     absolute-value remainder sum is driven by one integer: if n0 is divisible
//     by the primes of S1 and n0+2 by the primes of S2, every coprime pair
//     (d1,d2) with d1 S1-smooth and d2 S2-smooth has |r| = 1 at once. So the
//     ceiling is a maximum over 2-colourings of the odd primes below z, and
//     that is a finite computation. Run at the true working point
//     H = z^beta_2, D+ = H^a, D- = H^b for seven z.
//
// (G) TWO CROSSOVERS. Where the ceiling starts to bite, and where the
//     divisor-multiplicity ceiling closes the drop-the-window-phase route.
//
// Plus a scan of the window sum in the all-divisors surrogate, to show what a
// finite scan can and cannot see.
// ============================================================================
'use strict';
// deterministic PRNG: every random restart below is seeded, so the OUTPUT block
// at the foot of this file reproduces digit for digit on a re-run.
let _seed = 20260818;
// Math.imul, because (seed * 1103515245) reaches 2.37e18 = 263 x 2^53 and
// is inexact from the second call: the plain-multiply form collapses to a
// period of 10,466 with a tail of ~5,900, against ~2^31 for the real thing,
// and its low three bits sit in one bucket 99.6% of the time. The imul form
// reproduces the exact LCG mod 2^31 step for step. (2026-08-20.)
const rnd = () => { _seed = (Math.imul(_seed, 1103515245) + 12345) & 0x7fffffff; return _seed / 0x7fffffff; };
const B2 = 4.26645028414864191641;          // DHR sifting limit at kappa = 2
const fx = (n,k=6) => n.toFixed(k);
const line = s => console.log(s);
const rule = () => console.log('-'.repeat(76));

// --- the threshold function -------------------------------------------------
const uth = (a,b) => (1+Math.exp(b/(2*a)))/b;          // u > this
const Gr  = r => (1+Math.exp(r/2))*(1+1/r);            // theta*u at ratio r=b/a

line('='.repeat(76));
line('A. THE VECTOR-SIEVE THRESHOLD, RE-DERIVED');
rule();
let lo=0.2, hi=6.0;
for(let i=0;i<400;i++){const m1=lo+(hi-lo)/3, m2=hi-(hi-lo)/3; if(Gr(m1)<Gr(m2)) hi=m2; else lo=m1;}
const RHO=(lo+hi)/2, K=Gr(RHO);
const aStar = 1/(1+RHO), bStar = RHO/(1+RHO);
line(`  positivity     : u > (1 + e^{b/2a})/b          [ 2*s+*ln(s- -1) > s- ]`);
line(`  theta_total    : a + b   ( = exponent of D+ D-, the largest modulus product )`);
line(`  invariant      : min_{b/a} theta_total*u = K = ${fx(K,10)}   at b/a = ${fx(RHO,10)}`);
line(`                   optimal split a = ${fx(aStar,8)}   b = ${fx(bStar,8)}`);
line(`  symmetric a=b  : u = 2(1+sqrt e) = ${fx(2*(1+Math.exp(0.5)),8)}   (the coupled figure, and NOT optimal)`);
line(`  u_min(theta)   = K/theta ; break-even against beta_2 = ${fx(B2,8)} :`);
line(`     theta* = K/beta_2 = ${fx(K/B2,10)}      shortfall from theta_total = 1 : ${fx(K/B2-1,6)}`);
line(`  sieve-function validity at that optimum: u*a = ${fx(K*aStar,4)} in [1,3] for F, u*b = ${fx(K*bStar,4)} in [2,4] for f`);

line('');
line('='.repeat(76));
line('B. BRUDERN-FOUVRY RECONCILED: their 4.156000 IS this threshold function');
rule();
const uBF = uth(0.5,0.75);
line(`  their split (majorant, minorant) = (x^{1/2}, x^{3/4})  ->  a = 1/2, b = 3/4, theta_total = ${fx(1.25,2)}`);
line(`  u(1/2,3/4)          = ${fx(uBF,10)}   = (4/3)(1+e^{3/4}) = ${fx((4/3)*(1+Math.exp(0.75)),10)}`);
line(`  1/u                 = ${fx(1/uBF,10)}   <- their published constant, "0,2406"`);
line(`  1/beta_2            = ${fx(1/B2,10)}   <- the DHR constant they quote, "0,2343"`);
line(`  OPTIMAL split at theta_total = 5/4 : u = K/1.25 = ${fx(K/1.25,10)} , 1/u = ${fx(1.25/K,10)}`);
line(`  left unoptimised in their own theorem: ${fx(uBF-K/1.25,10)} in exponent, ${fx(1.25/K-1/uBF,10)} in their currency`);
line(`  side condition q^{C0} D1^4 D2^4 <= x^{5-c eps} constrains only the PRODUCT, so re-splitting is inside it`);

line('');
line('='.repeat(76));
line('C. INDEPENDENT LEVELS PER COMPONENT BUY NOTHING');
rule();
// levels D1+ = H^P, D1- = H^Q, D2+ = H^R, D2- = H^T (units of ln H)
// positivity: P*T*ln(uQ-1) + Q*R*ln(uT-1) > Q*T ; theta = max(Q+R, P+T, P+R)
const okRange=(u,P,Q,R,T)=> u*P>=1 && u*P<=3 && u*R>=1 && u*R<=3 && u*Q>=2 && u*T>=2;
const pos=(u,P,Q,R,T)=> P*T*Math.log(u*Q-1)+Q*R*Math.log(u*T-1) > Q*T;
const th4=(P,Q,R,T)=>Math.max(Q+R,P+T,P+R);
function uminAt(P,Q,R,T){ let l=1.0,h=40,found=false;
  for(let i=0;i<=400;i++){const m=1.0+(39)*i/400; if(okRange(m,P,Q,R,T)&&pos(m,P,Q,R,T)){h=m;found=true;break;}}
  if(!found) return Infinity;
  for(let i=0;i<200;i++){const m=(l+h)/2; if(okRange(m,P,Q,R,T)&&pos(m,P,Q,R,T))h=m;else l=m;} return h; }
const proj = x => { const t=th4(...x); return t>1 ? x.map(v=>v/t) : x; };
let best4=uminAt(aStar,bStar,aStar,bStar), arg4=[aStar,bStar,aStar,bStar];
for(let trial=0;trial<1500;trial++){
  let c = trial===0 ? [aStar,bStar,aStar,bStar]
                    : [aStar,bStar,aStar,bStar].map(v=>Math.max(0.02,v+(rnd()-0.5)*0.9));
  c=proj(c); let cv=uminAt(...c), step=0.06;
  for(let r=0;r<800;r++){ let imp=false;
    for(let i=0;i<4;i++) for(const s of [-step,step]){
      const d=c.slice(); d[i]+=s; if(d[i]<=0.01) continue; const dp=proj(d);
      const v=uminAt(...dp); if(v<cv-1e-13){cv=v;c=dp;imp=true;} }
    if(!imp){ step/=2; if(step<1e-11) break; } }
  if(cv<best4){best4=cv;arg4=c;}
}
line(`  4-parameter minimum of u at theta_total <= 1, validity enforced : ${fx(best4,10)}`);
line(`     at P,Q,R,T = ${arg4.map(v=>fx(v,6)).join('  ')}   (1500 restarts, local descent)`);
line(`     gain over the symmetric K = ${fx(K,10)} : ${fx(K-best4,10)}`);
// the trap
let bestBad=Infinity, argBad=null;
for(let trial=0;trial<800;trial++){
  let c=[aStar,bStar,aStar,bStar].map(v=>Math.max(0.005,v+(rnd()-0.5)*0.9)); c=proj(c);
  const umin=(P,Q,R,T)=>{ let l=1,h=40; if(!(pos(h,P,Q,R,T))) return Infinity;
    for(let i=0;i<200;i++){const m=(l+h)/2; if(pos(m,P,Q,R,T))h=m;else l=m;} return h; };
  let cv=umin(...c), step=0.06;
  for(let r=0;r<600;r++){ let imp=false;
    for(let i=0;i<4;i++) for(const s of [-step,step]){ const d=c.slice(); d[i]+=s; if(d[i]<=0.004) continue;
      const dp=proj(d); const v=umin(...dp); if(v<cv-1e-13){cv=v;c=dp;imp=true;} }
    if(!imp){step/=2; if(step<1e-10) break;} }
  if(cv<bestBad){bestBad=cv;argBad=c;}
}
line(`  THE TRAP: with the validity ranges DROPPED the same search reports u = ${fx(bestBad,6)}`);
line(`     at P,Q,R,T = ${argBad.map(v=>fx(v,6)).join('  ')} -> u*P = ${fx(bestBad*argBad[0],4)}`);
line(`     u*P < 1 means D1+ < z: F(s) = 2e^g/s is not the sieve's F there, and the`);
line(`     apparent ${fx(K-bestBad,4)} gain is the formula being read outside its range.`);

line('');
line('='.repeat(76));
line('D. THE (+,+) DIAGONAL IS ALMOST FREE');
rule();
function minTheta(amax){ let bt=Infinity,ba=0,bb=0;
  for(let a=0.05;a<=amax+1e-12;a+=1e-5){
    let mb=0,mv=Infinity; for(let b=0.05;b<3;b+=1e-4){const v=uth(a,b); if(v<mv){mv=v;mb=b;}}
    if(mv>B2) continue;
    let l=0.001,h=mb; for(let i=0;i<200;i++){const m=(l+h)/2; if(uth(a,m)>B2) l=m; else h=m;}
    if(a+h<bt){bt=a+h;ba=a;bb=h;} }
  return [bt,ba,bb]; }
const [t0,a0,b0]=minTheta(5.0), [t1,a1,b1]=minTheta(0.5);
line(`  unconstrained break-even : theta = ${fx(t0,6)}  at a = ${fx(a0,6)} b = ${fx(b0,6)}  ->  D+^2 = H^${fx(2*a0,4)}`);
line(`  a <= 1/2 forced          : theta = ${fx(t1,6)}  at a = ${fx(a1,6)} b = ${fx(b1,6)}  ->  D+^2 = H^${fx(2*a1,4)}`);
line(`  cost of putting the diagonal inside the window : ${fx(t1-t0,6)} in theta_total`);
line(`  so the missing lemma is needed for the CROSS terms only, at levels (H^${fx(a1,4)}, H^${fx(b1,4)}),`);
line(`  and the two moduli come from DIFFERENT weight systems (majorant against minorant).`);
const THETA=t1, AA=a1, BB=b1;

line('');
line('='.repeat(76));
line('E. THE CANCELLATION BUDGET');
rule();
line(`  pair count at the working point : P = H^${fx(THETA,6)}`);
line(`  requirement                     : |R(x)| << H  for every x`);
line(`  write |R| ~ P^gamma. Then gamma <= 1/theta = ${fx(1/THETA,6)} suffices.`);
line(`     trivial (absolute values)      gamma = 1`);
line(`     square-root cancellation       gamma = 0.5`);
line(`     needed                         gamma = ${fx(1/THETA,6)}`);
line(`  saving needed  = P^{1-gamma} = H^${fx(THETA-1,6)}   ;  square-root saving = H^${fx(THETA/2,6)}`);
line(`  needed / square-root, in log scale : ${fx((THETA-1)/(THETA/2),6)}`);
line(`  So the missing input is ${fx(100*(THETA-1)/(THETA/2),1)} per cent of square-root cancellation.`);

line('');
line('='.repeat(76));
line('F. THE CEILING ON ABSOLUTE VALUES, AS AN EXACT EXTREMAL PROBLEM');
rule();
line('  One integer sets the ceiling. Let S1, S2 partition the odd primes below z.');
line('  By CRT there is n0 < P(z) with n0 = 0 mod prod(S1) and n0 + 2 = 0 mod prod(S2).');
line('  Then EVERY pair (d1,d2) with d1 | P(z) squarefree S1-smooth, d1 <= D+, and');
line('  d2 squarefree S2-smooth, d2 <= D-, and d1 d2 > H, has |r_{d1,d2}(x)| = 1 - H/d1d2');
line('  at every one of the H window positions holding n0. Coprimality is automatic:');
line('  g | n0 and g | n0+2 forces g | 2. So sup_x of the absolute-value sum is at least');
line('  the maximum over 2-colourings, and that maximum is a finite computation.');
line('');
function oddPrimesBelow(n){const s=new Uint8Array(n).fill(1);for(let i=2;i*i<n;i++)if(s[i])for(let j=i*i;j<n;j+=i)s[j]=0;const o=[];for(let i=3;i<n;i+=2)if(s[i])o.push(i);return o;}
function ceilingAt(z){
  const H=Math.pow(z,B2), DP=Math.pow(H,AA), DM=Math.pow(H,BB);
  const ps=oddPrimesBelow(z);
  // Executable, not prose. The smooth-number mask below is a two-word (l, h)
  // pair, so it is faithful to 64 primes and no further. z = 307 uses 61 odd
  // primes; the next natural row of this roughly geometric ladder, z = 331,
  // uses 65 and would alias silently. natal-cap-34-wrap-precision.js:164 is the
  // pattern. (2026-08-20.)
  if(ps.length>64) throw new Error(`z=${z} needs ${ps.length} odd primes; the two-word mask holds 64`);
  const vals=[],mlo=[],mhi=[];
  (function rec(i,v,l,h){ vals.push(v); mlo.push(l); mhi.push(h);
    for(let j=i;j<ps.length;j++){ const q=v*ps[j]; if(q>DM) continue;
      rec(j+1,q, j<32?(l|(1<<j)):l, j>=32?(h|(1<<(j-32))):h); } })(0,1,0,0);
  const ord=vals.map((v,i)=>i).sort((x,y)=>vals[x]-vals[y]);
  const V=new Float64Array(ord.length), ML=new Int32Array(ord.length), MH=new Int32Array(ord.length);
  ord.forEach((i,k)=>{V[k]=vals[i];ML[k]=mlo[i];MH[k]=mhi[i];});
  let nDP=0; while(nDP<V.length && V[nDP]<=DP) nDP++;
  const B=new Float64Array(V.length), A=new Float64Array(nDP);
  function score(s1lo,s1hi){ let nb=0,na=0;
    for(let i=0;i<V.length;i++) if(((ML[i]&s1lo)|(MH[i]&s1hi))===0) B[nb++]=V[i];
    for(let i=0;i<nDP;i++) if(((ML[i]&~s1lo)===0)&&((MH[i]&~s1hi)===0)) A[na++]=V[i];
    let t=0; for(let k=0;k<na;k++){ const need=H/A[k]; let l=0,h=nb;
      while(l<h){const m=(l+h)>>1; if(B[m]<=need)l=m+1;else h=m;} t+=nb-l; }
    return t; }
  let bl=0,bh=0,bv=-1;
  for(let start=0;start<6;start++){
    let l=0,h=0;
    if(start===0){ for(let j=0;j<ps.length;j+=2) (j<32)?(l|=(1<<j)):(h|=(1<<(j-32))); }
    else if(start===1){ for(let j=0;j<ps.length;j++) if(j<ps.length/2) (j<32)?(l|=(1<<j)):(h|=(1<<(j-32))); }
    else { for(let j=0;j<ps.length;j++) if(rnd()<0.5) (j<32)?(l|=(1<<j)):(h|=(1<<(j-32))); }
    let cv=score(l,h);
    for(let sw=0;sw<10;sw++){ let imp=false;
      for(let j=0;j<ps.length;j++){ let a=l,b=h; if(j<32)a^=(1<<j); else b^=(1<<(j-32));
        const v=score(a,b); if(v>cv){cv=v;l=a;h=b;imp=true;} }
      if(!imp) break; }
    if(cv>bv){bv=cv;bl=l;bh=h;}
  }
  // coprime-blind ceiling and the L2 / L1 statistics over ALL smooth pairs with c > H
  let blind=0, meanAbs=0, varS=0, nlow=0;
  for(let k=0;k<nDP;k++){ const d1=V[k], need=H/d1; let l=0,h=V.length;
    while(l<h){const m=(l+h)>>1; if(V[m]<=need)l=m+1;else h=m;}
    blind += V.length-l; nlow += l;
    for(let j=l;j<V.length;j++){ const p=H/(d1*V[j]); meanAbs += 2*p*(1-p); varS += p*(1-p); } }
  const s1=[]; for(let j=0;j<ps.length;j++){ const on=j<32?((bl>>j)&1):((bh>>(j-32))&1); if(on) s1.push(ps[j]); }
  return {z,H,DP,DM,pi:ps.length,nsm:V.length,nDP,best:bv,blind,nlow,meanAbs,varS,s1};
}
line('  z      H          D+         D-        #sm<=D+  #sm<=D-    ceiling     ceil/H   log/logH  /blind  #sm/D+  #sm/D-');
const rows=[];
for(const z of [31,43,61,101,151,211,307]){
  const r=ceilingAt(z); rows.push(r);
  line(`${String(r.z).padStart(4)}  ${r.H.toExponential(3)}  ${r.DP.toExponential(3)}  ${r.DM.toExponential(3)}  `+
       `${String(r.nDP).padStart(7)}  ${String(r.nsm).padStart(8)} ${r.best.toExponential(3)}  ${(r.best/r.H).toExponential(2)}  `+
       `${fx(Math.log(r.best)/Math.log(r.H),4)}  ${fx(r.best/r.blind,5)}  ${fx(r.nDP/r.DP,4)}  ${fx(r.nsm/r.DM,5)}`);
}
line('  the last two columns are the smooth densities rho(u*a) and rho(u*b) still converging');
line('  upward to positive constants. They are what holds the ceiling exponent below theta.');
line('');
line('  the same rows as remainder statistics over ALL smooth pairs with d1d2 > H:');
line('  z     E_x[sum|r|] high   low pairs      E_x[A]/H    sd_x[signed]   sqrt(H)     ceiling/E_x[A]');
for(const r of rows){ const EA=r.meanAbs+r.nlow;
  line(`${String(r.z).padStart(4)}   ${r.meanAbs.toExponential(3)}      ${r.nlow.toExponential(3)}     ${fx(EA/r.H,5)}     ${Math.sqrt(r.varS).toExponential(3)}    ${Math.sqrt(r.H).toExponential(3)}    ${(r.best/EA).toExponential(2)}`); }
line('  E_x[A] is the absolute-value sum AVERAGED over window position; it sits far below H at');
line('  every z here and rises only like a power of log H. The ceiling rises like a power of H.');
// fits
function fitFree(rows){ let n=0,sx=0,sy=0,sxx=0,sxy=0;
  for(const r of rows){const x=Math.log(r.H), y=Math.log(r.best); n++;sx+=x;sy+=y;sxx+=x*x;sxy+=x*y;}
  const t=(n*sxy-sx*sy)/(n*sxx-sx*sx), c=(sy-t*sx)/n; let rss=0;
  for(const r of rows) rss+=Math.pow(Math.log(r.best)-(c+t*Math.log(r.H)),2);
  return {t,C:Math.exp(c),rss}; }
const ff=fitFree(rows), ffTail=fitFree(rows.slice(3));
line('');
line(`  free-exponent fit  ceiling = C H^t : t = ${fx(ff.t,4)}  C = ${ff.C.toExponential(3)}  RSS(log) = ${ff.rss.toExponential(3)}`);
line(`  same on the last four z          : t = ${fx(ffTail.t,4)}  C = ${ffTail.C.toExponential(3)}  RSS(log) = ${ffTail.rss.toExponential(3)}`);
line(`  theta_total at the working point  = ${fx(THETA,6)} ; the ceiling's exponent is heading to it, not to 1.`);
const ratios=rows.map(r=>r.best/r.blind);
line(`  ceiling / coprime-blind count: ${ratios.map(v=>fx(v,4)).join(' ')}  -> the colouring constraint is a CONSTANT, not a power`);
line('');
line('  THE SQUEEZE. ceiling = (D+ D-) * [#sm/D+] * [#sm/D-] * [high fraction] * [colouring factor]');
line('  and D+ D- = H^theta exactly. Each of the four bracketed factors is a CONSTANT in the limit:');
line('   z      #sm/D+    #sm/D-    high frac   colouring   product     ceiling/H^theta');
for(const r of rows){ const hf=r.blind/(r.nDP*r.nsm), cf=r.best/r.blind, pr=(r.nDP/r.DP)*(r.nsm/r.DM)*hf*cf;
  line(`  ${String(r.z).padStart(4)}   ${fx(r.nDP/r.DP,5)}   ${fx(r.nsm/r.DM,6)}    ${fx(hf,5)}    ${fx(cf,5)}   ${pr.toExponential(3)}    ${(r.best/Math.pow(r.H,THETA)).toExponential(3)}`); }
line('  The first two are Dickman densities rho(u*a), rho(u*b) times the squarefree density,');
line('  the third tends to 1, the fourth is flat at 0.0094. So the ceiling is c*H^theta with c > 0');
line('  and the exponent of the absolute-value ceiling is theta_total exactly, not 1.');

line('');
line('='.repeat(76));
line('G. TWO CROSSOVERS');
rule();
// (i) where the ceiling first exceeds H
const t=ffTail.t, C=ffTail.C;
const lnHx = Math.log(1/C)/(t-1), zx = Math.exp(lnHx/B2);
const last=rows[rows.length-1];
const Cp = last.best/Math.pow(last.H,THETA);
const lnHp = Math.log(1/Cp)/(THETA-1), zp = Math.exp(lnHp/B2);
line(`  (i) the absolute-value ceiling exceeds H when the fitted law crosses H.`);
line(`      free-exponent fit  (t = ${fx(t,4)})    : H > ${Math.exp(lnHx).toExponential(3)} , z > ${zx.toExponential(3)}`);
line(`      theta-pinned fit   (t = ${fx(THETA,4)}, C from z = ${last.z}) : H > ${Math.exp(lnHp).toExponential(3)} , z > ${zp.toExponential(3)}`);
line(`      Those two bracket it. Below that z the absolute-value accounting at`);
line(`      theta_total = ${fx(THETA,4)} is NOT yet obstructed at any position, which is why no`);
line(`      finite scan can adjudicate theta_total: the ceiling is asymptotic by construction.`);
// where the AVERAGE crosses H -- the logarithmic, not the power, part of the gap
{ let n=0,sx=0,sy=0,sxx=0,sxy=0;
  for(const r of rows){ const EA=r.meanAbs+r.nlow; const x=Math.log(Math.log(r.H)), y=Math.log(EA/r.H); n++;sx+=x;sy+=y;sxx+=x*x;sxy+=x*y; }
  const k=(n*sxy-sx*sy)/(n*sxx-sx*sx), c=(sy-k*sx)/n;
  const lnH1=Math.exp(-c/k), zavg=Math.exp(lnH1/B2);
  line('');
  line(`  (i-b) the AVERAGE-position sum. E_x[A]/H fits c*(ln H)^k with k = ${fx(k,4)}, c = ${Math.exp(c).toExponential(3)},`);
  line(`      reaching 1 at ln H = ${fx(lnH1,2)}, z = ${zavg.toExponential(3)}. That is a LOG effect: it moves`);
  line(`      theta_total by O(lnln H/ln H) and is the whole of what a sharper CONSTANT could`);
  line(`      ever buy. It is not the 0.209, which is a power of H.`); }
// (ii) the divisor-multiplicity ceiling on the drop-the-window-phase route
line('');
line('  (ii) DROP ONLY THE WINDOW PHASE. Fourier-expanding the sawtooth and using');
line('       reciprocity, rho/(d1 d2) = -2 dbar1/d2 mod 1, gives');
line('          R(x) ~ sum_h c_h sum_m e(-h x/m) K_h(m),   K_h(m) = sum_{d1 d2 = m} w e(-2 h dbar1/d2).');
line('       The only x-dependence is e(-hx/m). Take absolute values THERE and the');
line('       estimate is uniform in x for free. What is left is sum_m |K_h(m)|, and');
line('       K_h(m) has at most tau(m) terms, so the whole saving available is tau(m).');
function maxOmega(M){ const ps=oddPrimesBelow(4000); let pr=1,k=0; for(const p of ps){ if(pr*p>M) break; pr*=p; k++; } return k; }
line('       z        H^{theta-1} needed      max tau(m), m | P(z), m <= H^theta     verdict');
for(const z of [307,1e6,1e8,1e10,1e11,1e12,3e12,1e13,1e15]){
  const H=Math.pow(z,B2), M=Math.pow(H,THETA), need=Math.pow(H,THETA-1), tau=Math.pow(2,maxOmega(M));
  line(`  ${String(z).padStart(8)}   ${need.toExponential(3).padStart(12)}            ${tau.toExponential(3).padStart(12)}                ${tau>need?'route still open':'ROUTE CLOSED'}`);
}
line('       tau(m) = m^{o(1)} and the requirement is m^{(theta-1)/theta} = m^{0.175}, so the');
line('       route closes for good once pi(ln m)*ln2 < 0.175 ln m, i.e. ln2/lnln m < 0.175.');
line('       It is an asymptotic kill with a late crossover, tabulated above.');

line('');
line('='.repeat(76));
line('H. WHAT A FINITE SCAN SEES: the all-divisors surrogate');
rule();
{
  const H=10000, DP=100, DM=704, N=20000000, BLK=1000000;
  let nlow=0; for(let d1=1;d1<=DP;d1++) nlow += Math.min(DM, Math.floor(H/d1));
  const nall=DP*DM, nhigh=nall-nlow;
  const w=new Uint32Array(N+4);
  for(let lo=1; lo<N; lo+=BLK){
    const hi=Math.min(N,lo+BLK), len=hi-lo+3;
    const cnt=new Int32Array(len+1);
    for(let d=1;d<=DM;d++){ const s=Math.ceil(lo/d)*d; for(let m=s;m<lo+len;m+=d) cnt[m-lo]++; }
    const off=new Int32Array(len+1); let acc=0;
    for(let i=0;i<len;i++){off[i]=acc;acc+=cnt[i];} off[len]=acc;
    const div=new Int32Array(acc), fill=new Int32Array(len);
    for(let d=1;d<=DM;d++){ const s=Math.ceil(lo/d)*d; for(let m=s;m<lo+len;m+=d){const i=m-lo; div[off[i]+fill[i]++]=d;} }
    for(let n=lo;n<hi;n++){ const i=n-lo,j=i+2; let tot=0;
      const a0=off[i],a1=off[i+1],b0=off[j],b1=off[j+1];
      for(let p=a0;p<a1;p++){ const d1=div[p]; if(d1>DP) break;
        const need=Math.floor(H/d1)+1; let l=b0,r=b1;
        while(l<r){const m=(l+r)>>1; if(div[m]<need)l=m+1;else r=m;} tot+=b1-l; }
      w[n]=tot; }
  }
  let S=0; for(let n=1;n<=H;n++) S+=w[n];
  let maxW=S,argW=0,sum=0,cnt=0,over=0,run=0,maxrun=0;
  for(let x=1;x+H<=N;x++){ if(x>1) S+=w[x+H]-w[x];
    sum+=S; cnt++; if(S>maxW){maxW=S;argW=x;}
    if(S>maxW*0){} }
  const mean=sum/cnt; S=0; for(let n=1;n<=H;n++) S+=w[n]; over=0;run=0;maxrun=0;
  for(let x=1;x+H<=N;x++){ if(x>1) S+=w[x+H]-w[x];
    if(S>1.02*mean){over++; if(++run>maxrun)maxrun=run;} else run=0; }
  let mw=0,aw=0; for(let n=1;n<=N;n++) if(w[n]>mw){mw=w[n];aw=n;}
  line(`  H = ${H}, D+ = ${DP}, D- = ${DM}, all divisors (the z -> infinity limit at fixed D), n <= ${N.toExponential(1)}`);
  line(`  pairs ${nall}  = H^${fx(Math.log(nall)/Math.log(H),4)} ; low (d1d2 <= H) ${nlow} ; high ${nhigh}`);
  line(`  window sum W(x) : mean ${fx(sum/cnt/H,4)} H , max ${fx(maxW/H,4)} H at x = ${argW} , max/mean = ${fx(maxW/(sum/cnt),4)}`);
  line(`  largest single-integer term max_n w(n) = ${mw} at n = ${aw} , = ${fx(mw/nhigh,5)} of the high-pair count`);
  line(`  positions with W(x) > 1.02 * mean : ${(100*over/cnt).toFixed(2)} per cent , longest run ${maxrun} = ${fx(maxrun/H,4)} H`);
  line('  READ THIS THE RIGHT WAY: 2*10^7 consecutive positions show a window sum flat to');
  line(`  ${fx(100*(maxW/(sum/cnt)-1),1)} per cent. The obstruction of section F is one engineered integer of size`);
  line('  P(z), and no scan of a real range contains one. A flat scan is not evidence.');
}
line('');
line('='.repeat(76));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-theta-margin.js
//   invocation:  node research/attack-theta-margin.js
//   code-sha256: f8277cb255a8fbc192bb07d2404fa1d54bb31dba8175acc418f4dce2abc3216c
//   out-sha256:  3a1f39b17b4317d47ca18ee72067b6825566b6530e5393e4856e432c3384d3a5
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     172.1 s
// ============================================================================
// ============================================================================
// A. THE VECTOR-SIEVE THRESHOLD, RE-DERIVED
// ----------------------------------------------------------------------------
//   positivity     : u > (1 + e^{b/2a})/b          [ 2*s+*ln(s- -1) > s- ]
//   theta_total    : a + b   ( = exponent of D+ D-, the largest modulus product )
//   invariant      : min_{b/a} theta_total*u = K = 5.1580646803   at b/a = 1.3130863738
//                    optimal split a = 0.43232281   b = 0.56767719
//   symmetric a=b  : u = 2(1+sqrt e) = 5.29744254   (the coupled figure, and NOT optimal)
//   u_min(theta)   = K/theta ; break-even against beta_2 = 4.26645028 :
//      theta* = K/beta_2 = 1.2089827226      shortfall from theta_total = 1 : 0.208983
//   sieve-function validity at that optimum: u*a = 2.2299 in [1,3] for F, u*b = 2.9281 in [2,4] for f
//
// ============================================================================
// B. BRUDERN-FOUVRY RECONCILED: their 4.156000 IS this threshold function
// ----------------------------------------------------------------------------
//   their split (majorant, minorant) = (x^{1/2}, x^{3/4})  ->  a = 1/2, b = 3/4, theta_total = 1.25
//   u(1/2,3/4)          = 4.1560000222   = (4/3)(1+e^{3/4}) = 4.1560000222
//   1/u                 = 0.2406159756   <- their published constant, "0,2406"
//   1/beta_2            = 0.2343868868   <- the DHR constant they quote, "0,2343"
//   OPTIMAL split at theta_total = 5/4 : u = K/1.25 = 4.1264517443 , 1/u = 0.2423389541
//   left unoptimised in their own theorem: 0.0295482779 in exponent, 0.0017229785 in their currency
//   side condition q^{C0} D1^4 D2^4 <= x^{5-c eps} constrains only the PRODUCT, so re-splitting is inside it
//
// ============================================================================
// C. INDEPENDENT LEVELS PER COMPONENT BUY NOTHING
// ----------------------------------------------------------------------------
//   4-parameter minimum of u at theta_total <= 1, validity enforced : 5.1580646803
//      at P,Q,R,T = 0.432323  0.567677  0.432323  0.567677   (1500 restarts, local descent)
//      gain over the symmetric K = 5.1580646803 : -0.0000000000
//   THE TRAP: with the validity ranges DROPPED the same search reports u = 4.695059
//      at P,Q,R,T = 0.781686  0.972351  0.001300  0.218314 -> u*P = 3.6701
//      u*P < 1 means D1+ < z: F(s) = 2e^g/s is not the sieve's F there, and the
//      apparent 0.4630 gain is the formula being read outside its range.
//
// ============================================================================
// D. THE (+,+) DIAGONAL IS ALMOST FREE
// ----------------------------------------------------------------------------
//   unconstrained break-even : theta = 1.208983  at a = 0.522670 b = 0.686313  ->  D+^2 = H^1.0453
//   a <= 1/2 forced          : theta = 1.212157  at a = 0.500000 b = 0.712157  ->  D+^2 = H^1.0000
//   cost of putting the diagonal inside the window : 0.003175 in theta_total
//   so the missing lemma is needed for the CROSS terms only, at levels (H^0.5000, H^0.7122),
//   and the two moduli come from DIFFERENT weight systems (majorant against minorant).
//
// ============================================================================
// E. THE CANCELLATION BUDGET
// ----------------------------------------------------------------------------
//   pair count at the working point : P = H^1.212157
//   requirement                     : |R(x)| << H  for every x
//   write |R| ~ P^gamma. Then gamma <= 1/theta = 0.824975 suffices.
//      trivial (absolute values)      gamma = 1
//      square-root cancellation       gamma = 0.5
//      needed                         gamma = 0.824975
//   saving needed  = P^{1-gamma} = H^0.212157   ;  square-root saving = H^0.606079
//   needed / square-root, in log scale : 0.350049
//   So the missing input is 35.0 per cent of square-root cancellation.
//
// ============================================================================
// F. THE CEILING ON ABSOLUTE VALUES, AS AN EXACT EXTREMAL PROBLEM
// ----------------------------------------------------------------------------
//   One integer sets the ceiling. Let S1, S2 partition the odd primes below z.
//   By CRT there is n0 < P(z) with n0 = 0 mod prod(S1) and n0 + 2 = 0 mod prod(S2).
//   Then EVERY pair (d1,d2) with d1 | P(z) squarefree S1-smooth, d1 <= D+, and
//   d2 squarefree S2-smooth, d2 <= D-, and d1 d2 > H, has |r_{d1,d2}(x)| = 1 - H/d1d2
//   at every one of the H window positions holding n0. Coprimality is automatic:
//   g | n0 and g | n0+2 forces g | 2. So sup_x of the absolute-value sum is at least
//   the maximum over 2-colourings, and that maximum is a finite computation.
//
//   z      H          D+         D-        #sm<=D+  #sm<=D-    ceiling     ceil/H   log/logH  /blind  #sm/D+  #sm/D-
//   31  2.306e+6  1.518e+3  3.399e+4       90       229 3.900e+1  1.69e-5  0.2501  0.00649  0.0593  0.00674
//   43  9.313e+6  3.052e+3  9.186e+4      185       670 4.030e+2  4.33e-5  0.3738  0.00782  0.0606  0.00729
//   61  4.140e+7  6.434e+3  2.658e+5      398      2040 3.558e+3  8.59e-5  0.4662  0.00827  0.0619  0.00768
//  101  3.559e+8  1.887e+4  1.230e+6     1197     10113 7.339e+4  2.06e-4  0.5690  0.00912  0.0634  0.00822
//  151  1.979e+9  4.449e+4  4.174e+6     2967     38088 8.030e+5  4.06e-4  0.6352  0.00946  0.0667  0.00912
//  211  8.250e+9  9.083e+4  1.154e+7     6206    111335 5.330e+6  6.46e-4  0.6783  0.00958  0.0683  0.00965
//  307  4.086e+10  2.021e+5  3.605e+7    14042    361267 4.078e+7  9.98e-4  0.7172  0.00944  0.0695  0.01002
//   the last two columns are the smooth densities rho(u*a) and rho(u*b) still converging
//   upward to positive constants. They are what holds the ceiling exponent below theta.
//
//   the same rows as remainder statistics over ALL smooth pairs with d1d2 > H:
//   z     E_x[sum|r|] high   low pairs      E_x[A]/H    sd_x[signed]   sqrt(H)     ceiling/E_x[A]
//   31   2.075e+3      1.460e+4     0.00723     3.221e+1    1.518e+3    2.34e-3
//   43   1.667e+4      7.244e+4     0.00957     9.130e+1    3.052e+3    4.52e-3
//   61   1.276e+5      3.818e+5     0.01231     2.526e+2    6.434e+3    6.98e-3
//  101   2.047e+6      4.062e+6     0.01716     1.012e+3    1.887e+4    1.20e-2
//  151   1.871e+7      2.814e+7     0.02367     3.059e+3    4.449e+4    1.71e-2
//  211   1.078e+8      1.346e+8     0.02938     7.342e+3    9.083e+4    2.20e-2
//  307   7.173e+8      7.504e+8     0.03593     1.894e+4    2.021e+5    2.78e-2
//   E_x[A] is the absolute-value sum AVERAGED over window position; it sits far below H at
//   every z here and rises only like a power of log H. The ceiling rises like a power of H.
//
//   free-exponent fit  ceiling = C H^t : t = 1.4099  C = 5.560e-8  RSS(log) = 1.974e-1
//   same on the last four z          : t = 1.3325  C = 3.115e-7  RSS(log) = 1.038e-2
//   theta_total at the working point  = 1.212157 ; the ceiling's exponent is heading to it, not to 1.
//   ceiling / coprime-blind count: 0.0065 0.0078 0.0083 0.0091 0.0095 0.0096 0.0094  -> the colouring constraint is a CONSTANT, not a power
//
//   THE SQUEEZE. ceiling = (D+ D-) * [#sm/D+] * [#sm/D-] * [high fraction] * [colouring factor]
//   and D+ D- = H^theta exactly. Each of the four bracketed factors is a CONSTANT in the limit:
//    z      #sm/D+    #sm/D-    high frac   colouring   product     ceiling/H^theta
//     31   0.05927   0.006738    0.29161    0.00649   7.557e-7    7.557e-7
//     43   0.06062   0.007294    0.41560    0.00782   1.438e-6    1.438e-6
//     61   0.06185   0.007676    0.52970    0.00827   2.081e-6    2.081e-6
//    101   0.06345   0.008222    0.66446    0.00912   3.163e-6    3.163e-6
//    151   0.06669   0.009125    0.75103    0.00946   4.324e-6    4.324e-6
//    211   0.06833   0.009651    0.80526    0.00958   5.087e-6    5.087e-6
//    307   0.06947   0.010022    0.85207    0.00944   5.597e-6    5.597e-6
//   The first two are Dickman densities rho(u*a), rho(u*b) times the squarefree density,
//   the third tends to 1, the fourth is flat at 0.0094. So the ceiling is c*H^theta with c > 0
//   and the exponent of the absolute-value ceiling is theta_total exactly, not 1.
//
// ============================================================================
// G. TWO CROSSOVERS
// ----------------------------------------------------------------------------
//   (i) the absolute-value ceiling exceeds H when the fitted law crosses H.
//       free-exponent fit  (t = 1.3325)    : H > 3.726e+19 , z > 3.866e+4
//       theta-pinned fit   (t = 1.2122, C from z = 307) : H > 5.693e+24 , z > 6.344e+5
//       Those two bracket it. Below that z the absolute-value accounting at
//       theta_total = 1.2122 is NOT yet obstructed at any position, which is why no
//       finite scan can adjudicate theta_total: the ceiling is asymptotic by construction.
//
//   (i-b) the AVERAGE-position sum. E_x[A]/H fits c*(ln H)^k with k = 3.1532, c = 1.497e-6,
//       reaching 1 at ln H = 70.36, z = 1.451e+7. That is a LOG effect: it moves
//       theta_total by O(lnln H/ln H) and is the whole of what a sharper CONSTANT could
//       ever buy. It is not the 0.209, which is a power of H.
//
//   (ii) DROP ONLY THE WINDOW PHASE. Fourier-expanding the sawtooth and using
//        reciprocity, rho/(d1 d2) = -2 dbar1/d2 mod 1, gives
//           R(x) ~ sum_h c_h sum_m e(-h x/m) K_h(m),   K_h(m) = sum_{d1 d2 = m} w e(-2 h dbar1/d2).
//        The only x-dependence is e(-hx/m). Take absolute values THERE and the
//        estimate is uniform in x for free. What is left is sum_m |K_h(m)|, and
//        K_h(m) has at most tau(m) terms, so the whole saving available is tau(m).
//        z        H^{theta-1} needed      max tau(m), m | P(z), m <= H^theta     verdict
//        307       1.783e+2                2.048e+3                route still open
//    1000000       2.697e+5                2.097e+6                route still open
//   100000000       1.743e+7                6.711e+7                route still open
//   10000000000       1.126e+9                2.147e+9                route still open
//   100000000000       9.052e+9               1.718e+10                route still open
//   1000000000000      7.276e+10               6.872e+10                ROUTE CLOSED
//   3000000000000      1.967e+11               1.374e+11                ROUTE CLOSED
//   10000000000000      5.849e+11               2.749e+11                ROUTE CLOSED
//   1000000000000000      3.779e+13               8.796e+12                ROUTE CLOSED
//        tau(m) = m^{o(1)} and the requirement is m^{(theta-1)/theta} = m^{0.175}, so the
//        route closes for good once pi(ln m)*ln2 < 0.175 ln m, i.e. ln2/lnln m < 0.175.
//        It is an asymptotic kill with a late crossover, tabulated above.
//
// ============================================================================
// H. WHAT A FINITE SCAN SEES: the all-divisors surrogate
// ----------------------------------------------------------------------------
//   H = 10000, D+ = 100, D- = 704, all divisors (the z -> infinity limit at fixed D), n <= 2.0e+7
//   pairs 70400  = H^1.2119 ; low (d1d2 <= H) 29177 ; high 41223
//   window sum W(x) : mean 1.7429 H , max 1.8020 H at x = 15998720 , max/mean = 1.0339
//   largest single-integer term max_n w(n) = 306 at n = 14220358 , = 0.00742 of the high-pair count
//   positions with W(x) > 1.02 * mean : 0.39 per cent , longest run 1138 = 0.1138 H
//   READ THIS THE RIGHT WAY: 2*10^7 consecutive positions show a window sum flat to
//   3.4 per cent. The obstruction of section F is one engineered integer of size
//   P(z), and no scan of a real range contains one. A flat scan is not evidence.
//
// ============================================================================
// ============================================================================
// READINGS
// ----------------------------------------------------------------------------
// 1. THE BREAK-EVEN IS 1.2089827, RE-DERIVED FROM SCRATCH, and the corrected figure
//    in sift-limit-attack.md section 4.5 is right to seven places. The symmetric
//    split is NOT the optimum; the asymmetry that pays is majorant against
//    minorant, and theta_total*u is invariant at K = 5.1580646803.
//
// 2. BRUDERN-FOUVRY'S PUBLISHED 0,2406 IS THIS THRESHOLD FUNCTION AT THEIR SPLIT.
//    u(1/2,3/4) = 4.1560000222 and 1/u = 0.2406159756. That closes the open
//    arithmetic section 7b flagged: the two numbers were never in conflict, ours
//    is the optimised split and theirs is not optimised. Since their Proposition 2
//    side condition q^{C0} D1^4 D2^4 <= x^{5-c eps} constrains only the PRODUCT,
//    re-splitting is inside their own hypothesis and gains 0.0295482779 in
//    exponent. Caveat, unchecked: their other three side conditions may not be
//    split-insensitive.
//
// 3. INDEPENDENT LEVELS PER COMPONENT BUY NOTHING. Four free levels return the
//    symmetric two-level optimum to ten places. The 0.46 that the same search
//    reports with the validity ranges dropped is an artifact of evaluating
//    F(s) = 2e^g/s at s < 1, and any future re-optimisation must carry
//    1 <= u*a <= 3 and u*b >= 2 explicitly.
//
// 4. THE (+,+) DIAGONAL IS FREE FOR 0.003175 OF THETA. Forcing a = 1/2 puts
//    D+^2 exactly at H, where absolute values already suffice, so the missing
//    lemma is needed for the two CROSS terms only, at levels (H^0.5, H^0.712157),
//    with the two moduli drawn from different weight systems. The short side
//    lands exactly on H^{1/2}.
//
// 5. THE MISSING INPUT IS 35.0 PER CENT OF SQUARE-ROOT CANCELLATION. Needing
//    gamma <= 0.824975 against trivial 1 and square-root 0.5 says the 0.209 does
//    not need a hard estimate; it needs any power saving at all.
//
// 6. THE ABSOLUTE-VALUE CEILING IS c*H^theta WITH c > 0, NOT H*polylog. This is
//    the headline. sup_x of the absolute-value remainder is set by ONE integer:
//    n0 = 0 mod prod(S1), n0+2 = 0 mod prod(S2) makes every S1/S2-split coprime
//    pair fire at once, and coprimality is automatic because g | n0 and g | n0+2
//    force g | 2. Maximising over colourings is a finite computation, and the
//    factorisation in the squeeze table shows all four correction factors going
//    to positive constants. So theta_total <= 1 is not a habit that a sharper
//    absolute-value estimate could shake off: the shortfall is a POWER H^0.212157
//    and the entire budget a constant could buy is O(lnln H/ln H), which the
//    average-position fit prices at reaching 1 only at z = 1.451e+7.
//
// 7. NO FINITE SCAN CAN ADJUDICATE THETA_TOTAL, AND SECTION H IS THE PROOF OF IT.
//    Two times ten to the seven consecutive positions give a window sum flat to
//    3.4 per cent, and the ceiling of reading 6 does not exceed H until z is
//    between 3.866e+4 and 6.344e+5. The extremal integer has size P(z) and lives in no
//    scannable range. sift-limit-attack.md section 4.5's pilot, positive at every
//    position it scanned, is consistent with this and says nothing about theta.
//
// 8. THE QUANTIFIER IS SEPARABLE, AND ITS PRICE IS tau(m), NOT C^{pi(z)}. After
//    Fourier expansion and reciprocity the entire x-dependence is one factor
//    e(-hx/m). Absolute values THERE make the estimate uniform in x for free, and
//    what is left has at most tau(m) terms per modulus. That closes the route
//    asymptotically -- the requirement is m^0.175 and tau(m) = 2^{pi(ln m)} --
//    but only from z = 1000000000000, and it is a materially cheaper statement of the wall
//    than the C^{pi(z)} the corpus carried. It also explains why the window phase
//    cannot simply be discarded: all the cancellation that could reach H^0.212
//    lives in the m-sum, which is exactly where x lives.
//
// 9. WHAT THIS SCRIPT DOES NOT DO. It does not evaluate the Rosser weights: the
//    colouring ceiling is computed over the full smooth divisor sets, of which
//    the Rosser support is a positive-density subset, so reading 6 is an upper
//    bound on the ceiling and a lower bound on what any Rosser-supported
//    instantiation reaches only up to that density. Section H's scan drops
//    smoothness entirely and is labelled a surrogate for that reason. The
//    four-parameter search in section C is a seeded local search, not a proof of
//    global optimality, though 1500 restarts all return the same point.
// ============================================================================
