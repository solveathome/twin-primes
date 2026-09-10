// ============================================================================
// EXACT (or one-sided prefix) SUPREMUM OF THE SIEVE REMAINDER R_H, MEASURED AT
// A WINDOW THE CALLER CHOOSES -- and, on request, at the window that measures
// its own requirement.   research/theta-ladder.md sec 5b, TODO item 0.
// ----------------------------------------------------------------------------
// WHAT THIS COMPUTES. With cc(r) the certificate's per-position weight and
//   T_H(x) = sum_{r in (x, x+H]} cc(r) = H*M + R_H(x),
// the walk returns, over x in [0, NPOS):
//   sup|R_H| = max_x |T_H(x) - H*M|      minT_H = min_x T_H(x)
// and the all-positions requirement it implies,
//   need_true(H) = sup|R_H| / M          th_true = ln(need_true)/ln z.
// NPOS is the full period W = P(z) unless a prefix LIMIT is given.
//
// THE DEFECT THIS FILE WAS REWRITTEN TO REMOVE (2026-08-19).
// Line 18 of the previous version read
//     const z=Number(process.argv[2]), u=3.2, s=3.0;
// -- z came from the caller and u never did. Every need_true in theta-ladder.md
// sec 5b is therefore sup|R| measured at H = z^3.2 while the conclusion drawn
// from it concerns a window near 0.5 z^2, i.e. 39x to 62x shorter. sup|R_H|
// grows with H, so the published column OVERSTATES the requirement (by 1.58x,
// 1.74x, 2.17x at z = 19, 23, 29). See research/history/staging/
// phase1-T4-maximal-law.md sec 4, and the correction box in theta-ladder.md 5b.
// The window is now an argument, and --fixed-point makes the script find the
// only window at which the question is well posed.
//
// SELF-CONSISTENCY AND THE FIXED POINT.
// A certificate judged at window H must have its requirement measured at that
// same H. Define
//     f(H) = ceil( sup|R_H| / M ),
// the smallest integer window whose main term H*M covers the supremum measured
// AT H. H is self-consistent iff H = f(H). --fixed-point iterates
//     H_{n+1} = f(H_n),    H_0 = --H0 (default round(0.25 * z^2), BELOW the
//                                       answer, so the orbit climbs into it),
// CONVERGENCE CRITERION: stop when H_{n+1} === H_n exactly (integer equality;
// there is no tolerance, the iterate is an integer window length). f is an
// integer map on a bounded range, so the orbit is eventually periodic; if a
// previously visited H recurs without a fixed point the run reports CYCLE and
// returns max(cycle), the conservative end, rather than a fixed point. The code
// assumes no monotonicity; only the cycle guard.
//
// THE FIXED POINT IS NOT UNIQUE, AND THAT IS A PROPERTY OF THE QUESTION.
// sup|R_H| >= H*M - minT_H, so as soon as minT_H = 0 (with a smaller upper
// deviation) f(H) = H exactly. Every such H is a fixed point, and minT_H is NOT
// monotone in H: at z = 19 minT is 0 at H = 181 and negative again at H = 197.
// So the orbit lands on the FIRST self-consistent window at or above H0, which
// certifies T >= 0 and not T >= 1. Three thresholds, all reported, do not
// conflate them:
//   H*  the first self-consistent window: need_true(H*) = H*, i.e. H* M =
//       sup|R_{H*}|. This is TODO 0's "iterate to the fixed point", verbatim.
//   nP  the smallest window at which the certificate is OBSERVED positive at
//       every position (minT_H >= 1) and stays so over the whole scanned band.
//       --band=w scans every integer in [H*-w, H*+w] in ONE walk and returns it.
//       This is the "self-consistent nP" of phase1-T4-maximal-law.md sec 4.
//   nS  the smallest window from which the SUP certifies positivity outright,
//       H*M - sup|R_H| >= 1 for that H and every larger H in the band. nS >= nP,
//       and nS is what the corpus's need_true convention is really asking for.
// nP is a FINITE VERIFICATION, not a proof; nS is the certified counterpart.
//
// PREFIX MODE IS ONE-SIDED. With LIMIT < W the walk sees a prefix of the
// period, so sup|R_H| is a LOWER bound on the true supremum, hence f(H), H* and
// need_true are lower bounds too -- safe for "the requirement is at least this
// large", worthless for "the certificate is positive everywhere", because
// minT over a prefix is an UPPER bound on minT over the period. Prefix runs
// print PREFIX on every line and refuse to call positivity certified.
//
// CUSTODY: must reproduce fullPeriodArray()'s answers exactly. At u = 3.2 the
// old contract was sup|R| = 12.4270, 18.8274, 15.3410, 26.9407 at z = 19, 20,
// 23, 29; `--u=3.2` still reproduces those. Segmented storage exists because
// W + H exceeds the 2^32-1 typed-array limit fullPeriodArray runs into (z>=31).
//
// USAGE (the old positional interface still works; the window is now required)
//   node research/theta-ladder-sup.js <z> [LIMIT] [gauss] [flags]
//     --u=<x>          H = round(z^x)                 (the old hardcoded 3.2)
//     --H=<n>          H directly; overrides --u
//     --Hs=a:b[:step]  a band of windows measured in ONE walk
//     --fixed-point    iterate H_{n+1} = f(H_n) to self-consistency
//     --H0=<n>         start of that iteration      (default round(0.25*z^2))
//     --maxit=<n>      iteration cap                 (default 20)
//     --band=<w>       after convergence, walk [H*-w, H*+w] and report nP, nS
//                      and every fixed point of f in the band, from ONE walk
//     --s=<x>          sieve level D = z^x           (default 3.0)
//     --strict         iterate g(H) = ceil((sup|R_H|+1)/M) instead of f, whose
//                      fixed point certifies T >= 1 rather than T >= 0
//     --gauss          add the conditional columns (costs the O(N^2) row)
// Examples
//   node research/theta-ladder-sup.js 29 --fixed-point --band=40
//   node research/theta-ladder-sup.js 29 --u=3.2            # the old number
//   node research/theta-ladder-sup.js 43 4000000000 --fixed-point   # one-sided
// ============================================================================
'use strict';
const L=require(require('path').join(__dirname,'sift-limit-lemmaV.js'));
function primesBelow(n){const s=new Uint8Array(n),o=[];for(let i=2;i<n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<n;j+=i)s[j]=1;}}return o;}
function rosserSupport(z,D,upper){         // copied verbatim from the repo file
  const ps=primesBelow(z).slice().sort((a,b)=>b-a); const out=[];
  (function rec(start,prod,m){ out.push([prod,(m%2===0)?1:-1]);
    for(let i=start;i<ps.length;i++){ const p=ps[i],m2=m+1;
      if(prod*p>D) continue;
      const isCond=upper?(m2%2===1):(m2%2===0);
      if(isCond&&prod*p*p*p>D) continue;
      rec(i+1,prod*p,m2); } })(0,1,0);
  return out;
}
// ---- argument handling -----------------------------------------------------
const argv=process.argv.slice(2);
const flags=argv.filter(a=>a.startsWith('--'));
const pos=argv.filter(a=>!a.startsWith('--'));
const opt=(n,d)=>{ const f=flags.find(a=>a===('--'+n)||a.startsWith('--'+n+'=')); if(!f) return d;
  const i=f.indexOf('='); return i===-1?true:f.slice(i+1); };
const z=Number(pos[0]);
// positional 2: walk only the first LIMIT positions of the period. The sup over
// a prefix is a LOWER bound on the true sup, hence a lower bound on the true
// all-positions requirement -- one-sided, but conditional on nothing.
// (a non-numeric positional is never a LIMIT: the legacy 3rd positional is the
// literal word `gauss`, and a typo must not silently become LIMIT = NaN.)
const LIMIT=(pos[1]!==undefined&&Number.isFinite(Number(pos[1])))?Number(pos[1]):Infinity;
if(pos[1]!==undefined&&!Number.isFinite(Number(pos[1]))&&pos[1]!=='gauss'){
  console.error(`positional 2 must be a numeric LIMIT or the word gauss, got "${pos[1]}"`); process.exit(2); }
const WANT=pos.includes('gauss')||opt('gauss',false)===true;
const s=Number(opt('s',3.0));
const FIXED=opt('fixed-point',false)===true;
const BAND=Number(opt('band',0));
const MAXIT=Number(opt('maxit',20));
const uArg=opt('u',null), HArg=opt('H',null), HsArg=opt('Hs',null);
if(!Number.isFinite(z)||z<3){ console.error('usage: node research/theta-ladder-sup.js <z> [LIMIT] [gauss] [--u=..|--H=..|--Hs=a:b[:st]|--fixed-point]'); process.exit(2); }
if(!FIXED&&uArg===null&&HArg===null&&HsArg===null){
  console.error('REFUSING TO GUESS THE WINDOW. This script used to hardcode u = 3.2 and take it');
  console.error('from no caller, which is the defect recorded in theta-ladder.md sec 5b. Pass one of');
  console.error('  --u=<x>   --H=<n>   --Hs=a:b[:step]   --fixed-point');
  process.exit(2);
}
const D=Math.round(Math.pow(z,s));
let W=1, lnW=0; for(const p of primesBelow(z)){ W*=p; lnW+=Math.log(p); }
const NPOS=Math.min(W,LIMIT), PREFIX=NPOS<W;
const sp=rosserSupport(z,D,true), sm=rosserSupport(z,D,false);
const t=L.buildTerms(z,D), M=t.M;
const t0=Date.now();
const el=()=>((Date.now()-t0)/1000).toFixed(1);
// ---- the walk: sup|R_H| and minT_H for a whole list of H, in ONE pass ------
// Cost is O(NPOS * |Hs|) in the accumulator loop and O(NPOS) in cc(r), so a
// band of a few dozen windows is a small multiple of a single-window walk.
let WALKS=0, WALKPOS=0;
function walk(Hs){
  const K=Hs.length, Hmax=Hs[K-1];
  const TOT=NPOS+Hmax;
  let B=1<<24; { let b=1<<16; while(b<TOT+2&&b<(1<<24)) b<<=1; B=Math.min(1<<24,b); }
  const Lp=new Int32Array(B+2), Lm=new Int32Array(B+2);
  function fill(a){                                // cc(r) for r in [a, a+B)
    Lp.fill(0); Lm.fill(0);
    for(const [d,sg] of sp){ let n=Math.ceil(a/d)*d; for(;n<a+B+2;n+=d) Lp[n-a]+=sg; }
    for(const [d,sg] of sm){ let n=Math.ceil(a/d)*d; for(;n<a+B+2;n+=d) Lm[n-a]+=sg; }
  }
  let RS=1; while(RS<Hmax+1) RS<<=1; const MASK=RS-1;
  const ring=new Float64Array(RS);
  const T=new Float64Array(K), sup=new Float64Array(K), minT=new Float64Array(K).fill(Infinity);
  const HA=Int32Array.from(Hs), HM=Float64Array.from(Hs.map(h=>h*M));
  let base=-1;
  for(let r=0;r<TOT;r++){
    const blk=r-(r%B);
    if(blk!==base){ base=blk; fill(base);
      process.stderr.write(`  block ${(base/B)|0}/${Math.ceil(TOT/B)}  ${((Date.now()-t0)/1000).toFixed(0)}s\n`); }
    const i=r-base;
    const cc=Lm[i]*Lp[i+2]+Lp[i]*Lm[i+2]-Lp[i]*Lp[i+2];
    ring[r&MASK]=cc;
    for(let k=0;k<K;k++){
      let v=T[k]+cc; const h=HA[k];
      if(r>=h) v-=ring[(r-h)&MASK];
      T[k]=v;
      const x=r-h;
      if(x>=0&&x<NPOS){ const dv=Math.abs(v-HM[k]); if(dv>sup[k]) sup[k]=dv; if(v<minT[k]) minT[k]=v; }
    }
  }
  WALKS++; WALKPOS+=TOT;
  return { sup:Array.from(sup), minT:Array.from(minT) };
}
const STRICT=opt('strict',false)===true;
// The self-consistency map. f is the corpus convention need = sup|R|/M, whose
// fixed point certifies T >= 0 only; --strict uses g, which certifies T >= 1.
const f=(H,supH)=>Math.ceil((STRICT?supH+1:supH)/M);
const rows=[];
const pushRow=(H,supH,minTH,tag)=>{
  const need=supH/M;
  rows.push({ H, sup:supH, minT:minTH, need, th:Math.log(need)/Math.log(z),
              needOverZ2:need/(z*z), HOverZ2:H/(z*z), u:Math.log(H)/Math.log(z),
              HM:H*M, positive:minTH>=1, tag });
  return rows[rows.length-1];
};
// ---- mode 1: explicit windows ---------------------------------------------
let Hlist=null;
if(HsArg&&HsArg!==true){ const p=String(HsArg).split(':').map(Number);
  const st=p[2]||1; Hlist=[]; for(let h=p[0];h<=p[1];h+=st) Hlist.push(h); }
else if(HArg!==null&&HArg!==true) Hlist=[Math.round(Number(HArg))];
else if(uArg!==null&&uArg!==true) Hlist=[Math.round(Math.pow(z,Number(uArg)))];
// ---- mode 2: the fixed point ----------------------------------------------
let Hstar=null, iters=0, cycle=false;
if(FIXED){
  // H0 default sits BELOW the answer on purpose: f is not injective and every
  // H with minT_H = 0 (and a smaller upper deviation) is a fixed point of it, so
  // the orbit must climb into the region from below to land on the FIRST one.
  let H=Math.round(Number(opt('H0',Math.round(0.25*z*z))));
  const seen=new Map(); const orbit=[];
  for(;;){
    if(iters>=MAXIT){ console.log(`  !! no fixed point in ${MAXIT} iterations, orbit ${orbit.join(' -> ')}`); break; }
    const w=walk([H]); iters++;
    const nx=f(H,w.sup[0]);
    console.log(`  it ${String(iters).padStart(2)}: H=${String(H).padStart(7)}  sup|R|=${w.sup[0].toFixed(4).padStart(10)}  H*M=${(H*M).toFixed(4).padStart(10)}  minT=${w.minT[0]}  f(H)=ceil(sup/M)=${nx}${nx===H?'   FIXED POINT':''}   [${el()}s]`);
    orbit.push(H);
    if(nx===H){ Hstar=H; pushRow(H,w.sup[0],w.minT[0],PREFIX?'fixed-point PREFIX':'fixed-point exact'); break; }
    if(seen.has(nx)){ cycle=true; const cyc=orbit.slice(orbit.indexOf(nx)); const mx=Math.max(...cyc,nx);
      console.log(`  !! CYCLE ${cyc.join(' -> ')} -> ${nx}; reporting the conservative end H=${mx}`);
      const w2=walk([mx]); Hstar=mx; pushRow(mx,w2.sup[0],w2.minT[0],'cycle-max'); break; }
    seen.set(H,nx); H=nx;
  }
}
// ---- mode 3: a BAND of windows in one walk -> nP, nS, and the fixed points --
// The band is the efficient instrument: one pass over the period answers every
// integer window in it, so nP and nS and every fixed point of f come out of a
// single walk. --band=w centres it on H*; --Hs=a:b gives it explicitly and needs
// no iteration at all (the fixed points are read off the same table).
let nP=null, lastFail=null, nS=null, lastFailS=null, bandFixed=[], bandLo=null, bandHi=null;
function analyse(Hs,w){
  const lo=Hs[0], hi=Hs[Hs.length-1]; bandLo=lo; bandHi=hi;
  // A strided band brackets nP but cannot name it: the integers between the
  // samples were never walked. Say so instead of returning a number.
  const contiguous=Hs.every((h,k)=>k===0||h===Hs[k-1]+1);
  for(let k=Hs.length-1;k>=0;k--) if(!(w.minT[k]>=1)){ lastFail=Hs[k]; break; }
  for(let k=Hs.length-1;k>=0;k--) if(!(Hs[k]*M-w.sup[k]>=1)){ lastFailS=Hs[k]; break; }
  nP=lastFail===null?lo:(lastFail<hi?lastFail+1:null);
  nS=lastFailS===null?lo:(lastFailS<hi?lastFailS+1:null);
  if(!contiguous){
    const kf=Hs.indexOf(lastFail);
    console.log(`  STRIDED BAND (${Hs.map((h,k)=>k?h-Hs[k-1]:'').filter(Boolean).join(',')} apart): nP is BRACKETED, not measured.` +
      ` It lies in (${lastFail===null?'<= '+lo:lastFail}, ${kf>=0&&kf+1<Hs.length?Hs[kf+1]:'above the band'}]. Re-run contiguous to name it.`);
    nP=null; nS=null;
  }
  for(let k=0;k<Hs.length;k++) if(Math.ceil(w.sup[k]/M)===Hs[k]) bandFixed.push(Hs[k]);
  const at=(h)=>{const k=Hs.indexOf(h); return k<0?null:{sup:w.sup[k],minT:w.minT[k]};};
  console.log(`  band H in [${lo}, ${hi}] (${Hs.length} windows, one walk): last H with minT < 1 is ` +
    `${lastFail===null?'none in band -- nP is AT OR BELOW the floor, widen the band':lastFail}` +
    `, so nP = ${nP===null?'ABOVE THE BAND, widen it':nP}   [${el()}s]`);
  console.log(`  band sup-certified (H*M - sup|R_H| >= 1 from here on): last failure ` +
    `${lastFailS===null?'none in band':lastFailS}, nS = ${nS===null?'ABOVE THE BAND':nS}` +
    `${nS===null?'':`  nS/z^2=${(nS/(z*z)).toFixed(4)}  th(nS)=${(Math.log(nS)/Math.log(z)).toFixed(4)}`}`);
  if(nP!==null){ const a=at(nP);
    console.log(`  nP=${nP}  nP/z^2=${(nP/(z*z)).toFixed(4)}  th(nP)=${(Math.log(nP)/Math.log(z)).toFixed(4)}` +
      `  minT(nP)=${a?a.minT:'?'}  sup|R_nP|=${a?a.sup.toFixed(4):'?'}  need_true(nP)=${a?(a.sup/M).toFixed(2):'?'}` +
      `  positive-everywhere=${PREFIX?'PREFIX ONLY, NOT CERTIFIED':(a&&a.minT>=1?'YES':'NO')}`); }
  console.log(`  fixed points of f inside the band: ${bandFixed.length?bandFixed.join(' '):'none'}` +
    `${bandFixed.length?`  (first ${bandFixed[0]}, last ${bandFixed[bandFixed.length-1]})`:''}`);
  const step=Math.max(1,Math.round(Hs.length/12));
  console.log('        H     H*M     sup|R|    minT   need_true  th_true  need/z^2  H*M-sup');
  for(let k=0;k<Hs.length;k+=step){ const h=Hs[k], nd=w.sup[k]/M;
    console.log(`  ${String(h).padStart(7)} ${(h*M).toFixed(4).padStart(9)} ${w.sup[k].toFixed(4).padStart(9)} ${String(w.minT[k]).padStart(7)}` +
      ` ${nd.toFixed(2).padStart(10)} ${(Math.log(nd)/Math.log(z)).toFixed(4).padStart(8)} ${(nd/(z*z)).toFixed(4).padStart(9)} ${(h*M-w.sup[k]).toFixed(4).padStart(9)}`); }
}
if(BAND>0&&Hstar!==null){
  const lo=Math.max(1,Hstar-BAND), hi=Hstar+BAND;
  const Hs=[]; for(let h=lo;h<=hi;h++) Hs.push(h);
  analyse(Hs,walk(Hs));
}
if(Hstar!==null&&rows.length&&!rows[0].positive&&!PREFIX){
  console.log('  !! minT(H*) < 1: a fixed point of need = sup|R|/M certifies T >= 0, not T >= 1, and');
  console.log('     minT_H is NOT monotone in H, so H* is the FIRST self-consistent window, not the last.');
  console.log('     The operative all-positions window is nP (--band), which is >= H*.');
}
// ---- explicit-window rows --------------------------------------------------
if(Hlist){
  const w=walk(Hlist);
  if(Hlist.length>1) analyse(Hlist,w);            // a band given by hand
  else pushRow(Hlist[0],w.sup[0],w.minT[0],PREFIX?'given PREFIX':'given exact');
}
// ---- the conditional (Gaussian maximal law) columns, on request ------------
// They need <rho^2>, which costs the O(N^2) mean square; need_true does not.
const r0=WANT?L.row(z,Hstar?Math.log(Hstar)/Math.log(z):Number(uArg||3.2),s):null;
const gauss=WANT?2*Math.sqrt(r0.plateau/2)*Math.sqrt(2*r0.lnW):NaN;
// ---- report ----------------------------------------------------------------
const banner=PREFIX?`walked=${NPOS} of W=${W} (PREFIX: sup is a LOWER bound, minT is an UPPER bound)`:`walked=${NPOS} (FULL PERIOD)`;
console.log(`  z=${z} s=${s} W=${W} ${banner}  M=${M.toExponential(6)}  walks=${WALKS} positions=${WALKPOS.toExponential(3)}`);
if(FIXED) console.log(`  fixed point: H*=${Hstar}  iterations=${iters}${cycle?' (CYCLE, conservative end)':''}  H*/z^2=${Hstar===null?'-':(Hstar/(z*z)).toFixed(4)}  u*=${Hstar===null?'-':(Math.log(Hstar)/Math.log(z)).toFixed(4)}`);
for(const r of rows){
  console.log(`  H=${String(r.H).padStart(8)} [${r.tag}]  sup|R|=${r.sup.toFixed(4)}  H*M=${r.HM.toFixed(4)}  minT=${r.minT}` +
    `  need_true=${r.need.toFixed(2)}  th_true=${r.th.toFixed(4)}  need/z^2=${r.needOverZ2.toFixed(4)}  H/z^2=${r.HOverZ2.toFixed(4)}` +
    `  positive-everywhere=${PREFIX?'PREFIX ONLY, NOT CERTIFIED':(r.positive?'YES':'NO')}`);
}
if(WANT){ const rr=rows[0]||{need:NaN};
  console.log(`  gauss bound=${gauss.toFixed(4)}  need_cond=${(gauss/M).toFixed(2)}  th_cond=${(Math.log(gauss/M)/Math.log(z)).toFixed(4)}  slack=cond/true=${(gauss/M/rr.need).toFixed(4)}`); }
console.log('SUPJSON '+JSON.stringify({z,s,W,NPOS,prefix:PREFIX,M,Hstar,iters,cycle,nP,lastFail,
  rows:rows.map(r=>({H:r.H,sup:r.sup,minT:r.minT,need:r.need,th:r.th,needOverZ2:r.needOverZ2,HOverZ2:r.HOverZ2,positive:r.positive,tag:r.tag})),
  nPOverZ2:nP===null?null:nP/(z*z), thNP:nP===null?null:Math.log(nP)/Math.log(z),
  nSOverZ2:nS===null?null:nS/(z*z), thNS:nS===null?null:Math.log(nS)/Math.log(z),
  bandLo,bandHi,bandFixed,lastFailS,strict:STRICT}));   // no elapsed field: the
// tail's normaliser only rewrites times that carry a unit, and a bare JSON
// number would make an otherwise reproducible run hash differently every time.
console.log(`  done [${el()}s]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/theta-ladder-sup.js -- 23 --fixed-point --band=80
//   invocation:  node research/theta-ladder-sup.js 23 --fixed-point --band=80
//   code-sha256: 78edf9868c74673143ea778bb4d4fa4e50567647ce01257b752929c58b7df8ac
//   out-sha256:  561c493a90a7270c7842b9f2ff92d4261a6d1a5fba2bf1289faf390deac8c27c
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     7.7 s
// ============================================================================
//   it  1: H=    132  sup|R|=    7.5103  H*M=    4.5103  minT=-3  f(H)=ceil(sup/M)=220   [0.6s]
//   it  2: H=    220  sup|R|=    7.5172  H*M=    7.5172  minT=0  f(H)=ceil(sup/M)=220   FIXED POINT   [1.1s]
//   band H in [140, 300] (161 windows, one walk): last H with minT < 1 is 257, so nP = 258   [7.6s]
//   band sup-certified (H*M - sup|R_H| >= 1 from here on): last failure 257, nS = 258  nS/z^2=0.4877  th(nS)=1.7710
//   nP=258  nP/z^2=0.4877  th(nP)=1.7710  minT(nP)=1  sup|R_nP|=7.8157  need_true(nP)=228.73  positive-everywhere=YES
//   fixed points of f inside the band: 210 211 212 213 214 215 216 217 218 219 220 221 222 223 224 225 226 227 228 229 230 231 232 233 234 235 236 238 239 240 242 243 244 246 247 248 250 251 252 254 255 256 257  (first 210, last 257)
//         H     H*M     sup|R|    minT   need_true  th_true  need/z^2  H*M-sup
//       140    4.7837    7.7837      -3     227.80   1.7313    0.4306   -3.0000
//       153    5.2279    8.2279      -3     240.80   1.7490    0.4552   -3.0000
//       166    5.6721    7.6721      -2     224.53   1.7267    0.4244   -2.0000
//       179    6.1163    8.1163      -2     237.53   1.7446    0.4490   -2.0000
//       192    6.5605    8.5605      -2     250.53   1.7616    0.4736   -2.0000
//       205    7.0047    8.0047      -1     234.27   1.7402    0.4428   -1.0000
//       218    7.4489    7.4489       0     218.00   1.7173    0.4121    0.0000
//       231    7.8931    7.8931       0     231.00   1.7357    0.4367    0.0000
//       244    8.3373    8.3373       0     244.00   1.7532    0.4612    0.0000
//       257    8.7815    8.7815       0     257.00   1.7698    0.4858    0.0000
//       270    9.2257    8.2257       1     240.73   1.7489    0.4551    1.0000
//       283    9.6699    7.6699       2     224.47   1.7266    0.4243    2.0000
//       296   10.1141    8.1141       2     237.47   1.7446    0.4489    2.0000
//   !! minT(H*) < 1: a fixed point of need = sup|R|/M certifies T >= 0, not T >= 1, and
//      minT_H is NOT monotone in H, so H* is the FIRST self-consistent window, not the last.
//      The operative all-positions window is nP (--band), which is >= H*.
//   z=23 s=3 W=9699690 walked=9699690 (FULL PERIOD)  M=3.416924e-2  walks=3 positions=2.910e+7
//   fixed point: H*=220  iterations=2  H*/z^2=0.4159  u*=1.7202
//   H=     220 [fixed-point exact]  sup|R|=7.5172  H*M=7.5172  minT=0  need_true=220.00  th_true=1.7202  need/z^2=0.4159  H/z^2=0.4159  positive-everywhere=NO
// SUPJSON {"z":23,"s":3,"W":9699690,"NPOS":9699690,"prefix":false,"M":0.034169236336420106,"Hstar":220,"iters":2,"cycle":false,"nP":258,"lastFail":257,"rows":[{"H":220,"sup":7.517231994012423,"minT":0,"need":220,"th":1.7201841798818478,"needOverZ2":0.4158790170132325,"HOverZ2":0.4158790170132325,"positive":false,"tag":"fixed-point exact"}],"nPOverZ2":0.4877126654064272,"thNP":1.770999785842722,"nSOverZ2":0.4877126654064272,"thNS":1.770999785842722,"bandLo":140,"bandHi":300,"bandFixed":[210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,238,239,240,242,243,244,246,247,248,250,251,252,254,255,256,257],"lastFailS":257,"strict":false}
//   done [7.6s]
// ───── stderr ─────
//   block 0/1  0s
//   block 0/1  1s
//   block 0/1  2s
// ============================================================================
// READINGS
//
// 1. CUSTODY. `nP=258` at z = 23 is `phase1-T4-maximal-law.md` sec 4's
//    self-consistent value, and `nP/z^2=0.4877` and `th(nP)=1.7710` are its
//    two derived columns, reproduced here from independently written code over
//    the complete period W = 9699690. `sup|R_nP|=7.8157` also matches
//    `sift-limit-lemmaV.js`'s `fullPeriodArray` driven at u = ln(258)/ln(23).
//
// 2. THE FIXED POINT ALONE IS NOT THE ANSWER, and the run above shows why in
//    one screen. The iteration converges in 2 steps to `H*=220`, and `minT=0`
//    there: the certificate touches zero, so the window is self-consistent and
//    the certificate is still not positive. The band then shows fixed points of
//    f filling almost every integer from 210 to 257 -- because sup|R_H| >=
//    H*M - minT_H forces f(H) = H wherever minT_H = 0. The operative window is
//    the LAST such H plus one, `nP=258`, and only the band can see it. TODO
//    item 0's "iterate to the fixed point" is necessary and not sufficient.
//
// 3. COST. `walks=3` and `positions=2.910e+7` for a 161-window band plus two
//    single-window iterations over a 9,699,690-position period: the band is
//    the cheap instrument, roughly 18x one window rather than 161x, because the
//    per-position weight cc(r) is computed once and shared by every window.
//
// 4. WHAT THIS INVOCATION DOES NOT SHOW. It is one z, one family (s = 3.0), and
//    a finite verification rather than a bound. Positivity is claimed only over
//    the walked positions, and only a FULL PERIOD walk licenses even that: on a
//    prefix, minT is an upper bound on the period minimum and the script prints
//    PREFIX ONLY, NOT CERTIFIED instead of a verdict. The whole ladder, the
//    prefix rows past z = 31 and the readings that go with them are in
//    `research/history/staging/theta-selfconsistent.md`.
