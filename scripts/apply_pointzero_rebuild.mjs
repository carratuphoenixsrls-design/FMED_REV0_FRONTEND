import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const write = (file, content) => fs.writeFileSync(path.join(root, file), content, "utf8");

function patchFile(file, transform) {
  const before = read(file);
  const after = transform(before);
  if (after !== before) write(file, after);
}

function addDefaultsToPropsDestructure(source, defaults) {
  const marker = "const {";
  const start = source.indexOf(marker);
  if (start < 0) return source.replace("} = props;", "} = props || {};");
  const endMarker = "} = props;";
  const end = source.indexOf(endMarker, start);
  if (end < 0) return source;
  const bodyStart = start + marker.length;
  const body = source.slice(bodyStart, end);
  const parts = body.split(",").map((part) => part.trim()).filter(Boolean);
  const patched = parts.map((part) => {
    if (part.includes("=")) return part;
    return Object.hasOwn(defaults, part) ? `${part} = ${defaults[part]}` : part;
  });
  const replacement = `const {\n    ${patched.join(",\n    ")}\n  } = props || {};`;
  return `${source.slice(0, start)}${replacement}${source.slice(end + endMarker.length)}`;
}

const noop = "() => {}";
const array = "[]";

patchFile("src/pages/AssetPage.jsx", (source) => addDefaultsToPropsDestructure(source, {
  filtrati: array,
  cespiti: array,
  assetElencoAperto: "false",
  assetAnalisiAperta: "false",
  assetKpiFiltrati: "{ totale: 0, attivi: 0, dismessi: 0, nonInUso: 0 }",
  assetPerSedeFiltrati: array,
  assetPerRepartoFiltrati: array,
  assetPerCostruttoreFiltrati: array,
  assetPerStatoFiltrati: array,
  filtratiRenderizzati: array,
  assetSelezionatiBulk: array,
  assetQuickEditForm: "{}",
  listaTipologie: array,
  listaSedi: array,
  listaBranche: array,
  listaCostruttori: array,
  listaModelli: array,
  listaSocieta: array,
  STATI_ASSET_STANDARD: array,
  setAssetElencoAperto: noop,
  setAssetAnalisiAperta: noop,
  apriSchedaCespite: noop,
  getCodiceAssetBulk: "(asset) => String(asset?.codicestrumento || asset?.codice_strumento || asset?.codice || '')",
  getBrancaAsset: "() => ''",
  getLocazioneFmed: "() => ''",
  statoCespite: "() => 'NON SPECIFICATO'",
  coloreStatoAsset: "() => '#7d8da3'",
  toggleSelezioneAssetBulk: noop,
  toggleSelezioneAssetVisibiliBulk: noop,
  aggiornaCampoModificaRapidaAsset: noop,
  apriModificaRapidaAsset: noop,
  salvaModificaRapidaAsset: noop,
  annullaModificaRapidaAsset: noop,
  getListaLocazioniPerSede: "() => []",
  setAssetRenderLimit: noop,
  setAssetBulkBranca: noop,
  setAssetBulkSocieta: noop,
  setAssetBulkSede: noop,
  setAssetBulkLocazione: noop,
  setAssetBulkStato: noop,
  salvaModificaMultiplaBrancaAsset: noop,
  selezionaTuttiAssetFiltratiBulk: noop,
  setAssetSelezionatiBulk: noop,
}));

patchFile("src/components/asset/AssetControls.jsx", (source) => addDefaultsToPropsDestructure(source, {
  filtrati: array,
  listaSediAsset: array,
  listaCategorie: array,
  listaBranche: array,
  listaLocazioniAsset: array,
  listaTipologie: array,
  listaCostruttori: array,
  listaModelli: array,
  listaSocieta: array,
  listaStatiAsset: array,
  ricerca: "''",
  sede: "'TUTTE'",
  categoriaFiltro: "'TUTTE'",
  assetRepartoFiltro: "'TUTTI'",
  assetLocazioneFiltro: "'TUTTE'",
  assetTipologiaFiltro: "'TUTTE'",
  assetCostruttoreFiltro: "'TUTTI'",
  assetModelloFiltro: "'TUTTI'",
  assetSocietaFiltro: "'TUTTE'",
  assetStatoFiltro: "'TUTTI'",
  ordineCodiceAsset: "'CODICE_ASC'",
  formatCategoria: "(value) => value",
  setRicerca: noop,
  setAssetElencoAperto: noop,
  setSede: noop,
  setAssetLocazioneFiltro: noop,
  setCategoriaFiltro: noop,
  setAssetRepartoFiltro: noop,
  setAssetTipologiaFiltro: noop,
  setAssetCostruttoreFiltro: noop,
  setAssetModelloFiltro: noop,
  setAssetSocietaFiltro: noop,
  setAssetStatoFiltro: noop,
  setOrdineCodiceAsset: noop,
  setAssetAnalisiAperta: noop,
  setAssetBulkBranca: noop,
  setAssetBulkSede: noop,
  setAssetBulkLocazione: noop,
  setAssetBulkStato: noop,
  setAssetBulkSocieta: noop,
  setAssetSelezionatiBulk: noop,
  setCodiceCespiteAutomatico: noop,
  avviaProcessoGuidatoFmed: noop,
  setImpostazioniTab: noop,
  setPagina: noop,
}));

patchFile("src/pages/InterventiPage.jsx", (source) => addDefaultsToPropsDestructure(source, {
  interventiFiltrati: array,
  interventi: array,
  codiciCoinvoltiInterventi: "new Set()",
  ditteCoinvolteInterventi: "new Set()",
  interventiFiltratiRenderizzati: array,
  formatCurrency: "(value) => Number(value || 0).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })",
  importoIntervento: "() => 0",
  labelPeriodoContabileInterventi: "() => 'Periodo corrente'",
  cambiaVistaStoricoInterventi: noop,
  setInterventiElencoAperto: noop,
  apriSchedaDaCodice: noop,
  normalizzaSocietaDitta: "(value) => value || '-'",
  formattaData: "(value) => value || '-'",
  BottoneJobReport: "() => null",
  apriModificaIntervento: noop,
  eliminaIntervento: noop,
  setInterventiRenderLimit: noop,
}));

patchFile("src/components/interventi/InterventiControls.jsx", (source) => addDefaultsToPropsDestructure(source, {
  interventiFiltrati: array,
  cespitiPerNuovoIntervento: array,
  listaCodiciFiltroInterventi: array,
  listaSediInterventi: array,
  listaSocietaInterventi: array,
  listaTipologieFiltroInterventi: array,
  listaAttivitaFiltroInterventi: array,
  listaAnniContabiliInterventi: array,
  permessiRuoloFmed: "{}",
  ricercaCespiteIntervento: "''",
  labelPeriodoContabileInterventi: "() => 'Periodo corrente'",
  apriNuovoIntervento: noop,
  setRicercaCespiteIntervento: noop,
  apriSchedaCespite: noop,
  setInterventiElencoAperto: noop,
  setPagina: noop,
  resetFiltriInterventi: noop,
  esportaInterventiFiltratiPdf: noop,
}));

patchFile("src/pages/ScadenzePage.jsx", (source) => {
  let result = addDefaultsToPropsDestructure(source, {
    scadenzeVisualizzate: array,
    scadenzeConStatoBase: array,
    scadenzeSelezionateVisualizzate: array,
    scadenzeScadute: array,
    scadenzeImminenti: array,
    scadenzeRenderizzate: array,
    scadenzeSelezionateExport: array,
    setScadenzeElencoAperto: noop,
    chiaveScadenzaExport: "(row) => String(row?.id || row?.codice_strumento || row?.codicestrumento || '')",
    statoScadenza: "() => ({ codice: 'NON_DISPONIBILE', testo: 'Da verificare', colore: '#7d8da3', giorni: null })",
    toggleScadenzaExport: noop,
    chiudiScadenzaSingolaComeSostituita: noop,
    apriSchedaDaCodice: noop,
    normalizzaSocietaDitta: "(value) => value || '-'",
    formattaData: "(value) => value || '-'",
    setScadenzeRenderLimit: noop,
  });
  result = result.replace("const state = row._statoScadenza || statoScadenza(row._dataScadenza);", "const state = row?._statoScadenza || statoScadenza?.(row?._dataScadenza) || { codice: 'NON_DISPONIBILE', testo: 'Da verificare', colore: '#7d8da3', giorni: null };");
  return result;
});

patchFile("src/components/scadenze/ScadenzeControls.jsx", (source) => addDefaultsToPropsDestructure(source, {
  scadenzeVisualizzate: array,
  scadenzeSelezionateVisualizzate: array,
  listaModuliFiltroScadenze: array,
  listaCodiciFiltroScadenze: array,
  listaSediFiltroScadenze: array,
  listaTipologieFiltroScadenze: array,
  listaAttivitaFiltroScadenze: array,
  listaDitteFiltroScadenze: array,
  normalizzaSocietaDitta: "(value) => value || '-'",
  setScadenzeElencoAperto: noop,
  selezionaTutteScadenzeVisualizzate: noop,
  deselezionaTutteScadenze: noop,
  resetFiltriScadenze: noop,
  esportaScadenzePdf: noop,
}));

patchFile("src/pages/InfrastrutturePage.jsx", (source) => {
  let result = addDefaultsToPropsDestructure(source, {
    infrastruttureFiltrate: array,
    infrastruttureConStato: array,
    infraOk: array,
    infraInScadenza: array,
    infraScadute: array,
    formattaData: "(value) => value || '-'",
  });
  result = result.replace("row._statoInfra.colore", "row?._statoInfra?.colore || '#7d8da3'");
  result = result.replace("row._statoInfra.testo", "row?._statoInfra?.testo || 'Da verificare'");
  return result;
});

patchFile("src/components/infrastrutture/InfrastruttureControls.jsx", (source) => addDefaultsToPropsDestructure(source, {
  infrastruttureFiltrate: array,
  listaInfraSedi: array,
  listaInfraCategorie: array,
  listaInfraDitte: array,
  listaInfraPeriodicita: array,
  listaInfraPriorita: array,
  listaInfraResponsabili: array,
  listaInfraCentriCosto: array,
  listaInfraSocieta: array,
  permessiRuoloFmed: "{}",
  ricercaInfra: "''",
  setRicercaInfra: noop,
  apriNuovaInfrastruttura: noop,
  caricaInfrastruttureOnDemand: noop,
  resetFiltriInfrastrutture: noop,
}));

patchFile("src/components/infrastrutture/InfrastrutturaEditor.jsx", (source) => addDefaultsToPropsDestructure(source, {
  formInfra: "{}",
  SEDI_STANDARD_LIST: array,
  infraCategorieStandard: array,
  infraDitteOptions: array,
  infraPeriodicitaStandard: array,
  infraStatiStandard: array,
  PRIORITA_STANDARD: array,
  infraSocietaOptions: array,
  infraCentroCostoOptions: array,
  aggiornaFormInfra: noop,
  salvaInfrastruttura: noop,
  setFormInfrastrutturaOpen: noop,
  apriMenuAttivitaInfrastruttura: noop,
  apriMenuDocumentazioneInfrastruttura: noop,
  apriReportInfrastruttura: noop,
  apriMenuAllegaInfrastruttura: noop,
}));

patchFile("src/main.jsx", (source) => {
  const imports = [
    'import "./pages/AssetPointZero.css";',
    'import "./pages/OperationsPointZero.css";',
    'import "./pages/GovernancePointZero.css";',
    'import "./PointZeroCompatibility.css";',
  ];
  let result = source;
  const anchor = 'import "./Regola0VisualSystem.css";';
  if (result.includes(anchor)) {
    const missing = imports.filter((line) => !result.includes(line));
    result = result.replace(anchor, `${anchor}\n${missing.join("\n")}`);
  }
  result = result.replace(/const FMED_APP_CACHE_VERSION = "[^"]+";/, 'const FMED_APP_CACHE_VERSION = "fmed-rev0-punto0-rebuild-20260729-1";');
  return result;
});

patchFile("scripts/verify_regola0.mjs", (source) => {
  let result = source;
  if (!result.includes('const pointZeroCss = requireFile("src/PointZeroCompatibility.css"')) {
    result = result.replace(
      'const regola0Css = requireFile("src/Regola0VisualSystem.css", "sistema visuale Regola 0");',
      'const regola0Css = requireFile("src/Regola0VisualSystem.css", "sistema visuale Regola 0");\nconst pointZeroCss = requireFile("src/PointZeroCompatibility.css", "compatibilità Punto 0");\nconst assetPointZeroCss = requireFile("src/pages/AssetPointZero.css", "Asset Punto 0");\nconst operationsPointZeroCss = requireFile("src/pages/OperationsPointZero.css", "moduli operativi Punto 0");\nconst governancePointZeroCss = requireFile("src/pages/GovernancePointZero.css", "governance Punto 0");'
    );
    result = result.replace(
      'const allCss = `${baseCss}\\n${visualCss}\\n${regola0Css}`;',
      'const allCss = `${baseCss}\\n${visualCss}\\n${regola0Css}\\n${pointZeroCss}\\n${assetPointZeroCss}\\n${operationsPointZeroCss}\\n${governancePointZeroCss}`;'
    );
    result = result.replace(
      'requireTokens("grafica primaria secondaria e terziaria coperta", regola0Css, [',
      'requireTokens("ricostruzione reale Punto 0 caricata", `${assetPointZeroCss}\\n${operationsPointZeroCss}\\n${governancePointZeroCss}\\n${pointZeroCss}`, [\n  ".p0-asset-page",\n  ".p0-operations",\n  ".p0-governance",\n  ".fmed-asset-detail-workspace",\n  ".fmed-intervention-workspace",\n]);\n\nrequireTokens("grafica primaria secondaria e terziaria coperta", `${regola0Css}\\n${pointZeroCss}`, ['
    );
    result = result.replace(
      '"src/Regola0VisualSystem.css",',
      '"src/Regola0VisualSystem.css",\n  "src/PointZeroCompatibility.css",\n  "src/pages/AssetPointZero.css",\n  "src/pages/OperationsPointZero.css",\n  "src/pages/GovernancePointZero.css",'
    );
  }
  return result;
});

console.log("FMED REV0 · ricostruzione Punto 0 applicata in modo controllato.");
