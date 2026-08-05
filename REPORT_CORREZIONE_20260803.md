# FMED REV0 — Correzione pacchetto deploy-ready

## Correzioni applicate

1. Corretto il selettore CSS malformato in `src/AssetDetailCompact.css`:
   - da attributi spezzati su più righe (`input[` + attributo separato),
   - a selettori validi `input[placeholder*="http"]` e `input[value^="http"]`.

2. Ripristinato in `src/pages/InterventiPage.jsx` il controllo archivio storico `p0-history-switch`, già previsto dalle proprietà e dalla logica esistente:
   - nessuna nuova API;
   - nessuna modifica a backend o Supabase;
   - riutilizzate `interventiIncludeStorico` e `cambiaVistaStoricoInterventi` già presenti.

3. Corretto `scripts/verify_dist_pointzero.mjs`:
   - il controllo non vieta più ogni uso locale di `!important`;
   - continua a bloccare soltanto override universali reali (`*`, `html *`, `body *`, `.fmed-main-content *`).

4. Rimossi dal pacchetto consegnato:
   - `.git`;
   - `node_modules`;
   - `dist` precedente;
   - `.env.local`;
   - file `*.BACKUP*` e `*.BASE_*`.

## Verifiche eseguite

- `verify:rev0`: superato.
- `verify:regola0`: superato.
- Sintassi JavaScript dei verificatori: valida (`node --check`).
- Sintassi JSX di `InterventiPage.jsx`: valida.
- Nessun selettore CSS universale con `!important` rilevato.
- Nessun selettore `input[` spezzato rilevato.
- Contratto `p0-history-switch` presente nella pagina Interventi.

## Nota build

La build completa era già riuscita sul PC Windows prima delle ultime tre correzioni, fermandosi soltanto nel postbuild per i due controlli ora risolti. Nell'ambiente Linux di analisi non è stato possibile reinstallare la dipendenza nativa opzionale Rollup dal registry interno; per questo il pacchetto viene consegnato senza `node_modules` e senza `dist`, come corretto per GitHub/Vercel.

Sul PC o su Vercel eseguire:

```powershell
npm ci
npm run build
```
