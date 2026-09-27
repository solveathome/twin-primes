// SIGNED DIVISOR GROUPING — product cutoff, CRT density, and archived factors.
// Companion: research/signed-divisor-grouping.md. No asymptotic fit.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const input = fs.readFileSync(path.join(__dirname, 'data-reuse/factor-windows.json'));
const data = JSON.parse(input);
assert.equal(data.schema, 1);
console.log(`input: data-reuse/factor-windows.json sha256=${sha(input)}; ${data.windows.length} retained factor windows read`);
function gcd(a, b) { while (b) [a, b] = [b, a % b]; return a; }
function powFloor(x, a, b) {
  let n = Math.floor(x ** (a / b)); const goal = BigInt(x) ** BigInt(a);
  while (BigInt(n + 1) ** BigInt(b) <= goal) n++;
  while (BigInt(n) ** BigInt(b) > goal) n--;
  return n;
}
const cuts = x => ({U: powFloor(x, 6, 25), V: powFloor(x, 6, 25), Y: powFloor(x, 1, 20), Z: powFloor(x, 1, 20), L: powFloor(x, 7, 10)});
class Sum { constructor() { this.s = 0; this.c = 0; } add(v) { const y = v - this.c, t = this.s + y; this.c = (t - this.s) - y; this.s = t; } }
function close(a, b, scale, label) { assert(Math.abs(a-b) <= 5e-11 * Math.max(1, scale), `${label}: ${a} != ${b}`); }
function factor(n) {
  const f = [];
  for (const p of data.basePrimes) {
    if (p * p > n) break;
    if (n % p) continue;
    let a = 0; do { n /= p; a++; } while (n % p === 0); f.push([p, a]);
  }
  if (n > 1) f.push([n, 1]); return f;
}
const mobius = n => { const f = factor(n); return f.some(([,a]) => a > 1) ? 0 : (-1) ** f.length; };
function terms(n, fac, A, B) {
  // Independent implementation: construct each cofactor's prime-power
  // exponents, then sum beta directly, without subtracting a cached total.
  let list = [{d: 1, sign: 1, used: []}];
  for (let i = 0; i < fac.length; i++) {
    const old = list.length;
    for (let j = 0; j < old; j++) list.push({d: list[j].d * fac[i][0], sign: -list[j].sign, used: [...list[j].used, i]});
  }
  const out = [];
  for (const t of list) {
    const k = n / t.d;
    if (t.d <= A || k <= B) continue;
    let beta = 0;
    for (let i = 0; i < fac.length; i++) {
      const [p, a] = fac[i]; let power = 1;
      for (let j = 1; j <= a - Number(t.used.includes(i)); j++) { power *= p; if (power > B) beta += Math.log(p); }
    }
    if (beta) out.push({d: t.d, k, sign: t.sign, beta});
  }
  return out;
}
function primePowers(W) {
  const a = [{r: 1, c: 1}];
  for (const p of data.basePrimes) {
    if (p > W) break;
    for (let r = p; r <= W; r *= p) a.push({r, c: -Math.log(p)});
  }
  return a;
}
function kernel(a, b) { const g = gcd(a, b); return 2 % g ? 0 : g; }
function twoPart(n) { let a = 0; while (n % 2 === 0) { n /= 2; a++; } return [a, n]; }
function inverse(a, q) {
  let r=a,s=q,u=1,v=0;
  while(s) { const z=Math.floor(r/s); [r,s]=[s,r-z*s]; [u,v]=[v,u-z*v]; }
  assert.equal(r,1); return ((u%q)+q)%q;
}
{
  let checks = 0;
  for (let d = 1; d <= 24; d++) if (mobius(d)) for (let e = 1; e <= 24; e++) {
    for (let r = 1; r <= 16; r++) for (let s = 1; s <= 16; s++) {
      const [eps, a] = twoPart(d), [rho, ro] = twoPart(r), [tau, b] = twoPart(e * s);
      const v = Math.min(eps + rho, tau);
      const expected = gcd(ro, b) !== 1 || gcd(a, 2 * b) !== 1 || v > 1 ? 0 : 2 ** v;
      assert.equal(kernel(d * r, e * s), expected); checks++;
    }
  }
  console.log(`CRT parity kernel: ${checks} direct gcd comparisons, including powers of 2`);
}
{
  const A=37,B=101,mod=(a,q)=>((a%q)+q)%q; let checks=0,cells=0;
  for(let a=1;a<=24;a++) for(let b=1;b<=24;b++) {
    const g=kernel(a,b); if(!g) continue;
    const q=a*b/g,j=mod((2/g)*inverse(a/g,b/g),b/g),origin=a*j;
    assert.equal(origin%a,0); assert.equal(mod(origin-2,b),0);
    let count=0,direct=0,mean=0,abel=0;
    const F=n=>Math.log(n/a)*Math.log((n-2)/b);
    for(let n=A+1;n<=B;n++) {
      if(n%a===0&&(n-2)%b===0) { count++; direct+=F(n); }
      const numerator=q*count-(n-A);
      assert.equal(numerator,mod(A-origin,q)-mod(n-origin,q)); checks++;
      const delta=numerator/q; assert(Math.abs(delta)<1 || delta===0);
      mean+=F(n)/q;
      if(n===B) abel+=F(n)*delta; else abel-=delta*(F(n+1)-F(n));
    }
    close(direct-mean,abel,Math.abs(direct)+Math.abs(mean),'weighted sawtooth summation');
    cells++;
  }
  console.log(`endpoint phases: ${checks} exact discrepancy numerators; weighted summation checked in ${cells} compatible cells`);
}
{
  let checks = 0;
  for (const m of [1, 2, 6, 30, 210, 2310, 30030]) for (let n = 1; n <= 512; n++) {
    let convolution = 0;
    for (let h = 1; h <= n; h++) if (n % h === 0 && factor(h).every(([p]) => m % p === 0)) convolution += mobius(n / h);
    assert.equal(convolution, gcd(n, m) === 1 ? mobius(n) : 0); checks++;
  }
  console.log(`excluded-prime convolution: ${checks} exact identities; this does not test its asymptotic mean bound`);
}
assert.equal(70 + 24 + 5, 99); assert(99 < 100);
assert.equal(24 / 4 - 2, 4); // x^(-.06) * (x^2)^.01 = x^(-.04).

function profile(label, x, lo, hi, get, full, custom = null) {
  const c = custom || cuts(x), {U,V,Y,Z,L} = c;
  assert(Math.floor(L / (Y + 1)) * V < x / 2);
  assert(Math.floor(L / (U + 1)) * Z < x / 2 - 2);
  const total = {}, blocks = new Map();
  for (const k of ['all','small','large','smallPos','smallNeg','smallAbs','largeAbs']) total[k] = new Sum();
  let active = 0, smallCount = 0;
  for (let n = lo; n <= hi; n++) {
    const a = terms(n, get(n), U, V), b = terms(n-2, get(n-2), Y, Z);
    for (const d of a) for (const e of b) {
      const w = d.beta * e.beta, signed = d.sign * e.sign * w, small = d.d * e.d <= L;
      total.all.add(signed); total[small ? 'small' : 'large'].add(signed);
      total[small ? 'smallAbs' : 'largeAbs'].add(w);
      if (small) {
        smallCount++; total[d.sign * e.sign > 0 ? 'smallPos' : 'smallNeg'].add(w);
        assert(d.k * e.k > x, 'controlled product range lies in singleton fibers at tested sizes');
      }
      const key = `${small ? 'small' : 'large'}:${Math.floor(Math.log2(d.d))}:${Math.floor(Math.log2(e.d))}`;
      if (!blocks.has(key)) blocks.set(key, {signed: new Sum(), absolute: new Sum(), terms: 0});
      const block = blocks.get(key); block.signed.add(signed); block.absolute.add(w); block.terms++;
      active++;
    }
  }
  const abs = total.smallAbs.s + total.largeAbs.s;
  close(total.all.s, total.small.s + total.large.s, abs, 'product split');
  close(total.small.s, total.smallPos.s - total.smallNeg.s, abs, 'small signs');
  let signedBlocks = 0, blockTotal = 0;
  for (const b of blocks.values()) { signedBlocks += Math.abs(b.signed.s); blockTotal += b.signed.s; }
  close(total.all.s, blockTotal, abs, 'dyadic grouping'); assert(signedBlocks <= abs + 1e-7);
  const scale = full ? x : hi-lo+1, unit = full ? '/x' : '/partner';
  console.log(`${label} x=${x} U=${U} V=${V} Y=${Y} Z=${Z} L=${L}: small${unit}=${(total.small.s/scale).toFixed(6)} large${unit}=${(total.large.s/scale).toFixed(6)} Psmall${unit}=${(total.smallPos.s/scale).toFixed(6)} Nsmall${unit}=${(total.smallNeg.s/scale).toFixed(6)}`);
  console.log(`  active=${active}; small=${smallCount}; all tested small-product terms are singleton; block absolute sum${unit}=${(signedBlocks/scale).toFixed(6)} vs ungrouped${unit}=${(abs/scale).toFixed(6)}`);
  return {label,x,lo,hi,full,...c,active,smallCount,sums:Object.fromEntries(Object.entries(total).map(([k,v])=>[k,v.s])),signedBlocks,blocks:[...blocks].map(([key,b])=>({key,signed:b.signed.s,absolute:b.absolute.s,terms:b.terms}))};
}

function crtExpansion(result, enumerate, sector = 'small') {
  const {x,lo,hi,U,V,Y,Z,L} = result;
  const moments = [new Sum(),new Sum(),new Sum()];
  for (let n=lo; n<=hi; n++) { const a=Math.log(n), b=Math.log(n-2); moments[0].add(a); moments[1].add(b); moments[2].add(a*b); }
  const N=hi-lo+1, [ln,lt,lnt]=moments.map(t=>t.s), main=new Sum(), direct=new Sum();
  let errorBudget=0, pairs=0, cells=0;
  const rp=primePowers(V), sp=primePowers(Z);
  const dmax=sector==='small'?Math.floor(L/(Y+1)):Math.floor(x/(V+1));
  for (let d=U+1; d<=dmax; d++) {
    const md=mobius(d); if (!md) continue;
    const emax=sector==='small'?Math.floor(L/d):Math.floor((x-2)/(Z+1));
    for (let e=Y+1; e<=emax; e++) {
      if (sector==='large' && d*e<=L) continue;
      const me=mobius(e); if (!me) continue;
      pairs++; const ld=Math.log(d), le=Math.log(e);
      for (const r of rp) for (const s of sp) {
        const a=d*r.r, b=e*s.r, g=kernel(a,b); if (!g) continue;
        const coeff=md*me*r.c*s.c, density=g/(a*b);
        const moment=r.r===1 ? (s.r===1 ? lnt-le*ln-ld*lt+ld*le*N : ln-ld*N) : (s.r===1 ? lt-le*N : N);
        main.add(coeff*density*moment); cells++;
        const sup=(r.r===1?Math.log(hi/d):1)*(s.r===1?Math.log((hi-2)/e):1);
        errorBudget+=2*Math.abs(coeff)*sup;
        if (enumerate) {
          for (let n=Math.ceil(lo/a)*a; n<=hi; n+=a) if ((n-2)%b===0) {
            direct.add(coeff*(r.r===1?Math.log(n/d):1)*(s.r===1?Math.log((n-2)/e):1));
          }
        }
      }
    }
  }
  if (enumerate) close(direct.s,result.sums[sector],result.sums.smallAbs+result.sums.largeAbs,'independent four-term CRT expansion');
  const error=result.sums[sector]-main.s;
  assert(Math.abs(error)<=errorBudget+1e-7);
  console.log(`  CRT finite budget (${sector}): signed=${result.sums[sector].toFixed(6)} density main=${main.s.toFixed(6)} endpoint error=${error.toFixed(6)} absolute error allowance=${errorBudget.toFixed(6)}; ${pairs} divisor pairs, ${cells} compatible cells${enumerate ? '; full expansion reproduced' : ''}`);
  return {main:main.s,error,errorBudget,pairs,cells,enumerated:enumerate};
}

const results=[];
for (const c of [{x:1024,U:7,V:6,Y:3,Z:4,L:100}, {x:4096,...cuts(4096)}, {x:65536,...cuts(65536)}]) {
  const {x}=c;
  const f=Array.from({length:x+1},(_,n)=>n<2?[]:factor(n));
  const r=profile('full-check',x,x/2+1,x,n=>f[n],true,c);
  r.crt=crtExpansion(r,x<=4096);
  if (x===1024) r.crtLarge=crtExpansion(r,true,'large');
  results.push(r);
}
for (const w of data.windows) {
  for (let j=0;j<w.primePowerFactors.length;j++) assert.equal(w.primePowerFactors[j].reduce((n,[p,a])=>n*p**a,1),w.factorStart+j);
  const r=profile(`archived-q${w.q}`,w.x,w.lo,w.hi,n=>w.primePowerFactors[n-w.factorStart],false);
  const old=data.results.find(t=>t.label===`archived-q${w.q}`);
  close(r.sums.all,old.sums.grouped,r.sums.smallAbs+r.sums.largeAbs,'retained-factor total matches prior producer');
  results.push(r);
}
const payload={schema:1,producer:'research/signed-divisor-validation.js',source:'research/data-reuse/factor-windows.json',sourceSha256:sha(input),results};
const bytes=JSON.stringify(payload)+'\n';
fs.writeFileSync(path.join(__dirname,'data-reuse/signed-grouping.json'),bytes);
console.log(`saved data-reuse/signed-grouping.json: ${Buffer.byteLength(bytes)} bytes sha256=${sha(bytes)}; signed and absolute dyadic block sums retained`);
console.log('Finite budgets retain the density main and endpoint error. No rate or asymptotic threshold inferred from these runs.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/signed-divisor-validation.js
//   invocation:  node research/signed-divisor-validation.js
//   code-sha256: e2a37e36e3fbdece5bbf96b4fc59d9ae8ab1085a754575f283db6a960a2ff1e7
//   out-sha256:  5d177c4510e58760c6aa9374439f529b30e34a04679434fd89f1bee19a7090f0
//   body-lines:  22
//   inputs:      research/data-reuse/factor-windows.json@fa30e65431c2
//   forced:      2026-09-05, 0 of 84 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-05
//   elapsed:     0.4 s
// ============================================================================
// input: data-reuse/factor-windows.json sha256=fa30e65431c2f9fa7b66a4e3cf7eb44cdcc912c4de19b97d56dfbf279030b98b; 3 retained factor windows read
// CRT parity kernel: 98304 direct gcd comparisons, including powers of 2
// endpoint phases: 28800 exact discrepancy numerators; weighted summation checked in 450 compatible cells
// excluded-prime convolution: 3584 exact identities; this does not test its asymptotic mean bound
// full-check x=1024 U=7 V=6 Y=3 Z=4 L=100: small/x=0.550302 large/x=0.049119 Psmall/x=0.864697 Nsmall/x=0.314396
//   active=1443; small=99; all tested small-product terms are singleton; block absolute sum/x=1.509263 vs ungrouped/x=8.715366
//   CRT finite budget (small): signed=563.508890 density main=578.579631 endpoint error=-15.070741 absolute error allowance=1325.572994; 17 divisor pairs, 174 compatible cells; full expansion reproduced
//   CRT finite budget (large): signed=50.298211 density main=142.508544 endpoint error=-92.210333 absolute error allowance=519563.187082; 10353 divisor pairs, 136779 compatible cells; full expansion reproduced
// full-check x=4096 U=7 V=7 Y=1 Z=1 L=337: small/x=-0.597050 large/x=0.153602 Psmall/x=13.163099 Nsmall/x=13.760149
//   active=19126; small=4886; all tested small-product terms are singleton; block absolute sum/x=6.996885 vs ungrouped/x=57.187740
//   CRT finite budget (small): signed=-2445.517492 density main=-2385.180338 endpoint error=-60.337154 absolute error allowance=39421.664972; 342 divisor pairs, 1597 compatible cells; full expansion reproduced
// full-check x=65536 U=14 V=14 Y=1 Z=1 L=2352: small/x=0.624897 large/x=-0.526358 Psmall/x=45.491313 Nsmall/x=44.866416
//   active=543536; small=141928; all tested small-product terms are singleton; block absolute sum/x=10.631451 vs ungrouped/x=190.393732
//   CRT finite budget (small): signed=40953.274149 density main=39609.307171 endpoint error=1343.966978 absolute error allowance=968212.082025; 3596 divisor pairs, 28058 compatible cells
// archived-q97 x=16384 U=10 V=10 Y=1 Z=1 L=891: small/partner=4.742685 large/partner=-1.430889 Psmall/partner=54.499526 Nsmall/partner=49.756841
//   active=9625; small=2753; all tested small-product terms are singleton; block absolute sum/partner=20.564824 vs ungrouped/partner=206.126297
// archived-q997 x=1048576 U=27 V=27 Y=2 Z=2 L=16384: small/partner=7.470655 large/partner=-1.295413 Psmall/partner=176.451166 Nsmall/partner=168.980511
//   active=98739; small=20663; all tested small-product terms are singleton; block absolute sum/partner=37.498455 vs ungrouped/partner=862.160348
// archived-q9973 x=134217728 U=89 V=89 Y=2 Z=2 L=489178: small/partner=0.307756 large/partner=2.503601 Psmall/partner=571.548433 Nsmall/partner=571.240677
//   active=164813; small=38787; all tested small-product terms are singleton; block absolute sum/partner=95.045629 vs ungrouped/partner=2643.887510
// saved data-reuse/signed-grouping.json: 85360 bytes sha256=fbdf92c583dcd4958996096878eb584f0c4b03eeb4408092f8156a30f9addfb6; signed and absolute dyadic block sums retained
// Finite budgets retain the density main and endpoint error. No rate or asymptotic threshold inferred from these runs.
// ============================================================================
// READINGS
// The saved factorizations are inputs, not recomputed archived sieves. Product
// grouping preserves Mobius signs and the exact beta weights. Finite nonzero
// low-product sums do not contradict the separately derived asymptotic bound.
// The full-check x=1024 uses custom cutoffs to exercise both beta expansions.
