import type { ReactNode } from 'react'
import Particles from './Particles'
import './Particles.css'
import { useEinstellungen } from '../context/EinstellungenContext'

type ParticlesWrapperProps = {
  children: ReactNode
  className?: string
  contentClassName?: string
}

function ParticlesWrapper({ children, className = '', contentClassName = '' }: ParticlesWrapperProps) {

  const { einstellungen } = useEinstellungen()

  const anzahl = { aus: 0, wenig: 60, normal: 100, viel: 500 }[einstellungen.sterne]
  const bewegt = einstellungen.bewegung === 'an'

  return (
    <div className={`hero-with-particles ${className}`.trim()}>
      {anzahl > 0 && (
        <Particles
          particleColors={['#ffffff']}
          particleCount={anzahl}
          particleSpread={10}
          speed={bewegt ? 0.1 : 0}
          particleBaseSize={80}
          moveParticlesOnHover={bewegt}
          alphaParticles={false}
          disableRotation={!bewegt}
        />
      )}
      <div className={`particles-content ${contentClassName}`.trim()}>{children}</div>
    </div>
  )
}

export default ParticlesWrapper
