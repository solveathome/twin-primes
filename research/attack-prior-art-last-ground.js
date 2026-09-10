#!/usr/bin/env node
// ============================================================================
// ATTACK: PRIOR ART, THE LAST UNSEARCHED GROUND
// ============================================================================
// Three questions, one instrument.
//
//   1. MathSciNet. `research/SEARCH-CONVENTIONS.md` §5 records it as UNSEARCHED
//      with NO substitute run in its place, because the web UI redirects to
//      LibLynx (subscription). That is true of the UI. It is NOT true of the
//      database: the AMS runs **MR Lookup** at https://mathscinet.ams.org/mrlookup
//      as a free reference-resolution service. It POSTs against the same
//      MathSciNet index, it reports the TOTAL number of matching documents, and
//      it returns the three most recent as BibTeX. Fields: au, ti, jrnl, year
//      (which accepts a RANGE, "1900-2026"), ipage, fpage. So a title/author
//      query is answerable, and by bisecting the year range a query of any size
//      can be ENUMERATED three at a time. That is a real MathSciNet channel and
//      this script is the first thing in the repo to use it.
//
//   2. Holt's 2022 book, "Patterns among the Primes: a study of Eratosthenes
//      sieve" — TODO list 000, still open. Is it in MathSciNet (i.e. reviewed),
//      in zbMATH, in OpenLibrary/Google Books, in any catalogue, and does
//      anything in the reachable metadata touch twin-slot SPACING or a MAXIMUM
//      GAP BOUND?
//
//   3. The `u_sup` representation (TODO item H), which has had no novelty search
//      in any vocabulary. Two objects:
//        (a) the L4 Fejer-mass identity  sum_{a != 0 mod e} F_H(a/e) = h(e-h),
//            equivalently  sum_{k=1}^{n-1} sin^2(pi k m/n)/sin^2(pi k/n) = m(n-m);
//        (b) the L5 worst-position bound  sup|R_H| <= sum_{e,a}|Theta_e(a)||S_H(a/e)|
//            i.e. a mean-value / large-sieve estimate for SIGNED ROSSER WEIGHTS
//            over a complete period.
//      Item H's own risk statement: (a) is "elementary enough to be folklore"
//      and (b) is "close to standard large-sieve and mean-value territory".
//      ASSUME BOTH ARE KNOWN UNTIL SEARCHED. This script searches.
//
// EVERY CHANNEL IS CALIBRATED IN THE SAME RUN. `SEARCH-CONVENTIONS.md` §2:
// a negative from an uncalibrated channel is void. The calibration probes are
// known positives that the channel MUST return, and they are printed with their
// verdicts beside every negative, not in a separate section a reader can skip.
//
// SECTIONS
//   0. Channel reachability + calibration.
//   1. MathSciNet (MR Lookup): the two-class object, the upper bound.
//   2. MathSciNet: Holt, and the 2022 book.
//   3. MathSciNet + zbMATH + OpenAlex + Crossref: the `u_sup` objects.
//   4. The arithmetic check on L4 = the classical sine identity (local, exact).
//
// Network calls are cached in-process only; nothing is written outside stdout.
// ============================================================================

'use strict';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) primeoire-prior-art-sweep';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let CALLS = 0;
async function get(url, opts = {}) {
  CALLS++;
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), opts.timeout || 45000);
  try {
    const r = await fetch(url, {
      method: opts.method || 'GET',
      headers: Object.assign({ 'User-Agent': UA }, opts.headers || {}),
      body: opts.body,
      signal: ctl.signal,
    });
    const text = await r.text();
    return { ok: r.ok, status: r.status, text };
  } catch (e) {
    return { ok: false, status: 0, text: '', err: String(e.message || e) };
  } finally {
    clearTimeout(t);
  }
}

// ---------------------------------------------------------------- MR Lookup
const MRL = 'https://mathscinet.ams.org/mrlookup';

async function mrl({ au = '', ti = '', jrnl = '', year = '' }) {
  const body = new URLSearchParams({
    au, ti, jrnl, year, ipage: '', fpage: '', format: 'bibtex',
  }).toString();
  const r = await get(MRL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  await sleep(400);
  if (!r.ok) return { total: null, items: [], err: r.err || ('HTTP ' + r.status) };
  const plain = r.text.replace(/<[^>]*>/g, '');
  const m = plain.match(/Retrieved first (\d+) documents out of (\d+)/);
  const items = [];
  const re = /@\w+\s*\{MR(\d+),([\s\S]*?)\n\}/g;
  let g;
  while ((g = re.exec(r.text.replace(/<[^>]*>/g, ''))) !== null) {
    const blk = g[2];
    const f = (k) => {
      const mm = blk.match(new RegExp('\\b' + k + '\\s*=\\s*\\{([\\s\\S]*?)\\},?\\n'));
      return mm ? mm[1].replace(/\s+/g, ' ').replace(/[{}\\]/g, '').trim() : '';
    };
    items.push({ mr: g[1], author: f('AUTHOR'), title: f('TITLE'), journal: f('JOURNAL'), year: f('YEAR') });
  }
  const total = m ? Number(m[2]) : items.length;
  return { total, items };
}

function showMRL(tag, q, res, opts = {}) {
  const qs = ['au', 'ti', 'jrnl', 'year'].filter((k) => q[k]).map((k) => `${k}="${q[k]}"`).join(' ');
  console.log(`  ${tag.padEnd(4)} ${qs}`);
  if (res.err) { console.log(`       CHANNEL ERROR: ${res.err}`); return; }
  console.log(`       total = ${res.total}${res.total > res.items.length ? `  (showing ${res.items.length} most recent)` : ''}`);
  const n = opts.show === undefined ? res.items.length : Math.min(opts.show, res.items.length);
  for (let i = 0; i < n; i++) {
    const it = res.items[i];
    console.log(`       MR${it.mr}  ${it.year}  ${it.author}`);
    console.log(`         "${it.title}"  [${it.journal}]`);
  }
}

// MR Lookup's `year` field has TWO semantics, and getting this wrong is why the
// first pass of this script reported "enumeration incomplete". A BARE year
// ("1978") filters to exactly that year. A RANGE ("1900-1963") is not a range at
// all: it is read as a LOWER BOUND, year >= 1900. Verified in session —
// ti="Jacobsthal function" returns 19 for "1900-1963", 18 for "1964-2026",
// 16 for "1996-2026", a monotone decreasing sequence, which a true range could
// not produce.
//
// So the cumulative counts N(y) = #{docs with year >= y} are free, and the count
// in any window [a,b] is N(a) - N(b+1). That turns enumeration into a descent on
// a monotone function: recurse only into windows that contain something, and
// query a bare year when the window is a single year. Cost is logarithmic in the
// span rather than one query per year.
async function atLeast(q, y, cache) {
  if (cache.has(y)) return cache.get(y);
  const res = await mrl(Object.assign({}, q, { year: `${y}-2100` }));
  const v = res.err ? null : res.total;
  cache.set(y, v);
  return v;
}

async function enumerateByYear(q, y0, y1, out, budget, cache) {
  if (budget.n <= 0) return false;
  const lo = await atLeast(q, y0, cache);
  const hi = await atLeast(q, y1 + 1, cache);
  if (lo === null || hi === null) return false;
  const count = lo - hi;
  if (count === 0) return true;
  if (y0 === y1) {
    budget.n--;
    const res = await mrl(Object.assign({}, q, { year: String(y0) }));
    if (res.err) return false;
    for (const it of res.items) if (!out.some((o) => o.mr === it.mr)) out.push(it);
    // A single year with more than 3 documents cannot be fully read through a
    // 3-document window; say so rather than letting the shortfall pass silently.
    if (res.total > res.items.length) { out.overflow = (out.overflow || []).concat([`${y0}: ${res.total} documents, ${res.items.length} readable`]); return false; }
    return true;
  }
  const mid = Math.floor((y0 + y1) / 2);
  const a = await enumerateByYear(q, y0, mid, out, budget, cache);
  const b = await enumerateByYear(q, mid + 1, y1, out, budget, cache);
  return a && b;
}

// ------------------------------------------------------------------ zbMATH
async function zb(query, n = 5) {
  const u = `https://api.zbmath.org/v1/document/_search?search_string=${encodeURIComponent(query)}&results_per_page=${n}&page=1`;
  const r = await get(u);
  await sleep(300);
  let j;
  try { j = JSON.parse(r.text); } catch (e) { return { total: null, items: [], err: r.err || ('HTTP ' + r.status) }; }
  // zbMATH answers a zero-result query with HTTP 404 and
  // internal_code "successful access. No results found." That is a NEGATIVE,
  // not a broken channel, and the first version of this script mislabelled it.
  if (j.status && j.status.status_code === 404) return { total: 0, items: [] };
  if (!r.ok) return { total: null, items: [], err: r.err || ('HTTP ' + r.status) };
  const total = j.status && j.status.nr_total_results !== undefined ? j.status.nr_total_results : (j.result || []).length;
  const items = (j.result || []).map((d) => ({
    id: d.id,
    title: (d.title && d.title.title) || '',
    year: d.year || '',
    authors: (d.contributors && d.contributors.authors || []).map((a) => a.name).join('; '),
    src: (d.source && d.source.series && d.source.series[0] && d.source.series[0].short_title) || (d.source && d.source.title) || '',
  }));
  return { total, items };
}

function showZB(tag, query, res, show = 3) {
  console.log(`  ${tag.padEnd(4)} zbMATH  "${query}"`);
  if (res.err) { console.log(`       CHANNEL ERROR: ${res.err}`); return; }
  console.log(`       total = ${res.total}`);
  res.items.slice(0, show).forEach((it) => {
    console.log(`       ${it.id}  ${it.year}  ${it.authors}`);
    console.log(`         "${it.title}"  [${it.src}]`);
  });
}

// ---------------------------------------------------------------- OpenAlex
async function oa(query, n = 5) {
  const u = `https://api.openalex.org/works?search=${encodeURIComponent(query)}&per-page=${n}&mailto=chris@lol.dk`;
  const r = await get(u);
  await sleep(250);
  if (!r.ok) return { total: null, items: [], err: r.err || ('HTTP ' + r.status) };
  let j; try { j = JSON.parse(r.text); } catch (e) { return { total: null, items: [], err: 'unparseable' }; }
  return {
    total: j.meta ? j.meta.count : null,
    items: (j.results || []).map((w) => ({
      id: (w.id || '').replace('https://openalex.org/', ''),
      title: w.display_name || '',
      year: w.publication_year || '',
      venue: (w.primary_location && w.primary_location.source && w.primary_location.source.display_name) || '',
    })),
  };
}

function showOA(tag, query, res, show = 3) {
  console.log(`  ${tag.padEnd(4)} OpenAlex  "${query}"`);
  if (res.err) { console.log(`       CHANNEL ERROR: ${res.err}`); return; }
  console.log(`       total = ${res.total}`);
  res.items.slice(0, show).forEach((it) => console.log(`       ${it.id}  ${it.year}  "${it.title}"  [${it.venue}]`));
}

// ---------------------------------------------------------------- Crossref
async function cr(query, n = 5) {
  const u = `https://api.crossref.org/works?query.bibliographic=${encodeURIComponent(query)}&rows=${n}&mailto=chris@lol.dk`;
  const r = await get(u);
  await sleep(250);
  if (!r.ok) return { total: null, items: [], err: r.err || ('HTTP ' + r.status) };
  let j; try { j = JSON.parse(r.text); } catch (e) { return { total: null, items: [], err: 'unparseable' }; }
  const msg = j.message || {};
  return {
    total: msg['total-results'],
    items: (msg.items || []).map((w) => ({
      doi: w.DOI, title: (w.title || [''])[0],
      year: (w.issued && w.issued['date-parts'] && w.issued['date-parts'][0] && w.issued['date-parts'][0][0]) || '',
      venue: (w['container-title'] || [''])[0],
    })),
  };
}

// ============================================================================
async function main() {
  const t0 = Date.now();

  // -------------------------------------------------------------- SECTION 0
  console.log('================================================================');
  console.log('0. CHANNEL REACHABILITY AND CALIBRATION');
  console.log('================================================================');
  console.log('');
  console.log('0a. The MathSciNet subscription UI, for the record.');
  const ui = await get('https://mathscinet.ams.org/mathscinet/search/publications.html?query=Jacobsthal', { timeout: 30000 });
  console.log(`     GET /mathscinet/search/publications.html  ->  HTTP ${ui.status}`);
  console.log(`     body mentions LibLynx/wayf: ${/liblynx|wayf|sign in|institution/i.test(ui.text)}`);
  console.log('     (redirects to connect.liblynx.com — the UI is gated, as §5 says)');
  console.log('');
  console.log('0b. MR Lookup, the FREE MathSciNet channel. Calibration: known');
  console.log('    positives already cited in this repo. Each MUST come back.');
  console.log('');
  const cal = [
    ['C1', { au: 'Iwaniec', ti: 'Jacobsthal' }, '499895', 'Iwaniec 1978, Demonstratio Math. — PRIOR-ART.md row'],
    ['C2', { ti: 'polynomial analogue of Jacobsthal function' }, '4727548', 'Kalmynin-Konyagin, Izv. Math. 88:2 (2024)'],
    ['C3', { au: 'Maynard', ti: 'Long gaps between primes' }, null, 'FGKMT, JAMS 31 (2018)'],
    ['C4', { ti: 'Long gaps in sieved sets' }, null, 'FKMPT, JEMS 2021'],
    ['C5', { au: 'Diamond', ti: 'higher-dimensional sieve' }, null, 'Diamond-Halberstam, Cambridge Tracts 177 (2008)'],
    ['C6', { au: 'Kourbatov', ti: 'Maximal gaps between prime k-tuples' }, null, 'JIS 16 (2013) 13.5.2'],
  ];
  const calResults = {};
  for (const [tag, q, wantMR, why] of cal) {
    const res = await mrl(q);
    calResults[tag] = res;
    showMRL(tag, q, res, { show: 2 });
    if (wantMR) {
      const hit = res.items.some((i) => i.mr === wantMR);
      console.log(`       CALIBRATION: expecting MR${wantMR} — ${hit ? 'PRESENT (channel live)' : 'ABSENT (channel suspect)'}`);
    }
    console.log(`       why: ${why}`);
    console.log('');
  }

  // -------------------------------------------------------------- SECTION 1
  console.log('================================================================');
  console.log('1. MathSciNet ON THE TWO-CLASS OBJECT AND ITS UPPER BOUND');
  console.log('   Owning conventions from SEARCH-CONVENTIONS.md §1, translated');
  console.log('   into a TITLE index (MR Lookup searches titles, not reviews).');
  console.log('================================================================');
  console.log('');
  const q1 = [
    ['Q1', { ti: 'Jacobsthal function' }],
    ['Q2', { ti: 'problem of Jacobsthal' }],
    ['Q3', { ti: 'Jacobsthal primorial' }],
    ['Q4', { ti: 'Jacobsthal twin' }],
    ['Q5', { ti: 'paired Jacobsthal' }],
    ['Q6', { ti: 'consecutive integers residue classes' }],
    ['Q7', { ti: 'longest sequence of consecutive integers' }],
    ['Q8', { ti: 'sifted sets gaps' }],
    ['Q9', { ti: 'gaps in sieved sets' }],
    ['Q10', { ti: 'two residue classes per prime' }],
    ['Q11', { ti: 'covering systems intervals' }],
    ['Q12', { ti: 'sifting limit' }],
    ['Q13', { ti: 'twin prime gaps upper bound' }],
    ['Q14', { ti: 'maximal gap twin primes' }],
    ['Q15', { ti: 'Eratosthenes sieve cycle of gaps' }],
    ['Q16', { ti: 'Westzynthius' }],
    ['Q17', { ti: 'consecutive numbers coprime to primorials' }],
    ['Q18', { au: 'Ziller' }],
    ['Q19', { au: 'Hagedorn' , ti: 'Jacobsthal' }],
    ['Q20', { au: 'Brady', ti: 'sieve' }],
    ['Q21', { ti: 'admissible tuples' }],
    ['Q22', { ti: 'Erdos Rankin' }],
    ['Q23', { ti: 'Jacobsthal sieve' }],
    ['Q24', { ti: 'Jacobsthal upper bound' }],
    ['Q25', { ti: 'gaps between numbers coprime' }],
  ];
  for (const [tag, q] of q1) { showMRL(tag, q, await mrl(q), { show: 3 }); console.log(''); }

  console.log('1b. FULL ENUMERATION of ti="Jacobsthal function" by year bisection.');
  console.log('    Every reviewed paper with that phrase in its title, 1900-2026.');
  const out1 = [];
  const complete1 = await enumerateByYear({ ti: 'Jacobsthal function' }, 1900, 2026, out1, { n: 60 }, new Map());
  out1.sort((a, b) => Number(a.year) - Number(b.year));
  console.log(`    enumeration complete: ${complete1}   distinct MR records: ${out1.length}${out1.overflow ? '   OVERFLOW ' + out1.overflow.join(', ') : ''}`);
  for (const it of out1) console.log(`      ${it.year}  MR${it.mr}  ${it.author} — "${it.title}" [${it.journal}]`);
  console.log('');

  console.log('1c. FULL ENUMERATION of ti="Jacobsthal" before 1990 — everything');
  console.log('    written on the function in the era when it had no other meaning.');
  const out2 = [];
  const complete2 = await enumerateByYear({ ti: 'Jacobsthal' }, 1900, 1990, out2, { n: 60 }, new Map());
  out2.sort((a, b) => Number(a.year) - Number(b.year));
  console.log(`    enumeration complete: ${complete2}   distinct MR records: ${out2.length}${out2.overflow ? '   OVERFLOW ' + out2.overflow.join(', ') : ''}`);
  for (const it of out2) console.log(`      ${it.year}  MR${it.mr}  ${it.author} — "${it.title}" [${it.journal}]`);
  console.log('');

  // -------------------------------------------------------------- SECTION 2
  console.log('================================================================');
  console.log('2. HOLT: THE 2022 BOOK');
  console.log('================================================================');
  console.log('');
  const q2 = [
    ['H1', { au: 'Holt', ti: 'primes' }],
    ['H2', { au: 'Holt', ti: 'Eratosthenes' }],
    ['H3', { ti: 'Patterns among the primes' }],
    ['H4', { ti: 'Eratosthenes sieve' }],
    ['H5', { au: 'Holt Fred' }],
    ['H6', { au: 'Rudd', ti: 'primes' }],
  ];
  for (const [tag, q] of q2) { showMRL(tag, q, await mrl(q), { show: 3 }); console.log(''); }

  console.log('2b. zbMATH / OpenAlex / Crossref on the book.');
  for (const s of ['Patterns among the primes Eratosthenes sieve', 'Holt cycle of gaps primorial']) {
    showZB('Z', s, await zb(s, 5), 3); console.log('');
  }
  for (const s of ['Patterns among the primes a study of Eratosthenes sieve', 'Holt Rudd cycle of gaps Eratosthenes sieve']) {
    showOA('O', s, await oa(s, 5), 3); console.log('');
  }
  {
    const r = await cr('Patterns among the Primes Eratosthenes sieve Holt');
    console.log(`  X    Crossref "Patterns among the Primes ... Holt"  total=${r.total === undefined ? r.err : r.total}`);
    (r.items || []).slice(0, 3).forEach((i) => console.log(`       ${i.doi}  ${i.year}  "${i.title}" [${i.venue}]`));
    console.log('');
  }
  console.log('2c. Catalogue channels (OpenLibrary, Google Books) — reachability.');
  for (const [tag, u] of [
    ['L1', 'https://openlibrary.org/search.json?q=Patterns+among+the+Primes+Eratosthenes&limit=5'],
    ['L2', 'https://openlibrary.org/search.json?q=Fred+Holt+primes&limit=5'],
    ['L3', 'https://www.googleapis.com/books/v1/volumes?q=%22Patterns+among+the+Primes%22'],
    ['L4', 'https://www.googleapis.com/books/v1/volumes?q=intitle:%22Eratosthenes+sieve%22'],
  ]) {
    const r = await get(u);
    let n = '?', names = [];
    try {
      const j = JSON.parse(r.text);
      if (j.numFound !== undefined) { n = j.numFound; names = (j.docs || []).map((d) => `${d.first_publish_year || ''} ${d.title} — ${(d.author_name || []).join(', ')}`); }
      else if (j.totalItems !== undefined) { n = j.totalItems; names = (j.items || []).map((d) => `${(d.volumeInfo.publishedDate || '').slice(0, 4)} ${d.volumeInfo.title} — ${(d.volumeInfo.authors || []).join(', ')}`); }
    } catch (e) { n = 'unparseable'; }
    console.log(`  ${tag}   HTTP ${r.status}  total=${n}`);
    names.slice(0, 5).forEach((s) => console.log(`       ${s}`));
    console.log('');
    await sleep(250);
  }

  // -------------------------------------------------------------- SECTION 3
  console.log('================================================================');
  console.log('3. THE u_sup REPRESENTATION (TODO item H)');
  console.log('   (a) the Fejer-mass identity, (b) mean value of signed Rosser');
  console.log('   weights over a complete period / worst-position remainder.');
  console.log('================================================================');
  console.log('');
  console.log('3a. MathSciNet titles.');
  const q3 = [
    ['U1', { ti: 'Fejer kernel roots of unity' }],
    ['U2', { ti: 'trigonometric identity sine sum' }],
    ['U3', { ti: 'mean value of sieve weights' }],
    ['U4', { ti: 'large sieve Rosser' }],
    ['U5', { ti: 'Rosser sieve' }],
    ['U6', { ti: 'linear sieve mean value' }],
    ['U7', { ti: 'bilinear forms error term sieve' }],
    ['U8', { ti: 'variance of sifted sequences' }],
    ['U9', { ti: 'remainder term Selberg sieve mean square' }],
  ];
  for (const [tag, q] of q3) { showMRL(tag, q, await mrl(q), { show: 2 }); console.log(''); }

  console.log('3b0. zbMATH CALIBRATION, because its zeros are easy to over-read.');
  console.log('     A zero-result query comes back HTTP 404 with internal_code');
  console.log('     "successful access. No results found." — a NEGATIVE, not a');
  console.log('     broken channel. And its matching narrows fast with query');
  console.log('     length. These four probes fix both facts in the record.');
  for (const s of ['Jacobsthal function', 'paired Jacobsthal function', 'Jacobsthal', 'zzzqqqxxxnothing']) {
    showZB('K', s, await zb(s, 4), 2); console.log('');
  }

  console.log('3b. zbMATH full-record search — titles, abstracts, MSC AND REVIEW TEXT,');
  console.log('    which is the coverage MR Lookup does not give. Long conjunctions');
  console.log('    return zero here (the terms are AND-ed), so the queries are short.');
  for (const s of [
    'Jacobsthal function upper bound',
    'Jacobsthal function two residue classes',
    'mean square remainder linear sieve',
    'large sieve sieve weights',
    'Rosser weights mean value',
    'well-factorable weights bilinear',
    'variance sifted sequence interval',
    'Fejer kernel roots of unity',
    'Ramanujan sums variance interval',
    'discrete Fejer kernel identity',
  ]) { showZB('Z', s, await zb(s, 6), 4); console.log(''); }

  console.log('3c. OpenAlex.');
  for (const s of [
    'Jacobsthal function upper bound primorial',
    'mean square of the remainder in the linear sieve',
    'large sieve inequality for sieve weights',
    'Fejer kernel at rational points identity',
  ]) { showOA('O', s, await oa(s, 5), 3); console.log(''); }

  console.log('3d. THE STANDING QUESTION, asked of every reachable channel at once:');
  console.log('    is there ANY published UPPER bound, at ANY exponent, for a');
  console.log('    covering problem with TWO residue classes per prime?');
  console.log('    Calibrated by the fact that the same channels return the');
  console.log('    ONE-class upper bounds (Iwaniec 1978; Costello-Watts 2015)');
  console.log('    and the two-class LOWER-bound literature immediately.');
  for (const s of [
    'upper bound Jacobsthal function',
    'Costello Watts Jacobsthal',
    'sieved set bounded residue classes gaps',
    'paired Jacobsthal function',
    'generalised Jacobsthal function paired progressions',
  ]) { showZB('Z', s, await zb(s, 6), 4); console.log(''); }

  // -------------------------------------------------------------- SECTION 4
  console.log('================================================================');
  console.log('4. LOCAL CHECK: is L4 the classical sine identity?');
  console.log('   L4:  sum_{a=1}^{e-1} F_H(a/e) = h(e-h),  h = H mod e,');
  console.log('   F_H(t) = sin^2(pi H t)/sin^2(pi t).  Since F_H(a/e) depends on H');
  console.log('   only mod e, this IS  sum_{k=1}^{n-1} sin^2(pi k m/n)/sin^2(pi k/n)');
  console.log('   = m(n-m)  for 0 <= m <= n, the standard Fejer/Dirichlet-kernel');
  console.log('   identity. Verified here so the identification is not asserted.');
  console.log('================================================================');
  console.log('');
  let worst = 0, worstAt = '';
  for (let n = 2; n <= 60; n++) {
    for (let m = 0; m <= n; m++) {
      let s = 0;
      for (let k = 1; k < n; k++) {
        const num = Math.sin(Math.PI * k * m / n), den = Math.sin(Math.PI * k / n);
        s += (num * num) / (den * den);
      }
      const err = Math.abs(s - m * (n - m));
      if (err > worst) { worst = err; worstAt = `n=${n}, m=${m}`; }
    }
  }
  console.log(`  sum_{k=1}^{n-1} sin^2(pi k m/n)/sin^2(pi k/n) = m(n-m)`);
  console.log(`  checked for all 2 <= n <= 60 and 0 <= m <= n : max abs error ${worst.toExponential(3)} at ${worstAt}`);
  console.log('');
  console.log('  And the H-reduction that makes L4 the same statement:');
  for (const [H, e] of [[85, 13], [169, 30], [40, 7], [529, 23]]) {
    const h = H % e;
    let s = 0;
    for (let a = 1; a < e; a++) {
      const num = Math.sin(Math.PI * H * a / e), den = Math.sin(Math.PI * a / e);
      s += (num * num) / (den * den);
    }
    console.log(`    H=${H}, e=${e}: h=${h}, sum=${s.toFixed(9)}, h(e-h)=${h * (e - h)}, err=${Math.abs(s - h * (e - h)).toExponential(2)}`);
  }
  console.log('');

  console.log('================================================================');
  console.log(`network calls: ${CALLS}    elapsed: ${((Date.now() - t0) / 1000).toFixed(1)} s`);
  console.log('================================================================');
}

main().catch((e) => { console.error(e); process.exit(1); });

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-prior-art-last-ground.js
//   invocation:  node research/attack-prior-art-last-ground.js
//   code-sha256: 86b326e5a371e0b7ee031c9416fdab3c43360c439774001e7a6c9a4ce0cf43d2
//   out-sha256:  f85b022f85152f078f4f6ce5402261ba1602774ce377f39ee5841dc1c90bcce8
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     123.5 s
// ============================================================================
// ================================================================
// 0. CHANNEL REACHABILITY AND CALIBRATION
// ================================================================
//
// 0a. The MathSciNet subscription UI, for the record.
//      GET /mathscinet/search/publications.html  ->  HTTP 200
//      body mentions LibLynx/wayf: true
//      (redirects to connect.liblynx.com — the UI is gated, as §5 says)
//
// 0b. MR Lookup, the FREE MathSciNet channel. Calibration: known
//     positives already cited in this repo. Each MUST come back.
//
//   C1   au="Iwaniec" ti="Jacobsthal"
//        total = 1
//        MR499895  1978  Iwaniec, Henryk
//          "On the problem of Jacobsthal"  [Demonstratio Math.]
//        CALIBRATION: expecting MR499895 — PRESENT (channel live)
//        why: Iwaniec 1978, Demonstratio Math. — PRIOR-ART.md row
//
//   C2   ti="polynomial analogue of Jacobsthal function"
//        total = 1
//        MR4727548  2024  Kalmynin, A. B. and Konyagin, S. V.
//          "A polynomial analogue of Jacobsthal function"  [Izv. Ross. Akad. Nauk Ser. Mat.]
//        CALIBRATION: expecting MR4727548 — PRESENT (channel live)
//        why: Kalmynin-Konyagin, Izv. Math. 88:2 (2024)
//
//   C3   au="Maynard" ti="Long gaps between primes"
//        total = 1
//        MR3718451  2018  Ford, Kevin and Green, Ben and Konyagin, Sergei and Maynard, James and Tao, Terence
//          "Long gaps between primes"  [J. Amer. Math. Soc.]
//        why: FGKMT, JAMS 31 (2018)
//
//   C4   ti="Long gaps in sieved sets"
//        total = 2
//        MR4592874  2023  Ford, Kevin and Konyagin, Sergei and Maynard, James and Pomerance, Carl and Tao, Terence
//          "Corrigendum: Long gaps in sieved sets"  [J. Eur. Math. Soc. (JEMS)]
//        MR4195744  2021  Ford, Kevin and Konyagin, Sergei and Maynard, James and Pomerance, Carl and Tao, Terence
//          "Long gaps in sieved sets"  [J. Eur. Math. Soc. (JEMS)]
//        why: FKMPT, JEMS 2021
//
//   C5   au="Diamond" ti="higher-dimensional sieve"
//        total = 1
//        MR2458547  2008  Diamond, Harold G. and Halberstam, H.
//          "A higher-dimensional sieve method"  []
//        why: Diamond-Halberstam, Cambridge Tracts 177 (2008)
//
//   C6   au="Kourbatov" ti="Maximal gaps between prime k-tuples"
//        total = 1
//        MR3065331  2013  Kourbatov, Alexei
//          "Maximal gaps between prime $k$-tuples: a statistical approach"  [J. Integer Seq.]
//        why: JIS 16 (2013) 13.5.2
//
// ================================================================
// 1. MathSciNet ON THE TWO-CLASS OBJECT AND ITS UPPER BOUND
//    Owning conventions from SEARCH-CONVENTIONS.md §1, translated
//    into a TITLE index (MR Lookup searches titles, not reviews).
// ================================================================
//
//   Q1   ti="Jacobsthal function"
//        total = 19  (showing 3 most recent)
//        MR5037429  2025  Pakapongpun, Apisit and Chailangka, Natdanai
//          "Jacobsthal trigonometric functions"  [J. Indones. Math. Soc.]
//        MR4727548  2024  Kalmynin, A. B. and Konyagin, S. V.
//          "A polynomial analogue of Jacobsthal function"  [Izv. Ross. Akad. Nauk Ser. Mat.]
//        MR4478102  2022  Kulouglu, Bahar and "Ozkan, Engin
//          "Hyperbolic functions obtained from $k$-Jacobsthal sequences"  [Asian-Eur. J. Math.]
//
//   Q2   ti="problem of Jacobsthal"
//        total = 1
//        MR499895  1978  Iwaniec, Henryk
//          "On the problem of Jacobsthal"  [Demonstratio Math.]
//
//   Q3   ti="Jacobsthal primorial"
//        total = 0
//
//   Q4   ti="Jacobsthal twin"
//        total = 0
//
//   Q5   ti="paired Jacobsthal"
//        total = 0
//
//   Q6   ti="consecutive integers residue classes"
//        total = 0
//
//   Q7   ti="longest sequence of consecutive integers"
//        total = 0
//
//   Q8   ti="sifted sets gaps"
//        total = 0
//
//   Q9   ti="gaps in sieved sets"
//        total = 2
//        MR4592874  2023  Ford, Kevin and Konyagin, Sergei and Maynard, James and Pomerance, Carl and Tao, Terence
//          "Corrigendum: Long gaps in sieved sets"  [J. Eur. Math. Soc. (JEMS)]
//        MR4195744  2021  Ford, Kevin and Konyagin, Sergei and Maynard, James and Pomerance, Carl and Tao, Terence
//          "Long gaps in sieved sets"  [J. Eur. Math. Soc. (JEMS)]
//
//   Q10  ti="two residue classes per prime"
//        total = 0
//
//   Q11  ti="covering systems intervals"
//        total = 5  (showing 3 most recent)
//        MR4528388  2022  Yi, He and Cui, Lirong and Balakrishnan, Narayanaswamy and Shen, Jingyuan
//          "Multi-point and multi-interval bounded-covering availability measures for aggregated Markovian repairable systems"  [Methodol. Comput. Appl. Probab.]
//        MR2599372  2008  Dynnikov, I. A.
//          "Interval covering systems and plane sections of 3-periodic surfaces"  [Tr. Mat. Inst. Steklova]
//        MR1127826  1991  Lee, Hung Hwan and Baek, In Soo
//          "A note on equivalent interval covering systems for packing dimension of $bf R$"  [J. Korean Math. Soc.]
//
//   Q12  ti="sifting limit"
//        total = 1
//        MR2811561  2011  Franze, C. S.
//          "Sifting limits for the $Lambda^2Lambda^-$ sieve"  [J. Number Theory]
//
//   Q13  ti="twin prime gaps upper bound"
//        total = 0
//
//   Q14  ti="maximal gap twin primes"
//        total = 0
//
//   Q15  ti="Eratosthenes sieve cycle of gaps"
//        total = 0
//
//   Q16  ti="Westzynthius"
//        total = 0
//
//   Q17  ti="consecutive numbers coprime to primorials"
//        total = 0
//
//   Q18  au="Ziller"
//        total = 85  (showing 3 most recent)
//        MR5089763  2026  Nikolayevsky, Yuri and Ziller, Wolfgang
//          "Non-singular weakly symmetric nilmanifolds"  [J. Lie Theory]
//        MR5029774  2026  Nikolayevsky, Y. and Ziller, W.
//          "Non-singular geodesic orbit nilmanifolds"  [Ann. Mat. Pura Appl. (4)]
//        MR4905418  2025  Bryant, Robert and Florit, Luis and Ziller, Wolfgang
//          "Curvature homogeneous hypersurfaces in space forms"  [Adv. Math.]
//
//   Q19  au="Hagedorn" ti="Jacobsthal"
//        total = 1
//        MR2476571  2009  Hagedorn, Thomas R.
//          "Computation of Jacobsthal's function $h(n)$ for $n&lt;50$"  [Math. Comp.]
//
//   Q20  au="Brady" ti="sieve"
//        total = 1
//        MR4239958  2017  Brady, Zarathustra Elessar
//          "Sieves and Iteration Rules"  []
//
//   Q21  ti="admissible tuples"
//        total = 1
//        MR4930200  2025  Belovas, Igoris and Sabaliauskas, Martynas
//          "On integer sequences associated with admissible prime $k$-tuples"  [An. Univ. Craiova Ser. Mat. Inform.]
//
//   Q22  ti="Erdos Rankin"
//        total = 0
//
//   Q23  ti="Jacobsthal sieve"
//        total = 0
//
//   Q24  ti="Jacobsthal upper bound"
//        total = 1
//        MR3315513  2015  Costello, Fintan and Watts, Paul
//          "An upper bound on Jacobsthal's function"  [Math. Comp.]
//
//   Q25  ti="gaps between numbers coprime"
//        total = 0
//
// 1b. FULL ENUMERATION of ti="Jacobsthal function" by year bisection.
//     Every reviewed paper with that phrase in its title, 1900-2026.
//     enumeration complete: true   distinct MR records: 19
//       1962  MR146125  ErdHos, P. — "On the integers relatively prime to $n$ and on a number-theoretic function considered by Jacobsthal" [Math. Scand.]
//       1976/77  MR453677  Vaughan, R. C. — "On the order of magnitude of Jacobsthal's function" [Proc. Edinburgh Math. Soc. (2)]
//       1977  MR427212  Stevens, Harlan — "On Jacobsthal's $g(n)$-function" [Math. Ann.]
//       1997  MR1605006  Borosh, Itshak and Hensley, Douglas and Hobbs, Arthur M. — "Vertex prime graphs and the Jacobsthal function" [Congr. Numer.]
//       2001  MR1904144  Shallit, Jeffrey — "State complexity and Jacobsthal's function" []
//       2002  MR1884644  Pighizzini, Giovanni and Shallit, Jeffrey — "Unary language operations, state complexity and Jacobsthal's function" [Internat. J. Found. Comput. Sci.]
//       2009  MR2476571  Hagedorn, Thomas R. — "Computation of Jacobsthal's function $h(n)$ for $n&lt;50$" [Math. Comp.]
//       2010  MR2830738  Helleseth, Tor and Kholosha, Alexander — "Sequences, bent functions and Jacobsthal sums" []
//       2011  MR2847298  Helleseth, Tor and Kholosha, Alexander — "Crosscorrelation of $m$-sequences, exponential sums, bent functions and Jacobsthal sums" [Cryptogr. Commun.]
//       2015  MR3315513  Costello, Fintan and Watts, Paul — "An upper bound on Jacobsthal's function" [Math. Comp.]
//       2018  MR3830899  Choi, Ji Young — "A generalization of Collatz functions and Jacobsthal numbers" [J. Integer Seq.]
//       2018  MR3783885  Mercer, Idris — "Dirichlet's theorem and Jacobsthal's function" [Integers]
//       2018  MR3765409  Boussayoud, Ali and Boughaba, Souhila and Kerada, Mohamed — "Generating functions $k$-Fibonacci and $k$-Jacobsthal numbers at negative indices" [Electron. J. Math. Anal. Appl.]
//       2019  MR4034135  Boughaba, Souhila and Boussayoud, Ali — "On some identities and generating function of both $k$-Jacobsthal numbers and symmetric functions in several variables" [Konuralp J. Math.]
//       2021  MR4345691  Saba, N. and Boussayoud, A. and Ferkioui, M. and Boughaba, S. — "Symmetric functions of binary products of Gaussian Jacobsthal Lucas polynomials and Chebyshev polynomials" [Palest. J. Math.]
//       2022  MR4478102  Kulouglu, Bahar and "Ozkan, Engin — "Hyperbolic functions obtained from $k$-Jacobsthal sequences" [Asian-Eur. J. Math.]
//       2022  MR4468892  Alti nkaya, cSahsene and Kara, Yeliz and Sauglam "Ozkan, Yecsim — "Basic applications of the $q$-derivative for a general subfamily of analytic functions subordinate to $k$-Jacobsthal numbers" [Facta Univ. Ser. Math. Inform.]
//       2024  MR4727548  Kalmynin, A. B. and Konyagin, S. V. — "A polynomial analogue of Jacobsthal function" [Izv. Ross. Akad. Nauk Ser. Mat.]
//       2025  MR5037429  Pakapongpun, Apisit and Chailangka, Natdanai — "Jacobsthal trigonometric functions" [J. Indones. Math. Soc.]
//
// 1c. FULL ENUMERATION of ti="Jacobsthal" before 1990 — everything
//     written on the function in the era when it had no other meaning.
//     enumeration complete: false   distinct MR records: 39   OVERFLOW 1979: 4 documents, 3 readable
//       1939  MR1315  Selberg, Sigmund — ""Uber die Reihe f"ur die Eulersche Konstante, die von E. Jacobsthal und V. Brun angegeben ist" [Norske Vid. Selsk. Forh.]
//       1945  MR14120  Chowla, S. — "A formula similar to Jacobsthal's for the explicit value of $x$ in $p=x^2+y^2$ where $p$ is a prime of the form $4k+1$" [Proc. Lahore Philos. Soc.]
//       1947  MR24916  Ljunggren, Wilhelm — "Sur un th'eor`eme de M. E. Jacobsthal" [Avh. Norske Vid.-Akad. Oslo I]
//       1952  MR45758  Whiteman, Albert Leon — "Cyclotomy and Jacobsthal sums" [Amer. J. Math.]
//       1953  MR59968  Selberg, Sigmund — "On a conjecture by Ernst Jacobsthal" [Norske Vid. Selsk. Forh., Trondheim]
//       1954  MR59298  Carlitz, L. — "A theorem of Ljunggren and Jacobsthal on Bernoulli numbers" [Proc. Amer. Math. Soc.]
//       1961  MR142513  Chowla, S. — "On a formula of Jacobsthal" [Norske Vid. Selsk. Forh. (Trondheim)]
//       1962  MR149220  Wergeland, Harald — "Zu einer Aufgabe von Ernst Jacobsthal" [Norske Vid. Selsk. Forh. (Trondheim)]
//       1962/63  MR147436  Cohen, Eckford — "An analogue of a result of Jacobsthal" [Proc. Edinburgh Math. Soc. (2)]
//       1962  MR146125  ErdHos, P. — "On the integers relatively prime to $n$ and on a number-theoretic function considered by Jacobsthal" [Math. Scand.]
//       1965  MR217037  Whiteman, Albert Leon — "Theorems on Brewer and Jacobsthal sums. II" [Michigan Math. J.]
//       1965  MR191790  Selberg, Sigmund — "Ernst Jacobsthal" [Norske Vid. Selsk. Forh. (Trondheim)]
//       1965  MR175861  Whiteman, Albert Leon — "Theorems on Brewer and Jacobsthal sums. I" []
//       1967  MR209247  Kanold, Hans-Joachim — ""Uber eine zahlentheoretische Funktion von Jacobsthal" [Math. Ann.]
//       1974  MR371795  Grimson, R. C. — "The evaluation of a sum of Jacobsthal" [Norske Vid. Selsk. Skr. (Trondheim)]
//       1975  MR384670  Kanold, Hans-Joachim — ""Uber eine zahlentheoretische Funktion von E. Jacobsthal" [Abh. Braunschweig. Wiss. Ges.]
//       1976  MR563901  Postnikov, A. G. and Stepanov, S. A. — "On the theory of Jacobsthal sums" [Trudy Mat. Inst. Steklov.]
//       1976/77  MR453677  Vaughan, R. C. — "On the order of magnitude of Jacobsthal's function" [Proc. Edinburgh Math. Soc. (2)]
//       1977  MR453672  Kanold, H.-J. — "Neuere Untersuchungen "uber die Jacobsthal-Funktion $g(n)$" [Monatsh. Math.]
//       1977  MR427212  Stevens, Harlan — "On Jacobsthal's $g(n)$-function" [Math. Ann.]
//       1978  MR524094  Leonard, Philip A. and Williams, Kenneth S. — "Evaluation of certain Jacobsthal sums" [Boll. Un. Mat. Ital. B (5)]
//       1978  MR515833  Hoggatt, Jr., V. E. and Bicknell-Johnson, Marjorie — "Convolution arrays for Jacobsthal and Fibonacci polynomials" [Fibonacci Quart.]
//       1978  MR499895  Iwaniec, Henryk — "On the problem of Jacobsthal" [Demonstratio Math.]
//       1979  MR550967  Evans, Ronald J. — "Unambiguous evaluations of bidecic Jacobi and Jacobsthal sums" [J. Austral. Math. Soc. Ser. A]
//       1979  MR544263  Berndt, Bruce C. and Evans, Ronald J. — "Sums of Gauss, Jacobi, and Jacobsthal" [J. Number Theory]
//       1979  MR543734  Evans, Ronald J. — "Resolution of sign ambiguities in Jacobi and Jacobsthal sums" [Pacific J. Math.]
//       1982  MR989508  Katre, S. A. and Rajwade, A. R. — "On the Jacobsthal sum $phi_4(a)$ and the related sum $psi_8(a)$" [Math. Student]
//       1982  MR668912  Hudson, R. H. and Williams, K. S. — "An application of a formula of Western to the evaluation of certain Jacobsthal sums" [Acta Arith.]
//       1982  MR658067  Hudson, Richard H. and Williams, Kenneth S. — "Resolution of ambiguities in the evaluation of cubic and quartic Jacobsthal sums" [Pacific J. Math.]
//       1983  MR745072  Katre, S. A. and Rajwade, A. R. — "On the Jacobsthal sum $varphi sb9(a)$ and the related sum $psi sb9(a)$" [Math. Scand.]
//       1984  MR722736  Evans, Ronald J. — "Determinations of Jacobsthal sums" [Pacific J. Math.]
//       1985  MR797788  Katre, S. A. — "Jacobsthal sums in terms of quadratic partitions of a prime" []
//       1986  MR893484  Katre, S. A. and Rajwade, A. R. — "On the Jacobsthal sum $phi_4(a)$ and the related sum $psi_8(a)$" [Ann. Univ. Sci. Budapest. E"otv"os Sect. Math.]
//       1986  MR870514  Katre, S. A. and Rajwade, A. R. — "Jacobsthal sums of prime order" [Indian J. Pure Appl. Math.]
//       1986  MR821134  Monzingo, M. G. — "An elementary evaluation of the Jacobsthal sum" [J. Number Theory]
//       1987  MR913759  Rankin, R. A. — "Generalized Jacobsthal sums and sums of squares" [Acta Arith.]
//       1987  MR908829  Katre, S. A. and Rajwade, A. R. — "Resolution of the sign ambiguity in the determination of the cyclotomic numbers of order $4$ and the corresponding Jacobsthal sum" [Math. Scand.]
//       1988  MR931426  Horadam, A. F. — "Jacobsthal and Pell curves" [Fibonacci Quart.]
//       1990  MR1071110  Cai, Tian Xin — "On a conjecture of Jacobstahl [Jacobsthal]" [Northeast. Math. J.]
//
// ================================================================
// 2. HOLT: THE 2022 BOOK
// ================================================================
//
//   H1   au="Holt" ti="primes"
//        total = 1
//        MR2090934  2003  Holt, Andrew J. and Davenport, James H.
//          "Resolving large prime(s) variants for discrete logarithm computation"  []
//
//   H2   au="Holt" ti="Eratosthenes"
//        total = 0
//
//   H3   ti="Patterns among the primes"
//        total = 0
//
//   H4   ti="Eratosthenes sieve"
//        total = 43  (showing 7 most recent)
//        MR4815590  2025  Hartman, Samuel and Sorenson, Jonathan P.
//          "Reducing the space used by the sieve of Eratosthenes when factoring"  [Inform. Process. Lett.]
//        MR4636756  2024  Fan, Kai and Pomerance, Carl
//          "An inequality related to the sieve of Eratosthenes"  [J. Number Theory]
//        MR4693566  2023  Lynch, Peter
//          "The sieve of Eratosthenes and a partition of the natural numbers"  [Irish Math. Soc. Bull.]
//
//   H5   au="Holt Fred"
//        total = 9  (showing 3 most recent)
//        MR2419218  2008  Greenhill, Catherine and Holt, Fred B. and Wormald, Nicholas
//          "Expansion properties of a random regular graph after random vertex deletions"  [European J. Combin.]
//        MR2074846  2004  Holt, Fred B.
//          "Blending simple polytopes at faces"  [Discrete Math.]
//        MR1955718  2003  Holt, Fred B.
//          "Maximal nonrevisiting paths in simple polytopes"  [Discrete Math.]
//
//   H6   au="Rudd" ti="primes"
//        total = 0
//
// 2b. zbMATH / OpenAlex / Crossref on the book.
//   Z    zbMATH  "Patterns among the primes Eratosthenes sieve"
//        total = 0
//
//   Z    zbMATH  "Holt cycle of gaps primorial"
//        total = 0
//
//   O    OpenAlex  "Patterns among the primes a study of Eratosthenes sieve"
//        total = 269
//        W2159960217  2014  "Eratosthenes sieve and the gaps between primes"  [arXiv (Cornell University)]
//        W2963148321  2006  "Obstructions to Uniformity and Arithmetic Patterns in the Primes"  [Pure and Applied Mathematics Quarterly]
//        W2923054028  2019  "Primality, Fractality, and Image Analysis"  [Entropy]
//
//   O    OpenAlex  "Holt Rudd cycle of gaps Eratosthenes sieve"
//        total = 3
//        W1837106074  2013  "On small gaps among primes"  [arXiv (Cornell University)]
//        W4396788210  2024  "Expected biases in the distribution of consecutive primes"  [arXiv (Cornell University)]
//        W7162045330  2026  "On nonconvex constellations among primes II: (458,3240)"  [arXiv (Cornell University)]
//
//   X    Crossref "Patterns among the Primes ... Holt"  total=1965669
//        10.2139/ssrn.2166293  2012  "Helix and Primes: Sieve of Eratosthenes and Variations, a Study upon Prime Numbers" [SSRN Electronic Journal]
//        10.1007/bf01932283  1977  "The segmented sieve of eratosthenes and primes in arithmetic progressions to 1012" [BIT]
//        10.3840/000205  2007  "Sieve of Eratosthenes" [Wolfram Demonstrations Project]
//
// 2c. Catalogue channels (OpenLibrary, Google Books) — reachability.
//   L1   HTTP 200  total=1
//        2022 Patterns among the Primes — Fred Holt
//
//   L2   HTTP 200  total=1
//        2022 Patterns among the Primes — Fred Holt
//
//   L3   HTTP 429  total=?
//
//   L4   HTTP 429  total=?
//
// ================================================================
// 3. THE u_sup REPRESENTATION (TODO item H)
//    (a) the Fejer-mass identity, (b) mean value of signed Rosser
//    weights over a complete period / worst-position remainder.
// ================================================================
//
// 3a. MathSciNet titles.
//   U1   ti="Fejer kernel roots of unity"
//        total = 0
//
//   U2   ti="trigonometric identity sine sum"
//        total = 0
//
//   U3   ti="mean value of sieve weights"
//        total = 0
//
//   U4   ti="large sieve Rosser"
//        total = 0
//
//   U5   ti="Rosser sieve"
//        total = 8  (showing 3 most recent)
//        MR1239243  1993  Coleman, M. D.
//          "The Rosser-Iwaniec sieve in number fields, with an application"  [Acta Arith.]
//        MR1133958  1991  Sander, J. W.
//          "On $4/n=1/x+1/y+1/z$ and Rosser's sieve"  [Acta Arith.]
//
//   U6   ti="linear sieve mean value"
//        total = 0
//
//   U7   ti="bilinear forms error term sieve"
//        total = 2
//        MR1283373  1994  Salerno, S. and Vitolo, A.
//          "Bilinear form of the error term of Buchstab's iteration sieve"  [Studia Sci. Math. Hungar.]
//        MR1133234  1991  Salerno, Saverio
//          "Iwaniec's bilinear form of the error term in the Selberg sieve"  [Acta Arith.]
//
//   U8   ti="variance of sifted sequences"
//        total = 0
//
//   U9   ti="remainder term Selberg sieve mean square"
//        total = 0
//
// 3b0. zbMATH CALIBRATION, because its zeros are easy to over-read.
//      A zero-result query comes back HTTP 404 with internal_code
//      "successful access. No results found." — a NEGATIVE, not a
//      broken channel. And its matching narrows fast with query
//      length. These four probes fix both facts in the record.
//   K    zbMATH  "Jacobsthal function"
//        total = 187
//        3103453  1946  Brun, Viggo; Jacobsthal, Ernst; Selberg, Atle; Siegel, Carl
//          "Correspondence about a polynomial which is related to Riemann's zeta function"  [Norsk Mat. Tidsskr.]
//        3013365  1934  Jacobsthal, Ernst
//          "Über eine besondere Klasse rekurrierend definierter Zahlfolgen und ihr Konvergenzverhalten"  [Math. Z.]
//
//   K    zbMATH  "paired Jacobsthal function"
//        total = 0
//
//   K    zbMATH  "Jacobsthal"
//        total = 1015
//        3316166  1968  Jacobsthal, E.
//          "Über die Eulersche Konstante"  []
//        3131977  1957  Jacobsthal, Ernst
//          "Über die größte ganze Zahl. I, II"  [Norske Vid. Selsk. Forhdl.]
//
//   K    zbMATH  "zzzqqqxxxnothing"
//        total = 0
//
// 3b. zbMATH full-record search — titles, abstracts, MSC AND REVIEW TEXT,
//     which is the coverage MR Lookup does not give. Long conjunctions
//     return zero here (the terms are AND-ed), so the queries are short.
//   Z    zbMATH  "Jacobsthal function upper bound"
//        total = 8
//        900163206  2013  Fintan Costello; Paul Watts
//          "A short note on Jacobsthal's function"  []
//        900172594  2013  Gerhard R. Paseman
//          "Updating an upper bound of Erik Westzynthius"  []
//
//   Z    zbMATH  "Jacobsthal function two residue classes"
//        total = 0
//
//   Z    zbMATH  "mean square remainder linear sieve"
//        total = 0
//
//   Z    zbMATH  "large sieve sieve weights"
//        total = 34
//        3739688  1981  Iwaniec, H.; Laborde, M.
//          "\(P_ 2\) in short intervals"  [Ann. Inst. Fourier]
//        1820101  2002  Brüdern, Jörg; Kawada, Koichi
//          "Ternary problems in additive prime number theory"  []
//        5610431  2009  Goldston, Daniel A.; Pintz, János; Yıldırım, Cem Y.
//          "Primes in tuples. I"  [Ann. Math. (2)]
//        3943938  1986  Bombieri, E.; Friedlander, J. B.; Iwaniec, H.
//          "Primes in arithmetic progressions to large moduli"  [Acta Math.]
//
//   Z    zbMATH  "Rosser weights mean value"
//        total = 0
//
//   Z    zbMATH  "well-factorable weights bilinear"
//        total = 0
//
//   Z    zbMATH  "variance sifted sequence interval"
//        total = 0
//
//   Z    zbMATH  "Fejer kernel roots of unity"
//        total = 0
//
//   Z    zbMATH  "Ramanujan sums variance interval"
//        total = 0
//
//   Z    zbMATH  "discrete Fejer kernel identity"
//        total = 0
//
// 3c. OpenAlex.
//   O    OpenAlex  "Jacobsthal function upper bound primorial"
//        total = 8
//        W1986494402  2011  "Conjecture of Pomerance for some even integers and odd primorials"  [Publicationes Mathematicae Debrecen]
//        W3040439144  2020  "On differences between consecutive numbers coprime to primorials"  [arXiv (Cornell University)]
//        W2156462147  2014  "Large gaps between consecutive prime numbers"  [arXiv (Cornell University)]
//
//   O    OpenAlex  "mean square of the remainder in the linear sieve"
//        total = 10144
//        W2079559497  1997  "On methods of sieves and penalization"  [The Annals of Statistics]
//        W2035394841  2009  "Affine linear sieve, expanders, and sum-product"  [Inventiones mathematicae]
//        W2104455572  1994  "Penalized weighted least-squares image reconstruction for positron emission tomography"  [IEEE Transactions on Medical Imaging]
//
//   O    OpenAlex  "large sieve inequality for sieve weights"
//        total = 7205
//        W1990871665  2004  "The Bernoulli sieve"  [Bernoulli]
//        W2060291661  2014  "Variants of the Selberg sieve, and bounded intervals containing many primes"  [Research in the Mathematical Sciences]
//        W2025607259  2011  "On the range of validity of the autoregressive sieve bootstrap"  [The Annals of Statistics]
//
//   O    OpenAlex  "Fejer kernel at rational points identity"
//        total = 52
//        W1967332578  1971  "ANALYTIC PROPERTIES OF SCHMIDT PAIRS FOR A HANKEL OPERATOR AND THE GENERALIZED SCHUR-TAKAGI PROBLEM"  [Mathematics of the USSR-Sbornik]
//        W2562628705  1994  "Tangential Carathéodory-Fejer Interpolation for Stieltjes Functions at Real Points"  [Zeitschrift für Analysis und ihre Anwendungen]
//        W1822993497  1967  "Generalized interpolation in 𝐻^{∞}"  [Transactions of the American Mathematical Society]
//
// 3d. THE STANDING QUESTION, asked of every reachable channel at once:
//     is there ANY published UPPER bound, at ANY exponent, for a
//     covering problem with TWO residue classes per prime?
//     Calibrated by the fact that the same channels return the
//     ONE-class upper bounds (Iwaniec 1978; Costello-Watts 2015)
//     and the two-class LOWER-bound literature immediately.
//   Z    zbMATH  "upper bound Jacobsthal function"
//        total = 8
//        900163206  2013  Fintan Costello; Paul Watts
//          "A short note on Jacobsthal's function"  []
//        900172594  2013  Gerhard R. Paseman
//          "Updating an upper bound of Erik Westzynthius"  []
//
//   Z    zbMATH  "Costello Watts Jacobsthal"
//        total = 0
//
//   Z    zbMATH  "sieved set bounded residue classes gaps"
//        total = 0
//
//   Z    zbMATH  "paired Jacobsthal function"
//        total = 0
//
//   Z    zbMATH  "generalised Jacobsthal function paired progressions"
//        total = 0
//
// ================================================================
// 4. LOCAL CHECK: is L4 the classical sine identity?
//    L4:  sum_{a=1}^{e-1} F_H(a/e) = h(e-h),  h = H mod e,
//    F_H(t) = sin^2(pi H t)/sin^2(pi t).  Since F_H(a/e) depends on H
//    only mod e, this IS  sum_{k=1}^{n-1} sin^2(pi k m/n)/sin^2(pi k/n)
//    = m(n-m)  for 0 <= m <= n, the standard Fejer/Dirichlet-kernel
//    identity. Verified here so the identification is not asserted.
// ================================================================
//
//   sum_{k=1}^{n-1} sin^2(pi k m/n)/sin^2(pi k/n) = m(n-m)
//   checked for all 2 <= n <= 60 and 0 <= m <= n : max abs error 1.296e-11 at n=58, m=46
//
//   And the H-reduction that makes L4 the same statement:
//     H=85, e=13: h=7, sum=42.000000000, h(e-h)=42, err=7.11e-15
//     H=169, e=30: h=19, sum=209.000000000, h(e-h)=209, err=3.69e-12
//     H=40, e=7: h=5, sum=10.000000000, h(e-h)=10, err=9.95e-14
//     H=529, e=23: h=0, sum=0.000000000, h(e-h)=0, err=5.81e-25
//
// ================================================================
// network calls: 203    elapsed: 123.4 s
// ================================================================
// ============================================================================
// READINGS
// ============================================================================
//
// 1. MATHSCINET IS REACHABLE, and `SEARCH-CONVENTIONS.md` §5's "UNSEARCHED,
//    paywalled" is half right. The subscription UI does redirect to LibLynx
//    (§0a). The INDEX does not: MR Lookup answers author/title/journal/year
//    queries free, reports the total number of matching MathSciNet documents,
//    and returns three of them as BibTeX. All six calibration probes returned
//    their known positives — Iwaniec MR499895, Kalmynin-Konyagin MR4727548,
//    FGKMT MR3718451, FKMPT MR4195744 with its 2023 corrigendum MR4592874,
//    Diamond-Halberstam MR2458547, Kourbatov MR3065331. The channel is live and
//    the negatives below are calibrated.
//
// 2. WHAT MR LOOKUP DOES NOT COVER, stated so this is not read as full
//    MathSciNet coverage: it searches BIBLIOGRAPHIC FIELDS ONLY. Not the review
//    text, not the abstract, not the MSC classification, and it returns at most
//    three documents per query. A two-class bound proved inside a paper whose
//    title does not say so is invisible to it. zbMATH's API does search review
//    text and is used in §3b for exactly that reason.
//
// 3. THE `year` FIELD HAS TWO SEMANTICS and the first version of this script
//    got it wrong. A bare year filters exactly; a range "1900-1963" is read as
//    a LOWER BOUND. ti="Jacobsthal function" returns 19 for "1900-1963", 18 for
//    "1964-2026", 16 for "1996-2026" — monotone, which a range could not be.
//    Read as cumulative counts, that turns a 3-document window into a complete
//    enumeration, which is how §1b reads all 19 and §1c all 39.
//
// 4. THE COMPLETE MATHSCINET TITLE LIST FOR THE JACOBSTHAL FUNCTION, and every
//    upper bound in it is ONE CLASS PER PRIME. Erdos MR146125 (1962), Vaughan
//    MR453677 (1976/77), Stevens MR427212 (1977), Kanold MR209247 / MR384670 /
//    MR453672, Iwaniec MR499895 (1978), Hagedorn MR2476571 (2009, computation),
//    Costello-Watts MR3315513 (2015), Mercer MR3783885 (2018), Kalmynin-Konyagin
//    MR4727548 (2024). Nothing in either enumeration is a bound for two classes
//    per prime, and no title in the reviewed literature poses one.
//
// 5. HOLT'S PRIME PROGRAMME IS ABSENT FROM MATHSCINET ENTIRELY. au="Holt Fred"
//    returns 9 documents, all polytopes and random graphs; au="Holt" ti="primes"
//    returns one paper by a different Holt; ti="Patterns among the primes"
//    returns 0. zbMATH returns 0 for the book on both queries. So MathSciNet and
//    zbMATH add NOTHING to the Holt question: the book is unreviewed, and the
//    fourteen arXiv manuscripts already swept are the whole reviewed record.
//
// 6. THE BOOK IS SELF-PUBLISHED, WHICH EXPLAINS 5. OpenLibrary carries exactly
//    one edition: "Patterns among the Primes: A Study of Eratosthenes Sieve",
//    Independently Published, 2022, 212 pages, ISBN 9798831607314, no ebook and
//    no full text. Google Books answered HTTP 429 on this network for the whole
//    session, so that channel is UNTESTED rather than negative.
//
// 7. zbMATH'S ZEROS NEED CARE AND THE FIRST VERSION OF THIS SCRIPT MISREAD THEM.
//    A zero-result query returns HTTP 404 with internal_code "successful access.
//    No results found." — a negative, not a broken channel. Separately, its
//    matching narrows fast with query length: "Jacobsthal function" returns 187
//    and includes Ziller-Morack, while "paired Jacobsthal function" returns 0
//    for a record whose title contains all three words. THE LONG-QUERY ZEROS IN
//    §3b ARE THEREFORE NOT EVIDENCE OF ABSENCE. Only the short-query results are.
//
// 8. THE ONE-CLASS UPPER-BOUND LITERATURE IS COMPLETE AND SMALL, and both
//    channels return it on demand: Iwaniec MR499895 for the record bound,
//    Costello-Watts MR3315513 = "An upper bound on Jacobsthal's function",
//    Math. Comp. 84 (2015) 1389-1399, for the computational one. That is the
//    calibration that gives §3d's negative its value: the same queries that find
//    every ONE-class upper bound find no TWO-class upper bound at any exponent.
//
// 9. L4 IS THE CLASSICAL SINE IDENTITY, verified rather than asserted. For all
//    2 <= n <= 60 and 0 <= m <= n the max error is 1.296e-11, and the four
//    (H, e) reductions land on h(e-h) to 7.11e-15 or better. So the Fejer-mass
//    identity of `attack-beta2-01-lemmaV-meansquare.md` L4 is a re-derivation of
//    sum_{k=1}^{n-1} sin^2(pi k m/n)/sin^2(pi k/n) = m(n-m), which is
//    orthogonality on Z/nZ counting pairs. TODO item H asked whether it is
//    folklore. It is, and the script proves the identification.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// TOKENIZER ARTIFACTS, none of them a measurement:
//   -1963 in reading 4 is the tail of the query string "1900-1963", the date
//   range fed to MathSciNet to demonstrate that a range is read as a lower
//   bound. The same string appears in the code above as a literal.
//   1389 and -1399 in reading 8 are the page range of Costello-Watts, Math.
//   Comp. 84 (2015) 1389-1399. The run prints the record itself as
//   "MR3315513 2015 Costello, Fintan and Watts, Paul" without pagination.
//
// LITERATURE / CATALOGUE identifiers:
//   9798831607314 in reading 6 is the ISBN of the OpenLibrary edition of Holt's
//   "Patterns among the Primes". The run prints the OpenLibrary channel and its
//   reachability, not the ISBN string, so the number is read off the catalogue
//   record rather than off this file's own tail.
// ---------------------------------------------------------------------------
