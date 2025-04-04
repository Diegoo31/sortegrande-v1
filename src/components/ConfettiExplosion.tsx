import styled, { keyframes } from 'styled-components'
import { useEffect, useState } from 'react'

const confettiAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
`

const ConfettiContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
`

const ConfettiPiece = styled.div<{ 
  delay: string; 
  left: string; 
  size: string; 
  bg: string;
}>`
  position: absolute;
  top: -10px;
  background-color: ${props => props.bg};
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
  animation: ${confettiAnimation} 3s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  animation-delay: ${props => props.delay};
  left: ${props => props.left};
`

const ConfettiExplosion = () => {
  const [confetti, setConfetti] = useState<React.ReactNode[]>([])
  
  useEffect(() => {
    const colors = ['#FF5733', '#33A1FF', '#33FF57', '#F333FF', '#FFFF33']
    const pieces = []
    
    for (let i = 0; i < 100; i++) {
      const delay = `${Math.random() * 2}s`
      const left = `${Math.random() * 100}%`
      const size = `${Math.random() * 8 + 4}px`
      const color = colors[Math.floor(Math.random() * colors.length)]
      
      pieces.push(
        <ConfettiPiece 
          key={i}
          delay={delay}
          left={left}
          size={size}
          bg={color}
        />
      )
    }
    
    setConfetti(pieces)
  }, [])
  
  return <ConfettiContainer>{confetti}</ConfettiContainer>
}

export default ConfettiExplosion 