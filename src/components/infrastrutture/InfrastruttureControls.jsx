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
    infrastruttureElencoAperto = false,
    setInfrastruttureElencoAperto = () => {},
    resetFiltriInfrastrutture = () => {}
  } = props || {};
  const refresh = () => caricaInfrastruttureOnDemand({ force: true });

  const esportaInfrastruttureExcel = () => {
    const righe = Array.isArray(infrastruttureFiltrate) ? infrastruttureFiltrate : [];
    if (!righe.length) {
      window.alert("NESSUNA INFRASTRUTTURA FILTRATA DA ESPORTARE.");
      return;
    }

    const pulisci = (value) => {
      if (value === null || value === undefined) return "";
      return String(value).replaceAll('"', '""').replace(/\r?\n|\r/g, " ").trim();
    };
    const cella = (value) => `"${pulisci(value)}"`;

    const intestazioni = [
      "CODICE",
      "IMPIANTO / ATTIVITÀ",
      "SEDE",
      "CATEGORIA",
      "DITTA",
      "SOCIETÀ",
      "RESPONSABILE",
      "CENTRO DI COSTO",
      "PERIODICITÀ",
      "PRIORITÀ",
      "ULTIMO INTERVENTO",
      "PROSSIMO INTERVENTO",
      "STATO",
      "NOTE"
    ];

    const contenutoRighe = righe.map((row, index) => [
      row.codice || `INF-${String(row.id || index + 1).padStart(5, "0")}`,
      row.descrizione || row.attivita || "",
      row.sede || "",
      row.categoria || "",
      row.ditta || row.ditta_esecutrice || "",
      row.societa || "",
      row.responsabile || "",
      row.centro_costo || "",
      row.periodicita || "",
      row.priorita || "",
      row.ultimo_intervento || "",
      row.prossimo_intervento || "",
      row?._statoInfra?.testo || row.stato || "",
      row.note || ""
    ].map(cella).join(";"));

    const csv = [intestazioni.map(cella).join(";"), ...contenutoRighe].join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const data = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `FMED_INFRASTRUTTURE_FILTRATE_${data}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="p0-command p0-command--infrastructure">
      <div className="p0-command__primary">
        <div className="p0-command__intro">
          <div><span className="p0-kicker">Patrimonio impiantistico</span><h2>Trova impianto, servizio o attività</h2></div>
        </div>
        <div className="p0-search">
          <span className="p0-search__mark" aria-hidden="true">⌕</span>
          <input aria-label="Ricerca infrastrutture" value={ricercaInfra} onChange={(e) => setRicercaInfra(e.target.value)} placeholder="Impianto, ditta, attività, codice o nota" />
          <span className="p0-search__meta">{infrastruttureFiltrate.length} risultati</span>
        </div>
      </div>

      <details open className="p0-advanced">
        <summary><span><b>Affina patrimonio</b><small>Sede, categoria, gestione e scadenza</small></span><span className="p0-advanced__summary">{infrastruttureFiltrate.length} elementi</span></summary>
        <div className="p0-filter-grid">
          <SelectField label="Sede" value={filtroInfraSede} onChange={(e) => setFiltroInfraSede(e.target.value)}><option value="TUTTE">Tutte le sedi</option>{listaInfraSedi.map((v) => <option key={v}>{v}</option>)}</SelectField>
          <SelectField label="Categoria" value={filtroInfraCategoria} onChange={(e) => setFiltroInfraCategoria(e.target.value)}><option value="TUTTE">Tutte le categorie</option>{listaInfraCategorie.map((v) => <option key={v}>{v}</option>)}</SelectField>
          <SelectField label="Stato" value={filtroInfraStato} onChange={(e) => setFiltroInfraStato(e.target.value)}><option value="TUTTE">Tutti gli stati</option><option value="SCADUTA">Scadute</option><option value="30_GIORNI">In scadenza</option><option value="60_GIORNI">Entro 60 giorni</option><option value="OK">Programmate</option><option value="DUPLICATO">Duplicati</option><option value="DA_VERIFICARE">Da verificare</option></SelectField>
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

      <div
        className="p0-command__actions p0-infrastructure-command-bar"
        role="toolbar"
        aria-label="Comandi infrastrutture"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "8px",
          overflow: "visible"
        }}
      >
        <button type="button" className="p0-btn p0-infrastructure-command-bar__refresh" onClick={refresh} disabled={infrastruttureLoading}>
          {infrastruttureLoading ? "AGGIORNAMENTO…" : "AGGIORNA DATI"}
        </button>

        {permessiRuoloFmed.canEdit && (
          <button type="button" className="p0-btn p0-infrastructure-command-bar__new" onClick={apriNuovaInfrastruttura}>
            + NUOVA INFRASTRUTTURA
          </button>
        )}

        <button type="button" className="p0-btn p0-infrastructure-command-bar__excel" onClick={esportaInfrastruttureExcel} disabled={!infrastruttureFiltrate.length}>
          ESPORTA EXCEL · {infrastruttureFiltrate.length}
        </button>

        <button type="button" className="p0-btn p0-infrastructure-command-bar__open" onClick={() => setInfrastruttureElencoAperto(true)} disabled={!infrastruttureFiltrate.length || infrastruttureElencoAperto}>
          APRI PATRIMONIO · {infrastruttureFiltrate.length}
        </button>

        <button
          type="button"
          className="p0-btn p0-infrastructure-command-bar__reset"
          onClick={resetFiltriInfrastrutture}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            position: "static",
            visibility: "visible",
            opacity: 1,
            width: "100%",
            minWidth: 0,
            margin: 0
          }}
        >
          AZZERA FILTRI
        </button>
      </div>
    </section>
  );
}
