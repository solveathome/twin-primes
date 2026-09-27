// ============================================================================
// attack-0830-varE-identification.js — support for attack-0830-varE-identification.md
// The identification step of lim Var/E (Conjecture 1 of paper/variance-note.md
// section 10, delta*(X - X_dec) -> 0), taken apart by BRANCH TYPE and by
// MODULUS BAND, and the two identities the note uses checked numerically.
// ============================================================================
// WHAT THIS IS. varE-theta2-step.md writes the exact comb variance as
//   X = sum_{|h|<L} (1-|h|/L) (W(h) - 1),
//   W(h) = 6[6|h] f_5(h) D_y sum_{n0|h, n+|h-2, n-|h+2} lam0(n0) lam1(n+) lam1(n-),
// with n0, n+, n- squarefree, y-smooth, coprime to 30 (hence pairwise coprime),
// lam0(p) = 2/(p-4), lam1(p) = 1/(p-4), D_y = prod_{7<=p<=y} p(p-4)/(p-2)^2.
// Every (n0,n+,n-) is a (modulus, CRT class) pair; its Fejer-weighted count
// over the window is L/n + R_n(c) (varE-theta2-proof.md section 1), and
//   X = sum_{(n,eps)} w(n,eps) R_n(c(eps))     [the main terms sum to L exactly].
// This file bins that sum two ways at once:
//   TYPE   n=1 | c0 (only n0>1) | pure (only n+ or only n-) | mix2a (n0 and one
//          of n+-) | mix2b (n+ and n-) | mix3 (all three);
//   BAND   by n = n0 n+ n-: n <= 2L | 2L < n <= 8L | 8L < n <= L ln^2 y | above
//          (x = 19: the last two merged, the descent stops at 8L there).
// For each cell it prints COUNT = sum_h (1-|h|/L) sum_{(n,eps) in cell} w,
// MAIN = L sum_{cell} w/n, and REM = COUNT - MAIN = sum_{cell} w R_n(c).
// Row sums reproduce X, X1, 2X2 and Xmix of varE-theta2-step.md.
//
//  PART A  the CRT class of a mixed lag is a Kloosterman fraction:
//          c/n = 2( inv(n0 n-, n+)/n+ - inv(n0 n+, n-)/n- ) mod 1, and
//          c = 2 n0 v with v^2 = inv(n0)^2 mod n+ n-. BigInt, random triples.
//  PART B  the class-mean identity sum_{c mod n} R_n(c) = 0 (so MAIN is the
//          mean of COUNT over all classes), random (L, n).
//  PART C  the type x band table at x = 7, 11, 13, 17, 19, with the descent
//          for MAIN and the per-h divisor enumeration for COUNT. Checks:
//          total REM = corpus X; c0 = X1 and pure = 2 X2 of varE-theta2-step.
//  PART D  the n > 2L COUNT of the mixed types rebuilt from the ROOTS: sum over
//          (n,eps) with n > 2L of w (L - ||c'||_{30n})^+ / L, c' the class
//          mod 30n, at x = 7 and 11. This is the identity the note's section 3
//          rests on.
//  PART E  the sizes against ln y: REM per type and band against ln y, ln^2 y,
//          MAIN of mix3 above 2L against ln^3 y, and the share of the mixed
//          COUNT sitting above L ln^2 y.
// No wall-clock figure is printed.
//   node research/history/staging/attack-0830-varE-identification.js
// ============================================================================
'use strict';
function assert(c,m){ if(!c) throw new Error('ASSERT FAIL: '+m); }
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
function inv(a,m){ // BigInt modular inverse of a mod m
  a=BigInt(a); m=BigInt(m); let r0=m,r1=((a%m)+m)%m,s0=0n,s1=1n;
  while(r1!==0n){const q=r0/r1;[r0,r1]=[r1,r0-q*r1];[s0,s1]=[s1,s0-q*s1];}
  assert(r0===1n,'inverse exists'); return ((s0%m)+m)%m;
}
function invN(a,p){ // Number inverse of a mod a small prime p
  a=((a%p)+p)%p; let r0=p,r1=a,s0=0,s1=1; while(r1){const q=Math.floor(r0/r1);[r0,r1]=[r1,r0-q*r1];[s0,s1]=[s1,s0-q*s1];} assert(r0===1,'invN'); return ((s0%p)+p)%p; }
function inv6(p){return invN(6,p)}
function gcdB(a,b){while(b){[a,b]=[b,a%b]}return a}
class Kah{constructor(){this.s=0;this.c=0}add(v){const y=v-this.c,t=this.s+y;this.c=(t-this.s)-y;this.s=t}get(){return this.s}}
let seed=20260830>>>0; const rng=()=>((seed=(1664525*seed+1013904223)>>>0)/4294967296);
const rnd=(a,b)=>a+Math.floor(rng()*(b-a+1));
const f6=v=>v.toFixed(6), f4=v=>v.toFixed(4), f3=v=>v.toFixed(3);
const pad=(s,n)=>String(s).padStart(n);

// levels: L = x#, y = largest prime <= sqrt(L). The corpus X, delta*X1,
// delta*X2, delta*Xmix are READ from varE-theta2-step.md sections 4-5 (its
// embedded PART 2 and PART 3), recomputed nowhere here.
const LV=[
 {x:7, L:210,     X:4.612929,   dX1:0.205517, dX2:0.094199, dXm:-0.241840},
 {x:11,L:2310,    X:15.073187,  dX1:0.293618, dX2:0.047843, dXm:-0.133037},
 {x:13,L:30030,   X:29.557928,  dX1:0.322208, dX2:0.027019, dXm:-0.076748},
 {x:17,L:510510,  X:51.400255,  dX1:0.345842, dX2:0.017012, dXm:-0.053095},
 {x:19,L:9699690, X:81.289135,  dX1:0.363348, dX2:0.011379, dXm:-0.038804},
];
const TYPES=['n=1','c0','pure','mix2a','mix2b','mix3'];
const typeOf=(b0,bp,bm)=> (!b0&&!bp&&!bm)?0 : (b0&&!bp&&!bm)?1 : (!b0&&(bp!==bm))?2 : (b0&&(bp!==bm))?3 : (!b0&&bp&&bm)?4 : 5;

// ---------------------------------------------------------------------------
console.log('=== PART A: the mixed CRT class is a Kloosterman fraction ===');
console.log('  c = 0 (n0), 2 (n+), -2 (n-)  <=>  c/n = 2( inv(n0 n-, n+)/n+ - inv(n0 n+, n-)/n- ) mod 1');
console.log('                                <=>  c = 2 n0 v,  v = inv(n0) (n+),  v = -inv(n0) (n-),  so v^2 = inv(n0)^2 (n+ n-)');
{
  let tests=0, worst1=0n, worst2=0n;
  const ps=primesUpTo(400).filter(p=>p>=7);
  const pick=()=>{let m=1n;for(const p of ps) if(rng()<0.08) m*=BigInt(p); return m;};
  for(let t=0;t<3000;t++){
    let n0,np,nm; do{n0=pick();np=pick();nm=pick();}while(gcdB(n0,np)!==1n||gcdB(n0,nm)!==1n||gcdB(np,nm)!==1n||np===1n||nm===1n);
    const n=n0*np*nm;
    const c=((2n*n0*nm*inv(n0*nm,np) - 2n*n0*np*inv(n0*np,nm))%n+n)%n;
    assert(c%n0===0n && c%np===2n && ((c+2n)%nm)===0n,'CRT class');
    const a=inv(n0*nm,np), b=inv(n0*np,nm);
    const c2=((2n*(a*n0*nm - b*n0*np))%n+n)%n;             // c/n = 2(a/np - b/nm) mod 1
    const d1=(c-c2+n)%n; if(d1>worst1)worst1=d1;
    const m=np*nm;
    const v=((inv(n0,np)*nm*inv(nm,np) - inv(n0,nm)*np*inv(np,nm))%m+m)%m;
    const c3=((2n*n0*v)%n+n)%n;
    const d2=(c-c3+n)%n; if(d2>worst2)worst2=d2;
    const in0=inv(n0,m); assert((v*v-in0*in0)%m===0n,'v^2 = inv(n0)^2 mod n+ n-');
    tests++;
  }
  console.log('  random coprime triples tested: '+tests+'   worst residual (fraction form) = '+worst1+'   (root form) = '+worst2);
  assert(worst1===0n&&worst2===0n,'Kloosterman-fraction form of the mixed class');
  console.log('  => with n- = 1 the class is c/n = 2 inv(n0)/n+ mod 1, the phase of the additive divisor problem.');
}

// ---------------------------------------------------------------------------
console.log('\n=== PART B: the class mean of R_n is zero ===');
console.log('  R_n(c) = [(r-c)^+ + (r+c-n)^+ - r^2/n]/L, r = L mod n;  sum_{c mod n} R_n(c) = 0');
{
  let worst=0, tests=0;
  for(let t=0;t<2000;t++){
    const L=rnd(1,600), n=rnd(1,1500), r=L%n; let s=0;
    for(let c=0;c<n;c++) s+=(Math.max(0,r-c)+Math.max(0,r+c-n)-r*r/n)/L;
    worst=Math.max(worst,Math.abs(s)); tests++;
  }
  console.log('  random (L,n) tested: '+tests+'   worst |class sum| = '+worst.toExponential(2));
  assert(worst<1e-9,'class mean of R_n');
  console.log('  => MAIN = L w/n is exactly the average of COUNT over the n classes: REM is a discrepancy, not a size.');
}

// ---------------------------------------------------------------------------
console.log('\n=== PART C: X by branch type and modulus band, five exact levels ===');
const RES=[];
for(const lv of LV){
  const {x,L}=lv; const K=L/6;
  const y=(()=>{let b=2;for(const p of primesUpTo(Math.floor(Math.sqrt(L))+1))if(p*p<=L)b=p;return b;})();
  const allp=primesUpTo(y), ps=allp.filter(p=>p>=7), np=ps.length, lny=Math.log(y);
  let delta=1; for(const p of allp){const a=(p===2||p===3)?1:(p===5?2:p-2); delta*=a/p;}
  let D=1; for(const p of ps) D*=p*(p-4)/((p-2)*(p-2));
  const lam0=new Float64Array(np), lam1=new Float64Array(np);
  for(let i=0;i<np;i++){lam0[i]=2/(ps[i]-4);lam1[i]=1/(ps[i]-4);}
  const edges=(x===19)?[2*L,8*L]:[2*L,8*L,L*lny*lny];
  const NB=edges.length+1;
  const bnames=['n<=2L','2L<n<=8L'].concat(x===19?['n>8L']:['8L<n<=Lln2y','n>L ln^2 y']);
  const bandOf=n=>{let b=0;while(b<edges.length&&n>edges[b])b++;return b;};
  // --- COUNT: per-h divisor enumeration over k = h/6, 0 < h < L, doubled for -h
  const cnt=[new Int32Array(K),new Int32Array(K),new Int32Array(K)]; // primes of 6k | 6k-2 (n+) | 6k+2 (n-)
  const starts=(p)=>{const i6=inv6(p);return [p,(2*i6)%p||p,((p-2)*i6)%p||p];};
  for(let i=0;i<np;i++){const p=ps[i],st=starts(p); for(let j=0;j<3;j++)for(let k=st[j];k<K;k+=p)cnt[j][k]++;}
  const off=[],lst=[];
  for(let j=0;j<3;j++){const o=new Int32Array(K+1);for(let k=0;k<K;k++)o[k+1]=o[k]+cnt[j][k];off.push(o);lst.push(new Uint16Array(o[K]));cnt[j].fill(0);}
  for(let i=0;i<np;i++){const p=ps[i],st=starts(p); for(let j=0;j<3;j++)for(let k=st[j];k<K;k+=p)lst[j][off[j][k]+cnt[j][k]++]=i;}
  const COUNT=[],MAIN=[]; for(let t=0;t<6;t++){COUNT.push([]);MAIN.push([]);for(let b=0;b<NB;b++){COUNT[t].push(new Kah());MAIN[t].push(new Kah());}}
  const subs=(j,k)=>{const a=off[j][k],b=off[j][k+1]; const out=[[1,1]];
    for(let q=a;q<b;q++){const i=lst[j][q],p=ps[i],lm=(j===0?lam0[i]:lam1[i]); const len=out.length; for(let s=0;s<len;s++)out.push([out[s][0]*p,out[s][1]*lm]);} return out;};
  for(let k=1;k<K;k++){
    const r5=k%5, f5=(r5===0)?2.5:((r5===1||r5===4)?1.25:0); if(f5===0) continue;   // h = 6k, h mod 5 = k mod 5
    const base=2*(1-6*k/L)*6*f5*D;
    const S0=subs(0,k),SP=subs(1,k),SM=subs(2,k);
    for(const [a0,w0] of S0){const b0=a0>1; for(const [ap,wp] of SP){const bp=ap>1; for(const [am,wm] of SM){
      COUNT[typeOf(b0,bp,am>1)][bandOf(a0*ap*am)].add(base*w0*wp*wm);
    }}}
  }
  // --- MAIN: descent over triples with n <= last edge; closed totals above
  const descTo=edges[edges.length-1];
  const ms=[]; for(let t=0;t<6;t++){ms.push([]);for(let b=0;b<NB;b++)ms[t].push(new Kah());}
  const c0lam=[]; for(let b=0;b<NB;b++)c0lam.push(new Kah());   // sum lam0(n0) by band, for the h = 0 term
  let nodes=0;
  (function desc(i,n,w,b0,bp,bm,wl0){
    nodes++; const b=bandOf(n); ms[typeOf(b0,bp,bm)][b].add(w/n); if(!bp&&!bm) c0lam[b].add(wl0);
    for(let j=i;j<np;j++){const p=ps[j]; const n2=n*p; if(n2>descTo) break;
      desc(j+1,n2,w*lam0[j],true,bp,bm,wl0*lam0[j]);
      desc(j+1,n2,w*lam1[j],b0,true,bm,0);
      desc(j+1,n2,w*lam1[j],b0,bp,true,0);
    }
  })(0,1,1,false,false,false,1);
  const P=S=>{let v=1;for(const p of ps){const a=2/(p*(p-4)),b=1/(p*(p-4));v*=1+(S.includes(0)?a:0)+(S.includes(1)?b:0)+(S.includes(2)?b:0);}return v;};
  const T={}; T['n=1']=1; T.c0=P([0])-1; T.pure=2*(P([1])-1); T.mix2a=2*(P([0,1])-P([0])-P([1])+1); T.mix2b=P([1,2])-2*P([1])+1;
  T.mix3=P([0,1,2])-P([0,1])-P([0,2])-P([1,2])+P([0])+P([1])+P([2])-1;
  let totAll=0; for(const t of TYPES) totAll+=T[t]; assert(Math.abs(totAll*D-1)<1e-12,'type totals sum to 1/D_y');
  let lam0tot=1; for(const p of ps) lam0tot*=1+2/(p-4);
  for(let t=0;t<6;t++){let acc=0; for(let b=0;b<NB-1;b++){MAIN[t][b].add(L*D*ms[t][b].get()); acc+=ms[t][b].get();} MAIN[t][NB-1].add(L*D*(T[TYPES[t]]-acc));}
  {let acc=0; for(let b=0;b<NB-1;b++){const v=c0lam[b].get(); acc+=v; if(b===0){COUNT[0][0].add(6*2.5*D); COUNT[1][0].add(6*2.5*D*(v-1));} else COUNT[1][b].add(6*2.5*D*v);} COUNT[1][NB-1].add(6*2.5*D*(lam0tot-acc));}
  const R={x,y,L,delta,D,lny,NB,bnames,nodes,COUNT:COUNT.map(r=>r.map(k=>k.get())),MAIN:MAIN.map(r=>r.map(k=>k.get()))};
  RES.push(R);
  console.log('\n  x = '+x+'   L = '+L+'   y = '+y+'   ln y = '+f3(lny)+'   primes 7..y: '+np+'   descent nodes = '+nodes);
  console.log('  '+pad('type',6)+' | '+pad('band',12)+' | '+pad('COUNT',14)+' | '+pad('MAIN',14)+' | '+pad('REM',12)+' | '+pad('delta*REM',10));
  let totR=0,totM=0; const rowR=[];
  for(let t=0;t<6;t++){let rr=0; for(let b=0;b<NB;b++){const c=R.COUNT[t][b],m=R.MAIN[t][b],r=c-m; rr+=r; totM+=m;
      console.log('  '+pad(TYPES[t],6)+' | '+pad(bnames[b],12)+' | '+pad(f6(c),14)+' | '+pad(f6(m),14)+' | '+pad(f6(r),12)+' | '+pad(f6(delta*r),10)); }
    rowR.push(rr); totR+=rr; console.log('  '+pad(TYPES[t],6)+' | '+pad('ALL',12)+' | '+pad('',14)+' | '+pad('',14)+' | '+pad(f6(rr),12)+' | '+pad(f6(delta*rr),10)); }
  console.log('  sum MAIN = '+f6(totM)+'  (= L = '+L+')   sum REM = '+f6(totR)+'   corpus X = '+lv.X+'   rel diff = '+(Math.abs(totR-lv.X)/lv.X).toExponential(1));
  assert(Math.abs(totM-L)<1e-6*L,'main terms sum to L');
  assert(Math.abs(totR-lv.X)/lv.X<2e-6,'total REM reproduces the corpus X at x='+x);
  const X1=rowR[0]+rowR[1], X2=rowR[0]+rowR[2]/2, Xm=rowR[3]+rowR[4]+rowR[5]-2*rowR[0];
  console.log('  theta2-step groups: delta*X1 = '+f6(delta*X1)+' (corpus '+lv.dX1+')   delta*(X - X1) = '+f6(delta*(totR-X1))+' (corpus 2*dX2 + dXmix = '+f6(2*lv.dX2+lv.dXm)+')');
  console.log('  symmetric split of X - X1:  delta*X2 each = '+f6(delta*X2)+' (corpus column '+lv.dX2+')   delta*Xmix = '+f6(delta*Xm)+' (corpus column '+lv.dXm+')   [see PART F]');
  assert(Math.abs(delta*X1-lv.dX1)<2e-6&&Math.abs(delta*(totR-X1)-(2*lv.dX2+lv.dXm))<3e-6,'X1 and X - X1 reproduce varE-theta2-step at x='+x);
  R.X1=X1;R.X2=X2;R.Xm=Xm;R.rowR=rowR;
}

// ---------------------------------------------------------------------------
console.log('\n=== PART D: the n > 2L COUNT of the mixed types, rebuilt from the ROOTS ===');
console.log('  COUNT_{>2L}(type) = sum_{(n,eps) in type, n > 2L} sum_{c5} 6 f5(c5) D_y lam.lam.lam (L - ||c\'||_{30n})^+ / L,  c\' = class mod 30n');
for(const lv of LV.slice(0,2)){
  const {x,L}=lv; const R=RES.find(r=>r.x===x); const y=R.y, D=R.D;
  const ps=primesUpTo(y).filter(p=>p>=7), np=ps.length;
  const C5=[0,1,4], F5=[2.5,1.25,1.25];           // h mod 5 and f5
  const acc=[0,0,0]; let pats=0;
  // incremental CRT: state (M = 30 n as BigInt, classes cc[j] mod M for the three c5), n as double
  const c0=C5.map(c5=>{ // h = 0 mod 6, h = c5 mod 5  -> class mod 30
    for(let h=0;h<30;h++) if(h%6===0&&h%5===c5) return BigInt(h); });
  (function rec(i,M,cc,n,w,b0,bp,bm){
    if(i===np){
      const tp=typeOf(b0,bp,bm); if(tp<3||n<=2*L) return; pats++;
      for(let j=0;j<3;j++){let d=cc[j]; if(d>M-d)d=M-d; const dn=Number(d); if(dn<L) acc[tp-3]+=6*F5[j]*D*w*(L-dn)/L;}
      return;
    }
    const p=ps[i], P=BigInt(p);
    rec(i+1,M,cc,n,w,b0,bp,bm);
    const Mp=M*P, mN=Number(M%P), im=invN(mN,p);
    const lift=(eps)=>cc.map(c=>{const cN=Number(c%P); const t=(((eps-cN)%p+p)%p)*im%p; return c+M*BigInt(t);});
    rec(i+1,Mp,lift(0),n*p,w*2/(p-4),true,bp,bm);
    rec(i+1,Mp,lift(2),n*p,w/(p-4),b0,true,bm);
    rec(i+1,Mp,lift(p-2),n*p,w/(p-4),b0,bp,true);
  })(0,30n,c0,1,1,false,false,false);
  const fromH=[3,4,5].map(t=>{let s=0;for(let b=1;b<R.NB;b++)s+=R.COUNT[t][b];return s;});
  console.log('  x = '+x+'   (n,eps) with n > 2L in the mixed types: '+pats);
  for(let j=0;j<3;j++){ console.log('    '+pad(TYPES[3+j],6)+'  from the roots = '+f6(acc[j])+'   from the h-sum = '+f6(fromH[j])+'   diff = '+(acc[j]-fromH[j]).toExponential(1)); assert(Math.abs(acc[j]-fromH[j])<1e-7*Math.max(1,Math.abs(fromH[j])),'root form reproduces the h-sum, type '+TYPES[3+j]+' at x='+x); }
}
console.log('  => above 2L the mixed COUNT is the mass of the root measure inside the window bump, exactly.');

// ---------------------------------------------------------------------------
console.log('\n=== PART E: sizes against ln y ===');
console.log('  mixed = mix2a + mix2b + mix3.  REM by band; MAIN of mix3 and of mix2a+mix2b above 2L');
console.log('   x |  ln y | REM mix n<=2L | REM mix n>2L | REM mix total |  /ln y  | /ln^2 y | MAIN mix3 >2L | /ln^3 y | MAIN mix2 >2L | /ln^2 y');
for(const R of RES){
  const lo=[3,4,5].reduce((s,t)=>s+R.COUNT[t][0]-R.MAIN[t][0],0);
  let hi=0,m3=0,m2=0; for(let b=1;b<R.NB;b++){hi+=[3,4,5].reduce((s,t)=>s+R.COUNT[t][b]-R.MAIN[t][b],0); m3+=R.MAIN[5][b]; m2+=R.MAIN[3][b]+R.MAIN[4][b];}
  const l=R.lny;
  console.log('  '+pad(R.x,2)+' | '+pad(f3(l),5)+' | '+pad(f4(lo),13)+' | '+pad(f4(hi),12)+' | '+pad(f4(lo+hi),13)+' | '+pad(f4((lo+hi)/l),7)+' | '+pad(f4((lo+hi)/l/l),7)+' | '+pad(f4(m3),13)+' | '+pad(f4(m3/l/l/l),7)+' | '+pad(f4(m2),13)+' | '+pad(f4(m2/l/l),7));
}
console.log('\n  the absolute size of the mixed REM by type, and the two bands against ln y:');
console.log('   x | mix2a REM | mix2b REM | mix3 REM | mix n<=2L /ln y | mix n>2L /ln y |   2X2  |    X1   | delta*Xmix');
for(const R of RES){ const lo=[3,4,5].reduce((s,t)=>s+R.COUNT[t][0]-R.MAIN[t][0],0); let hi=0; for(let b=1;b<R.NB;b++)hi+=[3,4,5].reduce((s,t)=>s+R.COUNT[t][b]-R.MAIN[t][b],0);
  console.log('  '+pad(R.x,2)+' | '+pad(f4(R.rowR[3]),9)+' | '+pad(f4(R.rowR[4]),9)+' | '+pad(f4(R.rowR[5]),8)+' | '+pad(f4(lo/R.lny),15)+' | '+pad(f4(hi/R.lny),14)+' | '+pad(f4(2*R.X2),6)+' | '+pad(f4(R.X1),7)+' | '+pad(f6(R.delta*R.Xm),10)); }
console.log('\n  the mixed REM by band as a share of the mixed REM total, and the mixed MAIN above 2L by type:');
for(const R of RES){ const r=b=>[3,4,5].reduce((s,t)=>s+R.COUNT[t][b]-R.MAIN[t][b],0); let tot=0; for(let b=0;b<R.NB;b++)tot+=r(b);
  let s='  x = '+pad(R.x,2)+'  '; for(let b=0;b<R.NB;b++) s+=R.bnames[b]+': '+f4(r(b)/tot)+'   ';
  const m=t=>{let v=0;for(let b=1;b<R.NB;b++)v+=R.MAIN[t][b];return v;};
  console.log(s+'|  MAIN>2L  mix2a '+f4(m(3))+'  mix2b '+f4(m(4))+'  mix3 '+f4(m(5))+'  pure '+f4(m(2))+'  c0 '+f4(m(1))+'   [L ln^2 y = '+f3(R.lny*R.lny)+' L]'); }

// ---------------------------------------------------------------------------
console.log('\n=== PART F: the varE-theta2-step X2 column, rebuilt, against the symmetric group sum ===');
console.log('  W_-(h) := 6[6|h] f5(h) D_y prod_{p | h-2} (p-3)/(p-4),  W_+(h) the same with h+2;  b2 = mean of W_-/6 over 6|h');
console.log('  corpus column:  X2c = [h=0 term] + 2 sum_{h>0} (1-h/L) (W_-(h) - 6 b2)          (positive half of one pattern, doubled)');
console.log('  group sum:      X2  = [h=0 term] +   sum_{h>0} (1-h/L) (W_-(h) + W_+(h) - 12 b2)  (= sum over |h| < L of W_- - 6 b2, since W_-(-h) = W_+(h))');
for(const lv of LV){
  const {x,L}=lv; const R=RES.find(r=>r.x===x); const D=R.D, K=L/6, delta=R.delta;
  const ps=primesUpTo(R.y).filter(p=>p>=7); let b2=1; for(const p of ps) b2*=((p-2)*(p-2)-3)/((p-2)*(p-2));
  const PM=new Float64Array(K).fill(1), PP=new Float64Array(K).fill(1);
  for(const p of ps){const i6=inv6(p), b=(p-3)/(p-4); for(let k=(2*i6)%p||p;k<K;k+=p)PM[k]*=b; for(let k=((p-2)*i6)%p||p;k<K;k+=p)PP[k]*=b;}
  const SC=new Kah(), SS=new Kah(); const h0=6*2.5*D-6*b2; SC.add(h0); SS.add(h0);
  for(let k=1;k<K;k++){const w=1-6*k/L, r5=k%5, f5=(r5===0)?2.5:((r5===1||r5===4)?1.25:0);
    SC.add(2*w*(6*f5*D*PM[k]-6*b2)); SS.add(w*(6*f5*D*(PM[k]+PP[k])-12*b2));}
  const X2c=SC.get(), X2s=SS.get();
  console.log('  x = '+pad(x,2)+'   delta*X2c = '+f6(delta*X2c)+' (corpus column '+lv.dX2+')   delta*X2 = '+f6(delta*X2s)+' (this file, PART C: '+f6(delta*R.X2)+')   X2c = '+f4(X2c)+'   X2 = '+f4(X2s)+'   2X2 = '+f4(2*X2s));
  assert(Math.abs(delta*X2c-lv.dX2)<2e-6,'the corpus X2 column is reproduced by the asymmetric formula at x='+x);
  assert(Math.abs(X2s-R.X2)<1e-6*Math.max(1,Math.abs(R.X2)),'the symmetric group sum equals the pure-type remainder of PART C at x='+x);
}
console.log('  => the corpus X2 column doubles the positive half of the h = 2 (p) pattern; the two patterns are mirror images, not even functions of h.');
console.log('     X = X1 + 2 X2 + Xmix holds in both bookkeepings; the corpus Xmix absorbs the difference 2(X2c - X2).');

// ---------------------------------------------------------------------------
console.log('\n=== PART G: the mix2a cell below 2L, split by balance of the two parts ===');
console.log('  mix2a = (n0 | h, e | h-+2), n = n0 e <= 2L.  UNBALANCED: min(n0, e) <= L^(2/5);  BALANCED: min(n0, e) > L^(2/5)');
console.log('  (the trilinear Kloosterman-fraction bound of Bettin-Chandee beats the trivial bound only on the balanced side; see the note, section 4)');
console.log('   x |   L^(2/5) | unbal COUNT | unbal MAIN | unbal REM | bal COUNT | bal MAIN | bal REM | unbal REM / cell REM');
for(const lv of LV){
  const {x,L}=lv; const K=L/6; const R=RES.find(r=>r.x===x); const D=R.D, Q=Math.pow(L,0.4);
  const ps=primesUpTo(R.y).filter(p=>p>=7), np=ps.length;
  const lam0=ps.map(p=>2/(p-4)), lam1=ps.map(p=>1/(p-4));
  const cnt=[new Int32Array(K),new Int32Array(K),new Int32Array(K)];
  const starts=(p)=>{const i6=inv6(p);return [p,(2*i6)%p||p,((p-2)*i6)%p||p];};
  for(let i=0;i<np;i++){const p=ps[i],st=starts(p); for(let j=0;j<3;j++)for(let k=st[j];k<K;k+=p)cnt[j][k]++;}
  const off=[],lst=[];
  for(let j=0;j<3;j++){const o=new Int32Array(K+1);for(let k=0;k<K;k++)o[k+1]=o[k]+cnt[j][k];off.push(o);lst.push(new Uint16Array(o[K]));cnt[j].fill(0);}
  for(let i=0;i<np;i++){const p=ps[i],st=starts(p); for(let j=0;j<3;j++)for(let k=st[j];k<K;k+=p)lst[j][off[j][k]+cnt[j][k]++]=i;}
  const subs=(j,k)=>{const a=off[j][k],b=off[j][k+1]; const out=[[1,1]];
    for(let q=a;q<b;q++){const i=lst[j][q],p=ps[i],lm=(j===0?lam0[i]:lam1[i]); const len=out.length; for(let s=0;s<len;s++)out.push([out[s][0]*p,out[s][1]*lm]);} return out;};
  const CU=new Kah(),CB=new Kah();
  for(let k=1;k<K;k++){
    const r5=k%5, f5=(r5===0)?2.5:((r5===1||r5===4)?1.25:0); if(f5===0) continue;
    const base=2*(1-6*k/L)*6*f5*D;
    const S0=subs(0,k).filter(s=>s[0]>1);
    for(const j of [1,2]){ const SE=subs(j,k).filter(s=>s[0]>1);
      for(const [a0,w0] of S0) for(const [ae,we] of SE){ const n=a0*ae; if(n>2*L) continue; (Math.min(a0,ae)<=Q?CU:CB).add(base*w0*we); } }
  }
  // MAIN: descent over pairs (n0, e) with n0 e <= 2L, both > 1, e on either branch (factor 2)
  const MU=new Kah(),MB=new Kah();
  (function desc(i,n0,e,w){
    if(n0>1&&e>1){ (Math.min(n0,e)<=Q?MU:MB).add(2*L*D*w/(n0*e)); }
    for(let j=i;j<np;j++){const p=ps[j]; if(n0*e*p>2*L) break; desc(j+1,n0*p,e,w*lam0[j]); desc(j+1,n0,e*p,w*lam1[j]);}
  })(0,1,1,1);
  const cu=CU.get(),cb=CB.get(),mu=MU.get(),mb=MB.get(), cell=R.COUNT[3][0]-R.MAIN[3][0];
  assert(Math.abs((cu+cb)-R.COUNT[3][0])<1e-6*Math.max(1,R.COUNT[3][0])&&Math.abs((mu+mb)-R.MAIN[3][0])<1e-6*Math.max(1,R.MAIN[3][0]),'balance split re-sums to the mix2a n<=2L cell at x='+x);
  console.log('  '+pad(x,2)+' | '+pad(f3(Q),9)+' | '+pad(f4(cu),11)+' | '+pad(f4(mu),10)+' | '+pad(f4(cu-mu),9)+' | '+pad(f4(cb),9)+' | '+pad(f4(mb),8)+' | '+pad(f4(cb-mb),7)+' | '+pad(f4((cu-mu)/cell),8));
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/attack-0830-varE-identification.js
//   invocation:  node research/history/staging/attack-0830-varE-identification.js
//   code-sha256: 85e05f41440e21f327b457191660e2a2d8ecfc15a2fecb7fc45f6cac2e7893b3
//   out-sha256:  5753ec386d70f25f0576504556d9d11ec531350cb4fec5a46bf86164d8d4eedc
//   body-lines:  244
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     33.5 s
// ============================================================================
// === PART A: the mixed CRT class is a Kloosterman fraction ===
//   c = 0 (n0), 2 (n+), -2 (n-)  <=>  c/n = 2( inv(n0 n-, n+)/n+ - inv(n0 n+, n-)/n- ) mod 1
//                                 <=>  c = 2 n0 v,  v = inv(n0) (n+),  v = -inv(n0) (n-),  so v^2 = inv(n0)^2 (n+ n-)
//   random coprime triples tested: 3000   worst residual (fraction form) = 0   (root form) = 0
//   => with n- = 1 the class is c/n = 2 inv(n0)/n+ mod 1, the phase of the additive divisor problem.
//
// === PART B: the class mean of R_n is zero ===
//   R_n(c) = [(r-c)^+ + (r+c-n)^+ - r^2/n]/L, r = L mod n;  sum_{c mod n} R_n(c) = 0
//   random (L,n) tested: 2000   worst |class sum| = 1.87e-12
//   => MAIN = L w/n is exactly the average of COUNT over the n classes: REM is a discrepancy, not a size.
//
// === PART C: X by branch type and modulus band, five exact levels ===
//
//   x = 7   L = 210   y = 13   ln y = 2.565   primes 7..y: 3   descent nodes = 64
//     type |         band |          COUNT |           MAIN |          REM |  delta*REM
//      n=1 |        n<=2L |     162.145455 |     162.145455 |     0.000000 |   0.000000
//      n=1 |     2L<n<=8L |       0.000000 |       0.000000 |     0.000000 |   0.000000
//      n=1 |  8L<n<=Lln2y |       0.000000 |       0.000000 |     0.000000 |   0.000000
//      n=1 |   n>L ln^2 y |       0.000000 |       0.000000 |     0.000000 |   0.000000
//      n=1 |          ALL |                |                |     0.000000 |   0.000000
//       c0 |        n<=2L |      28.913401 |      23.162779 |     5.750621 |   0.189581
//       c0 |     2L<n<=8L |       0.490236 |       0.006856 |     0.483379 |   0.015936
//       c0 |  8L<n<=Lln2y |       0.000000 |       0.000000 |     0.000000 |   0.000000
//       c0 |   n>L ln^2 y |      -0.000000 |       0.000000 |    -0.000000 |  -0.000000
//       c0 |          ALL |                |                |     6.234001 |   0.205517
//     pure |        n<=2L |      22.235690 |      22.794245 |    -0.558555 |  -0.018414
//     pure |     2L<n<=8L |       0.000000 |       0.001714 |    -0.001714 |  -0.000057
//     pure |  8L<n<=Lln2y |       0.000000 |       0.000000 |     0.000000 |   0.000000
//     pure |   n>L ln^2 y |       0.000000 |      -0.000000 |     0.000000 |   0.000000
//     pure |          ALL |                |                |    -0.560269 |  -0.018470
//    mix2a |        n<=2L |       0.315152 |       1.474135 |    -1.158984 |  -0.038208
//    mix2a |     2L<n<=8L |       0.031515 |       0.030854 |     0.000661 |   0.000022
//    mix2a |  8L<n<=Lln2y |       0.000000 |       0.000000 |     0.000000 |   0.000000
//    mix2a |   n>L ln^2 y |       0.000000 |       0.000000 |    -0.000000 |  -0.000000
//    mix2a |          ALL |                |                |    -1.158323 |  -0.038186
//    mix2b |        n<=2L |       0.481481 |       0.368534 |     0.112948 |   0.003724
//    mix2b |     2L<n<=8L |       0.000000 |       0.005142 |    -0.005142 |  -0.000170
//    mix2b |  8L<n<=Lln2y |       0.000000 |       0.000000 |     0.000000 |   0.000000
//    mix2b |   n>L ln^2 y |       0.000000 |       0.000000 |    -0.000000 |  -0.000000
//    mix2b |          ALL |                |                |     0.107805 |   0.003554
//     mix3 |        n<=2L |       0.000000 |       0.000000 |     0.000000 |   0.000000
//     mix3 |     2L<n<=8L |       0.000000 |       0.010285 |    -0.010285 |  -0.000339
//     mix3 |  8L<n<=Lln2y |       0.000000 |       0.000000 |     0.000000 |   0.000000
//     mix3 |   n>L ln^2 y |       0.000000 |      -0.000000 |     0.000000 |   0.000000
//     mix3 |          ALL |                |                |    -0.010285 |  -0.000339
//   sum MAIN = 210.000000  (= L = 210)   sum REM = 4.612929   corpus X = 4.612929   rel diff = 6.4e-8
//   theta2-step groups: delta*X1 = 0.205517 (corpus 0.205517)   delta*(X - X1) = -0.053442 (corpus 2*dX2 + dXmix = -0.053442)
//   symmetric split of X - X1:  delta*X2 each = -0.009235 (corpus column 0.094199)   delta*Xmix = -0.034971 (corpus column -0.24184)   [see PART F]
//
//   x = 11   L = 2310   y = 47   ln y = 3.850   primes 7..y: 12   descent nodes = 6544
//     type |         band |          COUNT |           MAIN |          REM |  delta*REM
//      n=1 |        n<=2L |    1677.179717 |    1677.179717 |     0.000000 |   0.000000
//      n=1 |     2L<n<=8L |       0.000000 |       0.000000 |     0.000000 |   0.000000
//      n=1 |  8L<n<=Lln2y |       0.000000 |       0.000000 |     0.000000 |   0.000000
//      n=1 |   n>L ln^2 y |       0.000000 |       0.000000 |     0.000000 |   0.000000
//      n=1 |          ALL |                |                |     0.000000 |   0.000000
//       c0 |        n<=2L |     311.477549 |     299.644005 |    11.833544 |   0.201188
//       c0 |     2L<n<=8L |       2.652139 |       0.053976 |     2.598162 |   0.044173
//       c0 |  8L<n<=Lln2y |       0.600290 |       0.003776 |     0.596515 |   0.010142
//       c0 |   n>L ln^2 y |       2.245429 |       0.003563 |     2.241867 |   0.038115
//       c0 |          ALL |                |                |    17.270088 |   0.293618
//     pure |        n<=2L |     292.200557 |     291.655599 |     0.544958 |   0.009265
//     pure |     2L<n<=8L |       0.000000 |       0.013414 |    -0.013414 |  -0.000228
//     pure |  8L<n<=Lln2y |       0.000000 |       0.000703 |    -0.000703 |  -0.000012
//     pure |   n>L ln^2 y |       0.000000 |       0.000475 |    -0.000475 |  -0.000008
//     pure |          ALL |                |                |     0.530367 |   0.009017
//    mix2a |        n<=2L |      30.439937 |      32.473780 |    -2.033843 |  -0.034578
//    mix2a |     2L<n<=8L |       0.102992 |       0.245140 |    -0.142148 |  -0.002417
//    mix2a |  8L<n<=Lln2y |       0.001737 |       0.023743 |    -0.022006 |  -0.000374
//    mix2a |   n>L ln^2 y |       0.001364 |       0.027856 |    -0.026493 |  -0.000450
//    mix2a |          ALL |                |                |    -2.224489 |  -0.037820
//    mix2b |        n<=2L |       7.784039 |       7.988406 |    -0.204367 |  -0.003475
//    mix2b |     2L<n<=8L |       0.037958 |       0.040563 |    -0.002604 |  -0.000044
//    mix2b |  8L<n<=Lln2y |       0.000228 |       0.003073 |    -0.002845 |  -0.000048
//    mix2b |   n>L ln^2 y |       0.002867 |       0.003088 |    -0.000221 |  -0.000004
//    mix2b |          ALL |                |                |    -0.210036 |  -0.003571
//     mix3 |        n<=2L |       0.260086 |       0.520157 |    -0.260071 |  -0.004422
//     mix3 |     2L<n<=8L |       0.068661 |       0.083853 |    -0.015192 |  -0.000258
//     mix3 |  8L<n<=Lln2y |       0.008051 |       0.014345 |    -0.006294 |  -0.000107
//     mix3 |   n>L ln^2 y |       0.009585 |       0.020771 |    -0.011185 |  -0.000190
//     mix3 |          ALL |                |                |    -0.292742 |  -0.004977
//   sum MAIN = 2310.000000  (= L = 2310)   sum REM = 15.073187   corpus X = 15.073187   rel diff = 1.0e-8
//   theta2-step groups: delta*X1 = 0.293618 (corpus 0.293618)   delta*(X - X1) = -0.037351 (corpus 2*dX2 + dXmix = -0.037351)
//   symmetric split of X - X1:  delta*X2 each = 0.004509 (corpus column 0.047843)   delta*Xmix = -0.046368 (corpus column -0.133037)   [see PART F]
//
//   x = 13   L = 30030   y = 173   ln y = 5.153   primes 7..y: 37   descent nodes = 381028
//     type |         band |          COUNT |           MAIN |          REM |  delta*REM
//      n=1 |        n<=2L |   21532.593050 |   21532.593050 |     0.000000 |   0.000000
//      n=1 |     2L<n<=8L |       0.000000 |       0.000000 |     0.000000 |   0.000000
//      n=1 |  8L<n<=Lln2y |       0.000000 |       0.000000 |     0.000000 |   0.000000
//      n=1 |   n>L ln^2 y |       0.000000 |       0.000000 |     0.000000 |   0.000000
//      n=1 |          ALL |                |                |     0.000000 |   0.000000
//       c0 |        n<=2L |    4023.453685 |    4006.769716 |    16.683969 |   0.169052
//       c0 |     2L<n<=8L |       5.019739 |       0.093435 |     4.926304 |   0.049916
//       c0 |  8L<n<=Lln2y |       3.149083 |       0.015718 |     3.133365 |   0.031749
//       c0 |   n>L ln^2 y |       7.059861 |       0.004393 |     7.055469 |   0.071490
//       c0 |          ALL |                |                |    31.799107 |   0.322208
//     pure |        n<=2L |    3891.395196 |    3891.104550 |     0.290646 |   0.002945
//     pure |     2L<n<=8L |       0.000000 |       0.018315 |    -0.018315 |  -0.000186
//     pure |  8L<n<=Lln2y |       0.000000 |       0.002385 |    -0.002385 |  -0.000024
//     pure |   n>L ln^2 y |       0.000000 |       0.000521 |    -0.000521 |  -0.000005
//     pure |          ALL |                |                |     0.269426 |   0.002730
//    mix2a |        n<=2L |     470.304366 |     472.531600 |    -2.227234 |  -0.022568
//    mix2a |     2L<n<=8L |       0.300598 |       0.561690 |    -0.261092 |  -0.002646
//    mix2a |  8L<n<=Lln2y |       0.040912 |       0.115040 |    -0.074127 |  -0.000751
//    mix2a |   n>L ln^2 y |       0.008549 |       0.039080 |    -0.030531 |  -0.000309
//    mix2a |          ALL |                |                |    -2.592985 |  -0.026274
//    mix2b |        n<=2L |     115.733337 |     115.665166 |     0.068170 |   0.000691
//    mix2b |     2L<n<=8L |       0.075375 |       0.075120 |     0.000255 |   0.000003
//    mix2b |  8L<n<=Lln2y |       0.010750 |       0.013332 |    -0.002583 |  -0.000026
//    mix2b |   n>L ln^2 y |       0.002466 |       0.003872 |    -0.001406 |  -0.000014
//    mix2b |          ALL |                |                |     0.064437 |   0.000653
//     mix3 |        n<=2L |       9.994723 |       9.953906 |     0.040818 |   0.000414
//     mix3 |     2L<n<=8L |       0.315474 |       0.321738 |    -0.006264 |  -0.000063
//     mix3 |  8L<n<=Lln2y |       0.074452 |       0.081909 |    -0.007456 |  -0.000076
//     mix3 |   n>L ln^2 y |       0.026312 |       0.035466 |    -0.009155 |  -0.000093
//     mix3 |          ALL |                |                |     0.017943 |   0.000182
//   sum MAIN = 30030.000000  (= L = 30030)   sum REM = 29.557928   corpus X = 29.557928   rel diff = 1.6e-9
//   theta2-step groups: delta*X1 = 0.322208 (corpus 0.322208)   delta*(X - X1) = -0.022709 (corpus 2*dX2 + dXmix = -0.022710)
//   symmetric split of X - X1:  delta*X2 each = 0.001365 (corpus column 0.027019)   delta*Xmix = -0.025439 (corpus column -0.076748)   [see PART F]
//
//   x = 17   L = 510510   y = 709   ln y = 6.564   primes 7..y: 124   descent nodes = 20716231
//     type |         band |          COUNT |           MAIN |          REM |  delta*REM
//      n=1 |        n<=2L |  364970.594249 |  364970.594249 |     0.000000 |   0.000000
//      n=1 |     2L<n<=8L |       0.000000 |       0.000000 |     0.000000 |   0.000000
//      n=1 |  8L<n<=Lln2y |       0.000000 |       0.000000 |     0.000000 |   0.000000
//      n=1 |   n>L ln^2 y |       0.000000 |       0.000000 |     0.000000 |   0.000000
//      n=1 |          ALL |                |                |     0.000000 |   0.000000
//       c0 |        n<=2L |   68579.611090 |   68557.302103 |    22.308988 |   0.141827
//       c0 |     2L<n<=8L |       7.825872 |       0.144765 |     7.681107 |   0.048832
//       c0 |  8L<n<=Lln2y |       7.377811 |       0.030783 |     7.347028 |   0.046708
//       c0 |   n>L ln^2 y |      17.067830 |       0.004928 |    17.062902 |   0.108476
//       c0 |          ALL |                |                |    54.400025 |   0.345842
//     pure |        n<=2L |   66543.623498 |   66543.363492 |     0.260006 |   0.001653
//     pure |     2L<n<=8L |       0.000000 |       0.023978 |    -0.023978 |  -0.000152
//     pure |  8L<n<=Lln2y |       0.000000 |       0.004120 |    -0.004120 |  -0.000026
//     pure |   n>L ln^2 y |       0.000000 |       0.000502 |    -0.000502 |  -0.000003
//     pure |          ALL |                |                |     0.231407 |   0.001471
//    mix2a |        n<=2L |    8234.840617 |    8237.444645 |    -2.604028 |  -0.016555
//    mix2a |     2L<n<=8L |       0.673469 |       1.023149 |    -0.349681 |  -0.002223
//    mix2a |  8L<n<=Lln2y |       0.129177 |       0.258180 |    -0.129004 |  -0.000820
//    mix2a |   n>L ln^2 y |       0.017092 |       0.051062 |    -0.033970 |  -0.000216
//    mix2a |          ALL |                |                |    -3.116682 |  -0.019814
//    mix2b |        n<=2L |    2013.933685 |    2013.938611 |    -0.004926 |  -0.000031
//    mix2b |     2L<n<=8L |       0.121170 |       0.120787 |     0.000383 |   0.000002
//    mix2b |  8L<n<=Lln2y |       0.022797 |       0.026663 |    -0.003866 |  -0.000025
//    mix2b |   n>L ln^2 y |       0.002992 |       0.004426 |    -0.001434 |  -0.000009
//    mix2b |          ALL |                |                |    -0.009842 |  -0.000063
//     mix3 |        n<=2L |     184.590365 |     184.649495 |    -0.059130 |  -0.000376
//     mix3 |     2L<n<=8L |       0.710490 |       0.732811 |    -0.022321 |  -0.000142
//     mix3 |  8L<n<=Lln2y |       0.212489 |       0.225063 |    -0.012574 |  -0.000080
//     mix3 |   n>L ln^2 y |       0.045562 |       0.056189 |    -0.010628 |  -0.000068
//     mix3 |          ALL |                |                |    -0.104652 |  -0.000665
//   sum MAIN = 510510.000000  (= L = 510510)   sum REM = 51.400255   corpus X = 51.400255   rel diff = 8.0e-9
//   theta2-step groups: delta*X1 = 0.345842 (corpus 0.345842)   delta*(X - X1) = -0.019071 (corpus 2*dX2 + dXmix = -0.019071)
//   symmetric split of X - X1:  delta*X2 each = 0.000736 (corpus column 0.017012)   delta*Xmix = -0.020542 (corpus column -0.053095)   [see PART F]
//
//   x = 19   L = 9699690   y = 3109   ln y = 8.042   primes 7..y: 440   descent nodes = 135567709
//     type |         band |          COUNT |           MAIN |          REM |  delta*REM
//      n=1 |        n<=2L | 6930299.026552 | 6930299.026552 |     0.000000 |   0.000000
//      n=1 |     2L<n<=8L |       0.000000 |       0.000000 |     0.000000 |   0.000000
//      n=1 |         n>8L |       0.000000 |       0.000000 |     0.000000 |   0.000000
//      n=1 |          ALL |                |                |     0.000000 |   0.000000
//       c0 |        n<=2L | 1304301.785360 | 1304273.635893 |    28.149467 |   0.120266
//       c0 |     2L<n<=8L |      10.741862 |       0.197079 |    10.544783 |   0.045052
//       c0 |         n>8L |      46.403983 |       0.053303 |    46.350680 |   0.198030
//       c0 |          ALL |                |                |    85.044930 |   0.363348
//     pure |        n<=2L | 1265828.833148 | 1265828.614032 |     0.219116 |   0.000936
//     pure |     2L<n<=8L |       0.000000 |       0.028350 |    -0.028350 |  -0.000121
//     pure |         n>8L |       0.000000 |       0.006188 |    -0.006188 |  -0.000026
//     pure |          ALL |                |                |     0.184578 |   0.000789
//    mix2a |        n<=2L |  157275.293600 |  157278.567353 |    -3.273753 |  -0.013987
//    mix2a |     2L<n<=8L |       1.169882 |       1.610265 |    -0.440383 |  -0.001882
//    mix2a |         n>8L |       0.294673 |       0.517526 |    -0.222853 |  -0.000952
//    mix2a |          ALL |                |                |    -3.936989 |  -0.016820
//    mix2b |        n<=2L |   38445.026261 |   38445.021860 |     0.004401 |   0.000019
//    mix2b |     2L<n<=8L |       0.167724 |       0.168729 |    -0.001005 |  -0.000004
//    mix2b |         n>8L |       0.040553 |       0.047115 |    -0.006562 |  -0.000028
//    mix2b |          ALL |                |                |    -0.003166 |  -0.000014
//     mix3 |        n<=2L |    3560.597026 |    3560.549998 |     0.047028 |   0.000201
//     mix3 |     2L<n<=8L |       1.393197 |       1.408300 |    -0.015103 |  -0.000065
//     mix3 |         n>8L |       0.515313 |       0.547456 |    -0.032143 |  -0.000137
//     mix3 |          ALL |                |                |    -0.000218 |  -0.000001
//   sum MAIN = 9699690.000000  (= L = 9699690)   sum REM = 81.289135   corpus X = 81.289135   rel diff = 1.3e-11
//   theta2-step groups: delta*X1 = 0.363348 (corpus 0.363348)   delta*(X - X1) = -0.016046 (corpus 2*dX2 + dXmix = -0.016046)
//   symmetric split of X - X1:  delta*X2 each = 0.000394 (corpus column 0.011379)   delta*Xmix = -0.016835 (corpus column -0.038804)   [see PART F]
//
// === PART D: the n > 2L COUNT of the mixed types, rebuilt from the ROOTS ===
//   COUNT_{>2L}(type) = sum_{(n,eps) in type, n > 2L} sum_{c5} 6 f5(c5) D_y lam.lam.lam (L - ||c'||_{30n})^+ / L,  c' = class mod 30n
//   x = 7   (n,eps) with n > 2L in the mixed types: 24
//      mix2a  from the roots = 0.031515   from the h-sum = 0.031515   diff = 6.9e-18
//      mix2b  from the roots = 0.000000   from the h-sum = 0.000000   diff = 0.0e+0
//       mix3  from the roots = 0.000000   from the h-sum = 0.000000   diff = 0.0e+0
//   x = 11   (n,eps) with n > 2L in the mixed types: 16763694
//      mix2a  from the roots = 0.106093   from the h-sum = 0.106093   diff = 1.4e-17
//      mix2b  from the roots = 0.041054   from the h-sum = 0.041054   diff = -2.1e-17
//       mix3  from the roots = 0.086297   from the h-sum = 0.086297   diff = -4.2e-17
//   => above 2L the mixed COUNT is the mass of the root measure inside the window bump, exactly.
//
// === PART E: sizes against ln y ===
//   mixed = mix2a + mix2b + mix3.  REM by band; MAIN of mix3 and of mix2a+mix2b above 2L
//    x |  ln y | REM mix n<=2L | REM mix n>2L | REM mix total |  /ln y  | /ln^2 y | MAIN mix3 >2L | /ln^3 y | MAIN mix2 >2L | /ln^2 y
//    7 | 2.565 |       -1.0460 |      -0.0148 |       -1.0608 | -0.4136 | -0.1612 |        0.0103 |  0.0006 |        0.0360 |  0.0055
//   11 | 3.850 |       -2.4983 |      -0.2290 |       -2.7273 | -0.7084 | -0.1840 |        0.1190 |  0.0021 |        0.3435 |  0.0232
//   13 | 5.153 |       -2.1182 |      -0.3924 |       -2.5106 | -0.4872 | -0.0945 |        0.4391 |  0.0032 |        0.8081 |  0.0304
//   17 | 6.564 |       -2.6681 |      -0.5631 |       -3.2312 | -0.4923 | -0.0750 |        1.0141 |  0.0036 |        1.4843 |  0.0345
//   19 | 8.042 |       -3.2223 |      -0.7180 |       -3.9404 | -0.4900 | -0.0609 |        1.9558 |  0.0038 |        2.3436 |  0.0362
//
//   the absolute size of the mixed REM by type, and the two bands against ln y:
//    x | mix2a REM | mix2b REM | mix3 REM | mix n<=2L /ln y | mix n>2L /ln y |   2X2  |    X1   | delta*Xmix
//    7 |   -1.1583 |    0.1078 |  -0.0103 |         -0.4078 |        -0.0058 | -0.5603 |  6.2340 |  -0.034971
//   11 |   -2.2245 |   -0.2100 |  -0.2927 |         -0.6489 |        -0.0595 | 0.5304 | 17.2701 |  -0.046368
//   13 |   -2.5930 |    0.0644 |   0.0179 |         -0.4110 |        -0.0761 | 0.2694 | 31.7991 |  -0.025439
//   17 |   -3.1167 |   -0.0098 |  -0.1047 |         -0.4065 |        -0.0858 | 0.2314 | 54.4000 |  -0.020542
//   19 |   -3.9370 |   -0.0032 |  -0.0002 |         -0.4007 |        -0.0893 | 0.1846 | 85.0449 |  -0.016835
//
//   the mixed REM by band as a share of the mixed REM total, and the mixed MAIN above 2L by type:
//   x =  7  n<=2L: 0.9861   2L<n<=8L: 0.0139   8L<n<=Lln2y: 0.0000   n>L ln^2 y: 0.0000   |  MAIN>2L  mix2a 0.0309  mix2b 0.0051  mix3 0.0103  pure 0.0017  c0 0.0069   [L ln^2 y = 6.579 L]
//   x = 11  n<=2L: 0.9160   2L<n<=8L: 0.0586   8L<n<=Lln2y: 0.0114   n>L ln^2 y: 0.0139   |  MAIN>2L  mix2a 0.2967  mix2b 0.0467  mix3 0.1190  pure 0.0146  c0 0.0613   [L ln^2 y = 14.824 L]
//   x = 13  n<=2L: 0.8437   2L<n<=8L: 0.1064   8L<n<=Lln2y: 0.0335   n>L ln^2 y: 0.0164   |  MAIN>2L  mix2a 0.7158  mix2b 0.0923  mix3 0.4391  pure 0.0212  c0 0.1135   [L ln^2 y = 26.556 L]
//   x = 17  n<=2L: 0.8257   2L<n<=8L: 0.1150   8L<n<=Lln2y: 0.0450   n>L ln^2 y: 0.0142   |  MAIN>2L  mix2a 1.3324  mix2b 0.1519  mix3 1.0141  pure 0.0286  c0 0.1805   [L ln^2 y = 43.084 L]
//   x = 19  n<=2L: 0.8178   2L<n<=8L: 0.1158   n>8L: 0.0664   |  MAIN>2L  mix2a 2.1278  mix2b 0.2158  mix3 1.9558  pure 0.0345  c0 0.2504   [L ln^2 y = 64.675 L]
//
// === PART F: the varE-theta2-step X2 column, rebuilt, against the symmetric group sum ===
//   W_-(h) := 6[6|h] f5(h) D_y prod_{p | h-2} (p-3)/(p-4),  W_+(h) the same with h+2;  b2 = mean of W_-/6 over 6|h
//   corpus column:  X2c = [h=0 term] + 2 sum_{h>0} (1-h/L) (W_-(h) - 6 b2)          (positive half of one pattern, doubled)
//   group sum:      X2  = [h=0 term] +   sum_{h>0} (1-h/L) (W_-(h) + W_+(h) - 12 b2)  (= sum over |h| < L of W_- - 6 b2, since W_-(-h) = W_+(h))
//   x =  7   delta*X2c = 0.094199 (corpus column 0.094199)   delta*X2 = -0.009235 (this file, PART C: -0.009235)   X2c = 2.8574   X2 = -0.2801   2X2 = -0.5603
//   x = 11   delta*X2c = 0.047843 (corpus column 0.047843)   delta*X2 = 0.004509 (this file, PART C: 0.004509)   X2c = 2.8140   X2 = 0.2652   2X2 = 0.5304
//   x = 13   delta*X2c = 0.027019 (corpus column 0.027019)   delta*X2 = 0.001365 (this file, PART C: 0.001365)   X2c = 2.6666   X2 = 0.1347   2X2 = 0.2694
//   x = 17   delta*X2c = 0.017012 (corpus column 0.017012)   delta*X2 = 0.000736 (this file, PART C: 0.000736)   X2c = 2.6760   X2 = 0.1157   2X2 = 0.2314
//   x = 19   delta*X2c = 0.011379 (corpus column 0.011379)   delta*X2 = 0.000394 (this file, PART C: 0.000394)   X2c = 2.6633   X2 = 0.0923   2X2 = 0.1846
//   => the corpus X2 column doubles the positive half of the h = 2 (p) pattern; the two patterns are mirror images, not even functions of h.
//      X = X1 + 2 X2 + Xmix holds in both bookkeepings; the corpus Xmix absorbs the difference 2(X2c - X2).
//
// === PART G: the mix2a cell below 2L, split by balance of the two parts ===
//   mix2a = (n0 | h, e | h-+2), n = n0 e <= 2L.  UNBALANCED: min(n0, e) <= L^(2/5);  BALANCED: min(n0, e) > L^(2/5)
//   (the trilinear Kloosterman-fraction bound of Bettin-Chandee beats the trivial bound only on the balanced side; see the note, section 4)
//    x |   L^(2/5) | unbal COUNT | unbal MAIN | unbal REM | bal COUNT | bal MAIN | bal REM | unbal REM / cell REM
//    7 |     8.490 |      0.2206 |     1.3301 |   -1.1095 |    0.0945 |   0.1440 | -0.0494 |   0.9573
//   11 |    22.154 |     30.0687 |    31.9642 |   -1.8956 |    0.3713 |   0.5095 | -0.1383 |   0.9320
//   13 |    61.805 |    468.5906 |   470.6924 |   -2.1018 |    1.7138 |   1.8392 | -0.1254 |   0.9437
//   17 |   191.956 |   8230.0641 |  8232.6331 |   -2.5690 |    4.7765 |   4.8115 | -0.0350 |   0.9865
//   19 |   623.309 | 157265.2720 | 157268.5370 |   -3.2650 |   10.0216 |  10.0303 | -0.0087 |   0.9973
// ============================================================================
// READINGS
// (written after the block above; see attack-0830-varE-identification.md)
// 1. PART C: the total REM reproduces the corpus X at all five levels, worst
//    relative difference 6.4e-8 (x = 7); delta*X1 matches the corpus column at
//    every level, and so does delta*(X - X1).
// 2. PART F: the corpus delta*X2 column (0.094199 .. 0.011379) is reproduced by
//    the asymmetric formula and differs from the group sum (-0.009235 ..
//    0.000394); the group's 2X2 reads -0.5603, 0.5304, 0.2694, 0.2314, 0.1846.
// 3. PART E: the mixed REM is -1.0608, -2.7273, -2.5106, -3.2312, -3.9404, i.e.
//    -0.4136, -0.7084, -0.4872, -0.4923, -0.4900 times ln y; the share below
//    2L is 0.9861, 0.9160, 0.8437, 0.8257, 0.8178; the share above L ln^2 y is
//    0.0139, 0.0164, 0.0142 at x = 11, 13, 17.
// 4. PART G: the unbalanced pairs carry 0.9573, 0.9320, 0.9437, 0.9865, 0.9973
//    of the dominant cell's REM; the balanced REM is -0.0087 at x = 19.
// 5. PART A, B, D: identities exact (residual 0; 1.87e-12; 4.2e-17).
