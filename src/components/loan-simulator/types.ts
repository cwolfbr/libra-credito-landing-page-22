
export type LoanPurpose = 'consolidacao' | 'capital' | 'investimento' | 'reforma';
export type PropertyType = 'casa' | 'apartamento' | 'comercial' | 'rural';

export interface LoanFormData {
  loanPurpose: LoanPurpose;
  loanAmount: number;
  cep: string;
  propertyType: PropertyType;
}

export interface LoanResults {
  monthlyPayment: number;
  requiredIncome: number;
  minPropertyValue: number;
  maxPropertyValue: number;
}
