import FmedIcon from "./components/ui/FmedIcon.jsx";
import CoreStandardPage from "./CoreStandardPage.jsx";
import SystemAuditPage from "./SystemAuditPage.jsx";

const SECTIONS = [
  { key: "STRUMENTI", title: "Panoramica" },
  { key: "UTENTI", title: "Accessi" },
  { key: "MASTER_DATA", title: "Cataloghi" },
  { key: "AUDIT", title: "Controllo sistema" }
];

const TOOLS = [
  { page: "Costi", title: "Costi", text: "Spese, fornitori e andamento economico.", icon: "euro", color: "amber" },
  { page: "Export", title: "Report", text: "Esportazioni e analisi filtrate.", icon: "chart", color: "blue" },
  { page: "SharePoint", title: "Documenti", text: "Archivio tecnico SharePoint.", icon: "folder", color: "cyan" },
  { page: "Processi", title: "Processi", text: "Procedure, responsabilità e controlli.", icon: "process", color: "violet" },
  { page: "Dizionari", title: "Cataloghi", text: "Valori canonici dei menu FMED.", icon: "book", color: "rose" }
];

export default function ImpostazioniPage({
  apiBaseUrl, canManage = false, activeTab = "STRUMENTI", onTabChange,
  onDataChanged, dictionariesOnly = false, onNavigate
}) {
  if (dictionariesOnly) {
    return (
      <main className="p0-governance p0-governance--catalogs">
        <header className="p0-governance__head">
          <div><span className="p0-governance__icon"><FmedIcon name="book" /></span><div><span>Conoscenza condivisa</span><h1>Cataloghi</h1><p>Una sola fonte per valori, regole operative e qualità dei dati.</p></div></div>
        </header>
        <CoreStandardPage apiBaseUrl={apiBaseUrl} canManage={canManage} onDataChanged={onDataChanged} initialTab="DIZIONARI" />
      </main>
    );
  }

  return (
    <main className="p0-governance p0-governance--tools">
      <header className="p0-governance__head">
        <div><span className="p0-governance__icon"><FmedIcon name="settings" /></span><div><span>Amministrazione</span><h1>Strumenti</h1><p>Accessi, report, archivi e controlli occasionali, separati dal lavoro operativo.</p></div></div>
        <span className="p0-governance__role">{canManage ? "Amministrazione abilitata" : "Consultazione"}</span>
      </header>

      <nav className="p0-governance__tabs" aria-label="Sezioni strumenti">
        {SECTIONS.map((section) => <button type="button" key={section.key} className={activeTab === section.key ? "is-active" : ""} onClick={() => onTabChange?.(section.key)}>{section.title}</button>)}
      </nav>

      {activeTab === "STRUMENTI" && (
        <>
          <section className="p0-tools-intro">
            <div><span className="p0-kicker">Sistema coordinato</span><h2>Il lavoro tecnico resta nelle pagine operative</h2><p>Qui sono raccolte soltanto le funzioni trasversali. Cicli, cataloghi e processi si aggiornano attraverso le operazioni già registrate in FMED.</p></div>
            <span><i /> Motori attivi</span>
          </section>
          <section className="p0-tool-grid">
            {TOOLS.map((tool) => (
              <button type="button" key={tool.page} className={`is-${tool.color}`} onClick={() => onNavigate?.(tool.page)}>
                <span><FmedIcon name={tool.icon} /></span><div><strong>{tool.title}</strong><small>{tool.text}</small></div><b>→</b>
              </button>
            ))}
          </section>
          <section className="p0-tools-note"><FmedIcon name="info" /><div><b>Nessuna manutenzione tecnica periodica richiesta</b><span>Accedi alle sezioni avanzate solo per correggere un dato, aggiungere un valore o verificare il sistema.</span></div></section>
        </>
      )}

      {activeTab === "UTENTI" && (
        <section className="p0-access">
          <header><span className="p0-kicker">Controllo accessi</span><h2>Ruoli chiari, funzioni proporzionate</h2><p>La configurazione degli accessi non modifica il patrimonio tecnico.</p></header>
          <div>
            <article><span>A</span><div><b>Admin</b><small>Tutte le funzioni operative e amministrative.</small></div><em>Completo</em></article>
            <article><span>S</span><div><b>Service</b><small>Gestione tecnica delle attività autorizzate.</small></div><em>Operativo</em></article>
            <article><span>U</span><div><b>User</b><small>Consultazione delle informazioni assegnate.</small></div><em>Lettura</em></article>
          </div>
        </section>
      )}

      {activeTab === "MASTER_DATA" && (
        <section className="p0-tools-callout"><div><span className="p0-kicker">Fonte unica</span><h2>I dati centralizzati vivono nei Cataloghi</h2><p>Nessuna copia dentro Strumenti: valori, regole operative e qualità dati hanno una sola destinazione.</p></div><button type="button" className="p0-btn p0-btn--tools" onClick={() => onNavigate?.("Dizionari")}>Apri Cataloghi</button></section>
      )}

      {activeTab === "AUDIT" && <SystemAuditPage apiBaseUrl={apiBaseUrl} canManage={canManage} />}
    </main>
  );
}
