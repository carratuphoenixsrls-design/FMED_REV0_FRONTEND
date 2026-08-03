import FmedIcon from "../ui/FmedIcon.jsx";

export default function Sicurezza8108Controls({
  buildOpenUrl, load, refreshing, search, setSearch, sede, setSede,
  categoria, setCategoria, sedi, categorie, resetFilters, filteredCount
}) {
  const active = Boolean(search.trim()) || sede !== "TUTTE" || categoria !== "TUTTE";
  return (
    <section className="p0-command p0-command--safety">
      <div className="p0-command__primary">
        <div className="p0-command__intro">
          <div><span className="p0-kicker">Archivio documentale</span><h2>Trova evidenze, registri e responsabilità</h2></div>
          <div className="p0-safety-actions">
            <a className="p0-btn p0-btn--safety" href={buildOpenUrl()} target="_blank" rel="noreferrer"><FmedIcon name="folder" /> Apri SharePoint</a>
            <button className="p0-btn" type="button" onClick={() => load({ silent: true })} disabled={refreshing}>{refreshing ? "Aggiornamento…" : "Aggiorna indice"}</button>
          </div>
        </div>
        <div className="p0-search">
          <span className="p0-search__mark" aria-hidden="true">⌕</span>
          <input aria-label="Cerca documenti Sicurezza 81/08" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nome documento, percorso o cartella" autoComplete="off" />
          <span className="p0-search__meta">{filteredCount} elementi</span>
        </div>
        <div className="p0-safety-filters">
          <label className="p0-field"><span>Sede</span><select value={sede} onChange={(e) => setSede(e.target.value)}><option value="TUTTE">Tutte le sedi</option>{sedi.map((v) => <option key={v.codice} value={v.codice}>{v.label}</option>)}</select></label>
          <label className="p0-field"><span>Categoria</span><select value={categoria} onChange={(e) => setCategoria(e.target.value)}><option value="TUTTE">Tutte le categorie</option>{categorie.map((v) => <option key={v.codice} value={v.codice}>{v.label}</option>)}</select></label>
          <button className="p0-btn p0-btn--quiet" type="button" onClick={resetFilters} disabled={!active}>Azzera filtri</button>
        </div>
      </div>
    </section>
  );
}
