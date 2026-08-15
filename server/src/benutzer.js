/**
 * Liest die Firmen-Zugaenge aus der Umgebungsvariable LOGINS.
 *
 * Format: benutzername:bcrypt-hash, mehrere durch Komma getrennt.
 * Ein bcrypt-Hash enthaelt nie ein Komma und nie einen Doppelpunkt,
 * darum ist diese Trennung eindeutig.
 *
 * Bewusst keine Datenbank: es sind eine Handvoll Zugaenge, die sich
 * praktisch nie aendern. Eine Datenbank waere hier nur Ballast.
 */

function ladeBenutzer() {
  const roh = process.env.LOGINS ?? ''

  const benutzer = new Map()

  for (const eintrag of roh.split(',')) {
    const sauber = eintrag.trim()
    if (sauber === '') continue

    // Nur am ERSTEN Doppelpunkt trennen — der Hash selbst enthaelt keinen,
    // aber so ist es auch dann korrekt, wenn sich das Format mal aendert.
    const trenner = sauber.indexOf(':')
    if (trenner === -1) {
      console.warn(`LOGINS: Eintrag ohne Doppelpunkt wird ignoriert: ${sauber}`)
      continue
    }

    const name = sauber.slice(0, trenner).trim()
    const hash = sauber.slice(trenner + 1).trim()

    if (name === '' || hash === '') {
      console.warn(`LOGINS: unvollstaendiger Eintrag wird ignoriert: ${sauber}`)
      continue
    }

    benutzer.set(name, hash)
  }

  if (benutzer.size === 0) {
    console.warn('LOGINS ist leer — es kann sich niemand anmelden.')
  }

  return benutzer
}

// Einmal beim Start lesen, nicht bei jeder Anfrage.
const BENUTZER = ladeBenutzer()

/**
 * Gibt den gespeicherten Passwort-Hash zurueck — oder undefined,
 * wenn es den Benutzernamen nicht gibt.
 */
export function findeHash(benutzername) {
  if (typeof benutzername !== 'string') return undefined
  return BENUTZER.get(benutzername.trim())
}
