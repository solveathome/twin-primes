// tilegap2.c -- same mathematics as tilegap.c, restructured for speed.
//
// Differences from tilegap.c (both are kept, and both are run, so that
// agreement is evidence and not a shared bug):
//   * phase A is split into branch-free loops that clang vectorises to NEON,
//     writing alive[] and the run-filter output fb[] plus one OR-summary word
//     per 8-word block;
//   * big primes are combined in PAIRS into precomputed dead-mask tables, so
//     the inner loop reads ceil(nbig/2)+ rows instead of nbig;
//   * candidate location is a block scan of the summary words, not a per-word
//     branch.
// The run analysis and the ownership rule are the same, deliberately: they are
// the part that was validated against brute force.
//
// Usage: tilegap2 v b [threads] [THRESH] [WT] [OV] [npairs] [budgetKB]
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

static int v, b, NT, THRESH, WT, OV, NPAIR;
static uint64_t Pv, D, DE, NCOPY, WD;
static uint64_t *S;
static int bigp[16], nbig;
static uint64_t PvModP[16];
static uint64_t lastWordMask;
static int HALF, SH[4];
static int pairA[8], pairB[8], npair;          // paired big-prime indices
static int sing[16], nsing;                    // unpaired big-prime indices
static uint64_t prows[8];
static uint64_t TLO, THI;                      // process tiles [TLO,THI) only
static uint64_t MAXCOPY;                       // probe mode: only the first MAXCOPY copies

typedef struct {
  uint64_t survivors;
  uint64_t bestGap, bestGapI1, bestGapJ, bestGapCount, bestGapMinPos;
  uint64_t bestRun, bestRunI1, bestRunJ;
  uint64_t candidates, overflow;
  char pad[64];
} res_t;
static res_t *R;
static uint64_t nextTile;
static pthread_mutex_t tileLock = PTHREAD_MUTEX_INITIALIZER;

typedef struct {
  int tid;
  uint64_t *av, *fb, *ob, *candw, *G[16], *PT[8];
  uint64_t nwm;                                 // row stride in words
} tls_t;

static void *worker(void *arg) {
  tls_t *L = (tls_t *)arg;
  // Accumulate into a STACK-LOCAL result and publish once at the end.  R[] is a
  // packed array and sizeof(res_t) is not a multiple of the 128-byte line, so
  // some pairs of threads share a line; survivors is bumped once per copy,
  // which is billions of times, and the line would ping-pong the whole run.
  res_t local; memset(&local, 0, sizeof(local));
  res_t *r = &local;
  const uint64_t nwm = L->nwm;
  const int s0 = SH[0], s1 = SH[1], s2 = SH[2], s3 = SH[3];

  for (;;) {
    uint64_t t;
    pthread_mutex_lock(&tileLock); t = nextTile++; pthread_mutex_unlock(&tileLock);
    if (t >= THI) break;
    uint64_t wa = t * (uint64_t)WT;
    if (wa >= WD) break;
    uint64_t wb = wa + (uint64_t)WT; if (wb > WD) wb = WD;
    const uint64_t nw = wb - wa, nwx = nw + (uint64_t)OV;
    const uint64_t nwx8 = (nwx + 7) & ~7ULL;
    const uint64_t slotLo = wa * 64, slotHi = (wb + (uint64_t)OV) * 64;
    if (slotHi > DE || nwx8 > nwm) { fprintf(stderr, "FATAL geometry\n"); exit(2); }

    for (int k = 0; k < nbig; k++) {
      int p = bigp[k]; uint64_t *M = L->G[k];
      memset(M, 0, (size_t)p * nwm * 8);
      for (uint64_t i = slotLo; i < slotHi; i++) {
        uint64_t rr = S[i] % (uint64_t)p, o = i - slotLo;
        M[rr * nwm + (o >> 6)] |= 1ULL << (o & 63);
      }
      uint64_t *tmp = malloc((size_t)p * nwx8 * 8);
      for (int cc = 0; cc < p; cc++) { int c2 = cc - 2; if (c2 < 0) c2 += p;
        for (uint64_t w = 0; w < nwx8; w++) tmp[(uint64_t)cc * nwx8 + w] = M[(uint64_t)cc * nwm + w] | M[(uint64_t)c2 * nwm + w]; }
      for (int cc = 0; cc < p; cc++) for (uint64_t w = 0; w < nwx8; w++) M[(uint64_t)cc * nwm + w] = tmp[(uint64_t)cc * nwx8 + w];
      free(tmp);
    }
    for (int g = 0; g < npair; g++) {
      int ka = pairA[g], kb = pairB[g], pa = bigp[ka], pb = bigp[kb];
      for (int x = 0; x < pa; x++) for (int y = 0; y < pb; y++) {
        const uint64_t *A = L->G[ka] + (uint64_t)x * nwm, *B = L->G[kb] + (uint64_t)y * nwm;
        uint64_t *d = L->PT[g] + ((uint64_t)x * (uint64_t)pb + (uint64_t)y) * nwm;
        for (uint64_t w = 0; w < nwx8; w++) d[w] = A[w] | B[w];
      }
    }

    int c[16]; for (int k = 0; k < nbig; k++) c[k] = 0;
    uint64_t *av = L->av, *fb = L->fb, *ob = L->ob, *candw = L->candw;
    const uint64_t lastOwn = (wb == WD) ? (nw - 1) : (uint64_t)-1;
    const uint64_t nblk = nwx8 / 8;
    const int ns = npair + nsing;

    const uint64_t JHI = (MAXCOPY < NCOPY) ? MAXCOPY : NCOPY;
    for (uint64_t j = 0; j < JHI; j++) {
      const uint64_t *src[16];
      for (int g = 0; g < npair; g++)
        src[g] = L->PT[g] + ((uint64_t)c[pairA[g]] * (uint64_t)bigp[pairB[g]] + (uint64_t)c[pairB[g]]) * nwm;
      for (int q = 0; q < nsing; q++) src[npair + q] = L->G[sing[q]] + (uint64_t)c[sing[q]] * nwm;

      // ---- phase A: branch-free, block of 8 words at a time ---------------
      for (uint64_t blk = 0; blk < nblk; blk++) {
        uint64_t acc = 0, base = blk * 8;
        for (int k8 = 0; k8 < 8; k8++) {
          uint64_t w = base + (uint64_t)k8;
          uint64_t d = src[0][w];
          for (int q = 1; q < ns; q++) d |= src[q][w];
          av[w] = ~d;
          uint64_t f = d & (d >> s0); f &= f >> s1; f &= f >> s2; f &= f >> s3;
          fb[w] = f; acc |= f;
        }
        ob[blk] = acc;
      }
      { uint64_t pc = 0;
        for (uint64_t w = 0; w < nw; w++) pc += (uint64_t)__builtin_popcountll(av[w]);
        if (lastOwn != (uint64_t)-1) pc -= (uint64_t)__builtin_popcountll(av[lastOwn] & ~lastWordMask);
        r->survivors += pc; }
      uint64_t ncand = 0;
      for (uint64_t blk = 0; blk < nblk; blk++)
        if (__builtin_expect(ob[blk] != 0, 0))
          for (int k8 = 0; k8 < 8; k8++) if (fb[blk * 8 + (uint64_t)k8]) candw[ncand++] = blk * 8 + (uint64_t)k8;

      // ---- phase B (identical logic to tilegap.c) -------------------------
      int64_t lastI1 = -2;
      for (uint64_t ci = 0; ci < ncand; ci++) {
        uint64_t w = candw[ci];
        r->candidates++;
        uint64_t f = fb[w];
        while (f) {
          int st = __builtin_ctzll(f);
          uint64_t abs0 = w * 64 + (uint64_t)st;
          int64_t i1 = -1, i2 = -1;
          { uint64_t p1 = abs0;
            for (;;) { uint64_t ww = p1 >> 6;
              uint64_t x = av[ww] & (((p1 & 63) == 63) ? ~0ULL : ((1ULL << ((p1 & 63) + 1)) - 1));
              if (x) { i1 = (int64_t)(ww * 64 + (uint64_t)(63 - __builtin_clzll(x))); break; }
              if (ww == 0) break; p1 = ww * 64 - 1; } }
          { uint64_t p2 = abs0;
            while (p2 < nwx8 * 64) { uint64_t ww = p2 >> 6;
              uint64_t x = av[ww] & (~0ULL << (p2 & 63));
              if (x) { i2 = (int64_t)(ww * 64 + (uint64_t)__builtin_ctzll(x)); break; }
              p2 = (ww + 1) * 64; } }
          { uint64_t lo = (i1 < 0) ? 0 : (uint64_t)i1 + 1;
            uint64_t hi = (i2 < 0) ? (nwx8 * 64 - 1) : (uint64_t)i2 - 1;
            uint64_t wlo = w * 64, whi = wlo + 63;
            uint64_t a0 = lo > wlo ? lo : wlo, a1 = hi < whi ? hi : whi;
            if (a1 >= a0) { uint64_t clr = (a1 - a0 == 63) ? ~0ULL : (((1ULL << (a1 - a0 + 1)) - 1) << (a0 - wlo)); f &= ~clr; }
            else f &= ~(1ULL << st); }
          if (i1 < 0) continue;
          uint64_t oi1 = (uint64_t)i1 + wa * 64;
          if (oi1 >= wb * 64 || oi1 >= D) continue;
          if (i2 < 0) { r->overflow++; continue; }
          uint64_t oi2 = (uint64_t)i2 + wa * 64;
          if ((int64_t)oi1 == lastI1) continue;
          lastI1 = (int64_t)oi1;
          uint64_t run = oi2 - oi1 - 1;
          if (run < (uint64_t)THRESH) continue;
          uint64_t gap = S[oi2] - S[oi1];
          if (gap >= r->bestGap) {
            uint64_t gpos = S[oi1] + j * Pv;
            if (gap > r->bestGap) { r->bestGap = gap; r->bestGapI1 = oi1; r->bestGapJ = j; r->bestGapCount = 1; r->bestGapMinPos = gpos; }
            else { r->bestGapCount++; if (gpos < r->bestGapMinPos) r->bestGapMinPos = gpos; } }
          if (run > r->bestRun) { r->bestRun = run; r->bestRunI1 = oi1; r->bestRunJ = j; }
        }
      }
      for (int k = 0; k < nbig; k++) { c[k] -= (int)PvModP[k]; if (c[k] < 0) c[k] += bigp[k]; }
    }
  }
  R[L->tid] = local;
  return NULL;
}

int main(int argc, char **argv) {
  v = atoi(argv[1]); b = atoi(argv[2]);
  NT = argc > 3 ? atoi(argv[3]) : 10;
  THRESH = argc > 4 ? atoi(argv[4]) : 10;
  WT = argc > 5 ? atoi(argv[5]) : 64;
  OV = argc > 6 ? atoi(argv[6]) : 8;
  NPAIR = argc > 7 ? atoi(argv[7]) : -1;
  uint64_t budget = (argc > 8 ? (uint64_t)atoi(argv[8]) : 1024) * 1024;
  TLO = (argc > 9) ? strtoull(argv[9], NULL, 10) : 0;
  THI = (argc > 10) ? strtoull(argv[10], NULL, 10) : ~0ULL;
  MAXCOPY = (argc > 11) ? strtoull(argv[11], NULL, 10) : ~0ULL;
  HALF = (THRESH + 1) / 2; if (HALF < 1) HALF = 1;
  { int need = HALF - 1, sh = 1, n = 0; SH[0] = SH[1] = SH[2] = SH[3] = 0;
    while (need > 0 && n < 4) { int s = (sh <= need) ? sh : need; SH[n++] = s; need -= s; sh <<= 1; }
    if (need > 0) { fprintf(stderr, "HALF too large\n"); return 1; } }

  gen_primes(b);
  Pv = 1; for (int i = 0; i < np; i++) if (primes[i] <= v) Pv *= (uint64_t)primes[i];
  nbig = 0; for (int i = 0; i < np; i++) if (primes[i] > v && primes[i] <= b) bigp[nbig++] = primes[i];
  NCOPY = 1; for (int k = 0; k < nbig; k++) NCOPY *= (uint64_t)bigp[k];
  for (int k = 0; k < nbig; k++) PvModP[k] = Pv % (uint64_t)bigp[k];

  uint64_t Dpred = 1; for (int i = 0; i < np; i++) if (primes[i] >= 3 && primes[i] <= v) Dpred *= (uint64_t)(primes[i] - 2);
  uint64_t PADSLOTS = 64ULL * (uint64_t)(OV + 2);
  DE = Dpred + PADSLOTS;
  S = malloc((size_t)DE * 8); if (!S) { fprintf(stderr, "oom S\n"); return 1; }
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
    if (n != Dpred) { fprintf(stderr, "FATAL D mismatch\n"); return 1; }
    D = n;
    for (uint64_t t = 0; t < PADSLOTS; t++) S[D + t] = S[t % D] + (1 + t / D) * Pv; }
  WD = (D + 63) / 64;
  { uint64_t lb = D - (WD - 1) * 64; lastWordMask = (lb == 64) ? ~0ULL : ((1ULL << lb) - 1); }
  if ((uint64_t)WT > WD) WT = (int)WD;
  uint64_t nwm = ((uint64_t)WT + (uint64_t)OV + 7) & ~7ULL;

  // pair the big primes from the smallest up, while the tables fit the budget
  npair = 0; nsing = 0;
  { int used[16] = {0};
    uint64_t bytes = 0;
    int lim = (NPAIR < 0) ? nbig / 2 : NPAIR;
    for (int k = 0; k + 1 < nbig && npair < lim; k += 2) {
      uint64_t rows = (uint64_t)bigp[k] * (uint64_t)bigp[k + 1];
      uint64_t nb = rows * nwm * 8;
      if (bytes + nb > budget) break;
      if (rows * 4 > NCOPY) break;
      pairA[npair] = k; pairB[npair] = k + 1; prows[npair] = rows;
      used[k] = used[k + 1] = 1; bytes += nb; npair++; }
    for (int k = 0; k < nbig; k++) if (!used[k]) sing[nsing++] = k; }

  uint64_t Db = 1; for (int i = 0; i < np; i++) if (primes[i] >= 3 && primes[i] <= b) Db *= (uint64_t)(primes[i] - 2);
  uint64_t rowbytes = 0; for (int k = 0; k < nbig; k++) rowbytes += (uint64_t)bigp[k] * nwm * 8;
  uint64_t pairbytes = 0; for (int g = 0; g < npair; g++) pairbytes += prows[g] * nwm * 8;
  fprintf(stderr, "v=%d b=%d D_v=%llu nbig=%d NCOPY=%llu D_b=%llu\n", v, b, (unsigned long long)D,
          nbig, (unsigned long long)NCOPY, (unsigned long long)Db);
  fprintf(stderr, "  WD=%llu tiles=%llu WT=%d OV=%d THRESH=%d HALF=%d sh(%d,%d,%d,%d) pairs=%d singles=%d ns=%d NT=%d\n",
          (unsigned long long)WD, (unsigned long long)((WD + WT - 1) / WT), WT, OV, THRESH, HALF,
          SH[0], SH[1], SH[2], SH[3], npair, nsing, npair + nsing, NT);
  fprintf(stderr, "  tables %.2f MB/thread (%.2f pair) -> %.2f MB total\n",
          (rowbytes + pairbytes) / 1048576.0, pairbytes / 1048576.0, (rowbytes + pairbytes) * NT / 1048576.0);

  tls_t *L = calloc(NT, sizeof(tls_t)); R = calloc(NT, sizeof(res_t));
  for (int t = 0; t < NT; t++) {
    L[t].tid = t; L[t].nwm = nwm;
    L[t].av = calloc(nwm, 8); L[t].fb = calloc(nwm, 8);
    L[t].ob = calloc(nwm / 8 + 2, 8); L[t].candw = calloc(nwm, 8);
    for (int k = 0; k < nbig; k++) L[t].G[k] = calloc((size_t)bigp[k] * nwm, 8);
    for (int g = 0; g < npair; g++) L[t].PT[g] = calloc((size_t)prows[g] * nwm, 8); }

  nextTile = TLO;
  struct timespec t0, t1; clock_gettime(CLOCK_MONOTONIC, &t0);
  pthread_t th[64];
  for (int t = 0; t < NT; t++) pthread_create(&th[t], NULL, worker, &L[t]);
  for (int t = 0; t < NT; t++) pthread_join(th[t], NULL);
  clock_gettime(CLOCK_MONOTONIC, &t1);
  double secs = (t1.tv_sec - t0.tv_sec) + 1e-9 * (t1.tv_nsec - t0.tv_nsec);

  uint64_t surv = 0, bg = 0, bi1 = 0, bj = 0, br = 0, ri1 = 0, rj = 0, cd = 0, ov = 0;
  for (int t = 0; t < NT; t++) { surv += R[t].survivors; cd += R[t].candidates; ov += R[t].overflow;
    if (R[t].bestGap > bg) { bg = R[t].bestGap; bi1 = R[t].bestGapI1; bj = R[t].bestGapJ; }
    if (R[t].bestRun > br) { br = R[t].bestRun; ri1 = R[t].bestRunI1; rj = R[t].bestRunJ; } }
  uint64_t gc = 0, gm = ~0ULL;
  for (int t = 0; t < NT; t++) if (R[t].bestGap == bg) { gc += R[t].bestGapCount; if (R[t].bestGapMinPos < gm) gm = R[t].bestGapMinPos; }
  printf("v=%d b=%d threads=%d THRESH=%d WT=%d pairs=%d\n", v, b, NT, THRESH, WT, npair);
  printf("T_v slots in b#: %llu\n", (unsigned long long)(D * NCOPY));
  printf("survivors = %llu   D_b = %llu   match=%s\n", (unsigned long long)surv, (unsigned long long)Db, surv == Db ? "YES" : "NO");
  printf("G2(b#) = %llu   at pos %llu   (i=%llu j=%llu)\n", (unsigned long long)bg,
         (unsigned long long)(S[bi1] + bj * Pv), (unsigned long long)bi1, (unsigned long long)bj);
  printf("maxima: count=%llu   least position = %llu\n", (unsigned long long)gc, (unsigned long long)gm);
  printf("max dead run of T_v slots = %llu   at pos %llu\n", (unsigned long long)br, (unsigned long long)(S[ri1] + rj * Pv));
  uint64_t alltiles = (WD + (uint64_t)WT - 1) / (uint64_t)WT;
  uint64_t hi = (THI < alltiles) ? THI : alltiles;
  uint64_t dones = (hi > TLO) ? (hi - TLO) : 0;
  uint64_t donec = (MAXCOPY < NCOPY) ? MAXCOPY : NCOPY;
  double frac = ((double)dones / (double)alltiles) * ((double)donec / (double)NCOPY);
  uint64_t allwords = D * NCOPY / 64;
  printf("candidates=%llu overflow=%llu wall=%.2f s words(full)=%llu\n",
         (unsigned long long)cd, (unsigned long long)ov, secs, (unsigned long long)allwords);
  printf("tiles done %llu/%llu  words/s=%.4e  FULL RUN PROJECTION = %.1f s = %.3f h\n",
         (unsigned long long)dones, (unsigned long long)alltiles,
         (double)allwords * frac / secs, secs / frac, secs / frac / 3600.0);
  printf("CHUNK tiles [%llu,%llu) of %llu   copies %llu of %llu\n",
         (unsigned long long)TLO, (unsigned long long)hi, (unsigned long long)alltiles,
         (unsigned long long)donec, (unsigned long long)NCOPY);
  if (dones < alltiles || MAXCOPY < NCOPY)
    printf("*** PARTIAL: %.4f%% of the run. Combine chunks before quoting a value.\n", 100.0 * frac);
  if (ov) printf("!!! OVERFLOW -- NOT trustworthy\n");
  return 0;
}
