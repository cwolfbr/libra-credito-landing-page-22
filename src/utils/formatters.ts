
// Função para normalizar valores em formato brasileiro para Number
export const norm = (s: string) =>
  Number(s.replace(/\./g, '').replace(/,/g, '.').replace(/[^0-9.]/g, ''));

// Função para formatar valor em formato brasileiro
export const formatBRL = (value: string) => {
  const num = value.replace(/\D/g, '');
  if (!num) return '';
  
  const formatted = Number(num).toLocaleString('pt-BR');
  return `R$ ${formatted}`;
};

// Função para formatar valores com formatação brasileira em tempo real
export const formatBRLInput = (value: string) => {
  const num = value.replace(/\D/g, '');
  if (!num) return '';
  
  // Formatar com pontos para milhares
  const formatted = Number(num).toLocaleString('pt-BR');
  return formatted;
};
