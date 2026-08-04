$ErrorActionPreference = "Stop"

$cssPath = Join-Path $PSScriptRoot "src\FmedUnifiedVisualSystem.css"
if (!(Test-Path $cssPath)) {
    throw "FILE NON TROVATO: $cssPath"
}

$css = [IO.File]::ReadAllText($cssPath)

$startMarker = ".p0-safety-actions, .p0-safety-filters"
$endMarker = ".p0-safety-error"

$start = $css.IndexOf($startMarker)
if ($start -lt 0) {
    throw "INIZIO BLOCCO SICUREZZA NON TROVATO"
}

$endStart = $css.IndexOf($endMarker, $start)
if ($endStart -lt 0) {
    throw "FINE BLOCCO SICUREZZA NON TROVATA"
}

$endBrace = $css.IndexOf("}", $endStart)
if ($endBrace -lt 0) {
    throw "CHIUSURA BLOCCO SICUREZZA NON TROVATA"
}
$end = $endBrace + 1

$newBlock = @'
/* SICUREZZA 81/08 · STANDARD COMPATTO DEFINITIVO */
.p0-operations--safety{gap:12px}
.p0-operations--safety .p0-operations__head{min-height:112px;padding:20px 24px;border-radius:20px}
.p0-operations--safety .p0-operations__identity{gap:16px}
.p0-operations--safety .p0-operations__icon{width:50px;height:50px;border-radius:15px}
.p0-operations--safety .p0-operations__icon svg{width:24px;height:24px}
.p0-operations--safety .p0-operations__identity span{font-size:9px;letter-spacing:.12em}
.p0-operations--safety .p0-operations__identity h1{margin:3px 0 2px;font-size:clamp(29px,2.3vw,38px)}
.p0-operations--safety .p0-operations__identity p{max-width:720px;font-size:12px}
.p0-operations--safety .p0-operations__metric{min-width:150px;padding:13px 16px;border-radius:15px}
.p0-operations--safety .p0-operations__metric strong{font-size:28px}
.p0-operations--safety .p0-operations__metric span{margin-top:3px;font-size:10px}
.p0-command--safety{border-radius:17px;box-shadow:0 5px 18px rgba(20,42,73,.05)}
.p0-command--safety .p0-command__primary{padding:16px 18px}
.p0-command--safety .p0-command__intro{gap:14px}
.p0-command--safety .p0-command__intro h2{font-size:clamp(19px,1.55vw,24px)}
.p0-safety-actions,.p0-safety-filters{display:flex;align-items:end;gap:8px}
.p0-safety-actions{flex:0 0 auto}
.p0-command--safety .p0-search{height:46px;margin-top:12px;padding:0 13px;border-radius:12px}
.p0-command--safety .p0-search__mark{font-size:21px}
.p0-command--safety .p0-search input{font-size:12px}
.p0-command--safety .p0-search__meta{padding:6px 9px;font-size:9px}
.p0-safety-filters{margin-top:10px}
.p0-safety-filters .p0-field{min-width:min(245px,30%)}
.p0-safety-filters .p0-field select,.p0-safety-filters .p0-field input{height:38px;border-radius:10px}
.p0-safety-notice{display:flex;align-items:center;gap:10px;min-height:48px;padding:9px 14px;border:1px solid #eadba7;border-left:3px solid var(--p0-accent);border-radius:12px;background:var(--p0-accent-soft)}
.p0-safety-notice>svg{width:18px;color:var(--p0-accent-dark)}
.p0-safety-notice>div{display:grid;gap:1px}
.p0-safety-notice strong{font-size:12px}
.p0-safety-notice span{color:#675c3b;font-size:10px}
.p0-safety-notice.is-error{border-color:#f1b5c5;border-left-color:#cf315d;background:#fff0f4}
.p0-safety-metrics{grid-template-columns:repeat(3,minmax(0,1fr));border-radius:15px}
.p0-safety-metrics article{gap:10px;min-height:67px;padding:12px 15px;border-bottom-width:2px}
.p0-safety-metrics .p0-metric-strip__icon{width:32px;height:32px;border-radius:10px}
.p0-safety-metrics strong{font-size:clamp(21px,1.55vw,26px)}
.p0-safety-metrics small,.p0-safety-metrics article div>span{font-size:8px}
.p0-safety-library,.p0-safety-documents{border:1px solid #d9e2ef;border-radius:17px;background:#fff;box-shadow:0 6px 20px rgba(20,42,73,.05);overflow:hidden}
.p0-safety-library>header,.p0-safety-documents>header{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:14px 17px;border-bottom:1px solid #e0e7f0}
.p0-safety-library h2,.p0-safety-documents h2{margin:2px 0;font-size:20px;letter-spacing:-.02em}
.p0-safety-library p,.p0-safety-documents p{margin:0;color:#65758b;font-size:10px}
.p0-safety-sites{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:12px;background:#f5f7fb}
.p0-safety-site{min-width:0;border:1px solid #d8e2ee;border-radius:13px;background:#fff;overflow:hidden}
.p0-safety-site>header{display:flex;align-items:center;justify-content:space-between;gap:9px;min-height:51px;padding:9px 12px;border-bottom:1px solid #e3eaf2}
.p0-safety-site>header div{min-width:0;display:grid}
.p0-safety-site>header strong{font-size:13px}
.p0-safety-site>header small{overflow:hidden;color:#718096;font-size:8px;text-overflow:ellipsis;white-space:nowrap}
.p0-safety-site a{color:var(--p0-accent-dark);font-size:9px;font-weight:800;text-decoration:none}
.p0-safety-categories{display:grid;grid-template-columns:1fr 1fr}
.p0-safety-categories>*{min-width:0;display:grid;grid-template-columns:23px minmax(0,1fr) auto;align-items:center;gap:6px;min-height:39px;padding:6px 8px;border-right:1px solid #e6ecf4;border-bottom:1px solid #e6ecf4;color:#263b55}
.p0-safety-categories>*:nth-child(even){border-right:0}
.p0-safety-categories>*>span{display:grid;place-items:center;width:21px;height:21px;border-radius:6px;background:var(--p0-accent-soft);color:var(--p0-accent-dark);font-size:7px;font-weight:850}
.p0-safety-categories b{overflow:hidden;font-size:8px;text-overflow:ellipsis;white-space:nowrap}
.p0-safety-categories small{font-size:7px}
.p0-safety-categories .is-missing{opacity:.55}
.p0-safety-doc-list{display:grid}
.p0-safety-doc{display:grid;grid-template-columns:minmax(300px,1.35fr) minmax(390px,1.5fr) auto;align-items:center;gap:12px;min-height:57px;padding:8px 14px;border-bottom:1px solid #e6ecf4}
.p0-safety-doc:last-child{border-bottom:0}
.p0-safety-doc:hover{background:#fbfcfe}
.p0-safety-doc__main{min-width:0;display:flex;align-items:center;gap:8px}
.p0-safety-doc__main>span{flex:0 0 auto;padding:4px 6px;border-radius:6px;background:var(--p0-accent-soft);color:var(--p0-accent-dark);font-size:7px;font-weight:850}
.p0-safety-doc__main>div{min-width:0;display:grid;gap:1px}
.p0-safety-doc__main strong,.p0-safety-doc__main small{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.p0-safety-doc__main strong{font-size:11px}
.p0-safety-doc__main small{color:#718096;font-size:8px}
.p0-safety-doc dl{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:0}
.p0-safety-doc dl div{min-width:0}
.p0-safety-doc dt{color:#718096;font-size:7px;font-weight:800;text-transform:uppercase}
.p0-safety-doc dd{overflow:hidden;margin:1px 0 0;font-size:8px;font-weight:700;text-overflow:ellipsis;white-space:nowrap}
.p0-safety-doc__actions{display:flex;gap:6px}
.p0-safety-doc__actions .p0-btn{min-height:32px;padding:0 10px;border-radius:9px;font-size:8px}
.p0-safety-error{display:grid;gap:12px;max-width:680px;margin:40px auto;padding:28px;border:1px solid #efb7c7;border-radius:18px;background:#fff}
'@

$updated = $css.Substring(0, $start) + $newBlock + $css.Substring($end)
[IO.File]::WriteAllText($cssPath, $updated, [Text.UTF8Encoding]::new($false))

$verify = [IO.File]::ReadAllText($cssPath)
$count = ([regex]::Matches($verify, "SICUREZZA 81/08 · STANDARD COMPATTO DEFINITIVO")).Count
if ($count -ne 1) {
    throw "NUOVO BLOCCO ASSENTE O DUPLICATO: $count"
}

Write-Host "SICUREZZA 81/08: VECCHIO STILE SOSTITUITO" -ForegroundColor Green
Write-Host "LOGICA, API, SHAREPOINT E DATI INVARIATI" -ForegroundColor Cyan
