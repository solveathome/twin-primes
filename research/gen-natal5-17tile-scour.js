// Generate the cumulative Scour march on the Natal@5 set of the 17-tile.
// Fresh removals only (each prime removes only not-yet-removed members).
// Distinguishes self-strikes (= twin primes FOUND) from genuine kills.
// Writes a human-readable .txt report.
const fs = require('fs');

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
function isPrime(n){if(n<2)return false;for(let d=2;d*d<=n;d++)if(n%d===0)return false;return true;}

const base=[2,3,5,7,11,13,17], W=base.reduce((a,b)=>a*b,1); // 510510
const bad=new Uint8Array(W);
for(const q of base){for(let j=0;j<W;j+=q)bad[j]=1;const r2=((q-2)%q+q)%q;for(let j=r2;j<W;j+=q)bad[j]=1;}
// Natal@5 = slots with r ≡ 11 or 17 (mod 30) [Houses 11,17]
const natal5=[]; for(let r=0;r<W;r++) if(!bad[r] && (r%30===11||r%30===17)) natal5.push(r);
const N0=natal5.length;
const sqrtW=Math.sqrt(W);

const alive=new Set(natal5);
const L=[];
L.push('='.repeat(78));
L.push('  NATAL@5 SCOUR MARCH — the 17-tile');
L.push('='.repeat(78));
L.push('');
L.push(`  Tile:            @17  (width W = ${W.toLocaleString()})`);
L.push(`  Natal@5 set:     ${N0}  slots  (r ≡ 11 or 17 mod 30 = Houses 11,17 = (2/3)·D_17)`);
L.push(`  Scour range:     primes 19 … ${Math.floor(sqrtW)} (q ≤ √W = ${sqrtW.toFixed(1)})`);
L.push('');
L.push('  Cumulative (tree) march: each prime removes ONLY members not already');
L.push('  removed by a smaller prime. A "self-strike" removes the slot at position');
L.push('  q itself — that is a TWIN PRIME FOUND, not a destruction (proven).');
L.push('');
L.push('   q  | fresh | self=twin | genuine | cumulative | alive |  ratio | 2/q');
L.push('       | rmvd  |  found    |  kills  |  removed   |       |        |');
L.push('  '+'-'.repeat(72));

let cumul=0, totalSelf=0, totalKill=0;
for(const q of primesUpTo(Math.floor(sqrtW))){
  if(q<=17) continue;
  const before=alive.size;
  let fresh=0, self=0;
  for(const r of [...alive]){
    if(r%q===0 || (r+2)%q===0){
      alive.delete(r); fresh++;
      const pos=(r%q===0)?r:r+2;
      if(pos===q) self++;                // self-strike = twin found
    }
  }
  const kills=fresh-self;
  cumul+=fresh; totalSelf+=self; totalKill+=kills;
  L.push(`  ${String(q).padStart(3)} |  ${String(fresh).padStart(3)}  |    ${String(self).padStart(2)}     |  ${String(kills).padStart(4)}   |   ${String(cumul).padStart(5)}    | ${String(alive.size).padStart(5)} | ${(fresh/before).toFixed(4)} | ${(2/q).toFixed(4)}`);
}
L.push('  '+'-'.repeat(72));
L.push('');
L.push(`  TOTAL fresh removals:   ${cumul}  of ${N0}   (${(cumul/N0*100).toFixed(1)}%)`);
L.push(`    of which self-strikes (TWIN PRIMES FOUND): ${totalSelf}`);
L.push(`    genuine kills (composite candidates unmasked): ${totalKill}`);
L.push(`  Natal@5 SURVIVORS after the Scour to √W: ${alive.size}  (${(alive.size/N0*100).toFixed(1)}%)`);
L.push('');
// The survivors below √W-frontier are real twin primes; verify a sample
const survArr=[...alive].sort((a,b)=>a-b);
const realTwins=survArr.filter(r=>isPrime(r)&&isPrime(r+2)).length;
L.push(`  Of the ${alive.size} survivors, ${realTwins} are genuine twin primes (r, r+2 both prime).`);
L.push(`  (Survivors that are not yet twins have a factor > √W = ${sqrtW.toFixed(0)}, i.e. live`);
L.push(`   just beyond this tile’s crystallization frontier.)`);
L.push('');
L.push('  READING: fresh removals track 2/q of the survivors at every step');
L.push('  (natal-blindness); the self-strike column is a running list of twin');
L.push('  primes discovered; survival converges to Natal@5 · ∏(1−2/q).');
L.push('='.repeat(78));

const out='~/Files/Git/primeoire/research/natal5-17tile-scour.txt';
fs.writeFileSync(out, L.join('\n')+'\n');
console.log('wrote '+out+'  ('+cumul+' removed, '+alive.size+' survive of '+N0+')');
