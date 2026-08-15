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

  // 429 kommt von der Bremse gegen durchprobierte Passwoerter. Hier lohnt
  // sich die Meldung des Servers, weil sie die Wartezeit nennt.
  if (antwort.status === 429) {
    return { ok: false, fehler: 'Zu viele Anmeldeversuche. Bitte in 15 Minuten nochmal.' }
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

/**
 * Fragt den Server, ob noch eine gueltige Sitzung besteht.
 *
 * Noetig, weil das Sitzungscookie httpOnly ist — JavaScript kann es nicht
 * lesen. Nach jedem Neuladen der Seite weiss das Frontend also von sich aus
 * nicht, ob jemand angemeldet ist, und muss nachfragen.
 */
export async function sitzungPruefen(): Promise<string | null> {
  try {
    const antwort = await fetch('/api/me', { credentials: 'include' })
    if (!antwort.ok) return null

    const typ = antwort.headers.get('content-type') ?? ''
    if (!typ.includes('application/json')) return null

    const daten = await antwort.json()
    return daten.angemeldet ? daten.benutzer : null
  } catch {
    // Server nicht erreichbar — dann gilt "nicht angemeldet".
    return null
  }
}

/**
 * Meldet ab. Das eigentliche Loeschen des Cookies macht der Server,
 * das Frontend kann httpOnly-Cookies nicht anfassen.
 */
export async function abmelden(): Promise<void> {
  try {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' })
  } catch {
    // Auch wenn der Aufruf scheitert, behandelt das Frontend den Benutzer
    // als abgemeldet. Das Cookie laeuft spaetestens nach acht Stunden ab.
  }
}
