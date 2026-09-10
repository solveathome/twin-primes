// ============================================================================
// redteam-0904-r0-extension.js
// Adversarial checks for research/history/staging/redteam-0904-r0-extension.md
// Target under review: research/history/staging/derive-0904-r0-extension.md
//
// THREE CHECKS, all exact integer / exact-formula arithmetic, no sampling.
//
// A. THE ZONE ANCHOR'S z-SCORE AT THE ZONE'S OWN WINDOW WIDTH.
//    derive-0904 §7d says "no corpus artifact certifies the variance of the
//    window-count statistic at window width p'^2, so the zone anchor's z is
//    not computed anywhere". research/06-variance-theorem.js already carries
//    that exact variance (its L is p_{n+1}^2 over all p_n# window positions,
//    brute-force verified there at p = 13 and 17). This part re-derives the
//    same exact second-moment formula and evaluates it at the ZONE's own
//    window, then divides.
//
//      tile T_p: A(r) = 1 iff r and r+2 are both coprime to p#.
//      density   delta(p) = (1/2) * prod_{2<q<=p} (q-2)/q
//      pair corr J(d)     = (rho_2(d)/2) * prod_{2<q<=p} rho_q(d)/q
//                           rho_q(d) = q-2 if q|d; q-3 if d = +-2 mod q; else q-4
//                           rho_2(d) = 1 if d even, 0 if d odd
//      over t uniform in Z/p#, N(t) = #twin slots in [t, t+L):
//          E[N]   = delta * L
//          Var[N] = sum_{|d|<L} (L-|d|) (J(d) - delta^2)      (exact)
//    The zone window, in zonegap-01 conventions (p < a, a+2 < p'^2, both
//    strict), is the opener range [p+1, p'^2-3], so L_zone = p'^2 - p - 3.
//    N_zone is counted directly. z = (N_zone - E)/sqrt(Var).
//    Self-check: Part A0 brute-forces mean and variance over ALL p# window
//    positions at p = 7 and p = 11 against the formula.
//
// B. THE THIRD REPAIR OF THE SCOPE SLIP.
//    derive-0904 §0 item 3 repairs P_zone by bounding BOTH coordinates. A
//    third candidate repair keeps only l1 bounded and adds l2 = l1 + 2 to the
//    property. Then Lambda_2 = { lambda(l1+2) : l1 p-rough, p < l1 < p'^2,
//    l1+2 p-rough }. Every such l2 below p'^2 is prime (lambda = -1); the only
//    way lambda = +1 enters is l1 = p'^2 - 2 with p'^2 - 2 p-rough, since
//    p'^2 is itself p-rough and composite. So +1 in Lambda_2 iff p'^2 - 2 is
//    p-rough, and the repair's H5 verdict FLIPS with p. This part decides it
//    level by level.
//
// C. PROPOSITION A AGAINST TAO'S OWN EXAMPLES, AND ITS CONVERSE'S FALSIFIER.
//    k = 2 hull test, exact: for a subset S of the four corners of {-1,+1}^2,
//    the origin lies in conv(S) iff |S| >= 3 (any three corners of a square
//    contain its centre) or S contains an antipodal pair. Checked here against
//    Tao 2014 Examples 2 and 3 as transcribed at source, against the
//    one-coordinate-confined property that derive-0904 flags as the scope
//    slip, and against a confined-rough property whose further condition R
//    reads lambda directly.
// ============================================================================

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const PR = primesUpTo(1000);

function delta(pn){let d=0.5;for(const q of PR){if(q===2)continue;if(q>pn)break;d*=(q-2)/q}return d}
function J(d,pn){
  if(((d%2)+2)%2!==0) return 0;
  let prod=0.5;
  for(const q of PR){ if(q===2)continue; if(q>pn)break;
    const m=((d%q)+q)%q;
    if(m===0) prod*=(q-2)/q; else if(m===2||m===q-2) prod*=(q-3)/q; else prod*=(q-4)/q; }
  return prod;
}
function varFormula(pn,L){ const del=delta(pn); let v=0;
  for(let d=-(L-1); d<=L-1; d++) v+=(L-Math.abs(d))*(J(d,pn)-del*del);
  return v; }
function isRough(n,pn){ for(const q of PR){ if(q>pn)break; if(n%q===0) return false } return true }
function nextPrime(p){ for(const q of PR) if(q>p) return q; throw new Error('prime table too small') }

// --- A0: brute force the ensemble mean and variance against the formula -----
console.log('--- A0: exact formula vs brute force over ALL p# window positions ---');
for(const pn of [7,11]){
  const pp=nextPrime(pn), L=pp*pp-pn-3;
  let P=1; for(const q of PR){ if(q>pn)break; P*=q }
  const A=new Uint8Array(P).fill(1);
  for(const q of PR){ if(q>pn)break;
    const cls = (q===2)?[0]:[0,q-2];
    for(const r of cls) for(let j=r;j<P;j+=q) A[j]=0; }
  let N=0; for(let i=0;i<L;i++) N+=A[i%P];
  let s=0,ss=0; for(let t=0;t<P;t++){ s+=N; ss+=N*N; N+=A[(t+L)%P]-A[t]; }
  const mean=s/P, vb=ss/P-mean*mean, vf=varFormula(pn,L), ef=delta(pn)*L;
  console.log(`p=${pn} p'=${pp} L_zone=${L} period=${P}  E brute=${mean.toFixed(6)} formula=${ef.toFixed(6)}  Var brute=${vb.toFixed(6)} formula=${vf.toFixed(6)}  match=${Math.abs(vb-vf)<1e-9&&Math.abs(mean-ef)<1e-9}`);
}

// --- A: the zone anchor's z-score -------------------------------------------
console.log("\n--- A: the zone anchor's z-score at the zone's own window width ---");
console.log("p\tp'\tL_zone\tN_zone\tE[N]\t\tsigma\t\tz\t\tz (L=p'^2)");
const LEVELS=[7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199];
for(const pn of LEVELS){
  const pp=nextPrime(pn);
  const L=pp*pp-pn-3;
  let Nz=0;
  for(let a=pn+1;a<=pp*pp-3;a++) if(isRough(a,pn)&&isRough(a+2,pn)) Nz++;
  const E=delta(pn)*L, V=varFormula(pn,L), sg=Math.sqrt(V);
  const z=(Nz-E)/sg;
  // the same anchor read in 06-variance-theorem.js's own window width, L = p'^2,
  // anchored at t = 0 so the window is [0, p'^2) and contains the zone plus the
  // head segment [0, p]; the tile's edge slot at r = 1 is inside it.
  const L2=pp*pp; let N2=0;
  for(let a=0;a<L2;a++) if(isRough(a,pn)&&isRough(a+2,pn)) N2++;
  const E2=delta(pn)*L2, V2=varFormula(pn,L2), z2=(N2-E2)/Math.sqrt(V2);
  console.log(`${pn}\t${pp}\t${L}\t${Nz}\t${E.toFixed(4)}\t${sg.toFixed(4)}\t${z.toFixed(4)}\t${z2.toFixed(4)}`);
}

// --- B: the third repair's verdict flips with p ------------------------------
console.log("\n--- B: is p'^2 - 2 p-rough?  (+1 enters Lambda_2 exactly when it is) ---");
console.log("p\tp'\tp'^2-2\trough?\t|S| under the l2=l1+2 repair\tH5 under that repair");
let flips=0, prevVerdict=null;
for(const pn of LEVELS){
  const pp=nextPrime(pn), n=pp*pp-2, r=isRough(n,pn);
  const S = r?1:2, h5 = (S>=2);
  if(prevVerdict!==null && prevVerdict!==h5) flips++;
  prevVerdict=h5;
  console.log(`${pn}\t${pp}\t${n}\t${r}\t${S}\t\t\t\t${h5?'HOLDS':'FAILS'}`);
}
console.log(`verdict flips across the ${LEVELS.length} listed levels: ${flips}`);

// --- C: Proposition A against the source's own examples ----------------------
console.log('\n--- C: k=2 hull test on named properties (exact corner rule) ---');
const CORNERS=[[1,1],[1,-1],[-1,1],[-1,-1]];
function key(e){return e.join(',')}
function hullHasOrigin(S){
  if(S.length>=3) return true;                     // any 3 corners of a square contain its centre
  if(S.length===2) return S[0][0]===-S[1][0] && S[0][1]===-S[1][1];
  return false;
}
function forbiddenFromCoordSets(L1,L2){            // pure product case
  const out=[]; for(const c of CORNERS) if(!(L1.includes(c[0])&&L2.includes(c[1]))) out.push(c); return out;
}
function report(name,forb,expectH5){
  const h5=hullHasOrigin(forb);
  console.log(`${name}\n   forbidden = {${forb.map(key).map(s=>'('+s+')').join(', ')}}   #S-mono-implied H5 = ${h5}   expected = ${expectH5}   agree = ${h5===expectH5}`);
}
// Tao 2014 Example 3: l1 and l2 both prime. Source lists (+1,+1),(+1,-1),(-1,+1).
report('Example 3 (both prime; Lambda_1=Lambda_2={-1}, |S|=2)',
       forbiddenFromCoordSets([-1],[-1]), true);
// Tao 2014 Example 2: l1 prime, l2 almost prime. Source lists (+1,+1),(+1,-1),
// and says the property is NOT subject to the obstruction.
report('Example 2 (l1 prime, l2 almost prime; |S|=1)',
       forbiddenFromCoordSets([-1],[1,-1]), false);
// The scope slip: P_zone as written at lit-tao-parity.md:313 / wall-note.md:181-182
// / object-bridge-read-0829.md:471 -- only l1 confined.
report('P_zone as written, only l1 confined (|S|=1)',
       forbiddenFromCoordSets([-1],[1,-1]), false);
// The repair derive-0904 proposes: both coordinates confined.
report('P_zone repaired, both coordinates confined (|S|=2)',
       forbiddenFromCoordSets([-1],[-1]), true);
// The bare tile property: no coordinate confined.
report('P_tile, no coordinate confined (|S|=0)',
       forbiddenFromCoordSets([1,-1],[1,-1]), false);
// Falsifier for Proposition A's converse outside the product class: |S| = 1 and
// a further condition R that reads lambda. P = [l1 rough in (p,p'^2)] AND
// [l2 rough] AND [lambda(l2) = +1]. Extension realises only (-1,+1).
console.log('\n   converse falsifier: P = [l1 rough in zone] AND [l2 rough] AND [lambda(l2)=+1]');
{
  const realised=[[-1,1]];
  const forb=CORNERS.filter(c=>!realised.some(r=>r[0]===c[0]&&r[1]===c[1]));
  const h5=hullHasOrigin(forb);
  console.log(`   forbidden = {${forb.map(key).map(s=>'('+s+')').join(', ')}}   H5 = ${h5}   (|S| = 1, so Proposition A (A1) would say "not H5")`);
  console.log(`   origin = 0.5*(+1,+1) + 0.5*(-1,-1): ${0.5*1+0.5*-1} , ${0.5*1+0.5*-1}`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0904-r0-extension.js
//   invocation:  node research/history/staging/redteam-0904-r0-extension.js
//   code-sha256: dbd4851b723903ed63ad1df5006e3df4ca22ba79e1e60a7b87e3e921fc7fc21f
//   out-sha256:  18568dce782c3fe4498bab28890c055141fdc121d1294f74cbf4f9fb90372f9f
//   body-lines:  112
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-04
//   elapsed:     1.4 s
// ============================================================================
// --- A0: exact formula vs brute force over ALL p# window positions ---
// p=7 p'=11 L_zone=111 period=210  E brute=7.928571 formula=7.928571  Var brute=2.009184 formula=2.009184  match=true
// p=11 p'=13 L_zone=155 period=2310  E brute=9.058442 formula=9.058442  Var brute=1.525156 formula=1.525156  match=true
//
// --- A: the zone anchor's z-score at the zone's own window width ---
// p	p'	L_zone	N_zone	E[N]		sigma		z		z (L=p'^2)
// 7	11	111	8	7.9286	1.4175	0.0504	-0.4778
// 11	13	155	9	9.0584	1.2350	-0.0473	0.1110
// 13	17	273	16	13.5000	1.4793	1.6899	1.1124
// 17	19	341	17	14.8788	1.6964	1.2504	1.3339
// 19	23	507	21	19.7932	1.9518	0.6183	0.1750
// 23	29	815	29	29.0508	2.2813	-0.0223	0.0098
// 29	31	929	30	30.8306	2.5198	-0.3296	-0.7410
// 31	37	1335	41	41.4461	2.8082	-0.1589	-0.1768
// 37	41	1641	48	48.1923	3.0796	-0.0624	-0.4419
// 41	43	1805	50	50.4228	3.2778	-0.1290	-0.1994
// 43	47	2163	61	57.6131	3.5414	0.9564	0.8842
// 47	53	2759	74	70.3609	3.9438	0.9228	0.5913
// 53	59	3425	87	84.0493	4.3327	0.6810	0.3611
// 59	61	3659	91	86.7479	4.5198	0.9408	0.8315
// 61	67	4425	110	101.4687	4.8248	1.7682	1.4520
// 67	71	4971	121	110.5862	5.1120	2.0371	1.9221
// 71	73	5255	123	113.6111	5.2813	1.7778	1.4642
// 73	79	6165	138	129.6333	5.6330	1.4853	1.1968
// 79	83	6807	152	139.5092	5.8684	2.1285	1.8378
// 83	89	7835	166	156.7087	6.2187	1.4941	1.3719
// 89	97	9317	187	182.1627	6.6576	0.7266	0.4551
// 97	101	10101	202	193.4192	6.9085	1.2421	0.9608
// 101	103	10505	208	197.1719	7.0385	1.5384	1.3970
// 103	107	11343	218	208.7667	7.2459	1.2743	1.1375
// 107	109	11771	223	212.5945	7.3884	1.4084	1.1348
// 109	113	12657	234	224.4020	7.6506	1.2545	0.9917
// 113	127	16013	276	278.8773	8.4023	-0.3424	-0.4626
// 127	131	17031	288	291.9355	8.6498	-0.4550	-0.5952
// 131	137	18635	315	314.5536	8.9937	0.0496	-0.2013
// 137	139	19181	320	319.0433	9.1252	0.1048	-0.0407
// 139	149	22059	365	361.6346	9.6496	0.3488	0.1073
// 149	151	22649	374	366.3231	9.7783	0.7851	0.5322
// 151	157	24495	394	390.9327	10.1397	0.3025	0.0600
// 157	163	26409	411	416.1104	10.4719	-0.4880	-0.7271
// 163	167	27723	432	431.4546	10.7024	0.0510	-0.1899
// 167	173	29759	455	457.5944	11.0188	-0.2355	-0.3811
// 173	179	31865	480	484.3132	11.3688	-0.3794	-0.6132
// 179	181	32579	492	489.6327	11.5046	0.2058	-0.0319
// 181	191	36297	541	539.4831	12.0544	0.1258	-0.0180
// 191	193	37055	547	544.9822	12.1838	0.1656	-0.0684
// 193	197	38613	567	562.0114	12.4248	0.4015	0.1715
// 197	199	39401	574	567.6586	12.5549	0.5051	0.2750
// 199	211	44319	626	632.0960	13.1449	-0.4638	-0.6056
//
// --- B: is p'^2 - 2 p-rough?  (+1 enters Lambda_2 exactly when it is) ---
// p	p'	p'^2-2	rough?	|S| under the l2=l1+2 repair	H5 under that repair
// 7	11	119	false	2				HOLDS
// 11	13	167	true	1				FAILS
// 13	17	287	false	2				HOLDS
// 17	19	359	true	1				FAILS
// 19	23	527	false	2				HOLDS
// 23	29	839	true	1				FAILS
// 29	31	959	false	2				HOLDS
// 31	37	1367	true	1				FAILS
// 37	41	1679	false	2				HOLDS
// 41	43	1847	true	1				FAILS
// 43	47	2207	true	1				FAILS
// 47	53	2807	false	2				HOLDS
// 53	59	3479	false	2				HOLDS
// 59	61	3719	true	1				FAILS
// 61	67	4487	false	2				HOLDS
// 67	71	5039	true	1				FAILS
// 71	73	5327	false	2				HOLDS
// 73	79	6239	false	2				HOLDS
// 79	83	6887	false	2				HOLDS
// 83	89	7919	true	1				FAILS
// 89	97	9407	false	2				HOLDS
// 97	101	10199	false	2				HOLDS
// 101	103	10607	true	1				FAILS
// 103	107	11447	true	1				FAILS
// 107	109	11879	false	2				HOLDS
// 109	113	12767	false	2				HOLDS
// 113	127	16127	true	1				FAILS
// 127	131	17159	true	1				FAILS
// 131	137	18767	false	2				HOLDS
// 137	139	19319	true	1				FAILS
// 139	149	22199	false	2				HOLDS
// 149	151	22799	false	2				HOLDS
// 151	157	24647	false	2				HOLDS
// 157	163	26567	false	2				HOLDS
// 163	167	27887	false	2				HOLDS
// 167	173	29927	true	1				FAILS
// 173	179	32039	false	2				HOLDS
// 179	181	32759	false	2				HOLDS
// 181	191	36479	true	1				FAILS
// 191	193	37247	false	2				HOLDS
// 193	197	38807	false	2				HOLDS
// 197	199	39599	false	2				HOLDS
// 199	211	44519	true	1				FAILS
// verdict flips across the 43 listed levels: 27
//
// --- C: k=2 hull test on named properties (exact corner rule) ---
// Example 3 (both prime; Lambda_1=Lambda_2={-1}, |S|=2)
//    forbidden = {(1,1), (1,-1), (-1,1)}   #S-mono-implied H5 = true   expected = true   agree = true
// Example 2 (l1 prime, l2 almost prime; |S|=1)
//    forbidden = {(1,1), (1,-1)}   #S-mono-implied H5 = false   expected = false   agree = true
// P_zone as written, only l1 confined (|S|=1)
//    forbidden = {(1,1), (1,-1)}   #S-mono-implied H5 = false   expected = false   agree = true
// P_zone repaired, both coordinates confined (|S|=2)
//    forbidden = {(1,1), (1,-1), (-1,1)}   #S-mono-implied H5 = true   expected = true   agree = true
// P_tile, no coordinate confined (|S|=0)
//    forbidden = {}   #S-mono-implied H5 = false   expected = false   agree = true
//
//    converse falsifier: P = [l1 rough in zone] AND [l2 rough] AND [lambda(l2)=+1]
//    forbidden = {(1,1), (1,-1), (-1,-1)}   H5 = true   (|S| = 1, so Proposition A (A1) would say "not H5")
//    origin = 0.5*(+1,+1) + 0.5*(-1,-1): 0 , 0
// ============================================================================
// READINGS
//
