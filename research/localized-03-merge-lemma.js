// The localized single-kill claim.  See research/LOCALIZED-GAP.md.
//
// PRIOR ART: the mechanism is Holt and Rudd 2014, Lemma 3.1 of arXiv:1408.6002,
// in the ONE-class setting ("the minimum span between fusions is 2p").  The
// two-class form below needs the extra mod-3 step and is not in their work.
//
// CLAIM (elementary): no two twin slots are 2 apart, because s, s+2, s+4 would
// cover all residues mod 3.  Kills by p sit in classes {0, -2} mod p, which are
// 2 apart.  So any interval SHORTER THAN p-2 contains at most ONE kill.
// Consequence: a new gap of length < p-2 merges at most TWO old gaps, so
//     M(T_p, Y) <= maxsum_2(T_x, Y)     whenever the new gaps stay under p-2.
//
// On the full tile this is vacuous: G2 ~ 0.6x^2 >> p.  In the head it is the
// generic case.  This script measures where it turns on and whether it holds.

const N = Number(process.argv[2] || 3e7);
const K = Number(process.argv[3] || 3);

function primesUpTo(n) {
  const s = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) if (!s[i]) { out.push(i); for (let j = i*i; j <= n; j += i) s[j] = 1; }
  return out;
}
const XMAX = Math.floor(Math.pow(N, 1 / K));
const ladder = primesUpTo(XMAX);
const rough = new Uint8Array(N + 3).fill(1); rough[0] = 0;

// slot list of the current level up to Y
function slots(Y) {
  const out = [];
  for (let r = 1; r < Y; r++) if (rough[r] && rough[r + 2]) out.push(r);
  return out;
}
function maxsum(list, m, Y) {           // max sum of m consecutive gaps, left end < Y
  let best = 0;
  for (let i = 0; i + m < list.length; i++) {
    if (list[i] >= Y) break;
    const s = list[i + m] - list[i];
    if (s > best) best = s;
  }
  return best;
}

console.log('x\tp\tY=p^K\t\tM(x,Y)\tms2(x,Y)\tM(p,Y)\tp-2\tM<p-2?\tmaxKills\tM(p)<=ms2(x)?');
let viol1 = 0, viol2 = 0, rows = 0, firstOn = null;
let prevSlots = null;

for (const x of ladder) {
  for (let j = x; j <= N + 2; j += x) rough[j] = 0;
  if (x < 5) { continue; }
  const p = ladder[ladder.indexOf(x) + 1];
  if (!p) break;
  const Y = Math.pow(p, K);
  if (Y > N) break;

  const before = slots(Y + 4096);                       // level x
  for (let j = p; j <= N + 2; j += p) rough[j] = 0;     // fold p in
  const after = slots(Y + 4096);                        // level p

  const M_old = maxsum(before, 1, Y);
  const ms2_old = maxsum(before, 2, Y);
  const M_new = maxsum(after, 1, Y);

  // max kills inside a single new gap
  const killed = new Set(before.filter(s => s % p === 0 || (s + 2) % p === 0));
  let maxKills = 0;
  for (let i = 0; i + 1 < after.length; i++) {
    if (after[i] >= Y) break;
    let c = 0;
    for (const s of killed) if (s > after[i] && s < after[i + 1]) c++;
    if (c > maxKills) maxKills = c;
  }

  const on = M_new < p - 2;
  if (on && maxKills > 1) viol1++;
  if (on && M_new > ms2_old) viol2++;
  if (on && firstOn === null) firstOn = x;
  rows++;
  if (x > 40)
    console.log(`${x}\t${p}\t${Y.toExponential(2)}\t${M_old}\t${ms2_old}\t\t${M_new}\t${p-2}\t${on?'YES':'no '}\t${maxKills}\t\t${M_new<=ms2_old?'ok':'FAIL'}`);
}
console.log(`\n# folds tested: ${rows}`);
console.log(`# condition M(new) < p-2 first satisfied at x = ${firstOn}`);
console.log(`# violations of "at most 1 kill per new gap when M(new)<p-2": ${viol1}`);
console.log(`# violations of "M(new) <= maxsum_2(old) when M(new)<p-2":   ${viol2}`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/localized-03-merge-lemma.js
//   invocation:  node research/localized-03-merge-lemma.js
//   code-sha256: d0c54a4bbe9a789194963daebef22ee06483977a9aff8dddd1bc30cadede2995
//   out-sha256:  911d0671e7da539a72c3743aab7a25f3004e796d4665290e7f97490ee602cf88
//   body-lines:  56
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     17.4 s
// ============================================================================
// x	p	Y=p^K		M(x,Y)	ms2(x,Y)	M(p,Y)	p-2	M<p-2?	maxKills	M(p)<=ms2(x)?
// 41	43	7.95e+4	204	252		204	41	no 	1		ok
// 43	47	1.04e+5	204	252		204	45	no 	2		ok
// 47	53	1.49e+5	300	366		300	51	no 	1		ok
// 53	59	2.05e+5	300	366		300	57	no 	2		ok
// 59	61	2.27e+5	300	366		300	59	no 	1		ok
// 61	67	3.01e+5	318	372		318	65	no 	1		ok
// 67	71	3.58e+5	318	420		318	69	no 	1		ok
// 71	73	3.89e+5	318	432		318	71	no 	1		ok
// 73	79	4.93e+5	318	432		318	77	no 	1		ok
// 79	83	5.72e+5	318	480		318	81	no 	2		ok
// 83	89	7.05e+5	318	480		378	87	no 	1		ok
// 89	97	9.13e+5	378	480		378	95	no 	1		ok
// 97	101	1.03e+6	378	486		402	99	no 	1		ok
// 101	103	1.09e+6	402	486		402	101	no 	1		ok
// 103	107	1.23e+6	402	486		402	105	no 	2		ok
// 107	109	1.30e+6	402	510		432	107	no 	1		ok
// 109	113	1.44e+6	432	510		432	111	no 	2		ok
// 113	127	2.05e+6	432	510		432	125	no 	2		ok
// 127	131	2.25e+6	432	510		432	129	no 	1		ok
// 131	137	2.57e+6	432	576		432	135	no 	1		ok
// 137	139	2.69e+6	432	576		456	137	no 	1		ok
// 139	149	3.31e+6	456	576		462	147	no 	1		ok
// 149	151	3.44e+6	462	648		498	149	no 	1		ok
// 151	157	3.87e+6	498	660		552	155	no 	1		ok
// 157	163	4.33e+6	552	660		552	161	no 	1		ok
// 163	167	4.66e+6	552	672		552	165	no 	1		ok
// 167	173	5.18e+6	552	672		552	171	no 	1		ok
// 173	179	5.74e+6	552	672		630	177	no 	1		ok
// 179	181	5.93e+6	630	738		630	179	no 	1		ok
// 181	191	6.97e+6	630	738		630	189	no 	1		ok
// 191	193	7.19e+6	630	738		630	191	no 	1		ok
// 193	197	7.65e+6	630	738		630	195	no 	1		ok
// 197	199	7.88e+6	630	738		630	197	no 	1		ok
// 199	211	9.39e+6	630	738		630	209	no 	1		ok
// 211	223	1.11e+7	630	750		708	221	no 	1		ok
// 223	227	1.17e+7	708	768		708	225	no 	1		ok
// 227	229	1.20e+7	708	768		708	227	no 	1		ok
// 229	233	1.26e+7	708	840		708	231	no 	1		ok
// 233	239	1.37e+7	708	840		708	237	no 	1		ok
// 239	241	1.40e+7	708	840		708	239	no 	1		ok
// 241	251	1.58e+7	708	840		708	249	no 	1		ok
// 251	257	1.70e+7	708	840		708	255	no 	1		ok
// 257	263	1.82e+7	708	840		708	261	no 	1		ok
// 263	269	1.95e+7	708	840		708	267	no 	1		ok
// 269	271	1.99e+7	708	840		708	269	no 	1		ok
// 271	277	2.13e+7	852	924		852	275	no 	1		ok
// 277	281	2.22e+7	852	1032		852	279	no 	1		ok
// 281	283	2.27e+7	852	1032		852	281	no 	1		ok
// 283	293	2.52e+7	852	1032		852	291	no 	1		ok
// 293	307	2.89e+7	852	1032		870	305	no 	1		ok
//
// # folds tested: 60
// # condition M(new) < p-2 first satisfied at x = null
// # violations of "at most 1 kill per new gap when M(new)<p-2": 0
// # violations of "M(new) <= maxsum_2(old) when M(new)<p-2":   0
// ============================================================================
// READINGS
// ============================================================================
