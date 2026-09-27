#!/usr/bin/env node
'use strict';
// Question: do the sharp-energy and transition identities survive exact checks?
// Finite proxy intervals only; no analytic constant or asymptotic is tested.
const assert = require('node:assert/strict');
const X=4096;
const ds=Array.from({length:X+1},()=>[]);
for(let d=1;d<=X;d++) for(let n=d;n<=X;n+=d) ds[n].push(d);
const primes=[];
for(let n=2;n<=X;n++) if(ds[n].length===2) primes.push(n);
const mu=Array(X+1).fill(1),base=Array(X+1).fill(0);
for(const p of primes) {
  for(let n=p;n<=X;n+=p) mu[n]*=-1;
  for(let n=p*p;n<=X;n+=p*p) mu[n]=0;
  for(let r=p;r<=X;r*=p) base[r]=p;
}
const M=(m,D)=>ds[m].reduce((s,d)=>s+(d<=D?mu[d]:0),0);
const gcd=(a,b)=>b?gcd(b,a%b):a;
const near=(a,b)=>assert(Math.abs(a-b)<1e-9*(1+Math.abs(a)+Math.abs(b)),`${a} != ${b}`);
const controls=new Set();
let coefficientChecks=0,gramChecks=0,crossChecks=0,transitionChecks=0,kernelFibers=0;
let powersSeen=0,nonSquarefreeSeen=0,negativeCrossSeen=0;
const fixtures=[[2048,240,3],[4096,500,3],[4096,180,13],[4096,110,7]];
for(const [x,D,W] of fixtures) {
  const R=x/D;
  assert(R<D&&x/(W*W)<D);
  const ps=primes.filter(p=>p<R),P=ps.length;
  const zero=()=>Array(P).fill(0);
  const direct=(n,weight)=> {
    const a=zero();
    for(const d of ds[n]) if(mu[d]&&weight(d)) {
      for(const r of ds[n/d]) if(r>W&&base[r]) {
        const i=ps.indexOf(base[r]);assert(i>=0);
        a[i]+=mu[d]*weight(d);
      }
    }
    return a;
  };
  // For these coefficients any active r is <R. The beta expansion is kept
  // separate from the inverted M formula so cancellation errors are exposed.
  const h=d=>d<=D?0:d>=2*D?1:Math.log(d/D)/Math.log(2);
  const C=[],smooth=[],prime=[];
  for(let n=1;n<=x;n++) {
    C[n]=direct(n,d=>+(d>D));
    smooth[n]=direct(n,h);
    const b=zero(),pOnly=zero(),withSingleton=zero();
    for(const r of ds[n]) if(r>W&&base[r]) {
      const value=-M(n/r,D),i=ps.indexOf(base[r]);
      // Terms outside the basis vanish except the deliberately wrong r=n.
      if(r<n) {
        assert(i>=0||value===0);
        if(i>=0) {b[i]+=value;if(r===base[r]) pOnly[i]+=value;}
      }
      if(i>=0) withSingleton[i]+=value;
      else if(r===n&&value) controls.add('prime singleton');
    }
    assert.deepEqual(C[n],b);coefficientChecks++;
    prime[n]=pOnly;
    if(b.some((v,i)=>v!==withSingleton[i])) controls.add('prime singleton');
    if(b.some((v,i)=>v!==pOnly[i])) {controls.add('proper prime powers');powersSeen++;}
    if(!mu[n]&&b.some(Boolean)) nonSquarefreeSeen++;
    if(b.some((v,i)=>Math.abs(v-smooth[n][i])>1e-10)) controls.add('sharp versus smooth');
  }
  for(const shift of [0,2]) {
    const lo=x/2-shift,hi=x-shift;
    const gram=Array.from({length:P},zero),expanded=Array.from({length:P},zero);
    for(let n=lo+1;n<=hi;n++) for(let i=0;i<P;i++) for(let j=0;j<P;j++)
      gram[i][j]+=prime[n][i]*prime[n][j];
    for(let i=0;i<P;i++) for(let j=0;j<P;j++) {
      const p=ps[i],q=ps[j];
      if(p>W&&q>W) {
        if(p===q) {
          for(let m=2;p*m<=hi;m++) if(p*m>lo) expanded[i][j]+=M(m,D)**2;
        } else {
          let wrongRestriction=0,wrongInterval=0,wrongCut=0;
          for(let m=1;p*q*m<=hi;m++) {
            const lhs=M(q*m,D)*M(p*m,D);
            const rhs=m>1&&gcd(m,p*q)===1?M(m,D/q)*M(m,D/p):0;
            assert.equal(lhs+0,rhs+0);crossChecks++;
            wrongInterval+=rhs;
            if(p*q*m>lo) {
              expanded[i][j]+=rhs;
              wrongRestriction+=M(m,D/q)*M(m,D/p);
              wrongCut+=m>1&&gcd(m,p*q)===1?M(m,D/q)*M(m,D/q):0;
            }
          }
          if(wrongRestriction!==expanded[i][j]) controls.add('cross coprimality');
          if(wrongInterval!==expanded[i][j]) controls.add('interval clipping');
          if(wrongCut!==expanded[i][j]) controls.add('distinct divisor cuts');
          if(expanded[i][j]) controls.add('off diagonal');
          if(expanded[i][j]<0) negativeCrossSeen++;
        }
      }
      assert.equal(gram[i][j],expanded[i][j]);gramChecks++;
    }
    // A scalar numerical check supplements (not replaces) the exact Gram test.
    const value=a=>a.reduce((s,v,i)=>s+v*Math.log(ps[i]),0);
    let directEnergy=0,matrixEnergy=0;
    for(let n=lo+1;n<=hi;n++) directEnergy+=value(prime[n])**2;
    for(let i=0;i<P;i++) for(let j=0;j<P;j++) matrixEnergy+=gram[i][j]*Math.log(ps[i])*Math.log(ps[j]);
    near(directEnergy,matrixEnergy);
    if(shift===0) for(let n=lo+1;n<=hi;n++) {
      const a=value(C[n]),b=value(C[n-2]);
      const c=value(smooth[n]),d=value(smooth[n-2]);
      const t=a-c,u=b-d;
      near(a*b,c*d+t*d+c*u+t*u);transitionChecks++;
      if(Math.abs(t*u)>1e-10) controls.add('transition product');
    }
  }
}
// The singleton correction is necessary independently of interval clipping.
assert.equal(M(5,100)*M(7,100),0);
assert.equal(M(1,100/5)*M(1,100/7),1);
controls.add('cross singleton');
// A counterexample outside m<D: the reduced formula no longer follows.
let outsideFound=false;
for(const p of [3,5,7]) for(const q of [3,5,7]) if(p!==q)
  for(let D=2;D<=30;D++) for(let m=D+1;m<=60;m++) if(gcd(m,p*q)===1) {
    if(M(q*m,D)*M(p*m,D)!==M(m,D/q)*M(m,D/p)) outsideFound=true;
  }
assert(outsideFound);controls.add('short cofactor hypothesis');
// Independently enumerate the determinant-2 fibers of the transition kernel.
const kx=512,kD=64,kE=80,kW=3;
const beta=k=>ds[k].reduce((s,r)=>s+(r>kW&&base[r]?Math.log(base[r]):0),0);
const rho=(d,D)=>d>D&&d<2*D?Math.log(2*D/d)/Math.log(2):0;
const tcoef=(n,D)=>ds[n].reduce((s,d)=>s+mu[d]*rho(d,D)*beta(n/d),0);
let kernelDirect=0,kernelExpanded=0,badGcd=0;
for(let n=kx/2+1;n<=kx;n++) kernelDirect+=tcoef(n,kD)*tcoef(n-2,kE);
for(let d=kD+1;d<2*kD;d++) for(let e=kE+1;e<2*kE;e++)
  for(let k=1;d*k<=kx;k++) if(d*k>kx/2&&(d*k-2)%e===0) {
    const v=(d*k-2)/e;
    assert(v>=1&&2%gcd(d,e)===0);
    const term=mu[d]*mu[e]*rho(d,kD)*rho(e,kE)*beta(k)*beta(v);
    kernelExpanded+=term;
    if(term) {kernelFibers++;if(gcd(d,e)===1) badGcd+=term;}
  }
near(kernelDirect,kernelExpanded);assert(kernelFibers>0);
if(Math.abs(kernelDirect-badGcd)>1e-10) controls.add('even divisor-pair branch');
// A diagonal is not a lower bound without a cross-term budget.
assert((1-1)**2<1**2+(-1)**2);controls.add('diagonal lower-bound shortcut');
assert(powersSeen&&nonSquarefreeSeen);
const required=['prime singleton','proper prime powers','sharp versus smooth',
  'cross coprimality','interval clipping','distinct divisor cuts','off diagonal',
  'transition product','cross singleton','short cofactor hypothesis','diagonal lower-bound shortcut',
  'even divisor-pair branch'];
for(const key of required) assert(controls.has(key),`inactive control: ${key}`);
console.log('Sharp corner finite identities PASS');
console.log(`Exact prime-log coefficient vectors: ${coefficientChecks}; Gram entries: ${gramChecks}; cross-prime identities: ${crossChecks}`);
console.log(`Transition product identities: ${transitionChecks}; proper-power vectors: ${powersSeen}; non-squarefree vectors: ${nonSquarefreeSeen}`);
console.log(`Negative cross-prime matrix entries observed: ${negativeCrossSeen}`);
console.log(`Nonzero transition-kernel fibers: ${kernelFibers}`);
console.log(`Active controls (${required.length}): ${required.join('; ')}`);
console.log('Uniform mean-square inputs, asymptotic lower bounds and twin margins are not numerically certified.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/sharp-corner-transition-validation.js
//   invocation:  node research/sharp-corner-transition-validation.js
//   code-sha256: 707aa7f034b989491abfa644d1d3da948230ec48e2f366650a9ec32f7287bdd9
//   out-sha256:  976d9c322112c46fb807fd07bb37c972913dfd540c860ce7042119aedcad3595
//   body-lines:  7
//   forced:      2026-09-06, 0 of 6 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.2 s
// ============================================================================
// Sharp corner finite identities PASS
// Exact prime-log coefficient vectors: 14336; Gram entries: 480; cross-prime identities: 1898
// Transition product identities: 7168; proper-power vectors: 1033; non-squarefree vectors: 1152
// Negative cross-prime matrix entries observed: 0
// Nonzero transition-kernel fibers: 10
// Active controls (12): prime singleton; proper prime powers; sharp versus smooth; cross coprimality; interval clipping; distinct divisor cuts; off diagonal; transition product; cross singleton; short cofactor hypothesis; diagonal lower-bound shortcut; even divisor-pair branch
// Uniform mean-square inputs, asymptotic lower bounds and twin margins are not numerically certified.
// ============================================================================
// READINGS
// Exact finite algebra and active failed-shortcut controls only. The asymptotic
// argument is in sharp-corner-transition.md and uses named analytic inputs.
