
import { norm } from './formatters';

export interface FormValidation {
  emprestimoValue: number;
  garantiaValue: number;
  emprestimoExcedeGarantia: boolean;
  parcelasValidas: boolean;
  emprestimoForaRange: boolean;
  formularioValido: boolean;
}

export const validateForm = (
  emprestimo: string,
  garantia: string,
  parcelas: number,
  amortizacao: string,
  cidade: string
): FormValidation => {
  const emprestimoValue = norm(emprestimo);
  const garantiaValue = norm(garantia);
  
  // Empréstimo deve estar entre 100k e 5M
  const emprestimoForaRange = emprestimoValue < 100000 || emprestimoValue > 5000000;
  
  // Garantia deve ser pelo menos 2x o empréstimo
  const emprestimoExcedeGarantia = emprestimoValue > (garantiaValue / 2);
  
  // Parcelas devem estar entre 36 e 180
  const parcelasValidas = parcelas >= 36 && parcelas <= 180;
  
  const formularioValido = 
    emprestimoValue >= 100000 && 
    emprestimoValue <= 5000000 &&
    garantiaValue > 0 && 
    parcelasValidas && 
    amortizacao && 
    cidade &&
    !emprestimoExcedeGarantia &&
    !emprestimoForaRange;

  return {
    emprestimoValue,
    garantiaValue,
    emprestimoExcedeGarantia,
    parcelasValidas,
    emprestimoForaRange,
    formularioValido
  };
};
