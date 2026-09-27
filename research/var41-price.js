// ============================================================================
// VAR41-PRICE — the instrument check and the honest price of Var(41)
// (2026-08-19; node research/var41-price.js [--at31])
// ============================================================================
// TODO item 2 asks for Var(41) so the anchored note's section 3 z column runs
// ten levels, and so TODO item 9's Var/E limit question gets a tenth point.
// This file does three things and launches nothing.
//
// PART 0  FREEZE CHECK. Recomputes every number registered in
//   research/history/staging/var41-prereg.md from the published inputs it
//   names, and aborts on any mismatch. The prereg was committed alone before
//   this file existed; this part makes that freeze machine-checkable.
//
// PART 1  THE INSTRUMENT. The z <= 37 column was produced by ONE engine:
//   cap-16's segmented product-sieve fastVariance(), levels 7..31 in
//   research/natal-cap-16-fast-variance.js and level 37 by the same function
//   copied verbatim into research/natal-cap-33-overnight.js RUN 3. The engine
//   is reproduced here verbatim once more and required to return the published
//   Var at @23, @29 and (with --at31) @31 to the printed digits.
//
// PART 2  THE PRICE. An op model for fastVariance -- j-steps W/10, AP patches
//   3(W/10)sum_{7<=p<=y}1/p, segment overhead 9*np*W/(30*SEG) -- calibrated
//   against the two measured wall times on record (508 s at @31, cap-16;
//   5.08 h at @37, cap-33 R3.4) and against this machine's own timings from
//   PART 1. Then the same model at @41, plus the certified roundoff bar,
//   plus the shard plan that would make it feasible.
//
// PART 3  READINGS, including the launch/decline verdict.
//
// NOTHING IS LAUNCHED BY THIS FILE. Its @31 reproduction is ~10 min at nice.
// ============================================================================
'use strict';
const T0=Date.now();
const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
const AT31=process.argv.includes('--at31');
let FAIL=0;
function ck(name,cond,detail){ if(!cond){FAIL++;console.log(`  FAIL ${name}: ${detail}`);} else console.log(`  ok   ${name}${detail?'  '+detail:''}`); }
function near(a,b,tol){ return Math.abs(a-b)<=tol; }

// ---------- utilities (cap-16 verbatim) --------------------------------------
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
function midPrimes(y){return primesUpTo(y).filter(p=>p>=7)}
function largestPrimeLE(n){const ps=primesUpTo(n);return ps[ps.length-1]}
function invMod(a,m){let r0=((a%m)+m)%m,r1=m,s0=1,s1=0;while(r1){const q=Math.floor(r0/r1);[r0,r1]=[r1,r0-q*r1];[s0,s1]=[s1,s0-q*s1]}return((s0%m)+m)%m}
const SCL=2n**120n, SCLN=Number(SCL);
function ratToNum(n,d){return Number(n*SCL/d)/SCLN}

const PRIMORIAL={7:210,11:2310,13:30030,17:510510,19:9699690,
                 23:223092870,29:6469693230,31:200560490130,
                 37:7420738134810,41:304250263527210};

// ---------- PUBLISHED INPUTS (embedded artifacts, cited, not recomputed) -----
// natal-cap-16-fast-variance.js PART 3 (levels 7..31) and
// natal-cap-33-overnight.js RUN 3 OUTPUT (level 37); both reproduced in
// paper/variance-note.md section 7.
const PUB={
  7 :{W:210,               y:13,      E:6.92,             Var:1.05,          r:0.1521},
  11:{W:2310,              y:47,      E:39.27,            Var:10.06,         r:0.2563},
  13:{W:30030,             y:173,     E:304.28,           Var:91.13,         r:0.2995},
  17:{W:510510,            y:709,     E:3245.51,          Var:1060.54,       r:0.3268},
  19:{W:9699690,           y:3109,    E:41441.19,         Var:14392.59,      r:0.3473},
  23:{W:223092870,         y:14929,   E:669028.80,        Var:243740.37,     r:0.3643},
  29:{W:6469693230,        y:80429,   E:14063617.40,      Var:5307862.63,    r:0.3774},
  31:{W:200560490130,      y:447829,  E:328601798.62,     Var:127363168.00,  r:0.3876},
  37:{W:7420738134810,     y:2724079, E:9377228928.76,    Var:3711451136,    r:0.3958},
};
// paper/anchored-note.md section 3, from natal-cap-37-at41-march.js
const S41=256725962834, E41=303627067641.7, W41=304250263527210;
// measured wall times on record for the engine
const REC_SECS={31:508, 37:18288};   // cap-16 PART 2e "[508s sieve]"; cap-33 R3.4 "5.08h"

// ============================================================================
// PART 0 — freeze check on the pre-registration
// ============================================================================
console.log('=== PART 0: freeze check on research/history/staging/var41-prereg.md ===');
{
  ck('W(41) = 41#', PRIMORIAL[41]===W41 && W41===304250263527210, `W = ${W41}`);
  let s=Math.floor(Math.sqrt(W41)); while((s+1)*(s+1)<=W41)s++; while(s*s>W41)s--;
  const psq=primesUpTo(s), y41=psq[psq.length-1], np41=psq.filter(p=>p>=7).length;
  ck('floor sqrt(41#) = 17,442,771', s===17442771, `s = ${s}`);
  ck('y(41) = 17,442,769',           y41===17442769, `y = ${y41}, mid-primes = ${np41}`);
  const u41=Math.log(W41)/Math.log(y41);
  ck('u(41) = 2.0000005',            near(u41,2.0000005,5e-7), `u = ${u41.toFixed(7)}`);
  const law=u=>Math.exp(-(0.24*u*u+0.13*u));
  ck('stable law at u=2 gives 0.29523', near(law(2),0.29523,5e-6), `exp(-1.22) = ${law(2).toFixed(5)}`);
  // residual ladder and its increments
  const XS=[7,11,13,17,19,23,29,31,37], res=XS.map(x=>PUB[x].r-law(2));
  const inc=[]; for(let i=1;i<res.length;i++) inc.push(res[i]-res[i-1]);
  ck('residuals monotone increasing', inc.every(d=>d>0), 'increments ' + inc.map(d=>d.toFixed(4)).join(' '));
  ck('last increment +0.0082',  near(inc[inc.length-1],0.0082,5e-5), `${inc[inc.length-1].toFixed(4)}`);
  ck('prior increment +0.0102', near(inc[inc.length-2],0.0102,5e-5), `${inc[inc.length-2].toFixed(4)}`);
  const ratio=inc[inc.length-1]/inc[inc.length-2];
  ck('increment shrink ratio ~0.80', near(ratio,0.80,0.02), `ratio = ${ratio.toFixed(3)}`);
  const rPred=PUB[37].r+0.0066, rLo=PUB[37].r+0.0055, rHi=PUB[37].r+0.0082;
  ck('registered r(41) = 0.4024',   near(rPred,0.4024,6e-5), `${rPred.toFixed(4)}`);
  ck('registered band [0.4013,0.4040]', near(rLo,0.4013,6e-5)&&near(rHi,0.4040,6e-5), `[${rLo.toFixed(4)}, ${rHi.toFixed(4)}]`);
  // the two fit families at 41
  const lw=Math.log(W41), llw=Math.log(lw);
  ck('lnW(41) = 33.34886',   near(lw,33.34886,5e-5), lw.toFixed(5));
  ck('lnlnW(41) = 3.50702',  near(llw,3.50702,5e-5), llw.toFixed(5));
  const f8a=0.4435-1.509/lw, f8b=0.6106-0.729/llw, f9a=0.4454-1.534/lw, f9b=0.6108-0.729/llw;
  ck('frozen-8 1/lnW -> 0.3983',    near(f8a,0.3983,6e-5), f8a.toFixed(4));
  ck('frozen-8 1/lnlnW -> 0.4027',  near(f8b,0.4027,6e-5), f8b.toFixed(4));
  ck('refit-9 1/lnW -> 0.3994',     near(f9a,0.3994,6e-5), f9a.toFixed(4));
  ck('refit-9 1/lnlnW -> 0.4029',   near(f9b,0.4029,6e-5), f9b.toFixed(4));
  ck('refit-9 separation 0.0035',   near(f9b-f9a,0.0035,6e-5), (f9b-f9a).toFixed(4));
  const r4=v=>Math.round(v*1e4)/1e4;
  ck('frozen-8 separation 0.0044 (difference of the two rounded endpoints, as the prereg formed it)',
     near(r4(f8b)-r4(f8a),0.0044,1e-9), `${(r4(f8b)-r4(f8a)).toFixed(4)}; the direct difference is ${(f8b-f8a).toFixed(5)}, which rounds to 0.0045`);
  // lever arm
  const ab=x=>1/Math.log(Math.log(PRIMORIAL[x]));
  ck('1/lnlnW(13) = 0.42861', near(ab(13),0.42861,5e-5), ab(13).toFixed(5));
  ck('1/lnlnW(37) = 0.29508', near(ab(37),0.29508,5e-5), ab(37).toFixed(5));
  ck('1/lnlnW(41) = 0.28514', near(ab(41),0.28514,5e-5), ab(41).toFixed(5));
  const grow=(ab(37)-ab(41))/(ab(13)-ab(37));
  ck('lever arm grows 7.4%', near(grow,0.074,0.002), `${(100*grow).toFixed(1)}%`);
  // z(41) forecast
  const sg=r=>Math.sqrt(r*E41), z=r=>(S41-E41)/sg(r);
  ck('sigma(41) at r=0.4024 is 349,542', Math.round(sg(rPred))===349542,
     `${sg(rPred).toFixed(0)}   PREREG SLIP: the sealed file says 349,540; the exact value is 349,542`);
  ck('z(41) forecast -134,180',          Math.abs(z(rPred)+134180)<10, `${z(rPred).toFixed(0)}`);
  ck('z band [-134,363, -133,913]', Math.abs(z(rLo)+134363)<2 && Math.abs(z(rHi)+133913)<2,
     `[${z(rLo).toFixed(0)}, ${z(rHi).toFixed(0)}]   PREREG SLIP: the sealed file says [-134,310, -134,030], which was formed from the wrong r endpoints; the band that the registered r band [0.4013, 0.4040] actually implies is this one, half-width 225`);
  ck('z(41)/z(37) = 5.93', near(z(rPred)/(-22632.9),5.93,0.01), (z(rPred)/(-22632.9)).toFixed(2));
  // z is insensitive to Var: the 1% claim
  ck('1% in Var moves z by 0.5%', near(Math.abs(z(rPred*1.01)/z(rPred)-1),0.005,3e-4),
     `${(100*Math.abs(z(rPred*1.01)/z(rPred)-1)).toFixed(3)}%`);
}

// ============================================================================
// PART 1 — the instrument: cap-16's fastVariance, verbatim, re-run
// ============================================================================
// Copied unchanged from research/natal-cap-16-fast-variance.js PART 2c, with
// one addition that changes no arithmetic: an optional exact patch counter and
// patch-weighted error accumulator, used only to price the bar (COUNT=true).
function fastVariance(x,SEGLOG,COUNT){
  const t0=Date.now(),W=PRIMORIAL[x];
  let s=Math.floor(Math.sqrt(W));while((s+1)*(s+1)<=W)s++;while(s*s>W)s--;
  const y=largestPrimeLE(s),ps=midPrimes(y),np=ps.length;
  let dn=2n,dd=30n,gn=1n,gd=1n;
  for(const p of ps){const B=BigInt(p);dn*=B-2n;dd*=B;gn*=B-4n;gd*=B;}
  const del=ratToNum(dn,dd);
  const WB=BigInt(W),d2W2=ratToNum(dn*dn*WB*WB,dd*dd);
  const base0=ratToNum(2n*gn,30n*gd),base1=ratToNum(gn,30n*gd);
  const rat0=new Float64Array(np),rat2=new Float64Array(np),i30=new Float64Array(np);
  for(let i=0;i<np;i++){const p=ps[i];rat0[i]=(p-2)/(p-4);rat2[i]=(p-3)/(p-4);i30[i]=invMod(30,p);}
  const SEG=1<<(SEGLOG||22),buf=new Float64Array(SEG);
  const cnt=COUNT?new Float64Array(SEG):null;
  let S2=0,c2=0,wSum=0,wc=0,npatch=0,nseg=0,maxk=0;
  for(const r of [0,6,24]){
    const jmin=r===0?1:0,jmax=Math.floor((W-1-r)/30),baseV=r===0?base0:base1;
    const ptr=new Float64Array(3*np);
    for(let i=0;i<np;i++){const p=ps[i];
      const cs=[0,2,p-2];
      for(let ci=0;ci<3;ci++){
        const j0=((((cs[ci]-r)%p)+p)%p)*i30[i]%p;
        let j=j0+Math.ceil((jmin-j0)/p)*p;if(j<jmin)j+=p;
        ptr[3*i+ci]=j;}}
    for(let J0=jmin;J0<=jmax;J0+=SEG){
      const J1=Math.min(J0+SEG,jmax+1),n=J1-J0;
      buf.fill(baseV,0,n); if(COUNT)cnt.fill(0,0,n);
      nseg++;
      for(let i=0;i<np;i++){const p=ps[i];
        for(let ci=0;ci<3;ci++){
          let j=ptr[3*i+ci];const rt=ci===0?rat0[i]:rat2[i];
          if(COUNT){while(j<J1){buf[j-J0]*=rt;cnt[j-J0]+=1;npatch++;j+=p;}}
          else     {while(j<J1){buf[j-J0]*=rt;j+=p;}}
          ptr[3*i+ci]=j;}}
      const dB=r+30*J0;
      for(let t=0;t<n;t++){
        const term=(W-(dB+30*t))*buf[t];
        const yk=term-c2,tk=S2+yk;c2=(tk-S2)-yk;S2=tk;
        if(COUNT){ if(cnt[t]>maxk)maxk=cnt[t];
          const w=(cnt[t]+3)*term, yw=w-wc, tw=wSum+yw; wc=(tw-wSum)-yw; wSum=tw; }}
    }
  }
  const E=del*W,Var=E+2*S2-d2W2;
  const u=Math.pow(2,-52),err=u*(29*2*S2+2*d2W2+2*E);
  const errW=COUNT?u*(2*wSum+2*d2W2+2*E):null;
  return{x,W,E,Var,err,errW,y,np,S2,nseg,npatch,maxk,kbar:COUNT?npatch/(3*(W/30)):null,
         secs:(Date.now()-t0)/1000};}

console.log('\n=== PART 1: instrument identification and reproduction ===');
console.log('  The z<=37 column has ONE producer: cap-16 fastVariance() (levels 7..31),');
console.log('  copied verbatim into cap-33 RUN 3 for level 37. Re-run here unchanged.');
const LEVELS=AT31?[23,29,31]:[23,29];
const REPRO=[];
for(const x of LEVELS){
  const f=fastVariance(x);REPRO.push(f);
  const P=PUB[x];
  ck(`@${x} Var reproduces published`, near(f.Var,P.Var,Math.max(f.err,5e-3)),
     `Var = ${f.Var.toFixed(2)} vs published ${P.Var}  (bar ${f.err.toExponential(1)}, ${f.secs.toFixed(1)}s)`);
  ck(`@${x} E reproduces published`, Math.abs(f.E-P.E)<=0.006, `E = ${f.E.toFixed(2)} vs ${P.E} (published to 2 dp)`);
  ck(`@${x} y reproduces published`, f.y===P.y, `y = ${f.y} (${f.np} mid-primes)`);
  ck(`@${x} Var/E reproduces published`, near(f.Var/f.E,P.r,5e-5), `r = ${(f.Var/f.E).toFixed(4)} vs ${P.r}`);
}
// patch-count measurement at @29: what the bar would be if each term were
// charged its OWN patch count instead of the worst case.
console.log('\n  --- patch-count census at @29 (bar tightening measurement) ---');
const C29=fastVariance(29,22,true);
ck('@29 counted run agrees with uncounted', near(C29.Var,PUB[29].Var,Math.max(C29.err,1e-2)),
   `Var = ${C29.Var.toFixed(3)}`);
console.log(`    patches = ${C29.npatch.toExponential(4)}   mean k = ${C29.kbar.toFixed(3)}   max k = ${C29.maxk}`);
{
  const y=C29.y,ps=midPrimes(y);let inv=0;for(const p of ps)inv+=1/p;
  ck('mean k matches 3*sum_{7<=p<=y}1/p', near(C29.kbar,3*inv,0.02), `3*sum 1/p = ${(3*inv).toFixed(3)}`);
  console.log(`    worst-case bar  ${C29.err.toExponential(3)}   (constant 29)`);
  console.log(`    patch-weighted  ${C29.errW.toExponential(3)}   (each term charged its own k+3)`);
  console.log(`    tightening factor = ${(C29.err/C29.errW).toFixed(2)}x`);
}

// ============================================================================
// PART 2 — the price of @41
// ============================================================================
console.log('\n=== PART 2: the price of Var(41) ===');
function ops(x,SEGLOG){
  const W=PRIMORIAL[x];
  let s=Math.floor(Math.sqrt(W));while((s+1)*(s+1)<=W)s++;while(s*s>W)s--;
  const y=largestPrimeLE(s),ps=midPrimes(y),np=ps.length;
  let inv=0;for(const p of ps)inv+=1/p;
  const SEG=Math.pow(2,SEGLOG||22);
  const jsteps=W/10;                       // 3 classes x W/30 buffer entries
  const patches=3*(W/10)*inv;              // sum_p 3*(W/10)/p
  const segs=3*Math.ceil((W/30)/SEG);
  const ovh=segs*3*np;                     // pointer sweep per segment per prime
  return{W,y,np,inv,jsteps,patches,segs,ovh,total:jsteps+patches+ovh};
}
console.log('  op model: j-steps W/10, AP patches 3(W/10)*sum_{7<=p<=y}1/p,');
console.log('            segment overhead 3*nseg*np   (SEG = 2^22 doubles = 33.6 MB)');
console.log('   x |     W      |     y      |   np    | sum1/p | j-steps  | patches  | overhead | total');
for(const x of [29,31,37,41]){
  const o=ops(x,22);
  console.log(`  ${String(x).padStart(2)} | ${o.W.toExponential(3)} | ${String(o.y).padStart(10)} | ${String(o.np).padStart(7)} | ${o.inv.toFixed(3)} | ${o.jsteps.toExponential(2)} | ${o.patches.toExponential(2)} | ${o.ovh.toExponential(2)} | ${o.total.toExponential(3)}`);
}
console.log('\n  calibration of the model against the two recorded wall times:');
const o31=ops(31,22),o37=ops(37,22),o41=ops(41,22);
const thr31=o31.total/REC_SECS[31], thr37=o37.total/REC_SECS[37];
console.log(`    @31  ${o31.total.toExponential(3)} ops / ${REC_SECS[31]} s  = ${thr31.toExponential(3)} ops/s   (cap-16 PART 2e)`);
console.log(`    @37  ${o37.total.toExponential(3)} ops / ${REC_SECS[37]} s  = ${thr37.toExponential(3)} ops/s   (cap-33 R3.4, 5.08 h)`);
ck('the two recorded points give the same throughput within 15%',
   Math.abs(thr31/thr37-1)<0.15, `ratio = ${(thr31/thr37).toFixed(3)}`);
// this machine, now, under load
if(REPRO.length){
  for(const f of REPRO){ const o=ops(f.x,22);
    console.log(`    this machine @${f.x}: ${o.total.toExponential(3)} ops / ${f.secs.toFixed(1)} s = ${(o.total/f.secs).toExponential(3)} ops/s`);}
}
const thr=Math.min(thr31,thr37);
const secs41=o41.total/thr, secs41f=o41.total/Math.max(thr31,thr37);
console.log(`\n  @41 single-thread: ${o41.total.toExponential(3)} ops`);
console.log(`    at the slower recorded throughput: ${(secs41/3600).toFixed(1)} h  = ${(secs41/86400).toFixed(2)} days`);
console.log(`    at the faster recorded throughput: ${(secs41f/3600).toFixed(1)} h  = ${(secs41f/86400).toFixed(2)} days`);
console.log(`    op ratio @41/@37 = ${(o41.total/o37.total).toFixed(1)}x   (W ratio ${(o41.W/o37.W).toFixed(1)}x)`);
// bigger segments kill the overhead term
const o41b=ops(41,26);
console.log(`\n  with SEG = 2^26 (537 MB/shard) the overhead term falls`);
console.log(`    ${o41.ovh.toExponential(2)} -> ${o41b.ovh.toExponential(2)} ops, total ${o41.total.toExponential(3)} -> ${o41b.total.toExponential(3)}`);
console.log(`    single-thread at the slower throughput: ${(o41b.total/thr/3600).toFixed(1)} h`);
console.log(`    op ratio @41/@37 at SEG = 2^26: ${(o41b.total/ops(37,26).total).toFixed(1)}x`);
if(REPRO.length){const f=REPRO[REPRO.length-1],o=ops(f.x,22);
  console.log(`    at THIS machine's loaded throughput (${(o.total/f.secs).toExponential(3)} ops/s): ${(o41b.total/(o.total/f.secs)/3600).toFixed(0)} h single-thread`);}
// sharding
console.log('\n  shard plan (the j-loop over each comb class splits at any J0):');
for(const k of [2,3,4,8,10]){
  console.log(`    ${String(k).padStart(2)} shards: ${(o41b.total/thr/3600/k).toFixed(1)} h wall  (+ ${(3*o41b.np*k/1e6).toFixed(1)}e6 pointer re-seeks, negligible)`);
}
console.log(`    10 shards on top of a 4x faster native inner loop: ${(o41b.total/thr/3600/10/4).toFixed(1)} h wall`);
// the certified bar
console.log('\n  certified roundoff bar at @41 (the second, independent price):');
{
  const u=Math.pow(2,-52), r=0.4024, V=r*E41, d2=E41*E41, S2=(d2-E41+V)/2;
  const bar=C=>u*(C*2*S2+2*d2+2*E41);
  // calibrate the model on the published @37 bar (cap-33 uses C=40)
  const E37=PUB[37].E,V37=PUB[37].Var,d237=E37*E37,S237=(d237-E37+V37)/2;
  const b37=u*(40*2*S237+2*d237+2*E37);
  ck('bar model reproduces the published @37 bar 8.2e5', near(b37,8.2e5,2e4), b37.toExponential(3));
  const o=ops(41,22);let inv=0;{const ps=midPrimes(o.y);for(const p of ps)inv+=1/p;}
  const kbar41=3*inv+3;
  for(const [tag,C] of [['worst case C=36 (primorial bound at 41#)',36],
                        ['cap-33 constant C=40',40],
                        [`patch-weighted, mean k+3 = ${kbar41.toFixed(2)}`,kbar41]]){
    const b=bar(C);
    console.log(`    ${tag}: Var = ${V.toExponential(4)} +/- ${b.toExponential(3)}  rel ${(b/V).toExponential(2)}  dr = ${(b/E41).toFixed(5)}`);
  }
  console.log(`    the prereg's INDECISIVE rule fires at dr >= 0.0009.`);
  ck('worst-case bar is INDECISIVE by the registered rule', bar(36)/E41>=0.0009, `dr = ${(bar(36)/E41).toFixed(5)}`);
  ck('patch-weighted bar is DECISIVE by the registered rule', bar(kbar41)/E41<0.0009, `dr = ${(bar(kbar41)/E41).toFixed(5)}`);
}

// ============================================================================
// PART 3 — verdict
// ============================================================================
console.log('\n=== PART 3: verdict ===');
{
  const o=ops(41,26), h=o.total/thr/3600;
  console.log(`  single-thread ${h.toFixed(0)} h; 3 free cores here -> ${(h/3).toFixed(0)} h; all 10 -> ${(h/10).toFixed(0)} h.`);
  console.log('  Budget for tonight was ~15 h at nice on a SHARED machine already');
  console.log('  running seven heavy node jobs (load average 7.7 of 10 cores).');
  console.log('  DECLINED. Readings below.');
}
console.log(`\n${FAIL===0?'ALL CHECKS PASSED':FAIL+' CHECK(S) FAILED'}  [${el()}]`);
process.exitCode=FAIL?1:0;

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/var41-price.js -- --at31
//   invocation:  node research/var41-price.js --at31
//   code-sha256: 7f2ab9f9b1ee1b0db45d62c854398b284e620d363646d212fe6b28904a9fed35
//   out-sha256:  0d835865d2dac1f65caeb482b046e4f12761e6ad1e1e476b6257714a86767b0f
//   body-lines:  106
//   restamped:   2026-08-20 normalize migration; body verified byte-authentic under the bind-time rule (pre-min (before 2026-08-20)) before the hash moved
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     961.5 s
// ============================================================================
// === PART 0: freeze check on research/history/staging/var41-prereg.md ===
//   ok   W(41) = 41#  W = 304250263527210
//   ok   floor sqrt(41#) = 17,442,771  s = 17442771
//   ok   y(41) = 17,442,769  y = 17442769, mid-primes = 1117919
//   ok   u(41) = 2.0000005  u = 2.0000000
//   ok   stable law at u=2 gives 0.29523  exp(-1.22) = 0.29523
//   ok   residuals monotone increasing  increments 0.1042 0.0432 0.0273 0.0205 0.0170 0.0131 0.0102 0.0082
//   ok   last increment +0.0082  0.0082
//   ok   prior increment +0.0102  0.0102
//   ok   increment shrink ratio ~0.80  ratio = 0.804
//   ok   registered r(41) = 0.4024  0.4024
//   ok   registered band [0.4013,0.4040]  [0.4013, 0.4040]
//   ok   lnW(41) = 33.34886  33.34887
//   ok   lnlnW(41) = 3.50702  3.50702
//   ok   frozen-8 1/lnW -> 0.3983  0.3983
//   ok   frozen-8 1/lnlnW -> 0.4027  0.4027
//   ok   refit-9 1/lnW -> 0.3994  0.3994
//   ok   refit-9 1/lnlnW -> 0.4029  0.4029
//   ok   refit-9 separation 0.0035  0.0035
//   ok   frozen-8 separation 0.0044 (difference of the two rounded endpoints, as the prereg formed it)  0.0044; the direct difference is 0.00448, which rounds to 0.0045
//   ok   1/lnlnW(13) = 0.42861  0.42861
//   ok   1/lnlnW(37) = 0.29508  0.29508
//   ok   1/lnlnW(41) = 0.28514  0.28514
//   ok   lever arm grows 7.4%  7.4%
//   ok   sigma(41) at r=0.4024 is 349,542  349542   PREREG SLIP: the sealed file says 349,540; the exact value is 349,542
//   ok   z(41) forecast -134,180  -134179
//   ok   z band [-134,363, -133,913]  [-134363, -133913]   PREREG SLIP: the sealed file says [-134,310, -134,030], which was formed from the wrong r endpoints; the band that the registered r band [0.4013, 0.4040] actually implies is this one, half-width 225
//   ok   z(41)/z(37) = 5.93  5.93
//   ok   1% in Var moves z by 0.5%  0.496%
//
// === PART 1: instrument identification and reproduction ===
//   The z<=37 column has ONE producer: cap-16 fastVariance() (levels 7..31),
//   copied verbatim into cap-33 RUN 3 for level 37. Re-run here unchanged.
//   ok   @23 Var reproduces published  Var = 243740.37 vs published 243740.37  (bar 3.1e-3, 1.1s)
//   ok   @23 E reproduces published  E = 669028.80 vs 669028.8 (published to 2 dp)
//   ok   @23 y reproduces published  y = 14929 (1745 mid-primes)
//   ok   @23 Var/E reproduces published  r = 0.3643 vs 0.3643
//   ok   @29 Var reproduces published  Var = 5307862.63 vs published 5307862.63  (bar 1.4e+0, 29.4s)
//   ok   @29 E reproduces published  E = 14063617.40 vs 14063617.4 (published to 2 dp)
//   ok   @29 y reproduces published  y = 80429 (7870 mid-primes)
//   ok   @29 Var/E reproduces published  r = 0.3774 vs 0.3774
//   ok   @31 Var reproduces published  Var = 127363168.00 vs published 127363168  (bar 7.4e+2, 892.0s)
//   ok   @31 E reproduces published  E = 328601798.62 vs 328601798.62 (published to 2 dp)
//   ok   @31 y reproduces published  y = 447829 (37542 mid-primes)
//   ok   @31 Var/E reproduces published  r = 0.3876 vs 0.3876
//
//   --- patch-count census at @29 (bar tightening measurement) ---
//   ok   @29 counted run agrees with uncounted  Var = 5307862.625
//     patches = 3.2079e+9   mean k = 4.958   max k = 15
//   ok   mean k matches 3*sum_{7<=p<=y}1/p  3*sum 1/p = 4.958
//     worst-case bar  1.361e+0   (constant 29)
//     patch-weighted  4.471e-1   (each term charged its own k+3)
//     tightening factor = 3.05x
//
// === PART 2: the price of Var(41) ===
//   op model: j-steps W/10, AP patches 3(W/10)*sum_{7<=p<=y}1/p,
//             segment overhead 3*nseg*np   (SEG = 2^22 doubles = 33.6 MB)
//    x |     W      |     y      |   np    | sum1/p | j-steps  | patches  | overhead | total
//   29 | 6.470e+9 |      80429 |    7870 | 1.653 | 6.47e+8 | 3.21e+9 | 3.68e+6 | 3.859e+9
//   31 | 2.006e+11 |     447829 |   37542 | 1.794 | 2.01e+10 | 1.08e+11 | 5.39e+8 | 1.285e+11
//   37 | 7.421e+12 |    2724079 |  198283 | 1.924 | 7.42e+11 | 4.28e+12 | 1.05e+11 | 5.131e+12
//   41 | 3.043e+14 |   17442769 | 1117919 | 2.042 | 3.04e+13 | 1.86e+14 | 2.43e+13 | 2.411e+14
//
//   calibration of the model against the two recorded wall times:
//     @31  1.285e+11 ops / 508 s  = 2.530e+8 ops/s   (cap-16 PART 2e)
//     @37  5.131e+12 ops / 18288 s  = 2.805e+8 ops/s   (cap-33 R3.4, 5.08 h)
//   ok   the two recorded points give the same throughput within 15%  ratio = 0.902
//     this machine @23: 1.222e+8 ops / 1.1 s = 1.104e+8 ops/s
//     this machine @29: 3.859e+9 ops / 29.4 s = 1.313e+8 ops/s
//     this machine @31: 1.285e+11 ops / 892.0 s = 1.441e+8 ops/s
//
//   @41 single-thread: 2.411e+14 ops
//     at the slower recorded throughput: 264.7 h  = 11.03 days
//     at the faster recorded throughput: 238.8 h  = 9.95 days
//     op ratio @41/@37 = 47.0x   (W ratio 41.0x)
//
//   with SEG = 2^26 (537 MB/shard) the overhead term falls
//     2.43e+13 -> 1.52e+12 ops, total 2.411e+14 -> 2.183e+14
//     single-thread at the slower throughput: 239.7 h
//     op ratio @41/@37 at SEG = 2^26: 43.4x
//     at THIS machine's loaded throughput (1.441e+8 ops/s): 421 h single-thread
//
//   shard plan (the j-loop over each comb class splits at any J0):
//      2 shards: 119.8 h wall  (+ 6.7e6 pointer re-seeks, negligible)
//      3 shards: 79.9 h wall  (+ 10.1e6 pointer re-seeks, negligible)
//      4 shards: 59.9 h wall  (+ 13.4e6 pointer re-seeks, negligible)
//      8 shards: 30.0 h wall  (+ 26.8e6 pointer re-seeks, negligible)
//     10 shards: 24.0 h wall  (+ 33.5e6 pointer re-seeks, negligible)
//     10 shards on top of a 4x faster native inner loop: 6.0 h wall
//
//   certified roundoff bar at @41 (the second, independent price):
//   ok   bar model reproduces the published @37 bar 8.2e5  8.200e+5
//     worst case C=36 (primorial bound at 41#): Var = 1.2218e+11 +/- 7.779e+8  rel 6.37e-3  dr = 0.00256
//     cap-33 constant C=40: Var = 1.2218e+11 +/- 8.597e+8  rel 7.04e-3  dr = 0.00283
//     patch-weighted, mean k+3 = 9.13: Var = 1.2218e+11 +/- 2.278e+8  rel 1.86e-3  dr = 0.00075
//     the prereg's INDECISIVE rule fires at dr >= 0.0009.
//   ok   worst-case bar is INDECISIVE by the registered rule  dr = 0.00256
//   ok   patch-weighted bar is DECISIVE by the registered rule  dr = 0.00075
//
// === PART 3: verdict ===
//   single-thread 240 h; 3 free cores here -> 80 h; all 10 -> 24 h.
//   Budget for tonight was ~15 h at nice on a SHARED machine already
//   running seven heavy node jobs (load average 7.7 of 10 cores).
//   DECLINED. Readings below.
//
// ALL CHECKS PASSED  [961.4s]
// ============================================================================
// READINGS
// ============================================================================
// V1 ONE INSTRUMENT, NOT TWO. Every entry of the z<=37 Var column comes from
//   cap-16's fastVariance(): a segmented product-sieve over d in the three
//   comb classes 0,+/-6 (mod 30), exact and linear in W, Kahan-summed against
//   exact BigInt anchors for delta, base_r and delta^2 W^2. cap-33 RUN 3 did
//   not write a new engine; it copied that function verbatim, the only
//   differences being a progress print and the roundoff constant (29 in
//   cap-16, C=40 in cap-33), and ran it one level deeper. So "the instrument"
//   is one function, and PART 1's reproduction reproduces the whole column's
//   producer, not a cousin of it. The reproduction is exact at three levels:
//   @23 Var = 243740.37, @29 Var = 5307862.63 and @31 Var = 127363168.00, on
//   the printed digits, with E and y matching too, @31 taking 892.0 s here.
//   The independent check behind the shallow end is older still: cap-16 PART
//   2d puts this engine against natal5-variance.js's direct O(W*pi(y)) sum at
//   @7 through @19, so the column has two engines under it up to @19 and one
//   from @23 up.
// V2 THE STREAMING LEVER IS ALREADY PULLED. The brief asked whether a
//   segmented or streaming route makes @41 feasible. It is already the route:
//   fastVariance streams a 2^22-double window along the d-line in one pass
//   with constant memory, exactly the shape of the T29 scan-statistic engine.
//   There is no second lever of that kind left. What remains is arithmetic:
//   2.183e+14 elementary ops, because W ratio 41.0x.
// V3 THE PRICE IS TEN DAYS OF ONE CORE. The op model calibrated on the two
//   recorded wall times (508 s at @31, cap-16; 18288 s at @37, cap-33) gives
//   2.530e+8 and 2.805e+8 ops/s, agreeing to ratio = 0.902, and that
//   agreement is what makes the extrapolation trustworthy. Raising SEG from
//   2^22 to 2^26 drops the segment-overhead term from 2.43e+13 to 1.52e+12
//   ops, worth having at @41 and worth nothing at @37. The answer is
//   239.7 h single-thread.
// V4 SHARDING IS CLEAN AND DOES NOT RESCUE IT TONIGHT. The j-loop splits at
//   any J0: a shard re-seeds 3*np AP pointers with one modular inverse each
//   and returns a partial Kahan S2, and the partials add. 10 shards: 24.0 h
//   wall. 3 shards: 79.9 h. This machine has 10 cores and is already carrying
//   seven heavy node jobs, so ten shards means taking the whole machine for a
//   day and three shards means three days. Neither is a 15-hour job. The
//   measured throughput here confirms it: the @31 reproduction ran at
//   1.441e+8 ops/s against the 2.530e+8 the same level recorded when the
//   machine was quiet, so a shard here is worth little more than half a
//   calibration core, and 421 h single-thread is the number that actually
//   applies tonight.
// V5 THE SECOND PRICE IS PRECISION, AND IT IS THE MORE INTERESTING ONE. The
//   certified bar is u*(C*2*S2 + 2*d2W2 + 2*E), and since 2*S2 ~ d2W2 = E^2
//   the bar tracks E, so it grows about thirtyfold per level. The model
//   reproduces the published @37 bar (8.200e+5) exactly. Carried to @41 with
//   the worst case C=36 it gives rel 6.37e-3, that is dr = 0.00256, against a
//   refit-9 separation 0.0035 between the two live fit families. The run as
//   the engine stands is INDECISIVE for TODO item 9 by the rule registered
//   before the price was known.
// V6 THE BAR IS FIXABLE FOR ALMOST FREE, AND THE CENSUS SAYS BY HOW MUCH.
//   The worst-case constant charges every term the maximum number of rounding
//   errors; the true count is the number of mid-primes dividing
//   d(d-2)(d+2), whose mean is 3*sum_{7<=p<=y}1/p. Measured exactly at @29:
//   mean k = 4.958, max k = 15, against a worst case of 29, and charging
//   each term its own k+3 tightens that level's bar by 3.05x. At @41 the same
//   accounting gives mean k+3 = 9.13 and dr = 0.00075, inside the registered
//   0.0009 threshold. One extra add per patch is the whole cost. Any future
//   @41 run must carry this change: it is the difference between a point that
//   adjudicates item 9 and a point that only closes the z column.
// V7 THE TWO CONSUMERS WANT DIFFERENT THINGS AND ONE IS NEARLY FREE. z scales
//   as Var^(-1/2), so a 1% error in Var moves z by 0.496%. The registered
//   band already delivers Var to better than that: z(41) = -134179 with band
//   [-134363, -133913], half-width 225, on a quantity whose interest is the
//   5.93 step over z(37). That is a forecast and not a measurement, and the
//   anchored note's section 3 is a table of exact numbers, so it must not be
//   pasted in. But it does mean the SHAPE of the z ladder, which is the
//   reading the note actually leans on, is not waiting on 239.7 h of compute.
//   What is waiting is the exactness of one cell.
// V8 WHAT WOULD CHANGE THE PRICE, AND WHAT WOULD NOT. Not the algorithm: the
//   sum runs over every d < W in the three comb classes and each must be
//   touched. Rewriting J5 = base * g(d) h(d-2) h(d+2) as a triple divisor sum
//   over e|d, f1|d-2, f2|d+2 has bounded total weight, since
//   prod(1+2/(p-4)) * prod(1+1/(p-4))^2 is O(ln^4 y), but unbounded term
//   count, and truncating it needs a tail bound nobody in this corpus has.
//   That is a research problem, not an optimisation. The realistic path is a
//   native inner loop (the patch loop is a strided read-modify-write, which
//   is where JS gives up the most) on top of the shard plan: at a 4x native
//   speedup, 10 shards land at 6.0 h wall on a quiet machine. That is a
//   different night, and it should carry V6's bar with it.
// V9 CUSTODY NOTE, AGAINST MYSELF. PART 0 found two arithmetic slips in the
//   sealed prereg, both in derived quantities rather than in the registered
//   prediction: sigma(41) was written 349,540 where the exact value is
//   349,542, and the z band was written [-134,310, -134,030] where the
//   registered r band [0.4013, 0.4040] actually implies [-134363, -133913].
//   The sealed file is not edited; the corrections are recorded here and in a
//   dated correction block appended to it. The registered prediction itself,
//   r(41) = 0.4024 with band [0.4013, 0.4040], is untouched and reproduces.
// ============================================================================
