import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

import Profil from './pages/Profil'
import Skills from './pages/Skills'
import Interessen from './pages/Interessen'
import Projekte from './pages/Projekte'
import Ausbildung from './pages/Ausbildung'
import Einstellungen from './pages/Einstellungen'
import Login from './pages/Login'
import Dokumente from './pages/Dokumente'
import ParticlesWrapper from './components/ParticlesWrapper'
import { EinstellungenProvider } from './context/EinstellungenContext'
import Impressum from './pages/Impressum'


function Home() {
  return (
      <main className="hero-stage">
        <p className="eyebrow">Thierry Oeschs Bewerbungsseite</p>
        <h1>Herzlich willkommen</h1>
        <p>Mein Name ist Thierry Oesch,
          3. Lehrjahr als Informatiker EFZ Applikationsentwickler. <br/>
          Das ist meine Bewerbungsseite, auf der Sie alle wichtigen und relevanten Informationen über mich finden.
        </p>
        <h3>Viel Spass!</h3>
        <div className='home-grid'>
          <Link className="card card--klick card--profil" to="/profil">
          <h3 className='card__title'>Profil</h3>
          <p className='card__text'>Wer ist Thierry? <br/> Steckbrief, Hobbys etc.</p>
          </Link>
        
          <Link className="card card--klick card--projekte" to="/projekte">
          <h3 className='card__title'>Projekte</h3>
          <p className='card__text'>Was habe ich gemacht? <br/>Hier finden Sie alle Informatikprojekte, die ich umgesetzt habe.</p>
          </Link>

          <Link className="card card--klick card--einstellungen" to="/einstellungen">
          <h3 className='card__title'>Einstellungen</h3>
          <p className='card__text'>Was können Sie anpassen? <br/>Hintergrund, Navigation etc.</p>
          </Link>
        </div>
      </main>
  ) 
}

function SeitenKopf() {
  const [navOffen, setNavOffen] = useState(false)

  return (
          <header className="site-header">
            <Link className="brand" to="/">
              <span className='brand__sun' aria-hidden="true">
              </span>
              <span className='brand__label'>
                Thierry Oesch
              </span>

            </Link>

            <button
              className="nav-toggle"
              onClick={() => setNavOffen((offen) => !offen)}
              aria-expanded={navOffen}
              aria-controls="haupt-navigation"
              aria-label={navOffen ? 'Navigation schliessen' : 'Navigation öffnen'}
            >
              <span className="nav-toggle__strich" aria-hidden="true" />
              <span className="nav-toggle__strich" aria-hidden="true" />
              <span className="nav-toggle__strich" aria-hidden="true" />
            </button>

            <nav
              id="haupt-navigation"
              className={navOffen ? 'planet-nav planet-nav--offen' : 'planet-nav'}
              /* Klick auf einen Planeten klappt das Menü wieder zu */
              onClick={() => setNavOffen(false)}
            >
              {/* innerer Wrapper: über ihn läuft die Auf-/Zu-Animation */}
              <div className="planet-nav__inner">
              <Link className="nav-pill nav-pill--mercury" to="/profil">
              <span className="nav-pill__label">
                Profil
              </span>
              </Link>
              <Link className="nav-pill nav-pill--venus" to="/skills">
              <span className="nav-pill__label">
                Skills
              </span>
              </Link>
              <Link className="nav-pill nav-pill--earth" to="/interessen">
              <span className="nav-pill__label">
                Interessen
              </span>
              </Link>
              <Link className="nav-pill nav-pill--mars" to="/projekte">
              <span className="nav-pill__label">
                Projekte
              </span>
              </Link>
              <Link className="nav-pill nav-pill--jupiter" to="/ausbildung">
              <span className="nav-pill__label">
                Ausbildung
              </span>
              </Link>
              <Link className="nav-pill nav-pill--saturn" to="/dokumente">
              <span className="nav-pill__label">
                Dokumente
              </span>
              </Link>
              <Link className="nav-pill nav-pill--uranus" to="/einstellungen">
              <span className="nav-pill__label">
                Einstellungen
              </span>
              </Link>
              <Link className="nav-pill nav-pill--neptune" to="/login">
              <span className="nav-pill__label">
                Login
              </span>
              </Link>
              </div>
            </nav>
          </header>
  )
}

/* Der key am Wrapper wechselt mit der URL. Dadurch baut React das
   Element bei jedem Seitenwechsel neu auf und die Einblend-Animation
   startet zuverlässig neu — auch wenn zweimal dieselbe Seite kommt. */
function SeitenInhalt() {
  const ort = useLocation()

  return (
    <div className="seiten-wechsel" key={ort.pathname}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/interessen" element={<Interessen />} />
        <Route path="/projekte" element={<Projekte />} />
        <Route path="/ausbildung" element={<Ausbildung />} />
        <Route path="/dokumente" element={<Dokumente />} />
        <Route path="/einstellungen" element={<Einstellungen />} />
        <Route path="/login" element={<Login />} />
        <Route path='/impressum' element={(<Impressum/>)} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <EinstellungenProvider>
      <BrowserRouter>
        <div className="page-shell">
          <ParticlesWrapper>
          <SeitenKopf />

          <SeitenInhalt />
          <footer className='site-footer'>
            <div className='site-footer__inner'>

              <div className='site-footer__brand'>
                <span className='site-footer__sun' aria-hidden="true"></span>
                <span className='site-footer__name'>Thierry Oesch</span>
              </div>
              <nav className='site-footer__nav' aria-label='Fusszeile'>
                <Link className='site-footer__link' to="/profil">Profil
                </Link>
                <Link className='site-footer__link' to="/projekte">Projekte
                </Link>
                <Link className='site-footer__link' to="/ausbildung">Ausbildung
                </Link>
                <Link className='site-footer__link' to="/impressum">Impressum
                </Link>
              </nav>

              <div className='site-footer__kontakt'>
                <a className='site-footer__link' href='mailto:thierry.oesch09@gmail.com?subject=Anfrage%20über%20deine%20Webseite'>E-Mail</a>
                <a className='site-footer__link' href='https://github.com/thierryoesch-art' target='_blank' rel='noopener noreferrer'>GitHub</a>
              </div>

            </div>

            <p className='site-footer__copy'>
               © {new Date().getFullYear()} Thierry Oesch
            </p>
            
            
      
          </footer>
          </ParticlesWrapper>
        </div>
      </BrowserRouter>
    </EinstellungenProvider>


  )
}

export default App