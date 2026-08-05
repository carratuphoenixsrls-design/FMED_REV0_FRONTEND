import { useState } from "react";
import InfrastruttureControls from "../components/infrastrutture/InfrastruttureControls";
import InfrastruttureRowActions from "../components/infrastrutture/InfrastruttureRowActions";
import InfrastrutturaEditor from "../components/infrastrutture/InfrastrutturaEditor";
import FmedIcon from "../components/ui/FmedIcon.jsx";

export default function InfrastrutturePage(props) {
  const [infrastruttureElencoAperto, setInfrastruttureElencoAperto] =
    useState(false);

  const [infrastruttureSelezionate, setInfrastruttureSelezionate] =
    useState([]);

  const {
    infrastruttureFiltrate = [],
    infrastruttureConStato = [],
    infraOk = [],
    infraInScadenza = [],
    infraScadute = [],
    formattaData = (value) => value || "-",
    formInfrastrutturaOpen
  } = props || {};

  const metrics = [
    ["Nel perimetro", infrastruttureFiltrate.length, "building"],
    ["Scadute", infraScadute.length, "alert"],
    ["Entro 30 giorni", infraInScadenza.length, "clock"],
    ["Programmate", infraOk.length, "check"]
  ];

  const chiaveInfrastruttura = (row, index = 0) =>
    String(
      row?.id ??
      row?.codice ??
      row?.codice_infrastruttura ??
      `INFRASTRUTTURA-${index}`
    );

  const infrastrutturaSelezionata = (row, index) =>
    infrastruttureSelezionate.includes(
      chiaveInfrastruttura(row, index)
    );

  const infrastruttureSelezionateVisualizzate =
    infrastruttureFiltrate.filter((row, index) =>
      infrastrutturaSelezionata(row, index)
    );

  const toggleInfrastruttura = (row, index) => {
    const chiave = chiaveInfrastruttura(row, index);

    setInfrastruttureSelezionate((correnti) =>
      correnti.includes(chiave)
        ? correnti.filter((item) => item !== chiave)
        : [...correnti, chiave]
    );
  };

  const selezionaVisibili = () => {
    setInfrastruttureSelezionate(
      infrastruttureFiltrate.map((row, index) =>
        chiaveInfrastruttura(row, index)
      )
    );
  };

  const deselezionaTutte = () => {
    setInfrastruttureSelezionate([]);
  };

  const chiudiPatrimonio = () => {
    setInfrastruttureSelezionate([]);
    setInfrastruttureElencoAperto(false);
  };

  const esportaExcelSelezionate = () => {
    const righe = infrastruttureSelezionateVisualizzate;

    if (!righe.length) {
      window.alert(
        "SELEZIONA ALMENO UNA INFRASTRUTTURA DA ESPORTARE."
      );
      return;
    }

    const pulisci = (value) => {
      if (value === null || value === undefined) return "";

      return String(value)
        .replaceAll('"', '""')
        .replace(/\r?\n|\r/g, " ")
        .trim();
    };

    const cella = (value) => `"${pulisci(value)}"`;

    const intestazioni = [
      "CODICE",
      "IMPIANTO",
      "SEDE",
      "CATEGORIA",
      "DITTA",
      "PRIORITÀ",
      "PERIODICITÀ",
      "PROSSIMO INTERVENTO",
      "STATO"
    ];

    const contenuto = righe.map((row, index) =>
      [
        row.codice ||
          row.codice_infrastruttura ||
          `INF-${String(index + 1).padStart(5, "0")}`,
        row.descrizione || row.attivita || "",
        row.sede || "",
        row.categoria || "",
        row.ditta || row.ditta_esecutrice || "",
        row.priorita || "",
        row.periodicita || "",
        row.prossimo_intervento || "",
        row?._statoInfra?.testo || row.stato || ""
      ]
        .map(cella)
        .join(";")
    );

    const csv = [
      intestazioni.map(cella).join(";"),
      ...contenuto
    ].join("\r\n");

    const blob = new Blob(
      ["\uFEFF" + csv],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const data = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download =
      `FMED_INFRASTRUTTURE_SELEZIONATE_${data}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <main
      className={`p0-operations p0-operations--infrastructure ${
        infrastruttureElencoAperto
          ? "is-infrastructure-register-open"
          : ""
      }`}
    >
      <header className="p0-operations__head">
        <div className="p0-operations__identity">
          <span className="p0-operations__icon">
            <FmedIcon name="building" />
          </span>

          <div>
            <span>Luoghi e impianti</span>
            <h1>Infrastrutture</h1>
            <p>
              Conosci consistenza, responsabilità, manutenzioni e
              documenti del patrimonio impiantistico.
            </p>
          </div>
        </div>

        <div className="p0-operations__metric">
          <strong>{infrastruttureConStato.length}</strong>
          <span>Elementi censiti</span>
        </div>
      </header>

      <InfrastruttureControls
        {...props}
        infrastruttureElencoAperto={infrastruttureElencoAperto}
        setInfrastruttureElencoAperto={setInfrastruttureElencoAperto}
      />

      <section
        className="p0-metric-strip"
        aria-label="Sintesi infrastrutture"
      >
        {metrics.map(([label, value, icon]) => (
          <article key={label}>
            <span className="p0-metric-strip__icon">
              <FmedIcon name={icon} />
            </span>

            <div>
              <small>{label}</small>
              <strong>{value}</strong>
            </div>
          </article>
        ))}
      </section>

      {/* INFRASTRUTTURE VISTA PATRIMONIO START */}
      {infrastruttureElencoAperto && (
        <section className="p0-register">
          <header className="p0-infrastructure-register-header">
            <div className="p0-infrastructure-register-title">
              <span className="p0-kicker">
                Patrimonio filtrato
              </span>

              <h2>
                {infrastruttureFiltrate.length} infrastrutture
              </h2>

              <p>
                Seleziona le righe da esportare o gestisci ogni
                infrastruttura.
              </p>
            </div>

            <div
              className="p0-infrastructure-register-toolbar"
              role="toolbar"
              aria-label="Comandi patrimonio infrastrutture"
            >
              <button
                type="button"
                className="p0-btn p0-infrastructure-register-toolbar__select"
                onClick={selezionaVisibili}
                disabled={!infrastruttureFiltrate.length}
              >
                SELEZIONA VISIBILI · {infrastruttureFiltrate.length}
              </button>

              <button
                type="button"
                className="p0-btn p0-infrastructure-register-toolbar__clear"
                onClick={deselezionaTutte}
                disabled={!infrastruttureSelezionate.length}
              >
                DESELEZIONA · {infrastruttureSelezionate.length}
              </button>

              <button
                type="button"
                className="p0-btn p0-infrastructure-register-toolbar__excel"
                onClick={esportaExcelSelezionate}
                disabled={
                  !infrastruttureSelezionateVisualizzate.length
                }
              >
                ESPORTA EXCEL ·{" "}
                {infrastruttureSelezionateVisualizzate.length}
              </button>

              <button
                type="button"
                className="p0-btn p0-infrastructure-register-toolbar__close"
                onClick={chiudiPatrimonio}
              >
                CHIUDI PATRIMONIO
              </button>
            </div>
          </header>

          <div className="p0-table-wrap">
            <table>
              <thead>
                <tr>
                  <th className="p0-infrastructure-select-column">
                    SEL.
                  </th>
                  <th>Impianto</th>
                  <th>Contesto</th>
                  <th>Gestione</th>
                  <th>Ciclo</th>
                  <th>Prossima</th>
                  <th>Stato</th>
                  <th>Azioni</th>
                </tr>
              </thead>

              <tbody>
                {infrastruttureFiltrate.map((row, index) => {
                  const selected =
                    infrastrutturaSelezionata(row, index);

                  return (
                    <tr
                      key={chiaveInfrastruttura(row, index)}
                      className={selected ? "is-selected" : ""}
                    >
                      <td className="p0-infrastructure-select-cell">
                        <input
                          type="checkbox"
                          aria-label={`Seleziona ${
                            row.codice ||
                            row.descrizione ||
                            "infrastruttura"
                          }`}
                          checked={selected}
                          onChange={() =>
                            toggleInfrastruttura(row, index)
                          }
                        />
                      </td>

                      <td>
                        <b>{row.descrizione || "-"}</b>
                        <small>
                          {row.codice ||
                            `INF-${String(
                              row.id || index + 1
                            ).padStart(5, "0")}`}
                        </small>
                      </td>

                      <td>
                        <b>{row.sede || "-"}</b>
                        <small>{row.categoria || "-"}</small>
                      </td>

                      <td>
                        <b>{row.ditta || "-"}</b>
                        <small>{row.priorita || "MEDIA"}</small>
                      </td>

                      <td>
                        <span>{row.periodicita || "-"}</span>
                      </td>

                      <td>
                        <b>
                          {formattaData(row.prossimo_intervento)}
                        </b>
                      </td>

                      <td>
                        <span className="p0-state">
                          <i
                            style={{
                              background:
                                row?._statoInfra?.colore ||
                                "#7d8da3"
                            }}
                          />
                          {row?._statoInfra?.testo ||
                            "Da verificare"}
                        </span>
                      </td>

                      <td>
                        <InfrastruttureRowActions
                          {...props}
                          infrastruttura={row}
                        />
                      </td>
                    </tr>
                  );
                })}

                {!infrastruttureFiltrate.length && (
                  <tr>
                    <td colSpan={8} className="p0-empty">
                      Nessuna infrastruttura corrisponde ai filtri.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {/* INFRASTRUTTURE VISTA PATRIMONIO END */}

      {formInfrastrutturaOpen && (
        <InfrastrutturaEditor {...props} />
      )}
    </main>
  );
}