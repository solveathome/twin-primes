'use strict';
// ============================================================================
// fdecay-deep CORE — the segmented window instrument for f and for window-L
// ============================================================================
// Shared engine for `fdecay-deep-01-validate.js` and `fdecay-deep-02-ladder.js`.
// Pre-registration: `research/history/staging/fdecay-deep-prereg.md`.
//
// WHAT IT MEASURES. For a level x (a prime) with fold p = nextprime(x), inside
// a window [0, X):
//
//   f_win(x, X) = #{gaps between consecutive x-rough twin slots in [0,X) that
//                   are = 0, +2 or -2 (mod p)} / #{such gaps}
//
// and L_win(x, X), the longest run of consecutive x-rough twin slots whose
// gap-class word is accepted by the Alternation Lemma's two-state graph
// (`history/staging/import-sofic.md` §1: from Z the legal letters are 0 and -2,
// from M they are 0 and +2), maximised over both start states.
//
// f_win IS AN ESTIMATE OF THE TILE QUANTITY, NOT THE TILE QUANTITY. The census
// f of `a3-03-f-from-census.js` is an exact ratio over the whole period x#;
// this is the same ratio over the prefix [0, X) with X far below x#. The
// prereg's §3 and §4 are the calibration of that difference.
//
// L_win IS A LOWER BOUND ON THE TILE L (PROVEN, given the graph). A legal class
// word over l consecutive slots fixes a residue a with all l slots in
// {a, a-2} mod p; copy k = -a*w^{-1} (mod p) of the full period deletes exactly
// that class pair (U-FRAME §5a step 1), so an adjacent-kill run of length l
// exists in the period. The window holds X/mbar slots against the period's p*D,
// so L_win is expected far below L.
//
// THE LEVER. Every localized object needs a segmented sieve of [0, X) and never
// the tile of width x# (`research/LOCALIZED-GAP.md` §10). Memory here is the
// segment, not X. The engine sieves the lattice n = 5 (mod 6) — forced, since a
// twin slot needs n != 0, -2 (mod 2) and (mod 3) — recording for each position
// key(n) = min{ q prime, 5 <= q <= xmax : q | n(n+2) }, 0 if none. Level x is
// exactly { n : key(n) = 0 or key(n) > x }, so ONE sieve serves every level of
// the ladder at once, which is why the ladder is free and the window is not.
//
// COST. 2*(X/6)*sum_{5<=q<=xmax} 1/q strike attempts, X/6 reads, and
// sum_j (X/mbar(x_j)) per-level slot updates. f is a TAIL functional — it never
// sees a gap below d_min = 2p -+ 2 (`f-decays.md` Lemma A) — so a level is only
// measurable once (X/mbar)*f is of order ten, and that, not the sieve, is the
// wall.
// ============================================================================

function primesUpTo(n) {
  const s = new Uint8Array(n + 1), o = [];
  for (let i = 2; i <= n; i++) { if (s[i]) continue; o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; }
  return o;
}
function invmod(a, m) { let g = m, x = 0, r = ((a % m) + m) % m, y = 1; while (r) { const q = Math.floor(g / r); [g, r] = [r, g - q * r]; [x, y] = [y, x - q * y]; } return ((x % m) + m) % m; }

// exact closed forms of the tile, for calibration only (no tile is ever built)
function meanGap(x, PR) { let m = 2; for (const q of PR) { if (q > x) break; if (q >= 3) m *= q / (q - 2); } return m; }
function lnD(x, PR) { let s = 0; for (const q of PR) { if (q > x) break; if (q >= 3) s += Math.log(q - 2); } return s; }
const rhoq = (q, d) => (d % q === 0 ? q - 2 : ((d % q === 2 || d % q === q - 2) ? q - 3 : q - 4));
function lnS(x, d, PR) { let s = 0; for (const q of PR) { if (q > x) break; if (q >= 5) s += Math.log(rhoq(q, d) / (q - 4)); } return s; }
const k0of = p => { const i = invmod(3, p); return Math.min(i, p - i); };

// ---------------------------------------------------------------------------
// measure({ X, levels, checkpoints, seed, onProgress })
//   levels: ascending array of primes x; fold p = nextprime(x) is derived.
//   seed:   0 (default) reads the PREFIX [0, X). Any other value reads a window
//           of length X at a UNIFORMLY RANDOM offset Z of the period: Z is drawn
//           by picking Z mod q independently and uniformly for every prime q of
//           the tile and every fold prime, which by CRT is exactly a uniform Z
//           mod x#. That makes the estimator unbiased for the tile quantity BY
//           CONSTRUCTION, which the prefix is not known to be, and the spread
//           over seeds is the error bar. The RNG is a fixed xorshift so the
//           output is reproducible.
// returns one row per level with counts, the qualifying histogram, L_win, the
// single-copy L (copy a = 0, the object `attack-foldL-04-localized.js` reports),
// and a snapshot at every checkpoint.
// ---------------------------------------------------------------------------
function measure(opts) {
  const X = opts.X, levels = opts.levels.slice().sort((a, b) => a - b);
  const checkpoints = (opts.checkpoints || []).slice().sort((a, b) => a - b);
  const onProgress = opts.onProgress || (() => {});
  const xmax = levels[levels.length - 1];
  const PR = primesUpTo(Math.max(xmax + 200, 3000));
  const nextPrime = x => PR.find(q => q > x);
  const nl = levels.length;
  const P = levels.map(nextPrime);

  // survTab[k] = how many levels a position with key k survives (prefix, since
  // levels ascend): k = 0 survives all, else the count of x_j < k.
  const survTab = new Uint8Array(xmax + 1);
  survTab[0] = nl;
  for (let k = 1; k <= xmax; k++) { let c = 0; while (c < nl && levels[c] < k) c++; survTab[k] = c; }

  const strikePrimes = PR.filter(q => q >= 5 && q <= xmax);
  const inv6 = strikePrimes.map(q => invmod(6 % q, q));

  // the random offset, as residues (CRT). seed 0 = the prefix, Z = 0.
  const seed = opts.seed || 0;
  let rs = (seed * 2654435761) >>> 0 || 1;
  const rnd = () => { rs ^= rs << 13; rs >>>= 0; rs ^= rs >> 17; rs ^= rs << 5; rs >>>= 0; return rs; };
  const zq = new Map();
  for (const q of strikePrimes) zq.set(q, seed === 0 ? 0 : rnd() % q);
  const zp = P.map(p => (seed === 0 ? 0 : rnd() % p));

  const prevN = new Float64Array(nl).fill(-1);
  const Nslot = new Float64Array(nl), ngap = new Float64Array(nl), nqual = new Float64Array(nl);
  const q0 = new Float64Array(nl), qp = new Float64Array(nl), qm = new Float64Array(nl);
  const lenZ = new Int32Array(nl), lenM = new Int32Array(nl), bestL = new Int32Array(nl).fill(1);
  const run0 = new Int32Array(nl), bestL0 = new Int32Array(nl).fill(1), prevKilled = new Uint8Array(nl);
  const maxGap = new Float64Array(nl);
  const qhist = []; for (let j = 0; j < nl; j++) qhist.push(new Map());
  const snaps = []; for (let j = 0; j < nl; j++) snaps.push([]);
  let cpi = 0;

  const SEGBITS = 19, SEG = 1 << SEGBITS;         // 524288 wheel slots ~ 3.1e6 integers
  const key = new Uint16Array(SEG);
  const totalIdx = Math.floor((X - 5) / 6) + 1;
  const t0 = Date.now();

  for (let i0 = 0; i0 < totalIdx; i0 += SEG) {
    const len = Math.min(SEG, totalIdx - i0);
    key.fill(0, 0, len);
    for (let s = 0; s < strikePrimes.length; s++) {
      const q = strikePrimes[s], iv = inv6[s];
      const z = zq.get(q);
      for (const t of [0, q - 2]) {
        const bi = (((t - 5 - z) % q + q) % q) * iv % q;      // i = bi (mod q)
        let st = (bi - (i0 % q)) % q; if (st < 0) st += q;
        for (let i = st; i < len; i += q) if (key[i] === 0) key[i] = q;
      }
    }
    const base = 6 * i0 + 5;   // relative position; absolute n = Z + base + 6*(i-i0)
    for (let i = 0; i < len; i++) {
      const s = survTab[key[i]];
      if (s === 0) continue;
      const n = base + 6 * i;
      for (let j = 0; j < s; j++) {
        Nslot[j]++;
        const pv = prevN[j];
        if (pv < 0) { prevN[j] = n; lenZ[j] = 1; lenM[j] = 1; const p = P[j]; const kk = (n + zp[j]) % p; prevKilled[j] = (kk === 0 || kk === p - 2) ? 1 : 0; run0[j] = prevKilled[j] ? 1 : 0; continue; }
        const d = n - pv; prevN[j] = n;
        ngap[j]++;
        if (d > maxGap[j]) maxGap[j] = d;
        const p = P[j], r = d % p;
        let nz = 1, nm = 1;
        if (r === 0) { nqual[j]++; q0[j]++; nz = lenZ[j] + 1; nm = lenM[j] + 1; }
        else if (r === 2) { nqual[j]++; qp[j]++; nz = lenM[j] + 1; }
        else if (r === p - 2) { nqual[j]++; qm[j]++; nm = lenZ[j] + 1; }
        if (r === 0 || r === 2 || r === p - 2) qhist[j].set(d, (qhist[j].get(d) || 0) + 1);
        lenZ[j] = nz; lenM[j] = nm;
        if (nz > bestL[j]) bestL[j] = nz;
        if (nm > bestL[j]) bestL[j] = nm;
        // single copy a = 0: the slot dies iff n = 0 or -2 (mod p)
        const kk = (n + zp[j]) % p, killed = (kk === 0 || kk === p - 2) ? 1 : 0;
        run0[j] = killed ? (prevKilled[j] ? run0[j] + 1 : 1) : 0;
        prevKilled[j] = killed;
        if (run0[j] > bestL0[j]) bestL0[j] = run0[j];
      }
    }
    const nEnd = base + 6 * (len - 1);
    while (cpi < checkpoints.length && checkpoints[cpi] <= nEnd) {
      for (let j = 0; j < nl; j++) snaps[j].push({ X: nEnd, N: Nslot[j], ngap: ngap[j], nqual: nqual[j], L: bestL[j], L0: bestL0[j] });
      cpi++;
    }
    onProgress(nEnd, (Date.now() - t0) / 1000);
  }
  // any checkpoint at or beyond the last position is the final state: the
  // segment grid never lands exactly on X, so flush rather than drop it.
  while (cpi < checkpoints.length && checkpoints[cpi] <= X) {
    for (let j = 0; j < nl; j++) snaps[j].push({ X, N: Nslot[j], ngap: ngap[j], nqual: nqual[j], L: bestL[j], L0: bestL0[j] });
    cpi++;
  }

  const rows = [];
  for (let j = 0; j < nl; j++) {
    const x = levels[j], p = P[j], dmin = 6 * k0of(p);
    rows.push({
      x, p, dmin, mbarExact: meanGap(x, PR), lnDx: lnD(x, PR), lnSx: lnS(x, dmin, PR),
      N: Nslot[j], ngap: ngap[j], nqual: nqual[j], q0: q0[j], qp: qp[j], qm: qm[j],
      f: nqual[j] / ngap[j], Lwin: bestL[j], Lcopy0: bestL0[j], maxGap: maxGap[j],
      qhist: [...qhist[j]].sort((a, b) => a[0] - b[0]), snaps: snaps[j]
    });
  }
  return { X, rows, elapsed: (Date.now() - t0) / 1000 };
}

module.exports = { measure, primesUpTo, invmod, meanGap, lnD, lnS, k0of, rhoq };
