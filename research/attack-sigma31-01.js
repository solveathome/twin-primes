// ============================================================================
// ATTACK-SIGMA31 01 — KNOWN-TRUTH CONTROL DRAWS AT @31: CLOSING THE σ
// CALIBRATION GAP UNDER THE ONE OFFSET DETECTION
// (2026-08-21 — redteam-0820-empirical.md §T2.b: "no control exists at @31"
//  and "the control statistic cancels what the test statistic does not")
// ============================================================================
// WHY. The ~3.8 law's offset rests on ONE detection: z = −2.32 at @31 on the
// slot-clustered σ (`research/attack-x-offset-01-terms.js`, embedded). The σ
// behind it was calibrated by seven known-truth random-mask control draws in
// `research/attack-x-offset-02-profile.js` — but its SEEDS structure is
// {19:[1], 23:[1,2,3], 29:[1,2,3], 31:[]}: ZERO draws exist at the one level
// that carries the detection, and seven draws at levels ≤ @29 bound the
// true/reported σ ratio only to a 95% factor ~[0.65, 2.0] (Σz² = 6.71 ~ χ²₇).
// The red team's second flaw: the control statistic (J_ctrl − J_line) scores a
// random mask against the SAME window's own measured line truth, so any
// level-scale arithmetic fluctuation cancels in the control but does NOT
// cancel in the test statistic (natal J against an analytic formula).
//
// THIS FILE closes the level gap and measures the second flaw's size:
//   (1) SEVEN fresh control draws AT @31, constructed EXACTLY as the ≤@29
//       draws were: the identical seeded-mask census (sfc32 keyed
//       0x9E3779B9^x, 0xC0FFEE, 0x20260820, seed; mask drawn per slot in
//       segment order at exact natal density P = N̄/(W/15)), the identical
//       statistic pipeline (mixed super-W triple count, CRT = 6·N·miss with
//       the exact integer U-test tail mass, slot-clustered σ from the
//       per-slot excess spread). Seeds 1..7 at @31 — none has ever been run.
//   (2) BOTH statistics on every draw:
//         z_A = (J_ctrl − J_line)/σ_slot   the cancelling form, the exact
//               ≤@29 construction; J_line(31) from producer 02's embedded
//               obs_line = 5481871992 over this file's exact CRT_line.
//         z_B = (J_ctrl − 1)/σ_slot        the non-cancelling form: the draw
//               scored against its ANALYTIC smooth truth (CRT model = 1),
//               the same reference class the natal test statistic uses.
//       z_B − z_A = (J_line − 1)/σ_slot is then the MEASURED size of the
//       level-scale arithmetic term the cancelling form removes; the spread
//       of z_B across draws equals the spread of z_A identically (the term is
//       common to every draw in one window), which is the proof-by-
//       measurement that no within-window control ensemble can bound that
//       term — only its size can be stated.
//   (3) The calibration: the empirical spread of the seven @31 z_A values IS
//       the σ calibration at @31. Reported as Σz² ~ χ²₇ with the 95% bracket
//       on r = σ_true/σ_reported, alone and pooled with the seven ≤@29
//       draws; then the verdict arithmetic — what z = −2.32 becomes at the
//       measured bracket, and how the @37 prereg's σ projection 8.5228e−6
//       should be READ (reported only: the prereg is sealed at 21fca9f and
//       its scoring rule stands as registered).
//
// CONSTRUCTION CUSTODY, the gate before any new number: this file's slimmed
// kernel (producer 02 minus bins/marginals/line-census) must reproduce
//   (a) the natal record obs/CRT/J/σ at @19/@23/@29/@31 (xchan embed), and
//   (b) all seven ≤@29 control draws of producer 02 to the printed digit —
//       same seeds → byte-identical masks → identical N, J_ctrl, σ, z.
// (b) is what certifies "same construction, same statistic pipeline"
// mechanically rather than by reading.
//
// REGISTERED EXPECTATIONS, written before any @31 draw existed (the ≤@29 gate
// values are known reproductions and are disclosed as such):
//   E1 natal gate passes at all four levels (else instrument failure, stop).
//   E2 all seven ≤@29 control reproductions match producer 02's embed to the
//      printed digit (else the construction is NOT the ≤@29 one, stop).
//   E3 every @31 draw lands within 3σ_slot of its truth J_line(31); a miss is
//      an instrument alarm, not a discovery.
//   E4 P1 (aligned super-W ≡ 0) holds on every draw — a theorem about
//      ∏Q > W, independent of the mask.
//   E5 no expectation is registered for the calibration ratio itself, for the
//      draw spread, or for the measured level-scale term: they are the
//      measurement.
//
// WIDTH RULE at @31 (K = 37534, W = 200560490130 = 2.0e11): la/lb divisor-
// list indices are Uint32 (the xchan Uint16 lesson lives at exactly this
// boundary), guarded by an explicit throw; W < 2^53 and every product formed
// (q_i·q_j ≤ q_K² ≈ 2.0e11, 30q·segment offsets ≤ W) is exact in doubles;
// no BigInt is needed and none is used. The 2^53 guard is explicit at level().
//
// PRICING, registered so a surprise is a finding: the brief prices an @31
// draw at ~7 min; naive W-scaling of producer 02's @29 control passes
// (~29 s each) by W₃₁/W₂₉ = 31.0 says ~15 min. Per-draw wall time and RSS
// are printed; each draw's result is also appended to a progress file in the
// session scratchpad as it lands, so an interruption loses nothing.
//
// usage: node research/attack-sigma31-01.js            (full: gates + 7 draws)
//        node research/attack-sigma31-01.js 19 23      (gate levels only, dev)
// ============================================================================
'use strict';
const T00 = Date.now();
const f = (v, d = 3) => Number.isFinite(v) ? v.toFixed(d) : String(v);
const ex = (v, d = 4) => Number.isFinite(v) ? v.toExponential(d) : String(v);
const el = () => ((Date.now() - T00) / 1000).toFixed(1) + 's';
const say = (s) => process.stderr.write(s + '\n');
const fs = require('fs');
const PROG = '/private/tmp/claude-501/-Users-benjaminsen-Files-Git-primeoire/cd5843fd-9d0b-4195-ba1b-582b75e4b54a/scratchpad/sigma31-draws.jsonl';
function landed(o){try{fs.appendFileSync(PROG,JSON.stringify(o)+'\n');}catch(e){/* scratchpad gone: results still land on stdout */}}

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
function inv(a,m){let r0=a%m;if(r0<0)r0+=m;let r1=m,s0=1,s1=0;
  while(r1!==0){const q=Math.floor(r0/r1),t=r0-q*r1,u=s0-q*s1;r0=r1;r1=t;s0=s1;s1=u;}
  let s=s0%m;if(s<0)s+=m;return s;}
const C3=(n)=>n<3?0:n*(n-1)*(n-2)/6, C2=(n)=>n<2?0:n*(n-1)/2;
// the producer's RNG, verbatim (attack-x-offset-02-profile.js; the house
// record on LCGs is why it is not an LCG)
function sfc32(a,b,c,d){return function(){
  a>>>=0;b>>>=0;c>>>=0;d>>>=0;
  let t=(a+b)|0;a=b^b>>>9;b=c+(c<<3)|0;c=(c<<21|c>>>11);d=d+1|0;t=t+d|0;c=c+t|0;
  return (t>>>0)/4294967296;};}

// ---------------------------------------------------------------------------
// CITED INPUTS — all from embedded OUTPUT blocks, never re-derived here.
// GATE / LINEREF / CTRLREF: research/attack-x-offset-02-profile.js (embedded,
// out-sha256 08eb11b53348c361914df6dd5a26e468692fc6d0b17cdbf4b01c379a97c91a47),
// whose own natal gate is research/xchan-at29-01-segmented.js's embed.
// Z31REF inputs (obs/CRT/σ_slot at the sharp levels) are the same SUMMARY
// figures research/attack-x-offset-01-terms.js cites; the @37 projection
// figures are its OUTPUT block, frozen in xchan-at37-offset-prereg.md.
// ---------------------------------------------------------------------------
const GATE = {   // natal record: N̄, obs, CRT (2 dp), J (6 dp), σ_slot (6 dp)
  19:{N:252450,     supMx:74065,      CRT:77162.70,      J:0.959855, sSlot:0.007107},
  23:{N:5301450,    supMx:1807665,    CRT:1871421.20,    J:0.965932, sSlot:0.001493},
  29:{N:143139150,  supMx:53660192,   CRT:55252747.16,   J:0.971177, sSlot:0.000279},
  31:{N:4151035350, supMx:1653241687, CRT:1695051393.52, J:0.975334, sSlot:0.000051},
};
const LINEREF = { // line census: obs (exact), CRT (2 dp), J_line (6 dp)
  19:{obs:199603,     CRT:197650.84,     J:1.009877},
  23:{obs:5289194,    CRT:5250145.09,    J:1.007438},
  29:{obs:167385191,  CRT:166489891.93,  J:1.005377},
  31:{obs:5481871992, CRT:5459848120.06, J:1.004034},
};
const CTRLREF = { // producer 02's seven control draws: N, J_ctrl (6 dp), σ (6 dp), z (2 dp)
  19:[{sd:1,N:252839,   J:1.009943, s:0.006871, z:0.01}],
  23:[{sd:1,N:5303380,  J:1.008494, s:0.001438, z:0.73},
      {sd:2,N:5300996,  J:1.007801, s:0.001438, z:0.25},
      {sd:3,N:5298932,  J:1.009607, s:0.001440, z:1.51}],
  29:[{sd:1,N:143156081,J:1.005512, s:0.000269, z:0.50},
      {sd:2,N:143128122,J:1.005882, s:0.000269, z:1.88},
      {sd:3,N:143128607,J:1.005317, s:0.000269, z:-0.23}],
};
const SEEDS = {19:[1],23:[1,2,3],29:[1,2,3],31:[1,2,3,4,5,6,7]};
const S37 = {sSlotProj:8.5228e-6, band:[8.44e-6,8.64e-6],  // prereg §2, sealed
             seps:{'N1 vs C1':9.1,'C1 vs C2':9.1,'C1 vs M-abs':4.8,'C1 vs M-mult':3.1}};

// ---------------------------------------------------------------------------
// LEVEL SUMS AND THE EXACT TAIL MASS (the census's own integer U-test)
// ---------------------------------------------------------------------------
function level(x){
  const basePs=primesUpTo(x).filter(p=>p>=7);
  const W=30*basePs.reduce((a,b)=>a*b,1);
  if(W>=2**53)throw new Error('W exceeds 2^53');
  const qs=primesUpTo(Math.floor(Math.sqrt(W))+1).filter(q=>q>x&&q*q<=W);
  const K=qs.length;
  if(K>0xFFFFFFFF)throw new Error(`scour index ${K} exceeds the la/lb container width at @${x}`);
  const Nbar=2*basePs.reduce((a,p)=>a*(p-2),1);
  const U=new Float64Array(K);
  for(let m=0;m<K;m++){let u=Math.floor(W/qs[m]);
    while(u*qs[m]>W)u--; while((u+1)*qs[m]<=W)u++; U[m]=u;}
  let S2=0,S3=0;for(const q of qs){S2+=1/(q*q);S3+=1/(q*q*q);}
  return {x,W,basePs,qs,K,U,Nbar,S2,S3,y:qs[K-1]};
}
function tailMiss(L){
  const {W,qs,K}=L;
  const T=new Float64Array(K+1);
  for(let m=K-1;m>=0;m--)T[m]=T[m+1]+1/qs[m];
  let miss=0;
  for(let i=0;i<K;i++){
    const qi=qs[i];let p=K;
    for(let j=i+1;j<K;j++){
      const t=qi*qs[j];
      while(p>0&&t>L.U[p-1])p--;
      miss+=T[p>j+1?p:j+1]/t;
    }
  }
  return miss;
}

// ---------------------------------------------------------------------------
// THE SEGMENTED CENSUS — producer 02's kernel, slimmed: no bins, no
// marginals, no line mode. mode: 'natal' | seed number (control). The rng is
// consumed one call per slot in segment order, exactly as the producer does,
// so equal seeds give byte-identical masks.
// ---------------------------------------------------------------------------
const LC=7;
function census(L,SEGK,mode){
  const {W,basePs,qs,K,U}=L;
  const kmax=W/30,nSeg=Math.ceil(kmax/SEGK),MS=2*SEGK;
  const A=new Uint8Array(MS),a=new Uint8Array(MS),b=new Uint8Array(MS);
  const la=new Uint32Array(LC*MS),lb=new Uint32Array(LC*MS);
  const cls=[11,17];
  const baseR=[];
  for(const p of basePs){const i30=inv(30%p,p),row=[];
    for(let t=0;t<2;t++)for(const z of [0,(p-2)%p]){
      let d=(z-cls[t])%p;if(d<0)d+=p;row.push(cls[t]+30*((d*i30)%p));}
    baseR.push({p,row});}
  const Ra=new Float64Array(2*K),Rb=new Float64Array(2*K);
  for(let m=0;m<K;m++){const q=qs[m],i30=inv(30%q,q);
    for(let t=0;t<2;t++){
      let d=(0-cls[t])%q;if(d<0)d+=q;Ra[2*m+t]=cls[t]+30*((d*i30)%q);
      let e2=(q-2-cls[t])%q;if(e2<0)e2+=q;Rb[2*m+t]=cls[t]+30*((e2*i30)%q);}}
  const isNatal=mode==='natal';
  const rng=(typeof mode==='number')?sfc32(0x9E3779B9^L.x,0xC0FFEE,0x20260820|0,mode):null;
  const P=L.Nbar/(W/15);
  let Nc=0;
  const B3=[0,0,0,0],sub=[0,0,0,0],sup=[0,0,0,0];
  let SX=0,SX2=0,maxA=0,maxB=0;
  const ia=new Int32Array(LC),ib=new Int32Array(LC);
  const qv=Float64Array.from(qs);
  const tick=Math.max(1,Math.ceil(nSeg/24));
  for(let seg=0;seg<nSeg;seg++){
    const k0=seg*SEGK,k1=Math.min(kmax,k0+SEGK),Ms=2*(k1-k0),V0=30*k0;
    a.fill(0,0,Ms);b.fill(0,0,Ms);
    if(isNatal){A.fill(1,0,Ms);
      for(const {p,row} of baseR){const m30=30*p;
        for(let c=0;c<4;c++){const t=c>>1,R=row[c];
          let v=R+m30*Math.ceil((V0-R)/m30);
          while(v<V0)v+=m30; while(v-m30>=V0)v-=m30;
          for(let idx=2*((v-cls[t])/30-k0)+t;idx<Ms;idx+=2*p)A[idx]=0;}}}
    else{for(let idx=0;idx<Ms;idx++)A[idx]=rng()<P?1:0;}
    for(let m=0;m<K;m++){const q=qs[m],m30=30*q,st=2*q;
      for(let t=0;t<2;t++){
        let v=Ra[2*m+t];v=v+m30*Math.ceil((V0-v)/m30);
        while(v<V0)v+=m30; while(v-m30>=V0)v-=m30;
        for(let idx=2*((v-cls[t])/30-k0)+t;idx<Ms;idx+=st)
          if(A[idx]){const c=a[idx]++;if(c<LC)la[LC*idx+c]=m;}
        let w=Rb[2*m+t];w=w+m30*Math.ceil((V0-w)/m30);
        while(w<V0)w+=m30; while(w-m30>=V0)w-=m30;
        for(let idx=2*((w-cls[t])/30-k0)+t;idx<Ms;idx+=st)
          if(A[idx]){const c=b[idx]++;if(c<LC)lb[LC*idx+c]=m;}}}
    for(let idx=0;idx<Ms;idx++){
      if(!A[idx])continue;
      const av=a[idx],bv=b[idx];Nc++;
      if(av>maxA)maxA=av; if(bv>maxB)maxB=bv;
      B3[3]+=C3(av);B3[2]+=C2(av)*bv;B3[1]+=av*C2(bv);B3[0]+=C3(bv);
      if(av+bv<3)continue;
      if(av>=LC||bv>=LC)throw new Error(`divisor list capacity ${LC} exceeded: a=${av} b=${bv}`);
      const base=LC*idx;
      const mx0=sup[2]+sup[1];
      for(let i=0;i<av;i++)ia[i]=la[base+i];
      for(let i=0;i<bv;i++)ib[i]=lb[base+i];
      for(let i=0;i<av;i++)for(let j=i+1;j<av;j++){
        const t=qv[ia[i]]*qv[ia[j]];
        for(let k=j+1;k<av;k++){if(t>U[ia[k]])sup[3]++;else sub[3]++;}
        for(let k=0;k<bv;k++){if(t>U[ib[k]])sup[2]++;else sub[2]++;}}
      for(let i=0;i<bv;i++)for(let j=i+1;j<bv;j++){
        const t=qv[ib[i]]*qv[ib[j]];
        for(let k=j+1;k<bv;k++){if(t>U[ib[k]])sup[0]++;else sub[0]++;}
        for(let k=0;k<av;k++){if(t>U[ia[k]])sup[1]++;else sub[1]++;}}
      const xs=sup[2]+sup[1]-mx0;SX+=xs;SX2+=xs*xs;
    }
    if(nSeg>=8&&seg%tick===0)say(`      ${mode} seg ${seg+1}/${nSeg}  [${el()}]`);
  }
  return {Nc,B3,sub,sup,maxA,maxB,SX,SX2};
}

// ---------------------------------------------------------------------------
// χ² QUANTILES for the calibration bracket (regularized incomplete gamma,
// series + Lentz continued fraction, bisection inverse; self-tested below
// against the standard table values χ²₇(0.025) = 1.690, χ²₇(0.975) = 16.013).
// ---------------------------------------------------------------------------
function lgamma(x){
  const g=[676.5203681218851,-1259.1392167224028,771.32342877765313,
    -176.61502916214059,12.507343278686905,-0.13857109526572012,
    9.9843695780195716e-6,1.5056327351493116e-7];
  if(x<0.5)return Math.log(Math.PI/Math.sin(Math.PI*x))-lgamma(1-x);
  x-=1;let a=0.99999999999980993;const t=x+7.5;
  for(let i=0;i<8;i++)a+=g[i]/(x+i+1);
  return 0.5*Math.log(2*Math.PI)+(x+0.5)*Math.log(t)-t+Math.log(a);
}
function gammP(A,x){
  if(x<=0)return 0;
  if(x<A+1){let s=1/A,t=s;
    for(let n=1;n<1000;n++){t*=x/(A+n);s+=t;if(Math.abs(t)<Math.abs(s)*1e-15)break;}
    return s*Math.exp(-x+A*Math.log(x)-lgamma(A));}
  let b=x+1-A,c=1e300,d=1/b,h=d;
  for(let i=1;i<1000;i++){const an=-i*(i-A);b+=2;d=an*d+b;
    if(Math.abs(d)<1e-300)d=1e-300;c=b+an/c;if(Math.abs(c)<1e-300)c=1e-300;
    d=1/d;const del=d*c;h*=del;if(Math.abs(del-1)<1e-15)break;}
  return 1-h*Math.exp(-x+A*Math.log(x)-lgamma(A));
}
function chi2inv(p,n){let lo=0,hi=1000;
  for(let i=0;i<200;i++){const m=(lo+hi)/2;if(gammP(n/2,m/2)<p)lo=m;else hi=m;}
  return (lo+hi)/2;}
if(Math.abs(chi2inv(0.975,7)-16.0128)>0.01||Math.abs(chi2inv(0.025,7)-1.6899)>0.01)
  throw new Error('chi2inv self-test failed against the standard table');
function bracket(zs){
  const n=zs.length,sumsq=zs.reduce((a,z)=>a+z*z,0);
  const mean=zs.reduce((a,z)=>a+z,0)/n;
  const sd=Math.sqrt(zs.reduce((a,z)=>a+(z-mean)*(z-mean),0)/(n-1));
  return {n,sumsq,mean,sd,r:Math.sqrt(sumsq/n),
    rLo:Math.sqrt(sumsq/chi2inv(0.975,n)),rHi:Math.sqrt(sumsq/chi2inv(0.025,n))};
}

// ---------------------------------------------------------------------------
// DRIVER
// ---------------------------------------------------------------------------
const ARG=process.argv.slice(2).map(Number).filter(v=>v>0);
const LEVELS=ARG.length?ARG:[19,23,29,31];
const SEGK=1<<20;
console.log('ATTACK-SIGMA31 01 — known-truth control draws at @31: the σ calibration gap');
console.log(`instrument: attack-x-offset-02-profile.js control kernel, slimmed (no bins/marginals/line); gates: its embedded OUTPUT + xchan record   levels: ${LEVELS.join(', ')}   @31 seeds: ${SEEDS[31].join(',')}\n`);
let gateBad=0;
const CTR={};       // level -> [{sd,N,J,s,zA,zB,secs,rssMB}]
const LV={};
for(const x of LEVELS){
  const L=level(x);LV[x]=L;
  console.log(`===== @${x}: W=${L.W} K=${L.K} (${L.qs[0]}..${L.y})  4S2=${f(4*L.S2,6)}`);
  // exact tail mass; custody against BOTH cited CRTs (natal record, line)
  const miss=tailMiss(L);L.miss=miss;
  const G=GATE[x],LR=LINEREF[x];
  const CRTnat=6*G.N*miss,relN=CRTnat/G.CRT-1;
  const CRTline=6*(L.W/15)*miss,relL=CRTline/LR.CRT-1;
  const okN=Math.abs(relN)<1e-6,okL=Math.abs(relL)<1e-6;
  if(!okN)gateBad++;if(!okL)gateBad++;
  const Jline=LR.obs/CRTline;
  console.log(`  miss=${f(miss,6)}  CRT(natal)=${f(CRTnat,2)} vs record ${f(G.CRT,2)} (rel ${ex(relN,2)}) ${okN?'PASS':'FAIL'} | CRT(line)=${f(CRTline,2)} vs record ${f(LR.CRT,2)} (rel ${ex(relL,2)}) ${okL?'PASS':'FAIL'}`);
  console.log(`  TRUTH J_line = ${LR.obs}/${f(CRTline,2)} = ${f(Jline,6)}  (embed prints ${f(LR.J,6)} ${Number(f(Jline,6))===LR.J?'PASS':'FAIL'})`);
  if(Number(f(Jline,6))!==LR.J)gateBad++;
  // E1: natal gate
  const t0=Date.now();
  const CN=census(L,SEGK,'natal');
  const N=CN.Nc,supMx=CN.sup[2]+CN.sup[1],supAl=CN.sup[3]+CN.sup[0];
  const CRT=6*N*miss,J=supMx/CRT;
  const sSlot=Math.sqrt(Math.max(CN.SX2-CN.SX*CN.SX/N,0))/CRT;
  let ident=0;for(let c=0;c<4;c++)if(Math.abs(CN.sub[c]+CN.sup[c]-CN.B3[c])>1e-9)ident++;
  let bad=0,ln='';
  if(N!==G.N){bad++;ln+=' N̄';} if(supMx!==G.supMx){bad++;ln+=' obs';}
  if(Number(f(J,6))!==G.J){bad++;ln+=' J';} if(Number(f(sSlot,6))!==G.sSlot){bad++;ln+=' σ';}
  gateBad+=bad;
  console.log(`  NATAL: N̄=${N}  obs=${supMx}  J=${f(J,6)}  σ_slot=${f(sSlot,6)}  [${((Date.now()-t0)/1000).toFixed(1)}s]`);
  console.log(`    identities: sub+sup=B3 ${ident===0?'PASS':'FAIL'} | P1 aligned=0 ${supAl===0?'PASS':'FAIL'} | GATE vs record: ${bad===0?'ALL PASS':'FAIL:'+ln}`);
  // E2 (≤@29) / the new draws (@31)
  CTR[x]=[];
  const refs=CTRLREF[x]||null;
  for(const sd of SEEDS[x]||[]){
    const tD=Date.now();
    const CC=census(L,SEGK,sd);
    const secs=(Date.now()-tD)/1000;
    const rssMB=Math.round(process.memoryUsage().rss/(1<<20));
    const NC2=CC.Nc,supMxC=CC.sup[2]+CC.sup[1],supAlC=CC.sup[3]+CC.sup[0];
    const CRTC=6*NC2*miss,JC=supMxC/CRTC;
    const sC=Math.sqrt(Math.max(CC.SX2-CC.SX*CC.SX/NC2,0))/CRTC;
    const zA=(JC-Jline)/sC, zB=(JC-1)/sC;
    let idC=0;for(let c=0;c<4;c++)if(Math.abs(CC.sub[c]+CC.sup[c]-CC.B3[c])>1e-9)idC++;
    const row={x,sd,N:NC2,obs:supMxC,J:JC,s:sC,zA,zB,secs,rssMB};
    CTR[x].push(row);landed(row);
    console.log(`  CTRL seed ${sd}: N=${NC2}  obs=${supMxC}  J_ctrl=${f(JC,6)}  σ_slot=${f(sC,6)}  z_A=(J_ctrl−J_line)/σ = ${f(zA,2)}  z_B=(J_ctrl−1)/σ = ${f(zB,2)}  ${Math.abs(zA)<=3?'PASS':'FAIL'}  P1 ${supAlC===0?'PASS':'FAIL'}  ident ${idC===0?'PASS':'FAIL'}  [${secs.toFixed(1)}s, rss ${rssMB}MB]`);
    if(refs){
      const R=refs.find(r=>r.sd===sd);
      let cb=0,cl='';
      if(NC2!==R.N){cb++;cl+=' N';} if(Number(f(JC,6))!==R.J){cb++;cl+=' J';}
      if(Number(f(sC,6))!==R.s){cb++;cl+=' σ';} if(Number(f(zA,2))!==R.z){cb++;cl+=' z';}
      gateBad+=cb;
      console.log(`    REPRODUCTION vs producer 02 embed (N=${R.N} J=${f(R.J,6)} σ=${f(R.s,6)} z=${f(R.z,2)}): ${cb===0?'EXACT':'FAIL:'+cl}`);
    }
  }
  console.log(`  [level done ${el()}]\n`);
}
if(gateBad){console.log(`GATE: ${gateBad} FAILURES — no calibration is read from this run.`);process.exit(1);}
console.log('GATE: natal record reproduced at every level run; every ≤@29 control draw reproduced to the printed digit — the construction and pipeline are the ≤@29 ones.\n');

// ---------------------------------------------------------------------------
// CALIBRATION — only meaningful when the @31 draws ran
// ---------------------------------------------------------------------------
if(CTR[31]&&CTR[31].length){
  const D=CTR[31],L=LV[31];
  const zA=D.map(r=>r.zA),zB=D.map(r=>r.zB);
  console.log('===== CALIBRATION AT @31 (the level of the detection) =====');
  const bA=bracket(zA);
  console.log(`  z_A draws: ${zA.map(z=>f(z,2)).join(', ')}`);
  console.log(`  n=${bA.n}  mean=${f(bA.mean,3)}  sd=${f(bA.sd,3)}  Σz²=${f(bA.sumsq,3)}`);
  console.log(`  r = σ_true/σ_reported: point √(Σz²/n) = ${f(bA.r,3)};  95% bracket [√(Σz²/χ²₀.₉₇₅), √(Σz²/χ²₀.₀₂₅)] = [${f(bA.rLo,3)}, ${f(bA.rHi,3)}]  (χ²₇: ${f(chi2inv(0.025,7),3)}..${f(chi2inv(0.975,7),3)})`);
  const zOld=[];for(const x of [19,23,29])for(const r of CTR[x]||[])zOld.push(r.zA);
  let bP=null;
  if(zOld.length===7){
    bP=bracket(zOld.concat(zA));
    console.log(`  pooled with the seven ≤@29 draws (n=14): Σz²=${f(bP.sumsq,3)}  r=${f(bP.r,3)}  95% [${f(bP.rLo,3)}, ${f(bP.rHi,3)}]`);
  }
  console.log('\n===== BOTH STATISTICS: THE CANCELLING FORM VS THE NON-CANCELLING FORM =====');
  const bB=bracket(zB);
  console.log(`  z_B draws (vs analytic truth 1): ${zB.map(z=>f(z,2)).join(', ')}`);
  console.log(`  mean(z_B)=${f(bB.mean,2)}  sd(z_B)=${f(bB.sd,3)}  vs sd(z_A)=${f(bA.sd,3)}  (identical up to J_line precision: the level-scale term is COMMON to every draw in the window)`);
  const shift=zB.map((z,i)=>z-zA[i]);
  console.log(`  measured level-scale arithmetic term z_B − z_A = (J_line−1)/σ_slot per draw: ${shift.map(z=>f(z,1)).join(', ')}  — mean ${f(shift.reduce((a,b)=>a+b,0)/shift.length,1)}σ_slot`);
  console.log('  READING: the control ensemble calibrates the SAMPLING σ; the arithmetic');
  console.log('  content of the window sits ~'+f(shift.reduce((a,b)=>a+b,0)/shift.length,0)+'σ_slot above the smooth model and cancels');
  console.log('  identically in every draw, so no within-window control can bound its');
  console.log('  fluctuation — its size is now MEASURED, not assumed, and any reading of the');
  console.log('  natal z = −2.32 must carry it as the uncontrolled component.');

  console.log('\n===== VERDICT ARITHMETIC — the @31 detection restated at the measured σ =====');
  const M31={obs:1653241687,CRT:1695051393.52,sSlot:0.000051}; // xchan embed, as producer 01 cites
  const om=1-M31.obs/M31.CRT, Dlt=4*L.S2-om, z31=-Dlt/M31.sSlot;
  console.log(`  registered: Δ=${ex(Dlt,4)}  σ_slot=${f(M31.sSlot,6)}  z=${f(z31,2)}`);
  for(const [tag,r] of [['point r',bA.r],['bracket low (σ overstated)',bA.rLo],['bracket high (σ understated)',bA.rHi]])
    console.log(`  at ${tag} = ${f(r,3)}: z_cal = ${f(z31/r,2)}`);
  const rKill=Math.abs(z31)/3;
  console.log(`  |z| crosses 3 only if r < ${f(rKill,3)}; the @31 bracket ${bA.rLo<rKill?'CONTAINS':'does not contain'} ${f(rKill,3)}${bA.rLo<rKill?' (a 3σ reading is within the calibration uncertainty)':''}`);
  console.log('\n  @37 prereg (SEALED at 21fca9f; its scoring rule stands as registered):');
  console.log(`  σ_slot(37) projection ${ex(S37.sSlotProj,4)} read at the @31 bracket spans [${ex(S37.sSlotProj*bA.rLo,3)}, ${ex(S37.sSlotProj*bA.rHi,3)}]`);
  for(const [k,v] of Object.entries(S37.seps))
    console.log(`  separation ${k}: registered ${f(v,1)}σ → calibrated range ${f(v/bA.rHi,1)}σ .. ${f(v/bA.rLo,1)}σ`);
  console.log('  (reported only — the run\'s own printed σ_slot supersedes the projection');
  console.log('   by the prereg\'s own clause, and nothing here rescores it)');

  console.log('\n===== PRICING =====');
  for(const r of D)console.log(`  seed ${r.sd}: ${f(r.secs,1)}s  rss ${r.rssMB}MB`);
  const mSec=D.reduce((a,r)=>a+r.secs,0)/D.length;
  console.log(`  mean ${f(mSec,1)}s/draw vs the brief's ~420s price and the naive W-scaling ~900s (@29 ctrl ~29s × W₃₁/W₂₉ = 31)`);
}
console.log(`\n[total ${el()}]`);
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both --node-flag --max-old-space-size=4096 research/attack-sigma31-01.js
//   invocation:  node --max-old-space-size=4096 research/attack-sigma31-01.js
//   code-sha256: e19d99d9e6dbfab15e754f954cf7385d81b792f070fb075a948510b79c4b0023
//   out-sha256:  1cb7292cbe3c397f981648ee9e432796188b2b505d399635a706da8122cc796d
//   body-lines:  414
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     5519.5 s
// ============================================================================
// ATTACK-SIGMA31 01 — known-truth control draws at @31: the σ calibration gap
// instrument: attack-x-offset-02-profile.js control kernel, slimmed (no bins/marginals/line); gates: its embedded OUTPUT + xchan record   levels: 19, 23, 29, 31   @31 seeds: 1,2,3,4,5,6,7
//
// ===== @19: W=9699690 K=435 (23..3109)  4S2=0.041122
//   miss=0.050943  CRT(natal)=77162.70 vs record 77162.70 (rel 5.48e-8) PASS | CRT(line)=197650.84 vs record 197650.84 (rel -1.04e-8) PASS
//   TRUTH J_line = 199603/197650.84 = 1.009877  (embed prints 1.009877 PASS)
//   NATAL: N̄=252450  obs=74065  J=0.959855  σ_slot=0.007107  [0.0s]
//     identities: sub+sup=B3 PASS | P1 aligned=0 PASS | GATE vs record: ALL PASS
//   CTRL seed 1: N=252839  obs=78050  J_ctrl=1.009943  σ_slot=0.006871  z_A=(J_ctrl−J_line)/σ = 0.01  z_B=(J_ctrl−1)/σ = 1.45  PASS  P1 PASS  ident PASS  [0.1s, rss 151MB]
//     REPRODUCTION vs producer 02 embed (N=252839 J=1.009943 σ=0.006871 z=0.01): EXACT
//   [level done 0.1s]
//
// ===== @23: W=223092870 K=1739 (29..14929)  4S2=0.033678
//   miss=0.058834  CRT(natal)=1871421.20 vs record 1871421.20 (rel -2.49e-9) PASS | CRT(line)=5250145.09 vs record 5250145.09 (rel 3.28e-10) PASS
//   TRUTH J_line = 5289194/5250145.09 = 1.007438  (embed prints 1.007438 PASS)
//   NATAL: N̄=5301450  obs=1807665  J=0.965932  σ_slot=0.001493  [0.5s]
//     identities: sub+sup=B3 PASS | P1 aligned=0 PASS | GATE vs record: ALL PASS
//   CTRL seed 1: N=5303380  obs=1888005  J_ctrl=1.008494  σ_slot=0.001438  z_A=(J_ctrl−J_line)/σ = 0.73  z_B=(J_ctrl−1)/σ = 5.91  PASS  P1 PASS  ident PASS  [0.8s, rss 353MB]
//     REPRODUCTION vs producer 02 embed (N=5303380 J=1.008494 σ=0.001438 z=0.73): EXACT
//   CTRL seed 2: N=5300996  obs=1885858  J_ctrl=1.007801  σ_slot=0.001438  z_A=(J_ctrl−J_line)/σ = 0.25  z_B=(J_ctrl−1)/σ = 5.42  PASS  P1 PASS  ident PASS  [0.7s, rss 355MB]
//     REPRODUCTION vs producer 02 embed (N=5300996 J=1.007801 σ=0.001438 z=0.25): EXACT
//   CTRL seed 3: N=5298932  obs=1888503  J_ctrl=1.009607  σ_slot=0.001440  z_A=(J_ctrl−J_line)/σ = 1.51  z_B=(J_ctrl−1)/σ = 6.67  PASS  P1 PASS  ident PASS  [0.7s, rss 361MB]
//     REPRODUCTION vs producer 02 embed (N=5298932 J=1.009607 σ=0.001440 z=1.51): EXACT
//   [level done 2.8s]
//
// ===== @29: W=6469693230 K=7863 (31..80429)  4S2=0.028943
//   miss=0.064335  CRT(natal)=55252747.16 vs record 55252747.16 (rel -6.01e-11) PASS | CRT(line)=166489891.93 vs record 166489891.93 (rel 4.68e-12) PASS
//   TRUTH J_line = 167385191/166489891.93 = 1.005377  (embed prints 1.005377 PASS)
//   NATAL: N̄=143139150  obs=53660192  J=0.971177  σ_slot=0.000279  [12.7s]
//     identities: sub+sup=B3 PASS | P1 aligned=0 PASS | GATE vs record: ALL PASS
//   CTRL seed 1: N=143156081  obs=55563891  J_ctrl=1.005512  σ_slot=0.000269  z_A=(J_ctrl−J_line)/σ = 0.50  z_B=(J_ctrl−1)/σ = 20.51  PASS  P1 PASS  ident PASS  [20.9s, rss 374MB]
//     REPRODUCTION vs producer 02 embed (N=143156081 J=1.005512 σ=0.000269 z=0.50): EXACT
//   CTRL seed 2: N=143128122  obs=55573464  J_ctrl=1.005882  σ_slot=0.000269  z_A=(J_ctrl−J_line)/σ = 1.88  z_B=(J_ctrl−1)/σ = 21.88  PASS  P1 PASS  ident PASS  [20.0s, rss 375MB]
//     REPRODUCTION vs producer 02 embed (N=143128122 J=1.005882 σ=0.000269 z=1.88): EXACT
//   CTRL seed 3: N=143128607  obs=55542415  J_ctrl=1.005317  σ_slot=0.000269  z_A=(J_ctrl−J_line)/σ = -0.23  z_B=(J_ctrl−1)/σ = 19.78  PASS  P1 PASS  ident PASS  [20.2s, rss 376MB]
//     REPRODUCTION vs producer 02 embed (N=143128607 J=1.005317 σ=0.000269 z=-0.23): EXACT
//   [level done 77.0s]
//
// ===== @31: W=200560490130 K=37534 (37..447829)  4S2=0.024784
//   miss=0.068057  CRT(natal)=1695051393.52 vs record 1695051393.52 (rel 3.18e-13) PASS | CRT(line)=5459848120.06 vs record 5459848120.06 (rel 5.02e-14) PASS
//   TRUTH J_line = 5481871992/5459848120.06 = 1.004034  (embed prints 1.004034 PASS)
//   NATAL: N̄=4151035350  obs=1653241687  J=0.975334  σ_slot=0.000051  [422.9s]
//     identities: sub+sup=B3 PASS | P1 aligned=0 PASS | GATE vs record: ALL PASS
//   CTRL seed 1: N=4151053576  obs=1701958682  J_ctrl=1.004071  σ_slot=0.000049  z_A=(J_ctrl−J_line)/σ = 0.75  z_B=(J_ctrl−1)/σ = 82.98  PASS  P1 PASS  ident PASS  [657.3s, rss 408MB]
//   CTRL seed 2: N=4151119771  obs=1701956277  J_ctrl=1.004053  σ_slot=0.000049  z_A=(J_ctrl−J_line)/σ = 0.39  z_B=(J_ctrl−1)/σ = 82.63  PASS  P1 PASS  ident PASS  [701.4s, rss 278MB]
//   CTRL seed 3: N=4151049103  obs=1702008448  J_ctrl=1.004101  σ_slot=0.000049  z_A=(J_ctrl−J_line)/σ = 1.37  z_B=(J_ctrl−1)/σ = 83.60  PASS  P1 PASS  ident PASS  [718.3s, rss 361MB]
//   CTRL seed 4: N=4151150395  obs=1701884305  J_ctrl=1.004003  σ_slot=0.000049  z_A=(J_ctrl−J_line)/σ = -0.62  z_B=(J_ctrl−1)/σ = 81.62  PASS  P1 PASS  ident PASS  [776.4s, rss 376MB]
//   CTRL seed 5: N=4150993328  obs=1701803191  J_ctrl=1.003993  σ_slot=0.000049  z_A=(J_ctrl−J_line)/σ = -0.82  z_B=(J_ctrl−1)/σ = 81.42  PASS  P1 PASS  ident PASS  [707.6s, rss 386MB]
//   CTRL seed 6: N=4151024081  obs=1701725148  J_ctrl=1.003940  σ_slot=0.000049  z_A=(J_ctrl−J_line)/σ = -1.91  z_B=(J_ctrl−1)/σ = 80.33  PASS  P1 PASS  ident PASS  [705.5s, rss 312MB]
//   CTRL seed 7: N=4151047925  obs=1701998041  J_ctrl=1.004095  σ_slot=0.000049  z_A=(J_ctrl−J_line)/σ = 1.25  z_B=(J_ctrl−1)/σ = 83.48  PASS  P1 PASS  ident PASS  [748.8s, rss 377MB]
//   [level done 5519.2s]
//
// GATE: natal record reproduced at every level run; every ≤@29 control draw reproduced to the printed digit — the construction and pipeline are the ≤@29 ones.
//
// ===== CALIBRATION AT @31 (the level of the detection) =====
//   z_A draws: 0.75, 0.39, 1.37, -0.62, -0.82, -1.91, 1.25
//   n=7  mean=0.058  sd=1.215  Σz²=8.888
//   r = σ_true/σ_reported: point √(Σz²/n) = 1.127;  95% bracket [√(Σz²/χ²₀.₉₇₅), √(Σz²/χ²₀.₀₂₅)] = [0.745, 2.293]  (χ²₇: 1.690..16.013)
//   pooled with the seven ≤@29 draws (n=14): Σz²=15.586  r=1.055  95% [0.772, 1.664]
//
// ===== BOTH STATISTICS: THE CANCELLING FORM VS THE NON-CANCELLING FORM =====
//   z_B draws (vs analytic truth 1): 82.98, 82.63, 83.60, 81.62, 81.42, 80.33, 83.48
//   mean(z_B)=82.29  sd(z_B)=1.212  vs sd(z_A)=1.215  (identical up to J_line precision: the level-scale term is COMMON to every draw in the window)
//   measured level-scale arithmetic term z_B − z_A = (J_line−1)/σ_slot per draw: 82.2, 82.2, 82.2, 82.2, 82.2, 82.2, 82.2  — mean 82.2σ_slot
//   READING: the control ensemble calibrates the SAMPLING σ; the arithmetic
//   content of the window sits ~82σ_slot above the smooth model and cancels
//   identically in every draw, so no within-window control can bound its
//   fluctuation — its size is now MEASURED, not assumed, and any reading of the
//   natal z = −2.32 must carry it as the uncontrolled component.
//
// ===== VERDICT ARITHMETIC — the @31 detection restated at the measured σ =====
//   registered: Δ=1.1853e-4  σ_slot=0.000051  z=-2.32
//   at point r = 1.127: z_cal = -2.06
//   at bracket low (σ overstated) = 0.745: z_cal = -3.12
//   at bracket high (σ understated) = 2.293: z_cal = -1.01
//   |z| crosses 3 only if r < 0.775; the @31 bracket CONTAINS 0.775 (a 3σ reading is within the calibration uncertainty)
//
//   @37 prereg (SEALED at 21fca9f; its scoring rule stands as registered):
//   σ_slot(37) projection 8.5228e-6 read at the @31 bracket spans [6.350e-6, 1.955e-5]
//   separation N1 vs C1: registered 9.1σ → calibrated range 4.0σ .. 12.2σ
//   separation C1 vs C2: registered 9.1σ → calibrated range 4.0σ .. 12.2σ
//   separation C1 vs M-abs: registered 4.8σ → calibrated range 2.1σ .. 6.4σ
//   separation C1 vs M-mult: registered 3.1σ → calibrated range 1.4σ .. 4.2σ
//   (reported only — the run's own printed σ_slot supersedes the projection
//    by the prereg's own clause, and nothing here rescores it)
//
// ===== PRICING =====
//   seed 1: 657.3s  rss 408MB
//   seed 2: 701.4s  rss 278MB
//   seed 3: 718.3s  rss 361MB
//   seed 4: 776.4s  rss 376MB
//   seed 5: 707.6s  rss 386MB
//   seed 6: 705.5s  rss 312MB
//   seed 7: 748.8s  rss 377MB
//   mean 716.5s/draw vs the brief's ~420s price and the naive W-scaling ~900s (@29 ctrl ~29s × W₃₁/W₂₉ = 31)
//
// [total 5519.2s]
// ───── stderr ─────
//       natal seg 1/8  [0.3s]
//       natal seg 2/8  [0.3s]
//       natal seg 3/8  [0.5s]
//       natal seg 4/8  [0.5s]
//       natal seg 5/8  [0.6s]
//       natal seg 6/8  [0.6s]
//       natal seg 7/8  [0.7s]
//       natal seg 8/8  [0.7s]
//       1 seg 1/8  [0.8s]
//       1 seg 2/8  [1.0s]
//       1 seg 3/8  [1.1s]
//       1 seg 4/8  [1.2s]
//       1 seg 5/8  [1.3s]
//       1 seg 6/8  [1.4s]
//       1 seg 7/8  [1.5s]
//       1 seg 8/8  [1.5s]
//       2 seg 1/8  [1.6s]
//       2 seg 2/8  [1.7s]
//       2 seg 3/8  [1.8s]
//       2 seg 4/8  [1.9s]
//       2 seg 5/8  [2.0s]
//       2 seg 6/8  [2.1s]
//       2 seg 7/8  [2.2s]
//       2 seg 8/8  [2.2s]
//       3 seg 1/8  [2.3s]
//       3 seg 2/8  [2.4s]
//       3 seg 3/8  [2.5s]
//       3 seg 4/8  [2.6s]
//       3 seg 5/8  [2.7s]
//       3 seg 6/8  [2.7s]
//       3 seg 7/8  [2.8s]
//       3 seg 8/8  [2.8s]
//       natal seg 1/206  [3.1s]
//       natal seg 10/206  [3.7s]
//       natal seg 19/206  [4.3s]
//       natal seg 28/206  [4.8s]
//       natal seg 37/206  [5.4s]
//       natal seg 46/206  [5.9s]
//       natal seg 55/206  [6.5s]
//       natal seg 64/206  [7.0s]
//       natal seg 73/206  [7.6s]
//       natal seg 82/206  [8.2s]
//       natal seg 91/206  [8.7s]
//       natal seg 100/206  [9.3s]
//       natal seg 109/206  [9.8s]
//       natal seg 118/206  [10.4s]
//       natal seg 127/206  [10.9s]
//       natal seg 136/206  [11.5s]
//       natal seg 145/206  [12.0s]
//       natal seg 154/206  [12.6s]
//       natal seg 163/206  [13.1s]
//       natal seg 172/206  [13.7s]
//       natal seg 181/206  [14.2s]
//       natal seg 190/206  [14.8s]
//       natal seg 199/206  [15.3s]
//       1 seg 1/206  [15.9s]
//       1 seg 10/206  [16.8s]
//       1 seg 19/206  [17.7s]
//       1 seg 28/206  [18.6s]
//       1 seg 37/206  [19.6s]
//       1 seg 46/206  [20.5s]
//       1 seg 55/206  [21.4s]
//       1 seg 64/206  [22.3s]
//       1 seg 73/206  [23.2s]
//       1 seg 82/206  [24.1s]
//       1 seg 91/206  [25.0s]
//       1 seg 100/206  [26.0s]
//       1 seg 109/206  [26.9s]
//       1 seg 118/206  [27.8s]
//       1 seg 127/206  [28.7s]
//       1 seg 136/206  [29.6s]
//       1 seg 145/206  [30.5s]
//       1 seg 154/206  [31.4s]
//       1 seg 163/206  [32.4s]
//       1 seg 172/206  [33.3s]
//       1 seg 181/206  [34.2s]
//       1 seg 190/206  [35.1s]
//       1 seg 199/206  [36.0s]
//       2 seg 1/206  [36.8s]
//       2 seg 10/206  [37.6s]
//       2 seg 19/206  [38.5s]
//       2 seg 28/206  [39.5s]
//       2 seg 37/206  [40.4s]
//       2 seg 46/206  [41.3s]
//       2 seg 55/206  [42.2s]
//       2 seg 64/206  [43.1s]
//       2 seg 73/206  [43.9s]
//       2 seg 82/206  [44.8s]
//       2 seg 91/206  [45.7s]
//       2 seg 100/206  [46.6s]
//       2 seg 109/206  [47.4s]
//       2 seg 118/206  [48.3s]
//       2 seg 127/206  [49.2s]
//       2 seg 136/206  [50.0s]
//       2 seg 145/206  [50.9s]
//       2 seg 154/206  [51.8s]
//       2 seg 163/206  [52.6s]
//       2 seg 172/206  [53.5s]
//       2 seg 181/206  [54.3s]
//       2 seg 190/206  [55.2s]
//       2 seg 199/206  [56.1s]
//       3 seg 1/206  [56.8s]
//       3 seg 10/206  [57.7s]
//       3 seg 19/206  [58.6s]
//       3 seg 28/206  [59.5s]
//       3 seg 37/206  [60.4s]
//       3 seg 46/206  [61.3s]
//       3 seg 55/206  [62.2s]
//       3 seg 64/206  [63.0s]
//       3 seg 73/206  [63.9s]
//       3 seg 82/206  [64.8s]
//       3 seg 91/206  [65.7s]
//       3 seg 100/206  [66.6s]
//       3 seg 109/206  [67.5s]
//       3 seg 118/206  [68.4s]
//       3 seg 127/206  [69.3s]
//       3 seg 136/206  [70.2s]
//       3 seg 145/206  [71.1s]
//       3 seg 154/206  [71.9s]
//       3 seg 163/206  [72.8s]
//       3 seg 172/206  [73.7s]
//       3 seg 181/206  [74.6s]
//       3 seg 190/206  [75.4s]
//       3 seg 199/206  [76.3s]
//       natal seg 1/6376  [81.2s]
//       natal seg 267/6376  [99.7s]
//       natal seg 533/6376  [118.3s]
//       natal seg 799/6376  [136.8s]
//       natal seg 1065/6376  [155.5s]
//       natal seg 1331/6376  [174.1s]
//       natal seg 1597/6376  [192.9s]
//       natal seg 1863/6376  [210.7s]
//       natal seg 2129/6376  [228.0s]
//       natal seg 2395/6376  [245.1s]
//       natal seg 2661/6376  [262.3s]
//       natal seg 2927/6376  [279.2s]
//       natal seg 3193/6376  [296.2s]
//       natal seg 3459/6376  [313.4s]
//       natal seg 3725/6376  [331.0s]
//       natal seg 3991/6376  [348.8s]
//       natal seg 4257/6376  [366.1s]
//       natal seg 4523/6376  [383.5s]
//       natal seg 4789/6376  [400.8s]
//       natal seg 5055/6376  [418.0s]
//       natal seg 5321/6376  [435.1s]
//       natal seg 5587/6376  [452.7s]
//       natal seg 5853/6376  [469.9s]
//       natal seg 6119/6376  [487.3s]
//       1 seg 1/6376  [504.0s]
//       1 seg 267/6376  [530.7s]
//       1 seg 533/6376  [559.0s]
//       1 seg 799/6376  [585.9s]
//       1 seg 1065/6376  [611.9s]
//       1 seg 1331/6376  [638.5s]
//       1 seg 1597/6376  [665.4s]
//       1 seg 1863/6376  [692.2s]
//       1 seg 2129/6376  [719.0s]
//       1 seg 2395/6376  [745.5s]
//       1 seg 2661/6376  [772.3s]
//       1 seg 2927/6376  [798.9s]
//       1 seg 3193/6376  [825.5s]
//       1 seg 3459/6376  [852.3s]
//       1 seg 3725/6376  [879.2s]
//       1 seg 3991/6376  [906.0s]
//       1 seg 4257/6376  [932.9s]
//       1 seg 4523/6376  [959.6s]
//       1 seg 4789/6376  [986.5s]
//       1 seg 5055/6376  [1014.2s]
//       1 seg 5321/6376  [1044.2s]
//       1 seg 5587/6376  [1073.3s]
//       1 seg 5853/6376  [1103.2s]
//       1 seg 6119/6376  [1132.7s]
//       2 seg 1/6376  [1161.4s]
//       2 seg 267/6376  [1190.5s]
//       2 seg 533/6376  [1219.5s]
//       2 seg 799/6376  [1248.6s]
//       2 seg 1065/6376  [1277.6s]
//       2 seg 1331/6376  [1306.5s]
//       2 seg 1597/6376  [1335.3s]
//       2 seg 1863/6376  [1364.2s]
//       2 seg 2129/6376  [1393.4s]
//       2 seg 2395/6376  [1423.2s]
//       2 seg 2661/6376  [1452.2s]
//       2 seg 2927/6376  [1481.3s]
//       2 seg 3193/6376  [1509.9s]
//       2 seg 3459/6376  [1536.7s]
//       2 seg 3725/6376  [1564.7s]
//       2 seg 3991/6376  [1594.5s]
//       2 seg 4257/6376  [1624.3s]
//       2 seg 4523/6376  [1653.8s]
//       2 seg 4789/6376  [1683.2s]
//       2 seg 5055/6376  [1713.7s]
//       2 seg 5321/6376  [1744.7s]
//       2 seg 5587/6376  [1774.8s]
//       2 seg 5853/6376  [1804.0s]
//       2 seg 6119/6376  [1833.7s]
//       3 seg 1/6376  [1862.7s]
//       3 seg 267/6376  [1891.6s]
//       3 seg 533/6376  [1921.8s]
//       3 seg 799/6376  [1953.0s]
//       3 seg 1065/6376  [1984.5s]
//       3 seg 1331/6376  [2015.8s]
//       3 seg 1597/6376  [2046.6s]
//       3 seg 1863/6376  [2077.7s]
//       3 seg 2129/6376  [2107.2s]
//       3 seg 2395/6376  [2136.3s]
//       3 seg 2661/6376  [2165.5s]
//       3 seg 2927/6376  [2193.6s]
//       3 seg 3193/6376  [2223.9s]
//       3 seg 3459/6376  [2253.2s]
//       3 seg 3725/6376  [2282.7s]
//       3 seg 3991/6376  [2312.9s]
//       3 seg 4257/6376  [2343.3s]
//       3 seg 4523/6376  [2372.5s]
//       3 seg 4789/6376  [2402.4s]
//       3 seg 5055/6376  [2431.5s]
//       3 seg 5321/6376  [2461.7s]
//       3 seg 5587/6376  [2491.4s]
//       3 seg 5853/6376  [2521.3s]
//       3 seg 6119/6376  [2551.5s]
//       4 seg 1/6376  [2581.0s]
//       4 seg 267/6376  [2613.7s]
//       4 seg 533/6376  [2645.1s]
//       4 seg 799/6376  [2677.6s]
//       4 seg 1065/6376  [2710.2s]
//       4 seg 1331/6376  [2743.0s]
//       4 seg 1597/6376  [2775.1s]
//       4 seg 1863/6376  [2807.8s]
//       4 seg 2129/6376  [2841.5s]
//       4 seg 2395/6376  [2874.0s]
//       4 seg 2661/6376  [2906.4s]
//       4 seg 2927/6376  [2939.0s]
//       4 seg 3193/6376  [2971.7s]
//       4 seg 3459/6376  [3003.5s]
//       4 seg 3725/6376  [3034.7s]
//       4 seg 3991/6376  [3066.7s]
//       4 seg 4257/6376  [3099.5s]
//       4 seg 4523/6376  [3132.0s]
//       4 seg 4789/6376  [3165.1s]
//       4 seg 5055/6376  [3198.4s]
//       4 seg 5321/6376  [3230.6s]
//       4 seg 5587/6376  [3261.8s]
//       4 seg 5853/6376  [3293.2s]
//       4 seg 6119/6376  [3325.7s]
//       5 seg 1/6376  [3357.4s]
//       5 seg 267/6376  [3387.7s]
//       5 seg 533/6376  [3417.0s]
//       5 seg 799/6376  [3449.9s]
//       5 seg 1065/6376  [3480.1s]
//       5 seg 1331/6376  [3509.9s]
//       5 seg 1597/6376  [3538.8s]
//       5 seg 1863/6376  [3568.4s]
//       5 seg 2129/6376  [3597.5s]
//       5 seg 2395/6376  [3626.0s]
//       5 seg 2661/6376  [3655.5s]
//       5 seg 2927/6376  [3685.0s]
//       5 seg 3193/6376  [3714.0s]
//       5 seg 3459/6376  [3743.8s]
//       5 seg 3725/6376  [3772.8s]
//       5 seg 3991/6376  [3801.7s]
//       5 seg 4257/6376  [3830.8s]
//       5 seg 4523/6376  [3859.8s]
//       5 seg 4789/6376  [3889.3s]
//       5 seg 5055/6376  [3919.3s]
//       5 seg 5321/6376  [3949.2s]
//       5 seg 5587/6376  [3978.6s]
//       5 seg 5853/6376  [4007.7s]
//       5 seg 6119/6376  [4036.9s]
//       6 seg 1/6376  [4065.0s]
//       6 seg 267/6376  [4093.5s]
//       6 seg 533/6376  [4122.0s]
//       6 seg 799/6376  [4150.6s]
//       6 seg 1065/6376  [4179.6s]
//       6 seg 1331/6376  [4208.0s]
//       6 seg 1597/6376  [4236.4s]
//       6 seg 1863/6376  [4265.1s]
//       6 seg 2129/6376  [4296.7s]
//       6 seg 2395/6376  [4327.1s]
//       6 seg 2661/6376  [4357.2s]
//       6 seg 2927/6376  [4386.1s]
//       6 seg 3193/6376  [4415.0s]
//       6 seg 3459/6376  [4443.9s]
//       6 seg 3725/6376  [4480.7s]
//       6 seg 3991/6376  [4509.7s]
//       6 seg 4257/6376  [4539.0s]
//       6 seg 4523/6376  [4568.1s]
//       6 seg 4789/6376  [4597.1s]
//       6 seg 5055/6376  [4626.3s]
//       6 seg 5321/6376  [4655.9s]
//       6 seg 5587/6376  [4684.6s]
//       6 seg 5853/6376  [4713.4s]
//       6 seg 6119/6376  [4742.4s]
//       7 seg 1/6376  [4770.5s]
//       7 seg 267/6376  [4801.8s]
//       7 seg 533/6376  [4833.0s]
//       7 seg 799/6376  [4864.2s]
//       7 seg 1065/6376  [4895.4s]
//       7 seg 1331/6376  [4926.4s]
//       7 seg 1597/6376  [4957.5s]
//       7 seg 1863/6376  [4988.5s]
//       7 seg 2129/6376  [5019.6s]
//       7 seg 2395/6376  [5050.6s]
//       7 seg 2661/6376  [5081.7s]
//       7 seg 2927/6376  [5113.0s]
//       7 seg 3193/6376  [5144.0s]
//       7 seg 3459/6376  [5175.1s]
//       7 seg 3725/6376  [5206.2s]
//       7 seg 3991/6376  [5237.5s]
//       7 seg 4257/6376  [5268.6s]
//       7 seg 4523/6376  [5299.9s]
//       7 seg 4789/6376  [5332.8s]
//       7 seg 5055/6376  [5364.4s]
//       7 seg 5321/6376  [5396.1s]
//       7 seg 5587/6376  [5427.2s]
//       7 seg 5853/6376  [5458.3s]
//       7 seg 6119/6376  [5489.3s]
// ============================================================================
// READINGS
//
// 1. THE GAP IS CLOSED: SEVEN KNOWN-TRUTH DRAWS NOW EXIST AT @31, AND THE σ
//    IS CALIBRATED AT THE LEVEL THAT CARRIES THE DETECTION. z_A = 0.75, 0.39,
//    1.37, -0.62, -0.82, -1.91, 1.25 — every draw inside 2σ of its truth,
//    mean 0.058 (the estimator is unbiased at random-mask truth), sd 1.215,
//    Σz² = 8.888 ~ χ²₇. The measured ratio r = σ_true/σ_reported is 1.127 at
//    the point, 95% bracket [0.745, 2.293] from seven draws alone, and
//    [0.772, 1.664] pooled with the seven ≤@29 draws (n = 14). The
//    registered factor-[0.65, 2.0] bound, which rested entirely on levels
//    that never carried the detection, is replaced by a bracket measured
//    where the detection lives.
//
// 2. THE CONSTRUCTION IS CERTIFIED IDENTICAL, NOT MERELY SIMILAR. All seven
//    ≤@29 control draws reproduce attack-x-offset-02-profile.js's embedded
//    N, J_ctrl, σ_slot and z to the printed digit (REPRODUCTION ... EXACT,
//    seven times), and the natal record reproduces at all four levels
//    (obs = 1653241687 exactly at @31). The slimmed kernel IS the ≤@29
//    instrument, shown mechanically rather than by reading the code.
//
// 3. THE @31 DETECTION WEAKENS AT THE POINT AND DOES NOT RESOLVE INSIDE THE
//    BRACKET. z = -2.32 restates to -2.06 at r = 1.127; across the 95%
//    bracket it spans -1.01 to -3.12, and a 3σ reading requires r < 0.775 —
//    a value the bracket CONTAINS. So calibration alone excludes neither
//    "fluctuation" nor "3σ structure". Note also seed 6: a pure random mask
//    scored z_A = -1.91, an excursion of the detection's own order, in a
//    seven-draw ensemble. The offset therefore STAYS a consistent-with — one
//    2.3σ-scale sighting on a σ now bounded at @31 itself — and @37 remains
//    the decider, exactly as the prereg placed it.
//
// 4. THE RED TEAM'S SECOND FLAW IS NOW A MEASURED NUMBER: THE CANCELLING
//    CONTROL FORM REMOVES AN 82σ TERM. The non-cancelling statistic
//    z_B = (J_ctrl - 1)/σ scores every draw against its analytic smooth
//    truth, the same reference class the natal test uses; z_B - z_A =
//    (J_line - 1)/σ_slot = 82.2 on every draw, and sd(z_B) = 1.212 equals
//    sd(z_A) = 1.215 to the third digit. The window's arithmetic content is
//    ~82 sampling-σ tall and COMMON to every draw, so no within-window
//    control ensemble can bound its fluctuation — only its size, now
//    measured. The controls calibrate the SAMPLING σ only; the natal
//    z = -2.32 carries the level-scale arithmetic component uncontrolled,
//    and any verdict sentence must say so.
//
// 5. WHAT THIS DOES — AND DOES NOT DO — TO THE @37 PREREG (sealed at
//    21fca9f; reported only, nothing rescored). Its σ_slot(37) projection
//    8.5228e-6, READ at the @31 bracket, spans [6.350e-6, 1.955e-5]. The
//    9.1σ separations (N1 vs C1, C1 vs C2) stay at 4.0σ or better across
//    the whole bracket — the prereg's primary decision survives any σ
//    miscalibration the @31 draws allow. The tension is at the secondary
//    separations: C1 vs M-abs registered 4.8σ reads 2.1σ at the bracket's
//    weak end, and C1 vs M-mult 3.1σ reads 1.4σ — at that end @37 decides
//    {no correction | shrinking} but NOT {shrinking | constant-absolute}.
//    The scoring rule stands as registered, and the run's own printed σ
//    supersedes the projection by the prereg's own clause.
//
// 6. PRICING, A REAL SURPRISE AGAINST THE BRIEF AND A MILD ONE AGAINST
//    W-SCALING. Draws cost 657.3 to 776.4 s, mean 716.5 s — over the ~420 s
//    brief price by two-thirds, under the naive ~900 s W-scaling by a fifth
//    — at rss ≤ 408 MB. The mechanism is the control pass's fixed overhead:
//    the mask fill consumes one rng call per line slot (W/15 = 1.34e10
//    calls) and the marking walks the whole line regardless of density.
//    Recorded as the @31 control price for future work: ~12 min per draw on
//    this instrument, ~84 min for a seven-draw ensemble.
