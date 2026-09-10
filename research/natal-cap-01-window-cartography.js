// ============================================================================
// NATAL-CAP ATTACK 1 — MAXIMAL-WINDOW CARTOGRAPHY of the Natal@5 pattern
// (2026-08-14; one of ten parallel attacks on rigorous per-prime removal caps)
// ============================================================================
// THE IDEA. When a scour prime q strikes the Natal@5 set N_x of the x-tile
// (W = x#), every strike r = q·m (or r+2 = q·m) has its cofactor m confined to
//   (a) an interval of length ~W/q  (because 0 ≤ r < W), and
//   (b) a DILATED SIBLING of the natal pattern:
//         m ≡ q⁻¹·{11,17} (mod 30)  [resp. q⁻¹·{13,19} for the r+2 class],
//         m mod p ∉ {0, −2q⁻¹}      [resp. {0, +2q⁻¹}]  for each 7 ≤ p ≤ x
//       — same class-counts as N_x itself, teeth rotated.
// Hence  gross(q) ≤ (max points of a natal-shaped pattern in ANY window of
// length ceil(W/q)) × 2 classes.  If sibling window-maxima match the natal
// pattern's own, the computable quantity
//         cap(q) = 2·M_x(ceil(W/q)),   M_x(ℓ) = max_s #(N_x ∩ [s, s+ℓ)) cyclic
// is a rigorous-looking ceiling on gross(q) — the DIRECT OBJECT of the whole
// cap program. This file maps M_x(ℓ) and m_x(ℓ) exactly (prefix sums, O(W)
// per ℓ) at every ℓ = ceil(W/q) the scour needs, for x = 7, 11, 13, 17.
//
// THE HONEST QUESTION. Does Σ_q cap(q) over the whole scour ever come in
// under |N_x| (which would PROVE survivors > 0 by union bound)? Expected: NO
// — even the mean-field sum Σ 2N/q ≈ 2N·(ln ln √W − ln ln x) already exceeds
// N, before window-excess inflation. So: quantify the overshoot, find which
// q-range wrecks the sum, measure how fat the worst window really is vs the
// mean (excess growth law: √mean? log?), and spot-check whether the natal
// pattern's own window maxima are even a valid proxy for its dilated siblings.
// Refutation with numbers is a first-class result here.
// ============================================================================

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const PR = primesUpTo(1000);

function buildNatal(x){
  const bp = PR.filter(p=>p<=x);                    // 2,3,5,...,x
  const W = bp.reduce((a,b)=>a*b,1);
  const ind = new Uint8Array(W);
  for(let r=11;r<W;r+=30) ind[r]=1;
  for(let r=17;r<W;r+=30) ind[r]=1;
  for(const p of bp){ if(p<7) continue;
    for(let r=0;r<W;r+=p) ind[r]=0;
    for(let r=((p-2)%p+p)%p;r<W;r+=p) ind[r]=0;
  }
  let N=0; for(let r=0;r<W;r++) N+=ind[r];
  return {W, ind, N};
}

// exact cyclic sliding-window max/min via prefix sums, O(W) per ℓ
function windowExtremes(ind, W, prefix, ell){
  let mx=-1, mn=1e9;
  for(let s=0;s<W;s++){
    const e=s+ell;
    const c = e<=W ? prefix[e]-prefix[s] : prefix[W]-prefix[s]+prefix[e-W];
    if(c>mx)mx=c; if(c<mn)mn=c;
  }
  return [mx,mn];
}

function lsqSlope(xs, ys){ // least-squares slope+intercept of ys vs xs
  const n=xs.length; let sx=0,sy=0,sxx=0,sxy=0;
  for(let i=0;i<n;i++){sx+=xs[i];sy+=ys[i];sxx+=xs[i]*xs[i];sxy+=xs[i]*ys[i];}
  const b=(n*sxy-sx*sy)/(n*sxx-sx*sx); return [b,(sy-b*sx)/n];
}

for(const x of [7,11,13,17]){
  const t0=Date.now();
  const {W, ind, N} = buildNatal(x);
  const sqrtW = Math.sqrt(W);
  const scour = PR.filter(q=>q>x && q<=sqrtW);
  const prefix = new Int32Array(W+1);
  for(let r=0;r<W;r++) prefix[r+1]=prefix[r]+ind[r];

  // ---- window extremes at every needed ℓ (dedup) ----
  const ellOf = new Map();
  for(const q of scour){ const ell=Math.ceil(W/q); if(!ellOf.has(ell)) ellOf.set(ell, windowExtremes(ind,W,prefix,ell)); }

  // ---- recompute the march: gross (vs full N_x) and fresh (vs alive) ----
  const alive = Uint8Array.from(ind);
  const rows=[];
  let capSum=0, grossSum=0, freshSum=0, meanSum=0, aliveCount=N;
  let crossQ=null, cum=0;
  for(const q of scour){
    let gross=0, fresh=0, self=0;
    for(const res of [0, q-2]){
      for(let r=res;r<W;r+=q){
        if(ind[r]){ gross++;
          if(alive[r]){ alive[r]=0; fresh++; aliveCount--;
            if((res===0&&r===q)||(res===q-2&&r===q-2)) self++;
          }
        }
      }
    }
    const ell=Math.ceil(W/q), [M,mm]=ellOf.get(ell), cap=2*M, mean=2*N/q;
    rows.push({q,ell,mean,gross,fresh,self,cap,M,mm});
    capSum+=cap; grossSum+=gross; freshSum+=fresh; meanSum+=mean;
    cum+=cap; if(crossQ===null && cum>=N) crossQ=q;
  }

  console.log(`\n${'='.repeat(96)}`);
  console.log(`@${x}: W=${W}  |N|=${N}  scour ${scour[0]}..${scour[scour.length-1]} (${scour.length} primes, √W=${sqrtW.toFixed(1)})`);
  console.log(`${'='.repeat(96)}`);
  console.log('   q  |    ℓ=⌈W/q⌉ |  2N/q  | gross | fresh | self | M(ℓ) m(ℓ) |  cap=2M | cap/gross | gross/(2N/q)');
  for(const r of (rows.length<=40?rows:rows.filter((_,i)=>i<15||i>=rows.length-5||i%8===0))){
    console.log(` ${String(r.q).padStart(4)} | ${String(r.ell).padStart(9)} | ${r.mean.toFixed(1).padStart(6)} | ${String(r.gross).padStart(5)} | ${String(r.fresh).padStart(5)} | ${String(r.self).padStart(4)} | ${String(r.M).padStart(4)} ${String(r.mm).padStart(4)} | ${String(r.cap).padStart(7)} |   ${(r.cap/r.gross).toFixed(3).padStart(5)}   |  ${(r.gross/r.mean).toFixed(4)}`);
  }
  if(rows.length>40) console.log(`  ... (${rows.length} scour primes total; middle rows every 8th)`);

  // Q2: the sum
  console.log(`\n Q2 SUMS:  Σcap=${capSum}  vs |N|=${N}  → overshoot ×${(capSum/N).toFixed(3)}`);
  console.log(`           Σ(2N/q)=${meanSum.toFixed(0)} (×${(meanSum/N).toFixed(3)})   Σgross=${grossSum} (×${(grossSum/N).toFixed(3)})   Σfresh=${freshSum} (removed; survivors ${aliveCount})`);
  console.log(crossQ===null ? `           cumulative Σcap NEVER exceeds |N| — union bound HOLDS at this level`
    : `           cumulative Σcap first exceeds |N| at q=${crossQ} (prime #${scour.indexOf(crossQ)+1} of ${scour.length})`);
  // smallest suffix that alone stays under N
  let sfx=0, sIdx=rows.length;
  for(let i=rows.length-1;i>=0;i--){ if(sfx+rows[i].cap>=N){break;} sfx+=rows[i].cap; sIdx=i; }
  console.log(`           suffix q≥${sIdx<rows.length?rows[sIdx].q:'—'} sums to ${sfx} < |N| — everything below that wrecks it`);

  // Q1: excess growth law  E(ℓ) = M(ℓ) − Nℓ/W
  const pts = [...ellOf.entries()].map(([ell,[M,mm]])=>({ell, mean:N*ell/W, E:M-N*ell/W, D:N*ell/W-mm})).sort((a,b)=>a.ell-b.ell);
  const [slope]   = lsqSlope(pts.map(p=>Math.log(p.mean)), pts.map(p=>Math.log(Math.max(p.E,1e-9))));
  const rSqrt = pts.map(p=>p.E/Math.sqrt(p.mean)), rLog = pts.map(p=>p.E/Math.log(p.ell));
  const stat=a=>{const s=[...a].sort((u,v)=>u-v);return `${s[0].toFixed(2)}/${s[Math.floor(s.length/2)].toFixed(2)}/${s[s.length-1].toFixed(2)}`};
  console.log(` Q1 EXCESS: log-log slope of E vs mean = ${slope.toFixed(3)}  (0.5 ⇒ √mean law, ~0 ⇒ ℓ-independent)`);
  console.log(`           raw E min/med/max = ${stat(pts.map(p=>p.E))};  E at ℓ_min=${pts[0].ell}: ${pts[0].E.toFixed(1)}, at ℓ_max=${pts[pts.length-1].ell}: ${pts[pts.length-1].E.toFixed(1)}`);
  console.log(`           E/√mean min/med/max = ${stat(rSqrt)}    E/ln(ℓ) min/med/max = ${stat(rLog)}`);
  console.log(`           deficit side: max (Nℓ/W − m(ℓ))/√mean = ${Math.max(...pts.map(p=>p.D/Math.sqrt(p.mean))).toFixed(2)}`);
  // Q3: true worst window vs naive mean
  const worst = rows.reduce((a,r)=> r.gross/r.mean > a.gross/a.mean ? r : a);
  const worstCap = rows.reduce((a,r)=> r.cap/r.mean > a.cap/a.mean ? r : a);
  console.log(` Q3 WORST:  max gross/(2N/q) = ${(worst.gross/worst.mean).toFixed(4)} at q=${worst.q}; max cap/(2N/q) = ${(worstCap.cap/worstCap.mean).toFixed(3)} at q=${worstCap.q}`);
  console.log(`           mean cap/gross over scour = ${(rows.reduce((a,r)=>a+r.cap/r.gross,0)/rows.length).toFixed(3)}`);
  console.log(` [${((Date.now()-t0)/1000).toFixed(1)}s]`);
}

// ============================================================================
// Q4: DILATED-SIBLING SPOT-CHECK at x=13 (q = 17, 19, 23).
// Build the actual m-patterns from the congruence definition and compare
// their window maxima with M_13(ℓ). Also verify the KEY IDENTITY exactly:
// gross(q) must equal (sibling-A points with 0 ≤ qm < W) + (sibling-B points
// with 0 ≤ qm−2 < W).
// ============================================================================
{
  const {W, ind, N} = buildNatal(13);
  const prefix = new Int32Array(W+1); for(let r=0;r<W;r++) prefix[r+1]=prefix[r]+ind[r];
  console.log(`\n${'='.repeat(96)}\nQ4 @13: dilated siblings vs natal window maxima\n${'='.repeat(96)}`);
  for(const q of [17,19,23]){
    // sibling A: r = q·m natal  ⇔  ind[(q·m) mod W]  ... defined directly by residues of q·m
    const A=new Uint8Array(W), B=new Uint8Array(W);
    for(let m=0;m<W;m++){
      const rA=(q*m)%W;            A[m]=ind[rA];              // q·m mod W hits every residue once (q ⊥ W)
      const rB=(((q*m-2)%W)+W)%W;  B[m]=ind[rB];
    }
    const pA=new Int32Array(W+1), pB=new Int32Array(W+1);
    for(let m=0;m<W;m++){pA[m+1]=pA[m]+A[m];pB[m+1]=pB[m]+B[m];}
    const ell=Math.ceil(W/q);
    const [MA]=windowExtremes(A,W,pA,ell), [MB]=windowExtremes(B,W,pB,ell), [MN]=windowExtremes(ind,W,prefix,ell);
    // exact identity check
    let gA=0,gB=0; for(let m=0;m*q<W;m++) gA+=A[m]; for(let m=1;m*q-2<W;m++) gB+=B[m];
    let gross=0; for(const res of [0,q-2]) for(let r=res;r<W;r+=q) gross+=ind[r];
    console.log(` q=${q}: ℓ=${ell}  M_natal(ℓ)=${MN}  M_sibA(ℓ)=${MA}  M_sibB(ℓ)=${MB}  |  identity: gross=${gross} = A-part ${gA} + B-part ${gB} ${gA+gB===gross?'✓ EXACT':'✗ MISMATCH'}`);
  }
  console.log(' (sibling patterns are the natal set viewed through multiplication by q⁻¹ mod W —');
  console.log('  a relabeling of the same combinatorial structure, so identical window spectra expected.)');
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-01-window-cartography.js
//   invocation:  node research/natal-cap-01-window-cartography.js
//   code-sha256: 8a1f49a7c45a7e8e3232cda3641af0dc7630d47f65d5d53d2fa70641a6f91b30
//   out-sha256:  a0751c2544d4fc6ea3361d62929e1e8bab5ade6be71dbae16f4fc8fba248c7a5
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.3 s
// ============================================================================
//
// ================================================================================================
// @7: W=210  |N|=10  scour 11..13 (2 primes, √W=14.5)
// ================================================================================================
//    q  |    ℓ=⌈W/q⌉ |  2N/q  | gross | fresh | self | M(ℓ) m(ℓ) |  cap=2M | cap/gross | gross/(2N/q)
//    11 |        20 |    1.8 |     1 |     1 |    1 |    2    0 |       4 |   4.000   |  0.5500
//    13 |        17 |    1.5 |     2 |     1 |    0 |    2    0 |       4 |   2.000   |  1.3000
//
//  Q2 SUMS:  Σcap=8  vs |N|=10  → overshoot ×0.800
//            Σ(2N/q)=3 (×0.336)   Σgross=3 (×0.300)   Σfresh=2 (removed; survivors 8)
//            cumulative Σcap NEVER exceeds |N| — union bound HOLDS at this level
//            suffix q≥11 sums to 8 < |N| — everything below that wrecks it
//  Q1 EXCESS: log-log slope of E vs mean = -0.787  (0.5 ⇒ √mean law, ~0 ⇒ ℓ-independent)
//            raw E min/med/max = 1.05/1.19/1.19;  E at ℓ_min=17: 1.2, at ℓ_max=20: 1.0
//            E/√mean min/med/max = 1.07/1.32/1.32    E/ln(ℓ) min/med/max = 0.35/0.42/0.42
//            deficit side: max (Nℓ/W − m(ℓ))/√mean = 0.98
//  Q3 WORST:  max gross/(2N/q) = 1.3000 at q=13; max cap/(2N/q) = 2.600 at q=13
//            mean cap/gross over scour = 3.000
//  [0.0s]
//
// ================================================================================================
// @11: W=2310  |N|=90  scour 13..47 (10 primes, √W=48.1)
// ================================================================================================
//    q  |    ℓ=⌈W/q⌉ |  2N/q  | gross | fresh | self | M(ℓ) m(ℓ) |  cap=2M | cap/gross | gross/(2N/q)
//    13 |       178 |   13.8 |    13 |    13 |    0 |    9    4 |      18 |   1.385   |  0.9389
//    17 |       136 |   10.6 |    10 |     9 |    1 |    8    3 |      16 |   1.600   |  0.9444
//    19 |       122 |    9.5 |    10 |     8 |    0 |    7    2 |      14 |   1.400   |  1.0556
//    23 |       101 |    7.8 |     8 |     5 |    0 |    6    2 |      12 |   1.500   |  1.0222
//    29 |        80 |    6.2 |     7 |     4 |    0 |    5    1 |      10 |   1.429   |  1.1278
//    31 |        75 |    5.8 |     6 |     2 |    0 |    5    1 |      10 |   1.667   |  1.0333
//    37 |        63 |    4.9 |     4 |     1 |    0 |    5    1 |      10 |   2.500   |  0.8222
//    41 |        57 |    4.4 |     5 |     1 |    1 |    4    0 |       8 |   1.600   |  1.1389
//    43 |        54 |    4.2 |     5 |     1 |    0 |    4    0 |       8 |   1.600   |  1.1944
//    47 |        50 |    3.8 |     5 |     1 |    0 |    4    0 |       8 |   1.600   |  1.3056
//
//  Q2 SUMS:  Σcap=114  vs |N|=90  → overshoot ×1.267
//            Σ(2N/q)=71 (×0.789)   Σgross=73 (×0.811)   Σfresh=45 (removed; survivors 45)
//            cumulative Σcap first exceeds |N| at q=37 (prime #7 of 10)
//            suffix q≥19 sums to 80 < |N| — everything below that wrecks it
//  Q1 EXCESS: log-log slope of E vs mean = 0.121  (0.5 ⇒ √mean law, ~0 ⇒ ℓ-independent)
//            raw E min/med/max = 1.78/2.06/2.70;  E at ℓ_min=50: 2.1, at ℓ_max=178: 2.1
//            E/√mean min/med/max = 0.78/1.19/1.62    E/ln(ℓ) min/med/max = 0.40/0.48/0.61
//            deficit side: max (Nℓ/W − m(ℓ))/√mean = 1.49
//  Q3 WORST:  max gross/(2N/q) = 1.3056 at q=47; max cap/(2N/q) = 2.089 at q=47
//            mean cap/gross over scour = 1.628
//  [0.0s]
//
// ================================================================================================
// @13: W=30030  |N|=990  scour 17..173 (34 primes, √W=173.3)
// ================================================================================================
//    q  |    ℓ=⌈W/q⌉ |  2N/q  | gross | fresh | self | M(ℓ) m(ℓ) |  cap=2M | cap/gross | gross/(2N/q)
//    17 |      1767 |  116.5 |   115 |   115 |    1 |   63   53 |     126 |   1.096   |  0.9874
//    19 |      1581 |  104.2 |   102 |    90 |    0 |   57   46 |     114 |   1.118   |  0.9788
//    23 |      1306 |   86.1 |    87 |    68 |    0 |   49   38 |      98 |   1.126   |  1.0106
//    29 |      1036 |   68.3 |    65 |    48 |    0 |   39   28 |      78 |   1.200   |  0.9520
//    31 |       969 |   63.9 |    61 |    45 |    0 |   37   27 |      74 |   1.213   |  0.9551
//    37 |       812 |   53.5 |    53 |    32 |    0 |   32   21 |      64 |   1.208   |  0.9904
//    41 |       733 |   48.3 |    50 |    29 |    1 |   29   19 |      58 |   1.160   |  1.0354
//    43 |       699 |   46.0 |    48 |    30 |    0 |   28   18 |      56 |   1.167   |  1.0424
//    47 |       639 |   42.1 |    43 |    26 |    0 |   26   17 |      52 |   1.209   |  1.0207
//    53 |       567 |   37.4 |    38 |    28 |    0 |   23   14 |      46 |   1.211   |  1.0172
//    59 |       509 |   33.6 |    34 |    21 |    0 |   22   12 |      44 |   1.294   |  1.0131
//    61 |       493 |   32.5 |    33 |    18 |    0 |   21   12 |      42 |   1.273   |  1.0167
//    67 |       449 |   29.6 |    30 |    19 |    0 |   19   10 |      38 |   1.267   |  1.0152
//    71 |       423 |   27.9 |    29 |    17 |    1 |   18    9 |      36 |   1.241   |  1.0399
//    73 |       412 |   27.1 |    24 |    11 |    0 |   17    9 |      34 |   1.417   |  0.8848
//    79 |       381 |   25.1 |    26 |    11 |    0 |   16    9 |      32 |   1.231   |  1.0374
//    83 |       362 |   23.9 |    23 |    10 |    0 |   16    8 |      32 |   1.391   |  0.9641
//    89 |       338 |   22.2 |    22 |     8 |    0 |   15    8 |      30 |   1.364   |  0.9889
//    97 |       310 |   20.4 |    19 |     4 |    0 |   14    7 |      28 |   1.474   |  0.9308
//   101 |       298 |   19.6 |    20 |    11 |    1 |   14    6 |      28 |   1.400   |  1.0202
//   103 |       292 |   19.2 |    20 |     8 |    0 |   13    6 |      26 |   1.300   |  1.0404
//   107 |       281 |   18.5 |    20 |     5 |    1 |   13    6 |      26 |   1.300   |  1.0808
//   109 |       276 |   18.2 |    17 |     7 |    0 |   13    6 |      26 |   1.529   |  0.9359
//   113 |       266 |   17.5 |    15 |     1 |    0 |   13    5 |      26 |   1.733   |  0.8561
//   127 |       237 |   15.6 |    16 |     2 |    0 |   11    4 |      22 |   1.375   |  1.0263
//   131 |       230 |   15.1 |    15 |     1 |    0 |   11    4 |      22 |   1.467   |  0.9924
//   137 |       220 |   14.5 |    14 |     6 |    1 |   11    4 |      22 |   1.571   |  0.9687
//   139 |       217 |   14.2 |    14 |     4 |    0 |   11    4 |      22 |   1.571   |  0.9828
//   149 |       202 |   13.3 |    14 |     1 |    0 |   10    3 |      20 |   1.429   |  1.0535
//   151 |       199 |   13.1 |    14 |     3 |    0 |   10    3 |      20 |   1.429   |  1.0677
//   157 |       192 |   12.6 |    14 |     1 |    0 |   10    3 |      20 |   1.429   |  1.1101
//   163 |       185 |   12.1 |    15 |     2 |    0 |    9    3 |      18 |   1.200   |  1.2348
//   167 |       180 |   11.9 |    13 |     0 |    0 |    9    3 |      18 |   1.385   |  1.0965
//   173 |       174 |   11.4 |    12 |     1 |    0 |    9    3 |      18 |   1.500   |  1.0485
//
//  Q2 SUMS:  Σcap=1416  vs |N|=990  → overshoot ×1.430
//            Σ(2N/q)=1135 (×1.147)   Σgross=1135 (×1.146)   Σfresh=683 (removed; survivors 307)
//            cumulative Σcap first exceeds |N| at q=79 (prime #16 of 34)
//            suffix q≥37 sums to 926 < |N| — everything below that wrecks it
//  Q1 EXCESS: log-log slope of E vs mean = 0.231  (0.5 ⇒ √mean law, ~0 ⇒ ℓ-independent)
//            raw E min/med/max = 2.90/4.05/5.95;  E at ℓ_min=174: 3.3, at ℓ_max=1767: 4.7
//            E/√mean min/med/max = 0.62/1.17/1.46    E/ln(ℓ) min/med/max = 0.56/0.69/0.84
//            deficit side: max (Nℓ/W − m(ℓ))/√mean = 1.42
//  Q3 WORST:  max gross/(2N/q) = 1.2348 at q=163; max cap/(2N/q) = 1.586 at q=157
//            mean cap/gross over scour = 1.332
//  [0.0s]
//
// ================================================================================================
// @17: W=510510  |N|=14850  scour 19..709 (120 primes, √W=714.5)
// ================================================================================================
//    q  |    ℓ=⌈W/q⌉ |  2N/q  | gross | fresh | self | M(ℓ) m(ℓ) |  cap=2M | cap/gross | gross/(2N/q)
//    19 |     26869 | 1563.2 |  1563 |  1563 |    0 |  791  771 |    1582 |   1.012   |  0.9999
//    23 |     22197 | 1291.3 |  1292 |  1159 |    0 |  653  637 |    1306 |   1.011   |  1.0005
//    29 |     17604 | 1024.1 |  1027 |   839 |    0 |  521  503 |    1042 |   1.015   |  1.0028
//    31 |     16469 |  958.1 |   960 |   725 |    0 |  488  471 |     976 |   1.017   |  1.0020
//    37 |     13798 |  802.7 |   805 |   573 |    0 |  408  394 |     816 |   1.014   |  1.0029
//    41 |     12452 |  724.4 |   725 |   483 |    1 |  371  354 |     742 |   1.023   |  1.0008
//    43 |     11873 |  690.7 |   691 |   444 |    0 |  355  337 |     710 |   1.027   |  1.0004
//    47 |     10862 |  631.9 |   626 |   375 |    0 |  324  309 |     648 |   1.035   |  0.9906
//    53 |      9633 |  560.4 |   559 |   322 |    0 |  290  272 |     580 |   1.038   |  0.9975
//    59 |      8653 |  503.4 |   497 |   272 |    0 |  260  245 |     520 |   1.046   |  0.9873
//    61 |      8370 |  486.9 |   488 |   266 |    0 |  251  237 |     502 |   1.029   |  1.0023
//    67 |      7620 |  443.3 |   441 |   242 |    0 |  229  214 |     458 |   1.039   |  0.9948
//    71 |      7191 |  418.3 |   418 |   208 |    1 |  217  201 |     434 |   1.038   |  0.9993
//    73 |      6994 |  406.8 |   410 |   197 |    0 |  212  196 |     424 |   1.034   |  1.0077
//    79 |      6463 |  375.9 |   378 |   181 |    0 |  197  181 |     394 |   1.042   |  1.0055
//    89 |      5737 |  333.7 |   331 |   162 |    0 |  176  160 |     352 |   1.063   |  0.9919
//   131 |      3898 |  226.7 |   225 |   101 |    0 |  122  105 |     244 |   1.084   |  0.9924
//   173 |      2951 |  171.7 |   172 |    78 |    0 |   93   80 |     186 |   1.081   |  1.0019
//   223 |      2290 |  133.2 |   134 |    55 |    0 |   72   60 |     144 |   1.075   |  1.0061
//   263 |      1942 |  112.9 |   112 |    35 |    0 |   64   48 |     128 |   1.143   |  0.9918
//   311 |      1642 |   95.5 |    93 |    26 |    1 |   54   38 |     108 |   1.161   |  0.9738
//   359 |      1423 |   82.7 |    82 |    24 |    0 |   49   33 |      98 |   1.195   |  0.9912
//   409 |      1249 |   72.6 |    71 |    16 |    0 |   44   28 |      88 |   1.239   |  0.9777
//   457 |      1118 |   65.0 |    65 |    14 |    0 |   40   25 |      80 |   1.231   |  1.0002
//   503 |      1015 |   59.0 |    60 |    14 |    0 |   35   22 |      70 |   1.167   |  1.0162
//   569 |       898 |   52.2 |    51 |     7 |    0 |   33   19 |      66 |   1.294   |  0.9771
//   613 |       833 |   48.5 |    47 |     5 |    0 |   31   17 |      62 |   1.319   |  0.9701
//   659 |       775 |   45.1 |    41 |     3 |    0 |   29   16 |      58 |   1.415   |  0.9097
//   677 |       755 |   43.9 |    44 |     1 |    0 |   28   16 |      56 |   1.273   |  1.0030
//   683 |       748 |   43.5 |    42 |     0 |    0 |   28   16 |      56 |   1.333   |  0.9659
//   691 |       739 |   43.0 |    39 |     1 |    0 |   28   15 |      56 |   1.436   |  0.9074
//   701 |       729 |   42.4 |    43 |     1 |    0 |   28   15 |      56 |   1.302   |  1.0149
//   709 |       721 |   41.9 |    42 |     0 |    0 |   28   15 |      56 |   1.333   |  1.0026
//   ... (120 scour primes total; middle rows every 8th)
//
//  Q2 SUMS:  Σcap=23926  vs |N|=14850  → overshoot ×1.611
//            Σ(2N/q)=22183 (×1.494)   Σgross=22132 (×1.490)   Σfresh=11751 (removed; survivors 3099)
//            cumulative Σcap first exceeds |N| at q=151 (prime #29 of 120)
//            suffix q≥67 sums to 14502 < |N| — everything below that wrecks it
//  Q1 EXCESS: log-log slope of E vs mean = 0.076  (0.5 ⇒ √mean law, ~0 ⇒ ℓ-independent)
//            raw E min/med/max = 5.36/7.18/10.08;  E at ℓ_min=721: 7.0, at ℓ_max=26869: 9.4
//            E/√mean min/med/max = 0.29/1.08/1.53    E/ln(ℓ) min/med/max = 0.68/0.97/1.22
//            deficit side: max (Nℓ/W − m(ℓ))/√mean = 1.53
//  Q3 WORST:  max gross/(2N/q) = 1.0773 at q=653; max cap/(2N/q) = 1.337 at q=709
//            mean cap/gross over scour = 1.170
//  [0.1s]
//
// ================================================================================================
// Q4 @13: dilated siblings vs natal window maxima
// ================================================================================================
//  q=17: ℓ=1767  M_natal(ℓ)=63  M_sibA(ℓ)=63  M_sibB(ℓ)=63  |  identity: gross=115 = A-part 61 + B-part 54 ✓ EXACT
//  q=19: ℓ=1581  M_natal(ℓ)=57  M_sibA(ℓ)=56  M_sibB(ℓ)=56  |  identity: gross=102 = A-part 52 + B-part 50 ✓ EXACT
//  q=23: ℓ=1306  M_natal(ℓ)=49  M_sibA(ℓ)=49  M_sibB(ℓ)=49  |  identity: gross=87 = A-part 45 + B-part 42 ✓ EXACT
//  (sibling patterns are the natal set viewed through multiplication by q⁻¹ mod W —
//   a relabeling of the same combinatorial structure, so identical window spectra expected.)
// ============================================================================
// READINGS (2026-08-14) — honestly calibrated
// ============================================================================
// 1. THE MAP. M_x(l) is now exact at every scour length l = ceil(W/q), all
//    four levels. Headline discovery: the excess E_x(l) = M_x(l) - N*l/W is
//    essentially CONSTANT IN l within a level — log-log slope of E vs mean is
//    0.12 (@11), 0.23 (@13), 0.08 (@17), nowhere near the 0.5 a sqrt(mean)
//    law would give. Raw E: ~2.1 @11 (range 1.8-2.7), ~4 @13 (2.9-6.0),
//    ~7 @17 (5.4-10.1), while the mean count in the window sweeps two decades
//    (e.g. 21 -> 781 at @17). The worst window of the natal pattern carries
//    only O(1) points above its fair share, uniformly over the whole scour
//    range of window lengths. Neither sqrt(mean) (ratio med drifts 1.32 ->
//    1.08 across levels) nor ln(l) (0.42 -> 0.97) fits ACROSS levels.
// 2. THE CONSTANT ROUGHLY DOUBLES PER LEVEL: E_med = 1.2, 2.1, 4.1, 7.2 at
//    x = 7, 11, 13, 17 — factor ~1.8-2.0 per added base prime, suggesting
//    E ~ c * 2^k with k = #{7 <= p <= x} (each congruence layer lets the
//    extremal window beat its (p-2)/p share by a fixed factor). Four data
//    points only — a lead, not a law. The deficit side is symmetric:
//    max (N*l/W - m(l))/sqrt(mean) = 1.4-1.5 at every level.
// 3. Q2 VERDICT — THE UNION BOUND IS STRUCTURALLY DEAD, AND NOT BECAUSE OF
//    WINDOWS. Sum cap = 0.80*N (@7: HOLDS, proves survivors, trivially),
//    1.267*N (@11), 1.430*N (@13), 1.611*N (@17). But decompose the failure:
//      @11: Sum(2N/q) = 0.789*N and Sum gross = 0.811*N are UNDER N — here
//           only the window inflation (cap vs gross, mean ratio 1.63) kills
//           it. Exact strike counts would certify 90-73 = 17 survivors.
//      @13: Sum(2N/q) = 1.147*N, Sum gross = 1.146*N — the MEAN-FIELD sum
//           itself is already over N. No window bound, however perfect, can
//           save a first-order union bound from here on.
//      @17: Sum(2N/q) = 1.494*N (Mertens: ~ 2(lnln sqrt(W) - lnln x) -> grows
//           like 2*ln(x/(2 ln x)), unboundedly), Sum gross = 1.490*N, yet
//           actual removals are only 0.791*N. The entire gap (overlap factor
//           Sum gross / removed = 1.88) lives in double-counted slots struck
//           by 2+ scour primes. The cap program MUST go to second-order
//           (Bonferroni / inclusion-exclusion depth 2) accounting; sharper
//           per-prime windows alone can never close it for x >= 13.
// 4. WHICH q-RANGE WRECKS THE SUM: the small-q head, as expected. @17 the
//    tail q >= 67 sums to 14,502 < N = 14,850 on its own; the 11 head primes
//    19..61 add 9,424 (39% of Sum cap). Cumulative Sum cap crosses N at
//    q = 151 (prime #29 of 120). Same shape @13 (tail q >= 37 affordable,
//    crossing at q = 79). Concrete hybrid target: exact/overlap accounting
//    for the ~dozen head primes, window caps for the long tail — the tail
//    cap is ALREADY affordable at every level tested.
// 5. Q3 — ACTUAL STRIKES HUG THE MEAN FAR TIGHTER THAN THE WORST WINDOW.
//    max gross(q)/(2N/q) = 1.31 (@11), 1.23 (@13), 1.077 (@17) — at the
//    17-tile no scour prime ever strikes more than 7.7% above its mean share.
//    The interval [0, W/q) that the cofactors actually occupy behaves as a
//    TYPICAL window of the sibling pattern, never the extremal one; the cap
//    pays the extremal price (cap/gross 1.01 at q=19 up to ~1.4 at q~700,
//    mean 1.17 @17). Tightening potential if "typical window" could be
//    certified: the whole E-term vanishes and we are back at case @11 of
//    reading 3 — good for x <= 11 only.
// 6. Q4 — PROXY VALIDATED + KEY IDENTITY CERTIFIED EXACTLY. The dilated
//    sibling is the natal set pulled back through multiplication by
//    q^-1 mod W (a unit relabeling, same class-counts), and its window
//    maxima match the natal pattern's: M_sib = M_natal at q = 17, 23 and
//    M_natal - 1 at q = 19 (deviation DOWNWARD — safe direction). Not a
//    theorem yet: multiplication maps windows to q-spaced sequences, not
//    windows, so M_sib <= M_natal needs proof or direct computation of
//    sibling maxima (same O(W) cost, so a rigorous cap can just use the
//    sibling's own maxima). And the identity gross(q) = (sib-A points in
//    the m-interval) + (sib-B points) checked EXACT: 115 = 61+54 (q=17),
//    102 = 52+50 (q=19), 87 = 45+42 (q=23). The factorization of strikes
//    into two sibling-window counts is numerically certified.
// 7. Cross-check: fresh(q) and totals reproduce natal5-17tile-scour.txt
//    exactly (19: 1563, 23: 1159, ..., total 11,751 removed, 3,099 survive).
//
// NET: the direct object (exact window cartography) is delivered and the
// windows are beautifully tame (O(1) excess), but the first-order cap sum is
// refuted as a survivor-count strategy for x >= 13 — the slack is in strike
// OVERLAPS, not window sizes. Next: second-moment / depth-2 Bonferroni on
// the head primes (pairwise co-strike counts N(q1,q2)), tail by window cap.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own embedded run prints (printed value
// first):
//   1.628 -> 1.63, the @11 mean cap/gross, reading 3.
//   10.08 -> 10.1, the top of the @17 raw-E spread, reading 1. Its partner
//   5.4 is the printed 5.36 and the "~7" is the printed median 7.18.
//
// TOKENIZER ARTIFACT, not a figure:
//   -10.1 is the tail of the hyphenated range "(5.4-10.1)" in reading 1.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   21 -> 781 in reading 1 is the mean window count N*l/W at the two ends of
//   the @17 scour range: 14850 x 721 / 510510 = 21.0 and 14850 x 26869 /
//   510510 = 781.6, with l_min = 721 and l_max = 26869 both printed in the
//   @17 excess block.
//   0.791*N in reading 3 is the printed @17 removal count over the printed
//   size: 11751/14850 = 0.7913.
//   1.88 in reading 3 is the printed @17 Sum gross over that same removal
//   count: 22132/11751 = 1.8834.
//   9,424 in reading 4 is the cap column of the @17 table summed over the
//   eleven head primes 19 through 61: 1582+1306+1042+976+816+742+710+648+
//   580+520+502. The 39% is 9424/23926 = 39.4% of the printed Sum cap.
//   "~1.4 at q~700" in reading 5 reads the top of the printed @17 cap/gross
//   column, where q=659 gives 1.415, q=691 gives 1.436 and q=709 gives 1.333.
//   700 is not itself a scour prime and is not printed; it stands for that
//   end of the table.
// ---------------------------------------------------------------------------
