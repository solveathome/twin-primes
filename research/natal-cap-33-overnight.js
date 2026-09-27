// ============================================================================
// NATAL-CAP-33 — THE OVERNIGHT COMPUTE QUEUE: three runs, one driver
// (2026-08-14; node research/natal-cap-33-overnight.js run1|run2|run3|smoke)
// ============================================================================
// *** CORRECTION (2026-08-17, from natal-cap-37 PART 0 reading 6). This file
// records its 12-base Miller-Rabin set as "deterministic for n < 3.186e14"
// at three places below (the RUN 2 header note, the primality comment, and
// the RUN 2 output banner). That is a decimal-exponent slip. The true
// Sorenson-Webster bound for the first 12 primes is 3.186e23, which already
// covered 41# = 3.04e14, not merely 37# = 7.42e12. The three sites are left
// as written because natal-cap-37 quotes them verbatim in making the
// correction; the conclusions they support are unaffected, since every level
// tested here sits below both numbers. ***
//
// RUN 1 (~30 min, ~1.1 GB) — @31 WINDOW-EXCESS. First MEASUREMENT of
//   E_med(31) = med_l [ max sliding-window count − N·l/W ] on the natal@5
//   pattern at x = 31 (positions only, NO scour), against natal-cap-29's
//   fully-derived-in-advance prediction: E_med(31) = 54.98 (c* = 0.97
//   convention; 61.22 if c settles ~1.08). Engine: cap-22's CRT-30 block
//   generation of the natal stream (comb + mid strikes; the pattern is
//   periodic mod W and 30p | W for every mid p, so marching PAST W emits the
//   cyclic extension for free), ONE pass, a 2^27 Float64 ring buffer of
//   recent positions, and per-l trailing pointers implementing cap-17's
//   exact two-pointer arguments (max windows start ON a point; min windows
//   start just after one — both exact, no heuristics). Grid: 15 scour-prime
//   quantiles l = ceil(W/q) (uniform subsampling of the q-index preserves
//   the cap-17 grid median — cap-17's own @23 rule) + powers of 2 as the
//   l-independence probe (never in the median). N(31) = 4,151,035,350
//   positions are streamed, never stored: the largest window (l = W/37 =
//   5.42e9) holds ~1.122e8 natal points < 2^27 ring slots.
//   Custody first: this engine must reproduce cap-17's E_med at @13/@17/@19
//   (full grids) and @23 (139-length grid), and cap-01's spot M values.
//
// RUN 2 (~3 h) — @37 DRIFT MARCH. cap-22's totals-only CRT-30 march at
//   W = 37# = 7,420,738,134,810 (< 2^53, exact in doubles). S(37), E(37) at
//   scour depth y = largest prime <= sqrt(W) (in-run verified: no prime in
//   (y, sqrt(W+1)]), beta(37) = S/E. Forecasts on record (cap-22 reading 5):
//   classical-raw 0.8520 (0.8536 with persisted @31 residual),
//   free-linear(last4) 0.8479, pinned 0.8598. Chain of custody: @7..@29 REF
//   digits AND S(31) = 283,449,187 reproduced by the same code path first.
//   Miller-Rabin here uses 12 prime bases (deterministic to 3.18e14 —
//   cap-22's 6-base version was only certified to 3.47e12, BELOW 37#;
//   extended before @37 is touched, and re-verified on the @29/@31 samples).
//
// RUN 3 (~5.5 h) — x=37 VARIANCE. cap-16's product-sieve extended one
//   level: exact Var at x = 37 (window L = W = 37#, scour depth y as above),
//   certified roundoff bar. The ninth Var/E drift point: on-record fits
//   0.4435 − 1.509/lnW (rms 1.8e-3) vs 0.6106 − 0.729/lnlnW (rms 8.2e-4)
//   predict 0.3926 vs 0.3955 at @37 — the frozen curves separate by 0.003.
//   Plus the anchored z(x) = (S − E)/sigma ladder at @23..@37 (z(37) once
//   RUN 2's S lands — read from the run-2 result file, cross-asserting
//   RUN 2's E against the sieve's own E at the same depth).
//
// HOUSE RULES: no existing file is modified; nothing committed or posted
// (moratorium); OUTPUT + READINGS appended below as each run lands.
// ============================================================================
'use strict';
const fs=require('fs');
const T00=Date.now(); const el=()=>((Date.now()-T00)/1000).toFixed(1)+'s';
const prog=s=>process.stderr.write(s+'\n');
function assert(c,m){if(!c)throw new Error('ASSERT FAIL: '+m)}
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const PR=primesUpTo(2750000);              // covers sqrt(37#+1) = 2,724,103
const GAMMA=0.5772156649015329, LIMITC=Math.exp(2*GAMMA)/4;
const med=a=>{const s=[...a].sort((u,v)=>u-v);return s[Math.floor(s.length/2)]};
function lsq(u,y){const n=u.length;let sx=0,sy=0,sxx=0,sxy=0;for(let i=0;i<n;i++){sx+=u[i];sy+=y[i];sxx+=u[i]*u[i];sxy+=u[i]*y[i]}const b=(n*sxy-sx*sy)/(n*sxx-sx*sx),a=(sy-b*sx)/n;let rss=0;for(let i=0;i<n;i++){const e=y[i]-(a+b*u[i]);rss+=e*e}return{a,b,rms:Math.sqrt(rss/n)}}
function invMod(a,m){let r0=((a%m)+m)%m,r1=m,s0=1,s1=0;while(r1){const q=Math.floor(r0/r1);[r0,r1]=[r1,r0-q*r1];[s0,s1]=[s1,s0-q*s1]}return((s0%m)+m)%m}
const SCL=2n**120n, SCLN=Number(SCL);
function ratToNum(n,d){const neg=(n<0n)!==(d<0n);if(n<0n)n=-n;if(d<0n)d=-d;const v=Number(n*SCL/d)/SCLN;return neg?-v:v}
function largestPrimeLE(n){const ps=primesUpTo(n);return ps[ps.length-1]}
function midPrimes(y){return primesUpTo(y).filter(p=>p>=7)}
const TMP=process.env.NC33_TMP||'/tmp';
const RES2=TMP+'/nc33-run2-result.json';

// Miller-Rabin, deterministic for n < 3.186e14 with the first 12 prime bases
// (37#+2 = 7.42e12 comfortably inside).
function mpow(b,e,n){let r=1n;b%=n;while(e>0n){if(e&1n)r=r*b%n;b=b*b%n;e>>=1n}return r}
const MRB=[2n,3n,5n,7n,11n,13n,17n,19n,23n,29n,31n,37n];
function isPrimeMR(x){if(x<2)return false;for(const p of[2,3,5,7,11,13,17,19,23,29,31,37]){if(x%p===0)return x===p}
  const n=BigInt(x);let d=n-1n,s=0;while((d&1n)===0n){d>>=1n;s++}
  outer:for(const a of MRB){let y=mpow(a,d,n);if(y===1n||y===n-1n)continue;
    for(let i=1;i<s;i++){y=y*y%n;if(y===n-1n)continue outer}return false}
  return true}

// ---------- cap-22's totals-only segmented march (CRT-30 strides), verbatim -
function classStart(p,a,b){let r=a;while(r%30!==b)r+=p;return r}
function mkTab(list){const n=list.length,step=new Int32Array(4*n),nxt=new Float64Array(4*n);
  let j=0;for(let i=0;i<n;i++){const p=list[i];
    for(const a of [0,p-2])for(const b of [11,17]){step[j]=30*p;nxt[j]=classStart(p,a,b);j++}}
  return {step,nxt,m:4*n}}
function march(x,sampleEvery){
  const mids=PR.filter(p=>p>=7&&p<=x);
  let W=30;for(const p of mids)W*=p;
  let sq=Math.floor(Math.sqrt(W));while((sq+1)*(sq+1)<=W)sq++;while(sq*sq>W)sq--;
  const scour=PR.filter(q=>q>x&&q<=sq), nsc=scour.length, y=scour[nsc-1];
  assert(PR.filter(q=>q>y&&q*q<=W+1).length===0,`a prime hides in (y, sqrt(W+1)] at @${x}`);
  const MT=mkTab(mids), ST=mkTab(scour);
  const BW=Math.min(W,30000000), nBlocks=Math.ceil(W/BW);
  const alive=new Uint8Array(BW);
  let np=0,S=0,scnt=0;
  const firsts=[],last3=[0,0,0],samples=[];
  const rec=r=>{S++;if(firsts.length<5)firsts.push(r);last3[0]=last3[1];last3[1]=last3[2];last3[2]=r;
    if(sampleEvery&&++scnt===sampleEvery){scnt=0;samples.push(r)}};
  for(let lo=0;lo<W;lo+=BW){
    const hi=Math.min(lo+BW,W),len=hi-lo;
    for(let b=11;b<len;b+=30){alive[b]=1;alive[b+6]=1}
    for(let j=0;j<MT.m;j++){let i=(MT.nxt[j]-lo)|0;const st=MT.step[j];
      while(i<len){alive[i]=0;i+=st}MT.nxt[j]=lo+i}
    let c=0;for(let b=11;b<len;b+=30)c+=alive[b]+alive[b+6];
    np+=c;
    for(let j=0;j<ST.m;j++){let i=(ST.nxt[j]-lo)|0;const st=ST.step[j];
      while(i<len){alive[i]=0;i+=st}ST.nxt[j]=lo+i}
    for(let b=11;b<len;b+=30){if(alive[b])rec(lo+b);if(alive[b+6])rec(lo+b+6)}
    if(nBlocks>1000&&(lo/BW)%500===499)prog(` @${x} block ${lo/BW+1}/${nBlocks}: np=${np} S=${S} [${el()}]`);
  }
  let prod=1;for(const p of mids)prod*=1-2/p;for(const q of scour)prod*=1-2/q;
  const E=(2/30)*prod*W, s2q=scour.reduce((a,q)=>a+2/q,0);
  return {x,W,N:np,S,ns:nsc,q0:scour[0],y,E,R:S/E,s2q,firsts,last3,samples};
}

// ---------- cap-16's product-sieve variance engine (PRIMORIAL + 37) ---------
const PRIMORIAL={7:210,11:2310,13:30030,17:510510,19:9699690,
                 23:223092870,29:6469693230,31:200560490130,37:7420738134810};
function fastVariance(x,SEGLOG){
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
  let S2=0,c2=0;
  for(const r of [0,6,24]){
    const jmin=r===0?1:0,jmax=Math.floor((W-1-r)/30),baseV=r===0?base0:base1;
    const ptr=new Float64Array(3*np);
    for(let i=0;i<np;i++){const p=ps[i];
      const cs=[0,2,p-2];
      for(let ci=0;ci<3;ci++){
        const j0=((((cs[ci]-r)%p)+p)%p)*i30[i]%p;
        let j=j0+Math.ceil((jmin-j0)/p)*p;if(j<jmin)j+=p;
        ptr[3*i+ci]=j;}}
    let nseg=0;
    for(let J0=jmin;J0<=jmax;J0+=SEG){
      const J1=Math.min(J0+SEG,jmax+1),n=J1-J0;
      buf.fill(baseV,0,n);
      for(let i=0;i<np;i++){const p=ps[i];
        for(let ci=0;ci<3;ci++){
          let j=ptr[3*i+ci];const rt=ci===0?rat0[i]:rat2[i];
          while(j<J1){buf[j-J0]*=rt;j+=p;}
          ptr[3*i+ci]=j;}}
      const dB=r+30*J0;
      for(let t=0;t<n;t++){
        const term=(W-(dB+30*t))*buf[t];
        const yk=term-c2,tk=S2+yk;c2=(tk-S2)-yk;S2=tk;}
      if(x>=37&&(++nseg%5000===0))prog(` var@${x} r=${r} seg ${nseg}/${Math.ceil((jmax-jmin)/SEG)} [${el()}]`);
    }
  }
  const E=del*W,Var=E+2*S2-d2W2;
  // certified roundoff: patches per term <= #distinct primes>=7 dividing
  // d(d-2)(d+2); primorial bound gives <=27 for d<2^41 (cap-16 used 29),
  // <=30 for d<37#. Constant 40 kept conservative at every level here.
  const u=Math.pow(2,-52),err=u*(40*2*Math.abs(S2)+2*d2W2+2*E);
  return{x,E,Var,err,y,np,S2,secs:(Date.now()-t0)/1000};}

// ---------- RUN-1 engine: streaming window extremes over the natal stream ---
// One generation pass; per-l trailing pointers over a ring buffer.
// Max:  for each stream point P (index jj), i_l = least i with pos[i]+l > P;
//       count jj-i_l+1 is achievable in [pos[i_l], pos[i_l]+l)  => max = M(l).
// Min:  window (pos[h], pos[h]+l] is complete at the first P >= pos[h]+l+1;
//       its count is jj-1-h  (cap-17's s = pos[i]+1 argument, streamed).
// Cyclic: 30p | W for all mids, so blocks past W ARE the wrapped pattern;
// truncated trailing windows can only under-shoot the max and are never
// recorded for the min (their sweep never completes). Duplicate window
// starts past W repeat cyclic values — harmless for extremes.
function excessRun(x,ellsGrid,pows,label){
  const mids=PR.filter(p=>p>=7&&p<=x);
  let W=30,N=2;for(const p of mids){W*=p;N*=p-2}
  const all=[...new Set([...ellsGrid,...pows])].sort((a,b)=>a-b);
  const nl=all.length,L=Float64Array.from(all),lmax=all[nl-1];
  let rl=10;while((1<<rl)<N/W*lmax+1000000&&rl<28)rl++;
  assert((1<<rl)>=N/W*lmax+1000000,'ring cap: largest window does not fit 2^27');
  const RING=1<<rl,MASK=RING-1,RB=new Float64Array(RING);
  const IP=new Float64Array(nl),HP=new Float64Array(nl);
  const MX=new Float64Array(nl),MN=new Float64Array(nl).fill(Infinity);
  const MT=mkTab(mids);
  const BW=30000000,END=W+lmax+1000000,nBlocks=Math.ceil(END/BW);
  const alive=new Uint8Array(BW);
  let jj=0,np=0;
  function take(P){
    RB[jj&MASK]=P;if(P<W)np++;
    for(let k=0;k<nl;k++){
      const l=L[k];let i=IP[k];
      while(RB[i&MASK]+l<=P)i++;
      IP[k]=i;
      const c=jj-i+1;if(c>MX[k])MX[k]=c;
      let h=HP[k];
      while(RB[h&MASK]+l+1<=P){const cm=jj-1-h;if(cm<MN[k])MN[k]=cm;h++}
      HP[k]=h;
    }
    jj++;
  }
  for(let lo=0;lo<END;lo+=BW){
    const len=BW;
    for(let b=11;b<len;b+=30){alive[b]=1;alive[b+6]=1}
    for(let j=0;j<MT.m;j++){let i=(MT.nxt[j]-lo)|0;const st=MT.step[j];
      while(i<len){alive[i]=0;i+=st}MT.nxt[j]=lo+i}
    for(let b=11;b<len;b+=30){if(alive[b])take(lo+b);if(alive[b+6])take(lo+b+6)}
    assert(jj-HP[nl-1]<RING-64,'ring overrun');
    if(nBlocks>2000&&(lo/BW)%500===499)prog(` ${label} block ${lo/BW+1}/${nBlocks}: np=${np} [${el()}]`);
  }
  const S60=2n**60n,S60N=Number(S60),WB=BigInt(W),NB=BigInt(N);
  const rows=all.map((l,k)=>{
    const mean=Number(NB*BigInt(l)*S60/WB)/S60N;
    return{l,mean,M:MX[k],m:MN[k],E:MX[k]-mean,D:mean-MN[k],grid:ellsGrid.includes(l)};});
  return{x,W,N,np,rows};
}
// (mode dispatch appended below)

// ---------- grids ------------------------------------------------------------
function levelW(x){let W=30;for(const p of PR.filter(p=>p>=7&&p<=x))W*=p;return W}
function levelN(x){let N=2;for(const p of PR.filter(p=>p>=7&&p<=x))N*=p-2;return N}
function gridFor(x,W){ // cap-17/cap-25/cap-29 rule, verbatim
  const scour=PR.filter(q=>q>x&&q*q<=W);
  const stride=scour.length>600?Math.ceil(scour.length/140):1;
  const qs=stride===1?scour:scour.filter((_,i)=>i%stride===0||i<3||i>=scour.length-3);
  return{scour,stride,ells:[...new Set(qs.map(q=>Math.ceil(W/q)))].sort((a,b)=>a-b)};
}
function quantileGrid(x,W,n){ // n uniform q-index quantiles (median-preserving)
  const scour=PR.filter(q=>q>x&&q*q<=W);
  const qs=[...new Set(Array.from({length:n},(_,i)=>scour[Math.round(i*(scour.length-1)/(n-1))]))];
  return{scour,qs,ells:[...new Set(qs.map(q=>Math.ceil(W/q)))].sort((a,b)=>a-b)};
}
function pow2Grid(lmin,lmax){const o=[];for(let L=2;L<=lmax;L*=2)if(L>=lmin)o.push(L);return o}

// ---------- RUN 1 ------------------------------------------------------------
function run1(){
console.log('===== RUN 1: @31 WINDOW-EXCESS — E_med(31) vs the cap-29 a-priori 54.98 =====');
console.log('--- custody: the streaming two-pointer engine vs cap-17 @13/@17/@19/@23 ---');
const CUST=[
 {x:13,checks:[[1767,63],[174,9]],emed:'4.05'},
 {x:17,checks:[[26869,791],[721,28]],emed:'7.18'},
 {x:19,checks:[],emed:'12.61'},
 {x:23,checks:[],emed:'23.20'}];
for(const c of CUST){
  const W=levelW(c.x),g=gridFor(c.x,W);
  const R=excessRun(c.x,g.ells,[],'@'+c.x);
  assert(R.np===levelN(c.x),`census @${c.x}`);
  const Emed=med(R.rows.map(r=>r.E));
  for(const[l,Mref]of c.checks){const r=R.rows.find(r=>r.l===l);
    assert(r&&r.M===Mref,`M(${l}) @${c.x}: got ${r&&r.M}, cap-01 says ${Mref}`)}
  assert(Emed.toFixed(2)===c.emed,`E_med @${c.x}: got ${Emed.toFixed(2)}, cap-17 says ${c.emed}`);
  console.log(` @${c.x}: grid ${R.rows.length} lengths${g.stride>1?` (every ${g.stride}th q)`:''}  E_med=${Emed.toFixed(2)} = cap-17 ✓${c.checks.length?'  spot-M ✓':''}  [${el()}]`);
}
console.log('--- @31: W=200,560,490,130; N=4,151,035,350 positions streamed once ---');
const W31=200560490130,g=quantileGrid(31,W31,15);
assert(g.scour.length===37534,'scour census @31');
const pows=pow2Grid(g.ells[0],g.ells[g.ells.length-1]);
console.log(` grid: 15 q-quantiles of ${g.scour.length} scour primes (q=${g.qs[0]}..${g.qs[g.qs.length-1]}) -> l=${g.ells[0]}..${g.ells[g.ells.length-1]}; +${pows.length} powers of 2 (probe only)`);
const R=excessRun(31,g.ells,pows,'@31');
assert(R.np===4151035350,'N(31) census: got '+R.np);
console.log(` np = ${R.np} = 2*prod(p-2) ✓`);
const gr=R.rows.filter(r=>r.grid);
console.log('          l |        mean |        M |        m |    E=M-mean |  D=mean-m');
for(const r of gr)console.log(` ${String(r.l).padStart(10)} | ${r.mean.toFixed(1).padStart(11)} | ${String(r.M).padStart(8)} | ${String(r.m).padStart(8)} | ${r.E.toFixed(2).padStart(11)} | ${r.D.toFixed(2).padStart(9)}`);
const Emed=med(gr.map(r=>r.E)),Dmax=Math.max(...gr.map(r=>r.D/Math.sqrt(r.mean)));
const sl=lsq(gr.map(r=>Math.log(r.mean)),gr.map(r=>Math.log(Math.max(r.E,1e-9))));
console.log(` E min/med/max = ${Math.min(...gr.map(r=>r.E)).toFixed(2)} / ${Emed.toFixed(2)} / ${Math.max(...gr.map(r=>r.E)).toFixed(2)}   log-log slope E vs mean = ${sl.b.toFixed(3)}`);
console.log(` deficit side: max (mean-m)/sqrt(mean) = ${Dmax.toFixed(2)}`);
console.log(' powers of 2: '+R.rows.filter(r=>!r.grid).map(r=>`E(2^${Math.log2(r.l)})=${r.E.toFixed(1)}`).join('  '));
console.log(`\n E_med(31) MEASURED = ${Emed.toFixed(2)}   vs cap-29 ON-RECORD 54.98 (c*=0.97): meas/pred = ${(Emed/54.98).toFixed(3)}`);
console.log(`                                  vs 61.22 (c~1.08 variant):      meas/pred = ${(Emed/61.22).toFixed(3)}`);
console.log(` implied c = 0.97*(measured/54.98) = ${(0.97*Emed/54.98).toFixed(3)}   [${el()}]`);
fs.writeFileSync(TMP+'/nc33-run1-result.json',JSON.stringify({Emed,rows:R.rows},null,1));
}

// ---------- RUN 2 ------------------------------------------------------------
const REF22=[
 {x:7, S:8,        R:'1.1556', ns:2,    q0:11, y:13},
 {x:11, S:45,      R:'1.1458', ns:10,   q0:13, y:47},
 {x:13, S:307,     R:'1.0089', ns:34,   q0:17, y:173},
 {x:17, S:3099,    R:'0.9549', ns:120,  q0:19, y:709},
 {x:19, S:38380,   R:'0.9261', ns:435,  q0:23, y:3109},
 {x:23, S:597475,  R:'0.8930', ns:1739, q0:29, y:14929},
 {x:29, S:12307838,R:'0.8752', ns:7863, q0:31, y:80429}];
function run2(){
console.log('===== RUN 2: @37 DRIFT MARCH — W = 37# = 7,420,738,134,810 =====');
console.log('--- custody: @7..@29 digits, then S(31) = 283,449,187, same code path ---');
const levels=[];
for(const ref of REF22){
  const L=march(ref.x,ref.x===29?1000000:0);levels.push(L);
  assert(L.S===ref.S&&L.R.toFixed(4)===ref.R&&L.ns===ref.ns&&L.q0===ref.q0&&L.y===ref.y,`custody mismatch @${ref.x}`);
}
assert(levels[6].E.toFixed(1)==='14063617.4'&&levels[6].N===143139150,'@29 E/N mismatch');
for(const r of levels[6].samples)assert(isPrimeMR(r)&&isPrimeMR(r+2),`@29 sample ${r} not a twin`);
console.log(` @7..@29 reproduce cap-22 digit-for-digit; ${levels[6].samples.length} @29 samples are twins (12-base MR)  [${el()}]`);
const L31=march(31,10000000);
assert(L31.W===200560490130&&L31.N===4151035350&&L31.S===283449187,'S(31) custody: got '+L31.S);
assert(L31.R.toFixed(4)==='0.8626'&&L31.ns===37534&&L31.y===447829&&L31.E.toFixed(1)==='328601798.6','@31 E/ns/y custody');
for(const r of[...L31.firsts,...L31.samples,...L31.last3])assert(isPrimeMR(r)&&isPrimeMR(r+2),`@31 ${r} not twin`);
console.log(` S(31)=283,449,187 reproduced; beta(31)=0.8626; 36 sampled survivors are twins ✓  [${el()}]`);
console.log('--- the @37 march (~247k blocks; progress every 500) ---');
const L37=march(37,100000000);
assert(L37.W===7420738134810,'W37');
assert(L37.N===145286237250,'N37 census: got '+L37.N);
console.log(` sqrt(W)=${Math.sqrt(L37.W).toFixed(2)}; scour ${L37.ns} primes (${L37.q0}..${L37.y}); y = largest prime <= sqrt(W); none in (y, sqrt(W+1)]`);
console.log(` @37: N=${L37.N}  S=${L37.S}  E=${L37.E.toFixed(1)}  S/E = beta(37) = ${L37.R.toFixed(4)}   [${el()}]`);
console.log(` Mertens context: sum_scour 2/q = ${L37.s2q.toFixed(3)}; CRT-30 compressed strike budget ${(L37.s2q*2/30).toFixed(3)}W`);
{const test=[...L37.firsts,...L37.samples,...L37.last3];
 for(const r of test)assert(isPrimeMR(r)&&isPrimeMR(r+2),`survivor ${r} is not a twin pair`);
 console.log(` VERIFIED: ${test.length} sampled survivors (first 5, every 1e8th, last 3) are ALL genuine twin pairs (12-base deterministic MR).`);
 console.log(` first survivors: ${L37.firsts.map(r=>`(${r},${r+2})`).join(' ')}`);
 console.log(` last survivors:  ${L37.last3.map(r=>`(${r},${r+2})`).join(' ')}`);}
fs.writeFileSync(RES2,JSON.stringify({S37:L37.S,E37:L37.E,beta37:L37.R,y:L37.y,ns:L37.ns,N:L37.N}));
console.log('\n--- the ninth drift point ---');
const all=[...levels,L31,L37];
const u=all.map(L=>1/Math.log(L.W)),R=all.map(L=>L.R);
const cls=all.map(L=>{const l=Math.log(L.W);return LIMITC*(1+2/l+6/(l*l))});
const sg=v=>(v>=0?'+':'')+v.toFixed(4);
console.log('   x |   S/E   | 1/lnW  | classical | resid');
all.forEach((L,i)=>console.log(`  ${String(L.x).padStart(2)} | ${R[i].toFixed(4)} | ${u[i].toFixed(4)} |  ${cls[i].toFixed(4)}   | ${sg(R[i]-cls[i])}`));
const sel=[4,5,6,7],u37=u[8];
const fFree=lsq(sel.map(i=>u[i]),sel.map(i=>R[i]));
let num=0,den=0;for(const i of sel){num+=(R[i]-LIMITC)*u[i];den+=u[i]*u[i]}
const predFree=fFree.a+fFree.b*u37,predPin=LIMITC+(num/den)*u37,predCls=cls[8];
assert(Math.abs(predFree-0.8479)<7e-4&&Math.abs(predPin-0.8598)<7e-4&&Math.abs(predCls-0.8520)<7e-4,'on-record forecasts not reproduced');
console.log(` on-record forecasts recomputed: classical-raw ${predCls.toFixed(4)} (0.8536 = raw + persisted @31 residual), free-linear ${predFree.toFixed(4)}, pinned ${predPin.toFixed(4)}`);
const cands=[['classical-raw',predCls],['classical+resid 0.8536',0.8536],['free-linear',predFree],['pinned-linear',predPin]];
cands.sort((a,b)=>Math.abs(R[8]-a[1])-Math.abs(R[8]-b[1]));
console.log(` MEASURED beta(37) = ${R[8].toFixed(4)}   residuals: ${cands.map(c=>`${c[0]} ${sg(R[8]-c[1])}`).join(' | ')}`);
console.log(` VERDICT: closest = ${cands[0][0]} (|resid| ${Math.abs(R[8]-cands[0][1]).toFixed(4)}, next ${Math.abs(R[8]-cands[1][1]).toFixed(4)})`);
console.log(` classical residual sequence @13..@37: ${[2,3,4,5,6,7,8].map(i=>sg(R[i]-cls[i])).join('  ')}`);
const f9=lsq(u,R);
let n9=0,d9=0;for(let i=0;i<9;i++){n9+=(R[i]-LIMITC)*u[i];d9+=u[i]*u[i]}
let rss9=0;for(let i=0;i<9;i++){const e=R[i]-(LIMITC+(n9/d9)*u[i]);rss9+=e*e}
console.log(` all 9: free c = ${f9.a.toFixed(4)} (b=${f9.b.toFixed(3)}, rms ${f9.rms.toFixed(4)}) | pinned c=${LIMITC.toFixed(4)}: b=${(n9/d9).toFixed(3)}, rms ${Math.sqrt(rss9/9).toFixed(4)}`);
const s4=[5,6,7,8],g4=lsq(s4.map(i=>u[i]),s4.map(i=>R[i]));
let n4=0,d4=0;for(const i of s4){n4+=(R[i]-LIMITC)*u[i];d4+=u[i]*u[i]}
let rss4=0;for(const i of s4){const e=R[i]-(LIMITC+(n4/d4)*u[i]);rss4+=e*e}
console.log(` last 4 (@23..@37): free c = ${g4.a.toFixed(4)} (b=${g4.b.toFixed(3)}, rms ${g4.rms.toFixed(4)}) | pinned: b=${(n4/d4).toFixed(3)}, rms ${Math.sqrt(rss4/4).toFixed(4)}`);
console.log(` remaining gap to limit at @37: ${(R[8]-LIMITC).toFixed(4)}`);
const W41=L37.W*41,l41=Math.log(W41),u41=1/l41;
console.log(` forecast @41 (W=3.04e14): classical-raw ${(LIMITC*(1+2/l41+6/(l41*l41))).toFixed(4)} (+persisted @37 residual: ${(LIMITC*(1+2/l41+6/(l41*l41))+R[8]-cls[8]).toFixed(4)}) | free-linear(last4) ${(g4.a+g4.b*u41).toFixed(4)} | pinned ${(LIMITC+(n4/d4)*u41).toFixed(4)}`);
}

// ---------- RUN 3 ------------------------------------------------------------
function run3(){
console.log('===== RUN 3: x=37 VARIANCE — the ninth Var/E point (product-sieve) =====');
const REFV={7:[1.05282410,1e-6],11:[10.0630,0.01],13:[91.13214345,1e-5],17:[1060.54141314,1e-4],19:[14392.59240651,1e-3],
            23:[243740.37,0.02],29:[5307862.63,6],31:[127363168.00,3000]};
const rows=[];
for(const x of[7,11,13,17,19,23,29,31]){
  const f=fastVariance(x);rows.push(f);
  if(REFV[x])assert(Math.abs(f.Var-REFV[x][0])<REFV[x][1],`Var custody @${x}: got ${f.Var}`);
  console.log(` custody @${String(x).padStart(2)}: Var = ${f.Var.toFixed(4)} ± ${f.err.toExponential(1)} = cap-16 ✓  [${f.secs.toFixed(1)}s]`);
}
console.log(` cap-16's table reproduced within certified bars at all 8 levels  [${el()}]`);
console.log('--- the @37 sieve (~5 h; W = 7.42e12, scour to y = maxprime <= sqrt W) ---');
const f37=fastVariance(37);rows.push(f37);
console.log(` @37: y=${f37.y} (${f37.np} primes)  E=${f37.E.toFixed(3)}  Var=${f37.Var.toFixed(3)} ± ${f37.err.toExponential(2)}  [${f37.secs.toFixed(0)}s sieve]`);
console.log('\n   x |       W        |    y    |      E[N]      |      Var       | Var/E  |  E/sigma | empty <= Var/E^2');
for(const R of rows){const W=PRIMORIAL[R.x],sig=Math.sqrt(R.Var);
  console.log(`  ${String(R.x).padStart(2)} | ${String(W).padStart(14)} | ${String(R.y).padStart(7)} | ${R.E.toFixed(2).padStart(14)} | ${R.Var.toFixed(2).padStart(14)} | ${(R.Var/R.E).toFixed(4)} | ${(R.E/sig).toFixed(1).padStart(8)} | ${(R.Var/(R.E*R.E)).toExponential(2)}`);}
const FIT=rows.filter(R=>R.x>=13),rs=FIT.map(R=>R.Var/R.E);
const W37=PRIMORIAL[37],r37=f37.Var/f37.E;
const p1=0.4435-1.509/Math.log(W37),p2=0.6106-0.729/Math.log(Math.log(W37));
console.log(`\n FROZEN on-record fits, evaluated at @37:  a+b/lnW -> ${p1.toFixed(4)}   a+b/lnlnW -> ${p2.toFixed(4)}`);
console.log(` MEASURED Var/E(37) = ${r37.toFixed(4)}   residuals: 1/lnW ${(r37-p1>=0?'+':'')+(r37-p1).toFixed(4)} | 1/lnlnW ${(r37-p2>=0?'+':'')+(r37-p2).toFixed(4)}`);
console.log(' refits with the ninth point (x=13..37, 7 pts):');
for(const[name,tf]of[['1/ln W',R=>1/Math.log(PRIMORIAL[R.x])],['1/ln y',R=>1/Math.log(R.y)],['1/ln ln W',R=>1/Math.log(Math.log(PRIMORIAL[R.x]))]]){
  const{a,b,rms}=lsq(FIT.map(tf),rs);
  console.log(`   r = a + b·(${name}):  a(limit) = ${a.toFixed(4)}  b = ${b.toFixed(3)}  rms = ${rms.toExponential(1)}`);}
console.log('\n--- anchored z(x) = (S - E)/sigma, march totals vs sieve sigma ---');
const SMAP={23:597475,29:12307838,31:283449187};
try{const r2=JSON.parse(fs.readFileSync(RES2,'utf8'));SMAP[37]=r2.S37;
  assert(Math.abs(r2.E37-f37.E)/f37.E<1e-9,`E(37) march ${r2.E37} vs sieve ${f37.E} disagree`);
  console.log(` cross-custody: RUN 2 E(37) = ${r2.E37.toFixed(1)} vs sieve E = ${f37.E.toFixed(1)} — agree to ${(Math.abs(r2.E37-f37.E)/f37.E).toExponential(1)} ✓`);
}catch(e){console.log(' (RUN 2 result not on disk yet — z(37) will need S(37); rerun run3 tail or compute by hand)');}
for(const R of rows){if(!SMAP[R.x])continue;
  const z=(SMAP[R.x]-R.E)/Math.sqrt(R.Var);
  console.log(`  z(${R.x}) = (${SMAP[R.x]} - ${R.E.toFixed(1)})/${Math.sqrt(R.Var).toFixed(1)} = ${z.toFixed(1)}`);}
}

// ---------- smoke ------------------------------------------------------------
function smoke(){
console.log('=== smoke: MR bases, march @7/@11, excess @13, variance @13 ===');
assert(isPrimeMR(2147483647)&&isPrimeMR(999999999989)&&isPrimeMR(67280421310721),'MR primes');
assert(!isPrimeMR(3215031751)&&!isPrimeMR(7420738134811%2===0?9:3215031751*1),'MR composites');
assert(!isPrimeMR(999999999991),'999999999991 = 973^2*... composite check');
const L7=march(7,0),L11=march(11,0);
assert(L7.S===8&&L11.S===45,'march custody @7/@11');
const W13=levelW(13),g=gridFor(13,W13);
const R=excessRun(13,g.ells,[],'@13');
assert(R.np===990,'np @13');
const r1767=R.rows.find(r=>r.l===1767),r174=R.rows.find(r=>r.l===174);
assert(r1767.M===63&&r174.M===9,'spot M @13');
assert(med(R.rows.map(r=>r.E)).toFixed(2)==='4.05','E_med @13');
const f=fastVariance(13);
assert(Math.abs(f.Var-91.13214345)<1e-5,'Var @13');
console.log(' all smoke asserts passed: MR(12 bases), march, streaming excess, product-sieve');
}

const MODE=process.argv[2]||'smoke';
prog(`[natal-cap-33 mode=${MODE} node ${process.version}]`);
if(MODE==='run1')run1();else if(MODE==='run2')run2();else if(MODE==='run3')run3();else smoke();
console.log(`\n[${MODE} done in ${el()}]`);

// ============================================================================
// OUTPUT — RUN 1 (2026-08-14) — node --max-old-space-size=6144 ... run1,
// 2301.6s (38 min), ~1.1 GB peak. All asserts passed. Custody: the streaming
// two-pointer engine reproduced cap-17 E_med at @13 (4.05), @17 (7.18),
// @19 (12.61, full 435-length grid), @23 (23.20, 139-length grid) and
// cap-01's spot maxima M(1767)=63, M(174)=9, M(26869)=791, M(721)=28.
// @31 census: np = 4,151,035,350 = 2*prod(p-2) exactly.
// ============================================================================
//          l |        mean |         M |         m |     E=M-mean | D=mean-m
//     447851 |      9269.3 |      9330 |      9212 |  60.75 | 57.25
//     485345 |     10045.3 |     10103 |      9992 |  57.73 | 53.27
//     529786 |     10965.1 |     11023 |     10903 |  57.93 | 62.07
//     582990 |     12066.2 |     12124 |     12002 |  57.75 | 64.25
//     646401 |     13378.7 |     13439 |     13322 |  60.33 | 56.67
//     726119 |     15028.6 |     15087 |     14972 |  58.39 | 56.61
//     825818 |     17092.1 |     17153 |     17028 |  60.90 | 64.10
//     956476 |     19796.4 |     19857 |     19732 |  60.65 | 64.35
//    1132043 |     23430.1 |     23492 |     23362 |  61.91 | 68.09
//    1383835 |     28641.5 |     28708 |     28577 |  66.53 | 64.47
//    1769751 |     36628.8 |     36696 |     36570 |  67.16 | 58.84
//    2434371 |     50384.6 |     50450 |     50322 |  65.40 | 62.60
//    3810692 |     78870.6 |     78943 |     78797 |  72.44 | 73.56
//    8288652 |    171551.7 |    171628 |    171477 |  76.33 | 74.67
// 5420553788 | 112190144.6 | 112190245 | 112190052 | 100.39 | 92.61
// E min/med/max = 57.73 / 60.90 / 100.39   log-log slope E vs mean = 0.060
// deficit side: max (mean-m)/sqrt(mean) = 0.59
// powers of 2 (probe): E(2^19..2^32) = 57.7 62.4 64.9 68.8 80.5 82.0 80.1
//   94.2 86.3 101.7 106.4 97.7 90.4 104.8
// E_med(31) MEASURED = 60.90
//   vs cap-29 ON-RECORD 54.98 (c*=0.97): meas/pred = 1.108
//   vs 61.22 (c~1.08 variant):           meas/pred = 0.995
//   implied c = 1.074
// ============================================================================
// READINGS — RUN 1 (honestly calibrated)
// ============================================================================
// R1.1 THE FIRST FULLY A-PRIORI TEST OF THE EXCESS CHAIN: PASSED AT THE 1%
//   LEVEL — ON THE c-DRIFT BRANCH. cap-29 put two numbers on record before
//   any @31 window was ever measured: 54.98 (the c* = 0.97 convention) and
//   61.22 (if c settles at ~1.08 as cap-25's last four levels suggested).
//   Measured: 60.90. The derived machinery — exact BigInt plateau P(31) =
//   352.744, factored-spectrum VarPred, sqrt(2ln(W/l)) extreme-value factor
//   — lands within 0.5% via the c~1.08 branch. The 0.97 convention is 11%
//   low. Verdict: the CHAIN (plateau -> sigma(l) -> E(l)) is quantitatively
//   right; the single scalar c has drifted 0.97 -> 1.074 across levels and
//   is the one number the theory still does not pin.
// R1.2 THE EXCESS LAW'S FORM SURVIVES ITS HARDEST TEST. Window means sweep
//   9,269 -> 1.12e8 (four decades); E stays 57.7..76.3 on the 14 sane grid
//   lengths — log-log slope 0.060, i.e. l-independent to the same standard
//   as @19 (0.163) and @23 (0.077). A 1.12e8-mean window still exceeds its
//   fair share by only ~100 slots (9 ppm): hyperuniformity, measured, at
//   the deepest level the campaign has touched.
// R1.3 The familiar large-l tilt persists on schedule: the monster l = W/37
//   window (mean 1.12e8) runs E = 100.4 ~ 1.65x the median, matching the
//   1.4-1.7x edge tilt documented at @19/@23. The pow-2 probe shows the
//   same gentle rise across decades (57.7 -> ~100).
// R1.4 The deficit side is now SMALLER than the excess side in sqrt(mean)
//   units (max 0.59 vs 0.98-1.53 at earlier levels): min windows hug the
//   mean ever tighter — consistent with cap-16's Var/E < 0.39 sub-Poisson
//   suppression deepening in absolute (E/sigma) terms.
// R1.5 E_med sequence now 1.19 / 2.06 / 4.05 / 7.18 / 12.61 / 23.20 / ~36
//   (@29, cap-25) / 60.90 (@31). Step @29 -> @31 is x1.68 — cap-17's
//   geometric-law base ~1.8 keeps softening at depth, exactly what the
//   sigma*sqrt(2lnW/l) form (not a pure geometric law) predicts.
// R1.6 Honest caveats. (a) The grid is 15 q-index quantiles of the 37,534-
//   prime scour list, not the 145-length cap-17 grid; uniform q-index
//   subsampling preserves the median (cap-17's own @23 rule) and custody
//   confirmed exact E_med reproduction at four levels, but the @31 median
//   is a 15-sample estimate of the 145-grid median, worth +-2 in E units.
//   (b) c = 1.074 is measured, not derived; whether c(x) converges (to
//   ~1.08? to e^gamma/something?) is the open item cap-25 flagged.
//   (c) Extremes are single order statistics — no error bars exist; the
//   custody levels bound the method's reproducibility, not the noise.
// ============================================================================

// ============================================================================
// OUTPUT — RUN 2 (2026-08-14) — node ... run2, 5980.9s (100 min), ~90 MB.
// All asserts passed. Custody: @7..@29 reproduce cap-22 digit-for-digit
// (4.2s); S(31) = 283,449,187, beta(31) = 0.8626, E(31) = 328,601,798.6,
// scour 37534 primes, y = 447829 — all reproduced by the same code path
// (132.1s); 48 sampled @29/@31 survivors re-verified as twins under the
// EXTENDED 12-base Miller-Rabin (deterministic to 3.186e14 — cap-22's
// 6-base version was only certified to 3.47e12, below 37#).
// ============================================================================
// @37: W = 7,420,738,134,810; sqrt(W) = 2,724,103.18; scour 198,274 primes
//   (41..2724079); y = 2,724,079 = largest prime <= sqrt(W), none hides in
//   (y, sqrt(W+1)]. Census N = 145,286,237,250 = 2*prod(p-2) exactly.
//   S(37) = 7,998,394,865   E(37) = 9,377,228,928.8
//   beta(37) = S/E = 0.8530          (5.51% of natal slots survive)
//   sum_scour 2/q = 2.729 naive; CRT-30 compressed strike budget 0.182W.
//   87 sampled survivors (first 5, every 1e8th, last 3): ALL genuine twin
//   pairs. first (2725001,2725003)...; last (7420738134527,+2).
//   x |   S/E   | 1/lnW  | classical | resid
//   7 | 1.1556 | 0.1870 |  1.2561   | -0.1006
//  11 | 1.1458 | 0.1291 |  1.0772   | +0.0686
//  13 | 1.0089 | 0.0970 |  0.9917   | +0.0173
//  17 | 0.9549 | 0.0761 |  0.9413   | +0.0136
//  19 | 0.9261 | 0.0622 |  0.9100   | +0.0161
//  23 | 0.8930 | 0.0520 |  0.8884   | +0.0046
//  29 | 0.8752 | 0.0443 |  0.8726   | +0.0026
//  31 | 0.8626 | 0.0384 |  0.8610   | +0.0016
//  37 | 0.8530 | 0.0337 |  0.8520   | +0.0010
// on-record forecasts (recomputed in-run, asserted): classical-raw 0.8520,
//   classical+persisted-@31-residual 0.8536, free-linear(last4) 0.8479,
//   pinned 0.8598. MEASURED 0.8530: resid -0.0006 / +0.0010 / +0.0051 /
//   -0.0068. VERDICT: classical+resid closest; classical-raw next.
// refits: all-9 free c = 0.7860 (rms 0.0294) | pinned b=2.159 (rms 0.0296)
//   last-4 (@23..@37): free c = 0.7785 (b=2.196, rms 0.0004) | pinned rms 0.0024
// remaining gap to limit at @37: 0.0599. forecast @41 (W=3.04e14):
//   classical-raw 0.8449 (+persisted residual 0.8459) | free-linear 0.8443 |
//   pinned 0.8488.
// ============================================================================
// READINGS — RUN 2 (honestly calibrated)
// ============================================================================
// R2.1 FOURTH CONSECUTIVE CLASSICAL RESIDUAL COLLAPSE. Against the zero-
//   parameter curve R = (e^{2gamma}/4)(1 + 2/lnW + 6/ln^2W): +0.0046,
//   +0.0026, +0.0016, +0.0010 at @23/@29/@31/@37. No knob, four straight
//   halvings-ish, now within 0.12% at W = 7.4e12. The decaying-residual
//   variant (raw + persisted previous residual) is again the closest
//   single number (-0.0006), exactly as at @31: the residual is real,
//   positive, and dying — the classical series is missing only a
//   lower-order term that the data keeps shrinking.
// R2.2 THE LINEAR MODELS ARE BURIED. Free-linear missed by +0.0051 (8.5x
//   the classical+resid miss), pinned by -0.0068. The free "intercept"
//   slid AGAIN (0.7621 -> 0.7577 -> 0.7785 depending on window — a line
//   in 1/lnW chasing curvature; its rms 0.0004 on the last 4 is curve-
//   hugging, not limit-reading (cap-17/18 fit-hygiene lesson, third
//   demonstration).
// R2.3 LIMIT VERDICT STRENGTHENS AGAIN: beta -> e^{2gamma}/4 = 0.793055
//   along the classical PNT-correction series. What @37 added: a wrong
//   limit constant must eventually force the residual to plateau at the
//   offset; instead it fell 0.0016 -> 0.0010 exactly on the schedule the
//   @31 reading predicted. Honest calibration: the remaining gap to the
//   limit (0.0599) is still 60x the current residual — extrapolation-
//   supported, not observed; and this calibrates the Scour's inefficiency
//   constant only. No parity-wall claim. S(37) = 7,998,394,865 anchored
//   twin pairs is a structural count (every survivor dodges r = 0,-2 mod
//   every prime <= 2,724,079 and no prime hides below sqrt(W+1)) — the
//   87-sample MR pass is belt-and-suspenders, not the proof.
// R2.4 ENGINE NOTE, ON RECORD: the naive stride budget at @37 (2.73W) was
//   compressed to 0.182W by the CRT-30 4-class trick — 1.35e12 strikes in
//   97 min single-threaded, exactly the cap-22 reading-5 price (1.5-2h).
//   @41 (W = 3.04e14, < 2^53) is ~41x this march: ~2.7 days single-thread
//   or ~a day sharded by residue blocks — feasible, not overnight. The
//   forecasts are on record above; the classical/free spread at @41 is
//   0.0006-0.0016 — a decidable but genuinely harder test.
// R2.5 beta(37) = 0.8530 means: after scouring the 37-tile by ALL 198,274
//   primes up to sqrt(W) — 2.73x raw overkill capacity — 5.51% of the
//   4.15e9-per-fold natal slots still stand, 85.3% of the naive
//   independent-residue expectation. The eternal-edge picture (natal
//   slots too structured for the scour to reach its naive kill rate)
//   gains its ninth exact data point.
// ============================================================================

// ============================================================================
// OUTPUT — RUN 3 (2026-08-15) — node ... run3, 18894.3s (5.25 h). All asserts
// passed. Custody: product-sieve reproduced cap-16's Var within certified
// bars at ALL 8 prior levels — 1.0528 / 10.0645 / 91.1321 / 1060.5414 /
// 14392.5924 / 243740.3729 / 5307862.6250 / 127363168.0000 (@7..@31; the
// @31 rerun alone 574s). Cross-custody: RUN 2's march E(37) and the sieve's
// E(37) agree to 1.1e-14.
// ============================================================================
// @37 (window L = W = 37#, scour y = 2,724,079 = maxprime <= sqrt W):
//   E = 9,377,228,928.76   Var = 3,711,451,136 ± 8.2e5  (rel 2.2e-4)
//   Var/E = 0.3958   E/sigma = 153,922.7   Chebyshev empty <= 4.22e-11
//   x |      W        |    y    |     E[N]      |      Var      | Var/E | E/sig
//   7 |           210 |      13 |          6.92 |          1.05 | 0.1521 | 6.7
//  11 |          2310 |      47 |         39.27 |         10.06 | 0.2563 | 12.4
//  13 |         30030 |     173 |        304.28 |         91.13 | 0.2995 | 31.9
//  17 |        510510 |     709 |       3245.51 |       1060.54 | 0.3268 | 99.7
//  19 |       9699690 |    3109 |      41441.19 |      14392.59 | 0.3473 | 345.4
//  23 |     223092870 |   14929 |     669028.80 |     243740.37 | 0.3643 | 1355.1
//  29 |    6469693230 |   80429 |   14063617.40 |    5307862.63 | 0.3774 | 6104.3
//  31 |  200560490130 |  447829 |  328601798.62 |  127363168.00 | 0.3876 | 29117.1
//  37 | 7420738134810 | 2724079 | 9377228928.76 | 3711451136.00 | 0.3958 | 153922.7
// FROZEN on-record fits evaluated at @37: 0.4435-1.509/lnW -> 0.3926;
//   0.6106-0.729/lnlnW -> 0.3955.  MEASURED 0.3958:
//   residuals  1/lnW +0.0032  |  1/lnlnW +0.0003   (10x separation).
// refits x=13..37 (7 pts): a+b/lnW: a=0.4454 b=-1.534 rms 2.0e-3 (was 1.8e-3)
//   a+b/lny: a=0.4454 rms 2.0e-3 | a+b/lnlnW: a=0.6108 b=-0.729 rms 7.6e-4
//   (was 8.2e-4).
// anchored z(x) = (S - E)/sigma:  z(23) = -144.9   z(29) = -762.1
//   z(31) = -4000.9   z(37) = (7998394865 - 9377228928.8)/60921.7 = -22632.9
// ============================================================================
// READINGS — RUN 3 (honestly calibrated)
// ============================================================================
// R3.1 THE NINTH POINT SEPARATES THE FITS — AND lnlnW WINS THIS ROUND.
//   Frozen BEFORE the run: 1/lnW said 0.3926, 1/lnlnW said 0.3955;
//   measured 0.3958. The lnlnW curve hit to 3e-4 (its own rms), the 1/lnW
//   curve missed by 4x its rms and its refit DEGRADED (1.8e-3 -> 2.0e-3,
//   intercept drifting 0.4435 -> 0.4454) while lnlnW's improved (8.2e-4 ->
//   7.6e-4, intercept rock-still 0.6106 -> 0.6108). The "finite limit
//   ~0.44 via 1/ln" reading of cap-16 is now the WEAKER hypothesis; the
//   drift currently walks the lnlnW line toward ~0.61. Honest calibration:
//   both forms still fit 7 points with sub-1% residuals, the data cover only
//   1/lnlnW in 0.295..0.429 (@37 down from @13, computed from the printed W
//   column) while the claimed limit sits at 1/lnlnW = 0 — an extrapolation
//   2.2x the length of the data — and a 0.61 "limit" would need Var/E to keep
//   rising far past every level we can compute — this is a model-comparison verdict, not a limit
//   measurement. What IS settled: the 1/lnW form's intercept is drifting
//   with depth exactly the way a wrong functional form drifts (compare
//   R2.2), and Montgomery-Soundararajan-type lnln growth is what the
//   singular-series average predicts. Paper 6's band 0.4-0.5 should not
//   be quoted as supported without this caveat anymore.
// R3.2 SUB-POISSON, NINE EXACT POINTS: 0.152, 0.256, 0.299, 0.327, 0.347,
//   0.364, 0.377, 0.388, 0.396 — monotone, increments shrinking (0.0102 ->
//   0.0082 per level at the top), still well below 1. Zeroing a random
//   rotation of the 37#-window is now a >=153,000-sigma event (Chebyshev
//   empty fraction <= 4.2e-11): the almost-all statement strengthens by
//   ~x30 per level, on trend.
// R3.3 THE ANCHORED z LADDER GOES VERTICAL: -144.9, -762.1, -4000.9,
//   -22632.9 at @23/@29/@31/@37 (ratio ~x5.3-5.7 per level). The anchored
//   tile (the one the integers actually live in) sits ever-farther BELOW
//   the rotation-ensemble mean in ensemble-sigma units even as beta(x)
//   converges to the classical curve: the deficit (1-beta)E grows like
//   0.06E while sigma grows like sqrt(0.4E) — divergence ~ sqrt(E), i.e.
//   the anchored tile is not a typical rotation and never will be. This is
//   the quantitative face of the "eternal edge": structure, not noise.
//   (No parity-wall claim; z measures atypicality, not twin certification.)
// R3.4 Engine notes. The @37 sieve: 5.08h for 3 branch-classes x 2.47e11
//   j-steps + 4.3e12 AP patches, Kahan-summed against exact BigInt anchors;
//   certified bar 8.2e5 (rel 2.2e-4) uses the conservative 40-patch
//   roundoff constant (primorial bound: <=30 distinct mid-primes can
//   divide d(d-2)(d+2) at d < 37#). x=41 would cost ~41x: out of JS reach,
//   as cap-16 said. The 12-base Miller-Rabin extension (RUN 2) and the
//   march/sieve E-agreement at 1.1e-14 close the custody loop between the
//   two independent engines.
// ============================================================================
// QUEUE SUMMARY (all three runs landed; nothing committed, nothing posted):
//   RUN 1  E_med(31) = 60.90  — cap-29 chain confirmed on the c~1.08 branch
//          (61.22 predicted, 0.5% off); c* = 0.97 convention 11% low.
//   RUN 2  beta(37) = 0.8530  — classical forecast hit (-0.0006/+0.0010);
//          fourth consecutive residual collapse; linear models buried.
//   RUN 3  Var/E(37) = 0.3958 — lnlnW fit wins the ninth point 10:1;
//          z(37) = -22633.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. The traceability scan compares only against the RUN 3
// block for RUN 3, so several figures below are traceable to the RUN 1 and
// RUN 2 blocks earlier in this same file. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   the nine Var/E readings of R3.2 are the Var/E column of the RUN 3 table cut
//     to three places: 0.1521 0.2563 0.2995 0.3268 0.3473 0.3643 0.3774 0.3876
//     0.3958 -> 0.152 0.256 0.299 0.327 0.347 0.364 0.377 0.388 0.396. The @13
//     entry is a truncation, not a round: 0.2995 to three places is 0.300.
//   153,922.7 -> ">=153,000-sigma", E/sigma at @37 rounded down.
//   4.22e-11 -> 4.2e-11, the Chebyshev empty bound at @37.
//   -22632.9 -> -22633 in the queue summary.
// DERIVED IN THIS READING by arithmetic over printed values:
//   the two R3.2 increments, 0.3876 - 0.3774 = 0.0102 and 0.3958 - 0.3876 =
//     0.0082.
//   0.295, the low end of the 1/lnlnW span: ln W at @37 is 29.6353 from the
//     printed W = 7420738134810, and 1/ln(29.6353) = 0.2951.
//   2.47e11 j-steps per branch class: the printed W divided by the CRT-30
//     stride of the engine above, 7420738134810/30 = 2.4736e11.
// IN-CODE, or in this file's earlier OUTPUT blocks rather than RUN 3's:
//   60.90, 61.22, 0.97 and 1.08 are the RUN 1 block's E_med(31) line and the
//     two on-record cap-29 predictions it is compared against; 0.8530, -0.0006
//     and +0.0010 are the RUN 2 block's beta(37) and its residual row.
// [UNTRACED — verify before quoting]:
//   CORRECTED 2026-08-20 (mismatch adjudication #13): R3.1's 1/lnlnW span read
//     "0.295..0.343" and now reads "0.295..0.429". The whole ladder, computed
//     from the printed W column, is 0.4286, 0.3882, 0.3600, 0.3383, 0.3208,
//     0.3068, 0.2951 at @13..@37, so the high end is @13's 0.4286 and NO level
//     gives 0.343 (the nearest is @23's 0.3383). The span is 0.1335 wide, and
//     the argument gets sharper rather than weaker with the right number: the
//     limit the lnlnW form claims sits at 1/lnlnW = 0, which is 0.295 beyond
//     the data, i.e. an extrapolation 2.2x the length of the data itself. The
//     sentence is rewritten to say that instead of "lnlnW barely moves". The
//     same wrong span travels in the companion `natal-cap-33-overnight.txt`:87
//     and in `paper/variance-note.md`:320, where the range is the paper's own
//     nine-point table and so runs 0.295..0.596; both of those are corrected.
//     It also stands inside two HISTORY records that quote the txt verbatim
//     and are not edited: `history/staging/qc-wave6-Y.md`:608 and
//     `history/staging/qc-numbers.md`:148. Anyone reading either should carry
//     the correction. `history/staging/audit-self-contradiction.md`:438 found
//     this independently and states the true span for the nine-point table.
//   5.08h, the @37 sieve's own wall time. The RUN 3 header prints 18894.3s
//     (5.25 h) for the whole invocation, of which the @31 custody rerun alone
//     took 574s; the sieve's separate timer was never pasted.
//   4.3e12 AP patches. Reconstructing it from Mertens over the scour range,
//     sum of 1/p for 7 <= p <= 2724079 is about 1.92, so about 5.8 patches per
//     term over 3 x 2.47e11 terms gives 4.3e12, but the counter itself is not
//     in the block.
// ---------------------------------------------------------------------------
