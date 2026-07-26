import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const app = read("src/App_nuovo.jsx");
const processPage = read("src/ProcessiPage.jsx");
const wizard = read("src/NewAssetWizard.jsx");

const checks = [
  [
    "inventario calcolato dal backend",
    app.includes("/cespite/prossimo-codice?sede=")
      && !app.includes("generaCodiceInventarioAutomatico")
      && !app.includes("regolaInventarioStoricaDaSede"),
  ],
  [
    "inventario automatico confermato dal wizard",
    wizard.includes("requestAutomaticInventoryCode")
      && wizard.includes("submissionForm.codicestrumento"),
  ],
  [
    "letture Process Engine autenticate",
    processPage.includes('headers: fmedAuthHeaders()')
      && processPage.includes("/process-engine/esecuzioni?limit=300")
      && processPage.includes("/quadro"),
  ],
  [
    "dati pilota infrastrutture eliminati",
    !app.includes("SCADENZIARIO_INFRASTRUTTURE_AXA")
      && app.includes("const [infrastrutture, setInfrastrutture] = useState([])"),
  ],
  [
    "menu infrastrutture guidati dal Master Data",
    [
      '"categorie_infrastrutture"',
      '"ditte_esecutrici"',
      '"societa"',
      '"centri_costo"',
      '"stati_infrastruttura"',
    ].every((token) => app.includes(token)),
  ],
  [
    "nessun catalogo fornitori iniettato nel menu infrastrutture",
    !app.includes('...listaDitteEsecutrici, "SC IMPIANTI"')
      && !app.includes('...listaSocieta, "MARILAB S.R.L."'),
  ],
  [
    "tipologie Asset e Interventi separate",
    app.includes('valoriDizionarioPrimari(dizionariCoreFmed, "tipologie_intervento"')
      && app.includes('options={listaTipologie} formCespite={formNuovoCespite}')
      && app.includes('options={listaTipologieFormInterventi} formCespite={formNuovoIntervento}'),
  ],
  [
    "scritture guidate Nuovo Asset autenticate",
    wizard.includes('method: "POST",\n        headers: fmedAuthHeaders()')
      && wizard.includes('method: "PATCH",\n        headers: fmedAuthHeaders()'),
  ],
  [
    "errore avanzamento processo non ignorato",
    wizard.includes("Passaggio aperto, ma avanzamento processo non salvato"),
  ],
  [
    "cataloghi Asset separati senza contaminazione Categoria-Tipologia",
    wizard.includes('dictionaryValues(masterData, "tipologie_asset", "tipologie")')
      && wizard.includes('dictionaryValues(masterData, "categorie_asset")')
      && !wizard.includes('"categorie_asset"), form.tipologia')
      && !wizard.includes('"tipologie_asset", "tipologie"), form.categoria'),
  ],
  [
    "relazioni obsolete non bloccanti e alias riconosciuti",
    wizard.includes('mode: "STALE"')
      && wizard.includes("optionCodes(item)")
      && wizard.includes("aliasesOf(item)")
      && wizard.includes("relationIsBlocking"),
  ],
];

let passed = true;
for (const [label, ok] of checks) {
  console.log(`${ok ? "OK" : "ERRORE"} · ${label}`);
  if (!ok) passed = false;
}

if (!passed) process.exit(1);
console.log("FMED E8.3.1 Master Data Repair: gate frontend OK");
