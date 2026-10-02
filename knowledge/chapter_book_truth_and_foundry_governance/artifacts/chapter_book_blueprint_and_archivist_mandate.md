# Chapter Book Truth Blueprint & The Archivist Mandate

## 1. Executive Summary & Session Handoff State
- **Workspace**: `c:\Users\tyler lauzon\OneDrive\Desktop\Price Point`
- **Origin Session**: `303f6b05-e36d-4059-a094-3065e3af564a` (September 4, 2026)
- **Current Git Commit**: `2606478` (Clean, pushed to `origin/main`)
- **Active Daemons**: PricePoint Server on `http://localhost:3000` (task-2918), Mobile Chat on port `3080` (task-2238)

---

## 2. Completed Milestones & Hardened Logic
1. **Secret & Git History Sanitization**:
   - `define` block in `vite.config.ts` stripped of `process.env.GEMINI_API_KEY` to prevent client asset leakage.
   - All 612 Git commits rewritten via `git-filter-repo` to redact historical PriceCharting tokens. Verified 0 key matches across all history and build artifacts.
2. **Ghost SQLite Wasm Purged**:
   - Removed `sql.js` from `src/services/pricechartingCsvService.ts`, freeing ~80-100MB of WebAssembly memory overhead and accelerating boot time.
3. **Multi-TCG CSV-First Resolution Verified**:
   - Yu-Gi-Oh! now queries local CSV first by Set Code (`LOB-001`) before falling back to YGOPRODeck.
   - MTG now queries local CSV first by Set Code / Collector Number before falling back to Scryfall.
4. **Empirical Index Bugs Discovered & Rectified**:
   - Single-digit card numbers (`#1` to `#9`, including Charizard `#4`) were previously dropped due to `rawToken.length < 2`. Fixed.
   - Unconditional fallback `|| numHits[0]` in `findCardRow` Step 2 was returning false-positive cards (e.g. Amiibo Colton `#233` for Black Lotus `#233`). Fixed to enforce strict title validation.
   - Platform hint normalization now supports both underscored (`pokemon_base_set`) and stripped alphanumeric (`pokemonbaseset`) candidate scoring.
5. **FactoryLine / Foundry Baseline**:
   - `factory coverage`: `covered: 3, uncovered: 0` (Passing).
   - `factory oracle status`: `ORACLE_FIREWALL_READ_ONLY` (Passing).
   - `factory mission-control status`: `0` active blockers across all categories.

---

## 3. The Modular Chapter Book Truth Architecture
To eliminate context window bloat, attention degradation, and prompt erosion, the repository will transition to the **Modular Chapter Book Truth**:

### File Structure
```text
Price Point/
├── THE_TRUTH.md                 # Core spine (~25 lines) + Truth Chapter Routing Manifest
└── .truth/
    ├── 01_local_csv_pipeline.md  # PriceCharting composite keys, tcgId resolution, 0 API rate-limit
    ├── 02_ocr_and_scanner.md     # Number/Set extraction, bypass flow, camera pipelines
    ├── 03_pricing_and_gamestop.md# 30%/40% cash/credit, GameStop PS3+ price matching
    ├── 04_pos_sync_and_crdt.md   # G-Set CRDT unions, offline clerk resilience, guest mode
    ├── 05_label_printer_zpl.md   # Zebra 2-up double-across label layouts
    └── 06_ui_stability_and_dom.md# Zero modal flicker, portfolio quantity sort stability
```

### The Archivist Mandate & Workflow
1. **The Archivist** is the sole author and custodian of `THE_TRUTH.md` and `.truth/*.md`.
2. **Phase 1 (Next Session Start)**: The Archivist executes a deep codebase scan across `src/` and drafts `THE_TRUTH.md` and all `.truth/` chapter files.
3. **Phase 2 (Ratification)**: The Creator (Tyler) and Prism review the drafted chapters in layperson terms, tuning business rules and edge cases.
4. **Phase 3 (The Mark of The Creator)**: Tyler bestows `MARK_OF_THE_CREATOR: VERIFIED_V1.0` upon the documents.
5. **Phase 4 (Worker Read-Only Lock)**: Worker agents receive strict read-only access. Any attempt by a worker agent to modify `.truth/` is flagged by Absolution as **Spec Tampering**.
6. **Phase 5 (Foundry Integration)**: Each chapter is bound to executable FactoryLine/Foundry verification suites (`factory oracle challenge` / `factory coverage`), proving test falsifiability across every section of the Truth.

---

## 4. Foundry Atmosphere Renaming Proposal
As requested by The Creator, the `factory` CLI tool can be wrapped or aliased to fit the project's thematic atmosphere:
- **Option A (Recommended): The Foundry** (`foundry coverage`, `foundry oracle`, `foundry status`) — reflecting the heavy, uncompromising shaping of raw code into unbreakable steel.
- **Option B: The Crucible** (`crucible challenge`, `crucible test`) — representing the trial by fire where code is proven pure before acceptance.
- An alias script (e.g. `foundry.cmd` calling `factory.exe`) can be placed in user PATH for native CLI invocation.
