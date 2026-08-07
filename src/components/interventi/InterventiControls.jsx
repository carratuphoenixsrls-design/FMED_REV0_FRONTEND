function SelectField({ label, value, onChange, children }) {
  return (
    <label className="p0-field">
      <span>{label}</span>
      <select value={value} onChange={onChange}>{children}</select>
    </label>
  );
}

function DateField({ label, value, onChange }) {
  return (
    <label className="p0-field">
      <span>{label}</span>
      <input type="date" value={value} onChange={onChange} />
    </label>
  );
}

export default function InterventiControls(props) {
  const {
    interventiFiltrati = [],
    apriNuovoIntervento = () => {},
    ricercaCespiteIntervento = '',
    setRicercaCespiteIntervento = () => {},
    cespitiPerNuovoIntervento = [],
    apriSchedaCespite = () => {},
    filtroInterventiCodice,
    setFiltroInterventiCodice,
    setInterventiElencoAperto = () => {},
    listaCodiciFiltroInterventi = [],
    filtroInterventiSede,
    setFiltroInterventiSede,
    listaSediInterventi = [],
    filtroInterventiSocieta,
    setFiltroInterventiSocieta,
    listaSocietaInterventi = [],
    filtroInterventiTipologia,
    setFiltroInterventiTipologia,
    listaTipologieFiltroInterventi = [],
    filtroInterventiAttivita,
    setFiltroInterventiAttivita,
    listaAttivitaFiltroInterventi = [],
    filtroInterventiAnnoContabile,
    setFiltroInterventiAnnoContabile,
    listaAnniContabiliInterventi = [],
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
    permessiRuoloFmed = {},
    setPagina = () => {},
    resetFiltriInterventi = () => {},
    esportaInterventiFiltratiPdf = () => {},
    exportInterventiFmed = () => {},
    interventiIncludeStorico = false,
    cambiaVistaStoricoInterventi = () => {}
  } = props || {};

  const closeList = () => setInterventiElencoAperto(false);
  const update = (setter) => (event) => {
    setter(event.target.value);
    closeList();
  };

  return (
    <section className="p0-command p0-command--maintenance" aria-label="Comandi interventi">
      <div className="p0-command__primary">
        <div className="p0-command__intro">
          <div>
            <span className="p0-kicker">Avvia un’attività</span>
            <h2>Trova il bene da manutenere</h2>
          </div>
          <button className="p0-btn p0-btn--maintenance" type="button" onClick={() => apriNuovoIntervento(null)}>
            + Intervento manuale
          </button>
        </div>

        <div className="p0-search">
          <span className="p0-search__mark" aria-hidden="true">⌕</span>
          <input
            aria-label="Cerca cespite per nuovo intervento"
            placeholder="Codice, matricola, modello, tipologia o sede"
            value={ricercaCespiteIntervento}
            onChange={(event) => {
              const valore = event.target.value;
              setRicercaCespiteIntervento(valore);

              const testo = String(valore || "").trim().toLowerCase();

              if (!testo) {
                setFiltroInterventiCodice("TUTTE");
                setInterventiElencoAperto(false);
                return;
              }

              const matches = cespitiPerNuovoIntervento.filter((cespite) => {
                const codice = String(cespite?.codicestrumento || "").trim().toLowerCase();
                const codiceSenzaPrefisso = codice
                  .replace(/^a[_\-\s]*/i, "")
                  .replace(/^0+/, "");

                const testoNormalizzato = testo
                  .replace(/^a[_\-\s]*/i, "")
                  .replace(/^0+/, "");

                return (
                  codice === testo ||
                  codice.includes(testo) ||
                  codiceSenzaPrefisso === testoNormalizzato
                );
              });

              if (matches.length === 1) {
                setFiltroInterventiCodice(matches[0].codicestrumento);
                setInterventiElencoAperto(true);
              } else {
                setFiltroInterventiCodice("TUTTE");
              }
            }}
          />
          <span className="p0-search__meta">Ricerca immediata</span>
        </div>

        {ricercaCespiteIntervento.trim() && (
          <div className="p0-smart-results">
            {cespitiPerNuovoIntervento.length === 0 ? (
              <p className="p0-empty">Nessun cespite corrisponde alla ricerca.</p>
            ) : cespitiPerNuovoIntervento.map((cespite) => (
              <button
                type="button"
                key={cespite.codicestrumento}
                className="p0-smart-row"
                onClick={() => {
                  apriSchedaCespite(cespite);
                  setRicercaCespiteIntervento("");
                }}
              >
                <strong>{cespite.codicestrumento}</strong>
                <span>{cespite.tipologia || "Tipologia non indicata"}</span>
                <span>{cespite.sede || "Sede non indicata"}</span>
                <span>{cespite.costruttore || "-"} · {cespite.modello || "-"}</span>
                <b>Apri →</b>
              </button>
            ))}
          </div>
        )}
      </div>

      <details className="p0-advanced">
        <summary>
          <span style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <span><b>Affina registro</b><small>Periodo, cespite, attività e date</small></span>
            <span className="p0-advanced__summary">Filtri multipli</span>
          </span>
        </summary>
        <div className="p0-filter-grid">
          <SelectField label="Cespite" value={filtroInterventiCodice} onChange={update(setFiltroInterventiCodice)}>
            <option value="TUTTE">Tutti i codici</option>
            {listaCodiciFiltroInterventi.map((v) => <option key={v} value={v}>{v}</option>)}
          </SelectField>
          <SelectField label="Sede" value={filtroInterventiSede} onChange={update(setFiltroInterventiSede)}>
            <option value="TUTTE">Tutte le sedi</option>
            {listaSediInterventi.map((v) => <option key={v} value={v}>{v}</option>)}
          </SelectField>
          <SelectField label="Società / ditta" value={filtroInterventiSocieta} onChange={update(setFiltroInterventiSocieta)}>
            <option value="TUTTE">Tutte le società e ditte</option>
            {listaSocietaInterventi.map((v) => <option key={v} value={v}>{v}</option>)}
          </SelectField>
          <SelectField label="Tipologia" value={filtroInterventiTipologia} onChange={update(setFiltroInterventiTipologia)}>
            <option value="TUTTE">Tutte le tipologie</option>
            {listaTipologieFiltroInterventi.map((v) => <option key={v} value={v}>{v}</option>)}
          </SelectField>
          <SelectField label="Attività" value={filtroInterventiAttivita} onChange={update(setFiltroInterventiAttivita)}>
            <option value="TUTTE">Tutte le attività</option>
            {listaAttivitaFiltroInterventi.map((v) => <option key={v} value={v}>{v}</option>)}
          </SelectField>
          <SelectField label="Anno contabile" value={filtroInterventiAnnoContabile} onChange={update(setFiltroInterventiAnnoContabile)}>
            {listaAnniContabiliInterventi.map((v) => <option key={v} value={v}>{v}</option>)}
          </SelectField>
          <SelectField label="Periodo" value={filtroInterventiPeriodoContabile} onChange={update(setFiltroInterventiPeriodoContabile)}>
            <option value="ANNO">Intero anno</option><option value="T1">1° trimestre</option>
            <option value="T2">2° trimestre</option><option value="T3">3° trimestre</option>
            <option value="T4">4° trimestre</option><option value="S1">1° semestre</option>
            <option value="S2">2° semestre</option><option value="PERSONALIZZATO">Periodo personalizzato</option>
          </SelectField>
          <SelectField label="Ordinamento" value={ordineInterventi} onChange={(e) => setOrdineInterventi(e.target.value)}>
            <option value="RECENTI">Più recenti</option><option value="VECCHI">Meno recenti</option>
          </SelectField>
          {filtroInterventiPeriodoContabile === "PERSONALIZZATO" && <>
            <DateField label="Periodo dal" value={filtroInterventiPeriodoDa} onChange={(e) => setFiltroInterventiPeriodoDa(e.target.value)} />
            <DateField label="Periodo al" value={filtroInterventiPeriodoA} onChange={(e) => setFiltroInterventiPeriodoA(e.target.value)} />
          </>}
          <DateField label="Ultimo intervento dal" value={filtroInterventiUltimoDa} onChange={(e) => setFiltroInterventiUltimoDa(e.target.value)} />
          <DateField label="Ultimo intervento al" value={filtroInterventiUltimoA} onChange={(e) => setFiltroInterventiUltimoA(e.target.value)} />
          <DateField label="Prossimo intervento dal" value={filtroInterventiProssimoDa} onChange={(e) => setFiltroInterventiProssimoDa(e.target.value)} />
          <DateField label="Prossimo intervento al" value={filtroInterventiProssimoA} onChange={(e) => setFiltroInterventiProssimoA(e.target.value)} />
        </div>
      </details>
      <div className="p0-command__actions p0-command__actions--complete">
        <button
          className="p0-btn p0-btn--maintenance"
          type="button"
          onClick={() => setInterventiElencoAperto((v) => !v)}
        >
          {interventiElencoAperto
            ? "Chiudi registro"
            : `Apri registro · ${interventiFiltrati.length}`}
        </button>

        <button
          className="p0-btn p0-btn--new"
          type="button"
          onClick={() => apriNuovoIntervento(null)}
        >
          + Nuovo intervento
        </button>

        {permessiRuoloFmed.canSeeCosts && (
          <button
            className="p0-btn p0-btn--costs"
            type="button"
            onClick={() => setPagina("Costi")}
          >
            Analizza costi
          </button>
        )}

        <button
          className="p0-btn p0-btn--pdf"
          type="button"
          onClick={esportaInterventiFiltratiPdf}
        >
          Esporta PDF
        </button>

        <button
          className="p0-btn p0-btn--excel"
          type="button"
          onClick={() => exportInterventiFmed("excel")}
        >
          Esporta Excel
        </button>

        <button
          className="p0-btn p0-btn--asset-history"
          type="button"
          disabled={cespitiPerNuovoIntervento.length !== 1}
          title={
            cespitiPerNuovoIntervento.length === 1
              ? "Apri la scheda del cespite e il relativo storico interventi"
              : "Cerca un solo cespite per abilitare questa azione"
          }
          onClick={() => {
            const cespite = cespitiPerNuovoIntervento[0];
            if (cespite) {
              setFiltroInterventiCodice(
                cespite.codicestrumento || cespite.codice_strumento || "TUTTE"
              );
              setInterventiElencoAperto(true);
            }
          }}
        >
          Scheda cespite / Storico
        </button>

        <button
          className="p0-btn p0-btn--history"
          type="button"
          onClick={() =>
            cambiaVistaStoricoInterventi?.(!interventiIncludeStorico)
          }
        >
          {interventiIncludeStorico
            ? "Vista operativa"
            : "Storico completo"}
        </button>

        <button
          className="p0-btn p0-btn--quiet"
          type="button"
          onClick={resetFiltriInterventi}
        >
          Azzera filtri
        </button>
      </div>
    </section>
  );
}
