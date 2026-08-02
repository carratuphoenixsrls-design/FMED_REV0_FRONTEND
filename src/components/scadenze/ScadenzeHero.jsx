import FmedModuleIcon from "../FmedModuleIcon.jsx";

export default function ScadenzeHero({ filteredCount, totalCount }) {
  return (
    <section className="fmed-module-hero fmed-module-hero-scadenze fmed-style-scadenze-hero-panel">
      <div className="fmed-module-hero-heading">
        <FmedModuleIcon module="Scadenze" />
        <div className="fmed-module-hero-copy fmed-style-scadenze-hero-left">
          <div className="fmed-module-hero-eyebrow fmed-style-scadenze-hero-eyebrow">Motore cicli unificato</div>
          <h2 className="fmed-module-hero-title fmed-style-scadenze-hero-title">Scadenze operative unificate</h2>
          <p className="fmed-module-hero-subtitle fmed-style-scadenze-hero-subtitle">
            Un solo ciclo corrente per ciascun elemento e famiglia: Asset, Infrastrutture e Sicurezza 81/08 senza sovrapposizioni false.
          </p>
        </div>
      </div>
      <div className="fmed-module-hero-metric fmed-style-scadenze-hero-right">
        <div className="fmed-module-hero-metric-value fmed-style-scadenze-hero-badge-number">{filteredCount}</div>
        <div className="fmed-module-hero-metric-label fmed-style-scadenze-hero-badge-text">Cicli operativi visibili</div>
        <div className="fmed-module-hero-metric-sub fmed-style-scadenze-hero-badge-sub">Su {totalCount} totali</div>
      </div>
    </section>);

}
