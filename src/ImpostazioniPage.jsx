import FmedIcon from "./components/ui/FmedIcon.jsx";
import CoreStandardPage from "./CoreStandardPage.jsx";

const TOOLS = [
  {
    page: "Costi",
    title: "Costi",
    kicker: "Controllo economico",
    text: "Analizza spese, fornitori, categorie e andamento dei costi manutentivi.",
    icon: "euro",
  },
  {
    page: "Export",
    title: "Report",
    kicker: "Analisi ed esportazioni",
    text: "Genera report filtrati, controlli di qualità ed esportazioni operative.",
    icon: "chart",
  },
];

export default function ImpostazioniPage({
  apiBaseUrl,
  canManage = false,
  onDataChanged,
  dictionariesOnly = false,
  onNavigate,
}) {
  if (dictionariesOnly) {
    return (
      <main className="p0-governance p0-governance--catalogs">
        <header className="p0-governance__head">
          <div>
            <span className="p0-governance__icon">
              <FmedIcon name="book" />
            </span>

            <div>
              <span>Conoscenza condivisa</span>
              <h1>Cataloghi</h1>
              <p>
                Una sola fonte per valori, regole operative e qualità dei dati.
              </p>
            </div>
          </div>
        </header>

        <CoreStandardPage
          apiBaseUrl={apiBaseUrl}
          canManage={canManage}
          onDataChanged={onDataChanged}
          initialTab="DIZIONARI"
        />
      </main>
    );
  }

  return (
    <main className="p0-governance p0-governance--tools fmed-tools-page">
      <header className="p0-governance__head fmed-tools-hero">
        <div>
          <span className="p0-governance__icon fmed-tools-hero-icon">
            <FmedIcon name="settings" />
          </span>

          <div>
            <span>Governance e controllo</span>
            <h1>Strumenti</h1>
            <p>
              Costi e report operativi in un unico spazio coordinato.
            </p>
          </div>
        </div>

        <span className="p0-governance__role fmed-tools-role">
          {canManage ? "Amministrazione abilitata" : "Consultazione"}
        </span>
      </header>

      <section className="fmed-tools-intro">
        <div>
          <span>Pannello operativo</span>
          <h2>Controllo economico e reportistica FMED</h2>
          <p>
            Accedi alle due funzioni trasversali senza duplicare attività,
            dati o configurazioni presenti negli altri moduli.
          </p>
        </div>

        <strong>2 funzioni disponibili</strong>
      </section>

      <section
        className="p0-tool-grid fmed-tools-grid"
        aria-label="Funzioni strumenti"
      >
        {TOOLS.map((tool) => (
          <div
            key={tool.page}
            className={`fmed-tools-card fmed-tools-card--${tool.page.toLowerCase()}`}
            onClick={() => onNavigate?.(tool.page)}
          >
            <span className="fmed-tools-card-icon">
              <FmedIcon name={tool.icon} />
            </span>

            <div className="fmed-tools-card-copy">
              <small>{tool.kicker}</small>
              <strong>{tool.title}</strong>
              <p>{tool.text}</p>
            </div>

            <span className="fmed-tools-card-arrow" aria-hidden="true">
              →
            </span>
          </div>
        ))}
      </section>

      <section className="fmed-tools-note">
        <FmedIcon name="info" />

        <div>
          <strong>Funzioni trasversali separate dal lavoro operativo</strong>
          <span>
            Asset, interventi, scadenze e processi restano nei rispettivi
            moduli. Qui sono disponibili soltanto Costi e Report.
          </span>
        </div>
      </section>
    </main>
  );
}
