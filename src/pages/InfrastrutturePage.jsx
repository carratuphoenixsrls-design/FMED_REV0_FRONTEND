import InfrastruttureControls from "../components/infrastrutture/InfrastruttureControls";
import InfrastruttureRowActions from "../components/infrastrutture/InfrastruttureRowActions";
import InfrastrutturaEditor from "../components/infrastrutture/InfrastrutturaEditor";
import FmedIcon from "../components/ui/FmedIcon.jsx";

export default function InfrastrutturePage(props) {
  const {
    infrastruttureFiltrate = [],
    infrastruttureConStato = [],
    infraOk = [],
    infraInScadenza = [],
    infraScadute = [],
    formattaData = (value) => value || '-',
    formInfrastrutturaOpen
  } = props || {};
  const metrics = [
    ["Nel perimetro", infrastruttureFiltrate.length, "building"],
    ["Scadute", infraScadute.length, "alert"],
    ["Entro 30 giorni", infraInScadenza.length, "clock"],
    ["Programmate", infraOk.length, "check"]
  ];

  return (
    <main className="p0-operations p0-operations--infrastructure">
      <header className="p0-operations__head">
        <div className="p0-operations__identity">
          <span className="p0-operations__icon"><FmedIcon name="building" /></span>
          <div><span>Luoghi e impianti</span><h1>Infrastrutture</h1><p>Conosci consistenza, responsabilità, manutenzioni e documenti del patrimonio impiantistico.</p></div>
        </div>
        <div className="p0-operations__metric"><strong>{infrastruttureConStato.length}</strong><span>elementi censiti</span></div>
      </header>

      <InfrastruttureControls {...props} />

      <section className="p0-metric-strip" aria-label="Sintesi infrastrutture">
        {metrics.map(([label,value,icon]) => <article key={label}><span className="p0-metric-strip__icon"><FmedIcon name={icon} /></span><div><small>{label}</small><strong>{value}</strong></div></article>)}
      </section>

      <section className="p0-register">
        <header><div><span className="p0-kicker">Patrimonio filtrato</span><h2>{infrastruttureFiltrate.length} infrastrutture</h2><p>Attività, documentazione, report e gestione sono disponibili su ogni riga.</p></div></header>
        <div className="p0-table-wrap">
          <table>
            <thead><tr><th>Impianto</th><th>Contesto</th><th>Gestione</th><th>Ciclo</th><th>Prossima</th><th>Stato</th><th>Azioni</th></tr></thead>
            <tbody>
              {infrastruttureFiltrate.map((row,index) => (
                <tr key={row.id || index}>
                  <td><b>{row.descrizione || "-"}</b><small>{row.codice || `INF-${String(row.id || index + 1).padStart(5,"0")}`}</small></td>
                  <td><b>{row.sede || "-"}</b><small>{row.categoria || "-"}</small></td>
                  <td><b>{row.ditta || "-"}</b><small>{row.priorita || "MEDIA"}</small></td>
                  <td><span>{row.periodicita || "-"}</span></td>
                  <td><b>{formattaData(row.prossimo_intervento)}</b></td>
                  <td><span className="p0-state"><i style={{ background: row?._statoInfra?.colore || '#7d8da3' }} />{row?._statoInfra?.testo || 'Da verificare'}</span></td>
                  <td><InfrastruttureRowActions {...props} infrastruttura={row} /></td>
                </tr>
              ))}
              {!infrastruttureFiltrate.length && <tr><td colSpan={7} className="p0-empty">Nessuna infrastruttura corrisponde ai filtri.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      {formInfrastrutturaOpen && <InfrastrutturaEditor {...props} />}
    </main>
  );
}
