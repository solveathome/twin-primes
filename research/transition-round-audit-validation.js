#!/usr/bin/env node
'use strict';
// Targeted controls for transition-round-audit.md. Finite algebra only:
// a missing lower cutoff, fiber orientation, clipping, Perron weight,
// and an invalid inference from separate components to their signed sum.
// These fixtures do not establish an asymptotic correlation or its sign.
const assert = require('node:assert/strict');
const N = 4096, ds = Array.from({length: N + 1}, () => []);
for (let d = 1; d <= N; d++) for (let n = d; n <= N; n += d) ds[n].push(d);
const mu = Array(N + 1).fill(1), base = Array(N + 1).fill(0);
for (let p = 2; p <= N; p++) if (ds[p].length === 2) {
  for (let n = p; n <= N; n += p) mu[n] *= -1;
  for (let n = p * p; n <= N; n += p * p) mu[n] = 0;
  for (let r = p; r <= N; r *= p) base[r] = p;
}
const near = (a,b) => assert(Math.abs(a-b) < 1e-9*(1+Math.abs(a)+Math.abs(b)));
const rho = (d,D,z) => d <= D ? 1 : d >= z ? 0 : Math.log(z/d)/Math.log(z/D);
const tau = (d,D,z) => d > D && d < z ? rho(d,D,z) : 0;
const beta = (k,W) => ds[k].reduce((s,r) => s+(r > W && base[r] ? Math.log(base[r]) : 0),0);
const coeff = (n,D,z,W,weight) => ds[n].reduce((s,d) => s+mu[d]*weight(d,D,z)*beta(n/d,W),0);
let wrongCut = 0, mellinChecks = 0;
for (let n = 3; n <= 512; n++) {
  if (Math.abs(coeff(n,10,40,3,rho)-coeff(n,10,40,3,tau)) > 1e-9) wrongCut++;
}
assert(wrongCut > 0);
// Inverse Mellin of y^s/s^2 is max(log y,0); the resulting ramp is rho.
for (const [D,z] of [[10,40],[16,64]]) for (let d = 1; d <= 80; d++) {
  const ramp = (Math.max(Math.log(z/d),0)-Math.max(Math.log(D/d),0))/Math.log(z/D);
  near(ramp,rho(d,D,z));
  near(ramp-(d <= D ? 1 : 0),tau(d,D,z));
  mellinChecks++;
}
assert.equal(rho(2,10,40),1); assert.equal(tau(2,10,40),0);
const gcd = (a,b) => b ? gcd(b,a%b) : a;
let fiberPoints = 0;
const counts = [];
for (const c of [{k:11,v:7,D:256,z:360,E:440,y:570},{k:22,v:14,D:128,z:180,E:200,y:300}]) {
  const {k,v,D,z,E,y} = c, points = [];
  assert(D*E/2 > N/2); // Every compatible fixed-(d,e) fiber has at most one n.
  for (let n = N/2+1; n <= N; n++) if (n%k === 0 && (n-2)%v === 0) {
    const d=n/k,e=(n-2)/v;
    if (D<d && d<z && E<e && e<y) points.push([d,e,n]);
  }
  assert(points.length > 1); // Same k,v supports many different divisor pairs.
  assert(k <= 7*7 && v <= 5*5 && beta(k,7)>0 && beta(v,5)>0);
  assert(points.filter(([d,e]) => mu[d]*mu[e] !== 0).length > 1);
  // The examples remain non-singleton after zero Mobius terms are removed.
  const g=gcd(k,v); assert(2%g === 0);
  for (let j=1;j<points.length;j++) {
    assert.equal(points[j][0]-points[j-1][0],v/g);
    assert.equal(points[j][1]-points[j-1][1],k/g);
  }
  for (const [d,e] of points) {
    let count=0;
    for(let n=N/2+1;n<=N;n++) if(n%d===0 && (n-2)%e===0) count++;
    assert.equal(count,1);
  }
  // Clipping to a narrow legitimate subwindow can retain just one solution.
  assert.equal(points.filter(([d]) => points[0][0]-1<d && d<points[0][0]+1).length,1);
  assert.equal(points.filter(([d]) => points[0][0]<d && d<points[0][0]+1).length,0);
  counts.push([g,points.length]); fiberPoints += points.length;
}
// Scalar countermodel to the coefficient-1 argument, not arithmetic data.
const a=1,b=-1,c=1,d=0;
const pieces=[a*c,b*c,a*d,b*d];
assert.equal(pieces[0],1); assert.equal(pieces.reduce((s,v)=>s+v,0),0);
assert.equal((a+b)*(c+d),0);
// Positive prefixes need not give positive dyadic differences, even for M-products.
const M=(n,z)=>ds[n].reduce((s,d)=>s+(d<=z?mu[d]:0),0);
let witness=null;
for(let a=2;a<=20 && !witness;a++) for(let b=a+1;b<=30 && !witness;b++) {
  const pref=[0];
  for(let n=1;n<=200;n++) pref[n]=pref[n-1]+M(n,a)*M(n,b);
  if(pref.some(v=>v<0)) continue;
  for(let n=2;n<=200;n+=2) if(pref[n]-pref[n/2]<0) {witness={a,b,n,low:pref[n/2],high:pref[n]};break;}
}
assert(witness); // No claim that this fixture meets the corner's prime hypotheses.
console.log('Transition round audit controls: PASS');
console.log(`Missing-cut control: ${wrongCut} changed coefficients; Mellin ramp identities: ${mellinChecks}`);
console.log(`Fiber orientation: ${JSON.stringify(counts)} [gcd, count]; ${fiberPoints} fixed-divisor singleton checks; empty/singleton clipping controls active`);
console.log(`Prefix/dyadic counterexample: ${JSON.stringify(witness)}`);
console.log('Component cancellation control active; no asymptotic estimate, theorem import or twin margin tested.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/transition-round-audit-validation.js
//   invocation:  node research/transition-round-audit-validation.js
//   code-sha256: 62d52333cc526af6ad2854a176d89142b364b790bac532f28565eb5c147cbcf2
//   out-sha256:  8e54178b036359e88a79d1353d16bbf2fa8b2727e0c988ffeb0f3dcf39658bc5
//   body-lines:  5
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.1 s
// ============================================================================
// Transition round audit controls: PASS
// Missing-cut control: 310 changed coefficients; Mellin ramp identities: 160
// Fiber orientation: [[1,11],[2,7]] [gcd, count]; 18 fixed-divisor singleton checks; empty/singleton clipping controls active
// Prefix/dyadic counterexample: {"a":2,"b":13,"n":16,"low":1,"high":0}
// Component cancellation control active; no asymptotic estimate, theorem import or twin margin tested.
// ============================================================================
// READINGS
