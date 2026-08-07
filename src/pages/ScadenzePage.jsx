import ScadenzeControls from "../components/scadenze/ScadenzeControls";
import FmedIcon from "../components/ui/FmedIcon.jsx";

export default function ScadenzePage(props) {
  const {
    scadenzeVisualizzate = [],
    scadenzeConStatoBase = [],
    scadenzeSelezionateVisualizzate = [],
    scadenzeElencoAperto,
    setScadenzeElencoAperto = () => {},
    scadenzeRenderizzate = [],
    chiaveScadenzaExport = (row) => String(row?.id || row?.codice_strumento || row?.codicestrumento || ''),
    scadenzeSelezionateExport = [],
    statoScadenza = () => ({ codice: 'NON_DISPONIBILE', testo: 'Da verificare', colore: '#7d8da3', giorni: null }),
    toggleScadenzaExport = () => {},
    chiudiScadenzaSingolaComeSostituita = () => {},
    apriSchedaDaCodice = () => {},
    normalizzaSocietaDitta = (value) => value || '-',
    formattaData = (value) => value || '-',
    setScadenzeRenderLimit = () => {},
    FMED_RENDER_BATCH_SCADENZE
  } = props || {};

  // I KPI devono seguire esattamente il perimetro filtrato visibile.
  const scadenzeScaduteNelPerimetro = scadenzeVisualizzate.filter((row) => row?._statoScadenza?.codice === "SCADUTA");
  const scadenzeImminentiNelPerimetro = scadenzeVisualizzate.filter((row) => row?._statoScadenza?.codice === "30_GIORNI");
  const daPianificare = scadenzeVisualizzate.filter((row) => row?._statoScadenza?.codice === "DA_PIANIFICARE");

  const moduleLabel = (value) => ({ ASSET: "Asset", INFRASTRUTTURE: "Infrastrutture", SICUREZZA_81_08: "Sicurezza 81/08" })[String(value || "").toUpperCase()] || String(value || "Altro").replaceAll("_", " ");
  const isCollaudo = (row) => /COLLAUDO/i.test([row?.famiglia_codice, row?.famiglia_label, row?.attivita, row?.attivita_originale].filter(Boolean).join(" "));
  const metrics = [
    ["Nel perimetro", scadenzeVisualizzate.length, "calendar"],
    ["Scadute", scadenzeScaduteNelPerimetro.length, "alert"],
    ["Entro 30 giorni", scadenzeImminentiNelPerimetro.length, "clock"],
    ["Da pianificare", daPianificare.length, "plus"],
    ["Selezionate", scadenzeSelezionateVisualizzate.length, "check"]
  ];

  /* SCADENZE EXPORT EXCEL START */
  const esportaAgendaScadenzeExcel = () => {
    const righe = Array.isArray(scadenzeSelezionateVisualizzate)
      ? scadenzeSelezionateVisualizzate
      : [];

    if (!righe.length) {
      window.alert("SELEZIONA ALMENO UNA SCADENZA DA ESPORTARE.");
      return;
    }

    const valore = (input) => {
      if (input === null || input === undefined) return "";
      return String(input)
        .replaceAll('"', '""')
        .replace(/\r?\n|\r/g, " ")
        .trim();
    };

    const cella = (input) => `"${valore(input)}"`;

    const intestazioni = [
      "MODULO",
      "ELEMENTO",
      "SEDE",
      "CONTESTO",
      "TIPOLOGIA",
      "ATTIVITÀ",
      "DITTA / ENTE",
      "ULTIMO INTERVENTO",
      "PROSSIMA SCADENZA",
      "STATO"
    ];

    const righeCsv = righe.map((row) => {
      const elemento =
        row.codice_strumento ||
        row.codicestrumento ||
        row.entita_chiave ||
        row.codice ||
        "";

      const contesto =
        row.locazione ||
        row.reparto ||
        row.categoria ||
        row.branca ||
        "";

      const statoOperativo = row?._statoScadenza || statoScadenza?.(
        row?._dataScadenza || row?.data_prossimo_intervento || row?.prossima_scadenza || row?.data_scadenza
      );
      const stato =
        statoOperativo?.testo ||
        statoOperativo?.codice ||
        row.stato_scadenza ||
        row.stato ||
        "";

      return [
        row.modulo || "",
        elemento,
        row.sede || "",
        contesto,
        row.tipologia || "",
        row.attivita || "",
        row.ditta_esecutrice || row.ditta || "",
        row._dataUltimoIntervento || row.data_ultimo_intervento || "",
        row._dataScadenza || row.data_prossimo_intervento || row.prossima_scadenza || row.data_scadenza || "",
        stato
      ].map(cella).join(";");
    });

    const contenuto = [
      intestazioni.map(cella).join(";"),
      ...righeCsv
    ].join("\r\n");

    const blob = new Blob(
      ["\uFEFF" + contenuto],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const data = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `FMED_SCADENZE_${data}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };
  /* SCADENZE EXPORT EXCEL END */

  return (
    <main className="p0-operations p0-operations--deadline">
      <header className="p0-operations__head">
        <div className="p0-operations__identity">
          <span className="p0-operations__icon"><FmedIcon name="calendar" /></span>
          <div><span>Controllo temporale</span><h1>Scadenze</h1><p>Un’unica agenda per capire cosa è urgente, cosa arriva e cosa deve essere pianificato.</p></div>
        </div>
        <div className="p0-operations__metric"><strong>{scadenzeScaduteNelPerimetro.length}</strong><span>scadenze da recuperare</span></div>
      </header>

      <ScadenzeControls {...props} />

      <section className="p0-metric-strip p0-metric-strip--five" aria-label="Sintesi scadenze">
        {metrics.map(([label, value, icon]) => <article key={label}><span className="p0-metric-strip__icon"><FmedIcon name={icon} /></span><div><small>{label}</small><strong>{value}</strong></div></article>)}
      </section>

      {scadenzeElencoAperto && (
        <section className="p0-register">
          <header><div><span className="p0-kicker">Agenda filtrata</span><h2>{scadenzeVisualizzate.length} scadenze</h2><p>Seleziona le righe da esportare o gestire.</p></div><button className="p0-btn p0-btn--quiet" onClick={() => setScadenzeElencoAperto(false)}>Chiudi</button></header>
          {/* SCADENZE AGENDA ACTIONS START */}
          <div className="p0-register-agenda-actions" role="toolbar" aria-label="Azioni agenda scadenze">
            <button
              type="button"
              className="p0-btn p0-register-agenda-actions__select"
              onClick={() => props.selezionaTutteScadenzeVisualizzate?.()}
            >
              Seleziona visibili · {scadenzeVisualizzate.length}
            </button>

            <button
              type="button"
              className="p0-btn p0-register-agenda-actions__clear"
              onClick={() => props.deselezionaTutteScadenze?.()}
            >
              Deseleziona · {scadenzeSelezionateVisualizzate.length}
            </button>

            <button
              type="button"
              className="p0-btn p0-register-agenda-actions__pdf"
              disabled={!scadenzeSelezionateVisualizzate.length}
              onClick={() => props.esportaScadenzePdf?.()}
            >
              PDF · {scadenzeSelezionateVisualizzate.length}
            </button>
            {/* SCADENZE EXCEL BUTTON START */}
            <button
              type="button"
              className="p0-btn p0-register-agenda-actions__excel"
              disabled={!scadenzeSelezionateVisualizzate.length}
              onClick={esportaAgendaScadenzeExcel}
            >
              ESPORTA EXCEL · {scadenzeSelezionateVisualizzate.length}
            </button>
            {/* SCADENZE EXCEL BUTTON END */}
          </div>
{/* SCADENZE AGENDA ACTIONS END */}
          <div className="p0-table-wrap">
            <table>
              <thead><tr><th aria-label="Seleziona">Sel.</th><th>Elemento</th><th>Contesto</th><th>Attività</th><th>Ultima / prossima</th><th>Stato</th><th>Azione</th></tr></thead>
              <tbody>
                {scadenzeRenderizzate.map((row, index) => {
                  const key = chiaveScadenzaExport(row);
                  const selected = scadenzeSelezionateExport.includes(key);
                  const state = row?._statoScadenza || statoScadenza?.(row?._dataScadenza) || { codice: 'NON_DISPONIBILE', testo: 'Da verificare', colore: '#7d8da3', giorni: null };
                  return (
                    <tr key={key || index} className={`${selected ? "is-selected" : ""} ${state.codice === "SCADUTA" ? "is-expired" : ""}`} onClick={() => toggleScadenzaExport(row)}>
                      <td><input aria-label="Seleziona scadenza" type="checkbox" checked={selected} onChange={() => toggleScadenzaExport(row)} onClick={(e) => e.stopPropagation()} /></td>
                      <td>{row.modulo === "ASSET" ? <button className="p0-table-link" onClick={(e) => { e.stopPropagation(); apriSchedaDaCodice(row.codice_strumento || row.codicestrumento); }}>{row.codice_strumento || row.codicestrumento}</button> : <b>{row.entita_chiave || "-"}</b>}<small>{moduleLabel(row.modulo)}</small></td>
                      <td><b>{row.sede || "-"}</b><small>{row.tipologia || "-"}</small></td>
                      <td><b>{row.attivita || "-"}</b><small>{normalizzaSocietaDitta(row.ditta_esecutrice || row.ditta || "")}</small>{isCollaudo(row) && <span className="p0-tag">Storico protetto</span>}</td>
                      <td><span>{formattaData(row._dataUltimoIntervento || row.data_ultimo_intervento)}</span><small>Prossima: {formattaData(row._dataScadenza || row.data_prossimo_intervento || row.prossima_scadenza || row.data_scadenza)}</small></td>
                      <td><span className={`p0-state p0-state--${String(state.codice || "").toLowerCase()}`}><i style={{ background: state.colore }} />{state.testo}</span><small>{state.giorni == null ? "" : `${state.giorni} giorni`}</small></td>
                      <td onClick={(e) => e.stopPropagation()}>{state.codice === "DA_PIANIFICARE" && typeof chiudiScadenzaSingolaComeSostituita === "function" ? <button className="p0-btn p0-btn--small" onClick={() => chiudiScadenzaSingolaComeSostituita(row)}>Non applicabile</button> : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {scadenzeVisualizzate.length > scadenzeRenderizzate.length && <button className="p0-btn p0-register__more" onClick={() => setScadenzeRenderLimit((v) => v + FMED_RENDER_BATCH_SCADENZE)}>Mostra altre · {scadenzeRenderizzate.length}/{scadenzeVisualizzate.length}</button>}
        </section>
      )}
    </main>
  );
}
