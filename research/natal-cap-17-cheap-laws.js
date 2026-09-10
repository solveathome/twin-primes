// ============================================================================
// NATAL-CAP CHEAP-LAWS PACK (TODO items 10+11; 2026-08-14)
// ============================================================================
// FORWARD POINTER (2026-08-15, night-run reconciliation). PART A's headline —
// "each congruence layer multiplies the extremal-window excess by a CONSTANT
// ≈ 1.81, l-independent" (readings 3 and 5) — is SUPERSEDED. The history:
//   1. Here: a constant ×1.81 per level, R² = 0.99941 over six levels.
//   2. natal-cap-18-at29.js reading 5: the @29 step is 1.562, the smallest of
//      seven, so the multiplier DRIFTS slowly downward. Not a constant.
//   3. natal-cap-25-excess-law.js: DERIVED. E = 0.97·σ(ℓ)·√(2ln(W/ℓ)), the
//      extremal law of a hyperuniform field. It reproduces the whole drift
//      parameter-free, including the @29 anomaly, and predicted E_med(31) a
//      priori at 61.22 against the later measured 60.90 (natal-cap-33, RUN 1).
// There was never a constant to explain; the ×1.8 was √R times truncation
// plus a per-level twist. The one number still unpinned is c ≈ 1.074 in the
// prefactor (TODO item 10). Part A's l-independence finding stands, and is
// explained by the derived law. Part B (zone share to p = 100,003 with 1/ln p
// decay) stands and was extended exactly by natal-cap-20-third-order.js.
// The fit-hygiene lesson logged in Part B ("don't read intercepts off this
// drift") paid off twice since, at @29 and @31.
// ============================================================================
// Two independent cheap measurements, one file, clearly sectioned:
//
//   PART A — THE WINDOW-EXCESS LAW, pushed two levels deeper (@19, @23).
//     natal-cap-01 found: E_x(l) = M_x(l) − N·l/W (max sliding-window count
//     minus mean) is ~constant in l within a level, with medians
//     1.19 / 2.06 / 4.05 / 7.18 at x = 7/11/13/17 — roughly ×2 per added
//     prime, suggesting E ~ c·2^k (k = #{7 ≤ p ≤ x}). Four points is a lead,
//     not a law. Here: exact M(l) at @19 (full scour-length grid) and @23
//     (uniformly subsampled grid + powers of 2), via a streaming two-pointer
//     sweep over the sorted natal position list (O(N) per l — no O(W) prefix
//     array needed). Then fit E_med vs 2^k, vs N^α, vs k, k², ∏p/(p−2).
//
//   PART B — THE ZONE TWIN-SHARE DEEP RUN (pre-campaign thread,
//     01-zone-twin-share.js). Definition kept EXACTLY as in that script:
//     level p_n, window = p_{n+1}²; sieve [1, window) by ALL primes ≤ p_n
//     (marking each p itself too); count r in [3, window−2) with r and r+2
//     both unhit; compare to the NAIVE uniform share
//     expect = window · (1/2)·∏_{2<p≤p_n}(p−2)/p (no HL correction).
//     Ratio drifted 1.0 → 0.899 by p_n = 9973; predicted limit e^{2γ}/4 =
//     0.7931. Extended here by segmented odd-only sieve to p_n = 20011,
//     50021, 100003 (window ≈ 1.0e10), with the p_n = 2999/5003/9973 rows
//     recomputed as cross-checks against the 2026-08-13 output.
//
// BRIEF CORRECTIONS (house rule: corrections stay visible): the task brief
// put W@19 at 9.7e9 and N@19 at ~33M. Actually 19# = 9,699,690 (~9.7e6) and
// |Natal@19| = 2·∏_{7≤p≤19}(p−2) = 2·5·9·11·15·17 = 252,450. Both are small;
// the "hard" level is @23 (W = 223,092,870, N = 5,301,450), included below.
// ============================================================================

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const PR = primesUpTo(110000);
function lsqSlope(xs,ys){const n=xs.length;let sx=0,sy=0,sxx=0,sxy=0;for(let i=0;i<n;i++){sx+=xs[i];sy+=ys[i];sxx+=xs[i]*xs[i];sxy+=xs[i]*ys[i]}const b=(n*sxy-sx*sy)/(n*sxx-sx*sx);return[b,(sy-b*sx)/n]}
const med = a=>{const s=[...a].sort((u,v)=>u-v);return s[Math.floor(s.length/2)]}; // cap-01 convention (upper-middle on even n)
const T00 = Date.now();

// ============================================================================
// PART A — window-excess law at @7..@23 (streaming positions, two pointers)
// ============================================================================

function natalPositions(x){
  const bp = PR.filter(p=>p<=x);
  let W=1; for(const p of bp) W*=p;
  const ind = new Uint8Array(W);
  for(let r=11;r<W;r+=30) ind[r]=1;
  for(let r=17;r<W;r+=30) ind[r]=1;
  for(const p of bp){ if(p<7) continue;
    for(let r=0;r<W;r+=p) ind[r]=0;
    for(let r=p-2;r<W;r+=p) ind[r]=0;
  }
  let N=0; for(let r=0;r<W;r++) if(ind[r]) N++;
  const pos = new Int32Array(2*N); let k=0;          // doubled for cyclic windows
  for(let r=0;r<W;r++) if(ind[r]) pos[k++]=r;
  for(let i=0;i<N;i++) pos[N+i]=pos[i]+W;            // @23: max value 446,185,739 < 2^31 ✓
  return {W,N,pos};
}

// Exact cyclic window extremes from the sorted position list, O(N) per l.
// Max windows can be shifted right so the left edge sits ON a point (no loss:
// the first point in any max window starts an equal-or-better window).
// Min windows sit at s = pos[i]+1 (count is non-decreasing between departures).
function windowExtremes(pos,N,ell){
  let mx=0,j=0;
  for(let i=0;i<N;i++){ const lim=pos[i]+ell; while(pos[j]<lim)j++; const c=j-i; if(c>mx)mx=c; }
  let mn=Infinity; j=0;
  for(let i=0;i<N;i++){ const lim=pos[i]+1+ell; while(pos[j]<lim)j++; const c=j-i-1; if(c<mn)mn=c; }
  return [mx,mn];
}

const CHECKS = { // spot values from natal-cap-01's exact O(W) prefix method
  13:[[1767,63],[174,9]], 17:[[26869,791],[721,28]]
};

const levelsA=[];
for(const x of [7,11,13,17,19,23]){
  const t0=Date.now();
  const {W,N,pos}=natalPositions(x);
  const sqrtW=Math.sqrt(W);
  const scour=PR.filter(q=>q>x&&q<=sqrtW);
  // grid: full dedup'd l=ceil(W/q) grid (matches cap-01) unless the scour is
  // huge (@23: 1727 primes) — then a uniform subsample of ~140 q's (quantiles,
  // hence the median, are preserved by uniform subsampling).
  const stride=scour.length>600?Math.ceil(scour.length/140):1;
  const qs=stride===1?scour:scour.filter((_,i)=>i%stride===0||i<3||i>=scour.length-3);
  const ells=[...new Set(qs.map(q=>Math.ceil(W/q)))].sort((a,b)=>a-b);
  const rows=ells.map(ell=>{const[M,m]=windowExtremes(pos,N,ell);const mean=N*ell/W;return{ell,mean,M,m,E:M-mean,D:mean-m}});
  // powers of two: in-level l-independence probe across decades (NOT in median)
  const p2rows=[];
  for(let L=2;L<=ells[ells.length-1];L*=2){ if(L<ells[0])continue;
    const[M,m]=windowExtremes(pos,N,L);const mean=N*L/W;p2rows.push({ell:L,mean,E:M-mean});
  }
  const Emed=med(rows.map(r=>r.E));
  const [slope]=lsqSlope(rows.map(r=>Math.log(r.mean)),rows.map(r=>Math.log(Math.max(r.E,1e-9))));
  const Dmax=Math.max(...rows.map(r=>r.D/Math.sqrt(r.mean)));

  console.log(`\n${'='.repeat(96)}`);
  console.log(`@${x}: W=${W}  |N|=${N}  scour ${scour[0]}..${scour[scour.length-1]} (${scour.length} primes, √W=${sqrtW.toFixed(1)})  grid ${rows.length} lengths${stride>1?` (every ${stride}th q)`:''}`);
  console.log('        l |      mean |    M |    m |     E=M−mean');
  const show=rows.length<=8?rows:rows.filter((_,i)=>i%Math.ceil(rows.length/10)===0||i===rows.length-1);
  for(const r of show) console.log(` ${String(r.ell).padStart(8)} | ${r.mean.toFixed(1).padStart(9)} | ${String(r.M).padStart(4)} | ${String(r.m).padStart(4)} | ${r.E.toFixed(2).padStart(8)}`);
  console.log(` E min/med/max = ${Math.min(...rows.map(r=>r.E)).toFixed(2)} / ${Emed.toFixed(2)} / ${Math.max(...rows.map(r=>r.E)).toFixed(2)}   log-log slope E vs mean = ${slope.toFixed(3)}  (0.5 ⇒ √mean; ~0 ⇒ l-independent)`);
  console.log(` deficit side: max (mean−m)/√mean = ${Dmax.toFixed(2)}`);
  if(p2rows.length)console.log(` powers of 2:  ${p2rows.map(r=>`E(2^${Math.log2(r.ell)})=${r.E.toFixed(1)}`).join('  ')}`);
  if(CHECKS[x]) for(const[ell,Mref]of CHECKS[x]){
    const r=rows.find(r=>r.ell===ell)||(()=>{const[M]=windowExtremes(pos,N,ell);return{M}})();
    console.log(` CHECK vs natal-cap-01: M(${ell}) = ${r.M} (expected ${Mref}) ${r.M===Mref?'✓':'✗ MISMATCH'}`);
    if(r.M!==Mref) process.exit(1);
  }
  console.log(` [${((Date.now()-t0)/1000).toFixed(1)}s]`);
  levelsA.push({x,k:PR.filter(p=>p>=7&&p<=x).length,N,W,Emed,slope});
}

// ---- cross-level fit: is E_med ~ c·2^k? vs N^α? vs anything cheaper? ----
{
  console.log(`\n${'='.repeat(96)}\nPART A CROSS-LEVEL FIT — E_med vs level\n${'='.repeat(96)}`);
  let prodF=1; // ∏_{7≤p≤x} p/(p−2), the density-inflation comparator
  console.log('   x | k |        N |  E_med | ratio to prev | E/2^k |  E/k  | E/k²  | E/∏p/(p−2)');
  let prev=null;
  for(const L of levelsA){
    const p=PR.filter(q=>q>=7&&q<=L.x); prodF=p.reduce((a,q)=>a*q/(q-2),1);
    console.log(` ${String(L.x).padStart(3)} | ${L.k} | ${String(L.N).padStart(8)} | ${L.Emed.toFixed(2).padStart(6)} |      ${prev?('×'+(L.Emed/prev).toFixed(3)):'    —'}   | ${(L.Emed/2**L.k).toFixed(3)} | ${(L.Emed/L.k).toFixed(2)} | ${(L.Emed/L.k**2).toFixed(3)} |   ${(L.Emed/prodF).toFixed(2)}`);
    prev=L.Emed;
  }
  const [b2,a2]=lsqSlope(levelsA.map(L=>L.k),levelsA.map(L=>Math.log2(L.Emed)));
  const [al,aN]=lsqSlope(levelsA.map(L=>Math.log(L.N)),levelsA.map(L=>Math.log(L.Emed)));
  const r2=(xs,ys,f)=>{const m=ys.reduce((a,b)=>a+b,0)/ys.length;let st=0,sr=0;for(let i=0;i<ys.length;i++){st+=(ys[i]-m)**2;sr+=(ys[i]-f(xs[i]))**2}return 1-sr/st};
  const R2k=r2(levelsA.map(L=>L.k),levelsA.map(L=>Math.log2(L.Emed)),k=>a2+b2*k);
  const R2N=r2(levelsA.map(L=>Math.log(L.N)),levelsA.map(L=>Math.log(L.Emed)),t=>aN+al*t);
  console.log(`\n fit log2(E_med) = ${a2.toFixed(3)} + ${b2.toFixed(3)}·k   (pure doubling ⇒ slope 1)   R²=${R2k.toFixed(5)}`);
  console.log(` fit  E_med ~ N^α:  α = ${al.toFixed(3)}  (c=${Math.exp(aN).toFixed(3)})   R²=${R2N.toFixed(5)}`);
  console.log(` per-level growth ×${(2**b2).toFixed(3)} per added prime; @29 prediction (W=6.47e9, N=143M): E_med ≈ ${(2**(a2+b2*7)).toFixed(1)} [2^k-fit] vs ${(Math.exp(aN)*Math.pow(143139150,al)).toFixed(1)} [N^α-fit]`);
}

// ============================================================================
// PART B — zone twin-share march toward e^{2γ}/4 (segmented odd-only sieve)
// ============================================================================

function nextPrime(n){let m=n+1;for(;;m++){let ok=m>1;for(const p of PR){if(p*p>m)break;if(m%p===0){ok=false;break}}if(ok)return m}}

function levelB(pn){
  const t0=Date.now();
  const pNext=nextPrime(pn);
  const windowD=pNext*pNext;                          // ≤ 1.0004e10 < 2^53 ✓
  const sp=PR.filter(p=>p>2&&p<=pn);                  // odd sieve primes (2 handled by odd-only layout)
  let dens=0.5; for(const p of sp) dens*=(p-2)/p;
  const expect=dens*windowD;
  const S=1<<22;                                      // 4M odds per segment = 4MB, spans 8.4M
  const seg=new Uint8Array(S);
  let cand=0, prevUnhit=false;
  for(let lo=1;lo<windowD;lo+=2*S){                   // lo odd; segment = odds in [lo, hi)
    const hi=Math.min(lo+2*S,windowD);
    const M=(hi-lo)/2;                                // number of odd entries (diff always even)
    seg.fill(0,0,M);
    for(let t=0;t<sp.length;t++){const p=sp[t];
      let start=Math.ceil(lo/p)*p; if(start<p)start=p;// mark multiples ≥ p (p itself included, as in the original)
      if(start%2===0)start+=p;                        // odd multiples only
      for(let idx=(start-lo)/2;idx<M;idx+=p)seg[idx]=1;
    }
    // count pairs (r−2, r), both unhit, left element ≥ 3, right < windowD
    let m0,prevHit;
    if(lo===1){m0=1;prevHit=1;}                       // exclude pair (1,3), as the original's r≥3 does
    else {m0=0;prevHit=prevUnhit?0:1;}                // boundary pair (lo−2, lo)
    for(let m=m0;m<M;m++){const v=seg[m];if((v|prevHit)===0)cand++;prevHit=v;}
    prevUnhit=prevHit===0;
  }
  const secs=(Date.now()-t0)/1000;
  return {pn,pNext,window:windowD,cand,expect:+expect.toFixed(1),ratio:+(cand/expect).toFixed(4),secs:+secs.toFixed(1)};
}

console.log(`\n${'='.repeat(96)}\nPART B — twin slots in [3, p_{n+1}²) sieved by primes ≤ p_n, vs naive share (01-zone def kept)\n${'='.repeat(96)}`);
const REF={2999:53804,5003:130803,9973:440666};       // 01-zone-twin-share.js output, 2026-08-13
const rowsB=[];
for(const pn of [2999,5003,9973,20011,50021,100003]){
  const r=levelB(pn); rowsB.push(r);
  const chk=REF[pn]!==undefined?(r.cand===REF[pn]?' ✓ reproduces 01-zone row':` ✗ MISMATCH (expected ${REF[pn]})`):'';
  console.log(JSON.stringify(r)+chk);
  if(REF[pn]!==undefined&&r.cand!==REF[pn])process.exit(1);
}

{ // convergence analysis
  const GAMMA=0.5772156649015329, LIM=Math.exp(2*GAMMA)/4;
  // PNT-correction model: π₂(x) ~ 2C₂·x/ln²x·(1 + 2/ln x + 6/ln²x + ...) with
  // x = window ≈ p², ln x = 2 ln p  ⇒  ratio ≈ LIM·(1 + 1/ln p + 1.5/ln²p).
  console.log(`\n limit e^{2γ}/4 = ${LIM.toFixed(6)}`);
  console.log('    p_n |  ratio  | ratio−lim | Δ vs prev | c₁=(r−lim)·ln p | c₂=(r−lim)·ln²p | Li₂-model | resid');
  let prev=null;
  for(const r of rowsB){
    const d=r.ratio-LIM, lp=Math.log(r.pn), pred=LIM*(1+1/lp+1.5/(lp*lp));
    console.log(` ${String(r.pn).padStart(6)} | ${r.ratio.toFixed(4)} |   ${d.toFixed(4)} |   ${prev===null?'  —  ':(r.ratio-prev).toFixed(4)} |        ${(d*lp).toFixed(3)}    |      ${(d*lp*lp).toFixed(2)}      |   ${pred.toFixed(4)} | ${(r.ratio-pred).toFixed(4)}`);
    prev=r.ratio;
  }
  const [B,A]=lsqSlope(rowsB.map(r=>1/Math.log(r.pn)),rowsB.map(r=>r.ratio));
  console.log(` fit ratio = A + B/ln p over the 6 levels:  A = ${A.toFixed(4)} (limit says ${LIM.toFixed(4)}), B = ${B.toFixed(3)}`);
  const c=(rowsB[rowsB.length-1].ratio-LIM)*Math.log(rowsB[rowsB.length-1].pn);
  console.log(` at c/ln p pace (c≈${c.toFixed(2)}): ratio 0.85 at p≈e^${(c/(0.85-LIM)).toFixed(1)}≈1e${(c/(0.85-LIM)/Math.LN10).toFixed(0)}, 0.80 at p≈1e${(c/(0.80-LIM)/Math.LN10).toFixed(0)}`);
}
console.log(`\n[TOTAL ${((Date.now()-T00)/1000).toFixed(1)}s]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-17-cheap-laws.js
//   invocation:  node research/natal-cap-17-cheap-laws.js
//   code-sha256: 46ba58d580ce2df5a56675b2fcb83ce63437872331075535f99986a4dc7447d1
//   out-sha256:  6c50cb39bec876309c324d32c224b0b454dc5fab72ccb4b338e5be7347f34bf2
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     34.7 s
// ============================================================================
//
// ================================================================================================
// @7: W=210  |N|=10  scour 11..13 (2 primes, √W=14.5)  grid 2 lengths
//         l |      mean |    M |    m |     E=M−mean
//        17 |       0.8 |    2 |    0 |     1.19
//        20 |       1.0 |    2 |    0 |     1.05
//  E min/med/max = 1.05 / 1.19 / 1.19   log-log slope E vs mean = -0.787  (0.5 ⇒ √mean; ~0 ⇒ l-independent)
//  deficit side: max (mean−m)/√mean = 0.98
//  [0.0s]
//
// ================================================================================================
// @11: W=2310  |N|=90  scour 13..47 (10 primes, √W=48.1)  grid 10 lengths
//         l |      mean |    M |    m |     E=M−mean
//        50 |       1.9 |    4 |    0 |     2.05
//        54 |       2.1 |    4 |    0 |     1.90
//        57 |       2.2 |    4 |    0 |     1.78
//        63 |       2.5 |    5 |    1 |     2.55
//        75 |       2.9 |    5 |    1 |     2.08
//        80 |       3.1 |    5 |    1 |     1.88
//       101 |       3.9 |    6 |    2 |     2.06
//       122 |       4.8 |    7 |    2 |     2.25
//       136 |       5.3 |    8 |    3 |     2.70
//       178 |       6.9 |    9 |    4 |     2.06
//  E min/med/max = 1.78 / 2.06 / 2.70   log-log slope E vs mean = 0.121  (0.5 ⇒ √mean; ~0 ⇒ l-independent)
//  deficit side: max (mean−m)/√mean = 1.49
//  powers of 2:  E(2^6)=2.5  E(2^7)=3.0
//  [0.0s]
//
// ================================================================================================
// @13: W=30030  |N|=990  scour 17..173 (34 primes, √W=173.3)  grid 34 lengths
//         l |      mean |    M |    m |     E=M−mean
//       174 |       5.7 |    9 |    3 |     3.26
//       199 |       6.6 |   10 |    3 |     3.44
//       230 |       7.6 |   11 |    4 |     3.42
//       281 |       9.3 |   13 |    6 |     3.74
//       338 |      11.1 |   15 |    8 |     3.86
//       423 |      13.9 |   18 |    9 |     4.05
//       567 |      18.7 |   23 |   14 |     4.31
//       812 |      26.8 |   32 |   21 |     5.23
//      1581 |      52.1 |   57 |   46 |     4.88
//      1767 |      58.3 |   63 |   53 |     4.75
//  E min/med/max = 2.90 / 4.05 / 5.95   log-log slope E vs mean = 0.231  (0.5 ⇒ √mean; ~0 ⇒ l-independent)
//  deficit side: max (mean−m)/√mean = 1.42
//  powers of 2:  E(2^8)=3.6  E(2^9)=5.1  E(2^10)=5.2
//  CHECK vs natal-cap-01: M(1767) = 63 (expected 63) ✓
//  CHECK vs natal-cap-01: M(174) = 9 (expected 9) ✓
//  [0.0s]
//
// ================================================================================================
// @17: W=510510  |N|=14850  scour 19..709 (120 primes, √W=714.5)  grid 120 lengths
//         l |      mean |    M |    m |     E=M−mean
//       721 |      21.0 |   28 |   15 |     7.03
//       810 |      23.6 |   29 |   17 |     5.44
//       907 |      26.4 |   33 |   19 |     6.62
//      1094 |      31.8 |   39 |   25 |     7.18
//      1274 |      37.1 |   45 |   29 |     7.94
//      1543 |      44.9 |   52 |   37 |     7.12
//      1987 |      57.8 |   65 |   50 |     7.20
//      2673 |      77.8 |   84 |   71 |     6.25
//      4020 |     116.9 |  126 |  109 |     9.06
//      7620 |     221.7 |  229 |  214 |     7.35
//     26869 |     781.6 |  791 |  771 |     9.42
//  E min/med/max = 5.36 / 7.18 / 10.08   log-log slope E vs mean = 0.076  (0.5 ⇒ √mean; ~0 ⇒ l-independent)
//  deficit side: max (mean−m)/√mean = 1.53
//  powers of 2:  E(2^10)=6.2  E(2^11)=7.4  E(2^12)=8.9  E(2^13)=6.7  E(2^14)=7.4
//  CHECK vs natal-cap-01: M(26869) = 791 (expected 791) ✓
//  CHECK vs natal-cap-01: M(721) = 28 (expected 28) ✓
//  [0.0s]
//
// ================================================================================================
// @19: W=9699690  |N|=252450  scour 23..3109 (435 primes, √W=3114.4)  grid 435 lengths
//         l |      mean |    M |    m |     E=M−mean
//      3120 |      81.2 |   92 |   71 |    10.80
//      3552 |      92.4 |  104 |   82 |    11.55
//      4061 |     105.7 |  117 |   95 |    11.31
//      4702 |     122.4 |  134 |  111 |    11.62
//      5676 |     147.7 |  158 |  137 |    10.27
//      6885 |     179.2 |  191 |  166 |    11.81
//      9125 |     237.5 |  250 |  224 |    12.51
//     12746 |     331.7 |  346 |  318 |    14.26
//     20771 |     540.6 |  559 |  524 |    18.40
//     45971 |    1196.5 | 1213 | 1181 |    16.53
//    421726 |   10976.1 | 10994 | 10956 |    17.90
//  E min/med/max = 9.29 / 12.61 / 21.46   log-log slope E vs mean = 0.163  (0.5 ⇒ √mean; ~0 ⇒ l-independent)
//  deficit side: max (mean−m)/√mean = 1.21
//  powers of 2:  E(2^12)=11.4  E(2^13)=13.8  E(2^14)=15.6  E(2^15)=21.2  E(2^16)=16.3  E(2^17)=15.6  E(2^18)=18.3
//  [1.6s]
//
// ================================================================================================
// @23: W=223092870  |N|=5301450  scour 29..14929 (1739 primes, √W=14936.3)  grid 139 lengths (every 13th q)
//         l |      mean |    M |    m |     E=M−mean
//     14944 |     355.1 |  375 |  337 |    19.88
//     16571 |     393.8 |  414 |  375 |    20.22
//     18905 |     449.2 |  470 |  433 |    20.75
//     22228 |     528.2 |  550 |  507 |    21.79
//     26600 |     632.1 |  657 |  609 |    24.89
//     33135 |     787.4 |  810 |  767 |    22.60
//     43345 |    1030.0 | 1054 | 1009 |    23.97
//     61850 |    1469.8 | 1491 | 1447 |    21.23
//    104396 |    2480.8 | 2505 | 2456 |    24.19
//    275764 |    6553.1 | 6580 | 6530 |    26.90
//   7692858 |  182808.6 | 182843 | 182779 |    34.37
//  E min/med/max = 18.81 / 23.20 / 34.37   log-log slope E vs mean = 0.077  (0.5 ⇒ √mean; ~0 ⇒ l-independent)
//  deficit side: max (mean−m)/√mean = 1.05
//  powers of 2:  E(2^14)=20.7  E(2^15)=23.3  E(2^16)=22.6  E(2^17)=21.3  E(2^18)=24.6  E(2^19)=28.1  E(2^20)=36.2  E(2^21)=30.5  E(2^22)=30.0
//  [12.1s]
//
// ================================================================================================
// PART A CROSS-LEVEL FIT — E_med vs level
// ================================================================================================
//    x | k |        N |  E_med | ratio to prev | E/2^k |  E/k  | E/k²  | E/∏p/(p−2)
//    7 | 1 |       10 |   1.19 |          —   | 0.595 | 1.19 | 1.190 |   0.85
//   11 | 2 |       90 |   2.06 |      ×1.735   | 0.516 | 1.03 | 0.516 |   1.21
//   13 | 3 |      990 |   4.05 |      ×1.964   | 0.507 | 1.35 | 0.451 |   2.01
//   17 | 4 |    14850 |   7.18 |      ×1.770   | 0.449 | 1.79 | 0.449 |   3.13
//   19 | 5 |   252450 |  12.61 |      ×1.757   | 0.394 | 2.52 | 0.504 |   4.92
//   23 | 6 |  5301450 |  23.20 |      ×1.840   | 0.363 | 3.87 | 0.644 |   8.27
//
//  fit log2(E_med) = -0.616 + 0.859·k   (pure doubling ⇒ slope 1)   R²=0.99941
//  fit  E_med ~ N^α:  α = 0.225  (c=0.771)   R²=0.99508
//  per-level growth ×1.814 per added prime; @29 prediction (W=6.47e9, N=143M): E_med ≈ 42.2 [2^k-fit] vs 52.4 [N^α-fit]
//
// ================================================================================================
// PART B — twin slots in [3, p_{n+1}²) sieved by primes ≤ p_n, vs naive share (01-zone def kept)
// ================================================================================================
// {"pn":2999,"pNext":3001,"window":9006001,"cand":53804,"expect":58210.3,"ratio":0.9243,"secs":0} ✓ reproduces 01-zone row
// {"pn":5003,"pNext":5009,"window":25090081,"cand":130803,"expect":143442.3,"ratio":0.9119,"secs":0} ✓ reproduces 01-zone row
// {"pn":9973,"pNext":10007,"window":100140049,"cand":440666,"expect":490127.1,"ratio":0.8991,"secs":0.1} ✓ reproduces 01-zone row
// {"pn":20011,"pNext":20021,"window":400840441,"cand":1510202,"expect":1699007.5,"ratio":0.8889,"secs":0.5}
// {"pn":50021,"pNext":50023,"window":2502300529,"cand":7816740,"expect":8889480,"ratio":0.8793,"secs":3.2}
// {"pn":100003,"pNext":100019,"window":10003800361,"cand":27420901,"expect":31393396.3,"ratio":0.8735,"secs":17}
//
//  limit e^{2γ}/4 = 0.793055
//     p_n |  ratio  | ratio−lim | Δ vs prev | c₁=(r−lim)·ln p | c₂=(r−lim)·ln²p | Li₂-model | resid
//    2999 | 0.9243 |   0.1312 |     —   |        1.051    |      8.41      |   0.9107 | 0.0136
//    5003 | 0.9119 |   0.1188 |   -0.0124 |        1.012    |      8.62      |   0.9026 | 0.0093
//    9973 | 0.8991 |   0.1060 |   -0.0128 |        0.976    |      8.99      |   0.8932 | 0.0059
//   20011 | 0.8889 |   0.0958 |   -0.0102 |        0.949    |      9.40      |   0.8853 | 0.0036
//   50021 | 0.8793 |   0.0862 |   -0.0096 |        0.933    |      10.10      |   0.8765 | 0.0028
//  100003 | 0.8735 |   0.0804 |   -0.0058 |        0.926    |      10.66      |   0.8709 | 0.0026
//  fit ratio = A + B/ln p over the 6 levels:  A = 0.7563 (limit says 0.7931), B = 1.330
//  at c/ln p pace (c≈0.93): ratio 0.85 at p≈e^16.3≈1e7, 0.80 at p≈1e58
//
// [TOTAL 34.6s]
// ============================================================================
// READINGS (2026-08-14) — honestly calibrated
// ============================================================================
// PART A — WINDOW-EXCESS LAW: CONFIRMED IN FORM, REFINED IN CONSTANT.
// 1. The l-independence survives two more levels. Log-log slope of E vs the
//    window mean: 0.163 (@19, full 435-length grid), 0.077 (@23), while the
//    mean sweeps 81.2 -> 10,976.1 (@19) and 355.1 -> 182,808.6 (@23) — 2.5+ decades.
//    The extremal window still carries only an O(1)-per-level excess over its
//    fair share. Deficit side stays symmetric: max (mean−m)/sqrt(mean) =
//    1.21 / 1.05, right in the 1.0–1.5 band of the four old levels. Mild
//    honest wrinkle (visible at every level, not new): the very largest
//    windows (l -> W/q_min) run ~1.4–1.7x the median excess (E=34.37 at
//    l=7,692,858 @23 vs med 23.20) — a tilt, not a power law.
// 2. NEW POINTS: E_med = 12.61 (@19), 23.20 (@23), extending
//    1.19/2.06/4.05/7.18. Step ratios ×1.735, 1.964, 1.770, 1.757, 1.840 —
//    flat around ×1.8 with no trend across five steps.
// 3. PURE DOUBLING IS OUT: E/2^k falls monotonically 0.595 -> 0.363. The law
//    that fits is geometric with rate 2^0.859 ≈ 1.81 per added base prime:
//    log2(E_med) = −0.616 + 0.859·k, R² = 0.99941 over six levels and three
//    decades of E. So: each congruence layer multiplies the extremal-window
//    excess by a CONSTANT ≈ 1.8 (step scatter 1.735–1.964), independent of l.
// 4. Discriminants killed: E ~ N^0.225 also fits in R² (0.99508) but predicts
//    RISING step ratios (9^.225=1.64 ... 21^.225=1.98, since N steps by p−2);
//    observed steps are flat — the per-prime geometric law beats the
//    census-power law on structure, not just R². E/k, E/k², E/∏p/(p−2) are
//    all clearly non-constant (linear, quadratic, density-inflation
//    comparators refuted).
// 5. Verdict: LAW REFINED — E_x(l) ≈ 0.65·1.81^k (0.65 = 2^−0.616), l-independent within a
//    level. The two candidate forms now differ sharply at @29: geometric
//    predicts E_med ≈ 42.2, N^α predicts ≈ 52.4. That level (W=6.47e9,
//    N=143,139,150) needs true streaming: march the @13 tile's 990 slots per
//    30,030-block (215,441 blocks, ~2.1e8 candidate checks against
//    17/19/23/29), positions into a Float64Array (values pass 2^31), same
//    two-pointer sweep. ~1.5 GB, minutes — the designated discriminator.
// 6. Method note: the two-pointer sweep over sorted positions replaces
//    cap-01's O(W) prefix arrays exactly (max windows start ON a point, min
//    windows just after one — both arguments exact, no heuristics), and
//    reproduces cap-01's M values at @13/@17 to the digit (asserted in-run)
//    plus all four old E_med values. @23's median is over an every-13th-q
//    subsample of the scour grid (uniform subsampling preserves quantiles).
//
// PART B — ZONE TWIN-SHARE: CONVERGENCE CONFIRMED, RATE IDENTIFIED, LIMIT FAR.
// 7. Definition kept exactly (naive share, no HL correction); the segmented
//    odd-only sieve reproduces the 01-zone rows at p = 2999/5003/9973
//    EXACTLY (cand 53,804 / 130,803 / 440,666 — asserted in-run).
// 8. NEW POINTS: ratio = 0.8889 (p=20011), 0.8793 (50021), 0.8735 (100003 —
//    window 1.0004e10, 27,420,901 real twin primes counted in 17s). The
//    march is 0.9243 -> 0.8735 over a ×33 stretch in p, monotone, glacial.
// 9. THE RATE IS 1/ln p, FIRST ORDER: c₁ = (ratio−lim)·ln p drifts slowly
//    down 1.051 -> 0.926 while c₂ = (ratio−lim)·ln²p RISES 8.41 -> 10.66 —
//    a 1/ln²p decay is refuted, 1/ln p with a slowly-settling coefficient
//    is exactly what the data shows. The brief's "~1/ln p?" — yes.
// 10. THE DRIFT IS CLASSICAL, ZERO FREE PARAMETERS: π₂(x) ~ 2C₂·x/ln²x ·
//    (1 + 2/ln x + 6/ln²x + ...) at x = window ≈ p² gives
//    ratio ≈ lim·(1 + 1/ln p + 1.5/ln²p). This no-knob model tracks all six
//    levels with residual shrinking 0.0136 -> 0.0026 — by p=1e5 the naive-
//    share ratio is the limit plus PNT-integral corrections and nothing
//    else. Asymptotically it says c₁ -> lim = 0.793; observed 0.926 and
//    falling — consistent.
// 11. Fit-hygiene lesson: the straight two-parameter fit A + B/ln p lands at
//    A = 0.7563, BELOW the true limit 0.7931 — the live second-order term
//    biases linear extrapolation. Don't read intercepts off this drift.
// 12. Honest calibration: this is CONSISTENCY with e^{2γ}/4, not numerical
//    confirmation of the limit. At c/ln p pace the ratio reaches 0.85 only
//    near p ≈ 1e7 (someday checkable: window 1e14, big but not absurd) and
//    0.80 near p ≈ 1e58 (never). What the data does establish: the zone's
//    twin share follows the predicted correction law to 3 decimal places
//    out to 1e10, with no anomaly for the anchored-calm file to explain.
// 13. Next step: p ≈ 2–3e5 (window ~1e11; wheel-accelerated segment scan,
//    ~10–30 min) tests whether the Li₂ residual keeps shrinking ~1/ln³p;
//    cheaper alternative — derive the third-order coefficient and check
//    today's 0.0026 residual against it on paper.
//
// NET: both cheap measurements paid out. A: the excess law is real but its
// base is ~1.81, not 2 — a new constant for the campaign to explain (why
// does each congruence layer multiply the extremal excess by ~1.8?). B: the
// 0.79-limit thread is now quantitatively closed down to its correction
// terms; the zone is exactly as rich as classical theory says, no more, no
// less. Moratorium respected: nothing committed, nothing posted.
// ============================================================================
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   window 10003800361 at p_n=100003, quoted in reading 8 as 1.0004e10 and in
//   reading 12 as "out to 1e10".
// DERIVED IN THIS READING by arithmetic over printed values:
//   1.64 and 1.98 in reading 4 are 9^0.225 and 21^0.225, using the printed
//   census-power exponent alpha = 0.225 and the printed |N| step multipliers
//   (90/10 = 9 at the first step, 5301450/252450 = 21 at the last).
//   0.65 in reading 5 is 2^-0.616 from the printed fit intercept -0.616.
//   215,441 in reading 5 is the @29 wheel 6469693230 divided by the @13 tile
//   30030, exact.
//   2.1e8 in reading 5 is those 215,441 blocks times the printed @13 slot
//   count |N| = 990, i.e. 213,286,590.
//   1e14 in reading 12 is the Part B window at the printed crossing point
//   p ~ 1e7, since the window is p_{n+1}^2.
//   1e11 in reading 13 is the same window formula at the proposed p ~ 2-3e5.
// IN-CODE:
//   143,139,150 in reading 5 is the @29 twin-slot census, hardcoded in the
//   cross-level fit line above the banner; OUTPUT prints it only as "N=143M".
// ---------------------------------------------------------------------------
