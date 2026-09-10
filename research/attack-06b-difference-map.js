// ============================================================================
// ATTACK 6b — THE DIFFERENCE MAP: G_d(n) for ALL even d = 2..210
// ============================================================================
// Follow-up to attack-06. There we found the SURPRISE that equal-density
// differences split: at 19#, G_8 = G_16 = 198 while G_2 = G_4 = 150. Here we
// build the definitive map d -> G_d(n) for every even d in [2, 210] at levels
// 13#, 17#, 19# (and extend d = 2,4,8,16 to 23#), then hunt for the law:
//   * does G_d within a density class follow v_2(d)? d mod 3? d mod 5?
//   * the residue tuple (-d mod p)_p determines the slot set exactly — is
//     there a SIMPLER statistic that determines G_d?
//   * after normalizing by mean gap (period/slots), which d is truly hardest?
// Symmetries used below (proved by the involutions r -> -r-d and r -> r+d):
//   G_d = G_{-d}  and  G_d depends only on d mod each odd prime p <= p_n,
//   so any single-prime dependence can only be through +-d mod p, i.e. the
//   unordered class m_p(d) = min(d mod p, p - d mod p).
// ============================================================================

const PR = [2, 3, 5, 7, 11, 13, 17, 19, 23];

function v2(d){ let v = 0; while (d % 2 === 0){ v++; d /= 2; } return v; }
function pm(d, p){ const r = d % p; return Math.min(r, p - r); } // +-d mod p

// Compute {count, maxGap} for each d in dList at level p_n = upto.
// base = residues hitting 0 mod some p <= upto, built once; per d we only add
// the -d mod p class for odd p with p !| d (if p | d it coincides with 0).
function computeLevel(upto, dList){
  const idx = PR.indexOf(upto);
  let P = 1; for (let i = 0; i <= idx; i++) P *= PR[i];
  const base = new Uint8Array(P);
  for (let i = 0; i <= idx; i++){
    const p = PR[i];
    for (let j = 0; j < P; j += p) base[j] = 1;
  }
  const bad = new Uint8Array(P);
  const results = [];
  for (const d of dList){
    bad.set(base);
    for (let i = 1; i <= idx; i++){
      const p = PR[i];
      const r2 = (p - (d % p)) % p;
      if (r2 !== 0) for (let j = r2; j < P; j += p) bad[j] = 1;
    }
    let first = -1, prev = -1, maxGap = 0, count = 0;
    for (let r = 1; r < P; r += 2) if (!bad[r]){   // slots are odd (d even)
      count++;
      if (first < 0) first = r; else if (r - prev > maxGap) maxGap = r - prev;
      prev = r;
    }
    maxGap = Math.max(maxGap, first + P - prev);   // cyclic wrap
    results.push({ d, count, maxGap });
  }
  return { P, results };
}

const D_ALL = []; for (let d = 2; d <= 210; d += 2) D_ALL.push(d);

for (const upto of [13, 17, 19]){
  const t0 = Date.now();
  const { P, results } = computeLevel(upto, D_ALL);
  console.log(`\n================ level p=${upto}  P#=${P}  (${((Date.now()-t0)/1000).toFixed(1)}s) ================`);

  // ---- group by density class (slot count) ----
  const byCount = new Map();
  for (const r of results){
    if (!byCount.has(r.count)) byCount.set(r.count, []);
    byCount.get(r.count).push(r);
  }
  const counts = [...byCount.keys()].sort((a, b) => a - b);
  for (const c of counts){
    const grp = byCount.get(c).sort((a, b) => a.d - b.d);
    const mean = P / c;
    console.log(`  class slots=${c} (mean gap ${mean.toFixed(1)}), ${grp.length} members:`);
    let line = '   ';
    for (const g of grp){
      line += ` ${g.d}:${g.maxGap}`;
      if (line.length > 100){ console.log(line); line = '   '; }
    }
    if (line.trim()) console.log(line);
    // distinct G values in class and who attains them
    const gvals = new Map();
    for (const g of grp){
      if (!gvals.has(g.maxGap)) gvals.set(g.maxGap, []);
      gvals.get(g.maxGap).push(g.d);
    }
    const gs = [...gvals.keys()].sort((a, b) => a - b);
    console.log(`    G-values: ${gs.map(g => `${g}{${gvals.get(g).join(',')}}`).join('  ')}`);
  }

  // ---- correlation probes within the sparsest (twin-density) class ----
  const twinClass = byCount.get(counts[0]).sort((a, b) => a.d - b.d);
  console.log(`  --- probes in twin-density class (${twinClass.length} members) ---`);
  const probes = [
    ['v2(d)',   g => v2(g.d)],
    ['+-d mod 5',  g => pm(g.d, 5)],
    ['+-d mod 7',  g => pm(g.d, 7)],
    ['+-d mod 11', g => pm(g.d, 11)],
    ['+-d mod 13', g => pm(g.d, 13)],
  ];
  for (const [name, f] of probes){
    const m = new Map();
    for (const g of twinClass){
      const k = f(g);
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(g.maxGap);
    }
    const ks = [...m.keys()].sort((a, b) => a - b);
    console.log(`    ${name}: ` + ks.map(k => {
      const a = m.get(k);
      const mean = a.reduce((x, y) => x + y, 0) / a.length;
      return `${k}->mean ${mean.toFixed(1)} [${Math.min(...a)}..${Math.max(...a)}] n=${a.length}`;
    }).join('  '));
  }

  // ---- pure powers of 2: G vs v2(d) ----
  const pows = results.filter(r => [2, 4, 8, 16, 32, 64, 128].includes(r.d));
  console.log('  powers of 2:  ' + pows.map(r => `d=${r.d}(v2=${v2(r.d)}):G=${r.maxGap}`).join('  '));

  // ---- normalized hardness: G_d / (P/slots) ----
  const rated = results.map(r => ({ ...r, ratio: r.maxGap * r.count / P }))
                       .sort((a, b) => b.ratio - a.ratio);
  console.log('  top-10 normalized G_d/(P/slots): ' +
    rated.slice(0, 10).map(r => `d=${r.d}:${r.ratio.toFixed(2)}`).join('  '));
  console.log('  bottom-3: ' + rated.slice(-3).map(r => `d=${r.d}:${r.ratio.toFixed(2)}`).join('  '));
  const worst = results.reduce((a, b) => b.maxGap > a.maxGap ? b : a);
  console.log(`  raw hardest: d=${worst.d} G=${worst.maxGap}   (G_2=${results[0].maxGap})`);
}

// ---- level 23# for d = 2, 4, 8, 16 (stability of the power-of-2 split) ----
{
  const t0 = Date.now();
  const { P, results } = computeLevel(23, [2, 4, 8, 16]);
  console.log(`\n================ level p=23  P#=${P}  (${((Date.now()-t0)/1000).toFixed(1)}s) ================`);
  for (const r of results)
    console.log(`  d=${r.d}  slots=${r.count}  G_d=${r.maxGap}  ratio=${(r.maxGap*r.count/P).toFixed(2)}`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-06b-difference-map.js
//   invocation:  node research/attack-06b-difference-map.js
//   code-sha256: de7e8ccbccc1070724de65f031208c567b77116feaa4d793d0b88e96ee0f24ab
//   out-sha256:  4f7a1d53f3d49b92d179324eb859ad0c0df2fd897112bdcceb8b1a2eb86177e3
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     3.1 s
// ============================================================================
//
// ================ level p=13  P#=30030  (0.0s) ================
//   class slots=1485 (mean gap 20.2), 40 members:
//     2:66 4:84 8:78 16:78 32:60 34:84 38:60 46:60 58:90 62:84 64:78 68:96 74:78 76:78 82:78 86:78 92:84
//     94:60 106:90 116:78 118:72 122:84 124:78 128:72 134:90 136:66 142:84 146:60 148:72 152:78 158:102
//     164:60 166:60 172:84 178:78 184:78 188:72 194:66 202:72 206:66
//     G-values: 60{32,38,46,94,146,164,166}  66{2,136,194,206}  72{118,128,148,188,202}  78{8,16,64,74,76,82,86,116,124,152,178,184}  84{4,34,62,92,122,142,172}  90{58,106,134}  96{68}  102{158}
//   class slots=1620 (mean gap 18.5), 4 members:
//     26:60 52:84 104:78 208:72
//     G-values: 60{26}  72{208}  78{104}  84{52}
//   class slots=1650 (mean gap 18.2), 4 members:
//     22:60 44:60 88:84 176:78
//     G-values: 60{22,44}  78{176}  84{88}
//   class slots=1782 (mean gap 16.9), 6 members:
//     14:60 28:60 56:60 98:60 112:60 196:60
//     G-values: 60{14,28,56,98,112,196}
//   class slots=1944 (mean gap 15.4), 1 members:
//     182:60
//     G-values: 60{182}
//   class slots=1980 (mean gap 15.2), 11 members:
//     10:60 20:60 40:54 50:60 80:48 100:60 154:54 160:48 170:60 190:54 200:60
//     G-values: 48{80,160}  54{40,154,190}  60{10,20,50,100,170,200}
//   class slots=2160 (mean gap 13.9), 1 members:
//     130:48
//     G-values: 48{130}
//   class slots=2200 (mean gap 13.7), 1 members:
//     110:54
//     G-values: 54{110}
//   class slots=2376 (mean gap 12.6), 2 members:
//     70:48 140:30
//     G-values: 30{140}  48{70}
//   class slots=2970 (mean gap 10.1), 19 members:
//     6:56 12:66 18:50 24:58 36:40 48:46 54:34 72:42 96:34 102:42 108:32 114:44 138:42 144:54 162:40 174:42
//     186:56 192:36 204:44
//     G-values: 32{108}  34{54,96}  36{192}  40{36,162}  42{72,102,138,174}  44{114,204}  46{48}  50{18}  54{144}  56{6,186}  58{24}  66{12}
//   class slots=3240 (mean gap 9.3), 2 members:
//     78:46 156:30
//     G-values: 30{156}  46{78}
//   class slots=3300 (mean gap 9.1), 3 members:
//     66:42 132:36 198:42
//     G-values: 36{132}  42{66,198}
//   class slots=3564 (mean gap 8.4), 4 members:
//     42:30 84:34 126:38 168:30
//     G-values: 30{42,168}  34{84}  38{126}
//   class slots=3960 (mean gap 7.6), 6 members:
//     30:34 60:56 90:34 120:36 150:32 180:40
//     G-values: 32{150}  34{30,90}  36{120}  40{180}  56{60}
//   class slots=4752 (mean gap 6.3), 1 members:
//     210:26
//     G-values: 26{210}
//   --- probes in twin-density class (40 members) ---
//     v2(d): 1->mean 75.5 [60..102] n=22  2->mean 78.6 [60..96] n=10  3->mean 75.0 [66..78] n=4  4->mean 78.0 [78..78] n=1  5->mean 60.0 [60..60] n=1  6->mean 78.0 [78..78] n=1  7->mean 72.0 [72..72] n=1
//     +-d mod 5: 1->mean 73.5 [60..90] n=20  2->mean 78.3 [60..102] n=20
//     +-d mod 7: 1->mean 78.0 [60..90] n=13  2->mean 77.1 [60..96] n=13  3->mean 72.9 [60..102] n=14
//     +-d mod 11: 1->mean 72.8 [60..84] n=8  2->mean 78.0 [60..96] n=8  3->mean 75.0 [60..90] n=8  4->mean 80.4 [66..102] n=10  5->mean 71.0 [60..78] n=6
//     +-d mod 13: 1->mean 74.6 [60..84] n=7  2->mean 78.9 [66..102] n=7  3->mean 74.6 [60..96] n=7  4->mean 81.0 [78..90] n=6  5->mean 76.0 [60..84] n=6  6->mean 71.1 [60..90] n=7
//   powers of 2:  d=2(v2=1):G=66  d=4(v2=2):G=84  d=8(v2=3):G=78  d=16(v2=4):G=78  d=32(v2=5):G=60  d=64(v2=6):G=78  d=128(v2=7):G=72
//   top-10 normalized G_d/(P/slots): d=60:7.38  d=12:6.53  d=24:5.74  d=6:5.54  d=186:5.54  d=144:5.34  d=180:5.27  d=158:5.04  d=78:4.96  d=18:4.95
//   bottom-3: d=164:2.97  d=166:2.97  d=140:2.37
//   raw hardest: d=158 G=102   (G_2=66)
//
// ================ level p=17  P#=510510  (0.1s) ================
//   class slots=22275 (mean gap 22.9), 37 members:
//     2:108 4:96 8:114 16:96 32:102 38:102 46:96 58:132 62:114 64:90 74:126 76:120 82:138 86:108 92:114
//     94:108 106:114 116:114 118:132 122:144 124:114 128:120 134:156 142:150 146:102 148:114 152:108 158:126
//     164:120 166:114 172:132 178:132 184:120 188:114 194:102 202:102 206:138
//     G-values: 90{64}  96{4,16,46}  102{32,38,146,194,202}  108{2,86,94,152}  114{8,62,92,106,116,124,148,166,188}  120{76,128,164,184}  126{74,158}  132{58,118,172,178}  138{82,206}  144{122}  150{142}  156{134}
//   class slots=23760 (mean gap 21.5), 3 members:
//     34:114 68:138 136:96
//     G-values: 96{136}  114{34}  138{68}
//   class slots=24300 (mean gap 21.0), 4 members:
//     26:108 52:180 104:114 208:132
//     G-values: 108{26}  114{104}  132{208}  180{52}
//   class slots=24750 (mean gap 20.6), 4 members:
//     22:102 44:108 88:120 176:96
//     G-values: 96{176}  102{22}  108{44}  120{88}
//   class slots=26730 (mean gap 19.1), 6 members:
//     14:90 28:90 56:90 98:84 112:90 196:84
//     G-values: 84{98,196}  90{14,28,56,112}
//   class slots=29160 (mean gap 17.5), 1 members:
//     182:90
//     G-values: 90{182}
//   class slots=29700 (mean gap 17.2), 10 members:
//     10:78 20:84 40:90 50:78 80:78 100:78 154:90 160:78 190:84 200:90
//     G-values: 78{10,50,80,100,160}  84{20,190}  90{40,154,200}
//   class slots=31680 (mean gap 16.1), 1 members:
//     170:78
//     G-values: 78{170}
//   class slots=32400 (mean gap 15.8), 1 members:
//     130:78
//     G-values: 78{130}
//   class slots=33000 (mean gap 15.5), 1 members:
//     110:78
//     G-values: 78{110}
//   class slots=35640 (mean gap 14.3), 2 members:
//     70:60 140:54
//     G-values: 54{140}  60{70}
//   class slots=44550 (mean gap 11.5), 17 members:
//     6:78 12:72 18:66 24:66 36:66 48:62 54:66 72:66 96:78 108:60 114:64 138:66 144:58 162:56 174:68 186:60
//     192:62
//     G-values: 56{162}  58{144}  60{108,186}  62{48,192}  64{114}  66{18,24,36,54,72,138}  68{174}  72{12}  78{6,96}
//   class slots=47520 (mean gap 10.7), 2 members:
//     102:50 204:56
//     G-values: 50{102}  56{204}
//   class slots=48600 (mean gap 10.5), 2 members:
//     78:60 156:54
//     G-values: 54{156}  60{78}
//   class slots=49500 (mean gap 10.3), 3 members:
//     66:54 132:50 198:54
//     G-values: 50{132}  54{66,198}
//   class slots=53460 (mean gap 9.5), 4 members:
//     42:48 84:66 126:50 168:44
//     G-values: 44{168}  48{42}  50{126}  66{84}
//   class slots=59400 (mean gap 8.6), 6 members:
//     30:54 60:60 90:48 120:44 150:42 180:48
//     G-values: 42{150}  44{120}  48{90,180}  54{30}  60{60}
//   class slots=71280 (mean gap 7.2), 1 members:
//     210:42
//     G-values: 42{210}
//   --- probes in twin-density class (37 members) ---
//     v2(d): 1->mean 121.1 [96..156] n=21  2->mean 115.3 [96..132] n=9  3->mean 114.0 [108..120] n=3  4->mean 96.0 [96..96] n=1  5->mean 102.0 [102..102] n=1  6->mean 90.0 [90..90] n=1  7->mean 120.0 [120..120] n=1
//     +-d mod 5: 1->mean 113.0 [90..156] n=18  2->mean 120.9 [102..150] n=19
//     +-d mod 7: 1->mean 115.5 [90..156] n=12  2->mean 117.5 [96..150] n=12  3->mean 118.2 [96..144] n=13
//     +-d mod 11: 1->mean 123.4 [102..150] n=7  2->mean 114.0 [90..156] n=7  3->mean 122.3 [102..138] n=8  4->mean 113.3 [96..132] n=9  5->mean 112.0 [96..138] n=6
//     +-d mod 13: 1->mean 114.9 [90..150] n=7  2->mean 120.9 [108..138] n=7  3->mean 111.0 [96..132] n=6  4->mean 126.0 [96..156] n=6  5->mean 120.0 [108..144] n=5  6->mean 110.0 [96..132] n=6
//   powers of 2:  d=2(v2=1):G=108  d=4(v2=2):G=96  d=8(v2=3):G=114  d=16(v2=4):G=96  d=32(v2=5):G=102  d=64(v2=6):G=90  d=128(v2=7):G=120
//   top-10 normalized G_d/(P/slots): d=52:8.57  d=60:6.98  d=84:6.91  d=6:6.81  d=96:6.81  d=134:6.81  d=142:6.54  d=68:6.42  d=12:6.28  d=30:6.28
//   bottom-3: d=70:4.19  d=64:3.93  d=140:3.77
//   raw hardest: d=52 G=180   (G_2=108)
//
// ================ level p=19  P#=9699690  (1.4s) ================
//   class slots=378675 (mean gap 25.6), 34 members:
//     2:150 4:150 8:198 16:198 32:144 46:186 58:174 62:162 64:168 74:180 82:180 86:156 92:162 94:150 106:144
//     116:174 118:204 122:180 124:198 128:150 134:180 142:180 146:144 148:180 158:162 164:150 166:156 172:156
//     178:192 184:180 188:180 194:138 202:162 206:180
//     G-values: 138{194}  144{32,106,146}  150{2,4,94,128,164}  156{86,166,172}  162{62,92,158,202}  168{64}  174{58,116}  180{74,82,122,134,142,148,184,188,206}  186{46}  192{178}  198{8,16,124}  204{118}
//   class slots=400950 (mean gap 24.2), 3 members:
//     38:156 76:156 152:156
//     G-values: 156{38,76,152}
//   class slots=403920 (mean gap 24.0), 3 members:
//     34:126 68:162 136:138
//     G-values: 126{34}  138{136}  162{68}
//   class slots=413100 (mean gap 23.5), 4 members:
//     26:144 52:192 104:138 208:162
//     G-values: 138{104}  144{26}  162{208}  192{52}
//   class slots=420750 (mean gap 23.1), 4 members:
//     22:150 44:138 88:162 176:150
//     G-values: 138{44}  150{22,176}  162{88}
//   class slots=454410 (mean gap 21.3), 6 members:
//     14:150 28:126 56:114 98:120 112:144 196:144
//     G-values: 114{56}  120{98}  126{28}  144{112,196}  150{14}
//   class slots=495720 (mean gap 19.6), 1 members:
//     182:120
//     G-values: 120{182}
//   class slots=504900 (mean gap 19.2), 9 members:
//     10:132 20:120 40:138 50:108 80:108 100:120 154:114 160:120 200:126
//     G-values: 108{50,80}  114{154}  120{20,100,160}  126{200}  132{10}  138{40}
//   class slots=534600 (mean gap 18.1), 1 members:
//     190:96
//     G-values: 96{190}
//   class slots=538560 (mean gap 18.0), 1 members:
//     170:114
//     G-values: 114{170}
//   class slots=550800 (mean gap 17.6), 1 members:
//     130:114
//     G-values: 114{130}
//   class slots=561000 (mean gap 17.3), 1 members:
//     110:96
//     G-values: 96{110}
//   class slots=605880 (mean gap 16.0), 2 members:
//     70:90 140:84
//     G-values: 84{140}  90{70}
//   class slots=757350 (mean gap 12.8), 16 members:
//     6:114 12:98 18:110 24:96 36:84 48:90 54:86 72:106 96:96 108:88 138:86 144:74 162:84 174:90 186:96
//     192:90
//     G-values: 74{144}  84{36,162}  86{54,138}  88{108}  90{48,174,192}  96{24,96,186}  98{12}  106{72}  110{18}  114{6}
//   class slots=801900 (mean gap 12.1), 1 members:
//     114:78
//     G-values: 78{114}
//   class slots=807840 (mean gap 12.0), 2 members:
//     102:96 204:78
//     G-values: 78{204}  96{102}
//   class slots=826200 (mean gap 11.7), 2 members:
//     78:78 156:70
//     G-values: 70{156}  78{78}
//   class slots=841500 (mean gap 11.5), 3 members:
//     66:66 132:76 198:90
//     G-values: 66{66}  76{132}  90{198}
//   class slots=908820 (mean gap 10.7), 4 members:
//     42:76 84:84 126:66 168:66
//     G-values: 66{126,168}  76{42}  84{84}
//   class slots=1009800 (mean gap 9.6), 6 members:
//     30:78 60:68 90:64 120:62 150:70 180:64
//     G-values: 62{120}  64{90,180}  68{60}  70{150}  78{30}
//   class slots=1211760 (mean gap 8.0), 1 members:
//     210:58
//     G-values: 58{210}
//   --- probes in twin-density class (34 members) ---
//     v2(d): 1->mean 168.0 [138..204] n=20  2->mean 168.8 [150..198] n=8  3->mean 189.0 [180..198] n=2  4->mean 198.0 [198..198] n=1  5->mean 144.0 [144..144] n=1  6->mean 168.0 [168..168] n=1  7->mean 150.0 [150..150] n=1
//     +-d mod 5: 1->mean 166.6 [138..198] n=17  2->mean 171.5 [144..204] n=17
//     +-d mod 7: 1->mean 171.3 [144..204] n=11  2->mean 169.1 [138..198] n=11  3->mean 167.0 [144..192] n=12
//     +-d mod 11: 1->mean 165.0 [144..180] n=6  2->mean 172.0 [150..192] n=6  3->mean 182.3 [144..204] n=8  4->mean 154.0 [138..162] n=9  5->mean 176.4 [150..198] n=5
//     +-d mod 13: 1->mean 171.0 [138..204] n=6  2->mean 161.0 [144..180] n=6  3->mean 161.0 [144..198] n=6  4->mean 176.4 [150..192] n=5  5->mean 172.8 [150..198] n=5  6->mean 174.0 [144..198] n=6
//   powers of 2:  d=2(v2=1):G=150  d=4(v2=2):G=150  d=8(v2=3):G=198  d=16(v2=4):G=198  d=32(v2=5):G=144  d=64(v2=6):G=168  d=128(v2=7):G=150
//   top-10 normalized G_d/(P/slots): d=6:8.90  d=18:8.59  d=72:8.28  d=52:8.18  d=30:8.12  d=102:8.00  d=118:7.96  d=84:7.87  d=198:7.81  d=8:7.73
//   bottom-3: d=190:5.29  d=34:5.25  d=140:5.25
//   raw hardest: d=118 G=204   (G_2=150)
//
// ================ level p=23  P#=223092870  (1.5s) ================
//   d=2  slots=7952175  G_d=204  ratio=7.27
//   d=4  slots=7952175  G_d=186  ratio=6.63
//   d=8  slots=7952175  G_d=210  ratio=7.49
//   d=16  slots=7952175  G_d=264  ratio=9.41
// READINGS.
// 1. DENSITY SETS THE SCALE, confirmed across all 105 differences: slot
//    counts follow the Hardy-Littlewood hierarchy exactly (factor (p-1)/(p-2)
//    per odd p | d with p <= p_n), 15-21 distinct density classes per level,
//    and mean-normalized G_d stays in a narrow band (5.25-8.90 at 19#) while
//    raw G_d spans 58-204. Attack-06's readings 1 and 4 hold over the full
//    range.
// 2. THE ATTACK-06 "SURPRISE" WAS A COINCIDENCE, NOT A LAW. At 23# the
//    power-of-2 quadruple splits four ways: G_2=204, G_4=186, G_8=210,
//    G_16=264 — the 19# pairing G_2=G_4 < G_8=G_16 dissolves. Extending to
//    d=32,64,128 already kills v2-monotonicity at every level (19#:
//    v2=1..7 -> 150 150 198 198 144 168 150). No v2 law exists.
// 3. NO SIMPLE STATISTIC DETERMINES G_d WITHIN A DENSITY CLASS. Probes on
//    v2(d) and +-d mod 5,7,11,13 (mod 3 is forced constant by the symmetry
//    G_d = G_{-d}): group means differ by far less than within-group spread
//    (e.g. 19# twin class: every probe cell spans ~[144..198] against a
//    class-wide range [138..204]), and the orderings FLIP between levels
//    (mod 7 class order is 1>2>3 at 19#, 3>2>1 at 17#, 1>2>3-ish at 13#).
//    Sole faint signal: d == +-2 (mod 5) has a higher mean than d == +-1
//    (mod 5) at all three levels (78.3 vs 73.5, 120.9 vs 113.0, 171.5 vs
//    166.6) — a consistent ~4-7% tilt, but ranges overlap almost entirely;
//    flag as unconfirmed, not a law. Conclusion: G_d behaves as a genuinely
//    extremal statistic of the full residue tuple (-d mod p)_{p <= p_n},
//    with no low-complexity sufficient statistic among the natural
//    candidates. NEGATIVE RESULT, stated as such.
// 4. HARDEST DIFFERENCE AFTER DENSITY NORMALIZATION: the DENSE differences.
//    At 19# the top ratios are d=6 (8.90), d=18 (8.59), d=72 (8.28) — all
//    multiples of 6 — while d=2 sits at 5.86, which is rank 85 of 105, in the
//    bottom fifth. (⚠ CORRECTED 2026-08-17: this line read "d=2 sits mid-pack
//    at 5.86". The table above refutes it. Ranking every even d <= 210 by the
//    normalized ratio puts d=2 at 89/105 at 13#, 76/105 at 17# and 85/105 at
//    19#, always in the bottom quarter. "Mid-pack" is the RAW picture, where
//    G_2 ranks 35/105, 31/105 and 33/105. The correction strengthens the
//    reading rather than weakening it.) Raw hardest at 19# is d=118 (G=204).
//    Either way, difference 2 is NOT extremal: TPC's specific difference is
//    one of the comparatively easy ones, mid-pack raw and near the bottom
//    normalized. And max_{d<=210} G_d = 204 at 19# still sits well below
//    Ziller-Morack's all-class h2 = 258 (A288815) — attack-06 reading 3
//    survives the 7x wider sweep.
// 5. JACOBSTHAL-TYPE GROWTH of the normalized gap, per fixed d: for d=2 the
//    ratio G_2*slots/P# runs 3.26 -> 4.71 -> 5.86 -> 7.27 at n = 6,7,8,9
//    primes — near-linear in n. (⚠ CORRECTED 2026-08-17: this line cited
//    "the all-class Jacobsthal function in attack-05". Both halves were
//    wrong. attack-05-annulus-induction.js contains no Jacobsthal content,
//    and the d=2 column here is not an all-class object: it IS the twin
//    Jacobsthal ladder G_2, whose ladder 66, 108, 150, 204 at 13#..23#
//    matches 05-twin-jacobsthal.js term for term. So the comparison is with
//    that file, and it is the same object measured twice rather than an
//    independent match. The all-class h2 = A288815 is a different sequence,
//    used only in reading 3.) The fluctuation between
//    differences (reading 3) rides on top of this deterministic drift.
// 6. CONJECTURE (the honest one). Within a fixed density class, G_d is NOT a
//    function of any bounded-complexity invariant of d (v2, single residues,
//    or their pairs); the map d -> G_d is determined only by the full tuple
//    (-d mod p)_p, and the normalized ratio G_d/(P#/slots) for every even d
//    is Theta(n) with constants depending on the density class — i.e. every
//    fixed difference obeys the same Jacobsthal-type law as d=2, and no
//    fixed difference is asymptotically special. Supporting table: readings
//    2, 3, 5 above.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// TOKENIZER ARTIFACT, not a figure:
//   the two hyphenated ranges in reading 1, 5.25-8.90 and 58-204, make the
//   scanner read the upper endpoint as negative. All four endpoints are in
//   the p=19 section: 8.90 heads its top-10 normalized line and 5.25 its
//   bottom-3 line, and its G-value lines run from 58 at d=210 up to 204 at
//   d=118.
//   32,64,128 in reading 2 is the list of powers of two being probed. Each is
//   a d label in the p=19 twin class G-value line, at G = 144, 168 and 150.
//   5,7,11,13 in reading 3 is the list of probe moduli. Each has its own
//   "+-d mod" line at every level.
//   6,7,8,9 in reading 5 is the count of primes at levels 13#, 17#, 19#, 23#,
//   written as a list.
//   288815 is the digits of the OEIS identifier A288815.
// DERIVED IN THIS READING by arithmetic over printed values: the normalized
//   ladder 3.26 -> 4.71 -> 5.86 -> 7.27 of reading 5 is G_2 * slots / P#, all
//   three inputs printed at each level. 66 * 1485 / 30030 = 3.2637,
//   108 * 22275 / 510510 = 4.7123, 150 * 378675 / 9699690 = 5.8560, and
//   204 * 7952175 / 223092870 = 7.2716, which the run prints as 7.27 on its
//   own d=2 line at p=23. The 5.86 quoted again in reading 4 is the same
//   p=19 value. Checked.
// DEFINITION / LITERATURE constants: the all-class Jacobsthal value
//   h2 = 258 and its sequence A288815, credited to Ziller and Morack in
//   readings 4 and 5, are third-party and are not computed here.
// ---------------------------------------------------------------------------
