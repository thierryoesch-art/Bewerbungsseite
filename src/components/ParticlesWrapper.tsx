import type { ReactNode } from 'react'
import Particles from './Particles'
import './Particles.css'

type ParticlesWrapperProps = {
  children: ReactNode
  className?: string
  contentClassName?: string
}

function ParticlesWrapper({ children, className = '', contentClassName = '' }: ParticlesWrapperProps) {
  return (
    <div className={`hero-with-particles ${className}`.trim()}>
      <Particles
        particleColors={['#ffffff']}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={80}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
      <div className={`particles-content ${contentClassName}`.trim()}>{children}</div>
    </div>
  )
}

export default ParticlesWrapper
