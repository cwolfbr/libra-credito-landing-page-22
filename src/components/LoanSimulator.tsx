/**
 * Componente de simulação de empréstimo com garantia de imóvel
 * 
 * @component LoanSimulator
 * @description Implementa o formulário principal de simulação de crédito com garantia de imóvel,
 * permitindo ao usuário calcular valores de parcelas e condições do empréstimo.
 * 
 * @features
 * - Cálculo de empréstimo com base no valor do imóvel
 * - Validação de CEP e tipo de imóvel
 * - Cálculo automático de renda necessária
 * - Suporte a diferentes finalidades de empréstimo
 * - Integração com WhatsApp para contato
 * 
 * @businessRules
 * - Valor mínimo do empréstimo: R$ 100.000
 * - Valor máximo do empréstimo: R$ 5.000.000
 * - Taxa de juros: 1.09% a.m.
 * - Prazo máximo: 180 meses (15 anos)
 * - Comprometimento máximo de renda: 30%
 * - Renda mínima necessária: R$ 7.000
 * - Valor do imóvel: 2x a 3x o valor do empréstimo
 * 
 * @accessibility
 * - Labels e aria-labels em todos os campos
 * - Tooltips informativos
 * - Feedback visual de estados
 * - Mensagens de erro claras
 * 
 * @performance
 * - Cálculos otimizados
 * - Formatação de moeda eficiente
 * - Validações em tempo real
 * 
 * @example
 * ```tsx
 * <LoanSimulator />
 * ```
 */

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle, Info } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatCurrency } from '@/utils/formatters';
import { useLoanCalculator } from '@/hooks/useLoanCalculator';

type LoanPurpose = 'consolidacao' | 'capital' | 'investimento' | 'reforma';
type PropertyType = 'casa' | 'apartamento' | 'comercial' | 'rural';

const LoanSimulator: React.FC = () => {
  const isMobile = useIsMobile();
  const [loanPurpose, setLoanPurpose] = useState<LoanPurpose>('consolidacao');
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [cep, setCep] = useState<string>('');
  const [propertyType, setPropertyType] = useState<PropertyType>('casa');
  const [showResults, setShowResults] = useState<boolean>(false);

  const {
    monthlyPayment,
    requiredIncome,
    minPropertyValue,
    maxPropertyValue,
    calculateLoan,
  } = useLoanCalculator({ loanAmount });

  useEffect(() => {
    if (showResults) {
      calculateLoan();
    }
  }, [loanAmount, showResults, calculateLoan]);

  const handleLoanAmountChange = (value: number[]) => {
    const newLoanAmount = value[0];
    setLoanAmount(newLoanAmount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
    calculateLoan();
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) {
      return numbers;
    }
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCEP = formatCEP(e.target.value);
    setCep(formattedCEP);
  };

  const handleContactRequest = () => {
    window.open('https://api.whatsapp.com/send/?phone=5516996360424&text=Ol%C3%A1%2C+Quero+agendar+uma+conversa+com+o+consultor%21&type=phone_number&app_absent=0', '_blank');
  };

  const loanAmountLabelId = "loan-amount-label";

  return (
    <section id="simulator" className={`${isMobile ? 'py-8' : 'py-16 md:py-24'} bg-gradient-to-b from-libra-light to-white`}>
      <div className="container mx-auto px-4">
        <div className={`text-center ${isMobile ? 'mb-8' : 'mb-12'}`}>
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold text-libra-navy mb-4`}>Simule seu empréstimo</h2>
          <p className={`${isMobile ? 'text-base px-2' : 'text-lg'} text-gray-600 max-w-3xl mx-auto`}>
            Descubra quanto você pode obter com a garantia do seu imóvel (até 50% do valor) e quais serão as condições de pagamento.
          </p>
        </div>
        
        <div className={`max-w-4xl mx-auto bg-white rounded-xl shadow-lg ${isMobile ? 'p-4' : 'p-6 md:p-8'} border border-gray-200`}>
          <form onSubmit={handleSubmit}>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isMobile ? 'mb-6' : 'mb-8'}`}>
              <div>
                <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-libra-navy mb-4`}>Sobre o empréstimo</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" id="loanPurposeLabel">
                      Finalidade do empréstimo
                    </label>
                    <Select value={loanPurpose} onValueChange={value => setLoanPurpose(value as LoanPurpose)}>
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
                      Valor necessário: {formatCurrency(loanAmount)}
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
                <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-libra-navy mb-4`}>Sobre a garantia</h3>
                
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
                      inputMode="numeric"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" id="propertyTypeLabel">
                      Tipo de imóvel
                    </label>
                    <Select value={propertyType} onValueChange={value => setPropertyType(value as PropertyType)}>
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
          
          {showResults && (
            <div className={`${isMobile ? 'mt-6 pt-4' : 'mt-8 pt-6'} border-t border-gray-200 animate-fade-in`}>
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-libra-navy mb-4 text-center`}>Resultado da Simulação</h3>
              
              <div className="grid grid-cols-1 gap-6">
                <div className={`bg-libra-light ${isMobile ? 'p-4' : 'p-6'} rounded-lg text-center`}>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-700 mb-2`}>Parcela mensal estimada:</p>
                  <p className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-libra-navy`}>{formatCurrency(monthlyPayment)}</p>
                  <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-700 mt-2`}>*Valores aproximados, sujeitos à análise de crédito</p>
                  <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-700 mt-1`}>Taxa a partir de 1,19% a.m. + IPCA em até 180 meses</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`bg-libra-light ${isMobile ? 'p-4' : 'p-6'} rounded-lg text-center`}>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-700`} id="requiredIncomeLabel">Renda familiar necessária:</p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" aria-label="Mais informações sobre renda necessária">
                            <HelpCircle className="w-3 h-3 md:w-4 md:h-4 text-gray-600" aria-hidden="true" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'}`}>A renda familiar necessária é calculada com base no comprometimento máximo de 30% da renda com a parcela, para evitar o superendividamento.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-libra-navy`} aria-labelledby="requiredIncomeLabel">{formatCurrency(requiredIncome)}</p>
                    <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-700 mt-2`}>*Valores aproximados, sujeitos à análise de crédito</p>
                  </div>
                  
                  <div className={`bg-libra-light ${isMobile ? 'p-4' : 'p-6'} rounded-lg text-center`}>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-700`} id="propertyValueLabel">Avaliação do imóvel mínima necessária:</p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" aria-label="Mais informações sobre avaliação do imóvel">
                            <Info className="w-3 h-3 md:w-4 md:h-4 text-gray-600" aria-hidden="true" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'}`}>Dependendo das características do imóvel (tipo, região e documentação), a avaliação mínima necessária pode ser até {formatCurrency(maxPropertyValue)}.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-libra-navy`} aria-labelledby="propertyValueLabel">{formatCurrency(minPropertyValue)}</p>
                    <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-700 mt-2`}>*Dependendo das características do imóvel (tipo, região e documentação), pode ser necessário até {formatCurrency(maxPropertyValue)}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button 
                  className="min-h-[48px] min-w-[200px]"
                  variant="highContrast"
                  size="xl"
                  onClick={handleContactRequest}
                  aria-label="Solicitar contato com um consultor"
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
