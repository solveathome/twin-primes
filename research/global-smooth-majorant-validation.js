#!/usr/bin/env node
'use strict';
// Question: do the smooth profile, full finite differences, three-prime
// envelope and corrected shift-2 congruence bookkeeping survive controls?
// The profile fixture uses integer additive prime-log proxies, so every
// identity and inequality below is checked with integer arithmetic.
const assert=require('node:assert/strict');
const N=1024;
const ds=Array.from({length:N+1},()=>[]);
for(let d=1;d<=N;d++)for(let n=d;n<=N;n+=d)ds[n].push(d);
const primes=ds.map((v,n)=>v.length===2?n:0).filter(Boolean);
const factors=Array.from({length:N+1},(_,n)=>primes.filter(p=>n%p===0));
const mu=Array(N+1).fill(1);
for(const p of primes){
  for(let n=p;n<=N;n+=p)mu[n]*=-1;
  for(let n=p*p;n<=N;n+=p*p)mu[n]=0;
}
const logp=new Map(primes.map(p=>[p,BigInt(Math.ceil(16*Math.log(p)))]));
const log=Array(N+1).fill(0n);
for(let n=2;n<=N;n++){
  let m=n;
  for(const p of factors[n])while(m%p===0){log[n]+=logp.get(p);m/=p;}
}
const coeff=[1n,0n,0n,0n,-35n,84n,-70n,20n];
const deriv=a=>a.slice(1).map((c,j)=>c*BigInt(j+1));
const at=(a,t)=>a.reduceRight((v,c)=>v*t+c,0n);
const abs=a=>a<0n?-a:a;
const derivatives=[coeff];
for(let j=1;j<=3;j++)derivatives.push(deriv(derivatives[j-1]));
assert.equal(at(coeff,0n),1n);assert.equal(at(coeff,1n),0n);
for(let j=1;j<=3;j++){
  assert.equal(at(derivatives[j],0n),0n);assert.equal(at(derivatives[j],1n),0n);
}
assert.deepEqual(deriv(coeff),[0n,0n,0n,-140n,420n,-420n,140n]);
const M=[1n,...derivatives.slice(1).map(a=>a.reduce((s,c)=>s+abs(c),0n))];
let diffChecks=0,envelopeChecks=0,squarefulChecks=0;
for(const [a,b] of [[32n,64n],[16n,40n]]){
  const L=b-a,D=L**7n;
  const rho=t=>{
    if(t<=a)return D;if(t>=b)return 0n;
    const u=t-a;
    return coeff.reduce((s,c,j)=>s+c*u**BigInt(j)*L**BigInt(7-j),0n);
  };
  for(let n=1;n<=N;n++){
    const F=ds[n].reduce((s,d)=>s+BigInt(mu[d])*rho(log[d]),0n);
    const fs=factors[n],k=Math.min(3,fs.length),chosen=fs.slice(0,k);
    const chosenProduct=chosen.reduce((s,p)=>s*p,1);
    const radical=fs.reduce((s,p)=>s*p,1);
    let paired=0n;
    for(const d of ds[radical/chosenProduct]){
      let delta=0n;
      for(let mask=0;mask<2**k;mask++){
        let t=log[d],count=0;
        for(let j=0;j<k;j++)if(mask&(1<<j)){t+=logp.get(chosen[j]);count++;}
        delta+=(count%2?-1n:1n)*rho(t);
      }
      paired+=BigInt(mu[d])*delta;
    }
    assert.equal(F,paired);diffChecks++;
    const selectedLogs=chosen.reduce((s,p)=>s*logp.get(p),1n);
    const bound=(2n**BigInt(fs.length-k))*M[k]*selectedLogs*D;
    assert(abs(F)*L**BigInt(k)<=bound);envelopeChecks++;
    if(mu[n]===0 && F!==0n)squarefulChecks++;
  }
}
const T=BigInt(Math.ceil(16*Math.log(N)));
const den=T**3n;
const wnum=Array.from({length:N+1},(_,n)=>{
  const chosen=factors[n].slice(0,3);
  return 2n**BigInt(factors[n].length)*chosen.reduce((s,p)=>s*logp.get(p),1n)*T**BigInt(3-chosen.length);
});
let growthChecks=0,powerChecks=0;
for(let a=1;a<=N;a++)for(let b=1;a*b<=N;b++){
  assert(wnum[a*b]<=2n**BigInt(factors[a].length)*wnum[b]);growthChecks++;
}
for(const p of primes)for(let q=p*p;q<=N;q*=p){
  assert.equal(wnum[q],wnum[p]);powerChecks++;
}
assert(wnum[210]*den>wnum[30]*wnum[7],'multiplicativity is an invalid shortcut');
// Exact grouping of a finite squarefree Euler sum by the first three primes.
const universe=[2,3,5,7,11,13],P=universe.reduce((s,p)=>s*BigInt(p),1n);
let all=0n,grouped=0n;
for(let mask=0;mask<2**universe.length;mask++){
  const ps=universe.filter((_,j)=>mask&(1<<j));
  const n=ps.reduce((s,p)=>s*BigInt(p),1n);
  const k=Math.min(3,ps.length);
  const w=2n**BigInt(ps.length)*ps.slice(0,k).reduce((s,p)=>s*logp.get(p),1n)*T**BigInt(3-k);
  all+=P/n*w;
  if(ps.length<3)grouped+=P/n*w;
}
for(let i=0;i<universe.length;i++)for(let j=i+1;j<universe.length;j++)for(let k=j+1;k<universe.length;k++){
  const p=universe[i],q=universe[j],r=universe[k],tail=universe.slice(k+1);
  const tailDen=tail.reduce((s,v)=>s*BigInt(v),1n);
  const tailNum=tail.reduce((s,v)=>s*BigInt(v+2),1n);
  grouped+=8n*logp.get(p)*logp.get(q)*logp.get(r)*(P/(BigInt(p*q*r)*tailDen))*tailNum;
}
assert.equal(all,grouped);
const gcd=(a,b)=>b?gcd(b,a%b):a;
const lcm=(a,b)=>a/gcd(a,b)*b;
const rad=n=>factors[n].reduce((s,p)=>s*p,1);
const exact=(a,n)=>n%a===0 && factors[a].every(p=>(n/a)%p!==0);
let rootChecks=0,correctedDifferences=0,incompatible=0;
for(let a=1;a<=16;a++)for(let b=1;b<=16;b++){
  const modulus=lcm(a*rad(a),b*rad(b));let old=0,current=0;
  for(let n=0;n<modulus;n++)if(exact(a,n)&&exact(b,n-2)){
    old++;
    if(factors[b].every(p=>a%p===0 || n%p!==0) &&
       factors[a].every(p=>b%p===0 || (n-2)%p!==0))current++;
  }
  assert(current*a*b<=2*modulus);
  if(gcd(a,b)>2){assert.equal(current,0);incompatible++;}
  if(old!==current)correctedDifferences++;
  rootChecks++;
}
assert(squarefulChecks>0 && powerChecks>0 && correctedDifferences>0 && incompatible>0);
console.log('Global smooth majorant finite controls: PASS');
console.log('Exact cutoff finite differences: '+diffChecks+'; derivative-envelope checks: '+envelopeChecks+'; active squareful cases: '+squarefulChecks);
console.log('Uniform-growth checks: '+growthChecks+'; prime-power invariance checks: '+powerChecks+'; nonmultiplicative witness: 210 = 30 * 7');
console.log('Finite first-three-prime Euler grouping: exact; corrected root-density checks: '+rootChecks+'; active correction differences: '+correctedDifferences+'; incompatible gcd cases: '+incompatible);
console.log('Profile and polynomial checks use integer additive-log proxies. No real-log asymptotic, Henriot theorem, O(x) constant or signed twin margin is numerically tested.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/global-smooth-majorant-validation.js
//   invocation:  node research/global-smooth-majorant-validation.js
//   code-sha256: 9c7e092687f90ffb497fc8101b2877e7b289020ee0f390ff7eb34e6bb83b09ad
//   out-sha256:  bfbc49b8c6bdb3d8d47d9b16294440fe1fa88fcdf905c1a164fa3d76110c1009
//   body-lines:  5
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.1 s
// ============================================================================
// Global smooth majorant finite controls: PASS
// Exact cutoff finite differences: 2048; derivative-envelope checks: 2048; active squareful cases: 566
// Uniform-growth checks: 7262; prime-power invariance checks: 26; nonmultiplicative witness: 210 = 30 * 7
// Finite first-three-prime Euler grouping: exact; corrected root-density checks: 256; active correction differences: 110; incompatible gcd cases: 54
// Profile and polynomial checks use integer additive-log proxies. No real-log asymptotic, Henriot theorem, O(x) constant or signed twin margin is numerically tested.
// ============================================================================
// READINGS
// Exact identities exercise the finite-difference and root-density interfaces.
// The weight meets the growth condition but is not multiplicative.
// The asymptotic harmonic bound and the imported upper bound belong to the note.
