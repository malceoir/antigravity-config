# Proof-First Verification & Anti-Synthetic Testing Protocol

## 1. The Principle of Falsifiability
Every test authored or cited by a worker agent must be demonstrably **falsifiable**:
- **Ban on "Can't-Fail" Synthetic Mocks**: A test that passes unconditionally or relies on tailored synthetic data that masks real runtime failures is strictly classified as Proof Debt.
- **Red-First Bug Reproduction**: When fixing a bug, the test must first be executed against the unpatched code to prove it reliably fails (RED). Only after observing empirical failure may the fix be applied to turn the test passing (GREEN).

## 2. Separation of Modalities: Browser DOM vs. Terminal
- **UI & Interaction Invariant**: Terminal unit tests cannot validate visual stability, CSS animations, React render cycles, dialog mounting, or touch/mouse events.
- **Mandatory Headless Browser / DOM Runtime Audit**: Any UI change or bug fix affecting the clerk interface must be verified against the live application runtime (via browser subagent or DOM inspection), asserting:
  1. Zero layout blinking or visual flicker loops.
  2. Modal and dialog state mount/unmount stability.
  3. Clean console logs with zero runtime exceptions.

## 3. Real-World Ledger Replay
- Always prefer replaying actual, logged edge cases (e.g. from error logs, scan audit trails, or historical anomalies) over freshly invented pristine mock data.

## 4. FactoryLine Verification Engine (`factory` CLI)
The `factory` engine (installed at `C:\Users\tyler lauzon\AppData\Roaming\Python\Python312\Scripts\factory.exe`) enforces independent proof before code is marked resolved:
- `factory coverage`: Verifies requirement coverage and flags hollow/synthetic tests that cannot fail.
- `factory oracle challenge`: Authors an independent test lane targeting the proposed implementation to verify it rejects bugs.
- `factory oracle status` / `factory oracle diff`: Prevents goal drift and ensures the agent does not weaken human intent.
- `factory policy`: Enforces `require_hollow_tests: true` and blocks unverified assumptions.
- `factory mission-control status`: Inspects active blockers, authority boundaries, and review gates.

## 5. The Isolated Oracle Outcome Loop (Decoupled Verification Gate)
To eliminate observer contamination and confirmation bias during quality assurance:
- **Decoupled Grading**: When evaluating non-trivial code changes, the grading agent (The Forge Oracle / Absolution) operates in an isolated context without observing the worker's intermediate thought stream or internal rationalizations.
- **The Truth as Immutable Rubric**: The Oracle automatically loads the governing `.truth/*.md` chapter and the user's raw prompt as the definitive acceptance rubric—freeing the user from writing repetitive prompt criteria.
- **Risk-Tiered Activation**: Tier 1 tasks (cosmetic, documentation, or trivial helper scripts) execute via fast single-pass flow. Tier 2 tasks (modifying files mapped to core truth chapters) mandatorily trigger the decoupled Oracle gate.
- **Hard 2-Strike Circuit Breaker**: If the Worker and Oracle disagree after 2 revision cycles, the loop halts immediately and presents the diff fork directly to The Creator, preventing runaway token consumption or infinite loop thrashing.
- **Receipt-Only Auditing**: The Oracle is strictly barred from stylistic or pedantic nitpicking. Rejections require concrete evidence: either missing empirical runtime execution logs or a direct breach of an explicit negative constraint in The Truth.
