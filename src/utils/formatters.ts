
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

// Função para formatar valores assumindo milhares (usuário digita 300 = R$ 300.000)
export const formatBRLThousands = (value: string) => {
  const num = value.replace(/\D/g, '');
  if (!num) return '';
  
  // Multiplica por 1000 para converter para milhares
  const valueInThousands = Number(num) * 1000;
  const formatted = valueInThousands.toLocaleString('pt-BR');
  return `R$ ${formatted}`;
};

// Função para normalizar valores em milhares para Number
export const normThousands = (s: string) => {
  const cleanValue = s.replace(/\./g, '').replace(/,/g, '.').replace(/[^0-9.]/g, '');
  if (!cleanValue) return 0;
  
  // Se o valor já está em formato completo (ex: já digitou 300000), não multiplica
  const num = Number(cleanValue);
  
  // Se o número tem menos de 4 dígitos, trata como milhares
  if (num < 10000) {
    return num * 1000;
  }
  
  return num;
};
