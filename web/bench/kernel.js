/* primeoire kernel — the tile engine.
 *
 * One object, plain arrays, no rendering assumptions. Every bench instrument
 * and every exhibit on the scroll page is a view of this.
 *
 * Loads as a classic script in the browser (defines window.Kernel) and as a
 * CommonJS module in node (for test-kernel.js), so the bench works from
 * file:// with no server and no build step.
 *
 * Vocabulary is GLOSSARY.md's: tile, fold, hole, slot, census, seam, grain.
 */
(function (root) {
  'use strict';

  // ---------------------------------------------------------------- primes

  function primesUpTo(limit) {
    const sieve = new Uint8Array(limit + 1);
    const out = [];
    for (let n = 2; n <= limit; n++) {
      if (sieve[n]) continue;
      out.push(n);
      for (let m = n * n; m <= limit; m += n) sieve[m] = 1;
    }
    return out;
  }

  // The level index is a position in this list: level 0 is T2, level 1 is T3.
  const LEVEL_PRIMES = primesUpTo(41);

  // ------------------------------------------------------------- the tile

  /* Slot census at level p for offset d: the count of positions r where both
   * r and r+d are holes. For d = 2 this is the product of (q-2) over odd
   * q <= p (OEIS A059861). A prime q dividing d forbids one residue instead
   * of two, so it contributes (q-1). */
  function censusAt(levelIndex, d) {
    let n = 1;
    for (let i = 1; i <= levelIndex; i++) {
      const q = LEVEL_PRIMES[i];
      n *= (d % q === 0) ? (q - 1) : (q - 2);
    }
    return n;
  }

  function widthAt(levelIndex) {
    let w = 1;
    for (let i = 0; i <= levelIndex; i++) w *= LEVEL_PRIMES[i];
    return w;
  }

  /* Build the slot list of the tile at the given level, by folding.
   *
   * Each fold lays p copies of the previous tile end to end and strikes the
   * residues that would put r or r+d on a multiple of p. Iterating the copy
   * index k on the outside keeps the result sorted, which is what the grain
   * needs. This is the Copying Theorem run as an algorithm: every surviving
   * slot is a child of a slot one level down, and there are never any orphans.
   */
  function buildSlots(levelIndex, d, onProgress) {
    if (d % 2 !== 0 || d <= 0) throw new Error('offset d must be a positive even number');

    // Base: the 2-tile. Holes are the odd positions, so r and r+d (d even)
    // are both holes exactly when r is odd. One slot, at position 1.
    let width = 2;
    let slots = [1];
    const history = [{ prime: 2, width: 2, census: 1 }];

    for (let i = 1; i <= levelIndex; i++) {
      const p = LEVEL_PRIMES[i];
      const prevWidth = width;
      const expected = slots.length * (d % p === 0 ? p - 1 : p - 2);
      const next = expected > 1e6 ? new Float64Array(expected) : new Array(expected);
      let n = 0;

      for (let k = 0; k < p; k++) {
        const shift = k * prevWidth;
        for (let j = 0; j < slots.length; j++) {
          const v = slots[j] + shift;
          if (v % p !== 0 && (v + d) % p !== 0) next[n++] = v;
        }
      }

      width = prevWidth * p;
      slots = n === next.length ? next : Array.prototype.slice.call(next, 0, n);
      history.push({ prime: p, width: width, census: n });
      if (onProgress) onProgress(i, levelIndex);
    }

    return {
      level: LEVEL_PRIMES[levelIndex],
      levelIndex: levelIndex,
      d: d,
      width: width,
      prevWidth: levelIndex > 0 ? width / LEVEL_PRIMES[levelIndex] : 1,
      primes: LEVEL_PRIMES.slice(0, levelIndex + 1),
      slots: slots,
      census: slots.length,
      history: history
    };
  }

  /* The holes of the tile: positions coprime to every stacked prime. Only
   * used for rendering, and only affordable while the width fits a byte
   * array, so it returns null above the cap rather than pretending. */
  const HOLE_CAP = 12e6;
  function buildHoles(levelIndex) {
    const width = widthAt(levelIndex);
    if (width > HOLE_CAP) return null;
    const alive = new Uint8Array(width).fill(1);
    alive[0] = 0;
    for (let i = 0; i <= levelIndex; i++) {
      const p = LEVEL_PRIMES[i];
      for (let m = p; m < width; m += p) alive[m] = 0;
    }
    return alive;
  }

  /* Omega: the number of prime factors of n counted with multiplicity, for
   * every n up to a limit.
   *
   * This is the dimension of n in the box reading (OBSERVATIONS.md entry 5):
   * n can be written as a product of k factors each at least 2 exactly when
   * Omega(n) >= k. Omega(n) = 1 is prime.
   *
   * Computed by walking prime powers rather than factorising, which is one
   * pass of O(N log log N) increments and no division.
   */
  function omegaUpTo(limit) {
    const om = new Uint8Array(limit + 1);
    const composite = new Uint8Array(limit + 1);
    for (let q = 2; q <= limit; q++) {
      if (composite[q]) continue;
      for (let m = q + q; m <= limit; m += q) composite[m] = 1;
      for (let pe = q; pe <= limit; pe *= q) {
        for (let m = pe; m <= limit; m += pe) om[m]++;
        if (pe > limit / q) break;          // guard the multiply from overflowing the loop
      }
    }
    return om;
  }

  /* Flags every n that is a power of a single prime, q^e with e >= 1.
   *
   * These are the numbers where the two box readings disagree
   * (OBSERVATIONS.md entry 5a): a number boxes uniquely into k parts exactly
   * when Omega(n) = k, plus the single exceptional family p^(k+1), so a prime
   * power with Omega = m boxes uniquely at both m and m-1 while everything
   * else boxes uniquely at one k only. */
  function primePowersUpTo(limit) {
    const pp = new Uint8Array(limit + 1);
    const composite = new Uint8Array(limit + 1);
    for (let q = 2; q <= limit; q++) {
      if (composite[q]) continue;
      for (let m = q + q; m <= limit; m += q) composite[m] = 1;
      for (let pe = q; pe <= limit; pe *= q) {
        pp[pe] = 1;
        if (pe > limit / q) break;
      }
    }
    return pp;
  }

  // ------------------------------------------------------------- the grain

  /* The grain: the cyclic sequence of gaps between consecutive slots. The
   * last entry wraps around the tile edge, so the gaps always sum to the
   * width exactly. That sum is the cheapest correctness check there is. */
  function grain(tile) {
    const s = tile.slots;
    const n = s.length;
    const gaps = n > 1e6 ? new Float64Array(n) : new Array(n);
    for (let i = 0; i < n - 1; i++) gaps[i] = s[i + 1] - s[i];
    gaps[n - 1] = tile.width - s[n - 1] + s[0];
    return gaps;
  }

  /* The grain census: how many gaps of each size. The law behind this table
   * is open (GLOSSARY.md), which is why this instrument exists. */
  function grainCensus(gaps) {
    const counts = new Map();
    for (let i = 0; i < gaps.length; i++) {
      counts.set(gaps[i], (counts.get(gaps[i]) || 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => a[0] - b[0])
      .map(function (e) {
        return { size: e[0], count: e[1], share: e[1] / gaps.length };
      });
  }

  /* G_d: the largest gap in the tile. At d = 2 this is the twin Jacobsthal
   * function, whose known terms are the test vector in test-kernel.js. */
  function largestGap(gaps) {
    let best = 0, at = 0;
    for (let i = 0; i < gaps.length; i++) {
      if (gaps[i] > best) { best = gaps[i]; at = i; }
    }
    return { size: best, index: at };
  }

  /* The n largest gaps, as {index, start, size}, biggest first. Instrument 2
   * (where the monster gaps live) is built on this.
   *
   * Gap sizes take few distinct values, so a threshold found from the census
   * beats sorting the whole grain: at T23 that is a pass over 8 million
   * numbers instead of a sort of them. */
  function topGaps(tile, gaps, n) {
    if (n <= 0) return [];
    const census = grainCensus(gaps);
    let threshold = census[0].size, acc = 0;
    for (let i = census.length - 1; i >= 0; i--) {
      threshold = census[i].size;
      acc += census[i].count;
      if (acc >= n) break;
    }
    const picked = [];
    for (let i = 0; i < gaps.length; i++) {
      if (gaps[i] >= threshold) picked.push({ index: i, start: tile.slots[i], size: gaps[i] });
    }
    picked.sort(function (a, b) { return b.size - a.size || a.start - b.start; });
    return picked.slice(0, n);
  }

  /* Which fold created a slot.
   *
   * GLOSSARY: the natal set @p is born at the seam, from the edge lineage. A
   * slot's ancestor chain is r mod P_j# at each level j, and the eternal edge
   * is the slot sitting at width-1. So a slot's birth fold is the level at
   * which its ancestor stopped being the edge. The edge property is downward
   * closed (r = -1 mod P_j# forces r = -1 mod P_i# for every i < j), so the
   * first failure ends the search.
   *
   * Returns the prime of the birth fold, or null for the eternal edge itself.
   * Verified against the cohort sizes: 2 at @5, p-3 from @7 up.
   */
  function birthFoldWith(r, primeList) {
    let w = 1, lastEdge = -1;
    for (let j = 0; j < primeList.length; j++) {
      w *= primeList[j];
      // Once the running primorial passes r, the edge test can only succeed
      // at r = w-1, so leaving safe-integer range costs nothing here.
      if (!Number.isSafeInteger(w)) break;
      if (((r % w) + w) % w === w - 1) lastEdge = j; else break;
    }
    if (lastEdge >= primeList.length - 1) return null;   // the eternal edge
    return primeList[lastEdge + 1];
  }

  function birthFold(r, levelIndex) {
    return birthFoldWith(r, LEVEL_PRIMES.slice(0, levelIndex + 1));
  }

  /* Seams: where the copies laid down by the last fold meet. Every seam
   * carries the pair (kP-1, kP+1) by the mirror. */
  function seams(tile) {
    const out = [];
    for (let k = 1; k * tile.prevWidth < tile.width; k++) out.push(k * tile.prevWidth);
    return out;
  }

  // ------------------------------------------------------------------ api

  const Kernel = {
    LEVEL_PRIMES: LEVEL_PRIMES,
    HOLE_CAP: HOLE_CAP,
    primesUpTo: primesUpTo,
    widthAt: widthAt,
    censusAt: censusAt,
    buildSlots: buildSlots,
    buildHoles: buildHoles,
    omegaUpTo: omegaUpTo,
    primePowersUpTo: primePowersUpTo,
    grain: grain,
    grainCensus: grainCensus,
    largestGap: largestGap,
    topGaps: topGaps,
    birthFold: birthFold,
    birthFoldWith: birthFoldWith,
    seams: seams
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = Kernel;
  else root.Kernel = Kernel;
})(typeof window !== 'undefined' ? window : globalThis);
