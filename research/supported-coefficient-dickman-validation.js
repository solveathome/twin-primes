#!/usr/bin/env node
'use strict';
// Finite rational certificates for supported-coefficient-dickman.md.
// These controls do not prove Mertens limits or prime distribution theorems.
const assert = require('node:assert/strict');
const gcd = (a,b) => b ? gcd(b,a%b) : a<0n ? -a : a;
function q(n,d=1n) {
  n=BigInt(n); d=BigInt(d); assert(d!==0n);
  if(d<0n) {n=-n;d=-d;}
  const g=gcd(n,d); return [n/g,d/g];
}
const add=(a,b)=>q(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const neg=a=>[-a[0],a[1]];
const sub=(a,b)=>add(a,neg(b));
const mul=(a,b)=>q(a[0]*b[0],a[1]*b[1]);
const div=(a,b)=>q(a[0]*b[1],a[1]*b[0]);
const lt=(a,b)=>a[0]*b[1]<b[0]*a[1];
const sum=xs=>xs.reduce(add,q(0));
function logInterval(a,b,terms=12) {
  // log(a/b)=2 sum t^(2j+1)/(2j+1), t=(a-b)/(a+b).
  const t=q(a-b,a+b), t2=mul(t,t);
  assert(!lt(t,q(0)) && lt(t,q(1)));
  let power=t, partial=q(0);
  for(let j=0;j<terms;j++) {
    partial=add(partial,mul(q(2,2*j+1),power));
    power=mul(power,t2);
  }
  const tail=div(mul(q(2,2*terms+1),power),sub(q(1),t2));
  return [partial,add(partial,tail)];
}
const log2=logInterval(2,1),log3=logInterval(3,1);
assert(lt(q(69,100),log2[0]) && lt(log2[1],q(1)));
assert(lt(log3[1],q(3,2)));
let factorial=1n;
for(let n=2n;n<=22n;n++) factorial*=n;
const error=q(24n,factorial);
assert(lt(error,q(1,1000)));
assert(lt(add(neg(log2[0]),error),q(-2,3)));
// D(25/12)>0 already follows from the k=0,1 terms; k=2 is positive.
assert(lt(logInterval(25,12)[1],q(1)));
const u=q(40,3),v=q(40,9);
assert(lt(mul(q(10),log3[1]),add(u,v)));
assert.deepEqual(mul(u,q(-2,3)),q(-80,9));
console.log('VERIFIED: logarithm, factorial and -80/9 budget certificates.');

// Independent finite integer identity: keep all allowed prime powers in m,
// but compute mu(d) by trial division rather than the subset expansion.
const primes=[3,5,7,11];
function factor(n) {
  const out=[];
  for(let p=2;p*p<=n;p++) {
    let e=0; while(n%p===0) {n/=p;e++;}
    if(e)out.push([p,e]);
  }
  if(n>1)out.push([n,1]);
  return out;
}
function mu(n) {
  const fs=factor(n);
  return fs.some(([,e])=>e>1) ? 0 : (-1)**fs.length;
}
const rho=d=>d<=10?q(1):d>=20?q(0):q(1,2);
function subsetF(m) {
  const ps=factor(m).map(([p])=>p);
  let answer=q(0);
  for(let bits=0;bits<2**ps.length;bits++) {
    let d=1,sign=1;
    ps.forEach((p,i)=>{if(bits&(1<<i)) {d*=p;sign=-sign;}});
    answer=add(answer,mul(q(sign),rho(d)));
  }
  return answer;
}
let repeatedPrimeControl=false;
for(const N of [20,40,100,500]) {
  const smooth=Array.from({length:N},(_,i)=>i+1)
    .filter(m=>factor(m).every(([p])=>primes.includes(p)));
  const direct=sum(smooth.map(m=>div(subsetF(m),q(m))));
  let convolution=q(0);
  for(const d of smooth) {
    const inner=sum(smooth.filter(k=>k*d<=N).map(k=>q(1,k)));
    convolution=add(convolution,mul(mul(q(mu(d),d),rho(d)),inner));
  }
  assert.deepEqual(direct,convolution);
  const excluded=sum(smooth.filter(m=>m>1).map(m=>div(subsetF(m),q(m))));
  assert.deepEqual(sub(direct,excluded),q(1));
  const squarefree=sum(smooth.filter(m=>mu(m)!==0)
    .map(m=>div(subsetF(m),q(m))));
  if(!assertEquivalent(direct,squarefree)) repeatedPrimeControl=true;
}
function assertEquivalent(a,b) {return a[0]*b[1]===b[0]*a[1];}
assert(repeatedPrimeControl); // deleting repeats is not an exact finite identity
console.log('VERIFIED: finite Mobius convolution at 4 cutoffs, repeats and m=1 controls.');

// Formal local convolution exponentials, exact through degree 12.
// Discrete atoms test algebra only; their signs are not a Dickman-density model.
const degree=12;
const zeros=()=>Array.from({length:degree+1},()=>q(0));
function convolution(a,b) {
  const c=zeros();
  for(let i=0;i<=degree;i++)for(let j=0;i+j<=degree;j++)
    c[i+j]=add(c[i+j],mul(a[i],b[j]));
  return c;
}
function exponential(nu) {
  assert.deepEqual(nu[0],q(0));
  let term=zeros(),out=zeros();term[0]=q(1);out[0]=q(1);
  for(let k=1;k<=degree;k++) {
    term=convolution(term,nu).map(a=>div(a,q(k)));
    out=out.map((a,i)=>add(a,term[i]));
  }
  return out;
}
const nu=zeros(),small=zeros();
for(let j=1;j<=degree;j++) {
  nu[j]=q(1,j);
  if(j<=3)small[j]=nu[j];
}
const negative=exponential(nu.map(neg)),positive=exponential(small);
const cancelled=exponential(nu.map((a,i)=>sub(small[i],a)));
assert.deepEqual(convolution(negative,positive),cancelled);
const profile=j=>j<=2?q(1):j>=4?q(0):q(1,2);
const tapered=negative.map((a,j)=>mul(a,profile(j)));
const correction=negative.map((a,j)=>mul(a,sub(profile(j),q(1))));
assert.deepEqual(convolution(tapered,positive),
  cancelled.map((a,j)=>add(a,convolution(correction,positive)[j])));
console.log('VERIFIED: convolution-exponential cancellation and profile correction.');

// Two distinct lower consumers: complete subtraction and rough term only.
// The grid checks the algebra with a rational ell enclosure, not actual masses.
const ell=mul(q(10),log3[0]);
for(const hp of [q(0),q(1,7),q(3),q(24)]) {
  for(const h of [q(-3,4),q(-7,10)]) {
    const hm=sub(hp,h);
    const direct=sub(mul(sub(ell,v),hp),mul(u,hm));
    const rearranged=sub(mul(u,h),mul(sub(add(u,v),ell),hp));
    assert.deepEqual(direct,rearranged);
    assert(lt(direct,q(-80,9)));
    const roughLower=sub(mul(ell,hp),mul(u,hm));
    const eta=q(1,100);
    const jointRequired=add(sub(q(-1),roughLower),eta);
    assert.deepEqual(add(add(q(1),roughLower),jointRequired),eta);
  }
}
console.log('VERIFIED: signed prime subtraction and sufficient joint-margin algebra.');
console.log('Asymptotic limits and theorem applicability are derived in the owning note.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/supported-coefficient-dickman-validation.js
//   invocation:  node research/supported-coefficient-dickman-validation.js
//   code-sha256: 03ba32cb82b79c629b74472b4ff644d9a45e6f8c5e4045b1df7a24a8679b3c0b
//   out-sha256:  bf5a216a4521421849bb7c5581372c66a9cc7f5d2367b384120ef0ece5910a67
//   body-lines:  5
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.1 s
// ============================================================================
// VERIFIED: logarithm, factorial and -80/9 budget certificates.
// VERIFIED: finite Mobius convolution at 4 cutoffs, repeats and m=1 controls.
// VERIFIED: convolution-exponential cancellation and profile correction.
// VERIFIED: signed prime subtraction and sufficient joint-margin algebra.
// Asymptotic limits and theorem applicability are derived in the owning note.
// ============================================================================
// READINGS
