# Wave 7: what the five agents produced before they died

**Provenance warning, read this first.** All five agents were killed by the
same harness watchdog (600 seconds with no progress) partway through their
runs, along with three literature sub-agents one of them spawned. Every
number below was computed by an agent and recovered from its scratch
directory, preserved in `research/wave7-logs/`. The `.js` artifacts in
`research/` are the code the agents wrote, and they are syntactically valid,
but none of them carries a pasted OUTPUT block or numbered READINGS, because
the agents died before that step. So the calibration on this whole file is:

> VERIFIED-BY-AGENT, NOT RE-RUN BY THE PARENT SESSION.

The custody gates below did pass inside the runs, which is the strongest
evidence available that the engines are sound. Before any of this is promoted
into a paper, the scripts should be re-run clean and their OUTPUT pasted in
the house format. Treat every figure here as provisional until then.

The one exception is the @41 march, which is still running: it survived its
agent's death, exactly as the night ledger's operational lesson predicted.

---

## Stream 1: Lemma V, the mean square (TODO item 0)

Artifact `research/sift-limit-lemmaV.js` (454 lines). Log
`wave7-logs/lemmaV-meansquare.log`, 470 seconds of run.

**What was achieved.** The remainder R(x) was written down exactly, and the
identity T(x) = H·M + R(x) was verified to 2.4e-13 or better over full
periods at z = 13 and z = 17, and over 200,000 sampled positions at z = 19
and z = 20. The mean square then got a closed form, and that closed form was
checked against brute force at seven configurations, agreeing to between
7.9e-15 and 2.6e-11. A spectral form over moduli e dividing P(z) reproduces
the same numbers to 5e-14, with a phase factorisation holding at 11,389
(e, term) pairs and zero violations.

So the brief's first move is done: the mean square of the bilinear sawtooth
remainder is exactly computable, three independent ways that agree.

**The finding that matters, and it cuts against the route.** The mean square
does not grow the way the fitted law suggests. Holding z = 29 and sweeping
the window exponent u from 1.8 to 4.4, so that H runs from 429 to 2,719,889,
the mean square SATURATES: 6.53, 13.86, 16.68, 20.50, 21.46, 21.52, 18.28,
22.51. It is essentially flat in H once H is large, and grows only with z.
The agent's last recorded action was rewriting its almost-all section around
this plateau, and it died mid-rewrite.

**SETTLED, and against this passage. Corrected 2026-08-18.** What stood here
called the comparison "the open question this stream stopped on" and closed by
saying the sieve bound "beats the elementary bound by roughly two orders". It
does not. `research/history/MORNING-2026-08-16.md` settled it two days later:
the sieve mean square **does not beat the elementary second moment — it loses,
by about 1.4×**.

This passage was also wrong about *why* the S6 block should not be quoted. The
reason is not that the block used the linear law rather than the plateau. It is
that the whole block is output of `elementaryVariance`, a function
`research/sift-limit-lemmaV.js`:395 now banners as
`!!! WRONG. DO NOT TRUST THIS FUNCTION OR ANY S6 COLUMN DERIVED FROM IT. !!!`
because it is **wrong by about three orders**, with the tell visible in its own
output (Var/E² printed as a constant 0.500). Every number in the S6 block is
void, including the two constants this paragraph used to quote while telling a
reader not to quote the block — 0.027·ln⁴z and 0.741·ln²z were both computed
from the broken function and are struck.

`research/wave7-logs/lemmaV-meansquare.log` still carries the S6 block with no
flag on it. Anyone reading that log directly must apply this correction.

**Honest limits.** All of this is the ALMOST-ALL direction. The Gap
Reformulation needs uniformity in position, which is a different statement.
The sup data is encouraging and unproven: sup|R|/rms sits between 3.3 and
4.8 at every measured configuration, against √(2 ln W) running from 3.9 to
12.9, so the worst position is far from Gaussian-extremal. sup|R|/(H·M)
stays between 0.025 and 0.106 wherever a full period was enumerable. None of
that is a theorem.

## Stream 2: wrap precision (TODO item 6)

Artifact `research/natal-cap-34-wrap-precision.js` (655 lines). Logs
`wave7-logs/cap34-cap27-custody.log` and `wave7-logs/cap34-exact13.log`.

**Custody gate passed, and then some.** The exact @13 decomposition returns
T₄ = 352,253,669.87624460 against cap-27's certified
352,253,669.8762445, a relative agreement of 3.4e-16. That is not merely the
custody gate; it is six orders below the 1e-9 relative gate the @17 bound
needs. The run took 1,857 seconds on 10 workers.

**The layer split, exact.** With G = 65,955,633,770.94 over 39,782,707,965
quadruples: C1 = −3.479e−2 of G, C2 = −2.802e−3, C3 = −8.393e−3, and the
multi-prime joint layer = 6.796e−4. Opening the joint layer: the two-prime
part is 6.836e−4 of G, the three-prime part −4.074e−6, and everything from
four primes up is 9.9e−9. So the joint layer is a two-prime story to four
digits.

**The prediction on record was about the pair weight, and it landed.**
Replacing the pair weight w by 1, which is what a pure class-histogram count
does, costs −4.374e−4 of G on the multi layer, an error of 64% of that layer,
and −55% on the linear layer. The histogram shortcut is therefore not
available; the weight has to be carried. 67.48% of quadruples carry a
kappa-prime, with at most 12 primes on any one quadruple.

**What remains.** The @13 gate is met with room to spare. The @17 rerun,
which is the actual deliverable, had not started when the agent died. The
cost question is now the only question, and it is a measurement, not a
theory problem.

## Stream 3: the X-channel multiplicity spectrum (TODO item X)

Artifact `research/natal-cap-35-x-multiplicity.js` (356 lines). Log
`wave7-logs/cap35-x-multiplicity.log`, 163 seconds.

**Custody passed at three levels**, each value matching cap-31 exactly:
VR(0), S(0), X(0), X̄ and X(0)/X̄ all PASS at @11, @13 and @17. The run then
added @19.

**A cleaner statistic than X(0)/X̄, and it is monotone.** Normalising the
anchored overlap deficit by the mean survivor count gives (X̄ − X(0))/S̄ =
−0.2287, +0.0134, +0.1568, +0.2225 at @11, @13, @17, @19. That is the exact
form Assumption A is stated in, since Assumption A asks this quantity to stay
below 1 − ε, and unlike X(0)/X̄ it rises monotonically rather than crossing 1
and flattening. Four points, climbing toward the line that matters.

**The crossing, factored.** The run decomposes S(0)/S̄ = β · (S_CRT/S̄),
separating the classical Hardy-Littlewood-versus-Mertens ratio β, which
crosses 1 late, from the m ≥ 3 product-truncation factor S_CRT/S̄ of the
rotation ensemble, which falls monotonically at 1.0271, 0.9788, 0.8978,
0.8416. This is the multiplicity structure the brief was hunting: the
ensemble's own departure from the independent model is an m ≥ 3 effect, and
it is separable from the anchored bias.

| x | S(0) | S̄ | S_CRT | β | S_CRT/S̄ | S(0)/S̄ | X(0)/X̄ | (X̄−X(0))/S̄ |
|---|---|---|---|---|---|---|---|---|
| 11 | 45 | 38.24 | 39.27 | 1.1458 | 1.0271 | 1.1768 | 1.4541 | −0.2287 |
| 13 | 307 | 310.88 | 304.28 | 1.0089 | 0.9788 | 0.9875 | 0.9908 | +0.0134 |
| 17 | 3,099 | 3,614.93 | 3,245.51 | 0.9549 | 0.8978 | 0.8573 | 0.9482 | +0.1568 |
| 19 | 38,380 | 49,238.76 | 41,441.19 | 0.9261 | 0.8416 | 0.7795 | 0.9558 | +0.2225 |

No closed form in the m ≥ 3 channel was reached before the agent died.

## Stream 4: the skeleton door (TODO item 4)

Artifacts `research/natal-cap-36-skeleton-door.js` (430 lines) and its `.md`.
Logs `wave7-logs/cap36-skeleton-door.log` and `wave7-logs/cap36-at29.log`.

**A sixth certified level.** G30_agg is now certified in exact BigInt at @29
as well: 0.1176, from a 1,088 second run over 7,863 scour primes, with
ΣCov < 0 holding and exactly 1 of 7,863 primes showing Cov > 0. The five
earlier levels reproduced exactly. So leg iii of the calm lemma is a theorem
for x ≤ 29, up from x ≤ 23.

**The decay-law shortcut is REFUTED.** The TODO's hope was that G30_agg
decays, so that a decay law plus exact verification through @23 might close
all x outright. The six certified values are 0.2132, 0.1113, 0.1011, 0.1259,
0.0945, 0.1176. It goes UP at @19, and UP again at @29. Fits of ln G30
against ln ln W, against x, and against ln K give R² of 0.601, 0.511 and
0.526, which is no law at all. From @13 on the values sit at mean 0.1082 with
spread 0.0313, flat within their own spread. There is no decay to exploit.

**And the door itself buys much less than its name suggests.** This is the
sharpest finding of the five streams. The run decomposed where the skeleton
mass actually sits, and the part that fixed-modulus-30 equidistribution can
reach is the part with M_T ≤ lB. That part carries 9.2% of the mass at @13,
−0.9% at @17, −10.8% at @19 and 5.5% at @23. The other 90% to 111% sits at
modulus of order W, which is not the named door at all but a much harder
problem. Opening the door as stated would therefore settle roughly a tenth of
the obstruction.

**What the door's own hypothesis looks like, measured.** Equidistribution of
(q mod 30, ⌊W/q⌋ mod 30) is well supported: χ² against 239 degrees of freedom
reads 280.0, 219.9, 276.1, 250.8, 174.1, 241.6 at @17 through @37. The
cancellation |Σ|/Σ|·| tracks K^{−1/2} closely at moduli 30 and 210 and less
well at 2310 and 30030. So the hypothesis is probably true and probably
square-root; it is simply not where the mass is.

## Stream 5: the @41 march (TODO item 1)

Artifact `research/natal-cap-37-at41-march.js` (565 lines).

**Running now.** Eight shards launched detached at 18:16, all at full CPU on
a 10-core machine, sharded as `shard 41 <i> 8 2000000000`. The agent's last
recorded line was that all custody gates were green, which would mean
S(37) = 7,998,394,865 and S(31) = 283,449,187 both reproduced by the promoted
engine. That claim is NOT independently confirmed here, because the agent
died before writing its OUTPUT block; the gates should be re-run and the
result checked against the log when the march finishes.

Forecasts remain on record and unchanged: classical-raw 0.8449, with-residual
0.8459, free-linear 0.8443, pinned 0.8488.

---

## What to do next, in order

1. Re-run each of the four finished scripts clean, paste real OUTPUT, write
   numbered READINGS. Until that happens nothing here is house-grade.
2. Settle the Lemma V plateau question, which is the one genuinely open
   mathematical fork: is the mean square flat in H, and if so does the
   almost-all bound beat the elementary second moment or not.
3. Rerun the wrap engine at @17 now that @13 clears the gate by six orders.
4. Rewrite TODO item 4. The door as named reaches about a tenth of the mass,
   and the decay shortcut is dead. The item needs restating around the
   modulus-W mass, or demoting.
5. Watch the @41 march and verify its custody gates from the log.
