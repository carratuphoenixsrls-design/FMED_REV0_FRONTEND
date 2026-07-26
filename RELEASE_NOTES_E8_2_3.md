# FMED Enterprise 1.0 · E8.2.3 Visual Final Polish

Questa release chiude la fase grafica e prepara il progetto all’audit funzionale completo.

## Correzioni incluse

- “Scopo e Missione” è la prima pagina mostrata dopo il login.
- Il wizard “Nuovo Asset” genera automaticamente il codice inventario in base alla sede.
- Il codice viene rigenerato al cambio sede soltanto in modalità automatica; un codice scritto manualmente non viene sovrascritto.
- La conferma finale garantisce la generazione del codice prima della richiesta al backend.
- Tutte le principali icone operative usano una sola famiglia SVG coerente e accessibile.
- Le azioni di Asset, Interventi e Infrastrutture sono compatte, visibili e dotate di etichette accessibili.
- Le tabelle non spezzano più le parole lettera per lettera e conservano lo scorrimento orizzontale.
- La scheda Asset occupa il viewport disponibile anche con zoom ridotto.
- I colori scuri residui degli stili inline sono stati sostituiti con i token del tema chiaro.
- Il logo Mover è rimosso dalla presentazione; resta un normale collegamento con icona.

## Vincoli preservati

Non sono stati modificati autenticazione, ruoli, endpoint, URL di produzione, Supabase, RLS, schema dati o logiche backend. La fase seguente deve essere l’audit funzionale end-to-end indicato dal committente; nessuna nuova funzione va aggiunta prima che tale audit sia completato.
