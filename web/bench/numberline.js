/* primeoire bench — the number line.
 *
 * One column per integer, one fixed row per stacked prime. A striking prime's
 * block starts at its own row and hangs down to the next prime that struck, so
 * the skyline is the largest stacked prime dividing each number and a hole is
 * empty. Two holes two apart is a slot, coloured by the fold that created it
 * (kernel.birthFoldWith).
 */
(function () {
  'use strict';

  const K = window.Kernel;
  const $ = function (id) { return document.getElementById(id); };
  const fmt = function (n) { return n.toLocaleString('en-US'); };

  /* One colour per prime, used for both its strikes and for the slots it
   * gives birth to, so the same colour always means the same prime. */
  const PALETTE = ['#5b8def', '#7fd4a8', '#f0b429', '#ff6b6b', '#b98cff',
    '#4dd8e0', '#ff9f45', '#f472b6', '#a3e635', '#38bdf8', '#fb7185',
    '#c4b5fd', '#34d399', '#fbbf24', '#60a5fa', '#f0abfc', '#86efac',
    '#fca5a5', '#93c5fd', '#fde047', '#d8b4fe', '#67e8f9', '#fdba74',
    '#bef264', '#a5b4fc'];
  const colourOf = function (i) { return PALETTE[i % PALETTE.length]; };

  const ALL = K.primesUpTo(200);

  const state = {
    k: 4,          // how many primes are stacked
    z: 6,          // pixels per integer
    h: 9,          // pixels per strike block
    start: 0,
    mode: 'rows',   // 'rows' (fixed row per prime) or 'stack' (one block per striker)
    birth: 'all',   // 'all', 'edge', or a fold prime: which lineage to pick out
    holes: true, twins: true, tile: true, frontier: true, nums: true, mirror: true,
    gapmark: false   // outline every gap of maximal width on screen
  };

  let primes = [], width = 1, frontier = 4, levelIndex = 0;
  let view = { first: 0, count: 0 };

  // ------------------------------------------------------------- url state

  function readUrl() {
    const q = new URLSearchParams(location.hash.slice(1));
    if (q.has('k')) state.k = Math.min(25, Math.max(1, +q.get('k')));
    if (q.has('z')) state.z = Math.min(28, Math.max(1, +q.get('z')));
    if (q.has('h')) state.h = Math.min(16, Math.max(3, +q.get('h')));
    if (q.has('start')) state.start = Math.max(0, +q.get('start'));
    if (q.get('mode') === 'stack' || q.get('mode') === 'rows') state.mode = q.get('mode');
    if (q.has('birth')) state.birth = q.get('birth');
    ['holes', 'twins', 'tile', 'frontier', 'nums', 'mirror', 'gapmark'].forEach(function (n) {
      if (q.has(n)) state[n] = q.get(n) === '1';
    });
  }
  function writeUrl() {
    const q = new URLSearchParams();
    q.set('k', state.k); q.set('z', state.z); q.set('h', state.h);
    q.set('start', Math.round(state.start));
    q.set('mode', state.mode);
    q.set('birth', state.birth);
    ['holes', 'twins', 'tile', 'frontier', 'nums', 'mirror', 'gapmark'].forEach(function (n) { q.set(n, state[n] ? 1 : 0); });
    history.replaceState(null, '', '#' + q.toString());
  }

  // -------------------------------------------------------------- the maths

  function recompute() {
    primes = ALL.slice(0, state.k);
    const p = primes[primes.length - 1];
    frontier = p * p;
    levelIndex = K.LEVEL_PRIMES.indexOf(p);   // -1 once we pass 41
    width = 1;
    for (let i = 0; i < primes.length; i++) {
      width *= primes[i];
      if (!Number.isSafeInteger(width)) { width = Infinity; break; }
    }
  }

  // Which stacked primes divide n. Position 0 is divisible by all of them.
  function strikesOn(n) {
    const out = [];
    for (let i = 0; i < primes.length; i++) if (n % primes[i] === 0) out.push(i);
    return out;
  }
  function isHole(n) {
    if (n < 1) return false;
    for (let i = 0; i < primes.length; i++) if (n % primes[i] === 0) return false;
    return true;
  }
  function isSlot(n) { return isHole(n) && isHole(n + 2); }

  /* The fold that created a slot: the level at which its ancestor stopped
   * being the eternal edge. */
  function birthOf(n) { return K.birthFoldWith(n, primes); }

  // -------------------------------------------------------------- drawing

  function fitCanvas(c) {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = c.clientWidth, h = c._cssH;
    c.width = w * dpr; c.height = h * dpr;
    c.style.height = h + 'px';
    const ctx = c.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    return { ctx: ctx, w: w, h: h };
  }

  function draw() {
    const c = $('line');
    const z = state.z;
    const first = Math.max(0, Math.round(state.start));
    const count = Math.ceil(c.clientWidth / z) + 1;
    view = { first: first, count: count };

    /* Two renderings of the same strikes.
     *
     * rows:  one row per stacked prime in a fixed frame. primes[i] owns row i
     *        counting up from the baseline and owns it at every position, so a
     *        row is scannable horizontally. Needs the full k rows always.
     * stack: one block per striking prime, piled from the baseline in order.
     *        Height is the count of stacked primes dividing n, so the frame can
     *        shrink to whatever is actually on screen.
     */
    if (state.mode === 'rows') {
      c._cssH = primes.length * state.h + 60 + 52;
    } else {
      let tallest = 1;
      for (let i = 0; i < count; i++) {
        const n = first + i;
        if (n < 1) continue;        // 0 is divisible by everything and would set the height alone
        let hits = 0;
        for (let j = 0; j < primes.length; j++) if (n % primes[j] === 0) hits++;
        if (hits > tallest) tallest = hits;
      }
      c._cssH = tallest * state.h + 60 + 52;
    }

    const g = fitCanvas(c), ctx = g.ctx, W = g.w, H = g.h;
    const base = H - 52;

    const bw = Math.max(1, z - 1);

    /* Two different kinds of vertical line, and they are half a column apart.
     *
     * A tile edge is a BOUNDARY between copies. A fold lays down whole sets of
     * positions, never half a position, so the boundary sits at the left edge
     * of column m: the previous copy ends at m-1, this one starts at m.
     *
     * A mirror axis is a POSITION. Its line runs through the middle of that
     * position's column, because folding the picture there has to land column
     * m on itself.
     *
     * Only the axes at ODD multiples of p#/2 are drawn. Reflection about 0 is
     * r -> -r and reflection about p#/2 is r -> p# - r, which are the same map
     * mod p#: one symmetry, whose two fixed points sit half a period apart.
     * The centre one folds a tile onto itself. The one at the boundary folds a
     * tile onto its neighbour, which is forced by periodicity and shows
     * nothing the centre does not.
     *
     * No labels on either: at the 5-tile they repeat every fifteen positions
     * and the text collides into noise. The key below the canvas names them.
     */
    const boundaryX = function (m) { return (m - first) * z + .5; };
    const axisX = function (m) { return (m - first) * z + bw / 2; };

    if (isFinite(width) && width * z > 30 && state.tile) {
      ctx.strokeStyle = 'rgba(215,222,233,.30)'; ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
      for (let m = Math.ceil(first / width) * width; m < first + count; m += width) {
        ctx.beginPath(); ctx.moveTo(boundaryX(m), 8); ctx.lineTo(boundaryX(m), base + 40); ctx.stroke();
      }
      ctx.setLineDash([]);
    }

    if (state.mirror && isFinite(width)) {
      const half = width / 2;                 // 2 is always stacked, so this is an integer
      if (half * z > 30) {
        ctx.strokeStyle = '#e879f9'; ctx.lineWidth = 1;
        let k = Math.ceil(first / half); if (k % 2 === 0) k++;
        for (; k * half < first + count; k += 2) {
          const x = axisX(k * half);
          ctx.beginPath(); ctx.moveTo(x, 8); ctx.lineTo(x, base + 40); ctx.stroke();
        }
      }
    }

    /* Largest gaps. Once G is known for this level, a maximal gap is cheap to
     * spot locally: walk the slots on screen and mark any whose distance to
     * the next slot equals G. Every tie in view gets marked, not just the one
     * the jump button landed on. */
    if (state.gapmark) {
      const G = gapSizeFor();
      if (G) {
        ctx.font = '10px ui-monospace, monospace';
        for (let i = 0; i < count; i++) {
          const n = first + i;
          if (!isSlot(n)) continue;
          let next = 0;
          for (let k2 = 6; k2 <= G + 6; k2 += 6) { if (isSlot(n + k2)) { next = k2; break; } }
          if (next !== G) continue;
          const x0 = (n - first) * z, x1 = (n + G - first) * z + bw;
          ctx.fillStyle = 'rgba(255,255,255,.07)';
          ctx.fillRect(x0, 6, x1 - x0, base + 16 - 6);
          ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.setLineDash([4, 3]); ctx.lineWidth = 1;
          ctx.strokeRect(x0 + .5, 6.5, x1 - x0 - 1, base + 16 - 7);
          ctx.setLineDash([]);
          ctx.fillStyle = 'rgba(255,255,255,.75)';
          ctx.fillText(' G₂ = ' + G, x0 + 3, 17);
        }
      }
    }

    // The frontier is a boundary rather than a position: everything strictly
    // below p2 is settled, and p2 itself is composite. So this one correctly
    // sits at the left edge of its column, not through it.
    if (state.frontier && frontier >= first && frontier < first + count) {
      const x = (frontier - first) * z + .5;
      ctx.strokeStyle = '#ff6b6b'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(x, 8); ctx.lineTo(x, base + 40); ctx.stroke();
      ctx.fillStyle = '#ff6b6b'; ctx.font = '10px ui-monospace, monospace';
      ctx.fillText(' frontier ' + fmt(frontier), x + 3, 16);
    }

    // The baseline.
    ctx.strokeStyle = '#33405f'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, base + .5); ctx.lineTo(W, base + .5); ctx.stroke();

    const rowsMode = state.mode === 'rows';

    for (let i = 0; i < count; i++) {
      const n = first + i;
      const x = i * z;
      const hits = strikesOn(n);

      if (rowsMode) {
        // Each striker starts at its own row and extends down through the rows
        // of the primes that did not strike, stopping at the next striker.
        let prev = -1;
        for (let j = 0; j < hits.length; j++) {
          const row = hits[j];
          ctx.fillStyle = colourOf(row);
          ctx.fillRect(x, base - (row + 1) * state.h + 1, bw, (row - prev) * state.h - 1);
          prev = row;
        }
      } else {
        // One block per striker, piled from the baseline, smallest at the bottom.
        for (let j = 0; j < hits.length; j++) {
          ctx.fillStyle = colourOf(hits[j]);
          ctx.fillRect(x, base - (j + 1) * state.h + 1, bw, state.h - 1);
        }
      }

      if (hits.length === 0 && n >= 1) {
        if (state.holes) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(x, base + 3, bw, 4);
        }
      }
    }

    // Slots, under the holes, coloured by the fold that made them.
    if (state.twins) {
      for (let i = 0; i < count; i++) {
        const n = first + i;
        if (!isSlot(n)) continue;
        const x = i * z;
        const w = 2 * z + bw;
        const b = birthOf(n);
        const key = b === null ? 'edge' : String(b);
        const picked = state.birth === 'all' || state.birth === key;
        const col = b === undefined ? '#7c89a5'
          : b === null ? '#ffffff'
            : colourOf(ALL.indexOf(b));
        const settled = (n + 2) < frontier;
        ctx.globalAlpha = picked ? 1 : 0.12;
        ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 1;
        if (settled) ctx.fillRect(x, base + 12, w, 7);
        else ctx.strokeRect(x + .5, base + 12.5, w - 1, 6);
        ctx.globalAlpha = 1;
      }
    }

    // Numbers, when there is room for them.
    if (state.nums) {
      ctx.fillStyle = '#7c89a5'; ctx.font = '10px ui-monospace, monospace';
      ctx.textAlign = 'center';
      const step = z >= 26 ? 1 : z >= 13 ? 2 : z >= 7 ? 5 : z >= 4 ? 10 : z >= 2 ? 25 : 100;
      for (let i = 0; i < count; i++) {
        const n = first + i;
        if (n % step !== 0) continue;
        ctx.fillText(fmt(n), i * z + bw / 2, base + 34);
      }
      ctx.textAlign = 'left';
    }

    drawKeys();
    drawChips();
  }

  function drawKeys() {
    $('primeKey').innerHTML = '<b style="color:#d7dee9">strikes</b> &nbsp;' +
      primes.map(function (p, i) {
        return '<span class="sw"><i style="background:' + colourOf(i) + '"></i>' + p + '</span>';
      }).join('');

    // Only the folds that actually gave birth to something on screen.
    const seen = new Map();
    for (let i = 0; i < view.count; i++) {
      const n = view.first + i;
      if (!isSlot(n)) continue;
      const b = birthOf(n);
      const key = b === undefined ? 'unknown' : b === null ? 'edge' : b;
      seen.set(key, (seen.get(key) || 0) + 1);
    }
    const parts = Array.from(seen.entries()).sort(function (a, b) {
      return (a[0] === 'edge' ? -1 : a[0] === 'unknown' ? 1 : a[0]) -
        (b[0] === 'edge' ? -1 : b[0] === 'unknown' ? 1 : b[0]);
    }).map(function (e) {
      const col = e[0] === 'edge' ? '#ffffff' : e[0] === 'unknown' ? '#7c89a5' : colourOf(ALL.indexOf(e[0]));
      const label = e[0] === 'edge' ? 'the eternal edge' : e[0] === 'unknown' ? 'past 41, unresolved' : 'born at fold ' + e[0];
      return '<span class="sw"><i style="background:' + col + '"></i>' + label + ' (' + e[1] + ')</span>';
    });
    $('birthKey').innerHTML = '<b style="color:#d7dee9">slots in view</b> &nbsp;' +
      (parts.length ? parts.join('') : '<span style="color:#7c89a5">none</span>');
  }

  function drawChips() {
    let holes = 0, slots = 0;
    for (let i = 0; i < view.count; i++) {
      const n = view.first + i;
      if (isHole(n)) holes++;
      if (isSlot(n)) slots++;
    }
    const p = primes[primes.length - 1];
    const rows = [
      ['stacked', primes.length + ' primes'],
      ['largest', p],
      ['tile width p#', isFinite(width) ? fmt(width) : 'past 2^53'],
      ['frontier p²', fmt(frontier)],
      ['in view', fmt(view.first) + '–' + fmt(view.first + view.count - 1)],
      ['holes in view', fmt(holes)],
      ['slots in view', fmt(slots)],
      ['hole density', (holes / view.count * 100).toFixed(1) + '%']
    ];
    $('chips').innerHTML = rows.map(function (r) {
      return '<div class="chip"><i>' + r[0] + '</i><b>' + r[1] + '</b></div>';
    }).join('');
  }

  // -------------------------------------------------------------- controls

  function syncBirthOptions() {
    const sel = $('birth');
    const want = ['all', 'edge'].concat(primes.slice(2).map(String));   // folds from 5 up
    if (sel._built === want.join(',')) { sel.value = state.birth; return; }
    sel._built = want.join(',');
    sel.innerHTML = want.map(function (v) {
      const label = v === 'all' ? 'all lineages'
        : v === 'edge' ? 'the eternal edge'
          : 'natal@' + v;
      return '<option value="' + v + '">' + label + '</option>';
    }).join('');
    if (want.indexOf(state.birth) < 0) state.birth = 'all';
    sel.value = state.birth;
  }

  function syncLabels() {
    syncBirthOptions();
    $('kLabel').textContent = primes.length <= 8
      ? primes.join(' ')
      : primes.slice(0, 3).join(' ') + ' … ' + primes[primes.length - 1];
    $('zLabel').textContent = state.z + ' px';
    $('hLabel').textContent = state.h + ' px';
    $('startLabel').textContent = fmt(Math.round(state.start));
    $('mRows').classList.toggle('on', state.mode === 'rows');
    $('mStack').classList.toggle('on', state.mode === 'stack');
    $('modeNote').textContent = state.mode === 'rows'
      ? 'Rows are fixed: 2 owns the bottom row and the largest stacked prime owns the top one, at every position on screen, so a row can be read across. With 2, 3, 5 stacked, a number struck only by 5 is one block three rows tall, one struck by 2 and 5 is two rows of 5 over one row of 2, and one struck by all three is a single row of each. The skyline is the largest stacked prime dividing each number.'
      : 'Each striking prime contributes one block, piled from the baseline with the smallest at the bottom. A column is as tall as the count of stacked primes dividing that number, so the skyline is how heavily composite each position is rather than which prime is largest.';
    [['tHoles', 'holes'], ['tTwins', 'twins'], ['tTile', 'tile'],
      ['tFrontier', 'frontier'], ['tNums', 'nums'], ['tMirror', 'mirror'],
      ['tGap', 'gapmark']].forEach(function (p) {
      $(p[0]).classList.toggle('on', state[p[1]]);
    });
  }

  function refresh() { syncLabels(); writeUrl(); draw(); }

  function setStartRange() {
    // Wide enough to reach anything in the tile, including a largest gap that
    // sits deep in the period.
    const cap = isFinite(width) ? Math.max(width * 2, frontier * 2, 2000) : 1e7;
    $('start').max = Math.round(Math.min(cap, 1e9));
    $('start').value = Math.min(state.start, +$('start').max);
  }

  function bind() {
    $('k').value = state.k;
    const setK = function (n) {
      const clamped = Math.min(+$('k').max, Math.max(+$('k').min, n));
      if (clamped === state.k) return;
      state.k = clamped; $('k').value = clamped;
      recompute(); setStartRange(); refresh();
    };
    $('k').addEventListener('input', function () { setK(+$('k').value); });
    $('kPrev').addEventListener('click', function () { setK(state.k - 1); });
    $('kNext').addEventListener('click', function () { setK(state.k + 1); });
    $('z').value = state.z;
    $('z').addEventListener('input', function () { state.z = +$('z').value; refresh(); });
    $('h').value = state.h;
    $('h').addEventListener('input', function () { state.h = +$('h').value; refresh(); });
    $('start').addEventListener('input', function () { state.start = +$('start').value; refresh(); });

    const step = function (delta) { jump(Math.max(0, Math.round(state.start) + delta)); };
    $('prev').addEventListener('click', function (e) { step(e.shiftKey ? -10 : -1); });
    $('next').addEventListener('click', function (e) { step(e.shiftKey ? 10 : 1); });
    window.addEventListener('keydown', function (e) {
      if (e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowLeft') { step(e.shiftKey ? -10 : -1); e.preventDefault(); }
      if (e.key === 'ArrowRight') { step(e.shiftKey ? 10 : 1); e.preventDefault(); }
      if (e.key === 'ArrowDown') { setK(state.k - 1); e.preventDefault(); }
      if (e.key === 'ArrowUp') { setK(state.k + 1); e.preventDefault(); }
    });

    $('birth').addEventListener('change', function () { state.birth = $('birth').value; refresh(); });
    $('mRows').addEventListener('click', function () { state.mode = 'rows'; refresh(); });
    $('mStack').addEventListener('click', function () { state.mode = 'stack'; refresh(); });

    $('jOrigin').addEventListener('click', function () { jump(0); });
    $('jFrontier').addEventListener('click', function () {
      jump(Math.max(0, frontier - Math.floor($('line').clientWidth / state.z / 2)));
    });
    $('jMirror').addEventListener('click', function () {
      if (!isFinite(width)) return;
      jump(Math.max(0, width / 2 - Math.floor($('line').clientWidth / state.z / 2)));
    });
    $('jSeam').addEventListener('click', function () {
      if (!isFinite(width)) return;
      jump(Math.max(0, width - Math.floor($('line').clientWidth / state.z / 2)));
    });
    $('jGap').addEventListener('click', jumpToLargestGap);

    [['tHoles', 'holes'], ['tTwins', 'twins'], ['tTile', 'tile'],
      ['tFrontier', 'frontier'], ['tNums', 'nums'], ['tMirror', 'mirror'],
      ['tGap', 'gapmark']].forEach(function (p) {
      $(p[0]).addEventListener('click', function () { state[p[1]] = !state[p[1]]; refresh(); });
    });

    // Drag to pan.
    const c = $('line');
    let dragging = false, x0 = 0, s0 = 0;
    c.addEventListener('mousedown', function (e) {
      dragging = true; x0 = e.clientX; s0 = state.start; c.classList.add('drag');
    });
    window.addEventListener('mouseup', function () { dragging = false; c.classList.remove('drag'); });
    window.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      state.start = Math.max(0, s0 - (e.clientX - x0) / state.z);
      setStartRange(); $('start').value = Math.round(state.start);
      syncLabels(); draw();
    });
    c.addEventListener('mousemove', function (e) {
      if (dragging) return;
      const r = c.getBoundingClientRect();
      describe(view.first + Math.floor((e.clientX - r.left) / state.z));
    });
    c.addEventListener('mouseleave', function () {
      $('hover').innerHTML = '<span class="none">move over the line</span>';
    });

    window.addEventListener('resize', draw);
  }

  function jump(n) { state.start = Math.max(0, n); setStartRange(); $('start').value = Math.round(state.start); refresh(); }

  /* Jump to the widest run in the whole tile with no slot in it: G_2 at this
   * level, and the object instrument 2 is about. Found by building the tile's
   * slot list, which is affordable to 23# (8 million slots) and not beyond.
   * Cached per level, since a rebuild at 23# costs about half a second. */
  const gapCache = {};
  function largestGapFacts() {
    const li = K.LEVEL_PRIMES.indexOf(primes[primes.length - 1]);
    if (li < 0 || li > K.LEVEL_PRIMES.indexOf(23)) return null;
    if (!gapCache[li]) {
      const tile = K.buildSlots(li, 2);
      const gaps = K.grain(tile);
      const big = K.largestGap(gaps);
      let ties = 0;
      for (let i = 0; i < gaps.length; i++) if (gaps[i] === big.size) ties++;
      gapCache[li] = { size: big.size, start: tile.slots[big.index], ties: ties, census: tile.census };
    }
    return gapCache[li];
  }
  // Size only, for the on-canvas marker. Null when the tile is too big to build.
  function gapSizeFor() {
    const f = largestGapFacts();
    return f ? f.size : null;
  }

  function jumpToLargestGap() {
    const hit = largestGapFacts();
    if (!hit) {
      $('hover').innerHTML = '<span class="none">The largest gap needs the whole ' +
        'tile built, which stops being affordable past 23#. Stack fewer primes.</span>';
      return;
    }
    state.gapmark = true;
    const visible = Math.floor($('line').clientWidth / state.z);
    jump(Math.max(0, Math.round(hit.start + hit.size / 2 - visible / 2)));
    $('hover').innerHTML = '<b>G₂ = ' + fmt(hit.size) + '</b> at the ' +
      primes[primes.length - 1] + '-tile. The run from ' + fmt(hit.start) + ' to ' +
      fmt(hit.start + hit.size) + ' holds no slot at all, out of ' + fmt(hit.census) +
      ' slots in the period.<br>' +
      (hit.ties > 1 ? hit.ties + ' gaps share this width; this is the first of them. '
        : 'It is the unique widest gap. ') +
      'That is ' + ((hit.start / width) * 100).toFixed(2) + '% of the way through the tile.';
  }

  function describe(n) {
    if (n < 0) return;
    const hits = strikesOn(n).map(function (i) { return primes[i]; });
    const hole = isHole(n), slot = isSlot(n);
    let s = '<b>' + fmt(n) + '</b> — ';
    if (n === 0) s += 'divisible by everything, the origin.';
    else if (hits.length) {
      s += 'struck by ' + hits.join(', ') +
        (hits.length === 1 && hits[0] === n ? ' (its own strike: the prime graduating)' : '') +
        '. Largest of them is ' + hits[hits.length - 1] + ', which sets the column height.';
    } else s += 'a hole: no stacked prime divides it.';
    if (slot) {
      const b = birthOf(n);
      s += '<br>Slot: ' + fmt(n) + ' and ' + fmt(n + 2) + ' are both holes' +
        (b === null ? ', and this is the eternal edge, the slot that is never born'
          : b === undefined ? '.'
            : ', born at fold ' + b) + '. ' +
        ((n + 2) < frontier
          ? 'Below the frontier, so (' + fmt(n) + ', ' + fmt(n + 2) + ') is a real twin prime pair.'
          : 'Past the frontier, so a later prime can still kill it.');
    } else if (hole) {
      s += '<br>Hole, but ' + fmt(n + 2) + ' is struck, so no slot here.';
    }
    $('hover').innerHTML = s;
  }

  // ------------------------------------------------------------------ boot

  readUrl();
  recompute();
  setStartRange();
  bind();
  refresh();
})();
