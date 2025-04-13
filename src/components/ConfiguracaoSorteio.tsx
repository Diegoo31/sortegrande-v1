import React, { useState } from 'react';
import styled from 'styled-components';
import { useDialog } from '../contexts/DialogContext';

const ConfigContainer = styled.div`
  background: rgba(31, 33, 58, 0.8);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  padding: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const Title = styled.h3`
  color: white;
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
  
  @media (min-width: 768px) {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.5rem;
  color: white;
  width: 100%;
  max-width: 200px;

  &:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.3);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
  width: fit-content;
  border: none;
  margin-top: 0.5rem;

  @media (min-width: 768px) {
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(67, 97, 238, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d6d;
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

const Disclaimer = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  margin-top: 1rem;
`;

interface ConfiguracaoSorteioProps {
  quantidadeNumeros: number;
  onSalvarConfig: (quantidade: number) => void;
  temDadosSalvos: boolean;
}

const ConfiguracaoSorteio: React.FC<ConfiguracaoSorteioProps> = ({ 
  quantidadeNumeros, 
  onSalvarConfig,
  temDadosSalvos
}) => {
  const { showAlert, showConfirm } = useDialog();
  const [quantidade, setQuantidade] = useState(quantidadeNumeros);
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (quantidade < 1 || quantidade > 1000) {
      setErro('A quantidade deve estar entre 1 e 1000 números');
      return;
    }

    // Se tiver dados salvos, confirmar antes de resetar
    if (temDadosSalvos) {
      const confirmed = await showConfirm({
        title: 'Alterar configuração',
        message: 'Alterar a quantidade de números irá resetar todos os dados do sorteio atual. Deseja continuar?',
        confirmText: 'Sim, continuar',
        cancelText: 'Cancelar'
      });
      
      if (!confirmed) {
        return;
      }
    }

    setErro(null);
    onSalvarConfig(quantidade);
    
    showAlert({
      title: 'Configuração Salva',
      message: 'As configurações do sorteio foram atualizadas com sucesso!'
    });
  };

  return (
    <ConfigContainer>
      <Title>Configurações do Sorteio</Title>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="quantidade">Quantidade de Números</Label>
          <Input
            id="quantidade"
            type="number"
            min="1"
            max="1000"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
          />
          {erro && <ErrorMessage>{erro}</ErrorMessage>}
        </InputGroup>
        <Button type="submit">Salvar Configurações</Button>
      </Form>
      <Disclaimer>
        Atenção: Modificar a quantidade de números irá reiniciar o sorteio atual.
      </Disclaimer>
    </ConfigContainer>
  );
};

export default ConfiguracaoSorteio; 