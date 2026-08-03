# FMED REV0 Frontend — Stato verificato

- componente applicativo unico `src/FmedApp.jsx`;
- nessun `!important`, `prompt` operativo o compressione globale;
- nessun registro JavaScript degli stili;
- bundle CSS runtime unico;
- dipendenze non utilizzate rimosse;
- gate REV0, ESLint e build Vite superati;
- pagina Scopo e Missione assente;
- Dashboard iniziale e funzioni operative preservate.

Gli stili JSX residui sono calcolati da stato o dati runtime. Prima del deploy
è richiesto il collaudo visivo a zoom 100%.
