// ============================================================================
// thm-mod30-tail.js — SCRATCHPAD-GRADE verification for thm-mod30-tail.md.
// Refutation attempt on the premises of bv-import-survey.md §3.1 (S1, S2).
// Exhaustive at @11/@13/@17/@19: marches the Natal@5 comb, and for EVERY
// non-self fresh victim of EVERY prime-regime scour prime (q^3 > W+1) checks
//   (a) v = q*m with m prime and m >= q,
//   (b) v mod 30 in {11,17} on the A-side, {13,19} on the B-side,
//   (c) fresh(q) <= capS1(q), the mod-30 cap of S1,
// then measures the tail sums (cap1 vs capS1) and tests the two candidate
// freshness density factors, (1-1/(q'-1)) vs the survey's (1-2/(q'-1)).
//   node research/history/staging/thm-mod30-tail.js   (~10 s, < 200 MB)
// ============================================================================
'use strict';
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
function assert(c,m){if(!c)throw new Error('ASSERT FAIL: '+m)}
const LEVELS=[11,13,17,19];
const out=[];
const L=s=>{out.push(s);console.log(s)};

L('=== S1/S2 verification, exhaustive over prime-regime scour primes ===');
for(const x of LEVELS){
  const wheel=primesUpTo(x), mids=wheel.filter(p=>p>=7);
  let W=1; for(const p of wheel) W*=p;
  // comb
  const alive=new Uint8Array(W); let N=0;
  for(const r0 of [11,17]) for(let r=r0;r<W;r+=30){
    let ok=true; for(const p of mids){const t=r%p; if(t===0||t===p-2){ok=false;break}}
    if(ok){alive[r]=1;N++}
  }
  const scour=primesUpTo(Math.floor(Math.sqrt(W))+2).filter(q=>q>x&&q*q<=W);
  // prime sieve up to max cofactor bound
  const qmin=scour[0], TMAX=Math.floor((W+1)/qmin)+2;
  const isP=new Uint8Array(TMAX+1); isP.fill(1); isP[0]=0; isP[1]=0;
  for(let i=2;i*i<=TMAX;i++) if(isP[i]) for(let j=i*i;j<=TMAX;j+=i) isP[j]=0;
  // cumulative prime counts by class mod 30
  const CL=[1,7,11,13,17,19,23,29], idx=new Int8Array(30).fill(-1);
  CL.forEach((c,i)=>idx[c]=i);
  const cum=[]; for(let i=0;i<8;i++) cum.push(new Int32Array(TMAX+1));
  {const run=new Int32Array(8);
   for(let t=0;t<=TMAX;t++){ if(isP[t]){const k=idx[t%30]; if(k>=0) run[k]++;}
     for(let i=0;i<8;i++) cum[i][t]=run[i]; }}
  const piC=(t,c)=>{ if(t<0)return 0; if(t>TMAX)throw new Error('range'); const k=idx[((c%30)+30)%30]; return k<0?0:cum[k][t]; };
  const inv30=q=>{ const a=((q%30)+30)%30; for(let b=1;b<30;b++) if((a*b)%30===1) return b; throw new Error('noinv'); };
  const sq=q=>[11,13,17,19].includes(q%30)?1:0;

  // march
  let loose=0, viol=0, checkedVic=0, tailCap1=0, tailCapS1=0, tailCapS1sharp=0, tailFresh=0, tailPrimes=0;
  let sumC30=0; // A-side counts, exact, for the density test
  const primeRegime=q=>q*q*q>W+1;
  const perQ=[];
  for(const q of scour){
    let fresh=0,self=0; const vicA=[],vicB=[];
    for(let r=q;r<W;r+=q) if(alive[r]){alive[r]=0;fresh++; if(r===q)self++; else vicA.push(r);}
    for(let r=q-2;r>=0&&r<W;r+=q){ if(r<0)continue; if(alive[r]){alive[r]=0;fresh++; if(r===q-2)self++; else vicB.push(r);} }
    perQ.push({q,fresh,self,nA:vicA.length,nB:vicB.length});
    if(!primeRegime(q)) continue;
    tailPrimes++; tailFresh+=fresh;
    // (a),(b) exhaustive classification check
    for(const r of vicA){ const v=r, m=v/q; checkedVic++;
      if(!Number.isInteger(m)||!isP[m]||m<q||!(v%30===11||v%30===17)) viol++; }
    for(const r of vicB){ const v=r+2, m=v/q; checkedVic++;
      if(!Number.isInteger(m)||!isP[m]||m<q||!(v%30===13||v%30===19)) viol++; }
    // caps
    const A=Math.floor((W-1)/q), B=Math.floor((W+1)/q), iq=inv30(q);
    const cap1=(piC(A,-1)===undefined?0:0)+0; // placeholder, cap1 computed below
    const piAll=t=>{let s=0;for(let i=0;i<8;i++)s+=cum[i][t];return s+ (t>=2?1:0)+(t>=3?1:0)+(t>=5?1:0);};
    const c1=piAll(A)+piAll(B)-2*piAll(q-1)+sq(q);
    const cS1=piC(A,iq*11)+piC(A,iq*17)+piC(B,iq*13)+piC(B,iq*19)+sq(q);
    const cS1s=(piC(A,iq*11)-piC(q-1,iq*11))+(piC(A,iq*17)-piC(q-1,iq*17))
              +(piC(B,iq*13)-piC(q-1,iq*13))+(piC(B,iq*19)-piC(q-1,iq*19))+sq(q);
    assert(fresh<=cS1s,`fresh<=capS1sharp at x=${x} q=${q}: ${fresh} > ${cS1s}`);
    assert(cS1s<=cS1,`sharp<=loose at x=${x} q=${q}`);
    assert(cS1s<=c1,`capS1sharp<=cap1 at x=${x} q=${q}`);
    if(cS1>c1) loose++;
    tailCap1+=c1; tailCapS1+=cS1; tailCapS1sharp+=cS1s;
    sumC30+=cS1s-sq(q);
  }
  L(`@${x}: W=${W} N=${N} scour=${scour.length} tailPrimes=${tailPrimes} victimsChecked=${checkedVic} VIOLATIONS=${viol} (survey-form capS1 > cap1 at ${loose} of ${tailPrimes} tail primes)`);
  L(`     tail: fresh=${tailFresh}  Sigma cap1=${tailCap1}  Sigma capS1=${tailCapS1}  Sigma capS1(sharp)=${tailCapS1sharp}`);
  L(`     ratios: capS1/cap1=${(tailCapS1/tailCap1).toFixed(4)}  capS1sharp/cap1=${(tailCapS1sharp/tailCap1).toFixed(4)}  capS1/N=${(tailCapS1/N).toFixed(3)}  cap1/N=${(tailCap1/N).toFixed(3)}`);
}

L('');
L('=== freshness density factor: (1-1/(q\'-1)) vs survey S2 (1-2/(q\'-1)) ===');
L('exact count of A-side admissible prime cofactors m in [q,A] with the mod-30');
L('classes, then with the depth-K freshness conditions of staircase-note §7 added.');
for(const x of [17,19]){
  const wheel=primesUpTo(x), mids=wheel.filter(p=>p>=7);
  let W=1; for(const p of wheel) W*=p;
  const scour=primesUpTo(Math.floor(Math.sqrt(W))+2).filter(q=>q>x&&q*q<=W);
  const qmin=scour[0], TMAX=Math.floor((W+1)/qmin)+2;
  const isP=new Uint8Array(TMAX+1); isP.fill(1); isP[0]=0;isP[1]=0;
  for(let i=2;i*i<=TMAX;i++) if(isP[i]) for(let j=i*i;j<=TMAX;j+=i) isP[j]=0;
  const inv30=q=>{const a=q%30;for(let b=1;b<30;b++) if((a*b)%30===1) return b; throw 0};
  const primeRegime=q=>q*q*q>W+1;
  const KS=[0,1,2,4,8];
  for(const K of KS){
    const mods=scour.slice(0,K);
    let tot=0, base=0;
    for(const q of scour){
      if(!primeRegime(q)) continue;
      const A=Math.floor((W-1)/q);
      for(let m=q;m<=A;m++){
        if(!isP[m]) continue;
        const v=q*m; const c=v%30; if(!(c===11||c===17)) continue;
        base++;
        let ok=true;
        for(const qp of mods){ if(qp>=q) break; const t=v%qp; if(t===0||t===qp-2){ok=false;break} }
        if(ok) tot++;
      }
    }
    // predicted thinning, averaged: use per-q products
    let p1=0,p2=0,bq=0;
    for(const q of scour){ if(!primeRegime(q)) continue;
      const A=Math.floor((W-1)/q); let cnt=0;
      for(let m=q;m<=A;m++){ if(!isP[m])continue; const c=(q*m)%30; if(c===11||c===17)cnt++; }
      let f1=1,f2=1;
      for(const qp of mods){ if(qp>=q)break; f1*=(1-1/(qp-1)); f2*=(1-2/(qp-1)); }
      p1+=cnt*f1; p2+=cnt*f2; bq+=cnt;
    }
    L(`@${x} K=${K}: exact A-side admissible = ${tot} (K=0 base ${base}); pred with prod(1-1/(q'-1)) = ${p1.toFixed(1)} (ratio ${(tot/p1).toFixed(4)});  pred with prod(1-2/(q'-1)) = ${p2.toFixed(1)} (ratio ${(tot/p2).toFixed(4)})`);
  }
}

L('');
L('=== crossover level: (tail cap)/N < 1, exact finite products ===');
L('cap1 form 2ln2*W/theta(x)/N  vs  S1 form (ln2/2)*W/theta(x)/N');
{
  const P=primesUpTo(3000);
  const rows=[];
  let W=1,N=2,th=0;
  for(const p of P){ W*=p; th+=Math.log(p); if(p>=7) N*= (p-2);
    if(p<7) continue;
    // W/N via logs
    let lnWoverN=0; lnWoverN=Math.log(15); for(const r of P){ if(r>p)break; if(r>=7) lnWoverN+=Math.log(r/(r-2)); }
    const r1=Math.exp(Math.log(2*Math.log(2))+lnWoverN-Math.log(th));
    const r2=Math.exp(Math.log(Math.log(2)/2)+lnWoverN-Math.log(th));
    rows.push({p,r1,r2});
  }
  const f1=rows.find(r=>r.r1<1), f2=rows.find(r=>r.r2<1);
  L(`cap1 crossover first x with ratio<1: x=${f1?f1.p:'none'} (ratio ${f1?f1.r1.toFixed(4):''})`);
  L(`S1   crossover first x with ratio<1: x=${f2?f2.p:'none'} (ratio ${f2?f2.r2.toFixed(4):''})`);
  for(const q of [11,19,29,59,149,499,997]){ const r=rows.find(z=>z.p===q); if(r) L(`   x=${q}: cap1 ratio ${r.r1.toFixed(4)}  S1 ratio ${r.r2.toFixed(4)}`); }
}
L('');
L("=== S2 modulus growth: is q_K ~ ln W?  (q_K = K-th scour prime, ln W = theta(x)) ===");
{
  const P=primesUpTo(200000);
  for(const x of [11,13,17,19,23,29,101,1009,10007]){
    let th=0; for(const p of P){ if(p>x) break; th+=Math.log(p); }
    const sc=P.filter(q=>q>x).slice(0,8);
    L(`x=${x}: lnW=theta(x)=${th.toFixed(3)}  q1=${sc[0]} (q1/lnW=${(sc[0]/th).toFixed(3)})  q8=${sc[7]} (q8/lnW=${(sc[7]/th).toFixed(3)})  x/lnW=${(x/th).toFixed(3)}`);
  }
}
L('');
L('done');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/thm-mod30-tail.js
//   invocation:  node research/history/staging/thm-mod30-tail.js
//   code-sha256: 35b061936437d264659b5fd9cb0d878d6defa4fc46d28cc94c171e22acbfa32a
//   out-sha256:  77bf42f71306175c51103d6f4b67d92df32c8598445a2554a6fa97e383df8e5f
//   body-lines:  52
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     0.4 s
// ============================================================================
// === S1/S2 verification, exhaustive over prime-regime scour primes ===
// @11: W=2310 N=90 scour=10 tailPrimes=9 victimsChecked=30 VIOLATIONS=0 (survey-form capS1 > cap1 at 1 of 9 tail primes)
//      tail: fresh=32  Sigma cap1=215  Sigma capS1=86  Sigma capS1(sharp)=55
//      ratios: capS1/cap1=0.4000  capS1sharp/cap1=0.2558  capS1/N=0.956  cap1/N=2.389
// @13: W=30030 N=990 scour=34 tailPrimes=29 victimsChecked=312 VIOLATIONS=0 (survey-form capS1 > cap1 at 5 of 29 tail primes)
//      tail: fresh=317  Sigma cap1=2720  Sigma capS1=1017  Sigma capS1(sharp)=699
//      ratios: capS1/cap1=0.3739  capS1sharp/cap1=0.2570  capS1/N=1.027  cap1/N=2.747
// @17: W=510510 N=14850 scour=120 tailPrimes=105 victimsChecked=3888 VIOLATIONS=0 (survey-form capS1 > cap1 at 16 of 105 tail primes)
//      tail: fresh=3902  Sigma cap1=42895  Sigma capS1=14509  Sigma capS1(sharp)=10783
//      ratios: capS1/cap1=0.3382  capS1sharp/cap1=0.2514  capS1/N=0.977  cap1/N=2.889
// @19: W=9699690 N=252450 scour=435 tailPrimes=396 victimsChecked=54025 VIOLATIONS=0 (survey-form capS1 > cap1 at 60 of 396 tail primes)
//      tail: fresh=54070  Sigma cap1=724717  Sigma capS1=229143  Sigma capS1(sharp)=181328
//      ratios: capS1/cap1=0.3162  capS1sharp/cap1=0.2502  capS1/N=0.908  cap1/N=2.871
//
// === freshness density factor: (1-1/(q'-1)) vs survey S2 (1-2/(q'-1)) ===
// exact count of A-side admissible prime cofactors m in [q,A] with the mod-30
// classes, then with the depth-K freshness conditions of staircase-note §7 added.
// @17 K=0: exact A-side admissible = 5336 (K=0 base 5336); pred with prod(1-1/(q'-1)) = 5336.0 (ratio 1.0000);  pred with prod(1-2/(q'-1)) = 5336.0 (ratio 1.0000)
// @17 K=1: exact A-side admissible = 5037 (K=0 base 5336); pred with prod(1-1/(q'-1)) = 5039.6 (ratio 0.9995);  pred with prod(1-2/(q'-1)) = 4743.1 (ratio 1.0620)
// @17 K=2: exact A-side admissible = 4802 (K=0 base 5336); pred with prod(1-1/(q'-1)) = 4810.5 (ratio 0.9982);  pred with prod(1-2/(q'-1)) = 4311.9 (ratio 1.1137)
// @17 K=4: exact A-side admissible = 4474 (K=0 base 5336); pred with prod(1-1/(q'-1)) = 4484.1 (ratio 0.9978);  pred with prod(1-2/(q'-1)) = 3737.0 (ratio 1.1972)
// @17 K=8: exact A-side admissible = 4043 (K=0 base 5336); pred with prod(1-1/(q'-1)) = 4059.1 (ratio 0.9960);  pred with prod(1-2/(q'-1)) = 3054.4 (ratio 1.3237)
// @19 K=0: exact A-side admissible = 90501 (K=0 base 90501); pred with prod(1-1/(q'-1)) = 90501.0 (ratio 1.0000);  pred with prod(1-2/(q'-1)) = 90501.0 (ratio 1.0000)
// @19 K=1: exact A-side admissible = 86390 (K=0 base 90501); pred with prod(1-1/(q'-1)) = 86387.3 (ratio 1.0000);  pred with prod(1-2/(q'-1)) = 82273.6 (ratio 1.0500)
// @19 K=2: exact A-side admissible = 83313 (K=0 base 90501); pred with prod(1-1/(q'-1)) = 83302.1 (ratio 1.0001);  pred with prod(1-2/(q'-1)) = 76396.9 (ratio 1.0905)
// @19 K=4: exact A-side admissible = 78294 (K=0 base 90501); pred with prod(1-1/(q'-1)) = 78288.5 (ratio 1.0001);  pred with prod(1-2/(q'-1)) = 67342.5 (ratio 1.1626)
// @19 K=8: exact A-side admissible = 71478 (K=0 base 90501); pred with prod(1-1/(q'-1)) = 71492.2 (ratio 0.9998);  pred with prod(1-2/(q'-1)) = 56038.3 (ratio 1.2755)
//
// === crossover level: (tail cap)/N < 1, exact finite products ===
// cap1 form 2ln2*W/theta(x)/N  vs  S1 form (ln2/2)*W/theta(x)/N
// cap1 crossover first x with ratio<1: x=149 (ratio 0.9766)
// S1   crossover first x with ratio<1: x=17 (ratio 0.9065)
//    x=11: cap1 ratio 4.5941  S1 ratio 1.1485
//    x=19: cap1 ratio 3.3109  S1 ratio 0.8277
//    x=29: cap1 ratio 2.7737  S1 ratio 0.6934
//    x=59: cap1 ratio 1.7897  S1 ratio 0.4474
//    x=149: cap1 ratio 0.9766  S1 ratio 0.2442
//    x=499: cap1 ratio 0.4132  S1 ratio 0.1033
//    x=997: cap1 ratio 0.2512  S1 ratio 0.0628
//
// === S2 modulus growth: is q_K ~ ln W?  (q_K = K-th scour prime, ln W = theta(x)) ===
// x=11: lnW=theta(x)=7.745  q1=13 (q1/lnW=1.679)  q8=41 (q8/lnW=5.294)  x/lnW=1.420
// x=13: lnW=theta(x)=10.310  q1=17 (q1/lnW=1.649)  q8=43 (q8/lnW=4.171)  x/lnW=1.261
// x=17: lnW=theta(x)=13.143  q1=19 (q1/lnW=1.446)  q8=47 (q8/lnW=3.576)  x/lnW=1.293
// x=19: lnW=theta(x)=16.088  q1=23 (q1/lnW=1.430)  q8=53 (q8/lnW=3.294)  x/lnW=1.181
// x=23: lnW=theta(x)=19.223  q1=29 (q1/lnW=1.509)  q8=59 (q8/lnW=3.069)  x/lnW=1.196
// x=29: lnW=theta(x)=22.590  q1=31 (q1/lnW=1.372)  q8=61 (q8/lnW=2.700)  x/lnW=1.284
// x=101: lnW=theta(x)=88.344  q1=103 (q1/lnW=1.166)  q8=139 (q8/lnW=1.573)  x/lnW=1.143
// x=1009: lnW=theta(x)=963.162  q1=1013 (q1/lnW=1.052)  q8=1051 (q8/lnW=1.091)  x/lnW=1.048
// x=10007: lnW=theta(x)=9905.202  q1=10009 (q1/lnW=1.010)  q8=10091 (q8/lnW=1.019)  x/lnW=1.010
//
// done
// ============================================================================
// READINGS
//
