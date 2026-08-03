import FmedModuleIcon from "../FmedModuleIcon.jsx";

export default function InterventiHero({ filteredCount, totalCount }) {
  return (
    <section className="fmed-module-hero fmed-module-hero-interventi fmed-style-interventi-hero-panel">
      <div className="fmed-module-hero-heading">
        <FmedModuleIcon module="Interventi" />
        <div className="fmed-module-hero-copy fmed-style-interventi-hero-left">
          <div className="fmed-module-hero-eyebrow fmed-style-interventi-hero-eyebrow">Registro manutentivo</div>
          <h2 className="fmed-module-hero-title fmed-style-interventi-hero-title">Gestione interventi</h2>
          <p className="fmed-module-hero-subtitle fmed-style-interventi-hero-subtitle">
            Cerca, filtra e consulta gli interventi per sede, ditta, attività, cespite e periodo contabile. L’elenco si apre solo quando ti serve, già filtrato.
          </p>
        </div>
      </div>
      <div className="fmed-module-hero-metric fmed-style-interventi-hero-right">
        <div className="fmed-module-hero-metric-value fmed-style-interventi-hero-badge-number">{filteredCount}</div>
        <div className="fmed-module-hero-metric-label fmed-style-interventi-hero-badge-text">Interventi visualizzati</div>
        <div className="fmed-module-hero-metric-sub fmed-style-interventi-hero-badge-sub">Su {totalCount} totali</div>
      </div>
    </section>);

}
