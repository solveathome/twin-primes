// ============================================================================
// rho-exact-z31-01.js — EXACT Lambda AND EXACT sup|rho~| AT z = 31 AND z = 37
// ============================================================================
// TODO item 0's named cheap data, never run: "the decisive cheap data = exact
// Lambda at z = 31/37 (sup|rho~| at z = 31, ~500 s)". Write-up:
// research/history/staging/rho-exact-z31-01.md.
//
// THE OBJECT, UNCHANGED. Same family, same normalisation, same engine as every
// existing exact level (rho-maximal-law.md sec.1, attack-f4weak-01.js header):
// s = 3.0, D = z^s, terms from sift-limit-lemmaV.js buildTerms(z, D) — the
// identical call. rho(y) = sum_j w_j psi((y-c_j)/q_j), psi(t) = t - floor(t) -
// 1/2, period W = P(z) = prod_{p<z} p; rho~ = rho + M/2, M = sum_j w_j/q_j.
// sup|rho~| is the max over ALL W positions of the complete period.
//   Lambda(z) = sum_{e,a} |Theta_e(a)| / (2 sin(pi a/e)),
//   Theta_e(a) = sum_{j: e|q_j} (w_j/q_j) e(-a c_j/e),
// over every conductor e in the mode set and every reduced a mod e; the
// factorised recursion is attack-f4weak-01.js's l1exact verbatim. Parseval:
// sum_{e,a} |chat|^2 = <rho~^2>, which is the in-pass control on Lambda at the
// two NEW levels, where no cited Lambda exists to compare against.
// R_H(x) = rho(x) - rho(x+H) = rho~(x) - rho~(x+H). beta_2 = 4.26645.
// NOTHING here is a new normalisation and no constant is redefined.
//
// WHAT IS NEW IN THE ENGINE, and why it is not a new method. The single-thread
// walker of attack-f4weak-01.js prices z = 37 at ~4.3 h before any H tracking,
// over the compute ceiling. Two changes, neither touching the definition:
//   (a) the period is cut into chunks and each chunk RE-SEEDS exactly, using
//       rho(a) = sum_j w_j psi((a-c_j)/q_j) evaluated in O(n) with an exact
//       integer remainder (a < 2^53 throughout, so (a - c) % q is exact). No
//       drift crosses a chunk boundary and the chunks are independent, so the
//       walk parallelises with the arithmetic untouched.
//   (b) the stamping array is Int32 (the weights are +/-1 integers, so K is an
//       exact small integer) and the block is 2^20 rather than 2^22, so it is
//       L2-resident. Measured 2.2x on its own.
// The z = 29 full period is walked BOTH ways in S0 and the two sups must agree
// to the last printed digit, which is what makes (a) and (b) auditable.
//
// SECTIONS
//   S0  CONTROLS. OLS estimator on a known truth; Lambda(29) against the cited
//       261.555; serial-vs-parallel walker at z = 19 and z = 29; period mean
//       = 0; walker m2 against the PROVEN closed form; cited sup at 13..29.
//   S1  EXACT Lambda at z = 13..37, seven levels (31 and 37 for the first
//       time), each with its Parseval identity against the closed-form
//       <rho~^2> as the correctness control.
//   S2  EXACT sup|rho~| over the complete period at z = 13..37, with period
//       mean, m2, closure drift, and the H-grid sup|R_H| and <R^2>_H.
//   S3  MV(alpha): d ln Lambda / d ln z on 5 points and on 7, with the
//       standard error, and whether beta_2 = 4.26645 sits inside the bar.
//   S4  The sufficiency curve extended: theta_G, lambda_max, C_true (the
//       Gaussian rho law F4 at lambda = 0), and the TRUTH's own exponent
//       theta_true = log_z((2 sup|rho~| + 1)/M).
//   S5  S-sharp, the TPC-implying form. EVERY integer H in 1..640 at z <= 31,
//       which contains phase1-T4-maximal-law.md sec.4's 451-value scan and its
//       recorded failure points, so "last H at which S-sharp fails" means the
//       same thing here as there and the four z <= 23 rows calibrate the engine
//       against known failures. At z = 37 the dense scan prices at ~12 h and a
//       26-value grid to 2048 replaces it; that row is weaker and says so.
//   S6  <rho~^2> against the proven all-z bound FORM I* and against the
//       Chebyshev floors, the ratio table extended with own exact values.
//   S7  VERDICT.
//
// CUSTODY. Cited, custody-bound, never recomputed here: Lambda at z = 13..29
// (attack-f4weak-01.md S3), sup|rho~| at z = 13..29 (rho-maxlaw-01 S1),
// theta_G / need at 31..47 (theta-ladder.md sec.2 via rho-maxlaw-01 S2/S3),
// rmsr at 41..47 (same), the FORM I*/exact endpoints (rho2-analytic-bound.md
// S1), the C_L floor rows (redteam-0828-closures.js R5), T4's S-sharp failure
// points (phase1-T4-maximal-law.md sec.4), beta_2 (paper/beta2-note.md). Each
// is printed beside the recomputation that must match it.
//
// UNITS. rho~, Lambda and the moments are dimensionless; W, H, n in positions
// or counts; every strength is an exponent base z. WIDTH: W < 2^53 at every z
// here (W = 2.0e11 at z = 37), so positions are exact doubles throughout; the
// ladder rows at z >= 41 are cited and carry lnW only.
//
//   node research/rho-exact-z31-01.js    (~113 min; 8 workers; stderr progress)
// ============================================================================
'use strict';
const path=require('path');
const {Worker,isMainThread,parentPort,workerData}=require('worker_threads');
const L=require(path.join(__dirname,'sift-limit-lemmaV.js'));
const S=3.0, BETA2=4.26645, CSC=0.30686, EULER=0.5772156649015329;
const NW=8;                                    // performance cores on this box
const BSHIFT=20;                               // stamping block 2^20, L2-resident
function primesBelow(n){const s=new Uint8Array(n),o=[];for(let i=2;i<n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<n;j+=i)s[j]=1;}}return o;}
function egcd(a,b){if(b===0)return[a,1,0];const[g,x,y]=egcd(b,a%b);return[g,y,x-Math.floor(a/b)*y];}
function periodOf(z){let W=1;for(const p of primesBelow(z))W*=p;return W;}
function lnWof(z){let s=0;for(const p of primesBelow(z))s+=Math.log(p);return s;}
// THE H SCAN. Dense integer H = 1..640 wherever it is affordable (z <= 31):
// that CONTAINS T4's 451-value scan and its recorded failure points 1, 35, 191,
// 197, 227, and it contains the self-consistent window nP(z) = 60, 126, 198,
// 258, 390, 588 at z = 13..31, so "last H at which S-sharp fails" here means
// exactly what it means in phase1-T4-maximal-law.md sec.4. At z = 37 the dense
// scan prices at ~12 h and is replaced by a 26-value GRID to 2048: a null on a
// grid is not a null on a range, and the z = 37 row says so in place.
const HDENSE=Array.from({length:640},(_,i)=>i+1);
const HGRID=[1,2,3,4,6,8,12,16,24,32,35,48,64,96,128,191,197,227,256,384,512,588,768,1024,1536,2048];
const HSof=(z)=>(z<=31?HDENSE:HGRID);
const HCOMMON=[1,35,128,191,197,227,588];      // in BOTH scans, so every level is comparable
const RSHIFT=12, RMASK=(1<<RSHIFT)-1;          // ring buffer 4096 > every H used

// --- exact rho at an arbitrary position, O(n), no accumulated drift ---------
function rhoAt(a,n,q,c,w){let r=0;for(let j=0;j<n;j++){const qj=q[j];let x=(a-c[j])%qj;if(x<0)x+=qj;r+=w[j]*(x/qj-0.5);}return r;}

// --- the chunk walker (runs in a worker; also callable inline) --------------
function walkChunk(t,HS,a0,a1){
  const n=t.n,q=t.q,c=t.c,w=t.w,M=t.M;
  const nH=HS.length, HMAX=HS[nH-1];
  const RB=new Float64Array(1<<RSHIFT);
  const supH=new Float64Array(nH), sqH=new Float64Array(nH);
  const B=1<<BSHIFT, K=new Int32Array(B);
  let v=rhoAt(a0,n,q,c,w);
  let sup=0,s1=0,s2=0,cnt=0;
  {const u=v+M/2;RB[a0&RMASK]=u;const au=u<0?-u:u;if(au>sup)sup=au;s1+=u;s2+=u*u;cnt++;}
  const END=a1-1+HMAX;
  for(let a=a0+1;a<=END;a+=B){
    const len=Math.min(B,END-a+1);
    K.fill(0,0,len);
    for(let j=0;j<n;j++){const qj=q[j],wj=w[j];
      let x0=(c[j]-a)%qj; if(x0<0)x0+=qj;
      for(let i=x0;i<len;i+=qj) K[i]+=wj;}
    for(let i=0;i<len;i++){
      const y=a+i;
      v+=M-K[i];
      const u=v+M/2;
      RB[y&RMASK]=u;
      if(y<a1){const au=u<0?-u:u;if(au>sup)sup=au;s1+=u;s2+=u*u;cnt++;}
      for(let h=0;h<nH;h++){const x=y-HS[h];
        if(x>=a0&&x<a1){const d=RB[x&RMASK]-u,ad=d<0?-d:d;if(ad>supH[h])supH[h]=ad;sqH[h]+=d*d;}}
    }
  }
  const drift=Math.abs(v-rhoAt(END,n,q,c,w));
  return {sup,s1,s2,cnt,supH:Array.from(supH),sqH:Array.from(sqH),drift};
}
if(!isMainThread){
  const {z,chunks}=workerData, HS=HSof(z);
  const t=L.buildTerms(z,Math.round(Math.pow(z,S)));
  parentPort.postMessage(chunks.map(([k,a0,a1])=>[k,walkChunk(t,HS,a0,a1)]));
  return;
}

// --- the single-thread walker of attack-f4weak-01.js, VERBATIM in effect ----
// (Float64 stamping array, block 2^22, one unbroken pass) — the S0 control
// that the chunked Int32 engine changed nothing.
function walkSerial(z){
  const D=Math.round(Math.pow(z,S)), t=L.buildTerms(z,D);
  const n=t.n,q=t.q,c=t.c,w=t.w,M=t.M, W=periodOf(z);
  let r0=0; for(let j=0;j<n;j++){const tt=(-c[j])/q[j]; r0+=w[j]*(tt-Math.floor(tt)-0.5);}
  const B=1<<22, K=new Float64Array(B);
  let v=r0, sup=Math.abs(r0+M/2), s2=(r0+M/2)*(r0+M/2), s1=r0+M/2;
  for(let a=1;a<W;a+=B){
    const len=Math.min(B,W-a);
    K.fill(0,0,len);
    for(let j=0;j<n;j++){const qj=q[j],wj=w[j];
      let x0=(c[j]-a)%qj; if(x0<0)x0+=qj;
      for(let i=x0;i<len;i+=qj) K[i]+=wj;}
    for(let i=0;i<len;i++){v+=M-K[i];const u=v+M/2,au=u<0?-u:u;if(au>sup)sup=au;s1+=u;s2+=u*u;}
  }
  return {sup,mean:s1/W,m2:s2/W,drift:Math.abs(v-rhoAt(W-1,n,q,c,w))};
}

const T0=Date.now(); const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
const err=(m)=>process.stderr.write(m+'\n');
const ZX=[13,17,19,23,29,31,37];               // the exact levels after tonight
const ZS=[13,17,19,23,29,31,37,41,43,47];      // the full ladder (41..47 cited)
// ---- CITED, custody-bound (never recomputed; printed beside the recomputation)
const CITED_LAM={13:9.801,17:25.157,19:60.031,23:121.250,29:261.555};   // attack-f4weak-01 S3
const CITED_SUP={13:2.62013,17:4.33665,19:9.15247,23:12.10617,29:17.90249}; // rho-maxlaw-01 S1
const CITED_TH={13:1.94696,17:2.01948,19:2.15885,23:2.18269,29:2.15889,
  31:2.25232,37:2.34513,41:2.38567,43:2.43473,47:2.48199};              // rho-maxlaw-01 S3
const CITED_RMSR={41:11.99697,43:14.19345,47:18.99742};                 // theta-ladder sec.2
const CITED_M={41:2.624e-2,43:2.444e-2,47:2.317e-2};                    // rho-maxlaw-01 S2
const CITED_CTRUE={13:0.6362,17:0.6044,19:0.8022,23:0.7554,29:0.7830};  // rho-maxlaw-01 S1
const CITED_ISTAR_RATIO={13:2.535e12,47:3.213e14};                      // rho2-analytic-bound S1
const CITED_FLOOR_MEAS={13:0.012,17:0.015,19:0.035,23:0.056,29:0.076,31:0.232,37:0.541,41:1.474,43:5.000,47:15.346};
const CITED_FLOOR_ABS ={13:0.012,17:0.011,19:0.020,23:0.028,29:0.032,31:0.080,37:0.123,41:0.282,43:0.852,47:2.155};
const T4_LASTFAIL={13:1,17:35,19:227,23:197,29:'none'};                 // phase1-T4 sec.4
const CITED_MVSLOPE={b:4.214,se:0.304};                                 // attack-f4weak-01 S3

function ols(xs,ys){const k=xs.length;let sx=0,sy=0,sxx=0,sxy=0;
  for(let i=0;i<k;i++){sx+=xs[i];sy+=ys[i];sxx+=xs[i]*xs[i];sxy+=xs[i]*ys[i];}
  const b=(k*sxy-sx*sy)/(k*sxx-sx*sx), a=(sy-b*sx)/k;
  let ss=0; for(let i=0;i<k;i++){const r=ys[i]-a-b*xs[i]; ss+=r*r;}
  const se=k>2?Math.sqrt(ss/(k-2)/(sxx-sx*sx/k)):NaN;
  return {a,b,se};}
function fitExp(zs,vs){return ols(zs.map(z=>Math.log(z)),vs.map(v=>Math.log(v)));}
const pad=(x,w)=>String(x).padStart(w);

// ============================================================================
// S1 engine: exact Lambda (attack-f4weak-01.js l1exact, verbatim algorithm)
// ============================================================================
function sweep(z){
  const D=Math.round(Math.pow(z,S)), t=L.buildTerms(z,D);
  const n=t.n,q=t.q,w=t.w,d1=t.d1,ps=t.ps;
  const EM=new Map(); const plist=[];
  for(let i=0;i<n;i++){
    const qi=q[i]; plist.length=0;
    for(const p of ps) if(qi%p===0) plist.push(p);
    const wi=w[i]/qi, dd=d1[i], np=plist.length;
    for(let sm=1;sm<(1<<np);sm++){
      let e=1,e1=1;
      for(let b=0;b<np;b++) if(sm&(1<<b)){const p=plist[b]; e*=p; if(dd%p===0)e1*=p;}
      let m1=EM.get(e); if(!m1){m1=new Map();EM.set(e,m1);}
      m1.set(e1,(m1.get(e1)||0)+wi);
    }
  }
  return {t,EM,ps};
}
function l1exact(z){
  const r=sweep(z), EM=r.EM, ps=r.ps;
  let maxE=0; for(const [e] of EM) if(e>maxE)maxE=e;
  const cosT=new Float64Array(maxE), sinT=new Float64Array(maxE), cop=new Uint8Array(maxE+1);
  let Lam=0,par=0,tot=0,nz=0;
  const rs=[],vs=[];
  for(const [e,m1] of EM){
    rs.length=0; vs.length=0;
    for(const [e1,V] of m1){ const e2=e/e1; let k=0;
      if(e2>1){ const [,i0]=egcd(((e1%e2)+e2)%e2,e2); const inv=((i0%e2)+e2)%e2; k=(2*inv*(e/e2))%e; }
      rs.push(k); vs.push(V); }
    if(e===2){ let re=0; for(let d=0;d<rs.length;d++) re+=vs[d]*Math.cos(Math.PI*rs[d]);
      const th=Math.abs(re), cA=th/2; Lam+=cA; par+=cA*cA; tot++; if(th>1e-14)nz++; continue; }
    for(let k2=0;k2<e;k2++){const t2=2*Math.PI*k2/e; cosT[k2]=Math.cos(t2); sinT[k2]=Math.sin(t2);}
    cop.fill(1,0,e); cop[0]=0;
    for(const p of ps) if(e%p===0) for(let x=0;x<e;x+=p) cop[x]=0;
    const half=(e-1)>>1, nd=rs.length;
    for(let a=1;a<=half;a++){
      if(!cop[a]) continue;
      let re=0,im=0;
      for(let d=0;d<nd;d++){const k2=(a*rs[d])%e; re+=vs[d]*cosT[k2]; im+=vs[d]*sinT[k2];}
      const th=Math.sqrt(re*re+im*im), sn=Math.sin(Math.PI*a/e), cA=th/(2*sn);
      Lam+=2*cA; par+=2*cA*cA; tot+=2; if(th>1e-14)nz+=2;
    }
  }
  return {Lam,par,tot,nz};
}

// ============================================================================
// S2 engine: the full-period walk, chunked and parallel
// ============================================================================
function walkParallel(z){
  const W=periodOf(z), HS=HSof(z);
  const NCH=Math.max(1,Math.min(1024,Math.ceil(W/5e7)));
  const step=Math.ceil(W/NCH), chunks=[];
  for(let k=0,a=0;a<W;k++,a+=step) chunks.push([k,a,Math.min(a+step,W)]);
  const lots=[]; for(let i=0;i<Math.min(NW,chunks.length);i++) lots.push([]);
  chunks.forEach((ch,i)=>lots[i%lots.length].push(ch));
  return new Promise((resolve,reject)=>{
    const out=new Array(chunks.length); let live=lots.length, doneCh=0;
    lots.forEach(lot=>{
      const wk=new Worker(__filename,{workerData:{z,chunks:lot}});
      wk.on('message',(msg)=>{for(const [k,r] of msg) out[k]=r;
        doneCh+=msg.length; err(`  S2 walk z=${z}: ${doneCh}/${chunks.length} chunks [${el()}]`);
        wk.terminate();});
      wk.on('error',reject);
      wk.on('exit',()=>{ if(--live===0){
        let sup=0,s1=0,s2=0,cnt=0,drift=0;
        const supH=HS.map(()=>0), sqH=HS.map(()=>0);
        for(const r of out){ if(r.sup>sup)sup=r.sup; s1+=r.s1; s2+=r.s2; cnt+=r.cnt;
          if(r.drift>drift)drift=r.drift;
          for(let h=0;h<HS.length;h++){ if(r.supH[h]>supH[h])supH[h]=r.supH[h]; sqH[h]+=r.sqH[h]; } }
        resolve({W,NCH,HS,sup,mean:s1/cnt,m2:s2/cnt,cnt,drift,
          supH,msH:sqH.map(x=>x/cnt)});
      }});
    });
  });
}

// ============================================================================
(async function main(){
const TERMS={}, LNW={}, MM={}, MS={}, MSH={};
for(const z of ZX){ const t=L.buildTerms(z,Math.round(Math.pow(z,S)));
  TERMS[z]=t; MM[z]=t.M; LNW[z]=lnWof(z); }
for(const z of ZS.filter(z=>z>=41)){ LNW[z]=lnWof(z); MM[z]=CITED_M[z]; }

// ---- COMPUTE (printing is ordered below; the walks are done once and reused) --
for(const z of ZX){ err(`  closed form (meanSquare, O(n^2)) z=${z} ... [${el()}]`);
  const o=L.meanSquare(TERMS[z],128); MS[z]=o.rho2; MSH[z]=o.ms; }
const EX={};
for(const z of ZX){ err(`  exact Lambda z=${z} ... [${el()}]`); EX[z]=l1exact(z); }
const WK={};
for(const z of ZX){ err(`  full-period walk z=${z} launching ... [${el()}]`); WK[z]=await walkParallel(z); }
err(`  serial control walker z=19, 29 ... [${el()}]`);
const SER={19:walkSerial(19),29:walkSerial(29)};

console.log('S0 CONTROLS');
{ const zs=ZX, f=ols(zs.map(z=>Math.log(z)),zs.map(z=>Math.log(7*Math.pow(z,2.5))));
  console.log(`  OLS control: y = 7 z^2.5 returns slope ${f.b.toFixed(6)} (want 2.500000)  ${Math.abs(f.b-2.5)<1e-9?'PASS':'FAIL — EVERY FIT IN THIS FILE IS VOID'}`); }
{ let ok=true, worst=0;
  for(const z of ZX){ const ex=EX[z];
    const rel=Math.abs(ex.par-MS[z])/MS[z]; if(rel>worst)worst=rel;
    if(z<=29 && Math.abs(ex.Lam-CITED_LAM[z])>5.1e-4) ok=false; }   // cited to 3 dp
  console.log(`  Parseval control: sum|chat|^2 vs the PROVEN closed-form <rho~^2>, worst rel over z = 13..37: ${worst.toExponential(1)}  ${worst<1e-9?'PASS':'FAIL'}`);
  console.log(`  Lambda control:   recomputed Lambda MATCHES the cited 9.801/25.157/60.031/121.250/261.555 at z = 13..29 (3 dp, the cited precision)  ${ok?'PASS':'FAIL'}`); }
{ const a=SER[19], b=SER[29], pa=WK[19], pb=WK[29];
  const d19=Math.abs(a.sup-pa.sup), d29=Math.abs(b.sup-pb.sup);
  console.log(`  ENGINE control (the only new thing in this file): the single-thread Float64/2^22 walker of attack-f4weak-01.js`);
  console.log(`    vs the chunked Int32/2^20 parallel walker, full period:  z=19 sup ${a.sup.toFixed(6)} vs ${pa.sup.toFixed(6)} (diff ${d19.toExponential(1)});`);
  console.log(`    z=29 sup ${b.sup.toFixed(6)} vs ${pb.sup.toFixed(6)} (diff ${d29.toExponential(1)});`);
  console.log(`    the two engines must agree to within the SERIAL walker's own accumulated float drift, which is ${a.drift.toExponential(1)} at z=19 and ${b.drift.toExponential(1)} at z=29`);
  console.log(`    (the chunked engine re-seeds exactly and carries ${pa.drift.toExponential(1)} / ${pb.drift.toExponential(1)}):  ${d19<=Math.max(a.drift,1e-12)&&d29<=Math.max(b.drift,1e-12)?'PASS — the engine change is arithmetically inert':'FAIL'}`); }
console.log(`  cited beta_2 = ${BETA2} (paper/beta2-note.md); s = ${S}. H scan: DENSE integer 1..640 at z <= 31 (contains T4's 451-value scan`);
console.log(`    and its failure points 1, 35, 191, 197, 227, and the windows nP = 60..588); a 26-value GRID to 2048 at z = 37, where dense prices at ~12 h.`);

console.log('\nS1 EXACT Lambda = sum_{e,a} |Theta_e(a)|/(2 sin(pi a/e))  — z = 31 and z = 37 for the first time');
console.log('   the Parseval column is the control: sum|chat|^2 must equal the PROVEN closed-form <rho~^2> (sift-limit-lemmaV meanSquare)');
console.log('    z    Lambda (exact)     cited        Parseval sum|chat|^2   closed-form <rho~^2>   rel      nonzero/total modes');
const LAM={};
for(const z of ZX){ const ex=EX[z]; LAM[z]=ex.Lam;
  const rel=Math.abs(ex.par-MS[z])/MS[z];
  console.log(`   ${pad(z,2)}   ${ex.Lam.toFixed(3).padStart(12)}   ${(CITED_LAM[z]!==undefined?CITED_LAM[z].toFixed(3):'—  NEW').padStart(9)}    ${ex.par.toFixed(6).padStart(14)}       ${MS[z].toFixed(6).padStart(12)}     ${rel.toExponential(1)}   ${ex.nz}/${ex.tot}`); }

console.log('\nS2 EXACT sup|rho~| OVER THE COMPLETE PERIOD — z = 31 and z = 37 for the first time');
console.log('   controls in every row: period mean must be 0 (proven: each psi term averages -1/(2q), so <rho~> = 0);');
console.log('   walked m2 against the PROVEN closed form; |rho(END) - walked| is the closure drift of the worst chunk.');
console.log('    z          W          chunks    sup|rho~|      cited      period mean    walked m2      closed form    rel        max drift');
for(const z of ZX){ const r=WK[z];
  const rel=Math.abs(r.m2-MS[z])/MS[z];
  console.log(`   ${pad(z,2)}  ${pad(r.W,14)}  ${pad(r.NCH,5)}   ${r.sup.toFixed(6).padStart(11)}  ${(CITED_SUP[z]!==undefined?CITED_SUP[z].toFixed(5):'—  NEW').padStart(9)}   ${r.mean.toExponential(2).padStart(10)}   ${r.m2.toFixed(6).padStart(12)}  ${MS[z].toFixed(6).padStart(12)}   ${rel.toExponential(1)}   ${r.drift.toExponential(1)}`); }

console.log('\nS3 MV(alpha):  Lambda(z) <= C z^alpha with alpha < beta_2 implies RML(alpha) outright (attack-f4weak-01 reading 7,');
console.log('   confirmed airtight by redteam-0821-wave2-analytic sec.(a)). The measured slope, before and after the two new points:');
{ const z5=[13,17,19,23,29], f5=fitExp(z5,z5.map(z=>LAM[z]));
  const z6=[13,17,19,23,29,31], f6=fitExp(z6,z6.map(z=>LAM[z]));
  const z7=ZX, f7=fitExp(z7,z7.map(z=>LAM[z]));
  const rows=[['5 pts, 13..29 (the standing fit)',f5],['6 pts, 13..31',f6],['7 pts, 13..37 (this file)',f7]];
  console.log('    window                          slope     1se      bar [b-se, b+se]        beta_2 inside?   2se bar                 inside?');
  for(const [tag,f] of rows){
    const in1=(BETA2>=f.b-f.se&&BETA2<=f.b+f.se), in2=(BETA2>=f.b-2*f.se&&BETA2<=f.b+2*f.se);
    console.log(`    ${tag.padEnd(31)} ${f.b.toFixed(4)}   ${f.se.toFixed(4)}   [${(f.b-f.se).toFixed(4)}, ${(f.b+f.se).toFixed(4)}]      ${in1?'INSIDE ':'OUTSIDE'}          [${(f.b-2*f.se).toFixed(4)}, ${(f.b+2*f.se).toFixed(4)}]     ${in2?'INSIDE':'OUTSIDE'}`); }
  console.log(`    standing cited value (attack-f4weak-01 S3): ${CITED_MVSLOPE.b} +/- ${CITED_MVSLOPE.se}; recomputed 5-pt fit ${f5.b.toFixed(3)} +/- ${f5.se.toFixed(3)}  ${Math.abs(f5.b-CITED_MVSLOPE.b)<1e-3&&Math.abs(f5.se-CITED_MVSLOPE.se)<1e-3?'MATCH':'MISMATCH'}`);
  console.log('    local slopes d ln Lambda / d ln z between consecutive levels (the reason no single power is quoted):');
  let line='      ';
  for(let i=1;i<ZX.length;i++){const a=ZX[i-1],b=ZX[i];
    line+=`${a}->${b}: ${(Math.log(LAM[b]/LAM[a])/Math.log(b/a)).toFixed(2)}   `;}
  console.log(line);
  console.log('    leave-one-out slopes on the 7-point window (the fit\'s dependence on any single level):');
  let l2='      ';
  for(const drop of ZX){const zz=ZX.filter(z=>z!==drop); const ff=fitExp(zz,zz.map(z=>LAM[z]));
    l2+=`-${drop}: ${ff.b.toFixed(3)}  `;}
  console.log(l2); }

console.log('\nS4 THE SUFFICIENCY CURVE AND THE GAUSSIAN rho LAW, EXTENDED');
console.log('   theta_G   = log_z(need), need = 2 sqrt(2 lnW <rho~^2>)/M — the exponent the Gaussian law delivers (F4 at lambda = 0)');
console.log('   C_true    = sup|rho~| / (sqrt(<rho~^2>) sqrt(2 lnW)) — the Gaussian rho law holds at this level iff C_true <= 1');
console.log('   theta_true= log_z((2 sup|rho~| + 1)/M) — the exponent the TRUTH delivers, strict T >= 1 accounting');
console.log('   alpha_true= log_z(sup|rho~|) — the finite-z exponent of the RML object itself');
console.log('    z    lnW      M          sqrt<rho~^2>   sup|rho~|    theta_G   cited     lambda_max   C_true    cited     alpha_true  theta_true  smax        sup<=smax');
const TAB={};
for(const z of ZS){
  const lnW=LNW[z], M=MM[z];
  const ms=(z<=37)?MS[z]:CITED_RMSR[z]*CITED_RMSR[z];
  const need=2*Math.sqrt(2*lnW*ms)/M, thG=Math.log(need)/Math.log(z);
  const smax=(Math.pow(z,BETA2)*M-1)/2;
  const sup=(z<=37)?WK[z].sup:NaN;
  const Ct=sup/(Math.sqrt(ms)*Math.sqrt(2*lnW));
  const aT=Math.log(sup)/Math.log(z), thT=Math.log((2*sup+1)/M)/Math.log(z);
  TAB[z]={lnW,M,ms,need,thG,smax,sup,Ct,aT,thT};
  const f=(x,d,w)=>(isNaN(x)?'—'.padStart(w):x.toFixed(d).padStart(w));
  console.log(`   ${pad(z,2)}  ${lnW.toFixed(3).padStart(6)}  ${M.toExponential(3)}   ${Math.sqrt(ms).toFixed(5).padStart(9)}   ${f(sup,5,10)}   ${thG.toFixed(5)}   ${CITED_TH[z].toFixed(5)}    ${(BETA2-thG).toFixed(5)}     ${f(Ct,4,7)}   ${(CITED_CTRUE[z]!==undefined?CITED_CTRUE[z].toFixed(4):'—').padStart(7)}   ${f(aT,4,8)}    ${f(thT,4,8)}   ${smax.toExponential(3)}   ${isNaN(sup)?'—':(sup<=smax?'Y':'n')}`);
}
{ const zz=ZX, fA=fitExp(zz,zz.map(z=>TAB[z].sup)), fC=fitExp(zz,zz.map(z=>TAB[z].Ct));
  const z5=[13,17,19,23,29], f5=fitExp(z5,z5.map(z=>TAB[z].sup));
  console.log(`    d ln sup|rho~| / d ln z = ${f5.b.toFixed(3)} +/- ${f5.se.toFixed(3)} (5 pts) -> ${fA.b.toFixed(3)} +/- ${fA.se.toFixed(3)} (7 pts)   vs beta_2 = ${BETA2}: the TRUTH's own growth`);
  console.log(`    d ln C_true / d ln z    = ${fC.b.toFixed(3)} +/- ${fC.se.toFixed(3)} (7 pts); C_true = 1 (the Gaussian rho law breaking) at z ~ ${Math.exp((0-fC.a)/fC.b).toExponential(2)} on this fit`);
  console.log(`    theta_G recomputation vs the cited ladder: worst |recomputed - cited| over the ten levels = ${Math.max(...ZS.map(z=>Math.abs(TAB[z].thG-CITED_TH[z]))).toExponential(1)}`);
  const bad=ZX.filter(z=>TAB[z].Ct>1);
  console.log(`    GAUSSIAN rho LAW (F4, lambda = 0, C = 1): ${bad.length===0?'HOLDS at all seven exact levels':'VIOLATED at z = '+bad.join(', ')}`); }

console.log('\nS5 S-sharp (TPC-implying):  sup_x |R_H(x)| <= sqrt(2 lnW) sqrt(<R^2>_H).  Exact sup over the COMPLETE period at every level.');
console.log('   ratio(H) = sup|R_H| / (sqrt(2 lnW) sqrt(<R^2>_H)); the law FAILS at H iff ratio > 1. <R^2>_H is walked and checked at H = 128');
console.log('   against the PROVEN closed form (sift-limit-lemmaV meanSquare). z <= 31 scans every integer H in 1..640; z = 37 scans a 26-value grid.');
console.log('    z   scan            <R^2>_128 walked / closed form (rel)   #fail    worst ratio (H)     LAST H failing   T4 sec.4   ratios at H = 1, 35, 128, 191, 197, 227, 588');
for(const z of ZX){
  const r=WK[z], lnW=LNW[z], g=Math.sqrt(2*lnW), HSz=r.HS;
  const i128=HSz.indexOf(128), rel=Math.abs(r.msH[i128]-MSH[z])/MSH[z];
  let nf=0, worst=0, wh=0, lastH=0;
  const rat=HSz.map((h,i)=>{const v=r.supH[i]/(g*Math.sqrt(r.msH[i]));
    if(v>1){nf++; if(h>lastH)lastH=h;} if(v>worst){worst=v;wh=h;} return v;});
  const pick=HCOMMON.map(h=>rat[HSz.indexOf(h)].toFixed(4)).join(' ');
  const scan=(z<=31?'dense 1..640':'grid to 2048');
  console.log(`   ${pad(z,2)}  ${scan.padEnd(13)}   ${r.msH[i128].toFixed(6)} / ${MSH[z].toFixed(6)} (${rel.toExponential(1)})   ${pad(nf,3)}/${pad(HSz.length,3)}   ${worst.toFixed(4)} (H=${pad(wh,4)})       ${pad(lastH||'none',5)}        ${pad(T4_LASTFAIL[z]===undefined?'—':T4_LASTFAIL[z],5)}      ${pick}`);
}
console.log('   the T4 column is phase1-T4-maximal-law.md sec.4\'s "last H at which S-sharp fails", produced by UNCOMMITTED scratch scripts');
console.log('   (that note sec.0 lists t4-sup.js et al. as not committed), so it is a cited number with no reproducible producer behind it.');
console.log('\nS6 <rho~^2>: the exact values at the two new levels against the PROVEN all-z bound and the Chebyshev floors');
console.log('   FORM I* = (27/16) e^{8 gamma} z^{2s} ln^8 z (1 + 1/(2 ln^2 z))^8, constant 170.88 (rho2-analytic-bound.md; PROVEN, with the');
console.log('   Rosser-Schoenfeld validity floor that note flags — the ratio is a calibration of looseness, not a certificate).');
console.log('   floor rows, both against smax = (z^beta2 M - 1)/2:  R1f = (3 W <rho~^2>)^{1/3} [C_L = 1, measured ms];  (3W)^{1/3} [C_L = ms = 1, the absolute floor]');
console.log('    z     <rho~^2> (own exact / cited)   FORM I*        I*/exact      R1f/smax   cited    (3W)^{1/3}/smax  cited    source');
for(const z of ZS){
  const lnz=Math.log(z), ms=(z<=37)?MS[z]:CITED_RMSR[z]*CITED_RMSR[z];
  const Istar=(27/16)*Math.exp(8*EULER)*Math.pow(z,2*S)*Math.pow(lnz,8)*Math.pow(1+1/(2*lnz*lnz),8);
  const lnWz=LNW[z], smax=(Math.pow(z,BETA2)*MM[z]-1)/2;
  const R1f=Math.exp((Math.log(3)+lnWz+Math.log(ms))/3), abs=Math.exp((Math.log(3)+lnWz)/3);
  console.log(`   ${pad(z,2)}   ${ms.toFixed(6).padStart(14)}   ${Istar.toExponential(4)}   ${(Istar/ms).toExponential(3)}    ${(R1f/smax).toFixed(3).padStart(7)}   ${CITED_FLOOR_MEAS[z].toFixed(3)}    ${(abs/smax).toFixed(3).padStart(7)}         ${CITED_FLOOR_ABS[z].toFixed(3)}    ${z<=37?'own exact':'cited rmsr^2'}`);
}
{ const c13=(27/16)*Math.exp(8*EULER)*Math.pow(13,2*S)*Math.pow(Math.log(13),8)*Math.pow(1+1/(2*Math.log(13)*Math.log(13)),8)/MS[13];
  console.log(`   control: I*/exact at z = 13 = ${c13.toExponential(3)} vs the cited ${CITED_ISTAR_RATIO[13].toExponential(3)}  ${Math.abs(c13/CITED_ISTAR_RATIO[13]-1)<2e-3?'MATCH':'MISMATCH'}`); }

console.log('\nS7 VERDICT');
{ const z5=[13,17,19,23,29], f5=fitExp(z5,z5.map(z=>LAM[z])), f7=fitExp(ZX,ZX.map(z=>LAM[z]));
  const in5=(BETA2>=f5.b-f5.se&&BETA2<=f5.b+f5.se), in7=(BETA2>=f7.b-f7.se&&BETA2<=f7.b+f7.se);
  console.log(`  (a) Lambda(31) = ${LAM[31].toFixed(3)} and Lambda(37) = ${LAM[37].toFixed(3)}, exact, Parseval-controlled. MV(alpha)'s slope moves`);
  console.log(`      ${f5.b.toFixed(3)} +/- ${f5.se.toFixed(3)} (5 pts) -> ${f7.b.toFixed(3)} +/- ${f7.se.toFixed(3)} (7 pts); beta_2 = ${BETA2} is ${in5?'INSIDE':'OUTSIDE'} the old bar and ${in7?'INSIDE':'OUTSIDE'} the new one.`);
  console.log(`      MEASURED, seven points over one octave of z. A slope is not a bound: MV(alpha) needs a uniform C and all z, and neither is here.`);
  console.log(`  (b) sup|rho~|(31) = ${WK[31].sup.toFixed(6)} and sup|rho~|(37) = ${WK[37].sup.toFixed(6)}, exact over complete periods of ${WK[31].W} and ${WK[37].W} positions.`);
  console.log(`      C_true = ${TAB[31].Ct.toFixed(4)} and ${TAB[37].Ct.toFixed(4)}: the Gaussian rho law (F4, C = 1) is ${TAB[31].Ct<=1&&TAB[37].Ct<=1?'TRUE at both new levels':'VIOLATED'}.`);
  console.log(`      The truth's own exponent alpha_true = log_z sup|rho~| reads ${TAB[31].aT.toFixed(4)} and ${TAB[37].aT.toFixed(4)} against the ceiling alpha_max ~ 3.1.`);
  const shf=ZX.filter(z=>{const r=WK[z],g=Math.sqrt(2*LNW[z]);return r.HS.some((h,i)=>r.supH[i]/(g*Math.sqrt(r.msH[i]))>1);});
  console.log(`  (c) S-sharp fails on the grid at z = ${shf.length?shf.join(', '):'(nowhere)'}; T4 records failures at 13, 17, 19, 23 and none at 29.`);
  console.log(`  (d) Nothing here bounds G2(z#). Two exact points on a measured curve; RML(alpha) is open at every alpha, as before.`);
}
err(`DONE [${el()}]`);
})().catch(e=>{console.error(e);process.exit(1);});

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/rho-exact-z31-01.js
//   invocation:  node research/rho-exact-z31-01.js
//   code-sha256: 433689f5c85221438a53359c665d1cd78030d4f3baf39d46e0dcc61ffe16f39d
//   out-sha256:  b0519fcd9503067757d01bee63f472f594be0b8915ecea85e49459007358e4ed
//   body-lines:  108
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     6928.4 s
// ============================================================================
// S0 CONTROLS
//   OLS control: y = 7 z^2.5 returns slope 2.500000 (want 2.500000)  PASS
//   Parseval control: sum|chat|^2 vs the PROVEN closed-form <rho~^2>, worst rel over z = 13..37: 6.0e-10  PASS
//   Lambda control:   recomputed Lambda MATCHES the cited 9.801/25.157/60.031/121.250/261.555 at z = 13..29 (3 dp, the cited precision)  PASS
//   ENGINE control (the only new thing in this file): the single-thread Float64/2^22 walker of attack-f4weak-01.js
//     vs the chunked Int32/2^20 parallel walker, full period:  z=19 sup 9.152470 vs 9.152470 (diff 1.8e-15);
//     z=29 sup 17.902491 vs 17.902491 (diff 8.7e-8);
//     the two engines must agree to within the SERIAL walker's own accumulated float drift, which is 8.4e-11 at z=19 and 4.3e-7 at z=29
//     (the chunked engine re-seeds exactly and carries 8.4e-11 / 8.7e-8):  PASS — the engine change is arithmetically inert
//   cited beta_2 = 4.26645 (paper/beta2-note.md); s = 3. H scan: DENSE integer 1..640 at z <= 31 (contains T4's 451-value scan
//     and its failure points 1, 35, 191, 197, 227, and the windows nP = 60..588); a 26-value GRID to 2048 at z = 37, where dense prices at ~12 h.
//
// S1 EXACT Lambda = sum_{e,a} |Theta_e(a)|/(2 sin(pi a/e))  — z = 31 and z = 37 for the first time
//    the Parseval column is the control: sum|chat|^2 must equal the PROVEN closed-form <rho~^2> (sift-limit-lemmaV meanSquare)
//     z    Lambda (exact)     cited        Parseval sum|chat|^2   closed-form <rho~^2>   rel      nonzero/total modes
//    13          9.801       9.801          1.095066           1.095066     1.7e-14   2309/2309
//    17         25.157      25.157          2.496563           2.496563     3.0e-14   30029/30029
//    19         60.031      60.031          4.952375           4.952375     5.2e-14   510509/510509
//    23        121.250     121.250          7.982480           7.982480     5.2e-13   2649449/2649449
//    29        261.555     261.555         13.595974          13.595974     2.1e-12   16361861/20889221
//    31        476.314      —  NEW         24.738489          24.738489     1.8e-11   58833197/82074413
//    37       1286.338      —  NEW         85.677253          85.677253     6.0e-10   521636733/548519825
//
// S2 EXACT sup|rho~| OVER THE COMPLETE PERIOD — z = 31 and z = 37 for the first time
//    controls in every row: period mean must be 0 (proven: each psi term averages -1/(2q), so <rho~> = 0);
//    walked m2 against the PROVEN closed form; |rho(END) - walked| is the closure drift of the worst chunk.
//     z          W          chunks    sup|rho~|      cited      period mean    walked m2      closed form    rel        max drift
//    13            2310      1      2.620130    2.62013     4.68e-13       1.095066      1.095066   2.3e-13   1.2e-12
//    17           30030      1      4.336647    4.33665     1.04e-11       2.496563      2.496563   1.3e-12   2.1e-11
//    19          510510      1      9.152470    9.15247     4.18e-11       4.952375      4.952375   4.8e-12   8.4e-11
//    23         9699690      1     12.106173   12.10617      5.38e-9       7.982480      7.982480   2.5e-11   1.1e-8
//    29       223092870      5     17.902491   17.90249      4.33e-8      13.595974     13.595974   1.8e-10   8.7e-8
//    31      6469693230    130     28.122062     —  NEW      4.92e-8      24.738489     24.738489   2.7e-12   9.9e-8
//    37    200560490130   1024     52.219092     —  NEW     -1.24e-7      85.677253     85.677253   3.8e-12   2.5e-7
//
// S3 MV(alpha):  Lambda(z) <= C z^alpha with alpha < beta_2 implies RML(alpha) outright (attack-f4weak-01 reading 7,
//    confirmed airtight by redteam-0821-wave2-analytic sec.(a)). The measured slope, before and after the two new points:
//     window                          slope     1se      bar [b-se, b+se]        beta_2 inside?   2se bar                 inside?
//     5 pts, 13..29 (the standing fit) 4.2144   0.3039   [3.9105, 4.5183]      INSIDE           [3.6066, 4.8223]     INSIDE
//     6 pts, 13..31                   4.3651   0.2411   [4.1239, 4.6062]      INSIDE           [3.8828, 4.8473]     INSIDE
//     7 pts, 13..37 (this file)       4.5656   0.2173   [4.3482, 4.7829]      OUTSIDE          [4.1309, 5.0002]     INSIDE
//     standing cited value (attack-f4weak-01 S3): 4.214 +/- 0.304; recomputed 5-pt fit 4.214 +/- 0.304  MATCH
//     local slopes d ln Lambda / d ln z between consecutive levels (the reason no single power is quoted):
//       13->17: 3.51   17->19: 7.82   19->23: 3.68   23->29: 3.32   29->31: 8.99   31->37: 5.62
//     leave-one-out slopes on the 7-point window (the fit's dependence on any single level):
//       -13: 4.701  -17: 4.476  -19: 4.613  -23: 4.566  -29: 4.672  -31: 4.561  -37: 4.365
//
// S4 THE SUFFICIENCY CURVE AND THE GAUSSIAN rho LAW, EXTENDED
//    theta_G   = log_z(need), need = 2 sqrt(2 lnW <rho~^2>)/M — the exponent the Gaussian law delivers (F4 at lambda = 0)
//    C_true    = sup|rho~| / (sqrt(<rho~^2>) sqrt(2 lnW)) — the Gaussian rho law holds at this level iff C_true <= 1
//    theta_true= log_z((2 sup|rho~| + 1)/M) — the exponent the TRUTH delivers, strict T >= 1 accounting
//    alpha_true= log_z(sup|rho~|) — the finite-z exponent of the RML object itself
//     z    lnW      M          sqrt<rho~^2>   sup|rho~|    theta_G   cited     lambda_max   C_true    cited     alpha_true  theta_true  smax        sup<=smax
//    13   7.745  5.584e-2     1.04645      2.62013   1.94696   1.94696    2.31949      0.6362    0.6362     0.3755      1.8387   1.579e+3   Y
//    17  10.310  4.699e-2     1.58005      4.33665   2.01948   2.01948    2.24697      0.6044    0.6044     0.5178      1.8803   4.174e+3   Y
//    19  13.143  3.960e-2     2.22539      9.15247   2.15885   2.15885    2.10760      0.8022    0.8022     0.7519      2.1020   5.654e+3   Y
//    23  16.088  3.417e-2     2.82533     12.10617   2.18269   2.18269    2.08376      0.7554    0.7554     0.7953      2.1061   1.102e+4   Y
//    29  19.223  3.184e-2     3.68727     17.90249   2.15889   2.15889    2.10756      0.7830    0.7830     0.8568      2.0944   2.762e+4   Y
//    31  22.590  2.925e-2     4.97378     28.12206   2.25232   2.25232    2.01413      0.8412         —     0.9716      2.2071   3.372e+4   Y
//    37  26.024  2.806e-2     9.25620     52.21909   2.34513   2.34513    1.92132      0.7820         —     1.0954      2.2797   6.881e+4   Y
//    41  29.635  2.624e-2    11.99697            —   2.38566   2.38567    1.88079           —         —          —           —   9.972e+4   —
//    43  33.349  2.444e-2    14.19345            —   2.43474   2.43473    1.83171           —         —          —           —   1.138e+5   —
//    47  37.110  2.317e-2    18.99742            —   2.48195   2.48199    1.78450           —         —          —           —   1.577e+5   —
//     d ln sup|rho~| / d ln z = 2.497 +/- 0.346 (5 pts) -> 2.766 +/- 0.212 (7 pts)   vs beta_2 = 4.26645: the TRUTH's own growth
//     d ln C_true / d ln z    = 0.255 +/- 0.099 (7 pts); C_true = 1 (the Gaussian rho law breaking) at z ~ 7.48e+1 on this fit
//     theta_G recomputation vs the cited ladder: worst |recomputed - cited| over the ten levels = 4.2e-5
//     GAUSSIAN rho LAW (F4, lambda = 0, C = 1): HOLDS at all seven exact levels
//
// S5 S-sharp (TPC-implying):  sup_x |R_H(x)| <= sqrt(2 lnW) sqrt(<R^2>_H).  Exact sup over the COMPLETE period at every level.
//    ratio(H) = sup|R_H| / (sqrt(2 lnW) sqrt(<R^2>_H)); the law FAILS at H iff ratio > 1. <R^2>_H is walked and checked at H = 128
//    against the PROVEN closed form (sift-limit-lemmaV meanSquare). z <= 31 scans every integer H in 1..640; z = 37 scans a 26-value grid.
//     z   scan            <R^2>_128 walked / closed form (rel)   #fail    worst ratio (H)     LAST H failing   T4 sec.4   ratios at H = 1, 35, 128, 191, 197, 227, 588
//    13  dense 1..640    1.831760 / 1.831760 (8.1e-15)     1/640   1.1147 (H=   1)           1            1      1.1147 0.5718 0.5910 0.7348 0.6143 0.6722 0.8719
//    17  dense 1..640    2.213983 / 2.213983 (1.2e-13)    35/640   2.4812 (H=   3)          35           35      2.0192 1.0959 0.7421 0.8737 0.9463 0.7807 0.7876
//    19  dense 1..640    2.415229 / 2.415229 (3.7e-12)   153/640   3.3245 (H=   3)         227          227      2.7489 1.2838 1.0126 1.0063 1.0473 1.0053 0.8939
//    23  dense 1..640    2.306395 / 2.306395 (2.9e-11)    90/640   3.0812 (H=   3)         197          197      2.5712 1.3026 0.9720 0.9945 1.0237 0.8644 0.8748
//    29  dense 1..640    2.249411 / 2.249411 (4.1e-10)   201/640   2.9648 (H=   3)         221         none      2.4830 1.4191 1.0835 0.9751 0.9880 0.9282 0.9145
//    31  dense 1..640    2.331691 / 2.331691 (2.4e-10)   528/640   7.0169 (H=   1)         629            —      7.0169 1.6164 1.2417 1.1806 1.1873 1.1127 0.9648
//    37  grid to 2048    2.301473 / 2.301473 (7.2e-10)    26/ 26   15.8889 (H=   1)        2048            —      15.8889 3.1190 2.0641 1.8799 1.8780 1.7622 1.6467
//    the T4 column is phase1-T4-maximal-law.md sec.4's "last H at which S-sharp fails", produced by UNCOMMITTED scratch scripts
//    (that note sec.0 lists t4-sup.js et al. as not committed), so it is a cited number with no reproducible producer behind it.
//
// S6 <rho~^2>: the exact values at the two new levels against the PROVEN all-z bound and the Chebyshev floors
//    FORM I* = (27/16) e^{8 gamma} z^{2s} ln^8 z (1 + 1/(2 ln^2 z))^8, constant 170.88 (rho2-analytic-bound.md; PROVEN, with the
//    Rosser-Schoenfeld validity floor that note flags — the ratio is a calibration of looseness, not a certificate).
//    floor rows, both against smax = (z^beta2 M - 1)/2:  R1f = (3 W <rho~^2>)^{1/3} [C_L = 1, measured ms];  (3W)^{1/3} [C_L = ms = 1, the absolute floor]
//     z     <rho~^2> (own exact / cited)   FORM I*        I*/exact      R1f/smax   cited    (3W)^{1/3}/smax  cited    source
//    13         1.095066   2.7764e+12   2.535e+12      0.012   0.012      0.012         0.012    own exact
//    17         2.496563   2.7769e+13   1.112e+13      0.015   0.015      0.011         0.011    own exact
//    19         4.952375   7.1129e+13   1.436e+13      0.035   0.035      0.020         0.020    own exact
//    23         7.982480   3.5145e+14   4.403e+13      0.056   0.056      0.028         0.028    own exact
//    29        13.595974   2.3728e+15   1.745e+14      0.076   0.076      0.032         0.032    own exact
//    31        24.738489   4.0882e+15   1.653e+14      0.232   0.232      0.080         0.080    own exact
//    37        85.677253   1.7123e+16   1.999e+14      0.541   0.541      0.123         0.123    own exact
//    41       143.927289   3.9037e+16   2.712e+14      1.478   1.474      0.282         0.282    cited rmsr^2
//    43       201.454023   5.7121e+16   2.835e+14      4.996   5.000      0.852         0.852    cited rmsr^2
//    47       360.901967   1.1597e+17   3.213e+14     15.343   15.346      2.155         2.155    cited rmsr^2
//    control: I*/exact at z = 13 = 2.535e+12 vs the cited 2.535e+12  MATCH
//
// S7 VERDICT
//   (a) Lambda(31) = 476.314 and Lambda(37) = 1286.338, exact, Parseval-controlled. MV(alpha)'s slope moves
//       4.214 +/- 0.304 (5 pts) -> 4.566 +/- 0.217 (7 pts); beta_2 = 4.26645 is INSIDE the old bar and OUTSIDE the new one.
//       MEASURED, seven points over one octave of z. A slope is not a bound: MV(alpha) needs a uniform C and all z, and neither is here.
//   (b) sup|rho~|(31) = 28.122062 and sup|rho~|(37) = 52.219092, exact over complete periods of 6469693230 and 200560490130 positions.
//       C_true = 0.8412 and 0.7820: the Gaussian rho law (F4, C = 1) is TRUE at both new levels.
//       The truth's own exponent alpha_true = log_z sup|rho~| reads 0.9716 and 1.0954 against the ceiling alpha_max ~ 3.1.
//   (c) S-sharp fails on the grid at z = 13, 17, 19, 23, 29, 31, 37; T4 records failures at 13, 17, 19, 23 and none at 29.
//   (d) Nothing here bounds G2(z#). Two exact points on a measured curve; RML(alpha) is open at every alpha, as before.
// ============================================================================
// READINGS
// ============================================================================
