import { Component, useCallback, useEffect, useMemo, useState } from "react";
import Sicurezza8108Controls from "./components/sicurezza8108/Sicurezza8108Controls.jsx";
import FmedIcon from "./components/ui/FmedIcon.jsx";
import { fmedAuthHeaders } from "./fmedApiClient.js";

const FALLBACK_SEDI = [
  { codice: "MARILAB_CENTER", label: "Marilab Center", cartella: "MARILAB CENTER" },
  { codice: "MARILAB_FIUMICINO", label: "Marilab Fiumicino", cartella: "MARILAB_FIUMICINO" },
  { codice: "MARILAB_FUTURE_LABS", label: "Marilab Future Labs", cartella: "MARILAB_FUTURE_LABS" },
  { codice: "MARILAB_GARBATELLA", label: "Marilab Garbatella", cartella: "MARILAB_GARBATELLA" },
  { codice: "MARILAB_SURGERY", label: "Marilab Surgery", cartella: "MARILAB_SURGERY" },
];

const FALLBACK_CATEGORIE = [
  { codice: "01_Documenti_Generali", label: "Documenti generali", cartella: "01_Documenti_Generali" },
  { codice: "02_DVR_e_Valutazioni_Rischio", label: "DVR e valutazioni rischio", cartella: "02_DVR_e_Valutazioni_Rischio" },
  { codice: "03_Nomine", label: "Nomine", cartella: "03_Nomine" },
  { codice: "04_Piano_Emergenza", label: "Piano di emergenza", cartella: "04_Piano_Emergenza" },
  { codice: "05_Registri_e_Verifiche", label: "Registri e verifiche", cartella: "05_Registri_e_Verifiche" },
  { codice: "06_Verbali", label: "Verbali", cartella: "06_Verbali" },
  { codice: "07_Formazione_e_Attestati", label: "Formazione e attestati", cartella: "07_Formazione_e_Attestati" },
];

const STATI_STORICI_8108 = new Set(["SOSTITUITA", "CESSATA", "ANNULLATA", "NON_APPLICABILE", "DUPLICATO"]);

function normalizzaLista(value, fallback) {
  const source = Array.isArray(value) && value.length ? value : fallback;
  return source
    .map((item) => ({
      codice: String(item?.codice || item?.id || "").trim(),
      label: String(item?.label || item?.nome || item?.codice || "").trim(),
      cartella: String(item?.cartella || item?.codice || "").trim(),
      disponibile: item?.disponibile !== false,
    }))
    .filter((item) => item.codice);
}

function normalizzaSedi(value) {
  const source = Array.isArray(value) && value.length ? value : FALLBACK_SEDI;
  return source
    .map((item) => ({
      codice: String(item?.codice || item?.id || "").trim(),
      label: String(item?.label || item?.nome || item?.codice || "").trim(),
      cartella: String(item?.cartella || item?.codice || "").trim(),
      categorie: normalizzaLista(item?.categorie, FALLBACK_CATEGORIE),
    }))
    .filter((item) => item.codice);
}

function normalizzaTesto(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDate(value) {
  if (!value) return null;
  const direct = new Date(value);
  if (!Number.isNaN(direct.getTime())) return direct;
  const match = String(value).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;
  const parsed = new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(value) {
  const date = parseDate(value);
  if (!date) return "—";
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function formatSize(value) {
  const bytes = Number(value || 0);
  if (!Number.isFinite(bytes) || bytes <= 0) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let current = bytes;
  let idx = 0;
  while (current >= 1024 && idx < units.length - 1) {
    current /= 1024;
    idx += 1;
  }
  return `${current >= 10 || idx === 0 ? current.toFixed(0) : current.toFixed(1)} ${units[idx]}`;
}

function statoCicloDocumento(doc) {
  const value = normalizzaTesto(doc?.stato_ciclo || "ATTIVA").replace(/\s+/g, "_");
  return value || "ATTIVA";
}

function rimuoviRidondanzeNome(value) {
  return String(value || "")
    .replace(/\.(?:PDF|DOCX?|XLSX?|JPE?G|PNG)$/i, "")
    .replace(/\.DOCX?/gi, " ")
    .replace(/\bYYYY[ _.-]*MM[ _.-]*DD\b/gi, " ")
    .replace(/\b(?:19|20)\d{2}[ _.-](?:0?[1-9]|1[0-2])[ _.-](?:0?[1-9]|[12]\d|3[01])\b/g, " ")
    .replace(/\b(?:0?[1-9]|[12]\d|3[01])[ _.-](?:0?[1-9]|1[0-2])[ _.-](?:19|20)\d{2}\b/g, " ")
    .replace(/\b(?:19|20)\d{6}\b/g, " ")
    .replace(/\b(?:GENNAIO|FEBBRAIO|MARZO|APRILE|MAGGIO|GIUGNO|LUGLIO|AGOSTO|SETTEMBRE|OTTOBRE|NOVEMBRE|DICEMBRE)[ _.-]*\d{2,4}\b/gi, " ")
    .replace(/\bREV(?:ISIONE)?[ ._-]*0*\d+[A-Z]?\b/gi, " ")
    .replace(/\bVERSIONE[ ._-]*0*\d+[A-Z]?\b/gi, " ")
    .replace(/\bREV[ ._-]*\d+\b/gi, " ")
    .replace(/\bMARILAB[ _.-]+(?:ZAMBRINI|CAFFARO|CENTER|FIUMICINO|GARBATELLA|FUTURE[ _.-]*LABS|SURGERY|POMEZIA|OSTIA)\b/gi, " ")
    .replace(/\b(?:PHOENIX[ _.-]*SRL|PHOENIX|MARILAB|POMEZIA|ZAMBRINI|CAFFARO)\b/gi, " ")
    .replace(/^(?:(?:VR|VER|REL|REG|NOM|NPM|ATT|FORM|PE|ALL|DICH|MOD|ORG|NORM|DOC|DS(?:[ _-]*DS)?\d{0,3})[ _.-]+)+/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:])/g, "$1")
    .trim()
    .replace(/[ ._-]+$/g, "");
}

function suffixPersonaDaNome(base, paroleFamiglia) {
  const normalized = normalizzaTesto(base);
  const family = normalizzaTesto(paroleFamiglia);
  const index = normalized.indexOf(family);
  if (index < 0) return "";
  return normalized.slice(index + family.length).trim().replace(/^\d{2,4}\s+/, "");
}

function nomeDocumentoPulito(doc) {
  const originale = String(doc?.nome || "").trim();
  if (!originale) return "DOCUMENTO";
  const categoria = String(doc?.categoria || "");
  const rawNorm = normalizzaTesto(originale);
  const base = rimuoviRidondanzeNome(originale);
  const n = normalizzaTesto(base);

  if (categoria === "02_DVR_e_Valutazioni_Rischio") {
    if (n.includes("ALLEGATO") && rawNorm.includes("DVR")) return "ALLEGATO DVR";
    if (n.includes("MICROCLIMA")) return "VALUTAZIONE RISCHIO MICROCLIMA";
    if (n.includes("ILLUMINAMENTO")) return "VALUTAZIONE RISCHIO ILLUMINAMENTO";
    if (n.includes("FULMINAZIONE")) return "VALUTAZIONE RISCHIO FULMINAZIONE";
    if (n.includes("ELETTROMAGNET")) return "VALUTAZIONE CAMPI ELETTROMAGNETICI";
    if (n.includes("RISCHIO BIOLOGICO") || n === "BIOLOGICO") return "VALUTAZIONE RISCHIO BIOLOGICO";
    if (n.includes("CHIMICO") && n.includes("PULIZ")) return "VALUTAZIONE RISCHIO CHIMICO · PULIZIE";
    if (n.includes("CHIMICO") && n.includes("LABORATOR")) return "VALUTAZIONE RISCHIO CHIMICO · LABORATORIO";
    if (n.includes("CHIMICO") && n.includes("ODONTO")) return "VALUTAZIONE RISCHIO CHIMICO · ODONTOIATRIA";
    if (n.includes("GESTANT")) return "TUTELA LAVORATRICI GESTANTI";
    if (n === "VDT" || n.includes("RISCHIO VDT")) return "VALUTAZIONE RISCHIO VDT";
    if (n.includes("STRESS") && n.includes("LAVOR")) return "VALUTAZIONE STRESS LAVORO CORRELATO";
    if (n.includes("AGGRESSION")) return "VALUTAZIONE RISCHIO AGGRESSIONE";
    if (n.includes("LEGIONELLA")) return "VALUTAZIONE RISCHIO LEGIONELLA";
    if (n.includes("RISCHI PER MANSIONE") || n.includes("RISCHIO PER MANSIONE")) return "VALUTAZIONE RISCHI PER MANSIONE";
    if (n.includes("ROA")) return "VALUTAZIONE RADIAZIONI OTTICHE ARTIFICIALI (ROA)";
    if (n.includes("SORVEGLIANZA") && n.includes("RX")) return "SORVEGLIANZA RADIOPROTEZIONE RX";
    if (n.includes("CONSULTAZIONE") && n.includes("RLS")) return "CONSULTAZIONE RLS";
    if (n.includes("EVACUAZIONE")) return "VERBALE PROVA DI EVACUAZIONE";
    if (n.includes("DVR")) return "DOCUMENTO DI VALUTAZIONE DEI RISCHI (DVR)";
  }

  if (categoria === "04_Piano_Emergenza") {
    if (n.includes("ELENCO") && n.includes("SQUADR") && n.includes("EMERGEN")) return "ELENCO SQUADRE DI EMERGENZA";
    if (n.includes("PROCEDURA") && n.includes("EMERGEN")) return "PROCEDURA DI EMERGENZA";
    if (n.includes("PIANO") && n.includes("EMERGEN")) return "PIANO DI EMERGENZA";
  }

  if (categoria === "05_Registri_e_Verifiche") {
    if (n.includes("LEGIONELLA")) return "CONTROLLI LEGIONELLA";
    if (n.includes("SORVEGLIANZA") && n.includes("RX")) return "SORVEGLIANZA FISICA RX";
    if (n.includes("ISPEZIONE") && n.includes("SPP")) return "ISPEZIONE SPP";
  }

  if (categoria === "06_Verbali") {
    if (n.includes("RIUNIONE PERIODICA")) return "VERBALE RIUNIONE PERIODICA";
    if (n.includes("ELEZIONE") && n.includes("RLS")) return "VERBALE ELEZIONE RLS";
    if (n.includes("EVACUAZIONE")) return "VERBALE PROVA DI EVACUAZIONE";
    if (n.includes("CONSEGNA") && n.includes("DPI")) return "VERBALE CONSEGNA DPI";
    if (n.includes("INFORMAZIONE") && n.includes("LAVORATOR")) return "VERBALE INFORMAZIONE LAVORATORI · ART. 36";
    if (n.includes("ADDESTRAMENTO") && n.includes("73")) return "VERBALE ADDESTRAMENTO · ART. 73";
    if (n.includes("CONSULTAZIONE") && n.includes("RLS")) return "VERBALE CONSULTAZIONE RLS";
    if (n.includes("SEGNALAZION") || n.includes("OSSERVAZION")) return "SEGNALAZIONI E OSSERVAZIONI";
  }

  if (categoria === "07_Formazione_e_Attestati") {
    const aggiornamentoAntincendio = rawNorm.includes("AGG ANTINCENDIO") || rawNorm.includes("AGGIORNAMENTO ANTINCENDIO");
    const aggiornamentoSoccorso = rawNorm.includes("AGG PRIMO SOCCORSO") || rawNorm.includes("AGGIORNAMENTO PRIMO SOCCORSO");
    if (aggiornamentoAntincendio) {
      const persona = suffixPersonaDaNome(base, n.includes("AGGIORNAMENTO ANTINCENDIO") ? "AGGIORNAMENTO ANTINCENDIO" : "AGG ANTINCENDIO");
      return persona ? `AGGIORNAMENTO ANTINCENDIO · ${persona}` : "AGGIORNAMENTO ANTINCENDIO";
    }
    if (aggiornamentoSoccorso) {
      const persona = suffixPersonaDaNome(base, n.includes("AGGIORNAMENTO PRIMO SOCCORSO") ? "AGGIORNAMENTO PRIMO SOCCORSO" : "AGG PRIMO SOCCORSO");
      return persona ? `AGGIORNAMENTO PRIMO SOCCORSO · ${persona}` : "AGGIORNAMENTO PRIMO SOCCORSO";
    }
    if (rawNorm.includes("BLSD")) {
      const persona = n.replace(/\bBLSD\b/g, "").replace(/^\d{2,4}\s+/, "").trim();
      return persona ? `ATTESTATO BLSD · ${persona}` : "ATTESTATO BLSD";
    }
    if (rawNorm.includes("ATTESTATO") && rawNorm.includes("ANTINC")) {
      const persona = n.replace(/\bATTESTATO\b/g, "").replace(/\bANTINC(?:ENDIO)?\b/g, "").replace(/^\d{2,4}\s+/, "").trim();
      return persona ? `ATTESTATO ANTINCENDIO · ${persona}` : "ATTESTATO ANTINCENDIO";
    }
    if (rawNorm.startsWith("ATT ANTINCENDIO")) {
      const persona = n.replace(/^ANTINCENDIO\s+/, "").replace(/^\d{2,4}\s+/, "").trim();
      return persona ? `ATTESTATO ANTINCENDIO · ${persona}` : "ATTESTATO ANTINCENDIO";
    }
    if (rawNorm.startsWith("ATT PRIMO SOCCORSO")) {
      const persona = n.replace(/^PRIMO SOCCORSO\s+/, "").replace(/^\d{2,4}\s+/, "").trim();
      return persona ? `ATTESTATO PRIMO SOCCORSO · ${persona}` : "ATTESTATO PRIMO SOCCORSO";
    }
    if (rawNorm.includes("ATTESTATO RLS") || rawNorm.startsWith("RLS ATTESTATO") || rawNorm.includes("FORM RLS")) {
      const persona = n.replace(/\bATTESTATO\b/g, "").replace(/\bRLS\b/g, "").replace(/\bFORM\b/g, "").replace(/\b\d{6}\b/g, "").trim();
      return persona ? `ATTESTATO RLS · ${persona}` : "ATTESTATO RLS";
    }
  }

  if (categoria === "03_Nomine") {
    if (n.includes("ADDETT") && n.includes("PRIMO SOCCORSO")) return n.replace(/^NOMINA\s+/, "NOMINA ").replace(/^ADDETTI?/, "NOMINA ADDETTO");
    if (n.includes("ADDETT") && n.includes("ANTINCENDIO")) return n.replace(/^NOMINA\s+/, "NOMINA ").replace(/^ADDETTI?/, "NOMINA ADDETTO");
    if (n.includes("RSPP") && !n.includes("ACCETTAZIONE")) return n.startsWith("NOMINA") ? n : `NOMINA ${n}`;
    if (n.includes("PREPOSTO") && !n.includes("ACCETTAZIONE")) return n.startsWith("NOMINA") ? n : `NOMINA ${n}`;
    if (n.includes("MEDICO COMPETENTE") && !n.includes("ACCETTAZIONE")) return n.startsWith("NOMINA") ? n : `NOMINA ${n}`;
  }

  if (categoria === "01_Documenti_Generali") {
    if (n.includes("MANUALE") && n.includes("SICUREZZA")) return "MANUALE SICUREZZA 81/08";
    if (n.includes("ORGANIGRAMMA") && n.includes("SICUREZZA")) return "ORGANIGRAMMA SICUREZZA";
    if (n.includes("DUVRI") && n.includes("LIBERI PROFESSIONIST")) return "DUVRI · LIBERI PROFESSIONISTI";
    if (n.includes("CONSEGNA DPI")) return "CONSEGNA DPI";
    if (n.includes("RELAZIONE RADIOPROTEZIONE")) return "RELAZIONE RADIOPROTEZIONE";
    if (n.includes("ADDETTI PRIMO SOCCORSO")) return "ELENCO ADDETTI PRIMO SOCCORSO";
  }

  return (base || originale.replace(/\.[A-Za-z0-9]{1,8}$/, "")).toUpperCase();
}

class Sicurezza8108ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("[FMED 81/08] Errore pagina:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <section className="p0-safety-error">
          <h2>Sicurezza 81/08</h2>
          <p>La sezione ha rilevato un errore di visualizzazione, ma FMED resta operativo.</p>
          <code>{String(this.state.error?.message || this.state.error)}</code>
          <button className="p0-btn p0-btn--safety" type="button" onClick={() => this.setState({ error: null })}>Riprova</button>
        </section>
      );
    }
    return this.props.children;
  }
}

function Sicurezza8108PageInner({ apiBaseUrl }) {
  const [config, setConfig] = useState(null);
  const [documenti, setDocumenti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [sourceMessage, setSourceMessage] = useState("");
  const [search, setSearch] = useState("");
  const [sede, setSede] = useState("TUTTE");
  const [categoria, setCategoria] = useState("TUTTE");
  const [showHistory, setShowHistory] = useState(false);

  const sedi = useMemo(() => normalizzaSedi(config?.sedi), [config]);
  const categorie = useMemo(() => normalizzaLista(config?.categorie, FALLBACK_CATEGORIE), [config]);

  const buildOpenUrl = useCallback((siteCode = "", categoryCode = "") => {
    const params = new URLSearchParams();
    if (siteCode) params.set("sede", siteCode);
    if (categoryCode) params.set("categoria", categoryCode);
    const base = String(apiBaseUrl || "").replace(/\/$/, "");
    return `${base}/sicurezza-81-08/apri${params.toString() ? `?${params.toString()}` : ""}`;
  }, [apiBaseUrl]);

  const load = useCallback(async ({ silent = false } = {}) => {
    if (silent) setRefreshing(true);
    else setLoading(true);
    setError("");
    try {
      const base = String(apiBaseUrl || "").replace(/\/$/, "");
      const [configResponse, docsResponse] = await Promise.all([
        fetch(`${base}/sicurezza-81-08/config`, { headers: fmedAuthHeaders({ Accept: "application/json" }) }),
        fetch(`${base}/sicurezza-81-08/documenti`, { headers: fmedAuthHeaders({ Accept: "application/json" }) }),
      ]);
      const [configData, docsData] = await Promise.all([
        configResponse.json().catch(() => ({})),
        docsResponse.json().catch(() => ({})),
      ]);
      if (!configResponse.ok) throw new Error(configData?.detail || "Configurazione 81/08 non disponibile");
      if (!docsResponse.ok) throw new Error(docsData?.detail || "Indice documentale 81/08 non disponibile");
      setConfig(configData || {});
      setDocumenti(Array.isArray(docsData?.documenti) ? docsData.documenti : []);
      setSourceMessage(String(docsData?.messaggio || ""));
      if (docsData?.errore) setError(String(docsData.errore));
    } catch (err) {
      console.error("[FMED 81/08] Caricamento non riuscito:", err);
      setError(String(err?.message || err || "Caricamento non riuscito"));
      setDocumenti([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    load();
  }, [load]);

  const documentNameBySourceId = useMemo(() => {
    const map = new Map();
    documenti.forEach((doc) => {
      if (doc?.source_id) map.set(String(doc.source_id), nomeDocumentoPulito(doc));
    });
    return map;
  }, [documenti]);

  const currentDocumentCount = useMemo(
    () => documenti.filter((doc) => !doc?.is_cartella && !STATI_STORICI_8108.has(statoCicloDocumento(doc))).length,
    [documenti]
  );
  const historicalDocumentCount = useMemo(
    () => documenti.filter((doc) => !doc?.is_cartella && STATI_STORICI_8108.has(statoCicloDocumento(doc))).length,
    [documenti]
  );

  const documentiFiltrati = useMemo(() => {
    const q = normalizzaTesto(search);
    return documenti.filter((doc) => {
      const statoCiclo = statoCicloDocumento(doc);
      if (!showHistory && STATI_STORICI_8108.has(statoCiclo)) return false;
      const nomePulito = nomeDocumentoPulito(doc);
      const haystack = normalizzaTesto(`${nomePulito} ${doc?.nome || ""} ${doc?.sede_label || ""} ${doc?.categoria_label || ""} ${doc?.percorso_relativo || ""}`);
      return (
        (sede === "TUTTE" || doc?.sede === sede) &&
        (categoria === "TUTTE" || doc?.categoria === categoria) &&
        (!q || haystack.includes(q))
      );
    });
  }, [documenti, search, sede, categoria, showHistory]);

  const eliminaDocumentoIndice = useCallback(async (doc) => {
    const id = doc?.id;
    if (!id || deletingId) return;
    const conferma = window.confirm(`Rimuovere "${doc.nome || "questo documento"}" dall'indice FMED?\n\nIl file originale su SharePoint NON verrà eliminato.`);
    if (!conferma) return;
    setDeletingId(id);
    setError("");
    try {
      const base = String(apiBaseUrl || "").replace(/\/$/, "");
      const response = await fetch(`${base}/sicurezza-81-08/documenti/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: fmedAuthHeaders({ Accept: "application/json" }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload?.detail || "Eliminazione non riuscita");
      setDocumenti((current) => current.filter((item) => String(item.id) !== String(id)));
    } catch (err) {
      setError(String(err?.message || err));
    } finally {
      setDeletingId(null);
    }
  }, [apiBaseUrl, deletingId]);

  const resetFilters = () => {
    setSearch("");
    setSede("TUTTE");
    setCategoria("TUTTE");
  };

  const selectedSite = sedi.find((item) => item.codice === sede);
  const visibleSites = sedi.filter((site) => sede === "TUTTE" || site.codice === sede);
  const documentCount = documenti.filter((doc) => !doc?.is_cartella).length;
  const folderCount = documenti.filter((doc) => doc?.is_cartella).length;
  const unclassifiedCount = documenti.filter(
    (doc) => !doc?.is_cartella && (!doc?.sede || !doc?.categoria)
  ).length;

  return (
    <main className="p0-operations p0-operations--safety">
      <header className="p0-operations__head">
        <div className="p0-operations__identity">
          <span className="p0-operations__icon"><FmedIcon name="shield" /></span>
          <div><span>Conformità · D.Lgs. 81/08</span><h1>Sicurezza</h1><p>Documenti, sedi e categorie in una struttura riconoscibile, verificabile e sempre raggiungibile.</p></div>
        </div>
        <div className="p0-operations__metrics">
          <div className="p0-operations__metric">
            <strong>{documentCount}</strong>
            <span>Documenti</span>
          </div>
          <div className="p0-operations__metric">
            <strong>{folderCount || sedi.length * categorie.length}</strong>
            <span>Cartelle</span>
          </div>
          <div className="p0-operations__metric">
            <strong>{unclassifiedCount}</strong>
            <span>Da classificare</span>
          </div>
        </div>
      </header>

<section className="p0-safety-library">
        <header>
          <div><span className="p0-kicker">Mappa documentale</span><h2>Struttura SharePoint 81/08</h2><p>Le stesse sette categorie, organizzate per ogni sede.</p></div>
          {selectedSite && <a className="p0-btn p0-btn--safety" href={buildOpenUrl(selectedSite.codice)} target="_blank" rel="noreferrer">Apri {selectedSite.label}</a>}
        </header>
        <div className="p0-safety-sites">
          {visibleSites.map((site) => (
            <article className="p0-safety-site" key={site.codice}>
              <header><div><strong>{site.label}</strong><small>{site.cartella}</small></div><a href={buildOpenUrl(site.codice)} target="_blank" rel="noreferrer">Apri sede →</a></header>
              <div className="p0-safety-categories">
                {(site.categorie?.length ? site.categorie : categorie)
                  .filter((cat) => categoria === "TUTTE" || cat.codice === categoria)
                  .map((cat) => cat.disponibile ? (
                    <a key={cat.codice} href={buildOpenUrl(site.codice, cat.codice)} target="_blank" rel="noreferrer">
                      <span>{cat.codice.slice(0, 2)}</span><b>{cat.label}</b><small>Apri →</small>
                    </a>
                  ) : (
                    <div key={cat.codice} className="is-missing" title="Cartella non ancora presente in SharePoint">
                      <span>{cat.codice.slice(0, 2)}</span><b>{cat.label}</b><small>Da creare</small>
                    </div>
                  ))}
              </div>
            </article>
          ))}
        </div>
      </section>

<Sicurezza8108Controls
        buildOpenUrl={buildOpenUrl}
        load={load}
        refreshing={refreshing}
        search={search}
        setSearch={setSearch}
        sede={sede}
        setSede={setSede}
        categoria={categoria}
        setCategoria={setCategoria}
        sedi={sedi}
        categorie={categorie}
        resetFilters={resetFilters}
        filteredCount={documentiFiltrati.length}
      />

      <div className="p0-safety-notice">
        <FmedIcon name="info" /><div><strong>Archivio centralizzato</strong><span>{sourceMessage || "Power Automate indicizza i documenti in FMED; i file originali restano su SharePoint."}</span></div>
      </div>
      {error && <div className="p0-safety-notice is-error"><FmedIcon name="alert" /><div><strong>Verifica necessaria</strong><span>{error}</span></div></div>}

<section className="p0-safety-documents">
        <header>
          <div><span className="p0-kicker">Indice FMED</span><h2>Documenti indicizzati</h2><p>{loading ? "Lettura archivio in corso…" : `${documentiFiltrati.length} elementi visibili · ${currentDocumentCount} documenti vigenti.`}</p></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="p0-tag" style={{ margin: 0 }}>{historicalDocumentCount} storici</span>
            <button type="button" className="p0-btn" onClick={() => setShowHistory((value) => !value)}>
              {showHistory ? "NASCONDI STORICO" : `MOSTRA STORICO · ${historicalDocumentCount}`}
            </button>
          </div>
        </header>
        {loading ? <div className="p0-empty">Caricamento documentazione…</div> : documentiFiltrati.length ? (
          <div className="p0-safety-doc-list">{documentiFiltrati.map((doc, index) => {
            const statoCiclo = statoCicloDocumento(doc);
            const storico = !doc?.is_cartella && STATI_STORICI_8108.has(statoCiclo);
            const sostituto = doc?.sostituito_da ? documentNameBySourceId.get(String(doc.sostituito_da)) : "";
            const labelStato = doc?.is_cartella ? "STRUTTURA" : statoCiclo === "ATTIVA" ? "VIGENTE" : statoCiclo.replaceAll("_", " ");
            return (
              <article className="p0-safety-doc" key={doc.id || `${doc.nome}-${index}`} style={storico ? { background: "#f6f7f9", opacity: 0.78 } : undefined}>
                <div className="p0-safety-doc__main">
                  <span>{doc.is_cartella ? "CARTELLA" : doc.estensione || "FILE"}</span>
                  <div>
                    <strong title={`Nome originale: ${doc.nome || ""}`}>{doc.is_cartella ? doc.nome : nomeDocumentoPulito(doc)}</strong>
                    <small title={doc.percorso_relativo}>{doc.percorso_relativo || "Percorso non disponibile"}</small>
                    {statoCiclo === "SOSTITUITA" && <small style={{ color: "#687486", fontWeight: 700 }}>Sostituito da: {sostituto || doc.sostituito_da || "documento successivo"}</small>}
                  </div>
                </div>
                <dl>
                  <div><dt>Sede</dt><dd>{doc.sede_label || "Non classificato"}</dd></div>
                  <div><dt>Categoria</dt><dd>{doc.categoria_label || "Non classificata"}</dd></div>
                  <div><dt>Stato</dt><dd><span className="p0-tag" style={{ margin: 0, background: storico ? "#eceff3" : doc?.is_cartella ? "#f4f1e7" : "#e6f6ec", color: storico ? "#626c79" : doc?.is_cartella ? "#6e654d" : "#17653b" }}>{labelStato}</span></dd></div>
                  <div><dt>Modificato</dt><dd>{formatDate(doc.data_modifica)}</dd></div>
                </dl>
                <div className="p0-safety-doc__actions">
                  {doc.web_url ? <a className="p0-btn p0-btn--safety" href={doc.web_url} target="_blank" rel="noreferrer">Apri</a> : <span>—</span>}
                  <button type="button" className="p0-btn" onClick={() => eliminaDocumentoIndice(doc)} disabled={deletingId === doc.id}>{deletingId === doc.id ? "Rimozione…" : "Rimuovi dall’indice"}</button>
                </div>
              </article>
            );
          })}</div>
        ) : (
          <div className="p0-empty"><strong>Nessun documento indicizzato.</strong><span>Aggiungi o modifica un file nella cartella 81/08 oppure avvia il flusso iniziale di indicizzazione.</span></div>
        )}
      </section>
    </main>
  );
}

export default function Sicurezza8108Page(props) {
  return <Sicurezza8108ErrorBoundary><Sicurezza8108PageInner {...props} /></Sicurezza8108ErrorBoundary>;
}
