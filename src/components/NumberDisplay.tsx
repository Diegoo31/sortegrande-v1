import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(75, 51, 255, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 20px rgba(75, 51, 255, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(75, 51, 255, 0);
  }
`

const Container = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NumberContainer = styled.div`
  width: 200px;
  height: 200px;
  background: var(--gradient);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 20px rgba(75, 51, 255, 0.3);
  animation: ${pulse} 2s infinite;
`

const Message = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--dark-color);
  opacity: 0.8;
`

interface NumberDisplayProps {
  number: number
}

const NumberDisplay = ({ number }: NumberDisplayProps) => {
  const [animatedDigits, setAnimatedDigits] = useState<number[]>([])
  const [animationComplete, setAnimationComplete] = useState(false)
  
  useEffect(() => {
    setAnimationComplete(false)
    
    // Gerar alguns números aleatórios antes de exibir o número real
    const tempDigits = []
    const iterations = 10
    
    for (let i = 0; i < iterations; i++) {
      // O último número é o número real
      if (i === iterations - 1) {
        tempDigits.push(number)
      } else {
        // Gerar números aleatórios dentro do mesmo intervalo de dígitos
        const min = Math.pow(10, number.toString().length - 1)
        const max = Math.pow(10, number.toString().length) - 1
        tempDigits.push(Math.floor(Math.random() * (max - min + 1)) + min)
      }
    }
    
    let count = 0
    const interval = setInterval(() => {
      setAnimatedDigits([tempDigits[count]])
      count++
      
      if (count >= tempDigits.length) {
        clearInterval(interval)
        setAnimationComplete(true)
      }
    }, 100)
    
    return () => clearInterval(interval)
  }, [number])
  
  return (
    <Container>
      <NumberContainer>
        {animatedDigits[0] || number}
      </NumberContainer>
      <Message>
        {animationComplete 
          ? 'Seu número da sorte foi gerado!'
          : 'Sorteando seu número...'}
      </Message>
    </Container>
  )
}

export default NumberDisplay 