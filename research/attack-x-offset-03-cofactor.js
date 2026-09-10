// ============================================================================
// ATTACK-X-OFFSET 03 — THE COFACTOR-ONE LAYER: A DERIVED ENRICHMENT LAW
// (2026-08-20 — TODO item X: the first exactly-derived component of the
//  joint-deficit census)
// ============================================================================
// WHY. The mixed super-W census behind the ~3.8 law counts, among other
// things, natal r that carry a scour PAIR divisor d = q₁q₂ with d close to W.
// For d ∈ (W/2^{s+1}, W/2^s] with 2^{s+1} below the smallest scour prime, the
// ONLY multiple of d in [0,W) that can be natal is r = d itself (the cofactor
// m must be a unit mod 30 with no prime factor ≤ x, and the smallest such
// m > 1 is the smallest scour prime). On that layer the smooth CRT model —
// the census's denominator — spreads natal density (2/30)·∏_{7≤p≤x}(p−2)/p
// uniformly, but r = d is a product of two primes > x, hence automatically a
// unit mod 30 (2/8 chance of landing on the 11/17 line) and automatically
// coprime to every base prime (so only the r+2-side condition bites, at
// (p−2)/(p−1) per prime). DERIVED LAYER LAW:
//
//     #{natal r ∈ strip} = #{pairs q₁q₂ ∈ strip} · (1/4)·∏_{7≤p≤x}(p−2)/(p−1)
//
// an ENRICHMENT over the smooth model of exactly
//
//     (30/8)·∏_{7≤p≤x} p/(p−1)  =  ∏_{p≤x} p/(p−1)  →  e^γ·ln x   (Mertens).
//
// This is the mechanism of the census's far-super-W SURPLUS (the negative-D
// octaves of `research/attack-x-offset-02-profile.js`): the small-cofactor
// layers are natal-enriched by a factor growing like e^γ ln x, they push J
// UP, and they are exactly derivable. The bulk deficit is the opposing
// component; 1 − J = 4S₂ fits the NET. This file tests the layer law to the
// integer at four strips per level, @19 through @31.
//
// WHAT THE UNIFORMITY ASSUMPTION IS. The derivation treats q₁q₂ as
// equidistributed over the 8 units mod 30 and over the (p−1) nonzero classes
// mod each base prime, jointly. The test below is therefore also a
// measurement of that equidistribution at the strip population.
//
// UNITS. Counts and their ratios; no σ is attached — both sides are exact
// integers/arithmetic, and the reported quantity is the relative deviation.
//
//   node research/attack-x-offset-03-cofactor.js
// ============================================================================
'use strict';
const T00=Date.now();
const el=()=>((Date.now()-T00)/1000).toFixed(1)+'s';
const say=(s)=>process.stderr.write(s+'\n');
const f=(v,d=4)=>Number.isFinite(v)?v.toFixed(d):String(v);
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}

const NSTRIP=4;   // strips s = 0..3: d ∈ (W/2^{s+1}, W/2^s]; 2^4 = 16 < 19 ≤ q_min at every level here
console.log('ATTACK-X-OFFSET 03 — the cofactor-one layer: derived enrichment ∏_{p≤x} p/(p−1)');
console.log(`strips s = 0..${NSTRIP-1}: d = q₁q₂ ∈ (W/2^{s+1}, W/2^s], where the only eligible cofactor is m = 1\n`);
for(const x of [19,23,29,31]){
  const basePs=primesUpTo(x).filter(p=>p>=7);
  const W=30*basePs.reduce((a,b)=>a*b,1);
  const qs=primesUpTo(Math.floor(Math.sqrt(W))+1).filter(q=>q>x&&q*q<=W);
  const K=qs.length;
  if(2**NSTRIP>=qs[0])throw new Error('strip range collides with the smallest scour prime');
  // derived densities
  const pNatal=0.25*basePs.reduce((a,p)=>a*(p-2)/(p-1),1);     // P(natal | r = q1q2)
  const pSmooth=(2/30)*basePs.reduce((a,p)=>a*(p-2)/p,1);       // smooth CRT natal density
  const enr=basePs.reduce((a,p)=>a*p/(p-1),1)*3.75;             // = ∏_{p≤x} p/(p−1)
  const eGlnx=Math.exp(0.5772156649015329)*Math.log(x);
  console.log(`===== @${x}: W=${W} K=${K}  derived P(natal|layer)=${f(pNatal,6)}  smooth=${f(pSmooth,6)}  enrichment=${f(enr)}  (e^γ·ln x = ${f(eGlnx)})`);
  // strip loop: for each i, j-range so that q_i q_j ∈ (W/16, W]; classify strip
  const pairs=new Float64Array(NSTRIP),natal=new Float64Array(NSTRIP);
  const lo=W/2**NSTRIP;
  let checked=0;
  for(let i=0;i<K;i++){
    const qi=qs[i];
    if(qi*qs[K-1]<=lo)continue;
    // find first j > i with qi*qs[j] > lo (binary search)
    let a0=i+1,b0=K;
    while(a0<b0){const m=(a0+b0)>>1;if(qi*qs[m]>lo)b0=m;else a0=m+1;}
    for(let j=a0;j<K;j++){
      const r=qi*qs[j];
      if(r>=W)break;
      let s=0,t=W/2;                       // strip: largest s with r <= W/2^s
      while(s<NSTRIP-1&&r<=t){s++;t/=2;}
      // s now: r ∈ (W/2^{s+1}, W/2^s] by construction of the scan
      pairs[s]++;checked++;
      const c=r%30;
      if(c!==11&&c!==17)continue;
      let ok=true;
      for(const p of basePs){const u=r%p;if(u===0||u===p-2){ok=false;break;}}
      if(ok)natal[s]++;
    }
    if(K>20000&&i%Math.ceil(K/10)===0)say(`   @${x} i=${i}/${K} checked=${checked}  [${el()}]`);
  }
  let tp=0,tn=0;
  for(let s=0;s<NSTRIP;s++){
    const pred=pairs[s]*pNatal,dev=natal[s]/pred-1;
    tp+=pairs[s];tn+=natal[s];
    console.log(`  strip s=${s}: pairs=${pairs[s]}  natal(measured)=${natal[s]}  derived=${f(pred,1)}  rel dev=${f(100*dev,3)}%  smooth would say ${f(pairs[s]*pSmooth,1)}`);
  }
  const predAll=tp*pNatal;
  console.log(`  ALL strips: pairs=${tp}  natal=${tn}  derived=${f(predAll,1)}  rel dev=${f(100*(tn/predAll-1),3)}%  measured enrichment=${f(tn/(tp*pSmooth))} vs derived ${f(enr)}`);
  console.log(`  [level ${el()}]\n`);
}
console.log(`[total ${el()}]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/attack-x-offset-03-cofactor.js
//   invocation:  node research/attack-x-offset-03-cofactor.js
//   code-sha256: 2f334b44e581a18c057bd07f494f59152222ab39a295d1a9f1423f64accf1e42
//   out-sha256:  5691b341630bf0e54a369f2ed9eb1633a28a53d5868e623eba22e753869f6c77
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     116.8 s
// ============================================================================
// ATTACK-X-OFFSET 03 — the cofactor-one layer: derived enrichment ∏_{p≤x} p/(p−1)
// strips s = 0..3: d = q₁q₂ ∈ (W/2^{s+1}, W/2^s], where the only eligible cofactor is m = 1
//
// ===== @19: W=9699690 K=435  derived P(natal|layer)=0.152181  smooth=0.026027  enrichment=5.8471  (e^γ·ln x = 5.2443)
//   strip s=0: pairs=11572  natal(measured)=1761  derived=1761.0  rel dev=-0.002%  smooth would say 301.2
//   strip s=1: pairs=20756  natal(measured)=3191  derived=3158.7  rel dev=1.024%  smooth would say 540.2
//   strip s=2: pairs=19223  natal(measured)=2889  derived=2925.4  rel dev=-1.243%  smooth would say 500.3
//   strip s=3: pairs=14914  natal(measured)=2293  derived=2269.6  rel dev=1.030%  smooth would say 388.2
//   ALL strips: pairs=66465  natal=10134  derived=10114.7  rel dev=0.191%  measured enrichment=5.8583 vs derived 5.8471
//   [level 0.0s]
//
// ===== @23: W=223092870 K=1739  derived P(natal|layer)=0.145264  smooth=0.023763  enrichment=6.1129  (e^γ·ln x = 5.5845)
//   strip s=0: pairs=191959  natal(measured)=27876  derived=27884.7  rel dev=-0.031%  smooth would say 4561.6
//   strip s=1: pairs=333131  natal(measured)=48404  derived=48391.8  rel dev=0.025%  smooth would say 7916.3
//   strip s=2: pairs=304596  natal(measured)=44227  derived=44246.7  rel dev=-0.045%  smooth would say 7238.2
//   strip s=3: pairs=232081  natal(measured)=33769  derived=33712.9  rel dev=0.166%  smooth would say 5515.0
//   ALL strips: pairs=1061767  natal=154276  derived=154236.2  rel dev=0.026%  measured enrichment=6.1145 vs derived 6.1129
//   [level 0.1s]
//
// ===== @29: W=6469693230 K=7863  derived P(natal|layer)=0.140076  smooth=0.022125  enrichment=6.3312  (e^γ·ln x = 5.9974)
//   strip s=0: pairs=4017982  natal(measured)=562837  derived=562821.6  rel dev=0.003%  smooth would say 88896.1
//   strip s=1: pairs=6929780  natal(measured)=970936  derived=970693.7  rel dev=0.025%  smooth would say 153318.4
//   strip s=2: pairs=6258534  natal(measured)=876742  derived=876668.4  rel dev=0.008%  smooth would say 138467.3
//   strip s=3: pairs=4720729  natal(measured)=661118  derived=661259.3  rel dev=-0.021%  smooth would say 104444.1
//   ALL strips: pairs=21927025  natal=3071633  derived=3071443.0  rel dev=0.006%  measured enrichment=6.3316 vs derived 6.3312
//   [level 2.6s]
//
// ===== @31: W=200560490130 K=37534  derived P(natal|layer)=0.135406  smooth=0.020697  enrichment=6.5423  (e^γ·ln x = 6.1162)
//   strip s=0: pairs=93888636  natal(measured)=12713699  derived=12713131.0  rel dev=0.004%  smooth would say 1943229.4
//   strip s=1: pairs=160461491  natal(measured)=21728189  derived=21727527.9  rel dev=0.003%  smooth would say 3321099.4
//   strip s=2: pairs=143567277  natal(measured)=19440144  derived=19439941.7  rel dev=0.001%  smooth would say 2971436.9
//   strip s=3: pairs=107295393  natal(measured)=14527795  derived=14528493.0  rel dev=-0.005%  smooth would say 2220711.4
//   ALL strips: pairs=505212797  natal=68409827  derived=68409093.6  rel dev=0.001%  measured enrichment=6.5423 vs derived 6.5423
//   [level 116.7s]
//
// [total 116.7s]
// ───── stderr ─────
//    @31 i=3754/37534 checked=2775588  [3.3s]
//    @31 i=7508/37534 checked=65305833  [17.1s]
//    @31 i=11262/37534 checked=160143212  [38.0s]
//    @31 i=15016/37534 checked=251716411  [58.5s]
//    @31 i=18770/37534 checked=329197094  [76.1s]
//    @31 i=22524/37534 checked=392585261  [90.5s]
//    @31 i=26278/37534 checked=441880912  [101.9s]
//    @31 i=30032/37534 checked=477084047  [110.1s]
//    @31 i=33786/37534 checked=498194666  [115.0s]
// ============================================================
// READINGS
//
// 1. THE LAYER LAW IS EXACT AT THE PRECISION OF THE POPULATION. Aggregated
//    over the four strips the relative deviation of the measured natal count
//    from pairs·(1/4)·∏(p−2)/(p−1) is +0.191% (@19, n = 10,134), +0.026%
//    (@23), +0.006% (@29), +0.001% (@31, n = 68,409,827 over 5.05e8 pairs).
//    The deviations shrink like a fluctuation, not like a bias: the
//    equidistribution assumption (q₁q₂ uniform over the units mod 30 and the
//    nonzero classes mod each base prime) is not measurably wrong anywhere
//    the census can see.
//
// 2. THE ENRICHMENT IS MERTENS'S PRODUCT AND IT GROWS. Measured enrichment
//    over the smooth CRT density: 5.8583, 6.1145, 6.3316, 6.5423 at
//    @19..@31, against the derived ∏_{p≤x} p/(p−1) = 5.8471, 6.1129, 6.3312,
//    6.5423 — and e^γ·ln x below it (5.24..6.12). The small-cofactor layers
//    of the joint census are therefore a POSITIVE, DERIVED, GROWING-factor
//    component pushing J up, opposed to the bulk deficit. The ~3.8 law fits
//    the net of the two.
//
// 3. WHY THE LAYER IS PURE. Below the smallest scour prime the eligible
//    cofactors of a scour pair are exactly {1}: every even m misses the
//    11/17 line, every m with a base-prime factor kills natality on the
//    r-side, and the first survivor is the smallest scour prime itself,
//    which turns the pair into a scour triple and leaves the layer. The
//    strip boundary 2^4 = 16 < q_min is asserted in code.
