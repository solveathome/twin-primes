// tilegap.c -- exact G2(b#) by tile-major bit-parallel enumeration.
//
// G2(b#) = max gap between consecutive r mod b# with r !≡ 0 and r !≡ -2 (mod p)
// for every prime p <= b.  (The twin-Jacobsthal function on the primorial.)
//
// METHOD.  Fix a base wheel v < b.  T_v has D = D_v slots s[0..D) in [0,v#).
// Every integer in [0,b#) surviving the primes <= v is s[i] + j*v# for a unique
// (i,j), j in [0,NCOPY), NCOPY = b#/v#.  Slot (i,j) is killed by a big prime
// p in (v,b] iff s[i] ≡ c_p(j) or c_p(j)-2 (mod p), with c_p(j) = (-j*v#) mod p.
//
// The usual layout streams, per copy j, 2*nbig rows of D/64 words; that is
// memory bound.  Here the loops are INVERTED: the slot tile is cut into w-tiles
// of WT words, the per-tile residue masks (a few hundred KB) are built once and
// stay in cache, and the inner loop runs over all NCOPY copies.  The gap VALUE
// of a run from slot i1 to slot i2 is s[i2]-s[i1], INDEPENDENT of j, so nothing
// has to be reassembled in position order.
//
// Runs straddling the copy seam are caught by extending the tile with
// s[D+t] = s[t] + v#.  A run is recorded by the tile owning its OPENING
// survivor, so every run is seen exactly once and none is seen twice.
//
// ARITHMETIC.  Every position is uint64.  43# = 1.308e16 and 47# = 6.149e17
// both exceed 2^53, so a double on the position path would silently round;
// --selftest exhibits that (47# in double is off by 18) and shows the uint64
// path is exact.  No double occurs anywhere except in timing printouts.
//
// THRESHOLD.  Only dead runs of >= THRESH T_v slots are examined.  That is safe
// iff maxsum_THRESH(T_v) < the reported G2, where maxsum_m(T_v) is the largest
// span of m consecutive T_v gaps (tabulated by tv.c).  The caller must check it;
// the run of dead slots realising the reported gap is printed so it can be.
//
// Usage: tilegap v b [threads] [THRESH] [WT] [OV] [groupsize]
//        tilegap --selftest
//        tilegap --verify b pos
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include <pthread.h>
#include <time.h>

static int primes[64], np;
static void gen_primes(int lim) {
  np = 0;
  for (int n = 2; n <= lim; n++) { int ok = 1; for (int d = 2; d * d <= n; d++) if (n % d == 0) { ok = 0; break; } if (ok) primes[np++] = n; }
}

static int v, b, NT, THRESH, WT, OV, GSZ;
static uint64_t Pv, D, DE, NCOPY, WD;
static uint64_t *S;
static int bigp[16], nbig;
static uint64_t PvModP[16];
static uint64_t lastWordMask;
static int HALF, SH[4];

typedef struct {
  uint64_t survivors;
  uint64_t bestGap, bestGapI1, bestGapJ;
  uint64_t bestGapCount, bestGapMinPos;   // multiplicity of the max, and its least position
  uint64_t bestRun, bestRunI1, bestRunJ;
  uint64_t candidates, overflow;
  char pad[64];
} res_t;
static res_t *R;

static uint64_t nextTile;
static pthread_mutex_t tileLock = PTHREAD_MUTEX_INITIALIZER;

typedef struct {
  int tid;
  uint64_t *alive, *candw, *G[16], *T;
  uint64_t nwxMax;
} tls_t;

static inline uint64_t filt(uint64_t x) {           // >=HALF consecutive 1s start here
  uint64_t f = x;
  f &= f >> SH[0]; f &= f >> SH[1]; f &= f >> SH[2]; f &= f >> SH[3];
  return f;
}

static void *worker(void *arg) {
  tls_t *L = (tls_t *)arg;
  res_t *r = &R[L->tid];
  memset(r, 0, sizeof(*r));
  const uint64_t nwxMax = L->nwxMax;
  uint64_t growth = 1; for (int k = 0; k < GSZ; k++) growth *= (uint64_t)bigp[k];

  for (;;) {
    uint64_t t;
    pthread_mutex_lock(&tileLock); t = nextTile++; pthread_mutex_unlock(&tileLock);
    uint64_t wa = t * (uint64_t)WT;
    if (wa >= WD) break;
    uint64_t wb = wa + (uint64_t)WT; if (wb > WD) wb = WD;
    const uint64_t nw = wb - wa, nwx = nw + (uint64_t)OV;
    const uint64_t slotLo = wa * 64, slotHi = (wb + (uint64_t)OV) * 64;
    if (slotHi > DE) { fprintf(stderr, "FATAL: pad too small\n"); exit(2); }

    // residue masks, then the (c, c-2) dead masks
    for (int k = 0; k < nbig; k++) {
      int p = bigp[k];
      uint64_t *M = L->G[k];
      memset(M, 0, (size_t)p * nwxMax * 8);
      for (uint64_t i = slotLo; i < slotHi; i++) {
        uint64_t rr = S[i] % (uint64_t)p, o = i - slotLo;
        M[rr * nwxMax + (o >> 6)] |= 1ULL << (o & 63);
      }
    }
    for (int k = 0; k < nbig; k++) {
      int p = bigp[k];
      uint64_t *M = L->G[k];
      uint64_t *tmp = malloc((size_t)p * nwx * 8);
      for (int cc = 0; cc < p; cc++) {
        int c2 = cc - 2; if (c2 < 0) c2 += p;
        for (uint64_t w = 0; w < nwx; w++) tmp[(uint64_t)cc * nwx + w] = M[(uint64_t)cc * nwxMax + w] | M[(uint64_t)c2 * nwxMax + w];
      }
      for (int cc = 0; cc < p; cc++) for (uint64_t w = 0; w < nwx; w++) M[(uint64_t)cc * nwxMax + w] = tmp[(uint64_t)cc * nwx + w];
      free(tmp);
    }
    if (GSZ >= 2) {
      for (uint64_t idx = 0; idx < growth; idx++) {
        uint64_t q = idx; const uint64_t *sp[8]; int n = 0;
        for (int k = GSZ - 1; k >= 0; k--) { sp[k] = L->G[k] + (q % (uint64_t)bigp[k]) * nwxMax; q /= (uint64_t)bigp[k]; n++; }
        uint64_t *d = L->T + idx * nwxMax;
        for (uint64_t w = 0; w < nwx; w++) { uint64_t x = sp[0][w]; for (int k = 1; k < n; k++) x |= sp[k][w]; d[w] = x; }
      }
    }

    int c[16]; for (int k = 0; k < nbig; k++) c[k] = 0;
    uint64_t *alive = L->alive, *candw = L->candw;
    const uint64_t lastOwn = (wb == WD) ? (nw - 1) : (uint64_t)-1;

    for (uint64_t j = 0; j < NCOPY; j++) {
      const uint64_t *src[16]; int ns = 0;
      if (GSZ >= 2) {
        uint64_t gi = 0;
        for (int k = 0; k < GSZ; k++) gi = gi * (uint64_t)bigp[k] + (uint64_t)c[k];
        src[ns++] = L->T + gi * nwxMax;
        for (int k = GSZ; k < nbig; k++) src[ns++] = L->G[k] + (uint64_t)c[k] * nwxMax;
      } else for (int k = 0; k < nbig; k++) src[ns++] = L->G[k] + (uint64_t)c[k] * nwxMax;

      uint64_t ncand = 0;
      // ---- phase A ------------------------------------------------------
      if (ns == 1) {
        const uint64_t *s0 = src[0];
        for (uint64_t w = 0; w < nwx; w++) { uint64_t d = s0[w]; alive[w] = ~d;
          if (__builtin_expect(filt(d) != 0, 0)) candw[ncand++] = w; }
      } else if (ns == 2) {
        const uint64_t *s0 = src[0], *s1 = src[1];
        for (uint64_t w = 0; w < nwx; w++) { uint64_t d = s0[w] | s1[w]; alive[w] = ~d;
          if (__builtin_expect(filt(d) != 0, 0)) candw[ncand++] = w; }
      } else if (ns == 3) {
        const uint64_t *s0 = src[0], *s1 = src[1], *s2 = src[2];
        for (uint64_t w = 0; w < nwx; w++) { uint64_t d = s0[w] | s1[w] | s2[w]; alive[w] = ~d;
          if (__builtin_expect(filt(d) != 0, 0)) candw[ncand++] = w; }
      } else if (ns == 4) {
        const uint64_t *s0 = src[0], *s1 = src[1], *s2 = src[2], *s3 = src[3];
        for (uint64_t w = 0; w < nwx; w++) { uint64_t d = s0[w] | s1[w] | s2[w] | s3[w]; alive[w] = ~d;
          if (__builtin_expect(filt(d) != 0, 0)) candw[ncand++] = w; }
      } else {
        for (uint64_t w = 0; w < nwx; w++) { uint64_t d = src[0][w];
          for (int k = 1; k < ns; k++) d |= src[k][w];
          alive[w] = ~d;
          if (__builtin_expect(filt(d) != 0, 0)) candw[ncand++] = w; }
      }
      // ---- survivor count (separate, auto-vectorises) ---------------------
      { uint64_t pc = 0;
        for (uint64_t w = 0; w < nw; w++) pc += (uint64_t)__builtin_popcountll(alive[w]);
        if (lastOwn != (uint64_t)-1) pc -= (uint64_t)__builtin_popcountll(alive[lastOwn] & ~lastWordMask);
        r->survivors += pc; }

      // ---- phase B: exact runs around candidate words ---------------------
      // One run can be reached from several candidate words (it may span two).
      // Anchors are visited in increasing position, so a run's i1 is
      // non-decreasing and duplicates are adjacent: one variable suffices.
      int64_t lastI1 = -2;
      for (uint64_t ci = 0; ci < ncand; ci++) {
        uint64_t w = candw[ci];
        r->candidates++;
        uint64_t f = filt(~alive[w]);
        while (f) {
          int st = __builtin_ctzll(f);
          uint64_t abs0 = w * 64 + (uint64_t)st;
          int64_t i1 = -1, i2 = -1;
          { uint64_t p1 = abs0;                       // walk left
            for (;;) { uint64_t ww = p1 >> 6;
              uint64_t av = alive[ww] & (((p1 & 63) == 63) ? ~0ULL : ((1ULL << ((p1 & 63) + 1)) - 1));
              if (av) { i1 = (int64_t)(ww * 64 + (uint64_t)(63 - __builtin_clzll(av))); break; }
              if (ww == 0) break;
              p1 = ww * 64 - 1; } }
          { uint64_t p2 = abs0;                       // walk right
            while (p2 < nwx * 64) { uint64_t ww = p2 >> 6;
              uint64_t av = alive[ww] & (~0ULL << (p2 & 63));
              if (av) { i2 = (int64_t)(ww * 64 + (uint64_t)__builtin_ctzll(av)); break; }
              p2 = (ww + 1) * 64; } }
          // retire every filter bit inside [i1+1, i2-1] within this word
          { uint64_t lo = (i1 < 0) ? 0 : (uint64_t)i1 + 1;
            uint64_t hi = (i2 < 0) ? (nwx * 64 - 1) : (uint64_t)i2 - 1;
            uint64_t wlo = w * 64, whi = wlo + 63;
            uint64_t a0 = lo > wlo ? lo : wlo, a1 = hi < whi ? hi : whi;
            if (a1 >= a0) {
              uint64_t clr = (a1 - a0 == 63) ? ~0ULL : (((1ULL << (a1 - a0 + 1)) - 1) << (a0 - wlo));
              f &= ~clr;
            } else f &= ~(1ULL << st); }
          if (i1 < 0) continue;                       // opened in the previous tile
          uint64_t oi1 = (uint64_t)i1 + wa * 64;
          if (oi1 >= wb * 64 || oi1 >= D) continue;   // owned by another tile
          if (i2 < 0) { r->overflow++; continue; }    // OURS and ran off the pad: real
          uint64_t oi2 = (uint64_t)i2 + wa * 64;
          if ((int64_t)oi1 == lastI1) continue;       // same run, reached twice
          lastI1 = (int64_t)oi1;
          if (oi1 >= wb * 64 || oi1 >= D) continue;   // owned elsewhere
          uint64_t run = oi2 - oi1 - 1;
          if (run < (uint64_t)THRESH) continue;
          uint64_t gap = S[oi2] - S[oi1];
          if (gap >= r->bestGap) {
            uint64_t gpos = S[oi1] + j * Pv;
            if (gap > r->bestGap) { r->bestGap = gap; r->bestGapI1 = oi1; r->bestGapJ = j;
                                    r->bestGapCount = 1; r->bestGapMinPos = gpos; }
            else { r->bestGapCount++; if (gpos < r->bestGapMinPos) r->bestGapMinPos = gpos; }
          }
          if (run > r->bestRun) { r->bestRun = run; r->bestRunI1 = oi1; r->bestRunJ = j; }
        }
      }
      for (int k = 0; k < nbig; k++) { c[k] -= (int)PvModP[k]; if (c[k] < 0) c[k] += bigp[k]; }
    }
  }
  return NULL;
}

static int isSlot(uint64_t x, int upto) {
  for (int i = 0; i < np; i++) { int p = primes[i]; if (p > upto) break;
    if (x % (uint64_t)p == 0) return 0;
    if ((x + 2) % (uint64_t)p == 0) return 0; }
  return 1;
}

static void selftest(void) {
  uint64_t big = (1ULL << 53) + 1;
  printf("selftest: 2^53+1 = %llu, round-trip through double = %.0f  -> %s\n",
         (unsigned long long)big, (double)big,
         ((uint64_t)(double)big == big) ? "EQUAL (bad)" : "DIFFERENT (as expected)");
  gen_primes(53);
  uint64_t p41 = 1, p43 = 1, p47 = 1, p53 = 1;
  for (int i = 0; i < np; i++) { uint64_t p = (uint64_t)primes[i];
    if (primes[i] <= 41) p41 *= p; if (primes[i] <= 43) p43 *= p;
    if (primes[i] <= 47) p47 *= p; if (primes[i] <= 53) p53 *= p; }
  printf("selftest: 41# = %llu   > 2^53? %s\n", (unsigned long long)p41, p41 > (1ULL << 53) ? "yes" : "no");
  printf("selftest: 43# = %llu   > 2^53? %s   43#/41# = %llu\n", (unsigned long long)p43,
         p43 > (1ULL << 53) ? "yes" : "no", (unsigned long long)(p43 / p41));
  printf("selftest: 47# = %llu   > 2^53? %s   47#/43# = %llu\n", (unsigned long long)p47,
         p47 > (1ULL << 53) ? "yes" : "no", (unsigned long long)(p47 / p43));
  double d47 = 1; for (int i = 0; i < np; i++) if (primes[i] <= 47) d47 *= (double)primes[i];
  printf("selftest: 47# accumulated in double = %.0f, error = %lld  <-- the trap\n",
         d47, (long long)((int64_t)d47 - (int64_t)p47));
  // generic positions in [0,43#) are not double-representable
  uint64_t q = p43 - 3, bad = 0;
  for (uint64_t x = q; x > q - 200; x--) if ((uint64_t)(double)x != x) bad++;
  printf("selftest: of 200 consecutive integers just under 43#, %llu are NOT exactly\n"
         "          representable as a double.  Positions must not go through one.\n",
         (unsigned long long)bad);
  printf("selftest: 53# = %llu   fits u64? %s  (53# needs __int128; this tool stops at 47#)\n",
         (unsigned long long)p53, (p53 / 53 == p47) ? "yes" : "NO -- OVERFLOWED");
}

int main(int argc, char **argv) {
  if (argc > 1 && strcmp(argv[1], "--selftest") == 0) { selftest(); return 0; }
  if (argc > 1 && strcmp(argv[1], "--verify") == 0) {
    b = atoi(argv[2]); gen_primes(b);
    uint64_t pos = strtoull(argv[3], NULL, 10);
    printf("verify b=%d pos=%llu  isSlot=%s\n", b, (unsigned long long)pos, isSlot(pos, b) ? "YES" : "NO");
    uint64_t q = pos + 1; while (!isSlot(q, b)) q++;
    printf("  next slot %llu   gap forward  = %llu\n", (unsigned long long)q, (unsigned long long)(q - pos));
    uint64_t z = pos - 1; while (!isSlot(z, b)) z--;
    printf("  prev slot %llu   gap backward = %llu\n", (unsigned long long)z, (unsigned long long)(pos - z));
    return 0;
  }
  v = atoi(argv[1]); b = atoi(argv[2]);
  NT = argc > 3 ? atoi(argv[3]) : 10;
  THRESH = argc > 4 ? atoi(argv[4]) : 10;
  WT = argc > 5 ? atoi(argv[5]) : 256;
  OV = argc > 6 ? atoi(argv[6]) : 8;
  GSZ = argc > 7 ? atoi(argv[7]) : -1;
  HALF = (THRESH + 1) / 2; if (HALF < 1) HALF = 1;
  { int need = HALF - 1, sh = 1, n = 0;
    SH[0] = SH[1] = SH[2] = SH[3] = 0;
    while (need > 0 && n < 4) { int s = (sh <= need) ? sh : need; SH[n++] = s; need -= s; sh <<= 1; }
    if (need > 0) { fprintf(stderr, "HALF too large\n"); return 1; } }

  gen_primes(b);
  Pv = 1; for (int i = 0; i < np; i++) if (primes[i] <= v) Pv *= (uint64_t)primes[i];
  nbig = 0; for (int i = 0; i < np; i++) if (primes[i] > v && primes[i] <= b) bigp[nbig++] = primes[i];
  if (!nbig) { fprintf(stderr, "need v < b\n"); return 1; }
  NCOPY = 1; for (int k = 0; k < nbig; k++) NCOPY *= (uint64_t)bigp[k];
  for (int k = 0; k < nbig; k++) PvModP[k] = Pv % (uint64_t)bigp[k];

  uint64_t Dpred = 1; for (int i = 0; i < np; i++) if (primes[i] >= 3 && primes[i] <= v) Dpred *= (uint64_t)(primes[i] - 2);
  uint64_t PADSLOTS = 64ULL * (uint64_t)(OV + 1);
  DE = Dpred + PADSLOTS;
  S = malloc((size_t)DE * 8);
  if (!S) { fprintf(stderr, "oom S\n"); return 1; }
  { const uint64_t SEG = 1u << 22; uint8_t *seg = malloc(SEG); uint64_t n = 0;
    for (uint64_t base = 0; base < Pv; base += SEG) {
      uint64_t len = (base + SEG <= Pv) ? SEG : (Pv - base);
      memset(seg, 0, len);
      for (int i = 0; i < np; i++) { if (primes[i] > v) break; uint64_t p = (uint64_t)primes[i];
        for (uint64_t x = (p - base % p) % p; x < len; x += p) seg[x] = 1;
        uint64_t s2 = (p - 2) % p;
        for (uint64_t x = (s2 + p - base % p) % p; x < len; x += p) seg[x] = 1; }
      for (uint64_t x = 0; x < len; x++) if (!seg[x]) { if (n < Dpred) S[n] = base + x; n++; } }
    free(seg);
    if (n != Dpred) { fprintf(stderr, "FATAL D mismatch %llu vs %llu\n", (unsigned long long)n, (unsigned long long)Dpred); return 1; }
    D = n;
    // extended tile: slot D+t is slot (t mod D) of copy (1 + t/D) ahead.  The
    // dead-mask residue S[D+t] mod p already carries the copy shift, so a run
    // crossing the copy seam is scanned with the correct residues.
    for (uint64_t t = 0; t < PADSLOTS; t++) S[D + t] = S[t % D] + (1 + t / D) * Pv; }
  WD = (D + 63) / 64;
  { uint64_t lastBits = D - (WD - 1) * 64;
    lastWordMask = (lastBits == 64) ? ~0ULL : ((1ULL << lastBits) - 1); }
  if ((uint64_t)WT > WD) WT = (int)WD;

  if (GSZ < 0) {
    uint64_t prod = 1; GSZ = 0;
    for (int k = 0; k < nbig - 1; k++) {
      uint64_t n2 = prod * (uint64_t)bigp[k];
      if (n2 * (uint64_t)(WT + OV) * 8 > (1u << 19)) break;
      if (n2 * 8 > NCOPY) break;
      prod = n2; GSZ = k + 1; }
    if (GSZ < 2) GSZ = 0; }
  uint64_t growth = 1; for (int k = 0; k < GSZ; k++) growth *= (uint64_t)bigp[k];

  uint64_t Db = 1; for (int i = 0; i < np; i++) if (primes[i] >= 3 && primes[i] <= b) Db *= (uint64_t)(primes[i] - 2);
  fprintf(stderr, "v=%d b=%d v#=%llu D_v=%llu nbig=%d NCOPY=%llu D_b(pred)=%llu\n",
          v, b, (unsigned long long)Pv, (unsigned long long)D, nbig, (unsigned long long)NCOPY, (unsigned long long)Db);
  fprintf(stderr, "  WD=%llu tiles=%llu WT=%d OV=%d THRESH=%d HALF=%d(sh %d,%d,%d,%d) group=%d(%llu rows) NT=%d\n",
          (unsigned long long)WD, (unsigned long long)((WD + WT - 1) / WT), WT, OV, THRESH, HALF,
          SH[0], SH[1], SH[2], SH[3], GSZ, (unsigned long long)growth, NT);
  uint64_t nwxMax = (uint64_t)WT + (uint64_t)OV, perThread = 0;
  for (int k = 0; k < nbig; k++) perThread += (uint64_t)bigp[k] * nwxMax * 8;
  perThread += growth * nwxMax * 8;
  fprintf(stderr, "  tables %.2f MB/thread  %.2f MB total\n", perThread / 1048576.0, perThread * NT / 1048576.0);

  tls_t *L = calloc(NT, sizeof(tls_t));
  R = calloc(NT, sizeof(res_t));
  for (int t = 0; t < NT; t++) {
    L[t].tid = t; L[t].nwxMax = nwxMax;
    L[t].alive = malloc((size_t)nwxMax * 8);
    L[t].candw = malloc((size_t)nwxMax * 8);
    for (int k = 0; k < nbig; k++) L[t].G[k] = malloc((size_t)bigp[k] * nwxMax * 8);
    L[t].T = (GSZ >= 2) ? malloc((size_t)growth * nwxMax * 8) : NULL; }

  nextTile = 0;
  struct timespec t0, t1; clock_gettime(CLOCK_MONOTONIC, &t0);
  pthread_t th[64];
  for (int t = 0; t < NT; t++) pthread_create(&th[t], NULL, worker, &L[t]);
  for (int t = 0; t < NT; t++) pthread_join(th[t], NULL);
  clock_gettime(CLOCK_MONOTONIC, &t1);
  double secs = (t1.tv_sec - t0.tv_sec) + 1e-9 * (t1.tv_nsec - t0.tv_nsec);

  uint64_t surv = 0, bestGap = 0, bi1 = 0, bj = 0, bestRun = 0, ri1 = 0, rj = 0, cands = 0, ovf = 0;
  for (int t = 0; t < NT; t++) {
    surv += R[t].survivors; cands += R[t].candidates; ovf += R[t].overflow;
    if (R[t].bestGap > bestGap) { bestGap = R[t].bestGap; bi1 = R[t].bestGapI1; bj = R[t].bestGapJ; }
    if (R[t].bestRun > bestRun) { bestRun = R[t].bestRun; ri1 = R[t].bestRunI1; rj = R[t].bestRunJ; } }
  uint64_t gcount = 0, gminpos = ~0ULL;
  for (int t = 0; t < NT; t++) if (R[t].bestGap == bestGap) {
    gcount += R[t].bestGapCount;
    if (R[t].bestGapMinPos < gminpos) gminpos = R[t].bestGapMinPos; }
  uint64_t pos = S[bi1] + bj * Pv, rpos = S[ri1] + rj * Pv;
  printf("v=%d b=%d threads=%d THRESH=%d WT=%d group=%d\n", v, b, NT, THRESH, WT, GSZ);
  printf("T_v slots in b#: %llu\n", (unsigned long long)(D * NCOPY));
  printf("survivors = %llu   D_b = %llu   match=%s\n", (unsigned long long)surv,
         (unsigned long long)Db, surv == Db ? "YES" : "NO");
  printf("G2(b#) = %llu   at pos %llu   (i=%llu j=%llu)\n", (unsigned long long)bestGap,
         (unsigned long long)pos, (unsigned long long)bi1, (unsigned long long)bj);
  printf("maxima: count=%llu   least position = %llu\n",
         (unsigned long long)gcount, (unsigned long long)gminpos);
  printf("max dead run of T_v slots = %llu   at pos %llu\n", (unsigned long long)bestRun, (unsigned long long)rpos);
  printf("candidates=%llu overflow=%llu wall=%.2f s words=%llu words/s=%.3e\n",
         (unsigned long long)cands, (unsigned long long)ovf, secs,
         (unsigned long long)(D * NCOPY / 64), (double)(D * NCOPY / 64) / secs);
  if (ovf) printf("!!! OVERFLOW: a dead run ran past the tile pad -- NOT trustworthy\n");
  return 0;
}
