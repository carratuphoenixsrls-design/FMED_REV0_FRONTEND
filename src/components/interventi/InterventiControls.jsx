function InterventiSelect({ ariaLabel, value, onChange, style, children }) {
  return (
    <select className="fmed-interventi-select" aria-label={ariaLabel} value={value} onChange={onChange} style={style}>
      {children}
    </select>);

}

function InterventiDateField({ label, value, onChange }) {
  return (
    <div className="fmed-interventi-date-field fmed-style-interventi-date-filter-group">
      <span className="fmed-style-interventi-date-filter-label">{label}</span>
      <input type="date" value={value} onChange={onChange} className="fmed-style-input" />
    </div>);

}

export default function InterventiControls(props) {
  const {
    interventiFiltrati,
    apriNuovoIntervento,
    ricercaCespiteIntervento,
    setRicercaCespiteIntervento,
    cespitiPerNuovoIntervento,
    apriSchedaCespite,
    labelPeriodoContabileInterventi,
    filtroInterventiCodice,
    setFiltroInterventiCodice,
    setInterventiElencoAperto,
    listaCodiciFiltroInterventi,
    filtroInterventiSede,
    setFiltroInterventiSede,
    listaSediInterventi,
    filtroInterventiSocieta,
    setFiltroInterventiSocieta,
    listaSocietaInterventi,
    filtroInterventiTipologia,
    setFiltroInterventiTipologia,
    listaTipologieFiltroInterventi,
    filtroInterventiAttivita,
    setFiltroInterventiAttivita,
    listaAttivitaFiltroInterventi,
    filtroInterventiAnnoContabile,
    setFiltroInterventiAnnoContabile,
    listaAnniContabiliInterventi,
    filtroInterventiPeriodoContabile,
    setFiltroInterventiPeriodoContabile,
    ordineInterventi,
    setOrdineInterventi,
    filtroInterventiPeriodoDa,
    setFiltroInterventiPeriodoDa,
    filtroInterventiPeriodoA,
    setFiltroInterventiPeriodoA,
    filtroInterventiUltimoDa,
    setFiltroInterventiUltimoDa,
    filtroInterventiUltimoA,
    setFiltroInterventiUltimoA,
    filtroInterventiProssimoDa,
    setFiltroInterventiProssimoDa,
    filtroInterventiProssimoA,
    setFiltroInterventiProssimoA,
    interventiElencoAperto,
    permessiRuoloFmed,
    setPagina,
    resetFiltriInterventi,
    esportaInterventiFiltratiPdf
  } = props;

  const closeInterventiList = () => setInterventiElencoAperto(false);

  return (
    <>
      <div className="fmed-interventi-panel fmed-style-interventi-panel">
        <div className="fmed-interventi-panel-head fmed-style-interventi-panel-header">
          <div>
            <h3 className="fmed-style-interventi-section-title">Cerca cespite</h3>
            <p className="fmed-style-interventi-section-subtitle">
              Cerca un cespite e apri la scheda già pronta per aggiungere un intervento precompilato.
            </p>
          </div>
          <button
            type="button"

            onClick={() => apriNuovoIntervento(null)}
            title="Inserimento manuale senza preselezionare il cespite" className="fmed-style-interventi-ghost-action">
            
             Inserimento manuale
          </button>
        </div>

        <div className="fmed-interventi-search-row fmed-style-interventi-search-row">
          <input
            aria-label="Cerca cespite per nuovo intervento"
            placeholder="Cerca cespite per codice, tipologia, modello, matricola o sede..."
            value={ricercaCespiteIntervento}
            onChange={(event) => setRicercaCespiteIntervento(event.target.value)} className="fmed-style-interventi-input-wide" />

          
          <button
            type="button"

            onClick={() => {}}
            title="La ricerca si aggiorna automaticamente mentre scrivi" className="fmed-style-interventi-search-button">
            
             Cerca
          </button>
        </div>

        {ricercaCespiteIntervento.trim() &&
        <div className="fmed-interventi-smart-results fmed-style-interventi-smart-results-box">
            {cespitiPerNuovoIntervento.length === 0 ?
          <p className="fmed-style-muted">Nessun cespite trovato.</p> :

          cespitiPerNuovoIntervento.map((cespite) =>
          <div
            key={cespite.codicestrumento}
            className="fmed-interventi-smart-row fmed-style-interventi-smart-result-row"

            onClick={() => {
              apriSchedaCespite(cespite);
              setRicercaCespiteIntervento("");
            }}
            title="Apri scheda cespite per aggiungere un intervento precompilato">
            
                  <strong className="fmed-style-interventi-smart-result-code">{cespite.codicestrumento}</strong>
                  <span>{cespite.tipologia || "-"}</span>
                  <span>{cespite.sede || "-"}</span>
                  <span>{cespite.reparto || "-"}</span>
                  <span>{cespite.costruttore || "-"}</span>
                  <span>{cespite.modello || "-"}</span>
                </div>
          )
          }
          </div>
        }
      </div>

      <div className="fmed-interventi-panel fmed-style-interventi-panel">
        <div className="fmed-interventi-panel-head fmed-style-interventi-panel-header">
          <div>
            <h3 className="fmed-style-interventi-section-title">Filtri interventi</h3>
            <p className="fmed-style-interventi-section-subtitle">
              Filtri sempre visibili per consultare rapidamente lo storico interventi.
            </p>
          </div>
          <div className="fmed-style-interventi-filter-chips">
            <span className="fmed-style-interventi-chip">Periodo: {labelPeriodoContabileInterventi()}</span>
            <span className="fmed-style-interventi-chip">Interventi: {interventiFiltrati.length}</span>
          </div>
        </div>

        <div className="fmed-interventi-filter-grid fmed-style-interventi-filters-grid">
          <InterventiSelect
            ariaLabel="Filtra interventi per codice cespite"
            value={filtroInterventiCodice}
            onChange={(event) => {
              setFiltroInterventiCodice(event.target.value);
              closeInterventiList();
            }} className="fmed-style-interventi-select-large">

            
            <option value="TUTTE">Tutti i codici</option>
            {listaCodiciFiltroInterventi.map((codice) => <option key={codice} value={codice}>{codice}</option>)}
          </InterventiSelect>

          <InterventiSelect
            ariaLabel="Filtra interventi per sede"
            value={filtroInterventiSede}
            onChange={(event) => {
              setFiltroInterventiSede(event.target.value);
              closeInterventiList();
            }} className="fmed-style-interventi-select-large">

            
            <option value="TUTTE">Tutte le sedi</option>
            {listaSediInterventi.map((sede) => <option key={sede} value={sede}>{sede}</option>)}
          </InterventiSelect>

          <InterventiSelect
            ariaLabel="Filtra interventi per società o ditta"
            value={filtroInterventiSocieta}
            onChange={(event) => {
              setFiltroInterventiSocieta(event.target.value);
              closeInterventiList();
            }} className="fmed-style-interventi-select-large">

            
            <option value="TUTTE">Tutte le società/ditte</option>
            {listaSocietaInterventi.map((societa) => <option key={societa} value={societa}>{societa}</option>)}
          </InterventiSelect>

          <InterventiSelect
            ariaLabel="Filtra interventi per tipologia"
            value={filtroInterventiTipologia}
            onChange={(event) => {
              setFiltroInterventiTipologia(event.target.value);
              closeInterventiList();
            }} className="fmed-style-interventi-select-large">

            
            <option value="TUTTE">Tutte le tipologie</option>
            {listaTipologieFiltroInterventi.map((tipologia) => <option key={tipologia} value={tipologia}>{tipologia}</option>)}
          </InterventiSelect>

          <InterventiSelect
            ariaLabel="Filtra interventi per attività"
            value={filtroInterventiAttivita}
            onChange={(event) => {
              setFiltroInterventiAttivita(event.target.value);
              closeInterventiList();
            }} className="fmed-style-interventi-select-large">

            
            <option value="TUTTE">Tutte le attività</option>
            {listaAttivitaFiltroInterventi.map((attivita) => <option key={attivita} value={attivita}>{attivita}</option>)}
          </InterventiSelect>

          <InterventiSelect
            ariaLabel="Filtra interventi per anno contabile"
            value={filtroInterventiAnnoContabile}
            onChange={(event) => {
              setFiltroInterventiAnnoContabile(event.target.value);
              closeInterventiList();
            }} className="fmed-style-interventi-select-large">

            
            {listaAnniContabiliInterventi.map((anno) => <option key={anno} value={anno}>Anno contabile {anno}</option>)}
          </InterventiSelect>

          <InterventiSelect
            ariaLabel="Filtra interventi per periodo contabile"
            value={filtroInterventiPeriodoContabile}
            onChange={(event) => {
              setFiltroInterventiPeriodoContabile(event.target.value);
              closeInterventiList();
            }} className="fmed-style-interventi-select-large">

            
            <option value="ANNO">Tutto l&apos;anno</option>
            <option value="T1">1° trimestre</option>
            <option value="T2">2° trimestre</option>
            <option value="T3">3° trimestre</option>
            <option value="T4">4° trimestre</option>
            <option value="S1">1° semestre</option>
            <option value="S2">2° semestre</option>
            <option value="PERSONALIZZATO">Periodo personalizzato</option>
          </InterventiSelect>

          <InterventiSelect
            ariaLabel="Ordina interventi"
            value={ordineInterventi}
            onChange={(event) => setOrdineInterventi(event.target.value)} className="fmed-style-interventi-select-large">

            
            <option value="RECENTI">Data più recente</option>
            <option value="VECCHI">Data meno recente</option>
          </InterventiSelect>

          {filtroInterventiPeriodoContabile === "PERSONALIZZATO" &&
          <>
              <InterventiDateField
              label="Periodo da"
              value={filtroInterventiPeriodoDa}
              onChange={(event) => setFiltroInterventiPeriodoDa(event.target.value)} />
            
              <InterventiDateField
              label="Periodo a"
              value={filtroInterventiPeriodoA}
              onChange={(event) => setFiltroInterventiPeriodoA(event.target.value)} />
            
            </>
          }

          <InterventiDateField
            label="Ultimo intervento da"
            value={filtroInterventiUltimoDa}
            onChange={(event) => setFiltroInterventiUltimoDa(event.target.value)} />
          
          <InterventiDateField
            label="Ultimo intervento a"
            value={filtroInterventiUltimoA}
            onChange={(event) => setFiltroInterventiUltimoA(event.target.value)} />
          
          <InterventiDateField
            label="Prossimo intervento da"
            value={filtroInterventiProssimoDa}
            onChange={(event) => setFiltroInterventiProssimoDa(event.target.value)} />
          
          <InterventiDateField
            label="Prossimo intervento a"
            value={filtroInterventiProssimoA}
            onChange={(event) => setFiltroInterventiProssimoA(event.target.value)} />
          
        </div>

        <div className="fmed-style-interventi-actions-bar">
          <button
            type="button"

            onClick={() => setInterventiElencoAperto((value) => !value)} className="fmed-style-interventi-primary-action">
            
            {interventiElencoAperto ? "▲ Nascondi elenco" : ` Apri elenco filtrato (${interventiFiltrati.length})`}
          </button>
          {permessiRuoloFmed.canSeeCosts &&
          <button type="button" onClick={() => setPagina("Costi")} className="fmed-style-interventi-secondary-action">
               Analizza costi
            </button>
          }
          <button type="button" onClick={resetFiltriInterventi} className="fmed-style-interventi-ghost-action">
             Reset filtri
          </button>
          <button type="button" onClick={esportaInterventiFiltratiPdf} className="fmed-style-interventi-ghost-action">
             Esporta PDF
          </button>
        </div>
      </div>
    </>);

}
