export type LoginErgebnis =
  | { ok: true }
  | { ok: false; fehler: string }

export async function anmelden(benutzer: string, passwort: string): Promise<LoginErgebnis> {
  let antwort: Response

  try {
    antwort = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ benutzer, passwort }),
    })
  } catch {
    // fetch wirft nur bei Netzwerkfehlern, nicht bei 4xx/5xx
    return { ok: false, fehler: 'Keine Verbindung zum Server. Bitte prüfen Sie Ihre Internetverbindung.' }
  }

  if (antwort.status === 401) {
    return { ok: false, fehler: 'Benutzername oder Passwort stimmt nicht.' }
  }

  if (!antwort.ok) {
    return { ok: false, fehler: 'Anmeldung gerade nicht möglich. Bitte später nochmal.' }
  }

  // Solange es kein Backend gibt, liefert der Dev-Server auf /api/login
  // die index.html mit Status 200 aus. Ohne diese Prüfung würde die
  // Anmeldung fälschlicherweise als erfolgreich gelten.
  const typ = antwort.headers.get('content-type') ?? ''
  if (!typ.includes('application/json')) {
    return { ok: false, fehler: 'Der Anmelde-Dienst ist noch nicht eingerichtet.' }
  }

  return { ok: true }
}
