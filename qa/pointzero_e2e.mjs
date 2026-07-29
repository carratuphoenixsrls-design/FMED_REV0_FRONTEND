import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.FMED_QA_URL || "http://127.0.0.1:4173";
const outDir = path.resolve(process.env.FMED_QA_OUTPUT || "qa-results");
fs.mkdirSync(outDir, { recursive: true });

const today = new Date();
const iso = (offsetDays) => {
  const date = new Date(today);
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
};

const assets = [
  {
    codicestrumento: "003323",
    sede: "Marilab Garbatella",
    categoria: "ELETTROMEDICALE",
    branca_medica: "DIAGNOSTICA PER IMMAGINI",
    locazione: "MAMMOGRAFIA",
    tipologia: "MAMMOGRAFO",
    costruttore: "TRADE ART",
    modello: "QA PRIME",
    matricola: "QA-001",
    societa: "MARILAB",
    stato_asset: "Attivo",
    link_documento: "https://example.invalid/sharepoint/003323",
    note: "Cespite di collaudo browser Punto 0",
  },
  {
    codicestrumento: "00384M",
    sede: "Marilab Surgery",
    categoria: "ELETTROMEDICALE",
    branca_medica: "CHIRURGIA AMBULATORIALE",
    locazione: "SALA OPERATORIA 1",
    tipologia: "MICROMANIPOLATORE",
    costruttore: "BELSAR",
    modello: "QA SURGERY",
    matricola: "QA-002",
    societa: "MARILAB",
    stato_asset: "Non in uso",
  },
  {
    codicestrumento: "A_003255",
    sede: "Marilab Future Labs",
    categoria: "ARREDO SANITARIO",
    branca_medica: "LABORATORIO ANALISI",
    locazione: "LABORATORIO",
    tipologia: "ANALIZZATORE",
    costruttore: "QA MEDICAL",
    modello: "LAB 500",
    matricola: "QA-003",
    societa: "PHOENIX",
    stato_asset: "Dismesso",
  },
];

const interventions = [
  {
    id_intervento: 101,
    codice_strumento: "003323",
    sede: "Marilab Garbatella",
    tipologia: "MAMMOGRAFO",
    attivita: "MANUTENZIONE ORDINARIA",
    ditta_esecutrice: "TRADE ART",
    data_ultimo_intervento: iso(-30),
    data_prossimo_intervento: iso(335),
    costo: 1250,
    periodicita: "ANNUALE",
    esito: "POSITIVO",
    link_documento: "https://example.invalid/report/101",
  },
  {
    id_intervento: 102,
    codice_strumento: "00384M",
    sede: "Marilab Surgery",
    tipologia: "MICROMANIPOLATORE",
    attivita: "VERIFICA SICUREZZA ELETTRICA",
    ditta_esecutrice: "BELSAR",
    data_ultimo_intervento: iso(-365),
    data_prossimo_intervento: iso(-2),
    costo: 480,
    periodicita: "ANNUALE",
    esito: "POSITIVO",
  },
];

const deadlines = [
  {
    id: "SC-QA-1",
    modulo: "ASSET",
    record_id: "003323",
    codice_strumento: "003323",
    sede: "Marilab Garbatella",
    tipologia: "MAMMOGRAFO",
    attivita: "MANUTENZIONE ORDINARIA",
    ditta_esecutrice: "TRADE ART",
    data_ultimo_intervento: iso(-365),
    data_prossimo_intervento: iso(-2),
  },
  {
    id: "SC-QA-2",
    modulo: "ASSET",
    record_id: "00384M",
    codice_strumento: "00384M",
    sede: "Marilab Surgery",
    tipologia: "MICROMANIPOLATORE",
    attivita: "VERIFICA SICUREZZA ELETTRICA",
    ditta_esecutrice: "BELSAR",
    data_ultimo_intervento: iso(-330),
    data_prossimo_intervento: iso(20),
  },
];

const infrastructures = [
  {
    id: "INF-QA-1",
    codice: "INF-00001",
    sede: "Marilab Garbatella",
    centro_costo: "Marilab Garbatella",
    locazione: "PIANO TERRA",
    categoria: "CLIMATIZZAZIONE",
    descrizione: "Quadrisplit mammografia",
    ditta: "SC IMPIANTI",
    periodicita: "SEMESTRALE",
    ultimo_intervento: iso(-170),
    prossimo_intervento: iso(10),
    stato: "IN_SCADENZA",
    priorita: "ALTA",
    responsabile: "Ufficio Tecnico",
    societa: "MARILAB",
  },
  {
    id: "INF-QA-2",
    codice: "INF-00002",
    sede: "Marilab Future Labs",
    centro_costo: "Marilab Future Labs",
    locazione: "LOCALE TECNICO",
    categoria: "ELETTRICO",
    descrizione: "Gruppo di continuità",
    ditta: "HSE MANAGEMENT",
    periodicita: "ANNUALE",
    ultimo_intervento: iso(-60),
    prossimo_intervento: iso(305),
    stato: "PROGRAMMATA",
    priorita: "MEDIA",
    responsabile: "Ufficio Tecnico",
    societa: "PHOENIX",
  },
];

const dictionaries = {
  sedi: [
    { codice: "MARILAB_GARBATELLA", label: "Marilab Garbatella" },
    { codice: "MARILAB_SURGERY", label: "Marilab Surgery" },
    { codice: "MARILAB_FUTURE_LABS", label: "Marilab Future Labs" },
  ],
  categorie_asset: [{ codice: "ELETTROMEDICALE", label: "ELETTROMEDICALE" }, { codice: "ARREDO_SANITARIO", label: "ARREDO SANITARIO" }],
  branche_mediche: [{ codice: "DIAGNOSTICA_PER_IMMAGINI", label: "DIAGNOSTICA PER IMMAGINI" }, { codice: "CHIRURGIA_AMBULATORIALE", label: "CHIRURGIA AMBULATORIALE" }],
  reparti: [{ codice: "DIAGNOSTICA", label: "DIAGNOSTICA" }, { codice: "CHIRURGIA", label: "CHIRURGIA" }],
  locazioni: [{ codice: "MAMMOGRAFIA", label: "MAMMOGRAFIA" }, { codice: "SALA_OPERATORIA_1", label: "SALA OPERATORIA 1" }],
  tipologie_asset: [{ codice: "MAMMOGRAFO", label: "MAMMOGRAFO" }, { codice: "MICROMANIPOLATORE", label: "MICROMANIPOLATORE" }],
  costruttori: [{ codice: "TRADE_ART", label: "TRADE ART" }, { codice: "BELSAR", label: "BELSAR" }],
  modelli: [{ codice: "QA_PRIME", label: "QA PRIME" }, { codice: "QA_SURGERY", label: "QA SURGERY" }],
  societa: [{ codice: "MARILAB", label: "MARILAB" }, { codice: "PHOENIX", label: "PHOENIX" }],
  stati_asset: [{ codice: "ATTIVO", label: "Attivo" }, { codice: "NON_IN_USO", label: "Non in uso" }, { codice: "DISMESSO", label: "Dismesso" }],
  ditte_esecutrici: [{ codice: "TRADE_ART", label: "TRADE ART" }, { codice: "BELSAR", label: "BELSAR" }],
  periodicita: [{ codice: "ANNUALE", label: "ANNUALE" }, { codice: "SEMESTRALE", label: "SEMESTRALE" }],
  categorie_infrastrutture: [{ codice: "CLIMATIZZAZIONE", label: "CLIMATIZZAZIONE" }, { codice: "ELETTRICO", label: "ELETTRICO" }],
  stati_infrastruttura: [{ codice: "PROGRAMMATA", label: "PROGRAMMATA" }, { codice: "IN_SCADENZA", label: "IN SCADENZA" }],
  centri_costo: [{ codice: "MARILAB_GARBATELLA", label: "Marilab Garbatella" }],
};

const processCatalog = [
  { codice: "NUOVO_ASSET", titolo: "Nuovo asset", modulo: "ASSET", modalita: "DEDICATO", descrizione: "Censimento guidato" },
  { codice: "NUOVO_INTERVENTO", titolo: "Nuovo intervento", modulo: "ASSET", modalita: "DEDICATO", descrizione: "Attività tecnica" },
  { codice: "MANUTENZIONE_INFRASTRUTTURA", titolo: "Manutenzione infrastruttura", modulo: "INFRASTRUTTURE", modalita: "STANDARD", descrizione: "Ciclo infrastrutturale" },
];

function jsonResponse(data, status = 200) {
  return { status, contentType: "application/json", body: JSON.stringify(data) };
}

function apiResponse(url, method) {
  const pathname = url.pathname;
  if (pathname === "/" || pathname === "") return jsonResponse({ status: "ok", service: "FMED QA" });
  if (pathname === "/dashboard-operativa") return jsonResponse({
    kpi: {
      asset_totali: assets.length, asset_attivi: 1, processi_totali: processCatalog.length,
      processi_aperti: 1, processi_in_ritardo: 0, processi_da_approvare: 0,
      scadenze_totali: deadlines.length, scadenze_scadute: 1, scadenze_entro_30: 1,
      scadenze_da_pianificare: 0, infrastrutture_totali: infrastructures.length,
      documenti_81_08: 2, non_conformita_aperte: 0, sla_rispettati_percentuale: 100,
      copertura_documentale_percentuale: 67, costi_tracciati: 1730,
      dizionari: Object.keys(dictionaries).length, valori_master_attivi: 24,
      valori_da_approvare: 0, regole_operative: 0,
    },
    scadenze_critiche: [{ id: "SC-QA-1", tipo: "SCADENZA", titolo: "Manutenzione mammografo", riferimento: "003323", modulo_label: "Asset", sede: "Marilab Garbatella", stato: "SCADUTA", priorita: "ALTA", scadenza: iso(-2) }],
    scadenze_operative: [], processi_operativi: [], approvazioni_pendenti: [],
  });
  if (pathname === "/core/dizionari") return jsonResponse({ dizionari: dictionaries });
  if (pathname === "/core/processi") return jsonResponse({ processi: processCatalog });
  if (pathname === "/core/processi/avvia") return jsonResponse({ esecuzione: { id: "PROC-QA-1", processo: "NUOVO_ASSET", stato: "APERTO" } });
  if (pathname.startsWith("/censimento")) return jsonResponse(assets);
  if (/^\/cespite\//.test(pathname) && method === "GET") {
    const code = decodeURIComponent(pathname.split("/").pop());
    return jsonResponse(assets.find((item) => item.codicestrumento === code) || assets[0]);
  }
  if (pathname.startsWith("/cespite/prossimo-codice")) return jsonResponse({ codice: "QA-000004" });
  if (pathname.startsWith("/interventi-cespite/")) return jsonResponse(interventions);
  if (pathname.startsWith("/analisi/")) return jsonResponse({ punteggio_criticita: 19, livello_criticita: "BUONA", classe_affidabilita: "BUONA", raccomandazione: "Nessuna criticità nel collaudo QA" });
  if (pathname === "/interventi" || pathname.startsWith("/interventi")) return jsonResponse(interventions);
  if (pathname === "/cicli-unificati/attivi") return jsonResponse(deadlines);
  if (pathname === "/infrastrutture") return jsonResponse(infrastructures);
  if (pathname.startsWith("/infrastrutture/")) return jsonResponse({ status: "ok" });
  if (pathname === "/sicurezza-81-08/config") return jsonResponse({
    sedi: dictionaries.sedi,
    categorie: [{ codice: "01_Documenti_Generali", label: "Documenti generali" }, { codice: "05_Registri_e_Verifiche", label: "Registri e verifiche" }],
  });
  if (pathname === "/sicurezza-81-08/documenti") return jsonResponse({ documenti: [
    { id: "DOC-QA-1", nome: "DVR Marilab Garbatella.pdf", sede_codice: "MARILAB_GARBATELLA", sede_label: "Marilab Garbatella", categoria_codice: "02_DVR_e_Valutazioni_Rischio", categoria_label: "DVR e valutazioni rischio", percorso_relativo: "DVR/DVR.pdf", modificato_il: iso(-20), dimensione: 180000 },
    { id: "DOC-QA-2", nome: "Registro verifiche.pdf", sede_codice: "MARILAB_SURGERY", sede_label: "Marilab Surgery", categoria_codice: "05_Registri_e_Verifiche", categoria_label: "Registri e verifiche", percorso_relativo: "Registri/verifiche.pdf", modificato_il: iso(-4), dimensione: 92000 },
  ], messaggio: "Indice QA disponibile" });
  if (pathname === "/process-engine/catalogo") return jsonResponse({ processi: processCatalog });
  if (pathname.startsWith("/process-engine/esecuzioni") || pathname.startsWith("/core/processi/esecuzioni")) return jsonResponse({ esecuzioni: [] });
  if (pathname === "/core/dizionari/amministrazione") return jsonResponse({ dizionari: Object.entries(dictionaries).map(([codice, valori]) => ({ codice, nome: codice, valori_attivi: valori.length })) });
  if (pathname === "/core/dizionari/valori") return jsonResponse({ valori: [] });
  if (pathname === "/core/regole-operative") return jsonResponse({ regole: [] });
  if (pathname === "/data-quality/audit") return jsonResponse({ riepilogo: {}, anomalie: [], cataloghi_vuoti_richiesti: [] });
  if (pathname === "/audit-finale") return jsonResponse({ status: "ok", controlli: [] });
  if (pathname.startsWith("/alert/")) return jsonResponse({ status: "ok" });
  if (method !== "GET") return jsonResponse({ status: "ok", id: "QA-SAVED" });
  return jsonResponse({});
}

const viewports = [
  { name: "1366x768", width: 1366, height: 768 },
  { name: "1536x864", width: 1536, height: 864 },
  { name: "1920x1080", width: 1920, height: 1080 },
];

const modules = [
  { key: "Dashboard", selector: ".fmed-dashboard-page", slug: "dashboard" },
  { key: "Asset", selector: ".p0-asset-page", slug: "asset" },
  { key: "Interventi", selector: ".p0-operations--maintenance", slug: "interventi" },
  { key: "Scadenze", selector: ".p0-operations--deadline", slug: "scadenze" },
  { key: "Infrastrutture", selector: ".p0-operations--infrastructure", slug: "infrastrutture" },
  { key: "Sicurezza 81/08", selector: ".p0-operations--safety", slug: "sicurezza" },
  { key: "Processi", selector: ".fmed-process-page", slug: "processi" },
  { key: "Dizionari", selector: ".p0-governance--catalogs", slug: "cataloghi" },
  { key: "Gestione Utenti", selector: ".p0-governance--tools", slug: "strumenti" },
];

const failures = [];
const results = [];
const recordFailure = (message) => {
  failures.push(message);
  console.error(`ERRORE E2E PUNTO 0 · ${message}`);
};
const recordPass = (message) => {
  results.push(message);
  console.log(`OK E2E PUNTO 0 · ${message}`);
};

async function assertPage(page, selector, label) {
  await page.locator(selector).first().waitFor({ state: "visible", timeout: 15000 });
  const box = await page.locator(selector).first().boundingBox();
  if (!box || box.width < 300 || box.height < 120) throw new Error(`${label}: contenitore troppo piccolo o invisibile`);
  if (await page.locator(".fmed-fatal-error").count()) throw new Error(`${label}: error boundary globale visibile`);
  const text = (await page.locator(selector).first().innerText()).trim();
  if (text.length < 20) throw new Error(`${label}: contenuto insufficiente`);
  const overflow = await page.evaluate(() => ({ width: window.innerWidth, scroll: document.documentElement.scrollWidth }));
  if (overflow.scroll > overflow.width + 12) throw new Error(`${label}: overflow orizzontale globale ${overflow.scroll}/${overflow.width}`);
}

async function screenshot(page, viewport, slug) {
  const dir = path.join(outDir, viewport.name);
  fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, `${slug}.png`), fullPage: true });
}

const browser = await chromium.launch({ headless: true });
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
    page.on("pageerror", (error) => pageErrors.push(String(error?.stack || error)));

    await page.addInitScript(() => {
      const now = Date.now();
      localStorage.setItem("fmed_login_session", JSON.stringify({
        token: "qa-jwt-token", access_token: "qa-jwt-token", username: "qa@gruppomarilab.it",
        email: "qa@gruppomarilab.it", nome: "Collaudo Regola 0", role: "Admin",
        label: "Amministratore", loginTimestamp: now, lastActivityAt: now,
        inactivityLimitMs: 1800000, source: "qa",
      }));
      localStorage.setItem("fmed_theme_mode", "light");
    });

    await page.route("https://qa.fmed.invalid/**", async (route) => {
      const request = route.request();
      const response = apiResponse(new URL(request.url()), request.method());
      await route.fulfill(response);
    });

    await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 60000 });

    for (const module of modules) {
      try {
        if (module.key !== "Dashboard") {
          await page.locator(`[data-module="${module.key}"]`).first().click();
        } else if (!(await page.locator(module.selector).count())) {
          await page.locator('[data-module="Dashboard"]').first().click();
        }
        await assertPage(page, module.selector, `${viewport.name} ${module.slug}`);
        await screenshot(page, viewport, module.slug);
        recordPass(`${viewport.name} · ${module.slug}`);
      } catch (error) {
        recordFailure(`${viewport.name} · ${module.slug} · ${error.message}`);
        await screenshot(page, viewport, `${module.slug}-ERRORE`).catch(() => {});
      }
    }

    if (viewport.name === "1366x768") {
      try {
        await page.locator('[data-module="Asset"]').first().click();
        await page.getByRole("button", { name: /Apri elenco filtrato/i }).click();
        await page.locator(".p0-asset-row").first().waitFor({ state: "visible" });
        await page.locator(".p0-asset-open").first().click();
        await assertPage(page, ".fmed-asset-detail-workspace", "scheda cespite");
        await screenshot(page, viewport, "asset-scheda-cespite");
        await page.locator(".fmed-asset-detail-close").first().click();
        recordPass("Scheda cespite aperta e chiusa");
      } catch (error) { recordFailure(`Scheda cespite · ${error.message}`); }

      try {
        await page.locator('[data-module="Interventi"]').first().click();
        await page.getByRole("button", { name: /Apri registro/i }).click();
        await page.locator(".p0-register tbody tr").first().waitFor({ state: "visible" });
        await screenshot(page, viewport, "interventi-registro");
        await page.getByRole("button", { name: /Intervento manuale/i }).click();
        await assertPage(page, ".fmed-intervention-workspace", "nuovo intervento");
        await screenshot(page, viewport, "interventi-nuovo");
        await page.locator(".fmed-workspace-back").first().click();
        recordPass("Registro e nuovo intervento");
      } catch (error) { recordFailure(`Interventi secondari · ${error.message}`); }

      try {
        await page.locator('[data-module="Scadenze"]').first().click();
        await page.getByRole("button", { name: /Apri agenda/i }).click();
        await page.locator(".p0-register tbody tr").first().waitFor({ state: "visible" });
        await screenshot(page, viewport, "scadenze-agenda");
        recordPass("Agenda scadenze aperta");
      } catch (error) { recordFailure(`Scadenze secondarie · ${error.message}`); }

      try {
        await page.locator('[data-module="Infrastrutture"]').first().click();
        await page.getByRole("button", { name: /Nuova infrastruttura/i }).click();
        await assertPage(page, ".p0-editor", "editor infrastruttura");
        await screenshot(page, viewport, "infrastrutture-editor");
        await page.getByRole("button", { name: "Annulla" }).click();
        recordPass("Editor infrastruttura aperto e chiuso");
      } catch (error) { recordFailure(`Infrastrutture secondarie · ${error.message}`); }

      try {
        await page.locator('[data-module="Asset"]').first().click();
        await page.getByRole("button", { name: "Nuovo asset" }).click();
        await assertPage(page, ".fmed-wizard-page", "wizard nuovo asset");
        await screenshot(page, viewport, "asset-wizard");
        const back = page.locator(".fmed-workspace-back").first();
        if (await back.count()) await back.click();
        recordPass("Wizard nuovo asset aperto");
      } catch (error) { recordFailure(`Wizard nuovo asset · ${error.message}`); }
    }

    for (const message of pageErrors) recordFailure(`${viewport.name} pageerror: ${message}`);
    for (const message of consoleErrors.filter((item) => !/favicon|net::ERR_BLOCKED_BY_CLIENT/i.test(item))) {
      recordFailure(`${viewport.name} console.error: ${message}`);
    }
    await context.close();
  }
} finally {
  await browser.close();
}

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  viewports,
  passed: results.length,
  failed: failures.length,
  results,
  failures,
};
fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));

if (failures.length) {
  console.error(`\nE2E PUNTO 0 NON SUPERATO · ${failures.length} errore/i.`);
  process.exit(1);
}
console.log(`\nE2E PUNTO 0 SUPERATO · ${results.length} controlli browser e screenshot completati.`);
