#!/usr/bin/env node
'use strict';
// ============================================================================
// redteam-0830-floor-sign.js — ADVERSARIAL re-derivation of the EXACT half of
//   research/history/staging/attack-0830-rec-cheapest.md sec.4 (E1-E4, Omega).
//   Independent code: nothing is required from sift-limit-lemmaV.js or from
//   attack-0830-rec-cheapest.js; every object below is rebuilt from its
//   definition and cross-checked by at least two disjoint routes.
//   Companion note: redteam-0830-floor-sign.md. STAGING GRADE, adversarial.
//
// WHAT IS UNDER TEST (quoted from the note, sec.4.1):
//   (E1) cc(r) depends on (n1, n2) = (gcd(r,P), gcd(r+2,P)) alone, and "every
//        pair (n1, n2) of divisors of P with gcd(n1, n2) | 2 is realised".
//   (E2) lam+(n) >= 0 and lam-(n) <= 0 at every n | P, n > 1.
//   (E3) at a doubly non-rough point cc(r) = -(A1 A2 + A1 B2 + B1 A2).
//   (E4) T(x) <= cc(r) + (H - 1) for every window (x, x+H] containing r.
//   Omega(z,s) = -min_r cc(r) = max over splits of (A1 A2 + A1 B2 + B1 A2);
//   exact values 1..251 at z = 13..73 (cheapest s) and 1..100 at 13..47 (s=3).
//
// WHAT THIS SCRIPT COMPUTES.
//  X0 ARITHMETIC. The constants, the two currencies, 16s/9, and the two
//     comparands the note's ledger/sec.0 conflate (z^{u0} vs H*M at z = 73);
//     plus the quoted walk-cost multipliers W(41,43,47)/W(37).
//  X1 SUPPORT CUSTODY. Rosser D+/D- rebuilt here from the prefix conditions,
//     and at z <= 23 also by brute force over EVERY squarefree divisor of P(z)
//     with every prefix condition re-tested; sizes against the note's table.
//  X2 (E2) THE SIGN FACTS, three disjoint routes for lam+-: direct sum over
//     the support, the exit-chain boundary count, and a subset-sum transform.
//     Swept over s = 0.8 .. 6.0 to find where E2's derivation stops holding.
//  X3 (E1)/(E3) BRUTE FORCE OVER EVERY POSITION of Z/W at z = 13,17,19,23:
//     the identity by class (doubly non-rough / rough on one side / doubly
//     rough), the sign of each of A1,B1,A2,B2 by class, cc <= 1, min cc, and
//     which (n1,n2) pairs with gcd | 2 are NOT realised.
//  X4 (E4) EXHAUSTIVE WINDOW TEST at every x, several H, with the period wrap,
//     by sliding-window minimum; and min_x T at H = Omega.
//  X5 OMEGA INDEPENDENTLY, by a subset/submask odometer (not the note's
//     recursion), at every z reachable, both s; against the cited values and
//     against blind-0830-omega-floor.md's exact 684 (z=89), 1155 (z=101).
//  X6 lam+(P(z)) = 0 AND ITS STATED REASON: max d/D over D+, and over the
//     ODD even-omega part of D+ that the D/8 slab actually needs.
//  X7 sup|R_1| against Omega +- M: the note claims sup|rho~| >= (Omega - M)/2.
//
// CITED (inputs, not outputs): beta_2 = 4.26645028414864 (dhr-verification.md);
//   the note's own OUTPUT S3 Omega columns and S2 walk columns, quoted by line
//   for comparison only; blind-0830-omega-floor.md sec.0 for 684/1155/1980;
//   sup|rho~| at z = 13..29 from rho-maximal-law.md sec.4.
//
//   node research/history/staging/redteam-0830-floor-sign.js [--zmax N]
//   Progress on stderr only; stdout carries no timing figure.
// ============================================================================

const BETA2 = 4.26645028414864;
const SE = 1 + Math.sqrt(Math.E);
const ETA = 0.05;
const S_CHEAP = SE + ETA;           // 2.698721270700...
const U0 = BETA2 - ETA;             // 4.21645028414864
const S3 = 3.0;

// cited comparison columns (attack-0830-rec-cheapest.js OUTPUT, S3 / S2)
const CITED_OMEGA_CHEAP = { 13:1,17:2,19:3,23:6,29:10,31:18,37:22,41:30,43:45,47:63,53:86,59:111,61:134,67:168,71:205,73:251 };
const CITED_OMEGA_S3    = { 13:1,17:2,19:3,23:3,29:3,31:9,37:21,41:36,43:63,47:100 };
const CITED_BLIND       = { 89:684, 101:1155, 113:1980 };      // blind-0830-omega-floor.md sec.0
const CITED_M_CHEAP     = { 13:0.050649,17:0.043790,19:0.035351,23:0.030700,29:0.028248 };
const CITED_S2 = { 29:{sup:27.971,rms:5.8294,minT:41384,maxT:41439},
                   13:{sup:3.312,rms:1.0567,minT:2517,maxT:2523},
                   17:{sup:5.996,rms:1.9121,minT:6748,maxT:6759},
                   19:{sup:9.649,rms:2.4586,minT:8704,maxT:8722},
                   23:{sup:14.334,rms:3.1119,minT:16922,maxT:16950} };
const SUPRHO = { 13:2.62013, 17:4.33665, 19:9.15247, 23:12.10617, 29:17.90249, 31:28.122062, 37:52.219092 };

const argv = process.argv.slice(2);
const ZMAX = (() => { const i = argv.indexOf('--zmax'); return i >= 0 ? Number(argv[i+1]) : 101; })();
const f = (x,d) => Number(x).toFixed(d);
const e3 = (x) => Number(x).toExponential(3);
const pad = (s,n) => String(s).padStart(n);
const T0 = Date.now();
const prog = (m) => process.stderr.write(`  [${((Date.now()-T0)/1000).toFixed(1)}s] ${m}\n`);

function primesUnder(n){ const s = new Uint8Array(n), o = []; for(let i=2;i<n;i++){ if(!s[i]){ o.push(i); for(let j=i*i;j<n;j+=i) s[j]=1; } } return o; }
function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }

// ---------------------------------------------------------------------------
// X1  The Rosser supports, rebuilt from the definition.
// D^sigma = { d = p_1 p_2 ... p_r squarefree, p_1 > p_2 > ... > p_r, all p < z,
//             d <= D, and p_1...p_{l-1} p_l^3 <= D for every l <= r with
//             l odd (sigma = +) / l even (sigma = -) }.
// Route A: recursion over descending primes.  Route B (z <= 23): every one of
// the 2^k squarefree divisors of P(z) tested against every prefix condition.
// ---------------------------------------------------------------------------
function supportA(z, D, plus){
  const ps = primesUnder(z).slice().sort((a,b)=>b-a), out = [];
  const walk = (start, prod, len) => {
    out.push([prod, len % 2 ? -1 : 1]);
    for(let i=start;i<ps.length;i++){
      const p = ps[i], l = len + 1;
      if(prod * p > D) continue;
      if(((l % 2 === 1) === plus) && prod * p * p * p > D) continue;
      walk(i+1, prod*p, l);
    }
  };
  walk(0, 1, 0);
  return out;
}
function supportB(z, D, plus){             // brute force over all divisors
  const ps = primesUnder(z).slice().sort((a,b)=>b-a), k = ps.length, out = [];
  for(let m=0;m<(1<<k);m++){
    const chain = []; for(let i=0;i<k;i++) if(m>>i & 1) chain.push(ps[i]);   // descending
    let pre = 1, ok = true;
    for(let l=1;l<=chain.length;l++){
      const p = chain[l-1];
      if(pre * p > D){ ok = false; break; }
      if(((l % 2 === 1) === plus) && pre * p * p * p > D){ ok = false; break; }
      pre *= p;
    }
    if(ok) out.push([pre, chain.length % 2 ? -1 : 1]);
  }
  return out;
}

// masks over the ascending prime list
function maskOfInt(n, ps){ let m = 0; for(let i=0;i<ps.length;i++) if(n % ps[i] === 0) m |= (1<<i); return m; }

// lam by DIRECT summation over the support (route 1)
function lamDirect(supp, msk, mask){ let s = 0; for(let j=0;j<supp.length;j++) if((msk[j] & ~mask) === 0) s += supp[j][1]; return s; }
// lam by SUBSET-SUM transform, primes taken high index to low (route 3)
function lamZeta(supp, msk, k){
  const N = 1<<k, a = new Int32Array(N);
  for(let j=0;j<supp.length;j++) a[msk[j]] += supp[j][1];
  for(let i=k-1;i>=0;i--){ const b = 1<<i; for(let m=N-1;m>=0;m--) if(m & b) a[m] += a[m ^ b]; }
  return a;
}
// lam+ by the EXIT-CHAIN boundary count claimed in sec.4.2 (route 2):
//   lam+(n) = #{ d' in D+ : d' | n/p*, omega(d') even, d' p*^3 > D },  p* = least prime of n
//   lam-(n) = -#{ d' in D- : d' | n/p*, omega(d') odd,  d' p*^3 > D }
// (n > 1; the exit happens exactly when p* is appended.)
function lamChain(supp, msk, mask, ps, D, plus){
  if(mask === 0) return 1;
  let i0 = 0; while(!(mask >> i0 & 1)) i0++;
  const pstar = ps[i0], rest = mask & ~(1<<i0);
  let c = 0;
  for(let j=0;j<supp.length;j++){
    if((msk[j] & ~rest) !== 0) continue;
    const even = supp[j][1] === 1;
    if(plus ? !even : even) continue;         // omega even for D+, odd for D-
    if(supp[j][0] * pstar * pstar * pstar > D) c++;
  }
  return plus ? c : -c;
}

function main(){
console.log('redteam-0830-floor-sign.js — adversarial re-derivation of the EXACT half (E1-E4, Omega)');
console.log('');

// ------------------------------------------------------------------ X0 -----
console.log('X0 ARITHMETIC OF THE NOTE\'S OWN SENTENCES');
console.log(`  1+sqrt(e) = ${f(SE,12)}   2(1+sqrt(e)) - beta_2 = ${f(2*SE-BETA2,6)}   (note sec.1: 1.030992)`);
console.log(`  working point: s = ${f(S_CHEAP,6)}, u0 = ${f(U0,6)};  2s - u0 = ${f(2*S_CHEAP-U0,6)};  u0/2 = ${f(U0/2,6)}`);
console.log(`  16s/9 at s = 1+sqrt(e): ${f(16*SE/9,6)} (note: 4.7088);  minus beta_2 = ${f(16*SE/9-BETA2,6)} (note: 0.4424); d/d eta = ${f(16/9+1,4)} (note: 2.78)`);
console.log(`  16s/9 at s = 3: ${f(16*3/9,6)} (note: 5.3333);  at the working s: ${f(16*S_CHEAP/9,6)}`);
console.log(`  moment-order ratio: at eta = 0 (the note's own 2.1332) (beta_2/2)/1.5 = ${f((BETA2/2)/1.5,4)} (note sec.2 item 2: 1.42); at the working eta = 0.05 it is ${f((U0/2)/1.5,4)}`);
{
  const zt = 73, ps = primesUnder(zt); let W = 1; for(const p of ps) W *= p;
  const zu0 = Math.pow(zt, U0);
  console.log(`  THE COMPARAND AT z = 73: z^{u0} = ${e3(zu0)};  the note's sec.0/ledger says "z^{u0} = 1.05e6".`);
  console.log(`    1.05e6 is H*M (the note's own S3 column "HM(u0)" = 1.052e6), not z^{u0}. Ratio z^{u0}/(1.05e6) = ${e3(zu0/1.052e6)}, i.e. M = ${e3(1.052e6/zu0)}.`);
  console.log(`    Omega(73)/z^{u0} = ${e3(251/zu0)} against the note's quoted 251/1.05e6 = ${e3(251/1.052e6)}.`);
}
{
  // the quoted "37x to 65,232x the z = 37 cost" (rho-exact-z31-01.md sec.0)
  const W37 = primesUnder(37).reduce((a,b)=>a*b,1);
  for(const z of [41,43,47]){ const Wz = primesUnder(z).reduce((a,b)=>a*b,1);
    console.log(`  W(${z})/W(37) = ${Wz/W37} exactly  (quoted: ${z===41?'37':z===43?'1517':'65,232'})`); }
}
console.log('');

// ------------------------------------------------------------------ X1 -----
console.log('X1 SUPPORT CUSTODY — D+/D- rebuilt from the prefix conditions; route A (recursion) vs route B (every squarefree divisor re-tested)');
console.log('   z      s        |D+|A  |D+|B   |D-|A  |D-|B   agree   note\'s table');
const NOTE_SUPP = { '13|2.698721':[16,20], '17|2.698721':[28,32], '19|2.698721':[42,40], '23|2.698721':[44,60],
                    '13|3':[28,24], '17|3':[44,44], '19|3':[64,58], '23|3':[96,74] };
for(const S of [S_CHEAP, S3]) for(const z of [13,17,19,23]){
  const D = Math.pow(z,S);
  const A1 = supportA(z,D,true), B1 = supportB(z,D,true), A2 = supportA(z,D,false), B2 = supportB(z,D,false);
  const key = `${z}|${S===S3?'3':'2.698721'}`, nt = NOTE_SUPP[key];
  const same = (x,y)=>{ if(x.length!==y.length) return false; const s=(u)=>u.map(a=>a.join(':')).sort().join(','); return s(x)===s(y); };
  const ag = same(A1,B1) && same(A2,B2);
  console.log(`  ${pad(z,2)}  ${f(S,6)}   ${pad(A1.length,4)}  ${pad(B1.length,4)}    ${pad(A2.length,4)}  ${pad(B2.length,4)}   ${ag?'yes':'NO '}     ${nt?`${nt[0]}, ${nt[1]} ${nt[0]===A1.length&&nt[1]===A2.length?'MATCH':'MISMATCH'}`:'--'}`);
}
console.log('');

// ------------------------------------------------------------------ X2 -----
console.log('X2 (E2) THE SIGN FACTS OVER EVERY DIVISOR n > 1 OF P(z), three disjoint routes for lam+-');
console.log('  vp = #{n > 1 : lam+(n) < 0}   vm = #{n > 1 : lam-(n) > 0}   d13 = #{n : direct != chain}   d1z = #{n : direct != zeta}');
console.log('   z    s        k     |D+|   |D-|    vp    vm    d13   d1z   lam+(1)  lam-(1)   min lam+   max lam-   verdict');
for(const z of [13,17,19,23,29,31,37]){
  for(const S of [0.8, 1.0, 1.5, 2.0, S_CHEAP, S3, 4.0, 6.0]){
    if(z > 23 && ![S_CHEAP,S3,1.0,0.8].includes(S)) continue;
    const ps = primesUnder(z), k = ps.length, D = Math.pow(z,S), N = 1<<k;
    const sp = supportA(z,D,true), sm = supportA(z,D,false);
    const mp = sp.map(([d])=>maskOfInt(d,ps)), mm = sm.map(([d])=>maskOfInt(d,ps));
    const zp = lamZeta(sp,mp,k), zm = lamZeta(sm,mm,k);
    let vp=0, vm=0, d13=0, d1z=0, minp=Infinity, maxm=-Infinity;
    for(let m=0;m<N;m++){
      const dp = lamDirect(sp,mp,m), dm = lamDirect(sm,mm,m);
      if(dp !== zp[m] || dm !== zm[m]) d1z++;
      const cp = lamChain(sp,mp,m,ps,D,true), cm = lamChain(sm,mm,m,ps,D,false);
      if(dp !== cp || dm !== cm) d13++;
      if(m === 0) continue;
      if(dp < 0) vp++;  if(dm > 0) vm++;
      if(dp < minp) minp = dp;  if(dm > maxm) maxm = dm;
    }
    console.log(`  ${pad(z,2)}  ${f(S,4)}   ${pad(k,3)}   ${pad(sp.length,5)}  ${pad(sm.length,5)}  ${pad(vp,4)}  ${pad(vm,4)}  ${pad(d13,4)}  ${pad(d1z,4)}     ${pad(lamDirect(sp,mp,0),2)}       ${pad(lamDirect(sm,mm,0),2)}      ${pad(minp,4)}       ${pad(maxm,4)}   ${vp===0&&vm===0?'E2 holds':'E2 FAILS'}`);
  }
}
console.log('');
// ------------------------------------------------------------------ X3 -----
// Every position of Z/W walked. cc(r) from the lambda arrays; the prediction
// from (n1, n2) = (gcd(r,P), gcd(r+2,P)) only. Classes: 0 = doubly non-rough,
// 1 = r rough, 2 = r+2 rough, 3 = both rough.
console.log('X3 (E1)/(E3) EVERY POSITION OF Z/W, z = 13..23, both s — identity, signs and cc <= 1 by class');
console.log('  cls0 = doubly non-rough, cls1 = r rough (n1 = 1), cls2 = r+2 rough (n2 = 1), cls3 = both rough');
console.log('  bad = identity mismatches; neg = positions where some of A1,B1,A2,B2 is NEGATIVE; mincc = min cc over the class');
console.log('   z    s        W          M(walk)     M cited    bad0 bad1 bad2 bad3   neg0  neg1  neg2  neg3   cc>1   maxcc   mincc  (class of the minimiser)   -Omega cited');
const walkStore = {};
for(const S of [S_CHEAP, S3]) for(const z of [13,17,19,23]){
  prog(`X3 z=${z} s=${f(S,4)}`);
  const ps = primesUnder(z), k = ps.length; let W = 1; for(const p of ps) W *= p;
  const D = Math.pow(z,S), sp = supportA(z,D,true), sm = supportA(z,D,false);
  const mp = sp.map(([d])=>maskOfInt(d,ps)), mm = sm.map(([d])=>maskOfInt(d,ps));
  const fp = lamZeta(sp,mp,k), fm = lamZeta(sm,mm,k);
  const Ln = W + 3, Lp = new Int32Array(Ln), Lm = new Int32Array(Ln);
  for(const [d,sg] of sp) for(let n=0;n<Ln;n+=d) Lp[n]+=sg;
  for(const [d,sg] of sm) for(let n=0;n<Ln;n+=d) Lm[n]+=sg;
  const cc = new Int32Array(W);
  const bad=[0,0,0,0], neg=[0,0,0,0], mincls=[Infinity,Infinity,Infinity,Infinity];
  let sum=0, mx=-Infinity, mn=Infinity, over1=0, argcls=-1;
  for(let r=0;r<W;r++){
    let m1=0,m2=0; const r2=r+2;
    for(let i=0;i<k;i++){ const p=ps[i]; if(r%p===0) m1|=1<<i; if(r2%p===0) m2|=1<<i; }
    const A1=fp[m1],B1=-fm[m1],A2=fp[m2],B2=-fm[m2];
    const pred = -(A1*A2 + A1*B2 + B1*A2);
    const act = Lm[r]*Lp[r2] + Lp[r]*Lm[r2] - Lp[r]*Lp[r2];
    cc[r]=act; sum+=act;
    const cls = (m1===0?1:0) + (m2===0?2:0);
    if(pred!==act) bad[cls]++;
    if(A1<0||B1<0||A2<0||B2<0) neg[cls]++;
    if(act>1) over1++;
    if(act>mx) mx=act;
    if(act<mincls[cls]) mincls[cls]=act;
    if(act<mn){ mn=act; argcls=cls; }
  }
  const M = sum/W, cit = (S===S_CHEAP)?CITED_M_CHEAP[z]:null;
  const om = (S===S_CHEAP)?CITED_OMEGA_CHEAP[z]:CITED_OMEGA_S3[z];
  walkStore[`${z}|${S}`] = { cc, W, M, mn, ps, k, fp, fm, Lp, Lm };
  console.log(`  ${pad(z,2)}  ${f(S,6)}  ${pad(W,9)}   ${f(M,8)}   ${cit?f(cit,6):'  --  '}   ${pad(bad[0],4)} ${pad(bad[1],4)} ${pad(bad[2],4)} ${pad(bad[3],4)}   ${pad(neg[0],4)}  ${pad(neg[1],4)}  ${pad(neg[2],4)}  ${pad(neg[3],4)}   ${pad(over1,4)}   ${pad(mx,5)}   ${pad(mn,5)}   cls${argcls} (0:${mincls[0]} 1:${mincls[1]} 2:${mincls[2]} 3:${mincls[3]})   ${pad(-om,5)} ${mn===-om?'MATCH':'MISMATCH'}`);
}
console.log('');
console.log('  (E1) REALISABILITY: how many pairs (n1, n2) of divisors of P(z) with gcd(n1, n2) | 2 actually occur as (gcd(r,P), gcd(r+2,P))?');
console.log('   z    k   pairs with gcd | 2   realised   unrealised   unrealised with 2 | exactly one of n1, n2   example');
for(const z of [13,17,19,23]){
  const ps = primesUnder(z), k = ps.length; let W=1; for(const p of ps) W*=p;
  const seen = new Set();
  for(let r=0;r<W;r++){ let m1=0,m2=0; const r2=r+2; for(let i=0;i<k;i++){ const p=ps[i]; if(r%p===0)m1|=1<<i; if(r2%p===0)m2|=1<<i; } seen.add(m1*(1<<k)+m2); }
  let tot=0, un=0, unpar=0, ex=null;
  for(let m1=0;m1<(1<<k);m1++) for(let m2=0;m2<(1<<k);m2++){
    if(((m1&m2) & ~1) !== 0) continue;                 // gcd(n1,n2) | 2
    tot++;
    if(!seen.has(m1*(1<<k)+m2)){ un++; if(((m1&1)^(m2&1))===1){ unpar++; if(!ex) ex=[m1,m2]; } }
  }
  const nm = (m)=>{ let v=1; for(let i=0;i<k;i++) if(m>>i&1) v*=ps[i]; return v; };
  console.log(`  ${pad(z,2)}  ${pad(k,3)}   ${pad(tot,14)}   ${pad(tot-un,8)}   ${pad(un,10)}   ${pad(unpar,10)} (= all of them: ${un===unpar?'yes':'NO'})   (n1,n2) = (${ex?nm(ex[0]):'-'}, ${ex?nm(ex[1]):'-'})`);
}
console.log('');

// ------------------------------------------------------------------ X4 -----
console.log('X4 (E4) T(x) <= cc(r) + (H - 1) TESTED AT EVERY x AND EVERY r IN THE WINDOW, period wrap included');
console.log('  binding form: T(x) - (H-1) <= min{ cc(r) : x < r <= x+H }, by sliding-window minimum over the full period');
console.log('   z     s        H      viol   min_x T   min_x T <= -1?   H <= Omega?   max slack   T at the minimiser\'s window');
for(const S of [S_CHEAP, S3]) for(const z of [13,17,19,23]){
  const st = walkStore[`${z}|${S}`]; if(!st) continue;
  const { cc, W, mn } = st; const Om = -mn;
  const Hs = [...new Set([1,2,3,Om,Om+1,10,50].filter(h=>h>=1&&h<=Math.min(200,W-1)))].sort((a,b)=>a-b);
  for(const H of Hs){
    prog(`X4 z=${z} s=${f(S,4)} H=${H}`);
    const ext = new Int32Array(W+H); for(let i=0;i<W+H;i++) ext[i]=cc[i%W];
    let T=0; for(let i=1;i<=H;i++) T+=ext[i];
    const dq = new Int32Array(W+H); let hd=0, tl=0;
    for(let i=1;i<=H;i++){ while(tl>hd && ext[dq[tl-1]]>=ext[i]) tl--; dq[tl++]=i; }
    let viol=0, minT=T, slack=-Infinity, tAtMin=null;
    for(let x=0;x<W;x++){
      if(x>0){ T += ext[x+H] - ext[x];
        while(tl>hd && dq[hd] <= x) hd++;
        while(tl>hd && ext[dq[tl-1]] >= ext[x+H]) tl--; dq[tl++] = x+H; }
      const mw = ext[dq[hd]];
      if(T - (H-1) > mw) viol++;
      const sl = mw + (H-1) - T; if(sl>slack) slack=sl;
      if(T<minT) minT=T;
      if(tAtMin===null && cc[(x+1)%W]===mn) tAtMin=T;
    }
    console.log(`  ${pad(z,2)}  ${f(S,6)}  ${pad(H,6)}   ${pad(viol,4)}   ${pad(minT,7)}   ${minT<=-1?'yes':'no '}              ${H<=Om?'yes':'no '}          ${pad(slack,6)}       ${pad(tAtMin===null?'-':tAtMin,7)}`);
  }
}
console.log('');
// ------------------------------------------------------------------ X5 -----
// Omega by a DIFFERENT enumeration: an odometer over m1 (every subset of the
// odd primes, in binary-counter order) with an inner submask descent over the
// complement, and the prime 2 handled as "in both / in neither" outside the
// loop. The note's producer uses a ternary recursion over the primes in index
// order and initialises the running max at 0; this one initialises at -inf, so
// a negative maximum would be visible rather than clipped.
function omegaOdometer(z, S){
  const ps = primesUnder(z), k = ps.length, D = Math.pow(z,S), N = 1<<k;
  const sp = supportA(z,D,true), sm = supportA(z,D,false);
  const mp = sp.map(([d])=>maskOfInt(d,ps)), mm = sm.map(([d])=>maskOfInt(d,ps));
  const fp = lamZeta(sp,mp,k), fm = lamZeta(sm,mm,k);
  const SU = new Int32Array(N); for(let m=0;m<N;m++) SU[m] = fp[m] - fm[m];
  const FULLODD = (N-1) ^ 1;
  let best = -Infinity, bm1 = 0, bm2 = 0;
  const half = 1 << (k-1);
  for(let j=0;j<half;j++){
    const m1 = j<<1, comp = FULLODD & ~m1;
    const a10 = fp[m1], b10 = -fm[m1], m1b = m1|1, a11 = fp[m1b], b11 = -fm[m1b];
    let s = comp;
    for(;;){
      const v0 = a10*SU[s] + b10*fp[s];
      if(v0 > best){ best = v0; bm1 = m1; bm2 = s; }
      const s1 = s|1, v1 = a11*SU[s1] + b11*fp[s1];
      if(v1 > best){ best = v1; bm1 = m1b; bm2 = s1; }
      if(s===0) break; s = (s-1) & comp;
    }
  }
  const A1 = fp[bm1], B1 = -fm[bm1], A2 = fp[bm2], B2 = -fm[bm2];
  let dmaxAll = 0, dmaxOddEven = 0;
  for(let j=0;j<sp.length;j++){ const d = sp[j][0]; if(d>dmaxAll) dmaxAll=d;
    if(d % 2 === 1 && sp[j][1] === 1 && d > dmaxOddEven) dmaxOddEven = d; }
  return { best, A1, B1, A2, B2, bm1, bm2, ps, k, np: sp.length, nm: sm.length, D,
           lamPfull: fp[N-1], dmaxAll, dmaxOddEven };
}
console.log('X5 OMEGA BY AN INDEPENDENT ENUMERATION (odometer + submask descent; max initialised at -inf)');
console.log('   z     s        k    |D+|   |D-|    Omega(here)   cited    verdict    log_z Omega   A1    B1    A2    B2   |P1| |P2|  p*1  p*2   minimiser is');
const mineCheap = {}, mineS3 = {};
for(const [S,zs,tag] of [[S_CHEAP,[13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101].filter(z=>z<=ZMAX),'cheapest'],
                         [S3,[13,17,19,23,29,31,37,41,43,47],'s = 3.0']]){
  console.log(`  s = ${f(S,6)} (${tag})`);
  for(const z of zs){
    prog(`X5 ${tag} z=${z}`);
    const r = omegaOdometer(z,S);
    const cited = (S===S_CHEAP) ? (CITED_OMEGA_CHEAP[z] ?? CITED_BLIND[z]) : CITED_OMEGA_S3[z];
    const P1 = r.ps.filter((p,i)=>r.bm1>>i&1), P2 = r.ps.filter((p,i)=>r.bm2>>i&1);
    if(S===S_CHEAP) mineCheap[z]=r.best; else mineS3[z]=r.best;
    console.log(`  ${pad(z,3)}  ${f(S,6)}  ${pad(r.k,3)}  ${pad(r.np,5)}  ${pad(r.nm,5)}   ${pad(r.best,10)}   ${pad(cited??'--',6)}   ${cited===undefined?'no cited  ':(r.best===cited?'CONFIRMED ':'REFUTED   ')}  ${f(Math.log(r.best)/Math.log(z),4)}   ${pad(r.A1,4)}  ${pad(r.B1,4)}  ${pad(r.A2,4)}  ${pad(r.B2,4)}   ${pad(P1.length,2)}   ${pad(P2.length,2)}   ${pad(P1[0]??'-',3)} ${pad(P2[0]??'-',3)}   ${P1.length===0||P2.length===0?'ROUGH on one side':'doubly non-rough '}`);
  }
}
console.log('');

// ------------------------------------------------------------------ X6 -----
console.log('X6 lam+(P(z)) = 0 AND THE REASON THE NOTE GIVES FOR IT');
console.log('  the note (sec.4.4): "lam+(P(z)) = 0 at every level (the D/8 slab is empty: max d/D <= 0.24 everywhere,');
console.log('   so the two-prime and four-prime chains cannot reach it)". D/8 needs max d/D > 1/8 = 0.1250 to be non-empty.');
console.log('   z     s        lam+(P(z))   max d/D over D+   max d/D over the ODD, omega-EVEN part of D+ (the part the slab needs)   0.125 exceeded by column 4?   by column 5?');
for(const z of [13,23,37,47,61,73,83,89].filter(z=>z<=ZMAX)){
  const r = omegaOdometer(z,S_CHEAP);
  console.log(`  ${pad(z,2)}  ${f(S_CHEAP,6)}   ${pad(r.lamPfull,4)}         ${f(r.dmaxAll/r.D,4)}                    ${f(r.dmaxOddEven/r.D,4)}                                              ${r.dmaxAll/r.D>0.125?'YES':'no '}                         ${r.dmaxOddEven/r.D>0.125?'YES':'no '}`);
}
console.log('');

// ------------------------------------------------------------------ X7 -----
console.log('X7 sup|R_1| AGAINST Omega +- M — the note writes sup|rho~| >= (Omega - M)/2; R_1(x) = cc(x+1) - M gives Omega + M');
console.log('   z     s        Omega       M        sup|R_1| (walked)   Omega + M    equal?   (Omega-M)/2   (Omega+M)/2   cited sup|rho~| (s = 3 only)');
for(const S of [S_CHEAP,S3]) for(const z of [13,17,19,23]){
  const st = walkStore[`${z}|${S}`]; if(!st) continue;
  const { cc, W, M, mn } = st; let sup=0;
  for(let r=0;r<W;r++){ const v = Math.abs(cc[r]-M); if(v>sup) sup=v; }
  const Om = -mn;
  console.log(`  ${pad(z,2)}  ${f(S,6)}   ${pad(Om,6)}   ${f(M,7)}   ${f(sup,7)}            ${f(Om+M,7)}    ${Math.abs(sup-(Om+M))<1e-9?'yes':'no '}    ${f((Om-M)/2,5)}       ${f((Om+M)/2,5)}       ${S===S3&&SUPRHO[z]?f(SUPRHO[z],5):'  --'}`);
}
console.log('');

// ------------------------------------------------------------------ X8 -----
console.log('X8 THE ARROW TABLE OF THE NOTE\'S sec.5 REWALKED at s = 2.698721, H = floor(z^4.216450), full period');
console.log('   z      H         W         H>W?   M(walk)     HM        minT   maxT    sup|R_H|   rms(R_H)   sup/rms   log_z(sup/rms)   log_z F    cited sup / rms / minT / maxT   verdict');
for(const z of [13,17,19,23,29]){
  prog(`X8 z=${z}`);
  const ps = primesUnder(z), k = ps.length; let W=1; for(const p of ps) W*=p;
  const H = Math.floor(Math.pow(z,U0)), D = Math.pow(z,S_CHEAP);
  const sp = supportA(z,D,true), sm = supportA(z,D,false);
  const Ln = W + H + 4, Lp = new Int16Array(Ln), Lm = new Int16Array(Ln);
  for(const [d,sg] of sp) for(let n=0;n<Ln;n+=d) Lp[n]+=sg;
  for(const [d,sg] of sm) for(let n=0;n<Ln;n+=d) Lm[n]+=sg;
  const cc = (r)=> Lm[r]*Lp[r+2] + Lp[r]*Lm[r+2] - Lp[r]*Lp[r+2];
  let M=0; for(let r=0;r<W;r++) M+=cc(r); M/=W;
  const HM = H*M;
  let T=0; for(let r=1;r<=H;r++) T+=cc(r);
  let s2=0, sup=0, minT=T, maxT=T;
  for(let x=0;x<W;x++){ if(x>0) T += cc(x+H) - cc(x); const R = T-HM; s2 += R*R;
    if(Math.abs(R)>sup) sup=Math.abs(R); if(T<minT) minT=T; if(T>maxT) maxT=T; }
  const rms = Math.sqrt(s2/W), lnz = Math.log(z), F=(HM-1)/sup, c = CITED_S2[z];
  const okAll = c && Math.abs(sup-c.sup)<5e-3 && Math.abs(rms-c.rms)<5e-4 && minT===c.minT && maxT===c.maxT;
  console.log(`  ${pad(z,2)}  ${pad(H,8)}  ${pad(W,9)}   ${H>W?'yes':' no'}   ${f(M,8)}  ${pad(f(HM,1),9)}  ${pad(minT,6)} ${pad(maxT,6)}   ${pad(f(sup,3),8)}   ${f(rms,4)}     ${f(sup/rms,3)}      ${f(Math.log(sup/rms)/lnz,4)}         ${f(Math.log(F)/lnz,4)}    ${c?`${f(c.sup,3)} / ${f(c.rms,4)} / ${c.minT} / ${c.maxT}`:'27.971 / 5.8294 / 41384 / 41439'}   ${okAll?'REPRODUCED':(c?'DIFFERS':'compare by eye against the note sec.5 row')}`);
}
console.log('');
console.log('DONE');
}
main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0830-floor-sign.js
//   invocation:  node research/history/staging/redteam-0830-floor-sign.js
//   code-sha256: 68c8160bc3142182e62f67d8aa7e7049ec7fc395dbb1078227168a521593589b
//   out-sha256:  1e024830ab87f5b4bed1054063707cbebd90df5e189ae5a6b42f91b1ef27ffa5
//   body-lines:  212
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     2321.5 s
// ============================================================================
// redteam-0830-floor-sign.js — adversarial re-derivation of the EXACT half (E1-E4, Omega)
//
// X0 ARITHMETIC OF THE NOTE'S OWN SENTENCES
//   1+sqrt(e) = 2.648721270700   2(1+sqrt(e)) - beta_2 = 1.030992   (note sec.1: 1.030992)
//   working point: s = 2.698721, u0 = 4.216450;  2s - u0 = 1.180992;  u0/2 = 2.108225
//   16s/9 at s = 1+sqrt(e): 4.708838 (note: 4.7088);  minus beta_2 = 0.442388 (note: 0.4424); d/d eta = 2.7778 (note: 2.78)
//   16s/9 at s = 3: 5.333333 (note: 5.3333);  at the working s: 4.797727
//   moment-order ratio: at eta = 0 (the note's own 2.1332) (beta_2/2)/1.5 = 1.4222 (note sec.2 item 2: 1.42); at the working eta = 0.05 it is 1.4055
//   THE COMPARAND AT z = 73: z^{u0} = 7.188e+7;  the note's sec.0/ledger says "z^{u0} = 1.05e6".
//     1.05e6 is H*M (the note's own S3 column "HM(u0)" = 1.052e6), not z^{u0}. Ratio z^{u0}/(1.05e6) = 6.833e+1, i.e. M = 1.464e-2.
//     Omega(73)/z^{u0} = 3.492e-6 against the note's quoted 251/1.05e6 = 2.386e-4.
//   W(41)/W(37) = 37 exactly  (quoted: 37)
//   W(43)/W(37) = 1517 exactly  (quoted: 1517)
//   W(47)/W(37) = 65231 exactly  (quoted: 65,232)
//
// X1 SUPPORT CUSTODY — D+/D- rebuilt from the prefix conditions; route A (recursion) vs route B (every squarefree divisor re-tested)
//    z      s        |D+|A  |D+|B   |D-|A  |D-|B   agree   note's table
//   13  2.698721     16    16      20    20   yes     16, 20 MATCH
//   17  2.698721     28    28      32    32   yes     28, 32 MATCH
//   19  2.698721     42    42      40    40   yes     42, 40 MATCH
//   23  2.698721     44    44      60    60   yes     44, 60 MATCH
//   13  3.000000     28    28      24    24   yes     28, 24 MATCH
//   17  3.000000     44    44      44    44   yes     44, 44 MATCH
//   19  3.000000     64    64      58    58   yes     64, 58 MATCH
//   23  3.000000     96    96      74    74   yes     96, 74 MATCH
//
// X2 (E2) THE SIGN FACTS OVER EVERY DIVISOR n > 1 OF P(z), three disjoint routes for lam+-
//   vp = #{n > 1 : lam+(n) < 0}   vm = #{n > 1 : lam-(n) > 0}   d13 = #{n : direct != chain}   d1z = #{n : direct != zeta}
//    z    s        k     |D+|   |D-|    vp    vm    d13   d1z   lam+(1)  lam-(1)   min lam+   max lam-   verdict
//   13  0.8000     5       1      5     0     1     1     0      1        1         1          1   E2 FAILS
//   13  1.0000     5       2      6     0     0     0     0      1        1         0          0   E2 holds
//   13  1.5000     5       4      8     0     0     0     0      1        1         0          0   E2 holds
//   13  2.0000     5       8     12     0     0     0     0      1        1         0          0   E2 holds
//   13  2.6987     5      16     20     0     0     0     0      1        1         0          0   E2 holds
//   13  3.0000     5      28     24     0     0     0     0      1        1         0          0   E2 holds
//   13  4.0000     5      32     32     0     0     0     0      1        1         0          0   E2 holds
//   13  6.0000     5      32     32     0     0     0     0      1        1         0          0   E2 holds
//   17  0.8000     6       2      5     0     3     3     0      1        1         0          1   E2 FAILS
//   17  1.0000     6       2      7     0     0     0     0      1        1         0          0   E2 holds
//   17  1.5000     6       4     10     0     0     0     0      1        1         0          0   E2 holds
//   17  2.0000     6       8     16     0     0     0     0      1        1         0          0   E2 holds
//   17  2.6987     6      28     32     0     0     0     0      1        1         0          0   E2 holds
//   17  3.0000     6      44     44     0     0     0     0      1        1         0          0   E2 holds
//   17  4.0000     6      62     60     0     0     0     0      1        1         0          0   E2 holds
//   17  6.0000     6      64     64     0     0     0     0      1        1         0          0   E2 holds
//   19  0.8000     7       2      5     0     7     7     0      1        1         0          1   E2 FAILS
//   19  1.0000     7       2      8     0     0     0     0      1        1         0          0   E2 holds
//   19  1.5000     7       4     11     0     0     0     0      1        1         0          0   E2 holds
//   19  2.0000     7      14     22     0     0     0     0      1        1         0          0   E2 holds
//   19  2.6987     7      42     40     0     0     0     0      1        1         0          0   E2 holds
//   19  3.0000     7      64     58     0     0     0     0      1        1         0          0   E2 holds
//   19  4.0000     7     106    108     0     0     0     0      1        1         0          0   E2 holds
//   19  6.0000     7     128    128     0     0     0     0      1        1         0          0   E2 holds
//   23  0.8000     8       2      6     0     7     7     0      1        1         0          1   E2 FAILS
//   23  1.0000     8       2      9     0     0     0     0      1        1         0          0   E2 holds
//   23  1.5000     8       4     14     0     0     0     0      1        1         0          0   E2 holds
//   23  2.0000     8      14     28     0     0     0     0      1        1         0          0   E2 holds
//   23  2.6987     8      44     60     0     0     0     0      1        1         0          0   E2 holds
//   23  3.0000     8      96     74     0     0     0     0      1        1         0          0   E2 holds
//   23  4.0000     8     174    188     0     0     0     0      1        1         0          0   E2 holds
//   23  6.0000     8     256    256     0     0     0     0      1        1         0          0   E2 holds
//   29  0.8000     9       2      7     0     7     7     0      1        1         0          1   E2 FAILS
//   29  1.0000     9       4     11     0     0     0     0      1        1         0          0   E2 holds
//   29  2.6987     9      88     86     0     0     0     0      1        1         0          0   E2 holds
//   29  3.0000     9     144    114     0     0     0     0      1        1         0          0   E2 holds
//   31  0.8000    10       2      7     0    15    15     0      1        1         0          1   E2 FAILS
//   31  1.0000    10       4     12     0     0     0     0      1        1         0          0   E2 holds
//   31  2.6987    10      92    102     0     0     0     0      1        1         0          0   E2 holds
//   31  3.0000    10     188    144     0     0     0     0      1        1         0          0   E2 holds
//   37  0.8000    11       2      8     0    15    15     0      1        1         0          1   E2 FAILS
//   37  1.0000    11       4     13     0     0     0     0      1        1         0          0   E2 holds
//   37  2.6987    11     132    120     0     0     0     0      1        1         0          0   E2 holds
//   37  3.0000    11     270    236     0     0     0     0      1        1         0          0   E2 holds
//
// X3 (E1)/(E3) EVERY POSITION OF Z/W, z = 13..23, both s — identity, signs and cc <= 1 by class
//   cls0 = doubly non-rough, cls1 = r rough (n1 = 1), cls2 = r+2 rough (n2 = 1), cls3 = both rough
//   bad = identity mismatches; neg = positions where some of A1,B1,A2,B2 is NEGATIVE; mincc = min cc over the class
//    z    s        W          M(walk)     M cited    bad0 bad1 bad2 bad3   neg0  neg1  neg2  neg3   cc>1   maxcc   mincc  (class of the minimiser)   -Omega cited
//   13  2.698721       2310   0.05064935   0.050649      0    0    0    0      0   345   345   135      0       1      -1   cls1 (0:0 1:-1 2:-1 3:1)      -1 MATCH
//   17  2.698721      30030   0.04378954   0.043790      0    0    0    0      0  4275  4275  1485      0       1      -2   cls2 (0:-1 1:-2 2:-2 3:1)      -2 MATCH
//   19  2.698721     510510   0.03535092   0.035351      0    0    0    0      0  69885  69885  22275      0       1      -3   cls0 (0:-3 1:-3 2:-3 3:1)      -3 MATCH
//   23  2.698721    9699690   0.03070047   0.030700      0    0    0    0      0  1280205  1280205  378675      0       1      -6   cls0 (0:-6 1:-3 2:-3 3:1)      -6 MATCH
//   13  3.000000       2310   0.05584416     --        0    0    0    0      0   345   345   135      0       1      -1   cls2 (0:0 1:-1 2:-1 3:1)      -1 MATCH
//   17  3.000000      30030   0.04698635     --        0    0    0    0      0  4275  4275  1485      0       1      -2   cls1 (0:0 1:-2 2:-2 3:1)      -2 MATCH
//   19  3.000000     510510   0.03959766     --        0    0    0    0      0  69885  69885  22275      0       1      -3   cls1 (0:-1 1:-3 2:-3 3:1)      -3 MATCH
//   23  3.000000    9699690   0.03416924     --        0    0    0    0      0  1280205  1280205  378675      0       1      -3   cls1 (0:-3 1:-3 2:-3 3:1)      -3 MATCH
//
//   (E1) REALISABILITY: how many pairs (n1, n2) of divisors of P(z) with gcd(n1, n2) | 2 actually occur as (gcd(r,P), gcd(r+2,P))?
//    z    k   pairs with gcd | 2   realised   unrealised   unrealised with 2 | exactly one of n1, n2   example
//   13    5              324        162          162          162 (= all of them: yes)   (n1,n2) = (1, 2)
//   17    6              972        486          486          486 (= all of them: yes)   (n1,n2) = (1, 2)
//   19    7             2916       1458         1458         1458 (= all of them: yes)   (n1,n2) = (1, 2)
//   23    8             8748       4374         4374         4374 (= all of them: yes)   (n1,n2) = (1, 2)
//
// X4 (E4) T(x) <= cc(r) + (H - 1) TESTED AT EVERY x AND EVERY r IN THE WINDOW, period wrap included
//   binding form: T(x) - (H-1) <= min{ cc(r) : x < r <= x+H }, by sliding-window minimum over the full period
//    z     s        H      viol   min_x T   min_x T <= -1?   H <= Omega?   max slack   T at the minimiser's window
//   13  2.698721       1      0        -1   yes              yes               0            -1
//   13  2.698721       2      0        -1   yes              no                1            -1
//   13  2.698721       3      0        -1   yes              no                2            -1
//   13  2.698721      10      0        -1   yes              no                9             0
//   13  2.698721      50      0         0   no               no               48             1
//   17  2.698721       1      0        -2   yes              yes               0            -2
//   17  2.698721       2      0        -2   yes              yes               1            -2
//   17  2.698721       3      0        -2   yes              no                2            -2
//   17  2.698721      10      0        -2   yes              no                9            -1
//   17  2.698721      50      0        -1   yes              no               49             3
//   19  2.698721       1      0        -3   yes              yes               0            -3
//   19  2.698721       2      0        -3   yes              yes               1            -3
//   19  2.698721       3      0        -3   yes              yes               3            -3
//   19  2.698721       4      0        -3   yes              no                4            -3
//   19  2.698721      10      0        -3   yes              no               10            -2
//   19  2.698721      50      0        -2   yes              no               50             1
//   23  2.698721       1      0        -6   yes              yes               0            -6
//   23  2.698721       2      0        -6   yes              yes               1            -6
//   23  2.698721       3      0        -6   yes              yes               4            -6
//   23  2.698721       6      0        -6   yes              yes               8            -6
//   23  2.698721       7      0        -6   yes              no                9            -5
//   23  2.698721      10      0        -6   yes              no               12            -5
//   23  2.698721      50      0        -5   yes              no               52            -5
//   13  3.000000       1      0        -1   yes              yes               0            -1
//   13  3.000000       2      0        -1   yes              no                1            -1
//   13  3.000000       3      0        -1   yes              no                2            -1
//   13  3.000000      10      0        -1   yes              no                9            -1
//   13  3.000000      50      0         0   no               no               48             1
//   17  3.000000       1      0        -2   yes              yes               0            -2
//   17  3.000000       2      0        -2   yes              yes               1            -2
//   17  3.000000       3      0        -4   yes              no                4            -4
//   17  3.000000      10      0        -3   yes              no               10            -3
//   17  3.000000      50      0        -2   yes              no               49            -2
//   19  3.000000       1      0        -3   yes              yes               0            -3
//   19  3.000000       2      0        -3   yes              yes               1            -3
//   19  3.000000       3      0        -6   yes              yes               5            -6
//   19  3.000000       4      0        -6   yes              no                6            -6
//   19  3.000000      10      0        -5   yes              no               11            -5
//   19  3.000000      50      0        -5   yes              no               51            -5
//   23  3.000000       1      0        -3   yes              yes               0            -3
//   23  3.000000       2      0        -3   yes              yes               1            -3
//   23  3.000000       3      0        -6   yes              yes               5            -3
//   23  3.000000       4      0        -6   yes              no                6            -3
//   23  3.000000      10      0        -6   yes              no               12            -3
//   23  3.000000      50      0        -5   yes              no               52             0
//
// X5 OMEGA BY AN INDEPENDENT ENUMERATION (odometer + submask descent; max initialised at -inf)
//    z     s        k    |D+|   |D-|    Omega(here)   cited    verdict    log_z Omega   A1    B1    A2    B2   |P1| |P2|  p*1  p*2   minimiser is
//   s = 2.698721 (cheapest)
//    13  2.698721    5     16     20            1        1   CONFIRMED   0.0000      1    -1     0     1    0    3     -   5   ROUGH on one side
//    17  2.698721    6     28     32            2        2   CONFIRMED   0.2447      1    -1     0     2    0    3     -   7   ROUGH on one side
//    19  2.698721    7     42     40            3        3   CONFIRMED   0.3731      1    -1     1     3    0    4     -   7   ROUGH on one side
//    23  2.698721    8     44     60            6        6   CONFIRMED   0.5714      3     0     1     1    4    2     5  17   doubly non-rough
//    29  2.698721    9     88     86           10       10   CONFIRMED   0.6838     10     0     1     0    6    1     5  23   doubly non-rough
//    31  2.698721   10     92    102           18       18   CONFIRMED   0.8417      9     0     1     1    6    2     5  23   doubly non-rough
//    37  2.698721   11    132    120           22       22   CONFIRMED   0.8560     11     0     1     1    7    2     5  29   doubly non-rough
//    41  2.698721   12    140    148           30       30   CONFIRMED   0.9159     10     0     1     2    6    3     7  29   doubly non-rough
//    43  2.698721   13    180    180           45       45   CONFIRMED   1.0121     15     0     1     2    7    3     7  31   doubly non-rough
//    47  2.698721   14    236    210           63       63   CONFIRMED   1.0761     21     0     1     2    8    3     7  37   doubly non-rough
//    53  2.698721   15    252    282           86       86   CONFIRMED   1.1219     21     2     1     3    8    4     7  37   doubly non-rough
//    59  2.698721   16    322    344          111      111   CONFIRMED   1.1550     27     3     1     3    9    4     7  41   doubly non-rough
//    61  2.698721   17    336    390          134      134   CONFIRMED   1.1914     26     4     1     4    9    5     7  41   doubly non-rough
//    67  2.698721   18    490    466          168      168   CONFIRMED   1.2186     28     2     0     6    9    8    13   3   doubly non-rough
//    71  2.698721   19    516    546          205      205   CONFIRMED   1.2487     39    10     1     4   11    5     7  47   doubly non-rough
//    73  2.698721   20    598    590          251      251   CONFIRMED   1.2878     48    11     1     4   12    5     7  53   doubly non-rough
//    79  2.698721   21    638    678          285       --   no cited    1.2936     15     6     0    19    7   12    19   5   doubly non-rough
//    83  2.698721   22    756    758          441       --   no cited    1.3780     21     7     0    21    8   12    19   5   doubly non-rough
//    89  2.698721   23    818    900          684      684   CONFIRMED   1.4543     36     4     0    19   10   11    17   5   doubly non-rough
//    97  2.698721   24   1084   1066          990       --   no cited    1.5078     55     4     0    18   12   10    17   5   doubly non-rough
//   101  2.698721   25   1140   1154         1155     1155   CONFIRMED   1.5280     55     3     0    21   12   11    17   5   doubly non-rough
//   s = 3.000000 (s = 3.0)
//    13  3.000000    5     28     24            1        1   CONFIRMED   0.0000      1    -1     0     1    0    2     -   7   ROUGH on one side
//    17  3.000000    6     44     44            2        2   CONFIRMED   0.2447      1    -1     0     2    0    5     -   3   ROUGH on one side
//    19  3.000000    7     64     58            3        3   CONFIRMED   0.3731      1    -1     0     3    0    6     -   3   ROUGH on one side
//    23  3.000000    8     96     74            3        3   CONFIRMED   0.3504      1    -1     0     3    0    7     -   3   ROUGH on one side
//    29  3.000000    9    144    114            3        3   CONFIRMED   0.3263      1    -1     0     3    0    8     -   3   ROUGH on one side
//    31  3.000000   10    188    144            9        9   CONFIRMED   0.6398      3     0     3     0    4    4     7   5   doubly non-rough
//    37  3.000000   11    270    236           21       21   CONFIRMED   0.8431      5     2     3     0    5    4     7   5   doubly non-rough
//    41  3.000000   12    344    294           36       36   CONFIRMED   0.9650      4     2     6     0    5    5     7   5   doubly non-rough
//    43  3.000000   13    420    328           63       63   CONFIRMED   1.1015      9     3     3     3    6    4     7  17   doubly non-rough
//    47  3.000000   14    526    418          100      100   CONFIRMED   1.1961      0    10    10     5    6    6     5  23   doubly non-rough
//
// X6 lam+(P(z)) = 0 AND THE REASON THE NOTE GIVES FOR IT
//   the note (sec.4.4): "lam+(P(z)) = 0 at every level (the D/8 slab is empty: max d/D <= 0.24 everywhere,
//    so the two-prime and four-prime chains cannot reach it)". D/8 needs max d/D > 1/8 = 0.1250 to be non-empty.
//    z     s        lam+(P(z))   max d/D over D+   max d/D over the ODD, omega-EVEN part of D+ (the part the slab needs)   0.125 exceeded by column 4?   by column 5?
//   13  2.698721      0         0.2070                    0.0345                                              YES                         no
//   23  2.698721      0         0.1814                    0.0302                                              YES                         no
//   37  2.698721      0         0.2338                    0.1169                                              YES                         no
//   47  2.698721      0         0.2332                    0.1166                                              YES                         no
//   61  2.698721      0         0.2248                    0.1124                                              YES                         no
//   73  2.698721      0         0.2390                    0.1195                                              YES                         no
//   83  2.698721      0         0.2362                    0.1181                                              YES                         no
//   89  2.698721      0         0.2397                    0.1199                                              YES                         no
//
// X7 sup|R_1| AGAINST Omega +- M — the note writes sup|rho~| >= (Omega - M)/2; R_1(x) = cc(x+1) - M gives Omega + M
//    z     s        Omega       M        sup|R_1| (walked)   Omega + M    equal?   (Omega-M)/2   (Omega+M)/2   cited sup|rho~| (s = 3 only)
//   13  2.698721        1   0.0506494   1.0506494            1.0506494    yes    0.47468       0.52532         --
//   17  2.698721        2   0.0437895   2.0437895            2.0437895    yes    0.97811       1.02189         --
//   19  2.698721        3   0.0353509   3.0353509            3.0353509    yes    1.48232       1.51768         --
//   23  2.698721        6   0.0307005   6.0307005            6.0307005    yes    2.98465       3.01535         --
//   13  3.000000        1   0.0558442   1.0558442            1.0558442    yes    0.47208       0.52792       2.62013
//   17  3.000000        2   0.0469863   2.0469863            2.0469863    yes    0.97651       1.02349       4.33665
//   19  3.000000        3   0.0395977   3.0395977            3.0395977    yes    1.48020       1.51980       9.15247
//   23  3.000000        3   0.0341692   3.0341692            3.0341692    yes    1.48292       1.51708       12.10617
//
// X8 THE ARROW TABLE OF THE NOTE'S sec.5 REWALKED at s = 2.698721, H = floor(z^4.216450), full period
//    z      H         W         H>W?   M(walk)     HM        minT   maxT    sup|R_H|   rms(R_H)   sup/rms   log_z(sup/rms)   log_z F    cited sup / rms / minT / maxT   verdict
//   13     49760       2310   yes   0.05064935     2520.3    2517   2523      3.312   1.0567     3.134      0.4453         2.5865    3.312 / 1.0567 / 2517 / 2523   REPRODUCED
//   17    154215      30030   yes   0.04378954     6753.0    6748   6759      5.996   1.9121     3.136      0.4034         2.4801    5.996 / 1.9121 / 6748 / 6759   REPRODUCED
//   19    246490     510510    no   0.03535092     8713.6    8704   8722      9.649   2.4586     3.925      0.4644         2.3114    9.649 / 2.4586 / 8704 / 8722   REPRODUCED
//   23    551642    9699690    no   0.03070047    16935.7   16922  16950     14.334   3.1119     4.606      0.4871         2.2563    14.334 / 3.1119 / 16922 / 16950   REPRODUCED
//   29   1465981  223092870    no   0.02824800    41411.0   41384  41439     27.971   5.8294     4.798      0.4657         2.1679    27.971 / 5.8294 / 41384 / 41439   REPRODUCED
//
// DONE
// ============================================================================
// READINGS
//
