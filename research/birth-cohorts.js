// ============================================================================
// BIRTH COHORTS — decomposing the census by creation fold (Chris, 2026-08-14)
// ============================================================================
// QUESTION (Chris): can the census D_x be broken into "twin possibilities
// created by @5, @7, @11, ..."? ANSWER: yes, exactly.
//
// TERMINOLOGY (Chris, 2026-08-14): the born-at-p cohort is the NATAL SET @p
// (twin opportunities first appearing as INTERIOR slots at fold p, born at the
// seam; size p-3, and 2 at @5). Its complement is the CARRIED SET (surviving
// copies of earlier-born slots; each keeps p-2 of p copies per fold) plus the
// ETERNAL EDGE (the always-edge slot, House 29 / ancestral seam). "Born" =
// newly-interior, not new-lineage (zero orphans). See GLOSSARY.md.
//
// THE TAXONOMY. Every slot descends from the ancestor, but each fold p the
// edge slot bears p-2 children of which ONE remains the edge (the wrap) and
// p-3 GRADUATE into the interior as that fold's newborn positions (the
// interior seam pairs kP±1). Everything else is copies. So:
//   - cohort(5) = 2   (the special first fold: graduates 11 and 17 —
//                      Houses 11 & 17, the mirror pair)
//   - cohort(p) = p-3 for p >= 7   (all born inside House 29, the edge house)
//   - plus the eternal edge itself (1 slot, never "born")
// A slot's birth fold is READABLE FROM ITS RESIDUE: born at fold p iff
// r ≡ -1 mod |T_prev| but r !≡ -1 mod |T_p| (its seam-address depth).
//
// THE IDENTITY (telescopes with the Copying Theorem, since 1+(p-3) = p-2):
//   D_x = 1 + sum_{5<=p<=x} (p==5 ? 2 : p-3) * prod_{p<q<=x} (q-2)
//
// VERIFIED by full residue classification at T13 and T17 (below): every
// cohort exact, totals = census.
//
// STRUCTURE. Houses 11 & 17 never absorb births — they grow purely by
// copying (a third of the census each, forever). House 29 is the womb: every
// birth from fold 7 on happens inside it, and its total is always exactly
// D_x/3 = 1 + sum of its cohorts (verified: 1+4=5=D7/3; 1+8+36=45=D11/3).
//
// COHORT TABLE AT T31 (census 6,226,553,025), hand-checked to sum exactly:
//   born@5:  4,151,035,350   (66.67%)   born@19:      263,088
//   born@7:  1,660,414,140   (26.67%)   born@23:       15,660
//   born@11:   368,980,920   ( 5.93%)   born@29:          754
//   born@13:    41,929,650   ( 0.67%)   born@31:           28
//   born@17:     3,913,434   ( 0.06%)   eternal edge:       1
//   SUM = 6,226,553,025 ✓ (exact)
// Two-thirds of all twin opportunities that will ever exist were born at @5.
// ============================================================================

const PR=[2,3,5,7,11,13,17];
for (const upto of [13,17]) {
  const ps=PR.filter(q=>q<=upto);
  const P=ps.reduce((a,b)=>a*b,1);
  const bad=new Uint8Array(P);
  for(const p of ps){for(let j=0;j<P;j+=p)bad[j]=1;const r2=((p-2)%p+p)%p;for(let j=r2;j<P;j+=p)bad[j]=1;}
  const widths=[]; let w=1; for(const p of ps){w*=p; if(p>=3) widths.push([p,w]);}
  const cohorts={}; let edge=0;
  for(let r=0;r<P;r++){
    if(bad[r])continue;
    let depth=null;
    for(const [p,wd] of widths){ if((r+1)%wd===0) depth=p; }
    if(depth===upto){edge++;continue;}
    const idx=widths.findIndex(([p])=>p===depth);
    const bornAt = depth===null ? 5 : widths[idx+1][0];
    cohorts[bornAt]=(cohorts[bornAt]||0)+1;
  }
  const pred={}; const odd=ps.filter(q=>q>=5);
  for(const p of odd){ let f=1; for(const q of odd) if(q>p) f*=q-2; pred[p]=(p===5?2:p-3)*f; }
  console.log(`T${upto}: edge=${edge} (predict 1)`);
  for(const p of odd) console.log(`  born@${p}: ${cohorts[p]||0} (predict ${pred[p]}) ${((cohorts[p]||0)===pred[p])?"OK":"FAIL"}`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/birth-cohorts.js
//   invocation:  node research/birth-cohorts.js
//   code-sha256: 3806580a8ea1ead43aab74d970d2107c16b051f30330c541110004e2216df1af
//   out-sha256:  9bfa4aa7ffa16b973e437c1b31cc5fb75a92cdda03a32498262006b41b6082d4
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.1 s
// ============================================================================
// T13: edge=1 (predict 1)
//   born@5: 990 (predict 990) OK
//   born@7: 396 (predict 396) OK
//   born@11: 88 (predict 88) OK
//   born@13: 10 (predict 10) OK
// T17: edge=1 (predict 1)
//   born@5: 14850 (predict 14850) OK
//   born@7: 5940 (predict 5940) OK
//   born@11: 1320 (predict 1320) OK
//   born@13: 150 (predict 150) OK
//   born@17: 14 (predict 14) OK
// ============================================================================
// READINGS
//
// Context notes carried out of the pre-embed OUTPUT block (2026-08-19). Its
// first line is quoted with a leading ">" so it no longer reads as a banner:
//
// > OUTPUT (2026-08-14): all cohorts exact at T13 (990/396/88/10, edge 1,
// total 1485) and T17 (14850/5940/1320/150/14, edge 1, total 22275).
//
// CLOSED FORMS (added same day):
//   count(@p, T_x) = cohort(p) * D_x / D_p     (descendant factor D_x/D_p)
//     e.g. @5 at T13: 2 * 1485/3 = 990 ✓;  @7: 4 * 1485/15 = 396 ✓
//   FROZEN SHARES: share(@p) = cohort(p)/D_p — constant from birth forever
//     (Exact Invariance): 2/3 (@5), 4/15 (@7), 8/135 (@11), 2/297 (@13), ...
//     share(@p) = (p-3)/D_p collapses super-exponentially; the population
//     pyramid is sealed at each birth, with sum of ALL shares + 1/D_x = 1.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   22275 is the T17 total, the five printed cohorts plus the printed edge
//   slot: 14850 + 5940 + 1320 + 150 + 14 + 1 = 22275. The companion 1485 is
//   the same sum at T13, 990 + 396 + 88 + 10 + 1.
//   135 and 297 are denominators of the frozen shares in lowest terms, formed
//   from printed counts over that T13 total: 88/1485 reduces to 8/135, and
//   10/1485 reduces to 2/297. They are the descendant factors D_11 and D_13.
// ---------------------------------------------------------------------------
