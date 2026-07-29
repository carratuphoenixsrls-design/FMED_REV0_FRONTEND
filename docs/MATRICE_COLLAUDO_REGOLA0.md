# FMED REV0 · Matrice di collaudo Regola 0

Ogni riga deve essere verificata nei tre cicli di controllo. Una casella non verificata blocca il rilascio.

Legenda: `[ ]` da verificare · `[x]` superato · `[!]` difetto rilevato

## 1. Accesso, sessione e struttura generale

- [ ] Login valido e messaggi di errore corretti
- [ ] Ripristino sessione dopo aggiornamento pagina
- [ ] Logout manuale
- [ ] Logout per inattività
- [ ] Permessi Admin
- [ ] Permessi Service
- [ ] Permessi User
- [ ] Sidebar estesa e ridotta
- [ ] Tutte le voci menu raggiungibili
- [ ] Collegamento Marilab Mover
- [ ] Error boundary leggibile e funzionante
- [ ] Nessuna pagina bianca
- [ ] Nessun errore console bloccante
- [ ] Nessuna richiesta di rete errata o verso localhost in produzione

## 2. Dashboard / presentazione iniziale

- [ ] Apertura iniziale corretta dopo login
- [ ] KPI e dati coerenti
- [ ] Collegamenti rapidi funzionanti
- [ ] Testata, icone, testi e pulsanti leggibili
- [ ] Nessuna perdita di funzione rispetto alla base stabile

## 3. Asset e Cespiti

### Pagina primaria

- [ ] Caricamento elenco cespiti
- [ ] Ricerca libera
- [ ] Filtro sede
- [ ] Filtro categoria
- [ ] Filtro branca
- [ ] Filtro locazione
- [ ] Filtro tipologia
- [ ] Filtro costruttore
- [ ] Filtro modello
- [ ] Filtro società
- [ ] Filtro stato
- [ ] Ordinamento
- [ ] Apertura e chiusura elenco
- [ ] Analisi asset filtrati
- [ ] Reset filtri
- [ ] KPI coerenti con i filtri

### Funzioni secondarie

- [ ] Apertura scheda dalla riga
- [ ] Apertura scheda da codice URL
- [ ] Modifica rapida riga
- [ ] Salvataggio modifica rapida
- [ ] Annullamento modifica rapida
- [ ] Selezione multipla
- [ ] Modifica multipla branca
- [ ] Modifica multipla società
- [ ] Modifica multipla sede
- [ ] Modifica multipla locazione
- [ ] Modifica multipla stato
- [ ] Caricamento progressivo elenchi lunghi

### Scheda cespite e funzioni terziarie

- [ ] Apertura e chiusura scheda
- [ ] Dati anagrafici completi
- [ ] Modifica cespite
- [ ] Salvataggio modifica cespite
- [ ] Annullamento modifica
- [ ] OCR targhetta
- [ ] OCR accessorio
- [ ] Apri documentazione SharePoint
- [ ] Modifica link documentazione
- [ ] Rimozione link documentazione
- [ ] Scheda PDF
- [ ] QR
- [ ] Etichetta Zebra
- [ ] Etichetta cLabel DDL
- [ ] Nuovo intervento dalla scheda
- [ ] Modifica ultimo intervento
- [ ] Storico interventi
- [ ] Filtri storico
- [ ] Analisi predittiva
- [ ] Copia dati cespite
- [ ] Dismissione

### Nuovo Asset

- [ ] Apertura wizard
- [ ] Tipologia e categoria non confuse
- [ ] Sede
- [ ] Società
- [ ] Branca
- [ ] Locazione
- [ ] Costruttore
- [ ] Modello
- [ ] Stato
- [ ] Collaudo manuale
- [ ] Codice automatico
- [ ] Codice manuale
- [ ] Regole operative
- [ ] Avanzamento e ritorno tra passaggi
- [ ] Creazione finale
- [ ] Apertura automatica scheda appena creata

## 4. Interventi

### Pagina primaria

- [ ] Caricamento registro
- [ ] Vista operativa
- [ ] Storico completo
- [ ] Ricerca cespite per nuovo intervento
- [ ] Apertura scheda cespite dalla ricerca
- [ ] Intervento manuale
- [ ] Filtri codice, sede, società, tipologia, attività e date
- [ ] Ordinamento
- [ ] Apertura e chiusura registro
- [ ] Reset filtri
- [ ] Export PDF
- [ ] Analisi costi
- [ ] KPI spesa, attività, beni ed esecutori

### Funzioni secondarie e terziarie

- [ ] Nuovo intervento da cespite
- [ ] Nuovo intervento manuale
- [ ] Salvataggio intervento
- [ ] Modifica intervento
- [ ] Eliminazione intervento
- [ ] Apertura scheda cespite dal registro
- [ ] Job report/documento
- [ ] Date ultimo e prossimo intervento
- [ ] Ditta esecutrice
- [ ] Costi
- [ ] Collaudi storici protetti

## 5. Scadenze

- [ ] Caricamento agenda
- [ ] KPI nel perimetro, scadute, entro 30 giorni, da pianificare e selezionate
- [ ] Filtro priorità temporale
- [ ] Filtro modulo
- [ ] Filtro codice
- [ ] Filtro sede
- [ ] Filtro tipologia
- [ ] Filtro attività
- [ ] Filtro ditta
- [ ] Filtro date
- [ ] Ordinamento
- [ ] Apertura e chiusura elenco
- [ ] Selezione singola e multipla
- [ ] Seleziona scadute
- [ ] Seleziona da pianificare
- [ ] Deseleziona tutto
- [ ] Apertura scheda cespite
- [ ] Chiusura ciclo
- [ ] Chiusura come sostituita
- [ ] Non applicabile
- [ ] Motivo chiusura
- [ ] Storico protetto e collaudi
- [ ] Export PDF
- [ ] Record senza cespite ancora gestibili senza bloccare la pagina

## 6. Infrastrutture

- [ ] Caricamento dati
- [ ] Ricerca
- [ ] Filtri sede, categoria, stato, ditta, periodicità, priorità, responsabile, centro costo e società
- [ ] Filtro date
- [ ] KPI coerenti
- [ ] Apertura elenco
- [ ] Nuova infrastruttura
- [ ] Modifica infrastruttura
- [ ] Salvataggio
- [ ] Annullamento
- [ ] Documentazione
- [ ] Scadenze e stato
- [ ] Aggiornamento dati
- [ ] Reset filtri

## 7. Sicurezza 81/08

- [ ] Apertura pagina
- [ ] Ricerca
- [ ] Filtri sede e categoria
- [ ] KPI documenti, cartelle e da classificare
- [ ] Apertura SharePoint
- [ ] Aggiornamento indice
- [ ] Elenco documenti
- [ ] Stati vuoti e caricamento

## 8. Processi

- [ ] Apertura pagina
- [ ] Elenco processi disponibili
- [ ] Processi in corso
- [ ] Ritardi
- [ ] Approvazioni
- [ ] Ricerca e filtri
- [ ] Apertura archivio storico
- [ ] Avvio processo guidato
- [ ] Passaggi, responsabilità, SLA, cicli e chiusura
- [ ] Evidenze, allegati e approvazioni

## 9. Cataloghi

- [ ] Apertura Dizionari
- [ ] Ricerca dizionario
- [ ] Ricerca valori
- [ ] Mostra disattivati
- [ ] Aggiunta valore
- [ ] Modifica valore
- [ ] Disattivazione/riattivazione
- [ ] Regole operative
- [ ] Qualità dati
- [ ] Sincronizzazione dati
- [ ] Assenza di duplicati e vecchie relazioni

## 10. Strumenti / Amministrazione

- [ ] Panoramica
- [ ] Accessi
- [ ] Cataloghi
- [ ] Controllo sistema
- [ ] Costi
- [ ] Report
- [ ] Documenti
- [ ] Processi
- [ ] Cataloghi
- [ ] Motori attivi
- [ ] Separazione corretta dalle pagine operative

## 11. Report, Costi e SharePoint

- [ ] Report con filtri avanzati
- [ ] Export CSV reale
- [ ] Audit qualità dati
- [ ] Costi per ditta, sede, cespite e attività
- [ ] Intervallo contabile
- [ ] SharePoint generale
- [ ] SharePoint cespite
- [ ] SharePoint infrastruttura
- [ ] Link mancanti gestiti con messaggio chiaro

## 12. Controllo grafico completo

Da ripetere a 1366×768, 1536×864 e 1920×1080:

- [ ] Sidebar
- [ ] Testate
- [ ] Card
- [ ] KPI
- [ ] Filtri
- [ ] Tabelle
- [ ] Pulsanti
- [ ] Icone
- [ ] Badge e stati
- [ ] Modali
- [ ] Wizard
- [ ] Scheda cespite
- [ ] Scheda intervento
- [ ] Pannelli contestuali
- [ ] Stati vuoti
- [ ] Caricamenti
- [ ] Messaggi di errore
- [ ] Contrasto e leggibilità
- [ ] Assenza di sovrapposizioni
- [ ] Assenza di elementi tagliati
- [ ] Scroll soltanto dove necessario

## Esito finale

- [ ] Controllo completo 1 superato
- [ ] Controllo completo 2 superato
- [ ] Controllo completo 3 superato
- [ ] Nessun errore conosciuto
- [ ] Nessuna regressione conosciuta
- [ ] Nessun difetto grafico conosciuto
- [ ] Approvazione finale prima del merge su `main`
- [ ] Promozione Production eseguita soltanto dopo approvazione
