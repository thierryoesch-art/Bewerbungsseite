import { useState } from 'react' 
import { useRef } from 'react' 
import bildbewerbunsseite from '../assets/Bewerbungsseite.png'

type Projekt = {
  titel: string
  kurz: string
  text: string 
  tags: string[]
  github?:string
  bild?:string

}

const projekte: Projekt[] = [
  {
    titel: "Bewerbungsseite",
    kurz: "Diese Seite hier",
    text: "Längere Beschreibung zum Projekt für detail sei",
    tags: ['React', 'TypeScript', 'CSS'],
    github: "https://github.com/thierryoesch-art/Bewerbungsseite",
    bild: bildbewerbunsseite
  },
]

const alleTags = [...new Set(projekte.flatMap((p) => p.tags))]


function Projekte() {

  const [suche, setSuche] = useState('')
  const [aktiveTags, setAktiveTags] = useState<string[]>([])
  const [offen, setOffen] = useState<Projekt | null>(null)

  const dialogRef = useRef<HTMLDialogElement>(null)

  const gefiltert = projekte.filter((p) => {
    const passtZumTag = aktiveTags.length === 0 || aktiveTags.some((t) => p.tags.includes(t))
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
      <main className="wrap">
        <h1>Projekte</h1>
        <p>Das sind meine Projekte</p>
          <label className="suche">
            <span className="suche__label">Projekte suchen</span>
            <input
              type="search"
              value={suche}
              onChange={(e) => setSuche(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur() }}
              placeholder="z.B. React"
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

      <ul className='projekte card-grid'>
        {gefiltert.map((p) => (
          <li key={p.titel}>
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

      <dialog
        ref={dialogRef}
        className="projekt-dialog"
        onClose={() => setOffen(null)}
      >
        {offen && (
          <div className="dialog__inhalt">



            <img className="dialog__bild" src={offen.bild} alt="" />

            <div className="dialog__text">
              <h2>{offen.titel}</h2>
              <p>{offen.text}</p>

              <ul className="tags">
                {offen.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>

              <div className="dialog__aktionen">
                <a className="dialog__github" href={offen.github} target="_blank" rel="noreferrer">
                  Auf GitHub ansehen
                </a>
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

