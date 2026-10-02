# Antigravity Agent Model, Personas, Skills & Knowledge Base

Unified configuration and context repository for Prism, Absolution, Paragons, custom skills, rules, and knowledge base.

---

## 🚀 Setup on Work PC (or Any New Machine)

### Step 1: Clone into `.gemini\config`
Open PowerShell on your work PC and run:
```powershell
git clone https://github.com/malceoir/antigravity-config.git "$env:USERPROFILE\.gemini\config"
```

### Step 2: Run the 1-Click Setup Script
```powershell
cd "$env:USERPROFILE\.gemini\config"
.\setup_work_pc.ps1
```
This script will:
- Copy all knowledge items directly into `$env:USERPROFILE\.gemini\antigravity-ide\knowledge\`
- Automatically normalize any username paths in `mcp_config.json`
- Verify your Node.js runtime for MCP and severance scripts

### Step 3: Restart Antigravity IDE
Restart Antigravity IDE on your work PC. Prism, Absolution, Paragons, all custom skills, and your entire knowledge base will be active immediately.

---

## 🔄 Keeping Home and Work in Sync

Whenever you add or update skills, rules, or agent personas on either computer:

### On the machine with changes:
```powershell
cd "$env:USERPROFILE\.gemini\config"
git add .
git commit -m "feat: update agent skills and rules"
git push
```

### On the other machine:
```powershell
cd "$env:USERPROFILE\.gemini\config"
git pull
.\setup_work_pc.ps1
```
