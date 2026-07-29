import AssetControls from "../components/asset/AssetControls";
import CanonicalSelect from "../components/masterdata/CanonicalSelect.jsx";
import FmedIcon from "../components/ui/FmedIcon.jsx";

const Kpi = ({ tone, icon, label, value, detail }) => <article className="p0-asset-kpi" style={{ "--tone": tone }}>
  <span className="p0-asset-kpi-icon"><FmedIcon name={icon} /></span>
  <div><small>{label}</small><strong>{Number(value || 0).toLocaleString("it-IT")}</strong><em>{detail}</em></div>
</article>;

export default function AssetPage(props) {
  const {
    filtrati = [],
    cespiti = [],
    assetElencoAperto = false,
    setAssetElencoAperto = () => {},
    assetAnalisiAperta = false,
    setAssetAnalisiAperta = () => {},
    assetKpiFiltrati = { totale: 0, attivi: 0, dismessi: 0, nonInUso: 0 },
    assetPerSedeFiltrati = [],
    assetPerRepartoFiltrati = [],
    assetPerCostruttoreFiltrati = [],
    assetPerStatoFiltrati = [],
    filtratiRenderizzati = [],
    apriSchedaCespite = () => {},
    getCodiceAssetBulk = (asset) => String(asset?.codicestrumento || asset?.codice_strumento || asset?.codice || ''),
    getBrancaAsset = () => '',
    getLocazioneFmed = () => '',
    statoCespite = () => 'NON SPECIFICATO',
    coloreStatoAsset = () => '#7d8da3',
    assetSelezionatiBulk = [],
    toggleSelezioneAssetBulk = () => {},
    toggleSelezioneAssetVisibiliBulk = () => {},
    assetQuickEditCodice,
    assetQuickEditForm = {},
    aggiornaCampoModificaRapidaAsset = () => {},
    apriModificaRapidaAsset = () => {},
    salvaModificaRapidaAsset = () => {},
    annullaModificaRapidaAsset = () => {},
    assetQuickEditSaving,
    listaTipologie = [],
    listaSedi = [],
    listaBranche = [],
    getListaLocazioniPerSede = () => [],
    listaCostruttori = [],
    listaModelli = [],
    STATI_ASSET_STANDARD = [],
    apiBaseUrl,
    setAssetRenderLimit = () => {},
    FMED_RENDER_BATCH_ASSET,
    assetBulkBranca,
    setAssetBulkBranca = () => {},
    assetBulkSocieta,
    setAssetBulkSocieta = () => {},
    listaSocieta = [],
    assetBulkSede,
    setAssetBulkSede = () => {},
    assetBulkLocazione,
    setAssetBulkLocazione = () => {},
    assetBulkStato,
    setAssetBulkStato = () => {},
    assetBulkSaving,
    salvaModificaMultiplaBrancaAsset = () => {},
    selezionaTuttiAssetFiltratiBulk = () => {},
    setAssetSelezionatiBulk = () => {}
  } = props || {};

  return <main className={`p0-asset-page ${assetElencoAperto ? "has-results" : ""}`}>
    <header className="p0-asset-hero">
      <div className="p0-asset-hero-icon"><FmedIcon name="box" /></div>
      <div><span>INVENTARIO TECNICO</span><h1>Gestione asset</h1><p>Cerca, riconosci e governa ogni bene dalla stessa superficie operativa.</p></div>
      <div className="p0-asset-total"><strong>{filtrati.length.toLocaleString("it-IT")}</strong><span>asset visualizzati</span><small>su {cespiti.length.toLocaleString("it-IT")} totali</small></div>
    </header>

    <section className="p0-asset-deck">
      <div className="p0-asset-search-copy"><span>RICERCA INVENTARIO</span><h2>Trova un bene</h2><p>Imposta solo i criteri necessari. I risultati restano nello stesso ambiente.</p></div>
      <AssetControls {...props} />

      {!assetElencoAperto && <div className="p0-asset-kpis">
        <Kpi tone="#2f76e8" icon="box" label="Asset filtrati" value={assetKpiFiltrati.totale} detail={`su ${cespiti.length.toLocaleString("it-IT")} totali`} />
        <Kpi tone="#13aa91" icon="check" label="Attivi" value={assetKpiFiltrati.attivi} detail="operativi" />
        <Kpi tone="#8d4cf2" icon="archive" label="Dismessi" value={assetKpiFiltrati.dismessi} detail="fuori inventario attivo" />
        <Kpi tone="#e88713" icon="pause" label="Non in uso" value={assetKpiFiltrati.nonInUso} detail="da verificare" />
      </div>}

      {assetElencoAperto && <section className="p0-asset-results" aria-label="Elenco asset filtrati">
        <div className="p0-asset-results-head">
          <div><span>RISULTATI</span><h2>{filtrati.length.toLocaleString("it-IT")} asset trovati</h2></div>
          <div><button type="button" onClick={selezionaTuttiAssetFiltratiBulk}>Seleziona tutti</button><button type="button" onClick={() => setAssetElencoAperto(false)}>Chiudi elenco</button></div>
        </div>

        {assetSelezionatiBulk.length > 0 && <div className="p0-asset-bulk">
          <strong>{assetSelezionatiBulk.length} selezionati</strong>
          <CanonicalSelect dictionary="BRANCHE_MEDICHE" value={assetBulkBranca} onChange={setAssetBulkBranca} options={listaBranche} placeholder="Branca: non modificare" apiBaseUrl={apiBaseUrl} />
          <CanonicalSelect dictionary="SOCIETA" value={assetBulkSocieta} onChange={setAssetBulkSocieta} options={listaSocieta} placeholder="Società: non modificare" apiBaseUrl={apiBaseUrl} />
          <CanonicalSelect dictionary="SEDI" value={assetBulkSede} onChange={(value) => { setAssetBulkSede(value); setAssetBulkLocazione(""); }} options={listaSedi} placeholder="Sede: non modificare" apiBaseUrl={apiBaseUrl} />
          <CanonicalSelect dictionary="LOCAZIONI" value={assetBulkLocazione} disabled={!assetBulkSede} onChange={setAssetBulkLocazione} options={getListaLocazioniPerSede(assetBulkSede || "TUTTE", assetBulkLocazione, true)} placeholder="Locazione: non modificare" apiBaseUrl={apiBaseUrl} restrictToOptions />
          <CanonicalSelect dictionary="STATI_ASSET" value={assetBulkStato} onChange={setAssetBulkStato} options={STATI_ASSET_STANDARD} placeholder="Stato: non modificare" apiBaseUrl={apiBaseUrl} />
          <button type="button" className="is-apply" disabled={assetBulkSaving} onClick={salvaModificaMultiplaBrancaAsset}>Applica</button>
          <button type="button" onClick={() => setAssetSelezionatiBulk([])}>Annulla</button>
        </div>}

        <div className="p0-asset-list">
          <div className="p0-asset-list-labels"><input type="checkbox" aria-label="Seleziona asset visibili" checked={filtratiRenderizzati.length > 0 && filtratiRenderizzati.every((c) => assetSelezionatiBulk.includes(getCodiceAssetBulk(c)))} onChange={(event) => toggleSelezioneAssetVisibiliBulk(event.target.checked)} /><span>Codice e bene</span><span>Posizione</span><span>Stato</span><span>Azioni</span></div>
          {filtratiRenderizzati.map((asset, index) => {
            const code = String(asset?.codicestrumento || asset?.codice_strumento || asset?.codice || "").trim();
            const editing = assetQuickEditCodice === code;
            return <article className={`p0-asset-row ${editing ? "is-editing" : ""}`} key={code || index}>
              <input type="checkbox" aria-label={`Seleziona ${code}`} checked={assetSelezionatiBulk.includes(code)} onChange={(event) => toggleSelezioneAssetBulk(code, event.target.checked)} />
              <button type="button" className="p0-asset-open" onClick={() => !editing && apriSchedaCespite(asset)}>
                <span>{code}</span><strong>{asset.tipologia || asset.modello || "Asset senza descrizione"}</strong><small>{asset.costruttore || "Costruttore non indicato"} · {asset.modello || "Modello non indicato"}</small>
              </button>
              <div className="p0-asset-location"><strong>{asset.sede || "Sede non indicata"}</strong><span>{getBrancaAsset(asset) || "Branca non indicata"}</span><small>{getLocazioneFmed(asset) || "Locazione non indicata"}</small></div>
              <span className="p0-asset-state" style={{ "--state": coloreStatoAsset(statoCespite(asset)) }}>{statoCespite(asset)}</span>
              <div className="p0-asset-row-actions">
                <button type="button" onClick={() => apriSchedaCespite(asset)}>Apri</button>
                <button type="button" onClick={() => apriModificaRapidaAsset(asset)}>Modifica</button>
              </div>
              {editing && <div className="p0-asset-quickedit">
                <CanonicalSelect label="Tipologia" dictionary="TIPOLOGIE_ASSET" value={assetQuickEditForm.tipologia || ""} onChange={(value) => aggiornaCampoModificaRapidaAsset("tipologia", value)} options={listaTipologie} apiBaseUrl={apiBaseUrl} />
                <CanonicalSelect label="Sede" dictionary="SEDI" value={assetQuickEditForm.sede || asset.sede || ""} onChange={(value) => aggiornaCampoModificaRapidaAsset("sede", value)} options={listaSedi} apiBaseUrl={apiBaseUrl} />
                <CanonicalSelect label="Branca" dictionary="BRANCHE_MEDICHE" value={assetQuickEditForm.branca_medica || ""} onChange={(value) => aggiornaCampoModificaRapidaAsset("branca_medica", value)} options={listaBranche} apiBaseUrl={apiBaseUrl} />
                <CanonicalSelect label="Locazione" dictionary="LOCAZIONI" value={assetQuickEditForm.locazione || ""} onChange={(value) => aggiornaCampoModificaRapidaAsset("locazione", value)} options={getListaLocazioniPerSede(assetQuickEditForm.sede || asset.sede || "TUTTE", assetQuickEditForm.locazione || getLocazioneFmed(asset), true)} apiBaseUrl={apiBaseUrl} restrictToOptions />
                <CanonicalSelect label="Costruttore" dictionary="COSTRUTTORI" value={assetQuickEditForm.costruttore || ""} onChange={(value) => aggiornaCampoModificaRapidaAsset("costruttore", value)} options={listaCostruttori} apiBaseUrl={apiBaseUrl} />
                <CanonicalSelect label="Modello" dictionary="MODELLI" value={assetQuickEditForm.modello || ""} onChange={(value) => aggiornaCampoModificaRapidaAsset("modello", value)} options={listaModelli} apiBaseUrl={apiBaseUrl} />
                <CanonicalSelect label="Stato" dictionary="STATI_ASSET" value={assetQuickEditForm.stato_asset || statoCespite(asset)} onChange={(value) => aggiornaCampoModificaRapidaAsset("stato_asset", value)} options={STATI_ASSET_STANDARD} apiBaseUrl={apiBaseUrl} />
                <div><button type="button" disabled={assetQuickEditSaving} onClick={() => salvaModificaRapidaAsset(asset)}>Salva</button><button type="button" onClick={annullaModificaRapidaAsset}>Annulla</button></div>
              </div>}
            </article>;
          })}
        </div>
        {filtrati.length > filtratiRenderizzati.length && <button type="button" className="p0-asset-more" onClick={() => setAssetRenderLimit((value) => value + FMED_RENDER_BATCH_ASSET)}>Mostra altri ({filtratiRenderizzati.length}/{filtrati.length})</button>}
      </section>}
    </section>

    {assetAnalisiAperta && <section className="p0-asset-analysis">
      <header><div><span>ANALISI INVENTARIO</span><h2>Distribuzione degli asset filtrati</h2></div><button type="button" onClick={() => setAssetAnalisiAperta(false)}>Chiudi</button></header>
      <div>{[
        ["Per sede", assetPerSedeFiltrati],
        ["Per branca", assetPerRepartoFiltrati],
        ["Costruttori", assetPerCostruttoreFiltrati],
        ["Per stato", assetPerStatoFiltrati],
      ].map(([title, rows]) => <article key={title}><h3>{title}</h3>{rows.map((row) => <div key={row.nome}><span>{row.nome}</span><strong>{row.totale}</strong></div>)}</article>)}</div>
    </section>}
  </main>;
}
