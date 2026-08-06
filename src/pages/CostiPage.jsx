import FmedIcon from "../components/ui/FmedIcon.jsx";
import CostiControls from "../components/costi/CostiControls.jsx";

export default function CostiPage(props) {
  const {
    labelPeriodoContabileInterventi,
    filtroInterventiAnnoContabile,
    setFiltroInterventiAnnoContabile,
    listaAnniContabiliInterventi,
    filtroInterventiPeriodoContabile,
    setFiltroInterventiPeriodoContabile,
    filtroInterventiPeriodoDa,
    setFiltroInterventiPeriodoDa,
    filtroInterventiPeriodoA,
    setFiltroInterventiPeriodoA,
    filtroInterventiSede,
    setFiltroInterventiSede,
    listaSediInterventi,
    filtroInterventiSocieta,
    setFiltroInterventiSocieta,
    listaSocietaInterventi,
    filtroInterventiAttivita,
    setFiltroInterventiAttivita,
    listaAttivitaFiltroInterventi,
    filtroInterventiCodice,
    setFiltroInterventiCodice,
    listaCodiciFiltroInterventi,
    resetFiltriInterventi,
    esportaInterventiFiltratiPdf,
    setPagina,
    esportaInterventiFiltratiExcel,
    formatCurrency,
    totaleSpesaInterventiFiltrati,
    interventiFiltrati,
    codiciCoinvoltiInterventi,
    ditteCoinvolteInterventi,
    costoMedioInterventoFiltrato,
    classificaCostiPerDitta,
    classificaCostiPerSede,
    classificaCostiPerCespite,
    classificaCostiPerAttivita,
    setCostiPanelAperto,
    costiPanelAperto,
    puliziaSocietaDaCorreggere,
  } = props;

  const metriche = [
    {
      key: "totale",
      label: "Totale costi",
      value: formatCurrency(totaleSpesaInterventiFiltrati),
      detail: `${interventiFiltrati.length} interventi`,
      icon: "euro",
      tone: "violet",
    },
    {
      key: "interventi",
      label: "Interventi analizzati",
      value: interventiFiltrati.length,
      detail: "interventi",
      icon: "activity",
      tone: "cyan",
    },
    {
      key: "cespiti",
      label: "Cespiti coinvolti",
      value: codiciCoinvoltiInterventi.size,
      detail: "cespiti",
      icon: "box",
      tone: "green",
    },
    {
      key: "ditte",
      label: "Ditte coinvolte",
      value: ditteCoinvolteInterventi.size,
      detail: "società e ditte",
      icon: "users",
      tone: "blue",
    },
    {
      key: "media",
      label: "Costo medio",
      value: formatCurrency(costoMedioInterventoFiltrato),
      detail: "per intervento",
      icon: "chart",
      tone: "amber",
    },
  ];

  const classifiche = [
    {
      key: "ditta",
      title: "Costi per ditta",
      rows: classificaCostiPerDitta,
      icon: "users",
      tone: "violet",
    },
    {
      key: "sede",
      title: "Costi per sede",
      rows: classificaCostiPerSede,
      icon: "building",
      tone: "cyan",
    },
    {
      key: "cespiti",
      title: "Cespiti più costosi",
      rows: classificaCostiPerCespite,
      icon: "box",
      tone: "green",
    },
    {
      key: "attivita",
      title: "Costi per attività",
      rows: classificaCostiPerAttivita,
      icon: "activity",
      tone: "blue",
    },
  ];

  return (
    <div className="fmed-costi-page fmed-costi-v2">
      <header className="fmed-costi-hero fmed-costi-v2-hero">
        <span className="fmed-costi-v2-hero-icon">
          <FmedIcon name="euro" size={30} />
        </span>

        <div className="fmed-costi-v2-hero-copy">
          <span>Controllo economico</span>
          <h1>Analisi costi manutentivi</h1>
          <p>
            Analisi economica degli interventi per anno contabile, periodo,
            sede, ditta, attività e cespite. I dati utilizzano gli stessi
            filtri operativi della pagina Interventi.
          </p>
        </div>
        <button
          type="button"
          className="fmed-costi-v2-back"
          onClick={() => setPagina("")}
        >
          <FmedIcon name="history" size={17} />
          Torna a Strumenti
        </button>

        <span className="fmed-costi-v2-hero-decoration" aria-hidden="true" />
      </header>

      <CostiControls
        {...{
          labelPeriodoContabileInterventi,
          filtroInterventiAnnoContabile,
          setFiltroInterventiAnnoContabile,
          listaAnniContabiliInterventi,
          filtroInterventiPeriodoContabile,
          setFiltroInterventiPeriodoContabile,
          filtroInterventiPeriodoDa,
          setFiltroInterventiPeriodoDa,
          filtroInterventiPeriodoA,
          setFiltroInterventiPeriodoA,
          filtroInterventiSede,
          setFiltroInterventiSede,
          listaSediInterventi,
          filtroInterventiSocieta,
          setFiltroInterventiSocieta,
          listaSocietaInterventi,
          filtroInterventiAttivita,
          setFiltroInterventiAttivita,
          listaAttivitaFiltroInterventi,
          filtroInterventiCodice,
          setFiltroInterventiCodice,
          listaCodiciFiltroInterventi,
          resetFiltriInterventi,
          esportaInterventiFiltratiPdf,
          esportaInterventiFiltratiExcel,
        }}
      />

      <section
        className="fmed-costi-summary fmed-costi-v2-summary"
        aria-labelledby="fmed-costi-summary-title"
      >
        <header className="fmed-costi-v2-section-head">
          <span>
            <FmedIcon name="chart" size={18} />
          </span>

          <div>
            <h2 id="fmed-costi-summary-title">Quadro economico filtrato</h2>
            <p>
              Valori calcolati esclusivamente sugli interventi compresi nel
              perimetro selezionato.
            </p>
          </div>
        </header>

        <div className="fmed-costi-v2-kpi-grid">
          {metriche.map((metrica) => (
            <article
              key={metrica.key}
              className={`fmed-costi-v2-kpi fmed-costi-v2-tone--${metrica.tone}`}
            >
              <span className="fmed-costi-v2-kpi-icon">
                <FmedIcon name={metrica.icon} size={23} />
              </span>

              <div>
                <span>{metrica.label}</span>
                <strong>{metrica.value}</strong>
                <small>{metrica.detail}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="fmed-costi-rankings fmed-costi-v2-rankings"
        aria-label="Classifiche economiche"
      >
        {classifiche.map(({ key, title, rows, icon, tone }) => {
          const isOpen = costiPanelAperto === key;
          const totale = rows.reduce(
            (acc, row) => acc + (Number(row.totale) || 0),
            0
          );

          return (
            <article
              key={key}
              className={`fmed-costi-accordion fmed-costi-v2-accordion fmed-costi-v2-tone--${tone} ${
                isOpen ? "is-open" : ""
              }`}
            >
              <button
                type="button"
                className="fmed-costi-v2-accordion-trigger"
                aria-expanded={isOpen}
                onClick={() =>
                  setCostiPanelAperto(isOpen ? null : key)
                }
              >
                <span className="fmed-costi-v2-accordion-icon">
                  <FmedIcon name={icon} size={20} />
                </span>

                <span className="fmed-costi-v2-accordion-copy">
                  <strong>{title}</strong>
                  <small>
                    {rows.length} voci · Totale {formatCurrency(totale)}
                  </small>
                </span>

                <span className="fmed-costi-v2-accordion-action">
                  {isOpen ? "Chiudi" : "Apri"}
                  <span aria-hidden="true">{isOpen ? "⌃" : "⌄"}</span>
                </span>
              </button>

              {isOpen && (
                <div className="fmed-costi-v2-table-wrap">
                  <table className="fmed-costi-v2-table">
                    <thead>
                      <tr>
                        <th>Voce</th>
                        <th>Interventi</th>
                        <th>Cespiti</th>
                        <th>Totale costi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {rows.slice(0, 20).map((row, index) => (
                        <tr key={`${title}-${row.nome}-${index}`}>
                          <td>
                            <strong>{row.nome}</strong>
                          </td>
                          <td>{row.interventi}</td>
                          <td>{row.cespiti}</td>
                          <td>{formatCurrency(row.totale)}</td>
                        </tr>
                      ))}

                      {rows.length === 0 && (
                        <tr>
                          <td
                            colSpan={4}
                            className="fmed-costi-v2-empty"
                          >
                            <FmedIcon name="archive" size={25} />
                            <span>
                              Nessun dato disponibile con i filtri attuali.
                            </span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </article>
          );
        })}

        <article
          className={`fmed-costi-accordion fmed-costi-cleanup fmed-costi-v2-accordion fmed-costi-v2-cleanup ${
            costiPanelAperto === "pulizia" ? "is-open" : ""
          }`}
        >
          <button
            type="button"
            className="fmed-costi-v2-accordion-trigger"
            aria-expanded={costiPanelAperto === "pulizia"}
            onClick={() =>
              setCostiPanelAperto(
                costiPanelAperto === "pulizia" ? null : "pulizia"
              )
            }
          >
            <span className="fmed-costi-v2-accordion-icon">
              <FmedIcon name="settings" size={20} />
            </span>

            <span className="fmed-costi-v2-accordion-copy">
              <strong>Pulizia Ditte/Società</strong>
              <small>
                {puliziaSocietaDaCorreggere.length} varianti rilevate
              </small>
            </span>

            <span className="fmed-costi-v2-accordion-action">
              {costiPanelAperto === "pulizia" ? "Chiudi" : "Apri"}
              <span aria-hidden="true">
                {costiPanelAperto === "pulizia" ? "⌃" : "⌄"}
              </span>
            </span>
          </button>

          {costiPanelAperto === "pulizia" && (
            <div className="fmed-costi-v2-cleanup-content">
              <p>
                La tabella non modifica Supabase: mostra le varianti
                individuate e il nome standard utilizzato da FMED.
              </p>

              <div className="fmed-costi-v2-table-wrap">
                <table className="fmed-costi-v2-table">
                  <thead>
                    <tr>
                      <th>Valore presente</th>
                      <th>Nome standard FMED</th>
                      <th>Occorrenze</th>
                      <th>Esito</th>
                    </tr>
                  </thead>

                  <tbody>
                    {puliziaSocietaDaCorreggere
                      .slice(0, 80)
                      .map((row) => (
                        <tr key={`${row.standard}-${row.originale}`}>
                          <td>{row.originale}</td>
                          <td>
                            <strong>{row.standard}</strong>
                          </td>
                          <td>{row.occorrenze}</td>
                          <td>
                            <span className="fmed-costi-v2-status">
                              Da accorpare
                            </span>
                          </td>
                        </tr>
                      ))}

                    {puliziaSocietaDaCorreggere.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="fmed-costi-v2-empty"
                        >
                          Nessuna variante da correggere rilevata.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
