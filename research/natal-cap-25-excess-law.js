// ============================================================================
// NATAL-CAP-25 — THE WINDOW-EXCESS DRIFT LAW: EVT vs the exact variance
// (2026-08-14; derives the object measured in natal-cap-17 Part A / cap-18 P2)
// ============================================================================
// THE OBJECT. E_x(l) = M_x(l) − N·l/W: max sliding-window natal count minus
// the fair share, on the cap-17 scour-length grids. Measured: E_med =
// 1.19 / 2.06 / 4.05 / 7.18 / 12.61 / 23.20 / 36.24 at x = 7..29;
// l-independent within a level over 3.4 decades; step ratio drifting
// ×1.96 → ×1.56. Two puzzles: WHY flat in l, and WHY ~×1.8-with-drift.
//
// THE CANDIDATE THEORY (the brief's best guess, tested here): extreme-value
// scaling. The max of a field over n_eff effectively-independent positions
// with std sigma sits at excess ≈ sigma·sqrt(2·ln n_eff). Both inputs are
// EXACTLY computable for this object:
//   sigma(l): the depth-x natal pattern is periodic with period W = x#, so
//     the window-count field C(s), s ∈ [0,W), IS the complete rotation
//     ensemble. Var(l) = Σ_{|d|<l} (l−|d|)(J₅(d)−δ²), J₅ at depth x (mids
//     7..x ONLY — natal5-variance.js machinery in its small-prime case;
//     δ = N/W exactly, J₅(0) = δ). NOTE this differs from cap-16's tables:
//     those sit at scour depth y ≈ √W in the deep tile; the excess object
//     lives at depth x in the W-tile, where Var(W) = 0 identically.
//   n_eff: W (all positions) vs W/l (independent blocks — correlation
//     length ~ l since overlapping windows share slots). Discriminated below.
//
// PRE-REGISTERED DISCREPANCY LEMMA (proof in one line, checked in-run):
// expanding C(s) by inclusion–exclusion over the k mid primes (2 comb
// classes × 3 terms per prime: 1, −[≡0], −[≡p−2]), every term is an AP count
// off its density share by at most 1, so |C(s) − N·l/W| ≤ 2·3^k for EVERY s
// and EVERY l. l-independence of E is thereby FORCED as a bound before any
// statistics; what EVT must supply is the actual size and the ×1.8 drift.
//
// PLAN. Part 0: machinery custody (grids + E_med reproduce cap-17/cap-18;
// variance formula vs FULL field enumeration @7/@13; Var(W)=0 identity).
// Part 1: per-level ratio test @7..@23 — is E/(σ·√(2ln(W/l))) the l-flat
// constant EVT demands? n_eff = W refuted or not. Part 2: @29 — exact σ on
// the reconstructed 143-length grid; measured M rows imported from cap-18's
// output (provenance marked; the 2 GB march is not rerun). Part 3: the
// cross-level law — predicted vs measured E_med at all 7 levels, step-ratio
// drift, one calibration constant. Part 4: tail shape of the full field
// @13/@17 (all W windows): moments, upper tail vs Gaussian, autocorrelation
// (the correlation-length claim behind n_eff = W/l).
//   node research/natal-cap-25-excess-law.js   (~1 min)
// ============================================================================
'use strict';
const T00=Date.now(); const el=()=>((Date.now()-T00)/1000).toFixed(1)+'s';
function assert(c,m){if(!c)throw new Error('ASSERT FAIL: '+m)}
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const PR=primesUpTo(110000);
const med=a=>{const s=[...a].sort((u,v)=>u-v);return s[Math.floor(s.length/2)]}; // cap-01 convention
function lsq(u,y){const n=u.length;let sx=0,sy=0,sxx=0,sxy=0;for(let i=0;i<n;i++){sx+=u[i];sy+=y[i];sxx+=u[i]*u[i];sxy+=u[i]*y[i]}const b=(n*sxy-sx*sy)/(n*sxx-sx*sx),a=(sy-b*sx)/n;let rss=0;for(let i=0;i<n;i++){const e=y[i]-(a+b*u[i]);rss+=e*e}return{a,b,rms:Math.sqrt(rss/n)}}

// ---------- natal pattern + window max (cap-17 verbatim) ---------------------
function natalPositions(x){
  const bp=PR.filter(p=>p<=x);
  let W=1;for(const p of bp)W*=p;
  const ind=new Uint8Array(W);
  for(let r=11;r<W;r+=30)ind[r]=1;
  for(let r=17;r<W;r+=30)ind[r]=1;
  for(const p of bp){if(p<7)continue;
    for(let r=0;r<W;r+=p)ind[r]=0;
    for(let r=p-2;r<W;r+=p)ind[r]=0;}
  let N=0;for(let r=0;r<W;r++)if(ind[r])N++;
  const pos=new Int32Array(2*N);let k=0;
  for(let r=0;r<W;r++)if(ind[r])pos[k++]=r;
  for(let i=0;i<N;i++)pos[N+i]=pos[i]+W;
  return{W,N,pos,ind};
}
function windowMax(pos,N,ell){let mx=0,j=0;for(let i=0;i<N;i++){const lim=pos[i]+ell;while(pos[j]<lim)j++;const c=j-i;if(c>mx)mx=c}return mx}
function gridFor(x,W){ // cap-17 grid rule, verbatim
  const scour=PR.filter(q=>q>x&&q*q<=W);
  const stride=scour.length>600?Math.ceil(scour.length/140):1;
  const qs=stride===1?scour:scour.filter((_,i)=>i%stride===0||i<3||i>=scour.length-3);
  return{scour,stride,ells:[...new Set(qs.map(q=>Math.ceil(W/q)))].sort((a,b)=>a-b)};
}

// ---------- exact Var(l) over ALL W rotations, one ascending pass ------------
// Var(l) = l·(δ−δ²) + 2·Σ_{d=1}^{l−1}(l−d)(J₅(d)−δ²) = l(δ−δ²) + 2(l·T0 − T1)
// with T0 = Σ(J₅−δ²), T1 = Σ d·(J₅−δ²), both Kahan-summed (T1's raw terms
// reach δ²·l ~ 1e5 at @29; Kahan bounds the total error by ~2u·Σ|t| ≈ 5e-3
// absolute — negligible against Var = O(10)). J₅ from natal5-variance.js.
function varOnGrid(x,W,N,lgrid){ // lgrid ascending, deduped
  const mids=PR.filter(p=>p>=7&&p<=x);
  const del=N/W,d2=del*del;
  const out=new Float64Array(lgrid.length);
  let T0=0,c0=0,T1=0,c1=0,gi=0,m30=1;
  const lmax=lgrid[lgrid.length-1];
  for(let d=1;d<=lmax;d++){
    while(gi<lgrid.length&&lgrid[gi]===d){out[gi]=d*(del-d2)+2*(d*T0-T1);gi++;}
    let j=0;
    if(m30===0)j=2/30;else if(m30===6||m30===24)j=1/30;
    if(j!==0)for(let i=0;i<mids.length;i++){const p=mids[i],m=d%p;j*=m===0?(p-2)/p:(m===2||m===p-2)?(p-3)/p:(p-4)/p;}
    let t=j-d2,y=t-c0,s=T0+y;c0=(s-T0)-y;T0=s;
    t=d*(j-d2);y=t-c1;s=T1+y;c1=(s-T1)-y;T1=s;
    if(++m30===30)m30=0;
  }
  while(gi<lgrid.length){const l=lgrid[gi];out[gi]=l*(del-d2)+2*(l*T0-T1);gi++;}
  return out;
}

// ---------- full-field statistics (all W windows via cyclic prefix sums) -----
function fieldStats(ind,W,N,ell,VarFormula){
  const P=new Float64Array(W+1);
  for(let r=0;r<W;r++)P[r+1]=P[r]+ind[r];
  const mu=N*ell/W;
  const C=new Float64Array(W);
  let s2=0;
  for(let s=0;s<W;s++){
    const e=s+ell;
    const c=e<=W?P[e]-P[s]:N-P[s]+P[e-W];
    C[s]=c;const z=c-mu;s2+=z*z;
  }
  s2/=W;
  assert(Math.abs(s2-VarFormula)<1e-6*Math.max(1,VarFormula),`field var ${s2} != formula ${VarFormula} at l=${ell}`);
  const sig=Math.sqrt(s2);
  let s3=0,s4=0,mx=-1;const cnt=[0,0,0];
  for(let s=0;s<W;s++){const z=(C[s]-mu)/sig;s3+=z*z*z;s4+=z*z*z*z;
    if(C[s]>mx)mx=C[s];
    if(z>=1)cnt[0]++;if(z>=2)cnt[1]++;if(z>=3)cnt[2]++;}
  const lags=[Math.round(ell/4),Math.round(ell/2),ell,2*ell];
  const ac=lags.map(h=>{let a=0;for(let s=0;s<W;s++)a+=(C[s]-mu)*(C[(s+h)%W]-mu);return a/W/s2});
  return{mu,sig,skew:s3/W,kurt:s4/W-3,mx,p:cnt.map(c=>c/W),lags,ac};
}

// ============================================================================
console.log('===== PART 0: custody — grids, E_med, and the variance machinery =====');
const LEVELS=[]; // {x,k,W,N,ells,rows:[{ell,mean,M,E,sig}],Emed,Pmed}
const EREF={7:'1.19',11:'2.06',13:'4.05',17:'7.18',19:'12.61',23:'23.20'};
const SPOTM={13:[[1767,63],[174,9]],17:[[26869,791],[721,28]],23:[[14944,375],[275764,6580],[7692858,182843]]};
const INDKEEP={};
for(const x of [7,11,13,17,19,23]){
  const t0=Date.now();
  const{W,N,pos,ind}=natalPositions(x);
  const{ells,stride}=gridFor(x,W);
  const V=varOnGrid(x,W,N,ells);
  const rows=ells.map((ell,i)=>{const M=windowMax(pos,N,ell),mean=N*ell/W;
    return{ell,mean,M,E:M-mean,sig:Math.sqrt(V[i])}});
  const Emed=med(rows.map(r=>r.E));
  assert(Emed.toFixed(2)===EREF[x],`E_med @${x}: ${Emed.toFixed(2)} vs ${EREF[x]}`);
  if(SPOTM[x])for(const[l,Mr]of SPOTM[x]){const r=rows.find(r=>r.ell===l);assert(r&&r.M===Mr,`spot M(${l})@${x}`)}
  const k=PR.filter(p=>p>=7&&p<=x).length;
  const disc=2*3**k,maxE=Math.max(...rows.map(r=>r.E));
  assert(maxE<disc,`discrepancy lemma @${x}`);
  LEVELS.push({x,k,W,N,ells,rows,Emed});
  if(x===13||x===17)INDKEEP[x]={ind,W,N,rows};
  console.log(` @${String(x).padStart(2)}: W=${String(W).padStart(9)} N=${String(N).padStart(7)} grid ${String(rows.length).padStart(3)}${stride>1?` (every ${stride}th q)`:''}  E_med=${Emed.toFixed(2)} ✓cap-17  maxE=${maxE.toFixed(1)} < 2·3^${k}=${disc} ✓lemma  [${((Date.now()-t0)/1000).toFixed(1)}s]`);
}
{ // variance formula vs FULL field enumeration (@7 all l; @13 three l) + Var(W)=0
  const{ind,W,N}=(()=>{const o=natalPositions(7);return o})();
  for(const l of [17,20,105]){const V=varOnGrid(7,210,10,[l]);fieldStats(ind,210,10,l,V[0]);}
  const L13=INDKEEP[13];
  for(const l of [174,423,1767]){const V=varOnGrid(13,L13.W,L13.N,[l]);fieldStats(L13.ind,L13.W,L13.N,l,V[0]);}
  for(const x of [7,11,13]){const L=LEVELS.find(L=>L.x===x);const VW=varOnGrid(x,L.W,L.N,[L.W])[0];
    assert(Math.abs(VW)<1e-6,`Var(W)!=0 @${x}: ${VW}`);}
  console.log(` VALIDATION: Var formula == full-field variance (all W windows) @7 (l=17,20,105) and @13 (l=174,423,1767) to 1e-6;`);
  console.log(` Var(W) = 0 identity holds @7/@11/@13. The σ input is exact.   [${el()}]`);
}

// ============================================================================
console.log('\n===== PART 1: the per-level ratio test — is E/(σ·√(2ln(W/l))) flat? =====');
for(const L of LEVELS){
  const{x,W,rows}=L;
  for(const r of rows){r.g=Math.sqrt(2*Math.log(W/r.ell));r.rat=r.E/(r.sig*r.g);r.zE=r.E/r.sig;
    r.qexp=(r.zE*r.zE/2)/Math.log(W/r.ell);} // implied ln n_eff / ln(W/l)
  const rats=rows.map(r=>r.rat);
  L.ratMed=med(rats);L.Pmed=med(rows.map(r=>r.sig*r.g));
  const sSig=lsq(rows.map(r=>Math.log(r.ell)),rows.map(r=>Math.log(r.sig))).b;
  const sE=lsq(rows.map(r=>Math.log(r.ell)),rows.map(r=>Math.log(Math.max(r.E,1e-9)))).b;
  const sP=lsq(rows.map(r=>Math.log(r.ell)),rows.map(r=>Math.log(r.sig*r.g))).b;
  const g2W=Math.sqrt(2*Math.log(W));
  console.log(`\n @${x}:  (√(2lnW) = ${g2W.toFixed(2)} — the n_eff=W prediction for E/σ)`);
  console.log('        l |     mean |     E    |   σ(l)  |  E/σ  | √(2ln(W/l)) | ratio | ln n_impl/ln(W/l)');
  const show=rows.length<=8?rows:rows.filter((_,i)=>i%Math.ceil(rows.length/8)===0||i===rows.length-1);
  for(const r of show)console.log(` ${String(r.ell).padStart(8)} | ${r.mean.toFixed(1).padStart(8)} | ${r.E.toFixed(2).padStart(8)} | ${r.sig.toFixed(3).padStart(7)} | ${r.zE.toFixed(2).padStart(5)} |    ${r.g.toFixed(3)}    | ${r.rat.toFixed(3)} |   ${r.qexp.toFixed(2)}`);
  console.log(` ratio E/(σ√(2ln(W/l))): min/med/max = ${Math.min(...rats).toFixed(3)} / ${L.ratMed.toFixed(3)} / ${Math.max(...rats).toFixed(3)}   med ln n_impl/ln(W/l) = ${med(rows.map(r=>r.qexp)).toFixed(2)}`);
  console.log(` log-log slopes vs l:  σ ${sSig>=0?'+':''}${sSig.toFixed(3)}  σ√(2ln(W/l)) ${sP>=0?'+':''}${sP.toFixed(3)}  measured E ${sE>=0?'+':''}${sE.toFixed(3)}   | E/σ drifts ${rows[0].zE.toFixed(2)} → ${rows[rows.length-1].zE.toFixed(2)} (n_eff=W would hold it at ${g2W.toFixed(2)})`);
}

// ============================================================================
console.log('\n===== PART 2: @29 — exact σ on the reconstructed grid + cap-18 measured M =====');
{
  const W=6469693230,N=143139150;
  assert(N===2*5*9*11*15*17*21*27,'N29 formula');
  const{ells,stride,scour}=gridFor(29,W);
  assert(scour.length===7863&&stride===57&&ells.length===143&&ells[0]===80440&&ells[ells.length-1]===208699782,'@29 grid does not match cap-18');
  console.log(` grid reconstructed: ${scour.length} scour primes, every ${stride}th q, ${ells.length} lengths ${ells[0]}..${ells[ells.length-1]} ✓ = cap-18's grid`);
  const t0=Date.now();
  const V=varOnGrid(29,W,N,ells);
  { // independent direct check of the pass at the smallest grid length
    const mids=PR.filter(p=>p>=7&&p<=29),del=N/W,l=ells[0];
    let S=l*(del-del*del);
    for(let d=1;d<l;d++){const m=d%30;let j=0;
      if(m===0)j=2/30;else if(m===6||m===24)j=1/30;
      if(j)for(const p of mids){const md=d%p;j*=md===0?(p-2)/p:(md===2||md===p-2)?(p-3)/p:(p-4)/p;}
      S+=2*(l-d)*(j-del*del);}
    assert(Math.abs(S-V[0])<1e-6*S,`@29 var cross-check: ${S} vs ${V[0]}`);
  }
  console.log(` Var(l) pass over d ≤ 2.09e8 done, direct-sum cross-check at l=80440 ✓   [${((Date.now()-t0)/1000).toFixed(1)}s]`);
  // measured M(l) — cap-18 PART 2 output block (2026-08-14 run), 11 grid rows.
  // NOT rerun here (the @29 march costs ~2 GB / 5 min and is already on record).
  const REF29=[[80440,1810],[89746,2017],[103411,2321],[121673,2726],[147230,3293],[185874,4151],[248806,5544],[370905,8250],[696190,15449],[3319494,73492],[208699782,4617452]];
  const EPRINT=['30.30','31.41','33.08','34.04','35.60','38.62','39.28','43.89','46.10','49.64','60.06'];
  const rows=[];
  console.log('        l |      mean |     E    |   σ(l)  |  E/σ  | √(2ln(W/l)) | ratio');
  REF29.forEach(([l,M],i)=>{
    const mean=N*l/W,E=M-mean;
    assert(E.toFixed(2)===EPRINT[i],`@29 imported row l=${l}: E=${E.toFixed(2)} vs printed ${EPRINT[i]}`);
    const gi=ells.indexOf(l);assert(gi>=0,`l=${l} not on grid`);
    const sig=Math.sqrt(V[gi]),g=Math.sqrt(2*Math.log(W/l)),rat=E/(sig*g);
    rows.push({ell:l,E,sig,g,rat});
    console.log(` ${String(l).padStart(9)} | ${mean.toFixed(1).padStart(9)} | ${E.toFixed(2).padStart(8)} | ${sig.toFixed(3).padStart(7)} | ${(E/sig).toFixed(2).padStart(5)} |    ${g.toFixed(3)}    | ${rat.toFixed(3)}`);
  });
  const rats=rows.map(r=>r.rat);
  const Pall=ells.map((l,i)=>Math.sqrt(V[i])*Math.sqrt(2*Math.log(W/l)));
  const L29={x:29,k:7,W,N,Emed:36.24,ratMed:med(rats),Pmed:med(Pall),imported:true};
  LEVELS.push(L29);
  console.log(` ratio on the 11 measured rows: min/med/max = ${Math.min(...rats).toFixed(3)} / ${med(rats).toFixed(3)} / ${Math.max(...rats).toFixed(3)}`);
  console.log(` predicted P_med over the FULL 143-length grid = ${L29.Pmed.toFixed(2)}  (measured E_med = 36.24, imported from cap-18)   [${el()}]`);
}

// ============================================================================
console.log('\n===== PART 3: the cross-level law — predicted vs measured E_med, and the drift =====');
{
  console.log('   x | k | E_med(meas) | P_med = med σ√(2ln(W/l)) | c = E/P | meas step | pred step');
  let pv=null;
  for(const L of LEVELS){
    const stepM=pv?` ×${(L.Emed/pv.Emed).toFixed(3)}`:'     —';
    const stepP=pv?` ×${(L.Pmed/pv.Pmed).toFixed(3)}`:'     —';
    console.log(` ${String(L.x).padStart(3)} | ${L.k} |    ${L.Emed.toFixed(2).padStart(6)}   |          ${L.Pmed.toFixed(2).padStart(6)}          |  ${(L.Emed/L.Pmed).toFixed(3)}  |   ${stepM}  |  ${stepP}`);
    pv=L;
  }
  const cs=LEVELS.map(L=>L.Emed/L.Pmed);
  const cGeo=Math.exp(LEVELS.reduce((a,L)=>a+Math.log(L.Emed/L.Pmed),0)/LEVELS.length);
  let rms=0;for(const L of LEVELS)rms+=Math.log(L.Emed/(cGeo*L.Pmed))**2;rms=Math.sqrt(rms/LEVELS.length);
  console.log(` one-constant fit E_med = c*·P_med:  c* = ${cGeo.toFixed(3)} (geometric mean)  c range ${Math.min(...cs).toFixed(3)}..${Math.max(...cs).toFixed(3)}  rms log-resid ${rms.toFixed(3)} (×${Math.exp(rms).toFixed(2)})`);
  const cFit=lsq(LEVELS.map(L=>L.k),LEVELS.map(L=>Math.log(L.Emed/L.Pmed)));
  console.log(` residual drift in c vs k: slope ${cFit.b>=0?'+':''}${cFit.b.toFixed(3)} per level (×${Math.exp(cFit.b).toFixed(3)}/level; 0 = fully derived drift)`);
  // the n_eff = W alternative, killed on drift shape within-level already; cross-level for the record
  const PW=LEVELS.map(L=>L.imported?null:med(L.rows.map(r=>r.sig))*Math.sqrt(2*Math.log(L.W)));
  console.log(` n_eff=W comparator (med σ·√(2lnW), @7..@23): ${PW.filter(v=>v).map(v=>v.toFixed(1)).join(' / ')}  vs measured ${LEVELS.slice(0,6).map(L=>L.Emed.toFixed(1)).join(' / ')}`);
  // where does the ×1.8 come from? decompose the predicted step: σ-part vs log-part
  console.log(' step decomposition (predicted): P_med step = (σ_med step) × (√(2ln(W/l))_med step):');
  for(let i=1;i<LEVELS.length;i++){
    const A=LEVELS[i-1],B=LEVELS[i];
    if(A.imported||B.imported){ // @29 σ_med over full grid, no measured rows needed
      continue;
    }
    const sA=med(A.rows.map(r=>r.sig)),sB=med(B.rows.map(r=>r.sig));
    const gA=med(A.rows.map(r=>r.g)),gB=med(B.rows.map(r=>r.g));
    console.log(`   @${A.x}→@${B.x}:  ×${(B.Pmed/A.Pmed).toFixed(3)} = ×${(sB/sA).toFixed(3)} (σ) × ×${(gB/gA).toFixed(3)} (log)`);
  }
}

// ============================================================================
console.log('\n===== PART 4: tail shape — the full field, all W windows @13 and @17 =====');
for(const x of [13,17]){
  const{ind,W,N,rows}=INDKEEP[x];
  console.log(` @${x} (W=${W}): Gaussian reference P(z≥1)=0.1587 P(z≥2)=0.0228 P(z≥3)=0.00135`);
  console.log('      l |  skew  |  ex.kurt |  P(z≥1)  |  P(z≥2)  |  P(z≥3)  | max z | √(2ln(W/l)) | √(2lnW) | autocorr @ l/4, l/2, l, 2l');
  const pick=x===13?[174,423,1767]:[721,1987,26869];
  for(const l of pick){
    const r=rows.find(r=>r.ell===l);
    const F=fieldStats(ind,W,N,l,r.sig*r.sig);
    const zmax=(F.mx-F.mu)/F.sig;
    console.log(` ${String(l).padStart(6)} | ${F.skew.toFixed(3).padStart(6)} |  ${F.kurt.toFixed(3).padStart(6)}  |  ${F.p[0].toFixed(4)}  |  ${F.p[1].toFixed(4)}  |  ${F.p[2].toFixed(5)} | ${zmax.toFixed(2).padStart(5)} |    ${Math.sqrt(2*Math.log(W/l)).toFixed(2)}     |  ${Math.sqrt(2*Math.log(W)).toFixed(2)}   | ${F.ac.map(a=>a.toFixed(2)).join(', ')}`);
  }
}
console.log('\ndone in '+el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/natal-cap-25-excess-law.js
//   invocation:  node research/natal-cap-25-excess-law.js
//   code-sha256: c6f55a652bb9d2ef2cd091140ab654a7c6a928a28583c3e9b1464a4315277dc6
//   out-sha256:  df3f93d4ab0f5e0aec9edaa621523cf48f44de33be9a2105628a4eee8f48c9af
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     8.6 s
// ============================================================================
// ===== PART 0: custody — grids, E_med, and the variance machinery =====
//  @ 7: W=      210 N=     10 grid   2  E_med=1.19 ✓cap-17  maxE=1.2 < 2·3^1=6 ✓lemma  [0.0s]
//  @11: W=     2310 N=     90 grid  10  E_med=2.06 ✓cap-17  maxE=2.7 < 2·3^2=18 ✓lemma  [0.0s]
//  @13: W=    30030 N=    990 grid  34  E_med=4.05 ✓cap-17  maxE=5.9 < 2·3^3=54 ✓lemma  [0.0s]
//  @17: W=   510510 N=  14850 grid 120  E_med=7.18 ✓cap-17  maxE=10.1 < 2·3^4=162 ✓lemma  [0.0s]
//  @19: W=  9699690 N= 252450 grid 435  E_med=12.61 ✓cap-17  maxE=21.5 < 2·3^5=486 ✓lemma  [0.8s]
//  @23: W=223092870 N=5301450 grid 139 (every 13th q)  E_med=23.20 ✓cap-17  maxE=34.4 < 2·3^6=1458 ✓lemma  [6.2s]
//  VALIDATION: Var formula == full-field variance (all W windows) @7 (l=17,20,105) and @13 (l=174,423,1767) to 1e-6;
//  Var(W) = 0 identity holds @7/@11/@13. The σ input is exact.   [7.1s]
//
// ===== PART 1: the per-level ratio test — is E/(σ·√(2ln(W/l))) flat? =====
//
//  @7:  (√(2lnW) = 3.27 — the n_eff=W prediction for E/σ)
//         l |     mean |     E    |   σ(l)  |  E/σ  | √(2ln(W/l)) | ratio | ln n_impl/ln(W/l)
//        17 |      0.8 |     1.19 |   0.684 |  1.74 |    2.242    | 0.776 |   0.60
//        20 |      1.0 |     1.05 |   0.667 |  1.57 |    2.169    | 0.724 |   0.52
//  ratio E/(σ√(2ln(W/l))): min/med/max = 0.724 / 0.776 / 0.776   med ln n_impl/ln(W/l) = 0.60
//  log-log slopes vs l:  σ -0.156  σ√(2ln(W/l)) -0.361  measured E -0.787   | E/σ drifts 1.74 → 1.57 (n_eff=W would hold it at 3.27)
//
//  @11:  (√(2lnW) = 3.94 — the n_eff=W prediction for E/σ)
//         l |     mean |     E    |   σ(l)  |  E/σ  | √(2ln(W/l)) | ratio | ln n_impl/ln(W/l)
//        50 |      1.9 |     2.05 |   0.847 |  2.42 |    2.769    | 0.875 |   0.77
//        57 |      2.2 |     1.78 |   0.816 |  2.18 |    2.721    | 0.802 |   0.64
//        75 |      2.9 |     2.08 |   0.924 |  2.25 |    2.618    | 0.859 |   0.74
//       101 |      3.9 |     2.06 |   0.972 |  2.13 |    2.502    | 0.850 |   0.72
//       136 |      5.3 |     2.70 |   1.065 |  2.54 |    2.380    | 1.066 |   1.14
//       178 |      6.9 |     2.06 |   0.948 |  2.18 |    2.264    | 0.962 |   0.93
//  ratio E/(σ√(2ln(W/l))): min/med/max = 0.802 / 0.875 / 1.138   med ln n_impl/ln(W/l) = 0.77
//  log-log slopes vs l:  σ +0.172  σ√(2ln(W/l)) +0.016  measured E +0.121   | E/σ drifts 2.42 → 2.18 (n_eff=W would hold it at 3.94)
//
//  @13:  (√(2lnW) = 4.54 — the n_eff=W prediction for E/σ)
//         l |     mean |     E    |   σ(l)  |  E/σ  | √(2ln(W/l)) | ratio | ln n_impl/ln(W/l)
//       174 |      5.7 |     3.26 |   1.078 |  3.03 |    3.210    | 0.944 |   0.89
//       202 |      6.7 |     3.34 |   1.086 |  3.08 |    3.163    | 0.973 |   0.95
//       266 |      8.8 |     4.23 |   1.217 |  3.48 |    3.075    | 1.131 |   1.28
//       310 |     10.2 |     3.78 |   1.288 |  2.94 |    3.024    | 0.971 |   0.94
//       423 |     13.9 |     4.05 |   1.409 |  2.88 |    2.920    | 0.986 |   0.97
//       639 |     21.1 |     4.93 |   1.757 |  2.81 |    2.775    | 1.012 |   1.02
//      1036 |     34.2 |     4.85 |   2.250 |  2.15 |    2.595    | 0.830 |   0.69
//      1767 |     58.3 |     4.75 |   2.197 |  2.16 |    2.380    | 0.908 |   0.82
//  ratio E/(σ√(2ln(W/l))): min/med/max = 0.830 / 0.960 / 1.131   med ln n_impl/ln(W/l) = 0.92
//  log-log slopes vs l:  σ +0.395  σ√(2ln(W/l)) +0.271  measured E +0.231   | E/σ drifts 3.03 → 2.16 (n_eff=W would hold it at 4.54)
//
//  @17:  (√(2lnW) = 5.13 — the n_eff=W prediction for E/σ)
//         l |     mean |     E    |   σ(l)  |  E/σ  | √(2ln(W/l)) | ratio | ln n_impl/ln(W/l)
//       721 |     21.0 |     7.03 |   1.962 |  3.58 |    3.623    | 0.989 |   0.98
//       833 |     24.2 |     6.77 |   2.148 |  3.15 |    3.583    | 0.880 |   0.77
//      1003 |     29.2 |     5.82 |   2.265 |  2.57 |    3.531    | 0.728 |   0.53
//      1213 |     35.3 |     6.72 |   2.460 |  2.73 |    3.476    | 0.785 |   0.62
//      1543 |     44.9 |     7.12 |   2.478 |  2.87 |    3.406    | 0.843 |   0.71
//      2137 |     62.2 |     7.84 |   2.087 |  3.76 |    3.309    | 1.135 |   1.29
//      3252 |     94.6 |     7.40 |   2.038 |  3.63 |    3.180    | 1.143 |   1.31
//      6463 |    188.0 |     9.00 |   2.544 |  3.54 |    2.956    | 1.197 |   1.43
//     26869 |    781.6 |     9.42 |   2.708 |  3.48 |    2.427    | 1.433 |   2.05
//  ratio E/(σ√(2ln(W/l))): min/med/max = 0.687 / 0.937 / 1.619   med ln n_impl/ln(W/l) = 0.88
//  log-log slopes vs l:  σ +0.012  σ√(2ln(W/l)) -0.089  measured E +0.076   | E/σ drifts 3.58 → 3.48 (n_eff=W would hold it at 5.13)
//
//  @19:  (√(2lnW) = 5.67 — the n_eff=W prediction for E/σ)
//         l |     mean |     E    |   σ(l)  |  E/σ  | √(2ln(W/l)) | ratio | ln n_impl/ln(W/l)
//      3120 |     81.2 |    10.80 |   2.648 |  4.08 |    4.010    | 1.017 |   1.03
//      3624 |     94.3 |    11.68 |   2.916 |  4.01 |    3.973    | 1.008 |   1.02
//      4333 |    112.8 |    13.23 |   3.013 |  4.39 |    3.928    | 1.118 |   1.25
//      5422 |    141.1 |     9.88 |   2.512 |  3.93 |    3.870    | 1.017 |   1.03
//      6885 |    179.2 |    11.81 |   3.090 |  3.82 |    3.808    | 1.004 |   1.01
//      9729 |    253.2 |    14.79 |   3.621 |  4.08 |    3.716    | 1.099 |   1.21
//     15721 |    409.2 |    16.84 |   4.075 |  4.13 |    3.585    | 1.153 |   1.33
//     35793 |    931.6 |    19.43 |   4.814 |  4.04 |    3.347    | 1.206 |   1.45
//    421726 |  10976.1 |    17.90 |   5.388 |  3.32 |    2.504    | 1.327 |   1.76
//  ratio E/(σ√(2ln(W/l))): min/med/max = 0.918 / 1.089 / 1.602   med ln n_impl/ln(W/l) = 1.19
//  log-log slopes vs l:  σ +0.191  σ√(2ln(W/l)) +0.108  measured E +0.163   | E/σ drifts 4.08 → 3.32 (n_eff=W would hold it at 5.67)
//
//  @23:  (√(2lnW) = 6.20 — the n_eff=W prediction for E/σ)
//         l |     mean |     E    |   σ(l)  |  E/σ  | √(2ln(W/l)) | ratio | ln n_impl/ln(W/l)
//     14944 |    355.1 |    19.88 |   4.491 |  4.43 |    4.384    | 1.010 |   1.02
//     17205 |    408.8 |    20.15 |   4.438 |  4.54 |    4.352    | 1.043 |   1.09
//     20775 |    493.7 |    21.31 |   4.937 |  4.32 |    4.309    | 1.002 |   1.00
//     25818 |    613.5 |    23.48 |   5.068 |  4.63 |    4.258    | 1.088 |   1.18
//     34370 |    816.7 |    25.25 |   5.407 |  4.67 |    4.190    | 1.115 |   1.24
//     49787 |   1183.1 |    26.89 |   5.279 |  5.09 |    4.101    | 1.242 |   1.54
//     87454 |   2078.2 |    20.79 |   4.974 |  4.18 |    3.961    | 1.055 |   1.11
//    275764 |   6553.1 |    26.90 |   5.917 |  4.55 |    3.659    | 1.242 |   1.54
//   7692858 | 182808.6 |    34.37 |   7.926 |  4.34 |    2.595    | 1.671 |   2.79
//  ratio E/(σ√(2ln(W/l))): min/med/max = 0.952 / 1.088 / 1.671   med ln n_impl/ln(W/l) = 1.18
//  log-log slopes vs l:  σ +0.096  σ√(2ln(W/l)) +0.022  measured E +0.077   | E/σ drifts 4.43 → 4.34 (n_eff=W would hold it at 6.20)
//
// ===== PART 2: @29 — exact σ on the reconstructed grid + cap-18 measured M =====
//  grid reconstructed: 7863 scour primes, every 57th q, 143 lengths 80440..208699782 ✓ = cap-18's grid
//  Var(l) pass over d ≤ 2.09e8 done, direct-sum cross-check at l=80440 ✓   [1.4s]
//         l |      mean |     E    |   σ(l)  |  E/σ  | √(2ln(W/l)) | ratio
//      80440 |    1779.7 |    30.30 |   6.011 |  5.04 |    4.753    | 1.061
//      89746 |    1985.6 |    31.41 |   6.153 |  5.10 |    4.730    | 1.079
//     103411 |    2287.9 |    33.08 |   6.554 |  5.05 |    4.700    | 1.074
//     121673 |    2692.0 |    34.04 |   6.454 |  5.27 |    4.665    | 1.131
//     147230 |    3257.4 |    35.60 |   7.055 |  5.05 |    4.624    | 1.091
//     185874 |    4112.4 |    38.62 |   7.555 |  5.11 |    4.573    | 1.118
//     248806 |    5504.7 |    39.28 |   7.679 |  5.11 |    4.509    | 1.134
//     370905 |    8206.1 |    43.89 |   8.386 |  5.23 |    4.420    | 1.184
//     696190 |   15402.9 |    46.10 |   9.272 |  4.97 |    4.275    | 1.163
//    3319494 |   73442.4 |    49.64 |  10.912 |  4.55 |    3.892    | 1.169
//  208699782 | 4617391.9 |    60.06 |  11.930 |  5.03 |    2.621    | 1.921
//  ratio on the 11 measured rows: min/med/max = 1.061 / 1.131 / 1.921
//  predicted P_med over the FULL 143-length grid = 33.63  (measured E_med = 36.24, imported from cap-18)   [8.5s]
//
// ===== PART 3: the cross-level law — predicted vs measured E_med, and the drift =====
//    x | k | E_med(meas) | P_med = med σ√(2ln(W/l)) | c = E/P | meas step | pred step
//    7 | 1 |      1.19   |            1.53          |  0.776  |        —  |       —
//   11 | 2 |      2.06   |            2.35          |  0.880  |    ×1.735  |   ×1.528
//   13 | 3 |      4.05   |            3.95          |  1.026  |    ×1.964  |   ×1.685
//   17 | 4 |      7.18   |            7.70          |  0.932  |    ×1.770  |   ×1.949
//   19 | 5 |     12.61   |           11.87          |  1.062  |    ×1.757  |   ×1.541
//   23 | 6 |     23.20   |           21.20          |  1.095  |    ×1.840  |   ×1.785
//   29 | 7 |     36.24   |           33.63          |  1.078  |    ×1.562  |   ×1.587
//  one-constant fit E_med = c*·P_med:  c* = 0.972 (geometric mean)  c range 0.776..1.095  rms log-resid 0.118 (×1.13)
//  residual drift in c vs k: slope +0.052 per level (×1.053/level; 0 = fully derived drift)
//  n_eff=W comparator (med σ·√(2lnW), @7..@23): 2.2 / 3.6 / 6.0 / 11.5 / 17.2 / 31.7  vs measured 1.2 / 2.1 / 4.1 / 7.2 / 12.6 / 23.2
//  step decomposition (predicted): P_med step = (σ_med step) × (√(2ln(W/l))_med step):
//    @7→@11:  ×1.528 = ×1.350 (σ) × ×1.168 (log)
//    @11→@13:  ×1.685 = ×1.439 (σ) × ×1.144 (log)
//    @13→@17:  ×1.949 = ×1.689 (σ) × ×1.139 (log)
//    @17→@19:  ×1.541 = ×1.349 (σ) × ×1.117 (log)
//    @19→@23:  ×1.785 = ×1.687 (σ) × ×1.103 (log)
//
// ===== PART 4: tail shape — the full field, all W windows @13 and @17 =====
//  @13 (W=30030): Gaussian reference P(z≥1)=0.1587 P(z≥2)=0.0228 P(z≥3)=0.00135
//       l |  skew  |  ex.kurt |  P(z≥1)  |  P(z≥2)  |  P(z≥3)  | max z | √(2ln(W/l)) | √(2lnW) | autocorr @ l/4, l/2, l, 2l
//     174 | -0.155 |  -0.341  |  0.2490  |  0.0332  |  0.00120 |  3.03 |    3.21     |  4.54   | 0.43, 0.25, -0.23, 0.21
//     423 | -0.020 |  -0.455  |  0.1438  |  0.0244  |  0.00000 |  2.88 |    2.92     |  4.54   | 0.58, 0.47, 0.11, -0.31
//    1767 | -0.117 |  -0.778  |  0.1652  |  0.0088  |  0.00000 |  2.16 |    2.38     |  4.54   | 0.40, -0.36, -0.55, -0.26
//  @17 (W=510510): Gaussian reference P(z≥1)=0.1587 P(z≥2)=0.0228 P(z≥3)=0.00135
//       l |  skew  |  ex.kurt |  P(z≥1)  |  P(z≥2)  |  P(z≥3)  | max z | √(2ln(W/l)) | √(2lnW) | autocorr @ l/4, l/2, l, 2l
//     721 |  0.085 |  -0.389  |  0.2260  |  0.0362  |  0.00097 |  3.58 |    3.62     |  5.13   | 0.71, 0.45, -0.18, -0.59
//    1987 | -0.244 |  -0.023  |  0.2223  |  0.0085  |  0.00016 |  3.30 |    3.33     |  5.13   | 0.35, -0.19, -0.28, -0.49
//   26869 |  0.196 |  -0.198  |  0.1458  |  0.0443  |  0.00067 |  3.48 |    2.43     |  5.13   | 0.22, 0.34, -0.34, -0.28
//
// done in 8.5s
// ============================================================================
// READINGS (2026-08-14) — honestly calibrated
// ============================================================================
// 1. THE LAW, WITH CONSTANT ≈ 1:  E_x(l) ≈ σ_x(l)·√(2·ln(W/l)),  where
//    σ_x(l) is the EXACT std of the window count over all W rotations of the
//    depth-x tile. One calibration constant c* = 0.972 covers seven levels
//    and three decades of E with rms residual ×1.13. The brief's EVT guess
//    is CORRECT IN FORM, and the constant is not free-floating — it is ~1,
//    the value pure extreme-value theory assigns.
// 2. WHY E IS l-FLAT — NOT the conjectured cancellation. The brief guessed
//    σ ~ √l growth cancelled by ln(W/l) shrinkage. FALSE: σ itself is nearly
//    l-flat (log-log slopes +0.01..+0.40 while mean sweeps 2.5 decades;
//    σ²/mean COLLAPSES 0.183 → 0.0094 across a grid). The field is
//    HYPERUNIFORM: the pre-registered discrepancy lemma |C−mean| ≤ 2·3^k
//    (inclusion–exclusion, no statistics) forces bounded fluctuations at
//    every l, and Var(W) = 0 exactly (cap-16's identity, re-proven here for
//    the depth-x case). Flat σ × slowly-falling log = flat E, with the log
//    factor supplying the mild upward tilt cap-17 flagged (measured E slopes
//    +0.08..+0.23 vs predicted P slopes −0.09..+0.27 — same band).
// 3. n_eff = W/l, MEASURED THREE INDEPENDENT WAYS: (a) implied exponent
//    ln n_impl / ln(W/l) has per-level medians 0.60, 0.77, 0.92, 0.88, 1.19,
//    1.18 — scattered about 1; (b) n_eff = W is refuted (it pins E/σ at
//    √(2lnW) = 3.3..6.2 and level-constant; measured E/σ sits 20–40% below
//    and drifts within level; its cross-level comparator overshoots ×1.4–1.9
//    with the wrong step shape); (c) the full-field autocorrelation decays
//    on scale ~l/2 and goes NEGATIVE by lag ~l (hyperuniform anticorrelation)
//    — the field really is ~W/l effectively-independent blocks.
// 4. THE DRIFT IS REPRODUCED PARAMETER-FREE — including the @29 anomaly.
//    Predicted steps ×1.528/1.685/1.949/1.541/1.785/1.587 vs measured
//    ×1.735/1.964/1.770/1.757/1.840/1.562. Noisy pairwise (the σ grid
//    oscillates), but the envelope is right and the puzzling @23→@29 drop to
//    ×1.56 is PREDICTED at ×1.587 (off by 1.6%). Decomposition: each level's
//    step = σ_med-step (×1.35–1.69) × log-step (×1.17 shrinking to ×1.10).
//    So cap-17's "why ×1.81, not 2?" reduces to a pure variance question:
//    why does σ_med step by ~×1.50 per added prime? The EVT layer is done;
//    what remains is J₅ algebra (the variance plateau's closed form).
// 5. TAIL SHAPE: COMPRESSED, AS THE SUB-POISSON FIELD DEMANDS. Excess
//    kurtosis is negative at all six full enumerations (−0.02..−0.78);
//    P(z≥3) ≤ Gaussian at 5 of 6 (twice exactly 0). And the cleanest EVT
//    confirmation in the file: the enumerated max z equals √(2ln(W/l)) to
//    2–8% at four of six l's (3.03/3.21, 2.88/2.92, 3.58/3.62, 3.30/3.33),
//    always far below √(2lnW). The compressed tail is why c* ≲ 1 rather
//    than c* > 1: a Gumbel centering correction (−(ln ln n)/2√(2ln n),
//    ~10–20% here) and the sub-Gaussian compression roughly offset.
// 6. HONEST RESIDUALS. (a) c drifts upward over the seven levels (×1.05/
//    level overall) — but the last four read 0.93, 1.06, 1.09, 1.08: the
//    drift looks like small-k transient, settling near ~1.08. Not proven.
//    (b) The largest-l grid row (l = W/q_min) beats the law by ×1.4–1.9 at
//    @17..@29 — cap-17's "tilt" wrinkle localized: with only ~q_min blocks,
//    n_eff = W/l undercounts (block-maximum discreteness); every OTHER
//    departure from flatness the law absorbs. (c) @7 (c = 0.776) is a
//    2-point grid with mean < 1 — EVT has no business working there anyway.
// 7. VERDICT: DERIVED (form + constant + drift), with one open algebraic
//    input. The sharpest true statement: the window-excess is the extreme-
//    value excess of a hyperuniform field — E_x(l) = c·σ_x(l)·√(2ln(W/l)),
//    c = 0.97 ± 0.13 (rms) across @7..@29, σ exact from J₅; l-independence
//    is hyperuniformity (discrepancy ≤ 2·3^k), the ×1.8-ish drift is the
//    σ-plateau's growth, and the ×1.56 @29 step was forced, not anomalous.
//    MISSING: a closed form for the plateau σ_x(l) itself (its ~×1.50/level
//    growth is measured, not derived — spectral route: the |Â(k)|² modes
//    with 2+ prime support saturate by the grid's l; sum their Parseval
//    mass). NEXT: (i) derive/fit the plateau law from the J₅ spectral
//    algebra — that would make E_x(l) fully a priori; (ii) forecast then
//    measure @31: P_med needs the cap-16 patch-sieve for σ (direct pass is
//    5.4e9 d's), then E_med(31) ≈ c*·P_med — a pre-registered test with
//    every constant already pinned.
//
// Context notes carried out of the pre-embed OUTPUT block (2026-08-19):
//
// all asserts passed (E_med + spot-M custody at 7 levels, discrepancy lemma,
// formula==full-field variance @7/@13, Var(W)=0, @29 grid + imported rows).
//
// PART 0:  @7..@23 E_med = 1.19/2.06/4.05/7.18/12.61/23.20 ✓cap-17; maxE well
//   under 2·3^k at every level (e.g. @23: 34.4 < 1458); variance formula ==
//   full-field variance to 1e-6 @7 (l=17,20,105) and @13 (l=174,423,1767).
//
// PART 1 (per-level; each row: l, mean, E, σ, E/σ, √(2ln(W/l)), ratio):
//  @7 : ratio min/med/max 0.724/0.776/0.776  med ln n_impl/ln(W/l)=0.60
//       slopes vs l: σ −0.156, σ√(2ln(W/l)) −0.361, measured E −0.787 (2 pts)
//  @11: ratio 0.802/0.875/1.138  n-exp 0.77 | slopes +0.172/+0.016/+0.121
//  @13: ratio 0.830/0.960/1.131  n-exp 0.92 | slopes +0.395/+0.271/+0.231
//  @17: ratio 0.687/0.937/1.619  n-exp 0.88 | slopes +0.012/−0.089/+0.076
//  @19: ratio 0.918/1.089/1.602  n-exp 1.19 | slopes +0.191/+0.108/+0.163
//  @23: ratio 0.952/1.088/1.671  n-exp 1.18 | slopes +0.096/+0.022/+0.077
//   sample @23 rows (l | mean | E | σ | E/σ | √(2ln(W/l)) | ratio):
//     14944 |    355.1 | 19.88 | 4.491 | 4.43 | 4.384 | 1.010
//     34370 |    816.7 | 25.25 | 5.407 | 4.67 | 4.190 | 1.115
//    275764 |   6553.1 | 26.90 | 5.917 | 4.55 | 3.659 | 1.242
//   7692858 | 182808.6 | 34.37 | 7.926 | 4.34 | 2.595 | 1.671   <- tilt row
//   E/σ within-level: 4.43 → 4.34 @23 (n_eff=W would pin it at 6.20; refuted)
//
// PART 2 (@29; grid reconstructed = cap-18's exactly; 11 measured M rows):
//      80440 | 1779.7 | 30.30 |  6.011 | 5.04 | 4.753 | 1.061
//     147230 | 3257.4 | 35.60 |  7.055 | 5.05 | 4.624 | 1.091
//     696190 | 15402.9 | 46.10 |  9.272 | 4.97 | 4.275 | 1.163
//    3319494 | 73442.4 | 49.64 | 10.912 | 4.55 | 3.892 | 1.169
//  208699782 | 4617391.9 | 60.06 | 11.930 | 5.03 | 2.621 | 1.921  <- tilt row
//  ratio on the 11 rows: 1.061/1.131/1.921;  P_med(full 143 grid) = 33.63
//
// PART 3 (cross-level):
//    x | k | E_med | P_med  |   c   | meas step | pred step
//    7 | 1 |  1.19 |  1.53  | 0.776 |     —     |    —
//   11 | 2 |  2.06 |  2.35  | 0.880 |  ×1.735   | ×1.528
//   13 | 3 |  4.05 |  3.95  | 1.026 |  ×1.964   | ×1.685
//   17 | 4 |  7.18 |  7.70  | 0.932 |  ×1.770   | ×1.949
//   19 | 5 | 12.61 | 11.87  | 1.062 |  ×1.757   | ×1.541
//   23 | 6 | 23.20 | 21.20  | 1.095 |  ×1.840   | ×1.785
//   29 | 7 | 36.24 | 33.63  | 1.078 |  ×1.562   | ×1.587
//  one-constant fit c* = 0.972 (range 0.776..1.095), rms log-resid 0.118
//  (×1.13); residual drift in c: ×1.053/level over all 7 (last four: 0.93,
//  1.06, 1.09, 1.08 — flat). n_eff=W comparator (med σ·√(2lnW)): 2.2/3.6/
//  6.0/11.5/17.2/31.7 vs measured 1.2/2.1/4.1/7.2/12.6/23.2 — 1.4–1.9×
//  overshoot with the wrong step shape. Predicted step = σ-step × log-step:
//  ×1.35–1.69 (σ) times ×1.17→×1.10 (log, monotone shrinking).
//
// PART 4 (full field, all W windows; Gaussian ref 0.1587/0.0228/0.00135):
//  @13 l=174 : skew −0.155 kurt −0.341 P(z≥1,2,3)=0.2490/0.0332/0.00120
//              max z 3.03 vs √(2ln(W/l))=3.21, √(2lnW)=4.54; ac(l/4..2l)= 0.43,0.25,−0.23,0.21
//  @13 l=423 : kurt −0.455 P(z≥3)=0        max z 2.88 vs 2.92 | ac 0.58,0.47,0.11,−0.31
//  @13 l=1767: kurt −0.778 P(z≥3)=0        max z 2.16 vs 2.38 | ac 0.40,−0.36,−0.55,−0.26
//  @17 l=721 : kurt −0.389 P(z≥3)=0.00097  max z 3.58 vs 3.62 | ac 0.71,0.45,−0.18,−0.59
//  @17 l=1987: kurt −0.023 P(z≥3)=0.00016  max z 3.30 vs 3.33 | ac 0.35,−0.19,−0.28,−0.49
//  @17 l=26869: kurt −0.198 P(z≥3)=0.00067 max z 3.48 vs 2.43 | ac 0.22,0.34,−0.34,−0.28
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings and the carried-over context notes above that the
// embedded run does not contain verbatim actually is. No number above was
// changed.
//
// ROUNDINGS of a value this file's own embedded run prints (printed value
// first):
//   1.689 -> 1.69, the top of the sigma-step range in reading 4. Its lower
//   end, 1.35, is the printed 1.350 at @7->@11 and 1.349 at @17->@19.
//   1.168 -> 1.17, the first log-step; the "shrinking to x1.10" is the
//   printed 1.103 at @19->@23. All five steps are in the step decomposition
//   block of PART 3.
//
// TOKENIZER ARTIFACT, not a figure:
//   "1,2,3" read out of the compound "P(z>=1,2,3)" in the PART 4 context
//   note. The run prints those three probabilities in three labelled columns.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   CORRECTED 2026-08-20 (mismatch adjudication #55): reading 2's collapse
//   read "0.20 -> 0.009" and now reads "0.183 -> 0.0094". It is sigma^2/mean
//   along the @17 grid, from the printed sigma and mean columns: at l=721 it
//   is 1.962^2/21.0 = 0.183, and at l=26869 it is 2.708^2/781.6 = 0.0094. No
//   other level's grid spans that pair. Old -> new: 0.20 -> 0.183 and
//   0.009 -> 0.0094. Both ends are now the computed values; the old high end
//   overstated the starting ratio by 9 per cent and the collapse is a factor
//   19.5, not 22.
//   CORRECTED 2026-08-20 (mismatch adjudication #54): reading 4's and reading
//   7's "~x1.55 per added prime" for the sigma_med step now read ~x1.50. The
//   five printed sigma-steps are 1.350, 1.439, 1.689, 1.349, 1.687; their
//   geometric mean is 1.4950 and their arithmetic mean 1.5028 (recomputed
//   here), so 1.55 sat above BOTH summaries and only below the maximum. Old ->
//   new: x1.55 -> x1.50, at both sites. The reading marks it "~" and the
//   sentence it supports, that the remaining question is a variance question,
//   does not turn on the value.
//   "c = 0.97 +/- 0.13 (rms)" in reading 7 restates the printed one-constant
//   fit additively. The run prints c* = 0.972 with rms log-residual 0.118,
//   i.e. a multiplicative x1.13; 13% of 0.97 is 0.126, which is the 0.13.
//   The additive rms of the seven printed c values about their own mean is
//   0.111.
//
// CORRECTED 2026-08-20 (mismatch adjudication #52): reading 7 priced the @31
// forecast by saying the direct variance pass is "6.5e9 d's"; it now says
// 5.4e9. The direct pass in PART 2 runs d from 1 to the largest grid length,
// and at @29 the run prints exactly that: "Var(l) pass over d <= 2.09e8",
// where 208699782 = W(29)/31 is the largest @29 length. The same construction
// at @31 gives W(31)/37 = 200560490130/37 = 5.42e9 (recomputed here), not
// 6.5e9. The old figure is traced: 6.5e9 is W(29) itself, 6,469,693,230 --
// the @29 TILE SIZE, which research/level-ledger-tight.js also calls "a 6.5e9
// tile" -- standing in for the @31 d-count, so a size from one level was
// carried into a count at the next. Old -> new: 6.5e9 -> 5.4e9. The point
// survives either way: both sizes are far past what a direct pass can afford
// and the cap-16 patch-sieve is needed in both cases.
// ---------------------------------------------------------------------------
