import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const cssPath = path.join(root, "src", "FmedUnifiedVisualSystem.css");

if (!fs.existsSync(cssPath)) {
  throw new Error(`FILE NON TROVATO: ${cssPath}`);
}

let css = fs.readFileSync(cssPath, "utf8");

const marker = "SICUREZZA 81/08 - STANDARD COMPATTO DEFINITIVO";
if (!css.includes(marker)) {
  throw new Error("BLOCCO STANDARD SICUREZZA 81/08 NON TROVATO");
}

const replacements = [
  [
    /\.p0-operations--safety \.p0-operations__head\{[^}]*\}/,
    `.p0-operations--safety .p0-operations__head{min-height:112px;padding:20px 24px;border-radius:20px;color:#fff;align-items:center}`
  ],
  [
    /\.p0-operations--safety \.p0-operations__identity span\{[^}]*\}/,
    `.p0-operations--safety .p0-operations__identity span{font-size:9px;letter-spacing:.12em;color:#fff;opacity:.9}`
  ],
  [
    /\.p0-operations--safety \.p0-operations__identity h1\{[^}]*\}/,
    `.p0-operations--safety .p0-operations__identity h1{margin:3px 0 2px;font-size:clamp(29px,2.3vw,38px);color:#fff}`
  ],
  [
    /\.p0-operations--safety \.p0-operations__identity p\{[^}]*\}/,
    `.p0-operations--safety .p0-operations__identity p{max-width:720px;font-size:12px;color:#fff;opacity:.88}`
  ],
  [
    /\.p0-operations--safety \.p0-operations__metric\{[^}]*\}/,
    `.p0-operations--safety .p0-operations__metric{min-width:150px;padding:10px 0 10px 20px;border:0;border-left:1px solid rgba(255,255,255,.34);border-radius:0;background:transparent;backdrop-filter:none;text-align:right}`
  ],
  [
    /\.p0-operations--safety \.p0-operations__metric strong\{[^}]*\}/,
    `.p0-operations--safety .p0-operations__metric strong{font-size:30px;color:#fff;line-height:1}`
  ],
  [
    /\.p0-operations--safety \.p0-operations__metric span\{[^}]*\}/,
    `.p0-operations--safety .p0-operations__metric span{margin-top:4px;font-size:9px;color:#fff;opacity:.9;text-transform:uppercase;letter-spacing:.04em}`
  ],
];

for (const [pattern, replacement] of replacements) {
  if (!pattern.test(css)) {
    throw new Error(`REGOLA NON TROVATA: ${pattern}`);
  }
  css = css.replace(pattern, replacement);
}

const extraRule = `.p0-operations--safety .p0-operations__identity,.p0-operations--safety .p0-operations__identity *,.p0-operations--safety .p0-operations__metric,.p0-operations--safety .p0-operations__metric *{color:#fff}`;

if (!css.includes(extraRule)) {
  const insertAt = css.indexOf(marker);
  const lineEnd = css.indexOf("\n", insertAt);
  css = css.slice(0, lineEnd + 1) + extraRule + "\n" + css.slice(lineEnd + 1);
}

fs.writeFileSync(cssPath, css, "utf8");

const verify = fs.readFileSync(cssPath, "utf8");
const checks = [
  "color:#fff",
  "border-left:1px solid rgba(255,255,255,.34)",
  "background:transparent",
  extraRule,
];

for (const check of checks) {
  if (!verify.includes(check)) {
    throw new Error(`VERIFICA FALLITA: ${check}`);
  }
}

console.log("TESTATA SICUREZZA 81/08 CORRETTA");
console.log("TESTI BIANCHI E KPI INTEGRATO NELLA TESTATA");
console.log("LOGICA, API, DATI E SHAREPOINT INVARIATI");
