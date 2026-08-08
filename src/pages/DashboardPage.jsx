import { useCallback, useEffect, useMemo, useState } from "react";
import FmedModuleIcon from "../components/FmedModuleIcon.jsx";
import FmedIcon from "../components/ui/FmedIcon.jsx";
import { fmedAuthHeaders, fmedFetchJson } from "../fmedApiClient.js";

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

function categoryIsFurniture(row) {
  const raw = String(row?.categoria || row?.Categoria || row?.CATEGORIA || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();
  return raw === "A" || raw === "S" || raw.includes("ARREDO");
}

function deadlineCode(row) {
  return String(row?._statoScadenza?.codice || row?.stato_scadenza || row?.stato || "").toUpperCase();
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
  cespiti = [],
  statoCespite = () => "Attivo",
  scadenzeConStatoBase = [],
}) {
  const [processRows, setProcessRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProcesses = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fmedFetchJson(
        "/process-engine/riepilogo?limit=300&include_storico=false",
        {
          apiBaseUrl,
          headers: fmedAuthHeaders(),
          timeoutMs: 90000,
          retries: 1,
        }
      );
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
      setError(requestError?.message || "Processi non raggiungibili");
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    loadProcesses();
  }, [loadProcesses]);

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

  const scadenzeScadute = useMemo(
    () => scadenzeConStatoBase.filter((row) => deadlineCode(row) === "SCADUTA"),
    [scadenzeConStatoBase]
  );

  const scadenzeEntro30 = useMemo(
    () => scadenzeConStatoBase.filter((row) => deadlineCode(row) === "30_GIORNI"),
    [scadenzeConStatoBase]
  );

  const scadenzeDaPianificare = useMemo(
    () => scadenzeConStatoBase.filter((row) => deadlineCode(row) === "DA_PIANIFICARE"),
    [scadenzeConStatoBase]
  );

  const prioritaScadenze = useMemo(() => {
    const rows = [...scadenzeScadute, ...scadenzeEntro30];
    return rows.sort((a, b) => {
      const da = new Date(deadlineDate(a) || "9999-12-31").getTime();
      const db = new Date(deadlineDate(b) || "9999-12-31").getTime();
      return da - db;
    });
  }, [scadenzeScadute, scadenzeEntro30]);

  const assetTecniciAttivi = useMemo(
    () => (Array.isArray(cespiti) ? cespiti : []).filter((row) => !categoryIsFurniture(row) && statoCespite(row) === "Attivo"),
    [cespiti, statoCespite]
  );

  const coperturaDocumentale = useMemo(() => {
    if (!assetTecniciAttivi.length) return 0;
    const documentati = assetTecniciAttivi.filter((row) => String(row?.link_documento || row?.link_sharepoint || "").trim()).length;
    return Math.round((documentati / assetTecniciAttivi.length) * 100);
  }, [assetTecniciAttivi]);

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

  return (
    <div className="fmed-dashboard-page fmed-dashboard-dashboard fmed-operational-dashboard" data-fmed-dashboard="REV0">
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
            <i /> {loading ? "Aggiornamento in corso…" : "Dati operativi pronti"}
          </span>
          <button type="button" className="fmed-dashboard-button-secondary" onClick={() => window.location.reload()}>Aggiorna</button>
          <button type="button" className="fmed-dashboard-button-primary" onClick={() => setPagina("Export")}>Analisi e report</button>
        </div>
      </header>

      {error && (
        <div className="fmed-dashboard-warning">
          <strong>Processi non aggiornati.</strong>{" "}
          <span>{error}. Asset e Scadenze restano disponibili dalle rispettive fonti operative.</span>
        </div>
      )}

      <section className="fmed-operational-automation-strip">
        <div>
          <strong>Automazioni attive</strong>{" "}
          <span>I KPI usano le stesse fonti operative di Asset, Scadenze e Processi.</span>
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
          value={formatInteger(scadenzeScadute.length)}
          detail="Richiedono verifica"
          tone="danger"
          icon={<FmedIcon name="alert" size={20} />}
          onClick={() => navigateDeadline("SCADUTA")}
        />
        <KpiCard
          label="Entro 30 giorni"
          value={formatInteger(scadenzeEntro30.length)}
          detail="Da organizzare"
          tone="warning"
          icon={<FmedIcon name="calendar" size={20} />}
          onClick={() => navigateDeadline("30_GIORNI")}
        />
        <KpiCard
          label="Processi in ritardo"
          value={formatInteger(processiInRitardo.length)}
          detail="Solo processi ancora aperti"
          tone="danger"
          icon={<FmedIcon name="workflow" size={20} />}
          onClick={() => setPagina("Processi")}
        />
        <KpiCard
          label="Da approvare"
          value={formatInteger(processiDaApprovare.length)}
          detail="Solo processi aperti"
          tone="warning"
          icon={<FmedIcon name="check" size={20} />}
          onClick={() => setPagina("Processi")}
        />
        <KpiCard
          label="Da pianificare"
          value={formatInteger(scadenzeDaPianificare.length)}
          detail="Manca la prossima data"
          tone="secondary"
          icon={<FmedIcon name="clock" size={20} />}
          onClick={() => navigateDeadline("DA_PIANIFICARE")}
        />
        <KpiCard
          label="Asset tecnici attivi"
          value={formatInteger(assetTecniciAttivi.length)}
          detail={`${coperturaDocumentale.toLocaleString("it-IT")}% documentati`}
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
          <div className="fmed-dashboard-priority-list">
            {prioritaScadenze.slice(0, 7).map((row, index) => {
              const code = deadlineCode(row);
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
            {!prioritaScadenze.length && <div className="fmed-dashboard-empty">Nessuna priorità critica.</div>}
          </div>
        </section>

        <section className="fmed-dashboard-panel">
          <div className="fmed-dashboard-panel-header">
            <div><h3>Attività aperte</h3><p>Solo processi che richiedono ancora lavoro</p></div>
            <button type="button" onClick={() => setPagina("Processi")}>Gestisci</button>
          </div>
          <div className="fmed-dashboard-priority-list">
            {processiOperativi.slice(0, 7).map((row) => (
              <button type="button" key={`process-${row.id}`} onClick={() => setPagina("Processi")}>
                <span className={`fmed-dashboard-state-dot ${row.in_ritardo ? "danger" : "warning"}`} />
                <span>
                  <strong>{row.titolo}</strong>
                  <small>{row.sede} · {row.responsabile || "Da assegnare"}</small>
                </span>
                <em>{humanize(row.stato)}</em>
              </button>
            ))}
            {!processiOperativi.length && <div className="fmed-dashboard-empty">Nessuna attività aperta.</div>}
          </div>
        </section>
      </div>
    </div>
  );
}
