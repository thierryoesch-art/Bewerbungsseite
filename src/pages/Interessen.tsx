//bilder inportieren
import uranus from "../assets/uranus.jpg"

const interessen = [
    {
        titel: 'Astronomie',
        bild: uranus, 
        text: "bla bla"
    },
    {
        titel: "Gaming", 
        bild: uranus, 
        text: "bla bla bla"
    }
]
function Interessen() {
    return (
        <main className="wrap">
            <h1>Interessen</h1>
            <p>das sind meine Interessen</p>
             <ul className="interessen">
                {interessen.map((i) => (
                    <li className="card interesse" key={i.titel}>
                        <img className="interesse__bild" src={i.bild} alt="" />

                        <div>
                            <h3 className="card__title">{i.titel}</h3>
                            <p className="card__text">{i.text}</p>
                        </div>
                    </li>
                ))}
             </ul>   
        </main>
    )

}

export default Interessen
