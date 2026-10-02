# THREAD HEALTH & PREEMPTIVE BREAKPOINT PROTOCOL (ANTI-FREEZE INVARIANT)

## 1. Context & Purpose
Antigravity IDE conversations serialize full transcripts, tool actions, and diff snapshots to disk (`transcript.jsonl`). As conversation threads grow beyond ~25-35 substantive turns or ~1,500+ steps, the internal IDE bridge and IPC messaging layer experience exponential memory pressure. At 2,000+ turns, extension host tool calls are prone to hung RPC calls (20+ minute hangs) and unresponsive stream timeouts ("freezing").

## 2. Core Operational Invariants
1. **Preemptive Milestone Check-In**:
   - Whenever an agent completes a complex feature, deep multi-step refactoring, or a significant milestone (e.g., building a complete hub, debugging complex pipelines, or reaching ~25-30 substantive turns):
   - The agent MUST proactively evaluate transcript depth.
   - If the thread has accumulated deep history, the agent MUST explicitly advise The Creator that the milestone is locked in, nothing is in flight, and this represents a prime, natural breakpoint to start a fresh chat thread.

2. **Mobile Server Proactive UI Telemetry**:
   - `antigravity_phone_chat` monitors CDP snapshot node depth and HTML payload size in real-time.
   - **Advisory Threshold**: `>= 1,800 Nodes` or `>= 110KB DOM`. Displays an amber banner (`⚡ Long Conversation Advisory`) offering a 1-tap `+ New Chat` action.
   - **Critical Freeze Risk**: `>= 3,200 Nodes` or `>= 220KB DOM`. Displays a pulsing red banner (`🚨 High Freeze Risk`) warning of imminent IDE lockup.

3. **Smooth Transition Guarantee**:
   - Before suggesting a thread transition, the agent ensures all active edits and files are fully committed to disk and runtime verified so The Creator loses zero context when opening the new thread.
