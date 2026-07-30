function AssetSelect({ label, value, onChange, children }) {
  return <label className="p0-asset-filter">
    <span>{label}</span>
    <select value={value} onChange={onChange}>{children}</select>
  </label>;
}

export default function AssetControls(props) {
  const {
    sede = 'TUTTE',
    categoriaFiltro = 'TUTTE',
    assetLocazioneFiltro = 'TUTTE',
    assetStatoFiltro = 'TUTTI',
    ricerca = '',
    setRicerca = () => {},
    setAssetElencoAperto = () => {},
    setSede = () => {},
    setAssetLocazioneFiltro = () => {},
    listaSediAsset = [],
    setCategoriaFiltro = () => {},
    listaCategorie = [],
    formatCategoria = (value) => value,
    assetRepartoFiltro = 'TUTTI',
    setAssetRepartoFiltro = () => {},
    listaBranche = [],
    listaLocazioniAsset = [],
    assetTipologiaFiltro = 'TUTTE',
    setAssetTipologiaFiltro = () => {},
    listaTipologie = [],
    assetCostruttoreFiltro = 'TUTTI',
    setAssetCostruttoreFiltro = () => {},
    listaCostruttori = [],
    assetModelloFiltro = 'TUTTI',
    setAssetModelloFiltro = () => {},
    listaModelli = [],
    assetSocietaFiltro = 'TUTTE',
    setAssetSocietaFiltro = () => {},
    listaSocieta = [],
    setAssetStatoFiltro = () => {},
    listaStatiAsset = [],
    ordineCodiceAsset = 'CODICE_ASC',
    setOrdineCodiceAsset = () => {},
    setAssetAnalisiAperta = () => {},
    setAssetBulkBranca = () => {},
    setAssetBulkSede = () => {},
    setAssetBulkLocazione = () => {},
    setAssetBulkStato = () => {},
    setAssetBulkSocieta = () => {},
    setAssetSelezionatiBulk = () => {},
    setCodiceCespiteAutomatico = () => {},
    avviaProcessoGuidatoFmed = () => {},
    setImpostazioniTab = () => {},
    setPagina = () => {}
  } = props || {};

  const filtersChanged = () => setAssetElencoAperto(false);
  const resetFilters = () => {
    setRicerca("");
    setSede("TUTTE");
    setCategoriaFiltro("TUTTE");
    setAssetRepartoFiltro("TUTTI");
    setAssetLocazioneFiltro("TUTTE");
    setAssetCostruttoreFiltro("TUTTI");
    setAssetTipologiaFiltro("TUTTE");
    setAssetModelloFiltro("TUTTI");
    setAssetSocietaFiltro("TUTTE");
    setAssetStatoFiltro("TUTTI");
    setOrdineCodiceAsset("CODICE_ASC");
    setAssetBulkBranca("");
    setAssetBulkSede("");
    setAssetBulkLocazione("");
    setAssetBulkStato("");
    setAssetBulkSocieta("");
    setAssetSelezionatiBulk([]);
  };

  return <section className="p0-asset-search" aria-label="Ricerca e filtri asset">
    <div className="p0-asset-searchbar">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></svg>
      <input
        aria-label="Cerca un asset"
        placeholder="Codice, matricola, modello, costruttore o tipologia"
        value={ricerca}
        onChange={(event) => { setRicerca(event.target.value); filtersChanged(); }}
      />
      <button type="button" onClick={() => setAssetElencoAperto(true)}>Mostra risultati</button>
    </div>

    <div className="p0-asset-filter-grid">
      <AssetSelect label="Sede" value={sede} onChange={(event) => { setSede(event.target.value); setAssetLocazioneFiltro("TUTTE"); filtersChanged(); }}>
        {listaSediAsset.map((item) => <option key={item}>{item}</option>)}
      </AssetSelect>
      <AssetSelect label="Categoria" value={categoriaFiltro} onChange={(event) => { setCategoriaFiltro(event.target.value); filtersChanged(); }}>
        <option value="TUTTE">Tutte le categorie</option>
        {listaCategorie.map((item) => <option key={item} value={item}>{formatCategoria(item)}</option>)}
      </AssetSelect>
      <AssetSelect label="Branca" value={assetRepartoFiltro} onChange={(event) => { setAssetRepartoFiltro(event.target.value); filtersChanged(); }}>
        <option value="TUTTI">Tutte le branche</option>
        {listaBranche.map((item) => <option key={item}>{item}</option>)}
      </AssetSelect>
      <AssetSelect label="Locazione" value={assetLocazioneFiltro} onChange={(event) => { setAssetLocazioneFiltro(event.target.value); filtersChanged(); }}>
        <option value="TUTTE">Tutte le locazioni</option>
        {listaLocazioniAsset.map((item) => <option key={item}>{item}</option>)}
      </AssetSelect>
      <AssetSelect label="Tipologia" value={assetTipologiaFiltro} onChange={(event) => { setAssetTipologiaFiltro(event.target.value); filtersChanged(); }}>
        <option value="TUTTE">Tutte le tipologie</option>
        {listaTipologie.map((item) => <option key={item}>{item}</option>)}
      </AssetSelect>
      <AssetSelect label="Costruttore" value={assetCostruttoreFiltro} onChange={(event) => { setAssetCostruttoreFiltro(event.target.value); filtersChanged(); }}>
        <option value="TUTTI">Tutti i costruttori</option>
        {listaCostruttori.map((item) => <option key={item}>{item}</option>)}
      </AssetSelect>
      <AssetSelect label="Modello" value={assetModelloFiltro} onChange={(event) => { setAssetModelloFiltro(event.target.value); filtersChanged(); }}>
        <option value="TUTTI">Tutti i modelli</option>
        {listaModelli.map((item) => <option key={item}>{item}</option>)}
      </AssetSelect>
      <AssetSelect label="Societa' " value={assetSocietaFiltro} onChange={(event) => { setAssetSocietaFiltro(event.target.value); setSede("TUTTE"); setAssetLocazioneFiltro("TUTTE"); filtersChanged(); }}>
        <option value="TUTTE">Tutte le societa' </option>
        {listaSocieta.map((item) => <option key={item}>{item}</option>)}
      </AssetSelect>
      <AssetSelect label="Stato" value={assetStatoFiltro} onChange={(event) => { setAssetStatoFiltro(event.target.value); filtersChanged(); }}>
        <option value="TUTTI">Tutti gli stati</option>
        {listaStatiAsset.map((item) => <option key={item}>{item}</option>)}
      </AssetSelect>
      <AssetSelect label="Ordinamento" value={ordineCodiceAsset} onChange={(event) => setOrdineCodiceAsset(event.target.value)}>
        <option value="CODICE_ASC">Codice crescente</option>
        <option value="CODICE_DESC">Codice decrescente</option>
        <option value="LOCAZIONE_ASC">Locazione</option>
        <option value="REPARTO_ASC">Branca</option>
        <option value="SEDE_ASC">Sede</option>
        <option value="TIPOLOGIA_ASC">Tipologia</option>
        <option value="COSTRUTTORE_ASC">Costruttore</option>
        <option value="STATO_ASC">Stato</option>
      </AssetSelect>
    </div>

    <div className="p0-asset-commandbar">
      <button type="button" className="is-primary" onClick={() => setAssetElencoAperto(true)}>Apri elenco filtrato</button>
      <button type="button" onClick={() => setAssetAnalisiAperta(true)}>Analizza asset</button>
      <button type="button" onClick={() => { setCodiceCespiteAutomatico(true); avviaProcessoGuidatoFmed("NUOVO_ASSET"); }}>Nuovo asset</button>
      <button type="button" onClick={() => { setImpostazioniTab("MASTER_DATA"); setPagina("Dizionari"); }}>Master Data</button>
      <button type="button" className="is-quiet" onClick={resetFilters}>Azzera filtri</button>
      <div className="p0-asset-active-filters">
        <span>Sede: {sede}</span><span>Stato: {assetStatoFiltro}</span>
      </div>
    </div>
  </section>;
}

