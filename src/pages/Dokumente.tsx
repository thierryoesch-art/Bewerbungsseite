//bilder importieren
//pdf importieren
import jahr3zeugnisPDF from '../assets/PDFs/M335_-_LB-Bewertungsraster-1.pdf'
import jahr3zeugnis from '../assets/vite.svg'

type Dokument = {
    titel: string
    kategorie: string
    text: string
    bild: string
    datei: string
}

const kategorien = ['Zeugnisse', 'Lebenslauf', 'Zertifikate']

const dokumente: Dokument[] = [
    {
      titel: 'Zeugnis 3. Lehrjahr',
      kategorie: 'Zeugnisse',
      text: 'Semesterzeugnis der Berufsfachschule',
      bild: jahr3zeugnis,
      datei: jahr3zeugnisPDF,
    },
    {
      titel: 'Zeugnis 2. Lehrjahr',
      kategorie: 'Zeugnisse',
      text: 'Semesterzeugnis der Berufsfachschule',
      bild: jahr3zeugnis,
      datei: jahr3zeugnisPDF,
    },
    {
      titel: 'Lebenslauf',
      kategorie: 'Lebenslauf',
      text: 'Aktueller Lebenslauf mit Ausbildung, Erfahrung und Kontaktdaten.',
      bild: jahr3zeugnis,
      datei: jahr3zeugnisPDF,
    },
    {
      titel: 'Kompetenznachweis ÜK 1',
      kategorie: 'Zertifikate',
      text: 'Überbetrieblicher Kurs, Bewertung und Rückmeldung.',
      bild: jahr3zeugnis,
      datei: jahr3zeugnisPDF,
    },
    {
      titel: 'Kompetenznachweis ÜK 2',
      kategorie: 'Zertifikate',
      text: 'Überbetrieblicher Kurs, Bewertung und Rückmeldung.',
      bild: jahr3zeugnis,
      datei: jahr3zeugnisPDF,
    },
]

function Dokumente() {
    return (
        <main className="wrap seite seite--dokumente">
            <h1>Dokumente</h1>
            <p>Das sind alle wichtigen Dokumente wie Zeugnisse oder Lebenslauf etc. Diese Dokumente sind streng vertraulich. Bitte brechen Sie mein Vertrauen nicht und geben Sie die Dokumente nicht weiter.</p>
            {kategorien.map((k) => {
                const treffer = dokumente.filter((d) => d.kategorie === k)
                if (treffer.length === 0) return null

                return (
                    <section className='doku-gruppe' key={k}>
                        <h2 className='doku-gruppe__titel'>{k}</h2>
                        <ul className='card-grid dokumente'>
                            {treffer.map((d) => (
                                <li key={d.titel}>
                                    <div className='card projekt-karte'>
                                        <img className='projekt-karte__bild' src={d.bild} alt='' />

                                        <div className='projekt-karte__text'>
                                            <h3 className='card__title'>{d.titel}</h3>
                                            <p className='card__text'>{d.text}</p>

                                            <a className='doku-download' href={d.datei} download>
                                                Herunterladen
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                )
            })}
        </main>
    )
}

export default Dokumente
