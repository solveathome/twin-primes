// h2-prototype.js
//
// Computes omega2(n), the condensed paired Jacobsthal function of Ziller and
// Morack (arXiv:1706.03668, ancillary "full_details.pdf"), from which
// h2(n) = 6*omega2(n) + 6  (their corollary 1.3).
//
// omega2(n) = max m such that there exist TWO non-zero residue classes
// a_i, b_i mod p_i, for every prime p_i in {p_3,...,p_n} = {5,7,...,p_n},
// with every q in {1,...,m} lying in at least one of them.
//
// Method implemented here: the position-driven search of their Reduced
// Permutation Algorithm 2 (RPA2, their algorithm 3), armed with the exact
// per-prime residue-frequency bound of their section 2.3 (criterion 2.2,
// the bound that drives GPA2).  That combination is their CRPDSA2/GPA2
// family.  It is NOT their production code: no ILP portioning, single
// threaded, and the small-prime head is not run bound-free.
//
// Usage:  node h2-prototype.js <nmax> [--from n0] [--timeout-sec S]
//
// Output: one line per n with omega2(n), h2(n), node counts and wall clock.

'use strict';

function primeList(count) {
  // returns [p_1, p_2, ...] of length count
  const out = [];
  for (let x = 2; out.length < count; x++) {
    let ok = true;
    for (const p of out) { if (p * p > x) break; if (x % p === 0) { ok = false; break; } }
    if (ok) out.push(x);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Feasibility: does a two-class-per-prime cover of {1..m} exist over `primes`?
// ---------------------------------------------------------------------------
function makeSolver(primes, m) {
  const np = primes.length;
  const cov = new Uint8Array(m + 2);
  const cnt = primes.map(p => new Int32Array(p));
  const modtab = primes.map(p => {
    const t = new Int32Array(m + 2);
    for (let x = 0; x <= m + 1; x++) t[x] = x % p;
    return t;
  });
  const slots = new Int32Array(np).fill(2);
  const chosenQ = new Int32Array(2 * np);
  const chosenP = new Int32Array(2 * np);
  let depth = 0;
  let uncovered = m;
  let nodes = 0;
  let deadline = Infinity;
  let nodeCap = Infinity;

  for (let x = 1; x <= m; x++) for (let i = 0; i < np; i++) cnt[i][modtab[i][x]]++;

  // scratch stacks for the marks removed at each depth
  const marksBuf = [];
  for (let d = 0; d < 2 * np + 2; d++) marksBuf.push(new Int32Array(m + 2));
  const marksLen = new Int32Array(2 * np + 2);

  function applyClass(pi, r, d) {
    const p = primes[pi];
    const buf = marksBuf[d];
    let k = 0;
    for (let x = r; x <= m; x += p) {
      if (!cov[x]) {
        cov[x] = 1;
        buf[k++] = x;
        for (let i = 0; i < np; i++) cnt[i][modtab[i][x]]--;
      }
    }
    marksLen[d] = k;
    uncovered -= k;
  }
  function undoClass(d) {
    const buf = marksBuf[d];
    const k = marksLen[d];
    for (let j = 0; j < k; j++) {
      const x = buf[j];
      cov[x] = 0;
      for (let i = 0; i < np; i++) cnt[i][modtab[i][x]]++;
    }
    uncovered += k;
  }

  // criterion 2.2 of the full_details paper, exact form: for each prime still
  // holding s free classes, the best s residue classes measured against the
  // CURRENT uncovered set.  If the total is below the uncovered count, prune.
  function bound() {
    let s = 0;
    for (let i = 0; i < np; i++) {
      const k = slots[i];
      if (!k) continue;
      const c = cnt[i], p = primes[i];
      let b1 = 0, b2 = 0;
      for (let r = 1; r < p; r++) {
        const v = c[r];
        if (v > b1) { b2 = b1; b1 = v; } else if (v > b2) { b2 = v; }
      }
      s += (k === 2) ? b1 + b2 : b1;
      if (s >= uncovered) return true;
    }
    return s >= uncovered;
  }

  // one candidate buffer per recursion depth: these must NOT be shared, the
  // recursive call would overwrite the parent's pending candidate list.
  const candIdxD = [], candValD = [];
  for (let d = 0; d < 2 * np + 2; d++) { candIdxD.push(new Int32Array(np)); candValD.push(new Int32Array(np)); }

  function dfs(qstart) {
    const candIdx = candIdxD[depth], candVal = candValD[depth];
    nodes++;
    if (uncovered === 0) return true;
    if (nodes > nodeCap) throw new Error('BUDGET');
    if ((nodes & 0xffff) === 0 && Date.now() > deadline) throw new Error('TIMEOUT');
    if (!bound()) return false;
    let q = qstart;
    while (cov[q]) q++;

    // candidate classes that cover q: one per prime with a free slot and p !| q
    let nc = 0;
    for (let i = 0; i < np; i++) {
      if (!slots[i]) continue;
      const p = primes[i];
      const r = modtab[i][q];
      if (r === 0) continue;
      // RPA2 symmetry rule: an equivalent permutation with the smaller prime
      // placed earlier already exists, so skip p here.
      let bad = false;
      for (let j = 0; j < depth; j++) {
        if (chosenP[j] > p && (q - chosenQ[j]) % p === 0) { bad = true; break; }
      }
      if (bad) continue;
      candIdx[nc] = i;
      candVal[nc] = cnt[i][r];
      nc++;
    }
    // greedy: most newly covered first (finds satisfying covers fast)
    for (let a = 1; a < nc; a++) {
      const vi = candIdx[a], vv = candVal[a];
      let b = a - 1;
      while (b >= 0 && candVal[b] < vv) { candVal[b + 1] = candVal[b]; candIdx[b + 1] = candIdx[b]; b--; }
      candVal[b + 1] = vv; candIdx[b + 1] = vi;
    }

    for (let a = 0; a < nc; a++) {
      const i = candIdx[a];
      const p = primes[i];
      const r = modtab[i][q];
      slots[i]--;
      chosenQ[depth] = q; chosenP[depth] = p;
      const d = depth++;
      applyClass(i, r, d);
      if (dfs(q + 1)) return true;
      undoClass(d);
      depth--;
      slots[i]++;
    }
    return false;
  }

  return {
    run(timeoutSec, maxNodes) {
      deadline = timeoutSec ? Date.now() + timeoutSec * 1000 : Infinity;
      nodeCap = maxNodes || Infinity;
      const ok = dfs(1);
      let witness = null;
      if (ok) {
        witness = [];
        for (let j = 0; j < depth; j++) witness.push([chosenP[j], ((chosenQ[j] % chosenP[j]) + chosenP[j]) % chosenP[j]]);
      }
      return { ok, nodes, witness };
    },
    get nodes() { return nodes; }
  };
}

// ---------------------------------------------------------------------------
function main() {
  const argv = process.argv.slice(2);
  const nmax = parseInt(argv[0] || '12', 10);
  const fromArg = argv.indexOf('--from');
  const n0 = fromArg >= 0 ? parseInt(argv[fromArg + 1], 10) : 3;
  const toArg = argv.indexOf('--timeout-sec');
  const timeoutSec = toArg >= 0 ? parseFloat(argv[toArg + 1]) : 0;

  const P = primeList(nmax + 1);
  console.log('n   p_n   omega2   h2      m-tests  nodes(last-fail)  total-nodes  secs');
  let m = 1;
  for (let n = n0; n <= nmax; n++) {
    const primes = P.slice(2, n); // p_3 .. p_n
    const t0 = Date.now();
    let totalNodes = 0, lastFailNodes = 0, tests = 0, best = m;
    // climb from the previous omega2 (omega2 is non-decreasing in n)
    for (;;) {
      const cand = best + 1;
      const s = makeSolver(primes, cand);
      let res;
      try { res = s.run(timeoutSec); }
      catch (e) {
        console.log(`${n}   ${P[n - 1]}    TIMEOUT at m=${cand} after ${((Date.now() - t0) / 1000).toFixed(1)}s, nodes=${s.nodes}`);
        return;
      }
      tests++; totalNodes += res.nodes;
      if (res.ok) {
        // independent check of the witness: two non-zero classes per prime,
        // every position of {1..cand} hit.
        const used = new Map();
        for (const [p, r] of res.witness) {
          if (r === 0) throw new Error('witness uses a zero class');
          if (!used.has(p)) used.set(p, new Set());
          used.get(p).add(r);
        }
        for (const [p, s] of used) if (s.size > 2) throw new Error('witness uses >2 classes mod ' + p);
        for (let q = 1; q <= cand; q++) {
          let hit = false;
          for (const [p, r] of res.witness) if (q % p === r) { hit = true; break; }
          if (!hit) throw new Error('witness misses position ' + q + ' at m=' + cand);
        }
        best = cand;
      }
      else { lastFailNodes = res.nodes; break; }
    }
    m = best;
    const secs = (Date.now() - t0) / 1000;
    console.log(
      `${String(n).padEnd(3)} ${String(P[n - 1]).padEnd(5)} ${String(best).padEnd(8)} ${String(6 * best + 6).padEnd(7)} ` +
      `${String(tests).padEnd(8)} ${String(lastFailNodes).padEnd(17)} ${String(totalNodes).padEnd(12)} ${secs.toFixed(2)}`
    );
  }
}

module.exports = { primeList, makeSolver };

if (require.main === module) main();
