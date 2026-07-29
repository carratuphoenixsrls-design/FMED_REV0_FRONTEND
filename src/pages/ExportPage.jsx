import FmedModuleIcon from "../components/FmedModuleIcon.jsx";
export default function ExportPage(props) {
  const {
    fmedAuditQualitaDati,
    exportAuditQualitaDatiFmed,
    setExportPanelAperto,
    exportPanelAperto,
    exportSedeInventario,
    setExportSedeInventario,
    listaSedi,
    exportStatoInventario,
    setExportStatoInventario,
    listaStatiAsset,
    exportCategoriaInventario,
    setExportCategoriaInventario,
    listaCategorie,
    formatCategoria,
    exportTipologiaInventario,
    setExportTipologiaInventario,
    listaTipologie,
    exportCostruttoreInventario,
    setExportCostruttoreInventario,
    listaCostruttori,
    exportRepartoInventario,
    setExportRepartoInventario,
    listaReparti,
    exportSocietaInventario,
    setExportSocietaInventario,
    listaSocieta,
    exportLocazioneInventario,
    setExportLocazioneInventario,
    listaLocazioniExportInventario,
    exportOrdineInventario,
    setExportOrdineInventario,
    renderFiltroBrancheExport,
    exportBrancheInventario,
    setExportBrancheInventario,
    setExportCespitiInventarioSelezionati,
    resetColonneExtraInventario,
    colonneExtraInventarioDisponibili,
    exportInventarioColonneExtra,
    toggleColonnaExtraInventario,
    selezionaTuttiCespitiInventario,
    codiciInventarioExportVisibili,
    exportRicercaCespiteInventario,
    setExportRicercaCespiteInventario,
    exportCespitiInventarioSelezionati,
    toggleCespiteExportInventario,
    codiciInventarioExport,
    exportInventarioFmed,
    exportSedeInterventi,
    setExportSedeInterventi,
    setExportSediInterventi,
    listaSediInterventi,
    exportCodiceInterventi,
    setExportCodiceInterventi,
    listaCodiciFiltroInterventi,
    exportTipologiaInterventi,
    setExportTipologiaInterventi,
    listaTipologieFiltroInterventi,
    exportSocietaInterventi,
    setExportSocietaInterventi,
    listaSocietaInterventi,
    exportAnnoInterventi,
    setExportAnnoInterventi,
    listaAnniContabiliInterventi,
    exportScadenzaInterventi,
    setExportScadenzaInterventi,
    exportDataInterventiDa,
    setExportDataInterventiDa,
    exportDataInterventiA,
    setExportDataInterventiA,
    renderFiltroSediInterventiExport,
    exportBrancheInterventi,
    setExportBrancheInterventi,
    selezionaTutteAttivitaExportInterventi,
    escludiTutteAttivitaExportInterventi,
    listaAttivitaExportInterventi,
    exportAttivitaInterventiEscluse,
    toggleAttivitaExportInterventi,
    attivitaExportIncluse,
    selezionaTuttiCespitiInterventi,
    codiciInterventiExportVisibili,
    setExportCespitiInterventiSelezionati,
    exportRicercaCespiteInterventi,
    setExportRicercaCespiteInterventi,
    exportCespitiInterventiSelezionati,
    toggleCespiteExportInterventi,
    codiciInterventiExport,
    exportInterventiFmed,
    scadenzeVisualizzate,
    scadenzeSelezionateVisualizzate,
    resetFiltriScadenze,
    selezionaTutteScadenzeVisualizzate,
    deselezionaTutteScadenze,
    filtroScadenze,
    setFiltroScadenze,
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
    filtroScadenzeProssimaDa,
    setFiltroScadenzeProssimaDa,
    filtroScadenzeProssimaA,
    setFiltroScadenzeProssimaA,
    exportBrancheScadenze,
    setExportBrancheScadenze,
    exportScadenzeFmed,
    exportBudgetSede,
    setExportBudgetSede,
    exportBudgetStato,
    setExportBudgetStato,
    exportBudgetTipologia,
    setExportBudgetTipologia,
    exportBudgetCostruttore,
    setExportBudgetCostruttore,
    exportBudgetCriticita,
    setExportBudgetCriticita,
    exportBrancheBudget,
    setExportBrancheBudget,
    exportBudgetCriticitaFmed
  } = props;
  return (
    <div className="fmed-export-page fmed-report-page fmed-style-card">
            <header className="fmed-report-hero">
              <div className="fmed-banner-heading fmed-report-hero-heading">
                <FmedModuleIcon module="Export" />
                <div className="fmed-report-hero-copy fmed-banner-copy">
                  <span>Report e analisi</span>
                  <h2>Report e analisi FMED</h2>
                  <p>Esporta inventario, interventi, scadenze, budget e audit qualità in formati ordinati e pronti per l’uso.</p>
                </div>
              </div>
              <div className="fmed-report-environment">
                <small>Ambiente report</small>
                <strong>{window.location.host}</strong>
                <span>Inventario · Interventi · Scadenze · Budget</span>
              </div>
            </header>

            <div className="fmed-report-audit fmed-style-fmed-audit-quality-panel">
              <div className="fmed-report-audit-head fmed-style-fmed-audit-quality-head">
                <div>
                  <div className="fmed-style-fmed-audit-eyebrow">Audit qualità dati</div>
                  <h3 className="fmed-style-fmed-audit-title">Controllo rapido integrità FMED</h3>
                  <p className="fmed-style-fmed-audit-subtitle">Verifica automatica di branche, locazioni, matricole, modelli, costruttori e link documentali.</p>
                </div>
                <div className="fmed-style-fmed-audit-score-box">
                  <strong className="fmed-style-fmed-audit-score-main">{fmedAuditQualitaDati.indiceQualita}%</strong>
                  <span>Indice qualità</span>
                </div>
              </div>
              <div className="fmed-report-audit-grid fmed-style-fmed-audit-metric-grid">
                <div className="fmed-style-fmed-audit-metric"><strong className="fmed-style-fmed-audit-metric-main">{fmedAuditQualitaDati.assetSenzaBranca}</strong><span>Asset senza branca</span></div>
                <div className="fmed-style-fmed-audit-metric"><strong className="fmed-style-fmed-audit-metric-main">{fmedAuditQualitaDati.assetSenzaLocazione}</strong><span>Asset senza locazione</span></div>
                <div className="fmed-style-fmed-audit-metric"><strong className="fmed-style-fmed-audit-metric-main">{fmedAuditQualitaDati.assetSenzaSharePoint}</strong><span>Senza SharePoint</span></div>
                <div className="fmed-style-fmed-audit-metric"><strong className="fmed-style-fmed-audit-metric-main">{fmedAuditQualitaDati.interventiSenzaBranca}</strong><span>Interventi senza branca</span></div>
              </div>
              <div className="fmed-report-audit-actions fmed-style-fmed-audit-actions">
                <button type="button" onClick={exportAuditQualitaDatiFmed} className="fmed-style-primary-btn">Esporta audit qualità dati</button>
                <button type="button" onClick={() => setExportPanelAperto("inventario")} className="fmed-style-secondary-btn">Apri export inventario</button>
              </div>
            </div>

            <div className="fmed-literal-2a57fba0b1">


        
              <div className="fmed-report-accordion-item fmed-style-export-accordion-item">
                <button type="button" className="fmed-report-accordion-header fmed-style-export-accordion-header" onClick={() => setExportPanelAperto(exportPanelAperto === "inventario" ? null : "inventario")}>
                  <div className="fmed-report-accordion-title-wrap fmed-style-export-accordion-title-wrap">
                    <span className="fmed-style-export-accordion-icon"></span>
                    <div>
                      <div className="fmed-style-export-accordion-title">Export Inventario</div>
                      <div className="fmed-style-export-accordion-subtitle">Inventario sintetico con colonne opzionali.</div>
                    </div>
                  </div>
                  <span className="fmed-style-export-accordion-chevron">{exportPanelAperto === "inventario" ? "▲" : "▼"}</span>
                </button>

                {exportPanelAperto === "inventario" && <div className="fmed-style-export-accordion-body">
                    <div className="fmed-style-export-inline-grid">
                      <select value={exportSedeInventario} onChange={(e) => setExportSedeInventario(e.target.value)} className="fmed-style-select">
                        <option value="TUTTE">Tutte le sedi</option>
                        {listaSedi.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <select value={exportStatoInventario} onChange={(e) => setExportStatoInventario(e.target.value)} className="fmed-style-select">
                        <option value="TUTTI">Tutti gli stati</option>
                        {listaStatiAsset.map((stato) => <option key={stato} value={stato}>{stato}</option>)}
                      </select>
                      <select value={exportCategoriaInventario} onChange={(e) => setExportCategoriaInventario(e.target.value)} className="fmed-style-select">
                        <option value="TUTTE">Tutte le categorie</option>
                        {listaCategorie.map((cat) => <option key={cat} value={cat}>{formatCategoria(cat)}</option>)}
                      </select>
                      <select value={exportTipologiaInventario} onChange={(e) => setExportTipologiaInventario(e.target.value)} className="fmed-style-select">
                        <option value="TUTTE">Tutte le tipologie</option>
                        {listaTipologie.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <select value={exportCostruttoreInventario} onChange={(e) => setExportCostruttoreInventario(e.target.value)} className="fmed-style-select">
                        <option value="TUTTI">Tutti i costruttori</option>
                        {listaCostruttori.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <select value={exportRepartoInventario} onChange={(e) => setExportRepartoInventario(e.target.value)} className="fmed-style-select">
                        <option value="TUTTI">Tutti i reparti</option>
                        {listaReparti.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <select value={exportSocietaInventario} onChange={(e) => setExportSocietaInventario(e.target.value)} className="fmed-style-select">
                        <option value="TUTTE">Tutte le società</option>
                        {listaSocieta.map((soc) => <option key={soc} value={soc}>{soc}</option>)}
                      </select>
                      <select value={exportLocazioneInventario} onChange={(e) => setExportLocazioneInventario(e.target.value)} className="fmed-style-select">
                        <option value="TUTTE">Tutte le stanze / locazioni</option>
                        {listaLocazioniExportInventario.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
                      </select>
                      <select value={exportOrdineInventario} onChange={(e) => setExportOrdineInventario(e.target.value)} className="fmed-style-select">
                        <option value="LOCAZIONE_ASC">Ordina per stanza / locazione</option>
                        <option value="REPARTO_ASC">Ordina per reparto</option>
                        <option value="SEDE_ASC">Ordina per sede</option>
                        <option value="CODICE_ASC">Ordina per codice crescente</option>
                        <option value="CODICE_DESC">Ordina per codice decrescente</option>
                        <option value="TIPOLOGIA_ASC">Ordina per tipologia</option>
                        <option value="COSTRUTTORE_ASC">Ordina per costruttore</option>
                        <option value="STATO_ASC">Ordina per stato</option>
                      </select>
                    </div>
                    <div className="fmed-style-export-action-row">
                      <button type="button" onClick={() => exportInventarioFmed("csv")} className="fmed-style-primary-btn">CSV per Excel</button>
                      <button type="button" onClick={() => exportInventarioFmed("pdf")} className="fmed-style-secondary-btn">PDF</button>
                    </div>

                    {renderFiltroBrancheExport("Filtro multiplo branca", exportBrancheInventario, setExportBrancheInventario)}

                    <div style={{

              justifyContent: "flex-start",
              marginTop: 10
            }} className="fmed-style-export-action-row">
                      <button type="button" style={{

                flex: "0 1 220px"
              }} onClick={() => {
                setExportStatoInventario("Attivo");
                setExportCespitiInventarioSelezionati([]);
              }} className="fmed-style-primary-btn">
                        Esporta solo asset attivi
                      </button>
                      <button type="button" style={{

                flex: "0 1 180px"
              }} onClick={() => {
                setExportSedeInventario("TUTTE");
                setExportStatoInventario("TUTTI");
                setExportCategoriaInventario("TUTTE");
                setExportTipologiaInventario("TUTTE");
                setExportCostruttoreInventario("TUTTI");
                setExportRepartoInventario("TUTTI");
                setExportSocietaInventario("TUTTE");
                setExportLocazioneInventario("TUTTE");
                setExportOrdineInventario("LOCAZIONE_ASC");
                setExportBrancheInventario([]);
                setExportCespitiInventarioSelezionati([]);
              }} className="fmed-style-secondary-btn">
                        Reset filtri inventario
                      </button>
                    </div>

                    <div className="fmed-style-export-filter-box">
                      <div className="fmed-literal-d1380c0341">





                
                        <div className="fmed-literal-5ffa08dd75">



                  Colonne aggiuntive opzionali</div>
                        <button type="button" onClick={resetColonneExtraInventario} className="fmed-style-mini-action-btn">Default pulito</button>
                      </div>
                      <div className="fmed-style-export-checkbox-grid">
                        {colonneExtraInventarioDisponibili.map((colonna) => <label key={colonna.key} className="fmed-style-export-check-label">
                            <input type="checkbox" checked={!!exportInventarioColonneExtra[colonna.key]} onChange={() => toggleColonnaExtraInventario(colonna.key)} />
                            <span>{colonna.label}</span>
                          </label>)}
                      </div>
                      <div className="fmed-literal-14fdc86419">




                
                        Di default l'export resta sintetico. Accessori/Sistema primario resta nella scheda cespite e non viene esportato.
                      </div>
                    </div>

                    <div className="fmed-style-export-filter-box">
                      <div className="fmed-literal-d1380c0341">





                
                        <div className="fmed-literal-5ffa08dd75">



                  Cespiti da esportare</div>
                        <div className="fmed-literal-cc9c605f61">



                  
                          <button type="button" onClick={() => selezionaTuttiCespitiInventario(codiciInventarioExportVisibili)} className="fmed-style-mini-action-btn">Seleziona visibili</button>
                          <button type="button" onClick={() => setExportCespitiInventarioSelezionati([])} className="fmed-style-mini-action-btn">Nessuno</button>
                        </div>
                      </div>

                      <input style={{

                marginBottom: 5
              }} value={exportRicercaCespiteInventario} onChange={(e) => setExportRicercaCespiteInventario(e.target.value)} placeholder="Cerca codice cespite da esportare..." className="fmed-style-input" />

                      <div style={{

                maxHeight: 170,
                overflowY: "auto"
              }} className="fmed-style-export-checkbox-grid">
                        {codiciInventarioExportVisibili.slice(0, 300).map((codice) => <label key={codice} className="fmed-style-export-check-label">
                            <input type="checkbox" checked={exportCespitiInventarioSelezionati.includes(codice)} onChange={() => toggleCespiteExportInventario(codice)} />
                            <span>{codice}</span>
                          </label>)}
                      </div>

                      {codiciInventarioExportVisibili.length > 300 && <div className="fmed-literal-1212093a3b">




                
                          Mostrati i primi 300 codici: usa la ricerca per trovare gli altri.
                        </div>}

                      <div className="fmed-literal-14fdc86419">




                
                        Disponibili: {codiciInventarioExport.length} · Visibili: {codiciInventarioExportVisibili.length} · Selezionati: {exportCespitiInventarioSelezionati.length}. Se non selezioni nulla, esporta tutti i cespiti filtrati.
                      </div>
                    </div>

                    <div className="fmed-style-export-info-line">
                      Filtri: {exportSedeInventario} · {exportStatoInventario} · {exportCategoriaInventario === "TUTTE" ? "Tutte le categorie" : formatCategoria(exportCategoriaInventario)} · {exportTipologiaInventario} · Branche: {exportBrancheInventario.length ? exportBrancheInventario.length : "tutte"} · {exportCostruttoreInventario} · {exportRepartoInventario} · {exportSocietaInventario} · {exportLocazioneInventario} · {exportOrdineInventario}
                    </div>
                  </div>}
              </div>

              <div className="fmed-report-accordion-item fmed-style-export-accordion-item">
                <button type="button" className="fmed-report-accordion-header fmed-style-export-accordion-header" onClick={() => setExportPanelAperto(exportPanelAperto === "interventi" ? null : "interventi")}>
                  <div className="fmed-report-accordion-title-wrap fmed-style-export-accordion-title-wrap">
                    <span className="fmed-style-export-accordion-icon"></span>
                    <div>
                      <div className="fmed-style-export-accordion-title">Export Interventi</div>
                      <div className="fmed-style-export-accordion-subtitle">Storico interventi filtrato.</div>
                    </div>
                  </div>
                  <span className="fmed-style-export-accordion-chevron">{exportPanelAperto === "interventi" ? "▲" : "▼"}</span>
                </button>

                {exportPanelAperto === "interventi" && <div className="fmed-style-export-accordion-body">
                    <div className="fmed-style-export-inline-grid">
                      <select value={exportSedeInterventi} onChange={(e) => {
                setExportSedeInterventi(e.target.value);
                setExportSediInterventi([]);
              }} className="fmed-style-select">
                        <option value="TUTTE">Tutte le sedi</option>
                        {listaSediInterventi.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <select value={exportCodiceInterventi} onChange={(e) => setExportCodiceInterventi(e.target.value)} className="fmed-style-select">
                        <option value="TUTTI">Tutti i codici</option>
                        {listaCodiciFiltroInterventi.map((codice) => <option key={codice} value={codice}>{codice}</option>)}
                      </select>
                      <select value={exportTipologiaInterventi} onChange={(e) => setExportTipologiaInterventi(e.target.value)} className="fmed-style-select">
                        <option value="TUTTE">Tutte le tipologie</option>
                        {listaTipologieFiltroInterventi.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <select value={exportSocietaInterventi} onChange={(e) => setExportSocietaInterventi(e.target.value)} className="fmed-style-select">
                        <option value="TUTTE">Tutte le ditte/società</option>
                        {listaSocietaInterventi.map((soc) => <option key={soc} value={soc}>{soc}</option>)}
                      </select>
                      <select value={exportAnnoInterventi} onChange={(e) => setExportAnnoInterventi(e.target.value)} className="fmed-style-select">
                        <option value="TUTTI">Tutti gli anni</option>
                        {listaAnniContabiliInterventi.map((anno) => <option key={anno} value={anno}>{anno}</option>)}
                      </select>
                      <select value={exportScadenzaInterventi} onChange={(e) => setExportScadenzaInterventi(e.target.value)} className="fmed-style-select">
                        <option value="VALIDI">Solo validi/non scaduti alla data export</option>
                        <option value="PROSSIMITA">Solo in prossimità di scadenza</option>
                        <option value="NON_SCADUTI">Solo non scaduti oltre 30 giorni</option>
                        <option value="SCADUTI">Solo scaduti</option>
                        <option value="SENZA_SCADENZA">Senza prossima scadenza</option>
                        <option value="TUTTI">Tutte le scadenze</option>
                      </select>
                      <input type="date" value={exportDataInterventiDa} onChange={(e) => setExportDataInterventiDa(e.target.value)} className="fmed-style-input" />
                      <input type="date" value={exportDataInterventiA} onChange={(e) => setExportDataInterventiA(e.target.value)} className="fmed-style-input" />
                    </div>
                    <div className="fmed-style-export-action-row">
                      <button type="button" onClick={() => exportInterventiFmed("csv")} className="fmed-style-primary-btn">CSV per Excel</button>
                      <button type="button" onClick={() => exportInterventiFmed("pdf")} className="fmed-style-secondary-btn">PDF</button>
                    </div>

                    {renderFiltroSediInterventiExport()}

                    {renderFiltroBrancheExport("Filtro multiplo branca", exportBrancheInterventi, setExportBrancheInterventi)}

                    <div className="fmed-style-export-filter-box">
                      <div className="fmed-literal-d1380c0341">





                
                        <div className="fmed-literal-5ffa08dd75">



                  Attività da includere nell'export</div>
                        <div className="fmed-literal-cc9c605f61">



                  
                          <button type="button" onClick={selezionaTutteAttivitaExportInterventi} className="fmed-style-mini-action-btn">Tutte</button>
                          <button type="button" onClick={escludiTutteAttivitaExportInterventi} className="fmed-style-mini-action-btn">Nessuna</button>
                        </div>
                      </div>

                      <div className="fmed-style-export-checkbox-grid">
                        {listaAttivitaExportInterventi.map((attivita) => <label key={attivita} className="fmed-style-export-check-label">
                            <input type="checkbox" checked={!exportAttivitaInterventiEscluse.includes(attivita)} onChange={() => toggleAttivitaExportInterventi(attivita)} />
                            <span>{attivita}</span>
                          </label>)}
                      </div>

                      <div className="fmed-literal-14fdc86419">




                
                        Incluse: {attivitaExportIncluse.length} / {listaAttivitaExportInterventi.length}
                      </div>
                    </div>

                    <div className="fmed-style-export-filter-box">
                      <div className="fmed-literal-d1380c0341">





                
                        <div className="fmed-literal-5ffa08dd75">



                  Cespiti da esportare negli interventi</div>
                        <div className="fmed-literal-cc9c605f61">



                  
                          <button type="button" onClick={() => selezionaTuttiCespitiInterventi(codiciInterventiExportVisibili)} className="fmed-style-mini-action-btn">Seleziona visibili</button>
                          <button type="button" onClick={() => setExportCespitiInterventiSelezionati([])} className="fmed-style-mini-action-btn">Nessuno</button>
                        </div>
                      </div>

                      <input style={{

                marginBottom: 5
              }} value={exportRicercaCespiteInterventi} onChange={(e) => setExportRicercaCespiteInterventi(e.target.value)} placeholder="Cerca codice cespite da esportare..." className="fmed-style-input" />

                      <div style={{

                maxHeight: 170,
                overflowY: "auto"
              }} className="fmed-style-export-checkbox-grid">
                        {codiciInterventiExportVisibili.slice(0, 300).map((codice) => <label key={codice} className="fmed-style-export-check-label">
                            <input type="checkbox" checked={exportCespitiInterventiSelezionati.includes(codice)} onChange={() => toggleCespiteExportInterventi(codice)} />
                            <span>{codice}</span>
                          </label>)}
                      </div>

                      {codiciInterventiExportVisibili.length > 300 && <div className="fmed-literal-1212093a3b">




                
                          Mostrati i primi 300 codici: usa la ricerca per trovare gli altri.
                        </div>}

                      <div className="fmed-literal-14fdc86419">




                
                        Disponibili: {codiciInterventiExport.length} · Visibili: {codiciInterventiExportVisibili.length} · Selezionati: {exportCespitiInterventiSelezionati.length}. Se non selezioni nulla, esporta tutti gli interventi filtrati.
                      </div>
                    </div>

                  </div>}
              </div>

              <div className="fmed-report-accordion-item fmed-style-export-accordion-item">
                <button type="button" className="fmed-report-accordion-header fmed-style-export-accordion-header" onClick={() => setExportPanelAperto(exportPanelAperto === "scadenze" ? null : "scadenze")}>
                  <div className="fmed-report-accordion-title-wrap fmed-style-export-accordion-title-wrap">
                    <span className="fmed-style-export-accordion-icon"></span>
                    <div>
                      <div className="fmed-style-export-accordion-title">Export Scadenze</div>
                      <div className="fmed-style-export-accordion-subtitle">Scadenze visibili o selezionate.</div>
                    </div>
                  </div>
                  <span className="fmed-style-export-accordion-chevron">{exportPanelAperto === "scadenze" ? "▲" : "▼"}</span>
                </button>

                {exportPanelAperto === "scadenze" && <div className="fmed-style-export-accordion-body">
                    <div className="fmed-literal-632664df44">






              
                      <div className="fmed-style-export-info-line">
                        Visibili: {scadenzeVisualizzate.length} · Selezionate: {scadenzeSelezionateVisualizzate.length}
                      </div>
                      <div className="fmed-literal-f60672cbcd">



                
                        <button type="button" onClick={resetFiltriScadenze} className="fmed-style-mini-action-btn">Reset filtri</button>
                        <button type="button" onClick={selezionaTutteScadenzeVisualizzate} className="fmed-style-mini-action-btn">Seleziona visibili</button>
                        <button type="button" onClick={deselezionaTutteScadenze} className="fmed-style-mini-action-btn">Nessuna</button>
                      </div>
                    </div>
                    <div className="fmed-style-export-inline-grid">
                      <select value={filtroScadenze} onChange={(e) => setFiltroScadenze(e.target.value)} className="fmed-style-select">
                        <option value="TUTTE">Tutti gli stati</option>
                        <option value="SCADUTA">Scadute</option>
                        <option value="30_GIORNI">Entro 30 giorni</option>
                        <option value="60_GIORNI">Entro 60 giorni</option>
                        <option value="REGOLARE">Regolari</option>
                      </select>
                      <select value={filtroScadenzeCodice} onChange={(e) => setFiltroScadenzeCodice(e.target.value)} className="fmed-style-select">
                        <option value="TUTTE">Tutti i codici</option>
                        {listaCodiciFiltroScadenze.map((codice) => <option key={codice} value={codice}>{codice}</option>)}
                      </select>
                      <select value={filtroScadenzeSede} onChange={(e) => setFiltroScadenzeSede(e.target.value)} className="fmed-style-select">
                        <option value="TUTTE">Tutte le sedi</option>
                        {listaSediFiltroScadenze.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <select value={filtroScadenzeTipologia} onChange={(e) => setFiltroScadenzeTipologia(e.target.value)} className="fmed-style-select">
                        <option value="TUTTE">Tutte le tipologie</option>
                        {listaTipologieFiltroScadenze.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <select value={filtroScadenzeAttivita} onChange={(e) => setFiltroScadenzeAttivita(e.target.value)} className="fmed-style-select">
                        <option value="TUTTE">Tutte le attività</option>
                        {listaAttivitaFiltroScadenze.map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                      <select value={filtroScadenzeDitta} onChange={(e) => setFiltroScadenzeDitta(e.target.value)} className="fmed-style-select">
                        <option value="TUTTE">Tutte le ditte</option>
                        {listaDitteFiltroScadenze.map((d) => <option key={d} value={d}>{normalizzaSocietaDitta(d)}</option>)}
                      </select>
                      <input type="date" value={filtroScadenzeProssimaDa} onChange={(e) => setFiltroScadenzeProssimaDa(e.target.value)} className="fmed-style-input" />
                      <input type="date" value={filtroScadenzeProssimaA} onChange={(e) => setFiltroScadenzeProssimaA(e.target.value)} className="fmed-style-input" />
                    </div>
                    <div className="fmed-style-export-action-row">
                      <button type="button" onClick={() => exportScadenzeFmed("csv")} className="fmed-style-primary-btn">CSV per Excel</button>
                      <button type="button" onClick={() => exportScadenzeFmed("pdf")} className="fmed-style-secondary-btn">PDF</button>
                    </div>
                    {renderFiltroBrancheExport("Filtro multiplo branca", exportBrancheScadenze, setExportBrancheScadenze)}
                  </div>}
              </div>

              <div className="fmed-report-accordion-item fmed-style-export-accordion-item">
                <button type="button" className="fmed-report-accordion-header fmed-style-export-accordion-header" onClick={() => setExportPanelAperto(exportPanelAperto === "budget" ? null : "budget")}>
                  <div className="fmed-report-accordion-title-wrap fmed-style-export-accordion-title-wrap">
                    <span className="fmed-style-export-accordion-icon"></span>
                    <div>
                      <div className="fmed-style-export-accordion-title">Export Budget Criticità</div>
                      <div className="fmed-style-export-accordion-subtitle">Budget manutentivo con criticità VERDE/GIALLO/ROSSO dallo storico interventi.</div>
                    </div>
                  </div>
                  <span className="fmed-style-export-accordion-chevron">{exportPanelAperto === "budget" ? "▲" : "▼"}</span>
                </button>

                {exportPanelAperto === "budget" && <div className="fmed-style-export-accordion-body">
                    <div className="fmed-style-export-inline-grid">
                      <select value={exportBudgetSede} onChange={(e) => setExportBudgetSede(e.target.value)} className="fmed-style-select">
                        <option value="TUTTE">Tutte le sedi</option>
                        {listaSedi.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <select value={exportBudgetStato} onChange={(e) => setExportBudgetStato(e.target.value)} className="fmed-style-select">
                        <option value="TUTTI">Tutti gli stati</option>
                        {listaStatiAsset.map((stato) => <option key={stato} value={stato}>{stato}</option>)}
                      </select>
                      <select value={exportBudgetTipologia} onChange={(e) => setExportBudgetTipologia(e.target.value)} className="fmed-style-select">
                        <option value="TUTTE">Tutte le tipologie</option>
                        {listaTipologie.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <select value={exportBudgetCostruttore} onChange={(e) => setExportBudgetCostruttore(e.target.value)} className="fmed-style-select">
                        <option value="TUTTI">Tutti i costruttori</option>
                        {listaCostruttori.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <select value={exportBudgetCriticita} onChange={(e) => setExportBudgetCriticita(e.target.value)} className="fmed-style-select">
                        <option value="TUTTE">Tutte le criticità</option>
                        <option value="ROSSO">ROSSO</option>
                        <option value="GIALLO">GIALLO</option>
                        <option value="VERDE">VERDE</option>
                      </select>
                    </div>
                    <div className="fmed-style-export-action-row">
                      <button type="button" onClick={() => exportBudgetCriticitaFmed("csv")} className="fmed-style-primary-btn">CSV per Excel</button>
                      <button type="button" onClick={() => exportBudgetCriticitaFmed("pdf")} className="fmed-style-secondary-btn">PDF</button>
                    </div>
                    {renderFiltroBrancheExport("Filtro multiplo branca", exportBrancheBudget, setExportBrancheBudget)}
                  </div>}
              </div>
            </div>
          </div>);

}
