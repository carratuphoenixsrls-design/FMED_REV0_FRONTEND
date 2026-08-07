function SelectField({ label, value, onChange, children }) {
  return (
    <label className="p0-field">
      <span>{label}</span>
      <select value={value} onChange={onChange}>
        {children}
      </select>
    </label>
  );
}

export default function Sicurezza8108Controls({
  buildOpenUrl = () => "#",
  load = () => {},
  refreshing = false,
  search = "",
  setSearch = () => {},
  sede = "TUTTE",
  setSede = () => {},
  categoria = "TUTTE",
  setCategoria = () => {},
  sedi = [],
  categorie = [],
  resetFilters = () => {},
  filteredCount = 0,
}) {
  const sharePointUrl = buildOpenUrl(
    sede === "TUTTE" ? "" : sede,
    categoria === "TUTTE" ? "" : categoria
  );

  const filtriAttivi =
    Boolean(String(search || "").trim()) ||
    sede !== "TUTTE" ||
    categoria !== "TUTTE";

  const apriNuovaSede = () => {
    const launcher = Array.from(document.querySelectorAll("button")).find((button) => {
      const label = String(button?.textContent || "").replace(/\s+/g, " ").trim().toUpperCase();
      return label === "+ NUOVA SEDE" && !button.closest(".p0-safety-command-bar");
    });
    if (launcher) launcher.click();
  };

  return (
    <>
      <style>{`
        html body .fmed-main-content[data-fmed-page="Sicurezza 81/08"] .p0-command--safety > .p0-safety-command-bar{
          grid-template-columns:repeat(4,minmax(0,1fr)) !important;
        }
        html body .fmed-main-content[data-fmed-page="Sicurezza 81/08"] .p0-safety-command-bar__newsite{
          border:1px solid #a97805 !important;
          background:#bd8b12 !important;
          color:#ffffff !important;
          -webkit-text-fill-color:#ffffff !important;
          box-shadow:0 4px 11px rgba(189,139,18,.18) !important;
        }
        html body .fmed-main-content[data-fmed-page="Sicurezza 81/08"] .p0-safety-command-bar__newsite:hover{
          border-color:#8e6605 !important;
          background:#a97805 !important;
          color:#ffffff !important;
          -webkit-text-fill-color:#ffffff !important;
        }
        html body .fmed-main-content[data-fmed-page="Sicurezza 81/08"] > div:has(> button.p0-btn.p0-btn--safety){
          display:none !important;
        }
        @media (max-width:1180px){
          html body .fmed-main-content[data-fmed-page="Sicurezza 81/08"] .p0-command--safety > .p0-safety-command-bar{
            grid-template-columns:repeat(2,minmax(0,1fr)) !important;
          }
        }
        @media (max-width:900px){
          html body .fmed-main-content[data-fmed-page="Sicurezza 81/08"] .p0-command--safety > .p0-safety-command-bar{
            grid-template-columns:1fr !important;
          }
        }
      `}</style>

      <section className="p0-command p0-command--safety">
        <div className="p0-command__primary">
          <div className="p0-command__intro">
            <div>
              <span className="p0-kicker">Archivio documentale</span>
              <h2>Trova evidenze, registri e responsabilità</h2>
            </div>
          </div>

          <div className="p0-search">
            <input
              type="search"
              aria-label="Ricerca documenti Sicurezza 81/08"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nome documento, percorso o cartella"
            />

            <span className="p0-search__meta">
              {filteredCount} elementi
            </span>
          </div>

          <div className="p0-safety-filters">
            <SelectField
              label="Sede"
              value={sede}
              onChange={(event) => setSede(event.target.value)}
            >
              <option value="TUTTE">Tutte le sedi</option>

              {sedi.map((item) => (
                <option key={item.codice} value={item.codice}>
                  {item.label}
                </option>
              ))}
            </SelectField>

            <SelectField
              label="Categoria"
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
            >
              <option value="TUTTE">Tutte le categorie</option>

              {categorie.map((item) => (
                <option key={item.codice} value={item.codice}>
                  {item.label}
                </option>
              ))}
            </SelectField>
          </div>
        </div>

        <div
          className="p0-command__actions p0-safety-command-bar"
          role="toolbar"
          aria-label="Comandi Sicurezza 81/08"
        >
          <a
            className="p0-btn p0-safety-command-bar__sharepoint"
            href={sharePointUrl}
            target="_blank"
            rel="noreferrer"
          >
            Apri SharePoint
          </a>

          <button
            type="button"
            className="p0-btn p0-safety-command-bar__refresh"
            onClick={() => load({ silent: true })}
            disabled={refreshing}
          >
            {refreshing ? "Aggiornamento…" : "Aggiorna indice"}
          </button>

          <button
            type="button"
            className="p0-btn p0-safety-command-bar__reset"
            onClick={resetFilters}
            disabled={!filtriAttivi}
          >
            Azzera filtri
          </button>

          <button
            type="button"
            className="p0-btn p0-safety-command-bar__newsite"
            onClick={apriNuovaSede}
          >
            + Nuova sede
          </button>
        </div>
      </section>
    </>
  );
}