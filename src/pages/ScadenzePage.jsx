import ScadenzeControls from "../components/scadenze/ScadenzeControls";
import ScadenzeHero from "../components/scadenze/ScadenzeHero";
import FmedIcon from "../components/ui/FmedIcon.jsx";

export default function ScadenzePage(props) {
  const {
    scadenzeVisualizzate,
    scadenzeConStatoBase,
    scadenzeSelezionateVisualizzate,
    scadenzeElencoAperto,
    setScadenzeElencoAperto,
    scadenzeScadute,
    scadenzeImminenti,
    scadenzeRenderizzate,
    chiaveScadenzaExport,
    scadenzeSelezionateExport,
    statoScadenza,
    toggleScadenzaExport,
    chiudiScadenzaSingolaComeSostituita,
    apriSchedaDaCodice,
    normalizzaSocietaDitta,
    formattaData,
    setScadenzeRenderLimit,
    FMED_RENDER_BATCH_SCADENZE
  } = props;

  const etichettaModulo = (modulo) => ({
    ASSET: "Asset",
    INFRASTRUTTURE: "Infrastrutture",
    SICUREZZA_81_08: "Sicurezza 81/08"
  })[String(modulo || "").toUpperCase()] || String(modulo || "Altro").replaceAll("_", " ");
  const daPianificare = scadenzeConStatoBase.filter((row) => row?._statoScadenza?.codice === "DA_PIANIFICARE");
  const isCollaudoStorico = (row) => /COLLAUDO/i.test([
  row?.famiglia_codice,
  row?.famiglia_label,
  row?.attivita,
  row?.attivita_originale].
  filter(Boolean).join(" "));

  return (
    <div className="fmed-scadenze-operative fmed-style-scadenze-page-shell">
      <ScadenzeHero
        filteredCount={scadenzeVisualizzate.length}
        totalCount={scadenzeConStatoBase.length} />
      

      <ScadenzeControls {...props} />

    <div className="fmed-operational-kpi-grid fmed-deadline-kpi-grid fmed-style-scadenze-kpi-grid" style={{

        ...{}
      }}>
      <div className="fmed-operational-kpi-card fmed-style-scadenze-kpi-card"><div className="fmed-style-scadenze-kpi-top"><span className="fmed-kpi-icon fmed-style-scadenze-kpi-icon"><FmedIcon name="calendar" /></span><span className="fmed-style-scadenze-kpi-label">Scadenze filtrate</span></div><strong className="fmed-style-scadenze-kpi-value">{scadenzeVisualizzate.length}</strong><span className="fmed-style-scadenze-kpi-hint">visualizzate</span></div>
      <div className="fmed-operational-kpi-card fmed-style-scadenze-kpi-card"><div className="fmed-style-scadenze-kpi-top"><span className="fmed-kpi-icon fmed-style-scadenze-kpi-icon"><FmedIcon name="alert" /></span><span className="fmed-style-scadenze-kpi-label">Scadute</span></div><strong style={{

            color: "#FF4D5E"
          }} className="fmed-style-scadenze-kpi-value">{scadenzeScadute.length}</strong><span className="fmed-style-scadenze-kpi-hint">da recuperare</span></div>
      <div className="fmed-operational-kpi-card fmed-style-scadenze-kpi-card"><div className="fmed-style-scadenze-kpi-top"><span className="fmed-kpi-icon fmed-style-scadenze-kpi-icon"><FmedIcon name="clock" /></span><span className="fmed-style-scadenze-kpi-label">Entro 30 giorni</span></div><strong style={{

            color: "#D99A00"
          }} className="fmed-style-scadenze-kpi-value">{scadenzeImminenti.length}</strong><span className="fmed-style-scadenze-kpi-hint">imminenti</span></div>
      <div className="fmed-operational-kpi-card fmed-style-scadenze-kpi-card"><div className="fmed-style-scadenze-kpi-top"><span className="fmed-kpi-icon fmed-style-scadenze-kpi-icon"><FmedIcon name="plus" /></span><span className="fmed-style-scadenze-kpi-label">Da pianificare</span></div><strong style={{

            color: "#8A6D1D"
          }} className="fmed-style-scadenze-kpi-value">{daPianificare.length}</strong><span className="fmed-style-scadenze-kpi-hint">senza data futura</span></div>
      <div className="fmed-operational-kpi-card fmed-style-scadenze-kpi-card"><div className="fmed-style-scadenze-kpi-top"><span className="fmed-kpi-icon fmed-style-scadenze-kpi-icon"><FmedIcon name="check" /></span><span className="fmed-style-scadenze-kpi-label">Selezionate</span></div><strong style={{

            color: "#169C8F"
          }} className="fmed-style-scadenze-kpi-value">{scadenzeSelezionateVisualizzate.length}</strong><span className="fmed-style-scadenze-kpi-hint">per azioni o PDF</span></div>
    </div>

    {scadenzeElencoAperto && <div className="fmed-operational-table-card fmed-style-scadenze-table-card" style={{

        ...{}
      }}>
        <div style={{

          ...{}
        }} className="fmed-style-scadenze-list-header">
          <div>
            <h3 className="fmed-style-scadenze-table-title">Elenco scadenze filtrate</h3>
            <p className="fmed-style-scadenze-table-subtitle">Selezionate: {scadenzeSelezionateVisualizzate.length} / {scadenzeVisualizzate.length}. Per i cicli Asset puoi cliccare sull’elemento per aprire la scheda cespite.</p>
          </div>
          <button onClick={() => setScadenzeElencoAperto(false)} className="fmed-style-scadenze-close-btn">Chiudi</button>
        </div>
        {<div className="fmed-style-scadenze-table-wrap">
            <table className="fmed-operational8-deadlines-table fmed-style-scadenze-table">
              <thead>
                <tr>
                  <th className="fmed-style-scadenze-th">Sel.</th><th className="fmed-style-scadenze-th">Modulo</th><th className="fmed-style-scadenze-th">Elemento</th><th className="fmed-style-scadenze-th">Sede</th><th className="fmed-style-scadenze-th">Ambito</th><th className="fmed-style-scadenze-th">Famiglia attività</th><th className="fmed-style-scadenze-th">Ditta / ente</th><th className="fmed-style-scadenze-th">Ultima esecuzione</th><th className="fmed-style-scadenze-th">Prossima scadenza</th><th className="fmed-style-scadenze-th">Giorni</th><th className="fmed-style-scadenze-th">Stato</th><th className="fmed-style-scadenze-th">Azione</th>
                </tr>
              </thead>
              <tbody>
                {scadenzeRenderizzate.map((s, idx) => {
                const chiave = chiaveScadenzaExport(s);
                const selezionata = scadenzeSelezionateExport.includes(chiave);
                const stato = s._statoScadenza || statoScadenza(s._dataScadenza);
                return <tr key={chiave || idx} className={[`${selezionata ? "is-selected" : ""} ${stato.codice === "SCADUTA" ? "is-expired" : ""}`, "fmed-style-tr"].filter(Boolean).join(" ")} onClick={() => toggleScadenzaExport(s)}>
                      <td className="fmed-style-scadenze-td"><input type="checkbox" checked={selezionata} onChange={() => toggleScadenzaExport(s)} onClick={(e) => e.stopPropagation()} /></td>
                      <td className="fmed-style-scadenze-td">{etichettaModulo(s.modulo)}</td>
                      <td className={s.modulo === "ASSET" ? "fmed-style-scadenze-td-code" : "fmed-style-scadenze-td"} onClick={(e) => {
                    e.stopPropagation();
                    if (s.modulo === "ASSET") apriSchedaDaCodice(s.codice_strumento || s.codicestrumento);
                  }}>{s.codice_strumento || s.codicestrumento || s.entita_chiave || "-"}</td>
                      <td className="fmed-style-scadenze-td">{s.sede || "-"}</td>
                      <td className="fmed-style-scadenze-td">{s.tipologia || "-"}</td>
                      <td className="fmed-style-scadenze-td">
                        <span>{s.attivita}</span>
                        {isCollaudoStorico(s) && <span className="fmed-operational8-history-badge" title="Il collaudo resta conservato nello storico; viene archiviato soltanto il falso ciclo operativo">Storico protetto</span>}
                      </td>
                      <td className="fmed-style-scadenze-td">{normalizzaSocietaDitta(s.ditta_esecutrice || s.ditta || "")}</td>
                      <td className="fmed-style-scadenze-td">{formattaData(s._dataUltimoIntervento || s.data_ultimo_intervento)}</td>
                      <td className="fmed-style-scadenze-td">{formattaData(s._dataScadenza || s.data_prossimo_intervento || s.prossima_scadenza || s.data_scadenza)}</td>
                      <td className="fmed-style-scadenze-td">{stato.giorni == null ? "-" : `${stato.giorni} gg`}</td>
                      <td className="fmed-style-scadenze-td"><span style={{

                      background: stato.colore
                    }} className="fmed-style-scadenze-status-dot" />{stato.testo}</td>
                      <td onClick={(event) => event.stopPropagation()} className="fmed-style-scadenze-td">
                        {["SCADUTA", "DA_PIANIFICARE"].includes(stato.codice) && typeof chiudiScadenzaSingolaComeSostituita === "function" ? <button
                      type="button"
                      className="fmed-operational8-row-close-btn fmed-literal-fcd9f2776b"
                      onClick={() => chiudiScadenzaSingolaComeSostituita(s)}












                      title={stato.codice === "DA_PIANIFICARE" ? "Archivia il ciclo come non applicabile" : "Archivia il vecchio ciclo come chiuso e sostituito"}>
                      
                          {stato.codice === "DA_PIANIFICARE" ? "Archivia ciclo" : "Chiudi e sostituisci"}
                        </button> : <span className="fmed-literal-f76be64972">—</span>}
                      </td>
                    </tr>;
              })}
              </tbody>
            </table>
          </div>}
        {scadenzeVisualizzate.length > scadenzeRenderizzate.length && <div className="fmed-style-load-more-row">
            <button type="button" onClick={() => setScadenzeRenderLimit((v) => v + FMED_RENDER_BATCH_SCADENZE)} className="fmed-style-scadenze-secondary-action">
              Mostra altre scadenze ({scadenzeRenderizzate.length}/{scadenzeVisualizzate.length})
            </button>
          </div>}
      </div>}
  </div>);

}
