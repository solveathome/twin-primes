// ============================================================================
// LADDER VERIFICATION, BIG TILES — T29, T31, T37 by mod-30 lattice scan.
// Twin slots satisfy r ≡ 11, 17, or 29 (mod 30), so we scan only that
// 3-in-30 lattice (10x compression) and strike the classes {0, p-2} mod p
// for p = 7..37 via CRT strides. T29/T31 double-check earlier full scans by
// an independent method; T37 (width 7,420,738,134,810) is the ceiling run.
// Expected censuses: 214,708,725 | 6,226,553,025 | 217,929,355,875
// (the last is the value Chris hand-derived in his 2024 folder-09 notes).
// ============================================================================

const CLASSES = [11, 17, 29];
const SEG = 300_000_000; // raw positions per segment; 3 x 10M compressed
function census(upto) {
  const PS = [7,11,13,17,19,23,29,31,37].filter(p => p <= upto);
  let P = 30; for (const p of PS) P *= p;
  const arrs = CLASSES.map(() => new Uint8Array(SEG / 30));
  let count = 0; const t0 = Date.now();
  for (let base = 0; base < P; base += SEG) {
    const len = Math.min(SEG, P - base);
    const cLen = Math.ceil(len / 30);
    for (const a of arrs) a.fill(0, 0, cLen + 1);
    for (const p of PS) {
      for (const kill of [0, p - 2]) {
        for (let ci = 0; ci < 3; ci++) {
          const res = CLASSES[ci];
          // x ≡ res (mod 30), x ≡ kill (mod p) -> x0 in [0, 30p)
          let x0 = res; while (x0 % p !== kill) x0 += 30;
          // first j >= base with j ≡ x0 (mod 30p)
          let j = x0 + Math.ceil((base - x0) / (30 * p)) * 30 * p;
          if (j < base) j += 30 * p;
          const arr = arrs[ci];
          for (; j < base + len; j += 30 * p) arr[(j - base - (res - (base % 30) + 30) % 30) / 30 | 0] = 1;
        }
      }
    }
    // count unmarked lattice points in this segment
    for (let ci = 0; ci < 3; ci++) {
      const res = CLASSES[ci], arr = arrs[ci];
      const start = base + ((res - (base % 30) + 30) % 30);
      for (let j = start, i = 0; j < base + len; j += 30, i++) if (!arr[i]) count++;
    }
    if ((base / SEG) % 400 === 0) console.error(`T${upto}: ${(100*base/P).toFixed(1)}%  (${((Date.now()-t0)/60000).toFixed(1)} min)`);
  }
  console.log(`T${upto}: width=${P}  census=${count}  (${((Date.now()-t0)/60000).toFixed(1)} min)`);
  return count;
}

const expected = { 29: 214708725, 31: 6226553025, 37: 217929355875 };
for (const upto of [29, 31, 37]) {
  const c = census(upto);
  console.log(`  expected ${expected[upto]}  ${c === expected[upto] ? 'MATCH ✓' : 'MISMATCH ✗'}`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/verify-ladder-big.js
//   invocation:  node research/verify-ladder-big.js
//   code-sha256: bffec9fecb03f747c3e444dd75875b31b96f0cfef919bff16d30587361991e2b
//   out-sha256:  a3ef64915412f8352f96257493bb49d75f528868df36e8391020ba801aea89d8
//   body-lines:  72
//   restamped:   2026-08-20 normalize migration; body verified byte-authentic under the bind-time rule (pre-min (before 2026-08-20)) before the hash moved
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     3271.7 s
// ============================================================================
// T29: width=6469693230  census=214708725  (0.0 min)
//   expected 214708725  MATCH ✓
// T31: width=200560490130  census=6226553025  (1.4 min)
//   expected 6226553025  MATCH ✓
// T37: width=7420738134810  census=217929355875  (53.0 min)
//   expected 217929355875  MATCH ✓
// ───── stderr ─────
// T29: 0.0%  (0.0 min)
// T31: 0.0%  (0.0 min)
// T31: 59.8%  (0.8 min)
// T37: 0.0%  (0.0 min)
// T37: 1.6%  (0.8 min)
// T37: 3.2%  (1.7 min)
// T37: 4.9%  (2.5 min)
// T37: 6.5%  (3.4 min)
// T37: 8.1%  (4.2 min)
// T37: 9.7%  (5.1 min)
// T37: 11.3%  (6.0 min)
// T37: 12.9%  (6.8 min)
// T37: 14.6%  (7.7 min)
// T37: 16.2%  (8.5 min)
// T37: 17.8%  (9.4 min)
// T37: 19.4%  (10.2 min)
// T37: 21.0%  (11.1 min)
// T37: 22.6%  (12.0 min)
// T37: 24.3%  (12.8 min)
// T37: 25.9%  (13.7 min)
// T37: 27.5%  (14.5 min)
// T37: 29.1%  (15.4 min)
// T37: 30.7%  (16.2 min)
// T37: 32.3%  (17.1 min)
// T37: 34.0%  (18.0 min)
// T37: 35.6%  (18.8 min)
// T37: 37.2%  (19.7 min)
// T37: 38.8%  (20.5 min)
// T37: 40.4%  (21.4 min)
// T37: 42.0%  (22.3 min)
// T37: 43.7%  (23.1 min)
// T37: 45.3%  (24.0 min)
// T37: 46.9%  (24.8 min)
// T37: 48.5%  (25.7 min)
// T37: 50.1%  (26.5 min)
// T37: 51.7%  (27.4 min)
// T37: 53.4%  (28.3 min)
// T37: 55.0%  (29.1 min)
// T37: 56.6%  (30.0 min)
// T37: 58.2%  (30.9 min)
// T37: 59.8%  (31.7 min)
// T37: 61.4%  (32.6 min)
// T37: 63.1%  (33.4 min)
// T37: 64.7%  (34.3 min)
// T37: 66.3%  (35.2 min)
// T37: 67.9%  (36.0 min)
// T37: 69.5%  (36.9 min)
// T37: 71.2%  (37.7 min)
// T37: 72.8%  (38.6 min)
// T37: 74.4%  (39.4 min)
// T37: 76.0%  (40.3 min)
// T37: 77.6%  (41.2 min)
// T37: 79.2%  (42.0 min)
// T37: 80.9%  (42.9 min)
// T37: 82.5%  (43.7 min)
// T37: 84.1%  (44.6 min)
// T37: 85.7%  (45.5 min)
// T37: 87.3%  (46.3 min)
// T37: 88.9%  (47.2 min)
// T37: 90.6%  (48.0 min)
// T37: 92.2%  (48.9 min)
// T37: 93.8%  (49.7 min)
// T37: 95.4%  (50.6 min)
// T37: 97.0%  (51.5 min)
// T37: 98.6%  (52.3 min)
// ============================================================================
// READINGS
//
// Context notes carried out of the pre-embed OUTPUT block (2026-08-19):
//
// READING. The ladder is verified by direct count through T37 — 7.42
// TRILLION positions scanned, and the census lands exactly on
// 217,929,355,875: the value Chris hand-derived with the multiply-by-(p-2)
// rule in his 2024 folder-09 notes.txt ("35 > 217929355875"). His pencil
// arithmetic beat the hardware here by two years. T29/T31 additionally
// re-verified by this independent lattice method (10x compression via the
// mod-30 comb; 57x faster than the raw scan — the speedup that makes
// G2(37#) feasible). This retires brute-force census verification: from
// here the ladder is read off A059861/Schemmel, and hardware goes only to
// what formulas cannot give (grain, G2, strata, veins).
// ============================================================================

// ============================================================================
// TRACEABILITY NOTE, 2026-08-19, appended BELOW the tail so the embed
// fingerprint is untouched (this text is READINGS; it is not hashed).
//
// The tail was bound with --force and the force cost ONE token out of the old
// block's seven: 54.1, the minutes the T37 leg took on 2026-08-14. The fresh
// run reads 53.0 min for the same leg. Every census and every width came back
// identical -- 214,708,725 at width 6,469,693,230; 6,226,553,025 at
// 200,560,490,130; and 217,929,355,875 at 7,420,738,134,810 -- and all three
// still print MATCH against the expected table.
//
// WHY THIS FILE WAS UNBINDABLE UNTIL NOW, and it is the cleanest case in the
// custody migration. research/history/staging/custody-embed-migration.md sec.3
// cause (c)1 lists this file among fifteen whose absent figures sit on stderr,
// which the old embed path discarded: the per-segment progress line at line 42
// goes through console.error, so a stdout-only capture lost it and the guard
// then saw 3 of 10 figures missing. Under --streams both it is 1 of 7, and the
// one is a stopwatch. Nothing about the file changed; the capture did.
//
// The two READINGS figures the block does not literally contain are 7.42, the
// prose rounding of the 7,420,738,134,810 positions that IS in the block, and
// 059861, which is the gate's tokenizer cutting the OEIS id A059861 in half.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). No number
// above was changed.
//
// The 2026-08-19 traceability note directly above already covers all three
// figures the gate flags on this file, so this block only pins the third.
//   7.42 is covered there: the prose rounding of the printed
//   7,420,738,134,810 positions.
//   059861 is covered there: the tokenizer cutting the OEIS id A059861.
//   54.1 is the third, and the note explains it in its first paragraph. It is
//   the T37 leg's wall-clock minutes from the 2026-08-14 run, the one token
//   the --force rebind cost. The embedded block above prints 53.0 min for the
//   same leg on the fresh run. Both are stopwatch readings of the same
//   computation on different days; every census and width matched. Quote 53.0
//   as this file's runtime and 54.1 only as the historical figure it is.
// ---------------------------------------------------------------------------
