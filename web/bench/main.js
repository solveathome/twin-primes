/* primeoire bench — instrument 1: the grain census.
 *
 * Ugly on purpose. Every knob exposed, every picture exportable as numbers,
 * every state in the URL. Built on kernel.js, which is verified against the
 * repo's committed values by test-kernel.js.
 */
(function () {
  'use strict';

  const K = window.Kernel;
  const $ = function (id) { return document.getElementById(id); };
  const fmt = function (n) { return n.toLocaleString('en-US'); };

  // Level 1 is T3. Above 23 the slot list stops fitting in a browser.
  const MIN_LEVEL = 1, MAX_LEVEL = K.LEVEL_PRIMES.indexOf(23);

  const state = {
    level: 5,          // index into K.LEVEL_PRIMES; 5 is T13
    d: 2,
    top: 10,
    holes: true, seams: true, mirror: true,
    wordAt: 0
  };

  let tile = null, gaps = null, census = null, prevCensus = null, hot = [], holes = null;

  // ------------------------------------------------------------- url state

  function readUrl() {
    const h = new URLSearchParams(location.hash.slice(1));
    if (h.has('level')) state.level = Math.min(MAX_LEVEL, Math.max(MIN_LEVEL, +h.get('level')));
    if (h.has('d')) state.d = Math.max(2, +h.get('d') - (+h.get('d') % 2));
    if (h.has('top')) state.top = +h.get('top');
    ['holes', 'seams', 'mirror'].forEach(function (k) {
      if (h.has(k)) state[k] = h.get(k) === '1';
    });
  }
  function writeUrl() {
    const h = new URLSearchParams();
    h.set('level', state.level); h.set('d', state.d); h.set('top', state.top);
    ['holes', 'seams', 'mirror'].forEach(function (k) { h.set(k, state[k] ? 1 : 0); });
    history.replaceState(null, '', '#' + h.toString());
  }

  // -------------------------------------------------------------- compute

  function compute() {
    const t0 = performance.now();
    $('status').textContent = 'folding…';

    tile = K.buildSlots(state.level, state.d);
    gaps = K.grain(tile);
    census = K.grainCensus(gaps);
    hot = state.top > 0 ? K.topGaps(tile, gaps, state.top) : [];
    holes = state.holes ? K.buildHoles(state.level) : null;

    // The previous level, for the per-fold multiplier column and the ghost bars.
    if (state.level > MIN_LEVEL) {
      const pt = K.buildSlots(state.level - 1, state.d);
      prevCensus = K.grainCensus(K.grain(pt));
    } else {
      prevCensus = null;
    }

    const ms = Math.round(performance.now() - t0);
    const sum = gaps.reduce(function (a, b) { return a + b; }, 0);
    $('status').textContent =
      'T' + tile.level + ', width ' + fmt(tile.width) + ', ' + fmt(tile.census) +
      ' slots, ' + census.length + ' distinct gap sizes, computed in ' + ms + ' ms. ' +
      'Gaps sum to ' + fmt(sum) + (sum === tile.width ? ' = the width.' : ' — MISMATCH.') +
      (state.d === 2 ? '  ' + checkKnownLaws() : '');
  }

  /* The two exact laws proved in research/grain-census.js, checked live at
   * whatever level is on screen. If either ever fails, the fold engine and the
   * CRT identity disagree and one of them is wrong. */
  function checkKnownLaws() {
    const by = new Map(census.map(function (r) { return [r.size, r.count]; }));
    const c6 = by.get(6) || 0, c12 = by.get(12) || 0;
    let product = 1;
    for (let i = 0; i <= state.level; i++) {
      const q = K.LEVEL_PRIMES[i];
      if (q >= 5) product *= (q - 4);
    }
    let sixSix = 0;
    for (let i = 0; i < gaps.length; i++) if (gaps[i] === 6 && gaps[(i + 1) % gaps.length] === 6) sixSix++;
    const a = c6 === product, b = 8 * c6 === 3 * c12, c = sixSix === 0;
    return 'Known laws: count(6) = prod(q-4) ' + (a ? 'holds' : 'FAILS') +
      ', 8*count(6) = 3*count(12) ' + (b ? 'holds' : 'FAILS') +
      ', no adjacent 6,6 ' + (c ? 'holds' : 'FAILS') + '.';

    const maxStart = Math.max(0, gaps.length - 1);
    $('wordAt').max = maxStart;
    if (state.wordAt > maxStart) state.wordAt = 0;
    $('wordAt').value = state.wordAt;
  }

  // -------------------------------------------------------------- drawing

  function fitCanvas(c) {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    // Capture the CSS height once: assigning c.height writes the attribute back,
    // so re-reading it after a resize would compound the scaling.
    if (!c._cssH) c._cssH = +c.getAttribute('height');
    const w = c.clientWidth, h = c._cssH;
    c.width = w * dpr; c.height = h * dpr;
    c.style.height = h + 'px';
    const ctx = c.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    return { ctx: ctx, w: w, h: h };
  }

  function drawTile() {
    const c = $('tile'), g = fitCanvas(c), ctx = g.ctx, W = g.w, H = g.h;
    const pad = 6, top = pad, bot = H - 22, band = bot - top;

    // Slot density per pixel column.
    const buckets = new Float64Array(W);
    const s = tile.slots, scale = W / tile.width;
    for (let i = 0; i < s.length; i++) buckets[Math.min(W - 1, (s[i] * scale) | 0)]++;
    let maxB = 0;
    for (let i = 0; i < W; i++) if (buckets[i] > maxB) maxB = buckets[i];

    const mean = tile.census / W;
    // Once a pixel holds many slots the absolute view saturates to a solid
    // block and hides everything. Past that point plot the deviation from the
    // mean instead, which is where positional structure actually lives.
    const deviation = mean > 8;
    const mid = (top + bot) / 2;

    if (deviation) {
      let maxDev = 1e-9;
      for (let i = 0; i < W; i++) {
        const dv = Math.abs(buckets[i] / mean - 1);
        if (dv > maxDev) maxDev = dv;
      }
      ctx.strokeStyle = '#33405f';
      ctx.beginPath(); ctx.moveTo(0, mid + .5); ctx.lineTo(W, mid + .5); ctx.stroke();
      for (let i = 0; i < W; i++) {
        const dv = buckets[i] / mean - 1;
        const h = (dv / maxDev) * (band / 2);
        ctx.fillStyle = dv >= 0 ? '#f0b429' : '#9b6bff';   // violet, not the seam blue
        if (h >= 0) ctx.fillRect(i, mid - h, 1, Math.max(1, h));
        else ctx.fillRect(i, mid, 1, Math.max(1, -h));
      }
      ctx.fillStyle = '#7c89a5'; ctx.font = '10px ui-monospace, monospace';
      ctx.fillText('+' + (maxDev * 100).toFixed(2) + '% vs mean', 3, top + 9);
      ctx.fillText('-' + (maxDev * 100).toFixed(2) + '%', 3, bot - 2);
    } else {
      // Holes and slots share one scale, so a slot bar being a third of a hole
      // bar means there really are a third as many. Normalising each to its own
      // maximum, which is the obvious thing to write, makes the two heights
      // incomparable and the picture a lie.
      let ref = maxB;
      let hb = null;
      if (holes) {
        hb = new Float64Array(W);
        for (let i = 0; i < holes.length; i++) if (holes[i]) hb[Math.min(W - 1, (i * scale) | 0)]++;
        for (let i = 0; i < W; i++) if (hb[i] > ref) ref = hb[i];
      }
      if (hb) {
        ctx.fillStyle = '#2f3b5c';
        for (let i = 0; i < W; i++) {
          const v = (hb[i] / ref) * band;
          ctx.fillRect(i, bot - v, 1, v);
        }
      }
      ctx.fillStyle = '#f0b429';
      for (let i = 0; i < W; i++) {
        const v = (buckets[i] / ref) * band;
        if (v > 0) ctx.fillRect(i, bot - v, 1, Math.max(1, v));
      }
      ctx.fillStyle = '#7c89a5'; ctx.font = '10px ui-monospace, monospace';
      ctx.fillText(ref + ' per pixel = full height', 3, top + 9);
    }

    if (state.seams) {
      const sm = K.seams(tile);
      if (sm.length <= 600) {
        ctx.strokeStyle = 'rgba(91,141,239,.55)'; ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < sm.length; i++) {
          const x = Math.round(sm[i] * scale) + .5;
          ctx.moveTo(x, top); ctx.lineTo(x, bot);
        }
        ctx.stroke();
      }
    }

    if (state.mirror) {
      ctx.strokeStyle = 'rgba(215,222,233,.5)'; ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(W / 2, top - 2); ctx.lineTo(W / 2, bot + 4);
      ctx.stroke(); ctx.setLineDash([]);
    }

    // Highlighted gaps, drawn as spans so a wide gap is visibly wide.
    ctx.fillStyle = 'rgba(255,107,107,.85)';
    for (let i = 0; i < hot.length; i++) {
      const x = hot[i].start * scale;
      const w = Math.max(1.5, hot[i].size * scale);
      ctx.fillRect(x, bot + 3, w, 5);
    }

    ctx.fillStyle = '#7c89a5'; ctx.font = '10px ui-monospace, monospace';
    ctx.fillText('0', 0, H - 4);
    ctx.textAlign = 'right'; ctx.fillText(fmt(tile.width), W, H - 4);
    ctx.textAlign = 'center'; ctx.fillText('width/2', W / 2, H - 4);
    ctx.textAlign = 'left';

    $('tileNote').textContent = deviation
      ? '  — ' + (tile.census / W).toFixed(0) + ' slots per pixel, so this plots deviation from the mean, not density'
      : (holes ? '' : '  (holes not drawn: width above the ' + fmt(K.HOLE_CAP) + ' render cap)');
  }

  function drawHist() {
    const c = $('hist'), g = fitCanvas(c), ctx = g.ctx, W = g.w, H = g.h;
    const padL = 34, padB = 26, padT = 10, plotW = W - padL - 8, plotH = H - padB - padT;

    let maxShare = 0;
    census.forEach(function (r) { if (r.share > maxShare) maxShare = r.share; });
    if (prevCensus) prevCensus.forEach(function (r) { if (r.share > maxShare) maxShare = r.share; });

    const n = census.length;
    const bw = plotW / n;
    const prevBySize = new Map();
    if (prevCensus) prevCensus.forEach(function (r) { prevBySize.set(r.size, r); });

    ctx.strokeStyle = '#1e2942'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(padL, padT + plotH + .5); ctx.lineTo(W - 8, padT + plotH + .5); ctx.stroke();

    for (let i = 0; i < n; i++) {
      const r = census[i], x = padL + i * bw;
      const pr = prevBySize.get(r.size);
      if (pr) {
        const ph = (pr.share / maxShare) * plotH;
        ctx.fillStyle = 'rgba(124,137,165,.28)';
        ctx.fillRect(x + 1, padT + plotH - ph, bw - 2, ph);
      }
      const h = (r.share / maxShare) * plotH;
      ctx.fillStyle = pr ? '#f0b429' : '#7fd4a8';   // green = a size that is new at this fold
      ctx.fillRect(x + bw * .18, padT + plotH - h, bw * .64, h);

      if (bw > 22) {
        ctx.fillStyle = '#7c89a5'; ctx.font = '9.5px ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(r.size, x + bw / 2, padT + plotH + 12);
      }
    }
    ctx.textAlign = 'left';
    ctx.fillStyle = '#7c89a5'; ctx.font = '9.5px ui-monospace, monospace';
    ctx.fillText((maxShare * 100).toFixed(1) + '%', 2, padT + 8);
    ctx.fillText('0', 2, padT + plotH);
    if (bw <= 22) ctx.fillText(census[0].size + ' … ' + census[n - 1].size, padL, padT + plotH + 14);
  }

  function drawWord() {
    const c = $('word'), g = fitCanvas(c), ctx = g.ctx, W = g.w, H = g.h;
    const padB = 18, plotH = H - padB - 8;
    const colW = 3;
    const count = Math.min(gaps.length, Math.floor(W / colW));
    const start = Math.min(state.wordAt, Math.max(0, gaps.length - count));

    let maxG = 0;
    for (let i = start; i < start + count; i++) if (gaps[i] > maxG) maxG = gaps[i];

    for (let i = 0; i < count; i++) {
      const v = gaps[start + i];
      const h = (v / maxG) * plotH;
      // Colour by gap size in units of d, so the texture is readable.
      const step = v / state.d;
      const hue = (step * 37) % 360;
      ctx.fillStyle = 'hsl(' + hue + ' 62% ' + (36 + Math.min(30, step * 2)) + '%)';
      ctx.fillRect(i * colW, 8 + plotH - h, colW - 1, h);
    }

    ctx.fillStyle = '#7c89a5'; ctx.font = '10px ui-monospace, monospace';
    ctx.fillText('gap ' + fmt(start) + ' … ' + fmt(start + count - 1) +
      '   of ' + fmt(gaps.length) + '   tallest here ' + maxG, 2, H - 5);
  }

  function drawTable() {
    const tb = $('table').querySelector('tbody');
    const prevBySize = new Map();
    if (prevCensus) prevCensus.forEach(function (r) { prevBySize.set(r.size, r); });

    tb.innerHTML = census.map(function (r) {
      const pr = prevBySize.get(r.size);
      const mult = pr ? (r.count / pr.count) : null;
      return '<tr>' +
        '<td>' + r.size + '</td>' +
        '<td>' + fmt(r.count) + '</td>' +
        '<td>' + (r.share * 100).toFixed(3) + '%</td>' +
        '<td>' + (pr ? fmt(pr.count) : '<span class="new">new</span>') + '</td>' +
        '<td>' + (mult === null ? '—' : '<span class="grew">' + mult.toFixed(4) + '</span>') + '</td>' +
        '<td>' + (r.size / state.d) + '</td>' +
        '</tr>';
    }).join('');
  }

  function drawChips() {
    const big = K.largestGap(gaps);
    const prevP = K.LEVEL_PRIMES[state.level - 1];
    const c = [
      ['tile', 'T' + tile.level],
      ['width', fmt(tile.width)],
      ['slots', fmt(tile.census)],
      ['G_' + state.d, fmt(big.size)],
      ['largest at', fmt(tile.slots[big.index])],
      ['as % of width', ((tile.slots[big.index] / tile.width) * 100).toFixed(2) + '%'],
      ['distinct sizes', census.length],
      ['mean gap', (tile.width / tile.census).toFixed(2)],
      ['G/mean', (big.size / (tile.width / tile.census)).toFixed(3)],
      ['fold multiplier', prevP ? '×' + (state.d % K.LEVEL_PRIMES[state.level] === 0
        ? K.LEVEL_PRIMES[state.level] - 1 : K.LEVEL_PRIMES[state.level] - 2) : '—']
    ];
    $('chips').innerHTML = c.map(function (r) {
      return '<div class="chip"><i>' + r[0] + '</i><b>' + r[1] + '</b></div>';
    }).join('');
  }

  function drawAll() {
    drawChips(); drawTile(); drawHist(); drawWord(); drawTable();
  }

  // -------------------------------------------------------------- controls

  function syncLabels() {
    $('levelLabel').textContent = 'T' + K.LEVEL_PRIMES[state.level];
    $('dLabel').textContent = state.d;
    $('wordLabel').textContent = fmt(state.wordAt);
    ['holes', 'seams', 'mirror'].forEach(function (k) {
      $('t' + k[0].toUpperCase() + k.slice(1)).classList.toggle('on', state[k]);
    });
  }

  function refresh(recompute) {
    syncLabels(); writeUrl();
    if (recompute) compute();
    drawAll();
  }

  function bind() {
    const lv = $('level');
    lv.min = MIN_LEVEL; lv.max = MAX_LEVEL; lv.value = state.level;
    lv.addEventListener('input', function () {
      state.level = +lv.value; state.wordAt = 0;
      $('levelLabel').textContent = 'T' + K.LEVEL_PRIMES[state.level];
      $('status').textContent = 'folding…';
      setTimeout(function () { refresh(true); }, 0);
    });

    const dd = $('d');
    dd.value = state.d;
    dd.addEventListener('input', function () {
      state.d = +dd.value; state.wordAt = 0;
      $('dLabel').textContent = state.d;
      setTimeout(function () { refresh(true); }, 0);
    });

    $('top').value = String(state.top);
    $('top').addEventListener('change', function () {
      state.top = +$('top').value;
      hot = state.top > 0 ? K.topGaps(tile, gaps, state.top) : [];
      refresh(false);
    });

    [['tHoles', 'holes'], ['tSeams', 'seams'], ['tMirror', 'mirror']].forEach(function (p) {
      $(p[0]).addEventListener('click', function () {
        state[p[1]] = !state[p[1]];
        if (p[1] === 'holes') { holes = state.holes ? K.buildHoles(state.level) : null; }
        refresh(false);
      });
    });

    $('wordAt').addEventListener('input', function () {
      state.wordAt = +$('wordAt').value;
      $('wordLabel').textContent = fmt(state.wordAt);
      drawWord();
    });

    let playing = null;
    $('play').addEventListener('click', function () {
      if (playing) { clearInterval(playing); playing = null; $('play').textContent = '▶ fold up'; return; }
      $('play').textContent = '■ stop';
      state.level = MIN_LEVEL;
      playing = setInterval(function () {
        if (state.level >= MAX_LEVEL - 1) { clearInterval(playing); playing = null; $('play').textContent = '▶ fold up'; }
        else { state.level++; }
        $('level').value = state.level;
        state.wordAt = 0;
        refresh(true);
      }, 900);
    });

    $('copyUrl').addEventListener('click', function () {
      navigator.clipboard.writeText(location.href);
      $('copyUrl').textContent = 'copied';
      setTimeout(function () { $('copyUrl').textContent = 'copy link'; }, 1200);
    });

    document.querySelectorAll('[data-export]').forEach(function (b) {
      b.addEventListener('click', function () { doExport(b.getAttribute('data-export')); });
    });

    window.addEventListener('resize', function () { drawAll(); });
  }

  // ---------------------------------------------------------------- export

  function doExport(kind) {
    let s = '';
    if (kind === 'census') {
      s = 'tile,offset,gap_size,count,share\n' + census.map(function (r) {
        return 'T' + tile.level + ',' + state.d + ',' + r.size + ',' + r.count + ',' + r.share;
      }).join('\n');
    } else if (kind === 'grain') {
      s = Array.from(gaps).join(',');
    } else if (kind === 'sizes') {
      s = census.map(function (r) { return r.size; }).join(',');
    } else if (kind === 'top') {
      s = 'rank,gap_size,starts_at,fraction_of_width\n' + hot.map(function (h, i) {
        return (i + 1) + ',' + h.size + ',' + h.start + ',' + (h.start / tile.width);
      }).join('\n');
    } else if (kind === 'slots') {
      s = Array.prototype.slice.call(tile.slots, 0, 5000).join(',');
    } else if (kind === 'ladder') {
      const rows = ['tile,width,slots,G_' + state.d + ',distinct_sizes,largest_at'];
      for (let i = MIN_LEVEL; i <= MAX_LEVEL; i++) {
        const t = K.buildSlots(i, state.d), gg = K.grain(t), b = K.largestGap(gg);
        rows.push('T' + t.level + ',' + t.width + ',' + t.census + ',' + b.size + ',' +
          K.grainCensus(gg).length + ',' + t.slots[b.index]);
      }
      s = rows.join('\n');
    }
    $('out').value = s;
    $('out').select();
    try { navigator.clipboard.writeText(s); } catch (e) { /* selection is enough */ }
  }

  // -------------------------------------------------------------- selftest

  function selfTest() {
    const el = $('selftest');
    try {
      const t7 = K.buildSlots(K.LEVEL_PRIMES.indexOf(7), 2);
      const g7 = Array.from(K.grain(t7)).join(',');
      const want7 = '6,12,12,18,12,30,6,30,12,18,12,12,6,12,12';
      const t11 = K.buildSlots(K.LEVEL_PRIMES.indexOf(11), 2);
      const c11 = K.grainCensus(K.grain(t11)).map(function (r) { return r.size + 'x' + r.count; }).join(' ');
      const want11 = '6x21 12x56 18x22 24x6 30x22 36x4 42x4';
      const houses = Array.from(K.buildSlots(K.LEVEL_PRIMES.indexOf(5), 2).slots).join(',');
      const ok = g7 === want7 && c11 === want11 && houses === '11,17,29';
      el.textContent = ok
        ? 'kernel checks out against the glossary (T7 grain, T11 census, the three houses).'
        : 'KERNEL MISMATCH against the glossary. Do not trust anything below.';
      el.className = ok ? 'pass' : 'fail';
    } catch (e) {
      el.textContent = 'kernel error: ' + e.message;
      el.className = 'fail';
    }
  }

  // ------------------------------------------------------------------ boot

  readUrl();
  selfTest();
  bind();
  refresh(true);
})();
