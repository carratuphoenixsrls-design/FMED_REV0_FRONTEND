# FMED REV0 · Ricostruzione completa Regola 0

Questo pacchetto contiene il frontend completo ricostruito a partire dal file sorgente FMED REV0 Punto 0 indicato come base di lavoro.

## Risultato

- grafica nuova applicata all'intero sistema;
- scheda cespite ricostruita come workspace completo a tutta larghezza;
- azioni cespite, KPI, dati, analisi predittiva e storico non compressi;
- pagine primarie, secondarie e terziarie uniformate;
- vecchi strati visuali separati rimossi e sostituiti da `src/FmedUnifiedVisualSystem.css`;
- logica, API, ruoli e dati operativi preservati;
- cache PWA aggiornata per evitare vecchi CSS nel browser.

## Avvio locale

Aprire PowerShell nella cartella del progetto ed eseguire:

```powershell
npm ci
npm run release:check
npm run dev
```

## Build Vercel

```powershell
npm ci
npm run release:check
```

Vercel userà il comando di build `npm run build`. Mantenere le variabili ambiente già presenti nel progetto; il pacchetto non contiene segreti.

## Regola di pubblicazione

Non sostituire la produzione stabile finché il deployment Preview non è stato verificato con dati reali. Nessun merge automatico è configurato in questo pacchetto.

## Nota sulla verifica in questo ambiente

I gate statici e il collaudo browser sono stati completati. Il download delle dipendenze npm non è stato ripetuto nel contenitore di generazione perché il mirror interno non disponeva di un archivio transitivo; su Vercel o su una postazione con accesso al registro npm pubblico, `npm ci` usa il lock file incluso.
