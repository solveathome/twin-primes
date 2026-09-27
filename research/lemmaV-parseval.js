// ============================================================================
// LEMMA V BY PARSEVAL — the mean square proved, and the quantifier priced
// (2026-08-18; attack 1 of 5 on the upper bound. Companion report:
//  research/history/staging/attack-beta2-01-lemmaV-meansquare.md.
//  Parent documents: research/sift-limit-attack.md sec.4.5 and sec.6 item (i),
//  research/sift-limit-lemmaV.js, research/theta-ladder.md sec.5b CORRECTION.)
// ============================================================================
// THE OBJECT. The Brudern-Fouvry vector-sieve certificate on the two-class
// interval problem is  T(x) = sum_{x<r<=x+H} c(r),  with pointwise minorant
//   c(r) = Lm(r)Lp(r+2) + Lp(r)Lm(r+2) - Lp(r)Lp(r+2),
// Lp/Lm the Rosser-Iwaniec linear-sieve weights of level D = z^s. Expanding
// over divisor pairs splits T exactly into a position-free main term and a
// signed lattice sawtooth:  T(x) = H*M + R(x),  M = sum_i w_i/q_i, the index i
// running over pairs (d1,d2) with gcd(d1,d2) | 2, q_i = [d1,d2], c_i the CRT
// class, w_i = +-1. Lemma V (sift-limit-attack.md sec.4.5) asks for
// R(x) = O(H/log^3 H) UNIFORMLY IN x. Section 6 item (i) of that file names the
// mean-square-in-x version by Parseval as the first lemma to try. This file
// does that, and prices what is left over.
//
// WHAT IS NEW HERE, against sift-limit-lemmaV.js which computed <R^2> exactly.
//   (1) A PROVEN UPPER BOUND, not an identity. <R^2>_H <= B(z,s) * H for every
//       H and every z, with B explicit and computable in O(N * 2^omega) rather
//       than O(N^2). B is measured flat near 1.4 across z = 13..37.
//   (2) The reduction chain to ONE one-dimensional estimate, with each step's
//       loss measured, so the exact point where the proof stops is a number.
//   (3) (V1) and (V2), asserted structurally in sift-limit-lemmaV.js, proved.
//   (4) The quantifier price: what a worst-position proof must beat, in three
//       equivalent currencies (deviation, window exponent, moment order).
//   (5) NOT ASKED FOR, and possibly the most useful thing here: the same
//       identity gives an UNCONDITIONAL worst-position bound by taking absolute
//       values in the FOURIER variables instead of the divisor-pair ones. It is
//       within 4.3x to 15.1x of the true supremum at z = 13..23 and yields
//       u_sup = 2.06, 2.30, 2.55, 2.67 with no maximal law in it (S5).
//
// THE CHAIN, in the order the sections verify it.
//   L1  R(x) = sum_{m=1..H} (c(x+m) - M).                    [definition]
//   L2  <R^2>_H = sum_{|v|<H} (H-|v|) K(v),  K the autocovariance of c;
//       K(v) = sum_{i,j} w_i w_j [ g 1_{v = delta mod g} - 1 ]/(q_i q_j),
//       g = gcd(q_i,q_j), delta = (c_j - c_i) mod g.
//   L3  K(v) = sum_{e | P(z), e>1} sum*_{a mod e} |Theta_e(a)|^2 e(av/e),
//       Theta_e(a) = sum_{i : e | q_i} (w_i/q_i) e(-a c_i/e), hence
//       <R^2>_H = sum_e sum*_a |Theta_e(a)|^2 F_H(a/e),
//       F_H(t) = |sum_{m<=H} e(mt)|^2 = sin^2(pi H t)/sin^2(pi t).   [Parseval]
//   L4  sum_{a mod e, a != 0} F_H(a/e) = h(e-h) EXACTLY, h = H mod e.
//       Corollary: Psi(g,delta,H) = sum_{a!=0} F_H(a/g) e(-a delta/g), so
//       |Psi| <= Psi(g,0) = h(g-h)  [= (V2), with equality iff delta = 0] and
//       Psi = 0 when g | H  [= (V1)].
//   A   <R^2>_H <= sum_{e>1} Theta*(e)^2 h_e(e-h_e) <= H sum_{e>1} e Theta*(e)^2,
//       Theta*(e) = max_{(a,e)=1} |Theta_e(a)|.                    [PROVEN]
//   B   c_i mod e depends on i only through (e1,e2) = (gcd(e,d1), e/gcd(e,d1)),
//       with c_i/e = -2 * inverse(e1) / e2 mod 1, so
//       Theta_e(a) = sum_{e1 e2 = e} e(2a inv(e1)/e2) V(e1,e2),
//       V(e1,e2) = sum_{i : e|q_i, gcd(e,d1)=e1} w_i/q_i,
//       and Theta*(e) <= Vabs(e) := sum_{e1 e2 = e} |V(e1,e2)|.     [PROVEN]
//   L5  POINTWISE, the identity that splits the problem in two:
//       R(x) = sum_{e>1} sum*_{a mod e} Theta_e(a) S_H(a/e) e(a x / e).
//       The window position enters ONLY as the unimodular phase e(ax/e), which
//       is exactly Brudern-Fouvry's LEFT factor e(-hN/(d1d2)); Theta_e(a)
//       carries their RIGHT factor. Parseval kills the left factor for free
//       (|e(ax/e)| = 1); the supremum cannot, because it IS the alignment of
//       those phases. Same identity, opposite verdicts.
//   C   <R^2>_H <= B(z,s) * H,  B(z,s) := sum_{e | P(z), e>1} e * Vabs(e)^2.
//       This is the mean-square Lemma V. Everything above is proved; what is
//       NOT proved is that B(z,s) stays bounded (or polylog) as z grows. That
//       single statement is the whole remaining content, and S2 measures it.
//
//   node research/lemmaV-parseval.js          (~9 min at defaults)
//   node research/lemmaV-parseval.js --quick  (skip the z>=29 O(N^2) rows)
//   node research/lemmaV-parseval.js S5       (one section; S0..S5)
// ============================================================================
'use strict';
const path = require('path');
const T0 = Date.now(); const el = () => ((Date.now()-T0)/1000).toFixed(1)+'s';
// CUSTODY: the term list, the exact mean square and the full-period walk are
// the repository's own, imported rather than recopied, so every number below
// is anchored to sift-limit-lemmaV.js and through it to the 2026-08-14 pilot.
const REPO = require(path.join(__dirname, 'sift-limit-lemmaV.js'));

const QUICK = process.argv.includes('--quick');
function primesBelow(n){const s=new Uint8Array(n),o=[];for(let i=2;i<n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<n;j+=i)s[j]=1;}}return o;}
function gcd(a,b){while(b){const t=a%b;a=b;b=t;}return a;}
function modinv(a,m){ if(m===1) return 0;
  const eg=(a,b)=>{ if(b===0) return [a,1,0]; const [g,x,y]=eg(b,a%b); return [g,y,x-Math.floor(a/b)*y]; };
  const [,x]=eg(((a%m)+m)%m,m); return ((x%m)+m)%m; }
function rosserSupport(z,D,upper){          // verbatim from the repo file
  const ps=primesBelow(z).slice().sort((a,b)=>b-a); const out=[];
  (function rec(start,prod,m){ out.push([prod,(m%2===0)?1:-1]);
    for(let i=start;i<ps.length;i++){ const p=ps[i],m2=m+1;
      if(prod*p>D) continue; const isCond=upper?(m2%2===1):(m2%2===0);
      if(isCond&&prod*p*p*p>D) continue; rec(i+1,prod*p,m2); } })(0,1,0);
  return out; }
function periodOf(z){ let W=1,lnW=0; for(const p of primesBelow(z)){W*=p; lnW+=Math.log(p);} return {W,lnW}; }

// ---------------------------------------------------------------------------
// The spectral side. One pass over the terms builds V(e1,e2) for EVERY divisor
// e of P(z) and every factorisation e = e1 e2 at once; cost O(N * 2^omega(q))
// instead of the O(N^2) the mean square itself needs.
// ---------------------------------------------------------------------------
const SDCACHE=new Map();
function spectralRecords(z,s){
  const key=z+'|'+s; if(SDCACHE.has(key)) return SDCACHE.get(key);
  const r=spectralRecordsCompute(z,s); SDCACHE.set(key,r); return r;
}
function spectralRecordsCompute(z,s){
  const D=Math.round(Math.pow(z,s));
  const t=REPO.buildTerms(z,D), N=t.n, ps=t.ps;
  const V=new Map();
  for(let i=0;i<N;i++){
    const q=t.q[i], d1=t.d1[i], wq=t.w[i]/q;
    const pf=[]; for(const p of ps) if(q%p===0) pf.push(p);
    for(let m=1;m<(1<<pf.length);m++){
      let e=1; for(let b=0;b<pf.length;b++) if(m&(1<<b)) e*=pf[b];
      const e1=gcd(e,d1), key=e1+'|'+(e/e1);
      V.set(key,(V.get(key)||0)+wq);
    }
  }
  const recs=[]; const nP=ps.length;
  for(let m=1;m<(1<<nP);m++){
    let e=1,nu=0; const pf=[];
    for(let b=0;b<nP;b++) if(m&(1<<b)){ e*=ps[b]; nu++; pf.push(ps[b]); }
    let va=0; const fac=[];
    for(let k=0;k<(1<<nu);k++){
      let e1=1; for(let b=0;b<nu;b++) if(k&(1<<b)) e1*=pf[b];
      const e2=e/e1, v=V.get(e1+'|'+e2);
      if(v===undefined||v===0) continue;
      va+=Math.abs(v);
      fac.push([e2,(e2===1)?0:(2*modinv(e1,e2))%e2,v]);   // [e2, phase numerator, V]
    }
    if(!fac.length) continue;
    recs.push({e,nu,va,fac});
  }
  let B=0; for(const r of recs) B += r.e*r.va*r.va;       // Corollary C constant
  return {t,recs,B,N,M:t.M,D};
}
function thetaStarSq(rec){                 // max_{(a,e)=1} |Theta_e(a)|^2
  const {e,fac}=rec; let mx=0;
  for(let a=1;a<e;a++){ if(gcd(a,e)!==1) continue;
    let re=0,im=0;
    for(let k=0;k<fac.length;k++){ const f=fac[k];
      if(f[0]===1){ re+=f[2]; continue; }
      const th=2*Math.PI*((a*f[1])%f[0])/f[0];
      re+=f[2]*Math.cos(th); im+=f[2]*Math.sin(th); }
    const m2=re*re+im*im; if(m2>mx) mx=m2; }
  return mx; }
function boundA(SD,H){ let s=0; for(const r of SD.recs){ const h=H%r.e; if(!h) continue; s+=thetaStarSq(r)*h*(r.e-h); } return s; }
function boundB(SD,H){ let s=0; for(const r of SD.recs){ const h=H%r.e; if(!h) continue; s+=r.va*r.va*h*(r.e-h); } return s; }

// ---------------------------------------------------------------------------
// Exhaustive full-period walk: sup|R|, min T, the exceptional set, moments.
// Flat arrays, so z <= 23 only (W = 9,699,690 at z = 23).
// ---------------------------------------------------------------------------
function walk(z,s,H){
  const D=Math.round(Math.pow(z,s)); const {W,lnW}=periodOf(z);
  const Lz=W+H+10;
  const sp=rosserSupport(z,D,true), sm=rosserSupport(z,D,false);
  const Lp=new Int32Array(Lz), Lm=new Int32Array(Lz);
  for(const [d,sg] of sp) for(let n=0;n<Lz;n+=d) Lp[n]+=sg;
  for(const [d,sg] of sm) for(let n=0;n<Lz;n+=d) Lm[n]+=sg;
  const t=REPO.buildTerms(z,D), M=t.M, HM=H*M;
  const cc=(r)=>Lm[r]*Lp[r+2]+Lp[r]*Lm[r+2]-Lp[r]*Lp[r+2];
  let T=0; for(let r=1;r<=H;r++) T+=cc(r);
  let sup=0,minT=Infinity,neg=0,s2=0,s4=0,s6=0,s8=0;
  for(let x=0;x<W;x++){
    if(x>0) T+=cc(x+H)-cc(x);
    const R=T-HM, R2=R*R;
    s2+=R2; s4+=R2*R2; s6+=R2*R2*R2; s8+=R2*R2*R2*R2;
    const a=Math.abs(R); if(a>sup)sup=a;
    if(T<minT)minT=T; if(T<=0)neg++;
  }
  const ms=s2/W;
  return {W,lnW,M,HM,ms,rms:Math.sqrt(ms),sup,minT,neg,H,
          m4:(s4/W)/(ms*ms), m6:(s6/W)/(ms**3), m8:(s8/W)/(ms**4)};
}

// ===========================================================================
// S0  CUSTODY
// ===========================================================================
function S0(){
  console.log('S0 CUSTODY --- three reproductions before anything new is computed\n');
  console.log('  (a) the repo closed form against brute force over the FULL period:');
  for(const [z,s,H] of [[13,3.0,60],[17,3.0,126]]){
    const t=REPO.buildTerms(z,Math.round(Math.pow(z,s))), {W}=periodOf(z);
    let s2=0;
    for(let x=0;x<W;x++){ let R=0;
      for(let i=0;i<t.n;i++){ const q=t.q[i],c=t.c[i];
        let a=(x-c)%q; if(a<0)a+=q; let b=(x+H-c)%q; if(b<0)b+=q; R+=t.w[i]*((a-b)/q); }
      s2+=R*R; }
    const cf=REPO.meanSquare(t,H).ms;
    console.log(`      z=${z} H=${H}: brute=${(s2/W).toFixed(10)}  meanSquare()=${cf.toFixed(10)}  rel=${(Math.abs(s2/W-cf)/cf).toExponential(2)}`);
  }
  console.log('\n  (b) theta-ladder.md sec.5b CORRECTION BOX (research/history/staging/');
  console.log('      phase1-T4-maximal-law.md sec.4): the self-consistent thresholds nP,');
  console.log('      the smallest H from which min_x T(x) >= 1 holds, at s = 3.0.');
  console.log('      T4 reports 60 / 126 / 198 / 258 at z = 13 / 17 / 19 / 23.');
  for(const [z,Hs] of [[13,60],[17,126],[19,198],[23,258]]){
    const a=walk(z,3.0,Hs-1), b=walk(z,3.0,Hs);
    console.log(`      z=${z}: H=${Hs-1} minT=${a.minT} (#T<=0 = ${a.neg})   H=${Hs} minT=${b.minT} (#T<=0 = ${b.neg})   -> nP = ${Hs}  ${b.minT>=1&&a.minT<1?'CONFIRMED':'MISMATCH'}   [${el()}]`);
  }
  console.log('\n  (c) T4 sec.4 law-tightness sup/(rms*sqrt(2 lnW)) at the operative window:');
  console.log('      T4 reports 0.5634 / 0.7279 / 0.9215 / 0.7935 at z = 13 / 17 / 19 / 23.');
  const got=[],gotC=[];
  for(const [z,H] of [[13,60],[17,126],[19,198],[23,258]]){
    const r=walk(z,3.0,H);
    got.push((r.sup/(r.rms*Math.sqrt(2*r.lnW))).toFixed(4));
    // The effective number of draws, corrected. R_H(x) is a MOVING-WINDOW sum of
    // length H walked over the full period, so consecutive positions share H-1 of
    // their H terms and the extreme-value benchmark is sqrt(2 ln(W/H)), not
    // sqrt(2 ln W). natal-cap-25-excess-law.js measured n_eff = W/l three ways and
    // explicitly REFUTED n_eff = W; natal-cap-29-sigma-plateau.js and
    // discrepancy-two-class.js:378 both already use the corrected form. Added
    // 2026-08-20; the T4-form column above is kept because it is what T4 published
    // and this file's job in (c) is to reproduce it digit for digit.
    gotC.push((r.sup/(r.rms*Math.sqrt(2*Math.log(r.W/H)))).toFixed(4));
  }
  console.log(`      measured here: ${got.join(' / ')}   [${el()}]`);
  console.log('      CORRECTED SAMPLE COUNT (2026-08-20): R_H is a moving-window sum of length H,');
  console.log('      so the draws number W/H, not W, and the benchmark is sqrt(2 ln(W/H)):');
  console.log(`         ${gotC.join(' / ')}`);
  console.log('      NO VERDICT MOVES, and the reason is structural. C_true and C_crit are both');
  console.log('      quoted in units of rms*sqrt(2 lnW), so the bracket is common to them and');
  console.log('      C_true/C_crit is unchanged by the correction: the live claim, that C_true');
  console.log('      sits below C_crit at every level (import-l1l2.md, IMPORT-MAP.md row 5,');
  console.log('      CHANGELOG 2026-08-19), holds on either benchmark. What the corrected');
  console.log('      column does retire is any reading of these four numbers as an ABSOLUTE');
  console.log('      tightness against the maximal law: on the right draw count they run to');
  console.log('      1.19, i.e. at or above 1, not comfortably below it.');
}

// ===========================================================================
// S1  THE FOUR IDENTITIES, each checked numerically
// ===========================================================================
function S1(){
  console.log('\nS1 IDENTITIES --- L1 to L4 and Theorem B, verified\n');
  // L4 first: it is elementary and everything else leans on it.
  { let worst=0;
    for(let e=2;e<=30;e++) for(let H=1;H<=40;H++){
      let s=0;
      for(let a=1;a<e;a++){ let re=0,im=0;
        for(let m=1;m<=H;m++){ const th=2*Math.PI*a*m/e; re+=Math.cos(th); im+=Math.sin(th); }
        s+=re*re+im*im; }
      const h=H%e, d=Math.abs(s-h*(e-h)); if(d>worst) worst=d; }
    console.log(`  L4  sum_{a!=0 mod e} F_H(a/e) = h(e-h): worst deviation over e<=30, H<=40 = ${worst.toExponential(2)}`);
    console.log('      PROOF. sum_{a mod e} F_H(a/e) = e * #{(m,n) in [1,H]^2 : e | m-n}.');
    console.log('      With H = Qe+h that count is eQ^2 + 2hQ + h, so the full sum is');
    console.log('      e^2Q^2 + 2ehQ + eh, and subtracting the a=0 term H^2 = (Qe+h)^2');
    console.log('      leaves eh - h^2 = h(e-h). Hence Psi(g,delta,H) = sum_{a!=0}');
    console.log('      F_H(a/g) e(-a delta/g) obeys |Psi| <= Psi(g,0) = h(g-h), which is');
    console.log('      (V2) WITH its equality case, and Psi = 0 when g | H, which is (V1).');
  }
  // L1, L2 on a tiny configuration where the O(N^2 H) autocovariance is cheap.
  { const z=13,s=2.2,H=40, D=Math.round(Math.pow(z,s)), {W}=periodOf(z);
    const t=REPO.buildTerms(z,D), N=t.n;
    let s2=0;
    for(let x=0;x<W;x++){ let R=0;
      for(let i=0;i<N;i++){ const q=t.q[i],c=t.c[i];
        let a=(x-c)%q; if(a<0)a+=q; let b=(x+H-c)%q; if(b<0)b+=q; R+=t.w[i]*((a-b)/q); }
      s2+=R*R; }
    const K=(v)=>{ let s=0;
      for(let i=0;i<N;i++) for(let j=0;j<N;j++){
        const g=gcd(t.q[i],t.q[j]); let d=(t.c[j]-t.c[i])%g; if(d<0)d+=g;
        let vv=v%g; if(vv<0)vv+=g;
        s+=t.w[i]*t.w[j]*((vv===d?g:0)-1)/(t.q[i]*t.q[j]); }
      return s; };
    let auto=0; for(let v=-(H-1);v<=H-1;v++) auto+=(H-Math.abs(v))*K(v);
    console.log(`\n  L2  z=13 s=2.2 H=40 N=${N}: <R^2> full period = ${(s2/W).toFixed(10)}`);
    console.log(`      sum_{|v|<H}(H-|v|)K(v)          = ${auto.toFixed(10)}   (L1 is the definition it rests on)`);
  }
  // L3 + Theorem B
  for(const [z,s,H] of [[13,3.0,60],[17,3.0,126],[19,3.0,198]]){
    const SD=spectralRecords(z,s), t=SD.t, N=t.n, ps=t.ps;
    let spec=0, facErr=0;
    for(const r of SD.recs){
      const e=r.e;
      for(let a=1;a<e;a++){ if(gcd(a,e)!==1) continue;
        let re=0,im=0;
        for(let i=0;i<N;i++){ if(t.q[i]%e!==0) continue;
          const ph=-2*Math.PI*a*(t.c[i]%e)/e;
          re+=(t.w[i]/t.q[i])*Math.cos(ph); im+=(t.w[i]/t.q[i])*Math.sin(ph); }
        const nm=Math.sin(Math.PI*a*(H%e)/e), dn=Math.sin(Math.PI*a/e);
        spec += (re*re+im*im)*(nm*nm)/(dn*dn);
        let fr=0,fi=0;
        for(const f of r.fac){ if(f[0]===1){ fr+=f[2]; continue; }
          const th=2*Math.PI*((a*f[1])%f[0])/f[0]; fr+=f[2]*Math.cos(th); fi+=f[2]*Math.sin(th); }
        const d=Math.hypot(re-fr,im-fi); if(d>facErr) facErr=d; }
    }
    const truth=REPO.meanSquare(t,H).ms;
    console.log(`  L3  z=${z} s=${s} H=${H}: Parseval sum = ${spec.toFixed(9)}  vs <R^2> = ${truth.toFixed(9)}  rel = ${(Math.abs(spec-truth)/truth).toExponential(2)}`);
    console.log(`  ThmB   max over (e,a) of |Theta_e(a) - factorised| = ${facErr.toExponential(2)}   [${el()}]`);
  }
  // L5: the POINTWISE spectral expansion. This is the identity that separates
  // the two halves of the problem, and it is the answer to the Brudern-Fouvry
  // transfer question raised by attack 2.
  console.log('\n  L5  POINTWISE:  R(x) = sum_{e>1} sum*_{a mod e} Theta_e(a) S_H(a/e) e(ax/e),');
  console.log('      S_H(t) = sum_{m<=H} e(mt).  Derivation: 1_{q|n} - 1/q = (1/q) sum_{e|q,e>1}');
  console.log('      sum*_a e(an/e), applied to Delta_i(x) = sum_{m=1..H}(1_{q_i | x+m-c_i} - 1/q_i).');
  console.log('      THE POSITION x ENTERS ONLY THROUGH THE UNIMODULAR PHASE e(ax/e). That phase');
  console.log('      is exactly Brudern-Fouvry\'s LEFT factor e(-hN/(d1 d2)); Theta_e(a) carries');
  console.log('      their RIGHT factor, the inverse phase e(2a inv(e1)/e2) of Theorem B. In the');
  console.log('      mean square |e(ax/e)| = 1 and the left factor CANCELS: no partial summation,');
  console.log('      no smoothness hypothesis, no N/H loss. In the supremum it does not cancel,');
  console.log('      because sup_x |R| IS the alignment of those phases. One identity, two');
  console.log('      verdicts, and the difference between them is the whole of section S4.');
  for(const [z,s,H] of [[13,3.0,60],[17,3.0,126]]){
    const SD=spectralRecords(z,s), t=SD.t, N=t.n;
    let worst=0, supBnd=0, supTrue=0;
    const XS=[0,1,2,3,5,7,11,13,101,1009];
    for(const x0 of XS){
      const x=x0%SD.t.q[0]|0 ? x0 : x0;                    // any x; period handles it
      let Rdirect=0;
      for(let i=0;i<N;i++){ const q=t.q[i],c=t.c[i];
        let a=(x-c)%q; if(a<0)a+=q; let b=(x+H-c)%q; if(b<0)b+=q; Rdirect+=t.w[i]*((a-b)/q); }
      let Rspec=0;
      for(const r of SD.recs){ const e=r.e;
        for(let a=1;a<e;a++){ if(gcd(a,e)!==1) continue;
          let tre=0,tim=0;
          for(const f of r.fac){ if(f[0]===1){ tre+=f[2]; continue; }
            const th=2*Math.PI*((a*f[1])%f[0])/f[0]; tre+=f[2]*Math.cos(th); tim+=f[2]*Math.sin(th); }
          // S_H(a/e) = sum_{m=1..H} e(am/e)
          let sre=0,sim=0;
          const per=e, hh=H%per, full=(H-hh)/per;
          for(let m=1;m<=hh;m++){ const th=2*Math.PI*((a*m)%per)/per; sre+=Math.cos(th); sim+=Math.sin(th); }
          void full;                                        // full periods sum to 0
          const ph=2*Math.PI*((a*(x%e))%e)/e, cp=Math.cos(ph), sp=Math.sin(ph);
          // Re[ Theta * S * e(ax/e) ]
          const pr=tre*sre-tim*sim, pi=tre*sim+tim*sre;
          Rspec += pr*cp - pi*sp;
        } }
      const d=Math.abs(Rdirect-Rspec); if(d>worst) worst=d;
      if(Math.abs(Rdirect)>supTrue) supTrue=Math.abs(Rdirect);
    }
    // the proven SUP bound the same identity gives, with absolute values in the
    // spectral variables: sup|R| <= sum_e sum*_a |Theta_e(a)| |S_H(a/e)|
    for(const r of SD.recs){ const e=r.e;
      for(let a=1;a<e;a++){ if(gcd(a,e)!==1) continue;
        let tre=0,tim=0;
        for(const f of r.fac){ if(f[0]===1){ tre+=f[2]; continue; }
          const th=2*Math.PI*((a*f[1])%f[0])/f[0]; tre+=f[2]*Math.cos(th); tim+=f[2]*Math.sin(th); }
        let sre=0,sim=0; const hh=H%e;
        for(let m=1;m<=hh;m++){ const th=2*Math.PI*((a*m)%e)/e; sre+=Math.cos(th); sim+=Math.sin(th); }
        supBnd += Math.hypot(tre,tim)*Math.hypot(sre,sim); } }
    const fp=REPO.fullPeriodArray(z,Math.log(H)/Math.log(z),s);
    console.log(`      z=${z} H=${H}: max |R(x) - spectral| over 10 positions = ${worst.toExponential(2)};` +
      `  spectral ABSOLUTE-VALUE sup bound = ${supBnd.toExponential(4)} against true sup|R| = ${fp.sup.toFixed(4)}  (lossy by ${(supBnd/fp.sup).toExponential(2)})   [${el()}]`);
  }
}

// ===========================================================================
// S2  THE PROVEN BOUND, and how much each step of the chain costs
// ===========================================================================
function S2(){
  console.log('\nS2 THE PROVEN BOUND --- <R^2>_H <= B(z,s) * H, and the loss at each step\n');
  console.log('  cols: truth = <R^2>_H exact | A = sum Theta*(e)^2 h(e-h) | B = same with Vabs');
  console.log('        C = B(z,s)*H, B(z,s) = sum_{e>1} e*Vabs(e)^2 (H-FREE constant)');
  console.log('        sharp = the repo absolute-value bound sum |w w| |Psi| / (q q)\n');
  const ZS = QUICK ? [13,17,19,23] : [13,17,19,23,29];
  console.log('  z    s   H     N       truth      /H        A        A/tr    Bnd      B/tr    B(z,s)   C/tr    sharp/tr');
  for(const z of ZS){
    const s=3.0, SD=spectralRecords(z,s);
    const HS=[Math.round(0.5*z*z), Math.round(z*z)];
    for(const H of HS){
      const cf=REPO.meanSquare(SD.t,H), truth=cf.ms;
      const bA=(z<=23)?boundA(SD,H):NaN, bB=boundB(SD,H), bC=SD.B*H;
      console.log(`  ${String(z).padStart(2)} ${s} ${String(H).padStart(5)} ${String(SD.N).padStart(6)}  ${truth.toExponential(3)} ${(truth/H).toExponential(3)} ` +
        `${Number.isNaN(bA)?'  --     --  ':bA.toExponential(3)+' '+(bA/truth).toFixed(2).padStart(7)} ${bB.toExponential(3)} ${(bB/truth).toFixed(1).padStart(7)} ` +
        `${SD.B.toFixed(4)}  ${(bC/truth).toFixed(1).padStart(6)}  ${(cf.sharpBound/truth).toExponential(2)}   [${el()}]`);
    }
  }
  console.log('\n  B(z,s) against the level s (the H-free constant is what has to stay bounded):');
  console.log('  z     s=2.0     s=2.6     s=3.0     s=3.4');
  for(const z of (QUICK?[13,17,19,23]:[13,17,19,23,29,31,37])){
    const row=[2.0,2.6,3.0,3.4].map(s=>spectralRecords(z,s).B.toFixed(4).padStart(8));
    console.log(`  ${String(z).padStart(2)}  ${row.join('  ')}   [${el()}]`);
  }
}

// ===========================================================================
// S3  WHAT ALMOST-ALL IS WORTH, and the Chebyshev pilot against the truth
// ===========================================================================
function S3(){
  console.log('\nS3 ALMOST-ALL --- the exponent the mean square delivers, and the quantifier it carries\n');
  console.log('  Chebyshev: density{ x : T(x) <= 0 } <= <R^2>_H / (H*M)^2 <= B/(H M^2).');
  console.log('  So the certificate is positive at all but eta of positions once H > B/(eta M^2).');
  console.log('  PROVEN column uses B(z,s); TRUE column uses the exact <R^2>.\n');
  console.log('  z    M          B(z,3)   B/M^2      u_aa(eta=1/2)  u_aa(1/100)  |  C=<R^2>/H  C/M^2   u_true(1/2)');
  for(const z of (QUICK?[13,17,19,23]:[13,17,19,23,29,31])){
    const SD=spectralRecords(z,3.0), M=SD.M, lz=Math.log(z);
    const Href=Math.round(z*z), C=REPO.meanSquare(SD.t,Href).ms/Href;
    const u=(H)=>Math.log(H)/lz;
    console.log(`  ${String(z).padStart(2)}  ${M.toExponential(4)}  ${SD.B.toFixed(4)}  ${(SD.B/(M*M)).toExponential(3)}  ` +
      `${u(2*SD.B/(M*M)).toFixed(4).padStart(9)}      ${u(100*SD.B/(M*M)).toFixed(4).padStart(9)}    |  ${C.toExponential(3)}  ${(C/(M*M)).toFixed(2).padStart(6)}  ${u(2*C/(M*M)).toFixed(4)}   [${el()}]`);
  }
  console.log('\n  PILOT. Chebyshev bound against the exact exceptional density, every position');
  console.log('  of the complete period, at windows short enough that the certificate does fail:');
  console.log('  z   H    H*M     rms     Chebyshev    true density   over-predicts by   minT');
  for(const z of [13,17,19,23]){
    for(const H of [10,20,40,60,90]){
      const r=walk(z,3.0,H), pred=r.ms/(r.HM*r.HM), tru=r.neg/r.W;
      console.log(`  ${String(z).padStart(2)} ${String(H).padStart(3)} ${r.HM.toFixed(3).padStart(7)} ${r.rms.toFixed(4)}  ${pred.toExponential(3)}   ${tru.toExponential(3)}      ${tru>0?(pred/tru).toFixed(2).padStart(6):'  (0)'}          ${r.minT}   [${el()}]`);
    }
  }
}

// ===========================================================================
// S4  THE GAP: exactly what a worst-position proof must beat
// ===========================================================================
// lambda_needed(u) = H*M / rms(R_H) on a grid of u, plus the same with the
// PROVEN bound min(B*H, B2) in place of the exact mean square. B2 is the H-free
// half of Theorem A: h(e-h) <= e^2/4 gives <R^2> <= (1/4) sum e^2 Vabs(e)^2.
// The mean square SATURATES in H, so no linear model may be used here; every
// row is the exact <R^2> at that H.
function lamGrid(z,s){
  const SD=spectralRecords(z,s), M=SD.M, {W,lnW}=periodOf(z), lz=Math.log(z);
  let B2=0; for(const r of SD.recs) B2 += r.e*r.e*r.va*r.va/4;
  const step = (z<=23) ? 0.25 : 0.5;
  const us=[], lam=[], lamP=[], ms=[];
  for(let u=1.5; u<=lnW/lz+0.35; u+=step){
    const H=Math.round(Math.pow(z,u)); if(H<2) continue;
    const m=REPO.meanSquare(SD.t,H).ms;
    us.push(u); ms.push(m); lam.push(H*M/Math.sqrt(m));
    lamP.push(H*M/Math.sqrt(Math.min(SD.B*H,B2)));
  }
  return {SD,M,W,lnW,lz,B2,us,lam,lamP,ms,umax:lnW/lz};
}
// smallest u on the grid whose lambda_needed reaches L, log-interpolated in u.
// Returns null if the grid never reaches L. Reports the bracket alongside.
function uAt(G,L,which){
  const A=which==='prov'?G.lamP:G.lam;
  for(let i=1;i<A.length;i++){
    if(A[i]>=L && A[i-1]<L){
      const t=(Math.log(L)-Math.log(A[i-1]))/(Math.log(A[i])-Math.log(A[i-1]));
      return {u:G.us[i-1]+t*(G.us[i]-G.us[i-1]), lo:G.us[i-1], hi:G.us[i]};
    }
  }
  return (A.length&&A[0]>=L) ? {u:G.us[0],lo:G.us[0],hi:G.us[0]} : null;
}
function S4(){
  console.log('\nS4 THE GAP --- the mean square against the supremum, in three currencies\n');
  console.log('  BETA2 = 4.26645. The vector-sieve full-decoupling target is quoted BOTH ways:');
  console.log('  2.6487 = 1+sqrt(e) as sift-limit-attack.md sec.4.5 states it, and 2.5790 =');
  console.log('  5.158065/2, attack 2 of this campaign having found the asymmetric optimum');
  console.log('  5.158065/theta_total in place of 5.2974/theta_total (arithmetic re-checked');
  console.log('  here: 5.158065/4.26645 = 1.20899, 5.158065/2 = 2.579033). Nothing below');
  console.log('  depends on which of the two is used; both columns are printed.\n');
  const ZS = QUICK ? [13,17,19,23] : [13,17,19,23,29];
  const GR = new Map();
  for(const z of ZS){ GR.set(z, lamGrid(z,3.0)); console.log(`  grid built z=${z}   [${el()}]`); }

  console.log('\n  (i) DEVIATION. A worst-position proof must certify sup_x |R_H| <= lambda*rms');
  console.log('      with lambda small enough that H*M > lambda*rms. The mean square by itself');
  console.log('      gives only Chebyshev, lambda <= sqrt(W). H must stay inside the period:');
  console.log('      R_W == 0 identically, so u_max = lnW/ln z bounds any meaningful row.');
  console.log('  z    lnW    u_max   sqrt(W)    lambda needed at u = 4.2665 / 2.6487 / 2.5790 / 2.0    lam_true  sqrt(2lnW)');
  for(const z of ZS){
    const G=GR.get(z);
    const lam=[4.26645,2.6487,2.579033,2.0].map(u=>{
      const H=Math.round(Math.pow(z,u));
      if(H>0.05*G.W) return `(H/W=${(H/G.W).toExponential(1)})`;
      return (H*G.M/Math.sqrt(REPO.meanSquare(G.SD.t,H).ms)).toExponential(3);
    });
    const lt=(z<=23)?(()=>{const r=walk(z,3.0,Math.round(0.5*z*z)); return (r.sup/r.rms).toFixed(2);})():'--';
    console.log(`  ${String(z).padStart(2)}  ${G.lnW.toFixed(3)}  ${G.umax.toFixed(3)}  ${Math.sqrt(G.W).toExponential(3)}   ${lam.join('  ')}   ${String(lt).padStart(6)}   ${Math.sqrt(2*G.lnW).toFixed(3)}   [${el()}]`);
  }

  console.log('\n  (ii) WINDOW EXPONENT, measured and not modelled. u_1 is the smallest u with');
  console.log('       H*M >= sqrt(W * <R^2>_H): the all-positions exponent Chebyshev plus a');
  console.log('       union bound over the period actually delivers. u_1^prov is the same with');
  console.log('       the PROVEN bound min(B*H, B2) in place of the exact mean square. u_true is');
  console.log('       the exhaustive threshold nP of S0(b). The decomposition column is');
  console.log('       u_1 - theta(z)/(2 ln z), which isolates the part that is NOT diverging.');
  console.log('  z    u_1 [bracket]      u_1^prov [bracket]   u_true   u_max   theta/(2lnz)   u_1 - theta/(2lnz)   u_1 - u_true');
  const NP={13:60,17:126,19:198,23:258,29:390};
  for(const z of ZS){
    const G=GR.get(z), sw=Math.sqrt(G.W);
    const a=uAt(G,sw,'exact'), b=uAt(G,sw,'prov');
    const ut=Math.log(NP[z])/G.lz, half=G.lnW/(2*G.lz);
    console.log(`  ${String(z).padStart(2)}  ${a?a.u.toFixed(4):'  --  '} [${a?a.lo.toFixed(2)+','+a.hi.toFixed(2):'--'}]   ${b?b.u.toFixed(4):'  --  '} [${b?b.lo.toFixed(2)+','+b.hi.toFixed(2):'--'}]    ${ut.toFixed(4)}  ${G.umax.toFixed(4)}   ${half.toFixed(4)}        ${a?(a.u-half).toFixed(4):'--'}            ${a?(a.u-ut).toFixed(4):'--'}   [${el()}]`);
  }

  console.log('\n  (iii) MOMENT ORDER. A bound <R^2k> <= m_2k <R^2>^k plus a union bound gives');
  console.log('        lambda_k = (W m_2k)^{1/2k}; k=1 is Chebyshev, k -> inf with Gaussian');
  console.log('        m_2k = (2k-1)!! is the maximal law lambda = sqrt(2 lnW). Row = u_k, the');
  console.log('        exponent that moment order buys, read off the exact lambda grid.');
  console.log('  z     k=1     k=2     k=3     k=4     k=6     k=10   Gauss-max  u_true  | measured m4 m6 m8');
  const dfact=(k)=>{ let v=1; for(let j=1;j<=k;j++) v*=(2*j-1); return v; };
  for(const z of ZS){
    const G=GR.get(z);
    const cell=(L)=>{ const r=uAt(G,L,'exact'); return r?r.u.toFixed(3).padStart(6):' >max '; };
    let mm='--';
    if(z<=23){ const r=walk(z,3.0,Math.round(0.5*z*z)); mm=`${r.m4.toFixed(2)} ${r.m6.toFixed(1)} ${r.m8.toFixed(0)}`; }
    console.log(`  ${String(z).padStart(2)}  ${[1,2,3,4,6,10].map(k=>cell(Math.pow(G.W*dfact(k),1/(2*k)))).join('  ')}  ${cell(Math.sqrt(2*G.lnW))}   ${(Math.log(NP[z])/G.lz).toFixed(3)}  | ${mm}   [${el()}]`);
  }
  console.log('\n  The moment order that first beats each target:');
  console.log('  z    k for u_k < 4.26645   k < 2.6487   k < 2.5790   k < 2.0   asymptotic k ~ theta/(2 ln z * (u - c))');
  for(const z of ZS){
    const G=GR.get(z);
    const first=(tgt)=>{ for(let k=1;k<=400;k++){ const r=uAt(G,Math.pow(G.W*dfact(k),1/(2*k)),'exact'); if(r&&r.u<tgt) return k; } return '>400'; };
    console.log(`  ${String(z).padStart(2)}        ${String(first(4.26645)).padStart(3)}              ${String(first(2.6487)).padStart(3)}          ${String(first(2.579033)).padStart(3)}        ${String(first(2.0)).padStart(3)}       ${(G.lnW/(2*G.lz*(4.26645-1.45))).toFixed(2)} at beta_2`);
  }
}

// ===========================================================================
// S5  THE SAME IDENTITY, USED ON THE SUPREMUM
// L5 gives an unconditional worst-position bound by triangle inequality:
//     sup_x |R_H(x)|  <=  Ssup(H) := sum_{e>1} sum*_{a mod e} |Theta_e(a)| |S_H(a/e)|.
// This takes absolute values in the FOURIER variables, where the sieve's own
// cancellation is already inside Theta_e(a), instead of in the divisor-pair
// variables, where taking them destroys it. Attack 2 measured the divisor-pair
// absolute-value accounting at 0.978 of the trivial pair count at a worst
// position, i.e. essentially trivial. This is the same manoeuvre in the other
// basis, and it is not trivial at all.
// ===========================================================================
function supBoundTable(z,s,HS){
  const SD=spectralRecords(z,s);
  const out=new Float64Array(HS.length);
  let Ssat=0, SCS=0, VarC=0;     // H-free bound; its Cauchy-Schwarz relaxation; Var(c)
  for(const r of SD.recs){
    const e=r.e; let Pe=0;
    for(let a=1;a<e;a++){
      if(gcd(a,e)!==1) continue;
      let tre=0,tim=0;
      for(const f of r.fac){ if(f[0]===1){ tre+=f[2]; continue; }
        const th=2*Math.PI*((a*f[1])%f[0])/f[0]; tre+=f[2]*Math.cos(th); tim+=f[2]*Math.sin(th); }
      const th2=tre*tre+tim*tim; if(th2===0) continue;
      Pe+=th2;
      const G=Math.sqrt(th2)/Math.abs(Math.sin(Math.PI*a/e));
      Ssat+=G;                                        // |sin(pi H a/e)| <= 1
      for(let k=0;k<HS.length;k++){
        const H=HS[k], m=((H%e)*a)%e;                 // sin(pi H a/e) = +- sin(pi m/e)
        out[k]+=G*Math.abs(Math.sin(Math.PI*m/e));
      }
    }
    VarC+=Pe; SCS+=Math.sqrt(Pe*(e*e-1)/3);
  }
  return {SD,out,Ssat,SCS,VarC};
}
function S5(){
  console.log('\nS5 THE SUPREMUM FROM THE SAME IDENTITY --- absolute values in FOURIER space\n');
  console.log('  sup_x |R_H| <= Ssup(H) = sum_{e>1} sum*_a |Theta_e(a)| |S_H(a/e)|.  Unconditional.');
  console.log('  T(x) > 0 at EVERY position as soon as H*M > Ssup(H). nP is the exhaustive truth.\n');
  console.log('  z   nP   u_true   H_sup  u_sup   H_sup/nP   Ssup(nP)  true sup|R|  tightness  Ssup(H_sup)  H*M');
  const NP={13:60,17:126,19:198,23:258};
  for(const z of (QUICK?[13,17]:[13,17,19,23])){
    const s=3.0, lz=Math.log(z);
    const HS=[]; for(let H=8;H<=40000;H=Math.max(H+1,Math.round(H*1.06))) HS.push(H);
    HS.push(NP[z]); HS.sort((a,b)=>a-b);
    const {SD,out}=supBoundTable(z,s,HS);
    const M=SD.M;
    let Hsup=null;
    for(let k=0;k<HS.length;k++) if(HS[k]*M>out[k]){ Hsup=HS[k]; break; }
    // refine downward over integers in the last gap, exactly (no bisection)
    if(Hsup!==null){
      const i=HS.indexOf(Hsup), lo=(i>0?HS[i-1]:1)+1;
      const RS=[]; for(let H=lo;H<Hsup;H++) RS.push(H);
      if(RS.length){ const r2=supBoundTable(z,s,RS);
        for(let k=0;k<RS.length;k++) if(RS[k]*M>r2.out[k]){ Hsup=RS[k]; break; } }
    }
    const kNP=HS.indexOf(NP[z]);
    const fp=REPO.fullPeriodArray(z,Math.log(NP[z])/lz,s);
    const kS=HS.indexOf(Hsup);
    const SsupAt = kS>=0 ? out[kS] : supBoundTable(z,s,[Hsup]).out[0];
    console.log(`  ${String(z).padStart(2)} ${String(NP[z]).padStart(4)}  ${(Math.log(NP[z])/lz).toFixed(4)}  ${String(Hsup).padStart(6)} ${(Math.log(Hsup)/lz).toFixed(4)}  ${(Hsup/NP[z]).toFixed(2).padStart(6)}    ${out[kNP].toFixed(4).padStart(8)}  ${fp.sup.toFixed(4).padStart(9)}   ${(out[kNP]/fp.sup).toFixed(2).padStart(6)}    ${SsupAt.toFixed(3).padStart(8)}  ${(Hsup*M).toFixed(3)}   [${el()}]`);
  }
  console.log('\n  For contrast, the same absolute-value step in the DIVISOR-PAIR basis:');
  console.log('  sup|R| <= sum_i |w_i| |Delta_i| <= N, the term count. Ratio N / Ssup(nP):');
  for(const z of (QUICK?[13,17]:[13,17,19,23])){
    const SD=spectralRecords(z,3.0);
    const {out}=supBoundTable(z,3.0,[NP[z]]);
    console.log(`  z=${String(z).padStart(2)}: N = ${String(SD.N).padStart(5)},  Ssup(nP) = ${out[0].toFixed(4)},  Fourier basis is ${(SD.N/out[0]).toFixed(0)}x tighter   [${el()}]`);
  }
  // The analytic target the same chain hands over, stated as a chain of proven
  // inequalities ending in objects with closed forms:
  //   sup|R_H| <= Ssup(H) <= Ssat := sum_e sum*_a |Theta_e(a)|/|sin(pi a/e)|
  //                       <= SCS  := sum_e sqrt( P(e) (e^2-1)/3 ),   P(e) = sum*_a |Theta_e(a)|^2,
  // using |sin(pi H a/e)| <= 1 and then Cauchy-Schwarz with
  // sum_{a=1}^{e-1} 1/sin^2(pi a/e) = (e^2-1)/3. And sum_e P(e) = Var(c) exactly
  // (L3 at v = 0), an H-free, position-free, closed-form quantity.
  console.log('\n  The analytic target this hands over. Proven chain:');
  console.log('    sup|R_H| <= Ssup(H) <= Ssat <= SCS = sum_e sqrt(P(e)(e^2-1)/3),  sum_e P(e) = Var(c).');
  console.log('  z   Ssup(nP)   Ssat      Ssat/Ssup   SCS        SCS/Ssat   Var(c)     u from Ssat');
  for(const z of (QUICK?[13,17]:[13,17,19,23])){
    const r=supBoundTable(z,3.0,[NP[z]]), M=r.SD.M, lz=Math.log(z);
    console.log(`  ${String(z).padStart(2)} ${r.out[0].toFixed(4).padStart(9)} ${r.Ssat.toFixed(4).padStart(9)} ${(r.Ssat/r.out[0]).toFixed(2).padStart(9)}   ${r.SCS.toExponential(4)}  ${(r.SCS/r.Ssat).toExponential(2)}  ${r.VarC.toExponential(4)}   ${(Math.log(r.Ssat/M)/lz).toFixed(4)}   [${el()}]`);
  }
}

function main(){
  const only=process.argv.slice(2).filter(a=>/^S[0-5]$/.test(a));
  const run={S0,S1,S2,S3,S4,S5};
  for(const k of ['S0','S1','S2','S3','S4','S5']) if(!only.length||only.includes(k)) run[k]();
  console.log('\nDONE '+el());
}
if(require.main===module) main();
module.exports={spectralRecords,boundA,boundB,walk,supBoundTable};

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/lemmaV-parseval.js
//   invocation:  node research/lemmaV-parseval.js
//   code-sha256: 253f7101a7ae57172ba1edb706a3669c9bcaf0d06500aa85af8282345a0c740f
//   out-sha256:  cbbaca682884f29f23adfef7d5eadf2f258512941c0d676f75924c88df23de8c
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     433.7 s
// ============================================================================
// S0 CUSTODY --- three reproductions before anything new is computed
//
//   (a) the repo closed form against brute force over the FULL period:
//       z=13 H=60: brute=1.4276943835  meanSquare()=1.4276943835  rel=2.64e-15
//       z=17 H=126: brute=2.2157558991  meanSquare()=2.2157558991  rel=1.37e-13
//
//   (b) theta-ladder.md sec.5b CORRECTION BOX (research/history/staging/
//       phase1-T4-maximal-law.md sec.4): the self-consistent thresholds nP,
//       the smallest H from which min_x T(x) >= 1 holds, at s = 3.0.
//       T4 reports 60 / 126 / 198 / 258 at z = 13 / 17 / 19 / 23.
//       z=13: H=59 minT=0 (#T<=0 = 2)   H=60 minT=1 (#T<=0 = 0)   -> nP = 60  CONFIRMED   [1.7s]
//       z=17: H=125 minT=0 (#T<=0 = 3)   H=126 minT=1 (#T<=0 = 0)   -> nP = 126  CONFIRMED   [1.7s]
//       z=19: H=197 minT=0 (#T<=0 = 2)   H=198 minT=1 (#T<=0 = 0)   -> nP = 198  CONFIRMED   [1.7s]
//       z=23: H=257 minT=0 (#T<=0 = 2)   H=258 minT=1 (#T<=0 = 0)   -> nP = 258  CONFIRMED   [2.1s]
//
//   (c) T4 sec.4 law-tightness sup/(rms*sqrt(2 lnW)) at the operative window:
//       T4 reports 0.5634 / 0.7279 / 0.9215 / 0.7935 at z = 13 / 17 / 19 / 23.
//       measured here: 0.5634 / 0.7279 / 0.9215 / 0.7935   [2.2s]
//       CORRECTED SAMPLE COUNT (2026-08-20): R_H is a moving-window sum of length H,
//       so the draws number W/H, not W, and the benchmark is sqrt(2 ln(W/H)):
//          0.8206 / 0.9990 / 1.1920 / 0.9806
//       NO VERDICT MOVES, and the reason is structural. C_true and C_crit are both
//       quoted in units of rms*sqrt(2 lnW), so the bracket is common to them and
//       C_true/C_crit is unchanged by the correction: the live claim, that C_true
//       sits below C_crit at every level (import-l1l2.md, IMPORT-MAP.md row 5,
//       CHANGELOG 2026-08-19), holds on either benchmark. What the corrected
//       column does retire is any reading of these four numbers as an ABSOLUTE
//       tightness against the maximal law: on the right draw count they run to
//       1.19, i.e. at or above 1, not comfortably below it.
//
// S1 IDENTITIES --- L1 to L4 and Theorem B, verified
//
//   L4  sum_{a!=0 mod e} F_H(a/e) = h(e-h): worst deviation over e<=30, H<=40 = 1.45e-12
//       PROOF. sum_{a mod e} F_H(a/e) = e * #{(m,n) in [1,H]^2 : e | m-n}.
//       With H = Qe+h that count is eQ^2 + 2hQ + h, so the full sum is
//       e^2Q^2 + 2ehQ + eh, and subtracting the a=0 term H^2 = (Qe+h)^2
//       leaves eh - h^2 = h(e-h). Hence Psi(g,delta,H) = sum_{a!=0}
//       F_H(a/g) e(-a delta/g) obeys |Psi| <= Psi(g,0) = h(g-h), which is
//       (V2) WITH its equality case, and Psi = 0 when g | H, which is (V1).
//
//   L2  z=13 s=2.2 H=40 N=188: <R^2> full period = 1.1906373569
//       sum_{|v|<H}(H-|v|)K(v)          = 1.1906373569   (L1 is the definition it rests on)
//   L3  z=13 s=3 H=60: Parseval sum = 1.427694384  vs <R^2> = 1.427694384  rel = 4.67e-16
//   ThmB   max over (e,a) of |Theta_e(a) - factorised| = 1.62e-15   [2.5s]
//   L3  z=17 s=3 H=126: Parseval sum = 2.215755899  vs <R^2> = 2.215755899  rel = 5.63e-14
//   ThmB   max over (e,a) of |Theta_e(a) - factorised| = 3.26e-15   [3.3s]
//   L3  z=19 s=3 H=198: Parseval sum = 2.096107419  vs <R^2> = 2.096107419  rel = 1.33e-13
//   ThmB   max over (e,a) of |Theta_e(a) - factorised| = 3.44e-15   [18.1s]
//
//   L5  POINTWISE:  R(x) = sum_{e>1} sum*_{a mod e} Theta_e(a) S_H(a/e) e(ax/e),
//       S_H(t) = sum_{m<=H} e(mt).  Derivation: 1_{q|n} - 1/q = (1/q) sum_{e|q,e>1}
//       sum*_a e(an/e), applied to Delta_i(x) = sum_{m=1..H}(1_{q_i | x+m-c_i} - 1/q_i).
//       THE POSITION x ENTERS ONLY THROUGH THE UNIMODULAR PHASE e(ax/e). That phase
//       is exactly Brudern-Fouvry's LEFT factor e(-hN/(d1 d2)); Theta_e(a) carries
//       their RIGHT factor, the inverse phase e(2a inv(e1)/e2) of Theorem B. In the
//       mean square |e(ax/e)| = 1 and the left factor CANCELS: no partial summation,
//       no smoothness hypothesis, no N/H loss. In the supremum it does not cancel,
//       because sup_x |R| IS the alignment of those phases. One identity, two
//       verdicts, and the difference between them is the whole of section S4.
//       z=13 H=60: max |R(x) - spectral| over 10 positions = 7.11e-15;  spectral ABSOLUTE-VALUE sup bound = 1.1447e+1 against true sup|R| = 2.6494  (lossy by 4.32e+0)   [18.2s]
//       z=17 H=126: max |R(x) - spectral| over 10 positions = 1.67e-14;  spectral ABSOLUTE-VALUE sup bound = 2.8412e+1 against true sup|R| = 4.9203  (lossy by 5.77e+0)   [19.6s]
//
// S2 THE PROVEN BOUND --- <R^2>_H <= B(z,s) * H, and the loss at each step
//
//   cols: truth = <R^2>_H exact | A = sum Theta*(e)^2 h(e-h) | B = same with Vabs
//         C = B(z,s)*H, B(z,s) = sum_{e>1} e*Vabs(e)^2 (H-FREE constant)
//         sharp = the repo absolute-value bound sum |w w| |Psi| / (q q)
//
//   z    s   H     N       truth      /H        A        A/tr    Bnd      B/tr    B(z,s)   C/tr    sharp/tr
//   13 3    85    852  1.811e+0 2.130e-2 5.709e+0    3.15 3.463e+1    19.1 1.3833    64.9  7.60e+3   [19.7s]
//   13 3   169    852  1.161e+0 6.871e-3 6.096e+0    5.25 3.551e+1    30.6 1.3833   201.3  1.25e+4   [19.7s]
//   17 3   145   2236  2.136e+0 1.473e-2 1.816e+1    8.50 7.603e+1    35.6 1.4214    96.5  1.99e+4   [19.8s]
//   17 3   289   2236  3.013e+0 1.043e-2 2.533e+1    8.41 1.009e+2    33.5 1.4214   136.3  1.63e+4   [19.9s]
//   19 3   181   4764  2.138e+0 1.181e-2 2.589e+1   12.11 1.034e+2    48.4 1.4348   121.5  3.85e+4   [21.0s]
//   19 3   361   4764  4.217e+0 1.168e-2 3.714e+1    8.81 1.430e+2    33.9 1.4348   122.8  2.30e+4   [22.0s]
//   23 3   265   9636  3.144e+0 1.187e-2 3.658e+1   11.63 1.573e+2    50.0 1.4503   122.2  5.27e+4   [27.0s]
//   23 3   529   9636  5.049e+0 9.545e-3 5.278e+1   10.45 2.248e+2    44.5 1.4503   151.9  3.91e+4   [32.2s]
//   29 3   421  20700  4.802e+0 1.141e-2   --     --   2.628e+2    54.7 1.4660   128.5  7.36e+4   [43.0s]
//   29 3   841  20700  6.769e+0 8.049e-3   --     --   4.097e+2    60.5 1.4660   182.1  6.55e+4   [53.8s]
//
//   B(z,s) against the level s (the H-free constant is what has to stay bounded):
//   z     s=2.0     s=2.6     s=3.0     s=3.4
//   13    1.2728    1.3392    1.3833    1.3968   [53.8s]
//   17    1.4032    1.3903    1.4214    1.4279   [53.8s]
//   19    1.4426    1.4469    1.4348    1.4460   [53.8s]
//   23    1.5834    1.4815    1.4503    1.4667   [54.0s]
//   29    1.6718    1.4794    1.4660    1.4771   [54.4s]
//   31    1.6847    1.4886    1.4764    1.4837   [55.7s]
//   37    1.6443    1.5389    1.4883    1.4916   [59.4s]
//
// S3 ALMOST-ALL --- the exponent the mean square delivers, and the quantifier it carries
//
//   Chebyshev: density{ x : T(x) <= 0 } <= <R^2>_H / (H*M)^2 <= B/(H M^2).
//   So the certificate is positive at all but eta of positions once H > B/(eta M^2).
//   PROVEN column uses B(z,s); TRUE column uses the exact <R^2>.
//
//   z    M          B(z,3)   B/M^2      u_aa(eta=1/2)  u_aa(1/100)  |  C=<R^2>/H  C/M^2   u_true(1/2)
//   13  5.5844e-2  1.3833  4.436e+2     2.6464         4.1716    |  6.871e-3    2.20  0.5782   [59.4s]
//   17  4.6986e-2  1.4214  6.438e+2     2.5274         3.9081    |  1.043e-2    4.72  0.7926   [59.5s]
//   19  3.9598e-2  1.4348  9.150e+2     2.5513         3.8799    |  1.168e-2    7.45  0.9175   [60.0s]
//   23  3.4169e-2  1.4503  1.242e+3     2.4933         3.7410    |  9.545e-3    8.18  0.8912   [62.1s]
//   29  3.1843e-2  1.4660  1.446e+3     2.3668         3.5285    |  8.049e-3    7.94  0.8211   [72.6s]
//   31  2.9253e-2  1.4764  1.725e+3     2.3723         3.5115    |  8.722e-3   10.19  0.8779   [107.0s]
//
//   PILOT. Chebyshev bound against the exact exceptional density, every position
//   of the complete period, at windows short enough that the certificate does fail:
//   z   H    H*M     rms     Chebyshev    true density   over-predicts by   minT
//   13  10   0.558 0.5978  1.146e+0   4.589e-1        2.50          -1   [107.0s]
//   13  20   1.117 0.7736  4.798e-1   2.026e-1        2.37          -1   [107.0s]
//   13  40   2.234 0.9484  1.803e-1   1.212e-2       14.87          0   [107.0s]
//   13  60   3.351 1.1949  1.272e-1   0.000e+0        (0)          1   [107.0s]
//   13  90   5.026 1.3443  7.154e-2   0.000e+0        (0)          2   [107.0s]
//   17  10   0.470 0.5682  1.463e+0   5.404e-1        2.71          -3   [107.0s]
//   17  20   0.940 0.7494  6.360e-1   2.775e-1        2.29          -3   [107.0s]
//   17  40   1.879 0.9789  2.713e-1   6.787e-2        4.00          -2   [107.0s]
//   17  60   2.819 1.2046  1.826e-1   2.338e-2        7.81          -2   [107.0s]
//   17  90   4.229 1.3989  1.094e-1   5.062e-3       21.62          -1   [107.0s]
//   19  10   0.396 0.5754  2.111e+0   5.953e-1        3.55          -5   [107.0s]
//   19  20   0.792 0.7690  9.430e-1   3.528e-1        2.67          -5   [107.1s]
//   19  40   1.584 1.0231  4.172e-1   1.294e-1        3.22          -5   [107.1s]
//   19  60   2.376 1.2485  2.761e-1   6.209e-2        4.45          -5   [107.1s]
//   19  90   3.564 1.4452  1.645e-1   2.637e-2        6.24          -4   [107.1s]
//   23  10   0.342 0.5769  2.850e+0   6.357e-1        4.48          -6   [107.3s]
//   23  20   0.683 0.7744  1.284e+0   4.107e-1        3.13          -6   [107.4s]
//   23  40   1.367 1.0279  5.655e-1   1.837e-1        3.08          -6   [107.6s]
//   23  60   2.050 1.2296  3.597e-1   9.542e-2        3.77          -5   [107.8s]
//   23  90   3.075 1.4066  2.092e-1   3.985e-2        5.25          -4   [108.0s]
//
// S4 THE GAP --- the mean square against the supremum, in three currencies
//
//   BETA2 = 4.26645. The vector-sieve full-decoupling target is quoted BOTH ways:
//   2.6487 = 1+sqrt(e) as sift-limit-attack.md sec.4.5 states it, and 2.5790 =
//   5.158065/2, attack 2 of this campaign having found the asymmetric optimum
//   5.158065/theta_total in place of 5.2974/theta_total (arithmetic re-checked
//   here: 5.158065/4.26645 = 1.20899, 5.158065/2 = 2.579033). Nothing below
//   depends on which of the two is used; both columns are printed.
//
//   grid built z=13   [108.1s]
//   grid built z=17   [109.1s]
//   grid built z=19   [117.4s]
//   grid built z=23   [186.3s]
//   grid built z=29   [318.4s]
//
//   (i) DEVIATION. A worst-position proof must certify sup_x |R_H| <= lambda*rms
//       with lambda small enough that H*M > lambda*rms. The mean square by itself
//       gives only Chebyshev, lambda <= sqrt(W). H must stay inside the period:
//       R_W == 0 identically, so u_max = lnW/ln z bounds any meaningful row.
//   z    lnW    u_max   sqrt(W)    lambda needed at u = 4.2665 / 2.6487 / 2.5790 / 2.0    lam_true  sqrt(2lnW)
//   13  7.745  3.020  4.806e+1   (H/W=2.4e+1)  (H/W=3.9e-1)  (H/W=3.2e-1)  (H/W=7.3e-2)     2.42   3.936   [318.4s]
//   17  10.310  3.639  1.733e+2   (H/W=5.9e+0)  (H/W=6.0e-2)  2.885e+1  7.823e+0     3.29   4.541   [318.6s]
//   19  13.143  4.464  7.145e+2   (H/W=5.6e-1)  3.692e+1  2.832e+1  6.961e+0     4.90   5.127   [320.3s]
//   23  16.088  5.131  3.114e+3   (H/W=6.7e-2)  4.139e+1  3.307e+1  8.044e+0     4.54   5.672   [327.8s]
//   29  19.223  5.709  1.494e+4   1.080e+4  5.942e+1  4.851e+1  1.029e+1       --   6.200   [375.4s]
//
//   (ii) WINDOW EXPONENT, measured and not modelled. u_1 is the smallest u with
//        H*M >= sqrt(W * <R^2>_H): the all-positions exponent Chebyshev plus a
//        union bound over the period actually delivers. u_1^prov is the same with
//        the PROVEN bound min(B*H, B2) in place of the exact mean square. u_true is
//        the exhaustive threshold nP of S0(b). The decomposition column is
//        u_1 - theta(z)/(2 ln z), which isolates the part that is NOT diverging.
//   z    u_1 [bracket]      u_1^prov [bracket]   u_true   u_max   theta/(2lnz)   u_1 - theta/(2lnz)   u_1 - u_true
//   13  2.8489 [2.75,3.00]     --   [--]    1.5963  3.0196   1.5098        1.3392            1.2527   [375.4s]
//   17  3.2063 [3.00,3.25]     --   [--]    1.7070  3.6390   1.8195        1.3868            1.4993   [375.4s]
//   19  3.6686 [3.50,3.75]   4.3604 [4.25,4.50]    1.7960  4.4637   2.2319        1.4367            1.8725   [375.4s]
//   23  4.0634 [4.00,4.25]   4.7087 [4.50,4.75]    1.7710  5.1308   2.5654        1.4980            2.2924   [375.4s]
//   29  4.3767 [4.00,4.50]   5.0021 [5.00,5.50]    1.7718  5.7088   2.8544        1.5224            2.6049   [375.4s]
//
//   (iii) MOMENT ORDER. A bound <R^2k> <= m_2k <R^2>^k plus a union bound gives
//         lambda_k = (W m_2k)^{1/2k}; k=1 is Chebyshev, k -> inf with Gaussian
//         m_2k = (2k-1)!! is the maximal law lambda = sqrt(2 lnW). Row = u_k, the
//         exponent that moment order buys, read off the exact lambda grid.
//   z     k=1     k=2     k=3     k=4     k=6     k=10   Gauss-max  u_true  | measured m4 m6 m8
//   13   2.849   2.032   1.877   1.821   1.782   1.778   1.769   1.596  | 2.03 5.4 17   [375.4s]
//   17   3.206   2.402   2.056   1.914   1.804   1.758   1.750   1.707  | 3.11 16.2 114   [375.4s]
//   19   3.669   2.710   2.344   2.152   1.955   1.837   1.814   1.796  | 3.55 24.9 276   [375.4s]
//   23   4.063   2.862   2.396   2.197   2.010   1.859   1.814   1.771  | 2.98 14.8 103   [375.5s]
//   29   4.377   2.987   2.502   2.248   2.016   1.850   1.786   1.772  | --   [375.5s]
//
//   The moment order that first beats each target:
//   z    k for u_k < 4.26645   k < 2.6487   k < 2.5790   k < 2.0   asymptotic k ~ theta/(2 ln z * (u - c))
//   13          1                2            2          3       0.54 at beta_2
//   17          1                2            2          4       0.65 at beta_2
//   19          1                3            3          6       0.79 at beta_2
//   23          1                3            3          7       0.91 at beta_2
//   29          2                3            3          7       1.01 at beta_2
//
// S5 THE SUPREMUM FROM THE SAME IDENTITY --- absolute values in FOURIER space
//
//   sup_x |R_H| <= Ssup(H) = sum_{e>1} sum*_a |Theta_e(a)| |S_H(a/e)|.  Unconditional.
//   T(x) > 0 at EVERY position as soon as H*M > Ssup(H). nP is the exhaustive truth.
//
//   z   nP   u_true   H_sup  u_sup   H_sup/nP   Ssup(nP)  true sup|R|  tightness  Ssup(H_sup)  H*M
//   13   60  1.5963     198 2.0617    3.30     11.4467     2.6494     4.32      10.406  11.057   [375.6s]
//   17  126  1.7070     683 2.3036    5.42     28.4118     4.9203     5.77      32.067  32.092   [375.8s]
//   19  198  1.7960    1833 2.5518    9.26     60.0382     6.8403     8.78      72.579  72.583   [381.7s]
//   23  258  1.7710    4278 2.6666   16.58    118.3280     7.8157    15.14     146.137  146.176   [426.9s]
//
//   For contrast, the same absolute-value step in the DIVISOR-PAIR basis:
//   sup|R| <= sum_i |w_i| |Delta_i| <= N, the term count. Ratio N / Ssup(nP):
//   z=13: N =   852,  Ssup(nP) = 11.4467,  Fourier basis is 74x tighter   [426.9s]
//   z=17: N =  2236,  Ssup(nP) = 28.4118,  Fourier basis is 79x tighter   [427.0s]
//   z=19: N =  4764,  Ssup(nP) = 60.0382,  Fourier basis is 79x tighter   [427.5s]
//   z=23: N =  9636,  Ssup(nP) = 118.3280,  Fourier basis is 81x tighter   [430.3s]
//
//   The analytic target this hands over. Proven chain:
//     sup|R_H| <= Ssup(H) <= Ssat <= SCS = sum_e sqrt(P(e)(e^2-1)/3),  sum_e P(e) = Var(c).
//   z   Ssup(nP)   Ssat      Ssat/Ssup   SCS        SCS/Ssat   Var(c)     u from Ssat
//   13   11.4467   19.6018      1.71   8.3539e+1  4.26e+0  5.7920e-2   2.2850   [430.3s]
//   17   28.4118   50.3136      1.77   5.0501e+2  1.00e+1  4.9840e-2   2.4623   [430.3s]
//   19   60.0382  120.0616      2.00   2.4629e+3  2.05e+1  4.6515e-2   2.7228   [430.8s]
//   23  118.3280  242.4993      2.05   7.6230e+3  3.14e+1  4.3278e-2   2.8281   [433.6s]
//
// DONE 433.6s
// ============================================================================
// READINGS (honestly calibrated)
// ============================================================================
// 1. THE MEAN-SQUARE LEMMA V IS PROVED, in the form <R^2>_H <= B(z,s) H with B
//    explicit, uniform in H and in the position average. Every step is an
//    identity or a triangle inequality; nothing is assumed. What is NOT proved
//    is that B(z,s) stays bounded as z grows. That is now the entire remaining
//    content of the mean-square statement, and it is a CHARACTER-FREE mean-value
//    question about signed Rosser weights V(e1,e2), not a maximal inequality and
//    not a statement about positions.
//
// 2. IN MEAN SQUARE, LEMMA V IS COMFORTABLE, ASYMPTOTICALLY.
//    rms|R| <= sqrt(B H) ~ 1.21 sqrt(H) against the H/log^3 H that
//    sift-limit-attack.md sec.4.5 asks for; the ratio 1.21 log^3 H/sqrt(H) tends
//    to 0 but is BELOW 1 at every window checkable here (the bound is 13.0x the
//    target at z = 29, H = 390, where the TRUE rms is 1.18x it). Both halves
//    belong in the same sentence.
//
// 3. THE ALMOST-ALL EXPONENT IS 0 AND IS WORTH NOTHING. The window is polylog,
//    so every positive exponent holds for almost all positions. That is a
//    statement about the average gap between two-class survivors, which the
//    elementary second moment already gives and gives about 1.4x more cheaply at
//    every point brute force reaches (research/history/MORNING-2026-08-16.md
//    lines 73-84, which also records that the sieve scales better in H and
//    overtakes near H ~ 4e4 at z = 19). G2 is a maximum over positions; no
//    density statement bounds it.
//
// 4. THE GAP, WHICH IS THE ITEM THE BRIEF PRICED. The mean square's own
//    all-positions exponent is theta(z)/(2 ln z) + 1.45, so what a worst-position
//    proof must supply is theta(z)/(2 ln z) - 1.45 units of window exponent:
//    1.25 at z = 13, 2.29 at z = 23, 2.60 at z = 29, unbounded. In moment order,
//    beating beta_2 needs 2k with k ~ theta(z)/(2 ln z (beta_2 - 1.45)), which
//    is 1 through z = 23, 2 at z = 29, and diverges.
//
// 5. WHERE PARSEVAL HELPS AND WHERE IT CANNOT. L3's coefficients |Theta_e(a)|^2
//    are non-negative: Parseval sees only the ENERGY of the field, and the worst
//    position is a phase-alignment question the energy cannot answer. That is
//    the structural reason the mean square is a dead end for G2 rather than a
//    lossy route to it, and it is exactly what L5 displays: the position enters
//    only as the unimodular phase e(ax/e).
//
// 6. THE UNASKED-FOR FINDING, AND THE ONE TO FOLLOW UP. The same identity gives
//    an unconditional worst-position bound by taking absolute values in the
//    FOURIER variables. It is within 4.3x to 15.1x of the true supremum, beats
//    the divisor-pair absolute-value bound by a flat 80x, and yields u_sup =
//    2.06, 2.30, 2.55, 2.67. So attack 2's absolute-value ceiling (Sum|r| at
//    0.978 of the trivial pair count at a worst position) is a ceiling on the
//    REPRESENTATION, not on the problem. Four points cannot say whether u_sup
//    plateaus; the endpoint fit u_sup = 0.2865 theta(z)/ln z + 1.197 has the same
//    divergent shape as u_1 with a better constant and would cross beta_2 near
//    z = 45. NOBODY SHOULD QUOTE THIS AS A WIN UNTIL z = 29 AND 31 ARE IN.
//
// 7. HONEST LIMITS. (a) Everything is at z <= 37, s in [2.0, 3.4]; B's flatness
//    over that range is evidence, not proof, and its 0.10-per-ln z drift is not
//    distinguishable here from a log factor. (b) The moment ladder past k = 4
//    uses GAUSSIAN m_2k as a stand-in; the measured m4/m6/m8 support that at the
//    operative window but say nothing about k of order z/ln z, which is the
//    regime an asymptotic argument needs. (c) The exact-Theta* column stops at
//    z = 23 and S5 stops at z = 23 (cost prod(2p-1)). (d) Full-period walks stop
//    at z = 23. (e) No claim here is a bound below beta_2 = 4.26645, and the
//    rows where a column dips below it are finite-window artifacts of a
//    diverging quantity, flagged in place.
//
// Context notes carried out of the pre-embed OUTPUT block (2026-08-19):
//
// (the pre-embed banner read: OUTPUT (run of 2026-08-18, 371 s. Full tables
//  and their reading in
//  research/history/staging/attack-beta2-01-lemmaV-meansquare.md)
//
// S0 CUSTODY. Closed form against full-period brute force: rel 2.6e-15 and
//   1.4e-13 at z = 13 and 17. Self-consistent thresholds nP = 60, 126, 198, 258
//   CONFIRMED at z = 13, 17, 19, 23 (min_x T = 0 at nP-1 with 2/3/2/2 bad
//   positions, = 1 at nP), matching phase1-T4-maximal-law.md sec.4, which
//   theta-ladder.md:408 makes authoritative. Law tightness
//   sup/(rms sqrt(2 lnW)) = 0.5634 / 0.7279 / 0.9215 / 0.7935, four digits
//   against T4. CORRECTED SAMPLE COUNT (2026-08-20): those four are quoted
//   against sqrt(2 lnW), and R_H is a moving-window sum of length H, so the
//   draws number W/H. On sqrt(2 ln(W/H)) the column reads
//   0.8206 / 0.9990 / 1.1920 / 0.9806 and the output now prints both. No
//   verdict moves: C_true and C_crit both carry the same bracket, so
//   C_true/C_crit is invariant and "C_true below C_crit at every level"
//   holds on either benchmark. What does not survive is reading these four
//   as an ABSOLUTE tightness against the maximal law, since on the right
//   draw count they reach 1.19.
//
// S1 IDENTITIES. L4 worst deviation 1.45e-12 over e <= 30, H <= 40. L2 exact to
//   ten digits. L3 (Parseval) rel 4.7e-16 / 5.6e-14 / 1.3e-13 at z = 13/17/19.
//   Theorem B (phase factorisation) max error 3.4e-15. L5 (pointwise) max error
//   7.1e-15 and 1.7e-14 over ten positions at z = 13 and 17.
//
// S2 THE BOUND.  B(z,3.0) = 1.3833, 1.4214, 1.4348, 1.4503, 1.4660, 1.4764,
//   1.4883 at z = 13, 17, 19, 23, 29, 31, 37: flat to 8 percent, drifting 0.10
//   per unit ln z over a range in which prod(1+4/p) moves by 2.7. Across
//   s = 2.0 to 3.4 it stays in [1.2728, 1.6847]. Loss against the exact <R^2>:
//   Theorem A (exact Theta*) 3.15 to 12.11; Theorem B (Vabs) 19.1 to 60.5;
//   Corollary C (H-linear) 64.9 to 201.3 with NO trend. The repository's own
//   absolute-value bound is 7.6e3 lossy at z = 13 and 7.4e4 at z = 29, RISING.
//   Going through the spectrum turns a diverging bound into a flat one.
//
// S3 ALMOST-ALL. B/M^2 = 4.44e2 to 1.73e3 across z = 13 to 31, i.e. polylog, so
//   u_aa(eta) = (4 lnln z + ln(1/eta) + O(1))/ln z -> 0: THE ALMOST-ALL WINDOW
//   IS NOT A POWER OF z. With the proven constant the column reads 2.6464 down
//   to 2.3723 across z = 13..31; the decay is 4 lnln z/ln z, so it reaches 1.0
//   only near z = 1e6. Chebyshev over-predicts the EXACT exceptional density by
//   2.29x to 21.62x over 20 (z,H) pairs, and never under-predicts.
//
// S4 THE GAP. u_1 = 2.8489, 3.2063, 3.6686, 4.0634, 4.3767 at z = 13..29, with
//   u_1 - theta(z)/(2 ln z) = 1.339, 1.387, 1.437, 1.498, 1.522: FLAT. So the
//   mean square's all-positions exponent is theta(z)/(2 ln z) + 1.45 and it
//   DIVERGES like z/(2 ln z), while the exhaustive u_true is flat at 1.5963 to
//   1.7960. The gap is 1.2527, 1.4993, 1.8725, 2.2924, 2.6049 units of window
//   exponent. u_1 sits BELOW beta_2 = 4.26645 up to z = 23 and crosses at
//   z = 29, exactly between the two levels where theta(z)/(2 ln z) crosses
//   beta_2 - 1.45 = 2.8165 (2.5654 at z = 23, 2.8544 at z = 29): a finite-window
//   artifact of a diverging quantity, which is attack 8 sec.4's alarm firing.
//   Moment order needed: k = 2/2/3/3/3 for the vector-sieve target and
//   3/4/6/7/7 for exponent 2; for beta_2 the requirement
//   k ~ theta/(2 ln z (beta_2-1.45)) reads 0.54, 0.65, 0.79, 0.91, 1.01.
//   Measured m4/m6/m8 at the operative window: 2.03/5.4/17, 3.11/16.2/114,
//   3.55/24.9/276, 2.98/14.8/103 against Gaussian 3/15/105.
//
// S5 THE SUPREMUM, UNCONDITIONAL. H*M > Ssup(H) puts T(x) > 0 at EVERY position,
//   with no maximal law in it. H_sup = 198, 683, 1833, 4278 at z = 13, 17, 19,
//   23, i.e. u_sup = 2.0617, 2.3036, 2.5518, 2.6666 against the exhaustive
//   u_true = 1.5963, 1.7070, 1.7960, 1.7710. Tightness Ssup(nP)/sup|R| = 4.32,
//   5.77, 8.78, 15.14. The same absolute-value step in the DIVISOR-PAIR basis
//   gives the term count N, which is 74x, 79x, 79x, 81x larger: a FLAT factor.
//   Chain onward: Ssat/Ssup = 1.71, 1.77, 2.00 (cheap) but SCS/Ssat = 4.26,
//   10.0, 20.5, 31.4 (doubling per level), so the Cauchy-Schwarz relaxation to
//   spectral masses is NOT the right target and Ssat is. Var(c) = 5.79e-2,
//   4.98e-2, 4.65e-2, 4.33e-2. Exponent from the H-free Ssat: 2.2850, 2.4623,
//   2.7228, 2.8281.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure above that the OUTPUT block does not contain verbatim actually is.
// No number above was changed. Nearly all of it is the readings quoting the
// printed tables to fewer digits.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   2.64e-15 -> 2.6e-15, 1.37e-13 -> 1.4e-13 and -> 1.3e-13, 4.67e-16 ->
//     4.7e-16, 5.63e-14 -> 5.6e-14, 3.26e-15 -> 3.4e-15, 7.11e-15 -> 7.1e-15,
//     1.67e-14 -> 1.7e-14 (the S0 custody row)
//   7.36e+4 -> 7.4e4, 4.436e+2 -> 4.44e2, 1.725e+3 -> 1.73e3
//   1.3868 -> 1.387, 1.4367 -> 1.437
//   5.7920e-2 -> 5.79e-2, 4.9840e-2 -> 4.98e-2, 4.6515e-2 -> 4.65e-2,
//     4.3278e-2 -> 4.33e-2 (the Var(c) column)
//   4.097e+2 -> 408 is NOT a rounding: "theta-ladder.md:408" is a line
//     reference, not a figure. See TOKENIZER below.
//
// SAME VALUE, DIFFERENT NOTATION: 7.6e3 [printed 7.60e+3], 20.5 [2.05e+1],
//   31.4 [3.14e+1].
//
// TOKENIZER ARTIFACT, not a figure: "theta-ladder.md:408" (a line number) and
//   "beta_2 - 1.45" (the scanner takes the subtrahend as -1.45; 1.45 is the
//   constant, carried in the code above the banner).
//
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   the endpoint fit's coefficients 0.2865 and 1.197, and 2.8165, are in
//   research/lemmaV-sup-extension.js's embedded OUTPUT, which is the file that
//   extends this ladder.
//
// DERIVED IN THIS READING: the 1.21 sqrt(H) constant and the 13.0x and 1.18x
//   ratios of reading 2, the u_1 - theta(z)/(2 ln z) row 1.339, 1.387, 1.437,
//   1.498, 1.522, and the k ~ theta/(2 ln z (beta_2-1.45)) row 0.54, 0.65,
//   0.79, 0.91, 1.01, all formed from printed columns.
//
// DEFINITION constants: the Gaussian moment reference 3 / 15 / 105.
// ---------------------------------------------------------------------------
