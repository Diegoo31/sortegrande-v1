import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import TicketBoard from './components/TicketBoard'
import BuyerModal from './components/BuyerModal'
import Navbar from './components/Navbar'
import Spinner3D from './components/Spinner3D'
import WinnerDisplay from './components/WinnerDisplay'
import ComoFunciona from './components/ComoFunciona'
import ConfiguracaoSorteio from './components/ConfiguracaoSorteio'
import HistoricoSorteios from './components/HistoricoSorteios'
import BackupRestore from './components/BackupRestore'
import { HistoricoItem } from './components/HistoricoSorteios'
import { 
  saveTickets, 
  loadTickets, 
  saveHistorico,
  loadHistorico,
  saveConfig,
  loadConfig,
  clearHistorico
} from './services/StorageService'
import { validateTicketNumber } from './utils/validators'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
`

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 2fr 1fr;
    padding: 2rem;
  }
`

const BoardSection = styled.section`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const SpinnerSection = styled.section`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: fit-content;
`

const CanvasContainer = styled.div`
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`

const Button = styled.button`
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
  flex: 1;

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

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #f8f9fa;
`

const InfoSection = styled.section`
  max-width: 1200px;
  margin: 3rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`

const InfoTitle = styled.h2`
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
`

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const InfoParagraph = styled.p`
  line-height: 1.6;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
`

const InfoStep = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1rem;
`

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
`

const StepText = styled.div`
  flex: 1;
`

const ContactContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 1.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const ContactItem = styled.div`
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const ContactTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #f8f9fa;
`

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f8f9fa;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: #4361ee;
    transform: translateX(5px);
  }
`

const ContactIcon = styled.span`
  font-size: 1.5rem;
`

const AdminSection = styled.section`
  max-width: 1200px;
  margin: 3rem auto;
  padding: 2rem;
  background: rgba(31, 33, 58, 0.8);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`

const AdminTitle = styled.h2`
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
`

const AdminContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

export type Buyer = {
  id: string;
  name: string;
  contact: string;
}

export type TicketData = {
  number: number;
  sold: boolean;
  buyer: Buyer | null;
}

function App() {
  // Carregar configuração
  const [config, setConfig] = useState(loadConfig());
  
  // Estado para os tickets
  const [tickets, setTickets] = useState<TicketData[]>(() => {
    const savedTickets = loadTickets();
    if (savedTickets) {
      return savedTickets;
    }
    
    return Array.from({ length: config.quantidadeNumeros }, (_, i) => ({
      number: i + 1,
      sold: false,
      buyer: null
    }));
  });
  
  // Estado para o histórico
  const [historico, setHistorico] = useState<HistoricoItem[]>(loadHistorico());
  
  // Outros estados da aplicação
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [showBuyerModal, setShowBuyerModal] = useState(false);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  // Sempre que tickets ou histórico mudar, salvar no localStorage
  useEffect(() => {
    saveTickets(tickets);
  }, [tickets]);
  
  useEffect(() => {
    saveHistorico(historico);
  }, [historico]);
  
  useEffect(() => {
    saveConfig(config);
  }, [config]);

  const handleTicketClick = (ticketNumber: number) => {
    // Validação do número do bilhete
    if (!validateTicketNumber(ticketNumber, config.quantidadeNumeros)) {
      console.error('Número de bilhete inválido');
      return;
    }
    
    setSelectedTicket(ticketNumber);
    setShowBuyerModal(true);
  }

  const handleAddBuyer = (buyer: Buyer) => {
    if (selectedTicket === null) return;
    
    setTickets(prev => prev.map(ticket => 
      ticket.number === selectedTicket 
        ? { ...ticket, sold: true, buyer } 
        : ticket
    ));
    
    setShowBuyerModal(false);
    setSelectedTicket(null);
  }
  
  const handleCloseModal = () => {
    setShowBuyerModal(false);
    setSelectedTicket(null);
  }

  const handleSpin = () => {
    setIsSpinning(true);
    setWinningNumber(null);
    
    // Garantir que só números vendidos podem ser sorteados
    const soldTickets = tickets.filter(ticket => ticket.sold);
    
    if (soldTickets.length === 0) {
      alert('Não há números vendidos para sortear!');
      setIsSpinning(false);
      return;
    }
    
    // Simulação de sorteio com animação
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * soldTickets.length);
      const sorteado = soldTickets[randomIndex];
      setWinningNumber(sorteado.number);
      
      // Adicionar ao histórico
      const novoHistorico: HistoricoItem = {
        id: Date.now().toString(),
        data: new Date(),
        numeroSorteado: sorteado.number,
        ganhador: sorteado.buyer ? {
          nome: sorteado.buyer.name,
          contato: sorteado.buyer.contact
        } : null
      };
      
      setHistorico(prev => [novoHistorico, ...prev]);
      
      setIsSpinning(false);
    }, 3000);
  }

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja reiniciar o sorteio? Todos os dados serão perdidos.')) {
      setTickets(Array.from({ length: config.quantidadeNumeros }, (_, i) => ({
        number: i + 1,
        sold: false,
        buyer: null
      })));
      setWinningNumber(null);
    }
  }
  
  const handleSalvarConfig = (quantidadeNumeros: number) => {
    const novaConfig = { ...config, quantidadeNumeros };
    setConfig(novaConfig);
    
    // Resetar tickets com a nova quantidade
    setTickets(Array.from({ length: quantidadeNumeros }, (_, i) => ({
      number: i + 1,
      sold: false,
      buyer: null
    })));
    
    setWinningNumber(null);
  }
  
  const handleLimparHistorico = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o histórico de sorteios?')) {
      setHistorico([]);
      clearHistorico();
    }
  }
  
  const handleDataImported = () => {
    // Recarregar todos os dados após importação
    const savedTickets = loadTickets();
    if (savedTickets) {
      setTickets(savedTickets);
    }
    
    setHistorico(loadHistorico());
    setConfig(loadConfig());
    setWinningNumber(null);
    
    alert('Dados importados com sucesso! A página será recarregada para aplicar as mudanças.');
    window.location.reload();
  }

  const closeAllModals = () => {
    setShowBuyerModal(false);
    setSelectedTicket(null);
    setWinningNumber(null);
    setIsSpinning(false);
  };

  return (
    <Container>
      <Navbar />
      
      <div id="inicio">
        <Content>
          <div>
            <ConfiguracaoSorteio 
              quantidadeNumeros={config.quantidadeNumeros}
              onSalvarConfig={handleSalvarConfig}
              temDadosSalvos={tickets.some(t => t.sold)}
            />
            
            <BoardSection>
              <Title>Cartela de Números</Title>
              <TicketBoard 
                tickets={tickets} 
                onTicketClick={handleTicketClick} 
                winningNumber={winningNumber}
              />
            </BoardSection>
          </div>
          
          <div>
            <SpinnerSection>
              <Title>Sorteador 3D</Title>
              <CanvasContainer>
                <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                  <pointLight position={[-10, -10, -10]} />
                  <Spinner3D isSpinning={isSpinning} />
                  <OrbitControls enableZoom={false} />
                </Canvas>
              </CanvasContainer>
              
              {winningNumber !== null && (
                <WinnerDisplay 
                  number={winningNumber} 
                  buyer={tickets.find(t => t.number === winningNumber)?.buyer} 
                />
              )}
              
              <ButtonsContainer>
                <Button onClick={handleSpin} disabled={isSpinning}>
                  {isSpinning ? 'Sorteando...' : 'Sortear Número'}
                </Button>
                <Button onClick={handleReset} disabled={isSpinning}>
                  Reiniciar
                </Button>
              </ButtonsContainer>
            </SpinnerSection>
            
            <HistoricoSorteios 
              historico={historico}
              onLimparHistorico={handleLimparHistorico}
            />
          </div>
        </Content>
      </div>
      
      <ComoFunciona />
      
      <AdminSection id="admin">
        <AdminTitle>Administração</AdminTitle>
        <AdminContent>
          <BackupRestore onDataImported={handleDataImported} />
        </AdminContent>
      </AdminSection>
      
      <InfoSection id="contato">
        <InfoTitle>Contato</InfoTitle>
        <InfoContent>
          <InfoParagraph>
            Para mais informações sobre o Sorte Grande 3D ou para reportar problemas, entre em contato com o desenvolvedor:
          </InfoParagraph>
          
          <ContactContainer>
            <ContactItem>
              <ContactTitle>Desenvolvedor</ContactTitle>
              <ContactLink href="https://github.com/Diegoo31" target="_blank" rel="noopener noreferrer">
                <ContactIcon>👨‍💻</ContactIcon>
                Diego C. Pereira (Diegoo31)
              </ContactLink>
            </ContactItem>
            
            <ContactItem>
              <ContactTitle>GitHub</ContactTitle>
              <ContactLink href="https://github.com/Diegoo31" target="_blank" rel="noopener noreferrer">
                <ContactIcon>🔗</ContactIcon>
                github.com/Diegoo31
              </ContactLink>
            </ContactItem>
          </ContactContainer>
        </InfoContent>
      </InfoSection>
      
      {showBuyerModal && selectedTicket !== null && (
        <BuyerModal 
          ticketNumber={selectedTicket} 
          onAddBuyer={handleAddBuyer} 
          onClose={handleCloseModal}
        />
      )}
    </Container>
  )
}

export default App 