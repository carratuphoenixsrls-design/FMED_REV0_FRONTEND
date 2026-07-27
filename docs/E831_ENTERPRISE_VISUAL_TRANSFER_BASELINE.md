# FMED512 E8.3.1 — Enterprise Visual Transfer

## Base ufficiale
- Repository: `FMED_FRONTEND_E512_CLEAN`
- Release funzionale: `8.3.1`
- Ramo di lavoro: `e831-enterprise-visual-guardian`
- `main` e produzione restano invariati fino al collaudo finale.

## Obiettivo
Applicare alla FMED512 E8.3.1 il linguaggio grafico Enterprise validato nella preview parallela, conservando integralmente struttura funzionale, pagine, campi, ruoli, API, processi, salvataggi, esportazioni e collegamenti esistenti.

## Regole bloccanti
- nessuna modifica a backend, Supabase, RLS, API, autenticazione, chiavi o variabili ambiente;
- nessuna rimozione o semplificazione di funzioni della E8.3.1;
- nessuna copia delle logiche della demo Emergent;
- Tipologia e Categoria restano distinte;
- Società e Reparto restano distinti;
- il wizard Nuovo Asset e Nuovo Intervento conservano tutti i campi e i flussi esistenti;
- prima si corregge o sostituisce la regola grafica esistente, poi si applica quella nuova;
- evitare nuovi livelli CSS sovrapposti non governati;
- build, gate visuale e gate funzionale dopo ogni blocco.

## Ordine di lavoro
1. audit della cascata CSS e degli stili inline;
2. token, tipografia, canvas e contrasto;
3. sidebar e topbar;
4. pulsanti, campi, badge, card e tabelle;
5. login;
6. Dashboard e Scopo;
7. Asset e Nuovo Asset;
8. Interventi e Nuovo Intervento;
9. Scadenze, Infrastrutture e Sicurezza 81/08;
10. Processi, Cataloghi, Impostazioni, Report ed Export;
11. collaudo completo desktop 1366×768, 1440×900, 1536×864 e 1920×1080.

## Stato iniziale rilevato
- la release dichiara `8.3.1` nel `package.json`;
- il runtime carica `FmedVisualClean.css` insieme a fogli CSS specifici di modulo;
- sono presenti anche stili visuali centralizzati in `fmedInlineStyles.js`;
- il trasferimento grafico deve quindi essere eseguito per sostituzione controllata, non aggiungendo una seconda pelle globale.
