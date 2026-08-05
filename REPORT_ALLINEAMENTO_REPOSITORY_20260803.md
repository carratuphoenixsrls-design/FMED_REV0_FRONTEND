# FMED REV0 — Allineamento repository frontend/backend

- Dashboard frontend migrata da `/dashboard-summary` a `/process-engine/riepilogo`.
- Precaricamento processi migrato da `/core/processi` a `/process-engine/catalogo`.
- Avvio processi migrato a `/process-engine/esecuzioni`.
- Rimosso fallback obsoleto dalla pagina Processi.
- Backend dotato di adattatori temporanei per cache/PWA legacy (`/processi`, `/core/processi...`).
- Aggiunta validazione canonica asset `/core/valida`.
- Nessuna modifica a Supabase, chiavi o dati.
