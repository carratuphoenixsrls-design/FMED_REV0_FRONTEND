import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const oks = [];

const exists = (file) => fs.existsSync(path.join(root, file));
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const pass = (message) => {
  oks.push(message);
  console.log(`OK REGOLA 0 · ${message}`);
};
const fail = (message) => {
  failures.push(message);
  console.error(`ERRORE REGOLA 0 · ${message}`);
};
const requireFile = (file, label = file) => {
  if (exists(file)) {
    pass(`${label} presente`);
    return read(file);
  }
  fail(`${label} mancante: ${file}`);
  return "";
};
const requireTokens = (label, source, tokens) => {
  const missing = tokens.filter((token) => !source.includes(token));
  if (missing.length === 0) pass(label);
  else fail(`${label}: mancano ${missing.join(", ")}`);
};
const forbidRegex = (label, source, regex) => {
  if (!regex.test(source)) pass(label);
  else fail(label);
};

const app = requireFile("src/FmedApp.jsx", "shell applicativa");
const main = requireFile("src/main.jsx", "bootstrap applicativo");
const baseCss = requireFile("src/FmedBaseStyles.css", "stili base");
const visualCss = requireFile("src/FmedVisualClean.css", "sistema visuale stabile");
const regola0Css = requireFile("src/Regola0VisualSystem.css", "sistema visuale Regola 0");
const errorBoundary = requireFile("src/FmedErrorBoundary.jsx", "error boundary");

const pageContracts = [
  {
    file: "src/pages/DashboardPage.jsx",
    label: "Dashboard",
    tokens: ["export default", "setPagina"],
  },
  {
    file: "src/pages/AssetPage.jsx",
    label: "Asset e Cespiti",
    tokens: ["export default", "AssetControls", "apriSchedaCespite"],
  },
  {
    file: "src/pages/InterventiPage.jsx",
    label: "Interventi",
    tokens: ["export default", "InterventiControls", "apriSchedaDaCodice", "apriModificaIntervento"],
  },
  {
    file: "src/pages/ScadenzePage.jsx",
    label: "Scadenze",
    tokens: ["export default", "ScadenzeControls", "apriSchedaDaCodice"],
  },
  {
    file: "src/pages/InfrastrutturePage.jsx",
    label: "Infrastrutture",
    tokens: ["export default", "InfrastruttureControls"],
  },
  {
    file: "src/Sicurezza8108Page.jsx",
    label: "Sicurezza 81/08",
    tokens: ["export default"],
  },
  {
    file: "src/ProcessiPage.jsx",
    label: "Processi",
    tokens: ["export default"],
  },
  {
    file: "src/ImpostazioniPage.jsx",
    label: "Cataloghi e Strumenti",
    tokens: ["export default"],
  },
  {
    file: "src/pages/CostiPage.jsx",
    label: "Costi",
    tokens: ["export default"],
  },
  {
    file: "src/pages/ExportPage.jsx",
    label: "Report ed Export",
    tokens: ["export default"],
  },
  {
    file: "src/pages/SharePointPage.jsx",
    label: "SharePoint",
    tokens: ["export default"],
  },
  {
    file: "src/NewAssetWizard.jsx",
    label: "Wizard Nuovo Asset",
    tokens: ["export default"],
  },
];

for (const contract of pageContracts) {
  const source = requireFile(contract.file, contract.label);
  if (source) requireTokens(`${contract.label}: contratto minimo preservato`, source, contract.tokens);
}

requireTokens("bootstrap protetto da error boundary", main, [
  "FmedErrorBoundary",
  "<FmedErrorBoundary>",
  "import(\"./FmedApp.jsx\")",
]);
requireTokens("error boundary con recupero visibile", errorBoundary, [
  "getDerivedStateFromError",
  "componentDidCatch",
  "Ricarica FMED",
]);
requireTokens("sistema grafico Regola 0 caricato per ultimo", main, [
  "import \"./FmedVisualClean.css\";",
  "import \"./Regola0VisualSystem.css\";",
  "fmed-rev0-regola0-",
]);

requireTokens("menu principale completo", app, [
  "Asset",
  "Interventi",
  "Scadenze",
  "Infrastrutture",
  "Sicurezza 81/08",
  "Processi",
  "Dizionari",
  "Gestione Utenti",
]);

requireTokens("flussi Asset completi", app, [
  "function apriSchedaCespite",
  "function apriSchedaDaCodice",
  "function salvaModificheCespite",
  "function eliminaCespiteSelezionato",
  "function apriNuovoIntervento",
  "setCespiteSelezionato",
  "setFormCespite",
]);

requireTokens("flussi Interventi completi", app, [
  "function apriNuovoIntervento",
  "function apriModificaIntervento",
  "function eliminaIntervento",
  "interventiFiltratiRenderizzati",
  "esportaInterventiFiltratiPdf",
]);

requireTokens("flussi Scadenze completi", app, [
  "function cessaScadenzeSelezionate",
  "function chiudiScadenzaSingolaComeSostituita",
  "toggleScadenzaExport",
  "esportaScadenzePdf",
]);

requireTokens("flussi Infrastrutture completi", app, [
  "apriNuovaInfrastruttura",
  "caricaInfrastruttureOnDemand",
  "infrastruttureFiltrate",
]);

requireTokens("API operative preservate", app, [
  "/censimento",
  "/interventi",
  "/interventi-cespite/",
  "/analisi/",
  "/cespite",
  "/infrastrutture",
  "/alert/scadenze-uniche",
  "/core/processi",
  "/core/dizionari",
  "/data-quality/audit",
]);

requireTokens("render lazy delle pagine preservato", app, [
  "lazy(() => import(\"./pages/AssetPage.jsx\"))",
  "lazy(() => import(\"./pages/InterventiPage.jsx\"))",
  "lazy(() => import(\"./pages/ScadenzePage.jsx\"))",
  "lazy(() => import(\"./pages/InfrastrutturePage.jsx\"))",
  "<Suspense",
]);

requireTokens("caricamento on demand preservato", app, [
  "caricaCespitiOnDemand",
  "caricaInterventiOnDemand",
  "caricaInfrastruttureOnDemand",
]);

requireTokens("grafica integrale su tutti i moduli principali", regola0Css, [
  ".fmed-dashboard-page",
  ".fmed-asset-page",
  ".fmed-interventi-operativi",
  ".fmed-scadenze-operative",
  ".fmed-infrastructure-root",
  ".s8108-page",
  ".fmed-process-page",
  ".core-standard-page",
  ".fmed-settings-page",
  ".fmed-costi-page",
  ".fmed-export-page",
  ".fmed-sharepoint-page",
  ".fmed-audit-page",
  ".fmed-wizard-page",
]);

requireTokens("grafica primaria secondaria e terziaria coperta", regola0Css, [
  ".fmed-module-hero",
  ".fmed-operational-filters",
  ".fmed-operational-kpi-card",
  "[class*=\"table-wrap\"]",
  "[role=\"dialog\"]",
  ".fmed-workspace-page",
  ".fmed-wizard-page",
  ":focus-visible",
]);

const allCss = `${baseCss}\n${visualCss}\n${regola0Css}`;
forbidRegex(
  "nessun oscuramento globale del contenuto principale",
  allCss,
  /\.fmed-main-content(?:\s|[^,{])*\{[^}]*\b(?:display\s*:\s*none|visibility\s*:\s*hidden|opacity\s*:\s*0)\b/is,
);
forbidRegex(
  "nessun blocco globale dei clic nel contenuto principale",
  allCss,
  /\.fmed-main-content(?:\s|[^,{])*\{[^}]*pointer-events\s*:\s*none/is,
);
forbidRegex(
  "nessuna compressione globale tramite zoom o scale",
  allCss,
  /\bzoom\s*:|transform\s*:\s*scale\(/i,
);
forbidRegex(
  "nessun override globale !important",
  allCss,
  /!important/i,
);
forbidRegex(
  "nessuna larghezza rigida per modali e pannelli terziari",
  regola0Css,
  /(?:\[role=\"dialog\"\]|modal-content|dialog-content)[\s\S]{0,900}\bwidth\s*:\s*\d{4,}px/i,
);

requireTokens("sistema responsive notebook-desktop-monitor", `${visualCss}\n${regola0Css}`, [
  "@media (max-width: 1440px)",
  "@media (max-width: 1180px)",
  "@media (min-width: 1800px)",
]);
requireTokens("accessibilità movimento ridotto", regola0Css, [
  "@media (prefers-reduced-motion: reduce)",
]);

const requiredCssFiles = [
  "src/FmedBaseStyles.css",
  "src/FmedVisualClean.css",
  "src/Regola0VisualSystem.css",
  "src/NewAssetWizard.css",
  "src/ProcessiPage.css",
  "src/Sicurezza8108Page.css",
  "src/components/ProcessEnginePage.css",
  "src/components/masterdata/CanonicalSelect.css",
];
for (const file of requiredCssFiles) requireFile(file, `foglio stile ${file}`);

if (failures.length > 0) {
  console.error(`\nREGOLA 0 NON SUPERATA · ${failures.length} controllo/i fallito/i su ${oks.length + failures.length}.`);
  process.exit(1);
}

console.log(`\nREGOLA 0 SUPERATA · ${oks.length} controlli automatici completati. Il rilascio resta comunque subordinato ai tre collaudi completi previsti in docs/REGOLA_0.md.`);
