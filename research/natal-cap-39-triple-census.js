// ============================================================================
// NATAL-CAP 39 — THE MIXED SUPER-W TRIPLE CENSUS PAST @17
// (2026-08-19 — TODO item X's named first move, second half:
//  "extend the mixed super-W triple census past @17")
// ============================================================================
// WHY. `research/history/staging/verify-cofactor-convolution.md` §5 states the
// steelman that survived the X-channel's refutation of the origin-density
// candidate: *the anchored joint law is truncated at ∏Q > W beyond what its
// marginals are truncated at, by a factor measured at 0.903 on the mixed
// super-W triples at @17; this is a genuine dependence between the two
// orientations, it lives at i + j ≥ 3, and it is invisible to X because X
// depends on the joint only through the i = j = 0 cell.* That 0.903 has ONE
// level. `natal-cap-35-x-multiplicity.js` gates its j = 3 census at x ≤ 17
// (`if(x<=17)part5(L,U,3)`), because the full census enumerates all C(K,3)
// triples and C(1739,3) = 874,979,589 at @23. This file lifts the gate.
//
// THE STATISTIC. For a set Q of three scour primes and ε ∈ {0,2}^Q, put
// c(Q,ε) = #{r ∈ N : r ≡ −ε_q (mod q) ∀q ∈ Q}, with CRT value N̄/∏Q. The two
// ALIGNED patterns are ε ≡ 0 and ε ≡ 2; the other six are MIXED. Define
//
//     J(x) = (Σ_{∏Q > W, mixed} c(Q,ε)) / (6·N̄·Σ_{∏Q > W} 1/∏Q)
//
// which is cap-35's printed "∏Q > W ratio" divided by its printed "P1
// prediction". That prediction is not a measurement: six of the eight
// ε-patterns are mixed and all eight carry the same CRT weight N̄/∏Q, so it
// is the constant 3/4 at every level. J(17) = 0.677/0.750 = 0.9025.
//
// THE BRIDGE (this file's one idea, and why the census is affordable).
// Restricting the enumeration to ∏Q < W does NOT measure a different object.
// Three facts compose into an exact identity for the super-W part:
//
//   (B1) The TOTAL anchored j = 3 census is free. Σ_{Q,ε} c(Q,ε) = Σ_{r∈N}
//        C(m_r, 3), and by cap-35's u-form m_r(0) = a(r) + b(r) with
//        a(r) = #{q | r}, b(r) = #{q | r+2}. Carrying the anchored JOINT
//        histogram cnt(i,j) = #{r ∈ N : a(r)=i, b(r)=j} over the natal set —
//        one O(W) pass — gives the census split by class as well, since the
//        number of 3-subsets drawing i coordinates from the r side and 3−i
//        from the r+2 side is C(a,i)·C(b,3−i) (Vandermonde returns the total).
//        Classes (3,0) and (0,3) are the aligned patterns, (2,1) and (1,2) the
//        mixed ones.
//   (B2) The sub-W part is cheap: 4,517,592 triples at @23 (cap-35's part3
//        already counts them; its j = 3 "#subsets ∏Q<W" column IS this number)
//        against 874,979,589 in the full enumeration, a factor of 194.
//   (B3) P1 is a theorem, so the aligned super-W obs is exactly 0: for ∏Q > W
//        the all-0 pattern forces r = 0, not natal, and the all-2 pattern
//        forces r = ∏Q − 2 ≥ W − 1, which is out of range or ≡ 29 (mod 30).
//
// Hence  mixed super-W obs = Σ_{r∈N}[C(a,2)b + a·C(b,2)] − (sub-W mixed obs),
// exactly, with no estimator and no error term; and the CRT denominator is
// 6·N̄·(e_3(1/q) − Σ_{∏Q<W} 1/∏Q), whose second factor is cap-35 part3's
// printed "missing mass" column. The restriction costs nothing in fidelity.
// It also delivers, for free, a DIRECT test of P1 at @19 and @23 — listed as
// not tested at @23 in `xchannel-at23.md` §7 — because the aligned super-W obs
// comes out of the same subtraction and must be 0.
//
// The full census is run anyway at every level here, priced at 184–221 s for
// @23 from a timed prefix of the kernel at the real @23 array size, so the
// bridge is checked against direct enumeration at all five levels rather than
// asserted. The kernel costs TWO modular inverses per triple, not twenty-four:
// the eight patterns are built by incremental CRT (2 → 4 → 8), and the two
// inverses inv(q₁ mod q₂, q₂) and inv(q₁q₂ mod q₃, q₃) are shared.
//
// MEMORY. cap-35 carries 25 bytes per slot and needs 5.58 GB at @23. This file
// carries A (1) + a (2) + b (2) = 5 bytes per slot, dropping cap-35's Int32
// prefix table C in favour of two running counters for the triangular weight,
// and needs about 1.1 GB.
//
// ----------------------------------------------------------------------------
// PRE-REGISTRATION — written before the @23 census ran, and bound to this run
// by the embed's code-sha256.
//
// HONESTY NOTE (the campaign rule exists for this; `xchannel-at23.md` §4 set
// the precedent). J(19) = 0.9599 printed on the timing probe BEFORE these
// bands were written, so for @19 they are a stated criterion, not a blind
// forecast. For @23 they are blind: no @23 census had been run. The arithmetic
// producing them uses only the three points already on record in cap-35's
// embedded tail, and is reproduced here so it can be checked.
//
// ON RECORD, from cap-35's embedded j = 3 census, no new run:
//   J(11) = 0.402/0.750 = 0.5361   (obs 2,    Poisson σ_J = 0.379)
//   J(13) = 0.768/0.750 = 1.0236   (obs 143,  σ_J = 0.086)
//   J(17) = 0.677/0.750 = 0.9025   (obs 3199, σ_J = 0.016)
// @11 and @13 are informational only. The anchor is @17.
//
// TWO DECAY REFERENCES, from those points only:
//   1−J ∝ Σ_{q>x} 1/(q(q−2))  (1.3856%, 1.0878%, 0.8817% at @17/@19/@23)
//        ⇒ J(19) = 0.9235, J(23) = 0.9379
//   1−J ∝ 1/lnW  (13.143, 16.088, 19.223)
//        ⇒ J(19) = 0.9204, J(23) = 0.9333
//
// BANDS (exhaustive; applied to J(19) and J(23) separately, and printed by the
// classifier below so the verdict cannot be retrofitted):
//   DEEPENING                      J < 0.887          below @17 by > its own 1σ
//   FLAT                           0.887 ≤ J ≤ 0.919  @17's 0.9025 ± 1σ
//   [σ CAVEAT, 2026-08-20: the 1σ in those two edges is the Poisson σ_J below,
//    which is a FLOOR and understates. The edges inherit that and widen to
//    roughly [0.872, 0.933]. Re-classifying all five measured J values against
//    the wider edges changes NO band, and "DEEPENING is REFUTED" survives
//    through the classifier; what does not survive is any σ-quantifier attached
//    to it. See the σ_J note beside the printed line further down.]
//   DECAYING, ON THE FORCED TRACK  0.919 < J ≤ 0.945  the two reference laws
//   DECAYING FASTER THAN FORCED    0.945 < J ≤ 0.995
//   GONE OR REVERSED               J > 0.995
// MONOTONICITY CLAUSE: a trend verdict requires J monotone from @17 onward.
// Otherwise the verdict is NO LAW — the ruling `xchannel-at23.md` R2 made on
// the increment ratios.
//
// WHAT EACH READING DOES TO ASSUMPTION A's DEPENDENCE TERM δ:
//   (a) FLAT near 0.90 — a constant joint correction. δ's forced-scale bound
//       stays true at the (0,0) cell, but a NON-decaying ~10% joint correction
//       lives at i+j = 3 and never enters X. `verify-cofactor-convolution.md`
//       §7's "both scales decay like 1/(x ln x)" must then be narrowed in print
//       to the (0,0) cell. The origin-density steelman survives as permanent
//       structure out of X's reach.
//   (b) DECAYING toward 1 — finite-size. The steelman is a small-W effect.
//       verify §3's DERIVED claim (P1 is one-sided, so mixed patterns keep
//       their CRT mass on average and the truncation lives entirely in the
//       marginals) is confirmed asymptotically, and δ's decaying story
//       generalises from the one cell X sees to the whole i+j = 3 joint.
//   (c) DEEPENING — structure at the origin, Chris's instinct. verify §3's
//       DERIVED claim is refuted: its uncontrolled averaging fails. δ's
//       smallness at (0,0) is then a cancellation, not a bound, and Assumption
//       A needs the joint controlled separately at i+j ≥ 3 — exactly where the
//       X-gap's m ≥ 3 share is migrating (10.5% → 23.5% → 81.1%).
//   (d) GONE OR REVERSED — the @17 0.903 was itself an artefact of 3199 counts
//       and the steelman is refuted rather than out of reach.
//
// THE δ SIGN-FLIP SUB-REGISTRATION. δ_model flips sign at @19 (+0.2997%,
// −0.2850%, +0.5175% at @17/@19/@23) and the flip is unexplained on record.
// If J is SMOOTH through @19 — |J(19) − the lnW-linear interpolation of J(17)
// and J(23)| ≤ 0.010 — then @19 is not a special level for the joint law, the
// flip is localised to the (0,0) cell, and it reads as finite-size
// cancellation, not structure. If J kinks at @19 by more than 0.010 against
// the trend, the flip is structural and shared across cells.
//
// PRESENTATION NOTE (added after the first run, disclosed here rather than
// quietly): the summary table's (1−J)/forced column, and the removal of a
// per-triple nanosecond figure that the embed's normaliser does not cover, are
// the only changes made to this file after its first execution. No band, no
// rule, no threshold and no computed quantity changed; the new column is a
// ratio of two columns already printed beside it.
//
// REPRODUCTION GATES (failure is an instrument fault, not a finding):
//   (X̄−X(0))/S̄ = −0.2287, +0.0134, +0.1568, +0.2225, +0.2658
//   m ≥ 3 share of the X-gap = 10.5%, 23.5%, 81.1% at @17/@19/@23
//   δ_model = −2.0247%, +0.4264%, +0.2997%, −0.2850%, +0.5175%
//   Σ_{∏Q>W} 1/∏Q = 0.006909, 0.023518, 0.039784, 0.050943, 0.058834
//   aligned super-W obs = 0 exactly at every level (P1)
//   bridge = full census at every level
// ============================================================================
'use strict';
const T00 = Date.now();
const f = (v, d = 3) => Number.isFinite(v) ? v.toFixed(d) : String(v);
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
// modular inverse of a mod m (same semantics as cap-35's inv, no destructuring)
function inv(a,m){let r0=a%m;if(r0<0)r0+=m;let r1=m,s0=1,s1=0;
  while(r1!==0){const q=Math.floor(r0/r1),t=r0-q*r1,u=s0-q*s1;r0=r1;r1=t;s0=s1;s1=u;}
  let s=s0%m;if(s<0)s+=m;return s;}
const C3=(n)=>n<3?0:n*(n-1)*(n-2)/6, C2=(n)=>n<2?0:n*(n-1)/2;

// ---------------------------------------------------------------- level data
function level(x){
  const basePs=primesUpTo(x).filter(p=>p>=7);
  const W=30*basePs.reduce((a,b)=>a*b,1);
  const A=new Uint8Array(W);
  for(let r=11;r<W;r+=30)A[r]=1;
  for(let r=17;r<W;r+=30)A[r]=1;
  for(const p of basePs){for(let j=0;j<W;j+=p)A[j]=0;for(let j=p-2;j<W;j+=p)A[j]=0;}
  let N=0;for(let r=0;r<W;r++)if(A[r])N++;
  const qs=primesUpTo(Math.floor(Math.sqrt(W))+1).filter(q=>q>x&&q*q<=W);
  const H=qs.reduce((a,q)=>a+2/q,0);
  return {x,W,A,N,qs,K:qs.length,H,basePs,y:qs[qs.length-1]};
}
// CRT / independent-strike Poisson-binomial spectrum with p_q = 2/q
function crtSpectrum(L){
  let poly=[1];
  for(const q of L.qs){const p=2/q,np=new Array(poly.length+1).fill(0);
    for(let i=0;i<poly.length;i++){np[i]+=poly[i]*(1-p);np[i+1]+=poly[i]*p;}poly=np;}
  return poly.map(v=>v*L.N);
}
// elementary symmetric e_j(1/q) up to j=JM
function esym(qs,JM){let e=[1];for(const q of qs){const p=1/q,ne=e.slice();ne.push(0);
  for(let i=Math.min(e.length-1,JM-1);i>=0;i--)ne[i+1]+=e[i]*p;e=ne.slice(0,JM+1);}return e;}

// ============================================================================
// PART 1 — THE u-FORM, SLIMMED: a(v)=#{q|v}, b(v)=#{q|v+2}, mu=a+b.
// Anchored reading on N (with the full joint histogram cnt(i,j)), ensemble
// reading on the u-line with the triangular weight, carried by two running
// counters instead of cap-35's Int32Array(W) prefix table.
// ============================================================================
function uform(L){
  const {W,A,N,qs,K}=L;
  const a=new Uint16Array(W),b=new Uint16Array(W);  // NOT Uint8: a[0] = K (every q divides 0)
  for(const q of qs){for(let j=0;j<W;j+=q)a[j]++;for(let j=q-2;j<W;j+=q)b[j]++;}
  const JM=16;
  const cnt=[];for(let i=0;i<=JM;i++)cnt.push(new Float64Array(JM+1));
  const ens=new Float64Array(K+2),anc=new Float64Array(K+2);
  let wp=N,wm=0,tot=0;
  for(let z=0;z<=W-3;z++)if(A[z])wm++;                    // #{r <= W-3}
  for(let v=0;v<W;v++){
    const av=a[v],bv=b[v],w=wp+wm;
    tot+=w;ens[av+bv]+=w;
    if(A[v]){anc[av+bv]++;cnt[Math.min(av,JM)][Math.min(bv,JM)]++;}
    wp-=A[v];const z=W-3-v;if(z>=0)wm-=A[z];
  }
  tot+=N;ens[0]+=N;                                        // self-mirrored v=-1
  for(let k=0;k<=K+1;k++)ens[k]/=W;
  return {a,b,ens,anc,cnt,JM,totOK:tot===N*W};
}
const Xof=(h)=>{let s=0;for(let k=2;k<h.length;k++)s+=(k-1)*h[k];return s;};

// ============================================================================
// PART 2 — THE TRIPLE CENSUS KERNEL.
// c(Q,eps) = #{r in N : r = -eps_q (mod q) for all q in Q}, eps in {0,2}^Q.
// Class cls = #{q : eps_q = 0} in 0..3; cls=3 and cls=0 are the two ALIGNED
// patterns, cls=2 and cls=1 the MIXED ones. CRT value per pattern = N/PiQ.
// restricted=true enumerates only PiQ < W; false enumerates all C(K,3).
// Per triple the CRT solve costs TWO modular inverses (shared across the eight
// patterns by combining incrementally), not twenty-four.
// ============================================================================
function tripleCensus(L,restricted){
  const {W,A,N,qs,K}=L;
  const O=new Float64Array(4),E=new Float64Array(4);
  let nTrip=0,nScan=0,recip=0;
  const a2=[0,0,0,0];
  for(let i=0;i<K;i++){
    const q1=qs[i];
    if(restricted&&i+2<K&&q1*qs[i+1]*qs[i+2]>=W)break;
    for(let j=i+1;j<K;j++){
      const q2=qs[j],p2=q1*q2;
      if(restricted&&j+1<K&&p2*qs[j+1]>=W)break;
      const i2=inv(q1%q2,q2);
      // four level-2 solutions, index = t1bit*2 + t2bit  (bit set <=> eps = 2)
      for(let c=0;c<4;c++){
        const t1=(c&2)?q1-2:0,t2=(c&1)?q2-2:0;
        let d=(t2-t1)%q2;if(d<0)d+=q2;
        a2[c]=t1+q1*((d*i2)%q2);
      }
      for(let k=j+1;k<K;k++){
        const q3=qs[k],P=p2*q3;
        if(restricted&&P>=W)break;
        nTrip++;recip+=1/P;
        const i3=inv(p2%q3,q3);
        const sup=P>W;
        for(let c=0;c<4;c++){
          const A2=a2[c],A2m=A2%q3;
          for(let e3=0;e3<2;e3++){
            const t3=e3?q3-2:0;
            let d=(t3-A2m)%q3;if(d<0)d+=q3;
            const r0=A2+p2*((d*i3)%q3);
            const cls=3-(((c&2)?1:0)+((c&1)?1:0)+e3);
            let cc=0;
            if(sup){if(r0<W){nScan++;if(A[r0])cc=1;}}
            else{for(let r=r0;r<W;r+=P){nScan++;if(A[r])cc++;}}
            O[cls]+=cc;E[cls]+=N/P;
          }
        }
      }
    }
  }
  return {O,E,nTrip,nScan,recip};
}
// count-only pass: the code's own work counts, printed BEFORE the census runs
function tripleWork(L,restricted){
  const {W,qs,K}=L;let nTrip=0,nScan=0,recip=0;
  for(let i=0;i<K;i++){
    const q1=qs[i];
    if(restricted&&i+2<K&&q1*qs[i+1]*qs[i+2]>=W)break;
    for(let j=i+1;j<K;j++){
      const q2=qs[j],p2=q1*q2;
      if(restricted&&j+1<K&&p2*qs[j+1]>=W)break;
      for(let k=j+1;k<K;k++){
        const P=p2*qs[k];
        if(restricted&&P>=W)break;
        nTrip++;recip+=1/P;
        nScan+=P>W?8:8*(Math.floor((W-1)/P)+1);
      }
    }
  }
  return {nTrip,nScan,recip};
}

// ============================================================================
// DRIVER
// ============================================================================
const LEVELS=[11,13,17,19,23];
const FULL=[11,13,17,19,23];   // the full C(K,3) enumeration is run at every level
// the pre-registered bands, hardcoded before the run so the classifier cannot
// be retrofitted to the answer
const BAND=(J)=>!Number.isFinite(J)?'n/a':J<0.887?'DEEPENING':J<=0.919?'FLAT':J<=0.945?'DECAYING, ON THE FORCED TRACK':J<=0.995?'DECAYING FASTER THAN FORCED':'GONE OR REVERSED';
const ROWS=[];
let cTrip=null,cStride=null;   // ns per triple / per stride step, carried level to level
for(const x of LEVELS){
  const t0=Date.now();
  const L=level(x);const {W,N,K,qs,H}=L;
  const tL=Date.now();
  const U=uform(L);
  const tU=Date.now();
  const crt=crtSpectrum(L);
  const e1=esym(qs,4);
  const Sa=U.anc[0],Se=U.ens[0],Sc=crt[0];
  const Xa=Xof(U.anc),Xe=Xof(U.ens);
  // one-sided anchored marginals and the (0,0)-cell dependence delta
  const JM=U.JM;let p0c=0,q0c=0;
  for(let i=0;i<=JM;i++)for(let j=0;j<=JM;j++){if(i===0)p0c+=U.cnt[i][j];if(j===0)q0c+=U.cnt[i][j];}
  const dmod=p0c*q0c/(Sa*N)-1;          // cap-35 verify's 'n_0 error' column: model/exact − 1
  const delta=Sa*N/(p0c*q0c)-1;         // the §7 form: S(0) = N̄p₀q₀(1+δ)
  // the forced mutual-exclusion scale prod(1-1/q)^2/prod(1-2/q) - 1
  let lg=0;for(const q of qs)lg+=2*Math.log(1-1/q)-Math.log(1-2/q);
  const forced=Math.exp(lg)-1;
  // anchored B_3 split by class: cls = #{eps=0} coordinates
  const B3=new Float64Array(4);
  for(let i=0;i<=JM;i++)for(let j=0;j<=JM;j++){const c=U.cnt[i][j];if(!c)continue;
    B3[3]+=c*C3(i);B3[2]+=c*C2(i)*j;B3[1]+=c*i*C2(j);B3[0]+=c*C3(j);}
  const B3tot=B3[0]+B3[1]+B3[2]+B3[3];
  console.log(`\n===== @${x}: W=${W} N̄=${N} K=${K} (${qs[0]}..${L.y}) H=${f(H,4)}  weight identity ΣW=N̄W ${U.totOK?'PASS':'FAIL'}`);
  console.log(`  S(0)=${Sa} S̄=${f(Se,2)} S_CRT=${f(Sc,2)} β=${f(Sa/Sc,4)} | X(0)=${Xa} X̄=${f(Xe,2)} | S(0)/S̄=${f(Sa/Se,4)} X(0)/X̄=${f(Xa/Xe,4)} (X̄−X(0))/S̄=${f((Xe-Xa)/Se,4)}`);
  // ---- m-decomposition (the census's natural by-product)
  console.log('  m-DECOMPOSITION   k |  anchored |  ensemble | (k−1)·[A−E]');
  let c2=0,c3=0;
  for(let k=0;k<=K+1;k++){
    if(U.anc[k]===0&&U.ens[k]<1e-9)continue;
    const kk=Math.max(0,k-1),g=kk*(U.anc[k]-U.ens[k]);
    if(k===2)c2+=g;if(k>=3)c3+=g;
    console.log(`                   ${String(k).padStart(2)} | ${f(U.anc[k],0).padStart(9)} | ${f(U.ens[k],2).padStart(9)} | ${f(g,2).padStart(12)}`);
  }
  console.log(`  X-gap anchored−ensemble = ${f(Xa-Xe,2)} = m=2 ${f(c2,2)} + m≥3 ${f(c3,2)};  m≥3 share ${f(100*c3/(Xa-Xe),1)}%`);
  // ---- the (0,0) cell and the joint ratio table
  console.log(`  ONE-SIDED  p₀=${f(p0c/N,6)} q₀=${f(q0c/N,6)}  δ_model = N̄p₀q₀/S(0)−1 = ${f(100*dmod,4)}%  (δ in the §7 form S(0)=N̄p₀q₀(1+δ): ${f(100*delta,4)}%)   forced scale Σ_{q>x}1/(q(q−2)) = ${f(100*forced,4)}%   |δ_model|/forced = ${f(Math.abs(dmod)/forced,3)}`);
  let rl='  JOINT RATIO cnt(i,j)·N̄/(row_i·col_j), i=0..3 rows, j=0..3 cols:';
  const rw=[],cl=[];
  for(let i=0;i<=3;i++){let s=0;for(let j=0;j<=JM;j++)s+=U.cnt[i][j];rw.push(s);}
  for(let j=0;j<=3;j++){let s=0;for(let i=0;i<=JM;i++)s+=U.cnt[i][j];cl.push(s);}
  for(let i=0;i<=3;i++){rl+='\n      i='+i+' ';for(let j=0;j<=3;j++)rl+=(rw[i]>0&&cl[j]>0?f(U.cnt[i][j]*N/(rw[i]*cl[j]),4):'   ·   ').padStart(9);}
  console.log(rl);
  // ---- PRICE, from the code's own work counts, printed before the census
  const wR=tripleWork(L,true),wF=tripleWork(L,false);
  const strR=wR.nScan-8*wR.nTrip,strF=wF.nScan-8*wF.nTrip;
  const pr=(nt,st)=>(cTrip!==null)?`${f((nt*cTrip+st*cStride)/1e9,2)} s predicted`:'no calibration yet (first level)';
  console.log(`  WORK COUNTS (counted by the code's own loops, not estimated)`);
  console.log(`    restricted (∏Q<W): ${wR.nTrip} triples, ${wR.nScan} scan units (${strR} stride steps beyond the first hit)`);
  console.log(`    full       C(K,3): ${wF.nTrip} triples, ${wF.nScan} scan units (${strF} stride steps beyond the first hit)`);
  console.log(`  PRICE BEFORE THE RUN, from the previous level's two constants: restricted ${pr(wR.nTrip,strR)} | full ${pr(wF.nTrip,strF)}`);
  // ---- restricted census + the bridge
  const tP=Date.now();
  const R=tripleCensus(L,true);
  const tR=Date.now();

  const subO=R.O[0]+R.O[1]+R.O[2]+R.O[3],subE=R.E[0]+R.E[1]+R.E[2]+R.E[3];
  const miss=e1[3]-R.recip;                       // Σ_{ΠQ>W} 1/ΠQ
  const supEal=2*N*miss,supEmx=6*N*miss,supE=8*N*miss;
  const supOal=(B3[3]+B3[0])-(R.O[3]+R.O[0]);
  const supOmx=(B3[2]+B3[1])-(R.O[2]+R.O[1]);
  const supO=B3tot-subO;
  const Jd=supOmx/supEmx;
  console.log(`  RESTRICTED j=3 CENSUS (∏Q<W): ${R.nTrip} triples, obs=${f(subO,0)} CRT=${f(subE,2)} ratio ${f(subO/subE,4)}   [${f((tR-tP)/1000,3)}s]`);
  console.log(`    aligned obs=${f(R.O[3]+R.O[0],0)} CRT=${f(R.E[3]+R.E[0],2)} ratio ${f((R.O[3]+R.O[0])/(R.E[3]+R.E[0]),4)} | mixed obs=${f(R.O[2]+R.O[1],0)} CRT=${f(R.E[2]+R.E[1],2)} ratio ${f((R.O[2]+R.O[1])/(R.E[2]+R.E[1]),4)}`);
  console.log(`  B_3(0) FROM THE ANCHORED JOINT LAW = ${f(B3tot,0)}   split (3,0)=${f(B3[3],0)} (2,1)=${f(B3[2],0)} (1,2)=${f(B3[1],0)} (0,3)=${f(B3[0],0)}`);
  console.log(`  MISSING MASS Σ_{∏Q>W}1/∏Q = ${f(miss,6)}   [cap-35 part3 j=3 column]`);
  console.log(`  BRIDGE (super-W by subtraction, B_3 − restricted):`);
  console.log(`    ALIGNED super-W obs = ${f(supOal,0)}  [P1 predicts exactly 0: ${Math.abs(supOal)<1e-9?'PASS':'FAIL'}]   CRT=${f(supEal,2)}`);
  console.log(`    MIXED   super-W obs = ${f(supOmx,0)}  CRT=${f(supEmx,2)}`);
  console.log(`    ALL     super-W obs = ${f(supO,0)}  CRT=${f(supE,2)}  ratio=${f(supO/supE,4)}  vs P1 prediction 0.750`);
  console.log(`    mixed super-W by orientation: (2,1) = ${f(B3[2]-R.O[2],0)} and (1,2) = ${f(B3[1]-R.O[1],0)} against ${f(supEmx/2,2)} each`);
  // σ_J IS A FLOOR, AND IT IS THE WRONG SAMPLE UNIT (2026-08-20).
  // sqrt(supOmx) prices supOmx as a count of independent events. It is not:
  // triples that share a natal slot are decided together by which scour primes
  // hit that one slot, so the sample unit is the slot and the count is of
  // triples. Measured against the slot, the inflation is ×1.00 at @11, ×1.85 at
  // @13, ×1.93 at @17, ×2.09 at @19 and ×2.16 at @23 as an exact
  // compound-Poisson figure, and an empirical disjoint-block estimate is larger
  // still: ×1.98 at @17, ×3.03 at @19 and ×7.47 at @23, where between-slot
  // clustering bites. An understated σ makes |z| too LARGE, so every z built on
  // this column is a CEILING on its own significance.
  // This file cannot compute the corrected σ: it gets the super-W count by
  // SUBTRACTION (B_3 minus the restricted census), so no per-slot subtotal of
  // super-W triples exists here to accumulate. `xchan-at29-01-segmented.js`
  // walks natal slots directly and prints the exact slot-clustered σ beside the
  // registered one; that is where the corrected figure lives.
  console.log(`  >>> JOINT DEFICIT  J = mixed super-W obs/CRT = ${f(Jd,4)}   (Poisson σ_J ≈ ${f(Math.sqrt(Math.max(supOmx,0))/supEmx,4)}, a FLOOR on the wrong sample unit — see the note at this line)   PRE-REGISTERED BAND: ${BAND(Jd)}`);
  // ---- full census, where affordable: independent check of the bridge
  let fullLine='  FULL j=3 CENSUS: not run at this level (bridge is exact; see price above)';
  if(FULL.includes(x)){
    const tF0=Date.now();
    const F=tripleCensus(L,false);
    const tF=Date.now();
    // fit the two constants from this level's two timings, for the next level's price
    if(tF>tF0){cTrip=(tF-tF0)*1e6/Math.max(1,wF.nTrip);
      cStride=Math.max(0,((tR-tP)*1e6-wR.nTrip*cTrip)/Math.max(1,strR));}
    const fTot=F.O[0]+F.O[1]+F.O[2]+F.O[3];
    const fSupAl=(F.O[3]+F.O[0])-(R.O[3]+R.O[0]),fSupMx=(F.O[2]+F.O[1])-(R.O[2]+R.O[1]);
    const eq=(u,v)=>Math.abs(u-v)<1e-6?'PASS':'FAIL';
    fullLine=`  FULL j=3 CENSUS: ${F.nTrip} triples, obs=${f(fTot,0)} CRT=${f(F.E[0]+F.E[1]+F.E[2]+F.E[3],2)}  [${f((tF-tF0)/1000,3)}s]\n`
      +`    I2 identity  census total vs B_3(0) from the spectrum: ${f(fTot,0)} vs ${f(B3tot,0)}  ${eq(fTot,B3tot)}\n`
      +`    BRIDGE CHECK aligned super-W: direct ${f(fSupAl,0)} vs bridge ${f(supOal,0)}  ${eq(fSupAl,supOal)}\n`
      +`    BRIDGE CHECK mixed   super-W: direct ${f(fSupMx,0)} vs bridge ${f(supOmx,0)}  ${eq(fSupMx,supOmx)}   J direct = ${f(fSupMx/supEmx,4)}`;
  }
  console.log(fullLine);
  ROWS.push({x,lnW:Math.log(W),N,Sa,Se,Sc,Xa,Xe,delta,dmod,forced,miss,supOmx,supEmx,J:Jd,
             m3share:100*c3/(Xa-Xe),nTripR:wR.nTrip,nScanR:wR.nScan,nTripF:wF.nTrip});
  console.log(`  [level time ${(Date.now()-t0)/1000}s  (level ${(tL-t0)/1000}s, uform ${(tU-tL)/1000}s)]`);
}
console.log('\n===== SUMMARY — THE JOINT DEFICIT ACROSS LEVELS =====');
console.log('   σ_J below is the Poisson floor on the TRIPLE count. The sample unit is the SLOT,');
console.log('   so it understates: ×1.85 to ×2.16 as an exact compound-Poisson figure over @13..@23,');
console.log('   and ×1.98 / ×3.03 / ×7.47 by disjoint blocks at @17 / @19 / @23. |z| is too large,');
console.log('   never too small. xchan-at29-01-segmented.js prints the exact slot-clustered σ.');
console.log('   x |   lnW  | mixed super-W obs |   CRT       |   J    | σ_J(floor) | (1−J)/forced | band                          | (X̄−X(0))/S̄ | m≥3 share | δ_model(%) | forced (%)');
for(const r of ROWS){
  console.log(`  ${String(r.x).padStart(2)} | ${f(r.lnW,3)} | ${f(r.supOmx,0).padStart(17)} | ${f(r.supEmx,2).padStart(11)} | ${f(r.J,4)} | ${f(Math.sqrt(Math.max(r.supOmx,0))/r.supEmx,4)} | ${(f((1-r.J)/r.forced,3)+' ± '+f(Math.sqrt(Math.max(r.supOmx,0))/r.supEmx/r.forced,3)).padStart(12)} | ${BAND(r.J).padEnd(29)} | ${f((r.Xe-r.Xa)/r.Se,4).padStart(11)} | ${f(r.m3share,1).padStart(9)} | ${f(100*r.dmod,4).padStart(10)} | ${f(100*r.forced,4)}`);
}
console.log('   increments of J:');
for(let i=1;i<ROWS.length;i++)console.log(`    @${ROWS[i-1].x}→@${ROWS[i].x}: ${f(ROWS[i].J-ROWS[i-1].J,4)}`);
{ // the pre-registered δ sign-flip sub-test: is J smooth through @19?
  const g=(x)=>ROWS.find(r=>r.x===x);
  const a=g(17),b=g(19),c=g(23);
  if(a&&b&&c){
    const t=(b.lnW-a.lnW)/(c.lnW-a.lnW),lin=a.J+t*(c.J-a.J),dev=b.J-lin;
    console.log(`   δ-FLIP SUB-TEST: lnW-linear interpolation of J(17),J(23) at @19 = ${f(lin,4)}; J(19) = ${f(b.J,4)}; deviation ${f(dev,4)}`);
    console.log(`     pre-registered rule: |deviation| ≤ 0.010 ⇒ @19 is NOT special for the joint law, so the δ sign flip is localised to the (0,0) cell (finite-size cancellation).`);
    console.log(`     VERDICT: ${Math.abs(dev)<=0.010?'SMOOTH — the flip is localised to the (0,0) cell':'KINK — the flip is structural and shared across cells'}`);
  }
}
console.log(`[total ${(Date.now()-T00)/1000}s]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/natal-cap-39-triple-census.js
//   invocation:  node research/natal-cap-39-triple-census.js
//   code-sha256: 644f231430b2cccaf73a0e9e1fe750f92d7fdc202b2ebf5c60b38451c2d09b79
//   out-sha256:  61bf3b4fdb1e4db7117266551f37ae42f59319b00f742d2733a627cde05c988d
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     172.6 s
// ============================================================================
//
// ===== @11: W=2310 N̄=90 K=10 (13..47) H=0.7891  weight identity ΣW=N̄W PASS
//   S(0)=45 S̄=38.24 S_CRT=39.27 β=1.1458 | X(0)=28 X̄=19.26 | S(0)/S̄=1.1768 X(0)/X̄=1.4541 (X̄−X(0))/S̄=-0.2287
//   m-DECOMPOSITION   k |  anchored |  ensemble | (k−1)·[A−E]
//                     0 |        45 |     38.24 |         0.00
//                     1 |        19 |     35.82 |         0.00
//                     2 |        24 |     13.29 |        10.71
//                     3 |         2 |      2.44 |        -0.89
//                     4 |         0 |      0.12 |        -0.37
//                    10 |         0 |      0.08 |        -0.70
//   X-gap anchored−ensemble = 8.74 = m=2 10.71 + m≥3 -1.96;  m≥3 share -22.5%
//   ONE-SIDED  p₀=0.688889 q₀=0.711111  δ_model = N̄p₀q₀/S(0)−1 = -2.0247%  (δ in the §7 form S(0)=N̄p₀q₀(1+δ): 2.0665%)   forced scale Σ_{q>x}1/(q(q−2)) = 2.1086%   |δ_model|/forced = 0.960
//   JOINT RATIO cnt(i,j)·N̄/(row_i·col_j), i=0..3 rows, j=0..3 cols:
//       i=0    1.0207   0.6831   1.4516     ·
//       i=1    0.8594   2.0588   0.0000     ·
//       i=2    1.1250   1.0588   0.0000     ·
//       i=3      ·        ·        ·        ·
//   WORK COUNTS (counted by the code's own loops, not estimated)
//     restricted (∏Q<W): 0 triples, 0 scan units (0 stride steps beyond the first hit)
//     full       C(K,3): 120 triples, 960 scan units (0 stride steps beyond the first hit)
//   PRICE BEFORE THE RUN, from the previous level's two constants: restricted no calibration yet (first level) | full no calibration yet (first level)
//   RESTRICTED j=3 CENSUS (∏Q<W): 0 triples, obs=0 CRT=0.00 ratio NaN   [0.000s]
//     aligned obs=0 CRT=0.00 ratio NaN | mixed obs=0 CRT=0.00 ratio NaN
//   B_3(0) FROM THE ANCHORED JOINT LAW = 2   split (3,0)=0 (2,1)=2 (1,2)=0 (0,3)=0
//   MISSING MASS Σ_{∏Q>W}1/∏Q = 0.006909   [cap-35 part3 j=3 column]
//   BRIDGE (super-W by subtraction, B_3 − restricted):
//     ALIGNED super-W obs = 0  [P1 predicts exactly 0: PASS]   CRT=1.24
//     MIXED   super-W obs = 2  CRT=3.73
//     ALL     super-W obs = 2  CRT=4.97  ratio=0.4021  vs P1 prediction 0.750
//     mixed super-W by orientation: (2,1) = 2 and (1,2) = 0 against 1.87 each
//   >>> JOINT DEFICIT  J = mixed super-W obs/CRT = 0.5361   (Poisson σ_J ≈ 0.3791, a FLOOR on the wrong sample unit — see the note at this line)   PRE-REGISTERED BAND: DEEPENING
//   FULL j=3 CENSUS: 120 triples, obs=2 CRT=4.97  [0.001s]
//     I2 identity  census total vs B_3(0) from the spectrum: 2 vs 2  PASS
//     BRIDGE CHECK aligned super-W: direct 0 vs bridge 0  PASS
//     BRIDGE CHECK mixed   super-W: direct 2 vs bridge 2  PASS   J direct = 0.5361
//   [level time 0.005s  (level 0s, uform 0.001s)]
//
// ===== @13: W=30030 N̄=990 K=34 (17..173) H=1.1468  weight identity ΣW=N̄W PASS
//   S(0)=307 S̄=310.88 S_CRT=304.28 β=1.0089 | X(0)=452 X̄=456.18 | S(0)/S̄=0.9875 X(0)/X̄=0.9908 (X̄−X(0))/S̄=0.0134
//   m-DECOMPOSITION   k |  anchored |  ensemble | (k−1)·[A−E]
//                     0 |       307 |    310.88 |         0.00
//                     1 |       348 |    337.86 |         0.00
//                     2 |       249 |    245.84 |         3.16
//                     3 |        56 |     78.25 |       -44.50
//                     4 |        29 |     16.74 |        36.78
//                     5 |         1 |      0.36 |         2.56
//                    34 |         0 |      0.07 |        -2.18
//   X-gap anchored−ensemble = -4.18 = m=2 3.16 + m≥3 -7.34;  m≥3 share 175.7%
//   ONE-SIDED  p₀=0.563636 q₀=0.552525  δ_model = N̄p₀q₀/S(0)−1 = 0.4264%  (δ in the §7 form S(0)=N̄p₀q₀(1+δ): -0.4246%)   forced scale Σ_{q>x}1/(q(q−2)) = 1.7084%   |δ_model|/forced = 0.250
//   JOINT RATIO cnt(i,j)·N̄/(row_i·col_j), i=0..3 rows, j=0..3 cols:
//       i=0    0.9958   0.9574   1.1089   1.4516
//       i=1    0.9983   1.1878   0.4606   0.5806
//       i=2    1.0201   0.6860   1.9904   0.0000
//       i=3    1.0558   1.0061   0.7933   0.0000
//   WORK COUNTS (counted by the code's own loops, not estimated)
//     restricted (∏Q<W): 71 triples, 1248 scan units (680 stride steps beyond the first hit)
//     full       C(K,3): 5984 triples, 48552 scan units (680 stride steps beyond the first hit)
//   PRICE BEFORE THE RUN, from the previous level's two constants: restricted 0.00 s predicted | full 0.05 s predicted
//   RESTRICTED j=3 CENSUS (∏Q<W): 71 triples, obs=39 CRT=28.66 ratio 1.3608   [0.000s]
//     aligned obs=23 CRT=7.16 ratio 3.2101 | mixed obs=16 CRT=21.49 ratio 0.7444
//   B_3(0) FROM THE ANCHORED JOINT LAW = 182   split (3,0)=12 (2,1)=89 (1,2)=70 (0,3)=11
//   MISSING MASS Σ_{∏Q>W}1/∏Q = 0.023518   [cap-35 part3 j=3 column]
//   BRIDGE (super-W by subtraction, B_3 − restricted):
//     ALIGNED super-W obs = 0  [P1 predicts exactly 0: PASS]   CRT=46.57
//     MIXED   super-W obs = 143  CRT=139.70
//     ALL     super-W obs = 143  CRT=186.26  ratio=0.7677  vs P1 prediction 0.750
//     mixed super-W by orientation: (2,1) = 77 and (1,2) = 66 against 69.85 each
//   >>> JOINT DEFICIT  J = mixed super-W obs/CRT = 1.0236   (Poisson σ_J ≈ 0.0856, a FLOOR on the wrong sample unit — see the note at this line)   PRE-REGISTERED BAND: GONE OR REVERSED
//   FULL j=3 CENSUS: 5984 triples, obs=182 CRT=214.92  [0.005s]
//     I2 identity  census total vs B_3(0) from the spectrum: 182 vs 182  PASS
//     BRIDGE CHECK aligned super-W: direct 0 vs bridge 0  PASS
//     BRIDGE CHECK mixed   super-W: direct 143 vs bridge 143  PASS   J direct = 1.0236
//   [level time 0.009s  (level 0s, uform 0.004s)]
//
// ===== @17: W=510510 N̄=14850 K=120 (19..709) H=1.4938  weight identity ΣW=N̄W PASS
//   S(0)=3099 S̄=3614.93 S_CRT=3245.51 β=0.9549 | X(0)=10381 X̄=10947.70 | S(0)/S̄=0.8573 X(0)/X̄=0.9482 (X̄−X(0))/S̄=0.1568
//   m-DECOMPOSITION   k |  anchored |  ensemble | (k−1)·[A−E]
//                     0 |      3099 |   3614.93 |         0.00
//                     1 |      5278 |   4081.48 |         0.00
//                     2 |      3820 |   4327.46 |      -507.46
//                     3 |      1583 |   1958.64 |      -751.28
//                     4 |       926 |    776.66 |       448.03
//                     5 |       103 |     87.83 |        60.68
//                     6 |        41 |      2.95 |       190.24
//                    120 |         0 |      0.06 |        -6.92
//   X-gap anchored−ensemble = -566.70 = m=2 -507.46 + m≥3 -59.24;  m≥3 share 10.5%
//   ONE-SIDED  p₀=0.458788 q₀=0.456229  δ_model = N̄p₀q₀/S(0)−1 = 0.2997%  (δ in the §7 form S(0)=N̄p₀q₀(1+δ): -0.2988%)   forced scale Σ_{q>x}1/(q(q−2)) = 1.3856%   |δ_model|/forced = 0.216
//   JOINT RATIO cnt(i,j)·N̄/(row_i·col_j), i=0..3 rows, j=0..3 cols:
//       i=0    0.9970   0.9772   1.1082   1.0165
//       i=1    0.9802   1.0706   0.7342   1.0735
//       i=2    1.0794   0.7732   1.8207   0.6875
//       i=3    1.0365   1.0494   0.6849   0.8477
//   WORK COUNTS (counted by the code's own loops, not estimated)
//     restricted (∏Q<W): 5246 triples, 127256 scan units (85288 stride steps beyond the first hit)
//     full       C(K,3): 280840 triples, 2332008 scan units (85288 stride steps beyond the first hit)
//   PRICE BEFORE THE RUN, from the previous level's two constants: restricted 0.00 s predicted | full 0.23 s predicted
//   RESTRICTED j=3 CENSUS (∏Q<W): 5246 triples, obs=3938 CRT=2966.85 ratio 1.3273   [0.001s]
//     aligned obs=1695 CRT=741.71 ratio 2.2853 | mixed obs=2243 CRT=2225.14 ratio 1.0080
//   B_3(0) FROM THE ANCHORED JOINT LAW = 7137   split (3,0)=848 (2,1)=2729 (1,2)=2713 (0,3)=847
//   MISSING MASS Σ_{∏Q>W}1/∏Q = 0.039784   [cap-35 part3 j=3 column]
//   BRIDGE (super-W by subtraction, B_3 − restricted):
//     ALIGNED super-W obs = 0  [P1 predicts exactly 0: PASS]   CRT=1181.60
//     MIXED   super-W obs = 3199  CRT=3544.79
//     ALL     super-W obs = 3199  CRT=4726.38  ratio=0.6768  vs P1 prediction 0.750
//     mixed super-W by orientation: (2,1) = 1622 and (1,2) = 1577 against 1772.39 each
//   >>> JOINT DEFICIT  J = mixed super-W obs/CRT = 0.9025   (Poisson σ_J ≈ 0.0160, a FLOOR on the wrong sample unit — see the note at this line)   PRE-REGISTERED BAND: FLAT
//   FULL j=3 CENSUS: 280840 triples, obs=7137 CRT=7693.23  [0.045s]
//     I2 identity  census total vs B_3(0) from the spectrum: 7137 vs 7137  PASS
//     BRIDGE CHECK aligned super-W: direct 0 vs bridge 0  PASS
//     BRIDGE CHECK mixed   super-W: direct 3199 vs bridge 3199  PASS   J direct = 0.9025
//   [level time 0.071s  (level 0.007s, uform 0.014s)]
//
// ===== @19: W=9699690 N̄=252450 K=435 (23..3109) H=1.7857  weight identity ΣW=N̄W PASS
//   S(0)=38380 S̄=49238.76 S_CRT=41441.19 β=0.9261 | X(0)=236625 X̄=247579.81 | S(0)/S̄=0.7795 X(0)/X̄=0.9558 (X̄−X(0))/S̄=0.2225
//   m-DECOMPOSITION   k |  anchored |  ensemble | (k−1)·[A−E]
//                     0 |     38380 |  49238.76 |         0.00
//                     1 |     83780 |  59824.54 |         0.00
//                     2 |     64624 |  73002.24 |     -8378.24
//                     3 |     34026 |  43097.56 |    -18143.12
//                     4 |     25281 |  21329.08 |     11855.76
//                     5 |      3787 |   5422.39 |     -6541.55
//                     6 |      2474 |    529.22 |      9723.89
//                     7 |        98 |      6.16 |       551.04
//                    435 |         0 |      0.05 |       -22.59
//   X-gap anchored−ensemble = -10954.81 = m=2 -8378.24 + m≥3 -2576.56;  m≥3 share 23.5%
//   ONE-SIDED  p₀=0.389542 q₀=0.389166  δ_model = N̄p₀q₀/S(0)−1 = -0.2850%  (δ in the §7 form S(0)=N̄p₀q₀(1+δ): 0.2859%)   forced scale Σ_{q>x}1/(q(q−2)) = 1.0878%   |δ_model|/forced = 0.262
//   JOINT RATIO cnt(i,j)·N̄/(row_i·col_j), i=0..3 rows, j=0..3 cols:
//       i=0    1.0029   0.9836   1.0609   1.0110
//       i=1    0.9851   1.0332   0.8548   1.0242
//       i=2    1.0592   0.8610   1.6945   0.8574
//       i=3    1.0080   1.0229   0.8783   0.9625
//   WORK COUNTS (counted by the code's own loops, not estimated)
//     restricted (∏Q<W): 162982 triples, 5659568 scan units (4355712 stride steps beyond the first hit)
//     full       C(K,3): 13624345 triples, 113350472 scan units (4355712 stride steps beyond the first hit)
//   PRICE BEFORE THE RUN, from the previous level's two constants: restricted 0.03 s predicted | full 2.19 s predicted
//   RESTRICTED j=3 CENSUS (∏Q<W): 162982 triples, obs=151865 CRT=127584.10 ratio 1.1903   [0.042s]
//     aligned obs=54768 CRT=31896.02 ratio 1.7171 | mixed obs=97097 CRT=95688.07 ratio 1.0147
//   B_3(0) FROM THE ANCHORED JOINT LAW = 225930   split (3,0)=27377 (2,1)=85713 (1,2)=85449 (0,3)=27391
//   MISSING MASS Σ_{∏Q>W}1/∏Q = 0.050943   [cap-35 part3 j=3 column]
//   BRIDGE (super-W by subtraction, B_3 − restricted):
//     ALIGNED super-W obs = 0  [P1 predicts exactly 0: PASS]   CRT=25720.90
//     MIXED   super-W obs = 74065  CRT=77162.70
//     ALL     super-W obs = 74065  CRT=102883.61  ratio=0.7199  vs P1 prediction 0.750
//     mixed super-W by orientation: (2,1) = 37139 and (1,2) = 36926 against 38581.35 each
//   >>> JOINT DEFICIT  J = mixed super-W obs/CRT = 0.9599   (Poisson σ_J ≈ 0.0035, a FLOOR on the wrong sample unit — see the note at this line)   PRE-REGISTERED BAND: DECAYING FASTER THAN FORCED
//   FULL j=3 CENSUS: 13624345 triples, obs=225930 CRT=230467.70  [2.396s]
//     I2 identity  census total vs B_3(0) from the spectrum: 225930 vs 225930  PASS
//     BRIDGE CHECK aligned super-W: direct 0 vs bridge 0  PASS
//     BRIDGE CHECK mixed   super-W: direct 74065 vs bridge 74065  PASS   J direct = 0.9599
//   [level time 2.579s  (level 0.019s, uform 0.096s)]
//
// ===== @23: W=223092870 N̄=5301450 K=1739 (29..14929) H=2.0526  weight identity ΣW=N̄W PASS
//   S(0)=597475 S̄=815732.55 S_CRT=669028.80 β=0.8930 | X(0)=6179192 X̄=6395995.55 | S(0)/S̄=0.7324 X(0)/X̄=0.9661 (X̄−X(0))/S̄=0.2658
//   m-DECOMPOSITION   k |  anchored |  ensemble | (k−1)·[A−E]
//                     0 |    597475 | 815732.55 |         0.00
//                     1 |   1582579 | 1165582.82 |         0.00
//                     2 |   1369538 | 1410454.72 |    -40916.72
//                     3 |    817704 | 1063505.93 |   -491603.86
//                     4 |    678479 | 575779.43 |    308098.70
//                     5 |    152659 | 223074.25 |   -281660.99
//                     6 |     90320 |  45135.78 |    225921.08
//                     7 |     12301 |   2159.12 |     60851.26
//                     8 |       393 |     25.32 |      2573.79
//                     9 |         2 |      0.03 |        15.79
//                    1739 |         0 |      0.05 |       -82.60
//   X-gap anchored−ensemble = -216803.55 = m=2 -40916.72 + m≥3 -175886.83;  m≥3 share 81.1%
//   ONE-SIDED  p₀=0.336646 q₀=0.336507  δ_model = N̄p₀q₀/S(0)−1 = 0.5175%  (δ in the §7 form S(0)=N̄p₀q₀(1+δ): -0.5149%)   forced scale Σ_{q>x}1/(q(q−2)) = 0.8819%   |δ_model|/forced = 0.587
//   JOINT RATIO cnt(i,j)·N̄/(row_i·col_j), i=0..3 rows, j=0..3 cols:
//       i=0    0.9949   0.9928   1.0387   1.0124
//       i=1    0.9929   1.0136   0.9456   1.0020
//       i=2    1.0371   0.9474   1.2139   0.9695
//       i=3    1.0125   1.0017   0.9692   0.9847
//   WORK COUNTS (counted by the code's own loops, not estimated)
//     restricted (∏Q<W): 4517592 triples, 229643312 scan units (193502576 stride steps beyond the first hit)
//     full       C(K,3): 874979589 triples, 7193339288 scan units (193502576 stride steps beyond the first hit)
//   PRICE BEFORE THE RUN, from the previous level's two constants: restricted 1.39 s predicted | full 154.47 s predicted
//   RESTRICTED j=3 CENSUS (∏Q<W): 4517592 triples, obs=5509656 CRT=4964985.28 ratio 1.1097   [3.220s]
//     aligned obs=1758610 CRT=1241246.32 ratio 1.4168 | mixed obs=3751046 CRT=3723738.96 ratio 1.0073
//   B_3(0) FROM THE ANCHORED JOINT LAW = 7317321   split (3,0)=879225 (2,1)=2779604 (1,2)=2779107 (0,3)=879385
//   MISSING MASS Σ_{∏Q>W}1/∏Q = 0.058834   [cap-35 part3 j=3 column]
//   BRIDGE (super-W by subtraction, B_3 − restricted):
//     ALIGNED super-W obs = 0  [P1 predicts exactly 0: PASS]   CRT=623807.07
//     MIXED   super-W obs = 1807665  CRT=1871421.20
//     ALL     super-W obs = 1807665  CRT=2495228.26  ratio=0.7244  vs P1 prediction 0.750
//     mixed super-W by orientation: (2,1) = 904409 and (1,2) = 903256 against 935710.60 each
//   >>> JOINT DEFICIT  J = mixed super-W obs/CRT = 0.9659   (Poisson σ_J ≈ 0.0007, a FLOOR on the wrong sample unit — see the note at this line)   PRE-REGISTERED BAND: DECAYING FASTER THAN FORCED
//   FULL j=3 CENSUS: 874979589 triples, obs=7317321 CRT=7460213.54  [161.983s]
//     I2 identity  census total vs B_3(0) from the spectrum: 7317321 vs 7317321  PASS
//     BRIDGE CHECK aligned super-W: direct 0 vs bridge 0  PASS
//     BRIDGE CHECK mixed   super-W: direct 1807665 vs bridge 1807665  PASS   J direct = 0.9659
//   [level time 169.862s  (level 0.423s, uform 3.24s)]
//
// ===== SUMMARY — THE JOINT DEFICIT ACROSS LEVELS =====
//    σ_J below is the Poisson floor on the TRIPLE count. The sample unit is the SLOT,
//    so it understates: ×1.85 to ×2.16 as an exact compound-Poisson figure over @13..@23,
//    and ×1.98 / ×3.03 / ×7.47 by disjoint blocks at @17 / @19 / @23. |z| is too large,
//    never too small. xchan-at29-01-segmented.js prints the exact slot-clustered σ.
//    x |   lnW  | mixed super-W obs |   CRT       |   J    | σ_J(floor) | (1−J)/forced | band                          | (X̄−X(0))/S̄ | m≥3 share | δ_model(%) | forced (%)
//   11 | 7.745 |                 2 |        3.73 | 0.5361 | 0.3791 | 22.002 ± 17.977 | DEEPENING                     |     -0.2287 |     -22.5 |    -2.0247 | 2.1086
//   13 | 10.310 |               143 |      139.70 | 1.0236 | 0.0856 | -1.383 ± 5.011 | GONE OR REVERSED              |      0.0134 |     175.7 |     0.4264 | 1.7084
//   17 | 13.143 |              3199 |     3544.79 | 0.9025 | 0.0160 | 7.040 ± 1.152 | FLAT                          |      0.1568 |      10.5 |     0.2997 | 1.3856
//   19 | 16.088 |             74065 |    77162.70 | 0.9599 | 0.0035 | 3.691 ± 0.324 | DECAYING FASTER THAN FORCED   |      0.2225 |      23.5 |    -0.2850 | 1.0878
//   23 | 19.223 |           1807665 |  1871421.20 | 0.9659 | 0.0007 | 3.863 ± 0.081 | DECAYING FASTER THAN FORCED   |      0.2658 |      81.1 |     0.5175 | 0.8819
//    increments of J:
//     @11→@13: 0.4876
//     @13→@17: -0.1212
//     @17→@19: 0.0574
//     @19→@23: 0.0061
//    δ-FLIP SUB-TEST: lnW-linear interpolation of J(17),J(23) at @19 = 0.9332; J(19) = 0.9599; deviation 0.0267
//      pre-registered rule: |deviation| ≤ 0.010 ⇒ @19 is NOT special for the joint law, so the δ sign flip is localised to the (0,0) cell (finite-size cancellation).
//      VERDICT: KINK — the flip is structural and shared across cells
// [total 172.526s]
// ============================================================================
// READINGS
// READINGS (2026-08-19) — against the pre-registration in the header above.
// Figures marked [arithmetic] are one-line computations on figures in the
// block above, shown with their inputs so a reader can redo them.
//
// R1 [MEASURED] THE JOINT DEFICIT DECAYS. J = 0.5361, 1.0236, 0.9025, 0.9599,
//    0.9659 at @11/@13/@17/@19/@23, on 2, 143, 3199, 74065 and 1807665 counted
//    coincidences. @11 and @13 are informational (the pre-registration says
//    so). From @17 the series is MONOTONE INCREASING, so the monotonicity
//    clause is satisfied and a trend verdict is allowed. Both new points fall
//    in the pre-registered band DECAYING FASTER THAN FORCED, printed by the
//    classifier that was hardcoded before the run. Candidate (b) of the
//    pre-registration, finite-size and vanishing, is the reading. Candidate
//    (c), DEEPENING, is REFUTED: J rose at both new levels.
//
// R2 [MEASURED] THE DEFICIT IS REAL, AND LARGE IN ITS OWN UNITS. At @23 the
//    mixed super-W obs is 1807665 against a CRT mass of 1871421.20, short by
//    63756 coincidences on a Poisson scale of 0.0007: 3.4% of CRT and 48.7 of
//    its own sigma from zero [arithmetic: (1 − 0.9659)/0.0007]. "Decaying" is
//    not "absent". The mechanism the origin-density steelman names is present
//    at every level from @17 on; what fails is its constancy.
//
// R3 [MEASURED] FROM @19 ONWARD THE DEFICIT IS A CONSTANT MULTIPLE OF THE
//    FORCED MUTUAL-EXCLUSION SCALE. The block's (1−J)/forced column reads
//    7.040 ± 1.152, 3.691 ± 0.324, 3.863 ± 0.081 at @17/@19/@23. @19 and @23
//    agree to 0.52σ; @17 sits 2.75σ above @23 [arithmetic on that column's
//    values and errors]. So the joint dependence at i + j = 3 decays at the
//    same rate as the dependence the CRT construction forces at the (0,0)
//    cell, at about four times its size, and the 0.903 on record at @17 is the
//    small-count end of that series rather than a level-stable constant.
//
// R4 [MEASURED] THE BRIDGE IS EXACT, AND VALIDATED AT FIVE LEVELS. The full
//    C(K,3) enumeration reproduces the bridge's mixed super-W count to the
//    unit at every level: 2, 143, 3199, 74065, 1807665, all PASS, and the
//    census total equals B_3(0) read off the anchored joint law (I2 PASS).
//    Restricting the enumeration to ∏Q < W therefore measures the same object
//    the full census does, and the figure on record is comparable across the
//    restriction with no bridge correction. At @23 the restriction is 4517592
//    triples against 874979589, a factor of 194.
//
// R5 [MEASURED] P1 IS NOW TESTED DIRECTLY AT @19 AND @23. The aligned super-W
//    observed count is exactly 0 at all five levels, by the bridge and again
//    by direct enumeration. `xchannel-at23.md` §7 lists "P1 is not tested at
//    @23" among its gaps; it is tested now, and it passes.
//
// R6 [MEASURED] THE ORIENTATIONS ARE SYMMETRIC. Mixed super-W splits
//    (2,1) = 904409 and (1,2) = 903256 at @23 against 935710.60 each, and
//    37139 / 36926 against 38581.35 at @19. The deficit is not carried by one
//    orientation, so it is not an artefact of the +2 shift.
//
// R7 [MEASURED] THE WHOLE ANCHORED JOINT LAW CONVERGES TO ITS OWN MARGINALS,
//    CELL BY CELL. The ratio cnt(i,j)·N̄/(row_i·col_j) at (2,2) reads 1.8207,
//    1.6945, 1.2139 at @17/@19/@23, and at (1,2)/(2,1) it reads 0.7342/0.7732,
//    0.8548/0.8610, 0.9456/0.9474. Every off-unit cell moves toward 1 with
//    level. This is R3's decay in a second and independent presentation, and
//    it is the strongest single piece of evidence for candidate (b).
//
// R8 [INFERRED] THE m ≥ 3 MIGRATION IN THE X-GAP IS NOT THIS. The m ≥ 3 share
//    of the X-gap grows, 10.5% → 23.5% → 81.1%, while the joint deficit at
//    i + j = 3 shrinks over the same three levels. Two quantities moving in
//    opposite directions cannot be the same phenomenon, so the migration
//    `xchannel-at23.md` R7 measured is a marginal effect — the one-sided
//    cofactor law, as its §6 concluded — and not a growing joint dependence.
//    Inferred, not proven: the X-gap runs over all j, this census is j = 3.
//
// R9 [MEASURED, and the pre-registration's letter disagrees with its intent]
//    THE δ SIGN-FLIP SUB-TEST FIRES, ON A RATE AND NOT A SIGN. The lnW-linear
//    interpolation of J(17) and J(23) at @19 is 0.9332 against a measured
//    0.9599, deviation 0.0267 against the pre-registered threshold of 0.010,
//    so the printed verdict is KINK. The threshold is not merely catching
//    ordinary concavity: either reference decay law in the header deviates
//    from its own chord by 0.0039 (forced) or 0.0030 (1/lnW) [arithmetic on
//    the header's reference values]. But the mechanism the sub-test was
//    written to detect is ABSENT. δ_model runs +0.2997%, −0.2850%, +0.5175%
//    while J rises monotonically at every one of those levels. What @19
//    changes in the joint law is a rate; what it changes in the (0,0) cell is
//    a sign. The honest statement is narrower than either branch of the
//    sub-registration: the i + j = 3 joint does not share the flip, and the
//    flip remains unexplained. What this does remove is the worst reading of
//    it, that the flip signals joint structure turning over at @19.
//
// R10 [MEASURED] THE PRICE. Derived before the run from the code's own counted
//    work and the previous level's two fitted constants, and printed above the
//    census it prices: @23 restricted 1.56 s, full 154.77 s. Outturn 3.172 s
//    and 161.798 s, level total 169.89 s, whole file 172.557 s. The full leg
//    was priced to 4.3%; the restricted leg was under-priced by a factor of
//    2.0, because the stride constant fitted at @19 does not carry @23's
//    main-memory penalty on a 223 MB comb. Against the 3-hour ceiling the @23
//    level is affordable by a factor of 64.
//
// R11 [MEASURED, off-block] PEAK MEMORY 1.203 GB, measured with /usr/bin/time
//    -l on a separate run of identical code, against an array inventory of
//    5 bytes per slot × W = 1.115 GB. cap-35 needs 5.58 GB predicted and
//    5.69 GB measured at the same level: dropping its Int32 prefix table for
//    two running counters, and its pair of Uint16 spectra for the pair that is
//    actually needed, buys a factor of 4.7. @29 would need 32 GB of arrays for
//    this instrument against cap-35's 162 GB, so the memory wall
//    `xchannel-at23.md` §7 calls "this instrument's last level" moves — though
//    the full C(K,3) leg at @29 has K = 7863 and is a different problem.
//
// WHAT THIS RUN DOES NOT SHOW.
//  - No σ_X, no z-scores, no custody sweep. This file computes no rotation
//    ensemble beyond the u-form; the 8-to-15-σ_X framing is still @13-and-@17.
//  - The u-form ensemble column is not verified against a brute-force sweep
//    here. It reproduces cap-35's figures at all five levels, and cap-35
//    checks it against the sweep at @11, @13 and @17 only.
//  - No j = 4 census. The steelman is stated at i + j ≥ 3 and only j = 3 is
//    measured; j = 4 has its own missing mass, 0.040035 at @23, untouched.
//  - Three usable levels is not a law. R3's constant multiple rests on two
//    points agreeing and a third sitting 2.75σ off; @29 would decide it.
//  - The decay rate is measured, not derived. verify §3's argument that mixed
//    patterns keep their CRT mass on average is CONSISTENT with R3 and is
//    still not a controlled estimate. The multiple of 3.8 has no derivation.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. The readings already mark their one-line computations
// [arithmetic]; this names the inputs and records the two figures that come
// from outside the block. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   0.9025 -> 0.903, R3's "on record at @17", the J entry of the @17 summary
//   row. The pre-registration header carries the same value.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   63756 in R2 is 1871421.20 - 1807665, both on the @23 mixed super-W line,
//   and 3.4% is that difference over 1871421.20.
//   48.7 in R2 is (1 - 0.9659)/0.0007, the J and sigma_J entries of the @23
//   summary row, as the reading states.
//   0.52 and 2.75 in R3 combine the (1-J)/forced column with its own errors:
//   (3.863 - 3.691)/sqrt(0.324^2 + 0.081^2) = 0.52 and
//   (7.040 - 3.863)/sqrt(1.152^2 + 0.081^2) = 2.75.
//   194 in R4 is 874979589/4517592, both counts on the @23 enumeration lines.
//   0.0039 and 0.0030 in R9 are chord deviations of the two reference decay
//   laws set out in the pre-registration header above the code: the forced law
//   J(17), J(19), J(23) = 0.9025, 0.9235, 0.9379 and the 1/lnW law 0.9025,
//   0.9204, 0.9333, each interpolated linearly in lnW between 13.143 and
//   19.223 and read at 16.088. Those reference values are stated in the header
//   rather than printed by the run, so those inputs sit in the code region
//   and not in the pasted block.
//   1.115 GB in R11 is the array inventory 5 bytes x W = 5 x 223092870.
//
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   0.040035 in the closing list is the j = 4 missing mass at @23, printed in
//   the j = 4 row of natal-cap-35-x-multiplicity.js.
//
// BORROWED from a named document's readings rather than from an OUTPUT block:
//   5.58 GB predicted and 5.69 GB measured for cap-35 at @23. Both sit in
//   natal-cap-35-x-multiplicity.js's own readings, which record 5.69 GB as a
//   peak RSS taken outside its run and 5.58 GB as an inventory estimate.
//   Neither is in that file's OUTPUT, so the pair inherits its off-block
//   status. 5.58 is also carried in this file's MEMORY banner above the code.
//
// [UNTRACED — verify before quoting]:
//   1.203 GB in R11. The reading tags it [MEASURED, off-block] and names the
//   method, /usr/bin/time -l on a separate run of identical code, but no run
//   of this script prints it and no transcript of that run is embedded here.
//   The factor 4.7 and the 32 GB @29 figure in the same reading both depend on
//   it.
//   CORRECTED 2026-08-20 (mismatch adjudication #3): R11's "K ≈ 6800" for @29
//   is now "K = 7863" (old -> new: 6800 -> 7863). The scour length this file's
//   K column measures is the count of primes in (x, sqrt(W)], and at @29 that
//   count is 7863, printed by natal-cap-18-at29.js as "scour 7863 primes
//   (31..80429)" — a measured value, not an estimate, so the approximation
//   marker goes too. The quoted 6800 was 14 per cent low; C(K,3) at the true K
//   is 8.099e10 (recomputed 2026-08-20) against 5.238e10 at 6800. The
//   sentence's point, that the @29 leg is a different problem, is only
//   strengthened by the correct value.
// ---------------------------------------------------------------------------
