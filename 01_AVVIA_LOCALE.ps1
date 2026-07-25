$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "FMED ENTERPRISE 1.0 - E8.2.3 LIGHT ONLY" -ForegroundColor Cyan
Write-Host "Verifica configurazione frontend..." -ForegroundColor Cyan
node .\scripts\verify_release_e823_light_only.mjs

if (-not (Test-Path ".\.env.local")) {
    Write-Host "Configurazione backend Render per il test locale..." -ForegroundColor Cyan
    'VITE_API_BASE_URL=https://fmed-backend.onrender.com' | Set-Content -Encoding ascii .env.local
}

if (-not (Test-Path ".\node_modules\.bin\vite.cmd")) {
    Write-Host "Installazione dipendenze npm..." -ForegroundColor Cyan
    npm ci --no-audit --no-fund
} else {
    Write-Host "Dipendenze gia presenti." -ForegroundColor Gray
}

Write-Host "Avvio FMED su Vite..." -ForegroundColor Green
Write-Host "Apri l'indirizzo mostrato da Vite, normalmente http://localhost:5173" -ForegroundColor Yellow
npm run dev
