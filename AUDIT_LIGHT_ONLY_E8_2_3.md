# FMED Enterprise 1.0 — Audit E8.2.3 LIGHT ONLY

Data: 26 luglio 2026

## Obiettivo

Eliminare integralmente il sistema di modalità scura dal frontend mantenendo invariata la base funzionale E512, il backend E8.1.8, le API, l’autenticazione, i ruoli, Supabase e le configurazioni di produzione.

## Interventi eseguiti

- eliminato lo stato React `darkMode` e il relativo setter;
- eliminato lo stato dedicato al login;
- eliminata la persistenza `fmed_theme_mode` nel browser;
- eliminato il pulsante di cambio tema dalla sidebar;
- radice applicativa impostata permanentemente su `fmed-light-mode`;
- HTML e `body` impostati su `data-theme="light"` prima del rendering;
- eliminato il file `FmedLegacyThemeBridge.css` e il relativo import;
- eliminate tutte le regole CSS dedicate alla modalità scura, comprese regole annidate e media query;
- eliminati selettori e classi non più utilizzati per i pulsanti del tema;
- rinominate le variabili cromatiche che usavano il termine `dark`, mantenendo invariati i valori cromatici istituzionali necessari al tema chiaro;
- consolidato `fmedInlineStyles.js` ai soli gruppi effettivamente richiamati dal frontend;
- eliminati script, checksum e documentazione storica appartenenti a release precedenti per evitare sovrapposizioni e falsi controlli;
- aggiornati versione, manifest pubblico, cache applicativa e metadati a E8.2.3 LIGHT ONLY.

## Riduzione del codice grafico storico

- riferimenti `data-theme="dark"`: da 715 a 0;
- riferimenti `.fmed-dark-mode`: da 311 a 0;
- riferimenti `darkMode`: da 17 a 0;
- riferimenti `loginDarkMode`: da 5 a 0;
- riferimenti `themeDarkVars`: da 23 a 0;
- riferimenti alla persistenza del tema: da 4 a 0;
- registro stili inline: da 16.510 righe a 1.525 righe;
- gruppi inline storici calcolati: da 682 a 145 gruppi realmente utilizzati.

## Controlli completati

- 40 file JavaScript/JSX analizzati: nessun errore di parsing;
- 31 file CSS analizzati: nessun errore di parsing;
- nessun import locale mancante;
- nessun gruppo di stile richiamato mancante;
- nessun gruppo inline storico inutilizzato nel registro consolidato;
- nessuna modifica ai file JavaScript funzionali diversi da `App_nuovo.jsx`, `main.jsx` e `fmedInlineStyles.js`;
- nessun file `.env`, chiave, secret o configurazione Supabase incluso o modificato.

## Verifica build

Il registro npm disponibile nell’ambiente di audit ha restituito HTTP 503; per questo non è stato possibile completare qui una nuova installazione `npm ci` e la build Vite reale. I parser JavaScript/JSX e CSS e il verificatore statico E8.2.3 hanno completato tutti i controlli con successo.

La build completa deve essere eseguita sul PC prima del deploy tramite:

```powershell
.\02_VERIFICA_BUILD.ps1
```

## Stato finale

Il frontend è predisposto esclusivamente per il tema chiaro. La sidebar petrolio e le superfici istituzionali previste dal design Enterprise restano parte del tema chiaro approvato e non costituiscono una modalità scura alternativa.
