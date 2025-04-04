import { useState } from 'react'
import styled from 'styled-components'

const NavbarContainer = styled.nav`
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const LogoIcon = styled.div`
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  -webkit-text-fill-color: white;
`

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const NavLink = styled.a`
  color: #f8f9fa;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    color: #4361ee;
  }
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`

const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 80%;
  max-width: 300px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease;
  z-index: 200;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`

const MobileLink = styled.a`
  color: #f8f9fa;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.2rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  return (
    <NavbarContainer>
      <Logo>
        <LogoIcon>S</LogoIcon>
        Sorte Grande 3D
      </Logo>
      
      <NavLinks>
        <NavLink href="#inicio">Início</NavLink>
        <NavLink href="#como-funciona">Como Funciona</NavLink>
        <NavLink href="#contato">Contato</NavLink>
      </NavLinks>
      
      <MobileMenuButton onClick={() => setIsMenuOpen(true)}>☰</MobileMenuButton>
      
      {isMenuOpen && (
        <MobileMenu isOpen={isMenuOpen}>
          <CloseButton onClick={() => setIsMenuOpen(false)}>&times;</CloseButton>
          <MobileLink href="#inicio" onClick={() => setIsMenuOpen(false)}>Início</MobileLink>
          <MobileLink href="#como-funciona" onClick={() => setIsMenuOpen(false)}>Como Funciona</MobileLink>
          <MobileLink href="#contato" onClick={() => setIsMenuOpen(false)}>Contato</MobileLink>
        </MobileMenu>
      )}
    </NavbarContainer>
  )
}

export default Navbar 