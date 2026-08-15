
function Impressum() {
  return (
    <main className="wrap">
      <h1>Impressum</h1>

      <section className="card impressum__block">
        <h3 className="card__title">Verantwortlich für diese Website</h3>
        <dl className="impressum__liste">
          <dt>Name</dt>
          <dd>Thierry Oesch</dd>

          <dt>Adresse</dt>
          <dd>3600 Thun</dd>

          <dt>E-Mail</dt>
          <dd>
            <a className="impressum__link" href="mailto:thierry.oesch09@gmail.com">
              thierry.oesch09@gmail.com
            </a>
          </dd>
        </dl>
      </section>

      <section className="card impressum__block">
        <h3 className="card__title">Zweck der Website</h3>
        <p className="card__text">Dies ist die Website von Thierry Oesch. 
            Ihr Zweck liegt in meiner Bewerbung nach dem 3. Ausbildungsjahr als Informatiker EFZ Applikationsentwickler. 
            Die Ausbildung absolviere ich als IMSler an der bwd Bern sowie an der gibb Berufsschule Bern. 
            Diese Website ist im Rahmen des Unterrichts an der bwd Bern entstanden.</p>
      </section>

      <section className="card impressum__block">
        <h3 className="card__title">Haftungsausschluss</h3>
        
         <h4 className="impressum__untertitel">Eigene Inhalte</h4>
         <p className="card__text">Alle Inhalte dieser Website wurden mit grösster Sorgfalt erstellt.
            Trotzdem kann ich keine Gewähr für Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen. 
            Ich behalte mir vor, Inhalte zu ändern oder zu ergänzen.
        </p>
            
        <h4 className="impressum__untertitel">Externe Links</h4>
        <p className="card__text">Für Links zu anderen Websites wie z. B. GitHub übernehme ich keine Verantwortung. 
            Die Verantwortung für die Inhalte liegt bei den Betreibern der jeweiligen Seiten.
        </p>
      </section>

      <section className="card impressum__block">
        <h3 className="card__title">Datenschutz</h3>

        <p className="card__text">
          Der Schutz Ihrer Daten ist mir wichtig. Diese Website erhebt so wenige Daten wie
          möglich. Verantwortlich für die Bearbeitung ist die oben genannte Person. Es gilt
          das revidierte Schweizer Datenschutzgesetz (DSG).
        </p>

        <h4 className="impressum__untertitel">Beim Besuch der Website</h4>
        <p className="card__text">
          Die Website wird auf einem Server bei mir zu Hause betrieben und über einen Dienst
          von Cloudflare im Internet erreichbar gemacht. Damit die Seite überhaupt ausgeliefert
          werden kann, verarbeitet Cloudflare technisch notwendige Verbindungsdaten wie Ihre
          IP-Adresse. Der Server selbst führt kein Besucherprotokoll; nur bei technischen
          Fehlern wird eine Meldung im Systemprotokoll abgelegt.
        </p>
        <p className="card__text">
          Zum Schutz vor dem automatischen Durchprobieren von Passwörtern wird Ihre IP-Adresse
          bei einer fehlgeschlagenen Anmeldung höchstens 15 Minuten im Arbeitsspeicher gezählt.
          Danach wird sie verworfen. Sie wird nicht gespeichert und nicht weitergegeben.
        </p>

        <h4 className="impressum__untertitel">Beim Login für Unternehmen</h4>
        <p className="card__text">
          Der geschützte Bereich mit meinen Bewerbungsunterlagen ist nur mit Zugangsdaten
          erreichbar, die ich persönlich vergebe. Ihr Passwort wird nie im Klartext gespeichert,
          sondern ausschliesslich als nicht rückrechenbarer Hashwert.
        </p>
        <p className="card__text">
          Nach erfolgreicher Anmeldung wird ein technisch notwendiges Sitzungscookie gesetzt.
          Es enthält den Benutzernamen und ein Ablaufdatum, ist acht Stunden gültig und kann
          von JavaScript nicht ausgelesen werden. Es dient allein dazu, Sie während des Besuchs
          wiederzuerkennen — es findet keine Auswertung Ihres Verhaltens statt. Sie können es
          jederzeit über «Abmelden» löschen; beim Schliessen des Browsers verfällt es ohnehin.
          Die Zugangsdaten selbst lösche ich, sobald das Bewerbungsverfahren abgeschlossen ist.
        </p>

        <h4 className="impressum__untertitel">Einstellungen</h4>
        <p className="card__text">
          Ihre Auswahl unter «Einstellungen» (Hintergrund, Schriftgrösse und Ähnliches) wird im
          lokalen Speicher Ihres Browsers abgelegt, damit sie beim nächsten Besuch erhalten
          bleibt. Diese Angaben verlassen Ihr Gerät nicht und erreichen mich nie. Sie können sie
          jederzeit über die Einstellungen Ihres Browsers löschen.
        </p>

        <h4 className="impressum__untertitel">Keine Auswertung, keine Weitergabe</h4>
        <p className="card__text">
          Diese Website verwendet keine Analyse- oder Trackingdienste, keine Werbung und keine
          Schriften oder Skripte von fremden Servern. Es werden keine Daten an Dritte verkauft
          oder für andere Zwecke als die Bewerbung verwendet. Verlinkte Websites wie GitHub sind
          davon nicht erfasst — dort gelten die Bestimmungen der jeweiligen Anbieter.
        </p>

        <h4 className="impressum__untertitel">Ihre Rechte</h4>
        <p className="card__text">
          Sie haben das Recht auf Auskunft über die Sie betreffenden Daten sowie auf deren
          Berichtigung oder Löschung. Eine kurze Nachricht an die oben angegebene E-Mail-Adresse
          genügt.
        </p>

        <p className="card__text">Stand: August 2026</p>
      </section>

      <section className="card impressum__block">
        <h3 className="card__title">Urheberrecht</h3>
        <p className="card__text">Alle Inhalte dieser Website, seien es Texte, Dokumente oder Bilder, sind von mir erstellt worden, mit Ausnahme der Bilder von Planeten in der Navigation.
            Diese stammen von der NASA und sind gemeinfrei laut <a className="impressum__link" href="https://www.nasa.gov/nasa-brand-center/images-and-media/" target="_blank" rel="noopener noreferrer">NASA Images and Media</a>.
        </p>
      </section>
    </main>
  )
}

export default Impressum