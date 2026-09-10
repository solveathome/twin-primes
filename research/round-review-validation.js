#!/usr/bin/env node
'use strict';
// Question: do the finite sampling, gcd and cutoff checks detect the errors
// corrected in round-review-0906.md? Finite algebra only; no asymptotic rate.
const assert = require('node:assert/strict');
const gcd = (a,b) => b ? gcd(b,a%b) : a;
const add = (a,b) => [a[0]+b[0],a[1]+b[1]];
const sub = (a,b) => [a[0]-b[0],a[1]-b[1]];
const norm = a => Math.hypot(...a);
const scale = (a,t) => a.map(v=>v*t);
let seed=92026;
const next=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed;};
const X=1024, lower=32;
const units=[[1,0],[-1,0],[0,1],[0,-1]];
const sequences=[
  Array.from({length:2*X+3},()=>[1,0]),
  Array.from({length:2*X+3},(_,n)=>[n%2?1:-1,0]),
  Array.from({length:2*X+3},()=>units[next()%4]),
  Array.from({length:2*X+3},(_,n)=>n>X?[1,0]:[0,0]),
  Array.from({length:2*X+3},(_,n)=>[n%31<4?1:0,0])
];
let stability=0,sampling=0,neighborhoodControl=false,topRetained=false;
for(const a of sequences) {
  const prefix=[[0,0]];
  for(let n=1;n<a.length;n++) prefix[n]=add(prefix[n-1],a[n]);
  const sum=t=>sub(prefix[Math.floor(2*t)],prefix[Math.floor(t)]);
  const F=t=>scale(sum(t),1/t);
  // Breakpoints of sum_(t<n<=2t) are integers and half-integers.
  // On each open piece, integral |F(t)| dt/t = |sum|*(1/l-1/r).
  function integral(lo,hi) {
    const cuts=[lo,hi];
    for(let k=Math.floor(2*lo)+1;k<2*hi;k++) cuts.push(k/2);
    cuts.sort((u,v)=>u-v);
    let total=0;
    for(let k=1;k<cuts.length;k++) {
      const l=cuts[k-1],r=cuts[k];
      total+=norm(sum((l+r)/2))*(1/l-1/r);
    }
    return total;
  }
  const ns=[];for(let n=lower;n<=X;n*=2) ns.push(n);
  for(const h of [1/4,1/8,1/32,1/128]) {
    for(const n of ns) for(let k=0;k<=16;k++) {
      const t=n*(1+h*k/16);
      // The uppermost stability test may extend above X, still below 2X+2
      // in the sequence argument only for k=0, so omit that extra interval.
      if(t>X) continue;
      assert(norm(sub(F(t),F(n)))<=4*h+3/n+1e-12);
      stability++;
    }
    const interior=ns.filter(n=>(1+h)*n<=X);
    const top=ns.filter(n=>(1+h)*n>X);
    const lhs=ns.reduce((s,n)=>s+norm(F(n)),0);
    const I=integral(lower,X);
    const error=interior.reduce((s,n)=>s+4*h+3/n,0)+2*top.length;
    assert(lhs<=I/Math.log1p(h)+error+1e-10);
    const localI=interior.reduce((s,n)=>s+integral(n,(1+h)*n),0);
    assert(localI<=I+1e-10);
    assert(lhs<=localI/Math.log1p(h)+error+1e-10);
    if(lhs>I*Math.log1p(h)+error) neighborhoodControl=true;
    if(top.length && norm(F(top[0]))>0) topRetained=true;
    sampling++;
  }
}
assert(neighborhoodControl);assert(topRetained);
// Concrete nonzero terms at toy cutoffs; integer parity is not term gcd.
assert.equal(5*11*6,330);assert.equal(41*2*4,328);
assert.equal(gcd(330,328),2);assert.equal(gcd(5*11,41*2),1);
assert.equal(10*33,330);assert.equal(41*8,328);assert.equal(gcd(33,8),1);
const toy={x:512,V:4,Z:1,Dlo:4,Elo:1,D0:102,E0:255};
assert(toy.x/2<330 && 330<=toy.x);
assert.equal(Math.floor(toy.x/(toy.V+1)),toy.D0);
assert.equal(Math.floor((toy.x-2)/(toy.Z+1)),toy.E0);
for(const d of [5,10]) assert(toy.Dlo<d && d<=toy.D0);
assert(toy.Elo<41 && 41<=toy.E0);assert(11>toy.V && 2>toy.Z);
// The fixed-margin bulk can already be empty before gamma reaches 2.
// Exact units eta=1/1000, gamma=1999/1000: threshold t=3/1000,
// while p,q>=2/1000 imply p+3q,3p+q>=8/1000.
assert(1999<2000);assert(8>2000-1999+2);
// Yet p=2 eta,q=0 fails both orientations, so the edge obstruction remains.
assert(2<2000-1999+2);assert(0<2);
assert(37/25<3/2);assert(169/7500>1/48);
// Each of the six independent scalar cutoffs contributes its own twist.
const cutoffPowers=[[1,1],[5,2],[1,0],[1,3],[0,1],[3,1]];
assert.equal(cutoffPowers.length,6);
const s=[1,2,3,4,5,6];
const actual=cutoffPowers.reduce((v,p,i)=>[v[0]+s[i]*p[0],v[1]+s[i]*p[1]],[0,0]);
assert.deepEqual(actual,[s[0]+5*s[1]+s[2]+s[3]+3*s[5],s[0]+2*s[1]+3*s[3]+s[4]+s[5]]);
assert.notDeepEqual(actual,[s[0]+5*s[1]+s[2]+3*s[3],s[0]+2*s[1]+3*s[2]+s[3]]);
// Finite lower truncations of the prime-power tail obey the proved upper bound.
const primes=[];for(let p=2;p<=1000;p++) if(!primes.some(q=>q*q<=p&&p%q===0)) primes.push(p);
let tails=0;
for(const W of [2,4,8,16,32,100,1000,10000]) {
  let tail=0;for(const p of primes) for(let r=p*p;r<=1e7;r*=p) if(r>W) tail+=1/r;
  assert(tail<=6/Math.sqrt(W));tails++;
}
// Six-cut logs and dyadic sampling exponents are arithmetic, not rate tests.
for(const c of [1/2,1/4,1/16]) {
  assert.equal(c/2-c/4,c/4);
  assert.equal((c/2)/2,c/4);
  assert(2-c/4>0); // resulting estimate does not establish o(N)
}
console.log('Round review finite checks PASS');
console.log(`Interval stability checks: ${stability}; sampled integral bounds: ${sampling}; prime-power tails: ${tails}`);
console.log('Active controls: neighborhood division; top endpoint retained; parity versus two term gcds; fixed-margin bulk; six scalar cutoffs; ordered area parameters');
console.log('No asymptotic rate, full-corner bound or twin margin is tested.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/round-review-validation.js
//   invocation:  node research/round-review-validation.js
//   code-sha256: d1c410aae724bdc4ce90972a55b7a83b5b41548069a41d853635ce34ae07f08d
//   out-sha256:  71dd83bbf4f181b12f5df168795f8e3366733855226098c192f21e63dc3212a8
//   body-lines:  4
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.1 s
// ============================================================================
// Round review finite checks PASS
// Interval stability checks: 1720; sampled integral bounds: 20; prime-power tails: 8
// Active controls: neighborhood division; top endpoint retained; parity versus two term gcds; fixed-margin bulk; six scalar cutoffs; ordered area parameters
// No asymptotic rate, full-corner bound or twin margin is tested.
// ============================================================================
// READINGS
//
