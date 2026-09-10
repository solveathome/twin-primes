#!/usr/bin/env node
'use strict';
// Question: do the exact identities used by transition-signed-estimate.md
// survive finite checks? Single-prime reduction of the transition cofactor,
// the fiber/linear-form representation of the kernel (E1) with both gcd
// branches, and the small-prime cutoff-difference identity for T.
// Finite proxy cutoffs only; no asymptotic rate, sign or twin margin is tested.
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
const gcd=(a,b)=>b?gcd(b,a%b):a;
const near=(a,b)=>assert(Math.abs(a-b)<1e-9*(1+Math.abs(a)+Math.abs(b)),`${a} != ${b}`);
const controls=new Set();
// beta_W(k)=sum_{r|k, r>W} Lambda(r), Lambda(p^a)=log p.
const beta=(k,W)=>ds[k].reduce((s,r)=>s+(r>W&&base[r]?Math.log(base[r]):0),0);
const betaQ=(k,W)=>ds[k].reduce((s,r)=>s+(r>W&&base[r]&&r!==base[r]?Math.log(base[r]):0),0);
// rho on (D,z): log(z/d)/log(z/D); the transition weight is rho on D<d<z, else 0.
const rhoT=(d,D,z)=>d>D&&d<z?Math.log(z/d)/Math.log(z/D):0;
const T=(n,D,z,W)=>ds[n].reduce((s,d)=>s+mu[d]*rhoT(d,D,z)*beta(n/d,W),0);

// ---------------------------------------------------------------- I1
// If k<=W^2 then every prime power r|k with r>W has the same prime base.
let singleBase=0;
for(const [W,K] of [[16,128],[4,16]]) {
  assert(K<=W*W);
  for(let k=1;k<=K;k++) {
    const bases=new Set(ds[k].filter(r=>r>W&&base[r]).map(r=>base[r]));
    assert(bases.size<=1);
    if(bases.size===1) singleBase++;
  }
}
// Control: with K>W^2 two distinct primes above W can divide k.
{
  const W=4,K=64;
  const bad=[];
  for(let k=1;k<=K;k++) {
    const bases=new Set(ds[k].filter(r=>r>W&&base[r]).map(r=>base[r]));
    if(bases.size>1) bad.push(k);
  }
  assert(bad.length>0);controls.add('short cofactor hypothesis');
}

// ---------------------------------------------------------------- I2
// Fiber form: sum_{n in J} T_L(n)T_R(n-2) equals the sum over (k,v) of
// beta(k)beta(v) times the signed sum over the arithmetic progression of d.
const fixtures=[
  {x:4096,V:16,DL:32,zL:128,Z:4,DR:256,zR:1024},
  {x:2048,V:11,DL:20,zL:64,Z:4,DR:128,zR:512},
];
let fibers=0,evenBranch=0,parityMismatch=0,qSupport=0,qNonzero=0;
for(const f of fixtures) {
  const {x,V,DL,zL,Z,DR,zR}=f;
  assert(x/DL<=V*V&&(x-2)/DR<=Z*Z);
  let direct=0;
  for(let n=x/2+1;n<=x;n++) direct+=T(n,DL,zL,V)*T(n-2,DR,zR,Z);
  const Kmax=Math.floor(x/(DL+1)),Vmax=Math.floor((x-2)/(DR+1));
  let fiberSum=0;
  for(let k=1;k<=Kmax;k++) {
    const bk=beta(k,V);if(!bk) continue;
    for(let v=1;v<=Vmax;v++) {
      const bv=beta(v,Z);if(!bv) continue;
      const g=gcd(k,v);
      // Enumerate d with dk in J, dk-2=ev, e integer.
      const sol=[];
      for(let d=Math.floor(x/(2*k))+1;d<=Math.floor(x/k);d++) {
        if((d*k-2)%v) continue;
        const e=(d*k-2)/v;
        sol.push([d,e]);
      }
      // Same integer parity of k and v does not decide compatibility.
      if((k%2)===(v%2)&&g>2) parityMismatch++;
      if(g>2) {assert.equal(sol.length,0);continue;}
      if(sol.length) {
        fibers++;if(g===2) evenBranch++;
        // Solutions form one progression d=c0+(v/g)t, e=c1+(k/g)t.
        for(let i=1;i<sol.length;i++) {
          assert.equal(sol[i][0]-sol[i-1][0],v/g);
          assert.equal(sol[i][1]-sol[i-1][1],k/g);
        }
        // No solution is skipped inside the range.
        const first=sol[0][0],last=sol[sol.length-1][0];
        assert.equal(sol.length,(last-first)/(v/g)+1);
      }
      let inner=0;
      for(const [d,e] of sol) inner+=mu[d]*mu[e]*rhoT(d,DL,zL)*rhoT(e,DR,zR);
      fiberSum+=bk*bv*inner;
    }
  }
  near(direct,fiberSum);
  // Control: a parity rule predicts nonempty fibers that the gcd test empties.
  if(parityMismatch>0) controls.add('integer parity substitute');
  // Q-part: the proper-power transition coefficient is supported on n
  // divisible by a proper prime power above W.
  for(let n=x/2+1;n<=x;n++) {
    const q=ds[n].reduce((s,d)=>s+mu[d]*rhoT(d,DL,zL)*betaQ(n/d,V),0);
    if(q!==0) {
      qNonzero++;
      assert(ds[n].some(r=>r>V&&base[r]&&r!==base[r]));
      qSupport++;
    }
  }
}
assert(evenBranch>0);controls.add('even cofactor-pair branch');
assert(controls.has('integer parity substitute'));
assert(qNonzero>0);

// ---------------------------------------------------------------- I3
// Cutoff-difference identity: for prime p<=W, p not dividing n, pn<=x,
// T(pn)=sum_{d|n} mu(d){rhoT(d)-rhoT(pd)}beta(n/d), and its window form.
let ramare=0,caseA=0,caseB=0;
for(const [W,D,z] of [[16,32,128],[16,40,120],[4,256,1024]]) {
  const L=Math.log(z/D);
  for(const p of primes.filter(p=>p<=W)) {
    for(let n=1;n<=X/p;n++) {
      if(n%p===0) continue;
      const lhs=T(p*n,D,z,W);
      let rhs=0;
      for(const d of ds[n]) rhs+=mu[d]*(rhoT(d,D,z)-rhoT(p*d,D,z))*beta(n/d,W);
      near(lhs,rhs);ramare++;
      let win=0;
      if(p<z/D) {
        caseA++;
        for(const d of ds[n]) {
          const b=beta(n/d,W);
          if(d>D&&d<z/p) win+=mu[d]*(Math.log(p)/L)*b;
          else if(d>D/p&&d<=D) win-=mu[d]*rhoT(p*d,D,z)*b;
          else if(d>=z/p&&d<z) win+=mu[d]*rhoT(d,D,z)*b;
        }
      } else {
        caseB++;
        win=T(n,D,z,W);
        for(const d of ds[n]) if(d>D/p&&d<z/p) win-=mu[d]*rhoT(p*d,D,z)*beta(n/d,W);
      }
      near(lhs,win);
    }
  }
  // Controls: p dividing n, or p above W, break beta(pk)=beta(k).
  {
    let broken=0;
    for(const p of primes.filter(p=>p<=W)) for(let n=p;n<=X/p;n+=p) {
      let rhs=0;
      for(const d of ds[n]) rhs+=mu[d]*(rhoT(d,D,z)-rhoT(p*d,D,z))*beta(n/d,W);
      if(Math.abs(T(p*n,D,z,W)-rhs)>1e-9) broken++;
    }
    if(broken) controls.add('p divides n');
  }
  {
    let broken=0;
    for(const p of primes.filter(p=>p>W&&p<4*W)) for(let n=1;n<=X/p;n++) {
      if(n%p===0) continue;
      let rhs=0;
      for(const d of ds[n]) rhs+=mu[d]*(rhoT(d,D,z)-rhoT(p*d,D,z))*beta(n/d,W);
      if(Math.abs(T(p*n,D,z,W)-rhs)>1e-9) broken++;
    }
    if(broken) controls.add('p above W');
  }
}
assert(caseA>0&&caseB>0);
const required=['short cofactor hypothesis','even cofactor-pair branch',
  'integer parity substitute','p divides n','p above W'];
for(const key of required) assert(controls.has(key),`inactive control: ${key}`);
console.log('Transition signed-estimate finite identities PASS');
console.log(`Single-base cofactors: ${singleBase}; kernel fibers: ${fibers}; even-branch fibers: ${evenBranch}; same-parity incompatible pairs: ${parityMismatch}`);
console.log(`Proper-power transition support checks: ${qSupport} of ${qNonzero} nonzero`);
console.log(`Cutoff-difference identities: ${ramare} (p<z/D: ${caseA}; p>=z/D: ${caseB})`);
console.log(`Active controls (${required.length}): ${required.join('; ')}`);
console.log('No asymptotic rate, sign, correlation saving or twin margin is certified.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/transition-signed-estimate-validation.js
//   invocation:  node research/transition-signed-estimate-validation.js
//   code-sha256: 702ae3408d4a2e852260ec7716ae365af8c8da1c11715ca73f9f86b35f64be72
//   out-sha256:  3e155df857dbc00a779f6a6e8ebe86e447e2b92a3d03431c8080a388ee7c3a97
//   body-lines:  6
//   forced:      2026-09-06, 0 of 6 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.1 s
// ============================================================================
// Transition signed-estimate finite identities PASS
// Single-base cofactors: 81; kernel fibers: 993; even-branch fibers: 125; same-parity incompatible pairs: 90
// Proper-power transition support checks: 273 of 273 nonzero
// Cutoff-difference identities: 9378 (p<z/D: 4892; p>=z/D: 4486)
// Active controls (5): short cofactor hypothesis; even cofactor-pair branch; integer parity substitute; p divides n; p above W
// No asymptotic rate, sign, correlation saving or twin margin is certified.
// ============================================================================
// READINGS
// Exact finite algebra and active failed-shortcut controls only. The analytic
// argument and its missing input are in transition-signed-estimate.md.
