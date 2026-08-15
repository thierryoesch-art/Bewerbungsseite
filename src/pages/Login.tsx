import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { anmelden } from '../api/login'
import { useAnmeldung } from '../context/AnmeldungContext'

function Login() {
  const navigate = useNavigate()
  const { angemeldetMit } = useAnmeldung()
  const [benutzer, setBenutzer] = useState('')
  const [passwort, setPasswort] = useState('')
  const [fehler, setFehler] = useState('')
  const [laeuft, setLaeuft] = useState(false)

  async function absenden(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setFehler('')
    setLaeuft(true)

    try {
      const ergebnis = await anmelden(benutzer, passwort)

      if (!ergebnis.ok) {
        setFehler(ergebnis.fehler)
        return
      }

      // Der Kopfzeile mitteilen, dass jetzt jemand angemeldet ist — sonst
      // stuende dort weiterhin "Login", bis die Seite neu geladen wird.
      angemeldetMit(benutzer)

      // replace: true ersetzt den Login-Eintrag im Verlauf, statt einen
      // neuen anzuhaengen. Sonst landet man mit dem Zurueck-Knopf wieder
      // im Anmeldeformular, obwohl man laengst angemeldet ist.
      navigate('/dokumente', { replace: true })
    } catch {
      setFehler('Unerwarteter Fehler bei der Anmeldung. Bitte später nochmal.')
    } finally {
      // finally, damit der Knopf auch im Fehlerfall wieder freigegeben wird
      setLaeuft(false)
    }
  }

  return (
    <main className="wrap seite seite--login">
      

      <form className="card login" onSubmit={absenden}>
        <h1>Login</h1>
        <p className="login__hinweis">
          Zugang für Unternehmen. Die Daten haben Sie mit meiner Bewerbung erhalten.
        </p>

        <label className="feld">
          <span className="feld__label">Benutzername</span>
          <input
            type="text"
            value={benutzer}
            onChange={(e) => setBenutzer(e.target.value)}
            autoComplete="username"
            required
          />
        </label>

        <label className="feld">
          <span className="feld__label">Passwort</span>
          <input
            type="password"
            value={passwort}
            onChange={(e) => setPasswort(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {fehler && (
          <p className="login__fehler" role="alert">{fehler}</p>
        )}

        <button className="login__btn" type="submit" disabled={laeuft}>
          {laeuft ? 'Wird geprüft …' : 'Anmelden'}
        </button>
      </form>
    </main>
  )
}

export default Login