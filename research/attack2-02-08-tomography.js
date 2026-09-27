// ============================================================================
// ATTACKS 2 + 8 — STRATA TOMOGRAPHY & THE 11 ANOMALY (2026-08-14)
//
// ⚠ READING 3 IS SUPERSEDED (by attack2-rich-vein.js, same day). Its parts (b)
// and (c) are the two halves of one phenomenon and neither is what this file
// called it:
//   (b) "seams as the anti-shadow" — the 62 seam-containing max-tied windows
//       are not a seam effect. They are the wrap-runs 2063-2267, i.e. the
//       stretch of the T11 ceiling plateau that happens to straddle 0.
//   (c) the "novelty" rich vein at [1667,1956) mod 2310 is SOLVED, and it is
//       not novel: 58 of 2310 offsets tie its T11 window count of 20, in five
//       mirror-paired runs, and its two top-5 appearances here are 2 of the
//       4 copies per 510510 that reach the width-289 T17 ceiling.
// Reading 1 (the CRT identity), reading 2 (the tomogram ranking), readings 4
// and 5 (the 11-anomaly verdict) all stand. Kept unedited below.
// Follow-up to fossil-shadows.js (which established the fossil law for p>=17
// and flagged 11's band as anomalously ENRICHED, 87th pctile at level 19).
//
// ATTACK 2 (tomography):
// (a) Track 13's stratum [169,338) mod 30030 through levels 13,17,19,23:
//     band density over ALL copies vs global delta, plus percentile among
//     ALL width-169 offsets mod 30030 (aggregate slot counts by residue
//     mod 30030, circular sliding-window sums). Constant like 17's, or drift?
// (b) Level-23 coarse tomogram: percentile-rank [p^2, 2p^2) mod P(p) for
//     p = 7, 11, 13, 17, 19; then slide width-289 windows mod 510510 and
//     report the 5 deepest + 5 richest (non-overlapping) offsets — do they
//     align with p^2 bands, seams k*P, or something new?
//
// ATTACK 8 (the 11 anomaly):
// Hypothesis: 11's band [121,242) mod 2310 is enriched because it straddles
// seam structure (210 = previous primorial; near-seam slots are r = -1 mod 30
// — note kP+1 is never a twin-slot START since kP+1 = 1 mod 3).
// At level 19: list every twin slot in the band by residue, classify
// near-seam (within 2 of a multiple of 210 or 30) vs not, and recompute the
// band's density without near-seam slots — against BOTH the raw global delta
// and the fair control (global density restricted to non-near-seam positions,
// which is 0.8*delta since only residue class 29 of {11,17,29} mod 30 is
// near-seam). Same decomposition for 7's band [49,98) mod 210 and 13's
// [169,338) mod 30030. At what p does fossil signal dominate seam signal?
//
// Run: node --max-old-space-size=2048 attack2-02-08-tomography.js
// (level 23 pattern = 223,092,870-byte Uint8Array)
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

// slot counts by residue mod M (single pass, wrap counter — no % per element)
function aggregate(bad, M){
  const A = new Int32Array(M);
  let idx=0;
  for (let i=0;i<bad.length;i++){ if (!bad[i]) A[idx]++; if (++idx===M) idx=0; }
  return A;
}
function fold(A, M2){           // M2 must divide A.length
  const B = new Int32Array(M2);
  let idx=0;
  for (let i=0;i<A.length;i++){ B[idx]+=A[i]; if (++idx===M2) idx=0; }
  return B;
}
function windowSums(A, w){      // circular sliding sums, S[o] = sum A[o..o+w)
  const M = A.length, S = new Float64Array(M);
  let s=0; for (let i=0;i<w;i++) s+=A[i];
  for (let o=0;o<M;o++){ S[o]=s; s += A[(o+w)%M] - A[o]; }
  return S;
}
function pctile(S, off){        // % of offsets strictly shallower; low = deep
  let less=0;
  for (let i=0;i<S.length;i++) if (S[i]<S[off]) less++;
  return 100*less/S.length;
}
function bandStat(A, w, off, delta, copies){
  const S = windowSums(A, w);
  const mean = delta*copies*w;            // expected window sum
  return {ratio: S[off]/mean, pct: pctile(S, off), sum: S[off], S};
}

// top-n extreme windows, suppressing overlaps (circular distance >= w apart)
function topExtremes(S, w, n){
  const M=S.length;
  const idx = Array.from({length:M},(_,i)=>i).sort((a,b)=>S[a]-S[b]);
  const pick = order => {
    const out=[];
    for (const o of order){
      let ok=true;
      for (const u of out){ const d=Math.abs(u-o); if (Math.min(d,M-d)<w){ ok=false; break; } }
      if (ok){ out.push(o); if (out.length===n) break; }
    }
    return out;
  };
  return {deepest: pick(idx), richest: pick(idx.slice().reverse())};
}
function annotate(o, w){        // what does window [o, o+w) mod 510510 touch?
  // NB: w=289 > 210, so EVERY window contains a full mod-210 period (7's band
  // and all k*210 seams are vacuous landmarks at this width — omitted).
  const notes=[];
  for (const [p, Pp] of [[11,2310],[13,30030],[17,510510],[19,510510],[23,510510]]){
    // fossil band [p^2,2p^2) mod P(p); for p=19,23 the band folds to the same
    // residues mod 510510 (since 510510 | P(p)) but diluted 1/19, 1/437
    const lo=p*p, hi=2*p*p, r=o%Pp;
    if (r < hi && r + w > lo) notes.push(`overlaps p=${p} band [${lo},${hi}) mod ${Pp}${p>17?' (folded/diluted)':''}`);
  }
  for (const L of [2310,30030,510510]){
    const r = o%L;
    if (r===0 || L-r < w) notes.push(`contains k*${L} seam`);
  }
  notes.push(`o mod 2310=${o%2310}, o mod 30030=${o%30030}`);
  return notes.join('; ');
}

// ---------------------------------------------------------------------------
// ATTACK 2a — 13's stratum trajectory through levels 13, 17, 19, 23
// ---------------------------------------------------------------------------
console.log('=== ATTACK 2a: 13-stratum [169,338) mod 30030 through the levels ===');
console.log('level | ratio (band/global) | pctile of width-169 offsets | copies');
const keep = {};   // stash per-level aggregates for later attacks
for (const q of [13,17,19,23]){
  const {P, bad, delta} = build(q);
  const topM = Math.min(P, 9699690);
  const A = aggregate(bad, topM);
  keep[q] = {P, delta, A, topM};
  const A30030 = topM===30030 ? A : fold(A, 30030);
  keep[q].A30030 = A30030;
  const st = bandStat(A30030, 169, 169, delta, P/30030);
  console.log(`q=${q} | ${st.ratio.toFixed(3)} (${st.sum}/${(delta*(P/30030)*169).toFixed(1)}) | ${st.pct.toFixed(2)}% | ${P/30030}`);
  if (q!==19 && q!==23) delete keep[q].A;   // only need mod-30030 for 13/17
}

// ---------------------------------------------------------------------------
// ATTACK 2b — level-23 tomogram
// ---------------------------------------------------------------------------
console.log('\n=== ATTACK 2b: level-23 tomogram of all fossil bands ===');
console.log('prime | band | ratio | pctile among all same-width offsets');
{
  const {P, delta, A} = keep[23];                      // A = counts mod 9699690
  const AG = {9699690:A, 510510:fold(A,510510), 30030:keep[23].A30030,
              2310:fold(A,2310), 210:fold(A,210)};
  for (const [p, Pp] of [[7,210],[11,2310],[13,30030],[17,510510],[19,9699690]]){
    const st = bandStat(AG[Pp], p*p, p*p, delta, P/Pp);
    console.log(`p=${p} | [${p*p},${2*p*p}) mod ${Pp} | ${st.ratio.toFixed(3)} | ${st.pct.toFixed(2)}%`);
  }
  // blind scan: width-289 windows mod 510510
  console.log('\n--- blind scan: width-289 windows mod 510510 (437 copies each) ---');
  const S = windowSums(AG[510510], 289);
  const mean = delta*(P/510510)*289;
  const {deepest, richest} = topExtremes(S, 289, 5);
  console.log('5 DEEPEST (non-overlapping):');
  for (const o of deepest) console.log(`  off ${o}: ratio ${(S[o]/mean).toFixed(3)} — ${annotate(o,289)}`);
  console.log('5 RICHEST (non-overlapping):');
  for (const o of richest) console.log(`  off ${o}: ratio ${(S[o]/mean).toFixed(3)} — ${annotate(o,289)}`);
  // tie structure: extreme sums are integers, so count offsets AT the extremes
  // and ask what fraction of them sit on known landmarks
  let mn=Infinity, mx=-Infinity;
  for (let i=0;i<S.length;i++){ if (S[i]<mn) mn=S[i]; if (S[i]>mx) mx=S[i]; }
  for (const [name, val] of [['min',mn],['max',mx]]){
    let n=0, seam2310=0, seam30030=0, inStack=0;
    for (let o=0;o<S.length;o++) if (S[o]===val){
      n++;
      const r=o%2310; if (r===0 || 2310-r<289) seam2310++;
      const r3=o%30030; if (r3===0 || 30030-r3<289) seam30030++;
      if (o<722 && o+289>289) inStack++;   // overlaps stacked 17/19/23 strata
    }
    console.log(`${name} window sum ${val} (ratio ${(val/mean).toFixed(3)}): ${n} tied offsets — ${seam2310} contain k*2310 seam, ${seam30030} contain k*30030 seam, ${inStack} overlap the 17/19/23 strata stack [289,722)`);
  }
}

// ---------------------------------------------------------------------------
// ATTACK 8 — seam decomposition of the small-p bands (at level 19)
// ---------------------------------------------------------------------------
console.log('\n=== ATTACK 8: seam decomposition at level 19 ===');
const nearSeam = r => {
  const d30 = Math.min(r%30, 30-(r%30));
  const d210 = Math.min(r%210, 210-(r%210));
  return d30<=2 || d210<=2;
};
{
  const {P, delta, A} = keep[19];                      // counts mod 9699690
  const AG = {30030:keep[19].A30030, 2310:fold(A,2310), 210:fold(A,210)};
  for (const [p, Pp] of [[7,210],[11,2310],[13,30030]]){
    const M=Pp, B=AG[Pp], copies=P/M, lo=p*p, hi=2*p*p;
    // fair controls: global density restricted to non-near-seam positions,
    // and restricted to near-seam positions (seam positions carry 2*delta
    // globally: 1/3 of slot classes mod 30 packed into 1/6 of positions)
    let gAll=0, gSeam=0, posSeam=0;
    for (let r=0;r<M;r++){ gAll+=B[r]; if (nearSeam(r)){ gSeam+=B[r]; posSeam++; } }
    const deltaNS = (gAll-gSeam)/((M-posSeam)*copies);
    const deltaS  = gSeam/(posSeam*copies);
    let cAll=0, cSeam=0, wSeam=0, nRes=0, nResSeam=0;
    console.log(`\np=${p}: band [${lo},${hi}) mod ${M} — twin slots by residue:`);
    for (let r=lo;r<hi;r++){
      if (nearSeam(r)) wSeam++;
      if (B[r]>0){
        cAll+=B[r]; nRes++;
        const ns = nearSeam(r);
        if (ns){ cSeam+=B[r]; nResSeam++; }
        const anchor = ns ? `NEAR-SEAM (anchor ${Math.round(r/30)*30}${(r%210>=208||r%210<=2)?' = k*210':''})` : 'interior';
        console.log(`  r=${r}: ${B[r]} copies — ${anchor}`);
      }
    }
    const w=hi-lo;
    const rAll = (cAll/(w*copies))/delta;
    const rExRaw = ((cAll-cSeam)/(w*copies))/delta;             // slots removed, width kept
    const rExFair = ((cAll-cSeam)/((w-wSeam)*copies))/deltaNS;  // interior vs interior control
    const rSeam = wSeam ? (cSeam/(wSeam*copies))/deltaS : NaN;  // seam vs seam control
    console.log(`  ${nResSeam} of ${nRes} slot residues near-seam (${wSeam} of ${w} positions near-seam)`);
    console.log(`  ratio all=${rAll.toFixed(3)} | ex-seam (raw width, vs delta)=${rExRaw.toFixed(3)} | interior vs interior-control=${rExFair.toFixed(3)} | seam vs seam-control=${rSeam.toFixed(3)}`);
    console.log(`  [controls: deltaNS/delta=${(deltaNS/delta).toFixed(3)}, deltaSeam/delta=${(deltaS/delta).toFixed(3)}]`);
  }
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/attack2-02-08-tomography.js
//   invocation:  node research/attack2-02-08-tomography.js
//   code-sha256: f0a47793bec7175f4ccdac3f5f42405131ff434a57dcfef646a0009f55e778d3
//   out-sha256:  20af29ff33667e8f09f39ea97c1d7efe9bb0412d1dbd77702a28292663509ac5
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     1.1 s
// ============================================================================
// === ATTACK 2a: 13-stratum [169,338) mod 30030 through the levels ===
// level | ratio (band/global) | pctile of width-169 offsets | copies
// q=13 | 0.957 (8/8.4) | 22.23% | 1
// q=17 | 0.957 (120/125.4) | 22.23% | 17
// q=19 | 0.957 (2040/2131.1) | 22.23% | 323
// q=23 | 0.957 (42840/44752.5) | 22.23% | 7429
//
// === ATTACK 2b: level-23 tomogram of all fossil bands ===
// prime | band | ratio | pctile among all same-width offsets
// p=7 | [49,98) mod 210 | 0.571 | 0.00%
// p=11 | [121,242) mod 2310 | 1.273 | 86.97%
// p=13 | [169,338) mod 30030 | 0.957 | 22.23%
// p=17 | [289,578) mod 510510 | 0.714 | 0.17%
// p=19 | [361,722) mod 9699690 | 0.639 | 0.03%
//
// --- blind scan: width-289 windows mod 510510 (437 copies each) ---
// 5 DEEPEST (non-overlapping):
//   off 462: ratio 0.634 — overlaps p=17 band [289,578) mod 510510; overlaps p=19 band [361,722) mod 510510 (folded/diluted); overlaps p=23 band [529,1058) mod 510510 (folded/diluted); o mod 2310=462, o mod 30030=462
//   off 36162: ratio 0.634 — o mod 2310=1512, o mod 30030=6132
//   off 37602: ratio 0.634 — o mod 2310=642, o mod 30030=7572
//   off 42948: ratio 0.634 — o mod 2310=1368, o mod 30030=12918
//   off 46842: ratio 0.634 — o mod 2310=642, o mod 30030=16812
// 5 RICHEST (non-overlapping):
//   off 503537: ratio 1.427 — contains k*2310 seam; o mod 2310=2267, o mod 30030=23057
//   off 492179: ratio 1.427 — overlaps p=11 band [121,242) mod 2310; o mod 2310=149, o mod 30030=11699
//   off 482147: ratio 1.427 — o mod 2310=1667, o mod 30030=1667
//   off 464129: ratio 1.427 — contains k*2310 seam; o mod 2310=2129, o mod 30030=13679
//   off 452117: ratio 1.427 — o mod 2310=1667, o mod 30030=1667
// min window sum 2856 (ratio 0.634): 848 tied offsets — 0 contain k*2310 seam, 0 contain k*30030 seam, 70 overlap the 17/19/23 strata stack [289,722)
// max window sum 6426 (ratio 1.427): 120 tied offsets — 62 contain k*2310 seam, 10 contain k*30030 seam, 0 overlap the 17/19/23 strata stack [289,722)
//
// === ATTACK 8: seam decomposition at level 19 ===
//
// p=7: band [49,98) mod 210 — twin slots by residue:
//   r=59: 25245 copies — NEAR-SEAM (anchor 60)
//   r=71: 25245 copies — interior
//   1 of 2 slot residues near-seam (10 of 49 positions near-seam)
//   ratio all=0.571 | ex-seam (raw width, vs delta)=0.286 | interior vs interior-control=0.449 | seam vs seam-control=0.700
//   [controls: deltaNS/delta=0.800, deltaSeam/delta=2.000]
//
// p=11: band [121,242) mod 2310 — twin slots by residue:
//   r=137: 2805 copies — interior
//   r=149: 2805 copies — NEAR-SEAM (anchor 150)
//   r=167: 2805 copies — interior
//   r=179: 2805 copies — NEAR-SEAM (anchor 180)
//   r=191: 2805 copies — interior
//   r=197: 2805 copies — interior
//   r=221: 2805 copies — interior
//   r=227: 2805 copies — interior
//   r=239: 2805 copies — NEAR-SEAM (anchor 240)
//   3 of 9 slot residues near-seam (21 of 121 positions near-seam)
//   ratio all=1.273 | ex-seam (raw width, vs delta)=0.848 | interior vs interior-control=1.283 | seam vs seam-control=1.222
//   [controls: deltaNS/delta=0.800, deltaSeam/delta=2.000]
//
// p=13: band [169,338) mod 30030 — twin slots by residue:
//   r=179: 255 copies — NEAR-SEAM (anchor 180)
//   r=191: 255 copies — interior
//   r=197: 255 copies — interior
//   r=227: 255 copies — interior
//   r=239: 255 copies — NEAR-SEAM (anchor 240)
//   r=269: 255 copies — NEAR-SEAM (anchor 270)
//   r=281: 255 copies — interior
//   r=311: 255 copies — interior
//   3 of 8 slot residues near-seam (30 of 169 positions near-seam)
//   ratio all=0.957 | ex-seam (raw width, vs delta)=0.598 | interior vs interior-control=0.909 | seam vs seam-control=1.011
//   [controls: deltaNS/delta=0.800, deltaSeam/delta=2.000]
// ============================================================================
// READINGS:
// 1. NO DRIFT — AND IT'S A THEOREM, NOT A MEASUREMENT. 13's depth is 0.957 /
//    22.23 pctile at ALL four levels, and the slot counts scale by EXACTLY
//    (p-2) per new prime (8 -> 8*15 -> *17 -> *21). Proof: aggregating the
//    level-q pattern by residue mod P(13), each new prime p sees k*P(13)
//    sweep all residues mod p (CRT), so every level-13-surviving residue
//    keeps exactly (p-2) of every p copies — the mod-P(13) profile is the
//    level-13 pattern times a constant, forever. fossil-shadows' empirical
//    "0.714 at 19 AND 23" for p=17 is this identity in action. The fossil
//    law under full-period aggregation is EXACT for every p; what is
//    statistical (large-p only) is whether the initial dent depth stands
//    out from layout noise.
// 2. TOMOGRAM RANKING: by percentile the fossils rank 7 (0.00) < 19 (0.03)
//    < 17 (0.17) << 13 (22) << 11 (87, enriched). Depth-below-mean is NOT
//    monotone in p — it is frozen early-era luck for p<=13, converging to
//    the statistical shadow law from p=17 on.
// 3. BLIND SCAN SURPRISES: (a) the deepest width-289 window is NOT uniquely
//    the fossil stack — 848 offsets tie at ratio 0.634 and only 70 touch the
//    stack: at width 289, level-17-pattern density fluctuations reach fossil
//    depth in many places (sums are 357*k, k = slots-in-window of the
//    LEVEL-17 pattern — the scan mod 510510 IS the level-17 pattern, by
//    reading 1). The fossil bands are distinguished by being PREDICTABLE
//    (at p^2), not by being the unique extreme at this coarse width.
//    (b) The richest windows align with seams: 52% of max-tied windows
//    contain a k*2310 seam vs 12.5% expected (4x), confirming seams as the
//    anti-shadow. (c) Novelty: a rich vein at [1667,1956) mod 2310 shows up
//    twice in the top 5 — enrichment at a non-seam, non-p^2 residue; same
//    early-era layout luck as 11's band, on the rich side.
// 4. THE 11-ANOMALY VERDICT: the seam hypothesis FAILS in its specific form
//    — the 210-seam pair (209,211) is dead (209 = 11*19, killed by 11
//    itself), so it can't drive the enrichment. Seam bookkeeping is real
//    but insufficient: near-seam slots (149,179,239, all k*30-1) ride the
//    2*delta seam class and removing them drops the raw ratio 1.273 ->
//    0.848; BUT against the fair per-class controls the band is enriched in
//    BOTH components (interior 1.283, seam 1.222). The anomaly is genuine
//    small-number luck: 6 interior slot residues where 4.7 are expected,
//    3 seam residues where 2.45 are expected.
// 5. WHERE FOSSIL BEATS SEAM: p=7's dent survives decomposition (interior
//    0.449, seam 0.700 — deep in both components, deeper than the raw 0.571
//    suggests since slot 59 rides the 2*delta seam class); p=13 shows only
//    a mild interior dent (0.909, within noise); p=11 is enriched outright.
//    So seam/class composition dominates the reading for p<=13 (a handful
//    of slots, each's mod-30 class mattering more than the fossil), and the
//    fossil signal cleanly dominates from p=17 on — same threshold as
//    fossil-shadows reading 2, now with the mechanism decomposed.
//
// Context notes carried out of the pre-embed OUTPUT block (2026-08-19):
//
// ATTACK 2a — 13-stratum [169,338) mod 30030 through the levels:
//   q=13: 0.957 (8 slots), pctile 22.23%     | 1 copy
//   q=17: 0.957 (120 = 8*15), pctile 22.23%  | 17 copies
//   q=19: 0.957 (2040 = 120*17), 22.23%      | 323 copies
//   q=23: 0.957 (42840 = 2040*21), 22.23%    | 7429 copies
//
// ATTACK 2b — level-23 tomogram:
//   p=7  [49,98)   mod 210:     0.571, pctile 0.00% (unique min of 210)
//   p=11 [121,242) mod 2310:    1.273, pctile 86.97%
//   p=13 [169,338) mod 30030:   0.957, pctile 22.23%
//   p=17 [289,578) mod 510510:  0.714, pctile 0.17%
//   p=19 [361,722) mod 9699690: 0.639, pctile 0.03%
//   Blind scan, width-289 windows mod 510510:
//     min ratio 0.634 (sum 2856 = 357*8): 848 tied offsets; 70 overlap the
//       17/19/23 strata stack [289,722), 0 contain k*2310 or k*30030 seams.
//       Deepest non-overlapping incl. off 462 (the stack) + 4 unmarked offs.
//     max ratio 1.427 (sum 6426 = 357*18): 120 tied offsets; 62 contain a
//       k*2310 seam (expect 12.5% at random = ~15), 10 contain k*30030,
//       0 in the stack. Two of the top-5 sit at the same residue 1667 mod
//       2310 (offs 452117, 482147) — a recurring rich vein.
//
// ATTACK 8 — seam decomposition at level 19 (controls are EXACT:
// near-seam positions globally carry 2.000*delta, interior 0.800*delta —
// only slot class r=29 mod 30 is near-seam, 1/3 of slots in 1/6 of space;
// kP+1 is never a slot START since kP+1 = 1 mod 3):
//   p=7  [49,98):   slots {59 SEAM(60), 71 int}. all=0.571,
//        ex-seam raw=0.286, interior-vs-ctrl=0.449, seam-vs-ctrl=0.700
//   p=11 [121,242): slots {137,167,191,197,221,227 int; 149,179,239 SEAM}.
//        all=1.273, ex-seam raw=0.848, interior-vs-ctrl=1.283,
//        seam-vs-ctrl=1.222.  209 (= 11*19, the 210-seam pair) is DEAD.
//   p=13 [169,338): slots {191,197,227,281,311 int; 179,239,269 SEAM}.
//        all=0.957, ex-seam raw=0.598, interior-vs-ctrl=0.909,
//        seam-vs-ctrl=1.011
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// TOKENIZER ARTIFACT, not a figure: five comma lists and pairs.
//   149,179,239 in reading 4 and 137,167,191,197,221,227 in the p=11 context
//   note are the nine slot residues of the p=11 block, each printed on its own
//   "r=" line with its NEAR-SEAM or interior label.
//   179,239,269 and 191,197,227,281,311 in the p=13 context note are the eight
//   slot residues of the p=13 block, printed the same way.
//   [1667,1956) in reading 3(c) is a half-open interval. Its left end is the
//   residue 1667 mod 2310 printed twice in the 5 RICHEST list, and 1956 is
//   1667 plus the scan width 289. It is also written out in the header above.
//   (209,211) in reading 4 is the seam pair straddling 210, which is why 209
//   also reads as a bare figure.
// DERIVED IN THIS READING by arithmetic over printed values:
//   357 in reading 3(a) is the common divisor of the two printed window sums,
//   2856 / 8 and 6426 / 18, and equals D(T23)/D(T17) = 7952175 / 22275, the
//   count of level-23 slots per level-17 slot.
//   12.5% in reading 3(b) is the scan width over the seam period, 289/2310 =
//   12.51%, against the printed 62 of 120 which is 51.7%, the "52%".
//   2.45 and 4.7 in reading 4 are the class-split expectations for the p=11
//   band: the run prints 9 slots at ratio 1.273, so the flat expectation is
//   9/1.273 = 7.07 over 121 positions, a per-position 0.05843. Times the
//   printed controls, 21 near-seam positions at 2.000 give 2.454 and 100
//   interior positions at 0.800 give 4.674. Checked.
// DEFINITION: 209 = 11 * 19 in reading 4 is a factorisation, not a
//   measurement, and it is why that residue holds no slot.
// ---------------------------------------------------------------------------
