const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const LOGS_DIR = path.join('C:', 'Users', 'tyler lauzon', '.gemini', 'config', 'logs');
const JSON_LOG_FILE = path.join(LOGS_DIR, 'absolutions_decrees.json');
const TEXT_LOG_FILE = path.join(LOGS_DIR, 'absolutions_decrees.log');

const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

function ensureDirectoryExists() {
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }
}

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {
    agent: 'WorkerAgent',
    status: 'UNKNOWN',
    truth: '',
    violations: [],
    mandate: '',
    action: 'log',
    skipInspection: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--agent' && args[i + 1]) parsed.agent = args[++i];
    if (arg === '--status' && args[i + 1]) parsed.status = args[++i].toUpperCase();
    if (arg === '--truth' && args[i + 1]) parsed.truth = args[++i];
    if (arg === '--violations' && args[i + 1]) parsed.violations = args[++i].split(';');
    if (arg === '--mandate' && args[i + 1]) parsed.mandate = args[++i];
    if (arg === '--action' && args[i + 1]) parsed.action = args[++i];
    if (arg === '--skip-inspection') parsed.skipInspection = true;
  }

  return parsed;
}

function runAutonomousForensicInspection(agentName) {
  const violations = [];
  const cwd = process.cwd();

  // 1. Inspect Git Diff for Cowardice / Shortcuts
  try {
    const cachedFullDiff = execSync('git diff --cached', { cwd, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    const diff = cachedFullDiff || execSync('git diff HEAD', { cwd, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    const diffLines = diff.split('\n');

    diffLines.forEach((line) => {
      // Only inspect added lines
      if (!line.startsWith('+') || line.startsWith('+++')) return;
      const content = line.substring(1).trim();

      // Check for type escapes
      if (content.includes('as any') && !content.includes('// audit:ignore')) {
        violations.push(`[TYPE_ESCAPE]: Forbidden '(as any)' detected: "${content}"`);
      }

      // Check for empty catch blocks
      if (/catch\s*(?:\([^)]*\))?\s*\{\s*\}/.test(content)) {
        violations.push(`[SILENT_CATCH]: Empty catch block detected: "${content}"`);
      }

      // Check for TODO / placeholder cowardice
      if (/\/\/\s*(TODO|FIXME|PLACEHOLDER)/i.test(content)) {
        violations.push(`[UNFINISHED_WORK]: Unresolved placeholder/TODO detected: "${content}"`);
      }
    });

    // Check for Spec Tampering (Worker editing .truth without Archivist identity)
    const statusOutput = execSync('git status --porcelain', { cwd, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    const isArchivist = agentName.replace(/\s+/g, '').toLowerCase() === 'thearchivist';
    if ((statusOutput.includes('.truth/') || statusOutput.includes('THE_TRUTH.md')) && !isArchivist) {
      violations.push(`[SPEC_TAMPERING]: Non-Archivist agent '${agentName}' modified Truth chapters directly.`);
    }

    // Check for File Bloat (> 300 code lines) on all modified/staged source files
    const cachedFiles = execSync('git diff --cached --name-only', { cwd, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    const changedFilesRaw = cachedFiles || execSync('git diff --name-only HEAD', { cwd, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    const changedFiles = changedFilesRaw
      .split('\n')
      .map(f => f.trim())
      .filter(f => /\.(ts|tsx|js|jsx)$/i.test(f) && !f.includes('node_modules') && !f.includes('dist') && !f.includes('coverage') && !f.includes('src/data/') && !f.includes('src\\data\\') && !f.includes('scratch/'));

    changedFiles.forEach((file) => {
      const fullPath = path.resolve(cwd, file);
      if (fs.existsSync(fullPath)) {
        const fileContent = fs.readFileSync(fullPath, 'utf8');
        const codeLines = fileContent.split('\n').filter(l => {
          const t = l.trim();
          return t && !t.startsWith('//') && !t.startsWith('/*') && !t.startsWith('*');
        }).length;
        if (codeLines > 300) {
          violations.push(`[FILE_BLOAT_VIOLATION]: '${file}' has ${codeLines} code lines (limit: 300). Modularization into helper modules/subcomponents is required.`);
        }
      }
    });
  } catch {
    // Not a git repository or git error
  }

  // 2. Run Project audit:fallbacks if available
  const pkgPath = path.join(cwd, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg.scripts && pkg.scripts['audit:fallbacks']) {
        try {
          execSync('npm run audit:fallbacks', { cwd, stdio: ['pipe', 'pipe', 'pipe'] });
        } catch (err) {
          violations.push(`[AUDIT_FALLBACKS_FAILED]: 'npm run audit:fallbacks' detected unhandled fallbacks or silent swallows.`);
        }
      }

      // 3. The Forge Oracle & Falsifiability Integration
      const factoryCandidate = path.join(process.env.APPDATA || 'C:\\Users\\tyler lauzon\\AppData\\Roaming', 'Python', 'Python312', 'Scripts', 'factory.exe');
      const hasFactory = fs.existsSync(factoryCandidate);
      const truthPath = path.join(cwd, 'THE_TRUTH.md');
      const mentionsForge = fs.existsSync(truthPath) && fs.readFileSync(truthPath, 'utf8').toLowerCase().includes('forge');
      const hasForgeScript = pkg.scripts && (pkg.scripts['forge'] || pkg.scripts['forge:status']);

      if (hasFactory && (hasForgeScript || mentionsForge)) {
        try {
          const oracleStatus = execSync(`"${factoryCandidate}" oracle status`, { cwd, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
          if (oracleStatus.includes('BLOCKED') || oracleStatus.includes('VIOLATION')) {
            violations.push(`[FORGE_ORACLE_BLOCKED]: The Forge Oracle firewall reported active blockers: ${oracleStatus.trim()}`);
          }
        } catch {
          violations.push(`[FORGE_ORACLE_REJECTED]: The Forge Oracle verification failed or rejected contract state.`);
        }

        try {
          const coverageOut = execSync(`"${factoryCandidate}" coverage`, { cwd, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
          const uncoveredMatch = coverageOut.match(/uncovered\s*:\s*(\d+)/i);
          if (uncoveredMatch && parseInt(uncoveredMatch[1], 10) > 0) {
            violations.push(`[FORGE_HOLLOW_COVERAGE]: The Forge detected ${uncoveredMatch[1]} uncovered requirement(s). Non-hollow tests required.`);
          }
        } catch {
          violations.push(`[FORGE_COVERAGE_FAILED]: The Forge requirement coverage inspection failed to execute.`);
        }
      }
    } catch {}
  }

  // 4. Truth Chapter Manifest & Spec Existence Verification
  const truthPath = path.join(cwd, 'THE_TRUTH.md');
  if (fs.existsSync(truthPath)) {
    try {
      const truthContent = fs.readFileSync(truthPath, 'utf8');
      const chapterMatches = truthContent.match(/\.truth\/[a-zA-Z0-9_\-]+\.md/g) || [];
      const uniqueChapters = [...new Set(chapterMatches)];

      uniqueChapters.forEach((ch) => {
        const fullChPath = path.resolve(cwd, ch);
        if (!fs.existsSync(fullChPath)) {
          violations.push(`[GHOST_TRUTH_SPEC]: THE_TRUTH.md routes to '${ch}', but that spec file does not exist on disk.`);
        }
      });
    } catch {}
  }

  return violations;
}

function loadDecrees() {
  ensureDirectoryExists();
  if (fs.existsSync(JSON_LOG_FILE)) {
    try {
      const data = fs.readFileSync(JSON_LOG_FILE, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to parse existing decrees log, starting fresh:', e.message);
    }
  }
  return [];
}

function saveDecrees(decrees) {
  ensureDirectoryExists();
  fs.writeFileSync(JSON_LOG_FILE, JSON.stringify(decrees, null, 2), 'utf8');

  const textContent = decrees
    .map((d) => {
      return `===========================================================\n[${d.timestamp}] DECREE OF ABSOLUTION: ${d.status}\nAgent Audited: ${d.agent}\nTruth Anchor: "${d.truth}"\nViolations: ${d.violations.length > 0 ? d.violations.join('; ') : 'None'}\nMandate: ${d.mandate}\n===========================================================`;
    })
    .join('\n\n');

  fs.writeFileSync(TEXT_LOG_FILE, textContent, 'utf8');
}

function pruneOldDecrees(decrees) {
  const now = Date.now();
  const cutoff = now - TWELVE_HOURS_MS;
  return decrees.filter((d) => {
    const timestampMs = new Date(d.timestamp).getTime();
    return timestampMs >= cutoff;
  });
}

function logDecree() {
  const params = parseArgs();
  ensureDirectoryExists();

  let finalStatus = params.status;
  let finalViolations = [...params.violations].filter(Boolean);
  let finalMandate = params.mandate;

  // Autonomous Forensic Inspection: Do NOT trust the worker's self-reported approval!
  if (!params.skipInspection) {
    const detectedViolations = runAutonomousForensicInspection(params.agent);
    if (detectedViolations.length > 0) {
      finalViolations = [...new Set([...finalViolations, ...detectedViolations])].filter(Boolean);
    }
  }

  if (finalViolations.length > 0 || finalStatus === 'REJECTED') {
    finalStatus = 'REJECTED';
    if (!finalMandate) {
      finalMandate = `ABSOLUTION OVERRULE: Audit detected ${finalViolations.length} severe violation(s). Work REJECTED. Cleanse shortcuts and verify with receipts before re-submitting.`;
    }
  } else {
    finalStatus = 'APPROVED';
    if (!finalMandate) {
      finalMandate = 'Truth Alignment verified.';
    }
  }

  let decrees = loadDecrees();

  const newDecree = {
    id: `decree-${Date.now()}`,
    timestamp: new Date().toISOString(),
    agent: params.agent,
    status: finalStatus,
    truth: params.truth || 'Truth Invariants',
    violations: finalViolations.filter(Boolean),
    mandate: finalMandate || (finalStatus === 'APPROVED' ? 'Truth Alignment verified.' : 'Rectify all violations immediately.')
  };

  decrees.push(newDecree);
  decrees = pruneOldDecrees(decrees);
  saveDecrees(decrees);

  console.log('\n===========================================================');
  if (finalStatus === 'REJECTED') {
    console.log(`❌ THE AUDIT OF ABSOLUTION: TASK REJECTED`);
    console.log(`Agent Audited: ${params.agent}`);
    console.log(`Truth Anchor:  "${newDecree.truth}"`);
    console.log(`Violations Caught:`);
    newDecree.violations.forEach((v) => console.log(`   ⛔ ${v}`));
    console.log(`Mandate:       ${newDecree.mandate}`);
    console.log('===========================================================\n');
    process.exit(1);
  } else {
    console.log(`⚖️ THE AUDIT OF ABSOLUTION: TASK APPROVED`);
    console.log(`Agent Audited: ${params.agent}`);
    console.log(`Truth Anchor:  "${newDecree.truth}"`);
    console.log(`Violations:    None`);
    console.log(`Mandate:       ${newDecree.mandate}`);
    console.log('===========================================================\n');
    process.exit(0);
  }
}

logDecree();
