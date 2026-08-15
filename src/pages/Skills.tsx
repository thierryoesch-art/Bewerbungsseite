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
        <main className="wrap seite seite--skills">
            <h1>Skills</h1>
            <div className="card">
                <h3>Webentwicklung</h3>
                <ul className="skills">
                    <Skill name="HTML" level={80} text="HTML habe ich in der Schule schon etliche Male gebraucht. Wir hatten ganze Module (Fächer) über HTML und CSS. In HTML habe ich deutlich am meisten Erfahrung." />
                    <Skill name="CSS" level={80} text="CSS habe ich schon genau so viel gebraucht wie HTML. Auch diese Seite hat sehr viele CSS-Elemente." />
                    <Skill name="JavaScript" level={50} text="Mit JavaScript habe ich mich nicht gross auseinandergesetzt. Ich kenne nur die Grundlagen für Websites, alleine benutzt habe ich es noch nicht." />
                    <Skill name="TypeScript" level={65} text="TypeScript habe ich im letzten Schuljahr regelmässig gebraucht. Trotzdem finde ich, dass ich meine Fähigkeiten in TypeScript noch erweitern kann." />
                    <Skill name="React" level={60} text="React habe ich parallel zu TypeScript gelernt. Abgesehen von dieser Webseite habe ich noch eine weitere in einem üK damit gemacht." />
                </ul>

                <h3>Mobile Entwicklung</h3>
                <ul className="skills">
                    <Skill name="C#" level={40} text="Wir haben im 2. Semester ein Spiel mit C# gemacht. Da mir das Programmieren noch recht fremd war, hatte ich Mühe, es zu verstehen. Meine Erfahrung damit ist noch begrenzt." />
                    <Skill name=".NET MAUI" level={40} text="Wir hatten ein Modul über dieses Framework. Aber ich hatte Probleme damit. Das war mein erster Eindruck der Mobile-Entwicklung." />
                </ul>
                <h3>Programmiersprachen</h3>
                <ul className="skills">
                    <Skill name="Java" level={30} text="Mit Java hatte ich noch keinen wirklichen Kontakt. Wir haben uns im Unterricht JavaFX angeschaut, da stand aber nicht die eigene Entwicklung im Vordergrund. Java ist aber eine Sprache, die ich in Zukunft unbedingt beherrschen möchte." />
                    <Skill name="Python" level={40} text="Python ist meine Lieblingssprache. Sie ist sehr anfängerfreundlich, was mich zurzeit sehr anspricht. Leider haben wir im Unterricht nie etwas mit Python gemacht. Mein Wissen darüber habe ich mir daher selbst angeeignet." />
                </ul>

                <h3>Datenbanken</h3>
                <ul className="skills">
                    <Skill name="MySQL" level={70} text="MySQL haben wir in einem Modul und in einem üK angeschaut. Ich habe es erst richtig verstanden, als wir es im üK von null an aufgebaut haben." />
                    <Skill name="MongoDB" level={40} text="MongoDB habe ich nur sehr kurz angeschaut. Ich habe mich nicht vertieft, aber die Grundlagen gut verstanden." />
                    <Skill name="Neo4j" level={70} text="Mit Neo4j habe ich mich tiefer befasst. Ich habe viele Aufgaben gelöst und eine ganze Beispiel-Datenbank aufgebaut." />
                </ul>

                <h3>Tools</h3>
                <ul className="skills">
                    <Skill name="GitLab/Hub" level={80} text="GitLab brauchen wir schon seit dem ersten Jahr, aber ich habe erst in diesem Jahr die ganze Mächtigkeit davon erkannt. Ich benutze GitHub auch oft privat für Projekte." />
                    <Skill name="VS Code" level={90} text="VS Code ist meine Lieblings-IDE. Ich brauche sie seit Beginn der Ausbildung und arbeite immer noch mit Freude damit. Weil ich schon so lange mit VS Code arbeite, habe ich auch viel Erfahrung damit." />
                    <Skill name="VS" level={55} text="Gegenüber VS Code mag ich VS nicht besonders. Es kommt mir zu unübersichtlich vor. Daher habe ich VS aktiv vermieden und versucht, so viel wie möglich mit VS Code zu arbeiten." />
                    <Skill name="JetBrains-Applikationen" level={50} text="Ich hatte nie gross einen Grund, JetBrains-Applikationen zu brauchen. Diejenigen, die ich gebraucht habe, sind IntelliJ, WebStorm und PyCharm." />
                    <Skill name="Android Studio" level={10} text="Ich habe Android Studio nur einmal in einem üK gebraucht für einen Emulator. Sonst habe ich es noch nie verwendet." />
                </ul>
            </div>



        </main>
    )
}

export default Skills