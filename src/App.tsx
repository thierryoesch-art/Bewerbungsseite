import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
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


function Home() {
  return (
      <main className="hero-stage">
        <p className="eyebrow">Thierry Oesch's Bewerbungseite</p>
        <h1>Herzlich Willkommen</h1>
        <p>Mein Name ist Thierry Oesch, 
          3. Lehrjahr als Informatiker EFZ Applikationsentwickler
        </p>
        <h3>Viel Spass!</h3>
        <div className='home-grid'>
          <Link className="card card--klick card--profil" to="/profil">
          <h3 className='card__title'>Profil</h3>
          <p className='card__text'>sup</p>
          </Link>
        
          <Link className="card card--klick card--projekte" to="/projekte">
          <h3 className='card__title'>Projekte</h3>
          </Link>

          <Link className="card card--klick card--einstellungen" to="/einstellungen">
          <h3 className='card__title'>Einstellungen</h3>
          </Link>
        </div>

        <footer>
          
        </footer>
      </main>
  ) 
}

function App() {
  return (
    <BrowserRouter>
      <div className="page-shell">  
        <ParticlesWrapper>
        <header className="site-header">
          <Link className="brand" to="/">
            <span className='brand__sun' aria-hidden="true">
            </span>
            <span className='brand__label'>
              Thierry Oesch
            </span>
            
          </Link>

          <nav className="planet-nav">
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
          </nav>
        </header>

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
        </Routes>
        </ParticlesWrapper>
      </div>
    </BrowserRouter>
  )
}

export default App