// ============================================================================
// attack-rhoms-01.js — THE <rho^2> LEMMA: PROVED AT EXPONENT 2s, THREE WAYS,
//                      AND THE SUP-RECOVERY PRICED AGAINST THE 963 BUDGET
// ============================================================================
// FEEDS rho-maximal-law.md's NOT-REACHED item "an analytic upper bound on
// <rho^2>(z)". Write-up: research/history/staging/attack-rhoms-01.md.
// SALVAGE NOTE: a predecessor died to a token limit leaving a complete but
// unrun, unaudited draft (scratchpad orphans-0820/attack-rhoms-01.js). This
// file is that draft audited and repaired. Defects fixed: (D1) its GS pair sum
// silently dropped the g = 1 pairs; (D2) the q = 1 diagonal terms produced a
// silent 0/0 in the |C_ij| ratio check; (D3) W = P(47) = 1.307e16 > 2^53 was
// formed as a Number and multiplied — all W-dependent quantities at z >= 31
// now go through lnW (WIDTH RULE); (D4) its multiplicity lemma claimed
// m(q) <= (3/2) tau(q) but forgot the three certificate blocks — the PROVABLE
// constant is (9/2) tau(q), and both are measured below. Added: the MS3 proof
// (sharper constant, no H-average), and a theta_G control against the cited
// sufficiency curve so the budget arithmetic is guarded.
//
// THE OBJECT. rho(y) = sum_j w_j psi((y-c_j)/q_j) over the divisor-pair
// lattice of the Brudern-Fouvry certificate at s = 3.0 (rho-maximal-law.md
// sec.1); rho~ = rho + M/2 the centered potential; <rho~^2> its exact period
// variance, with the PROVEN closed form (sift-limit-lemmaV.js meanSquare
// header; = plateau/2 there):
//   <rho~^2> = sum_{i,j} w_i w_j C_ij,
//   C_ij     = [ (g^2-1)/12 - dbar(g-dbar)/2 ] / (q_i q_j),
//   g = gcd(q_i,q_j), dbar = (c_j-c_i) mod g;  g = 1  =>  C_ij = 0 exactly.
// UNITS: rho and all its moments are dimensionless (weight counts); windows,
// W and qmax are positions (integers); every strength comparison is stated as
// an exponent base z, dimensionless. WIDTH: exact-integer arithmetic is kept
// below 2^53 everywhere (W as an integer only at z <= 29, where W <= 2.24e8;
// g^2 only at z <= 31, where qmax = 9699690 so g^2 <= 9.5e13); everything at
// z >= 31 that involves W runs in log space off lnW = theta(z) = sum ln p.
//
// THE PROVEN INPUTS (exact statements, checked at source this session):
//  * Lemma V (needed, NOT proven), sift-limit-attack.md sec.4.5: the certificate
//    remainder << H/log^3 H, stated in the range s >= (0.63+delta) u.
//  * Theorem A (PROVEN, attack-beta2-01-lemmaV-meansquare.md sec.1): for EVERY
//    H, every z, every s:  <R_H^2> <= B(z,s) H,  B = sum_{e|P(z),e>1} e Vabs(e)^2,
//    Vabs(e) = sum_{e1e2=e} |V(e1,e2)|, V the signed Rosser sublattice sums.
//  * B = O(log^8 z) unconditional (attack-AB-bounded.md Theorem 1:
//    B <= 9 A(z)^2 (E(z)-1), A = (5/2)prod_{2<p<z}(1+2/p) ~ c log^2 z,
//    E = (43/25)prod_{2<p<z}(1+4p/(p+2)^2) ~ c log^4 z; per-e verified with
//    zero violations z = 13..41; the published stronger form, Opera de Cribro
//    6.18 / Friedlander arXiv:2607.05707, needs s >= 9 and is NOT used).
//  * Spectral identities (lemmaV-parseval L3/L5, re-verified here):
//    <rho~^2> = sum_{e>1} sum*_a |Theta_e(a)|^2 / (4 sin^2(pi a/e)),
//    <R_H^2>  = sum_{e>1} sum*_a |Theta_e(a)|^2 F_H(a/e),  and the two
//    integrands differ mode-by-mode by the factor 4 sin^2(pi a H/e).
//  * Theta*(e) := max_a |Theta_e(a)| <= Vabs(e)  (Theorem B's triangle).
//
// WHAT IS PROVED HERE (derivations here; every step verified numerically).
//  LEMMA MS1 (elementary, closed form only — no Theorem A):
//    |C_ij| <= (g^2-1)/(12 q_i q_j), so <rho~^2> <= GS/12,
//    GS = sum_{i,j} g^2/(q_i q_j) = sum_{i,j} g/[q_i,q_j]. Writing q = g u,
//    q' = g v with (u,v) = 1, the multiplicity of a modulus q among lattice
//    terms is PROVABLY <= (9/2) tau(q) (per block: gcd(d1,d2)|2 gives tau(q)
//    ordered pairs at odd q plus tau(q)/2 at even q, i.e. (3/2) tau(q); times
//    the 3 blocks), and tau(gu) = 2^{omega(g)} 2^{omega(u)}, so
//      GS <= (81/4) [sum_{g|P(z), g <= qmax} 4^{omega(g)}] [sum_{u|P(z)} 2^{omega(u)}/u]^2
//         <= (81/4) z^{2s} prod_{p<z}(1+4/p) prod_{p<z}(1+2/p)^2
//         <= C z^{2s} ln^8 z          (qmax <= D^2 = z^{2s}; Mertens twice).
//    Hence <rho~^2> <= C' z^{2s} ln^8 z:  rms(rho~) <= z^{s+o(1)} = z^{3+o(1)}.
//  LEMMA MS2 (through Theorem A; the H-average transfer):
//    For every mode (e,a), avg_{H=1..K} 4 sin^2(pi a H/e) = 2 - 2 Re[(1/K)
//    sum_H e(aH/e)] >= 2 - e/(K a'), a' = min(a,e-a), by the geometric-sum
//    (Dirichlet) bound |sum_{H<=K} e(aH/e)| <= 1/(2|sin(pi a/e)|)... <= e/(2a').
//    Take K = qmax = max_i q_i: every e in the family divides some q_i, so
//    e <= K and the factor is >= 1 for every mode. Mode-by-mode:
//      <rho~^2> <= avg_{H=1..K} <R_H^2> <= B(z,s) (K+1)/2,   K = qmax <= z^{2s}.
//    Same exponent 2s; with the MEASURED flat B ~ 1.5 the constant is ~ 0.75.
//  LEMMA MS3 (sharper constant, no H-average; NEW vs the orphan draft):
//    sum_{a=1}^{e-1} 1/(4 sin^2(pi a/e)) = (e^2-1)/12 EXACTLY (verified below;
//    classical). With sum*_a <= sum_{a != 0} and Theta*(e) <= Vabs(e):
//      <rho~^2> <= sum_e Theta*(e)^2 (e^2-1)/12 <= B2(z,s)/12,
//      B2 = sum_{e|P(z), e>1} e^2 Vabs(e)^2  <=  qmax * B  <=  z^{2s} B.
//    So MS3 <= (qmax/12) B is at least 6x below MS2's B(qmax+1)/2, same
//    exponent 2s, and B2 is measured directly below. B2 = O(z^{2s} log^8 z)
//    unconditionally through B; a polylog bound on B2/qmax^2-type mass would
//    sharpen the constant, not the exponent.
//  COROLLARY (the cap; conditional on F4 ONLY): the Gaussian rho maximal law
//    F4 (sup|rho~| <= sqrt(<rho~^2>) sqrt(2 lnW), measured TRUE at z = 13..29
//    with 20-40% margin) composed with MS2/MS3 gives
//      sup|rho~| <= z^{s+o(1)} sqrt(2 theta(z)) = z^{s + 1/2 + o(1)},
//    i.e. RML(3.5+eps) and G2(z#) << z^{3.5+eps} — asymptotic margin
//    beta_2 - 3.5 = 0.766. Unconditionally, theta_G(z) (the exponent the
//    Gaussian form delivers) is CAPPED at 3.5 + o(1): the sufficiency curve's
//    room lambda_max = beta_2 - theta_G can NEVER close asymptotically —
//    rho-maxlaw S6's model A (linear drift, room closes at z ~ 5e3) is
//    excluded as an asymptote. The o(1) is (2 lnln z + O(1))/ln z and is large
//    at measured z; the cap is computed exactly (measured qmax, B, B2) at
//    z = 13..47, where MS3 puts it BELOW beta_2 at every level, and the crude
//    all-z form (qmax -> z^{2s}) exceeds beta_2 on one finite z-window before
//    re-entering — S5 locates both.
//  THE COMPOSED REQUIREMENT (the pricing this file exists to state):
//    MS(c):  <rho~^2> <= C1 z^{2c}     (proven here at c = s + o(1) = 3+o(1))
//    REC(l): sup|rho~| <= C2 sqrt(<rho~^2>) z^{l+o(1)}   (recovery loss l)
//    compose to RML(c + l), which wins iff  c + l < beta_2 = 4.26645.
//    With the proven c = 3: the recovery may lose at most z^{1.26645}.
//    Proven recovery mechanisms and their l:
//    R1 Chebyshev + increment: rho(y+1) - rho(y) = M - cc(y+1), cc the
//       certificate integrand (verified exactly); C_L = max_x |M - cc(x)|.
//       If S = sup|rho~| is attained at y0 then |rho~| >= S - C_L t for
//       0 <= t <= S/C_L on one side, so W <rho~^2> >= sum_{t < S/C_L}
//       (S - C_L t)^2 >= S^3/(3 C_L) (integral comparison; one-sided).
//       => sup <= (3 C_L W <rho~^2>)^{1/3}: l = [theta(z)/ln z + log_z(3 C_L)
//       - c]/3 + ... i.e. composed exponent (2c + theta/ln z + log_z 3C_L)/3.
//       The e^{theta/3} factor is fatal: needs theta(z) < (3 beta_2 - 2c) ln z
//       - ln 3C_L; the S5 scan kills even the C_L = 1, ms = 1 floor at z = 47.
//    Rk moment ladder: sup <= (W <rho~^{2k}>)^{1/(2k)}; with Gaussian-model
//       moments m_2k = (2k-1)!! ms^k, l_k = [theta + ln (2k-1)!!]/(2k ln z).
//       Fixed k dies; the order needed is k(z) ~ theta(z)/(2 (beta_2 - c -
//       1/2) ln z) -> infinity like z/(1.53 ln z) at c = 3 (the 1/2 is the
//       (2k-1)!!^{1/2k} ~ sqrt(2k/e) cost at the optimal k ~ lnW, which is
//       how the ladder rediscovers the Gaussian sqrt(2 lnW) factor).
//    Dyadic/generic chaining: CLOSED (REFUTED.md; import-chaining.md — the
//       entropy integral of the true metric exceeds the union bound at every
//       level). Not retried.
//    WHERE THE ANALYTIC PUSH STOPS, NAMED: the mean-square side is now a
//    theorem (MS1-MS3), so the entire unproven content of RML is the
//    sup-recovery, and every proven mechanism pays the position-union factor
//    W^{1/(2k)} = e^{theta/(2k)} with only k = 1 machinery (Theorem A, the
//    l1/l2 identity, sofic capacity) in the corpus. The first unproven object
//    on the ladder is the FOURTH moment <rho~^4> = sum over 4-tuples (i,j,k,l)
//    of w_i w_j w_k w_l <psi_i psi_j psi_k psi_l>: the quartic gcd-lattice
//    correlation (spectrally, the mode-resonance sum over a1/e1 + a2/e2 +
//    a3/e3 + a4/e4 in Z). No Theorem-A analogue exists for it; a bound
//    <rho~^4> << <rho~^2>^2 polylog would already cut the union price from
//    e^{theta/2} to e^{theta/4}. Its measured value is the S1 kurtosis column.
//
// CITED (embedded artifacts, standing compute rule — not recomputed beyond
// the stated cheap checks): B(z,3.0) at z = 13..37 from attack-beta2-01 /
// attack-AB-bounded (lemmaV-parseval.js); sqrt<rho^2> at z = 37..47 =
// theta-ladder sec.2's conditional rows via rho-maxlaw-01-sufficiency.js
// (rmsr = sqrt(plateau/2), H-free); sup|rho~| and the theta_G/lambda_max
// columns at z = 13..47 from rho-maxlaw-01-sufficiency.js (sup re-measured
// here as a control); beta_2 = 4.26645 per paper/beta2-note.md.
// rosserSupport/buildLam are copied verbatim from sift-limit-lemmaV.js (same
// custody practice as that file), used only for the cc/brute controls.
//
//   node research/attack-rhoms-01.js        (~6 min; progress on stderr)
// ============================================================================
'use strict';
const path=require('path');
const L=require(path.join(__dirname,'sift-limit-lemmaV.js'));
const T0=Date.now(); const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
const err=(m)=>process.stderr.write(m+'\n');
function primesBelow(n){const s=new Uint8Array(n),o=[];for(let i=2;i<n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<n;j+=i)s[j]=1;}}return o;}
function gcd(a,b){while(b){const t=a%b;a=b;b=t;}return a;}
function egcd(a,b){if(b===0)return[a,1,0];const[g,x,y]=egcd(b,a%b);return[g,y,x-Math.floor(a/b)*y];}
const BETA2=4.26645, S=3.0;

// verbatim from sift-limit-lemmaV.js (controls only) -------------------------
function rosserSupport(z, D, upper){
  const ps = primesBelow(z).slice().sort((a,b)=>b-a);
  const out = [];
  (function rec(start, prod, m){
    out.push([prod, (m % 2 === 0) ? 1 : -1]);
    for(let i=start;i<ps.length;i++){
      const p = ps[i], m2 = m+1;
      if(prod*p > D) continue;
      const isCond = upper ? (m2 % 2 === 1) : (m2 % 2 === 0);
      if(isCond && prod*p*p*p > D) continue;
      rec(i+1, prod*p, m2);
    }
  })(0, 1, 0);
  return out;
}
function buildLam(Len, supp){
  const A = new Int32Array(Len);
  for(const [d, sg] of supp){ for(let n=0;n<Len;n+=d) A[n] += sg; }
  return A;
}

// cited rows -----------------------------------------------------------------
const CITED_B={13:1.3833,17:1.4214,19:1.4348,23:1.4503,29:1.4660,31:1.4764,37:1.4883}; // lemmaV-parseval via attack-beta2-01
const CITED_RMSR={31:4.97378,37:9.25620,41:11.99697,43:14.19345,47:18.99742}; // sqrt<rho^2>, rho-maxlaw-01 S0/S2 (37..47 custody-bound from theta-ladder sec.2)
const CITED_SUP={13:2.62013,17:4.33665,19:9.15247,23:12.10617,29:17.90249};   // rho-maxlaw-01 S1 (re-measured below)
const CITED_THG={13:1.94696,17:2.01948,19:2.15885,23:2.18269,29:2.15889,31:2.25232,
                 37:2.34513,41:2.38567,43:2.43473,47:2.48199};                // rho-maxlaw-01 S3 (guards the budget arithmetic)

// ---- OLS with in-pass calibration ------------------------------------------
function ols(xs,ys){const k=xs.length;let sx=0,sy=0,sxx=0,sxy=0;
  for(let i=0;i<k;i++){sx+=xs[i];sy+=ys[i];sxx+=xs[i]*xs[i];sxy+=xs[i]*ys[i];}
  const b=(k*sxy-sx*sy)/(k*sxx-sx*sx),a=(sy-b*sx)/k;
  let sse=0;for(let i=0;i<k;i++){const e=ys[i]-(a+b*xs[i]);sse+=e*e;}
  const se=k>2?Math.sqrt(sse/(k-2)/(sxx-sx*sx/k)):NaN;
  return {a,b,se};}

// ============================================================================
// S0 CONTROLS
// ============================================================================
console.log('S0 CONTROLS');
{ // estimator control before any fit is believed
  const zs=[13,17,19,23,29,31], xs=zs.map(z=>Math.log(z)), ys=zs.map(z=>Math.log(5*Math.pow(z,3.7)));
  const f=ols(xs,ys);
  console.log(`  OLS control: y = 5 z^3.7 at 6 z returns slope ${f.b.toFixed(6)} (want 3.700000)  ${Math.abs(f.b-3.7)<1e-9?'PASS':'FAIL — FITS VOID'}`);
}
{ // the MS3 identity, before it is used: sum_{a=1..e-1} 1/(4 sin^2(pi a/e)) = (e^2-1)/12
  let worst=0;
  for(let e=2;e<=40;e++){
    let s=0; for(let a=1;a<e;a++){const sn=Math.sin(Math.PI*a/e); s+=1/(4*sn*sn);}
    const d=Math.abs(s-(e*e-1)/12)/((e*e-1)/12); if(d>worst)worst=d;
  }
  console.log(`  MS3 identity control: sum 1/(4 sin^2(pi a/e)) vs (e^2-1)/12, e = 2..40: worst rel ${worst.toExponential(1)}  ${worst<1e-12?'PASS':'FAIL'}`);
}

// my own closed-form pair sum: <rho~^2>, GS = sum g^2/(qq') (g = 1 included),
// and the |C_ij| <= (g^2-1)/12 ratio check (g >= 2 terms only; g = 1 gives C = 0)
function myPairSum(z){
  const D=Math.round(Math.pow(z,S)), t=L.buildTerms(z,D);
  const n=t.n,w=t.w,q=t.q,c=t.c,mk=t.mk,PR=Float64Array.from(t.ps);
  let ms=0, GS=0, maxRat=0, qmax=0;
  for(let i=0;i<n;i++){
    const qi=q[i],ci=c[i],wi=w[i],mi=mk[i];
    if(qi>qmax)qmax=qi;
    { const g=qi, inv=1/(qi*qi);           // diagonal: g = q_i, delta = 0
      GS+=g*g*inv;                          // = 1 (also for the q = 1 terms)
      if(g>1){ ms+=((g*g-1)/12)*inv; maxRat=Math.max(maxRat,1); } }  // ratio 1 exactly at delta=0... but |C|=(g^2-1)/12 here
    for(let j=i+1;j<n;j++){
      const inv=1/(qi*q[j]);
      let m=mi&mk[j];
      if(!m){ GS+=2*inv; continue; }        // g = 1: C_ij = 0 exactly, GS term = 1/(qq')  [D1 fix]
      let g=1; while(m){const b=m&(-m); g*=PR[31-Math.clz32(b)]; m^=b;}
      GS+=2*g*g*inv;
      let x=(c[j]-ci)%g; if(x<0)x+=g;
      const num=(g*g-1)/12-x*(g-x)/2;
      ms+=2*wi*w[j]*num*inv;
      const r=Math.abs(num)*12/(g*g-1); if(r>maxRat)maxRat=r;   // g >= 2 here, no 0/0 [D2 fix]
    }
  }
  return {ms,GS,maxRat,qmax,n,M:t.M,t};
}

const PS={};  // z -> pair-sum results
console.log('  closed-form <rho~^2> (my own O(n^2) pair sum) vs an independent reference:');
console.log('   reference: repo row(z,.,3.0).plateau/2 at z <= 23 (recomputed); walker m2 at 29 (S1); cited 4.97378^2 at 31');
for(const z of [13,17,19,23,29,31]){
  err(`  S0 pair sum z=${z} ... [${el()}]`);
  const r=myPairSum(z); PS[z]=r;
  let ref=null,tag='';
  if(z<=23){ ref=L.row(z,3.2,S).plateau/2; tag='repo row'; }
  else if(z===31){ ref=CITED_RMSR[31]*CITED_RMSR[31]; tag='cited rmsr^2'; }
  const rel=ref===null?NaN:Math.abs(r.ms-ref)/ref;
  console.log(`  z=${String(z).padStart(2)}  n=${String(r.n).padStart(6)}  <rho~^2>=${r.ms.toFixed(6).padStart(12)}`+
    (ref===null?`  (checked vs walker in S1)`:`  ${tag}=${ref.toFixed(6).padStart(12)}  rel=${rel.toExponential(1)} ${rel<(z===31?3e-6:1e-9)?'MATCH':'MISMATCH'}`)+
    `  GS=${r.GS.toExponential(4)}  max|C|12qq'/(g^2-1)=${r.maxRat.toFixed(6)} ${r.maxRat<=1+1e-12?'(<=1 OK)':'VIOLATION'}  qmax=${r.qmax}`);
}

// ============================================================================
// S1 FULL-PERIOD WALKS — moments, increment constant, cc identity (z = 13..29)
// ============================================================================
console.log('\nS1 FULL-PERIOD WALKS — centered moments of rho~, the exact increment constant');
console.log('   C_L = max_x |M - cc(x)| (cc = certificate integrand, identity verified), and sup|rho~|');
function walkStats(z){
  const D=Math.round(Math.pow(z,S)), t=L.buildTerms(z,D);
  const n=t.n,q=t.q,c=t.c,w=t.w,M=t.M;
  let W=1; for(const p of primesBelow(z)) W*=p;   // z <= 29: W <= 2.24e8 < 2^53, exact
  let r0=0; for(let j=0;j<n;j++){const tt=(-c[j])/q[j]; r0+=w[j]*(tt-Math.floor(tt)-0.5);}
  const B=1<<22, K=new Float64Array(B);
  let v=r0, sup=Math.abs(r0+M/2), sum=r0, p2=0,p4=0,p6=0,p8=0, maxCC=0, maxInc=0;
  { const u=r0+M/2, u2=u*u; p2+=u2;p4+=u2*u2;p6+=u2*u2*u2;p8+=u2*u2*u2*u2; }
  for(let a=1;a<=W;a+=B){
    const len=Math.min(B,W-a+1);
    K.fill(0,0,len);
    for(let j=0;j<n;j++){const qj=q[j],wj=w[j];
      let x0=(c[j]-a)%qj; if(x0<0)x0+=qj;
      for(let i=x0;i<len;i+=qj) K[i]+=wj;}
    for(let i=0;i<len;i++){
      const cc=K[i];                        // cc at position a+i
      const ac=Math.abs(cc); if(ac>maxCC)maxCC=ac;
      const inc=Math.abs(M-cc); if(inc>maxInc)maxInc=inc;
      v+=M-cc;                              // v = rho(a+i)
      if(a+i<W){const u=v+M/2, au=Math.abs(u), u2=u*u;
        if(au>sup)sup=au; sum+=v; p2+=u2;p4+=u2*u2;p6+=u2*u2*u2;p8+=u2*u2*u2*u2;}
    }
    err(`  S1 z=${z} block ${(a/B)|0}/${Math.ceil(W/B)} [${el()}]`);
  }
  const drift=Math.abs(v-r0);
  return {z,W,M,sup,mean:sum/W,m2:p2/W,m4:p4/W,m6:p6/W,m8:p8/W,maxCC,maxInc,drift};
}
// brute-force control at z = 13: rho from the definition, cc from the Lambda arrays
{
  const z=13,D=Math.round(Math.pow(z,S)),t=L.buildTerms(z,D);
  let W=1; for(const p of primesBelow(z)) W*=p;
  const sp=rosserSupport(z,D,true), sm=rosserSupport(z,D,false);
  const Lp=buildLam(W+5,sp), Lm=buildLam(W+5,sm);
  const ccF=(r)=>Lm[r]*Lp[r+2]+Lp[r]*Lm[r+2]-Lp[r]*Lp[r+2];
  let bsup=0,bsum=0,b2=0,b4=0,b6=0,bmaxCC=0,bmaxInc=0,idFail=0;
  for(let y=0;y<W;y++){
    let r=0, Kd=0;
    for(let j=0;j<t.n;j++){const tt=(y-t.c[j])/t.q[j]; r+=t.w[j]*(tt-Math.floor(tt)-0.5);
      let md=(y-t.c[j])%t.q[j]; if(md<0)md+=t.q[j]; if(md===0)Kd+=t.w[j];}
    if(Math.abs(Kd-ccF(y))>1e-9) idFail++;            // K(y) = cc(y) identity
    const cc=ccF(y), u=r+t.M/2, au=Math.abs(u), u2=u*u;
    if(au>bsup)bsup=au; bsum+=r; b2+=u2;b4+=u2*u2;b6+=u2*u2*u2;
    if(Math.abs(cc)>bmaxCC)bmaxCC=Math.abs(cc);
    if(Math.abs(t.M-cc)>bmaxInc)bmaxInc=Math.abs(t.M-cc);
  }
  const wr=walkStats(13);
  const ok=Math.abs(bsup-wr.sup)<1e-8&&Math.abs(b2/W-wr.m2)<1e-8&&Math.abs(b4/W-wr.m4)<1e-7
        &&Math.abs(b6/W-wr.m6)<1e-6&&Math.abs(bmaxCC-wr.maxCC)<1e-9&&Math.abs(bmaxInc-wr.maxInc)<1e-9;
  console.log(`  control z=13: K(y)=cc(y) at ${W-idFail}/${W} positions; brute sup=${bsup.toFixed(6)} m2=${(b2/W).toFixed(6)} m4=${(b4/W).toFixed(4)} m6=${(b6/W).toFixed(2)} maxCC=${bmaxCC} C_L=${bmaxInc.toFixed(4)}`);
  console.log(`                walker      sup=${wr.sup.toFixed(6)} m2=${wr.m2.toFixed(6)} m4=${wr.m4.toFixed(4)} m6=${wr.m6.toFixed(2)} maxCC=${wr.maxCC} C_L=${wr.maxInc.toFixed(4)}  ${ok&&idFail===0?'WALKER + IDENTITY VERIFIED':'CONTROL FAILED — S1 VOID'}`);
}
console.log('   z   sup|rho~| (cited)     m2 vs closed      m4/m2^2  m6/m2^3  m8/m2^4   maxCC   C_L      drift');
const WK={};
for(const z of [13,17,19,23,29]){
  const r=walkStats(z); WK[z]=r;
  const cf=PS[z].ms, rel=Math.abs(r.m2-cf)/cf;
  const supOK=Math.abs(r.sup-CITED_SUP[z])<1.5e-5?'MATCH':'MISMATCH';
  console.log(`  ${String(z).padStart(2)}  ${r.sup.toFixed(5).padStart(9)} (${CITED_SUP[z]}) ${supOK}  ${r.m2.toFixed(5)} vs ${cf.toFixed(5)} (${rel.toExponential(1)})   ${(r.m4/(r.m2*r.m2)).toFixed(3)}    ${(r.m6/Math.pow(r.m2,3)).toFixed(2)}    ${(r.m8/Math.pow(r.m2,4)).toFixed(1)}     ${r.maxCC}   ${r.maxInc.toFixed(3)}   ${r.drift.toExponential(1)}`);
}
console.log('  Gaussian reference for the ratio columns: 3, 15, 105. The moments of rho~ had never been measured.');

// sampled-prefix cc for z >= 31 (LOWER bounds on maxCC and C_L), calibrated at 23, 29
console.log('  sampled-prefix cc over min(W, 8e6) positions (LOWER bounds for z >= 31; calibration at 23, 29):');
const PFX={};
for(const z of [23,29,31,37,41,43,47]){
  err(`  S1 prefix z=${z} ... [${el()}]`);
  const D=Math.round(Math.pow(z,S)), t=L.buildTerms(z,D);
  let lnW=0,Wsmall=1,full=true;
  for(const p of primesBelow(z)){lnW+=Math.log(p); if(full){ if(Wsmall*p<=8_000_000)Wsmall*=p; else full=false; }}
  const Len=(full?Wsmall:8_000_000)+5;      // full period only if W <= 8e6 (never here); [D3] no W as Number
  const sp=rosserSupport(z,D,true), sm=rosserSupport(z,D,false);
  const Lp=buildLam(Len,sp), Lm=buildLam(Len,sm);
  let mc=0,mi=0;
  for(let x=0;x<Len-5;x++){
    const cc=Lm[x]*Lp[x+2]+Lp[x]*Lm[x+2]-Lp[x]*Lp[x+2];
    const a=Math.abs(cc); if(a>mc)mc=a;
    const b=Math.abs(t.M-cc); if(b>mi)mi=b;
  }
  PFX[z]={maxCC:mc,C_L:mi,M:t.M,n:t.n};
  const cal=WK[z]?`  vs full-period ${WK[z].maxCC} / ${WK[z].maxInc.toFixed(3)} (${(mc/WK[z].maxCC*100).toFixed(0)}% / ${(mi/WK[z].maxInc*100).toFixed(0)}%)`:'';
  console.log(`  z=${String(z).padStart(2)}  positions=8e6  maxCC>=${mc}  C_L>=${mi.toFixed(3)}${cal}`);
}

// ============================================================================
// S2 LEMMA MS1 — the elementary z^{2s} log^8 z bound, each step verified
// ============================================================================
console.log('\nS2 LEMMA MS1: <rho~^2> <= GS/12 <= C z^{2s} ln^8 z  (elementary; derivation in header)');
console.log('  step 1: |C_ij| <= (g^2-1)/(12 q q\'): max ratio over all g >= 2 pairs = S0 column, <= 1 at every z.');
{ // step 2: multiplicity m(q): PROVABLE cap (9/2) tau(q) (3 blocks), measured also vs (3/2) tau(q)  [D4 fix]
  console.log('  step 2: multiplicity of q among lattice terms: proven cap (9/2) tau(q); measured vs both caps:');
  for(const z of [13,17,19]){
    const t=PS[z].t, cnt=new Map();
    for(let i=0;i<t.n;i++) cnt.set(t.q[i],(cnt.get(t.q[i])||0)+1);
    let worst15=0,wq=0,worst45=0;
    for(const [qv,m] of cnt){
      let om=0; for(const p of t.ps) if(qv%p===0) om++;
      const tau=Math.pow(2,om);
      const r15=m/(1.5*tau), r45=m/(4.5*tau);
      if(r15>worst15){worst15=r15;wq=qv;}
      if(r45>worst45)worst45=r45;
    }
    console.log(`    z=${z}: max m(q)/(1.5 tau) = ${worst15.toFixed(4)} at q=${wq}; max m(q)/(4.5 tau) = ${worst45.toFixed(4)} ${worst45<=1?'(proven cap OK)':'VIOLATION'}   (${cnt.size} distinct moduli)`);
  }
}
{ // step 3: the Mertens products and the assembled finite-z bound, vs GS truth
  console.log('  step 3: GS vs the assembled bound C0 z^{2s} P4 P2^2, P4 = prod(1+4/p), P2 = prod(1+2/p):');
  console.log('   z      GS (exact)     proven C0=81/4       measured C0=9/4     ratio GS/proven    P2      P4');
  for(const z of [13,17,19,23,29,31]){
    let P2=1,P4=1; for(const p of primesBelow(z)){P2*=1+2/p;P4*=1+4/p;}
    const base=Math.pow(z,2*S)*P4*P2*P2;
    console.log(`  ${String(z).padStart(2)}   ${PS[z].GS.toExponential(4)}    ${(20.25*base).toExponential(4)}       ${(2.25*base).toExponential(4)}      ${(PS[z].GS/(20.25*base)).toExponential(2)}      ${P2.toFixed(2)}   ${P4.toFixed(2)}`);
  }
}
{ // growth: fitted slopes of GS and of <rho~^2> (window fits, calibrated estimator)
  const zs=[13,17,19,23,29,31], xs=zs.map(z=>Math.log(z));
  const fG=ols(xs,zs.map(z=>Math.log(PS[z].GS)));
  const fM=ols(xs,zs.map(z=>Math.log(PS[z].ms)));
  console.log(`  window fits over z = 13..31: d ln GS/d ln z = ${fG.b.toFixed(4)} +/- ${fG.se.toFixed(4)}  (lemma ceiling 2s = ${2*S}),`);
  console.log(`    d ln <rho~^2>/d ln z = ${fM.b.toFixed(4)} +/- ${fM.se.toFixed(4)}  (2 x rho-maxlaw S6's rmsr slope = 4.471 on 13..47;`);
  console.log(`    the short window reads lower — the local exponent RISES with z, quote no single power)`);
}

// ============================================================================
// S3 LEMMAS MS2 + MS3 — through the proven Theorem A, with B and B2 recomputed
// ============================================================================
console.log('\nS3 LEMMA MS2: <rho~^2> <= B(z,s)(qmax+1)/2 through the PROVEN <R_H^2> <= B H;');
console.log('   LEMMA MS3: <rho~^2> <= B2(z,s)/12, B2 = sum e^2 Vabs(e)^2  (no H-average; sharper)');
// per-term subset enumeration of e | q_i: V(e1,e2) signed sums; B = sum e Vabs^2, B2 = sum e^2 Vabs^2
function sweepB(z){
  const D=Math.round(Math.pow(z,S)), t=L.buildTerms(z,D);
  const n=t.n,q=t.q,w=t.w,d1=t.d1,ps=t.ps;
  const EM=new Map();   // e -> Map(e1 -> signed V)
  const plist=[];
  for(let i=0;i<n;i++){
    plist.length=0;
    const qi=q[i];
    for(const p of ps) if(qi%p===0) plist.push(p);
    const wi=w[i]/qi, dd=d1[i], np=plist.length;
    for(let sMask=1;sMask<(1<<np);sMask++){
      let e=1,e1=1;
      for(let b=0;b<np;b++) if(sMask&(1<<b)){const p=plist[b]; e*=p; if(dd%p===0)e1*=p;}
      let m1=EM.get(e); if(!m1){m1=new Map();EM.set(e,m1);}
      m1.set(e1,(m1.get(e1)||0)+wi);
    }
  }
  let B=0,B2=0;
  for(const [e,m1] of EM){
    let vabs=0; for(const v of m1.values()) vabs+=Math.abs(v);
    B+=e*vabs*vabs; B2+=e*e*vabs*vabs;      // e^2 <= 5e16 at z=47: float, rel err ~1e-16, stated
  }
  return {B,B2,EM,t};
}
const SW={};
console.log('   z    B(z,3.0)   cited      qmax        MS2 = B(qmax+1)/2   MS3 = B2/12    truth <rho~^2>   MS3/truth   MS2/MS3');
for(const z of [13,17,19,23,29,31,37,41,43,47]){
  err(`  S3 sweep z=${z} ... [${el()}]`);
  const r=sweepB(z); SW[z]=r;
  let qmax=0; for(let i=0;i<r.t.n;i++) if(r.t.q[i]>qmax)qmax=r.t.q[i];
  r.qmax=qmax;
  const ms2=r.B*(qmax+1)/2, ms3=r.B2/12;
  const truth=PS[z]?PS[z].ms:(CITED_RMSR[z]?CITED_RMSR[z]*CITED_RMSR[z]:NaN);
  const cited=CITED_B[z]!==undefined?CITED_B[z]:null;
  const ok=cited===null?'(new)':Math.abs(r.B-cited)<6e-5?'MATCH':'MISMATCH';
  console.log(`  ${String(z).padStart(2)}   ${r.B.toFixed(4)}   ${cited!==null?cited.toFixed(4):'  —  '} ${ok}  ${String(qmax).padStart(10)}   ${ms2.toExponential(4).padStart(12)}     ${ms3.toExponential(4).padStart(12)}       ${isNaN(truth)?'  —  ':truth.toFixed(3).padStart(9)}      ${isNaN(truth)?' —':(ms3/truth).toExponential(1)}    ${(ms2/ms3).toFixed(1)}`);
}
console.log('  (truth at z = 31..47 is the CITED rmsr^2; the bounds need no truth, they are unconditional.)');
// spectral identity + the H-average transfer + MS3 with exact Theta*, verified at z = 13, 17
console.log('  transfer + MS3 verification at z = 13, 17 (exact, all modes):');
for(const z of [13,17]){
  const {B,B2,EM,t}=SW[z], K=SW[z].qmax;
  let spec=0, avgR2=0, viol=0, massA1=0, massA3=0, ms3T=0, ms3V=0;
  let dirCheck=0, dirWorst=0;
  for(const [e,m1] of EM){
    let thmax=0, vabs=0; for(const v of m1.values()) vabs+=Math.abs(v);
    for(let a=1;a<e;a++){
      if(gcd(a,e)!==1) continue;
      let re=0,im=0;
      for(const [e1,V] of m1){
        const e2=e/e1;
        let ph;
        if(e2===1) ph=0;
        else {const [,inv]=egcd(((e1%e2)+e2)%e2,e2); ph=2*Math.PI*2*a*((inv%e2+e2)%e2)/e2;}
        re+=V*Math.cos(ph); im+=V*Math.sin(ph);
      }
      const th2=re*re+im*im;
      if(th2>thmax)thmax=th2;
      if(z===13&&dirCheck<200){ // direct-phase control of Theorem B's factorised form
        let dre=0,dim=0;
        for(let i=0;i<t.n;i++){if(t.q[i]%e!==0)continue;
          const p2=-2*Math.PI*a*(t.c[i]%e)/e;
          dre+=(t.w[i]/t.q[i])*Math.cos(p2); dim+=(t.w[i]/t.q[i])*Math.sin(p2);}
        const d=Math.abs(th2-(dre*dre+dim*dim)); if(d>dirWorst)dirWorst=d; dirCheck++;
      }
      const sn=Math.sin(Math.PI*a/e), wgt=1/(4*sn*sn);
      spec+=th2*wgt;
      const ap=Math.min(a,e-a);
      if(ap===1)massA1+=th2*wgt; if(ap<=3)massA3+=th2*wgt;
      // exact avg over H=1..K of 4 sin^2(pi a H/e) via geometric sum
      const beta=2*Math.PI*a/e;
      const num=Math.sin(K*beta/2), den=Math.sin(beta/2);
      const reAvg=(Math.cos((K+1)*beta/2)*num/den)/K;   // Re[(1/K) sum e(aH/e)]
      const a4=2-2*reAvg;
      if(a4<2-e/(K*ap)-1e-9) viol++;
      avgR2+=th2*wgt*a4;
    }
    ms3T+=thmax*(e*e-1)/12; ms3V+=vabs*vabs*(e*e-1)/12;
  }
  const truth=PS[z].ms, ms2=B*(K+1)/2;
  console.log(`  z=${z}: spectral <rho~^2> = ${spec.toFixed(6)} vs closed ${truth.toFixed(6)} (rel ${(Math.abs(spec-truth)/truth).toExponential(1)})${z===13?`; Theorem-B form vs direct phase: worst |diff| ${dirWorst.toExponential(1)} over ${dirCheck} modes`:''}`);
  console.log(`        MS2 chain, K=qmax=${K}: ${truth.toFixed(3)} <= avg_H<R_H^2> = ${avgR2.toFixed(3)} <= B(K+1)/2 = ${ms2.toExponential(3)}  ${truth<=avgR2+1e-9&&avgR2<=ms2?'HOLDS':'FAILS'};  Dirichlet per-mode violations: ${viol}`);
  console.log(`        MS3 chain: truth ${truth.toFixed(3)} <= sum Theta*^2(e^2-1)/12 = ${ms3T.toFixed(3)} <= sum Vabs^2(e^2-1)/12 = ${ms3V.toFixed(3)} <= B2/12 = ${(B2/12).toFixed(3)}  ${truth<=ms3T+1e-9&&ms3T<=ms3V+1e-9&&ms3V<=B2/12+1e-9?'HOLDS':'FAILS'}`);
  console.log(`        low-frequency mass of <rho~^2>: a'=1 carries ${(massA1/spec*100).toFixed(1)}%, a'<=3 carries ${(massA3/spec*100).toFixed(1)}%`);
}
// Theorem A spot check on this lattice
{
  const z=13,t=PS[z].t,B=SW[z].B;
  let worst=0;
  for(const H of [10,100,1000,SW[z].qmax]){
    const r=L.meanSquare(t,H).ms/(B*H); if(r>worst)worst=r;
  }
  console.log(`  Theorem A spot check z=13: max over H in {10,100,1000,qmax} of <R_H^2>/(B H) = ${worst.toFixed(4)} ${worst<=1?'(<= 1 OK)':'VIOLATION'}`);
}

// ============================================================================
// S4 THE COMPOSED PRICING — routes vs the sufficiency curve, z = 13..47
// ============================================================================
console.log('\nS4 COMPOSED PRICING against beta_2 = '+BETA2+' (exponents base z; sup in weight units)');
console.log('   smax = (z^b2 M - 1)/2 (strict, T>=1 built in): a route delivers iff its sup bound <= smax');
console.log('   R1 = (3 C_L W ms)^{1/3} Chebyshev+increment (PROVEN, header); R1f = same at C_L = 1 (floor)');
console.log('   Mk = (W m_2k)^{1/2k} moment ladder; m_2k measured at z<=29, Gaussian MODEL (2k-1)!! ms^k at z>=31');
console.log('   [D3] every W-dependent number here is exp of a log-space sum off lnW = theta(z)');
const ZS=[13,17,19,23,29,31,37,41,43,47];
const ROWS={};
let thgWorst=0;
for(const z of ZS){
  const t=SW[z].t;
  let lnW=0; for(const p of primesBelow(z)) lnW+=Math.log(p);
  const M=t.M;
  const ms=PS[z]?PS[z].ms:CITED_RMSR[z]*CITED_RMSR[z];
  const wk=WK[z];
  const C_L=wk?wk.maxInc:PFX[z].C_L;          // exact at <=29, LOWER bound at >=31
  const m4=wk?wk.m4:3*ms*ms, m6=wk?wk.m6:15*ms*ms*ms;
  const smax=(Math.pow(z,BETA2)*M-1)/2;
  const G=Math.sqrt(ms)*Math.sqrt(2*lnW);
  const need=2*Math.sqrt(2*lnW*ms)/M, thG=Math.log(need)/Math.log(z), lam=BETA2-thG;
  const dth=Math.abs(thG-CITED_THG[z]); if(dth>thgWorst)thgWorst=dth;
  const R1=Math.exp((Math.log(3)+Math.log(C_L)+lnW+Math.log(ms))/3);
  const R1f=Math.exp((Math.log(3)+lnW+Math.log(ms))/3);
  const M1=Math.exp((lnW+Math.log(ms))/2), M2=Math.exp((lnW+Math.log(m4))/4), M3=Math.exp((lnW+Math.log(m6))/6);
  ROWS[z]={lnW,M,ms,C_L,smax,G,thG,lam,R1,R1f,M1,M2,M3,sup:wk?wk.sup:NaN,exact:!!wk};
  const v=(x)=>x<=smax?'Y':'n';
  console.log(`  z=${String(z).padStart(2)}${wk?' ':'*'} ms=${ms.toFixed(2).padStart(7)}  C_L${wk?'=':'>'}${C_L.toFixed(1).padStart(5)}  smax=${smax.toExponential(3)}  R1=${R1.toExponential(2)} ${v(R1)}  R1f=${R1f.toExponential(2)} ${v(R1f)}  M1=${M1.toExponential(2)} ${v(M1)}  M2=${M2.toExponential(2)} ${v(M2)}  M3=${M3.toExponential(2)} ${v(M3)}`);
}
console.log(`  theta_G control: recomputed column vs rho-maxlaw S3 cited, worst |diff| = ${thgWorst.toExponential(1)} ${thgWorst<1e-4?'MATCH — budget arithmetic guarded':'MISMATCH — S4 VOID'}`);
console.log('  (* = ms cited / C_L a sampled lower bound (verdict letters INDICATIVE, not proofs) / moments Gaussian MODEL at z >= 31;');
console.log('   at z <= 29 every input is exact and a Y verdict is a PROVEN finite-z clearing.)');
console.log('  budget accounting: factor over the Gaussian form G = rms sqrt(2 lnW), vs the allowed z^lambda_max;');
console.log('  consumed = ln(factor)/ln(budget) — the fraction of the sufficiency budget the recovery spends');
console.log('   z   budget z^lam    R1 factor  consumed    M2 factor  consumed    M3 factor  consumed   k_min');
for(const z of ZS){
  const r=ROWS[z], bud=Math.pow(z,r.lam);
  const f=(x)=>x/r.G;
  // k_min under the Gaussian moment model: smallest k with (W (2k-1)!! ms^k)^{1/2k} <= smax
  let kmin=-1;
  for(let k=1;k<=80;k++){
    let ldf=0; for(let j=3;j<=2*k-1;j+=2) ldf+=Math.log(j);
    const lS=(r.lnW+ldf+k*Math.log(r.ms))/(2*k);
    if(lS<=Math.log(r.smax)){kmin=k;break;}
  }
  const cons=(x)=>(Math.log(f(x))/Math.log(bud)).toFixed(3);
  console.log(`  ${String(z).padStart(2)}   ${bud.toFixed(1).padStart(8)}      ${f(r.R1).toExponential(2)}  ${cons(r.R1).padStart(7)}     ${f(r.M2).toExponential(2)}  ${cons(r.M2).padStart(7)}     ${f(r.M3).toExponential(2)}  ${cons(r.M3).padStart(7)}     ${kmin<0?'>80':kmin}`);
}
{
  const r=ROWS[47];
  console.log(`  at the weakest measured point z = 47: M3 spends factor ${(r.M3/r.G).toFixed(1)} of the ${Math.pow(47,r.lam).toFixed(0)} budget`+
    ` (${(Math.log(r.M3/r.G)/Math.log(Math.pow(47,r.lam))*100).toFixed(0)}% in log terms); M2 factor ${(r.M2/r.G).toExponential(1)}; R1 vs smax: ${r.R1<=r.smax?'clears':'over'} (C_L a lower bound there).`);
}
console.log('  route looseness against the measured sup (exact levels only):');
for(const z of [13,17,19,23,29]){
  const r=ROWS[z];
  console.log(`  z=${String(z).padStart(2)}: sup=${r.sup.toFixed(3).padStart(7)}  R1/sup=${(r.R1/r.sup).toFixed(1).padStart(7)}  M1/sup=${(r.M1/r.sup).toFixed(1).padStart(6)}  M2/sup=${(r.M2/r.sup).toFixed(1).padStart(5)}  M3/sup=${(r.M3/r.sup).toFixed(1).padStart(5)}  Gauss/sup=${(r.G/r.sup).toFixed(2)}`);
}

// ============================================================================
// S5 WHERE EACH ROUTE DIES — death scans with exact theta(z), models flagged
// ============================================================================
console.log('\nS5 DEATH SCANS (theta(z) exact by sieve; M model 0.35/ln^2 z and ms model anchored at z=29,');
console.log('   slope 4.471 = 2 x 2.2355 — both MEASURED-model inputs, flagged; conclusions are about the routes, not G2)');
{
  const P=primesBelow(200000);
  const lnMS=(z)=>Math.log(ROWS[29].ms)+4.471*(Math.log(z)-Math.log(29));
  const lnM=(z)=>Math.log(0.35)-2*Math.log(Math.log(z));
  const lnSmax=(z)=>Math.log((Math.exp(BETA2*Math.log(z)+lnM(z))-1)/2);
  let th=0, deadR1f=0, deadR1f_ms1=0, deadM2=0, deadM3=0;
  const capWin={ 'B=1.5':{lo:0,hi:0,max:0,zmax:0}, 'Bdrift':{lo:0,hi:0,max:0,zmax:0} };
  for(const z of P){
    // theta at this prime BEFORE adding it: theta(z) = sum_{p<z} ln p
    const lz=Math.log(z), sm=lnSmax(z);
    if(!deadR1f_ms1 && (Math.log(3)+th)/3>sm) deadR1f_ms1=z;                    // C_L=1, ms=1
    if(!deadR1f && (Math.log(3)+th+lnMS(z))/3>sm) deadR1f=z;                    // C_L=1, ms model
    const l4=Math.log(3)+2*lnMS(z), l6=Math.log(15)+3*lnMS(z);
    if(!deadM2 && (th+l4)/4>sm) deadM2=z;
    if(!deadM3 && (th+l6)/6>sm) deadM3=z;
    // the CRUDE provable theta_G cap (qmax replaced by its z^{2s} ceiling — the
    // all-z form, since qmax and B2 are only measured to z = 47):
    // need = 2 sqrt(2 theta B z^{2s}/2)/M; where is this ABOVE beta_2?
    if(z>13){
      const lnQ=Math.min(2*S*lz,th);
      for(const [tag,lnB] of [['B=1.5',Math.log(1.5)],['Bdrift',Math.log(1.38+0.10*(lz-Math.log(13)))]]){
        const cap=(Math.log(2)+0.5*(Math.log(2*th)+lnB+lnQ-Math.log(2))-lnM(z))/lz;
        const cw=capWin[tag];
        if(cap>BETA2){ if(!cw.lo)cw.lo=z; cw.hi=z; }
        if(cap>cw.max){ cw.max=cap; cw.zmax=z; }
      }
    }
    th+=lz;
    if(z>150000) break;
  }
  console.log(`  R1 floor (C_L = 1, ms = 1; no lemma can do better on this route): dies at z = ${deadR1f_ms1}`);
  console.log(`  R1 floor with the measured-model ms: dies at z = ${deadR1f}   (with real C_L / ms it is tested per-z in S4)`);
  console.log(`  M2 (4th moment, Gaussian model): dies at z = ${deadM2};  M3 (6th moment): dies at z = ${deadM3}`);
  console.log('  the CRUDE all-z provable cap (qmax -> z^6 ceiling; the exact-qmax caps at z <= 47 are the S5 table):');
  for(const tag of ['B=1.5','Bdrift']){ const cw=capWin[tag];
    console.log(`    ${tag}: cap > beta_2 on z in [${cw.lo}, ${cw.hi}], peak ${cw.max.toFixed(4)} at z = ${cw.zmax}; below beta_2 again for all scanned z > ${cw.hi}`);
  }
  console.log('  so the unconditional F4 => win composition is EXACT at z <= 47 (table below) and CRUDE-PROVEN');
  console.log('  past the re-entry point; the window between is covered only if qmax/B2 keep their measured growth.');
}
{ // the cap evaluated EXACTLY at the measured levels (control for the model scan)
  console.log('  the MS cap on theta_G at measured z, exact B, B2, qmax (uses NO measured ms — proven bounds only):');
  console.log('   z    theta_G measured   cap via MS2   cap via MS3   MS3 cap - beta_2');
  for(const z of ZS){
    const r=ROWS[z], B=SW[z].B, B2=SW[z].B2, q=SW[z].qmax;
    const cap2=Math.log(2*Math.sqrt(2*r.lnW*B*(q+1)/2)/r.M)/Math.log(z);
    const cap3=Math.log(2*Math.sqrt(2*r.lnW*B2/12)/r.M)/Math.log(z);
    console.log(`  ${String(z).padStart(2)}      ${r.thG.toFixed(4)}           ${cap2.toFixed(4)}        ${cap3.toFixed(4)}         ${(cap3-BETA2>=0?'+':'')}${(cap3-BETA2).toFixed(4)}`);
  }
  console.log('  asymptotics: cap = s + 1/2 + (2 lnln z + O(1))/ln z -> 3.5 < beta_2, margin 0.766;');
  console.log('  with the PROVEN B = O(log^8 z) the extra 4 lnln z/ln z still vanishes: the cap ends below beta_2 either way.');
  console.log('  moment order needed for beta_2 at all z: k(z) ~ theta(z)/(2 (beta_2 - s - 1/2) ln z) -> infinity like z/(1.53 ln z):');
  const P=primesBelow(1100);
  for(const z of [47,101,211,499,1009]){
    let th=0; for(const p of P){if(p>=z)break; th+=Math.log(p);}
    console.log(`    z=${String(z).padStart(4)}: k ~ ${(th/(2*(BETA2-S-0.5)*Math.log(z))).toFixed(1)}`);
  }
}
console.log('\nDONE '+el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-rhoms-01.js
//   invocation:  node research/attack-rhoms-01.js
//   code-sha256: 8286721e8bcea7a3dd28aa523fb749a0a2dc4333078857adb012dde82d71cfa9
//   out-sha256:  4377df4fe17e72d85ad4d7f440c270054f187be97ee6059c107ffd4269221b37
//   body-lines:  146
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     59.2 s
// ============================================================================
// S0 CONTROLS
//   OLS control: y = 5 z^3.7 at 6 z returns slope 3.700000 (want 3.700000)  PASS
//   MS3 identity control: sum 1/(4 sin^2(pi a/e)) vs (e^2-1)/12, e = 2..40: worst rel 3.2e-15  PASS
//   closed-form <rho~^2> (my own O(n^2) pair sum) vs an independent reference:
//    reference: repo row(z,.,3.0).plateau/2 at z <= 23 (recomputed); walker m2 at 29 (S1); cited 4.97378^2 at 31
//   z=13  n=   852  <rho~^2>=    1.095066  repo row=    1.095066  rel=4.1e-16 MATCH  GS=8.9404e+4  max|C|12qq'/(g^2-1)=1.000000 (<=1 OK)  qmax=2310
//   z=17  n=  2236  <rho~^2>=    2.496563  repo row=    2.496563  rel=0.0e+0 MATCH  GS=3.2733e+5  max|C|12qq'/(g^2-1)=1.000000 (<=1 OK)  qmax=30030
//   z=19  n=  4764  <rho~^2>=    4.952375  repo row=    4.952375  rel=7.2e-16 MATCH  GS=7.5770e+5  max|C|12qq'/(g^2-1)=1.000000 (<=1 OK)  qmax=510510
//   z=23  n=  9636  <rho~^2>=    7.982480  repo row=    7.982480  rel=1.6e-15 MATCH  GS=1.7060e+6  max|C|12qq'/(g^2-1)=1.000000 (<=1 OK)  qmax=881790
//   z=29  n= 20700  <rho~^2>=   13.595974  (checked vs walker in S1)  GS=4.4992e+6  max|C|12qq'/(g^2-1)=1.000000 (<=1 OK)  qmax=3432198
//   z=31  n= 35868  <rho~^2>=   24.738489  cited rmsr^2=   24.738487  rel=6.0e-8 MATCH  GS=7.9794e+6  max|C|12qq'/(g^2-1)=1.000000 (<=1 OK)  qmax=9699690
//
// S1 FULL-PERIOD WALKS — centered moments of rho~, the exact increment constant
//    C_L = max_x |M - cc(x)| (cc = certificate integrand, identity verified), and sup|rho~|
//   control z=13: K(y)=cc(y) at 2310/2310 positions; brute sup=2.620130 m2=1.095066 m4=3.0082 m6=11.29 maxCC=1 C_L=1.0558
//                 walker      sup=2.620130 m2=1.095066 m4=3.0082 m6=11.29 maxCC=1 C_L=1.0558  WALKER + IDENTITY VERIFIED
//    z   sup|rho~| (cited)     m2 vs closed      m4/m2^2  m6/m2^3  m8/m2^4   maxCC   C_L      drift
//   13    2.62013 (2.62013) MATCH  1.09507 vs 1.09507 (2.3e-13)   2.509    8.60    34.8     1   1.056   9.4e-13
//   17    4.33665 (4.33665) MATCH  2.49656 vs 2.49656 (1.3e-12)   2.321    7.42    28.7     2   2.047   2.1e-11
//   19    9.15247 (9.15247) MATCH  4.95237 vs 4.95237 (4.8e-12)   2.893    13.42    85.3     3   3.040   8.4e-11
//   23   12.10617 (12.10617) MATCH  7.98248 vs 7.98248 (2.5e-11)   2.896    13.32    81.7     3   3.034   1.1e-8
//   29   17.90249 (17.90249) MATCH  13.59597 vs 13.59597 (1.2e-10)   2.918    14.00    93.5     3   3.032   4.3e-7
//   Gaussian reference for the ratio columns: 3, 15, 105. The moments of rho~ had never been measured.
//   sampled-prefix cc over min(W, 8e6) positions (LOWER bounds for z >= 31; calibration at 23, 29):
//   z=23  positions=8e6  maxCC>=3  C_L>=3.034  vs full-period 3 / 3.034 (100% / 100%)
//   z=29  positions=8e6  maxCC>=3  C_L>=3.032  vs full-period 3 / 3.032 (100% / 100%)
//   z=31  positions=8e6  maxCC>=9  C_L>=9.029
//   z=37  positions=8e6  maxCC>=7  C_L>=7.028
//   z=41  positions=8e6  maxCC>=7  C_L>=7.026
//   z=43  positions=8e6  maxCC>=7  C_L>=7.024
//   z=47  positions=8e6  maxCC>=10  C_L>=10.023
//
// S2 LEMMA MS1: <rho~^2> <= GS/12 <= C z^{2s} ln^8 z  (elementary; derivation in header)
//   step 1: |C_ij| <= (g^2-1)/(12 q q'): max ratio over all g >= 2 pairs = S0 column, <= 1 at every z.
//   step 2: multiplicity of q among lattice terms: proven cap (9/2) tau(q); measured vs both caps:
//     z=13: max m(q)/(1.5 tau) = 3.0000 at q=330; max m(q)/(4.5 tau) = 1.0000 (proven cap OK)   (32 distinct moduli)
//     z=17: max m(q)/(1.5 tau) = 3.0000 at q=546; max m(q)/(4.5 tau) = 1.0000 (proven cap OK)   (64 distinct moduli)
//     z=19: max m(q)/(1.5 tau) = 3.0000 at q=714; max m(q)/(4.5 tau) = 1.0000 (proven cap OK)   (128 distinct moduli)
//   step 3: GS vs the assembled bound C0 z^{2s} P4 P2^2, P4 = prod(1+4/p), P2 = prod(1+2/p):
//    z      GS (exact)     proven C0=81/4       measured C0=9/4     ratio GS/proven    P2      P4
//   13   8.9404e+4    1.3269e+11       1.4744e+10      6.74e-7      7.09   27.00
//   17   3.2733e+5    1.1553e+12       1.2836e+11      2.83e-7      8.18   35.31
//   19   7.5770e+5    3.4745e+12       3.8606e+11      2.18e-7      9.14   43.62
//   23   1.7060e+6    1.6168e+13       1.7964e+12      1.06e-7      10.11   52.80
//   29   4.4992e+6    9.0101e+13       1.0011e+13      4.99e-8      10.99   61.98
//   31   7.9794e+6    1.7480e+14       1.9423e+13      4.56e-8      11.74   70.53
//   window fits over z = 13..31: d ln GS/d ln z = 5.0366 +/- 0.1886  (lemma ceiling 2s = 6),
//     d ln <rho~^2>/d ln z = 3.3938 +/- 0.2387  (2 x rho-maxlaw S6's rmsr slope = 4.471 on 13..47;
//     the short window reads lower — the local exponent RISES with z, quote no single power)
//
// S3 LEMMA MS2: <rho~^2> <= B(z,s)(qmax+1)/2 through the PROVEN <R_H^2> <= B H;
//    LEMMA MS3: <rho~^2> <= B2(z,s)/12, B2 = sum e^2 Vabs(e)^2  (no H-average; sharper)
//    z    B(z,3.0)   cited      qmax        MS2 = B(qmax+1)/2   MS3 = B2/12    truth <rho~^2>   MS3/truth   MS2/MS3
//   13   1.3833   1.3833 MATCH        2310      1.5984e+3        1.9710e+1           1.095      1.8e+1    81.1
//   17   1.4214   1.4214 MATCH       30030      2.1343e+4        7.7252e+1           2.497      3.1e+1    276.3
//   19   1.4348   1.4348 MATCH      510510      3.6623e+5        1.4523e+2           4.952      2.9e+1    2521.7
//   23   1.4503   1.4503 MATCH      881790      6.3941e+5        2.6746e+2           7.982      3.4e+1    2390.7
//   29   1.4660   1.4660 MATCH     3432198      2.5158e+6        6.4627e+2          13.596      4.8e+1    3892.8
//   31   1.4764   1.4764 MATCH     9699690      7.1604e+6        1.1625e+3          24.738      4.7e+1    6159.7
//   37   1.4883   1.4883 MATCH    31870410      2.3717e+7        3.6976e+3          85.677      4.3e+1    6414.1
//   41   1.4963     —   (new)    73277490      5.4824e+7        6.4644e+3         143.927      4.5e+1    8480.9
//   43   1.5057     —   (new)    83650710      6.2977e+7        8.9156e+3         201.454      4.4e+1    7063.7
//   47   1.5135     —   (new)   223092870      1.6883e+8        1.5955e+4         360.902      4.4e+1    10581.9
//   (truth at z = 31..47 is the CITED rmsr^2; the bounds need no truth, they are unconditional.)
//   transfer + MS3 verification at z = 13, 17 (exact, all modes):
//   z=13: spectral <rho~^2> = 1.095066 vs closed 1.095066 (rel 9.1e-14); Theorem-B form vs direct phase: worst |diff| 1.4e-17 over 200 modes
//         MS2 chain, K=qmax=2310: 1.095 <= avg_H<R_H^2> = 2.190 <= B(K+1)/2 = 1.598e+3  HOLDS;  Dirichlet per-mode violations: 0
//         MS3 chain: truth 1.095 <= sum Theta*^2(e^2-1)/12 = 3.340 <= sum Vabs^2(e^2-1)/12 = 19.705 <= B2/12 = 19.710  HOLDS
//         low-frequency mass of <rho~^2>: a'=1 carries 93.7%, a'<=3 carries 96.2%
//   z=17: spectral <rho~^2> = 2.496563 vs closed 2.496563 (rel 4.6e-13)
//         MS2 chain, K=qmax=30030: 2.497 <= avg_H<R_H^2> = 4.993 <= B(K+1)/2 = 2.134e+4  HOLDS;  Dirichlet per-mode violations: 0
//         MS3 chain: truth 2.497 <= sum Theta*^2(e^2-1)/12 = 22.329 <= sum Vabs^2(e^2-1)/12 = 77.249 <= B2/12 = 77.252  HOLDS
//         low-frequency mass of <rho~^2>: a'=1 carries 92.3%, a'<=3 carries 95.3%
//   Theorem A spot check z=13: max over H in {10,100,1000,qmax} of <R_H^2>/(B H) = 0.0258 (<= 1 OK)
//
// S4 COMPOSED PRICING against beta_2 = 4.26645 (exponents base z; sup in weight units)
//    smax = (z^b2 M - 1)/2 (strict, T>=1 built in): a route delivers iff its sup bound <= smax
//    R1 = (3 C_L W ms)^{1/3} Chebyshev+increment (PROVEN, header); R1f = same at C_L = 1 (floor)
//    Mk = (W m_2k)^{1/2k} moment ladder; m_2k measured at z<=29, Gaussian MODEL (2k-1)!! ms^k at z>=31
//    [D3] every W-dependent number here is exp of a log-space sum off lnW = theta(z)
//   z=13  ms=   1.10  C_L=  1.1  smax=1.579e+3  R1=2.00e+1 Y  R1f=1.97e+1 Y  M1=5.03e+1 Y  M2=9.13e+0 Y  M3=5.45e+0 Y
//   z=17  ms=   2.50  C_L=  2.0  smax=4.174e+3  R1=7.72e+1 Y  R1f=6.08e+1 Y  M1=2.74e+2 Y  M2=2.57e+1 Y  M3=1.23e+1 Y
//   z=19  ms=   4.95  C_L=  3.0  smax=5.654e+3  R1=2.85e+2 Y  R1f=1.96e+2 Y  M1=1.59e+3 Y  M2=7.76e+1 Y  M3=3.07e+1 Y
//   z=23  ms=   7.98  C_L=  3.0  smax=1.102e+4  R1=8.90e+2 Y  R1f=6.15e+2 Y  M1=8.80e+3 Y  M2=2.06e+2 Y  M3=6.35e+1 Y
//   z=29  ms=  13.60  C_L=  3.0  smax=2.762e+4  R1=3.02e+3 Y  R1f=2.09e+3 Y  M1=5.51e+4 n  M2=5.89e+2 Y  M3=1.41e+2 Y
//   z=31* ms=  24.74  C_L>  9.0  smax=3.372e+4  R1=1.63e+4 Y  R1f=7.83e+3 Y  M1=4.00e+5 n  M2=1.86e+3 Y  M3=3.37e+2 Y
//   z=37* ms=  85.68  C_L>  7.0  smax=6.881e+4  R1=7.13e+4 n  R1f=3.72e+4 Y  M1=4.15e+6 n  M2=8.15e+3 Y  M3=1.11e+3 Y
//   z=41* ms= 143.93  C_L>  7.0  smax=9.972e+4  R1=2.82e+5 n  R1f=1.47e+5 n  M1=3.27e+7 n  M2=2.61e+4 Y  M3=2.63e+3 Y
//   z=43* ms= 201.45  C_L>  7.0  smax=1.138e+5  R1=1.09e+6 n  R1f=5.69e+5 n  M1=2.48e+8 n  M2=7.80e+4 Y  M3=5.78e+3 Y
//   z=47* ms= 360.90  C_L> 10.0  smax=1.577e+5  R1=5.22e+6 n  R1f=2.42e+6 n  M1=2.17e+9 n  M2=2.67e+5 n  M3=1.45e+4 Y
//   theta_G control: recomputed column vs rho-maxlaw S3 cited, worst |diff| = 4.8e-6 MATCH — budget arithmetic guarded
//   (* = ms cited / C_L a sampled lower bound (verdict letters INDICATIVE, not proofs) / moments Gaussian MODEL at z >= 31;
//    at z <= 29 every input is exact and a Y verdict is a PROVEN finite-z clearing.)
//   budget accounting: factor over the Gaussian form G = rms sqrt(2 lnW), vs the allowed z^lambda_max;
//   consumed = ln(factor)/ln(budget) — the fraction of the sufficiency budget the recovery spends
//    z   budget z^lam    R1 factor  consumed    M2 factor  consumed    M3 factor  consumed   k_min
//   13      383.5      4.86e+0    0.266     2.22e+0    0.134     1.32e+0    0.047     1
//   17      581.8      1.08e+1    0.373     3.58e+0    0.200     1.71e+0    0.085     1
//   19      495.6      2.49e+1    0.518     6.80e+0    0.309     2.69e+0    0.159     1
//   23      687.9      5.55e+1    0.615     1.28e+1    0.391     3.96e+0    0.211     1
//   29     1208.1      1.32e+2    0.688     2.58e+1    0.458     6.17e+0    0.256     2
//   31     1008.8      4.88e+2    0.895     5.55e+1    0.581     1.01e+1    0.334     2
//   37     1030.4      1.07e+3    1.005     1.22e+2    0.693     1.67e+1    0.405     2
//   41     1079.7      3.06e+3    1.149     2.82e+2    0.808     2.85e+1    0.480     2
//   43      981.9      9.40e+3    1.328     6.73e+2    0.945     4.99e+1    0.567     2
//   47      963.4      3.19e+4    1.509     1.63e+3    1.077     8.85e+1    0.652     3
//   at the weakest measured point z = 47: M3 spends factor 88.5 of the 963 budget (65% in log terms); M2 factor 1.6e+3; R1 vs smax: over (C_L a lower bound there).
//   route looseness against the measured sup (exact levels only):
//   z=13: sup=  2.620  R1/sup=    7.6  M1/sup=  19.2  M2/sup=  3.5  M3/sup=  2.1  Gauss/sup=1.57
//   z=17: sup=  4.337  R1/sup=   17.8  M1/sup=  63.1  M2/sup=  5.9  M3/sup=  2.8  Gauss/sup=1.65
//   z=19: sup=  9.152  R1/sup=   31.1  M1/sup= 173.7  M2/sup=  8.5  M3/sup=  3.4  Gauss/sup=1.25
//   z=23: sup= 12.106  R1/sup=   73.5  M1/sup= 726.8  M2/sup= 17.0  M3/sup=  5.2  Gauss/sup=1.32
//   z=29: sup= 17.902  R1/sup=  168.8  M1/sup=3076.3  M2/sup= 32.9  M3/sup=  7.9  Gauss/sup=1.28
//
// S5 DEATH SCANS (theta(z) exact by sieve; M model 0.35/ln^2 z and ms model anchored at z=29,
//    slope 4.471 = 2 x 2.2355 — both MEASURED-model inputs, flagged; conclusions are about the routes, not G2)
//   R1 floor (C_L = 1, ms = 1; no lemma can do better on this route): dies at z = 47
//   R1 floor with the measured-model ms: dies at z = 41   (with real C_L / ms it is tested per-z in S4)
//   M2 (4th moment, Gaussian model): dies at z = 53;  M3 (6th moment): dies at z = 73
//   the CRUDE all-z provable cap (qmax -> z^6 ceiling; the exact-qmax caps at z <= 47 are the S5 table):
//     B=1.5: cap > beta_2 on z in [23, 2767], peak 4.7391 at z = 31; below beta_2 again for all scanned z > 2767
//     Bdrift: cap > beta_2 on z in [23, 3547], peak 4.7358 at z = 31; below beta_2 again for all scanned z > 3547
//   so the unconditional F4 => win composition is EXACT at z <= 47 (table below) and CRUDE-PROVEN
//   past the re-entry point; the window between is covered only if qmax/B2 keep their measured growth.
//   the MS cap on theta_G at measured z, exact B, B2, qmax (uses NO measured ms — proven bounds only):
//    z    theta_G measured   cap via MS2   cap via MS3   MS3 cap - beta_2
//   13      1.9470           3.3672        2.5104         -1.7561
//   17      2.0195           3.6172        2.6252         -1.6413
//   19      2.1588           4.0626        2.7326         -1.5339
//   23      2.1827           3.9832        2.7427         -1.5238
//   29      2.1589           3.9598        2.7323         -1.5342
//   31      2.2523           4.0834        2.8129         -1.4536
//   37      2.3451           4.0803        2.8664         -1.4000
//   41      2.3857           4.1159        2.8979         -1.3685
//   43      2.4347           4.1167        2.9386         -1.3279
//   47      2.4820           4.1775        2.9740         -1.2924
//   asymptotics: cap = s + 1/2 + (2 lnln z + O(1))/ln z -> 3.5 < beta_2, margin 0.766;
//   with the PROVEN B = O(log^8 z) the extra 4 lnln z/ln z still vanishes: the cap ends below beta_2 either way.
//   moment order needed for beta_2 at all z: k(z) ~ theta(z)/(2 (beta_2 - s - 1/2) ln z) -> infinity like z/(1.53 ln z):
//     z=  47: k ~ 6.3
//     z= 101: k ~ 11.8
//     z= 211: k ~ 23.0
//     z= 499: k ~ 49.2
//     z=1009: k ~ 90.2
//
// DONE 59.2s
// ============================================================================
// READINGS — figures quoted from the block above; grades per the house legend
// ============================================================================
// 1. THE <rho^2> LEMMA IS NO LONGER MISSING — IT IS PROVED, THREE WAYS, AT
//    EXPONENT 2s. [PROVEN here; every step machine-verified above] MS1
//    (elementary closed form + multiplicity (9/2)tau(q) + Mertens):
//    <rho~^2> <= GS/12 <= C z^{2s} ln^8 z. MS2 (through Theorem A + the exact
//    H-average transfer, Dirichlet violations 0): <rho~^2> <= B(qmax+1)/2.
//    MS3 (the exact Fejer-type identity sum 1/(4 sin^2) = (e^2-1)/12, worst
//    rel 3.2e-15): <rho~^2> <= B2/12, B2 = sum e^2 Vabs(e)^2 <= qmax B. All
//    three land at rms(rho~) <= z^{s+o(1)} = z^{3+o(1)} with B = O(log^8 z)
//    unconditional. rho-maximal-law.md's NOT-REACHED item is closed in the
//    affirmative: the "analytic bound on <rho^2>(z)" exists with no hypothesis.
// 2. MS3 IS THE SHARP FORM AT FINITE z. [VERIFIED] It beats MS2 by 81.1x to
//    10581.9x across z = 13..47 and sits 18x..48x above the truth with no
//    strong trend (column MS3/truth; MS2's slack is that times the last column). The
//    chain truth <= sum Theta*^2 (e^2-1)/12 <= sum Vabs^2 (e^2-1)/12 <= B2/12
//    HOLDS exactly at z = 13, 17; the Theta* -> Vabs triangle costs ~5.9x,
//    the max_a step ~3.0x-8.9x. Low-frequency mass: a' = 1 carries 93.7% /
//    92.3% of <rho~^2> — the variance lives at the lowest frequency per
//    modulus, which is why the e^2/12 weight is nearly exact.
// 3. THE COMPOSED REQUIREMENT, PRICED. [DERIVED in header; measured above]
//    MS(c) + recovery loss z^l => RML(c+l), wins iff c + l < beta_2. Proven
//    c = 3 + o(1) leaves l < beta_2 - 3. The Gaussian recovery (F4) costs
//    l = 1/2 + o(1) — margin 0.766, so F4 alone now implies G2(z#) <<
//    z^{3.5+eps} THROUGH the proven mean square. Unconditionally, theta_G is
//    capped: via MS3 the cap reads 2.5104..2.9740 at z = 13..47, BELOW
//    beta_2 at every measured level (-1.7561 to -1.2924), and -> 3.5 in the limit:
//    the sufficiency curve's room cannot close (rho-maxlaw S6 model A's
//    closing at z ~ 5e3 is excluded as an asymptote; model B wins the
//    qualitative question). Caveat, stated: the CRUDE all-z cap (qmax -> z^6)
//    exceeds beta_2 on one finite window (S5 scan prints it) before
//    re-entering, so the F4 => win composition is exact at z <= 47, crude-
//    proven past re-entry, and model-covered between.
// 4. PROVEN RECOVERY MECHANISMS ALL PAY e^{theta/(2k)} AND DIE. [MEASURED /
//    MODEL as flagged] R1 (Chebyshev + the exact increment constant C_L =
//    max|M - cc|, identity verified at every position of z = 13): clears
//    smax at z = 13..29 with EXACT inputs — a proven finite-z clearing —
//    then fails certifiably at z = 37..47 (its C_L there is a lower bound
//    and R1 already exceeds smax); its absolute floor (C_L = ms = 1) dies at
//    z = 47. M2/M3 (moment ladder): M3 clears every measured z consuming
//    4.7% -> 65% of the sufficiency budget in log terms (963-budget column),
//    M2 dies at z = 47 (model), M3 at z = 73 (model); the order needed grows
//    like z/(1.53 ln z). k_min = 1 at z <= 23 reproduces attack-beta2-01's
//    "second moment alone clears beta_2 up to z = 23" from independent code.
// 5. WHERE THE ANALYTIC PUSH STOPS, NAMED. [INFERRED] The mean-square side is
//    now a theorem, so RML's entire unproven content is sup-recovery, and
//    every proven mechanism pays the position-union factor W^{1/(2k)} with
//    only k = 1 machinery in the corpus. The first unproven object is the
//    FOURTH moment <rho~^4> — the quartic gcd-lattice correlation (the
//    mode-resonance sum a1/e1 + a2/e2 + a3/e3 + a4/e4 in Z). A bound
//    <rho~^4> << <rho~^2>^2 polylog would cut the union price from
//    e^{theta/2} to e^{theta/4}; no Theorem-A analogue exists for it.
// 6. THE MOMENTS OF rho~ ARE SUB-GAUSSIAN AT EVERY MEASURABLE LEVEL — FIRST
//    MEASUREMENT. [MEASURED, z = 13..29 full periods, walker verified against
//    brute force / closed form / cited sup at every level] m4/m2^2 = 2.509,
//    2.321, 2.893, 2.896, 2.918 vs Gaussian 3; m6/m2^3 = 8.60..14.00 vs 15;
//    m8/m2^4 = 34.8..93.5 vs 105 — every ratio BELOW Gaussian, drifting up.
//    The shrunk lemma of reading 5 is measured TRUE with margin: proving the
//    measured m4 <= 3 m2^2 is the first rung of the ladder, strictly easier
//    than F4, and already worth e^{theta/4} against e^{theta/2}.
// 7. SALVAGE VERDICT ON THE ORPHAN DRAFT. [VERIFIED] Its architecture and
//    S3/S4 arithmetic survive; its multiplicity lemma was FALSE as written —
//    m(q)/(1.5 tau) = 3.0000 exactly at z = 13, 17, 19, the three
//    certificate blocks it forgot — and the proven (9/2)tau cap is tight
//    (ratio 1.0000). Its GS omitted the g = 1 pairs and its W = P(47) >
//    2^53 arithmetic is replaced by log-space sums (WIDTH RULE). None of the
//    four defects changes a verdict; the multiplicity one changes a constant
//    (81/4 for 9/4) in a bound whose slack is 10^7.
