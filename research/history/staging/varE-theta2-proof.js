// ============================================================================
// varE-theta2-proof.js — support for varE-theta2-proof.md
// The MIXED-LAG half of the decoupling error of varE-spectral.md section 2.
// ============================================================================
// WHAT THIS IS. varE-theta2-step.md reduced the decoupling error to
//   X - X_dec = sum_{|h|<L}(1-|h|/L)(W(h)-V(h)),
// and split X into a c=0 group X1, two pure shift groups X2, and CRT-mixed
// lags Xmix. This file supports the closed-form evaluation of every lag's
// Fejer-weighted contribution and measures the size of the mixed-lag
// obstruction.
//
//  PART A  unit test of the closed form  R_n(c) = [I_n(c,r) - r^2/n]/L,
//          r = L mod n, I_n(c,r) = (r-c)^+ + (r+c-n)^+, against brute force.
//  PART B  the whole spectral object rebuilt at x = 7 from the (modulus,class)
//          expansion using only that closed form, against the corpus X.
//  PART C  the FLAT part of the non-c=0 lags, K*sum_{n>2K}(W_tot-A)(n)/n,
//          computed exactly at six levels by enumerating n <= 2K; its growth
//          against ln^2 y and ln^3 y decides whether an absolute-value bound
//          on the flat and active halves separately can ever reach the target.
//  PART D  the unconditional bound on the two pure shift groups, against the
//          measured delta*X2 of varE-theta2-step.md section 5.
//  PART E  the total lag mass sum_n W_tot(n), the naive bound's order.
//   node research/history/staging/varE-theta2-proof.js
// ============================================================================
'use strict';
const T0=Date.now(); const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
function assert(c,m){ if(!c) throw new Error('ASSERT FAIL: '+m); }
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
function inv6(p){for(let k=1;k<p;k++)if((6*k)%p===1)return k;throw new Error('noinv')}
class Kah{constructor(){this.s=0;this.c=0}add(v){const y=v-this.c,t=this.s+y;this.c=(t-this.s)-y;this.s=t}get(){return this.s}}

// levels: L = x#, y = largest prime <= sqrt(L); X and delta*X2 READ from
// varE-theta2-step.md (sections 4 and 5), recomputed nowhere here.
const LV=[
 {x:7, L:210,       y:13,    X:4.612929,  dX2:0.094199},
 {x:11,L:2310,      y:47,    X:15.0751,   dX2:0.047843},
 {x:13,L:30030,     y:173,   X:29.5580,   dX2:0.027019},
 {x:17,L:510510,    y:709,   X:51.4047,   dX2:0.017012},
 {x:19,L:9699690,   y:3109,  X:81.2888,   dX2:0.011379},
 {x:23,L:223092870, y:14929, X:121.4787,  dX2:0.007968},
];

console.log('=== PART A: the closed form for the Fejer-weighted lag ===');
console.log('  R_n(c) := sum_{|h|<L, h=c mod n}(1-|h|/L) - L/n  =  [(r-c)^+ + (r+c-n)^+ - r^2/n]/L');
{
  let worst=0, tests=0;
  let seed=20260828>>>0; const rng=()=>((seed=(1664525*seed+1013904223)>>>0)/4294967296);
  const rnd=(a,b)=>a+Math.floor(rng()*(b-a+1));
  for(let t=0;t<4000;t++){
    const L=rnd(1,400), n=rnd(1,900), c=rnd(0,n-1);
    let bf=0; for(let h=-(L-1);h<=L-1;h++) if(((h%n)+n)%n===c) bf+=1-Math.abs(h)/L;
    const r=L%n, cf=(Math.max(0,r-c)+Math.max(0,r+c-n)-r*r/n)/L + L/n;
    worst=Math.max(worst,Math.abs(bf-cf)); tests++;
  }
  console.log('  random (L,n,c) triples tested: '+tests+'   worst absolute error = '+worst.toExponential(2));
  assert(worst<1e-9,'closed form for R_n(c)');
  console.log('  => the phase sum over every lag is EXACT and elementary: no equidistribution enters.');
  console.log('     |R_n(c)| <= min(1, n/L) always, and for n > 2L,  R_n(c) = (L-||c||_n)^+/L - L/n.');
}

console.log('\n=== PART B: the whole object rebuilt at x = 7 from the lag expansion ===');
{
  const x=7,L=210,y=13,K=L/6, ps=[7,11,13];
  let D=1; for(const p of ps) D*=p*(p-4)/((p-2)*(p-2));
  // direct real-space sum, for the reference value
  const S=new Kah();
  for(let k=-(K-1);k<=K-1;k++){
    const kk=((k%5)+5)%5, f5=(kk===0)?2.5:((kk===1||kk===4)?1.25:0);
    let W=6*f5*D;
    for(const p of ps){const t=(2*inv6(p))%p, km=((k%p)+p)%p;
      W*= (km===0)?(p-2)/(p-4) : ((km===t||km===(p-t)%p)?(p-3)/(p-4):1);}
    S.add((1-Math.abs(k)/K)*(W-6));
  }
  const Xdirect=S.get();
  // lag expansion: modulus m = 5*n, class c by CRT; weights 6*f5 gives (5,0,15),(5,1,7.5),(5,4,7.5)
  const five=[[0,15],[1,7.5],[4,7.5]];
  const T=new Kah(); let terms=0, flat=new Kah(), active=new Kah(), abs=new Kah();
  const rec=(i,n,c,w)=>{                       // c = class mod n (p>=7 part)
    if(i===ps.length){
      for(const [c5,w5] of five){
        const m=5*n; let cc=0;                 // CRT of (c mod n, c5 mod 5)
        for(let a=0;a<m;a++) if(a%n===c && a%5===c5){cc=a;break;}
        const r=K%m, R=(Math.max(0,r-cc)+Math.max(0,r+cc-m)-r*r/m)/K;
        T.add(w*w5*R); terms++; abs.add(Math.abs(w*w5*R));
        flat.add(-w*w5*r*r/(m*K)); active.add(w*w5*(Math.max(0,r-cc)+Math.max(0,r+cc-m))/K);
      }
      return;
    }
    const p=ps[i], a=2/(p-4), b=1/(p-4), t=(2*inv6(p))%p;
    rec(i+1,n,c,w);                                        // p absent
    // p present: need class mod n*p; c stays c mod n, and tau mod p
    for(const [tau,ww] of [[0,a],[t,b],[(p-t)%p,b]]){
      const nn=n*p; let cc=0; for(let A=0;A<nn;A++) if(A%n===c && A%p===tau){cc=A;break;}
      rec(i+1,nn,cc,w*ww);
    }
  };
  rec(0,1,0,D);
  console.log('  direct real-space X   = '+Xdirect.toFixed(6));
  console.log('  lag-expansion X       = '+T.get().toFixed(6)+'   ('+terms+' (modulus,class) pairs)');
  console.log('  corpus X (read)       = '+LV[0].X.toFixed(6));
  assert(Math.abs(Xdirect-T.get())<1e-9,'lag expansion reproduces the direct sum at x=7');
  assert(Math.abs(Xdirect-LV[0].X)<2e-4,'direct sum reproduces the corpus X at x=7');
  console.log('  flat half  (-r^2/mK)  = '+flat.get().toFixed(6));
  console.log('  active half (overlap) = '+active.get().toFixed(6));
  console.log('  sum of |terms|        = '+abs.get().toFixed(6)+'   vs |X| = '+Math.abs(T.get()).toFixed(6)
              +'   loss factor '+(abs.get()/Math.abs(T.get())).toFixed(2));
}

console.log('\n=== PART C: the FLAT half of the non-c=0 lags, exact at six levels ===');
console.log('  Phi := K * sum_{n>2K, n squarefree, 7<=p|n<=y} (W_tot - A)(n)/n,');
console.log('  W_tot(n) = D_y prod 4/(p-4)  (all 3^omega lags),  A(n) = D_y prod 2/(p-4)  (c=0).');
const OUT=[];
for(const lv of LV){
  const {x,L,y}=lv, K=L/6, allp=primesUpTo(y), ps=allp.filter(p=>p>=7);
  let delta=1; for(const p of allp){const a=(p===2||p===3)?1:(p===5?2:p-2); delta*=a/p;}
  let D=1,b1=1,Wm=1,Gm=1;
  for(const p of ps){ D*=p*(p-4)/((p-2)*(p-2)); b1*=1-2/((p-2)*(p-2));
                      Wm*=p*p/((p-2)*(p-2)); Gm*=p*(p-3)/((p-2)*(p-2)); }
  // closed forms for the total masses, checked
  let cW=D,cA=D; for(const p of ps){cW*=1+4/(p*(p-4)); cA*=1+2/(p*(p-4));}
  assert(Math.abs(cW-1)<1e-12,'sum_n W_tot(n)/n = 1 at y='+y);
  assert(Math.abs(cA-b1)<1e-12,'sum_n A(n)/n = prod(1-2/(p-2)^2) at y='+y);
  // enumerate 1 < n <= 2K by DFS over ascending primes
  const lim=2*K, acc=new Kah(); let nodes=0;
  const rec=(i,n,wT,wA)=>{
    for(let j=i;j<ps.length;j++){
      const p=ps[j], nn=n*p; if(nn>lim) break;
      const wT2=wT*4/(p-4), wA2=wA*2/(p-4);
      acc.add((wT2-wA2)*D/nn); nodes++;
      rec(j+1,nn,wT2,wA2);
    }
  };
  rec(0,1,1,1);
  const Phi=K*((1-b1)-acc.get());
  OUT.push({x,y,K,delta,Phi,lny:Math.log(y),Wm,Gm,nodes,X:lv.X,dX2:lv.dX2});
}
console.log('   x |   ln y |          Phi | Phi/ln^2 y | Phi/ln^3 y |  delta*Phi | X (read) | n<=2K enumerated');
for(const o of OUT) console.log('  '+String(o.x).padStart(2)+' | '+o.lny.toFixed(3).padStart(6)+' | '
  +o.Phi.toFixed(4).padStart(12)+' | '+(o.Phi/o.lny**2).toFixed(4).padStart(10)+' | '
  +(o.Phi/o.lny**3).toFixed(4).padStart(10)+' | '+(o.delta*o.Phi).toFixed(4).padStart(10)+' | '
  +o.X.toFixed(2).padStart(8)+' | '+String(o.nodes).padStart(9));

console.log('\n=== PART C2: the flat / active split of the WHOLE object, six levels ===');
console.log('  flat  := -(1/K) sum_{m,c} w(m,c) r_m^2/m   (c-independent half, r_m = K mod m)');
console.log('  active := X - flat  (the interval-overlap half, supported on ||c||_m < r_m)');
console.log('  m = 5n, total 5-part lag weight 30, so Omega(m)/m = 6 W_tot(n)/n and sum_all = 6.');
console.log('   x |         flat |       active |        X |  |flat|/|X| | |flat|/ln^2 y | delta*|flat|');
for(const o of OUT){
  const {y,K}=o, ps=primesUpTo(y).filter(p=>p>=7);
  let D=1; for(const p of ps) D*=p*(p-4)/((p-2)*(p-2));
  // small part: 5n <= K, need r = K mod 5n ; tail: 5n > K, r = K
  const small=new Kah(), head=new Kah();          // head = sum_{5n<=K} W_tot(n)/n
  const rec=(i,n,w)=>{                             // w = W_tot(n)/D for n
    const m=5*n; const r=K%m;
    small.add(6*w*D/n*r*r/(m*m)*5);                // Omega(m) r^2/(m K) = 6 W_tot(n)/n * r^2/(m) /K *m/m
    head.add(w*D/n);
    for(let j=i;j<ps.length;j++){ const p=ps[j]; if(5*n*p>K) break; rec(j+1,n*p,w*4/(p-4)); }
  };
  // note: small.add above uses r^2/(m*K) * Omega(m) with Omega(m)=30*W_tot(n); written out below instead
  small.s=0;small.c=0;head.s=0;head.c=0;
  const rec2=(i,n,w)=>{
    const m=5*n, r=K%m, Wt=w*D;
    small.add(30*Wt*r*r/(m*K));
    head.add(Wt/n);
    for(let j=i;j<ps.length;j++){ const p=ps[j]; if(5*n*p>K) break; rec2(j+1,n*p,w*4/(p-4)); }
  };
  rec2(0,1,1);
  const tail = K*6*(1-head.get());                 // sum_{5n>K} Omega(m) K^2/(m K) /K = K*6*sum_{n>K/5}W_tot/n
  const flat = -(small.get()+tail), active=o.X-flat;
  o.flat=flat; o.active=active;
  console.log('  '+String(o.x).padStart(2)+' | '+flat.toFixed(4).padStart(12)+' | '+active.toFixed(4).padStart(12)
    +' | '+o.X.toFixed(2).padStart(8)+' | '+(Math.abs(flat)/o.X).toFixed(3).padStart(11)+' | '
    +(Math.abs(flat)/o.lny**2).toFixed(4).padStart(13)+' | '+(o.delta*Math.abs(flat)).toFixed(4).padStart(13));
}

console.log('\n=== PART D: the two pure shift groups, bounded unconditionally ===');
console.log('  |2*X2| <= 2 * 30 * prod_{7<=p<=y} p(p-3)/(p-2)^2  (from |R| <= 1 and the total lag mass)');
console.log('   x |    bound 2B_2 | 2*X2 measured | bound/measured | B_2/ln y');
for(const o of OUT){
  const B=30*o.Gm, meas=2*o.dX2/o.delta;
  console.log('  '+String(o.x).padStart(2)+' | '+(2*B).toFixed(3).padStart(13)+' | '+meas.toFixed(3).padStart(13)
    +' | '+(2*B/meas).toFixed(2).padStart(14)+' | '+(o.Gm/o.lny).toFixed(4).padStart(8));
  assert(2*B>meas,'the X2 bound is not violated at x='+o.x);
}

console.log('\n=== PART E: the total lag mass, i.e. the order of the naive bound ===');
console.log('   x | sum_n W_tot(n) | /ln^4 y | sum_n A(n) | /ln^2 y');
for(const o of OUT){
  let At=1; const ps=primesUpTo(o.y).filter(p=>p>=7); for(const p of ps) At*=p/(p-2);
  console.log('  '+String(o.x).padStart(2)+' | '+o.Wm.toFixed(3).padStart(14)+' | '
    +(o.Wm/o.lny**4).toFixed(5).padStart(7)+' | '+At.toFixed(3).padStart(10)+' | '+(At/o.lny**2).toFixed(5).padStart(7));
}
console.log('\n=== PART F: the ingredients of the c = 0 half bound ===');
console.log('  A_tot = D_y prod (p-2)/(p-4) = prod p/(p-2)   (total c=0 lag mass, p>=7)');
console.log('  B_tot = C_y prod (p-1)/(p-3)                  (total model lag mass, p>=7)');
console.log('  mu    = sum_p 2 ln p/((p-1)(p-2))             (mean log gap of the monotone coupling)');
console.log('  R(T)  = sum_{e^T < p <= y} 2/(p-1)            (Kolmogorov-Rogozin denominator, T=2)');
console.log('   x |     A_tot |     B_tot | A/B - 1 |     mu | R(2) | C/sqrt(R(2)) | (lnln y)^-1/4');
for(const o of OUT){
  const ps=primesUpTo(o.y).filter(p=>p>=7);
  let At=1,Bt=1,C=1,D=1,mu=0,R2=0;
  for(const p of ps){ At*=p/(p-2); C*=1-2/((p-1)*(p-2)); D*=p*(p-4)/((p-2)*(p-2));
                      Bt*=(p-1)/(p-3); mu+=2*Math.log(p)/((p-1)*(p-2));
                      if(Math.log(p)>2) R2+=2/(p-1); }
  Bt*=C;
  assert(Math.abs(At/Bt-1)<1e-12,'A_tot = B_tot at y='+o.y);
  console.log('  '+String(o.x).padStart(2)+' | '+At.toFixed(4).padStart(9)+' | '+Bt.toFixed(4).padStart(9)+' | '
    +(At/Bt-1).toExponential(1).padStart(7)+' | '+mu.toFixed(4).padStart(6)+' | '+R2.toFixed(2).padStart(4)+' | '
    +(1/Math.sqrt(Math.max(R2,1e-9))).toFixed(3).padStart(12)+' | '
    +Math.pow(Math.log(Math.log(o.y)),-0.25).toFixed(3).padStart(13));
}
console.log('  => A_tot = B_tot is exact at all six levels (this is the sibling PART 1 identity restated).');
console.log('  => the proved rate is numerically vacuous on every computed level: (lnln y)^-1/4 > 0.8 throughout.');

console.log('\nelapsed '+el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/varE-theta2-proof.js
//   invocation:  node research/history/staging/varE-theta2-proof.js
//   code-sha256: cf6a7edef367256180d12ca7b863b78a6db9380663aed6c45e8051c0c56a4a7f
//   out-sha256:  85f1444d3808305a8b127eeaca3c903cdcd2d23af8c1e802c6cfb9677328e016
//   body-lines:  72
//   forced:      2026-08-28, 1 of 159 figures in the replaced block not reproduced (first: 2.84e-14)
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     0.2 s
// ============================================================================
// === PART A: the closed form for the Fejer-weighted lag ===
//   R_n(c) := sum_{|h|<L, h=c mod n}(1-|h|/L) - L/n  =  [(r-c)^+ + (r+c-n)^+ - r^2/n]/L
//   random (L,n,c) triples tested: 4000   worst absolute error = 1.71e-13
//   => the phase sum over every lag is EXACT and elementary: no equidistribution enters.
//      |R_n(c)| <= min(1, n/L) always, and for n > 2L,  R_n(c) = (L-||c||_n)^+/L - L/n.
//
// === PART B: the whole object rebuilt at x = 7 from the lag expansion ===
//   direct real-space X   = 4.612929
//   lag-expansion X       = 4.612929   (192 (modulus,class) pairs)
//   corpus X (read)       = 4.612929
//   flat half  (-r^2/mK)  = -16.969697
//   active half (overlap) = 21.582626
//   sum of |terms|        = 13.991099   vs |X| = 4.612929   loss factor 3.03
//
// === PART C: the FLAT half of the non-c=0 lags, exact at six levels ===
//   Phi := K * sum_{n>2K, n squarefree, 7<=p|n<=y} (W_tot - A)(n)/n,
//   W_tot(n) = D_y prod 4/(p-4)  (all 3^omega lags),  A(n) = D_y prod 2/(p-4)  (c=0).
//    x |   ln y |          Phi | Phi/ln^2 y | Phi/ln^3 y |  delta*Phi | X (read) | n<=2K enumerated
//    7 |  2.565 |       0.3765 |     0.0572 |     0.0223 |     0.0124 |     4.61 |         3
//   11 |  3.850 |       0.5678 |     0.0383 |     0.0099 |     0.0097 |    15.08 |        55
//   13 |  5.153 |       1.2697 |     0.0478 |     0.0093 |     0.0129 |    29.56 |       676
//   17 |  6.564 |       2.3840 |     0.0553 |     0.0084 |     0.0152 |    51.40 |     11699
//   19 |  8.042 |       4.0592 |     0.0628 |     0.0078 |     0.0173 |    81.29 |    227037
//   23 |  9.611 |       6.3689 |     0.0689 |     0.0072 |     0.0191 |   121.48 |   5316569
//
// === PART C2: the flat / active split of the WHOLE object, six levels ===
//   flat  := -(1/K) sum_{m,c} w(m,c) r_m^2/m   (c-independent half, r_m = K mod m)
//   active := X - flat  (the interval-overlap half, supported on ||c||_m < r_m)
//   m = 5n, total 5-part lag weight 30, so Omega(m)/m = 6 W_tot(n)/n and sum_all = 6.
//    x |         flat |       active |        X |  |flat|/|X| | |flat|/ln^2 y | delta*|flat|
//    7 |     -16.9697 |      21.5826 |     4.61 |       3.679 |        2.5794 |        0.5594
//   11 |     -53.6471 |      68.7222 |    15.08 |       3.559 |        3.6190 |        0.9121
//   13 |     -94.7367 |     124.2947 |    29.56 |       3.205 |        3.5674 |        0.9599
//   17 |    -170.9321 |     222.3368 |    51.40 |       3.325 |        3.9674 |        1.0867
//   19 |    -278.0179 |     359.3067 |    81.29 |       3.420 |        4.2987 |        1.1878
//   23 |    -433.8019 |     555.2806 |   121.48 |       3.571 |        4.6962 |        1.3009
//
// === PART D: the two pure shift groups, bounded unconditionally ===
//   |2*X2| <= 2 * 30 * prod_{7<=p<=y} p(p-3)/(p-2)^2  (from |R| <= 1 and the total lag mass)
//    x |    bound 2B_2 | 2*X2 measured | bound/measured | B_2/ln y
//    7 |        78.438 |         5.715 |          13.73 |   0.5097
//   11 |       106.820 |         5.628 |          18.98 |   0.4624
//   13 |       137.727 |         5.333 |          25.82 |   0.4454
//   17 |       173.683 |         5.352 |          32.45 |   0.4410
//   19 |       211.818 |         5.327 |          39.77 |   0.4390
//   23 |       252.814 |         5.314 |          47.58 |   0.4384
//
// === PART E: the total lag mass, i.e. the order of the naive bound ===
//    x | sum_n W_tot(n) | /ln^4 y | sum_n A(n) | /ln^2 y
//    7 |          4.089 | 0.09448 |      2.022 | 0.30738
//   11 |         15.376 | 0.06997 |      3.921 | 0.26452
//   13 |         43.289 | 0.06138 |      6.579 | 0.24775
//   17 |        109.966 | 0.05924 |     10.486 | 0.24340
//   19 |        243.483 | 0.05821 |     15.604 | 0.24127
//   23 |        494.196 | 0.05792 |     22.231 | 0.24066
//
// === PART F: the ingredients of the c = 0 half bound ===
//   A_tot = D_y prod (p-2)/(p-4) = prod p/(p-2)   (total c=0 lag mass, p>=7)
//   B_tot = C_y prod (p-1)/(p-3)                  (total model lag mass, p>=7)
//   mu    = sum_p 2 ln p/((p-1)(p-2))             (mean log gap of the monotone coupling)
//   R(T)  = sum_{e^T < p <= y} 2/(p-1)            (Kolmogorov-Rogozin denominator, T=2)
//    x |     A_tot |     B_tot | A/B - 1 |     mu | R(2) | C/sqrt(R(2)) | (lnln y)^-1/4
//    7 |    2.0222 |    2.0222 | 2.2e-16 | 0.2219 | 0.37 |        1.651 |         1.015
//   11 |    3.9212 |    3.9212 | 2.2e-16 | 0.3137 | 1.03 |        0.986 |         0.928
//   13 |    6.5794 |    6.5794 | 2.2e-16 | 0.3408 | 1.55 |        0.804 |         0.884
//   17 |   10.4865 |   10.4865 | 2.2e-16 | 0.3492 | 2.01 |        0.705 |         0.854
//   19 |   15.6039 |   15.6039 | 1.3e-15 | 0.3513 | 2.41 |        0.644 |         0.832
//   23 |   22.2305 |   22.2305 | 5.6e-15 | 0.3518 | 2.76 |        0.602 |         0.815
//   => A_tot = B_tot is exact at all six levels (this is the sibling PART 1 identity restated).
//   => the proved rate is numerically vacuous on every computed level: (lnln y)^-1/4 > 0.8 throughout.
//
// elapsed 0.1s
// ============================================================================
// READINGS
// ============================================================================
//
// 1. PART A. The Fejer-weighted contribution of a single lag has a closed form:
//    R_n(c) = [(r-c)^+ + (r+c-n)^+ - r^2/n]/L with r = L mod n. Tested on 4000
//    random (L,n,c) triples against the brute-force shift sum, worst absolute
//    error 1.71e-13. Fact A of varE-spectral is its c = 0 case. No
//    equidistribution enters: the phase sum is exact.
//
// 2. PART B. The whole spectral object rebuilds at x = 7 from 192
//    (modulus, class) pairs using only that closed form: 4.612929, against the
//    direct real-space sum 4.612929 and the corpus 4.612929. The flat half is
//    -16.969697 and the active half +21.582626, so the split is already lossy
//    by 4.7 at the smallest level, and sum |terms| = 13.991099 is 3.03 times
//    |X|.
//
// 3. PART C. The equidistribution-free flat half of the mixed group,
//    Phi = K sum_{n>2K}(W_tot - A)(n)/n, exact at six levels: 0.3765, 0.5678,
//    1.2697, 2.3840, 4.0592, 6.3689. Phi/ln^2 y runs 0.0572, 0.0383, 0.0478,
//    0.0553, 0.0628, 0.0689, rising on the top four levels while Phi/ln^3 y falls 0.0223 .. 0.0072. delta*Phi rises on
//    four of the five steps, 0.0124 to 0.0191, falling only from x = 7 to x = 11. The closed forms
//    sum_n W_tot(n)/n = 1 and sum_n A(n)/n = prod(1-2/(p-2)^2) are asserted to
//    1e-12 at every level.
//
// 4. PART C2. The flat/active split of the whole X: flat -16.9697 .. -433.8019,
//    active +21.5826 .. +555.2806, |flat|/X between 3.205 and 3.679, and
//    delta*|flat| = 0.5594, 0.9121, 0.9599, 1.0867, 1.1878, 1.3009, rising on
//    every step against a target of 0. Absolute-value bounds after this split
//    cannot reach o(1/delta).
//
// 5. PART D. |2 X2| <= 60 prod_{7<=p<=y} p(p-3)/(p-2)^2 holds at all six levels
//    and is loose by 13.73 to 47.58; B_2/ln y settles at 0.4384, so the bound is
//    O(ln y) = o(1/delta) while the measured 2*X2 is flat near 5.3, i.e. O(1).
//    The measured column is the sibling's delta*X2 divided by this run's delta,
//    not a recomputation.
//
// 6. PART E. The total lag mass sum_n W_tot(n) = prod p^2/(p-2)^2 measured at
//    0.05792 ln^4 y and settling, and sum_n A(n) = prod p/(p-2) at 0.24066 ln^2 y.
//    So the naive |R| <= 1 bound on the mixed lags is O(ln^4 y), three
//    logarithms above the target.
//
// 7. PART F. A_tot = B_tot to 5.6e-15 at six levels; mu = sum 2 ln p/((p-1)(p-2))
//    = 0.3518 at y = 14929 and still moving in the fourth decimal; the
//    Kolmogorov-Rogozin denominator sum_{p>e^2} 2/(p-1) reaches only 2.76, so
//    the proved rate factor (ln ln y)^{-1/4} is 0.815 at x = 23 and the
//    section 4 proposition is numerically vacuous on every computed level.
//
// FIGURE PROVENANCE. Readings quote the block above verbatim except:
//   4.7     = 21.582626/4.612929, PART B's two halves against X.
//   ln^2 y, ln^3 y, ln^4 y ratios and delta*|flat| are printed columns.
//   2.62, 2.53 (local exponents of Phi) = ln(Phi ratio)/ln(ln y ratio) over the
//           x = 17,19 and x = 19,23 steps of PART C; not printed by the run.
//   -9.78   = -0.029342/delta at x = 23, delta from delta*X = 0.364320 and
//           X = 121.4787; both read from varE-theta2-step.md, not run here.
//   4.63    = 0.13342/(delta * ln y) at x = 23, same source.
//   1e-12, 1e-9, 2e-4 are this file's own assert thresholds, not outputs.
//   14929, 9.611 are the x = 23 level's y and ln y, printed in PART C's row.
