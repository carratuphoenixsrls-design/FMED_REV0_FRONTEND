# FMED Enterprise 1.0 · E8.2.1 Visual Clean

## Obiettivo

Bonifica esclusivamente grafica della base E8.2.0, senza modificare funzioni, dati, API, autenticazione, ruoli, Supabase, routing o flussi operativi.

## Intervento

- Eliminati dal caricamento e dal pacchetto i livelli CSS globali storici sovrapposti.
- Creato un solo foglio globale: `src/FmedVisualClean.css`.
- Consolidato `fmedInlineStyles.js`: i valori runtime restano invariati, ma ogni proprietà viene dichiarata una sola volta.
- Sidebar petrolio unica, proporzionata per monitor desktop da 15", con riduzione reale a 68 px e scroll limitato alla sola navigazione quando necessario.
- Tema chiaro unico; rimossi selettore e codice runtime del tema scuro.
- Login desktop a due pannelli, mantenendo invariati submit, endpoint `/login`, JWT, sessione, errori e memorizzazione accesso.
- Uniformati tipografia, spaziature, superfici, pulsanti, campi, tabelle, dialog, KPI e intestazioni.
- Rimossi Google Fonts e dipendenze grafiche esterne.

## Integrità funzionale

- Backend e `VITE_API_BASE_URL` invariati.
- Autenticazione reale e chiave `fmed_login_session` invariate.
- Ruoli Admin, Service e User invariati.
- Timeout di inattività della base E8.2.0 invariato.
- Pagine, pulsanti, filtri, campi, payload e funzioni operative invariati.

## Verifica

Eseguire:

```powershell
npm ci --no-audit --no-fund
npm run check
```
