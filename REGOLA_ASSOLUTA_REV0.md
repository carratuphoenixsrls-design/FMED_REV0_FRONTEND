# FMED REV0 — Regola assoluta

FMED REV0 è il punto zero e l’unica linea di sviluppo autorizzata.

1. Una modifica nuova sostituisce completamente la precedente.
2. Il codice sostituito viene eliminato nello stesso intervento.
3. Non restano componenti duplicati, CSS sovrapposti, fallback grafici,
   vecchie route alternative, asset inutilizzati o verificatori di release
   superate.
4. Frontend e backend vengono versionati e collaudati insieme.
5. Nessuna modifica può alterare dati, Supabase, API o flussi senza una
   richiesta esplicita e una migrazione verificata.
6. La compatibilità dati indispensabile non è una release parallela: resta
   confinata nel punto di lettura o conversione e deve essere documentata.
7. Il progetto FMED Enterprise parallelo è chiuso e non costituisce più una
   fonte per codice, grafica, prompt o decisioni.
