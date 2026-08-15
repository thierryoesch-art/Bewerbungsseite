/**
 * Alles rund um das Sitzungscookie.
 *
 * Ansatz: JWT (JSON Web Token). Der Server merkt sich KEINE Sitzungen.
 * Im Cookie steht ein Text, den der Server mit SESSION_SECRET signiert hat.
 * Beim naechsten Aufruf prueft er nur die Signatur — passt sie, war der
 * Inhalt nicht manipuliert. Darum kommt man ohne Datenbank aus.
 *
 * ---------------------------------------------------------------------
 * DEIN TEIL. Drei Funktionen, Erklaerung dazu im Chat.
 * ---------------------------------------------------------------------
 */
import jwt from 'jsonwebtoken'

export const COOKIE_NAME = 'sitzung'

const GEHEIMNIS = process.env.SESSION_SECRET
const DAUER = process.env.SESSION_DAUER ?? '8h'

if (!GEHEIMNIS || GEHEIMNIS.length < 32) {
  // Lieber sofort abstuerzen als mit einem schwachen Schluessel laufen:
  // wer den Schluessel erraet, kann sich selbst gueltige Cookies ausstellen.
  throw new Error('SESSION_SECRET fehlt oder ist kuerzer als 32 Zeichen.')
}

/**
 * Stellt das Cookie aus, nachdem das Passwort gestimmt hat.
 *
 */
export function sitzungSetzen(res, benutzername) {
  const token = jwt.sign({ benutzer: benutzername }, GEHEIMNIS, { expiresIn: DAUER })
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}

/**
 * Liest das Cookie und gibt den Benutzernamen zurueck — oder null,
 * wenn kein gueltiges Cookie da ist (fehlt, abgelaufen, manipuliert).
 *
 */
export function sitzungLesen(req) {
  const token = req.cookies[COOKIE_NAME]
  if (!token) return null
  
  try {
    const inhalt = jwt.verify(token, GEHEIMNIS)
    return inhalt.benutzer
  } catch {
    return null
  }
}

/**
 * Express-Middleware: laesst nur durch, wer angemeldet ist.
 * Wird vor die Dokumenten-Routen gehaengt.
 *
 */
export function nurAngemeldet(req, res, next) {
  const benutzer = sitzungLesen(req)

  if (!benutzer) {
    return res.status(401).json({ fehler: 'Nicht angemeldet.'})
  }

  req.benutzer = benutzer
  next()
}