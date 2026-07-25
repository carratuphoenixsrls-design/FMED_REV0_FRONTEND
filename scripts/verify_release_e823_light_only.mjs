import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const assert = (condition, message) => {
  if (!condition) {
    console.error(`ERRORE: ${message}`);
    process.exitCode = 1;
  } else {
    console.log(`OK: ${message}`);
  }
};
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(full) : [full];
});

const app = read("src/App_nuovo.jsx");
const main = read("src/main.jsx");
const styles = read("src/fmedInlineStyles.js");
const packageJson = JSON.parse(read("package.json"));
const buildJson = JSON.parse(read("public/fmed-build.json"));
const indexHtml = read("index.html");
const sourceFiles = walk(path.join(root, "src")).filter((file) => /\.(?:js|jsx|css|svg)$/i.test(file));
const sourceText = sourceFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");

assert(packageJson.version === "8.2.3", "package.json allineato a E8.2.3");
assert(buildJson.release === "E8.2.3_LIGHT_ONLY", "manifest pubblico allineato a LIGHT ONLY");
assert(indexHtml.includes("FMED_ENTERPRISE_1_0_E8_2_3_LIGHT_ONLY_2026_07_26"), "metadato HTML della build aggiornato");
assert(app.includes('className="fmed-app-root fmed-light-mode'), "radice applicativa bloccata sulla modalità chiara");
assert(app.includes("...styles.themeLightVars"), "variabili inline esclusivamente chiare");
assert(main.includes('document.documentElement.dataset.theme = "light"'), "tema chiaro imposto prima del rendering");
assert(main.includes('document.body.dataset.theme = "light"'), "tema chiaro imposto anche sul body");
assert(!fs.existsSync(path.join(root, "src/FmedLegacyThemeBridge.css")), "ponte del vecchio sistema temi eliminato");

const forbidden = [
  /data-theme\s*=\s*["']dark["']/i,
  /\.fmed-dark-mode\b/i,
  /prefers-color-scheme\s*:\s*dark/i,
  /\bdarkMode\b/i,
  /\bloginDarkMode\b/i,
  /\bsetDarkMode\b/i,
  /themeDarkVars/i,
  /fmed_theme_mode/i,
  /fmed-sidebar-theme-btn/i,
  /theme-toggle/i,
  /tema\s+scuro/i,
  /modalit[aà]\s+scura/i,
];
for (const pattern of forbidden) {
  assert(!pattern.test(sourceText), `assenza del riferimento rimosso ${pattern}`);
}

const styleRefs = [...new Set([...app.matchAll(/\bstyles\.([A-Za-z_$][\w$]*)/g)].map((match) => match[1]))];
const styleKeys = [...styles.matchAll(/^  "([A-Za-z_$][\w$]*)":/gm)].map((match) => match[1]);
const missingStyles = styleRefs.filter((name) => !styleKeys.includes(name));
const unusedStyles = styleKeys.filter((name) => !styleRefs.includes(name));
assert(styleRefs.length === 145, `145 gruppi di stile realmente richiamati (${styleRefs.length})`);
assert(missingStyles.length === 0, `nessuno stile richiamato mancante${missingStyles.length ? `: ${missingStyles.join(", ")}` : ""}`);
assert(unusedStyles.length === 0, `nessun gruppo inline storico inutilizzato${unusedStyles.length ? `: ${unusedStyles.join(", ")}` : ""}`);

const localImportPattern = /(?:import\s+(?:[^"']+?\s+from\s+)?|import\s*\()\s*["'](\.[^"']+)["']/g;
const sourceCodeFiles = sourceFiles.filter((file) => /\.(?:js|jsx)$/i.test(file));
const unresolved = [];
for (const file of sourceCodeFiles) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(localImportPattern)) {
    const base = path.resolve(path.dirname(file), match[1]);
    const candidates = [base, `${base}.js`, `${base}.jsx`, `${base}.css`, `${base}.json`, path.join(base, "index.js"), path.join(base, "index.jsx")];
    if (!candidates.some((candidate) => fs.existsSync(candidate))) unresolved.push(`${path.relative(root, file)} -> ${match[1]}`);
  }
}
assert(unresolved.length === 0, `nessun import locale mancante${unresolved.length ? `: ${unresolved.join(" | ")}` : ""}`);

if (process.exitCode) process.exit(process.exitCode);
console.log("\nVERIFICA E8.2.3 LIGHT ONLY COMPLETATA CON SUCCESSO");
