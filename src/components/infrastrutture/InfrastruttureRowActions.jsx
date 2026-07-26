import FmedIcon from "../ui/FmedIcon.jsx";

export default function InfrastruttureRowActions(props) {
  const {
    styles,
    infrastruttura,
    permessiRuoloFmed,
    apriMenuAttivitaInfrastruttura,
    apriMenuDocumentazioneInfrastruttura,
    apriReportInfrastruttura,
    apriMenuAllegaInfrastruttura,
    apriModificaInfrastruttura,
    eliminaInfrastruttura,
    eliminazioneInfraLoading,
  } = props;

  return (
    <div className="fmed-row-action-bar">
      <button
        type="button"
        className="fmed-icon-action"
        style={styles.assetSecondaryAction}
        title="Apri attività ordinarie o straordinarie"
        aria-label="Apri attività"
        onClick={() => apriMenuAttivitaInfrastruttura(infrastruttura)}
      >
        <FmedIcon name="activity" /><span className="fmed-sr-only">Attività</span>
      </button>
      <button
        type="button"
        className="fmed-icon-action"
        style={styles.assetSecondaryAction}
        title="Apri documentazione SharePoint"
        aria-label="Apri documentazione"
        onClick={() => apriMenuDocumentazioneInfrastruttura(infrastruttura)}
      >
        <FmedIcon name="folder" /><span className="fmed-sr-only">Documentazione</span>
      </button>
      <button
        type="button"
        className="fmed-icon-action is-info"
        style={{
          ...styles.assetSecondaryAction,
          background: "#E8F7F8",
          borderColor: "#BEE3E8",
          color: "#047481",
        }}
        title="Apri link report"
        aria-label="Apri report"
        onClick={() => apriReportInfrastruttura(infrastruttura)}
      >
        <FmedIcon name="chart" /><span className="fmed-sr-only">Report</span>
      </button>
      <button
        type="button"
        className="fmed-icon-action is-warning"
        style={{
          ...styles.assetSecondaryAction,
          background: "#FFF7E6",
          borderColor: "#F2D19B",
          color: "#9A5B00",
        }}
        title="Apri la cartella SharePoint corretta per allegare un file"
        aria-label="Allega documento"
        onClick={() => apriMenuAllegaInfrastruttura(infrastruttura)}
      >
        <FmedIcon name="upload" /><span className="fmed-sr-only">Allega</span>
      </button>
      {permessiRuoloFmed.canEdit && (
        <button
          type="button"
          className="fmed-icon-action"
          style={styles.assetGhostAction}
          title="Modifica infrastruttura"
          aria-label="Modifica infrastruttura"
          onClick={() => apriModificaInfrastruttura(infrastruttura)}
        >
          <FmedIcon name="edit" /><span className="fmed-sr-only">Modifica</span>
        </button>
      )}
      {permessiRuoloFmed.canEdit && (
        <button
          type="button"
          className="fmed-icon-action is-danger"
          style={styles.dangerButton}
          title="Elimina infrastruttura"
          aria-label="Elimina infrastruttura"
          onClick={() => eliminaInfrastruttura(infrastruttura)}
          disabled={eliminazioneInfraLoading}
        >
          <FmedIcon name="trash" /><span className="fmed-sr-only">Elimina</span>
        </button>
      )}
    </div>
  );
}
