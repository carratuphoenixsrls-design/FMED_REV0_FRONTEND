/**
 * Marchio vettoriale proprietario FMED.
 * Non usa immagini esterne, font incorporati o asset stock.
 */
export function FmedBrandSymbol({
  size = 56,
  className = "",
  title = "FMED",
}) {
  return (
    <svg
      className={`fmed-brand-symbol ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label={title}
    >
      <rect className="fmed-brand-symbol__frame" x="3" y="3" width="58" height="58" rx="17" />
      <path className="fmed-brand-symbol__f" d="M18 45V18h20M18 30h15" />
      <path className="fmed-brand-symbol__m" d="M31 45V27l7 7 8-8v19" />
      <path className="fmed-brand-symbol__accent" d="M18 19h19" />
    </svg>
  );
}

export function FmedBrandLockup({ className = "", compact = false }) {
  if (compact) {
    return (
      <span
        className={`fmed-brand-lockup is-compact ${className}`.trim()}
        aria-label="FMED"
      >
        <span className="fmed-brand-lockup__compact-letter" aria-hidden="true">F</span>
      </span>
    );
  }

  return (
    <span className={`fmed-brand-lockup ${className}`.trim()} aria-label="FMED Enterprise · Facility Management">
      <span className="fmed-brand-lockup__copy">
        <strong className="fmed-brand-lockup__name">FMED</strong>
        <span className="fmed-brand-lockup__edition">ENTERPRISE</span>
        <span className="fmed-brand-lockup__descriptor">Facility Management</span>
      </span>
    </span>
  );
}
