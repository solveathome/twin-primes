#!/usr/bin/env node
'use strict';
// Research-round integration checks: research-round-validation.md.
// Regression witnesses for specific failed steps, not an asymptotic proof.
const assert = require('node:assert/strict');
const centered = require('./centered-discrepancy-measurement.json');
const shifted = require('./shifted-prime-mobius-sums.json');
const gcd = (a,b) => b ? gcd(b,a%b) : a;
function factors(n) {
  const out=[];
  for(let p=2;p*p<=n;p++) if(n%p===0) {
    let k=0; while(n%p===0) {n/=p;k++;} out.push([p,k]);
  }
  if(n>1) out.push([n,1]);
  return out;
}
const phi = n => factors(n).reduce((a,[p])=>a/p*(p-1),n);
const isPrime = n => n>1 && factors(n).length===1 && factors(n)[0][1]===1;
const near = (a,b,tol=1e-12) => assert(Math.abs(a-b)<=tol, `${a} != ${b}`);

// A: inclusive e>=e1 is not strict n>e1*m.
{
  const x=16,y=2,e1=3,m=5;
  const exact=[],wrong=[];
  for(let e=e1;e*m<=x;e+=2) {
    if(e*m<=x/2 || m<=y || factors(e).some(([,k])=>k>1) || gcd(e,m)!==1) continue;
    if(isPrime(e*m-2)) {exact.push(e*m); if(e*m>e1*m) wrong.push(e*m);}
  }
  assert.deepEqual(exact,[15]); assert.deepEqual(wrong,[]);
  console.log('A endpoint control: strict cutoff loses n=15, Lambda(13) atom.');
}
// A: reciprocal totient local weight; preserve coprimality separately.
{
  const mp=3,r=9,d=gcd(mp,r);
  near(1/phi(mp*r),1/(phi(mp)*phi(r))*phi(d)/d);
  assert(Math.abs(1/phi(mp*r)-1/(phi(mp)*phi(r))*d/phi(d))>0.01);
  console.log('A local-factor control: correct factor 2/3; reciprocal 3/2 fails.');
}
// C: actual rounded endpoint normalization versus a fixed-exponent proxy.
const chi = t => t<=0?1:t>=1?0:1-35*t**4+84*t**5-70*t**6+20*t**7;
let roundedChecks=0,proxyMismatch=0;
for(const j of [20,24,32,40,48]) for(const [lo,hi] of [[.22,.24],[.04,.05]]) {
  const x=2**j,a=Math.floor(x**lo),b=Math.floor(x**hi),L=Math.log(x);
  if(a===b) continue;
  for(let d=1;d<=b+2;d++) {
    const actual=chi(Math.log(d/a)/Math.log(b/a));
    const corrected=chi((Math.log(d)/L-Math.log(a)/L)/(Math.log(b)/L-Math.log(a)/L));
    near(actual,corrected,1e-11);roundedChecks++;
    if(Math.abs(actual-chi((Math.log(d)/L-lo)/(hi-lo)))>1e-4) proxyMismatch++;
  }
}
assert(proxyMismatch>0);
console.log(`C rounded-profile checks: ${roundedChecks}; fixed-exponent mismatches: ${proxyMismatch}.`);
// C: an unsigned envelope cannot transfer unweighted cancellation.
assert.equal(1-1,0); assert.equal(2*1+1*(-1),1);
console.log('C weighted-transfer control: unweighted sum 0, weighted sum 1.');
// E: dyadic u=3 does not remove odd-composite contamination.
{
  const X=64,y=4,n=125;
  assert(n>X && n+2<=2*X+2);
  assert(factors(n).every(([p])=>p>y) && factors(n+2).every(([p])=>p>y));
  assert.equal(factors(n).reduce((s,[,k])=>s+k,0),3);
  assert(isPrime(n+2)); assert(!isPrime(n));
  console.log('E endpoint control: (125,127) survives y=4 on (64,128], both odd but not twins.');
}
// V: read retained artifacts; no census or random-control reconstruction.
const rows=centered.rows.filter(r=>r.shift===2), C2=centered.config.C2;
const large=rows.filter(r=>r.j>=30);
const deviation=Math.max(...large.map(r=>Math.abs((r.D+r.T1)/r.x-C2)));
const sError=Math.max(...large.map(r=>Math.abs(r.S/r.x-C2)));
const dError=Math.max(...rows.filter(r=>r.j>=26).map(r=>Math.abs(r.D/r.x)));
assert(deviation>1e-4 && deviation<2e-4);
assert(sError>1.79e-4 && sError<1.8e-4);
assert(dError>0.0042 && dError<0.0043);
let maxMeanError=0;
for(const r of rows) {
  const other=shifted.rows.find(s=>s.j===r.j);assert(other);
  maxMeanError=Math.max(maxMeanError,Math.abs(r.M-other.Mdy)/Math.max(1,Math.abs(r.M)));
}
assert.equal(rows.length,23); assert(maxMeanError<6e-12);
console.log(`V artifact checks: max |D/x+T1/x-C2|=${deviation.toExponential(6)}, max |S/x-C2|=${sError.toExponential(6)}, max |D/x| (j>=26)=${dError.toExponential(6)}.`);
console.log(`V common M columns: ${rows.length} scales, max relative difference ${maxMeanError.toExponential(3)}.`);
// A (second dispatch): the limiting constant of the uniform mean (3a.9).
// P_0(u)=sum_{m'<=u} mu(m')h_{b,g}(m')/phi(m') -> 0 and
// P_1(u)=sum mu(m')log m' h_{b,g}(m')/phi(m') -> -H_{b,g}(0). Measurement, not rate.
{
  const N=1000000, mu=new Int8Array(N+1).fill(1), ph=new Int32Array(N+1), sp=new Int32Array(N+1);
  for(let i=0;i<=N;i++) ph[i]=i;
  for(let p=2;p<=N;p++){ if(sp[p]) continue; for(let k=p;k<=N;k+=p){ if(!sp[k]) sp[k]=p; ph[k]-=ph[k]/p; mu[k]=-mu[k]; } for(let k=p*p;k<=N;k+=p*p) mu[k]=0; }
  const C2=0.6601618158468695739;
  const pf=n=>{const f=[];while(n>1){const p=sp[n];f.push(p);while(n%p===0)n/=p;}return f;};
  const H0=(b,g)=>{let v=2*C2;for(const p of new Set([...pf(b),...pf(g)])) if(p>2) v/=1-1/((p-1)*(p-1));for(const p of pf(g)) v*=p/(p-1);return v;};
  const h=(m,b,g)=>{let v=1;for(const p of pf(m)){if(p===2||g%p===0)return 0;if(b%p===0)v*=(p-1)/p;}return v;};
  const out=[];
  for(const [b,g] of [[1,1],[3,3],[5,35],[1,105]]){
    let P0=0,P1=0;
    for(let m=1;m<=N;m++){ if(mu[m]===0) continue; const hv=h(m,b,g); if(hv===0) continue; const t=mu[m]*hv/ph[m]; P0+=t; P1+=t*Math.log(m); }
    const r1=P1+H0(b,g);
    assert(Math.abs(P0)<5e-3 && Math.abs(r1)<5e-3, `UM constant check failed at (${b},${g})`);
    out.push(`(${b},${g}) P0=${P0.toExponential(2)} P1+H0=${r1.toExponential(2)}`);
  }
  console.log('A uniform-mean constant at u=1e6: '+out.join('; ')+'.');
}
// C (second dispatch): F_r = sum_j (-1)^j C(r,j) chi(35j/r-11) for r=35m, exact BigInt.
// chi(y)=1-S(y), S(y)=35y^4-84y^5+70y^6-20y^7 on [0,1]; m^7 F_r is an integer.
{
  const Fr=(m)=>{ const r=35*m, M=BigInt(m), M7=M**7n; let C=1n, tot=0n;
    for(let j=0;j<=r;j++){ if(j>0) C=C*BigInt(r-j+1)/BigInt(j);
      let chi; if(j<=11*m) chi=M7; else if(j>=12*m) chi=0n;
      else { const l=BigInt(12*m-j); chi=35n*l**4n*M**3n-84n*l**5n*M**2n+70n*l**6n*M-20n*l**7n; }
      tot += (j%2? -C: C)*chi; }
    return Number(tot)/Number(M7); };
  const f70=Fr(2), f140=Fr(4);
  assert(Math.abs(Math.abs(f70)/3.071e17-1)<2e-3 && Math.abs(Math.abs(f140)/1.451e36-1)<2e-3, 'F_r mismatch');
  assert(Math.log2(Math.abs(f70))/70>0.8 && Math.log2(Math.abs(f140))/140>0.85);
  // c_0 = (1/2) int_0^2 (h(v)-h(v-1.2)) dv with h=1-chi((v-w)/(w'-w)), midpoint rule.
  const S=y=>y<=0?0:y>=1?1:35*y**4-84*y**5+70*y**6-20*y**7, w=0.22, w2=0.24;
  const h=v=>S((v-w)/(w2-w)); let c0=0; const n=200000; for(let i=0;i<n;i++){ const v=(i+0.5)*2/n; c0+=h(v)-h(v-1.2); } c0*=0.5*2/n;
  assert(Math.abs(c0-0.6)<1e-6);
  console.log(`C independent recomputation: |F_70|=${Math.abs(f70).toExponential(3)}, |F_140|=${Math.abs(f140).toExponential(3)}, c_0=${c0.toFixed(6)}.`);
}
// Integration review: exact rational certificates and regression controls.
// These verify the arithmetic in the accompanying proofs, not their imported
// theorems or any unproved correlation estimate.
{
  const bgcd=(a,b)=>b?bgcd(b,a%b):a<0n?-a:a;
  const R=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}assert(d!==0n);const g=bgcd(n,d);return [n/g,d/g];};
  const add=(a,b)=>R(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
  const neg=a=>[-a[0],a[1]], sub=(a,b)=>add(a,neg(b));
  const mul=(a,b)=>R(a[0]*b[0],a[1]*b[1]);
  const div=(a,b)=>R(a[0]*b[1],a[1]*b[0]);
  const lt=(a,b)=>a[0]*b[1]<b[0]*a[1];
  const eq=(a,b)=>assert.equal(a[0]*b[1],b[0]*a[1]);
  const one=R(1), two=R(2), half=R(1,2);
  // log z = 2 sum t^(2j+1)/(2j+1); tail bounded by a geometric series.
  const rawLog=z=>{const t=div(sub(z,one),add(z,one)), t2=mul(t,t);let p=t,s=R(0);
    for(let j=0;j<32;j++){s=add(s,div(p,R(2*j+1)));p=mul(p,t2);}
    const lo=mul(two,s),tail=div(mul(two,p),mul(R(65),sub(one,t2)));
    return [lo,add(lo,tail)];};
  const log2=rawLog(two);
  const log=z=>{let k=0;while(!lt(z,two)){z=div(z,two);k++;}assert(!lt(z,one));
    const b=rawLog(z);return [add(b[0],mul(R(k),log2[0])),add(b[1],mul(R(k),log2[1]))];};
  let H100=R(0);for(let j=1;j<=100;j++)H100=add(H100,R(1,j));
  assert(lt(H100,log(R(180))[0])); // gamma <= H_100-log 100 < log(9/5).
  const eg=R(9,5);
  const dLower=u=>div(sub(mul(sub(u,two),log(sub(u,two))[0]),sub(u,R(3))),sub(u,one));
  // Integer-cell lower sum for D_3(8). Unimodality puts each cell minimum
  // at an endpoint; compare the chosen endpoints with directed enclosures.
  const v=j=>log(R(j-1)).map(a=>div(a,R(j)));
  assert(lt(v(3)[1],v(4)[0]));assert(lt(v(4)[1],v(5)[0]));
  assert(lt(v(6)[1],v(5)[0]));assert(lt(v(7)[1],v(6)[0]));
  const d8=[3,4,6,7].map(j=>v(j)[0]).reduce(add,R(0));assert(lt(one,d8));
  const pieces=[[R(4),R(22,5)],[R(22,5),R(24,5)],[R(24,5),R(6)],[R(6),R(8)],[R(8),null]];
  const bounds=[];
  for(const [u0,u1] of pieces){const d=u1?dLower(u0):d8;
    let f2=one;if(u1){const s=mul(half,u1), f=div(mul(mul(two,eg),log(sub(s,one))[1]),s);f2=mul(f,f);if(lt(one,f2))f2=one;}
    const c=mul(f2,add(one,div(one,d)));
    const q=mul(f2,add(div(eg,R(4)),div(mul(eg,add(one,div(one,d))),mul(two,u0))));
    assert(lt(q,one));assert(lt(c,R(4)));if(!u1||lt(u0,R(24,5)))assert(lt(c,two));
    // Output rational decimal upper bounds, rounded upward by integer division.
    const ceil1000=a=>(1000n*a[0]+a[1]-1n)/a[1];
    bounds.push(`${ceil1000(q)}/1000,${ceil1000(c)}/1000`);
  }
  console.log('E certified upper bounds (Q,c), five pieces: '+bounds.join('; ')+'.');
  // D: fixed q-sector cross moment Q^(3/2) E^3 and its Cauchy factor MQ.
  const a=R(14,25),nu=half,sigma=R(1,20);
  const moment=add(mul(R(3,2),sigma),mul(R(3),sub(nu,sigma)));
  const cauchy=add(a,sigma), target=sub(two,cauchy), gap=sub(moment,target);
  eq(moment,R(57,40));eq(target,R(139,100));eq(gap,R(7,200));
  eq(mul(half,add(moment,cauchy)),R(407,400));eq(div(gap,R(3,2)),R(7,300));
  assert(!lt(R(17,200),gap));
  console.log('D exact exponent control: moment 57/40, target 139/100, saving 7/200, gcd threshold 7/300 (each with positive slack for a saving).');
  // B: general delta<1/50 needs a different Dickman error from delta=1/100.
  let fact11=1n;for(let j=2n;j<=11n;j++)fact11*=j;
  const err=R(12n,fact11);assert(lt(err,R(1,1000)));
  const Ihi=add(sub(one,log2[0]),err);assert(lt(Ihi,R(31,100)));
  assert(lt(sub(Ihi,mul(R(40,9),R(4,25))),R(-2,5)));
  assert(lt(sub(Ihi,mul(two,R(4,25))),R(0)));
  console.log('B exact constant control: uniform error 12/11! < 1/1000; separate-sign lower-bound coefficient < -2/5 (still negative with pair constant 2).');
  // C: sufficient unit-disc condition |k| log W/log x <= 1/3.
  assert(lt(R(24,100),R(1,3)));assert(lt(mul(R(6),R(5,100)),R(1,3)));
  assert(2*Math.sin(Math.PI*.24/2)<1);assert(2*Math.sin(Math.PI*6*.05/2)<1);
  assert(2*Math.sin(Math.PI*2*.24/2)>1);assert(2*Math.sin(Math.PI*7*.05/2)>1);
  console.log('C unit-disc correction: left k=0,+/-1 and right k=0,+/-1,...,+/-6 satisfy the sufficient condition, independently of the Mellin twist.');
  // A2 density identity, including repeated prime powers in r.
  for(let e=1;e<=50;e+=2)for(let r=1;r<=60;r++){
    let lhs=R(0);for(let g=1;g<=e;g++)if(e%g===0){const fs=factors(g);const mu=fs.some(([,k])=>k>1)?0:(-1)**fs.length;
      lhs=add(lhs,R(mu,phi(e*r*g/gcd(r,g))));}
    eq(lhs,gcd(e,r)===1?R(1,e*phi(r)):R(0));
  }
  // Logical consumer check only: stronger D-margin implies a B-margin;
  // the latter does not imply the former for arbitrary admissible M.
  const cc=R(66,100),mm=R(-1,10),bb=R(-3,5);
  assert(lt(neg(sub(cc,R(1,200))),bb));assert(lt(add(bb,mul(mul(two,cc),mm)),R(-4,25)));
  console.log('A2 controls: 1500 exact density identities, including repeated prime powers; the two proposed sufficient consumers are not algebraically equivalent.');
}
console.log('PASS: specific algebra, rational certificates and artifact controls. No sufficient twin-prime estimate tested.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/research-round-validation.js
//   invocation:  node research/research-round-validation.js
//   code-sha256: 614d1d54cc69f6512cedc4f026df8c79f5083e67c7a4843d99be59b39e7d7914
//   out-sha256:  68997d5b2e6b239df2963183aa01996c82adfeab6a6efe52484df97108098a4b
//   body-lines:  15
//   inputs:      research/centered-discrepancy-measurement.json@595b96074bba research/shifted-prime-mobius-sums.json@c925d5d36987
//   forced:      2026-09-09, 0 of 22 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-09
//   elapsed:     0.3 s
// ============================================================================
// A endpoint control: strict cutoff loses n=15, Lambda(13) atom.
// A local-factor control: correct factor 2/3; reciprocal 3/2 fails.
// C rounded-profile checks: 4034; fixed-exponent mismatches: 1391.
// C weighted-transfer control: unweighted sum 0, weighted sum 1.
// E endpoint control: (125,127) survives y=4 on (64,128], both odd but not twins.
// V artifact checks: max |D/x+T1/x-C2|=1.844010e-4, max |S/x-C2|=1.797112e-4, max |D/x| (j>=26)=4.283329e-3.
// V common M columns: 23 scales, max relative difference 5.385e-12.
// A uniform-mean constant at u=1e6: (1,1) P0=2.32e-4 P1+H0=3.22e-3; (3,3) P0=8.79e-5 P1+H0=1.20e-3; (5,35) P0=3.79e-5 P1+H0=4.36e-4; (1,105) P0=2.93e-4 P1+H0=4.28e-3.
// C independent recomputation: |F_70|=3.071e+17, |F_140|=1.451e+36, c_0=0.600000.
// E certified upper bounds (Q,c), five pieces: 216/1000,781/1000; 420/1000,1491/1000; 897/1000,3120/1000; 875/1000,2899/1000; 672/1000,1971/1000.
// D exact exponent control: moment 57/40, target 139/100, saving 7/200, gcd threshold 7/300 (each with positive slack for a saving).
// B exact constant control: uniform error 12/11! < 1/1000; separate-sign lower-bound coefficient < -2/5 (still negative with pair constant 2).
// C unit-disc correction: left k=0,+/-1 and right k=0,+/-1,...,+/-6 satisfy the sufficient condition, independently of the Mellin twist.
// A2 controls: 1500 exact density identities, including repeated prime powers; the two proposed sufficient consumers are not algebraically equivalent.
// PASS: specific algebra, rational certificates and artifact controls. No sufficient twin-prime estimate tested.
// ============================================================================
// READINGS
// These checks distinguish specific invalid steps from corrected algebra and
// retained finite measurements. The written review checks the analytic arguments;
// these finite controls do not prove an asymptotic estimate.
