import CanonicalSelect from "../masterdata/CanonicalSelect.jsx";
import FmedIcon from "../ui/FmedIcon.jsx";

function TextField({ label, value, onChange, type = "text", readOnly = false, placeholder = "" }) {
  return <label className="p0-editor-field"><span>{label}</span><input type={type} value={value ?? ""} onChange={onChange} readOnly={readOnly} placeholder={placeholder} /></label>;
}

export default function InfrastrutturaEditor(props) {
  const {
    infraInModifica,
    formInfra = {},
    aggiornaFormInfra = () => {},
    SEDI_STANDARD_LIST = [],
    infraCategorieStandard = [],
    infraDitteOptions = [],
    infraPeriodicitaStandard = [],
    infraStatiStandard = [],
    PRIORITA_STANDARD = [],
    infraSocietaOptions = [],
    infraCentroCostoOptions = [],
    messaggioInfra,
    salvaInfrastruttura = () => {},
    salvataggioInfraLoading,
    setFormInfrastrutturaOpen = () => {},
    apiBaseUrl,
    apriMenuAttivitaInfrastruttura = () => {},
    apriMenuDocumentazioneInfrastruttura = () => {},
    apriReportInfrastruttura = () => {},
    apriMenuAllegaInfrastruttura = () => {}
  } = props || {};

  const canonical = (label, field, dictionary, options = []) => (
    <CanonicalSelect label={label} field={field} dictionary={dictionary} value={formInfra[field] || ""} options={options} form={formInfra} apiBaseUrl={apiBaseUrl} onChange={(value) => aggiornaFormInfra(field, value)} />
  );

  return (
    <section className="p0-editor" aria-labelledby="p0-infrastructure-editor-title">
      <header className="p0-editor__head">
        <div><span className="p0-kicker">Scheda infrastrutturale</span><h2 id="p0-infrastructure-editor-title">{infraInModifica ? "Modifica infrastruttura" : "Nuova infrastruttura"}</h2><p>Identità, manutenzione, responsabilità e documenti in un’unica scheda.</p></div>
        <button type="button" className="p0-btn" onClick={() => setFormInfrastrutturaOpen(false)}><FmedIcon name="close" /> Chiudi</button>
      </header>

      <div className="p0-editor__summary">
        <span><small>Codice</small><b>{formInfra.codice || "Automatico"}</b></span>
        <span><small>Sede</small><b>{formInfra.sede || "Da selezionare"}</b></span>
        <span><small>Categoria</small><b>{formInfra.categoria || "Da selezionare"}</b></span>
        <span><small>Periodicità</small><b>{formInfra.periodicita || "Da definire"}</b></span>
      </div>

      <div className="p0-editor__body">
        <div className="p0-editor__main">
          <fieldset><legend><b>01</b><span>Identificazione<small>Dati principali dell’impianto o servizio</small></span></legend>
            <div className="p0-editor__grid">
              <TextField label="Codice" value={formInfra.codice} readOnly placeholder="Assegnato automaticamente" />
              {canonical("Sede", "sede", "SEDI", SEDI_STANDARD_LIST)}
              {canonical("Categoria infrastruttura", "categoria", "CATEGORIE_INFRASTRUTTURE", infraCategorieStandard)}
              {canonical("Ditta esecutrice", "ditta", "DITTE_ESECUTRICI", infraDitteOptions)}
              <div className="p0-editor__wide">{canonical("Attività / impianto", "descrizione", "ITEM_INFRASTRUTTURE")}</div>
            </div>
          </fieldset>

          <fieldset><legend><b>02</b><span>Manutenzione<small>Ciclo, stato e priorità operativa</small></span></legend>
            <div className="p0-editor__grid">
              {canonical("Periodicità", "periodicita", "PERIODICITA", infraPeriodicitaStandard)}
              {canonical("Stato", "stato", "STATI_INFRASTRUTTURA", infraStatiStandard)}
              <TextField label="Ultimo intervento" type="date" value={formInfra.ultimo_intervento} onChange={(e) => aggiornaFormInfra("ultimo_intervento", e.target.value)} />
              <TextField label="Prossimo intervento" type="date" value={formInfra.prossimo_intervento} onChange={(e) => aggiornaFormInfra("prossimo_intervento", e.target.value)} />
              {canonical("Priorità", "priorita", "PRIORITA", PRIORITA_STANDARD)}
            </div>
          </fieldset>

          <fieldset><legend><b>03</b><span>Gestione<small>Organizzazione, referente e costo</small></span></legend>
            <div className="p0-editor__grid">
              {canonical("Società", "societa", "SOCIETA", infraSocietaOptions)}
              <TextField label="Helpdesk" value={formInfra.numero_helpdesk} onChange={(e) => aggiornaFormInfra("numero_helpdesk", e.target.value)} />
              {canonical("Responsabile", "responsabile", "RESPONSABILI")}
              {canonical("Centro di costo", "centro_costo", "CENTRI_COSTO", infraCentroCostoOptions)}
              <TextField label="Importo annuo" value={formInfra.importo_annuo} onChange={(e) => aggiornaFormInfra("importo_annuo", e.target.value)} placeholder="0,00" />
            </div>
          </fieldset>

          <fieldset><legend><b>04</b><span>Collegamenti<small>Documenti e cartelle SharePoint</small></span></legend>
            <div className="p0-editor-docs">
              <details><summary><FmedIcon name="activity" /> Attività</summary><button type="button" onClick={() => apriMenuAttivitaInfrastruttura(formInfra, "ordinarie")}>Ordinarie</button><button type="button" onClick={() => apriMenuAttivitaInfrastruttura(formInfra, "straordinarie")}>Straordinarie</button></details>
              <details><summary><FmedIcon name="folder" /> Documentazione</summary>{[["generale","Generale"],["fotografie","Fotografie"],["schemi","Schemi e progetti"],["certificazioni","Certificazioni"],["contratti","Contratti"],["costi","Costi"],["manuali","Manuali"]].map(([type,label]) => <button type="button" key={type} onClick={() => apriMenuDocumentazioneInfrastruttura(formInfra, type)}>{label}</button>)}</details>
              <button type="button" onClick={() => apriReportInfrastruttura(formInfra)}><FmedIcon name="chart" /> Report</button>
              <button type="button" onClick={() => apriMenuAllegaInfrastruttura(formInfra, "generale")}><FmedIcon name="upload" /> Allega</button>
            </div>
            <div className="p0-editor__grid">
              <TextField label="Link documentazione" value={formInfra.link_documento} onChange={(e) => aggiornaFormInfra("link_documento", e.target.value)} placeholder="https://..." />
              <TextField label="Link SharePoint" value={formInfra.link_sharepoint} onChange={(e) => aggiornaFormInfra("link_sharepoint", e.target.value)} placeholder="https://..." />
            </div>
          </fieldset>
        </div>

        <aside className="p0-editor__aside">
          <label><span>Note operative</span><textarea value={formInfra.note || ""} onChange={(e) => aggiornaFormInfra("note", e.target.value)} placeholder="Criticità, indicazioni e prossimi interventi…" /></label>
          {messaggioInfra && <div className="p0-editor__message">{messaggioInfra}</div>}
          <button type="button" className="p0-btn p0-btn--infrastructure" onClick={salvaInfrastruttura} disabled={salvataggioInfraLoading}>{salvataggioInfraLoading ? "Salvataggio…" : "Salva infrastruttura"}</button>
          <button type="button" className="p0-btn" onClick={() => setFormInfrastrutturaOpen(false)}>Annulla</button>
        </aside>
      </div>
    </section>
  );
}
