import { useState } from 'react'
import styled from 'styled-components'
import { Buyer } from '../App'
import { validateName, validateContact, sanitizeText } from '../utils/validators'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`

const ModalContent = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%);
    border-radius: 16px;
    z-index: -1;
  }
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 0.9rem;
  opacity: 0.9;
`

const Input = styled.input<{ hasError?: boolean }>`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid ${props => props.hasError 
    ? 'rgba(255, 77, 77, 0.5)' 
    : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 8px;
  padding: 0.8rem 1rem;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#ff4d4d' : '#4361ee'};
    box-shadow: 0 0 0 2px ${props => props.hasError 
      ? 'rgba(255, 77, 77, 0.3)' 
      : 'rgba(67, 97, 238, 0.3)'};
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  color: white;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  border: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(67, 97, 238, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const TicketNumber = styled.span`
  color: #4361ee;
  font-weight: bold;
`

const ErrorMessage = styled.div`
  color: #ff4d4d;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`

interface BuyerModalProps {
  ticketNumber: number;
  onAddBuyer: (buyer: Buyer) => void;
  onClose: () => void;
}

const BuyerModal = ({ ticketNumber, onAddBuyer, onClose }: BuyerModalProps) => {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({})
  
  const validateForm = (): boolean => {
    const newErrors: { name?: string; contact?: string } = {};
    
    if (!validateName(name)) {
      newErrors.name = 'Nome inválido. Use pelo menos 3 caracteres e apenas letras.';
    }
    
    if (!validateContact(contact)) {
      newErrors.contact = 'Contato inválido. Informe um telefone ou e-mail válido.';
    }
    
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onAddBuyer({
      id: Date.now().toString(),
      name: sanitizeText(name.trim()),
      contact: sanitizeText(contact.trim())
    });
    
    setName('');
    setContact('');
  };
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            Comprar número <TicketNumber>{ticketNumber}</TicketNumber>
          </ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="buyer-name">Nome do Comprador</Label>
            <Input
              id="buyer-name"
              type="text"
              placeholder="Digite o nome completo"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              hasError={!!errors.name}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="buyer-contact">Contato</Label>
            <Input
              id="buyer-contact"
              type="text"
              placeholder="Digite o telefone ou email"
              value={contact}
              onChange={e => setContact(e.target.value)}
              required
              hasError={!!errors.contact}
            />
            {errors.contact && <ErrorMessage>{errors.contact}</ErrorMessage>}
          </FormGroup>
          
          <SubmitButton type="submit">
            Confirmar Compra
          </SubmitButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  )
}

export default BuyerModal 