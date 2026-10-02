#!/usr/bin/env node
/**
 * PRISM: PROCEED — Automated Truth & Anti-Bandaid Scaffold Engine
 * 
 * Automatically initializes The Modular Chapter Book Truth, .truth/ specifications,
 * the 300-line monolithic file limit, anti-bandaid static analysis, and Absolution
 * gatekeeper wiring for any new or existing repository.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CWD = process.cwd();
const GLOBAL_SCRIPTS_DIR = path.join('C:', 'Users', 'tyler lauzon', '.gemini', 'config', 'scripts');

function log(emoji, msg) {
  console.log(`\x1b[36m[Prism:Proceed]\x1b[0m ${emoji} ${msg}`);
}

function success(msg) {
  console.log(`\x1b[32m[Prism:Proceed] ✓ ${msg}\x1b[0m`);
}

function warn(msg) {
  console.log(`\x1b[33m[Prism:Proceed] ⚠️ ${msg}\x1b[0m`);
}

function error(msg) {
  console.error(`\x1b[31m[Prism:Proceed] ❌ ${msg}\x1b[0m`);
}

// 1. Ensure package.json exists
function ensurePackageJson() {
  const pkgPath = path.join(CWD, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    log('📦', 'No package.json found. Initializing minimal package.json...');
    const defaultPkg = {
      name: path.basename(CWD).toLowerCase().replace(/[^a-z0-9-_]/g, '-'),
      version: '0.1.0',
      private: true,
      scripts: {}
    };
    fs.writeFileSync(pkgPath, JSON.stringify(defaultPkg, null, 2), 'utf8');
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.scripts = pkg.scripts || {};

  let modified = false;
  if (!pkg.scripts['audit:fallbacks']) {
    pkg.scripts['audit:fallbacks'] = 'node scripts/detect_silent_fallbacks.js';
    modified = true;
  }
  if (!pkg.scripts['absolution:audit']) {
    pkg.scripts['absolution:audit'] = 'node "C:\\Users\\tyler lauzon\\.gemini\\config\\scripts\\log_absolution_decree.js"';
    modified = true;
  }
  if (!pkg.scripts['prism:proceed']) {
    pkg.scripts['prism:proceed'] = 'node "C:\\Users\\tyler lauzon\\.gemini\\config\\scripts\\prism_proceed.js"';
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
    success('Updated package.json scripts with audit:fallbacks, absolution:audit, and prism:proceed');
  }
}

// 2. Scaffold THE_TRUTH.md
function ensureTheTruth() {
  const truthPath = path.join(CWD, 'THE_TRUTH.md');
  if (fs.existsSync(truthPath)) {
    log('📖', 'THE_TRUTH.md already exists. Preserving existing ratified core law.');
    return;
  }

  const projectName = path.basename(CWD);
  const content = `# THE TRUTH (${projectName.toUpperCase()} CORE INVARIANTS & ROUTING MANIFEST)
**MARK_OF_THE_CREATOR**: \`VERIFIED_V1.0\`
**Ratified**: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} by The Creator (Tyler Lauzon) & Prism Council
**Status**: SUPREME REPOSITORY LAW — WORKER READ-ONLY LOCK ACTIVE

---

## 1. Supreme Core Invariants
1. **The Proof-First Mandate**: No task may be declared fixed, complete, or resolved without automated terminal verification receipts proving 100% error-free execution in runtime reality.
2. **Zero Band-Aid Invariant**: Silent exception swallows (\`catch (_) {}\`), type escapes (\`(as any)\`), dummy fallback strings (\`"Unknown"\`), and unverified cache excuses are strictly forbidden.
3. **The 300-Line Code File Limit**: Maintain strict modular boundaries. Any TS/TSX/JS code file exceeding 300 lines must be proactively extracted into dedicated subcomponents or helper modules.
4. **Network-First Caching Default**: Web applications and service workers must enforce Network-First fetching by default (\`fetch()\` first, cache as offline fallback only).
5. **Centralized Persistence**: Domain records must never rely on \`localStorage\` as permanent master storage. Cloud and database persistence is mandatory.
6. **Archivist Sole Authorship**: Only The Archivist may author or modify \`THE_TRUTH.md\` and \`.truth/*.md\`. Worker edits are classified as Spec Tampering and rejected by Absolution.
7. **Mandatory Absolution Gatekeeper Audit**: Before any task is committed or presented, Absolution must perform an autonomous forensic audit via \`log_absolution_decree.js\`. Self-grading is banned.

---

## 2. Truth Chapter Routing Manifest
All source code files are strictly bound to their governing Truth Chapters. Worker agents and Absolution audits must load ONLY the chapters mapped below:

### Tier 1: Architecture & Data
- \`01_core_architecture.md\`:
  - \`src/App.tsx\`
  - \`src/main.tsx\`
- \`02_data_persistence_and_models.md\`:
  - \`src/services/\`
  - \`src/types/\`

### Tier 2: User Interface & Features
- \`03_components_and_ui.md\`:
  - \`src/components/\`
  - \`src/hooks/\`
`;

  fs.writeFileSync(truthPath, content, 'utf8');
  success('Scaffolded THE_TRUTH.md with supreme core invariants');
}

// 3. Scaffold .truth/ directory
function ensureTruthChapters() {
  const truthDir = path.join(CWD, '.truth');
  if (!fs.existsSync(truthDir)) {
    fs.mkdirSync(truthDir, { recursive: true });
    log('📁', 'Created .truth/ specification directory');
  }

  const existingFiles = fs.readdirSync(truthDir).filter((f) => f.endsWith('.md'));
  if (existingFiles.length > 0) {
    log('📜', `Preserving ${existingFiles.length} existing .truth/ chapter specifications.`);
    return;
  }

  const chapters = [
    {
      file: '01_core_architecture.md',
      title: '01: Core Architecture & System Boundaries',
      desc: 'Defines system topology, service layers, component modularity (sub-300 lines), and lifecycle rules.'
    },
    {
      file: '02_data_persistence_and_models.md',
      title: '02: Data Persistence, Schemas & Merge Integrity',
      desc: 'Mandates cloud/database persistence, zero data-loss merge protocols, and schema validation.'
    },
    {
      file: '03_components_and_ui.md',
      title: '03: Components, UI & Interaction Ergonomics',
      desc: 'Mobile-first ergonomics, reactive state isolation, zero-compromise UX, and clean subcomponents.'
    }
  ];

  chapters.forEach((ch) => {
    const chPath = path.join(truthDir, ch.file);
    if (!fs.existsSync(chPath)) {
      const body = `# CHAPTER ${ch.title}
**MARK_OF_THE_CREATOR**: \`VERIFIED_V1.0\`
**Governing Domain**: ${ch.desc}

## Invariants & Rules
1. All component files must remain under 300 lines of code.
2. No silent error swallows or unlogged fallback values.
3. Strict typed interfaces with zero \`(as any)\` escapes.
`;
      fs.writeFileSync(chPath, body, 'utf8');
      success(`Scaffolded .truth/${ch.file}`);
    }
  });
}

// 4. Scaffold scripts/detect_silent_fallbacks.js
function ensureAuditScript() {
  const scriptsDir = path.join(CWD, 'scripts');
  if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true });
  }

  const existingScript = ['detect_silent_fallbacks.cjs', 'detect_silent_fallbacks.js', 'detect_silent_fallbacks.ts']
    .map((name) => path.join(scriptsDir, name))
    .find((p) => fs.existsSync(p));

  if (existingScript) {
    log('🛡️', `Preserving existing audit script: ${path.basename(existingScript)}`);
    return;
  }

  const scriptPath = path.join(scriptsDir, 'detect_silent_fallbacks.cjs');
  const template = `const fs = require('fs');
const path = require('path');

const TARGET_PATHS = ['src', 'public'];
const IGNORED_FILES = ['detect_silent_fallbacks.js', 'detect_silent_fallbacks.ts'];

function collectTargetFiles(targets) {
  const fileList = [];

  targets.forEach((target) => {
    const resolved = path.resolve(process.cwd(), target);
    if (!fs.existsSync(resolved)) return;

    if (fs.statSync(resolved).isFile()) {
      if (resolved.endsWith('.ts') || resolved.endsWith('.tsx') || resolved.endsWith('.js')) {
        fileList.push(resolved);
      }
      return;
    }

    function walk(dir) {
      const entries = fs.readdirSync(dir);
      entries.forEach((entry) => {
        const fullPath = path.join(dir, entry);
        if (fs.statSync(fullPath).isDirectory()) {
          if (entry !== 'node_modules' && entry !== 'dist' && entry !== 'build') {
            walk(fullPath);
          }
        } else if (
          (entry.endsWith('.ts') || entry.endsWith('.tsx') || entry.endsWith('.js')) &&
          !IGNORED_FILES.includes(entry)
        ) {
          fileList.push(fullPath);
        }
      });
    }

    walk(resolved);
  });

  return fileList;
}

function hasLogging(text) {
  return (
    /console\\.(warn|error|log|info|debug)/.test(text) ||
    /logger\\.(warn|error|log|info|debug)/.test(text)
  );
}

function scanFile(filePath) {
  const issues = [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\\n');

  // Rule 1: Catch block inspection (Zero silent swallows)
  const catchRegex = /catch\\s*(?:\\(([^)]+)\\))?\\s*\\{/g;
  let match;

  while ((match = catchRegex.exec(content)) !== null) {
    const startIndex = match.index;
    const lineNumber = content.substring(0, startIndex).split('\\n').length;
    
    let openBraces = 1;
    let endIndex = startIndex + match[0].length;
    while (openBraces > 0 && endIndex < content.length) {
      if (content[endIndex] === '{') openBraces++;
      if (content[endIndex] === '}') openBraces--;
      endIndex++;
    }

    const catchBlock = content.substring(startIndex, endIndex);
    if (!hasLogging(catchBlock) && !catchBlock.includes('throw ')) {
      issues.push({
        filePath,
        lineNumber,
        snippet: catchBlock.split('\\n').slice(0, 3).join(' ').trim(),
        issueType: 'SILENT_EXCEPTION_SWALLOW',
        recommendation: 'Log exception via console.warn/error or re-throw to prevent silent state corruption.'
      });
    }
  }

  // Rule 2: Check for type casting escapes ((as any))
  lines.forEach((line, idx) => {
    if (line.includes('as any') && !line.includes('// audit:ignore')) {
      issues.push({
        filePath,
        lineNumber: idx + 1,
        snippet: line.trim(),
        issueType: 'TYPE_CASTING_ESCAPE',
        recommendation: 'Avoid (as any). Provide proper TypeScript interfaces or discriminating unions.'
      });
    }
  });

  // Rule 3: File Line-Count Limit (Hard 300-Line Limit on code files)
  if ((filePath.endsWith('.ts') || filePath.endsWith('.tsx')) && lines.length > 300) {
    issues.push({
      filePath,
      lineNumber: lines.length,
      snippet: \`Total lines: \${lines.length} (exceeds 300 limit)\`,
      issueType: 'MONOLITHIC_FILE_LIMIT_EXCEEDED',
      recommendation: 'Proactively extract subcomponents/submodules into dedicated files (Max 300 lines).'
    });
  }

  // Rule 4: Network-First Service Worker Strategy Check
  if (filePath.endsWith('sw.js')) {
    const fetchListener = content.includes("self.addEventListener('fetch'");
    if (fetchListener) {
      const fetchCallIndex = content.indexOf('fetch(event.request)');
      const cacheMatchIndex = content.indexOf('caches.match(');
      if (fetchCallIndex === -1 || (cacheMatchIndex !== -1 && cacheMatchIndex < fetchCallIndex)) {
        issues.push({
          filePath,
          lineNumber: 1,
          snippet: 'Service worker fetch handler',
          issueType: 'STALE_CACHE_STRATEGY_VIOLATION',
          recommendation: 'Enforce Network-First strategy (fetch() first, caches.match() in catch).'
        });
      }
    }
  }

  return issues;
}

export function runAudit() {
  console.log('\\n=== EMPIRICAL ANTI-BANDAID AUDIT (PRISM PROCEED ENGINE) ===\\n');
  const files = collectTargetFiles(TARGET_PATHS);
  let totalIssues = 0;

  files.forEach((file) => {
    const issues = scanFile(file);
    if (issues.length > 0) {
      totalIssues += issues.length;
      console.error(\`\\x1b[31m[VIOLATION]\\x1b[0m \${path.relative(process.cwd(), file)}\`);
      issues.forEach((iss) => {
        console.error(\`  Line \${iss.lineNumber}: [\${iss.issueType}] \${iss.recommendation}\`);
        console.error(\`    Snippet: \${iss.snippet}\\n\`);
      });
    }
  });

  if (totalIssues > 0) {
    console.error(\`\\x1b[31mAudit FAILED: \${totalIssues} anti-bandaid violation(s) detected.\\x1b[0m\\n\`);
    process.exit(1);
  } else {
    console.log(\`\\x1b[32mAudit PASSED: 0 violations, all files compliant across \${files.length} audited files.\\x1b[0m\\n\`);
  }
}

runAudit();
`;

  fs.writeFileSync(scriptPath, template, 'utf8');
  success('Installed scripts/detect_silent_fallbacks.js');
}

// 5. Setup Git Pre-Commit Hook (if .git exists)
function ensureGitHook() {
  const gitDir = path.join(CWD, '.git');
  if (!fs.existsSync(gitDir)) return;

  const hooksDir = path.join(gitDir, 'hooks');
  if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true });
  }

  const preCommitHook = path.join(hooksDir, 'pre-commit');
  const hookContent = `#!/bin/sh
echo "[Absolution] Running Pre-Commit Anti-Bandaid Gate..."
npm run audit:fallbacks
if [ $? -ne 0 ]; then
  echo "[Absolution] COMMIT REJECTED: Fix violations before committing."
  exit 1
fi
`;
  fs.writeFileSync(preCommitHook, hookContent, 'utf8');
  success('Configured Git pre-commit hook (Absolution Gatekeeper)');
}

// 6. Execute Self-Audit
function executeSelfAudit() {
  log('🛡️', 'Running initial verification audit...');
  try {
    execSync('npm run audit:fallbacks', { cwd: CWD, stdio: 'inherit' });
    success('Repository is 100% compliant with The Truth and Anti-Bandaid laws.');
  } catch {
    warn('Initial audit identified items to refactor. Follow Absolution recommendations.');
  }
}

// Main Runner
function main() {
  console.log('\n===========================================================');
  console.log('⚡ PRISM: PROCEED — REPOSITORY GOVERNANCE INITIALIZER');
  console.log('Target: ' + CWD);
  console.log('===========================================================\n');

  ensurePackageJson();
  ensureTheTruth();
  ensureTruthChapters();
  ensureAuditScript();
  ensureGitHook();
  executeSelfAudit();

  console.log('\n===========================================================');
  console.log('✨ INITIALIZATION COMPLETE — The Truth is Ratified & Active');
  console.log('===========================================================\n');
}

main();
