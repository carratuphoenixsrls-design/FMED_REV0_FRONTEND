from pathlib import Path

path = Path('src/FmedApp.jsx')
text = path.read_text(encoding='utf-8')


def replace_once(old, new, label):
    global text
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'{label}: attesa 1 occorrenza, trovate {count}')
    text = text.replace(old, new, 1)


def replace_after(marker, old, new, label):
    global text
    pos = text.find(marker)
    if pos < 0:
        raise SystemExit(f'{label}: marker non trovato')
    idx = text.find(old, pos)
    if idx < 0:
        raise SystemExit(f'{label}: testo non trovato dopo marker')
    text = text[:idx] + new + text[idx + len(old):]


old_index = '''  const cespitiByCodice = useMemo(() => {
    const indice = new Map();
    (Array.isArray(cespiti) ? cespiti : []).forEach((record) => {
      const codice = String(record?.codicestrumento || record?.codice_strumento || "").trim();
      if (codice) indice.set(codice, record);
    });
    return indice;
  }, [cespiti]);
'''
new_index = '''  const cespitiByCodice = useMemo(() => {
    const indice = new Map();
    (Array.isArray(cespiti) ? cespiti : []).forEach((record) => {
      const codice = String(record?.codicestrumento || record?.codice_strumento || "").trim();
      if (codice) {
        indice.set(codice, record);
        indice.set(codice.toUpperCase(), record);
      }
    });
    return indice;
  }, [cespiti]);

  // REGOLA FACILITY ASSOLUTA: l'anagrafica corrente del bene vive in Asset.
  // Gli altri moduli possono conservare snapshot storici, ma il dato corrente
  // viene sempre risolto tramite il codice strumento.
  const contestoCespiteCorrenteRecord = useCallback((record = {}) => {
    const codice = String(record?.codice_strumento || record?.codicestrumento || record?.entita_chiave || "").trim();
    if (!codice) return record;
    const cespiteCorrente = cespitiByCodice.get(codice) || cespitiByCodice.get(codice.toUpperCase());
    if (!cespiteCorrente) return record;
    return {
      ...record,
      sede_snapshot: record?.sede_snapshot || record?.sede || "",
      tipologia_snapshot: record?.tipologia_snapshot || record?.tipologia || "",
      costruttore_snapshot: record?.costruttore_snapshot || record?.costruttore || "",
      modello_snapshot: record?.modello_snapshot || record?.modello || "",
      matricola_snapshot: record?.matricola_snapshot || record?.matricola || "",
      sede: cespiteCorrente?.sede || record?.sede || "",
      tipologia: cespiteCorrente?.tipologia || record?.tipologia || "",
      costruttore: cespiteCorrente?.costruttore || record?.costruttore || "",
      modello: cespiteCorrente?.modello || record?.modello || "",
      matricola: cespiteCorrente?.matricola || record?.matricola || "",
      reparto: cespiteCorrente?.reparto || record?.reparto || "",
      branca_medica: getBrancaAsset(cespiteCorrente) || record?.branca_medica || record?.branca || "",
      locazione: getLocazioneFmed(cespiteCorrente) || record?.locazione || "",
      societa: cespiteCorrente?.societa || record?.societa || ""
    };
  }, [cespitiByCodice, getBrancaAsset]);

  const interventiConContestoCorrente = useMemo(
    () => (Array.isArray(interventi) ? interventi : []).map(contestoCespiteCorrenteRecord),
    [interventi, contestoCespiteCorrenteRecord]
  );
'''
replace_once(old_index, new_index, 'indice cespiti + resolver')

replace_once(
    '''      ...interventi.map((i) => i.sede)],
      true),''',
    '''      ...cespiti.map((c) => c.sede)],
      true),''',
    'sedi interventi da asset'
)

replace_once(
    '''      listaTipologieFiltroInterventi: listaPulitaDizionario([
      ...valoriDizionarioPrimari(dizionariCoreFmed, "tipologie_intervento", []),
      ...interventi.map((i) => i.tipologia)]
      ),''',
    '''      listaTipologieFiltroInterventi: listaPulitaDizionario([
      ...valoriDizionarioPrimari(dizionariCoreFmed, "tipologie", extraTipologie),
      ...cespiti.map((c) => c.tipologia)]
      ),''',
    'tipologie filtro interventi da asset'
)

replace_once(
    '''  }, [cespiti, interventi, dizionariCoreFmed, extraCategorie, extraPossesso, extraStatiAsset, extraSocieta, extraDitte, extraEsiti, extraPriorita, extraAttivita, filtraDizionarioRimosso]);''',
    '''  }, [cespiti, interventi, dizionariCoreFmed, extraCategorie, extraPossesso, extraStatiAsset, extraSocieta, extraDitte, extraEsiti, extraPriorita, extraAttivita, extraTipologie, filtraDizionarioRimosso]);''',
    'dipendenze dizionari interventi'
)

replace_once(
    '''  const listaTipologieFormInterventi = filtraDizionarioRimosso("tipologia", listaPulitaDizionario([
  ...valoriDizionarioPrimari(dizionariCoreFmed, "tipologie_intervento", extraTipologie),
  ...interventi.map((i) => i.tipologia)]
  ));''',
    '''  const listaTipologieFormInterventi = filtraDizionarioRimosso("tipologia", listaPulitaDizionario([
  ...valoriDizionarioPrimari(dizionariCoreFmed, "tipologie", extraTipologie),
  ...cespiti.map((c) => c.tipologia)]
  ));''',
    'tipologie form interventi da asset'
)

replace_once(
    '''      sede: prev.sede || cespite.sede || "",
      locazione: prev.locazione || cespite.locazione || "",
      branca_medica: prev.branca_medica || cespite.branca_medica || cespite.branca || "",
      tipologia: prev.tipologia || cespite.tipologia || "",
      costruttore: prev.costruttore || cespite.costruttore || "",
      modello: prev.modello || cespite.modello || "",
      reparto: prev.reparto || cespite.reparto || "",
      matricola: prev.matricola || cespite.matricola || "",
      societa: prev.societa || cespite.societa || "",''',
    '''      sede: cespite.sede || prev.sede || "",
      locazione: getLocazioneFmed(cespite) || prev.locazione || "",
      branca_medica: getBrancaAsset(cespite) || prev.branca_medica || "",
      tipologia: cespite.tipologia || prev.tipologia || "",
      costruttore: cespite.costruttore || prev.costruttore || "",
      modello: cespite.modello || prev.modello || "",
      reparto: cespite.reparto || prev.reparto || "",
      matricola: cespite.matricola || prev.matricola || "",
      societa: cespite.societa || prev.societa || "",''',
    'autofill nuovo intervento corrente'
)

replace_once(
    '    setFormModificaIntervento(normalizzaInterventoPerForm(intervento));',
    '    setFormModificaIntervento(normalizzaInterventoPerForm(contestoCespiteCorrenteRecord(intervento)));',
    'form modifica da asset corrente'
)

old_modify_payload = '''    const datiDaSalvare = {
      codice_strumento: formModificaIntervento.codice_strumento || null,
      sede: formModificaIntervento.sede || null,
      // La tipologia appartiene al cespite, non al record intervento.
      // Non va validata/salvata come TIPOLOGIE_INTERVENTO nel PUT.
      tipologia: null,
      attivita: formModificaIntervento.attivita || null,
      costruttore: formModificaIntervento.costruttore || null,
      modello: formModificaIntervento.modello || null,
      reparto: formModificaIntervento.reparto || null,
      matricola: formModificaIntervento.matricola || null,
      societa: formModificaIntervento.societa || null,
      ditta_esecutrice: formModificaIntervento.ditta_esecutrice || null,
      link_documento: formModificaIntervento.link_documento || null,
      descrizione_attivita: formModificaIntervento.descrizione_attivita || null,
      esito: formModificaIntervento.esito || null,
      costo: formModificaIntervento.costo || null,
      data_ultimo_intervento: formModificaIntervento.data_ultimo_intervento || null,
      data_prossimo_intervento: formModificaIntervento.data_prossimo_intervento || null,
      periodicita: formModificaIntervento.periodicita || null,
      importo_extra: formModificaIntervento.importo_extra || null
    };'''
new_modify_payload = '''    const datiDaSalvare = {
      // Il codice identifica la relazione; l'anagrafica del bene resta di proprietà Asset.
      codice_strumento: formModificaIntervento.codice_strumento || null,
      attivita: formModificaIntervento.attivita || null,
      ditta_esecutrice: formModificaIntervento.ditta_esecutrice || null,
      link_documento: formModificaIntervento.link_documento || null,
      descrizione_attivita: formModificaIntervento.descrizione_attivita || null,
      esito: formModificaIntervento.esito || null,
      costo: formModificaIntervento.costo || null,
      data_ultimo_intervento: formModificaIntervento.data_ultimo_intervento || null,
      data_prossimo_intervento: formModificaIntervento.data_prossimo_intervento || null,
      periodicita: formModificaIntervento.periodicita || null,
      importo_extra: formModificaIntervento.importo_extra || null
    };'''
replace_once(old_modify_payload, new_modify_payload, 'payload modifica solo operativo')

replace_after(
    'async function salvaNuovoIntervento()',
    '''    const datiDaSalvare = {
      codice_strumento: codice,
      sede: formNuovoIntervento.sede || null,
      locazione: formNuovoIntervento.locazione || null,
      branca_medica: formNuovoIntervento.branca_medica || null,
      tipologia: null,
      attivita: formNuovoIntervento.attivita || null,
      costruttore: formNuovoIntervento.costruttore || null,
      modello: formNuovoIntervento.modello || null,
      reparto: formNuovoIntervento.reparto || null,
      matricola: formNuovoIntervento.matricola || null,
      societa: formNuovoIntervento.societa || null,''',
    '''    const contestoCespite = contestoCespiteCorrenteRecord({ ...formNuovoIntervento, codice_strumento: codice });
    const datiDaSalvare = {
      codice_strumento: codice,
      // Snapshot di compatibilità coerente con la fonte Asset al momento della registrazione.
      sede: contestoCespite.sede || null,
      locazione: contestoCespite.locazione || null,
      branca_medica: contestoCespite.branca_medica || null,
      tipologia: null,
      attivita: formNuovoIntervento.attivita || null,
      costruttore: contestoCespite.costruttore || null,
      modello: contestoCespite.modello || null,
      reparto: contestoCespite.reparto || null,
      matricola: contestoCespite.matricola || null,
      societa: contestoCespite.societa || null,''',
    'nuovo intervento snapshot da asset'
)

replace_after(
    'const interventiFiltrati = useMemo(() => {',
    '    return interventi.filter((i) => {',
    '    return interventiConContestoCorrente.filter((i) => {',
    'filtri interventi su contesto corrente'
)

replace_once(
    '  }, [paginaRichiedeInterventiPesanti, interventi, filtroInterventiCodice, filtroInterventiSede, filtroInterventiSocieta, filtroInterventiTipologia, filtroInterventiAttivita, filtroInterventiUltimoDa, filtroInterventiUltimoA, filtroInterventiProssimoDa, filtroInterventiProssimoA, filtroInterventiAnnoContabile, filtroInterventiPeriodoContabile, filtroInterventiPeriodoDa, filtroInterventiPeriodoA, ordineInterventi]);',
    '  }, [paginaRichiedeInterventiPesanti, interventiConContestoCorrente, filtroInterventiCodice, filtroInterventiSede, filtroInterventiSocieta, filtroInterventiTipologia, filtroInterventiAttivita, filtroInterventiUltimoDa, filtroInterventiUltimoA, filtroInterventiProssimoDa, filtroInterventiProssimoA, filtroInterventiAnnoContabile, filtroInterventiPeriodoContabile, filtroInterventiPeriodoDa, filtroInterventiPeriodoA, ordineInterventi]);',
    'dipendenze filtri interventi'
)

old_scad = '''    return (Array.isArray(scadenzeFiltrate) ? scadenzeFiltrate : []).map((s) => {
      const data = s._dataScadenza || s.data_prossimo_intervento || s.prossima_scadenza || s.data_scadenza;
      return {
        ...s,
        sede_originale: s.sede_originale || s.sede || "",
        sede: normalizzaSedeDisplay(s.sede || s.sede_originale || ""),
        _dataScadenza: data,
        _statoScadenza: s._statoScadenza || statoScadenza(data)
      };'''
new_scad = '''    return (Array.isArray(scadenzeFiltrate) ? scadenzeFiltrate : []).map((s) => {
      const corrente = String(s?.modulo || "").toUpperCase() === "ASSET"
        ? contestoCespiteCorrenteRecord(s)
        : s;
      const data = corrente._dataScadenza || corrente.data_prossimo_intervento || corrente.prossima_scadenza || corrente.data_scadenza;
      return {
        ...corrente,
        sede_originale: s.sede_originale || s.sede || "",
        sede: normalizzaSedeDisplay(corrente.sede || s.sede_originale || ""),
        _dataScadenza: data,
        _statoScadenza: corrente._statoScadenza || statoScadenza(data)
      };'''
replace_once(old_scad, new_scad, 'scadenze asset da fonte corrente')
replace_once('  }, [scadenzeFiltrate]);', '  }, [scadenzeFiltrate, contestoCespiteCorrenteRecord]);', 'dipendenze scadenze correnti')

replace_after(
    'function getInterventiExportFiltratiBase()',
    '    return interventi.filter((i) =>',
    '    return interventiConContestoCorrente.filter((i) =>',
    'export interventi su contesto corrente'
)

replace_once(
    '''  dictionary = "",
  allowQuickAdd = true
}) {''',
    '''  dictionary = "",
  allowQuickAdd = true,
  disabled = false,
  hint = ""
}) {''',
    'SelectField props source of truth'
)
replace_once(
    '''    allowQuickAdd={allowQuickAdd}

    onChange={(value) => setFormCespite((prev) => ({ ...prev, [field]: value }))} className="fmed-style-edit-field" />;''',
    '''    allowQuickAdd={allowQuickAdd}
    disabled={disabled}
    hint={hint}

    onChange={(value) => setFormCespite((prev) => ({ ...prev, [field]: value }))} className="fmed-style-edit-field" />;''',
    'SelectField forward disabled hint'
)

facility_hint = 'Dato anagrafico del cespite: si modifica dalla scheda Asset.'
for label, field in [
    ('Sede', 'sede'), ('Locazione', 'locazione'), ('Branca', 'branca_medica'),
    ('Tipologia', 'tipologia'), ('Costruttore', 'costruttore'), ('Modello', 'modello'),
    ('Reparto', 'reparto'), ('Società / Committente', 'societa')
]:
    old = f'<SelectField label="{label}" field="{field}"'
    new = f'<SelectField label="{label}" field="{field}" disabled hint="{facility_hint}"'
    if old in text:
        text = text.replace(old, new)

replace_after(
    '{modificaInterventoOpen &&',
    '<SelectField label="Codice strumento" field="codice_strumento" allowQuickAdd={false}',
    '<SelectField label="Codice strumento" field="codice_strumento" allowQuickAdd={false} disabled hint="Relazione al cespite: non si modifica dal registro interventi."',
    'codice intervento non riassegnabile'
)

replace_after(
    '{nuovoInterventoOpen &&',
    '<input value={formNuovoIntervento.matricola || ""} onChange={(e) => setFormNuovoIntervento({',
    '<input readOnly title="Dato anagrafico del cespite: si modifica dalla scheda Asset." value={formNuovoIntervento.matricola || ""} onChange={(e) => setFormNuovoIntervento({',
    'matricola nuovo sola lettura'
)
replace_after(
    '{modificaInterventoOpen &&',
    '<input value={formModificaIntervento.matricola || ""} onChange={(e) => setFormModificaIntervento({',
    '<input readOnly title="Dato anagrafico del cespite: si modifica dalla scheda Asset." value={formModificaIntervento.matricola || ""} onChange={(e) => setFormModificaIntervento({',
    'matricola modifica sola lettura'
)

replace_after(
    '<InterventiPage {...{',
    '          interventi,',
    '          interventi: interventiConContestoCorrente,',
    'prop interventi corrente'
)

path.write_text(text, encoding='utf-8', newline='\n')
print('OK - regola Facility fonte unica applicata')
