import FmedModuleIcon from "../components/FmedModuleIcon.jsx";
import CostiControls from "../components/costi/CostiControls.jsx";

export default function CostiPage(props) {
  const {
    labelPeriodoContabileInterventi,
    filtroInterventiAnnoContabile,
    setFiltroInterventiAnnoContabile,
    listaAnniContabiliInterventi,
    filtroInterventiPeriodoContabile,
    setFiltroInterventiPeriodoContabile,
    filtroInterventiPeriodoDa,
    setFiltroInterventiPeriodoDa,
    filtroInterventiPeriodoA,
    setFiltroInterventiPeriodoA,
    filtroInterventiSede,
    setFiltroInterventiSede,
    listaSediInterventi,
    filtroInterventiSocieta,
    setFiltroInterventiSocieta,
    listaSocietaInterventi,
    filtroInterventiAttivita,
    setFiltroInterventiAttivita,
    listaAttivitaFiltroInterventi,
    filtroInterventiCodice,
    setFiltroInterventiCodice,
    listaCodiciFiltroInterventi,
    resetFiltriInterventi,
    esportaInterventiFiltratiPdf,
    formatCurrency,
    totaleSpesaInterventiFiltrati,
    interventiFiltrati,
    codiciCoinvoltiInterventi,
    ditteCoinvolteInterventi,
    costoMedioInterventoFiltrato,
    classificaCostiPerDitta,
    classificaCostiPerSede,
    classificaCostiPerCespite,
    classificaCostiPerAttivita,
    setCostiPanelAperto,
    costiPanelAperto,
    puliziaSocietaDaCorreggere
  } = props;
  return (
    <div className="fmed-costi-page fmed-style-card">
    <header className="fmed-costi-hero fmed-style-scadenze-header">
      <div className="fmed-banner-heading">
        <FmedModuleIcon module="Costi" />
        <div className="fmed-banner-copy">
          <span className="fmed-costi-kicker">Controllo economico</span>
          <h2 className="fmed-costi-title fmed-style-card-title">Analisi costi manutentivi</h2>
          <p className="fmed-style-muted">
            Analisi economica sugli interventi con anno contabile, periodo, sede, ditta, attività e cespite. I dati usano gli stessi filtri della pagina Interventi.
          </p>
        </div>
      </div>
    </header>

    <CostiControls {...{
        labelPeriodoContabileInterventi,
        filtroInterventiAnnoContabile,
        setFiltroInterventiAnnoContabile,
        listaAnniContabiliInterventi,
        filtroInterventiPeriodoContabile,
        setFiltroInterventiPeriodoContabile,
        filtroInterventiPeriodoDa,
        setFiltroInterventiPeriodoDa,
        filtroInterventiPeriodoA,
        setFiltroInterventiPeriodoA,
        filtroInterventiSede,
        setFiltroInterventiSede,
        listaSediInterventi,
        filtroInterventiSocieta,
        setFiltroInterventiSocieta,
        listaSocietaInterventi,
        filtroInterventiAttivita,
        setFiltroInterventiAttivita,
        listaAttivitaFiltroInterventi,
        filtroInterventiCodice,
        setFiltroInterventiCodice,
        listaCodiciFiltroInterventi,
        resetFiltriInterventi,
        esportaInterventiFiltratiPdf
      }} />

    <section className="fmed-costi-summary fmed-style-conto-economico-box">
      <div className="fmed-style-conto-economico-header">
        <div>
          <h3 className="fmed-style-conto-economico-title">Quadro economico filtrato</h3>
          <p className="fmed-style-muted">Il totale considera solo le righe con costo valorizzato nei campi costo/importo_extra.</p>
        </div>
      </div>

      <div className="fmed-costi-summary-grid fmed-style-conto-economico-grid">
        <div className="fmed-style-conto-economico-card"><span className="fmed-style-conto-economico-label">Totale spesa</span><strong className="fmed-style-conto-economico-value">{formatCurrency(totaleSpesaInterventiFiltrati)}</strong></div>
        <div className="fmed-style-conto-economico-card"><span className="fmed-style-conto-economico-label">Interventi</span><strong className="fmed-style-conto-economico-value">{interventiFiltrati.length}</strong></div>
        <div className="fmed-style-conto-economico-card"><span className="fmed-style-conto-economico-label">Cespiti coinvolti</span><strong className="fmed-style-conto-economico-value">{codiciCoinvoltiInterventi.size}</strong></div>
        <div className="fmed-style-conto-economico-card"><span className="fmed-style-conto-economico-label">Ditte coinvolte</span><strong className="fmed-style-conto-economico-value">{ditteCoinvolteInterventi.size}</strong></div>
        <div className="fmed-style-conto-economico-card"><span className="fmed-style-conto-economico-label">Costo medio</span><strong className="fmed-style-conto-economico-value">{formatCurrency(costoMedioInterventoFiltrato)}</strong></div>
      </div>
    </section>

    <div className="fmed-costi-rankings p0-cost-ranking-list">



        
      {[["ditta", "Costi per ditta", classificaCostiPerDitta, ""], ["sede", "Costi per sede", classificaCostiPerSede, ""], ["cespiti", "Cespiti più costosi", classificaCostiPerCespite, ""], ["attivita", "Costi per attività", classificaCostiPerAttivita, ""]].map(([chiave, titolo, righe, icona]) => <div key={chiave} className="fmed-costi-accordion fmed-style-export-accordion-item">
          <button type="button" onClick={() => setCostiPanelAperto(costiPanelAperto === chiave ? null : chiave)} className="fmed-style-export-accordion-header">
            <div className="fmed-style-export-accordion-title-wrap">
              <span className="fmed-style-export-accordion-icon">{icona}</span>
              <div>
                <div className="fmed-style-export-accordion-title">{titolo}</div>
                <div className="fmed-style-export-accordion-subtitle">{righe.length} voci · totale {formatCurrency(righe.reduce((acc, r) => acc + (Number(r.totale) || 0), 0))}</div>
              </div>
            </div>
            <span className="fmed-style-export-accordion-chevron">{costiPanelAperto === chiave ? "▲ Chiudi" : "▼ Apri"}</span>
          </button>

          {costiPanelAperto === chiave && <div className="fmed-style-table-wrap">
              <table className="fmed-style-table">
                <thead>
                  <tr><th className="fmed-style-th">Voce</th><th className="fmed-style-th">Interventi</th><th className="fmed-style-th">Cespiti</th><th className="fmed-style-th">Totale</th></tr>
                </thead>
                <tbody>
                  {righe.slice(0, 20).map((r) => <tr key={`${titolo}-${r.nome}`} className="fmed-style-tr">
                      <td className="fmed-style-td-code">{r.nome}</td>
                      <td className="fmed-style-td">{r.interventi}</td>
                      <td className="fmed-style-td">{r.cespiti}</td>
                      <td className="fmed-style-td">{formatCurrency(r.totale)}</td>
                    </tr>)}
                  {righe.length === 0 && <tr><td colSpan={4} className="fmed-style-td">Nessun dato disponibile con i filtri attuali.</td></tr>}
                </tbody>
              </table>
            </div>}
        </div>)}
    </div>

    <div className="fmed-costi-accordion fmed-costi-cleanup fmed-style-export-accordion-item" style={{

        marginTop: 18
      }}>
      <button type="button" onClick={() => setCostiPanelAperto(costiPanelAperto === "pulizia" ? null : "pulizia")} className="fmed-style-export-accordion-header">
        <div className="fmed-style-export-accordion-title-wrap">
          <span className="fmed-style-export-accordion-icon"></span>
          <div>
            <div className="fmed-style-export-accordion-title">Pulizia Ditte/Società - proposte di accorpamento</div>
            <div className="fmed-style-export-accordion-subtitle">{puliziaSocietaDaCorreggere.length} varianti rilevate</div>
          </div>
        </div>
        <span className="fmed-style-export-accordion-chevron">{costiPanelAperto === "pulizia" ? "▲ Chiudi" : "▼ Apri"}</span>
      </button>
      {costiPanelAperto === "pulizia" && <>
          <p style={{

            margin: "12px 14px"
          }} className="fmed-style-muted">
            Questa tabella non modifica Supabase: mostra le varianti trovate e il nome standard usato da FMED per filtri e analisi. Quando sei d'accordo, possiamo generare lo script SQL di bonifica definitiva.
          </p>
          <div className="fmed-style-table-wrap">
            <table className="fmed-style-table">
              <thead><tr><th className="fmed-style-th">Valore presente</th><th className="fmed-style-th">Nome standard FMED</th><th className="fmed-style-th">Occorrenze</th><th className="fmed-style-th">Esito</th></tr></thead>
              <tbody>
                {puliziaSocietaDaCorreggere.slice(0, 80).map((r) => <tr key={`${r.standard}-${r.originale}`} className="fmed-style-tr">
                    <td className="fmed-style-td">{r.originale}</td>
                    <td className="fmed-style-td-code">{r.standard}</td>
                    <td className="fmed-style-td">{r.occorrenze}</td>
                    <td className="fmed-style-td">Da accorpare</td>
                  </tr>)}
                {puliziaSocietaDaCorreggere.length === 0 && <tr><td colSpan={4} className="fmed-style-td">Nessuna variante da correggere rilevata.</td></tr>}
              </tbody>
            </table>
          </div>
        </>}
    </div>
  </div>);

}
