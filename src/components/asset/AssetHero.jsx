import FmedModuleIcon from "../FmedModuleIcon.jsx";

export default function AssetHero({ filteredCount, totalCount }) {
  return (
    <section className="fmed-module-hero fmed-module-hero-asset fmed-style-asset-hero-panel">
      <div className="fmed-module-hero-heading">
        <FmedModuleIcon module="Asset" />
        <div className="fmed-module-hero-copy fmed-style-asset-hero-left">
          <div className="fmed-module-hero-eyebrow fmed-style-asset-hero-eyebrow">Inventario tecnico</div>
          <h2 className="fmed-module-hero-title fmed-style-asset-hero-title">Gestione asset</h2>
          <p className="fmed-module-hero-subtitle fmed-style-asset-hero-subtitle">
            Cerca, filtra e consulta gli asset per sede, categoria e stato. L’elenco si apre solo quando ti serve, già filtrato.
          </p>
        </div>
      </div>
      <div className="fmed-module-hero-metric fmed-style-asset-hero-right">
        <div className="fmed-module-hero-metric-value fmed-style-asset-hero-badge-number">{filteredCount}</div>
        <div className="fmed-module-hero-metric-label fmed-style-asset-hero-badge-text">Asset visualizzati</div>
        <div className="fmed-module-hero-metric-sub fmed-style-asset-hero-badge-sub">Su {totalCount} totali</div>
      </div>
    </section>);

}
