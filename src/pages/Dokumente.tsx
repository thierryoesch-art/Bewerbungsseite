import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ladeDokumente, dokumentUrl, dokumentBildUrl } from '../api/dokumente'
import type { Dokument } from '../api/dokumente'
import platzhalterBild from '../assets/vite.svg'

const kategorien = ['Zeugnisse', 'Lebenslauf', 'Zertifikate']

// Vier Zustaende statt "die Daten sind einfach da": Daten vom Server
// brauchen Zeit, koennen fehlschlagen, und man darf nicht angemeldet sein.
type Zustand =
    | { art: 'laedt' }
    | { art: 'fertig'; dokumente: Dokument[] }
    | { art: 'nicht-angemeldet' }
    | { art: 'fehler'; fehler: string }

function Dokumente() {
    const [zustand, setZustand] = useState<Zustand>({ art: 'laedt' })

    useEffect(() => {
        // Schutz gegen eine Antwort, die erst eintrifft, wenn die Seite
        // schon wieder verlassen wurde.
        let abgebrochen = false

        ladeDokumente().then((ergebnis) => {
            if (abgebrochen) return

            if (ergebnis.ok) {
                setZustand({ art: 'fertig', dokumente: ergebnis.dokumente })
            } else if (ergebnis.grund === 'nicht-angemeldet') {
                setZustand({ art: 'nicht-angemeldet' })
            } else {
                setZustand({ art: 'fehler', fehler: ergebnis.fehler })
            }
        })

        return () => { abgebrochen = true }
    }, [])

    if (zustand.art === 'laedt') {
        return (
            <main className="wrap seite seite--dokumente">
                <h1>Dokumente</h1>
                <p>Dokumente werden geladen …</p>
            </main>
        )
    }

    if (zustand.art === 'nicht-angemeldet') {
        return (
            <main className="wrap seite seite--dokumente">
                <h1>Dokumente</h1>

                <section className="card doku-sperre">
                    <svg className="doku-sperre__schloss" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7 10V7a5 5 0 0 1 10 0v3" />
                        <rect x="4" y="10" width="16" height="11" rx="2.5" />
                        <circle cx="12" cy="15" r="1.4" />
                        <path d="M12 16.4v2" />
                    </svg>

                    <h2 className="doku-sperre__titel">Geschützter Bereich</h2>
                    <p className="doku-sperre__text">
                        Hier liegen meine Bewerbungsunterlagen — Zeugnisse, Lebenslauf und
                        Kompetenznachweise. Der Zugang ist Unternehmen vorbehalten. Die
                        Zugangsdaten haben Sie mit meiner Bewerbung erhalten.
                    </p>

                    <Link className="doku-sperre__knopf" to="/login">Zur Anmeldung</Link>
                </section>
            </main>
        )
    }

    if (zustand.art === 'fehler') {
        return (
            <main className="wrap seite seite--dokumente">
                <h1>Dokumente</h1>
                <p role="alert">{zustand.fehler}</p>
            </main>
        )
    }

    return (
        <main className="wrap seite seite--dokumente">
            <h1>Dokumente</h1>
            <p>Das sind alle wichtigen Dokumente wie Zeugnisse oder Lebenslauf etc. Diese Dokumente sind streng vertraulich. Bitte brechen Sie mein Vertrauen nicht und geben Sie die Dokumente nicht weiter.</p>
            {kategorien.map((k) => {
                const treffer = zustand.dokumente.filter((d) => d.kategorie === k)
                if (treffer.length === 0) return null

                return (
                    <section className='doku-gruppe' key={k}>
                        <h2 className='doku-gruppe__titel'>{k}</h2>
                        <ul className='card-grid dokumente'>
                            {treffer.map((d) => (
                                <li key={d.id}>
                                    <div className='card projekt-karte'>
                                        <img
                                            className='projekt-karte__bild'
                                            src={d.hatBild ? dokumentBildUrl(d.id) : platzhalterBild}
                                            alt=''
                                        />

                                        <div className='projekt-karte__text'>
                                            <h3 className='card__title'>{d.titel}</h3>
                                            <p className='card__text'>{d.text}</p>

                                            {/* Normaler Link — der Browser schickt das Sitzungscookie
                                                automatisch mit, und der Server setzt den
                                                Content-Disposition-Header fuers Herunterladen. */}
                                            <a className='doku-download' href={dokumentUrl(d.id)}>
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
