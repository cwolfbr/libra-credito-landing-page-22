import { useState, useCallback } from 'react';

interface LoanCalculatorParams {
  loanAmount: number;
  interestRate?: number;
  termInMonths?: number;
  incomeCommitmentRate?: number;
  minRequiredIncome?: number;
}

interface LoanCalculatorResult {
  monthlyPayment: number;
  requiredIncome: number;
  minPropertyValue: number;
  maxPropertyValue: number;
  calculateLoan: () => void;
}

/**
 * Hook customizado para calcular os detalhes de um empréstimo com garantia de imóvel.
 *
 * @param {LoanCalculatorParams} params - Parâmetros para o cálculo do empréstimo.
 * @returns {LoanCalculatorResult} - Resultados do cálculo e a função para executar o cálculo.
 */
export const useLoanCalculator = ({
  loanAmount,
  interestRate = 0.0109, // 1.09% ao mês
  termInMonths = 180, // 15 anos
  incomeCommitmentRate = 0.3, // 30%
  minRequiredIncome = 7000,
}: LoanCalculatorParams): LoanCalculatorResult => {
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [requiredIncome, setRequiredIncome] = useState(0);

  const calculateLoan = useCallback(() => {
    // Cálculo da parcela usando a fórmula de amortização (Tabela Price)
    const payment =
      loanAmount *
      (interestRate * Math.pow(1 + interestRate, termInMonths)) /
      (Math.pow(1 + interestRate, termInMonths) - 1);

    // Renda necessária com base no comprometimento
    let income = payment / incomeCommitmentRate;

    // Aplica o valor mínimo de renda necessária
    income = Math.max(income, minRequiredIncome);

    setMonthlyPayment(payment);
    setRequiredIncome(income);
  }, [loanAmount, interestRate, termInMonths, incomeCommitmentRate, minRequiredIncome]);

  // Cálculo do valor mínimo e máximo necessário do imóvel
  const minPropertyValue = loanAmount * 2;
  const maxPropertyValue = loanAmount * 3;

  return {
    monthlyPayment,
    requiredIncome,
    minPropertyValue,
    maxPropertyValue,
    calculateLoan,
  };
};
