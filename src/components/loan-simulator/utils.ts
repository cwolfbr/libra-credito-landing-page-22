
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

export const formatCEP = (value: string) => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');

  // Formata como CEP (00000-000)
  if (numbers.length <= 5) {
    return numbers;
  } else {
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  }
};

export const calculateLoanResults = (loanAmount: number): LoanResults => {
  // Simulação de cálculo - Será substituído pela chamada API
  const interest = 0.0109; // 1.09% ao mês
  const term = 180; // 15 anos em meses

  // Cálculo da parcela usando a fórmula de amortização
  const payment = loanAmount * (interest * Math.pow(1 + interest, term)) / (Math.pow(1 + interest, term) - 1);

  // Renda necessária (aprox. 30% da renda)
  let income = payment / 0.3;

  // Aplicar valor mínimo de 7 mil reais para renda necessária
  income = Math.max(income, 7000);

  // Cálculo do valor mínimo necessário do imóvel (2x o valor do empréstimo)
  const minPropertyValue = loanAmount * 2;
  
  // Cálculo do valor máximo necessário do imóvel (3x o valor do empréstimo)
  const maxPropertyValue = loanAmount * 3;

  return {
    monthlyPayment: payment,
    requiredIncome: income,
    minPropertyValue,
    maxPropertyValue
  };
};

import { LoanResults } from './types';
