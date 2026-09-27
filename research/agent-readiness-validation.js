#!/usr/bin/env node
'use strict';
// Question: do the finite algebraic ingredients of the readiness corrections
// survive independent constructions and active deletion controls?
// Scope: toy finite windows and exact integer coefficients, plus a numerical
// finite Fourier identity. This does not test asymptotic rates or twin margins.
const assert = require('node:assert/strict');
const gcd = (a,b) => b ? gcd(b,a%b) : a;
const divisors = n => Array.from({length:n},(_,i)=>i+1).filter(d=>n%d===0);
function factors(n) {
  const out=[];
  for(let p=2;p*p<=n;p++) if(n%p===0) {
    let a=0; while(n%p===0) { n/=p; a++; } out.push([p,a]);
  }
  if(n>1) out.push([n,1]); return out;
}
function mu(n) { const f=factors(n); return f.some(([,a])=>a>1)?0:(f.length%2?-1:1); }
function bandCount(n,lo,hi) { return factors(n).filter(([p])=>lo<p&&p<=hi).reduce((s,[p])=>s+p,0); }
function windowCount(n,lo,hi,d1,d0) {
  return factors(n).filter(([p])=>lo<p&&p<=hi&&d1<n/p&&n/p<=d0).reduce((s,[p])=>s+p,0);
}
let additive=0, changed=0;
for(let a=1;a<=80;a++) for(let b=1;b<=80;b++) if(gcd(a,b)===1) {
  assert.equal(bandCount(a*b,5,23),bandCount(a,5,23)+bandCount(b,5,23));
  assert(mu(a*b)===mu(a)*mu(b)); additive++; // mathematical zero ignores signed IEEE zero
  if(mu(a*b)*bandCount(a*b,5,23)!==mu(a)*bandCount(a,5,23)*mu(b)*bandCount(b,5,23)) changed++;
}
assert(changed>0); // The weighted observable itself is not multiplicative.
assert.equal(windowCount(99,10,30,8,100),11);
assert.equal(windowCount(198,10,30,8,100),11); // fixed dilation retains a term
assert.equal(windowCount(660,10,30,8,100),11);
assert.equal(windowCount(1320,10,30,8,100),0); // and another term leaves
assert.equal(3*10-5*6,0); assert.notEqual(6,10); // unequal proportional R=0
let gcdCases=0;
for(let l1=1;l1<=12;l1++) for(let l2=1;l2<=12;l2++) if(l1!==l2&&gcd(l1,l2)===1)
  for(let j=1;j<=12;j++) for(let h=1;h<=24;h++) for(const theta of [1,2]) {
    const actual=gcd(Math.abs(theta*h*(l2-l1)),j*l1*l2);
    const bound=2*gcd(Math.abs(h*(l2-l1)),j)*gcd(h,l1*l2);
    assert(actual<=bound); gcdCases++;
  }
// Counterexample to a Holder floor asserted without coefficient assumptions.
const holderProduct=1*1, claimedFloor=Math.sqrt(4)*1;
assert(holderProduct<claimedFloor);
// Independent coefficient constructions. V=3, d in (10,80] are toy windows.
const add=(map,p,v)=>map.set(p,(map.get(p)||0)+v);
const normalize=map=>[...map].filter(([,v])=>v).sort((a,b)=>a[0]-b[0]);
let omitted=0, multi=0;
for(let n=1;n<=512;n++) {
  const direct=new Map(),expanded=new Map(),primeCofactor=new Map();
  for(const d of divisors(n)) if(10<d&&d<=80) {
    const k=n/d;
    for(const [p,a] of factors(k)) for(let e=1;e<=a;e++) if(p**e>3) add(direct,p,mu(d));
  }
  for(const [p,a] of factors(n)) for(let e=1;e<=a;e++) {
    const r=p**e;if(r<=3) continue;
    for(const s of divisors(n/r)) {
      const d=n/(r*s); if(!(10<d&&d<=80)) continue;
      add(expanded,p,mu(d)); if(s===1&&e===1) add(primeCofactor,p,mu(d));
      if(e>=2) multi++;
    }
  }
  assert.deepEqual(normalize(direct),normalize(expanded));
  if(JSON.stringify(normalize(direct))!==JSON.stringify(normalize(primeCofactor))) omitted++;
}
assert(omitted>0);assert(multi>0);
// Finite completion of a genuinely incomplete interval, length less than c.
const c=77,r=12,I=[2,3,4,5,6,7,8];
const ex=t=>[Math.cos(2*Math.PI*t),Math.sin(2*Math.PI*t)];
const plus=(a,b)=>[a[0]+b[0],a[1]+b[1]];
const times=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
function inv(a) { for(let b=1;b<c;b++) if(a*b%c===1) return b; throw Error('nonunit'); }
const vals=Array.from({length:c},(_,a)=>gcd(a,c)===1?ex(r*inv(a)/c):[0,0]);
const direct=I.reduce((s,m)=>plus(s,vals[m]),[0,0]);let completed=[0,0];
for(let t=0;t<c;t++) {
  let ft=[0,0],interval=[0,0];
  for(let a=0;a<c;a++) ft=plus(ft,times(vals[a],ex(-t*a/c)));
  for(const m of I) interval=plus(interval,ex(t*m/c));
  completed=plus(completed,times(ft,interval));
}
completed=completed.map(x=>x/c);
assert(Math.hypot(direct[0]-completed[0],direct[1]-completed[1])<1e-10);
console.log('Finite readiness checks PASS');
console.log(`Coprime additive/multiplicative cases: ${additive}; joint-Cauchy gcd cases: ${gcdCases}`);
console.log('Independent full coefficient identities: 512; incomplete Fourier completion: PASS');
console.log('Active controls: weighted observable is not multiplicative; window survives/leaves dilation; unequal R=0 pair; deleting cofactor branches; proper prime powers');
console.log('No asymptotic rate, dyadic bound, full-corner saving or twin margin is tested.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/agent-readiness-validation.js
//   invocation:  node research/agent-readiness-validation.js
//   code-sha256: b9eb693a7ce80e3bd8a94e56d234666397cc6c942b65ec7dd930bac3f0379dd1
//   out-sha256:  2e3f83ab420acc38998bb0dcd1c19b0856dde9407a8f75776ef07ac9a4f86a14
//   body-lines:  5
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.1 s
// ============================================================================
// Finite readiness checks PASS
// Coprime additive/multiplicative cases: 3931; joint-Cauchy gcd cases: 51840
// Independent full coefficient identities: 512; incomplete Fourier completion: PASS
// Active controls: weighted observable is not multiplicative; window survives/leaves dilation; unequal R=0 pair; deleting cofactor branches; proper prime powers
// No asymptotic rate, dyadic bound, full-corner saving or twin margin is tested.
// ============================================================================
// READINGS
// ============================================================================
// The independent finite constructions agree and the deletion controls fire.
// These checks validate finite algebra and one numerical Fourier identity only.
// The analytic proofs and imported theorem hypotheses remain in the owning notes.
