
import { useEinstellungen } from '../context/EinstellungenContext'
import type { Einstellungen } from '../context/EinstellungenContext'

type WahlProps = {
  titel: string
  werte: string[]
  aktuell: string
  onWahl: (wert: string) => void
}

/* Zwei Möglichkeiten: zwei Knöpfe nebeneinander */
function Wahl({ titel, werte, aktuell, onWahl }: WahlProps) {
  return (
    <div className="einstellung">
      <h3 className="einstellung__titel">{titel}</h3>

      <div className="filter">
        {werte.map((w) => (
          <button
            key={w}
            className={w === aktuell ? 'filter__btn filter__btn--aktiv' : 'filter__btn'}
            onClick={() => onWahl(w)}
            aria-pressed={w === aktuell}
          >
            {w}
          </button>
        ))}
      </div>
    </div>
  )
}

/* Drei oder mehr Möglichkeiten: Schieber mit festen Rastpunkten */
function Schieber({ titel, werte, aktuell, onWahl }: WahlProps) {
  const id = 'schieber-' + titel.toLowerCase().replace(/[^a-z]+/g, '-')
  const index = Math.max(0, werte.indexOf(aktuell))

  return (
    <div className="einstellung">
      <label className="einstellung__titel" htmlFor={id}>{titel}</label>

      <input
        id={id}
        className="schieber"
        type="range"
        min={0}
        max={werte.length - 1}
        step={1}
        value={index}
        onChange={(e) => onWahl(werte[Number(e.target.value)])}
        aria-valuetext={aktuell}
      />

      <div className="schieber__punkte">
        {werte.map((w) => (
          <button
            key={w}
            type="button"
            className={
              w === aktuell ? 'schieber__punkt schieber__punkt--aktiv' : 'schieber__punkt'
            }
            onClick={() => onWahl(w)}
          >
            {w}
          </button>
        ))}
      </div>
    </div>
  )
}

function EinstellungenSeite() {
  const { einstellungen, setzen, zuruecksetzen } = useEinstellungen()

  return (
    <main className="wrap seite seite--einstellungen">
      <h1>Einstellungen</h1>
      <p>Hier können Sie die Darstellung der Seite an Ihre Bedürfnisse anpassen.</p>

      <section className="card einstellung-gruppe">
        <h2 className="einstellung-gruppe__titel">Bewegung und Hintergrund</h2>

        <Wahl
          titel="Bewegung"
          werte={['an', 'aus']}
          aktuell={einstellungen.bewegung}
          onWahl={(w) => setzen('bewegung', w as Einstellungen['bewegung'])}
        />

        <Schieber
          titel="Sterne"
          werte={['aus', 'wenig', 'normal', 'viel']}
          aktuell={einstellungen.sterne}
          onWahl={(w) => setzen('sterne', w as Einstellungen['sterne'])}
        />
      </section>

      <section className="card einstellung-gruppe">
        <h2 className="einstellung-gruppe__titel">Navigation</h2>

        <Wahl
          titel="Navigation beschriftet"
          werte={['an', 'aus']}
          aktuell={einstellungen.navLabels}
          onWahl={(w) => setzen('navLabels', w as Einstellungen['navLabels'])}
        />
      </section>

      <section className="card einstellung-gruppe">
        <h2 className="einstellung-gruppe__titel">Lesbarkeit</h2>

        <Schieber
          titel="Schriftgrösse"
          werte={['klein', 'normal', 'gross']}
          aktuell={einstellungen.schrift}
          onWahl={(w) => setzen('schrift', w as Einstellungen['schrift'])}
        />

        <Wahl
          titel="Kontrast erhöhen"
          werte={['aus', 'an']}
          aktuell={einstellungen.kontrast}
          onWahl={(w) => setzen('kontrast', w as Einstellungen['kontrast'])}
        />
      </section>

      <button className="zuruecksetzen" onClick={zuruecksetzen}>
        Auf Standard zurücksetzen
      </button>
    </main>
  )
}

export default EinstellungenSeite
