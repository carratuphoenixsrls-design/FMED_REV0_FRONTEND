import { useEffect, useId, useMemo, useState } from "react";
import { fmedAuthHeaders, fmedFetchJson, fmedSession } from "../../fmedApiClient.js";
import { PERIODICITA_STANDARD } from "../../fmedStandard.js";

const FIELD_DICTIONARIES = {
  sede: "SEDI",
  societa: "SOCIETA",
  locazione: "LOCAZIONI",
  reparto: "REPARTI",
  branca_medica: "BRANCHE_MEDICHE",
  categoria: "CATEGORIE_ASSET",
  stato_asset: "STATI_ASSET",
  possesso: "POSSESSO",
  fornitore: "FORNITORI",
  costruttore: "COSTRUTTORI",
  modello: "MODELLI",
  tipologia: "TIPOLOGIE_ASSET",
  attivita: "ATTIVITA_INTERVENTO",
  ditta: "DITTE_ESECUTRICI",
  ditta_esecutrice: "DITTE_ESECUTRICI",
  periodicita: "PERIODICITA",
  esito: "ESITI_INTERVENTO",
  priorita: "PRIORITA",
  stato: "STATI_INFRASTRUTTURA",
  descrizione: "ITEM_INFRASTRUTTURE",
  centro_costo: "CENTRI_COSTO",
  responsabile: "RESPONSABILI",
};

const PERIODICITA_CANONICHE = PERIODICITA_STANDARD
  .map((item) => String(item?.codice || "").trim())
  .filter((codice) => codice && codice !== "DA_DEFINIRE");

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .toLocaleUpperCase("it-IT");
}

function optionLabel(item) {
  if (item && typeof item === "object") return String(item.etichetta || item.label || item.nome || item.codice || "").trim();
  return String(item || "").trim();
}

function dictionaryPayloadKey(code) {
  return String(code || "").trim().toLocaleLowerCase("it-IT");
}

function inferDictionary(field, label, explicit) {
  if (explicit) return String(explicit).toUpperCase();
  if (field === "categoria" && String(label || "").toUpperCase().includes("INFRA")) return "CATEGORIE_INFRASTRUTTURE";
  return FIELD_DICTIONARIES[field] || "";
}

function roleInfo() {
  const session = fmedSession();
  const role = String(session?.ruolo || session?.role || "USER").toUpperCase();
  return {
    role,
    canApprove: ["ADMIN", "AMMINISTRATORE", "SUPERADMIN"].includes(role),
    actor: String(session?.email || session?.nome || "FMED_USER"),
  };
}

function labelsFromCatalog(catalog, key) {
  const rows = Array.isArray(catalog?.[dictionaryPayloadKey(key)]) ? catalog[dictionaryPayloadKey(key)] : [];
  return rows.map(optionLabel).filter(Boolean);
}

export default function CanonicalSelect({
  id = "",
  name = "",
  label,
  field = "",
  dictionary = "",
  value = "",
  onChange,
  options = [],
  disabled = false,
  loading = false,
  hint = "",
  placeholder = "",
  style,
  selectClassName = "",
  apiBaseUrl = "",
  allowQuickAdd = true,
  form = {},
  restrictToOptions = false,
}) {
  const generatedId = useId();
  const [extraOptions, setExtraOptions] = useState([]);
  const [catalog, setCatalog] = useState({});
  const [catalogLoaded, setCatalogLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ etichetta: "", famiglia: "", categoria: "", ambito: "", aliases: "" });
  const [suggestions, setSuggestions] = useState([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmDistinct, setConfirmDistinct] = useState(false);
  const dictionaryCode = inferDictionary(field, label, dictionary);
  const isPeriodicita = dictionaryCode === "PERIODICITA";
  const controlId = id || `fmed-canonical-${String(field || dictionaryCode || "select").toLocaleLowerCase("it-IT")}-${generatedId.replace(/:/g, "")}`;
  const controlName = name || field || dictionaryPayloadKey(dictionaryCode);
  const role = roleInfo();

  useEffect(() => {
    let cancelled = false;
    async function loadCatalog() {
      try {
        const data = await fmedFetchJson("/core/dizionari", { apiBaseUrl, retries: 1 });
        if (!cancelled) {
          setCatalog(data?.dizionari && typeof data.dizionari === "object" ? data.dizionari : {});
          setCatalogLoaded(true);
        }
      } catch {
        if (!cancelled) setCatalogLoaded(false);
      }
    }
    loadCatalog();
    const refresh = () => loadCatalog();
    window.addEventListener("fmed:master-data-updated", refresh);
    return () => {
      cancelled = true;
      window.removeEventListener("fmed:master-data-updated", refresh);
    };
  }, [apiBaseUrl, dictionaryCode]);

  const canonicalRemoteOptions = useMemo(
    () => labelsFromCatalog(catalog, dictionaryCode),
    [catalog, dictionaryCode],
  );

  const cleanOptions = useMemo(() => {
    // PERIODICITA è un dominio chiuso FMED: non deve ereditare valori sporchi
    // dallo storico (es. PER 0001, PER 0002) né consentire quick-add arbitrari.
    if (isPeriodicita) return [...PERIODICITA_CANONICHE];

    const map = new Map();
    const source = restrictToOptions
      ? (Array.isArray(options) ? options : [])
      : (catalogLoaded ? canonicalRemoteOptions : (Array.isArray(options) ? options : []));
    for (const item of [...source, ...extraOptions, value]) {
      const labelValue = optionLabel(item);
      if (!labelValue) continue;
      const key = normalize(labelValue);
      if (!map.has(key)) map.set(key, labelValue);
    }
    return [...map.values()].sort((a, b) => a.localeCompare(b, "it", { numeric: true, sensitivity: "base" }));
  }, [options, canonicalRemoteOptions, catalogLoaded, extraOptions, value, restrictToOptions, isPeriodicita]);

  const familyOptions = useMemo(() => labelsFromCatalog(catalog, "FAMIGLIE_ATTIVITA"), [catalog]);
  const scopeOptions = useMemo(() => labelsFromCatalog(catalog, "AMBITI_OPERATIVI"), [catalog]);
  const categoryDictionary = dictionaryCode.includes("INFRA") || dictionaryCode === "ITEM_INFRASTRUTTURE"
    ? "CATEGORIE_INFRASTRUTTURE"
    : "CATEGORIE_ASSET";
  const categoryOptions = useMemo(() => labelsFromCatalog(catalog, categoryDictionary), [catalog, categoryDictionary]);

  useEffect(() => {
    if (!open || !dictionaryCode || draft.etichetta.trim().length < 2) {
      setSuggestions([]);
      return undefined;
    }
    const timer = setTimeout(async () => {
      try {
        const data = await fmedFetchJson(`/core/dizionari/suggerimenti?dizionario=${encodeURIComponent(dictionaryCode)}&testo=${encodeURIComponent(draft.etichetta.trim())}&limit=5`, { apiBaseUrl, retries: 1 });
        setSuggestions(Array.isArray(data?.suggerimenti) ? data.suggerimenti : []);
      } catch {
        setSuggestions([]);
      }
    }, 320);
    return () => clearTimeout(timer);
  }, [open, dictionaryCode, draft.etichetta, apiBaseUrl]);

  function openQuickAdd() {
    setDraft({
      etichetta: "",
      famiglia: form?.famiglia_attivita || "",
      categoria: form?.categoria || "",
      ambito: dictionaryCode.includes("INFRA") ? "Infrastrutture" : "",
      aliases: "",
    });
    setSuggestions([]);
    setMessage("");
    setConfirmDistinct(false);
    setOpen(true);
  }

  async function save() {
    const etichetta = draft.etichetta.trim();
    if (!etichetta) {
      setMessage("Inserisci la denominazione standard.");
      return;
    }
    const exact = cleanOptions.find(item => normalize(item) === normalize(etichetta));
    if (exact) {
      onChange?.(exact);
      setOpen(false);
      return;
    }
    if (suggestions.length > 0 && !confirmDistinct) {
      setMessage("Esistono voci simili. Seleziona quella corretta oppure conferma che la nuova denominazione rappresenta davvero un elemento diverso.");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const aliases = draft.aliases.split(/[\n,;]+/).map(item => item.trim()).filter(Boolean);
      const active = role.canApprove;
      const data = await fmedFetchJson("/core/dizionari/valori", {
        apiBaseUrl,
        method: "POST",
        retries: 1,
        headers: fmedAuthHeaders(),
        body: JSON.stringify({
          dizionario: dictionaryCode,
          codice: "AUTO",
          etichetta,
          ordine: 100,
          attivo: active,
          metadati: {
            famiglia: draft.famiglia || null,
            categoria: draft.categoria || null,
            ambito: draft.ambito || null,
            aliases,
            origine: "QUICK_ADD_CONTESTUALE_REV0",
            stato_governance: active ? "APPROVATO" : "RICHIESTA_APPROVAZIONE",
            richiesto_da: role.actor,
          },
        }),
      });
      if (!active) {
        setMessage("Richiesta registrata. La voce sarà disponibile dopo l'approvazione dell'amministratore.");
        return;
      }
      setExtraOptions(prev => [...prev, etichetta]);
      onChange?.(etichetta, { codice: data?.codice, dizionario: dictionaryCode });
      window.dispatchEvent(new CustomEvent("fmed:master-data-updated", { detail: { dizionario: dictionaryCode, codice: data?.codice, etichetta } }));
      setOpen(false);
    } catch (error) {
      setMessage(error?.message || "Impossibile salvare la nuova voce.");
    } finally {
      setBusy(false);
    }
  }

  return <div className="fmed-canonical-field" style={style}>
    {label && <label className="fmed-canonical-label" htmlFor={controlId}>{label}</label>}
    <div className="fmed-canonical-row">
      <select
        id={controlId}
        name={controlName}
        data-dictionary={dictionaryCode}
        className={`fmed-canonical-select ${selectClassName}`.trim()}
        value={String(value || "")}
        disabled={disabled || loading}
        onChange={event => onChange?.(event.target.value)}
      >
        <option value="">{placeholder || `Seleziona ${String(label || "voce").toLocaleLowerCase("it-IT")}`}</option>
        {!cleanOptions.length && <option value="" disabled>Nessuna voce disponibile</option>}
        {cleanOptions.map(item => <option key={`${dictionaryCode}-${item}`} value={item}>{isPeriodicita ? String(item).replace(/_/g, " ") : item}</option>)}
      </select>
      {allowQuickAdd && !isPeriodicita && dictionaryCode && <button type="button" className="fmed-canonical-add" onClick={openQuickAdd} disabled={disabled || loading} title={`Aggiungi una voce a ${dictionaryCode}`} aria-label={`Aggiungi una voce a ${dictionaryCode}`}><span aria-hidden="true">+</span></button>}
    </div>
    {hint && <small className="fmed-canonical-hint">{hint}</small>}

    {open && <section className="fmed-canonical-inline-editor" aria-label={`Nuova voce ${dictionaryCode}`}>
      <div className="fmed-canonical-inline-editor-content">
        <header className="fmed-canonical-inline-editor-head">
          <div><small>{dictionaryCode}</small><h3>Nuova voce contestuale</h3><p>Il modulo aperto resta invariato. Dopo il salvataggio torni esattamente al punto corrente.</p></div>
          <button type="button" className="fmed-canonical-close" onClick={() => setOpen(false)} aria-label="Chiudi">×</button>
        </header>
        <div className="fmed-canonical-body">
          <div className="fmed-canonical-grid">
            <label className="wide">Denominazione standard<input autoFocus value={draft.etichetta} onChange={e => { setDraft(prev => ({ ...prev, etichetta: e.target.value })); setConfirmDistinct(false); setMessage(""); }} placeholder="Inserisci una denominazione chiara e univoca" /></label>
            <label>Famiglia<select value={draft.famiglia} onChange={e => setDraft(prev => ({ ...prev, famiglia: e.target.value }))}><option value="">Nessuna / da classificare</option>{familyOptions.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
            <label>Categoria<select value={draft.categoria} onChange={e => setDraft(prev => ({ ...prev, categoria: e.target.value }))}><option value="">Nessuna / da classificare</option>{categoryOptions.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
            <label className="wide">Ambito<select value={draft.ambito} onChange={e => setDraft(prev => ({ ...prev, ambito: e.target.value }))}><option value="">Seleziona ambito</option>{scopeOptions.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
            <label className="wide">Alias storici<textarea value={draft.aliases} onChange={e => setDraft(prev => ({ ...prev, aliases: e.target.value }))} placeholder="Una variante storica per riga oppure separate da virgola" /></label>
          </div>
          {!!suggestions.length && <div className="fmed-canonical-suggestions"><strong>Controlla prima le voci simili già presenti</strong><p>Per evitare nuovi duplicati, usa una voce esistente quando descrive lo stesso elemento.</p>{suggestions.map(item => <button type="button" className="fmed-canonical-suggestion" key={item.codice} onClick={() => { onChange?.(item.etichetta); setOpen(false); }}><span>{item.etichetta}</span><small>{item.codice} · {Math.round(Number(item.similarita || 0) * 100)}%</small></button>)}<label className="fmed-canonical-distinct-confirm"><input type="checkbox" checked={confirmDistinct} onChange={event => setConfirmDistinct(event.target.checked)} /><span><b>È realmente una voce diversa</b><small>Confermo che nessun suggerimento rappresenta la stessa denominazione.</small></span></label></div>}
          {message && <div className="fmed-canonical-message">{message}</div>}
          <div className="fmed-canonical-actions"><button type="button" className="fmed-canonical-cancel" onClick={() => setOpen(false)}>Annulla</button><button type="button" className="fmed-canonical-save" onClick={save} disabled={busy}>{busy ? "Salvataggio…" : role.canApprove ? "Crea e seleziona" : "Invia richiesta"}</button></div>
        </div>
      </div>
    </section>}
  </div>;
}
