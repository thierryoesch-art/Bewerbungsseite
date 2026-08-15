//noch das bild Importieren
import ich from "../assets/ich.jpg"


function Profil() {
  return (
    <main className="wrap seite seite--profil">
      <h1>Profil</h1>
      <p>Hier lernen Sie mich kennen.</p>
      <div className="card">
        <div className=" steckbrief">
          <h3 className="card__title steckbrief__title">
            Steckbrief
          </h3>
          <dl className="steckbrief__daten">
            <dt>Name:</dt>
            <dd>Thierry Oesch</dd>

            <dt>Alter:</dt>
            <dd>17</dd>

            <dt>Geburtstag:</dt>
            <dd>13.02.2009</dd>

            <dt>Ausbildung:</dt>
            <dd>Informatiker EFZ Applikationsentwickler</dd>

            <dt>Lehrjahr:</dt>
            <dd>3. Lehrjahr</dd>

            <dt>Nationalität:</dt>
            <dd>Schweizer, Luxemburger</dd>

            <dt>Hobbys:</dt>
            <dd>Magie, Bogenschiessen, Rudern, Gamen</dd>

            <dt>Lieblingsfächer:</dt>
            <dd>Sport, Technik und Umwelt</dd>
          </dl>

          <img className="steckbrief__foto" src={ich} alt="Thierry Oesch"/>
        </div>

        <div className="profil-text">
          <h3 className="card__title steckbrief__title">Über Mich</h3>

          <p className="steckbrief__text">
            Mein Name ist Thierry Oesch, ich bin 17 Jahre alt und wurde am 13.02.2009 geboren.
            Zurzeit absolviere ich die IMS mit Schwerpunkt Informatik an der bwd Bern und
            besuche die gibb Berufsschule Bern. Ein grosser Vorteil der IMS ist für mich, dass
            ich nach meiner Ausbildung zusätzlich die Berufsmaturität erhalte.
          </p>

          <p className="steckbrief__text">
            Ich habe eine jüngere Schwester und bin in einer Familie aufgewachsen, in der
            handwerkliches Arbeiten eine wichtige Rolle spielt. Meine Eltern sind beide
            Klavierstimmer. Dadurch bin ich schon früh mit dem Bauen, Reparieren und dem
            genauen Arbeiten in Kontakt gekommen.
          </p>

          <p className="steckbrief__text">
            Schon als Kind hatte ich Freude daran, Dinge zu bauen und herauszufinden, wie sie
            funktionieren. Gleichzeitig hat mich logisches Denken immer interessiert. Mit der
            Zeit wurde daraus mein Interesse an der Informatik. Besonders gefällt mir, dass ich
            beim Programmieren eigene Ideen umsetzen, Probleme lösen und dabei ständig Neues
            lernen kann.
          </p>

          <p className="steckbrief__text">
            Heute möchte ich diese Interessen weiterentwickeln und mir während meiner
            Ausbildung ein solides Wissen in der Applikationsentwicklung aufbauen.
          </p>

          <h3 className="card__title steckbrief__title">Warum Informatik?</h3>

          <p className="steckbrief__text">
            Schon seit ich klein bin, hat mich das Bauen und Erschaffen von Dingen interessiert.
            Ich hatte schon immer Freude daran, herauszufinden, wie etwas funktioniert und wie
            man aus einzelnen Teilen etwas Neues entstehen lassen kann. Dabei habe ich gemerkt,
            dass mir besonders logisches Denken und das Lösen von Problemen liegen.
          </p>

          <p className="steckbrief__text">
            Als ich etwa 7 Jahre alt war, hatte ich das erste Mal richtig Kontakt mit dem
            Programmieren: Scratch. Ausserdem habe ich damals mit einem Kollegen angefangen,
            Binär zu lernen.
          </p>

          <p className="steckbrief__text">
            In der Oberstufe habe ich das Freifach Robotik besucht, und in der 8. Klasse einen
            Kurs zu Elektronik und Schaltkreisen an der Technischen Fachschule Bern gemacht.
          </p>

          <p className="steckbrief__text">
            Genau diese Kombination finde ich in der Informatik wieder. Beim Programmieren geht
            es nicht nur darum, Code zu schreiben, sondern auch darum, Probleme zu analysieren,
            Lösungen zu entwickeln und diese Schritt für Schritt umzusetzen. Besonders spannend
            finde ich, dass man mit eigenen Ideen etwas erschaffen kann, das am Ende tatsächlich
            funktioniert.
          </p>

          <p className="steckbrief__text">
            Deshalb habe ich mich für die Ausbildung zum Informatiker EFZ Applikationsentwicklung
            entschieden. Ich möchte lernen, eigene Anwendungen zu entwickeln, mein Wissen ständig
            erweitern und verstehen, was hinter den Programmen und Systemen steckt, die wir jeden
            Tag benutzen.
          </p>

        </div>
      </div>
    </main>
  )
}

export default Profil