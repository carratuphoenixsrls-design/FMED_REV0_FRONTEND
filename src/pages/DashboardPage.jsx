import { useCallback, useEffect, useMemo, useState } from "react";
import FmedModuleIcon from "../components/FmedModuleIcon.jsx";
import FmedIcon from "../components/ui/FmedIcon.jsx";
import { fmedAuthHeaders, fmedFetchJson } from "../fmedApiClient.js";

const DASHBOARD_CACHE_KEY = "fmed_dashboard_operativa_v2";
const DASHBOARD_CACHE_TTL_MS = 120000;

function formatInteger(value) {
  return Number(value || 0).toLocaleString("it-IT");
}

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("it-IT");
}

function humanize(value) {
  return String(value || "-")
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}

function deadlineCode(row) {
  return String(row?._statoScadenza?.codice || row?.stato_operativo || row?.stato_scadenza || row?.stato || "").toUpperCase();
}

function deadlineDate(row) {
  return row?._dataScadenza || row?.data_prossimo_intervento || row?.prossima_scadenza || row?.data_scadenza || null;
}

function deadlineTitle(row) {
  return row?.attivita || row?.famiglia_label || row?.famiglia_codice || row?.tipologia || row?.entita_chiave || "Scadenza FMED";
}

function deadlineReference(row) {
  return row?.codice_strumento || row?.codicestrumento || row?.entita_chiave || row?.codice || "-";
}

function metricValue(value, ready) {
  return ready ? formatInteger(value) : "…";
}

function rowsFromPayload(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.risultato)) return payload.risultato;
  if (Array.isArray(payload?.cicli_attivi)) return payload.cicli_attivi;
  return [];
}

function flagTrue(value) {
  return ["1", "TRUE", "SI", "SÌ", "YES", "ON"].includes(String(value ?? "").trim().toUpperCase());
}

function isTechnicalActiveAsset(row) {
  const category = String(row?.categoria ?? row?.Categoria ?? row?.CATEGORIA ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();
  if (category === "A" || category === "S" || category.includes("ARREDO")) return false;
  if (flagTrue(row?.dismesso) || flagTrue(row?.strumento_non_in_uso)) return false;
  return Boolean(String(row?.codicestrumento || row?.codice_strumento || "").trim());
}

function classifyDeadline(row) {
  const explicit = deadlineCode(row);
  if (["SCADUTA", "30_GIORNI", "60_GIORNI", "DA_PIANIFICARE", "REGOLARE"].includes(explicit)) return explicit;

  const rawDate = deadlineDate(row);
  if (!rawDate) return "DA_PIANIFICARE";

  const text = String(rawDate).trim();
  const isoDay = /^\d{4}-\d{2}-\d{2}/.test(text) ? text.slice(0, 10) : "";
  const due = isoDay ? new Date(`${isoDay}T12:00:00`) : new Date(text);
  if (Number.isNaN(due.getTime())) return "DA_PIANIFICARE";

  const today = new Date();
  today.setHours(12, 0, 0, 0);
  due.setHours(12, 0, 0, 0);
  const days = Math.round((due.getTime() - today.getTime()) / 86400000);
  if (days < 0) return "SCADUTA";
  if (days <= 30) return "30_GIORNI";
  if (days <= 60) return "60_GIORNI";
  return "REGOLARE";
}

function buildFallbackSummary(assetPayload, cyclePayload) {
  const assetRows = rowsFromPayload(assetPayload);
  const cycleRows = rowsFromPayload(cyclePayload).map((row) => {
    const codice = classifyDeadline(row);
    return {
      ...row,
      _dataScadenza: deadlineDate(row),
      _statoScadenza: {
        ...(row?._statoScadenza || {}),
        codice,
      },
    };
  });

  const activeAssets = assetRows.filter(isTechnicalActiveAsset);
  const documentedAssets = activeAssets.filter((row) => String(row?.link_documento || row?.link_sharepoint || "").trim());
  const counts = { SCADUTA: 0, "30_GIORNI": 0, "60_GIORNI": 0, DA_PIANIFICARE: 0, REGOLARE: 0 };
  cycleRows.forEach((row) => {
    const code = classifyDeadline(row);
    if (Object.prototype.hasOwnProperty.call(counts, code)) counts[code] += 1;
  });

  const priorities = cycleRows
    .filter((row) => ["SCADUTA", "30_GIORNI"].includes(classifyDeadline(row)))
    .sort((a, b) => {
      const da = new Date(deadlineDate(a) || "9999-12-31").getTime();
      const db = new Date(deadlineDate(b) || "9999-12-31").getTime();
      return da - db;
    });

  return {
    status: "ok",
    source: "FMED_FRONTEND_FALLBACK",
    cicli_monitorati: cycleRows.length,
    scadute: counts.SCADUTA,
    entro_30_giorni: counts["30_GIORNI"],
    entro_60_giorni: counts["60_GIORNI"],
    da_pianificare: counts.DA_PIANIFICARE,
    programmate: counts.REGOLARE,
    priorita: priorities,
    asset_tecnici_attivi: activeAssets.length,
    asset_tecnici_documentati: documentedAssets.length,
    copertura_documentale_pct: activeAssets.length
      ? Math.round((documentedAssets.length / activeAssets.length) * 100)
      : 0,
  };
}

function readCachedSummary() {
  try {
    const raw = sessionStorage.getItem(DASHBOARD_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.data || Date.now() - Number(parsed?.savedAt || 0) > DASHBOARD_CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCachedSummary(data) {
  try {
    sessionStorage.setItem(DASHBOARD_CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // La cache è solo un'accelerazione: nessun errore deve bloccare la Dashboard.
  }
}

function KpiCard({ label, value, detail, tone, icon, onClick }) {
  return (
    <button type="button" className={`fmed-dashboard-kpi fmed-dashboard-kpi-${tone}`} onClick={onClick}>
      <span className="fmed-dashboard-kpi-icon" aria-hidden="true">{icon}</span>
      <span className="fmed-dashboard-kpi-copy">
        <strong>{value}</strong>
        <small>{label}</small>
        <em>{detail}</em>
      </span>
    </button>
  );
}

export default function DashboardPage({
  apiBaseUrl,
  setNuovoInterventoOpen,
  setFiltroScadenze,
  setPagina,
  setImpostazioniTab,
  avviaProcessoGuidatoFmed,
}) {
  const [summary, setSummary] = useState(() => readCachedSummary());
  const [processRows, setProcessRows] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [processLoading, setProcessLoading] = useState(true);
  const [summaryError, setSummaryError] = useState("");
  const [processError, setProcessError] = useState("");

  const loadFallbackSummary = useCallback(async (force = false) => {
    const stamp = force ? `&_=${Date.now()}` : "";
    const cycleStamp = force ? `?_=${Date.now()}` : "";
    const [assets, cycles] = await Promise.all([
      fmedFetchJson(`/censimento?limit=5000${stamp}`, {
        apiBaseUrl,
        headers: fmedAuthHeaders(),
        timeoutMs: 90000,
        retries: 1,
      }),
      fmedFetchJson(`/cicli-unificati/attivi${cycleStamp}`, {
        apiBaseUrl,
        headers: fmedAuthHeaders(),
        timeoutMs: 90000,
        retries: 1,
      }),
    ]);
    return buildFallbackSummary(assets, cycles);
  }, [apiBaseUrl]);

  const loadSummary = useCallback(async (force = false) => {
    setSummaryLoading(true);
    setSummaryError("");
    try {
      const endpoint = force
        ? `/dashboard-operativa?force=true&_=${Date.now()}`
        : "/dashboard-operativa";
      const data = await fmedFetchJson(endpoint, {
        apiBaseUrl,
        headers: fmedAuthHeaders(),
        timeoutMs: 15000,
        retries: 0,
      });
      if (!data || data?.status !== "ok") {
        throw new Error("Riepilogo operativo non disponibile");
      }
      setSummary(data);
      writeCachedSummary(data);
    } catch (primaryError) {
      try {
        const fallback = await loadFallbackSummary(force);
        setSummary(fallback);
        writeCachedSummary(fallback);
        setSummaryError("");
      } catch (fallbackError) {
        setSummaryError(
          fallbackError?.message || primaryError?.message || "Riepilogo operativo non raggiungibile"
        );
      }
    } finally {
      setSummaryLoading(false);
    }
  }, [apiBaseUrl, loadFallbackSummary]);

  const loadProcesses = useCallback(async (force = false) => {
    setProcessLoading(true);
    setProcessError("");
    try {
      const endpoint = `/process-engine/riepilogo?limit=300&include_storico=false${force ? `&_=${Date.now()}` : ""}`;
      const data = await fmedFetchJson(endpoint, {
        apiBaseUrl,
        headers: fmedAuthHeaders(),
        timeoutMs: 90000,
        retries: 1,
      });
      const rows = Array.isArray(data?.processi) ? data.processi : [];
      setProcessRows(rows.map((row) => ({
        ...row,
        tipo: "PROCESSO",
        titolo: row?.titolo || row?.attivita || row?.processo || "Processo FMED",
        riferimento: row?.riferimento_id || row?.id || "-",
        modulo_label: row?.modulo || row?.riferimento_modulo || "Processi",
        sede: row?.sede || row?.dati?.sede || "-",
        responsabile: row?.responsabile || row?.assegnato_a || "",
        in_ritardo: Boolean(row?.sla?.in_ritardo),
      })));
    } catch (requestError) {
      setProcessRows([]);
      setProcessError(requestError?.message || "Processi non raggiungibili");
    } finally {
      setProcessLoading(false);
    }
  }, [apiBaseUrl]);

  const refreshDashboard = useCallback(async (force = false) => {
    await Promise.allSettled([loadSummary(force), loadProcesses(force)]);
  }, [loadSummary, loadProcesses]);

  useEffect(() => {
    refreshDashboard(false);
  }, [refreshDashboard]);

  const processiOperativi = useMemo(
    () => processRows.filter((row) => !["COMPLETATO", "ANNULLATO", "ERRORE"].includes(String(row?.stato || "").toUpperCase())),
    [processRows]
  );

  const processiInRitardo = useMemo(
    () => processiOperativi.filter((row) => row.in_ritardo),
    [processiOperativi]
  );

  const processiDaApprovare = useMemo(
    () => processiOperativi.filter((row) => ["DA_RICHIEDERE", "DA_APPROVARE"].includes(String(row?.approvazione_stato || "").toUpperCase())),
    [processiOperativi]
  );

  const prioritaScadenze = useMemo(() => {
    const rows = Array.isArray(summary?.priorita) ? [...summary.priorita] : [];
    rows.sort((a, b) => {
      const da = new Date(deadlineDate(a) || "9999-12-31").getTime();
      const db = new Date(deadlineDate(b) || "9999-12-31").getTime();
      return da - db;
    });
    return rows;
  }, [summary]);

  const summaryReady = Boolean(summary);
  const processReady = !processLoading;
  const loading = summaryLoading || processLoading;
  const errors = [summaryError, processError].filter(Boolean);

  const navigateDeadline = (status = "TUTTE") => {
    setFiltroScadenze(status);
    setPagina("Scadenze");
  };

  const quickActions = [
    { label: "Registra intervento", action: () => setNuovoInterventoOpen(true), module: "Interventi" },
    { label: "Nuovo asset", action: () => avviaProcessoGuidatoFmed("NUOVO_ASSET"), module: "NuovoAsset" },
    { label: "Cerca asset", action: () => setPagina("Asset"), module: "Asset" },
    { label: "Scadenze", action: () => navigateDeadline("TUTTE"), module: "Scadenze" },
    { label: "Infrastrutture", action: () => setPagina("Infrastrutture"), module: "Infrastrutture" },
    { label: "Sicurezza 81/08", action: () => setPagina("Sicurezza 81/08"), module: "Sicurezza" },
  ];

  const internalScrollStyle = {
    flex: "1 1 auto",
    minHeight: 0,
    maxHeight: "34vh",
    overflowY: "auto",
    overflowX: "hidden",
    overscrollBehavior: "contain",
    scrollbarGutter: "stable",
  };

  return (
    <div className="fmed-dashboard-page fmed-dashboard-dashboard fmed-operational-dashboard" data-fmed-dashboard="REV0">
      <style>{`
        .fmed-dashboard-page .fmed-dashboard-priority-list.fmed-dashboard-scroll-list {
          scrollbar-width: thin !important;
          scrollbar-color: #9eb3c4 transparent !important;
        }
        .fmed-dashboard-page .fmed-dashboard-priority-list.fmed-dashboard-scroll-list::-webkit-scrollbar {
          display: block !important;
          width: 8px !important;
          height: 8px !important;
        }
        .fmed-dashboard-page .fmed-dashboard-priority-list.fmed-dashboard-scroll-list::-webkit-scrollbar-thumb {
          background: #9eb3c4 !important;
          border-radius: 999px !important;
        }
        .fmed-dashboard-page .fmed-dashboard-priority-list.fmed-dashboard-scroll-list::-webkit-scrollbar-track {
          background: transparent !important;
        }
      `}</style>

      <header className="fmed-dashboard-header fmed-operational-header">
        <div className="fmed-dashboard-title">
          <FmedModuleIcon module="Dashboard" className="fmed-dashboard-title-icon" />
          <div>
            <h2>FMED operativo</h2>
            <p>Priorità, scadenze e attività operative di oggi</p>
          </div>
        </div>
        <div className="fmed-dashboard-header-actions">
          <span className="fmed-dashboard-live" role="status" aria-live="polite">
            <i /> {loading ? "Aggiornamento in corso…" : errors.length ? "Dati parziali" : "Dati operativi pronti"}
          </span>
          <button type="button" className="fmed-dashboard-button-secondary" disabled={loading} onClick={() => refreshDashboard(true)}>Aggiorna</button>
          <button type="button" className="fmed-dashboard-button-primary" onClick={() => setPagina("Export")}>Analisi e report</button>
        </div>
      </header>

      {errors.length > 0 && (
        <div className="fmed-dashboard-warning">
          <strong>Aggiornamento parziale.</strong>{" "}
          <span>{errors.join(" · ")}</span>
        </div>
      )}

      <section className="fmed-operational-automation-strip">
        <div>
          <strong>Automazioni attive</strong>{" "}
          <span>KPI e priorità usano le fonti operative FMED; il riepilogo leggero viene preferito quando disponibile.</span>
        </div>
        <button type="button" onClick={() => { setImpostazioniTab?.("STRUMENTI"); setPagina("Gestione Utenti"); }}>Strumenti</button>
      </section>

      <section className="fmed-dashboard-quick-actions fmed-operational-quick-actions">
        {quickActions.map((item) => (
          <button type="button" key={item.label} onClick={item.action}>
            <i><FmedModuleIcon module={item.module} size={18} /></i>
            <span>{item.label}</span>
          </button>
        ))}
      </section>

      <section className="fmed-operational-section-head">
        <div><h3>Da fare ora</h3><p>Apri un indicatore per entrare direttamente nel modulo già filtrato.</p></div>
      </section>

      <section className="fmed-dashboard-kpi-grid fmed-operational-kpi-grid">
        <KpiCard
          label="Scadenze scadute"
          value={metricValue(summary?.scadute, summaryReady)}
          detail="Richiedono verifica"
          tone="danger"
          icon={<FmedIcon name="alert" size={20} />}
          onClick={() => navigateDeadline("SCADUTA")}
        />
        <KpiCard
          label="Entro 30 giorni"
          value={metricValue(summary?.entro_30_giorni, summaryReady)}
          detail="Da organizzare"
          tone="warning"
          icon={<FmedIcon name="calendar" size={20} />}
          onClick={() => navigateDeadline("30_GIORNI")}
        />
        <KpiCard
          label="Processi in ritardo"
          value={metricValue(processiInRitardo.length, processReady)}
          detail="Solo processi ancora aperti"
          tone="danger"
          icon={<FmedIcon name="workflow" size={20} />}
          onClick={() => setPagina("Processi")}
        />
        <KpiCard
          label="Da approvare"
          value={metricValue(processiDaApprovare.length, processReady)}
          detail="Solo processi aperti"
          tone="warning"
          icon={<FmedIcon name="check" size={20} />}
          onClick={() => setPagina("Processi")}
        />
        <KpiCard
          label="Da pianificare"
          value={metricValue(summary?.da_pianificare, summaryReady)}
          detail="Manca la prossima data"
          tone="secondary"
          icon={<FmedIcon name="clock" size={20} />}
          onClick={() => navigateDeadline("DA_PIANIFICARE")}
        />
        <KpiCard
          label="Asset tecnici attivi"
          value={metricValue(summary?.asset_tecnici_attivi, summaryReady)}
          detail={summaryReady ? `${Number(summary?.copertura_documentale_pct || 0).toLocaleString("it-IT")}% documentati` : "Calcolo in corso"}
          tone="success"
          icon={<FmedIcon name="box" size={20} />}
          onClick={() => setPagina("Asset")}
        />
      </section>

      <div className="fmed-operational-operational-grid">
        <section className="fmed-dashboard-panel">
          <div className="fmed-dashboard-panel-header">
            <div><h3>Priorità</h3><p>Scadute e prossime scadenze entro 30 giorni</p></div>
            <button type="button" onClick={() => navigateDeadline("TUTTE")}>Apri tutte</button>
          </div>
          <div className="fmed-dashboard-priority-list fmed-dashboard-scroll-list" style={internalScrollStyle}>
            {prioritaScadenze.map((row, index) => {
              const code = classifyDeadline(row);
              return (
                <button
                  type="button"
                  key={`deadline-${deadlineReference(row)}-${deadlineDate(row) || index}-${index}`}
                  onClick={() => navigateDeadline(code === "SCADUTA" ? "SCADUTA" : "30_GIORNI")}
                >
                  <span className={`fmed-dashboard-state-dot ${code === "SCADUTA" ? "danger" : "warning"}`} />
                  <span>
                    <strong>{deadlineTitle(row)}</strong>
                    <small>{deadlineReference(row)} · {row?.sede || "Sede non indicata"}</small>
                  </span>
                  <em>{formatDate(deadlineDate(row))}</em>
                </button>
              );
            })}
            {summaryReady && !prioritaScadenze.length && <div className="fmed-dashboard-empty">Nessuna priorità critica.</div>}
            {!summaryReady && <div className="fmed-dashboard-empty">Caricamento priorità…</div>}
          </div>
        </section>

        <section className="fmed-dashboard-panel">
          <div className="fmed-dashboard-panel-header">
            <div><h3>Attività aperte</h3><p>Solo processi che richiedono ancora lavoro</p></div>
            <button type="button" onClick={() => setPagina("Processi")}>Gestisci</button>
          </div>
          <div className="fmed-dashboard-priority-list fmed-dashboard-scroll-list" style={internalScrollStyle}>
            {processiOperativi.map((row) => (
              <button type="button" key={`process-${row.id}`} onClick={() => setPagina("Processi")}>
                <span className={`fmed-dashboard-state-dot ${row.in_ritardo ? "danger" : "warning"}`} />
                <span>
                  <strong>{row.titolo}</strong>
                  <small>{row.sede} · {row.responsabile || "Da assegnare"}</small>
                </span>
                <em>{humanize(row.stato)}</em>
              </button>
            ))}
            {processReady && !processiOperativi.length && <div className="fmed-dashboard-empty">Nessuna attività aperta.</div>}
            {!processReady && <div className="fmed-dashboard-empty">Caricamento attività…</div>}
          </div>
        </section>
      </div>
    </div>
  );
}
