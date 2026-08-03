param(
  [Parameter(Mandatory=$true)]
  [string[]]$Files,

  [string]$Label = "MODIFICA",

  [switch]$FullSnapshot
)

$ErrorActionPreference = "Stop"
$root = (Resolve-Path ".").Path
$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupRoot = Join-Path $root "_BACKUP_FMED"

if(!(Test-Path $backupRoot)){
  New-Item -ItemType Directory -Path $backupRoot | Out-Null
}

$sessionFolder = Join-Path $backupRoot "${stamp}_${Label}"
New-Item -ItemType Directory -Path $sessionFolder | Out-Null

foreach($file in $Files){
  $resolved = Resolve-Path $file -ErrorAction Stop
  $relative = $resolved.Path.Substring($root.Length).TrimStart("\")
  $destination = Join-Path $sessionFolder $relative
  $destinationFolder = Split-Path $destination -Parent

  if(!(Test-Path $destinationFolder)){
    New-Item -ItemType Directory -Path $destinationFolder -Force | Out-Null
  }

  Copy-Item $resolved.Path $destination -Force

  if(!(Test-Path $destination)){
    throw "BACKUP NON RIUSCITO: $file"
  }

  Write-Host "BACKUP FILE OK: $relative" -ForegroundColor Green
}

if($FullSnapshot){
  $zip = Join-Path $backupRoot "FMED_FRONTEND_${stamp}_${Label}.zip"

  $exclude = @(
    "_BACKUP_FMED",
    "node_modules",
    ".git",
    "dist"
  )

  $temp = Join-Path $env:TEMP "FMED_SNAPSHOT_$stamp"
  if(Test-Path $temp){
    Remove-Item $temp -Recurse -Force
  }

  New-Item -ItemType Directory -Path $temp | Out-Null

  Get-ChildItem $root -Force |
    Where-Object { $exclude -notcontains $_.Name } |
    ForEach-Object {
      Copy-Item $_.FullName $temp -Recurse -Force
    }

  Compress-Archive -Path (Join-Path $temp '*') -DestinationPath $zip -CompressionLevel Optimal
  Remove-Item $temp -Recurse -Force

  if(!(Test-Path $zip)){
    throw "SNAPSHOT ZIP NON RIUSCITO"
  }

  Write-Host "SNAPSHOT COMPLETO OK: $zip" -ForegroundColor Cyan
}

Write-Host "BACKUP VERIFICATO. MODIFICA AUTORIZZATA." -ForegroundColor Yellow