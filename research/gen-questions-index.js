#!/usr/bin/env node
// ============================================================================
// GEN-QUESTIONS-INDEX — regenerate research/QUESTIONS.md from the ledger blocks
// ============================================================================
// Chris, 2026-08-28: "We keep re-running things. Restructure repo so that does
// not happen." The index of questions-already-attacked is generated from the
// notes themselves so it cannot drift from them. The logic lives in
// research/qc/questions.js beside the check that gates it; this file is the
// command:
//     node research/gen-questions-index.js
// ============================================================================
const r = require('./qc/questions').generate();
console.log(`research/QUESTIONS.md: ${r.questions} questions from ${r.notes} indexed notes, ${r.unindexed} unindexed`);
