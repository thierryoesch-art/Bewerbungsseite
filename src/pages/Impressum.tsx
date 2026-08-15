
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
        <h3 className="card__title">Urheberrecht</h3>
        <p className="card__text">Alle Inhalte dieser Website, seien es Texte, Dokumente oder Bilder, sind von mir erstellt worden, mit Ausnahme der Bilder von Planeten in der Navigation.
            Diese stammen von der NASA und sind gemeinfrei laut <a className="impressum__link" href="https://www.nasa.gov/nasa-brand-center/images-and-media/" target="_blank" rel="noopener noreferrer">NASA Images and Media</a>.
        </p>
      </section>
    </main>
  )
}

export default Impressum