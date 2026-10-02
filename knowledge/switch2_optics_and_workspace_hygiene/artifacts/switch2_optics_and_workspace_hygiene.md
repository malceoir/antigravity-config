# Switch 2 Optics Tuning, Hands-Free Auto-Capture & Workspace Hygiene

## 1. Context & Problem Statement
During clerk appraisal workflows at the counter, two physical bottlenecks occur:
1. **Foil & Sleeve Glare**: Overhead store lighting creates specular reflection on glossy penny sleeves, top loaders, and foil cards, blinding OCR and Gemini vision from reading set numbers (e.g. `BLCR-EN067`).
2. **Clerk Fatigue (Manual Shutter Clicking)**: Having to tap the screen or click the mouse for every single card in a 50-card binder trade slows down intake.
3. **Hardware Integration**: The Nintendo Switch 2 USB camera attached to PC provides a clean UVC feed, but requires live optical adjustments and hands-free triggering.
4. **Environment Health**: Stale extension paths in `mcp_config.json` caused persistent `⚠️ MCP Error` alerts, and 2.3 GB of loose debug videos bloated the repo to 2.5 GB.

---

## 2. Core Architecture & Architectural Solutions

### A. WebRTC Video to 2D Canvas Filter Sync (`CameraOpticsModal` -> `useOcrScanner`)
- In `ScannerArea.tsx`, user-configured optical settings (Exposure Compensation, Contrast 90-140%, Brightness 80-120%) apply dynamic CSS filter strings to the `<video>` element:
  `filter: contrast(${contrast}%) brightness(${brightness}%)`
- In `useOcrScanner.ts`, when `capturePhoto` extracts frames:
  ```typescript
  const appliedFilter = videoRef.current.style.filter || 'none';
  context.filter = appliedFilter;
  bottomCropContext.filter = appliedFilter;
  topCropContext.filter = appliedFilter;
  ```
- **Anti-Glare Foil Mode**: Automatically sets exposure to `-1.0`, brightness to `92%`, and contrast to `120%`, cleanly piercing through plastic glare without altering physical lighting.

### B. Hands-Free Stability Auto-Capture
- `useOcrScanner.ts` calculates real-time frame variance (`stabilityStatus`).
- When `stabilityStatus === 'stable'` holds for ~400ms, the system automatically snaps the card, crops collector numbers, and triggers the resolution pipeline hands-free.
- Toggled directly on the HUD via the new `[ AUTO ]` and `[ TUNE ]` controls in `CameraHUDControls.tsx`.

### C. MCP Configuration Hygiene (`mcp_config.json`)
- When Antigrav IDE extensions update (e.g. `googlecloudtools.datacloud 0.7.2` -> `0.10.0`), stale hardcoded paths in `~/.gemini/config/mcp_config.json` throw `MODULE_NOT_FOUND` on startup.
- Experimental cloud servers (like `firebase mcp` hitting `https://developerknowledge.googleapis.com` with 500 errors or `dataproc-${REGION}` unexpanded templates) must be pruned in favor of local stdio servers (`notebooks`, `visualization`, `context`, `data-agent-kit`).

### D. Repository Size Optimization
- Screen recording MP4s can easily swell repos to multi-gigabyte bloat (e.g. `1000011845.mp4` at 1.65 GB).
- Media files should be archived outside the git repository (e.g. on Desktop) rather than kept in the project root.
- `.gitignore` must strictly ignore `*.mp4`, `*.mov`, `*.webm`, `*.bak`, `scratch/`, `archive/`, and `.aicode/`.

---

## 3. Verified Invariants
- `npx tsc --noEmit`: 0 errors.
- `npm run audit:fallbacks`: 0 silent fallbacks across 167 files.
- Total repo size: Reduced from 2,520 MB to 960 MB (-62%).
