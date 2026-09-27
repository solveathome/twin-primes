#!/usr/bin/env node
'use strict';
// Question: do the full-coefficient identities survive exact finite checks?
// Proxy cutoffs only. These tests do not prove a mean-square asymptotic.
const assert = require('node:assert/strict');
const X=1024;
const gcd=(a,b)=>b?gcd(b,a%b):a;
const ds=Array.from({length:X+1},()=>[]);
for(let d=1;d<=X;d++) for(let n=d;n<=X;n+=d) ds[n].push(d);
const primes=[];
for(let n=2;n<=X;n++) if(ds[n].length===2) primes.push(n);
const mu=Array(X+1).fill(1),rad=Array(X+1).fill(1),pp=Array(X+1).fill(0);
mu[0]=0;
for(const p of primes) {
  for(let n=p;n<=X;n+=p) {mu[n]*=-1;rad[n]*=p;}
  for(let n=p*p;n<=X;n+=p*p) mu[n]=0;
  for(let r=p;r<=X;r*=p) pp[r]=p;
}
const lam=n=>pp[n]?Math.log(pp[n]):0;
const beta=(k,W)=>ds[k].reduce((s,r)=>s+(r>W?lam(r):0),0);
const near=(a,b)=>assert(Math.abs(a-b)<1e-9*(1+Math.abs(a)+Math.abs(b)),`${a} != ${b}`);
const mul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const controls=new Set();
let gramChecks=0,complexChecks=0,radicalChecks=0,smoothChecks=0,dilationChecks=0;
for(const [A,B,lo,hi,W] of [[100,480,5,100,7],[240,768,13,80,5],[512,1024,31,140,11]]) {
  const K=Math.floor(B/(lo+1));
  const alpha=Array.from({length:K+1},(_,k)=>[k%5-2,k%7-3]);
  let direct=0,nonSquarefree=false;
  for(let n=A+1;n<=B;n++) {
    let re=0,im=0;
    for(const k of ds[n]) if(k<=K&&n/k>lo&&n/k<=hi) {
      re+=alpha[k][0]*mu[n/k];im+=alpha[k][1]*mu[n/k];
    }
    direct+=re*re+im*im;
    if(!mu[n]&&(re||im)) nonSquarefree=true;
  }
  assert(nonSquarefree);
  const ps=primes.filter(p=>p<=K),P=ps.length;
  const vectors=Array.from({length:K+1},(_,k)=>ps.map(p=>
    ds[k].filter(r=>r>W&&pp[r]===p).length));
  const directGram=Array.from({length:P},()=>Array(P).fill(0));
  const pairGram=Array.from({length:P},()=>Array(P).fill(0));
  for(let n=A+1;n<=B;n++) {
    const v=Array(P).fill(0);
    for(const k of ds[n]) if(k<=K&&n/k>lo&&n/k<=hi)
      for(let i=0;i<P;i++) v[i]+=mu[n/k]*vectors[k][i];
    for(let i=0;i<P;i++) for(let j=0;j<P;j++) directGram[i][j]+=v[i]*v[j];
  }
  let exact=[0,0],noConj=[0,0],noCoprime=[0,0],noClip=[0,0],diag=0;
  for(let k=1;k<=K;k++) for(let l=1;l<=K;l++) {
    const g=gcd(k,l),a=k/g,b=l/g,M=g*a*b;
    const low=Math.max(A/M,lo/a,lo/b),high=Math.min(B/M,hi/a,hi/b);
    let Q=0,Qbad=0,Qunclipped=0;
    for(let t=Math.floor(low)+1;t<=high;t++) {
      Qbad+=mu[t]*mu[t];if(gcd(t,a*b)===1) Q+=mu[t]*mu[t];
    }
    for(let t=Math.floor(A/M)+1;t<=B/M;t++)
      if(gcd(t,a*b)===1) Qunclipped+=mu[t]*mu[t];
    const sign=mu[a]*mu[b],z=mul(alpha[k],[alpha[l][0],-alpha[l][1]]);
    const badz=mul(alpha[k],alpha[l]);
    for(let i=0;i<2;i++) {
      exact[i]+=z[i]*sign*Q;noConj[i]+=badz[i]*sign*Q;
      noCoprime[i]+=z[i]*sign*Qbad;noClip[i]+=z[i]*sign*Qunclipped;
    }
    if(k===l) diag+=z[0]*sign*Q;
    for(let i=0;i<P;i++) if(vectors[k][i]) for(let j=0;j<P;j++)
      pairGram[i][j]+=sign*Q*vectors[k][i]*vectors[l][j];
  }
  assert.deepEqual(exact,[direct,0]);complexChecks++;
  for(let i=0;i<P;i++) for(let j=0;j<P;j++) {
    assert.equal(pairGram[i][j],directGram[i][j]);gramChecks++;
  }
  if(noConj[0]!==direct||noConj[1]) controls.add('conjugation');
  if(noCoprime[0]!==direct) controls.add('coprimality');
  if(noClip[0]!==direct) controls.add('divisor cuts');
  if(diag!==direct) controls.add('off diagonal');
}
for(let m=1;m<=X;m++) for(const [lo,hi] of [[1,9],[5,40],[19,111]]) {
  const lhs=ds[m].reduce((v,s)=>v+(lo<m/s&&m/s<=hi?mu[m/s]:0),0);
  const inner=ds[rad[m]].reduce((v,t)=>v+(lo<rad[m]/t&&rad[m]/t<=hi?mu[t]:0),0);
  assert(lhs===mu[rad[m]]*inner);radicalChecks++;
  if(lhs!==mu[m]*inner) controls.add('radical sign');
}
for(const [W,z1,z2] of [[7,11,70],[11,19,125],[5,5,24]]) {
  const L=Math.log(z2/z1);
  const rho=d=>d<=z1?1:d>=z2?0:Math.log(z2/d)/L;
  const h=d=>1-rho(d);
  const F=Array.from({length:X+1},(_,m)=>ds[m].reduce((s,d)=>s+mu[d]*rho(d),0));
  const C=(n,weight)=>ds[n].reduce((s,d)=>s+mu[d]*weight(d)*beta(n/d,W),0);
  const sharp=d=>+(d>z1);
  for(let n=1;n<=X;n++) {
    near(h(n),n<=z1?0:Math.log(Math.min(n,z2)/z1)/L);
    const rhs=-ds[n].reduce((s,r)=>s+(r>W&&r<n?lam(r)*F[n/r]:0),0);
    near(C(n,h),rhs);smoothChecks++;
    if(n>1&&n<=z1) near(F[n],0);
    if(pp[n]&&n>W&&Math.abs(C(n,h)-(rhs-lam(n)))>1e-8) controls.add('prime singleton');
    if(Math.abs(C(n,h)-C(n,sharp))>1e-8) controls.add('sharp versus smooth');
    if(n>2) {
      const c=C(n,sharp),cp=C(n-2,sharp),t=C(n,h),tp=C(n-2,h);
      near(c*cp-t*tp,(c-t)*cp+t*(cp-tp));
    }
  }
  for(const N of [z1+0.01,(z1+z2)/2,z2-0.01]) {
    const t=Math.log(N/z1);
    const rhoN=d=>d<=z1?1:d>=N?0:Math.log(N/d)/t;
    for(let m=2;m<=N;m++) {
      near(F[m],t/L*ds[m].reduce((s,d)=>s+mu[d]*rhoN(d),0));smoothChecks++;
    }
    if(Math.abs(F[1]-t/L)>1e-8) controls.add('rescaling excludes one');
  }
  // Multiplying by a coprime small prime produces a cutoff difference,
  // not the minus sign used for a multiplicative function with g(p)=-1.
  for(const p of primes.filter(p=>p<=W)) for(let n=1;p*n<=X;n++) if(n%p) {
    for(const w of [h,sharp]) {
      const rhs=C(n,d=>w(d)-w(p*d));
      near(C(p*n,w),rhs);dilationChecks++;
      if(Math.abs(C(p*n,w)+C(n,w))>1e-8) controls.add('multiplicative shortcut');
    }
  }
}
// Marginally small exceptional sets combine by a union bound, not merely
// by each good set being nonempty or unbounded.
const J=128,evens=new Set(),odds=new Set();
for(let j=1;j<=J;j++) (j%2?odds:evens).add(j);
assert(![...evens].some(j=>odds.has(j)));controls.add('common scale');
const errs=Array.from({length:3},(_,i)=>Array.from({length:J},(_,j)=>(j+3*i)%17===0?2:0));
const thresholds=[1,1,1];
const bad=errs.reduce((s,v,i)=>s+v.filter(x=>x>thresholds[i]).length,0);
const markov=errs.reduce((s,v,i)=>s+v.reduce((a,b)=>a+b,0)/thresholds[i],0);
assert(bad<=markov&&markov<J);
// Correct the elementary inequality in anchored-note Lemma 1.
for(const p of primes.filter(p=>p>2)) {
  assert(1-2/p<(1-1/p)**2);
  near(1-2/p,(1-1/p)**2*(1-1/(p-1)**2));
}
const required=['conjugation','coprimality','divisor cuts','off diagonal','radical sign',
  'prime singleton','sharp versus smooth','rescaling excludes one','multiplicative shortcut','common scale'];
for(const key of required) assert(controls.has(key),`inactive control: ${key}`);
console.log('Cross-campaign finite identities PASS');
console.log(`Complex energies: ${complexChecks}; exact prime-log Gram entries: ${gramChecks}; radical identities: ${radicalChecks}`);
console.log(`Smoothed identities: ${smoothChecks}; coprime small-prime dilation identities: ${dilationChecks}`);
console.log(`Active controls (${required.length}): ${required.join('; ')}`);
console.log('No asymptotic mean-square estimate, transition saving or twin lower bound is numerically certified.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/cross-campaign-validation.js
//   invocation:  node research/cross-campaign-validation.js
//   code-sha256: b04db99b6074cc9f451fbcccdf94087af835379a1a066d38c29f85888af4cc41
//   out-sha256:  8e59e528cb1a1a74969a1548cc25077336efd226793564086674eddb7c062441
//   body-lines:  5
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.1 s
// ============================================================================
// Cross-campaign finite identities PASS
// Complex energies: 3; exact prime-log Gram entries: 861; radical identities: 3072
// Smoothed identities: 3440; coprime small-prime dilation identities: 4562
// Active controls (10): conjugation; coprimality; divisor cuts; off diagonal; radical sign; prime singleton; sharp versus smooth; rescaling excludes one; multiplicative shortcut; common scale
// No asymptotic mean-square estimate, transition saving or twin lower bound is numerically certified.
// ============================================================================
// READINGS
// Finite identities and active counterexamples only. Imported analytic results
// and the unbounded-scale arithmetic target require proofs outside this script.
