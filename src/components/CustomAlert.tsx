import React, { useEffect } from 'react';
import styled from 'styled-components';

const AlertOverlay = styled.div`
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

const AlertContent = styled.div`
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

const AlertHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const AlertTitle = styled.h3`
  color: white;
  font-size: 1.3rem;
  margin: 0;
  text-align: center;
`;

const AlertMessage = styled.p`
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-size: 1rem;
  margin: 0;
  line-height: 1.5;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  color: white;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(67, 97, 238, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

interface CustomAlertProps {
  title?: string;
  message: string;
  onConfirm: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ 
  title = 'Atenção', 
  message, 
  onConfirm 
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
    <AlertOverlay>
      <AlertContent>
        <AlertHeader>
          <AlertTitle>{title}</AlertTitle>
        </AlertHeader>
        <AlertMessage>{message}</AlertMessage>
        <Button onClick={onConfirm}>OK</Button>
      </AlertContent>
    </AlertOverlay>
  );
};

export default CustomAlert; 