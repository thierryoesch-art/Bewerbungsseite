import { useState } from "react"
import type { CSSProperties } from "react"

type SkillProps = {
    name: string
    level: number
    text: string
}

function Skill({ name, level, text }: SkillProps) {
  const [offen, setOffen] = useState(false)

  return (
    <li className="skill" style={{ '--level': `${level}%` } as CSSProperties}>
      <div className="skill__head">
        <span className="skill__name">{name}</span>
        <span className="skill__value">{level}%</span>
      </div>

      <div className="skill__bar">
        <div className="skill__fill" />
      </div>

    <div className={offen ? 'skill__more skill__more--offen' : 'skill__more'}>
        <p className="skill__text">{text}</p>
    </div>


      <button
        className="skill__toggle"
        onClick={() => setOffen(!offen)}
        aria-expanded={offen}
        aria-label="Beschreibung anzeigen"
      >
        <span className="skill__arrow" />
      </button>


    </li>
  )
}



function Skills() {
    return (
        <main className="wrap">
            <h1>Skills</h1>
            <div className="card">
                <h3>Webbentwicklung</h3>
                <ul className="skills">
                    <Skill name="TypeScript" level={80} text="Im Lehrbetrieb täglich im Einsatz." />
                    <Skill name="React" level={70} text="Diese Seite ist damit gebaut." />
                </ul>
            </div>



        </main>
    )
}

export default Skills