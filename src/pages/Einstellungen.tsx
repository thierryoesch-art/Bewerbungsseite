
import { useEinstellungen } from '../context/EinstellungenContext'
import type { Einstellungen } from '../context/EinstellungenContext'

type WahlProps = {
  titel: string
  werte: string[]
  aktuell: string
  onWahl: (wert: string) => void
}

function Wahl({ titel, werte, aktuell, onWahl }: WahlProps) {
  return (
    <div className="einstellung">
      <h2 className="einstellung__titel">{titel}</h2>

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

function EinstellungenSeite() {
  const { einstellungen, setzen, zuruecksetzen } = useEinstellungen()

  return (
    <main className="wrap">
      <h1>Einstellungen</h1>

      <Wahl
        titel="Bewegung"
        werte={['an', 'aus']}
        aktuell={einstellungen.bewegung}
        onWahl={(w) => setzen('bewegung', w as Einstellungen['bewegung'])}
      />

      <Wahl
        titel="Sterne"
        werte={['aus', 'wenig', 'normal', 'viel']}
        aktuell={einstellungen.sterne}
        onWahl={(w) => setzen('sterne', w as Einstellungen['sterne'])}
      />

      <Wahl
        titel="Navigation beschriftet"
        werte={['an', 'aus']}
        aktuell={einstellungen.navLabels}
        onWahl={(w) => setzen('navLabels', w as Einstellungen['navLabels'])}
      />

      <Wahl
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

      <button className="dialog__close" onClick={zuruecksetzen}>
        Auf Standard zurücksetzen
      </button>
    </main>
  )
}

export default EinstellungenSeite