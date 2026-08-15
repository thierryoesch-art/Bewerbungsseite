/**
 * Liste und Auslieferung der vertraulichen Dokumente.
 *
 * Wird in index.js unter /api/dokumente eingehaengt.
 *
 * Hier liegt der eigentliche Schutz der Bewerbungsunterlagen: die PDFs
 * liegen in server/dokumente/ und werden von keinem express.static
 * ausgeliefert. Nur diese Datei gibt sie heraus, und nur nach nurAngemeldet.
 */
import express from 'express'
import fs from 'node:fs'

import { nurAngemeldet } from '../sitzung.js'
import path from 'node:path'
import { DOKUMENTE_DIR } from '../pfade.js'

const router = express.Router()

const BILD_ENDUNGEN = ['.jpg', '.jpeg', '.png', '.webp', '.avif']

/**
 * Liest server/dokumente/ einmal beim Start und merkt sich zu jedem
 * Bild den Namen OHNE Endung.
 *
 * Dadurch reicht in der Liste unten `bild: 'zeugnisbwd'` — welche Endung
 * die Datei hat, findet der Server selbst heraus. Wer spaeter von .jpg auf
 * .webp wechselt, muss die Liste nicht anfassen.
 *
 * Einmal beim Start, nicht bei jeder Anfrage: neue Bilder brauchen also
 * einen Neustart des Servers (im Dev-Betrieb macht --watch das von selbst).
 */
function ladeBilder() {
  const gefunden = new Map()

  let dateien
  try {
    dateien = fs.readdirSync(DOKUMENTE_DIR)
  } catch {
    console.warn(`Ordner ${DOKUMENTE_DIR} nicht lesbar — keine Vorschaubilder.`)
    return gefunden
  }

  for (const name of dateien) {
    const endung = path.extname(name).toLowerCase()
    if (!BILD_ENDUNGEN.includes(endung)) continue

    gefunden.set(path.basename(name, path.extname(name)), name)
  }

  return gefunden
}

const BILDER = ladeBilder()

/**
 * Der echte Dateiname des Vorschaubilds — oder undefined.
 *
 * Faellt auf die id zurueck: heisst das Bild wie die id des Dokuments,
 * braucht der Eintrag gar kein `bild`-Feld mehr.
 */
function bildDatei(dok) {
  return BILDER.get(dok.bild ?? dok.id)
}

/**
 * Der Katalog. Bewusst eine feste Liste im Code statt "lies den Ordner aus":
 * so bestimmst du Titel, Reihenfolge und Kategorie selbst, und es kann kein
 * Dateiname nach aussen rutschen, den du nicht hier eingetragen hast.
 *
 * `datei` ist ein reiner Dateiname ohne Pfad — nach draussen geht nur `id`.
 */
export const DOKUMENTE = [
  {
    id: 'zeugnis-lehrjahr-3',
    titel: 'Zeugnis BWD',
    kategorie: 'Zeugnisse',
    text: 'Semesterzeugnis der BWD Bern',
    datei: 'zeugnis-lehrjahr-3.pdf',
    bild: 'zeugnisbwd'
  },
  {
    id: 'zeugnis-lehrjahr-2',
    titel: 'Zeugnis gibb',
    kategorie: 'Zeugnisse',
    text: 'Semesterzeugnis der gibb Berufsschule Bern',
    datei: 'zeugnis-lehrjahr-2.pdf',
    bild: 'zeugnisgibb'
  },
  {
    id: 'lebenslauf',
    titel: 'Lebenslauf',
    kategorie: 'Lebenslauf',
    text: 'Aktueller Lebenslauf mit Ausbildung, Erfahrung und Kontaktdaten.',
    datei: 'lebenslauf.pdf',
    
  },
  {
    id: 'kompetenznachweis-uek-1',
    titel: 'Kompetenznachweis ÜK Modul 187',
    kategorie: 'Zertifikate',
    text: 'Überbetrieblicher Kurs, Bewertung und Rückmeldung.',
    datei: 'kompetenznachweis-uek-1.pdf',
    bild: 'uek_187'
  },
  {
    id: 'kompetenznachweis-uek-2',
    titel: 'Kompetenznachweis ÜK Modul 106',
    kategorie: 'Zertifikate',
    text: 'Überbetrieblicher Kurs, Bewertung und Rückmeldung.',
    datei: 'kompetenznachweis-uek-2.pdf',
    bild: 'uek_106'
  },
  {
    id: 'kompetenznachweis-uek-3',
    titel: 'Kompetenznachweis ÜK Modul 295',
    kategorie: 'Zertifikate',
    text: 'Überbetrieblicher Kurs, Bewertung und Rückmeldung.',
    datei: 'kompetenznachweis-uek-3.pdf',
    bild: 'uek_295'
  },
  {
    id: 'kompetenznachweis-uek-4',
    titel: 'Kompetenznachweis ÜK Modul 294',
    kategorie: 'Zertifikate',
    text: 'Überbetrieblicher Kurs, Bewertung und Rückmeldung.',
    datei: 'kompetenznachweis-uek-4.pdf',
    bild: 'uek_294'
  },
  {
    id: 'kompetenznachweis-uek-5',
    titel: 'Kompetenznachweis ÜK Modul 210',
    kategorie: 'Zertifikate',
    text: 'Überbetrieblicher Kurs, Bewertung und Rückmeldung.',
    datei: 'kompetenznachweis-uek-5.pdf',
    bild: 'uek_210'
  },
  {
    id: 'kompetenznachweis-uek-6',
    titel: 'Kompetenznachweis ÜK Modul 335',
    kategorie: 'Zertifikate',
    text: 'Überbetrieblicher Kurs, Bewertung und Rückmeldung.',
    datei: 'kompetenznachweis-uek-6.pdf',
    bild: 'uek_335'
  },
]

// Ab hier ist alles angemeldeten Besuchern vorbehalten.
router.use(nurAngemeldet)

/**
 * GET /api/dokumente
 *
 */
router.get('/', (req, res) => {
  // datei und bild sind interne Dateinamen und bleiben hier. Nach draussen
  // geht nur, OB es ein Bild gibt — abgeholt wird es ueber die id.
  const liste = DOKUMENTE.map((dok) => {
    const { datei, bild, ...rest } = dok
    return { ...rest, hatBild: Boolean(bildDatei(dok)) }
  })
  res.json(liste)
})

/**
 * GET /api/dokumente/:id/bild
 *
 * Das Vorschaubild. Steht bewusst hinter demselben Schutz wie die PDF:
 * ein lesbares Zeugnis-Vorschaubild ist genauso vertraulich wie das
 * Dokument selbst. Deshalb liegen die Bilder neben den PDFs in
 * server/dokumente/ und nicht in src/assets/.
 *
 * Muss VOR '/:id' stehen? Nein — die Pfade haben unterschiedlich viele
 * Segmente, Express verwechselt sie nicht.
 */
router.get('/:id/bild', (req, res) => {
  const dok = DOKUMENTE.find((d) => d.id === req.params.id)
  const datei = dok && bildDatei(dok)

  if (!datei) {
    return res.status(404).json({ fehler: 'Kein Bild vorhanden.' })
  }

  res.sendFile(path.join(DOKUMENTE_DIR, datei))
})

/**
 * GET /api/dokumente/:id
 *
 */
router.get('/:id', (req, res) => {
  const dok = DOKUMENTE.find((d) => d.id === req.params.id)

  if (!dok) {
    return res.status(404).json({ fehler: 'Dokument nicht gefunden.' })
  }

  // Der Rueckruf faengt den Fall ab, dass der Eintrag zwar existiert, die
  // Datei aber fehlt. Ohne ihn landet der ENOENT beim allgemeinen
  // Fehler-Handler und wird zu einem verwirrenden 500er.
  res.download(path.join(DOKUMENTE_DIR, dok.datei), `${dok.titel}.pdf`, (fehler) => {
    if (!fehler || res.headersSent) return

    console.error(`Datei fehlt: ${dok.datei}`)
    res.status(404).json({ fehler: 'Dokument nicht gefunden.' })
  })
})


export default router
