// ============================================================================
// ATTACK 2 FOLLOW-UP — THE RICH VEIN [1667,1956) mod 2310 (2026-08-14)
// Follow-up to attack2-02-08-tomography.js, whose level-23 blind scan
// (width-289 windows mod 510510) put residue band [1667,1956) mod 2310 in
// the top-5 richest TWICE (offs 452117, 482147, both = 1667 mod 2310) —
// enrichment at a non-seam, non-fossil residue. Is it structure or luck?
//
// Plan:
// 1. REPRODUCE — band density aggregated mod 2310 in the level-19 and
//    level-23 patterns; percentile among all 2310 width-289 windows.
//    Side check: by tomography reading 1 (CRT), the full-period aggregate
//    mod 2310 must be EXACTLY const * T11-indicator (const = 11*15*17 = 2805
//    at level 19, *21 = 58905 at level 23) — verify, since it collapses the
//    whole question to the level-11 tile.
// 2. ANATOMY — the T11 slots in the band: list, mod-30 class, gaps (grain),
//    count vs fair share 135*289/2310 = 16.89.
// 3. HYPOTHESES — (a) mirror: T11 (and every full-period aggregate) is
//    symmetric under r -> 2308-r (r=0 and r=p-2 swap), so the vein's mirror
//    [353,642) should be EQUALLY rich, not poor — test, and test the fossil
//    band's mirror [2067,2188) for contrast. (b) offsets vs half-width 1155 /
//    mirror center 1154 — any arithmetic meaning? (c) kill structure: the
//    aggregate survival per T11 slot is exactly 58905 (no residue favored),
//    so the mod-510510 scan hits must come from LEVEL-13/17 per-copy luck:
//    the level-23 aggregate mod 510510 is exactly 357 * T17-indicator, so
//    scan window sums = T17 slot counts. Distribution over the 221 copies of
//    the vein window (o = 1667 + 2310k); which band slots die by 13/17 in
//    the two record copies; global max-tie census by residue mod 2310.
// 4. VERDICT — how many mod-2310 bands tie/exceed the vein; real mechanism
//    or width-289 sampling luck.
//
// Run: node --max-old-space-size=2048 attack2-rich-vein.js
// ============================================================================

function primesUpTo(q){
  const ps=[];
  for (let n=2;n<=q;n++){
    let ok=true;
    for (const p of ps){ if (p*p>n) break; if (n%p===0){ ok=false; break; } }
    if (ok) ps.push(n);
  }
  return ps;
}
function build(q){
  const PR = primesUpTo(q);
  const P = PR.reduce((a,b)=>a*b,1);
  const bad = new Uint8Array(P);
  for (const p of PR){
    for (let j=0;j<P;j+=p) bad[j]=1;
    const r2 = ((p-2)%p+p)%p;
    for (let j=r2;j<P;j+=p) bad[j]=1;
  }
  let D=1; for (const p of PR) if (p>2) D*=p-2;
  return {PR, P, bad, delta: D/P};
}
function aggregate(bad, M){
  const A = new Int32Array(M);
  let idx=0;
  for (let i=0;i<bad.length;i++){ if (!bad[i]) A[idx]++; if (++idx===M) idx=0; }
  return A;
}
function windowSums(A, w){
  const M = A.length, S = new Float64Array(M);
  let s=0; for (let i=0;i<w;i++) s+=A[i];
  for (let o=0;o<M;o++){ S[o]=s; s += A[(o+w)%M] - A[o]; }
  return S;
}
function pctile(S, off){
  let less=0;
  for (let i=0;i<S.length;i++) if (S[i]<S[off]) less++;
  return 100*less/S.length;
}

const LO=1667, HI=1956, W=HI-LO, M=2310;   // the vein; W = 289 = 17^2

// ---------------------------------------------------------------------------
// 1 — REPRODUCE at levels 19 and 23, aggregated mod 2310
// ---------------------------------------------------------------------------
console.log(`=== 1: REPRODUCE — band [${LO},${HI}) mod 2310, width ${W} ===`);
const T11 = build(11);
const slots11 = []; for (let r=0;r<M;r++) if (!T11.bad[r]) slots11.push(r);
console.log(`T11: ${slots11.length} slots mod 2310 (expect 135), delta=${T11.delta.toFixed(5)}`);
let A510510 = null;
for (const q of [19,23]){
  const {P, bad, delta} = build(q);
  if (q===23) A510510 = aggregate(bad, 510510);
  const A = q===23 ? (()=>{const B=new Int32Array(M); let i=0; for (let j=0;j<A510510.length;j++){B[i]+=A510510[j]; if(++i===M)i=0;} return B;})()
                   : aggregate(bad, M);
  const S = windowSums(A, W), copies=P/M, mean=delta*copies*W;
  let c=null, exact=true;
  for (let r=0;r<M;r++){
    if (T11.bad[r]) { if (A[r]!==0) exact=false; }
    else { if (c===null) c=A[r]; else if (A[r]!==c) exact=false; }
  }
  console.log(`q=${q}: band sum ${S[LO]} vs mean ${mean.toFixed(1)} -> ratio ${(S[LO]/mean).toFixed(3)}, pctile ${pctile(S,LO).toFixed(2)}% of all 2310 offsets`);
  console.log(`  aggregate mod 2310 = ${c} * T11-indicator exactly: ${exact}`);
}

// ---------------------------------------------------------------------------
// 2 — ANATOMY of the band inside the T11 tile
// ---------------------------------------------------------------------------
console.log(`\n=== 2: ANATOMY — T11 slots in [${LO},${HI}) ===`);
const inBand = slots11.filter(r=>r>=LO && r<HI);
const fair = slots11.length*W/M;
{
  let prev=null;
  const rows = inBand.map(r=>{
    const g = prev===null?'-':r-prev; prev=r;
    return `r=${r} (mod30=${r%30}, gap ${g})`;
  });
  console.log(rows.join('\n'));
  const cls = {11:0,17:0,29:0}; for (const r of inBand) cls[r%30]++;
  console.log(`count ${inBand.length} vs fair ${fair.toFixed(2)} (binomial sd ~${Math.sqrt(fair*(1-slots11.length/M)).toFixed(2)})`);
  console.log(`mod-30 classes: 11->${cls[11]}, 17->${cls[17]}, 29->${cls[29]} (fair: 1/3 each = ${(inBand.length/3).toFixed(1)}); global mean gap ${(M/slots11.length).toFixed(1)}, band mean gap ${((inBand[inBand.length-1]-inBand[0])/(inBand.length-1)).toFixed(1)}`);
  // where does the band rank among ALL width-289 windows of the T11 tile?
  const I11 = new Int32Array(M); for (const r of slots11) I11[r]=1;
  const S11 = windowSums(I11, W);
  let mx=0; for (let o=0;o<M;o++) if (S11[o]>mx) mx=S11[o];
  let tie=0, above=0; const argmax=[];
  for (let o=0;o<M;o++){ if (S11[o]>=S11[LO]){ tie++; if (S11[o]>S11[LO]) above++; } if (S11[o]===mx) argmax.push(o); }
  console.log(`T11 window count at ${LO}: ${S11[LO]}; global max ${mx} at ${argmax.length} offsets (e.g. ${argmax.slice(0,6).join(',')})`);
  console.log(`offsets with count >= band's: ${tie} of 2310 (${(100*tie/M).toFixed(1)}%), strictly above: ${above}`);
  globalThis._S11 = S11;   // reuse below
}

// ---------------------------------------------------------------------------
// 3a — MIRROR: r -> 2308-r symmetry
// ---------------------------------------------------------------------------
console.log(`\n=== 3a: MIRROR (r -> 2310-2-r, center 1154) ===`);
{
  const S11 = globalThis._S11;
  // mirror of window [o,o+W) is [2309-o-W, 2309-o)
  const mo = (2309-LO-W+2*M)%M;   // = 353
  const cnt = f=>slots11.filter(r=>r>=f[0]&&r<f[1]).length;
  console.log(`vein [${LO},${HI}) mirrors to [${mo},${mo+W}): T11 counts ${S11[LO]} vs ${S11[mo]} — mirror is EQUALLY rich (exact symmetry), not poor`);
  let sym=true; for (let r=0;r<M;r++) if (T11.bad[r]!==T11.bad[(2308-r+M)%M]) sym=false;
  console.log(`T11 symmetric under r->2308-r: ${sym}`);
  console.log(`contrast — fossil [121,242): ${cnt([121,242])} slots; its mirror [2067,2188): ${cnt([2067,2188])} slots (equal by same symmetry)`);
  console.log(`note: mirror band [${mo},${mo+W}) contains 361=19^2 and 529=23^2, but full-period aggregates are exactly T11-proportional, so no fossil content survives mod 2310`);
}

// ---------------------------------------------------------------------------
// 3b — offsets vs 1155 / 1154
// ---------------------------------------------------------------------------
console.log(`\n=== 3b: OFFSETS vs half-width ===`);
console.log(`LO-1155=${LO-1155}, LO-1154=${LO-1154}, (HI-1)-1154=${HI-1-1154}; band center ${(LO+HI-1)/2} = 1154+${(LO+HI-1)/2-1154}`);
console.log(`factorizations: 513=27*19, 657=9*73, 801=9*89 — no primorial/seam arithmetic; the only exact relation is the mirror pairing of 3a`);

// ---------------------------------------------------------------------------
// 3c — kill structure at levels 13..23 / per-copy luck mod 510510
// ---------------------------------------------------------------------------
console.log(`\n=== 3c: KILLS — aggregate vs per-copy ===`);
{
  const T17 = build(17);
  let ok=true;
  for (let i=0;i<510510;i++){ const want=T17.bad[i]?0:357; if (A510510[i]!==want){ ok=false; break; } }
  console.log(`level-23 aggregate mod 510510 = 357 * T17-indicator exactly: ${ok} (357 = (19-2)*(23-2) = 17*21)`);
  console.log(`aggregate kill rate is UNIFORM: every T11 slot keeps exactly 11*15*17*21 = 58905 of its 96577 lifts to mod P(23) — no band residue is favored in aggregate`);
  // per-copy: scan window sums = T17 slot counts; the vein has 221 copies mod 510510
  const I17 = new Int32Array(510510); for (let i=0;i<510510;i++) if (!T17.bad[i]) I17[i]=1;
  const S17 = windowSums(I17, W);
  const copiesN = 510510/M;   // 221
  const hist = {};
  let veinMaxK=[];
  for (let k=0;k<copiesN;k++){
    const o = LO + M*k, v = S17[o];
    hist[v]=(hist[v]||0)+1;
    if (v===18) veinMaxK.push(o);
  }
  const meanCopy = Object.entries(hist).reduce((a,[v,n])=>a+v*n,0)/copiesN;
  console.log(`vein window over its ${copiesN} copies mod 510510: T17 counts ${Object.entries(hist).sort((a,b)=>a[0]-b[0]).map(([v,n])=>`${v}x${n}`).join(', ')}`);
  console.log(`mean ${meanCopy.toFixed(2)} vs prediction ${inBand.length}*(11/13)*(15/17) = ${(inBand.length*(11/13)*(15/17)).toFixed(2)}; copies at scan max 18: [${veinMaxK.join(', ')}] (tomography found 452117, 482147)`);
  // which band slots die by 13/17 in the record copies
  for (const o of veinMaxK){
    const dead = inBand.filter(r=>T17.bad[o+(r-LO)]).map(r=>{
      const pos=o+(r-LO), by=[];
      if (pos%13===0||pos%13===11) by.push(13);
      if (pos%17===0||pos%17===15) by.push(17);
      return `${r}(by ${by.join(',')})`;
    });
    console.log(`  copy o=${o}: ${18} of ${inBand.length} band slots alive; dead: ${dead.join(', ')}`);
  }
  // mechanism check: a copy kills whole residue classes — 13 kills classes
  // {a, a+11} mod 13, 17 kills {b, b+15} mod 17, and (a,b) sweeps all 221
  // combos across copies (2310 invertible mod 13 and 17). So the per-copy
  // histogram is DETERMINED by the band slots' class profiles:
  const h13 = new Int32Array(13), h17 = new Int32Array(17);
  for (const r of inBand){ h13[r%13]++; h17[r%17]++; }
  const f13 = Array.from({length:13},(_,a)=>h13[a]+h13[(a+11)%13]);
  const f17 = Array.from({length:17},(_,b)=>h17[b]+h17[(b+15)%17]);
  const pred = {};   // exact: deaths = |class-union|, NOT f13+f17 (overlap!)
  for (let a=0;a<13;a++) for (let b=0;b<17;b++){
    let dead=0;
    for (const r of inBand){
      const d13 = r%13===a || r%13===(a+11)%13;
      const d17 = r%17===b || r%17===(b+15)%17;
      if (d13||d17) dead++;
    }
    const v=inBand.length-dead; pred[v]=(pred[v]||0)+1;
  }
  console.log(`class-kill profiles: f13 per class-pair ${JSON.stringify(f13)}, f17 ${JSON.stringify(f17)}`);
  console.log(`predicted per-copy histogram (union of killed classes over all 221 (a,b)): ${Object.entries(pred).sort((x,y)=>x[0]-y[0]).map(([v,n])=>`${v}x${n}`).join(', ')} — matches observed: ${Object.entries(pred).every(([v,n])=>hist[v]===n)}`);
  console.log(`min kills: ${Math.min(...f13)} by 13 (x${f13.filter(x=>x===Math.min(...f13)).length} class-pairs) + ${Math.min(...f17)} by 17 (x${f17.filter(x=>x===Math.min(...f17)).length}) -> ${f13.filter(x=>x===Math.min(...f13)).length*f17.filter(x=>x===Math.min(...f17)).length} copies at the ceiling ${inBand.length-Math.min(...f13)-Math.min(...f17)}`);
  // global max-tie census by residue mod 2310
  let mx=0; for (let o=0;o<510510;o++) if (S17[o]>mx) mx=S17[o];
  const tally={}; let nmax=0;
  for (let o=0;o<510510;o++) if (S17[o]===mx){ nmax++; const r=o%M; tally[r]=(tally[r]||0)+1; }
  const top = Object.entries(tally).sort((a,b)=>b[1]-a[1]).slice(0,8);
  console.log(`global scan max ${mx}: ${nmax} tied offsets across ${Object.keys(tally).length} residues mod 2310; top residues: ${top.map(([r,n])=>`${r}x${n} (S11=${globalThis._S11[r]})`).join(', ')}`);
  // how special is the vein among the mod-2310 offsets that reach the max at all?
  const reach = Object.keys(tally).map(Number).sort((a,b)=>tally[b]-tally[a]||a-b);
  const veinRank = reach.indexOf(LO);
  console.log(`vein residue ${LO} produces ${tally[LO]||0} of the ${nmax} max windows (rank ${veinRank+1} by count); mirror residue 353 produces ${tally[353]||0}`);
  const byS11={}, seamW={};
  for (const r of reach){ const s=globalThis._S11[r]; byS11[s]=(byS11[s]||0)+1; if (r===0 || M-r<W) seamW[s]=(seamW[s]||0)+tally[r]; }
  console.log(`the 36 max residues by T11 window count: ${Object.entries(byS11).sort((x,y)=>y[0]-x[0]).map(([s,n])=>`S11=${s}: ${n} residues`).join(', ')}; max windows containing a k*2310 seam (wrap): ${Object.values(seamW).reduce((a,b)=>a+b,0)} of ${nmax}`);
}

// ---------------------------------------------------------------------------
// 4 — VERDICT numbers
// ---------------------------------------------------------------------------
console.log(`\n=== 4: VERDICT numbers ===`);
{
  const S11 = globalThis._S11;
  let mx=0; for (let o=0;o<M;o++) if (S11[o]>mx) mx=S11[o];
  const bands=[];
  for (let o=0;o<M;o++) if (S11[o]>=S11[LO]) bands.push(o);
  // collapse runs of consecutive offsets into plateaus for readability
  const runs=[]; let s=bands[0], pr=bands[0];
  for (let i=1;i<=bands.length;i++){
    if (i<bands.length && bands[i]===pr+1){ pr=bands[i]; continue; }
    runs.push(s===pr?`${s}`:`${s}-${pr}`);
    if (i<bands.length){ s=bands[i]; pr=bands[i]; }
  }
  console.log(`mod-2310 offsets with T11 window count >= vein's ${S11[LO]}: ${bands.length} (max ${mx}); as runs: ${runs.join(', ')}`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/attack2-rich-vein.js
//   invocation:  node research/attack2-rich-vein.js
//   code-sha256: 51a06d04e1746719abb7127aca964c493629e15a35aa07b028f21f2dee631db7
//   out-sha256:  f480305a40ea4dc80c4277050d2f7203a5e16b333dd99c96f9850a9d3127419a
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.9 s
// ============================================================================
// === 1: REPRODUCE — band [1667,1956) mod 2310, width 289 ===
// T11: 135 slots mod 2310 (expect 135), delta=0.05844
// q=19: band sum 56100 vs mean 47375.4 -> ratio 1.184, pctile 97.49% of all 2310 offsets
//   aggregate mod 2310 = 2805 * T11-indicator exactly: true
// q=23: band sum 1178100 vs mean 994882.5 -> ratio 1.184, pctile 97.49% of all 2310 offsets
//   aggregate mod 2310 = 58905 * T11-indicator exactly: true
//
// === 2: ANATOMY — T11 slots in [1667,1956) ===
// r=1667 (mod30=17, gap -)
// r=1679 (mod30=29, gap 12)
// r=1691 (mod30=11, gap 12)
// r=1697 (mod30=17, gap 6)
// r=1709 (mod30=29, gap 12)
// r=1721 (mod30=11, gap 12)
// r=1739 (mod30=29, gap 18)
// r=1751 (mod30=11, gap 12)
// r=1781 (mod30=11, gap 30)
// r=1787 (mod30=17, gap 6)
// r=1817 (mod30=17, gap 30)
// r=1829 (mod30=29, gap 12)
// r=1847 (mod30=17, gap 18)
// r=1871 (mod30=11, gap 24)
// r=1877 (mod30=17, gap 6)
// r=1889 (mod30=29, gap 12)
// r=1907 (mod30=17, gap 18)
// r=1919 (mod30=29, gap 12)
// r=1931 (mod30=11, gap 12)
// r=1949 (mod30=29, gap 18)
// count 20 vs fair 16.89 (binomial sd ~3.99)
// mod-30 classes: 11->6, 17->7, 29->7 (fair: 1/3 each = 6.7); global mean gap 17.1, band mean gap 14.8
// T11 window count at 1667: 20; global max 20 at 58 offsets (e.g. 341,342,343,344,345,346)
// offsets with count >= band's: 58 of 2310 (2.5%), strictly above: 0
//
// === 3a: MIRROR (r -> 2310-2-r, center 1154) ===
// vein [1667,1956) mirrors to [353,642): T11 counts 20 vs 20 — mirror is EQUALLY rich (exact symmetry), not poor
// T11 symmetric under r->2308-r: true
// contrast — fossil [121,242): 9 slots; its mirror [2067,2188): 9 slots (equal by same symmetry)
// note: mirror band [353,642) contains 361=19^2 and 529=23^2, but full-period aggregates are exactly T11-proportional, so no fossil content survives mod 2310
//
// === 3b: OFFSETS vs half-width ===
// LO-1155=512, LO-1154=513, (HI-1)-1154=801; band center 1811 = 1154+657
// factorizations: 513=27*19, 657=9*73, 801=9*89 — no primorial/seam arithmetic; the only exact relation is the mirror pairing of 3a
//
// === 3c: KILLS — aggregate vs per-copy ===
// level-23 aggregate mod 510510 = 357 * T17-indicator exactly: true (357 = (19-2)*(23-2) = 17*21)
// aggregate kill rate is UNIFORM: every T11 slot keeps exactly 11*15*17*21 = 58905 of its 96577 lifts to mod P(23) — no band residue is favored in aggregate
// vein window over its 221 copies mod 510510: T17 counts 11x2, 12x5, 13x27, 14x41, 15x66, 16x61, 17x15, 18x4
// mean 14.93 vs prediction 20*(11/13)*(15/17) = 14.93; copies at scan max 18: [331997, 362027, 452117, 482147] (tomography found 452117, 482147)
//   copy o=331997: 18 of 20 band slots alive; dead: 1697(by 17), 1781(by 13)
//   copy o=362027: 18 of 20 band slots alive; dead: 1721(by 17), 1781(by 13)
//   copy o=452117: 18 of 20 band slots alive; dead: 1697(by 17), 1781(by 13)
//   copy o=482147: 18 of 20 band slots alive; dead: 1691(by 17), 1781(by 13)
// class-kill profiles: f13 per class-pair [1,4,2,3,2,3,3,4,3,5,3,3,4], f17 [3,2,3,3,3,2,1,2,1,2,3,3,2,4,1,4,1]
// predicted per-copy histogram (union of killed classes over all 221 (a,b)): 11x2, 12x5, 13x27, 14x41, 15x66, 16x61, 17x15, 18x4 — matches observed: true
// min kills: 1 by 13 (x1 class-pairs) + 1 by 17 (x4) -> 4 copies at the ceiling 18
// global scan max 18: 120 tied offsets across 36 residues mod 2310; top residues: 353x4 (S11=20), 354x4 (S11=20), 355x4 (S11=20), 356x4 (S11=20), 357x4 (S11=20), 358x4 (S11=20), 359x4 (S11=20), 1661x4 (S11=20)
// vein residue 1667 produces 4 of the 120 max windows (rank 14 by count); mirror residue 353 produces 4
// the 36 max residues by T11 window count: S11=20: 30 residues, S11=19: 4 residues, S11=18: 2 residues; max windows containing a k*2310 seam (wrap): 62 of 120
//
// === 4: VERDICT numbers ===
// mod-2310 offsets with T11 window count >= vein's 20: 58 (max 20); as runs: 341-347, 353-359, 371-377, 1643-1649, 1661-1667, 1673-1679, 2063-2069, 2081, 2249, 2261-2267
// ============================================================================
// READINGS:
// 1. THE VEIN IS A T11 FOSSIL-IN-REVERSE, AND IT'S EXACT. By the CRT
//    identity (tomography reading 1) the full-period aggregate mod 2310 of
//    EVERY level >= 11 is a constant times the T11 tile — verified to the
//    integer at levels 19 and 23. So the vein neither emerges nor decays:
//    [1667,1956) holds 20 of T11's 135 slots (fair share 16.9), ratio
//    1.184 at 97.5 pctile, frozen forever. It is a real, exactly repeating
//    structure of the level-11 tile — the same early-era layout luck as
//    11's enriched fossil band, but at the RICH ceiling and at a non-seam,
//    non-p^2 place: pure T11 layout, no landmark.
// 2. IT SITS AT THE WIDTH-289 CEILING, BUT THE CEILING IS A PLATEAU. No
//    width-289 window of T11 holds more than 20 slots, and the vein holds
//    20 — but so do 57 other offsets (2.5% of all), in 5 mirror-paired
//    runs. So "anomalously rich" = "one of the ~5 maximal regions of the
//    T11 tile", not a unique feature.
// 3. MIRROR HYPOTHESIS RESOLVED (inverted): the vein is NOT the image of a
//    poor band — the twin-slot condition is symmetric under r -> P-2-r, so
//    the aggregate profile is exactly palindromic about 1154 and the
//    mirror band [353,642) is equally rich. Every ceiling run has its
//    mirror twin in the list. The 19^2/23^2 coincidence in the mirror band
//    is inert (aggregates are exactly T11-proportional). Offset arithmetic
//    vs 1155 (512, 657, 801) carries no structure.
// 4. WHY THE BLIND SCAN SAW IT TWICE — TWO-STAGE MECHANISM. Stage 1
//    (deterministic): mod 510510 the level-23 aggregate is exactly 357x
//    the T17 tile, and a window's T17 count is bounded by its T11 count;
//    scan-max windows need T11 count 20 (30 of the 36 max residues).
//    Stage 2 (combinatorial luck): within a residue, copy (a,b) kills
//    whole classes {a,a+11} mod 13 and {b,b+15} mod 17 — the vein's slot
//    layout has minimum kills 1+1 (the f13=1 pair kills only 1781=13*137),
//    giving exactly 4 of 221 copies at the ceiling 18; the per-copy
//    histogram is reproduced exactly by this class-union calculation.
//    Tomography's two top-5 hits are 2 of these 4 (its overlap-suppressed
//    pick among 120 ties). And tomography's "richest windows align with
//    seams" is the SAME phenomenon: the 62 seam-containing max windows are
//    the wrap-runs 2063-2267, i.e. the ceiling-plateau segment that
//    happens to straddle 0 — seam-richness and the vein are both faces of
//    the T11 ceiling plateau.
// 5. VERDICT: REAL STRUCTURE, KNOWN MECHANISM, NO NEW PHYSICS. The vein is
//    a genuine, exactly-repeating enrichment (T11 ceiling region, frozen
//    by CRT at every level), so it is NOT width-289 sampling luck in the
//    sense of being spurious — but its "top-5 twice" billing overstates
//    uniqueness: 58 offsets mod 2310 tie its T11 count and 120 windows mod
//    510510 tie the scan max. What was luck is only WHICH plateau members
//    the tie-breaking surfaced. Mechanism, fully stated: 20-of-135 T11
//    slots in 289 positions (layout luck of the level-11 tile, mirror-
//    symmetric), propagated exactly by uniform CRT survival, topped by a
//    favorable mod-13/17 class layout that lets 4 copies per 510510 reach
//    the width-289 T17 ceiling.
//
// Context notes carried out of the pre-embed OUTPUT block (2026-08-19):
//
// 1 REPRODUCE — band [1667,1956) mod 2310 (width 289):
//   q=19: ratio 1.184 (56100 vs 47375.4), pctile 97.49% of all 2310 offsets
//   q=23: ratio 1.184 (1178100 vs 994882.5), pctile 97.49%
//   Aggregate mod 2310 verified EXACTLY = c * T11-indicator: c = 2805 =
//   11*15*17 at level 19, c = 58905 = 11*15*17*21 at level 23.
//
// 2 ANATOMY — 20 of T11's 135 slots in the band vs fair 16.89 (sd ~3.99):
//   1667,1679,1691,1697,1709,1721,1739,1751,1781,1787,1817,1829,1847,1871,
//   1877,1889,1907,1919,1931,1949. mod-30 classes 11/17/29 -> 6/7/7 (fair
//   6.7 each). Band mean gap 14.8 vs global 17.1; densest stretch
//   1667..1751 = 8 slots in 85. The T11 width-289 window count at 1667 is
//   20 — which is the GLOBAL MAX over all 2310 offsets; 58 offsets tie it,
//   0 exceed it.
//
// 3a MIRROR — T11 symmetric under r -> 2308-r (verified). Vein mirrors to
//   [353,642): also 20 slots — EQUALLY RICH, not poor. Fossil [121,242) = 9
//   slots mirrors to [2067,2188) = 9. ([353,642) contains 361=19^2 and
//   529=23^2, but aggregates are exactly T11-proportional: inert.)
// 3b OFFSETS — 1667-1155=512, center 1811 = 1154+657 = 1154+9*73; no
//   primorial arithmetic; the only exact relation is the mirror pairing.
// 3c KILLS — level-23 aggregate mod 510510 = 357 * T17-indicator exactly;
//   aggregate survival is UNIFORM (58905 of 96577 lifts per T11 slot).
//   Per-copy (221 copies of the vein window mod 510510): T17 counts
//   11x2, 12x5, 13x27, 14x41, 15x66, 16x61, 17x15, 18x4; mean 14.93 =
//   20*(11/13)*(15/17) exactly. Histogram is fully REPRODUCED by class
//   kills: 13 kills classes {a,a+11} mod 13 (f13 = [1,4,2,3,2,3,3,4,3,5,
//   3,3,4]), 17 kills {b,b+15} mod 17 (f17 min 1, x4), union over all 221
//   (a,b) — exact match. min-kill copies: unique f13=1 pair hits only slot
//   1781 = 13*137; 1 + 1 kills -> exactly 4 copies at ceiling 18
//   (offs 331997, 362027, 452117, 482147 — tomography's two hits + 2 more,
//   all = 1667 mod 2310; dead slots: 1781 by 13 every time, plus one of
//   1691/1697/1721 by 17).
//   Global scan max 18: 120 tied offsets over 36 residues mod 2310; 30 of
//   36 residues have T11 window count 20 (4 have 19, 2 have 18); 62 of 120
//   contain a k*2310 seam — exactly tomography's count, and they are the
//   wrap-runs 2063-2069, 2081, 2249, 2261-2267 (windows crossing 0).
//
// 4 VERDICT NUMBERS — offsets tying the vein's 20: 58 of 2310 (2.5%), as
//   10 runs = 5 exact mirror pairs: 341-347<->1673-1679, 353-359<->
//   1661-1667, 371-377<->1643-1649, 2063-2069<->2261-2267, 2081<->2249.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings and the carried-over context notes above that the
// embedded run does not contain verbatim actually is. No number above was
// changed.
//
// ROUNDINGS of a value this file's own embedded run prints (printed value
// first):
//   16.89 -> 16.9, the band's fair share, reading 1.
//   97.49 -> 97.5, the band's percentile among all 2310 offsets, reading 1.
//
// SAME VALUES, DIFFERENT LAYOUT:
//   The two comma lists of band slots in context note 2, 1667 through 1949,
//   are the twenty "r=" lines of section 2 of the run set on one line. Every
//   value matches, in the printed order.
//
// TOKENIZER ARTIFACT, not a figure:
//   289 read out of the compound "width-289" in readings 2 and 5, and 135
//   read out of "20-of-135" in reading 5. Both values are printed: the run
//   labels the band "width 289" and prints "T11: 135 slots mod 2310".
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   137 in reading 4 is a factorization of the printed dead slot 1781:
//   13 x 137 = 1781. The run prints 1781 as the slot killed by 13 in all
//   four ceiling copies; it does not print the cofactor.
// ---------------------------------------------------------------------------
