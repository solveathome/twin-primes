#!/usr/bin/env node
'use strict';
// Exact finite controls for joint-correction-source-audit.md.
// Logarithms are formal prime-log vectors; the profile is doubled to
// give integer coefficients. No floating sign or asymptotic claim is tested.
const assert=require('node:assert/strict');
const N=600;
const spf=Array(N+1).fill(0);
for(let p=2;p<=N;p++) if(!spf[p]) {
  for(let n=p;n<=N;n+=p) if(!spf[n]) spf[n]=p;
}
function factors(n) {
  const out=[];
  while(n>1) {
    const p=spf[n]; let e=0;
    do {n/=p;e++;} while(n>1&&spf[n]===p);
    out.push([p,e]);
  }
  return out;
}
const fs=Array.from({length:N+1},(_,n)=>n?factors(n):[]);
const ds=Array.from({length:N+1},()=>[]);
for(let d=1;d<=N;d++)for(let n=d;n<=N;n+=d)ds[n].push(d);
const mu=n=>fs[n].some(([,e])=>e>1)?0:(-1)**fs[n].length;
const add=(a,b,scale=1n)=>{
  const out=new Map(a);
  for(const [p,c] of b) {
    const next=(out.get(p)||0n)+scale*c;
    if(next)out.set(p,next);else out.delete(p);
  }
  return out;
};
const scaled=(a,c)=>add(new Map(),a,BigInt(c));
const logs=n=>new Map(fs[n].map(([p,e])=>[p,BigInt(e)]));
const lambda=n=>fs[n].length===1?new Map([[fs[n][0][0],1n]]):new Map();
const canonical=a=>[...a].sort(([p],[q])=>String(p).localeCompare(String(q)));
const same=(a,b)=>assert.deepEqual(canonical(a),canonical(b));
function product(a,b) {
  let out=new Map();
  for(const [p,c] of a)for(const [q,d] of b) {
    const key=[p,q].sort((x,y)=>x-y).join('*');
    out=add(out,new Map([[key,c*d]]));
  }
  return out;
}
function makeSide(a,W) {
  const rho2=d=>d<=a?2:d>=W?0:1;
  const A=Array.from({length:N+1},(_,d)=>d?BigInt(mu(d)*rho2(d)):0n);
  const B=Array.from({length:N+1},()=>new Map());
  for(let e=1;e<=N;e++) {
    B[e]=scaled(logs(e),-A[e]);
    for(const d of ds[e]) {
      const q=e/d;
      if(q<=W)B[e]=add(B[e],lambda(q),-A[d]);
    }
    if(e>W*W)assert.equal(B[e].size,0);
    if(e>W)assert.equal(A[e],0n);
  }
  const P=[],G=[],D=[],E=[];
  let checked=0,exceptionWitness=false,primeWitness=false;
  for(let n=W+1;n<=N;n++) {
    // Short alpha representation, independent of G's long convolution.
    let p=new Map(),g=new Map(),f2=0n,e=new Map();
    for(const d of ds[n]) {
      f2+=A[d];
      p=add(p,logs(n),A[d]);p=add(p,B[d]);
      let beta=new Map();
      for(const q of ds[n/d])if(q>W)beta=add(beta,lambda(q));
      g=add(g,beta,BigInt(mu(d)*(2-rho2(d))));
    }
    const roughLog=new Map(fs[n].filter(([q])=>q>W)
      .map(([q,k])=>[q,BigInt(k)]));
    const d=scaled(roughLog,f2);
    for(const [q,k] of fs[n]) if(q<=W) {
      for(let j=2;j<=k;j++)if(q**j>W) {
        const reduced=n/q**j;
        const fReduced=ds[reduced].reduce((total,t)=>total+A[t],0n);
        e=add(e,new Map([[q,fReduced]]));
      }
    }
    same(add(p,g),scaled(lambda(n),2));
    same(p,add(d,e));
    if(e.size)exceptionWitness=true;
    if(fs[n].length===1&&fs[n][0][1]===1) {
      same(p,scaled(logs(n),2));assert.equal(g.size,0);primeWitness=true;
    }
    P[n]=p;G[n]=g;D[n]=d;E[n]=e;checked++;
  }
  assert(exceptionWitness&&primeWitness);
  return {P,G,D,E,checked};
}
const left=makeSide(11,17),right=makeSide(3,7);
console.log('VERIFIED: '+(left.checked+right.checked)+
  ' exact short-approximant identities, including prime and exceptional-power controls.');
let productChecks=0,intersectionWitness=false;
for(let n=18;n<=N;n++) {
  const lp=lambda(n),rp=lambda(n-2);
  const ss=scaled(product(lp,rp),4);
  const expected=add(add(add(ss,product(lp,right.P[n-2]),-2n),
    product(left.P[n],rp),-2n),product(left.P[n],right.P[n-2]));
  same(product(left.G[n],right.G[n-2]),expected);
  if(ss.size)intersectionWitness=true;
  productChecks++;
}
assert(intersectionWitness); // deleting the prime-prime term changes the identity
console.log('VERIFIED: '+productChecks+' four-term product identities; prime intersection retained.');

const gcd=(a,b)=>b?gcd(b,a%b):a;
let crtChecks=0;
for(let d=1;d<=40;d++)for(let e=1;e<=20;e++) {
  let count=0;
  for(let n=301;n<=600;n++)if(n%d===0&&(n-2)%e===0)count++;
  const g=gcd(d,e),l=d/g*e;
  if(2%g)assert.equal(count,0);
  else assert(Math.abs(count*l-300)<=l);
  crtChecks++;
}
assert(2*24<50 && 2*5<50 && 2*24+2*5===58);
assert(100-24===76); // Mounier theta>1-1/u at u=100/24
console.log('VERIFIED: '+crtChecks+' CRT compatibility/count controls and rational support budgets.');

// Formal exponent vectors only; these do not assert simultaneous prime occurrence.
function cell(xs) {
  assert.equal(xs.reduce((a,b)=>a+b,0),100);
  const small=xs.filter(t=>t<24),large=xs.filter(t=>t>24);
  assert.equal(small.length+large.length,xs.length);
  let f=0;
  for(let bits=0;bits<2**small.length;bits++) {
    let total=0,k=0;
    small.forEach((t,i)=>{if(bits&(1<<i)){total+=t;k++;}});
    assert(total<=22||total>=24); // all values lie on plateaus
    f+=(-1)**k*(total<=22?1:0);
  }
  const roughMass=large.reduce((a,b)=>a+b,0);
  return {small,f,full:f*roughMass,selected:large.length===1?f*roughMass:0};
}
const first=cell([12,13,75]),second=cell([12,13,36,39]);
assert.deepEqual(first.small,second.small);
assert.equal(first.f,-1);assert.equal(first.full,-75);
assert.equal(first.full,second.full);
assert.equal(first.selected,-75);assert.equal(second.selected,0);
console.log('VERIFIED: identical unrestricted factor weights, different selected prime-cofactor weights.');
console.log('No asymptotic distribution or improved signed margin is asserted by these finite checks.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/joint-correction-validation.js
//   invocation:  node research/joint-correction-validation.js
//   code-sha256: 93698f863cd878d1d87b5da24e72233ed81af7b08cf8da24822ebe8eeabe6b41
//   out-sha256:  284eeaf0147b73d3a5e1fab90fb69f1afec6b934080da8a3fb7a86de5bae402a
//   body-lines:  5
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.1 s
// ============================================================================
// VERIFIED: 1176 exact short-approximant identities, including prime and exceptional-power controls.
// VERIFIED: 583 four-term product identities; prime intersection retained.
// VERIFIED: 800 CRT compatibility/count controls and rational support budgets.
// VERIFIED: identical unrestricted factor weights, different selected prime-cofactor weights.
// No asymptotic distribution or improved signed margin is asserted by these finite checks.
// ============================================================================
// READINGS
