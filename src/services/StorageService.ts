import { TicketData, Buyer } from '../App';
import { HistoricoItem } from '../components/HistoricoSorteios';

// Chaves para armazenamento no localStorage
const STORAGE_KEYS = {
  TICKETS: 'sg_tickets',
  HISTORICO: 'sg_historico',
  CONFIG: 'sg_config'
};

// Interface para a configuração
export interface SorteioConfig {
  quantidadeNumeros: number;
}

// Interface para todos os dados salvos
interface SavedData {
  tickets: TicketData[];
  historico: HistoricoItem[];
  config: SorteioConfig;
}

// Configuração padrão
const DEFAULT_CONFIG: SorteioConfig = {
  quantidadeNumeros: 100
};

// Verificar se o localStorage está disponível
const isStorageAvailable = (): boolean => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// Salvar tickets
export const saveTickets = (tickets: TicketData[]): void => {
  if (!isStorageAvailable()) return;

  try {
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
  } catch (error) {
    console.error('Erro ao salvar tickets:', error);
  }
};

// Carregar tickets
export const loadTickets = (): TicketData[] | null => {
  if (!isStorageAvailable()) return null;

  try {
    const ticketsData = localStorage.getItem(STORAGE_KEYS.TICKETS);
    if (!ticketsData) return null;

    const tickets: TicketData[] = JSON.parse(ticketsData);
    
    // Convertendo de volta os dados serializados para manter as datas
    return tickets.map(ticket => ({
      ...ticket,
      // Se o ticket tiver um comprador, mantém sua estrutura
      buyer: ticket.buyer
    }));
  } catch (error) {
    console.error('Erro ao carregar tickets:', error);
    return null;
  }
};

// Salvar histórico
export const saveHistorico = (historico: HistoricoItem[]): void => {
  if (!isStorageAvailable()) return;

  try {
    localStorage.setItem(STORAGE_KEYS.HISTORICO, JSON.stringify(historico));
  } catch (error) {
    console.error('Erro ao salvar histórico:', error);
  }
};

// Carregar histórico
export const loadHistorico = (): HistoricoItem[] => {
  if (!isStorageAvailable()) return [];

  try {
    const historicoData = localStorage.getItem(STORAGE_KEYS.HISTORICO);
    if (!historicoData) return [];

    const historico: HistoricoItem[] = JSON.parse(historicoData);
    
    // Convertendo de volta as datas serializadas
    return historico.map(item => ({
      ...item,
      data: new Date(item.data)
    }));
  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
    return [];
  }
};

// Salvar configuração
export const saveConfig = (config: SorteioConfig): void => {
  if (!isStorageAvailable()) return;

  try {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  } catch (error) {
    console.error('Erro ao salvar configuração:', error);
  }
};

// Carregar configuração
export const loadConfig = (): SorteioConfig => {
  if (!isStorageAvailable()) return DEFAULT_CONFIG;

  try {
    const configData = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (!configData) return DEFAULT_CONFIG;

    return JSON.parse(configData);
  } catch (error) {
    console.error('Erro ao carregar configuração:', error);
    return DEFAULT_CONFIG;
  }
};

// Limpar todos os dados
export const clearAllData = (): void => {
  if (!isStorageAvailable()) return;

  try {
    localStorage.removeItem(STORAGE_KEYS.TICKETS);
    localStorage.removeItem(STORAGE_KEYS.HISTORICO);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
  }
};

// Limpar apenas o histórico
export const clearHistorico = (): void => {
  if (!isStorageAvailable()) return;

  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORICO);
  } catch (error) {
    console.error('Erro ao limpar histórico:', error);
  }
};

// Exportar todos os dados (para backup)
export const exportAllData = (): string => {
  const data: SavedData = {
    tickets: loadTickets() || [],
    historico: loadHistorico(),
    config: loadConfig()
  };

  return JSON.stringify(data);
};

// Importar todos os dados (de backup)
export const importAllData = (jsonData: string): boolean => {
  try {
    const data: SavedData = JSON.parse(jsonData);
    
    if (data.tickets) saveTickets(data.tickets);
    if (data.historico) saveHistorico(data.historico);
    if (data.config) saveConfig(data.config);
    
    return true;
  } catch (error) {
    console.error('Erro ao importar dados:', error);
    return false;
  }
}; 