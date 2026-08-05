import React from "react";
import ReactDOM from "react-dom/client";
import FmedErrorBoundary from "./FmedErrorBoundary.jsx";
import "./FmedBaseStyles.css";
import "./FmedErrorBoundary.css";
import "./ProcessiPage.css";
import "./ImpostazioniPage.css";
import "./CoreStandardPage.css";
import "./SystemAuditPage.css";
import "./Sicurezza8108Page.css";
import "./components/ProcessEnginePage.css";
import "./components/masterdata/CanonicalSelect.css";
import "./FmedUnifiedVisualSystem.css";
import "./AssetDetailCompact.css";
import "./pages/AssetPage.css";
import "./FmedProfessionalLayoutSystem.css";
import "./FmedTypographySystem.css";



import "./FmedScadenzeSystem.css";
import "./FmedInfrastruttureSystem.css";
import "./FmedDashboardSystem.css";
import "./FmedGlobalHeaderSystem.css";
import "./FmedControlStandardSystem.css";
import "./FmedProcessWorkspaceSystem.css";

import "./NewAssetWizard.css";
import "./FmedCostiSystem.css";
import "./FmedExportSystem.css";
import "./FmedSharePointSystem.css";
import "./FmedButtonSystem.css";
const FMED_APP_CACHE_VERSION = "fmed-rev0-complete-reconstruction-20260730-4-asset-detail-horizontal";

const FMED_API_WARMUP_URL = String(
  import.meta.env?.VITE_API_BASE_URL || "https://fmed-backend.onrender.com"
).replace(/\/$/, "");

function warmBackendFmed() {
  // Avvia subito l'istanza Render mentre il frontend e la schermata login si caricano.
  // La richiesta non blocca l'interfaccia e riduce l'attesa al primo accesso ai dati.
  fetch(`${FMED_API_WARMUP_URL}/`, {
    method: "GET",
    cache: "no-store",
    headers: { Accept: "application/json" },
  }).catch(() => {});
}

async function refreshPwaCache() {
  try {
    const previous = localStorage.getItem("fmed_app_cache_version");
    if (previous === FMED_APP_CACHE_VERSION) return;

    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    }

    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }

    localStorage.setItem("fmed_app_cache_version", FMED_APP_CACHE_VERSION);
  } catch (error) {
    console.warn("[FMED] Cache cleanup skipped:", error);
  }
}

async function bootstrap() {
  warmBackendFmed();
  await refreshPwaCache();

  const module = await import("./FmedApp.jsx");
  const App = module.default;

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <FmedErrorBoundary>
        <App />
      </FmedErrorBoundary>
    </React.StrictMode>
  );
}

bootstrap();
