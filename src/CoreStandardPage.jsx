import FmedModuleIcon from "./components/FmedModuleIcon.jsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import DizionariControls from "./components/DizionariControls.jsx";
import { fmedAuthHeaders, fmedFetchJson, fmedSession } from "./fmedApiClient.js";

const emptyValue = { dizionario: "", codice: "", etichetta: "", ordine: 100, attivo: true, metadati: {} };
const apiHeaders = () => fmedAuthHeaders();
const normalizeText = (value) => String(value || "").toLocaleLowerCase("it-IT").trim();

const formatCount = (value) => new Intl.NumberFormat("it-IT").format(Number(value || 0));

function DataQualityPanel({ audit, loading, onRefresh }) {
  const summary = audit?.riepilogo || {};
  const issues = Array.isArray(audit?.criticita) ? audit.criticita : [];
  const duplicates = Array.isArray(audit?.duplicati_esatti) ? audit.duplicati_esatti : [];
  const conflicts = Array.isArray(audit?.conflitti_alias) ? audit.conflitti_alias : [];
  const emptyCatalogs = Array.isArray(audit?.cataloghi_vuoti) ? audit.cataloghi_vuoti : [];
  const missingLocations = Array.isArray(audit?.locazioni_asset_vuote) ? audit.locazioni_asset_vuote : [];
  const score = Number(summary.qualita_percentuale || 0);
  return <section className="core-quality-panel" aria-label="Qualità dati FMED">
    <div className="core-quality-heading">
      <div>
        <span className="core-standard-kicker">FMED REV0 · CONTROLLO UNICO</span>
        <h3>Qualità dati</h3>
        <p>Un solo audit in lettura: il catalogo attivo è la fonte canonica e nessun dato viene modificato.</p>
      </div>
      <button type="button" className="core-primary-button" onClick={onRefresh} disabled={loading}>{loading ? "Analisi…" : "Aggiorna audit"}</button>
    </div>
    <div className="core-quality-formula"><strong>Formula:</strong> {audit?.formula || "valori conformi / valori non vuoti verificati × 100"}</div>
    <div className="core-quality-summary">
      <article className={score >= 90 ? "is-ok" : "is-warning"}><span>Qualità verificata</span><strong>{score.toFixed(1)}%</strong><small>{formatCount(summary.valori_conformi)} conformi su {formatCount(summary.valori_verificati)}</small></article>
      <article><span>Record analizzati</span><strong>{formatCount(summary.record_analizzati)}</strong><small>fonti operative lette</small></article>
      <article className={summary.valori_non_censiti ? "is-warning" : "is-ok"}><span>Non censiti</span><strong>{formatCount(summary.valori_non_censiti)}</strong><small>segnalazioni, non correzioni</small></article>
      <article className={summary.valori_ambigui ? "is-warning" : "is-ok"}><span>Ambigui</span><strong>{formatCount(summary.valori_ambigui)}</strong><small>richiedono controllo umano</small></article>
      <article><span>Campi vuoti</span><strong>{formatCount(summary.campi_vuoti)}</strong><small>in tutti i campi controllati</small></article>
    </div>
    <div className="core-quality-summary">
      <article><span>Duplicati esatti</span><strong>{formatCount(summary.duplicati_esatti)}</strong><small>gruppi nel catalogo</small></article>
      <article><span>Conflitti alias</span><strong>{formatCount(summary.conflitti_alias)}</strong><small>nessun merge automatico</small></article>
      <article className={summary.cataloghi_vuoti_richiesti ? "is-warning" : "is-ok"}><span>Cataloghi vuoti</span><strong>{formatCount(summary.cataloghi_vuoti)}</strong><small>{formatCount(summary.cataloghi_vuoti_richiesti)} richiesti dai dati · {formatCount(summary.cataloghi_vuoti_non_utilizzati)} non utilizzati</small></article>
      <article><span>Locazioni asset vuote</span><strong>{formatCount(summary.locazioni_asset_vuote)}</strong><small>solo diagnostica</small></article>
    </div>
    <div className="core-quality-rules">
      {(audit?.regole || []).map(rule => <span key={rule}>{rule}</span>)}
    </div>
    <div className="core-quality-issues">
      <div className="core-section-heading"><h3>Segnalazioni operative</h3><span>{issues.length}</span></div>
      <div className="core-quality-table-head"><span>Dizionario</span><span>Origine</span><span>Valore</span><span>Esito</span><span>Occorrenze</span></div>
      <div className="core-quality-table">
        {issues.slice(0, 300).map((item, index) => <div className="core-quality-row" key={`${item.dizionario}-${item.tabella}-${item.campo}-${item.valore}-${index}`}>
          <code>{item.dizionario}</code><span>{item.tabella}.{item.campo}</span><strong>{item.valore}</strong><span>{item.esito}</span><b>{formatCount(item.occorrenze)}</b>
        </div>)}
        {!issues.length && <div className="core-empty-state">Nessuna segnalazione operativa.</div>}
      </div>
    </div>
    <div className="core-quality-diagnostics">
      <article><h4>Duplicati e alias</h4><strong>{duplicates.length + conflicts.length}</strong><span>gruppi da verificare nel Catalogo</span></article>
      <article><h4>Cataloghi vuoti</h4><strong>{emptyCatalogs.length}</strong><span>classificati in base ai riferimenti operativi reali</span></article>
      <article><h4>Locazioni mancanti</h4><strong>{missingLocations.length}</strong><span>nessuna deduzione o compilazione automatica</span></article>
    </div>
    {emptyCatalogs.length > 0 && <div className="core-quality-empty-catalogs">
      <div className="core-section-heading"><h3>Classificazione cataloghi vuoti</h3><span>{emptyCatalogs.length}</span></div>
      {emptyCatalogs.map((item) => <div key={item.dizionario}>
        <div><strong>{item.descrizione || item.dizionario}</strong><code>{item.dizionario}</code></div>
        <span>{item.esito === "RICHIESTO_DAI_DATI" ? "Richiesto dai dati: verificare e popolare" : "Non utilizzato nei dati analizzati"}</span>
        <b>{formatCount(item.riferimenti_operativi)} riferimenti</b>
      </div>)}
    </div>}
  </section>;
}

function OperationalRulesPanel({ audit, catalog, search }) {
  const rules = Array.isArray(audit?.regole) ? audit.regole : [];
  const summary = audit?.riepilogo || {};
  const query = normalizeText(search);
  const labels = new Map();
  (catalog || []).forEach((dictionary) => {
    (dictionary?.valori || []).forEach((value) => {
      labels.set(`${dictionary.codice}:${value.codice}`, value.etichetta || value.codice);
    });
  });
  const dictionaryLabels = new Map((catalog || []).map((dictionary) => [dictionary.codice, dictionary.descrizione || dictionary.codice]));
  const visible = rules.filter((rule) => !query || normalizeText([
    rule.sorgente_dizionario,
    labels.get(`${rule.sorgente_dizionario}:${rule.sorgente_codice}`),
    rule.destinazione_dizionario,
    labels.get(`${rule.destinazione_dizionario}:${rule.destinazione_codice}`),
  ].join(" ")).includes(query));
  const groups = visible.reduce((result, rule) => {
    const key = `${rule.sorgente_dizionario} → ${rule.destinazione_dizionario}`;
    if (!result.has(key)) result.set(key, []);
    result.get(key).push(rule);
    return result;
  }, new Map());

  return <section className="core-operational-rules" aria-label="Regole operative FMED">
    <header className="core-rules-heading">
      <div>
        <span className="core-standard-kicker">FMED REV0 · MOTORE UNICO</span>
        <h3>Regole operative</h3>
        <p>Solo vincoli espliciti e verificati possono guidare i menu. Lo storico non crea automatismi.</p>
      </div>
      <span className="core-rules-count">{formatCount(rules.length)} operative</span>
    </header>
    <div className="core-rules-summary">
      <article className="is-ok"><span>Regole operative</span><strong>{formatCount(summary.regole_operative)}</strong><small>vincoli espliciti applicabili</small></article>
      <article><span>Storico escluso</span><strong>{formatCount(summary.storiche_escluse)}</strong><small>archiviato, mai applicato</small></article>
      <article><span>Non vincolanti</span><strong>{formatCount(summary.non_vincolanti_escluse)}</strong><small>non usati dai wizard</small></article>
      <article><span>Duplicati esclusi</span><strong>{formatCount(summary.duplicati_esclusi)}</strong><small>mai caricati due volte</small></article>
    </div>
    <div className="core-rules-policy">
      <strong>Regola di sicurezza</strong>
      <span>Se non esiste un vincolo valido, FMED mostra tutte le opzioni attive e non blocca il lavoro.</span>
    </div>
    <div className="core-rules-groups">
      {[...groups.entries()].map(([group, items]) => <section key={group} className="core-rules-group">
        <header><div><strong>{dictionaryLabels.get(items[0].sorgente_dizionario) || items[0].sorgente_dizionario}</strong><span>verso</span><strong>{dictionaryLabels.get(items[0].destinazione_dizionario) || items[0].destinazione_dizionario}</strong></div><b>{items.length}</b></header>
        {items.map((rule) => <div className="core-rule-row" key={rule.id || `${rule.sorgente_dizionario}-${rule.sorgente_codice}-${rule.destinazione_dizionario}-${rule.destinazione_codice}`}>
          <div><strong>{labels.get(`${rule.sorgente_dizionario}:${rule.sorgente_codice}`) || rule.sorgente_codice}</strong><code>{rule.sorgente_codice}</code></div>
          <span aria-hidden="true">→</span>
          <div><strong>{labels.get(`${rule.destinazione_dizionario}:${rule.destinazione_codice}`) || rule.destinazione_codice}</strong><code>{rule.destinazione_codice}</code></div>
          <b>Vincolante</b>
        </div>)}
      </section>)}
      {!visible.length && <div className="core-empty-state">Nessuna regola operativa configurata. I menu restano completi e utilizzabili.</div>}
    </div>
  </section>;
}


export default function CoreStandardPage({ apiBaseUrl, onDataChanged, canManage = false, initialTab = "DIZIONARI" }) {
  const [catalogo, setCatalogo] = useState([]);
  const [selected, setSelected] = useState("");
  const [draft, setDraft] = useState(emptyValue);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState(initialTab);
  const [operationalRules, setOperationalRules] = useState({ regole: [], riepilogo: {} });
  const [dictionarySearch, setDictionarySearch] = useState("");
  const [valueSearch, setValueSearch] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const [nextCode, setNextCode] = useState("");
  const [editingValueId, setEditingValueId] = useState(null);
  const [editingLabel, setEditingLabel] = useState("");
  const [mergeSource, setMergeSource] = useState(null);
  const [mergeTargetId, setMergeTargetId] = useState("");
  const [dataQuality, setDataQuality] = useState(null);
  const [dataQualityLoading, setDataQualityLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setMessage("");
    const [dictionaryResult, rulesResult] = await Promise.allSettled([
      fmedFetchJson("/core/dizionari/amministrazione", { apiBaseUrl, retries: 3, timeoutMs: 60000 }),
      fmedFetchJson("/core/regole-operative", { apiBaseUrl, retries: 3, timeoutMs: 60000 }),
    ]);
    const warnings = [];
    if (dictionaryResult.status === "fulfilled") {
      const dictionaries = Array.isArray(dictionaryResult.value?.dizionari) ? dictionaryResult.value.dizionari : [];
      setCatalogo(dictionaries);
      setSelected(prev => prev || dictionaries[0]?.codice || "");
    } else {
      warnings.push(`Dizionari: ${dictionaryResult.reason?.message || "backend non raggiungibile"}`);
    }
    if (rulesResult.status === "fulfilled") {
      setOperationalRules(rulesResult.value || { regole: [], riepilogo: {} });
    } else {
      warnings.push(`Regole operative: ${rulesResult.reason?.message || "backend non raggiungibile"}`);
    }
    if (warnings.length) {
      setMessage(`Sincronizzazione parziale. ${warnings.join(" · ")}. FMED riprova automaticamente anche dopo il riavvio di Render.`);
    }
    setLoading(false);
  }, [apiBaseUrl]);

  useEffect(() => { load(); }, [load]);

  const loadDataQuality = useCallback(async () => {
    setDataQualityLoading(true);
    try {
      const data = await fmedFetchJson("/data-quality/audit?limit=10000", { apiBaseUrl, retries: 2, timeoutMs: 120000 });
      setDataQuality(data);
    } catch (error) {
      setMessage(`Qualità dati: ${error.message}`);
    } finally {
      setDataQualityLoading(false);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    if (tab === "QUALITA" && !dataQuality && !dataQualityLoading) loadDataQuality();
  }, [tab, dataQuality, dataQualityLoading, loadDataQuality]);

  const loadNextCode = useCallback(async (dictionaryCode) => {
    const code = String(dictionaryCode || "").trim();
    if (!code || !canManage) {
      setNextCode("");
      return "";
    }
    try {
      const data = await fmedFetchJson(`/core/dizionari/prossimo-codice/${encodeURIComponent(code)}`, { apiBaseUrl, retries: 2 });
      const generated = String(data?.prossimo_codice || "");
      setNextCode(generated);
      return generated;
    } catch {
      setNextCode("Generato al salvataggio");
      return "";
    }
  }, [apiBaseUrl, canManage]);

  useEffect(() => {
    if (tab === "DIZIONARI") loadNextCode(selected);
  }, [selected, tab, loadNextCode]);

  const current = useMemo(() => catalogo.find(x => x.codice === selected) || catalogo[0], [catalogo, selected]);
  const totalValues = useMemo(() => catalogo.reduce((sum, item) => sum + (item.valori?.length || 0), 0), [catalogo]);
  const activeValues = useMemo(() => catalogo.reduce((sum, item) => sum + (item.valori || []).filter(v => v.attivo !== false).length, 0), [catalogo]);
  const pendingValues = useMemo(() => catalogo.reduce((sum, item) => sum + (item.valori || []).filter(v => String(v.stato_governance || "").toUpperCase() === "RICHIESTA_APPROVAZIONE").length, 0), [catalogo]);
  const filteredCatalog = useMemo(() => {
    const q = normalizeText(dictionarySearch);
    if (!q) return catalogo;
    return catalogo.filter(d => normalizeText(`${d.descrizione} ${d.codice}`).includes(q));
  }, [catalogo, dictionarySearch]);
  const filteredValues = useMemo(() => {
    const q = normalizeText(valueSearch);
    return (
    <section className="core-cataloghi-page">
      <header className="core-cataloghi-header">
        <FmedModuleIcon module="Dizionari" />
        <div>
          <span>CATALOGO CANONICO GLOBALE</span>
          <h2>Dizionari FMED</h2>
          <p>Gestione centralizzata dei valori utilizzati nei moduli FMED.</p>
        </div>
        <button type="button" className="core-primary-button" onClick={load} disabled={loading}>
          {loading ? "Sincronizzazione..." : "Sincronizza dati"}
        </button>
      </header>

      <DizionariControls
        tab={tab}
        onTabChange={(nextTab) => { setTab(nextTab); setValueSearch(""); }}
        dictionarySearch={dictionarySearch}
        onDictionarySearchChange={setDictionarySearch}
        valueSearch={valueSearch}
        onValueSearchChange={setValueSearch}
        showInactive={showInactive}
        onShowInactiveChange={setShowInactive}
      />

      {tab === "DIZIONARI" && (
        <div className="core-cataloghi-layout">
          <aside>
            {filteredCatalog.map(d => (
              <button
                key={d.codice}
                type="button"
                onClick={() => setSelected(d.codice)}
              >
                {d.descrizione}
              </button>
            ))}
          </aside>

          <main>
            <h3>{current?.descrizione || "Dizionario"}</h3>
            {filteredValues.map(v => (
              <div key={v.id}>
                <strong>{v.etichetta}</strong>
              </div>
            ))}
          </main>
        </div>
      )}

      {tab === "REGOLE" && <OperationalRulesPanel audit={operationalRules} catalog={catalogo} search={valueSearch} />}

      {tab === "QUALITA" && (
        <DataQualityPanel
          audit={dataQuality}
          loading={dataQualityLoading}
          onRefresh={loadDataQuality}
        />
      )}
    </section>
  );
}