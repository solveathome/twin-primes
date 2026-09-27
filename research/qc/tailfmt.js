'use strict';
// ============================================================================
// QC / TAILFMT — the one definition of what a script's tail IS
// ============================================================================
// Shared by `qc/embed.js` (writes tails), `qc/tails.js` (re-runs and compares)
// and `qc/checks.js` (the static checks). One parser, so the writer and the
// checker cannot drift apart — which is the same class of defect this whole
// framework exists to catch, and it would be embarrassing to build it in here.
//
// THE FORMAT, and the reason it has a fingerprint.
//
//   // ==========================================================================
//   // OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   //   node research/qc/embed.js research/<file>.js
//   //   invocation:  node research/<file>.js
//   //   code-sha256: <hash of every byte ABOVE the OUTPUT banner>
//   //   out-sha256:  <hash of the normalised stdout>
//   //   node:        v22.3.0
//   //   embedded:    2026-08-18
//   //   elapsed:     1.4 s
//   // ==========================================================================
//   // <the run's own stdout, one line per line, verbatim>
//   // ==========================================================================
//   // READINGS
//   // <prose, written by a human or an agent, AFTER reading the block above>
//
// `code-sha256` is what makes the tail non-transferable. It binds the pasted
// output to the exact bytes of the code above it, so editing the code without
// re-embedding is caught by reading the file, with nothing executed and no
// judgement involved. On 2026-08-18 that check alone found
// `05-twin-jacobsthal.js` carrying a p = 29 row that the committed code stops
// short of producing: right numbers, broken provenance, invisible to every
// other instrument here.
//
// `out-sha256` is checked by re-running (`qc/tails.js`), which is slow and
// lives outside the fast gate.
//
// NORMALISATION. A run is not byte-reproducible: elapsed times, dates and
// memory figures move. Both the writer and the checker hash the SAME
// normalised text, and the substitutions are listed here rather than tuned in
// two places. Anything not on this list must reproduce exactly.
// ============================================================================

const crypto = require('crypto');

const BANNER = /^\s*\/\/\s*={10,}\s*$/;
// OUT_HEAD is TIGHT on purpose (2026-08-20). The loose form `OUTPUT\b` let any
// prose comment beginning with the word OUTPUT capture the banner: commit
// 391bd7a appended `//   OUTPUT, which is a cross-check …` to a provenance note
// below READINGS and silently UNBOUND research/a3-08-adjacent-pairs.js — the
// fingerprint evaporated, `embeds` stopped checking the file, and a re-embed in
// that state was demonstrated writing a second header and destroying the note
// (verify-the-verifier-embeds.md §3.4). A banner must own its line: bare
// OUTPUT, or OUTPUT followed by a dash, an em-dash, or an open paren (the
// legacy dated form "OUTPUT (run of 2026-08-13)"). Prose shapes — "OUTPUT
// block", "OUTPUT, which", "OUTPUT reads" — no longer match. Every banner in
// the corpus was surveyed before tightening: zero real banners move.
const OUT_HEAD = /^\s*\/\/\s*OUTPUT\s*(?:$|[—\-(])/;
const READ_HEAD = /^\s*\/\/\s*READINGS\b/;

// The volatile things, and nothing else.
const VOLATILE = [
  [/\[\s*\d+(?:\.\d+)?\s*m?s\s*\]/g, '[TIME]'],           // [53.4s], [812 ms]
  [/\b\d+(?:\.\d+)?\s*(?:ms|s|sec|secs|seconds)\b/g, 'TIME'],
  // key-form timings, unit BEFORE the number ("secs":70.2 in a JSON line) —
  // the shape that made two 2026-08-19 embeds permanently fail --check
  [/("(?:secs|sec|ms|elapsed|seconds|time)"\s*:\s*)\d+(?:\.\d+)?/g, '$1TIME'],
  // Longer wall-clock units, added 2026-08-20. Until then `min`, `h`, `hours`
  // and `days` were not scrubbed at all, which is why six tails whose printed
  // figure IS a wall clock could never go green under `embed.js --check` on any
  // machine but the one that wrote them.
  //
  // The rule is deliberately narrow, and the narrowness is the whole point: in
  // this corpus `min` is very often the MINIMUM and `h` is very often a
  // mathematical variable. A blunt `\d+\s*(min|h|days)` scrubs
  // `W / (2 min(j, W-j))` in level-ledger-tight, `Theta*(e)^2 h(e-h)` in
  // lemmaV-parseval and `e(-2 h dbar1/d2)` in attack-theta-margin, which would
  // make --check blind to a real change in a printed formula: a far worse
  // defect than the one being fixed. So: EXACTLY one space (a table column is
  // aligned with several, `6   min` in attack-foldL-01 is a minimum), and the
  // unit must not be followed by a letter or an opening paren (`2 h dbar1`,
  // `2 min(j`). Verified against every tail in research/: it matches 11 tails
  // and every hit in them is a wall clock.
  //
  // 2026-08-20, the lookahead miss: `24.9 min wall` IS a wall clock and the
  // bare letter-lookahead read `wall` as a variable and refused to scrub it.
  // The word `wall` after a time unit only ever means the clock, so it is the
  // one word the lookahead lets through.
  [/\b\d+(?:\.\d+)?[ ](?:min|mins|minutes|h|hr|hrs|hours|day|days)\b(?![ \t]*(?!wall\b)[A-Za-z(])/g, 'TIME'],
  [/\b\d{4}-\d{2}-\d{2}(?:T[\d:.]+Z?)?/g, 'DATE'],
  [/\bv\d+\.\d+\.\d+\b/g, 'VERSION'],
  [/\b\d+(?:\.\d+)?\s*(?:MB|GB|KB)\b/gi, 'MEM'],
];

// Q6, settled by Chris 2026-08-20 (CHANGELOG "WIDEN the volatile list,
// timing-only"): a BARE number under a table column literally headed `secs` is
// a wall clock with no unit beside it, and no per-line regex can know that.
// Two producers print such a column (two-class-lower-bounds.js's ladder,
// import-stein-02-strikes.js §C3) and their tails could never re-verify green
// on any machine but the one that wrote them. TIMING-ONLY is enforced by
// scope: the column must be the LAST header token, literally `secs`, and the
// scrub runs only over the contiguous rows that follow — the first line that
// does not end in a bare number ends the scope, so a later data table in the
// same block is never touched.
function scrubSecsColumns(t) {
  const ls = t.split('\n');
  let scope = false;
  for (let i = 0; i < ls.length; i++) {
    const l = ls[i].replace(/\s+$/, '');
    if (/[ \t]secs$/.test(l)) { scope = true; continue; }
    if (!scope) continue;
    if (!l.trim()) { scope = false; continue; }
    const r = ls[i].replace(/([ \t])-?\d+(?:\.\d+)?(\s*)$/, '$1TIME$2');
    if (r !== ls[i]) ls[i] = r; else scope = false;
  }
  return ls.join('\n');
}

function normalize(text) {
  let t = scrubSecsColumns(String(text).replace(/\r\n/g, '\n'));
  for (const [re, to] of VOLATILE) t = t.replace(re, to);
  return t.split('\n').map(l => l.replace(/\s+$/, '')).join('\n').replace(/\n+$/, '') + '\n';
}

const sha = (s) => crypto.createHash('sha256').update(s, 'utf8').digest('hex');

// ---------------------------------------------------------------------------
// Where the tail sits. Returns line indices, or null when there is no tail.
//   head    : [0, outBannerStart)      the code, what code-sha256 covers
//   output  : [outBodyStart, outEnd)   the pasted run
//   readings: [readStart, end)         prose, unverifiable by machine
// ---------------------------------------------------------------------------
function locate(src) {
  const lines = src.split('\n');
  let outHead = -1;
  for (let i = lines.length - 1; i >= 0; i--) if (OUT_HEAD.test(lines[i])) { outHead = i; break; }
  if (outHead === -1) return null;
  return locateAt(lines, outHead, lines.length);
}

// MULTI-TAIL SUPPORT (2026-08-20). Three declared composites — cap-33's three
// RUN blocks, cap-34's six stages, cap-37's three logs — were structurally
// unbindable because a file had exactly one tail: `embed.js` would have
// replaced the whole OUTPUT region, provenance prose and sibling runs
// included (custody-overnight.md). `locateAll` returns every tail in order,
// each ending where the next begins; `embed.js --tail N` binds one without
// touching the others. For a multi-tail file the code is what sits above the
// FIRST tail, so every tail's code-sha256 covers the same bytes — use
// `headTextAll` for that. `locate` keeps its historic single-tail behavior
// (the LAST banner) so nothing already bound moves.
function locateAll(src) {
  const lines = src.split('\n');
  const heads = [];
  for (let i = 0; i < lines.length; i++) if (OUT_HEAD.test(lines[i])) heads.push(i);
  return heads.map((h, k) => {
    let limit = lines.length;
    if (k + 1 < heads.length) {
      limit = heads[k + 1];
      if (limit > 0 && BANNER.test(lines[limit - 1])) limit -= 1;
    }
    return locateAt(lines, h, limit);
  });
}

function headTextAll(src) {
  const tails = locateAll(src);
  if (!tails.length) return src;
  return tails[0].lines.slice(0, tails[0].tailStart).join('\n');
}

function locateAt(lines, outHead, hardLimit) {
  // the banner rule above the OUTPUT line, if there is one, belongs to the tail
  let start = outHead;
  if (start > 0 && BANNER.test(lines[start - 1])) start -= 1;

  let readHead = -1;
  for (let i = outHead + 1; i < hardLimit; i++) if (READ_HEAD.test(lines[i])) { readHead = i; break; }

  // Where the body starts, and this is the part that was WRONG until 2026-08-19.
  //
  // The first draft assumed every tail closes its OUTPUT header with a rule, so
  // it took the first banner after the OUTPUT line as the header's end. That is
  // true of the embedded format and of most legacy ones, and false of the legacy
  // form that starts its output on the very next line:
  //
  //     // OUTPUT (run of 2026-08-13), abridged:
  //     //
  //     // 5   | 49   | 11,13   | 4.45e+0
  //
  // There the first banner encountered is the tail's CLOSING rule, so the body
  // was computed as empty. It returned empty for **47 of 126 tails**, and both
  // consumers skip an empty body, which meant the migration counter under-read
  // by a factor of two and — far worse — `embed.js`'s guard against overwriting
  // legacy evidence was INERT on exactly those files. Attack 9 demonstrated it
  // destroying a row on a scratch copy while exiting 0. A safety mechanism with
  // a silent hole is worse than none, because it is trusted.
  //
  // The rule now: a header exists only if it announces itself, either by a rule
  // on the line immediately after OUTPUT, or by carrying a `code-sha256:` line
  // within the next dozen. Otherwise the body starts immediately.
  const limit = readHead === -1 ? hardLimit : readHead;
  let headerEnd = -1;
  if (BANNER.test(lines[outHead + 1] || '')) {
    headerEnd = outHead + 1;
  } else {
    for (let i = outHead + 1; i < Math.min(outHead + 14, limit); i++) {
      if (/code-sha256\s*:/.test(lines[i])) {
        for (let j = i; j < limit; j++) if (BANNER.test(lines[j])) { headerEnd = j; break; }
        break;
      }
    }
  }
  const body = headerEnd === -1 ? outHead + 1 : headerEnd + 1;

  // AN EXPLICIT BODY LENGTH BEATS EVERY HEURISTIC. Two honest shapes defeat
  // the READINGS scan in opposite directions: a script that PRINTS the word
  // READINGS on stdout (attack-perfold-01/02 assemble their readings in code,
  // so the body legitimately contains a `// READINGS` line and the first-match
  // scan truncates the bound body), and a tail whose real READINGS banner is
  // followed by a decorative second one (attack-ioslack-survey), which a
  // last-match scan would swallow into the body. So the writer now records
  // `body-lines: N` in the fingerprint and the reader believes it. Legacy
  // fingerprints without the field keep the first-match scan unchanged.
  let end = readHead === -1 ? hardLimit : readHead;
  if (readHead > 0 && BANNER.test(lines[readHead - 1])) end = readHead - 1;
  if (headerEnd !== -1) {
    for (let i = outHead; i < headerEnd; i++) {
      const m = /^\s*\/\/\s+body-lines:\s+(\d+)\s*$/.exec(lines[i]);
      if (m) {
        const n = Number(m[1]);
        if (body + n <= hardLimit) {
          end = body + n;
          readHead = -1;
          for (let j = end; j < hardLimit; j++) if (READ_HEAD.test(lines[j])) { readHead = j; break; }
        }
        break;
      }
    }
  }

  return { lines, tailStart: start, outHead, headerEnd, bodyStart: body, outEnd: end, readStart: readHead, limitEnd: hardLimit };
}

function headText(src) {
  const L = locate(src);
  return L ? L.lines.slice(0, L.tailStart).join('\n') : src;
}

// The body, in either of the two shapes this corpus actually uses: `//` line
// comments, and a `/* … */` block. The block form was invisible to the first
// draft, which is 21 of 126 tails on top of the 47 the header bug hid — and an
// invisible body means `embed.js`'s guard cannot see the evidence it is meant
// to refuse to overwrite. Both bugs had the same consequence and neither was
// visible from the outside, which is why the selftest now carries one fixture
// of each shape.
function outputText(src) {
  const L = locate(src);
  if (!L) return null;
  const out = [];
  let inBlock = false;
  for (const raw of L.lines.slice(L.bodyStart, L.outEnd)) {
    const line = raw.replace(/\s+$/, '');
    if (!inBlock && /^\s*\/\*/.test(line)) {
      inBlock = true;
      const after = line.replace(/^\s*\/\*+/, '');
      if (after.trim()) out.push(after);
      continue;
    }
    if (inBlock) {
      if (/\*\/\s*$/.test(line)) { inBlock = false; const before = line.replace(/\*\/\s*$/, ''); if (before.trim()) out.push(before); continue; }
      out.push(line);
      continue;
    }
    const m = line.match(/^\s*\/\/ ?(.*)$/);
    if (m !== null) out.push(m[1]);
  }
  return out.filter(l => !/^={10,}$/.test(l.trim())).join('\n');
}

// The body EXACTLY as the run printed it, rules kept. `outputText` filters
// pure `====` rule lines because legacy hand-pasted tails use them as internal
// decoration; but an EMBEDDED body is a byte record of stdout, and 62 bound
// tails have rule lines in their real output. The static out-sha check
// (checks.js `embeds`, embed.js --check body verdict) must therefore read the
// body with rules KEPT, or it manufactures 62 false mismatches.
function stripCommentLines(lines) {
  const out = [];
  let inBlock = false;
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');
    if (!inBlock && /^\s*\/\*/.test(line)) {
      inBlock = true;
      const after = line.replace(/^\s*\/\*+/, '');
      if (after.trim()) out.push(after);
      continue;
    }
    if (inBlock) {
      if (/\*\/\s*$/.test(line)) { inBlock = false; const before = line.replace(/\*\/\s*$/, ''); if (before.trim()) out.push(before); continue; }
      out.push(line);
      continue;
    }
    const m = line.match(/^\s*\/\/ ?(.*)$/);
    if (m !== null) out.push(m[1]);
  }
  return out;
}

function outputTextRaw(src) {
  const L = locate(src);
  if (!L) return null;
  return stripCommentLines(L.lines.slice(L.bodyStart, L.outEnd)).join('\n');
}

// Candidate raw bodies for a LEGACY fingerprint (no `body-lines` field): the
// current parse first, then the parse extended to each later READINGS banner.
// A static checker tries each against the recorded out-sha256, so a body that
// legitimately contains a printed READINGS line (the perfold shape) is not a
// false mismatch, and the matching candidate identifies the true split.
function outputBodyCandidates(src) {
  return outputBodyCandidatesOf(locate(src));
}
function outputBodyCandidatesOf(L) {
  if (!L) return [];
  const lim = L.limitEnd === undefined ? L.lines.length : L.limitEnd;
  const heads = [];
  for (let i = L.bodyStart; i < lim; i++)
    if (READ_HEAD.test(L.lines[i])) heads.push(i);
  const ends = new Set([L.outEnd]);
  for (const h of heads) {
    let e = h;
    if (h > 0 && BANNER.test(L.lines[h - 1])) e = h - 1;
    if (e > L.bodyStart) ends.add(e);
  }
  if (!heads.length) ends.add(lim);
  return [...ends].sort((a, b) => a - b)
    .map(e => ({ end: e, text: stripCommentLines(L.lines.slice(L.bodyStart, e)).join('\n') }));
}

// The STATIC out-sha verdict: does the pasted block, as bytes on disk, hash to
// the out-sha256 the fingerprint records? This is the check the whole embed
// mechanism was missing (verify-the-verifier-embeds.md, headline): out-sha256
// was written into every tail and compared only against a fresh RUN, so a
// digit hand-edited inside a bound block passed everything. This runs in
// microseconds with nothing executed. Returns { ok, end } where `end` is the
// body end line of the matching parse (candidates cover the legacy printed-
// READINGS shape), or { ok: false, end: null }.
function bodyMatchesRecorded(src, fp) {
  return bodyMatchesRecordedOf(locate(src), fp);
}
function bodyMatchesRecordedOf(L, fp) {
  if (!fp || !fp['out-sha256']) return { ok: false, end: null };
  for (const c of outputBodyCandidatesOf(L))
    if (sha(normalize(c.text)) === fp['out-sha256']) return { ok: true, end: c.end };
  return { ok: false, end: null };
}

function readingsText(src) {
  const L = locate(src);
  if (!L || L.readStart === -1) return null;
  return L.lines.slice(L.readStart + 1)
    .map(l => { const m = l.match(/^\s*\/\/ ?(.*)$/); return m ? m[1] : null; })
    .filter(l => l !== null && !/^={10,}$/.test(l.trim()))
    .join('\n');
}

// The fingerprint, parsed out of the OUTPUT header. Absent on a legacy tail.
function fingerprint(src) {
  return fingerprintOf(locate(src));
}
function fingerprintOf(L) {
  if (!L) return null;
  const fp = {};
  const stop = L.headerEnd === -1 ? Math.min(L.outHead + 12, L.lines.length) : L.headerEnd;
  for (let i = L.outHead; i < stop; i++) {
    const m = L.lines[i].match(/^\s*\/\/\s+([\w-]+):\s+(.*?)\s*$/);
    if (m) fp[m[1]] = m[2];
  }
  return (fp['code-sha256'] && fp['out-sha256']) ? fp : null;
}

// ---------------------------------------------------------------------------
// The figures a reader would quote: three digits, or two decimal places. Small
// counters and years are excluded by shape so that a missing figure means
// something. Returns Map(token -> the line it sits on).
// ---------------------------------------------------------------------------
// `[\d,]*` must not swallow a TRAILING comma: a figure written mid-sentence
// as "548,402," otherwise tokenizes with the comma, strips to 548402 and then
// never matches the block's 548,402 — a systematic false-positive class in the
// readings-not-traceable advisory (found 2026-08-19).
const NUM = /-?\d(?:[\d,]*\d)?(?:\.\d+)?(?:[eE][-+]?\d+)?/g;

function figures(text) {
  const found = new Map();
  for (const line of String(text).split('\n')) {
    if (!line.trim()) continue;
    let m; NUM.lastIndex = 0;
    while ((m = NUM.exec(line)) !== null) {
      let tok = m[0];
      // THREE TOKENIZER FALSE-POSITIVE CLASSES, closed 2026-08-20 (the
      // verify-the-verifier pass measured all three in the advisory queue):
      // (1) identifier digits: `A048670`, `arXiv:2302.00459`, a DOI path — a
      //     number glued to a letter is an ID, not a figure. Skip when the
      //     character immediately before the match is a letter.
      // (2) hyphen-ranges: `1.54-2.27` and `[30.8-42.9]` tokenized `-2.27`,
      //     a figure no output block ever printed. A leading `-` is a minus
      //     sign only when what precedes it is not a digit or closing bracket.
      const prevCh = m.index > 0 ? line[m.index - 1] : '';
      if (/[A-Za-z]/.test(prevCh)) continue;
      // `arXiv:2302.00459`, `doi.org/10.1093/...`: an id whose digits follow a
      // word through `:` or `/` is an address, not a figure.
      if ((prevCh === ':' || prevCh === '/') && m.index > 1 && /[A-Za-z]/.test(line[m.index - 2])) continue;
      if (tok[0] === '-' && /[\d)\]]/.test(prevCh)) tok = tok.slice(1);
      const before = line.slice(Math.max(0, m.index - 2), m.index);
      const after = line.slice(m.index + tok.length + (m[0].length - tok.length), m.index + m[0].length + 5);
      if (/\[\s*$/.test(before) && /^\s*m?s\s*[\])]/.test(after)) continue;
      if (/^\s*(?:ms|s)\b/.test(after)) continue;
      if (/\d{4}-\d{2}-\d{2}/.test(line.slice(Math.max(0, m.index - 6), m.index + tok.length + 6))) continue;
      const digits = (tok.match(/\d/g) || []).length;
      const decimals = (tok.split('.')[1] || '').replace(/\D/g, '').length;
      if (digits < 3 && decimals < 2) continue;
      if (/^(?:19|20)\d\d$/.test(tok)) continue;
      if (!found.has(tok)) found.set(tok, line.trim().slice(0, 90));
    }
  }
  return found;
}

function presentIn(tok, text) {
  if (text.includes(tok)) return true;
  const bare = tok.replace(/,/g, '');
  if (bare !== tok && text.includes(bare)) return true;
  if (tok.includes('.')) {
    const trimmed = tok.replace(/0+$/, '');
    if (trimmed !== tok && trimmed.length > 2 && text.includes(trimmed)) return true;
  }
  // Exponent-notation variants (third tokenizer class, 2026-08-20): `3.0e8`,
  // `3.0e+8`, `3.0e+08` and `3.0E8` are one figure four ways, and a reading
  // that reflows one spelling against a block that prints another is not a
  // missing figure. Compare on a canonical form when the token carries an
  // exponent, and also scan the text's own exponent tokens canonically.
  const expo = /^(-?[\d.,]+)[eE]([-+]?)0*(\d+)$/.exec(tok);
  if (expo) {
    const canon = `${expo[1]}e${expo[2] === '-' ? '-' : '+'}${expo[3]}`;
    const re = /-?[\d.,]+[eE][-+]?\d+/g;
    let m;
    while ((m = re.exec(text)) !== null) {
      const t2 = /^(-?[\d.,]+)[eE]([-+]?)0*(\d+)$/.exec(m[0]);
      if (t2 && `${t2[1]}e${t2[2] === '-' ? '-' : '+'}${t2[3]}` === canon) return true;
    }
  }
  return false;
}

module.exports = { locate, locateAll, headText, headTextAll, outputText, outputTextRaw,
  outputBodyCandidates, outputBodyCandidatesOf, bodyMatchesRecorded, bodyMatchesRecordedOf,
  readingsText, fingerprint, fingerprintOf, normalize, sha, figures, presentIn,
  BANNER, OUT_HEAD, READ_HEAD };
