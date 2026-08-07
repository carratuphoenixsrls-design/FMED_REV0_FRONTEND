import { useCallback, useEffect, useState } from "react";
import Sicurezza8108PageLegacy from "./Sicurezza8108PageLegacy.jsx";
import { fmedAuthHeaders } from "./fmedApiClient.js";

function normalizzaTesto(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cartellaSicurezzaDaMaster(site) {
  const codice = String(site?.codice || "").trim().toUpperCase();
  if (codice && !/^SED_\d+$/i.test(codice)) return codice;
  const label = normalizzaTesto(site?.etichetta || site?.label || codice).replace(/\s+/g, "_");
  return label || codice || "SEDE";
}

function dettaglioErrore(payload, fallback) {
  const detail = payload?.detail;
  if (typeof detail === "string") return detail;
  if (detail && typeof detail === "object") return detail.errore || detail.message || JSON.stringify(detail);
  return fallback;
}

export default function Sicurezza8108Page(props) {
  const { apiBaseUrl } = props;
  const [reloadKey, setReloadKey] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sites, setSites] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const base = String(apiBaseUrl || "").replace(/\/$/, "");

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape" && !saving) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, saving]);

  const caricaSediDisponibili = useCallback(async () => {
    setOpen(true);
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const [adminResponse, configResponse] = await Promise.all([
        fetch(`${base}/core/dizionari/amministrazione`, {
          headers: fmedAuthHeaders({ Accept: "application/json" }),
        }),
        fetch(`${base}/sicurezza-81-08/config`, {
          headers: fmedAuthHeaders({ Accept: "application/json" }),
        }),
      ]);
      const [adminData, configData] = await Promise.all([
        adminResponse.json().catch(() => ({})),
        configResponse.json().catch(() => ({})),
      ]);
      if (!adminResponse.ok) throw new Error(dettaglioErrore(adminData, "Master SEDI non disponibile"));
      if (!configResponse.ok) throw new Error(dettaglioErrore(configData, "Configurazione 81/08 non disponibile"));

      const dizionari = Array.isArray(adminData?.dizionari) ? adminData.dizionari : [];
      const sediDictionary = dizionari.find(
        (item) => normalizzaTesto(item?.codice).replace(/\s+/g, "_") === "SEDI"
      );
      const enabledCodes = new Set(
        (Array.isArray(configData?.sedi) ? configData.sedi : [])
          .map((item) => String(item?.codice || "").trim().toUpperCase())
          .filter(Boolean)
      );
      const disponibili = (Array.isArray(sediDictionary?.valori) ? sediDictionary.valori : [])
        .filter((item) => item?.attivo !== false)
        .filter((item) => String(item?.codice || "").trim().toUpperCase() !== "SED_0001")
        .filter((item) => normalizzaTesto(item?.etichetta) !== "NON SPECIFICATA")
        .filter((item) => !enabledCodes.has(String(item?.codice || "").trim().toUpperCase()))
        .map((item) => ({ ...item, codice: String(item?.codice || "").trim().toUpperCase() }));

      setSites(disponibili);
      setSelectedCode(disponibili[0]?.codice || "");
    } catch (err) {
      setSites([]);
      setSelectedCode("");
      setError(String(err?.message || err || "Impossibile leggere il Master SEDI"));
    } finally {
      setLoading(false);
    }
  }, [base]);

  const abilitaSede = useCallback(async () => {
    if (!selectedCode || saving) return;
    const site = sites.find((item) => item.codice === selectedCode);
    if (!site?.id) return;

    setSaving(true);
    setError("");
    setMessage("");
    try {
      const cartella = cartellaSicurezzaDaMaster(site);
      const metadati = {
        ...(site?.metadati && typeof site.metadati === "object" ? site.metadati : {}),
        sicurezza_81_08_enabled: true,
        sicurezza_81_08_cartella: cartella,
        sicurezza_81_08_abilitata_il: new Date().toISOString(),
      };
      const response = await fetch(`${base}/core/dizionari/valori/${encodeURIComponent(site.id)}`, {
        method: "PATCH",
        headers: fmedAuthHeaders({ Accept: "application/json", "Content-Type": "application/json" }),
        body: JSON.stringify({ metadati }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(dettaglioErrore(payload, "Abilitazione sede non riuscita"));

      setMessage(`${site.etichetta || site.codice} abilitata. Cartella prevista: ${cartella}.`);
      const rimanenti = sites.filter((item) => item.codice !== site.codice);
      setSites(rimanenti);
      setSelectedCode(rimanenti[0]?.codice || "");
      await new Promise((resolve) => setTimeout(resolve, 700));
      setReloadKey((value) => value + 1);
      setOpen(false);
    } catch (err) {
      setError(String(err?.message || err || "Abilitazione sede non riuscita"));
    } finally {
      setSaving(false);
    }
  }, [base, saving, selectedCode, sites]);

  const selectedSite = sites.find((item) => item.codice === selectedCode);
  const rootUrl = `${base}/sicurezza-81-08/apri`;
  const cartellaPrevista = selectedSite ? cartellaSicurezzaDaMaster(selectedSite) : "—";

  return (
    <>
      <div style={{ padding: "12px clamp(14px, 1.35vw, 24px) 0", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10 }}>
        {message && (
          <span style={{ marginRight: "auto", color: "#176f61", fontSize: 11, fontWeight: 700 }}>
            {message}
          </span>
        )}
        {error && !open && (
          <span style={{ marginRight: "auto", color: "#a33", fontSize: 11, fontWeight: 700 }}>
            {error}
          </span>
        )}
        <button type="button" className="p0-btn p0-btn--safety" onClick={caricaSediDisponibili}>
          + NUOVA SEDE
        </button>
      </div>

      <Sicurezza8108PageLegacy key={reloadKey} {...props} />

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Abilita nuova sede Sicurezza 81/08"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !saving) setOpen(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 30000,
            display: "grid",
            placeItems: "center",
            padding: 22,
            background: "rgba(18, 39, 61, 0.58)",
            backdropFilter: "blur(2px)",
          }}
        >
          <section
            style={{
              width: "min(620px, calc(100vw - 36px))",
              maxHeight: "calc(100vh - 36px)",
              overflowY: "auto",
              background: "#fff",
              borderRadius: 18,
              border: "1px solid #d6e0ed",
              boxShadow: "0 24px 70px rgba(16, 43, 70, 0.28)",
            }}
          >
            <header
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 18,
                padding: "22px 24px 18px",
                borderBottom: "1px solid #e5ebf2",
              }}
            >
              <div>
                <span style={{ display: "block", marginBottom: 5, fontSize: 10, fontWeight: 800, letterSpacing: ".12em", color: "#2d6ea3", textTransform: "uppercase" }}>
                  Sicurezza 81/08 · Amministrazione
                </span>
                <h2 style={{ margin: 0, fontSize: 22, lineHeight: 1.1, color: "#12385f" }}>
                  Aggiungi una sede
                </h2>
                <p style={{ margin: "7px 0 0", fontSize: 12, lineHeight: 1.45, color: "#68798c" }}>
                  Seleziona una sede già presente nel Master SEDI FMED. L’anagrafica non viene duplicata.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={saving}
                aria-label="Chiudi"
                style={{
                  width: 36,
                  height: 36,
                  flex: "0 0 36px",
                  border: "1px solid #d6e0ed",
                  borderRadius: 10,
                  background: "#fff",
                  color: "#34506d",
                  fontSize: 20,
                  lineHeight: 1,
                  cursor: saving ? "not-allowed" : "pointer",
                }}
              >
                ×
              </button>
            </header>

            <div style={{ padding: 24, display: "grid", gap: 18 }}>
              <label style={{ display: "grid", gap: 7 }}>
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".09em", textTransform: "uppercase", color: "#60738a" }}>
                  Sede da abilitare
                </span>
                <select
                  className="p0-input"
                  value={selectedCode}
                  onChange={(event) => setSelectedCode(event.target.value)}
                  disabled={loading || saving}
                  style={{ width: "100%", minHeight: 48, fontSize: 13 }}
                >
                  {loading && <option value="">Lettura Master SEDI…</option>}
                  {!loading && !sites.length && <option value="">Nessuna nuova sede disponibile</option>}
                  {sites.map((item) => (
                    <option key={item.id || item.codice} value={item.codice}>
                      {item.etichetta || item.codice}
                    </option>
                  ))}
                </select>
              </label>

              <div style={{ display: "grid", gap: 7 }}>
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".09em", textTransform: "uppercase", color: "#60738a" }}>
                  Struttura prevista
                </span>
                <div style={{ padding: "13px 15px", borderRadius: 12, border: "1px solid #dbe4ee", background: "#f7f9fc" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#203f60" }}>
                    13_SICUREZZA_81_08 / {cartellaPrevista}
                  </div>
                  <div style={{ marginTop: 5, fontSize: 11, color: "#6b7d90" }}>
                    La sede utilizzerà automaticamente le 7 categorie standard del modulo.
                  </div>
                </div>
              </div>

              <div style={{ padding: "13px 15px", borderRadius: 12, border: "1px solid #eadcab", background: "#fff9e8", fontSize: 11, lineHeight: 1.45, color: "#695a28" }}>
                Nessun file viene spostato o rinominato. Se la cartella fisica non esiste ancora su SharePoint, va creata nella radice 81/08 prima di caricare i documenti.
              </div>

              {error && (
                <div style={{ padding: "11px 13px", borderRadius: 10, background: "#fff1f1", color: "#9a3333", fontSize: 11, fontWeight: 700 }}>
                  {error}
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 9, flexWrap: "wrap", paddingTop: 2 }}>
                <a className="p0-btn" href={rootUrl} target="_blank" rel="noreferrer">
                  APRI RADICE SHAREPOINT
                </a>
                <button type="button" className="p0-btn" onClick={() => setOpen(false)} disabled={saving}>
                  ANNULLA
                </button>
                <button type="button" className="p0-btn p0-btn--safety" onClick={abilitaSede} disabled={!selectedCode || loading || saving}>
                  {saving ? "ABILITAZIONE…" : "ABILITA SEDE"}
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
