// ENDPOINT PAIRING — interval cancellation, full tails and exact power budgets.
// Companion: endpoint-pairing.md. These finite checks do not prove asymptotics.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const mod=(a,q)=>((a%q)+q)%q;
function gcd(a,b){while(b)[a,b]=[b,a%b];return a;}
function inv(a,q){if(q===1)return 0;let b=q,u=1,v=0;while(b){const k=Math.floor(a/b);[a,b]=[b,a-k*b];[u,v]=[v,u-k*v];}assert.equal(a,1);return mod(u,q);}
function crt(l,j){const g=gcd(l,j);if(2%g)return null;const m=l/g,n=j/g,i=inv(m,n);return{g,m,n,q:g*m*n,origin:l*mod((2/g)*i,n),i};}
function near(a,b,mass=1){assert(Math.abs(a-b)<=2e-9*Math.max(1,mass),`${a} != ${b}`);}
const W=v=>Math.PI*v*(1-v)/Math.tan(Math.PI*v)+v;
function vaaler(k,q,T){
  const u=mod(k,q)/q;let approx=0,majorantPoly=1;
  for(let h=1;h<=T;h++){
    const angle=2*Math.PI*mod(h*mod(k,q),q)/q;
    approx-=W(h/(T+1))*Math.sin(angle)/(Math.PI*h);
    majorantPoly+=2*(1-h/(T+1))*Math.cos(angle);
  }
  const majorant=u===0?0.5:0.5*(Math.sin(Math.PI*(T+1)*u)/((T+1)*Math.sin(Math.PI*u)))**2;
  near(majorant,majorantPoly/(2*(T+1)));
  return{approx,majorant,actual:u-0.5};
}
// Analytic integral of exp(2*pi*i*h*z/q), evaluated as midpoint times sinc.
// Includes the independent inverse-residue phase, not the stored CRT origin.
function pairedIntegral(c,lo,hi,T){
  const len=hi-lo;let s=0;
  for(let h=1;h<=T;h++){
    const v=Math.PI*h*len/c.q,sinc=v===0?1:Math.sin(v)/v;
    const phase=2*Math.PI*(h*(lo+hi)/(2*c.q)-(2/c.g)*h*c.i/c.n);
    s+=2*W(h/(T+1))*len/c.q*sinc*Math.cos(phase);
    // Each positive complex harmonic checked before taking real parts.
    const left=2*Math.PI*mod(h*mod(lo-c.origin,c.q),c.q)/c.q;
    const right=2*Math.PI*mod(h*mod(hi-c.origin,c.q),c.q)/c.q;
    const coeff=W(h/(T+1))/(2*Math.PI*h);
    near(-coeff*(Math.sin(left)-Math.sin(right)),W(h/(T+1))*len/c.q*sinc*Math.cos(phase));
    near(coeff*(Math.cos(left)-Math.cos(right)),W(h/(T+1))*len/c.q*sinc*Math.sin(phase));
  }
  return s;
}
const x=256,lo=x/2,ends=[lo,lo+1,lo+7,200,x],truncations=[1,4,16,64];
const sums=ends.flatMap(t=>truncations.map(T=>({t,T,actual:0,poly:0,majorant:0,mass:0})));
let cells=0,g2=0,integerEndpoints=0,crtChecks=0,pairChecks=0,harmonicChecks=0;
for(let l=1;l<=48;l++)for(let j=1;j<=48;j++){
  const c=crt(l,j);if(!c)continue;cells++;if(c.g===2)g2++;
  assert.equal(c.origin%l,0);assert.equal(mod(c.origin-2,j),0);
  const weight=(l%5-2)*(j%7-3);
  for(const t of ends){
    let direct=0;for(let n=lo+1;n<=t;n++)if(n%l===0&&(n-2)%j===0)direct++;
    const counted=Math.floor((t-c.origin)/c.q)-Math.floor((lo-c.origin)/c.q);
    assert.equal(counted,direct);
    const numerator=mod(lo-c.origin,c.q)-mod(t-c.origin,c.q);
    assert.equal(c.q*direct-(t-lo),numerator);crtChecks++;
    if(mod(lo-c.origin,c.q)===0||mod(t-c.origin,c.q)===0)integerEndpoints++;
    for(const T of truncations){
      const a=vaaler(lo-c.origin,c.q,T),b=vaaler(t-c.origin,c.q,T);
      const integral=pairedIntegral(c,lo,t,T),poly=a.approx-b.approx,actual=direct-(t-lo)/c.q;
      near(actual,a.actual-b.actual);near(poly,integral);
      assert(Math.abs(actual-poly)<=a.majorant+b.majorant+2e-9);
      const total=sums.find(v=>v.t===t&&v.T===T);
      total.actual+=weight*actual;total.poly+=weight*integral;
      total.majorant+=Math.abs(weight)*(a.majorant+b.majorant);total.mass+=Math.abs(weight);
      pairChecks++;harmonicChecks+=T;
    }
  }
}
assert(g2>0&&integerEndpoints>0);
for(const s of sums)assert(Math.abs(s.actual-s.poly)<=s.majorant+2e-9*s.mass);
console.log(`CRT: ${cells} compatible cells, ${g2} gcd=2; ${crtChecks} exact direct-count identities, ${integerEndpoints} with an integer sawtooth endpoint`);
console.log(`pairing: ${pairChecks} polynomial/integral identities, ${harmonicChecks} complex harmonics; ${sums.length} signed full-majorant sums verified`);

// A short interval ending at a hit refutes both invalid tail shortcuts.
const c=crt(5,7),T=4,a=vaaler(29-c.origin,c.q,T),b=vaaler(30-c.origin,c.q,T);
const error=Math.abs(a.actual-b.actual-a.approx+b.approx),full=a.majorant+b.majorant;
const zeroOnly=1/(T+1),wrongPaired=full*Math.min(1,T/c.q);
assert(error>zeroOnly);assert(error>wrongPaired);assert(error<=full+2e-9);
console.log(`tail control (29,30], l=5 j=7 T=4: error=${error.toFixed(9)}, full=${full.toFixed(9)}, zero-only=${zeroOnly.toFixed(9)}, incorrectly paired=${wrongPaired.toFixed(9)}`);

// Whole Fejer tail: group by nearby CRT solutions, then bound pair counts
// by divisor counts. Both signs of the integer and the exceptions 0,2 matter.
function divisorCount(n){assert(n>0);let count=0;for(let d=1;d*d<=n;d++)if(n%d===0)count+=d*d===n?1:2;return count;}
const divisorLimit=48,maxQ=divisorLimit**2,z=256;
const integerLo=z-Math.ceil(maxQ/2)-1,integerHi=z+Math.ceil(maxQ/2)+1;
const multiplicities=new Map();let exceptionalPairs=0,negativeIntegers=0,divisorChecks=0;
for(let k=integerLo;k<=integerHi;k++){
  let count=0;for(let l=3;l<=divisorLimit;l++)if(k%l===0)for(let j=3;j<=divisorLimit;j++)if((k-2)%j===0)count++;
  const divisorBound=k===0||k===2?0:divisorCount(Math.abs(k))*divisorCount(Math.abs(k-2));
  assert(count<=divisorBound);if(k===0||k===2)exceptionalPairs+=count;if(k<0)negativeIntegers++;
  multiplicities.set(k,{count,divisorBound});divisorChecks++;
}
assert.equal(exceptionalPairs,0);assert(negativeIntegers>0);
const groupedTails=[];let kernelChecks=0;
for(const H of [16,64,256,1024]){
  const width=maxQ/(H+1);assert(width>=1&&width<=x);let fullTail=0,nearest=0,grouped=0,divisorAllowance=0;
  for(let l=3;l<=divisorLimit;l++)for(let j=3;j<=divisorLimit;j++){
    const c=crt(l,j);if(!c)continue;
    const u=mod(z-c.origin,c.q)/c.q;
    const D=u===0?0.5:0.5*(Math.sin(Math.PI*(H+1)*u)/((H+1)*Math.sin(Math.PI*u)))**2;
    const k=c.origin+Math.round((z-c.origin)/c.q)*c.q;
    assert(k>=integerLo&&k<=integerHi);assert(k!==0&&k!==2);
    const kernel=1/(1+Math.abs(k-z)/width)**2;
    assert(D<=2*kernel+2e-12);fullTail+=D;nearest+=kernel;kernelChecks++;
  }
  for(const[k,v]of multiplicities){const kernel=1/(1+Math.abs(k-z)/width)**2;grouped+=v.count*kernel;divisorAllowance+=v.divisorBound*kernel;}
  assert(nearest<=grouped+2e-9);assert(grouped<=divisorAllowance+2e-9);assert(fullTail<=2*divisorAllowance+2e-9);
  groupedTails.push({H,width,fullTail,nearest,grouped,divisorAllowance});
}
console.log(`whole-tail grouping: ${kernelChecks} Fejer bounds, ${divisorChecks} integer divisor-count bounds (${negativeIntegers} negative integers); no pairs at 0 or 2; ${groupedTails.length} complete tail sums bounded`);

// BigInt rational arithmetic: no floating-point decision on exponent margins.
function bgcd(a,b){a=a<0n?-a:a;while(b)[a,b]=[b,a%b];return a;}
function r(n,d=1){n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=bgcd(n,d);return[n/g,d/g];}
const add=(a,b)=>r(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const neg=a=>[-a[0],a[1]],sub=(a,b)=>add(a,neg(b));
const mul=(a,b)=>r(a[0]*b[0],a[1]*b[1]);
const cmp=(a,b)=>a[0]*b[1]-b[0]*a[1];
const max=(a,b)=>cmp(a,b)>=0n?a:b,min=(a,b)=>cmp(a,b)<=0n?a:b;
const fmt=a=>`${a[0]}/${a[1]}`,num=a=>Number(a[0])/Number(a[1]);
const sum=(...xs)=>xs.reduce(add,r(0)),scale=(a,n,d=1)=>mul(a,r(n,d));
function bases(a,b){return[sum(scale(add(a,b),17,20),scale(max(a,b),1,4)),sum(scale(add(a,b),7,8),scale(max(a,b),1,8))];}
const improved=(a,b)=>sum(r(3,20),scale(add(a,b),7,10),scale(max(a,b),1,4));
const s=r(103,200),old=bases(s,s)[0],first=improved(s,s),second=bases(s,s)[1],tau=r(1,20000);
assert.deepEqual(old,r(4017,4000));assert.deepEqual(first,r(3999,4000));assert.deepEqual(second,r(309,320));
assert.deepEqual(add(first,scale(tau,3)),r(9999,10000));
const endpoint=sub(r(1),tau),product=sum(sub(s,r(6,25)),sub(s,r(1,20)));
assert.deepEqual(product,r(37,50));assert(cmp(add(first,scale(tau,2)),endpoint)<0n);
const frontier=sub(scale(r(17,33),2),r(29,100));assert.deepEqual(frontier,r(2443,3300));
console.log(`controlled: a=b=${fmt(s)}, product=${fmt(product)}, separate=${fmt(old)}, paired=${fmt(first)}, second=${fmt(second)}; tau=${fmt(tau)}, endpoint=${fmt(endpoint)}`);
console.log(`strict balanced support frontier=17/33, divisor-product frontier=${fmt(frontier)}; neither is a uniform product-cutoff theorem`);

// Check every corner and interior sample of the piecewise harmonic envelopes.
// This is finite falsification coverage; the three-branch proof is in the note.
let budgetChecks=0,nearBelow=0;
const pairs=[];
for(let i=1;i<=90;i++)for(let j=1;j<=90;j++)if(i+j>=100)pairs.push([r(i,100),r(j,100)]);
pairs.push([r(1,2),sub(r(1,2),scale(tau,1,2))]);
for(const [a,b] of pairs){
  const p=add(a,b),v=sub(p,r(1)),t=add(scale(tau,2),max(r(0),v)),[B1,B2]=bases(a,b);
  assert(cmp(v,neg(tau))>0n);if(cmp(v,r(0))<0n)nearBelow++;
  const etas=[r(0),t,min(t,max(r(0),v)),scale(t,1,2),scale(t,1,4),scale(t,3,4)];
  for(const eta of etas){
    const phase=scale(max(r(0),sub(eta,v)),1,2),pair=min(r(0),sub(eta,v)),tail=sub(eta,t);
    const target1=add(improved(a,b),scale(tau,3,2)),target2=add(B2,scale(tau,3,2));
    for(const factor of [pair,tail]){
      assert(cmp(sum(B1,scale(eta,-3,20),phase,factor),target1)<=0n);
      assert(cmp(sum(B2,phase,factor),target2)<=0n);budgetChecks+=2;
    }
  }
  if(cmp(improved(a,b),r(1))<0n){assert(cmp(B2,r(85,88))<0n);assert(cmp(B2,improved(a,b))<0n);}
}
assert(nearBelow>0);console.log(`power envelopes: ${budgetChecks} exact rational inequalities over ${pairs.length} boxes, including P<x and both polynomial/majorant branches`);

const pilot=r(517,1000),[pilotOld,pilotSecond]=bases(pilot,pilot),u=sub(scale(pilot,2),r(1));
const low=sub(pilotOld,u),transition=sub(pilotOld,scale(u,3,20)),lowCut=add(low,scale(r(3,100),17,20));
assert.deepEqual(low,r(19483,20000));assert.deepEqual(transition,r(20061,20000));assert.deepEqual(lowCut,r(19993,20000));
assert.deepEqual(improved(pilot,pilot),transition);assert.deepEqual(u,r(17,500));
const deficit=sub(transition,r(1));assert.deepEqual(deficit,r(61,20000));
console.log(`open pilot: h~1 first=${fmt(low)}, h<=x^0.03 first<=${fmt(lowCut)}, transition h~x^(${fmt(u)}) first=${fmt(transition)}, deficit=${fmt(deficit)} before losses`);

// Optimistic unperturbed use of Wright v2 Theorem 2.1, summed over q by triangle.
const m=r(517,1000),n=r(467,1000),rho=r(1,20),eta=u,pref=sum(m,n,scale(rho,5,4));
const wright=[scale(n,-1,8),sum(scale(rho,1,8),scale(n,1,8),scale(m,-1,4)),
  sum(scale(m,1,10),scale(rho,-3,20),scale(eta,-1,20),scale(n,-3,20)),
  sum(scale(n,3,20),scale(eta,-3,20),scale(m,-1,5)),sum(scale(n,3,8),scale(m,-1,2))].map(v=>add(pref,v));
assert(cmp(m,scale(n,2))<0n);assert.deepEqual(wright[2],r(20379,20000));assert(cmp(wright[2],transition)>0n);
assert.deepEqual(wright.map(v=>num(v).toFixed(6)),['0.988125','0.981875','1.018950','1.008050','0.963125']);
console.log(`fixed-q theorem budget: ${wright.map(v=>num(v).toFixed(6)).join(', ')}; no saving below scale x from this direct application`);
const artifact={schema:1,producer:'research/endpoint-pairing-validation.js',cells,g2,crtChecks,integerEndpoints,pairChecks,harmonicChecks,
  signedSums:sums,tailWitness:{error,full,zeroOnly,wrongPaired},wholeTail:{kernelChecks,divisorChecks,negativeIntegers,exceptionalPairs,groupedTails},budgetChecks,boxes:pairs.length,
  exponents:{support:fmt(s),product:fmt(product),old:fmt(old),first:fmt(first),second:fmt(second),tau:fmt(tau),endpoint:fmt(endpoint),frontier:fmt(frontier),
    pilotOld:fmt(pilotOld),pilotSecond:fmt(pilotSecond),low:fmt(low),lowCut:fmt(lowCut),transitionFrequency:fmt(u),transition:fmt(transition),deficit:fmt(deficit),wright: wright.map(fmt)}};
fs.writeFileSync(path.join(__dirname,'data-reuse/endpoint-pairing.json'),JSON.stringify(artifact)+'\n');
console.log('Saved data-reuse/endpoint-pairing.json. Finite checks only; no asymptotic rate or twin lower bound tested.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/endpoint-pairing-validation.js
//   invocation:  node research/endpoint-pairing-validation.js
//   code-sha256: d5db6c33b72f68802db76429efc2f07fc76c542fdc2fa070a8f02aa926e021bd
//   out-sha256:  cdd89745b08a0796452ae0d9c0f747c51042e5a4e1b2c7493363d18c621a3dbc
//   body-lines:  10
//   forced:      2026-09-05, 0 of 34 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-05
//   elapsed:     0.8 s
// ============================================================================
// CRT: 1782 compatible cells, 359 gcd=2; 8910 exact direct-count identities, 378 with an integer sawtooth endpoint
// pairing: 35640 polynomial/integral identities, 757350 complex harmonics; 20 signed full-majorant sums verified
// tail control (29,30], l=5 j=7 T=4: error=0.859687064, full=0.968575681, zero-only=0.200000000, incorrectly paired=0.110694364
// whole-tail grouping: 6376 Fejer bounds, 2307 integer divisor-count bounds (897 negative integers); no pairs at 0 or 2; 4 complete tail sums bounded
// controlled: a=b=103/200, product=37/50, separate=4017/4000, paired=3999/4000, second=309/320; tau=1/20000, endpoint=19999/20000
// strict balanced support frontier=17/33, divisor-product frontier=2443/3300; neither is a uniform product-cutoff theorem
// power envelopes: 79728 exact rational inequalities over 3322 boxes, including P<x and both polynomial/majorant branches
// open pilot: h~1 first=19483/20000, h<=x^0.03 first<=19993/20000, transition h~x^(17/500) first=20061/20000, deficit=61/20000 before losses
// fixed-q theorem budget: 0.988125, 0.981875, 1.018950, 1.008050, 0.963125; no saving below scale x from this direct application
// Saved data-reuse/endpoint-pairing.json. Finite checks only; no asymptotic rate or twin lower bound tested.
// ============================================================================
// READINGS
// The finite identities and exponent checks test the written application.
// They do not establish the published exponential-sum bound or twin infinitude.
