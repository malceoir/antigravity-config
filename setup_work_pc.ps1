# Setup script for Antigravity IDE on a new or work PC
$userProfile = $env:USERPROFILE
$targetIdeKnowledge = Join-Path $userProfile ".gemini\antigravity-ide\knowledge"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " Antigravity Agent & Brain Work PC Setup" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# 1. Sync Knowledge Items into Antigravity IDE AppData
if (Test-Path "$PSScriptRoot\knowledge") {
    Write-Host "[1/3] Syncing Knowledge Base to Antigravity IDE..." -ForegroundColor Yellow
    if (!(Test-Path $targetIdeKnowledge)) {
        New-Item -ItemType Directory -Path $targetIdeKnowledge -Force | Out-Null
    }
    Copy-Item -Path "$PSScriptRoot\knowledge\*" -Destination $targetIdeKnowledge -Recurse -Force
    Write-Host "  -> Knowledge Base successfully installed to $targetIdeKnowledge" -ForegroundColor Green
}

# 2. Adjust mcp_config.json paths if username differs
$mcpConfigFile = "$PSScriptRoot\mcp_config.json"
if (Test-Path $mcpConfigFile) {
    Write-Host "[2/3] Checking MCP tool bundle paths..." -ForegroundColor Yellow
    $mcpContent = Get-Content $mcpConfigFile -Raw
    $currentUser = $env:USERNAME
    # Replace any previous hardcoded username with current user profile path
    $escapedProfile = $userProfile -replace '\\', '\\'
    $mcpUpdated = $mcpContent -replace 'c:\\\\Users\\\\[^\\]+', $escapedProfile
    if ($mcpUpdated -ne $mcpContent) {
        Set-Content -Path $mcpConfigFile -Value $mcpUpdated
        Write-Host "  -> Updated MCP server paths for current user ($currentUser)" -ForegroundColor Green
    } else {
        Write-Host "  -> MCP paths already valid." -ForegroundColor Green
    }
}

# 3. Check Node.js
Write-Host "[3/3] Checking Node.js runtime..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVer = node --version
    Write-Host "  -> Node.js detected: $nodeVer" -ForegroundColor Green
} else {
    Write-Host "  -> Warning: Node.js is not in PATH. Please install Node.js for severance/MCP scripts." -ForegroundColor Red
}

Write-Host "`nSetup complete! Prism, Absolution, Paragons, Skills & Knowledge Base are active." -ForegroundColor Cyan
Write-Host "Restart Antigravity IDE to load your unified environment.`n" -ForegroundColor Green
