/* primeoire bench — instrument 3: the dimension of a hole.
 *
 * The box reading of OBSERVATIONS.md entry 5: a number is k-dimensional when
 * Omega(n) >= k, so the dimension of n is Omega(n) and a prime is
 * one-dimensional. This colours the tile's holes by dimension.
 *
 * The structural fact the instrument is built around: every hole of the tile
 * at level p has all its prime factors above p, so the first hole of dimension
 * k sits exactly at p_next^k. Those are the ignition points.
 */
(function () {
  'use strict';

  const K = window.Kernel;
  const $ = function (id) { return document.getElementById(id); };
  const fmt = function (n) { return n.toLocaleString('en-US'); };

  // Index is the dimension. 0 is only ever n = 1. Dimension 1 gets the hero
  // colour, because those holes are the primes.
  const DIMS = ['#2f3b5c', '#f0b429', '#ff6b6b', '#b98cff', '#4dd8e0', '#7fd4a8', '#fdba74', '#7c89a5'];
  const dimColour = function (d) { return DIMS[Math.min(d, DIMS.length - 1)]; };

  const MIN_LEVEL = 2;                                   // T5
  const MAX_LEVEL = K.LEVEL_PRIMES.indexOf(19);          // 9.7M, the render cap

  const state = { level: 5, all: true, at: 0, span: 2000 };

  let data = null;   // { p, pNext, width, holes, omega, byDim, allByDim, depth, ignition }

  // ------------------------------------------------------------- url state

  function readUrl() {
    const q = new URLSearchParams(location.hash.slice(1));
    if (q.has('level')) state.level = Math.min(MAX_LEVEL, Math.max(MIN_LEVEL, +q.get('level')));
    if (q.has('at')) state.at = Math.max(0, +q.get('at'));
    if (q.has('span')) state.span = Math.max(200, +q.get('span'));
    if (q.has('all')) state.all = q.get('all') === '1';
  }
  function writeUrl() {
    const q = new URLSearchParams();
    q.set('level', state.level); q.set('at', Math.round(state.at));
    q.set('span', state.span); q.set('all', state.all ? 1 : 0);
    history.replaceState(null, '', '#' + q.toString());
  }

  // -------------------------------------------------------------- compute

  function compute() {
    const t0 = performance.now();
    $('status').textContent = 'building…';

    const p = K.LEVEL_PRIMES[state.level];
    const pNext = K.LEVEL_PRIMES[state.level + 1];
    const width = K.widthAt(state.level);
    const omega = K.omegaUpTo(width);
    const holes = K.buildHoles(state.level);

    const byDim = [], allByDim = [], firstAt = [];
    let depth = 0, holeCount = 0;
    for (let n = 1; n < width; n++) {
      const d = omega[n];
      allByDim[d] = (allByDim[d] || 0) + 1;
      if (holes[n]) {
        holeCount++;
        byDim[d] = (byDim[d] || 0) + 1;
        if (firstAt[d] === undefined) firstAt[d] = n;
        if (d > depth) depth = d;
      }
    }

    const ignition = [];
    for (let k = 2; Math.pow(pNext, k) < width; k++) ignition.push({ k: k, at: Math.pow(pNext, k) });

    data = {
      p: p, pNext: pNext, width: width, omega: omega, holes: holes,
      byDim: byDim, allByDim: allByDim, firstAt: firstAt,
      depth: depth, holeCount: holeCount, ignition: ignition
    };

    $('status').textContent =
      'T' + p + ', width ' + fmt(width) + ', ' + fmt(holeCount) + ' holes, dimensions 1 to ' +
      depth + ', built in ' + Math.round(performance.now() - t0) + ' ms. ' +
      'The first two-dimensional hole is ' + fmt(pNext) + '² = ' + fmt(pNext * pNext) +
      (firstAt[2] === pNext * pNext ? ', as predicted.' : ', which does NOT match the prediction.');

    $('at').max = Math.max(0, width - state.span);
    if (state.at > +$('at').max) state.at = 0;
    $('at').value = Math.round(state.at);
    $('span').max = Math.min(20000, width);
  }

  // -------------------------------------------------------------- drawing

  function fitCanvas(c) {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (!c._cssH) c._cssH = +c.getAttribute('height');
    const w = c.clientWidth, h = c._cssH;
    c.width = w * dpr; c.height = h * dpr;
    c.style.height = h + 'px';
    const ctx = c.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    return { ctx: ctx, w: w, h: h };
  }

  /* Stacked shares by dimension, position on a log scale. `onlyHoles` picks
   * which population is counted. */
  function drawSpectrum(canvasId, onlyHoles) {
    const g = fitCanvas($(canvasId)), ctx = g.ctx, W = g.w, H = g.h;
    const padL = 30, padB = 26, padT = 8;
    const plotW = W - padL - 8, plotH = H - padB - padT;

    const BINS = Math.max(60, Math.floor(plotW / 3));
    const lo = Math.log(2), hi = Math.log(data.width);
    const counts = [];
    for (let b = 0; b < BINS; b++) counts.push(new Float64Array(data.depth + 2));

    for (let n = 2; n < data.width; n++) {
      if (onlyHoles && !data.holes[n]) continue;
      const b = Math.min(BINS - 1, Math.floor(((Math.log(n) - lo) / (hi - lo)) * BINS));
      const d = Math.min(data.omega[n], data.depth + 1);
      counts[b][d]++;
    }

    const bw = plotW / BINS;
    for (let b = 0; b < BINS; b++) {
      let total = 0;
      for (let d = 0; d < counts[b].length; d++) total += counts[b][d];
      if (!total) continue;
      let y = padT + plotH;
      for (let d = 1; d < counts[b].length; d++) {
        const hgt = (counts[b][d] / total) * plotH;
        if (hgt <= 0) continue;
        ctx.fillStyle = dimColour(d);
        ctx.fillRect(padL + b * bw, y - hgt, Math.max(1, bw + .5), hgt);
        y -= hgt;
      }
    }

    // Ignition points, and the frontier.
    ctx.font = '9.5px ui-monospace, monospace';
    const xOf = function (v) { return padL + ((Math.log(v) - lo) / (hi - lo)) * plotW; };
    data.ignition.forEach(function (ig) {
      const x = xOf(ig.at);
      ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, padT); ctx.lineTo(x, padT + plotH); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255,255,255,.65)';
      ctx.fillText(' ' + data.pNext + '^' + ig.k, x + 2, padT + 10 + (ig.k % 2) * 11);
    });

    ctx.fillStyle = '#7c89a5';
    ctx.fillText('100%', 2, padT + 8);
    ctx.fillText('0', 2, padT + plotH);
    ctx.fillText('2', padL, padT + plotH + 14);
    ctx.textAlign = 'right';
    ctx.fillText(fmt(data.width), W - 8, padT + plotH + 14);
    ctx.textAlign = 'left';
  }

  function drawStrip() {
    const g = fitCanvas($('strip')), ctx = g.ctx, W = g.w, H = g.h;
    const at = Math.round(state.at), span = state.span;
    const scale = W / span;

    for (let i = 0; i < span; i++) {
      const n = at + i;
      if (n < 1 || n >= data.width) continue;
      const x = i * scale;
      if (!data.holes[n]) {
        ctx.fillStyle = '#141c2e';
        ctx.fillRect(x, H - 14, Math.max(1, scale), 6);
      } else {
        const d = data.omega[n];
        ctx.fillStyle = dimColour(d);
        const h = 12 + d * 12;
        ctx.fillRect(x, H - 20 - h, Math.max(1, scale), h);
      }
    }

    ctx.fillStyle = '#7c89a5'; ctx.font = '10px ui-monospace, monospace';
    ctx.fillText(fmt(at), 2, H - 2);
    ctx.textAlign = 'right'; ctx.fillText(fmt(at + span), W - 2, H - 2);
    ctx.textAlign = 'left';
  }

  function drawChips() {
    const d = data;
    const ones = d.byDim[1] || 0, twos = d.byDim[2] || 0;
    const rows = [
      ['tile', 'T' + d.p],
      ['width p#', fmt(d.width)],
      ['holes', fmt(d.holeCount)],
      ['deepest hole', d.depth + 'D'],
      ['1D holes (primes)', fmt(ones)],
      ['2D holes', fmt(twos)],
      ['1D share', ((ones / d.holeCount) * 100).toFixed(1) + '%'],
      ['1D vs 2D', ones > twos ? 'primes lead' : 'primes overtaken'],
      ['first 2D hole', fmt(d.pNext) + '² = ' + fmt(d.pNext * d.pNext)]
    ];
    $('chips').innerHTML = rows.map(function (r) {
      return '<div class="chip"><i>' + r[0] + '</i><b>' + r[1] + '</b></div>';
    }).join('');
  }

  function drawKey() {
    let s = '<b style="color:#d7dee9">dimension</b> &nbsp;';
    for (let d = 1; d <= data.depth; d++) {
      s += '<span class="sw"><i style="background:' + dimColour(d) + '"></i>' + d + 'D' +
        (d === 1 ? ' (prime)' : d === 2 ? ' (a rectangle)' : '') + '</span>';
    }
    $('dimKey').innerHTML = s;
  }

  function drawTable() {
    const d = data;
    let allTotal = 0;
    for (let k = 0; k < d.allByDim.length; k++) allTotal += (d.allByDim[k] || 0);
    const rows = [];
    for (let k = 1; k <= d.depth; k++) {
      const hc = d.byDim[k] || 0, ac = d.allByDim[k] || 0;
      rows.push('<tr>' +
        '<td><span class="sw"><i style="background:' + dimColour(k) + '"></i>' + k + 'D</span></td>' +
        '<td>' + fmt(hc) + '</td>' +
        '<td>' + ((hc / d.holeCount) * 100).toFixed(2) + '%</td>' +
        '<td>' + fmt(ac) + '</td>' +
        '<td>' + ((ac / allTotal) * 100).toFixed(2) + '%</td>' +
        '<td>' + (d.firstAt[k] !== undefined ? fmt(d.firstAt[k]) : '—') +
        (k >= 2 && d.firstAt[k] === Math.pow(d.pNext, k) ? ' = ' + d.pNext + '^' + k : '') +
        '</td></tr>');
    }
    $('table').querySelector('tbody').innerHTML = rows.join('');
  }

  function drawJumps() {
    const b = [];
    b.push('<button data-jump="0">origin</button>');
    data.ignition.forEach(function (ig) {
      b.push('<button data-jump="' + ig.at + '">' + data.pNext + '^' + ig.k + '</button>');
    });
    $('ignitionJumps').innerHTML = b.join('');
    $('ignitionJumps').querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = +btn.getAttribute('data-jump');
        state.at = Math.max(0, Math.min(data.width - state.span, target - state.span / 4));
        $('at').value = Math.round(state.at);
        $('atLabel').textContent = fmt(Math.round(state.at));
        writeUrl(); drawStrip();
      });
    });
  }

  function drawAll() {
    drawChips(); drawKey();
    drawSpectrum('specHoles', true);
    if (state.all) drawSpectrum('specAll', false);
    else fitCanvas($('specAll'));
    drawStrip(); drawTable(); drawJumps();
  }

  // -------------------------------------------------------------- controls

  function syncLabels() {
    $('levelLabel').textContent = 'T' + K.LEVEL_PRIMES[state.level];
    $('atLabel').textContent = fmt(Math.round(state.at));
    $('spanLabel').textContent = fmt(state.span);
    $('tAll').classList.toggle('on', state.all);
  }

  function refresh(recompute) {
    syncLabels(); writeUrl();
    if (recompute) compute();
    drawAll();
  }

  function bind() {
    const lv = $('level');
    lv.min = MIN_LEVEL; lv.max = MAX_LEVEL; lv.value = state.level;
    const setLevel = function (n) {
      const c = Math.min(MAX_LEVEL, Math.max(MIN_LEVEL, n));
      if (c === state.level) return;
      state.level = c; lv.value = c; state.at = 0;
      $('levelLabel').textContent = 'T' + K.LEVEL_PRIMES[c];
      $('status').textContent = 'building…';
      setTimeout(function () { refresh(true); }, 0);
    };
    lv.addEventListener('input', function () { setLevel(+lv.value); });
    $('lPrev').addEventListener('click', function () { setLevel(state.level - 1); });
    $('lNext').addEventListener('click', function () { setLevel(state.level + 1); });

    $('tAll').addEventListener('click', function () { state.all = !state.all; refresh(false); });

    $('at').addEventListener('input', function () {
      state.at = +$('at').value; $('atLabel').textContent = fmt(state.at); writeUrl(); drawStrip();
    });
    $('span').addEventListener('input', function () {
      state.span = +$('span').value; $('spanLabel').textContent = fmt(state.span);
      $('at').max = Math.max(0, data.width - state.span);
      writeUrl(); drawStrip();
    });

    window.addEventListener('resize', drawAll);
  }

  readUrl();
  bind();
  refresh(true);
})();
