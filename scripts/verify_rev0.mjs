import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const fail = (message) => {
  console.error(`ERRORE REV0 · ${message}`);
  process.exitCode = 1;
};
const ok = (message) => console.log(`OK REV0 · ${message}`);

const packageJson = JSON.parse(read("package.json"));
const build = JSON.parse(read("public/fmed-build.json"));
const index = read("index.html");
const main = read("src/main.jsx");
const app = read("src/FmedApp.jsx");
const settings = read("src/ImpostazioniPage.jsx");
const exportPage = read("src/pages/ExportPage.jsx");
const baseStyles = read("src/FmedBaseStyles.css");
const visual = read("src/FmedUnifiedVisualSystem.css");
const cssFiles = fs.readdirSync(path.join(root, "src"), { recursive: true })
  .filter((file) => file.endsWith(".css"));
const allCss = cssFiles.map((file) => read(path.join("src", file))).join("\n");
const sourceFiles = fs.readdirSync(path.join(root, "src"), { recursive: true })
  .filter((file) => /\.(jsx?|css)$/.test(file));
const allSource = sourceFiles.map((file) => read(path.join("src", file))).join("\n");

packageJson.version === "0.0.0" ? ok("versione frontend REV0") : fail("versione package non REV0");
build.release === "REV0" && build.build === "FMED_REV0" ? ok("manifest REV0") : fail("manifest pubblico non REV0");
index.includes("<title>FMED REV0</title>") ? ok("titolo REV0") : fail("titolo pubblico non REV0");
main.includes("fmed-rev0-") ? ok("cache REV0") : fail("cache non REV0");
index.includes('content="FMED_REV0"') && build.label === "FMED REV0"
  ? ok("metadati unificati REV0")
  : fail("metadati REV0 incompleti");
!/\b(zoom\s*:|transform\s*:\s*scale\()/i.test(visual)
  ? ok("nessuna compressione globale")
  : fail("compressione globale vietata");
!allCss.includes("!important")
  ? ok("nessun override !important")
  : fail("override !important vietato");
!/\b(window\.)?prompt\s*\(/.test(app)
  ? ok("nessun prompt operativo")
  : fail("prompt operativo presente");
!/(Scopo e Missione|missione-guidata|mission-orbit)/i.test(app)
  ? ok("Scopo e Missione assente")
  : fail("residui Scopo e Missione");
app.includes("VITE_API_BASE_URL") || main.includes("VITE_API_BASE_URL")
  ? ok("API configurabile preservata")
  : fail("configurazione API mancante");
!/(Analisi e amministrazione|application\/vnd\.ms-excel|\.xls\b|scaricaExcelFmed)/i.test(allSource)
  ? ok("unico modulo Report e export CSV reale")
  : fail("residui report duplicato o falso Excel");
!settings.includes('activeTab === "MASTER_DATA" && <CoreStandardPage')
  ? ok("Cataloghi non duplicati in Dati avanzati")
  : fail("Cataloghi duplicati in Dati avanzati");
!visual.includes(".fmed-main-content *")
  ? ok("nessuna forzatura colore universale")
  : fail("forzatura colore universale presente");
!/\.fmed-main-content button:disabled\s*\{[^}]*opacity/i.test(visual)
  ? ok("nessuna opacità disabled universale")
  : fail("opacità disabled universale presente");
exportPage.includes("fmed-report-advanced")
  && !exportPage.includes("slice(0, 300)")
  && !exportPage.includes("fmed-literal-2a57fba0b1")
  ? ok("Report compatto con filtri avanzati richiudibili")
  : fail("struttura Report estesa o legacy presente");
/\.fmed-export-page\s*\{[^}]*flex:\s*0 0 auto[^}]*grid-template-rows:\s*max-content max-content max-content[^}]*overflow:\s*visible/is.test(baseStyles)
  ? ok("Report non comprimibile e audit integro")
  : fail("contenitore Report ancora comprimibile");
exportPage.includes("fmedAuditQualitaDati.righe.map")
  && !exportPage.includes("fmedAuditQualitaDati.assetSenzaBranca")
  && app.includes('titolo: "Audit qualità dati"')
  && !app.includes('titolo: "FMED · Audit qualità dati"')
  ? ok("Audit unico e coerente tra schermata e CSV")
  : fail("Audit schermata e CSV non condividono la stessa sorgente");
allSource.includes("/data-quality/audit")
  && allSource.includes("function DataQualityPanel")
  ? ok("Qualità dati unica")
  : fail("Qualità dati non unificata");
(allSource.match(/function DataQualityPanel/g) || []).length === 1
  ? ok("un solo pannello Qualità dati")
  : fail("pannello Qualità dati duplicato");
allSource.includes("cataloghi_vuoti_richiesti")
  && allSource.includes("Non utilizzato nei dati analizzati")
  ? ok("cataloghi vuoti classificati per uso reale")
  : fail("cataloghi vuoti non classificati");
allSource.includes("/core/regole-operative")
  && allSource.includes("function OperationalRulesPanel")
  && allSource.includes("Solo vincoli espliciti e verificati")
  ? ok("motore unico Regole operative")
  : fail("Regole operative non sostitutive o incomplete");
!/(\/core\/relazioni|acquisisci-storico|Relazioni intelligenti|Anteprima relazioni storiche|Passato → futuro|relationContextFor|core-relations-panel|core-relations-table|core-relation-row|core-add-relation|core-historical-relations|core-relation-preview)/i.test(allSource)
  ? ok("vecchio sistema Relazioni completamente assente")
  : fail("residui del vecchio sistema Relazioni");
allSource.includes("Nessun vincolo configurato: sono mostrate tutte le opzioni attive.")
  && !allSource.includes("relazioni_storiche_controllate")
  ? ok("wizard sicuro senza deduzioni storiche")
  : fail("wizard ancora dipendente dal vecchio storico");

const patch15Visual = [
  visual,
  baseStyles,
  read("src/NewAssetWizard.css"),
  read("src/CoreStandardPage.css"),
].join("\n");
(/--fmed-primary:\s*#315f8c/i.test(patch15Visual)
  && /--fmed-sidebar-w:\s*220px/i.test(patch15Visual))
  ? ok("sistema grafico professionale Patch 15")
  : fail("sistema grafico Patch 15 non applicato");
!/(#0b6f78|#075963|#0d766e|#0d8278|#087f86|#078b91|#1fae9c|#147c72|#169c8f)/i.test(patch15Visual)
  ? ok("vecchia palette verde-teal eliminata")
  : fail("vecchia palette verde-teal ancora presente");
(/fmed-style-asset-hero-badge-number[\s\S]{0,300}-webkit-text-fill-color:\s*currentColor/i.test(patch15Visual)
  && /fmed-style-asset-hero-badge-text[\s\S]{0,500}-webkit-text-fill-color:\s*currentColor/i.test(patch15Visual))
  ? ok("contrasto e leggibilità KPI ripristinati")
  : fail("contrasto KPI testata Asset non corretto");

const appShell = read("src/FmedApp.jsx");
(/data-module=\{item\}/.test(appShell)
  && /data-module="Marilab Mover"/.test(appShell)
  && /--module-accent:\s*#2563eb/i.test(visual)
  && /--module-accent:\s*#d97706/i.test(visual)
  && /--module-accent:\s*#dc4c64/i.test(visual)
  && /--module-accent:\s*#7c3aed/i.test(visual))
  ? ok("identità cromatica univoca dei moduli")
  : fail("identità cromatica Patch 16 incompleta");
(/@media\s*\(max-width:\s*1440px\)/i.test(visual)
  && /@media\s*\(min-width:\s*1800px\)/i.test(visual)
  && /notebook 15"/i.test(visual))
  ? ok("layout adattivo da notebook 15 a monitor 27")
  : fail("densità adattiva 15-27 pollici assente");
!/#12b76a|#eaf8f0/i.test(read("src/NewAssetWizard.css"))
  ? ok("verde decorativo eliminato dal wizard")
  : fail("verde decorativo residuo nel wizard");
(/grid-template-columns:\s*30px minmax\(0,1fr\)/i.test(visual)
  && /fmed-module-hero-copy[\s\S]{0,180}margin:\s*0/i.test(visual))
  ? ok("testate modulo riallineate")
  : fail("allineamento testate modulo incompleto");
(/fmed-side-menu-btn \.fmed-side-menu-icon[\s\S]{0,260}background:\s*color-mix/i.test(visual)
  && /fmed-side-menu-btn\.is-active \.fmed-side-menu-icon[\s\S]{0,300}transform:\s*translateX\(1px\)/i.test(visual))
  ? ok("icone moduli sempre riconoscibili")
  : fail("identità cromatica icone laterali incompleta");

if (process.exitCode) process.exit(process.exitCode);
console.log("FMED REV0 frontend: gate completato");
