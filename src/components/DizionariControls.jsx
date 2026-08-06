export default function DizionariControls({
  tab,
  onTabChange,
  dictionarySearch,
  onDictionarySearchChange,
  valueSearch,
  onValueSearchChange,
  showInactive,
  onShowInactiveChange,
  canManage = false,
  onShowDictionaries,
  onShowValues,
  onShowRequests,
  onNewValue,
}) {
  const requestsActive =
    tab === "DIZIONARI" &&
    valueSearch === "RICHIESTA_APPROVAZIONE";

  const dictionariesActive =
    tab === "DIZIONARI" &&
    !requestsActive;

  const rulesActive = tab === "REGOLE";
  const qualityActive = tab === "QUALITA";

  const openDictionaries = () => {
    onTabChange("DIZIONARI");
    onValueSearchChange("");
    onShowDictionaries?.();
  };

  const openValues = () => {
    onTabChange("DIZIONARI");
    onValueSearchChange("");
    onShowValues?.();
  };

  const openRequests = () => {
    onTabChange("DIZIONARI");
    onShowInactiveChange(true);
    onValueSearchChange("RICHIESTA_APPROVAZIONE");
    onShowRequests?.();
  };

  const searchValue = rulesActive
    ? valueSearch
    : dictionarySearch;

  const searchPlaceholder = rulesActive
    ? "Cerca per catalogo o valore…"
    : "Cerca dizionario per nome o codice…";

  const handleSearchChange = (event) => {
    if (rulesActive) {
      onValueSearchChange(event.target.value);
      return;
    }

    onDictionarySearchChange(event.target.value);
  };

  return (
    <section
      className="fmed-cataloghi-controls"
      aria-label="Controlli Cataloghi FMED"
    >
      <div
        className="fmed-cataloghi-tabs"
        role="tablist"
        aria-label="Sezioni Cataloghi"
      >
        <button
          type="button"
          role="tab"
          aria-selected={dictionariesActive}
          className={dictionariesActive ? "active" : ""}
          onClick={openDictionaries}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Dizionari</span>
        </button>

        <button
          type="button"
          onClick={openValues}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M7 6h10M7 12h10M7 18h10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Valori</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={requestsActive}
          className={requestsActive ? "active" : ""}
          onClick={openRequests}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 3a9 9 0 1 0 9 9M12 7v5l3 2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Richieste</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={rulesActive}
          className={rulesActive ? "active" : ""}
          onClick={() => onTabChange("REGOLE")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6 6h4v4H6zM14 14h4v4h-4zM10 8h4v8M8 10v5h6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Regole</span>
        </button>
      </div>

      <div className="fmed-cataloghi-toolbar">
        {!qualityActive && !requestsActive && (
          <label className="fmed-cataloghi-search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle
                cx="11"
                cy="11"
                r="6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="m16 16 4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <input
              value={searchValue}
              onChange={handleSearchChange}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
            />
          </label>
        )}

        {requestsActive && (
          <div className="fmed-cataloghi-request-filter">
            Richieste in attesa di approvazione
          </div>
        )}

        {tab === "DIZIONARI" && (
          <label className="fmed-cataloghi-filter">
            <input
              type="checkbox"
              checked={showInactive}
              onChange={(event) =>
                onShowInactiveChange(event.target.checked)
              }
            />
            <span>Mostra disattivati</span>
          </label>
        )}

        <button
          type="button"
          className={
            qualityActive
              ? "fmed-cataloghi-quality active"
              : "fmed-cataloghi-quality"
          }
          onClick={() => onTabChange("QUALITA")}
        >
          <span>Qualità dati</span>
        </button>

        {canManage && typeof onNewValue === "function" && (
          <button
            type="button"
            className="fmed-cataloghi-new"
            onClick={onNewValue}
          >
            <span aria-hidden="true">+</span>
            <span>Nuovo valore</span>
          </button>
        )}
      </div>
    </section>
  );
}