$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "FMED ENTERPRISE 1.0 - VERIFICA E8.2.3 LIGHT ONLY" -ForegroundColor Cyan
node .\scripts\verify_release_e823_light_only.mjs

Write-Host "Installazione pulita dipendenze..." -ForegroundColor Cyan
npm ci --no-audit --no-fund

Write-Host "Controllo ESLint..." -ForegroundColor Cyan
npm run lint

Write-Host "Build Vite..." -ForegroundColor Cyan
npm run build

Write-Host ""
Write-Host "BUILD COMPLETATA CON SUCCESSO" -ForegroundColor Green
