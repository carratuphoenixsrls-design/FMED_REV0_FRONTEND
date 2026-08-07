import InterventiControls from "../components/interventi/InterventiControls";
import FmedIcon from "../components/ui/FmedIcon.jsx";
import { PERIODICITA_STANDARD, calcolaProssimaScadenza } from "../fmedStandard.js";

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

  const normalizzaPeriodicitaIntervento = (value) => {
    const raw = String(value || "").trim().toUpperCase().replace(/[\s-]+/g, "_");
    const aliases = {
      TANTUM: "UNA_TANTUM",
      UNA_TANTUM: "UNA_TANTUM"
    };
    const codice = aliases[raw] || raw;
    return PERIODICITA_STANDARD.some((item) => item.codice === codice) ? codice : "";
  };

  const isCollaudoIntervento = (row) => String(row?.attivita || "").toUpperCase().includes("COLLAUDO");
  const isStraordinariaIntervento = (row) => String(row?.attivita || "").toUpperCase().includes("MANUTENZIONE STRAORDINARIA");

  const periodicitaCicloIntervento = (row) => {
    if (isCollaudoIntervento(row)) return "UNA_TANTUM";
    return normalizzaPeriodicitaIntervento(row?.periodicita);
  };

  const statoCicloIntervento = (row) => {
    const statoBase = String(row?.stato_ciclo || "").toUpperCase();
    if (isCollaudoIntervento(row) && statoBase === "ATTIVA") return "COMPLETATA";
    if (isStraordinariaIntervento(row) && !row?.data_prossimo_intervento && statoBase === "ATTIVA") return "COMPLETATA";
    return statoBase;
  };

  const stileStatoCicloIntervento = (row) => {
    const stato = statoCicloIntervento(row);
    if (stato === "ATTIVA") return { background: "#e8f6ed", color: "#25663b", border: "1px solid #b9dfc5" };
    if (stato === "COMPLETATA") return { background: "#fff4cf", color: "#856300", border: "1px solid #ead58c" };
    if (stato === "SOSTITUITA") return { background: "#eef1f5", color: "#5f6d7e", border: "1px solid #d5dce5" };
    if (["CESSATA", "ANNULLATA", "CANCELLATA", "FALLITA"].includes(stato)) return { background: "#fde9ed", color: "#a52a46", border: "1px solid #efbcc8" };
    return { background: "#f4f7fb", color: "#53677f", border: "1px solid #cbd8e8" };
  };

  const badgeCicloIntervento = (row) => {
    const stato = statoCicloIntervento(row);
    const periodicita = periodicitaCicloIntervento(row);
    const periodicitaVisibile = periodicita ? periodicita.replace(/_/g, " ") : "";
    return [stato, periodicitaVisibile].filter(Boolean).join(" · ");
  };

  const prossimoInterventoVisibile = (row) => {
    const periodicita = periodicitaCicloIntervento(row);

    if (periodicita === "UNA_TANTUM") return "-";

    if (periodicita && periodicita !== "DA_DEFINIRE") {
      const calcolata = calcolaProssimaScadenza(
        row?.data_ultimo_intervento,
        periodicita,
        PERIODICITA_STANDARD,
      );
      if (calcolata) return formattaData(calcolata);
    }

    return formattaData(row?.data_prossimo_intervento);
  };

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
                    <td>
                      <b style={{ display: "block" }}>{row.attivita || "-"}</b>
                      {row.stato_ciclo && (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "3px", marginTop: "7px" }}>
                          <small style={{ fontSize: "9px", lineHeight: 1, letterSpacing: ".08em", fontWeight: 700, opacity: .58 }}>STATO</small>
                          <span className="p0-tag" style={stileStatoCicloIntervento(row)}>{badgeCicloIntervento(row)}</span>
                        </div>
                      )}
                      {row._eccezione_collaudo && <span className="p0-tag" style={{ marginTop: "5px" }}>Collaudo conservato</span>}
                      {row._archivio_storico && <span className="p0-tag" style={{ marginTop: "5px" }}>Pre-2023</span>}
                    </td>
                    <td><span>{formattaData(row.data_ultimo_intervento)}</span><small>Prossimo: {prossimoInterventoVisibile(row)}</small></td>
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
