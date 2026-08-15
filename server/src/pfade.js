import path from 'node:path'
import { fileURLToPath } from 'node:url'

// In ES-Modulen gibt es __dirname nicht mehr. import.meta.url ist die
// URL dieser Datei, daraus laesst sich der Ordner zurueckrechnen.
const hierDir = path.dirname(fileURLToPath(import.meta.url))

/** Der Ordner server/ */
export const SERVER_DIR = path.resolve(hierDir, '..')

/** Die Projektwurzel (dort liegt die Vite-App) */
export const WURZEL_DIR = path.resolve(SERVER_DIR, '..')

/** Die gebaute Vite-App. Entsteht durch `npm run build` in der Wurzel. */
export const DIST_DIR = path.join(WURZEL_DIR, 'dist')

/**
 * Hier liegen die vertraulichen PDFs.
 *
 * WICHTIG: Dieser Ordner wird bewusst NICHT von express.static ausgeliefert.
 * Nur die Route /api/dokumente/:id gibt eine Datei heraus, und die prueft
 * vorher das Sitzungscookie. Laegen die PDFs in public/ oder src/assets/,
 * waeren sie nach dem Build unter einer festen URL fuer jeden abrufbar
 * und der ganze Login waere wirkungslos.
 */
export const DOKUMENTE_DIR = path.join(SERVER_DIR, 'dokumente')
