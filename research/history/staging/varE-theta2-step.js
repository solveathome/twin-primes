// ============================================================================
// varE-theta2-step.js — scratchpad-grade support for varE-theta2-step.md
// The DECOUPLING step of varE-spectral.md section 2, attacked at theta = 2.
// ============================================================================
// WHAT THIS IS. varE-spectral.md evaluates X(L) = sum_{nu != 0 mod M} What(nu)
// K_L(nu/M) after replacing every local coefficient hat f_p(nu) by its mean
// gamma_p over nonzero frequencies. That replacement is an identity at one
// excluded class and false pointwise at two. This file computes BOTH sums
// exactly, in real space, at six diagonal levels, and splits the exact one
// into the four groups the replacement conflates.
//
// THE REDUCTION (algebra, PART 0 checks it against the corpus's own numbers):
//   K_L(t) = sum_{|h|<L} (1-|h|/L) e(ht)  =>  X = sum_{|h|<L} (1-|h|/L)(W(h)-1)
//   with W(h) = prod_{p<=y} p*rho_p(h)/alpha_p^2, the y-truncated correlation
//   of the comb with its own shift.  The decoupled sum is the SAME expression
//   with W replaced by V(h) = prod_{p<=y} (1 + gamma_p c_p(h)), c_p = Ramanujan,
//   which collapses to V(h) = C_y * prod_{p|h, 7<=p<=y} (p-1)/(p-3).
//   So the replacement error is exactly sum_h (1-|h|/L)(W(h) - V(h)).
//
//   For 7 <= p <= y, exactly one of p|h, p|h-2, p|h+2 can hold, and
//     f_p(h) = p(p-4)/(p-2)^2 * (1 + 2/(p-4) [p|h] + 1/(p-4) [p|h-2]
//                                          + 1/(p-4) [p|h+2]).
//   Expanding the product over p >= 7 gives 3^omega groups. Group 1 (every
//   prime takes p|h) is the ONLY one whose CRT class is 0, i.e. the only one
//   Fact A evaluates with no equidistribution assumption.
//
//   PART 0  validation: X against variance-note section 7's nine exact points,
//           X_dec against varE-spectral PART 2's divisor enumeration.
//   PART 1  the exact per-prime identity that makes group 1 and the model
//           share a limit.
//   PART 2  X_dec EXACT at x = 13, 17, 19, 23 (new; the corpus had 7 and 11).
//   PART 3  the four-group split and its 1/ln y diagnostics.
//   node research/history/staging/varE-theta2-step.js     (~5 s, ~1.2 GB peak)
// ============================================================================
'use strict';
const T0=Date.now(); const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
function assert(c,m){ if(!c) throw new Error('ASSERT FAIL: '+m); }
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
function inv6(p){for(let k=1;k<p;k++)if((6*k)%p===1)return k;throw new Error('noinv')}
class Kah{constructor(){this.s=0;this.c=0}add(v){const y=v-this.c,t=this.s+y;this.c=(t-this.s)-y;this.s=t}get(){return this.s}}

// levels: L = x#, y = largest prime <= sqrt(L) (the u = 2 diagonal), and the
// exact X and measured Var/E READ from varE-spectral.js PTS (= variance-note s7).
const LV=[
 {x:7, L:210,       y:13,    X:4.6137,   Xd:5.405185,  r:0.1521, mdl:0.17850},
 {x:11,L:2310,      y:47,    X:15.0751,  Xd:15.694986, r:0.2563, mdl:0.26744},
 {x:13,L:30030,     y:173,   X:29.5580,  Xd:null,      r:0.2995, mdl:0.29750},
 {x:17,L:510510,    y:709,   X:51.4047,  Xd:null,      r:0.3268, mdl:0.32579},
 {x:19,L:9699690,   y:3109,  X:81.2888,  Xd:null,      r:0.3473, mdl:0.34637},
 {x:23,L:223092870, y:14929, X:121.4787, Xd:null,      r:0.3643, mdl:0.36214},
];

const OUT=[];
for(const lv of LV){
  const {x,L,y}=lv, KK=L/6;
  const allp=primesUpTo(y), ps=allp.filter(p=>p>=7);
  let delta=1; for(const p of allp){const a=(p===2||p===3)?1:(p===5?2:p-2); delta*=a/p;}
  // constants over p >= 7
  let D=1,C=1,b1=1,b2=1;
  for(const p of ps){
    const q=(p-2)*(p-2);
    D*=p*(p-4)/q;  C*=1-2/((p-1)*(p-2));
    b1*=(q-2)/q;   b2*=(q-3)/q;             // group means: beta1 (c=0), beta2 (c=+-2)
  }
  const bmix=1-b1-2*b2;
  // per-prime identity that ties group 1's weight to the model's
  let ident=D/C; for(const p of ps) ident*=1+2/((p-1)*(p-4));

  // sieve the three multiplicative pieces on k = h/6
  const P0=new Float64Array(KK).fill(1), PM=new Float64Array(KK).fill(1),
        PP=new Float64Array(KK).fill(1), PV=new Float64Array(KK).fill(1);
  for(const p of ps){
    const a=(p-2)/(p-4), b=(p-3)/(p-4), c=(p-1)/(p-3), i6=inv6(p);
    for(let k=p;k<KK;k+=p){P0[k]*=a;PV[k]*=c;}
    for(let k=(2*i6)%p||p;k<KK;k+=p)PM[k]*=b;        // p | 6k-2
    for(let k=((p-2)*i6)%p||p;k<KK;k+=p)PP[k]*=b;    // p | 6k+2
  }
  const SW=new Kah(),SV=new Kah(),S1=new Kah(),S2=new Kah();
  let W0=1/delta;                                   // W(0)=V(0)=1/delta
  let W1z=6*2.5*D; for(const p of ps) W1z*=(p-2)/(p-4);   // group-1 value at h=0
  let W2z=6*2.5*D;                                        // group-2 value at h=0 (no p|+-2)
  SW.add(W0-6); SV.add(W0-6); S1.add(W1z-6*b1); S2.add(W2z-6*b2);
  for(let k=1;k<KK;k++){
    const w=2*(1-6*k/L), r5=k%5;
    const f5=(r5===0)?2.5:((r5===1||r5===4)?1.25:0), f5v=(r5===0)?2.5:0.625;
    SW.add(w*(6*f5*D*P0[k]*PM[k]*PP[k]-6));
    SV.add(w*(6*f5v*C*PV[k]-6));
    S1.add(w*(6*f5*D*P0[k]-6*b1));
    // one shift group = Sum over ALL |h| < L of (1-|h|/L)(W-(h) - beta2), and
    // W-(-h) = W+(h) exactly, so the negative-h half is the p | 6k+2 pattern
    // (PP), not a second copy of PM. Until 2026-09-05 this line doubled PM
    // (verify-0830-record-defects.md, claim 1 CONFIRMED).
    S2.add((w/2)*(6*f5*D*(PM[k]+PP[k])-12*b2));
  }
  const X=SW.get(), Xd=SV.get(), X1=S1.get(), X2=S2.get(), Xmx=X-X1-2*X2;
  OUT.push({x,y,L,delta,X,Xd,X1,X2,Xmx,ident,lny:Math.log(y),
            b1,b2,bmix, note:lv});
}

console.log('=== PART 0: the real-space reduction, validated ===');
console.log('  X = sum_{|h|<L}(1-|h|/L)(W(h)-1), W = y-truncated comb correlation');
console.log('   x |        X exact |  corpus X | rel diff |    X_dec exact | corpus X_dec');
for(const o of OUT){
  const d=Math.abs(o.X-o.note.X)/o.note.X;
  console.log('  '+String(o.x).padStart(2)+' | '+o.X.toFixed(6).padStart(14)+' | '
    +String(o.note.X).padStart(9)+' | '+d.toExponential(1).padStart(8)+' | '
    +o.Xd.toFixed(6).padStart(14)+' | '+(o.note.Xd===null?'  (none: 2^40 divisors)':String(o.note.Xd)));
  assert(d<2e-4,'X reproduces the corpus point at x='+o.x);
  if(o.note.Xd!==null) assert(Math.abs(o.Xd-o.note.Xd)<1e-5,'X_dec reproduces the divisor sum at x='+o.x);
}

console.log('\n=== PART 1: the per-prime identity behind group 1 ===');
console.log('  (D_y/C_y) * prod_{7<=p<=y} (1 + 2/((p-1)(p-4))) = 1 exactly:');
for(const o of OUT) console.log('    y='+String(o.y).padStart(6)+'   value = '+o.ident.toFixed(14));
for(const o of OUT) assert(Math.abs(o.ident-1)<1e-12,'per-prime identity at y='+o.y);
console.log('  => group 1 carries pi_p = 2/(p-2), the model carries pi_p = 2/(p-1);');
console.log('     E[ln n] differs by sum 2 ln p/((p-1)(p-2)) = O(1), not O(ln y).');

console.log('\n=== PART 2: the replacement error, EXACT, at six levels ===');
console.log('   x |   ln y | delta*X (=Var/E) | delta*X_dec exact | corpus model (MC) | delta*(X-X_dec) | X/X_dec');
for(const o of OUT){
  const dX=o.delta*o.X, dXd=o.delta*o.Xd;
  console.log('  '+String(o.x).padStart(2)+' | '+o.lny.toFixed(3).padStart(6)+' | '
    +dX.toFixed(6).padStart(16)+' | '+dXd.toFixed(6).padStart(17)+' | '
    +String(o.note.mdl).padStart(17)+' | '+(dX-dXd).toFixed(6).padStart(15)+' | '+(o.X/o.Xd).toFixed(6));
}

console.log('\n=== PART 3: the four groups, and the 1/ln y diagnostics ===');
console.log('  X = X1 (c=0) + 2*X2 (c=+-2) + Xmix; only X1 needs no equidistribution');
console.log('   x | delta*X1 | delta*X2 (each) | delta*Xmix | (X1-Xdec)*d*lny | (X-X1)*d*lny | (X-Xdec)*d*lny');
for(const o of OUT){
  const d=o.delta;
  console.log('  '+String(o.x).padStart(2)+' | '+(d*o.X1).toFixed(6).padStart(8)+' | '
    +(d*o.X2).toFixed(6).padStart(15)+' | '+(d*o.Xmx).toFixed(6).padStart(10)+' | '
    +(d*(o.X1-o.Xd)*o.lny).toFixed(5).padStart(15)+' | '+(d*(o.X-o.X1)*o.lny).toFixed(5).padStart(12)
    +' | '+(d*(o.X-o.Xd)*o.lny).toFixed(5).padStart(14));
}
console.log('\n  group masses (means over the period, p >= 7 only):');
for(const o of OUT) console.log('    y='+String(o.y).padStart(6)+'  beta1='+o.b1.toFixed(6)
  +'  beta2='+o.b2.toFixed(6)+'  beta_mix='+o.bmix.toFixed(6));
console.log('\n  done '+el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/varE-theta2-step.js
//   invocation:  node research/history/staging/varE-theta2-step.js
//   code-sha256: 91aca27772eb7122c3422dbac2e9923f3d0ade1740e28ba87cf11e29efc5af26
//   out-sha256:  1aafa94cadeab6d141d47fa9ebb48c818413e721dc3ef9afbb8665cec6281f64
//   body-lines:  49
//   forced:      2026-09-05, 12 of 119 figures in the replaced block not reproduced (first: 0.094199, -0.241840, 0.047843, -0.133037)
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-05
//   elapsed:     1.7 s
// ============================================================================
// === PART 0: the real-space reduction, validated ===
//   X = sum_{|h|<L}(1-|h|/L)(W(h)-1), W = y-truncated comb correlation
//    x |        X exact |  corpus X | rel diff |    X_dec exact | corpus X_dec
//    7 |       4.612929 |    4.6137 |   1.7e-4 |       5.405185 | 5.405185
//   11 |      15.073187 |   15.0751 |   1.3e-4 |      15.694986 | 15.694986
//   13 |      29.557928 |    29.558 |   2.4e-6 |      29.271013 |   (none: 2^40 divisors)
//   17 |      51.400255 |   51.4047 |   8.6e-5 |      51.200849 |   (none: 2^40 divisors)
//   19 |      81.289135 |   81.2888 |   4.1e-6 |      81.171615 |   (none: 2^40 divisors)
//   23 |     121.485245 |  121.4787 |   5.4e-5 |     121.326093 |   (none: 2^40 divisors)
//
// === PART 1: the per-prime identity behind group 1 ===
//   (D_y/C_y) * prod_{7<=p<=y} (1 + 2/((p-1)(p-4))) = 1 exactly:
//     y=    13   value = 1.00000000000000
//     y=    47   value = 1.00000000000000
//     y=   173   value = 1.00000000000000
//     y=   709   value = 1.00000000000000
//     y=  3109   value = 1.00000000000000
//     y= 14929   value = 1.00000000000000
//   => group 1 carries pi_p = 2/(p-2), the model carries pi_p = 2/(p-1);
//      E[ln n] differs by sum 2 ln p/((p-1)(p-2)) = O(1), not O(ln y).
//
// === PART 2: the replacement error, EXACT, at six levels ===
//    x |   ln y | delta*X (=Var/E) | delta*X_dec exact | corpus model (MC) | delta*(X-X_dec) | X/X_dec
//    7 |  2.565 |         0.152075 |          0.178193 |            0.1785 |       -0.026118 | 0.853427
//   11 |  3.850 |         0.256267 |          0.266839 |           0.26744 |       -0.010572 | 0.960382
//   13 |  5.153 |         0.299499 |          0.296592 |            0.2975 |        0.002907 | 1.009802
//   17 |  6.564 |         0.326772 |          0.325504 |           0.32579 |        0.001268 | 1.003895
//   19 |  8.042 |         0.347302 |          0.346800 |           0.34637 |        0.000502 | 1.001448
//   23 |  9.611 |         0.364320 |          0.363842 |           0.36214 |        0.000477 | 1.001312
//
// === PART 3: the four groups, and the 1/ln y diagnostics ===
//   X = X1 (c=0) + 2*X2 (c=+-2) + Xmix; only X1 needs no equidistribution
//    x | delta*X1 | delta*X2 (each) | delta*Xmix | (X1-Xdec)*d*lny | (X-X1)*d*lny | (X-Xdec)*d*lny
//    7 | 0.205517 |       -0.009235 |  -0.034971 |         0.07008 |     -0.13708 |       -0.06699
//   11 | 0.293618 |        0.004509 |  -0.046368 |         0.10310 |     -0.14381 |       -0.04070
//   13 | 0.322208 |        0.001365 |  -0.025439 |         0.13201 |     -0.11703 |        0.01498
//   17 | 0.345842 |        0.000736 |  -0.020542 |         0.13350 |     -0.12518 |        0.00832
//   19 | 0.363348 |        0.000394 |  -0.016835 |         0.13308 |     -0.12905 |        0.00404
//   23 | 0.377724 |        0.000236 |  -0.013876 |         0.13342 |     -0.12883 |        0.00459
//
//   group masses (means over the period, p >= 7 only):
//     y=    13  beta1=0.882453  beta2=0.826397  beta_mix=-1.535247
//     y=    47  beta1=0.855794  beta2=0.789184  beta_mix=-1.434162
//     y=   173  beta1=0.850465  beta2=0.781823  beta_mix=-1.414112
//     y=   709  beta1=0.849206  beta2=0.780087  beta_mix=-1.409380
//     y=  3109  beta1=0.848952  beta2=0.779738  beta_mix=-1.408427
//     y= 14929  beta1=0.848902  beta2=0.779669  beta_mix=-1.408240
//
//   done 1.6s
// ============================================================================
// READINGS
//
// 1. THE REDUCTION IS EXACT AND CHECKED AT SIX LEVELS. Writing the Fejer
//    kernel as sum_{|h|<L}(1-|h|/L)e(ht) turns the spectral sum into
//    X = sum_{|h|<L}(1-|h|/L)(W(h)-1), W the y-truncated correlation of the
//    comb with its shift. PART 0's x = 7 value 4.612929 is varE-spectral
//    PART 0's brute-forced 4.612929 to the printed digit; the other five
//    agree with variance-note section 7's column to 2.4e-6 .. 1.7e-4.
// 2. THE DECOUPLED SUM IS THE SAME EXPRESSION WITH V IN PLACE OF W, AND V IS
//    ELEMENTARY. V(h) = C_y prod_{p|h} (p-1)/(p-3). PART 0 reproduces
//    varE-spectral PART 2's divisor enumeration exactly: 5.405185 at x = 7
//    and 15.694986 at x = 11. The replacement error is therefore
//    sum_h (1-|h|/L)(W(h)-V(h)), a sum over SHIFTS, not a per-prime defect.
// 3. THE ERROR, EXACT, AT FOUR NEW LEVELS. delta*(X - X_dec) reads -0.026118,
//    -0.010572, 0.002907, 0.001268, 0.000502, 0.000477 at x = 7..23; the
//    ratio X/X_dec reads 0.853427, 0.960382, 1.009802, 1.003895, 1.001448,
//    1.001312. The corpus had the first two of each. The sign change sits
//    between x = 11 and x = 13, as varE-spectral section 2 inferred
//    indirectly from Monte Carlo.
// 4. THE ERROR IS A NEAR-CANCELLATION OF TWO 1/ln y TERMS. PART 3's last
//    three columns: delta*(X1-X_dec)*ln y settles at 0.13201, 0.13350,
//    0.13308, 0.13342 and delta*(X-X1)*ln y at -0.11703, -0.12518, -0.12905,
//    -0.12883 over x = 13..23. Each is bounded; their sum, 0.01498, 0.00832,
//    0.00404, 0.00459, is what the decoupling costs. So the error is
//    O(1/ln y) at every level computed, hence does not move the limit -
//    MEASURED at six exact levels, not proven, and the coefficient 0.0046 is
//    a difference of two numbers thirty times larger.
// 5. GROUP 1 NEEDS NO DECOUPLING AT ALL. Only the group where every prime
//    takes p|h has CRT class 0, so Fact A applies to it verbatim. PART 1's
//    identity (D_y/C_y) prod (1 + 2/((p-1)(p-4))) = 1.00000000000000 at all
//    six levels says its weight is the model's weight with pi_p = 2/(p-2) in
//    place of 2/(p-1), an O(1) shift in E[ln n] against ln L = 2 ln y. The
//    unproven part of section 2 is therefore only the shift-2 groups.
// 6. THE SHIFT GROUPS ARE SMALL AND THE MIXED GROUP IS THE SLOW ONE. delta*X2
//    (each group, both mirror halves summed) reads -0.009235, 0.004509,
//    0.001365, 0.000736, 0.000394, 0.000236 at x = 7..23, so 2*X2 is O(1) and
//    falling; delta*Xmix runs -0.034971, -0.046368, -0.025439, -0.020542,
//    -0.016835, -0.013876. Xmix carries the open step alone. Neither is
//    bounded here by anything but the six values.
// 7. THE SECTION 6a MODEL COLUMN IS MONTE CARLO AND IS OFF BY UP TO 0.0017.
//    PART 2's exact delta*X_dec against the corpus column: 0.178193/0.1785,
//    0.266839/0.26744, 0.296592/0.2975, 0.325504/0.32579, 0.346800/0.34637,
//    0.363842/0.36214. The x = 23 gap 0.0017 is larger than any residual the
//    note reports at x >= 13, so the residual column there is partly MC noise.
// 8. WHAT IS NOT SHOWN. No bound on X2 or Xmix is derived. Nothing here
//    proves the 1/ln y behaviour of reading 4 continues past x = 23, and
//    x = 29 is out of reach for this method (L/6 = 1.1e9 array entries).
//
// FIGURE PROVENANCE. Readings quote the block above verbatim except:
//   0.0046  = 0.13342 - 0.12883, the two settled coefficients of PART 3.
//   0.0017  = 0.363842 - 0.36214, PART 2's x = 23 row.
//   1.1e9   = 6469693230/6, from variance-note section 7's L at x = 29;
//             not a figure of this run.
