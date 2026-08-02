import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const dist = path.join(root, "dist");
const assetsDir = path.join(dist, "assets");
const errors = [];
const checks = [];

const pass = (message) => {
  checks.push(message);
  console.log(`OK DIST PUNTO 0 · ${message}`);
};
const fail = (message) => {
  errors.push(message);
  console.error(`ERRORE DIST PUNTO 0 · ${message}`);
};

if (!fs.existsSync(dist)) fail("cartella dist mancante");
if (!fs.existsSync(assetsDir)) fail("cartella dist/assets mancante");

const htmlPath = path.join(dist, "index.html");
const html = fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, "utf8") : "";
if (html) pass("index.html presente");
else fail("index.html mancante o vuoto");

for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const ref = match[1];
  if (/^(?:https?:)?\/\//i.test(ref)) continue;
  const target = path.join(dist, ref.replace(/^\//, ""));
  if (!fs.existsSync(target)) fail(`risorsa referenziata mancante: ${ref}`);
}
if (!errors.some((item) => item.includes("risorsa referenziata"))) pass("tutte le risorse HTML esistono");

const assetFiles = fs.existsSync(assetsDir)
  ? fs.readdirSync(assetsDir).map((name) => path.join(assetsDir, name))
  : [];
const jsFiles = assetFiles.filter((file) => file.endsWith(".js"));
const cssFiles = assetFiles.filter((file) => file.endsWith(".css"));
const css = cssFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");

const expectedChunks = [
  "FmedApp", "DashboardPage", "AssetPage", "InterventiPage", "ScadenzePage",
  "InfrastrutturePage", "Sicurezza8108Page", "ProcessiPage", "ImpostazioniPage",
  "NewAssetWizard", "CostiPage", "ExportPage", "SharePointPage",
];
for (const prefix of expectedChunks) {
  const matches = jsFiles.filter((file) => path.basename(file).startsWith(`${prefix}-`));
  if (matches.length === 1 && fs.statSync(matches[0]).size > 100) pass(`chunk ${prefix} presente`);
  else fail(`chunk ${prefix} non valido: ${matches.length} file`);
}

const cssContracts = [
  ".p0-asset-page", ".p0-asset-hero", ".p0-asset-searchbar", ".p0-asset-results", ".p0-asset-row",
  ".p0-operations", ".p0-command", ".p0-register", ".p0-table-wrap", ".p0-editor",
  ".p0-governance", ".fmed-asset-detail-workspace", ".fmed-style-asset-actions-panel",
  ".fmed-intervention-workspace", ".fmed-wizard-page", ".fmed-dashboard-page",
  ".fmed-costi-page", ".fmed-export-page", ".fmed-sharepoint-page",
];
for (const token of cssContracts) {
  if (css.includes(token)) pass(`contratto CSS ${token}`);
  else fail(`contratto CSS mancante: ${token}`);
}

for (const width of [1440, 1180, 1800]) {
  const responsive = new RegExp(`@media\\s*\\([^)]*(?:max|min)-width\\s*:\\s*${width}px`, "i");
  if (responsive.test(css)) pass(`breakpoint ${width}px presente`);
  else fail(`breakpoint ${width}px mancante`);
}

const forbiddenCss = [
  [/!important/i, "override !important"],
  [/\bzoom\s*:/i, "zoom globale"],
  [/transform\s*:\s*scale\(/i, "scale grafico"],
];
for (const [pattern, label] of forbiddenCss) {
  if (!pattern.test(css)) pass(`${label} assente`);
  else fail(`${label} presente`);
}

if ((css.match(/\{/g) || []).length === (css.match(/\}/g) || []).length) pass("struttura CSS bilanciata");
else fail("struttura CSS non bilanciata");

const jsContracts = {
  AssetPage: ["p0-asset-page", "p0-asset-hero", "p0-asset-results"],
  InterventiPage: ["p0-operations--maintenance", "p0-register", "p0-history-switch"],
  ScadenzePage: ["p0-operations--deadline", "p0-register", "p0-state"],
  InfrastrutturePage: ["p0-operations--infrastructure", "p0-editor", "p0-table-wrap"],
  Sicurezza8108Page: ["p0-operations--safety", "p0-safety-library", "sicurezza-81-08"],
  ProcessiPage: ["fmed-process-page", "process-engine"],
  ImpostazioniPage: ["p0-governance", "p0-tool-grid"],
  NewAssetWizard: ["wizard"],
};
for (const [prefix, tokens] of Object.entries(jsContracts)) {
  const file = jsFiles.find((item) => path.basename(item).startsWith(`${prefix}-`));
  if (!file) continue;
  const source = fs.readFileSync(file, "utf8");
  for (const token of tokens) {
    if (source.includes(token)) pass(`${prefix}: ${token}`);
    else fail(`${prefix}: contratto mancante ${token}`);
  }
}

for (const file of jsFiles) {
  if (fs.statSync(file).size <= 100) fail(`chunk vuoto o incompleto: ${path.basename(file)}`);
}
if (!errors.some((item) => item.includes("chunk vuoto"))) pass("nessun chunk vuoto");

const digest = crypto.createHash("sha256").update(css).digest("hex");
console.log(`DIST PUNTO 0 · ${jsFiles.length} chunk JS · ${Buffer.byteLength(css)} byte CSS · SHA256 ${digest}`);

if (errors.length) {
  console.error(`\nDIST PUNTO 0 NON SUPERATA · ${errors.length} errore/i su ${checks.length + errors.length} verifiche.`);
  process.exit(1);
}

console.log(`\nDIST PUNTO 0 SUPERATA · ${checks.length} verifiche indipendenti completate.`);
