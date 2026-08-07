from pathlib import Path

path = Path('src/pages/InterventiPage.jsx')
text = path.read_text(encoding='utf-8')
old = '{row._eccezione_collaudo && <span className="p0-tag" style={{ marginTop: "5px" }}>Collaudo conservato</span>}'
new = '{row._eccezione_collaudo && isCollaudoIntervento(row) && <span className="p0-tag" style={{ marginTop: "5px" }}>Collaudo conservato</span>}'
if text.count(old) != 1:
    raise SystemExit(f'Pattern badge collaudo inatteso: {text.count(old)}')
path.write_text(text.replace(old, new), encoding='utf-8')
print('OK: badge Collaudo conservato protetto dalla attivita autorevole')
