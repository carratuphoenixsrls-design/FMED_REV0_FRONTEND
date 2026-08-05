# FMED REV0 — Normalizzazione professionale Asset e Cespiti

## Ambito

Intervento limitato alla pagina **Asset e Cespiti**. Nessuna modifica a backend, Supabase, API, dati o funzioni operative.

## File modificati

- `src/pages/AssetPage.css` — nuovo foglio autorevole della pagina Asset, senza `!important`.
- `src/main.jsx` — import del CSS Asset caricato dopo gli altri fogli, così la pagina ha una fonte grafica chiara e stabile.
- `src/FmedUnifiedVisualSystem.css` — rimossi gli override Asset stratificati aggiunti in coda; mantenuto il resto del sistema.
- `src/pages/AssetPage.jsx` — corretti caratteri testuali danneggiati, senza variazioni funzionali.
- `src/components/asset/AssetControls.jsx` — corretti caratteri testuali danneggiati, senza variazioni funzionali.

## Normalizzazione applicata

- Testata compatta e proporzionata.
- KPI uniformi per altezza, icone e gerarchia tipografica.
- Ricerca senza cornice esterna doppia.
- Filtri in griglia 5×2 con controlli uniformi.
- Barra comandi con ordine e colori semantici coerenti.
- `Azzera filtri` rosso, `Nuovo asset` verde, `Analizza asset` viola.
- `Modifica multipla asset` separata dalla semplice selezione.
- Titolo `RISULTATI` leggibile e privo del conteggio duplicato.
- Righe Asset riallineate in cinque colonne stabili.
- Pulsanti `Apri` e `Modifica` uniformi e senza sovrapposizioni.
- Responsive dedicato per notebook e monitor desktop.

## Verifiche eseguite

- Bilanciamento parentesi CSS: superato.
- Nessun `!important` in `src/pages/AssetPage.css`.
- Contratti automatici REV0 e Regola 0: tutti i controlli funzionali superati; resta il controllo globale `!important` già presente nelle sezioni storiche non Asset del progetto.
- La build Vite non è stata eseguibile nell'ambiente Linux di lavorazione perché lo ZIP contiene dipendenze native Windows e il registry interno non rendeva disponibile il pacchetto Rollup Linux. Sul PC Windows eseguire `npm ci` e `npm run build`.

## Avvio su Windows

```powershell
npm ci
npm run dev
```

Per la verifica finale:

```powershell
npm run build
```

Non eseguire `npm audit fix --force`.
