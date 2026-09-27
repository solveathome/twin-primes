// ============================================================================
// rho-maxlaw-01-sufficiency.js — THE RHO MAXIMAL LAW, STATED AND PRICED
// ============================================================================
// FEEDS TODO item 0's named first move (2026-08-19 wording): "state the rho
// maximal law precisely and price its weakest sufficient form against the
// (31, 47] crossing." Write-up: research/history/staging/rho-maximal-law.md.
//
// THE OBJECT. sift-limit-lemmaV.js's H-free sawtooth potential
//     rho(y) = sum_j w_j * psi((y - c_j)/q_j),   psi(t) = t - floor(t) - 1/2,
// summed over the divisor-pair lattice of the Brudern-Fouvry certificate at
// sieve level D = z^s (s = 3.0, the measured family). rho is periodic mod
// W = P(z), its period mean is exactly -M/2 (each psi term averages -1/(2q)),
// and the certificate remainder is R_H(x) = rho(x) - rho(x+H), so
//     T(x) = H*M + R_H(x)  and  |R_H| <= 2 sup|rho~|,   rho~ = rho + M/2.
// A PROVEN bound sup|rho~| <= S(z) therefore gives, for every window
// H >= (2 S(z) + 1)/M, T(x) >= 1 at EVERY position — the +1 is the strict
// (T >= 1) accounting, the exact analogue of theta-ladder-sup.js --strict,
// because the T >= 0 form certifies nothing (the fixed-point rider of
// history/staging/theta-selfconsistent.md reading 8) — hence
//     G2(z#) <= ceil( (2 S(z) + 1) / M ).
// Since M >= c(s)/ln^2 z for s = 3.0 > 1 + sqrt(e) (linear-sieve main-term
// positivity), any law sup|rho~| <= C z^alpha with alpha < beta_2 = 4.26645
// beats the standing two-class exponent. THIS SCRIPT PRICES THAT CURVE.
//
// WHAT IS COMPUTED.
//  S0  CONTROL. The conditional (Gaussian-rho) column recomputed from the
//      repo's own row(z, ., 3.0) at z = 13..31 and checked digit for digit
//      against the embedded theta-ladder.md sec.2 table (z = 19..31) and
//      phase1-T4-maximal-law.md sec.2 (z = 13, 17). The z = 37..47 rows are
//      CITED from theta-ladder.md sec.2 (custody-bound, H-free, independently
//      reproduced by T4's custody block; NOT touched by the u = 3.2 defect,
//      which lives in sec.5b's need_true column only) — the standing compute
//      rule forbids re-running their O(N^2) rows (~2800 s at z = 47).
//  S1  NEW MEASUREMENT: sup|rho~| itself, exact over complete periods,
//      z = 13..29. The corpus has only ever measured sup|R_H|; the law is
//      about rho. Walker: rho(y+1) = rho(y) + M - K(y+1), K(x) = sum of w_j
//      over j with x = c_j mod q_j, blocked sieve marking. Controls, in-pass:
//      brute force at z = 13; period-mean = -M/2; walked variance against the
//      closed-form <rho^2> (= plateau/2, PROVEN identity, S2 of lemmaV);
//      period-closure drift rho(W) - rho(0).
//  S2  Cheap columns at z = 37..47 (buildTerms only: n, M, lnW) checked
//      against the cited table — validates the cited rows' cheap fields.
//  S3  THE SUFFICIENCY CURVE. For each z: theta_G (the exponent the Gaussian
//      law delivers), lambda_max = beta_2 - theta_G (how much looseness, in
//      z-exponent, a law weaker than Gaussian may carry and still beat
//      beta_2), the allowed factor z^lambda_max, the absolute ceiling
//      alpha_max = log_z((z^beta2 * M - 1)/2) on sup|rho~| itself, and the
//      strict-accounting correction theta_strict - theta_G (the T>=0 vs T>=1
//      gap, priced explicitly: Delta need = 1/M = O(ln^2 z)).
//  S4  THE TRIVIAL LAW. sup|rho~| <= (n + M)/2 <= (n+1)/2 unconditionally
//      (n terms, each |psi| <= 1/2, |w| = 1; +M/2 for the centering), so
//      need_triv = (n + 1 + M)/M. Where that already beats z^beta2 (finite-z
//      calibration, the Bonferroni-x<=227 phenomenon), and OLS fits of the
//      growth of n and need_triv — estimator calibrated on a known-truth
//      synthetic power law in the same pass before any fit is believed.
//  S5  THE FLOOR. The corrected self-consistent windows nP(z) (CITED from
//      theta-selfconsistent.md: exact at z = 13..31, prefix lower bound 2301
//      at z = 47) floor every correct law's deliverable window: positivity
//      holds only from nP onward, so no maximal law, however sharp, delivers
//      below th(nP). The (31, 47] crossing prices the floor against the
//      z^2 zone budget; here it is priced against the z^beta2 ceiling.
//  S6  TWO EXTRAPOLATION MODELS for where the room closes, bracketing,
//      NEITHER CALLED: (i) linear drift of theta_G in ln z (T4's measured
//      0.3746 per ln z) closing at z ~ exp((beta2 - a)/b); (ii) the power
//      model theta_inf = 0.5 + d ln sqrt(<rho^2>)/d ln z, which never closes.
//
// CITED ARTIFACTS (embedded tables, never recomputed here beyond the checks
// stated): research/theta-ladder.md sec.2; research/history/staging/
// phase1-T4-maximal-law.md sec.2; research/history/staging/
// theta-selfconsistent.md sec.2-3; beta_2 = 4.26645 per paper/beta2-note.md.
//
//   node research/rho-maxlaw-01-sufficiency.js     (~90 s; progress on stderr)
// ============================================================================
'use strict';
const path=require('path');
const L=require(path.join(__dirname,'sift-limit-lemmaV.js'));
const T0=Date.now(); const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
const err=(m)=>process.stderr.write(m+'\n');
function primesBelow(n){const s=new Uint8Array(n),o=[];for(let i=2;i<n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<n;j+=i)s[j]=1;}}return o;}

const BETA2=4.26645;                       // paper/beta2-note.md, DHR kappa=2
const S=3.0;                               // the measured family, throughout

// ---- cited rows (see header). rmsr = sqrt(<rho^2>). --------------------------
const CITED={                              // theta-ladder.md sec.2, s=3.0
  37:{N:76484, M:2.806e-2, lnW:26.024, rmsr:9.25620,  need:4760.25,  th:2.34513},
  41:{N:125884,M:2.624e-2, lnW:29.635, rmsr:11.99697, need:7040.03,  th:2.38567},
  43:{N:183084,M:2.444e-2, lnW:33.349, rmsr:14.19345, need:9485.41,  th:2.43473},
  47:{N:293980,M:2.317e-2, lnW:37.110, rmsr:18.99742, need:14129.48, th:2.48199}};
const CITED_LADDER={19:{need:576.28,th:2.15885},23:{need:938.05,th:2.18269},
  29:{need:1435.99,th:2.15889},31:{need:2285.76,th:2.25232}};
const CITED_T4={13:{need:147.5,th:1.9470},17:{need:305.4,th:2.0195}};
const NP={13:60,17:126,19:198,23:258,29:390,31:588};   // theta-selfconsistent.md, exact
const NP47_LB=2301;                                     // prefix lower bound, z=47

// ============================================================================
// S0 CONTROL: recompute the conditional column at z = 13..31 from the repo's row()
// ============================================================================
console.log('S0 CONTROL — conditional (Gaussian-rho) column recomputed from row(z,.,3.0)');
console.log('   need = 2*sqrt(2*lnW*<rho^2>)/M (H-free); checked against the embedded tables');
const ROWS={};       // z -> {need, th, M, lnW, rmsr, n, plateau}
let s0fail=0;
for(const z of [13,17,19,23,29,31]){
  err(`  S0 row z=${z} ... [${el()}]`);
  const r=L.row(z,3.2,S);
  const need=2*Math.sqrt(2*r.lnW*r.plateau/2)/r.M, th=Math.log(need)/Math.log(z);
  ROWS[z]={need,th,M:r.M,lnW:r.lnW,rmsr:Math.sqrt(r.plateau/2),n:r.N,plateau:r.plateau};
  let ref=null,tag='';
  if(CITED_LADDER[z]){ref=CITED_LADDER[z];tag='theta-ladder sec.2';}
  else if(CITED_T4[z]){ref=CITED_T4[z];tag='T4 sec.2';}
  let verdict='(no cited row)';
  if(ref){
    const okN=Math.abs(need-ref.need)<=0.6, okT=Math.abs(th-ref.th)<=6e-5;
    verdict=(okN&&okT)?`MATCH ${tag}`:`MISMATCH ${tag}: cited need=${ref.need} th=${ref.th}`;
    if(!(okN&&okT)) s0fail++;
  }
  console.log(`  z=${String(z).padStart(2)}  n=${String(r.N).padStart(6)}  M=${r.M.toExponential(3)}  lnW=${r.lnW.toFixed(3)}  sqrt<rho^2>=${Math.sqrt(r.plateau/2).toFixed(5)}  need=${need.toFixed(2).padStart(8)}  th=${th.toFixed(5)}   ${verdict}`);
}
console.log(s0fail? `  S0: ${s0fail} MISMATCH — DO NOT TRUST THE CURVE BELOW`
                  : '  S0: all recomputed rows match the embedded tables. Control PASSES.');

// ============================================================================
// S1 NEW MEASUREMENT: exact sup|rho~| over complete periods, z = 13..29
// ============================================================================
console.log('\nS1 SUP|RHO| — exact, full period, centered (rho~ = rho + M/2); first direct');
console.log('   measurement of the object the law is about (the corpus measured only sup|R_H|)');
function supRhoWalk(z){
  const D=Math.round(Math.pow(z,S));
  const t=L.buildTerms(z,D);
  const n=t.n,q=t.q,c=t.c,w=t.w,M=t.M;
  let W=1; for(const p of primesBelow(z)) W*=p;
  // rho(0) directly
  let r0=0; for(let j=0;j<n;j++){ const tt=(-c[j])/q[j]; r0+=w[j]*(tt-Math.floor(tt)-0.5); }
  const B=1<<22, K=new Float64Array(B);
  let v=r0, sup=Math.abs(r0+M/2), sum=r0, sum2=r0*r0, argmax=0;
  for(let a=1;a<=W;a+=B){
    const len=Math.min(B,W-a+1);
    K.fill(0,0,len);
    for(let j=0;j<n;j++){ const qj=q[j],wj=w[j];
      let x0=(c[j]-a)%qj; if(x0<0)x0+=qj;
      for(let i=x0;i<len;i+=qj) K[i]+=wj; }
    for(let i=0;i<len;i++){
      v+=M-K[i];                            // v = rho(a+i)
      if(a+i<W){ const av=Math.abs(v+M/2);  // x = W is the closure step only
        if(av>sup){sup=av;argmax=a+i;} sum+=v; sum2+=v*v; }
    }
    err(`  S1 z=${z} block ${(a/B)|0}/${Math.ceil(W/B)} [${el()}]`);
  }
  const drift=Math.abs(v-r0);
  const mean=sum/W, vari=sum2/W-mean*mean;
  return {z,W,n,M,sup,argmax,mean,vari,drift,r0};
}
// brute-force control at z = 13 (O(n*W), exact by definition)
{
  const z=13,D=Math.round(Math.pow(z,S)),t=L.buildTerms(z,D);
  let W=1; for(const p of primesBelow(z)) W*=p;
  let bsup=0,bsum=0,bsum2=0;
  for(let y=0;y<W;y++){ let r=0;
    for(let j=0;j<t.n;j++){ const tt=(y-t.c[j])/t.q[j]; r+=t.w[j]*(tt-Math.floor(tt)-0.5); }
    const av=Math.abs(r+t.M/2); if(av>bsup)bsup=av; bsum+=r; bsum2+=r*r; }
  const wres=supRhoWalk(13);
  const ok=Math.abs(bsup-wres.sup)<1e-8 && Math.abs(bsum/W-wres.mean)<1e-8;
  console.log(`  control z=13: brute sup|rho~|=${bsup.toFixed(8)} walk=${wres.sup.toFixed(8)} | brute mean=${(bsum/W).toFixed(8)} walk=${wres.mean.toFixed(8)}  ${ok?'WALKER VERIFIED':'WALKER BROKEN — S1 VOID'}`);
}
console.log('   z          W        n   sup|rho~|   at y      mean (want -M/2)   var walk vs closed    sqrt(2lnW)   C_true    drift');
const SUPR={};
for(const z of [13,17,19,23,29]){
  const r=supRhoWalk(z);
  const row=ROWS[z];
  const c_true=r.sup/(row.rmsr*Math.sqrt(2*row.lnW));
  const meanOK=Math.abs(r.mean+r.M/2)<1e-6, varRel=Math.abs(r.vari-row.rmsr*row.rmsr)/(row.rmsr*row.rmsr);
  SUPR[z]={sup:r.sup,c_true};
  console.log(`  ${String(z).padStart(2)}  ${String(r.W).padStart(11)}  ${String(r.n).padStart(6)}   ${r.sup.toFixed(5).padStart(8)}  ${String(r.argmax).padStart(9)}   ${r.mean.toFixed(7)} ${meanOK?'OK':'BAD'}   ${r.vari.toFixed(5)} vs ${(row.rmsr*row.rmsr).toFixed(5)} (${(varRel*100).toExponential(1)}%)   ${Math.sqrt(2*row.lnW).toFixed(4)}    ${c_true.toFixed(4)}   ${r.drift.toExponential(1)}`);
}
console.log('  C_true = sup|rho~| / (sqrt(<rho^2>) sqrt(2 lnW)): the Gaussian rho law holds');
console.log('  at level z iff C_true <= 1. Full periods only; nothing here is asymptotic.');

// ============================================================================
// S2 cheap columns at z = 37..47, checked against the cited table
// ============================================================================
console.log('\nS2 CHEAP RECHECK of the cited z = 37..47 rows (buildTerms only: n, M, lnW)');
let s2fail=0;
for(const z of [37,41,43,47]){
  err(`  S2 buildTerms z=${z} ... [${el()}]`);
  const D=Math.round(Math.pow(z,S)), t=L.buildTerms(z,D);
  let lnW=0; for(const p of primesBelow(z)) lnW+=Math.log(p);
  const cz=CITED[z];
  const ok=(t.n===cz.N)&&(Math.abs(t.M-cz.M)/cz.M<5e-4)&&(Math.abs(lnW-cz.lnW)<5e-4);
  if(!ok)s2fail++;
  ROWS[z]={need:cz.need,th:cz.th,M:t.M,lnW,rmsr:cz.rmsr,n:t.n,cited:true};
  console.log(`  z=${z}  n=${t.n} (cited ${cz.N})  M=${t.M.toExponential(4)} (cited ${cz.M.toExponential(3)})  lnW=${lnW.toFixed(3)} (cited ${cz.lnW})   ${ok?'MATCH':'MISMATCH'}`);
}
console.log(s2fail? `  S2: ${s2fail} MISMATCH — the cited rows are suspect`
                  : '  S2: cheap fields of all four cited rows reproduce. need/th/rmsr taken as cited.');

// ============================================================================
// S3 THE SUFFICIENCY CURVE
// ============================================================================
console.log('\nS3 SUFFICIENCY CURVE against beta_2 = '+BETA2+'  (all exponents base z; windows in positions)');
console.log('   theta_G      = log_z need, the exponent the Gaussian rho law delivers (cond.)');
console.log('   lambda_max   = beta_2 - theta_G: max extra looseness, in z-exponent, over Gaussian');
console.log('   factor       = z^lambda_max: the same as a multiplicative constant at that z');
console.log('   alpha_max    = log_z((z^beta2*M - 1)/2): absolute ceiling on sup|rho~| itself');
console.log('   d_strict     = theta COST of the T>=1 form over T>=0: ln(1+1/(M*need))/ln z');
console.log('   z   theta_G   lambda_max     factor    alpha_max   d_strict   1/M');
const ZS=[13,17,19,23,29,31,37,41,43,47];
for(const z of ZS){
  const r=ROWS[z], lam=BETA2-r.th, fac=Math.pow(z,lam);
  const smax=(Math.pow(z,BETA2)*r.M-1)/2, amax=Math.log(smax)/Math.log(z);
  const dstrict=Math.log(1+1/(r.M*r.need))/Math.log(z);
  console.log(`  ${String(z).padStart(2)}   ${r.th.toFixed(5)}   ${lam.toFixed(5)}   ${fac.toFixed(1).padStart(9)}    ${amax.toFixed(4)}     ${dstrict.toFixed(5)}   ${(1/r.M).toFixed(1)}`);
}
console.log('  weakest measured point: z = 47, lambda_max = '+(BETA2-ROWS[47].th).toFixed(5)+
  ' (a factor '+Math.pow(47,BETA2-ROWS[47].th).toFixed(0)+'), falling along the ladder.');

// ============================================================================
// S4 THE TRIVIAL LAW, AND THE FITS (estimator calibrated first)
// ============================================================================
console.log('\nS4 TRIVIAL LAW sup|rho~| <= (n + M)/2  ->  need_triv = (n + 1 + M)/M, vs z^beta2');
function ols(xs,ys){ const k=xs.length; let sx=0,sy=0,sxx=0,sxy=0;
  for(let i=0;i<k;i++){sx+=xs[i];sy+=ys[i];sxx+=xs[i]*xs[i];sxy+=xs[i]*ys[i];}
  const b=(k*sxy-sx*sy)/(k*sxx-sx*sx), a=(sy-b*sx)/k;
  let sse=0; for(let i=0;i<k;i++){const e=ys[i]-(a+b*xs[i]); sse+=e*e;}
  const se=Math.sqrt(sse/(k-2)/(sxx-sx*sx/k));
  return {a,b,se};
}
{ // estimator control on known truth, same z points, before any fit is believed
  const xs=ZS.map(z=>Math.log(z)), ys=ZS.map(z=>Math.log(7*Math.pow(z,2.5)));
  const f=ols(xs,ys);
  console.log(`  estimator control: fit of y = 7 z^2.5 at the same 10 z returns slope ${f.b.toFixed(6)} (want 2.500000), intercept ${f.a.toFixed(6)} (want ${Math.log(7).toFixed(6)})  ${Math.abs(f.b-2.5)<1e-9?'PASS':'FAIL — FITS VOID'}`);
}
console.log('   z        n    need_triv       z^beta2     triv/z^beta2  suffices?');
for(const z of ZS){
  const r=ROWS[z], nt=(r.n+1+r.M)/r.M, zb=Math.pow(z,BETA2);
  console.log(`  ${String(z).padStart(2)}  ${String(r.n).padStart(7)}   ${nt.toExponential(4)}   ${zb.toExponential(4)}     ${(nt/zb).toFixed(4).padStart(8)}    ${nt<zb?'YES':'no'}`);
}
{
  const zs=ZS.filter(z=>z>=19);
  const xs=zs.map(z=>Math.log(z));
  const fN=ols(xs,zs.map(z=>Math.log(ROWS[z].n)));
  const fT=ols(xs,zs.map(z=>Math.log((ROWS[z].n+1+ROWS[z].M)/ROWS[z].M)));
  const zcross=Math.exp(fT.a/(BETA2-fT.b));           // solve a + b lnz = beta2 lnz
  console.log(`  fits over z = 19..47 (WINDOW fits, not asymptotics — 8 points over one octave):`);
  console.log(`    d ln n / d ln z         = ${fN.b.toFixed(4)} +/- ${fN.se.toFixed(4)}`);
  console.log(`    d ln need_triv / d ln z = ${fT.b.toFixed(4)} +/- ${fT.se.toFixed(4)}`);
  console.log(`    need_triv = z^beta2 at z ~ ${zcross.toFixed(0)} on the window fit `+
    `(${fT.b>BETA2?'the trivial law dies just past the measured range':'no crossing at fitted slope'})`);
  console.log('  the trivial law suffices at every measured z <= 47 and this is a FINITE-z');
  console.log('  calibration (the Bonferroni x<=227 phenomenon), not a route: its fitted growth');
  console.log('  is above beta_2 and the z^beta2 comparison at small z flatters any bound.');
}

// ============================================================================
// S5 THE FLOOR, AND WHAT THE (31,47] CROSSING PRICES
// ============================================================================
console.log('\nS5 FLOOR: no correct maximal law delivers a window below nP(z) (positivity is');
console.log('   observed only from nP on), so the deliverable exponent band is [th(nP), beta_2).');
console.log('   nP cited from theta-selfconsistent.md; exact at z<=31, prefix lower bound at 47.');
console.log('   z     nP    th(nP)    band width (exponents)   nP/z^2');
for(const z of [13,17,19,23,29,31]){
  const th=Math.log(NP[z])/Math.log(z);
  console.log(`  ${String(z).padStart(2)}  ${String(NP[z]).padStart(5)}   ${th.toFixed(4)}        ${(BETA2-th).toFixed(4)}             ${(NP[z]/(z*z)).toFixed(4)}`);
}
{
  const th=Math.log(NP47_LB)/Math.log(47);
  console.log(`  47  >=${NP47_LB}  >=${th.toFixed(4)}      <=${(BETA2-th).toFixed(4)}             >=${(NP47_LB/(47*47)).toFixed(4)}   (prefix bound)`);
  console.log(`  the (31,47] crossing moves the floor past the z^2 zone budget (th(nP) >= ${th.toFixed(4)} > 2)`);
  console.log(`  but consumes ${(((th-2))/(BETA2-2)*100).toFixed(1)}% of the room between exponent 2 and beta_2 at z = 47:`);
  console.log(`  the crossing kills the TPC-grade target and leaves the beta_2 target ${(BETA2-th).toFixed(3)} exponents wide.`);
}

// ============================================================================
// S6 WHERE THE ROOM CLOSES — two bracketing models, neither called
// ============================================================================
console.log('\nS6 EXTRAPOLATION (two models, BRACKETING; 10 points over one octave decide neither)');
{
  const xs=ZS.map(z=>Math.log(z)), ys=ZS.map(z=>ROWS[z].th);
  const f=ols(xs,ys);
  const zc=Math.exp((BETA2-f.a)/f.b);
  const zlo=Math.exp((BETA2-f.a)/(f.b+f.se)), zhi=Math.exp((BETA2-f.a)/(f.b-f.se));
  console.log(`  model A (linear drift, T4's mechanism persists): theta_G = ${f.a.toFixed(4)} + ${f.b.toFixed(4)}(+/-${f.se.toFixed(4)}) ln z`);
  console.log(`    room closes (theta_G = beta_2) at z ~ ${zc.toExponential(2)}   [slope +/-1se: ${zlo.toExponential(2)} .. ${zhi.toExponential(2)}]`);
  // control: reproduce T4's 9-point slope on the same 9 points (13..43)
  const z9=ZS.filter(z=>z<=43), f9=ols(z9.map(z=>Math.log(z)),z9.map(z=>ROWS[z].th));
  console.log(`    control: slope over T4's nine points 13..43 = ${f9.b.toFixed(4)} +/- ${f9.se.toFixed(4)} (T4 sec.2b: 0.3746 +/- 0.0404)  ${Math.abs(f9.b-0.3746)<0.002?'REPRODUCES':'CHECK'}`);
  const fr=ols(xs,ZS.map(z=>Math.log(ROWS[z].rmsr)));
  const thInf=0.5+fr.b;
  console.log(`  model B (power law in <rho^2>): d ln sqrt<rho^2> / d ln z = ${fr.b.toFixed(4)} +/- ${fr.se.toFixed(4)}`);
  console.log(`    (theta-ladder.md sec.3 records 2.4625 +/- 0.2184 on its own window)`);
  console.log(`    theta_inf = 0.5 + slope = ${thInf.toFixed(2)} +/- ${fr.se.toFixed(2)}  ->  permanent room ${(BETA2-thInf).toFixed(2)} -/+ ${fr.se.toFixed(2)}; never closes if this model holds`);
  console.log('  the two models disagree about the asymptote and the data cannot separate them;');
  console.log('  under BOTH, every measured z has room, and the weakest measured point is z = 47.');
}
console.log('\nDONE '+el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/rho-maxlaw-01-sufficiency.js
//   invocation:  node research/rho-maxlaw-01-sufficiency.js
//   code-sha256: e43b09feabf7267e4decbf48d6f3485f61d2b98a949c97eb5171b04f124458ac
//   out-sha256:  5bc3b0aef035e316ea5bbcd86297faebd9091ee4d6081574b9d5b30d438991b5
//   body-lines:  95
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     67.8 s
// ============================================================================
// S0 CONTROL — conditional (Gaussian-rho) column recomputed from row(z,.,3.0)
//    need = 2*sqrt(2*lnW*<rho^2>)/M (H-free); checked against the embedded tables
//   z=13  n=   852  M=5.584e-2  lnW=7.745  sqrt<rho^2>=1.04645  need=  147.50  th=1.94696   MATCH T4 sec.2
//   z=17  n=  2236  M=4.699e-2  lnW=10.310  sqrt<rho^2>=1.58005  need=  305.40  th=2.01948   MATCH T4 sec.2
//   z=19  n=  4764  M=3.960e-2  lnW=13.143  sqrt<rho^2>=2.22539  need=  576.28  th=2.15885   MATCH theta-ladder sec.2
//   z=23  n=  9636  M=3.417e-2  lnW=16.088  sqrt<rho^2>=2.82533  need=  938.05  th=2.18269   MATCH theta-ladder sec.2
//   z=29  n= 20700  M=3.184e-2  lnW=19.223  sqrt<rho^2>=3.68727  need= 1435.99  th=2.15889   MATCH theta-ladder sec.2
//   z=31  n= 35868  M=2.925e-2  lnW=22.590  sqrt<rho^2>=4.97378  need= 2285.76  th=2.25232   MATCH theta-ladder sec.2
//   S0: all recomputed rows match the embedded tables. Control PASSES.
//
// S1 SUP|RHO| — exact, full period, centered (rho~ = rho + M/2); first direct
//    measurement of the object the law is about (the corpus measured only sup|R_H|)
//   control z=13: brute sup|rho~|=2.62012987 walk=2.62012987 | brute mean=-0.02792208 walk=-0.02792208  WALKER VERIFIED
//    z          W        n   sup|rho~|   at y      mean (want -M/2)   var walk vs closed    sqrt(2lnW)   C_true    drift
//   13         2310     852    2.62013       1666   -0.0279221 OK   1.09507 vs 1.09507 (2.3e-11%)   3.9357    0.6362   9.4e-13
//   17        30030    2236    4.33665      27088   -0.0234932 OK   2.49656 vs 2.49656 (1.3e-10%)   4.5409    0.6044   2.1e-11
//   19       510510    4764    9.15247     458830   -0.0197988 OK   4.95237 vs 4.95237 (4.8e-10%)   5.1270    0.8022   8.4e-11
//   23      9699690    9636   12.10617    3011380   -0.0170846 OK   7.98248 vs 7.98248 (2.5e-9%)   5.6723    0.7554   1.1e-8
//   29    223092870   20700   17.90249   49427920   -0.0159211 OK   13.59597 vs 13.59597 (1.2e-8%)   6.2005    0.7830   4.3e-7
//   C_true = sup|rho~| / (sqrt(<rho^2>) sqrt(2 lnW)): the Gaussian rho law holds
//   at level z iff C_true <= 1. Full periods only; nothing here is asymptotic.
//
// S2 CHEAP RECHECK of the cited z = 37..47 rows (buildTerms only: n, M, lnW)
//   z=37  n=76484 (cited 76484)  M=2.8057e-2 (cited 2.806e-2)  lnW=26.024 (cited 26.024)   MATCH
//   z=41  n=125884 (cited 125884)  M=2.6239e-2 (cited 2.624e-2)  lnW=29.635 (cited 29.635)   MATCH
//   z=43  n=183084 (cited 183084)  M=2.4441e-2 (cited 2.444e-2)  lnW=33.349 (cited 33.349)   MATCH
//   z=47  n=293980 (cited 293980)  M=2.3166e-2 (cited 2.317e-2)  lnW=37.110 (cited 37.11)   MATCH
//   S2: cheap fields of all four cited rows reproduce. need/th/rmsr taken as cited.
//
// S3 SUFFICIENCY CURVE against beta_2 = 4.26645  (all exponents base z; windows in positions)
//    theta_G      = log_z need, the exponent the Gaussian rho law delivers (cond.)
//    lambda_max   = beta_2 - theta_G: max extra looseness, in z-exponent, over Gaussian
//    factor       = z^lambda_max: the same as a multiplicative constant at that z
//    alpha_max    = log_z((z^beta2*M - 1)/2): absolute ceiling on sup|rho~| itself
//    d_strict     = theta COST of the T>=1 form over T>=0: ln(1+1/(M*need))/ln z
//    z   theta_G   lambda_max     factor    alpha_max   d_strict   1/M
//   13   1.94696   2.31949       383.5    2.8712     0.04467   17.9
//   17   2.01948   2.24697       581.8    2.9425     0.02378   21.3
//   19   2.15885   2.10760       495.6    2.9344     0.01457   25.3
//   23   2.18269   2.08376       687.9    2.9685     0.00980   29.3
//   29   2.15889   2.10756      1208.1    3.0369     0.00642   31.4
//   31   2.25232   2.01413      1008.8    3.0361     0.00432   34.2
//   37   2.34513   1.92132      1030.4    3.0848     0.00207   35.6
//   41   2.38567   1.88078      1079.7    3.0995     0.00145   38.1
//   43   2.43473   1.83172       981.9    3.0954     0.00114   40.9
//   47   2.48199   1.78446       963.4    3.1085     0.00079   43.2
//   weakest measured point: z = 47, lambda_max = 1.78446 (a factor 963), falling along the ladder.
//
// S4 TRIVIAL LAW sup|rho~| <= (n + M)/2  ->  need_triv = (n + 1 + M)/M, vs z^beta2
//   estimator control: fit of y = 7 z^2.5 at the same 10 z returns slope 2.500000 (want 2.500000), intercept 1.945910 (want 1.945910)  PASS
//    z        n    need_triv       z^beta2     triv/z^beta2  suffices?
//   13      852   1.5276e+4   5.6570e+4       0.2700    YES
//   17     2236   4.7611e+4   1.7768e+5       0.2680    YES
//   19     4764   1.2034e+5   2.8559e+5       0.4214    YES
//   23     9636   2.8204e+5   6.4527e+5       0.4371    YES
//   29    20700   6.5010e+5   1.7348e+6       0.3747    YES
//   31    35868   1.2262e+6   2.3058e+6       0.5318    YES
//   37    76484   2.7261e+6   4.9052e+6       0.5558    YES
//   41   125884   4.7976e+6   7.6008e+6       0.6312    YES
//   43   183084   7.4909e+6   9.3135e+6       0.8043    YES
//   47   293980   1.2690e+7   1.3612e+7       0.9323    YES
//   fits over z = 19..47 (WINDOW fits, not asymptotics — 8 points over one octave):
//     d ln n / d ln z         = 4.5629 +/- 0.1952
//     d ln need_triv / d ln z = 5.1178 +/- 0.2161
//     need_triv = z^beta2 at z ~ 64 on the window fit (the trivial law dies just past the measured range)
//   the trivial law suffices at every measured z <= 47 and this is a FINITE-z
//   calibration (the Bonferroni x<=227 phenomenon), not a route: its fitted growth
//   is above beta_2 and the z^beta2 comparison at small z flatters any bound.
//
// S5 FLOOR: no correct maximal law delivers a window below nP(z) (positivity is
//    observed only from nP on), so the deliverable exponent band is [th(nP), beta_2).
//    nP cited from theta-selfconsistent.md; exact at z<=31, prefix lower bound at 47.
//    z     nP    th(nP)    band width (exponents)   nP/z^2
//   13     60   1.5963        2.6702             0.3550
//   17    126   1.7070        2.5595             0.4360
//   19    198   1.7960        2.4704             0.5485
//   23    258   1.7710        2.4955             0.4877
//   29    390   1.7718        2.4947             0.4637
//   31    588   1.8569        2.4095             0.6119
//   47  >=2301  >=2.0106      <=2.2559             >=1.0416   (prefix bound)
//   the (31,47] crossing moves the floor past the z^2 zone budget (th(nP) >= 2.0106 > 2)
//   but consumes 0.5% of the room between exponent 2 and beta_2 at z = 47:
//   the crossing kills the TPC-grade target and leaves the beta_2 target 2.256 exponents wide.
//
// S6 EXTRAPOLATION (two models, BRACKETING; 10 points over one octave decide neither)
//   model A (linear drift, T4's mechanism persists): theta_G = 0.9384 + 0.3909(+/-0.0363) ln z
//     room closes (theta_G = beta_2) at z ~ 4.99e+3   [slope +/-1se: 2.42e+3 .. 1.19e+4]
//     control: slope over T4's nine points 13..43 = 0.3747 +/- 0.0405 (T4 sec.2b: 0.3746 +/- 0.0404)  REPRODUCES
//   model B (power law in <rho^2>): d ln sqrt<rho^2> / d ln z = 2.2355 +/- 0.1418
//     (theta-ladder.md sec.3 records 2.4625 +/- 0.2184 on its own window)
//     theta_inf = 0.5 + slope = 2.74 +/- 0.14  ->  permanent room 1.53 -/+ 0.14; never closes if this model holds
//   the two models disagree about the asymptote and the data cannot separate them;
//   under BOTH, every measured z has room, and the weakest measured point is z = 47.
//
// DONE 67.7s
// ============================================================================
// READINGS
//
// 1. CONTROL PASSES. [VERIFIED] All six recomputed conditional rows match the
//    embedded tables digit for digit at their printed precision (theta-ladder
//    sec.2 at z = 19..31, T4 sec.2 at z = 13, 17), and the four cited rows'
//    cheap fields (n, M, lnW) reproduce exactly at z = 37..47. The estimator
//    control returns slope 2.500000 on a known z^2.5 truth.
//
// 2. NEW MEASUREMENT: THE GAUSSIAN RHO LAW HOLDS AT EVERY MEASURED LEVEL, WITH
//    20 TO 40 PERCENT OF MARGIN. [MEASURED] C_true = sup|rho~|/(sqrt(<rho^2>)
//    sqrt(2 lnW)) = 0.6362, 0.6044, 0.8022, 0.7554, 0.7830 at z = 13..29,
//    exact over complete periods (the z = 29 walk covers all 223,092,870
//    positions; walker verified against brute force at z = 13, against the
//    closed-form variance to 1.2e-8 percent, and by period closure to 4.3e-7).
//    This is the first direct measurement of sup|rho| in the corpus — every
//    earlier sup was of R_H. Contrast the SHARP (R_H) law, which is violated
//    at z = 19 (T4 sec.4): the rho law is looser and, so far, true.
//
// 3. THE SUFFICIENCY CURVE. [MEASURED against beta_2 = 4.26645, exponents base
//    z] lambda_max = beta_2 - theta_G runs 2.31949, 2.24697, 2.10760,
//    2.08376, 2.10756, 2.01413, 1.92132, 1.88078, 1.83172, 1.78446 at
//    z = 13..47: a maximal law for rho loose by a factor of 963 beyond the
//    Gaussian form still beats beta_2 at the weakest measured point, z = 47.
//    The curve falls along the ladder at the crude column's drift rate
//    (reading 6).
//
// 4. THE STRICT (T >= 1) ACCOUNTING COSTS NOTHING THAT MATTERS. [MEASURED]
//    The T >= 0 fixed point certifies nothing (theta-selfconsistent reading
//    8); the correct pricing adds 1/M = O(ln^2 z) to the window, i.e.
//    d_strict = 0.04467 falling to 0.00079 in exponent at z = 13..47. It is
//    carried explicitly and never rounds a verdict.
//
// 5. THE TRIVIAL ell-1 LAW ALREADY SUFFICES AT EVERY MEASURED z, AND DIES JUST
//    PAST THE RANGE. [MEASURED, finite-z calibration only] need_triv =
//    (n+1+M)/M is below z^beta2 at all ten levels (ratio 0.2700 rising to
//    0.9323 at z = 47) and its window fit d ln need_triv/d ln z = 5.1178 +/-
//    0.2161 crosses beta_2 at z ~ 64. This is the Bonferroni x <= 227
//    phenomenon at a new instrument: at small z the beta_2 comparison
//    flatters any bound. NOT a route and NOT a headline; it calibrates how
//    little the asymptotic theorem asks near the measured range — the
//    window-fitted ask over triangle-inequality accounting is under one unit
//    of exponent (the fitted slope less beta_2).
//
// 6. WHERE THE ROOM CLOSES IS MODEL-DEPENDENT AND UNDECIDED. [MEASURED, two
//    models, neither called] Model A (theta_G linear in ln z, slope 0.3909 +/-
//    0.0363 over ten points; the nine-point control reproduces T4's 0.3746 +/-
//    0.0404) closes the room at z ~ 4.99e+3 [2.42e+3, 1.19e+4 at +/-1 se].
//    Model B
//    (<rho^2> a power law: slope of ln sqrt<rho^2> = 2.2355 +/- 0.1418,
//    vs
//    theta-ladder sec.3's 2.4625 +/- 0.2184 on its own window) gives theta_inf
//    = 2.74 +/- 0.14 and permanent room 1.53 -/+ 0.14. Ten points over one
//    octave cannot separate a drifting exponent from a constant-times-power;
//    under both models every measured z has room.
//
// 7. THE (31, 47] CROSSING PRICES THE FLOOR, NOT THE CEILING. [MEASURED /
//    CITED] th(nP) >= 2.0106 at z = 47 kills any exponent-2 (zone-budget)
//    deliverable, which is the corrected instrument's crossing; against
//    beta_2 it consumes 0.5 percent of the room between exponent 2 and
//    4.26645, leaving a band 2.256 exponents wide (floor 2.0106, ceiling
//    beta_2) for a provable law to land in. The certificate route died for TPC and is
//    alive, with this much room, for the exponent programme.
