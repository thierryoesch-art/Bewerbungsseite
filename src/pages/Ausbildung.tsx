
const stationen = [
  { schule: 'Primarschule', zeit: '2013 – 2019', text: '...' },
  { schule: 'Sekundarschule', zeit: '2019 – 2022', text: '...' },
  { schule: 'Lehre als Informatiker EFZ', zeit: '2023 – heute', text: '...' },
]

function Ausbildung() {
  return (
    <main className="wrap">
      <h1>Ausbildung</h1>

      <div className="zeitstrahl">
        <svg
          className="zeitstrahl__linie"
          viewBox="0 0 100 900"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M 50 0
                   C 50 50, 55 100, 55 150
                   C 55 200, 52.5 250, 50 300
                   C 47 370, 45 400, 45 450
                   C 45 500, 47 550, 50 600
                   C 52.5 650, 55 700, 55 750
                   C 55 800, 52 850, 50 900" />

          <line className="zeitstrahl__ast" x1="50" y1="150" x2="55" y2="150" />
          <line className="zeitstrahl__ast" x1="45" y1="450" x2="50" y2="450" />
          <line className="zeitstrahl__ast" x1="50" y1="750" x2="55" y2="750" />
        </svg>

        <ol className="zeitstrahl__liste">
          {stationen.map((s) => (
            <li className="zeitstrahl__eintrag" key={s.schule}>
              <div className="card station">
                <p className="station__zeit">{s.zeit}</p>
                <h3 className="card__title">{s.schule}</h3>
                <p className="card__text">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}

export default Ausbildung