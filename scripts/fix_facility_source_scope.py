from pathlib import Path

path = Path('src/FmedApp.jsx')
text = path.read_text(encoding='utf-8')


def replace_all_exact(old, new, expected, label):
    global text
    count = text.count(old)
    if count != expected:
        raise SystemExit(f'{label}: attese {expected} occorrenze, trovate {count}')
    text = text.replace(old, new)

# La fonte Asset deve restare editabile: rimuove il blocco solo dai form Asset.
asset_fields = [
    ('Tipologia', 'tipologia', 'listaTipologie'),
    ('Costruttore', 'costruttore', 'listaCostruttoriFormInterventi'),
    ('Modello', 'modello', 'listaModelliFormInterventi'),
    ('Reparto', 'reparto', 'listaRepartiFormInterventi'),
]
for label, field, options in asset_fields:
    old = f'<SelectField label="{label}" field="{field}" disabled hint="Dato anagrafico del cespite: si modifica dalla scheda Asset." options={{{options}}} formCespite={{formNuovoCespite}} setFormCespite={{setFormNuovoCespite}} />'
    new = f'<SelectField label="{label}" field="{field}" options={{{options}}} formCespite={{formNuovoCespite}} setFormCespite={{setFormNuovoCespite}} />'
    replace_all_exact(old, new, 1, f'nuovo asset {field}')

old = '<SelectField label="Locazione" field="locazione" disabled hint="Dato anagrafico del cespite: si modifica dalla scheda Asset." options={listaLocazioniNuovoCespite} formCespite={formNuovoCespite} setFormCespite={setFormNuovoCespite} />'
new = '<SelectField label="Locazione" field="locazione" options={listaLocazioniNuovoCespite} formCespite={formNuovoCespite} setFormCespite={setFormNuovoCespite} />'
replace_all_exact(old, new, 1, 'nuovo asset locazione')

edit_fields = [
    ('Tipologia', 'tipologia', 'listaTipologie'),
    ('Costruttore', 'costruttore', 'listaCostruttoriFormInterventi'),
    ('Modello', 'modello', 'listaModelliFormInterventi'),
    ('Locazione', 'locazione', 'listaLocazioni'),
    ('Sede', 'sede', 'listaSediFormInterventi'),
    ('Reparto', 'reparto', 'listaRepartiFormInterventi'),
]
for label, field, options in edit_fields:
    old = f'<SelectField label="{label}" field="{field}" disabled hint="Dato anagrafico del cespite: si modifica dalla scheda Asset." options={{{options}}} formCespite={{formCespite}} setFormCespite={{setFormCespite}} />'
    new = f'<SelectField label="{label}" field="{field}" options={{{options}}} formCespite={{formCespite}} setFormCespite={{setFormCespite}} />'
    replace_all_exact(old, new, 1, f'modifica asset {field}')

# Dizionario corretto: la tipologia mostrata negli Interventi è la tipologia del cespite.
replace_all_exact(
    '...valoriDizionarioPrimari(dizionariCoreFmed, "tipologie", extraTipologie),',
    '...valoriDizionarioPrimari(dizionariCoreFmed, "tipologie_asset", extraTipologie),',
    2,
    'dizionario tipologie asset nei contesti interventi'
)

# Il resolver non deve dipendere da un helper dichiarato più avanti nel componente.
replace_all_exact(
    '      branca_medica: getBrancaAsset(cespiteCorrente) || record?.branca_medica || record?.branca || "",',
    '      branca_medica: cespiteCorrente?.branca_medica || cespiteCorrente?.branca || record?.branca_medica || record?.branca || "",',
    1,
    'resolver branca corrente'
)
replace_all_exact(
    '  }, [cespitiByCodice, getBrancaAsset]);',
    '  }, [cespitiByCodice]);',
    1,
    'dipendenze resolver asset'
)

# Testo coerente: i dati anagrafici non si correggono dentro l'intervento.
replace_all_exact(
    'I dati del cespite possono essere corretti senza modificare la sua anagrafica.',
    'I dati anagrafici del cespite si modificano esclusivamente dalla scheda Asset.',
    1,
    'messaggio nuovo intervento'
)

path.write_text(text, encoding='utf-8', newline='\n')
print('OK - perimetro Facility corretto: Asset editabile, moduli operativi in sola lettura anagrafica')
