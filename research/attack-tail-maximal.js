// ============================================================================
// THE TAIL-ONLY MAXIMAL INEQUALITY — is the split a localisation or a
// reparametrisation?
// (2026-08-18/19; attack 1 of 10 on the 4.2665 exponent. Companion report:
//  research/history/staging/attack-tail-maximal.md. Parent documents:
//  research/history/staging/attack-AB-bounded.md sec.4.4, research/
//  history/staging/attack-theta-last-gap.md sec.6, research/history/staging/
//  attack-DP1-mechanism.md sec.6, research/sift-limit-attack.md sec.7e,
//  research/lemmaV-parseval.js, research/lemmaV-sup-extension.js.)
// ============================================================================
// THE OBJECT. lemmaV-parseval.js's L5 is the pointwise identity
//
//   R_H(x) = sum_{e | P(z), e>1} sum*_{a mod e} Theta_e(a) S_H(a/e) e(ax/e),
//
// P(z) = prod_{p<z} p =: W, sum* over (a,e)=1. Everything the project needs is
// sup_x |R_H(x)| < H*M, and that supremum is the recurring wall. attack-AB-
// bounded.md sec.4.4 measured a SPLIT of that wall at a cutoff and found the
// retained (small-e) part flat in z, concluding "the maximal wall is entirely
// in the tail". This file states the split as a lemma, verifies it, prices the
// tail alone, and tests three routes at it.
//
// THE SPLIT, as used here. For a prime y <= z put m = prod_{p<=y} p, a divisor
// of W, and split the spectrum by whether e | m:
//     Phi_m(x) = sum_{e|m, e>1} sum*_a Theta_e(a) S_H(a/e) e(ax/e)      HEAD
//     T_m(x)   = R_H(x) - Phi_m(x)                                      TAIL
// S1 verifies the position-space identity that makes the split usable:
//     Phi_m(x) = (m/W) * sum_{y = x mod m} R_H(y),
// i.e. THE HEAD IS THE CONDITIONAL MEAN OF R ON THE RESIDUE CLASS x mod m and
// the tail is the fluctuation about it. Two consequences, both used below:
//   (i) the head carries exactly m-1 frequencies, so Cauchy-Schwarz gives
//       sup_x |Phi_m| <= sum |coeff| <= sqrt(m-1) * rms(Phi_m) with NO sup over
//       x anywhere. At fixed m that is a CONSTANT in z. The head is not a
//       maximal-inequality problem for a proved reason, not a measured one.
//  (ii) T_m has mean zero on EVERY class mod m, and each class holds only W/m
//       positions, so the Chebyshev-plus-integrality mechanism of attack-DP1-
//       mechanism.md sec.6 runs per class and pays sqrt(W/m) instead of sqrt(W).
//
// WHAT IS COMPUTED
//   S0  CUSTODY. Four reproductions before anything new: the spectral mean
//       square against the repository's independent O(N^2) divisor-pair one;
//       the full-period walk's rms against the same; Ssup against lemmaV-
//       parseval.js's own supBoundTable; head + tail mean squares against the
//       total, at every cut.
//   S1  THE SPLIT LEMMA verified: Phi_m from the spectrum against Phi_m as a
//       class average of the walked R, and the Cauchy-Schwarz chain.
//   S2  IS THE TAIL MAXIMAL? sup/rms for head and for tail, against
//       sqrt(2 ln W). This is sec.4.4's measurement run on the OTHER half.
//   S3  WHAT THE SPLIT BUYS: the share of the mean square and of the absolute-
//       value bound Ssup that survives into the tail, and the best cut.
//   S4  THE PRICE AT THE WORKING POINT: what a tail-only maximal inequality
//       would have to deliver, in the ratio lambda = sup/rms.
//   S5  THE INTEGRALITY ROUTE, priced: per-class Chebyshev, its 2k-th moment
//       ladder, the optimal cut, and the exponent it delivers.
//   S6  THE tau(m) SUBSTITUTION, checked rather than inherited: max omega(m)
//       over m <= z^{2s} against pi(z), in window-exponent currency.
//   S7  THE LARGE SIEVE on the tail moduli, against exact Parseval.
//
//   node research/attack-tail-maximal.js            (~90 s)
//   node research/attack-tail-maximal.js --quick    (drop z = 37)
//   node research/attack-tail-maximal.js S5         (one section; S0..S7)
// ============================================================================
'use strict';
const path = require('path');
const T0 = Date.now(); const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';

// CUSTODY: the certificate term list, the exact O(N^2) mean square and the
// Rosser supports are the repository's own, imported rather than recopied; the
// spectral records and the peeled Ssup sweep are attack 1's and the sup
// extension's. Every number below runs back through sift-limit-lemmaV.js to the
// 2026-08-14 pilot.
const REPO = require(path.join(__dirname, 'sift-limit-lemmaV.js'));
const A1   = require(path.join(__dirname, 'lemmaV-parseval.js'));
const EXT  = require(path.join(__dirname, 'lemmaV-sup-extension.js'));

const QUICK = process.argv.includes('--quick');
const BETA2 = 4.26645;                 // paper/beta2-note.md
const S_LEVEL = 3.0;                   // the level attack 1 and the extension measured at
// attack 1's exhaustive thresholds (lemmaV-parseval.js S0b): smallest H with
// min_x T(x) >= 1.
const NP = { 13: 60, 17: 126, 19: 198, 23: 258 };
const ZS_WALK = [13, 17, 19, 23];                       // exhaustive period affordable
const ZS_SPEC = QUICK ? [13, 17, 19, 23, 29, 31] : [13, 17, 19, 23, 29, 31, 37];

function primesBelow(n){const s=new Uint8Array(n),o=[];for(let i=2;i<n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<n;j+=i)s[j]=1;}}return o;}
// Rosser-Iwaniec support, verbatim from sift-limit-lemmaV.js. [d, mu(d)].
function rosserSupport(z,D,upper){
  const ps=primesBelow(z).slice().sort((a,b)=>b-a); const out=[];
  (function rec(start,prod,m){ out.push([prod,(m%2===0)?1:-1]);
    for(let i=start;i<ps.length;i++){ const p=ps[i],m2=m+1;
      if(prod*p>D) continue; const isCond=upper?(m2%2===1):(m2%2===0);
      if(isCond&&prod*p*p*p>D) continue; rec(i+1,prod*p,m2); } })(0,1,0);
  return out; }
function periodOf(z){ let W=1; for(const p of primesBelow(z)) W*=p; return W; }
// the cut lattice: m = prod_{p<=y} p over primes y < z, plus the trivial ends.
function cutsOf(z){ const out=[]; let m=1; for(const p of primesBelow(z)){ m*=p; out.push(m); } return out; }

// ---------------------------------------------------------------------------
// The full-period walk, returning the whole R array so the split can be taken
// in position space. Same sieve as lemmaV-parseval.js walk(); that function
// returns only summary statistics, which is why this one exists.
// ---------------------------------------------------------------------------
const WALKCACHE = new Map();
function walkArray(z,s,H){
  const key=z+'|'+s+'|'+H; if(WALKCACHE.has(key)) return WALKCACHE.get(key);
  const D=Math.round(Math.pow(z,s)); const W=periodOf(z); const Lz=W+H+10;
  const sp=rosserSupport(z,D,true), sm=rosserSupport(z,D,false);
  const Lp=new Int32Array(Lz), Lm=new Int32Array(Lz);
  for(const [d,sg] of sp) for(let n=0;n<Lz;n+=d) Lp[n]+=sg;
  for(const [d,sg] of sm) for(let n=0;n<Lz;n+=d) Lm[n]+=sg;
  const t=REPO.buildTerms(z,D), M=t.M, HM=H*M;
  const cc=(r)=>Lm[r]*Lp[r+2]+Lp[r]*Lm[r+2]-Lp[r]*Lp[r+2];
  let Tw=0; for(let r=1;r<=H;r++) Tw+=cc(r);
  const Ra=new Float64Array(W);
  for(let x=0;x<W;x++){ if(x>0) Tw+=cc(x+H)-cc(x); Ra[x]=Tw-HM; }
  const r={W,M,Ra,H,z,s};
  if(WALKCACHE.size>3) WALKCACHE.clear();
  WALKCACHE.set(key,r); return r;
}
// Per-class power sums at the FINEST cut m0; every coarser cut folds down from
// them, so one pass over the period serves the whole cut lattice.
function classSums(Ra,W,m0,K){
  const P=[]; for(let j=0;j<=K;j++) P.push(new Float64Array(m0));
  for(let x=0;x<W;x++){ const c=x%m0, v=Ra[x]; let t=1;
    for(let j=0;j<=K;j++){ P[j][c]+=t; t*=v; } }
  return P;                                    // P[j][c] = sum_{y=c mod m0} R^j
}
function fold(P,m0,m){                          // m | m0
  const K=P.length-1, Q=[]; for(let j=0;j<=K;j++) Q.push(new Float64Array(m));
  for(let c=0;c<m0;c++){ const d=c%m; for(let j=0;j<=K;j++) Q[j][d]+=P[j][c]; }
  return Q;
}
// From per-class power sums of R, the per-class power sums of T = R - Phi(c).
function tailMoments(Q,m,W){
  const n=W/m, out={Phi:new Float64Array(m),S2:new Float64Array(m),S4:new Float64Array(m),S6:new Float64Array(m)};
  for(let c=0;c<m;c++){
    const s0=Q[0][c], s1=Q[1][c], s2=Q[2][c], s3=Q[3][c], s4=Q[4][c];
    const s5=Q.length>5?Q[5][c]:0, s6=Q.length>6?Q[6][c]:0;
    const u=s1/s0;                                  // Phi(c)
    out.Phi[c]=u;
    out.S2[c]=s2-2*u*s1+u*u*s0;
    out.S4[c]=s4-4*u*s3+6*u*u*s2-4*u*u*u*s1+u*u*u*u*s0;
    if(Q.length>6) out.S6[c]=s6-6*u*s5+15*u*u*s4-20*u**3*s3+15*u**4*s2-6*u**5*s1+u**6*s0;
  }
  return out;
}
function headTail(SD,m){
  return [{recs:SD.recs.filter(r=>m%r.e===0),t:SD.t},{recs:SD.recs.filter(r=>m%r.e!==0),t:SD.t}];
}
// One sweep, split by record. The peeled sweep of lemmaV-sup-extension.js is a
// sum over the records of the spectrum, so running it ONE RECORD AT A TIME costs
// the same as running it once and lets every cut of the lattice be aggregated
// afterwards for free. Without this a ladder over 12 cuts costs 12 full sweeps.
const PRCACHE=new Map();
function perRecord(z,s,HS){
  const key=z+'|'+s+'|'+HS.join(','); if(PRCACHE.has(key)) return PRCACHE.get(key);
  const SD=A1.spectralRecords(z,s), n=SD.recs.length;
  const out=[],ssq=[],Ssat=new Float64Array(n),nPts=new Float64Array(n),es=new Float64Array(n);
  for(let i=0;i<n;i++){
    const r=EXT.sweep({recs:[SD.recs[i]],t:SD.t},HS);
    out.push(Float64Array.from(r.out)); ssq.push(Float64Array.from(r.ssq));
    Ssat[i]=r.Ssat; nPts[i]=r.nPts; es[i]=SD.recs[i].e;
  }
  const r={SD,n,out,ssq,Ssat,nPts,es};
  if(PRCACHE.size>2) PRCACHE.clear();
  PRCACHE.set(key,r); return r;
}
// aggregate over the records whose modulus e divides m (head, sel=true) or does
// not (tail, sel=false).
function agg(PR,m,head,k){
  let o=0,q=0,sat=0,np=0;
  for(let i=0;i<PR.n;i++){ const inHead=(m%PR.es[i]===0); if(inHead!==head) continue;
    o+=PR.out[i][k]; q+=PR.ssq[i][k]; sat+=PR.Ssat[i]; np+=PR.nPts[i]; }
  return {out:o,ssq:q,Ssat:sat,nPts:np};
}
function fmt(v,d,w){ return v.toFixed(d).padStart(w||0); }

// ===========================================================================
// S0  CUSTODY
// ===========================================================================
function S0(){
  console.log('S0 CUSTODY --- four reproductions before anything new is computed\n');
  console.log('  (a) the peeled spectral mean square against the repository INDEPENDENT');
  console.log('      O(N^2) divisor-pair meanSquare() of sift-limit-lemmaV.js:');
  for(const z of [13,17,19]){
    const H=NP[z], t=REPO.buildTerms(z,Math.round(Math.pow(z,S_LEVEL)));
    const exact=REPO.meanSquare(t,H).ms;
    const sw=EXT.sweep(A1.spectralRecords(z,S_LEVEL),[H]);
    console.log(`      z=${z} H=${H}:  spectral=${sw.ssq[0].toFixed(10)}  divisor-pair=${exact.toFixed(10)}  rel=${(Math.abs(sw.ssq[0]-exact)/exact).toExponential(2)}`);
  }
  console.log('\n  (b) the full-period walk of THIS file against the same mean square,');
  console.log('      and against lemmaV-parseval.js walk() for sup|R|:');
  for(const z of ZS_WALK){
    const H=NP[z], {W,Ra}=walkArray(z,S_LEVEL,H);
    let ms=0,sup=0; for(let x=0;x<W;x++){ ms+=Ra[x]*Ra[x]; const a=Math.abs(Ra[x]); if(a>sup) sup=a; } ms/=W;
    const ref=A1.walk(z,S_LEVEL,H);
    console.log(`      z=${z} H=${H} W=${W}:  ms=${ms.toFixed(8)} vs ${ref.ms.toFixed(8)}   sup=${sup.toFixed(6)} vs ${ref.sup.toFixed(6)}   rel(sup)=${(Math.abs(sup-ref.sup)/ref.sup).toExponential(2)}   [${el()}]`);
  }
  console.log('\n  (c) the peeled Ssup sweep against lemmaV-parseval.js supBoundTable():');
  for(const z of [13,17,19,23]){
    const H=NP[z], SD=A1.spectralRecords(z,S_LEVEL);
    const sw=EXT.sweep(SD,[H]), ref=A1.supBoundTable(z,S_LEVEL,[H]);
    console.log(`      z=${z} H=${H}:  Ssup=${sw.out[0].toFixed(8)} vs ${ref.out[0].toFixed(8)}   Ssat=${sw.Ssat.toFixed(6)} vs ${ref.Ssat.toFixed(6)}   rel=${(Math.abs(sw.out[0]-ref.out[0])/ref.out[0]).toExponential(2)}`);
  }
  console.log('\n  (d) ADDITIVITY OF THE SPLIT: head + tail mean squares against the total,');
  console.log('      at every cut m (orthogonality of primitive frequencies). Worst relative');
  console.log('      error over all cuts and all z, and the count of cuts checked:');
  let worst=0, nchk=0;
  for(const z of ZS_WALK){
    const H=NP[z], SD=A1.spectralRecords(z,S_LEVEL), tot=EXT.sweep(SD,[H]).ssq[0];
    for(const m of cutsOf(z)){
      const [hSD,tSD]=headTail(SD,m);
      const a=EXT.sweep(hSD,[H]).ssq[0], b=EXT.sweep(tSD,[H]).ssq[0];
      const r=Math.abs(a+b-tot)/tot; if(r>worst) worst=r; nchk++;
    }
  }
  console.log(`      cuts checked = ${nchk},  worst relative error = ${worst.toExponential(2)}   [${el()}]`);
}

// ===========================================================================
// S1  THE SPLIT LEMMA
// ===========================================================================
function S1(){
  console.log('\nS1 THE SPLIT LEMMA --- the head is the conditional mean, and it needs no sup\n');
  console.log('  Claim (i): Phi_m(x) = (m/W) sum_{y = x mod m} R_H(y), so the head is computable');
  console.log('  in position space from the walk and in frequency space from Theta_e. Two');
  console.log('  disjoint code paths; the check is rms(Phi_m) both ways.');
  console.log('\n  z    m       W/m     rms(Phi) position   rms(Phi) spectral   rel');
  for(const z of ZS_WALK){
    const H=NP[z], {W,Ra}=walkArray(z,S_LEVEL,H), SD=A1.spectralRecords(z,S_LEVEL);
    const m0=cutsOf(z)[primesBelow(z).length-2] || 1;
    const P=classSums(Ra,W,m0,4);
    for(const m of cutsOf(z)){
      if(m>m0) continue;
      const Q=fold(P,m0,m), tm=tailMoments(Q,m,W);
      let msP=0; for(let c=0;c<m;c++) msP+=tm.Phi[c]*tm.Phi[c]; msP/=m;
      const spec=agg(perRecord(z,S_LEVEL,[H]),m,true,0).ssq;
      const rel=spec>0?Math.abs(msP-spec)/spec:msP;
      console.log(`  ${String(z).padStart(2)} ${String(m).padStart(7)} ${String(W/m).padStart(8)}    ${Math.sqrt(msP).toFixed(10)}      ${Math.sqrt(spec).toFixed(10)}    ${rel.toExponential(2)}`);
    }
  }
  console.log('\n  Claim (ii): the head carries n_head = #{(e,a) : e|m, e>1, (a,e)=1} <= m-1');
  console.log('  frequencies, so sup_x|Phi_m| <= SsupH := sum |Theta_e(a) S_H(a/e)| <=');
  console.log('  sqrt(n_head) * rms(Phi_m) BY CAUCHY-SCHWARZ, with no sup over x taken.');
  console.log('  Verified as a chain of three inequalities at H = nP:');
  console.log('\n  z    m       n_head   sup|Phi|    SsupH      sqrt(n)*rms   chain ok');
  for(const z of ZS_WALK){
    const H=NP[z], {W,Ra}=walkArray(z,S_LEVEL,H), SD=A1.spectralRecords(z,S_LEVEL);
    const m0=cutsOf(z)[primesBelow(z).length-2] || 1;
    const P=classSums(Ra,W,m0,4);
    for(const m of cutsOf(z)){
      if(m>m0||m<6) continue;
      const Q=fold(P,m0,m), tm=tailMoments(Q,m,W);
      let msP=0,supP=0; for(let c=0;c<m;c++){ msP+=tm.Phi[c]*tm.Phi[c]; const a=Math.abs(tm.Phi[c]); if(a>supP)supP=a; } msP/=m;
      const hw=agg(perRecord(z,S_LEVEL,[H]),m,true,0);
      const cs=Math.sqrt(hw.nPts)*Math.sqrt(msP);
      const ok=(supP<=hw.out+1e-9)&&(hw.out<=cs+1e-9);
      console.log(`  ${String(z).padStart(2)} ${String(m).padStart(7)} ${String(hw.nPts).padStart(8)} ${fmt(supP,6,10)} ${fmt(hw.out,6,10)} ${fmt(cs,6,13)}      ${ok?'yes':'NO'}`);
    }
  }
}

// ===========================================================================
// S2  IS THE TAIL MAXIMAL?  sec.4.4's measurement, run on the other half
// ===========================================================================
function S2(){
  console.log('\nS2 IS THE TAIL A MAXIMAL PROBLEM? --- sup/rms for head and tail\n');
  console.log('  attack-AB-bounded.md sec.4.4 measured sup|Phi|/rms(Phi) flat at 2.93..3.45 and');
  console.log('  concluded the wall is entirely in the tail. Nobody measured the tail. Here both');
  console.log('  halves are measured against the Gaussian extreme-value scale sqrt(2 ln W).');
  console.log('  Convention: the sieve uses the primes p < z, so W = prod_{p<z} p.\n');
  for(const H_of of [['H = nP (the operative window)',z=>NP[z]],['H = z^beta_2 (the target window)',z=>Math.round(Math.pow(z,BETA2))]]){
    console.log(`  ${H_of[0]}`);
    console.log('  z    m       H        sup|Phi|  rms(Phi) lam_head |  sup|T|   rms(T)   lam_tail | sqrt(2lnW) lam_tail/sqrt(2lnW)');
    for(const z of ZS_WALK){
      const H=H_of[1](z), {W,Ra}=walkArray(z,S_LEVEL,H);
      const L=Math.sqrt(2*Math.log(W));
      for(const m of cutsOf(z)){
        if(m===W) continue;
        const acc=new Float64Array(m), n=W/m;
        for(let x=0;x<W;x++) acc[x%m]+=Ra[x];
        let supP=0,msP=0; for(let c=0;c<m;c++){ acc[c]/=n; const a=Math.abs(acc[c]); if(a>supP)supP=a; msP+=acc[c]*acc[c]; } msP/=m;
        let supT=0,msT=0; for(let x=0;x<W;x++){ const v=Ra[x]-acc[x%m]; msT+=v*v; const a=Math.abs(v); if(a>supT)supT=a; } msT/=W;
        const lh=msP>0?supP/Math.sqrt(msP):0, lt=supT/Math.sqrt(msT);
        console.log(`  ${String(z).padStart(2)} ${String(m).padStart(7)} ${String(H).padStart(8)} ${fmt(supP,4,9)} ${fmt(Math.sqrt(msP),4,9)} ${fmt(lh,4,8)} | ${fmt(supT,4,8)} ${fmt(Math.sqrt(msT),4,8)} ${fmt(lt,4,9)} | ${fmt(L,4,9)}  ${fmt(lt/L,4,10)}   [${el()}]`);
      }
    }
    console.log('');
  }
}

// ===========================================================================
// S3  WHAT THE SPLIT BUYS
// ===========================================================================
function S3(){
  console.log('\nS3 WHAT THE SPLIT BUYS --- the share of the problem that survives into the tail\n');
  console.log('  At H = z^beta_2. "var share" is the fraction of <R^2>_H carried by the tail;');
  console.log('  "Ssup share" the fraction of the absolute-value bound Ssup(H) carried by it.');
  console.log('  The last column is the best a PERFECT treatment of the head could buy:');
  console.log('  Ssup(H) / (SsupH + SsupT) is 1 by additivity, so the gain has to come from');
  console.log('  replacing SsupT, and the column shows Ssup(H)/SsupT, the ceiling on that gain.\n');
  console.log('  z    m         H          <R^2>_H     var share  Ssup(H)     SsupT       Ssup/SsupT');
  for(const z of ZS_SPEC){
    const H=Math.round(Math.pow(z,BETA2)), W=periodOf(z), PR=perRecord(z,S_LEVEL,[H]);
    let tq=0,to=0; for(let i=0;i<PR.n;i++){ tq+=PR.ssq[i][0]; to+=PR.out[i][0]; }
    for(const m of cutsOf(z)){
      if(m===W) continue;
      const tw=agg(PR,m,false,0);
      console.log(`  ${String(z).padStart(2)} ${String(m).padStart(9)} ${String(H).padStart(10)} ${fmt(tq,6,12)} ${fmt(tw.ssq/tq,5,10)} ${fmt(to,4,11)} ${fmt(tw.out,4,11)} ${fmt(to/tw.out,4,12)}   [${el()}]`);
    }
    console.log('');
  }
}

// ===========================================================================
// S4  THE PRICE AT THE WORKING POINT
// ===========================================================================
function S4(){
  console.log('\nS4 THE PRICE OF A TAIL-ONLY MAXIMAL INEQUALITY\n');
  console.log('  The certificate needs H*M > sup|R|. With the split that is');
  console.log('      H*M > SsupH(m,H) + sup_x|T_m(x)|,   SsupH needing no sup over x.');
  console.log('  So a tail-only maximal inequality has to deliver');
  console.log('      lambda_req := (H*M - SsupH) / rms(T_m)     against sup|T| <= lambda*rms(T).');
  console.log('  Compared with the Gaussian value sqrt(2 ln W) and with the trivial');
  console.log('  Cauchy-Schwarz value sqrt(W - m). At H = z^beta_2.\n');
  console.log('  z    m         H*M          SsupH      rms(T)     lam_req     sqrt(2lnW)  sqrt(W-m)     lam_req/sqrt(2lnW)');
  for(const z of ZS_SPEC){
    const H=Math.round(Math.pow(z,BETA2)), W=periodOf(z), PR=perRecord(z,S_LEVEL,[H]), M=PR.SD.M;
    for(const m of cutsOf(z)){
      if(m===W) continue;
      const hw=agg(PR,m,true,0), tw=agg(PR,m,false,0);
      const rmsT=Math.sqrt(tw.ssq), lam=(H*M-hw.out)/rmsT, L=Math.sqrt(2*Math.log(W));
      console.log(`  ${String(z).padStart(2)} ${String(m).padStart(9)} ${fmt(H*M,3,12)} ${fmt(hw.out,4,10)} ${fmt(rmsT,4,10)} ${lam.toExponential(4).padStart(12)} ${fmt(L,4,11)} ${Math.sqrt(W-m).toExponential(3).padStart(11)} ${(lam/L).toExponential(4).padStart(14)}`);
    }
    console.log('');
  }
  console.log('  Growth: lambda_req ~ M z^{beta_2/2} / sqrt(B) is a POWER of z, while');
  console.log('  sqrt(2 ln W) ~ sqrt(2 theta(z)) is a square root of z. Fitted slopes of');
  console.log('  ln(lambda_req) and ln(sqrt(2 ln W)) against ln z at the widest cut of each z:');
  const X=[],Y1=[],Y2=[];
  for(const z of ZS_SPEC){
    const H=Math.round(Math.pow(z,BETA2)), W=periodOf(z), PR=perRecord(z,S_LEVEL,[H]), M=PR.SD.M;
    const cs=cutsOf(z), m=cs[cs.length-2];
    const hw=agg(PR,m,true,0), tw=agg(PR,m,false,0);
    X.push(Math.log(z)); Y1.push(Math.log((H*M-hw.out)/Math.sqrt(tw.ssq))); Y2.push(Math.log(Math.sqrt(2*Math.log(W))));
  }
  const slope=(X,Y)=>{const n=X.length;let sx=0,sy=0,sxx=0,sxy=0;for(let i=0;i<n;i++){sx+=X[i];sy+=Y[i];sxx+=X[i]*X[i];sxy+=X[i]*Y[i];}return (n*sxy-sx*sy)/(n*sxx-sx*sx);};
  console.log(`      d ln(lambda_req)/d ln z = ${slope(X,Y1).toFixed(4)}      d ln(sqrt(2 ln W))/d ln z = ${slope(X,Y2).toFixed(4)}`);
  console.log('\n  And what the CURRENT bound delivers in the same units: taking absolute values');
  console.log('  in the tail achieves lambda_abs := SsupT / rms(T_m). The tail-only maximal');
  console.log('  inequality has to beat lambda_abs by the factor in the last column, which is');
  console.log('  above 1 while the route is alive and below 1 once it is dead.');
  console.log('  z    m (widest)     lam_abs     lam_req      lam_req/lam_abs   sqrt(2lnW)');
  const X2=[],Y3=[];
  for(const z of ZS_SPEC){
    const H=Math.round(Math.pow(z,BETA2)), W=periodOf(z), PR=perRecord(z,S_LEVEL,[H]), M=PR.SD.M;
    const cs=cutsOf(z), m=cs[cs.length-2];
    const hw=agg(PR,m,true,0), tw=agg(PR,m,false,0);
    const rmsT=Math.sqrt(tw.ssq), la=tw.out/rmsT, lr=(H*M-hw.out)/rmsT;
    X2.push(Math.log(z)); Y3.push(Math.log(la));
    console.log(`  ${String(z).padStart(2)} ${String(m).padStart(12)} ${la.toExponential(4).padStart(12)} ${lr.toExponential(4).padStart(12)} ${(lr/la).toExponential(4).padStart(17)} ${fmt(Math.sqrt(2*Math.log(W)),4,12)}`);
  }
  const sA=slope(X2,Y3), sR=slope(X,Y1);
  const iA=(()=>{let sx=0,sy=0;for(let i=0;i<X2.length;i++){sx+=X2[i];sy+=Y3[i];}return sy/X2.length-sA*sx/X2.length;})();
  const iR=(()=>{let sx=0,sy=0;for(let i=0;i<X.length;i++){sx+=X[i];sy+=Y1[i];}return sy/X.length-sR*sx/X.length;})();
  console.log(`      d ln(lambda_abs)/d ln z = ${sA.toFixed(4)}  against d ln(lambda_req)/d ln z = ${sR.toFixed(4)}`);
  console.log(`      two-parameter extrapolation of lambda_req = lambda_abs: ln z = ${((iA-iR)/(sR-sA)).toFixed(4)}, z = ${Math.exp((iA-iR)/(sR-sA)).toExponential(3)}`);
  console.log('      (Seven points and two straight lines. The corpus\'s own four rising models for');
  console.log('      u_sup crossed beta_2 at z = 73, 147, 267 and 1544 and were statistically');
  console.log('      indistinguishable, so a single crossing figure here is an order of magnitude');
  console.log('      at best and is quoted only to say that the crossing is finite.)   ['+el()+']');
}

// ===========================================================================
// S5  THE INTEGRALITY ROUTE, PRICED
// ===========================================================================
function S5(){
  console.log('\nS5 SECOND MOMENT + CHEBYSHEV + INTEGRALITY, RUN PER CLASS\n');
  console.log('  attack-DP1-mechanism.md sec.6 (PROVEN): over a finite period the count of bad');
  console.log('  positions is a non-negative integer, so a failure count below 1 forces it to');
  console.log('  zero. The split sharpens the mechanism: T_m has mean zero on EVERY class mod m,');
  console.log('  and a class holds only W/m positions, so the test runs per class and pays');
  console.log('      Need_k(c) := ( sum_{y = c mod m} T(y)^{2k} )^{1/2k}   <   H*M + Phi_m(c)');
  console.log('  instead of the global sqrt(W)*rms. k = 1 is Chebyshev. The m = W row is the');
  console.log('  exhaustive walk and is an identity, not a bound.\n');
  console.log('  (a) At H = nP, the exhaustive threshold, with Phi_m used EXACTLY (so this is');
  console.log('      the ceiling of the route, not a proof at large m). k* is the smallest');
  console.log('      moment order in 1..3 that closes.');
  console.log('  z    m        W/m       H*M     max_c(Need_1-Phi)  k=2       k=3      k*   Ssup(H)  sup|R|');
  for(const z of ZS_WALK){
    const H=NP[z], {W,Ra,M}=walkArray(z,S_LEVEL,H);
    const m0=cutsOf(z)[primesBelow(z).length-1];
    const P=classSums(Ra,W,m0,6);
    const sup=(()=>{let s=0;for(let x=0;x<W;x++){const a=Math.abs(Ra[x]);if(a>s)s=a;}return s;})();
    const Ssup=EXT.sweep(A1.spectralRecords(z,S_LEVEL),[H]).out[0];
    for(const m of cutsOf(z)){
      const Q=fold(P,m0,m), tm=tailMoments(Q,m,W);
      let n1=0,n2=0,n3=0;
      for(let c=0;c<m;c++){
        const a=Math.sqrt(tm.S2[c])-tm.Phi[c]; if(a>n1)n1=a;
        const b=Math.pow(Math.max(tm.S4[c],0),0.25)-tm.Phi[c]; if(b>n2)n2=b;
        const d=Math.pow(Math.max(tm.S6[c],0),1/6)-tm.Phi[c]; if(d>n3)n3=d;
      }
      const HM=H*M, ks=(HM>n1)?'1':(HM>n2)?'2':(HM>n3)?'3':'>3';
      console.log(`  ${String(z).padStart(2)} ${String(m).padStart(8)} ${String(W/m).padStart(9)} ${fmt(HM,4,9)} ${fmt(n1,4,16)} ${fmt(n2,4,9)} ${fmt(n3,4,9)} ${ks.padStart(4)} ${fmt(Ssup,3,9)} ${fmt(sup,3,7)}`);
    }
    console.log('');
  }
  console.log('  (b) The PROVEN chain, with no exhaustive input anywhere: Phi_m bounded by the');
  console.log('  head absolute-value sum SsupH (S1 claim (ii)) and the tail by per-class');
  console.log('  Chebyshev. Bd(m) := SsupH(m,H) + max_c sqrt(sum_{y=c mod m} T(y)^2). Against');
  console.log('  the pure absolute-value bound Ssup(H) of lemmaV-parseval.js S5. At H = nP.');
  console.log('  z    m         SsupH      max_c sqrt(sum T^2)   Bd(m)      Ssup(H)   Bd/Ssup   sup|R|');
  for(const z of ZS_WALK){
    const H=NP[z], {W,Ra}=walkArray(z,S_LEVEL,H);
    const m0=cutsOf(z)[primesBelow(z).length-1];
    const P=classSums(Ra,W,m0,4), PR=perRecord(z,S_LEVEL,[H]);
    const sup=(()=>{let s=0;for(let x=0;x<W;x++){const a=Math.abs(Ra[x]);if(a>s)s=a;}return s;})();
    let Ssup=0; for(let i=0;i<PR.n;i++) Ssup+=PR.out[i][0];
    let best=Infinity,bm=0;
    for(const m of cutsOf(z)){
      const Q=fold(P,m0,m), tm=tailMoments(Q,m,W);
      let n=0; for(let c=0;c<m;c++){ const v=Math.sqrt(tm.S2[c]); if(v>n)n=v; }
      const SsupH=agg(PR,m,true,0).out, Bd=SsupH+n;
      if(Bd<best){best=Bd;bm=m;}
      console.log(`  ${String(z).padStart(2)} ${String(m).padStart(9)} ${fmt(SsupH,4,10)} ${fmt(n,4,21)} ${fmt(Bd,4,10)} ${fmt(Ssup,3,9)} ${fmt(Bd/Ssup,4,9)} ${fmt(sup,3,8)}`);
    }
    console.log(`     best cut m = ${bm}, Bd = ${best.toFixed(4)}, Bd/Ssup = ${(best/Ssup).toFixed(4)}   [${el()}]`);
    console.log('');
  }
  console.log('  (c) The exponent the proven chain delivers. u_int = ln H*/ln z for the smallest H');
  console.log('  on a 1.06-geometric grid at which min_m Bd(m) < H*M, beside u_sup');
  console.log('  (research/lemmaV-sup-extension.js) and u_true = ln(nP)/ln z. The balance');
  console.log('  sqrt(m) against sqrt(W/m) predicts the optimum at m near sqrt(W).');
  console.log('  z    u_true   u_sup    u_int    best m at H*   sqrt(W)      theta(z)/(2 ln z)   u_int - theta/(2 ln z)');
  const USUP={13:2.0617,17:2.3036,19:2.5518,23:2.6666};
  for(const z of ZS_WALK){
    const W=periodOf(z), lz=Math.log(z), th=Math.log(W);
    let bestH=null,bestM=null;
    const grid=[]; for(let H=NP[z];H<=3000000;H=Math.max(H+1,Math.round(H*1.06))) grid.push(H);
    for(const H of grid){
      const {Ra,M}=walkArray(z,S_LEVEL,H);
      const m0=cutsOf(z)[primesBelow(z).length-1];
      const P=classSums(Ra,W,m0,4), PR=perRecord(z,S_LEVEL,[H]);
      let best=Infinity,bm=0;
      for(const m of cutsOf(z)){
        if(m===W) continue;                       // the m = W row is the exhaustive identity
        const Q=fold(P,m0,m), tm=tailMoments(Q,m,W);
        let n=0; for(let c=0;c<m;c++){ const v=Math.sqrt(tm.S2[c]); if(v>n)n=v; }
        const Bd=agg(PR,m,true,0).out+n; if(Bd<best){best=Bd;bm=m;}
      }
      if(H*M>best){ bestH=H; bestM=bm; break; }
    }
    console.log(`  ${String(z).padStart(2)} ${fmt(Math.log(NP[z])/lz,4,8)} ${fmt(USUP[z],4,8)} ${bestH?fmt(Math.log(bestH)/lz,4,8):'    none'} ${String(bestM).padStart(14)} ${Math.sqrt(W).toFixed(0).padStart(12)} ${fmt(th/(2*lz),4,19)} ${bestH?fmt(Math.log(bestH)/lz-th/(2*lz),4,23):''}   [${el()}]`);
  }
}

// ===========================================================================
// S6  THE tau(m) SUBSTITUTION, CHECKED
// ===========================================================================
function S6(){
  console.log('\nS6 THE tau(m) SUBSTITUTION --- checked here, not inherited\n');
  console.log('  attack-theta-last-gap.md sec.6 (C1): all the x-dependence sits in one factor');
  console.log('  e(-hx/m), so the quantifier is separable and its price is tau(m), not C^{pi(z)}.');
  console.log('  The two prices are combinatorial factors and can be compared exactly.');
  console.log('    C^{pi(z)}: the e-basis absolute-value step runs over the divisors of P(z),');
  console.log('               2^{pi(z)} of them, and the extension measures the per-prime factor.');
  console.log('    tau(m):    in the (h,m) basis m = [d1,d2] <= D^2 = z^{2s} is an INTEGER, so');
  console.log('               omega(m) <= Omega(z,s) := max{k : p_1...p_k <= z^{2s}}, and');
  console.log('               max tau(m) = 2^{Omega}. Omega is governed by ln m, not by z.\n');
  console.log('  (a) the measured per-prime factor of the e-basis price Ssat:');
  let prev=null;
  for(const z of ZS_SPEC){
    const SD=A1.spectralRecords(z,S_LEVEL), sw=EXT.sweep(SD,[]);
    console.log(`      z=${String(z).padStart(2)}  Ssat=${sw.Ssat.toExponential(5)}  ratio to previous level = ${prev?(sw.Ssat/prev).toFixed(4):'  --  '}   [${el()}]`);
    prev=sw.Ssat;
  }
  console.log('\n  (b) Omega(z,s) against pi(z), and the two prices in window-exponent currency');
  console.log('      u_price = ln(price)/ln z. C is the measured per-prime factor from (a).');
  const C=2.05;
  console.log('  UNITS. pi(z) here is the SIEVE prime count, #{p < z}, matching rosserSupport();');
  console.log('  it is one less than #{p <= z} at every prime z and the two must not be mixed.');
  console.log('  z          pi(z)   Omega   2^Omega        C^{pi(z)}        u_tau      u_C');
  for(const z of [13,23,43,101,1009,10007,100003,1000003,1e8,1e10,1e12]){
    const lz=Math.log(z), lim=2*S_LEVEL*lz;
    let k=0,acc=0; const ps=primesBelow(Math.max(1000,Math.ceil(lim*Math.log(lim)*2)));
    for(const p of ps){ if(acc+Math.log(p)>lim) break; acc+=Math.log(p); k++; }
    const piz=z<=1e7?primesBelow(Math.ceil(z)).length:Math.round(z/Math.log(z)*(1+1/Math.log(z)));
    const uT=k*Math.log(2)/lz, uC=piz*Math.log(C)/lz;
    console.log(`  ${String(z).padStart(9)} ${String(piz).padStart(7)} ${String(k).padStart(7)}   ${Math.pow(2,k).toExponential(3).padStart(10)}   ${(piz*Math.log(C)).toExponential(3).padStart(14)}   ${fmt(uT,4,8)}  ${uC.toExponential(3).padStart(10)}`);
  }
  console.log('\n  (b2) THE OBJECTION THIS TABLE HAS TO SURVIVE, and why it does. If m were');
  console.log('  allowed to be P(z) itself then tau(m) = 2^{pi(z)} and the substitution would be');
  console.log('  the SAME number, not a cheaper one. But m = [d1,d2] with d1,d2 <= D = z^s, so');
  console.log('  m <= D^2 and P(z) is admissible only while theta(z) <= 2 s ln z. It is not,');
  console.log('  beyond the smallest levels, and the gap grows without bound:');
  console.log('  z          theta(z)=ln P(z)   ln(D^2)=2s ln z   P(z)/D^2        omega cap: Omega vs pi(z)');
  for(const z of [13,23,43,101,1009,10007,100003]){
    const lz=Math.log(z), lim=2*S_LEVEL*lz, ps=primesBelow(Math.ceil(z));
    let th=0; for(const p of ps) th+=Math.log(p);
    let k=0,acc=0; for(const p of primesBelow(1000)){ if(acc+Math.log(p)>lim) break; acc+=Math.log(p); k++; }
    console.log(`  ${String(z).padStart(9)} ${fmt(th,4,18)} ${fmt(lim,4,17)} ${Math.exp(th-lim).toExponential(3).padStart(15)}      ${String(k).padStart(4)} vs ${String(ps.length).padStart(6)}`);
  }
  console.log('\n  (c) the crossover: the smallest z at which 2^Omega < C^{pi(z)}.');
  for(const C2 of [2.05,2.00,1.50]){
    let found=null;
    for(let z=5;z<=100000;z++){
      const lz=Math.log(z), lim=2*S_LEVEL*lz;
      let k=0,acc=0; for(const p of primesBelow(200)){ if(acc+Math.log(p)>lim) break; acc+=Math.log(p); k++; }
      const piz=primesBelow(z).length;
      if(k*Math.log(2)<piz*Math.log(C2)){ found=z; break; }
    }
    console.log(`      C = ${C2.toFixed(2)}:  first z with 2^Omega < C^{pi(z)} is z = ${found}`);
  }
  console.log('\n  (d) the cost the tau basis carries that the e basis does not: the number of');
  console.log('      moduli. e | P(z) gives 2^{pi(z)} moduli; m <= D^2 gives about z^{2s}.');
  console.log('  z        2^{pi(z)}        z^{2s}           ln(count)/ln z for each');
  for(const z of [13,23,43,101,1009,10007]){
    const piz=primesBelow(z).length, lz=Math.log(z);
    console.log(`  ${String(z).padStart(7)}  ${Math.pow(2,piz).toExponential(3).padStart(11)}   ${Math.pow(z,2*S_LEVEL).toExponential(3).padStart(11)}     ${fmt(piz*Math.log(2)/lz,4,8)}   ${fmt(2*S_LEVEL,4,8)}`);
  }
}

// ===========================================================================
// S7  THE LARGE SIEVE ON THE TAIL
// ===========================================================================
function S7(){
  console.log('\nS7 THE LARGE SIEVE ON THE TAIL MODULI\n');
  console.log('  The tail frequencies are a/e with e | W; every one is a multiple of 1/W, so the');
  console.log('  spacing is delta = 1/W and the large sieve gives sum_{e,a} |S_H(a/e)|^2 <=');
  console.log('  (H + W) * H. The exact value over the whole spectrum is H(W - H) by Parseval.');
  console.log('  If the large sieve is already within a whisker of the exact identity it can');
  console.log('  contribute nothing the mean square does not already give.\n');
  console.log('  (The identity needs H <= W, so this runs at H = nP, not at H = z^beta_2.)');
  console.log('  z    W            H         large sieve (H+W)H    exact H(W-H)       ratio');
  for(const z of ZS_WALK){
    const W=periodOf(z), H=NP[z];
    const ls=(H+W)*H, ex=H*(W-H);
    console.log(`  ${String(z).padStart(2)} ${String(W).padStart(12)} ${String(H).padStart(9)} ${ls.toExponential(6).padStart(21)} ${ex.toExponential(6).padStart(18)} ${fmt(ls/ex,6,11)}`);
  }
  console.log('\n  And the exact mean square is not just the same order, it is the identity the');
  console.log('  large sieve approximates: sum over the FULL spectrum of |S_H(a/e)|^2, computed');
  console.log('  by the peeled sweep with Theta replaced by 1, against H(W-H):');
  for(const z of [13,17,19]){
    const W=periodOf(z), H=NP[z];
    let s=0; for(let j=1;j<W;j++){ const t=Math.PI*j/W; s+=Math.pow(Math.sin(H*t)/Math.sin(t),2); }
    console.log(`      z=${z} H=${H}: sum_{j=1}^{W-1}|S_H(j/W)|^2 = ${s.toFixed(4)}   H(W-H) = ${(H*(W-H)).toFixed(4)}   rel = ${(Math.abs(s-H*(W-H))/(H*(W-H))).toExponential(2)}   [${el()}]`);
  }
  console.log('\n  (b) DIVISOR SWITCHING on the tail. The switch d1 <-> d2 acts on the split');
  console.log('  (e1,e2) = (gcd(e,d1), e/gcd(e,d1)) by exchanging the two factors, and it can only');
  console.log('  buy something if the certificate is ASYMMETRIC in that exchange. Measured:');
  console.log('  the largest and the mean relative asymmetry |V(e1,e2)-V(e2,e1)| / (|V(e1,e2)|');
  console.log('  + |V(e2,e1)|) over every e | P(z) and every ordered factorisation, tail records');
  console.log('  only (e not dividing the widest cut).');
  console.log('  The last column is the CEILING on any such rearrangement: what sum_e e*Vabs(e)^2');
  console.log('  becomes if the two orderings are added coherently BEFORE the absolute value,');
  console.log('  |V(e1,e2)| + |V(e2,e1)| -> |V(e1,e2) + V(e2,e1)|, which is the most a switch can');
  console.log('  ever give. Below 1 means there is something to win; 1 means the switch is void.');
  console.log('  z    pairs    max asym   mean asym   best-case Vabs ratio   best-case B ratio');
  for(const z of ZS_WALK.concat(QUICK?[]:[29])){
    const SD=A1.spectralRecords(z,S_LEVEL), cs=cutsOf(z), m=cs[cs.length-2];
    let mx=0,sum=0,n=0,va=0,vs=0,B=0,Bs=0;
    for(const rec of SD.recs){
      if(m%rec.e===0) continue;
      const map=new Map(); for(const f of rec.fac) map.set(rec.e/f[0],f[2]);   // e1 -> V(e1,e2)
      let a=0,b=0;
      for(const [e1,v] of map){
        const e2=rec.e/e1, w=map.get(e2)||0;
        const d=Math.abs(v-w), t=Math.abs(v)+Math.abs(w);
        a+=Math.abs(v);
        b+=(e1===e2)?Math.abs(v):Math.abs(v+w)/2;   // each unordered pair met twice
        if(t>0){ const r=d/t; if(r>mx)mx=r; sum+=r; n++; }
      }
      va+=a; vs+=b; B+=rec.e*a*a; Bs+=rec.e*b*b;
    }
    console.log(`  ${String(z).padStart(2)} ${String(n).padStart(8)} ${fmt(mx,6,10)} ${fmt(sum/n,6,11)} ${fmt(vs/va,6,22)} ${fmt(Bs/B,6,19)}   [${el()}]`);
  }
}

function main(){
  const only=process.argv.slice(2).filter(a=>/^S[0-7]$/.test(a));
  const run={S0,S1,S2,S3,S4,S5,S6,S7};
  for(const k of ['S0','S1','S2','S3','S4','S5','S6','S7']) if(!only.length||only.includes(k)) run[k]();
  console.log('\nDONE '+el());
}
if(require.main===module) main();
module.exports={walkArray,classSums,fold,tailMoments,headTail,cutsOf,periodOf};

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-tail-maximal.js
//   invocation:  node research/attack-tail-maximal.js
//   code-sha256: 7f558b17bac3bfbe5412ea191c0615e51f6c574f2b4e8c814c43faa465fc549b
//   out-sha256:  20af247d8adbdfd6d2b065ef754476893edf214f65f74b82f1b288f14b24d925
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     236.5 s
// ============================================================================
// S0 CUSTODY --- four reproductions before anything new is computed
//
//   (a) the peeled spectral mean square against the repository INDEPENDENT
//       O(N^2) divisor-pair meanSquare() of sift-limit-lemmaV.js:
//       z=13 H=60:  spectral=1.4276943836  divisor-pair=1.4276943835  rel=6.22e-11
//       z=17 H=126:  spectral=2.2157558993  divisor-pair=2.2157558991  rel=8.04e-11
//       z=19 H=198:  spectral=2.0961074189  divisor-pair=2.0961074187  rel=1.19e-10
//
//   (b) the full-period walk of THIS file against the same mean square,
//       and against lemmaV-parseval.js walk() for sup|R|:
//       z=13 H=60 W=2310:  ms=1.42769438 vs 1.42769438   sup=2.649351 vs 2.649351   rel(sup)=0.00e+0   [0.8s]
//       z=17 H=126 W=30030:  ms=2.21575590 vs 2.21575590   sup=4.920280 vs 4.920280   rel(sup)=0.00e+0   [0.9s]
//       z=19 H=198 W=510510:  ms=2.09610742 vs 2.09610742   sup=6.840336 vs 6.840336   rel(sup)=0.00e+0   [1.0s]
//       z=23 H=258 W=9699690:  ms=3.01536144 vs 3.01536144   sup=7.815663 vs 7.815663   rel(sup)=0.00e+0   [1.5s]
//
//   (c) the peeled Ssup sweep against lemmaV-parseval.js supBoundTable():
//       z=13 H=60:  Ssup=11.44665851 vs 11.44665851   Ssat=19.601781 vs 19.601781   rel=4.81e-11
//       z=17 H=126:  Ssup=28.41175980 vs 28.41175980   Ssat=50.313621 vs 50.313621   rel=4.29e-11
//       z=19 H=198:  Ssup=60.03820971 vs 60.03820971   Ssat=120.061571 vs 120.061571   rel=4.92e-11
//       z=23 H=258:  Ssup=118.32799334 vs 118.32799334   Ssat=242.499303 vs 242.499303   rel=4.80e-11
//
//   (d) ADDITIVITY OF THE SPLIT: head + tail mean squares against the total,
//       at every cut m (orthogonality of primitive frequencies). Worst relative
//       error over all cuts and all z, and the count of cuts checked:
//       cuts checked = 26,  worst relative error = 9.00e-14   [5.7s]
//
// S1 THE SPLIT LEMMA --- the head is the conditional mean, and it needs no sup
//
//   Claim (i): Phi_m(x) = (m/W) sum_{y = x mod m} R_H(y), so the head is computable
//   in position space from the walk and in frequency space from Theta_e. Two
//   disjoint code paths; the check is rms(Phi_m) both ways.
//
//   z    m       W/m     rms(Phi) position   rms(Phi) spectral   rel
//   13       2     1155    0.0000000000      0.0000000000    5.75e-28
//   13       6      385    0.0000000000      0.0000000000    5.91e-28
//   13      30       77    0.0000000000      0.0000000000    5.95e-28
//   13     210       11    1.0324471124      1.0324471124    1.66e-11
//   17       2    15015    0.0000000000      0.0000000000    8.97e-27
//   17       6     5005    0.0000000000      0.0000000000    9.00e-27
//   17      30     1001    0.2306044593      0.2306044593    3.87e-11
//   17     210      143    1.0198492054      1.0198492054    4.82e-11
//   17    2310       13    1.3290290280      1.3290290281    7.92e-11
//   19       2   255255    0.0000000000      0.0000000000    1.87e-27
//   19       6    85085    0.0000000000      0.0000000000    2.43e-27
//   19      30    17017    0.1504603590      0.1504603590    1.57e-11
//   19     210     2431    0.2997017208      0.2997017208    4.32e-11
//   19    2310      221    0.9261683778      0.9261683779    1.62e-10
//   19   30030       17    1.1368020143      1.1368020144    1.40e-10
//   23       2  4849845    0.0000000000      0.0000000000    8.07e-26
//   23       6  1616615    0.0000000000      0.0000000000    8.28e-26
//   23      30   323323    0.1305894961      0.1305894961    1.54e-11
//   23     210    46189    0.5624470589      0.5624470589    8.62e-12
//   23    2310     4199    0.8986943614      0.8986943614    6.13e-11
//   23   30030      323    1.1648325987      1.1648325987    6.12e-11
//   23  510510       19    1.5027973311      1.5027973311    5.76e-11
//
//   Claim (ii): the head carries n_head = #{(e,a) : e|m, e>1, (a,e)=1} <= m-1
//   frequencies, so sup_x|Phi_m| <= SsupH := sum |Theta_e(a) S_H(a/e)| <=
//   sqrt(n_head) * rms(Phi_m) BY CAUCHY-SCHWARZ, with no sup over x taken.
//   Verified as a chain of three inequalities at H = nP:
//
//   z    m       n_head   sup|Phi|    SsupH      sqrt(n)*rms   chain ok
//   13       6        5   0.000000   0.000000      0.000000      yes
//   13      30       29   0.000000   0.000000      0.000000      yes
//   13     210      209   2.077922   4.219198     14.925915      yes
//   17       6        5   0.000000   0.000000      0.000000      yes
//   17      30       29   0.281918   0.827887      1.241843      yes
//   17     210      209   1.541259   3.390332     14.743789      yes
//   17    2310     2309   3.843357  11.874971     63.862576      yes
//   19       6        5   0.000000   0.000000      0.000000      yes
//   19      30       29   0.298525   0.589912      0.810254      yes
//   19     210      209   0.685667   2.192874      4.332738      yes
//   19    2310     2309   2.962508   9.733085     44.504294      yes
//   19   30030    30029   4.075630  26.082593    196.995030      yes
//   23       6        5   0.000000   0.000000      0.000000      yes
//   23      30       29   0.259516   0.509688      0.703246      yes
//   23     210      209   0.944633   2.455713      8.131203      yes
//   23    2310     2309   2.155282   8.864334     43.184111      yes
//   23   30030    30029   3.503222  25.364980    201.852416      yes
//   23  510510   510509   6.026189  57.701967   1073.747379      yes
//
// S2 IS THE TAIL A MAXIMAL PROBLEM? --- sup/rms for head and tail
//
//   attack-AB-bounded.md sec.4.4 measured sup|Phi|/rms(Phi) flat at 2.93..3.45 and
//   concluded the wall is entirely in the tail. Nobody measured the tail. Here both
//   halves are measured against the Gaussian extreme-value scale sqrt(2 ln W).
//   Convention: the sieve uses the primes p < z, so W = prod_{p<z} p.
//
//   H = nP (the operative window)
//   z    m       H        sup|Phi|  rms(Phi) lam_head |  sup|T|   rms(T)   lam_tail | sqrt(2lnW) lam_tail/sqrt(2lnW)
//   13       2       60    0.0000    0.0000   1.0007 |   2.6494   1.1949    2.2173 |    3.9357      0.5634   [6.3s]
//   13       6       60    0.0000    0.0000   1.0009 |   2.6494   1.1949    2.2173 |    3.9357      0.5634   [6.3s]
//   13      30       60    0.0000    0.0000   1.0000 |   2.6494   1.1949    2.2173 |    3.9357      0.5634   [6.3s]
//   13     210       60    2.0779    1.0324   2.0126 |   1.1818   0.6015    1.9649 |    3.9357      0.4993   [6.3s]
//   17       2      126    0.0000    0.0000   1.0000 |   4.9203   1.4885    3.3054 |    4.5409      0.7279   [6.3s]
//   17       6      126    0.0000    0.0000   1.0001 |   4.9203   1.4885    3.3054 |    4.5409      0.7279   [6.3s]
//   17      30      126    0.2819    0.2306   1.2225 |   5.1229   1.4706    3.4836 |    4.5409      0.7672   [6.3s]
//   17     210      126    1.5413    1.0198   1.5113 |   3.7972   1.0843    3.5020 |    4.5409      0.7712   [6.3s]
//   17    2310      126    3.8434    1.3290   2.8919 |   1.7692   0.6704    2.6391 |    4.5409      0.5812   [6.3s]
//   19       2      198    0.0000    0.0000   1.0004 |   6.8403   1.4478    4.7247 |    5.1270      0.9215   [6.3s]
//   19       6      198    0.0000    0.0000   1.0001 |   6.8403   1.4478    4.7247 |    5.1270      0.9215   [6.3s]
//   19      30      198    0.2985    0.1505   1.9841 |   6.9566   1.4400    4.8311 |    5.1270      0.9423   [6.3s]
//   19     210      198    0.6857    0.2997   2.2878 |   7.3155   1.4164    5.1647 |    5.1270      1.0074   [6.3s]
//   19    2310      198    2.9625    0.9262   3.1987 |   5.6063   1.1128    5.0381 |    5.1270      0.9826   [6.3s]
//   19   30030      198    4.0756    1.1368   3.5852 |   4.4706   0.8965    4.9865 |    5.1270      0.9726   [6.3s]
//   23       2      258    0.0000    0.0000   1.0000 |   7.8157   1.7365    4.5009 |    5.6723      0.7935   [6.4s]
//   23       6      258    0.0000    0.0000   1.0001 |   7.8157   1.7365    4.5009 |    5.6723      0.7935   [6.4s]
//   23      30      258    0.2595    0.1306   1.9873 |   7.9128   1.7316    4.5698 |    5.6723      0.8056   [6.4s]
//   23     210      258    0.9446    0.5624   1.6795 |   8.6678   1.6429    5.2760 |    5.6723      0.9301   [6.5s]
//   23    2310      258    2.1553    0.8987   2.3982 |   7.7006   1.4858    5.1827 |    5.6723      0.9137   [6.5s]
//   23   30030      258    3.5032    1.1648   3.0075 |   6.5356   1.2878    5.0749 |    5.6723      0.8947   [6.5s]
//   23  510510      258    6.0262    1.5028   4.0100 |   3.7895   0.8700    4.3555 |    5.6723      0.7679   [6.5s]
//
//   H = z^beta_2 (the target window)
//   z    m       H        sup|Phi|  rms(Phi) lam_head |  sup|T|   rms(T)   lam_tail | sqrt(2lnW) lam_tail/sqrt(2lnW)
//   13       2    56570    0.0000    0.0000   1.0000 |   4.1039   1.9086    2.1502 |    3.9357      0.5463   [6.6s]
//   13       6    56570    0.2234    0.1580   1.4142 |   4.3273   1.9021    2.2750 |    3.9357      0.5780   [6.6s]
//   13      30    56570    0.5584    0.2884   1.9365 |   4.1039   1.8867    2.1751 |    3.9357      0.5527   [6.6s]
//   13     210    56570    2.0779    1.1893   1.7472 |   3.4545   1.4928    2.3142 |    3.9357      0.5880   [6.6s]
//   17       2   177684    0.0000    0.0000   1.0000 |   5.2779   1.5709    3.3599 |    4.5409      0.7399   [6.6s]
//   17       6   177684    0.0000    0.0000   1.0000 |   5.2779   1.5709    3.3599 |    4.5409      0.7399   [6.6s]
//   17      30   177684    0.2819    0.2306   1.2225 |   4.9960   1.5538    3.2153 |    4.5409      0.7081   [6.6s]
//   17     210   177684    1.1277    0.5090   2.2154 |   4.3706   1.4861    2.9410 |    4.5409      0.6477   [6.6s]
//   17    2310   177684    3.4318    1.0784   3.1821 |   4.3846   1.1422    3.8388 |    4.5409      0.8454   [6.6s]
//   19       2   285587    0.0396    0.0396   1.0000 |  11.4635   3.1190    3.6753 |    5.1270      0.7169   [6.7s]
//   19       6   285587    0.2091    0.0935   2.2353 |  11.3843   3.1179    3.6513 |    5.1270      0.7122   [6.7s]
//   19      30   285587    0.3142    0.1789   1.7563 |  11.3235   3.1141    3.6362 |    5.1270      0.7092   [6.7s]
//   19     210   285587    0.6461    0.3262   1.9809 |  11.4895   3.1022    3.7037 |    5.1270      0.7224   [6.7s]
//   19    2310   285587    4.1463    2.0259   2.0466 |   9.3665   2.3718    3.9491 |    5.1270      0.7703   [6.7s]
//   19   30030   285587    6.0121    2.4233   2.4809 |   6.2941   1.9640    3.2047 |    5.1270      0.6251   [6.7s]
//   23       2   645273    0.0342    0.0342   1.0000 |  17.5198   4.0380    4.3387 |    5.6723      0.7649   [7.1s]
//   23       6   645273    0.1111    0.1083   1.0263 |  17.5968   4.0367    4.3592 |    5.6723      0.7685   [7.1s]
//   23      30   645273    0.2538    0.1633   1.5538 |  17.3831   4.0349    4.3082 |    5.6723      0.7595   [7.1s]
//   23     210   645273    1.2524    0.6434   1.9466 |  16.4423   3.9866    4.1244 |    5.6723      0.7271   [7.2s]
//   23    2310   645273    3.5869    1.3463   2.6643 |  14.7180   3.8072    3.8659 |    5.6723      0.6815   [7.2s]
//   23   30030   645273    6.9469    2.0109   3.4547 |  12.9783   3.5019    3.7061 |    5.6723      0.6534   [7.2s]
//   23  510510   645273   12.0646    2.9197   4.1321 |  10.6842   2.7897    3.8299 |    5.6723      0.6752   [7.3s]
//
//
// S3 WHAT THE SPLIT BUYS --- the share of the problem that survives into the tail
//
//   At H = z^beta_2. "var share" is the fraction of <R^2>_H carried by the tail;
//   "Ssup share" the fraction of the absolute-value bound Ssup(H) carried by it.
//   The last column is the best a PERFECT treatment of the head could buy:
//   Ssup(H) / (SsupH + SsupT) is 1 by additivity, so the gain has to come from
//   replacing SsupT, and the column shows Ssup(H)/SsupT, the ceiling on that gain.
//
//   z    m         H          <R^2>_H     var share  Ssup(H)     SsupT       Ssup/SsupT
//   13         2      56570     3.642885    1.00000     13.5150     13.5150       1.0000   [7.3s]
//   13         6      56570     3.642885    0.99315     13.5150     13.2099       1.0231   [7.3s]
//   13        30      56570     3.642885    0.97717     13.5150     12.4760       1.0833   [7.3s]
//   13       210      56570     3.642885    0.61172     13.5150      8.6983       1.5538   [7.3s]
//
//   17         2     177684     2.467614    1.00000     30.6383     30.6383       1.0000   [7.3s]
//   17         6     177684     2.467614    1.00000     30.6383     30.6383       1.0000   [7.3s]
//   17        30     177684     2.467614    0.97845     30.6383     29.8104       1.0278   [7.3s]
//   17       210     177684     2.467614    0.89501     30.6383     27.5992       1.1101   [7.3s]
//   17      2310     177684     2.467614    0.52868     30.6383     18.8316       1.6270   [7.3s]
//
//   19         2     285587     9.729854    0.99984     74.8733     74.8337       1.0005   [7.3s]
//   19         6     285587     9.729854    0.99910     74.8733     74.6642       1.0028   [7.3s]
//   19        30     285587     9.729854    0.99671     74.8733     74.1074       1.0103   [7.3s]
//   19       210     285587     9.729854    0.98907     74.8733     72.4817       1.0330   [7.3s]
//   19      2310     285587     9.729854    0.57817     74.8733     62.5791       1.1965   [7.3s]
//   19     30030     285587     9.729854    0.39645     74.8733     43.4180       1.7245   [7.3s]
//
//   23         2     645273    16.306998    0.99993    154.9280    154.8938       1.0002   [7.4s]
//   23         6     645273    16.306998    0.99928    154.9280    154.7485       1.0012   [7.4s]
//   23        30     645273    16.306998    0.99836    154.9280    154.2857       1.0042   [7.4s]
//   23       210     645273    16.306998    0.97462    154.9280    152.2776       1.0174   [7.4s]
//   23      2310     645273    16.306998    0.88885    154.9280    145.1427       1.0674   [7.4s]
//   23     30030     645273    16.306998    0.75203    154.9280    126.2857       1.2268   [7.4s]
//   23    510510     645273    16.306998    0.47724    154.9280     84.6478       1.8303   [7.4s]
//
//   29         2    1734794    26.140711    1.00000    332.0900    332.0900       1.0000   [8.0s]
//   29         6    1734794    26.140711    0.99967    332.0900    331.9106       1.0005   [8.0s]
//   29        30    1734794    26.140711    0.99904    332.0900    331.4687       1.0019   [8.0s]
//   29       210    1734794    26.140711    0.99671    332.0900    330.0456       1.0062   [8.0s]
//   29      2310    1734794    26.140711    0.99433    332.0900    326.1972       1.0181   [8.0s]
//   29     30030    1734794    26.140711    0.93309    332.0900    306.7654       1.0826   [8.0s]
//   29    510510    1734794    26.140711    0.70465    332.0900    251.1480       1.3223   [8.0s]
//   29   9699690    1734794    26.140711    0.49846    332.0900    158.7958       2.0913   [8.0s]
//
//   31         2    2305792    47.019098    1.00000    605.1836    605.1836       1.0000   [10.0s]
//   31         6    2305792    47.019098    0.99985    605.1836    605.0212       1.0003   [10.0s]
//   31        30    2305792    47.019098    0.99944    605.1836    604.5753       1.0010   [10.0s]
//   31       210    2305792    47.019098    0.99889    605.1836    603.4528       1.0029   [10.0s]
//   31      2310    2305792    47.019098    0.99203    605.1836    598.7369       1.0108   [10.0s]
//   31     30030    2305792    47.019098    0.95277    605.1836    580.6115       1.0423   [10.0s]
//   31    510510    2305792    47.019098    0.86222    605.1836    532.8743       1.1357   [10.0s]
//   31   9699690    2305792    47.019098    0.68498    605.1836    436.4812       1.3865   [10.0s]
//   31 223092870    2305792    47.019098    0.43280    605.1836    271.5686       2.2285   [10.0s]
//
//   37         2    4905172   161.595963    1.00000   1642.9700   1642.9700       1.0000   [26.8s]
//   37         6    4905172   161.595963    0.99996   1642.9700   1642.8127       1.0001   [26.8s]
//   37        30    4905172   161.595963    0.99985   1642.9700   1642.3756       1.0004   [26.8s]
//   37       210    4905172   161.595963    0.99969   1642.9700   1641.2894       1.0010   [26.8s]
//   37      2310    4905172   161.595963    0.99654   1642.9700   1636.5811       1.0039   [26.8s]
//   37     30030    4905172   161.595963    0.98975   1642.9700   1621.8719       1.0130   [26.8s]
//   37    510510    4905172   161.595963    0.95781   1642.9700   1570.6023       1.0461   [26.8s]
//   37   9699690    4905172   161.595963    0.83357   1642.9700   1438.0473       1.1425   [26.8s]
//   37 223092870    4905172   161.595963    0.67000   1642.9700   1158.6258       1.4180   [26.8s]
//   37 6469693230    4905172   161.595963    0.40232   1642.9700    706.8161       2.3245   [26.8s]
//
//
// S4 THE PRICE OF A TAIL-ONLY MAXIMAL INEQUALITY
//
//   The certificate needs H*M > sup|R|. With the split that is
//       H*M > SsupH(m,H) + sup_x|T_m(x)|,   SsupH needing no sup over x.
//   So a tail-only maximal inequality has to deliver
//       lambda_req := (H*M - SsupH) / rms(T_m)     against sup|T| <= lambda*rms(T).
//   Compared with the Gaussian value sqrt(2 ln W) and with the trivial
//   Cauchy-Schwarz value sqrt(W - m). At H = z^beta_2.
//
//   z    m         H*M          SsupH      rms(T)     lam_req     sqrt(2lnW)  sqrt(W-m)     lam_req/sqrt(2lnW)
//   13         2     3159.104     0.0000     1.9086    1.6552e+3      3.9357    4.804e+1      4.2055e+2
//   13         6     3159.104     0.3051     1.9021    1.6607e+3      3.9357    4.800e+1      4.2195e+2
//   13        30     3159.104     1.0390     1.8867    1.6738e+3      3.9357    4.775e+1      4.2529e+2
//   13       210     3159.104     4.8168     1.4928    2.1130e+3      3.9357    4.583e+1      5.3688e+2
//
//   17         2     8348.722     0.0000     1.5709    5.3147e+3      4.5409    1.733e+2      1.1704e+3
//   17         6     8348.722     0.0000     1.5709    5.3147e+3      4.5409    1.733e+2      1.1704e+3
//   17        30     8348.722     0.8279     1.5538    5.3724e+3      4.5409    1.732e+2      1.1831e+3
//   17       210     8348.722     3.0390     1.4861    5.6158e+3      4.5409    1.727e+2      1.2367e+3
//   17      2310     8348.722    11.8067     1.1422    7.2991e+3      4.5409    1.665e+2      1.6074e+3
//
//   19         2    11308.576     0.0396     3.1190    3.6257e+3      5.1270    7.145e+2      7.0717e+2
//   19         6    11308.576     0.2091     3.1179    3.6270e+3      5.1270    7.145e+2      7.0742e+2
//   19        30    11308.576     0.7660     3.1141    3.6311e+3      5.1270    7.145e+2      7.0823e+2
//   19       210    11308.576     2.3916     3.1022    3.6446e+3      5.1270    7.144e+2      7.1086e+2
//   19      2310    11308.576    12.2942     2.3718    4.7627e+3      5.1270    7.129e+2      9.2895e+2
//   19     30030    11308.576    31.4553     1.9640    5.7418e+3      5.1270    6.932e+2      1.1199e+3
//
//   23         2    22048.486     0.0342     4.0380    5.4602e+3      5.6723    3.114e+3      9.6260e+2
//   23         6    22048.486     0.1795     4.0367    5.4619e+3      5.6723    3.114e+3      9.6291e+2
//   23        30    22048.486     0.6422     4.0349    5.4643e+3      5.6723    3.114e+3      9.6333e+2
//   23       210    22048.486     2.6504     3.9866    5.5300e+3      5.6723    3.114e+3      9.7490e+2
//   23      2310    22048.486     9.7852     3.8072    5.7887e+3      5.6723    3.114e+3      1.0205e+3
//   23     30030    22048.486    28.6423     3.5019    6.2880e+3      5.6723    3.110e+3      1.1085e+3
//   23    510510    22048.486    70.2801     2.7897    7.8784e+3      5.6723    3.031e+3      1.3889e+3
//
//   29         2    55240.522     0.0000     5.1128    1.0804e+4      6.2005    1.494e+4      1.7425e+3
//   29         6    55240.522     0.1794     5.1120    1.0806e+4      6.2005    1.494e+4      1.7428e+3
//   29        30    55240.522     0.6213     5.1103    1.0809e+4      6.2005    1.494e+4      1.7433e+3
//   29       210    55240.522     2.0443     5.1044    1.0822e+4      6.2005    1.494e+4      1.7453e+3
//   29      2310    55240.522     5.8928     5.0983    1.0834e+4      6.2005    1.494e+4      1.7473e+3
//   29     30030    55240.522    25.3245     4.9388    1.1180e+4      6.2005    1.494e+4      1.8031e+3
//   29    510510    55240.522    80.9419     4.2919    1.2852e+4      6.2005    1.492e+4      2.0728e+3
//   29   9699690    55240.522   173.2941     3.6097    1.5255e+4      6.2005    1.461e+4      2.4603e+3
//
//   31         2    67450.288     0.0000     6.8570    9.8366e+3      6.7217    8.043e+4      1.4634e+3
//   31         6    67450.288     0.1624     6.8565    9.8374e+3      6.7217    8.043e+4      1.4635e+3
//   31        30    67450.288     0.6083     6.8551    9.8393e+3      6.7217    8.043e+4      1.4638e+3
//   31       210    67450.288     1.7309     6.8532    9.8418e+3      6.7217    8.043e+4      1.4642e+3
//   31      2310    67450.288     6.4467     6.8297    9.8751e+3      6.7217    8.043e+4      1.4691e+3
//   31     30030    67450.288    24.5721     6.6932    1.0074e+4      6.7217    8.043e+4      1.4987e+3
//   31    510510    67450.288    72.3093     6.3672    1.0582e+4      6.7217    8.043e+4      1.5743e+3
//   31   9699690    67450.288   168.7024     5.6751    1.1856e+4      6.7217    8.037e+4      1.7638e+3
//   31 223092870    67450.288   333.6150     4.5111    1.4878e+4      6.7217    7.904e+4      2.2135e+3
//
//   37         2   137623.447     0.0000    12.7120    1.0826e+4      7.2145    4.478e+5      1.5006e+3
//   37         6   137623.447     0.1573    12.7118    1.0826e+4      7.2145    4.478e+5      1.5007e+3
//   37        30   137623.447     0.5944    12.7111    1.0827e+4      7.2145    4.478e+5      1.5007e+3
//   37       210   137623.447     1.6806    12.7101    1.0828e+4      7.2145    4.478e+5      1.5008e+3
//   37      2310   137623.447     6.3889    12.6900    1.0845e+4      7.2145    4.478e+5      1.5032e+3
//   37     30030   137623.447    21.0981    12.6467    1.0880e+4      7.2145    4.478e+5      1.5081e+3
//   37    510510   137623.447    72.3676    12.4410    1.1056e+4      7.2145    4.478e+5      1.5325e+3
//   37   9699690   137623.447   204.9227    11.6061    1.1840e+4      7.2145    4.478e+5      1.6412e+3
//   37 223092870   137623.447   484.3441    10.4053    1.3180e+4      7.2145    4.476e+5      1.8268e+3
//   37 6469693230   137623.447   936.1539     8.0631    1.6952e+4      7.2145    4.406e+5      2.3497e+3
//
//   Growth: lambda_req ~ M z^{beta_2/2} / sqrt(B) is a POWER of z, while
//   sqrt(2 ln W) ~ sqrt(2 theta(z)) is a square root of z. Fitted slopes of
//   ln(lambda_req) and ln(sqrt(2 ln W)) against ln z at the widest cut of each z:
//       d ln(lambda_req)/d ln z = 1.8795      d ln(sqrt(2 ln W))/d ln z = 0.5831
//
//   And what the CURRENT bound delivers in the same units: taking absolute values
//   in the tail achieves lambda_abs := SsupT / rms(T_m). The tail-only maximal
//   inequality has to beat lambda_abs by the factor in the last column, which is
//   above 1 while the route is alive and below 1 once it is dead.
//   z    m (widest)     lam_abs     lam_req      lam_req/lam_abs   sqrt(2lnW)
//   13          210    5.8269e+0    2.1130e+3         3.6263e+2       3.9357
//   17         2310    1.6487e+1    7.2991e+3         4.4271e+2       4.5409
//   19        30030    2.2107e+1    5.7418e+3         2.5973e+2       5.1270
//   23       510510    3.0343e+1    7.8784e+3         2.5964e+2       5.6723
//   29      9699690    4.3991e+1    1.5255e+4         3.4678e+2       6.2005
//   31    223092870    6.0200e+1    1.4878e+4         2.4714e+2       6.7217
//   37   6469693230    8.7661e+1    1.6952e+4         1.9338e+2       7.2145
//       d ln(lambda_abs)/d ln z = 2.4064  against d ln(lambda_req)/d ln z = 1.8795
//       two-parameter extrapolation of lambda_req = lambda_abs: ln z = 13.9001, z = 1.088e+6
//       (Seven points and two straight lines. The corpus's own four rising models for
//       u_sup crossed beta_2 at z = 73, 147, 267 and 1544 and were statistically
//       indistinguishable, so a single crossing figure here is an order of magnitude
//       at best and is quoted only to say that the crossing is finite.)   [76.9s]
//
// S5 SECOND MOMENT + CHEBYSHEV + INTEGRALITY, RUN PER CLASS
//
//   attack-DP1-mechanism.md sec.6 (PROVEN): over a finite period the count of bad
//   positions is a non-negative integer, so a failure count below 1 forces it to
//   zero. The split sharpens the mechanism: T_m has mean zero on EVERY class mod m,
//   and a class holds only W/m positions, so the test runs per class and pays
//       Need_k(c) := ( sum_{y = c mod m} T(y)^{2k} )^{1/2k}   <   H*M + Phi_m(c)
//   instead of the global sqrt(W)*rms. k = 1 is Chebyshev. The m = W row is the
//   exhaustive walk and is an identity, not a bound.
//
//   (a) At H = nP, the exhaustive threshold, with Phi_m used EXACTLY (so this is
//       the ceiling of the route, not a proof at large m). k* is the smallest
//       moment order in 1..3 that closes.
//   z    m        W/m       H*M     max_c(Need_1-Phi)  k=2       k=3      k*   Ssup(H)  sup|R|
//   13        2      1155    3.3506          40.6077    8.5364    5.3700   >3    11.447   2.649
//   13        6       385    3.3506          23.4449    6.4863    4.4715   >3    11.447   2.649
//   13       30        77    3.3506          13.5474    5.3616    4.0634   >3    11.447   2.649
//   13      210        11    3.3506           3.5550    3.0474    2.9524    2    11.447   2.649
//   13     2310         1    3.3506           2.3506    2.3509    2.3562    1    11.447   2.649
//
//   17        2     15015    5.9203         182.3995   21.4459   11.4332   >3    28.412   4.920
//   17        6      5005    5.9203         105.3812   16.2991    9.5210   >3    28.412   4.920
//   17       30      1001    5.9203          49.4878   11.2631    7.4869   >3    28.412   4.920
//   17      210       143    5.9203          18.0702    7.5423    6.1003   >3    28.412   4.920
//   17     2310        13    5.9203           6.4745    5.4664    5.2315    2    28.412   4.920
//   17    30030         1    5.9203           4.9203    4.9203    4.9362    1    28.412   4.920
//
//   19        2    255255    7.8403         731.4656   44.6286   19.6811   >3    60.038   6.840
//   19        6     85085    7.8403         422.7339   33.9439   16.4019   >3    60.038   6.840
//   19       30     17017    7.8403         190.4348   22.7997   12.5737   >3    60.038   6.840
//   19      210      2431    7.8403          84.6475   16.0165   10.1687   >3    60.038   6.840
//   19     2310       221    7.8403          21.6628    9.3206    7.9394   >3    60.038   6.840
//   19    30030        17    7.8403           8.6646    7.1764    6.9661    2    60.038   6.840
//   19   510510         1    7.8403           6.8403    6.8414    6.8624    1    60.038   6.840
//
//   23        2   4849845    8.8157        3824.1385  107.2055   35.5105   >3   118.328   7.816
//   23        6   1616615    8.8157        2209.1838   81.5013   29.5816   >3   118.328   7.816
//   23       30    323323    8.8157        1017.3464   55.7334   22.9788   >3   118.328   7.816
//   23      210     46189    8.8157         375.4512   34.0409   16.8436   >3   118.328   7.816
//   23     2310      4199    8.8157         115.5061   18.9218   11.7024   >3   118.328   7.816
//   23    30030       323    8.8157          32.0034   11.4513    9.3650   >3   118.328   7.816
//   23   510510        19    8.8157          10.3973    8.5434    8.2203    2   118.328   7.816
//   23  9699690         1    8.8157           7.8157    7.8157    7.8157    1   118.328   7.816
//
//   (b) The PROVEN chain, with no exhaustive input anywhere: Phi_m bounded by the
//   head absolute-value sum SsupH (S1 claim (ii)) and the tail by per-class
//   Chebyshev. Bd(m) := SsupH(m,H) + max_c sqrt(sum_{y=c mod m} T(y)^2). Against
//   the pure absolute-value bound Ssup(H) of lemmaV-parseval.js S5. At H = nP.
//   z    m         SsupH      max_c sqrt(sum T^2)   Bd(m)      Ssup(H)   Bd/Ssup   sup|R|
//   13         2     0.0000               40.6077    40.6077    11.447    3.5476    2.649
//   13         6     0.0000               23.4449    23.4449    11.447    2.0482    2.649
//   13        30     0.0000               13.5474    13.5474    11.447    1.1835    2.649
//   13       210     4.2192                2.8284     7.0476    11.447    0.6157    2.649
//   13      2310    11.4467                0.0000    11.4467    11.447    1.0000    2.649
//      best cut m = 210, Bd = 7.0476, Bd/Ssup = 0.6157   [85.0s]
//
//   17         2     0.0000              182.3995   182.3995    28.412    6.4199    4.920
//   17         6     0.0000              105.3812   105.3812    28.412    3.7091    4.920
//   17        30     0.8279               49.6464    50.4743    28.412    1.7765    4.920
//   17       210     3.3903               16.8220    20.2123    28.412    0.7114    4.920
//   17      2310    11.8750                3.0382    14.9132    28.412    0.5249    4.920
//   17     30030    28.4118                0.0000    28.4118    28.412    1.0000    4.920
//      best cut m = 2310, Bd = 14.9132, Bd/Ssup = 0.5249   [85.0s]
//
//   19         2     0.0000              731.4656   731.4656    60.038   12.1833    6.840
//   19         6     0.0000              422.7339   422.7339    60.038    7.0411    6.840
//   19        30     0.5899              190.4955   191.0854    60.038    3.1827    6.840
//   19       210     2.1929               84.5423    86.7352    60.038    1.4447    6.840
//   19      2310     9.7331               21.1155    30.8486    60.038    0.5138    6.840
//   19     30030    26.0826                5.4987    31.5813    60.038    0.5260    6.840
//   19    510510    60.0382                0.0000    60.0382    60.038    1.0000    6.840
//      best cut m = 2310, Bd = 30.8486, Bd/Ssup = 0.5138   [85.3s]
//
//   23         2     0.0000             3824.1385  3824.1385   118.328   32.3181    7.816
//   23         6     0.0000             2209.1838  2209.1838   118.328   18.6700    7.816
//   23        30     0.5097             1017.4005  1017.9102   118.328    8.6024    7.816
//   23       210     2.4557              375.8042   378.2600   118.328    3.1967    7.816
//   23      2310     8.8643              116.0367   124.9010   118.328    1.0555    7.816
//   23     30030    25.3650               30.5099    55.8749   118.328    0.4722    7.816
//   23    510510    57.7020                6.0524    63.7544   118.328    0.5388    7.816
//   23   9699690   118.3280                0.0000   118.3280   118.328    1.0000    7.816
//      best cut m = 30030, Bd = 55.8749, Bd/Ssup = 0.4722   [89.2s]
//
//   (c) The exponent the proven chain delivers. u_int = ln H*/ln z for the smallest H
//   on a 1.06-geometric grid at which min_m Bd(m) < H*M, beside u_sup
//   (research/lemmaV-sup-extension.js) and u_true = ln(nP)/ln z. The balance
//   sqrt(m) against sqrt(W/m) predicts the optimum at m near sqrt(W).
//   z    u_true   u_sup    u_int    best m at H*   sqrt(W)      theta(z)/(2 ln z)   u_int - theta/(2 ln z)
//   13   1.5963   2.0617   1.9612            210           48              1.5098                  0.4514   [89.2s]
//   17   1.7070   2.3036   2.0985           2310          173              1.8195                  0.2790   [89.5s]
//   19   1.7960   2.5518   2.3501          30030          714              2.2319                  0.1182   [94.1s]
//   23   1.7710   2.6666   2.4769         510510         3114              2.5654                 -0.0885   [226.2s]
//
// S6 THE tau(m) SUBSTITUTION --- checked here, not inherited
//
//   attack-theta-last-gap.md sec.6 (C1): all the x-dependence sits in one factor
//   e(-hx/m), so the quantifier is separable and its price is tau(m), not C^{pi(z)}.
//   The two prices are combinatorial factors and can be compared exactly.
//     C^{pi(z)}: the e-basis absolute-value step runs over the divisors of P(z),
//                2^{pi(z)} of them, and the extension measures the per-prime factor.
//     tau(m):    in the (h,m) basis m = [d1,d2] <= D^2 = z^{2s} is an INTEGER, so
//                omega(m) <= Omega(z,s) := max{k : p_1...p_k <= z^{2s}}, and
//                max tau(m) = 2^{Omega}. Omega is governed by ln m, not by z.
//
//   (a) the measured per-prime factor of the e-basis price Ssat:
//       z=13  Ssat=1.96018e+1  ratio to previous level =   --     [226.3s]
//       z=17  Ssat=5.03136e+1  ratio to previous level = 2.5668   [226.3s]
//       z=19  Ssat=1.20062e+2  ratio to previous level = 2.3863   [226.3s]
//       z=23  Ssat=2.42499e+2  ratio to previous level = 2.0198   [226.3s]
//       z=29  Ssat=5.23109e+2  ratio to previous level = 2.1572   [226.6s]
//       z=31  Ssat=9.52627e+2  ratio to previous level = 1.8211   [227.6s]
//       z=37  Ssat=2.57268e+3  ratio to previous level = 2.7006   [236.3s]
//
//   (b) Omega(z,s) against pi(z), and the two prices in window-exponent currency
//       u_price = ln(price)/ln z. C is the measured per-prime factor from (a).
//   UNITS. pi(z) here is the SIEVE prime count, #{p < z}, matching rosserSupport();
//   it is one less than #{p <= z} at every prime z and the two must not be mixed.
//   z          pi(z)   Omega   2^Omega        C^{pi(z)}        u_tau      u_C
//          13       5       7     1.280e+2         3.589e+0     1.8917    1.399e+0
//          23       8       8     2.560e+2         5.743e+0     1.7685    1.832e+0
//          43      13       9     5.120e+2         9.332e+0     1.6586    2.481e+0
//         101      25      11     2.048e+3         1.795e+1     1.6521    3.889e+0
//        1009     168      15     3.277e+4         1.206e+2     1.5032    1.744e+1
//       10007    1229      18     2.621e+5         8.822e+2     1.3545    9.578e+1
//      100003    9592      21     2.097e+6         6.886e+3     1.2643    5.981e+2
//     1000003   78498      24     1.678e+7         5.635e+4     1.2041    4.079e+3
//   100000000 5723387      30     1.074e+9         4.108e+6     1.1289    2.230e+5
//   10000000000 453155652      36    6.872e+10         3.253e+8     1.0837    1.413e+7
//   1000000000000 37501010277      41    2.199e+12        2.692e+10     1.0285    9.743e+8
//
//   (b2) THE OBJECTION THIS TABLE HAS TO SURVIVE, and why it does. If m were
//   allowed to be P(z) itself then tau(m) = 2^{pi(z)} and the substitution would be
//   the SAME number, not a cheaper one. But m = [d1,d2] with d1,d2 <= D = z^s, so
//   m <= D^2 and P(z) is admissible only while theta(z) <= 2 s ln z. It is not,
//   beyond the smallest levels, and the gap grows without bound:
//   z          theta(z)=ln P(z)   ln(D^2)=2s ln z   P(z)/D^2        omega cap: Omega vs pi(z)
//          13             7.7450           15.3897        4.786e-4         7 vs      5
//          23            16.0876           18.8130        6.552e-2         8 vs      8
//          43            33.3489           22.5672        4.813e+4         9 vs     13
//         101            83.7284           27.6907       2.172e+24        11 vs     25
//        1009           956.2453           41.5003        Infinity        15 vs    168
//       10007          9895.9914           55.2662        Infinity        18 vs   1229
//      100003         99685.3893           69.0777        Infinity        21 vs   9592
//
//   (c) the crossover: the smallest z at which 2^Omega < C^{pi(z)}.
//       C = 2.05:  first z with 2^Omega < C^{pi(z)} is z = 20
//       C = 2.00:  first z with 2^Omega < C^{pi(z)} is z = 24
//       C = 1.50:  first z with 2^Omega < C^{pi(z)} is z = 62
//
//   (d) the cost the tau basis carries that the e basis does not: the number of
//       moduli. e | P(z) gives 2^{pi(z)} moduli; m <= D^2 gives about z^{2s}.
//   z        2^{pi(z)}        z^{2s}           ln(count)/ln z for each
//        13     3.200e+1      4.827e+6       1.3512     6.0000
//        23     2.560e+2      1.480e+8       1.7685     6.0000
//        43     8.192e+3      6.321e+9       2.3958     6.0000
//       101     3.355e+7     1.062e+12       3.7548     6.0000
//      1009    3.741e+50     1.055e+18      16.8358     6.0000
//     10007     Infinity     1.004e+24      92.4844     6.0000
//
// S7 THE LARGE SIEVE ON THE TAIL MODULI
//
//   The tail frequencies are a/e with e | W; every one is a multiple of 1/W, so the
//   spacing is delta = 1/W and the large sieve gives sum_{e,a} |S_H(a/e)|^2 <=
//   (H + W) * H. The exact value over the whole spectrum is H(W - H) by Parseval.
//   If the large sieve is already within a whisker of the exact identity it can
//   contribute nothing the mean square does not already give.
//
//   (The identity needs H <= W, so this runs at H = nP, not at H = z^beta_2.)
//   z    W            H         large sieve (H+W)H    exact H(W-H)       ratio
//   13         2310        60           1.422000e+5        1.350000e+5    1.053333
//   17        30030       126           3.799656e+6        3.767904e+6    1.008427
//   19       510510       198           1.011202e+8        1.010418e+8    1.000776
//   23      9699690       258           2.502587e+9        2.502453e+9    1.000053
//
//   And the exact mean square is not just the same order, it is the identity the
//   large sieve approximates: sum over the FULL spectrum of |S_H(a/e)|^2, computed
//   by the peeled sweep with Theta replaced by 1, against H(W-H):
//       z=13 H=60: sum_{j=1}^{W-1}|S_H(j/W)|^2 = 135000.0000   H(W-H) = 135000.0000   rel = 5.61e-15   [236.3s]
//       z=17 H=126: sum_{j=1}^{W-1}|S_H(j/W)|^2 = 3767904.0000   H(W-H) = 3767904.0000   rel = 1.04e-14   [236.3s]
//       z=19 H=198: sum_{j=1}^{W-1}|S_H(j/W)|^2 = 101041776.0000   H(W-H) = 101041776.0000   rel = 2.43e-14   [236.4s]
//
//   (b) DIVISOR SWITCHING on the tail. The switch d1 <-> d2 acts on the split
//   (e1,e2) = (gcd(e,d1), e/gcd(e,d1)) by exchanging the two factors, and it can only
//   buy something if the certificate is ASYMMETRIC in that exchange. Measured:
//   the largest and the mean relative asymmetry |V(e1,e2)-V(e2,e1)| / (|V(e1,e2)|
//   + |V(e2,e1)|) over every e | P(z) and every ordered factorisation, tail records
//   only (e not dividing the widest cut).
//   The last column is the CEILING on any such rearrangement: what sum_e e*Vabs(e)^2
//   becomes if the two orderings are added coherently BEFORE the absolute value,
//   |V(e1,e2)| + |V(e2,e1)| -> |V(e1,e2) + V(e2,e1)|, which is the most a switch can
//   ever give. Below 1 means there is something to win; 1 means the switch is void.
//   z    pairs    max asym   mean asym   best-case Vabs ratio   best-case B ratio
//   13       74   1.000000    0.486486               0.750000            0.500000   [236.4s]
//   17      210   1.000000    0.514286               0.761039            0.504193   [236.4s]
//   19      497   1.000000    0.509054               0.771219            0.532869   [236.4s]
//   23      918   1.000000    0.522876               0.772904            0.533965   [236.4s]
//   29     1600   1.000000    0.517750               0.805011            0.536009   [236.4s]
//
// DONE 236.4s
// ============================================================================
// READINGS
// ============================================================================
//
// 1. THE SPLIT IS EXACT AND THE HEAD NEEDS NO SUPREMUM. Head and tail mean
//    squares sum to the total at every one of 26 cuts, worst relative error
//    9.00e-14 (S0d). The head computed as a class average of the walked R and
//    the head computed from Theta_e agree to 1.66e-11 or better at all 22 rows
//    of S1, two disjoint code paths. And sup|Phi| <= SsupH <= sqrt(n_head)*rms
//    holds at every row ("chain ok = yes" throughout), with no quantifier over
//    x in either bound: n_head = 5, 29, 209, 2309 at m = 6, 30, 210, 2310, i.e.
//    exactly m-1. attack-AB-bounded.md sec.4.4's flatness is therefore a
//    theorem about the CUT and not a discovery about the sieve.
//
// 2. THE HEAD IS FLAT IN z AND THE TAIL IS NOT. At the fixed cut m = 210 and
//    H = z^beta_2, lam_head = 1.7472, 2.2154, 1.9809, 1.9466 over z = 13..23,
//    while lam_tail = 2.3142, 2.9410, 3.7037, 4.1244 rises at every step. The
//    ratio lam_tail/sqrt(2 ln W) rises too, 0.5880 to 0.7271: the tail behaves
//    like a Gaussian maximum over W positions. Widening the cut moves the
//    behaviour into the head instead of removing it -- lam_head reaches 4.1321
//    at z = 23, m = 510510.
//
// 3. AT A FIXED CUT THE SPLIT BUYS NOTHING ASYMPTOTICALLY. At m = 2310 the
//    tail's share of <R^2>_H is 0.52868, 0.57817, 0.88885, 0.99433, 0.99203,
//    0.99654 over z = 17..37, and the ceiling on a PERFECT treatment of the
//    head, Ssup(H)/SsupT, is 1.6270, 1.1965, 1.0674, 1.0181, 1.0108, 1.0039.
//    Both converge to 1. At the widest cut of each level the ceiling instead
//    rises, 1.5538 to 2.3245 over z = 13..37, but that is the cut where the
//    head inherits the maximal problem.
//
// 4. THE TAIL-ONLY MAXIMAL INEQUALITY IS A VERY SLACK ASK AND STILL THE WALL.
//    lam_req = 1.6952e+4 at z = 37 against sqrt(2 ln W) = 7.2145, a factor
//    2350. The absolute-value step already delivers lam_abs = 8.7661e+1, so it
//    is 193x inside what is needed. But d ln(lam_abs)/d ln z = 2.4064 against
//    d ln(lam_req)/d ln z = 1.8795, so the margin closes like z^-0.53 and the
//    two-parameter extrapolation crosses at z = 1.088e+6. Seven points and two
//    straight lines: the figure records that the crossing is finite, nothing
//    more.
//
// 5. THE LARGE SIEVE ON THE TAIL MODULI IS VOID. Every tail frequency is a
//    multiple of 1/W, so the large sieve gives (H+W)H against Parseval's exact
//    H(W-H); the ratio is 1.053333, 1.008427, 1.000776, 1.000053 at
//    z = 13, 17, 19, 23. The large sieve here IS the mean square, and the mean
//    square is already proved unconditionally.
//
// 6. DIVISOR SWITCHING IS AVAILABLE BUT BOUNDED. The certificate is genuinely
//    asymmetric under d1 <-> d2 (mean relative asymmetry 0.486486 to 0.522876,
//    with max 1.000000 at every level), so the switch has something to act on.
//    Its ceiling -- adding the two orderings coherently before the absolute
//    value -- takes sum_e e Vabs(e)^2 to 0.500000, 0.504193, 0.532869,
//    0.533965, 0.536009 of itself over z = 13..29. A factor of about 2, flat in
//    z, against a deficit that is a growing power.
//
// 7. THE PER-CLASS l^2 CHAIN BEATS THE ABSOLUTE-VALUE BOUND. Bd(m) = SsupH +
//    max_c sqrt(sum_{y=c mod m} T^2) gives Bd/Ssup = 0.6157, 0.5249, 0.5138,
//    0.4722 at z = 13..23, best cuts 210, 2310, 2310, 30030. In window exponent
//    u_int = 1.9612, 2.0985, 2.3501, 2.4769 against u_sup = 2.0617, 2.3036,
//    2.5518, 2.6666 -- below it at every level, unconditionally.
//
// 8. AND IT LANDS ON THE ALMOST-ALL LAW. u_int - theta(z)/(2 ln z) = 0.4514,
//    0.2790, 0.1182, -0.0885, falling monotonically. u_int is
//    theta(z)/(2 ln z) + O(1), which diverges like z/(2 ln z): the same curve
//    sift-limit-attack.md sec.7e prices as u_1, reached with a better constant.
//    The best cut tracks W/p_max (210, 2310, 30030, 510510) rather than the
//    balance point sqrt(W) (48, 173, 714, 3114), because SsupH is far tighter
//    than its Cauchy-Schwarz relaxation.
//
// 9. THE MOMENT ORDER TRADES AGAINST THE CUT. At z = 23, H = nP, the smallest
//    k that closes is 1 at m = 9699690 (the exhaustive identity), 2 at
//    m = 510510 (8.5434 against H*M = 8.8157), and >3 at every narrower cut
//    (m = 30030 needs to beat 9.3650 at k = 3 and does not). The k -> inf limit
//    is sup|R| = 7.816. The split does not remove the moment ladder; it
//    reparametrises it. And for a SUPREMUM target the integrality dressing of
//    attack-DP1-mechanism.md sec.6 adds nothing over l^{2k} -> l^inf on the
//    class: its strength is against counts and densities, not against maxima.
//
// 10. THE tau(m) SUBSTITUTION IS REAL AND LARGER THAN THE CORPUS SAYS. The
//    e-basis per-prime factor is re-derived here as 2.5668, 2.3863, 2.0198,
//    2.1572, 1.8211, 2.7006 over z = 13..37 (the first four reproduce
//    attack-AB-bounded.md sec.4.5 exactly). In window-exponent currency
//    u_C = pi(z) ln C/ln z runs 1.399e+0 at z = 13 to 9.743e+8 at z = 1e12 --
//    DIVERGENT -- while u_tau = Omega ln 2/ln z runs 1.8917 to 1.0285 over the
//    same range, BOUNDED and decaying, because omega(m) for m <= z^{2s} is
//    governed by ln m and not by z. Omega = 7, 9, 15, 24, 41 against
//    pi(z) = 5, 13, 168, 78498, 37501010277.
//
// 11. AND THE OBJECTION IS ANSWERED BY THE RANGE OF m. If m could be P(z) then
//    tau(m) = 2^{pi(z)} would be the same number. It cannot: m = [d1,d2] <= D^2,
//    and theta(z) against ln(D^2) is 7.7450 vs 15.3897, 16.0876 vs 18.8130,
//    33.3489 vs 22.5672 at z = 13, 23, 43. Since m is z-smooth the cap is
//    min(Omega, pi(z)), and the two cross at z = 23, where both read 8 and
//    P(z)/D^2 = 6.552e-2 -- P(z) is still just admissible there. By z = 43 it is
//    not: P(z)/D^2 = 4.813e+4 and the cap is Omega = 9 against pi(z) = 13. At
//    z = 100003 the caps are 21 against 9592.
//
// 12. AND THE SUBSTITUTION IS NOT FREE. The crossover is the first integer
//    z = 20 at C = 2.05, z = 24 at C = 2.00, z = 62 at C = 1.50 -- inside this
//    repository's range and far too small to be visible there. Against that,
//    the e basis has 2^{pi(z)} moduli, exponent 1.3512, 1.7685, 2.3958, 3.7548,
//    16.8358, 92.4844 over z = 13..10007, while the tau basis has about z^{2s}
//    moduli, exponent 6.0000 flat. The tau basis is the more expensive of the
//    two on modulus count below z ~ 200.
//
// 13. WHAT THIS FILE DOES NOT ESTABLISH. No total price is computed in the
//    (h,m) basis: that needs the weights attached to each m, which are not
//    computed here. No literature channel was opened in this session, so no
//    [ABSENT] claim is made anywhere. u_int is measured at four levels only,
//    z <= 23, because it needs the exhaustive period; the divergence in reading
//    8 is an extrapolation from those four.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own printed table carries (printed value
// first): 2.3497e+3 is quoted in reading 4 as "a factor 2350". It is the
// lam_req/sqrt(2lnW) column on the z = 37 row, 1.6952e+4 / 7.2145 = 2349.71.
//
// DERIVED IN THIS READING by arithmetic over printed values: reading 4's
// exponent -0.53 is the difference of the two printed log-log slopes,
// 1.8795 - 2.4064 = -0.5269. The margin lam_req/lam_abs therefore shrinks with
// z at that rate.
//
// SAME VALUE, DIFFERENT NOTATION: reading 10's z = 1e12 is the printed row
// label 1000000000000, the row carrying u_C = 9.743e+8 and u_tau = 1.0285.
// The same value is written 1e12 in the code above the banner.
// ---------------------------------------------------------------------------
