// ============================================================================
// ATTACK 9: MIRROR PAIRING — does the palindrome force EXACT kill-splitting?
// (2026-08-14, natal-cap series)
// ============================================================================
// FORWARD POINTER (2026-08-15, night-run reconciliation).
//   - The candidate theorem below is REFUTED as stated: exact mirror
//     strike-invariance needs q | W, which no scour prime satisfies. The
//     refutation is on the night ledger's visible list.
//   - The house-split sighting this file fed into the "anchored calm" is
//     DISSOLVED: natal-cap-13-anchored-calm.js reading 2(c) shows the ENTIRE
//     rotation ensemble is sub-binomial (mean SP = 0.369/0.346/0.267 against
//     the binomial 0.8), so "0.3 vs 0.8" was a property of every rotation,
//     exactly as reading 4 below suspected. Worse for the sighting: at @17
//     the anchor sits at the 73.7th percentile, on the UNEVEN side of its own
//     ensemble. As an anchored sighting, refuted.
//   - What survives is the salvage, still unclaimed: Δgross(q) read as an
//     anchored partial-period discrepancy, to be bounded inside the attack-03
//     error framework. Parked in TODO.md.
//   - The mirror itself is load-bearing elsewhere and is proven there: it
//     glues the anchor's two strike classes into one fused window
//     (natal-cap-19-calm-lemma.md) and makes W/2 the unique mirror-fixed,
//     provably variance-doubled phase.
// ============================================================================
// The tile is a palindrome under the twin mirror  μ(r) = W − 2 − r.  Measured
// so far: kill percentages are nearly equal across House 11 and House 17 —
// but only STATISTICALLY.  Question posed in memory and never explored:
// what does the mirror buy beyond raw counts?
//
// CANDIDATE THEOREM (the hoped-for exactness):  for a scour prime q, the
// strike set {r ≡ 0 or −2 mod q} is μ-invariant, hence gross(q) — and, since
// unions of invariant sets are invariant, fresh(q) too — splits EXACTLY
// evenly between the two houses (up to μ-fixed points).  If true, every kill
// at r would force a kill at μ(r) BY THE SAME q, the Scour would aim at W/2
// targets instead of W, and survivors would come in forced mirror pairs.
//
// THE ALGEBRA, done honestly, splits into two regimes:
//   WHEEL primes p | W (2,3,5,7..x):  μ(r) ≡ −2 − r (mod p) exactly, so μ
//     swaps the forbidden classes 0 ↔ −2 and the houses 11 ↔ 17 (mod 30:
//     −11−2 ≡ 17, −17−2 ≡ 11).  μ maps N_x onto N_x, exactly.
//   SCOUR primes q ∤ W (x < q ≤ √W):  μ(r) ≡ (W−2) − r (mod q), and W ≢ 0
//     (mod q).  The strike residues {0, −2} map to {W−2, W} (mod q).  For
//     invariance we'd need {W, W−2} ≡ {0, −2} as sets mod q, i.e. q | W
//     (impossible) or W ≡ −2 & W ≡ 2 → q | 4 (impossible).  So the strike
//     set of a scour prime is NEVER μ-invariant.  The candidate theorem
//     should be FALSE — μ maps q's strikes to a PHANTOM scour at residues
//     {W, W−2} mod q, not back to q's own strikes.
//
// This script verifies the wheel-side exactness, hunts for any surviving
// scour-side exactness (gross and fresh splits, per prime, per level), tests
// mirror-pairing of the final survivors, and answers the variance question:
// does folding the tile in half (mirror halves the sample) change Var/E²?
// Refutations are results.  Levels @7,@11,@13 exact, @17 included (cheap).
// ============================================================================

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}

const LEVELS = [
  {x:7,  base:[2,3,5,7]},
  {x:11, base:[2,3,5,7,11]},
  {x:13, base:[2,3,5,7,11,13]},
  {x:17, base:[2,3,5,7,11,13,17]},
];

function natalSet(base){
  const W = base.reduce((a,b)=>a*b,1);
  const mids = base.filter(p=>p>=7);
  const N=[];
  for(let r=11;r<W;r+=30) N.push(r);
  for(let r=17;r<W;r+=30) N.push(r);
  N.sort((a,b)=>a-b);
  return {W, slots: N.filter(r=>mids.every(p=>{const m=r%p; return m!==0 && m!==p-2;}))};
}
const house = r => r%30;                       // 11 or 17
const mu = (r,W) => W-2-r;

for(const {x, base} of LEVELS){
  const {W, slots} = natalSet(base);
  const inN = new Uint8Array(W); for(const r of slots) inN[r]=1;
  const sqrtW = Math.sqrt(W);
  const scour = primesUpTo(Math.floor(sqrtW)).filter(q=>q>x);
  const h11 = slots.filter(r=>house(r)===11).length;
  const h17 = slots.length - h11;
  console.log(`\n===== @${x}: W=${W}, |N|=${slots.length} (H11=${h11}, H17=${h17}), scour ${scour[0]}..${scour[scour.length-1]} =====`);

  // ---- PART 0: μ is an involution on N_x, swaps houses, fixed points ----
  let bad=0, noswap=0, fixed=0;
  for(const r of slots){
    const m = mu(r,W);
    if(!inN[m]) bad++;
    else if(house(m) === house(r)) noswap++;
    if(m===r) fixed++;
  }
  // the two solutions of 2r ≡ W−2 (mod W) in [0,W): W/2−1 and W−1
  const f1=W/2-1, f2=W-1;
  console.log(`P0  μ(N)=N violations: ${bad}; same-house images: ${noswap}; fixed pts in N: ${fixed}`+
              ` (candidates ${f1}≡${f1%30}, ${f2}≡${f2%30} mod 30 — neither ≡11/17)`);

  // ---- PART 1: gross strikes per scour prime — exact split? ----
  // S_q = {r in N : r≡0 or −2 mod q}.  Test μ-invariance and house split.
  let anyInv=0, nzGross=0, maxAbsG=0, sumG=0, coincid=[];
  const grossRows=[];
  for(const q of scour){
    const wq = W%q;
    if(wq===0 || wq===2 || wq===q-2) coincid.push(q); // would partially align strike residues
    let g11=0, g17=0, invariant=true;
    for(const r of slots){
      const m=r%q;
      if(m===0 || m===q-2){
        if(house(r)===11) g11++; else g17++;
        const mm = mu(r,W)%q;
        if(!(mm===0 || mm===q-2)) invariant=false;   // image left the strike set
      }
    }
    if(invariant && g11+g17>0) anyInv++;
    const d = g11-g17;
    if(d!==0) nzGross++;
    if(Math.abs(d)>maxAbsG) maxAbsG=Math.abs(d);
    sumG+=d;
    grossRows.push({q, g11, g17, d});
  }
  console.log(`P1  gross: μ-invariant strike sets: ${anyInv}/${scour.length}`+
              `; q with W≡0,±2 (mod q): [${coincid.join(',')}]`);
  console.log(`    Δgross(q)=|S∩H11|−|S∩H17|: nonzero for ${nzGross}/${scour.length} primes,`+
              ` max|Δ|=${maxAbsG}, ΣΔ=${sumG}`);
  console.log(`    first rows: `+grossRows.slice(0,8).map(r=>`q=${r.q}:${r.g11}/${r.g17}(Δ${r.d>=0?'+':''}${r.d})`).join('  '));

  // sanity: the EXACT identity the mirror does give: |S∩H11| = |μ(S)∩H17|
  {
    let ok=true;
    for(const q of scour.slice(0,5)){
      let a=0,b=0;
      for(const r of slots){
        const m=r%q;
        if((m===0||m===q-2) && house(r)===11) a++;
        const mm=mu(r,W)%q;                     // r ∈ μ(S_q) ⟺ μ(r) ∈ S_q
        if((mm===0||mm===q-2) && house(r)===17) b++;
      }
      if(a!==b) ok=false;
    }
    console.log(`    exact identity |S_q∩H11| = |μ(S_q)∩H17| (checked 5 primes): ${ok}`);
  }

  // the mirror's exact REFORMULATION of the house split: applying μ:H11→H17,
  //   Δgross(q) = #{r∈H11∩N : r ≡ 0,−2 (q)} − #{r∈H11∩N : r ≡ W,W−2 (q)}
  // — a 4-residue-class discrepancy of ONE house mod q.  Verify + compare to
  // the random-split scale sqrt(gross) (binomial σ if strikes coin-flipped).
  {
    let ok=true, sumRatio=0, nR=0;
    for(let i=0;i<grossRows.length;i++){
      const {q, g11, g17, d} = grossRows[i];
      const wr=W%q, wr2=((W-2)%q+q)%q;
      let a=0,b=0;
      for(const r of slots){
        if(house(r)!==11) continue;
        const m=r%q;
        if(m===0||m===q-2) a++;
        if(m===wr||m===wr2) b++;
      }
      if(a-b !== d) ok=false;
      const gross=g11+g17;
      if(gross>=10){ sumRatio+=Math.abs(d)/Math.sqrt(gross); nR++; }
    }
    console.log(`    reformulation Δgross = one-house discrepancy D(0,−2)−D(W,W−2): verified ${ok}`+
                `; mean |Δ|/√gross = ${nR? (sumRatio/nR).toFixed(3) : 'n/a'} over ${nR} primes (random split ⇒ ≈0.8)`);
  }

  // ---- PART 2: the MARCH — fresh kills per house; alive-set asymmetry ----
  const alive = new Uint8Array(W); for(const r of slots) alive[r]=1;
  let nzFresh=0, maxAbsF=0, sumF=0;
  const freshRows=[];
  for(const q of scour){
    let f11=0, f17=0;
    for(const r of slots){
      if(!alive[r]) continue;
      const m=r%q;
      if(m===0 || m===q-2){ alive[r]=0; if(house(r)===11) f11++; else f17++; }
    }
    // mirror asymmetry of the alive set right after q
    let asym=0, na=0;
    for(const r of slots){ if(alive[r]){ na++; if(!alive[mu(r,W)]) asym++; } }
    const d=f11-f17;
    if(d!==0) nzFresh++;
    if(Math.abs(d)>maxAbsF) maxAbsF=Math.abs(d);
    sumF+=d;
    freshRows.push({q, f11, f17, d, asym, na});
  }
  console.log(`P2  fresh: Δfresh(q) nonzero for ${nzFresh}/${scour.length} primes, max|Δ|=${maxAbsF}, ΣΔ=${sumF}`);
  console.log(`    first rows: `+freshRows.slice(0,8).map(r=>`q=${r.q}:${r.f11}/${r.f17}(Δ${r.d>=0?'+':''}${r.d})`).join('  '));
  const last=freshRows[freshRows.length-1];
  console.log(`    alive-set mirror asymmetry: after first prime ${freshRows[0].asym}/${freshRows[0].na},`+
              ` after last prime ${last.asym}/${last.na} unpaired`);

  // survivors: mirror pairs vs singles
  let pairs=0, singles=0; const singleEx=[];
  for(const r of slots){
    if(!alive[r]) continue;
    const m=mu(r,W);
    if(alive[m]){ if(r<m) pairs++; }
    else { singles++; if(singleEx.length<4) singleEx.push(r); }
  }
  const expPairs = last.na*last.na/(2*slots.length);   // independence baseline
  console.log(`    survivors: ${last.na} total = ${pairs} mirror pairs + ${singles} singles`+
              (singles?` (e.g. r=${singleEx.join(',')}: μ(r) is dead)`:''));
  console.log(`    mirror-pair independence test: observed ${pairs} pairs vs S²/(2|N|)=${expPairs.toFixed(1)} if survival of r and μ(r) were independent`);
}

// ---- PART 3: HALF-TILE VARIANCE @13 — does the mirror halve Var/E²? ----
// Window counts N(t) = #{natal slots in cyclic [t,t+L)} over the @13 tile.
// The pattern satisfies A(μ(r))=A(r), so N(t) = N(t') with t' = W−1−L−t mod W:
// the rotation ensemble is itself mirror-paired.  Folding to half the
// rotations therefore reproduces the SAME population — Var/E² cannot drop.
console.log(`\n===== PART 3: half-tile variance @13 =====`);
{
  const {W, slots} = natalSet([2,3,5,7,11,13]);
  const A = new Uint8Array(W); for(const r of slots) A[r]=1;
  for(const L of [210, 2310]){
    // full scan of all W rotations (cyclic)
    let N=0; for(let i=0;i<L;i++) N+=A[i];
    const counts=new Array(W);
    for(let t=0;t<W;t++){ counts[t]=N; N+=A[(t+L)%W]-A[t]; }
    // exact rotation-pairing check: N(t) == N(W-1-L-t mod W) for ALL t
    let pairViol=0;
    for(let t=0;t<W;t++){ const tp=((W-1-L-t)%W+W)%W; if(counts[t]!==counts[tp]) pairViol++; }
    const stat=(arr)=>{let s=0,s2=0;for(const v of arr){s+=v;s2+=v*v;}const m=s/arr.length;return{E:m,V:s2/arr.length-m*m};};
    const full=stat(counts);
    const half=stat(counts.slice(0,W/2));           // naive half, doubled counts = same stats
    console.log(`  L=${L}: rotation-pairing N(t)=N(W-1-L-t) violations: ${pairViol}/${W}`);
    console.log(`    full  tile: E=${full.E.toFixed(4)}  Var=${full.V.toFixed(4)}  Var/E²=${(full.V/full.E**2).toFixed(6)}`);
    console.log(`    half  tile: E=${half.E.toFixed(4)}  Var=${half.V.toFixed(4)}  Var/E²=${(half.V/half.E**2).toFixed(6)}`+
                `  ratio=${((half.V/half.E**2)/(full.V/full.E**2)).toFixed(4)}`);
  }
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-09-mirror.js
//   invocation:  node research/natal-cap-09-mirror.js
//   code-sha256: b4e2c4760c4e86b43080d9f9ba9c4199a2986b48546101424c2bbf3b47174245
//   out-sha256:  798c0f360e849d953ee41d1516803187724e154b9654330f536c7ee8d710f6e0
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.3 s
// ============================================================================
//
// ===== @7: W=210, |N|=10 (H11=5, H17=5), scour 11..13 =====
// P0  μ(N)=N violations: 0; same-house images: 0; fixed pts in N: 0 (candidates 104≡14, 209≡29 mod 30 — neither ≡11/17)
// P1  gross: μ-invariant strike sets: 0/2; q with W≡0,±2 (mod q): [13]
//     Δgross(q)=|S∩H11|−|S∩H17|: nonzero for 1/2 primes, max|Δ|=1, ΣΔ=1
//     first rows: q=11:1/0(Δ+1)  q=13:1/1(Δ+0)
//     exact identity |S_q∩H11| = |μ(S_q)∩H17| (checked 5 primes): true
//     reformulation Δgross = one-house discrepancy D(0,−2)−D(W,W−2): verified true; mean |Δ|/√gross = n/a over 0 primes (random split ⇒ ≈0.8)
// P2  fresh: Δfresh(q) nonzero for 2/2 primes, max|Δ|=1, ΣΔ=0
//     first rows: q=11:1/0(Δ+1)  q=13:0/1(Δ-1)
//     alive-set mirror asymmetry: after first prime 1/9, after last prime 2/8 unpaired
//     survivors: 8 total = 3 mirror pairs + 2 singles (e.g. r=41,197: μ(r) is dead)
//     mirror-pair independence test: observed 3 pairs vs S²/(2|N|)=3.2 if survival of r and μ(r) were independent
//
// ===== @11: W=2310, |N|=90 (H11=45, H17=45), scour 13..47 =====
// P0  μ(N)=N violations: 0; same-house images: 0; fixed pts in N: 0 (candidates 1154≡14, 2309≡29 mod 30 — neither ≡11/17)
// P1  gross: μ-invariant strike sets: 0/10; q with W≡0,±2 (mod q): [17]
//     Δgross(q)=|S∩H11|−|S∩H17|: nonzero for 8/10 primes, max|Δ|=3, ΣΔ=-3
//     first rows: q=13:6/7(Δ-1)  q=17:5/5(Δ+0)  q=19:4/6(Δ-2)  q=23:3/5(Δ-2)  q=29:3/4(Δ-1)  q=31:3/3(Δ+0)  q=37:3/1(Δ+2)  q=41:4/1(Δ+3)
//     exact identity |S_q∩H11| = |μ(S_q)∩H17| (checked 5 primes): true
//     reformulation Δgross = one-house discrepancy D(0,−2)−D(W,W−2): verified true; mean |Δ|/√gross = 0.303 over 3 primes (random split ⇒ ≈0.8)
// P2  fresh: Δfresh(q) nonzero for 7/10 primes, max|Δ|=1, ΣΔ=-3
//     first rows: q=13:6/7(Δ-1)  q=17:4/5(Δ-1)  q=19:4/4(Δ+0)  q=23:3/2(Δ+1)  q=29:2/2(Δ+0)  q=31:1/1(Δ+0)  q=37:0/1(Δ-1)  q=41:1/0(Δ+1)
//     alive-set mirror asymmetry: after first prime 13/77, after last prime 19/45 unpaired
//     survivors: 45 total = 13 mirror pairs + 19 singles (e.g. r=101,107,137,191: μ(r) is dead)
//     mirror-pair independence test: observed 13 pairs vs S²/(2|N|)=11.3 if survival of r and μ(r) were independent
//
// ===== @13: W=30030, |N|=990 (H11=495, H17=495), scour 17..173 =====
// P0  μ(N)=N violations: 0; same-house images: 0; fixed pts in N: 0 (candidates 15014≡14, 30029≡29 mod 30 — neither ≡11/17)
// P1  gross: μ-invariant strike sets: 0/34; q with W≡0,±2 (mod q): []
//     Δgross(q)=|S∩H11|−|S∩H17|: nonzero for 27/34 primes, max|Δ|=7, ΣΔ=9
//     first rows: q=17:58/57(Δ+1)  q=19:50/52(Δ-2)  q=23:45/42(Δ+3)  q=29:33/32(Δ+1)  q=31:31/30(Δ+1)  q=37:30/23(Δ+7)  q=41:25/25(Δ+0)  q=43:22/26(Δ-4)
//     exact identity |S_q∩H11| = |μ(S_q)∩H17| (checked 5 primes): true
//     reformulation Δgross = one-house discrepancy D(0,−2)−D(W,W−2): verified true; mean |Δ|/√gross = 0.357 over 34 primes (random split ⇒ ≈0.8)
// P2  fresh: Δfresh(q) nonzero for 30/34 primes, max|Δ|=7, ΣΔ=-3
//     first rows: q=17:58/57(Δ+1)  q=19:43/47(Δ-4)  q=23:36/32(Δ+4)  q=29:25/23(Δ+2)  q=31:24/21(Δ+3)  q=37:17/15(Δ+2)  q=41:12/17(Δ-5)  q=43:13/17(Δ-4)
//     alive-set mirror asymmetry: after first prime 115/875, after last prime 219/307 unpaired
//     survivors: 307 total = 44 mirror pairs + 219 singles (e.g. r=191,197,227,281: μ(r) is dead)
//     mirror-pair independence test: observed 44 pairs vs S²/(2|N|)=47.6 if survival of r and μ(r) were independent
//
// ===== @17: W=510510, |N|=14850 (H11=7425, H17=7425), scour 19..709 =====
// P0  μ(N)=N violations: 0; same-house images: 0; fixed pts in N: 0 (candidates 255254≡14, 510509≡29 mod 30 — neither ≡11/17)
// P1  gross: μ-invariant strike sets: 0/120; q with W≡0,±2 (mod q): [23,31,179]
//     Δgross(q)=|S∩H11|−|S∩H17|: nonzero for 107/120 primes, max|Δ|=11, ΣΔ=70
//     first rows: q=19:782/781(Δ+1)  q=23:651/641(Δ+10)  q=29:510/517(Δ-7)  q=31:480/480(Δ+0)  q=37:407/398(Δ+9)  q=41:361/364(Δ-3)  q=43:342/349(Δ-7)  q=47:313/313(Δ+0)
//     exact identity |S_q∩H11| = |μ(S_q)∩H17| (checked 5 primes): true
//     reformulation Δgross = one-house discrepancy D(0,−2)−D(W,W−2): verified true; mean |Δ|/√gross = 0.279 over 120 primes (random split ⇒ ≈0.8)
// P2  fresh: Δfresh(q) nonzero for 106/120 primes, max|Δ|=23, ΣΔ=3
//     first rows: q=19:782/781(Δ+1)  q=23:588/571(Δ+17)  q=29:420/419(Δ+1)  q=31:363/362(Δ+1)  q=37:289/284(Δ+5)  q=41:234/249(Δ-15)  q=43:224/220(Δ+4)  q=47:185/190(Δ-5)
//     alive-set mirror asymmetry: after first prime 1563/13287, after last prime 2461/3099 unpaired
//     survivors: 3099 total = 319 mirror pairs + 2461 singles (e.g. r=827,857,881,1031: μ(r) is dead)
//     mirror-pair independence test: observed 319 pairs vs S²/(2|N|)=323.4 if survival of r and μ(r) were independent
//
// ===== PART 3: half-tile variance @13 =====
//   L=210: rotation-pairing N(t)=N(W-1-L-t) violations: 0/30030
//     full  tile: E=6.9231  Var=1.0528  Var/E²=0.021966
//     half  tile: E=6.9285  Var=1.0662  Var/E²=0.022211  ratio=1.0111
//   L=2310: rotation-pairing N(t)=N(W-1-L-t) violations: 0/30030
//     full  tile: E=76.1538  Var=1.7833  Var/E²=0.000308
//     half  tile: E=76.2140  Var=1.6639  Var/E²=0.000286  ratio=0.9316
// ============================================================================
// READINGS (honest calibration; the headline is a REFUTATION)
//
// 1. WHEEL-SIDE EXACTNESS: PROVEN AND VERIFIED.  μ(r)=W−2−r is a fixed-point-
//    free involution of N_x that swaps House 11 ↔ House 17.  Algebra: for
//    every p | W, μ(r) ≡ −2−r (mod p), which swaps the forbidden classes
//    0 ↔ −2 (so natal ↦ natal) and swaps 11 ↔ 17 (mod 30).  The two fixed-
//    point candidates 2r ≡ W−2 (mod W), namely r = W/2−1 (≡14 mod 30, even)
//    and r = W−1 (≡29 mod 30), are never natal.  Consequence, exact at every
//    level: |H11| = |H17| = |N_x|/2, and natal slots come in perfect mirror
//    pairs.  Zero violations @7,@11,@13,@17.
//
// 2. THE CANDIDATE THEOREM IS FALSE — and the algebra says WHY.  For a scour
//    prime q, q ∤ W, so μ(r) ≡ (W−2)−r (mod q), NOT −2−r.  The strike
//    residues {0,−2} map to {W−2, W} (mod q); set-equality would need q | W
//    or q | 4.  Numerically: 0 of 166 strike sets (all q, all four levels)
//    are μ-invariant, Δgross(q) ≠ 0 for the large majority of primes
//    (107/120 @17), and Δfresh(q) likewise (106/120, max|Δ|=23 @17).  A kill
//    at r by q does NOT force a kill at μ(r) by q.  The Scour's freedom is
//    NOT halved; there is no exact factor-2 kill structure, so the mirror
//    tightens NO per-prime removal bound — not even by the trivial factor 2.
//    (The prompt-side derivation "μ(r) ≡ −2−r mod q" silently assumed q | W;
//    that is exactly the wheel/scour boundary.)
//
// 3. WHAT THE MIRROR DOES GIVE, EXACTLY: |S∩H11| = |μ(S)∩H17| for ANY set S
//    (verified), which reformulates the house imbalance as a ONE-house
//    residue discrepancy:  Δgross(q) = #{r∈H11: r≡0,−2 (q)} − #{r∈H11:
//    r≡W,W−2 (q)}  (verified exactly for all 166 primes).  House-blindness
//    is thus equivalent to equidistribution of ONE house over 4 residue
//    classes mod q — a discrepancy statement, not a symmetry statement.
//
// 4. THE SPLIT IS SUB-RANDOM BUT NOT EXACT.  Measured mean |Δ|/√gross ≈
//    0.28–0.36 vs ≈ 0.80 for a fair-coin split.  So the observed house-
//    blindness is genuinely TIGHTER than binomial — consistent with reading
//    3's discrepancy mechanism (in the deeper tile W·q the split is exactly
//    even by CRT; our window is a 1/q partial period, leaving only a
//    partial-period error).  We did not isolate how much of the suppression
//    is the mirror vs plain CRT near-equidistribution; calibrate as
//    "measured, mechanism plausible, unproven".
//
// 5. SURVIVORS ARE NOT MIRROR-PAIRED — NOT EVEN CORRELATED.  @17: 3099
//    survivors = 319 pairs + 2461 singles; the independence baseline
//    S²/(2|N|) predicts 323.4 pairs.  Same at @11 (13 vs 11.3) and @13 (44
//    vs 47.6).  So survival of r and μ(r) is statistically INDEPENDENT: the
//    march erases the palindrome about as thoroughly as chance allows.
//    (@7 counterexample to pairing: 41 survives, μ(41)=167 dies via 169=13².)
//
// 6. VARIANCE: THE MIRROR HALVES THE SAMPLE, NOT THE RISK.  The rotation
//    ensemble is exactly mirror-paired — N(t) = N(W−1−L−t mod W) with ZERO
//    violations @13 (both L) — so the full-tile population of window counts
//    is two copies of a half-population: Var/E² over the half tile equals
//    the full-tile value up to boundary noise (ratios 1.011 and 0.932; no
//    systematic reduction, and none is possible since the multisets
//    coincide).  Knowing one half determines the other, but the Chebyshev
//    bound Var/E² is a POPULATION statement and the population is unchanged.
//    Effective variance is NOT halved.
//
// 7. VERDICT for the twin wall: the mirror is a NATAL symmetry, broken by
//    every scour prime because scour primes are foreign to the tile modulus.
//    Its real purchases are structural bookkeeping (exact house equality,
//    paired natal geometry, reading 3's reformulation) — worth having, but
//    it does not upper-limit per-prime removals beyond what raw counts give.
//    The one live thread it opens: exactness is RESTORED one level deeper
//    (q becomes a wheel prime in the (x·q)-tile, where μ' is exact), so
//    Δgross(q) is precisely an "anchored partial-period" error — the same
//    species of term the error-budget attack (03) already tracks.  If
//    anything comes of the mirror, it will come through bounding that
//    discrepancy, not through symmetry alone.
// ============================================================================
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   0.279 and 0.357 -> the range endpoints "0.28-0.36" of reading 4. Those are
//     the printed mean |D|/sqrt(gross) at @17 and @13. The @11 level prints
//     0.303, inside the range, and @7 prints n/a, so the range is the full
//     spread of what was measured.
//   0.9316 -> the 0.932 of reading 6, the printed half-tile ratio.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   166, the strike-set and prime count of readings 2 and 3, is the four
//     levels' scour sizes added up: the printed denominators are 2 primes at
//     @7, 10 at @11, 34 at @13 and 120 at @17, and 2+10+34+120 is 166.
//   167 in reading 5 is mu(41) at @7, which is W-2-41 with the printed
//     W=210, so 167.
//
// DEFINITION / LITERATURE constants: 169 in reading 5 is 13 squared, and 13 is
//   the top of the printed @7 scour, "scour 11..13".
// ---------------------------------------------------------------------------
