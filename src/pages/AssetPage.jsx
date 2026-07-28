import AssetControls from "../components/asset/AssetControls";
import AssetHero from "../components/asset/AssetHero";
import CanonicalSelect from "../components/masterdata/CanonicalSelect.jsx";
import FmedIcon from "../components/ui/FmedIcon.jsx";

export default function AssetPage(props) {
  const {
    filtrati,
    cespiti,
    setAssetElencoAperto,
    listaBranche,
    listaSocieta,
    ordineCodiceAsset,
    setOrdineCodiceAsset,
    assetElencoAperto,
    assetAnalisiAperta,
    setAssetAnalisiAperta,
    setAssetBulkBranca,
    setAssetBulkSede,
    setAssetBulkLocazione,
    setAssetBulkStato,
    setAssetBulkSocieta,
    setAssetSelezionatiBulk,
    assetKpiFiltrati,
    assetPerSedeFiltrati,
    assetPerRepartoFiltrati,
    assetPerCostruttoreFiltrati,
    assetPerStatoFiltrati,
    assetSelezionatiBulk,
    assetBulkBranca,
    assetBulkSaving,
    assetBulkSocieta,
    assetBulkSede,
    listaSedi,
    assetBulkLocazione,
    getListaLocazioniPerSede,
    assetBulkStato,
    STATI_ASSET_STANDARD,
    salvaModificaMultiplaBrancaAsset,
    selezionaTuttiAssetFiltratiBulk,
    filtratiRenderizzati,
    getCodiceAssetBulk,
    toggleSelezioneAssetVisibiliBulk,
    assetQuickEditCodice,
    apriSchedaCespite,
    toggleSelezioneAssetBulk,
    assetQuickEditForm,
    aggiornaCampoModificaRapidaAsset,
    getBrancaAsset,
    getLocazioneFmed,
    statoCespite,
    coloreStatoAsset,
    assetQuickEditSaving,
    salvaModificaRapidaAsset,
    annullaModificaRapidaAsset,
    apriModificaRapidaAsset,
    setAssetRenderLimit,
    FMED_RENDER_BATCH_ASSET,
    apiBaseUrl,
    listaTipologie,
    listaCostruttori,
    listaModelli
  } = props;
  return (
    <div className={`fmed-asset-page ${assetAnalisiAperta ? "is-workspace-open" : ""}`}>
            <AssetHero
        filteredCount={filtrati.length}
        totalCount={cespiti.length} />
      

            <AssetControls {...props} />

            <div className="fmed-operational-kpi-grid fmed-style-asset-kpi-grid" style={{

        ...{}
      }}>
              <div className="fmed-operational-kpi-card fmed-style-asset-kpi-card">
                <div className="fmed-style-asset-kpi-top"><span className="fmed-kpi-icon fmed-style-asset-kpi-icon"><FmedIcon name="box" /></span><span className="fmed-style-asset-kpi-label">Asset filtrati</span></div>
                <strong className="fmed-style-asset-kpi-value">{assetKpiFiltrati.totale}</strong>
                <span className="fmed-style-asset-kpi-hint">su {cespiti.length} totali</span>
              </div>
              <div className="fmed-operational-kpi-card fmed-style-asset-kpi-card">
                <div className="fmed-style-asset-kpi-top"><span className="fmed-kpi-icon fmed-style-asset-kpi-icon"><FmedIcon name="check" /></span><span className="fmed-style-asset-kpi-label">Attivi</span></div>
                <strong style={{

            color: "#2FD37D"
          }} className="fmed-style-asset-kpi-value">{assetKpiFiltrati.attivi}</strong>
                <span className="fmed-style-asset-kpi-hint">operativi</span>
              </div>
              <div className="fmed-operational-kpi-card fmed-style-asset-kpi-card">
                <div className="fmed-style-asset-kpi-top"><span className="fmed-kpi-icon fmed-style-asset-kpi-icon"><FmedIcon name="archive" /></span><span className="fmed-style-asset-kpi-label">Dismessi</span></div>
                <strong style={{

            color: "#FF4D5E"
          }} className="fmed-style-asset-kpi-value">{assetKpiFiltrati.dismessi}</strong>
                <span className="fmed-style-asset-kpi-hint">fuori inventario attivo</span>
              </div>
              <div className="fmed-operational-kpi-card fmed-style-asset-kpi-card">
                <div className="fmed-style-asset-kpi-top"><span className="fmed-kpi-icon fmed-style-asset-kpi-icon"><FmedIcon name="pause" /></span><span className="fmed-style-asset-kpi-label">Non in uso</span></div>
                <strong style={{

            color: "#D99A00"
          }} className="fmed-style-asset-kpi-value">{assetKpiFiltrati.nonInUso}</strong>
                <span className="fmed-style-asset-kpi-hint">da verificare</span>
              </div>
            </div>

            {assetAnalisiAperta && <section className="fmed-workspace-page fmed-asset-analysis-page">
              <header className="fmed-workspace-header">
                <div>
                  <span>Analisi asset filtrati</span>
                  <h2>Distribuzione e indicatori dell’inventario</h2>
                  <p>I dati rispettano i filtri impostati nell’elenco Asset. Tornando indietro ritroverai ricerca, filtri e selezioni invariati.</p>
                </div>
                <button type="button" className="fmed-workspace-back" onClick={() => setAssetAnalisiAperta(false)}>
                  <FmedIcon name="close" /> Torna agli asset
                </button>
              </header>
              <div className="fmed-workspace-surface fmed-asset-analysis-grid fmed-style-asset-analysis-grid" style={{

          ...{}
        }}>
                <div className="fmed-style-asset-analysis-card">
                  <h3 className="fmed-style-asset-analysis-title"> Distribuzione per sede</h3>
                  <div className="fmed-style-asset-rank-list">{assetPerSedeFiltrati.map((r) => <div key={r.nome} className="fmed-style-asset-rank-row"><span>{r.nome}</span><strong>{r.totale}</strong></div>)}</div>
                </div>

                <div className="fmed-style-asset-analysis-card">
                  <h3 className="fmed-style-asset-analysis-title"> Distribuzione per branca</h3>
                  <div className="fmed-style-asset-rank-list">{assetPerRepartoFiltrati.map((r) => <div key={r.nome} className="fmed-style-asset-rank-row"><span>{r.nome}</span><strong>{r.totale}</strong></div>)}</div>
                </div>

                <div className="fmed-style-asset-analysis-card">
                  <h3 className="fmed-style-asset-analysis-title"> Costruttori principali</h3>
                  <div className="fmed-style-asset-rank-list">{assetPerCostruttoreFiltrati.map((r) => <div key={r.nome} className="fmed-style-asset-rank-row"><span>{r.nome}</span><strong>{r.totale}</strong></div>)}</div>
                </div>

                <div className="fmed-style-asset-analysis-card">
                  <h3 className="fmed-style-asset-analysis-title"> Stato asset</h3>
                  <div className="fmed-style-asset-rank-list">{assetPerStatoFiltrati.map((r) => <div key={r.nome} className="fmed-style-asset-rank-row"><span>{r.nome}</span><strong>{r.totale}</strong></div>)}</div>
                </div>
              </div>
            </section>}

            {assetElencoAperto && <div className="fmed-operational-table-card fmed-style-asset-table-card" style={{

        ...{}
      }}>
                <div style={{

          ...{}
        }} className="fmed-style-asset-list-header">
                  <div>
                    <h3 className="fmed-style-asset-table-title">Elenco asset filtrati</h3>
                    <p className="fmed-style-asset-table-subtitle">{filtrati.length} risultati su {cespiti.length}. Puoi modificare i campi principali direttamente dalla riga senza aprire la scheda.</p>
                  </div>
                  <button onClick={() => setAssetElencoAperto(false)} className="fmed-style-asset-close-btn">Chiudi</button>
                </div>

                <div className="fmed-asset-bulk-toolbar fmed-literal-fa894ec0f3"










        onClick={(e) => e.stopPropagation()}>
                  <strong className="fmed-asset-bulk-title fmed-literal-4e7f276551">


            ✓ MODIFICA MULTIPLA ASSET</strong>
                  <span className="fmed-asset-bulk-count fmed-literal-e8b2a0c170">


            {assetSelezionatiBulk.length} SELEZIONATI</span>
                  <CanonicalSelect label="" dictionary="BRANCHE_MEDICHE" value={assetBulkBranca} disabled={assetBulkSaving} onChange={setAssetBulkBranca} options={listaBranche} placeholder="BRANCA: NON MODIFICARE" apiBaseUrl={apiBaseUrl} className="fmed-literal-ce00a8596c" />
                  <CanonicalSelect label="" dictionary="SOCIETA" value={assetBulkSocieta} disabled={assetBulkSaving} onChange={setAssetBulkSocieta} options={listaSocieta} placeholder="SOCIETÀ: NON MODIFICARE" apiBaseUrl={apiBaseUrl} className="fmed-literal-c19bde92bd" />
                  <CanonicalSelect label="" dictionary="SEDI" value={assetBulkSede} disabled={assetBulkSaving} onChange={(value) => {setAssetBulkSede(value);setAssetBulkLocazione("");}} options={listaSedi} placeholder="SEDE: NON MODIFICARE" apiBaseUrl={apiBaseUrl} className="fmed-literal-ec7da2fb95" />
                  <CanonicalSelect label="" dictionary="LOCAZIONI" value={assetBulkLocazione} disabled={assetBulkSaving || !assetBulkSede} onChange={setAssetBulkLocazione} options={getListaLocazioniPerSede(assetBulkSede || "TUTTE", assetBulkLocazione, true)} placeholder="LOCAZIONE: NON MODIFICARE" apiBaseUrl={apiBaseUrl} restrictToOptions className="fmed-literal-e77da17ecd" />
                  <CanonicalSelect label="" dictionary="STATI_ASSET" value={assetBulkStato} disabled={assetBulkSaving} onChange={setAssetBulkStato} options={STATI_ASSET_STANDARD} placeholder="STATO: NON MODIFICARE" apiBaseUrl={apiBaseUrl} className="fmed-literal-9b2a561810" />
                  <button type="button" style={{

            padding: "9px 14px",
            borderRadius: 12
          }} disabled={assetBulkSaving || assetSelezionatiBulk.length === 0 || !(assetBulkBranca || assetBulkSede || assetBulkLocazione || assetBulkStato || assetBulkSocieta)} onClick={salvaModificaMultiplaBrancaAsset} className="fmed-style-asset-quick-save-btn">
                    {assetBulkSaving ? "SALVATAGGIO..." : " APPLICA MODIFICHE"}
                  </button>
                  <button type="button" style={{

            padding: "9px 12px"
          }} disabled={assetBulkSaving} onClick={selezionaTuttiAssetFiltratiBulk} className="fmed-style-asset-quick-edit-btn">
                    SELEZIONA TUTTI I FILTRATI
                  </button>
                  <button type="button" style={{

            padding: "9px 12px",
            borderRadius: 12
          }} disabled={assetBulkSaving || assetSelezionatiBulk.length === 0} onClick={() => setAssetSelezionatiBulk([])} className="fmed-style-asset-quick-cancel-btn">
                    PULISCI SELEZIONE
                  </button>
                </div>

                {<div className="fmed-asset-table-wrap fmed-style-table-wrap">
                    <table className="fmed-asset-table fmed-style-table-large">
                      <thead>
                        <tr>
                          <th className="fmed-style-th-large">
                            <input type="checkbox" aria-label="Seleziona asset visibili" checked={filtratiRenderizzati.length > 0 && filtratiRenderizzati.every((c) => assetSelezionatiBulk.includes(getCodiceAssetBulk(c)))} onChange={(e) => toggleSelezioneAssetVisibiliBulk(e.target.checked)} />
                          </th>
                          <th style={{


                  cursor: "pointer"
                }} onClick={() => setOrdineCodiceAsset(ordineCodiceAsset === "CODICE_ASC" ? "CODICE_DESC" : "CODICE_ASC")} className="fmed-style-th-large fmed-style-asset-sticky-col">CODICE ↕</th>
                          <th style={{

                  cursor: "pointer"
                }} onClick={() => setOrdineCodiceAsset("TIPOLOGIA_ASC")} className="fmed-style-th-large">TIPOLOGIA ↕</th>
                          <th style={{

                  cursor: "pointer"
                }} onClick={() => setOrdineCodiceAsset("SEDE_ASC")} className="fmed-style-th-large">SEDE ↕</th>
                          <th style={{

                  cursor: "pointer"
                }} onClick={() => setOrdineCodiceAsset("REPARTO_ASC")} className="fmed-style-th-large">BRANCA ↕</th>
                          <th style={{

                  cursor: "pointer"
                }} onClick={() => setOrdineCodiceAsset("LOCAZIONE_ASC")} className="fmed-style-th-large">LOCAZIONE ↕</th>
                          <th style={{

                  cursor: "pointer"
                }} onClick={() => setOrdineCodiceAsset("COSTRUTTORE_ASC")} className="fmed-style-th-large">COSTRUTTORE ↕</th>
                          <th className="fmed-style-th-large">MODELLO</th>
                          <th style={{

                  cursor: "pointer"
                }} onClick={() => setOrdineCodiceAsset("STATO_ASC")} className="fmed-style-th-large">STATO ↕</th>
                          <th className="fmed-style-th-large">AZIONI</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtratiRenderizzati.map((c, i) => {
                const codiceRiga = String(c?.codicestrumento || c?.codice_strumento || c?.codice || "").trim();
                const inEdit = assetQuickEditCodice === codiceRiga;
                return <tr key={codiceRiga || i} onClick={() => !inEdit && apriSchedaCespite(c)} className="fmed-style-tr-clickable">
                              <td onClick={(e) => e.stopPropagation()} className="fmed-style-td-large">
                                <input type="checkbox" aria-label={`Seleziona asset ${codiceRiga}`} checked={assetSelezionatiBulk.includes(codiceRiga)} onChange={(e) => toggleSelezioneAssetBulk(codiceRiga, e.target.checked)} />
                              </td>
                              <td className="fmed-style-td-code-large fmed-style-asset-sticky-col-body">


                    {codiceRiga}</td>
                              <td className="fmed-style-td-large">
                                {inEdit ? <div onClick={(e) => e.stopPropagation()}><CanonicalSelect dictionary="TIPOLOGIE_ASSET" value={assetQuickEditForm.tipologia || ""} onChange={(value) => aggiornaCampoModificaRapidaAsset("tipologia", value)} options={listaTipologie} apiBaseUrl={apiBaseUrl} /></div> : c.tipologia}
                              </td>
                              <td className="fmed-style-td-large">
                                {inEdit ? <div onClick={(e) => e.stopPropagation()}><CanonicalSelect dictionary="SEDI" value={assetQuickEditForm.sede || c.sede || ""} onChange={(value) => {aggiornaCampoModificaRapidaAsset("sede", value);aggiornaCampoModificaRapidaAsset("locazione", "");}} options={listaSedi} apiBaseUrl={apiBaseUrl} /></div> : c.sede}
                              </td>
                              <td className="fmed-style-td-large">
                                {inEdit ? <div onClick={(e) => e.stopPropagation()}><CanonicalSelect dictionary="BRANCHE_MEDICHE" value={assetQuickEditForm.branca_medica || ""} onChange={(value) => aggiornaCampoModificaRapidaAsset("branca_medica", value)} options={listaBranche} apiBaseUrl={apiBaseUrl} /></div> : getBrancaAsset(c) || "-"}
                              </td>
                              <td className="fmed-style-td-large">
                                {inEdit ? <div onClick={(e) => e.stopPropagation()}><CanonicalSelect dictionary="LOCAZIONI" value={assetQuickEditForm.locazione || ""} onChange={(value) => aggiornaCampoModificaRapidaAsset("locazione", value)} options={getListaLocazioniPerSede(assetQuickEditForm.sede || c.sede || "TUTTE", assetQuickEditForm.locazione || getLocazioneFmed(c), true)} apiBaseUrl={apiBaseUrl} restrictToOptions /></div> : getLocazioneFmed(c) || "-"}
                              </td>
                              <td className="fmed-style-td-large">
                                {inEdit ? <div onClick={(e) => e.stopPropagation()}><CanonicalSelect dictionary="COSTRUTTORI" value={assetQuickEditForm.costruttore || ""} onChange={(value) => aggiornaCampoModificaRapidaAsset("costruttore", value)} options={listaCostruttori} apiBaseUrl={apiBaseUrl} /></div> : c.costruttore}
                              </td>
                              <td className="fmed-style-td-large">
                                {inEdit ? <div onClick={(e) => e.stopPropagation()}><CanonicalSelect dictionary="MODELLI" value={assetQuickEditForm.modello || ""} onChange={(value) => aggiornaCampoModificaRapidaAsset("modello", value)} options={listaModelli} apiBaseUrl={apiBaseUrl} /></div> : c.modello}
                              </td>
                              <td className="fmed-style-td-large">
                                {inEdit ? <div onClick={(e) => e.stopPropagation()}><CanonicalSelect dictionary="STATI_ASSET" value={assetQuickEditForm.stato_asset || statoCespite(c)} onChange={(value) => aggiornaCampoModificaRapidaAsset("stato_asset", value)} options={STATI_ASSET_STANDARD} apiBaseUrl={apiBaseUrl} /></div> : <>
                                    <span style={{

                        background: coloreStatoAsset(statoCespite(c))
                      }} className="fmed-style-status-dot" />
                                    {statoCespite(c)}
                                  </>}
                              </td>
                              <td onClick={(e) => e.stopPropagation()} className="fmed-style-td-large">
                                {inEdit ? <div className="fmed-style-asset-quick-actions">
                                    <button type="button" className="fmed-table-icon-action is-save fmed-style-asset-quick-save-btn" disabled={assetQuickEditSaving} onClick={() => salvaModificaRapidaAsset(c)} aria-label="Salva modifiche" title="Salva modifiche"><FmedIcon name="save" /></button>
                                    <button type="button" className="fmed-table-icon-action is-cancel fmed-style-asset-quick-cancel-btn" disabled={assetQuickEditSaving} onClick={annullaModificaRapidaAsset} aria-label="Annulla modifiche" title="Annulla modifiche"><FmedIcon name="close" /></button>
                                  </div> : <button type="button" className="fmed-table-edit-action fmed-style-asset-quick-edit-btn" onClick={() => apriModificaRapidaAsset(c)}><FmedIcon name="edit" /> Modifica</button>}
                              </td>
                            </tr>;
              })}
                      </tbody>
                    </table>
                  </div>}
                {filtrati.length > filtratiRenderizzati.length && <div className="fmed-style-load-more-row">
                    <button type="button" onClick={() => setAssetRenderLimit((v) => v + FMED_RENDER_BATCH_ASSET)} className="fmed-style-asset-secondary-action">
                      Mostra altri asset ({filtratiRenderizzati.length}/{filtrati.length})
                    </button>
                  </div>}
              </div>}
          </div>);

}
