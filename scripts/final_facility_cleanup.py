from pathlib import Path

path = Path('src/FmedApp.jsx')
text = path.read_text(encoding='utf-8')


def replace_once(old, new, label):
    global text
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'{label}: attesa 1 occorrenza, trovate {count}')
    text = text.replace(old, new, 1)


replace_once(
'''      listaSocietaInterventi: filtraDizionarioRimosso("societa", listaPulitaDizionario([
      ...valoriDizionarioPrimari(dizionariCoreFmed, "societa", extraSocieta),
      ...interventi.map((i) => normalizzaSocietaDitta(i.societa))]
      )),''',
'''      listaSocietaInterventi: filtraDizionarioRimosso("societa", listaPulitaDizionario([
      ...valoriDizionarioPrimari(dizionariCoreFmed, "societa", extraSocieta),
      ...cespiti.map((c) => c.societa)]
      )),''',
'societa filtro interventi da asset'
)

replace_once(
'''  const listaSediFormInterventi = filtraDizionarioRimosso("sede", deduplicaSediFmed([
  ...valoriDizionarioPrimari(dizionariCoreFmed, "sedi", [...SEDI_STANDARD_LIST, ...extraSedi]),
  ...cespiti.map((c) => c.sede),
  ...interventi.map((i) => i.sede)],
  true));''',
'''  const listaSediFormInterventi = filtraDizionarioRimosso("sede", deduplicaSediFmed([
  ...valoriDizionarioPrimari(dizionariCoreFmed, "sedi", [...SEDI_STANDARD_LIST, ...extraSedi]),
  ...cespiti.map((c) => c.sede)],
  true));''',
'sedi form da master asset'
)

replace_once(
'''  const listaCostruttoriFormInterventi = filtraDizionarioRimosso("costruttore", listaPulitaDizionario([
  ...valoriDizionarioPrimari(dizionariCoreFmed, "costruttori", extraCostruttori),
  ...cespiti.map((c) => c.costruttore),
  ...interventi.map((i) => i.costruttore)]
  ));''',
'''  const listaCostruttoriFormInterventi = filtraDizionarioRimosso("costruttore", listaPulitaDizionario([
  ...valoriDizionarioPrimari(dizionariCoreFmed, "costruttori", extraCostruttori),
  ...cespiti.map((c) => c.costruttore)]
  ));''',
'costruttori form da master asset'
)

replace_once(
'''  const listaModelliFormInterventi = filtraDizionarioRimosso("modello", listaPulitaDizionario([
  ...valoriDizionarioPrimari(dizionariCoreFmed, "modelli", extraModelli),
  ...cespiti.map((c) => c.modello),
  ...interventi.map((i) => i.modello)]
  ));''',
'''  const listaModelliFormInterventi = filtraDizionarioRimosso("modello", listaPulitaDizionario([
  ...valoriDizionarioPrimari(dizionariCoreFmed, "modelli", extraModelli),
  ...cespiti.map((c) => c.modello)]
  ));''',
'modelli form da master asset'
)

replace_once(
'''  const listaSocietaFormInterventi = useMemo(() => filtraDizionarioRimosso("societa", listaPulitaDizionario([
  ...valoriDizionarioPrimari(dizionariCoreFmed, "societa", extraSocieta),
  ...cespiti.map((c) => c.societa),
  ...interventi.map((i) => normalizzaSocietaDitta(i.societa))]
  )), [cespiti, interventi, dizionariCoreFmed, extraSocieta, filtraDizionarioRimosso]);''',
'''  const listaSocietaFormInterventi = useMemo(() => filtraDizionarioRimosso("societa", listaPulitaDizionario([
  ...valoriDizionarioPrimari(dizionariCoreFmed, "societa", extraSocieta),
  ...cespiti.map((c) => c.societa)]
  )), [cespiti, dizionariCoreFmed, extraSocieta, filtraDizionarioRimosso]);''',
'societa form da master asset'
)

replace_once(
'''          <SelectField label="Codice strumento" field="codice_strumento" allowQuickAdd={false} options={listaCodiciStrumentoInterventi} formCespite={formNuovoIntervento} setFormCespite={setFormNuovoIntervento} />''',
'''          <SelectField label="Codice strumento" field="codice_strumento" allowQuickAdd={false} disabled hint="Seleziona il cespite dal selettore sopra: la relazione non si riscrive nel form." options={listaCodiciStrumentoInterventi} formCespite={formNuovoIntervento} setFormCespite={setFormNuovoIntervento} />''',
'codice nuovo intervento governato dal picker'
)

path.write_text(text, encoding='utf-8', newline='\n')
print('OK - liste anagrafiche Facility governate da Master Data + Asset')
