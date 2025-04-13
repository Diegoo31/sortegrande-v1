import styled from 'styled-components'
import { TicketData } from '../App'

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 0.3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 1rem;
  }
`

interface TicketProps {
  sold: boolean;
  winner: boolean;
}

const Ticket = styled.div<TicketProps>`
  aspect-ratio: 1 / 1;
  background: ${props => props.winner 
    ? 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)' 
    : props.sold 
      ? 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)' 
      : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  transform: ${props => props.winner ? 'rotateY(360deg)' : 'rotateY(0)'};
  box-shadow: ${props => props.winner 
    ? '0 8px 20px rgba(255, 193, 7, 0.4)' 
    : '0 4px 10px rgba(0, 0, 0, 0.2)'};
  
  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
    
  &:hover {
    transform: translateY(-5px) ${props => props.winner ? 'rotateY(360deg)' : ''};
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      rgba(255, 255, 255, 0) 100%
    );
    z-index: 1;
  }
`

const SoldIndicator = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #4ade80;
`

const BuyerInfoTooltip = styled.div`
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  width: max-content;
  max-width: 150px;
  z-index: 10;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;

  ${Ticket}:hover & {
    opacity: 1;
    bottom: 110%;
  }
`

interface TicketBoardProps {
  tickets: TicketData[];
  onTicketClick: (ticketNumber: number) => void;
  winningNumber: number | null;
}

const TicketBoard = ({ tickets, onTicketClick, winningNumber }: TicketBoardProps) => {
  return (
    <BoardContainer>
      {tickets.map((ticket) => (
        <Ticket 
          key={ticket.number} 
          sold={ticket.sold}
          winner={winningNumber === ticket.number}
          onClick={() => onTicketClick(ticket.number)}
        >
          {ticket.number}
          {ticket.sold && <SoldIndicator />}
          {ticket.sold && ticket.buyer && (
            <BuyerInfoTooltip>
              {ticket.buyer.name} - {ticket.buyer.contact}
            </BuyerInfoTooltip>
          )}
        </Ticket>
      ))}
    </BoardContainer>
  )
}

export default TicketBoard 