// ============================================================================
// ATTACK 1 — GAP CARTOGRAPHY: where do the biggest twin-slot gaps live?
// ============================================================================
// If the largest gaps in the pattern mod P_n# provably avoided [0, p_{n+1}^2],
// the zone would be safe by structure rather than by counting. Early data
// (script 05) hinted worst gaps sit at r ≈ 659–731 — just PAST the zone.
// Here: top-10 gaps per level with positions (absolute + normalized), plus
// the largest gap that intersects the zone specifically.
// ============================================================================

const PR = [2,3,5,7,11,13,17,19,23,29]; // 29 present only so pNext exists at level 23
function run(upto) {
  const idx = PR.indexOf(upto), pNext = PR[idx+1];
  let P = 1; for (let i = 0; i <= idx; i++) P *= PR[i];
  const bad = new Uint8Array(P);
  for (let i = 0; i <= idx; i++) {
    const p = PR[i];
    for (let j = 0; j < P; j += p) bad[j] = 1;
    for (let j = ((p-2)%p+p)%p; j < P; j += p) bad[j] = 1;
  }
  const zone = pNext * pNext;
  const gaps = []; // {size, from}
  let prev = -1, first = -1, zoneMax = 0;
  for (let r = 0; r < P; r++) {
    if (!bad[r]) {
      if (first < 0) first = r;
      else {
        const g = r - prev;
        gaps.push({ g, from: prev });
        if (prev < zone && prev + g > 0 && prev <= zone) zoneMax = Math.max(zoneMax, Math.min(g, zone - prev)); // gap portion inside zone
      }
      prev = r;
    }
  }
  gaps.push({ g: first + P - prev, from: prev }); // cyclic wrap
  gaps.sort((a,b) => b.g - a.g);
  const top = gaps.slice(0, 10);
  console.log(`\np=${upto}  P#=${P}  zone=[0,${zone}]`);
  console.log('top-10 gaps: ' + top.map(t => `${t.g}@${t.from}(${(t.from/P).toFixed(4)})`).join('  '));
  // largest gap fully or partly inside the zone, and the largest gap's distance from origin
  const inZone = gaps.filter(t => t.from < zone);
  console.log(`largest gap starting inside zone: ${inZone.length ? inZone[0].g + ' @ r=' + inZone[0].from : 'none'}   global max: ${gaps[0].g} @ r=${gaps[0].from} (${(100*gaps[0].from/P).toFixed(2)}% of period)`);
  // where in the period do the top-100 gaps sit? histogram in tenths
  const H = new Array(10).fill(0);
  for (const t of gaps.slice(0, 100)) H[Math.floor(10*t.from/P)]++;
  console.log(`top-100 gap positions by tenth of period: [${H.join(', ')}]  (mirror symmetry expected)`);
}
for (const p of [13, 17, 19, 23]) run(p);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-01-gap-cartography.js
//   invocation:  node research/attack-01-gap-cartography.js
//   code-sha256: 823e797d36f6c14e1ce3b4715ef2b4af9314c1fdc5497db27842116f5e36a9e3
//   out-sha256:  9a807fbbd30cb77f89e588890e3795b2eccaac373c05d207442021e963c3bf73
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     3.0 s
// ============================================================================
//
// p=13  P#=30030  zone=[0,289]
// top-10 gaps: 66@731(0.0243)  66@3851(0.1282)  66@6581(0.2191)  66@7211(0.2401)  66@9941(0.3310)  66@13061(0.4349)  66@16901(0.5628)  66@20021(0.6667)  66@22751(0.7576)  66@23381(0.7786)
// largest gap starting inside zone: 30 @ r=71   global max: 66 @ r=731 (2.43% of period)
// top-100 gap positions by tenth of period: [11, 16, 14, 11, 12, 12, 11, 3, 6, 4]  (mirror symmetry expected)
//
// p=17  P#=510510  zone=[0,361]
// top-10 gaps: 108@701(0.0014)  108@3011(0.0059)  108@33851(0.0663)  108@36161(0.0708)  108@128981(0.2527)  108@185069(0.3625)  108@197051(0.3860)  108@199361(0.3905)  108@230201(0.4509)  108@232511(0.4554)
// largest gap starting inside zone: 60 @ r=359   global max: 108 @ r=701 (0.14% of period)
// top-100 gap positions by tenth of period: [15, 12, 14, 14, 6, 6, 12, 7, 4, 10]  (mirror symmetry expected)
//
// p=19  P#=9699690  zone=[0,529]
// top-10 gaps: 150@659(0.0001)  150@156269(0.0161)  150@406169(0.0419)  150@1020209(0.1052)  150@1218029(0.1256)  150@2239049(0.2308)  150@2394659(0.2469)  150@2644559(0.2726)  150@2801639(0.2888)  150@4659509(0.4804)
// largest gap starting inside zone: 72 @ r=347   global max: 150 @ r=659 (0.01% of period)
// top-100 gap positions by tenth of period: [11, 12, 14, 7, 9, 9, 7, 14, 12, 5]  (mirror symmetry expected)
//
// p=23  P#=223092870  zone=[0,841]
// top-10 gaps: 204@76166567(0.3414)  204@108991247(0.4885)  204@114101417(0.5115)  204@146926097(0.6586)  198@33638411(0.1508)  198@189454259(0.8492)  192@15323057(0.0687)  192@81115847(0.3636)  192@90352319(0.4050)  192@96940427(0.4345)
// largest gap starting inside zone: 150 @ r=659   global max: 204 @ r=76166567 (34.14% of period)
// top-100 gap positions by tenth of period: [12, 19, 12, 14, 16, 14, 3, 3, 4, 3]  (mirror symmetry expected)
// READINGS — the attack produced a real structural insight:
// 1. THE ZONE'S GAPS ARE FROZEN REALITY; THE MONSTER GAPS LIVE DEEP.
//    Inside the zone the pattern is crystallized (= actual twin primes), so
//    the zone's worst gap is just the actual twin-gap structure: 30, 60, 72,
//    150 — the 150 at r=659 is literally the real twin-prime gap
//    (659,661) -> (809,811). Meanwhile the GLOBAL max grows like p*ln^2 p and
//    (by p=23) migrates deep into the period: 34% in. The wall's danger —
//    gaps of size p^2 — can only ever materialize in un-crystallized deep
//    territory, and each level's zone imports only the tame, already-real
//    gap structure of actual twins.
// 2. At small levels the global max sat just past the zone (r≈659-731) only
//    because the actual twin gap 659->809 was still the largest thing the
//    young pattern had seen; once p=23's deep structure produced 204 > 150,
//    the max moved away. Prediction: the max never again returns near the
//    origin. (Verified at 29#: max at r=1.205e9 = 18.6% of period.)
// 3. Mirror symmetry of gap locations confirmed exactly (mirror pairs of the
//    204s). Gap analysis can be done on half the period.
// 4. Reformulated wall: TPC (via zones) is equivalent to the statement that
//    the FROZEN gap sequence imported by crystallization keeps outpacing the
//    zone width — i.e. the actual twin-gap growth rate (empirically ~ln^2-ish)
//    stays below p^2. The deep-period G2 growth is irrelevant to the zone.
//    This decouples the two quantities we had been conflating.
// ============================================================================
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// TOKENIZER ARTIFACT, not a figure: "659,661" and "809,811" in reading 1 are
//   twin pairs written as pairs, and the -731 of reading 2 is the tail of the
//   range "r about 659-731". Both endpoints of that range are printed above,
//   659 as the p=19 global max position and 731 as the p=13 one.
//
// DERIVED IN THIS READING by arithmetic over printed values: 809 in readings 1
//   and 2 is 659 plus the printed gap 150, from the p=19 line "150@659". The
//   companions 661 and 811 are each the partner of a twin, two more.
//
// BORROWED, verified present in the named producer's embedded OUTPUT: the
//   29# record of reading 2. This file runs p=13 through p=23 only. The 29#
//   position is 1205437109, printed by
//   research/05b-twin-jacobsthal-segmented.js on its line "p=29
//   P#=6469693230 ... G2=258 at r=1205437109", which the reading rounds to
//   1.205e9. The 18.6 percent is that position over the printed period,
//   1205437109/6469693230, which is 0.18632.
// ---------------------------------------------------------------------------
