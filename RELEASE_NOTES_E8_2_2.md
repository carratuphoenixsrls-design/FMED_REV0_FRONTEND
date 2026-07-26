# FMED Enterprise 1.0 · E8.2.2 Visual Repair

Release correttiva dedicata alla stabilità visuale del frontend, senza modifiche a API, dati, autenticazione, ruoli o processi operativi.

## Correzioni

- Ripristinata una sola cascata CSS runtime: gli stili strutturali vengono caricati centralmente e il sistema visuale finale è sempre l’ultimo livello.
- Risolte le variabili visuali storiche non definite che rendevano titoli, metriche e superfici invisibili.
- Sidebar ricostruita come flusso verticale contenuto; eliminato il riquadro Mover dal footer.
- Marilab Mover spostato tra i normali collegamenti della navigazione, senza logo.
- Dashboard riportata a griglie esplicite per azioni rapide, KPI e pannelli operativi.
- Asset, Scadenze e Infrastrutture uniformati con KPI, filtri e tabelle stabili.
- Tabelle Infrastrutture e Scadenze dotate di larghezza minima e scorrimento orizzontale controllato.
- Strumenti trasformati in card leggibili e coerenti.
- Cataloghi stabilizzati con riepiloghi, toolbar, elenco dizionari e righe valore proporzionati.
- Processi raccolti in pannelli espandibili per modulo; tutte le funzioni restano nella stessa pagina.
- Controlli Processi normalizzati, inclusa l’icona Aggiorna che non può più espandersi.

## Regola di protezione

`npm run visual:gate` viene eseguito automaticamente prima di sviluppo e build. Blocca la release se rileva CSS caricati dalle pagine lazy, nuovi fogli separati, vecchi livelli globali, duplicazioni della sidebar/Mover o più di un CSS nel bundle.
