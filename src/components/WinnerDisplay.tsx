import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Buyer } from '../App'

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.7);
  }
  
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 15px rgba(255, 193, 7, 0);
  }
  
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
  }
`

const rotateY = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`

const WinnerContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: rgba(255, 193, 7, 0.1);
  border-radius: 16px;
  border: 1px solid rgba(255, 193, 7, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  animation: ${pulse} 2s infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 468px 468px;
    animation: ${shimmer} 3s linear infinite;
  }
`

const WinnerTitle = styled.h4`
  font-size: 1.2rem;
  margin: 0;
  color: #ffc107;
`

const NumberDisplay = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(255, 193, 7, 0.4);
  animation: ${rotateY} 3s ease-in-out infinite;
  margin: 0.5rem 0;
`

const BuyerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  width: 100%;
`

const BuyerLabel = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
`

const BuyerName = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #f8f9fa;
`

const BuyerContact = styled.span`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`

const Trophy = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`

interface WinnerDisplayProps {
  number: number;
  buyer: Buyer | null | undefined;
}

const WinnerDisplay = ({ number, buyer }: WinnerDisplayProps) => {
  const [showAnimation, setShowAnimation] = useState(false)
  
  useEffect(() => {
    setShowAnimation(true)
    const timer = setTimeout(() => {
      setShowAnimation(false)
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [number])
  
  return (
    <WinnerContainer>
      <Trophy>🏆</Trophy>
      <WinnerTitle>Número Sorteado</WinnerTitle>
      
      <NumberDisplay>
        {number}
      </NumberDisplay>
      
      {buyer ? (
        <BuyerInfo>
          <BuyerLabel>Ganhador</BuyerLabel>
          <BuyerName>{buyer.name}</BuyerName>
          <BuyerContact>{buyer.contact}</BuyerContact>
        </BuyerInfo>
      ) : (
        <BuyerInfo>
          <BuyerLabel>Número não vendido</BuyerLabel>
        </BuyerInfo>
      )}
    </WinnerContainer>
  )
}

export default WinnerDisplay 