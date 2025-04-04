/**
 * Validações para melhorar a segurança e integridade dos dados
 */

// Validar nome (mínimo 3 caracteres, máximo 100)
export const validateName = (name: string): boolean => {
  if (!name || name.trim().length < 3 || name.trim().length > 100) {
    return false;
  }
  
  // Verificar caracteres permitidos (letras, espaços, alguns acentos comuns no português)
  const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'.-]+$/;
  return nameRegex.test(name.trim());
};

// Validar contato (telefone ou email)
export const validateContact = (contact: string): boolean => {
  if (!contact || contact.trim().length < 5 || contact.trim().length > 100) {
    return false;
  }
  
  // Email regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // Telefone regex (formatos: (99) 99999-9999, 99 99999-9999, 999999999)
  const phoneRegex = /^(?:\(\d{2}\)|\d{2})?[\s.-]?(\d{5}|\d{4})[-\s.]?(\d{4})$|^\d{9,11}$/;
  
  return emailRegex.test(contact.trim()) || phoneRegex.test(contact.trim());
};

// Validar quantidade de números
export const validateNumberQuantity = (quantity: number): boolean => {
  // Permite no mínimo 1 e no máximo 1000 números
  return Number.isInteger(quantity) && quantity >= 1 && quantity <= 1000;
};

// Sanitização de texto (remove scripts e outros caracteres perigosos)
export const sanitizeText = (text: string): string => {
  if (!text) return '';
  
  // Remove tags HTML e scripts
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

// Validar formato de backup
export const validateBackupFormat = (data: any): boolean => {
  if (!data) return false;
  
  // Verificar estrutura básica
  if (!data.tickets || !Array.isArray(data.tickets)) {
    return false;
  }
  
  if (!data.historico || !Array.isArray(data.historico)) {
    return false;
  }
  
  if (!data.config || typeof data.config !== 'object') {
    return false;
  }
  
  // Verificar se config tem a propriedade necessária
  if (!('quantidadeNumeros' in data.config)) {
    return false;
  }
  
  return true;
};

// Validar número de bilhete
export const validateTicketNumber = (number: number, max: number): boolean => {
  return Number.isInteger(number) && number >= 1 && number <= max;
}; 