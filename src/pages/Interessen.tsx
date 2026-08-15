//bilder inportieren
import gaming from "../assets/Gaming.jpg"
import galaxie from "../assets/Galaxie.jpg"
import magic from "../assets/Magic.jpg"
import car from "../assets/Car.jpg"
import geraet from "../assets/geraet.jpg"
import klavier from "../assets/klavier.jpg"

// Audio: Datei in src/assets/ legen, dann diese Zeile einkommentieren
// import klavierAudio from "../assets/klavier.mp3"

type Interesse = {
    titel: string
    bild: string
    text: string
    audio?: string
    audioTitel?: string
}

const interessen: Interesse[] = [
    {
        titel: 'Astronomie',
        bild: galaxie, 
        text: "Wie man an meiner Webseite unschwer erkennen kann, habe ich eine Begeisterung für unser Universum. Ich liebe den unbekannten Teil der Astronomie und wie gross unsere Welt ist und wie klein wir sind. Dieses Interesse habe ich seit der 8. Klasse. Seitdem bin ich auch einem Astronomie-Club beigetreten, der jeden Monat einen Vortrag über ein Thema hält, wie z. B. die Sonne. Ich bin sehr interessiert an der Physik von Sternen und anderen Himmelskörpern. Eine grosse Rolle spielen da natürlich Schwarze Löcher, die Anomalien des Universums."
    },
    {
        titel: "Gaming", 
        bild: gaming, 
        text: "Gaming gehört zu meinen grössten Hobbys. Ich spiele gerne verschiedene Spiele und finde besonders die Welten, Geschichten und Spielmechaniken interessant. Durch meine Ausbildung in der Informatik interessiert mich auch immer mehr, was technisch hinter einem Spiel steckt und wie aus Code eine ganze Spielwelt entstehen kann. Gaming ist für mich ausserdem eine gute Möglichkeit, abzuschalten und Zeit mit Freunden zu verbringen."
    },
    {
        titel: "Magic", 
        bild: magic, 
        text: "Seit der 8. Klasse beschäftige ich mich mit Kartenmagie. Ich bin zwar kein Profi, konnte aber bereits bei verschiedenen Shows mit anderen Magiern auftreten, unter anderem in Zürich, Bern und Basel. Auch bei uns in Thun hatte ich schon die Möglichkeit, in der Werkstatt aufzutreten. Zusätzlich mache ich jedes Jahr an Weihnachten kleine Shows für meine Familie. Besonders gefällt mir an der Magie, dass man Menschen mit etwas überraschen kann, das sie nicht erwarten – und die Fingerfertigkeit, die dafür nötig ist."
    },
    {
        titel: "Autos", 
        bild: car, 
        text: "Autos haben mich schon seit meiner Kindheit interessiert. Besonders begeistert mich die Marke Porsche und die Technik, die hinter modernen Fahrzeugen steckt. Ich schraube auch gerne selbst an Autos und mache kleinere Arbeiten, bei denen ich mehr über die Technik lernen kann. Dabei finde ich es spannend zu verstehen, wie die verschiedenen Teile zusammenspielen und ein Auto am Ende funktioniert. Ich bin immer wieder beeindruckt, wie komplex ein Auto aufgebaut ist."
    },
    {
        titel: "Klavier",
        bild: klavier,
        text: "Meine Eltern sind beide Klavierstimmer, also hatte ich schon früh Kontakt mit Klavieren. Trotzdem spielt in meiner Familie niemand wirklich Klavier. Ich habe nur eine Zeit lang Unterricht genommen und in letzter Zeit wieder ein kleines Interesse entwickelt. Aber ich übe nicht regelmässig, nur wenn ich gerade Lust habe.",
        // audio: klavierAudio,   <- einkommentieren, sobald die Aufnahme da ist
        audioTitel: "Eine kurze Aufnahme von mir am Klavier"
    },
    {
        titel: "Geräte",
        bild: geraet,
        text: "Was ich in meiner Freizeit gerne mache, ist elektronische Geräte auseinanderzubauen. Zum Beispiel habe ich schon meinen Nintendo 2DS auseinandergebaut (der funktioniert immer noch) oder mein zweites Handy im Bild links (funktioniert auch immer noch, ausser der Frontkamera). Das Interesse begann aber mit Uhren. Ich bin immer noch begeistert vom Innenleben von Geräten und Uhren. Ich finde es faszinierend, wie das alles funktioniert."
    }
]
function Interessen() {
    return (
        <main className="wrap seite seite--interessen">
            <h1>Interessen</h1>
            <p>Ein paar Interessen ausserhalb der Informatik</p>
             <ul className="interessen">
                {interessen.map((i) => (
                    <li className="card interesse" key={i.titel}>
                        <img className="interesse__bild" src={i.bild} alt="" />

                        <div>
                            <h3 className="card__title">{i.titel}</h3>
                            <p className="card__text">{i.text}</p>

                            {i.audio && (
                                <figure className="interesse__audio">
                                    <figcaption>{i.audioTitel}</figcaption>
                                    <audio controls preload="none" src={i.audio}>
                                        Ihr Browser kann diese Audiodatei nicht abspielen.
                                    </audio>
                                </figure>
                            )}
                        </div>
                    </li>
                ))}
             </ul>   
        </main>
    )

}

export default Interessen
