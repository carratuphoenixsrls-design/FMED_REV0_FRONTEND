function SelectField({ label, value, onChange, children }) {
  return <label className="p0-field"><span>{label}</span><select value={value} onChange={onChange}>{children}</select></label>;
}

function DateField({ label, value, onChange }) {
  return <label className="p0-field"><span>{label}</span><input type="date" value={value} onChange={onChange} /></label>;
}

export default function ScadenzeControls(props) {
  const {
    scadenzeVisualizzate = [],
    scadenzeSelezionateVisualizzate = [],
    filtroScadenze,
    setFiltroScadenze,
    filtroScadenzeModulo,
    setFiltroScadenzeModulo,
    listaModuliFiltroScadenze = [],
    setScadenzeElencoAperto = () => {},
    filtroScadenzeCodice,
    setFiltroScadenzeCodice,
    listaCodiciFiltroScadenze = [],
    filtroScadenzeSede,
    setFiltroScadenzeSede,
    listaSediFiltroScadenze = [],
    filtroScadenzeTipologia,
    setFiltroScadenzeTipologia,
    listaTipologieFiltroScadenze = [],
    filtroScadenzeAttivita,
    setFiltroScadenzeAttivita,
    listaAttivitaFiltroScadenze = [],
    filtroScadenzeDitta,
    setFiltroScadenzeDitta,
    listaDitteFiltroScadenze = [],
    normalizzaSocietaDitta = (value) => value || '-',
    ordineScadenze,
    setOrdineScadenze,
    filtroScadenzeProssimaDa,
    setFiltroScadenzeProssimaDa,
    filtroScadenzeProssimaA,
    setFiltroScadenzeProssimaA,
    scadenzeElencoAperto,
    selezionaTutteScadenzeVisualizzate = () => {},
    deselezionaTutteScadenze = () => {},
    resetFiltriScadenze = () => {},
    esportaScadenzePdf = () => {}
  } = props || {};
  const update = (setter) => (event) => {
    setter(event.target.value);
    setScadenzeElencoAperto(false);
  };

  return (
    <section className="p0-command p0-command--deadline" aria-label="Comandi scadenze">
      <div className="p0-command__primary">
        <div className="p0-command__intro">
          <div>
            <span className="p0-kicker">Agenda tecnica</span>
            <h2>Concentrati su ciò che richiede attenzione</h2>
          </div>
          <div className="p0-command__facts">
            <span><b>{scadenzeVisualizzate.length}</b> visibili</span>
            <span><b>{scadenzeSelezionateVisualizzate.length}</b> selezionate</span>
          </div>
        </div>
        <div className="p0-deadline-quick">
          <SelectField label="Priorità temporale" value={filtroScadenze} onChange={update(setFiltroScadenze)}>
            <option value="TUTTE">Tutte le scadenze</option><option value="SCADUTA">Scadute</option>
            <option value="30_GIORNI">Entro 30 giorni</option><option value="60_GIORNI">Da 31 a 60 giorni</option>
            <option value="REGOLARE">Future / regolari</option><option value="DA_PIANIFICARE">Da pianificare</option>
            <option value="NON_DISPONIBILE">Data non disponibile</option>
          </SelectField>
          <SelectField label="Ambito" value={filtroScadenzeModulo} onChange={update(setFiltroScadenzeModulo)}>
            <option value="TUTTI">Tutti i moduli</option>
            {listaModuliFiltroScadenze.map((v) => <option key={v} value={v}>{v.replaceAll("_", " ")}</option>)}
          </SelectField>
          <SelectField label="Ordina" value={ordineScadenze} onChange={(e) => setOrdineScadenze(e.target.value)}>
            <option value="SCADENZA_ASC">Più urgente</option><option value="SCADENZA_DESC">Più lontana</option>
            <option value="CODICE_ASC">Codice crescente</option><option value="CODICE_DESC">Codice decrescente</option>
          </SelectField>
        </div>
      </div>

      <details className="p0-advanced">
        <summary>
          <span><b>Affina agenda</b><small>Elemento, sede, attività, responsabile e intervallo</small></span>
          <span className="p0-advanced__summary">{scadenzeVisualizzate.length} risultati</span>
        </summary>
        <div className="p0-filter-grid">
          <SelectField label="Elemento" value={filtroScadenzeCodice} onChange={update(setFiltroScadenzeCodice)}>
            <option value="TUTTE">Tutti gli elementi</option>
            {listaCodiciFiltroScadenze.map((v) => <option key={v} value={v}>{v}</option>)}
          </SelectField>
          <SelectField label="Sede" value={filtroScadenzeSede} onChange={update(setFiltroScadenzeSede)}>
            <option value="TUTTE">Tutte le sedi</option>
            {listaSediFiltroScadenze.map((v) => <option key={v} value={v}>{v}</option>)}
          </SelectField>
          <SelectField label="Tipologia" value={filtroScadenzeTipologia} onChange={update(setFiltroScadenzeTipologia)}>
            <option value="TUTTE">Tutte le tipologie</option>
            {listaTipologieFiltroScadenze.map((v) => <option key={v} value={v}>{v}</option>)}
          </SelectField>
          <SelectField label="Attività" value={filtroScadenzeAttivita} onChange={update(setFiltroScadenzeAttivita)}>
            <option value="TUTTE">Tutte le attività</option>
            {listaAttivitaFiltroScadenze.map((v) => <option key={v} value={v}>{v}</option>)}
          </SelectField>
          <SelectField label="Ditta / ente" value={filtroScadenzeDitta} onChange={update(setFiltroScadenzeDitta)}>
            <option value="TUTTE">Tutte le ditte</option>
            {listaDitteFiltroScadenze.map((v) => <option key={v} value={v}>{normalizzaSocietaDitta(v)}</option>)}
          </SelectField>
          <DateField label="Scadenza dal" value={filtroScadenzeProssimaDa} onChange={(e) => setFiltroScadenzeProssimaDa(e.target.value)} />
          <DateField label="Scadenza al" value={filtroScadenzeProssimaA} onChange={(e) => setFiltroScadenzeProssimaA(e.target.value)} />
        </div>
      </details>

      <div className="p0-command__actions">
        <button className="p0-btn p0-btn--deadline" type="button" onClick={() => setScadenzeElencoAperto((v) => !v)}>
          {scadenzeElencoAperto ? "Chiudi agenda" : `Apri agenda · ${scadenzeVisualizzate.length}`}
        </button>
        <button className="p0-btn" type="button" onClick={selezionaTutteScadenzeVisualizzate}>Seleziona visibili</button>
        <button className="p0-btn" type="button" onClick={deselezionaTutteScadenze}>Deseleziona</button>
        <button className="p0-btn" type="button" disabled={!scadenzeSelezionateVisualizzate.length} onClick={esportaScadenzePdf}>
          PDF · {scadenzeSelezionateVisualizzate.length}
        </button>
        <button className="p0-btn p0-btn--quiet" type="button" onClick={resetFiltriScadenze}>Azzera filtri</button>
      </div>
    </section>
  );
}
