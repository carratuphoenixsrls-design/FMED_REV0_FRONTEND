import { useCallback, useEffect, useRef, useState } from "react";

const SCENE_DURATION = 10_000;

const SCENES = [
  {
    name: "Cos’è",
    kicker: "COS’È F.M.E.D.",
    title: <>La memoria tecnica<br />dell’organizzazione.</>,
    description: "F.M.E.D. riunisce in un unico ambiente l’identità dei beni, i luoghi, gli interventi, le scadenze, la sicurezza e i documenti. Ogni informazione conserva origine e contesto, formando una memoria tecnica condivisa e sempre consultabile.",
    visual: "identity",
  },
  {
    name: "Come funziona",
    kicker: "COME FUNZIONA",
    title: <>Dal dato<br />alla decisione.</>,
    description: "Le informazioni nate dal lavoro quotidiano vengono raccolte, uniformate e collegate senza deduzioni arbitrarie. Asset, persone, luoghi e attività utilizzano così la stessa base affidabile, trasformando i dati in controlli e decisioni tracciabili.",
    visual: "method",
  },
  {
    name: "Obiettivi",
    kicker: "OBIETTIVI FINALI",
    title: <>Più controllo.<br />Meno dispersione.</>,
    description: "L’obiettivo non è accumulare dati, ma rendere il patrimonio tecnico governabile: ridurre dispersioni ed errori, anticipare le necessità, tutelare la continuità operativa e conservare nel tempo la conoscenza dell’organizzazione.",
    visual: "goals",
  },
];

function SceneVisual({ type }) {
  if (type === "identity") {
    return <div className="fmed-intro-visual fmed-intro-map">
      <div className="fmed-intro-core"><strong>F.M.E.D.</strong><small>Una sola conoscenza</small></div>
      <article style={{ "--tone": "#5b9cff" }}><b>Asset</b><span>Identità e documenti</span></article>
      <article style={{ "--tone": "#f2a33b" }}><b>Interventi</b><span>Attività e manutenzioni</span></article>
      <article style={{ "--tone": "#a77cf3" }}><b>Infrastrutture</b><span>Luoghi e impianti</span></article>
      <article style={{ "--tone": "#4bb4ce" }}><b>Processi</b><span>Regole e responsabilità</span></article>
    </div>;
  }
  if (type === "method") {
    return <div className="fmed-intro-visual fmed-intro-method">
      {[
        ["Raccoglie", "Dati, documenti e attività"],
        ["Normalizza", "Un linguaggio tecnico unico"],
        ["Collega", "Beni, luoghi, persone e processi"],
        ["Controlla", "Scadenze, interventi e conformità"],
        ["Guida", "Decisioni chiare e tracciabili"],
      ].map(([title, copy], index) => <article key={title}>
        <b>{String(index + 1).padStart(2, "0")}</b>
        <div><strong>{title}</strong><span>{copy}</span></div>
      </article>)}
    </div>;
  }
  return <div className="fmed-intro-visual fmed-intro-goals">
    <article style={{ "--tone": "#5b9cff" }}><b>Continuità</b><span>Informazioni, documenti e storico restano disponibili anche quando cambiano persone, sedi o responsabilità.</span></article>
    <article style={{ "--tone": "#20b69f" }}><b>Sicurezza</b><span>Scadenze, attività e responsabilità diventano visibili, verificabili e coerenti con il lavoro reale.</span></article>
    <article style={{ "--tone": "#9a62ef" }}><b>Prevenzione</b><span>Segnali e necessità emergono in anticipo, consentendo di intervenire prima che diventino criticità.</span></article>
    <article style={{ "--tone": "#f0a13c" }}><b>Consapevolezza</b><span>Ogni decisione tecnica dispone di dati, relazioni e storico necessari per essere compresa e motivata.</span></article>
  </div>;
}

export default function FmedIdentityPage({ onEnter }) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [runKey, setRunKey] = useState(0);
  const timerRef = useRef(null);

  const showScene = useCallback((nextIndex, autoPlay = true) => {
    window.clearTimeout(timerRef.current);
    const bounded = Math.max(0, Math.min(nextIndex, SCENES.length - 1));
    setSceneIndex(bounded);
    setRunKey((value) => value + 1);
    setPlaying(autoPlay && bounded < SCENES.length - 1);
  }, []);

  useEffect(() => {
    window.clearTimeout(timerRef.current);
    if (!playing) return undefined;
    timerRef.current = window.setTimeout(() => showScene(sceneIndex + 1, true), SCENE_DURATION);
    return () => window.clearTimeout(timerRef.current);
  }, [playing, runKey, sceneIndex, showScene]);

  const restart = () => showScene(0, true);
  const scene = SCENES[sceneIndex];

  return <main className="fmed-intro-page" aria-label="Presentazione F.M.E.D.">
    <article className="fmed-intro">
      <header className="fmed-intro-brand">
        <strong>F.M.E.D.</strong>
        <span>Facility Management Engineering Database</span>
        <div className="fmed-intro-index">
          <b>{String(sceneIndex + 1).padStart(2, "0")}</b>
          <small>{scene.name}</small>
          <div className="fmed-intro-playback">
            <button type="button" className={playing ? "is-active" : ""} onClick={() => setPlaying(true)} aria-label="Avvia presentazione">▶ Play</button>
            <button type="button" className={!playing && sceneIndex < SCENES.length - 1 ? "is-active" : ""} onClick={() => setPlaying(false)} aria-label="Metti in pausa">Ⅱ Pausa</button>
            <button type="button" onClick={restart} aria-label="Ripeti presentazione">↻ Ripeti</button>
          </div>
        </div>
      </header>

      <section className="fmed-intro-scene" key={`${scene.visual}-${runKey}`}>
        <div className="fmed-intro-copy">
          <span>{scene.kicker}</span>
          <h1>{scene.title}</h1>
          <p>{scene.description}</p>
        </div>
        <SceneVisual type={scene.visual} />
      </section>

      <footer className="fmed-intro-controls">
        <div className="fmed-intro-dots" aria-label="Seleziona una scena">
          {SCENES.map((item, index) => <button
            type="button"
            key={item.name}
            className={index === sceneIndex ? "is-active" : ""}
            onClick={() => showScene(index, index < SCENES.length - 1)}
            aria-label={item.name}
          />)}
        </div>
        <div className="fmed-intro-progress"><i className={playing ? "is-running" : ""} key={runKey} /></div>
        <button type="button" className="fmed-intro-enter" onClick={onEnter}>Entra nel sistema <b>→</b></button>
        <small className="fmed-intro-origin">Fabio · Micaela · Emma · Dina</small>
      </footer>
    </article>
  </main>;
}
