import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export type Einstellungen = {
  bewegung: 'an' | 'aus'
  sterne: 'aus' | 'wenig' | 'normal' | 'viel'
  navLabels: 'an' | 'aus'
  schrift: 'klein' | 'normal' | 'gross'
  kontrast: 'an' | 'aus'
}

const standard: Einstellungen = {
    bewegung: 'an',
    sterne: 'normal',
    navLabels: 'aus',
    schrift: 'normal',
    kontrast: 'aus',
}        

function ladeStart(): Einstellungen  {
  // Gespeicherte Wahl hat immer Vorrang
  try {
   const gespeichert = localStorage.getItem('einstellungen')
   if (gespeichert) return {...standard, ...JSON.parse(gespeichert) }
  } catch {
    // kaputter Eintrag — dann Standard
  }

  // Nur beim allerersten Besuch: OS-Wunsch respektieren
  const basis = { ...standard }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    basis.bewegung = 'aus'
  }

  return basis
}

type ContextWert = {
    einstellungen: Einstellungen
    setzen: <K extends keyof Einstellungen>(name: K, wert: Einstellungen[K]) => void 
    zuruecksetzen: () => void
}

const Ctx = createContext<ContextWert | null>(null)

export function EinstellungenProvider({ children }: { children: ReactNode }) 
{
    const [einstellungen, setEinstellungen] = useState<Einstellungen>(ladeStart)

    useEffect(() => {
        localStorage.setItem('einstellungen', JSON.stringify(einstellungen))

    const wurzel = document.documentElement
    wurzel.dataset.bewegung = einstellungen.bewegung
    wurzel.dataset.navLabels = einstellungen.navLabels
    wurzel.dataset.schrift = einstellungen.schrift
    wurzel.dataset.kontrast =einstellungen.kontrast 
}, [einstellungen])

  function setzen<K extends keyof Einstellungen>(name: K, wert: Einstellungen[K]) {
    setEinstellungen((alt) => ({...alt, [name]: wert }))
  }

  function zuruecksetzen() {
    setEinstellungen(standard)
  }

  return (
    <Ctx.Provider value={{ einstellungen, setzen, zuruecksetzen }}>
      {children}
    </Ctx.Provider>
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export function useEinstellungen() {
    const wert = useContext(Ctx)
    if (!wert) throw new Error('useEinstellungen braucht den EinstellungsProvider')
    return wert

}