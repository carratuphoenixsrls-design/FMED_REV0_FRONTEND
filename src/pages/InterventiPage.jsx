import InterventiControls from "../components/interventi/InterventiControls";
import InterventiHero from "../components/interventi/InterventiHero";
import FmedIcon from "../components/ui/FmedIcon.jsx";

export default function InterventiPage(props) {
  const {
    interventiFiltrati,
    interventi,
    interventiIncludeStorico,
    cambiaVistaStoricoInterventi,
    formatCurrency,
    importoIntervento,
    totaleSpesaInterventiFiltrati,
    labelPeriodoContabileInterventi,
    codiciCoinvoltiInterventi,
    ditteCoinvolteInterventi,
    interventiElencoAperto,
    setInterventiElencoAperto,
    interventiFiltratiRenderizzati,
    apriSchedaDaCodice,
    normalizzaSocietaDitta,
    formattaData,
    BottoneJobReport,
    apriModificaIntervento,
    eliminaIntervento,
    setInterventiRenderLimit,
    FMED_RENDER_BATCH_INTERVENTI
  } = props;

  return (
    <div className="fmed-interventi-operativi fmed-style-interventi-page-shell">
      <InterventiHero
        filteredCount={interventiFiltrati.length}
        totalCount={interventi.length} />
      

      <div className="fmed-interventi-archive-bar fmed-literal-f62c9b066f">











        
        <div>
          <strong className="fmed-literal-7b8fa4e074">Archivio interventi</strong>
          <span className="fmed-literal-7ba2ebb4ac">
            {interventiIncludeStorico ?
            "Tutto lo storico visibile. I record precedenti al 01/01/2023 sono marcati come archivio." :
            "Attività dal 01/01/2023 a oggi. Tutti i collaudi restano sempre visibili."}
          </span>
        </div>
        <button
          type="button"
          className={interventiIncludeStorico ? "fmed-style-interventi-secondary-action" : "fmed-style-interventi-primary-action"}
          onClick={() => cambiaVistaStoricoInterventi?.(!interventiIncludeStorico)}>
          
          {interventiIncludeStorico ? "Torna alla vista operativa" : "Apri archivio storico"}
        </button>
      </div>

      <InterventiControls {...props} />

    <div style={{

        ...{}
      }} className="fmed-style-interventi-kpi-grid">
      <div className="fmed-style-interventi-kpi-card"><div className="fmed-style-interventi-kpi-top"><span className="fmed-kpi-icon fmed-style-interventi-kpi-icon"><FmedIcon name="euro" /></span><span className="fmed-style-interventi-kpi-label">Totale spesa</span></div><strong className="fmed-style-interventi-kpi-value">{formatCurrency(totaleSpesaInterventiFiltrati)}</strong><span className="fmed-style-interventi-kpi-hint">{labelPeriodoContabileInterventi()}</span></div>
      <div className="fmed-style-interventi-kpi-card"><div className="fmed-style-interventi-kpi-top"><span className="fmed-kpi-icon fmed-style-interventi-kpi-icon"><FmedIcon name="activity" /></span><span className="fmed-style-interventi-kpi-label">Interventi</span></div><strong style={{

            color: "#169C8F"
          }} className="fmed-style-interventi-kpi-value">{interventiFiltrati.length}</strong><span className="fmed-style-interventi-kpi-hint">su {interventi.length} totali</span></div>
      <div className="fmed-style-interventi-kpi-card"><div className="fmed-style-interventi-kpi-top"><span className="fmed-kpi-icon fmed-style-interventi-kpi-icon"><FmedIcon name="box" /></span><span className="fmed-style-interventi-kpi-label">Cespiti</span></div><strong style={{

            color: "#2FD37D"
          }} className="fmed-style-interventi-kpi-value">{codiciCoinvoltiInterventi.size}</strong><span className="fmed-style-interventi-kpi-hint">coinvolti</span></div>
      <div className="fmed-style-interventi-kpi-card"><div className="fmed-style-interventi-kpi-top"><span className="fmed-kpi-icon fmed-style-interventi-kpi-icon"><FmedIcon name="users" /></span><span className="fmed-style-interventi-kpi-label">Ditte/Società</span></div><strong style={{

            color: "#D99A00"
          }} className="fmed-style-interventi-kpi-value">{ditteCoinvolteInterventi.size}</strong><span className="fmed-style-interventi-kpi-hint">coinvolte</span></div>
    </div>

    {interventiElencoAperto && <div style={{

        ...{}
      }} className="fmed-style-interventi-table-card">
        <div style={{

          ...{}
        }} className="fmed-style-interventi-list-header">
          <div>
            <h3 className="fmed-style-interventi-table-title">Elenco interventi filtrati</h3>
            <p className="fmed-style-interventi-table-subtitle">{interventiFiltrati.length} risultati su {interventi.length}. Clicca il codice per aprire la scheda cespite.</p>
          </div>
          <button onClick={() => setInterventiElencoAperto(false)} className="fmed-style-interventi-close-btn">Chiudi</button>
        </div>
        {<div className="fmed-interventi-table-wrap fmed-style-interventi-table-wrap">
            <table className="fmed-interventi-table fmed-style-interventi-table">
              <thead>
                <tr>
                  <th className="fmed-style-interventi-th">Codice</th><th className="fmed-style-interventi-th">Sede</th><th className="fmed-style-interventi-th">Ditta esecutrice</th><th className="fmed-style-interventi-th">Tipologia</th><th className="fmed-style-interventi-th">Attività</th><th className="fmed-style-interventi-th">Ultimo</th><th className="fmed-style-interventi-th">Prossimo</th><th className="fmed-style-interventi-th">Costo</th><th className="fmed-style-interventi-th">Documento</th><th className="fmed-style-interventi-th">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {interventiFiltratiRenderizzati.map((i, idx) => <tr key={i.id_intervento || idx} className="fmed-style-interventi-tr">
                    <td onClick={() => apriSchedaDaCodice(i.codice_strumento || i.codicestrumento)} title="Apri scheda cespite" className="fmed-style-interventi-td-code">{i.codice_strumento || i.codicestrumento}</td>
                    <td className="fmed-style-interventi-td">{i.sede}</td>
                    <td className="fmed-style-interventi-td">{normalizzaSocietaDitta(i.ditta_esecutrice || i.ditta)}</td>
                    <td className="fmed-style-interventi-td">{i.tipologia}</td>
                    <td className="fmed-style-interventi-td">
                      <div>{i.attivita}</div>
                      {i._eccezione_collaudo && <small className="fmed-literal-cbdc22081e">Collaudo sempre conservato</small>}
                      {i._archivio_storico && <small className="fmed-literal-cd264f0832">Archivio pre-2023</small>}
                    </td>
                    <td className="fmed-style-interventi-td">{formattaData(i.data_ultimo_intervento)}</td>
                    <td className="fmed-style-interventi-td">{formattaData(i.data_prossimo_intervento)}</td>
                    <td className="fmed-style-interventi-td">{formatCurrency(importoIntervento(i))}</td>
                    <td className="fmed-style-interventi-td"><BottoneJobReport intervento={i} /></td>
                    <td className="fmed-style-interventi-td">
                      <div className="fmed-row-action-bar is-two-actions fmed-style-row-action-group">
                        <button type="button" className="fmed-icon-action fmed-style-action-btn-edit" onClick={() => apriModificaIntervento(i)} aria-label="Modifica intervento" title="Modifica intervento"><FmedIcon name="edit" /></button>
                        <button type="button" className="fmed-icon-action is-danger fmed-style-action-btn-delete" onClick={() => eliminaIntervento(i)} aria-label="Elimina intervento" title="Elimina intervento"><FmedIcon name="trash" /></button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
        {interventiFiltrati.length > interventiFiltratiRenderizzati.length && <div className="fmed-style-load-more-row">
            <button type="button" onClick={() => setInterventiRenderLimit((v) => v + FMED_RENDER_BATCH_INTERVENTI)} className="fmed-style-interventi-secondary-action">
              Mostra altri interventi ({interventiFiltratiRenderizzati.length}/{interventiFiltrati.length})
            </button>
          </div>}
      </div>}
  </div>);

}
