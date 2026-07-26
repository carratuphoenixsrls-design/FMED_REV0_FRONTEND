import fs from "node:fs";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const build = JSON.parse(fs.readFileSync("public/fmed-build.json", "utf8"));
const main = fs.readFileSync("src/main.jsx", "utf8");
const app = fs.readFileSync("src/App_nuovo.jsx", "utf8");
const visual = fs.readFileSync("src/FmedVisualClean.css", "utf8");
const inline = fs.readFileSync("src/fmedInlineStyles.js", "utf8");
const html = fs.readFileSync("index.html", "utf8");

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

const mainCssImports = [...main.matchAll(/import\s+["']\.\/([^"']+\.css)["'];/g)].map((match) => match[1]);
const sidebarElements = (app.match(/<aside className=\{`fmed-side-rail/g) || []).length;
const inlineSidebarDefinitions = (inline.match(/"sidebar":\s*\{/g) || []).length;
const forbiddenThemeCode = /themeDarkVars|loginDarkMode|setDarkMode|fmed-dark-mode|data-theme\s*=\s*["']dark|modalità scura|tema scuro/i;

const checks = [
  ["versione package E8.2.1", pkg.version === "8.2.1"],
  ["build pubblico E8.2.1", build.version === "E8.2.1"],
  ["unico stile globale caricato", mainCssImports.join("|") === "FmedErrorBoundary.css|FmedVisualClean.css"],
  ["foglio Visual Clean presente", fs.existsSync("src/FmedVisualClean.css")],
  ["vecchi livelli globali rimossi", legacyGlobalCss.every((name) => !fs.existsSync(`src/${name}`))],
  ["una sola sidebar JSX", sidebarElements === 1],
  ["una sola definizione inline sidebar", inlineSidebarDefinitions === 1],
  ["tema scuro assente dal runtime", !forbiddenThemeCode.test(`${app}\n${visual}\n${inline}`)],
  ["tema chiaro fissato", app.includes('document.body.dataset.theme = "light"')],
  ["login a due pannelli", app.includes("fmed-login-brand-panel") && app.includes("fmed-login-form-panel")],
  ["autenticazione backend preservata", app.includes('chiamataApiAutenticataFmed("/login"')],
  ["sessione FMED preservata", app.includes('FMED_LOGIN_SESSION_KEY = "fmed_login_session"')],
  ["ruoli Admin Service User preservati", ["Admin:", "Service:", "User:"].every((token) => app.includes(token))],
  ["timeout inattività invariato", app.includes("FMED_INACTIVITY_LIMIT_MS = 30 * 60 * 1000")],
  ["API Render preservata", app.includes("https://fmed-backend.onrender.com") && main.includes("https://fmed-backend.onrender.com")],
  ["Supabase e logica dati non introdotti nel visuale", !visual.toLowerCase().includes("supabase")],
  ["Google Fonts rimosso", !html.includes("fonts.googleapis.com") && !html.includes("fonts.gstatic.com")],
  ["layout desktop minimo preservato", visual.includes("min-width: 1180px")],
  ["sidebar compatta reale", visual.includes("--fmed-sidebar-collapsed-w: 68px") && visual.includes("flex: 0 0 var(--fmed-sidebar-collapsed-w)")],
  ["tabelle, form e dialog governati", visual.includes("Tables") && visual.includes("Forms") && visual.includes("Dialogs")],
  ["movimenti ridotti rispettati", visual.includes("prefers-reduced-motion")],
];

let ok = true;
for (const [label, pass] of checks) {
  console.log(`${pass ? "OK" : "ERRORE"} · ${label}`);
  if (!pass) ok = false;
}

if (!ok) process.exit(1);
console.log("FMED E8.2.1 Visual Clean: verifica completa OK");
