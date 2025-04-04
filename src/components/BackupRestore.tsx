import React, { useState } from 'react';
import styled from 'styled-components';
import { exportAllData, importAllData } from '../services/StorageService';

const BackupContainer = styled.div`
  background: rgba(31, 33, 58, 0.8);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
`;

const Title = styled.h3`
  color: white;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
  border: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(67, 97, 238, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  display: inline-block;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const StatusMessage = styled.div<{ error?: boolean }>`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  background: ${props => props.error 
    ? 'rgba(255, 77, 77, 0.2)' 
    : 'rgba(77, 255, 77, 0.2)'};
  color: ${props => props.error 
    ? '#ff4d4d' 
    : '#4dff4d'};
  font-size: 0.9rem;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

interface BackupRestoreProps {
  onDataImported: () => void;
}

const BackupRestore: React.FC<BackupRestoreProps> = ({ onDataImported }) => {
  const [status, setStatus] = useState<{ message: string; error: boolean } | null>(null);
  
  const handleExport = () => {
    try {
      const jsonData = exportAllData();
      
      // Criar um blob e um link para download
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `sortegrande_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      
      // Limpar
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 0);
      
      setStatus({
        message: 'Backup exportado com sucesso!',
        error: false
      });
      
      // Limpar mensagem após alguns segundos
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus({
        message: 'Erro ao exportar o backup.',
        error: true
      });
    }
  };
  
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string;
        const success = importAllData(jsonData);
        
        if (success) {
          setStatus({
            message: 'Dados importados com sucesso!',
            error: false
          });
          
          // Notificar o componente pai
          onDataImported();
        } else {
          setStatus({
            message: 'Erro ao importar os dados. Formato inválido.',
            error: true
          });
        }
      } catch (error) {
        setStatus({
          message: 'Erro ao processar o arquivo.',
          error: true
        });
      }
    };
    
    reader.onerror = () => {
      setStatus({
        message: 'Erro ao ler o arquivo.',
        error: true
      });
    };
    
    reader.readAsText(file);
    
    // Resetar o input para permitir selecionar o mesmo arquivo novamente
    event.target.value = '';
  };
  
  return (
    <BackupContainer>
      <Title>Backup e Restauração</Title>
      <Description>
        Exporte seus dados para fazer um backup ou importe dados de um backup anterior.
        Importante: Importar dados substituirá todos os dados atuais.
      </Description>
      <ButtonContainer>
        <Button onClick={handleExport}>
          Exportar Dados
        </Button>
        <FileLabel>
          Importar Dados
          <FileInput 
            type="file" 
            accept=".json"
            onChange={handleImport}
          />
        </FileLabel>
      </ButtonContainer>
      
      {status && (
        <StatusMessage error={status.error}>
          {status.message}
        </StatusMessage>
      )}
    </BackupContainer>
  );
};

export default BackupRestore; 