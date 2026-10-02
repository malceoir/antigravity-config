---
name: factoryline-verifier
description: |
  The Forge: Independent local-first proof layer and verification engine. Use when auditing code changes, preventing AI "can't-fail" synthetic tests, evaluating test coverage, challenging definition-of-done contracts, or validating code quality.
  Key commands:
  - `factory coverage`: Audit non-hollow test requirement coverage
  - `factory oracle challenge`: Challenge implementation lanes and prove tests reject bugs
  - `factory oracle status`: Check definition-of-done firewall state
  - `factory policy`: Inspect quality and risk governance rules
  - `factory mission-control status`: Inspect evidence state, blockers, and agent authority
license: Proprietary
metadata:
  version: v1
  publisher: antigravity
---

# The Forge (Local Proof & Verification Engine)

The **Forge Engine** (`factory` CLI v0.46.2) is a local-first proof layer installed at:
`C:\Users\tyler lauzon\AppData\Roaming\Python\Python312\Scripts\factory.exe` (in user PATH as `factory`).

## Core Invariants

1. **Anti-Synthetic Mandate**:
   - Never accept AI-generated tests that pass unconditionally.
   - Any test claiming to cover a bug MUST be proven to fail (RED) against the broken code before verifying that the patch turns it green.

2. **Verification Commands Reference**:

### `factory coverage`
Runs requirement coverage inspection. Flags uncovered requirement manifests and detects hollow test suites.
```powershell
factory coverage
```

### `factory oracle`
Maintains the "Definition of Done" firewall between user intent and agent candidate patches:
- `factory oracle status`: Inspect active contract state without mutating files.
- `factory oracle init`: Establish contract workspace.
- `factory oracle challenge --trace <trace>`: Prove that test verification rejects broken code.
- `factory oracle diff`: Fail closed if candidate code weakens prior requirements.

### `factory policy`
Inspects local quality and risk policies (e.g. `require_hollow_tests: true`, `min_goldens: 1.0`).
```powershell
factory policy --json
```

### `factory mission-control`
Monitors local evidence status, review gates, and active blockers before a task is declared done.
```powershell
factory mission-control status
```

3. **Modality Rule**:
   - Terminal and CLI verification commands validate backend contracts and test falsifiability.
   - Client UI, animations, and DOM rendering MUST be validated in the live browser via the browser subagent (`browser_subagent`).
