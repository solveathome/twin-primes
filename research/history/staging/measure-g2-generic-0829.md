# Is G2 generic in the coordinate the sieve discards? The class positions, measured against a census-matched ensemble

<!-- ledger
id: Q-measure-g2-generic
status: ANSWERED
todo: 0
question: Where does G2(x#) sit in the distribution of the same maximum gap taken over other two-class configurations with the same census, and is the constant-shift family generic inside the free-pair family?
verdict: G2 is GENERIC in this coordinate on the registered rule, MEASURED: the midrank percentile of G2 in the census-matched two-class ensemble reads 20.00, 18.06, 26.35, 17.14 exhaustively at x = 11..19 and 13.70 sampled at x = 23, all inside the registered [5, 95] band so the falsifier does not fire, while sitting about one ensemble sd below the mean at all five levels; and the free-pair and constant-shift ensembles are PROVEN identical up to translation, so killer 1 gains no target in the class positions at these levels.
-->

*(Producer `research/measure-g2-generic-0829.js`. HELD, internal, publication
moratorium in force. Answers `Q1`/`C1` of
`research/history/staging/object-g2-read-0829.md` §8 and §6. Verdict label
**(i)**: a measurement of a finite object against a matched ensemble. Nothing in
this note bears on the exponent, on the band `(2, 4.26645]`, or on any
infinitude statement, and a low percentile here would be a descriptive fact
about where structure sits in a finite object, not a route.)*

## 0. What is open

**What is wrong here first: five nested levels, `x ≤ 23`, `x = 23` sampled
rather than exhausted, and nothing here touches the exponent.** Verdict label
**(i)**. The band `(2, 4.26645]` is untouched and no reading below is a route.

**The registered falsifier did not fire, so the answer to Q1 is the null one.**
`G₂(x#)`'s midrank percentile in the ensemble of two-class configurations with
the same census reads **20.00%, 18.06%, 26.35%, 17.14%** exhaustively over every
orbit at `x = 11, 13, 17, 19` and **13.70%** on 5,000 of 142,560 orbits at
`x = 23`. The registered band was [5%, 95%] and the registered falsifier was
below 2% or above 98% at two or more levels. Nothing fired. **[MEASURED, exact
at `x ≤ 19`.]**

**What is not clean about that hit, stated before the hit.** `G₂` sits **below**
the ensemble mean at all five levels, `z = −0.933, −0.966, −0.584, −0.962,
−0.960`, and in the lower quarter of the rank at four of the five. The levels
are nested, so no significance attaches to the repeated sign and none is
claimed. The base-rate explanation (§5) is that `d = 2` is the smallest
census-matched shift and the placement is a function of `d`'s size; **that check
was not run.**

**What changed about the question rather than about the answer.** E1 (free
pairs) and E2 (constant shift `S₁ ∩ (S₁ − d)`) are **the same ensemble**, up to
translation, PROVEN elementary in §1c before the run: a census-matched two-class
configuration modulo translation is exactly its per-prime difference vector
modulo an independent sign flip at each prime, there are `∏_{3≤p≤x}(p − 1)/2`
orbits, and `d ↦ orbit` is uniform and onto. So the discarded coordinate is one
integer, the brief's third comparison is settled a priori rather than measured,
and the ensemble is small enough to **exhaust** at four of the five levels.

**Two side results, both custody-grade.** The exhaustive ensemble maximum equals
**A288815 (h₂) at all seven exhaustive levels** `x = 3..19` (6, 18, 30, 66, 150,
192, 258), an independent reproduction from a different definition; and `h₂`'s
optimum sits **inside** the census-matched family at the two levels where all
even `d` were enumerated (best non-matched `d`: 48 against 66, 90 against 150).

**Open after this note.** The exhaustive `x = 23` percentile (11.6 h
single-threaded, priced in §6); the `d`-profile that would decide §5's reading A
against reading B; and whether Resta's ILP for A072753 permits fewer than two
classes at some primes, which is the unread half of `object-g2-read-0829.md` §1
defect (ii).

## 1. Pre-registration

*(Written 2026-08-29 07:00:02Z, before the producer existed on disk; the producer
file was created at 07:02:57Z. Custody:
timestamped by disk order only, not sealed by a git object and not committed;
this agent runs no git command. §2 records what that is worth.)*

### 1a. The question, exactly

`G₂(x#)` is the largest cyclic gap between consecutive twin slots of the tile
`T_x`, the slots being `r` with `gcd(r(r+2), x#) = 1`
(`research/G2-STATE.md` §1a). Killer 1, the operative one, is that every
upper-bound argument the corpus has produced consumes exactly one property of
the tile: each odd prime removes two residue classes. The argument is blind to
*where* the two classes sit (`paper/beta2-note.md` §2, §6 item 1; restated at
`object-g2-read-0829.md` §4a). The class positions are the discarded
coordinate. Nothing in the corpus measures what they are worth for the maximum
gap itself, and `README.md` §Status records the constant shift `{0, −2}` as the
only non-generic structure the tile carries, with its three uses at the anchor
all null.

Registered question: **where does `G₂(x#)` sit in the distribution of the same
maximum gap taken over other class configurations with the same census?**

### 1b. The three ensembles, as briefed

One period `W = x#`, levels `x = 11, 13, 17, 19, 23`
(`W = 2310; 30,030; 510,510; 9,699,690; 223,092,870`).

- **E1, free pairs.** One class at `p = 2` (as the twin pattern has, since
  `{0, −2}` coincide mod 2), two distinct classes chosen uniformly at random at
  every odd `p ≤ x`. Census `D_x = ∏_{3≤q≤x}(q − 2)` by CRT, matching the tile.
- **E2, constant shift.** The pattern `S₁ ∩ (S₁ − d)`, classes `{0, −d}` at
  every prime, `d` even with `p ∤ d` for every odd `p ≤ x`, so that every odd
  prime kills exactly two classes and the census matches. `d = 2` is the twin
  tile.
- **E3, the twin tile.** `G₂(x#)` itself: 42, 66, 108, 150, 204 at
  `x = 11 .. 23` (`research/exact-g2-ladder.js` `LADDER`, and
  `A144311 + 1`).

### 1c. A derivation done before the run, which changes what the run is for

**E1 and E2 are the same ensemble, exactly, and both are uniform on
`∏_{3≤p≤x}(p − 1)/2` orbits. [PROVEN, elementary, derived here 2026-08-29
before the producer was written; the run checks it rather than establishing
it.]**

Write a configuration as the class `{a_2}` at `p = 2` and the unordered pair
`{a_p, b_p}` at each odd `p ≤ x`. The maximum cyclic gap is invariant under a
global translation `r ↦ r + t`, which acts on configurations by `a_p ↦ a_p + t`
at every prime at once.

1. *The action is free.* A translation `t` fixing a configuration needs
   `{a_p, b_p} + t = {a_p, b_p}`; either `t ≡ 0 (mod p)`, or `t` swaps the two
   classes, which forces `2t ≡ 0` and so `t ≡ 0` again for odd `p`. At `p = 2`
   the single class forces `t ≡ 0 (mod 2)`. Hence `t ≡ 0 (mod W)`.
2. *Orbit count.* Configurations number `2 · ∏_{odd p} p(p − 1)/2`, and
   `|W| = 2∏_{odd p} p`, so the orbits number `∏_{3≤p≤x}(p − 1)/2`.
3. *The orbit invariant is the per-prime difference up to sign.* Two
   configurations with the same difference vector `(e_p)`, `e_p = b_p − a_p`,
   are translates by the `t` that CRT supplies from `t ≡ a′_p − a_p`. And the
   sign of `e_p` may be flipped at **each prime independently**: translating by
   the `t` with `t ≡ 0` at the primes left alone and `t ≡ e_p` at the primes
   flipped realises the flip. So the orbit is exactly `(±e_p)_p`.
4. *E2 is onto the orbits, uniformly.* `d ↦ (d mod p)_{odd p}` is a bijection
   from `{d even mod W : p ∤ d for odd p ≤ x}` (of size `∏(p − 1)`) onto
   `∏_{odd p}(Z/p)^*`, by CRT and the count. The orbit of the pattern for `d`
   is `{d′ : d′ ≡ ±d mod p, each sign free}`, of size exactly `2^{π(x)−1}`
   since `d ≡ −d mod p` would need `p | 2d`. Every orbit therefore receives the
   same number of `d`, and uniform `d` gives uniform orbits.
5. *E1 is uniform on the orbits* because the orbits are equal-sized (step 1)
   and E1 is uniform on configurations.

Three consequences, all of them prior to any measurement:

- **The registered sub-question "is E2 generic inside E1" is settled a priori:
  the two ensembles are identical, not merely consistent.** The run's job on
  that head is custody, that is, whether two independently coded samplers agree.
- **The discarded coordinate is exactly `d` modulo the sign group.** The
  configuration space of census-matched two-class tiles, modulo translation, is
  parametrised by the constant shift. There is no extra freedom in the
  positions beyond it. So the registered question reduces to: **is `d = 2`
  typical among the `∏(p − 1)/2` shifts?**
- **The ensemble is small enough to enumerate exhaustively at four of the five
  levels**: 30, 180, 1440, 12,960, 142,560 orbits at `x = 11, 13, 17, 19, 23`.
  At `x ≤ 19` the percentile of `G₂` is therefore **exact**, not a sample
  estimate, and the ensemble maximum is the exact free-two-class adversarial
  value at that level. Only `x = 23` is sampled.

*(This derivation is elementary and is not claimed as new. It is the same CRT
collapse that `object-g2-read-0829.md` §6 C1 records as making `G₂ − 1` a
maximum over the shift ensemble, run one step further. Whether the literature
states it in the Ziller-Morack convention is unchecked, and
`research/SEARCH-CONVENTIONS.md` says an unchecked convention is the default
failure mode, so no novelty is claimed.)*

### 1d. Registered predictions

The corpus reading, `README.md` §Status plus `object-g2-read-0829.md` §4a, is
that the constant shift is the only non-generic structure the tile carries and
that its uses have been null. Read onto the maximum gap that predicts a typical
percentile.

- **P1 (registered, the corpus's reading).** The percentile of `G₂(x#)` in the
  ensemble lies between the 5th and the 95th at every level `x = 11 .. 23`.
- **P2 (registered, this agent's own prior, weaker and stated separately).**
  Uncertain, leaning low. Hand derivation at the two levels below the registered
  range, to be re-derived by the engine and not trusted until it is: at `x = 5`
  the ensemble has two orbits with maximum gaps 12 and 18, and `G₂(5#) = 12` is
  the **minimum**; at `x = 7` the ensemble maximum is `h₂(7#) = 30 = G₂(7#)`, so
  `G₂` is at the **top**. Two hand points disagreeing in direction is why P2 is
  registered as uncertain rather than as a direction.
- **P3 (registered, custody).** The exhaustive ensemble maximum at
  `x = 11, 13, 17, 19` equals `h₂(x#) = 66, 150, 192, 258` (A288815, terms 5 to
  8, `research/external-ladders-01.js`). A mismatch would say either that the
  engine is wrong or that `h₂`'s optimum sits at a `d` divisible by some odd
  `p ≤ x`, that is, outside the census-matched ensemble. Both readings are
  reported if it fires.
- **P4 (registered, custody).** The `d = 2` member reproduces the LADDER,
  42, 66, 108, 150, 204, on an engine sharing no code with
  `research/exact-g2-ladder.js`, and every sample carries survivor count exactly
  `∏_{3≤q≤x}(q − 2)`.

### 1e. Falsifier

**The registered falsifier for P1: a percentile below 2% or above 98% at two or
more of the four exact levels says the object is non-generic in this
coordinate.** One level out of four is not enough, since the ensemble is small
(30 orbits at `x = 11`, so the percentile grid there is coarse at 3.3%) and the
hand points at `x = 5, 7` already show both ends occurring.

Reporting convention for a discrete, heavily tied statistic: the fraction
strictly below `G₂`, the fraction at or below, and the mid-rank percentile are
all reported, and the falsifier is read on the mid-rank.

### 1f. What this cannot say, registered in advance

- Nothing here bears on the exponent or on the band `(2, 4.26645]`. A percentile
  carries no infinitude content, per the verdict label **(i)**.
- A low percentile would **not** be a route. It would say a coordinate exists
  that no upper-bound argument in the corpus reads, which is a descriptive fact
  about the object at five finite levels and says nothing about whether the
  coordinate can be exploited.
- A typical percentile would strengthen killer 1 from a description of the
  attempts into a property of the object, at these levels only, and would leave
  §4a's "what an argument must use beyond P1" with no target in the class
  positions.
- The levels are `x ≤ 23`. Every reading is a finite-level reading, and the
  corpus's own record on small-level readings (`covering-dive.md` §164 on the
  `h₂ ≈ p²/2` crossing) is that they cross laws rather than reveal them.

## 2. Custody

**What is weak here first: the pre-registration is timestamped by disk order and
nothing else.** §1 was written at 07:00:02Z and the producer created at
07:02:57Z, both observed by `stat` before either file was edited again; both
have since been edited, so their mtimes no longer witness the order. Birth
times, which an in-place rewrite does not alter, read 09:04:35 local for this
note and 09:38:11 local for the producer, and the producer's birth equals its
mtime, which only a copy or a recreate produces. So the inode now on disk is not
the one the 1874.6 s run executed, the two times quoted above are transcript
claims rather than file evidence, and the only ordering the disk supports is
note-file before producer-inode (`redteam-0829-measure-a.md` §2b). No git
command was run by this agent, so §1 is not sealed by a git object and its
custody is exactly the transcript that wrote it. That is the same residual the
corpus records against `perfold-error-model` (`G2-STATE.md` §0, producer-02
first existing 5m21s after the seal) and it is weaker here, not stronger.

**A second custody note, on the workspace.** The scratchpad directory this
agent was given is shared with the nine sibling agents of the same wave: a
sibling's `embed` log overwrote this agent's log file mid-run. Nothing of this
note's content passed through that file (the OUTPUT block is written into the
producer by `research/qc/embed.js` itself), and no file of this note was
touched by anyone else, but the shared scratchpad is a real hazard for any wave
that routes results through it.

**What is checked, and by what.**

| check | result | where |
|---|---|---|
| the twin tile reproduces the LADDER on two engines sharing no sieve code, at `x = 3..23` | PASS, 8 of 8, both engines | producer SEC A1 |
| every sieve carries census exactly `D_x = ∏(q − 2)` | asserted per sieve, 8 of 8 in SEC A1 and thrown on failure everywhere else | producer SEC A1, and `throw` in SEC B, C1, D, E |
| the two engines agree on identical random configurations | 200 of 200 at `x = 13`, 200 of 200 at `x = 17` | producer SEC A2 |
| the fast engine's twin ORBIT REPRESENTATIVE (`e₃ = 1`, `e_p = 2`) and the naive engine's LITERAL classes `{0, −2}` give the same answer | PASS at all 8 levels, and these are different configurations, so this is the first check of §1c | producer SEC A1 |
| the ensemble maximum against A288815 | MATCH at all seven exhaustive levels | producer SEC B |
| the OUTPUT block is machine-stamped, never hand-pasted | `code-sha256 453d2733…`, `out-sha256 f9a29ea8…`, 1874.6 s, node v22.21.0 | producer OUTPUT banner |

**Seed.** `mulberry32`, `SEED = 20260829`, printed as line 2 of the output. The
exhaustive sections use no randomness at all.

## 3. Tables

### 3a. G₂ in its own census-matched ensemble

`x ≤ 19` is **exhaustive over every orbit**, so mean, sd, min, max and the
percentile are exact for the ensemble, not sample estimates. `x = 23` is
`N = 5000` uniform orbits of 142,560.

| x | orbits | kind | mean | sd | min | max | G₂(x#) | z | midrank | strictly below |
|---|---|---|---|---|---|---|---|---|---|---|
| 11 | 30 | exhaustive | 48.400 | 6.856 | 36 | 66 | 42 | −0.933 | **20.00%** | 3.33% |
| 13 | 180 | exhaustive | 77.667 | 12.079 | 60 | 150 | 66 | −0.966 | **18.06%** | 13.33% |
| 17 | 1440 | exhaustive | 117.896 | 16.945 | 84 | 192 | 108 | −0.584 | **26.35%** | 21.32% |
| 19 | 12,960 | exhaustive | 167.382 | 18.074 | 120 | 258 | 150 | −0.962 | **17.14%** | 11.13% |
| 23 | 5000 of 142,560 | sampled | 223.385 | 20.186 | 174 | 318 | 204 | −0.960 | **13.70%** | 9.04% |

The two smaller levels below the registered range, run as the P2 check:
`x = 5`, two orbits, 12 and 18, `G₂ = 12` at midrank 25.00%; `x = 7`, six
orbits, `G₂ = 30` at midrank 66.67%. Both as hand-derived in §1d.

### 3b. The full distribution where it fits

- `x = 11`, all 30 orbits: `36×1  42×10  48×9  54×7  60×2  66×1`. `G₂ = 42` is
  the second distinct value of six.
- `x = 13`, all 180 orbits: `60×24  66×17  72×19  78×61  84×34  90×16  96×1
  102×3  108×3  120×1  150×1`. `G₂ = 66` is the second distinct value of eleven,
  and the right tail is one orbit at 150.

### 3c. E2, the constant shifts, against E1

| x | #d census-matched | orbits hit | d per orbit (min, max, expected) | E2 mean, sd | E1 mean, sd | G₂ midrank E2 / E1 |
|---|---|---|---|---|---|---|
| 11 | 480 = ∏(p−1) | 30 of 30 | 16, 16, 16 | 48.400, 6.748 | 48.400, 6.856 | 20.00% / 20.00% |
| 13 | 5760 = ∏(p−1) | 180 of 180 | 32, 32, 32 | 77.667, 12.046 | 77.667, 12.079 | 18.06% / 18.06% |

The sd differs in the third digit because E2 weights each orbit by its
`2^{π(x)−1}` shifts and E1 weights each orbit once, so the two divide by a
different `n − 1`; the means and the placements are identical, as §1c requires.

### 3d. The free-pair sampler as briefed, against the exact distribution

| x | N | mean | sd | min | max | G₂ midrank sampled | exact | max abs CDF difference |
|---|---|---|---|---|---|---|---|---|
| 11 | 500 | 48.408 | 7.155 | 36 | 66 | 21.70% | 20.00% | 0.037 |
| 13 | 500 | 77.556 | 11.989 | 60 | 150 | 19.10% | 18.06% | 0.019 |
| 17 | 500 | 117.816 | 16.631 | 84 | 180 | 25.70% | 26.35% | 0.016 |
| 19 | 500 | 167.796 | 18.222 | 126 | 234 | 17.40% | 17.14% | 0.016 |

At `x = 23` the free-pair sampler (`N = 200`, naive engine) reads mean 224.400,
sd 21.994, against the orbit sampler's 223.385: max abs CDF difference 0.041,
two-sample `z` on the means −0.642.

### 3e. The adversarial value beside the typical one

| x | ensemble mean | G₂(x#) | ensemble max (exhaustive) | A288815 h₂ | h₂/mean | z of the max |
|---|---|---|---|---|---|---|
| 11 | 48.400 | 42 | 66 | 66 | 1.36 | +2.57 |
| 13 | 77.667 | 66 | 150 | 150 | 1.93 | +5.99 |
| 17 | 117.896 | 108 | 192 | 192 | 1.63 | +4.37 |
| 19 | 167.382 | 150 | 258 | 258 | 1.54 | +5.01 |
| 23 | 223.385 | 204 | ≥ 318 (sampled) | 366 | 1.64 | not exhausted |

*(The `h₂/mean` and `z of the max` columns are arithmetic on the printed table,
not printed figures.)* The free-choice adversarial value for the whole ensemble
is therefore known exactly at four of the five levels and equals A288815 there;
the corresponding free-two-class entry `A072753 = (A288815 − 6)/6` is the same
sequence in the other normalisation, which is §5's item.

Over ALL even `d`, census-matched or not: the maximum is 66 at `d = 82`
(`x = 11`) and 150 at `d = 688` (`x = 13`), both census-matched, against a best
non-matched `d` of 48 and 90.

## 4. Readings against the pre-registration, calibrated

**What is wrong here first: five levels, `x ≤ 23`, and the ensemble is tiny at
the bottom of the range.** Thirty orbits at `x = 11` gives a percentile grid of
3.33%, so the smallest level cannot resolve a tail placement even in principle,
and `x = 23` is a sample rather than an exhaustion. Nothing below bears on the
exponent or on the band `(2, 4.26645]`.

1. **P1 (the corpus's reading, percentile inside [5%, 95%] at every level):
   HIT at all five levels.** Midranks 20.00, 18.06, 26.35, 17.14 exhaustive and
   13.70 sampled. **The registered falsifier does not fire**: no level is below
   2% or above 98%, so on the registered rule the object is **not** non-generic
   in this coordinate. [MEASURED; exact at `x ≤ 19`, sampled at `x = 23`.]
2. **And the hit is not a clean "typical".** `G₂` sits below the ensemble mean
   at every one of the five levels, `z = −0.933, −0.966, −0.584, −0.962,
   −0.960`, and in the lower quarter of the rank at four of five. The levels are
   nested, since the tile at `x = 19` contains the structure at `x = 17`, so
   these are not five independent draws and **no significance attaches to the
   repeated sign.** The honest statement is: at every level computed, the twin
   shift is a below-average shift for the maximum gap, by about one ensemble sd,
   and that is a description of five points. [MEASURED, no p-value available.]
3. **P2 (this agent's own prior, uncertain, leaning low): the two hand points
   are confirmed by the engine** (`x = 5` at 25.00%, the minimum of two orbits;
   `x = 7` at 66.67%), and the registered range then reads low at every level.
   P2 was registered as directionless, so it earns nothing.
4. **P3 (the ensemble maximum equals A288815): HIT, at all seven exhaustive
   levels** `x = 3..19`, values 6, 18, 30, 66, 150, 192, 258. [VERIFIED by
   exhaustion.] This is an independent reproduction of seven `h₂` terms from a
   different definition than the one A288815 was computed from: this note
   maximises the cyclic max gap over census-matched two-class configurations,
   Ziller-Morack minimise over paired progressions and Resta's entry uses an ILP
   over class pairs. Agreement at seven terms is a custody result for both
   sides.
5. **P4 (LADDER and census): HIT.** 42, 66, 108, 150, 204 on two engines sharing
   no sieve code, census exact at all eight levels.
6. **The registered sub-question "is E2 generic inside E1" is not a measurement
   at all.** §1c proves the two ensembles identical up to translation before the
   run, and four independent checks in the output are consistent with that
   (identical means and midranks at `x = 11, 13`; every orbit receiving exactly
   `2^{π(x)−1}` shifts; max abs CDF difference 0.016 to 0.041 between the
   briefed free-pair sampler and the orbit enumeration). [PROVEN identical;
   the run is custody for the engines, not evidence for the claim.]
7. **One small new measured fact.** `h₂`'s optimum sits inside the
   census-matched family at both levels where all even `d` were enumerated: the
   best non-matched `d` reaches 48 against 66 at `x = 11` and 90 against 150 at
   `x = 13`. Two levels, no argument that it persists. [MEASURED at `x = 11, 13`
   only.]
8. **The adversary is far above the typical, and that gap is the one that
   matters for the wall.** The ensemble max sits at `z = +2.57, +5.99, +4.37,
   +5.01` and `h₂/mean` runs 1.36 to 1.93 with no trend over four points. So a
   percentile statement about `G₂` says nothing about `h₂`'s growth, and the
   upper-bound literature is bounding the tail of this ensemble, not its mean.

**The nearest prior control in the corpus agrees in kind and disagrees in
direction.** `Q-discrepancy-two-class` (ANSWERED, `discrepancy-two-class.md`
§6) ran a random-class control at `top = 23` with 24 draws on the signed
discrepancy `ΔΦ₂` and placed the twin pattern at the 71st and 79th percentile,
**inside** the control spread, refuting any twin-specific discrepancy law. That
note also records the `k = 1` case as **degenerate by theorem**, one class
having no arithmetic freedom because the sifted set is a CRT translate of the
coprime set. §1c is the `k = 2` continuation of exactly that observation: two
classes have exactly one integer's worth of freedom, the shift `d`. This note
reads the twin pattern low-typical on the maximum gap where that note read it
high-typical on the discrepancy; both are inside, and neither is a law.

## 5. What this does and does not say about killer 1 and the constant shift

**It does not weaken killer 1, and it does not supply a coordinate.** Killer 1
is that every upper-bound argument consumes only "two classes per odd prime",
which caps at `β₂ = 4.26645` by construction (`paper/beta2-note.md` §2, §6 item
1). On the registered rule, `G₂` is generic in the discarded coordinate at every
level measured, so §4a's "what an argument must use beyond P1" gains **no target
in the class positions** at `x ≤ 23`. That is the direction the corpus already
assumed, now with a number against it rather than an assumption. [MEASURED at
five levels, verdict (i).]

**One sentence of `README.md` §Status is sharper than it reads, and this note
does not edit it.** README says "the one non-generic structure is the constant
shift, twin slots being `S₁ ∩ (S₁ − 2)`". §1c says that being a constant shift
is **not** structure at all: every census-matched two-class configuration is
`S₁ ∩ (S₁ − d)` for exactly one `d` up to translation and the per-prime sign
group. What is non-generic is the **value** `d = 2`, not the constant-shift
form. The three uses README lists (mirror symmetrisation, the ensemble, the
QR-immune classes) are uses of the value, so the sentence's content survives;
its wording invites the reading that the tile has a structural property the
ensemble lacks, and it does not. **Flagged for the orchestrator, not edited
here** (this agent edits no existing file), and it is a wording matter, not a
correction to any claim.

**What the low-but-not-extreme placement is worth.** Two readings are available
and the data does not separate them.

- *Reading A, the null one.* `d = 2` is the smallest census-matched shift, and
  small `d` clumps the two killed classes at every prime. If the maximum gap
  falls smoothly with clumping, `G₂` sitting one sd below the mean is a
  consequence of `d` being extreme in `d`, not of anything twin-specific. This
  is testable: measure the max gap as a function of `d`'s size, or of the number
  of primes where `e_p` is small. **NOT RUN here.**
- *Reading B, the structural one.* The placement is a property of the twin
  pattern beyond `d`'s size. **No evidence for it in this data.**

Reading A is the base-rate reading and is where this should sit until the
`d`-profile is measured. Either way the consequence for the wall is the same:
a below-average member of an ensemble whose relevant tail (`h₂`) is 1.4 to 1.9
times the mean gives no upper-bound leverage, since an upper-bound argument has
to hold at the tail.

**What it says about the `G₂ ≤ h₂` relation.** Nothing new. `G₂ ≤ h₂` was
already elementary (offset 2 is one of the offsets, `two-class-lower-bounds.md`
§1) and VERIFIED at twelve shared terms (`exponent-control.md` §2). This note
adds only that the maximising `d` is census-matched at `x = 11, 13`, and that
the ensemble maximum reproduces A288815 at seven terms.

**What it says about `A072753` versus `A288815`.** `two-class-lower-bounds.md`
§1 lists "free 2-class, any pair `{a_p, b_p}`, Resta ILP, A072753" as a **row
above** `h₂` with the relation "`≥ h₂` up to the `6a + 6` bridge", while OEIS
states `A288815(n) = 6·A072753(n) + 6` as an identity, which two different
objects cannot satisfy. `object-g2-read-0829.md` §1 defect (ii) already flags
this. §1c settles the mathematical half at census-matched level: **the free-pair
adversary and the offset adversary are the same maximisation**, so there is no
"free 2-class" object above `h₂` to be bridged to, and the two OEIS entries are
one object in two normalisations. What is NOT settled is whether Resta's ILP
allows one class at some primes (which would leave the census and could exceed
this ensemble's maximum); the entry was not read at source here.
**Recorded, not closed**, and `Q-object-g2-read` §6 C3 remains the question that
would close it.

## 6. Defects, and what would falsify

1. **`x = 23` is sampled, not exhausted.** 5,000 of 142,560 orbits. The exact
   figure is reachable at about 11.6 h single-threaded, priced from the 294 ms
   per sieve measured here, or under 2 h on four processes. Until it is run, the
   13.70% is a sample percentile with the usual sampling error and the "≥ 318"
   ensemble maximum is only a lower bound against `h₂ = 366`.
2. **Five levels and they are nested.** `x = 11..23`. The repeated negative `z`
   cannot be given a p-value, and no reading here extrapolates. The corpus's own
   record (`covering-dive.md` §164) is that readings at these levels cross laws
   rather than reveal them.
3. **The `d`-profile is not measured**, so §5's reading A is untested. The
   cheap version is the max gap against `d`'s size and against the count of
   small `e_p`, exhaustive at `x ≤ 19` on the data this producer already builds.
4. **The pre-registration is not sealed.** Disk order and a transcript, no git
   object. §2.
5. **Novelty is not claimed for §1c** and the owning convention was not searched
   (`SEARCH-CONVENTIONS.md` §1). Ziller-Morack's paired-progression setting is
   the obvious place for the same collapse to be stated already, and this note
   did not look.
6. **The engines share the author.** Two engines and two coordinate systems, but
   one person wrote both; the external check that carries the weight is the
   A288815 match at seven terms, computed elsewhere by other people from another
   definition.

**What would falsify the note's own headline.** The headline is "G₂ is generic
in this coordinate on the registered rule, while sitting about one sd low at
every level". It falls if: the exhaustive `x = 23` run returns a midrank below
2% (which with any second such level fires the registered falsifier); or the
A288815 match fails at a level not yet exhausted, which would say the ensemble
is not the one `h₂` maximises over and the whole framing is misaligned; or the
`d`-profile shows the placement is NOT explained by `d = 2` being the smallest
shift, which would move reading B from unsupported to open.
