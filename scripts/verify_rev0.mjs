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
const visual = read("src/FmedVisualClean.css");
const cssFiles = fs.readdirSync(path.join(root, "src"), { recursive: true })
  .filter((file) => file.endsWith(".css"));
const allCss = cssFiles.map((file) => read(path.join("src", file))).join("\n");

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

if (process.exitCode) process.exit(process.exitCode);
console.log("FMED REV0 frontend: gate completato");
