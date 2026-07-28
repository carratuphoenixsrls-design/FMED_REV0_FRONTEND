function ScadenzeSelect({ ariaLabel, value, onChange, style, children }) {
  return (
    <select aria-label={ariaLabel} value={value} onChange={onChange} style={style}>
      {children}
    </select>);

}

function ScadenzeDateField({ ariaLabel, label, value, onChange }) {
  return (
    <div className="fmed-deadline-date-field fmed-style-scadenze-date-filter-group">
      <span className="fmed-style-scadenze-date-filter-label">{label}</span>
      <input
        aria-label={ariaLabel}
        type="date"
        value={value}
        onChange={onChange} className="fmed-style-scadenze-input" />

      
    </div>);

}

export default function ScadenzeControls(props) {
  const {
    scadenzeVisualizzate,
    scadenzeSelezionateVisualizzate,
    filtroScadenze,
    setFiltroScadenze,
    filtroScadenzeModulo,
    setFiltroScadenzeModulo,
    listaModuliFiltroScadenze,
    setScadenzeElencoAperto,
    filtroScadenzeCodice,
    setFiltroScadenzeCodice,
    listaCodiciFiltroScadenze,
    filtroScadenzeSede,
    setFiltroScadenzeSede,
    listaSediFiltroScadenze,
    filtroScadenzeTipologia,
    setFiltroScadenzeTipologia,
    listaTipologieFiltroScadenze,
    filtroScadenzeAttivita,
    setFiltroScadenzeAttivita,
    listaAttivitaFiltroScadenze,
    filtroScadenzeDitta,
    setFiltroScadenzeDitta,
    listaDitteFiltroScadenze,
    normalizzaSocietaDitta,
    ordineScadenze,
    setOrdineScadenze,
    filtroScadenzeProssimaDa,
    setFiltroScadenzeProssimaDa,
    filtroScadenzeProssimaA,
    setFiltroScadenzeProssimaA,
    scadenzeElencoAperto,
    selezionaTutteScadenzeVisualizzate,
    deselezionaTutteScadenze,
    resetFiltriScadenze,
    esportaScadenzePdf
  } = props;

  const aggiornaFiltro = (setter) => (event) => {
    setter(event.target.value);
    setScadenzeElencoAperto(false);
  };

  return (
    <div className="fmed-operational8-deadline-filters fmed-style-scadenze-filters-panel">
      <div className="fmed-operational-filters-head fmed-style-scadenze-filters-header">
        <div>
          <h3 className="fmed-style-scadenze-section-title">Filtri scadenze</h3>
          <p className="fmed-style-scadenze-section-subtitle">
            Il Motore Cicli REV0 mostra una sola scadenza operativa per elemento e famiglia. Le attività precedenti restano soltanto nello storico.
          </p>
        </div>
        <div className="fmed-style-scadenze-filter-chips">
          <span className="fmed-style-scadenze-chip">Visibili: {scadenzeVisualizzate.length}</span>
          <span className="fmed-style-scadenze-chip">Selezionate: {scadenzeSelezionateVisualizzate.length}</span>
        </div>
      </div>

      <div className="fmed-operational-filters-grid fmed-deadline-filters-grid fmed-style-scadenze-filters-grid">
        <ScadenzeSelect
          ariaLabel="Filtra scadenze per stato"
          value={filtroScadenze}
          onChange={aggiornaFiltro(setFiltroScadenze)} className="fmed-style-scadenze-select-large">

          
          <option value="TUTTE">Tutti gli stati</option>
          <option value="SCADUTA">Scadute</option>
          <option value="30_GIORNI">Entro 30 giorni</option>
          <option value="60_GIORNI">Da 31 a 60 giorni</option>
          <option value="REGOLARE">Future / regolari</option>
          <option value="DA_PIANIFICARE">Da pianificare</option>
          <option value="NON_DISPONIBILE">Data non disponibile</option>
        </ScadenzeSelect>

        <ScadenzeSelect
          ariaLabel="Filtra scadenze per modulo"
          value={filtroScadenzeModulo}
          onChange={aggiornaFiltro(setFiltroScadenzeModulo)} className="fmed-style-scadenze-select-large">

          
          <option value="TUTTI">Tutti i moduli</option>
          {listaModuliFiltroScadenze.map((modulo) => <option key={modulo} value={modulo}>{modulo.replaceAll("_", " ")}</option>)}
        </ScadenzeSelect>

        <ScadenzeSelect
          ariaLabel="Filtra scadenze per elemento"
          value={filtroScadenzeCodice}
          onChange={aggiornaFiltro(setFiltroScadenzeCodice)} className="fmed-style-scadenze-select-large">

          
          <option value="TUTTE">Tutti gli elementi</option>
          {listaCodiciFiltroScadenze.map((codice) => <option key={codice} value={codice}>{codice}</option>)}
        </ScadenzeSelect>

        <ScadenzeSelect
          ariaLabel="Filtra scadenze per sede"
          value={filtroScadenzeSede}
          onChange={aggiornaFiltro(setFiltroScadenzeSede)} className="fmed-style-scadenze-select-large">

          
          <option value="TUTTE">Tutte le sedi</option>
          {listaSediFiltroScadenze.map((sede) => <option key={sede} value={sede}>{sede}</option>)}
        </ScadenzeSelect>

        <ScadenzeSelect
          ariaLabel="Filtra scadenze per tipologia"
          value={filtroScadenzeTipologia}
          onChange={aggiornaFiltro(setFiltroScadenzeTipologia)} className="fmed-style-scadenze-select-large">

          
          <option value="TUTTE">Tutte le tipologie</option>
          {listaTipologieFiltroScadenze.map((tipologia) => <option key={tipologia} value={tipologia}>{tipologia}</option>)}
        </ScadenzeSelect>

        <ScadenzeSelect
          ariaLabel="Filtra scadenze per attività"
          value={filtroScadenzeAttivita}
          onChange={aggiornaFiltro(setFiltroScadenzeAttivita)} className="fmed-style-scadenze-select-large">

          
          <option value="TUTTE">Tutte le attività</option>
          {listaAttivitaFiltroScadenze.map((attivita) => <option key={attivita} value={attivita}>{attivita}</option>)}
        </ScadenzeSelect>

        <ScadenzeSelect
          ariaLabel="Filtra scadenze per ditta esecutrice"
          value={filtroScadenzeDitta}
          onChange={aggiornaFiltro(setFiltroScadenzeDitta)} className="fmed-style-scadenze-select-large">

          
          <option value="TUTTE">Tutte le ditte</option>
          {listaDitteFiltroScadenze.map((ditta) =>
          <option key={ditta} value={ditta}>{normalizzaSocietaDitta(ditta)}</option>
          )}
        </ScadenzeSelect>

        <ScadenzeSelect
          ariaLabel="Ordina scadenze"
          value={ordineScadenze}
          onChange={(event) => setOrdineScadenze(event.target.value)} className="fmed-style-scadenze-select-large">

          
          <option value="SCADENZA_ASC">Scadenza più vicina</option>
          <option value="SCADENZA_DESC">Scadenza più lontana</option>
          <option value="CODICE_ASC">Codice crescente</option>
          <option value="CODICE_DESC">Codice decrescente</option>
        </ScadenzeSelect>

        <ScadenzeDateField
          ariaLabel="Scadenza da"
          label="Scadenza da"
          value={filtroScadenzeProssimaDa}
          onChange={(event) => setFiltroScadenzeProssimaDa(event.target.value)} />
        
        <ScadenzeDateField
          ariaLabel="Scadenza a"
          label="Scadenza a"
          value={filtroScadenzeProssimaA}
          onChange={(event) => setFiltroScadenzeProssimaA(event.target.value)} />
        
      </div>

      <div className="fmed-operational8-deadline-actions fmed-style-scadenze-actions-bar">
        <button type="button" className="fmed-operational8-open-list-btn fmed-style-scadenze-primary-action" onClick={() => setScadenzeElencoAperto((value) => !value)}>
          {scadenzeElencoAperto ? "▲ Nascondi elenco" : ` Apri elenco filtrato (${scadenzeVisualizzate.length})`}
        </button>
        <button type="button" onClick={selezionaTutteScadenzeVisualizzate} className="fmed-style-scadenze-secondary-action">
          Seleziona visibili
        </button>
        <button type="button" onClick={deselezionaTutteScadenze} className="fmed-style-scadenze-ghost-action">
          ⬜ Deseleziona
        </button>
        <button type="button" onClick={resetFiltriScadenze} className="fmed-style-scadenze-ghost-action">
           Reset filtri
        </button>
        <button
          type="button"
          className="fmed-style-scadenze-ghost-action"
          style={{ opacity: scadenzeSelezionateVisualizzate.length === 0 ? 0.55 : 1 }}
          onClick={esportaScadenzePdf}
          disabled={scadenzeSelezionateVisualizzate.length === 0}>
          
          PDF selezionate ({scadenzeSelezionateVisualizzate.length})
        </button>
      </div>
    </div>);

}
