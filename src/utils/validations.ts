
import { norm } from './formatters';

export interface FormValidation {
  emprestimoValue: number;
  garantiaValue: number;
  emprestimoExcedeGarantia: boolean;
  parcelasValidas: boolean;
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
  const emprestimoExcedeGarantia = emprestimoValue > (garantiaValue * 0.8);
  const parcelasValidas = parcelas >= 12 && parcelas <= 240;
  
  const formularioValido = 
    emprestimoValue > 0 && 
    garantiaValue > 0 && 
    parcelasValidas && 
    amortizacao && 
    cidade &&
    !emprestimoExcedeGarantia;

  return {
    emprestimoValue,
    garantiaValue,
    emprestimoExcedeGarantia,
    parcelasValidas,
    formularioValido
  };
};
