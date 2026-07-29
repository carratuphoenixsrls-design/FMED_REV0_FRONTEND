function SelectField({ label, value, onChange, children }) {
  return <label className="p0-field"><span>{label}</span><select value={value} onChange={onChange}>{children}</select></label>;
}

export default function InfrastruttureControls(props) {
  const {
    infrastruttureFiltrate = [],
    ricercaInfra = '',
    setRicercaInfra = () => {},
    filtroInfraSede,
    setFiltroInfraSede,
    listaInfraSedi = [],
    filtroInfraCategoria,
    setFiltroInfraCategoria,
    listaInfraCategorie = [],
    filtroInfraStato,
    setFiltroInfraStato,
    filtroInfraDitta,
    setFiltroInfraDitta,
    listaInfraDitte = [],
    filtroInfraPeriodicita,
    setFiltroInfraPeriodicita,
    listaInfraPeriodicita = [],
    filtroInfraPriorita,
    setFiltroInfraPriorita,
    listaInfraPriorita = [],
    filtroInfraResponsabile,
    setFiltroInfraResponsabile,
    listaInfraResponsabili = [],
    filtroInfraCentroCosto,
    setFiltroInfraCentroCosto,
    listaInfraCentriCosto = [],
    filtroInfraSocieta,
    setFiltroInfraSocieta,
    listaInfraSocieta = [],
    filtroInfraProssimaDa,
    setFiltroInfraProssimaDa,
    filtroInfraProssimaA,
    setFiltroInfraProssimaA,
    permessiRuoloFmed = {},
    apriNuovaInfrastruttura = () => {},
    caricaInfrastruttureOnDemand = () => {},
    infrastruttureLoading,
    resetFiltriInfrastrutture = () => {}
  } = props || {};
  const refresh = () => caricaInfrastruttureOnDemand({ force: true });

  return (
    <section className="p0-command p0-command--infrastructure">
      <div className="p0-command__primary">
        <div className="p0-command__intro">
          <div><span className="p0-kicker">Patrimonio impiantistico</span><h2>Trova impianto, servizio o attività</h2></div>
          {permessiRuoloFmed.canEdit && <button type="button" className="p0-btn p0-btn--infrastructure" onClick={apriNuovaInfrastruttura}>+ Nuova infrastruttura</button>}
        </div>
        <div className="p0-search">
          <span className="p0-search__mark" aria-hidden="true">⌕</span>
          <input aria-label="Ricerca infrastrutture" value={ricercaInfra} onChange={(e) => setRicercaInfra(e.target.value)} placeholder="Impianto, ditta, attività, codice o nota" />
          <span className="p0-search__meta">{infrastruttureFiltrate.length} risultati</span>
        </div>
      </div>

      <details className="p0-advanced">
        <summary><span><b>Affina patrimonio</b><small>Sede, categoria, gestione e scadenza</small></span><span className="p0-advanced__summary">{infrastruttureFiltrate.length} elementi</span></summary>
        <div className="p0-filter-grid">
          <SelectField label="Sede" value={filtroInfraSede} onChange={(e) => setFiltroInfraSede(e.target.value)}><option value="TUTTE">Tutte le sedi</option>{listaInfraSedi.map((v) => <option key={v}>{v}</option>)}</SelectField>
          <SelectField label="Categoria" value={filtroInfraCategoria} onChange={(e) => setFiltroInfraCategoria(e.target.value)}><option value="TUTTE">Tutte le categorie</option>{listaInfraCategorie.map((v) => <option key={v}>{v}</option>)}</SelectField>
          <SelectField label="Stato" value={filtroInfraStato} onChange={(e) => setFiltroInfraStato(e.target.value)}><option value="TUTTE">Tutti gli stati</option><option value="SCADUTA">Scadute</option><option value="30_GIORNI">In scadenza</option><option value="OK">Programmate</option><option value="DA_VERIFICARE">Da verificare</option></SelectField>
          <SelectField label="Ditta" value={filtroInfraDitta} onChange={(e) => setFiltroInfraDitta(e.target.value)}><option value="TUTTE">Tutte le ditte</option>{listaInfraDitte.map((v) => <option key={v}>{v}</option>)}</SelectField>
          <SelectField label="Periodicità" value={filtroInfraPeriodicita} onChange={(e) => setFiltroInfraPeriodicita(e.target.value)}><option value="TUTTE">Tutte le periodicità</option>{listaInfraPeriodicita.map((v) => <option key={v}>{v}</option>)}</SelectField>
          <SelectField label="Priorità" value={filtroInfraPriorita} onChange={(e) => setFiltroInfraPriorita(e.target.value)}><option value="TUTTE">Tutte le priorità</option>{listaInfraPriorita.map((v) => <option key={v}>{v}</option>)}</SelectField>
          <SelectField label="Responsabile" value={filtroInfraResponsabile} onChange={(e) => setFiltroInfraResponsabile(e.target.value)}><option value="TUTTE">Tutti i responsabili</option>{listaInfraResponsabili.map((v) => <option key={v}>{v}</option>)}</SelectField>
          <SelectField label="Centro di costo" value={filtroInfraCentroCosto} onChange={(e) => setFiltroInfraCentroCosto(e.target.value)}><option value="TUTTE">Tutti i centri</option>{listaInfraCentriCosto.map((v) => <option key={v}>{v}</option>)}</SelectField>
          <SelectField label="Società" value={filtroInfraSocieta} onChange={(e) => setFiltroInfraSocieta(e.target.value)}><option value="TUTTE">Tutte le società</option>{listaInfraSocieta.map((v) => <option key={v}>{v}</option>)}</SelectField>
          <label className="p0-field"><span>Scadenza dal</span><input type="date" value={filtroInfraProssimaDa} onChange={(e) => setFiltroInfraProssimaDa(e.target.value)} /></label>
          <label className="p0-field"><span>Scadenza al</span><input type="date" value={filtroInfraProssimaA} onChange={(e) => setFiltroInfraProssimaA(e.target.value)} /></label>
        </div>
      </details>

      <div className="p0-command__actions">
        <button type="button" className="p0-btn p0-btn--infrastructure" onClick={refresh} disabled={infrastruttureLoading}>{infrastruttureLoading ? "Aggiornamento…" : "Aggiorna dati"}</button>
        <button type="button" className="p0-btn p0-btn--quiet" onClick={resetFiltriInfrastrutture}>Azzera filtri</button>
      </div>
    </section>
  );
}
