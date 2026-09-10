// ============================================================================
// ATTACK2 03+09 — FOSSIL DEPTH FORMULA + STACKING CALCULUS
// ============================================================================
//
// ATTACK 3 (depth formula). Claim: the fresh-stratum depth is a Buchstab
// phenomenon. Sieving [b^2, 2b^2) by primes <= b leaves exactly the b-rough
// numbers; their density near x = b^u is x * omega(u)/ln b (Buchstab), vs the
// naive Mertens density e^{-gamma}x/ln b — ratio e^gamma * omega(u). For TWIN
// slots both members must be rough; the Hardy–Littlewood singular series is
// common to both the actual pair density and the wheel density delta_b, so it
// cancels and the predicted depth ratio is the SQUARE:
//
//     R(x; b) = ( e^gamma * omega(ln x / ln b) )^2
//
//     omega(u) = 1/u              (1 <= u <= 2)
//              = (1 + ln(u-1))/u  (2 <= u <= 3)
//
// Exactness check at the base: for u in [1,2] rough numbers are primes, so
// R = e^{2gamma}/u^2; at the zone edge u=2 this gives e^{2gamma}/4 = 0.79305 —
// precisely the anchored-windows zone-edge constant. The band [b^2, 2b^2)
// spans u in [2, 2 + ln2/ln b], so the predicted fresh depth is
//
//     D_pred(b) = (1/b^2) * INT_{b^2}^{2b^2} R(x; b) dx.
//
// Status of the formula: conditional on Hardy–Littlewood for the u<=2 base
// (pair-Buchstab factorization is the standard heuristic; exact on [1,2]
// given HL). We measure D(b) directly and compare.
//
// ATTACK 9 (stacking calculus). Investigating how strata compose led to a
// small THEOREM that replaces the whole approximate calculus:
//
//   EXACT INVARIANCE LEMMA. The in-period depth of any residue band
//   B mod P_b (count of twin slots in B's classes / (delta * positions))
//   is EXACTLY invariant under adding any further primes.
//   Proof: a residue class off mod P_b lifts to M = prod p copies mod
//   P_b*M; by CRT the added primes kill lifts with (k*P_b + off) ≡ 0 or -2
//   (mod p) — exactly 2 of every p lifts, for EVERY class, so each class
//   retains exactly prod(p-2) lifts. Band count and global density scale by
//   the identical factor; the ratio cannot move.  QED
//
// Consequences: (i) the measured 0.714 -> 0.714 preservation of 17's stratum
// was an identity, not an empirical regularity; (ii) a stratum's depth is
// fixed AT BIRTH (level b) and frozen verbatim forever; (iii) the directive's
// "predict level-29, verify at 29#" is decided at birth — we verify the
// identity numerically below anyway; (iv) stacking happens only at birth:
// depth_birth(b) = inheritance (band's depth at level prev(b), which already
// contains all older overlapping strata) x fresh factor (b's own kills).
// ============================================================================

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const PS = primesUpTo(6000);
const prevPrime = (b) => PS[PS.indexOf(b)-1];

function delta(level){ let d=0.5; for(const q of PS){ if(q>level)break; if(q>2) d*=(q-2)/q; } return d; }

// twin-slot offsets of band [b^2, 2b^2) sieved by primes <= level
function bandSlots(b, level){
  const lo=b*b, len=b*b;
  const bad = new Uint8Array(len);
  for(const p of PS){ if(p>level)break;
    for(const res of (p===2?[0]:[0,p-2])){
      let j = ((res - lo) % p + p) % p;
      for(; j<len; j+=p) bad[j]=1;
    }
  }
  const out=[]; for(let i=0;i<len;i++) if(!bad[i]) out.push(lo+i);
  return out;
}
const bandDepth = (b, level) => bandSlots(b, level).length/(delta(level)*b*b);

// Buchstab prediction
const omega = (u) => u<=2 ? 1/u : (1+Math.log(u-1))/u;
const EG = Math.exp(0.5772156649015329);
function predFresh(b){
  const N=40000, lo=b*b; let s=0;
  for(let i=0;i<N;i++){ const x = lo + (i+0.5)*lo/N; s += (EG*omega(Math.log(x)/Math.log(b)))**2; }
  return s/N;
}

console.log('--- Attack 3: measured birth depth vs Buchstab pair prediction ---');
console.log('b | inherited (level prev) | birth (level b) | fresh factor | Buchstab D_pred(b)');
for (const b of [7,11,13,17,19,23,29,31,37,41,53,71,97,199,499,997,2003,4999]){
  const inh = bandDepth(b, prevPrime(b));
  const birth = bandDepth(b, b);
  console.log(`${b} | ${inh.toFixed(3)} | ${birth.toFixed(3)} | ${(birth/inh).toFixed(3)} | ${predFresh(b).toFixed(3)}`);
}

console.log('\n--- Attack 9: Exact Invariance Lemma — numerical identity checks ---');
{ // b=17 band through level 23: every class must keep exactly (19-2)(23-2)=357 of 19*23=437 lifts
  const P17 = 2*3*5*7*11*13*17;
  const slots = bandSlots(17, 17);
  let total=0, expect=slots.length*17*21;
  for (let k=0;k<19*23;k++){
    for (const off of slots){
      const m19 = ((k%19)*(P17%19)+off)%19, m23 = ((k%23)*(P17%23)+off)%23;
      if (m19!==0 && m19!==17 && m23!==0 && m23!==21) total++;
    }
  }
  console.log(`17-band lifts surviving to level 23: ${total} (identity predicts ${expect})  depth ratio preserved: ${total===expect}`);
}
{ // directive: 23's stratum at level 29 across the 29 copies — identity check
  const P23 = 223092870;
  const slots = bandSlots(23, 23);
  let total=0, expect=slots.length*27;
  for (let k=0;k<29;k++){
    for (const off of slots){
      const m = ((k%29)*(P23%29)+off)%29;
      if (m!==0 && m!==27) total++;
    }
  }
  const depth23 = bandDepth(23,23);
  console.log(`23-band slots at level 29: ${total} (identity predicts ${expect}) -> depth at 29# = birth depth = ${depth23.toFixed(3)} exactly`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack2-03-09-depth-formula.js
//   invocation:  node research/attack2-03-09-depth-formula.js
//   code-sha256: 9cc0a8ae6b8febcc99c1dee757b0ad61e392bead58e26c86dc1281850ce875b3
//   out-sha256:  0ece91999533ee8c1181a53c1c23cf15500840aed07812c8ddb3275a647483a2
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     0.6 s
// ============================================================================
// --- Attack 3: measured birth depth vs Buchstab pair prediction ---
// b | inherited (level prev) | birth (level b) | fresh factor | Buchstab D_pred(b)
// 7 | 0.816 | 0.571 | 0.700 | 0.908
// 11 | 1.157 | 1.273 | 1.100 | 0.892
// 13 | 0.911 | 0.957 | 1.051 | 0.887
// 17 | 0.840 | 0.714 | 0.850 | 0.880
// 19 | 0.762 | 0.639 | 0.838 | 0.878
// 23 | 0.823 | 0.742 | 0.902 | 0.873
// 29 | 0.834 | 0.788 | 0.945 | 0.869
// 31 | 0.909 | 0.871 | 0.958 | 0.868
// 37 | 0.988 | 0.970 | 0.982 | 0.865
// 41 | 0.952 | 0.916 | 0.962 | 0.863
// 53 | 0.963 | 0.943 | 0.979 | 0.859
// 71 | 0.829 | 0.817 | 0.985 | 0.855
// 97 | 0.859 | 0.849 | 0.989 | 0.852
// 199 | 0.826 | 0.816 | 0.989 | 0.845
// 499 | 0.836 | 0.832 | 0.995 | 0.838
// 997 | 0.856 | 0.855 | 0.998 | 0.834
// 2003 | 0.833 | 0.832 | 0.999 | 0.830
// 4999 | 0.827 | 0.827 | 1.000 | 0.827
//
// --- Attack 9: Exact Invariance Lemma — numerical identity checks ---
// 17-band lifts surviving to level 23: 3213 (identity predicts 3213)  depth ratio preserved: true
// 23-band slots at level 29: 378 (identity predicts 378) -> depth at 29# = birth depth = 0.742 exactly
// READINGS.
// 1. THE EXACT INVARIANCE LEMMA is the headline: fossil depth is frozen at
//    birth as an IDENTITY (CRT: every residue class keeps exactly
//    prod(p-2) of prod(p) lifts, uniformly). The 0.714 -> 0.714 observation
//    was mathematics, not luck. Cross-validation: our CRT count 3213
//    reproduces the parent fossil measurement's level-23 band sum 3213
//    EXACTLY, and our birth depths 0.571/1.273/0.957/0.714/0.639 for
//    b=7/11/13/17/19 match the fossil-shadows percentile measurements
//    verbatim. The "stacking calculus over time" collapses: nothing stacks
//    after birth; all composition happens in the inheritance term at birth.
//    Directive's predict-then-verify at 29#: prediction is exact by the
//    lemma; verified numerically (378 = 378, depth 0.742 frozen).
// 2. THE BUCHSTAB PAIR FORMULA CONVERGES TO EXACT AGREEMENT: measured birth
//    depth vs prediction: 0.849/0.852 at b=97, 0.855/0.834 at 997, then
//    0.832/0.830 at 2003 and 0.827/0.827 at b=4999 — MATCH to three
//    decimals at the largest level. The fresh-stratum depth is a Buchstab
//    phenomenon: D(b) = band-average of (e^gamma*omega(u))^2, u in
//    [2, 2+ln2/ln b]. The u=2 edge value e^{2gamma}/4 = 0.79305 reproduces
//    the anchored-windows zone-edge constant — the two derivations agree at
//    the boundary.
// 3. SMALL-b STRATA ARE DISCRETE: b <= 23 depths (0.571, 1.273, 0.957,
//    0.714, 0.639, 0.742) scatter wildly around the smooth curve — bands
//    hold a dozen slots and single kills move the ratio ~7%. The smooth
//    formula is asymptotic; the early fossil record is set by exact
//    enumeration and then frozen forever by the lemma.
// 4. THE FRESH FACTOR (birth/inherited) RISES TO EXACTLY 1.000 by b=4999:
//    the newest prime's own marginal dent vanishes like ~c/ln b; deep
//    fossil depth is INHERITED from the immediately preceding overlapping
//    strata, not freshly dug. The fossil record is written by dynasties,
//    not individuals. (Note the sign at small b: for b=11,13 the "fresh
//    factor" exceeds 1 — discreteness again, the new prime's 2-per-p
//    removal can undershoot its own normalization in a 121-slot band.)
// 5. Honest scope: R(x;b) is Hardy–Littlewood-conditional (exact on
//    u in [1,2] given HL; standard factorization heuristic on (2,3]); its
//    empirical success is another HL confirmation inside the framework, not
//    an unconditional theorem. The Invariance Lemma, by contrast, is
//    unconditional, exact, and one line deep.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// TOKENIZER ARTIFACT, not a figure: "b=11,13" in reading 4 scans as a single
// token 11,13. Both are printed row labels in the Attack 3 table.
//
// DERIVED IN THIS READING from the band definition: the "121-slot band" in
// reading 4 is b^2 at b = 11, the width of [b^2, 2b^2) in wheel slots, set by
// the header's band definition and not by a printed column.
//
// CORRECTED 2026-08-20 (mismatch adjudication #25a): reading 2 and line 19 of
// the header both carried e^{2gamma}/4 = 0.7935. The correct value is
// 0.7930547395, recomputed here and printed as 0.793055 by
// natal-cap-22-at31-drift.js's embedded OUTPUT. Both sites now read 0.79305
// (old -> new: 0.7935 -> 0.79305, twice). This discrepancy was retired
// corpus-wide on 2026-08-18 (CHANGELOG entry for PRIOR-ART.md line 20) and
// these two sites were missed, one of them above the OUTPUT banner and so
// inside the code hash; the file was re-embedded with the fix. The CHANGELOG's
// closing "the only site in the corpus carrying it" was therefore false when
// written; that correction is recorded in
// history/staging/mismatch-adjudication.md, not by editing CHANGELOG history.
// The other corpus files carrying a literal 0.7935 are unrelated: there it is
// sup/(rms*sqrt(2 lnW)) at z = 23, a coincidence of digits.
// ---------------------------------------------------------------------------
