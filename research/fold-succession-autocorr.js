// ============================================================================
// FOLD-SUCCESSION AUTOCORRELATION — does the moire structure of successive
// folds damp the fold multiplier below the sum of its per-fold worst cases?
// ============================================================================
//
// QUESTION (Chris, 2026-08-19): "folding multiple times can generate a lower L
// than the sum of upper-bound L jumps due to the moire nature that a series of
// folds must have in succession." Operationalised: if succession damps, the
// per-fold deviations from the budget rate 2 ln(p'/p) should be NEGATIVELY
// autocorrelated beyond what level-tracking already forces, and per-fold kill
// damage should anti-correlate fold to fold.
//
// PRE-REGISTERED (before the first run, in-session): moire-damping predicts
// lag-1 autocorr < 0 beyond the level-noise control, and kill-damage
// anti-correlation; the cooperative/independent reading predicts >= 0.
//
// INSTRUMENTS.
//  A. The exact G2(x#) ladder (14 terms, research/exact-g2-ladder.js):
//     deviations d_k = ln(G2_{k+1}/G2_k) - 2 ln(x_{k+1}/x_k), lag-1 autocorr,
//     permutation p, THEN the calibration control: the same statistic on
//     synthetic ladders G2 = C*theta(x)^2 * exp(eps), eps iid at the measured
//     residual sd, quantised to multiples of 6. Differencing level noise
//     forces autocorr ~ -0.5 with NO succession mechanism, so the control is
//     the whole question (campaign lesson: calibrate the estimator first).
//  B. The localized series M(x, x^2) via an spf sieve of [0, 1e8), 1226 folds
//     to x = 9973: jump statistics, whether the record is kill-driven or
//     window-driven, and the succession autocorrelation of per-fold kill
//     damage D_p (max merged gap created by fold p's kills below p^2) and
//     kill counts, detrended on ln p.
//
// Deterministic: seeded PRNG (mulberry32), so the tail reproduces exactly.
// ============================================================================

function mulberry32(seed){let a=seed>>>0;return function(){a|=0;a=a+0x6D2B79F5|0;
  let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;
  return((t^t>>>14)>>>0)/4294967296;};}
const rnd=mulberry32(42);
function autocorr(a,lag){const n=a.length,m=a.reduce((s,v)=>s+v,0)/n;let num=0,den=0;
  for(let i=0;i<n;i++){den+=(a[i]-m)**2;if(i+lag<n)num+=(a[i]-m)*(a[i+lag]-m);}return num/den;}
function permP(a,lag,obs,iters){let cnt=0;const b=a.slice();
  for(let t=0;t<iters;t++){for(let i=b.length-1;i>0;i--){const j=(rnd()*(i+1))|0;[b[i],b[j]]=[b[j],b[i]];}
    if(Math.abs(autocorr(b,lag))>=Math.abs(obs))cnt++;}return cnt/iters;}
function gauss(){let u=0,v=0;while(!u)u=rnd();while(!v)v=rnd();
  return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}

// ---------------- A. the exact ladder and its control ----------------
const L=[[2,2],[3,6],[5,12],[7,30],[11,42],[13,66],[17,108],[19,150],
         [23,204],[29,258],[31,348],[37,528],[41,546],[43,618]];
const xs=L.map(r=>r[0]);
const theta=x=>{let s=0;for(let p=2;p<=x;p++){let c=1;for(let d=2;d*d<=p;d++)if(p%d===0){c=0;break;}if(c)s+=Math.log(p);}return s;};
const th=xs.map(theta);
const dObs=[];for(let k=1;k<L.length;k++)dObs.push(Math.log(L[k][1]/L[k-1][1])-2*Math.log(xs[k]/xs[k-1]));
const rObs=autocorr(dObs,1);
console.log('A. exact ladder, n =', dObs.length, 'deviations');
console.log('   lag-1 autocorr =', rObs.toFixed(4), '  perm p =', permP(dObs,1,rObs,20000).toFixed(4));
const lg=L.map(r=>Math.log(r[1])), zs=th.map(t=>2*Math.log(t));
const aFit=lg.map((v,i)=>v-zs[i]).reduce((s,v)=>s+v,0)/lg.length;
const res=lg.map((v,i)=>v-zs[i]-aFit);
const sd=Math.sqrt(res.reduce((s,v)=>s+v*v,0)/res.length);
console.log('   residual sd of ln G2 about C*theta^2:', sd.toFixed(3));
let below=0;const T=20000,rs=[];
for(let t=0;t<T;t++){
  const g=th.map(tt=>Math.max(2,6*Math.round(Math.exp(aFit)*tt*tt*Math.exp(sd*gauss())/6)));
  const d=[];for(let k=1;k<g.length;k++)d.push(Math.log(g[k]/g[k-1])-2*Math.log(xs[k]/xs[k-1]));
  const r=autocorr(d,1);rs.push(r);if(r<=rObs)below++;
}
rs.sort((p,q)=>p-q);
console.log('   level-noise null: median', rs[T/2|0].toFixed(3),
  ' 5-95% [' + rs[T*0.05|0].toFixed(3) + ', ' + rs[T*0.95|0].toFixed(3) + ']',
  '  P(null <= obs) =', (below/T).toFixed(4));

// ---------------- B. localized M(x, x^2) ----------------
const N=1e8,XMAX=1e4,half=N/2|0;
const spf=new Uint16Array(half);const primes=[];
{const s=new Uint8Array(XMAX+1);
 for(let i=2;i<=XMAX;i++){if(!s[i]){primes.push(i);for(let j=i*i;j<=XMAX;j+=i)s[j]=1;}}}
for(const p of primes){if(p===2)continue;
 for(let r=p;r<N;r+=2*p){const i=(r-1)/2;if(spf[i]===0)spf[i]=p;}}
const pos=[],kil=[];
for(let i=0;i<half-1;i++){
  const a=spf[i],b=spf[i+1];let k;
  if(a===0&&b===0)k=0;else if(a===0)k=b;else if(b===0)k=a;else k=Math.min(a,b);
  if(k===0||k>5){pos.push(2*i+1);kil.push(k);}}
const n=pos.length;
const nxt=new Int32Array(n),prv=new Int32Array(n);
for(let i=0;i<n;i++){nxt[i]=i+1;prv[i]=i-1;}
const bucket=new Map();
for(let i=0;i<n;i++){const k=kil[i];if(k===0)continue;
  if(!bucket.has(k))bucket.set(k,[]);bucket.get(k).push(i);}
const fp=primes.filter(p=>p>5);
const P=[],Ms=[],killDriven=[],D=[],CNT=[];
let head=0;
for(const p of fp){
  const Y=p*p;if(Y>=N)break;
  const dead=bucket.get(p)||[];
  const touched=new Set();let dmax=0,cnt=0;
  for(const i of dead){
    const a=prv[i],b=nxt[i];
    if(a>=0)nxt[a]=b;if(b<n)prv[b]=a;
    if(a>=0)touched.add(a);
    if(i===head)head=b;
    if(pos[i]<Y){cnt++;if(a>=0&&b<n){const g=pos[b]-pos[a];if(g>dmax)dmax=g;}}
  }
  let M=0,at=-1,i=head;
  while(i<n&&pos[i]<Y){const j=nxt[i];if(j>=n)break;
    const g=pos[j]-pos[i];if(g>M){M=g;at=i;}i=j;}
  P.push(p);Ms.push(M);killDriven.push(touched.has(at));D.push(dmax);CNT.push(cnt);
}
console.log('\nB. localized M(x, x^2):', P.length, 'folds, M', Ms[0], '->', Ms[Ms.length-1]);
const J=[];for(let k=1;k<P.length;k++)J.push(Ms[k]>Ms[k-1]?1:0);
const nJ=J.reduce((s,v)=>s+v,0);
console.log('   jumps:', nJ, 'of', J.length, '  record kill-driven at',
  killDriven.filter(Boolean).length, 'of', killDriven.length, 'folds');
const inc=[];for(let k=1;k<P.length;k++)inc.push(Math.log(Ms[k]/Ms[k-1]));
const sizes=[];{for(let k=0;k<J.length;k++)if(J[k])sizes.push(inc[k]);}
const rJ=autocorr(sizes,1);
console.log('   jump-size lag-1 autocorr (n=' + sizes.length + ') =', rJ.toFixed(4),
  '  perm p =', permP(sizes,1,rJ,20000).toFixed(4));
const idx=[];for(let k=0;k<P.length;k++)if(D[k]>0)idx.push(k);
const X=idx.map(k=>Math.log(P[k])),Yv=idx.map(k=>Math.log(D[k]));
const mx=X.reduce((s,v)=>s+v,0)/X.length,my=Yv.reduce((s,v)=>s+v,0)/Yv.length;
let sxy=0,sxx=0;for(let i=0;i<X.length;i++){sxy+=(X[i]-mx)*(Yv[i]-my);sxx+=(X[i]-mx)**2;}
const slope=sxy/sxx,icpt=my-slope*mx;
const resid=Yv.map((v,i)=>v-slope*X[i]-icpt);
console.log('   kill-damage: n =', resid.length, ' ln D =',
  icpt.toFixed(2), '+', slope.toFixed(3), 'ln p');
for(const lag of[1,2,3])
  console.log('   kill-damage residual lag-' + lag + ' autocorr =',
    autocorr(resid,lag).toFixed(4), ' (null 95% ~ +/-' + (1.96/Math.sqrt(resid.length)).toFixed(4) + ')');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fold-succession-autocorr.js
//   invocation:  node research/fold-succession-autocorr.js
//   code-sha256: 37f3fbe6cc1167fa9385237732e33e841b326b9ef75dbbf576e531d625b042fd
//   out-sha256:  8b3558455b47e100e1dced318a03646eb2b38505c23e6132f9b2063903ede97f
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     2.9 s
// ============================================================================
// A. exact ladder, n = 13 deviations
//    lag-1 autocorr = -0.6324   perm p = 0.0047
//    residual sd of ln G2 about C*theta^2: 0.598
//    level-noise null: median -0.460  5-95% [-0.726, -0.113]   P(null <= obs) = 0.1610
//
// B. localized M(x, x^2): 1226 folds, M 18 -> 2868
//    jumps: 20 of 1225   record kill-driven at 2 of 1226 folds
//    jump-size lag-1 autocorr (n=20) = 0.4736   perm p = 0.0123
//    kill-damage: n = 256  ln D = 3.36 + 0.292 ln p
//    kill-damage residual lag-1 autocorr = -0.0708  (null 95% ~ +/-0.1225)
//    kill-damage residual lag-2 autocorr = -0.0154  (null 95% ~ +/-0.1225)
//    kill-damage residual lag-3 autocorr = 0.0545  (null 95% ~ +/-0.1225)
// ============================================================
// READINGS
// ============================================================
//
// READING 1. The exact ladder's succession anti-correlation is REAL and is
//   LEVEL-TRACKING, not interference. Lag-1 autocorr of the fold deviations is
//   -0.6324 (perm p = 0.0047), which rejects memoryless increments — but the
//   calibrated null (G2 = C*theta^2 with iid level noise at the measured
//   sd = 0.598, quantised to multiples of 6) already produces median -0.460
//   with 5-95% band [-0.726, -0.113], and the observation sits INSIDE it
//   (P = 0.16). What the data support is "G2 hugs its quadratic law and
//   excursions self-correct"; they do not support a succession mechanism
//   beyond that.
//
// READING 2. Zone-scale kill succession is MEMORYLESS. Per-fold kill damage
//   D_p (max merged gap below p^2), detrended on ln p over 256 folds, has
//   lag-1/2/3 autocorrs -0.07, -0.02, +0.05, all inside the +/-0.12 null band.
//   No anti-correlated damping, no cooperation, fold to fold.
//
// READING 3. Where there IS structure it is COOPERATIVE, not damping:
//   jump sizes of the localized record cluster positively (lag-1 autocorr
//   +0.47 among the 20 jump folds, perm p = 0.012), matching U-FRAME §7's
//   "the last three folds assembled a fresh maximum from several large gaps".
//
// READING 4 (rediscovery, structural). The record was kill-driven at only
//   2 of 1226 folds: below p^2 a number with least prime factor p must be p
//   itself, so a fold kills at most the graduating prime inside the window —
//   A6's frozen-zone mechanism, reproduced by an instrument that was not
//   looking for it. At zone scale the max gap grows by NEW TERRITORY entering
//   the window, not by kills.
//
// READING 5 (the verdict on the succession-damping proposal). At both scales
//   the measured succession structure gives no room a proof could spend:
//   deviations damp exactly as level-tracking forces and no more, kill damage
//   is memoryless, and record assembly is cooperative. Together with the
//   super-additivity theorem and the translate-buys-zero identity
//   (sift-limit-attack.md §7a-bis), the "series of folds must interfere
//   destructively" route is closed empirically as well as structurally.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). One figure
// here is not in the OUTPUT block. No number above was changed.
//
// ROUNDING of a value this file's own OUTPUT prints: the lag-2 autocorrelation
//   is printed as -0.0154 and quoted as -0.02. The lag-1 and lag-3 values in
//   the same sentence are printed to two places already.
// ---------------------------------------------------------------------------
