import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const read = (file) => fs.readFileSync(file, "utf8");
const pkg = JSON.parse(read("package.json"));
const build = JSON.parse(read("public/fmed-build.json"));
const main = read("src/main.jsx");
const app = read("src/App_nuovo.jsx");
const visual = read("src/FmedVisualClean.css");
const processPage = read("src/ProcessiPage.jsx");
const wizard = read("src/NewAssetWizard.jsx");
const assetPage = read("src/pages/AssetPage.jsx");
const interventionsPage = read("src/pages/InterventiPage.jsx");
const infrastructuresPage = read("src/pages/InfrastrutturePage.jsx");
const infrastructureActions = read("src/components/infrastrutture/InfrastruttureRowActions.jsx");
const missionPage = read("src/MissionPage.jsx");
const icon = read("src/components/ui/FmedIcon.jsx");
const html = read("index.html");

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

const runtimeSources = walk("src").filter((file) => /\.(?:js|jsx)$/.test(file));
const cssSources = walk("src").filter((file) => file.endsWith(".css")).sort();
const allowedCssSources = [
  "src/AuditFinalePage.css",
  "src/CoreStandardPage.css",
  "src/FmedErrorBoundary.css",
  "src/FmedVisualClean.css",
  "src/ImpostazioniPage.css",
  "src/MissionPage.css",
  "src/NewAssetWizard.css",
  "src/ProcessiPage.css",
  "src/Sicurezza8108Page.css",
  "src/components/ProcessEngineDialog.css",
  "src/components/masterdata/CanonicalSelect.css",
].sort();
const expectedCssImportOrder = [
  "FmedErrorBoundary.css",
  "MissionPage.css",
  "ProcessiPage.css",
  "ImpostazioniPage.css",
  "CoreStandardPage.css",
  "AuditFinalePage.css",
  "NewAssetWizard.css",
  "Sicurezza8108Page.css",
  "components/ProcessEngineDialog.css",
  "components/masterdata/CanonicalSelect.css",
  "FmedVisualClean.css",
];
const lockedFoundationCss = {
  "src/AuditFinalePage.css": "57b2ae32cfd8371c79c2c76981a0e70100bf539974f6d6aa791411b7a858dfee",
  "src/CoreStandardPage.css": "053b5df2bb0a35a57e5ed3b7a455ae3a50dab3f11357c8e9f91872f6d2c1930e",
  "src/FmedErrorBoundary.css": "d21348db0d64bc4975de59613295e6507d29e99b8eae71e7a41695fa5f4becab",
  "src/ImpostazioniPage.css": "d3e7576560c0242b593ca10bc83905cd08b70afd5fb1ffb187a18bd431bb7df2",
  "src/MissionPage.css": "060a6d4c375618196c6d3de7f2aa4448641d8b5b340fe5ca91bc56deaf0b239c",
  "src/NewAssetWizard.css": "629287d101a73ad7064d5292d559e31261c095cc2517dfc8f17cb3209fdf6d96",
  "src/ProcessiPage.css": "81b8133445f03167b0fb185157e79b3d861df8a407f8b73a2e5accdfb8b90243",
  "src/Sicurezza8108Page.css": "0e6c7650a27526ebb1a96361a2de129b4d81eae2561f8ab8c00b79e8616128cd",
  "src/components/ProcessEngineDialog.css": "bc5283424a5d66cd34da751bf11403f390c57f5e9870ca3f1b926baa56a4535c",
  "src/components/masterdata/CanonicalSelect.css": "877e0deca1375d05ed13c467d2326e7e99c67981599d4a0ba63efe1b8da8da09",
};
const foundationCssIsLocked = Object.entries(lockedFoundationCss).every(([file, expected]) => {
  const actual = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  return actual === expected;
});
const cssImportsOutsideMain = runtimeSources
  .filter((file) => file !== "src/main.jsx")
  .flatMap((file) => [...read(file).matchAll(/import\s+["'][^"']+\.css["'];?/g)].map((match) => `${file}:${match[0]}`));
const mainCssImports = [...main.matchAll(/import\s+["']\.\/([^"']+\.css)["'];/g)].map((match) => match[1]);
const cssFilesInBundle = fs.existsSync("dist/assets")
  ? walk("dist/assets").filter((file) => file.endsWith(".css"))
  : [];

const legacyGlobalCss = [
  "FmedEnterpriseDesignSystem.css",
  "FmedVisualConsolidated.css",
  "FmedLayoutIntegrity.css",
  "FmedLegacyThemeBridge.css",
  "FmedE227Polish.css",
  "FmedE228EnterpriseFix.css",
  "FmedE2282TypographyLayout.css",
  "FmedE229OperationalModules.css",
  "FmedE31UxReview.css",
  "FmedE32SemanticColorSystem.css",
  "FmedE42LightComfortLayout.css",
  "FmedE71DashboardEnterprise.css",
  "FmedE81OperationalSimplified.css",
  "FmedE812ProfessionalAudit.css",
  "FmedE813SystemLayoutAudit.css",
  "FmedE817UnifiedOperationalUX.css",
  "FmedE818FrontendUxUiRefinement.css",
  "FmedE819MissionCatalogs.css",
  "FmedE8191ContrastPerfection.css",
  "FmedE8192SidebarRedesign.css",
  "FmedE820PremiumVisualSystem.css",
];

const checks = [
  ["versione package E8.3.1", pkg.version === "8.3.1"],
  ["build pubblico E8.3.1", build.version === "E8.3.1"],
  ["titolo E8.3.1", html.includes("E8.3.1 Master Data Repair")],
  ["nessun CSS caricato dalle pagine lazy", cssImportsOutsideMain.length === 0],
  ["nessun nuovo foglio CSS separato", JSON.stringify(cssSources) === JSON.stringify(allowedCssSources)],
  ["nessuno stile inline HTML aggiunto", !html.includes("<style")],
  ["ordine CSS centrale bloccato", JSON.stringify(mainCssImports) === JSON.stringify(expectedCssImportOrder)],
  ["CSS strutturali bloccati in sola lettura", foundationCssIsLocked],
  ["Visual Clean è l'ultimo stile della cascata", mainCssImports.at(-1) === "FmedVisualClean.css"],
  ["vecchi livelli globali rimossi", legacyGlobalCss.every((name) => !fs.existsSync(`src/${name}`))],
  ["una sola sidebar JSX", (app.match(/<aside className=\{`fmed-side-rail/g) || []).length === 1],
  ["Mover rimosso dal footer", !app.includes("fmed-mover-sidebar-link")],
  ["Mover presente come voce menu", app.includes("fmed-mover-menu-item") && app.includes("Marilab Mover")],
  ["Processi a fisarmonica", processPage.includes('<details className="fmed-process-group"') && processPage.includes('<summary className="fmed-process-group-head"')],
  ["Scopo e Missione prima pagina dopo login", app.includes('useState("Scopo e Missione")') && app.includes('setPagina("Scopo e Missione")')],
  ["generatore inventario collegato al wizard", app.includes("generateInventoryCode={generaCodiceCespiteDaBackend}") && wizard.includes("requestAutomaticInventoryCode")],
  ["inventario generato al cambio sede e alla conferma", wizard.includes("Genera automaticamente") && wizard.includes("submissionForm.codicestrumento")],
  ["codice manuale protetto", wizard.includes('inventoryCodeModeRef.current === "manual"') && wizard.includes('setInventoryCodeMode(value ? "manual" : "auto")')],
  ["famiglia icone SVG unica", icon.includes("const PATHS") && ["AssetPage", "InterventiPage", "InfrastrutturePage", "ScadenzePage", "MissionPage"].every((name) => read(`src/${name === "MissionPage" ? "" : "pages/"}${name}.jsx`).includes("FmedIcon"))],
  ["azioni tabellari non vuote", !assetPage.includes('onClick={() => salvaModificaRapidaAsset(c)}></button>') && !interventionsPage.match(/<button[^>]+onClick=\{\(\) => (?:apriModificaIntervento|eliminaIntervento)[^>]*><\/button>/)],
  ["azioni infrastrutture compatte", infrastructureActions.includes("fmed-row-action-bar") && infrastructureActions.includes("fmed-icon-action") && infrastructuresPage.includes("InfrastruttureRowActions")],
  ["logo Mover rimosso dalla Missione", !missionPage.includes("marilab-mover-icon.png") && missionPage.includes('name="truck"')],
  ["scheda asset a pieno viewport", app.includes("fmed-asset-detail-modal") && visual.includes("width: calc(100vw - 32px) !important")],
  ["tabelle Asset e Interventi con classi stabili", assetPage.includes("fmed-asset-table") && interventionsPage.includes("fmed-interventi-table")],
  ["contrasto finale esplicito", visual.includes("E8.2.3 · Chiusura visuale definitiva") && visual.includes("--fmed-focus-ring")],
  ["alias visuali legacy risolti", ["--fmed-d3-card:", "--fmed-d3-title:", "--fmed-d3-muted:", "--fmed-d3-border:"].every((token) => visual.includes(token))],
  ["testo webkit normalizzato", visual.includes("-webkit-text-fill-color: currentColor !important")],
  ["griglia Dashboard esplicita", visual.includes("grid-template-columns: repeat(3,minmax(220px,1fr))")],
  ["griglia KPI esplicita", visual.includes("grid-template-columns: repeat(3,minmax(230px,1fr))")],
  ["tabelle operative con larghezza minima", visual.includes("min-width: 1420px") && visual.includes("min-width: 1520px")],
  ["sidebar contenuta", visual.includes("grid-template-columns: 31px minmax(0,1fr) 29px") && visual.includes("overflow: hidden !important")],
  ["tema chiaro fissato", app.includes('document.body.dataset.theme = "light"')],
  ["autenticazione backend preservata", app.includes('chiamataApiAutenticataFmed("/login"')],
  ["sessione FMED preservata", app.includes('FMED_LOGIN_SESSION_KEY = "fmed_login_session"')],
  ["ruoli preservati", ["Admin:", "Service:", "User:"].every((token) => app.includes(token))],
  ["timeout inattività invariato", app.includes("FMED_INACTIVITY_LIMIT_MS = 30 * 60 * 1000")],
  ["API Render preservata", app.includes("https://fmed-backend.onrender.com") && main.includes("https://fmed-backend.onrender.com")],
  ["Google Fonts assente", !html.includes("fonts.googleapis.com") && !html.includes("fonts.gstatic.com")],
  ["layout desktop minimo preservato", visual.includes("min-width: 1180px")],
  ["movimenti ridotti rispettati", visual.includes("prefers-reduced-motion")],
  ["bundle CSS unico", cssFilesInBundle.length === 0 || cssFilesInBundle.length === 1],
];

let ok = true;
for (const [label, pass] of checks) {
  console.log(`${pass ? "OK" : "ERRORE"} · ${label}`);
  if (!pass) ok = false;
}

if (cssImportsOutsideMain.length) {
  console.error(cssImportsOutsideMain.join("\n"));
}
if (cssFilesInBundle.length > 1) {
  console.error(cssFilesInBundle.join("\n"));
}
if (!ok) process.exit(1);
console.log("FMED E8.3.1 Master Data Repair: baseline visuale E8.2.3 verificata");
