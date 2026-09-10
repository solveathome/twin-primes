// COEFFICIENT STRUCTURE — squarefree signs, sparse exceptions and endpoint sectors.
// Companion: research/coefficient-structure.md. Finite checks are not asymptotics.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const bytes=fs.readFileSync(path.join(__dirname,'data-reuse/factor-windows.json'));
const saved=JSON.parse(bytes),sourceSha256=crypto.createHash('sha256').update(bytes).digest('hex');
assert.equal(saved.schema,1);
assert(saved.basePrimes.at(-1)**2>Math.max(...saved.windows.map(w=>w.hi)));
console.log(`input: data-reuse/factor-windows.json sha256=${sourceSha256}`);
function factor(n) {
  const out=[];
  for(const p of saved.basePrimes) {if(p*p>n)break;if(n%p)continue;let a=0;do{n/=p;a++;}while(n%p===0);out.push([p,a]);}
  if(n>1)out.push([n,1]);return out;
}
const muF=f=>f.some(([,a])=>a>1)?0:(-1)**f.length;
const mu=n=>muF(factor(n));
function divisors(f) {let ds=[1];for(const[p,a]of f){const old=ds.slice();let r=1;for(let k=1;k<=a;k++){r*=p;ds.push(...old.map(d=>d*r));}}return ds;}
function add(a,b,c=1){for(const[p,v]of b){const n=(a.get(p)||0)+c*v;if(n)a.set(p,n);else a.delete(p);}}
const vector=n=>new Map(factor(n));
const sorted=v=>[...v].sort((a,b)=>a[0]-b[0]);
const value=v=>[...v].reduce((s,[p,c])=>s+c*Math.log(p),0);
const inside=(n,D)=>n>D&&n<=2*D;
function primePowers(W){const out=[];for(const p of saved.basePrimes){if(p>W)break;for(let r=p,k=1;r<=W;r*=p,k++)out.push({p,r,k});}return out;}

// Original convolution: no squarefree classification is used here.
function aggregate(D,W){const a=Array.from({length:2*D*W+1},()=>new Map());for(let d=D+1;d<=2*D;d++){
  const m=mu(d);add(a[d],vector(d),-m);
  for(const {p,r} of primePowers(W))add(a[d*r],new Map([[p,1]]),-m);
}return a;}

// Closed formulas, independently evaluated from the factorization of l.
// L0 multiplies log(n); L1,Q,B have no n-dependent weight.
function parts(l,D,W){
  const f=factor(l),m=muF(f),L1=new Map(),Q=new Map(),B=new Map(),L0=m*Number(inside(l,D));
  if(L0)add(L1,new Map(f),-m);
  if(m){
    if(l>2*D)for(const[p]of f)if(p<=W&&inside(l/p,D))Q.set(p,m);
  }else{
    const repeated=f.filter(([,a])=>a>1);
    if(repeated.length===1){const[p,a]=repeated[0],rest=l/p**a;
      const c=mu(rest)*(Number(p**(a-1)<=W&&inside(p*rest,D))-Number(p**a<=W&&inside(rest,D)));
      if(c)B.set(p,c);
    }
  }
  return {L0,L1,Q,B};
}
const numeric=c=>[c.L0,value(c.L1),value(c.Q),value(c.B)];
const names=['L0','L1','Q','B'];
function near(a,b,mass=1){assert(Math.abs(a-b)<=2e-9*Math.max(1,mass),`${a} != ${b}`);}
let classifications=0,multipleRepeated=0,nonSquarefree=0;
const norms=[];
for(const[D,W]of [[5,4],[16,16],[64,64],[128,128],[256,256]]){
  const original=aggregate(D,W);let supportB=0,normB2=0,normQ2=0,topQ2=0;
  for(let l=1;l<original.length;l++){
    const c=parts(l,D,W),sum=new Map();add(sum,c.L1);add(sum,c.Q);add(sum,c.B);
    assert.deepEqual(sorted(sum),sorted(original[l]),`classification D=${D} W=${W} l=${l}`);
    const f=factor(l),m=muF(f);
    if(f.filter(([,a])=>a>1).length>1){multipleRepeated++;assert.equal(c.B.size,0);}
    if(c.B.size){nonSquarefree++;supportB++;assert.equal(m,0);assert.equal(c.B.size,1);assert.equal(Math.abs([...c.B.values()][0]),1);}
    if(c.Q.size){assert(m);for(const coeff of c.Q.values())assert.equal(coeff,m);assert(l>2*D);}
    near(value(sum),value(original[l]),Math.log(l+1));
    const q=value(c.Q),b=value(c.B);normQ2+=q*q;normB2+=b*b;if(l>D*W/2)topQ2+=q*q;
    classifications++;
  }
  const linearPairs=saved.basePrimes.filter(p=>p<=Math.min(W,2*D)).reduce((s,p)=>s+Math.floor(2*D/p)-Math.floor(D/p),0);
  const higherPowers=primePowers(W).filter(o=>o.k>=2).length;
  const supportAllowance=linearPairs+D*higherPowers;
  assert(supportB<=supportAllowance);assert(normB2<=supportAllowance*Math.log(2*D*W)**2+1e-8);
  let witnessPairs=0,witnessEnergy=0;
  for(const p of saved.basePrimes)if(p>W/2&&p<=W)for(let d=D+1;d<=2*D;d++)if(mu(d)&&d%p){witnessPairs++;witnessEnergy+=Math.log(p)**2;}
  assert(topQ2+1e-7>=witnessEnergy);
  norms.push({D,W,supportB,supportAllowance,normB2,normQ2,topQ2,witnessPairs,witnessEnergy,topNormalized:topQ2/(D*W*Math.log(W))});
  console.log(`norm D=${D} W=${W}: B support=${supportB} <= ${supportAllowance}; Q top energy=${topQ2.toFixed(6)} >= witness=${witnessEnergy.toFixed(6)} from ${witnessPairs} pairs; Q/(DW log W)=${norms.at(-1).topNormalized.toFixed(6)}`);
}
const minusWitness=parts(12,5,4),plusWitness=parts(28,5,4);
assert.deepEqual(sorted(minusWitness.B),[[2,-1]]);assert.deepEqual(sorted(plusWitness.B),[[2,1]]);
console.log(`classification: ${classifications} exact log-prime identities; ${nonSquarefree} nonzero nonsquarefree coefficients; ${multipleRepeated} inputs with two repeated primes vanish`);
console.log('nonsquarefree signs: D=5 W=4 gives B(12)=-log(2), B(28)=+log(2); discarding this sector is not an identity');

function beta(n,W){let s=0;for(const[p,a]of factor(n)){let r=1;for(let j=1;j<=a;j++){r*=p;if(r>W)s+=Math.log(p);}}return s;}
function localValues(n,D,W,ds){const out=[0,0,0,0];for(const l of ds)if(l<=2*D*W){const c=numeric(parts(l,D,W));c[0]*=Math.log(n);for(let i=0;i<4;i++)out[i]+=c[i];}return out;}
function originalValue(n,D,W,ds){let s=0;for(const d of ds)if(inside(d,D))s+=mu(d)*beta(n/d,W);return s;}
function matrix(){return Array.from({length:4},()=>[0,0,0,0]);}
const total=a=>a.flat().reduce((s,t)=>s+t,0);
function gcd(a,b){while(b)[a,b]=[b,a%b];return a;}
const mod=(a,b)=>((a%b)+b)%b;
function inv(a,q){if(q===1)return 0;let b=q,u=1,v=0;while(b){const k=Math.floor(a/b);[a,b]=[b,a-k*b];[u,v]=[v,u-k*v];}assert.equal(a,1);return mod(u,q);}

// Independent factor enumeration and CRT-density reconstruction for every sector.
const x=4096,D=8,V=8,E=32,Z=4,raw=matrix(),density=matrix(),crtRaw=matrix(),mass=matrix();
const moments=matrix();let direct=0,cells=0,g2=0;
for(let n=x/2+1;n<=x;n++){
  const ds=divisors(factor(n)),es=divisors(factor(n-2)),a=localValues(n,D,V,ds),b=localValues(n-2,E,Z,es);
  const left=originalValue(n,D,V,ds),right=originalValue(n-2,E,Z,es);near(total([a]),left,a.reduce((s,v)=>s+Math.abs(v),0));near(total([b]),right,b.reduce((s,v)=>s+Math.abs(v),0));direct+=left*right;
  for(let i=0;i<4;i++)for(let j=0;j<4;j++){raw[i][j]+=a[i]*b[j];mass[i][j]+=Math.abs(a[i]*b[j]);moments[i][j]+=(i===0?Math.log(n):1)*(j===0?Math.log(n-2):1);}
}
for(let l=1;l<=2*D*V;l++){
  const a=numeric(parts(l,D,V));if(!a.some(Boolean))continue;
  for(let k=1;k<=2*E*Z;k++){
    const b=numeric(parts(k,E,Z));if(!b.some(Boolean))continue;const g=gcd(l,k);if(2%g)continue;
    cells++;if(g===2)g2++;const q=l*k/g,origin=l*mod((2/g)*inv(l/g,k/g),k/g),local=matrix();
    for(let n=origin+Math.ceil((x/2+1-origin)/q)*q;n<=x;n+=q)for(let i=0;i<4;i++)for(let j=0;j<4;j++)local[i][j]+=(i===0?Math.log(n):1)*(j===0?Math.log(n-2):1);
    for(let i=0;i<4;i++)for(let j=0;j<4;j++){crtRaw[i][j]+=a[i]*b[j]*local[i][j];density[i][j]+=a[i]*b[j]*moments[i][j]/q;}
  }
}
for(let i=0;i<4;i++)for(let j=0;j<4;j++)near(raw[i][j],crtRaw[i][j],mass[i][j]);
near(direct,total(raw),total(mass));
const endpoint=raw.map((r,i)=>r.map((v,j)=>v-density[i][j]));
assert(g2>0);assert(Math.abs(density[3][2])+Math.abs(density[2][3])>1);
// Check the prime-factor formula for QQ and its separately estimated density.
let primeDensity=0,primeEndpoint=0,primeMass=0;
for(const p of saved.basePrimes)if(p<=V)for(const q of saved.basePrimes)if(q<=Z)
  for(let d=D+1;d<=2*D;d++)if(mu(d)&&d%p)for(let e=E+1;e<=2*E;e++)if(mu(e)&&e%q){
    const a=d*p,b=e*q,g=gcd(a,b);if(2%g)continue;
    const modulus=a*b/g,origin=a*mod((2/g)*inv(a/g,b/g),b/g);
    const weight=mu(d)*mu(e)*Math.log(p)*Math.log(q),expected=x/(2*modulus);
    const count=Math.floor((x-origin)/modulus)-Math.floor((x/2-origin)/modulus);
    primeDensity+=weight*expected;primeEndpoint+=weight*(count-expected);primeMass+=Math.abs(weight)*(count+expected);
  }
near(primeDensity,density[2][2],primeMass);near(primeEndpoint,endpoint[2][2],primeMass);
console.log(`toy x=${x}: ${cells} CRT cells (${g2} gcd=2), all 16 sectors reproduce; R=${direct.toFixed(9)}, density=${total(density).toFixed(9)}, endpoint=${total(endpoint).toFixed(9)}, QQ endpoint=${endpoint[2][2].toFixed(9)}`);

function powFloor(n,a,b){let r=Math.floor(n**(a/b));const target=BigInt(n)**BigInt(a);while(BigInt(r+1)**BigInt(b)<=target)r++;while(BigInt(r)**BigInt(b)>target)r--;return r;}
const windows=[];
for(const w of saved.windows){const D=powFloor(w.x,277,1000),E=powFloor(w.x,467,1000),V=powFloor(w.x,6,25),Z=powFloor(w.x,1,20),raw=matrix();let direct=0;
  assert((D+1)*(E+1)>powFloor(w.x,7,10));
  for(let n=w.lo;n<=w.hi;n++){
    const ds=divisors(w.primePowerFactors[n-w.factorStart]),es=divisors(w.primePowerFactors[n-2-w.factorStart]);
    const a=localValues(n,D,V,ds),b=localValues(n-2,E,Z,es),left=originalValue(n,D,V,ds),right=originalValue(n-2,E,Z,es);
    near(a.reduce((s,v)=>s+v,0),left,a.reduce((s,v)=>s+Math.abs(v),0));near(b.reduce((s,v)=>s+v,0),right,b.reduce((s,v)=>s+Math.abs(v),0));direct+=left*right;
    for(let i=0;i<4;i++)for(let j=0;j<4;j++)raw[i][j]+=a[i]*b[j];
  }
  near(total(raw),direct,raw.flat().reduce((s,v)=>s+Math.abs(v),0));
  const partners=w.hi-w.lo+1;windows.push({q:w.q,x:w.x,lo:w.lo,hi:w.hi,D,E,V,Z,direct,raw,normalization:'raw sector sums on a prefix; no density subtraction or asymptotic test'});
  console.log(`archived q=${w.q}: D=${D} E=${E}, ${partners} partners, R/partner=${(direct/partners).toFixed(9)}, raw QQ/partner=${(raw[2][2]/partners).toFixed(9)}; raw QQ is not its endpoint error`);
}

// Exact rational exponent ledger: a norm improvement is separate from support.
function bgcd(a,b){while(b)[a,b]=[b,a%b];return a;}
function r(a,b=1){a=BigInt(a);b=BigInt(b);const g=bgcd(a<0n?-a:a,b);return[a/g,b/g];}
const plus=(a,b)=>r(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),times=(a,b)=>r(a[0]*b[0],a[1]*b[1]);
const minus=(a,b)=>plus(a,[-b[0],b[1]]),max=(a,b)=>a[0]*b[1]>=b[0]*a[1]?a:b,fmt=a=>`${a[0]}/${a[1]}`;
function shape(d,w,type){const support=type==='L'?d:plus(d,w),norm=type==='B'?plus(times(r(1,2),d),times(r(1,4),w)):times(r(1,2),support);return{support,norm};}
function budget(a,b){const norm=plus(a.norm,b.norm),s=plus(a.support,b.support),m=max(a.support,b.support);return{first:plus(norm,plus(times(r(7,20),s),times(r(1,4),m))),second:plus(norm,plus(times(r(3,8),s),times(r(1,8),m)))};}
const exponents=[],tau=r(1,1000);let largestOther=r(0);
for(const l of ['L','Q','B'])for(const k of ['L','Q','B']){
  const b=budget(shape(r(277,1000),r(6,25),l),shape(r(467,1000),r(1,20),k));
  if(l!=='Q'||k!=='Q'){largestOther=max(largestOther,b.first);assert(plus(b.first,times(r(3),tau))[0]<plus(b.first,times(r(3),tau))[1]);}
  assert(b.second[0]*b.first[1]<=b.first[0]*b.second[1]);exponents.push({sector:l+k,first:fmt(b.first),second:fmt(b.second)});
}
assert.deepEqual(largestOther,r(19913,20000));assert.equal(exponents.find(e=>e.sector==='QQ').first,'20163/20000');
console.log(`exact x^0.277 by x^0.467 budget: QQ first=20163/20000; largest other=${fmt(largestOther)}; largest other+3tau=${fmt(plus(largestOther,times(r(3),tau)))} < 1 for tau=${fmt(tau)}`);
const artifact={schema:1,producer:'research/coefficient-structure-validation.js',source:'research/data-reuse/factor-windows.json',sourceSha256,classifications,multipleRepeated,nonSquarefree,norms,toy:{x,D,E,V,Z,cells,g2,names,raw,density,endpoint,direct},windows,exponents};
fs.writeFileSync(path.join(__dirname,'data-reuse/coefficient-structure.json'),JSON.stringify(artifact)+'\n');
console.log('Saved data-reuse/coefficient-structure.json. No full residual bound or twin lower bound tested.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/coefficient-structure-validation.js
//   invocation:  node research/coefficient-structure-validation.js
//   code-sha256: 153fb7bf2c785e792ad7f51198b359263efad8fbea19cdb982b0adb0dad537b3
//   out-sha256:  1434fcf54b108cedcf190cc655ed7ef538bff0125e8f0bf02414cb36ff2c86c0
//   body-lines:  14
//   inputs:      research/data-reuse/factor-windows.json@fa30e65431c2
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-05
//   elapsed:     0.6 s
// ============================================================================
// input: data-reuse/factor-windows.json sha256=fa30e65431c2f9fa7b66a4e3cf7eb44cdcc912c4de19b97d56dfbf279030b98b
// norm D=5 W=4: B support=6 <= 10; Q top energy=2.894351 >= witness=2.413898 from 2 pairs; Q/(DW log W)=0.104392
// norm D=16 W=16: B support=45 <= 84; Q top energy=145.208731 >= witness=98.630936 from 16 pairs; Q/(DW log W)=0.204582
// norm D=64 W=64: B support=410 <= 685; Q top energy=5946.998849 >= witness=3966.530688 from 264 pairs; Q/(DW log W)=0.349109
// norm D=128 W=128: B support=1157 <= 1902; Q top energy=30802.367670 >= witness=20685.579293 from 1009 pairs; Q/(DW log W)=0.387472
// norm D=256 W=256: B support=2785 <= 4601; Q top energy=143183.713443 >= witness=97939.189220 from 3580 pairs; Q/(DW log W)=0.394002
// classification: 172584 exact log-prime identities; 4403 nonzero nonsquarefree coefficients; 9718 inputs with two repeated primes vanish
// nonsquarefree signs: D=5 W=4 gives B(12)=-log(2), B(28)=+log(2); discarding this sector is not an identity
// toy x=4096: 1619 CRT cells (595 gcd=2), all 16 sectors reproduce; R=461.652140156, density=455.504935205, endpoint=6.147204950, QQ endpoint=-6.294308087
// archived q=97: D=14 E=92, 790 partners, R/partner=0.086558645, raw QQ/partner=0.000000000; raw QQ is not its endpoint error
// archived q=997: D=46 E=648, 4096 partners, R/partner=-0.033108406, raw QQ/partner=0.009877710; raw QQ is not its endpoint error
// archived q=9973: D=178 E=6247, 4096 partners, R/partner=0.507719849, raw QQ/partner=-0.000297641; raw QQ is not its endpoint error
// exact x^0.277 by x^0.467 budget: QQ first=20163/20000; largest other=19913/20000; largest other+3tau=19973/20000 < 1 for tau=1/1000
// Saved data-reuse/coefficient-structure.json. No full residual bound or twin lower bound tested.
// ============================================================================
// READINGS
