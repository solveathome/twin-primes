// ============================================================================
// ATTACK 6 — TRUNCATED INCLUSION–EXCLUSION CERTIFICATES ON THE NATAL@5 SET
// (Bonferroni ladders / Brun's pure sieve, per tile; 2026-08-14)
// ============================================================================
// FORWARD POINTER (2026-08-15, night-run reconciliation). READINGS 3 and 7
// below ("pairs run ~3% UNDER the CRT prediction … a structural negative
// correlation"; "most promising crack: if that deficit had a proven sign,
// even just S2 ≤ Σ 4N/qq'") are SUPERSEDED. Two later results:
//   - natal-cap-12-overlap-sign.js/.md REFUTED the one-sided conjecture:
//     40 to 53% of pairs sit ABOVE their CRT value. The 3% was an aggregate
//     artifact of averaging over all 7,140 pairs. In its place stands the
//     Structured-Bias Theorem (each pair term is an anchored window of a
//     dilated pattern, S₂ ≈ ΣCRT − #pairs·N/W, with the exception exactly
//     when q and q′ both divide W+1) — a proven two-sided description, and
//     it does give the formula-priceable pair terms reading 7 wanted.
//   - natal-cap-13-anchored-calm.js reading 2(b) REVERSED the sign at the
//     head: the head-pair ensemble mean is CRT to four digits and the ANCHOR
//     is overlap-RICH (94.3rd percentile), not deficient. The deficit, where
//     it exists, lives in the non-head pairs.
// The Bonferroni/Brun machinery of readings 1, 2, 4, 5, 6 stands unchanged.
// ============================================================================
// Survivors of the Scour = Σ_{T ⊆ scour} (−1)^|T| |A_T|,  A_T = ∩_{q∈T} A_q,
// A_q = {r ∈ N_x : r ≡ 0 or −2 (mod q)}.  Bonferroni's inequalities say the
// truncations alternate: with S_k = Σ_{|T|=k} |A_T|,
//     survivors ≥ N − S₁ + S₂ − ... − S_m   for ODD m   (certified LOWER bound)
//     survivors ≤ N − S₁ + S₂ − ... + S_m   for EVEN m  (certified upper bound).
// THE HONEST QUESTION: can a truncated ladder CERTIFY survivors > 0 in a tile
// — i.e. certify twins exist in [√W, W) — and at what depth does the ladder
// first go positive?  And where does any FIXED depth collapse as x grows?
//
// KEY COMPUTATIONAL IDENTITY (makes every depth exact & instant): for each
// natal slot r let h(r) = #{scour primes q hitting r}.  Then
//     S_k = Σ_r C(h(r), k)     and the depth-m Bonferroni partial sum is
//     B_m = Σ_r (−1)^m C(h(r)−1, m)   (with the h=0 slots contributing 1).
// So B_m (odd m) = survivors − Σ_{hit r} C(h(r)−1, m): the certificate's
// deficit at depth m is EXACTLY the tail of the hit-multiplicity histogram.
// The whole game is the distribution of h — which the removal-ledger already
// showed has mean > 1 (capacity 1.14× at 13): overlaps are everything.
// We verify the identity against brute-force subset enumeration at x=11.
//
// BRUN'S INSIGHT (the "impure" upgrade): flat subset-SIZE cutoffs waste depth
// budget on subsets of LARGE primes, which are individually tiny but legion.
// Brun instead truncates by prime SIZE per depth (few large factors allowed,
// many small).  We implement the cleanest tile version — a TIERED certificate:
// full (exact) inclusion–exclusion on scour primes ≤ z₀, Bonferroni depth d
// (odd) on the primes > z₀.  Per-slot validity: writing s = #small hits,
// L = #large hits, the tiered per-slot sum is [s=0]·(−1)^d·C(L−1,d) ≤ [h=0],
// so the total is a certified lower bound (this is Brun's mechanism in
// miniature).  Sources, checked 2026-08-14: V. Brun, "Über das Goldbachsche
// Gesetz und die Anzahl der Primzahlpaare", Arch. Math. Naturvid. B34 (1915),
// no. 8 (the pure sieve); V. Brun, "Le crible d'Eratosthène et le théorème de
// Goldbach", Skr. Norske Vid.-Akad. Kristiania I (1920), no. 3 (the graded
// sieve); Halberstam & Richert, "Sieve Methods", Academic Press 1974, Ch. 2
// (their Theorem 2.1 is the general Brun theorem); Cojocaru & Murty, "An
// Introduction to Sieve Methods", CUP 2006, Thm 6.1.2 (pure sieve:
// S = X·W(z)·(1+O((log z)^{−b log b})) + O(z^{b log log z}), an asymptotic
// only when log z ≤ c·log X / log log X — the depth/level constraint).
//
// Also measured: deviation of every pair/triple term from its CRT prediction
// |A_T| ≈ 2^|T| N / Π q  (the certificate's health if you ever want to
// PREDICT terms instead of counting them), and a Poisson-model scaling table
// for where each fixed depth dies as x marches on.
// ============================================================================
'use strict';

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
function C(n,k){if(k<0||k>n)return 0;let r=1;for(let i=0;i<k;i++)r=r*(n-i)/(i+1);return Math.round(r)}
const log10fact=m=>{let s=0;for(let i=2;i<=m;i++)s+=Math.log10(i);return s};

function buildLevel(x){
  const bases=primesUpTo(x), W=bases.reduce((a,b)=>a*b,1), sqrtW=Math.sqrt(W);
  const scour=primesUpTo(Math.floor(sqrtW)).filter(q=>q>x);
  const mids=bases.filter(p=>p>=7);
  const natal=[];
  for(let r=0;r<W;r++){const m=r%30;if(m!==11&&m!==17)continue;
    let ok=true;for(const p of mids){const rp=r%p;if(rp===0||rp===p-2){ok=false;break}}
    if(ok)natal.push(r);}
  const H=natal.map(r=>scour.filter(q=>r%q===0||(r+2)%q===0));
  return {x,W,sqrtW,scour,natal,N:natal.length,H,h:H.map(a=>a.length)};
}

// ---- ground truth: sieve the tile, count real twins (r,r+2), r in (√W, W)
function trueTwins(L){
  const s=new Uint8Array(L.W+3);s[0]=s[1]=1;
  for(let i=2;i*i<=L.W+2;i++)if(!s[i])for(let j=i*i;j<=L.W+2;j+=i)s[j]=1;
  let inBand=0,selfStruck=0;
  for(const r of L.natal){if(!s[r]&&!s[r+2]){if(r>L.sqrtW)inBand++;else selfStruck++;}}
  return {inBand,selfStruck};
}

for(const x of [11,13,17]){
  const L=buildLevel(x);
  const {inBand,selfStruck}=trueTwins(L);
  const survivors=L.h.filter(v=>v===0).length;
  const maxh=Math.max(...L.h);
  console.log(`\n===== @${x}: W=${L.W}, N=${L.N} natal, scour=${L.scour.length} primes (${L.scour[0]}..${L.scour[L.scour.length-1]}], √W=${L.sqrtW.toFixed(1)} =====`);
  const hist=Array(maxh+1).fill(0);for(const v of L.h)hist[v]++;
  console.log(`hit histogram h=0..${maxh}: [${hist.join(', ')}]  mean h=${(L.h.reduce((a,b)=>a+b,0)/L.N).toFixed(3)}  (=S1/N, the ledger's capacity ratio)`);
  console.log(`survivors=${survivors}; true twins in (√W,W)=${inBand}${survivors===inBand?' — MATCH':' — MISMATCH!'}; self-struck twins (x<q≤√W, lost to A_q)=${selfStruck}`);

  // exact S_k at all depths via the identity
  const S=Array(maxh+1).fill(0);
  for(const v of L.h)for(let k=1;k<=v;k++)S[k]+=C(v,k);
  // Bonferroni ladder
  console.log(`S_k exact: ${S.slice(1).map((s,i)=>`S${i+1}=${s}`).join(' ')}`);
  let firstPos=null,B=L.N;
  console.log(' m | B_m = N−S1+...±Sm | bound type | slack vs truth');
  for(let m=1;m<=maxh;m++){
    B+=(m%2?-1:1)*S[m];
    const lb=m%2===1;
    if(lb&&B>0&&firstPos===null)firstPos=m;
    console.log(`${String(m).padStart(2)} | ${String(B).padStart(8)}          | ${lb?'LOWER':'upper'}      | ${B-survivors>=0?'+':''}${B-survivors}`);
  }
  console.log(`first ODD depth with a POSITIVE certified lower bound: m=${firstPos===null?'NEVER':firstPos}`);

  // CRT deviation of the terms
  const dev=(k)=>{ // collect actual |A_T| for |T|=k from hit sets; CRT sum over ALL C(n,k) subsets
    const cnt=new Map();
    for(const Hr of L.H){const n=Hr.length;if(n<k)continue;
      const idx=Array.from({length:k},(_,i)=>i);
      while(true){const key=idx.map(i=>Hr[i]).join(',');cnt.set(key,(cnt.get(key)||0)+1);
        let i=k-1;while(i>=0&&idx[i]===n-k+i)i--;if(i<0)break;idx[i]++;for(let j=i+1;j<k;j++)idx[j]=idx[j-1]+1;}}
    let crtSum=0,sq=0,maxAbs=0,nSub=0;
    const qs=L.scour,idx=Array.from({length:k},(_,i)=>i);
    while(true){let prod=1;for(const i of idx)prod*=qs[i];
      const pred=Math.pow(2,k)*L.N/prod, act=cnt.get(idx.map(i=>qs[i]).join(','))||0, d=act-pred;
      crtSum+=pred;sq+=d*d;if(Math.abs(d)>maxAbs)maxAbs=Math.abs(d);nSub++;
      let i=k-1;while(i>=0&&idx[i]===qs.length-k+i)i--;if(i<0)break;idx[i]++;for(let j=i+1;j<k;j++)idx[j]=idx[j-1]+1;}
    return {k,nSub,nonzero:cnt.size,actual:S[k]||0,crtSum,rms:Math.sqrt(sq/nSub),maxAbs};
  };
  for(const k of [1,2,3]){
    if(x===17&&k===3&&C(L.scour.length,3)>3e5)continue;
    const d=dev(k);
    console.log(`|T|=${k}: ${d.nSub} subsets, ${d.nonzero} nonempty; ΣactualS${k}=${d.actual} vs ΣCRT=${d.crtSum.toFixed(1)} (ratio ${(d.actual/d.crtSum).toFixed(4)}); rms dev/term=${d.rms.toFixed(3)}, max=${d.maxAbs.toFixed(2)}`);
  }

  // brute-force verification of the identity at x=11 (all subsets to depth 5, plus FULL I-E over all 2^10)
  if(x===11){
    const qs=L.scour;let full=L.N,ok=true;
    for(let mask=1;mask<(1<<qs.length);mask++){
      const T=qs.filter((_,i)=>mask&(1<<i));
      let c=0;for(const r of L.natal){let all=true;for(const q of T)if(r%q!==0&&(r+2)%q!==0){all=false;break}if(all)c++;}
      full+=(T.length%2?-1:1)*c;
    }
    // depth-wise brute S_k
    const Sb=Array(6).fill(0);
    for(let mask=1;mask<(1<<qs.length);mask++){
      const T=qs.filter((_,i)=>mask&(1<<i));if(T.length>5)continue;
      let c=0;for(const r of L.natal){let all=true;for(const q of T)if(r%q!==0&&(r+2)%q!==0){all=false;break}if(all)c++;}
      Sb[T.length]+=c;}
    for(let k=1;k<=5;k++)if(Sb[k]!==(S[k]||0))ok=false;
    console.log(`brute-force check @11: S1..S5 by direct subset scan = [${Sb.slice(1)}] ${ok?'== identity values ✓':'MISMATCH ✗'}; full 2^${qs.length} I-E = ${full} (${full===survivors?'= survivors ✓':'≠ survivors ✗'})`);
  }

  // Brun-style TIERED certificate: exact I-E on scour primes ≤ z0, depth-d Bonferroni on the rest
  console.log('tiered (Brun-graded) certificate: exact on q≤z0, odd depth d on q>z0.  bound = Σ_{small-clean r} (−1)^d C(L−1,d)');
  console.log('  z0  | d=1     d=3     d=5    | log10(#I-E terms) at d giving best bound');
  let bestTier={bound:-Infinity};
  const z0s=[x,...L.scour];
  for(const z0 of z0s){
    const nSmall=L.scour.filter(q=>q<=z0).length,nLarge=L.scour.length-nSmall;
    const row=[];
    for(const d of [1,3,5]){
      let b=0;
      for(const Hr of L.H){
        let sSmall=0,Lg=0;for(const q of Hr)q<=z0?sSmall++:Lg++;
        if(sSmall>0)continue;
        b+=Lg===0?1:-C(Lg-1,d);
      }
      let terms=Math.pow(2,nSmall);for(let k=1;k<=d;k++)terms+=C(nLarge,k);
      row.push({d,b,terms});
      if(b>bestTier.bound||(b===bestTier.bound&&terms<bestTier.terms))bestTier={z0,d,bound:b,terms};
    }
    console.log(`  ${String(z0).padStart(3)} | ${row.map(r=>String(r.b).padStart(6)).join('  ')}  | ${row.map(r=>Math.log10(r.terms).toFixed(1)).join(' / ')}`);
  }
  console.log(`  best tiered bound: ${bestTier.bound} at z0=${bestTier.z0}, d=${bestTier.d} (~10^${Math.log10(bestTier.terms).toFixed(1)} terms) vs truth ${survivors}; flat depth-3 gave ${L.N-S[1]+S[2]-(S[3]||0)}`);
}

// ---- SCALING: Poisson model for the hit count h ~ Po(μ), μ = Σ_scour 2/q.
// Odd depth m certifies iff Σ_{h≥1} Po(h) C(h−1,m) < e^{−μ}.  Where does each
// fixed depth die?  (Single-class column: same with μ/2 — the ω=1 sieve.)
function mertensMu(x){ // μ = 2 Σ_{x<q≤√(x#)} 1/q via exact small part + Mertens for the tail
  const bases=primesUpTo(x), lnW=bases.reduce((a,p)=>a+Math.log(p),0), lnz=lnW/2;
  const M=0.2614972128; // Mertens constant
  const sumSmall=(()=>{let s=0;for(const q of primesUpTo(x))s+=1/q;return s})();
  const sumBig= lnz<Math.log(1e6) ? (()=>{let s=0;for(const q of primesUpTo(Math.floor(Math.exp(lnz))))s+=1/q;return s})()
                                  : Math.log(lnz)+M;
  return {mu:2*(sumBig-sumSmall),lnW,lnz};
}
function poissonNeededDepth(mu){
  const pois=[];let t=Math.exp(-mu);pois.push(t);
  for(let h=1;h<=400;h++){t*=mu/h;pois.push(t)}
  for(let m=1;m<=99;m+=2){
    let tail=0;for(let h=m+1;h<=400;h++)tail+=pois[h]*C(h-1,m);
    if(tail<pois[0]*Math.exp(0))return m; // certifies: e^{−μ} − tail > 0
  }
  return Infinity;
}
console.log('\n===== SCALING TABLE (Poisson model; μ=Σ2/q over the scour; 1-class column uses μ/2) =====');
console.log('  x  |  ln W  |   μ(2-class) | depth needed | 1-class μ | depth | log10 #flat terms at needed depth');
for(const x of [11,13,17,19,23,29,31,37,41,43,47,53,59,71,89,113,127]){
  const {mu,lnW,lnz}=mertensMu(x);
  const m2=poissonNeededDepth(mu),m1=poissonNeededDepth(mu/2);
  const piZ=Math.exp(lnz)/lnz; // π(√W) ≈ √W/ln√W
  const lgTerms=m2*Math.log10(piZ)-log10fact(m2);
  console.log(` ${String(x).padStart(3)} | ${lnW.toFixed(1).padStart(6)} | ${mu.toFixed(3).padStart(9)}    |      ${String(m2).padStart(2)}      |  ${(mu/2).toFixed(3)}    |  ${String(m1).padStart(2)}   | ${lgTerms.toFixed(1)}`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-06-bonferroni.js
//   invocation:  node research/natal-cap-06-bonferroni.js
//   code-sha256: d06b3a660446c55edd3948568c3afb65f0e569d40c1d76a5b486a69c543897c8
//   out-sha256:  84c187ed092d3ac8b92c0184dd76bfecc299ee42053b185e492c7b57ba506cf4
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.4 s
// ============================================================================
//
// ===== @11: W=2310, N=90 natal, scour=10 primes (13..47], √W=48.1 =====
// hit histogram h=0..3: [45, 19, 24, 2]  mean h=0.811  (=S1/N, the ledger's capacity ratio)
// survivors=45; true twins in (√W,W)=45 — MATCH; self-struck twins (x<q≤√W, lost to A_q)=2
// S_k exact: S1=73 S2=30 S3=2
//  m | B_m = N−S1+...±Sm | bound type | slack vs truth
//  1 |       17          | LOWER      | -28
//  2 |       47          | upper      | +2
//  3 |       45          | LOWER      | +0
// first ODD depth with a POSITIVE certified lower bound: m=1
// |T|=1: 10 subsets, 10 nonempty; ΣactualS1=73 vs ΣCRT=71.0 (ratio 1.0279); rms dev/term=0.720, max=1.17
// |T|=2: 45 subsets, 27 nonempty; ΣactualS2=30 vs ΣCRT=24.7 (ratio 1.2158); rms dev/term=0.574, max=1.39
// |T|=3: 120 subsets, 2 nonempty; ΣactualS3=2 vs ΣCRT=5.0 (ratio 0.4021); rms dev/term=0.133, max=0.97
// brute-force check @11: S1..S5 by direct subset scan = [73,30,2,0,0] == identity values ✓; full 2^10 I-E = 45 (= survivors ✓)
// tiered (Brun-graded) certificate: exact on q≤z0, odd depth d on q>z0.  bound = Σ_{small-clean r} (−1)^d C(L−1,d)
//   z0  | d=1     d=3     d=5    | log10(#I-E terms) at d giving best bound
//    11 |     17      45      45  | 1.0 / 2.2 / 2.8
//    13 |     26      45      45  | 1.0 / 2.1 / 2.6
//    17 |     33      45      45  | 1.1 / 2.0 / 2.3
//    19 |     38      45      45  | 1.2 / 1.9 / 2.1
//    23 |     40      45      45  | 1.3 / 1.8 / 1.9
//    29 |     43      45      45  | 1.6 / 1.8 / 1.8
//    31 |     44      45      45  | 1.8 / 1.9 / 1.9
//    37 |     44      45      45  | 2.1 / 2.1 / 2.1
//    41 |     45      45      45  | 2.4 / 2.4 / 2.4
//    43 |     45      45      45  | 2.7 / 2.7 / 2.7
//    47 |     45      45      45  | 3.0 / 3.0 / 3.0
//   best tiered bound: 45 at z0=23, d=3 (~10^1.8 terms) vs truth 45; flat depth-3 gave 45
//
// ===== @13: W=30030, N=990 natal, scour=34 primes (17..173], √W=173.3 =====
// hit histogram h=0..5: [307, 348, 249, 56, 29, 1]  mean h=1.146  (=S1/N, the ledger's capacity ratio)
// survivors=307; true twins in (√W,W)=307 — MATCH; self-struck twins (x<q≤√W, lost to A_q)=6
// S_k exact: S1=1135 S2=601 S3=182 S4=34 S5=1
//  m | B_m = N−S1+...±Sm | bound type | slack vs truth
//  1 |     -145          | LOWER      | -452
//  2 |      456          | upper      | +149
//  3 |      274          | LOWER      | -33
//  4 |      308          | upper      | +1
//  5 |      307          | LOWER      | +0
// first ODD depth with a POSITIVE certified lower bound: m=3
// |T|=1: 34 subsets, 34 nonempty; ΣactualS1=1135 vs ΣCRT=1135.3 (ratio 0.9997); rms dev/term=1.480, max=3.28
// |T|=2: 561 subsets, 359 nonempty; ΣactualS2=601 vs ΣCRT=620.0 (ratio 0.9693); rms dev/term=0.823, max=3.45
// |T|=3: 5984 subsets, 175 nonempty; ΣactualS3=182 vs ΣCRT=214.9 (ratio 0.8468); rms dev/term=0.171, max=1.93
// tiered (Brun-graded) certificate: exact on q≤z0, odd depth d on q>z0.  bound = Σ_{small-clean r} (−1)^d C(L−1,d)
//   z0  | d=1     d=3     d=5    | log10(#I-E terms) at d giving best bound
//    13 |   -145     274     307  | 1.5 / 3.8 / 5.5
//    17 |    -37     287     307  | 1.5 / 3.8 / 5.5
//    19 |     32     291     307  | 1.6 / 3.7 / 5.4
//    23 |     76     293     307  | 1.6 / 3.7 / 5.3
//    29 |    103     295     307  | 1.7 / 3.7 / 5.2
//    31 |    132     296     307  | 1.8 / 3.6 / 5.2
//    37 |    150     298     307  | 2.0 / 3.6 / 5.1
//    41 |    168     299     307  | 2.2 / 3.5 / 5.0
//    43 |    180     300     307  | 2.5 / 3.5 / 4.9
//    47 |    192     301     307  | 2.7 / 3.5 / 4.8
//    53 |    209     303     307  | 3.0 / 3.5 / 4.8
//    59 |    217     303     307  | 3.3 / 3.6 / 4.7
//    61 |    226     303     307  | 3.6 / 3.8 / 4.6
//    67 |    240     304     307  | 3.9 / 4.0 / 4.6
//    71 |    253     304     307  | 4.2 / 4.2 / 4.6
//    73 |    263     306     307  | 4.5 / 4.5 / 4.7
//    79 |    269     306     307  | 4.8 / 4.8 / 4.9
//    83 |    273     306     307  | 5.1 / 5.1 / 5.1
//    89 |    276     306     307  | 5.4 / 5.4 / 5.4
//    97 |    280     307     307  | 5.7 / 5.7 / 5.7
//   101 |    286     307     307  | 6.0 / 6.0 / 6.0
//   103 |    290     307     307  | 6.3 / 6.3 / 6.3
//   107 |    295     307     307  | 6.6 / 6.6 / 6.6
//   109 |    297     307     307  | 6.9 / 6.9 / 6.9
//   113 |    297     307     307  | 7.2 / 7.2 / 7.2
//   127 |    298     307     307  | 7.5 / 7.5 / 7.5
//   131 |    298     307     307  | 7.8 / 7.8 / 7.8
//   137 |    301     307     307  | 8.1 / 8.1 / 8.1
//   139 |    305     307     307  | 8.4 / 8.4 / 8.4
//   149 |    305     307     307  | 8.7 / 8.7 / 8.7
//   151 |    307     307     307  | 9.0 / 9.0 / 9.0
//   157 |    307     307     307  | 9.3 / 9.3 / 9.3
//   163 |    307     307     307  | 9.6 / 9.6 / 9.6
//   167 |    307     307     307  | 9.9 / 9.9 / 9.9
//   173 |    307     307     307  | 10.2 / 10.2 / 10.2
//   best tiered bound: 307 at z0=67, d=5 (~10^4.6 terms) vs truth 307; flat depth-3 gave 274
//
// ===== @17: W=510510, N=14850 natal, scour=120 primes (19..709], √W=714.5 =====
// hit histogram h=0..6: [3099, 5278, 3820, 1583, 926, 103, 41]  mean h=1.490  (=S1/N, the ledger's capacity ratio)
// survivors=3099; true twins in (√W,W)=3099 — MATCH; self-struck twins (x<q≤√W, lost to A_q)=16
// S_k exact: S1=22132 S2=15770 S3=7137 S4=2056 S5=349 S6=41
//  m | B_m = N−S1+...±Sm | bound type | slack vs truth
//  1 |    -7282          | LOWER      | -10381
//  2 |     8488          | upper      | +5389
//  3 |     1351          | LOWER      | -1748
//  4 |     3407          | upper      | +308
//  5 |     3058          | LOWER      | -41
//  6 |     3099          | upper      | +0
// first ODD depth with a POSITIVE certified lower bound: m=3
// |T|=1: 120 subsets, 120 nonempty; ΣactualS1=22132 vs ΣCRT=22182.8 (ratio 0.9977); rms dev/term=2.296, max=7.07
// |T|=2: 7140 subsets, 4527 nonempty; ΣactualS2=15770 vs ΣCRT=16185.0 (ratio 0.9744); rms dev/term=0.920, max=7.06
// |T|=3: 280840 subsets, 6064 nonempty; ΣactualS3=7137 vs ΣCRT=7693.2 (ratio 0.9277); rms dev/term=0.148, max=3.53
// tiered (Brun-graded) certificate: exact on q≤z0, odd depth d on q>z0.  bound = Σ_{small-clean r} (−1)^d C(L−1,d)
//   z0  | d=1     d=3     d=5    | log10(#I-E terms) at d giving best bound
//    17 |  -7282    1351    3058  | 2.1 / 5.5 / 8.3
//    19 |  -5085    1950    3076  | 2.1 / 5.4 / 8.3
//    23 |  -3567    2347    3088  | 2.1 / 5.4 / 8.3
//    29 |  -2554    2569    3092  | 2.1 / 5.4 / 8.2
//    31 |  -1752    2720    3096  | 2.1 / 5.4 / 8.2
//    37 |  -1164    2808    3097  | 2.2 / 5.4 / 8.2
//    41 |   -729    2875    3098  | 2.3 / 5.4 / 8.2
//    43 |   -345    2915    3099  | 2.4 / 5.4 / 8.2
//    47 |    -30    2944    3099  | 2.6 / 5.4 / 8.1
//    53 |    220    2964    3099  | 2.8 / 5.4 / 8.1
//    59 |    413    2975    3099  | 3.1 / 5.3 / 8.1
//    61 |    580    2985    3099  | 3.3 / 5.3 / 8.1
//    67 |    733    2994    3099  | 3.6 / 5.3 / 8.1
//    71 |    863    3004    3099  | 3.9 / 5.3 / 8.0
//    73 |    981    3011    3099  | 4.2 / 5.3 / 8.0
//    79 |   1071    3013    3099  | 4.5 / 5.4 / 8.0
//    83 |   1158    3016    3099  | 4.8 / 5.4 / 8.0
//    89 |   1249    3019    3099  | 5.1 / 5.5 / 8.0
//    97 |   1320    3021    3099  | 5.4 / 5.6 / 7.9
//   101 |   1395    3023    3099  | 5.7 / 5.8 / 7.9
//   103 |   1461    3025    3099  | 6.0 / 6.1 / 7.9
//   107 |   1540    3032    3099  | 6.3 / 6.4 / 7.9
//   109 |   1603    3033    3099  | 6.6 / 6.6 / 7.9
//   113 |   1654    3033    3099  | 6.9 / 6.9 / 7.9
//   127 |   1716    3037    3099  | 7.2 / 7.2 / 7.9
//   131 |   1767    3040    3099  | 7.5 / 7.5 / 8.0
//   137 |   1822    3045    3099  | 7.8 / 7.8 / 8.1
//   139 |   1873    3048    3099  | 8.1 / 8.1 / 8.3
//   149 |   1917    3049    3099  | 8.4 / 8.4 / 8.5
//   151 |   1957    3052    3099  | 8.7 / 8.7 / 8.8
//   157 |   2007    3055    3099  | 9.0 / 9.0 / 9.0
//   163 |   2057    3060    3099  | 9.3 / 9.3 / 9.3
//   167 |   2093    3061    3099  | 9.6 / 9.6 / 9.6
//   173 |   2139    3062    3099  | 9.9 / 9.9 / 9.9
//   179 |   2182    3063    3099  | 10.2 / 10.2 / 10.2
//   181 |   2216    3065    3099  | 10.5 / 10.5 / 10.5
//   191 |   2253    3069    3099  | 10.8 / 10.8 / 10.8
//   193 |   2282    3071    3099  | 11.1 / 11.1 / 11.1
//   197 |   2306    3071    3099  | 11.4 / 11.4 / 11.4
//   199 |   2338    3072    3099  | 11.7 / 11.7 / 11.7
//   211 |   2366    3073    3099  | 12.0 / 12.0 / 12.0
//   223 |   2403    3075    3099  | 12.3 / 12.3 / 12.3
//   227 |   2431    3076    3099  | 12.6 / 12.6 / 12.6
//   229 |   2458    3076    3099  | 12.9 / 12.9 / 12.9
//   233 |   2483    3076    3099  | 13.2 / 13.2 / 13.2
//   239 |   2499    3077    3099  | 13.5 / 13.5 / 13.5
//   241 |   2525    3078    3099  | 13.8 / 13.8 / 13.8
//   251 |   2549    3080    3099  | 14.1 / 14.1 / 14.1
//   257 |   2570    3081    3099  | 14.4 / 14.4 / 14.4
//   263 |   2590    3083    3099  | 14.8 / 14.8 / 14.8
//   269 |   2610    3083    3099  | 15.1 / 15.1 / 15.1
//   271 |   2624    3084    3099  | 15.4 / 15.4 / 15.4
//   277 |   2642    3086    3099  | 15.7 / 15.7 / 15.7
//   281 |   2660    3086    3099  | 16.0 / 16.0 / 16.0
//   283 |   2671    3086    3099  | 16.3 / 16.3 / 16.3
//   293 |   2686    3086    3099  | 16.6 / 16.6 / 16.6
//   307 |   2705    3087    3099  | 16.9 / 16.9 / 16.9
//   311 |   2719    3088    3099  | 17.2 / 17.2 / 17.2
//   313 |   2736    3088    3099  | 17.5 / 17.5 / 17.5
//   317 |   2749    3088    3099  | 17.8 / 17.8 / 17.8
//   331 |   2757    3088    3099  | 18.1 / 18.1 / 18.1
//   337 |   2769    3089    3099  | 18.4 / 18.4 / 18.4
//   347 |   2785    3090    3099  | 18.7 / 18.7 / 18.7
//   349 |   2796    3091    3099  | 19.0 / 19.0 / 19.0
//   353 |   2811    3091    3099  | 19.3 / 19.3 / 19.3
//   359 |   2821    3091    3099  | 19.6 / 19.6 / 19.6
//   367 |   2828    3091    3099  | 19.9 / 19.9 / 19.9
//   373 |   2845    3092    3099  | 20.2 / 20.2 / 20.2
//   379 |   2859    3093    3099  | 20.5 / 20.5 / 20.5
//   383 |   2869    3093    3099  | 20.8 / 20.8 / 20.8
//   389 |   2878    3093    3099  | 21.1 / 21.1 / 21.1
//   397 |   2890    3094    3099  | 21.4 / 21.4 / 21.4
//   401 |   2899    3094    3099  | 21.7 / 21.7 / 21.7
//   409 |   2908    3095    3099  | 22.0 / 22.0 / 22.0
//   419 |   2917    3096    3099  | 22.3 / 22.3 / 22.3
//   421 |   2921    3096    3099  | 22.6 / 22.6 / 22.6
//   431 |   2931    3096    3099  | 22.9 / 22.9 / 22.9
//   433 |   2938    3096    3099  | 23.2 / 23.2 / 23.2
//   439 |   2948    3097    3099  | 23.5 / 23.5 / 23.5
//   443 |   2956    3097    3099  | 23.8 / 23.8 / 23.8
//   449 |   2961    3097    3099  | 24.1 / 24.1 / 24.1
//   457 |   2967    3097    3099  | 24.4 / 24.4 / 24.4
//   461 |   2974    3097    3099  | 24.7 / 24.7 / 24.7
//   463 |   2984    3097    3099  | 25.0 / 25.0 / 25.0
//   467 |   2988    3097    3099  | 25.3 / 25.3 / 25.3
//   479 |   2993    3097    3099  | 25.6 / 25.6 / 25.6
//   487 |   2997    3097    3099  | 25.9 / 25.9 / 25.9
//   491 |   3000    3097    3099  | 26.2 / 26.2 / 26.2
//   499 |   3009    3097    3099  | 26.5 / 26.5 / 26.5
//   503 |   3013    3097    3099  | 26.8 / 26.8 / 26.8
//   509 |   3019    3098    3099  | 27.1 / 27.1 / 27.1
//   521 |   3026    3098    3099  | 27.4 / 27.4 / 27.4
//   523 |   3032    3098    3099  | 27.7 / 27.7 / 27.7
//   541 |   3035    3098    3099  | 28.0 / 28.0 / 28.0
//   547 |   3037    3098    3099  | 28.3 / 28.3 / 28.3
//   557 |   3044    3098    3099  | 28.6 / 28.6 / 28.6
//   563 |   3047    3098    3099  | 28.9 / 28.9 / 28.9
//   569 |   3049    3098    3099  | 29.2 / 29.2 / 29.2
//   571 |   3054    3098    3099  | 29.5 / 29.5 / 29.5
//   577 |   3055    3098    3099  | 29.8 / 29.8 / 29.8
//   587 |   3059    3098    3099  | 30.1 / 30.1 / 30.1
//   593 |   3063    3098    3099  | 30.4 / 30.4 / 30.4
//   599 |   3069    3098    3099  | 30.7 / 30.7 / 30.7
//   601 |   3074    3099    3099  | 31.0 / 31.0 / 31.0
//   607 |   3076    3099    3099  | 31.3 / 31.3 / 31.3
//   613 |   3080    3099    3099  | 31.6 / 31.6 / 31.6
//   617 |   3083    3099    3099  | 31.9 / 31.9 / 31.9
//   619 |   3085    3099    3099  | 32.2 / 32.2 / 32.2
//   631 |   3089    3099    3099  | 32.5 / 32.5 / 32.5
//   641 |   3090    3099    3099  | 32.8 / 32.8 / 32.8
//   643 |   3092    3099    3099  | 33.1 / 33.1 / 33.1
//   647 |   3094    3099    3099  | 33.4 / 33.4 / 33.4
//   653 |   3094    3099    3099  | 33.7 / 33.7 / 33.7
//   659 |   3096    3099    3099  | 34.0 / 34.0 / 34.0
//   661 |   3098    3099    3099  | 34.3 / 34.3 / 34.3
//   673 |   3099    3099    3099  | 34.6 / 34.6 / 34.6
//   677 |   3099    3099    3099  | 34.9 / 34.9 / 34.9
//   683 |   3099    3099    3099  | 35.2 / 35.2 / 35.2
//   691 |   3099    3099    3099  | 35.5 / 35.5 / 35.5
//   701 |   3099    3099    3099  | 35.8 / 35.8 / 35.8
//   709 |   3099    3099    3099  | 36.1 / 36.1 / 36.1
//   best tiered bound: 3099 at z0=109, d=5 (~10^7.9 terms) vs truth 3099; flat depth-3 gave 1351
//
// ===== SCALING TABLE (Poisson model; μ=Σ2/q over the scour; 1-class column uses μ/2) =====
//   x  |  ln W  |   μ(2-class) | depth needed | 1-class μ | depth | log10 #flat terms at needed depth
//   11 |    7.7 |     0.789    |       1      |  0.395    |   1   | 1.1
//   13 |   10.3 |     1.147    |       3      |  0.573    |   1   | 3.8
//   17 |   13.1 |     1.494    |       3      |  0.747    |   1   | 5.3
//   19 |   16.1 |     1.786    |       5      |  0.893    |   1   | 10.9
//   23 |   19.2 |     2.053    |       5      |  1.026    |   3   | 13.9
//   29 |   22.6 |     2.305    |       7      |  1.153    |   3   | 23.3
//   31 |   26.0 |     2.524    |       7      |  1.262    |   3   | 28.1
//   37 |   29.6 |     2.729    |       7      |  1.365    |   3   | 33.1
//   41 |   33.3 |     2.917    |       9      |  1.458    |   3   | 48.6
//   43 |   37.1 |     3.084    |       9      |  1.542    |   3   | 55.5
//   47 |   41.0 |     3.239    |       9      |  1.619    |   5   | 62.7
//   53 |   44.9 |     3.386    |      11      |  1.693    |   5   | 84.9
//   59 |   49.0 |     3.526    |      11      |  1.763    |   5   | 94.2
//   71 |   61.6 |     3.892    |      11      |  1.946    |   5   | 123.1
//   89 |   79.2 |     4.294    |      13      |  2.147    |   5   | 192.9
//  113 |  107.1 |     4.784    |      15      |  2.392    |   7   | 310.7
//  127 |  111.9 |     4.857    |      15      |  2.428    |   7   | 326.2
// ============================================================================
// READINGS
// 1. THE CERTIFICATE WORKS AT EVERY COMPUTED LEVEL — and we know exactly why.
//    Certified lower bounds on Natal@5 survivors (= twins in (√W, W), verified
//    against a real sieve at all three levels): @11 depth-1 already certifies
//    17 > 0 (capacity S1/N = 0.811 < 1, so even the union bound leaves change);
//    @13 depth-1 fails (−145; capacity 1.146 > 1 — the removal-ledger's
//    overshoot, reproduced here per-tile as mean h = S1/N), but depth-3
//    certifies 274 of the true 307 (89% = 274/307 from the rows above); @17 depth-3 certifies 1351 of 3099
//    (44% = 1351/3099) and depth-5 certifies 3058 (98.7% = 3058/3099). First positive odd depth:
//    m = 1, 3, 3. Bonferroni does NOT die at these tile levels.
// 2. WHY IT WORKS — the whole ladder is the hit histogram. B_m(odd) =
//    survivors − Σ_{hit r} C(h(r)−1, m), so the deficit at depth m is the
//    histogram tail, and the ladder is EXACT at depth max(h) = 3, 5, 6.
//    Despite 120 scour primes at @17, no slot is hit by more than 6 of them
//    (r(r+2) < W² simply hasn't room for many factors in (17, √W]). Truncated
//    I-E is a complete, finite, per-tile proof technology as long as max(h)
//    stays small — and max(h) creeps up by ~1 per level.
// 3. CRT HEALTH: singles are near-perfect (ratio 0.9997 @13), pairs run ~3%
//    UNDER the 4N/qq' prediction (0.9693 @13, 0.9744 @17), triples ~7–15% under
//    (0.8468 @13, 0.9277 @17). The deviation is systematically NEGATIVE in
//    higher order: inside the natal set, scour classes overlap LESS than
//    independence predicts. Kind sign — thin overlaps make S2, S3 smaller and
//    the odd-depth lower bounds tighter than the CRT model would promise.
//    Per-term deviations are O(1) slots (rms < 1 for pairs/triples); the
//    danger at scale is never the size of one deviation, it is the count of
//    terms carrying one.
// 4. BRUN'S GRADING BEATS FLAT DEPTH ~500× (= 10^5.5 / 10^2.8 from the @17 rows), AND THE THRESHOLD IS THE TEXTBOOK
//    LAW. Tiered certificate (exact on q ≤ z0, union bound d=1 above): the
//    bound is positive iff the large primes' load Σ_{z0<q≤√W} 2/q < ~1, i.e.
//    z0 > (√W)^{e^{−1/2}} ≈ (714.5)^{0.6065} = 53.8 at @17 — and measured:
//    z0=53 certifies +220 (10^2.8 terms), z0=47 fails at −30. Flat depth-3
//    needs 10^5.5 terms to certify 1351. A single-class sieve would need only
//    z0 > (√W)^{e^{−1}} ≈ 11: the twin problem's 2 residue classes push the
//    expensive exact tier from the 0.37-power to the 0.61-power of √W. That
//    exponent gap IS the quantified "2/q doubles the trouble."
// 5. WHERE FIXED DEPTH COLLAPSES: needed odd depth ≈ e·μ with μ = Σ_scour 2/q
//    ≈ 2·ln(ln√W / ln x). Depth-1 dies after @11; depth-3 dies between @17
//    and @19 (μ crosses ~1.6: 1.494 @17, 1.786 @19); depth-5 by @29; every fixed depth dies at a
//    finite level, and needed depth marches 1,3,3,5,5,7,…,15 by @127. The
//    depth itself grows only like ln ln W — Brun's pure-sieve constraint (an
//    asymptotic only for log z ≲ log X / log log X, Cojocaru–Murty Thm 6.1.2;
//    our z = √W violates it maximally) — but the flat term count at needed
//    depth is the real executioner: 10^3.8 @13, 10^10.9 @19, 10^48.6 @41,
//    10^326.2 @127. The certificate never goes wrong; it goes UNPAYABLE.
// 6. VERDICT. Best certified per-tile lower bounds achieved: @11: 45 = truth
//    (flat depth-3, 10^2.2 terms); @13: 307 = truth (tiered z0=67 d=5,
//    10^4.6 terms; flat depth-3 gives 274); @17: 3099 = truth (tiered z0=109
//    d=5, 10^7.9 terms; flat depth-5 gives 3058). Truncated I-E is a genuine
//    certificate technology for tiles — it certifies twins exist in (√W, W)
//    at @13 and @17 from counting alone, no primality tests. But it is
//    VERIFICATION, not a road to the wall: cost super-exponentiates precisely
//    as the level grows, because μ grows like 2 ln x along the tile tower and
//    the graded exact-tier boundary (√W)^{0.61} grows as a power of the tile.
//    Note also the certificates bound survivors, not all twins: the 2/6/16
//    self-struck twins in (x, √W] sit inside ∪A_q (each is a twin FOUND, per
//    the self-strike theorem) and are consistently excluded from both sides.
// 7. MOST PROMISING CRACK: reading 3. The pair/triple terms sit BELOW their
//    CRT means, tile after tile, by a stable few percent — a structural
//    negative correlation in how scour classes overlap the natal set. If that
//    deficit had a proven sign (even just for pairs: S2 ≤ Σ 4N/qq'), the
//    even-depth Bonferroni UPPER bounds inherit it unconditionally, and the
//    odd-depth lower bounds could be evaluated from CRT formulas instead of
//    enumeration — a certificate whose cost no longer counts subsets. Measure
//    the pair deficit's sign and size across many tiles before believing it.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run does not contain
// verbatim actually is. No number above was changed. The forward pointer at
// the top of this file already supersedes readings 3 and 7 on their substance;
// none of the figures classified here belongs to those two readings.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   98.7% in reading 1 is 3058/3099 = 98.68%, both counts printed in the @17
//   flat row.
//   ~500x in reading 4 is the ratio of the two printed term counts for @17,
//   10^5.5 for flat depth-3 and 10^2.8 for the tiered z0=53 row: 10^2.7 =
//   501.
//   53.8 in reading 4 is (714.5)^0.6065, the printed @17 sqrt(W) raised to
//   e^{-1/2}. The companion "~11" for the single-class sieve is the same base
//   raised to e^{-1}, which gives 11.22.
//
// SAME VALUES, DIFFERENT LAYOUT:
//   "1,3,3,5,5,7,…,15 by @127" in reading 5 is the "depth needed" column of
//   the printed scaling table, read down from @11 and elided in the middle.
//   The full printed column is 1, 3, 3, 5, 5, 7, 7, 7, 9, 9, 9, 11, 11, 11,
//   13, 15, 15.
//
// DEFINITION / LITERATURE constants:
//   0.6065 is e^{-1/2} = 0.60653 and 0.61 is the same number to two places;
//   0.37 is e^{-1} = 0.36788. These are the Brun threshold exponents for the
//   two-class and the one-class sieve, not measurements.
// ---------------------------------------------------------------------------
