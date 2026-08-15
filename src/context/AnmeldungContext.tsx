import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { sitzungPruefen, abmelden as abmeldenApi } from '../api/login'

/**
 * Wer ist angemeldet?
 *
 * 'unbekannt' ist der Zustand direkt nach dem Laden der Seite, solange die
 * Antwort auf /api/me noch aussteht. Ohne diesen dritten Fall wuerde der
 * Abmelde-Knopf bei jedem Neuladen kurz aufblitzen und wieder verschwinden.
 */
type Anmeldung =
  | { art: 'unbekannt' }
  | { art: 'angemeldet'; benutzer: string }
  | { art: 'abgemeldet' }

type ContextWert = {
  anmeldung: Anmeldung
  /** Nach erfolgreichem Login aufrufen, damit die Oberflaeche mitbekommt. */
  angemeldetMit: (benutzer: string) => void
  abmelden: () => Promise<void>
}

const Ctx = createContext<ContextWert | null>(null)

export function AnmeldungProvider({ children }: { children: ReactNode }) {
  const [anmeldung, setAnmeldung] = useState<Anmeldung>({ art: 'unbekannt' })

  // Einmal beim Start nachfragen. Das Cookie ist httpOnly, das Frontend
  // kann den Zustand also nur ueber den Server erfahren.
  useEffect(() => {
    let abgebrochen = false

    sitzungPruefen().then((benutzer) => {
      if (abgebrochen) return
      setAnmeldung(benutzer ? { art: 'angemeldet', benutzer } : { art: 'abgemeldet' })
    })

    return () => { abgebrochen = true }
  }, [])

  function angemeldetMit(benutzer: string) {
    setAnmeldung({ art: 'angemeldet', benutzer })
  }

  async function abmelden() {
    await abmeldenApi()
    setAnmeldung({ art: 'abgemeldet' })
  }

  return (
    <Ctx.Provider value={{ anmeldung, angemeldetMit, abmelden }}>
      {children}
    </Ctx.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAnmeldung() {
  const wert = useContext(Ctx)
  if (!wert) throw new Error('useAnmeldung braucht den AnmeldungProvider')
  return wert
}
