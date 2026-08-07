import InterventiControls from "../components/interventi/InterventiControls";
import FmedIcon from "../components/ui/FmedIcon.jsx";

export default function InterventiPage(props) {
  const {
    interventiFiltrati = [],
    interventi = [],
    interventiIncludeStorico,
    cambiaVistaStoricoInterventi = () => {},
    formatCurrency = (value) => Number(value || 0).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }),
    importoIntervento = () => 0,
    totaleSpesaInterventiFiltrati,
    labelPeriodoContabileInterventi = () => 'Periodo corrente',
    codiciCoinvoltiInterventi = new Set(),
    ditteCoinvolteInterventi = new Set(),
    interventiElencoAperto,
    setInterventiElencoAperto = () => {},
    interventiFiltratiRenderizzati = [],
    apriSchedaDaCodice = () => {},
    normalizzaSocietaDitta = (value) => value || '-',
    formattaData = (value) => value || '-',
    BottoneJobReport = () => null,
    apriModificaIntervento = () => {},
    eliminaIntervento = () => {},
    setInterventiRenderLimit = () => {},
    FMED_RENDER_BATCH_INTERVENTI
  } = props || {};

  const metrics = [
    ["Spesa", formatCurrency(totaleSpesaInterventiFiltrati), labelPeriodoContabileInterventi(), "euro"],
    ["Attività", interventiFiltrati.length, `su ${interventi.length} totali`, "activity"],
    ["Beni", codiciCoinvoltiInterventi.size, "coinvolti", "box"],
    ["Esecutori", ditteCoinvolteInterventi.size, "ditte e società", "users"]
  ];

  return (
    <main className="p0-operations p0-operations--maintenance">
      <header className="p0-operations__head">
        <div className="p0-operations__identity">
          <span className="p0-operations__icon"><FmedIcon name="activity" /></span>
          <div><span>Registro manutentivo</span><h1>Interventi</h1><p>Dal bene all’attività: pianifica, documenta e ricostruisci ogni lavoro.</p></div>
        </div>
        <div className="p0-operations__metric">
          <strong>{interventiFiltrati.length}</strong><span>attività nel perimetro</span>
        </div>
      </header><section className="p0-metric-strip" aria-label="Sintesi interventi">
        {metrics.map(([label, value, note, icon]) => (
          <article key={label}><span className="p0-metric-strip__icon"><FmedIcon name={icon} /></span><div><small>{label}</small><strong>{value}</strong><span>{note}</span></div></article>
        ))}
      </section>

      <InterventiControls {...props} />

      <section className="p0-history-switch">
        <div>
          <b>{interventiIncludeStorico ? "Registro completo" : "Vista operativa"}</b>
          <span>{interventiIncludeStorico ? "Sono inclusi anche i record precedenti al 2023." : "Attività dal 2023 a oggi; i collaudi restano sempre disponibili."}</span>
        </div>
        <button className="p0-btn" type="button" onClick={() => cambiaVistaStoricoInterventi?.(!interventiIncludeStorico)}>
          {interventiIncludeStorico ? "Mostra solo attività operative" : "Consulta storico completo"}
        </button>
      </section>

      {interventiElencoAperto && (
        <section className="p0-register">
          <header><div><span className="p0-kicker">Registro filtrato</span><h2>{interventiFiltrati.length} interventi</h2><p>Seleziona un codice per entrare nella scheda del bene.</p></div><button className="p0-btn p0-btn--quiet" onClick={() => setInterventiElencoAperto(false)}>Chiudi</button></header>
          <div className="p0-table-wrap">
            <table>
              <thead><tr><th>Cespite</th><th>Contesto</th><th>Intervento</th><th>Ultimo / prossimo</th><th>Costo</th><th>Documento</th><th>Azioni</th></tr></thead>
              <tbody>
                {interventiFiltratiRenderizzati.map((row, index) => (
                  <tr key={row.id_intervento || index}>
                    <td><button className="p0-table-link" onClick={() => apriSchedaDaCodice(row.codice_strumento || row.codicestrumento)}>{row.codice_strumento || row.codicestrumento}</button><small>{row.sede || "-"}</small></td>
                    <td><b>{normalizzaSocietaDitta(row.ditta_esecutrice || row.ditta)}</b><small>{row.tipologia || "-"}</small></td>
                    <td><b>{row.attivita || "-"}</b>{row.stato_ciclo && <span className="p0-tag">{(!row.data_prossimo_intervento && String(row.periodicita || "").toUpperCase().includes("UNA TANTUM") ? "COMPLETATA" : row.stato_ciclo)}{row.periodicita ? ` · ${row.periodicita}` : ""}</span>}{row._eccezione_collaudo && <span className="p0-tag">Collaudo conservato</span>}{row._archivio_storico && <span className="p0-tag">Pre-2023</span>}</td>
                    <td><span>{formattaData(row.data_ultimo_intervento)}</span><small>Prossimo: {formattaData(row.data_prossimo_intervento)}</small></td>
                    <td><b>{formatCurrency(importoIntervento(row))}</b></td>
                    <td><BottoneJobReport intervento={row} /></td>
                    <td><div className="p0-row-actions"><button onClick={() => apriModificaIntervento(row)} title="Modifica"><FmedIcon name="edit" /></button><button className="is-danger" onClick={() => eliminaIntervento(row)} title="Elimina"><FmedIcon name="trash" /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {interventiFiltrati.length > interventiFiltratiRenderizzati.length && <button className="p0-btn p0-register__more" onClick={() => setInterventiRenderLimit((v) => v + FMED_RENDER_BATCH_INTERVENTI)}>Mostra altri · {interventiFiltratiRenderizzati.length}/{interventiFiltrati.length}</button>}
        </section>
      )}
    </main>
  );
}
