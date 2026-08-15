# Bewerbungsseite

Persönliche Bewerbungsseite von Thierry Oesch, Informatiker EFZ Applikationsentwicklung
im 3. Lehrjahr. Enthält Lebenslauf, Ausbildung, Informatikprojekte und Interessen sowie
einen passwortgeschützten Bereich, in dem Unternehmen die Bewerbungsunterlagen abrufen
können.

## Aufbau

```
src/          Frontend — React 19, TypeScript, Vite, React Router
  api/        Zugriff auf das Backend (login.ts, dokumente.ts)
  context/    Globaler Zustand (Einstellungen, Anmeldung)
  lib/        medien.ts — Zugriff auf src/assets/ über den Dateinamen
  pages/      Eine Datei pro Seite
server/       Backend — Express, liefert im Betrieb auch das gebaute Frontend aus
  src/routen/ login.js (Anmeldung), dokumente.js (geschützte Unterlagen)
  dokumente/  Die vertraulichen PDFs — nicht im Repository
```

## Entwicklung

Zwei Terminals, weil Frontend und Backend getrennt laufen:

```bash
# Terminal 1 — Vite auf Port 5173
npm install
npm run dev

# Terminal 2 — Express auf Port 3000
cd server
npm install
cp .env.example .env      # Werte eintragen, siehe unten
npm run dev
```

Vite leitet alle Anfragen an `/api` an Port 3000 weiter (siehe `vite.config.ts`).

### Konfiguration

Die Zugangsdaten stehen in `server/.env` und gehören **nicht** ins Repository:

| Variable | Bedeutung |
|---|---|
| `PORT` | Port des Express-Servers, Standard 3000 |
| `LOGINS` | `benutzer:bcrypt-hash`, mehrere durch Komma getrennt |
| `SESSION_SECRET` | Schlüssel für das Sitzungscookie, mindestens 32 Zeichen |
| `SESSION_DAUER` | Gültigkeit einer Anmeldung, z. B. `8h` |

Einen Passwort-Hash erzeugen:

```bash
cd server
npm run hash -- "meinPasswort"
```

## Sicherheit der Unterlagen

Die PDFs liegen bewusst in `server/dokumente/` und **nicht** in `src/assets/` oder
`public/`. Alles unterhalb dieser beiden Ordner landet beim Bauen in `dist/` und wäre
dort über eine feste URL für jeden abrufbar — der Login hätte keine Wirkung. Ausgeliefert
werden die Dateien nur über `/api/dokumente/:id`, und zwar erst nach Prüfung des
Sitzungscookies. Für die Vorschaubilder gilt dasselbe.

Weitere Massnahmen:

- Passwörter als bcrypt-Hash, nie im Klartext
- httpOnly-Sitzungscookie (JWT), `secure` sobald `NODE_ENV=production`
- Bei unbekanntem Benutzernamen wird gegen einen Blind-Hash geprüft, damit die
  Antwortzeit keine gültigen Konten verrät
- Höchstens 10 fehlgeschlagene Anmeldeversuche pro IP in 15 Minuten

## Betrieb

Gehostet auf einem Raspberry Pi 5 hinter einem Cloudflare Tunnel, als systemd-Dienst.
Die vollständige Anleitung steht in **[DEPLOYMENT.md](DEPLOYMENT.md)**.

Kurzfassung:

```bash
npm run build            # erzeugt dist/
cd server && npm start   # liefert dist/ und die API aus
```

`NODE_ENV=production` muss gesetzt sein, sonst fehlt dem Sitzungscookie das
`Secure`-Flag und der Login funktioniert über HTTPS nicht zuverlässig.

Die PDFs in `server/dokumente/` sind vom Repository ausgeschlossen und müssen einmal
von Hand auf den Server kopiert werden. Nachträglich hinzugefügte PDFs wirken sofort;
neue Vorschaubilder brauchen einen Neustart, weil der Ordner beim Start eingelesen wird.

## Befehle

| Befehl | Wirkung |
|---|---|
| `npm run dev` | Vite-Entwicklungsserver |
| `npm run build` | Typprüfung (`tsc -b`) und Produktionsbuild |
| `npm run lint` | ESLint über das ganze Projekt |
| `npm run preview` | Gebauten Stand ohne Backend ansehen |
