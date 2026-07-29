import { useCallback, useEffect, useMemo, useState } from "react";
import FmedModuleIcon from "../components/FmedModuleIcon.jsx";
import FmedIcon from "../components/ui/FmedIcon.jsx";
import { fmedAuthHeaders, fmedFetchJson } from "../fmedApiClient.js";

const EMPTY_FILTERS = {
  sede: "TUTTE",
  modulo: "TUTTI",
  stato: "TUTTI",
  priorita: "TUTTE",
  responsabile: "TUTTI",
  dal: "2023-01-01",
  al: "",
  tutto_storico: false,
};


function formatInteger(value) { return Number(value || 0).toLocaleString("it-IT"); }
function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("it-IT");
}
function humanize(value) { return String(value || "-").replaceAll("_", " ").toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase()); }
function downloadCsv(rows) {
  const safeRows = Array.isArray(rows) ? rows : [];
  const headers = ["tipo", "id", "titolo", "riferimento", "modulo_label", "sede", "stato", "priorita", "responsabile", "scadenza"];
  const escape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const content = [headers.join(";"), ...safeRows.map((row) => headers.map((key) => escape(row?.[key])).join(";"))].join("\n");
  const blob = new Blob([`\ufeff${content}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `FMED_Operativo_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url);
}
function KpiCard({ label, value, detail, tone, icon, onClick }) {
  return <button type="button" className={`fmed-dashboard-kpi fmed-dashboard-kpi-${tone}`} onClick={onClick}>
    <span className="fmed-dashboard-kpi-icon" aria-hidden="true">{icon}</span>
    <span className="fmed-dashboard-kpi-copy"><strong>{value}</strong><small>{label}</small><em>{detail}</em></span>
  </button>;
}
export default function DashboardPage({
  apiBaseUrl,
  setNuovoInterventoOpen,
  setFiltroScadenze,
  setPagina,
  setImpostazioniTab,
  avviaProcessoGuidatoFmed,
  cespiti = [],
  scadenzeConStatoBase = [],
  scadenzeImminenti = [],
  totaleSpesaDashboard = 0,
}) {
  const [filters] = useState(EMPTY_FILTERS);
  const [snapshot, setSnapshot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [drilldown, setDrilldown] = useState(null);

  const loadDashboard = useCallback(async ({ force = false } = {}) => {
    setLoading(true); setError("");
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => { if (value && !["TUTTE", "TUTTI"].includes(value)) params.set(key, value); });
      if (force) params.set("force", "true");
      const data = await fmedFetchJson(`/dashboard-operativa?${params.toString()}`, { apiBaseUrl, headers: fmedAuthHeaders(), timeoutMs: 90000, retries: 1 });
      setSnapshot(data);
    } catch (requestError) { setError(requestError?.message || "Dati non raggiungibili"); }
    finally { setLoading(false); }
  }, [apiBaseUrl, filters]);
  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  const fallbackKpi = useMemo(() => ({
    asset_totali: cespiti.length, asset_attivi: cespiti.length,
    processi_totali: 0, processi_aperti: 0, processi_in_ritardo: 0, processi_da_approvare: 0,
    scadenze_totali: scadenzeConStatoBase.length,
    scadenze_scadute: scadenzeConStatoBase.filter((row) => row?._statoScadenza?.codice === "SCADUTA").length,
    scadenze_entro_30: scadenzeImminenti.length, scadenze_da_pianificare: 0,
    infrastrutture_totali: 0, documenti_81_08: 0, non_conformita_aperte: 0,
    sla_rispettati_percentuale: 100,
    copertura_documentale_percentuale: cespiti.length ? Math.round(100 * cespiti.filter((row) => row?.link_documento || row?.link_sharepoint).length / cespiti.length) : 0,
    costi_tracciati: totaleSpesaDashboard, dizionari: 0, valori_master_attivi: 0, valori_da_approvare: 0, regole_operative: 0,
  }), [cespiti, scadenzeConStatoBase, scadenzeImminenti, totaleSpesaDashboard]);

  const kpi = snapshot?.kpi || fallbackKpi;
  const showRows = (title, rows, page) => setDrilldown({ title, rows: Array.isArray(rows) ? rows : [], page });
  const navigateDeadline = (status = "TUTTE") => { setFiltroScadenze(status); setPagina("Scadenze"); };

  const quickActions = [
    { label: "Registra intervento", action: () => setNuovoInterventoOpen(true), module: "Interventi" },
    { label: "Nuovo asset", action: () => avviaProcessoGuidatoFmed("NUOVO_ASSET"), module: "NuovoAsset" },
    { label: "Cerca asset", action: () => setPagina("Asset"), module: "Asset" },
    { label: "Scadenze", action: () => navigateDeadline("TUTTE"), module: "Scadenze" },
    { label: "Infrastrutture", action: () => setPagina("Infrastrutture"), module: "Infrastrutture" },
    { label: "Sicurezza 81/08", action: () => setPagina("Sicurezza 81/08"), module: "Sicurezza" },
  ];

  return <div className={`fmed-dashboard-page fmed-dashboard-dashboard fmed-operational-dashboard ${drilldown ? "is-workspace-open" : ""}`} data-fmed-dashboard="REV0">
    <header className="fmed-dashboard-header fmed-operational-header">
      <div className="fmed-dashboard-title"><FmedModuleIcon module="Dashboard" className="fmed-dashboard-title-icon" /><div><h2>FMED operativo</h2><p>Cosa richiede attenzione e cosa devi fare oggi</p></div></div>
      <div className="fmed-dashboard-header-actions">
        <span className="fmed-dashboard-live"><i /> {loading ? "Aggiornamento…" : "Dati aggiornati"}</span>
        <button type="button" className="fmed-dashboard-button-secondary" onClick={() => loadDashboard({ force: true })} disabled={loading}>Aggiorna</button>
        <button type="button" className="fmed-dashboard-button-primary" onClick={() => setPagina("Export")}>Analisi e report</button>
      </div>
    </header>

    {error && <div className="fmed-dashboard-warning"><strong>Non tutti i dati sono aggiornati.</strong><span>{error}. Puoi continuare a usare le funzioni disponibili e riprovare con Aggiorna.</span></div>}

    <section className="fmed-operational-automation-strip">
      <div><strong>Automazioni attive</strong><span>Scadenze, cicli, storico, codici e dashboard si aggiornano automaticamente quando registri o chiudi un’attività.</span></div>
      <button type="button" onClick={() => { setImpostazioniTab?.("STRUMENTI"); setPagina("Gestione Utenti"); }}>Strumenti</button>
    </section>

    <section className="fmed-dashboard-quick-actions fmed-operational-quick-actions">
      {quickActions.map((item) => <button type="button" key={item.label} onClick={item.action}><i><FmedModuleIcon module={item.module} size={18} /></i><span>{item.label}</span></button>)}
    </section>

    <section className="fmed-operational-section-head"><div><h3>Da fare ora</h3><p>Apri un indicatore per vedere i record reali.</p></div></section>
    <section className="fmed-dashboard-kpi-grid fmed-operational-kpi-grid">
      <KpiCard label="Scadenze scadute" value={formatInteger(kpi.scadenze_scadute)} detail="Richiedono verifica" tone="danger" icon={<FmedIcon name="alert" size={20} />} onClick={() => showRows("Scadenze scadute", (snapshot?.scadenze_operative || []).filter((row) => row.stato === "SCADUTA"), "Scadenze")} />
      <KpiCard label="Entro 30 giorni" value={formatInteger(kpi.scadenze_entro_30)} detail="Da organizzare" tone="warning" icon={<FmedIcon name="calendar" size={20} />} onClick={() => showRows("Scadenze entro 30 giorni", snapshot?.scadenze_critiche, "Scadenze")} />
      <KpiCard label="Processi in ritardo" value={formatInteger(kpi.processi_in_ritardo)} detail="Attività oltre i tempi" tone="danger" icon={<FmedIcon name="workflow" size={20} />} onClick={() => showRows("Attività in ritardo", (snapshot?.processi_operativi || []).filter((row) => row.in_ritardo), "Processi")} />
      <KpiCard label="Da approvare" value={formatInteger(kpi.processi_da_approvare)} detail="Verifiche pendenti" tone="warning" icon={<FmedIcon name="check" size={20} />} onClick={() => showRows("Approvazioni pendenti", snapshot?.approvazioni_pendenti, "Processi")} />
      <KpiCard label="Da pianificare" value={formatInteger(kpi.scadenze_da_pianificare)} detail="Manca la prossima data" tone="secondary" icon={<FmedIcon name="clock" size={20} />} onClick={() => showRows("Da pianificare", (snapshot?.scadenze_operative || []).filter((row) => row.stato === "DA_PIANIFICARE"), "Scadenze")} />
      <KpiCard label="Asset attivi" value={formatInteger(kpi.asset_attivi)} detail={`${Number(kpi.copertura_documentale_percentuale || 0).toLocaleString("it-IT")}% documentati`} tone="success" icon={<FmedIcon name="box" size={20} />} onClick={() => setPagina("Asset")} />
    </section>

    <div className="fmed-operational-operational-grid">
      <section className="fmed-dashboard-panel">
        <div className="fmed-dashboard-panel-header"><div><h3>Priorità</h3><p>Le prossime attività da controllare</p></div><button type="button" onClick={() => navigateDeadline("TUTTE")}>Apri tutte</button></div>
        <div className="fmed-dashboard-priority-list">
          {(snapshot?.scadenze_critiche || []).slice(0, 7).map((row) => <button type="button" key={`deadline-${row.id}-${row.famiglia || row.titolo}`} onClick={() => showRows("Dettaglio priorità", snapshot?.scadenze_critiche, "Scadenze")}>
            <span className={`fmed-dashboard-state-dot ${row.stato === "SCADUTA" ? "danger" : "warning"}`} />
            <span><strong>{row.titolo}</strong><small>{row.riferimento} · {row.sede}</small></span><em>{formatDate(row.scadenza)}</em>
          </button>)}
          {!(snapshot?.scadenze_critiche || []).length && <div className="fmed-dashboard-empty">Nessuna priorità critica.</div>}
        </div>
      </section>
      <section className="fmed-dashboard-panel">
        <div className="fmed-dashboard-panel-header"><div><h3>Attività aperte</h3><p>Solo quelle che richiedono ancora lavoro</p></div><button type="button" onClick={() => setPagina("Processi")}>Gestisci</button></div>
        <div className="fmed-dashboard-priority-list">
          {(snapshot?.processi_operativi || []).slice(0, 7).map((row) => <button type="button" key={`process-${row.id}`} onClick={() => showRows("Attività aperte", snapshot?.processi_operativi, "Processi")}>
            <span className={`fmed-dashboard-state-dot ${row.in_ritardo ? "danger" : "warning"}`} />
            <span><strong>{row.titolo}</strong><small>{row.sede} · {row.responsabile || "Da assegnare"}</small></span><em>{humanize(row.stato)}</em>
          </button>)}
          {!(snapshot?.processi_operativi || []).length && <div className="fmed-dashboard-empty">Nessuna attività aperta.</div>}
        </div>
      </section>
    </div>

    {drilldown && <section className="fmed-workspace-page fmed-dashboard-drilldown-page" aria-label={drilldown.title}><div className="fmed-workspace-surface fmed-dashboard-drilldown-surface"><div className="fmed-dashboard-drilldown-header"><div><h3>{drilldown.title}</h3><p>{drilldown.rows.length} record</p></div><button type="button" className="fmed-workspace-back" onClick={() => setDrilldown(null)}>Torna alla dashboard</button></div><div className="fmed-dashboard-drilldown-list">{drilldown.rows.slice(0, 100).map((row, index) => <article key={`${row.tipo}-${row.id}-${index}`}><span className={`fmed-dashboard-record-type ${row.tipo === "SCADENZA" ? "deadline" : "process"}`}>{row.tipo}</span><div><strong>{row.titolo}</strong><small>{row.riferimento} · {row.sede} · {row.modulo_label}</small></div><div className="fmed-dashboard-record-status"><b>{humanize(row.stato)}</b><small>{formatDate(row.scadenza)}</small></div></article>)}{!drilldown.rows.length && <div className="fmed-dashboard-empty">Nessun record.</div>}</div><div className="fmed-dashboard-drilldown-footer"><button type="button" className="fmed-dashboard-button-secondary" onClick={() => downloadCsv(drilldown.rows)}>Esporta</button><button type="button" className="fmed-dashboard-button-primary" onClick={() => { setPagina(drilldown.page || "Dashboard"); setDrilldown(null); }}>Apri modulo</button></div></div></section>}
  </div>;
}
