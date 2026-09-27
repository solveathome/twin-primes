// ============================================================================
// measure-0830-rho-sup-z41.js — THE EXACT sup|rho~| AT z = 41, AND sup|R_H| AT
// H = z^3 AND z^4: TODO ITEM 0's FIRST MOVE (b), THE UNRUN FALSIFIER OF REC(3,3)
// ============================================================================
// Write-up: research/history/staging/measure-0830-rho-sup-z41.md.
//
// THE OBJECT, UNCHANGED FROM EVERY EXISTING EXACT LEVEL (rho-exact-z31-01.js
// header; attack-0829n-rml-proof.md sec.3). s = 3.0, D = z^s, the term list
// from sift-limit-lemmaV.js buildTerms(z, D) — the identical call. rho(y) =
// sum_j w_j psi((y - c_j)/q_j), psi(t) = t - floor(t) - 1/2, period W = P(z) =
// prod_{p<z} p; rho~ = rho + M/2, M = sum_j w_j/q_j. sup|rho~| is the maximum
// over ALL W positions. R_H(x) = rho~(x) - rho~(x+H); REC(s, u0) asks
// sup_x |R_H(x)| <= z^{u0/2 - eps} <R_H^2>^{1/2} at H = floor(z^{u0}), and
// its finite-z falsifier (rml-proof sec.6) is sup|R_H| >= HM - 1 at H = z^3.
// No normalisation is introduced and none is changed.
//
// WHAT IS NEW IN THE ENGINE, AND WHY EACH PIECE COMPUTES THE SAME OBJECT.
//   (a) REFLECTION. For integer y, rho~(W - 3 - y) = -rho~(y). Proof: the term
//       set is symmetric under (d1, d2) -> (d2, d1) (the COMB list in
//       buildTerms is), the partner of class c mod q is -2 - c mod q (r == 0
//       mod d1, r == -2 mod d2 becomes r == -2 mod d1, r == 0 mod d2 under
//       r -> -r - 2), and psi(-t) = -psi(t) off the integers while
//       psi(-t) = -psi(t) - 1 at them; summing, rho(-y-2) = -rho(y) - K(y)
//       with K(y) = sum_{j: y == c_j (q_j)} w_j, and since rho~(y) = rho~(y-1)
//       + M - K(y) this reads rho~(-y-2) = -rho~(y-1). Hence sup over
//       [0, ceil(W/2) + HMAX + 4) together with the wrap chunk
//       [W - 2 - HMAX, W) is the sup over the whole period, and likewise
//       R_H(W - 3 - H - x) = R_H(x). S0 checks the identity at every position
//       of z = 13, 17, 19 and checks the half-range engine against the
//       full-period engine at z = 13..31.
//   (b) A PERIODIC TABLE for the terms whose modulus divides P(29): their
//       stamping contribution K_small(y) has period P(29) = 6,469,693,230 and
//       is built once into a shared Int8 array; only the residual terms are
//       stamped per block. K(y) = K_block(y) + K_small(y) is the same exact
//       integer as before, so the double recurrence v += M - K is bit-identical
//       to the old engine's (S0 reproduces rho-exact-z31-01 at z = 31 and 37
//       digit for digit with the old chunking, 'legacy' mode).
//   (c) PER-BLOCK RE-SEEDING ('reseed' mode): v is reset to the exact O(n)
//       rho(a) at every block start, so the float drift never exceeds one
//       block's worth; the worst |recurrence - exact| at any block boundary is
//       printed. The old engine re-seeded per chunk only.
// Everything else — psi, the term list, M, the stamping — is the old code.
//
// STAGES (a multi-tail file; embed each tail on its own).
//   --stage A          S0 controls and custody; S1 exact sup|rho~| and
//                      sup|R_H| at z = 13..37 by the new engine; S2 closed-form
//                      <R_H^2> at H = z^3, z^4 for z = 13..41 (the PROVEN
//                      identity of sift-limit-lemmaV, multi-H, checked against
//                      L.meanSquare); S3 the position counts the z = 41 run
//                      must visit (naive, half+wrap); S4 PRE-REGISTRATION:
//                      the seven-point forecasts and kill thresholds, written
//                      to this tail BEFORE any z = 41 segment runs.
//                      Per-position costs are measured here and go to STDERR
//                      only (embed with --streams both).
//   --stage T [--a0 y]  a main-thread timing probe on 2^26 positions, STDERR
//                      only, never embedded; it is how the two V8 fast-path
//                      defects below were found and are re-checked.
//   --stage B --seg k/K   segment k of the z = 41 half-range walk (the wrap
//                      chunk rides with the last segment). Prints its own
//                      sup|rho~|, argmax and the O(n) recomputation at the
//                      argmax, sup|R_H| for both H, the walked sum of R_H^2,
//                      the positions visited and the worst block drift. The
//                      combination over segments is a max and a sum, done in
//                      the note on the embedded columns.
//
// CUSTODY. Cited, never recomputed here except where marked: sup|rho~| at
// z = 13..29 (rho-maxlaw-01 S1 via rho-exact-z31-01 S2), at 31 and 37
// (rho-exact-z31-01 S2: 28.122062, 52.219092), <rho~^2> at 41 = 11.99697^2
// (theta-ladder sec.2 via rho-exact-z31-01 S4), M(41) = 2.624e-2 (same), the
// seven-point slope 2.7660 +/- 0.2120 (attack-0829n-rml-proof S5), beta_2
// = 4.26645 (paper/beta2-note.md). Each is printed beside its recomputation.
//
// WIDTHS. W(41) = 7,420,738,134,810 < 2^53; every position, class and modulus
// is an exact double; (a - c) % q is exact. Table indices < 2^33 are exact
// doubles used as Int8Array subscripts (an Int8Array of 6.47e9 elements is
// legal in this node). Weights are +/-1 so K is a small exact integer; the
// table's min/max are printed and must lie inside Int8.
//
//   node research/history/staging/measure-0830-rho-sup-z41.js --stage A
//   node research/history/staging/measure-0830-rho-sup-z41.js --stage B --seg 1/3
// ============================================================================
'use strict';
const path=require('path');
const os=require('os');
const {Worker,isMainThread,parentPort,workerData}=require('worker_threads');
const L=require(path.join(__dirname,'..','..','sift-limit-lemmaV.js'));
const S=3.0, BETA2=4.26645;
const NW=os.cpus().length;                     // measured, not assumed
const BSHIFT=21, RSHIFT=22;                    // stamping block 2^21; ring 2^22 > 41^4
const TABLE_Z=30;                              // the table's period is P(30) = prod p<30 = P(29)
function primesBelow(n){const s=new Uint8Array(n),o=[];for(let i=2;i<n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<n;j+=i)s[j]=1;}}return o;}
function periodOf(z){let W=1;for(const p of primesBelow(z))W*=p;return W;}
function lnWof(z){let s=0;for(const p of primesBelow(z))s+=Math.log(p);return s;}
const err=(m)=>process.stderr.write(m+'\n');
const T0=Date.now(); const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
const pad=(x,w)=>String(x).padStart(w);
const argv=process.argv.slice(2);
const optOf=(n,d)=>{const i=argv.indexOf('--'+n);return i===-1?d:argv[i+1];};
const STAGE=optOf('stage','A');
const SEG=optOf('seg','1/1').split('/').map(Number);
const HSof=(z)=>[Math.floor(Math.pow(z,3)),Math.floor(Math.pow(z,4))];   // u0 = 3 and 4
const tableP=(z)=>periodOf(Math.min(z,TABLE_Z));

// --- exact rho at an arbitrary position, O(n): the old function verbatim -------
function rhoAt(a,n,q,c,w){let r=0;for(let j=0;j<n;j++){const qj=q[j];let x=(a-c[j])%qj;if(x<0)x+=qj;r+=w[j]*(x/qj-0.5);}return r;}

// --- split the terms: table terms (q | P) and residual terms ---------------------
function splitTerms(t,P){
  const sq=[],sc=[],sw=[],lq=[],lc=[],lw=[];
  for(let j=0;j<t.n;j++){ if(P%t.q[j]===0){sq.push(t.q[j]);sc.push(t.c[j]);sw.push(t.w[j]);} else {lq.push(t.q[j]);lc.push(t.c[j]);lw.push(t.w[j]);} }
  return {sq:Float64Array.from(sq),sc:Float64Array.from(sc),sw:Int8Array.from(sw),
          lq:Float64Array.from(lq),lc:Float64Array.from(lc),lw:Int8Array.from(lw)};
}
// build the table slice [lo, hi) of K_small (each worker builds one slice)
// V8 INDEXING NOTE: a typed-array subscript above 2^31 leaves the fast path
// (measured 272 ns/position on the smoke test against 13 ns), so the 6.47e9
// table is addressed through views of at most 2^30 entries and small offsets.
const VLEN=1<<30;
function tableViews(sab,P){const v=[];for(let off=0;off<P;off+=VLEN)v.push(new Int8Array(sab,off,Math.min(VLEN,P-off)));return v;}
function buildTableSlice(sab,sp,lo,hi){
  const n=sp.sq.length, V=new Int8Array(sab,lo,hi-lo), len=hi-lo; V.fill(0);
  for(let j=0;j<n;j++){const qj=sp.sq[j],wj=sp.sw[j];let x0=(sp.sc[j]-lo)%qj;if(x0<0)x0+=qj;
    for(let i=x0;i<len;i+=qj)V[i]+=wj;}
  let mn=0,mx=0; for(let i=0;i<len;i++){const v=V[i];if(v<mn)mn=v;if(v>mx)mx=v;}
  return {mn,mx};
}

// --- the chunk walker --------------------------------------------------------------
// mode 'legacy': one seed per chunk, no window trackers, the old recurrence
//                bit for bit (K_block + K_small is the same exact integer).
// mode 'reseed': exact re-seed at every block; window trackers for HS.
function walkChunk(t,sp,VIEWS,P,HS,a0,a1,mode){
  const n=t.n,q=t.q,c=t.c,w=t.w,M=t.M;
  const lq=sp.lq,lc=sp.lc,lw=sp.lw,nl=lq.length;
  const reseed=(mode==='reseed');
  const nH=reseed?HS.length:0, H0=nH>0?HS[0]:0, H1=nH>1?HS[1]:0, HMAX=nH?HS[nH-1]:0;
  const RMASK=(1<<RSHIFT)-1, RB=reseed?new Float64Array(1<<RSHIFT):null;
  const B=1<<BSHIFT, K=new Int32Array(B);
  let v=rhoAt(a0,n,q,c,w);
  let sup=0,arg=a0,s1=0,s2=0,cnt=0,drift=0;
  // ring index kept as a small integer counter: y & RMASK on a y above 2^31
  // leaves V8's int32 fast path (measured 4x on the smoke test at y ~ 3.7e12)
  let ry=0;
  {const u=v+M/2;if(RB)RB[ry]=u;const au=u<0?-u:u;sup=au;s1+=u;s2+=u*u;cnt++;}
  let supH0=0,supH1=0,sqH0=0,sqH1=0;
  const END=a1-1+HMAX;
  const s0=(((a0+1)%P)+P)%P; let vi=Math.floor(s0/VLEN), so=s0-vi*VLEN, KV=VIEWS[vi], KVlen=KV.length;
  for(let a=a0+1;a<=END;a+=B){
    const len=Math.min(B,END-a+1);
    if(reseed && a>a0+1){ const ex=rhoAt(a-1,n,q,c,w); const d=Math.abs(v-ex); if(d>drift)drift=d; v=ex; }
    K.fill(0,0,len);
    for(let j=0;j<nl;j++){const qj=lq[j],wj=lw[j];
      let x0=(lc[j]-a)%qj; if(x0<0)x0+=qj;
      for(let i=x0;i<len;i+=qj) K[i]+=wj;}
    if(!reseed){
      for(let i=0;i<len;i++){
        v+=M-(K[i]+KV[so]); if(++so===KVlen){so=0;if(++vi===VIEWS.length)vi=0;KV=VIEWS[vi];KVlen=KV.length;}
        const u=v+M/2; const au=u<0?-u:u; if(au>sup){sup=au;arg=a+i;} s1+=u;s2+=u*u;cnt++;
      }
    } else {
      for(let i=0;i<len;i++){
        const y=a+i;
        v+=M-(K[i]+KV[so]); if(++so===KVlen){so=0;if(++vi===VIEWS.length)vi=0;KV=VIEWS[vi];KVlen=KV.length;}
        const u=v+M/2;
        ry=(ry+1)&RMASK; RB[ry]=u;
        if(y<a1){const au=u<0?-u:u; if(au>sup){sup=au;arg=y;} s1+=u;s2+=u*u;cnt++;}
        if(nH>0 && y>=a0+H0 && y<a1+H0){const d=RB[(ry-H0)&RMASK]-u,ad=d<0?-d:d; if(ad>supH0)supH0=ad; sqH0+=d*d;}
        if(nH>1 && y>=a0+H1 && y<a1+H1){const d=RB[(ry-H1)&RMASK]-u,ad=d<0?-d:d; if(ad>supH1)supH1=ad; sqH1+=d*d;}
      }
    }
  }
  { const d=Math.abs(v-rhoAt(END,n,q,c,w)); if(d>drift)drift=d; }
  return {sup,arg,s1,s2,cnt,drift,supH:[supH0,supH1],sqH:[sqH0,sqH1],nH};
}

// --- multi-H closed-form <R_H^2> and <rho~^2>: the PROVEN identity of ---------
// sift-limit-lemmaV.js meanSquare, evaluated for several H in one pair sweep,
// interleaved over workers by i (mod NW). Checked against L.meanSquare in S0.
function meanSquarePart(t,HS,r,stride){
  const n=t.n,w=t.w,q=t.q,c=t.c,mk=t.mk,PR=Float64Array.from(t.ps),nH=HS.length;
  const tot=new Float64Array(nH); let rho2=0;
  for(let i=r;i<n;i+=stride){const qi=q[i],ci=c[i],wi=w[i],mi=mk[i];
    {const g=qi,inv=1/(qi*qi); rho2+=((g*g-1)/12)*inv; for(let h=0;h<nH;h++){const hh=HS[h]%g; tot[h]+=hh*(g-hh)*inv;}}
    for(let j=i+1;j<n;j++){let m=mi&mk[j]; if(!m)continue; let g=1; while(m){const b=m&(-m); g*=PR[31-Math.clz32(b)]; m^=b;}
      const inv=1/(qi*q[j]),ww=wi*w[j]; let x=(c[j]-ci)%g; if(x<0)x+=g;
      rho2+=2*ww*((g*g-1)/12-x*(g-x)/2)*inv;
      for(let h=0;h<nH;h++){const hh=HS[h]%g; if(hh===0)continue; let a=x-hh; if(a<0)a+=g; let b2=x+hh; if(b2>=g)b2-=g;
        tot[h]+=2*ww*((a*(g-a)+b2*(g-b2)-2*x*(g-x))/2)*inv;}}}
  return {rho2,ms:Array.from(tot)};
}

// ============================================================================
// WORKER SIDE
// ============================================================================
if(!isMainThread){
  const {z,P,sab,HS}=workerData;
  const t=L.buildTerms(z,Math.round(Math.pow(z,S)));
  const sp=splitTerms(t,P);
  const VIEWS=tableViews(sab,P);
  parentPort.on('message',(msg)=>{
    if(msg.op==='table'){ parentPort.postMessage({op:'table',...buildTableSlice(sab,sp,msg.lo,msg.hi)}); }
    else if(msg.op==='walk'){ parentPort.postMessage({op:'walk',k:msg.k,r:walkChunk(t,sp,VIEWS,P,HS,msg.a0,msg.a1,msg.mode)}); }
    else if(msg.op==='ms'){ parentPort.postMessage({op:'ms',r:meanSquarePart(t,msg.HS,msg.r,msg.stride)}); }
    else if(msg.op==='exit'){ process.exit(0); }
  });
  return;
}

// ============================================================================
// MAIN SIDE: the pool
// ============================================================================
class Pool{
  constructor(z,P,sab,HS){ this.z=z; this.P=P; this.sab=sab; this.HS=HS;
    this.ws=[]; for(let i=0;i<NW;i++) this.ws.push(new Worker(__filename,{workerData:{z,P,sab,HS}})); }
  async run(jobs,onDone){                       // jobs: array of messages; returns results in job order
    const out=new Array(jobs.length); let next=0, live=0;
    return new Promise((resolve,reject)=>{
      const feed=(wk)=>{ if(next<jobs.length){ const k=next++; live++; wk._k=k; wk.postMessage(jobs[k]); } };
      for(const wk of this.ws){ wk.removeAllListeners('message'); wk.removeAllListeners('error');
        wk.on('error',reject);
        wk.on('message',(msg)=>{ out[wk._k]=msg; live--; if(onDone)onDone(msg,wk._k); if(next<jobs.length)feed(wk); else if(live===0)resolve(out); });
        feed(wk); }
      if(jobs.length===0) resolve(out);
    });
  }
  async table(){ const P=this.P;
    const NS=NW*4, step=Math.ceil(P/NS), jobs=[]; for(let lo=0;lo<P;lo+=step) jobs.push({op:'table',lo,hi:Math.min(lo+step,P)});
    const rs=await this.run(jobs); let mn=0,mx=0; for(const r of rs){if(r.mn<mn)mn=r.mn;if(r.mx>mx)mx=r.mx;} return {mn,mx,slices:jobs.length}; }
  async walk(chunks,mode,tag){ let done=0; const T1=Date.now();
    const rs=await this.run(chunks.map(([k,a0,a1])=>({op:'walk',k,a0,a1,mode})),()=>{ done++; if(done%Math.max(1,Math.floor(chunks.length/20))===0||done===chunks.length) err(`  ${tag}: ${done}/${chunks.length} chunks [${el()}]`); });
    const secs=(Date.now()-T1)/1000;
    let sup=0,arg=0,s1=0,s2=0,cnt=0,drift=0; const supH=[0,0],sqH=[0,0];
    for(const {r} of rs){ if(r.sup>sup){sup=r.sup;arg=r.arg;} s1+=r.s1;s2+=r.s2;cnt+=r.cnt; if(r.drift>drift)drift=r.drift;
      for(let h=0;h<2;h++){ if(r.supH[h]>supH[h])supH[h]=r.supH[h]; sqH[h]+=r.sqH[h]; } }
    return {sup,arg,mean:s1/cnt,m2:s2/cnt,cnt,drift,supH,sqH,secs}; }
  async ms(HS){ const jobs=[]; for(let r=0;r<NW;r++) jobs.push({op:'ms',HS,r,stride:NW});
    const rs=await this.run(jobs); let rho2=0; const ms=HS.map(()=>0); for(const {r} of rs){rho2+=r.rho2; for(let h=0;h<HS.length;h++)ms[h]+=r.ms[h];} return {rho2,ms}; }
  close(){ for(const wk of this.ws) wk.postMessage({op:'exit'}); }
}
// chunk partitions
function legacyChunks(W){ const NCH=Math.max(1,Math.min(1024,Math.ceil(W/5e7))), step=Math.ceil(W/NCH), ch=[];
  for(let k=0,a=0;a<W;k++,a+=step) ch.push([k,a,Math.min(a+step,W)]); return ch; }
function halfChunks(W,HMAX,NCH){ const Lh=Math.ceil(W/2)+HMAX+4, step=Math.ceil(Lh/NCH), ch=[];
  for(let k=0,a=0;a<Lh;k++,a+=step) ch.push([k,a,Math.min(a+step,Lh)]);
  ch.push([ch.length,W-2-HMAX,W]);                       // the wrap chunk
  return ch; }
function ols(xs,ys){const k=xs.length;let sx=0,sy=0,sxx=0,sxy=0;
  for(let i=0;i<k;i++){sx+=xs[i];sy+=ys[i];sxx+=xs[i]*xs[i];sxy+=xs[i]*ys[i];}
  const b=(k*sxy-sx*sy)/(k*sxx-sx*sx), a=(sy-b*sx)/k;
  let ss=0; for(let i=0;i<k;i++){const r=ys[i]-a-b*xs[i]; ss+=r*r;}
  const Sxx=sxx-sx*sx/k, s2=k>2?ss/(k-2):NaN, se=Math.sqrt(s2/Sxx);
  return {a,b,se,s2,Sxx,xbar:sx/k,k};}
function fitExp(zs,vs){return ols(zs.map(z=>Math.log(z)),vs.map(v=>Math.log(v)));}
// prediction s.e. of a new observation at x
const predSe=(f,x)=>Math.sqrt(f.s2*(1+1/f.k+(x-f.xbar)*(x-f.xbar)/f.Sxx));

// ---- CITED, custody-bound ----------------------------------------------------
const CITED_SUP={13:2.620130,17:4.336647,19:9.152470,23:12.106173,29:17.902491,31:28.122062,37:52.219092}; // rho-exact-z31-01 S2
const CITED_RMSR41=11.99697, CITED_M41=2.624e-2;   // theta-ladder sec.2 / rho-maxlaw-01 S2 via rho-exact-z31-01 S4
const CITED_SLOPE={b:2.7660,se:0.2120};            // attack-0829n-rml-proof S5
const CITED_CTRUE={13:0.6362,17:0.6044,19:0.8022,23:0.7554,29:0.7830,31:0.8412,37:0.7820}; // rho-exact-z31-01 S4

(async function main(){
const ZX=[13,17,19,23,29,31,37];
const z41=41, W41=periodOf(41), HS41=HSof(41);
console.log(`measure-0830-rho-sup-z41.js  stage ${STAGE}${STAGE==='B'?' segment '+SEG[0]+'/'+SEG[1]:''}   s = ${S}   workers = ${NW} (os.cpus)   block 2^${BSHIFT}   ring 2^${RSHIFT}   table period P(29) = ${periodOf(TABLE_Z)}`);

if(STAGE==='A'){
  // ---------------------------------------------------------------- S0
  console.log('\nS0 CONTROLS AND CUSTODY');
  { const zs=ZX, f=ols(zs.map(z=>Math.log(z)),zs.map(z=>Math.log(7*Math.pow(z,2.5))));
    console.log(`  OLS control: y = 7 z^2.5 returns slope ${f.b.toFixed(6)} (want 2.500000)  ${Math.abs(f.b-2.5)<1e-9?'PASS':'FAIL — EVERY FIT IN THIS FILE IS VOID'}`); }
  // (a) the reflection identity at every position, exact O(n) evaluation, z = 13, 17, 19
  for(const z of [13,17,19]){ const t=L.buildTerms(z,Math.round(Math.pow(z,S))), W=periodOf(z); let worst=0, worstR=0; const H=HSof(z)[0];
    const rt=(y)=>rhoAt(((y%W)+W)%W,t.n,t.q,t.c,t.w)+t.M/2;
    for(let y=0;y<W;y++){ const d=Math.abs(rt(W-3-y)+rt(y)); if(d>worst)worst=d;
      const r1=rt(y)-rt(y+H), r2=rt(W-3-H-y)-rt(W-3-y); const dr=Math.abs(r1-r2); if(dr>worstR)worstR=dr; }
    console.log(`  reflection z=${z}: max_y |rho~(W-3-y) + rho~(y)| = ${worst.toExponential(1)} over all ${W} positions;  max_x |R_H(W-3-H-x) - R_H(x)| = ${worstR.toExponential(1)} at H = ${H}   ${worst<1e-9&&worstR<1e-9?'PASS':'FAIL'}`); }
  // (b) the multi-H closed form against L.meanSquare, z = 13..31
  for(const z of [13,17,19,23,29,31]){ const t=L.buildTerms(z,Math.round(Math.pow(z,S))), HS=HSof(z);
    const m=meanSquarePart(t,HS,0,1); let worst=0;
    for(let h=0;h<HS.length;h++){ const r=L.meanSquare(t,HS[h]); worst=Math.max(worst,Math.abs(r.ms-m.ms[h])/r.ms,Math.abs(r.rho2-m.rho2)/r.rho2); }
    console.log(`  multi-H closed form vs L.meanSquare z=${z}: worst rel over <rho~^2>, <R^2> at H = ${HS.join(', ')}: ${worst.toExponential(1)}   ${worst<1e-12?'PASS':'FAIL'}`); }
  // (c) engines: legacy (old chunking, old recurrence) vs cited, and reseed half-range vs legacy full, z = 13..37
  console.log('  engines, full period. legacy = old chunking and recurrence with the table (must match the cited digits); reseed/half = new engine over the half range + wrap chunk');
  console.log('    z          W       legacy sup     cited       |diff|     half sup      |half-legacy|   drift(legacy)  drift(reseed)  mean(half)   m2(half)/closed    chunks(half)');
  const SUPZ={}, ARGZ={}, SUPH={}, SQH={}, CNTH={}, MSZ={}, TAB={}, LEG={};
  const SAB_BIG=new SharedArrayBuffer(tableP(41));      // one 6.47 GB table, re-filled per level
  for(const z of ZX){
    const P=tableP(z), t=L.buildTerms(z,Math.round(Math.pow(z,S))), W=periodOf(z), HS=HSof(z);
    const sab=(P===tableP(41))?SAB_BIG:new SharedArrayBuffer(P); const pool=new Pool(z,P,sab,HS);
    const tb=await pool.table(); TAB[z]=tb;
    err(`  z=${z}: table built (${tb.slices} slices, K in [${tb.mn}, ${tb.mx}]) [${el()}]`);
    const ms=await pool.ms(HS); MSZ[z]=ms;
    const leg=await pool.walk(legacyChunks(W),'legacy',`legacy z=${z}`);
    err(`  z=${z}: legacy full period ${leg.cnt} positions in ${leg.secs.toFixed(1)} s = ${(leg.secs*1e9*NW/leg.cnt).toFixed(1)} ns/pos/worker`);
    const NCH=Math.max(1,Math.min(1024,Math.ceil(W/2/5e7)));
    const half=await pool.walk(halfChunks(W,HS[1],NCH),'reseed',`half z=${z}`);
    err(`  z=${z}: reseed half+wrap ${half.cnt} positions in ${half.secs.toFixed(1)} s = ${(half.secs*1e9*NW/half.cnt).toFixed(1)} ns/pos/worker`);
    pool.close();
    LEG[z]=leg.sup; SUPZ[z]=half.sup; ARGZ[z]=half.arg; SUPH[z]=half.supH; SQH[z]=half.sqH; CNTH[z]=half.cnt;
    const d1=Math.abs(leg.sup-CITED_SUP[z]), d2=Math.abs(half.sup-leg.sup);
    console.log(`   ${pad(z,2)}  ${pad(W,13)}   ${leg.sup.toFixed(6).padStart(11)}  ${CITED_SUP[z].toFixed(6).padStart(10)}   ${d1.toExponential(1)}   ${half.sup.toFixed(6).padStart(11)}    ${d2.toExponential(1)}        ${leg.drift.toExponential(1)}        ${half.drift.toExponential(1)}      ${half.mean.toExponential(1).padStart(8)}   ${(half.m2/ms.rho2).toFixed(7)}      ${NCH+1}`);
  }
  console.log(`  CUSTODY GATE: legacy engine vs the cited sup|rho~| at z = 13..37, all seven |diff| < 5e-7 (the cited 6 dp): ${ZX.every(z=>Math.abs(LEG[z]-CITED_SUP[z])<5e-7)?'PASS':'FAIL'};  half+wrap reseed engine vs legacy full period, all seven |diff| < 1e-6: ${ZX.every(z=>Math.abs(SUPZ[z]-LEG[z])<1e-6)?'PASS':'FAIL'};  table K range at z = 37: [${TAB[37].mn}, ${TAB[37].mx}] (Int8 needs [-128, 127])`);

  // ---------------------------------------------------------------- S1
  console.log('\nS1 EXACT sup|rho~| AND sup|R_H| AT H = z^3, z^4 BY THE NEW ENGINE, z = 13..37 (half range + wrap; symmetry proven in the header, checked in S0)');
  console.log('   <R_H^2> is the PROVEN closed form over the full period; the walked column is the half-range mean and differs from it by the overlap of the range with its own reflection, of order 2H/W');
  console.log('    z    H=z^3      sup|rho~|    argmax           sup|R_H3|   <R_H3^2>       walked/closed   H=z^4      sup|R_H4|   <R_H4^2>      walked/closed   ratio3 = sup|R_H3|/rms3   log_z ratio3   HM-1 (u0=3)   F3 = (HM-1)/sup|R_H3|');
  const RAT3={}, R3={}, RMS3={};
  for(const z of ZX){ const HS=HSof(z), W=periodOf(z), t=L.buildTerms(z,Math.round(Math.pow(z,S))), ms=MSZ[z];
    const ok3=HS[0]<W, ok4=HS[1]<W;
    const rms3=Math.sqrt(ms.ms[0]); RAT3[z]=SUPH[z][0]/rms3; R3[z]=SUPH[z][0]; RMS3[z]=rms3;
    const HM1=HS[0]*t.M-1;
    console.log(`   ${pad(z,2)}  ${pad(HS[0],8)}   ${SUPZ[z].toFixed(6).padStart(10)}   ${pad(ARGZ[z],13)}   ${ok3?SUPH[z][0].toFixed(6).padStart(10):'H>=W'.padStart(10)}   ${ms.ms[0].toFixed(6).padStart(11)}    ${ok3?(SQH[z][0]/CNTH[z]/ms.ms[0]).toFixed(6):'—'.padStart(8)}   ${pad(HS[1],9)}   ${ok4?SUPH[z][1].toFixed(6).padStart(10):'H>=W'.padStart(10)}   ${ms.ms[1].toFixed(6).padStart(11)}   ${ok4?(SQH[z][1]/CNTH[z]/ms.ms[1]).toFixed(6):'—'.padStart(8)}        ${ok3?RAT3[z].toFixed(4).padStart(8):'—'.padStart(8)}            ${ok3?(Math.log(RAT3[z])/Math.log(z)).toFixed(4):'—'}        ${HM1.toFixed(2).padStart(9)}      ${ok3?(HM1/SUPH[z][0]).toFixed(3):'—'}`); }

  // ---------------------------------------------------------------- S2
  console.log('\nS2 THE z = 41 INPUTS THAT NEED NO WALK: closed-form <rho~^2> and <R_H^2> (PROVEN identity), M, and the falsifier thresholds');
  { const t=L.buildTerms(z41,Math.round(Math.pow(z41,S))); const P=tableP(z41); const sab=new SharedArrayBuffer(P); const pool=new Pool(z41,P,sab,HS41);
    const ms=await pool.ms(HS41); MSZ[41]=ms;
    const tb=await pool.table(); TAB[41]=tb; err(`  z=41: table built, K in [${tb.mn}, ${tb.mx}] [${el()}]`);
    // per-position cost samples (STDERR ONLY): three chunks of 2^27 positions spread over the period, each engine, single worker each
    const N=1<<27; const starts=[0,Math.floor(W41/3),Math.floor(2*W41/3)];
    const cs=[]; for(const a0 of starts) cs.push(await pool.walk([[0,a0,a0+N]],'reseed','cost reseed'));
    const secsR=cs.reduce((s,r)=>s+r.secs,0), cntR=cs.reduce((s,r)=>s+r.cnt,0);
    err(`  z=41 COST reseed engine (table + residual stamping + 2 window trackers), one worker: ${cntR} positions in ${secsR.toFixed(1)} s = ${(secsR*1e9/cntR).toFixed(1)} ns/pos`);
    const cl=[]; for(const a0 of starts) cl.push(await pool.walk([[0,a0,a0+N]],'legacy','cost legacy'));
    const secsL=cl.reduce((s,r)=>s+r.secs,0), cntL=cl.reduce((s,r)=>s+r.cnt,0);
    err(`  z=41 COST legacy engine (table, no trackers, one seed per chunk), one worker: ${cntL} positions in ${secsL.toFixed(1)} s = ${(secsL*1e9/cntL).toFixed(1)} ns/pos`);
    // the naive engine: every term stamped, no table (P = 1 makes every term residual)
    { const sab1=new SharedArrayBuffer(1); const pn=new Pool(z41,1,sab1,HS41); await pn.table();
      const cn=[]; for(const a0 of starts) cn.push(await pn.walk([[0,a0,a0+N]],'legacy','cost naive'));
      const secsN=cn.reduce((s,r)=>s+r.secs,0), cntN=cn.reduce((s,r)=>s+r.cnt,0);
      err(`  z=41 COST naive engine (all ${t.n} terms stamped, no table, no trackers), one worker: ${cntN} positions in ${secsN.toFixed(1)} s = ${(secsN*1e9/cntN).toFixed(1)} ns/pos`);
      // the sups on the three sample chunks must agree across engines
      let worst=0; for(let i=0;i<3;i++){ worst=Math.max(worst,Math.abs(cn[i].sup-cl[i].sup),Math.abs(cs[i].sup-cl[i].sup)); }
      console.log(`  engine agreement on three sample chunks of ${N} positions at z = 41 (naive vs table-legacy vs table-reseed): worst |diff| in sup = ${worst.toExponential(1)}   ${worst<1e-6?'PASS':'FAIL'}`);
      console.log(`  sample-chunk sups (lower bounds on the true sup|rho~|(41), NOT the sup): ${cs.map(r=>r.sup.toFixed(6)).join(', ')} at starts ${starts.join(', ')}`);
      pn.close(); }
    pool.close();
    let dens=0, densT=0, nT=0; for(let j=0;j<t.n;j++){ dens+=1/t.q[j]; if(P%t.q[j]===0){densT+=1/t.q[j]; nT++;} }
    console.log(`  z=41: n = ${t.n} terms, M = ${t.M.toExponential(6)} (cited ${CITED_M41.toExponential(3)}: ${Math.abs(t.M-CITED_M41)<5e-6?'MATCH':'MISMATCH'}), events per position sum 1/q = ${dens.toFixed(3)}, of which ${densT.toFixed(3)} from the ${nT} table terms (q | P(29)) and ${(dens-densT).toFixed(3)} from the ${t.n-nT} residual terms; table K range [${tb.mn}, ${tb.mx}]`);
    console.log(`  z=41: <rho~^2> closed form = ${ms.rho2.toFixed(6)}  (cited 11.99697^2 = ${(CITED_RMSR41*CITED_RMSR41).toFixed(6)}: ${Math.abs(Math.sqrt(ms.rho2)-CITED_RMSR41)<5e-6?'MATCH':'MISMATCH'})`);
    console.log(`  z=41: <R_H^2> closed form at H = ${HS41[0]} (z^3): ${ms.ms[0].toFixed(6)}, rms = ${Math.sqrt(ms.ms[0]).toFixed(6)};  at H = ${HS41[1]} (z^4): ${ms.ms[1].toFixed(6)}, rms = ${Math.sqrt(ms.ms[1]).toFixed(6)};  plateau 2<rho~^2> = ${(2*ms.rho2).toFixed(6)}`);
    const HM1_3=HS41[0]*t.M-1, HM1_4=HS41[1]*t.M-1;
    console.log(`  z=41 FALSIFIER THRESHOLDS (rml-proof sec.6): REC(3,3) fails at z = 41 iff sup|R_H| >= HM - 1 = ${HM1_3.toFixed(3)} at H = z^3, or via |R_H| <= 2 sup|rho~| iff sup|rho~| >= ${(HM1_3/2).toFixed(3)};  at u0 = 4: HM - 1 = ${HM1_4.toFixed(3)}`);
    // ---------------------------------------------------------------- S3
    console.log('\nS3 POSITIONS THE z = 41 RUN MUST VISIT (arithmetic, no timing)');
    const NCH41=1200, ch=halfChunks(W41,HS41[1],NCH41); let tot=0; for(const [,a0,a1] of ch) tot+=a1-a0;
    console.log(`  full period W = ${W41};  half range + wrap = ${tot} positions in ${ch.length} chunks (${NCH41} + 1 wrap), ratio ${(tot/W41).toFixed(6)};  window overlap per chunk ${HS41[1]} positions`);
    console.log(`  segments: stage B deals the chunks round-robin by index mod K; the wrap chunk (index ${ch.length-1}) goes to segment K`);
    // ---------------------------------------------------------------- S4
    console.log('\nS4 PRE-REGISTRATION, WRITTEN TO THIS TAIL BEFORE ANY z = 41 SEGMENT RUNS');
    const lnW41=lnWof(z41), rms41=Math.sqrt(ms.rho2), gauss41=Math.sqrt(2*lnW41);
    const f7=fitExp(ZX,ZX.map(z=>SUPZ[z]));
    console.log(`  (i) the seven-point slope of ln sup|rho~| on ln z, recomputed on this file's own S1 column: ${f7.b.toFixed(4)} +/- ${f7.se.toFixed(4)}  (cited ${CITED_SLOPE.b} +/- ${CITED_SLOPE.se}: ${Math.abs(f7.b-CITED_SLOPE.b)<5e-4&&Math.abs(f7.se-CITED_SLOPE.se)<5e-4?'MATCH':'MISMATCH'});  span log2(37/13) = ${(Math.log(37/13)/Math.log(2)).toFixed(3)} octaves of z`);
    const x41=Math.log(z41), yhat=f7.a+f7.b*x41, pse=predSe(f7,x41);
    console.log(`  (ii) OLS forecast of sup|rho~|(41): ${Math.exp(yhat).toFixed(2)};  1-se prediction band [${Math.exp(yhat-pse).toFixed(2)}, ${Math.exp(yhat+pse).toFixed(2)}];  2-se band [${Math.exp(yhat-2*pse).toFixed(2)}, ${Math.exp(yhat+2*pse).toFixed(2)}]  (prediction s.e. ${pse.toFixed(4)} in ln)`);
    const cts=ZX.map(z=>SUPZ[z]/(Math.sqrt(MSZ[z].rho2)*Math.sqrt(2*lnWof(z))));
    const cmin=Math.min(...cts), cmax=Math.max(...cts);
    console.log(`  (iii) Gaussian-law forecast: C_true(41) = sup/(rms sqrt(2 lnW)) inside the seven-point range [${cmin.toFixed(4)}, ${cmax.toFixed(4)}] (own column; cited 0.6044..0.8412), i.e. sup|rho~|(41) in [${(cmin*rms41*gauss41).toFixed(2)}, ${(cmax*rms41*gauss41).toFixed(2)}]; the law itself (C_true <= 1) is FALSE at z = 41 iff sup|rho~|(41) > ${(rms41*gauss41).toFixed(2)}`);
    console.log(`        sup/rms forecast for rho~: [${(cmin*gauss41).toFixed(3)}, ${(cmax*gauss41).toFixed(3)}] (sqrt(2 lnW) = ${gauss41.toFixed(4)});  sup|R_H3|/rms(R_H3) forecast from the S1 ratio3 column at z = 19..37: [${Math.min(...[19,23,29,31,37].map(z=>RAT3[z])).toFixed(3)}, ${Math.max(...[19,23,29,31,37].map(z=>RAT3[z])).toFixed(3)}] times at most the trend, see (v)`);
    // (iv) the kill rule and what the eighth point does to the fit
    const need3=HM1_3, need3half=HM1_3/2;
    console.log(`  (iv) KILL RULE for the u0 = 3 form at z = 41 (finite-z, rml-proof sec.6): REC(3.0, 3.0) is FALSE AT z = 41 iff sup|R_H3|(41) >= ${need3.toFixed(3)}. Forecast margin: with sup|R_H3| <= 2 sup|rho~| and the (ii) 2-se band, F3 = (HM-1)/sup|R_H3| >= ${(need3/(2*Math.exp(yhat+2*pse))).toFixed(2)}, i.e. the kill needs sup|rho~|(41) >= ${need3half.toFixed(2)} = ${(need3half/Math.exp(yhat)).toFixed(1)} x the forecast. Forecast: NOT killed.`);
    console.log(`        A z = 41 point that lands the eight-point slope at or above 3.0 within 1 se moves a fit and refutes nothing asymptotic; REC(s, u0) is a statement for all z >= z0 and this is one z.`);
    const z8=[...ZX,41];
    const slopeAt=(v)=>fitExp(z8,[...ZX.map(z=>SUPZ[z]),v]);
    const fh=slopeAt(Math.exp(yhat));
    console.log(`  (v) eight-point slope if the point lands on the OLS forecast: ${fh.b.toFixed(4)} +/- ${fh.se.toFixed(4)};  at the 1-se band ends: ${slopeAt(Math.exp(yhat-pse)).b.toFixed(4)} / ${slopeAt(Math.exp(yhat+pse)).b.toFixed(4)};  at the 2-se ends: ${slopeAt(Math.exp(yhat-2*pse)).b.toFixed(4)} / ${slopeAt(Math.exp(yhat+2*pse)).b.toFixed(4)}`);
    let vlo=NaN; for(let v=10;v<5000;v*=1.001){ const f=slopeAt(v); if(f.b-f.se>=3.0){vlo=v;break;} }
    let vhi=NaN; for(let v=5000;v>1;v/=1.001){ const f=slopeAt(v); if(f.b+f.se<=3.0){vhi=v;break;} }
    console.log(`        the eight-point fit excludes u0 = 3.0 from BELOW (slope - se >= 3.0) iff sup|rho~|(41) >= ${isNaN(vlo)?'—':vlo.toFixed(1)};  it excludes 3.0 from ABOVE (slope + se <= 3.0) iff sup|rho~|(41) <= ${isNaN(vhi)?'—':vhi.toFixed(1)};  forecast: neither`);
    const f3=fitExp([19,23,29,31,37],[19,23,29,31,37].map(z=>R3[z])); const y3=f3.a+f3.b*x41, p3=predSe(f3,x41);
    console.log(`  (vi) sup|R_H3| at H = z^3, five-point (z = 19..37) OLS slope ${f3.b.toFixed(4)} +/- ${f3.se.toFixed(4)}; forecast at 41: ${Math.exp(y3).toFixed(2)}, 1-se band [${Math.exp(y3-p3).toFixed(2)}, ${Math.exp(y3+p3).toFixed(2)}];  forecast ratio3(41) = that over rms3 = ${Math.sqrt(ms.ms[0]).toFixed(4)}: ${(Math.exp(y3)/Math.sqrt(ms.ms[0])).toFixed(3)}, band [${(Math.exp(y3-p3)/Math.sqrt(ms.ms[0])).toFixed(3)}, ${(Math.exp(y3+p3)/Math.sqrt(ms.ms[0])).toFixed(3)}]`);
    console.log(`  (vii) the allowance REC(3,3) grants at z = 41: z^{u0/2} = 41^1.5 = ${Math.pow(41,1.5).toFixed(2)} against the forecast ratio3 above; the arrow holds at z = 41 iff ratio3(41) <= 41^{1.5 - eps} for the eps in force, and no eps is in force (REC is unproven), so only the HM - 1 threshold in (iv) is a kill`);
  }
}

if(STAGE==='T'){                                // timing probe, main thread, STDERR only
  const t=L.buildTerms(z41,Math.round(Math.pow(z41,S))), P=tableP(z41), HS=HS41;
  const sabs=new SharedArrayBuffer(P), VIEWS=tableViews(sabs,P), sp=splitTerms(t,P);
  const N=1<<26, a0=Number(optOf('a0','12345678'));
  { const lo=a0%P, hi=Math.min(P,lo+N+HS[1]+(1<<BSHIFT)); buildTableSlice(sabs,sp,lo,hi); err(`  table slice [${lo}, ${hi}) built (timing only; a clamped slice reads zeros past hi) [${el()}]`); }
  for(const mode of ['legacy','reseed','legacy','reseed']){ const T1=Date.now(); const r=walkChunk(t,sp,VIEWS,P,HS,a0,a0+N,mode); const secs=(Date.now()-T1)/1000;
    err(`  ${mode}: ${(secs*1e9/N).toFixed(1)} ns/pos  sup ${r.sup.toFixed(6)} drift ${r.drift.toExponential(1)}`); }
}

if(STAGE==='B'){
  const [k,K]=SEG; const t=L.buildTerms(z41,Math.round(Math.pow(z41,S))), P=tableP(z41), HS=HS41;
  const ch=halfChunks(W41,HS[1],1200);
  const mine=ch.filter(([i])=>(i<ch.length-1?(i%K===k-1):(k===K)));
  let tot=0; for(const [,a0,a1] of mine) tot+=a1-a0;
  console.log(`\nS5 z = 41 SEGMENT ${k}/${K}: ${mine.length} of ${ch.length} chunks (indices k with k mod ${K} = ${k-1}${k===K?', plus the wrap chunk':''}), ${tot} positions to visit`);
  const sab=new SharedArrayBuffer(P); const pool=new Pool(z41,P,sab,HS);
  const tb=await pool.table(); err(`  table built, K in [${tb.mn}, ${tb.mx}] [${el()}]`);
  console.log(`  table K range [${tb.mn}, ${tb.mx}] (Int8)`);
  const r=await pool.walk(mine,'reseed',`z=41 seg ${k}/${K}`);
  err(`  segment walked: ${r.cnt} positions in ${r.secs.toFixed(1)} s = ${(r.secs*1e9*NW/r.cnt).toFixed(1)} ns/pos/worker`);
  pool.close();
  const chk=Math.abs(rhoAt(r.arg,t.n,t.q,t.c,t.w)+t.M/2);
  console.log(`  positions visited: ${r.cnt} (${r.cnt===tot?'MATCHES the count above':'COUNT MISMATCH'});  worst block drift |recurrence - exact re-seed| = ${r.drift.toExponential(1)}`);
  console.log(`  sup|rho~| over this segment = ${r.sup.toFixed(6)} at position ${r.arg};  exact O(n) recomputation |rho~(argmax)| = ${chk.toFixed(6)}  (|diff| ${Math.abs(chk-r.sup).toExponential(1)})`);
  console.log(`  segment mean of rho~ = ${r.mean.toExponential(2)};  segment m2 = ${r.m2.toFixed(6)}`);
  console.log(`  sup|R_H| over this segment: H = ${HS[0]} (z^3): ${r.supH[0].toFixed(6)};  H = ${HS[1]} (z^4): ${r.supH[1].toFixed(6)}`);
  console.log(`  walked sum of R_H^2 over this segment: H = ${HS[0]}: ${r.sqH[0].toExponential(12)};  H = ${HS[1]}: ${r.sqH[1].toExponential(12)}  (divide the total over segments by the total count for the walked mean)`);
  console.log(`  HM - 1 at H = z^3: ${(HS[0]*t.M-1).toFixed(3)};  this segment's F3 = (HM-1)/sup|R_H3| = ${((HS[0]*t.M-1)/r.supH[0]).toFixed(3)}`);
}
err(`DONE [${el()}]`);
})().catch(e=>{console.error(e);process.exit(1);});

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both --tail 1 research/history/staging/measure-0830-rho-sup-z41.js -- --stage A
//   invocation:  node research/history/staging/measure-0830-rho-sup-z41.js --stage A
//   code-sha256: 61af2c7903effa57584516855c16be61cb2cc4c0b3e9a05def58cbf819247acd
//   out-sha256:  78984bb636197c7ab7b8db16ef727c80076c6d0f87a83ce2e21e1a8ef2d8b791
//   body-lines:  201
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     2554.6 s
// ============================================================================
// measure-0830-rho-sup-z41.js  stage A   s = 3   workers = 10 (os.cpus)   block 2^21   ring 2^22   table period P(29) = 6469693230
//
// S0 CONTROLS AND CUSTODY
//   OLS control: y = 7 z^2.5 returns slope 2.500000 (want 2.500000)  PASS
//   reflection z=13: max_y |rho~(W-3-y) + rho~(y)| = 1.6e-14 over all 2310 positions;  max_x |R_H(W-3-H-x) - R_H(x)| = 1.8e-14 at H = 2197   PASS
//   reflection z=17: max_y |rho~(W-3-y) + rho~(y)| = 3.5e-14 over all 30030 positions;  max_x |R_H(W-3-H-x) - R_H(x)| = 4.1e-14 at H = 4913   PASS
//   reflection z=19: max_y |rho~(W-3-y) + rho~(y)| = 7.3e-14 over all 510510 positions;  max_x |R_H(W-3-H-x) - R_H(x)| = 9.1e-14 at H = 6859   PASS
//   multi-H closed form vs L.meanSquare z=13: worst rel over <rho~^2>, <R^2> at H = 2197, 28561: 8.9e-16   PASS
//   multi-H closed form vs L.meanSquare z=17: worst rel over <rho~^2>, <R^2> at H = 4913, 83521: 3.3e-15   PASS
//   multi-H closed form vs L.meanSquare z=19: worst rel over <rho~^2>, <R^2> at H = 6859, 130321: 8.3e-16   PASS
//   multi-H closed form vs L.meanSquare z=23: worst rel over <rho~^2>, <R^2> at H = 12167, 279841: 1.6e-15   PASS
//   multi-H closed form vs L.meanSquare z=29: worst rel over <rho~^2>, <R^2> at H = 24389, 707281: 4.2e-15   PASS
//   multi-H closed form vs L.meanSquare z=31: worst rel over <rho~^2>, <R^2> at H = 29791, 923521: 2.6e-15   PASS
//   engines, full period. legacy = old chunking and recurrence with the table (must match the cited digits); reseed/half = new engine over the half range + wrap chunk
//     z          W       legacy sup     cited       |diff|     half sup      |half-legacy|   drift(legacy)  drift(reseed)  mean(half)   m2(half)/closed    chunks(half)
//    13           2310      2.620130    2.620130   1.3e-7      2.620130    1.1e-11        9.4e-13        2.4e-11        7.0e-3   1.0014782      2
//    17          30030      4.336647    4.336647   3.1e-7      4.336647    4.2e-11        2.1e-11        1.3e-10        7.7e-3   0.9986080      2
//    19         510510      9.152470    9.152470   7.9e-8      9.152470    6.3e-11        8.4e-11        8.5e-11       -1.2e-2   1.0032444      2
//    23        9699690     12.106173   12.106173   3.8e-7     12.106173    2.3e-9        1.1e-8        2.3e-9        3.2e-2   1.0004925      2
//    29      223092870     17.902491   17.902491   1.4e-7     17.902491    6.4e-9        8.7e-8        4.1e-9       -6.6e-3   0.9986738      4
//    31     6469693230     28.122062   28.122062   3.9e-7     28.122062    8.8e-8        9.9e-8        4.3e-9        8.7e-5   1.0001550      66
//    37   200560490130     52.219092   52.219092   3.1e-7     52.219092    1.2e-7        2.5e-7        3.0e-9        1.7e-4   1.0000099      1025
//   CUSTODY GATE: legacy engine vs the cited sup|rho~| at z = 13..37, all seven |diff| < 5e-7 (the cited 6 dp): PASS;  half+wrap reseed engine vs legacy full period, all seven |diff| < 1e-6: PASS;  table K range at z = 37: [-11, 1] (Int8 needs [-128, 127])
//
// S1 EXACT sup|rho~| AND sup|R_H| AT H = z^3, z^4 BY THE NEW ENGINE, z = 13..37 (half range + wrap; symmetry proven in the header, checked in S0)
//    <R_H^2> is the PROVEN closed form over the full period; the walked column is the half-range mean and differs from it by the overlap of the range with its own reflection, of order 2H/W
//     z    H=z^3      sup|rho~|    argmax           sup|R_H3|   <R_H3^2>       walked/closed   H=z^4      sup|R_H4|   <R_H4^2>      walked/closed   ratio3 = sup|R_H3|/rms3   log_z ratio3   HM-1 (u0=3)   F3 = (HM-1)/sup|R_H3|
//    13      2197     2.620130           29386     3.310390      1.993269    1.000621       28561         H>=W      2.071931          —          2.3447            0.3322           121.69      36.760
//    17      4913     4.336647           87148     5.843923      4.508341    0.998539       83521         H>=W      4.271317          —          2.7523            0.3573           229.84      39.330
//    19      6859     9.152470          458830     8.600331      6.435562    0.997916      130321    11.406290     12.183860   1.005108          3.3902            0.4146           270.60      31.464
//    23     12167    12.106173         3011380    15.737099     15.355463    1.002927      279841    15.046734     14.175480   0.994581          4.0160            0.4434           414.74      26.354
//    29     24389    17.902491        49427920    21.611574     21.661817    1.000146      707281    25.264352     27.885476   0.998851          4.6434            0.4560           775.61      35.889
//    31     29791    28.122062      2981543680    29.537383     32.952426    1.000065      923521    38.658868     51.241098   1.000233          5.1455            0.4770           870.46      29.470
//    37     50653    52.219092     17724104009    47.838730     70.885841    0.999996     1874161    79.966994    178.004761   1.000033          5.6820            0.4811          1420.16      29.686
//
// S2 THE z = 41 INPUTS THAT NEED NO WALK: closed-form <rho~^2> and <R_H^2> (PROVEN identity), M, and the falsifier thresholds
//   engine agreement on three sample chunks of 134217728 positions at z = 41 (naive vs table-legacy vs table-reseed): worst |diff| in sup = 1.4e-7   PASS
//   sample-chunk sups (lower bounds on the true sup|rho~|(41), NOT the sup): 52.565903, 47.749263, 50.822900 at starts 0, 2473579378270, 4947158756540
//   z=41: n = 125884 terms, M = 2.623898e-2 (cited 2.624e-2: MATCH), events per position sum 1/q = 48.067, of which 43.391 from the 56588 table terms (q | P(29)) and 4.676 from the 69296 residual terms; table K range [-13, 1]
//   z=41: <rho~^2> closed form = 143.927339  (cited 11.99697^2 = 143.927289: MATCH)
//   z=41: <R_H^2> closed form at H = 68921 (z^3): 106.493085, rms = 10.319549;  at H = 2825761 (z^4): 275.960345, rms = 16.612054;  plateau 2<rho~^2> = 287.854677
//   z=41 FALSIFIER THRESHOLDS (rml-proof sec.6): REC(3,3) fails at z = 41 iff sup|R_H| >= HM - 1 = 1807.417 at H = z^3, or via |R_H| <= 2 sup|rho~| iff sup|rho~| >= 903.708;  at u0 = 4: HM - 1 = 74144.094
//
// S3 POSITIONS THE z = 41 RUN MUST VISIT (arithmetic, no timing)
//   full period W = 7420738134810;  half range + wrap = 3710374718933 positions in 1201 chunks (1200 + 1 wrap), ratio 0.500001;  window overlap per chunk 2825761 positions
//   segments: stage B deals the chunks round-robin by index mod K; the wrap chunk (index 1200) goes to segment K
//
// S4 PRE-REGISTRATION, WRITTEN TO THIS TAIL BEFORE ANY z = 41 SEGMENT RUNS
//   (i) the seven-point slope of ln sup|rho~| on ln z, recomputed on this file's own S1 column: 2.7660 +/- 0.2120  (cited 2.766 +/- 0.212: MATCH);  span log2(37/13) = 1.509 octaves of z
//   (ii) OLS forecast of sup|rho~|(41): 60.07;  1-se prediction band [47.25, 76.37];  2-se band [37.16, 97.11]  (prediction s.e. 0.2401 in ln)
//   (iii) Gaussian-law forecast: C_true(41) = sup/(rms sqrt(2 lnW)) inside the seven-point range [0.6044, 0.8412] (own column; cited 0.6044..0.8412), i.e. sup|rho~|(41) in [55.83, 77.69]; the law itself (C_true <= 1) is FALSE at z = 41 iff sup|rho~|(41) > 92.36
//         sup/rms forecast for rho~: [4.653, 6.476] (sqrt(2 lnW) = 7.6987);  sup|R_H3|/rms(R_H3) forecast from the S1 ratio3 column at z = 19..37: [3.390, 5.682] times at most the trend, see (v)
//   (iv) KILL RULE for the u0 = 3 form at z = 41 (finite-z, rml-proof sec.6): REC(3.0, 3.0) is FALSE AT z = 41 iff sup|R_H3|(41) >= 1807.417. Forecast margin: with sup|R_H3| <= 2 sup|rho~| and the (ii) 2-se band, F3 = (HM-1)/sup|R_H3| >= 9.31, i.e. the kill needs sup|rho~|(41) >= 903.71 = 15.0 x the forecast. Forecast: NOT killed.
//         A z = 41 point that lands the eight-point slope at or above 3.0 within 1 se moves a fit and refutes nothing asymptotic; REC(s, u0) is a statement for all z >= z0 and this is one z.
//   (v) eight-point slope if the point lands on the OLS forecast: 2.7660 +/- 0.1656;  at the 1-se band ends: 2.6562 / 2.8757;  at the 2-se ends: 2.5465 / 2.9855
//         the eight-point fit excludes u0 = 3.0 from BELOW (slope - se >= 3.0) iff sup|rho~|(41) >= 343.0;  it excludes 3.0 from ABOVE (slope + se <= 3.0) iff sup|rho~|(41) <= 68.9;  forecast: neither
//   (vi) sup|R_H3| at H = z^3, five-point (z = 19..37) OLS slope 2.4522 +/- 0.2095; forecast at 41: 58.26, 1-se band [50.24, 67.56];  forecast ratio3(41) = that over rms3 = 10.3195: 5.646, band [4.869, 6.546]
//   (vii) the allowance REC(3,3) grants at z = 41: z^{u0/2} = 41^1.5 = 262.53 against the forecast ratio3 above; the arrow holds at z = 41 iff ratio3(41) <= 41^{1.5 - eps} for the eps in force, and no eps is in force (REC is unproven), so only the HM - 1 threshold in (iv) is a kill
// ───── stderr ─────
//   z=13: table built (40 slices, K in [-1, 1]) [655.4s]
//   legacy z=13: 1/1 chunks [655.5s]
//   z=13: legacy full period 2310 positions in 0.0 s = 8658.0 ns/pos/worker
//   half z=13: 1/2 chunks [655.5s]
//   half z=13: 2/2 chunks [655.5s]
//   z=13: reseed half+wrap 58283 positions in 0.0 s = 3260.0 ns/pos/worker
//   z=17: table built (40 slices, K in [-2, 1]) [655.5s]
//   legacy z=17: 1/1 chunks [655.6s]
//   z=17: legacy full period 30030 positions in 0.0 s = 1998.0 ns/pos/worker
//   half z=17: 1/2 chunks [655.6s]
//   half z=17: 2/2 chunks [655.6s]
//   z=17: reseed half+wrap 182063 positions in 0.0 s = 2471.7 ns/pos/worker
//   z=19: table built (40 slices, K in [-3, 1]) [655.7s]
//   legacy z=19: 1/1 chunks [655.9s]
//   z=19: legacy full period 510510 positions in 0.0 s = 254.6 ns/pos/worker
//   half z=19: 1/2 chunks [656.0s]
//   half z=19: 2/2 chunks [656.0s]
//   z=19: reseed half+wrap 515903 positions in 0.0 s = 717.2 ns/pos/worker
//   z=23: table built (40 slices, K in [-3, 1]) [656.2s]
//   legacy z=23: 1/1 chunks [656.8s]
//   z=23: legacy full period 9699690 positions in 0.1 s = 101.0 ns/pos/worker
//   half z=23: 1/2 chunks [656.8s]
//   half z=23: 2/2 chunks [656.9s]
//   z=23: reseed half+wrap 5409533 positions in 0.1 s = 253.3 ns/pos/worker
//   z=29: table built (40 slices, K in [-3, 1]) [659.5s]
//   legacy z=29: 1/5 chunks [662.4s]
//   legacy z=29: 2/5 chunks [662.4s]
//   legacy z=29: 3/5 chunks [662.4s]
//   legacy z=29: 4/5 chunks [662.4s]
//   legacy z=29: 5/5 chunks [662.4s]
//   z=29: legacy full period 223092870 positions in 0.4 s = 17.9 ns/pos/worker
//   half z=29: 1/4 chunks [662.5s]
//   half z=29: 2/4 chunks [663.1s]
//   half z=29: 3/4 chunks [663.1s]
//   half z=29: 4/4 chunks [663.1s]
//   z=29: reseed half+wrap 112961003 positions in 0.7 s = 63.7 ns/pos/worker
//   z=31: table built (40 slices, K in [-9, 1]) [841.0s]
//   legacy z=31: 6/130 chunks [851.3s]
//   legacy z=31: 12/130 chunks [852.6s]
//   legacy z=31: 18/130 chunks [852.8s]
//   legacy z=31: 24/130 chunks [854.0s]
//   legacy z=31: 30/130 chunks [854.1s]
//   legacy z=31: 36/130 chunks [855.2s]
//   legacy z=31: 42/130 chunks [855.4s]
//   legacy z=31: 48/130 chunks [855.9s]
//   legacy z=31: 54/130 chunks [856.7s]
//   legacy z=31: 60/130 chunks [856.9s]
//   legacy z=31: 66/130 chunks [857.7s]
//   legacy z=31: 72/130 chunks [858.1s]
//   legacy z=31: 78/130 chunks [858.3s]
//   legacy z=31: 84/130 chunks [858.5s]
//   legacy z=31: 90/130 chunks [858.7s]
//   legacy z=31: 96/130 chunks [858.9s]
//   legacy z=31: 102/130 chunks [859.0s]
//   legacy z=31: 108/130 chunks [859.2s]
//   legacy z=31: 114/130 chunks [859.4s]
//   legacy z=31: 120/130 chunks [859.6s]
//   legacy z=31: 126/130 chunks [859.7s]
//   legacy z=31: 130/130 chunks [859.7s]
//   z=31: legacy full period 6469693230 positions in 9.7 s = 14.9 ns/pos/worker
//   half z=31: 3/66 chunks [862.7s]
//   half z=31: 6/66 chunks [862.8s]
//   half z=31: 9/66 chunks [862.9s]
//   half z=31: 12/66 chunks [865.4s]
//   half z=31: 15/66 chunks [865.5s]
//   half z=31: 18/66 chunks [865.6s]
//   half z=31: 21/66 chunks [866.5s]
//   half z=31: 24/66 chunks [866.7s]
//   half z=31: 27/66 chunks [866.8s]
//   half z=31: 30/66 chunks [867.3s]
//   half z=31: 33/66 chunks [869.4s]
//   half z=31: 36/66 chunks [869.5s]
//   half z=31: 39/66 chunks [869.6s]
//   half z=31: 42/66 chunks [871.7s]
//   half z=31: 45/66 chunks [872.3s]
//   half z=31: 48/66 chunks [872.4s]
//   half z=31: 51/66 chunks [874.0s]
//   half z=31: 54/66 chunks [874.4s]
//   half z=31: 57/66 chunks [874.9s]
//   half z=31: 60/66 chunks [875.0s]
//   half z=31: 63/66 chunks [875.1s]
//   half z=31: 66/66 chunks [875.9s]
//   z=31: reseed half+wrap 3236693663 positions in 16.2 s = 49.9 ns/pos/worker
//   z=37: table built (40 slices, K in [-11, 1]) [1068.6s]
//   legacy z=37: 51/1024 chunks [1139.9s]
//   legacy z=37: 102/1024 chunks [1162.2s]
//   legacy z=37: 153/1024 chunks [1180.4s]
//   legacy z=37: 204/1024 chunks [1197.4s]
//   legacy z=37: 255/1024 chunks [1215.6s]
//   legacy z=37: 306/1024 chunks [1232.9s]
//   legacy z=37: 357/1024 chunks [1251.7s]
//   legacy z=37: 408/1024 chunks [1270.2s]
//   legacy z=37: 459/1024 chunks [1289.6s]
//   legacy z=37: 510/1024 chunks [1309.9s]
//   legacy z=37: 561/1024 chunks [1330.0s]
//   legacy z=37: 612/1024 chunks [1350.6s]
//   legacy z=37: 663/1024 chunks [1371.2s]
//   legacy z=37: 714/1024 chunks [1392.4s]
//   legacy z=37: 765/1024 chunks [1412.9s]
//   legacy z=37: 816/1024 chunks [1441.7s]
//   legacy z=37: 867/1024 chunks [1470.0s]
//   legacy z=37: 918/1024 chunks [1499.2s]
//   legacy z=37: 969/1024 chunks [1528.3s]
//   legacy z=37: 1020/1024 chunks [1557.4s]
//   legacy z=37: 1024/1024 chunks [1558.5s]
//   z=37: legacy full period 200560490130 positions in 447.9 s = 22.3 ns/pos/worker
//   half z=37: 51/1025 chunks [1611.8s]
//   half z=37: 102/1025 chunks [1638.2s]
//   half z=37: 153/1025 chunks [1662.0s]
//   half z=37: 204/1025 chunks [1685.7s]
//   half z=37: 255/1025 chunks [1706.1s]
//   half z=37: 306/1025 chunks [1727.6s]
//   half z=37: 357/1025 chunks [1749.1s]
//   half z=37: 408/1025 chunks [1769.8s]
//   half z=37: 459/1025 chunks [1795.9s]
//   half z=37: 510/1025 chunks [1817.4s]
//   half z=37: 561/1025 chunks [1838.9s]
//   half z=37: 612/1025 chunks [1861.8s]
//   half z=37: 663/1025 chunks [1883.8s]
//   half z=37: 714/1025 chunks [1910.7s]
//   half z=37: 765/1025 chunks [1932.7s]
//   half z=37: 816/1025 chunks [1954.9s]
//   half z=37: 867/1025 chunks [1976.4s]
//   half z=37: 918/1025 chunks [1999.1s]
//   half z=37: 969/1025 chunks [2024.6s]
//   half z=37: 1020/1025 chunks [2047.3s]
//   half z=37: 1025/1025 chunks [2048.8s]
//   z=37: reseed half+wrap 100283993393 positions in 490.4 s = 48.9 ns/pos/worker
//   z=41: table built, K in [-13, 1] [2501.6s]
//   cost reseed: 1/1 chunks [2505.8s]
//   cost reseed: 1/1 chunks [2511.7s]
//   cost reseed: 1/1 chunks [2516.3s]
//   z=41 COST reseed engine (table + residual stamping + 2 window trackers), one worker: 402653184 positions in 14.7 s = 36.6 ns/pos
//   cost legacy: 1/1 chunks [2518.7s]
//   cost legacy: 1/1 chunks [2522.0s]
//   cost legacy: 1/1 chunks [2525.8s]
//   z=41 COST legacy engine (table, no trackers, one seed per chunk), one worker: 402653184 positions in 9.5 s = 23.5 ns/pos
//   cost naive: 1/1 chunks [2535.9s]
//   cost naive: 1/1 chunks [2545.8s]
//   cost naive: 1/1 chunks [2554.2s]
//   z=41 COST naive engine (all 125884 terms stamped, no table, no trackers), one worker: 402653184 positions in 28.1 s = 69.8 ns/pos
// DONE [2554.3s]
// ============================================================================
// READINGS
//
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both --tail 2 research/history/staging/measure-0830-rho-sup-z41.js -- --stage B --seg 12/12
//   invocation:  node research/history/staging/measure-0830-rho-sup-z41.js --stage B --seg 12/12
//   code-sha256: 61af2c7903effa57584516855c16be61cb2cc4c0b3e9a05def58cbf819247acd
//   out-sha256:  f656b09aed45dfe9b8f71adc5b682f0c0fa1136fc6b0fdd27289a7dda0f2118a
//   body-lines:  35
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     1563.4 s
// ============================================================================
// measure-0830-rho-sup-z41.js  stage B segment 12/12   s = 3   workers = 10 (os.cpus)   block 2^21   ring 2^22   table period P(29) = 6469693230
//
// S5 z = 41 SEGMENT 12/12: 101 of 1201 chunks (indices k with k mod 12 = 11, plus the wrap chunk), 309200483133 positions to visit
//   table K range [-13, 1] (Int8)
//   positions visited: 309200483133 (MATCHES the count above);  worst block drift |recurrence - exact re-seed| = 6.0e-9
//   sup|rho~| over this segment = 70.651250 at position 1704538822781;  exact O(n) recomputation |rho~(argmax)| = 70.651250  (|diff| 5.7e-9)
//   segment mean of rho~ = 8.96e-4;  segment m2 = 144.009169
//   sup|R_H| over this segment: H = 68921 (z^3): 64.416936;  H = 2825761 (z^4): 97.905636
//   walked sum of R_H^2 over this segment: H = 68921: 3.292718995972e+13;  H = 2825761: 8.533834950746e+13  (divide the total over segments by the total count for the walked mean)
//   HM - 1 at H = z^3: 1807.417;  this segment's F3 = (HM-1)/sup|R_H3| = 28.058
// ───── stderr ─────
//   table built, K in [-13, 1] [164.6s]
//   z=41 seg 12/12: 5/101 chunks [335.1s]
//   z=41 seg 12/12: 10/101 chunks [339.0s]
//   z=41 seg 12/12: 15/101 chunks [478.5s]
//   z=41 seg 12/12: 20/101 chunks [482.1s]
//   z=41 seg 12/12: 25/101 chunks [640.8s]
//   z=41 seg 12/12: 30/101 chunks [673.1s]
//   z=41 seg 12/12: 35/101 chunks [811.3s]
//   z=41 seg 12/12: 40/101 chunks [818.2s]
//   z=41 seg 12/12: 45/101 chunks [905.5s]
//   z=41 seg 12/12: 50/101 chunks [994.4s]
//   z=41 seg 12/12: 55/101 chunks [1005.5s]
//   z=41 seg 12/12: 60/101 chunks [1166.0s]
//   z=41 seg 12/12: 65/101 chunks [1188.6s]
//   z=41 seg 12/12: 70/101 chunks [1246.0s]
//   z=41 seg 12/12: 75/101 chunks [1331.3s]
//   z=41 seg 12/12: 80/101 chunks [1353.3s]
//   z=41 seg 12/12: 85/101 chunks [1422.3s]
//   z=41 seg 12/12: 90/101 chunks [1503.4s]
//   z=41 seg 12/12: 95/101 chunks [1520.1s]
//   z=41 seg 12/12: 100/101 chunks [1530.0s]
//   z=41 seg 12/12: 101/101 chunks [1563.2s]
//   segment walked: 309200483133 positions in 1398.6 s = 45.2 ns/pos/worker
// DONE [1563.2s]
// ============================================================================
// READINGS
//
// ============================================================================
// OUTPUT — tail 3: reserved for a stage B segment (not run on this machine; see the note, sec. 4)
// ============================================================================
// ============================================================================
// OUTPUT — tail 4: reserved for a stage B segment (not run on this machine; see the note, sec. 4)
// ============================================================================
// ============================================================================
// READINGS
// ============================================================================
// (written in measure-0830-rho-sup-z41.md after the embeds; the script carries
//  none of its own so that no figure can precede its run)
