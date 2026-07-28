import FmedModuleIcon from "../FmedModuleIcon.jsx";

export default function InfrastruttureHero({ filteredCount, totalCount }) {
  return (
    <section className="fmed-module-hero fmed-module-hero-infrastrutture fmed-style-asset-hero-panel">
      <div className="fmed-module-hero-heading">
        <FmedModuleIcon module="Infrastrutture" />
        <div className="fmed-module-hero-copy fmed-style-asset-hero-left">
          <div className="fmed-module-hero-eyebrow fmed-style-asset-hero-eyebrow">Scadenziario infrastrutture</div>
          <h2 className="fmed-module-hero-title fmed-style-asset-hero-title">Manutenzioni infrastrutturali</h2>
          <p className="fmed-module-hero-subtitle fmed-style-asset-hero-subtitle">
            Impianti, contratti e attività tecniche con sedi, documentazione e scadenze integrate.
          </p>
        </div>
      </div>
      <div className="fmed-module-hero-metric fmed-style-asset-hero-right">
        <div className="fmed-module-hero-metric-value fmed-style-asset-hero-badge-number">{filteredCount}</div>
        <div className="fmed-module-hero-metric-label fmed-style-asset-hero-badge-text">Attività visibili</div>
        <div className="fmed-module-hero-metric-sub fmed-style-asset-hero-badge-sub">Su {totalCount} totali</div>
      </div>
    </section>);

}
