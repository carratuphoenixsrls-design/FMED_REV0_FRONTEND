import { useCallback, useEffect, useRef, useState } from "react";
import FmedIcon from "./components/ui/FmedIcon.jsx";

const MOVER_URL = String(import.meta.env?.VITE_MARILAB_MOVER_URL || "https://marilab-mover.vercel.app").trim();

const MODULES = [
  { key: "Asset", icon: "box", title: "Asset e cespiti", text: "Censisce apparecchiature e beni tecnici, conserva anagrafica, documenti, QR, stato e storico completo." },
  { key: "Interventi", icon: "activity", title: "Interventi", text: "Registra manutenzioni, guasti, esiti, costi, ditte e prossime scadenze sul singolo cespite." },
  { key: "Scadenze", icon: "calendar", title: "Scadenze", text: "Mostra ciò che è scaduto, imminente o da pianificare e mantiene un solo ciclo operativo corrente." },
  { key: "Infrastrutture", icon: "building", title: "Infrastrutture", text: "Governa impianti, verifiche, manutenzioni, verbali e documentazione tecnica delle sedi." },
  { key: "Sicurezza 81/08", icon: "shield", title: "Sicurezza 81/08", text: "Raccoglie adempimenti, verifiche, registri e scadenze previste dalla sicurezza sul lavoro." },
  { key: "Processi", icon: "workflow", title: "Processi guidati", text: "Spiega quando usare ogni procedura e governa responsabilità, SLA, evidenze, approvazioni e risultato finale." },
  { key: "Dizionari", icon: "book", title: "Cataloghi governati", text: "Uniforma i valori Supabase, conserva gli alias storici e impedisce che nuove voci diverse sporchino nuovamente i dati." },
  { key: "Gestione Utenti", icon: "settings", title: "Controllo e strumenti", text: "Unisce report, SharePoint, costi, utenti, audit e impostazioni avanzate del sistema." },
];

const FLOW = ["Patrimonio tecnico", "Attività", "Scadenze", "Controllo", "Prevenzione", "Decisioni"];

function createPresentationAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  const context = new AudioContextClass();
  const master = context.createGain();
  master.gain.setValueAtTime(0.0001, context.currentTime);
  master.gain.exponentialRampToValueAtTime(0.055, context.currentTime + 1.2);
  master.gain.setValueAtTime(0.055, context.currentTime + 19);
  master.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 24);
  master.connect(context.destination);

  const nodes = [];
  const now = context.currentTime;
  [261.63, 329.63, 392].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, now + index * 0.18);
    gain.gain.setValueAtTime(0.0001, now + index * 0.18);
    gain.gain.exponentialRampToValueAtTime(0.11, now + index * 0.18 + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.18 + 0.7);
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(now + index * 0.18);
    oscillator.stop(now + index * 0.18 + 0.76);
    nodes.push(oscillator, gain);
  });

  [130.81, 164.81, 196].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = index === 1 ? "triangle" : "sine";
    oscillator.frequency.value = frequency;
    gain.gain.value = index === 1 ? 0.018 : 0.024;
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(now + 0.5);
    oscillator.stop(now + 24.2);
    nodes.push(oscillator, gain);
  });

  const timer = window.setTimeout(() => {
    context.close().catch(() => {});
  }, 25200);

  return {
    stop() {
      window.clearTimeout(timer);
      try {
        master.gain.cancelScheduledValues(context.currentTime);
        master.gain.setTargetAtTime(0.0001, context.currentTime, 0.08);
      } catch {
        // Audio già terminato.
      }
      window.setTimeout(() => context.close().catch(() => {}), 350);
    },
  };
}

export default function MissionPage({ onNavigate }) {
  const [playing, setPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [runId, setRunId] = useState(0);
  const audioRef = useRef(null);
  const stopTimerRef = useRef(null);

  const stopAudio = useCallback(() => {
    if (audioRef.current) audioRef.current.stop();
    audioRef.current = null;
    if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current);
    stopTimerRef.current = null;
  }, []);

  const startPresentation = useCallback(() => {
    stopAudio();
    setRunId(value => value + 1);
    setPlaying(true);
    if (audioEnabled) audioRef.current = createPresentationAudio();
    stopTimerRef.current = window.setTimeout(() => {
      setPlaying(false);
      stopAudio();
    }, 25000);
  }, [audioEnabled, stopAudio]);

  useEffect(() => () => stopAudio(), [stopAudio]);

  useEffect(() => {
    if (!audioEnabled) stopAudio();
  }, [audioEnabled, stopAudio]);

  return <section className={`fmed-mission-page ${playing ? "is-playing" : ""}`} key={runId}>
    <div className="fmed-mission-aurora" aria-hidden="true"><i /><i /><i /></div>

    <header className="fmed-mission-hero">
      <div className="fmed-mission-copy">
        <span className="fmed-mission-eyebrow">FMED ENTERPRISE 1.0 · SCOPO E MISSIONE</span>
        <h1>Un solo sistema per conoscere, governare e proteggere il patrimonio tecnico.</h1>
        <p>FMED trasforma inventario, manutenzioni, impianti, sicurezza, documenti e scadenze in un flusso operativo leggibile. Ogni dato porta a un’azione, ogni azione resta tracciata.</p>
        <div className="fmed-mission-actions">
          <button type="button" className="is-primary" onClick={startPresentation}><FmedIcon name="play" />{playing ? "Riavvia presentazione" : "Avvia presentazione FMED"}</button>
          <button type="button" className="is-audio" onClick={() => setAudioEnabled(value => !value)} aria-pressed={audioEnabled}><FmedIcon name="volume" />{audioEnabled ? "Audio attivo" : "Audio disattivato"}</button>
        </div>
        <small>L’audio parte solo dopo il clic e si interrompe automaticamente lasciando la pagina.</small>
      </div>

      <div className="fmed-mission-core" aria-label="Motore centrale FMED">
        <div className="fmed-mission-orbit orbit-one" />
        <div className="fmed-mission-orbit orbit-two" />
        <div className="fmed-mission-core-mark"><span>F</span><strong>FMED</strong><small>Facility Management</small></div>
        <div className="fmed-mission-signal signal-one" />
        <div className="fmed-mission-signal signal-two" />
      </div>
    </header>

    <section className="fmed-mission-flow" aria-label="Flusso operativo FMED">
      {FLOW.map((label, index) => <div className="fmed-mission-flow-step" style={{ "--delay": `${index * 0.75}s` }} key={label}>
        <span>{index + 1}</span><strong>{label}</strong>{index < FLOW.length - 1 && <i aria-hidden="true">→</i>}
      </div>)}
    </section>

    <section className="fmed-mission-section">
      <div className="fmed-mission-section-head"><span>Cosa fa il sistema</span><h2>Dalla scheda tecnica alla decisione operativa</h2><p>I moduli sono collegati: la modifica di un asset, la chiusura di un intervento o una nuova verifica aggiornano storico, cicli, scadenze e controllo.</p></div>
      <div className="fmed-mission-module-grid">
        {MODULES.map((module, index) => <article className="fmed-mission-module" style={{ "--delay": `${0.3 + index * 0.16}s` }} key={module.title}>
          <span className="fmed-mission-module-icon"><FmedIcon name={module.icon} /></span>
          <div><h3>{module.title}</h3><p>{module.text}</p></div>
          <button type="button" onClick={() => onNavigate?.(module.key)}>Apri modulo</button>
        </article>)}
      </div>
    </section>

    <section className="fmed-mission-value-grid">
      <article><span>01</span><h3>Controllo</h3><p>Una fotografia aggiornata di beni, attività, criticità e obblighi.</p></article>
      <article><span>02</span><h3>Continuità</h3><p>Scadenze e manutenzioni diventano pianificabili prima che si trasformino in fermi.</p></article>
      <article><span>03</span><h3>Tracciabilità</h3><p>Responsabilità, documenti, esiti e modifiche restano nello storico verificabile.</p></article>
      <article><span>04</span><h3>Qualità del dato</h3><p>Cataloghi uniformi, valori canonici e alias storici rendono affidabili filtri, scadenze, report e nuovi inserimenti.</p></article>
    </section>

    <section className="fmed-mission-ecosystem">
      <div className="fmed-mission-ecosystem-copy"><span>Ecosistema digitale Marilab</span><h2>FMED governa la tecnica. Marilab Mover muove l’operatività tra le sedi.</h2><p>I due applicativi restano separati e sicuri. Da FMED puoi aprire Mover per controllare notifiche, ritiri e consegne senza chiudere il gestionale tecnico.</p></div>
      <a className="fmed-mission-mover-card" href={MOVER_URL} target="_blank" rel="noreferrer">
        <span className="fmed-mission-mover-icon" aria-hidden="true"><FmedIcon name="truck" size={28} /></span>
        <div><strong>Marilab Mover</strong><span>Giri, ritiri e consegne interne</span><small>Apri e controlla le notifiche ↗</small></div>
        <i aria-hidden="true" />
      </a>
    </section>
  </section>;
}
