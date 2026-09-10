#!/usr/bin/env node
'use strict';
// Question: does the full logarithmic profile have the small-prime sign
// normal form, including every prime power and the prime-input correction?
// Exact identities are integer polynomials in formal prime logarithms.
const assert = require('node:assert/strict');
const N=4096;
const ds=Array.from({length:N+1},()=>[]);
for(let d=1;d<=N;d++)for(let n=d;n<=N;n+=d)ds[n].push(d);
const primes=ds.map((d,n)=>d.length===2?n:0).filter(Boolean);
const mu=Array(N+1).fill(1);
for(const p of primes){
  for(let n=p;n<=N;n+=p)mu[n]*=-1;
  for(let n=p*p;n<=N;n+=p*p)mu[n]=0;
}
const zero=()=>new Map();
const add=(a,b,k=1)=>{
  for(const [m,c] of b){
    const v=(a.get(m)||0)+k*c;
    assert(Number.isSafeInteger(v));
    if(v)a.set(m,v);else a.delete(m);
  }
  return a;
};
const mul=(a,b)=>{
  const r=zero();
  for(const [s,c] of a)for(const [t,d] of b){
    const key=(s+','+t).split(',').map(Number).sort((u,v)=>u-v).join(',');
    add(r,new Map([[key,c*d]]));
  }
  return r;
};
const canonical=a=>[...a].sort((u,v)=>u[0].localeCompare(v[0]));
const same=(a,b)=>JSON.stringify(canonical(a))===JSON.stringify(canonical(b));
const eq=(a,b,label)=>assert.deepEqual(canonical(a),canonical(b),label);
const val=a=>[...a].reduce((s,[m,c])=>s+c*m.split(',').reduce((t,p)=>t*Math.log(+p),1),0);
const logs=Array.from({length:N+1},zero),lambda=Array.from({length:N+1},zero);
for(const p of primes)for(let r=p;r<=N;r*=p)lambda[r].set(String(p),1);
for(let n=1;n<=N;n++)for(const r of ds[n])add(logs[n],lambda[r]);
const configs=[{a:16,b:32,W:32},{a:4,b:8,W:8}];
let identities=0,regularChecks=0,primeChecks=0,powerChecks=0;
let omittedExceptionFailures=0,omittedPrimeFailures=0,squarefulRegular=0;
const families=configs.map(({a,b,W})=>{
  const L=add(add(zero(),logs[b]),logs[a],-1);
  // L*rho(d) is a linear polynomial, even inside the logarithmic ramp.
  const rho=Array.from({length:N+1},(_,d)=>d<=a?add(zero(),L):d>=b?zero():add(add(zero(),logs[b]),logs[d],-1));
  const F=Array.from({length:N+1},(_,n)=>{
    const v=zero();for(const d of ds[n])add(v,rho[d],mu[d]);return v;
  });
  const beta=Array.from({length:N+1},(_,n)=>{
    const v=zero();for(const r of ds[n])if(r>W)add(v,lambda[r]);return v;
  });
  const G=Array.from({length:N+1},zero),E=Array.from({length:N+1},zero);
  const C=Array.from({length:N+1},zero),D=Array.from({length:N+1},zero);
  const regular=Array(N+1).fill(true);
  for(let n=1;n<=N;n++){
    for(const d of ds[n])add(G[n],mul(add(add(zero(),L),rho[d],-1),beta[n/d]),mu[d]);
    const H=zero();let small=n;
    for(const p of primes)if(p>W && n%p===0){
      let m=n;while(m%p===0){add(H,new Map([[String(p),1]]));m/=p;small/=p;}
    }
    eq(F[n],F[small],'large primes do not change F');
    for(const r of ds[n])if(r>W && lambda[r].size){
      const p=+lambda[r].keys().next().value;
      if(p<=W){add(E[n],mul(lambda[r],F[n/r]));regular[n]=false;}
    }
    D[n]=mul(H,F[n]);
    const lambdaHigh=n>W?mul(L,lambda[n]):zero();
    const normal=add(add(add(zero(),lambdaHigh),D[n],-1),E[n],-1);
    eq(G[n],normal,'exact all-input normal form');identities++;
    const noE=add(add(zero(),lambdaHigh),D[n],-1);
    if(!same(G[n],noE))omittedExceptionFailures++;
    if(regular[n]){
      eq(G[n],noE,'regular normal form');regularChecks++;
      if(mu[n]===0 && G[n].size)squarefulRegular++;
    }
    if(ds[n].length===2){
      eq(G[n],zero(),'coefficient vanishes on primes');primeChecks++;
      if(!same(G[n],add(zero(),D[n],-1)))omittedPrimeFailures++;
    }
    if(n>W && regular[n] && lambda[n].size && ds[n].length>2){
      eq(G[n],mul(L,add(add(zero(),lambda[n]),logs[n],-1)),'large prime-power endpoint');powerChecks++;
    }
    if(n>1 && ds[n].length!==2)C[n]=D[n];
  }
  return {G,E,C,D,regular,L};
});
const [l,r]=families;
let shiftedChecks=0,negativeProducts=0,primeDeletionFailures=0;
let exceptionalPairs=0;
for(let n=N/2+1;n<=N;n++){
  const m=n-2;
  if(!l.regular[n] || !r.regular[m]){exceptionalPairs++;continue;}
  const isProper=k=>lambda[k].size && ds[k].length>2;
  if(isProper(n)||isProper(m))continue;
  eq(mul(l.G[n],r.G[m]),mul(l.C[n],r.C[m]),'composite-filtered shifted product');shiftedChecks++;
  const gv=val(l.G[n])*val(r.G[m]);
  const cv=val(l.C[n])*val(r.C[m]);
  assert(Math.abs(gv-cv)<1e-7);
  if(gv<-1e-8)negativeProducts++;
  const nl=Math.max(-val(l.D[n]),0),pl=Math.max(val(l.D[n]),0);
  const nr=Math.max(-val(r.D[m]),0),pr=Math.max(val(r.D[m]),0);
  const unfiltered=nl*pr+pl*nr;
  const correction=(ds[n].length===2?val(l.D[n])*nr:0)+(ds[m].length===2?val(r.D[m])*nl:0);
  assert(Math.abs(Math.max(-gv,0)-(unfiltered-correction))<1e-7);
  if(correction>1e-8)primeDeletionFailures++;
}
assert(omittedExceptionFailures>0 && omittedPrimeFailures>0 && squarefulRegular>0);
assert(powerChecks>0 && negativeProducts>0 && primeDeletionFailures>0);
// Independent finite factor cell: every triple is below a, every quadruple
// above b, so all profile values used here are exactly zero or one.
const cell=[101,103,107,109,113,127,131,137,139,149];
const ca=4000000n,cb=6000000n;
const isPrime=n=>{for(let d=2;d*d<=n;d++)if(n%d===0)return false;return n>1;};
assert(cell.every(isPrime));
const q=10000019;assert(isPrime(q) && BigInt(q)>cb);
let f=0,directG=0,crossingPairs=0;
for(let mask=0;mask<(1<<cell.length);mask++){
  let prod=1n,k=0;
  for(let j=0;j<cell.length;j++)if(mask&(1<<j)){prod*=BigInt(cell[j]);k++;}
  assert(prod<=ca || prod>=cb,'no cell divisor lies in the ramp');
  const rho=prod<=ca?1:0,sign=k%2?-1:1;
  f+=sign*rho;directG+=sign*(1-rho);
  if(k===2 && prod>ca)crossingPairs++;
}
assert.equal(f,-84);assert.equal(directG,84);assert.equal(crossingPairs,0);
// Strict exponent margins for the actual left profile: ten small factors
// in (.069,.071), then one prime in (.29,.31); products can lie in J_x.
assert(3*71<220 && 4*69>240 && 10*71+240<1000);
console.log('Global factor sign finite controls: PASS');
console.log('Exact logarithmic-profile identities: '+identities+'; regular identities: '+regularChecks+'; prime zeros: '+primeChecks+'; proper-power endpoints: '+powerChecks);
console.log('Active missing-exception failures: '+omittedExceptionFailures+'; missing-prime-correction failures: '+omittedPrimeFailures+'; squareful regular coefficients: '+squarefulRegular);
console.log('Exact regular shifted products: '+shiftedChecks+'; floating negative sign witnesses: '+negativeProducts+'; active prime-filter corrections: '+primeDeletionFailures+'; exceptional shifted pairs retained separately: '+exceptionalPairs);
console.log('Ten-small-prime cell: F = '+f+'; G/log(q) = '+directG+'; pairs crossing a = '+crossingPairs);
console.log('Formal polynomial equalities are exact. Sign splits use floating evaluation except the integer factor cell. No asymptotic density, signed saving or twin margin is tested.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/global-factor-signs-validation.js
//   invocation:  node research/global-factor-signs-validation.js
//   code-sha256: 6382a7edcaaeb8e1366f69f9e345213a35c44f4d8cf1ae8b10fa2c27e2a63cd9
//   out-sha256:  7c986b2524af44d40ba59e12fc6c7bddbec66471c37db8c7dc91e75f7c76d74d
//   body-lines:  6
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.2 s
// ============================================================================
// Global factor sign finite controls: PASS
// Exact logarithmic-profile identities: 8192; regular identities: 6983; prime zeros: 1128; proper-power endpoints: 23
// Active missing-exception failures: 846; missing-prime-correction failures: 1113; squareful regular coefficients: 406
// Exact regular shifted products: 1462; floating negative sign witnesses: 84; active prime-filter corrections: 62; exceptional shifted pairs retained separately: 579
// Ten-small-prime cell: F = -84; G/log(q) = 84; pairs crossing a = 0
// Formal polynomial equalities are exact. Sign splits use floating evaluation except the integer factor cell. No asymptotic density, signed saving or twin margin is tested.
// ============================================================================
// READINGS
// Full logarithmic ramps, prime inputs and squareful inputs are checked.
// The factor cell refutes the proposed pair-trigger majorant for F minus;
// it is not evidence of an asymptotic frequency of shifted configurations.
