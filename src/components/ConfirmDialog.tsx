import React, { useEffect } from 'react';
import styled from 'styled-components';

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const DialogContent = styled.div`
  background: rgba(31, 33, 58, 0.95);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const DialogTitle = styled.h3`
  color: white;
  font-size: 1.3rem;
  margin: 0;
  text-align: center;
`;

const DialogMessage = styled.p`
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-size: 1rem;
  margin: 0;
  line-height: 1.5;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 400px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Button = styled.button`
  flex: 1;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ConfirmButton = styled(Button)`
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  color: white;
  box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
  
  &:hover {
    box-shadow: 0 4px 10px rgba(67, 97, 238, 0.4);
  }
`;

const CancelButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

interface ConfirmDialogProps {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ 
  title = 'Confirmação', 
  message, 
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel
}) => {
  useEffect(() => {
    // Prevenir scroll no background
    document.body.style.overflow = 'hidden';
    
    // Restaurar scroll ao desmontar
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <DialogOverlay>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogMessage>{message}</DialogMessage>
        <ButtonsContainer>
          <CancelButton onClick={onCancel}>{cancelText}</CancelButton>
          <ConfirmButton onClick={onConfirm}>{confirmText}</ConfirmButton>
        </ButtonsContainer>
      </DialogContent>
    </DialogOverlay>
  );
};

export default ConfirmDialog; 