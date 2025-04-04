import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  margin: 3rem auto;
  padding: 2rem;
  background: rgba(31, 33, 58, 0.8);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  color: white;
  max-width: 1200px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #f8f9fa;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
    border-radius: 2px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Paragraph = styled.p`
  line-height: 1.6;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
`;

const Step = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
`;

const StepText = styled.div`
  flex: 1;
  
  h3 {
    margin-bottom: 0.5rem;
    color: white;
  }
  
  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.9);
  }
`;

const ComoFunciona: React.FC = () => {
  return (
    <Section id="como-funciona">
      <Title>Como Funciona</Title>
      <Content>
        <Paragraph>
          O <strong>Sorte Grande 3D</strong> é um sistema moderno e intuitivo para realização de sorteios de forma transparente e visualmente atraente. Desenvolvido com tecnologia 3D, este sorteador garante total aleatoriedade nos resultados, proporcionando sorteios justos para todos os participantes.
        </Paragraph>
        
        <Step>
          <StepNumber>1</StepNumber>
          <StepText>
            <h3>Venda de Números</h3>
            <p>Clique nos números disponíveis na cartela para registrar os compradores. Cada número pode ser associado a um participante com nome e contato.</p>
          </StepText>
        </Step>
        
        <Step>
          <StepNumber>2</StepNumber>
          <StepText>
            <h3>Sorteio Aleatório</h3>
            <p>O sistema utiliza um algoritmo de randomização para garantir que todos os números vendidos tenham a mesma chance de serem sorteados. O sorteio considera apenas os números que foram vendidos.</p>
          </StepText>
        </Step>
        
        <Step>
          <StepNumber>3</StepNumber>
          <StepText>
            <h3>Animação 3D</h3>
            <p>Durante o sorteio, uma animação 3D é exibida para criar expectativa e trazer mais emoção ao momento. O cubo 3D gira aleatoriamente enquanto o sistema seleciona o número vencedor.</p>
          </StepText>
        </Step>
        
        <Step>
          <StepNumber>4</StepNumber>
          <StepText>
            <h3>Resultado e Premiação</h3>
            <p>Após o sorteio, o número vencedor é destacado na cartela e as informações do comprador são exibidas. A transparência é total, garantindo a confiabilidade do processo.</p>
          </StepText>
        </Step>
        
        <Paragraph>
          O sistema foi projetado para ser totalmente transparente e justo. Apenas números efetivamente vendidos participam do sorteio, e o algoritmo de randomização garante que todos os números tenham a mesma probabilidade de serem sorteados.
        </Paragraph>
      </Content>
    </Section>
  );
};

export default ComoFunciona; 