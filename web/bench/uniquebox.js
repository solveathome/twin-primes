/* primeoire bench — instrument 4: the unique box.
 *
 * The stricter reading of OBSERVATIONS.md entry 5a: n is a k-box number when
 * exactly one unordered set of k factors, each at least 2, multiplies to n.
 * PROVEN there, that set is {Omega(n) = k} union {p^(k+1)}.
 *
 * So every hole has a unique-box class equal to its Omega, except the prime
 * powers, which qualify at both Omega and Omega-1 because identical factors
 * leave no choice about how to group them. Those are the entire disagreement
 * with instrument 3, and this instrument is built to make them visible.
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
    const powers = K.primePowersUpTo(width);
    const holes = K.buildHoles(state.level);

    const byDim = [], allByDim = [], firstAt = [], ppByDim = [];
    const ppHoles = [];
    let depth = 0, holeCount = 0, ppCount = 0;
    for (let n = 1; n < width; n++) {
      const d = omega[n];
      allByDim[d] = (allByDim[d] || 0) + 1;
      if (holes[n]) {
        holeCount++;
        byDim[d] = (byDim[d] || 0) + 1;
        if (firstAt[d] === undefined) firstAt[d] = n;
        if (d > depth) depth = d;
        // A prime power with Omega >= 2 is a double member: it boxes uniquely
        // at d and again at d-1.
        if (powers[n] && d >= 2) {
          ppCount++;
          ppByDim[d] = (ppByDim[d] || 0) + 1;
          if (ppHoles.length < 40) ppHoles.push(n);
        }
      }
    }

    const ignition = [];
    for (let k = 2; Math.pow(pNext, k) < width; k++) ignition.push({ k: k, at: Math.pow(pNext, k) });

    data = {
      p: p, pNext: pNext, width: width, omega: omega, holes: holes,
      powers: powers, byDim: byDim, allByDim: allByDim, firstAt: firstAt,
      ppByDim: ppByDim, ppHoles: ppHoles, ppCount: ppCount,
      depth: depth, holeCount: holeCount, ignition: ignition
    };

    $('status').textContent =
      'T' + p + ', width ' + fmt(width) + ', ' + fmt(holeCount) + ' holes, dimensions 1 to ' +
      depth + ', built in ' + Math.round(performance.now() - t0) + ' ms. ' +
      fmt(ppCount) + ' of them are prime powers and so box uniquely at two ' +
      'different k, which is ' + ((ppCount / holeCount) * 100).toFixed(3) +
      '% of the holes. The first is ' + fmt(pNext) + '² = ' + fmt(pNext * pNext) +
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
    const counts = [], pp = [];
    for (let b = 0; b < BINS; b++) { counts.push(new Float64Array(data.depth + 2)); pp.push(new Float64Array(data.depth + 2)); }

    for (let n = 2; n < data.width; n++) {
      if (onlyHoles && !data.holes[n]) continue;
      const b = Math.min(BINS - 1, Math.floor(((Math.log(n) - lo) / (hi - lo)) * BINS));
      const d = Math.min(data.omega[n], data.depth + 1);
      counts[b][d]++;
      if (data.powers[n] && d >= 2) pp[b][d]++;
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
        // The double members sit at the top of their own band, in white, so a
        // vanishing share is still visible as a rim rather than disappearing.
        if (pp[b][d] > 0) {
          const ph = Math.max(1, (pp[b][d] / total) * plotH);
          ctx.fillStyle = 'rgba(255,255,255,.85)';
          ctx.fillRect(padL + b * bw, y - hgt, Math.max(1, bw + .5), ph);
        }
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
        const w = Math.max(1, scale);
        const h = 12 + d * 12;
        ctx.fillStyle = dimColour(d);
        ctx.fillRect(x, H - 20 - h, w, h);
        if (data.powers[n] && d >= 2) {          // a double member
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(x, H - 20 - h, w, 4);
        }
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
      ['k=1 share', ((ones / d.holeCount) * 100).toFixed(1) + '%'],
      ['double members', fmt(d.ppCount)],
      ['double share', ((d.ppCount / d.holeCount) * 100).toFixed(3) + '%'],
      ['first double', fmt(d.pNext) + '² = ' + fmt(d.pNext * d.pNext)]
    ];
    $('chips').innerHTML = rows.map(function (r) {
      return '<div class="chip"><i>' + r[0] + '</i><b>' + r[1] + '</b></div>';
    }).join('');
  }

  function drawKey() {
    let s = '<b style="color:#d7dee9">unique-box class</b> &nbsp;';
    for (let d = 1; d <= data.depth; d++) {
      s += '<span class="sw"><i style="background:' + dimColour(d) + '"></i>k = ' + d +
        (d === 1 ? ' (prime)' : d === 2 ? ' (one rectangle)' : '') + '</span>';
    }
    s += '<span class="sw"><i style="background:#ffffff"></i>also boxes at k−1 (a prime power)</span>';
    $('dimKey').innerHTML = s;
  }

  function drawTable() {
    const d = data;
    let allTotal = 0;
    for (let k = 0; k < d.allByDim.length; k++) allTotal += (d.allByDim[k] || 0);
    const rows = [];
    for (let k = 1; k <= d.depth; k++) {
      const hc = d.byDim[k] || 0, ac = d.allByDim[k] || 0;
      const pc = d.ppByDim[k] || 0;
      rows.push('<tr>' +
        '<td><span class="sw"><i style="background:' + dimColour(k) + '"></i>k = ' + k + '</span></td>' +
        '<td>' + fmt(hc) + '</td>' +
        '<td>' + ((hc / d.holeCount) * 100).toFixed(2) + '%</td>' +
        '<td>' + (pc ? fmt(pc) : '—') + '</td>' +
        '<td>' + fmt(ac) + '</td>' +
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

  function drawDoubles() {
    const d = data;
    if (!d.ppCount) { $('doubles').textContent = 'none at this level.'; return; }
    const list = d.ppHoles.map(function (n) {
      return '<span class="sw" style="margin-right:10px"><b style="color:#fff">' + fmt(n) +
        '</b> <span style="color:#7c89a5">k=' + d.omega[n] + ' and ' + (d.omega[n] - 1) + '</span></span>';
    }).join('');
    $('doubles').innerHTML =
      '<div style="margin-bottom:6px">' + fmt(d.ppCount) + ' of ' + fmt(d.holeCount) +
      ' holes, ' + ((d.ppCount / d.holeCount) * 100).toFixed(3) + '%. Every one is q^e for a ' +
      'prime q above ' + d.p + ', because a hole has no small factors and a double member has ' +
      'only one distinct prime.</div>' + list +
      (d.ppCount > d.ppHoles.length ? '<span style="color:#7c89a5">… first ' + d.ppHoles.length + ' shown</span>' : '');
  }

  function drawAll() {
    drawChips(); drawKey(); drawDoubles();
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
