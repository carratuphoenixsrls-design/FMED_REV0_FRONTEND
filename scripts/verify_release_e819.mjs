import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const checks = [
  ["package.json", /"version"\s*:\s*"8\.1\.9"/, "versione package E8.1.9"],
  ["src/App_nuovo.jsx", /Scopo e Missione/, "pagina Scopo e Missione nel menu"],
  ["src/App_nuovo.jsx", /marilab-mover\.vercel\.app/, "collegamento Marilab Mover"],
  ["src/App_nuovo.jsx", /fmed-predictive-column/, "colonna predittiva affiancata"],
  ["src/ProcessiPage.jsx", /PROCESS_GUIDANCE/, "spiegazioni specifiche dei processi"],
  ["src/NewAssetWizard.jsx", /fmed-wizard-hero-facts/, "Nuovo Asset a pagina intera e proporzionato"],
  ["src/NewAssetWizard.jsx", /STEP_CONTEXT/, "spiegazione chiara dei passaggi Nuovo Asset"],
  ["src/NewAssetWizard.css", /E8\.1\.9 — Nuovo Asset proporzionato/, "layout desktop Nuovo Asset E8.1.9"],
  ["src/components/masterdata/CatalogUniformityPanel.jsx", /Nuove voci: niente testo libero/, "governance nuovi valori"],
  ["src/components/masterdata/CanonicalSelect.jsx", /confirmDistinct/, "blocco anti-duplicato sulle nuove voci"],
  ["src/components/masterdata/CatalogUniformityPanel.jsx", /Codice inventario escluso/, "esclusione Codice inventario"],
  ["src/MissionPage.jsx", /createPresentationAudio/, "presentazione animata con audio opzionale"],
  ["src/FmedE819MissionCatalogs.css", /core-uniformity-governance/, "stile cataloghi governati"],
  ["public/fmed-build.json", /E8\.1\.9/, "metadati build E8.1.9"],
];

let failures = 0;
for (const [file, pattern, label] of checks) {
  const content = read(file);
  const ok = pattern.test(content);
  console.log(`${ok ? "OK" : "KO"} · ${label}`);
  if (!ok) failures += 1;
}
if (failures) {
  console.error(`Verifica E8.1.9 fallita: ${failures} controlli non superati.`);
  process.exit(1);
}
console.log("FMED E8.1.9 Missione, UX e Cataloghi Governati: OK");
