
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { HelpCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type LoanPurpose = 'consolidacao' | 'capital' | 'investimento' | 'reforma';
type PropertyType = 'casa' | 'apartamento' | 'comercial' | 'rural';

const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

const LoanSimulator: React.FC = () => {
  const [loanPurpose, setLoanPurpose] = useState<LoanPurpose>('consolidacao');
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [cep, setCep] = useState<string>('');
  const [propertyType, setPropertyType] = useState<PropertyType>('casa');
  const [propertyValue, setPropertyValue] = useState<number>(1000000);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [requiredIncome, setRequiredIncome] = useState<number>(0);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Check if property value is at least double the loan amount
  useEffect(() => {
    if (propertyValue < loanAmount * 2) {
      setValidationError('O valor da garantia deve ser pelo menos o dobro do valor necessário');
    } else {
      setValidationError(null);
    }
  }, [loanAmount, propertyValue]);

  // Ensure property value is at least double the loan amount when loan amount changes
  useEffect(() => {
    if (propertyValue < loanAmount * 2) {
      setPropertyValue(loanAmount * 2);
    }
  }, [loanAmount]);

  // Handle loan amount change
  const handleLoanAmountChange = (value: number[]) => {
    const newLoanAmount = value[0];
    setLoanAmount(newLoanAmount);
    
    // Ensure property value is at least double the new loan amount
    if (propertyValue < newLoanAmount * 2) {
      setPropertyValue(newLoanAmount * 2);
    }
  };

  // Handle property value change
  const handlePropertyValueChange = (value: number[]) => {
    const newPropertyValue = value[0];
    setPropertyValue(newPropertyValue);
    
    // Limit loan amount to half of property value
    if (loanAmount > newPropertyValue / 2) {
      setLoanAmount(Math.floor(newPropertyValue / 2));
    }
  };

  // Função que seria chamada para consultar a API
  const calculateLoan = () => {
    // Check validation before calculation
    if (validationError) {
      toast({
        title: "Erro na simulação",
        description: validationError,
        variant: "destructive",
      });
      return;
    }
    
    // Simulação de cálculo - Será substituído pela chamada API
    const interest = 0.0109; // 1.09% ao mês
    const term = 180; // 15 anos em meses
    
    // Cálculo da parcela usando a fórmula de amortização
    const payment = loanAmount * (interest * Math.pow(1 + interest, term)) / (Math.pow(1 + interest, term) - 1);
    
    // Renda necessária (aprox. 30% da renda)
    const income = payment / 0.3;
    
    setMonthlyPayment(payment);
    setRequiredIncome(income);
    setShowResults(true);
  };

  // Check if loan amount is valid
  const isLoanAmountValid = loanAmount <= propertyValue * 0.5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateLoan();
  };

  const formatCEP = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Formata como CEP (00000-000)
    if (numbers.length <= 5) {
      return numbers;
    } else {
      return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
    }
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCEP = formatCEP(e.target.value);
    setCep(formattedCEP);
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
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-bold text-libra-navy mb-4">Sobre o empréstimo</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Finalidade do empréstimo
                    </label>
                    <Select 
                      value={loanPurpose} 
                      onValueChange={(value) => setLoanPurpose(value as LoanPurpose)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione a finalidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consolidacao">Consolidação de dívidas</SelectItem>
                        <SelectItem value="capital">Capital de giro</SelectItem>
                        <SelectItem value="investimento">Investimento</SelectItem>
                        <SelectItem value="reforma">Reforma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valor necessário: {formatCurrency(loanAmount)}
                    </label>
                    <Slider
                      value={[loanAmount]}
                      min={100000}
                      max={Math.min(5000000, propertyValue / 2)}
                      step={50000}
                      onValueChange={handleLoanAmountChange}
                      className="my-4"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
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
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de imóvel
                    </label>
                    <Select 
                      value={propertyType} 
                      onValueChange={(value) => setPropertyType(value as PropertyType)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casa">Casa</SelectItem>
                        <SelectItem value="apartamento">Apartamento</SelectItem>
                        <SelectItem value="comercial">Comercial</SelectItem>
                        <SelectItem value="rural">Rural Produtivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <span>Valor da garantia: {formatCurrency(propertyValue)}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="w-4 h-4 ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">O valor da garantia deve ser pelo menos o dobro do valor necessário</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                    
                    <Slider
                      value={[propertyValue]}
                      min={Math.max(200000, loanAmount * 2)}
                      max={10000000}
                      step={100000}
                      onValueChange={handlePropertyValueChange}
                      className="my-4"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>R$ 200 mil</span>
                      <span>R$ 10 milhões</span>
                    </div>
                    
                    {validationError && (
                      <div className="flex items-center gap-2 text-red-500 mt-1 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{validationError}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                type="submit" 
                className="bg-libra-gold hover:bg-libra-navy text-white font-semibold text-lg px-8 py-6"
                disabled={!!validationError}
              >
                Simular Agora
              </Button>
            </div>
          </form>
          
          {showResults && (
            <div className="mt-8 pt-6 border-t border-gray-200 animate-fade-in">
              <h3 className="text-xl font-bold text-libra-navy mb-4 text-center">Resultado da Simulação</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-libra-light p-6 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-2">Parcela mensal estimada:</p>
                  <p className="text-3xl font-bold text-libra-navy">{formatCurrency(monthlyPayment)}</p>
                  <p className="text-xs text-gray-500 mt-2">*Valores aproximados, sujeitos à análise de crédito</p>
                  <p className="text-xs text-gray-500 mt-1">Taxa a partir de 1,09% a.m. em até 180 meses</p>
                </div>
                
                <div className="bg-libra-light p-6 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <p className="text-sm text-gray-600">Renda familiar necessária:</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>A renda familiar necessária é calculada com base no comprometimento máximo de 30% da renda com a parcela, para evitar o superendividamento.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-3xl font-bold text-libra-navy">{formatCurrency(requiredIncome)}</p>
                  <p className="text-xs text-gray-500 mt-2">*Valores aproximados, sujeitos à análise de crédito</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button 
                  className="bg-libra-navy hover:bg-libra-blue text-white font-semibold"
                  onClick={handleContactRequest}
                >
                  Solicitar Contato
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoanSimulator;
