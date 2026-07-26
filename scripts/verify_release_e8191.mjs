import fs from 'node:fs';
const checks = [
  ['versione package E8.1.9.1', JSON.parse(fs.readFileSync('package.json','utf8')).version === '8.1.9.1'],
  ['foglio contrasto importato', fs.readFileSync('src/main.jsx','utf8').includes('FmedE8191ContrastPerfection.css')],
  ['wordmark F.M.E.D.', fs.readFileSync('src/App_nuovo.jsx','utf8').includes('F.M.E.D.')],
  ['Facility Management', fs.readFileSync('src/App_nuovo.jsx','utf8').includes('Facility Management')],
  ['Missione presente', fs.existsSync('src/MissionPage.jsx')],
  ['Marilab Mover presente', fs.readFileSync('src/App_nuovo.jsx','utf8').includes('marilab-mover.vercel.app')],
  ['governance cataloghi preservata', fs.readFileSync('src/FmedE819MissionCatalogs.css','utf8').includes('CATALOGHI')],
  ['Codice inventario escluso preservato', fs.readFileSync('scripts/verify_release_e819.mjs','utf8').includes('Codice inventario')],
];
let ok=true; for (const [label,pass] of checks){console.log(`${pass?'OK':'ERRORE'} · ${label}`); if(!pass) ok=false;}
if(!ok) process.exit(1); console.log('FMED E8.1.9.1 Contrast & Presentation: OK');
