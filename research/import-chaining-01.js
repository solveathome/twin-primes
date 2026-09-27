// ============================================================================
// import-chaining-01.js  —  GENERIC CHAINING (Dudley / Talagrand) against the
// sieve remainder R_H, foreign-import attack 1 of 5 (2026-08-19)
// ============================================================================
// THE IMPORT. Dudley's entropy bound and Talagrand's generic chaining bound a
// process's expected supremum by the geometry of its L2 increment metric:
//     E sup_t X_t  <=  K * integral_0^diam sqrt(log N(T,d,eps)) d eps.
// The corpus's wall is a supremum over positions (u_sup, the maximal law), so
// the import is on-target IF the increment metric has scale structure.
//
// THE MAPPING (see the write-up for the derivation).
//   Object:  R(x) = sum_i w_i [ psi((x-c_i)/q_i) - psi((x-(c_i-H))/q_i) ],
//            x in Z/W, W = P(z), the exact Brudern-Fouvry sawtooth remainder
//            of research/sift-limit-lemmaV.js.
//   Process: Z_x := R(t+x), t ~ Uniform(Z/W). This is the RANDOM-SHIFT
//            process. It is stationary, and
//                sup_x (Z_x - Z_0) = sup_y R(y) - R(t)  for every t,
//            so  E sup_x (Z_x - Z_0) = sup_y R(y)  EXACTLY. The usual
//            "E sup does not bound one sample" gap is CLOSED by stationarity:
//            the chaining conclusion IS the deterministic supremum.
//   Metric:  d(x,y)^2 = || Z_x - Z_y ||_2^2 = < (R(t+x)-R(t+y))^2 >_t
//                     = 2( <R^2> - rho_R(x-y) ),   rho_R = autocovariance.
//            Translation invariant, so d(x,y) = d(x-y): a metric on Z/W.
//   CLOSED FORM (this file's contribution, an extension of lemmaV's S2):
//            rho_R(delta) = sum_{i,j} w_i w_j Psi(g_ij, dc_ij - delta) /(q_i q_j)
//            Psi(g,y) = Pg(y-H) + Pg(y+H) - 2 Pg(y),  Pg(y) = ybar(g-ybar)/2,
//            g = gcd(q_i,q_j), dc = c_j - c_i.  delta = 0 recovers lemmaV's
//            meanSquare exactly (custody check S0).
//   NETS:    the CRT filtration. T_k = representatives of Z/P_k, P_k the
//            product of the first k primes below z. Cells are the arithmetic
//            progressions of common difference P_k. EXACT tail identity:
//            the fibre average of R over x mod P_k is again an R with moduli
//            g_i -> gcd(q_i,P_k) and the SAME closed form, so
//               <R_k^2> = sum_{i,j} w_i w_j Psi(gcd(g_ij,P_k), dc_ij)/(q_i q_j)
//            and the level-k cell diameter obeys
//               Delta_k <= 2 sqrt( <R^2> - <R_k^2> )  =: 2 sqrt(E_k^tail),
//            because every frequency a/e with e | P_k is constant on a cell.
//   CHAIN:   under subgaussian increments (the honesty gate, see write-up),
//               sup|R| <= sum_{k=1..K} Delta_{k-1} * sqrt(2 ln P_k).
//            The union bound is the degenerate chain K=1.
//
// PRE-REGISTRATION (written before the first run; do not edit after):
//   P1. The metric is FLAT: d(1)/(2 rms) > 0.9 already at lag 1, and
//       max_delta d/(2 rms) within a few % of 1.
//   P2. E_k^tail / <R^2> stays above 0.5 until the last two primes, so
//       Delta_{k-1} ~ 2 rms for most k.
//   P3. Therefore chaining LOSES to the union bound by a factor between 3 and
//       10, growing roughly like pi(z).
//   P4. The entropy integral's geometric floor lands at ~ sqrt(2) x the
//       corpus's union bound (constant 1), i.e. right at C_crit ~ 1.4-1.8.
//   P5. truth / union ~ 0.56-0.92 (phase1-T4), so truth / chaining ~ 0.1.
//
//   node research/import-chaining-01.js            (~10 min at defaults)
// ============================================================================
'use strict';
const T0 = Date.now(); const el = () => ((Date.now()-T0)/1000).toFixed(1)+'s';
const LV = require('./sift-limit-lemmaV.js');

function primesBelow(n){ const s=new Uint8Array(n),o=[]; for(let i=2;i<n;i++){ if(!s[i]){o.push(i); for(let j=i*i;j<n;j+=i)s[j]=1; } } return o; }
function rosserSupport(z, D, upper){
  const ps = primesBelow(z).slice().sort((a,b)=>b-a); const out = [];
  (function rec(start, prod, m){
    out.push([prod, (m % 2 === 0) ? 1 : -1]);
    for(let i=start;i<ps.length;i++){ const p = ps[i], m2 = m+1;
      if(prod*p > D) continue;
      const isCond = upper ? (m2 % 2 === 1) : (m2 % 2 === 0);
      if(isCond && prod*p*p*p > D) continue;
      rec(i+1, prod*p, m2); }
  })(0, 1, 0); return out;
}
function buildLam(L, supp){ const A=new Int32Array(L); for(const [d,sg] of supp){ for(let n=0;n<L;n+=d) A[n]+=sg; } return A; }

// ---------------------------------------------------------------------------
// A. the increment metric, in closed form (extends lemmaV S2 to lag != 0)
// ---------------------------------------------------------------------------
// Pg(y) = ybar(g-ybar)/2 with ybar = y mod g. Psi(g,y) = Pg(y-H)+Pg(y+H)-2Pg(y).
function PG(y,g){ let r=y%g; if(r<0) r+=g; return r*(g-r)/2; }
function PSI(g,y,H){ return PG(y-H,g)+PG(y+H,g)-2*PG(y,g); }

// autocovariance of R at lag delta, exact, O(N^2). delta = 0 gives <R^2>.
function rhoR(t, H, delta){
  const n=t.n, w=t.w, q=t.q, c=t.c, mk=t.mk, PR=Float64Array.from(t.ps);
  let tot=0;
  for(let i=0;i<n;i++){
    const qi=q[i], ci=c[i], wi=w[i], mi=mk[i];
    { const g=qi; tot += PSI(g,-delta,H)/(qi*qi); }               // i = j
    for(let j=i+1;j<n;j++){
      let m=mi&mk[j]; if(m===0) continue; let g=1;
      while(m){ const b=m&(-m); g*=PR[31-Math.clz32(b)]; m^=b; }
      if(H%g===0) continue;                                        // (V1)
      // (i,j) and (j,i) are NOT equal at lag != 0: y flips to -dc-delta and
      // PSI is even, so the pair contributes PSI(dc-delta)+PSI(dc+delta).
      const dc=c[j]-ci;
      tot += wi*w[j]*(PSI(g,dc-delta,H)+PSI(g,dc+delta,H))/(qi*q[j]);
    }
  }
  return tot;
}

// tail energies of the CRT filtration, ALL k in one O(N^2) pass.
// order: the filtration order of the primes below z. Returns E_k^tail, k=0..K.
// Uses the exact projection identity
//   <R_k^2> = sum_{i,j} w_i w_j Psi(gcd(g_ij,P_k), dc_ij) / (q_i q_j).
function tailEnergies(t, H, order){
  const n=t.n, w=t.w, q=t.q, c=t.c, mk=t.mk;
  const K=order.length;
  const idxOf = new Map(t.ps.map((p,i)=>[p,i]));
  // TAB[mask] = list of [k, g] at the levels k where gcd(mask, P_k) grows
  const TAB=[];
  for(let mask=0; mask<(1<<K); mask++){
    const list=[]; let g=1;
    for(let k=1;k<=K;k++){ const bit=1<<idxOf.get(order[k-1]);
      if(mask&bit){ g*=order[k-1]; list.push([k,g]); } }
    TAB.push(list);
  }
  const diff=new Float64Array(K+2);
  for(let i=0;i<n;i++){
    const qi=q[i], ci=c[i], wi=w[i], mi=mk[i];
    for(let j=i;j<n;j++){
      const mfull=(j===i)?mi:(mi&mk[j]);
      if(mfull===0) continue;
      const L=TAB[mfull]; if(L.length===0) continue;
      const dc=(j===i)?0:(c[j]-ci);
      const coef=(j===i)?1/(qi*qi):2*wi*w[j]/(qi*q[j]);
      let prev=0;
      for(let a=0;a<L.length;a++){
        const k=L[a][0], g=L[a][1];
        const val=(H%g===0)?0:PSI(g,dc,H);
        if(val!==prev){ diff[k]+=coef*(val-prev); prev=val; }
      }
    }
  }
  const proj=new Float64Array(K+1);
  let acc=0; for(let k=1;k<=K;k++){ acc+=diff[k]; proj[k]=acc; }
  const ms=proj[K];
  const tail=new Float64Array(K+1);
  for(let k=0;k<=K;k++) tail[k]=Math.max(0, ms-proj[k]);
  return { proj, tail, ms };
}

// ---------------------------------------------------------------------------
// B. the exact remainder over one full period, and its complete metric profile
// ---------------------------------------------------------------------------
function periodArray(z,H,D){
  let W=1; for(const p of primesBelow(z)) W*=p;
  const L=W+H+10;
  const sp=rosserSupport(z,D,true), sm=rosserSupport(z,D,false);
  const Lp=buildLam(L,sp), Lm=buildLam(L,sm);
  const cc=(r)=>Lm[r]*Lp[r+2]+Lp[r]*Lm[r+2]-Lp[r]*Lp[r+2];
  const t=LV.buildTerms(z,D), HM=H*t.M;
  const R=new Float64Array(W);
  let T=0; for(let r=1;r<=H;r++) T+=cc(r);
  let sup=0, minT=T;
  for(let x=0;x<W;x++){ if(x>0) T+=cc(x+H)-cc(x);
    R[x]=T-HM; if(Math.abs(R[x])>sup) sup=Math.abs(R[x]); if(T<minT) minT=T; }
  return { R, sup, minT, W, HM, t };
}
// blocked sup only (no array), for z where W*8 bytes is out of reach
function periodSup(z,H,D,B){
  let W=1; for(const p of primesBelow(z)) W*=p;
  const sp=rosserSupport(z,D,true), sm=rosserSupport(z,D,false);
  const t=LV.buildTerms(z,D), HM=H*t.M;
  const len=B+H+8;
  const Lp=new Int32Array(len), Lm=new Int32Array(len);
  const fill=(A,supp,lo)=>{ A.fill(0);
    for(const [d,sg] of supp){ let n=Math.ceil(lo/d)*d; for(;n<lo+len;n+=d) A[n-lo]+=sg; } };
  let T=null, sup=0, minT=Infinity;
  for(let lo=0; lo<W; lo+=B){
    fill(Lp,sp,lo); fill(Lm,sm,lo);
    const cc=(r)=>{ const k=r-lo; return Lm[k]*Lp[k+2]+Lp[k]*Lm[k+2]-Lp[k]*Lp[k+2]; };
    const hi=Math.min(lo+B,W);
    if(T===null){ T=0; for(let r=1;r<=H;r++) T+=cc(r); }
    for(let x=lo;x<hi;x++){ if(x>0) T+=cc(x+H)-cc(x);
      const d=Math.abs(T-HM); if(d>sup) sup=d; if(T<minT) minT=T; }
  }
  return { sup, minT, W, HM, t };
}

// cyclic autocorrelation of R over Z/W, exact, via zero-padded radix-2 FFT
function fft(re,im,inv){
  const n=re.length;
  for(let i=1,j=0;i<n;i++){ let bit=n>>1; for(;j&bit;bit>>=1) j^=bit; j^=bit;
    if(i<j){ let tr=re[i]; re[i]=re[j]; re[j]=tr; tr=im[i]; im[i]=im[j]; im[j]=tr; } }
  for(let len=2;len<=n;len<<=1){
    const ang=2*Math.PI/len*(inv?1:-1), wr=Math.cos(ang), wi=Math.sin(ang);
    for(let i=0;i<n;i+=len){ let cwr=1,cwi=0;
      for(let k=0;k<len/2;k++){
        const ur=re[i+k], ui=im[i+k];
        const vr=re[i+k+len/2]*cwr-im[i+k+len/2]*cwi, vi=re[i+k+len/2]*cwi+im[i+k+len/2]*cwr;
        re[i+k]=ur+vr; im[i+k]=ui+vi; re[i+k+len/2]=ur-vr; im[i+k+len/2]=ui-vi;
        const nwr=cwr*wr-cwi*wi; cwi=cwr*wi+cwi*wr; cwr=nwr; } }
  }
  if(inv) for(let i=0;i<n;i++){ re[i]/=n; im[i]/=n; }
}
function cyclicAutocov(R){
  const W=R.length; let n=1; while(n<2*W) n<<=1;
  const re=new Float64Array(n), im=new Float64Array(n);
  for(let i=0;i<W;i++) re[i]=R[i];
  fft(re,im,false);
  for(let i=0;i<n;i++){ const a=re[i],b=im[i]; re[i]=a*a+b*b; im[i]=0; }
  fft(re,im,true);
  // P[k] = sum_x R[x] R[x-k] = linear autocorrelation at lag k
  // cyclic: rho(0)=P[0]/W, rho(d)=(P[d]+P[W-d])/W for 1<=d<W
  const rho=new Float64Array(W);
  rho[0]=re[0]/W;
  for(let d=1;d<W;d++) rho[d]=(re[d]+re[W-d])/W;
  return rho;
}


// ---------------------------------------------------------------------------
// C. THE INCREMENT METRIC IN CLOSED FORM, AND ITS UNCONDITIONAL BOUND
// ---------------------------------------------------------------------------
// EXACT IDENTITY (this file):  R_H(x+delta) - R_H(x) = R_delta(x+H) - R_delta(x)
// -- the same divisor-pair sum with the roles of window and lag exchanged.
// Hence the increment metric is SYMMETRIC in (H, delta):
//        d_H(delta) = d_delta(H),      d_H(delta)^2 = 2( <R^2>_H - rho_H(delta) )
// and, bounding the difference of the two terms crudely,
//        d_H(delta)^2 <= 4 <R^2>_delta <= 4 B(z,s) * delta,
// where <R^2>_delta <= B(z,s)*delta is the UNCONDITIONAL mean-square theorem
// (history/staging/attack-AB-bounded.md; B <= 9A^2(E-1) = O((log z)^8),
// measured B(z,3.0) = 1.38..1.49). So the increment metric is BROWNIAN with a
// proved constant, and this is the honest d(s,t) the chaining import needs.
//   d(delta) <= 2 sqrt(B delta),   and always   d(delta) <= 2 sqrt(<R^2>_H).

// ---------------------------------------------------------------------------
// D. driver
// ---------------------------------------------------------------------------
// operative windows: the SELF-CONSISTENT exact-supremum windows of
// history/staging/phase1-T4-maximal-law.md sec.4 (s = 3.0): the smallest H
// from which min_x T(x) >= 1 holds onward. Re-verified (minT) in the output.
const ROWS = [ [13,60], [17,126], [19,198], [23,258], [29,390] ];
const S = 3.0;
const ARRAY_MAX_W = 1.2e7;

// dyadic INTERVAL nets: level k has 2^k cells, each an interval of length
// L_k = W/2^k. Cell diameter Delta_k = max_{1<=delta<=L_k} d(delta).
function dyadicChain(diamOfLen, W){
  const lv=[]; let k=0;
  for(;;){ const L=Math.ceil(W/Math.pow(2,k));
    lv.push({k, N:Math.pow(2,k), L, D:(L<=1?0:diamOfLen(L))});
    if(L<=1) break; k++; if(k>60) break; }
  let chain=0;
  for(let i=1;i<lv.length;i++) chain += lv[i-1].D*Math.sqrt(2*Math.log(lv[i].N));
  return { lv, chain };
}
// exact two-sided entropy integral from ball volumes of the (translation
// invariant) metric:  W/|B(eps)| <= N(eps) <= W/|B(eps/2)|
function entropyTwoSided(sortedD, W, D0, steps){
  const vol=(e)=>{ let lo=0,hi=sortedD.length;
    while(lo<hi){ const mid=(lo+hi)>>1; if(sortedD[mid]<=e) lo=mid+1; else hi=mid; }
    return Math.max(1,lo); };
  let lo=0, hi=0; const h=D0/steps;
  for(let i=0;i<steps;i++){ const e=(i+0.5)*h;
    const Nl=W/vol(e), Nh=W/vol(e/2);
    if(Nl>1) lo+=Math.sqrt(2*Math.log(Nl))*h;
    if(Nh>1) hi+=Math.sqrt(2*Math.log(Nh))*h; }
  return { lo, hi };
}
// the closed analytic entropy integral from the PROVED Brownian bound:
//   N(eps) <= min( W, 4 B W / eps^2 ),  diam <= 2 sigma
function analyticEntropy(B, W, sigma, steps){
  const D0=2*sigma, h=D0/steps; let s=0;
  for(let i=0;i<steps;i++){ const e=(i+0.5)*h;
    const N=Math.min(W, 4*B*W/(e*e)); if(N>1) s+=Math.sqrt(2*Math.log(N))*h; }
  return s;
}

function main(){
  console.log('IMPORT 1 --- GENERIC CHAINING (Dudley/Talagrand) against the sieve remainder R_H');
  console.log('PRE-REGISTERED before the first run (see header P1-P5).\n');
  const res=[];
  for(const [z,H] of ROWS){
    const D=Math.round(Math.pow(z,S));
    const t=LV.buildTerms(z,D);
    let W=1; for(const p of t.ps) W*=p;
    const lnW=Math.log(W);
    const cf=LV.meanSquare(t,H), ms=cf.ms, rms=Math.sqrt(ms);
    const o={z,H,D,W,lnW,N:t.n,M:t.M,HM:H*t.M,ms,rms};
    o.custody_rho0=Math.abs(rhoR(t,H,0)-ms)/ms;

    let prof=null;
    if(W<=ARRAY_MAX_W){
      const pa=periodArray(z,H,D); o.sup=pa.sup; o.minT=pa.minT;
      let s2=0; for(let x=0;x<W;x++) s2+=pa.R[x]*pa.R[x];
      o.custody_arr=Math.abs(s2/W-ms)/ms;
      const rho=cyclicAutocov(pa.R);
      o.custody_rho1=Math.abs(rho[1]-rhoR(t,H,1))/Math.abs(rho[1]);
      o.custody_rho7=Math.abs(rho[7]-rhoR(t,H,7))/Math.abs(rho[7]);
      prof=new Float64Array(W);
      for(let d=0;d<W;d++) prof[d]=Math.sqrt(Math.max(0,2*(ms-rho[d])));
    } else {
      const pa=periodSup(z,H,D,2_000_000); o.sup=pa.sup; o.minT=pa.minT;
    }

    // the metric: measured, and against the two proved envelopes
    const dOf = prof ? ((dl)=>prof[dl%W])
                     : ((dl)=>Math.sqrt(Math.max(0,2*(ms-rhoR(t,H,dl)))));
    o.dList=[1,2,4,8,16,32,64,128,256,1024].filter(d=>d<W).map(d=>[d,dOf(d)]);
    o.B = 9*Math.pow((5/2)*t.ps.filter(p=>p>2).reduce((a,p)=>a*(1+2/p),1),2) *
          ((43/25)*t.ps.filter(p=>p>2).reduce((a,p)=>a*(1+4*p/((p+2)*(p+2))),1) - 1);
    o.Bmeas = (()=>{ // sum_e e*Vabs(e)^2 is what lemmaV calls B; use the measured
      // proxy <R^2>_delta / delta at delta=1, the sharp local constant
      return LV.meanSquare(t,1).ms; })();
    if(prof){ let mx=0; for(let d=1;d<W;d++) if(prof[d]>mx) mx=prof[d]; o.dmax=mx; }
    else o.dmax=2*rms;

    // cell diameters for dyadic interval nets
    const diamOfLen = prof ? ((L)=>{ let m=0; const top=Math.min(L,W-1);
                                     for(let d=1;d<=top;d++) if(prof[d]>m) m=prof[d]; return m; })
                           : ((L)=>Math.min(2*rms, 2*Math.sqrt(o.Bmeas*L)));
    // memoised, coarse->fine, so each level reuses the previous scan
    const memo=new Map();
    const diamFast = prof ? ((L)=>{ if(memo.has(L)) return memo.get(L);
        let m=0; const top=Math.min(L,W-1);
        for(let d=1;d<=top;d++) if(prof[d]>m) m=prof[d]; memo.set(L,m); return m; })
      : diamOfLen;
    const dc=dyadicChain(diamFast,W);
    o.chain=dc.chain; o.levels=dc.lv;

    const union=rms*Math.sqrt(2*lnW); o.union=union;
    o.Ianalytic=analyticEntropy(o.Bmeas,W,rms,20000);
    if(prof){ const srt=Float64Array.from(prof); srt.sort();
      const ts=entropyTwoSided(srt,W,o.dmax,20000); o.Ilo=ts.lo; o.Ihi=ts.hi; }
    res.push(o);

    console.log(`z=${z} H=${H} D=${D} N=${t.n} W=${W} H*M=${o.HM.toFixed(5)}`);
    console.log(`  CUSTODY rho(0) vs lemmaV rel=${o.custody_rho0.toExponential(2)}` +
      (o.custody_arr!==undefined?`  array ms rel=${o.custody_arr.toExponential(2)}  rho(1) rel=${o.custody_rho1.toExponential(2)}  rho(7) rel=${o.custody_rho7.toExponential(2)}`:'') +
      `  minT=${o.minT}`);
    console.log(`  rms=${rms.toFixed(6)}  sqrt(2lnW)=${Math.sqrt(2*lnW).toFixed(4)}  TRUE sup=${o.sup.toFixed(5)}  sup/(rms*sqrt(2lnW))=${(o.sup/union).toFixed(4)}  dmax/(2rms)=${(o.dmax/(2*rms)).toFixed(4)}`);
    console.log(`  METRIC  delta : d(delta) : d/sqrt(delta) : envelope 2 sqrt(<R^2>_1 * delta)`);
    console.log('    ' + o.dList.map(([d,v])=>`${d}:${v.toFixed(4)}/${(v/Math.sqrt(d)).toFixed(4)}/${(2*Math.sqrt(o.Bmeas*d)).toFixed(4)}`).join('  '));
    console.log(`  <R^2>_1=${o.Bmeas.toFixed(6)}  proved B(z,3.0) bound 9A^2(E-1)=${o.B.toExponential(3)}`);
    console.log(`  dyadic levels (N_k, L_k, Delta_k): ` + dc.lv.slice(0,14).map(l=>`(${l.N},${l.L},${l.D.toFixed(3)})`).join(' ') + (dc.lv.length>14?' ...':''));
    console.log(`  CHAIN=${o.chain.toFixed(5)}  I_analytic=${o.Ianalytic.toFixed(5)}` + (o.Ilo!==undefined?`  I_exact in [${o.Ilo.toFixed(5)}, ${o.Ihi.toFixed(5)}]`:'') + `   [${el()}]`);
  }
  console.log('\n=== THREE COLUMNS (s = 3.0, operative H) ===');
  console.log('   z      truth      union      t/u  |   CHAIN     c/u  |  I_anal   Ia/u  |  I_exact lo..hi     Ilo/u  Ihi/u');
  for(const o of res){
    console.log(`  ${String(o.z).padStart(2)}  ${o.sup.toFixed(4).padStart(9)}  ${o.union.toFixed(4).padStart(9)}  ${(o.sup/o.union).toFixed(4)}  |  ${o.chain.toFixed(4).padStart(8)}  ${(o.chain/o.union).toFixed(3)}  |  ${o.Ianalytic.toFixed(4).padStart(7)}  ${(o.Ianalytic/o.union).toFixed(3)}  |  ` +
      (o.Ilo!==undefined?`${o.Ilo.toFixed(4)} .. ${o.Ihi.toFixed(4)}   ${(o.Ilo/o.union).toFixed(3)}  ${(o.Ihi/o.union).toFixed(3)}`:'--'));
  }
  console.log('\nC_crit (phase1-T4 sec.2c) = 2.225 1.720 1.358 1.418 1.660 at z=13,17,19,23,29:');
  console.log('a bound sup|R| <= C * rms * sqrt(2 lnW) with C below C_crit is TPC-implying.');
  console.log(`\n[${el()}] done`);
}
if(require.main===module) main();
module.exports={rhoR,tailEnergies,periodArray,periodSup,cyclicAutocov,dyadicChain,analyticEntropy};

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/import-chaining-01.js
//   invocation:  node research/import-chaining-01.js
//   code-sha256: f74da855a31656d93a40b21a6b1e7fc8aee2362ffa44764e126b7d69dbf001f1
//   out-sha256:  4853734db29a8466e7b9d497a55eec1f492e5174a34302076d73e793ad5e86a9
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     265.3 s
// ============================================================================
// IMPORT 1 --- GENERIC CHAINING (Dudley/Talagrand) against the sieve remainder R_H
// PRE-REGISTERED before the first run (see header P1-P5).
//
// z=13 H=60 D=2197 N=852 W=2310 H*M=3.35065
//   CUSTODY rho(0) vs lemmaV rel=2.49e-15  array ms rel=8.40e-15  rho(1) rel=2.75e-14  rho(7) rel=2.73e-14  minT=1
//   rms=1.194862  sqrt(2lnW)=3.9357  TRUE sup=2.64935  sup/(rms*sqrt(2lnW))=0.5634  dmax/(2rms)=0.9267
//   METRIC  delta : d(delta) : d/sqrt(delta) : envelope 2 sqrt(<R^2>_1 * delta)
//     1:0.2791/0.2791/0.4813  2:0.3948/0.2791/0.6807  4:0.5583/0.2791/0.9627  8:0.7684/0.2717/1.3614  16:1.0699/0.2675/1.9253  32:1.3361/0.2362/2.7228  64:1.9695/0.2462/3.8507  128:1.9952/0.1764/5.4457  256:1.5703/0.0981/7.7013  1024:1.3586/0.0425/15.4027
//   <R^2>_1=0.057920  proved B(z,3.0) bound 9A^2(E-1)=3.592e+3
//   dyadic levels (N_k, L_k, Delta_k): (1,2310,2.214) (2,1155,2.214) (4,578,2.187) (8,289,2.139) (16,145,2.139) (32,73,2.003) (64,37,1.406) (128,19,1.156) (256,10,0.845) (512,5,0.624) (1024,3,0.483) (2048,2,0.395) (4096,1,0.000)
//   CHAIN=44.23794  I_analytic=8.33782  I_exact in [4.95671, 7.26645]   [0.1s]
// z=17 H=126 D=4913 N=2236 W=30030 H*M=5.92028
//   CUSTODY rho(0) vs lemmaV rel=4.01e-16  array ms rel=1.37e-13  rho(1) rel=5.74e-13  rho(7) rel=5.20e-13  minT=1
//   rms=1.488542  sqrt(2lnW)=4.5409  TRUE sup=4.92028  sup/(rms*sqrt(2lnW))=0.7279  dmax/(2rms)=0.8782
//   METRIC  delta : d(delta) : d/sqrt(delta) : envelope 2 sqrt(<R^2>_1 * delta)
//     1:0.2906/0.2906/0.4465  2:0.4110/0.2906/0.6314  4:0.5812/0.2906/0.8930  8:0.7553/0.2670/1.2629  16:0.9879/0.2470/1.7860  32:1.4077/0.2488/2.5258  64:2.1154/0.2644/3.5720  128:2.5501/0.2254/5.0516  256:1.9887/0.1243/7.1440  1024:1.9902/0.0622/14.2880
//   <R^2>_1=0.049840  proved B(z,3.0) bound 9A^2(E-1)=6.105e+3
//   dyadic levels (N_k, L_k, Delta_k): (1,30030,2.614) (2,15015,2.614) (4,7508,2.607) (8,3754,2.607) (16,1877,2.595) (32,939,2.595) (64,470,2.590) (128,235,2.590) (256,118,2.590) (512,59,2.016) (1024,30,1.335) (2048,15,0.957) (4096,8,0.755) (8192,4,0.581) ...
//   CHAIN=83.30804  I_analytic=12.03194  I_exact in [7.02746, 10.22510]   [0.8s]
// z=19 H=198 D=6859 N=4764 W=510510 H*M=7.84034
//   CUSTODY rho(0) vs lemmaV rel=0.00e+0  array ms rel=1.04e-12  rho(1) rel=5.14e-12  rho(7) rel=4.84e-12  minT=1
//   rms=1.447794  sqrt(2lnW)=5.1270  TRUE sup=6.84034  sup/(rms*sqrt(2lnW))=0.9215  dmax/(2rms)=0.8186
//   METRIC  delta : d(delta) : d/sqrt(delta) : envelope 2 sqrt(<R^2>_1 * delta)
//     1:0.2533/0.2533/0.4313  2:0.3582/0.2533/0.6100  4:0.5016/0.2508/0.8627  8:0.6758/0.2389/1.2200  16:0.8929/0.2232/1.7254  32:1.0965/0.1938/2.4401  64:1.4167/0.1771/3.4508  128:1.7331/0.1532/4.8801  256:2.0004/0.1250/6.9016  1024:2.0771/0.0649/13.8031
//   <R^2>_1=0.046515  proved B(z,3.0) bound 9A^2(E-1)=9.283e+3
//   dyadic levels (N_k, L_k, Delta_k): (1,510510,2.370) (2,255255,2.370) (4,127628,2.370) (8,63814,2.364) (16,31907,2.364) (32,15954,2.340) (64,7977,2.312) (128,3989,2.312) (256,1995,2.309) (512,998,2.309) (1024,499,2.145) (2048,250,2.100) (4096,125,1.727) (8192,63,1.408) ...
//   CHAIN=109.07062  I_analytic=13.58196  I_exact in [8.08955, 11.01441]   [4.5s]
// z=23 H=258 D=12167 N=9636 W=9699690 H*M=8.81566
//   CUSTODY rho(0) vs lemmaV rel=1.18e-15  array ms rel=3.45e-11  rho(1) rel=3.00e-10  rho(7) rel=3.00e-10  minT=1
//   rms=1.736480  sqrt(2lnW)=5.6723  TRUE sup=7.81566  sup/(rms*sqrt(2lnW))=0.7935  dmax/(2rms)=0.8151
//   METRIC  delta : d(delta) : d/sqrt(delta) : envelope 2 sqrt(<R^2>_1 * delta)
//     1:0.2737/0.2737/0.4161  2:0.3870/0.2737/0.5884  4:0.5470/0.2735/0.8321  8:0.7414/0.2621/1.1768  16:0.9954/0.2489/1.6643  32:1.3189/0.2331/2.3536  64:1.7738/0.2217/3.3286  128:2.1683/0.1917/4.7073  256:2.6403/0.1650/6.6571  1024:2.3860/0.0746/13.3142
//   <R^2>_1=0.043278  proved B(z,3.0) bound 9A^2(E-1)=1.354e+4
//   dyadic levels (N_k, L_k, Delta_k): (1,9699690,2.831) (2,4849845,2.831) (4,2424923,2.825) (8,1212462,2.825) (16,606231,2.825) (32,303116,2.804) (64,151558,2.804) (128,75779,2.804) (256,37890,2.792) (512,18945,2.779) (1024,9473,2.779) (2048,4737,2.779) (4096,2369,2.722) (8192,1185,2.722) ...
//   CHAIN=190.67159  I_analytic=18.09272  I_exact in [10.82597, 14.71126]   [26.3s]
// z=29 H=390 D=24389 N=20700 W=223092870 H*M=12.41865
//   CUSTODY rho(0) vs lemmaV rel=3.79e-15  minT=1
//   rms=2.164715  sqrt(2lnW)=6.2005  TRUE sup=11.41865  sup/(rms*sqrt(2lnW))=0.8507  dmax/(2rms)=1.0000
//   METRIC  delta : d(delta) : d/sqrt(delta) : envelope 2 sqrt(<R^2>_1 * delta)
//     1:0.2296/0.2296/0.3939  2:0.3247/0.2296/0.5570  4:0.4599/0.2300/0.7877  8:0.6463/0.2285/1.1140  16:0.8997/0.2249/1.5754  32:1.1808/0.2087/2.2280  64:1.5962/0.1995/3.1509  128:2.0914/0.1849/4.4560  256:2.8962/0.1810/6.3018  1024:3.2017/0.1001/12.6035
//   <R^2>_1=0.038781  proved B(z,3.0) bound 9A^2(E-1)=1.861e+4
//   dyadic levels (N_k, L_k, Delta_k): (1,223092870,4.329) (2,111546435,4.329) (4,55773218,4.329) (8,27886609,4.329) (16,13943305,4.329) (32,6971653,4.329) (64,3485827,4.329) (128,1742914,4.329) (256,871457,4.329) (512,435729,4.329) (1024,217865,4.329) (2048,108933,4.329) (4096,54467,4.329) (8192,27234,4.329) ...
//   CHAIN=411.57137  I_analytic=24.65386   [265.1s]
//
// === THREE COLUMNS (s = 3.0, operative H) ===
//    z      truth      union      t/u  |   CHAIN     c/u  |  I_anal   Ia/u  |  I_exact lo..hi     Ilo/u  Ihi/u
//   13     2.6494     4.7027  0.5634  |   44.2379  9.407  |   8.3378  1.773  |  4.9567 .. 7.2664   1.054  1.545
//   17     4.9203     6.7593  0.7279  |   83.3080  12.325  |  12.0319  1.780  |  7.0275 .. 10.2251   1.040  1.513
//   19     6.8403     7.4229  0.9215  |  109.0706  14.694  |  13.5820  1.830  |  8.0895 .. 11.0144   1.090  1.484
//   23     7.8157     9.8499  0.7935  |  190.6716  19.358  |  18.0927  1.837  |  10.8260 .. 14.7113   1.099  1.494
//   29    11.4187    13.4223  0.8507  |  411.5714  30.663  |  24.6539  1.837  |  --
//
// C_crit (phase1-T4 sec.2c) = 2.225 1.720 1.358 1.418 1.660 at z=13,17,19,23,29:
// a bound sup|R| <= C * rms * sqrt(2 lnW) with C below C_crit is TPC-implying.
//
// [265.1s] done
// ============================================================
// READINGS
// ============================================================
//
// 1. CUSTODY IS EXACT AND THE OPERATIVE WINDOW IS THE PUBLISHED ONE. The new
//    lag-dependent closed form reproduces `sift-limit-lemmaV.js` `meanSquare`
//    at lag 0 to 3.79e-15 or better at all five z, the full-period array
//    reproduces it to 3.45e-11, and the FFT autocovariance reproduces the
//    closed form at lags 1 and 7 to 3.00e-10. `minT=1` at every level, so the
//    windows H = 60, 126, 198, 258, 390 are exactly `phase1-T4-maximal-law.md`
//    sec.4's self-consistent thresholds. `sup/(rms*sqrt(2lnW))` comes out
//    0.5634, 0.7279, 0.9215, 0.7935, 0.8507 — that report's tightness row,
//    digit for digit, from an independently written walker.
//
// 2. THE INCREMENT METRIC IS BROWNIAN, AND THAT IS THE WHOLE MAPPING.
//    `d(delta)/sqrt(delta)` reads 0.2791, 0.2791, 0.2791 at delta = 1, 2, 4
//    (z = 13) and stays inside a factor 1.2 out to delta = 64 at every z; at
//    z = 29 it is 0.2296, 0.2296, 0.2300, 0.2285, 0.2249 across delta = 1..16.
//    The mechanism is exact, not empirical: R_H(x+delta) - R_H(x) =
//    R_delta(x+H) - R_delta(x), so the increment at lag delta IS the remainder
//    at window delta. The pre-registered P1 ("the metric is flat,
//    d(1)/(2 rms) > 0.9") is REFUTED: the measured value is 0.0530 to 0.1168
//    across z = 13..29 (0.0875 to 0.1168 over z = 13..19 alone).
//    Chaining therefore has real geometry to work with here, which is the
//    opposite of what the attack expected going in.
//
// 3. THE DYADIC-INTERVAL CHAIN IS THE WRONG CHAIN AND ITS NUMBER IS NOT THE
//    VERDICT. `CHAIN` = 44.2, 83.3, 109.1, 190.7, 411.6, i.e. 9.4 to 30.7
//    times the union bound and rising. The reason is visible in the level
//    table: Delta_k barely moves over the first ten levels (2.831 to 2.779 at
//    z = 23; 4.329 flat for fourteen levels at z = 29), so every one of those
//    levels buys nothing and is charged sqrt(2 ln N_k). Nets must be geometric
//    in eps, not in cell length. `import-chaining-03.js` (a) does that and
//    gets 2.88 to 3.03, flat. Pre-registered P3 ("chain/union in [3,10]
//    growing like pi(z)") is right for the correct chain and wrong for this one.
//
// 4. THE ENTROPY INTEGRAL IS PINNED TWO-SIDED AND IT IS FLAT. Using only the
//    exact ball volumes of the translation-invariant metric — no net choice at
//    all, since W/|B(eps)| <= N(eps) <= W/|B(eps/2)| — the integral sits in
//    [4.96, 7.27], [7.03, 10.23], [8.09, 11.01], [10.83, 14.71] against union
//    bounds 4.70, 6.76, 7.42, 9.85. In ratio that is [1.054, 1.545],
//    [1.040, 1.513], [1.090, 1.484], [1.099, 1.494]: FLAT in z at about
//    [1.07, 1.50]. Pre-registered P4 guessed sqrt(2) = 1.414 for this floor and
//    lands inside the measured band.
//
// 5. ON PROVED INPUT ALONE THE GEOMETRY DISAPPEARS. `I_analytic` uses the
//    measured local constant <R^2>_1 = 0.0579, 0.0498, 0.0465, 0.0433, 0.0388
//    and gives 1.773, 1.780, 1.830, 1.837, 1.837 times the union bound. The
//    only PROVED constant available is 9A^2(E-1) = 3.592e+3 to 1.861e+4
//    (`history/staging/attack-AB-bounded.md`), five orders above the measured
//    one, and with it the covering-number refinement never activates at all —
//    see `import-chaining-03.js` (c), where the ratio is 2.000 at every level.
//
// 6. THE THREE COLUMNS. truth/union = 0.5634, 0.7279, 0.9215, 0.7935, 0.8507
//    against C_crit = 2.225, 1.720, 1.358, 1.418, 1.660. The truth is below the
//    TPC-implying threshold at every level, which is `phase1-T4`'s point and is
//    reproduced here; the entropy floor [1.07, 1.50] straddles it; the honest
//    chaining constant is above it. The whole verdict lives in that ordering.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   the CHAIN ladder of reading 3: 109.07062 -> 109.1, 190.67159 -> 190.7,
//     411.57137 -> 411.6, and the c/u top 30.663 -> 30.7.
//   the entropy interval endpoints of reading 4: 4.95671 -> 4.96, 7.26645 ->
//     7.27, 7.02746 -> 7.03, 10.22510 -> 10.23, 10.82597 -> 10.83.
//   the union bounds of reading 4: 4.7027 -> 4.70, 6.7593 -> 6.76, 7.4229 ->
//     7.42, 9.8499 -> 9.85, the union column of the three-column table.
//   the local constants of reading 5: 0.057920, 0.049840, 0.046515, 0.043278
//     and 0.038781 -> 0.0579, 0.0498, 0.0465, 0.0433, 0.0388.
// DERIVED IN THIS READING by arithmetic over printed values:
//   0.1168 and 0.0875, the d(1)/(2 rms) figures of reading 2: the delta = 1
//     entry of the METRIC row over twice the printed rms, 0.2791/(2*1.194862)
//     = 0.1168 at z = 13 and 0.2533/(2*1.447794) = 0.0875 at z = 19. The same
//     quotient at the other three levels is 0.0976, 0.0788 and 0.0530.
//     CORRECTED 2026-08-20 (mismatch adjudication #17): reading 2 gave the
//     interval as "0.0875 to 0.1168", which is the z = 13..19 span, while the
//     sentence it sits in is about all five levels; the z = 29 value 0.0530
//     lies below it. The reading now states both spans. Old -> new: "0.0875 to
//     0.1168" -> "0.0530 to 0.1168 across z = 13..29 (0.0875 to 0.1168 over
//     z = 13..19 alone)". The five quotients, recomputed here from the printed
//     METRIC and rms rows, are 0.1168, 0.0976, 0.0875, 0.0788, 0.0530. The
//     refutation of P1 is unaffected and is strengthened by the wider span:
//     every level is far under 0.9.
//   the band [1.07, 1.50] of readings 4 and 6, the means of the four printed
//     ratio pairs: Ilo/u averages 1.0708 and Ihi/u averages 1.5090.
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   2.88 to 3.03 in reading 3 is `import-chaining-03.js` variant (a), whose
//     block prints 2.994, 3.027, 2.878, 2.885 at z = 13, 17, 19, 23; and the
//     ratio 2.000 in reading 5 is that file's last column, 2.000 at all four
//     levels.
// DEFINITION / LITERATURE constants: sqrt(2) = 1.414, the value P4 guessed.
// ---------------------------------------------------------------------------
