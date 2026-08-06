import FmedIcon from "../ui/FmedIcon.jsx";

export default function CostiControls({
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
}) {
  return (
    <section
      className="fmed-costi-controls fmed-costi-v2-controls"
      aria-labelledby="fmed-costi-filters-title"
    >
      <header className="fmed-costi-v2-controls-head">
        <div className="fmed-costi-v2-controls-title">
          <span>
            <FmedIcon name="chart" size={18} />
          </span>

          <div>
            <small>Filtri economici</small>
            <h2 id="fmed-costi-filters-title">Perimetro dell’analisi</h2>
            <p>
              Seleziona periodo, sede, ditta, attività o cespite. I
              risultati si aggiornano senza alterare i dati originali.
            </p>
          </div>
        </div>

        <div className="fmed-costi-v2-period">
          <small>Periodo selezionato</small>
          <strong>{labelPeriodoContabileInterventi()}</strong>
        </div>
      </header>

      <div className="fmed-costi-v2-filter-grid">
        <label>
          <span>Anno contabile</span>
          <select
            value={filtroInterventiAnnoContabile}
            onChange={(event) =>
              setFiltroInterventiAnnoContabile(event.target.value)
            }
          >
            {listaAnniContabiliInterventi.map((anno) => (
              <option key={anno} value={anno}>
                {anno}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Periodo</span>
          <select
            value={filtroInterventiPeriodoContabile}
            onChange={(event) =>
              setFiltroInterventiPeriodoContabile(event.target.value)
            }
          >
            <option value="ANNO">Tutto l’anno</option>
            <option value="T1">1° trimestre</option>
            <option value="T2">2° trimestre</option>
            <option value="T3">3° trimestre</option>
            <option value="T4">4° trimestre</option>
            <option value="S1">1° semestre</option>
            <option value="S2">2° semestre</option>
            <option value="PERSONALIZZATO">
              Periodo personalizzato
            </option>
          </select>
        </label>

        {filtroInterventiPeriodoContabile === "PERSONALIZZATO" && (
          <>
            <label>
              <span>Dal</span>
              <input
                type="date"
                value={filtroInterventiPeriodoDa}
                onChange={(event) =>
                  setFiltroInterventiPeriodoDa(event.target.value)
                }
              />
            </label>

            <label>
              <span>Al</span>
              <input
                type="date"
                value={filtroInterventiPeriodoA}
                onChange={(event) =>
                  setFiltroInterventiPeriodoA(event.target.value)
                }
              />
            </label>
          </>
        )}

        <label>
          <span>Sede</span>
          <select
            value={filtroInterventiSede}
            onChange={(event) =>
              setFiltroInterventiSede(event.target.value)
            }
          >
            <option value="TUTTE">Tutte le sedi</option>
            {listaSediInterventi.map((sede) => (
              <option key={sede} value={sede}>
                {sede}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Società / ditta</span>
          <select
            value={filtroInterventiSocieta}
            onChange={(event) =>
              setFiltroInterventiSocieta(event.target.value)
            }
          >
            <option value="TUTTE">Tutte le società e ditte</option>
            {listaSocietaInterventi.map((societa) => (
              <option key={societa} value={societa}>
                {societa}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Attività</span>
          <select
            value={filtroInterventiAttivita}
            onChange={(event) =>
              setFiltroInterventiAttivita(event.target.value)
            }
          >
            <option value="TUTTE">Tutte le attività</option>
            {listaAttivitaFiltroInterventi.map((attivita) => (
              <option key={attivita} value={attivita}>
                {attivita}
              </option>
            ))}
          </select>
        </label>

        <label className="fmed-costi-v2-field--asset">
          <span>Cespite</span>
          <select
            value={filtroInterventiCodice}
            onChange={(event) =>
              setFiltroInterventiCodice(event.target.value)
            }
          >
            <option value="TUTTE">Tutti i cespiti</option>
            {listaCodiciFiltroInterventi.map((codice) => (
              <option key={codice} value={codice}>
                {codice}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="fmed-costi-v2-actions">
        <button
          type="button"
          className="fmed-costi-v2-button fmed-costi-v2-button--secondary"
          onClick={resetFiltriInterventi}
        >
          <FmedIcon name="history" size={17} />
          Azzera filtri
        </button>

        <button
          type="button"
          className="fmed-costi-v2-button fmed-costi-v2-button--primary"
          onClick={esportaInterventiFiltratiPdf}
        >
          <FmedIcon name="file" size={17} />
          Esporta dettaglio PDF
        </button>
        <button
          type="button"
          className="fmed-costi-v2-button fmed-costi-v2-button--excel"
          onClick={esportaInterventiFiltratiExcel}
        >
          <FmedIcon name="chart" size={17} />
          Esporta Excel
        </button>
      </div>
    </section>
  );
}
