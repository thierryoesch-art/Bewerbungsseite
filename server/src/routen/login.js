/**
 * Die drei Routen rund um die Anmeldung.
 *
 * Wird in index.js unter /api eingehaengt, die Pfade hier sind also
 * relativ dazu: '/login' wird zu /api/login.
 *
 * ---------------------------------------------------------------------
 * DEIN TEIL. Geruest steht, die Handler tippst du.
 * ---------------------------------------------------------------------
 */
import express from 'express'
import rateLimit from 'express-rate-limit'
import bcrypt from 'bcryptjs'

import { findeHash } from '../benutzer.js'
import { sitzungSetzen, sitzungLesen, COOKIE_NAME } from '../sitzung.js'

// Ein Hash von einem zufälligen Wegwerf-Passwort. Wird nie erraten werden,
// dient nur dazu, dass ein unbekannter Benutzername genauso lange dauert
// wie ein bekannter.
const BLIND_HASH = '$2b$12$8iDhVB8UfFF6lFEj46YDROGAaRPI13RI9RK0IfDSbEFGIGgYlGO1.'

const router = express.Router()

// Bremse gegen durchprobierte Passwoerter: 10 Versuche pro IP in 15 Minuten.
// Nur erfolglose Versuche zaehlen, wer sich korrekt anmeldet wird nicht bestraft.
const anmeldeBremse = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { fehler: 'Zu viele Versuche. Bitte in 15 Minuten nochmal.' },
})

/**
 * POST /api/login
 *
 * TODO(du):
 *  1. benutzer und passwort aus req.body holen und pruefen, dass beides
 *     wirklich Strings sind (der Body kommt von aussen, ihm ist nicht zu trauen).
 *  2. findeHash(benutzer) holen.
 *  3. await bcrypt.compare(passwort, hash) — Achtung beim Fall
 *     "Benutzer existiert nicht", dazu sag ich dir im Chat was.
 *  4. Passt es nicht: res.status(401).json({ fehler: '...' })
 *     Passt es: sitzungSetzen(res, benutzer) und res.json({ ok: true })
 *
 * Wichtig: NIE zurueckmelden, ob der Benutzername oder das Passwort falsch
 * war — sonst kann man damit gueltige Benutzernamen herausfinden.
 */
router.post('/login', anmeldeBremse, async (req, res) => {
  const { benutzer, passwort } = req.body ?? {}

  if (typeof benutzer !== 'string' || typeof passwort !== 'string') {
    return res.status(400).json({ fehler: 'Benutzername und Passwort werden gebraucht.' })
  }

  const hash = findeHash(benutzer)
  const stimmt = await bcrypt.compare(passwort, hash ?? BLIND_HASH)

  if (!hash || !stimmt) {
    return res.status(401).json({ fehler: 'Benutzername oder Passwort stimmen nicht.' })
  }

  sitzungSetzen(res, benutzer)
  res.json({ ok: true })
})

/**
 * GET /api/me
 *
 * Beantwortet die Frage "bin ich noch angemeldet?". Braucht das Frontend
 * nach jedem Reload — das httpOnly-Cookie kann JavaScript ja nicht lesen.
 *
 * TODO(du): sitzungLesen(req) aufrufen, dann entweder
 * res.json({ angemeldet: false }) oder res.json({ angemeldet: true, benutzer }).
 */
router.get('/me', (req, res) => {
  const benutzer = sitzungLesen(req)

  if (!benutzer) return res.json({ angemeldet: false })
  res.json({ angemeldet: true, benutzer })
})

/**
 * POST /api/logout
 *
 * TODO(du): res.clearCookie(COOKIE_NAME, { ... }) und res.json({ ok: true }).
 * Die Optionen muessen zu denen beim Setzen passen, sonst findet der
 * Browser das Cookie nicht und loescht es nicht.
 */
router.post('/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
  res.json({ ok:true })
})

export default router
