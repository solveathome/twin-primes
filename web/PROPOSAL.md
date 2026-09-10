# Proposal: the primeoire scroll page

Target: `chrisbenjaminsen.com/labs/primes/`. A single long scrollable page whose
job is to give a sixteen year old the same sequence of aha moments Chris had in
the notebook, in the order he had them, using the pictures that caused them.

Status: proposal, nothing built. Written 2026-08-15.

---

## 0. What this page is for

This did not start as a paper. It started as doodling, and almost everything in
it is visual: the tile, the fold, the seam, the mirror, the moving frontier, the
stratum, the grain. The papers are a translation of the pictures into prose, and
translation loses the moment where the thing clicks.

So the page is not an explainer of the framework. It is **a machine for
reproducing the aha moments**, in sequence, one per act. Everything else on the
page (the theorems, the calibration, the wall, the ledger) exists to make those
moments trustworthy rather than to be the point.

There is a second purpose, and it changes the build order rather than the
design. The original research was done with visual proofs, and the framework's
open questions are still visual ones: where the monster gaps sit inside the tile
is described but not explained. Two items used to head that list and neither
belongs on it now. The grain census was settled by `research/grain-census.js`,
with a closed form for count(6) and the word rule that the grain never contains
"6,6". The d ↦ G_d map was studied by `research/attack-06b-difference-map.js`,
whose reading 3 is a stated negative result over all 105 even d ≤ 210: no
low-complexity statistic determines G_d, and the 19# pattern that made the map
look structured dissolves at 23#. What survives as visual is the *extremal*
question, not the map. A set of instruments you can actually play with is
therefore not only the publication artifact, it is **a plausible source of the
next result**. §3 makes that concrete, and §5 puts the instruments before the
narrative in the build order, because a toy built only to illustrate a known
fact cannot show you an unknown one.

Two consequences for the design, and they should govern every later decision:

**The reader predicts before the reveal.** An aha is an expectation getting
broken. If the page shows the answer while explaining it, nothing clicks, the
reader just nods. So each act sets up a question, gets the reader to commit to a
guess by dragging or clicking or just being asked, and only then reveals. This
is the single most important mechanic on the page and it is the thing most
maths explainers skip.

**The reader does it, not watches it.** Each act has a control the reader
operates. Not a play button. A slider, a drag, a "add the next prime" tap. The
notebook version worked because a hand was moving.

---

## 1. Design direction: the notebook

Aesthetic proposal: the page looks like the doodle, then sharpens.

Early acts render in a hand-drawn register. Off-white paper, ruled or squared
faintly, marks that look struck rather than filled, slightly imperfect line
ends. As the page progresses and the claims get sharper, the rendering sharpens
with them: by the theorem acts the same tile is drawn precisely, in a clean
technical style, on white. The visual language carries the argument's own arc
from doodle to result. Nothing about it is decoration; it tells the reader where
on the ladder they are standing.

Two devices run the whole length:

**One tile, persistent.** This is not twelve charts stapled together. A sticky
canvas holds one object that gets transformed by scroll: it folds, it
crystallizes, it colors by house, it zooms into a seam, it folds in half to show
the mirror. Text flows past it. The reader never loses the object, which is
exactly what a notebook page gives you and a paper does not.

**The calibration key.** Five fixed colors, one per rung of the ladder: proven,
verified, measured, conjectured, refuted. Every headline claim carries its
marker, and refuted claims appear struck through in place rather than deleted.
Explained once, in act 0, then it just runs. This converts the honesty policy
from a promise into a mechanic, and it is the thing that separates this page
from a crank page inside the first screen.

---

## 2. The reading-level contract

The target reader is a bright sixteen year old who likes maths but has not met
anything past the syllabus. That is a hard constraint, not a nice-to-have, and
it is the main thing that will make this page difficult to write. Five rules
enforce it.

**Nothing but counting and multiplying.** No calculus, no complex analysis, no
asymptotic notation in the main flow. Every quantity on the page can, in
principle, be obtained by the reader counting dots and multiplying whole
numbers. This is genuinely possible here, which is the lucky thing about this
framework: the census really is "multiply by p minus 2 each time".

**No symbol before the reader has counted the thing it names.** They count the
holes, then they get the word hole. They watch two die, then they get p−2. A
formula is a shorthand for something already familiar, never an introduction.

**Logarithms get built, once, when first needed.** One short inline panel: ln p
is roughly 2.3 times the number of digits. That single sentence, with a small
worked example, is enough to carry every later appearance, including the
pigeonhole theorem and the wall.

**Every act reads standalone.** A reader who lands mid-page from a link is not
lost. Each act opens by re-grounding the picture in one sentence.

**Hard words are tappable.** Primorial, sieve, parity, Chebyshev, variance:
each is a tap that opens a two-sentence plain explanation with a picture, and
the main text never depends on having tapped it.

The honest consequence: the exact statements, the sieve dimension, the exponent
4.267, the second-moment argument, none of that lives in the main flow. It lives
in the expandable expert layer (§5, decision 2). The page is a highschool page
with a mathematician's page folded inside it, not a compromise between the two.

## 3. The instrument bench

Every act's visual gets built twice, and the research version comes first.

**The instrument** is the toy with every knob exposed and no narrative: raw
rendering, ugly controls, arbitrary level, arbitrary offset, arbitrary window,
readouts everywhere, and a live numeric panel next to the picture. It lives at
`labs/primes/bench/` or stays local, and it is built for one user.

**The exhibit** is the same renderer with the knobs pinned to the values the act
needs, dressed in the notebook style, wired to scroll. It is a configuration of
the instrument, not a separate build.

That ordering costs almost nothing (the exhibit falls out of the instrument for
free) and it buys the possibility of finding something during construction, when
the cost of chasing it is lowest.

Three rules make an instrument capable of surprising you, and all three are
things the exhibit version does not need:

**Knobs go past the story.** The narrative needs the twin offset, d = 2. The
instrument takes any even d, so the d ↦ G_d map becomes a slider rather than a
research project. The narrative needs levels up to 13 or 17. The instrument goes
as far as the browser can compute and then switches representation honestly.

**Everything is readable as numbers.** Any picture on screen can be dumped as a
list, a table, or a sequence you can paste into a research script or into OEIS
search. A visual anomaly that cannot be exported dies as a feeling.

**State lives in the URL.** Every knob position encodes into the address bar, so
a configuration that looks interesting at midnight is a link you send yourself,
and a finding is reproducible by construction rather than by memory.

### Candidate targets, ranked by how likely a toy is to show something

These are drawn from the open questions in `TODO.md`, `GLOSSARY.md` and the
attack campaign. Ranking is my estimate of insight-per-hour, not importance.

**1. The grain census law.** The glossary says the size distribution "awaits a
law" (T₁₁ = 6×21, 12×56, 18×22, 24×6, 30×22, 36×4, 42×4). This is the strongest
candidate on the list because it is a small integer table nobody here has stared
at in the right arrangement. Instrument: the histogram across levels, animated
as folds happen, with the fold's merge rule shown acting on individual gaps. If
there is a law, watching where each tooth's count comes from at the moment of a
fold is how it will surface.

**2. Where the monster gaps live.** Attack 1 established that extremal gaps
migrate deep into the period, which is a statement about position. No branch
here has asked what those positions *are*: their relation to the seams, to the mirror
centre, to the strata. Instrument: mark the top hundred gaps in the tile,
coloured by rank, with seams and strata overlaid. Positional structure either
jumps out of that picture immediately or is not there.

**3. The d ↦ G_d map.** Flagged as a new object with no prior art found, on a search in our own wording only — `research/SEARCH-CONVENTIONS.md` §1 carries no owning convention for it — and
already showing that equal-density differences split (G₈ = 198 against
G₂ = 150 at 19#). Instrument: d as a slider, G_d plotted against d, with the
Hardy-Littlewood density drawn alongside so the residual is what you actually
look at. The question "what arithmetic property of d predicts the split" is a
chart away.

**4. Ancestry on click.** Click any twin slot, get its birth fold, its house,
its full descent from (5,7), and its seam-address depth. Cheap to build because
the genealogy is already worked out. Its research value is that it turns "which
slots are in the zone" into a question you can interrogate one slot at a time:
if zone-landing slots share an ancestry signature, that is visible in an
afternoon and invisible in aggregate statistics.

**5. The two-moiré overlay.** Grain and Scour drawn as two independent patterns
over the same tile, with a control for how far apart their alphabets are pulled.
The argument says exact independence by CRT; the instrument shows what near
alignment actually looks like at reachable scales, which is the only handle
available on an object whose joint tile is 10⁷³ wide.

**6. The stratum viewer.** Each prime's dent at [p², 2p²], with depth frozen at
birth, drawn across many levels at once so the invariance is visible rather than
asserted. Lower insight odds because the Exact Invariance Lemma already settles
the main question, but it is the cheapest of the six and it doubles as act 5's
exhibit.

Items 1, 2 and 3 are the ones I would build even if the page were cancelled.

## 4. The aha ladder

Ten acts, each one moment. The test for every act: name the sentence the reader
says in their head at the reveal. If an act has no such sentence, it is
exposition and it gets cut or merged. Second test, applied to every act: could a
sixteen year old explain this act to a friend afterwards. If not, the act is
wrong, not the reader.

### Act 0 — "The primes are the holes"

A number line on paper. Strike every second position. Then every third. Then
fifth, then seventh. What is left lights up.

Reveal: those 48 surviving positions in a block of 210 are where every prime
bigger than 7 lives. All of them. Forever.

*Aha:* primes are not a list, they are the negative space of something regular.

Reader control: they add each prime themselves, one tap at a time.

Also in act 0, before anything else, one short paragraph saying what this is
not. It is not a proof of the twin prime conjecture, the wall is real, act 7
names it. Saying that at the top is the cheapest credibility available and it
costs the page nothing.

### Act 1 — "It repeats, and it repeats bigger"

Ask the reader to guess: add 11 to the stack. Does the pattern get more chaotic?

Reveal: it gets **larger and more regular**. The block width multiplies by 11
(30, 210, 2310) while the holes multiply by 10. The tile does not degrade as
primes pile up, it inflates. Show the fold literally: the old tile laid out p
times end to end, then the strikes falling through all copies at once.

*Aha:* every new prime folds the same picture instead of scribbling on it.

This act carries the framework's central verb, and the fold animation is the
most transferable single image on the page.

### Act 2 — "Those holes are not candidates, they are primes"

Set up the expectation that a hole is a maybe. Then sweep a line outward at p²
and lock everything behind it in gold.

Reveal: below p², a hole is not a candidate. It is a prime, certified,
finished forever. The sieve is a machine that manufactures certified primes in a
band that moves outward at speed p².

*Aha:* the picture is not a model of the primes, below the frontier it is the
primes.

Then the zone (p, p²) highlights, and the reader is holding the setup for
everything that follows without having been told a conjecture yet.

### Act 3 — "Twins multiply, they do not thin out"

Overlay the +2 offset: slots where both r and r+2 are holes. Ask for a
prediction: what does adding a prime do to the twin count?

Reveal: it copies. p copies of every slot, exactly two die, p−2 live. The
counter runs 1, 3, 15, 135, 1485, 25515 and keeps going to the 31-tile's
6,226,553,025.

*Aha:* twin opportunities are not being killed off, they are exploding, and
nobody can prove that any of them land where we need them.

That last clause is the page's thesis and this is where it belongs, at the
midpoint of the ascent, as a felt tension rather than a stated problem.

### Act 4 — "Every twin in existence is descended from (5,7)"

Color the tile by birth cohort. Three houses in three colors, later cohorts as
shades.

Reveal: zero orphans, ever. No new lineage is ever born. Two thirds of every
twin opportunity that will ever exist was born at @5, and every later cohort is
born inside House 29, at the seam.

*Aha:* this is a family tree, not a scatter of coincidences.

Second beat in the same act: zoom to a seam and watch the edge lineage bear p−2
children, one staying at the edge forever, p−3 graduating inward. The seam is a
birth canal, and the reader sees a birth.

### Act 5 — "The new prime's kills are a copy of the picture itself"

Ask where a new prime's fresh strikes land. Most readers expect "everywhere,
evenly".

Reveal: they land on exactly p times the current hole set. A magnified copy of
the pattern, pointed back at itself, igniting at p².

*Aha:* the thing doing the destroying is the thing being destroyed, scaled up.

This is the Redundancy Lemma and it is the most beautiful single fact in the
corpus. It has never had a picture. It should get the largest one on the page.

### Act 6 — "The edges always survive, so the primes never stop"

Fold the rendered tile in half about its center. It matches, exactly, a
palindrome. Then look at the two ends: the positions one before and one after
every seam are never struck, by anyone, ever.

Reveal: that is Euclid's proof, sitting in the picture as a geometric fact
about the edge of a mirror.

*Aha:* the oldest proof in mathematics was in the doodle the whole time.

### Act 7 — "It matches reality, and here is where it does not"

The falsifiability act. Switch from tile to charts, and switch the reader's
posture from learning to checking.

Built for a sixteen year old, this act is three questions with answers, not a
statistics lecture.

*Did the picture predict the real twin primes?* Show predicted count against
actual count as two bars per level, side by side, out to where the counting
stops. They match. The word variance does not appear yet; the reader just sees
bars agreeing.

*How close is close?* Now introduce spread with a physical demo rather than a
symbol: slide a window of fixed length along the tile, watch the count in the
window bounce around its average, and let the reader see the bounce is small.
The claim lands as a sentence they can check by dragging: at least 99.87 out of
every 100 windows of that length contain a twin slot. Sigma appears here, once,
defined as "how far a typical window strays from the average", and never
carries an argument by itself.

*Where were we wrong?* In place, struck through, our own reading that the
spread settled to a constant near 0.2, with the drifting curve that replaced it
drawn over the top of it. One sentence on why we believed it and what killed it.

*Aha:* they are actually checking, and they show what they got wrong.

Putting a refutation inside the results act rather than quarantining it at the
end is the strongest trust move available on this page, and it costs a reader
nothing to understand.

### Act 8 — "Here is exactly why nobody can finish it"

Deliberate break. Animation stops, color drains, sparse layout, no
interactivity. The tonal shift does the work.

The parity problem is the one genuinely hard idea on the page, and it is
teachable at this level if it is taught as a picture rather than a theorem.
The proposed build, three beats:

*Beat one, the counting method.* Everything in the page so far counted survivors
by inclusion and exclusion: start with everything, subtract the multiples of 2,
add back what you subtracted twice, and so on. Show that machine running on a
small tile. The reader has already watched it work.

*Beat two, what the machine cannot see.* Use boxes, which is the framework's own
geometric reading of the same thing and the one a sixteen year old can hold.
A composite is a number that forms a perfect rectangle. Some numbers go further
and form a perfect three-dimensional box, 12 as 2 by 2 by 3. So every number has
a dimension: how many factors above one you can break it into. A prime is
one-dimensional. Show the reader sorting numbers into dimensions by dragging
blocks.

Then the reveal: the counting machine can prove a number needs *at most* three
dimensions. It can never prove the number of dimensions is *odd*. And "prime"
means exactly one, which is odd. A number like 91 is 7 by 13, a flat rectangle,
two dimensions. It sits one dimension from prime, the machine sees both as "at
most two", and no amount of counting separates them.

This is the parity problem stated exactly, in a sentence with no jargon in it,
and it is why Chen's 1973 result reads as "infinitely many primes whose
neighbour two along is at most three-dimensional" while the conjecture wants
two. The gap between proven and wanted is one dimension.
See `research/OBSERVATIONS.md` entry 5 for the verification and the mapping to
the standard names.

*Beat three, the price.* Now the five doors, each with the number the attack
campaign measured at it: the certificate that beats the classical one 57 times
over and still cannot cross, the parity step that only separates 8% of
candidates, the region where the count is exactly 2.0 times the twins, which is
the famous factor of two showing up as a measured quantity rather than a
theorem. Each door gets one sentence and one number.

Closing line: the statistics show no cliff at "prime". The wall is not in the
numbers, it is in what our methods can certify about them.

*Aha:* the obstacle is a specific, located, priced thing, not a mystery, and I
just saw what it looks like.

### Act 9 — "The whole thing comes down to one number"

The payoff act, and the one that must survive the reading-level contract
without being watered down.

First, the theorem we actually proved, stated so a sixteen year old can hold
it. Between any prime p and p², there are always two primes sitting close
together, where close means about twice the number of digits, times 2.3. That
is the logarithm panel's one job, and it pays for itself here. Then the honest
comparison: the twin prime conjecture asks for that distance to be 2, and we
have it down to roughly 2·ln p. The gap between what is proven and what is
wanted is one logarithm, and the reader can see both quantities on the same
number line, drawn to scale, for p around a million.

Second, β, built as a prediction game rather than a table. The reader is shown
the curve first, with no data on it, and told it has no adjustable knobs: it
comes out of the framework and classical corrections, nothing was fitted. Then
the nine measured points drop onto it one at a time as the reader scrolls, with
the last four appearing as forecast-then-measured pairs: here is what we said
before the computer ran, here is what it found. +0.0046, then +0.0026, then
+0.0016, then +0.0010, each one closer than the last.

The framing sentence for the level: if that number stays above zero forever,
twin primes are infinite. It has been measured nine times and it is drifting
towards a specific value, slowly, from above.

*Aha:* six years of doodling ends at a single number, and you can watch it being
predicted before it is measured.

This should be the largest graphic on the page and it is the one a professional
reader will screenshot. It is also, built this way, the one a sixteen year old
will understand fastest, because a prediction landing is a thing everyone
recognises.

### Act 10 — The ledger, and the ask

Two columns of equal weight. Left, refuted: our own killed claims, dated, each
with what replaced it. Right, open: the @41 drift point with forecasts already
on record, the variance limit down to one constant, the grain census law, the
d ↦ G_d map.

Then the coda: 2020 to 2026, 26 folders, built without the literature, and what
that turned out to mean. The AI disclosure statement verbatim from PAPERS.md.
The OpenTimestamps attestation with its Bitcoin anchor. A contact line saying
exactly what kind of response would be useful.

---

## 5. Build plan

Seven phases. The instruments come before the writing, which is the one thing
that changes now that the page is also a research tool. If a bench session turns
up something real, the script gets written knowing about it, rather than being
rewritten around it.

**Phase 0 — Decisions.** The four calls in §7. Blocking, half an hour.

**Phase 1 — The kernel.** One tile engine, shared by every instrument and every
exhibit for the rest of the project: build T_x, fold, strike, mark slots at any
even offset d, walk gaps, compute census, cohorts, seams, strata. Runs in a
worker, exports plain arrays. Everything downstream is a view of this. Half a
day, and it is the only piece where being careful pays compound interest.

**Phase 2 — The bench.** Instruments 1, 2 and 3 from §3, built ugly, with every
knob and a numeric readout. Then a session, or several, of you actually playing
with them. This phase has no deliverable other than what you find, and it should
be timeboxed rather than completed: a week of evenings, with anything promising
written up as a normal research artifact in `research/` under the usual
calibration rules.

Instruments 4, 5 and 6 get built during phase 4 as their exhibits come up,
unless phase 2 makes one of them urgent.

**Phase 3 — The script.** The complete scroll copy as `web/script.md`, in your
voice, calibrated on the ladder, before any page exists. Every act's text, every
caption, every expandable expert block, and for each act the named aha sentence
it is supposed to produce. You read it and mark it up. This is the product; the
code is delivery. One session to draft, one to revise.

The script gets one extra pass the papers never needed: a **reading-level
audit**, act by act, against the contract in §2. Every sentence that assumes
something past the syllabus either gets rebuilt from counting, gets demoted into
the expert layer, or gets cut. My expectation is that acts 7, 8 and 9 come back
from that audit needing real work, and that the rest survive mostly intact,
because the early material is genuinely elementary and always was.

**Phase 4 — Exhibits and the data layer.** Each instrument gets its narrative
configuration, the notebook rendering, and its predict-then-reveal interaction.
In parallel, one script, `web/build-data.js`, pulls every number the page shows
out of the committed research scripts into a single `data.json`. Nothing on the
page is typed by hand, so the page cannot drift from the repo. Covers fold
sequences, census ladder, β table, G₂ terms, grain census, variance numbers, the
five door prices.

Two exhibits are not instrument configurations and carry their own risk: the
parity two-pile demo and the β prediction chart. Both get prototyped
standalone. The parity demo is the highest-risk item on the whole build, because
it is the one place where the reading-level contract and the mathematics are
genuinely in tension.

**Phase 5 — Assembly.** Scroll mechanics, sticky canvas handoff between acts,
the predict-then-reveal interactions, calibration markers, expandable exact
statements. `labs/primes/index.html` plus `main.js`, no build step, matching the
existing labs convention.

**Phase 6 — Polish.** Mobile (the tile becomes a vertical strip below 700px),
reduced motion with a static fallback for every animation, dark and light, OG
image, structured data. Under 250KB total, no external requests, interactive
inside a second on a phone. Phone matters more than usual here: the target
reader is sixteen and will meet this page on a phone, in bed, from a link.

**Phase 7 — Review and hold.** Three passes, then hold. A math accuracy pass
against the papers, a style pass against `paper/writing-style-math.md`, and a
real reader test: put it in front of one or two actual teenagers and watch where
they stop scrolling. The scroll-depth point where a real sixteen year old quits
is the only honest measurement of whether the contract in §2 was met, and it is
cheap to get. Then it sits committed and undeployed until you lift the
moratorium.

---

## 6. Technical decisions, with recommendations

**Stack.** Plain static, `index.html` plus `main.js` plus `data.json`, no build
step, no framework. Matches `labs/blids` and `labs/galaxcelerate`.

**Rendering.** Canvas 2D, not WebGL. Tiles to T₁₃ (30,030 cells) render directly
at readable size; T₁₇ and beyond render as an aggregated density strip, which is
honest and more legible than pretending to draw half a million cells. Tile
computation in a Web Worker so scroll never stutters.

**The kernel is the deliverable that outlives the page.** One engine, plain
arrays, no rendering assumptions, exercised by both the bench and the exhibits.
If it is written well, the next visual question you have costs an hour instead
of a day, which is the actual long-run argument for building this at all.

**The hand-drawn register.** Achieved in canvas with slight per-mark jitter,
tapered stroke ends, and a paper texture, not with an SVG filter. Cheap, and it
degrades to clean rendering by act 7 by simply turning the jitter to zero, which
means one renderer serves both registers.

**Scroll.** IntersectionObserver plus a per-act progress value. No
scroll-jacking, no hijacked wheel, no scroll-triggered navigation. A reader who
flicks past an act still gets a coherent page.

**Math typesetting.** About twenty formulas, none heavier than a product or a
fraction. Hand-rolled HTML and CSS rather than KaTeX, which would triple page
weight for this. Vendor KaTeX locally only if a formula turns out to need real
layout.

---

## 7. Four decisions I need from you

**1. The moratorium.** This page is a publication, and `README.md` says nothing
leaves the repo until declared done. The plan assumes build fully, deploy on
your word. Confirm, or name the ship condition (Paper II gated, OEIS submitted,
expert contacted).

The bench in phase 2 is unaffected either way. Instruments that never leave your
machine are not a publication, so the research half of this can start
immediately regardless of what you decide about shipping.

**2. How deep the second layer goes.** Recommendation: one page, two depths. The
aha ladder is the page, and it reads start to finish with no mathematics beyond
counting. An expert clicks any claim open to get the exact statement, its
hypotheses, and the script filename that produced the number. This beats writing
two pages, and the expandable blocks are where the rigor lives.

The thing to be clear-eyed about: the highschool layer is now the primary
deliverable and the expert layer is the annex, which is the reverse of how the
material currently exists. Every act has to earn its place with a sixteen year
old first. Where the two layers conflict, the main flow loses precision and the
expert block restores it three lines later, rather than the main flow carrying a
qualifier the young reader cannot parse. Confirm that ordering, because it
governs a hundred small calls in phase 1.

**3. What stays behind.** My recommendation, and this one matters. Publish the
aha ladder, the reality checks, the wall survey, the pigeonhole theorem, and β.
Do **not** publish the sift-limit map or the Lemma V road in any detail. That
document is the one thing on the property a competent analytic number theorist
could pick up and run with, and it names the missing lemma precisely. One
sentence on the page establishes priority without handing over the map. Paper
II's 4.267 bound is separately gated on the DHR line check, so it appears with
its gate stated or not at all.

**4. URL and title.** Recommendation: `chrisbenjaminsen.com/labs/primes/`,
titled "Primes as Moiré Patterns", with primeoire introduced inside as the
framework's name. "Primes" is what people search; "primeoire" is what they
remember afterwards.

---

## 8. One thing I need from you that is not a decision

The notebook. If the original doodles exist as photographs or scans, they should
be on the page, in act 0 and at each act's opening. Not as nostalgia, and for a
sixteen year old reader it may be the most important asset on the page. Seeing
the actual hand-drawn version of the fold, next to the interactive one they just
operated, delivers a second aha for free: this was found with a pen, by somebody
who was not a professional mathematician, and I could have found it.

That is also the page's best possible closing argument, and it is one that a
printed paper cannot make.

---

## 9. Cost, and what it buys

Half a day for the kernel, a day for the first three instruments, then your
bench time, which is open-ended by design. After that, one focused day for the
script and data layer, one to two days for exhibits and assembly, half a day of
polish, plus the reading-level audit and the reader test.

Three things it buys, in increasing order of value.

The publication artifact, which is the stated goal and the least interesting of
the three.

The coherence pass the TODO already calls for at item zero. Every reversal from
the night campaign has to be reconciled in public-facing prose before it can be
drawn, and explaining this to a sixteen year old is a strictly harder test than
explaining it to a referee. Anything that survives it is understood.

The bench itself. Six years of results came out of visual experiments run by
hand; the current corpus is a hundred files of numerical output with no visual
layer at all, which is a strange thing for a framework whose objects are all
shapes. Restoring the instrument you originally worked with, now backed by a
kernel that can fold to any level and offset in a worker, is the part of this
proposal most likely to produce something that was not in the plan.
