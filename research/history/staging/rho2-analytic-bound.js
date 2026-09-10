// ============================================================================
// rho2-analytic-bound.js — AUDIT + EXPLICIT-CONSTANT CLOSURE of the <rho~^2>
//   upper bound. SCRATCHPAD GRADE. Not a new route.
// ============================================================================
// STANDING: TODO item 0's named first move ("an analytic upper bound on
// <rho^2>(z) from its PROVEN closed form") was ALREADY EXECUTED on 2026-08-21
// by research/attack-rhoms-01.js / history/staging/attack-rhoms-01.md, which
// proves <rho~^2> <= C z^{2s} ln^8 z three ways (MS1/MS2/MS3). This file does
// not redo that. It does two things the existing artifact leaves open:
//   (a) an INDEPENDENT reproduction of the PROVEN closed form at small z,
//       from the repo's own buildTerms/meanSquare, against the cited column;
//   (b) MS1's constant C made EXPLICIT and all-z (attack-rhoms-01 leaves it
//       as an unnamed "C" and tabulates the Mertens products numerically only
//       to z = 31), plus the ratio bound/exact at every embedded level.
//
// THE OBJECT (rho-maximal-law.md sec.1). rho_z(y) = sum_j w_j psi((y-c_j)/q_j),
// psi(t) = t - floor(t) - 1/2, over the divisor-pair lattice of the
// Brudern-Fouvry certificate at s = 3.0; rho~ = rho + M/2; <rho~^2> the exact
// period variance. PROVEN closed form (sift-limit-lemmaV.js meanSquare, field
// `rho2`; = plateau/2):
//     <rho~^2> = sum_{i,j} w_i w_j C_ij,
//     C_ij = [ (g^2-1)/12 - dbar(g-dbar)/2 ] / (q_i q_j),
//     g = gcd(q_i,q_j),  dbar = (c_j - c_i) mod g;  g = 1 => C_ij = 0.
//
// THE DERIVATION MADE EXPLICIT (MS1, re-derived here step by step):
//  (1) For g >= 2 and dbar in {0..g-1}, f(dbar) = (g^2-1)/12 - dbar(g-dbar)/2
//      has max (g^2-1)/12 at dbar = 0 and min >= -(g^2+2)/24, and
//      (g^2+2)/24 <= (g^2-1)/12 exactly when g^2 >= 4. So
//          |C_ij| <= (g^2-1)/(12 q_i q_j)   for every pair,  hence
//          <rho~^2> <= GS/12,  GS = sum_{i,j} g^2/(q_i q_j).       [tight at 1.0000]
//  (2) Group by modulus. m(q) = #lattice terms of modulus q is PROVABLY
//      <= (9/2) tau(q) (attack-rhoms-01 sec.2: (3/2)tau per block x 3 blocks;
//      measured ratio to that cap = 1.0000, i.e. the cap is attained). So
//          GS <= (81/4) sum_{q,q' | P(z), q,q' <= qmax} tau(q)tau(q') g^2/(qq').
//  (3) Substitute q = gu, q' = gv (dropping (u,v) = 1: all terms positive, so
//      this over-counts and stays an upper bound); q squarefree => g,u coprime
//      => tau(gu) = 2^{omega(g)} 2^{omega(u)}:
//          GS <= (81/4) [ sum_{g | P(z), g <= qmax} 4^{omega(g)} ]
//                       [ sum_{u | P(z)} 2^{omega(u)}/u ]^2.
//  (4) sum_{g <= X} 4^{omega(g)} <= X sum_{g|P(z)} 4^{omega(g)}/g
//                                 = X prod_{p<z} (1 + 4/p);
//      sum_{u|P(z)} 2^{omega(u)}/u = prod_{p<z} (1 + 2/p).
//  (5) qmax = max_j q_j <= min( D^2, P(z) ) = min( z^{2s}, e^{theta(z)} ),
//      since every d_i <= D = z^s and q = [d1,d2] divides P(z). For large z
//      z^{2s} binds. Hence, EXPLICIT and unconditional:
//
//          <rho~^2>  <=  (81/48) * z^{2s} * P4(z) * P2(z)^2,          [FORM I]
//          P4 = prod_{p<z}(1+4/p),  P2 = prod_{p<z}(1+2/p).
//
//  (6) Closing the products. (1+k/p) <= (1-1/p)^{-k} for integer k >= 1
//      (binomial series, all terms nonnegative), so P4 P2^2 <= Merten^8 with
//      Merten = prod_{p<z}(1-1/p)^{-1}. With the Rosser-Schoenfeld explicit
//      upper bound [MEMORY, RS 1962 Thm 3.42, NOT read at a page this
//      session; verified numerically below over the tested range]
//          prod_{p<=x}(1-1/p)^{-1} < e^gamma ln x (1 + 1/(2 ln^2 x)),
//      one gets the closed all-z form
//
//          <rho~^2>  <=  (27/16) e^{8 gamma} * z^{2s} * ln^8 z *
//                        (1 + 1/(2 ln^2 z))^8
//                    =   170.9 * z^{2s} * ln^8 z * (1+1/(2ln^2 z))^8   [FORM I*]
//
//      i.e. exponent 2s = 6 at s = 3.0, constant 170.9, polylog ln^8 z.
//      rms(rho~) <= 13.07 * z^{s} * ln^4 z * (1+1/(2ln^2 z))^4.
//
//  FORM II, for comparison (MS3 route made explicit): <rho~^2> <= B2/12 <=
//      qmax*B/12 <= z^{2s} * 9 A^2 (E-1) / 12, A = (5/2)prod_{2<p<z}(1+2/p),
//      E = (43/25)prod_{2<p<z}(1+4p/(p+2)^2)  (attack-AB-bounded.md Thm 1).
//      Same exponent 2s, different (larger, here) explicit constant.
//
// CITED (embedded artifacts, standing compute rule — NOT recomputed):
//   the exact <rho~^2> column at z = 13..47, qmax, B, B2/12, R1 and smax:
//   research/attack-rhoms-01.js OUTPUT S0/S3/S4 (out-sha256 4377df4f...).
//   beta_2 = 4.26645 per paper/beta2-note.md.
// RECOMPUTED (cheap): the closed form at z = 13..23 via the repo's own
//   buildTerms/meanSquare; all Mertens-type products; the RS closure check.
//
//   node research/history/staging/rho2-analytic-bound.js       (~5 s)
// ============================================================================
'use strict';
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const { buildTerms, meanSquare } = require(path.join(REPO, 'sift-limit-lemmaV.js'));

const S = 3.0, B2CONST = 4.26645, GAMMA = 0.5772156649015329;
const Z = [13,17,19,23,29,31,37,41,43,47];

// --- CITED columns (attack-rhoms-01.js OUTPUT; do not edit without re-citing)
const CITED_MS = {13:1.095066,17:2.496563,19:4.952375,23:7.982480,29:13.595974,
                  31:24.738489,37:85.677,41:143.927,43:201.454,47:360.902};
const CITED_QMAX = {13:2310,17:30030,19:510510,23:881790,29:3432198,31:9699690,
                    37:31870410,41:73277490,43:83650710,47:223092870};
const CITED_B  = {13:1.3833,17:1.4214,19:1.4348,23:1.4503,29:1.4660,31:1.4764,
                  37:1.4883,41:1.4963,43:1.5057,47:1.5135};
const CITED_MS3 = {13:1.9710e1,17:7.7252e1,19:1.4523e2,23:2.6746e2,29:6.4627e2,
                   31:1.1625e3,37:3.6976e3,41:6.4644e3,43:8.9156e3,47:1.5955e4};
const CITED_R1 = {13:2.00e1,17:7.72e1,19:2.85e2,23:8.90e2,29:3.02e3,31:1.63e4,
                  37:7.13e4,41:2.82e5,43:1.09e6,47:5.22e6};
const CITED_R1F= {13:1.97e1,17:6.08e1,19:1.96e2,23:6.15e2,29:2.09e3,31:7.83e3,
                  37:3.72e4,41:1.47e5,43:5.69e5,47:2.42e6};
const CITED_SMAX={13:1.579e3,17:4.174e3,19:5.654e3,23:1.102e4,29:2.762e4,
                  31:3.372e4,37:6.881e4,41:9.972e4,43:1.138e5,47:1.577e5};
const CITED_SUP = {13:2.62013,17:4.33665,19:9.15247,23:12.10617,29:17.90249};

function primesBelow(n){const s=new Uint8Array(n).fill(1);s[0]=s[1]=0;
  for(let i=2;i*i<n;i++) if(s[i]) for(let j=i*i;j<n;j+=i) s[j]=0;
  const o=[];for(let i=2;i<n;i++) if(s[i]) o.push(i); return o;}
const P = primesBelow(4000000);
const pLess = z => { const o=[]; for(const p of P){ if(p>=z) break; o.push(p);} return o; };
const prodF = (z,f) => pLess(z).reduce((a,p)=>a*f(p),1);
const P2 = z => prodF(z, p=>1+2/p);
const P4 = z => prodF(z, p=>1+4/p);
const MERT = z => prodF(z, p=>1/(1-1/p));
const AA = z => 2.5  * pLess(z).filter(p=>p>2).reduce((a,p)=>a*(1+2/p),1);
const EE = z => 1.72 * pLess(z).filter(p=>p>2).reduce((a,p)=>a*(1+4*p/((p+2)*(p+2))),1);
const RS = z => { const L=Math.log(z); return Math.exp(GAMMA)*L*(1+1/(2*L*L)); };
const fmt=(x,d=4)=>Number.isFinite(x)?x.toExponential(d):String(x);
const pad=(s,n)=>String(s).padStart(n);

console.log('S0 CONTROLS — the PROVEN closed form, reproduced independently');
console.log('   repo buildTerms(z, z^3) + meanSquare(t,H).rho2  vs the CITED column');
console.log('   (H is irrelevant to rho2: the H-free potential. Two H used as a control.)');
for(const z of [13,17,19,23]){
  const t = buildTerms(z, Math.pow(z,S));
  const a = meanSquare(t, 10).rho2, b = meanSquare(t, 1000).rho2;
  const c = CITED_MS[z];
  console.log(`   z=${pad(z,2)}  n=${pad(t.n,6)}  rho2(H=10)=${a.toFixed(6)}  rho2(H=1000)=${b.toFixed(6)}`
    + `  H-invariance rel=${(Math.abs(a-b)/a).toExponential(1)}`
    + `  cited=${c.toFixed(6)}  rel=${(Math.abs(a-c)/c).toExponential(1)}`
    + `  ${Math.abs(a-c)/c<5e-7?'MATCH (to the 6 dp the citation carries)':'*** MISMATCH ***'}`);
}
{ // step-(1) constant check, symbolic-numeric: |f(dbar)| <= (g^2-1)/12 for g>=2
  let worst=0, wg=0;
  for(let g=2;g<=4000;g++){ const cap=(g*g-1)/12;
    for(let d=0;d<g;d++){ const v=Math.abs(cap - d*(g-d)/2); if(v/cap>worst){worst=v/cap;wg=g;} } }
  console.log(`   step (1) |C_ij|12qq'/(g^2-1) <= 1 over all g = 2..4000, all dbar: worst ratio `
    + `${worst.toFixed(6)} at g=${wg}  ${worst<=1?'PASS':'FAIL'}`);
}
{ // step-(6) elementary inequality (1+k/p) <= (1-1/p)^{-k}
  let ok=true; for(const p of pLess(1000)) for(const k of [2,4])
    if(1+k/p > Math.pow(1-1/p,-k)+1e-15) ok=false;
  console.log(`   step (6) (1+k/p) <= (1-1/p)^-k for k = 2,4 over all p < 1000: ${ok?'PASS':'FAIL'}`);
}
{ // RS closure, verified numerically over the range used (the citation is [MEMORY])
  let worst=0, wz=0, viol=0;
  for(const z of [13,17,19,23,29,31,37,41,43,47,101,1009,10007,100003,1000003,3999971]){
    const r = MERT(z)/RS(z); if(r>worst){worst=r;wz=z;} if(r>1) viol++;
  }
  console.log(`   RS closure prod(1-1/p)^-1 / [e^g ln z (1+1/(2ln^2 z))] over z = 13..4e6: `
    + `worst ${worst.toFixed(6)} at z=${wz}, violations ${viol}  ${viol===0?'PASS (in range)':'FAIL'}`);
  console.log(`   [MEMORY] the RS 1962 Thm 3.42 upper bound is quoted from memory, NOT read at a`);
  console.log(`            page this session; the line above verifies it only where tested.`);
}

{ // step-(5) check: is qmax <= min(z^{2s}, P(z)) at every cited level?
  let bad=0, worst=0, wz=0;
  for(const z of Z){ const lnP=pLess(z).reduce((a,p)=>a+Math.log(p),0);
    const cap=Math.min(2*S*Math.log(z), lnP), r=Math.log(CITED_QMAX[z])/cap;
    if(r>1) bad++; if(r>worst){worst=r;wz=z;} }
  console.log(`   step (5) cited qmax <= min(z^{2s}, P(z)) at all ten levels: worst ln-ratio `
    + `${worst.toFixed(4)} at z=${wz}, violations ${bad}  ${bad===0?'PASS':'FAIL'}`);
}

console.log('\nS1 FORM I — the explicit all-z bound, and its ratio to the exact <rho~^2>');
console.log('   FORM I    = (81/48) qmax P4 P2^2      (exact products; qmax as marked)');
console.log('   FORM I*   = (27/16) e^{8g} z^{2s} ln^8 z (1+1/(2ln^2 z))^8   (closed, all-z)');
console.log('    z    P2       P4      exact ms   I(qmax cited)  I(qmax<=z^6)   FORM I*      I*/exact');
for(const z of Z){
  const p2=P2(z), p4=P4(z), ms=CITED_MS[z];
  const c0=81/48, zq=Math.pow(z,2*S);
  const Iq = c0*CITED_QMAX[z]*p4*p2*p2, Iz = c0*zq*p4*p2*p2;
  const L=Math.log(z);
  const Istar = (27/16)*Math.exp(8*GAMMA)*zq*Math.pow(L,8)*Math.pow(1+1/(2*L*L),8);
  console.log(`   ${pad(z,2)}  ${pad(p2.toFixed(3),7)}  ${pad(p4.toFixed(2),6)}  ${pad(ms.toFixed(3),9)}`
    + `  ${pad(fmt(Iq,3),11)}  ${pad(fmt(Iz,3),11)}  ${pad(fmt(Istar,3),11)}  ${fmt(Istar/ms,3)}`);
}
console.log(`   constant: (27/16) e^{8 gamma} = ${((27/16)*Math.exp(8*GAMMA)).toFixed(2)}`);

console.log('\nS2 FORM II — MS3 route with the explicit B ceiling 9A^2(E-1), same exponent');
console.log('    z      A        E      9A^2(E-1)  B cited   II(qmax cited)  II(qmax<=z^6)   MS3 cited (B2/12)  MS3/exact');
for(const z of Z){
  const A=AA(z), E=EE(z), Bb=9*A*A*(E-1);
  const IIq=CITED_QMAX[z]*Bb/12, IIz=Math.pow(z,2*S)*Bb/12;
  console.log(`   ${pad(z,2)}  ${pad(A.toFixed(2),7)}  ${pad(E.toFixed(2),7)}  ${pad(fmt(Bb,3),10)}`
    + `  ${pad(CITED_B[z].toFixed(4),7)}  ${pad(fmt(IIq,3),13)}  ${pad(fmt(IIz,3),12)}`
    + `  ${pad(fmt(CITED_MS3[z],3),15)}  ${pad((CITED_MS3[z]/CITED_MS[z]).toFixed(1),8)}`);
}

console.log('\nS3 THE RATIO TABLE the brief asks for: bound / exact, every embedded level');
console.log('   columns: (a) FORM I* closed all-z  (b) FORM I with cited qmax  (c) FORM II with cited qmax');
console.log('            (d) MS3 = B2/12 cited (needs the MEASURED B2 — not an all-z form)');
console.log('    z     exact ms      (a) I*/ms    (b) I/ms     (c) II/ms    (d) MS3/ms');
for(const z of Z){
  const ms=CITED_MS[z], L=Math.log(z), zq=Math.pow(z,2*S);
  const Istar=(27/16)*Math.exp(8*GAMMA)*zq*Math.pow(L,8)*Math.pow(1+1/(2*L*L),8);
  const Iq=(81/48)*CITED_QMAX[z]*P4(z)*P2(z)*P2(z);
  const IIq=CITED_QMAX[z]*9*AA(z)*AA(z)*(EE(z)-1)/12;
  console.log(`   ${pad(z,2)}  ${pad(ms.toFixed(3),10)}  ${pad(fmt(Istar/ms,3),11)}  ${pad(fmt(Iq/ms,3),11)}`
    + `  ${pad(fmt(IIq/ms,3),11)}  ${pad(fmt(CITED_MS3[z]/ms,3),11)}`);
}

console.log('\nS4 GROWTH ORDER — is the exponent 2s real, or is the polylog eating it?');
for(const z of [47,1009,100003,1000003]){
  const L=Math.log(z), zq=Math.pow(z,2*S);
  const Istar=(27/16)*Math.exp(8*GAMMA)*zq*Math.pow(L,8)*Math.pow(1+1/(2*L*L),8);
  console.log(`   z=${pad(z,8)}  FORM I* = ${fmt(Istar,4)}   log_z(FORM I*) = ${(Math.log(Istar)/L).toFixed(4)}`
    + `   (limit 2s = ${(2*S).toFixed(1)}; the ln^8 z surcharge is ${(8*Math.log(L)/L).toFixed(4)} in exponent)`);
}

console.log('\nS5 WHAT THE SECOND MOMENT CANNOT DO: the Chebyshev miss, at the measured levels');
console.log('   R1 = (3 C_L W <rho~^2>)^{1/3} is the ONLY proven recovery (attack-rhoms-01 sec.1).');
console.log('   R1f is its absolute floor (C_L = 1, ms = 1): no mean-square lemma can beat it.');
console.log('   smax = (z^{beta2} M - 1)/2 is what RML must clear. All four columns CITED.');
console.log('    z    smax       R1        R1/smax   R1f       R1f/smax   miss in exponent (R1f)');
for(const z of Z){
  const r=CITED_R1[z]/CITED_SMAX[z], rf=CITED_R1F[z]/CITED_SMAX[z];
  console.log(`   ${pad(z,2)}  ${pad(fmt(CITED_SMAX[z],2),8)}  ${pad(fmt(CITED_R1[z],2),8)}  ${pad(r.toFixed(3),8)}`
    + `  ${pad(fmt(CITED_R1F[z],2),8)}  ${pad(rf.toFixed(3),8)}   ${(Math.log(rf)/Math.log(z)).toFixed(4)}`);
}
console.log('   reading: R1 clears (ratio < 1) at z = 13..31 and fails from z = 37; its FLOOR fails');
console.log('   from z = 41. The failure is e^{theta(z)/3} against z^{beta2}: theta(z) ~ z beats any');
console.log('   power of z, so the miss diverges. Chebyshev off a second moment cannot reach RML at');
console.log('   any exponent, and the mean-square lemma is therefore an INGREDIENT, not a route.');

console.log('\nS6 WHAT THE SECOND MOMENT DOES DO (cited arithmetic, restated, not re-derived)');
{
  const cap = S + 0.5;
  console.log(`   composed: MS(c) x REC(l) => RML(c+l), wins iff c+l < beta_2 = ${B2CONST}`);
  console.log(`   proven c = s + o(1) = ${S} (this file's FORM I*, exponent 2s halved for the rms)`);
  console.log(`   F4 (Gaussian recovery, UNPROVEN; measured true at 5 levels) costs l = 1/2 + o(1)`);
  console.log(`   => F4 implies RML(${cap}+eps), margin beta_2 - ${cap} = ${(B2CONST-cap).toFixed(3)}`);
  console.log(`   => theta_G is capped at ${cap} + o(1) UNCONDITIONALLY, so lambda_max = beta_2 -`);
  console.log(`      theta_G cannot close asymptotically (rho-maxlaw reading 6 model A excluded).`);
  console.log(`   NOTHING here lowers a delivered exponent: without F4 or another recovery the`);
  console.log(`   mean-square bound delivers NO bound on G2 at all.`);
}
console.log('\nDONE');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/rho2-analytic-bound.js
//   invocation:  node research/history/staging/rho2-analytic-bound.js
//   code-sha256: b46d15636c0f5c804c942d6ac503ccb6cebb2cdc110b55c677880fdd5bc3fe30
//   out-sha256:  282dd92993d45e3bfd2234609094347a7010b60c3171b2f710e1fb93c4f0af50
//   body-lines:  95
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     4.8 s
// ============================================================================
// S0 CONTROLS — the PROVEN closed form, reproduced independently
//    repo buildTerms(z, z^3) + meanSquare(t,H).rho2  vs the CITED column
//    (H is irrelevant to rho2: the H-free potential. Two H used as a control.)
//    z=13  n=   852  rho2(H=10)=1.095066  rho2(H=1000)=1.095066  H-invariance rel=0.0e+0  cited=1.095066  rel=4.4e-7  MATCH (to the 6 dp the citation carries)
//    z=17  n=  2236  rho2(H=10)=2.496563  rho2(H=1000)=2.496563  H-invariance rel=0.0e+0  cited=2.496563  rel=1.9e-7  MATCH (to the 6 dp the citation carries)
//    z=19  n=  4764  rho2(H=10)=4.952375  rho2(H=1000)=4.952375  H-invariance rel=0.0e+0  cited=4.952375  rel=7.9e-8  MATCH (to the 6 dp the citation carries)
//    z=23  n=  9636  rho2(H=10)=7.982480  rho2(H=1000)=7.982480  H-invariance rel=0.0e+0  cited=7.982480  rel=5.9e-8  MATCH (to the 6 dp the citation carries)
//    step (1) |C_ij|12qq'/(g^2-1) <= 1 over all g = 2..4000, all dbar: worst ratio 1.000000 at g=2  PASS
//    step (6) (1+k/p) <= (1-1/p)^-k for k = 2,4 over all p < 1000: PASS
//    RS closure prod(1-1/p)^-1 / [e^g ln z (1+1/(2ln^2 z))] over z = 13..4e6: worst 0.998681 at z=19, violations 0  PASS (in range)
//    [MEMORY] the RS 1962 Thm 3.42 upper bound is quoted from memory, NOT read at a
//             page this session; the line above verifies it only where tested.
//    step (5) cited qmax <= min(z^{2s}, P(z)) at all ten levels: worst ln-ratio 1.0000 at z=13, violations 0  PASS
//
// S1 FORM I — the explicit all-z bound, and its ratio to the exact <rho~^2>
//    FORM I    = (81/48) qmax P4 P2^2      (exact products; qmax as marked)
//    FORM I*   = (27/16) e^{8g} z^{2s} ln^8 z (1+1/(2ln^2 z))^8   (closed, all-z)
//     z    P2       P4      exact ms   I(qmax cited)  I(qmax<=z^6)   FORM I*      I*/exact
//    13    7.091   27.00      1.095     5.292e+6    1.106e+10    2.776e+12  2.535e+12
//    17    8.182   35.31      2.497     1.198e+8    9.627e+10    2.777e+13  1.112e+13
//    19    9.144   43.62      4.952     3.142e+9    2.895e+11    7.113e+13  1.436e+13
//    23   10.107   52.80      7.982     8.025e+9    1.347e+12    3.514e+14  4.403e+13
//    29   10.986   61.98     13.596    4.332e+10    7.508e+12    2.373e+15  1.745e+14
//    31   11.743   70.53     24.738    1.592e+11    1.457e+13    4.088e+15  1.653e+14
//    37   12.501   79.63     85.677    6.693e+11    5.388e+13    1.712e+16  1.999e+14
//    41   13.177   88.24    143.927    1.894e+12    1.228e+14    3.904e+16  2.712e+14
//    43   13.820   96.85    201.454    2.611e+12    1.973e+14    5.712e+16  2.835e+14
//    47   14.462  105.86    360.902    8.335e+12    4.027e+14    1.160e+17  3.213e+14
//    constant: (27/16) e^{8 gamma} = 170.88
//
// S2 FORM II — MS3 route with the explicit B ceiling 9A^2(E-1), same exponent
//     z      A        E      9A^2(E-1)  B cited   II(qmax cited)  II(qmax<=z^6)   MS3 cited (B2/12)  MS3/exact
//    13     8.86     6.08    3.592e+3   1.3833       6.914e+5      1.445e+9         1.971e+1      18.0
//    17    10.23     7.48    6.105e+3   1.4214       1.528e+7     1.228e+10         7.725e+1      30.9
//    19    11.43     8.89    9.283e+3   1.4348       3.949e+8     3.639e+10         1.452e+2      29.3
//    23    12.63    10.43    1.354e+4   1.4503       9.951e+8     1.671e+11         2.675e+2      33.5
//    29    13.73    11.96    1.861e+4   1.4660       5.321e+9     9.222e+11         6.463e+2      47.5
//    31    14.68    13.41    2.406e+4   1.4764      1.945e+10     1.779e+12         1.163e+3      47.0
//    37    15.63    14.93    3.062e+4   1.4883      8.132e+10     6.547e+12         3.698e+3      43.2
//    41    16.47    16.39    3.757e+4   1.4963      2.294e+11     1.487e+13         6.464e+3      44.9
//    43    17.27    17.84    4.522e+4   1.5057      3.153e+11     2.382e+13         8.916e+3      44.3
//    47    18.08    19.35    5.399e+4   1.5135      1.004e+12     4.849e+13         1.596e+4      44.2
//
// S3 THE RATIO TABLE the brief asks for: bound / exact, every embedded level
//    columns: (a) FORM I* closed all-z  (b) FORM I with cited qmax  (c) FORM II with cited qmax
//             (d) MS3 = B2/12 cited (needs the MEASURED B2 — not an all-z form)
//     z     exact ms      (a) I*/ms    (b) I/ms     (c) II/ms    (d) MS3/ms
//    13       1.095    2.535e+12     4.833e+6     6.314e+5     1.800e+1
//    17       2.497    1.112e+13     4.798e+7     6.119e+6     3.094e+1
//    19       4.952    1.436e+13     6.344e+8     7.975e+7     2.933e+1
//    23       7.982    4.403e+13     1.005e+9     1.247e+8     3.351e+1
//    29      13.596    1.745e+14     3.187e+9     3.914e+8     4.753e+1
//    31      24.738    1.653e+14     6.436e+9     7.861e+8     4.699e+1
//    37      85.677    1.999e+14     7.812e+9     9.492e+8     4.316e+1
//    41     143.927    2.712e+14    1.316e+10     1.594e+9     4.491e+1
//    43     201.454    2.835e+14    1.296e+10     1.565e+9     4.426e+1
//    47     360.902    3.213e+14    2.310e+10     2.781e+9     4.421e+1
//
// S4 GROWTH ORDER — is the exponent 2s real, or is the polylog eating it?
//    z=      47  FORM I* = 1.1597e+17   log_z(FORM I*) = 10.2054   (limit 2s = 6.0; the ln^8 z surcharge is 2.8012 in exponent)
//    z=    1009  FORM I* = 1.0265e+27   log_z(FORM I*) = 8.9921   (limit 2s = 6.0; the ln^8 z surcharge is 2.2368 in exponent)
//    z=  100003  FORM I* = 5.4369e+40   log_z(FORM I*) = 8.1470   (limit 2s = 6.0; the ln^8 z surcharge is 1.6979 in exponent)
//    z= 1000003  FORM I* = 2.3160e+47   log_z(FORM I*) = 7.8941   (limit 2s = 6.0; the ln^8 z surcharge is 1.5205 in exponent)
//
// S5 WHAT THE SECOND MOMENT CANNOT DO: the Chebyshev miss, at the measured levels
//    R1 = (3 C_L W <rho~^2>)^{1/3} is the ONLY proven recovery (attack-rhoms-01 sec.1).
//    R1f is its absolute floor (C_L = 1, ms = 1): no mean-square lemma can beat it.
//    smax = (z^{beta2} M - 1)/2 is what RML must clear. All four columns CITED.
//     z    smax       R1        R1/smax   R1f       R1f/smax   miss in exponent (R1f)
//    13   1.58e+3   2.00e+1     0.013   1.97e+1     0.012   -1.7092
//    17   4.17e+3   7.72e+1     0.018   6.08e+1     0.015   -1.4927
//    19   5.65e+3   2.85e+2     0.050   1.96e+2     0.035   -1.1418
//    23   1.10e+4   8.90e+2     0.081   6.15e+2     0.056   -0.9204
//    29   2.76e+4   3.02e+3     0.109   2.09e+3     0.076   -0.7666
//    31   3.37e+4   1.63e+4     0.483   7.83e+3     0.232   -0.4252
//    37   6.88e+4   7.13e+4     1.036   3.72e+4     0.541   -0.1703
//    41   9.97e+4   2.82e+5     2.828   1.47e+5     1.474   0.1045
//    43   1.14e+5   1.09e+6     9.578   5.69e+5     5.000   0.4279
//    47   1.58e+5   5.22e+6    33.101   2.42e+6    15.346   0.7093
//    reading: R1 clears (ratio < 1) at z = 13..31 and fails from z = 37; its FLOOR fails
//    from z = 41. The failure is e^{theta(z)/3} against z^{beta2}: theta(z) ~ z beats any
//    power of z, so the miss diverges. Chebyshev off a second moment cannot reach RML at
//    any exponent, and the mean-square lemma is therefore an INGREDIENT, not a route.
//
// S6 WHAT THE SECOND MOMENT DOES DO (cited arithmetic, restated, not re-derived)
//    composed: MS(c) x REC(l) => RML(c+l), wins iff c+l < beta_2 = 4.26645
//    proven c = s + o(1) = 3 (this file's FORM I*, exponent 2s halved for the rms)
//    F4 (Gaussian recovery, UNPROVEN; measured true at 5 levels) costs l = 1/2 + o(1)
//    => F4 implies RML(3.5+eps), margin beta_2 - 3.5 = 0.766
//    => theta_G is capped at 3.5 + o(1) UNCONDITIONALLY, so lambda_max = beta_2 -
//       theta_G cannot close asymptotically (rho-maxlaw reading 6 model A excluded).
//    NOTHING here lowers a delivered exponent: without F4 or another recovery the
//    mean-square bound delivers NO bound on G2 at all.
//
// DONE
// ============================================================================
// READINGS
// ============================================================================
// 1. AUDIT PASS. The PROVEN closed form reproduces the cited <rho~^2> column at
//    z = 13..23 from the repo's own buildTerms/meanSquare, to the 6 dp the
//    citation carries, and is H-invariant to 0 ulp. MS1's three inequality
//    steps ((1) the |C_ij| cap, (5) qmax <= min(z^{2s},P(z)), (6) the Mertens
//    closure) each verify with zero violations over the tested range. No defect
//    found in attack-rhoms-01's MS1 derivation.
// 2. NEW, EXPLICIT. FORM I*: <rho~^2> <= 170.88 z^{2s} ln^8 z (1+1/(2ln^2 z))^8
//    for all z where RS 1962 Thm 3.42 applies ([MEMORY] citation; verified
//    numerically z = 13..4e6). This names the constant attack-rhoms-01 left
//    as an unnamed C. rms(rho~) <= sqrt(170.88) z^s ln^4 z (1+1/(2 ln^2 z))^4.
// 3. THE PRICE OF ALL-Z EXPLICITNESS. FORM I*/exact runs 2.535e+12 (z=13) to
//    3.213e+14 (z=47) — the ratio WIDENS, since the bound grows z^6 ln^8 z while
//    the measured truth grows at the cited rmsr slope (rho-maxlaw S6). The measured-input MS3 form (B2/12) is
//    18x-44x above truth over the same levels. The explicit form is for the
//    asymptotic exponent only; it is worthless as a finite-z number.
// 4. THE EXPONENT IS A LIMIT NOBODY CAN REACH. log_z(FORM I*) = 10.2054 at
//    z = 47, 8.9921 at 1009, 7.8941 at 1e6: the ln^8 z surcharge is still 1.5205 in
//    exponent at z = 1e6. "Exponent 2s = 6" is true only in the limit.
// 5. NEGATIVE, QUANTIFIED. Chebyshev off the second moment cannot reach RML.
//    R1's absolute floor (C_L = 1, ms = 1 — no mean-square lemma can beat it)
//    misses smax by 1.47x at z = 41, 5.00x at 43, 15.346x at 47, and diverges,
//    because the position-union price is e^{theta(z)/3} with theta(z) ~ z.
//    The mean-square bound is an INGREDIENT of RML, never a route to it.

