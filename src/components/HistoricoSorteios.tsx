import React from 'react';
import styled from 'styled-components';

const HistoricoContainer = styled.div`
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

const SorteiosList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 300px;
  overflow-y: auto;
`;

const SorteioItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SorteioHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SorteioDate = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
`;

const SorteioInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SorteioNumber = styled.div`
  background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
`;

const SorteioWinner = styled.div`
  font-size: 0.9rem;
  color: white;
`;

const EmptyState = styled.div`
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  padding: 2rem 0;
`;

const ClearButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  border: none;
  margin-top: 1rem;
  
  &:hover {
    background: rgba(255, 78, 78, 0.3);
  }
`;

export interface HistoricoItem {
  id: string;
  data: Date;
  numeroSorteado: number;
  ganhador: {
    nome: string;
    contato: string;
  } | null;
}

interface HistoricoSorteiosProps {
  historico: HistoricoItem[];
  onLimparHistorico: () => void;
}

const HistoricoSorteios: React.FC<HistoricoSorteiosProps> = ({ 
  historico,
  onLimparHistorico
}) => {
  const formatarData = (data: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data);
  };
  
  return (
    <HistoricoContainer>
      <Title>Histórico de Sorteios</Title>
      {historico.length > 0 ? (
        <>
          <SorteiosList>
            {historico.map((sorteio) => (
              <SorteioItem key={sorteio.id}>
                <SorteioHeader>
                  <SorteioDate>{formatarData(sorteio.data)}</SorteioDate>
                </SorteioHeader>
                <SorteioInfo>
                  <SorteioNumber>{sorteio.numeroSorteado}</SorteioNumber>
                  <SorteioWinner>
                    {sorteio.ganhador 
                      ? `${sorteio.ganhador.nome} - ${sorteio.ganhador.contato}`
                      : 'Número não vendido'}
                  </SorteioWinner>
                </SorteioInfo>
              </SorteioItem>
            ))}
          </SorteiosList>
          <ClearButton onClick={onLimparHistorico}>
            Limpar Histórico
          </ClearButton>
        </>
      ) : (
        <EmptyState>
          Nenhum sorteio realizado ainda.
        </EmptyState>
      )}
    </HistoricoContainer>
  );
};

export default HistoricoSorteios; 