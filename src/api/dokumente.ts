/**
 * Zugriff auf die geschuetzten Dokumente.
 *
 * Aufgebaut wie login.ts: das fetch selbst bleibt hier drin, die Seite
 * bekommt nur ein fertiges Ergebnis und muss keine Statuscodes kennen.
 */

/** Was der Server pro Dokument herausgibt — ohne die echten Dateinamen. */
export type Dokument = {
  id: string
  titel: string
  kategorie: string
  text: string
  /** Ob ein Vorschaubild hinterlegt ist. Sonst zeigt die Seite den Platzhalter. */
  hatBild: boolean
}

/**
 * Drei moegliche Ausgaenge. 'nicht-angemeldet' ist bewusst von 'fehler'
 * getrennt: das eine fuehrt zum Login, das andere zu einer Fehlermeldung.
 */
export type DokumenteErgebnis =
  | { ok: true; dokumente: Dokument[] }
  | { ok: false; grund: 'nicht-angemeldet' }
  | { ok: false; grund: 'fehler'; fehler: string }

export async function ladeDokumente(): Promise<DokumenteErgebnis> {
  let antwort: Response

  try {
    antwort = await fetch('/api/dokumente', {
      credentials: 'include',
    })
  } catch {
    return { ok: false, grund: 'fehler', fehler: 'Keine Verbindung zum Server.' }
  }

  if (antwort.status === 401) {
    return { ok: false, grund: 'nicht-angemeldet' }
  }

  if (!antwort.ok) {
    return { ok: false, grund: 'fehler', fehler: 'Die Dokumente konnten nicht geladen werden.' }
  }

  // Gleiche Absicherung wie in login.ts: ohne laufenden Server liefert der
  // Dev-Server die index.html mit Status 200 aus.
  const typ = antwort.headers.get('content-type') ?? ''
  if (!typ.includes('application/json')) {
    return { ok: false, grund: 'fehler', fehler: 'Der Dokumenten-Dienst ist nicht erreichbar.' }
  }

  const dokumente: Dokument[] = await antwort.json()
  return { ok: true, dokumente }
}

/**
 * Die Adresse, hinter der die eigentliche PDF liegt.
 *
 * Kein fetch noetig — das darf ein normaler Link sein. Der Browser schickt
 * das Sitzungscookie automatisch mit, und der Server prueft es genauso wie
 * bei der Liste. encodeURIComponent, weil die id in die URL wandert.
 */
export function dokumentUrl(id: string) {
  return `/api/dokumente/${encodeURIComponent(id)}`
}

/**
 * Die Adresse des Vorschaubilds.
 *
 * Auch das laeuft ueber den Server und nicht ueber src/assets/: ein
 * lesbares Vorschaubild eines Zeugnisses ist genauso vertraulich wie
 * das Zeugnis selbst und darf nicht im oeffentlichen Build landen.
 */
export function dokumentBildUrl(id: string) {
  return `/api/dokumente/${encodeURIComponent(id)}/bild`
}
