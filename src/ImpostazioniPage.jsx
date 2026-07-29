import FmedModuleIcon from "./components/FmedModuleIcon.jsx";
import CoreStandardPage from "./CoreStandardPage.jsx";
import SystemAuditPage from "./SystemAuditPage.jsx";

const SETTINGS_SECTIONS = [
  { key: "STRUMENTI", title: "Strumenti", description: "Report, costi, documenti e procedure guidate." },
  { key: "UTENTI", title: "Accesso", description: "Utenti e permessi del gestionale." },
  { key: "MASTER_DATA", title: "Dati avanzati", description: "Dizionari e valori dei menu, da usare solo quando serve." },
  { key: "AUDIT", title: "Controllo sistema", description: "Audit tecnico e verifica della release." },
];

const TOOL_CARDS = [
  { page: "Costi", title: "Costi", description: "Spese, fornitori e storico economico.", icon: "€" },
  { page: "Export", title: "Report e analisi", description: "Esportazioni e report filtrati.", icon: "R" },
  { page: "SharePoint", title: "Documenti SharePoint", description: "Archivio tecnico centralizzato.", icon: "S" },
  { page: "Processi", title: "Procedure guidate", description: "Operazioni complesse, dismissioni e controlli.", icon: "P" },
  { page: "Dizionari", title: "Dizionari", description: "Aggiungi una voce quando manca nei menu.", icon: "D" },
];

export default function ImpostazioniPage({ apiBaseUrl, canManage = false, activeTab = "STRUMENTI", onTabChange, onDataChanged, dictionariesOnly = false, onNavigate }) {
  const activeSection = SETTINGS_SECTIONS.find((section) => section.key === activeTab) || SETTINGS_SECTIONS[0];
  return <section className="fmed-settings-page fmed-operational-tools-page">
    {!dictionariesOnly && <>
      <header className="fmed-settings-head"><div className="fmed-banner-heading"><FmedModuleIcon module="Impostazioni" /><div className="fmed-banner-copy"><span className="fmed-module-kicker">Funzioni secondarie</span><h2>Strumenti e impostazioni</h2><p>L'uso quotidiano resta nelle pagine principali. Qui trovi soltanto report, documenti e controlli occasionali.</p></div></div><div className="fmed-settings-status"><small>Sezione</small><strong>{activeSection.title}</strong></div></header>
      <nav className="fmed-settings-tabs" aria-label="Sezioni strumenti">{SETTINGS_SECTIONS.map((section) => <button type="button" key={section.key} className={activeTab === section.key ? "active" : ""} onClick={() => onTabChange?.(section.key)}>{section.title}</button>)}</nav>
    </>}

    {activeTab === "STRUMENTI" && !dictionariesOnly && <>
      <section className="fmed-operational-auto-card"><div><span className="fmed-module-kicker">Lavoro automatico</span><h3>FMED aggiorna il sistema dietro le quinte</h3><p>Quando registri un intervento o chiudi un'attività, vengono aggiornati automaticamente ciclo precedente, prossima scadenza, dashboard, storico, codici e alert.</p></div><span className="fmed-operational-auto-status">Attivo</span></section>
      <div className="fmed-operational-tool-grid">{TOOL_CARDS.map((tool) => <button type="button" key={tool.page} onClick={() => onNavigate?.(tool.page)}><i>{tool.icon}</i><span><strong>{tool.title}</strong><small>{tool.description}</small></span><b>›</b></button>)}</div>
      <section className="fmed-settings-users"><div className="fmed-settings-copy"><span className="fmed-module-kicker">Uso normale</span><h3>Non servono operazioni tecniche periodiche</h3><p>Motore Cicli, Catalogo Canonico, Regole operative e Process Engine lavorano automaticamente. Entra nelle sezioni avanzate solo per correggere un dato ambiguo o aggiungere una nuova voce.</p></div></section>
    </>}

    {activeTab === "UTENTI" && <div className="fmed-settings-users"><div className="fmed-settings-copy"><span className="fmed-module-kicker">Controllo accessi</span><h3>Utenti e permessi</h3><p>Gestisci chi può consultare o modificare FMED. Questa sezione non cambia i dati tecnici.</p></div><div className="fmed-settings-role-grid"><article><div className="fmed-settings-role-head"><strong>Admin</strong><span>Completo</span></div><p>Accesso a tutte le funzioni operative e amministrative.</p></article><article><div className="fmed-settings-role-head"><strong>Service</strong><span>Operativo</span></div><p>Gestione tecnica autorizzata.</p></article><article><div className="fmed-settings-role-head"><strong>User</strong><span>Consultazione</span></div><p>Visualizzazione delle informazioni assegnate.</p></article></div></div>}

    {dictionariesOnly && <CoreStandardPage apiBaseUrl={apiBaseUrl} canManage={canManage} onDataChanged={onDataChanged} initialTab="DIZIONARI" />}
    {activeTab === "MASTER_DATA" && !dictionariesOnly && <section className="fmed-settings-users"><div className="fmed-settings-copy"><span className="fmed-module-kicker">Dati centralizzati</span><h3>I dizionari hanno una sola pagina</h3><p>Valori, regole operative e qualità dati sono disponibili esclusivamente nel modulo Cataloghi, senza copie dentro Strumenti.</p></div><button type="button" className="fmed-style-primary-btn" onClick={() => onNavigate?.("Dizionari")}>Apri Cataloghi</button></section>}
    {activeTab === "AUDIT" && !dictionariesOnly && <SystemAuditPage apiBaseUrl={apiBaseUrl} canManage={canManage} />}
  </section>;
}
