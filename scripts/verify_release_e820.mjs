import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync('package.json','utf8'));
const main = fs.readFileSync('src/main.jsx','utf8');
const app = fs.readFileSync('src/App_nuovo.jsx','utf8');
const premium = fs.readFileSync('src/FmedE820PremiumVisualSystem.css','utf8');
const index = fs.readFileSync('src/index.css','utf8');
const dashboard = fs.readFileSync('src/pages/DashboardPage.jsx','utf8');
const sourceFiles = fs.readdirSync('src').filter((name) => /\.(jsx|js)$/.test(name));
const sourceText = sourceFiles.map((name) => fs.readFileSync(`src/${name}`,'utf8')).join('\n');
const pictographicEmoji = /[\u{1F300}-\u{1FAFF}]/u;

const checks = [
  ['versione package E8.2.0', pkg.version === '8.2.0'],
  ['CSS Premium Visual System importato per ultimo', main.includes('FmedE820PremiumVisualSystem.css') && main.lastIndexOf('FmedE820PremiumVisualSystem.css') > main.lastIndexOf('FmedE8192SidebarRedesign.css')],
  ['classe release premium presente', app.includes('fmed-e820-premium')],
  ['font Segoe UI Variable centralizzato', premium.includes('--fmed-font-family: "Segoe UI Variable Text"')],
  ['nessun Google Fonts esterno', !index.includes('fonts.googleapis.com') && !index.includes('@import url(')],
  ['pesi tipografici enterprise presenti', premium.includes('font-weight: 400') && premium.includes('font-weight: 600') && premium.includes('font-weight: 650')],
  ['cifre tabulari configurate', premium.includes('tabular-nums')],
  ['Light e Dark definiti separatamente', premium.includes('body[data-theme="light"]') && premium.includes('body[data-theme="dark"]')],
  ['sidebar Light protetta da regressioni', premium.includes('body[data-theme="light"] .fmed-app-root.fmed-e820-premium aside.fmed-side-rail')],
  ['dashboard con icone SVG coerenti', dashboard.includes('<FmedModuleIcon module={item.module} size={18} />')],
  ['tabelle, form e dialog governati', premium.includes('Tables') && premium.includes('Forms') && premium.includes('Dialogs')],
  ['riduzione movimento rispettata', premium.includes('prefers-reduced-motion')],
  ['emoji pittografiche rimosse dai sorgenti principali', !pictographicEmoji.test(sourceText)],
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
console.log('FMED E8.2.0 Premium Visual System: OK');
