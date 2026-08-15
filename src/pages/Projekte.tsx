import { useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { medien } from '../lib/medien'

// Bilder und Videos kommen ueber medien('dateiname') aus src/assets/.
// Eine neue Datei dort hinlegen genuegt — es braucht keine import-Zeile mehr.

type Projekt = {
  titel: string
  kurz: string
  text: string
  tags: string[]
  github?:string
  bild?:string
  video?:string

}

const projekte: Projekt[] = [
  {
    titel: "Bewerbungsseite",
    kurz: "Aktuelle Seite",
    text: "Eine Webseite, die ich für meine Bewerbung für ein Praktikum gemacht habe. Sie ist mit React, TypeScript und CSS umgesetzt. Sie beinhaltet nützliche Informationen über mich und darüber, was ich gemacht habe.",
    tags: ['React', 'TypeScript', 'CSS'],
    github: "https://github.com/thierryoesch-art/Bewerbungsseite",
    bild: medien('Bewerbungsseite.png')
  },
  {
    titel: "Meine erste Website",
    kurz: "Die allererste Website",
    text: "Das ist meine allererste Website, die ich je gemacht habe. Sie ist im ersten Semester an der IMS entstanden und komplett mit HTML und CSS umgesetzt, mit ein wenig JavaScript. Für diese Seite habe ich die Note 5.5 bekommen.",
    tags: ['HTML', 'CSS'],
    github: "http://116.203.218.177/oesch/",
    bild: medien('erstewebseite.png')
  },
  {
    titel: "Boing!",
    kurz: "Mein C#-Game",
    text: "Wir haben im 2. Semester den Auftrag bekommen, ein kleines Spiel mit C# zu machen. Ich habe mich für Boing! entschieden. Es ist ein kleines Plattformer-Spiel, inspiriert von Doodle Jump. Ich muss sagen, dass es nicht mein bestes Projekt ist.",
    tags: ['C#', 'WinForms'],
    github: "https://github.com/thierryoesch-art/Boing-", 
    bild: medien('Boing!.png')
  },
  {
    titel: "Minecraft Server",
    kurz: "Ein Multiplayer-MC-Server auf meinem Raspy",
    text: "Ich hoste bei mir zu Hause einen eigenen Minecraft-Server für bis zu 20 Spieler. Er läuft auf einem Raspberry Pi 5 und ich habe ihn mit NeoForge aufgesetzt.",
    tags: ['Raspberry Pi', 'Gaming', 'Hardware'],
    bild: medien('MC.jpg')
  },
  {
    titel: "Terraria Server",
    kurz: "Ein Multiplayer-Terraria-Server auf meinem Raspy",
    text: "Ich hoste bei mir zu Hause einen eigenen Terraria-Server für bis zu 8 Spieler. Er läuft auf einem Raspberry Pi 5 und ich habe ihn mit TShock (einem Community-Tool zum Hosten von Servern) aufgesetzt.",
    tags: ['Raspberry Pi', 'Gaming', 'Hardware'],
    bild: medien('raspy.jpg')
  },
  {
    titel: "Website vom Unterricht",
    kurz: "Webseiten, die wir im Unterricht gemacht haben.",
    text: "Wir haben an der gibb das Modul 293 «Webauftritt erstellen und veröffentlichen» absolviert. Dabei haben wir drei Übungsseiten gemacht, die wir dann auch auf dem Schulserver veröffentlicht haben.",
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: "https://inf-293-24f-m293user11.iet-gibb.net/indexTeil1.html",
    bild: medien('websites.jpg')
  },
  {
    titel: "HealthClock",
    kurz: "Eine eigene Smartwatch selbst bauen",
    text: "In einer Projektwoche haben zwei Kollegen und ich uns entschieden, eine Smartwatch von Grund auf selbst zu bauen. Dafür haben wir einen Arduino verwendet. Die Uhr ist mit C++ programmiert und verwendet verschiedene Sensoren, um die Gesundheitsdaten zu messen. Die werden dann auf der Uhr selbst zurückgegeben und auf einer Webseite als Graph, wie man auf der Vidoe sieht. Bei diesem Teil habe ich aber nicht mitgeholfen, deswegen habe ich auch kein C++-Tag gesetzt.",
    tags: ['Hardware', 'Arduino'],
    bild: medien('healthclock.jpg'),
    video: medien('healthclockvid.mp4')
  },
  {
    titel: "B.O.L.T",
    kurz: "Break old Limits Today",
    text: "B.O.L.T ist eine App, die wir in einem üK umgesetzt haben. Mit ihr kann man eine Distanz einmessen, entweder indem man sie abläuft oder indem man sie vorher erstellt. Diese Strecke kann man dann absprinten. Dafür bekommt man Level, die einen motivieren sollen. Die Mobile-App haben wir mit Flutter gemacht.",
    tags: ['Flutter', 'Mobile'],
    bild: medien('bolt.jpg'),
    video: medien('bolt.mp4')
  },
  
]

const alleTags = [...new Set(projekte.flatMap((p) => p.tags))]


function Projekte() {

  const [suche, setSuche] = useState('')
  const [aktiveTags, setAktiveTags] = useState<string[]>([])
  const [offen, setOffen] = useState<Projekt | null>(null)

  const dialogRef = useRef<HTMLDialogElement>(null)

  const gefiltert = projekte.filter((p) => {
    // every statt some: bei mehreren Tags müssen alle zutreffen
    const passtZumTag = aktiveTags.every((t) => p.tags.includes(t))
    const passtZurSuche = p.titel.toLowerCase().includes(suche.toLowerCase())
    return passtZumTag && passtZurSuche
  })

  function oeffnen(p: Projekt) {
    setOffen(p)
    dialogRef.current?.showModal()
  }

  function tagUmschalten(t: string) {
    setAktiveTags((alt) => alt.includes(t) ? alt.filter((x) => x !== t) : [...alt, t]
    )
  }

  return (
      <main className="wrap seite seite--projekte">
        <h1>Projekte</h1>
        <p>Das sind meine Projekte.</p>
          <label className="suche">
            <span className="suche__label">Projekte suchen</span>
            <input
              type="search"
              value={suche}
              onChange={(e) => setSuche(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur() }}
              placeholder="z. B. Boing!"
            />
          </label>

          <div className="filter">
            <button
              className={aktiveTags.length === 0 ? 'filter__btn filter__btn--aktiv' : 'filter__btn'}
              onClick={() => setAktiveTags([])}
              aria-pressed={aktiveTags.length === 0}
            >
              Alle
            </button>

            {alleTags.map((t) => (
              <button
                key={t}
                className={aktiveTags.includes(t) ? 'filter__btn filter__btn--aktiv' : 'filter__btn'}
                onClick={() => tagUmschalten(t)}
                aria-pressed={aktiveTags.includes(t)}
              >
                {t}
              </button>
            ))}
          </div>

      {gefiltert.length === 0 ? (
        <p className='leer-hinweis' role='status'>
          Nichts gefunden. Zu dieser Kombination gibt es kein Projekt — probieren Sie
          weniger Filter oder einen anderen Suchbegriff.
        </p>
      ) : (
        /* key erzwingt ein Neuaufbauen der Liste, damit die Einblend-Animation
           bei jedem Filterwechsel neu läuft. Bewusst ohne die Suche — sonst
           würde sie bei jedem getippten Buchstaben neu starten. */
        <ul className='projekte card-grid' key={aktiveTags.join('|')}>
          {gefiltert.map((p, i) => (
            <li key={p.titel} style={{ '--i': i } as CSSProperties}>
              <button className='card card--klick projekt-karte' onClick={() => oeffnen(p)} >
                <img className='projekt-karte__bild' src={p.bild} alt='' />
                <div className='projekt-karte__text'>
                  <h3 className="card__title">{p.titel}</h3>
                  <p className='card__text'>{p.kurz}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialogRef}
        className="projekt-dialog"
        onClose={() => setOffen(null)}
      >
        {offen && (
          <div className="dialog__inhalt">



            {offen.video ? (
              <video
                className="dialog__video"
                src={offen.video}
                poster={offen.bild}
                controls
                preload="metadata"
                playsInline
              >
                Ihr Browser kann dieses Video nicht abspielen.
              </video>
            ) : (
              <img className="dialog__bild" src={offen.bild} alt="" />
            )}

            <div className="dialog__text">
              <h2>{offen.titel}</h2>
              <p>{offen.text}</p>

              <ul className="tags">
                {offen.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>

              <div className="dialog__aktionen">
                {offen.github && (
                  <a className="dialog__github" href={offen.github} target="_blank" rel="noreferrer">
                    Projekt ansehen
                  </a>
                )}
                <button className="dialog__close" onClick={() => dialogRef.current?.close()}>
                  Schliessen
                </button>
              </div>
            </div>

          </div>
        )}
      </dialog>
      </main>
  )
}

export default Projekte

