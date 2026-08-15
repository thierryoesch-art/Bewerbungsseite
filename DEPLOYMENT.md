# Aufsetzen auf dem Raspberry Pi

Schritt für Schritt. Reihenfolge einhalten — Schritt 6 setzt voraus, dass 1–5 stehen.

Am Ende läuft der Express-Server auf dem Pi auf Port 3000 und ist über einen
Cloudflare Tunnel unter deiner eigenen Domain mit HTTPS erreichbar. Es muss
**kein Port im Router freigegeben** werden.

---

## 1. Domain besorgen

Eine `.ch`-Domain z. B. bei Infomaniak oder Hostpoint kaufen. Danach bei
Cloudflare ein kostenloses Konto anlegen, die Domain dort hinzufügen und beim
Registrar die **Nameserver auf die von Cloudflare umstellen**. Das dauert bis zu
24 Stunden — deshalb zuerst erledigen.

## 2. Node auf dem Pi

Die Raspberry-Pi-OS-Pakete sind meist zu alt. Vite braucht mindestens Node 20.19,
der Server braucht wegen `--env-file` mindestens 20.6. Nimm die aktuelle LTS:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v      # muss v22.x oder neuer zeigen
```

## 3. Code holen und bauen

```bash
cd ~
git clone https://github.com/thierryoesch-art/Bewerbungsseite.git
cd Bewerbungsseite

npm ci
npm run build          # erzeugt dist/

cd server
npm ci
```

`npm run build` muss fehlerfrei durchlaufen. Bricht es ab, ist die Seite nicht
lauffähig — nicht weitermachen, bevor das steht.

## 4. Zugangsdaten anlegen

```bash
cd ~/Bewerbungsseite/server
cp .env.example .env
```

Für **jede Firma** einen Hash erzeugen und in `.env` eintragen:

```bash
npm run hash -- "einLangesPasswort"
```

Einen **neuen** Sitzungsschlüssel erzeugen — nicht den vom Entwicklungsrechner
übernehmen:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Die fertige `.env`:

```
PORT=3000
LOGINS=firma-a:$2b$12$...,firma-b:$2b$12$...
SESSION_SECRET=<der neu erzeugte Schlüssel>
SESSION_DAUER=8h
```

Danach die Datei abschotten, sie enthält alle Zugänge:

```bash
chmod 600 .env
```

## 5. Unterlagen hochladen

Die PDFs und Vorschaubilder sind bewusst **nicht** im Repository. Vom eigenen
Rechner aus:

```bash
scp server/dokumente/* pi@<pi-adresse>:~/Bewerbungsseite/server/dokumente/
```

Die Dateinamen müssen zu den `datei`- und `bild`-Werten in
`server/src/routen/dokumente.js` passen.

## 6. Dienst einrichten

Vorher prüfen, wo Node liegt — die Vorlage geht von `/usr/bin/node` aus:

```bash
which node
```

Weicht der Pfad ab, in der `.service`-Datei bei `ExecStart` anpassen.

```bash
cd ~/Bewerbungsseite/server
nano bewerbungsseite.service     # User und Pfade prüfen
sudo cp bewerbungsseite.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now bewerbungsseite
systemctl status bewerbungsseite
```

Prüfen, ob er lokal antwortet:

```bash
curl http://localhost:3000/api/me
# erwartet: {"angemeldet":false}
```

Kommt nichts, ins Protokoll schauen: `journalctl -u bewerbungsseite -n 50`

## 7. Cloudflare Tunnel

```bash
# arm64 — mit "uname -m" prüfen, bei aarch64 stimmt es
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb -o cloudflared.deb
sudo dpkg -i cloudflared.deb

cloudflared tunnel login          # öffnet einen Link, dort die Domain wählen
cloudflared tunnel create bewerbungsseite
```

Der zweite Befehl nennt eine **Tunnel-ID** und den Pfad zur Zugangsdatei. Beides
in die Konfiguration eintragen:

```bash
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

```yaml
tunnel: <die Tunnel-ID>
credentials-file: /home/pi/.cloudflared/<die Tunnel-ID>.json

ingress:
  - hostname: deine-domain.ch
    service: http://localhost:3000
  - hostname: www.deine-domain.ch
    service: http://localhost:3000
  # Pflicht-Auffangregel, muss die letzte sein
  - service: http_status:404
```

DNS-Einträge setzen und den Tunnel als Dienst starten:

```bash
cloudflared tunnel route dns bewerbungsseite deine-domain.ch
cloudflared tunnel route dns bewerbungsseite www.deine-domain.ch

sudo cloudflared service install
sudo systemctl enable --now cloudflared
systemctl status cloudflared
```

## 8. Abnahme

Vom **Handy über Mobilfunk** testen, nicht aus dem eigenen WLAN — sonst merkst du
nicht, ob es wirklich von aussen geht.

- [ ] `https://deine-domain.ch` lädt die Startseite
- [ ] Das Schloss-Symbol im Browser ist da, die Adresse beginnt mit `https://`
- [ ] `/profil` direkt eingeben und F5 drücken — muss laden, nicht 404
- [ ] Login mit einem echten Firmenzugang funktioniert
- [ ] `/dokumente` zeigt die Liste, ein PDF lässt sich herunterladen
- [ ] Abmelden — danach ist `/dokumente` wieder gesperrt
- [ ] `https://deine-domain.ch/assets/` + PDF-Name liefert **kein** Dokument
- [ ] Video und Audio spielen ab
- [ ] Pi neu starten, danach läuft alles ohne Zutun weiter

## 9. Später aktualisieren

```bash
cd ~/Bewerbungsseite
git pull
npm ci && npm run build
cd server && npm ci
sudo systemctl restart bewerbungsseite
```

Ein **PDF** nachliefern braucht keinen Neustart — Datei nach
`server/dokumente/` kopieren, fertig. Ein neues **Vorschaubild** braucht einen
`sudo systemctl restart bewerbungsseite`, weil der Ordner beim Start eingelesen
wird.

---

## Wenn etwas nicht geht

**Login meldet Erfolg, `/dokumente` bleibt gesperrt** — die Seite läuft über
`http://` statt `https://`. Das Cookie hat das `Secure`-Flag und wird vom Browser
über unverschlüsselte Verbindungen verworfen. Der Tunnel muss laufen.

**502 von Cloudflare** — der Tunnel steht, der Express-Server nicht.
`systemctl status bewerbungsseite` prüfen.

**Dienst startet nicht** — meist ein Pfad in der `.service`-Datei oder ein zu
kurzes `SESSION_SECRET` (mindestens 32 Zeichen, sonst bricht der Server absichtlich
ab). Steht im `journalctl`.

**Alles 404 ausser der Startseite** — `npm run build` wurde nicht ausgeführt oder
ist fehlgeschlagen, `dist/` fehlt.
