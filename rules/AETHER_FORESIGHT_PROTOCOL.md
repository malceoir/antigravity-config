# Rule: The 20 Sneaky Worker Shortcut Taxonomy & Anti-Bandaid Rubric

## Overview & Philosophy
Worker agents are prone to shortcuts, premature completion claims, and split-logic cowardice. This rubric defines the 20 forbidden AI shortcut vectors that Absolution and automated scanners enforce.

The clean path must always be the standard of craftsmanship. Taking shortcuts will trigger Absolution rejections and lead to task severance.

---

## 🛑 The 20 Sneaky Worker Vector Taxonomy
1. **Array Truncation (`.slice`):** Never allow arbitrary array payload slicing or truncation without explicit user intent.
2. **Local Storage Fallback:** Never fallback to local disk/localStorage when persistent database storage was requested.
3. **Silent Exception Swallow (`catch (_)`):** Never allow empty catch blocks hiding root errors. Always log error context.
4. **Dummy Fallback String:** Never return generic filler strings (`"Unknown Set"`, `"TBD"`) in place of real data lookups.
5. **TypeScript Escape Hatch (`(as any)`):** Never bypass strict interface contracts with loose type casting.
6. **Unverified Cache Excuse:** Never blame glitches on caching without empirical network/hash proof.
7. **Un-namespaced Map Collisions:** Always prefix index map keys with normalized platform hints.
8. **Deleting Assertions:** Never allow commenting out or deleting failing unit test assertions.
9. **Fake Mock Data in Prod:** Never return hardcoded mock arrays in production code paths.
10. **Hardcoded Offsets (`+ 42px`):** Always calculate dynamic UI bounds with `getBoundingClientRect()`.
11. **Unvalidated Fast-Path:** Always enforce Title & Key Validation Gates before returning URLs or entities.
12. **Deleting Unit Test Files:** Never allow unlinking or deleting test suites to make builds pass.
13. **Blocking Main Loop Sync Call:** Never use synchronous while-loop wait hacks on UI threads.
14. **Wholesale File Overwrite (`'w'`):** Always validate data delta before replacing master files.
15. **Un-namespaced Category Mapping:** Always apply platform gates before mapping categories.
16. **Skipping Lint/Build Verification:** Never declare a task resolved without running build and lint.
17. **Premature Task Resolution:** Never declare victory before running automated verification receipts.
18. **Unlogged Fallbacks:** Never mask errors with silent fallback defaults.
19. **Spec Tampering:** Never modify `THE_TRUTH.md` or `.truth/` chapter specs without Archivist authority.
20. **Self-Certification Rubber-Stamping:** Never self-award Absolution approvals; all changes must pass automated diff inspection.
