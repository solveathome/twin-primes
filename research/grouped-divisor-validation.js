// GROUPED DIVISOR MOMENT — general gcd averages, full coefficients and exact cuts.
// Companion: grouped-divisor-moment.md. Finite checks do not establish a rate.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const started=Date.now(),cap=()=>assert(Date.now()-started<600000,'ten-minute validation cap');
const bytes=fs.readFileSync(path.join(__dirname,'data-reuse/factor-windows.json'));
const saved=JSON.parse(bytes),sourceSha256=crypto.createHash('sha256').update(bytes).digest('hex');
assert.equal(saved.schema,1);
function gcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;}
// All Number gcd inputs in the finite proxy sweep are integers below 32768.
function gn(a,b){a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a;}
const mod=(a,c)=>(a%c+c)%c;
function inv(a,c){if(c===1n)return 0n;let b=c,s=1n,t=0n;while(b){const q=a/b;[a,b]=[b,a-q*b];[s,t]=[t,s-q*t];}assert.equal(a,1n);return mod(s,c);}
function factor(n){const out=[];for(const p of saved.basePrimes){if(p*p>n)break;if(n%p)continue;let k=0;do{n/=p;k++;}while(n%p===0);out.push([p,k]);}if(n>1)out.push([n,1]);return out;}
const mu=n=>{const f=factor(n);return f.some(([,k])=>k>1)?0:(-1)**f.length;};
const tau=n=>factor(n).reduce((a,[,k])=>a*(k+1),1);
const add=(a,b)=>[a[0]+b[0],a[1]+b[1]],sub=(a,b)=>[a[0]-b[0],a[1]-b[1]],scale=(a,k)=>[a[0]*k,a[1]*k];
const mul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]],conj=a=>[a[0],-a[1]],norm=a=>a[0]**2+a[1]**2;
function phase(a,c){const t=2*Math.PI*Number(mod(a,c))/Number(c);return[Math.cos(t),Math.sin(t)];}
function near(a,b,mass=1){assert(Math.abs(a-b)<=2e-8*Math.max(1,mass),`${a} != ${b}`);}
function close(a,b,mass=1){near(a[0],b[0],mass);near(a[1],b[1],mass);}
let harmonicChecks=0;
for(let l=1;l<=1024;l++)for(const A of [1,2,4,8,16,32,64,128])for(const alpha of [.5,1]){
 let s=0;for(let h=A;h<2*A;h++)s+=gn(h,l)**alpha;
 assert(s<=2*A*tau(l)+1e-9);harmonicChecks++;
}
console.log(`input: factor-windows.json sha256=${sourceSha256}`);
console.log(`general harmonic gcd averages: ${harmonicChecks} checks, including composite and repeated-prime divisors`);

let proxyPairs=0;const proxyRows=[];
for(const N of [4,8,16,32,64])for(const A of [1,2,4,8,16,32])for(const theta of [1,2]){
 const bands=new Map();
 for(let u=N+1;u<=2*N;u++)for(let v=N+1;v<=2*N;v++){
  const j=gn(u,v),l1=u/j,l2=v/j,c=j*l1*l2,J=2**Math.floor(Math.log2(j));
  if(!bands.has(J))bands.set(J,{J,weil:0,period:0,zeroPairs:0,nonzeroPairs:0,maxTauR:0});
  const row=bands.get(J);
  for(let h1=A;h1<2*A;h1++)for(let h2=A;h2<2*A;h2++){
   const R=h1*l2-h2*l1;proxyPairs++;
   if(!R){row.zeroPairs++;continue;}
   const G=gn(theta*R,c);
   assert(G<=2*gn(R,j)*gn(h1,l1)*gn(h2,l2));
   row.weil+=Math.sqrt(c*G)/(A*A);row.period+=G/(c*A*A);row.nonzeroPairs++;
   row.maxTauR=Math.max(row.maxTauR,tau(Math.abs(R)));
  }
 }
 for(const row of bands.values()){
  const L=N/row.J;let rootSum=0,inverseSum=0;
  for(let l=Math.floor(L/2)+1;l<=2*L;l++){rootSum+=Math.sqrt(l)*tau(l);inverseSum+=tau(l)/l;}
  row.weilBound=16*row.J**1.5*row.maxTauR*rootSum**2;
  row.periodBound=16*row.maxTauR*inverseSum**2;
  assert(row.weil<=row.weilBound+1e-8);assert(row.period<=row.periodBound+1e-8);
  proxyRows.push({N,A,theta,...row});
 }cap();
}
console.log(`nonzero completion proxies: ${proxyPairs} ordered pairs, ${proxyRows.length} independently bounded common-divisor bands`);

// Build original divisor/convolution records, independently of aggregation.
function records(D,W,kind,s,t){const out=[];for(let e=D+1;e<=2*D;e++){
 const z=scale([Math.cos(t*Math.log(e)),-Math.sin(t*Math.log(e))],mu(e)*e**(-s));if(!norm(z))continue;
 if(kind===0){out.push({l:e,z});continue;}
 out.push({l:e,z:scale(z,-Math.log(e))});
 for(const p of saved.basePrimes){if(p>W)break;for(let r=p;r<=W;r*=p)out.push({l:e*r,z:scale(z,-Math.log(p))});}
 }return out;}
const controls={missingPeriod:0,missingConjugate:0,wrongReciprocalShift:0,droppedVerticalCut:0,doubleCountedUnion:0};
let momentChecks=0,pairKernels=0,rawCoefficientChecks=0,powerEntries=0,lowEntries=0;const momentRows=[];
for(const cfg of [{D:4,W:9,L:4},{D:8,W:16,L:8},{D:8,W:16,L:32}])for(const gg of [1,2])for(const orientation of ['right','left'])for(const [s,t] of [[0,0],[.05,7.3]])for(const kind of [0,1])for(const A of [1,4]){
 const N=cfg.L/gg,M=A===1?13:61,g=BigInt(gg),theta=2n/g,sgn=orientation==='right'?-1n:1n,shift=orientation==='right'?0n:2n;
 const raw=records(cfg.D,cfg.W,kind,s,t).filter(o=>o.l%gg===0&&o.l/gg>N&&o.l/gg<=2*N),beta=new Map();
 for(const o of raw){const u=o.l/gg;beta.set(u,add(beta.get(u)||[0,0],o.z));}
 for(const [u,z] of beta){assert(Math.sqrt(norm(z))<=(kind?2*Math.log(gg*u):1)+1e-10);rawCoefficientChecks++;if(factor(gg*u).some(([,k])=>k>1))powerEntries++;else lowEntries++;}
 const hs=Array.from({length:A},(_,k)=>A+k),ms=Array.from({length:M},(_,k)=>BigInt(M+k+1));
 const invs=new Map();function cached(m,c){const key=`${m}/${c}`;if(!invs.has(key))invs.set(key,inv(mod(m,c),c));return invs.get(key);}
 function phi(u,h,m,delta=shift){return sub(phase(h*(256n-delta),g*m*u),phase(h*(487n-delta),g*m*u));}
 const atoms=[];
 for(const [uu,z] of beta)for(const hh of hs){const u=BigInt(uu),h=BigInt(hh),weight=mul(z,[0,1/hh]);
  const ps=ms.map(m=>phi(u,h,m)),kernels=ms.map((m,k)=>gcd(m,u)===1n?mul(phase(sgn*theta*h*cached(m,u),u),ps[k]):[0,0]);
  if(orientation==='left')for(let k=0;k<ms.length;k++){const m=ms[k];if(gcd(m,u)!==1n)continue;
   const native=mul(phase(-theta*h*cached(u,m),m),phi(u,h,m,0n));close(native,kernels[k],4);
   const wrong=mul(phase(theta*h*cached(m,u),u),phi(u,h,m,0n));if(Math.hypot(...sub(wrong,native))>1e-7)controls.wrongReciprocalShift++;
  }
  atoms.push({u,h,weight,ps,kernels});
 }
 let direct=0,wrongConjugate=[0,0],absoluteMass=0;
 for(let k=0;k<ms.length;k++){
  let grouped=[0,0],original=[0,0];
  for(const a of atoms)grouped=add(grouped,mul(a.weight,a.kernels[k]));
  const m=ms[k];for(const o of raw){const u=BigInt(o.l/gg);if(gcd(m,u)!==1n)continue;for(const hh of hs){const h=BigInt(hh),kernel=mul(phase(sgn*theta*h*cached(m,u),u),phi(u,h,m));original=add(original,mul(mul(o.z,[0,1/hh]),kernel));}}
  close(grouped,original,100);direct+=norm(original);wrongConjugate=add(wrongConjugate,mul(original,original));
 }
 let zero=[0,0],nonzero=[0,0];
 for(const a of atoms)for(const b of atoms){const j=gcd(a.u,b.u),l1=a.u/j,l2=b.u/j,c=j*l1*l2,R=a.h*l2-b.h*l1;let kernel=[0,0];
  for(let k=0;k<ms.length;k++){const m=ms[k];if(gcd(m,c)!==1n)continue;
   kernel=add(kernel,mul(phase(sgn*theta*R*cached(m,c),c),mul(a.ps[k],conj(b.ps[k]))));
  }
  const z=mul(mul(a.weight,conj(b.weight)),kernel);absoluteMass+=Math.hypot(...z);
  if(R===0n)zero=add(zero,z);else nonzero=add(nonzero,z);pairKernels++;
 }
 close(add(zero,nonzero),[direct,0],absoluteMass);
 if(Math.hypot(...sub(wrongConjugate,[direct,0]))>1e-7)controls.missingConjugate++;
 const f=Math.min(1,A*512/(M*N)),scaleBudget=f*f*(M*N/A+(1+A*512/(M*N))*(N**3+M));
 momentRows.push({...cfg,N,M,g:gg,orientation,s,t,kind,A,rawRecords:raw.length,aggregated:beta.size,direct,zero,nonzero,absoluteMass,scaleBudget});momentChecks++;cap();
}
// A nonzero numerator divisible by the modulus needs the period term.
let periodSum=0;for(let m=1;m<=3000;m++)if(gn(m,6)===1)periodSum++;
assert(periodSum>tau(6)*Math.sqrt(6*6)*Math.log(12));controls.missingPeriod++;
assert(powerEntries>0&&lowEntries>0);
console.log(`full coefficient moments: ${momentChecks} reconstructions, ${pairKernels} pair kernels, ${rawCoefficientChecks} coefficient bounds; repeated-prime entries=${powerEntries}`);

function rat(n,d=1){n=BigInt(n);d=BigInt(d);const k=gcd(n,d);return[n/k,d/k];}
const ra=(a,b)=>rat(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),rm=(a,b)=>rat(a[0]*b[0],a[1]*b[1]);
const rs=(a,b)=>ra(a,[-b[0],b[1]]),sum=(...as)=>as.reduce(ra,rat(0)),cmp=(a,b)=>a[0]*b[1]-b[0]*a[1],fmt=a=>`${a[0]}/${a[1]}`;
function right(d,e){const a=ra(d,rat(6,25)),b=ra(e,rat(1,20));return[rm(rat(1,2),ra(rat(1),a)),sum(rm(rat(1,2),a),rm(rat(3,2),b)),a];}
let gridChecks=0,newPoints=0;
for(let i=240;i<=760;i+=2)for(let j=50;j<=950;j+=2){const d=rat(i,1000),e=rat(j,1000),budgets=right(d,e),covered=budgets.every(b=>cmp(b,rat(1))<0n);
 assert.equal(covered,cmp(d,rat(19,25))<0n&&cmp(sum(d,rm(rat(3),e)),rat(161,100))<0n);
 const old=cmp(ra(d,e),rat(19,25))<0n||cmp(sum(rm(rat(5),d),rm(rat(2),e)),rat(123,50))<0n;
 if(covered&&!old)newPoints++;gridChecks++;
}
const benchmark=right(rat(2,5),rat(2,5)),next=right(rat(8,25),rat(9,20));
assert.deepEqual(benchmark.map(fmt),['41/50','199/200','16/25']);assert.deepEqual(next.map(fmt),['39/50','103/100','14/25']);
const largeGcd=rs(next[1],rat(3,80));assert.equal(fmt(largeGcd),'397/400');
const vertical=right(rat(19,25),rat(1,20));assert.equal(fmt(vertical[0]),'1/1');
assert(cmp(sum(rat(19,25),rm(rat(3),rat(1,20))),rat(321,200))<0n);controls.droppedVerticalCut++;
const uniformEdge={d:rat(8,25),e:rat(11,25)};
assert.equal(fmt(ra(uniformEdge.d,uniformEdge.e)),'19/25');
assert(cmp(sum(rm(rat(5),uniformEdge.d),rm(rat(2),uniformEdge.e)),rat(123,50))>0n);
assert(cmp(sum(uniformEdge.d,rm(rat(3),uniformEdge.e)),rat(161,100))>0n);
console.log(`coverage: ${gridChecks} rational grid points; ${newPoints} points added on this grid; benchmark=${benchmark.map(fmt).join(',')}; next=${next.map(fmt).join(',')}`);

function iroot(n,k){let lo=0n,hi=1n;while(hi**k<=n)hi*=2n;while(hi-lo>1n){const m=(lo+hi)/2n;if(m**k<=n)lo=m;else hi=m;}return lo;}
const cut=(x,p,q)=>iroot(BigInt(x)**BigInt(p),BigInt(q));
function terms(n,f,U,W){let ds=[{d:1,sign:1,used:[]}];for(let i=0;i<f.length;i++){const old=ds.length;for(let j=0;j<old;j++)ds.push({d:ds[j].d*f[i][0],sign:-ds[j].sign,used:[...ds[j].used,i]});}
 const out=[];for(const z of ds){if(z.d<=U||n/z.d<=W)continue;let beta=0;for(let i=0;i<f.length;i++){const[p,k]=f[i];let r=1;for(let v=1;v<=k-Number(z.used.includes(i));v++){r*=p;if(r>W)beta+=Math.log(p);}}if(beta)out.push({...z,beta});}return out;
}
let maskChecks=0,newOnlyPairs=0;const windows=[];
for(const win of saved.windows){const{x,lo,hi,factorStart,primePowerFactors}=win,U=Number(cut(x,6,25)),Y=Number(cut(x,1,20));
 const L=cut(x,3,4),K=cut(x,49,20),Dcut=cut(x,151,200),Ccut=cut(x,321,200),counts=Array(8).fill(0),sums=Array(8).fill(0);let total=0,mass=0,unionDirect=0;
 for(let n=lo;n<=hi;n++){
  const left=terms(n,primePowerFactors[n-factorStart],U,U),rightTerms=terms(n-2,primePowerFactors[n-2-factorStart],Y,Y);
  for(const d of left)for(const e of rightTerms){const dd=BigInt(d.d),ee=BigInt(e.d),a=dd*ee<=L,b=dd**5n*ee**2n<=K,c=dd<=Dcut&&dd*ee**3n<=Ccut;
   assert.equal(c,dd<=Dcut&&dd<=Ccut/(ee**3n));
   const group=Number(a)+2*Number(b)+4*Number(c),value=d.sign*e.sign*d.beta*e.beta;
   counts[group]++;sums[group]+=value;total+=value;mass+=Math.abs(value);if(a||b||c)unionDirect+=value;if(group===4)newOnlyPairs++;maskChecks++;
  }
 }
 const weighted=pred=>sums.reduce((v,z,k)=>v+(pred(k)?z:0),0);
 const A=weighted(k=>k%2===1),B=weighted(k=>Math.floor(k/2)%2===1),C=weighted(k=>k>=4);
 const AB=weighted(k=>k%4===3),AC=weighted(k=>k>=4&&k%2===1),BC=weighted(k=>k>=6),ABC=sums[7];
 const union=A+B+C-AB-AC-BC+ABC;near(union,unionDirect,mass);near(union+sums[0],total,mass);
 if(Math.abs(A+B+C-union)>1e-6)controls.doubleCountedUnion++;
 windows.push({x,lo,hi,U,Y,L:String(L),K:String(K),Dcut:String(Dcut),Ccut:String(Ccut),counts,sums,total,mass});cap();
}
for(const [name,n] of Object.entries(controls))assert(n>0,`inactive control ${name}`);
console.log(`archived cut partitions: ${maskChecks} signed divisor pairs, ${newOnlyPairs} in the additional cut only, ${windows.length} reconstructed unions`);
console.log(`negative controls: ${Object.entries(controls).map(([k,v])=>`${k}=${v}`).join('; ')}`);
fs.writeFileSync(path.join(__dirname,'grouped-divisor-validation.json'),JSON.stringify({schema:1,scope:'Finite checks of a written classical-input proof; no rate or onset measured.',sourceSha256,harmonicChecks,proxyPairs,proxyRows,momentChecks,pairKernels,rawCoefficientChecks,powerEntries,lowEntries,momentRows,gridChecks,newPoints,benchmark:benchmark.map(fmt),next:next.map(fmt),largeGcd:fmt(largeGcd),maskChecks,newOnlyPairs,windows,controls},null,2)+'\n');
console.log('PASS: grouped moment identities, finite gcd majorants and exact cuts; global twin margin OPEN');
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/grouped-divisor-validation.js
//   invocation:  node research/grouped-divisor-validation.js
//   code-sha256: 3d4e579abc63fe89f64126a18aec382a0380f01e9384b22b0b069325910c93f8
//   out-sha256:  388a125c1bb0802f07c2f8c17e36fc60f22b80d121dc3eab530598a7b03b2102
//   body-lines:  8
//   inputs:      research/data-reuse/factor-windows.json@fa30e65431c2
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     3.4 s
// ============================================================================
// input: factor-windows.json sha256=fa30e65431c2f9fa7b66a4e3cf7eb44cdcc912c4de19b97d56dfbf279030b98b
// general harmonic gcd averages: 16384 checks, including composite and repeated-prime divisors
// nonzero completion proxies: 14894880 ordered pairs, 360 independently bounded common-divisor bands
// full coefficient moments: 96 reconstructions, 16864 pair kernels, 320 coefficient bounds; repeated-prime entries=104
// coverage: 117711 rational grid points; 14752 points added on this grid; benchmark=41/50,199/200,16/25; next=39/50,103/100,14/25
// archived cut partitions: 273177 signed divisor pairs, 28318 in the additional cut only, 3 reconstructed unions
// negative controls: missingPeriod=1; missingConjugate=80; wrongReciprocalShift=11944; droppedVerticalCut=1; doubleCountedUnion=3
// PASS: grouped moment identities, finite gcd majorants and exact cuts; global twin margin OPEN
// ============================================================================
// READINGS
// The proof is in the companion note. Grid counts and moment values are not asymptotic evidence.
