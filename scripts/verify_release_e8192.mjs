import fs from 'node:fs';

const checks = [
  ['versione package E8.1.9.2', JSON.parse(fs.readFileSync('package.json','utf8')).version === '8.1.9.2'],
  ['CSS sidebar enterprise importato', fs.readFileSync('src/main.jsx','utf8').includes('FmedE8192SidebarRedesign.css')],
  ['classe release sidebar presente', fs.readFileSync('src/App_nuovo.jsx','utf8').includes('fmed-e8192-sidebar')],
  ['menu raggruppato', fs.readFileSync('src/App_nuovo.jsx','utf8').includes('FMED_MENU_GROUPS')],
  ['gruppo Panoramica', fs.readFileSync('src/App_nuovo.jsx','utf8').includes('label: "Panoramica"')],
  ['gruppo Operatività', fs.readFileSync('src/App_nuovo.jsx','utf8').includes('label: "Operatività"')],
  ['gruppo Governance', fs.readFileSync('src/App_nuovo.jsx','utf8').includes('label: "Governance"')],
  ['pallini info rimossi dalla navigazione', !fs.readFileSync('src/App_nuovo.jsx','utf8').includes('className="fmed-menu-info"')],
  ['Mover integrato', fs.readFileSync('src/App_nuovo.jsx','utf8').includes('Controlla notifiche e consegne')],
  ['account compatto', fs.readFileSync('src/App_nuovo.jsx','utf8').includes('fmed-sidebar-account')],
  ['Missione preservata', fs.existsSync('src/MissionPage.jsx')],
  ['governance cataloghi preservata', fs.existsSync('src/components/masterdata/CatalogUniformityPanel.jsx')],
  ['Codice inventario escluso preservato', fs.readFileSync('src/components/masterdata/CatalogUniformityPanel.jsx','utf8').toLowerCase().includes('codice inventario')],
];
let ok = true;
for (const [label, pass] of checks) {
  console.log(`${pass ? 'OK' : 'ERRORE'} · ${label}`);
  if (!pass) ok = false;
}
if (!ok) process.exit(1);
console.log('FMED E8.1.9.2 Enterprise Sidebar Redesign: OK');
