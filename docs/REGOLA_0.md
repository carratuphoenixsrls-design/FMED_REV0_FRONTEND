# FMED REV0 · Regola 0

## Principio assoluto

La vecchia pelle grafica non deve restare sovrapposta alla nuova. La ricostruzione usa un solo sistema visuale definitivo, `src/FmedUnifiedVisualSystem.css`, caricato per ultimo e responsabile della presentazione coerente dell'intero prodotto.

Nessun rilascio è consentito quando esiste anche uno solo dei seguenti problemi:

- pagina bianca, errore JavaScript o funzione non raggiungibile;
- funzione presente nella base stabile ma assente nella candidata;
- scheda cespite o scheda intervento incompleta;
- elemento tagliato, sovrapposto, illeggibile o fuori schermo;
- vecchia regola grafica ancora visibile o in conflitto;
- difetto conosciuto non risolto.

## Campo di applicazione

La regola comprende Dashboard, Asset e Cespiti, scheda cespite, Nuovo Asset, Interventi, Scadenze, Infrastrutture, Sicurezza 81/08, Processi, Cataloghi, Strumenti, Costi, Report, SharePoint, modali, pannelli, wizard, tabelle, filtri, stati vuoti, caricamenti ed errori.

## Vincoli funzionali

Backend, Supabase, dati, ruoli, API, chiavi e variabili ambiente non vengono ricreati o sostituiti. Il lavoro riguarda il frontend e conserva i contratti operativi esistenti.

## Gate obbligatori

1. `npm run verify:rev0`
2. `npm run verify:regola0`
3. `npm run lint`
4. `npm run build`
5. verifica della cartella `dist`
6. collaudo browser alle risoluzioni previste

Un fallimento blocca il rilascio.
