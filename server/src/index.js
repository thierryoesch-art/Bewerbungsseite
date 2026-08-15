import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'node:path'

import { DIST_DIR } from './pfade.js'
import loginRouter from './routen/login.js'
import dokumenteRouter from './routen/dokumente.js'

const app = express()
const port = Number(process.env.PORT ?? 3000)

// Auf dem Pi steht der Cloudflare Tunnel als Proxy davor. Ohne diese Zeile
// haelt Express jede Anfrage fuer unverschluesselt (req.secure === false) und
// req.ip waere immer die Adresse des Tunnels statt die des Besuchers.
app.set('trust proxy', 1)

// Verwandelt einen JSON-Request-Body in req.body.
app.use(express.json())

// Liest den Cookie-Header und legt ihn als req.cookies ab.
app.use(cookieParser())

// --- API ---------------------------------------------------------------
app.use('/api', loginRouter)
app.use('/api/dokumente', dokumenteRouter)

// Unbekannte /api-Pfade sollen JSON liefern statt der index.html.
// Sonst bekaeme anmelden() in src/api/login.ts eine HTML-Seite mit Status 200
// zurueck und wuerde sie als erfolgreiche Anmeldung deuten.
app.use('/api', (_req, res) => {
  res.status(404).json({ fehler: 'Unbekannter Endpunkt' })
})

// --- Die gebaute Vite-App ----------------------------------------------
app.use(express.static(DIST_DIR))

// SPA-Fallback: Alles, was bis hierher keine echte Datei war, ist eine
// React-Router-Route (/profil, /dokumente, ...). Die kennt nur der Browser,
// also liefern wir ihm die index.html und der Router uebernimmt.
// Ohne das gibt ein direkter Aufruf von /profil oder ein F5 einen 404.
app.use((_req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'))
})

// --- Fehler ------------------------------------------------------------
// Muss ganz unten stehen und braucht genau vier Parameter — daran erkennt
// Express einen Fehler-Handler. Ohne ihn antwortet Express mit einer
// HTML-Seite samt Stacktrace: der verraet Dateipfade und Programmaufbau,
// und anmelden() im Frontend bekaeme HTML statt des erwarteten JSON.
app.use((err, _req, res, _next) => {
  console.error(err)
  if (res.headersSent) return
  res.status(500).json({ fehler: 'Interner Serverfehler' })
})

const server = app.listen(port, () => {
  console.log(`Server laeuft auf http://localhost:${port}`)
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `\nPort ${port} ist schon belegt — vermutlich laeuft noch ein alter Server.\n` +
      `  Windows: Get-NetTCPConnection -LocalPort ${port} -State Listen | Select OwningProcess\n` +
      `  Linux:   ss -lptn 'sport = :${port}'\n`
    )
    process.exit(1)
  }
  throw err
})
