/**
 * Kleines Hilfsprogramm, um einen bcrypt-Hash fuer die .env zu erzeugen.
 *
 *   npm run hash -- "meinGeheimesPasswort"
 *
 * Die Ausgabe kommt hinter den Benutzernamen in LOGINS.
 * Das Klartext-Passwort steht danach NUR noch in deiner Bewerbungsmail,
 * nirgends auf dem Server.
 */
import bcrypt from 'bcryptjs'

const passwort = process.argv[2]

if (!passwort) {
  console.error('Aufruf: npm run hash -- "meinPasswort"')
  process.exit(1)
}

// 12 Runden: aktuell ueblicher Wert. Je hoeher, desto langsamer wird
// sowohl das Pruefen als auch ein Angriff mit durchprobierten Passwoertern.
const hash = await bcrypt.hash(passwort, 12)

console.log(hash)
