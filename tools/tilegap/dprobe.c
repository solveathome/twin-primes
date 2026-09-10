// dprobe.c -- the 2^53 hazard, exhibited on the actual answer.
//
// The enumerator forms a position as  pos = s[i] + j*v#.  This runs that same
// expression twice, once in uint64 and once in double, on the real (i,j) that
// produced the reported maximum, and then trial-divides both.  If the double
// path were the one in use, the position it yields is not a slot at all, so
// the verification step would fail -- which is the point: the test FAILS if
// the arithmetic is done in floating point, and passes only in integers.
//
// Usage: dprobe b s j Pv
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

static int primes[64], np;
static void gen_primes(int lim) {
  np = 0;
  for (int n = 2; n <= lim; n++) { int ok = 1; for (int d = 2; d * d <= n; d++) if (n % d == 0) { ok = 0; break; } if (ok) primes[np++] = n; }
}
static int isSlot(uint64_t x, int upto) {
  for (int i = 0; i < np; i++) { int p = primes[i]; if (p > upto) break;
    if (x % (uint64_t)p == 0) return 0; if ((x + 2) % (uint64_t)p == 0) return 0; }
  return 1;
}
static uint64_t gapAt(uint64_t x, int upto) { uint64_t q = x + 1; while (!isSlot(q, upto)) q++; return q - x; }

int main(int argc, char **argv) {
  int bb = atoi(argv[1]);
  uint64_t s = strtoull(argv[2], NULL, 10);
  uint64_t j = strtoull(argv[3], NULL, 10);
  uint64_t Pv = strtoull(argv[4], NULL, 10);
  gen_primes(bb);
  uint64_t bpri = 1; for (int i = 0; i < np; i++) if (primes[i] <= bb) bpri *= (uint64_t)primes[i];

  uint64_t exact = s + j * Pv;
  double dpos = (double)s + (double)j * (double)Pv;
  uint64_t viaDouble = (uint64_t)dpos;

  printf("b = %d,  b# = %llu   (2^53 = %llu, b# exceeds it: %s)\n", bb,
         (unsigned long long)bpri, (unsigned long long)(1ULL << 53), bpri > (1ULL << 53) ? "YES" : "no");
  printf("inputs: s = %llu   j = %llu   v# = %llu\n",
         (unsigned long long)s, (unsigned long long)j, (unsigned long long)Pv);
  printf("  uint64 path : pos = %llu\n", (unsigned long long)exact);
  printf("  double path : pos = %llu   (difference %lld)\n",
         (unsigned long long)viaDouble, (long long)((int64_t)viaDouble - (int64_t)exact));
  printf("  is the uint64 position a slot mod %d#? %s", bb, isSlot(exact, bb) ? "YES" : "NO");
  if (isSlot(exact, bb)) printf("   gap forward = %llu", (unsigned long long)gapAt(exact, bb));
  printf("\n");
  printf("  is the double position a slot mod %d#? %s", bb, isSlot(viaDouble, bb) ? "YES" : "NO");
  if (isSlot(viaDouble, bb)) printf("   gap forward = %llu", (unsigned long long)gapAt(viaDouble, bb));
  printf("\n");
  printf("  VERDICT: %s\n", (exact != viaDouble && !isSlot(viaDouble, bb))
         ? "the double path gives a different position and it is NOT a slot -- a\n"
           "           floating-point implementation would fail verification here."
         : (exact == viaDouble ? "double happens to agree at these inputs (weaker test)"
                               : "double differs but still lands on a slot (weaker test)"));
  // how many nearby integers survive a double round-trip at this scale
  uint64_t bad = 0; for (uint64_t x = exact; x < exact + 1000; x++) if ((uint64_t)(double)x != x) bad++;
  printf("  of the 1000 integers from the answer upward, %llu do not survive a\n"
         "  round trip through double.\n", (unsigned long long)bad);
  return 0;
}
