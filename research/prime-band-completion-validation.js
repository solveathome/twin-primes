// PRIME BAND COMPLETION — retained prime averages, exact transforms and scope.
// Companion: prime-band-completion.md. Finite checks do not prove asymptotics.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const bytes=fs.readFileSync(path.join(__dirname,'data-reuse/factor-windows.json'));
const saved=JSON.parse(bytes),sourceSha256=crypto.createHash('sha256').update(bytes).digest('hex');
assert.equal(saved.schema,1);console.log(`input: data-reuse/factor-windows.json sha256=${sourceSha256}`);
function factor(n){const out=[];for(const p of saved.basePrimes){if(p*p>n)break;if(n%p)continue;let a=0;do{n/=p;a++;}while(n%p===0);out.push([p,a]);}if(n>1)out.push([n,1]);return out;}
const mu=n=>{const f=factor(n);return f.some(([,a])=>a>1)?0:(-1)**f.length;};
function divisors(n){let ds=[1];for(const[p,a]of factor(n)){const old=ds.slice();let r=1;for(let j=0;j<a;j++){r*=p;ds.push(...old.map(d=>d*r));}}return ds;}
function gcd(a,b){while(b)[a,b]=[b,a%b];return a;}
const mod=(n,q)=>((n%q)+q)%q;
function inv(a,q){if(q===1)return 0;let b=q,u=1,v=0;while(b){const k=Math.floor(a/b);[a,b]=[b,a-k*b];[u,v]=[v,u-k*v];}assert.equal(a,1);return mod(u,q);}
function near(a,b,mass=1){assert(Math.abs(a-b)<=2e-9*Math.max(1,mass),`${a} != ${b}`);}
const primesTo=W=>saved.basePrimes.filter(p=>p<=W),inside=(n,D)=>n>D&&n<=2*D;
function addVector(a,b,scale=1){for(const[p,c]of b){const v=(a.get(p)||0)+scale*c;if(v)a.set(p,v);else a.delete(p);}}
const vectorValue=v=>[...v].reduce((s,[p,c])=>s+c*Math.log(p),0);
const sorted=v=>[...v].sort((a,b)=>a[0]-b[0]);
function coefficients(D,W,cut){
  const all=Array.from({length:2*D*W+1},()=>new Map()),low=all.map(()=>new Map()),high=all.map(()=>new Map());
  for(let d=D+1;d<=2*D;d++)for(const p of primesTo(W))if(d%p){const term=new Map([[p,-mu(d)]]);addVector(all[d*p],term);addVector(p<=cut?low[d*p]:high[d*p],term);}
  for(let l=1;l<all.length;l++){
    const independent=new Map();for(const[p]of factor(l))if(p<=W&&inside(l/p,D)&&mu(l))independent.set(p,mu(l));
    assert.deepEqual(sorted(all[l]),sorted(independent));const merged=new Map(low[l]);addVector(merged,high[l]);assert.deepEqual(sorted(all[l]),sorted(merged));
  }
  return{all,low,high};
}
const x=4096,D=8,V=8,V0=4,E=32,Z=4,Z0=2,left=coefficients(D,V,V0),right=coefficients(E,Z,Z0);
const raw=[0,0,0],density=[0,0,0],endpoints=[0,0,0],mass=[0,0,0];let whole=0,cells=0,g2cells=0,coefficientChecks=0;
function primeValues(n,D,W,cut){const out=[0,0];for(const d of divisors(n))if(inside(d,D))for(const p of primesTo(W))if(n%(d*p)===0&&d%p)out[p<=cut?0:1]-=mu(d)*Math.log(p);return out;}
for(let n=x/2+1;n<=x;n++){
  const a=primeValues(n,D,V,V0),b=primeValues(n-2,E,Z,Z0);
  for(const [number,C,v]of [[n,left,a],[n-2,right,b]]){
    const fromDivisors=[0,0];for(const l of divisors(number))if(l<C.all.length){fromDivisors[0]+=vectorValue(C.low[l]);fromDivisors[1]+=vectorValue(C.high[l]);}
    near(v[0],fromDivisors[0]);near(v[1],fromDivisors[1]);coefficientChecks+=2;
  }
  const pieces=[a[0]*(b[0]+b[1]),a[1]*b[0],a[1]*b[1]];
  for(let i=0;i<3;i++){raw[i]+=pieces[i];mass[i]+=Math.abs(pieces[i]);}
}
for(let l=1;l<left.all.length;l++)if(left.all[l].size)for(let j=1;j<right.all.length;j++)if(right.all[j].size){
  const g=gcd(l,j);if(2%g)continue;cells++;if(g===2)g2cells++;
  const q=l*j/g,origin=l*mod((2/g)*inv(l/g,j/g),j/g),count=Math.floor((x-origin)/q)-Math.floor((x/2-origin)/q),delta=count-x/(2*q);
  const a=[vectorValue(left.low[l]),vectorValue(left.high[l])],b=[vectorValue(right.low[j]),vectorValue(right.high[j])];
  const pieces=[a[0]*(b[0]+b[1]),a[1]*b[0],a[1]*b[1]];
  whole+=(a[0]+a[1])*(b[0]+b[1])*delta;
  for(let i=0;i<3;i++){density[i]+=pieces[i]*x/(2*q);endpoints[i]+=pieces[i]*delta;}
}
for(let i=0;i<3;i++)near(raw[i]-density[i],endpoints[i],mass[i]);near(whole,endpoints.reduce((a,b)=>a+b,0));assert(g2cells>0);
console.log(`prime split: ${coefficientChecks} divisor/prime checks; ${cells} CRT cells (${g2cells} gcd=2); endpoint total=${whole.toFixed(9)}, high-band endpoint=${endpoints[2].toFixed(9)}, high-band density=${density[2].toFixed(9)}`);

// Rational exponent arithmetic, including a non-top-box control against using
// the earlier x^0.03 cutoff as though it were uniform over every divisor box.
function bgcd(a,b){a=a<0n?-a:a;while(b)[a,b]=[b,a%b];return a;}
function r(n,d=1){n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=bgcd(n,d);return[n/g,d/g];}
const add=(a,b)=>r(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),mul=(a,b)=>r(a[0]*b[0],a[1]*b[1]);
const sub=(a,b)=>add(a,[-b[0],b[1]]),cmp=(a,b)=>a[0]*b[1]-b[0]*a[1];
const max=(a,b)=>cmp(a,b)>=0n?a:b,min=(a,b)=>cmp(a,b)<=0n?a:b,scale=(a,n,d=1)=>mul(a,r(n,d));
const sum=(...xs)=>xs.reduce(add,r(0)),fmt=a=>`${a[0]}/${a[1]}`;
const paired=(a,b)=>sum(r(3,20),scale(add(a,b),7,10),scale(max(a,b),1,4));
function harmonic(a,b,eta){const p=add(a,b),v=sub(eta,sub(p,r(1))),phase=scale(max(r(0),v),1,2),pair=min(r(0),v);return[
  sum(scale(p,17,20),scale(max(a,b),1,4),scale(eta,-3,20),phase,pair),
  sum(scale(p,7,8),scale(max(a,b),1,8),phase,pair)];}
const tau=r(1,10000),s=r(517,1000),strip=paired(r(512,1000),s),lowEta=r(29,1000);
const uniform=[sum(r(17,20),scale(lowEta,7,10),scale(s,1,4)),sum(r(7,8),scale(lowEta,7,8),scale(s,1,8))];
assert.deepEqual(strip,r(19991,20000));assert.deepEqual(uniform,[strip,r(193,200)]);assert(cmp(add(strip,scale(tau,3)),r(1))<0n);
const maxH=sum(scale(s,2),r(-1),scale(tau,2));assert.deepEqual(maxH,r(171,5000));assert(cmp(maxH,r(9,200))<0n);
assert.deepEqual(harmonic(r(513,1000),s,r(3,100))[0],r(4001,4000));
let envelopeChecks=0;
for(const ai of [50,277,467,480,490,512,513,515,517])for(const bi of [50,277,467,480,490,512,513,515,517])for(const hi of [0,10,24,29,30,34,35]){
  const a=r(ai,1000),b=r(bi,1000),eta=r(hi,1000),actual=harmonic(a,b,eta),q=max(a,b);
  const bound=[sum(r(17,20),scale(eta,7,10),scale(q,1,4)),sum(r(7,8),scale(eta,7,8),scale(q,1,8))];
  for(let i=0;i<2;i++){assert(cmp(actual[i],bound[i])<=0n);envelopeChecks++;}
}
console.log(`exact powers: prime strips=${fmt(strip)}, uniform h<=x^0.029 budgets=${uniform.map(fmt).join(',')}, max-h exponent=${fmt(maxH)}, tau=${fmt(tau)}; ${envelopeChecks} envelope inequalities`);
console.log('scope control: a=0.513 b=0.517 h~x^0.03 gives first exponent=4001/4000; the earlier top-box low-frequency cutoff is not uniform');

const plus=(a,b)=>[a[0]+b[0],a[1]+b[1]],minus=(a,b)=>[a[0]-b[0],a[1]-b[1]],times=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const scaled=(a,c)=>[a[0]*c,a[1]*c],conj=a=>[a[0],-a[1]],abs2=a=>a[0]**2+a[1]**2;
const eq=(n,q)=>{const a=2*Math.PI*mod(n,q)/q;return[Math.cos(a),Math.sin(a)];};
const close=(a,b,m=1)=>{near(a[0],b[0],m);near(a[1],b[1],m);};
function kloosterman(t,b,q){let s=[0,0];for(let u=1;u<q;u++)s=plus(s,eq(t*u+b*inv(u,q),q));return s;}
function dft(a,q){return Array.from({length:q},(_,t)=>a.reduce((s,v,u)=>plus(s,times(v,eq(-t*u,q))),[0,0]));}
let phaseChecks=0,completionChecks=0,nonunitTerms=0,evenMuZeros=0;
const completed=[];
for(const c of [{g:1,D:64,p:47,q:17,e:101,x:262144,H:4},{g:2,D:64,p:47,q:17,e:101,x:262144,H:4},
  {g:1,D:64,p:47,q:17,e:202,x:262144,H:4},{g:1,D:512,p:257,q:31,e:2003,x:1048576,H:8},{g:2,D:512,p:257,q:31,e:2003,x:1048576,H:8}]){
  const {g,D,p,q,e,x,H}=c,theta=2/g,rows=[];assert(q>2*H&&p>q&&gcd(e,p*q)===1);
  for(let h=1;h<=H;h++){
    let direct=[0,0];const residues=Array.from({length:q},()=>[0,0]);
    for(let d=D+1;d<=2*D;d++){
      if(g===2&&d%2===0){assert.equal(mu(g*d),0);evenMuZeros++;}
      if(gcd(d,p*e)!==1)continue;
      const den=g*d*e*p*q,phi=minus(eq(h*x/2,den),eq(h*x,den));
      const F=scaled(times(eq(-theta*h*inv(p*q,e)*inv(d,e),e),phi),mu(g*d));
      residues[d%q]=plus(residues[d%q],F);
      if(d%q===0){if(mu(g*d))nonunitTerms++;continue;}
      const inverse=inv(d*p,e*q),split=mod(q*inv(d*p*q,e)+e*inv(d*p*e,q),e*q);
      assert.equal(inverse,split);phaseChecks++;
      direct=plus(direct,scaled(times(eq(-theta*h*inverse,e*q),phi),mu(g*d)));
    }
    const hat=dft(residues,q),b=mod(-theta*h*inv(p*e,q),q);let transformed=[0,0];
    for(let t=0;t<q;t++)transformed=plus(transformed,times(kloosterman(t,b,q),hat[t]));
    transformed=scaled(transformed,1/q);close(direct,transformed,D);completionChecks++;
    rows.push({h,direct,transformed,energy:hat.reduce((s,v)=>s+abs2(v),0)});
  }
  completed.push({...c,rows});
}
assert(nonunitTerms>0&&evenMuZeros>0);
console.log(`completion: ${phaseChecks} exact CRT phase splits, ${completionChecks} endpoint-dependent transform identities; ${nonunitTerms} nonunit terms removed by inversion, ${evenMuZeros} squarefree parity zeros`);

let gramChecks=0,normChecks=0;const grams=[];
for(const q of [5,7,11,13,17,31])for(const lambda of [1,2,q-1]){
  const H=Math.min(4,(q-1)/2),K=Array.from({length:H},(_,i)=>Array.from({length:q},(_,t)=>kloosterman(t,lambda*(i+1),q)));
  for(const start of [0,1])for(let i=0;i<H;i++)for(let j=0;j<H;j++){
    let v=[0,0];for(let t=start;t<q;t++)v=plus(v,times(K[i][t],conj(K[j][t])));
    close(v,[(i===j?q*q:0)-q-start,0],q*q);gramChecks++;
  }
  for(const start of [0,1]){const attained=K[0].slice(start).reduce((s,v,k)=>s+abs2(minus(v,K[1][k+start])),0);near(attained,2*q*q,q*q);normChecks++;}
  grams.push({q,lambda,H,norm:q});
}
console.log(`operator obstruction: ${gramChecks} Gram entries and ${normChecks} norm-attaining checks; norm exactly q, with and without the zero dual column`);

// Exact non-proportional phases already occur before the endpoint perturbation.
const coupledQ=13,coupledE=11,coupledP=17,coupledRows=[];
assert.equal(inv(coupledP*coupledQ,coupledE),1);
assert.deepEqual([5,6,7].map(d=>mod(-2*inv(d,coupledE),coupledE)),[4,7,6]);
for(const h of [1,2]){const a=Array.from({length:coupledQ},()=>[0,0]);for(let d=5;d<=8;d++)a[d]=scaled(eq(-2*h*inv(d,coupledE),coupledE),mu(d));coupledRows.push(dft(a,coupledQ));}
let maxMinor=0;for(let i=0;i<coupledQ;i++)for(let j=i+1;j<coupledQ;j++)maxMinor=Math.max(maxMinor,Math.sqrt(abs2(minus(times(coupledRows[0][i],coupledRows[1][j]),times(coupledRows[0][j],coupledRows[1][i])))));
assert(maxMinor>1);console.log(`coupled transform: exact phase ratios e_11(4), e_11(7), e_11(6); maximum measured two-row minor=${maxMinor.toFixed(9)}`);

const fractions=[];for(const q of primesTo(43))if(q>=5)for(let h=1;2*h<q;h++)fractions.push({h,q});
let collisionChecks=0,diagonals=0;for(const a of fractions)for(const b of fractions){const same=a.h*b.q===b.h*a.q;assert.equal(same,a.h===b.h&&a.q===b.q);if(same)diagonals++;collisionChecks++;}
console.log(`prime-frequency diagonal: ${collisionChecks} exact fraction comparisons; ${diagonals} equal fractions, all identical pairs`);
const windows=saved.windows.map(w=>{
  assert(Number.isSafeInteger(w.x)&&w.x>1);
  const V=Math.floor(w.x**(6/25)),V0=Math.floor(w.x**(47/200)),Z=Math.floor(w.x**(1/20)),Z0=Math.floor(w.x**(9/200));
  assert(saved.basePrimes.at(-1)>=V);
  const leftPrimes=primesTo(V).filter(p=>p>V0),rightPrimes=primesTo(Z).filter(p=>p>Z0);
  assert(leftPrimes.length===0||rightPrimes.length===0);
  console.log(`archived x=${w.x}: left prime band=(${V0},${V}] has ${leftPrimes.length}; right=(${Z0},${Z}] has ${rightPrimes.length}; high-band core empty at these rounded cutoffs`);
  return{x:w.x,V,V0,Z,Z0,leftPrimes,rightPrimes};
});
const artifact={schema:1,producer:'research/prime-band-completion-validation.js',source:'research/data-reuse/factor-windows.json',sourceSha256,
  rectangle:{x,D,V,V0,E,Z,Z0,coefficientChecks,cells,g2cells,raw,density,endpoints,whole},
  exponents:{strip:fmt(strip),uniform:uniform.map(fmt),maxH:fmt(maxH),tau:fmt(tau),envelopeChecks},phaseChecks,completionChecks,nonunitTerms,evenMuZeros,completed,
  gramChecks,normChecks,grams,nonProportional:{phaseRatios:[4,7,6],maxMinor},collisionChecks,diagonals,windows};
fs.writeFileSync(path.join(__dirname,'data-reuse/prime-band-completion.json'),JSON.stringify(artifact)+'\n');
console.log('Saved data-reuse/prime-band-completion.json. No asymptotic rate, effective onset or twin lower bound tested.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/prime-band-completion-validation.js
//   invocation:  node research/prime-band-completion-validation.js
//   code-sha256: 9c46ad4f6f29ee00f0eccdcbda988a8427f0ef7a1e7a1cd5f8d40aa609bf3e7c
//   out-sha256:  3daf17330663c7765ab368bbf98098f40a24611f392cbcf66c1d59d0f15562f8
//   body-lines:  12
//   inputs:      research/data-reuse/factor-windows.json@fa30e65431c2
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-05
//   elapsed:     0.1 s
// ============================================================================
// input: data-reuse/factor-windows.json sha256=fa30e65431c2f9fa7b66a4e3cf7eb44cdcc912c4de19b97d56dfbf279030b98b
// prime split: 8192 divisor/prime checks; 188 CRT cells (58 gcd=2); endpoint total=-6.294308087, high-band endpoint=-9.232843649, high-band density=5.326894578
// exact powers: prime strips=19991/20000, uniform h<=x^0.029 budgets=19991/20000,193/200, max-h exponent=171/5000, tau=1/10000; 1134 envelope inequalities
// scope control: a=0.513 b=0.517 h~x^0.03 gives first exponent=4001/4000; the earlier top-box low-frequency cutoff is not uniform
// completion: 8468 exact CRT phase splits, 28 endpoint-dependent transform identities; 148 nonunit terms removed by inversion, 2176 squarefree parity zeros
// operator obstruction: 462 Gram entries and 36 norm-attaining checks; norm exactly q, with and without the zero dual column
// coupled transform: exact phase ratios e_11(4), e_11(7), e_11(6); maximum measured two-row minor=5.425143560
// prime-frequency diagonal: 17424 exact fraction comparisons; 132 equal fractions, all identical pairs
// archived x=16384: left prime band=(9,10] has 0; right=(1,1] has 0; high-band core empty at these rounded cutoffs
// archived x=1048576: left prime band=(25,27] has 0; right=(1,2] has 1; high-band core empty at these rounded cutoffs
// archived x=134217728: left prime band=(81,89] has 2; right=(2,2] has 0; high-band core empty at these rounded cutoffs
// Saved data-reuse/prime-band-completion.json. No asymptotic rate, effective onset or twin lower bound tested.
// ============================================================================
// READINGS
// These finite checks distinguish exact identities, exponent arithmetic and
// transform measurements. The estimate for the actual correlation belongs to
// the separate prime-dispersion companion and its classical-input argument.
