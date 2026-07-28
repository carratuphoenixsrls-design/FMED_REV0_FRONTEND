import FmedIcon from "../ui/FmedIcon.jsx";

export default function InfrastruttureRowActions(props) {
  const {
    infrastruttura,
    permessiRuoloFmed,
    apriMenuAttivitaInfrastruttura,
    apriMenuDocumentazioneInfrastruttura,
    apriReportInfrastruttura,
    apriMenuAllegaInfrastruttura,
    apriModificaInfrastruttura,
    eliminaInfrastruttura,
    eliminazioneInfraLoading
  } = props;

  return (
    <div className="fmed-row-action-bar">
      <details className="fmed-action-menu">
        <summary className="fmed-icon-action" title="Attività infrastruttura" aria-label="Attività infrastruttura" data-label="Attività">
          <FmedIcon name="activity" /><span className="fmed-sr-only">Attività</span>
        </summary>
        <div className="fmed-action-menu-panel">
          <strong>Attività</strong>
          <button type="button" onClick={() => apriMenuAttivitaInfrastruttura(infrastruttura, "ordinarie")}>Ordinarie</button>
          <button type="button" onClick={() => apriMenuAttivitaInfrastruttura(infrastruttura, "straordinarie")}>Straordinarie</button>
        </div>
      </details>
      <details className="fmed-action-menu">
        <summary className="fmed-icon-action" title="Documentazione SharePoint" aria-label="Documentazione SharePoint" data-label="Documenti">
          <FmedIcon name="folder" /><span className="fmed-sr-only">Documentazione</span>
        </summary>
        <div className="fmed-action-menu-panel">
          <strong>Documentazione</strong>
          {[
          ["generale", "Generale"],
          ["fotografie", "Fotografie"],
          ["schemi", "Schemi e progetti"],
          ["certificazioni", "Certificazioni"],
          ["contratti", "Contratti"],
          ["costi", "Costi"],
          ["manuali", "Manuali"]].
          map(([tipo, label]) =>
          <button type="button" key={tipo} onClick={() => apriMenuDocumentazioneInfrastruttura(infrastruttura, tipo)}>{label}</button>
          )}
        </div>
      </details>
      <button
        type="button"
        className="fmed-icon-action is-info fmed-style-asset-secondary-action"
        data-label="Report"
        style={{

          background: "#E8F7F8",
          borderColor: "#BEE3E8",
          color: "#047481"
        }}
        title="Apri link report"
        aria-label="Apri report"
        onClick={() => apriReportInfrastruttura(infrastruttura)}>
        
        <FmedIcon name="chart" /><span className="fmed-sr-only">Report</span>
      </button>
      <details className="fmed-action-menu">
        <summary className="fmed-icon-action is-warning" title="Allega documento" aria-label="Allega documento" data-label="Allega">
          <FmedIcon name="upload" /><span className="fmed-sr-only">Allega</span>
        </summary>
        <div className="fmed-action-menu-panel is-right">
          <strong>Cartella di destinazione</strong>
          {[
          ["ordinarie", "Attività ordinarie"],
          ["straordinarie", "Attività straordinarie"],
          ["fotografie", "Fotografie"],
          ["schemi", "Schemi e progetti"],
          ["certificazioni", "Certificazioni"],
          ["contratti", "Contratti"],
          ["costi", "Costi"],
          ["manuali", "Manuali"],
          ["generale", "Documentazione varia"]].
          map(([tipo, label]) =>
          <button type="button" key={tipo} onClick={() => apriMenuAllegaInfrastruttura(infrastruttura, tipo)}>{label}</button>
          )}
        </div>
      </details>
      {permessiRuoloFmed.canEdit &&
      <button
        type="button"
        className="fmed-icon-action fmed-style-asset-ghost-action"
        data-label="Modifica"

        title="Modifica infrastruttura"
        aria-label="Modifica infrastruttura"
        onClick={() => apriModificaInfrastruttura(infrastruttura)}>
        
          <FmedIcon name="edit" /><span className="fmed-sr-only">Modifica</span>
        </button>
      }
      {permessiRuoloFmed.canEdit &&
      <button
        type="button"
        className="fmed-icon-action is-danger fmed-style-danger-button"
        data-label="Elimina"

        title="Elimina infrastruttura"
        aria-label="Elimina infrastruttura"
        onClick={() => eliminaInfrastruttura(infrastruttura)}
        disabled={eliminazioneInfraLoading}>
        
          <FmedIcon name="trash" /><span className="fmed-sr-only">Elimina</span>
        </button>
      }
    </div>);

}
