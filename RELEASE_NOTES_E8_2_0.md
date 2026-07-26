# FMED Enterprise 1.0 · E8.2.0 Premium Visual System

## Motivazione
La E8.1.9.2 ha migliorato la struttura della sidebar, ma il collaudo visivo ha evidenziato due problemi non accettabili: la modalità chiara rendeva diverse voci quasi illeggibili e l’interfaccia conservava una tipografia troppo piccola, troppo maiuscola e poco uniforme. La E8.2.0 introduce quindi un vero livello visivo centralizzato, non una nuova patch isolata.

## Font precedente
- Futura Light / Futura con fallback Jost e Century Gothic.
- Import esterno di Jost da Google Fonts.
- Pesi 300 e dimensioni molto piccole in numerose aree.

## Font finale
- `Segoe UI Variable Text`, `Segoe UI Variable`, `Segoe UI`, `system-ui` e fallback sicuri.
- Un’unica variabile `--fmed-font-family` applicata all’intero frontend.
- Nessun download esterno e nessun file font aggiunto al progetto.
- Pesi operativi: 400 per testo, 500/550 per navigazione e label, 600/650 per titoli e pulsanti, 700 soltanto per identità e valori prioritari.
- Cifre tabulari abilitate per KPI, date, codici e tabelle.

## Componenti ridisegnati
- Sidebar in modalità estesa e compatta, sempre leggibile sia in Light sia in Dark.
- Dashboard, intestazione, automazioni, azioni rapide, KPI e pannelli operativi.
- Hero di Asset, Interventi, Scadenze, Infrastrutture, Costi, Export e SharePoint.
- Pulsanti primari e secondari, campi, select, textarea, focus e disabled.
- Tabelle e contenitori tabellari.
- Modali, drawer e dialog.
- Processi, Cataloghi, Impostazioni, Scopo e Missione, Sicurezza 81/08, Audit e Nuovo Asset.
- Rimozione dei pittogrammi emoji dai sorgenti dell’interfaccia; le azioni rapide usano il sistema SVG FMED.

## Criteri estetici
- Proporzioni armoniche e gerarchia tipografica centralizzata.
- Superfici distinte senza accumulo di riquadri bianchi.
- Bordi delicati e ombre leggere.
- Stati hover, focus, active, loading/disabled coerenti.
- Animazioni brevi e rispetto di `prefers-reduced-motion`.
- Stessa qualità percettiva in Light e Dark.

## Prestazioni
- Eliminato l’import Google Fonts.
- Nessuna nuova dipendenza.
- Nessun file font aggiunto.
- Impatto CSS limitato a un foglio finale centralizzato.

## Integrità funzionale
Non sono stati modificati dati, funzionalità, backend, API, autenticazione, ruoli, Supabase, RLS, database, payload o logiche operative. Missione, governance cataloghi e l’esclusione del Codice inventario restano preservate.
