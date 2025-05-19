
import React, { useState } from 'react';
import LoanForm from './LoanForm';
import LoanResults from './LoanResults';
import { LoanPurpose, PropertyType, LoanFormData, LoanResults as LoanResultsType } from './types';
import { calculateLoanResults } from './utils';
import { toast } from '@/hooks/use-toast';

const LoanSimulator: React.FC = () => {
  const [formData, setFormData] = useState<LoanFormData>({
    loanPurpose: 'consolidacao',
    loanAmount: 500000,
    cep: '',
    propertyType: 'casa'
  });
  
  const [showResults, setShowResults] = useState<boolean>(false);
  const [results, setResults] = useState<LoanResultsType>({
    monthlyPayment: 0,
    requiredIncome: 0,
    minPropertyValue: 0,
    maxPropertyValue: 0
  });

  const handleFormDataChange = (data: Partial<LoanFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleCalculate = () => {
    const calculatedResults = calculateLoanResults(formData.loanAmount);
    setResults(calculatedResults);
    setShowResults(true);
  };

  const handleContactRequest = () => {
    window.open('https://api.whatsapp.com/send/?phone=5516996360424&text=Ol%C3%A1%2C+Quero+agendar+uma+conversa+com+o+consultor%21&type=phone_number&app_absent=0', '_blank');
  };

  return (
    <section id="simulator" className="py-16 md:py-24 bg-gradient-to-b from-libra-light to-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-libra-navy mb-4">Simule seu empréstimo</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubra quanto você pode obter com a garantia do seu imóvel (até 50% do valor) e quais serão as condições de pagamento.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200">
          <LoanForm 
            formData={formData}
            onFormDataChange={handleFormDataChange}
            onSubmit={handleCalculate}
          />
          
          {showResults && (
            <LoanResults 
              results={results}
              onRequestContact={handleContactRequest}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default LoanSimulator;
