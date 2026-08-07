//noch das bild Importieren

function Profil() {
  return (
    <main className="wrap">
      <h1>Profil</h1>
      <div className="card steckbrief">
        <h3 className="card__title steckbrief__title">
          Steckbrief
        </h3>
        <dl className="steckbrief__daten">
          <dt>Name:</dt>
          <dd>Thierry Oesch</dd>

          <dt>Ausbildung:</dt>
          <dd>Informatiker EFZ Applikationsentwickler</dd>

          <dt>Lehrjahr:</dt>
          <dd>3. Lehrjahr</dd>
        </dl>

        <img className="steckbrief__foto" src="foto" alt="Thierry Oesch"/>
      </div>
    </main>
  )
}

export default Profil