from pathlib import Path

path = Path('src/pages/InterventiPage.jsx')
text = path.read_text(encoding='utf-8')


def replace_once(old, new, label):
    global text
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'{label}: attesa 1 occorrenza, trovate {count}')
    text = text.replace(old, new, 1)

replace_once(
'''  const isCollaudoIntervento = (row) => String(row?.attivita || "").toUpperCase().includes("COLLAUDO");
  const isStraordinariaIntervento = (row) => String(row?.attivita || "").toUpperCase().includes("MANUTENZIONE STRAORDINARIA");

  const periodicitaCicloIntervento = (row) => {
    if (isCollaudoIntervento(row)) return "UNA_TANTUM";
    return normalizzaPeriodicitaIntervento(row?.periodicita);
  };

  const statoCicloIntervento = (row) => {
    const statoBase = String(row?.stato_ciclo || "").toUpperCase();
    if (isCollaudoIntervento(row) && statoBase === "ATTIVA") return "COMPLETATA";
    if (isStraordinariaIntervento(row) && !row?.data_prossimo_intervento && statoBase === "ATTIVA") return "COMPLETATA";
    return statoBase;
  };
''',
'''  const isCollaudoIntervento = (row) => String(row?.attivita || "").toUpperCase().includes("COLLAUDO");
  const isStraordinariaIntervento = (row) => String(row?.attivita || "").toUpperCase().includes("MANUTENZIONE STRAORDINARIA");
  const isFermoMacchinaIntervento = (row) => String(row?.attivita || "").toUpperCase().includes("FERMO MACCHINA");

  const periodicitaCicloIntervento = (row) => {
    if (isCollaudoIntervento(row) || isStraordinariaIntervento(row) || isFermoMacchinaIntervento(row)) return "UNA_TANTUM";
    return normalizzaPeriodicitaIntervento(row?.periodicita);
  };

  const statoCicloIntervento = (row) => {
    const statoBase = String(row?.stato_ciclo || "").trim().toUpperCase();
    const statiTerminaliReali = ["CESSATA", "ANNULLATA", "CANCELLATA", "FALLITA", "NON_APPLICABILE"];
    if (statiTerminaliReali.includes(statoBase)) return statoBase;
    if (isCollaudoIntervento(row)) return "COMPLETATA";
    if (isFermoMacchinaIntervento(row)) return "COMPLETATA";
    if (isStraordinariaIntervento(row) && (periodicitaCicloIntervento(row) === "UNA_TANTUM" || !row?.data_prossimo_intervento)) return "COMPLETATA";
    return statoBase;
  };
''',
'helper stati ciclo'
)

replace_once(
'''  const badgeCicloIntervento = (row) => {
    const stato = statoCicloIntervento(row);
    const periodicita = periodicitaCicloIntervento(row);
    const periodicitaVisibile = periodicita ? periodicita.replace(/_/g, " ") : "";
    return [stato, periodicitaVisibile].filter(Boolean).join(" · ");
  };

  const prossimoInterventoVisibile = (row) => {
    const periodicita = periodicitaCicloIntervento(row);

    if (periodicita === "UNA_TANTUM") return "-";
''',
'''  const badgeCicloIntervento = (row) => {
    const stato = statoCicloIntervento(row);
    const periodicita = periodicitaCicloIntervento(row);
    const periodicitaVisibile = stato === "ATTIVA" && periodicita ? periodicita.replace(/_/g, " ") : "";
    return [stato, periodicitaVisibile].filter(Boolean).join(" · ");
  };

  const prossimoInterventoVisibile = (row) => {
    const stato = statoCicloIntervento(row);
    const periodicita = periodicitaCicloIntervento(row);

    if (stato !== "ATTIVA") return "-";
    if (periodicita === "UNA_TANTUM") return "-";
''',
'badge e prossimo'
)

path.write_text(text, encoding='utf-8', newline='\n')
print('OK frontend: stati ciclo definitivi')
