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

import { nurAngemeldet } from '../sitzung.js'
import path from 'node:path'
import { DOKUMENTE_DIR } from '../pfade.js'

const router = express.Router()

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
    titel: 'Zeugnis 3. Lehrjahr',
    kategorie: 'Zeugnisse',
    text: 'Semesterzeugnis der Berufsfachschule',
    datei: 'zeugnis-lehrjahr-3.pdf',
  },
  {
    id: 'zeugnis-lehrjahr-2',
    titel: 'Zeugnis 2. Lehrjahr',
    kategorie: 'Zeugnisse',
    text: 'Semesterzeugnis der Berufsfachschule',
    datei: 'zeugnis-lehrjahr-2.pdf',
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
    titel: 'Kompetenznachweis ÜK 1',
    kategorie: 'Zertifikate',
    text: 'Überbetrieblicher Kurs, Bewertung und Rückmeldung.',
    datei: 'kompetenznachweis-uek-1.pdf',
  },
  {
    id: 'kompetenznachweis-uek-2',
    titel: 'Kompetenznachweis ÜK 2',
    kategorie: 'Zertifikate',
    text: 'Überbetrieblicher Kurs, Bewertung und Rückmeldung.',
    datei: 'kompetenznachweis-uek-2.pdf',
  },
]

// Ab hier ist alles angemeldeten Besuchern vorbehalten.
router.use(nurAngemeldet)

/**
 * GET /api/dokumente
 *
 */
router.get('/', (req, res) => {
  const liste = DOKUMENTE.map(({ datei, ...rest }) => rest)
  res.json(liste)
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

  res.download(path.join(DOKUMENTE_DIR, dok.datei),`${dok.titel}.pdf`)
})


export default router
