
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
  
  // Simplesmente adiciona "000" ao final do que o usuário digitou
  const valueWithThousands = num + '000';
  const formatted = Number(valueWithThousands).toLocaleString('pt-BR');
  return `R$ ${formatted}`;
};

// Função para normalizar valores em milhares para Number
export const normThousands = (s: string) => {
  const cleanValue = s.replace(/\./g, '').replace(/,/g, '.').replace(/[^0-9.]/g, '');
  if (!cleanValue) return 0;
  
  // Se o valor veio do formatBRLThousands, já tem os zeros, então só converte
  // Se não, adiciona os 3 zeros
  const num = Number(cleanValue);
  
  // Se o número já tem mais de 3 dígitos, provavelmente já tem os zeros
  if (cleanValue.length > 3) {
    return num;
  }
  
  // Caso contrário, adiciona os 3 zeros
  return Number(cleanValue + '000');
};
