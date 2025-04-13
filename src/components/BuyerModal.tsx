import { useState } from 'react'
import styled from 'styled-components'
import { Buyer } from '../App'
import { validateName, validateContact, sanitizeText } from '../utils/validators'
import { useDialog } from '../contexts/DialogContext'

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
  padding: 1rem;
`

const ModalContent = styled.div`
  background: rgba(31, 33, 58, 0.95);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ModalTitle = styled.h3`
  color: white;
  font-size: 1.3rem;
  margin: 0;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  color: white;
  font-size: 0.9rem;
`

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
  }
`

const SubmitButton = styled.button`
  margin-top: 0.5rem;
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  color: white;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(67, 97, 238, 0.4);
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
  const { showAlert } = useDialog();
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
    e.preventDefault()
    
    if (name.trim() === '' || contact.trim() === '') {
      showAlert({
        message: 'Por favor, preencha todos os campos'
      });
      return
    }
    
    const buyer: Buyer = {
      id: Date.now().toString(),
      name: name.trim(),
      contact: contact.trim()
    }
    
    onAddBuyer(buyer)
    onClose()
  }
  
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
          <InputGroup>
            <Label htmlFor="name">Nome do Comprador</Label>
            <Input 
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Digite o nome completo"
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="contact">Contato</Label>
            <Input 
              id="contact"
              type="text"
              value={contact}
              onChange={e => setContact(e.target.value)}
              placeholder="Telefone ou e-mail"
              required
            />
          </InputGroup>
          
          <SubmitButton type="submit">
            Registrar Compra
          </SubmitButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  )
}

export default BuyerModal 