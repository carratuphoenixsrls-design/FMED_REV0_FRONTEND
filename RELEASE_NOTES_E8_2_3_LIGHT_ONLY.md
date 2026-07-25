# FMED Enterprise 1.0 — E8.2.3 LIGHT ONLY

Questa release mantiene integralmente la base funzionale E512 e rimuove il sistema di modalità scura dal frontend.

## Modifiche effettuate

- rimossi stato React, persistenza browser e commutazione del tema;
- rimosso il pulsante del tema dalla sidebar;
- login e area operativa impostati sempre sulla modalità chiara;
- eliminate le classi e le regole CSS dedicate alla modalità scura;
- eliminato `FmedLegacyThemeBridge.css`;
- consolidato `fmedInlineStyles.js` da 682 gruppi storici a 145 gruppi realmente utilizzati;
- mantenute le superfici petrolio istituzionali previste dal tema chiaro, in particolare sidebar e componenti di identità;
- nessuna modifica a login, sessione, ruoli, API, Supabase, database o backend.
