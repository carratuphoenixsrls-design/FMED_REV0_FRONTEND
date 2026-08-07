import { useCallback, useState } from "react";
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
      await new Promise((resolve) => setTimeout(resolve, 900));
      setReloadKey((value) => value + 1);
    } catch (err) {
      setError(String(err?.message || err || "Abilitazione sede non riuscita"));
    } finally {
      setSaving(false);
    }
  }, [base, saving, selectedCode, sites]);

  const selectedSite = sites.find((item) => item.codice === selectedCode);
  const rootUrl = `${base}/sicurezza-81-08/apri`;

  return (
    <>
      <div style={{ padding: "clamp(14px, 1.35vw, 24px) clamp(14px, 1.35vw, 24px) 0" }}>
        <section className="p0-safety-library" style={{ overflow: "visible" }}>
          <header>
            <div>
              <span className="p0-kicker">Amministrazione sedi</span>
              <h2 style={{ marginBottom: 3 }}>Gestione sedi Sicurezza 81/08</h2>
              <p>Abilita nel modulo una sede già presente nel Master SEDI FMED, senza duplicare l’anagrafica.</p>
            </div>
            {!open ? (
              <button type="button" className="p0-btn p0-btn--safety" onClick={caricaSediDisponibili}>
                + NUOVA SEDE
              </button>
            ) : (
              <button type="button" className="p0-btn" onClick={() => setOpen(false)} disabled={saving}>
                CHIUDI
              </button>
            )}
          </header>

          {open && (
            <div style={{ padding: "14px 17px", display: "grid", gap: 12, background: "#f8fafc" }}>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(260px, 1fr) minmax(260px, 1fr)", gap: 12 }}>
                <label style={{ display: "grid", gap: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "#65758b" }}>
                    Sede da abilitare
                  </span>
                  <select
                    className="p0-input"
                    value={selectedCode}
                    onChange={(event) => setSelectedCode(event.target.value)}
                    disabled={loading || saving}
                    style={{ width: "100%", minHeight: 42 }}
                  >
                    {loading && <option value="">Lettura Master SEDI…</option>}
                    {!loading && !sites.length && <option value="">Nessuna nuova sede disponibile</option>}
                    {sites.map((item) => (
                      <option key={item.id || item.codice} value={item.codice}>{item.etichetta || item.codice}</option>
                    ))}
                  </select>
                </label>

                <div style={{ display: "grid", gap: 6, alignContent: "end" }}>
                  <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "#65758b" }}>
                    Cartella SharePoint prevista
                  </span>
                  <div style={{ minHeight: 42, display: "flex", alignItems: "center", padding: "0 12px", border: "1px solid #d6e0ed", borderRadius: 10, background: "#fff", fontSize: 12, fontWeight: 700, color: "#233a57" }}>
                    {selectedSite ? cartellaSicurezzaDaMaster(selectedSite) : "—"}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <button type="button" className="p0-btn p0-btn--safety" onClick={abilitaSede} disabled={!selectedCode || loading || saving}>
                  {saving ? "ABILITAZIONE…" : "ABILITA SEDE"}
                </button>
                <a className="p0-btn" href={rootUrl} target="_blank" rel="noreferrer">APRI RADICE SHAREPOINT</a>
                <button type="button" className="p0-btn" onClick={() => setOpen(false)} disabled={saving}>ANNULLA</button>
              </div>

              <div className="p0-safety-notice" style={{ minHeight: 0 }}>
                <div>
                  <strong>Come funziona</strong>
                  <span>
                    FMED usa la sede del Master centrale e la predispone con le sette categorie 81/08. Se la cartella fisica non esiste ancora, va creata nella radice 13_SICUREZZA_81_08 prima di caricare documenti.
                  </span>
                </div>
              </div>

              {message && <small style={{ color: "#176f61", fontWeight: 700 }}>{message}</small>}
              {error && <small style={{ color: "#a33", fontWeight: 700 }}>{error}</small>}
            </div>
          )}

          {!open && message && <div style={{ padding: "10px 17px", borderTop: "1px solid #e0e7f0", color: "#176f61", fontSize: 11, fontWeight: 700 }}>{message}</div>}
          {!open && error && <div style={{ padding: "10px 17px", borderTop: "1px solid #e0e7f0", color: "#a33", fontSize: 11, fontWeight: 700 }}>{error}</div>}
        </section>
      </div>

      <Sicurezza8108PageLegacy key={reloadKey} {...props} />
    </>
  );
}
