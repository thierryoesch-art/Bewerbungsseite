import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'

import Profil from './pages/Profil'
import Skills from './pages/Skills'
import Erfahrungen from './pages/Erfahrungen'
import Projekte from './pages/Projekte'
import Aussbildung from './pages/Aussbildung'
import Zeugnisse from './pages/Zeugnisse'
import CV from './pages/CV'
import Kontakt from './pages/Kontakt'
import ParticlesWrapper from './components/ParticlesWrapper'


function Home() {
  return (
      <main className="hero-stage">
        <p className="eyebrow">Portfolio in Aufbau</p>
        <h1>Raum fuer deine Bewerbung.</h1>
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
            Bewerbungsseite
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
            <Link className="nav-pill nav-pill--earth" to="/erfahrungen">
            <span className="nav-pill__label">
              Erfahrungen
            </span>
            </Link>
            <Link className="nav-pill nav-pill--mars" to="/projekte">
            <span className="nav-pill__label">
              Projekte
            </span>
            </Link>
            <Link className="nav-pill nav-pill--jupiter" to="/aussbildung">
            <span className="nav-pill__label">
              Aussblindung
            </span>
            </Link>
            <Link className="nav-pill nav-pill--saturn" to="/kontakt">
            <span className="nav-pill__label">
              Konntakt
            </span>
            </Link>
            <Link className="nav-pill nav-pill--uranus" to="/zeugnisse">
            <span className="nav-pill__label">
              Zeugnisse
            </span>
            </Link>
            <Link className="nav-pill nav-pill--neptune" to="/CV">
            <span className="nav-pill__label">
              CV
            </span>
            </Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/skills" element={<Skills />} />        
          <Route path="/erfahrungen" element={<Erfahrungen />} />   
          <Route path="/projekte" element={<Projekte />} />
          <Route path="/aussbildung" element={<Aussbildung />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/zeugnisse" element={<Zeugnisse />} />
          <Route path="/CV" element={<CV />} />
        </Routes>
        </ParticlesWrapper>
      </div>
    </BrowserRouter>
  )
}

export default App