
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCEP } from './utils';
import { LoanPurpose, PropertyType, LoanFormData } from './types';

interface LoanFormProps {
  formData: LoanFormData;
  onFormDataChange: (data: Partial<LoanFormData>) => void;
  onSubmit: () => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ formData, onFormDataChange, onSubmit }) => {
  const { loanPurpose, loanAmount, cep, propertyType } = formData;

  const handleLoanAmountChange = (value: number[]) => {
    onFormDataChange({ loanAmount: value[0] });
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCEP = formatCEP(e.target.value);
    onFormDataChange({ cep: formattedCEP });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const loanAmountLabelId = "loan-amount-label";

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-xl font-bold text-libra-navy mb-4">Sobre o empréstimo</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" id="loanPurposeLabel">
                Finalidade do empréstimo
              </label>
              <Select 
                value={loanPurpose} 
                onValueChange={value => onFormDataChange({ loanPurpose: value as LoanPurpose })}
              >
                <SelectTrigger className="w-full" aria-labelledby="loanPurposeLabel">
                  <SelectValue placeholder="Selecione a finalidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consolidacao" aria-label="Consolidação de dívidas">Consolidação de dívidas</SelectItem>
                  <SelectItem value="capital" aria-label="Capital de giro">Capital de giro</SelectItem>
                  <SelectItem value="investimento" aria-label="Investimento">Investimento</SelectItem>
                  <SelectItem value="reforma" aria-label="Reforma">Reforma</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label id={loanAmountLabelId} className="block text-sm font-medium text-black mb-1">
                Valor necessário: {loanAmount.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </label>
              <Slider 
                value={[loanAmount]} 
                min={100000} 
                max={5000000} 
                step={50000} 
                onValueChange={handleLoanAmountChange} 
                className="my-4"
                aria-labelledby={loanAmountLabelId}
              />
              <div className="flex justify-between text-sm text-gray-700">
                <span>R$ 100 mil</span>
                <span>R$ 5 milhões</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-libra-navy mb-4">Sobre a garantia</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-1">
                CEP do imóvel
              </label>
              <Input 
                id="cep" 
                type="text" 
                value={cep} 
                onChange={handleCEPChange} 
                placeholder="00000-000" 
                maxLength={9} 
                className="w-full"
                aria-label="CEP do imóvel"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" id="propertyTypeLabel">
                Tipo de imóvel
              </label>
              <Select 
                value={propertyType} 
                onValueChange={value => onFormDataChange({ propertyType: value as PropertyType })}
              >
                <SelectTrigger className="w-full" aria-labelledby="propertyTypeLabel">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casa" aria-label="Casa">Casa</SelectItem>
                  <SelectItem value="apartamento" aria-label="Apartamento">Apartamento</SelectItem>
                  <SelectItem value="comercial" aria-label="Comercial">Comercial</SelectItem>
                  <SelectItem value="rural" aria-label="Rural Produtivo">Rural Produtivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          type="submit" 
          className="min-h-[48px] min-w-[200px]"
          variant="goldContrast"
          size="xl"
          aria-label="Simular empréstimo agora"
        >
          Simular Agora
        </Button>
      </div>
    </form>
  );
};

export default LoanForm;
