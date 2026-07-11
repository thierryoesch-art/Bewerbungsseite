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
        <header className="site-header">
          <Link className="brand" to="/">
            Bewerbungsseite
          </Link>

          <nav className="planet-nav">
            <Link className="nav-pill nav-pill--mercury" to="/profil">
              Profil
            </Link>
            <Link className="nav-pill nav-pill--venus" to="/Skills">
              Skills
            </Link>
            <Link className="nav-pill nav-pill--earth" to="/Erfahrungen">
              Erfahrungen
            </Link>
            <Link className="nav-pill nav-pill--mars" to="/Projekte">
              Projekte
            </Link>
            <Link className="nav-pill nav-pill--jupiter" to="/Aussbildung">
              Aussbildung
            </Link>
            <Link className="nav-pill nav-pill--saturn" to="/Kontakt">
              Kontakt
            </Link>
            <Link className="nav-pill nav-pill--uranus" to="/Zeugnisse">
              Zeugnisse
            </Link>
            <Link className="nav-pill nav-pill--neptune" to="/CV">
              CV
            </Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/skills" element={<Skills />} />        
          <Route path="/erfahrungen" element={<Erfahrungen />} />   
          <Route path="projekte" element={<Projekte />} />
          <Route path="/aussbildung" element={<Aussbildung />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/zeugnisse" element={<Zeugnisse />} />
          <Route path="/CV" element={<CV />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App