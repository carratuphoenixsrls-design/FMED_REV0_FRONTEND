import InfrastruttureControls from "../components/infrastrutture/InfrastruttureControls";
import InfrastruttureHero from "../components/infrastrutture/InfrastruttureHero";
import InfrastruttureRowActions from "../components/infrastrutture/InfrastruttureRowActions";
import CanonicalSelect from "../components/masterdata/CanonicalSelect.jsx";
import FmedIcon from "../components/ui/FmedIcon.jsx";

export default function InfrastrutturePage(props) {
  const {
    infrastruttureFiltrate,
    infrastruttureConStato,
    infraOk,
    infraInScadenza,
    infraScadute,
    formattaData,
    apriMenuAttivitaInfrastruttura,
    apriMenuDocumentazioneInfrastruttura,
    apriReportInfrastruttura,
    apriMenuAllegaInfrastruttura,
    formInfrastrutturaOpen,
    infraInModifica,
    formInfra,
    aggiornaFormInfra,
    SEDI_STANDARD_LIST,
    infraCategorieStandard,
    infraDitteOptions,
    infraPeriodicitaStandard,
    infraStatiStandard,
    PRIORITA_STANDARD,
    infraSocietaOptions,
    infraCentroCostoOptions,
    messaggioInfra,
    salvaInfrastruttura,
    salvataggioInfraLoading,
    setFormInfrastrutturaOpen,
    apiBaseUrl
  } = props;
  return (
    <section className={`fmed-infrastructure-root ${formInfrastrutturaOpen ? "is-workspace-open" : ""}`}>
<div className="fmed-infrastrutture-page">
    <InfrastruttureHero
          filteredCount={infrastruttureFiltrate.length}
          totalCount={infrastruttureConStato.length} />
        

    <InfrastruttureControls {...props} />

    <div className="fmed-operational-kpi-grid fmed-style-asset-kpi-grid" style={{

          ...{}
        }}>
      <div className="fmed-operational-kpi-card fmed-style-asset-kpi-card"><div className="fmed-style-asset-kpi-top"><span className="fmed-kpi-icon fmed-style-asset-kpi-icon"><FmedIcon name="building" /></span><span className="fmed-style-asset-kpi-label">Totale</span></div><strong className="fmed-style-asset-kpi-value">{infrastruttureFiltrate.length}</strong><span className="fmed-style-asset-kpi-hint">scadenze filtrate</span></div>
      <div className="fmed-operational-kpi-card fmed-style-asset-kpi-card"><div className="fmed-style-asset-kpi-top"><span className="fmed-kpi-icon fmed-style-asset-kpi-icon"><FmedIcon name="alert" /></span><span className="fmed-style-asset-kpi-label">Scadute</span></div><strong style={{

              color: "#FF4D5E"
            }} className="fmed-style-asset-kpi-value">{infraScadute.length}</strong><span className="fmed-style-asset-kpi-hint">da recuperare</span></div>
      <div className="fmed-operational-kpi-card fmed-style-asset-kpi-card"><div className="fmed-style-asset-kpi-top"><span className="fmed-kpi-icon fmed-style-asset-kpi-icon"><FmedIcon name="clock" /></span><span className="fmed-style-asset-kpi-label">In scadenza</span></div><strong style={{

              color: "#D99A00"
            }} className="fmed-style-asset-kpi-value">{infraInScadenza.length}</strong><span className="fmed-style-asset-kpi-hint">entro 30 giorni</span></div>
      <div className="fmed-operational-kpi-card fmed-style-asset-kpi-card"><div className="fmed-style-asset-kpi-top"><span className="fmed-kpi-icon fmed-style-asset-kpi-icon"><FmedIcon name="check" /></span><span className="fmed-style-asset-kpi-label">OK</span></div><strong style={{

              color: "#2FD37D"
            }} className="fmed-style-asset-kpi-value">{infraOk.length}</strong><span className="fmed-style-asset-kpi-hint">programmate</span></div>
    </div>

    <div className="fmed-operational-table-card fmed-infrastructure-table-card fmed-style-asset-table-card" style={{

          ...{}
        }}>
      <div style={{

            ...{}
          }} className="fmed-style-asset-list-header">
        <div>
          <h3 className="fmed-style-asset-table-title">Elenco scadenze infrastrutture</h3>
          <p className="fmed-style-asset-table-subtitle">Gestione completa da backend: nuovo, modifica, eliminazione e documentazione collegata.</p>
        </div>
      </div>
      {<div className="fmed-infrastructure-table-wrap fmed-style-table-wrap">
          <table className="fmed-infrastructure-table fmed-style-table-large">
            <thead>
              <tr>
                <th className="fmed-style-th-large">Codice</th>
                <th className="fmed-style-th-large">Sede</th>
                <th className="fmed-style-th-large">Categoria</th>
                <th className="fmed-style-th-large">Attività / Impianto</th>
                <th className="fmed-style-th-large">Ditta</th>
                <th className="fmed-style-th-large">Periodicità</th>
                <th className="fmed-style-th-large">Prossima</th>
                <th className="fmed-style-th-large">Priorità</th>
                <th className="fmed-style-th-large">Stato</th>
                <th className="fmed-style-th-large">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {infrastruttureFiltrate.map((r, idx) => <tr key={r.id || idx} className="fmed-style-tr">
                  <td className="fmed-style-td-code">{r.codice || `INF-${String(r.id || idx + 1).padStart(5, "0")}`}</td>
                  <td className="fmed-style-td">{r.sede}</td>
                  <td className="fmed-style-td-code">{r.categoria}</td>
                  <td className="fmed-style-td">{r.descrizione}</td>
                  <td className="fmed-style-td">{r.ditta}</td>
                  <td className="fmed-style-td">{r.periodicita}</td>
                  <td className="fmed-style-td">{formattaData(r.prossimo_intervento)}</td>
                  <td className="fmed-style-td">{r.priorita || "MEDIA"}</td>
                  <td className="fmed-style-td"><span style={{

                      borderColor: r._statoInfra.colore,
                      color: r._statoInfra.colore
                    }} className="fmed-style-status-pill">{r._statoInfra.testo}</span></td>
                  <td className="fmed-style-td">
                    <InfrastruttureRowActions {...props} infrastruttura={r} />
                  </td>
                </tr>)}
              {infrastruttureFiltrate.length === 0 && <tr><td colSpan={10} className="fmed-style-td">Nessuna infrastruttura trovata con i filtri attuali.</td></tr>}
            </tbody>
          </table>
        </div>}
    </div>
  </div>

{formInfrastrutturaOpen && <section className="fmed-workspace-page fmed-infrastructure-workspace" aria-labelledby="fmed-infrastructure-workspace-title">
    <div className="fmed-workspace-surface fmed-infrastructure-workspace-surface">
      <div className="fmed-literal-6fe60d7448">








            
        <div>
          <div className="fmed-literal-2bea0819b8">





                
             MRDB INFRASTRUTTURE
          </div>
          <h2 id="fmed-infrastructure-workspace-title" className="fmed-literal-3e1ad23890">





                
            {infraInModifica ? "Modifica infrastruttura" : "Nuova infrastruttura"}
          </h2>
          <p className="fmed-literal-1a69d342c8">





                
            Scheda tecnica infrastrutturale con sedi standard, scadenze, ditta esecutrice, costi e documentazione SharePoint collegata.
          </p>
        </div>

        <div className="fmed-infrastructure-workspace-head-actions">
          <button type="button" className="fmed-workspace-back is-on-dark" onClick={() => setFormInfrastrutturaOpen(false)}>
            <FmedIcon name="close" /> Torna alle infrastrutture
          </button>
        <div className="fmed-literal-a444c58ed9">




                
          {[["Codice", formInfra.codice || "AUTO", "#F4F8F7"], ["Categoria", formInfra.categoria || "-", "#E8F5F0"], ["Periodicità", formInfra.periodicita || "-", "#FFF4DE"]].map(([label, value, bg]) => <div key={label} className="fmed-literal-c7b8463e21">





                  
              <div className="fmed-literal-62d12b0adf">





                    {label}</div>
              <div style={{
                    color: bg,
                    fontSize: 15,
                    fontWeight: 600,
                    overflowWrap: "anywhere"
                  }}>{value}</div>
            </div>)}
        </div>
        </div>
      </div>

      <div className="fmed-literal-c4eff4fb8a">




            
        <div className="fmed-literal-5cf57a0dbc">



              
          <div className="fmed-literal-41d2126f45">






                
            <div className="fmed-literal-2993171516">






                  
              <div>
                <h3 className="fmed-literal-d1ecba5458">




                       Identificazione</h3>
                <p className="fmed-literal-b755509c2b">



                      Dati principali dell’impianto o servizio infrastrutturale.</p>
              </div>
              <span className="fmed-literal-67aada2691">






                    
                {formInfra.sede || "Sede non selezionata"}
              </span>
            </div>
            <div className="fmed-literal-999d62c3e0">



                  
              <div>
                <div className="fmed-style-small-label">Codice</div>
                <input style={{

                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.codice || ""} readOnly placeholder="Assegnato automaticamente" className="fmed-style-input" />
              </div>
              <CanonicalSelect
                    label="Sede"
                    field="sede"
                    dictionary="SEDI"
                    value={formInfra.sede || ""}
                    options={SEDI_STANDARD_LIST}
                    form={formInfra}
                    apiBaseUrl={apiBaseUrl}
                    onChange={(value) => aggiornaFormInfra("sede", value)} />
                  
              <CanonicalSelect
                    label="Categoria infrastruttura"
                    field="categoria"
                    dictionary="CATEGORIE_INFRASTRUTTURE"
                    value={formInfra.categoria || ""}
                    options={infraCategorieStandard}
                    form={formInfra}
                    apiBaseUrl={apiBaseUrl}
                    onChange={(value) => aggiornaFormInfra("categoria", value)} />
                  
              <CanonicalSelect
                    label="Ditta esecutrice"
                    field="ditta"
                    dictionary="DITTE_ESECUTRICI"
                    value={formInfra.ditta || ""}
                    options={infraDitteOptions}
                    form={formInfra}
                    apiBaseUrl={apiBaseUrl}
                    onChange={(value) => aggiornaFormInfra("ditta", value)} />
                  
              <CanonicalSelect
                    label="Attività / impianto"
                    field="descrizione"
                    dictionary="ITEM_INFRASTRUTTURE"
                    value={formInfra.descrizione || ""}
                    options={[]}
                    form={formInfra}
                    apiBaseUrl={apiBaseUrl}

                    onChange={(value) => aggiornaFormInfra("descrizione", value)}
                    hint="Se la voce manca, aggiungila senza uscire dalla scheda." className="fmed-literal-351bab3422" />
                  
            </div>
          </div>

          <div className="fmed-literal-0735e04529">





                
            <h3 className="fmed-literal-78a0a87e38">




                   Manutenzione</h3>
            <div className="fmed-literal-6d6444d9f9">



                  
              <CanonicalSelect label="Periodicità" field="periodicita" dictionary="PERIODICITA" value={formInfra.periodicita || ""} options={infraPeriodicitaStandard} form={formInfra} apiBaseUrl={apiBaseUrl} onChange={(value) => aggiornaFormInfra("periodicita", value)} />
              <CanonicalSelect label="Stato" field="stato" dictionary="STATI_INFRASTRUTTURA" value={formInfra.stato || "DA_VERIFICARE"} options={infraStatiStandard} form={formInfra} apiBaseUrl={apiBaseUrl} onChange={(value) => aggiornaFormInfra("stato", value)} />
              <div>
                <div className="fmed-style-small-label">Ultimo intervento</div>
                <input type="date" style={{

                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.ultimo_intervento || ""} onChange={(e) => aggiornaFormInfra("ultimo_intervento", e.target.value)} className="fmed-style-input" />
              </div>
              <div>
                <div className="fmed-style-small-label">Prossimo intervento</div>
                <input type="date" style={{

                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.prossimo_intervento || ""} onChange={(e) => aggiornaFormInfra("prossimo_intervento", e.target.value)} className="fmed-style-input" />
              </div>
              <CanonicalSelect label="Priorità" field="priorita" dictionary="PRIORITA" value={formInfra.priorita || "MEDIA"} options={PRIORITA_STANDARD} form={formInfra} apiBaseUrl={apiBaseUrl} onChange={(value) => aggiornaFormInfra("priorita", value)} />
            </div>
          </div>

          <div className="fmed-literal-ae59d5c911">





                
            <h3 className="fmed-literal-960e0826bc">




                   Gestione</h3>
            <div className="fmed-literal-6d6444d9f9">



                  
              <CanonicalSelect label="Società" field="societa" dictionary="SOCIETA" value={formInfra.societa || ""} options={infraSocietaOptions} form={formInfra} apiBaseUrl={apiBaseUrl} onChange={(value) => aggiornaFormInfra("societa", value)} />
              <div>
                <div className="fmed-style-small-label">Helpdesk</div>
                <input style={{

                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.numero_helpdesk || ""} onChange={(e) => aggiornaFormInfra("numero_helpdesk", e.target.value)} className="fmed-style-input" />
              </div>
              <CanonicalSelect label="Responsabile" field="responsabile" dictionary="RESPONSABILI" value={formInfra.responsabile || ""} options={[]} form={formInfra} apiBaseUrl={apiBaseUrl} onChange={(value) => aggiornaFormInfra("responsabile", value)} />
              <CanonicalSelect label="Centro costo" field="centro_costo" dictionary="CENTRI_COSTO" value={formInfra.centro_costo || ""} options={infraCentroCostoOptions} form={formInfra} apiBaseUrl={apiBaseUrl} onChange={(value) => aggiornaFormInfra("centro_costo", value)} />
              <div>
                <div className="fmed-style-small-label">Importo annuo</div>
                <input style={{

                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.importo_annuo ?? ""} onChange={(e) => aggiornaFormInfra("importo_annuo", e.target.value)} placeholder="0,00" className="fmed-style-input" />
              </div>
            </div>
          </div>

          <div className="fmed-literal-c5e8121cf6">





                
            <h3 className="fmed-literal-d33273381e">




                   Documentazione</h3>
            <div className="fmed-literal-e775515fb7">




                  
              <details className="fmed-document-choice">
                <summary><FmedIcon name="activity" /> Attività</summary>
                <div>
                  <button type="button" onClick={() => apriMenuAttivitaInfrastruttura(formInfra, "ordinarie")}>Attività ordinarie</button>
                  <button type="button" onClick={() => apriMenuAttivitaInfrastruttura(formInfra, "straordinarie")}>Attività straordinarie</button>
                </div>
              </details>
              <details className="fmed-document-choice">
                <summary><FmedIcon name="folder" /> Documentazione</summary>
                <div>
                  {[
                      ["generale", "Generale"],
                      ["fotografie", "Fotografie"],
                      ["schemi", "Schemi e progetti"],
                      ["certificazioni", "Certificazioni"],
                      ["contratti", "Contratti"],
                      ["costi", "Costi"],
                      ["manuali", "Manuali"]].
                      map(([tipo, label]) => <button type="button" key={tipo} onClick={() => apriMenuDocumentazioneInfrastruttura(formInfra, tipo)}>{label}</button>)}
                </div>
              </details>
              <button type="button" style={{

                    justifyContent: "center",
                    background: "#E8F7F8",
                    borderColor: "#BEE3E8",
                    color: "#047481"
                  }} onClick={() => apriReportInfrastruttura(formInfra)} className="fmed-style-asset-secondary-action"> Report</button>
              <button type="button" style={{

                    justifyContent: "center",
                    background: "#FFF7E6",
                    borderColor: "#F2D19B",
                    color: "#9A5B00"
                  }} onClick={() => apriMenuAllegaInfrastruttura(formInfra, "generale")} className="fmed-style-asset-secondary-action"><FmedIcon name="upload" /> Allega in documentazione varia</button>
            </div>
            <div className="fmed-literal-faca492d55">


                  
              <div>
                <div className="fmed-style-small-label">Link documentazione</div>
                <input style={{

                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.link_documento || ""} onChange={(e) => aggiornaFormInfra("link_documento", e.target.value)} placeholder="https://..." className="fmed-style-input" />
              </div>
              <div>
                <div className="fmed-style-small-label">Link SharePoint</div>
                <input style={{

                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.link_sharepoint || ""} onChange={(e) => aggiornaFormInfra("link_sharepoint", e.target.value)} placeholder="https://..." className="fmed-style-input" />
              </div>
            </div>
          </div>
        </div>

        <div className="fmed-literal-4c17163755">



              
          <div className="fmed-literal-5a372e9402">





                
            <h3 className="fmed-literal-1ed8418f08">




                   Note operative</h3>
            <textarea style={{

                  height: 72,
                  width: "100%",
                  resize: "none"
                }} value={formInfra.note || ""} onChange={(e) => aggiornaFormInfra("note", e.target.value)} placeholder="Annotazioni operative, criticità, prossimi interventi..." className="fmed-style-input" />
          </div>

          <div className="fmed-workspace-actions fmed-infrastructure-save-actions fmed-literal-48dfd70fe1">








                
            {messaggioInfra && <div className="fmed-literal-efb774cc51">







                  
                {messaggioInfra}
              </div>}
            <button type="button" style={{

                  background: "linear-gradient(135deg,#1F5E7A,#6F8F7A)",
                  width: "100%",
                  minHeight: 44
                }} onClick={salvaInfrastruttura} disabled={salvataggioInfraLoading} className="fmed-style-asset-primary-action">
              {salvataggioInfraLoading ? "Salvataggio..." : "Salva infrastruttura"}
            </button>
            <button type="button" style={{

                  background: "#F8FAFC",
                  width: "100%",
                  minHeight: 42
                }} onClick={() => setFormInfrastrutturaOpen(false)} className="fmed-style-asset-ghost-action">
              Annulla
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>}
    </section>);

}
