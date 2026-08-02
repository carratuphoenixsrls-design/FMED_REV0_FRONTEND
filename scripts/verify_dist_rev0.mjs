import fs from "node:fs";
import path from "node:path";

const dist = path.join(process.cwd(), "dist");
const index = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const assets = fs.readdirSync(path.join(dist, "assets"));
const css = assets.filter((name) => name.endsWith(".css"));

if (!index.includes("<title>FMED REV0</title>")) {
  throw new Error("La build non espone il titolo FMED REV0");
}
if (css.length !== 1) {
  throw new Error(`Bundle CSS attesi: 1; trovati: ${css.length}`);
}
console.log(`FMED REV0 dist verificata · bundle CSS unico: ${css[0]}`);
