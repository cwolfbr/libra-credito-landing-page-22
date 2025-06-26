
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

// Função para formatar valores em milhares em tempo real
export const formatBRLThousands = (value: string) => {
  const num = value.replace(/\D/g, '');
  if (!num) return '';
  
  // Apenas exibe o número que o usuário digitou (sem adicionar zeros)
  return num;
};

// Função para normalizar valores em milhares para Number
export const normThousands = (s: string) => {
  const cleanValue = s.replace(/\./g, '').replace(/,/g, '.').replace(/[^0-9.]/g, '');
  if (!cleanValue) return 0;
  
  // Multiplica por 1000 para converter de milhares para valor real
  const num = Number(cleanValue);
  return num * 1000;
};
