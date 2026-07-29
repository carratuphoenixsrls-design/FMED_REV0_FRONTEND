# FMED REV0 · REGOLA 0

## Principio assoluto

Nessuna modifica grafica, funzionale o strutturale può essere rilasciata se introduce anche una sola regressione conosciuta.

La nuova grafica deve essere applicata all’intero sistema FMED, non soltanto alle pagine principali. Deve comprendere pagine primarie, secondarie e terziarie, schede, pannelli, modali, wizard, filtri, tabelle, menu, stati vuoti, caricamenti, errori, esportazioni e collegamenti tra moduli.

## Vincoli non negoziabili

- La base funzionale stabile resta la sorgente di verità.
- Nessuna funzione esistente può essere eliminata, rinominata, nascosta o resa irraggiungibile per ottenere il nuovo aspetto grafico.
- Non si modifica backend, Supabase, API, chiavi, permessi o integrazioni per risolvere un problema puramente grafico.
- Il vecchio stile deve essere sostituito in modo controllato: prima si identifica il componente da sostituire, poi si applica il nuovo stile, quindi si verifica che non esistano sovrapposizioni o residui.
- Non sono ammessi pagine bianche, controlli non cliccabili, schede mancanti, errori silenziosi, testi illeggibili, overflow incontrollati, scroll inutili, elementi fuori schermo o comportamenti diversi tra pagine equivalenti.
- Il rilascio resta vietato finché tutti i controlli obbligatori non risultano superati.

## Tre controlli obbligatori e completi

### Controllo 1 · Integrità funzionale

Verificare ogni funzione e ogni collegamento operativo:

- accesso, sessione, ruoli e logout;
- menu e navigazione;
- Asset e Cespiti: ricerca, filtri, elenco, scheda, modifica, nuovo asset, OCR, QR, documentazione, storico, dismissione e modifica multipla;
- Interventi: ricerca cespite, nuovo intervento, intervento manuale, registro, modifica, eliminazione, PDF, costi e collegamento alla scheda cespite;
- Scadenze: filtri, selezioni, apertura cespite, chiusura ciclo, sostituzione, non applicabile, export e storico protetto;
- Infrastrutture: ricerca, filtri, nuova infrastruttura, modifica, documenti, scadenze e stati;
- Sicurezza 81/08, Processi, Cataloghi, Strumenti, Report, Costi, SharePoint e tutte le relative sottopagine;
- wizard, modali, pannelli contestuali, notifiche, messaggi di errore, caricamenti e stati vuoti.

### Controllo 2 · Integrità grafica e responsive

Verificare l’intero sistema alle dimensioni previste, almeno:

- notebook 1366×768;
- desktop 1536×864;
- monitor 1920×1080.

Per ogni schermata verificare:

- proporzioni, allineamenti, gerarchie, spaziature, font, icone, colori e contrasto;
- assenza di sovrapposizioni, tagli, elementi invisibili o testo bianco su fondo bianco;
- scroll soltanto dove realmente necessario;
- coerenza tra pagina, scheda, modale e pannello collegato;
- comportamento corretto con elenchi vuoti, corti e molto lunghi.

### Controllo 3 · Collaudo finale di rilascio

Eseguire nuovamente tutti i flussi come utente reale, senza affidarsi soltanto a verifiche statiche:

- apertura di ogni voce di menu;
- esecuzione dei flussi principali, secondari e terziari;
- verifica di console browser, rete, error boundary e log;
- build pulita, lint, gate REV0 e controllo del pacchetto distribuito;
- confronto finale con la base stabile per accertare che nessuna funzione sia stata persa.

## Criterio di rilascio

Il rilascio è consentito soltanto quando:

1. tutti i controlli automatici sono verdi;
2. tutte le pagine e funzioni della matrice di collaudo sono verificate;
3. non esistono errori conosciuti, regressioni conosciute o difetti grafici conosciuti;
4. la versione candidata è stata verificata tre volte con esito completo;
5. la produzione stabile non viene sostituita prima dell’approvazione finale.

Qualsiasi esito incerto equivale a controllo non superato e blocca il rilascio.