/**
 * Zugriff auf alles in src/assets/ ueber den Dateinamen.
 *
 * Statt pro Bild eine import-Zeile zu schreiben, sammelt import.meta.glob
 * den ganzen Ordner auf einmal ein. Das ist eine Vite-Funktion, die beim
 * Bauen ausgewertet wird — zur Laufzeit wird nichts durchsucht.
 *
 * `eager: true`  -> die Dateien direkt mitnehmen statt Ladefunktionen
 * `import: 'default'` -> nur die fertige URL, nicht das ganze Modul
 *
 * Der Mustertext muss woertlich dastehen: Vite liest ihn beim Bauen aus
 * dem Quelltext. Eine Variable an dieser Stelle funktioniert nicht.
 */
const dateien = import.meta.glob<string>(
  '../assets/*.{jpg,jpeg,png,webp,avif,svg,gif,mp4,webm,mp3,wav,ogg,m4a}',
  { eager: true, import: 'default' },
)

// Die Schluessel sind volle Pfade ('../assets/raspy.jpg'). Fuer den
// taeglichen Gebrauch ist der blosse Dateiname angenehmer.
const nachName = new Map<string, string>(
  Object.entries(dateien).map(([pfad, url]) => [pfad.slice(pfad.lastIndexOf('/') + 1), url]),
)

/**
 * Die URL einer Datei aus src/assets/, z. B. medien('raspy.jpg').
 *
 * Wirft bei einem unbekannten Namen. Das ist Absicht: mit den frueheren
 * import-Zeilen haette ein Tippfehler den Build abgebrochen. Der Glob
 * merkt das erst beim Ausfuehren, deshalb hier wenigstens laut und mit
 * einer Meldung, die den Fehler sofort erklaert.
 */
export function medien(name: string): string {
  const url = nachName.get(name)

  if (!url) {
    throw new Error(
      `medien(): 'src/assets/${name}' gibt es nicht. ` +
      `Vorhanden sind: ${[...nachName.keys()].sort().join(', ')}`,
    )
  }

  return url
}
