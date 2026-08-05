# FMED REV0 — Frontend

Questa cartella è l’unica base ufficiale del frontend FMED.

## Regola assoluta di sostituzione

Ogni nuova funzione, modifica o regola grafica sostituisce integralmente la
precedente. Nello stesso intervento devono essere rimossi componenti, stili,
fallback, asset, test e documentazione diventati obsoleti. Non sono ammesse
patch cumulative, doppie implementazioni o regole CSS correttive lasciate in
cascata.

La compatibilità con dati reali già presenti può essere mantenuta soltanto
quando è necessaria per non perdere informazioni o interrompere flussi
operativi. Non deve diventare una seconda interfaccia o una seconda logica.

## Verifica

```powershell
npm install
npm run check
```

## Deploy

Il frontend resta destinato al progetto Vercel `fmed_512_clean`.

```powershell
npx vercel link
npx vercel --prod
```
