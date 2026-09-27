// ============================================================================
// ATTACK-X-OFFSET 01 — CANDIDATE CORRECTION TERMS FOR THE ~3.8 LAW'S OFFSET
// (2026-08-20 — TODO item X: the last law standing is NOT exact, and the open
//  target must now produce the offset, not just the law)
// ============================================================================
// WHY. `research/history/staging/xchan-at29.md` spent both blind tests of the
// zero-parameter closed form 1 − J = 4S₂, S₂ = Σ_{x<q≤√W} q⁻². It is the only
// survivor of the three pre-registered laws, and it is not exact: the measured
// 1−J sits BELOW it by 1.202e−4 at @29 and 1.183e−4 at @31 (relative −0.41%
// and −0.48%). On the slot-clustered σ (the pooled-floor fix,
// `history/staging/defect-repairs.md` item 3) that is z = −0.43 (@29, a
// non-detection) and z = −2.32 (@31, the one detection).
//
// THIS FILE prices the candidate FAMILY of finite-level corrections against
// those two residuals, exactly, and pre-computes what each candidate predicts
// at @37 — the level that separates them — together with the projected error
// bar there. It computes prime sums and the exact triple tail mass; it runs
// no census. Every measured input is CITED from the embedded OUTPUT block of
// `research/xchan-at29-01-segmented.js` (standing compute rule: cite embedded
// artifacts, never re-calculate).
//
// UNITS AND NORMALISATION, stated before any comparison (the offset is
// relative and has no σ in it; it is not the z — TODO item X):
//   J = obs/CRT is a dimensionless ratio of counts. Everything here lives in
//   J-units. residual Δ = (4S₂) − (1−J)_meas, ABSOLUTE in J-units, positive =
//   the formula runs high. d = (1−J)_meas/(4S₂) − 1 is the RELATIVE offset,
//   σ-free. z = ((1−J)_meas − candidate)/σ_slot uses the slot-clustered σ,
//   itself in J-units.
//
// DISCLOSURE. The candidate 4S₂ − S₃ was found by scanning correction sums
// against the two known residuals (this session, scratch pass). It is
// therefore POST HOC at @29/@31: nothing this file computes at those levels
// can promote it. What this file establishes is (a) which family members the
// existing residuals already REFUTE, and (b) the @37 values that make the
// survivors falsifiable. The blind test is @37, pre-registered separately in
// `research/history/staging/xchan-at37-offset-prereg.md`.
//
// THE CANDIDATES (all corrections are in J-units; qs = scour primes of the
// level, x < q ≤ √W, the same list S₂ is summed over):
//   N1     1−J = 4S₂                      zero-param, the standing law
//   C1     1−J = 4S₂ − S₃                 zero-param, S₃ = Σ q⁻³
//   C2     1−J = 4S₂ − 2S₃                zero-param
//   C4     1−J = 4S₂ − 4S₃ = 4Σq⁻²(1−1/q)  zero-param
//   C8     1−J = 4Σ 1/(q(q+2))            zero-param (≈ 4S₂ − 8S₃)
//   M-mult 1−J = 4S₂·(1−ε)                ε fitted on @29+@31 (weighted)
//   M-abs  1−J = 4S₂ − A₀                 A₀ fitted on @29+@31 (weighted)
//   M-cS3  1−J = 4S₂ − c₃·S₃              c₃ fitted on @29+@31 (weighted)
//   M-ln   1−J = 4S₂ − c_l·S₂/lnW         c_l fitted on @29+@31 (weighted)
//   M-loc  1−J = κ·T₃, T₃ = E_super[Σ_{q∈Q} q⁻²]  the locality shape: the
//          deficit distributed per-triple ∝ Σ q⁻². κ is fitted PER LEVEL and
//          the model is refuted if κ is not constant across levels.
// Fitted one-parameter members cannot be refuted by the two points they are
// fitted on; they are carried to @37 as bands, not as detections.
//
// EXACTNESS. All prime sums in doubles over exact integer primes. W ≤ W(41) =
// 3.04e14 < 2^53. The tail mass Σ_{∏Q>W}1/∏Q uses the exact U-test of the
// census (U[m] = ⌊W/q_m⌋ integer-corrected; q₁q₂ ≤ W < 2^53 exact), monotone
// pointer, no cancellation. Exact tail mass is computed through @37
// (K = 198,274; the K² pass is the cost of this file). @41 gets prime sums
// only; its tail mass (K² = 1.25e12) is not priced here.
//
// usage: node research/attack-x-offset-01-terms.js
// ============================================================================
'use strict';
const T00 = Date.now();
const f = (v, d = 6) => Number.isFinite(v) ? v.toFixed(d) : String(v);
const e = (v, d = 4) => Number.isFinite(v) ? v.toExponential(d) : String(v);
const el = () => ((Date.now() - T00) / 1000).toFixed(1) + 's';
const say = (s) => process.stderr.write(s + '\n');

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}

// ---------------------------------------------------------------------------
// CITED INPUTS — research/xchan-at29-01-segmented.js, embedded OUTPUT
// (out-sha256 d2e5a1b6f94a5c1968faebea08948a18515d9a91637256131f0472d7402e6465).
// obs and CRT are that file's SUMMARY table; sSlot is its σ_J(slot) column.
// 1−J is recomputed as 1 − obs/CRT rather than read at 6 dp. The @29/@31
// registered predictions and F are import-stein.md §3.2 via the same block.
// ---------------------------------------------------------------------------
const MEAS = {
  19:{obs:74065,      CRT:77162.70,      sSlot:0.007107},
  23:{obs:1807665,    CRT:1871421.20,    sSlot:0.001493},
  29:{obs:53660192,   CRT:55252747.16,   sSlot:0.000279},
  31:{obs:1653241687, CRT:1695051393.52, sSlot:0.000051},
};
const REC = {29:{pred:0.028943, F:0.007537, K:7863},
             31:{pred:0.024784, F:0.006419, K:37534}};
const NBAR = {29:143139150, 31:4151035350};   // xchan OUTPUT, counted = formula

// ---------------------------------------------------------------------------
// LEVEL SUMS
// ---------------------------------------------------------------------------
function levelSums(x){
  const basePs=primesUpTo(x).filter(p=>p>=7);
  const W=30*basePs.reduce((a,b)=>a*b,1);
  if(W>=2**53)throw new Error('W exceeds 2^53');
  const qs=primesUpTo(Math.floor(Math.sqrt(W))+1).filter(q=>q>x&&q*q<=W);
  let S2=0,S3=0,S4=0,lg=0,Sqq2=0;
  for(const q of qs){const iq=1/q;S2+=iq*iq;S3+=iq*iq*iq;S4+=iq*iq*iq*iq;
    lg+=2*Math.log(1-iq)-Math.log(1-2*iq);Sqq2+=1/(q*(q+2));}
  const Nbar=2*basePs.reduce((a,p)=>a*(p-2),1);
  return {x,W,lnW:Math.log(W),qs,K:qs.length,S2,S3,S4,F:Math.exp(lg)-1,Sqq2,Nbar};
}

// exact tail mass + locality numerator, the census's own U-test
function tailMass(L){
  const {W,qs,K}=L;
  const U=new Float64Array(K);
  for(let m=0;m<K;m++){let u=Math.floor(W/qs[m]);
    while(u*qs[m]>W)u--; while((u+1)*qs[m]<=W)u++; U[m]=u;}
  const T=new Float64Array(K+1),T3=new Float64Array(K+1);
  for(let m=K-1;m>=0;m--){T[m]=T[m+1]+1/qs[m];T3[m]=T3[m+1]+1/(qs[m]**3);}
  const A2=new Float64Array(K);
  for(let m=0;m<K;m++)A2[m]=1/(qs[m]*qs[m]);
  let miss=0,num3=0;
  const tick=Math.max(1,Math.floor(K/24));
  for(let i=0;i<K;i++){
    const qi=qs[i];let p=K;
    for(let j=i+1;j<K;j++){
      const t=qi*qs[j];
      while(p>0&&t>U[p-1])p--;
      const st=p>j+1?p:j+1;
      const rt=1/t;
      miss+=rt*T[st];
      num3+=rt*((A2[i]+A2[j])*T[st]+T3[st]);
    }
    if(K>50000&&i%tick===0)say(`      tailMass @${L.x}: i=${i}/${K}  [${el()}]`);
  }
  return {miss,T3avg:num3/miss};
}

// ---------------------------------------------------------------------------
// PASS 1 — sums at every level, exact tail mass through @37
// ---------------------------------------------------------------------------
console.log('ATTACK-X-OFFSET 01 — candidate correction terms for the ~3.8 law\'s offset');
console.log('inputs cited from research/xchan-at29-01-segmented.js embedded OUTPUT; no census here\n');
const LV={};
for(const x of [19,23,29,31,37,41]){
  say(`  level sums @${x}  [${el()}]`);
  const L=levelSums(x);
  if(x<=37){const tm=tailMass(L);L.miss=tm.miss;L.T3avg=tm.T3avg;}
  LV[x]=L;
  console.log(`@${x}: W=${L.W} K=${L.K} (${L.qs[0]}..${L.qs[L.K-1]}) lnW=${f(L.lnW,3)}`);
  console.log(`   4S2=${f(4*L.S2)}  S3=${e(L.S3)}  S4=${e(L.S4)}  4*Sqq2=${f(4*L.Sqq2)}  F=${f(100*L.F,4)}%`+
    (L.miss!==undefined?`  miss=${f(L.miss)}  T3avg=${e(L.T3avg)}`:'  miss: not priced (K²=1.25e12)'));
}

// custody: this file's sums against the record
console.log('\n===== CUSTODY =====');
let custodyBad=0;
for(const x of [29,31]){
  const L=LV[x],R=REC[x];
  const ok1=Math.abs(4*L.S2-R.pred)<5e-7, ok2=Math.abs(L.F-R.F)<5e-5, ok3=L.K===R.K;
  if(!(ok1&&ok2&&ok3))custodyBad++;
  console.log(`@${x}: 4S2=${f(4*L.S2)} vs record ${f(R.pred)} ${ok1?'PASS':'FAIL'} | F=${f(100*L.F,4)}% vs ${f(100*R.F,4)}% ${ok2?'PASS':'FAIL'} | K=${L.K} vs ${R.K} ${ok3?'PASS':'FAIL'}`);
}
// exact tail mass reproduces the record's CRT at @29 and @31
for(const x of [29,31]){
  const L=LV[x],M=MEAS[x];
  const CRT=6*NBAR[x]*L.miss, rel=CRT/M.CRT-1;
  const ok=Math.abs(rel)<1e-6;if(!ok)custodyBad++;
  console.log(`@${x}: CRT from this file's exact tail mass = ${f(CRT,2)} vs record ${f(M.CRT,2)}  (rel ${e(rel,2)}) ${ok?'PASS':'FAIL'}`);
}
if(custodyBad)throw new Error(`custody failed at ${custodyBad} checks`);
console.log('ALL CUSTODY CHECKS PASSED');

// ---------------------------------------------------------------------------
// PASS 2 — residuals and the candidate ladder at the two sharp levels
// ---------------------------------------------------------------------------
console.log('\n===== RESIDUALS (J-units; Δ = 4S2 − measured(1−J), positive = formula high) =====');
const ROWS={};
for(const x of [19,23,29,31]){
  const L=LV[x],M=MEAS[x];
  const om=1-M.obs/M.CRT, D=4*L.S2-om;
  ROWS[x]={om,D,s:M.sSlot};
  console.log(`@${x}: measured 1−J=${f(om)}  Δ=${e(D)}  d=${f(100*(om/(4*L.S2)-1),3)}%  σ_slot=${f(M.sSlot)}  Δ/σ=${f(D/M.sSlot,2)}  [${x<29?'fluctuation-dominated, informational':'sharp'}]`);
}

const CAND=[
  {n:'N1: 4S2 (no correction)',   c:(L)=>4*L.S2,          fit:0},
  {n:'C1: 4S2 − S3',              c:(L)=>4*L.S2-L.S3,     fit:0},
  {n:'C2: 4S2 − 2S3',             c:(L)=>4*L.S2-2*L.S3,   fit:0},
  {n:'C4: 4S2 − 4S3',             c:(L)=>4*L.S2-4*L.S3,   fit:0},
  {n:'C8: 4Σ1/(q(q+2))',          c:(L)=>4*L.Sqq2,        fit:0},
];
// weighted single-parameter fits on @29+@31 (weights (t/σ)²); these are
// DESCRIPTIONS of two points, not detections, and are carried as bands.
// se of the weighted mean of the per-level c-estimates is 1/sqrt(Σ w).
function wfit2(term){ // model 1−J = 4S2 − c·term(L)
  let sw=0,swx=0;
  for(const x of [29,31]){const L=LV[x],R=ROWS[x],t=term(L),w=(t/R.s)**2;
    sw+=w;swx+=w*(R.D/t);}
  return {c:swx/sw,se:1/Math.sqrt(sw)};
}
const FITS=[
  {n:'M-mult: 4S2·(1−ε)',   term:(L)=>4*L.S2,      sym:'ε'},
  {n:'M-abs: 4S2 − A0',     term:(L)=>1,           sym:'A0'},
  {n:'M-cS3: 4S2 − c3·S3',  term:(L)=>L.S3,        sym:'c3'},
  {n:'M-ln: 4S2 − cl·S2/lnW',term:(L)=>L.S2/L.lnW, sym:'cl'},
];

console.log('\n===== THE CANDIDATE LADDER, scored on the slot-clustered σ =====');
console.log('zero-parameter members (REFUTED if |z| > 3 at either sharp level):');
for(const cd of CAND){
  const z29=(ROWS[29].om-cd.c(LV[29]))/ROWS[29].s, z31=(ROWS[31].om-cd.c(LV[31]))/ROWS[31].s;
  const chi2=z29*z29+z31*z31;
  const verdict=(Math.abs(z29)>3||Math.abs(z31)>3)?'REFUTED':'ALIVE';
  console.log(`  ${cd.n.padEnd(26)} @29 pred=${f(cd.c(LV[29]))} z=${f(z29,2)} | @31 pred=${f(cd.c(LV[31]))} z=${f(z31,2)} | χ²(2)=${f(chi2,2)}  ${verdict}`);
}
console.log('fitted members (fitted ON @29+@31; cannot be refuted by them — carried to @37 as bands):');
const FITTED={};
for(const ft of FITS){
  const {c,se}=wfit2(ft.term);FITTED[ft.n]={c,se,term:ft.term};
  console.log(`  ${ft.n.padEnd(26)} ${ft.sym} = ${e(c)} ± ${e(se)}   (per-level: @29 ${e(ROWS[29].D/ft.term(LV[29]))}, @31 ${e(ROWS[31].D/ft.term(LV[31]))})`);
}
// the locality shape: κ per level, refuted if not constant
console.log('locality shape M-loc: 1−J = κ·T3avg, κ per level (constant κ required):');
{
  let prev=null,mono=true;
  for(const x of [19,23,29,31]){
    const k=ROWS[x].om/LV[x].T3avg;
    console.log(`  @${x}: κ = ${f(k,2)}`);
    if(prev!==null&&k<prev)mono=false;prev=k;
  }
  const k29=ROWS[29].om/LV[29].T3avg,k31=ROWS[31].om/LV[31].T3avg;
  console.log(`  κ moves ${f(k29,1)} → ${f(k31,1)} over one level (${f(100*(k31/k29-1),1)}%): the deficit is NOT distributed per-triple ∝ Σq⁻². M-loc REFUTED as a constant-κ law.`);
}

// ---------------------------------------------------------------------------
// PASS 3 — @37: predictions, projected σ, separations
// ---------------------------------------------------------------------------
console.log('\n===== @37 — WHERE THE SURVIVORS SEPARATE =====');
{
  const L=LV[37];
  const Nbar37=NBAR[31]*35;                      // 2·∏(p−2), ×(37−2)
  if(Nbar37!==L.Nbar)throw new Error('N̄(37) mismatch');
  const CRT37=6*Nbar37*L.miss;
  const omProj=4*L.S2-L.S3;                      // any live candidate, for σ only
  const sReg=Math.sqrt(omProj>0?(1-omProj)*CRT37:CRT37)/CRT37;
  const inflLo=2.12,inflHi=2.17,infl=2.14;       // PROJECTED from 2.078→2.106→2.124
  const sProj=sReg*infl;
  console.log(`N̄(37)=${Nbar37}  miss=${f(L.miss)}  CRT(37)=${e(CRT37,4)}  [both exact]`);
  console.log(`σ_reg(37) = √obs/CRT ≈ ${e(sReg)}   σ_slot(37) PROJECTED = ${e(sProj)}  (inflation ${infl}, banded [${inflLo}, ${inflHi}] — a projection, not a measurement)`);
  console.log('\ncandidate predictions for 1−J at @37 (fitted members at their central value):');
  const preds=[];
  for(const cd of CAND)preds.push({n:cd.n,v:cd.c(L)});
  for(const ft of FITS){const F0=FITTED[ft.n];preds.push({n:ft.n,v:4*L.S2-F0.c*F0.term(L)});}
  for(const p of preds)console.log(`  ${p.n.padEnd(26)} 1−J(37) = ${f(p.v)}   residual vs N1 = ${e(4*L.S2-p.v,3)}`);
  console.log('\npairwise separations at @37 in units of the projected σ_slot:');
  const keep=preds.filter(p=>/N1|C1|C2|M-mult|M-abs|M-cS3|M-ln/.test(p.n));
  for(let i=0;i<keep.length;i++)for(let j=i+1;j<keep.length;j++){
    const sep=Math.abs(keep[i].v-keep[j].v)/sProj;
    console.log(`  ${keep[i].n.split(':')[0]} vs ${keep[j].n.split(':')[0]}: ${f(sep,1)}σ`);
  }
  console.log('\n@41 (prime sums only; tail mass not priced):');
  const L41=LV[41];
  console.log(`  N1=${f(4*L41.S2)}  C1=${f(4*L41.S2-L41.S3)}  C2=${f(4*L41.S2-2*L41.S3)}  M-abs=${f(4*L41.S2-FITTED['M-abs: 4S2 − A0'].c)}`);
}
console.log(`\n[total ${el()}]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both --node-flag --max-old-space-size=4096 research/attack-x-offset-01-terms.js
//   invocation:  node --max-old-space-size=4096 research/attack-x-offset-01-terms.js
//   code-sha256: 14f628f7133891a014d634dd085ecf2f08dfd0eb9bd679702d4467d64c440930
//   out-sha256:  23f2ce26b2c791e1b1b8814e0fd8ee97ebfc6e415bdb6e13626b047528a08ef4
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     170.2 s
// ============================================================================
// ATTACK-X-OFFSET 01 — candidate correction terms for the ~3.8 law's offset
// inputs cited from research/xchan-at29-01-segmented.js embedded OUTPUT; no census here
//
// @19: W=9699690 K=435 (23..3109) lnW=16.088
//    4S2=0.041122  S3=2.5433e-4  S4=8.0071e-6  4*Sqq2=0.039207  F=1.0878%  miss=0.050943  T3avg=3.3353e-4
// @23: W=223092870 K=1739 (29..14929) lnW=19.223
//    4S2=0.033678  S3=1.7214e-4  S4=4.4336e-6  4*Sqq2=0.032368  F=0.8819%  miss=0.058834  T3avg=1.4940e-4
// @29: W=6469693230 K=7863 (31..80429) lnW=22.590
//    4S2=0.028943  S3=1.3114e-4  S4=3.0198e-6  4*Sqq2=0.027940  F=0.7537%  miss=0.064335  T3avg=7.7669e-5
// @31: W=200560490130 K=37534 (37..447829) lnW=26.024
//    4S2=0.024784  S3=9.7575e-5  S4=1.9370e-6  4*Sqq2=0.024033  F=0.6419%  miss=0.068057  T3avg=4.3156e-5
// @37: W=7420738134810 K=198274 (41..2724079) lnW=29.635
//    4S2=0.021863  S3=7.7833e-5  S4=1.4034e-6  4*Sqq2=0.021262  F=0.5642%  miss=0.070749  T3avg=2.6160e-5
// @41: W=304250263527210 K=1117909 (43..17442769) lnW=33.349
//    4S2=0.019484  S3=6.3324e-5  S4=1.0495e-6  4*Sqq2=0.018993  F=0.5014%  miss: not priced (K²=1.25e12)
//
// ===== CUSTODY =====
// @29: 4S2=0.028943 vs record 0.028943 PASS | F=0.7537% vs 0.7537% PASS | K=7863 vs 7863 PASS
// @31: 4S2=0.024784 vs record 0.024784 PASS | F=0.6419% vs 0.6419% PASS | K=37534 vs 37534 PASS
// @29: CRT from this file's exact tail mass = 55252747.16 vs record 55252747.16  (rel -6.01e-11) PASS
// @31: CRT from this file's exact tail mass = 1695051393.52 vs record 1695051393.52  (rel 3.18e-13) PASS
// ALL CUSTODY CHECKS PASSED
//
// ===== RESIDUALS (J-units; Δ = 4S2 − measured(1−J), positive = formula high) =====
// @19: measured 1−J=0.040145  Δ=9.7722e-4  d=-2.376%  σ_slot=0.007107  Δ/σ=0.14  [fluctuation-dominated, informational]
// @23: measured 1−J=0.034068  Δ=-3.9020e-4  d=1.159%  σ_slot=0.001493  Δ/σ=-0.26  [fluctuation-dominated, informational]
// @29: measured 1−J=0.028823  Δ=1.2009e-4  d=-0.415%  σ_slot=0.000279  Δ/σ=0.43  [sharp]
// @31: measured 1−J=0.024666  Δ=1.1853e-4  d=-0.478%  σ_slot=0.000051  Δ/σ=2.32  [sharp]
//
// ===== THE CANDIDATE LADDER, scored on the slot-clustered σ =====
// zero-parameter members (REFUTED if |z| > 3 at either sharp level):
//   N1: 4S2 (no correction)    @29 pred=0.028943 z=-0.43 | @31 pred=0.024784 z=-2.32 | χ²(2)=5.59  ALIVE
//   C1: 4S2 − S3               @29 pred=0.028812 z=0.04 | @31 pred=0.024687 z=-0.41 | χ²(2)=0.17  ALIVE
//   C2: 4S2 − 2S3              @29 pred=0.028681 z=0.51 | @31 pred=0.024589 z=1.50 | χ²(2)=2.52  ALIVE
//   C4: 4S2 − 4S3              @29 pred=0.028419 z=1.45 | @31 pred=0.024394 z=5.33 | χ²(2)=30.50  REFUTED
//   C8: 4Σ1/(q(q+2))           @29 pred=0.027940 z=3.17 | @31 pred=0.024033 z=12.40 | χ²(2)=163.77  REFUTED
// fitted members (fitted ON @29+@31; cannot be refuted by them — carried to @37 as bands):
//   M-mult: 4S2·(1−ε)          ε = 4.7550e-3 ± 2.0124e-3   (per-level: @29 4.1492e-3, @31 4.7826e-3)
//   M-abs: 4S2 − A0            A0 = 1.1858e-4 ± 5.0169e-5   (per-level: @29 1.2009e-4, @31 1.1853e-4)
//   M-cS3: 4S2 − c3·S3         c3 = 1.1978e+0 ± 5.0758e-1   (per-level: @29 9.1573e-1, @31 1.2148e+0)
//   M-ln: 4S2 − cl·S2/lnW      cl = 4.9085e-1 ± 2.0801e-1   (per-level: @29 3.7493e-1, @31 4.9786e-1)
// locality shape M-loc: 1−J = κ·T3avg, κ per level (constant κ required):
//   @19: κ = 120.37
//   @23: κ = 228.04
//   @29: κ = 371.10
//   @31: κ = 571.55
//   κ moves 371.1 → 571.6 over one level (54.0%): the deficit is NOT distributed per-triple ∝ Σq⁻². M-loc REFUTED as a constant-κ law.
//
// ===== @37 — WHERE THE SURVIVORS SEPARATE =====
// N̄(37)=145286237250  miss=0.070749  CRT(37)=6.1673e+10  [both exact]
// σ_reg(37) = √obs/CRT ≈ 3.9826e-6   σ_slot(37) PROJECTED = 8.5228e-6  (inflation 2.14, banded [2.12, 2.17] — a projection, not a measurement)
//
// candidate predictions for 1−J at @37 (fitted members at their central value):
//   N1: 4S2 (no correction)    1−J(37) = 0.021863   residual vs N1 = 0.000e+0
//   C1: 4S2 − S3               1−J(37) = 0.021785   residual vs N1 = 7.783e-5
//   C2: 4S2 − 2S3              1−J(37) = 0.021707   residual vs N1 = 1.557e-4
//   C4: 4S2 − 4S3              1−J(37) = 0.021552   residual vs N1 = 3.113e-4
//   C8: 4Σ1/(q(q+2))           1−J(37) = 0.021262   residual vs N1 = 6.011e-4
//   M-mult: 4S2·(1−ε)          1−J(37) = 0.021759   residual vs N1 = 1.040e-4
//   M-abs: 4S2 − A0            1−J(37) = 0.021744   residual vs N1 = 1.186e-4
//   M-cS3: 4S2 − c3·S3         1−J(37) = 0.021770   residual vs N1 = 9.323e-5
//   M-ln: 4S2 − cl·S2/lnW      1−J(37) = 0.021772   residual vs N1 = 9.053e-5
//
// pairwise separations at @37 in units of the projected σ_slot:
//   N1 vs C1: 9.1σ
//   N1 vs C2: 18.3σ
//   N1 vs M-mult: 12.2σ
//   N1 vs M-abs: 13.9σ
//   N1 vs M-cS3: 10.9σ
//   N1 vs M-ln: 10.6σ
//   C1 vs C2: 9.1σ
//   C1 vs M-mult: 3.1σ
//   C1 vs M-abs: 4.8σ
//   C1 vs M-cS3: 1.8σ
//   C1 vs M-ln: 1.5σ
//   C2 vs M-mult: 6.1σ
//   C2 vs M-abs: 4.4σ
//   C2 vs M-cS3: 7.3σ
//   C2 vs M-ln: 7.6σ
//   M-mult vs M-abs: 1.7σ
//   M-mult vs M-cS3: 1.3σ
//   M-mult vs M-ln: 1.6σ
//   M-abs vs M-cS3: 3.0σ
//   M-abs vs M-ln: 3.3σ
//   M-cS3 vs M-ln: 0.3σ
//
// @41 (prime sums only; tail mass not priced):
//   N1=0.019484  C1=0.019420  C2=0.019357  M-abs=0.019365
//
// [total 170.2s]
// ───── stderr ─────
//   level sums @19  [0.0s]
//   level sums @23  [0.0s]
//   level sums @29  [0.0s]
//   level sums @31  [0.3s]
//   level sums @37  [6.2s]
//       tailMass @37: i=0/198274  [6.3s]
//       tailMass @37: i=8261/198274  [19.8s]
//       tailMass @37: i=16522/198274  [32.1s]
//       tailMass @37: i=24783/198274  [43.4s]
//       tailMass @37: i=33044/198274  [53.9s]
//       tailMass @37: i=41305/198274  [63.9s]
//       tailMass @37: i=49566/198274  [73.5s]
//       tailMass @37: i=57827/198274  [82.6s]
//       tailMass @37: i=66088/198274  [91.2s]
//       tailMass @37: i=74349/198274  [99.4s]
//       tailMass @37: i=82610/198274  [107.1s]
//       tailMass @37: i=90871/198274  [114.5s]
//       tailMass @37: i=99132/198274  [121.4s]
//       tailMass @37: i=107393/198274  [128.0s]
//       tailMass @37: i=115654/198274  [134.0s]
//       tailMass @37: i=123915/198274  [139.7s]
//       tailMass @37: i=132176/198274  [144.9s]
//       tailMass @37: i=140437/198274  [149.6s]
//       tailMass @37: i=148698/198274  [153.9s]
//       tailMass @37: i=156959/198274  [157.7s]
//       tailMass @37: i=165220/198274  [161.1s]
//       tailMass @37: i=173481/198274  [164.0s]
//       tailMass @37: i=181742/198274  [166.5s]
//       tailMass @37: i=190003/198274  [168.5s]
//       tailMass @37: i=198264/198274  [170.0s]
//   level sums @41  [170.0s]
// ============================================================
// READINGS
//
// 1. THE RESIDUAL HAS S3'S SIZE AND S3'S FLATNESS, WITH NO PARAMETER. The
//    measured absolute residuals are 1.201e-4 (@29) and 1.185e-4 (@31);
//    S3 = Σq⁻³ over the same scour lists is 1.311e-4 and 0.976e-4. The
//    zero-parameter candidate C1 = 4S2 − S3 therefore scores z = +0.04 and
//    −0.41 where the standing law scores −0.43 and −2.32, and its χ²(2) is
//    0.17 against 5.59. C1 is POST HOC — found by scanning correction sums
//    against the two known residuals — so this file records it as a
//    candidate and nothing more. @37 is its blind test.
//
// 2. THE EXISTING LEVELS ALREADY KILL THE BIG-COEFFICIENT END OF THE FAMILY.
//    4S2 − 4S3 dies at +5.33σ (@31) and 4Σ1/(q(q+2)) at +12.40σ. Any
//    per-term correction 4Σq⁻²(1−c/q) needs c < ~3 to survive @31.
//
// 3. THE LOCALITY SHAPE IS REFUTED. 1−J = κ·E_super[Σ_{q∈Q} q⁻²] needs
//    κ = 120 → 572 over @19..@31: the deficit is not distributed over
//    triples proportionally to their own Σq⁻², so the 4S2 agreement is not
//    a per-smallest-prime local story. Whatever produces the aggregate law
//    must produce it non-locally in the prime.
//
// 4. @37 IS THE DISCRIMINATOR, AND ITS PRICE IS ALREADY PAID IN ARITHMETIC.
//    Exact tail mass miss(37) = 0.070749 gives CRT(37) = 6.167e10 and a
//    projected slot σ of 8.5e-6. N1 vs C1 separate at 9.1σ, C1 vs a
//    constant absolute residual at 4.8σ, C1 vs C2 at 9.1σ. Within the
//    shrinking family (C1 vs fitted S3, S2/lnW, multiplicative) @37 does
//    not decide (1.5–3.1σ). The @37 predictions and bands are frozen in
//    research/history/staging/xchan-at37-offset-prereg.md.
//
// 5. THE FITTED MEMBERS ARE TWO-POINT DESCRIPTIONS. ε = (4.76±2.01)e-3,
//    A0 = (1.19±0.50)e-4, c3 = 1.20±0.51, cl = 0.49±0.21: every error bar
//    is ~40% of its center because the @29 point is a non-detection. No
//    shape claim is made from them.
