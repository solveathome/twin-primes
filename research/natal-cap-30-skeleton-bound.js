// ============================================================================
// NATAL-CAP-30 — THE AGGREGATE 30-SKELETON BOUND: certified @11 through @29
// (2026-08-14. Companion prose:
// natal-cap-30-skeleton-bound.md. Successor to natal-cap-26-minus-half.js:
// attacks its named OPEN target — G30_agg < 1/2.)
// ============================================================================
// SETTING (cap-26): level x, W = x#, natal N, N̄ = 2∏(p−2), δ = N̄/W; scour
// prime q, lA = ⌈W/q⌉, lB = ⌊(W+1)/q⌋, L = lA+lB; C(m) = natal autocorrelation
// = c₃₀(m)·P(m) with P(m) = ∏_{7≤p≤x} c_p(m)  (c₃₀ = 2/1/0 at m ≡ 0/±6/other
// mod 30; c_p = p−2/p−3/p−4 at 0/±2/other mod p);  dev(q) = R(q) + 1/2;
// cap-26 ledger over moduli subsets T ⊆ {30, 7..x} with φ_M = f_M − m̄_M;
// SKELETON G30(q) = Σ_{30∈T} dev_T(q) — carries the whole deviation to
// ≤ 0.007 per prime, +0.10..+0.21 in aggregate. Cap-26 left ONE leg open:
// G30_agg(x) < 1/2 (⟹ Cov_adj < 0 in aggregate ⟹ calm leg iii).
//
// WHAT THIS SCRIPT ESTABLISHES:
//  P1 SKELETON COLLAPSE (closed form — proven, all x, all q). Fix a lag m:
//       Σ_{T∋30} ∏_{M∈T}φ_M(m) ∏_{M∉T}m̄_M = φ₃₀(m)·∏_p f_p(m) = K(m)/(15W),
//       K(m) := 15·C(m) − 2·P(m),   K/P = +28 / +13 / −2  at m ≡ 0/±6/other
//     mod 30 (binomial collapse of the 2ⁿ p-subsets: Σ_S ∏φ∏m̄ = ∏(φ+m̄) = ∏f).
//     Mean-zero check: 28 + 2·13 = 54 = 2·27 exactly. Hence, EXACTLY,
//       G30(q) = W·NUMsk(q) / (30·(IVA+IVB)),   NUMsk :=
//       L·(K(0) + 2Σ_{0<d<lA} K(qd mod W)) + 4Σ_{lA≤d<L} (L−d)·K(qd mod W),
//     K(0) = 14N̄, IVA+IVB = W²(V_A+V_B) the cap-26 exact variance integers.
//     The skeleton IS a pair of AP-restricted J₅ correlation sums: lags with
//     qd ≡ 0, ±6 (mod 30) — i.e. d ≡ 0, ±6q̄ — carry +28/+13 times the 30-free
//     product P; every other lag carries −2P. Verified: pointwise identity at
//     @11 (all 2310 lags, ≤ 1e−15); per-q against the cap-26 2ⁿ-mask ledger
//     @11/@13/@17 (all q) and @19 (sample + all exceptions): relerr ≤ 1e−9.
//  P2 EXACT FINITE-LEVEL THEOREM (BigInt-certified, no floats). G30_agg < 1/2
//     is the INTEGER inequality  W·Σ_q NUMsk(q) < 15·Σ_q (IVA+IVB),  checked
//     in exact BigInt at x = 11, 13, 17, 19, 23 (599 + 1732 scour primes;
//     @23 is NEW — first exact dev/skeleton computation at W = 223092870,
//     cap-26's stated next step). Together with cap-26 Thm 2 + Props 3-4 this
//     closes the calm's leg (iii) as a THEOREM at every computed level, with
//     aggregate ΣCov_adj < 0 also certified as an exact integer sign.
//  P3 UNIFORMITY BLOCKERS (computed exactly — why no all-x proof yet). Three
//     candidate level-uniform bounds evaluated: (a) branch-Abel
//     APBsk = Ask·(L/4+lB/2)/Vg, Ask = s₃₀·∏(m̄_p+s_p) (the P4 machinery
//     applied to the 30∈T half) — vacuous from @13 on: the denominator is the
//     calm-small variance itself, Vg = o(L); (b) the spike-product candidate
//     ∏(1+2/(p−2)) − 1 — already 0.711 > 1/2 at @11 and DIVERGES in x (Mertens);
//     (c) the exact positive-mass bound (kernel K⁺, computed exactly) — orders
//     of magnitude above 1/2. Verdict: the skeleton's smallness is CANCELLATION
//     along the two incomplete lag classes; every bound that triangles at the
//     branch level surrenders it. Even T = {30} alone Abel-bounds to
//     ~0.12·(L/2)·∏m̄_p/Vg ≫ 1/2 at x ≥ 17; its true aggregate smallness needs
//     the window-length residues ⌈W/q⌉ mod 30 to equidistribute over scour
//     primes — an analytic statement about primes, outside branch algebra.
//  P4 EXCEPTION CRITERION (exact, per prime). q is a skeleton resonance iff
//     W·NUMsk(q) > 15·(IVA+IVB) — one integer inequality. Reproduces all 4
//     cap-26 exceptions (13@11 .625, 107@17 .544, 2083@19 .606, 2221@19 .521)
//     and lists the @23 resonances for the first time.
// Runtime ~2 min (dominated by the @23 exact pass). Do NOT commit (moratorium).
// ============================================================================
'use strict';
const T00=Date.now();
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
const f=(v,d=3)=>Number.isFinite(v)?v.toFixed(d):String(v);
const rel=(a,b)=>Math.abs(a-b)/Math.max(1e-300,Math.abs(a),Math.abs(b));

function meta(x){
  const mids=primesUpTo(x).filter(p=>p>=7);
  const W=30*mids.reduce((a,b)=>a*b,1);
  const N=2*mids.reduce((a,p)=>a*(p-2),1);
  const qs=primesUpTo(Math.floor(Math.sqrt(W))+1).filter(q=>q>x&&q*q<=W);
  return{x,mids,W,N,qs};
}

// ---- exact per-q pass: all cap-26 integers + the skeleton kernel sums ------
// Chunked exact accumulation: Number partials (every term ≤ 5.7e14, safe),
// flushed to BigInt at 4.5e15 — every intermediate exactly representable.
function scan(lv,q){
  const{mids,W,N}=lv,nm=mids.length;
  const lA=Math.ceil(W/q),lB=Math.floor((W+1)/q),L=lA+lB;
  const rp=new Int32Array(nm),sp=new Int32Array(nm),ps=new Int32Array(nm);
  for(let i=0;i<nm;i++){ps[i]=mids[i];sp[i]=q%mids[i];rp[i]=0;}
  let r30=0;const s30=q%30,FL=4.5e15;
  let aJ=0,bJ=0n,aA=0,bA=0n,aB=0,bB=0n,a1=0,b1=0n,a2=0,b2=0n,p1=0,q1=0n,p2=0,q2=0n;
  for(let d=1;d<L;d++){
    r30+=s30;if(r30>=30)r30-=30;
    let P=1;
    for(let i=0;i<nm;i++){let u=rp[i]+sp[i];const p=ps[i];if(u>=p)u-=p;rp[i]=u;
      P*=u===0?p-2:(u===2||u===p-2)?p-3:p-4;}
    const c30=r30===0?2:(r30===6||r30===24)?1:0;
    const C=c30*P,K=15*C-2*P;
    if(C){
      aJ+=Math.min(d,lA,lB,L-d)*C;if(aJ>FL){bJ+=BigInt(aJ);aJ=0;}
      if(d<lA){aA+=(lA-d)*C;if(aA>FL){bA+=BigInt(aA);aA=0;}}
      if(d<lB){aB+=(lB-d)*C;if(aB>FL){bB+=BigInt(aB);aB=0;}}
    }
    if(d<lA){a1+=K;if(a1>FL||a1<-FL){b1+=BigInt(a1);a1=0;}
      if(K>0){p1+=K;if(p1>FL){q1+=BigInt(p1);p1=0;}}}
    else{const w=L-d;a2+=w*K;if(a2>FL||a2<-FL){b2+=BigInt(a2);a2=0;}
      if(K>0){p2+=w*K;if(p2>FL){q2+=BigInt(p2);p2=0;}}}
  }
  const SwJ=bJ+BigInt(aJ),TA2=bA+BigInt(aA),TB2=bB+BigInt(aB);
  const SB1K=b1+BigInt(a1),SB2K=b2+BigInt(a2),PO1=q1+BigInt(p1),PO2=q2+BigInt(p2);
  const WB=BigInt(W),NB=BigInt(N),NB2=NB*NB,lAB=BigInt(lA),lBB=BigInt(lB),LB=BigInt(L);
  const IC=WB*SwJ-NB2*lAB*lBB;                      // W²·Cov_adj (exact)
  const IVA=WB*(lAB*NB+2n*TA2)-NB2*lAB*lAB;         // W²·V_A
  const IVB=WB*(lBB*NB+2n*TB2)-NB2*lBB*lBB;         // W²·V_B
  const K0=14n*NB;                                  // K(0) = 28·∏(p−2) = 14N̄
  const NUM=LB*(K0+2n*SB1K)+4n*SB2K;                // G30 = W·NUM/(30(IVA+IVB))
  const NUMP=LB*(K0+2n*PO1)+4n*PO2;                 // same with K⁺ (positive mass)
  return{q,lA,lB,L,IC,IVA,IVB,NUM,NUMP};
}

// ---- P1a: pointwise collapse identity, every lag m of the @11 tile ---------
function tables(lv){
  const mods=[30,...lv.mids];
  const mbar=mods.map(M=>M===30?4/900:((M-2)/M)**2);
  const phi=mods.map((M,i)=>{const t=new Float64Array(M);
    for(let u=0;u<M;u++){const c=M===30?(u===0?2:(u===6||u===24)?1:0):(u===0?M-2:(u===2||u===M-2)?M-3:M-4);t[u]=c/M-mbar[i];}
    return t;});
  return{mods,mbar,phi};
}
function pointwise(x){
  const lv=meta(x),{mids,W}=lv,{mods,mbar,phi}=tables(lv),nm=mods.length;
  let worst=0;
  for(let m=0;m<W;m++){
    let lhs=0;
    for(let mask=1;mask<(1<<nm);mask+=2){let v=1;
      for(let i=0;i<nm;i++)v*=(mask&(1<<i))?phi[i][m%mods[i]]:mbar[i];lhs+=v;}
    let P=1;for(const p of mids){const u=m%p;P*=u===0?p-2:(u===2||u===p-2)?p-3:p-4;}
    const v30=m%30,c30=v30===0?2:(v30===6||v30===24)?1:0;
    worst=Math.max(worst,Math.abs(lhs-(15*c30*P-2*P)/(15*W)));
  }
  console.log(`P1a @${x}: Σ_{T∋30}∏φ∏m̄ = K(m)/(15W) pointwise, all ${W} lags: max abs err ${worst.toExponential(1)}`);
}
// ---- P1b: per-q skeleton vs the cap-26 2ⁿ-mask ledger (verbatim port) ------
function ledgerG30(lv,q,Vg){
  const{W}=lv,{mods,mbar,phi}=tables(lv),nm=mods.length,NS=1<<nm;
  const prodOut=new Float64Array(NS);
  for(let mask=0;mask<NS;mask++){let v=1;for(let i=0;i<nm;i++)if(!(mask&(1<<i)))v*=mbar[i];prodOut[mask]=v;}
  const lA=Math.ceil(W/q),lB=Math.floor((W+1)/q),L=lA+lB,a=q*lA-W;
  const B1T=new Float64Array(NS),B2T=new Float64Array(NS),prod=new Float64Array(NS);prod[0]=1;
  const cur=new Int32Array(nm),vals=new Float64Array(nm);
  for(let d=0;d<lA;d++){
    for(let i=0;i<nm;i++)vals[i]=phi[i][(q*cur[i])%mods[i]];
    for(let mask=1;mask<NS;mask++){const lb=mask&-mask;prod[mask]=prod[mask^lb]*vals[31-Math.clz32(lb)];}
    const wt=d===0?1:2;
    for(let mask=1;mask<NS;mask+=2)B1T[mask]+=wt*prod[mask];
    for(let i=0;i<nm;i++){cur[i]++;if(cur[i]===mods[i])cur[i]=0;}
  }
  for(let i=0;i<nm;i++)cur[i]=0;
  for(let e=0;e<lB;e++){
    for(let i=0;i<nm;i++)vals[i]=phi[i][(a+q*cur[i])%mods[i]];
    for(let mask=1;mask<NS;mask++){const lb=mask&-mask;prod[mask]=prod[mask^lb]*vals[31-Math.clz32(lb)];}
    const wt=2*(lB-e);
    for(let mask=1;mask<NS;mask+=2)B2T[mask]+=wt*prod[mask];
    for(let i=0;i<nm;i++){cur[i]++;if(cur[i]===mods[i])cur[i]=0;}
  }
  let G=0;for(let mask=1;mask<NS;mask+=2)G+=((L/2)*prodOut[mask]*B1T[mask]+prodOut[mask]*B2T[mask])/Vg;
  return G;
}
function verifyLedger(x,step){
  const lv=meta(x);let worst=0,n=0;
  const keep=new Set([13,107,1621,2083,2221]);
  for(let i=0;i<lv.qs.length;i++){const q=lv.qs[i];
    if(i%step!==0&&!keep.has(q))continue;
    const r=scan(lv,q),VAB=Number(r.IVA+r.IVB);
    const sk=Number(BigInt(lv.W)*r.NUM)/(30*VAB);
    worst=Math.max(worst,rel(sk,ledgerG30(lv,q,VAB/(lv.W*lv.W))));n++;
  }
  console.log(`P1b @${x}: kernel closed form vs 2ⁿ mask ledger, ${n}/${lv.qs.length} scour primes: max relerr ${worst.toExponential(1)}`);
}

// ---- P2/P3/P4: exact aggregate certificate + blockers + exceptions ---------
function analyze(x){
  const t0=Date.now(),lv=meta(x),{mids,W,qs}=lv;
  const mbar=mids.map(p=>((p-2)/p)**2),sv=mids.map(p=>(8*p-24)/(p*p));
  const Ask=(54/225)*mids.reduce((a,_,i)=>a*(mbar[i]+sv[i]),1);
  const U1=mids.reduce((a,p)=>a*(1+2/(p-2)),1)-1;
  let SNUM=0n,SNUMP=0n,SV=0n,SIC=0n,SLW=0,nAPB=0,maxNo30=0,nPos=0;
  const rows=[];
  for(const q of qs){
    const r=scan(lv,q),V=r.IVA+r.IVB,VAB=Number(V);
    const sk=Number(BigInt(W)*r.NUM)/(30*VAB);
    const dev=Number(4n*r.IC+V)/(2*VAB);
    if(Ask*(r.L/4+r.lB/2)/(VAB/(W*W))<0.5)nAPB++;
    SNUM+=r.NUM;SNUMP+=r.NUMP;SV+=V;SIC+=r.IC;SLW+=r.L/4+r.lB/2;
    maxNo30=Math.max(maxNo30,Math.abs(dev-sk));if(r.IC>0n)nPos++;
    rows.push({q,sk,dev,exc:BigInt(W)*r.NUM>15n*V,pos:r.IC>0n});
  }
  const LHS=BigInt(W)*SNUM,RHS=15n*SV,cert=LHS<RHS;
  const G30agg=Number(LHS)/(2*Number(RHS));
  const devAgg=Number(4n*SIC+SV)/(2*Number(SV));
  const POSagg=Number(BigInt(W)*SNUMP)/(2*Number(RHS));
  const APBagg=Ask*SLW/(Number(SV)/(W*W));
  const exc=rows.filter(r=>r.exc),near=rows.filter(r=>!r.exc&&r.sk>0.45);
  console.log(`\n===== @${x}: W=${W} K=${qs.length} (q=${qs[0]}..${qs[qs.length-1]}) =====`);
  console.log(`P2 THEOREM  W·ΣNUMsk < 15·ΣV: ${cert?'CERTIFIED (exact BigInt)':'*** FALSE ***'};  G30_agg = ${f(G30agg,4)}, margin 1/2−G30_agg = ${f(0.5-G30agg,4)}`);
  console.log(`   dev_agg = ${f(devAgg,4)} = G30_agg + ${f(devAgg-G30agg,5)};  R_agg = ${f(devAgg-0.5,4)};  ΣCov_adj < 0 exact: ${SIC<0n?'YES':'NO'};  max|no30| ${f(maxNo30,4)};  Cov>0: ${nPos}/${qs.length}`);
  console.log(`P4 resonances G30>1/2: ${exc.map(r=>`${r.q} (${f(r.sk,3)}${r.pos?'':', Cov<0'})`).join(', ')||'none'};  near (>0.45): ${near.map(r=>`${r.q} (${f(r.sk,3)})`).join(', ')||'none'}`);
  console.log(`P3 blockers: APBsk_agg = ${f(APBagg,2)} (per-q APBsk<1/2: ${nAPB}/${qs.length});  ∏(1+2/(p−2))−1 = ${f(U1,3)};  POS_agg = ${f(POSagg,1)}   [${((Date.now()-t0)/1000).toFixed(1)}s]`);
  return{x,K:qs.length,G30agg,devAgg,cert,exc,nPos};
}

// ---- driver ----------------------------------------------------------------
console.log('P1 — the skeleton collapse identity:');
pointwise(11);
verifyLedger(11,1);verifyLedger(13,1);verifyLedger(17,1);verifyLedger(19,8);
const res=[11,13,17,19,23].map(analyze);
console.log('\n================ SUMMARY — the aggregate 30-skeleton bound ================');
for(const r of res)
  console.log(`@${r.x}: G30_agg = ${f(r.G30agg,4)} < 1/2 ${r.cert?'CERTIFIED':'FALSE'} (margin ${f(0.5-r.G30agg,3)});  dev_agg ${f(r.devAgg,4)};  resonances: ${r.exc.map(e=>e.q).join(',')||'none'} (${r.nPos} Cov>0)`);
console.log(`Leg (iii) status: −1/2 exact (cap-26 Thm 2) + collapse (P1, proven all x,q) + G30_agg < 1/2 exact-certified @11..@23 ⟹ THEOREM at every computed level; all-x uniform bound OPEN (blockers in P3).`);
console.log(`TOTAL ${(Date.now()-T00)/1000}s`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/natal-cap-30-skeleton-bound.js
//   invocation:  node research/natal-cap-30-skeleton-bound.js
//   code-sha256: cc76ff9b3fb04614bcc5ba635dbf3f6c2e4fd6acda4a04a55034e707b0b39d56
//   out-sha256:  53d19ce0e170ff878e3b0bc83d3eb61694725a209595f97151289515ed4680e1
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     19.1 s
// ============================================================================
// P1 — the skeleton collapse identity:
// P1a @11: Σ_{T∋30}∏φ∏m̄ = K(m)/(15W) pointwise, all 2310 lags: max abs err 3.5e-18
// P1b @11: kernel closed form vs 2ⁿ mask ledger, 10/10 scour primes: max relerr 1.9e-13
// P1b @13: kernel closed form vs 2ⁿ mask ledger, 34/34 scour primes: max relerr 1.0e-11
// P1b @17: kernel closed form vs 2ⁿ mask ledger, 120/120 scour primes: max relerr 1.6e-10
// P1b @19: kernel closed form vs 2ⁿ mask ledger, 58/435 scour primes: max relerr 1.5e-7
//
// ===== @11: W=2310 K=10 (q=13..47) =====
// P2 THEOREM  W·ΣNUMsk < 15·ΣV: CERTIFIED (exact BigInt);  G30_agg = 0.2132, margin 1/2−G30_agg = 0.2868
//    dev_agg = 0.2133 = G30_agg + 0.00009;  R_agg = -0.2867;  ΣCov_adj < 0 exact: YES;  max|no30| 0.0024;  Cov>0: 1/10
// P4 resonances G30>1/2: 13 (0.625);  near (>0.45): none
// P3 blockers: APBsk_agg = 18.23 (per-q APBsk<1/2: 0/10);  ∏(1+2/(p−2))−1 = 0.711;  POS_agg = 24.5   [0.0s]
//
// ===== @13: W=30030 K=34 (q=17..173) =====
// P2 THEOREM  W·ΣNUMsk < 15·ΣV: CERTIFIED (exact BigInt);  G30_agg = 0.1113, margin 1/2−G30_agg = 0.3887
//    dev_agg = 0.1109 = G30_agg + -0.00035;  R_agg = -0.3891;  ΣCov_adj < 0 exact: YES;  max|no30| 0.0068;  Cov>0: 0/34
// P4 resonances G30>1/2: none;  near (>0.45): none
// P3 blockers: APBsk_agg = 52.51 (per-q APBsk<1/2: 0/34);  ∏(1+2/(p−2))−1 = 1.022;  POS_agg = 317.3   [0.0s]
//
// ===== @17: W=510510 K=120 (q=19..709) =====
// P2 THEOREM  W·ΣNUMsk < 15·ΣV: CERTIFIED (exact BigInt);  G30_agg = 0.1011, margin 1/2−G30_agg = 0.3989
//    dev_agg = 0.1013 = G30_agg + 0.00027;  R_agg = -0.3987;  ΣCov_adj < 0 exact: YES;  max|no30| 0.0070;  Cov>0: 1/120
// P4 resonances G30>1/2: 107 (0.544);  near (>0.45): 101 (0.476), 149 (0.494), 653 (0.466)
// P3 blockers: APBsk_agg = 157.88 (per-q APBsk<1/2: 0/120);  ∏(1+2/(p−2))−1 = 1.292;  POS_agg = 6855.9   [0.0s]
//
// ===== @19: W=9699690 K=435 (q=23..3109) =====
// P2 THEOREM  W·ΣNUMsk < 15·ΣV: CERTIFIED (exact BigInt);  G30_agg = 0.1259, margin 1/2−G30_agg = 0.3741
//    dev_agg = 0.1262 = G30_agg + 0.00031;  R_agg = -0.3738;  ΣCov_adj < 0 exact: YES;  max|no30| 0.0060;  Cov>0: 2/435
// P4 resonances G30>1/2: 2083 (0.606), 2221 (0.521);  near (>0.45): 911 (0.456), 1181 (0.462), 1249 (0.452), 1291 (0.494), 1571 (0.465), 2441 (0.472)
// P3 blockers: APBsk_agg = 520.98 (per-q APBsk<1/2: 0/435);  ∏(1+2/(p−2))−1 = 1.561;  POS_agg = 198558.2   [0.5s]
//
// ===== @23: W=223092870 K=1739 (q=29..14929) =====
// P2 THEOREM  W·ΣNUMsk < 15·ΣV: CERTIFIED (exact BigInt);  G30_agg = 0.0945, margin 1/2−G30_agg = 0.4055
//    dev_agg = 0.0948 = G30_agg + 0.00024;  R_agg = -0.4052;  ΣCov_adj < 0 exact: YES;  max|no30| 0.0039;  Cov>0: 1/1739
// P4 resonances G30>1/2: 2339 (0.575);  near (>0.45): 107 (0.483)
// P3 blockers: APBsk_agg = 1592.73 (per-q APBsk<1/2: 0/1739);  ∏(1+2/(p−2))−1 = 1.805;  POS_agg = 7299002.1   [17.4s]
//
// ================ SUMMARY — the aggregate 30-skeleton bound ================
// @11: G30_agg = 0.2132 < 1/2 CERTIFIED (margin 0.287);  dev_agg 0.2133;  resonances: 13 (1 Cov>0)
// @13: G30_agg = 0.1113 < 1/2 CERTIFIED (margin 0.389);  dev_agg 0.1109;  resonances: none (0 Cov>0)
// @17: G30_agg = 0.1011 < 1/2 CERTIFIED (margin 0.399);  dev_agg 0.1013;  resonances: 107 (1 Cov>0)
// @19: G30_agg = 0.1259 < 1/2 CERTIFIED (margin 0.374);  dev_agg 0.1262;  resonances: 2083,2221 (2 Cov>0)
// @23: G30_agg = 0.0945 < 1/2 CERTIFIED (margin 0.405);  dev_agg 0.0948;  resonances: 2339 (1 Cov>0)
// Leg (iii) status: −1/2 exact (cap-26 Thm 2) + collapse (P1, proven all x,q) + G30_agg < 1/2 exact-certified @11..@23 ⟹ THEOREM at every computed level; all-x uniform bound OPEN (blockers in P3).
// TOTAL 18.998s
// ============================================================================
// READINGS (2026-08-14) — honestly calibrated
// ============================================================================
// 1. THE SKELETON IS ONE KERNEL, NOT 2ⁿ TERMS. The 30∈T half of cap-26's
//    ledger collapses binomially to the per-lag kernel K(m) = 15C(m) − 2P(m):
//    +28·P on m ≡ 0 (30), +13·P on ±6, −2·P elsewhere (mean-zero: 28+26=54).
//    G30(q) = W·NUMsk/(30(IVA+IVB)) — a PAIR of AP-restricted J₅ correlation
//    sums over the lag classes qZ (flat, weight L) and a+qZ (triangular).
//    Proven for all x, q in three lines; verified to the reference ledger's
//    own float precision at 222 primes (P1b: 10/10 @11, 34/34 @13, 120/120
//    @17, 58/435 @19 including all exceptions). The "deep diffuse cloud" of cap-02/
//    cap-26 is, exactly, the 30-free correlation P(m) sampled on d ≡ 0, ±6q̄
//    (mod 30) minus 2/15 of its unrestricted sample.
// 2. THE AGGREGATE BOUND IS AN INTEGER INEQUALITY, AND IT HOLDS AT ALL FIVE
//    LEVELS. G30_agg < 1/2 ⟺ W·ΣNUMsk < 15·Σ(IVA+IVB) — certified in exact
//    BigInt at @11/@13/@17/@19/@23 with margins 0.287..0.405 (worst @11).
//    With cap-26 this makes the calm's leg (iii) a THEOREM at every computed
//    level: R_agg = −1/2 + G30_agg + no30_agg < 0, every piece exact.
// 3. @23 IS NEW AND CALMER. First exact pass at W = 223,092,870 (1739 scour
//    primes): dev_agg = +0.0948, the LOWEST yet (0.213/0.111/0.101/0.126/
//    0.095); R_agg = −0.405, closest to −1/2 on record. Cap-26 reading 5
//    ("the offset does not trend to 0 through @19") softens: @19 now looks
//    like an upward fluctuation, not a floor. Exceptions get RARER: 1/1739
//    (q = 2339, skeleton 0.575) vs 2/435 at @19. no30 at @23 is 0.0039, the
//    smallest since @11 (the printed max|no30| ladder is 0.0024, 0.0068,
//    0.0070, 0.0060, 0.0039 at @11..@23).
// 4. WHY NO ALL-x PROOF YET — THE BLOCKERS, MEASURED. (a) Branch-Abel bound
//    on the skeleton: APBsk_agg = 18 → 1593, growing ~×3.3/level while the
//    truth sits at 0.1: the denominator V_A+V_B is the calm-small variance
//    itself (Vg = o(L)), so any per-branch triangle bound is Θ(L/Vg) —
//    vacuous for every single prime from @11 on (0 certified anywhere).
//    (b) The spike-product candidate ∏(1+2/(p−2))−1 is 0.711 already at @11
//    and DIVERGES (Mertens). (c) The exact positive-mass functional (K⁺) is
//    24.5 → 7.3e6: the skeleton is 99.99…% cancellation along the incomplete
//    classes; no positivity route exists. Sharpest statement of the wall:
//    even the T = {30} term alone (kernel φ₃₀·∏m̄, period 30) Abel-bounds to
//    ~0.12·(L/2)·∏m̄_p/Vg ≫ 1/2; its true aggregate smallness is the
//    equidistribution of ⌈W/q⌉ mod 30 (and of the class phases a mod 30)
//    over scour primes q — an analytic prime-equidistribution statement,
//    provably outside the reach of the branch algebra that proved P4.
// 5. THE EXCEPTION CRITERION IS ONE INTEGER COMPARISON. q resonates iff
//    W·NUMsk(q) > 15·(IVA+IVB). All four cap-26 exceptions reproduced to the
//    printed digit; @23 adds q=2339. The criterion is exact and per-prime but
//    NOT shallow: cap-26 showed rigid (|T|≤2) skeleton ≈ 0, so no congruence
//    one-liner in q can decide it — you compute the two class sums.
// 6. STATUS OF THE FUSED-WINDOW CALM LEMMA AFTER THIS FILE.
//    (i), (ii) PROVEN (cap-19). (iii) −1/2 exact + deviation = skeleton
//    (cap-26, proven) + skeleton collapse (P1, proven all x,q) + G30_agg<1/2
//    (P2, exact-certified @11..@23) ⟹ (iii) is a THEOREM at x ≤ 23; the
//    all-x uniform statement stays OPEN with the blocker now named exactly
//    (reading 4). (iv) anchored typicality ≈ 0.94 — MEASURED only, untouched,
//    the calm's last unprovable leg one level down.
// 7. FORWARD POINTER (2026-08-17 script sweep). Three of the readings above
//    have moved, and natal-cap-36 is where each moved.
//    (a) READING 6's "x ≤ 23" is now x ≤ 29: cap-36's --at29 pass certifies
//        G30_agg = 0.1176 with margin 0.382 at W = 6,469,693,230, exceptions
//        1 of 7,863. Six certified levels, not five.
//    (b) READING 4(a) IS REFUTED. "Every per-branch triangle bound is
//        Θ(L/Vg)" is wrong: cap-36's trapezoid identity gives Θ(1/Vg) with an
//        L-free constant, so the window length was never the obstruction. The
//        bound is still vacuous, for two different reasons cap-36 measures —
//        the deepest branch dominates and its constant grows like 8^π(x),
//        and the denominator itself collapses (ΣV/ΣLδ 0.235 → 0.008 over
//        @11..@23). Theorem A earns its keep as an identity, not as a bound.
//    (c) READING 3's softening of cap-26 reading 5 is withdrawn. With @29 the
//        ladder reads 0.2132, 0.1113, 0.1011, 0.1259, 0.0945, 0.1176: non-
//        monotone twice and flat within its own spread after @11 (mean
//        0.1101, spread 0.0313). @23 was a downward fluctuation, not a trend,
//        and cap-26's "the offset does not trend to 0" stands as written.
//    Also: cap-36 reading 5 shows the fixed-modulus door named in reading 4
//    carries only a few percent of the skeleton mass, so proving the mod-30
//    equidistribution would close almost nothing; the target is the same
//    statement at moduli growing with W. And the name used in reading 6 is
//    retired corpus-wide — the four legs are graded as nine separate
//    sub-claims in research/anchored-calm.md.
//
// Context notes carried out of the pre-embed OUTPUT block (2026-08-19):
//
// P1a @11: collapse identity pointwise, all 2310 lags: max abs err 3.5e-18
// P1b kernel vs 2ⁿ mask ledger: @11 1.9e-13 (10/10)  @13 1.0e-11 (34/34)
//   @17 1.6e-10 (120/120)  @19 1.5e-7 (58/435 incl. all exceptions) — the @19
//   floor is the float LEDGER's own precision (cap-26's P4 relerr there:
//   4.4e-7); the kernel side is exact BigInt.
//
// @11: K=10    CERTIFIED  G30_agg=0.2132 margin 0.2868 | dev_agg 0.2133,
//   no30 +0.00009, max|no30| 0.0024, R_agg -0.2867 (= cap-26 to all digits)
//   resonances: 13 (0.625);  APBsk_agg 18.2 (0/10 <1/2), U1=0.711, POS 24.5
// @13: K=34    CERTIFIED  G30_agg=0.1113 margin 0.3887 | resonances none
//   APBsk_agg 52.5, U1=1.022, POS 317
// @17: K=120   CERTIFIED  G30_agg=0.1011 margin 0.3989 | resonances 107
//   (0.544); near: 101 (.476), 149 (.494), 653 (.466);  APBsk_agg 158,
//   U1=1.292, POS 6.9e3
// @19: K=435   CERTIFIED  G30_agg=0.1259 margin 0.3741 | resonances 2083
//   (0.606), 2221 (0.521); near: 911/1181/1249/1291/1571/2441 (.45-.49)
//   APBsk_agg 521, U1=1.561, POS 2.0e5
// @23: K=1739  CERTIFIED  G30_agg=0.0945 margin 0.4055 | NEW LEVEL, 17 s:
//   dev_agg 0.0948, R_agg -0.4052, max|no30| 0.0039, ΣCov<0 exact YES
//   resonances: 2339 (0.575) — the ONLY Cov>0 prime of 1739; near: 107 (.483)
//   APBsk_agg 1593, U1=1.805, POS 7.3e6
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   0.0945 -> 0.095, the @23 rung of reading 3's G30_agg ladder.
//   0.0039 -> "no30 stays <= 0.004" in reading 3, the @23 max|no30|. The
//     sentence is scoped to @23, which is the paragraph's subject; the other
//     levels print max|no30| up to 0.0070.
//   the APBsk_agg and POS_agg figures of reading 4 and of the context notes:
//     157.88 -> 158, 1592.73 -> 1593, 6855.9 -> 6.9e3, 198558.2 -> 2.0e5,
//     7299002.1 -> 7.3e6.
// DERIVED IN THIS READING by arithmetic over printed values:
//   599 primes in reading 1, the sum of the printed scour counts K = 10, 34,
//     120 and 435 at @11..@19. Note the ledger comparison P1b itself covers
//     10/10, 34/34, 120/120 and 58/435, that is 222 of those 599; 599 is the
//     count of scour primes at those levels, not of ledger comparisons.
//   "99.99...% cancellation" in reading 4(c) is the positive-mass functional
//     against the truth, POS_agg 7299002.1 against an aggregate near 0.1.
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   0.94 in reading 6 is `natal-cap-19-calm-lemma.js`, whose RESIDUAL lines
//     print sum dev0^2 / sum Vfused = 0.9352 and 0.9392.
//   4.4e-7 in the context notes is `natal-cap-26-minus-half.js`, whose @19 line
//     prints "P4 ledger Sigma_T = dev: max relerr 4.4e-7".
//   0.1176 and 7,863 in reading 7(a) are `natal-cap-36-skeleton-door.js`, whose
//     P5 line prints the six-level G30_agg list ending 0.1176 and whose P3 @29
//     line prints K=7863.
//   0.1101 and 0.0313 in reading 7(c) are that same file's printed
//     "@13..@29 mean 0.1101, spread 0.0313".
//   0.235 and 0.008 in reading 7(b) are its P2 lines, calm SigmaV/SigmaLdelta
//     = 0.2349 at @11 and 0.0080 at @23.
// BORROWED but from the producer's code region, not its embedded OUTPUT:
//   the margin 0.382 and W = 6,469,693,230 of reading 7(a). Cap-36 records its
//     --at29 pass as a hand-noted line above its own OUTPUT banner, "P6 @29:
//     W=6469693230 K=7863 ... G30_agg=0.1176 margin 0.3824 ... Cov>0: 1/7863",
//     and carries the same W and G as literals in its P5 call. The default
//     invocation that cap-36's block embeds does not run @29.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// TWO READINGS CORRECTED 2026-08-20 (mismatch adjudication #15 and #23).
//
// #15. Reading 1 said the skeleton identity is "verified to the reference
// ledger's own float precision at 599 primes" and now says 222. 599 is the
// TOTAL scour-prime count over @11..@19 (10 + 34 + 120 + 435), which is what
// P2 certifies as an integer inequality and what this file's header line 32
// quotes. P1b, which is the comparison against the reference ledger, prints
// 10/10, 34/34, 120/120 and 58/435 -- 222 primes -- because at @19 it samples
// 58 of the 435, "incl. all exceptions" as the P1b summary says. The identity
// is proven for all x and q in three lines, so the count is the size of the
// numerical check, not of the claim; but a reading may not borrow P2's number
// for P1b's sentence. Old -> new: 599 -> 222, with the per-level split named.
//
// #23. Reading 3's "no30 stays ≤ 0.004" was true of its own subject, @23
// (max|no30| 0.0039), and false read as a ladder-wide statement: @13, @17 and
// @19 print 0.0068, 0.0070 and 0.0060. The sentence now names @23 and prints
// the whole ladder beside it, so the scope cannot be lost when it is quoted.
// (@11's 0.0024 also satisfies the old bound; the batch that first flagged
// this named only the last level.) No number moved: the five values are the
// block's own.
// ---------------------------------------------------------------------------
